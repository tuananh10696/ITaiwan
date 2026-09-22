// =============================================================
// KIỂM THỬ VAI TRÒ SALE / QUẢN LÝ HỒ SƠ
// =============================================================
//   npm run test:vai-tro     (cần `npm run server:test` đang chạy + DB local đã migrate)
//
// Bộ test này trả lời đúng một câu hỏi: HAI NHÂN VIÊN CÙNG CẤP có đọc được dữ liệu của nhau
// không. Đó là rủi ro thật của khu này — khác với giáo viên (quên khai quyền thì nhận 403,
// phiền nhưng an toàn), sale quên lọc là đọc được CCCD, hộ chiếu và tiền nong của khách do
// đồng nghiệp phụ trách mà không có dấu hiệu gì trên màn hình.
//
// Dựng hai sale A và B, mỗi người một hồ sơ + một tài khoản học viên + một phiếu quỹ, rồi
// bắt mỗi người thử chạm vào đồ của người kia.
// =============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'vttest-' + Math.random().toString(36).slice(2, 8);

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB chưa có tài khoản quản trị — chạy `npm run db:init` trước.'); process.exit(1); }

const hash = await bcrypt.hash('x'.repeat(12), 10);
const taoUser = async (role, nhan, nguoiTao = null) => {
  const [r] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, created_by, is_admin, is_verified, is_approved, avatar_letter)
     VALUES (?,?,?,?,?,?,1,1,'T')`,
    [`${nhan} ${MA}`, `${nhan}.${MA}@local.invalid`, hash, role, nguoiTao, role === 'admin' ? 1 : 0]);
  return r.insertId;
};

const saleA = await taoUser('sale', 'saleA');
const saleB = await taoUser('sale', 'saleB');
const hoSoVien = await taoUser('ho_so', 'hoso');
const hvCuaA = await taoUser('student', 'hvA', saleA);
const hvCuaB = await taoUser('student', 'hvB', saleB);

const taoHoSo = async (tuVan, nhan) => {
  const [r] = await pool.query(
    `INSERT INTO du_hoc_ho_so (org_id, ma_hs, ho_ten, tu_van_id, buoc, cccd, tong_phi)
     VALUES (1,?,?,?,'ho-so','0123456789',50000000)`,
    [`HS-${MA}-${nhan}`, `Học sinh ${nhan} ${MA}`, tuVan]);
  return r.insertId;
};
const hoSoA = await taoHoSo(saleA, 'A');
const hoSoB = await taoHoSo(saleB, 'B');

const taoPhieu = async (nguoiLap, nhan) => {
  const [r] = await pool.query(
    `INSERT INTO quy_phieu (org_id, ma_phieu, loai, ngay, so_tien, nguoi_lap_id, dien_giai)
     VALUES (1,?,'thu',CURDATE(),1000000,?,?)`,
    [`PT-${MA}-${nhan}`, nguoiLap, `Phiếu ${nhan} ${MA}`]);
  return r.insertId;
};
const phieuA = await taoPhieu(saleA, 'A');
const phieuB = await taoPhieu(saleB, 'B');

const T = { saleA: tok(saleA), saleB: tok(saleB), hoSo: tok(hoSoVien), admin: tok(ad.id) };

async function goi(method, duong, vai, body) {
  const r = await fetch(B + duong, {
    method,
    headers: { 'Content-Type': 'application/json', ...(T[vai] ? { Authorization: `Bearer ${T[vai]}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  let j = null;
  try { j = await r.json(); } catch { /* route trả ảnh hoặc rỗng */ }
  return { ma: r.status, j };
}

let ok = 0;
const hong = [];
const dat = (mo_ta, dieu_kien) => {
  if (dieu_kien) { ok += 1; console.log(`  ✅ ${mo_ta}`); }
  else { hong.push(mo_ta); console.log(`  ❌ ${mo_ta}`); }
};

console.log('\n── 1. Khu KHÔNG được vào ────────────────────────────────');
for (const [method, duong] of [
  ['GET', '/admin/classes'],
  ['GET', '/admin/teachers'],
  ['GET', '/admin/de-bai'],
  ['GET', '/admin/thiet-bi/canh-bao'],
  ['POST', '/admin/classes'],
]) {
  const { ma } = await goi(method, duong, 'saleA', method === 'POST' ? { name: 'x' } : null);
  dat(`sale không vào được ${method} ${duong} (${ma})`, ma === 403);
}

