// =============================================================
// PHÂN QUYỀN KHU QUẢN TRỊ (/api/admin/*)
// =============================================================
// BỐN vai trò trong `users.role` (mở rộng 2026-09-09 khi hệ thống bắt đầu cho trung tâm thuê):
//
//   admin     — chủ NỀN TẢNG. Toàn quyền, xuyên mọi tổ chức. Chỉ tính là admin nền tảng khi tài
//               khoản thuộc tổ chức gốc (org_id = 1); xem `laAdminNenTang` bên dưới.
//   org_admin — quản trị viên của MỘT TRUNG TÂM. Toàn quyền TRONG tổ chức mình: lớp, giáo viên,
//               học viên, giao bài, báo cáo, cấp quyền học cho học viên từ hạn mức đã mua.
//               KHÔNG thấy tổ chức khác, KHÔNG đụng nội dung nền tảng (từ vựng, đề thi, blog).
//   teacher   — chỉ thao tác trên lớp mình phụ trách (classes.teacher_id = mình).
//   student   — không vào được khu này.
//
// Vì sao phải có org_admin: trước đây muốn cho trung tâm tự quản lý lớp thì chỉ còn cách bật
// role='admin', tức trao luôn quyền xoá tài khoản của mọi người và sửa từ vựng của cả nền tảng —
// không cho thuê được hệ thống theo cách đó.
//
// NGUYÊN TẮC THIẾT KẾ — ĐỪNG ĐỔI khi thêm route mới:
//   Với MỌI vai trò trừ admin nền tảng, mặc định là CẤM. Muốn cho phép thì khai báo tường minh
//   trong bảng QUYEN bên dưới. Cách ngược lại ("mặc định cho phép rồi đi chặn từng route") đã bị
//   loại bỏ có chủ ý: khu admin đang có hơn 60 route, quên một cái là trung tâm này đọc được dữ
//   liệu của trung tâm kia. Quên khai báo thì hậu quả là 403 — phiền nhưng an toàn.
import pool from '../config/db.js';

/** Tổ chức gốc (chính chủ dự án). Tài khoản admin của tổ chức này mới là admin NỀN TẢNG. */
export const ORG_NEN_TANG = 1;

/** Nạp vai trò + tổ chức của người đang gọi. Dùng sau requireAuth. */
export async function loadRole(req, res, next) {
  if (req.role && req.orgId) return next();   // router khác đã nạp rồi thì không truy vấn lại
  try {
    let rows;
    try {
      [rows] = await pool.query('SELECT role, is_admin, org_id FROM users WHERE id = ?', [req.userId]);
    } catch (err) {
      // Cột org_id chỉ có sau migration-to-chuc-quyen.sql. Chưa migrate thì chính câu SELECT ném
      // ER_BAD_FIELD_ERROR (không phải trả NULL) — đọc phần còn lại rồi coi như tổ chức gốc bên dưới.
      if (err?.code !== 'ER_BAD_FIELD_ERROR') throw err;
      [rows] = await pool.query('SELECT role, is_admin FROM users WHERE id = ?', [req.userId]);
      req.chuaCoOrg = true;   // phamViQuanTri đọc cờ này để KHÔNG bật lọc org_id (cột chưa có)
    }
    if (!rows.length) return res.status(403).json({ error: 'Tài khoản không tồn tại.' });
    // is_admin là cột cũ, vẫn được đồng bộ với role — ưu tiên role, rơi về is_admin cho chắc.
    req.role = rows[0].role || (rows[0].is_admin ? 'admin' : 'student');
    // Cột org_id chỉ có sau migration-to-chuc-quyen.sql; DB chưa migrate thì coi như tổ chức gốc,
    // tức hành vi y hệt trước đây — không khoá cứng hệ thống đang chạy chỉ vì thiếu một cột.
    req.orgId = rows[0].org_id || ORG_NEN_TANG;
    // Một tài khoản role='admin' nhưng thuộc trung tâm KHÔNG được coi là admin nền tảng: nếu
    // không, chỉ cần đặt nhầm vai trò cho một quản trị viên trung tâm là họ thấy cả hệ thống.
    req.laAdminNenTang = req.role === 'admin' && req.orgId === ORG_NEN_TANG;
    next();
  } catch (err) {
    console.error('Lỗi đọc vai trò:', err);
    res.status(500).json({ error: 'Lỗi kiểm tra quyền truy cập.' });
  }
}

