// =============================================================
// KIỂM THỬ PHÂN QUYỀN — student / teacher / admin / khách (2026-09-06)
// =============================================================
//   npm run test:quyen        (cần `npm run server` đang chạy + DB local)
//
// Ký JWT thẳng bằng JWT_SECRET nên KHÔNG cần mật khẩu tài khoản thật. Chỉ dùng GET và những
// POST/DELETE mà ta KỲ VỌNG bị chặn — bị chặn thì không đổi dữ liệu, chạy bao nhiêu lần cũng an toàn.
// =============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';
const tok = (id, name) => jwt.sign({ id, name, email: `${name}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const T = { admin: tok(1, 'admin'), teacher: tok(26, 'teacher'), student: tok(6, 'student'), khach: null };
// Cổng đổi được để chạy song song một backend thử nghiệm (CLAUDE.md 4.17):
//   TEST_PORT=3999 node tests/phan-quyen.test.mjs
const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;

// Chỉ dùng GET + những POST/DELETE mà ta KỲ VỌNG bị chặn (bị chặn thì không đổi dữ liệu).
const ROUTES = [
  ['GET', '/admin/stats',                 { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['GET', '/admin/classes',               { admin: 200, teacher: 200, student: 403, khach: 401 }],
  ['GET', '/admin/classes/1',             { admin: 200, teacher: 403, student: 403, khach: 401 }], // lớp của admin
  ['GET', '/admin/classes/1/assignments', { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['GET', '/admin/users',                 { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['GET', '/admin/vocabulary',            { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['GET', '/admin/teachers',              { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['GET', '/admin/exam-questions',        { admin: 200, teacher: 403, student: 403, khach: 401 }],
  ['DELETE', '/admin/classes/1',          { teacher: 403, student: 403, khach: 401 }],
  ['POST', '/admin/classes',              { teacher: 403, student: 403, khach: 401 }],
  ['GET', '/exercise/notifications',      { admin: 200, teacher: 200, student: 200, khach: 401 }],
  ['GET', '/exercise/my-assignments',     { admin: 200, teacher: 200, student: 200, khach: 401 }],
  ['GET', '/profile/stats',               { admin: 200, teacher: 200, student: 200, khach: 401 }],
  ['GET', '/profile/my-classes',          { admin: 200, teacher: 200, student: 200, khach: 401 }],
];

let ok = 0, bad = [];
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
console.log(`\nPHÂN QUYỀN: ${ok}/${ok + bad.length} đúng kỳ vọng`);
bad.forEach(x => console.log('  ❌', x));
if (!bad.length) console.log('  ✅ không lệch chỗ nào');
