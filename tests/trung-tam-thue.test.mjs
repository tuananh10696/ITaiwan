// =============================================================
// MỘT NGÀY CỦA TRUNG TÂM THUÊ HỆ THỐNG — 2026-09-13
// =============================================================
//   TEST_PORT=3999 node tests/trung-tam-thue.test.mjs      (cần server + DB local)
//   npm run test:thue
//
// Khác `to-chuc-quyen.test.mjs` (bộ đó hỏi "trung tâm A có đọc được gì của trung tâm B không"):
// bộ này đi HẾT VÒNG ĐỜI nghiệp vụ của một trung tâm vừa thuê hệ thống, theo đúng thứ tự họ sẽ
// làm — mở trung tâm, thêm giáo viên, mở lớp, đưa học viên vào, dạy, giao bài, mua quyền, hết hạn.
//
// Vì sao cần: cách ly dữ liệu có thể đúng hoàn toàn mà mô hình kinh doanh vẫn không chạy được.
// Lần đầu chạy bộ này (2026-09-13) nó bắt đúng một lỗi như vậy — trung tâm mới KHÔNG thêm nổi
// một học viên nào, vì `POST /classes/:id/students` chỉ nhận `userIds` của người ĐÃ có tài khoản
// TRONG tổ chức đó, mà tổ chức mới thì chưa có ai; còn `GET /users-unassigned` (nguồn của ô tick
// chọn) thì `requireAdminOnly` nên quản trị trung tâm nhận 403. Không test nào cũ bắt được.
//
// TỰ TẠO rồi TỰ XOÁ dữ liệu của mình (mã tổ chức `ttthue-*`), in số bản ghi còn sót ở cuối —
// phải là 0. CHỈ chạy trên DB local.
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

if (!/^(localhost|127\.0\.0\.1)$/.test(String(process.env.DB_HOST || ''))) {
  console.error('❌ Chỉ chạy trên DB local. DB_HOST hiện tại:', process.env.DB_HOST);
  process.exit(1);
}

const db = await mysql.createConnection({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
});

const MA = 'ttthue-' + Date.now().toString(36);
const buoc = [];

