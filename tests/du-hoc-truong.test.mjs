// Kiểm thử: Tiến độ theo trường do quản trị tự quản lý (2026-10-08).
//   npm run server:test (hoặc PORT=3099 TAT_GIOI_HAN=true node server/index.js) rồi:
//   TEST_PORT=3099 node tests/du-hoc-truong.test.mjs
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'truongtest' + Math.random().toString(36).slice(2, 7);
const ketQua = [];
const kiem = (ten, dat, chiTiet = '') => ketQua.push({ ten, dat: !!dat, chiTiet });

async function G(token, method, path, body) {
  const h = { 'Content-Type': 'application/json' };
  if (token) h.Authorization = `Bearer ${token}`;
  const r = await fetch(B + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  let j = null; try { j = await r.json(); } catch {}
  return { s: r.status, j };
}

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
const QT = tok(ad.id);
const hash = await bcrypt.hash('x'.repeat(12), 10);
const taoUser = async (role) => (await pool.query(
  `INSERT INTO users (name, email, password_hash, role, is_admin, is_verified, is_approved, avatar_letter)
   VALUES (?,?,?,?,0,1,1,'T')`, [`${role} ${MA}`, `${role}.${MA}@local.invalid`, hash, role]))[0].insertId;
const taoHoSo = async (nhan, tuVan = null) => (await pool.query(
  `INSERT INTO du_hoc_ho_so (org_id, ma_hs, ho_ten, tu_van_id, buoc, ky_nhap_hoc, nganh, cccd)
   VALUES (1,?,?,?,'hoc','2027 Xuân','Kinh doanh','0123456789')`,
  [`HS-${MA}-${nhan}`, `Học sinh ${nhan} ${MA}`, tuVan]))[0].insertId;

try {
  const gv = await taoUser('teacher');
  const hs1 = await taoHoSo('1');
  const hs2 = await taoHoSo('2');
  const tenA = `Đại học Thành Công ${MA}`;

  // 1. Thêm trường
  const t1 = await G(QT, 'POST', '/admin/du-hoc/theo-truong', { ten: `  ${tenA}  ` });
  kiem('Admin thêm trường -> 201', t1.s === 201 && t1.j?.id, `${t1.s} ${t1.j?.error || ''}`);
  const idA = t1.j?.id;
  const trong = await G(QT, 'POST', '/admin/du-hoc/theo-truong', { ten: '   ' });
  kiem('Tên rỗng -> 400', trong.s === 400, `${trong.s}`);
  const dai = await G(QT, 'POST', '/admin/du-hoc/theo-truong', { ten: 'x'.repeat(201) });
  kiem('Tên > 200 ký tự -> 400', dai.s === 400, `${dai.s}`);
  const trung = await G(QT, 'POST', '/admin/du-hoc/theo-truong', { ten: tenA.toUpperCase() });
  kiem('Trùng tên (khác hoa/thường) -> 409', trung.s === 409, `${trung.s}`);
  const t2 = await G(QT, 'POST', '/admin/du-hoc/theo-truong', { ten: `Đại học Phụ Nhân ${MA}` });
  const idB = t2.j?.id;
  const doiTrung = await G(QT, 'PUT', `/admin/du-hoc/theo-truong/${idB}`, { ten: tenA });
  kiem('Đổi tên trùng trường khác -> 409', doiTrung.s === 409, `${doiTrung.s}`);
  const doi = await G(QT, 'PUT', `/admin/du-hoc/theo-truong/${idB}`, { ten: `Đại học Phụ Nhân (FJU) ${MA}` });
  kiem('Đổi tên hợp lệ -> 200', doi.s === 200, `${doi.s}`);
  const doi404 = await G(QT, 'PUT', '/admin/du-hoc/theo-truong/99999999', { ten: 'abc' });
  kiem('Đổi tên trường không tồn tại -> 404', doi404.s === 404, `${doi404.s}`);

  // 2. Thêm học sinh
  const a1 = await G(QT, 'POST', `/admin/du-hoc/theo-truong/${idA}/hoc-sinh`, { ho_so_id: hs1 });
  kiem('Thêm học sinh vào trường -> 201', a1.s === 201, `${a1.s} ${a1.j?.error || ''}`);
  const a1b = await G(QT, 'POST', `/admin/du-hoc/theo-truong/${idA}/hoc-sinh`, { ho_so_id: hs1 });
  kiem('Thêm lần 2 cùng học sinh -> 409', a1b.s === 409, `${a1b.s}`);
  const aSai = await G(QT, 'POST', `/admin/du-hoc/theo-truong/${idA}/hoc-sinh`, { ho_so_id: 99999999 });
  kiem('Hồ sơ không tồn tại -> 404', aSai.s === 404, `${aSai.s}`);
  const aThieu = await G(QT, 'POST', `/admin/du-hoc/theo-truong/${idA}/hoc-sinh`, {});
  kiem('Thiếu ho_so_id -> 400', aThieu.s === 400, `${aThieu.s}`);
  const aTruong = await G(QT, 'POST', '/admin/du-hoc/theo-truong/99999999/hoc-sinh', { ho_so_id: hs1 });
  kiem('Trường không tồn tại -> 404', aTruong.s === 404, `${aTruong.s}`);
  await G(QT, 'POST', `/admin/du-hoc/theo-truong/${idA}/hoc-sinh`, { ho_so_id: hs2 });
  const a3 = await G(QT, 'POST', `/admin/du-hoc/theo-truong/${idB}/hoc-sinh`, { ho_so_id: hs1 });
  kiem('Một học sinh thuộc được NHIỀU trường -> 201', a3.s === 201, `${a3.s}`);

  // 3. Kết quả
  const [[m1]] = await pool.query('SELECT id FROM du_hoc_truong_hs WHERE truong_id = ? AND ho_so_id = ?', [idA, hs1]);
  const kq1 = await G(QT, 'PUT', `/admin/du-hoc/theo-truong-hs/${m1.id}`, { ket_qua: 'dau' });
  kiem('Đặt kết quả Đậu -> 200', kq1.s === 200, `${kq1.s}`);
  const kqSai = await G(QT, 'PUT', `/admin/du-hoc/theo-truong-hs/${m1.id}`, { ket_qua: 'abc' });
  kiem('Kết quả lạ -> 400', kqSai.s === 400, `${kqSai.s}`);

  // 4. Đọc
  const ds = await G(QT, 'GET', '/admin/du-hoc/theo-truong');
  const tA = (ds.j?.truong || []).find((t) => t.id === idA);
  const tB = (ds.j?.truong || []).find((t) => t.id === idB);
  kiem('GET trả đủ trường mới thêm, sua_duoc=true', ds.s === 200 && tA && tB && ds.j.sua_duoc === true);
  kiem('Trường A: 2 học sinh, 1 đậu, 1 chờ', tA?.tong === 2 && tA.dau === 1 && tA.cho === 1 && tA.truot === 0, JSON.stringify({ tong: tA?.tong, dau: tA?.dau, cho: tA?.cho }));
  const h = tA?.hoc_sinh.find((x) => x.ho_so_id === hs1);
  kiem('Mỗi học sinh có họ tên, bước, kỳ nhập học, ngành, kết quả',
    h && h.ho_ten.includes(MA) && h.buoc === 'hoc' && h.ky_nhap_hoc === '2027 Xuân' && h.nganh === 'Kinh doanh' && h.ket_qua === 'dau');
  kiem('Không trả CCCD', !JSON.stringify(ds.j).includes('0123456789'));

  // 5. Phân quyền
  const gvTok = tok(gv);
  for (const [m, p, b] of [['GET', '/admin/du-hoc/theo-truong'], ['POST', '/admin/du-hoc/theo-truong', { ten: 'x' }],
    ['DELETE', `/admin/du-hoc/theo-truong/${idA}`]]) {
    const r = await G(gvTok, m, p, b);
    kiem(`Giáo viên ${m} ${p} -> 403`, r.s === 403, `${r.s}`);
  }
  const kh = await G(null, 'GET', '/admin/du-hoc/theo-truong');
  kiem('Khách chưa đăng nhập -> 401', kh.s === 401, `${kh.s}`);

  // 6. Gỡ / xoá KHÔNG xoá hồ sơ
  const go = await G(QT, 'DELETE', `/admin/du-hoc/theo-truong-hs/${m1.id}`);
  kiem('Gỡ học sinh khỏi trường -> 200', go.s === 200, `${go.s}`);
  const go404 = await G(QT, 'DELETE', `/admin/du-hoc/theo-truong-hs/${m1.id}`);
  kiem('Gỡ lần 2 -> 404', go404.s === 404, `${go404.s}`);
  const [[con1]] = await pool.query('SELECT COUNT(*) n FROM du_hoc_ho_so WHERE id IN (?, ?)', [hs1, hs2]);
  kiem('Gỡ khỏi trường KHÔNG xoá hồ sơ', con1.n === 2);
  const xoa = await G(QT, 'DELETE', `/admin/du-hoc/theo-truong/${idA}`);
  kiem('Xoá trường -> 200', xoa.s === 200, `${xoa.s}`);
  const [[lk]] = await pool.query('SELECT COUNT(*) n FROM du_hoc_truong_hs WHERE truong_id = ?', [idA]);
  const [[con2]] = await pool.query('SELECT COUNT(*) n FROM du_hoc_ho_so WHERE id IN (?, ?)', [hs1, hs2]);
  kiem('Xoá trường kéo theo liên kết nhưng KHÔNG xoá hồ sơ', lk.n === 0 && con2.n === 2);
  const [[conB]] = await pool.query('SELECT COUNT(*) n FROM du_hoc_truong_hs WHERE truong_id = ?', [idB]);
  kiem('Trường khác của học sinh đó không bị ảnh hưởng', conB.n === 1);

  // 7. Xoá hồ sơ -> tự rời khỏi trường
  await pool.query('DELETE FROM du_hoc_ho_so WHERE id = ?', [hs1]);
  const [[conB2]] = await pool.query('SELECT COUNT(*) n FROM du_hoc_truong_hs WHERE truong_id = ?', [idB]);
  kiem('Xoá hồ sơ -> tự rời khỏi mọi trường', conB2.n === 0);
} finally {
  await pool.query('DELETE FROM du_hoc_truong WHERE ten LIKE ?', [`%${MA}%`]);
  await pool.query('DELETE FROM du_hoc_ho_so WHERE ma_hs LIKE ?', [`HS-${MA}-%`]);
  await pool.query('DELETE FROM users WHERE email LIKE ?', [`%.${MA}@local.invalid`]);
  for (const k of ketQua) console.log(`${k.dat ? '✅' : '❌'} ${k.ten}${k.dat ? '' : '  -> ' + k.chiTiet}`);
  const hong = ketQua.filter((k) => !k.dat).length;
  console.log(`\n${ketQua.length - hong}/${ketQua.length} đạt`);
  process.exit(hong ? 1 : 0);
}
