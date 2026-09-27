// =============================================================
// BƯỚC PHỎNG VẤN CỦA HỒ SƠ DU HỌC — dùng CHUNG cho server và client (2026-09-27)
// =============================================================
// Bước "Phỏng vấn" có ba loại, chọn theo từng hồ sơ:
//   truong  — Phỏng vấn trường
//   vp      — Phỏng vấn VP Đài Bắc
//   ca-hai  — Cả 2
// Mỗi buổi có ngày + kết quả RIÊNG: trường dùng `ngay_phong_van` / `kq_phong_van` (cột cũ, giữ
// nguyên để không mất dữ liệu đã có), VP Đài Bắc dùng `ngay_pv_vp` / `kq_pv_vp`.
//
// Server dùng file này để quyết định TỰ CHUYỂN sang "Xin visa" khi đậu đủ; giao diện dùng để vẽ
// trạng thái từng buổi. Hai bên phải đọc cùng một quy tắc — tính lệch nhau là màn hình báo "đậu
// đủ" trong khi hồ sơ không tự chuyển, hoặc ngược lại. Vì thế file này KHÔNG import gì và không
// đụng DOM/Node (cùng lối shared/noi-dung-mo.js).

/** Ba lựa chọn, theo thứ tự hiển thị. */
export const LOAI_PV = [
  { ma: 'truong', ten: 'Phỏng vấn trường' },
  { ma: 'vp', ten: 'Phỏng vấn VP Đài Bắc' },
  { ma: 'ca-hai', ten: 'Cả 2' },
];
export const MA_LOAI_PV = LOAI_PV.map((l) => l.ma);

/** Hai buổi phỏng vấn có thể có, kèm cột DB chứa ngày + kết quả của từng buổi. */
export const BUOI_PV = {
  truong: { ma: 'truong', ten: 'Phỏng vấn trường', ngan: 'Trường', cotNgay: 'ngay_phong_van', cotKq: 'kq_phong_van' },
  vp: { ma: 'vp', ten: 'Phỏng vấn VP Đài Bắc', ngan: 'VP Đài Bắc', cotNgay: 'ngay_pv_vp', cotKq: 'kq_pv_vp' },
};

/** Mọi cột thuộc bước phỏng vấn — server dùng để biết một lần sửa có đụng tới phỏng vấn không. */
export const COT_PV = ['loai_phong_van', 'ngay_phong_van', 'kq_phong_van', 'ngay_pv_vp', 'kq_pv_vp'];

const coGi = (v) => v !== null && v !== undefined && v !== '';

/**
 * Loại phỏng vấn đang áp dụng. Chưa chọn thì SUY từ dữ liệu đã nhập: hồ sơ cũ (trước khi có ba
 * loại) chỉ có ngày/kết quả phỏng vấn trường — coi là "Phỏng vấn trường" chứ không phải "chưa
 * có phỏng vấn". null = chưa chọn và cũng chưa nhập gì.
 */
export function loaiPv(h) {
  if (MA_LOAI_PV.includes(h?.loai_phong_van)) return h.loai_phong_van;
  const truong = coGi(h?.ngay_phong_van) || coGi(h?.kq_phong_van);
  const vp = coGi(h?.ngay_pv_vp) || coGi(h?.kq_pv_vp);
  if (truong && vp) return 'ca-hai';
  if (truong) return 'truong';
  if (vp) return 'vp';
  return null;
}

/**
 * Trạng thái của MỘT buổi:
 *   dau   — đã đậu
 *   truot — trượt
 *   cho   — đã phỏng vấn, đang chờ kết quả (kết quả = 'cho')
 *   hen   — đã có ngày, chưa có kết quả
 *   chua  — chưa có ngày, chưa có kết quả
 */
function trangThaiBuoi(ngay, kq) {
  if (kq === 'dau' || kq === 'truot' || kq === 'cho') return kq;
  return coGi(ngay) ? 'hen' : 'chua';
}

/**
 * Tổng hợp bước phỏng vấn của một hồ sơ.
 * @returns {{ loai: string|null, buoi: object[], tong: number, dau: number, du: boolean, truot: boolean }}
 *   du    — mọi buổi CẦN có đều đã đậu (điều kiện tự chuyển sang "Xin visa")
 *   truot — có ít nhất một buổi trượt
 */
export function tinhPhongVan(h) {
  const loai = loaiPv(h);
  const can = loai === 'ca-hai' ? ['truong', 'vp'] : loai ? [loai] : [];
  const buoi = can.map((ma) => {
    const b = BUOI_PV[ma];
    const ngay = coGi(h?.[b.cotNgay]) ? h[b.cotNgay] : null;
    const kq = coGi(h?.[b.cotKq]) ? h[b.cotKq] : null;
    return { ma, ten: b.ten, ngan: b.ngan, ngay, kq, trang_thai: trangThaiBuoi(ngay, kq) };
  });
  const dau = buoi.filter((b) => b.trang_thai === 'dau').length;
  return {
    loai,
    buoi,
    tong: buoi.length,
    dau,
    du: buoi.length > 0 && dau === buoi.length,
    truot: buoi.some((b) => b.trang_thai === 'truot'),
  };
}
