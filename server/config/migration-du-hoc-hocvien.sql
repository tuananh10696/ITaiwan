-- =============================================================
-- DU HỌC: CỔNG HỌC SINH + chứng từ ảnh + thông báo   — 2026-09-16
-- =============================================================
-- Khu du học (migration-du-hoc.sql, CLAUDE.md 4.49) dựng ra là công cụ MỘT PHÍA: chỉ quản trị
-- trung tâm nhập và xem. Khách phản hồi cần hai phía — học sinh tự khai thông tin + nguyện vọng
-- + ký túc xá, tự xem tiền đã đóng và mình đang ở giai đoạn nào, và nhận thông báo lịch phỏng
-- vấn / lịch bay / nhắc nộp.
--
-- BỐN quyết định thiết kế, ghi lại để đợt sau không làm ngược:
--
-- 1. HỌC SINH KHAI XONG LÀ KHOÁ (`hs_gui_luc`).
--    Tư vấn viên đang làm hồ sơ mà dữ liệu bị đổi dưới tay là hỏng việc thật. Nên: chưa gửi thì
--    sửa tự do; gửi rồi thì mọi thay đổi phải đi qua `du_hoc_yeu_cau_sua` và được duyệt.
--
-- 2. YÊU CẦU SỬA LƯU NGUYÊN CẶP CŨ→MỚI, KHÔNG chỉ lưu giá trị mới.
--    Người duyệt phải thấy được "đổi từ gì sang gì" mới quyết được. Chỉ lưu giá trị mới thì lúc
--    duyệt phải tự đi tra hồ sơ để so, mà giữa lúc chờ duyệt hồ sơ có thể đã đổi.
--
-- 3. ẢNH CHỨNG TỪ DÙNG base64 TRONG DB, đúng lối `payments.anh_bill` (4.42) — KHÔNG phải đổi ý
--    so với 4.49 ("giấy tờ chỉ là checklist, không lưu file"). Phạm vi cố ý HẸP: mỗi khoản thu
--    một ảnh, không mở cho 15 mục giấy tờ. Lý do là dung lượng: 15 ảnh × 100 hồ sơ ≈ 600MB trong
--    DB Aiven, trong khi chứng từ tiền thì mỗi hồ sơ chỉ vài khoản.
--    Client nén xuống ~400KB trước khi gửi; server chặn cứng ở 700KB (xem KT_ANH trong route).
--
-- 4. THÔNG BÁO GHI THÀNH BẢNG RIÊNG, không suy từ cột mốc của hồ sơ.
--    Suy tại chỗ thì không biết em đã đọc chưa, và đổi ngày phỏng vấn hai lần chỉ còn thấy lần
--    cuối. Bảng append-only giữ đúng những gì đã báo và lúc nào — cùng lối `du_hoc_lich_su`.
--
-- Chạy bằng `npm run db:migrate:local` / `db:migrate:prod` (CLAUDE.md 4.16), KHÔNG chạy tay.

-- -------------------------------------------------------------------------
-- 1. HỒ SƠ: trạng thái khai báo của học sinh + nguyện vọng ký túc xá
-- -------------------------------------------------------------------------
-- NULL = học sinh chưa gửi khai báo (còn sửa tự do). Có giá trị = đã chốt, khoá form.
ALTER TABLE du_hoc_ho_so ADD COLUMN hs_gui_luc DATETIME DEFAULT NULL;

-- Ký túc xá. Ba cột đầu HỌC SINH tự khai; hai cột sau NHÂN VIÊN điền khi có kết quả từ trường.
ALTER TABLE du_hoc_ho_so ADD COLUMN ktx_dang_ky ENUM('chua-quyet','co','khong') NOT NULL DEFAULT 'chua-quyet';
ALTER TABLE du_hoc_ho_so ADD COLUMN ktx_loai VARCHAR(60) DEFAULT NULL;
ALTER TABLE du_hoc_ho_so ADD COLUMN ktx_ghi_chu VARCHAR(300) DEFAULT NULL;
ALTER TABLE du_hoc_ho_so ADD COLUMN ktx_kq ENUM('cho','duoc','khong-duoc') DEFAULT NULL;
ALTER TABLE du_hoc_ho_so ADD COLUMN ktx_han DATE DEFAULT NULL;

-- -------------------------------------------------------------------------
-- 2. YÊU CẦU SỬA — hàng chờ duyệt
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS du_hoc_yeu_cau_sua (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ho_so_id INT NOT NULL,
  -- Ai gửi. Luôn là chính chủ hồ sơ (route lọc theo user_id), giữ lại để truy vết.
  user_id INT DEFAULT NULL,
  -- JSON: [{ cot, nhan, cu, moi }]. Lưu TEXT chứ không JSON type — dự án đang dùng TEXT cho
  -- exercise_results.details_json, giữ một lối cho cả hệ thống.
  thay_doi TEXT NOT NULL,
  ly_do VARCHAR(500) DEFAULT NULL,
  trang_thai ENUM('cho','duyet','tu-choi') NOT NULL DEFAULT 'cho',
  nguoi_duyet_id INT DEFAULT NULL,
  duyet_luc DATETIME DEFAULT NULL,
  -- Từ chối phải nói lý do, nếu không học sinh gửi lại y hệt.
  phan_hoi VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_ho_so (ho_so_id, created_at),
  KEY idx_cho (trang_thai, created_at),
  FOREIGN KEY (ho_so_id) REFERENCES du_hoc_ho_so(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (nguoi_duyet_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 3. THÔNG BÁO cho học sinh
-- -------------------------------------------------------------------------
-- Append-only. Chuông của học viên (exercise.js /notifications) gộp thêm loại 'du-hoc' đọc từ
-- bảng này; email nhắc hằng ngày (cron.js) cũng đọc chính nó để không nhắc trùng.
CREATE TABLE IF NOT EXISTS du_hoc_thong_bao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ho_so_id INT NOT NULL,
  -- Lặp lại user_id ở đây (thay vì JOIN sang hồ sơ mỗi lần) vì chuông query theo user rất nhiều
  -- lần, còn hồ sơ chưa gắn tài khoản thì không sinh thông báo nào.
  user_id INT NOT NULL,
  loai ENUM('phong-van','bay','visa','buoc','nhac-giay-to','nhac-tien','ktx','sua-duyet','sua-tu-choi','khai-bao')
       NOT NULL DEFAULT 'buoc',
  tieu_de VARCHAR(200) NOT NULL,
  noi_dung VARCHAR(1000) DEFAULT NULL,
  -- Ngày của sự kiện (phỏng vấn/bay/hạn nộp) để giao diện hiện chip đếm ngược.
  ngay_lien_quan DATE DEFAULT NULL,
  da_doc_luc DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_user (user_id, created_at),
  KEY idx_ho_so (ho_so_id, created_at),
  FOREIGN KEY (ho_so_id) REFERENCES du_hoc_ho_so(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 4. CHỨNG TỪ ẢNH cho khoản thu tiền
-- -------------------------------------------------------------------------
-- MEDIUMTEXT (16MB) như payments.anh_bill. Danh sách khoản thu KHÔNG BAO GIỜ được SELECT cột
-- này — chỉ `anh IS NOT NULL AS co_anh`; kéo cả ảnh về cho một bảng 20 dòng là vài chục MB.
ALTER TABLE du_hoc_thu_tien ADD COLUMN anh MEDIUMTEXT DEFAULT NULL;
ALTER TABLE du_hoc_thu_tien ADD COLUMN anh_luc DATETIME DEFAULT NULL;
