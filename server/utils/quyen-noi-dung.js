// =============================================================
// QUYỀN XEM NỘI DUNG BÀI HỌC
// =============================================================
// Bản này KHÔNG bán khoá lẻ: mọi học viên đã được duyệt tài khoản đều học được toàn bộ nội
// dung. Tường trả phí (bảng products/entitlements/payments) đã gỡ khỏi hệ thống.
//
// Giữ nguyên hình dạng hàm để `routes/noi-dung.js` không phải viết lại: nếu sau này muốn bán
// khoá theo quyển thì chỉ phải thay ruột `quyenCuaNguoiDung()` ở đây.

/** Không còn đệm quyền nào để xoá — giữ hàm cho nơi gọi khỏi phải sửa. */
export function xoaCache() {}

/**
 * Quyền của một người dùng. Ở bản này ai cũng xem được tất cả, kể cả khách chưa đăng nhập
 * (userId = null) — nội dung là tài sản của chính trung tâm đang vận hành hệ thống.
 */
export async function quyenCuaNguoiDung() {
  return { tatCa: true, gt: { bo: new Set(), quyen: new Set() }, thi: true, goi: [] };
}

/** Có quyền xem bộ / quyển này không. */
export function coQuyen() { return true; }

/** Có quyền xem bộ / quyển này không (tra theo userId). */
export async function coQuyenBo() { return true; }

/** Mã sản phẩm cần mua — không còn bán khoá nên luôn null. */
export function sanPhamCanMua() { return null; }
