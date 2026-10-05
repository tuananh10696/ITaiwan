// Kiểm thử: khách / tài khoản CHƯA DUYỆT chỉ học thử 3 bài đầu mỗi quyển; ĐÃ DUYỆT học hết.
//   npm run server:test (hoặc PORT=3099 ...) rồi: TEST_PORT=3099 node tests/hoc-thu-cho-duyet.test.mjs
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pool from '../server/config/db.js';
import { SO_BAI_MO } from '../shared/noi-dung-mo.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'hocthu' + Math.random().toString(36).slice(2, 7);
const ketQua = [];
const kiem = (ten, dat, chiTiet = '') => ketQua.push({ ten, dat: !!dat, chiTiet });

async function G(token, path) {
  const h = {};
  if (token) h.Authorization = `Bearer ${token}`;
  const r = await fetch(B + path, { headers: h });
  let j = null; try { j = await r.json(); } catch {}
  return { s: r.status, j };
}

const bai = (q, n) => `/noi-dung/giaotrinh/giaotrinh/td${q}-${n}`;
const ids = [];
try {
  const [r1] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, is_admin, is_verified, is_approved)
     VALUES ('Cho duyet', ?, 'x', 'student', 0, 1, 0)`, [`cho.${MA}@local.invalid`]);
  const [r2] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, is_admin, is_verified, is_approved)
     VALUES ('Da duyet', ?, 'x', 'student', 0, 1, 1)`, [`duyet.${MA}@local.invalid`]);
  const [r3] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, is_admin, is_verified, is_approved)
     VALUES ('GV', ?, 'x', 'teacher', 0, 1, 0)`, [`gv.${MA}@local.invalid`]);
  ids.push(r1.insertId, r2.insertId, r3.insertId);
  const nguoi = { khach: null, 'chưa duyệt': tok(r1.insertId), 'đã duyệt': tok(r2.insertId), 'giáo viên': tok(r3.insertId) };
  const moHet = { khach: false, 'chưa duyệt': false, 'đã duyệt': true, 'giáo viên': true };

  for (const [ai, t] of Object.entries(nguoi)) {
    kiem(`${ai}: bài 1 quyển 1 mở`, (await G(t, bai(1, 1))).s === 200);
    kiem(`${ai}: bài ${SO_BAI_MO} quyển 3 mở`, (await G(t, bai(3, SO_BAI_MO))).s === 200);
    const b4 = await G(t, bai(1, SO_BAI_MO + 1));
    kiem(`${ai}: bài ${SO_BAI_MO + 1} quyển 1 -> ${moHet[ai] ? '200' : '402'}`, b4.s === (moHet[ai] ? 200 : 402), `${b4.s}`);
    const thi = await G(t, '/noi-dung/thi/tocfl');
    kiem(`${ai}: đề thi thử TOCFL -> ${moHet[ai] ? '200' : '402'}`, thi.s === (moHet[ai] ? 200 : 402), `${thi.s}`);
    const q = await G(t, '/noi-dung/quyen');
    kiem(`${ai}: /quyen tat_ca = ${moHet[ai]}, cho_duyet = ${ai === 'chưa duyệt'}`,
      q.j?.tat_ca === moHet[ai] && q.j?.cho_duyet === (ai === 'chưa duyệt'), JSON.stringify(q.j));
  }

  // Admin bấm Duyệt -> lần tải kế tiếp đã mở (không đệm quyền)
  await pool.query('UPDATE users SET is_approved = 1 WHERE id = ?', [r1.insertId]);
  kiem('Vừa được duyệt -> bài 4 mở ngay', (await G(nguoi['chưa duyệt'], bai(1, SO_BAI_MO + 1))).s === 200);
} finally {
  if (ids.length) await pool.query('DELETE FROM users WHERE id IN (?)', [ids]);
  for (const k of ketQua) console.log(`${k.dat ? '✅' : '❌'} ${k.ten}${k.dat ? '' : '  -> ' + k.chiTiet}`);
  const hong = ketQua.filter((k) => !k.dat).length;
  console.log(`\n${ketQua.length - hong}/${ketQua.length} đạt`);
  await pool.end();
  process.exit(hong ? 1 : 0);
}