console.log('\n── 2. Hồ sơ du học: chỉ thấy của mình ───────────────────');
{
  const { ma, j } = await goi('GET', '/admin/du-hoc/ho-so', 'saleA');
  const ids = (j?.ho_so || []).map((h) => h.id);
  dat(`sale A đọc được danh sách của mình (${ma})`, ma === 200 && ids.includes(hoSoA));
  dat('danh sách của sale A KHÔNG chứa hồ sơ của sale B', !ids.includes(hoSoB));
}
{
  const { ma } = await goi('GET', `/admin/du-hoc/ho-so/${hoSoB}`, 'saleA');
  dat(`sale A mở thẳng hồ sơ của sale B -> chặn (${ma})`, ma === 403);
}
{
  const { ma } = await goi('GET', `/admin/du-hoc/ho-so/${hoSoA}`, 'saleA');
  dat(`sale A mở hồ sơ của chính mình -> được (${ma})`, ma === 200);
}
{
  // Bộ lọc tu_van của giao diện không được dùng để nới rộng phạm vi.
  const { j } = await goi('GET', `/admin/du-hoc/ho-so?tu_van=${saleB}`, 'saleA');
  const ids = (j?.ho_so || []).map((h) => h.id);
  dat('lọc ?tu_van=<id người khác> không lộ hồ sơ của họ', !ids.includes(hoSoB));
}

console.log('\n── 3. Không chuyển được hồ sơ sang tên người khác ───────');
{
  await goi('PUT', `/admin/du-hoc/ho-so/${hoSoA}`, 'saleA', { tu_van_id: saleB, ghi_chu: 'thu chuyen' });
  const [[h]] = await pool.query('SELECT tu_van_id FROM du_hoc_ho_so WHERE id = ?', [hoSoA]);
  dat('sale A gửi tu_van_id = sale B nhưng hồ sơ vẫn thuộc về A', h.tu_van_id === saleA);
}

console.log('\n── 4. Tài khoản: chỉ tài khoản mình tạo ─────────────────');
{
  const { ma, j } = await goi('GET', '/admin/users', 'saleA');
  const ids = (j?.users || []).map((u) => u.id);
  dat(`sale A xem được danh sách tài khoản (${ma})`, ma === 200);
  dat('chỉ có học viên do A tạo', ids.includes(hvCuaA) && !ids.includes(hvCuaB));
  dat('không có tài khoản quản trị trong danh sách', !ids.includes(ad.id));
}
{
  const { ma } = await goi('PUT', `/admin/users/${hvCuaB}`, 'saleA', { name: 'doi ten' });
  dat(`sale A sửa học viên của sale B -> chặn (${ma})`, ma === 403);
}
{
  const { ma } = await goi('DELETE', `/admin/users/${hvCuaB}`, 'saleA');
  dat(`sale A xoá học viên của sale B -> chặn (${ma})`, ma === 403);
}

console.log('\n── 5. Không leo quyền ───────────────────────────────────');
for (const vai of ['teacher', 'admin', 'sale', 'ho_so']) {
  const { ma } = await goi('POST', '/admin/users', 'saleA', {
    name: 'x', email: `leo.${vai}.${MA}@local.invalid`, password: 'matkhau123', role: vai,
  });
  dat(`sale không tạo được tài khoản vai trò "${vai}" (${ma})`, ma === 403);
}
{
  const { ma } = await goi('PUT', `/admin/users/${hvCuaA}`, 'saleA', { role: 'admin' });
  const [[u]] = await pool.query('SELECT role FROM users WHERE id = ?', [hvCuaA]);
  dat(`sale nâng học viên của mình lên admin -> chặn (${ma})`, ma === 403 && u.role === 'student');
}
{
  const { ma } = await goi('PUT', `/admin/users/${hvCuaA}`, 'saleA', { is_admin: 1 });
  const [[u]] = await pool.query('SELECT is_admin FROM users WHERE id = ?', [hvCuaA]);
  dat(`sale bật cờ is_admin -> chặn (${ma})`, ma === 403 && !u.is_admin);
}
{
  const { ma } = await goi('POST', '/admin/users', 'saleA', {
    name: 'hv moi', email: `hvmoi.${MA}@local.invalid`, password: 'matkhau123', role: 'student',
  });
  dat(`sale TẠO ĐƯỢC tài khoản học viên (${ma})`, ma === 201);
}

