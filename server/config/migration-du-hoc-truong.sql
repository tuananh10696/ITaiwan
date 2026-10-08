-- ============================================================
-- Migration: "Tiến độ theo trường" do quản trị TỰ QUẢN LÝ   (2026-10-08)
--
-- Trước đây màn này tự gom học sinh theo chữ tên trường trong hồ sơ (nguyện vọng 1-3 + trường đậu).
-- Khách yêu cầu đổi: quản trị tự thêm từng trường, rồi tự thêm học sinh vào trường đó (giống thêm lớp
-- rồi add học sinh). Cách gom tự động bị bỏ hẳn; các cột truong_nv1/2/3, truong_do trong hồ sơ KHÔNG
-- bị đụng tới (vẫn là dữ liệu học sinh khai).
--
--   du_hoc_truong     danh sách trường. `ten` UNIQUE: collation unicode_ci coi hoa/thường và dấu là
--                     một nên "Đại học A" và "dai hoc a" không tạo được hai trường.
--   du_hoc_truong_hs  học sinh (hồ sơ) thuộc trường. Một hồ sơ thuộc được NHIỀU trường; mỗi cặp
--                     (trường, hồ sơ) có kết quả riêng: cho = đang chờ | dau = đậu | truot = trượt.
--                     Xoá trường hoặc xoá hồ sơ thì dòng liên kết tự mất (ON DELETE CASCADE) — hồ sơ
--                     KHÔNG bị xoá khi gỡ khỏi trường.
--
-- Chỉ TẠO bảng mới, không đổi / xoá dữ liệu nào. Chạy lại nhiều lần vẫn an toàn.
-- Chạy bằng: npm run db:migrate:prod
-- ============================================================

CREATE TABLE IF NOT EXISTS du_hoc_truong (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ten (ten)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS du_hoc_truong_hs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  truong_id INT NOT NULL,
  ho_so_id INT NOT NULL,
  ket_qua ENUM('cho','dau','truot') NOT NULL DEFAULT 'cho',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_truong_ho_so (truong_id, ho_so_id),
  KEY idx_ho_so (ho_so_id),
  FOREIGN KEY (truong_id) REFERENCES du_hoc_truong(id) ON DELETE CASCADE,
  FOREIGN KEY (ho_so_id) REFERENCES du_hoc_ho_so(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
