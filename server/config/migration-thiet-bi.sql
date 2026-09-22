-- =============================================================
-- GIỚI HẠN THIẾT BỊ ĐĂNG NHẬP — chống chia sẻ tài khoản (2026-09-15)
--
-- Kênh rò rỉ nội dung lớn nhất của một khoá học online không phải scraper mà là MỘT tài khoản
-- dùng chung cho cả chục người. Trước đợt này hệ thống không đếm gì: token sống 30 ngày, ai cầm
-- được là dùng được, không giới hạn số máy.
--
-- Chính sách (chủ dự án chốt 2026-09-15):
--   • Tối đa 2 thiết bị / tài khoản.
--   • Đăng nhập trên thiết bị THỨ 2  -> vẫn cho vào, kèm cảnh báo "đã dùng hết 2/2 thiết bị".
--   • Đăng nhập trên thiết bị THỨ 3  -> CHẶN, và ghi cảnh báo để admin xử lý.
--
-- Nhân sự (admin / quản trị trung tâm / giáo viên) KHÔNG bị giới hạn — họ dạy trên máy trường,
-- máy nhà, điện thoại, và chặn họ không bảo vệ thêm được gì.

CREATE TABLE IF NOT EXISTS user_devices (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  -- Mã thiết bị do CLIENT sinh (uuid trong localStorage) — xem src/utils/thiet-bi.js.
  -- KHÔNG dùng để xác thực, chỉ để ĐẾM: người dùng sửa được nó, nhưng sửa thì thành "máy mới"
  -- và lại tính vào hạn mức, nên không lách được gì.
  device_id     VARCHAR(64) NOT NULL,
  ten           VARCHAR(120) NULL COMMENT 'Tên dễ đọc suy từ User-Agent: "Chrome trên Windows"',
  user_agent    VARCHAR(255) NULL,
  ip_lan_dau    VARCHAR(45) NULL,
  ip_lan_cuoi   VARCHAR(45) NULL,
  lan_dau       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lan_cuoi      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  so_lan        INT NOT NULL DEFAULT 1,
  -- Admin gỡ thiết bị thì đánh dấu thay vì xoá hàng: còn tra được lịch sử khi cần đối chất.
  da_go         BOOLEAN NOT NULL DEFAULT FALSE,
  go_luc        DATETIME NULL,
  go_boi        INT NULL,
  UNIQUE KEY uq_user_device (user_id, device_id),
  KEY idx_user (user_id, da_go),
  CONSTRAINT fk_ud_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Lần đăng nhập BỊ TỪ CHỐI vì quá số thiết bị. Bảng riêng, không gộp vào user_devices: một bên
-- là "thiết bị đang được phép", một bên là "dấu hiệu tài khoản đang bị chia sẻ" — hai câu hỏi
-- khác nhau, và gộp lại thì hàng bị từ chối sẽ chiếm chỗ trong chính hạn mức 2 thiết bị.
CREATE TABLE IF NOT EXISTS device_alerts (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  device_id   VARCHAR(64) NOT NULL,
  ten         VARCHAR(120) NULL,
  user_agent  VARCHAR(255) NULL,
  ip          VARCHAR(45) NULL,
  so_dang_co  INT NOT NULL DEFAULT 0 COMMENT 'Số thiết bị đang hoạt động lúc bị chặn',
  tao_luc     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  da_xu_ly    BOOLEAN NOT NULL DEFAULT FALSE,
  xu_ly_boi   INT NULL,
  xu_ly_luc   DATETIME NULL,
  KEY idx_user (user_id),
  KEY idx_chua_xu_ly (da_xu_ly, tao_luc),
  CONSTRAINT fk_da_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
