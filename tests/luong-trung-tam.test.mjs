// =============================================================
// KIỂM THỬ VÒNG ĐỜI MỘT TRUNG TÂM
// =============================================================
//   npm run test:trung-tam     (cần `npm run server:test` đang chạy + DB local)
//
// Đi hết một lượt nghiệp vụ thật: mở lớp -> thêm giáo viên -> nhận học viên -> giao bài ->
// nhận hồ sơ du học -> thu tiền -> xếp ký túc xá -> soạn đề và giao đề. Cuối cùng tự dọn.
//
// Bộ test kiểm được thứ mà test phân quyền KHÔNG kiểm: "người có quyền có LÀM ĐƯỢC việc của
// mình không" — chứ không chỉ "người không có quyền bị chặn".
// =============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'ttest-' + Math.random().toString(36).slice(2, 8);

const buoc = [];
function kiem(ten, thuc, mong) {
  const dat = JSON.stringify(thuc) === JSON.stringify(mong);
  buoc.push({ ten, dat, msg: dat ? '' : `mong ${JSON.stringify(mong)}, thực tế ${JSON.stringify(thuc)}` });
}
async function G(token, method, path, body) {
  const h = { 'Content-Type': 'application/json' };
  if (token) h.Authorization = `Bearer ${token}`;
  const r = await fetch(B + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  let j = null; try { j = await r.json(); } catch {}
  return { s: r.status, j };
}
function ghi(ten, r, mong = 200) {
  const ok = Array.isArray(mong) ? mong.includes(r.s) : r.s === mong;
  buoc.push({ ten, dat: ok, msg: ok ? '' : `HTTP ${r.s} — ${JSON.stringify(r.j).slice(0, 110)}` });
  return r;
}

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB chưa có tài khoản quản trị — chạy `npm run db:init` trước.'); process.exit(1); }
const QT = tok(ad.id);
let lopId, gvId, gvTok, hvId, hoSoId, deId;

try {
  // ---------------------------------------------------------------- 1. LỚP + GIÁO VIÊN
  let r = ghi('Mở lớp mới', await G(QT, 'POST', '/admin/classes', { name: `Lớp ${MA}`, level: 'A1' }), [200, 201]);
  lopId = r.j?.id ?? r.j?.class?.id;
  kiem('Lớp có id', typeof lopId, 'number');

  ghi('Thêm giáo viên bằng email', await G(QT, 'POST', '/admin/teachers',
    { email: `gv.${MA}@local.invalid`, name: 'Cô Thử' }), [200, 201]);
  const [[gv]] = await pool.query('SELECT id, role FROM users WHERE email = ?', [`gv.${MA}@local.invalid`]);
  gvId = gv?.id; gvTok = gvId ? tok(gvId) : null;
  kiem('Tài khoản mới có vai trò teacher', gv?.role, 'teacher');

  ghi('Gán giáo viên phụ trách lớp', await G(QT, 'PUT', `/admin/classes/${lopId}`,
    { name: `Lớp ${MA}`, teacher_id: gvId }), 200);
  r = ghi('Giáo viên xem được lớp mình', await G(gvTok, 'GET', `/admin/classes/${lopId}`), 200);

  // ---------------------------------------------------------------- 2. HỌC VIÊN
  r = ghi('Thêm học viên bằng email', await G(QT, 'POST', `/admin/classes/${lopId}/students`,
    { emails: [`hv.${MA}@local.invalid`] }), [200, 201]);
  const [[hv]] = await pool.query('SELECT id FROM users WHERE email = ?', [`hv.${MA}@local.invalid`]);
  hvId = hv?.id;
  kiem('Học viên đã được tạo', typeof hvId, 'number');
  const [[dk]] = await pool.query('SELECT COUNT(*) AS n FROM class_enrollments WHERE class_id = ? AND user_id = ?', [lopId, hvId]);
  kiem('Học viên đã vào lớp', dk.n, 1);

  // ---------------------------------------------------------------- 3. GIAO BÀI
  r = ghi('Giáo viên giao bài cho lớp', await G(gvTok, 'POST', `/admin/classes/${lopId}/assignments`,
    { lesson_id: 'td1-1.1', exercise_type: 'bai-tap', title: 'Bài 1.1' }), [200, 201]);
  r = ghi('Học viên thấy bài được giao', await G(tok(hvId), 'GET', '/exercise/my-assignments'), 200);
  kiem('Đúng 1 bài trong danh sách', (r.j?.assignments || []).length, 1);

  // ---------------------------------------------------------------- 4. HỒ SƠ DU HỌC
  r = ghi('Nhận hồ sơ du học', await G(QT, 'POST', '/admin/du-hoc/ho-so',
    { ho_ten: `Học sinh ${MA}`, phone: '0900000000', ngay_sinh: '2006-01-01' }), [200, 201]);
  hoSoId = r.j?.id ?? r.j?.ho_so?.id;
  kiem('Hồ sơ có id', typeof hoSoId, 'number');
  ghi('Giáo viên KHÔNG xem được hồ sơ du học', await G(gvTok, 'GET', '/admin/du-hoc/ho-so'), 403);
  ghi('Chuyển bước hồ sơ', await G(QT, 'POST', `/admin/du-hoc/ho-so/${hoSoId}/buoc`, { buoc: 'dong-tien' }), [200, 201]);
  ghi('Ghi một khoản thu', await G(QT, 'POST', `/admin/du-hoc/ho-so/${hoSoId}/thu-tien`,
    { loai: 'thu', so_tien: 5000000, ngay_thu: '2026-09-22', noi_dung: 'Đặt cọc' }), [200, 201]);

  // ---------------------------------------------------------------- 5. SỔ THU CHI
  r = ghi('Xem danh mục quỹ', await G(QT, 'GET', '/admin/quy/danh-muc'), 200);
  kiem('Danh mục quỹ có sẵn mẫu', (r.j?.danh_muc || []).length > 0, true);
  const dmId = r.j.danh_muc[0].id;
  ghi('Lập phiếu thu', await G(QT, 'POST', '/admin/quy/phieu',
    { loai: 'thu', danh_muc_id: dmId, so_tien: 1200000, dien_giai: `Phiếu ${MA}`, ngay: '2026-09-22' }), [200, 201]);

  // ---------------------------------------------------------------- 6. KÝ TÚC XÁ
  r = ghi('Tạo toà ký túc xá', await G(QT, 'POST', '/admin/ktx/toa', { ten: `Toà ${MA}`, dia_chi: 'Hà Nội' }), [200, 201]);
  const toaId = r.j?.id ?? r.j?.toa?.id;
  r = ghi('Tạo phòng', await G(QT, 'POST', '/admin/ktx/phong',
    { toa_id: toaId, ten_phong: 'P101', tang: 1, suc_chua: 4, gia_thang: 1500000 }), [200, 201]);

  // ---------------------------------------------------------------- 7. ĐỀ BÀI
  r = ghi('Giáo viên soạn đề', await G(gvTok, 'POST', '/admin/de-bai',
    { tieu_de: `Đề ${MA}`, mo_ta: 'Kiểm tra 15 phút', thoi_gian_phut: 15 }), [200, 201]);
  deId = r.j?.id ?? r.j?.de?.id;
  kiem('Đề có id', typeof deId, 'number');
  ghi('Thêm câu hỏi vào đề', await G(gvTok, 'POST', `/admin/de-bai/${deId}/cau-hoi`,
    { loai: 'chon', noi_dung: '你好 nghĩa là gì?', lua_chon: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], dap_an: '0', diem: 1 }), [200, 201]);
  ghi('Phát hành đề', await G(gvTok, 'POST', `/admin/de-bai/${deId}/phat-hanh`, { trang_thai: 'phat-hanh' }), [200, 201]);
  ghi('Giao đề cho lớp mình', await G(gvTok, 'POST', `/admin/de-bai/${deId}/giao`,
    { class_id: lopId, han_nop: '2099-12-31 23:59' }), [200, 201]);
  r = ghi('Học viên thấy đề được giao', await G(tok(hvId), 'GET', '/de-bai/cua-toi'), 200);
  kiem('Có ít nhất 1 đề cho học viên', (r.j?.de || r.j?.danh_sach || []).length > 0, true);

  // ---------------------------------------------------------------- 8. ĐÁP ÁN KHÔNG LỘ
  const chuaNop = JSON.stringify(r.j || {});
  kiem('Danh sách đề KHÔNG kèm đáp án', /"dap_an"/.test(chuaNop), false);

} catch (e) {
  buoc.push({ ten: 'NGOẠI LỆ', dat: false, msg: e.message });
} finally {
  // ------------------------------------------------------------------ dọn
  if (deId) await pool.query('DELETE FROM de_bai WHERE id = ?', [deId]);
  await pool.query('DELETE FROM du_hoc_ho_so WHERE ho_ten LIKE ?', [`%${MA}`]);
  await pool.query('DELETE FROM quy_phieu WHERE dien_giai LIKE ?', [`%${MA}`]);
  await pool.query('DELETE FROM ktx_toa WHERE ten LIKE ?', [`%${MA}`]);
  if (lopId) await pool.query('DELETE FROM classes WHERE id = ?', [lopId]);
  await pool.query('DELETE FROM users WHERE email LIKE ?', [`%${MA}@local.invalid`]);
  const [[{ sot }]] = await pool.query(
    `SELECT (SELECT COUNT(*) FROM users WHERE email LIKE ?)
          + (SELECT COUNT(*) FROM classes WHERE name LIKE ?)
          + (SELECT COUNT(*) FROM du_hoc_ho_so WHERE ho_ten LIKE ?)
          + (SELECT COUNT(*) FROM ktx_toa WHERE ten LIKE ?) AS sot`,
    [`%${MA}@local.invalid`, `%${MA}`, `%${MA}`, `%${MA}`]);
  console.log(`\n🧹 dọn xong, còn sót ${sot} bản ghi (phải 0)`);
  await pool.end();
}

const dat = buoc.filter(b => b.dat).length;
console.log(`\nVÒNG ĐỜI TRUNG TÂM: ${dat}/${buoc.length} bước đạt`);
buoc.filter(b => !b.dat).forEach(b => console.log(`  ❌ ${b.ten} — ${b.msg}`));
process.exit(dat === buoc.length ? 0 : 1);
