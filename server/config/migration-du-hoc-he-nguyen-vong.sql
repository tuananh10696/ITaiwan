-- ============================================================
-- Migration: "Hệ" nguyện vọng của hồ sơ du học   (2026-10-06)
--
--   he_nguyen_vong  VARCHAR(120) NULL — các mã hệ học sinh chọn (tối đa 2), cách nhau dấu phẩy,
--                   ví dụ 'he-1-4,he-ngon-ngu'. Danh sách mã nằm ở shared/he-du-hoc.js.
--
-- Cột `loai_hinh` (ENUM do nhân viên chọn) KHÔNG đụng tới: đó là phân loại nội bộ của trung tâm,
-- còn đây là nguyện vọng do chính học sinh khai.
--
-- Chỉ THÊM cột, không xoá / đổi dữ liệu nào. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'he_nguyen_vong');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN he_nguyen_vong VARCHAR(120) DEFAULT NULL AFTER nganh',
  'SELECT ''du_hoc_ho_so.he_nguyen_vong da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;
