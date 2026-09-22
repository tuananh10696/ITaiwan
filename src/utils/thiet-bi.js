// =============================================================
// MÃ THIẾT BỊ — dùng cho giới hạn 2 thiết bị / tài khoản (2026-09-15)
//
// Mỗi trình duyệt (hoặc bản cài app) tự sinh MỘT mã ngẫu nhiên và giữ mãi trong localStorage.
// Mã này gửi kèm khi đăng nhập; server đếm số thiết bị đang hoạt động — xem server/utils/thiet-bi.js.
//
// ⚠️ ĐÂY KHÔNG PHẢI DẤU VÂN TAY TRÌNH DUYỆT và cố ý không phải. Không thu thập font, canvas,
// độ phân giải hay bất cứ thứ gì nhận dạng được người dùng: vừa là chuyện riêng tư, vừa vô ích ở
// đây (chúng đổi theo bản cập nhật trình duyệt, làm học viên bị tính thành máy mới oan). Một mã
// ngẫu nhiên vô nghĩa là đủ để ĐẾM, và đó là tất cả những gì hệ thống cần.
//
// Người dùng xoá localStorage thì thành "máy mới" và lại tính vào hạn mức — họ không lách được
// gì, chỉ tự làm phiền mình. Còn quyền truy cập thì vẫn do JWT + entitlements quyết định, mã này
// không bao giờ được dùng để xác thực.

const KHOA = 'tw_device_id';

function ngauNhien() {
  try {
    // randomUUID chỉ có trong ngữ cảnh an toàn (https / localhost) — không phải lúc nào cũng có.
    if (globalThis.crypto?.randomUUID) return crypto.randomUUID().replace(/-/g, '');
    const a = new Uint8Array(16);
    crypto.getRandomValues(a);
    return [...a].map((x) => x.toString(16).padStart(2, '0')).join('');
  } catch {
    // Dự phòng cuối: kém ngẫu nhiên hơn nhưng vẫn đủ để phân biệt máy này với máy kia.
    return `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
  }
}

/**
 * Mã thiết bị của máy này. Ổn định qua các lần mở app.
 * Trả chuỗi rỗng khi không đọc/ghi được localStorage (cửa sổ ẩn danh, chặn cookie) — server hiểu
 * đó là "không có mã" và cho qua, KHÔNG chặn. Chặn người dùng chỉ vì trình duyệt của họ khoá
 * localStorage là phạt nhầm người.
 */
export function maThietBi() {
  try {
    let m = localStorage.getItem(KHOA);
    if (!m || !/^[A-Za-z0-9_-]{8,64}$/.test(m)) {
      m = ngauNhien();
      localStorage.setItem(KHOA, m);
    }
    return m;
  } catch {
    return '';
  }
}
