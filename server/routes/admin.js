// Admin Routes - Full CRUD for all data management
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { loadRole, requireStaff, requireAdminOnly, requireHoSoStaff, phamViQuanTri } from '../middleware/roles.js';
import { sendWelcomeEmail, sendAssignmentReminderEmail, isEmailConfigured, emailStatus } from '../utils/email.js';
import { toLimit, toPage } from '../utils/num.js';
import { dsThietBi, goThietBi, TRAN_THIET_BI } from '../utils/thiet-bi.js';

// Mật khẩu mặc định khi admin tạo tài khoản học viên mới từ trang Quản lý lớp
// (học viên nên đổi lại sau khi đăng nhập lần đầu, ở trang Tài khoản > Thông tin cá nhân).
const DEFAULT_STUDENT_PASSWORD = 'tentaiwan68';

const router = Router();

// Phân quyền: admin toàn quyền, giáo viên chỉ thao tác trong lớp mình phụ trách.
// Toàn bộ luật nằm ở server/middleware/roles.js — teacherScope CHẶN MẶC ĐỊNH với giáo viên,
// route nào cho phép phải khai báo tường minh ở đó. Thêm route mới cho giáo viên mà quên khai
// báo thì bị 403 (phiền nhưng an toàn), chứ không phải vô tình mở toang.
router.use(requireAuth, loadRole, requireStaff, phamViQuanTri);

// Lớp bảo vệ THỨ HAI cho các khu chỉ dành cho admin. teacherScope ở trên vốn đã chặn (mặc định
// cấm), nhưng những khu này mà lọt thì hậu quả nặng — sửa từ vựng cả hệ thống, xoá tài khoản
// người khác — nên chặn thêm một lần nữa ngay tại tiền tố đường dẫn.
// '/users-unassigned' CỐ Ý không nằm đây: quản trị trung tâm cần nó để thêm học viên vào lớp
// (nút "Thêm học viên" của họ 403 sạch trước 2026-09-13). Nó được khai riêng trong QUYEN và TỰ
// lọc theo `req.orgId` ngay bên dưới — mở mà quên lọc thì trung tâm này dò ra học viên trung tâm kia.
for (const khu of ['/vocabulary', '/exam-questions',
  '/dialogues', '/dialogue-lines', '/blog', '/reorder', '/swap', '/seed']) {
  router.use(khu, requireAdminOnly);
}
// Ba khu dưới đây mở thêm cho quản lý hồ sơ và sale (2026-09-22). Vẫn là lưới thứ hai: bảng
// QUYEN phân xử từng route, và mỗi route TỰ lọc dữ liệu theo `req.nhanSuId` — sale vào được
// '/users' nhưng chỉ đọc được tài khoản do chính mình tạo.
for (const khu of ['/users', '/pending-count', '/tong-quan']) {
  router.use(khu, requireHoSoStaff);
}

// Giáo viên đang gọi thì trả về id của họ, admin thì null. Dùng để lọc dữ liệu theo lớp phụ trách.
const gvId = (req) => (req.role === 'teacher' ? req.userId : null);

/**
 * Mảnh SQL giới hạn PHẠM VI của người đang gọi, dùng cho mọi truy vấn có JOIN tới `classes`.
 * Gộp HAI tầng lọc vào một chỗ (2026-09-09, mô hình cho trung tâm thuê):
 *   • tổ chức  — mọi vai trò trừ admin NỀN TẢNG chỉ thấy lớp của tổ chức mình
 *   • giáo viên — thêm một nấc nữa: đúng lớp mình phụ trách
 *
 * ⚠️ Cố ý GỘP thay vì để hai helper riêng: 6 truy vấn trong /stats vốn chỉ gọi `locGv`, nếu lọc
 * tổ chức là một helper tách rời thì mỗi truy vấn mới lại là một cơ hội quên — mà quên ở đây
 * nghĩa là trung tâm này đọc được số liệu của trung tâm kia, im lặng, không lỗi nào hiện ra.
 * Thứ tự tham số: TỔ CHỨC trước, GIÁO VIÊN sau — `thamSoPhamVi` phải khớp đúng thứ tự này.
 */
const locPhamVi = (req, cot = 'c.teacher_id', cotOrg = 'c.org_id') =>
  (req.locOrg ? ` AND ${cotOrg} = ?` : '') + (gvId(req) ? ` AND ${cot} = ?` : '');
const thamSoPhamVi = (req) => [
  ...(req.locOrg ? [req.orgId] : []),
  ...(gvId(req) ? [gvId(req)] : []),
];
const thamSoOrg = (req) => (req.locOrg ? [req.orgId] : []);
/**
 * Tham số cho mảnh `trongLop` bên dưới — mảnh đó chỉ sinh MỘT placeholder (id giáo viên HOẶC id
 * tổ chức), khác `locPhamVi` có thể sinh hai. Dùng nhầm `thamSoPhamVi` ở đây thì với tài khoản
 * giáo viên, placeholder teacher_id sẽ nhận đúng... id tổ chức — lọc ra lớp của người khác mà
 * truy vấn vẫn chạy trơn tru, không lỗi nào hiện ra.
 */
const thamSoTrongLop = (req) => (gvId(req) ? [gvId(req)] : thamSoOrg(req));

