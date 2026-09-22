// =============================================================
// DỮ LIỆU THỬ ĐẦY ĐỦ — dựng một trung tâm giả lập để thử từng chức năng như thật
// =============================================================
//   npm run demo:day-du              dựng lại toàn bộ (XOÁ SẠCH dữ liệu nghiệp vụ cũ rồi seed lại)
//   npm run demo:day-du -- --xoa     chỉ xoá, không dựng lại
//
// Dựng: 1 quản trị · 1 giáo viên · 11 học viên (+2 tài khoản chờ duyệt) · 2 lớp, và dữ liệu cho
// TẤT CẢ các khu đang có: buổi học & điểm danh, bài giao, kết quả bài tập kèm lời phê, ngân hàng
// đề TOCFL + kết quả thi, sổ tay, ôn tập ngắt quãng, nhịp học 120 ngày, đề bài tự soạn, hồ sơ du
// học, sổ thu chi, ký túc xá, thiết bị đăng nhập.
//
// Vì sao viết mới thay vì dùng `seed-trungtam-demo.mjs` / `seed-du-hoc-demo.mjs`: hai script đó
// viết cho bản NHIỀU TRUNG TÂM và còn tra bảng `organizations`. Bảng đó đã bị gỡ khỏi bản ITaiwan
// (xem CLAUDE.md mục "Nguồn gốc") nên chạy chúng là lỗi ngay dòng đầu.
//
// AN TOÀN: từ chối chạy nếu DB_HOST không phải localhost — cùng lối với scripts/anonymize-local.mjs.
// Dữ liệu giả lẫn vào DB thật là thứ rất khó gỡ về sau. Đừng nới điều kiện này.
//
// Dữ liệu sinh ra là TẤT ĐỊNH: mọi chỗ "ngẫu nhiên" đi qua PRNG có hạt giống cố định, nên chạy
// lại hai lần cho ra cùng một bộ số. Cần thế để còn đối chiếu ảnh chụp màn hình giữa hai lần thử.
import 'dotenv/config';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sangGianThe } from '../src/data/gian-the.js';
import { chamBai } from '../server/utils/cham-de.js';

const GOC = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

if (!/^(localhost|127\.0\.0\.1)$/.test(String(process.env.DB_HOST || ''))) {
  console.error('❌ Script này chỉ chạy trên DB local. DB_HOST hiện tại:', process.env.DB_HOST);
  process.exit(1);
}

const CHI_XOA = process.argv.includes('--xoa');
const MAT_KHAU = process.env.DEMO_PASSWORD || 'ITaiwan@2026';

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  charset: 'utf8mb4',
  multipleStatements: false,
});

// ------------------------------------------------------------------ TIỆN ÍCH

/** PRNG mulberry32 — cùng hạt giống thì cùng dãy số, không phụ thuộc máy hay phiên bản Node. */
function taoRnd(hat) {
  let a = hat >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = taoRnd(20260922);
/** Số nguyên trong [a, b]. */
const soTu = (a, b) => a + Math.floor(rnd() * (b - a + 1));
/** Lấy ngẫu nhiên một phần tử. */
const chon = (arr) => arr[Math.floor(rnd() * arr.length)];

const HOM_NAY = new Date();
HOM_NAY.setHours(0, 0, 0, 0);

/** Ngày lùi `n` ngày so với hôm nay, dạng YYYY-MM-DD. */
function ngay(n = 0) {
  const d = new Date(HOM_NAY);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
/** Mốc thời gian lùi `n` ngày, tại giờ:phút chỉ định — dạng YYYY-MM-DD HH:MM:SS. */
function gio(n = 0, h = 20, m = 0) {
  const d = new Date(HOM_NAY);
  d.setDate(d.getDate() - n);
  d.setHours(h, m, 0, 0);
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(h)}:${p(m)}:00`;
}
/** Kỳ YYYY-MM, lùi `n` tháng. */
function ky(n = 0) {
  const d = new Date(HOM_NAY.getFullYear(), HOM_NAY.getMonth() - n, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
/** Thứ trong tuần của một ngày lùi n (0 = CN). */
function thu(n) {
  const d = new Date(HOM_NAY);
  d.setDate(d.getDate() - n);
  return d.getDay();
}

/** Chèn nhiều dòng một lần, cắt thành từng mẻ để gói tin không vượt max_allowed_packet. */
async function chenNhieu(bang, cot, hang, me = 300) {
  if (!hang.length) return 0;
  let n = 0;
  for (let i = 0; i < hang.length; i += me) {
    const phan = hang.slice(i, i + me);
    const oTrong = '(' + cot.map(() => '?').join(',') + ')';
    const [r] = await db.query(
      `INSERT INTO ${bang} (${cot.join(',')}) VALUES ${phan.map(() => oTrong).join(',')}`,
      phan.flat(),
    );
    n += r.affectedRows;
  }
  return n;
}

const tien = (n) => Number(n).toLocaleString('vi-VN') + 'đ';

// ------------------------------------------------------------------ XOÁ

// Thứ tự không quan trọng vì đã tắt kiểm khoá ngoại, nhưng giữ thứ tự con-trước-cha cho dễ đọc.
// KHÔNG đụng `schema_migrations`: xoá bảng đó là lần `db:migrate:local` sau chạy lại từ đầu.
const BANG_XOA = [
  'de_bai_lam', 'de_giao', 'de_cau_hoi', 'de_bai',
  'ktx_thu_tien', 'ktx_o', 'ktx_phong', 'ktx_toa',
  'quy_phieu', 'quy_danh_muc',
  'du_hoc_giay_to', 'du_hoc_thu_tien', 'du_hoc_lich_su', 'du_hoc_yeu_cau_sua',
  'du_hoc_thong_bao', 'du_hoc_ho_so',
  'device_alerts', 'user_devices',
  'teacher_reviews', 'teacher_notes',
  'translate_submissions', 'student_notes',
  'assignment_reads', 'assignment_reminders', 'assignments',
  'class_attendance', 'class_sessions', 'class_enrollments', 'classes',
  'exercise_results', 'user_vocabulary', 'srs_words', 'study_activity',
  'notebook_words', 'saved_words',
  'exam_answers', 'exam_results', 'exam_questions',
  'vocabulary', 'users',
];

async function xoaSach() {
  await db.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const t of BANG_XOA) await db.query(`TRUNCATE TABLE \`${t}\``);
  await db.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log(`🧹 Đã xoá sạch ${BANG_XOA.length} bảng nghiệp vụ (schema giữ nguyên).`);
}

await xoaSach();
if (CHI_XOA) {
  await db.end();
  console.log('   Chỉ xoá, không dựng lại (--xoa).');
  process.exit(0);
}

// ------------------------------------------------------------------ 1. NGƯỜI DÙNG

const bam = await bcrypt.hash(MAT_KHAU, 10);
const chuDau = (ten) => ten.trim().split(/\s+/).pop().slice(0, 1).toUpperCase();

const COT_USER = ['name', 'email', 'phone', 'password_hash', 'is_admin', 'role', 'avatar_letter',
  'avatar_color', 'level_label', 'level_num', 'streak', 'longest_streak', 'points',
  'last_active', 'is_verified', 'is_approved', 'nhan_mail_nhac'];

/** Thêm một người dùng, trả về id. */
async function themUser(u) {
  const [r] = await db.query(
    `INSERT INTO users (${COT_USER.join(',')}) VALUES (${COT_USER.map(() => '?').join(',')})`,
    [u.name, u.email, u.phone || null, bam, u.is_admin ? 1 : 0, u.role,
      chuDau(u.name), u.color || '#1E4E9C', u.level_label || 'Tân Sinh · Lv1',
      u.level_num || 1, u.streak || 0, u.longest_streak || 0, u.points || 0,
      u.last_active || null, 1, u.is_approved === false ? 0 : 1, u.nhac === false ? 0 : 1],
  );
  return r.insertId;
}

const ADMIN = await themUser({
  name: 'Quản trị viên ITaiwan', email: 'admin@itaiwan.vn', phone: '0900000001',
  is_admin: true, role: 'admin', color: '#1E4E9C',
  level_label: 'Quản trị viên', level_num: 99, last_active: ngay(0),
});

const GV = await themUser({
  name: 'Cô Nguyễn Thị Lan', email: 'gv.lan@itaiwan.vn', phone: '0900000002',
  role: 'teacher', color: '#D2321F', level_label: 'Giáo viên', level_num: 50,
  last_active: ngay(0),
});

// Mỗi em khác nhau ở MỘT điểm mà người thử sẽ hỏi tới, để không màn hình nào rơi vào trạng thái
// "ai cũng giống ai". `net` chỉ dùng để in ra bảng tổng kết cuối script.
const HOC_VIEN = [
  { ma: 'hv01', ten: 'Nguyễn Minh Anh', gt: 'nu', lop: ['A1'], suc: 0.95, chuoi: 24, net: 'Chăm nhất lớp — điểm cao, chuỗi 24 ngày, hồ sơ du học sắp bay' },
  { ma: 'hv02', ten: 'Trần Quốc Bảo', gt: 'nam', lop: ['A1'], suc: 0.78, chuoi: 5, net: 'Khá — còn 2 bài cô giao quá hạn chưa nộp' },
  { ma: 'hv03', ten: 'Lê Thị Hồng', gt: 'nu', lop: ['A1'], suc: 0.70, chuoi: 3, net: 'Trung bình — có 3 lời phê của cô CHƯA ĐỌC (chuông đỏ)' },
  { ma: 'hv04', ten: 'Phạm Gia Huy', gt: 'nam', lop: ['A1'], suc: 0.45, chuoi: 0, net: 'Yếu — nhiều bài dưới 50%, vắng 4 buổi, có sổ nhận xét dài' },
  { ma: 'hv05', ten: 'Vũ Hải Đăng', gt: 'nam', lop: ['A1'], suc: 0.60, chuoi: 1, net: 'Mới vào lớp tuần trước — gần như chưa có dữ liệu (thử màn hình rỗng)' },
  { ma: 'hv06', ten: 'Đỗ Khánh Linh', gt: 'nu', lop: ['A1', 'B1'], suc: 0.85, chuoi: 12, net: 'HỌC CẢ 2 LỚP — thử hiển thị khi một em thuộc nhiều lớp' },
  { ma: 'hv07', ten: 'Đặng Thu Trang', gt: 'nu', lop: ['B1'], suc: 0.90, chuoi: 16, net: 'Cày thi thử TOCFL — 9 lượt thi đủ 3 Band' },
  { ma: 'hv08', ten: 'Bùi Anh Tuấn', gt: 'nam', lop: ['B1'], suc: 0.72, chuoi: 0, net: 'Chuỗi ngày vừa ĐỨT (nghỉ 6 ngày) — sổ tay 30 từ' },
  { ma: 'hv09', ten: 'Hoàng Thị Mai', gt: 'nu', lop: ['B1'], suc: 0.66, chuoi: 7, net: 'Ôn tập ngắt quãng: 28 thẻ tới hạn hôm nay' },
  { ma: 'hv10', ten: 'Ngô Văn Kiên', gt: 'nam', lop: ['B1'], suc: 0.55, chuoi: 2, net: 'ĐÃ DÙNG HẾT 2 THIẾT BỊ — đăng nhập từ máy mới sẽ bị chặn (cố ý, để thử màn hình chặn + gỡ thiết bị)' },
  { ma: 'hv11', ten: 'Lý Thanh Thảo', gt: 'nu', lop: ['B1'], suc: 0.80, chuoi: 9, net: 'Có yêu cầu sửa hồ sơ du học đang CHỜ DUYỆT' },
];

// Cùng họ với bảng màu sage của giao diện (2026-09-22). Tất cả đều >= 4.5:1 với chữ trắng
// vì avatar là một chữ cái TRẮNG đặt giữa vòng tròn màu này.
const MAU_AVATAR = ['#265648', '#1F7A52', '#B85C1A', '#1A3F35', '#12726B', '#3E6B47'];

for (const [i, h] of HOC_VIEN.entries()) {
  const diem = Math.round(h.suc * soTu(1600, 2400));
  h.id = await themUser({
    name: h.ten,
    email: `${h.ma}@itaiwan.vn`,
    phone: '09' + String(10000000 + i * 111111).slice(0, 8),
    role: 'student',
    color: MAU_AVATAR[i % MAU_AVATAR.length],
    level_label: 'Tân Sinh · Lv' + (1 + Math.floor(h.suc * 4)),
    level_num: 1 + Math.floor(h.suc * 4),
    streak: h.chuoi,
    longest_streak: Math.max(h.chuoi, soTu(h.chuoi, h.chuoi + 14)),
    points: diem,
    last_active: h.chuoi > 0 ? ngay(0) : ngay(soTu(4, 8)),
    nhac: h.ma !== 'hv05',
  });
}

