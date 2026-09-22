// ============================================================
// LÕI — TRẠNG THÁI ỨNG DỤNG (2026-09-08)
// ============================================================
// Tách khỏi `main.js` để module trang nạp động (src/pages/*) đọc/ghi được cùng MỘT object,
// không phải đi vòng qua cầu nối. `state` không bao giờ bị gán lại (chỉ đổi thuộc tính) nên
// import bình thường là đủ — xem CLAUDE.md 4.40.
//
// ⚠️ File này chỉ import `api/client.js` (để khôi phục phiên đăng nhập). ĐỪNG import gì thêm:
//    nó nằm ở đáy cây phụ thuộc, kéo thứ khác vào là sinh vòng lặp.

import api from '../api/client.js';

export const state = {
  currentPage: 'dashboard',
  charMode: 'traditional', // 'traditional' | 'simplified'
  isLoggedIn: api.isLoggedIn,
  user: (() => {
    const stored = api.user;
    return stored ? {
      name: stored.name, level: stored.level_label || 'Tân Sinh · Lv1',
      avatar: stored.avatar_letter || stored.name?.charAt(0) || 'U',
      avatarColor: stored.avatar_color || '#027AB3',
      avatarUrl: stored.avatar_url || null,
      streak: stored.streak || 0, points: stored.points || 0, wordsToReview: 0,
      email: stored.email || '',
    } : { name: 'Học viên', level: 'Tân Sinh · Lv1', avatar: 'U', streak: 0, points: 0, wordsToReview: 0, avatarUrl: null };
  })(),
  // Exam state
  exam: { active: false, currentQ: 0, answers: [], timer: 0, timerInterval: null, skill: 'both', charType: 'traditional', questions: [], examBand: null, examDe: null, examSkill: 'both' },
  // Dictionary state
  // Sổ tay từ vựng nay nằm ở `soTay` (Map khoá theo chữ Hán) trong section TỪ VỰNG & HÁN TỰ,
  // không còn là mảng id số trong state — xem 4.37.
  // Nhom menu cha dang mo tren sidebar
  // 'dd-quyen-duongdai' / 'dd-quyen-thoidai': nhóm quyển của TỪNG bộ giáo trình (navBooksHtml).
  openMenus: JSON.parse(localStorage.getItem('tw_open_menus') || '["cat-tocfl","dd-quyen-duongdai"]'),
  // Data loaded flags
  dataLoaded: false,
  // QUYỀN NỘI DUNG (2026-09-09) — bản chụp từ /api/noi-dung/quyen, chỉ để VẼ GIAO DIỆN
  // (hiện ổ khoá, chip "Miễn phí", hạn gói). Tường thật nằm ở server; sửa object này trong
  // console cũng không mở được bài nào.
  quyen: { daNap: false, tatCa: false, bo: [], hetHan: null },
};

// ------------------------------------------------------------------ trạng thái TỪNG TRANG
//
// Năm object dưới đây bị `PAGE_PARAMS` trong `main.js` đọc/ghi ở bước `read()` — bước này chạy
// TRƯỚC khi trang được render (quy ước 4.2: đọc tham số → render → ghi URL), tức trước cả khi
// module trang nạp động được tải về. Vì vậy chúng phải nằm ở LÕI, không nằm trong module trang.
// Module trang import lại chính các object này nên hai bên dùng chung một tham chiếu.

export const tdxState = { tim: '', tu: null, kq: null, dangTim: false, chiTiet: null, lienQuan: null };


export const stState = {
  tab: 'list', tim: '', loc: 'all', sap: 'moi',
  fcIdx: 0, fcLat: false, order: null, quiz: null,
};


export const btState = { tim: '', net: 'all', chon: null };


// Khu TÀI KHOẢN (4.42). `muaMa` do PAGE_PARAMS đọc từ URL nên phải ở lõi — mở thẳng
// /tai-khoan/goi-thanh-vien/thanh-toan/kh-hsk-c3 là vào ngay màn chuyển khoản của khoá đó.
export const tkState = {
  muaMa: null,      // mã sản phẩm đang ở màn thanh toán; null = đang xem bảng giá
  loc: 'all',       // bộ lọc bảng giá: all | duongdai | thoidai | hsk | thi-thu | don
  bangGia: null,    // [] sản phẩm đang bán
  quyen: null,      // { tat_ca, bo[], quyen[] } — để biết khoá nào đã sở hữu
  cauHinh: null,    // tài khoản nhận tiền
  don: null,        // đơn của tôi
  donHienTai: null, // đơn đang thao tác ở màn thanh toán
  anhTam: null,     // ảnh biên lai vừa chọn, chưa gửi
  dangGui: false,
  tbDs: null,       // danh sách thông báo đã nạp (trang Thông báo)
  tbLoc: 'all',     // bộ lọc thông báo: all | unread | review | assignment | payment
  // --- Hồ sơ du học (2026-09-16) ---
  dh: null,         // dữ liệu /du-hoc/ho-so-cua-toi; { co: false } = không phải học sinh du học
  dhNhap: {},       // giá trị đang gõ trong form, CHƯA lưu lên server
  dhSua: false,     // đang mở form "yêu cầu sửa" (hồ sơ đã khoá)
  dhDangLuu: false,
};




/**
 * Bài kiểm tra / bài tập do giáo viên tự soạn (2026-09-17).
 * Ở LÕI chứ không trong `pages/kiemtra.js` vì `PAGE_PARAMS.read()` đọc nó TRƯỚC khi module được
 * tải về (quy ước 4.2: đọc tham số -> render -> ghi URL). Để trong module thì mở thẳng URL
 * `/lo-trinh/bai-kiem-tra/12` là mất id.
 */
export const ktState = {
  view: 'list',     // list | lam | ket-qua
  giaoId: null,     // lượt giao đang mở
  baiLamId: null,   // bài làm đang làm / đang xem lại
  ds: null,         // danh sách đề được giao
  bai: null,        // đề + câu hỏi đang làm (KHÔNG chứa đáp án)
  traLoi: {},       // { <cau_hoi_id>: đáp án đang chọn }
  thuTu: null,      // thứ tự câu sau khi xáo (chỉ để HIỂN THỊ)
  tronLc: {},       // { <cau_hoi_id>: [chỉ số gốc theo thứ tự hiển thị] }
  hetHan: null,     // mốc hết giờ do SERVER trả về
  lechGio: 0,       // chênh lệch đồng hồ máy người dùng so với server (ms)
  dongHo: null,     // id setInterval
  kq: null,         // kết quả sau khi nộp
  dangNop: false,
};
