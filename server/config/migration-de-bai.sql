-- =============================================================
-- ĐỀ BÀI TẬP / BÀI KIỂM TRA TỰ SOẠN + GIAO CHO LỚP   — 2026-09-17
-- =============================================================
-- Giáo viên tự soạn đề trên hệ thống, giao cho cả lớp hoặc từng học sinh, quy định thời gian
-- làm bài. Học sinh nhận thông báo, vào làm, nộp xong biết điểm ngay.
--
-- VÌ SAO KHÔNG DÙNG LẠI THỨ ĐANG CÓ:
--   `exam_questions`  là nội dung NỀN TẢNG đem bán, không có org_id, admin nền tảng quản.
--                     Cho trung tâm ghi vào là họ sửa được đề của nền tảng và thấy đề của nhau.
--   `assignments`     `lesson_id` trỏ vào bài CÓ SẴN trong danh mục (giáo trình/game/dịch), và
--                     UNIQUE(class_id, lesson_id, exercise_type) chỉ giao được cho CẢ LỚP —
--                     không có chỗ chứa đề tự soạn, cũng không chọn được từng học sinh.
--   `exercise_results` append-only, không có chỗ cho: bài đang làm dở, mốc bắt đầu, lần thứ mấy,
--                     điểm từng câu, chấm tay câu tự luận.
--
-- ⚠️ ĐIỂM QUAN TRỌNG NHẤT — CHẤM Ở SERVER.
--    Mọi bài tập hiện có đều chấm ở trình duyệt rồi gửi điểm lên (giáo trình, game, HSK) — chấp
--    nhận được vì là bài TỰ LUYỆN. Nhưng đây là bài kiểm tra có điểm thật của giáo viên: chấm ở
--    client thì học viên sửa request là 100%. Cột `dap_an` KHÔNG BAO GIỜ được gửi xuống client
--    trước khi nộp — mọi truy vấn trả đề cho học sinh phải SELECT tường minh, không `SELECT *`.