// =============================================
// DASHBOARD STATS
// =============================================
// Dashboard cho GIÁO VIÊN (2026-08-25 làm lại): trước đây chỉ đếm số bản ghi nội dung
// (từ vựng/câu hỏi thi/blog...) — đúng nhưng không giúp gì cho việc dạy hằng ngày.
// Giờ trả về những thứ giáo viên cần hành động ngay: buổi học chưa điểm danh, học viên cần chú ý,
// bài tập vừa nộp. Phần đếm nội dung vẫn giữ nhưng đẩy xuống nhóm phụ.
//
// QUAN TRỌNG: các truy vấn liên quan tới lớp học được bọc try/catch riêng và trả cờ `classTablesReady`
// — nếu DB production chưa chạy migration (chưa có class_sessions/class_attendance) thì dashboard vẫn
// hiện bình thường kèm cảnh báo, thay vì 500 làm hỏng cả trang admin.
router.get('/stats', async (req, res) => {
  try {
    // Sale / quản lý hồ sơ: bản rút gọn, chỉ đếm những gì thuộc về họ. Các con số còn lại của
    // route này (tổng người dùng, lượt thi, người mới nhất của cả trung tâm) vừa không phải
    // việc của họ, vừa để lộ quy mô hệ thống và danh tính học viên của đồng nghiệp.
    if (req.nhanSuId) {
      const [[u]] = await pool.query(
        'SELECT COUNT(*) AS so FROM users WHERE created_by = ?', [req.nhanSuId]);
      let hoSo = 0;
      let choDuyet = 0;
      try {
        const [[h]] = await pool.query(
          "SELECT COUNT(*) AS so FROM du_hoc_ho_so WHERE tu_van_id = ? AND buoc NOT IN ('huy','hoan-thanh')",
          [req.nhanSuId]);
        hoSo = h.so;
      } catch (e) { console.warn('stats: bỏ qua hồ sơ du học —', e.code || e.message); }
      const [[d]] = await pool.query(
        'SELECT COUNT(*) AS so FROM users WHERE created_by = ? AND is_verified = 1 AND is_approved = 0',
        [req.nhanSuId]);
      choDuyet = d.so;
      return res.json({
        userCount: u.so, hoSoDangChay: hoSo, choDuyet,
        examResultCount: 0, activeToday: 0, recentUsers: [], recentSubmissions: [],
        exercise7d: { count: 0, avg_score: null, students: 0 },
      });
    }

    // Số người dùng phải theo TỔ CHỨC: quản trị trung tâm nhìn thấy tổng của cả nền tảng thì
    // vừa lộ quy mô hệ thống vừa là con số vô nghĩa với họ.
    const dkOrg = req.locOrg ? ' WHERE org_id = ?' : '';
    const tsOrg = thamSoOrg(req);
    const [[{ userCount }]] = await pool.query(`SELECT COUNT(*) as userCount FROM users${dkOrg}`, tsOrg);
    const [[{ examResultCount }]] = await pool.query('SELECT COUNT(*) as examResultCount FROM exam_results');
    const [[{ activeToday }]] = await pool.query(
      `SELECT COUNT(*) as activeToday FROM users WHERE last_active = CURDATE()${req.locOrg ? ' AND org_id = ?' : ''}`, tsOrg);
    // Danh sách người mới: giáo viên không được thấy; quản trị trung tâm chỉ thấy người của mình.
    const [recentUsers] = gvId(req)
      ? [[]]
      : await pool.query(
          `SELECT id, name, email, created_at FROM users${dkOrg} ORDER BY created_at DESC LIMIT 5`, tsOrg);

    // --- Bài tập (không phụ thuộc bảng lớp) ---
    let exercise7d = { count: 0, avg_score: null, students: 0 };
    let recentSubmissions = [];
    try {
      // Giáo viên chỉ được tính/xem bài của học viên trong lớp mình.
      // Giáo viên: chỉ học viên trong lớp mình. Quản trị trung tâm: chỉ người của tổ chức mình
      // (lọc thẳng theo users.org_id chứ không qua lớp — học viên chưa xếp lớp vẫn là người của
      // trung tâm đó, bỏ sót họ thì số liệu thiếu mà không ai biết vì sao).
      const trongLop = gvId(req)
        ? ' AND EXISTS (SELECT 1 FROM class_enrollments ce JOIN classes c ON c.id = ce.class_id WHERE ce.user_id = er.user_id AND c.teacher_id = ?)'
        : (req.locOrg ? ' AND EXISTS (SELECT 1 FROM users uo WHERE uo.id = er.user_id AND uo.org_id = ?)' : '');
      const [[ex]] = await pool.query(`
        SELECT COUNT(*) AS count, ROUND(AVG(er.score_percent)) AS avg_score, COUNT(DISTINCT er.user_id) AS students
        FROM exercise_results er WHERE er.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)${trongLop}
      `, thamSoTrongLop(req));
      exercise7d = ex;
      const [subs] = await pool.query(`
        SELECT er.id, er.lesson_id, er.score_percent, er.correct_answers, er.total_questions, er.created_at,
               u.id AS user_id, u.name AS user_name
        FROM exercise_results er JOIN users u ON u.id = er.user_id
        WHERE 1 = 1${trongLop}
        ORDER BY er.created_at DESC LIMIT 8
      `, thamSoTrongLop(req));
      recentSubmissions = subs;
    } catch (e) {
      console.warn('Stats: bỏ qua phần bài tập —', e.code || e.message);
    }

    // --- Lớp học / điểm danh (cần migration) ---
    let classTablesReady = true;
    let classCount = 0, studentCount = 0, sessionCount = 0;
    let pendingAttendance = [], attentionStudents = [];
    let pendingAssignments = [], assignmentsReady = true;
    try {
      const [[c]] = await pool.query(
        `SELECT COUNT(*) AS n FROM classes c WHERE c.is_active = 1${locPhamVi(req)}`, thamSoPhamVi(req));
      classCount = c.n;
      const [[s]] = await pool.query(
        `SELECT COUNT(DISTINCT ce.user_id) AS n FROM class_enrollments ce
           JOIN classes c ON c.id = ce.class_id WHERE 1 = 1${locPhamVi(req)}`, thamSoPhamVi(req));
      studentCount = s.n;
      const [[ss]] = await pool.query(
        `SELECT COUNT(*) AS n FROM class_sessions cs
           JOIN classes c ON c.id = cs.class_id WHERE 1 = 1${locPhamVi(req)}`, thamSoPhamVi(req));
      sessionCount = ss.n;

      // Buổi học đã tới ngày nhưng chưa điểm danh đủ sĩ số -> việc cần làm ngay của giáo viên
      // Dùng bảng dẫn xuất thay vì HAVING (query này không có GROUP BY, HAVING dễ gây hiểu nhầm/khác
      // biệt giữa các phiên bản MySQL) — lọc marked < roster ở ngoài cho rõ ràng và chắc chắn đúng.
      const [pend] = await pool.query(`
        SELECT * FROM (
          SELECT cs.id, cs.session_date, cs.topic, c.id AS class_id, c.name AS class_name,
            (SELECT COUNT(*) FROM class_attendance ca WHERE ca.session_id = cs.id) AS marked,
            (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = cs.class_id) AS roster
          FROM class_sessions cs
          JOIN classes c ON c.id = cs.class_id
          WHERE cs.session_date <= CURDATE()${locPhamVi(req)}
        ) t
        WHERE t.roster > 0 AND t.marked < t.roster
        ORDER BY t.session_date DESC
        LIMIT 6
      `, thamSoPhamVi(req));
      pendingAttendance = pend;

      // Học viên cần chú ý: vắng >= 2 buổi, hoặc điểm trung bình < 50, hoặc chưa làm bài nào
      const [att] = await pool.query(`
        SELECT u.id, u.name, c.id AS class_id, c.name AS class_name,
          COALESCE(SUM(ca.status = 'absent'), 0) AS absent_count,
          COALESCE(SUM(ca.is_late), 0) AS late_count,
          (SELECT COUNT(*) FROM exercise_results er WHERE er.user_id = u.id) AS ex_count,
          (SELECT ROUND(AVG(er.score_percent)) FROM exercise_results er WHERE er.user_id = u.id) AS avg_score
        FROM class_enrollments ce
        JOIN users u ON u.id = ce.user_id
        JOIN classes c ON c.id = ce.class_id
        LEFT JOIN class_sessions cs ON cs.class_id = ce.class_id
        LEFT JOIN class_attendance ca ON ca.session_id = cs.id AND ca.user_id = u.id
        WHERE 1 = 1${locPhamVi(req)}
        GROUP BY u.id, c.id
        HAVING absent_count >= 2 OR ex_count = 0 OR (ex_count > 0 AND avg_score < 50)
        ORDER BY absent_count DESC, avg_score ASC
        LIMIT 6
      `, thamSoPhamVi(req));
      attentionStudents = att;

      // Bài đã giao còn em chưa nộp — "việc cần theo" rõ ràng nhất của giáo viên.
      // Bọc try riêng vì bảng assignments có migration riêng, chưa chạy thì phần còn lại vẫn chạy.
      try {
        // 2026-08-27: điều kiện "còn em chưa nộp" phải nằm TRONG SQL. Bản trước LIMIT 20 rồi mới
        // lọc bằng JS — dạy hết học kỳ (33 bài x nhiều lớp) thì 20 slot đầu toàn bài cũ đã nộp đủ,
        // dashboard báo "không còn việc" trong khi bài mới vẫn còn người thiếu.
        const [asg] = await pool.query(`
          SELECT * FROM (
            SELECT a.id, a.lesson_id, a.title, a.due_date, c.id AS class_id, c.name AS class_name,
              (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = a.class_id) AS total_students,
              (SELECT COUNT(*) FROM class_enrollments ce JOIN users u ON u.id = ce.user_id
                WHERE ce.class_id = a.class_id
                  AND EXISTS (SELECT 1 FROM exercise_results er WHERE er.user_id = u.id AND er.lesson_id = a.lesson_id)
              ) AS submitted_count
            FROM assignments a
            JOIN classes c ON c.id = a.class_id
            WHERE 1 = 1${locPhamVi(req)}
          ) x
          WHERE x.total_students > 0 AND x.submitted_count < x.total_students
          ORDER BY (x.due_date IS NULL), x.due_date ASC
          LIMIT 6
        `, thamSoPhamVi(req));
        pendingAssignments = asg;
      } catch (e2) {
        console.warn('Stats: bảng assignments chưa sẵn sàng —', e2.code || e2.message);
        assignmentsReady = false;
      }
    } catch (e) {
      // ER_NO_SUCH_TABLE = chưa chạy migration-classes-attendance.sql trên DB này
      classTablesReady = false;
      console.warn('Stats: bảng lớp học chưa sẵn sàng —', e.code || e.message);
    }

    res.json({
      // Nhóm dạy & học
      classCount, studentCount, sessionCount, activeToday,
      exercise7d, recentSubmissions, pendingAttendance, attentionStudents,
      pendingAssignments, assignmentsReady,
      classTablesReady,
      // Nhóm nội dung (phụ)
      users: userCount,
      examResults: examResultCount,
      recentUsers,
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Lỗi tải thống kê.' });
  }
});

// =============================================
// TỔNG QUAN CỦA QUẢN TRỊ  (/admin/tong-quan)
// =============================================
// Khác hẳn /stats vốn viết cho GIÁO VIÊN (buổi chưa điểm danh, bài chưa nộp, bài vừa nộp —
// việc của người đứng lớp). Người quản trị cần trả lời ba câu khác:
//   1. Hôm nay / tuần này / tháng này trung tâm thu được bao nhiêu, chi bao nhiêu?
//   2. Tiền vào ra ở những mục nào?
//   3. Đang có việc gì kẹt không?
// Nên route này trả về TIỀN + TÌNH TRẠNG LỚP (gọn) + ĐẾM CẢNH BÁO, không trả danh sách chi tiết.
//
// Nguồn tiền của bản này nằm ở BA bảng rời nhau và KHÔNG tự cộng vào nhau:
//   • quy_phieu       — sổ thu chi tổng của trung tâm, là thứ duy nhất có cả THU và CHI
//   • du_hoc_thu_tien — tiền theo từng hồ sơ du học
//   • ktx_thu_tien    — tiền phòng ký túc xá
// Biểu đồ lãi/lỗ chỉ lấy `quy_phieu`; hai nguồn kia hiện riêng. Cộng gộp cả ba là RỦI RO
// đếm hai lần — trung tâm nào có thói quen ghi lại khoản du học vào sổ quỹ thì con số phồng
// gấp đôi mà không ai nhận ra. Muốn gộp thì phải có cờ đánh dấu "đã vào sổ quỹ" trước đã.
//
// Mỗi khối bọc try/catch riêng: bảng quỹ / ký túc xá / du học đều đến từ migration riêng, DB
// nào chưa chạy thì khối đó trả rỗng chứ không làm hỏng cả trang.
router.get('/tong-quan', async (req, res) => {
  // Sale / quản lý hồ sơ nhìn CÙNG một màn hình nhưng chỉ thấy số của mình, và không thấy khối
  // lớp học (không phải việc của họ). `ns` là id để lọc, null với quản trị.
  const ns = req.nhanSuId;
  const tsNs = ns ? [ns] : [];
  const locQuy = ns ? ' AND nguoi_lap_id = ?' : '';
  const locQuyP = ns ? ' AND p.nguoi_lap_id = ?' : '';
  const locHoSo = ns ? ' AND h.tu_van_id = ?' : '';
  const joinKtxHoSo = ns ? 'JOIN du_hoc_ho_so hs ON hs.id = o.ho_so_id' : '';
  const locKtx = ns ? ' AND hs.tu_van_id = ?' : '';

  const rong = { thu: 0, chi: 0 };
  const kq = {
    tien: { ky: { hom_nay: { ...rong }, tuan: { ...rong }, thang: { ...rong }, thang_truoc: { ...rong } },
      theo_thang: [], thu_theo_dm: [], chi_theo_dm: [], co_bang: true },
    nguon_khac: { du_hoc_da_thu: 0, du_hoc_con_phai_thu: 0, ktx_thang_nay: 0, ktx_no_nguoi: 0 },
    lop: [],
    canh_bao: {},
  };

  // ---------- TIỀN: sổ thu chi ----------
  try {
    const [[k]] = await pool.query(`
      SELECT
        SUM(CASE WHEN ngay = CURDATE() AND loai='thu' THEN so_tien ELSE 0 END) AS hom_nay_thu,
        SUM(CASE WHEN ngay = CURDATE() AND loai='chi' THEN so_tien ELSE 0 END) AS hom_nay_chi,
        SUM(CASE WHEN ngay >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND loai='thu' THEN so_tien ELSE 0 END) AS tuan_thu,
        SUM(CASE WHEN ngay >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND loai='chi' THEN so_tien ELSE 0 END) AS tuan_chi,
        SUM(CASE WHEN ngay >= DATE_FORMAT(CURDATE(), '%Y-%m-01') AND loai='thu' THEN so_tien ELSE 0 END) AS thang_thu,
        SUM(CASE WHEN ngay >= DATE_FORMAT(CURDATE(), '%Y-%m-01') AND loai='chi' THEN so_tien ELSE 0 END) AS thang_chi,
        SUM(CASE WHEN ngay >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
                  AND ngay <  DATE_FORMAT(CURDATE(), '%Y-%m-01') AND loai='thu' THEN so_tien ELSE 0 END) AS truoc_thu,
        SUM(CASE WHEN ngay >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
                  AND ngay <  DATE_FORMAT(CURDATE(), '%Y-%m-01') AND loai='chi' THEN so_tien ELSE 0 END) AS truoc_chi
      FROM quy_phieu WHERE org_id = ?${locQuy}`, [req.orgId, ...tsNs]);
    kq.tien.ky = {
      hom_nay: { thu: +k.hom_nay_thu || 0, chi: +k.hom_nay_chi || 0 },
      tuan: { thu: +k.tuan_thu || 0, chi: +k.tuan_chi || 0 },
      thang: { thu: +k.thang_thu || 0, chi: +k.thang_chi || 0 },
      thang_truoc: { thu: +k.truoc_thu || 0, chi: +k.truoc_chi || 0 },
    };

    // 8 kỳ gần nhất, kể cả kỳ KHÔNG có phiếu nào: sinh dãy tháng ở JS rồi ghép, vì GROUP BY chỉ
    // trả về tháng có dữ liệu — để nguyên thì biểu đồ nhảy cóc, tháng trống biến mất im lặng.
    const [rows] = await pool.query(`
      SELECT DATE_FORMAT(ngay, '%Y-%m') AS ky,
             SUM(CASE WHEN loai='thu' THEN so_tien ELSE 0 END) AS thu,
             SUM(CASE WHEN loai='chi' THEN so_tien ELSE 0 END) AS chi
        FROM quy_phieu
       WHERE org_id = ? AND ngay >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 7 MONTH)${locQuy}
       GROUP BY ky ORDER BY ky`, [req.orgId, ...tsNs]);
    const theoKy = Object.fromEntries(rows.map((r) => [r.ky, r]));
    const nay = new Date();
    for (let i = 7; i >= 0; i--) {
      const d = new Date(nay.getFullYear(), nay.getMonth() - i, 1);
      const ky = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      kq.tien.theo_thang.push({ ky, thu: +(theoKy[ky]?.thu || 0), chi: +(theoKy[ky]?.chi || 0) });
    }

    const [dm] = await pool.query(`
      SELECT p.loai, COALESCE(d.ten, 'Chưa phân loại') AS ten, SUM(p.so_tien) AS tien
        FROM quy_phieu p LEFT JOIN quy_danh_muc d ON d.id = p.danh_muc_id
       WHERE p.org_id = ? AND p.ngay >= DATE_FORMAT(CURDATE(), '%Y-%m-01')${locQuyP}
       GROUP BY p.loai, ten ORDER BY tien DESC`, [req.orgId, ...tsNs]);
    kq.tien.thu_theo_dm = dm.filter((r) => r.loai === 'thu').slice(0, 6).map((r) => ({ ten: r.ten, tien: +r.tien }));
    kq.tien.chi_theo_dm = dm.filter((r) => r.loai === 'chi').slice(0, 6).map((r) => ({ ten: r.ten, tien: +r.tien }));
  } catch (e) {
    kq.tien.co_bang = false;
    console.warn('Tổng quan: bỏ qua sổ thu chi —', e.code || e.message);
  }

  // ---------- TIỀN: hai nguồn thu riêng ----------
  try {
    const [[t]] = await pool.query(`
      SELECT COALESCE(SUM(CASE WHEN tt.loai='hoan' THEN -tt.so_tien ELSE tt.so_tien END), 0) AS da_thu
        FROM du_hoc_thu_tien tt JOIN du_hoc_ho_so h ON h.id = tt.ho_so_id
       WHERE h.org_id = ?${locHoSo}`, [req.orgId, ...tsNs]);
    // Còn phải thu chỉ tính hồ sơ ĐANG CHẠY: hồ sơ đã huỷ / tạm dừng không còn là khoản phải đòi.
    const [[n]] = await pool.query(`
      SELECT COALESCE(SUM(GREATEST(h.tong_phi - COALESCE((
               SELECT SUM(CASE WHEN tt.loai='hoan' THEN -tt.so_tien ELSE tt.so_tien END)
                 FROM du_hoc_thu_tien tt WHERE tt.ho_so_id = h.id), 0), 0)), 0) AS con
        FROM du_hoc_ho_so h
       WHERE h.org_id = ? AND h.buoc NOT IN ('huy', 'tam-dung', 'hoan-thanh')${locHoSo}`, [req.orgId, ...tsNs]);
    kq.nguon_khac.du_hoc_da_thu = +t.da_thu || 0;
    kq.nguon_khac.du_hoc_con_phai_thu = +n.con || 0;
  } catch (e) { console.warn('Tổng quan: bỏ qua du học —', e.code || e.message); }

  try {
    const [[t]] = await pool.query(`
      SELECT COALESCE(SUM(th.so_tien), 0) AS tien
        FROM ktx_thu_tien th JOIN ktx_o o ON o.id = th.o_id
        JOIN ktx_phong p ON p.id = o.phong_id JOIN ktx_toa toa ON toa.id = p.toa_id
        ${joinKtxHoSo}
       WHERE toa.org_id = ? AND th.ky = DATE_FORMAT(CURDATE(), '%Y-%m')${locKtx}`, [req.orgId, ...tsNs]);
    const [[n]] = await pool.query(`
      SELECT COUNT(*) AS so FROM ktx_o o
        JOIN ktx_phong p ON p.id = o.phong_id JOIN ktx_toa toa ON toa.id = p.toa_id
        ${joinKtxHoSo}
       WHERE toa.org_id = ? AND o.trang_thai = 'dang-o'${locKtx}
         AND NOT EXISTS (SELECT 1 FROM ktx_thu_tien th
                          WHERE th.o_id = o.id AND th.loai = 'tien-phong'
                            AND th.ky = DATE_FORMAT(CURDATE(), '%Y-%m'))`, [req.orgId, ...tsNs]);
    kq.nguon_khac.ktx_thang_nay = +t.tien || 0;
    kq.nguon_khac.ktx_no_nguoi = +n.so || 0;
  } catch (e) { console.warn('Tổng quan: bỏ qua ký túc xá —', e.code || e.message); }

  // ---------- TÌNH TRẠNG LỚP ----------
  // Sale / quản lý hồ sơ không dính dáng tới lớp học: bỏ hẳn khối này thay vì trả bảng rỗng,
  // để giao diện của họ không có một ô trống không bao giờ có dữ liệu.
  if (!ns) try {
    const [lop] = await pool.query(`
      SELECT c.id, c.name, u.name AS teacher_name,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = c.id) AS si_so,
        (SELECT COUNT(*) FROM class_sessions cs
          WHERE cs.class_id = c.id AND cs.session_date <= CURDATE()) AS buoi,
        (SELECT ROUND(100 * AVG(ca.status = 'present')) FROM class_attendance ca
           JOIN class_sessions cs ON cs.id = ca.session_id WHERE cs.class_id = c.id) AS chuyen_can,
        (SELECT ROUND(AVG(er.score_percent)) FROM exercise_results er
           JOIN class_enrollments ce ON ce.user_id = er.user_id
          WHERE ce.class_id = c.id AND er.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS diem_tb,
        (SELECT COUNT(*) FROM assignments a JOIN class_enrollments ce ON ce.class_id = a.class_id
          WHERE a.class_id = c.id
            AND NOT EXISTS (SELECT 1 FROM exercise_results er
                             WHERE er.user_id = ce.user_id AND er.lesson_id = a.lesson_id)) AS chua_nop
      FROM classes c LEFT JOIN users u ON u.id = c.teacher_id
      WHERE c.is_active = 1 AND c.org_id = ?
      ORDER BY c.name`, [req.orgId]);
    kq.lop = lop;
  } catch (e) { console.warn('Tổng quan: bỏ qua lớp —', e.code || e.message); }

  // ---------- CẢNH BÁO: chỉ ĐẾM, bấm vào thì sang đúng khu ----------
  // Mỗi phép đếm một try riêng: thiếu một bảng thì mất đúng một con số, không mất cả khối.
  const dem = async (ten, sql, ts = []) => {
    try { const [[r]] = await pool.query(sql, ts); kq.canh_bao[ten] = +r.so || 0; }
    catch (e) { kq.canh_bao[ten] = null; console.warn(`Tổng quan: không đếm được ${ten} —`, e.code || e.message); }
  };
  await dem('cho_duyet',
    'SELECT COUNT(*) AS so FROM users WHERE is_verified = 1 AND is_approved = 0 AND org_id = ?'
    + (ns ? ' AND created_by = ?' : ''), [req.orgId, ...tsNs]);
  await dem('du_hoc_dung', `
    SELECT COUNT(*) AS so FROM du_hoc_ho_so h
     WHERE h.org_id = ? AND h.buoc NOT IN ('hoan-thanh', 'huy', 'tam-dung')
       AND h.buoc_tu IS NOT NULL AND h.buoc_tu < DATE_SUB(CURDATE(), INTERVAL 30 DAY)${locHoSo}`,
    [req.orgId, ...tsNs]);
  await dem('du_hoc_yeu_cau',
    `SELECT COUNT(*) AS so FROM du_hoc_yeu_cau_sua y
       JOIN du_hoc_ho_so h ON h.id = y.ho_so_id
      WHERE y.trang_thai = 'cho'${locHoSo}`, tsNs);
  kq.canh_bao.ktx_no = kq.nguon_khac.ktx_no_nguoi;

  // Từ đây trở xuống là việc của QUẢN TRỊ: điểm danh thiếu, bài quá hạn, bài chờ chấm, thiết bị
  // vượt hạn mức. Sale không mở được những khu đó nên đếm cũng chỉ để trưng một con số chết.
  if (ns) return res.json(kq);

  await dem('diem_danh', `
    SELECT COUNT(*) AS so FROM (
      SELECT cs.id,
        (SELECT COUNT(*) FROM class_attendance ca WHERE ca.session_id = cs.id) AS marked,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = cs.class_id) AS roster
      FROM class_sessions cs JOIN classes c ON c.id = cs.class_id
      WHERE cs.session_date <= CURDATE() AND c.org_id = ?) t
    WHERE t.roster > 0 AND t.marked < t.roster`, [req.orgId]);
  await dem('bai_qua_han', `
    SELECT COUNT(*) AS so FROM (
      SELECT a.id,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = a.class_id) AS tong,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = a.class_id
          AND EXISTS (SELECT 1 FROM exercise_results er
                       WHERE er.user_id = ce.user_id AND er.lesson_id = a.lesson_id)) AS nop
      FROM assignments a JOIN classes c ON c.id = a.class_id
      WHERE c.org_id = ? AND a.due_date IS NOT NULL AND a.due_date < CURDATE()) x
    WHERE x.tong > 0 AND x.nop < x.tong`, [req.orgId]);
  await dem('cho_cham', `
    SELECT COUNT(*) AS so FROM de_bai_lam bl JOIN de_bai d ON d.id = bl.de_id
     WHERE d.org_id = ? AND bl.trang_thai = 'da-nop'`, [req.orgId]);
  await dem('thiet_bi', 'SELECT COUNT(*) AS so FROM device_alerts WHERE da_xu_ly = 0');

  res.json(kq);
});

// =============================================
// USERS MANAGEMENT
// =============================================
router.get('/users', async (req, res) => {
  try {
    const { search } = req.query;
    // Kẹp page/limit để '?page=0' (OFFSET âm) hay '?limit=abc' (LIMIT NaN) không làm SQL lỗi 500.
    const page = toPage(req.query.page);
    const limit = toLimit(req.query.limit, 20, 200);
    // Điều kiện dựng CHUNG cho câu lấy dòng và câu đếm — trước đây hai câu tự ghép riêng, nên
    // thêm một bộ lọc mà quên sửa câu kia là số trang lệch với số dòng thật.
    const dk = [];
    const dkParams = [];
    if (search) {
      dk.push('(name LIKE ? OR email LIKE ?)');
      dkParams.push(`%${search}%`, `%${search}%`);
    }
    // Sale / quản lý hồ sơ chỉ thấy tài khoản do CHÍNH MÌNH tạo.
    if (req.nhanSuId) { dk.push('created_by = ?'); dkParams.push(req.nhanSuId); }
    const where = dk.length ? ` WHERE ${dk.join(' AND ')}` : '';

    const sql = 'SELECT id, name, email, phone, avatar_letter, avatar_color, level_label, level_num,'
      + ' streak, longest_streak, points, is_admin, role, created_by, is_verified, is_approved,'
      + ` last_active, created_at FROM users${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(sql, [...dkParams, limit, offset]);
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) as total FROM users${where}`, dkParams);

    res.json({ users: rows, total, page, limit });
  } catch (err) {
    console.error('Admin users error:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách người dùng.' });
  }
});

