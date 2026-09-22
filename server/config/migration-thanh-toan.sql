-- =============================================================
-- BÁN KHOÁ THEO QUYỂN + THANH TOÁN CHUYỂN KHOẢN   — 2026-09-09
-- =============================================================
-- Nối tiếp `migration-to-chuc-quyen.sql`. Ba việc:
--
--   1. Đổi ĐƠN VỊ BÁN từ "cả bộ" sang "từng quyển/cấp" (chốt với chủ dự án 2026-09-09).
--      17 khoá: Đương đại Q1-Q6 · Thời Đại Q1-Q5 · HSK cấp 1-6, mỗi khoá 799.000đ giảm 599.000đ.
--      Đề thi thử 499.000đ giảm 399.000đ.
--   2. Bỏ bán 3 gói thời gian và 3 gói trọn bộ. GIỮ NGUYÊN hàng, chỉ tắt `is_active`:
--      xoá đi thì các `entitlements` đã cấp trỏ vào chúng sẽ mất JOIN trong `quyenCuaNguoiDung()`
--      -> người đã mua trọn bộ đột nhiên mất sạch quyền. Tắt thì quyền cũ vẫn chạy, chỉ không
--      còn hiện trên bảng giá.
--   3. Luồng thanh toán CHUYỂN KHOẢN có duyệt tay: bổ sung cột cho `payments` + bảng cấu hình
--      tài khoản nhận tiền.
--
-- Chạy bằng `npm run db:migrate:local` / `db:migrate:prod` (CLAUDE.md 4.16), KHÔNG chạy tay.

