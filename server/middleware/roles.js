// =============================================================
// PHÂN QUYỀN KHU QUẢN TRỊ (/api/admin/*)
// =============================================================
// NĂM vai trò trong `users.role`:
//
//   admin   — quản trị trung tâm. Toàn quyền: lớp, giáo viên, học viên, giao bài, báo cáo,
//             hồ sơ du học, sổ thu chi, ký túc xá, tạo mọi loại tài khoản.
//   ho_so   — quản lý hồ sơ. Chỉ phần du học của RIÊNG mình: hồ sơ mình phụ trách, tài khoản
//             mình tạo, khoản thu của hồ sơ đó, chỗ ở ký túc xá của hồ sơ đó.
//   sale    — y hệt `ho_so` về quyền, tách vai trò để báo cáo và phân công đọc được ai là ai.
//   teacher — chỉ thao tác trên lớp mình phụ trách (classes.teacher_id = mình).
//   student — không vào được khu này.
//
// PHẠM VI của sale / quản lý hồ sơ suy ra từ ba cột đã có sẵn, không có bảng phân công riêng:
//   du_hoc_ho_so.tu_van_id   — hồ sơ thuộc về ai (tự gán khi chính họ tạo)
//   users.created_by         — tài khoản do ai tạo
//   quy_phieu.nguoi_lap_id   — phiếu thu/chi do ai lập
// Ký túc xá và khoản thu học phí không có cột người phụ trách: chúng đi qua `ho_so_id` rồi
// mới tới `tu_van_id`. Một chỗ ở KHÔNG gắn hồ sơ nào thì chỉ admin thấy — cố ý, vì không có
// đường nào suy ra chủ sở hữu và đoán bừa ở đây là cho nhầm người xem tiền của người khác.
//
// NGUYÊN TẮC THIẾT KẾ — ĐỪNG ĐỔI khi thêm route mới:
//   Với giáo viên, mặc định là CẤM. Muốn cho phép thì khai báo tường minh trong bảng QUYEN bên
//   dưới. Cách ngược lại ("mặc định cho phép rồi đi chặn từng route") đã bị loại bỏ có chủ ý:
//   khu admin đang có hơn 50 route, quên một cái là giáo viên này đọc được lớp của giáo viên
//   kia. Quên khai báo thì hậu quả là 403 — phiền nhưng an toàn.
import pool from '../config/db.js';

/** Cơ sở mặc định — mọi bản ghi đều thuộc về nó. */
export const ORG_MAC_DINH = 1;

/** Nạp vai trò của người đang gọi. Dùng sau requireAuth. */
export async function loadRole(req, res, next) {
  if (req.role) return next();   // router khác đã nạp rồi thì không truy vấn lại
  try {
    const [rows] = await pool.query('SELECT role, is_admin FROM users WHERE id = ?', [req.userId]);
    if (!rows.length) return res.status(403).json({ error: 'Tài khoản không tồn tại.' });
    // is_admin là cột cũ, vẫn được đồng bộ với role — ưu tiên role, rơi về is_admin cho chắc.
    req.role = rows[0].role || (rows[0].is_admin ? 'admin' : 'student');
    req.laAdmin = req.role === 'admin';
    // Hệ thống dựng sẵn cho nhiều cơ sở nhưng bản này phát hành cho MỘT trung tâm: cột `org_id`
    // trên các bảng nghiệp vụ vẫn còn (xem init-db.js) và luôn bằng 1, còn `locOrg` luôn false
    // nên không truy vấn nào lọc theo tổ chức. Giữ hai giá trị này để các route đã viết sẵn
    // chạy nguyên; muốn tách cơ sở sau này thì chỉ phải sửa đúng chỗ này.
    req.orgId = ORG_MAC_DINH;
    req.locOrg = false;
    req.laAdminNenTang = req.laAdmin;   // tên cũ, một số route còn dùng
    // Id dùng để LỌC dữ liệu của sale / quản lý hồ sơ. null = admin (không lọc gì).
    // Route trả về DANH SÁCH phải tự đọc giá trị này: middleware chỉ chặn được route có id
    // nằm trong đường dẫn, còn `GET /du-hoc/ho-so` thì không có gì để chặn.
    req.nhanSuId = ['sale', 'ho_so'].includes(req.role) ? req.userId : null;
    next();
  } catch (err) {
    console.error('Lỗi đọc vai trò:', err);
    res.status(500).json({ error: 'Lỗi kiểm tra quyền truy cập.' });
  }
}

