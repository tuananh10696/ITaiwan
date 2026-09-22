-- =============================================================
-- Giáo trình Thời Đại (時代華語) — nới độ dài lesson_id  (2026-09-05)
-- =============================================================
-- Module Thời Đại dùng id bài có tiền tố 'td' + số quyển để KHÔNG đụng namespace của Đương đại
-- (xem src/data/thoidaiBooks.js). Id dài nhất là của tab Game:
--     game:wordpop:td5-16.3   = 21 ký tự  > VARCHAR(20) hiện tại
-- Không nới thì INSERT bị "Data too long for column 'lesson_id'" — và chỉ vỡ ở ĐÚNG quyển 5 bài
-- 10-16 phần 3, tức lỗi chỉ xuất hiện sau khi học viên học tới đó.
--
-- Chỉ MỞ RỘNG độ dài cột (VARCHAR(20) -> VARCHAR(32)): không mất dữ liệu, không đổi kiểu, không
-- đụng khoá. UNIQUE KEY uk_class_lesson_type (class_id, lesson_id, exercise_type) vẫn nằm trong
-- giới hạn độ dài index của utf8mb4.
--
-- Chạy bằng script chung của dự án (CLAUDE.md 4.16), KHÔNG chạy tay:
--     npm run db:migrate:local
--     npm run db:migrate:prod
-- =============================================================

ALTER TABLE exercise_results
  MODIFY COLUMN lesson_id VARCHAR(32) NOT NULL
  COMMENT 'vd 5.2 · 2-5.2 · td2-5.1 · pron:finals · onllang:5 · game:wordpop:td5-16.3';

ALTER TABLE assignments
  MODIFY COLUMN lesson_id VARCHAR(32) NOT NULL
  COMMENT 'khớp exercise_results.lesson_id';

ALTER TABLE translate_submissions
  MODIFY COLUMN lesson_id VARCHAR(32) NOT NULL
  COMMENT 'khớp exercise_results.lesson_id';
