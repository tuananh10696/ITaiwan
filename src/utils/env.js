// Nhận biết app đang chạy ở đâu: trình duyệt thường, hay bên trong vỏ native (Capacitor).
//
// VÌ SAO CẦN: trên web, `/api/...` là đường dẫn tương đối trỏ về chính máy chủ đang phục vụ
// trang. Trong app native thì KHÔNG: WebView chạy ở origin riêng của Capacitor
// (`https://localhost` trên Android, `capacitor://localhost` trên iOS), nên `/api/...` trỏ vào
// chính cái WebView đó và luôn 404. Mọi lời gọi API phải là URL TUYỆT ĐỐI tới máy chủ thật.
//
// Cách hỏng rất êm nếu quên: `request()` trong api/client.js bắt mọi lỗi mạng rồi ném ra
// "Không thể kết nối server" — người dùng chỉ thấy app trắng trơn, không có dấu hiệu gì cho
// biết nguyên nhân là origin. Đúng loại lỗi đã xảy ra với `ddTranslateSubmit` (CLAUDE.md 4.21b
// mục 6): 401 bị nuốt im lặng suốt nhiều tháng.

/** Đang chạy trong vỏ app native (iOS/Android) chứ không phải trình duyệt web? */
export function laNative() {
  try {
    return !!(globalThis.Capacitor && globalThis.Capacitor.isNativePlatform
      && globalThis.Capacitor.isNativePlatform());
  } catch { return false; }
}

/** 'ios' | 'android' | 'web' */
export function nenTang() {
  try { return globalThis.Capacitor?.getPlatform?.() || 'web'; } catch { return 'web'; }
}

export const laIOS = () => nenTang() === 'ios';
export const laAndroid = () => nenTang() === 'android';

// Máy chủ API khi chạy native. Đặt lúc BUILD qua VITE_API_BASE (Vite thay bằng hằng chuỗi).
// Không có thì dùng production — để lỡ quên biến môi trường thì app vẫn chạy được, thay vì
// gọi vào hư không.
const API_HOST = String(import.meta.env?.VITE_API_BASE || 'https://taiwanese-mu.vercel.app')
  .replace(/\/+$/, '');

/**
 * Tiền tố cho mọi lời gọi API.
 * - Web  : '/api'  (đi qua proxy của Vite lúc dev, same-origin lúc chạy thật)
 * - Native: 'https://<máy chủ>/api'
 *
 * Tính LAZY (hàm, không phải hằng số) vì `window.Capacitor` do lớp cầu nối native chèn vào;
 * đọc quá sớm lúc module vừa nạp có thể chưa thấy.
 */
export function apiBase() {
  return laNative() ? `${API_HOST}/api` : '/api';
}

/** Máy chủ gốc (không có '/api') — dùng cho link mở ra ngoài, ảnh chia sẻ… */
export const hostApi = () => (laNative() ? API_HOST : globalThis.location?.origin || '');
