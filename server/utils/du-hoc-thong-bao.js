// =============================================================
// THÔNG BÁO DU HỌC — lớp dùng chung  (2026-09-16)
// =============================================================
// Ba nơi cùng ghi/đọc bảng `du_hoc_thong_bao`, nên gom vào đây thay vì mỗi nơi tự viết SQL:
//   · routes/du-hoc.js          — nhân viên đặt lịch phỏng vấn / lịch bay / đổi bước
//   · routes/du-hoc-hocvien.js  — học sinh đọc, và đánh dấu đã đọc
//   · routes/cron.js            — nhắc hằng ngày (giấy tờ còn thiếu, công nợ, lịch sắp tới)
//
// NGUYÊN TẮC: hồ sơ CHƯA gắn tài khoản thì không sinh thông báo nào. Không có `user_id` thì
// không ai đọc được, ghi vào chỉ làm phình bảng và làm sai mọi phép đếm "chưa đọc".
import pool from '../config/db.js';

/** Bảng chưa có (chưa chạy migration) — nơi gọi dùng để im lặng bỏ qua thay vì ném 500. */
export const chuaCoBangTb = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/**
 * Ghi một thông báo cho chủ hồ sơ.
 *
 * KHÔNG ném lỗi ra ngoài: thông báo là việc phụ, hỏng nó không được phép làm hỏng việc chính
 * (nhân viên vừa lưu ngày phỏng vấn mà nhận 500 thì tưởng chưa lưu được rồi bấm lại).
 * Cùng nguyên tắc với `ghiNhatKy` trong du-hoc.js.
 *
 * @returns {Promise<boolean>} đã ghi được hay chưa
 */
export async function baoHocSinh(hoSoId, userId, loai, tieuDe, noiDung = null, ngay = null) {
  if (!userId) return false;
  try {
    await pool.query(
      `INSERT INTO du_hoc_thong_bao (ho_so_id, user_id, loai, tieu_de, noi_dung, ngay_lien_quan)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [hoSoId, userId, loai, String(tieuDe).slice(0, 200),
       noiDung ? String(noiDung).slice(0, 1000) : null,
       /^\d{4}-\d{2}-\d{2}$/.test(String(ngay || '').slice(0, 10)) ? String(ngay).slice(0, 10) : null]
    );
    return true;
  } catch (err) {
    if (!chuaCoBangTb(err)) console.error('Lỗi ghi thông báo du học:', err);
    return false;
  }
}

/**
 * Đã báo loại này cho hồ sơ này trong `songay` ngày gần đây chưa.
 *
 * Đây là thứ giữ cho email nhắc hằng ngày không thành spam: cron chạy mỗi tối, mà "còn thiếu 3
 * giấy tờ" thì ngày nào cũng đúng — không có chốt chặn này là em nhận đúng một câu đó 30 tối
 * liền rồi tắt nhận mail, và mất luôn kênh báo lịch bay.
 */
export async function daBaoGanDay(hoSoId, loai, songay = 7) {
  try {
    const [r] = await pool.query(
      `SELECT 1 FROM du_hoc_thong_bao
        WHERE ho_so_id = ? AND loai = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
        LIMIT 1`,
      [hoSoId, loai, songay]
    );
    return r.length > 0;
  } catch (err) {
    // Chưa có bảng thì coi như "đã báo" để không cố gửi rồi lỗi tiếp ở bước ghi.
    return chuaCoBangTb(err);
  }
}

/** Nhãn tiếng Việt + icon của từng loại, dùng chung cho chuông và trang thông báo. */
export const LOAI_TB = {
  'phong-van':     { nhan: 'Lịch phỏng vấn',   icon: 'fa-comments' },
  bay:             { nhan: 'Lịch bay',         icon: 'fa-plane-departure' },
  visa:            { nhan: 'Hồ sơ visa',       icon: 'fa-passport' },
  buoc:            { nhan: 'Tiến độ hồ sơ',    icon: 'fa-list-check' },
  'nhac-giay-to':  { nhan: 'Nhắc nộp giấy tờ', icon: 'fa-folder-open' },
  'nhac-tien':     { nhan: 'Nhắc đóng phí',    icon: 'fa-money-bill-wave' },
  ktx:             { nhan: 'Ký túc xá',        icon: 'fa-bed' },
  'sua-duyet':     { nhan: 'Yêu cầu sửa',      icon: 'fa-circle-check' },
  'sua-tu-choi':   { nhan: 'Yêu cầu sửa',      icon: 'fa-circle-xmark' },
  'khai-bao':      { nhan: 'Khai hồ sơ',       icon: 'fa-pen-to-square' },
};
