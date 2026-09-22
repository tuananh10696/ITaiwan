-- =============================================================
-- TỔ CHỨC (multi-tenant) + QUYỀN NỘI DUNG (entitlement)   — 2026-09-09
-- =============================================================
-- Mô hình kinh doanh cần đỡ 3 việc mà schema cũ không diễn đạt được:
--   1. Bán khoá cho học viên  -> phải biết ai mua GÌ, tới BAO GIỜ.
--   2. Cho trung tâm thuê     -> dữ liệu trung tâm A không được lộ sang B, và trung tâm phải
--                                tự quản lý được lớp + giáo viên của mình.
--   3. Bán đứt hệ thống       -> tổ chức có hạn dùng riêng, hết hạn thì khoá khu quản trị.
--
-- Cột `users.is_approved` cũ CHỈ là một cờ boolean do admin bấm tay: không hạn, không phân biệt
-- sản phẩm, không biết ai cấp. GIỮ NGUYÊN cột đó (auth.js và main.js vẫn đọc) nhưng từ nay nó
-- chỉ còn nghĩa "tài khoản đã được duyệt cho vào hệ thống"; việc "được học nội dung nào" chuyển
-- hẳn sang bảng `entitlements`.
--
-- Chạy bằng `npm run db:migrate:local` / `db:migrate:prod` (CLAUDE.md 4.16), KHÔNG chạy tay.

-- -------------------------------------------------------------------------
-- 1. TỔ CHỨC
-- -------------------------------------------------------------------------
-- id = 1 là tổ chức NỀN TẢNG (chính chủ dự án). Mọi tài khoản đang có thuộc về nó, nên toàn bộ
-- dữ liệu cũ giữ nguyên hành vi sau khi migrate. Đừng xoá hàng này.
CREATE TABLE IF NOT EXISTS organizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ma VARCHAR(40) NOT NULL UNIQUE,
  ten VARCHAR(150) NOT NULL,
  -- 'nen-tang' = tổ chức gốc của chính mình; 'trung-tam' = khách thuê.
  loai ENUM('nen-tang','trung-tam') NOT NULL DEFAULT 'trung-tam',
  -- Gói thuê. 'mua-dut' thì het_han để NULL.
  goi VARCHAR(40) NOT NULL DEFAULT 'dung-thu',
  trang_thai ENUM('hoat-dong','tam-dung','het-han') NOT NULL DEFAULT 'hoat-dong',
  bat_dau DATE DEFAULT NULL,
  -- NULL = không hạn (tổ chức nền tảng, hoặc khách mua đứt).
  het_han DATE DEFAULT NULL,
  -- NULL = không giới hạn. Đếm khi thêm người, xem server/utils/to-chuc.js.
  gioi_han_hoc_vien INT DEFAULT NULL,
  gioi_han_giao_vien INT DEFAULT NULL,
  -- Môn được phép dạy, phân tách bằng dấu phẩy: 'zh' | 'zh,en' | 'zh,en,ja'.
  -- Để sẵn cho tiếng Anh / tiếng Nhật; hiện mọi nội dung đều là 'zh'.
  mon VARCHAR(60) NOT NULL DEFAULT 'zh',
  lien_he_ten VARCHAR(120) DEFAULT NULL,
  lien_he_email VARCHAR(255) DEFAULT NULL,
  lien_he_phone VARCHAR(30) DEFAULT NULL,
  ghi_chu VARCHAR(1000) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_trang_thai (trang_thai, het_han)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO organizations (id, ma, ten, loai, goi, trang_thai, mon, ghi_chu)
SELECT 1, 'ten', 'Tẻn', 'nen-tang', 'mua-dut', 'hoat-dong', 'zh',
       'Tổ chức gốc — mọi tài khoản có sẵn thuộc về đây. Không xoá.'
WHERE NOT EXISTS (SELECT 1 FROM organizations WHERE id = 1);

