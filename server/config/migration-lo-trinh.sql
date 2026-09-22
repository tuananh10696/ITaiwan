-- =============================================================
-- "Lộ trình của tôi": nhịp đo hoạt động + ôn tập ngắt quãng (2026-09-08)
-- =============================================================
-- Hai bảng cho 5 trang của nhóm menu "Lộ trình của tôi". Xem CLAUDE.md 4.38.

-- ---------------------------------------------------------------------------
-- 1. study_activity — MỘT dòng cho mỗi (học viên, ngày, khu vực của app)
-- ---------------------------------------------------------------------------
-- Trước đây `users.streak` tăng ở route ĐĂNG NHẬP, tức nó đếm "ngày mở app" chứ không phải
-- "ngày có học" — mở app rồi treo đó vẫn +1. Bảng này đo hoạt động THẬT để:
--   · tính chuỗi ngày trung thực (≥5 phút và ≥3 lượt trang, hoặc có nộp bài);
--   · vẽ lịch nhiệt 12 tuần ở trang Tổng quan;
--   · trả lời "học bao nhiêu phút ở khu nào" ở trang Tiến độ.
--
-- Chia theo KHU VỰC (giáo trình · phát âm · từ vựng · thi thử …) chứ không gộp một dòng/ngày:
-- gộp thì mất hẳn phần "học gì", mà tách ra cũng chỉ thêm tối đa ~7 dòng/ngày/học viên.
--
-- ⚠️ `giay` do TRÌNH DUYỆT báo lên nên phải chặn ở server: mỗi nhịp không quá 120 giây và
--    tổng một ngày không quá 8 giờ — xem `server/routes/lotrinh.js`. Không chặn thì một vòng
--    lặp gọi API là chuỗi ngày và bảng xếp hạng thành vô nghĩa.
CREATE TABLE IF NOT EXISTS study_activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  ngay DATE NOT NULL,
  -- 'giaotrinh' | 'phat-am' | 'tu-vung' | 'thi-thu' | 'luyen-tap' | 'lo-trinh' | 'khac'
  khu_vuc VARCHAR(24) NOT NULL,
  giay INT NOT NULL DEFAULT 0,
  so_lan INT NOT NULL DEFAULT 0 COMMENT 'số lượt mở trang trong khu vực đó',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_ngay_khu (user_id, ngay, khu_vuc),
  KEY idx_user_ngay (user_id, ngay),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- 2. srs_words — ôn tập ngắt quãng khoá theo CHỮ HÁN
-- ---------------------------------------------------------------------------
-- Bảng `user_vocabulary` cũ khoá ngoại vào `vocabulary(id)` — bảng đó chỉ có 40 từ seed, nên
-- SRS chưa bao giờ ôn được quá 40 từ (đó cũng là lý do menu SRS bị gỡ từ 2026-08-23). ĐÚNG
-- CÙNG MỘT BỆNH với `saved_words`, đã sửa cho sổ tay ở migration-sotay.sql.
--
-- Khoá theo chữ Hán phồn thể nên ôn được mọi từ trong 10.927 từ của 4 bộ giáo trình lẫn từ
-- người học tự lưu vào sổ tay. Kèm bản chụp pinyin/nghĩa để dựng thẻ ôn mà không phải tra lại
-- chỉ mục 575 KB.
--
-- `user_vocabulary` GIỮ NGUYÊN, không DROP: route /api/srs cũ vẫn chạy được, và dữ liệu ôn
-- tập cũ (nếu có) không mất. Dọn bảng cũ là việc riêng, làm sau khi chắc không còn ai dùng.
CREATE TABLE IF NOT EXISTS srs_words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tu VARCHAR(32) NOT NULL COMMENT 'chữ Hán phồn thể — khoá chuẩn của cả app (4.11)',
  gian VARCHAR(32) DEFAULT NULL,
  pinyin VARCHAR(120) DEFAULT NULL,
  han_viet VARCHAR(120) DEFAULT NULL,
  nghia VARCHAR(500) DEFAULT NULL,
  nguon VARCHAR(40) DEFAULT NULL COMMENT 'so-tay | kho | <lesson_id>',
  -- Trạng thái SM-2, cùng ý nghĩa với các cột của user_vocabulary để dùng lại nguyên thuật toán.
  ease_factor DECIMAL(4,2) NOT NULL DEFAULT 2.50,
  interval_days INT NOT NULL DEFAULT 0,
  repetitions INT NOT NULL DEFAULT 0,
  due_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_review DATETIME DEFAULT NULL,
  status ENUM('new','learning','review','mastered') NOT NULL DEFAULT 'new',
  total_reviews INT NOT NULL DEFAULT 0,
  correct_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_tu (user_id, tu),
  KEY idx_due (user_id, due_date),
  KEY idx_status (user_id, status),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