async function G(t, m, p, body) {
  const r = await fetch(B + p, {
    method: m,
    headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: 'Bearer ' + t } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  let j = null;
  try { j = await r.json(); } catch { /* body rỗng */ }
  return { s: r.status, j };
}

function ghi(ten, r, mong) {
  const dat = Array.isArray(mong) ? mong.includes(r.s) : r.s === mong;
  buoc.push({ ten, s: r.s, mong, dat, msg: r.j?.error || r.j?.message || '' });
  return r;
}

/** Route liệt kê người dùng: không được lộ tên/email của tổ chức khác. */
async function khongLo(ten, t, p, cam) {
  const x = await G(t, 'GET', p);
  const s = JSON.stringify(x.j || '');
  const lo = cam.filter((c) => s.includes(c));
  buoc.push({
    ten, s: x.s, mong: 'không lộ', dat: x.s === 403 || !lo.length,
    msg: lo.length ? '⚠️ LỘ: ' + lo.join(',') : 'sạch',
  });
}

// Admin nền tảng có sẵn của DB local.
const [[ad]] = await db.query("SELECT id FROM users WHERE role = 'admin' AND org_id = 1 ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB local không có admin nền tảng nào.'); process.exit(1); }
const ADMIN = tok(ad.id);

let orgId, qtTok, gvId, hvId, lopId;
try {
  // 1 — Nền tảng mở trung tâm, kèm tài khoản quản trị đầu tiên.
  let r = ghi('Nền tảng mở trung tâm', await G(ADMIN, 'POST', '/admin/to-chuc', {
    ma: MA, ten: 'Trung tâm Thử', quan_tri_email: `qt.${MA}@local.invalid`, quan_tri_ten: 'QT Thử',
    het_han: '2099-12-31', gioi_han_hoc_vien: 3, gioi_han_giao_vien: 2,
  }), 201);
  orgId = r.j?.id;
  if (!orgId) throw new Error('Không tạo được tổ chức: ' + JSON.stringify(r.j));
  qtTok = tok(r.j.quan_tri.id);

  ghi('QT xem được tổ chức của mình', await G(qtTok, 'GET', '/admin/to-chuc/cua-toi'), 200);
  ghi('QT KHÔNG xem được mọi tổ chức', await G(qtTok, 'GET', '/admin/to-chuc'), 403);

  // 2 — Thêm giáo viên.
  ghi('QT thêm giáo viên', await G(qtTok, 'POST', '/admin/teachers',
    { email: `gv.${MA}@local.invalid`, name: 'Cô Thử' }), [200, 201]);
  const [[gv]] = await db.query('SELECT id, org_id FROM users WHERE email = ?', [`gv.${MA}@local.invalid`]);
  gvId = gv?.id;
  buoc.push({ ten: 'Giáo viên mới thuộc đúng tổ chức', s: gv?.org_id, mong: orgId, dat: gv?.org_id === orgId, msg: '' });

  // Hạn mức giáo viên của gói (2) phải chặn người thứ 3.
  await G(qtTok, 'POST', '/admin/teachers', { email: `gv2.${MA}@local.invalid`, name: 'Cô Thử 2' });
  ghi('Hạn mức giáo viên chặn người vượt gói',
    await G(qtTok, 'POST', '/admin/teachers', { email: `gv3.${MA}@local.invalid`, name: 'Cô Thử 3' }), 400);

  // 3 — Mở lớp, gán giáo viên.
  r = ghi('QT mở lớp', await G(qtTok, 'POST', '/admin/classes',
    { name: 'Lớp Thử A1', teacher_id: gvId }), [200, 201]);
  lopId = r.j?.id;
  const [[lop]] = await db.query('SELECT org_id FROM classes WHERE id = ?', [lopId || 0]);
  buoc.push({ ten: 'Lớp mới thuộc đúng tổ chức', s: lop?.org_id, mong: orgId, dat: lop?.org_id === orgId, msg: '' });

  // 4 — Đưa học viên vào lớp BẰNG EMAIL. Đây là đường duy nhất dùng được với tổ chức mới.
  r = ghi('QT thêm học viên mới bằng email', await G(qtTok, 'POST', `/admin/classes/${lopId}/students`,
    { emails: [`hv.${MA}@local.invalid`] }), 200);
  const [[hv]] = await db.query('SELECT id, org_id, role FROM users WHERE email = ?', [`hv.${MA}@local.invalid`]);
  hvId = hv?.id;
  buoc.push({
    ten: 'Tài khoản học viên được tạo, đúng tổ chức', s: hv?.org_id ?? 'KHÔNG TẠO ĐƯỢC',
    mong: orgId, dat: hv?.org_id === orgId && hv?.role === 'student',
    msg: JSON.stringify(r.j).slice(0, 120),
  });

  const loi = async (emails) => ((await G(qtTok, 'POST', `/admin/classes/${lopId}/students`, { emails }))
    .j?.results || [])[0]?.message || '';
  const mKhac = await loi(['hocvien6@local.invalid']);   // người của tổ chức GỐC
  buoc.push({ ten: 'Email thuộc tổ chức khác bị từ chối', s: /tổ chức khác/.test(mKhac) ? 'chặn' : 'LỌT',
    mong: 'chặn', dat: /tổ chức khác/.test(mKhac), msg: mKhac });
  const mHong = await loi(['khong-phai-email']);
  buoc.push({ ten: 'Email sai định dạng báo lỗi rõ', s: /không hợp lệ/.test(mHong) ? 'báo rõ' : 'KHÔNG RÕ',
    mong: 'báo rõ', dat: /không hợp lệ/.test(mHong), msg: mHong });

  // Hạn mức học viên của gói (3): 1 đã dùng, thêm 3 nữa phải chặn ít nhất một.
  const nhieu = await G(qtTok, 'POST', `/admin/classes/${lopId}/students`,
    { emails: [`a.${MA}@local.invalid`, `b.${MA}@local.invalid`, `c.${MA}@local.invalid`] });
  const chan = (nhieu.j?.results || []).filter((x) => /hạn mức/i.test(x.message || '')).length;
  buoc.push({ ten: 'Hạn mức học viên chặn người vượt gói', s: chan ? 'chặn ' + chan : 'KHÔNG CHẶN',
    mong: 'chặn', dat: chan > 0, msg: '' });

  // 5 — Không rò rỉ sang tổ chức gốc.
  const camGoc = ['hocvien6@local.invalid', 'hocvien7@local.invalid', 'tinhhoang6688'];
  await khongLo('QT xem /classes — không thấy lớp tổ chức gốc', qtTok, '/admin/classes', ['"K1"', '"K2"', 'Lớp Test Local']);
  await khongLo('QT xem /users-unassigned — không thấy người tổ chức gốc', qtTok, '/admin/users-unassigned', camGoc);
  await khongLo('QT tìm học viên — không thấy người tổ chức gốc', qtTok, `/admin/classes/${lopId}/available-students?search=hocvien`, camGoc);
  await khongLo('QT xem giáo viên — không thấy GV tổ chức gốc', qtTok, '/admin/teachers', ['tinhhoang6688', 'Hoàng Tỉnh']);
  await khongLo('QT xem quyền học — không lộ người tổ chức gốc', qtTok, '/admin/quyen-hoc', camGoc);

  // 6 — Khu của riêng nền tảng vẫn cấm.
  for (const [ten, m, p, body] of [
    ['QT không xem được danh sách người dùng nền tảng', 'GET', '/admin/users'],
    ['QT không tự cấp được quyền học', 'POST', '/admin/quyen-hoc', { user_id: hvId, product_ma: 'kh-hsk-c1' }],
    ['QT không duyệt được thanh toán', 'GET', '/admin/thanh-toan'],
    ['QT không sửa được từ vựng nền tảng', 'GET', '/admin/vocabulary'],
  ]) ghi(ten, await G(qtTok, m, p, body), 403);

  // 7 — Giáo viên dạy được trọn buổi.
  const gvTok = tok(gvId);
  ghi('GV xem lớp mình', await G(gvTok, 'GET', `/admin/classes/${lopId}`), 200);
  r = ghi('GV tạo buổi học', await G(gvTok, 'POST', `/admin/classes/${lopId}/sessions`,
    { session_date: '2026-09-20', topic: 'Bài 1' }), 201);
  const buoiId = r.j?.ids?.[0];
  ghi('GV điểm danh', await G(gvTok, 'PUT', `/admin/sessions/${buoiId}/attendance`,
    { records: [{ user_id: hvId, status: 'present', is_late: 0, is_left_early: 0, teacher_note: 'tốt' }] }), 200);
  ghi('GV giao bài', await G(gvTok, 'POST', `/admin/classes/${lopId}/assignments`,
    { lesson_id: '1.1', title: 'Bài 1.1', exercise_type: 'bai-tap' }), 201);
  ghi('GV xem báo cáo lớp', await G(gvTok, 'GET', `/admin/classes/${lopId}/report`), 200);
  ghi('GV KHÔNG tự mở được lớp', await G(gvTok, 'POST', '/admin/classes', { name: 'x' }), 403);
  ghi('GV KHÔNG liệt kê được học viên chưa xếp lớp', await G(gvTok, 'GET', '/admin/users-unassigned'), 403);

  // 7b — Học viên TỰ vào lớp bằng MÃ MỜI (đường onboarding không cần mật khẩu mặc định chung).
  // Nới hạn mức trước: bước kiểm hạn mức ở trên đã cố tình làm đầy gói 3 học viên.
  ghi('Nền tảng nới hạn mức học viên', await G(ADMIN, 'PUT', `/admin/to-chuc/${orgId}`, { gioi_han_hoc_vien: 20 }), 200);
  const [[maLop]] = await db.query('SELECT invite_code FROM classes WHERE id = ?', [lopId]);
  const [ngoai] = await db.query(
    `INSERT INTO users (org_id, name, email, password_hash, role, is_verified, is_approved)
     VALUES (1, 'Người ngoài', ?, 'x', 'student', 1, 1)`, [`ngoai.${MA}@local.invalid`]);
  const ngoaiTok = tok(ngoai.insertId);
  ghi('Mã mời sai bị từ chối', await G(ngoaiTok, 'POST', '/profile/vao-lop', { ma: 'KHONGCO99' }), 404);
  ghi('Học viên tự vào lớp bằng mã mời', await G(ngoaiTok, 'POST', '/profile/vao-lop', { ma: maLop.invite_code }), 200);
  const [[sauKhiVao]] = await db.query('SELECT org_id FROM users WHERE id = ?', [ngoai.insertId]);
  buoc.push({ ten: 'Vào lớp xong thì thuộc tổ chức của lớp', s: sauKhiVao?.org_id, mong: orgId,
    dat: sauKhiVao?.org_id === orgId, msg: '' });
  ghi('Giáo viên KHÔNG vào lớp bằng mã mời được',
    await G(tok(gvId), 'POST', '/profile/vao-lop', { ma: maLop.invite_code }), 400);

  // 8 — Học viên: bài mở / bài khoá / quyền mua theo tổ chức.
  const hvTok = tok(hvId);
  ghi('HV xem được bài mở', await G(hvTok, 'GET', '/noi-dung/giaotrinh/hsk/hsk1-1'), 200);
  ghi('HV chưa mua thì bài sau bị khoá', await G(hvTok, 'GET', '/noi-dung/giaotrinh/hsk/hsk1-5'), 402);
  ghi('HV thấy bài cô giao', await G(hvTok, 'GET', '/exercise/my-assignments'), 200);

  ghi('Nền tảng cấp quyền cho CẢ tổ chức', await G(ADMIN, 'POST', '/admin/quyen-hoc',
    { org_id: orgId, product_ma: 'kh-hsk-c1' }), 201);
  ghi('HV của tổ chức mở được bài trả phí', await G(hvTok, 'GET', '/noi-dung/giaotrinh/hsk/hsk1-5'), 200);

  // 9 — Hết hạn hợp đồng thì cả tổ chức mất quyền nội dung cùng lúc.
  ghi('Nền tảng đặt hợp đồng hết hạn', await G(ADMIN, 'PUT', `/admin/to-chuc/${orgId}`, { het_han: '2020-01-01' }), 200);
  ghi('Hết hạn → HV mất quyền nội dung', await G(hvTok, 'GET', '/noi-dung/giaotrinh/hsk/hsk1-5'), 402);
} finally {
  // Dọn — thứ tự theo khoá ngoại.
  if (orgId) {
    const [hs] = await db.query('SELECT id FROM users WHERE org_id = ?', [orgId]);
    const ids = hs.map((x) => x.id);
    if (ids.length) {
      await db.query('DELETE FROM class_attendance WHERE user_id IN (?)', [ids]);
      await db.query('DELETE FROM exercise_results WHERE user_id IN (?)', [ids]);
    }
    await db.query('DELETE FROM class_sessions WHERE class_id IN (SELECT id FROM classes WHERE org_id = ?)', [orgId]);
    await db.query('DELETE FROM assignments WHERE class_id IN (SELECT id FROM classes WHERE org_id = ?)', [orgId]);
    await db.query('DELETE FROM class_enrollments WHERE class_id IN (SELECT id FROM classes WHERE org_id = ?)', [orgId]);
    await db.query('DELETE FROM classes WHERE org_id = ?', [orgId]);
    await db.query('DELETE FROM entitlements WHERE org_id = ?', [orgId]);
    if (ids.length) await db.query('DELETE FROM entitlements WHERE user_id IN (?)', [ids]);
    await db.query('DELETE FROM users WHERE org_id = ?', [orgId]);
    // Người dùng sinh ra trong lúc thử có thể còn ở tổ chức gốc (bước mã mời thất bại giữa chừng).
    await db.query('DELETE FROM class_enrollments WHERE user_id IN (SELECT id FROM users WHERE email LIKE ?)', [`%${MA}%`]);
    await db.query('DELETE FROM users WHERE email LIKE ?', [`%${MA}%`]);
    await db.query('DELETE FROM organizations WHERE id = ?', [orgId]);
  }
}

const [[{ sot }]] = await db.query(
  'SELECT (SELECT COUNT(*) FROM organizations WHERE ma LIKE ?) + (SELECT COUNT(*) FROM users WHERE email LIKE ?) AS sot',
  [`${MA}%`, `%${MA}%`]);
await db.end();

for (const b of buoc) {
  console.log(`${b.dat ? '✅' : '❌'} ${b.ten.padEnd(50)} ${String(b.s).padEnd(8)} (mong ${b.mong}) ${b.msg || ''}`);
}
const dat = buoc.filter((b) => b.dat).length;
console.log(`\n🧹 Dọn dẹp: còn sót ${sot} bản ghi (phải là 0)`);
console.log(`TRUNG TÂM THUÊ HỆ THỐNG: ${dat}/${buoc.length} bước đạt`);
process.exit(dat === buoc.length && sot === 0 ? 0 : 1);
