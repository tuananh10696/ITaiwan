-- ============================================================
-- Migration: THÔNG BÁO cho học viên khi giáo viên giao bài (2026-08-27)
--
-- Chạy bằng `npm run db:migrate:prod` (xem CLAUDE.md 4.16) — ĐỪNG chạy `npm run db:init`.
--
-- VÌ SAO CẦN: giáo viên giao bài xong, bài nằm im trong bảng `assignments`. Khối "Bài cô giao"
-- ở dashboard chỉ thấy được KHI học viên tình cờ mở trang chủ; chuông thông báo thì hoàn toàn
-- không biết gì về bài giao. Migration này thêm phần còn thiếu để bài giao lên được chuông:
--
--   1. assignments.updated_at — mốc "lần giao/sửa gần nhất". Giáo viên sửa hạn nộp hay giao lại
--      đúng bài cũ (ON DUPLICATE KEY UPDATE) sẽ bump cột này, nhờ đó thông báo NỔI LÊN LẠI thành
--      chưa đọc thay vì im lặng — đổi hạn nộp mà học viên không hay biết là lỗi nguy hiểm nhất
--      của tính năng giao bài.
--   2. assignment_reads — em nào đã xem thông báo bài nào. Không dùng lại `assignment_reminders`:
--      bảng đó ghi "đã GỬI MAIL nhắc", hai việc khác nhau, trộn vào là mất cả hai.
--
-- "Chưa đọc" = chưa có dòng trong assignment_reads, HOẶC read_at < assignments.updated_at.
--
-- An toàn chạy lại nhiều lần.
-- ============================================================

-- ---------- assignments.updated_at ----------
-- MySQL KHÔNG có `ADD COLUMN IF NOT EXISTS` (đó là cú pháp MariaDB) nên phải dò information_schema.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'assignments' AND COLUMN_NAME = 'updated_at');
SET @s := IF(@c = 0,
  'ALTER TABLE assignments ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  'SELECT ''assignments.updated_at da ton tai'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Bài đã giao từ trước không có updated_at đúng -> lấy tạm created_at, để không bỗng dưng
-- báo cả loạt bài cũ là "vừa giao".
UPDATE assignments SET updated_at = created_at WHERE updated_at > created_at AND created_at IS NOT NULL;

-- ---------- assignment_reads ----------
CREATE TABLE IF NOT EXISTS assignment_reads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT NOT NULL,
  user_id INT NOT NULL,
  read_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_assignment_user (assignment_id, user_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kiểm tra lại: phải ra 1 dòng cột + 1 dòng bảng.
SELECT 'cot' AS loai, COLUMN_NAME AS ten FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'assignments' AND COLUMN_NAME = 'updated_at'
UNION ALL
SELECT 'bang', TABLE_NAME FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'assignment_reads';
