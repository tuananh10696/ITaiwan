// Đổi đường dẫn tài nguyên tĩnh nội bộ (/audio/…, /images/…) sang CDN khi có cấu hình.
//
// VÌ SAO CẦN: 10.842 file mp3 (276 MB) nằm trong `public/` nên mỗi bản deploy phải mang theo
// toàn bộ chỗ đó. Hai hậu quả thật, không phải lý thuyết:
//   1. Vercel chặn 15.000 file/deployment (deploy bằng CLI). Repo đang 11.221 file — thêm một
//      quyển audio nữa là build FAIL, và không gói trả phí nào nới trần này ra.
//   2. Băng thông tính ở mức đắt nhất thị trường ($0,15/GB), trong khi Cloudflare R2 miễn phí
//      egress vĩnh viễn. Khi có app mobile (người dùng tải audio về máy) thì khoản này mới lộ.
//
// NGUYÊN TẮC: KHÔNG sửa 10.842 đường dẫn đang nằm rải trong `src/data/*.js` và
// `public/data/*.json`. Dữ liệu vẫn ghi '/audio/dangdai/B2L01-I-1.mp3' y như cũ; chỉ những điểm
// PHÁT (new Audio / thẻ <audio>) mới bọc qua `assetUrl()`. Nhờ vậy toàn bộ script sinh dữ liệu
// (gen-duongdai-audio, gen-thoidai-audio, gen-tts-tuvung…) không phải biết gì về CDN — chúng cứ
// ghi đường dẫn tương đối như trước.
//
// CHƯA CẤU HÌNH THÌ CHẠY Y NHƯ CŨ: thiếu VITE_CDN_BASE thì `assetUrl` trả lại nguyên đường dẫn,
// app đọc file trong `public/` như trước. Đây là chủ ý — máy dev không cần R2, và nếu CDN có sự
// cố thì chỉ cần bỏ biến môi trường rồi build lại là về trạng thái cũ.

// Vite thay `import.meta.env.VITE_CDN_BASE` bằng hằng chuỗi lúc build, nên biến này phải đặt
// trong `.env` LÚC BUILD (không phải biến môi trường lúc chạy của server).
const BASE = String(import.meta.env?.VITE_CDN_BASE || '').replace(/\/+$/, '');

/** '/audio/pron/b.mp3' -> 'https://cdn…/audio/pron/b.mp3'. URL tuyệt đối giữ nguyên. */
export function assetUrl(p) {
  const s = p == null ? '' : String(p);
  if (!s) return s;
  // URL tuyệt đối (audio của onllang), data:, blob: — không phải tài nguyên của mình, để yên.
  if (/^(https?:)?\/\//i.test(s) || /^(data|blob|file):/i.test(s)) return s;
  if (!BASE) return s;
  return BASE + (s.startsWith('/') ? s : '/' + s);
}

/** Có đang trỏ CDN không — dùng để báo trong log/chẩn đoán, không dùng để rẽ nhánh hiển thị. */
export const coCdn = () => !!BASE;
