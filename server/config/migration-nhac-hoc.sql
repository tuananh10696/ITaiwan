-- =============================================================
-- NHẮC HỌC QUA EMAIL — 2026-09-16
-- =============================================================
-- Hệ thống đã tính được ngày ôn (SRS), chuỗi ngày học và hạn nộp bài cô giao, nhưng KHÔNG nhắc
-- ai cả ngoài chuông trong app — mà chuông chỉ thấy khi học viên đã tự mở app. Người quên học
-- thì không có gì kéo họ quay lại.
--
-- Hai cột, không tạo bảng mới:
--   nhac_lan_cuoi  — ngày gửi mail nhắc gần nhất. Chống gửi trùng trong ngày; cron có thể chạy
--                    lại nhiều lần (Vercel retry, chạy tay để thử) mà học viên không nhận 5 mail.
--   nhan_mail_nhac — học viên tự tắt được trong trang Cài đặt. Gửi mail cho người đã nói "đừng
--                    gửi nữa" là cách nhanh nhất để bị đánh dấu spam, hỏng luôn cả mail xác thực
--                    tài khoản của những người khác.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'nhac_lan_cuoi');
SET @s := IF(@c = 0, 'ALTER TABLE users ADD COLUMN nhac_lan_cuoi DATE DEFAULT NULL', 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'nhan_mail_nhac');
SET @s := IF(@c = 0, 'ALTER TABLE users ADD COLUMN nhan_mail_nhac BOOLEAN NOT NULL DEFAULT TRUE', 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Cron quét theo (đang hoạt động gần đây, chưa nhắc hôm nay) nên chỉ mục này là thứ giữ cho
-- truy vấn không phải quét cả bảng users khi số học viên lớn lên.
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME = 'idx_nhac');
SET @s := IF(@c = 0, 'ALTER TABLE users ADD INDEX idx_nhac (nhan_mail_nhac, nhac_lan_cuoi)', 'SELECT 1');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;
