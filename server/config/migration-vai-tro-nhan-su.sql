-- ============================================================
-- Migration: hai vai trò nhân sự mới — SALE và QUẢN LÝ HỒ SƠ
--
--   users.role   student | teacher | sale | ho_so | admin
--   users.created_by  ai đã tạo tài khoản này (NULL = tự đăng ký hoặc do bản cũ tạo)
--
-- Phạm vi của sale / quản lý hồ sơ KHÔNG cần cột mới nào khác: hồ sơ du học đã có
-- `tu_van_id` (người phụ trách), sổ quỹ đã có `nguoi_lap_id`, người ở ký túc xá đã
-- gắn `ho_so_id`. Ba cột đó là đường suy ra phạm vi, xem server/middleware/roles.js.
--
-- Chỉ THÊM cột và MỞ RỘNG enum, không xoá gì. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

-- ------------------------------------------------------------
-- 1. Mở rộng users.role.
--    Thứ tự giá trị trong ENUM được giữ theo mức quyền tăng dần để đọc cho dễ; MySQL
--    lưu theo chỉ số nên KHÔNG được chèn giá trị mới vào GIỮA các giá trị cũ ở lần
--    migration sau — dữ liệu đã ghi sẽ trượt sang vai trò khác. Thêm thì thêm vào cuối.
-- ------------------------------------------------------------
ALTER TABLE users
  MODIFY COLUMN role ENUM('student','teacher','sale','ho_so','admin')
  NOT NULL DEFAULT 'student';

-- ------------------------------------------------------------
-- 2. users.created_by — "tài khoản do chính tôi thêm vào".
--    Sale và quản lý hồ sơ chỉ sửa/xoá được tài khoản mình tạo; admin thì mọi tài khoản.
--    ON DELETE SET NULL: xoá một sale KHÔNG được kéo theo học viên họ từng tạo.
-- ------------------------------------------------------------
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'created_by');
SET @s := IF(@c = 0,
  'ALTER TABLE users ADD COLUMN created_by INT DEFAULT NULL AFTER role',
  'SELECT ''users.created_by da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME = 'idx_created_by');
SET @s := IF(@c = 0,
  'ALTER TABLE users ADD KEY idx_created_by (created_by)',
  'SELECT ''idx_created_by da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND CONSTRAINT_NAME = 'fk_users_created_by');
SET @s := IF(@c = 0,
  'ALTER TABLE users ADD CONSTRAINT fk_users_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL',
  'SELECT ''fk_users_created_by da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

-- ------------------------------------------------------------
-- 3. Chỉ mục cho các đường tra phạm vi.
--    `du_hoc_ho_so.tu_van_id` đã có idx từ migration-du-hoc.sql. Hai cột dưới đây thì chưa:
--    mọi truy vấn của sale đều lọc theo chúng nên thiếu chỉ mục là quét toàn bảng.
-- ------------------------------------------------------------
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'quy_phieu' AND INDEX_NAME = 'idx_nguoi_lap');
SET @s := IF(@c = 0,
  'ALTER TABLE quy_phieu ADD KEY idx_nguoi_lap (nguoi_lap_id, ngay)',
  'SELECT ''idx_nguoi_lap da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;