/** Cho phép mọi nhân sự: admin nền tảng, quản trị trung tâm, giáo viên. */
export function requireStaff(req, res, next) {
  if (['admin', 'org_admin', 'teacher'].includes(req.role)) return next();
  res.status(403).json({ error: 'Bạn không có quyền truy cập trang quản trị.' });
}

/** CHỈ admin nền tảng — khu nội dung dùng chung (từ vựng, đề thi, hội thoại, blog, seed). */
export function requireAdminOnly(req, res, next) {
  if (req.laAdminNenTang) return next();
  res.status(403).json({ error: 'Chức năng này chỉ dành cho quản trị viên hệ thống.' });
}

/** Quản trị trung tâm trở lên (dùng cho khu quản lý giáo viên / cấp quyền học trong tổ chức). */
export function requireOrgAdmin(req, res, next) {
  if (req.laAdminNenTang || req.role === 'org_admin') return next();
  res.status(403).json({ error: 'Chức năng này dành cho quản trị viên.' });
}

// ------------------------------------------------------------------
// BẢNG QUYỀN
//   vai : vai trò được phép dùng luật này
//   qua : cách xác định tài nguyên để kiểm sở hữu
//         'lop' | 'buoi' | 'baigiao' | 'hocvien' | 'nhanxet' | 'ketqua-bt' | 'ketqua-thi'
//         | 'bai-dich' | 'giaovien' | null
//         null = không gắn với tài nguyên cụ thể; route TỰ lọc theo req.orgId / req.teacherId.
//   nhom: chỉ số nhóm bắt trong regex chứa id cần tra
// ------------------------------------------------------------------
const GV = 'teacher';
const QT = 'org_admin';

// Ngoại lệ nằm TRONG khu được phép nhưng vẫn phải cấm — xét TRƯỚC bảng cho phép.
// /classes/:id/available-students tìm trong toàn bộ người dùng để chọn thêm vào lớp; giáo viên
// dùng được là dò ra tên/email của mọi học viên, kể cả lớp người khác. Quản trị trung tâm thì
// được — nhưng route phải tự lọc theo org (xem admin.js).
const CAM = [
  { vai: [GV], re: /^\/classes\/\d+\/available-students$/ },
];

