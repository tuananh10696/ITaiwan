// =============================================================
// KIỂM THỬ: SỐ LIỆU DU HỌC THEO VAI TRÒ · BƯỚC "TIẾN ĐỘ HỒ SƠ TRƯỜNG" · DUYỆT + XẾP LỚP (2026-10-05)
// =============================================================
//   npm run test:so-lieu     (cần `npm run server:test` đang chạy + DB local đã chạy migration-du-hoc-nop-truong.sql)
//
// Trả lời ba câu hỏi của khách:
//   1. Bốn ô số liệu đầu màn Hồ sơ du học: ai thấy gì, và có RÒ tiền / số của người khác không?
//      admin = cả trung tâm · quản lý hồ sơ = chỉ ô "đang xử lý" · sale = hồ sơ mình phụ trách ·
//      giáo viên = học sinh lớp mình. Mục tiêu cuối: chỉ admin nhìn được tiền ra vào của TRUNG TÂM.
//   2. Bước mới "Tiến độ hồ sơ trường" nằm giữa "Học" và "Phỏng vấn", chuyển được và được tính là
//      "đang xử lý".
//   3. Sale / quản lý hồ sơ duyệt tài khoản và xếp lớp được, cả ở form Sửa (trước đây ô chọn lớp bị 403 / bị ẩn).
//   4. Giáo viên lập được phiếu thu chi nhưng chỉ thấy phiếu của mình.
// =============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'sltest-' + Math.random().toString(36).slice(2, 8);

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB chưa có tài khoản quản trị — chạy `npm run db:init` trước.'); process.exit(1); }

const hash = await bcrypt.hash('x'.repeat(12), 10);
const taoUser = async (role, nhan, nguoiTao = null, { duyet = 1 } = {}) => {
  const [r] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, created_by, is_admin, is_verified, is_approved, avatar_letter)
     VALUES (?,?,?,?,?,?,1,?,'T')`,
    [`${nhan} ${MA}`, `${nhan}.${MA}@local.invalid`, hash, role, nguoiTao, role === 'admin' ? 1 : 0, duyet]);
  return r.insertId;
};

const saleA = await taoUser('sale', 'saleA');
const saleB = await taoUser('sale', 'saleB');
const quanLy = await taoUser('ho_so', 'quanly');
const gvX = await taoUser('teacher', 'gvX');
const gvY = await taoUser('teacher', 'gvY');
const hvLop = await taoUser('student', 'hvLop');          // học sinh trong lớp của gvX

const [lopX] = await pool.query(
  "INSERT INTO classes (org_id, name, teacher_id, invite_code, is_active) VALUES (1,?,?,?,1)",
  [`Lớp thử ${MA}`, gvX, MA.slice(-8).toUpperCase()]);
await pool.query('INSERT INTO class_enrollments (class_id, user_id) VALUES (?,?)', [lopX.insertId, hvLop]);

const taoHoSo = async (nhan, { tuVan = null, userId = null, buoc = 'ho-so', phi = 0 } = {}) => {
  const [r] = await pool.query(
    `INSERT INTO du_hoc_ho_so (org_id, ma_hs, ho_ten, tu_van_id, user_id, buoc, tong_phi)
     VALUES (1,?,?,?,?,?,?)`, [`HS-${MA}-${nhan}`, `Học sinh ${nhan} ${MA}`, tuVan, userId, buoc, phi]);
  return r.insertId;
};
const thu = (hoSoId, soTien) => pool.query(
  `INSERT INTO du_hoc_thu_tien (ho_so_id, loai, khoan, so_tien, ngay_thu, hinh_thuc)
   VALUES (?, 'thu', 'hoc-phi', ?, CURDATE(), 'tien-mat')`, [hoSoId, soTien]);

// Hồ sơ của sale A: một ở "Học", một ở bước MỚI "nop-truong" — cả hai phải được tính là đang xử lý.
const hsA1 = await taoHoSo('A1', { tuVan: saleA, buoc: 'hoc', phi: 50_000_000 });
const hsA2 = await taoHoSo('A2', { tuVan: saleA, buoc: 'nop-truong', phi: 10_000_000 });
const hsB = await taoHoSo('B', { tuVan: saleB, buoc: 'hoc', phi: 30_000_000 });
const hsLop = await taoHoSo('Lop', { tuVan: ad.id, userId: hvLop, buoc: 'phong-van', phi: 20_000_000 });
await thu(hsA1, 5_000_000);
await thu(hsB, 7_000_000);
await thu(hsLop, 2_000_000);

const T = { admin: tok(ad.id), saleA: tok(saleA), saleB: tok(saleB), quanLy: tok(quanLy), gvX: tok(gvX), gvY: tok(gvY) };
async function goi(method, duong, vai, body) {
  const r = await fetch(B + duong, {
    method,
    headers: { 'Content-Type': 'application/json', ...(T[vai] ? { Authorization: `Bearer ${T[vai]}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  let j = null;
  try { j = await r.json(); } catch { /* route trả rỗng */ }
  return { ma: r.status, j };
}

