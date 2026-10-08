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
    `INSERT INTO du_hoc_ho_so (org_id, ma_hs, ho_ten, tu_van_id, buoc, cccd, tong_phi, truong_nv1)
     VALUES (1,?,?,?,'ho-so','0123456789',50000000,?)`,
    [`HS-${MA}-${nhan}`, `Học sinh ${nhan} ${MA}`, tuVan, `Đại học Thử ${MA}`]);
  return r.insertId;
};
const hoSoA = await taoHoSo(saleA, 'A');
const hoSoB = await taoHoSo(saleB, 'B');
// Cả hai hồ sơ cùng MỘT trường: màn "Tiến độ theo trường" liệt kê học sinh theo trường, nên đây đúng
// là chỗ dễ rò nhất — thẻ của trường chung không được kéo học sinh của sale kia vào.
const [trThu] = await pool.query('INSERT INTO du_hoc_truong (ten) VALUES (?)', [`Đại học Thử ${MA}`]);
const truongThu = trThu.insertId;
await pool.query('INSERT INTO du_hoc_truong_hs (truong_id, ho_so_id) VALUES (?, ?), (?, ?)', [truongThu, hoSoA, truongThu, hoSoB]);

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

{
  // Tiến độ theo trường: gom theo trường chứ không theo người, nên phải kiểm riêng.
  const { ma, j } = await goi('GET', '/admin/du-hoc/theo-truong', 'saleA');
  const ids = (j?.truong || []).flatMap((t) => t.hoc_sinh.map((h) => h.ho_so_id));
  dat(`sale A mở được tiến độ theo trường (${ma})`, ma === 200 && ids.includes(hoSoA));
  dat('tiến độ theo trường của sale A KHÔNG có hồ sơ của sale B (dù cùng trường)', !ids.includes(hoSoB));
  const the = (j?.truong || []).find((t) => t.ten === `Đại học Thử ${MA}`);
  dat('thẻ trường chung chỉ đếm 1 học sinh với sale A', the?.tong === 1);
  dat('không trả CCCD trong tiến độ theo trường', !JSON.stringify(j || {}).includes('0123456789'));
  dat('sale không quản lý được TRƯỜNG (sua_duoc=false)', j?.sua_duoc === false);

  // Tìm học sinh để thêm vào trường: sale chỉ tìm được hồ sơ mình phụ trách.
  const tA = await goi('GET', `/admin/du-hoc/theo-truong/tim-hoc-sinh?q=${MA}`, 'saleA');
  const idsTim = (tA.j?.ho_so || []).map((h) => h.id);
  dat('sale A tìm học sinh: có hồ sơ của mình, KHÔNG có hồ sơ của sale B', idsTim.includes(hoSoA) && !idsTim.includes(hoSoB), idsTim.join(','));
  dat('kết quả tìm không lộ CCCD', !JSON.stringify(tA.j || {}).includes('0123456789'));
  const [trRieng] = await pool.query('INSERT INTO du_hoc_truong (ten) VALUES (?)', [`Trường riêng ${MA}`]);
  const them = await goi('POST', `/admin/du-hoc/theo-truong/${trRieng.insertId}/hoc-sinh`, 'saleA', { ho_so_id: hoSoA });
  dat('sale A thêm học sinh của mình vào trường -> 201', them.ma === 201, `${them.ma}`);
  const themB = await goi('POST', `/admin/du-hoc/theo-truong/${trRieng.insertId}/hoc-sinh`, 'saleA', { ho_so_id: hoSoB });
  dat('sale A thêm học sinh của sale B -> 404 (không thấy)', themB.ma === 404, `${themB.ma}`);
  // sale B chen học sinh của mình vào trường chung; sale A không được đổi / gỡ dòng đó.
  const [[mB]] = await pool.query('SELECT id FROM du_hoc_truong_hs WHERE truong_id = ? AND ho_so_id = ?', [truongThu, hoSoB]);
  const doiB = await goi('PUT', `/admin/du-hoc/theo-truong-hs/${mB.id}`, 'saleA', { ket_qua: 'dau' });
  const goB = await goi('DELETE', `/admin/du-hoc/theo-truong-hs/${mB.id}`, 'saleA');
  const [[conB]] = await pool.query('SELECT ket_qua FROM du_hoc_truong_hs WHERE id = ?', [mB.id]);
  dat('sale A KHÔNG đổi / gỡ được dòng của học sinh sale B (404, dữ liệu nguyên vẹn)',
    doiB.ma === 404 && goB.ma === 404 && conB?.ket_qua === 'cho', `${doiB.ma},${goB.ma},${conB?.ket_qua}`);
  const [[mA]] = await pool.query('SELECT id FROM du_hoc_truong_hs WHERE truong_id = ? AND ho_so_id = ?', [truongThu, hoSoA]);
  const doiA = await goi('PUT', `/admin/du-hoc/theo-truong-hs/${mA.id}`, 'saleA', { ket_qua: 'dau' });
  dat('sale A đặt kết quả cho học sinh của mình -> 200', doiA.ma === 200, `${doiA.ma}`);
  // Quản lý TRƯỜNG (thêm / đổi tên / xoá) chỉ quản trị.
  const w1 = await goi('POST', '/admin/du-hoc/theo-truong', 'saleA', { ten: `Sale thu them ${MA}` });
  const w2 = await goi('PUT', `/admin/du-hoc/theo-truong/${truongThu}`, 'saleA', { ten: `Doi ten ${MA}` });
  const w3 = await goi('DELETE', `/admin/du-hoc/theo-truong/${truongThu}`, 'saleA');
  const w4 = await goi('POST', '/admin/du-hoc/theo-truong', 'hoSo', { ten: `QL thu them ${MA}` });
  const w5 = await goi('DELETE', `/admin/du-hoc/theo-truong/${truongThu}`, 'hoSo');
  dat('sale / quản lý hồ sơ KHÔNG thêm - đổi tên - xoá TRƯỜNG được (403)',
    [w1, w2, w3, w4, w5].every((w) => w.ma === 403), [w1, w2, w3, w4, w5].map((w) => w.ma).join(','));

  // Quản lý hồ sơ: thấy + tìm + thêm được MỌI học sinh (khác sale).
  const qA = await goi('GET', '/admin/du-hoc/theo-truong', 'hoSo');
  const idsQl = (qA.j?.truong || []).flatMap((t) => t.hoc_sinh.map((h) => h.ho_so_id));
  dat('quản lý hồ sơ thấy học sinh của cả sale A và sale B trong tiến độ theo trường', idsQl.includes(hoSoA) && idsQl.includes(hoSoB));
  const qT = await goi('GET', `/admin/du-hoc/theo-truong/tim-hoc-sinh?q=${MA}`, 'hoSo');
  const idsQlTim = (qT.j?.ho_so || []).map((h) => h.id);
  dat('quản lý hồ sơ tìm được học sinh của cả hai sale', idsQlTim.includes(hoSoA) && idsQlTim.includes(hoSoB), idsQlTim.join(','));
  const qThem = await goi('POST', `/admin/du-hoc/theo-truong/${trRieng.insertId}/hoc-sinh`, 'hoSo', { ho_so_id: hoSoB });
  dat('quản lý hồ sơ thêm học sinh của sale B vào trường -> 201', qThem.ma === 201, `${qThem.ma}`);
  const qB = await goi('GET', '/admin/du-hoc/theo-truong', 'hoSo');
  dat('quản lý hồ sơ không có quyền sửa TRƯỜNG (sua_duoc=false)', qB.j?.sua_duoc === false);
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
  const { ma: maTr } = await goi('GET', '/admin/du-hoc/theo-truong', 'hoSo');
  dat(`vai trò ho_so mở được tiến độ theo trường (${maTr})`, maTr === 200);
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
await pool.query('DELETE FROM du_hoc_truong WHERE ten LIKE ?', [`%${MA}%`]);
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