const QUYEN = [
  // --- xem chung ---
  { vai: [GV, QT], method: ['GET'], re: /^\/stats$/, qua: null },
  // Danh sách học viên chưa xếp lớp: CHỈ quản trị trung tâm, không cho giáo viên — cùng lý do
  // với /available-students ở bảng CAM trên (giáo viên dò được cả danh bạ học viên của trung tâm).
  // Route tự lọc theo req.orgId.
  { vai: [QT], method: ['GET'], re: /^\/users-unassigned$/, qua: null },
  { vai: [GV, QT], method: ['GET'], re: /^\/classes$/, qua: null },
  { vai: [GV, QT], method: ['GET'], re: /^\/classes\/(\d+)$/, qua: 'lop', nhom: 1 },

  // --- vòng đời LỚP: chỉ quản trị trung tâm. Giáo viên dạy lớp, không mở/xoá lớp. ---
  { vai: [QT], method: ['POST'], re: /^\/classes$/, qua: null },
  { vai: [QT], method: ['PUT', 'DELETE'], re: /^\/classes\/(\d+)$/, qua: 'lop', nhom: 1 },

  // --- mọi thứ BÊN TRONG lớp: buổi học, điểm danh, bài giao, học viên, báo cáo, lỗi sai ---
  { vai: [GV, QT], method: ['GET', 'POST', 'PUT', 'DELETE'], re: /^\/classes\/(\d+)\/.+$/, qua: 'lop', nhom: 1 },
  { vai: [GV, QT], method: ['GET', 'PUT', 'DELETE'], re: /^\/sessions\/(\d+)(\/.*)?$/, qua: 'buoi', nhom: 1 },
  { vai: [GV, QT], method: ['GET', 'POST', 'PUT', 'DELETE'], re: /^\/assignments\/(\d+)(\/.*)?$/, qua: 'baigiao', nhom: 1 },
  { vai: [GV, QT], method: ['GET', 'POST'], re: /^\/students\/(\d+)\/notes$/, qua: 'hocvien', nhom: 1 },
  { vai: [GV, QT], method: ['DELETE'], re: /^\/student-notes\/(\d+)$/, qua: 'nhanxet', nhom: 1 },
  { vai: [GV, QT], method: ['GET', 'POST'], re: /^\/exercise-results\/(\d+)(\/review)?$/, qua: 'ketqua-bt', nhom: 1 },
  { vai: [GV, QT], method: ['GET', 'POST'], re: /^\/exam-results\/(\d+)(\/review)?$/, qua: 'ketqua-thi', nhom: 1 },
  // class_id nằm ở query string chứ không trong path -> regex không bắt được; route tự lọc.
  { vai: [GV, QT], method: ['GET'], re: /^\/translate-submissions$/, qua: null },
  { vai: [GV, QT], method: ['PUT'], re: /^\/translate-submissions\/(\d+)\/review$/, qua: 'bai-dich', nhom: 1 },

  // --- QUẢN LÝ GIÁO VIÊN trong tổ chức: chỉ quản trị trung tâm ---
  { vai: [QT], method: ['GET', 'POST'], re: /^\/teachers$/, qua: null },
  { vai: [QT], method: ['GET'], re: /^\/teachers-options$/, qua: null },
  { vai: [QT], method: ['GET', 'PUT', 'DELETE', 'POST'], re: /^\/teachers\/(\d+)(\/.*)?$/, qua: 'giaovien', nhom: 1 },
  { vai: [QT], method: ['DELETE'], re: /^\/teacher-notes\/(\d+)$/, qua: null },
  { vai: [QT], method: ['DELETE'], re: /^\/teacher-reviews\/(\d+)$/, qua: null },

  // --- BÁN HÀNG ---
  // Quản trị trung tâm chỉ ĐỌC quyền học (để trả lời "sao em này không mở được bài?"). Cấp và
  // thu hồi là việc của admin nền tảng: quyền chính là thứ đem bán, trung tâm tự cấp cho mình
  // được thì không còn gì để bán. Route cũng tự chặn lại bằng requireAdminOnly.
  { vai: [QT], method: ['GET'], re: /^\/quyen-hoc(\/.*)?$/, qua: null },
  { vai: [GV, QT], method: ['GET'], re: /^\/to-chuc\/cua-toi$/, qua: null },

  // --- HỒ SƠ DU HỌC (2026-09-15) ---
  // CHỈ quản trị trung tâm. Giáo viên cố ý KHÔNG có mặt ở đây: hồ sơ chứa CCCD, hộ chiếu, địa chỉ
  // và toàn bộ tiền nong của học sinh — người dạy lớp không cần thấy. Thêm GV vào đây thì phải
  // tách riêng phần tiền trước, đừng mở cả cụm.
  // Không dùng `qua` để kiểm sở hữu: mọi route trong du-hoc.js đã tự lọc `org_id` ngay trong câu
  // SELECT (kể cả khi tra qua id khoản thu / id giấy tờ), nên thêm một vòng truy vấn nữa ở đây chỉ
  // tốn công mà không chặn thêm được gì.
  { vai: [QT], method: ['GET', 'POST', 'PUT', 'DELETE'], re: /^\/du-hoc(\/.*)?$/, qua: null },

  // --- Đề bài tập / bài kiểm tra tự soạn (2026-09-17) ---
  // Chủ dự án chốt: GIÁO VIÊN tạo được đề, nhưng chỉ giao cho lớp mình phụ trách.
  // ⚠️ PHẢI tách làm nhiều dòng, đừng gộp thành một dòng `qua: null`:
  //    - Tạo đề mới / xem danh sách: không có id để kiểm, route tự lọc org_id.
  //    - Thao tác lên MỘT đề: `qua: 'de'` — giáo viên chỉ đụng đề mình tạo.
  //    - Giao đề cho lớp: class_id nằm trong BODY nên regex không bắt được -> route TỰ gọi
  //      `lopThuocPhamVi`. Gộp chung `qua: null` mà quên bước đó là giáo viên A giao đề vào lớp
  //      của giáo viên B (đúng loại lỗi 4.17 và 4.22 đã cảnh báo).
  { vai: [GV, QT], method: ['GET', 'POST'], re: /^\/de-bai$/, qua: null },
  { vai: [GV, QT], method: ['GET'], re: /^\/de-bai\/hoc-vien-chon$/, qua: null },
  { vai: [GV, QT], method: ['GET', 'PUT', 'DELETE', 'POST'], re: /^\/de-bai\/(\d+)(\/.*)?$/, qua: 'de', nhom: 1 },
  { vai: [GV, QT], method: ['PUT', 'DELETE'], re: /^\/de-cau-hoi\/(\d+)$/, qua: null },
  { vai: [GV, QT], method: ['DELETE'], re: /^\/de-giao\/(\d+)$/, qua: null },
  { vai: [GV, QT], method: ['GET', 'POST'], re: /^\/de-bai-lam\/(\d+)(\/.*)?$/, qua: 'bailam', nhom: 1 },

  // --- Sổ thu chi + ký túc xá: chỉ QUẢN TRỊ, như khu du học (tiền nong + thông tin cá nhân) ---
  { vai: [QT], method: ['GET', 'POST', 'PUT', 'DELETE'], re: /^\/quy(\/.*)?$/, qua: null },
  { vai: [QT], method: ['GET', 'POST', 'PUT', 'DELETE'], re: /^\/ktx(\/.*)?$/, qua: null },
];