// Học viên chưa xếp lớp — nguồn của ô tick chọn ở màn "Thêm học viên vào lớp".
// ⚠️ Đây là route LIỆT KÊ NGƯỜI DÙNG: phải lọc theo tổ chức, để lọt là quản trị trung tâm này
// đọc được tên/email học viên của trung tâm kia. Chỉ lấy học viên (bỏ giáo viên/quản trị) —
// trước đây chỉ loại `is_admin = 0` nên giáo viên của chính trung tâm cũng lọt vào danh sách
// "học viên chưa xếp lớp", tick nhầm là đưa cô giáo vào lớp với tư cách học viên.
// =============================================================
// TẠO TÀI KHOẢN (2026-09-22)
// =============================================================
// Ai tạo được vai trò nào:
//   admin          -> student, teacher, sale, ho_so, admin
//   sale / ho_so   -> CHỈ student
//
// Vai trò nằm trong BODY nên bảng quyền ở roles.js không chặn được — chốt duy nhất là dòng
// `VAI_TRO_DUOC_TAO` dưới đây. Bỏ nó đi thì một sale tạo thẳng một tài khoản admin cho mình.
const VAI_TRO_DUOC_TAO = {
  admin: ['student', 'teacher', 'sale', 'ho_so', 'admin'],
  ho_so: ['student'],
  sale: ['student'],
};

const NHAN_VAI_TRO = {
  student: 'học viên', teacher: 'giáo viên', sale: 'sale',
  ho_so: 'quản lý hồ sơ', admin: 'quản trị viên',
};

router.post('/users', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};
    const vai = String(req.body?.role || 'student');
    const duocTao = VAI_TRO_DUOC_TAO[req.role] || [];
    if (!duocTao.includes(vai)) {
      return res.status(403).json({ error: `Bạn không được tạo tài khoản ${NHAN_VAI_TRO[vai] || vai}.` });
    }

    const mail = String(email || '').trim().toLowerCase();
    if (!mail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      return res.status(400).json({ error: 'Email không hợp lệ.' });
    }
    const mk = String(password || '');
    if (mk.length < 6) return res.status(400).json({ error: 'Mật khẩu phải từ 6 ký tự trở lên.' });

    const [trung] = await pool.query('SELECT id FROM users WHERE email = ?', [mail]);
    if (trung.length) return res.status(409).json({ error: 'Email này đã có tài khoản.' });

    const ten = String(name || '').trim() || mail.split('@')[0];
    const hash = await bcrypt.hash(mk, 10);
    // Tài khoản do nhân sự tạo tay thì KHÔNG phải xác thực email và KHÔNG phải chờ duyệt —
    // người tạo đã đứng ra bảo đảm. Học viên tự đăng ký thì vẫn đi đường cũ.
    const [r] = await pool.query(
      `INSERT INTO users (org_id, name, email, phone, password_hash, role, created_by, is_admin,
                          is_verified, is_approved, avatar_letter)
       VALUES (?,?,?,?,?,?,?,?,1,1,?)`,
      [req.orgId, ten, mail, String(phone || '').trim() || null, hash, vai, req.userId,
       vai === 'admin' ? 1 : 0, ten.charAt(0).toUpperCase()]
    );

    // Báo mật khẩu cho chủ tài khoản. Không chặn luồng nếu gửi hỏng — tài khoản đã tạo xong,
    // và người tạo vẫn đọc được mật khẩu trên màn hình.
    sendWelcomeEmail(mail, mk, null)
      .catch((e) => console.warn('Không gửi được mail tài khoản mới:', e.message));

    res.status(201).json({
      message: `Đã tạo tài khoản ${NHAN_VAI_TRO[vai] || vai} cho ${mail}.`,
      id: r.insertId,
    });
  } catch (err) {
    console.error('Lỗi tạo tài khoản:', err);
    res.status(500).json({ error: 'Không tạo được tài khoản.' });
  }
});

router.get('/users-unassigned', async (req, res) => {
  try {
    const dk = req.locOrg ? ' AND org_id = ?' : '';
    const [rows] = await pool.query(
      `SELECT id, name, email FROM users
       WHERE id NOT IN (SELECT user_id FROM class_enrollments)
         AND is_admin = 0 AND COALESCE(role, 'student') = 'student'${dk}
       ORDER BY name ASC`,
      req.locOrg ? [req.orgId] : []
    );
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải danh sách học viên.' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, avatar_letter, avatar_color, level_label, level_num, streak, longest_streak, points, is_admin, is_approved, char_mode, last_active, created_at,
        (SELECT class_id FROM class_enrollments WHERE user_id = users.id LIMIT 1) as class_id
       FROM users WHERE id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải thông tin người dùng.' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, phone, level_label, level_num, points, streak, is_admin, class_id } = req.body;
    const targetId = parseInt(req.params.id, 10);

    // Chỉ cập nhật những trường thực sự được gửi lên. Bản cũ ghi đè TẤT CẢ các cột, nên form nào
    // thiếu 1 field là cột đó bị set undefined -> mysql2 gửi NULL -> `name` NOT NULL sẽ lỗi 500,
    // còn points/streak thì âm thầm bị xoá về NULL.
    const sets = [];
    const vals = [];
    if (typeof name === 'string' && name.trim()) { sets.push('name=?'); vals.push(name.trim()); }
    if (typeof email === 'string' && email.trim()) {
      // Email trùng sẽ vi phạm UNIQUE và trả 500 khó hiểu — kiểm tra trước để báo lỗi rõ ràng.
      const [dup] = await pool.query('SELECT id FROM users WHERE email = ? AND id <> ?', [email.trim(), targetId]);
      if (dup.length) return res.status(409).json({ error: 'Email này đã được tài khoản khác sử dụng.' });
      sets.push('email=?'); vals.push(email.trim());
    }
    if (phone !== undefined) { sets.push('phone=?'); vals.push(phone || null); }
    if (level_label !== undefined) { sets.push('level_label=?'); vals.push(level_label); }
    if (level_num !== undefined) { sets.push('level_num=?'); vals.push(level_num); }
    if (points !== undefined) { sets.push('points=?'); vals.push(points); }
    if (streak !== undefined) { sets.push('streak=?'); vals.push(streak); }
    if (is_admin !== undefined) {
      // Chặn tự gỡ quyền admin của chính mình -> tránh trường hợp khoá mình ra khỏi trang quản trị.
      if (targetId === req.userId && !is_admin) {
        return res.status(400).json({ error: 'Không thể tự gỡ quyền quản trị của chính mình.' });
      }
      if (!req.laAdmin) return res.status(403).json({ error: 'Chỉ quản trị viên đổi được quyền tài khoản.' });
      sets.push('is_admin=?'); vals.push(is_admin ? 1 : 0);
    }

    // Đổi VAI TRÒ: chỉ quản trị viên. Sale / quản lý hồ sơ đi tới được route này (tài khoản do
    // họ tạo), nên nếu không chặn ở đây thì họ tự nâng một tài khoản của mình lên admin rồi
    // đăng nhập bằng tài khoản đó — vòng qua mọi giới hạn phía trên.
    const vaiMoi = req.body?.role;
    if (vaiMoi !== undefined) {
      if (!req.laAdmin) return res.status(403).json({ error: 'Chỉ quản trị viên đổi được vai trò tài khoản.' });
      const HOP_LE = ['student', 'teacher', 'sale', 'ho_so', 'admin'];
      if (!HOP_LE.includes(vaiMoi)) return res.status(400).json({ error: 'Vai trò không hợp lệ.' });
      if (targetId === req.userId && vaiMoi !== 'admin') {
        return res.status(400).json({ error: 'Không thể tự hạ vai trò của chính mình.' });
      }
      sets.push('role=?'); vals.push(vaiMoi);
      // `is_admin` là cột cũ nhưng bảng xếp hạng, /auth/me và cổng đăng nhập admin vẫn đọc nó —
      // để lệch với `role` là tài khoản vào được trang này mà lại không có quyền, hoặc ngược lại.
      sets.push('is_admin=?'); vals.push(vaiMoi === 'admin' ? 1 : 0);
    }

    if (sets.length) {
      vals.push(targetId);
      await pool.query(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, vals);
    }


    if (class_id !== undefined) {
      if (!class_id) {
        await pool.query('DELETE FROM class_enrollments WHERE user_id = ?', [req.params.id]);
      } else {
        const [exists] = await pool.query('SELECT id FROM class_enrollments WHERE user_id = ?', [req.params.id]);
        if (exists.length) {
          await pool.query('UPDATE class_enrollments SET class_id = ? WHERE user_id = ?', [class_id, req.params.id]);
        } else {
          await pool.query('INSERT INTO class_enrollments (class_id, user_id) VALUES (?, ?)', [class_id, req.params.id]);
        }
      }
    }
    
    res.json({ message: 'Cập nhật thành công.' });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Lỗi cập nhật người dùng.' });
  }
});