-- -------------------------------------------------------------------------
-- 1. products: thêm giá gốc (để hiện giá gạch ngang) và nhóm hiển thị
-- -------------------------------------------------------------------------
-- `gia` là giá BÁN THẬT (số tiền phải chuyển khoản); `gia_goc` chỉ để gạch ngang trên giao diện.
-- Tách hai cột chứ không tính khuyến mãi bằng phần trăm trong code: giá bán phải là một con số
-- duy nhất, khớp chính xác với số tiền đối chiếu khi duyệt chuyển khoản.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'gia_goc');
SET @s := IF(@c = 0, 'ALTER TABLE products ADD COLUMN gia_goc INT DEFAULT NULL AFTER gia',
  'SELECT ''products.gia_goc da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Gom thẻ trên bảng giá: 'duongdai' | 'thoidai' | 'hsk' | 'thi-thu' | 'goi' (gói thời gian cũ).
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products' AND COLUMN_NAME = 'nhom');
SET @s := IF(@c = 0, 'ALTER TABLE products ADD COLUMN nhom VARCHAR(30) NOT NULL DEFAULT ''khac'' AFTER loai',
  'SELECT ''products.nhom da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- -------------------------------------------------------------------------
-- 2. NGỪNG BÁN gói cũ (giữ hàng, giữ quyền đã cấp)
-- -------------------------------------------------------------------------
UPDATE products SET is_active = FALSE, nhom = 'goi'
 WHERE ma IN ('goi-1-thang', 'goi-6-thang', 'goi-12-thang');

UPDATE products SET is_active = FALSE, nhom = 'tron-bo'
 WHERE ma IN ('bo-duongdai', 'bo-thoidai', 'bo-hsk');

-- -------------------------------------------------------------------------
-- 3. 17 KHOÁ THEO QUYỂN / CẤP
-- -------------------------------------------------------------------------
-- `pham_vi` nay có thêm khoá "quyen": {"bo":["duongdai"],"quyen":[2]} = chỉ quyển 2 của Đương đại.
-- Không có "quyen" thì hiểu là TRỌN BỘ (giữ đúng nghĩa cũ của 3 sản phẩm bo-*), nên dữ liệu cũ
-- không phải sửa gì. Phần đọc nằm ở server/utils/quyen-noi-dung.js.
INSERT IGNORE INTO products (ma, ten, mo_ta, mon, loai, pham_vi, so_ngay, gia, gia_goc, sort_order) VALUES
  ('kh-duongdai-q1', 'Giáo trình Đương đại — Quyển 1', 'Mở trọn quyển 1: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, dịch, luyện viết và game.', 'zh', 'bo-le', '{"bo":["duongdai"],"quyen":[1]}', NULL, 599000, 799000, 10),
  ('kh-duongdai-q2', 'Giáo trình Đương đại — Quyển 2', 'Mở trọn quyển 2: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, dịch, luyện viết và game.', 'zh', 'bo-le', '{"bo":["duongdai"],"quyen":[2]}', NULL, 599000, 799000, 20),
  ('kh-duongdai-q3', 'Giáo trình Đương đại — Quyển 3', 'Mở trọn quyển 3: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, dịch, luyện viết và game.', 'zh', 'bo-le', '{"bo":["duongdai"],"quyen":[3]}', NULL, 599000, 799000, 30),
  ('kh-duongdai-q4', 'Giáo trình Đương đại — Quyển 4', 'Mở trọn quyển 4: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, dịch, luyện viết và game.', 'zh', 'bo-le', '{"bo":["duongdai"],"quyen":[4]}', NULL, 599000, 799000, 40),
  ('kh-duongdai-q5', 'Giáo trình Đương đại — Quyển 5', 'Mở trọn quyển 5: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, dịch, luyện viết và game.', 'zh', 'bo-le', '{"bo":["duongdai"],"quyen":[5]}', NULL, 599000, 799000, 50),
  ('kh-duongdai-q6', 'Giáo trình Đương đại — Quyển 6', 'Mở trọn quyển 6: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, dịch, luyện viết và game.', 'zh', 'bo-le', '{"bo":["duongdai"],"quyen":[6]}', NULL, 599000, 799000, 60),
  ('kh-thoidai-q1', 'Giáo trình Thời Đại — Quyển 1', 'Mở trọn quyển 1: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, luyện viết và game.', 'zh', 'bo-le', '{"bo":["thoidai"],"quyen":[1]}', NULL, 599000, 799000, 70),
  ('kh-thoidai-q2', 'Giáo trình Thời Đại — Quyển 2', 'Mở trọn quyển 2: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, luyện viết và game.', 'zh', 'bo-le', '{"bo":["thoidai"],"quyen":[2]}', NULL, 599000, 799000, 80),
  ('kh-thoidai-q3', 'Giáo trình Thời Đại — Quyển 3', 'Mở trọn quyển 3: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, luyện viết và game.', 'zh', 'bo-le', '{"bo":["thoidai"],"quyen":[3]}', NULL, 599000, 799000, 90),
  ('kh-thoidai-q4', 'Giáo trình Thời Đại — Quyển 4', 'Mở trọn quyển 4: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, luyện viết và game.', 'zh', 'bo-le', '{"bo":["thoidai"],"quyen":[4]}', NULL, 599000, 799000, 100),
  ('kh-thoidai-q5', 'Giáo trình Thời Đại — Quyển 5', 'Mở trọn quyển 5: từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, luyện viết và game.', 'zh', 'bo-le', '{"bo":["thoidai"],"quyen":[5]}', NULL, 599000, 799000, 110),
  ('kh-hsk-c1', 'Giáo trình HSK 3.0 — Cấp 1', 'Mở trọn cấp 1: từ vựng, ngữ pháp, luyện viết, trắc nghiệm và game.', 'zh', 'bo-le', '{"bo":["hsk"],"quyen":[1]}', NULL, 599000, 799000, 120),
  ('kh-hsk-c2', 'Giáo trình HSK 3.0 — Cấp 2', 'Mở trọn cấp 2: từ vựng, ngữ pháp, luyện viết, trắc nghiệm và game.', 'zh', 'bo-le', '{"bo":["hsk"],"quyen":[2]}', NULL, 599000, 799000, 130),
  ('kh-hsk-c3', 'Giáo trình HSK 3.0 — Cấp 3', 'Mở trọn cấp 3: từ vựng, ngữ pháp, luyện viết, trắc nghiệm và game.', 'zh', 'bo-le', '{"bo":["hsk"],"quyen":[3]}', NULL, 599000, 799000, 140),
  ('kh-hsk-c4', 'Giáo trình HSK 3.0 — Cấp 4', 'Mở trọn cấp 4: từ vựng, ngữ pháp, luyện viết, trắc nghiệm và game.', 'zh', 'bo-le', '{"bo":["hsk"],"quyen":[4]}', NULL, 599000, 799000, 150),
  ('kh-hsk-c5', 'Giáo trình HSK 3.0 — Cấp 5', 'Mở trọn cấp 5: từ vựng, ngữ pháp, luyện viết, trắc nghiệm và game.', 'zh', 'bo-le', '{"bo":["hsk"],"quyen":[5]}', NULL, 599000, 799000, 160),
  ('kh-hsk-c6', 'Giáo trình HSK 3.0 — Cấp 6', 'Mở trọn cấp 6: từ vựng, ngữ pháp, luyện viết, trắc nghiệm và game.', 'zh', 'bo-le', '{"bo":["hsk"],"quyen":[6]}', NULL, 599000, 799000, 170);

-- Gán nhóm cho 17 khoá vừa thêm (INSERT IGNORE bỏ qua hàng đã có nên cột nhom có thể còn mặc định).
UPDATE products SET nhom = 'duongdai' WHERE ma LIKE 'kh-duongdai-%';
UPDATE products SET nhom = 'thoidai'  WHERE ma LIKE 'kh-thoidai-%';
UPDATE products SET nhom = 'hsk'      WHERE ma LIKE 'kh-hsk-%';

-- Đề thi thử: đổi giá theo bảng mới, vẫn bán.
UPDATE products
   SET gia = 399000, gia_goc = 499000, nhom = 'thi-thu', is_active = TRUE, sort_order = 900,
       ten = 'Ngân hàng đề thi thử TOCFL + HSK',
       mo_ta = 'Mở toàn bộ đề thi thử TOCFL và HSK, làm lại không giới hạn, chấm điểm tự động.'
 WHERE ma = 'bo-thi-thu';

-- -------------------------------------------------------------------------
-- 4. payments: đủ chỗ cho luồng chuyển khoản + duyệt tay
-- -------------------------------------------------------------------------
-- `ma_giao_dich` (đã có sẵn từ migration trước, đã có index) dùng làm MÃ ĐƠN — cũng chính là nội
-- dung chuyển khoản người học phải ghi. Không thêm cột mã thứ hai để khỏi có hai nguồn sự thật.
--
-- Ảnh bill lưu base64 trong MEDIUMTEXT, giống hệt cách `users.avatar_url` đang làm: dự án chưa có
-- hạ tầng lưu file (đã cân nhắc rồi bỏ Vercel Blob/S3 khi làm shadowing, CLAUDE.md 4.22b), thêm
-- một hạ tầng mới chỉ cho tính năng này là không tương xứng. MEDIUMTEXT chứa được 16MB, client
-- đã nén ảnh về <=1MB trước khi gửi.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'payments' AND COLUMN_NAME = 'anh_bill');
SET @s := IF(@c = 0, 'ALTER TABLE payments ADD COLUMN anh_bill MEDIUMTEXT DEFAULT NULL AFTER payload',
  'SELECT ''payments.anh_bill da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'payments' AND COLUMN_NAME = 'anh_gui_luc');
SET @s := IF(@c = 0, 'ALTER TABLE payments ADD COLUMN anh_gui_luc DATETIME DEFAULT NULL AFTER anh_bill',
  'SELECT ''payments.anh_gui_luc da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'payments' AND COLUMN_NAME = 'duyet_boi');
SET @s := IF(@c = 0, 'ALTER TABLE payments ADD COLUMN duyet_boi INT DEFAULT NULL AFTER anh_gui_luc',
  'SELECT ''payments.duyet_boi da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'payments' AND COLUMN_NAME = 'duyet_luc');
SET @s := IF(@c = 0, 'ALTER TABLE payments ADD COLUMN duyet_luc DATETIME DEFAULT NULL AFTER duyet_boi',
  'SELECT ''payments.duyet_luc da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Học viên đã XEM kết quả duyệt chưa — nuôi chuông thông báo (cùng lối với `assignment_reads`,
-- CLAUDE.md 4.18). NULL = chưa đọc.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'payments' AND COLUMN_NAME = 'da_doc_luc');
SET @s := IF(@c = 0, 'ALTER TABLE payments ADD COLUMN da_doc_luc DATETIME DEFAULT NULL AFTER duyet_luc',
  'SELECT ''payments.da_doc_luc da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Trạng thái: thêm 'tu-choi' để phân biệt "admin từ chối" với 'that-bai' (lỗi cổng thanh toán).
-- MODIFY chỉ nới tập giá trị hợp lệ, dữ liệu sẵn có giữ nguyên; chạy lại nhiều lần vô hại.
ALTER TABLE payments MODIFY COLUMN trang_thai
  ENUM('cho','thanh-cong','that-bai','hoan','tu-choi') NOT NULL DEFAULT 'cho';

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'payments' AND INDEX_NAME = 'idx_trang_thai');
SET @s := IF(@c = 0, 'ALTER TABLE payments ADD INDEX idx_trang_thai (trang_thai, created_at)',
  'SELECT ''payments.idx_trang_thai da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- -------------------------------------------------------------------------
-- 5. CẤU HÌNH TÀI KHOẢN NHẬN TIỀN
-- -------------------------------------------------------------------------
-- Bảng khoá-giá trị chung, KHÔNG hardcode số tài khoản vào mã nguồn: số tài khoản là thứ đổi
-- được mà không cần deploy lại, và không nên nằm trong git.
CREATE TABLE IF NOT EXISTS app_settings (
  khoa VARCHAR(60) PRIMARY KEY,
  gia_tri TEXT DEFAULT NULL,
  mo_ta VARCHAR(255) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Để TRỐNG có chủ ý: trang thanh toán tự hiện "chủ hệ thống chưa cấu hình tài khoản nhận tiền,
-- liên hệ quản trị viên" thay vì hiện một số tài khoản bịa. Chủ dự án điền ở khu Quản trị.
INSERT IGNORE INTO app_settings (khoa, gia_tri, mo_ta) VALUES
  ('bank_bin',      '',  'Mã BIN ngân hàng theo chuẩn VietQR, vd 970436 = Vietcombank.'),
  ('bank_ten',      '',  'Tên ngân hàng hiển thị cho người học, vd "Vietcombank".'),
  ('bank_stk',      '',  'Số tài khoản nhận tiền.'),
  ('bank_chu_tk',   '',  'Tên chủ tài khoản (IN HOA không dấu, đúng như trên app ngân hàng).'),
  ('lien_he_admin', 'https://www.facebook.com/hell.12344/', 'Link liên hệ khi người học gặp vấn đề thanh toán.');