// Hai tài khoản vừa đăng ký, CHƯA được duyệt — để thử hàng chờ duyệt ở Quản trị > Học viên
// (huy hiệu đỏ cạnh mục menu). Không nằm trong 11 em có dữ liệu.
const CHO_DUYET = [
  ['Trịnh Hoài Nam', 'choduyet01@itaiwan.vn'],
  ['Cao Đức Mạnh', 'choduyet02@itaiwan.vn'],
];
for (const [ten, mail] of CHO_DUYET) {
  await themUser({ name: ten, email: mail, role: 'student', is_approved: false });
}

console.log(`👤 1 quản trị · 1 giáo viên · ${HOC_VIEN.length} học viên · ${CHO_DUYET.length} tài khoản chờ duyệt`);

// ------------------------------------------------------------------ 2. LỚP + GHI DANH

const LOP = {
  A1: { ten: 'A1 — Thời Đại Quyển 1 (tối 2-4-6)', mo_ta: 'Lớp vỡ lòng: phát âm, 16 bài quyển 1. Khai giảng đầu tháng.', ma: 'ITW-A1' },
  B1: { ten: 'B1 — Thời Đại Quyển 2 (tối 3-5-7)', mo_ta: 'Tiếp nối A1, hướng tới TOCFL Band A.', ma: 'ITW-B1' },
};
for (const k of Object.keys(LOP)) {
  const [r] = await db.query(
    'INSERT INTO classes (org_id, name, description, teacher_id, invite_code, is_active) VALUES (1,?,?,?,?,1)',
    [LOP[k].ten, LOP[k].mo_ta, GV, LOP[k].ma],
  );
  LOP[k].id = r.insertId;
  LOP[k].hv = HOC_VIEN.filter((h) => h.lop.includes(k));
}
await chenNhieu('class_enrollments', ['class_id', 'user_id', 'enrolled_at'],
  Object.values(LOP).flatMap((l) => l.hv.map((h) => [l.id, h.id, gio(h.ma === 'hv05' ? 7 : 56, 9, 0)])));

console.log(`🏫 2 lớp · ${LOP.A1.hv.length} + ${LOP.B1.hv.length} học viên (em Đỗ Khánh Linh học cả hai)`);

// ------------------------------------------------------------------ 3. BUỔI HỌC + ĐIỂM DANH

// Lớp A1 học 2-4-6, lớp B1 học 3-5-7. Quét ngược 56 ngày, buổi nào rơi đúng thứ thì tạo.
const CHU_DE = [
  'Bài 1.1 — Chào hỏi, giới thiệu tên', 'Bài 1.2 — Bạn là người nước nào?',
  'Bài 1.3 — Ôn tập + kiểm tra 10 phút', 'Bài 2.1 — Mấy giờ bạn đi học?',
  'Bài 2.2 — Số đếm và thời gian', 'Bài 2.3 — Luyện nghe đoạn hội thoại',
  'Bài 3.1 — Mua quà sinh nhật', 'Bài 3.2 — Hỏi giá, mặc cả',
  'Bài 3.3 — Viết chữ Hán: bộ thủ thường gặp', 'Bài 4.1 — Cà phê hay trà?',
  'Bài 4.2 — Gọi món ở quán ăn', 'Ôn tập giữa kỳ + chữa đề',
  'Bài 5.1 — Nhà bạn có mấy người?', 'Bài 5.2 — Nghề nghiệp trong gia đình',
];
const GHI_CHU_DIEM_DANH = ['Phát âm tiến bộ rõ.', 'Về nhà nhớ làm bài tập nhé.',
  'Hôm nay hăng hái phát biểu.', 'Chưa thuộc từ mới.', 'Đi muộn 15 phút vì tắc đường.',
  'Xin phép về sớm đi khám.', 'Vắng có phép — báo trước qua Zalo.', ''];

const buoiHang = [];
for (const [k, l] of Object.entries(LOP)) {
  const thuHoc = k === 'A1' ? [1, 3, 5] : [2, 4, 6];
  let stt = 0;
  for (let n = 56; n >= 0; n--) {
    if (!thuHoc.includes(thu(n))) continue;
    // Em hv05 mới vào lớp -> những buổi trước ngày em ghi danh không có dòng điểm danh của em.
    buoiHang.push({ lop: k, class_id: l.id, n, chu_de: CHU_DE[stt % CHU_DE.length], stt: stt++ });
  }
}
for (const b of buoiHang) {
  const [r] = await db.query(
    'INSERT INTO class_sessions (class_id, session_date, topic, course_type, notes) VALUES (?,?,?,?,?)',
    [b.class_id, ngay(b.n), b.chu_de, 'Thời Đại ' + (b.lop === 'A1' ? 'Q1' : 'Q2'),
      b.n === 0 ? 'Buổi hôm nay — chưa điểm danh xong.' : ''],
  );
  b.id = r.insertId;
}

const diemDanhHang = [];
for (const b of buoiHang) {
  if (b.n === 0) continue;                                   // buổi hôm nay để trống cho người thử tự điểm danh
  for (const h of LOP[b.lop].hv) {
    if (h.ma === 'hv05' && b.n > 7) continue;                 // chưa ghi danh thì không có dòng
    // Em yếu (hv04) vắng nhiều hẳn; những em khác thỉnh thoảng vắng.
    const tiLeVang = h.ma === 'hv04' ? 0.30 : h.suc > 0.85 ? 0.03 : 0.10;
    const vang = rnd() < tiLeVang;
    const muon = !vang && rnd() < 0.15;
    const veSom = !vang && rnd() < 0.08;
    diemDanhHang.push([
      b.id, h.id, vang ? 'absent' : 'present', muon ? 1 : 0, veSom ? 1 : 0,
      vang ? chon(['Vắng có phép — báo trước qua Zalo.', 'Vắng không phép.'])
        : muon ? 'Đi muộn 15 phút vì tắc đường.'
          : veSom ? 'Xin phép về sớm đi khám.' : (rnd() < 0.25 ? chon(GHI_CHU_DIEM_DANH) : ''),
      gio(b.n, 20, 0),
    ]);
  }
}
await chenNhieu('class_attendance',
  ['session_id', 'user_id', 'status', 'is_late', 'is_left_early', 'teacher_note', 'created_at'],
  diemDanhHang);

console.log(`📅 ${buoiHang.length} buổi học · ${diemDanhHang.length} dòng điểm danh (buổi hôm nay cố ý để trống)`);

// ------------------------------------------------------------------ 4. BÀI CÔ GIAO (assignments)

// `lesson_id` dùng CHUNG hệ quy ước với exercise_results (xem README mục 6 và CLAUDE.md).
// Giữ mọi id <= 20 ký tự: route POST /api/exercise/submit từ chối id dài hơn thế.
const BAI_GIAO = [
  // [lop, lesson_id, tiêu đề,                                  hạn nộp (lùi ngày, âm = tương lai)]
  ['A1', 'td1-1.1', 'Bài tập từ vựng Bài 1.1 — 新同學', 30],
  ['A1', 'td1-1.2', 'Bài tập từ vựng Bài 1.2 — 新同學', 23],
  ['A1', 'pron:initials', 'Luyện phát âm — Thanh mẫu', 16],
  ['A1', 'td1-2.1', 'Bài tập từ vựng Bài 2.1 — 你幾點去學校？', 9],
  ['A1', 'onllang:td1-2', 'Luyện tập tổng hợp — Bài 2', 2],
  ['A1', 'td1-3.1', 'Bài tập từ vựng Bài 3.1 — 買生日禮物', 0],
  ['A1', 'writing:td1-3.1', 'Luyện viết chữ Hán — Bài 3.1', -4],
  ['A1', 'td1-3.2', 'Bài tập từ vựng Bài 3.2 — 買生日禮物', -9],
  ['B1', 'td2-1.1', 'Bài tập từ vựng Bài 1.1 (Quyển 2)', 28],
  ['B1', 'pron:tones', 'Luyện phát âm — Thanh điệu', 19],
  ['B1', 'td2-2.1', 'Bài tập từ vựng Bài 2.1 (Quyển 2)', 11],
  ['B1', 'tocfl:L2', 'Từ vựng TOCFL Band A — cấp 2', 3],
  ['B1', 'onllang:td2-3', 'Luyện tập tổng hợp — Bài 3 (Q2)', -2],
  ['B1', 'td2-3.2', 'Bài tập từ vựng Bài 3.2 (Quyển 2)', -7],
];
const baiGiao = [];
for (const [lop, lid, ten, han] of BAI_GIAO) {
  const [r] = await db.query(
    `INSERT INTO assignments (class_id, lesson_id, exercise_type, title, due_date, note, created_by, created_at, updated_at)
     VALUES (?,?,'bai-tap',?,?,?,?,?,?)`,
    [LOP[lop].id, lid, ten, ngay(han),
      han <= 0 ? 'Làm trước buổi tới nhé cả lớp.' : '',
      GV, gio(han + 7, 21, 30), gio(han + 7, 21, 30)],
  );
  baiGiao.push({ id: r.insertId, lop, lid, ten, han });
}

// "Đã xem thông báo bài giao" — cố ý CHƯA đọc với những bài mới giao gần đây và với em hv02,
// để chuông thông báo bên cổng học viên có số đỏ thật chứ không phải màn hình sạch trơn.
const docHang = [];
for (const a of baiGiao) {
  for (const h of LOP[a.lop].hv) {
    if (h.ma === 'hv05') continue;
    if (a.han < 3) continue;                       // bài mới giao: chưa ai kịp xem
    if (h.ma === 'hv02' && a.han < 12) continue;   // em này hay bỏ qua thông báo
    docHang.push([a.id, h.id, gio(a.han + 6, 22, 15)]);
  }
}
await chenNhieu('assignment_reads', ['assignment_id', 'user_id', 'read_at'], docHang);

// Mail nhắc đã gửi cho những em quá hạn mà chưa nộp (đúng việc cron nhac-hoc làm hằng ngày).
await chenNhieu('assignment_reminders', ['assignment_id', 'user_id', 'sent_at'],
  baiGiao.filter((a) => a.han <= 0).flatMap((a) =>
    LOP[a.lop].hv.filter((h) => ['hv02', 'hv04'].includes(h.ma)).map((h) => [a.id, h.id, gio(Math.abs(a.han), 7, 0)])));

console.log(`📝 ${baiGiao.length} bài cô giao · ${docHang.length} lượt đã xem thông báo`);

// ------------------------------------------------------------------ 5. KẾT QUẢ BÀI TẬP

// Nạp từ vựng thật của bài để `details_json` có chữ Hán đúng — snapshot này chính là thứ giáo
// viên mở ra xem "em ấy sai câu nào" trong Quản lý lớp.
function tuCuaBai(lessonKey) {
  const f = path.join(GOC, 'public/data/giaotrinh', lessonKey + '.json');
  if (!fs.existsSync(f)) return [];
  try { return (JSON.parse(fs.readFileSync(f, 'utf8')).v || []); } catch { return []; }
}
const KHO_TU = {};
for (const q of ['td1-1', 'td1-2', 'td1-3', 'td1-4', 'td2-1', 'td2-2', 'td2-3', 'td2-4']) {
  KHO_TU[q] = tuCuaBai(q);
}
const TU_TAT_CA = Object.values(KHO_TU).flat();

/** Snapshot 1 bài trắc nghiệm giáo trình, đúng dạng `{questions, answers}` mà admin.js đọc được. */
function chiTietGiaoTrinh(lessonId, soCau, soDung) {
  const goc = lessonId.split('.')[0];
  const kho = (KHO_TU[goc] && KHO_TU[goc].length >= 8) ? KHO_TU[goc] : TU_TAT_CA;
  const questions = [];
  const answers = [];
  for (let i = 0; i < soCau; i++) {
    const w = kho[(i * 3 + 1) % kho.length];
    const nhieu = [0, 1, 2, 3].map((k) => kho[(i * 5 + k * 7 + 2) % kho.length]);
    const correctIdx = i % 4;
    const options = nhieu.map((x, k) => ({ text: k === correctIdx ? (w.def || '') : (x.def || '') }));
    questions.push({
      prompt: `Từ 「${w.hanzi}」 nghĩa là gì?`,
      promptSub: w.pinyin || '',
      options, correctIdx,
      wordHanzi: w.hanzi, wordPinyin: w.pinyin || '', wordDef: w.def || '',
    });
    // Những câu đầu cho đúng, phần còn lại chọn lệch 1 ô -> đủ số câu sai cần thiết.
    answers.push(i < soDung ? correctIdx : (correctIdx + 1) % 4);
  }
  return { questions, answers };
}