// Duyệt xác nhận email thay học viên — lối thoát khi email xác nhận không tới được
// (Resend chưa verify domain, học viên nhập nhầm hòm thư, mail rơi vào Spam...).
// Giáo viên tự tạo tài khoản cho học viên nên hoàn toàn biết tài khoản đó là thật.
router.post('/users/:id/verify', async (req, res) => {
  try {
    const [r] = await pool.query(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?',
      [req.params.id]
    );
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy tài khoản.' });
    res.json({ message: 'Đã xác nhận email cho tài khoản này.' });
  } catch (err) {
    console.error('Admin verify user error:', err);
    res.status(500).json({ error: 'Lỗi xác nhận tài khoản.' });
  }
});

router.put('/users/:id/password', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) return res.status(400).json({ error: 'Mật khẩu cần ít nhất 6 ký tự.' });
    const hash = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.params.id]);
    res.json({ message: 'Đổi mật khẩu thành công.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi đổi mật khẩu.' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    // Prevent self-delete
    if (parseInt(req.params.id) === req.userId) {
      return res.status(400).json({ error: 'Không thể xóa tài khoản của chính mình.' });
    }
    // Không để xoá mất tài khoản admin cuối cùng -> sẽ không còn ai vào được trang quản trị.
    const [[target]] = await pool.query('SELECT is_admin FROM users WHERE id = ?', [req.params.id]);
    if (!target) return res.status(404).json({ error: 'Không tìm thấy tài khoản.' });
    if (target.is_admin) {
      const [[{ n }]] = await pool.query('SELECT COUNT(*) AS n FROM users WHERE is_admin = 1');
      if (n <= 1) return res.status(400).json({ error: 'Đây là tài khoản quản trị duy nhất, không thể xoá.' });
    }

    // Dữ liệu liên quan (bài tập, bài thi, điểm danh, ghi danh lớp...) tự xoá theo nhờ
    // ON DELETE CASCADE khai báo trong init-db.js — không cần xoá tay, cũng không sinh dữ liệu rác.
    // Riêng lớp do người này phụ trách thì KHÔNG bị xoá (teacher_id ON DELETE SET NULL,
    // xem migration-classes-teacher-fk.sql).
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Xóa người dùng thành công.' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Lỗi xóa người dùng.' });
  }
});

// Duyệt tài khoản — tuỳ chọn xếp vào lớp
router.put('/users/:id/approve', async (req, res) => {
  try {
    const { class_id } = req.body;
    await pool.query('UPDATE users SET is_approved = TRUE WHERE id = ?', [req.params.id]);
    if (class_id) {
      const [already] = await pool.query('SELECT id FROM class_enrollments WHERE class_id = ? AND user_id = ?', [class_id, req.params.id]);
      if (!already.length) {
        await pool.query('INSERT INTO class_enrollments (class_id, user_id) VALUES (?, ?)', [class_id, req.params.id]);
      }
    }
    res.json({ message: 'Đã duyệt tài khoản thành công.' });
  } catch (err) {
    console.error('Approve user error:', err);
    res.status(500).json({ error: 'Lỗi duyệt tài khoản.' });
  }
});

// Đếm tài khoản chờ duyệt (cho badge menu admin)
router.get('/pending-count', async (req, res) => {
  try {
    const [[{ count }]] = await pool.query('SELECT COUNT(*) as count FROM users WHERE is_verified = TRUE AND is_approved = FALSE');
    res.json({ count });
  } catch (err) {
    res.json({ count: 0 });
  }
});


// =============================================
// QUẢN LÝ LỚP (classes / roster / sessions / attendance)
// =============================================

// -- Danh sách lớp --
/**
 * Chuẩn hoá teacher_id gửi từ client.
 *   null/'' -> null (lớp chưa có giáo viên)
 *   id hợp lệ và đúng là tài khoản giáo viên/admin -> trả về id
 *   còn lại -> false (để route trả 400)
 * Cho phép gán cả tài khoản admin làm giáo viên phụ trách vì thực tế chủ trung tâm vẫn đứng lớp.
 */
async function kiemTraGiaoVien(teacher_id, req = null) {
  if (teacher_id === null || teacher_id === undefined || teacher_id === '') return null;
  const id = parseInt(teacher_id, 10);
  if (!Number.isInteger(id)) return false;
  // Phải CÙNG TỔ CHỨC: không kiểm thì quản trị trung tâm A gán được giáo viên của trung tâm B
  // vào lớp mình, và người đó lập tức thấy toàn bộ học viên của lớp đó.
  const dk = req && req.locOrg ? ' AND org_id = ?' : '';
  const ts = req && req.locOrg ? [id, req.orgId] : [id];
  const [r] = await pool.query(`SELECT 1 FROM users WHERE id = ? AND role IN ('teacher','admin')${dk}`, ts);
  return r.length ? id : false;
}

