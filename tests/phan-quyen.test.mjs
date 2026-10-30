// =============================================================
// KIỂM THỬ PHÂN QUYỀN — admin / teacher / student / khách
// =============================================================
//   npm run test:quyen     (cần `npm run server:test` đang chạy + DB local)
//
// Bộ test TỰ DỰNG tài khoản và lớp cần dùng rồi tự dọn, nên chạy được trên DB vừa `db:init`
// mà không phải seed tay. Ký JWT thẳng bằng JWT_SECRET nên không cần mật khẩu thật.
//
// ⚠️ Token phải ký bằng khoá `id` — `generateToken()` của server phát như vậy. Dùng `userId`
//    thì `req.userId` là undefined và mọi route trả 500, rất dễ tưởng là lỗi của route.
// =============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'pqtest-' + Math.random().toString(36).slice(2, 8);

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB chưa có tài khoản quản trị nào — chạy `npm run db:init` trước.'); process.exit(1); }

const hash = await bcrypt.hash('x'.repeat(12), 10);
const tao = async (role) => {
  const [r] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, is_admin, is_verified, is_approved, avatar_letter)
     VALUES (?,?,?,?,?,1,1,'T')`,
    [`${role} ${MA}`, `${role}.${MA}@local.invalid`, hash, role, 0]);
  return r.insertId;
};
const gvId = await tao('teacher');
const hvId = await tao('student');
// Lớp do CHÍNH giáo viên này phụ trách + một lớp của người khác, để kiểm phạm vi.
const maMoi = () => Math.random().toString(36).slice(2, 10).toUpperCase();
const [lopGv] = await pool.query(
  'INSERT INTO classes (name, teacher_id, is_active, invite_code) VALUES (?,?,1,?)', [`Lớp GV ${MA}`, gvId, maMoi()]);
const [lopNgoai] = await pool.query(
  'INSERT INTO classes (name, teacher_id, is_active, invite_code) VALUES (?,?,1,?)', [`Lớp ngoài ${MA}`, ad.id, maMoi()]);

const T = { admin: tok(ad.id), teacher: tok(gvId), student: tok(hvId), khach: null };

const ROUTES = [
  ['GET', '/admin/stats',                          { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['GET', '/admin/classes',                        { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['GET', `/admin/classes/${lopGv.insertId}`,      { admin: 200, teacher: 200, student: 403, khach: 401 }],
  // Lớp KHÔNG phải của giáo viên này -> 403, dù cùng hệ thống.
  // Từ 2026-10-30 giáo viên XEM được lớp đồng nghiệp (để thêm học viên); khu con vẫn 403 ở dưới.
  ['GET', `/admin/classes/${lopNgoai.insertId}`,   { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['GET', `/admin/classes/${lopNgoai.insertId}/sessions`,    { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['GET', `/admin/classes/${lopNgoai.insertId}/assignments`, { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['GET', '/admin/users',                          { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['GET', '/admin/teachers',                       { admin: 200, teacher: 403, student: 403, khach: 401 }],
  // Hồ sơ một giáo viên: từng trả 500 ở mọi nơi vì route đọc cột `note`/`author_id` trong khi DB
  // (init-db.js) là `noi_dung`/`nguoi_ghi`/`nguoi_cham`. Giữ dòng này để lỗi đó không quay lại.
  ['GET', `/admin/teachers/${gvId}`,               { admin: 200, teacher: 403, student: 403, khach: 401 }],
  // Hồ sơ du học: giáo viên xem được danh sách (2026-10-13) — không tiền, kiểm chi tiết hơn ở
  // tests/du-hoc-so-lieu-vai-tro.test.mjs. Ký túc xá / tiến độ theo trường vẫn chặn hẳn.
  ['GET', '/admin/du-hoc/ho-so',                   { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['GET', '/admin/du-hoc/theo-truong',             { admin: 200, teacher: 403, student: 403, khach: 401 }],
  // Sổ thu chi: giáo viên lập được phiếu của MÌNH (2026-10-05) nên đọc được danh mục; sửa danh mục vẫn 403.
  ['GET', '/admin/quy/danh-muc',                   { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['POST', '/admin/quy/danh-muc',                  { admin: 400, teacher: 403, student: 403, khach: 401 }],
  ['GET', '/admin/ktx/toa',                        { admin: 200, teacher: 403, student: 403, khach: 401 }],
  // Đề bài: giáo viên CÓ quyền (họ là người ra đề).
  ['GET', '/admin/de-bai',                         { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['DELETE', `/admin/classes/${lopGv.insertId}`,   { teacher: 403, student: 403, khach: 401 }],
  // Tạo lớp: giáo viên ĐƯỢC (2026-10-13) — body rỗng '{}' nên thiếu `name` -> 400 (qua được cổng
  // quyền, rơi vào validate), khác với 403 "không có quyền".
  ['POST', '/admin/classes',                       { teacher: 400, student: 403, khach: 401 }],
  // Thêm học viên vào lớp (2026-10-30): giáo viên ĐƯỢC với lớp MÌNH (body rỗng -> 400 qua cổng
  // quyền), lớp của người khác -> 403. Form còn gọi /users-unassigned trước — từng 403 với giáo viên.
  ['GET', '/admin/users-unassigned',               { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['POST', `/admin/classes/${lopGv.insertId}/students`,    { admin: 400, teacher: 400, student: 403, khach: 401 }],
  ['POST', `/admin/classes/${lopNgoai.insertId}/students`, { admin: 400, teacher: 400, student: 403, khach: 401 }],
  ['GET', `/admin/classes/${lopNgoai.insertId}/available-students`, { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['PUT', `/admin/classes/${lopNgoai.insertId}`,           { teacher: 403, student: 403, khach: 401 }],
  ['GET', '/exercise/notifications',               { admin: 200, teacher: 200, student: 200, khach: 401 }],
  ['GET', '/exercise/my-assignments',              { admin: 200, teacher: 200, student: 200, khach: 401 }],
  ['GET', '/profile/stats',                        { admin: 200, teacher: 200, student: 200, khach: 401 }],
  ['GET', '/profile/my-classes',                   { admin: 200, teacher: 200, student: 200, khach: 401 }],
  ['GET', '/lo-trinh/tong-quan',                   { admin: 200, teacher: 200, student: 200, khach: 401 }],
  // Nội dung học: bản này mở cho mọi người, kể cả khách.
  ['GET', '/noi-dung/quyen',                       { admin: 200, teacher: 200, student: 200, khach: 200 }],
  ['GET', '/noi-dung/giaotrinh/giaotrinh/td1-1',   { admin: 200, teacher: 200, student: 200, khach: 200 }],
];

let ok = 0; const bad = [];
try {
  for (const [m, path, mong] of ROUTES) {
    for (const [vai, expect] of Object.entries(mong)) {
      const h = { 'Content-Type': 'application/json' };
      if (T[vai]) h.Authorization = `Bearer ${T[vai]}`;
      let st;
      try {
        const r = await fetch(B + path, { method: m, headers: h, body: m === 'POST' ? '{}' : undefined });
        st = r.status;
      } catch (e) { st = 'ERR ' + e.message; }
      if (st === expect) ok++;
      else bad.push(`${m} ${path} · ${vai}: mong ${expect}, thực tế ${st}`);
    }
  }
  // Thêm THẬT: giáo viên đưa học viên vào lớp mình (userIds) và tạo mới bằng email; lớp ngoài bị chặn.
  const goi = async (vai, path, body) => {
    const r = await fetch(B + path, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${T[vai]}` }, body: JSON.stringify(body) });
    return { st: r.status, j: await r.json().catch(() => ({})) };
  };
  const kiem = (ten, dung) => { if (dung) ok++; else bad.push(ten); };
  let r = await goi('teacher', `/admin/classes/${lopGv.insertId}/students`, { userIds: [hvId] });
  kiem('GV thêm userIds vào lớp mình: mong 200 + status ok', r.st === 200 && r.j.results?.[0]?.status === 'ok');
  const [[dk]] = await pool.query('SELECT COUNT(*) n FROM class_enrollments WHERE class_id=? AND user_id=?', [lopGv.insertId, hvId]);
  kiem('GV thêm userIds: bản ghi class_enrollments phải có', dk.n === 1);
  r = await goi('teacher', `/admin/classes/${lopGv.insertId}/students`, { emails: [`moi.${MA}@local.invalid`] });
  kiem('GV thêm bằng email mới: mong 200 + status ok', r.st === 200 && r.j.results?.[0]?.status === 'ok');
  // Lớp của người khác: ĐƯỢC thêm như quản trị (2026-10-30), nhưng vẫn không xoá học viên khỏi đó.
  r = await goi('teacher', `/admin/classes/${lopNgoai.insertId}/students`, { userIds: [hvId] });
  kiem('GV thêm vào lớp đồng nghiệp: mong 200 + status ok', r.st === 200 && r.j.results?.[0]?.status === 'ok');
  const [[dk2]] = await pool.query('SELECT COUNT(*) n FROM class_enrollments WHERE class_id=? AND user_id=?', [lopNgoai.insertId, hvId]);
  kiem('GV thêm vào lớp đồng nghiệp: bản ghi phải có', dk2.n === 1);
  const gt = async (path) => (await fetch(B + path, { headers: { Authorization: `Bearer ${T.teacher}` } })).json();
  const ids = (j) => (j.classes || []).map(c => c.id);
  kiem('GET /classes (không cờ): GV chỉ thấy lớp mình', ids(await gt('/admin/classes')).includes(lopGv.insertId) && !ids(await gt('/admin/classes')).includes(lopNgoai.insertId));
  kiem('GET /classes?tatca=1: GV thấy cả lớp đồng nghiệp', ids(await gt('/admin/classes?tatca=1')).includes(lopNgoai.insertId));
  const xoa = await fetch(B + `/admin/classes/${lopNgoai.insertId}/students/${hvId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${T.teacher}` } });
  kiem('GV xoá học viên khỏi lớp đồng nghiệp: mong 403', xoa.status === 403);
} finally {
  await pool.query('DELETE FROM classes WHERE name LIKE ?', [`%${MA}`]);
  await pool.query('DELETE FROM users WHERE email LIKE ?', [`%${MA}@local.invalid`]);
  const [[{ sot }]] = await pool.query(
    'SELECT (SELECT COUNT(*) FROM users WHERE email LIKE ?) + (SELECT COUNT(*) FROM classes WHERE name LIKE ?) AS sot',
    [`%${MA}@local.invalid`, `%${MA}`]);
  console.log(`\n🧹 dọn xong, còn sót ${sot} bản ghi (phải 0)`);
  await pool.end();
}

console.log(`PHÂN QUYỀN: ${ok}/${ok + bad.length} đúng kỳ vọng`);
bad.forEach(x => console.log('  ❌', x));
console.log(bad.length ? '' : '  ✅ không lệch chỗ nào');
process.exit(bad.length ? 1 : 0);