-- -------------------------------------------------------------------------
-- 1. ĐỀ
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS de_bai (
  id INT AUTO_INCREMENT PRIMARY KEY,
  org_id INT NOT NULL DEFAULT 1,
  ma VARCHAR(30) NOT NULL COMMENT 'DE-0001, tự sinh theo từng tổ chức',
  tieu_de VARCHAR(200) NOT NULL,
  mo_ta VARCHAR(1000) DEFAULT NULL,
  loai ENUM('bai-tap','kiem-tra') NOT NULL DEFAULT 'bai-tap',
  -- NULL = không giới hạn thời gian.
  thoi_gian_phut INT DEFAULT NULL,
  tron_cau TINYINT(1) NOT NULL DEFAULT 0,
  tron_dap_an TINYINT(1) NOT NULL DEFAULT 0,
  so_lan_lam INT NOT NULL DEFAULT 1 COMMENT '0 = không giới hạn',
  hien_dap_an ENUM('ngay','sau-han','khong') NOT NULL DEFAULT 'ngay',
  diem_dat DECIMAL(5,2) NOT NULL DEFAULT 50.00 COMMENT '% để coi là đạt',
  tao_boi INT DEFAULT NULL,
  -- Soạn dở thì để `nhap`, chưa ai nhìn thấy cho tới khi bấm phát hành.
  trang_thai ENUM('nhap','phat-hanh') NOT NULL DEFAULT 'nhap',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_org_ma (org_id, ma),
  INDEX idx_org (org_id, trang_thai),
  INDEX idx_tao_boi (tao_boi),
  CONSTRAINT fk_de_org FOREIGN KEY (org_id) REFERENCES organizations(id) ON DELETE CASCADE,
  CONSTRAINT fk_de_nguoi FOREIGN KEY (tao_boi) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 2. CÂU HỎI
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS de_cau_hoi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  de_id INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  loai ENUM('mot-dap-an','nhieu-dap-an','dung-sai','dien-tu','tu-luan') NOT NULL DEFAULT 'mot-dap-an',
  noi_dung TEXT NOT NULL,
  -- Ảnh minh hoạ base64 (đề có tranh/bảng biểu). Client nén trước khi gửi, cùng cách 4.51.
  -- ⚠️ Danh sách câu hỏi trong màn soạn đề KHÔNG SELECT cột này.
  anh MEDIUMTEXT DEFAULT NULL,
  -- Lựa chọn: JSON mảng chuỗi ["A","B","C"]. Dạng dien-tu / tu-luan để NULL.
  lua_chon JSON DEFAULT NULL,
  -- Đáp án: JSON. mot-dap-an -> [0]; nhieu-dap-an -> [0,2]; dung-sai -> [0]|[1];
  -- dien-tu -> ["đáp án 1","đáp án 2"] (chấp nhận nhiều phương án đúng); tu-luan -> null.
  -- ⚠️ CỘT NÀY KHÔNG BAO GIỜ ĐƯỢC GỬI XUỐNG CLIENT TRƯỚC KHI HỌC SINH NỘP BÀI.
  dap_an JSON DEFAULT NULL,
  diem DECIMAL(5,2) NOT NULL DEFAULT 1.00,
  giai_thich VARCHAR(1000) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_de (de_id, sort_order),
  CONSTRAINT fk_ch_de FOREIGN KEY (de_id) REFERENCES de_bai(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 3. GIAO ĐỀ
-- -------------------------------------------------------------------------
-- Giao cho CẢ LỚP (class_id) hoặc TỪNG EM (user_id) — đúng yêu cầu khách. Đúng một trong hai
-- phải khác NULL; kiểm ở tầng route vì MySQL 5.7 không có CHECK constraint thật.
CREATE TABLE IF NOT EXISTS de_giao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  de_id INT NOT NULL,
  class_id INT DEFAULT NULL,
  user_id INT DEFAULT NULL,
  mo_luc DATETIME DEFAULT NULL COMMENT 'NULL = mở ngay',
  dong_luc DATETIME DEFAULT NULL COMMENT 'NULL = không có hạn',
  ghi_chu VARCHAR(500) DEFAULT NULL,
  giao_boi INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_de (de_id),
  INDEX idx_class (class_id),
  INDEX idx_user (user_id),
  CONSTRAINT fk_giao_de FOREIGN KEY (de_id) REFERENCES de_bai(id) ON DELETE CASCADE,
  CONSTRAINT fk_giao_lop FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  CONSTRAINT fk_giao_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_giao_nguoi FOREIGN KEY (giao_boi) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 4. BÀI LÀM
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS de_bai_lam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  de_id INT NOT NULL,
  giao_id INT DEFAULT NULL,
  user_id INT NOT NULL,
  lan_thu INT NOT NULL DEFAULT 1,
  -- Mốc SERVER ghi lúc học sinh bấm "Bắt đầu". Đồng hồ tính từ đây, client chỉ hiển thị —
  -- không thì F5 là đồng hồ chạy lại từ đầu.
  bat_dau_luc DATETIME NOT NULL,
  nop_luc DATETIME DEFAULT NULL,
  het_gio TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'nộp sau khi hết giờ',
  diem DECIMAL(6,2) DEFAULT NULL,
  tong_diem DECIMAL(6,2) DEFAULT NULL,
  so_cau_dung INT DEFAULT NULL,
  tong_cau INT DEFAULT NULL,
  -- Bài làm: JSON { "<cau_hoi_id>": { tra_loi, dung, diem } }
  tra_loi JSON DEFAULT NULL,
  cham_boi INT DEFAULT NULL,
  cham_luc DATETIME DEFAULT NULL,
  nhan_xet TEXT DEFAULT NULL,
  da_doc_luc DATETIME DEFAULT NULL COMMENT 'học sinh đã đọc nhận xét chưa',
  trang_thai ENUM('dang-lam','da-nop','da-cham') NOT NULL DEFAULT 'dang-lam',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_de_user (de_id, user_id),
  INDEX idx_user (user_id, trang_thai),
  INDEX idx_giao (giao_id),
  CONSTRAINT fk_bl_de FOREIGN KEY (de_id) REFERENCES de_bai(id) ON DELETE CASCADE,
  CONSTRAINT fk_bl_giao FOREIGN KEY (giao_id) REFERENCES de_giao(id) ON DELETE SET NULL,
  CONSTRAINT fk_bl_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_bl_cham FOREIGN KEY (cham_boi) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
