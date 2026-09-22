-- ============================================================
-- Migration: Giao bài tập có hạn nộp + Sổ nhận xét học viên
-- Chạy TAY trên DB production (Aiven) — KHÔNG chạy `npm run db:init`.
--
-- Thêm 3 bảng:
--   assignments           — bài giáo viên GIAO cho lớp, kèm hạn nộp
--   assignment_reminders  — đã nhắc em nào bài nào (để không gửi trùng email)
--   student_notes         — sổ nhận xét học viên theo thời gian
--
-- Vì sao assignments.lesson_id lại là VARCHAR(20) chứ không phải khoá ngoại: bài tập của hệ thống
-- nằm ở frontend (giáo trình Đương đại '5.2', luyện phát âm 'pron:finals'...) chứ không có bảng
-- riêng trong DB. Dùng CHUNG hệ quy ước với exercise_results.lesson_id để đối chiếu "đã nộp hay chưa"
-- chỉ bằng một phép JOIN, không phải dựng thêm bảng nộp bài.
--
-- An toàn để chạy lại nhiều lần (CREATE TABLE IF NOT EXISTS).
-- ============================================================

CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  lesson_id VARCHAR(20) NOT NULL COMMENT 'khop exercise_results.lesson_id: 5.2, pron:finals...',
  title VARCHAR(200) DEFAULT '',
  due_date DATE NULL,
  note VARCHAR(500) DEFAULT '',
  created_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_class_lesson (class_id, lesson_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_due (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assignment_reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT NOT NULL,
  user_id INT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_assignment_user (assignment_id, user_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS student_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  class_id INT NULL,
  author_id INT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_created (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kiểm tra: phải ra đủ 3 dòng.
SELECT TABLE_NAME FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('assignments', 'assignment_reminders', 'student_notes')
ORDER BY TABLE_NAME;