/** Cho phép mọi nhân sự: quản trị + quản lý hồ sơ + sale + giáo viên. */
export function requireStaff(req, res, next) {
  if (['admin', 'ho_so', 'sale', 'teacher'].includes(req.role)) return next();
  res.status(403).json({ error: 'Bạn không có quyền truy cập trang quản trị.' });
}

/** Sale hoặc quản lý hồ sơ — hai vai trò dùng chung một bộ quyền. */
export function laNhanSuHoSo(req) {
  return ['sale', 'ho_so'].includes(req.role);
}

/**
 * Mảnh WHERE lọc hồ sơ du học theo người phụ trách, dùng chung cho mọi truy vấn danh sách.
 * Admin -> chuỗi rỗng (không lọc). Trả về cả mảnh SQL và tham số để nơi gọi ghép vào.
 * Tham số `cot` là tên cột tu_van_id đã gắn tiền tố bảng, ví dụ 'h.tu_van_id'.
 */
export function locTheoNhanSu(req, cot = 'tu_van_id') {
  if (!req.nhanSuId) return { sql: '', params: [] };
  return { sql: ` AND ${cot} = ?`, params: [req.nhanSuId] };
}

/** CHỈ quản trị. */
export function requireAdminOnly(req, res, next) {
  if (req.laAdmin) return next();
  res.status(403).json({ error: 'Chức năng này chỉ dành cho quản trị viên.' });
}

/** Tên cũ của requireAdminOnly, giữ để nơi gọi không phải sửa đồng loạt. */
export const requireOrgAdmin = requireAdminOnly;

/**
 * Quản trị + quản lý hồ sơ + sale. Dùng làm LƯỚI THỨ HAI cho các khu du học / sổ quỹ / ký túc
 * xá / tài khoản: ai qua được đây vẫn còn bảng QUYEN ở `phamViQuanTri` phân xử từng route, và
 * còn `req.nhanSuId` lọc dữ liệu bên trong route. Giáo viên KHÔNG có ở đây — những khu này
 * chứa CCCD, hộ chiếu và tiền nong.
 */
