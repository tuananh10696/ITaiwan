// ============================================================
// LÕI — CẦU NỐI một chiều giữa khung app và các module trang (2026-09-08)
// ============================================================
// Vấn đề: module trang nạp động (src/pages/*) cần gọi `navigate()`, `updateUrl()`, `openAuth()`
// … — những thứ nằm trong `main.js`. Nếu module `import` thẳng từ `main.js` thì có VÒNG LẶP
// (main → pages → main), rollup xử lý được nhưng thứ tự khởi tạo rất dễ gãy và cực khó tìm.
//
// Cách làm: file này KHÔNG import gì cả. `main.js` gọi `dangKy({...})` một lần lúc khởi động;
// module trang chỉ ĐỌC ra. Một chiều, không vòng lặp, và module trang luôn nạp SAU khi
// `main.js` đã chạy xong nên không có chuyện đọc phải giá trị rỗng.
//
// ⚠️ Cầu nối này chỉ dành cho thứ THỰC SỰ nằm trong main.js (router, giáo trình, TTS…).
//    Hàm thuần thì cho vào `core/ui.js` và import bình thường — có kiểm tra tĩnh, gõ sai là
//    build báo lỗi ngay, còn gõ sai tên trên cầu nối thì tới lúc chạy mới biết.

export const app = {};

/** `main.js` gọi MỘT LẦN lúc khởi động, trước khi bất kỳ module trang nào được nạp. */
export function dangKy(o) { Object.assign(app, o); }
