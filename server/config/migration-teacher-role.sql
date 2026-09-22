-- ============================================================
-- Migration: Vai trò GIÁO VIÊN
--   users.role            student | teacher | admin
--   teacher_notes         sổ nhận xét giáo viên (admin ghi theo thời gian)
--   teacher_reviews       chấm điểm giáo viên theo tiêu chí, theo kỳ
--
-- Chỉ THÊM cột/bảng, không xoá gì. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

-- ------------------------------------------------------------
-- 1. users.role — nguồn sự thật mới về phân quyền.
--    Cột is_admin CŨ vẫn giữ và vẫn được đồng bộ (role='admin' <=> is_admin=1) vì
--    leaderboard, /auth/me, main.js và trang admin.html đều đang đọc nó. Đổi hết một
--    lượt là rủi ro không cần thiết trên hệ thống đang chạy.
-- ------------------------------------------------------------
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role');
SET @s := IF(@c = 0,
  'ALTER TABLE users ADD COLUMN role ENUM(''student'',''teacher'',''admin'') NOT NULL DEFAULT ''student'' AFTER is_admin',
  'SELECT ''users.role da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

-- Backfill: ai đang is_admin=1 thì role='admin'. Có WHERE nên chỉ chạm đúng các dòng cần đổi.
UPDATE users SET role = 'admin' WHERE is_admin = 1 AND role <> 'admin';

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME = 'idx_role');
SET @s := IF(@c = 0, 'ALTER TABLE users ADD INDEX idx_role (role)',
  'SELECT ''users.idx_role da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

-- ------------------------------------------------------------
-- 2. Sổ nhận xét giáo viên — admin ghi theo thời gian, dùng khi đánh giá cuối kỳ.
--    Tách hẳn khỏi student_notes để không lẫn nhận xét học viên với nhận xét giáo viên.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS teacher_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  author_id INT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_teacher_created (teacher_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Chấm điểm theo tiêu chí, mỗi kỳ (tháng) một phiếu.
--    Để mỗi tiêu chí một CỘT chứ không nhét JSON: còn so sánh được giữa các kỳ bằng SQL
--    (AVG theo giáo viên, xu hướng tăng/giảm) mà không phải bóc JSON trong ứng dụng.
--    Thang điểm 1-5. UNIQUE(teacher_id, ky) -> chấm lại cùng kỳ là sửa phiếu cũ.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS teacher_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  ky CHAR(7) NOT NULL COMMENT 'YYYY-MM',
  diem_chuyen_can TINYINT NULL COMMENT '1-5: di day du, diem danh day du',
  diem_bai_giang TINYINT NULL COMMENT '1-5: chat luong bai giang',
  diem_theo_sat TINYINT NULL COMMENT '1-5: giao bai, cham bai, nhan xet hoc vien',
  diem_phan_hoi TINYINT NULL COMMENT '1-5: phan hoi hoc vien / phu huynh',
  diem_ket_qua TINYINT NULL COMMENT '1-5: ket qua hoc tap cua lop',
  nhan_xet TEXT NULL,
  author_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_teacher_ky (teacher_id, ky),
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
