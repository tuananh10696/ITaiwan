-- =============================================================
-- Sổ tay từ vựng khoá theo CHỮ HÁN (2026-09-08)
-- =============================================================
-- Bảng `saved_words` cũ khoá ngoại vào `vocabulary(id)` — bảng đó chỉ có 40 từ seed, nên sổ
-- tay CHỈ lưu được 40 từ đó. Học viên bấm lưu một từ trong giáo trình / HSK / TOCFL / từ điển
-- thì server trả 404 "Không tìm thấy từ vựng" và từ không bao giờ vào sổ.
--
-- Bảng mới khoá theo chính CHỮ HÁN (phồn thể) nên lưu được mọi từ ở mọi module, không phụ
-- thuộc bảng `vocabulary`. Kèm luôn bản chụp pinyin/nghĩa để sổ tay hiện được ngay mà không
-- phải tra lại chỉ mục 578 KB.
--
-- `saved_words` cũ ĐƯỢC GIỮ NGUYÊN (không DROP): route cũ vẫn chạy, dữ liệu cũ vẫn còn, và
-- lượt chạy đầu của route mới sẽ tự chuyển 40 từ cũ sang bảng mới. Xoá bảng cũ là việc riêng,
-- làm sau khi chắc chắn không còn ai dùng.

CREATE TABLE IF NOT EXISTS notebook_words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  -- Chữ Hán PHỒN THỂ, dạng chuẩn của cả app (CLAUDE.md 4.11). 32 ký tự đủ cho cả thành ngữ.
  tu VARCHAR(32) NOT NULL,
  gian VARCHAR(32) DEFAULT NULL,
  pinyin VARCHAR(120) DEFAULT NULL,
  han_viet VARCHAR(120) DEFAULT NULL,
  nghia VARCHAR(500) DEFAULT NULL,
  -- Nơi học viên bấm lưu: 'tudien' | 'kho' | 'giaotrinh' | 'bothu' … Dùng để lọc trong sổ tay.
  nguon VARCHAR(40) DEFAULT NULL,
  ghi_chu VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_tu (user_id, tu),
  KEY idx_user_time (user_id, created_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chuyển 40 từ của sổ tay cũ sang bảng mới. INSERT IGNORE nên chạy lại nhiều lần vô hại.
INSERT IGNORE INTO notebook_words (user_id, tu, gian, pinyin, nghia, nguon, created_at)
SELECT sw.user_id, v.hanzi, v.simplified, v.pinyin, v.meaning, 'cu', sw.created_at
FROM saved_words sw
JOIN vocabulary v ON v.id = sw.vocabulary_id
WHERE v.hanzi IS NOT NULL AND v.hanzi <> '';
