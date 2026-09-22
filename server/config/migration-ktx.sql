-- =============================================================
-- KÝ TÚC XÁ CỦA TRUNG TÂM   — 2026-09-17
-- =============================================================
-- Chỗ ở do CHÍNH TRUNG TÂM vận hành ở Việt Nam, học sinh ở trong lúc học tiếng chờ bay.
--
-- ⚠️ KHÔNG PHẢI `du_hoc_ho_so.ktx_*`. Năm cột đó (thêm ở 4.51) là NGUYỆN VỌNG Ở KTX CỦA
--    TRƯỜNG BÊN ĐÀI LOAN: `ktx_dang_ky` = em có muốn xin KTX của trường không, `ktx_han` = hạn
--    nộp đơn với trường, `ktx_kq` = trường đã duyệt chưa. Hai nghiệp vụ khác hẳn nhau — gộp vào
--    là mọi báo cáo "KTX" lẫn hai loại và không tách ra được nữa.
--
-- MÔ HÌNH: phòng ≈ lớp học, người ở ≈ học viên trong lớp. Trung tâm đã quen `classes` +
-- `class_enrollments` nên đi theo đúng lối đó, không phát minh mô hình thứ hai.

-- -------------------------------------------------------------------------
-- 1. TOÀ / CƠ SỞ
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ktx_toa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  org_id INT NOT NULL DEFAULT 1,
  ten VARCHAR(120) NOT NULL,
  dia_chi VARCHAR(300) DEFAULT NULL,
  ghi_chu VARCHAR(500) DEFAULT NULL,
  trang_thai ENUM('dang-dung','dong') NOT NULL DEFAULT 'dang-dung',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_org (org_id, trang_thai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 2. PHÒNG
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ktx_phong (
  id INT AUTO_INCREMENT PRIMARY KEY,
  toa_id INT NOT NULL,
  ten_phong VARCHAR(60) NOT NULL,
  tang VARCHAR(20) DEFAULT NULL,
  suc_chua INT NOT NULL DEFAULT 4,
  loai ENUM('nam','nu','chung') NOT NULL DEFAULT 'chung',
  -- Giá NIÊM YẾT của phòng. Giá đã chốt với từng người nằm ở `ktx_o.gia_thang` — đổi giá phòng
  -- về sau KHÔNG được làm đổi hợp đồng của người đang ở.
  gia_thang INT NOT NULL DEFAULT 0,
  tien_ich VARCHAR(300) DEFAULT NULL,
  trang_thai ENUM('dang-dung','bao-tri','dong') NOT NULL DEFAULT 'dang-dung',
  ghi_chu VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Cùng một toà không được có hai phòng trùng tên: xếp người vào "P203" mà có 2 phòng P203
  -- thì không ai biết em đó ở phòng nào.
  UNIQUE KEY uk_toa_phong (toa_id, ten_phong),
  INDEX idx_toa (toa_id, trang_thai),
  CONSTRAINT fk_ktx_phong_toa FOREIGN KEY (toa_id) REFERENCES ktx_toa(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 3. NGƯỜI Ở
-- -------------------------------------------------------------------------
-- CHỦ DỰ ÁN CHỐT 17/09/2026: người ở KHÔNG bắt buộc phải có hồ sơ du học.
-- `ho_so_id` và `user_id` đều cho phép NULL, và luôn có `ho_ten` + `phone` nhập tay — đúng lối
-- `du_hoc_ho_so` đã làm (4.49 mục 1). Ép phải có hồ sơ là trung tâm không nhập nổi người thật:
-- học viên học tiếng thường và người ngoài cũng thuê phòng.
CREATE TABLE IF NOT EXISTS ktx_o (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phong_id INT NOT NULL,
  ho_so_id INT DEFAULT NULL,
  user_id INT DEFAULT NULL,
  ho_ten VARCHAR(120) NOT NULL,
  phone VARCHAR(30) DEFAULT NULL,
  ngay_vao DATE NOT NULL,
  ngay_ra DATE DEFAULT NULL,
  -- Giá ĐÃ CHỐT với người này, chép từ `ktx_phong.gia_thang` lúc xếp phòng.
  gia_thang INT NOT NULL DEFAULT 0,
  tien_coc INT NOT NULL DEFAULT 0,
  trang_thai ENUM('dang-o','da-tra') NOT NULL DEFAULT 'dang-o',
  ghi_chu VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phong (phong_id, trang_thai),
  INDEX idx_ho_so (ho_so_id),
  INDEX idx_user (user_id),
  CONSTRAINT fk_ktx_o_phong FOREIGN KEY (phong_id) REFERENCES ktx_phong(id) ON DELETE CASCADE,
  -- Xoá hồ sơ du học thì bản ghi ở KTX vẫn còn (tiền đã thu là chuyện đã rồi), chỉ mất liên kết.
  CONSTRAINT fk_ktx_o_hoso FOREIGN KEY (ho_so_id) REFERENCES du_hoc_ho_so(id) ON DELETE SET NULL,
  CONSTRAINT fk_ktx_o_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 4. THU TIỀN PHÒNG
-- -------------------------------------------------------------------------
-- Khác `du_hoc_thu_tien` ở chỗ có cột `ky` (YYYY-MM): tiền phòng thu theo CHU KỲ THÁNG, còn phí
-- du học thu theo khoản một lần. Có `ky` mới trả lời được câu dùng nhiều nhất mỗi ngày —
-- "tháng này ai chưa đóng".
CREATE TABLE IF NOT EXISTS ktx_thu_tien (
  id INT AUTO_INCREMENT PRIMARY KEY,
  o_id INT NOT NULL,
  ky CHAR(7) NOT NULL COMMENT 'YYYY-MM',
  loai ENUM('tien-phong','dien-nuoc','coc','hoan-coc','khac') NOT NULL DEFAULT 'tien-phong',
  -- Hoàn tiền đi bằng loai='hoan-coc' với số DƯƠNG, không dùng số âm — cùng nguyên tắc
  -- `du_hoc_thu_tien` (4.49): số âm trông giống lỗi nhập liệu và bắt mọi câu SUM phải nhớ xét dấu.
  so_tien INT NOT NULL,
  ngay_thu DATE NOT NULL,
  hinh_thuc ENUM('tien-mat','chuyen-khoan','the','khac') NOT NULL DEFAULT 'tien-mat',
  chung_tu VARCHAR(60) DEFAULT NULL,
  nguoi_thu_id INT DEFAULT NULL,
  ghi_chu VARCHAR(500) DEFAULT NULL,
  anh MEDIUMTEXT DEFAULT NULL,
  anh_luc DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_o_ky (o_id, ky),
  INDEX idx_ngay (ngay_thu),
  CONSTRAINT fk_ktx_thu_o FOREIGN KEY (o_id) REFERENCES ktx_o(id) ON DELETE CASCADE,
  CONSTRAINT fk_ktx_thu_nguoi FOREIGN KEY (nguoi_thu_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
