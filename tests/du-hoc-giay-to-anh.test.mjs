// Kiểm thử: danh mục giấy tờ mặc định (5 mục) + ảnh đính kèm Ảnh thẻ / Ảnh CCCD (2026-10-08).
//   npm run server:test (hoặc PORT=3099 TAT_GIOI_HAN=true node server/index.js) rồi:
//   TEST_PORT=3099 node tests/du-hoc-giay-to-anh.test.mjs
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'gtanh' + Math.random().toString(36).slice(2, 7);
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
// JPEG 1x1 hợp lệ về mặt tiền tố — server chỉ kiểm tiền tố + kích thước
const ANH = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==';

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
const QT = tok(ad.id);

try {
  const ids = {};
  for (const k of ['a', 'b']) {
    const r = await G(QT, 'POST', '/admin/users', { email: mail(k), name: `GT ${k}`, password: '123456', role: 'student' });
    ids[k] = r.j?.id;
  }
  await ngu(800);
  const A = tok(ids.a);
  const B_ = tok(ids.b);

  // 1. Danh mục mặc định
  const me = await G(A, 'GET', '/du-hoc/ho-so-cua-toi');
  const gt = me.j?.giay_to || [];
  kiem('Hồ sơ mới có đúng 5 giấy tờ mặc định', gt.length === 5, `${gt.length}: ${gt.map((g) => g.ten).join(' | ')}`);
  kiem('Thứ tự + tên: Học bạ, Bằng tốt nghiệp, Hộ chiếu, Ảnh thẻ, Ảnh CCCD (2 mặt)',
    /^Học bạ$/.test(gt[0]?.ten) && /^Bằng tốt nghiệp$/.test(gt[1]?.ten) && /^Hộ chiếu$/.test(gt[2]?.ten)
    && /^Ảnh thẻ/.test(gt[3]?.ten) && /^Ảnh CCCD \(mặt trước và mặt sau\)$/.test(gt[4]?.ten));
  kiem('Cả 5 mục bắt buộc', gt.every((g) => g.bat_buoc));
  kiem('Số ảnh tối đa: 0,0,0,2,2', gt.map((g) => g.so_anh_toi_da).join(',') === '0,0,0,2,2', gt.map((g) => g.so_anh_toi_da).join(','));
  const [anhThe, cccd, hocBa] = [gt[3], gt[4], gt[0]];

  // 2. Tải ảnh
  const r1 = await G(A, 'POST', `/du-hoc/giay-to/${anhThe.id}/anh`, { anh: ANH });
  kiem('Tải ảnh thẻ #1 -> 201', r1.s === 201, `${r1.s} ${r1.j?.error || ''}`);
  const [[t1]] = await pool.query('SELECT trang_thai FROM du_hoc_giay_to WHERE id = ?', [anhThe.id]);
  kiem('Mới 1/2 ảnh -> trạng thái vẫn "chưa"', t1.trang_thai === 'chua', t1.trang_thai);
  const r2 = await G(A, 'POST', `/du-hoc/giay-to/${anhThe.id}/anh`, { anh: ANH });
  kiem('Tải ảnh thẻ #2 -> 201', r2.s === 201, `${r2.s} ${r2.j?.error || ''}`);
  const [[t2]] = await pool.query('SELECT trang_thai, ngay_nhan FROM du_hoc_giay_to WHERE id = ?', [anhThe.id]);
  kiem('Đủ 2/2 ảnh -> tự chuyển "đã nhận" + có ngày nhận', t2.trang_thai === 'nhan' && !!t2.ngay_nhan, JSON.stringify(t2));
  const r3 = await G(A, 'POST', `/du-hoc/giay-to/${anhThe.id}/anh`, { anh: ANH });
  kiem('Ảnh thẻ thứ 3 bị từ chối (409)', r3.s === 409, `${r3.s}`);
  const c1 = await G(A, 'POST', `/du-hoc/giay-to/${cccd.id}/anh`, { anh: ANH });
  kiem('Tải ảnh CCCD -> 201', c1.s === 201, `${c1.s} ${c1.j?.error || ''}`);
  const c2 = await G(A, 'POST', `/du-hoc/giay-to/${cccd.id}/anh`, { anh: ANH });
  kiem('Ảnh CCCD mặt sau (ảnh thứ 2) -> 201', c2.s === 201, `${c2.s} ${c2.j?.error || ''}`);
  const c3 = await G(A, 'POST', `/du-hoc/giay-to/${cccd.id}/anh`, { anh: ANH });
  kiem('Ảnh CCCD thứ 3 bị từ chối (tối đa 2)', c3.s === 409, `${c3.s}`);

  // 3. Từ chối đầu vào xấu
  const x1 = await G(A, 'POST', `/du-hoc/giay-to/${hocBa.id}/anh`, { anh: ANH });
  kiem('Học bạ (không nhận ảnh) -> 400', x1.s === 400, `${x1.s}`);
  const x2 = await G(A, 'POST', `/du-hoc/giay-to/${cccd.id}/anh`, { anh: 'data:text/html;base64,PGI+' });
  kiem('Không phải ảnh -> 400', x2.s === 400, `${x2.s}`);
  const x3 = await G(A, 'POST', `/du-hoc/giay-to/${cccd.id}/anh`, { anh: 'data:image/jpeg;base64,' + 'A'.repeat(550_000) });
  kiem('Ảnh quá lớn -> 413', x3.s === 413, `${x3.s}`);

  // 4. Phân quyền: học sinh khác không đụng được
  const xb = await G(B_, 'POST', `/du-hoc/giay-to/${cccd.id}/anh`, { anh: ANH });
  kiem('Học sinh B tải ảnh vào giấy tờ của A -> 404', xb.s === 404, `${xb.s}`);
  const dsAnh = (await G(A, 'GET', '/du-hoc/ho-so-cua-toi')).j.giay_to;
  const anhA = dsAnh[3].anh[0].id;
  kiem('Danh sách trả id ảnh, KHÔNG kèm base64', dsAnh[3].anh.length === 2 && !('anh' in dsAnh[3].anh[0] && dsAnh[3].anh[0].anh));
  const vb = await G(B_, 'GET', `/du-hoc/giay-to-anh/${anhA}`);
  kiem('Học sinh B xem ảnh của A -> 404', vb.s === 404, `${vb.s}`);
  const db = await G(B_, 'DELETE', `/du-hoc/giay-to-anh/${anhA}`);
  kiem('Học sinh B xoá ảnh của A -> 404', db.s === 404, `${db.s}`);
  const va = await G(A, 'GET', `/du-hoc/giay-to-anh/${anhA}`);
  kiem('A xem ảnh của mình -> 200 có dữ liệu', va.s === 200 && va.j?.anh === ANH, `${va.s}`);

  // 5. Quản trị thấy + thao tác
  const [[hs]] = await pool.query('SELECT id FROM du_hoc_ho_so WHERE user_id = ?', [ids.a]);
  const ct = await G(QT, 'GET', `/admin/du-hoc/ho-so/${hs.id}`);
  const gtAd = ct.j?.giay_to || [];
  kiem('Admin thấy 2 ảnh ở Ảnh thẻ, 2 ở CCCD', gtAd[3]?.anh?.length === 2 && gtAd[4]?.anh?.length === 2);
  const vAd = await G(QT, 'GET', `/admin/du-hoc/giay-to-anh/${anhA}`);
  kiem('Admin xem ảnh -> 200', vAd.s === 200 && vAd.j?.anh === ANH, `${vAd.s}`);

  // 6. Xoá
  const dA = await G(A, 'DELETE', `/du-hoc/giay-to-anh/${anhA}`);
  kiem('A xoá ảnh của mình -> 200', dA.s === 200, `${dA.s}`);
  const r4 = await G(A, 'POST', `/du-hoc/giay-to/${anhThe.id}/anh`, { anh: ANH });
  kiem('Sau khi xoá bớt, tải lại được', r4.s === 201, `${r4.s} ${r4.j?.error || ''}`);

  // 7. Đã nộp trường -> học sinh không đổi ảnh được, admin vẫn xoá được
  await G(QT, 'PUT', `/admin/du-hoc/giay-to/${cccd.id}`, { trang_thai: 'nop' });
  const cc = (await G(A, 'GET', '/du-hoc/ho-so-cua-toi')).j.giay_to[4];
  const dKhoa = await G(A, 'DELETE', `/du-hoc/giay-to-anh/${cc.anh[0].id}`);
  kiem('Giấy tờ đã nộp trường: học sinh xoá ảnh -> 409', dKhoa.s === 409, `${dKhoa.s}`);
  const dAd = await G(QT, 'DELETE', `/admin/du-hoc/giay-to-anh/${cc.anh[0].id}`);
  kiem('Admin vẫn xoá được', dAd.s === 200, `${dAd.s}`);
  const upAd = await G(QT, 'POST', `/admin/du-hoc/giay-to/${cccd.id}/anh`, { anh: ANH });
  kiem('Admin tải thay cho học sinh -> 201', upAd.s === 201, `${upAd.s} ${upAd.j?.error || ''}`);

  // 8. Hồ sơ có ảnh không bị coi là "tự sinh chưa dùng"
  const { sqlTuSinhChuaDung } = await import('../server/utils/du-hoc-tao-hs.js');
  const [bv] = await pool.query(`SELECT h.id FROM du_hoc_ho_so h WHERE h.id = ? AND ${sqlTuSinhChuaDung('h')}`, [hs.id]);
  kiem('Hồ sơ đã có ảnh giấy tờ KHÔNG bị tính là tự sinh chưa dùng', bv.length === 0);
} finally {
  const [us] = await pool.query('SELECT id FROM users WHERE email LIKE ?', [`%.${MA}@local.invalid`]);
  const dsId = us.map((u) => u.id);
  if (dsId.length) {
    await pool.query('DELETE FROM du_hoc_ho_so WHERE user_id IN (?)', [dsId]);
    await pool.query('DELETE FROM users WHERE id IN (?)', [dsId]);
  }
  for (const k of ketQua) console.log(`${k.dat ? '✅' : '❌'} ${k.ten}${k.dat ? '' : '  -> ' + k.chiTiet}`);
  const hong = ketQua.filter((k) => !k.dat).length;
  console.log(`\n${ketQua.length - hong}/${ketQua.length} đạt`);
  process.exit(hong ? 1 : 0);
}
