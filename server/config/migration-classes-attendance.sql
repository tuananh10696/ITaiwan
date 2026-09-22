-- ============================================================
-- Migration: Quản lý lớp — bảng buổi học + điểm danh
-- Chạy TAY câu này trên DB production (Aiven) — KHÔNG chạy `npm run db:init`
-- (script đó DROP toàn bộ bảng, sẽ mất dữ liệu thật).
--
-- An toàn để chạy nhiều lần: dùng CREATE TABLE IF NOT EXISTS.
-- Bảng `classes` và `class_enrollments` đã có sẵn trong DB từ trước (chưa dùng tới),
-- migration này chỉ thêm 2 bảng mới: class_sessions, class_attendance.
-- ============================================================

CREATE TABLE IF NOT EXISTS class_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  session_date DATE NOT NULL,
  topic VARCHAR(200) DEFAULT '',
  notes VARCHAR(500) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  INDEX idx_class_date (class_id, session_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS class_attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  user_id INT NOT NULL,
  status ENUM('present','absent') NOT NULL DEFAULT 'present',
  is_late BOOLEAN DEFAULT FALSE,
  is_left_early BOOLEAN DEFAULT FALSE,
  teacher_note VARCHAR(500) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_session_user (session_id, user_id),
  FOREIGN KEY (session_id) REFERENCES class_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
