// =============================================================
// QUYỀN XEM NỘI DUNG BÀI HỌC
// =============================================================
// Bản này KHÔNG bán khoá: quyền chỉ phụ thuộc tài khoản ĐÃ ĐƯỢC DUYỆT hay chưa (chốt 2026-10-05,
// giống bên taiwanese nhưng thay "đã mua" bằng "đã duyệt"):
//   • khách và tài khoản CHƯA DUYỆT -> học thử SO_BAI_MO bài đầu mỗi quyển (shared/noi-dung-mo.js),
//     không có đề thi thử;
//   • học sinh ĐÃ DUYỆT và mọi nhân sự (admin, giáo viên, sale, quản lý hồ sơ) -> toàn bộ.
// Tường trả phí (bảng products/entitlements/payments) đã gỡ khỏi hệ thống.
//
// Không đệm kết quả: admin bấm Duyệt là lần tải bài kế tiếp của học viên đã mở hết.
import pool from '../config/db.js';

/** Không còn đệm quyền nào để xoá — giữ hàm cho nơi gọi khỏi phải sửa. */
export function xoaCache() {}

const KHONG_CO = { tatCa: false, choDuyet: false };

/**
 * Quyền của một người dùng.
 * @returns {Promise<{tatCa:boolean, choDuyet:boolean}>}
 *   choDuyet: đã có tài khoản nhưng chưa được duyệt — để giao diện mời liên hệ trung tâm thay
 *             vì mời đăng nhập.
 */
export async function quyenCuaNguoiDung(userId) {
  const id = Number(userId);
  if (!id) return KHONG_CO;
  const [[u]] = await pool.query('SELECT role, is_admin, is_approved FROM users WHERE id = ?', [id]);
  if (!u) return KHONG_CO;
  const laHocSinh = !u.is_admin && String(u.role || 'student') === 'student';
  if (!laHocSinh || u.is_approved) return { tatCa: true, choDuyet: false };
  return { tatCa: false, choDuyet: true };
}

/** Có quyền xem bộ / quyển này không. Không bán theo quyển nên chỉ xét "đã duyệt". */
export function coQuyen(q) { return !!q?.tatCa; }

/** Có quyền xem bộ / quyển này không (tra theo userId). */
export async function coQuyenBo(userId) { return coQuyen(await quyenCuaNguoiDung(userId)); }

/** Mã sản phẩm cần mua — không còn bán khoá nên luôn null. */
export function sanPhamCanMua() { return null; }
