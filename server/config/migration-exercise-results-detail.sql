-- ============================================================
-- Migration: mở rộng exercise_results để hỗ trợ luyện phát âm + xem chi tiết đúng/sai
-- Chạy TAY file này trên DB production (Aiven) — KHÔNG chạy `npm run db:init`
-- (script đó DROP toàn bộ bảng, sẽ mất dữ liệu thật).
--
-- Lệnh 1 — SỬA LỖI: cột lesson_id đang là VARCHAR(10), trong khi bài luyện phát âm dùng lesson_id
--   dạng 'pron:initials' (13 ký tự) / 'pron:finals' (11 ký tự) — vượt quá 10 ký tự nên MySQL từ chối
--   INSERT ("Data too long for column 'lesson_id'"), khiến kết quả luyện phát âm KHÔNG BAO GIỜ lưu
--   được vào DB (frontend chỉ console.warn nên không ai thấy gì).
-- Lệnh 2 — THÊM MỚI: cột details_json lưu chi tiết từng câu (câu hỏi / lựa chọn / đáp án đã chọn)
--   để giáo viên xem lại đúng-sai trong Quản lý lớp > chi tiết học viên.
--
-- LƯU Ý CÚ PHÁP: MySQL KHÔNG hỗ trợ `ADD COLUMN IF NOT EXISTS` (đó là cú pháp của MariaDB) — viết
-- như vậy sẽ lỗi cú pháp ngay. Vì thế lệnh 2 dùng information_schema + PREPARE để vừa an toàn chạy
-- lại nhiều lần, vừa đúng cú pháp MySQL.
--
-- An toàn để chạy lại nhiều lần.
-- ============================================================

-- 1) Nới lesson_id lên 20 ký tự (chạy lại nhiều lần vô hại).
ALTER TABLE exercise_results
  MODIFY COLUMN lesson_id VARCHAR(20) NOT NULL
  COMMENT 'e.g. 1.2, 5.1, pron:initials, pron:finals, pron:tones';

-- 2) Thêm cột details_json nếu chưa có.
SET @col_exists := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'exercise_results'
    AND COLUMN_NAME = 'details_json'
);

SET @ddl := IF(@col_exists = 0,
  'ALTER TABLE exercise_results ADD COLUMN details_json LONGTEXT NULL COMMENT ''Snapshot cau hoi/lua chon tung cau, dung de xem lai dung-sai. NULL voi ban ghi cu.''',
  'SELECT ''Cot details_json da ton tai, bo qua.'' AS ghi_chu'
);

PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