export function requireHoSoStaff(req, res, next) {
  if (['admin', 'ho_so', 'sale'].includes(req.role)) return next();
  res.status(403).json({ error: 'Chức năng này không thuộc phạm vi của bạn.' });
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
// Sale và quản lý hồ sơ luôn đi cùng nhau trong bảng quyền — khác nhau ở NHÃN, không ở quyền.
// Muốn tách quyền hai vai trò này về sau thì thay `NS` bằng hai hằng riêng, đừng thêm nhánh if.
const SALE = 'sale';
const HOSO = 'ho_so';
const NS = [SALE, HOSO];
// Quản trị đi thẳng ở đầu `phamViQuanTri`, nên các dòng mang QT dưới đây chỉ còn giá trị tài
// liệu: chúng ghi lại route nào vốn dành riêng cho quản trị. Giáo viên thì phải khớp luật.
const QT = 'admin';

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

  // --- QUẢN LÝ GIÁO VIÊN trong tổ chức: chỉ quản trị trung tâm ---
  { vai: [QT], method: ['GET', 'POST'], re: /^\/teachers$/, qua: null },
  { vai: [QT], method: ['GET'], re: /^\/teachers-options$/, qua: null },
  { vai: [QT], method: ['GET', 'PUT', 'DELETE', 'POST'], re: /^\/teachers\/(\d+)(\/.*)?$/, qua: 'giaovien', nhom: 1 },
  { vai: [QT], method: ['DELETE'], re: /^\/teacher-notes\/(\d+)$/, qua: null },
  { vai: [QT], method: ['DELETE'], re: /^\/teacher-reviews\/(\d+)$/, qua: null },

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

  // ==================================================================
  // SALE & QUẢN LÝ HỒ SƠ (2026-09-22)
  // ==================================================================
  // Hai vai trò này KHÔNG chạm gì tới lớp học, giáo viên, đề bài, thiết bị đăng nhập.
  // Mọi dòng dưới đây hoặc kiểm sở hữu qua `qua`, hoặc trỏ tới route TỰ LỌC bằng
  // `req.nhanSuId`. Thêm route mới cho họ mà quên một trong hai là lộ dữ liệu của
  // đồng nghiệp — không phải 403 phiền phức như với giáo viên, mà là rò thật.

  // Bảng số liệu tổng quan: route tự lọc, mỗi người thấy con số của riêng mình.
  { vai: NS, method: ['GET'], re: /^\/stats$/, qua: null },
  { vai: NS, method: ['GET'], re: /^\/tong-quan$/, qua: null },

  // --- TÀI KHOẢN: tạo học viên mới, sửa/xoá tài khoản do chính mình tạo ---
  // GET /users tự lọc theo created_by. POST /users chặn vai trò được tạo ở chính route
  // (họ chỉ tạo được 'student'), vì vai trò nằm trong BODY nên regex không thấy.
  { vai: NS, method: ['GET', 'POST'], re: /^\/users$/, qua: null },
  { vai: NS, method: ['GET'], re: /^\/pending-count$/, qua: null },
  { vai: NS, method: ['GET', 'PUT', 'DELETE'], re: /^\/users\/(\d+)$/, qua: 'taikhoan', nhom: 1 },
  { vai: NS, method: ['PUT'], re: /^\/users\/(\d+)\/(password|approve)$/, qua: 'taikhoan', nhom: 1 },
  { vai: NS, method: ['POST'], re: /^\/users\/(\d+)\/verify$/, qua: 'taikhoan', nhom: 1 },

  // --- HỒ SƠ DU HỌC: chỉ hồ sơ mình phụ trách ---
  { vai: NS, method: ['GET'], re: /^\/du-hoc\/(tong-quan|ho-so|nhan-su|hoc-vien|yeu-cau-sua)$/, qua: null },
  { vai: NS, method: ['POST'], re: /^\/du-hoc\/ho-so$/, qua: null },
  { vai: NS, method: ['GET', 'POST', 'PUT', 'DELETE'], re: /^\/du-hoc\/ho-so\/(\d+)(\/.*)?$/, qua: 'hoso', nhom: 1 },
  { vai: NS, method: ['GET', 'PUT', 'DELETE'], re: /^\/du-hoc\/thu-tien\/(\d+)(\/anh)?$/, qua: 'thu-tien', nhom: 1 },
  { vai: NS, method: ['PUT', 'DELETE'], re: /^\/du-hoc\/giay-to\/(\d+)$/, qua: 'giay-to', nhom: 1 },
  { vai: NS, method: ['POST'], re: /^\/du-hoc\/yeu-cau-sua\/(\d+)\/(duyet|tu-choi)$/, qua: 'yeu-cau', nhom: 1 },

  // --- SỔ THU CHI: chỉ phiếu do chính mình lập ---
  // Danh mục thu/chi là dữ liệu dùng chung của trung tâm: đọc được, KHÔNG sửa được.
  { vai: NS, method: ['GET'], re: /^\/quy\/(danh-muc|phieu|bao-cao)$/, qua: null },
  { vai: NS, method: ['POST'], re: /^\/quy\/phieu$/, qua: null },
  { vai: NS, method: ['GET', 'PUT', 'DELETE'], re: /^\/quy\/phieu\/(\d+)(\/anh)?$/, qua: 'phieu', nhom: 1 },

  // --- KÝ TÚC XÁ: đọc sơ đồ toà/phòng, chỉ thao tác người ở gắn hồ sơ mình ---
  // Toà và phòng là tài sản của trung tâm -> chỉ admin thêm/sửa/xoá. Sale cần đọc để biết
  // phòng nào còn chỗ mà xếp học sinh của mình vào.
  { vai: NS, method: ['GET'], re: /^\/ktx\/(tong-quan|toa|phong|cong-no|ho-so-chon)$/, qua: null },
  { vai: NS, method: ['GET'], re: /^\/ktx\/phong\/(\d+)$/, qua: null },
  // Xếp người vào phòng: ho_so_id nằm trong BODY -> route TỰ kiểm bằng hoSoThuocPhamVi().
  { vai: NS, method: ['POST'], re: /^\/ktx\/phong\/(\d+)\/nguoi$/, qua: null },
  { vai: NS, method: ['PUT', 'DELETE', 'POST'], re: /^\/ktx\/nguoi\/(\d+)(\/.*)?$/, qua: 'ktx-nguoi', nhom: 1 },
  { vai: NS, method: ['GET', 'DELETE'], re: /^\/ktx\/thu-tien\/(\d+)(\/anh)?$/, qua: 'ktx-thu', nhom: 1 },
];

// ------------------------------------------------------------------ kiểm sở hữu
export async function lopThuocPhamVi(classId, req) {
  // Giáo viên: đúng lớp mình phụ trách. Quản trị: mọi lớp.
  if (req.role !== 'teacher') {
    const [r] = await pool.query('SELECT 1 FROM classes WHERE id = ?', [classId]);
    return r.length > 0;
  }
  const [r] = await pool.query('SELECT 1 FROM classes WHERE id = ? AND teacher_id = ?', [classId, req.userId]);
  return r.length > 0;
}