router.get('/classes', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, u.name AS teacher_name,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = c.id) AS student_count,
        (SELECT COUNT(*) FROM class_sessions cs WHERE cs.class_id = c.id) AS session_count
      FROM classes c
      LEFT JOIN users u ON u.id = c.teacher_id
      WHERE 1 = 1${locPhamVi(req)}
      ORDER BY c.created_at DESC
    `, thamSoPhamVi(req));
    res.json({ classes: rows });
  } catch (err) {
    console.error('Admin classes error:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách lớp.' });
  }
});

router.post('/classes', async (req, res) => {
  try {
    const { name, description, copy_from_class_id, teacher_id } = req.body;
    if (!name) return res.status(400).json({ error: 'Vui lòng nhập tên lớp.' });
    // Trước đây gán cứng teacher_id = người tạo, nên mọi lớp đều thuộc về admin và không có
    // đường nào đổi. Nay admin chọn rõ giáo viên phụ trách; để trống thì lớp chưa có giáo viên.
    const gvPhuTrach = await kiemTraGiaoVien(teacher_id, req);
    if (gvPhuTrach === false) return res.status(400).json({ error: 'Người được chọn không phải tài khoản giáo viên.' });
    const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    // Lớp luôn thuộc tổ chức của người tạo. Admin nền tảng tạo hộ một trung tâm thì truyền org_id.
    const orgLop = req.locOrg ? req.orgId : (parseInt(req.body.org_id, 10) || req.orgId);
    const [result] = await pool.query(
      'INSERT INTO classes (org_id, name, description, teacher_id, invite_code) VALUES (?,?,?,?,?)',
      [orgLop, name, description || '', gvPhuTrach, inviteCode]
    );
    const newClassId = result.insertId;

    if (copy_from_class_id) {
      const [oldSessions] = await pool.query('SELECT session_date, topic, course_type, notes FROM class_sessions WHERE class_id = ?', [copy_from_class_id]);
      if (oldSessions.length > 0) {
        for (const s of oldSessions) {
          await pool.query('INSERT INTO class_sessions (class_id, session_date, topic, course_type, notes) VALUES (?,?,?,?,?)',
            [newClassId, s.session_date, s.topic, s.course_type || '', s.notes || '']);
        }
      }
    }

    res.status(201).json({ message: 'Tạo lớp thành công.', id: newClassId });
  } catch (err) {
    console.error('Create class error:', err);
    res.status(500).json({ error: 'Lỗi tạo lớp.' });
  }
});

router.put('/classes/:id', async (req, res) => {
  try {
    const { name, description, is_active, teacher_id } = req.body;
    const sets = ['name=?', 'description=?', 'is_active=?'];
    const vals = [name, description || '', is_active === undefined ? true : !!is_active];
    // teacher_id chỉ đổi khi client gửi lên -> gọi PUT không kèm trường này thì giữ nguyên giáo viên.
    if (teacher_id !== undefined) {
      const gvPhuTrach = await kiemTraGiaoVien(teacher_id, req);
      if (gvPhuTrach === false) return res.status(400).json({ error: 'Người được chọn không phải tài khoản giáo viên.' });
      sets.push('teacher_id=?'); vals.push(gvPhuTrach);
    }
    vals.push(req.params.id);
    await pool.query(`UPDATE classes SET ${sets.join(', ')} WHERE id=?`, vals);
    res.json({ message: 'Cập nhật lớp thành công.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật lớp.' });
  }
});

router.delete('/classes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM classes WHERE id = ?', [req.params.id]);
    res.json({ message: 'Xóa lớp thành công.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xóa lớp.' });
  }
});

// -- Chi tiết lớp: thông tin lớp + danh sách học viên (kèm tóm tắt điểm danh + bài tập) --
router.get('/classes/:id', async (req, res) => {
  try {
    const classId = req.params.id;
    const [cRows] = await pool.query(
      `SELECT c.*, u.name AS teacher_name FROM classes c LEFT JOIN users u ON u.id = c.teacher_id WHERE c.id = ?`,
      [classId]
    );
    if (!cRows.length) return res.status(404).json({ error: 'Không tìm thấy lớp.' });

    const [students] = await pool.query(`
      SELECT u.id, u.name, u.email, u.phone, u.avatar_letter, u.avatar_color, u.level_label, u.points, ce.enrolled_at,
        (SELECT COUNT(*) FROM class_sessions cs WHERE cs.class_id = ?) AS total_sessions,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.status = 'present') AS attended_count,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.status = 'absent') AS absent_count,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.is_late = 1) AS late_count,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.is_left_early = 1) AS early_leave_count,
        (SELECT COUNT(DISTINCT er.lesson_id) FROM exercise_results er WHERE er.user_id = u.id) AS exercises_done
      FROM class_enrollments ce
      JOIN users u ON u.id = ce.user_id
      WHERE ce.class_id = ?
      ORDER BY u.name ASC
    `, [classId, classId, classId, classId, classId, classId]);

    res.json({ class: cRows[0], students });
  } catch (err) {
    console.error('Class detail error:', err);
    res.status(500).json({ error: 'Lỗi tải chi tiết lớp.' });
  }
});

// -- Chi tiết 1 lần THI (dùng cho modal "Xem" ở bảng bài thi trong trang chi tiết học viên) --
// 2026-08-27: frontend đã gọi GET /admin/exam-results/:id từ trước nhưng route này CHƯA TỪNG TỒN TẠI
// -> luôn trả 404, bấm "Xem" ở phần bài thi chỉ hiện thông báo lỗi. Bổ sung tại đây.
router.get('/exam-results/:id', async (req, res) => {
  try {
    const [results] = await pool.query(
      `SELECT id, user_id, skill, total_questions, correct_answers, score_percent, time_seconds,
              created_at, teacher_review, review_read_at
       FROM exam_results WHERE id = ?`,
      [req.params.id]
    );
    if (!results.length) return res.status(404).json({ error: 'Không tìm thấy bài thi.' });

    const [answers] = await pool.query(`
      SELECT ea.question_id, ea.selected_option, ea.is_correct,
             eq.question, eq.question_meaning, eq.option_a, eq.option_b, eq.option_c, eq.option_d,
             eq.correct_option, eq.passage, eq.audio_desc
      FROM exam_answers ea
      JOIN exam_questions eq ON eq.id = ea.question_id
      WHERE ea.exam_result_id = ?
      ORDER BY ea.id ASC
    `, [req.params.id]);

    res.json({ result: results[0], answers });
  } catch (err) {
    console.error('Admin exam result detail error:', err);
    res.status(500).json({ error: 'Lỗi tải chi tiết bài thi.' });
  }
});

// -- Exercise Results Reviews --
// Ghi lời phê. review_read_at = NULL để lời phê mới hiện lại thành "chưa đọc" trên chuông của học viên.
// Nếu DB chưa chạy migration-teacher-review.sql thì báo rõ nguyên nhân thay vì "Lỗi lưu nhận xét" chung chung
// — lỗi này rất khó đoán nếu chỉ nhìn thông báo cũ.
function reviewErrorMessage(err, fallback) {
  if (err && (err.code === 'ER_BAD_FIELD_ERROR' || err.code === 'ER_NO_SUCH_TABLE')) {
    return 'DB chưa có cột nhận xét. Hãy chạy server/config/migration-teacher-review.sql rồi thử lại.';
  }
  return fallback;
}

router.post('/exercise-results/:id/review', async (req, res) => {
  try {
    const { teacher_review } = req.body;
    const [r] = await pool.query('UPDATE exercise_results SET teacher_review = ?, review_read_at = NULL WHERE id = ?', [
      // Trim rồi mới lưu: lời phê toàn khoảng trắng phải thành NULL, nếu không chuông của học viên
      // vẫn báo đỏ mà mở ra chẳng có chữ nào (xem thêm ghi chú ở /api/exercise/notifications).
      (typeof teacher_review === 'string' ? teacher_review.trim() : teacher_review) || null,
      req.params.id
    ]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy bài tập này.' });
    res.json({ message: 'Đã lưu nhận xét.' });
  } catch (err) {
    console.error('Save exercise review error:', err);
    res.status(500).json({ error: reviewErrorMessage(err, 'Lỗi lưu nhận xét.') });
  }
});

router.post('/exam-results/:id/review', async (req, res) => {
  try {
    const { teacher_review } = req.body;
    const [r] = await pool.query('UPDATE exam_results SET teacher_review = ?, review_read_at = NULL WHERE id = ?', [
      // Trim rồi mới lưu: lời phê toàn khoảng trắng phải thành NULL, nếu không chuông của học viên
      // vẫn báo đỏ mà mở ra chẳng có chữ nào (xem thêm ghi chú ở /api/exercise/notifications).
      (typeof teacher_review === 'string' ? teacher_review.trim() : teacher_review) || null,
      req.params.id
    ]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy bài thi này.' });
    res.json({ message: 'Đã lưu nhận xét.' });
  } catch (err) {
    console.error('Save exam review error:', err);
    res.status(500).json({ error: reviewErrorMessage(err, 'Lỗi lưu nhận xét thi.') });
  }
});

// -- Tìm user chưa thuộc lớp (để thêm bằng tài khoản đã có sẵn) --
router.get('/classes/:id/available-students', async (req, res) => {
  try {
    const { search } = req.query;
    let sql = `SELECT id, name, email FROM users WHERE id NOT IN (SELECT user_id FROM class_enrollments WHERE class_id = ?)`;
    const params = [req.params.id];
    // Chỉ tìm trong tổ chức của mình — đây là route liệt kê người dùng, để lọt là dò được danh
    // sách học viên của trung tâm khác.
    if (req.locOrg) { sql += ' AND org_id = ?'; params.push(req.orgId); }
    if (search) { sql += ' AND (name LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    sql += ' ORDER BY name ASC LIMIT 50';
    const [rows] = await pool.query(sql, params);
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tìm học viên.' });
  }
});

// -- Thêm học viên vào lớp từ danh sách ID --
/**
 * Thêm học viên vào lớp — HAI đường vào, cố ý giữ cả hai:
 *   • `userIds`  — tick chọn từ danh sách người đã có tài khoản trong tổ chức (giao diện cũ).
 *   • `emails`   — dán danh sách email. Chưa có tài khoản thì TẠO MỚI ngay trong tổ chức của LỚP,
 *                  mật khẩu mặc định + gửi mail. Đây là đường DUY NHẤT dùng được với một trung
 *                  tâm vừa thuê hệ thống: tổ chức mới chưa có học viên nào, nên danh sách tick
 *                  chọn rỗng và trung tâm không thể đưa được ai vào (lỗi chặn cả mô hình cho
 *                  thuê, phát hiện 2026-09-13 khi chạy thử trọn vòng đời một trung tâm).
 *
 * Email đã thuộc tổ chức KHÁC thì từ chối, không kéo sang: họ đang có lớp và lịch sử học ở bên
 * kia, mà kéo được nghĩa là gõ đúng email là chiếm được tài khoản người khác. Thông báo cố ý
 * không nói họ đang ở tổ chức nào (cùng lối với POST /teachers).
 */
router.post('/classes/:id/students', async (req, res) => {
  const classId = req.params.id;
  try {
    const [cRows] = await pool.query('SELECT id, name, org_id FROM classes WHERE id = ?', [classId]);
    if (!cRows.length) return res.status(404).json({ error: 'Không tìm thấy lớp.' });
    const orgLop = cRows[0].org_id;

    let userIds = req.body.userIds || [];
    if (!Array.isArray(userIds)) userIds = [userIds];
    userIds = [...new Set(userIds.map(id => parseInt(id, 10)).filter(id => !isNaN(id)))];

    let emails = req.body.emails || req.body.email || [];
    if (!Array.isArray(emails)) emails = [emails];
    emails = [...new Set(emails
      .flatMap(e => String(e || '').split(/[\s,;]+/))
      .map(e => e.trim().toLowerCase())
      .filter(Boolean))];

    if (!userIds.length && !emails.length) {
      return res.status(400).json({ error: 'Vui lòng chọn học viên hoặc nhập email.' });
    }

    const results = [];

    // --- Đường EMAIL: tra tài khoản, chưa có thì tạo. Quy về userIds rồi ghi danh chung bên dưới.
    if (emails.length) {
      let conTrong = Infinity;   // bản này không giới hạn số học viên

      for (const mail of emails) {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
          results.push({ email: mail, status: 'error', message: 'Email không hợp lệ.' });
          continue;
        }
        const [co] = await pool.query('SELECT id, org_id, role FROM users WHERE email = ?', [mail]);
        if (co.length) {
          if (co[0].org_id !== orgLop) {
            results.push({ email: mail, status: 'error', message: 'Email này đã được dùng ở một tổ chức khác.' });
            continue;
          }
          userIds.push(co[0].id);
          continue;
        }
        if (conTrong <= 0) {
          results.push({ email: mail, status: 'error', message: 'Đã đạt hạn mức học viên của gói. Liên hệ quản trị hệ thống để nâng hạn mức.' });
          continue;
        }
        try {
          const hash = await bcrypt.hash(DEFAULT_STUDENT_PASSWORD, 10);
          const ten = mail.split('@')[0];
          const [ins] = await pool.query(
            `INSERT INTO users (org_id, name, email, password_hash, role, is_admin, is_verified, is_approved, avatar_letter)
             VALUES (?,?,?,?, 'student', 0, 1, 1, ?)`,
            [orgLop, ten, mail, hash, ten.charAt(0).toUpperCase()]
          );
          conTrong -= 1;
          userIds.push(ins.insertId);
          // Gửi mail sau khi đã tạo xong — gửi lỗi thì tài khoản vẫn dùng được, đừng chặn luồng.
          sendWelcomeEmail(mail, DEFAULT_STUDENT_PASSWORD, null)
            .catch(e => console.warn('Không gửi được mail học viên:', e.message));
        } catch (e) {
          if (e.code === 'ER_DUP_ENTRY') {
            results.push({ email: mail, status: 'error', message: 'Email này đã được dùng ở một tổ chức khác.' });
          } else {
            console.error('Lỗi tạo tài khoản học viên:', mail, e);
            results.push({ email: mail, status: 'error', message: 'Không tạo được tài khoản cho email này.' });
          }
        }
      }
      userIds = [...new Set(userIds)];
    }

    for (const userId of userIds) {
      try {
        // Học viên phải cùng tổ chức với LỚP (không phải với người đang thao tác): admin nền
        // tảng thêm hộ cũng không được kéo học viên từ trung tâm này sang lớp của trung tâm kia.
        const [existing] = await pool.query('SELECT name, email FROM users WHERE id = ? AND org_id = ?', [userId, cRows[0].org_id]);
        if (!existing.length) {
          results.push({ userId, status: 'error', message: 'Không tìm thấy học viên trong tổ chức này.' });
          continue;
        }
        const email = existing[0].email;
        const [alreadyIn] = await pool.query('SELECT id FROM class_enrollments WHERE class_id = ? AND user_id = ?', [classId, userId]);
        if (alreadyIn.length) {
          results.push({ email, status: 'already_enrolled', message: 'Đã có trong lớp.' });
          continue;
        }

        // Remove from other classes
        await pool.query('DELETE FROM class_enrollments WHERE user_id = ?', [userId]);
        
        await pool.query('INSERT INTO class_enrollments (class_id, user_id) VALUES (?, ?)', [classId, userId]);
        results.push({ email, status: 'ok', message: 'Đã thêm vào lớp.' });
      } catch (innerErr) {
        console.error('Add student error:', userId, innerErr);
        results.push({ userId, status: 'error', message: 'Lỗi hệ thống khi xử lý học viên này.' });
      }
    }

    res.json({ results });
  } catch (err) {
    console.error('Add students error:', err);
    res.status(500).json({ error: 'Lỗi thêm học viên.' });
  }
});

router.delete('/classes/:id/students/:userId', async (req, res) => {
  try {
    await pool.query('DELETE FROM class_enrollments WHERE class_id = ? AND user_id = ?', [req.params.id, req.params.userId]);
    res.json({ message: 'Đã xóa học viên khỏi lớp.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xóa học viên khỏi lớp.' });
  }
});

// -- Buổi học --
router.get('/classes/:id/sessions', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT cs.*,
        (SELECT COUNT(*) FROM class_attendance ca WHERE ca.session_id = cs.id) AS marked_count,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = cs.class_id) AS roster_count
      FROM class_sessions cs WHERE cs.class_id = ? ORDER BY cs.session_date ASC, cs.id ASC
    `, [req.params.id]);
    res.json({ sessions: rows });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải danh sách buổi học.' });
  }
});

router.post('/classes/:id/sessions', async (req, res) => {
  try {
    const { session_date, topic, course_type, notes, classIds } = req.body;

    let targetClassIds = [req.params.id];
    if (Array.isArray(classIds) && classIds.length > 0) {
      targetClassIds = classIds;
    }

    const insertedIds = [];
    for (const cId of targetClassIds) {
      const [result] = await pool.query(
        'INSERT INTO class_sessions (class_id, session_date, topic, course_type, notes) VALUES (?,?,?,?,?)',
        [cId, session_date || null, topic || '', course_type || '', notes || '']
      );
      insertedIds.push(result.insertId);
    }

    res.status(201).json({ message: `Đã tạo buổi học cho ${targetClassIds.length} lớp.`, ids: insertedIds });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tạo buổi học.' });
  }
});

router.put('/sessions/:id', async (req, res) => {
  try {
    const { session_date, topic, course_type, notes } = req.body;
    await pool.query('UPDATE class_sessions SET session_date=?, topic=?, course_type=?, notes=? WHERE id=?',
      [session_date || null, topic || '', course_type || '', notes || '', req.params.id]);
    res.json({ message: 'Cập nhật buổi học thành công.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật buổi học.' });
  }

});

router.delete('/sessions/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM class_sessions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Xóa buổi học thành công.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xóa buổi học.' });
  }
});

// -- Điểm danh theo buổi: trả về TOÀN BỘ học viên trong lớp kèm trạng thái điểm danh hiện tại (nếu có) --
router.get('/sessions/:id/attendance', async (req, res) => {
  try {
    const [sRows] = await pool.query('SELECT * FROM class_sessions WHERE id = ?', [req.params.id]);
    if (!sRows.length) return res.status(404).json({ error: 'Không tìm thấy buổi học.' });
    const session = sRows[0];

    const [rows] = await pool.query(`
      SELECT u.id AS user_id, u.name, u.email,
        ca.status, ca.is_late, ca.is_left_early, ca.teacher_note
      FROM class_enrollments ce
      JOIN users u ON u.id = ce.user_id
      LEFT JOIN class_attendance ca ON ca.session_id = ? AND ca.user_id = u.id
      WHERE ce.class_id = ?
      ORDER BY u.name ASC
    `, [req.params.id, session.class_id]);

    res.json({ session, attendance: rows });
  } catch (err) {
    console.error('Session attendance error:', err);
    res.status(500).json({ error: 'Lỗi tải điểm danh.' });
  }
});