/** Snapshot bài luyện phát âm — dạng MẢNG, khác dạng của giáo trình (xem _normalizeExerciseDetails). */
function chiTietPhatAm(soCau, soDung) {
  const AM = [['b', 'p', 'm', 'f'], ['d', 't', 'n', 'l'], ['g', 'k', 'h', 'j'], ['zh', 'ch', 'sh', 'r'],
    ['z', 'c', 's', 'y'], ['ā', 'á', 'ǎ', 'à'], ['ī', 'í', 'ǐ', 'ì'], ['ū', 'ú', 'ǔ', 'ù']];
  const out = [];
  for (let i = 0; i < soCau; i++) {
    const bo = AM[i % AM.length];
    const correctIdx = i % 4;
    out.push({
      question: `Nghe và chọn âm đúng (câu ${i + 1})`,
      options: bo.slice(),
      selected: i < soDung ? correctIdx : (correctIdx + 2) % 4,
      correctIdx,
      explain: `Đáp án: ${bo[correctIdx]}`,
    });
  }
  return out;
}

// Mỗi em làm nhiều bài, trải theo thời gian. Em nào `suc` cao thì điểm cao và làm nhiều hơn.
const LOAI_BAI = {
  A1: ['td1-1.1', 'td1-1.2', 'td1-1.3', 'td1-2.1', 'td1-2.2', 'td1-3.1', 'td1-3.2', 'td1-4.1',
    'pron:initials', 'pron:finals', 'pron:tones', 'onllang:td1-1', 'onllang:td1-2',
    'writing:td1-2.1', 'tocfl:L1'],
  B1: ['td2-1.1', 'td2-1.2', 'td2-2.1', 'td2-2.2', 'td2-3.1', 'td2-3.2', 'td2-4.1',
    'pron:tones', 'pron:finals', 'onllang:td2-1', 'onllang:td2-3',
    'writing:td2-2.1', 'tocfl:L2', 'tocfl:L3'],
};
const LOI_PHE = [
  'Em làm tốt phần từ vựng, chú ý thêm thanh điệu nhé.',
  'Còn nhầm giữa 的/得/地. Em xem lại phần ngữ pháp bài này.',
  'Tiến bộ so với lần trước. Giữ nhịp học đều nhé.',
  'Phần nghe còn yếu, em nghe lại bản thu 2-3 lần trước khi làm.',
  'Sai nhiều ở nhóm từ chỉ thời gian. Cô sẽ chữa lại vào buổi tới.',
  'Rất tốt! Em thử làm thêm phần Luyện tập tổng hợp của bài này.',
];

const ketQuaHang = [];
for (const h of HOC_VIEN) {
  const danh = [...new Set(h.lop.flatMap((k) => LOAI_BAI[k]))];
  const soBai = h.ma === 'hv05' ? 2 : Math.round(8 + h.suc * 16);
  for (let i = 0; i < soBai; i++) {
    const lid = danh[i % danh.length];
    const lanThu = Math.floor(i / danh.length);            // vòng 2 trở đi = làm lại bài cũ
    const nLui = h.ma === 'hv05' ? soTu(1, 6) : Math.max(0, 52 - i * 2 - soTu(0, 2));
    const soCau = lid.startsWith('pron:') ? 12 : lid.startsWith('tocfl:') ? 20 : 10;
    // Làm lại thì khá hơn lần đầu — để đồ thị tiến độ có hướng đi lên.
    const tiLe = Math.min(1, Math.max(0.2, h.suc + lanThu * 0.08 + (rnd() - 0.5) * 0.2));
    const soDung = Math.max(1, Math.round(soCau * tiLe));
    const phanTram = Math.round((soDung / soCau) * 10000) / 100;

    let chiTiet = null;
    if (lid.startsWith('pron:')) chiTiet = chiTietPhatAm(soCau, soDung);
    else if (!lid.startsWith('tocfl:') && !lid.startsWith('writing:')) chiTiet = chiTietGiaoTrinh(lid, soCau, soDung);

    // Lời phê: chỉ một phần bài có. Em hv03 cố ý để `review_read_at` NULL -> chuông đỏ bên
    // cổng học viên; những em khác đã đọc.
    const coPhe = i % 5 === 2;
    const daDoc = coPhe && h.ma !== 'hv03';

    ketQuaHang.push([
      h.id, lid, soCau, soDung, phanTram, soTu(90, 420),
      chiTiet ? JSON.stringify(chiTiet) : null,
      coPhe ? LOI_PHE[(h.id + i) % LOI_PHE.length] : null,
      daDoc ? gio(Math.max(0, nLui - 1), 21, 10) : null,
      gio(nLui, soTu(19, 22), soTu(0, 59)),
    ]);
  }
}
await chenNhieu('exercise_results',
  ['user_id', 'lesson_id', 'total_questions', 'correct_answers', 'score_percent', 'time_seconds',
    'details_json', 'teacher_review', 'review_read_at', 'created_at'],
  ketQuaHang, 100);

console.log(`✅ ${ketQuaHang.length} lượt nộp bài tập (kèm snapshot từng câu + lời phê của cô)`);

// ------------------------------------------------------------------ 6. NGÂN HÀNG ĐỀ TOCFL + KẾT QUẢ THI

// `exam_questions` trước nay RỖNG, mà POST /api/exam/submit chấm bằng cách tra `correct_option`
// trong bảng này theo `question_id` của đề tĩnh (public/data/thi/tocfl.json). Bảng rỗng nghĩa là
// mọi lượt thi thử đều bị 400 và frontend chỉ console.warn -> KHÔNG lượt thi nào được lưu.
// Nạp đúng 1.600 câu với `id` khớp file JSON thì luồng thi thử chạy trọn vẹn: nộp -> chấm ->
// lưu lịch sử -> cộng điểm -> giáo viên xem và phê được.
const deTocfl = JSON.parse(fs.readFileSync(path.join(GOC, 'public/data/thi/tocfl.json'), 'utf8'));
const cauThi = [];
for (const de of deTocfl) {
  for (const kieu of ['reading', 'listening']) {
    for (const [i, q] of (de[kieu] || []).entries()) {
      const o = (q.options || []).map((x) => String(x).slice(0, 200));
      cauThi.push([
        q.id, kieu, String(q.level || 'Band A').slice(0, 20),
        q.passage || null, q.audioSrc || null,
        String(q.question || '').slice(0, 2000), '',
        o[0] || '', o[1] || '', o[2] || '', o[3] || '',
        '', '', '', '',
        Number(q.correct) || 0, i,
      ]);
    }
  }
}
await chenNhieu('exam_questions',
  ['id', 'type', 'level', 'passage', 'audio_desc', 'question', 'question_meaning',
    'option_a', 'option_b', 'option_c', 'option_d',
    'option_a_meaning', 'option_b_meaning', 'option_c_meaning', 'option_d_meaning',
    'correct_option', 'sort_order'],
  cauThi, 200);