-- -------------------------------------------------------------------------
-- 2. SẢN PHẨM BÁN
-- -------------------------------------------------------------------------
-- `pham_vi` là JSON: {"tatCa":true} hoặc {"bo":["duongdai"],"quyen":[1,2,3]}.
-- Dùng JSON chứ không phải cột riêng vì phạm vi mỗi sản phẩm một khác (theo bộ / theo quyển /
-- theo cấp), và phần đọc nằm gọn trong server/utils/quyen-noi-dung.js — không truy vấn SQL nào
-- phải tự hiểu cấu trúc này.
CREATE TABLE IF NOT EXISTS products (
  ma VARCHAR(40) PRIMARY KEY,
  ten VARCHAR(150) NOT NULL,
  mo_ta VARCHAR(500) DEFAULT NULL,
  mon VARCHAR(10) NOT NULL DEFAULT 'zh',
  loai ENUM('goi-thoi-gian','bo-le') NOT NULL,
  pham_vi JSON NOT NULL,
  -- Gói thời gian: số ngày hiệu lực kể từ lúc cấp. Mua lẻ: NULL (vĩnh viễn).
  so_ngay INT DEFAULT NULL,
  gia INT NOT NULL DEFAULT 0,
  tien_te VARCHAR(5) NOT NULL DEFAULT 'VND',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO products (ma, ten, mo_ta, mon, loai, pham_vi, so_ngay, gia, sort_order) VALUES
  ('goi-1-thang',  'Gói 1 tháng',  'Mở toàn bộ giáo trình trong 30 ngày.',  'zh', 'goi-thoi-gian', '{"tatCa":true}',   30,  199000, 10),
  ('goi-6-thang',  'Gói 6 tháng',  'Mở toàn bộ giáo trình trong 180 ngày.', 'zh', 'goi-thoi-gian', '{"tatCa":true}',  180,  899000, 20),
  ('goi-12-thang', 'Gói 12 tháng', 'Mở toàn bộ giáo trình trong 365 ngày.', 'zh', 'goi-thoi-gian', '{"tatCa":true}',  365, 1490000, 30),
  ('bo-duongdai',  'Giáo trình Đương đại (6 quyển)', 'Sở hữu vĩnh viễn bộ Đương đại.', 'zh', 'bo-le', '{"bo":["duongdai"]}', NULL, 990000, 40),
  ('bo-thoidai',   'Giáo trình Thời Đại (5 quyển)',  'Sở hữu vĩnh viễn bộ Thời Đại.',  'zh', 'bo-le', '{"bo":["thoidai"]}',  NULL, 890000, 50),
  ('bo-hsk',       'HSK 3.0 (6 cấp)',                'Sở hữu vĩnh viễn bộ HSK 3.0.',   'zh', 'bo-le', '{"bo":["hsk"]}',      NULL, 790000, 60),
  ('bo-thi-thu',   'Ngân hàng đề thi thử',           'Thi thử TOCFL và HSK không giới hạn.', 'zh', 'bo-le', '{"bo":["thi-thu"]}', NULL, 490000, 70);

-- -------------------------------------------------------------------------
-- 3. QUYỀN NỘI DUNG ĐÃ CẤP
-- -------------------------------------------------------------------------
-- Cấp cho MỘT học viên (user_id) hoặc cho CẢ tổ chức (org_id) — đúng một trong hai.
-- Bảng APPEND-mostly: gia hạn thì thêm bản ghi mới, thu hồi thì đổi trang_thai='huy'.
-- Không upsert, để còn tra được lịch sử ai cấp gì lúc nào.
CREATE TABLE IF NOT EXISTS entitlements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  org_id INT DEFAULT NULL,
  product_ma VARCHAR(40) NOT NULL,
  nguon ENUM('mua','trung-tam','admin','khuyen-mai','dung-thu') NOT NULL DEFAULT 'admin',
  bat_dau DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- NULL = vĩnh viễn (mua lẻ, hoặc admin cấp không hạn).
  het_han DATETIME DEFAULT NULL,
  trang_thai ENUM('hoat-dong','huy') NOT NULL DEFAULT 'hoat-dong',
  cap_boi INT DEFAULT NULL,
  ghi_chu VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_user (user_id, trang_thai, het_han),
  KEY idx_org (org_id, trang_thai, het_han),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 4. GIAO DỊCH — chỗ nối cổng thanh toán, CHƯA dùng ở giai đoạn này
-- -------------------------------------------------------------------------
-- Hiện admin/trung tâm kích hoạt tay (cong='tay'). Khi nối VNPay/MoMo/Stripe thì webhook chỉ
-- việc ghi vào đây rồi gọi capQuyen() — không phải sửa chỗ nào khác trong luồng phân quyền.
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  org_id INT DEFAULT NULL,
  product_ma VARCHAR(40) DEFAULT NULL,
  so_tien INT NOT NULL DEFAULT 0,
  tien_te VARCHAR(5) NOT NULL DEFAULT 'VND',
  cong ENUM('tay','vnpay','momo','stripe','chuyen-khoan') NOT NULL DEFAULT 'tay',
  ma_giao_dich VARCHAR(120) DEFAULT NULL,
  trang_thai ENUM('cho','thanh-cong','that-bai','hoan') NOT NULL DEFAULT 'cho',
  entitlement_id INT DEFAULT NULL,
  payload JSON DEFAULT NULL,
  ghi_chu VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_user (user_id, created_at),
  KEY idx_ma (ma_giao_dich)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 5. GẮN TỔ CHỨC VÀO users VÀ classes
-- -------------------------------------------------------------------------
-- DEFAULT 1 nên mọi hàng cũ tự thuộc tổ chức nền tảng — không có bước backfill nào có thể sai.
SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'org_id');
SET @s := IF(@c = 0,
  'ALTER TABLE users ADD COLUMN org_id INT NOT NULL DEFAULT 1 AFTER id',
  'SELECT ''users.org_id da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME = 'idx_org_role');
SET @s := IF(@c = 0, 'ALTER TABLE users ADD INDEX idx_org_role (org_id, role)',
  'SELECT ''users.idx_org_role da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND CONSTRAINT_NAME = 'fk_users_org');
SET @s := IF(@c = 0,
  'ALTER TABLE users ADD CONSTRAINT fk_users_org FOREIGN KEY (org_id) REFERENCES organizations(id)',
  'SELECT ''fk_users_org da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'classes' AND COLUMN_NAME = 'org_id');
SET @s := IF(@c = 0,
  'ALTER TABLE classes ADD COLUMN org_id INT NOT NULL DEFAULT 1 AFTER id',
  'SELECT ''classes.org_id da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'classes' AND INDEX_NAME = 'idx_org');
SET @s := IF(@c = 0, 'ALTER TABLE classes ADD INDEX idx_org (org_id)',
  'SELECT ''classes.idx_org da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @c := (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'classes' AND CONSTRAINT_NAME = 'fk_classes_org');
SET @s := IF(@c = 0,
  'ALTER TABLE classes ADD CONSTRAINT fk_classes_org FOREIGN KEY (org_id) REFERENCES organizations(id)',
  'SELECT ''fk_classes_org da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Lớp phải cùng tổ chức với giáo viên phụ trách. Có WHERE nên chỉ chạm lớp thật sự lệch.
UPDATE classes c JOIN users u ON u.id = c.teacher_id
   SET c.org_id = u.org_id
 WHERE c.teacher_id IS NOT NULL AND c.org_id <> u.org_id;

-- -------------------------------------------------------------------------
-- 6. VAI TRÒ MỚI: org_admin (quản trị viên TRUNG TÂM)
-- -------------------------------------------------------------------------
-- Trước đây muốn cho trung tâm tự quản lý lớp thì chỉ có cách bật role='admin' — tức trao luôn
-- quyền xoá tài khoản của mọi người và sửa từ vựng của cả nền tảng. `org_admin` lấp đúng khoảng
-- trống đó: toàn quyền TRONG tổ chức mình, không thấy tổ chức khác, không đụng nội dung nền tảng.
--
-- MODIFY giữ nguyên dữ liệu sẵn có (chỉ nới tập giá trị hợp lệ) và chạy lại nhiều lần vô hại.
ALTER TABLE users MODIFY COLUMN role
  ENUM('student','teacher','org_admin','admin') NOT NULL DEFAULT 'student';
