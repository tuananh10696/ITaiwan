// =============================================================
// KHO NỘI DUNG GIÁO TRÌNH — nạp ĐỘNG theo BÀI
//
// Từ vựng + ngữ pháp + hội thoại + luyện viết của cả bộ nặng vài MB. Import tĩnh thì học viên
// vào bằng 4G phải tải hết mới thấy chữ, kể cả khi chỉ mở trang chủ. Nay chia theo BÀI CHA,
// để dạng JSON trong `public/data/giaotrinh/` (~37 KB/bài) và nạp qua API có kiểm quyền.
//
// BỐN OBJECT DƯỚI ĐÂY GIỮ NGUYÊN THAM CHIẾU suốt vòng đời trang — nạp xong chỉ `Object.assign`
// thêm vào, KHÔNG gán lại. Nhờ vậy mọi chỗ đang viết `TB().vocab[key]` chạy y như cũ. Đừng đổi
// sang `export let` rồi gán đè: các module đã destructure sẽ giữ mãi object rỗng.
//
// Chưa nạp thì tra ra rỗng (giao diện hiện khung xương), KHÔNG ném lỗi — nên một chỗ quên
// `await napBai()` biểu hiện là "bài trống" chứ không phải trang trắng.
// =============================================================
import { napTaiNguyen, LoiCanQuyen } from '../utils/noi-dung.js';

export const thoidaiVocab = {};
export const thoidaiGrammar = {};
export const thoidaiDialogues = {};
export const thoidaiWriting = {};

const KHO = { v: thoidaiVocab, g: thoidaiGrammar, d: thoidaiDialogues, w: thoidaiWriting };

/**
 * Bài bị khoá vì chưa mua — khoá bài -> thông tin sản phẩm cần mua.
 * Kho CỐ Ý không ném lỗi ra ngoài (giữ nguyên giao kèo "chưa nạp thì tra ra rỗng"): renderer chỉ
 * việc hỏi `baiBiKhoa()` rồi vẽ tấm chắn, thay vì phải bọc try/catch quanh mọi lời gọi.
 */
const daKhoa = new Map();
export function baiBiKhoa(key) { return daKhoa.get(String(key)) || null; }

/** Quên những bài từng bị khoá để lần sau nạp lại thật (gọi sau khi đăng nhập). */
export function quenBaiBiKhoa() {
  for (const k of daKhoa.keys()) dangNap.delete(k);
  daKhoa.clear();
}

/** Bài đã nạp (hoặc đang nạp) — khoá là chính khoá bài cha ('td1-1'). */
const dangNap = new Map();

/**
 * Nạp nội dung của MỘT bài cha. Gọi trước khi render trang giáo trình.
 * Bài chưa có file (chưa sinh dữ liệu) coi như rỗng, không ném lỗi.
 */
export function napBai(_boId, key) {
  const k = String(key);
  let p = dangNap.get(k);
  if (!p) {
    p = napTaiNguyen(`/noi-dung/giaotrinh/giaotrinh/${encodeURIComponent(k)}`, 'giaotrinh', k)
      .catch((e) => {
        // Chưa mua: ghi nhận rồi coi như bài rỗng. Ném tiếp thì mọi nơi gọi `await napBai()` phải
        // tự bắt, mà quên một chỗ là trang trắng.
        if (e instanceof LoiCanQuyen) { daKhoa.set(k, { bo: e.bo, sanPham: e.sanPham, soBaiMo: e.soBaiMo }); return null; }
        throw e;
      })
      .then((d) => {
        if (d) {
          daKhoa.delete(k);
          if (d.v) KHO.v[k] = d.v;
          Object.assign(KHO.g, d.g || {});
          Object.assign(KHO.d, d.d || {});
          Object.assign(KHO.w, d.w || {});
        }
        p.daXong = true;
      })
      .catch((e) => { dangNap.delete(k); throw e; });
    // Gắn sẵn MỘT handler nuốt lỗi cho chính promise được lưu lại. Không đổi hành vi của nơi gọi
    // (họ vẫn nhận rejection từ `p` trả về), nhưng bảo đảm `p` không bao giờ là một "unhandled
    // rejection" khi nơi gọi quên bắt — trên WKWebView của iOS lỗi đó nổi thẳng vào console
    // dưới dạng lỗi trang, che mất lỗi thật.
    p.catch(() => {});
    dangNap.set(k, p);
  }
  return p;
}

/** Bài đã nằm sẵn trong bộ nhớ chưa? Dùng để bỏ hẳn khung xương khi không phải chờ gì. */
export function daNapBai(key) {
  const p = dangNap.get(String(key));
  return !!p && p.daXong === true;
}

/**
 * Nạp NGẦM vài bài (bài lân cận, bài sắp mở) — không chờ, nuốt lỗi.
 * Dùng để chuyển bài thấy tức thì thay vì nháy một nhịp khung xương.
 */
export function napNgam(boId, keys) {
  for (const k of keys) {
    if (k && !dangNap.has(String(k))) napBai(boId, k).catch(() => {});
  }
}