console.log('\n── 6. Sổ thu chi: chỉ phiếu mình lập ────────────────────');
{
  const { ma, j } = await goi('GET', '/admin/quy/phieu', 'saleA');
  const ids = (j?.phieu || j?.rows || []).map((x) => x.id);
  dat(`sale A đọc được sổ quỹ (${ma})`, ma === 200);
  dat('chỉ thấy phiếu của mình', ids.includes(phieuA) && !ids.includes(phieuB));
}
{
  const { ma } = await goi('DELETE', `/admin/quy/phieu/${phieuB}`, 'saleA');
  dat(`sale A xoá phiếu của sale B -> chặn (${ma})`, ma === 403);
  const [[p]] = await pool.query('SELECT id FROM quy_phieu WHERE id = ?', [phieuB]);
  dat('phiếu của sale B vẫn còn nguyên', !!p);
}
{
  const { ma } = await goi('POST', '/admin/quy/danh-muc', 'saleA', { loai: 'thu', ten: `dm ${MA}` });
  dat(`sale sửa danh mục thu chi của trung tâm -> chặn (${ma})`, ma === 403);
}

console.log('\n── 7. Ký túc xá ─────────────────────────────────────────');
{
  const { ma, j } = await goi('GET', '/admin/ktx/ho-so-chon', 'saleA');
  const ids = (j?.ho_so || []).map((h) => h.id);
  dat(`sale A xem được danh sách hồ sơ để xếp phòng (${ma})`, ma === 200);
  dat('không có hồ sơ của sale B trong đó', !ids.includes(hoSoB));
}
{
  const { ma } = await goi('POST', '/admin/ktx/toa', 'saleA', { ten: `toa ${MA}` });
  dat(`sale tạo toà nhà -> chặn (${ma})`, ma === 403);
}

console.log('\n── 8. Quản lý hồ sơ có cùng bộ quyền với sale ───────────');
{
  const { ma } = await goi('GET', '/admin/du-hoc/ho-so', 'hoSo');
  dat(`vai trò ho_so vào được khu du học (${ma})`, ma === 200);
  const { ma: ma2 } = await goi('GET', '/admin/classes', 'hoSo');
  dat(`vai trò ho_so KHÔNG vào được khu lớp (${ma2})`, ma2 === 403);
}

console.log('\n── 9. Bảng điều khiển ───────────────────────────────────');
{
  const { ma, j } = await goi('GET', '/admin/tong-quan', 'saleA');
  dat(`sale mở được tổng quan (${ma})`, ma === 200);
  dat('tổng quan của sale không kèm khối lớp học', !j?.lop?.length);
  dat('tổng quan chỉ tính tiền của sale đó', (j?.tien?.ky?.thang?.thu || 0) <= 1000000);
}
{
  const { ma, j } = await goi('GET', '/admin/stats', 'saleA');
  dat(`sale mở được /stats (${ma})`, ma === 200);
  dat('/stats không trả danh sách người dùng mới của trung tâm', !j?.recentUsers?.length);
}

// ------------------------------------------------------------------ dọn
await pool.query('DELETE FROM quy_phieu WHERE ma_phieu LIKE ?', [`PT-${MA}-%`]);
await pool.query('DELETE FROM du_hoc_ho_so WHERE ma_hs LIKE ?', [`HS-${MA}-%`]);
await pool.query('DELETE FROM users WHERE email LIKE ?', [`%${MA}@local.invalid`]);
const [[con]] = await pool.query(
  'SELECT (SELECT COUNT(*) FROM users WHERE email LIKE ?) + (SELECT COUNT(*) FROM du_hoc_ho_so WHERE ma_hs LIKE ?) AS n',
  [`%${MA}@local.invalid`, `HS-${MA}-%`]);
console.log(`\n🧹 dọn xong, còn sót ${con.n} bản ghi (phải 0)`);

console.log(`\nVAI TRÒ SALE / QUẢN LÝ HỒ SƠ: ${ok}/${ok + hong.length} đúng kỳ vọng`);
if (hong.length) {
  console.log('  ❌ chưa đạt:');
  for (const h of hong) console.log('     -', h);
}
await pool.end();
process.exit(hong.length ? 1 : 0);
