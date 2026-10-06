// =============================================================
// "HỆ" NGUYỆN VỌNG CỦA HỒ SƠ DU HỌC — dùng CHUNG cho server và client (2026-10-06)
// =============================================================
// Học sinh chọn tối đa MAX_HE hệ du học mình muốn theo (ô checkbox ở mục Nguyện vọng của form hồ
// sơ). Lưu ở cột `du_hoc_ho_so.he_nguyen_vong` dưới dạng CHUỖI MÃ cách nhau dấu phẩy, luôn theo
// thứ tự của HE_DU_HOC (không theo thứ tự bấm) để hai lần lưu cùng một lựa chọn ra cùng một chuỗi
// — nếu không, "so cũ/mới" của yêu cầu sửa sẽ báo có thay đổi khi chẳng đổi gì.
//
// Nhãn lấy từ khách; "Hệ intern" ban đầu khách ghi "inten" (chủ dự án chốt sửa 2026-10-06). Muốn sửa
// chữ hiển thị thì sửa ở đây, mã giữ nguyên để không mất liên kết với dữ liệu đã lưu.
//
// File này KHÔNG import gì và không đụng DOM/Node (cùng lối shared/phong-van.js).

export const MAX_HE = 2;

export const HE_DU_HOC = [
  { ma: 'he-1-4', ten: 'Hệ 1+4' },
  { ma: 'he-vua-hoc-vua-lam', ten: 'Hệ vừa học vừa làm' },
  { ma: 'he-ngon-ngu', ten: 'Hệ ngôn ngữ' },
  { ma: 'he-hoa-kieu', ten: 'Hệ hoa kiều' },
  { ma: 'he-tu-tuc', ten: 'Hệ tự túc' },
  { ma: 'he-thac-si', ten: 'Hệ thạc sĩ' },
  { ma: 'he-inten', ten: 'Hệ intern' },
];
const MA_HE = new Set(HE_DU_HOC.map((h) => h.ma));

/** Chuỗi lưu trong DB / mảng mã -> mảng mã HỢP LỆ, không trùng, đúng thứ tự HE_DU_HOC, tối đa MAX_HE. */
export function danhSachHe(v) {
  const raw = Array.isArray(v) ? v : String(v ?? '').split(',');
  const co = new Set(raw.map((x) => String(x).trim()).filter((x) => MA_HE.has(x)));
  return HE_DU_HOC.filter((h) => co.has(h.ma)).map((h) => h.ma).slice(0, MAX_HE);
}

/** Chuẩn hoá về chuỗi lưu DB; không chọn gì thì null (cột cho phép NULL). */
export function chuoiHe(v) {
  const ds = danhSachHe(v);
  return ds.length ? ds.join(',') : null;
}

/** "he-1-4,he-ngon-ngu" -> "Hệ 1+4, Hệ ngôn ngữ" để hiển thị. Chuỗi rỗng -> ''. */
export function tenHe(v) {
  return danhSachHe(v).map((m) => HE_DU_HOC.find((h) => h.ma === m).ten).join(', ');
}
