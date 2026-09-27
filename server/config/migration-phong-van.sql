-- ============================================================
-- Migration: bước "Phỏng vấn" có ba loại — trường / VP Đài Bắc / cả 2   (2026-09-27)
--
--   loai_phong_van  'truong' | 'vp' | 'ca-hai'   (NULL = chưa chọn)
--   ngay_pv_vp      ngày phỏng vấn tại VP Đài Bắc
--   kq_pv_vp        kết quả phỏng vấn VP Đài Bắc  'cho' | 'dau' | 'truot'
--
-- Phỏng vấn TRƯỜNG giữ nguyên hai cột cũ `ngay_phong_van` / `kq_phong_van` — đổi tên là phải
-- sửa cron, thông báo, cổng học sinh cùng lúc, và mất liên kết với dữ liệu đã nhập.
-- Quy tắc đọc ba cột này nằm ở shared/phong-van.js (dùng chung server + giao diện).
--
-- Chỉ THÊM cột + chỉ mục, không xoá gì. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'loai_phong_van');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN loai_phong_van ENUM(''truong'',''vp'',''ca-hai'') DEFAULT NULL AFTER kq_phong_van',
  'SELECT ''du_hoc_ho_so.loai_phong_van da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'ngay_pv_vp');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN ngay_pv_vp DATE DEFAULT NULL AFTER loai_phong_van',
  'SELECT ''du_hoc_ho_so.ngay_pv_vp da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'kq_pv_vp');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN kq_pv_vp ENUM(''cho'',''dau'',''truot'') DEFAULT NULL AFTER ngay_pv_vp',
  'SELECT ''du_hoc_ho_so.kq_pv_vp da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

-- "Ai phỏng vấn VP Đài Bắc trong 14 ngày tới" — cùng lý do với idx_pv của phỏng vấn trường.
SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND INDEX_NAME = 'idx_pv_vp');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD KEY idx_pv_vp (org_id, ngay_pv_vp)',
  'SELECT ''idx_pv_vp da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

-- Hồ sơ đã có dữ liệu phỏng vấn từ trước thì đó là phỏng vấn TRƯỜNG (bản cũ chỉ có một loại).
-- Ghi rõ ra cột thay vì để giao diện suy mãi.
UPDATE du_hoc_ho_so
   SET loai_phong_van = 'truong'
 WHERE loai_phong_van IS NULL
   AND (ngay_phong_van IS NOT NULL OR kq_phong_van IS NOT NULL);
