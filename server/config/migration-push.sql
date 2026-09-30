-- ============================================================
-- Migration: PUSH THÔNG BÁO (Web Push) — 2026-09-28
--
-- Mỗi dòng = một TRÌNH DUYỆT / THIẾT BỊ đã bấm "Bật thông báo". Một người có thể có nhiều
-- dòng (điện thoại + máy tính). `endpoint` là địa chỉ dịch vụ push của trình duyệt cấp
-- (Google / Mozilla / Apple) — duy nhất theo từng trình duyệt nên dùng làm khoá chống trùng:
-- đăng nhập tài khoản khác trên CÙNG máy thì dòng đó chuyển chủ, không sinh dòng mới.
--
-- Không lưu gì nhạy cảm: p256dh / auth là khoá công khai của trình duyệt để mã hoá nội dung push.
-- Dịch vụ push báo 404 / 410 (người dùng tắt quyền, gỡ app) thì server tự xoá dòng.
--
-- Chỉ THÊM bảng mới, không đụng bảng cũ. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:local / db:migrate:prod
-- ============================================================
CREATE TABLE IF NOT EXISTS push_dang_ky (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  endpoint VARCHAR(700) NOT NULL,
  p256dh VARCHAR(200) NOT NULL,
  auth VARCHAR(100) NOT NULL,
  -- "Chrome · Android", "Safari · iPhone"… để người dùng / quản trị nhận ra máy nào.
  thiet_bi VARCHAR(120) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Lần cuối gửi thành công — dòng lâu không gửi được là dấu hiệu máy đã bỏ app.
  gui_ok_luc TIMESTAMP NULL DEFAULT NULL,
  UNIQUE KEY uk_endpoint (endpoint),   -- 700 ký tự utf8mb4 = 2.800 byte, dưới trần 3.072 của InnoDB
  KEY idx_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
