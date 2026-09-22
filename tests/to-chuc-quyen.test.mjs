// =============================================================
// KIỂM THỬ TỔ CHỨC (multi-tenant) + QUYỀN NỘI DUNG — 2026-09-09
// =============================================================
//   TEST_PORT=3999 node tests/to-chuc-quyen.test.mjs      (cần server + DB local)
//
// Câu hỏi bộ test này trả lời: cho hai trung tâm dùng chung một hệ thống thì trung tâm A có
// đọc/sửa được gì của trung tâm B không, và người chưa mua có tải được bài trả phí không.
//
// TỰ TẠO rồi TỰ XOÁ dữ liệu của mình (tiền tố `ttest-`), và in lại số bản ghi còn sót ở cuối —
// phải là 0. CHỈ chạy trên DB local.
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: 't@t' }, process.env.JWT_SECRET, { expiresIn: '1h' });

if (!/^(localhost|127\.0\.0\.1)$/.test(process.env.DB_HOST || '')) {
  console.error('❌ Bộ test này ghi vào DB — chỉ chạy với DB local. DB_HOST =', process.env.DB_HOST);
  process.exit(1);
}

const db = await mysql.createConnection({
  host: process.env.DB_HOST, port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
});

let ok = 0; const loi = [];
function kiem(ten, thuc, mong) {
  if (String(thuc) === String(mong)) { ok++; return; }
  loi.push(`${ten}: được ${thuc}, kỳ vọng ${mong}`);
}
async function goi(path, vai, method = 'GET', body) {
  const h = { 'Content-Type': 'application/json' };
  if (vai) h.Authorization = `Bearer ${vai}`;
  try {
    const r = await fetch(B + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
    return r.status;
  } catch { return 0; }
}

// ------------------------------------------------------------------ dựng dữ liệu
const hash = await bcrypt.hash('ttest123', 10);
async function dungTrungTam(ma, ten) {
  const [o] = await db.query(
    `INSERT INTO organizations (ma, ten, loai, goi, trang_thai, bat_dau, het_han)
     VALUES (?,?,'trung-tam','co-ban','hoat-dong',CURDATE(),DATE_ADD(CURDATE(),INTERVAL 60 DAY))`, [ma, ten]);
  const org = o.insertId;
  const nguoi = {};
  for (const [vai, role] of [['qt', 'org_admin'], ['gv', 'teacher'], ['hv', 'student']]) {
    const [u] = await db.query(
      `INSERT INTO users (org_id, name, email, password_hash, role, is_verified, is_approved, avatar_letter)
       VALUES (?,?,?,?,?,1,1,'T')`, [org, `${ma}-${vai}`, `${ma}-${vai}@ttest.invalid`, hash, role]);
    nguoi[vai] = u.insertId;
  }
  const [c] = await db.query(
    'INSERT INTO classes (org_id, name, description, teacher_id, invite_code) VALUES (?,?,?,?,?)',
    [org, `Lớp ${ten}`, '', nguoi.gv, `TT${org}${Date.now() % 9999}`]);
  await db.query('INSERT INTO class_enrollments (class_id, user_id) VALUES (?,?)', [c.insertId, nguoi.hv]);
  return { org, lop: c.insertId, ...nguoi };
}

const A = await dungTrungTam('ttest-a', 'Trung tâm Thử A');
const Bt = await dungTrungTam('ttest-b', 'Trung tâm Thử B');
const tA = { qt: tok(A.qt), gv: tok(A.gv), hv: tok(A.hv) };
const tB = { qt: tok(Bt.qt) };
const tNenTang = tok(1);   // admin nền tảng có sẵn (org 1)

try {
  // ---------------------------------------------------------------- 1. CÁCH LY GIỮA HAI TRUNG TÂM
  kiem('QT-A xem lớp của mình', await goi(`/admin/classes/${A.lop}`, tA.qt), 200);
  kiem('QT-A xem lớp của TRUNG TÂM B', await goi(`/admin/classes/${Bt.lop}`, tA.qt), 403);
  kiem('QT-B xem lớp của TRUNG TÂM A', await goi(`/admin/classes/${A.lop}`, tB.qt), 403);
  kiem('QT-A sửa lớp của B', await goi(`/admin/classes/${Bt.lop}`, tA.qt, 'PUT', { name: 'x' }), 403);
  kiem('QT-A xoá lớp của B', await goi(`/admin/classes/${Bt.lop}`, tA.qt, 'DELETE'), 403);
  kiem('QT-A đọc ghi chú học viên của B', await goi(`/admin/students/${Bt.hv}/notes`, tA.qt), 403);
  kiem('QT-A xem hồ sơ giáo viên của B', await goi(`/admin/teachers/${Bt.gv}`, tA.qt), 403);
  kiem('QT-A hạ vai trò giáo viên của B', await goi(`/admin/teachers/${Bt.gv}`, tA.qt, 'DELETE'), 403);

  // Danh sách phải chỉ chứa lớp của mình.
  const dsA = await fetch(`${B}/admin/classes`, { headers: { Authorization: `Bearer ${tA.qt}` } }).then((r) => r.json());
  const idsA = (dsA.classes || []).map((c) => c.id);
  kiem('danh sách lớp của QT-A có lớp mình', idsA.includes(A.lop), true);
  kiem('danh sách lớp của QT-A KHÔNG có lớp của B', idsA.includes(Bt.lop), false);
  const gvA = await fetch(`${B}/admin/teachers`, { headers: { Authorization: `Bearer ${tA.qt}` } }).then((r) => r.json());
  kiem('danh sách giáo viên của QT-A không lẫn của B',
    (gvA.teachers || []).some((g) => g.id === Bt.gv), false);

  // Kiểm chứng NGƯỢC: mấy dòng 403 ở trên chỉ có ý nghĩa nếu QT-A thật sự làm được
  // đúng thao tác đó trong tổ chức MÌNH — nếu không thì chúng "xanh" vì lý do sai
  // (chức năng bị cấm với mọi người) chứ không phải vì cách ly đúng.
  const taoLop = await fetch(`${B}/admin/classes`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tA.qt}` },
    body: JSON.stringify({ name: 'ttest-lop-moi' }),
  });
  kiem('QT-A tạo lớp trong tổ chức mình', taoLop.status, 201);
  const lopMoi = (await taoLop.json()).id;
  const [[lm]] = await db.query('SELECT org_id FROM classes WHERE id = ?', [lopMoi]);
  kiem('lớp mới thuộc đúng tổ chức của người tạo', lm && lm.org_id, A.org);
  kiem('QT-A sửa lớp của mình', await goi(`/admin/classes/${lopMoi}`, tA.qt, 'PUT', { name: 'ttest-doi-ten' }), 200);
  kiem('QT-A xoá lớp của mình', await goi(`/admin/classes/${lopMoi}`, tA.qt, 'DELETE'), 200);

  // ---------------------------------------------------------------- 2. KHU NỀN TẢNG
  kiem('QT-A vào /admin/users', await goi('/admin/users', tA.qt), 403);
  kiem('QT-A sửa từ vựng nền tảng', await goi('/admin/vocabulary', tA.qt), 403);
  kiem('QT-A xem danh sách mọi tổ chức', await goi('/admin/to-chuc', tA.qt), 403);
  kiem('QT-A tự cấp quyền học', await goi('/admin/quyen-hoc', tA.qt, 'POST', { org_id: A.org, product_ma: 'goi-12-thang' }), 403);
  kiem('QT-A XEM được quyền học của tổ chức mình', await goi('/admin/quyen-hoc', tA.qt), 200);
  kiem('QT-A xem tổ chức của mình', await goi('/admin/to-chuc/cua-toi', tA.qt), 200);
  kiem('admin nền tảng xem mọi tổ chức', await goi('/admin/to-chuc', tNenTang), 200);

  // ---------------------------------------------------------------- 3. GIÁO VIÊN TRONG TRUNG TÂM
  kiem('GV-A xem lớp mình dạy', await goi(`/admin/classes/${A.lop}`, tA.gv), 200);
  kiem('GV-A tạo lớp mới', await goi('/admin/classes', tA.gv, 'POST', { name: 'x' }), 403);
  kiem('GV-A xoá lớp mình dạy', await goi(`/admin/classes/${A.lop}`, tA.gv, 'DELETE'), 403);
  kiem('GV-A quản lý giáo viên', await goi('/admin/teachers', tA.gv), 403);
  kiem('GV-A xem lớp của trung tâm B', await goi(`/admin/classes/${Bt.lop}`, tA.gv), 403);
  kiem('GV-A xem tổ chức của mình', await goi('/admin/to-chuc/cua-toi', tA.gv), 200);

  // ---------------------------------------------------------------- 4. GATE NỘI DUNG
  kiem('khách tải bài 1 (mở)', await goi('/noi-dung/giaotrinh/giaotrinh/1'), 200);
  kiem('khách tải bài 3 (mở)', await goi('/noi-dung/giaotrinh/giaotrinh/3'), 200);
  kiem('khách tải bài 4 (trả phí)', await goi('/noi-dung/giaotrinh/giaotrinh/4'), 402);
  kiem('khách tải bài 3 của quyển 6 (mở)', await goi('/noi-dung/giaotrinh/giaotrinh/6-3'), 200);
  kiem('khách tải đề thi HSK', await goi('/noi-dung/de-thi-hsk/H10901'), 402);
  kiem('HV-A chưa mua: bài 4', await goi('/noi-dung/giaotrinh/giaotrinh/4', tA.hv), 402);
  kiem('GV-A xem được bài trả phí để dạy', await goi('/noi-dung/giaotrinh/giaotrinh/4', tA.gv), 200);

  // Trung tâm A mua gói -> học viên của A mở được, học viên B thì không.
  await db.query(
    "INSERT INTO entitlements (org_id, product_ma, nguon, bat_dau, trang_thai) VALUES (?, 'goi-12-thang', 'trung-tam', NOW(), 'hoat-dong')",
    [A.org]);
  await fetch(`${B}/admin/quyen-hoc`, { headers: { Authorization: `Bearer ${tNenTang}` } }); // chạm để chắc chắn server sống
  // Đệm quyền 60 giây trong tiến trình server -> dùng tài khoản CHƯA từng gọi để khỏi dính đệm.
  const [hv2] = await db.query(
    `INSERT INTO users (org_id, name, email, password_hash, role, is_verified, is_approved, avatar_letter)
     VALUES (?,?,?,?, 'student',1,1,'T')`, [A.org, 'ttest-a-hv2', 'ttest-a-hv2@ttest.invalid', hash]);
  const [hv2b] = await db.query(
    `INSERT INTO users (org_id, name, email, password_hash, role, is_verified, is_approved, avatar_letter)
     VALUES (?,?,?,?, 'student',1,1,'T')`, [Bt.org, 'ttest-b-hv2', 'ttest-b-hv2@ttest.invalid', hash]);
  kiem('HV mới của A (tổ chức đã mua gói): bài 9', await goi('/noi-dung/giaotrinh/giaotrinh/9', tok(hv2.insertId)), 200);
  kiem('HV mới của B (tổ chức chưa mua): bài 9', await goi('/noi-dung/giaotrinh/giaotrinh/9', tok(hv2b.insertId)), 402);

  // Hợp đồng của A hết hạn -> học viên A mất quyền ngay, không phải thu hồi từng người.
  await db.query("UPDATE organizations SET het_han = DATE_SUB(CURDATE(), INTERVAL 1 DAY) WHERE id = ?", [A.org]);
  const [hv3] = await db.query(
    `INSERT INTO users (org_id, name, email, password_hash, role, is_verified, is_approved, avatar_letter)
     VALUES (?,?,?,?, 'student',1,1,'T')`, [A.org, 'ttest-a-hv3', 'ttest-a-hv3@ttest.invalid', hash]);
  kiem('hợp đồng A hết hạn -> HV mất bài trả phí', await goi('/noi-dung/giaotrinh/giaotrinh/9', tok(hv3.insertId)), 402);
  kiem('hợp đồng A hết hạn -> bài mở vẫn học được', await goi('/noi-dung/giaotrinh/giaotrinh/1', tok(hv3.insertId)), 200);
} finally {
  // ---------------------------------------------------------------- dọn
  await db.query("DELETE FROM entitlements WHERE org_id IN (SELECT id FROM organizations WHERE ma LIKE 'ttest-%')");
  await db.query("DELETE FROM class_enrollments WHERE class_id IN (SELECT id FROM classes WHERE org_id IN (SELECT id FROM organizations WHERE ma LIKE 'ttest-%'))");
  await db.query("DELETE FROM classes WHERE org_id IN (SELECT id FROM organizations WHERE ma LIKE 'ttest-%')");
  await db.query("DELETE FROM users WHERE email LIKE '%@ttest.invalid'");
  await db.query("DELETE FROM organizations WHERE ma LIKE 'ttest-%'");
  const [[{ n1 }]] = await db.query("SELECT COUNT(*) AS n1 FROM organizations WHERE ma LIKE 'ttest-%'");
  const [[{ n2 }]] = await db.query("SELECT COUNT(*) AS n2 FROM users WHERE email LIKE '%@ttest.invalid'");
  console.log(`\n🧹 Dọn dẹp: còn sót ${n1} tổ chức / ${n2} tài khoản (phải là 0/0)`);
  await db.end();
}

console.log(`\nTỔ CHỨC + QUYỀN NỘI DUNG: ${ok}/${ok + loi.length} đúng kỳ vọng`);
if (loi.length) { loi.forEach((l) => console.log('  ❌ ' + l)); process.exit(1); }
console.log('  ✅ không lệch chỗ nào');
