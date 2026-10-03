// Kiểm thử: hồ sơ du học CHỈ dành cho học sinh.
//   npm run server:test (hoặc PORT=3099 ...) rồi: TEST_PORT=3099 node tests/du-hoc-chi-hoc-sinh.test.mjs
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'dhtest' + Math.random().toString(36).slice(2, 7);
const mail = (k) => `${k}.${MA}@local.invalid`;
const ketQua = [];
const kiem = (ten, dat, chiTiet = '') => ketQua.push({ ten, dat: !!dat, chiTiet });
const ngu = (ms) => new Promise((r) => setTimeout(r, ms));

async function G(token, method, path, body) {
  const h = { 'Content-Type': 'application/json' };
  if (token) h.Authorization = `Bearer ${token}`;
  const r = await fetch(B + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  let j = null; try { j = await r.json(); } catch {}
  return { s: r.status, j };
}
const idTheoMail = async (m) => (await pool.query('SELECT id FROM users WHERE email = ?', [m]))[0][0]?.id;
const soHoSo = async (uid) => (await pool.query('SELECT COUNT(*) n FROM du_hoc_ho_so WHERE user_id = ?', [uid]))[0][0].n;

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
const QT = tok(ad.id);

try {
  // 1. Học sinh tự đăng ký
  await G(null, 'POST', '/auth/register', { name: 'HS Dang Ky', email: mail('reg'), password: '123456' });
  await ngu(800);
  const regId = await idTheoMail(mail('reg'));
  kiem('Học sinh tự đăng ký -> có hồ sơ', (await soHoSo(regId)) === 1);

  // 2. Admin tạo tài khoản từng vai trò
  const ids = {};
  for (const vai of ['student', 'teacher', 'sale', 'ho_so', 'admin']) {
    const r = await G(QT, 'POST', '/admin/users', { email: mail(vai), name: `Test ${vai}`, password: '123456', role: vai });
    ids[vai] = r.j?.id;
  }
  await ngu(800);
  kiem('Admin tạo HỌC SINH -> có hồ sơ', (await soHoSo(ids.student)) === 1);
  for (const vai of ['teacher', 'sale', 'ho_so', 'admin']) {
    kiem(`Admin tạo ${vai.toUpperCase()} -> KHÔNG có hồ sơ`, ids[vai] && (await soHoSo(ids[vai])) === 0, `id=${ids[vai]}`);
  }

  // 3. Học sinh -> giáo viên (đúng ca khách gặp)
  await G(QT, 'PUT', `/admin/users/${regId}`, { role: 'teacher' });
  kiem('Đổi học sinh -> GIÁO VIÊN: hồ sơ bị gỡ', (await soHoSo(regId)) === 0);
  const me = await G(tok(regId), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Giáo viên mở /ho-so-cua-toi -> co:false', me.j?.co === false, JSON.stringify(me.j).slice(0, 80));
  kiem('Giáo viên mở /ho-so-cua-toi KHÔNG tự sinh lại hồ sơ', (await soHoSo(regId)) === 0);

  // 4. Về lại học sinh
  await G(QT, 'PUT', `/admin/users/${regId}`, { role: 'student' });
  kiem('Đổi giáo viên -> HỌC SINH: có lại hồ sơ', (await soHoSo(regId)) === 1);

  // 5. Đường "Thêm giáo viên bằng email" nâng học sinh có sẵn
  await G(QT, 'POST', '/admin/teachers', { email: mail('student') });
  kiem('Thêm GV bằng email của học sinh -> hồ sơ bị gỡ', (await soHoSo(ids.student)) === 0);
  // 6. Bỏ vai trò giáo viên
  await G(QT, 'DELETE', `/admin/teachers/${ids.student}`);
  kiem('Bỏ vai trò GV -> có lại hồ sơ', (await soHoSo(ids.student)) === 1);

  // 7. Ô tìm học viên để gắn hồ sơ không có nhân sự
  const tim = await G(QT, 'GET', `/admin/du-hoc/hoc-vien?tim=${MA}`);
  const emails = (tim.j?.hoc_vien || []).map((x) => x.email);
  kiem('Ô tìm học viên KHÔNG trả nhân sự',
    !['teacher', 'sale', 'ho_so', 'admin'].some((v) => emails.includes(mail(v))), emails.join(','));

  // 8. Gắn giáo viên vào hồ sơ thủ công -> bị chặn
  const gan = await G(QT, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Gan GV', user_id: ids.teacher });
  kiem('Tạo hồ sơ gắn tài khoản GIÁO VIÊN -> 400', gan.s === 400, `${gan.s} ${gan.j?.error || ''}`);

  // 9. Giáo viên gọi cổng học sinh
  const gv = await G(tok(ids.teacher), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Tài khoản GV gọi /ho-so-cua-toi -> co:false', gv.j?.co === false);
} finally {
  const [us] = await pool.query('SELECT id FROM users WHERE email LIKE ?', [`%.${MA}@local.invalid`]);
  const dsId = us.map((u) => u.id);
  if (dsId.length) {
    await pool.query('DELETE FROM du_hoc_ho_so WHERE user_id IN (?)', [dsId]);
    await pool.query("DELETE FROM du_hoc_ho_so WHERE ho_ten = 'Gan GV'");
    await pool.query('DELETE FROM users WHERE id IN (?)', [dsId]);
  }
  for (const k of ketQua) console.log(`${k.dat ? '✅' : '❌'} ${k.ten}${k.dat ? '' : '  -> ' + k.chiTiet}`);
  const hong = ketQua.filter((k) => !k.dat).length;
  console.log(`\n${ketQua.length - hong}/${ketQua.length} đạt`);
  process.exit(hong ? 1 : 0);
}
