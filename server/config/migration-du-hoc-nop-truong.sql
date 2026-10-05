-- ============================================================
-- Migration: thêm bước "Tiến độ hồ sơ trường" vào luồng hồ sơ du học   (2026-10-05)
--
--   Luồng mới: Nhận hồ sơ -> Đóng tiền -> Học -> Tiến độ hồ sơ trường -> Phỏng vấn -> Xin visa -> Chốt lịch bay.
--   Mã bước: 'nop-truong' (hồ sơ đã nộp sang các trường, đang chờ trường xét).
--
-- Cột `du_hoc_ho_so.buoc` là ENUM nên phải khai thêm giá trị. Giá trị mới được thêm vào CUỐI danh
-- sách, không chèn giữa "hoc" và "phong-van": chèn giữa làm MySQL đổi chỉ số nội bộ của các giá trị
-- đứng sau, phải dựng lại cả bảng; thêm vào cuối chỉ sửa metadata (MySQL 5.6+ làm tại chỗ, MariaDB 10.3+ tức thì), không khoá
-- bảng, không đụng dòng nào. Thứ tự HIỂN THỊ các bước không nằm ở DB mà ở mảng BUOC trong
-- server/routes/du-hoc.js — không có truy vấn nào ORDER BY theo cột buoc.
--
-- Không đổi dữ liệu nào: hồ sơ đang ở bước cũ vẫn ở nguyên bước cũ. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'buoc'
    AND COLUMN_TYPE LIKE '%''nop-truong''%');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so MODIFY COLUMN buoc ENUM(''ho-so'',''dong-tien'',''hoc'',''phong-van'',''visa'',''bay'',''hoan-thanh'',''tam-dung'',''huy'',''nop-truong'') NOT NULL DEFAULT ''ho-so''',
  'SELECT ''du_hoc_ho_so.buoc da co nop-truong, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;
