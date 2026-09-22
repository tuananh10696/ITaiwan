-- =============================================================
-- SỔ THU – CHI CỦA TRUNG TÂM   — 2026-09-17
-- =============================================================
-- Trung tâm tự lập phiếu thu / phiếu chi và xem được cuối tháng lãi lỗ ra sao.
--
-- BA DÒNG TIỀN ĐANG TỒN TẠI TRONG HỆ THỐNG — đừng trộn:
--   `payments`         học viên mua KHOÁ ONLINE -> về tài khoản CHỦ NỀN TẢNG, admin nền tảng duyệt.
--   `du_hoc_thu_tien`  phí dịch vụ du học      -> về TRUNG TÂM.
--   `quy_phieu` (mới)  mọi khoản thu/chi khác của trung tâm.
--
-- QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG NHẤT — chốt với chủ dự án 17/09/2026:
--   Tiền du học và tiền ký túc xá **KHÔNG tự động sinh phiếu** sang bảng này.
--   `quy_phieu` chỉ chứa phiếu TỰ TẠO; báo cáo tổng thì UNION ba nguồn lúc đọc và ghi rõ nguồn
--   ở từng dòng. Lý do: `du_hoc_thu_tien` đã là nguồn sự thật của tiền du học (4.49 ghi rõ
--   "công nợ luôn tính từ đây, không lưu sẵn — lưu hai nơi là sớm muộn cũng lệch"). Sinh phiếu
--   tự động thì mỗi lần sửa/xoá một khoản thu là phải đồng bộ hai chiều, và chỉ cần quên một
--   nhánh là sổ quỹ lệch mà không ai biết.
--
-- Chạy bằng `npm run db:migrate:local` / `db:migrate:prod` (4.16), KHÔNG chạy tay.

-- -------------------------------------------------------------------------
-- 1. DANH MỤC THU / CHI — mỗi trung tâm tự cấu hình danh mục của mình
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quy_danh_muc (
  id INT AUTO_INCREMENT PRIMARY KEY,
  org_id INT NOT NULL DEFAULT 1,
  loai ENUM('thu','chi') NOT NULL,
  ten VARCHAR(100) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Cùng một trung tâm không được có 2 danh mục trùng tên trong cùng loại: báo cáo gom theo
  -- danh mục, trùng tên là ra 2 dòng giống hệt nhau mà số liệu chia đôi.
  UNIQUE KEY uk_org_loai_ten (org_id, loai, ten),
  INDEX idx_org (org_id, loai, is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 2. PHIẾU THU / PHIẾU CHI
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quy_phieu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  org_id INT NOT NULL DEFAULT 1,
  -- PT-0001 / PC-0001, tự sinh theo TỪNG tổ chức. Hai trung tâm trùng mã là bình thường —
  -- cùng lối `du_hoc_ho_so.ma_hs`.
  ma_phieu VARCHAR(30) NOT NULL,
  loai ENUM('thu','chi') NOT NULL,
  ngay DATE NOT NULL,
  -- Dùng INT (đồng), không DECIMAL: tiền Việt không có phần lẻ, và `du_hoc_thu_tien.so_tien`
  -- đã là INT nên hai bảng cộng được với nhau mà không phải ép kiểu.
  so_tien INT NOT NULL,
  danh_muc_id INT DEFAULT NULL,
  -- Thu của ai / chi cho ai. Để TỰ DO chứ không khoá ngoại sang `users`: phần lớn đối tượng
  -- (chủ nhà, nhà in, công ty điện) không bao giờ có tài khoản trong hệ thống.
  doi_tuong VARCHAR(150) DEFAULT NULL,
  hinh_thuc ENUM('tien-mat','chuyen-khoan','the','khac') NOT NULL DEFAULT 'tien-mat',
  dien_giai VARCHAR(500) DEFAULT NULL,
  nguoi_lap_id INT DEFAULT NULL,
  -- Ảnh chứng từ base64, cùng lối `payments.anh_bill` (4.42) và `du_hoc_thu_tien.anh` (4.51).
  -- ⚠️ Danh sách phiếu KHÔNG BAO GIỜ được SELECT cột này — chỉ `(anh IS NOT NULL) AS co_anh`.
  anh MEDIUMTEXT DEFAULT NULL,
  anh_luc DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_org_ma (org_id, ma_phieu),
  INDEX idx_org_ngay (org_id, ngay),
  INDEX idx_danh_muc (danh_muc_id),
  -- Xoá danh mục thì phiếu cũ vẫn còn, chỉ mất nhãn — xoá theo là mất luôn số liệu lịch sử.
  CONSTRAINT fk_quy_phieu_dm FOREIGN KEY (danh_muc_id) REFERENCES quy_danh_muc(id) ON DELETE SET NULL,
  CONSTRAINT fk_quy_phieu_nguoi FOREIGN KEY (nguoi_lap_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