let ok = 0;
const hong = [];
const dat = (mo_ta, dieu_kien) => {
  if (dieu_kien) { ok += 1; console.log(`  ✅ ${mo_ta}`); }
  else { hong.push(mo_ta); console.log(`  ❌ ${mo_ta}`); }
};

try {
  console.log('\n── 1. Bước mới trong luồng ──────────────────────────────');
  {
    const { j } = await goi('GET', '/admin/du-hoc/tong-quan', 'admin');
    const ma = (j?.buoc || []).map((b) => b.ma);
    const ten = (j?.buoc || []).find((b) => b.ma === 'nop-truong')?.ten;
    dat('luồng: ... Học -> Tiến độ hồ sơ trường -> Phỏng vấn ...',
      ma.indexOf('hoc') + 1 === ma.indexOf('nop-truong') && ma.indexOf('nop-truong') + 1 === ma.indexOf('phong-van'));
    dat(`tên bước hiển thị đúng ("${ten}")`, ten === 'Tiến độ hồ sơ trường');
  }
  {
    const { ma } = await goi('POST', `/admin/du-hoc/ho-so/${hsB}/buoc`, 'admin', { buoc: 'nop-truong' });
    const [[r]] = await pool.query('SELECT buoc FROM du_hoc_ho_so WHERE id = ?', [hsB]);
    dat(`admin chuyển hồ sơ sang bước mới được (${ma})`, ma === 200 && r.buoc === 'nop-truong');
    await goi('POST', `/admin/du-hoc/ho-so/${hsB}/buoc`, 'admin', { buoc: 'hoc' });
  }
  {
    const { j } = await goi('GET', '/admin/du-hoc/ho-so?buoc=dang-chay', 'saleA');
    const ids = (j?.ho_so || []).map((h) => h.id);
    dat('lọc "Đang xử lý" của sale A có cả hồ sơ ở bước mới', ids.includes(hsA1) && ids.includes(hsA2));
  }

  console.log('\n── 2. Bốn ô số liệu — ADMIN: tổng thể ───────────────────');
  {
    const { ma, j } = await goi('GET', '/admin/du-hoc/so-lieu', 'admin');
    dat(`admin gọi được (${ma})`, ma === 200);
    dat('admin được thấy tiền', j?.hien_tien === true && j?.tien != null);
    dat('admin đếm cả hồ sơ của mọi người (>= 4 hồ sơ thử)', j?.dang_chay >= 4);
    dat('admin: đã thu gồm cả 3 khoản thử (>= 14tr)', j?.tien?.da_thu >= 14_000_000);
  }

  console.log('\n── 3. SALE: đủ 4 ô, chỉ hồ sơ mình phụ trách ────────────');
  {
    const { ma, j } = await goi('GET', '/admin/du-hoc/so-lieu', 'saleA');
    dat(`sale A gọi được (${ma})`, ma === 200);
    dat('sale A đang xử lý = 2 (A1 ở Học + A2 ở bước mới)', j?.dang_chay === 2);
    dat('sale A đã thu = 5.000.000 (chỉ của mình)', j?.tien?.da_thu === 5_000_000);
    dat('sale A còn phải thu = 55.000.000', j?.tien?.con_thieu === 55_000_000);
    dat('sale A có ô Thu 30 ngày = 5.000.000', j?.tien?.thu_30_ngay === 5_000_000);
  }
  {
    const { j } = await goi('GET', '/admin/du-hoc/so-lieu', 'saleB');
    dat('sale B đang xử lý = 1, đã thu = 7.000.000 (không dính số của A)', j?.dang_chay === 1 && j?.tien?.da_thu === 7_000_000);
  }
  {
    const { j } = await goi('GET', '/admin/du-hoc/tong-quan', 'saleA');
    dat('tổng quan du học của sale A khớp với ô số liệu', j?.dang_chay === 2 && j?.tien?.da_thu === 5_000_000);
  }

  console.log('\n── 4. QUẢN LÝ HỒ SƠ: chỉ ô "đang xử lý", không tiền ─────');
  {
    const { ma, j } = await goi('GET', '/admin/du-hoc/so-lieu', 'quanLy');
    dat(`quản lý gọi được (${ma})`, ma === 200);
    dat('quản lý KHÔNG nhận ô tiền (server không gửi)', j?.hien_tien === false && j?.tien === null);
    dat('quản lý đếm trên toàn trung tâm (>= 4 hồ sơ thử)', j?.dang_chay >= 4);
    dat('phản hồi không chứa chữ "da_thu" ở đâu cả', !JSON.stringify(j).includes('da_thu'));
  }
  {
    const { j } = await goi('GET', '/admin/du-hoc/tong-quan', 'quanLy');
    dat('tổng quan du học của quản lý không có tiền', j?.tien === null && j?.hien_tien === false);
    dat('...và không có danh sách "còn nợ" kèm số tiền', (j?.viec?.cong_no || []).length === 0);
  }

  console.log('\n── 5. GIÁO VIÊN: 4 ô, chỉ học sinh lớp mình ─────────────');
  {
    const { ma, j } = await goi('GET', '/admin/du-hoc/so-lieu', 'gvX');
    dat(`giáo viên X gọi được (${ma})`, ma === 200);
    dat('GV X đang xử lý = 1 (em trong lớp mình)', j?.dang_chay === 1);
    dat('GV X đã thu = 2.000.000, còn phải thu = 18.000.000', j?.tien?.da_thu === 2_000_000 && j?.tien?.con_thieu === 18_000_000);
  }
  {
    const { j } = await goi('GET', '/admin/du-hoc/so-lieu', 'gvY');
    dat('GV Y (lớp khác, không có học sinh) thấy 0 và 0đ — không dính số của GV X',
      j?.dang_chay === 0 && j?.tien?.da_thu === 0);
  }
  for (const [method, duong] of [
    ['GET', '/admin/du-hoc/tong-quan'],
    ['GET', '/admin/du-hoc/ho-so'],
    ['GET', `/admin/du-hoc/ho-so/${hsLop}`],
    ['GET', '/admin/du-hoc/theo-truong'],
    ['GET', '/admin/du-hoc/hoc-vien'],
  ]) {
    const { ma } = await goi(method, duong, 'gvX');
    dat(`giáo viên vẫn bị chặn ${method} ${duong} (${ma})`, ma === 403);
  }

  console.log('\n── 6. Tổng quan: tiền & thu chi CHỈ admin ───────────────');
  {
    const { j } = await goi('GET', '/admin/tong-quan', 'admin');
    dat('admin: tổng quan có tiền (an_tien = false)', j?.an_tien === false && j?.tien?.co_bang !== undefined);
  }
  for (const vai of ['saleA', 'quanLy']) {
    const { ma, j } = await goi('GET', '/admin/tong-quan', vai);
    dat(`${vai}: mở được tổng quan (${ma}) và cờ an_tien = true`, ma === 200 && j?.an_tien === true);
    const k = j?.tien?.ky || {};
    dat(`${vai}: các kỳ thu/chi đều 0, không biểu đồ, không phân loại`,
      [k.hom_nay, k.tuan, k.thang, k.thang_truoc].every((x) => !x || (x.thu === 0 && x.chi === 0))
      && (j?.tien?.theo_thang || []).every((m) => m.thu === 0 && m.chi === 0)
      && !(j?.tien?.thu_theo_dm || []).length && !(j?.tien?.chi_theo_dm || []).length);
    dat(`${vai}: không có tiền du học / ký túc xá`,
      j?.nguon_khac?.du_hoc_da_thu === 0 && j?.nguon_khac?.du_hoc_con_phai_thu === 0 && j?.nguon_khac?.ktx_thang_nay === 0);
    dat(`${vai}: có khối hồ sơ theo bước thay cho tiền`, Array.isArray(j?.ho_so?.theo_buoc) && j?.ho_so?.cac_buoc?.length >= 7);
  }
  {
    const { j } = await goi('GET', '/admin/tong-quan', 'saleA');
    const dem = Object.fromEntries((j?.ho_so?.theo_buoc || []).map((x) => [x.buoc, x.so]));
    dat('sale A: theo bước chỉ tính hồ sơ của mình (Học = 1, bước mới = 1)', dem.hoc === 1 && dem['nop-truong'] === 1);
  }
  {
    const { ma } = await goi('GET', '/admin/quy/bao-cao', 'saleA');
    dat(`sale vẫn xem được báo cáo sổ quỹ của CHÍNH MÌNH (${ma})`, ma === 200);
  }

  console.log('\n── 7. Duyệt tài khoản + xếp lớp ─────────────────────────');
  {
    const { ma, j } = await goi('GET', '/admin/classes-options', 'saleA');
    const co = (j?.classes || []).some((c) => c.id === lopX.insertId);
    dat(`sale lấy được danh sách lớp để chọn (${ma})`, ma === 200 && co);
    dat('danh sách chỉ có id + tên + giáo viên (không sĩ số, không học viên)',
      (j?.classes || []).every((c) => Object.keys(c).sort().join() === 'id,name,teacher_name'));
  }
  {
    const { ma } = await goi('GET', '/admin/classes-options', 'gvX');
    dat(`giáo viên không dùng được /classes-options (${ma})`, ma === 403);
  }
  {
    const hv = await taoUser('student', 'cho', saleA, { duyet: 0 });
    const hong1 = await goi('PUT', `/admin/users/${hv}/approve`, 'saleA', { class_id: 999999999 });
    const [[u1]] = await pool.query('SELECT is_approved FROM users WHERE id = ?', [hv]);
    dat(`lớp không tồn tại -> 400 và tài khoản vẫn CHƯA duyệt (${hong1.ma})`, hong1.ma === 400 && !u1.is_approved);

    const r = await goi('PUT', `/admin/users/${hv}/approve`, 'saleA', { class_id: lopX.insertId });
    const [[u2]] = await pool.query('SELECT is_approved FROM users WHERE id = ?', [hv]);
    const [dk] = await pool.query('SELECT 1 FROM class_enrollments WHERE class_id = ? AND user_id = ?', [lopX.insertId, hv]);
    dat(`sale duyệt tài khoản mình tạo + xếp lớp (${r.ma})`, r.ma === 200 && !!u2.is_approved && dk.length === 1);
  }
  {
    // Tài khoản của sale B: sale A không duyệt được dù biết id (phạm vi `taikhoan`).
    const hvB = await taoUser('student', 'choB', saleB, { duyet: 0 });
    const { ma } = await goi('PUT', `/admin/users/${hvB}/approve`, 'saleA', { class_id: lopX.insertId });
    const [[u]] = await pool.query('SELECT is_approved FROM users WHERE id = ?', [hvB]);
    dat(`sale A duyệt tài khoản của sale B -> chặn (${ma})`, ma === 403 && !u.is_approved);
  }
  {
    const hv = await taoUser('student', 'choAdmin', null, { duyet: 0 });
    const r = await goi('PUT', `/admin/users/${hv}/approve`, 'admin', { class_id: lopX.insertId });
    const [dk] = await pool.query('SELECT 1 FROM class_enrollments WHERE class_id = ? AND user_id = ?', [lopX.insertId, hv]);
    dat(`admin duyệt + xếp lớp vẫn chạy (${r.ma})`, r.ma === 200 && dk.length === 1);
  }

  console.log('\n── 8. Sổ thu chi: giáo viên cũng lập được, chỉ thấy phiếu của mình ──');
  const lapPhieu = (vai, nhan, soTien) => goi('POST', '/admin/quy/phieu', vai,
    { loai: 'thu', ngay: new Date().toISOString().slice(0, 10), so_tien: soTien, dien_giai: `Phiếu ${nhan} ${MA}` });
  const pX = await lapPhieu('gvX', 'gvX', 111000);
  const pY = await lapPhieu('gvY', 'gvY', 222000);
  const pA = await lapPhieu('saleA', 'saleA', 333000);
  await lapPhieu('admin', 'admin', 444000);
  dat(`giáo viên lập được phiếu thu (${pX.ma})`, pX.ma === 200 || pX.ma === 201);
  {
    const { ma, j } = await goi('GET', '/admin/quy/phieu', 'gvX');
    const ds = j?.phieu || j?.items || [];
    const txt = ds.map((x) => x.dien_giai).join('|');
    dat(`GV X xem được danh sách (${ma}) và thấy phiếu của mình`, ma === 200 && txt.includes(`gvX ${MA}`));
    dat('GV X KHÔNG thấy phiếu của GV Y, sale A hay admin', !txt.includes(`gvY ${MA}`) && !txt.includes(`saleA ${MA}`) && !txt.includes(`admin ${MA}`));
  }
  {
    const idY = pY.j?.id ?? pY.j?.phieu?.id;
    const { ma } = await goi('GET', `/admin/quy/phieu/${idY}/anh`, 'gvX');
    dat(`GV X mở ảnh phiếu của GV Y theo id -> chặn (${ma})`, ma === 403);
    const x = await goi('DELETE', `/admin/quy/phieu/${idY}`, 'gvX');
    dat(`GV X xoá phiếu của GV Y -> chặn (${x.ma})`, x.ma === 403);
    const own = pX.j?.id ?? pX.j?.phieu?.id;
    const m = await goi('GET', `/admin/quy/phieu/${own}/anh`, 'gvX');
    dat(`GV X mở ảnh phiếu của chính mình -> không bị chặn quyền (${m.ma}; 404 = phiếu chưa có ảnh)`, m.ma !== 403);
  }
  {
    const { ma, j } = await goi('GET', '/admin/quy/bao-cao', 'gvX');
    dat(`báo cáo của GV X (${ma}) chỉ gồm phiếu của mình = 111.000`, ma === 200 && j?.tong?.thu === 111000);
    dat('báo cáo của GV chỉ có nguồn "phieu" (không gộp du học / ký túc xá)',
      (j?.theo_nguon || []).every((n) => n.nguon === 'phieu'));
  }
  {
    const { j } = await goi('GET', '/admin/quy/bao-cao', 'saleA');
    dat('báo cáo của sale A = 333.000 và không gộp tiền du học của hồ sơ mình', j?.tong?.thu === 333000
      && (j?.theo_nguon || []).every((n) => n.nguon === 'phieu'));
    const a = await goi('GET', '/admin/quy/bao-cao', 'admin');
    dat('admin vẫn thấy báo cáo gộp cả trung tâm (có nguồn du học)', (a.j?.theo_nguon || []).some((n) => n.nguon === 'du-hoc'));
  }
  {
    const { ma } = await goi('POST', '/admin/quy/danh-muc', 'gvX', { loai: 'thu', ten: 'x' });
    dat(`giáo viên không sửa được danh mục thu/chi (${ma})`, ma === 403);
  }

  console.log('\n── 9. Form sửa tài khoản: chọn lớp trước khi duyệt ─────');
  {
    const hv = await taoUser('student', 'suaLop', saleA, { duyet: 0 });
    const r = await goi('PUT', `/admin/users/${hv}`, 'saleA', { name: 'Tên mới', class_id: lopX.insertId });
    const [dk] = await pool.query('SELECT 1 FROM class_enrollments WHERE class_id = ? AND user_id = ?', [lopX.insertId, hv]);
    dat(`sale sửa tài khoản + xếp lớp (${r.ma})`, r.ma === 200 && dk.length === 1);
    const [[u]] = await pool.query('SELECT is_approved FROM users WHERE id = ?', [hv]);
    dat('sửa thông tin KHÔNG tự duyệt', !u.is_approved);

    const bad = await goi('PUT', `/admin/users/${hv}`, 'saleA', { name: 'Không đổi', class_id: 999999999 });
    const [[n]] = await pool.query('SELECT name FROM users WHERE id = ?', [hv]);
    dat(`lớp không tồn tại -> 400 và không ghi gì (${bad.ma})`, bad.ma === 400 && n.name === 'Tên mới');

    await goi('PUT', `/admin/users/${hv}`, 'saleA', { class_id: null });
    const [dk2] = await pool.query('SELECT 1 FROM class_enrollments WHERE class_id = ? AND user_id = ?', [lopX.insertId, hv]);
    dat('sale gửi class_id rỗng KHÔNG gỡ được học viên khỏi lớp', dk2.length === 1);

    const ad2 = await goi('PUT', `/admin/users/${hv}`, 'admin', { class_id: null });
    const [dk3] = await pool.query('SELECT 1 FROM class_enrollments WHERE user_id = ?', [hv]);
    dat(`admin vẫn gỡ lớp được (${ad2.ma})`, ad2.ma === 200 && dk3.length === 0);
  }
} finally {
  // ------------------------------------------------------------------ dọn
  await pool.query('DELETE FROM quy_phieu WHERE dien_giai LIKE ?', [`%${MA}`]);
  await pool.query('DELETE FROM du_hoc_ho_so WHERE ma_hs LIKE ?', [`HS-${MA}-%`]);
  await pool.query('DELETE FROM classes WHERE id = ?', [lopX.insertId]);
  await pool.query('DELETE FROM users WHERE email LIKE ?', [`%${MA}@local.invalid`]);
  const [[con]] = await pool.query(
    `SELECT (SELECT COUNT(*) FROM users WHERE email LIKE ?)
          + (SELECT COUNT(*) FROM du_hoc_ho_so WHERE ma_hs LIKE ?)
          + (SELECT COUNT(*) FROM classes WHERE id = ?) AS n`,
    [`%${MA}@local.invalid`, `HS-${MA}-%`, lopX.insertId]);
  console.log(`\n🧹 dọn xong, còn sót ${con.n} bản ghi (phải 0)`);
}

console.log(`\nSỐ LIỆU DU HỌC THEO VAI TRÒ: ${ok}/${ok + hong.length} đúng kỳ vọng`);
if (hong.length) {
  console.log('  ❌ chưa đạt:');
  for (const h of hong) console.log('     -', h);
}
await pool.end();
process.exit(hong.length ? 1 : 0);
