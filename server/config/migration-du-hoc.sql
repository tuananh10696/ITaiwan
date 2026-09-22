-- =============================================================
-- QUẢN LÝ HỒ SƠ DU HỌC cho trung tâm thuê hệ thống   — 2026-09-15
-- =============================================================
-- Luồng nghiệp vụ của một trung tâm du học Đài Loan:
--   Nhận hồ sơ -> Đóng tiền -> Học tiếng -> Phỏng vấn trường -> Xin visa -> Chốt lịch bay
--
-- BỐN quyết định thiết kế, ghi lại để đợt sau không làm ngược:
--
-- 1. HỒ SƠ TÁCH KHỎI `users`, `user_id` cho phép NULL.
--    Trung tâm nhận hồ sơ của em chưa hề có tài khoản (và `users.email` là UNIQUE — rất nhiều em
--    dùng chung email phụ huynh, ép mỗi em một tài khoản là không nhận nổi hồ sơ). Khi em vào lớp
--    học tiếng trên hệ thống thì gắn `user_id` để xem luôn điểm danh + điểm bài tập.
--
-- 2. TIỀN Ở ĐÂY KHÔNG PHẢI `payments`.
--    `payments` là tiền học viên mua KHOÁ HỌC ONLINE, về tài khoản chủ nền tảng, admin nền tảng
--    duyệt. Tiền trong bảng này là phí dịch vụ du học học viên đóng cho TRUNG TÂM — dòng tiền
--    khác, người thu khác, báo cáo khác. Trộn vào một bảng là lệch báo cáo doanh thu của nền tảng.
--
-- 3. GIẤY TỜ CHỈ LÀ CHECKLIST, KHÔNG LƯU FILE.
--    Dự án chưa có hạ tầng lưu file và đã cân nhắc rồi bỏ Vercel Blob/S3 nhiều lần (CLAUDE.md
--    4.22b, 4.42). Bản giấy vẫn nằm ở trung tâm như thực tế đang làm; hệ thống chỉ trả lời
--    "em này còn thiếu giấy gì".
--
-- 4. SÁU BƯỚC KHÔNG TUẦN TỰ CỨNG.
--    Thực tế "Học" chạy song song với "Phỏng vấn" và "Xin visa", và có em trượt visa phải làm lại.
--    Nên cho chuyển tới/lùi tự do, cộng 3 trạng thái kết thúc, và mỗi lần đổi bước ghi một dòng
--    `du_hoc_lich_su` (ai đổi, lúc nào, vì sao) — không có nó thì không ai trả lời được
--    "hồ sơ này nằm ở bước phỏng vấn bao lâu rồi".
--
-- Chạy bằng `npm run db:migrate:local` / `db:migrate:prod` (CLAUDE.md 4.16), KHÔNG chạy tay.

