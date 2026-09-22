-- ============================================================
-- Migration: nhận xét của giáo viên cho bài tập & bài thi
-- Chạy TAY file này trên DB production (Aiven) — KHÔNG chạy `npm run db:init`
-- (script đó DROP toàn bộ bảng, sẽ mất dữ liệu thật).
--
-- LÝ DO BẮT BUỘC PHẢI CHẠY: tính năng "giáo viên gửi nhận xét + chuông thông báo cho học sinh"
-- dùng 2 cột `teacher_review` và `review_read_at` ở CẢ HAI bảng exercise_results và exam_results,
-- nhưng 2 cột này chưa từng được khai báo trong schema. Nếu DB chưa có cột thì:
--   - POST /api/admin/exercise-results/:id/review  -> 500 (lưu nhận xét luôn báo lỗi)
--   - POST /api/admin/exam-results/:id/review      -> 500
--   - GET  /api/exercise/notifications             -> 500 (chuông của học sinh không tải được)
--
-- LƯU Ý CÚ PHÁP: MySQL KHÔNG hỗ trợ `ADD COLUMN IF NOT EXISTS` (đó là cú pháp MariaDB).
-- Vì vậy dùng information_schema + PREPARE để vừa đúng cú pháp MySQL, vừa chạy lại nhiều lần được.
-- ============================================================

-- ---------- exercise_results.teacher_review ----------
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'exercise_results' AND COLUMN_NAME = 'teacher_review');
SET @s := IF(@c = 0,
  'ALTER TABLE exercise_results ADD COLUMN teacher_review TEXT NULL',
  'SELECT ''exercise_results.teacher_review da ton tai'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ---------- exercise_results.review_read_at ----------
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'exercise_results' AND COLUMN_NAME = 'review_read_at');
SET @s := IF(@c = 0,
  'ALTER TABLE exercise_results ADD COLUMN review_read_at DATETIME NULL',
  'SELECT ''exercise_results.review_read_at da ton tai'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ---------- exam_results.teacher_review ----------
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'exam_results' AND COLUMN_NAME = 'teacher_review');
SET @s := IF(@c = 0,
  'ALTER TABLE exam_results ADD COLUMN teacher_review TEXT NULL',
  'SELECT ''exam_results.teacher_review da ton tai'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- ---------- exam_results.review_read_at ----------
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'exam_results' AND COLUMN_NAME = 'review_read_at');
SET @s := IF(@c = 0,
  'ALTER TABLE exam_results ADD COLUMN review_read_at DATETIME NULL',
  'SELECT ''exam_results.review_read_at da ton tai'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Kiểm tra lại: phải ra đủ 4 dòng.
SELECT TABLE_NAME, COLUMN_NAME FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('exercise_results','exam_results')
  AND COLUMN_NAME IN ('teacher_review','review_read_at')
ORDER BY TABLE_NAME, COLUMN_NAME;
