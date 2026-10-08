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
  // 1. Học sinh tự đăng ký: CHƯA duyệt -> chưa có hồ sơ; admin duyệt -> có hồ sơ
  await G(null, 'POST', '/auth/register', { name: 'HS Dang Ky', email: mail('reg'), password: '123456' });
  await ngu(800);
  const regId = await idTheoMail(mail('reg'));
  kiem('Học sinh tự đăng ký (chưa duyệt) -> CHƯA có hồ sơ', (await soHoSo(regId)) === 0);
  const meChuaDuyet = await G(tok(regId), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Chưa duyệt mở /ho-so-cua-toi -> co:false, không tự sinh',
    meChuaDuyet.j?.co === false && (await soHoSo(regId)) === 0);
  await G(QT, 'PUT', `/admin/users/${regId}/approve`, {});
  await ngu(800);
  kiem('Admin duyệt -> có hồ sơ', (await soHoSo(regId)) === 1);

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

  // 3. Học sinh -> giáo viên khi hồ sơ còn là hồ sơ TỰ SINH chưa ai đụng tới: dọn đi
  await G(QT, 'PUT', `/admin/users/${regId}`, { role: 'teacher' });
  kiem('Đổi học sinh (hồ sơ tự sinh trống) -> GIÁO VIÊN: hồ sơ được dọn', (await soHoSo(regId)) === 0);
  const me = await G(tok(regId), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Giáo viên mở /ho-so-cua-toi -> co:false', me.j?.co === false, JSON.stringify(me.j).slice(0, 80));
  kiem('Giáo viên mở /ho-so-cua-toi KHÔNG tự sinh lại hồ sơ', (await soHoSo(regId)) === 0);

  // 4. Về lại học sinh
  await G(QT, 'PUT', `/admin/users/${regId}`, { role: 'student' });
  kiem('Đổi giáo viên -> HỌC SINH: có lại hồ sơ', (await soHoSo(regId)) === 1);

  // 5. Hồ sơ ĐÃ CÓ DỮ LIỆU: đổi vai trò KHÔNG được xoá, đổi lại phải thấy đúng hồ sơ cũ.
  //    (Bản 03/10 xoá cứng hồ sơ "chưa thu tiền + chưa gửi", kéo theo giấy tờ, nhật ký...)
  const [[hsReg]] = await pool.query('SELECT id, ma_hs FROM du_hoc_ho_so WHERE user_id = ?', [regId]);
  await ngu(1100); // updated_at tính theo giây: sửa cùng giây với lúc tạo thì không phân biệt được
  await G(QT, 'PUT', `/admin/du-hoc/ho-so/${hsReg.id}`, { ghi_chu: 'Đã tư vấn qua điện thoại' });
  await G(QT, 'PUT', `/admin/users/${regId}`, { role: 'teacher' });
  const [[conLai]] = await pool.query('SELECT id, user_id, ghi_chu FROM du_hoc_ho_so WHERE id = ?', [hsReg.id]);
  kiem('Hồ sơ có dữ liệu + đổi sang GIÁO VIÊN -> KHÔNG bị xoá, giữ liên kết',
    conLai && conLai.user_id === regId && conLai.ghi_chu === 'Đã tư vấn qua điện thoại', JSON.stringify(conLai));
  const meGv = await G(tok(regId), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('…nhưng giáo viên vẫn không xem được hồ sơ', meGv.j?.co === false);
  await G(QT, 'PUT', `/admin/users/${regId}`, { role: 'student' });
  const meHs = await G(tok(regId), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Đổi lại HỌC SINH -> thấy đúng hồ sơ cũ, không sinh hồ sơ thứ hai',
    (await soHoSo(regId)) === 1 && meHs.j?.ma_hs === hsReg.ma_hs, `${meHs.j?.ma_hs} vs ${hsReg.ma_hs}`);

  // 6. Đường "Thêm giáo viên bằng email" nâng học sinh có sẵn
  await G(QT, 'POST', '/admin/teachers', { email: mail('student') });
  kiem('Thêm GV bằng email của học sinh -> hồ sơ tự sinh được dọn', (await soHoSo(ids.student)) === 0);
  // 7. Bỏ vai trò giáo viên
  await G(QT, 'DELETE', `/admin/teachers/${ids.student}`);
  kiem('Bỏ vai trò GV -> có lại hồ sơ', (await soHoSo(ids.student)) === 1);

  // 8. Admin "Tạo hồ sơ gắn tài khoản" cho học sinh đang có hồ sơ tự sinh trống -> được, hồ sơ
  //    tự sinh nhường chỗ (trước đây luôn 400 "đã gắn với hồ sơ HS-xxxx").
  const tao = await G(QT, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Tao Tay', user_id: ids.student });
  const [dsHs] = await pool.query('SELECT id FROM du_hoc_ho_so WHERE user_id = ?', [ids.student]);
  kiem('Tạo hồ sơ gắn học sinh có hồ sơ tự sinh trống -> 201, chỉ còn hồ sơ mới',
    tao.s === 201 && dsHs.length === 1 && dsHs[0].id === tao.j?.id, `${tao.s} ${tao.j?.error || ''} n=${dsHs.length}`);
  // …còn hồ sơ có dữ liệu thì vẫn chặn
  const tao2 = await G(QT, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Tao Tay 2', user_id: regId });
  kiem('Tạo hồ sơ gắn học sinh đã có hồ sơ CÓ DỮ LIỆU -> 400', tao2.s === 400, `${tao2.s}`);

  // 9. Hai request cùng lúc không sinh hai hồ sơ
  const r9 = await G(QT, 'POST', '/admin/users', { email: mail('songsong'), name: 'Song Song', password: '123456', role: 'student' });
  await ngu(800);
  await pool.query('DELETE FROM du_hoc_ho_so WHERE user_id = ?', [r9.j?.id]);
  const t9 = tok(r9.j?.id);
  await Promise.all([1, 2, 3, 4].map(() => G(t9, 'GET', '/du-hoc/ho-so-cua-toi')));
  kiem('4 request /ho-so-cua-toi song song -> đúng 1 hồ sơ', (await soHoSo(r9.j?.id)) === 1);

  // 10. Ô tìm học viên để gắn hồ sơ không có nhân sự
  const tim = await G(QT, 'GET', `/admin/du-hoc/hoc-vien?tim=${MA}`);
  const emails = (tim.j?.hoc_vien || []).map((x) => x.email);
  kiem('Ô tìm học viên KHÔNG trả nhân sự',
    !['teacher', 'sale', 'ho_so', 'admin'].some((v) => emails.includes(mail(v))), emails.join(','));

  // 11. Gắn giáo viên vào hồ sơ thủ công -> bị chặn
  const gan = await G(QT, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Gan GV', user_id: ids.teacher });
  kiem('Tạo hồ sơ gắn tài khoản GIÁO VIÊN -> 400', gan.s === 400, `${gan.s} ${gan.j?.error || ''}`);

  // 12. Giáo viên gọi cổng học sinh
  const gv = await G(tok(ids.teacher), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Tài khoản GV gọi /ho-so-cua-toi -> co:false', gv.j?.co === false);

  // 13. Admin tự kiểm hồ sơ của mình qua cổng học sinh (2026-10-08); sale / quản lý hồ sơ vẫn không có
  const adm = await G(tok(ids.admin), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Admin gọi /ho-so-cua-toi -> co:true, tự sinh đúng 1 hồ sơ', adm.j?.co === true && (await soHoSo(ids.admin)) === 1, JSON.stringify(adm.j).slice(0, 80));
  await G(tok(ids.admin), 'GET', '/du-hoc/ho-so-cua-toi');
  kiem('Admin mở lại -> vẫn 1 hồ sơ (không nhân đôi)', (await soHoSo(ids.admin)) === 1);
  const luuAdm = await G(tok(ids.admin), 'PUT', '/du-hoc/khai-bao', { ho_ten: 'Admin Tu Kiem', nganh: 'Thu' });
  kiem('Admin lưu nháp khai báo như học sinh -> 200', luuAdm.s === 200, JSON.stringify(luuAdm.j));
  for (const vai of ['sale', 'ho_so']) {
    const x = await G(tok(ids[vai]), 'GET', '/du-hoc/ho-so-cua-toi');
    kiem(`${vai.toUpperCase()} gọi /ho-so-cua-toi -> co:false`, x.j?.co === false && (await soHoSo(ids[vai])) === 0);
  }
  const [[hsAdm]] = await pool.query('SELECT id FROM du_hoc_ho_so WHERE user_id = ?', [ids.admin]);
  const gan2 = await G(QT, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Gan Admin', user_id: ids.admin });
  kiem('Admin tạo hồ sơ gắn tài khoản ADMIN từ màn quản trị vẫn bị chặn (400)', gan2.s === 400, `${gan2.s} ${gan2.j?.error || ''}`);

  // 14. Bộ lọc vai trò ở danh sách tài khoản (2026-10-08)
  for (const vai of ['student', 'teacher', 'sale', 'ho_so', 'admin']) {
    const l = await G(QT, 'GET', `/admin/users?role=${vai}&search=${MA}&limit=50`);
    const em = (l.j?.users || []).map((x) => x.email);
    kiem(`Lọc role=${vai} chỉ ra đúng tài khoản ${vai} của test`,
      l.s === 200 && em.includes(mail(vai)) && em.every((e) => !['student', 'teacher', 'sale', 'ho_so', 'admin'].filter((v) => v !== vai).some((v) => e === mail(v))), em.join(','));
  }
  const lLa = await G(QT, 'GET', `/admin/users?role=abc'%20OR%201=1&search=${MA}&limit=50`);
  kiem('role lạ bị bỏ qua (không lọc, không lỗi SQL)', lLa.s === 200 && (lLa.j?.users || []).length >= 5, `${lLa.s} ${(lLa.j?.users || []).length}`);
} finally {
  const [us] = await pool.query('SELECT id FROM users WHERE email LIKE ?', [`%.${MA}@local.invalid`]);
  const dsId = us.map((u) => u.id);
  if (dsId.length) {
    await pool.query('DELETE FROM du_hoc_ho_so WHERE user_id IN (?)', [dsId]);
    await pool.query("DELETE FROM du_hoc_ho_so WHERE ho_ten IN ('Gan GV', 'Tao Tay', 'Tao Tay 2', 'Gan Admin')");
    await pool.query('DELETE FROM users WHERE id IN (?)', [dsId]);
  }
  for (const k of ketQua) console.log(`${k.dat ? '✅' : '❌'} ${k.ten}${k.dat ? '' : '  -> ' + k.chiTiet}`);
  const hong = ketQua.filter((k) => !k.dat).length;
  console.log(`\n${ketQua.length - hong}/${ketQua.length} đạt`);
  process.exit(hong ? 1 : 0);
}