// -- Lưu điểm danh hàng loạt cho 1 buổi --
router.put('/sessions/:id/attendance', async (req, res) => {
  try {
    const { records } = req.body; // [{ user_id, status, is_late, is_left_early, teacher_note }]
    if (!Array.isArray(records) || !records.length) {
      return res.status(400).json({ error: 'Danh sách điểm danh không hợp lệ.' });
    }

    const [sRows] = await pool.query('SELECT session_date FROM class_sessions WHERE id = ?', [req.params.id]);
    if (!sRows.length) return res.status(404).json({ error: 'Không tìm thấy buổi học.' });
    if (!sRows[0].session_date) {
      return res.status(400).json({ error: 'Vui lòng cập nhật Ngày học cho buổi này trước khi điểm danh.' });
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      for (const r of records) {
        await conn.query(
          `INSERT INTO class_attendance (session_id, user_id, status, is_late, is_left_early, teacher_note)
           VALUES (?,?,?,?,?,?)
           ON DUPLICATE KEY UPDATE status=VALUES(status), is_late=VALUES(is_late), is_left_early=VALUES(is_left_early), teacher_note=VALUES(teacher_note)`,
          [req.params.id, r.user_id, r.status === 'absent' ? 'absent' : 'present', !!r.is_late, !!r.is_left_early, r.teacher_note || '']
        );
      }
      await conn.commit();
      res.json({ message: 'Lưu điểm danh thành công.', count: records.length });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Save attendance error:', err);
    res.status(500).json({ error: 'Lỗi lưu điểm danh.' });
  }
});

// -- Chi tiết học viên trong 1 lớp: thông tin cơ bản + tóm tắt điểm danh + lịch sử điểm danh
//    + bài tập/điểm số MỚI NHẤT của từng phần (vận mẫu, thanh mẫu, thanh điệu, từng bài giáo trình) --
router.get('/classes/:classId/students/:userId', async (req, res) => {
  try {
    const { classId, userId } = req.params;

    const [uRows] = await pool.query(
      'SELECT id, name, email, phone, avatar_letter, avatar_color, level_label, level_num, streak, points, created_at FROM users WHERE id = ?',
      [userId]
    );
    if (!uRows.length) return res.status(404).json({ error: 'Không tìm thấy học viên.' });

    const [enrollRows] = await pool.query('SELECT id FROM class_enrollments WHERE class_id = ? AND user_id = ?', [classId, userId]);
    if (!enrollRows.length) return res.status(404).json({ error: 'Học viên không thuộc lớp này.' });

    // Tóm tắt điểm danh
    const [[attSummary]] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM class_sessions WHERE class_id = ?) AS total_sessions,
        COUNT(*) AS marked_sessions,
        SUM(CASE WHEN ca.status = 'present' THEN 1 ELSE 0 END) AS attended_count,
        SUM(CASE WHEN ca.status = 'absent' THEN 1 ELSE 0 END) AS absent_count,
        SUM(CASE WHEN ca.is_late THEN 1 ELSE 0 END) AS late_count,
        SUM(CASE WHEN ca.is_left_early THEN 1 ELSE 0 END) AS early_leave_count
      FROM class_attendance ca
      JOIN class_sessions cs ON cs.id = ca.session_id
      WHERE cs.class_id = ? AND ca.user_id = ?
    `, [classId, classId, userId]);

    // Lịch sử điểm danh từng buổi (kèm nhận xét giáo viên)
    const [attHistory] = await pool.query(`
      SELECT cs.id AS session_id, cs.session_date, cs.topic, ca.status, ca.is_late, ca.is_left_early, ca.teacher_note
      FROM class_sessions cs
      LEFT JOIN class_attendance ca ON ca.session_id = cs.id AND ca.user_id = ?
      WHERE cs.class_id = ?
      ORDER BY cs.session_date ASC, cs.id ASC
    `, [userId, classId]);

    // Bài tập — lấy TẤT CẢ các lần nộp, sắp xếp theo lesson_id + mới nhất trước.
    // Frontend admin sẽ gom nhóm theo lesson_id và hiển thị dạng accordion.
    const [allExercises] = await pool.query(`
      SELECT er.id AS exercise_result_id, er.lesson_id, er.total_questions, er.correct_answers,
        er.score_percent, er.time_seconds, er.created_at,
        (er.details_json IS NOT NULL) AS has_detail
      FROM exercise_results er
      WHERE er.user_id = ?
      ORDER BY er.lesson_id ASC, er.created_at DESC
    `, [userId]);

    // Tách riêng bài phát âm (pron:initials/finals/tones) và bài giáo trình đương đại (còn lại)
    const pronPrefixes = { 'pron:initials': 'Thanh mẫu', 'pron:finals': 'Vận mẫu', 'pron:tones': 'Thanh điệu' };

    // Gom nhóm theo lesson_id, mỗi nhóm là 1 mảng submissions
    const pronGroups = {};
    const textGroups = {};
    for (const e of allExercises) {
      if (pronPrefixes[e.lesson_id]) {
        if (!pronGroups[e.lesson_id]) pronGroups[e.lesson_id] = [];
        pronGroups[e.lesson_id].push({ ...e, label: pronPrefixes[e.lesson_id] });
      } else {
        if (!textGroups[e.lesson_id]) textGroups[e.lesson_id] = [];
        textGroups[e.lesson_id].push(e);
      }
    }

    // Chuyển thành mảng { lesson_id, label?, submissions: [...] }
    const pronunciation = Object.entries(pronGroups).map(([lid, subs]) => ({
      lesson_id: lid, label: pronPrefixes[lid], submissions: subs,
    }));
    const textbook = Object.entries(textGroups).map(([lid, subs]) => ({
      lesson_id: lid, submissions: subs,
    }));

    // Bài thi
    const [allExams] = await pool.query(`
      SELECT er.id AS exam_result_id, er.skill, er.total_questions, er.correct_answers,
        er.score_percent, er.time_seconds, er.created_at,
        TRUE AS has_detail
      FROM exam_results er
      WHERE er.user_id = ?
      ORDER BY er.created_at DESC
    `, [userId]);

    // Gom nhóm bài thi theo skill
    const examGroups = {};
    for (const e of allExams) {
      if (!examGroups[e.skill]) examGroups[e.skill] = [];
      examGroups[e.skill].push(e);
    }
    const exams = Object.entries(examGroups).map(([skill, subs]) => ({
      skill, submissions: subs,
    }));

    res.json({
      student: uRows[0],
      attendance_summary: attSummary,
      attendance_history: attHistory,
      exercises: { pronunciation, textbook, exams },
    });
  } catch (err) {
    console.error('Student detail error:', err);
    res.status(500).json({ error: 'Lỗi tải chi tiết học viên.' });
  }
});

// =============================================
// GIAO BÀI TẬP CÓ HẠN NỘP (assignments)
// =============================================
// "Đã nộp" = học viên có ÍT NHẤT MỘT bản ghi exercise_results với đúng lesson_id.
// Với bài dịch (exercise_type='translate'): dùng translate_submissions.
// Cố ý KHÔNG đòi bản ghi phải tạo sau ngày giao.
const ASSIGNMENT_SUBMITTED_JOIN = `
  EXISTS (
    SELECT 1 FROM exercise_results er
    WHERE er.user_id = u.id AND er.lesson_id = a.lesson_id
      AND (a.exercise_type IS NULL OR a.exercise_type = 'bai-tap')
    UNION ALL
    SELECT 1 FROM translate_submissions ts
    WHERE ts.user_id = u.id AND ts.lesson_id = a.lesson_id
      AND a.exercise_type = 'translate'
  )`;

// Danh sách bài đã giao của 1 lớp + tiến độ nộp
router.get('/classes/:id/assignments', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = a.class_id) AS total_students,
        (SELECT COUNT(*) FROM class_enrollments ce
           JOIN users u ON u.id = ce.user_id
          WHERE ce.class_id = a.class_id AND ${ASSIGNMENT_SUBMITTED_JOIN}) AS submitted_count
      FROM assignments a
      WHERE a.class_id = ?
      ORDER BY (a.due_date IS NULL), a.due_date ASC, a.id DESC
    `, [req.params.id]);
    res.json({ assignments: rows });
  } catch (err) {
    console.error('List assignments error:', err);
    res.status(500).json({ error: assignmentErrorMessage(err, 'Lỗi tải danh sách bài đã giao.') });
  }
});

function assignmentErrorMessage(err, fallback) {
  if (err && err.code === 'ER_NO_SUCH_TABLE') {
    return 'DB chưa có bảng bài tập. Chạy `npm run db:migrate:prod` (hoặc db:migrate:local) rồi thử lại.';
  }
  return fallback;
}

router.post('/classes/:id/assignments', async (req, res) => {
  try {
    const { lesson_id, exercise_type, title, due_date, note } = req.body;
    if (!lesson_id || !String(lesson_id).trim()) {
      return res.status(400).json({ error: 'Vui lòng chọn bài cần giao.' });
    }
    if (String(lesson_id).length > 20) {
      return res.status(400).json({ error: 'Mã bài không hợp lệ.' });
    }
    // Chỉ 2 loại có backend thật (ASSIGNMENT_SUBMITTED_JOIN chỉ biết tính 2 loại này) — 'writing'/
    // 'exam' chưa có chỗ nào ghi kết quả nên nếu lọt vào đây, bài giao sẽ mãi mãi báo "chưa nộp".
    const cleanType = ['bai-tap', 'translate'].includes(exercise_type) ? exercise_type : 'bai-tap';
    // Giao lại đúng bài đã giao (cùng lesson_id + exercise_type) = cập nhật hạn nộp/ghi chú,
    // không tạo bản ghi trùng (UNIQUE(class_id, lesson_id, exercise_type) — xem init-db.js).
    await pool.query(`
      INSERT INTO assignments (class_id, lesson_id, exercise_type, title, due_date, note, created_by)
      VALUES (?,?,?,?,?,?,?)
      ON DUPLICATE KEY UPDATE title=VALUES(title), due_date=VALUES(due_date), note=VALUES(note)
    `, [req.params.id, String(lesson_id).trim(), cleanType, title || '', due_date || null, note || '', req.userId]);
    res.status(201).json({ message: 'Đã giao bài cho lớp.' });
  } catch (err) {
    console.error('Create assignment error:', err);
    res.status(500).json({ error: assignmentErrorMessage(err, 'Lỗi giao bài.') });
  }
});

router.put('/assignments/:id', async (req, res) => {
  try {
    const { title, due_date, note } = req.body;
    const [r] = await pool.query(
      'UPDATE assignments SET title=?, due_date=?, note=? WHERE id=?',
      [title || '', due_date || null, note || '', req.params.id]
    );
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy bài đã giao.' });
    res.json({ message: 'Đã cập nhật bài giao.' });
  } catch (err) {
    res.status(500).json({ error: assignmentErrorMessage(err, 'Lỗi cập nhật bài giao.') });
  }
});

