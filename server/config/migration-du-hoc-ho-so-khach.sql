-- ============================================================
-- Migration: Hồ sơ du học theo MẪU KHÁCH (2026-10-03)
--   Trung tâm chốt lại bộ thông tin học sinh khai:
--     họ tên Việt/Trung, ngày sinh, CCCD, hộ chiếu, địa chỉ hộ khẩu,
--     điểm tổng kết lớp 10/11/12 + trường cấp 3, chứng chỉ ngoại ngữ,
--     email, SĐT, thông tin BỐ và MẸ, chuyên ngành, quá trình làm việc.
--   Cột cũ (giới tính, người bảo lãnh, nguyện vọng trường, KTX...) GIỮ NGUYÊN
--   để không mất dữ liệu đã nhập — chỉ ẩn khỏi form.
--
-- Chỉ THÊM cột, không xoá gì. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'diem_lop10');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN diem_lop10 VARCHAR(10) DEFAULT NULL AFTER truong_tn',
  'SELECT ''du_hoc_ho_so.diem_lop10 da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'diem_lop11');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN diem_lop11 VARCHAR(10) DEFAULT NULL AFTER diem_lop10',
  'SELECT ''du_hoc_ho_so.diem_lop11 da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'diem_lop12');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN diem_lop12 VARCHAR(10) DEFAULT NULL AFTER diem_lop11',
  'SELECT ''du_hoc_ho_so.diem_lop12 da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'bo_ten');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN bo_ten VARCHAR(120) DEFAULT NULL AFTER ph_quan_he',
  'SELECT ''du_hoc_ho_so.bo_ten da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'bo_cccd');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN bo_cccd VARCHAR(20) DEFAULT NULL AFTER bo_ten',
  'SELECT ''du_hoc_ho_so.bo_cccd da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'bo_ngay_sinh');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN bo_ngay_sinh DATE DEFAULT NULL AFTER bo_cccd',
  'SELECT ''du_hoc_ho_so.bo_ngay_sinh da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'bo_nghe');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN bo_nghe VARCHAR(120) DEFAULT NULL AFTER bo_ngay_sinh',
  'SELECT ''du_hoc_ho_so.bo_nghe da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'bo_phone');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN bo_phone VARCHAR(20) DEFAULT NULL AFTER bo_nghe',
  'SELECT ''du_hoc_ho_so.bo_phone da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'me_ten');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN me_ten VARCHAR(120) DEFAULT NULL AFTER bo_phone',
  'SELECT ''du_hoc_ho_so.me_ten da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'me_cccd');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN me_cccd VARCHAR(20) DEFAULT NULL AFTER me_ten',
  'SELECT ''du_hoc_ho_so.me_cccd da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'me_ngay_sinh');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN me_ngay_sinh DATE DEFAULT NULL AFTER me_cccd',
  'SELECT ''du_hoc_ho_so.me_ngay_sinh da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'me_nghe');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN me_nghe VARCHAR(120) DEFAULT NULL AFTER me_ngay_sinh',
  'SELECT ''du_hoc_ho_so.me_nghe da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'me_phone');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN me_phone VARCHAR(20) DEFAULT NULL AFTER me_nghe',
  'SELECT ''du_hoc_ho_so.me_phone da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'du_hoc_ho_so' AND COLUMN_NAME = 'qua_trinh_lam_viec');
SET @s := IF(@c = 0,
  'ALTER TABLE du_hoc_ho_so ADD COLUMN qua_trinh_lam_viec TEXT DEFAULT NULL AFTER nganh',
  'SELECT ''du_hoc_ho_so.qua_trinh_lam_viec da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s;
EXECUTE st;
DEALLOCATE PREPARE st;

-- Chứng chỉ ngoại ngữ giờ có thể là câu dài ("chưa thi, đã học tiếng Trung 8 tháng tại ...")
-- nên nới từ 60 lên 255 ký tự. MODIFY chạy lại nhiều lần vẫn cho cùng kết quả.
ALTER TABLE du_hoc_ho_so MODIFY COLUMN trinh_do_tieng VARCHAR(255) DEFAULT NULL;
