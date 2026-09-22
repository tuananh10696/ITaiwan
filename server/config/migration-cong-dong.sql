-- =============================================================
-- Khu CỘNG ĐỒNG: bài viết · thảo luận · vlog · tin tức · học bổng (2026-09-08)
-- =============================================================
-- Xem CLAUDE.md 4.39.
--
-- MỘT bộ máy bài viết cho BỐN loại nội dung (`community_posts.loai`), thay vì bốn hệ thống
-- rời: bình luận, thích, báo cáo, kiểm duyệt nhờ vậy chỉ viết một lần. Học bổng thì tách bảng
-- riêng vì nó là dữ liệu CÓ CẤU TRÚC (hạn nộp, mức tiền, yêu cầu tiếng) chứ không phải bài viết.

CREATE TABLE IF NOT EXISTS community_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- NULL = 6 bài blog cũ chuyển sang (bảng blog_posts không có cột tác giả).
  user_id INT DEFAULT NULL,
  loai ENUM('thao-luan','bai-viet','vlog','tin-tuc') NOT NULL DEFAULT 'thao-luan',
  tieu_de VARCHAR(300) NOT NULL,
  tom_tat VARCHAR(600) DEFAULT NULL,
  noi_dung LONGTEXT DEFAULT NULL,
  chu_de VARCHAR(40) DEFAULT NULL COMMENT 'du-hoc | doi-song | hoc-tieng | viec-lam | tocfl-hsk | khac',
  -- Vlog: CHỈ lưu link nhúng, KHÔNG lưu file. Dự án không có hạ tầng lưu trữ video và đã cân
  -- nhắc rồi bỏ đúng hạ tầng đó khi làm shadowing (4.22b).
  video_nguon VARCHAR(20) DEFAULT NULL COMMENT 'youtube | tiktok | facebook | instagram',
  video_id VARCHAR(160) DEFAULT NULL,
  video_url VARCHAR(500) DEFAULT NULL,
  anh_bia VARCHAR(500) DEFAULT NULL COMMENT 'ĐƯỜNG DẪN ảnh, không phải base64 — xem ghi chú 4.39',
  emoji VARCHAR(10) DEFAULT NULL,
  trang_thai ENUM('hien','an') NOT NULL DEFAULT 'hien',
  -- Bộ lọc từ ngữ gắn cờ (mức 'canh-bao'): bài VẪN hiện, nhưng vào danh sách chờ người thật rà.
  co_canh_bao TINYINT NOT NULL DEFAULT 0,
  ly_do_co VARCHAR(300) DEFAULT NULL,
  ghim TINYINT NOT NULL DEFAULT 0,
  chinh_thuc TINYINT NOT NULL DEFAULT 0 COMMENT 'bài của admin/giáo viên — hiện nhãn "Chính thức"',
  so_xem INT NOT NULL DEFAULT 0,
  so_thich INT NOT NULL DEFAULT 0,
  so_binh_luan INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_loai (loai, trang_thai, created_at),
  KEY idx_ghim (loai, ghim, created_at),
  KEY idx_user (user_id),
  KEY idx_co (co_canh_bao, trang_thai),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS community_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  -- Trả lời lồng ĐÚNG MỘT CẤP. Lồng sâu hơn thì trên điện thoại 390px không còn chỗ thụt lề,
  -- và luồng đọc rối hẳn — Facebook/Reddit cũng gập lại sau 1-2 cấp.
  parent_id INT DEFAULT NULL,
  noi_dung VARCHAR(2000) NOT NULL,
  trang_thai ENUM('hien','an') NOT NULL DEFAULT 'hien',
  co_canh_bao TINYINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_post (post_id, trang_thai, created_at),
  KEY idx_user (user_id),
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Khoá chính là CẶP (post, user) nên một người chỉ thích được một lần, không cần kiểm ở code.
CREATE TABLE IF NOT EXISTS community_likes (
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, user_id),
  KEY idx_user (user_id),
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS community_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT DEFAULT NULL,
  comment_id INT DEFAULT NULL,
  user_id INT NOT NULL COMMENT 'người báo cáo',
  ly_do VARCHAR(300) DEFAULT NULL,
  trang_thai ENUM('moi','da-xu-ly') NOT NULL DEFAULT 'moi',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Một người chỉ báo cáo một bài một lần; báo cáo lại là cập nhật lý do.
  UNIQUE KEY uk_bao_cao (user_id, post_id, comment_id),
  KEY idx_moi (trang_thai, created_at),
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES community_comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Học bổng: DỮ LIỆU CÓ CẤU TRÚC, không phải bài viết
-- ---------------------------------------------------------------------------
-- ⚠️ Hạn nộp và mức tiền ĐỔI MỖI NĂM. Trang học bổng ghi hạn đã hết là gây hại thật cho người
--    đọc, nên mỗi mục BẮT BUỘC có `cap_nhat_luc` + `link` tới trang chính thức, và giao diện
--    luôn hiện hai thứ đó. Mục quá hạn KHÔNG biến mất — chuyển sang "chờ công bố kỳ mới".
CREATE TABLE IF NOT EXISTS scholarships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ten VARCHAR(300) NOT NULL,
  ten_goc VARCHAR(300) DEFAULT NULL COMMENT 'tên tiếng Trung/Anh chính thức',
  don_vi VARCHAR(200) DEFAULT NULL COMMENT 'đơn vị cấp',
  cap_hoc VARCHAR(120) DEFAULT NULL COMMENT 'tieng | dai-hoc | thac-si | tien-si (ngăn bằng dấu phẩy)',
  gia_tri VARCHAR(300) DEFAULT NULL,
  han_nop VARCHAR(160) DEFAULT NULL COMMENT 'để CHUỖI vì nguồn hay ghi "tháng 2–3 hằng năm"',
  yeu_cau_tieng VARCHAR(200) DEFAULT NULL,
  doi_tuong VARCHAR(300) DEFAULT NULL,
  mo_ta TEXT DEFAULT NULL,
  link VARCHAR(500) DEFAULT NULL,
  trang_thai ENUM('hien','an') NOT NULL DEFAULT 'hien',
  sort_order INT NOT NULL DEFAULT 0,
  cap_nhat_luc DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_hien (trang_thai, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Chuyển 6 bài blog cũ sang bộ máy mới
-- ---------------------------------------------------------------------------
-- GIỮ NGUYÊN `id` để đường dẫn `/cong-dong/blog/<id>` đã nằm trong sitemap và đã được chia sẻ
-- vẫn mở đúng bài. `blog_posts` KHÔNG bị xoá — màn quản lý blog trong admin vẫn chạy.
INSERT IGNORE INTO community_posts
  (id, user_id, loai, tieu_de, tom_tat, noi_dung, chu_de, emoji, chinh_thuc, ghim, created_at)
SELECT b.id, NULL, 'bai-viet', b.title, b.excerpt, b.content,
       CASE
         WHEN b.category IN ('Học bổng','Du học') THEN 'du-hoc'
         WHEN b.category IN ('TOCFL') THEN 'tocfl-hsk'
         WHEN b.category IN ('Học tập') THEN 'hoc-tieng'
         ELSE 'khac'
       END,
       b.emoji, 1, 0, COALESCE(b.published_at, b.created_at)
FROM blog_posts b;