router.delete('/assignments/:id', async (req, res) => {
  try {
    const [r] = await pool.query('DELETE FROM assignments WHERE id = ?', [req.params.id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy bài đã giao.' });
    res.json({ message: 'Đã bỏ giao bài này.' });
  } catch (err) {
    res.status(500).json({ error: assignmentErrorMessage(err, 'Lỗi xoá bài giao.') });
  }
});

// Ai đã nộp / chưa nộp 1 bài cụ thể — bấm vào con số "4/10 chưa nộp" là ra danh sách tên.
router.get('/assignments/:id/submissions', async (req, res) => {
  try {
    const [aRows] = await pool.query(
      `SELECT a.*, c.name AS class_name FROM assignments a
       JOIN classes c ON c.id = a.class_id WHERE a.id = ?`,
      [req.params.id]
    );
    if (!aRows.length) return res.status(404).json({ error: 'Không tìm thấy bài đã giao.' });
    const a = aRows[0];

    const [students] = await pool.query(`
      SELECT u.id, u.name, u.email,
        latest.score_percent, latest.correct_answers, latest.total_questions, latest.created_at AS submitted_at,
        latest.id AS exercise_result_id
      FROM class_enrollments ce
      JOIN users u ON u.id = ce.user_id
      LEFT JOIN (
        SELECT er.* FROM exercise_results er
        INNER JOIN (
          SELECT user_id, MAX(created_at) AS mx FROM exercise_results
          WHERE lesson_id = ? GROUP BY user_id
        ) t ON t.user_id = er.user_id AND t.mx = er.created_at
        WHERE er.lesson_id = ?
      ) latest ON latest.user_id = u.id
      WHERE ce.class_id = ?
      ORDER BY (latest.id IS NOT NULL), u.name ASC
    `, [a.lesson_id, a.lesson_id, a.class_id]);

    res.json({ assignment: a, students });
  } catch (err) {
    console.error('Assignment submissions error:', err);
    res.status(500).json({ error: assignmentErrorMessage(err, 'Lỗi tải tình trạng nộp bài.') });
  }
});

// GET /admin/translate-submissions?lesson_id=1.1&class_id=3
// Giáo viên xem danh sách bài dịch đã nộp của cả lớp.
// class_id nằm ở query string nên teacherScope không tự bắt được (qua: null) — route này PHẢI
// tự kiểm tra lớp có thuộc giáo viên đang gọi không, nếu không giáo viên A gõ tay class_id của
// giáo viên B là xem được bài dịch + tên/email học viên lớp đó (đúng lỗi CLAUDE.md 4.17 cảnh báo).
router.get('/translate-submissions', async (req, res) => {
  try {
    const { lesson_id, class_id } = req.query;
    if (!lesson_id || !class_id) return res.status(400).json({ error: 'Thiếu lesson_id hoặc class_id.' });

    // Giáo viên: đúng lớp mình phụ trách. Quản trị trung tâm: lớp phải thuộc tổ chức mình.
    if (req.locOrg) {
      const dk = gvId(req) ? 'teacher_id = ?' : 'org_id = ?';
      const gt = gvId(req) || req.orgId;
      const [[lop]] = await pool.query(`SELECT 1 FROM classes WHERE id = ? AND ${dk}`, [class_id, gt]);
      if (!lop) return res.status(403).json({ error: 'Lớp này không thuộc phạm vi bạn quản lý.' });
    }

    // Số học viên trong lớp (để tính ai chưa nộp)
    const [[{ enrolled }]] = await pool.query(
      'SELECT COUNT(*) AS enrolled FROM class_enrollments WHERE class_id = ?',
      [class_id]
    );

    // Chỉ lấy bản nộp MỚI NHẤT của mỗi (học viên, mode) — làm lại nhiều lần thì bản cũ vẫn còn
    // trong DB (append-only, xem translate_submissions ở init-db.js) nhưng không hiện trùng ở đây,
    // đúng nguyên tắc "chỉ tính lần nộp mới nhất" đã áp dụng cho mọi thống kê khác (CLAUDE.md 4.15).
    const [rows] = await pool.query(`
      SELECT ts.id, ts.user_id, ts.lesson_id, ts.mode,
             ts.answers_json, ts.auto_score, ts.submitted_at,
             ts.teacher_score, ts.teacher_comment, ts.reviewed_at,
             u.name AS student_name, u.email AS student_email
      FROM translate_submissions ts
      JOIN users u ON u.id = ts.user_id
      JOIN class_enrollments ce ON ce.user_id = ts.user_id AND ce.class_id = ?
      WHERE ts.lesson_id = ?
        AND ts.id = (
          SELECT ts2.id FROM translate_submissions ts2
          WHERE ts2.user_id = ts.user_id AND ts2.lesson_id = ts.lesson_id AND ts2.mode = ts.mode
          ORDER BY ts2.submitted_at DESC, ts2.id DESC LIMIT 1
        )
      ORDER BY ts.teacher_score IS NULL DESC, ts.submitted_at DESC
    `, [class_id, lesson_id]);

    res.json({ submissions: rows, enrolled });
  } catch (err) {
    console.error('Translate submissions admin error:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách bài dịch.' });
  }
});

// PUT /admin/translate-submissions/:id/review — giáo viên/admin chấm điểm 1 bài dịch.
// Phạm vi được kiểm tại teacherScope (qua: 'bai-dich', xem middleware/roles.js): học viên nộp
// bài phải thuộc 1 lớp do giáo viên đang gọi phụ trách, nếu không trả 403 trước khi chạy tới đây.
router.put('/translate-submissions/:id/review', async (req, res) => {
  try {
    const { teacher_score, teacher_comment } = req.body;
    if (teacher_score === undefined || teacher_score === null || isNaN(Number(teacher_score))) {
      return res.status(400).json({ error: 'Vui lòng nhập điểm số.' });
    }
    const score = Math.max(0, Math.min(100, parseInt(teacher_score)));
    const [r] = await pool.query(
      `UPDATE translate_submissions SET teacher_score=?, teacher_comment=?, reviewed_at=NOW(), reviewed_by=? WHERE id=?`,
      [score, teacher_comment || '', req.userId, req.params.id]
    );
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy bài nộp.' });
    res.json({ message: 'Đã chấm điểm thành công.', teacher_score: score });
  } catch (err) {
    console.error('Review translate submission error:', err);
    res.status(500).json({ error: 'Lỗi chấm bài.' });
  }
});

// Gửi email nhắc những em CHƯA nộp bài này.
// Ghi lại vào assignment_reminders để lần bấm sau không spam lại em đã được nhắc — trừ khi
// giáo viên chủ động chọn gửi lại (force = true).
router.post('/assignments/:id/remind', async (req, res) => {
  try {
    const force = !!req.body?.force;
    const [aRows] = await pool.query(
      `SELECT a.*, c.name AS class_name FROM assignments a
       JOIN classes c ON c.id = a.class_id WHERE a.id = ?`,
      [req.params.id]
    );
    if (!aRows.length) return res.status(404).json({ error: 'Không tìm thấy bài đã giao.' });
    const a = aRows[0];

    // Điều kiện "chưa được nhắc" chỉ thêm khi không phải gửi lại — dùng placeholder ? chứ không
    // nối chuỗi id vào SQL.
    const skipRemindedSql = force
      ? ''
      : 'AND NOT EXISTS (SELECT 1 FROM assignment_reminders ar WHERE ar.assignment_id = ? AND ar.user_id = u.id)';
    const params = force ? [a.class_id, a.lesson_id] : [a.class_id, a.lesson_id, a.id];
    const [missing] = await pool.query(`
      SELECT u.id, u.name, u.email
      FROM class_enrollments ce
      JOIN users u ON u.id = ce.user_id
      WHERE ce.class_id = ?
        AND NOT EXISTS (SELECT 1 FROM exercise_results er WHERE er.user_id = u.id AND er.lesson_id = ?)
        ${skipRemindedSql}
      ORDER BY u.name ASC
    `, params);

    if (missing.length === 0) {
      return res.json({ message: force ? 'Không còn em nào chưa nộp.' : 'Không có em nào cần nhắc (đã nhắc hết hoặc đã nộp đủ).', sent: 0, failed: 0 });
    }

    // Thiếu RESEND_API_KEY thì KHÔNG ghi assignment_reminders và KHÔNG báo "đã gửi": ghi vào là
    // lần bấm sau sẽ bỏ qua đúng những em chưa hề nhận được mail nào.
    if (!isEmailConfigured()) {
      const ly_do = emailStatus() === 'dry-run'
        ? 'Máy chủ đang bật EMAIL_DRY_RUN=true (chế độ chạy thử, cố ý không gửi mail thật)'
        : 'Máy chủ chưa cấu hình RESEND_API_KEY';
      console.warn(`Nhắc nộp bài: ${ly_do} — ${missing.length} em CHƯA được gửi mail.`);
      return res.status(503).json({
        error: `${ly_do} nên chưa gửi được email (${missing.length} em đang chưa nộp).`,
      });
    }

    let sent = 0, failed = 0;
    for (const stu of missing) {
      const ok = await sendAssignmentReminderEmail(stu.email, {
        studentName: stu.name,
        className: a.class_name,
        lessonLabel: a.title || a.lesson_id,
        dueDate: a.due_date,
      });
      if (ok) {
        sent++;
        await pool.query(
          'INSERT INTO assignment_reminders (assignment_id, user_id) VALUES (?,?) ON DUPLICATE KEY UPDATE sent_at = NOW()',
          [a.id, stu.id]
        );
      } else {
        failed++;
      }
    }

    res.json({
      message: `Đã gửi nhắc ${sent} em${failed ? `, ${failed} em gửi lỗi (xem log server)` : ''}.`,
      sent, failed,
    });
  } catch (err) {
    console.error('Remind assignment error:', err);
    res.status(500).json({ error: assignmentErrorMessage(err, 'Lỗi gửi nhắc nộp bài.') });
  }
});

// =============================================
// BÁO CÁO LỚP (điểm + chuyên cần) — xuất cho phụ huynh
// =============================================
// Trả JSON, phía admin dựng thành CSV tải về. Cố ý KHÔNG sinh file Excel/PDF ở server: sẽ phải
// thêm thư viện nặng vào serverless function, trong khi CSV mở thẳng bằng Excel là đủ dùng.
// ?tu=YYYY-MM-DD&den=YYYY-MM-DD để lọc theo tháng.
router.get('/classes/:id/report', async (req, res) => {
  try {
    const classId = req.params.id;
    const from = req.query.tu || null;
    const to = req.query.den || null;

    const [cRows] = await pool.query('SELECT id, name FROM classes WHERE id = ?', [classId]);
    if (!cRows.length) return res.status(404).json({ error: 'Không tìm thấy lớp.' });

    // Điều kiện khoảng thời gian áp cho buổi học; để trống = toàn bộ.
    const dateSql = (col) => `${from ? ` AND ${col} >= ?` : ''}${to ? ` AND ${col} <= ?` : ''}`;
    const dateParams = [...(from ? [from] : []), ...(to ? [to] : [])];

    const [[{ total_sessions }]] = await pool.query(
      `SELECT COUNT(*) AS total_sessions FROM class_sessions WHERE class_id = ?${dateSql('session_date')}`,
      [classId, ...dateParams]
    );

    const [students] = await pool.query(`
      SELECT u.id, u.name, u.email, u.phone,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.status = 'present'${dateSql('cs.session_date')}) AS attended,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.status = 'absent'${dateSql('cs.session_date')}) AS absent,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.is_late = 1${dateSql('cs.session_date')}) AS late,
        (SELECT COUNT(*) FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
          WHERE cs.class_id = ? AND ca.user_id = u.id AND ca.is_left_early = 1${dateSql('cs.session_date')}) AS left_early,
        0 AS exercises_done, NULL AS avg_score
      FROM class_enrollments ce
      JOIN users u ON u.id = ce.user_id
      WHERE ce.class_id = ?
      ORDER BY u.name ASC
    `, [
      classId, ...dateParams,
      classId, ...dateParams,
      classId, ...dateParams,
      classId, ...dateParams,
      classId,
    ]);

    // Điểm số tính RIÊNG một query rồi ghép vào, vì 2 lý do (2026-08-27):
    //   1. Bản trước không áp khoảng thời gian cho điểm — xuất báo cáo "tháng 8" mà điểm trung bình
    //      lại là điểm của cả đời học viên, phụ huynh đọc sẽ hiểu sai.
    //   2. Bản trước AVG cả những lần làm lại, trái nguyên tắc "chỉ tính lần nộp mới nhất của mỗi
    //      bài" đang dùng ở phân tích lỗi sai — em làm lại nhiều lần bị kéo điểm lệch.
    // Không nhét được vào subquery của câu trên vì MySQL không cho derived table tham chiếu u.id.
    const exDateSql = (col) => `${from ? ` AND DATE(${col}) >= ?` : ''}${to ? ` AND DATE(${col}) <= ?` : ''}`;
    const [scores] = await pool.query(`
      SELECT er.user_id,
        COUNT(*) AS exercises_done,
        ROUND(AVG(er.score_percent)) AS avg_score
      FROM exercise_results er
      INNER JOIN (
        SELECT e2.user_id, e2.lesson_id, MAX(e2.created_at) AS mx
        FROM exercise_results e2
        JOIN class_enrollments c2 ON c2.user_id = e2.user_id AND c2.class_id = ?
        WHERE 1 = 1${exDateSql('e2.created_at')}
        GROUP BY e2.user_id, e2.lesson_id
      ) t ON t.user_id = er.user_id AND t.lesson_id = er.lesson_id AND t.mx = er.created_at
      GROUP BY er.user_id
    `, [classId, ...dateParams]);

    const scoreByUser = new Map(scores.map(r => [r.user_id, r]));
    for (const st of students) {
      const sc = scoreByUser.get(st.id);
      st.exercises_done = sc ? sc.exercises_done : 0;
      st.avg_score = sc ? sc.avg_score : null;
    }

    res.json({
      class: cRows[0],
      from, to,
      total_sessions,
      students,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Class report error:', err);
    res.status(500).json({ error: 'Lỗi tạo báo cáo lớp.' });
  }
});

// =============================================
// PHÂN TÍCH LỖI SAI CHUNG CỦA LỚP
// =============================================
// Dữ liệu đã có sẵn trong exercise_results.details_json (snapshot từng câu). Ở đây gom lại theo
// từng câu hỏi để trả lời câu "buổi sau cần giảng lại phần nào" mà không phải mở từng bài từng em.
//
// Cố ý gom TRONG JAVASCRIPT chứ không bằng SQL JSON function: cấu trúc details_json có 2 dạng khác
// nhau (mảng cho luyện phát âm, {questions,answers} cho giáo trình), viết bằng SQL sẽ rất khó đọc
// và khó sửa. Khối lượng cũng nhỏ — một lớp chục em, mỗi em vài chục bài.
router.get('/classes/:id/mistakes', async (req, res) => {
  try {
    // Chỉ lấy LẦN NỘP MỚI NHẤT của mỗi (học viên, bài) — nếu tính cả các lần làm lại thì một em
    // chăm làm đi làm lại sẽ kéo lệch thống kê của cả lớp.
    const [rows] = await pool.query(`
      SELECT er.user_id, er.lesson_id, er.details_json
      FROM exercise_results er
      JOIN class_enrollments ce ON ce.user_id = er.user_id AND ce.class_id = ?
      INNER JOIN (
        SELECT e2.user_id, e2.lesson_id, MAX(e2.created_at) AS mx
        FROM exercise_results e2
        JOIN class_enrollments c2 ON c2.user_id = e2.user_id AND c2.class_id = ?
        GROUP BY e2.user_id, e2.lesson_id
      ) t ON t.user_id = er.user_id AND t.lesson_id = er.lesson_id AND t.mx = er.created_at
      WHERE er.details_json IS NOT NULL
    `, [req.params.id, req.params.id]);

    // key = lesson_id + '|' + nội dung câu hỏi
    const stats = new Map();
    let analysed = 0;

    for (const r of rows) {
      let d;
      try { d = JSON.parse(r.details_json); } catch { continue; }
      let items = [];
      if (Array.isArray(d)) {
        items = d.map(it => ({
          q: it.question,
          selected: typeof it.selected === 'number' ? it.selected : -1,
          correct: it.correctIdx,
          options: (it.options || []).map(o => (o && typeof o === 'object' ? o.text : o)),
        }));
      } else if (d && Array.isArray(d.questions)) {
        const ans = d.answers || [];
        items = d.questions.map((q, i) => ({
          // question = câu hỏi đầy đủ ("Từ 你好 có nghĩa là gì?"); prompt chỉ là từ/nghĩa trơ trọi
          // nên nếu lấy prompt, giáo viên nhìn bảng lỗi sai không biết đề hỏi gì (2026-08-27).
          q: q.question || q.prompt,
          selected: typeof ans[i] === 'number' ? ans[i] : -1,
          correct: q.correctIdx,
          options: (q.options || []).map(o => (o && typeof o === 'object' ? o.text : o)),
        }));
      }
      if (!items.length) continue;
      analysed++;

      for (const it of items) {
        if (it.q == null) continue;
        const key = `${r.lesson_id}|${it.q}`;
        if (!stats.has(key)) {
          stats.set(key, {
            lesson_id: r.lesson_id,
            question: it.q,
            attempts: 0,
            wrong: 0,
            correct_answer: it.options?.[it.correct] ?? '',
            wrongPicks: new Map(), // đáp án sai nào bị chọn nhiều nhất
          });
        }
        const st = stats.get(key);
        st.attempts++;
        const isWrong = it.selected < 0 || it.selected !== it.correct;
        if (isWrong) {
          st.wrong++;
          const picked = it.selected >= 0 ? (it.options?.[it.selected] ?? '?') : '(bỏ trống)';
          st.wrongPicks.set(picked, (st.wrongPicks.get(picked) || 0) + 1);
        }
      }
    }

    const result = [...stats.values()]
      .filter(s => s.wrong > 0)
      .map(s => {
        const top = [...s.wrongPicks.entries()].sort((a, b) => b[1] - a[1])[0];
        return {
          lesson_id: s.lesson_id,
          question: s.question,
          attempts: s.attempts,
          wrong: s.wrong,
          wrong_rate: Math.round((s.wrong / s.attempts) * 100),
          correct_answer: s.correct_answer,
          common_wrong_answer: top ? top[0] : '',
          common_wrong_count: top ? top[1] : 0,
        };
      })
      // Ưu tiên câu nhiều em sai nhất, rồi tới tỉ lệ sai
      .sort((a, b) => b.wrong - a.wrong || b.wrong_rate - a.wrong_rate)
      .slice(0, 25);

    res.json({ mistakes: result, analysed_submissions: analysed });
  } catch (err) {
    console.error('Class mistakes error:', err);
    res.status(500).json({ error: 'Lỗi phân tích lỗi sai của lớp.' });
  }
});

// =============================================
// SỔ NHẬN XÉT HỌC VIÊN (student_notes)
// =============================================
router.get('/students/:userId/notes', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT sn.id, sn.note, sn.created_at, sn.class_id, u.name AS author_name
      FROM student_notes sn
      LEFT JOIN users u ON u.id = sn.author_id
      WHERE sn.user_id = ?
      ORDER BY sn.created_at DESC
      LIMIT 100
    `, [req.params.userId]);
    res.json({ notes: rows });
  } catch (err) {
    // Chưa chạy migration thì trả rỗng để trang chi tiết học viên không vỡ.
    console.warn('Student notes unavailable:', err.code || err.message);
    res.json({ notes: [], unavailable: true });
  }
});

router.post('/students/:userId/notes', async (req, res) => {
  try {
    const { note, class_id } = req.body;
    const text = typeof note === 'string' ? note.trim() : '';
    if (!text) return res.status(400).json({ error: 'Nhận xét không được để trống.' });
    await pool.query(
      'INSERT INTO student_notes (user_id, class_id, author_id, note) VALUES (?,?,?,?)',
      [req.params.userId, class_id || null, req.userId, text]
    );
    res.status(201).json({ message: 'Đã lưu nhận xét.' });
  } catch (err) {
    console.error('Add student note error:', err);
    res.status(500).json({ error: assignmentErrorMessage(err, 'Lỗi lưu nhận xét.') });
  }
});

router.delete('/student-notes/:id', async (req, res) => {
  try {
    const [r] = await pool.query('DELETE FROM student_notes WHERE id = ?', [req.params.id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy nhận xét.' });
    res.json({ message: 'Đã xoá nhận xét.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xoá nhận xét.' });
  }
});

// -- Chi tiết ĐÚNG/SAI từng câu của 1 lần nộp bài (bài phát âm hoặc bài giáo trình) --
// Dùng cho nút "Xem chi tiết" ở trang chi tiết học viên: bài phát âm hiện luôn trong modal admin,
// bài giáo trình thì trang bài tập tương ứng (main.js, ?review=<id>) gọi route này để dựng lại
// đúng câu hỏi/lựa chọn học sinh đã làm. Chỉ admin gọi được (route nằm sau requireAdmin ở đầu file).
router.get('/exercise-results/:id', async (req, res) => {
  try {
    // teacher_review PHẢI có trong SELECT: modal chi tiết dùng nó để đổ sẵn nội dung vào ô nhận xét.
    // 2026-08-27 — trước đây thiếu cột này nên giáo viên lưu nhận xét xong, mở lại thì ô trống trơn,
    // tưởng là không lưu được (thực ra đã lưu, chỉ là không đọc ra để hiển thị).
    const [rows] = await pool.query(
      `SELECT id, user_id, lesson_id, total_questions, correct_answers, score_percent, time_seconds,
              created_at, details_json, teacher_review, review_read_at
       FROM exercise_results WHERE id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Không tìm thấy bài tập.' });
    const row = rows[0];
    let details = null;
    if (row.details_json) {
      try { details = JSON.parse(row.details_json); } catch { details = null; }
    }
    delete row.details_json;
    res.json({ ...row, details });
  } catch (err) {
    console.error('Exercise result detail error:', err);
    res.status(500).json({ error: 'Lỗi tải chi tiết bài tập.' });
  }
});

router.get('/seed', async (req, res) => {
  try {
    const duongdaiTitles = [
      "Bài 1.1 歡迎你來臺灣！", "Bài 1.2 歡迎你來臺灣！", "Bài 2.1 我的家人", "Bài 2.2 我的家人",
      "Bài 3.1 週末做什麼？", "Bài 3.2 週末做什麼？", "Bài 4.1 請問一共多少錢？", "Bài 4.2 請問一共多少錢？",
      "Bài 5.1 牛肉麵真好吃", "Bài 5.2 牛肉麵真好吃", "Bài 6.1 他們學校在山上", "Bài 6.2 他們學校在山上",
      "Bài 7.1 早上九點去KTV", "Bài 7.2 早上九點去KTV", "Bài 8.1 坐火車去臺南", "Bài 8.2 坐火車去臺南",
      "Bài 9.1 放假去哪裡玩？", "Bài 9.2 放假去哪裡玩？", "Bài 10.1 臺灣的水果很好吃", "Bài 10.2 臺灣的水果很好吃",
      "Bài 11.1 我要租房子", "Bài 11.2 我要租房子", "Bài 12.1 你計畫在臺灣學多久的中文？", "Bài 12.2 你計畫在臺灣學多久的中文？",
      "Bài 13.1 生日快樂", "Bài 13.2 生日快樂", "Bài 14.1 天氣這麼冷！", "Bài 14.2 天氣這麼冷！",
      "Bài 15.1 我很不舒服", "Bài 15.2 我很不舒服"
    ];

    const sessionsData = [];
    for (let i = 1; i <= 3; i++) {
      sessionsData.push({ topic: `Buổi ${i}. Phát âm`, course_type: 'Phát Âm' });
    }
    let b = 4;
    for (const t of duongdaiTitles) {
      sessionsData.push({ topic: `Buổi ${b}. ${t}`, course_type: 'Đương Đại 1' });
      b++;
    }

    const [classes] = await pool.query('SELECT id FROM classes WHERE name IN ("K1", "K2")');
    for (const c of classes) {
      for (const s of sessionsData) {
        await pool.query(
          'INSERT INTO class_sessions (class_id, session_date, topic, course_type, notes) VALUES (?, NULL, ?, ?, "")',
          [c.id, s.topic, s.course_type]
        );
      }
    }
    res.json({ message: 'Seeded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =============================================================
// THIẾT BỊ ĐĂNG NHẬP — theo dõi chia sẻ tài khoản (2026-09-15)
// =============================================================
// Chính sách: tối đa 2 thiết bị/tài khoản; máy thứ 3 bị chặn và ghi vào `device_alerts`.
// Xem server/utils/thiet-bi.js. Khu này để admin trả lời được câu "em đổi máy rồi, mở giúp em"
// mà không phải vào thẳng DB.
//
// CHỈ admin nền tảng: danh sách cảnh báo trải khắp mọi tổ chức, và gỡ thiết bị là thao tác đụng
// tới tài khoản người khác.

/** Hàng chờ cảnh báo: ai đang bị chặn vì quá số thiết bị. */
router.get('/thiet-bi/canh-bao', requireAdminOnly, async (req, res) => {
  try {
    const chuaXuLy = String(req.query.trang_thai || 'chua') === 'chua';
    const [rows] = await pool.query(
      `SELECT d.id, d.user_id, d.ten, d.user_agent, d.ip, d.so_dang_co, d.tao_luc, d.da_xu_ly,
              u.name, u.email
         FROM device_alerts d JOIN users u ON u.id = d.user_id
        ${chuaXuLy ? 'WHERE d.da_xu_ly = FALSE' : ''}
        ORDER BY d.tao_luc DESC LIMIT 100`);
    // Gộp theo tài khoản: một người bị chặn 20 lần trong ngày là MỘT vấn đề, không phải 20.
    // Để phẳng thì hàng chờ đầy những dòng trùng nhau và admin bỏ sót ca khác.
    const theoNguoi = new Map();
    for (const r of rows) {
      const k = r.user_id;
      if (!theoNguoi.has(k)) theoNguoi.set(k, { ...r, so_lan_bi_chan: 0, ids: [] });
      const g = theoNguoi.get(k);
      g.so_lan_bi_chan++;
      g.ids.push(r.id);
    }
    res.json({ canh_bao: [...theoNguoi.values()], tran: TRAN_THIET_BI });
  } catch (err) {
    if (err.code === 'ER_NO_SUCH_TABLE') return res.json({ canh_bao: [], tran: TRAN_THIET_BI, chua_migrate: true });
    console.error('Lỗi tải cảnh báo thiết bị:', err);
    res.status(500).json({ error: 'Lỗi tải cảnh báo thiết bị.' });
  }
});

/** Thiết bị đang hoạt động của một tài khoản. */
router.get('/thiet-bi/:userId', requireAdminOnly, async (req, res) => {
  try {
    res.json({ thiet_bi: await dsThietBi(req.params.userId), tran: TRAN_THIET_BI });
  } catch (err) {
    console.error('Lỗi tải thiết bị:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách thiết bị.' });
  }
});

/** Gỡ một thiết bị để học viên đăng nhập được trên máy mới. */
router.delete('/thiet-bi/:userId/:id', requireAdminOnly, async (req, res) => {
  try {
    const ok = await goThietBi(req.params.userId, req.params.id, req.userId);
    if (!ok) return res.status(404).json({ error: 'Không tìm thấy thiết bị.' });
    // Gỡ máy xong thì hàng chờ cảnh báo của người đó coi như đã xử lý — nếu không, cùng một ca
    // cứ nằm lại đó và admin không biết cái nào còn phải làm.
    await pool.query('UPDATE device_alerts SET da_xu_ly = TRUE, xu_ly_boi = ?, xu_ly_luc = NOW() WHERE user_id = ? AND da_xu_ly = FALSE',
      [req.userId, req.params.userId]).catch(() => {});
    res.json({ message: 'Đã gỡ thiết bị. Học viên có thể đăng nhập trên máy mới.' });
  } catch (err) {
    console.error('Lỗi gỡ thiết bị:', err);
    res.status(500).json({ error: 'Lỗi gỡ thiết bị.' });
  }
});

/** Bỏ qua cảnh báo mà KHÔNG gỡ máy nào (ví dụ: xác minh đúng là chia sẻ tài khoản). */
router.post('/thiet-bi/canh-bao/:userId/da-xu-ly', requireAdminOnly, async (req, res) => {
  try {
    await pool.query('UPDATE device_alerts SET da_xu_ly = TRUE, xu_ly_boi = ?, xu_ly_luc = NOW() WHERE user_id = ? AND da_xu_ly = FALSE',
      [req.userId, req.params.userId]);
    res.json({ message: 'Đã đánh dấu xử lý.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật.' });
  }
});

export default router;