// Lượt thi thử. hv07 cày nhiều nhất; em hv05 chưa thi lần nào.
const idTheoDe = {};
for (const de of deTocfl) {
  idTheoDe[de.id] = { reading: (de.reading || []).map((q) => [q.id, q.correct]), listening: (de.listening || []).map((q) => [q.id, q.correct]) };
}
const DE_THI = Object.keys(idTheoDe);
let soLuotThi = 0;
let soCauTraLoi = 0;
for (const h of HOC_VIEN) {
  if (h.ma === 'hv05') continue;
  const soLuot = h.ma === 'hv07' ? 9 : h.suc > 0.8 ? 5 : h.suc > 0.6 ? 3 : 2;
  for (let i = 0; i < soLuot; i++) {
    const kyNang = ['reading', 'listening', 'both'][i % 3];
    const maDe = DE_THI[(h.id + i) % DE_THI.length];
    const bo = kyNang === 'both'
      ? [...idTheoDe[maDe].reading, ...idTheoDe[maDe].listening]
      : idTheoDe[maDe][kyNang];
    if (!bo.length) continue;
    const tiLe = Math.min(0.98, Math.max(0.25, h.suc + i * 0.03 + (rnd() - 0.5) * 0.16));
    const soDung = Math.round(bo.length * tiLe);
    const nLui = Math.max(0, 45 - i * 5 - soTu(0, 3));
    const [r] = await db.query(
      `INSERT INTO exam_results (user_id, skill, total_questions, correct_answers, score_percent,
                                 time_seconds, teacher_review, review_read_at, created_at)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [h.id, kyNang, bo.length, soDung, Math.round((soDung / bo.length) * 10000) / 100,
        soTu(600, 2700),
        i === 1 ? 'Phần nghe của em đã khá hơn. Lần tới thử Band cao hơn nhé.' : null,
        i === 1 && h.ma !== 'hv03' ? gio(Math.max(0, nLui - 1), 20, 0) : null,
        gio(nLui, soTu(14, 21), soTu(0, 59))],
    );
    const traLoi = bo.map(([qid, dung], k) => {
      const lamDung = k < soDung;
      return [r.insertId, qid, lamDung ? dung : (Number(dung) + 1) % 3, lamDung ? 1 : 0];
    });
    soCauTraLoi += await chenNhieu('exam_answers',
      ['exam_result_id', 'question_id', 'selected_option', 'is_correct'], traLoi, 200);
    soLuotThi++;
  }
}

console.log(`🎓 Ngân hàng đề: ${cauThi.length} câu TOCFL (18 đề) · ${soLuotThi} lượt thi thử · ${soCauTraLoi} câu trả lời`);

// ------------------------------------------------------------------ 7. SỔ TAY + ÔN TẬP NGẮT QUÃNG

/** Một dòng sổ tay / thẻ ôn tập dựng từ dữ liệu từ vựng thật của giáo trình. */
function dongTu(w, nguon) {
  return {
    tu: String(w.hanzi).slice(0, 32),
    gian: sangGianThe(String(w.hanzi)).slice(0, 32),
    pinyin: String(w.pinyin || '').slice(0, 120),
    nghia: String(w.def || '').slice(0, 500),
    nguon,
  };
}
const NGUON_SO_TAY = ['giao-trinh', 'tu-dien', 'tocfl', 'bo-thu'];

const soTayHang = [];
const srsHang = [];
for (const h of HOC_VIEN) {
  const soTay = h.ma === 'hv05' ? 0 : h.ma === 'hv08' ? 30 : Math.round(8 + h.suc * 18);
  const daLuu = new Set();
  for (let i = 0; i < soTay; i++) {
    const w = TU_TAT_CA[(h.id * 13 + i * 7) % TU_TAT_CA.length];
    if (!w || daLuu.has(w.hanzi)) continue;
    daLuu.add(w.hanzi);
    const d = dongTu(w, NGUON_SO_TAY[i % NGUON_SO_TAY.length]);
    soTayHang.push([h.id, d.tu, d.gian, d.pinyin, null, d.nghia, d.nguon,
      i % 6 === 0 ? 'Hay nhầm với từ đồng âm — ôn lại.' : null,
      gio(soTu(1, 50), soTu(9, 22), soTu(0, 59))]);
  }

  // Thẻ ôn tập: trạng thái rải đều new/learning/review/mastered. Em hv09 có 28 thẻ TỚI HẠN
  // hôm nay để màn "Ôn tập" không bao giờ trống khi mở thử.
  const soThe = h.ma === 'hv05' ? 3 : h.ma === 'hv09' ? 55 : Math.round(15 + h.suc * 40);
  const daCo = new Set();
  for (let i = 0; i < soThe; i++) {
    const w = TU_TAT_CA[(h.id * 29 + i * 11) % TU_TAT_CA.length];
    if (!w || daCo.has(w.hanzi)) continue;
    daCo.add(w.hanzi);
    const d = dongTu(w, 'giao-trinh');
    const toiHan = h.ma === 'hv09' ? i < 28 : i % 4 === 0;
    const lanOn = toiHan ? soTu(0, 2) : soTu(1, 6);
    const trangThai = lanOn === 0 ? 'new' : lanOn <= 2 ? 'learning' : lanOn <= 4 ? 'review' : 'mastered';
    const khoang = trangThai === 'new' ? 0 : trangThai === 'learning' ? soTu(1, 3)
      : trangThai === 'review' ? soTu(6, 20) : soTu(21, 60);
    srsHang.push([
      h.id, d.tu, d.gian, d.pinyin, null, d.nghia, d.nguon,
      (2.5 + (rnd() - 0.5) * 0.6).toFixed(2), khoang, lanOn,
      toiHan ? gio(soTu(0, 2), 8, 0) : gio(-soTu(1, 14), 8, 0),   // lùi âm = tương lai
      lanOn ? gio(soTu(1, 20), 21, 0) : null,
      trangThai, lanOn, Math.round(lanOn * (0.6 + h.suc * 0.4)),
    ]);
  }
}
await chenNhieu('notebook_words',
  ['user_id', 'tu', 'gian', 'pinyin', 'han_viet', 'nghia', 'nguon', 'ghi_chu', 'created_at'],
  soTayHang, 200);
await chenNhieu('srs_words',
  ['user_id', 'tu', 'gian', 'pinyin', 'han_viet', 'nghia', 'nguon', 'ease_factor', 'interval_days',
    'repetitions', 'due_date', 'last_review', 'status', 'total_reviews', 'correct_count'],
  srsHang, 200);

console.log(`📔 Sổ tay ${soTayHang.length} từ · Ôn tập ngắt quãng ${srsHang.length} thẻ`);

// ------------------------------------------------------------------ 8. NHỊP HỌC 120 NGÀY

// Nuôi lịch nhiệt, biểu đồ "học bao nhiêu phút ở đâu" và chuỗi ngày ở trang Tiến độ.
// Trần của server là 8 giờ/ngày (GIAY_TOI_DA_MOI_NGAY trong routes/lotrinh.js) — giữ dưới mức đó.
const KHU_VUC = ['giaotrinh', 'phat-am', 'tu-vung', 'thi-thu', 'luyen-tap', 'lo-trinh'];
const nhipHang = [];
for (const h of HOC_VIEN) {
  const soNgay = h.ma === 'hv05' ? 7 : 120;
  for (let n = soNgay; n >= 0; n--) {
    // Chuỗi hiện tại phải ĐÚNG với users.streak đã đặt ở trên: n < chuoi thì chắc chắn có học.
    let coHoc;
    if (n < h.chuoi) coHoc = true;
    else if (n === h.chuoi) coHoc = false;                     // chính ngày làm đứt chuỗi
    else if (h.ma === 'hv08' && n < 7) coHoc = false;          // em này vừa nghỉ 6 ngày
    else coHoc = rnd() < (0.35 + h.suc * 0.5);
    if (!coHoc) continue;
    const soKhu = soTu(1, 3);
    for (let k = 0; k < soKhu; k++) {
      const kv = KHU_VUC[(h.id + n + k) % KHU_VUC.length];
      nhipHang.push([h.id, ngay(n), kv, soTu(240, 1800), soTu(3, 25)]);
    }
  }
}
await chenNhieu('study_activity', ['user_id', 'ngay', 'khu_vuc', 'giay', 'so_lan'], nhipHang, 400);

console.log(`⏱  ${nhipHang.length} bản ghi nhịp học (120 ngày, 6 khu vực) — nuôi lịch nhiệt & chuỗi ngày`);

// ------------------------------------------------------------------ 9. SỔ NHẬN XÉT

const NHAN_XET_HV = {
  hv01: ['Em học rất đều, hay hỏi thêm sau giờ. Có thể cho làm trước bài nâng cao.',
    'Đã hướng dẫn em cách tự ôn bằng sổ tay + thẻ ôn tập.'],
  hv02: ['Thông minh nhưng lười làm bài về nhà. Đã nhắc phụ huynh.',
    'Tuần này nộp bù được 2 bài, có tiến bộ.'],
  hv03: ['Phát âm còn nặng giọng địa phương, cần luyện thanh điệu.',
    'Em ít khi mở phần thông báo nên hay bỏ lỡ bài cô giao.'],
  hv04: ['Vắng nhiều, mất gốc từ bài 2. Đề nghị học kèm 1-1 hai buổi.',
    'Đã gọi cho gia đình, bố mẹ hứa nhắc em đi học đều.',
    'Buổi gần nhất có đi học và làm bài đầy đủ — cần duy trì.'],
  hv05: ['Mới nhận vào lớp, đang theo kịp từ bài 3.'],
  hv06: ['Học cả hai lớp nên lịch dày, chú ý sức khoẻ.',
    'Kết quả ở lớp B1 tốt hơn lớp A1.'],
  hv07: ['Mục tiêu TOCFL Band A trong 3 tháng. Đang bám sát kế hoạch.'],
  hv08: ['Nghỉ một tuần vì việc gia đình, đã sắp xếp học bù.'],
  hv09: ['Chăm ôn từ vựng nhưng ngại nói. Cần gọi phát biểu nhiều hơn.'],
  hv10: ['Hay bị đăng xuất do dùng nhiều máy — đã hướng dẫn gỡ bớt thiết bị.'],
  hv11: ['Gia đình đang làm hồ sơ du học, em cần chứng chỉ trước tháng sau.'],
};
const nhanXetHang = [];
for (const h of HOC_VIEN) {
  for (const [i, nd] of (NHAN_XET_HV[h.ma] || []).entries()) {
    nhanXetHang.push([h.id, LOP[h.lop[0]].id, GV, nd, gio(40 - i * 12, 22, 0)]);
  }
}
await chenNhieu('student_notes', ['user_id', 'class_id', 'author_id', 'note', 'created_at'], nhanXetHang);

await chenNhieu('teacher_notes', ['teacher_id', 'noi_dung', 'nguoi_ghi', 'created_at'], [
  [GV, 'Nhận thêm lớp B1 từ đầu tháng, tổng 2 lớp.', ADMIN, gio(55, 9, 0)],
  [GV, 'Dự giờ buổi 12: giáo án rõ ràng, có kiểm tra đầu giờ. Nên cho học viên nói nhiều hơn.', ADMIN, gio(28, 9, 0)],
  [GV, 'Phụ huynh em Phạm Gia Huy khen cô nhiệt tình liên lạc.', ADMIN, gio(14, 9, 0)],
]);
await chenNhieu('teacher_reviews',
  ['teacher_id', 'ky', 'diem_chuyen_can', 'diem_bai_giang', 'diem_theo_sat', 'diem_phan_hoi',
    'diem_ket_qua', 'nhan_xet', 'nguoi_cham'],
  [
    [GV, ky(2), 9, 8, 8, 9, 8, 'Kỳ đầu nhận lớp, bám lớp tốt.', ADMIN],
    [GV, ky(1), 9, 9, 9, 9, 8, 'Tỉ lệ chuyên cần của lớp A1 tăng rõ.', ADMIN],
  ]);

console.log(`🗒  ${nhanXetHang.length} nhận xét học viên · 3 ghi chú + 2 phiếu chấm giáo viên`);

// ------------------------------------------------------------------ 10. ĐỀ BÀI & KIỂM TRA

/** Tạo một đề kèm câu hỏi. Trả về { id, cau: [...] }. */
async function taoDe(de, cauHoi) {
  const [r] = await db.query(
    `INSERT INTO de_bai (org_id, ma, tieu_de, mo_ta, loai, thoi_gian_phut, tron_cau, tron_dap_an,
                         so_lan_lam, hien_dap_an, diem_dat, tao_boi, trang_thai)
     VALUES (1,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [de.ma, de.tieu_de, de.mo_ta, de.loai, de.phut ?? null, de.tron ? 1 : 0, de.tron ? 1 : 0,
      de.so_lan ?? 1, de.hien_dap_an || 'ngay', de.diem_dat ?? 50, GV, de.trang_thai || 'phat-hanh'],
  );
  const cau = [];
  for (const [i, c] of cauHoi.entries()) {
    const [cr] = await db.query(
      'INSERT INTO de_cau_hoi (de_id, sort_order, loai, noi_dung, lua_chon, dap_an, diem, giai_thich) VALUES (?,?,?,?,?,?,?,?)',
      [r.insertId, (i + 1) * 10, c.loai, c.nd,
        c.loai === 'dung-sai' ? JSON.stringify(['Đúng', 'Sai']) : c.lc ? JSON.stringify(c.lc) : null,
        c.da ? JSON.stringify(c.da) : null, c.diem ?? 1, c.gt || null],
    );
    cau.push({ id: cr.insertId, loai: c.loai, dap_an: c.da ? JSON.stringify(c.da) : null, diem: c.diem ?? 1 });
  }
  return { id: r.insertId, cau };
}

const de1 = await taoDe(
  { ma: 'DE-0001', tieu_de: 'Kiểm tra 15 phút — Bài 1 & 2 (Quyển 1)', loai: 'kiem-tra', phut: 15, tron: true, diem_dat: 50,
    mo_ta: 'Làm trong 15 phút. Câu tự luận viết ít nhất 3 câu tiếng Trung.' },
  [
    { loai: 'mot-dap-an', nd: '「你好」 nghĩa là gì?', lc: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], da: [0], diem: 2, gt: 'Câu chào thông dụng nhất.' },
    { loai: 'mot-dap-an', nd: 'Chữ 「我」 đọc là gì?', lc: ['nǐ', 'wǒ', 'tā', 'men'], da: [1], diem: 2 },
    { loai: 'nhieu-dap-an', nd: 'Chọn TẤT CẢ các từ chỉ thành viên gia đình', lc: ['爸爸', '學校', '媽媽', '哥哥', '書'], da: [0, 2, 3], diem: 3, gt: 'Bố, mẹ, anh trai.' },
    { loai: 'dung-sai', nd: '「謝謝」 nghĩa là "cảm ơn".', da: [0], diem: 1 },
    { loai: 'dien-tu', nd: 'Điền phiên âm CÓ DẤU của 「老師」', da: ['lǎoshī', 'lao shi', 'laoshi'], diem: 2, gt: 'Nhận cả dạng không dấu vì bàn phím có thể không gõ được.' },
    { loai: 'mot-dap-an', nd: '「幾點」 dùng để hỏi điều gì?', lc: ['Giá tiền', 'Mấy giờ', 'Ở đâu', 'Ai'], da: [1], diem: 2 },
    { loai: 'tu-luan', nd: 'Viết 3–5 câu giới thiệu bản thân bằng tiếng Trung (tên, tuổi, nghề nghiệp).', diem: 5 },
  ],
);

const de2 = await taoDe(
  { ma: 'DE-0002', tieu_de: 'Luyện từ vựng Bài 3 — làm lại thoải mái', loai: 'bai-tap', phut: null, so_lan: 0, diem_dat: 60,
    mo_ta: 'Bài tự luyện — làm bao nhiêu lần cũng được, điểm lấy lần cao nhất.' },
  [
    { loai: 'mot-dap-an', nd: '「學生」 nghĩa là gì?', lc: ['giáo viên', 'học sinh', 'trường học', 'lớp học'], da: [1], diem: 1 },
    { loai: 'mot-dap-an', nd: '「老師」 nghĩa là gì?', lc: ['học sinh', 'bạn bè', 'giáo viên', 'bác sĩ'], da: [2], diem: 1 },
    { loai: 'dien-tu', nd: 'Viết chữ Hán của từ "trường học" (2 chữ)', da: ['學校', '学校'], diem: 2 },
    { loai: 'dung-sai', nd: '「生日」 nghĩa là "sinh nhật".', da: [0], diem: 1 },
    { loai: 'mot-dap-an', nd: '「禮物」 nghĩa là gì?', lc: ['quà tặng', 'lễ phép', 'vật lý', 'thức ăn'], da: [0], diem: 1 },
  ],
);

const de3 = await taoDe(
  { ma: 'DE-0003', tieu_de: 'Kiểm tra giữa kỳ — Quyển 2', loai: 'kiem-tra', phut: 45, tron: true, diem_dat: 60, hien_dap_an: 'sau-han',
    mo_ta: 'Kiểm tra giữa kỳ lớp B1. Chỉ xem được đáp án sau khi hết hạn nộp.' },
  [
    { loai: 'mot-dap-an', nd: '「一起」 nghĩa là gì?', lc: ['một mình', 'cùng nhau', 'lần đầu', 'ngay lập tức'], da: [1], diem: 2 },
    { loai: 'nhieu-dap-an', nd: 'Chọn các từ chỉ PHƯƠNG TIỆN đi lại', lc: ['公車', '捷運', '便當', '飛機'], da: [0, 1, 3], diem: 3 },
    { loai: 'dien-tu', nd: 'Điền phiên âm có dấu của 「便宜」', da: ['piányí', 'pian yi', 'pianyi'], diem: 2 },
    { loai: 'dung-sai', nd: '「不好意思」 dùng khi muốn xin lỗi nhẹ hoặc làm phiền ai đó.', da: [0], diem: 2 },
    { loai: 'tu-luan', nd: 'Viết một đoạn 5 câu kể về một ngày cuối tuần của em.', diem: 6 },
  ],
);

// Đề nháp — để thử trạng thái "chưa phát hành" (học sinh không thấy).
await taoDe(
  { ma: 'DE-0004', tieu_de: '[NHÁP] Kiểm tra cuối kỳ — chưa phát hành', loai: 'kiem-tra', phut: 60, trang_thai: 'nhap',
    mo_ta: 'Đang soạn dở, chưa giao cho lớp nào.' },
  [{ loai: 'mot-dap-an', nd: 'Câu mẫu đang soạn', lc: ['A', 'B'], da: [0], diem: 1 }],
);

/** Giao một đề cho lớp. */
async function giaoDe(deId, lop, dongLui, ghiChu) {
  const [r] = await db.query(
    'INSERT INTO de_giao (de_id, class_id, mo_luc, dong_luc, ghi_chu, giao_boi) VALUES (?,?,?,?,?,?)',
    [deId, LOP[lop].id, gio(dongLui + 7, 8, 0), gio(dongLui, 23, 59), ghiChu, GV],
  );
  return r.insertId;
}
const giao1 = await giaoDe(de1.id, 'A1', 3, 'Làm trước chủ nhật nhé cả lớp.');
const giao2 = await giaoDe(de2.id, 'A1', -14, 'Luyện thêm ở nhà, không tính điểm.');
const giao3 = await giaoDe(de3.id, 'B1', -5, 'Kiểm tra giữa kỳ, làm nghiêm túc.');

/** Sinh câu trả lời của một em: `tiLe` phần câu đầu làm đúng, phần còn lại sai. */
function traLoiDe(cau, tiLe) {
  const bl = {};
  const nDung = Math.round(cau.length * tiLe);
  cau.forEach((c, i) => {
    const da = c.dap_an ? JSON.parse(c.dap_an) : null;
    if (c.loai === 'tu-luan') { bl[c.id] = '我叫小明。我今年十八歲。我是學生，我喜歡學中文。'; return; }
    const dung = i < nDung;
    if (c.loai === 'dien-tu') { bl[c.id] = dung ? da[0] : 'sai roi'; return; }
    if (c.loai === 'nhieu-dap-an') { bl[c.id] = dung ? da : [da[0]]; return; }
    bl[c.id] = dung ? da[0] : (Number(da[0]) + 1) % 4;
  });
  return bl;
}

/** Nộp bài thay học viên, chấm bằng chính `chamBai()` của server để điểm khớp tuyệt đối. */
async function nopDe(de, giaoId, hv, tiLe, nLui, { cham = false, nhanXet = null, daDoc = false, hetGio = false, lanThu = 1 } = {}) {
  const bl = traLoiDe(de.cau, tiLe);
  const kq = chamBai(de.cau, bl);
  const coTuLuan = kq.co_tu_luan;
  // Tự luận thì giáo viên phải chấm tay; cộng thêm điểm tay khi `cham`.
  const diemTay = cham && coTuLuan ? Math.round(de.cau.filter((c) => c.loai === 'tu-luan')
    .reduce((s, c) => s + Number(c.diem) * tiLe, 0) * 100) / 100 : 0;
  await db.query(
    `INSERT INTO de_bai_lam (de_id, giao_id, user_id, lan_thu, bat_dau_luc, nop_luc, het_gio,
                             diem, tong_diem, so_cau_dung, tong_cau, tra_loi, cham_boi, cham_luc,
                             nhan_xet, da_doc_luc, trang_thai, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [de.id, giaoId, hv.id, lanThu, gio(nLui, 20, 0), gio(nLui, 20, 22), hetGio ? 1 : 0,
      kq.diem + diemTay, kq.tong_diem, kq.so_cau_dung, kq.tong_cau, JSON.stringify(kq.chi_tiet),
      cham ? GV : null, cham ? gio(Math.max(0, nLui - 1), 21, 0) : null,
      cham ? nhanXet : null, daDoc ? gio(Math.max(0, nLui - 1), 22, 0) : null,
      cham ? 'da-cham' : (coTuLuan ? 'da-nop' : 'da-cham'), gio(nLui, 20, 0)],
  );
}

// Đề 1 (đang mở, còn 3 ngày): 4/6 em lớp A1 đã nộp, 2 em chưa -> danh sách "chưa nộp" có dữ liệu.
await nopDe(de1, giao1, LOP.A1.hv[0], 1.0, 4, { cham: true, nhanXet: 'Bài tự luận viết rất tốt, đủ ý. 10/10.', daDoc: true });
await nopDe(de1, giao1, LOP.A1.hv[1], 0.7, 3, { cham: true, nhanXet: 'Câu tự luận còn thiếu phần nghề nghiệp.', daDoc: false });
await nopDe(de1, giao1, LOP.A1.hv[2], 0.6, 3);
await nopDe(de1, giao1, LOP.A1.hv[3], 0.4, 2, { hetGio: true });
// hv05 (mới vào) và hv06 chưa nộp.

// Đề 2 (bài luyện, không giới hạn số lần): vài em làm nhiều lần, điểm tăng dần.
for (const [i, hv] of LOP.A1.hv.slice(0, 4).entries()) {
  await nopDe(de2, giao2, hv, 0.5 + i * 0.05, 20 - i, { lanThu: 1 });
  await nopDe(de2, giao2, hv, 0.8 + i * 0.04, 12 - i, { lanThu: 2 });
}

// Đề 3 (đã quá hạn): cả lớp B1 đã nộp, giáo viên mới chấm được một nửa -> hàng chờ chấm có việc.
for (const [i, hv] of LOP.B1.hv.entries()) {
  await nopDe(de3, giao3, hv, Math.min(0.95, 0.45 + hv.suc * 0.5), 6 + i, {
    cham: i < 3,
    nhanXet: i < 3 ? ['Đoạn văn mạch lạc, còn vài lỗi lượng từ.', 'Ý tốt nhưng sai thứ tự trạng ngữ thời gian.', 'Cần viết dài hơn theo yêu cầu 5 câu.'][i] : null,
    daDoc: i < 2,
  });
}

const [[demDe]] = await db.query('SELECT COUNT(*) n FROM de_bai_lam');
console.log(`📄 4 đề tự soạn (3 phát hành, 1 nháp) · 3 lượt giao · ${demDe.n} bài làm (có bài chờ chấm)`);

// ------------------------------------------------------------------ 11. HỒ SƠ DU HỌC

const GIAY_TO = [
  ['Hộ chiếu (bản sao)', 1], ['CCCD/CMND (công chứng)', 1], ['Ảnh thẻ 3.5×4.5 (6 ảnh)', 1],
  ['Bằng tốt nghiệp (công chứng + dịch)', 1], ['Học bạ / bảng điểm (công chứng + dịch)', 1],
  ['Giấy khai sinh (công chứng + dịch)', 1], ['Giấy khám sức khoẻ', 1], ['Lý lịch tư pháp số 2', 1],
  ['Chứng minh tài chính (sổ tiết kiệm)', 1], ['Giấy bảo lãnh tài chính của phụ huynh', 1],
  ['Đơn xin nhập học của trường', 1], ['Kế hoạch học tập (讀書計畫書)', 1],
  ['Thư giới thiệu', 0], ['Chứng chỉ tiếng (TOCFL / HSK)', 0], ['Sơ yếu lý lịch', 0],
];

/** `hv` = mã học viên để gắn tài khoản (null = hồ sơ chưa có tài khoản học). */
const HO_SO = [
  { ma: 'HS-2026-001', hv: 'hv01', buoc: 'bay', net: 'Bay sau 21 ngày — đã xong mọi thứ',
    ngay_sinh: '2007-03-14', gt: 'nu', cccd: '001307001234', hc: 'C2223334', hc_han: -1800,
    dia_chi: 'Số 12 ngõ 45 Cầu Giấy, Hà Nội', ph: ['Nguyễn Văn Bình', '0987654321', 'Bố'],
    tn: ['THPT Chu Văn An', '2025', 'Giỏi', 'TOCFL B1'], nv: ['Đại học Đài Bắc', 'Đại học Phụ Nhân'],
    nganh: 'Quản trị du lịch', ky: '2027 Xuân', loai: 'dai-hoc', phi: 60000000, nguon: 'Fanpage trung tâm',
    nhan: 150, buoc_tu: 4, pv: [50, 'dau'], truong_do: 'Đại học Đài Bắc', visa: [25, 'dau'],
    bay: -21, chuyen_bay: 'VN576 HAN–TPE 09:15', gt_xong: 15, ktx: ['co', 'Phòng 4 người', 'duoc'],
    thu: [[30000000, 140, 'dat-coc', 'chuyen-khoan', 'BL0001'],
      [25000000, 60, 'hoc-phi', 'chuyen-khoan', 'BL0011'],
      [5000000, 20, 'phi-visa', 'tien-mat', 'BL0021']],
    nhat_ky: ['Đã đặt vé, gia đình tiễn ở Nội Bài.', 'Đã gửi em thông tin ký túc xá và người đón tại sân bay.'] },

  { ma: 'HS-2026-002', hv: 'hv11', buoc: 'visa', net: 'Đậu phỏng vấn, đang chờ visa + CÓ YÊU CẦU SỬA CHỜ DUYỆT',
    ngay_sinh: '2005-12-25', gt: 'nu', cccd: '001305002468', hc: 'C4443332', hc_han: -1500,
    dia_chi: '101 Nguyễn Trãi, Thanh Xuân, Hà Nội', ph: ['Đặng Quang Vinh', '0988777666', 'Bố'],
    tn: ['THPT Kim Liên', '2024', 'Giỏi', 'TOCFL A2'], nv: ['Đại học Phụ Nhân'],
    nganh: 'Ngôn ngữ Trung', ky: '2027 Xuân', loai: 'dai-hoc', phi: 53000000, nguon: 'Học viên cũ giới thiệu',
    nhan: 120, buoc_tu: 8, pv: [22, 'dau'], truong_do: 'Đại học Phụ Nhân', visa: [6, 'cho'],
    gt_xong: 13, ktx: ['co', 'Phòng 2 người', 'cho'],
    thu: [[53000000, 100, 'hoc-phi', 'chuyen-khoan', 'BL0003']],
    nhat_ky: ['Nộp hồ sơ visa tại VPKTVH Đài Bắc, hẹn trả kết quả sau 10 ngày làm việc.'] },

  { ma: 'HS-2026-003', hv: 'hv07', buoc: 'phong-van', net: 'Phỏng vấn trong 6 ngày nữa',
    ngay_sinh: '2004-09-08', gt: 'nu', cccd: '001204007890', hc: 'C9998887', hc_han: -1200,
    dia_chi: '17 Hoàng Diệu, Đà Nẵng', ph: ['Vũ Đức Thắng', '0913222333', 'Bố'],
    tn: ['Đại học Duy Tân', '2023', 'Khá', 'TOCFL B1'],
    nv: ['Đại học Quốc lập Đài Loan (NTU)', 'Đại học Thanh Hoa Đài Loan'],
    nganh: 'Khoa học máy tính', ky: '2027 Xuân', loai: 'cao-hoc', phi: 55000000, nguon: 'Google',
    nhan: 90, buoc_tu: 10, pv: [-6, 'cho'], gt_xong: 11, ktx: ['chua-quyet', null, null],
    thu: [[30000000, 85, 'dat-coc', 'chuyen-khoan', 'BL0002'],
      [25000000, 30, 'hoc-phi', 'chuyen-khoan', 'BL0015']],
    nhat_ky: ['Đã gửi em bộ câu hỏi phỏng vấn mẫu, hẹn luyện thử thứ 5.'] },

  { ma: 'HS-2026-004', hv: 'hv06', buoc: 'hoc', net: 'Đang học tiếng, đã đóng đủ học phí',
    ngay_sinh: '2005-05-19', gt: 'nu', cccd: '001305001357', hc: 'C5551234', hc_han: -1600,
    dia_chi: '22 Trần Phú, Hải Phòng', ph: ['Đỗ Minh Quân', '0966555444', 'Bố'],
    tn: ['Cao đẳng Kinh tế Hải Phòng', '2024', 'Khá', 'TOCFL A2'], nv: ['Đại học Đạm Giang'],
    nganh: 'Tiếng Trung thương mại', ky: '2027 Thu', loai: 'dai-hoc', phi: 48000000, nguon: 'Fanpage trung tâm',
    nhan: 60, buoc_tu: 30, gt_xong: 9, ktx: ['co', 'Phòng 4 người', 'cho'],
    thu: [[48000000, 50, 'hoc-phi', 'chuyen-khoan', 'BL0008']],
    nhat_ky: ['Em học lớp tối 3-5-7, chuyên cần tốt.', 'Đã đóng đủ học phí, chờ lịch phỏng vấn trường.'] },

  { ma: 'HS-2026-005', hv: 'hv04', buoc: 'hoc', net: '⚠ Hộ chiếu còn 95 ngày + hồ sơ đứng yên 48 ngày',
    ngay_sinh: '2006-01-30', gt: 'nam', cccd: '001206003456', hc: 'C1112223', hc_han: -95,
    dia_chi: '5 Nguyễn Huệ, Huế', ph: ['Phạm Thị Lan', '0905111222', 'Mẹ'],
    tn: ['THPT Quốc Học Huế', '2024', 'Giỏi', 'HSK 3'], nv: ['Đại học Thành Công (NCKU)'],
    nganh: 'Kỹ thuật cơ khí', ky: '2027 Xuân', loai: 'dai-hoc', phi: 50000000, nguon: 'TikTok',
    nhan: 75, buoc_tu: 48, gt_xong: 5, ktx: ['khong', null, null],
    ghi_chu: 'Hộ chiếu còn dưới 6 tháng — phải làm lại trước khi nộp visa.',
    thu: [[20000000, 70, 'dat-coc', 'chuyen-khoan', 'BL0005']],
    nhat_ky: ['Gọi 2 lần không nghe máy, đã nhắn Zalo.'] },

  { ma: 'HS-2026-006', hv: 'hv02', buoc: 'dong-tien', net: 'Đóng 1 đợt, còn nợ 27 triệu',
    ngay_sinh: '2006-11-02', gt: 'nam', cccd: '001206005678', hc: 'C7654321', hc_han: -1400,
    dia_chi: '89 Lê Lợi, TP. Vinh, Nghệ An', ph: ['Trần Văn Hùng', '0912000111', 'Bố'],
    tn: ['THPT Huỳnh Thúc Kháng', '2024', 'Khá', 'TOCFL A1'],
    nv: ['Đại học Trung Nguyên', 'Đại học Minh Truyền'],
    nganh: 'Quản trị kinh doanh', ky: '2027 Xuân', loai: 'dai-hoc', phi: 52000000, nguon: 'Người quen giới thiệu',
    nhan: 25, buoc_tu: 12, gt_xong: 6, ktx: ['chua-quyet', null, null],
    thu: [[15000000, 20, 'dat-coc', 'chuyen-khoan', 'BL0012'], [10000000, 5, 'phi-ho-so', 'tien-mat', 'BL0019']],
    nhat_ky: ['Đã nhắc gia đình chuyển nốt 27 triệu trước ngày 30.'] },

  { ma: 'HS-2026-007', hv: null, buoc: 'ho-so', net: 'Mới nhận hôm nay, chưa đóng đồng nào, chưa có tài khoản học',
    ho_ten: 'Hoàng Thị Mai Chi', ngay_sinh: '2007-08-03', gt: 'nu', cccd: '001307007531',
    dia_chi: '7 Quang Trung, Nam Định', ph: ['Hoàng Văn Thái', '0944333222', 'Bố'],
    tn: ['THPT Nguyễn Khuyến', '2025', 'Khá', 'Chưa có'], nv: ['Đại học Văn Hoá Trung Quốc'],
    nganh: 'Thiết kế đồ hoạ', ky: '2027 Thu', loai: 'hoa-ngu', phi: 45000000, nguon: 'Facebook',
    nhan: 0, buoc_tu: 0, gt_xong: 3, ktx: ['chua-quyet', null, null], thu: [],
    ghi_chu: 'Gia đình đã có sổ tiết kiệm 250 triệu, cần bổ sung bản dịch công chứng.',
    nhat_ky: ['Tư vấn qua điện thoại 40 phút, gia đình quyết định nộp hồ sơ kỳ Thu 2027.'] },

  { ma: 'HS-2026-008', hv: null, buoc: 'tam-dung', net: 'Tạm dừng — gia đình hoãn sang kỳ sau',
    ho_ten: 'Nguyễn Thu Hà', ngay_sinh: '2006-08-03', gt: 'nu', cccd: '001306007532',
    dia_chi: '250 Phan Đình Phùng, Buôn Ma Thuột', ph: ['Nguyễn Thị Hoa', '0922111000', 'Mẹ'],
    tn: ['THPT Buôn Ma Thuột', '2024', 'Trung bình', 'TOCFL A1'], nv: ['Đại học Khai Nam'],
    nganh: 'Nhà hàng khách sạn', ky: '2027 Thu', loai: 'dai-hoc', phi: 47000000, nguon: 'TikTok',
    nhan: 110, buoc_tu: 40, gt_xong: 4, ktx: ['chua-quyet', null, null],
    ghi_chu: 'Gia đình xin hoãn sang kỳ Thu 2027 vì lý do tài chính. Giữ nguyên tiền cọc.',
    thu: [[10000000, 100, 'dat-coc', 'tien-mat', 'BL0009']],
    nhat_ky: ['Gia đình xin dừng tạm, hẹn liên hệ lại tháng 3.'] },

  { ma: 'HS-2026-009', hv: null, buoc: 'huy', net: 'Trượt visa — đã hoàn lại 20 triệu',
    ho_ten: 'Ngô Văn Kiên (hồ sơ cũ)', ngay_sinh: '2005-04-27', gt: 'nam', cccd: '001205004321',
    hc: 'C8889990', hc_han: -1300, dia_chi: '250 Phan Đình Phùng, Buôn Ma Thuột',
    ph: ['Ngô Thị Hoa', '0922111000', 'Mẹ'],
    tn: ['THPT Buôn Ma Thuột', '2023', 'Trung bình', 'TOCFL A1'], nv: ['Đại học Khai Nam'],
    nganh: 'Nhà hàng khách sạn', ky: '2026 Thu', loai: 'dai-hoc', phi: 46000000, nguon: 'TikTok',
    nhan: 220, buoc_tu: 55, pv: [140, 'dau'], truong_do: 'Đại học Khai Nam', visa: [90, 'truot'],
    gt_xong: 12, ktx: ['khong', null, null],
    ghi_chu: 'Trượt visa vòng 2 do chứng minh tài chính không đạt. Đã hoàn 20 triệu theo thoả thuận.',
    thu: [[35000000, 200, 'hoc-phi', 'chuyen-khoan', 'BL0006'],
      [20000000, 60, 'khac', 'chuyen-khoan', 'HT001', 'hoan']],
    nhat_ky: ['Nhận kết quả trượt visa.', 'Đã hoàn 20 triệu, gia đình cân nhắc nộp lại năm sau.'] },

  { ma: 'HS-2026-010', hv: null, buoc: 'hoan-thanh', net: 'Đã bay và nhập học — hồ sơ hoàn thành',
    ho_ten: 'Bùi Anh Tuấn (khoá trước)', ngay_sinh: '2004-02-11', gt: 'nam', cccd: '001204008642',
    hc: 'C6667778', hc_han: -1700, dia_chi: '39 Hùng Vương, Cần Thơ',
    ph: ['Bùi Văn Sáu', '0977888999', 'Bố'],
    tn: ['Đại học Cần Thơ', '2023', 'Khá', 'TOCFL B1'], nv: ['Đại học Trung Sơn'],
    nganh: 'Điện tử viễn thông', ky: '2026 Thu', loai: 'cao-hoc', phi: 58000000, nguon: 'Người quen giới thiệu',
    nhan: 300, buoc_tu: 35, pv: [160, 'dau'], truong_do: 'Đại học Trung Sơn', visa: [120, 'dau'],
    bay: 35, chuyen_bay: 'CI782 SGN–TPE 01:20', gt_xong: 15, ktx: ['co', 'Ký túc xá trường', 'duoc'],
    thu: [[58000000, 280, 'hoc-phi', 'chuyen-khoan', 'BL0000']],
    nhat_ky: ['Em đã nhập học, gửi ảnh ký túc xá về cho trung tâm.'] },
];

const hoSoId = {};
for (const h of HO_SO) {
  const hv = h.hv ? HOC_VIEN.find((x) => x.ma === h.hv) : null;
  const [r] = await db.query(
    `INSERT INTO du_hoc_ho_so
      (org_id, user_id, ma_hs, ho_ten, ngay_sinh, gioi_tinh, cccd, ho_chieu, ho_chieu_het_han,
       dia_chi, phone, email, ph_ten, ph_phone, ph_quan_he,
       truong_tn, nam_tn, xep_loai, trinh_do_tieng, truong_nv1, truong_nv2,
       nganh, ky_nhap_hoc, loai_hinh, tu_van_id, nguon, ngay_nhan, buoc, buoc_tu,
       ngay_phong_van, kq_phong_van, truong_do, ngay_nop_visa, kq_visa, ngay_bay, chuyen_bay,
       tong_phi, ghi_chu, ktx_dang_ky, ktx_loai, ktx_kq)
     VALUES (1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [hv ? hv.id : null, h.ma, h.ho_ten || (hv ? hv.ten : h.ma), h.ngay_sinh, h.gt,
      h.cccd || null, h.hc || null, h.hc_han ? ngay(h.hc_han) : null,
      h.dia_chi, hv ? '09' + String(10000000 + HOC_VIEN.indexOf(hv) * 111111).slice(0, 8) : '0912223334',
      hv ? `${hv.ma}@itaiwan.vn` : null,
      h.ph[0], h.ph[1], h.ph[2],
      h.tn[0], h.tn[1], h.tn[2], h.tn[3], h.nv[0] || null, h.nv[1] || null,
      h.nganh, h.ky, h.loai, ADMIN, h.nguon, ngay(h.nhan), h.buoc, ngay(h.buoc_tu),
      h.pv ? ngay(h.pv[0]) : null, h.pv ? h.pv[1] : null, h.truong_do || null,
      h.visa ? ngay(h.visa[0]) : null, h.visa ? h.visa[1] : null,
      h.bay !== undefined ? ngay(h.bay) : null, h.chuyen_bay || null,
      h.phi, h.ghi_chu || null, h.ktx[0], h.ktx[1], h.ktx[2]],
  );
  hoSoId[h.ma] = r.insertId;

  await chenNhieu('du_hoc_giay_to', ['ho_so_id', 'ten', 'bat_buoc', 'trang_thai', 'ngay_nhan', 'sort_order'],
    GIAY_TO.map(([ten, bb], i) => {
      const xong = i < (h.gt_xong || 0);
      const tt = !xong ? 'chua' : (i < (h.gt_xong || 0) - 3 ? 'nop' : 'dich');
      return [r.insertId, ten, bb, tt, xong ? ngay(Math.max(0, 40 - i * 2)) : null, (i + 1) * 10];
    }));

  await chenNhieu('du_hoc_thu_tien',
    ['ho_so_id', 'loai', 'khoan', 'so_tien', 'ngay_thu', 'hinh_thuc', 'chung_tu', 'nguoi_thu_id'],
    (h.thu || []).map(([t, n, khoan, ht, ct, loai]) => [r.insertId, loai || 'thu', khoan, t, ngay(n), ht, ct, ADMIN]));

  const lichSu = [[r.insertId, 'he-thong', 'ho-so', `Tạo hồ sơ ${h.ma}`, ADMIN, gio(h.nhan, 9, 0)]];
  for (const [i, n] of (h.nhat_ky || []).entries()) {
    lichSu.push([r.insertId, 'ghi-chu', null, n, ADMIN, gio(Math.max(0, h.buoc_tu - i), 15, 0)]);
  }
  if (h.buoc !== 'ho-so') {
    lichSu.push([r.insertId, 'buoc', h.buoc, `Chuyển sang bước: ${h.buoc}`, ADMIN, gio(h.buoc_tu, 10, 0)]);
  }
  await chenNhieu('du_hoc_lich_su', ['ho_so_id', 'loai', 'buoc_moi', 'noi_dung', 'nguoi_id', 'created_at'], lichSu);
}

// Thông báo gửi cho học viên có tài khoản — nuôi chuông thông báo bên cổng học viên.
await chenNhieu('du_hoc_thong_bao',
  ['ho_so_id', 'user_id', 'loai', 'tieu_de', 'noi_dung', 'ngay_lien_quan', 'da_doc_luc', 'created_at'],
  [
    [hoSoId['HS-2026-001'], HOC_VIEN[0].id, 'bay', 'Lịch bay đã chốt',
      'Chuyến VN576 HAN–TPE 09:15. Có mặt ở sân bay trước 3 tiếng.', ngay(-21), null, gio(4, 10, 0)],
    [hoSoId['HS-2026-001'], HOC_VIEN[0].id, 'ktx', 'Đã có kết quả ký túc xá',
      'Em được xếp phòng 4 người, nhận phòng ngay hôm bay.', ngay(-21), gio(3, 20, 0), gio(6, 10, 0)],
    [hoSoId['HS-2026-002'], HOC_VIEN[10].id, 'visa', 'Đã nộp hồ sơ visa',
      'Hẹn trả kết quả sau 10 ngày làm việc.', ngay(6), null, gio(6, 11, 0)],
    [hoSoId['HS-2026-003'], HOC_VIEN[6].id, 'phong-van', 'Lịch phỏng vấn trường',
      'Phỏng vấn online lúc 14:00. Chuẩn bị bản giới thiệu 2 phút.', ngay(-6), null, gio(2, 9, 0)],
    [hoSoId['HS-2026-005'], HOC_VIEN[3].id, 'nhac-giay-to', 'Hộ chiếu sắp hết hạn',
      'Hộ chiếu của em còn dưới 6 tháng, cần làm lại trước khi nộp visa.', ngay(-95), null, gio(5, 8, 0)],
    [hoSoId['HS-2026-006'], HOC_VIEN[1].id, 'nhac-tien', 'Còn thiếu học phí',
      'Gia đình vui lòng chuyển nốt 27.000.000đ trước ngày 30.', null, null, gio(3, 8, 30)],
  ]);

// Yêu cầu sửa hồ sơ: một cái đang CHỜ DUYỆT + một cái đã duyệt, để thử cả hai nhánh.
//
// ⚠️ `thay_doi` phải là MẢNG các cặp cũ→mới `{cot, nhan, cu, moi}`, KHÔNG phải object
// `{cot: giá trị}`. Cổng quản trị gọi thẳng `(y.thay_doi || []).map(...)` khi vẽ danh sách
// (src/admin.js), nên ghi sai dạng là cả trang Hồ sơ du học trắng xoá vì TypeError — không có
// thông báo lỗi nào, chỉ thấy trang trống. Nhãn lấy đúng từ COT_HS trong du-hoc-hocvien.js.
//
// Ngoài ra học sinh chỉ gửi được yêu cầu sửa SAU KHI đã gửi hồ sơ, nên hai hồ sơ này phải có
// `hs_gui_luc` — thiếu nó thì luồng bên cổng học viên không khớp với dữ liệu bên quản trị.
await db.query('UPDATE du_hoc_ho_so SET hs_gui_luc = ? WHERE id IN (?,?)',
  [gio(30, 20, 0), hoSoId['HS-2026-002'], hoSoId['HS-2026-003']]);
await db.query(
  `INSERT INTO du_hoc_yeu_cau_sua (ho_so_id, user_id, thay_doi, ly_do, trang_thai, created_at)
   VALUES (?,?,?,?,'cho',?)`,
  [hoSoId['HS-2026-002'], HOC_VIEN[10].id,
    JSON.stringify([
      { cot: 'phone', nhan: 'Số điện thoại', cu: '09101111', moi: '0912345999' },
      { cot: 'dia_chi', nhan: 'Địa chỉ thường trú', cu: '101 Nguyễn Trãi, Thanh Xuân, Hà Nội', moi: '45 Lê Duẩn, Hai Bà Trưng, Hà Nội' },
    ]),
    'Em vừa đổi số điện thoại và chuyển nhà.', gio(2, 19, 0)],
);
await db.query(
  `INSERT INTO du_hoc_yeu_cau_sua (ho_so_id, user_id, thay_doi, ly_do, trang_thai, nguoi_duyet_id, duyet_luc, phan_hoi, created_at)
   VALUES (?,?,?,?,'duyet',?,?,?,?)`,
  [hoSoId['HS-2026-003'], HOC_VIEN[6].id,
    JSON.stringify([
      { cot: 'lien_lac_khac', nhan: 'Liên lạc khác (Zalo/LINE…)', cu: null, moi: 'Zalo: 0903333111' },
    ]),
    'Em bổ sung Zalo để cô liên lạc.', ADMIN, gio(12, 9, 0), 'Đã cập nhật giúp em.', gio(14, 20, 0)],
);

console.log(`🛫 ${HO_SO.length} hồ sơ du học (đủ 9 bước) · ${GIAY_TO.length} mục giấy tờ mỗi hồ sơ · 6 thông báo · 2 yêu cầu sửa`);

// ------------------------------------------------------------------ 12. SỔ THU CHI

const DANH_MUC = [
  ['thu', 'Học phí'], ['thu', 'Phí dịch vụ du học'], ['thu', 'Tiền ký túc xá'],
  ['thu', 'Phí ghi danh'], ['thu', 'Bán giáo trình'], ['thu', 'Khác'],
  ['chi', 'Lương nhân viên'], ['chi', 'Thuê mặt bằng'], ['chi', 'Điện nước - Internet'],
  ['chi', 'Marketing - Quảng cáo'], ['chi', 'In ấn - Văn phòng phẩm'],
  ['chi', 'Công tác phí'], ['chi', 'Thuế - Phí'], ['chi', 'Khác'],
];
await chenNhieu('quy_danh_muc', ['org_id', 'loai', 'ten', 'sort_order'],
  DANH_MUC.map(([l, t], i) => [1, l, t, (i + 1) * 10]));
const [dmRows] = await db.query('SELECT id, ten FROM quy_danh_muc');
const dm = (ten) => (dmRows.find((x) => x.ten === ten) || {}).id || null;

// Rải 4 tháng để biểu đồ báo cáo có hình dạng thật, không phải một cột đơn độc.
const PHIEU = [
  ['thu', 118, 12000000, 'Học phí', 'Lớp A1 đợt 1', 'Học phí 6 học viên khoá A1', 'chuyen-khoan'],
  ['chi', 115, 18000000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng', 'chuyen-khoan'],
  ['chi', 113, 25000000, 'Lương nhân viên', 'Bảng lương', 'Lương 5 nhân viên', 'chuyen-khoan'],
  ['thu', 100, 15000000, 'Phí dịch vụ du học', 'Phụ huynh em Minh Anh', 'Đợt 1 phí hồ sơ', 'chuyen-khoan'],
  ['chi', 95, 4200000, 'Điện nước - Internet', 'EVN + FPT', 'Điện nước + mạng', 'chuyen-khoan'],
  ['thu', 90, 9500000, 'Học phí', 'Lớp A1 đợt 2', 'Học phí 5 học viên', 'tien-mat'],
  ['chi', 88, 18000000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng', 'chuyen-khoan'],
  ['chi', 85, 25000000, 'Lương nhân viên', 'Bảng lương', 'Lương 5 nhân viên', 'chuyen-khoan'],
  ['thu', 80, 3000000, 'Bán giáo trình', 'Học viên lớp A1', '10 bộ Thời Đại Q1', 'tien-mat'],
  ['thu', 72, 18000000, 'Tiền ký túc xá', 'Người ở cơ sở 1', 'Tiền phòng tháng', 'chuyen-khoan'],
  ['chi', 66, 6500000, 'Marketing - Quảng cáo', 'Facebook Ads', 'Chạy quảng cáo tuyển sinh', 'the'],
  ['chi', 60, 18000000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng', 'chuyen-khoan'],
  ['chi', 58, 25000000, 'Lương nhân viên', 'Bảng lương', 'Lương 5 nhân viên', 'chuyen-khoan'],
  ['thu', 55, 24000000, 'Phí dịch vụ du học', 'Phụ huynh em Thu Trang', 'Đợt 2 phí hồ sơ', 'chuyen-khoan'],
  ['chi', 50, 1800000, 'In ấn - Văn phòng phẩm', 'Cửa hàng Minh Châu', 'In tài liệu + văn phòng phẩm', 'tien-mat'],
  ['thu', 45, 8000000, 'Phí ghi danh', '4 học viên mới', 'Ghi danh khoá mới', 'tien-mat'],
  ['chi', 42, 3500000, 'Công tác phí', 'Chị Thu Hà', 'Đi Đài Bắc làm việc với trường đối tác', 'chuyen-khoan'],
  ['thu', 38, 18000000, 'Tiền ký túc xá', 'Người ở cơ sở 1 + 2', 'Tiền phòng tháng', 'chuyen-khoan'],
  ['chi', 32, 18000000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng', 'chuyen-khoan'],
  ['chi', 30, 25000000, 'Lương nhân viên', 'Bảng lương', 'Lương 5 nhân viên', 'chuyen-khoan'],
  ['thu', 28, 12000000, 'Học phí', 'Lớp B1', 'Học phí lớp B1', 'chuyen-khoan'],
  ['chi', 25, 2400000, 'Thuế - Phí', 'Chi cục Thuế', 'Thuế môn bài + phí ngân hàng', 'chuyen-khoan'],
  ['chi', 20, 5800000, 'Marketing - Quảng cáo', 'TikTok Ads', 'Chiến dịch tuyển sinh kỳ Xuân', 'the'],
  ['thu', 15, 6000000, 'Học phí', 'Trần Quốc Bảo', 'Học phí tháng này', 'chuyen-khoan'],
  ['thu', 10, 18000000, 'Tiền ký túc xá', 'Người ở cơ sở 1 + 2', 'Tiền phòng tháng', 'chuyen-khoan'],
  ['chi', 8, 4400000, 'Điện nước - Internet', 'EVN + FPT', 'Điện nước + mạng', 'chuyen-khoan'],
  ['chi', 5, 18000000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng', 'chuyen-khoan'],
  ['thu', 3, 5000000, 'Khác', 'Hoàn ứng công tác', 'Trả lại phần chưa dùng', 'tien-mat'],
  ['chi', 1, 1200000, 'In ấn - Văn phòng phẩm', 'Cửa hàng Minh Châu', 'Giấy in + mực', 'tien-mat'],
  ['thu', 0, 3000000, 'Phí ghi danh', '2 học viên mới', 'Ghi danh hôm nay', 'tien-mat'],
];
const demPhieu = { thu: 0, chi: 0 };
await chenNhieu('quy_phieu',
  ['org_id', 'ma_phieu', 'loai', 'ngay', 'so_tien', 'danh_muc_id', 'doi_tuong', 'hinh_thuc', 'dien_giai', 'nguoi_lap_id'],
  PHIEU.map(([loai, n, so, dmTen, doiTuong, dg, ht]) => {
    demPhieu[loai] += 1;
    const ma = `${loai === 'thu' ? 'PT' : 'PC'}-${String(demPhieu[loai]).padStart(4, '0')}`;
    return [1, ma, loai, ngay(n), so, dm(dmTen), doiTuong, ht, dg, ADMIN];
  }));

const [[quyTong]] = await db.query(
  "SELECT SUM(CASE WHEN loai='thu' THEN so_tien ELSE 0 END) thu, SUM(CASE WHEN loai='chi' THEN so_tien ELSE 0 END) chi FROM quy_phieu");
console.log(`💰 Sổ thu chi: ${PHIEU.length} phiếu · ${DANH_MUC.length} danh mục · thu ${tien(quyTong.thu)} / chi ${tien(quyTong.chi)}`);

// ------------------------------------------------------------------ 13. KÝ TÚC XÁ

const [toa1] = await db.query(
  'INSERT INTO ktx_toa (org_id, ten, dia_chi, ghi_chu, sort_order) VALUES (1,?,?,?,10)',
  ['Cơ sở 1 — Nguyễn Trãi', '145 Nguyễn Trãi, Thanh Xuân, Hà Nội', 'Gần trung tâm, đi bộ 5 phút']);
const [toa2] = await db.query(
  'INSERT INTO ktx_toa (org_id, ten, dia_chi, sort_order) VALUES (1,?,?,20)',
  ['Cơ sở 2 — Khuất Duy Tiến', '88 Khuất Duy Tiến, Hà Nội']);

const PHONG = [
  [toa1.insertId, 'P101', '1', 4, 'nam', 1500000, 'Điều hoà, nóng lạnh, wifi', 'dang-dung'],
  [toa1.insertId, 'P102', '1', 4, 'nu', 1500000, 'Điều hoà, nóng lạnh, wifi', 'dang-dung'],
  [toa1.insertId, 'P201', '2', 2, 'nu', 2200000, 'Điều hoà, ban công, wifi', 'dang-dung'],
  [toa1.insertId, 'P202', '2', 4, 'nam', 1500000, 'Điều hoà, wifi', 'bao-tri'],
  [toa1.insertId, 'P203', '2', 4, 'nu', 1500000, 'Điều hoà, wifi', 'dang-dung'],
  [toa2.insertId, 'A01', '1', 6, 'chung', 1200000, 'Quạt trần, wifi', 'dang-dung'],
  [toa2.insertId, 'A02', '1', 6, 'chung', 1200000, 'Quạt trần, wifi', 'dang-dung'],
  [toa2.insertId, 'A03', '2', 6, 'chung', 1200000, 'Quạt trần, wifi', 'dong'],
];
const phongId = [];
for (const p of PHONG) {
  const [r] = await db.query(
    'INSERT INTO ktx_phong (toa_id, ten_phong, tang, suc_chua, loai, gia_thang, tien_ich, trang_thai) VALUES (?,?,?,?,?,?,?,?)', p);
  phongId.push(r.insertId);
}

// Người ở: có em gắn hồ sơ du học, có em gắn tài khoản học, có người nhập tay hoàn toàn —
// khu ký túc xá KHÔNG bắt buộc người ở phải là học viên du học.
const NGUOI_O = [
  [phongId[0], 'HS-2026-005', 'hv04', 'Phạm Gia Huy', '0905111222', 150, 1500000],
  [phongId[0], null, null, 'Nguyễn Đức Long (học viên tiếng)', '0901111444', 90, 1500000],
  [phongId[0], null, 'hv10', 'Ngô Văn Kiên', '0901111555', 60, 1500000],
  [phongId[1], 'HS-2026-004', 'hv06', 'Đỗ Khánh Linh', '0902222111', 140, 1500000],
  [phongId[1], null, 'hv03', 'Lê Thị Hồng', '0902222333', 75, 1500000],
  [phongId[2], 'HS-2026-003', 'hv07', 'Đặng Thu Trang', '0903333111', 60, 2200000],
  [phongId[4], 'HS-2026-002', 'hv11', 'Lý Thanh Thảo', '0903333222', 45, 1500000],
  [phongId[5], null, null, 'Nguyễn Thu Trang (người ngoài)', '0904444111', 45, 1200000],
  [phongId[5], null, 'hv08', 'Bùi Anh Tuấn', '0904444222', 30, 1200000],
  [phongId[6], null, null, 'Trần Văn Nam (người ngoài)', '0904444333', 20, 1200000],
];
const oId = [];
for (const [pid, maHs, maHv, ten, dt, lui, gia] of NGUOI_O) {
  const hv = maHv ? HOC_VIEN.find((x) => x.ma === maHv) : null;
  const [r] = await db.query(
    'INSERT INTO ktx_o (phong_id, ho_so_id, user_id, ho_ten, phone, ngay_vao, gia_thang, tien_coc) VALUES (?,?,?,?,?,?,?,?)',
    [pid, maHs ? hoSoId[maHs] : null, hv ? hv.id : null, ten, dt, ngay(lui), gia, gia]);
  oId.push({ id: r.insertId, gia, lui });
}

// Thu 3 kỳ gần nhất. CỐ Ý để 2 người chưa đóng kỳ này -> bảng công nợ có ô đỏ thật.
const thuKtx = [];
for (const [i, o] of oId.entries()) {
  for (let k = 2; k >= 0; k--) {
    if (k === 0 && (i === 1 || i === 7)) continue;
    if (o.lui < k * 30) continue;
    thuKtx.push([o.id, ky(k), 'tien-phong', o.gia, ngay(k * 30 - 3), k % 2 ? 'chuyen-khoan' : 'tien-mat', ADMIN, null]);
  }
  thuKtx.push([o.id, ky(2), 'coc', o.gia, ngay(o.lui), 'tien-mat', ADMIN, 'Tiền cọc khi nhận phòng']);
  if (i % 3 === 0) {
    thuKtx.push([o.id, ky(0), 'dien-nuoc', soTu(150, 400) * 1000, ngay(5), 'tien-mat', ADMIN, 'Điện nước kỳ này']);
  }
}
await chenNhieu('ktx_thu_tien',
  ['o_id', 'ky', 'loai', 'so_tien', 'ngay_thu', 'hinh_thuc', 'nguoi_thu_id', 'ghi_chu'], thuKtx);

console.log(`🛏  Ký túc xá: 2 toà · ${PHONG.length} phòng · ${NGUOI_O.length} người ở · ${thuKtx.length} phiếu thu (2 người còn nợ kỳ này)`);

// ------------------------------------------------------------------ 14. THIẾT BỊ ĐĂNG NHẬP

const MAY = [
  ['Chrome trên Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/141.0 Safari/537.36'],
  ['Safari trên iPhone', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) Safari/605.1.15'],
  ['Chrome trên Android', 'Mozilla/5.0 (Linux; Android 15; SM-S928B) Chrome/141.0 Mobile Safari/537.36'],
  ['Safari trên macOS', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15'],
  ['Edge trên Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edg/141.0'],
];
// ⚠️ Mỗi học viên chỉ được 2 thiết bị (TRAN_THIET_BI trong server/utils/thiet-bi.js). Trình duyệt
// của người đang thử tính là MỘT thiết bị, nên seed chỉ cấp sẵn 1 máy cho mỗi em — cấp 2 là đăng
// nhập bằng trình duyệt thật lập tức 403 "đã đăng nhập trên 2 thiết bị" và không vào nổi tài khoản
// nào. Ngoại lệ CỐ Ý: em hv10 giữ đủ 2 máy đang dùng để thử chính màn hình bị chặn và thao tác
// "gỡ thiết bị" bên quản trị. Quản trị và giáo viên được miễn trừ (MIEN_TRU) nên không bị ảnh hưởng.
const thietBi = [];
for (const [i, h] of HOC_VIEN.entries()) {
  const so = h.ma === 'hv10' ? 3 : 1;   // hv10: 2 máy đang dùng + 1 máy đã bị gỡ
  for (let k = 0; k < so; k++) {
    const [ten, ua] = MAY[(i + k) % MAY.length];
    thietBi.push([
      h.id, `dev-${h.ma}-${k + 1}`, ten, ua,
      `192.168.1.${10 + i}`, `113.161.${i}.${20 + k}`,
      gio(soTu(30, 110), 19, 0), gio(soTu(0, 3), 20, 30), soTu(5, 90),
      // Em hv10 đã bị gỡ bớt 1 máy — để thấy cả trạng thái "đã gỡ".
      h.ma === 'hv10' && k === 2 ? 1 : 0,
      h.ma === 'hv10' && k === 2 ? gio(1, 9, 0) : null,
      h.ma === 'hv10' && k === 2 ? ADMIN : null,
    ]);
  }
}
await chenNhieu('user_devices',
  ['user_id', 'device_id', 'ten', 'user_agent', 'ip_lan_dau', 'ip_lan_cuoi', 'lan_dau', 'lan_cuoi',
    'so_lan', 'da_go', 'go_luc', 'go_boi'], thietBi);

const hv10 = HOC_VIEN.find((x) => x.ma === 'hv10');
const hv02 = HOC_VIEN.find((x) => x.ma === 'hv02');
await chenNhieu('device_alerts',
  ['user_id', 'device_id', 'ten', 'user_agent', 'ip', 'so_dang_co', 'tao_luc', 'da_xu_ly', 'xu_ly_boi', 'xu_ly_luc'],
  [
    [hv10.id, 'dev-hv10-4', 'Chrome trên Windows', MAY[0][1], '113.161.10.99', 2, gio(0, 19, 40), 0, null, null],
    [hv10.id, 'dev-hv10-5', 'Safari trên iPhone', MAY[1][1], '113.161.10.98', 2, gio(2, 21, 10), 0, null, null],
    [hv02.id, 'dev-hv02-3', 'Chrome trên Android', MAY[2][1], '113.161.2.77', 2, gio(9, 20, 5), 1, ADMIN, gio(8, 9, 0)],
  ]);

console.log(`📱 ${thietBi.length} thiết bị đăng nhập · 3 cảnh báo chặn (2 đang chờ xử lý)`);

// ------------------------------------------------------------------ TỔNG KẾT

const [[tk]] = await db.query(`
  SELECT (SELECT COUNT(*) FROM users) users,
         (SELECT COUNT(*) FROM classes) lop,
         (SELECT COUNT(*) FROM class_sessions) buoi,
         (SELECT COUNT(*) FROM class_attendance) diemdanh,
         (SELECT COUNT(*) FROM assignments) baigiao,
         (SELECT COUNT(*) FROM exercise_results) baitap,
         (SELECT COUNT(*) FROM exam_questions) cauthi,
         (SELECT COUNT(*) FROM exam_results) luotthi,
         (SELECT COUNT(*) FROM srs_words) the,
         (SELECT COUNT(*) FROM notebook_words) sotay,
         (SELECT COUNT(*) FROM study_activity) nhip,
         (SELECT COUNT(*) FROM de_bai) de,
         (SELECT COUNT(*) FROM de_bai_lam) bailam,
         (SELECT COUNT(*) FROM du_hoc_ho_so) hoso,
         (SELECT COUNT(*) FROM quy_phieu) phieu,
         (SELECT COUNT(*) FROM ktx_o) nguoio,
         (SELECT COUNT(*) FROM user_devices) thietbi`);

console.log('\n══════════════════════════════════════════════════════════');
console.log('  DỮ LIỆU THỬ ĐÃ SẴN SÀNG');
console.log('══════════════════════════════════════════════════════════');
console.log(`  Tài khoản  : ${tk.users}  ·  Lớp: ${tk.lop}  ·  Buổi học: ${tk.buoi}  ·  Điểm danh: ${tk.diemdanh}`);
console.log(`  Học tập    : ${tk.baigiao} bài giao · ${tk.baitap} lượt nộp · ${tk.the} thẻ ôn · ${tk.sotay} từ sổ tay`);
console.log(`  Thi thử    : ${tk.cauthi} câu trong ngân hàng · ${tk.luotthi} lượt thi`);
console.log(`  Đề tự soạn : ${tk.de} đề · ${tk.bailam} bài làm`);
console.log(`  Trung tâm  : ${tk.hoso} hồ sơ du học · ${tk.phieu} phiếu thu chi · ${tk.nguoio} người ở KTX · ${tk.thietbi} thiết bị`);
console.log(`  Nhịp học   : ${tk.nhip} bản ghi (120 ngày)`);
console.log('──────────────────────────────────────────────────────────');
console.log(`  MẬT KHẨU CHUNG cho mọi tài khoản: ${MAT_KHAU}`);
console.log('──────────────────────────────────────────────────────────');
console.log('  admin@itaiwan.vn     Quản trị viên ITaiwan      (toàn quyền)');
console.log('  gv.lan@itaiwan.vn    Cô Nguyễn Thị Lan          (giáo viên, phụ trách cả 2 lớp)');
for (const h of HOC_VIEN) {
  console.log(`  ${(h.ma + '@itaiwan.vn').padEnd(20)} ${h.ten.padEnd(26)} ${h.net}`);
}
for (const [ten, mail] of CHO_DUYET) {
  console.log(`  ${mail.padEnd(20)} ${ten.padEnd(26)} CHỜ DUYỆT — thử hàng chờ ở Quản trị > Học viên`);
}
console.log('══════════════════════════════════════════════════════════\n');

await db.end();