-- -------------------------------------------------------------------------
-- 1. HỒ SƠ
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS du_hoc_ho_so (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Trung tâm sở hữu hồ sơ. Mọi truy vấn PHẢI lọc theo cột này (trừ admin nền tảng).
  org_id INT NOT NULL DEFAULT 1,
  -- Tài khoản học trên hệ thống, nếu em đó có. NULL = mới chỉ là hồ sơ du học.
  user_id INT DEFAULT NULL,
  -- Mã hồ sơ trung tâm dùng để gọi nhau ("hồ sơ HS-0042"). Tự sinh nếu không nhập.
  ma_hs VARCHAR(30) NOT NULL,

  -- --- cá nhân ---
  ho_ten VARCHAR(120) NOT NULL,
  ten_trung VARCHAR(80) DEFAULT NULL,
  ngay_sinh DATE DEFAULT NULL,
  gioi_tinh ENUM('nam','nu','khac') DEFAULT NULL,
  cccd VARCHAR(20) DEFAULT NULL,
  ho_chieu VARCHAR(20) DEFAULT NULL,
  -- Hộ chiếu phải còn hạn ít nhất 6 tháng khi xin visa -> giao diện cảnh báo sớm theo cột này.
  ho_chieu_het_han DATE DEFAULT NULL,
  dia_chi VARCHAR(300) DEFAULT NULL,
  phone VARCHAR(30) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  lien_lac_khac VARCHAR(150) DEFAULT NULL,

  -- --- người bảo lãnh / phụ huynh ---
  ph_ten VARCHAR(120) DEFAULT NULL,
  ph_phone VARCHAR(30) DEFAULT NULL,
  ph_quan_he VARCHAR(50) DEFAULT NULL,

  -- --- học vấn ---
  truong_tn VARCHAR(200) DEFAULT NULL,
  nam_tn VARCHAR(10) DEFAULT NULL,
  xep_loai VARCHAR(50) DEFAULT NULL,
  trinh_do_tieng VARCHAR(60) DEFAULT NULL,

  -- --- nguyện vọng ---
  truong_nv1 VARCHAR(200) DEFAULT NULL,
  truong_nv2 VARCHAR(200) DEFAULT NULL,
  truong_nv3 VARCHAR(200) DEFAULT NULL,
  nganh VARCHAR(200) DEFAULT NULL,
  -- Chuỗi tự do vì mỗi trường gọi một kiểu: "2027 Xuân", "2027 Spring", "Kỳ 9/2027".
  ky_nhap_hoc VARCHAR(40) DEFAULT NULL,
  loai_hinh ENUM('hoa-ngu','dai-hoc','cao-hoc','tien-si','khac') DEFAULT NULL,

  -- --- vận hành ---
  tu_van_id INT DEFAULT NULL,
  nguon VARCHAR(80) DEFAULT NULL,
  ngay_nhan DATE DEFAULT NULL,

  -- --- tiến độ 6 bước + 3 trạng thái kết thúc ---
  buoc ENUM('ho-so','dong-tien','hoc','phong-van','visa','bay','hoan-thanh','tam-dung','huy')
       NOT NULL DEFAULT 'ho-so',
  -- Ngày vào bước hiện tại. Nuôi cột "nằm ở bước này bao lâu rồi" — thứ duy nhất chỉ ra hồ sơ
  -- đang bị bỏ quên. Suy từ du_hoc_lich_su cũng được nhưng phải quét cả bảng cho MỖI hàng.
  buoc_tu DATE DEFAULT NULL,

  -- --- mốc của từng bước ---
  -- Để thành cột riêng (không nhét hết vào lịch sử) vì đây là thứ phải LỌC và NHẮC hằng ngày:
  -- "ai phỏng vấn tuần này", "ai sắp bay trong 30 ngày".
  ngay_phong_van DATE DEFAULT NULL,
  kq_phong_van ENUM('cho','dau','truot') DEFAULT NULL,
  truong_do VARCHAR(200) DEFAULT NULL,
  ngay_nop_visa DATE DEFAULT NULL,
  kq_visa ENUM('cho','dau','truot') DEFAULT NULL,
  ngay_bay DATE DEFAULT NULL,
  chuyen_bay VARCHAR(80) DEFAULT NULL,

  -- --- tiền ---
  -- Tổng phí dịch vụ đã chốt với học viên. Số đã thu / còn thiếu KHÔNG lưu ở đây mà tính từ
  -- du_hoc_thu_tien — lưu hai nơi là sớm muộn cũng lệch nhau.
  tong_phi INT NOT NULL DEFAULT 0,

  ghi_chu TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uk_org_ma (org_id, ma_hs),
  KEY idx_org_buoc (org_id, buoc),
  KEY idx_org_ten (org_id, ho_ten),
  KEY idx_bay (org_id, ngay_bay),
  KEY idx_pv (org_id, ngay_phong_van),
  KEY idx_user (user_id),
  -- Xoá tài khoản học thì hồ sơ du học VẪN CÒN, chỉ mất liên kết sang phần học tập. Cùng lý do
  -- với classes.teacher_id ở init-db.js: đừng để dọn một tài khoản kéo theo mất dữ liệu nghiệp vụ.
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (tu_van_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 2. LỊCH SỬ / NHẬT KÝ CHĂM SÓC
-- -------------------------------------------------------------------------
-- Append-only, cùng lối với exercise_results. Vừa là vết chuyển bước, vừa là nhật ký tư vấn viên
-- ghi lại đã gọi điện / đã nhắc nộp giấy tờ. Đừng đổi sang update tại chỗ — mất lịch sử là mất
-- luôn khả năng trả lời "trung tâm đã làm gì cho em này".
CREATE TABLE IF NOT EXISTS du_hoc_lich_su (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ho_so_id INT NOT NULL,
  loai ENUM('buoc','ghi-chu','tien','giay-to','he-thong') NOT NULL DEFAULT 'ghi-chu',
  buoc_cu VARCHAR(20) DEFAULT NULL,
  buoc_moi VARCHAR(20) DEFAULT NULL,
  noi_dung VARCHAR(1000) DEFAULT NULL,
  nguoi_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_ho_so (ho_so_id, created_at),
  FOREIGN KEY (ho_so_id) REFERENCES du_hoc_ho_so(id) ON DELETE CASCADE,
  FOREIGN KEY (nguoi_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 3. SỔ THU TIỀN
-- -------------------------------------------------------------------------
-- Một hồ sơ thu làm nhiều đợt (đặt cọc -> phí hồ sơ -> học phí -> phí visa). `loai` phân biệt
-- thu và hoàn, KHÔNG dùng số tiền âm: số âm trông giống lỗi nhập liệu và làm mọi câu SUM phải
-- nhớ xét dấu. Công nợ = SUM(thu) - SUM(hoan), luôn tính từ đây chứ không lưu sẵn.
CREATE TABLE IF NOT EXISTS du_hoc_thu_tien (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ho_so_id INT NOT NULL,
  loai ENUM('thu','hoan') NOT NULL DEFAULT 'thu',
  khoan ENUM('dat-coc','phi-ho-so','hoc-phi','dich-thuat','phi-visa','ve-may-bay','khac')
        NOT NULL DEFAULT 'khac',
  so_tien INT NOT NULL,
  ngay_thu DATE NOT NULL,
  hinh_thuc ENUM('tien-mat','chuyen-khoan','the','khac') NOT NULL DEFAULT 'tien-mat',
  chung_tu VARCHAR(60) DEFAULT NULL,
  nguoi_thu_id INT DEFAULT NULL,
  ghi_chu VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_ho_so (ho_so_id, ngay_thu),
  FOREIGN KEY (ho_so_id) REFERENCES du_hoc_ho_so(id) ON DELETE CASCADE,
  FOREIGN KEY (nguoi_thu_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------------------
-- 4. CHECKLIST GIẤY TỜ
-- -------------------------------------------------------------------------
-- Danh mục MẶC ĐỊNH nằm ở server/routes/du-hoc.js (hằng số GIAY_TO_MAC_DINH) và được chép vào
-- bảng này khi tạo hồ sơ. Cố ý chép chứ không tra danh mục chung: trung tâm sửa danh mục về sau
-- thì hồ sơ cũ phải giữ nguyên những gì đã tick, và mỗi hồ sơ được thêm giấy tờ riêng.
CREATE TABLE IF NOT EXISTS du_hoc_giay_to (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ho_so_id INT NOT NULL,
  ten VARCHAR(150) NOT NULL,
  -- 'chua' chưa nhận | 'nhan' đã nhận bản gốc/photo | 'dich' đã dịch công chứng | 'nop' đã nộp trường
  trang_thai ENUM('chua','nhan','dich','nop','khong-can') NOT NULL DEFAULT 'chua',
  ngay_nhan DATE DEFAULT NULL,
  ghi_chu VARCHAR(300) DEFAULT NULL,
  bat_buoc BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_ho_so (ho_so_id, sort_order),
  FOREIGN KEY (ho_so_id) REFERENCES du_hoc_ho_so(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
