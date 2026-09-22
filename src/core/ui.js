// ============================================================
// LÕI — tiện ích giao diện dùng chung (2026-09-08)
// ============================================================
// Những hàm ở đây KHÔNG phụ thuộc gì ngoài DOM, nên vừa dùng được trong `main.js` vừa dùng
// được trong các module trang nạp động (src/pages/*) mà không tạo vòng import.
//
// ⚠️ ĐỪNG import `main.js` hay bất kỳ module trang nào vào file này. Nguyên tắc một chiều
//    (lõi ← trang) là thứ giữ cho việc tách route không sinh vòng lặp — xem CLAUDE.md 4.40.

// ------------------------------------------------------------------ chuỗi

/** Escape để nhét chuỗi của người dùng vào innerHTML. Cả app dựng giao diện bằng innerHTML
 *  (quy ước 4.3) nên đây là hàng rào duy nhất chặn chèn thẻ. */
export const tdEsc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Chuỗi an toàn để nhét vào thuộc tính onclick="…'…'…". */
export const tdNhay = (s) => String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/** Bỏ dấu để gõ không dấu vẫn tìm ra. Dùng cho pinyin, tiếng Việt và âm Hán Việt. */
export const boDauTim = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

// ------------------------------------------------------------------ hiệu ứng

/**
 * Chạy lại animation "trang mới trồi lên".
 * ⚠️ CSS animation KHÔNG tự chạy lại khi chỉ đổi nội dung bên trong cùng một phần tử — phải
 *    gỡ class, ÉP TÍNH LẠI LAYOUT (đọc offsetWidth), rồi gắn lại. Thiếu bước đọc offsetWidth
 *    thì trình duyệt gộp hai thao tác làm một và animation im lặng không chạy (bài học 4.29).
 */
export function twPlayEnter(el, cls) {
  if (!el) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

/** Bật/tắt chế độ tập trung (thanh bên thu lại) — dùng khi đang làm bài / đang thi. */
export function twFocusMode(on) {
  const shell = document.getElementById('app');
  if (shell) shell.classList.toggle('tw-focus', !!on);
}

// ------------------------------------------------------------------ modal

// openModal/closeModal chỉ bật-tắt các modal CÓ SẴN trong index.html theo id.
// Null-safe: gọi nhầm id thì im lặng bỏ qua thay vì ném TypeError giết luôn handler đang chạy.
export const openModal = (id) => { document.getElementById(id)?.classList.add('show'); };
export const closeModal = (id) => { document.getElementById(id)?.classList.remove('show'); };

/**
 * Modal ĐỘNG (#app-dialog) — dựng nội dung ngay lúc chạy.
 * ⚠️ Đừng gọi `openModal('Tiêu đề', body, footer)` cho việc này: tiêu đề sẽ rơi vào tham số
 *    `id`, `getElementById('Tiêu đề')` = null. Đó đúng là lý do học viên bấm vào thông báo mà
 *    không có gì hiện ra suốt một thời gian (4.18).
 */
export function openDialog(title, bodyHtml, footerHtml = '') {
  const box = document.getElementById('app-dialog');
  if (!box) return;
  document.getElementById('app-dialog-title').textContent = title;
  document.getElementById('app-dialog-body').innerHTML = bodyHtml;
  const foot = document.getElementById('app-dialog-footer');
  foot.innerHTML = footerHtml;
  foot.style.display = footerHtml ? '' : 'none';
  box.classList.add('show');
}

export const closeDialog = () => { document.getElementById('app-dialog')?.classList.remove('show'); };

// ------------------------------------------------------------------ lời nhắn thoáng qua

/**
 * Lời nhắn ở góc màn hình.
 * Cố ý KHÔNG dùng `alert()`: alert chặn cả trang chỉ để báo một việc nhỏ như "đã lưu một từ".
 */
let _toastTimer = null;
export function toast(msg) {
  let o = document.getElementById('tw-toast');
  if (!o) {
    o = document.createElement('div');
    o.id = 'tw-toast';
    o.className = 'tw-toast';
    o.setAttribute('role', 'status');
    o.setAttribute('aria-live', 'polite');
    document.body.appendChild(o);
  }
  o.textContent = msg;
  o.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => o.classList.remove('show'), 2200);
}

// ------------------------------------------------------------------ khung xương

/**
 * Khung xương trong lúc chờ nạp dữ liệu (hoặc chờ nạp chính module của trang).
 * Đặt ở lõi vì cả ba module trang nạp động đều cần nó NGAY trước khi bản thân chúng được tải.
 */
export const khungXuongTrang = () => `<div class="lt-page">
  <div class="tw-sk" style="height:120px;margin-bottom:18px"></div>
  <div class="lt-o-grid">${'<div class="tw-sk" style="height:92px"></div>'.repeat(4)}</div>
  <div class="tw-sk" style="height:180px;margin-top:18px"></div>
  <div class="tw-sk" style="height:220px;margin-top:14px"></div>
</div>`;
