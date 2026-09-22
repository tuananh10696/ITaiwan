-- ============================================================
-- Migration: Thêm bảng translate_submissions và cột exercise_type cho assignments
-- Dành cho tính năng: học sinh tự dịch, nộp bài, giáo viên chấm điểm
--
-- Chạy bằng script chung của dự án (xem CLAUDE.md 4.16), KHÔNG chạy tay bằng mysql < :
--   npm run db:migrate:local     # tập dượt trước
--   npm run db:migrate:prod      # chạy thật lên production (tự sao lưu trước)
-- Script tự ghi nhận file đã chạy (bảng schema_migrations) nên không cần các phòng thủ
-- kiểu IF NOT EXISTS/DUPLICATE COLUMN thủ công — chỉ chạy đúng 1 lần.
-- ============================================================

-- 1) Tạo bảng translate_submissions
CREATE TABLE IF NOT EXISTS translate_submissions (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  lesson_id     VARCHAR(20) NOT NULL  COMMENT 'e.g. 1.1, 3.2',
  mode          ENUM('vi-zh','zh-vi') NOT NULL DEFAULT 'vi-zh',
  answers_json  LONGTEXT NOT NULL     COMMENT 'JSON array: [{idx, q, studentAnswer}]',
  auto_score    TINYINT UNSIGNED      COMMENT 'Điểm tự chấm sơ bộ 0-100 (so sánh với đáp án mẫu)',
  submitted_at  DATETIME DEFAULT NOW(),
  teacher_score TINYINT UNSIGNED      COMMENT 'Điểm giáo viên chỉnh 0-100, NULL = chưa chấm',
  teacher_comment TEXT,
  reviewed_at   DATETIME,
  reviewed_by   INT,
  INDEX idx_ts_lesson  (lesson_id),
  INDEX idx_ts_user    (user_id),
  INDEX idx_ts_pending (teacher_score, submitted_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2) Thêm cột exercise_type vào assignments
ALTER TABLE assignments ADD COLUMN exercise_type VARCHAR(30) NOT NULL DEFAULT 'bai-tap' AFTER lesson_id;

-- 3) UNIQUE KEY cũ chỉ có (class_id, lesson_id) — Giáo trình và Dịch Trung-Việt dùng CHUNG cách
-- đánh số bài (5.2, 8.1...), nên giao "Dịch bài 5.2" cho lớp đã có "Giáo trình bài 5.2" sẽ đụng
-- đúng khoá cũ: INSERT ... ON DUPLICATE KEY UPDATE ở route /classes/:id/assignments coi đó là
-- "giao lại bài cũ", ghi đè title/hạn nộp lên NHẦM bản ghi (exercise_type không đổi vì UPDATE
-- không đụng cột đó) — bài dịch vừa giao biến mất, thành sửa nhầm bài giáo trình đã có.
-- Thêm khoá mới trước rồi mới xoá khoá cũ: FK (class_id) cần LUÔN có ít nhất 1 index bắt đầu
-- bằng class_id, xoá trước sẽ bị lỗi 1553 (FK cần đến index đang xoá).
ALTER TABLE assignments ADD UNIQUE KEY uk_class_lesson_type (class_id, lesson_id, exercise_type);
ALTER TABLE assignments DROP INDEX uk_class_lesson;