// ------------------------------------------------------------------ kiểm sở hữu
export async function lopThuocPhamVi(classId, req) {
  // Giáo viên: đúng lớp mình phụ trách. Quản trị trung tâm: mọi lớp của tổ chức mình.
  const dk = req.role === 'teacher' ? 'AND teacher_id = ?' : 'AND org_id = ?';
  const gt = req.role === 'teacher' ? req.userId : req.orgId;
  const [r] = await pool.query(`SELECT 1 FROM classes WHERE id = ? ${dk}`, [classId, gt]);
  return r.length > 0;
}

export async function hocVienThuocPhamVi(userId, req) {
  if (req.role === 'org_admin') {
    const [r] = await pool.query('SELECT 1 FROM users WHERE id = ? AND org_id = ?', [userId, req.orgId]);
    return r.length > 0;
  }
  const [r] = await pool.query(
    `SELECT 1 FROM class_enrollments ce JOIN classes c ON c.id = ce.class_id
      WHERE ce.user_id = ? AND c.teacher_id = ? LIMIT 1`,
    [userId, req.userId]
  );
  return r.length > 0;
}

async function duocPhep(qua, id, req) {
  switch (qua) {
    case 'lop':
      return lopThuocPhamVi(id, req);
    case 'buoi': {
      const [r] = await pool.query('SELECT class_id FROM class_sessions WHERE id = ?', [id]);
      return r.length ? lopThuocPhamVi(r[0].class_id, req) : false;
    }
    case 'baigiao': {
      const [r] = await pool.query('SELECT class_id FROM assignments WHERE id = ?', [id]);
      return r.length ? lopThuocPhamVi(r[0].class_id, req) : false;
    }
    case 'hocvien':
      return hocVienThuocPhamVi(id, req);
    case 'giaovien': {
      // Giáo viên phải cùng tổ chức. Không kiểm điều này thì quản trị trung tâm A sửa/hạ vai trò
      // được giáo viên của trung tâm B.
      const [r] = await pool.query("SELECT 1 FROM users WHERE id = ? AND org_id = ? AND role IN ('teacher','org_admin')", [id, req.orgId]);
      return r.length > 0;
    }
    case 'nhanxet': {
      const [r] = await pool.query('SELECT user_id FROM student_notes WHERE id = ?', [id]);
      return r.length ? hocVienThuocPhamVi(r[0].user_id, req) : false;
    }
    case 'ketqua-bt': {
      const [r] = await pool.query('SELECT user_id FROM exercise_results WHERE id = ?', [id]);
      return r.length ? hocVienThuocPhamVi(r[0].user_id, req) : false;
    }
    case 'ketqua-thi': {
      const [r] = await pool.query('SELECT user_id FROM exam_results WHERE id = ?', [id]);
      return r.length ? hocVienThuocPhamVi(r[0].user_id, req) : false;
    }
    case 'de': {
      // Giáo viên chỉ đụng được đề CHÍNH MÌNH tạo; quản trị trung tâm đụng mọi đề của tổ chức.
      // Cho giáo viên sửa đề của đồng nghiệp thì một người đổi đáp án là bài đã chấm của lớp
      // khác sai theo mà không ai hay.
      const [r] = await pool.query('SELECT org_id, tao_boi FROM de_bai WHERE id = ?', [id]);
      if (!r.length || r[0].org_id !== req.orgId) return false;
      return req.role === 'teacher' ? r[0].tao_boi === req.userId : true;
    }
    case 'bailam': {
      // Bài làm: phải là học viên thuộc phạm vi mình (giáo viên = học viên lớp mình phụ trách).
      const [r] = await pool.query('SELECT user_id FROM de_bai_lam WHERE id = ?', [id]);
      return r.length ? hocVienThuocPhamVi(r[0].user_id, req) : false;
    }
    case 'bai-dich': {
      const [r] = await pool.query('SELECT user_id FROM translate_submissions WHERE id = ?', [id]);
      return r.length ? hocVienThuocPhamVi(r[0].user_id, req) : false;
    }
    default:
      return false;
  }
}