/**
 * Hồ sơ du học này có thuộc người đang gọi không.
 * Admin: mọi hồ sơ. Sale / quản lý hồ sơ: chỉ hồ sơ mình phụ trách (`tu_van_id`).
 * Giáo viên và học viên không bao giờ tới được đây (bảng QUYEN đã chặn từ trước).
 */
export async function hoSoThuocPhamVi(hoSoId, req) {
  if (!req.nhanSuId) {
    const [r] = await pool.query('SELECT 1 FROM du_hoc_ho_so WHERE id = ?', [hoSoId]);
    return r.length > 0;
  }
  const [r] = await pool.query(
    'SELECT 1 FROM du_hoc_ho_so WHERE id = ? AND tu_van_id = ?', [hoSoId, req.nhanSuId]);
  return r.length > 0;
}

export async function hocVienThuocPhamVi(userId, req) {
  if (req.role !== 'teacher') {
    const [r] = await pool.query('SELECT 1 FROM users WHERE id = ?', [userId]);
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
      const [r] = await pool.query("SELECT 1 FROM users WHERE id = ? AND role IN ('teacher','admin')", [id]);
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
      const [r] = await pool.query('SELECT tao_boi FROM de_bai WHERE id = ?', [id]);
      if (!r.length) return false;
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

    // ---------- sale / quản lý hồ sơ ----------
    case 'taikhoan': {
      // Tài khoản do CHÍNH MÌNH tạo. Hai chốt chặn thêm, cả hai đều cần thiết:
      //   • không đụng được tài khoản nhân sự (chỉ 'student') — nếu không, một sale tạo
      //     tài khoản rồi tự nâng nó lên admin là xong.
      //   • không đụng được chính mình qua khu quản lý tài khoản (đổi vai trò của bản thân);
      //     đổi mật khẩu / thông tin cá nhân thì đi lối /api/profile như mọi người.
      const [r] = await pool.query('SELECT role, created_by FROM users WHERE id = ?', [id]);
      if (!r.length) return false;
      if (Number(id) === req.userId) return false;
      if ((r[0].role || 'student') !== 'student') return false;
      return r[0].created_by === req.userId;
    }
    case 'hoso':
      return hoSoThuocPhamVi(id, req);
    case 'thu-tien': {
      const [r] = await pool.query('SELECT ho_so_id FROM du_hoc_thu_tien WHERE id = ?', [id]);
      return r.length ? hoSoThuocPhamVi(r[0].ho_so_id, req) : false;
    }
    case 'giay-to': {
      const [r] = await pool.query('SELECT ho_so_id FROM du_hoc_giay_to WHERE id = ?', [id]);
      return r.length ? hoSoThuocPhamVi(r[0].ho_so_id, req) : false;
    }
    case 'yeu-cau': {
      const [r] = await pool.query('SELECT ho_so_id FROM du_hoc_yeu_cau_sua WHERE id = ?', [id]);
      return r.length ? hoSoThuocPhamVi(r[0].ho_so_id, req) : false;
    }
    case 'phieu': {
      // Phiếu thu/chi do chính mình lập.
      const [r] = await pool.query('SELECT nguoi_lap_id FROM quy_phieu WHERE id = ?', [id]);
      return r.length ? r[0].nguoi_lap_id === req.userId : false;
    }
    case 'ktx-nguoi': {
      // Chỗ ở KHÔNG gắn hồ sơ (ho_so_id NULL) -> không suy ra được chủ, chỉ admin đụng được.
      const [r] = await pool.query('SELECT ho_so_id FROM ktx_o WHERE id = ?', [id]);
      if (!r.length || r[0].ho_so_id == null) return false;
      return hoSoThuocPhamVi(r[0].ho_so_id, req);
    }
    case 'ktx-thu': {
      const [r] = await pool.query(
        'SELECT o.ho_so_id FROM ktx_thu_tien t JOIN ktx_o o ON o.id = t.o_id WHERE t.id = ?', [id]);
      if (!r.length || r[0].ho_so_id == null) return false;
      return hoSoThuocPhamVi(r[0].ho_so_id, req);
    }

    default:
      return false;
  }
}

/**
 * Chặn ở hai tầng: route có được phép với vai trò này không, và tài nguyên có thuộc lớp người
 * gọi phụ trách không. Quản trị đi thẳng.
 * Đặt SAU requireStaff.
 *
 * Route tự lọc thì đọc:
 *   req.teacherId  — id giáo viên, hoặc null nếu không phải giáo viên
 */
export async function phamViQuanTri(req, res, next) {
  req.teacherId = req.role === 'teacher' ? req.userId : null;
  if (req.laAdmin) return next();

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
