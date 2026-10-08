-- ============================================================
-- Migration: ảnh đính kèm cho giấy tờ du học   (2026-10-08)
--
-- Khách yêu cầu danh sách giấy tờ mặc định chỉ còn 5 mục, trong đó "Ảnh thẻ" (2 file) và
-- "Ảnh CCCD" cho tải ảnh lên trực tiếp (trước đây giấy tờ chỉ là checklist tick trạng thái).
--
--   du_hoc_giay_to.so_anh_toi_da  INT NOT NULL DEFAULT 0 — số ảnh tối đa mục này nhận.
--                                 0 = mục không cho tải ảnh (hành vi cũ, mọi hồ sơ đang có giữ nguyên).
--   du_hoc_giay_to_anh            mỗi dòng một ảnh base64 (client đã nén ~400KB), cùng lối
--                                 `du_hoc_thu_tien.anh`. Bảng RIÊNG, không nhét vào du_hoc_giay_to:
--                                 danh sách giấy tờ được kéo về ở mọi lần mở hồ sơ, không được
--                                 mang theo vài MB ảnh.
--
-- Chỉ THÊM cột + bảng, không xoá / đổi dữ liệu nào. Chạy lại nhiều lần vẫn an toàn.
-- Hồ sơ đã có KHÔNG bị đổi danh sách giấy tờ (mục mặc định mới chỉ áp cho hồ sơ tạo sau này).
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_giay_to' AND COLUMN_NAME = 'so_anh_toi_da');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_giay_to ADD COLUMN so_anh_toi_da INT NOT NULL DEFAULT 0',
  'SELECT ''du_hoc_giay_to.so_anh_toi_da da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

CREATE TABLE IF NOT EXISTS du_hoc_giay_to_anh (
  id INT AUTO_INCREMENT PRIMARY KEY,
  giay_to_id INT NOT NULL,
  anh MEDIUMTEXT NOT NULL,
  nguoi_up_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_giay_to (giay_to_id),
  FOREIGN KEY (giay_to_id) REFERENCES du_hoc_giay_to(id) ON DELETE CASCADE,
  FOREIGN KEY (nguoi_up_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