/**
 * Chặn ở hai tầng: route có được phép với vai trò này không, và tài nguyên có thuộc phạm vi
 * (tổ chức / lớp phụ trách) của người gọi không. Admin nền tảng đi thẳng.
 * Đặt SAU requireStaff.
 *
 * Route tự lọc thì đọc:
 *   req.orgId      — luôn có
 *   req.teacherId  — id giáo viên, hoặc null nếu không phải giáo viên
 *   req.locOrg     — true khi PHẢI lọc theo tổ chức (mọi vai trò trừ admin nền tảng)
 */
export async function phamViQuanTri(req, res, next) {
  req.teacherId = req.role === 'teacher' ? req.userId : null;
  // chuaCoOrg: DB chưa migrate-to-chuc-quyen — mọi tài khoản đều thuộc tổ chức gốc, không có gì
  // để lọc, mà bật lọc là mọi truy vấn có `org_id = ?` ném ER_BAD_FIELD_ERROR -> 500 cho giáo viên.
  req.locOrg = !req.laAdminNenTang && !req.chuaCoOrg;
  if (req.laAdminNenTang) return next();

  const duong = req.path.replace(/\/+$/, '') || '/';
  const tuChoi = () => res.status(403).json({ error: 'Bạn không có quyền dùng chức năng này.' });

  if (CAM.some((c) => c.vai.includes(req.role) && c.re.test(duong))) return tuChoi();

  const luat = QUYEN.find((l) => l.vai.includes(req.role) && l.method.includes(req.method) && l.re.test(duong));
  if (!luat) return tuChoi();

  if (!luat.qua) return next();

  try {
    const id = duong.match(luat.re)[luat.nhom];
    if (!(await duocPhep(luat.qua, id, req))) {
      // Cố ý dùng CHUNG một thông báo cho "không tồn tại" và "không thuộc phạm vi của bạn" — tách
      // ra thì có thể dò được hệ thống đang có những lớp / học viên / trung tâm nào.
      return res.status(403).json({ error: 'Nội dung này không thuộc phạm vi bạn quản lý.' });
    }
    next();
  } catch (err) {
    console.error('Lỗi kiểm tra phạm vi quản trị:', err);
    res.status(500).json({ error: 'Lỗi kiểm tra quyền truy cập.' });
  }
}

/**
 * Tên cũ, giữ để không phải sửa đồng loạt nơi gọi. Nội dung nay bao gồm cả phạm vi TỔ CHỨC chứ
 * không chỉ phạm vi giáo viên — dùng `phamViQuanTri` cho mã mới.
 * @deprecated
 */
export const teacherScope = phamViQuanTri;
