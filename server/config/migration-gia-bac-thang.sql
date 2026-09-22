-- =============================================================
-- GIÁ BẬC THANG THEO TRÌNH ĐỘ   — 2026-09-11
-- =============================================================
-- Trước: 17 khoá đồng giá 599.000đ (niêm yết 799.000đ).
-- Sau  : chia 3 bậc theo trình độ — 399k / 499k / 699k.
--
-- VÌ SAO BỎ GIÁ PHẲNG (đối chiếu thị trường VN, tra 11/09/2026):
--   • tocfl.io.vn bán theo CẤP: A1 399k · A2 499k — đối thủ trực tiếp nhất.
--   • Unica (video tự học trọn đời): 199k-299k, niêm yết 450k-900k.
--   • Tomato Online (HSK 53-61 bài): 499k-599k.
--   Giá phẳng 599k vừa chặn người mới ở cửa vào (họ chưa biết mình là ai), vừa bỏ tiền
--   trên bàn ở nhóm trình độ cao — nhóm sẵn sàng trả nhiều hơn hẳn.
--
-- Ba bậc:
--   Sơ cấp    ĐĐ Q1-Q2 · TĐ Q1-Q2 · HSK 1-2   699k -> 399k
--   Trung cấp ĐĐ Q3-Q4 · TĐ Q3-Q4 · HSK 3-4   899k -> 499k
--   Cao cấp   ĐĐ Q5-Q6 · TĐ Q5    · HSK 5-6  1199k -> 699k
--   Đề thi thử                                 699k -> 399k (giá bán giữ nguyên)
--
-- `gia_goc` chỉ là giá gạch ngang trên giao diện; `gia` mới là số tiền phải chuyển khoản
-- và là số admin đối chiếu với sao kê. Nâng `gia_goc` là quyết định trình bày — chủ dự án
-- đổi lại bất cứ lúc nào bằng một câu UPDATE.
--
-- Chạy bằng `npm run db:migrate:local` / `db:migrate:prod` (CLAUDE.md 4.16).

-- ---------------------------------------------------------------- SƠ CẤP
UPDATE products SET gia = 399000, gia_goc = 699000
 WHERE ma IN ('kh-duongdai-q1', 'kh-duongdai-q2',
              'kh-thoidai-q1',  'kh-thoidai-q2',
              'kh-hsk-c1',      'kh-hsk-c2');

-- ---------------------------------------------------------------- TRUNG CẤP
UPDATE products SET gia = 499000, gia_goc = 899000
 WHERE ma IN ('kh-duongdai-q3', 'kh-duongdai-q4',
              'kh-thoidai-q3',  'kh-thoidai-q4',
              'kh-hsk-c3',      'kh-hsk-c4');

-- ---------------------------------------------------------------- CAO CẤP
-- Thời Đại chỉ có 5 quyển nên Q5 là quyển cuối -> xếp bậc cao cấp cùng ĐĐ Q5-Q6 và HSK 5-6.
UPDATE products SET gia = 699000, gia_goc = 1199000
 WHERE ma IN ('kh-duongdai-q5', 'kh-duongdai-q6',
              'kh-thoidai-q5',
              'kh-hsk-c5',      'kh-hsk-c6');

-- ---------------------------------------------------------------- ĐỀ THI THỬ
UPDATE products SET gia = 399000, gia_goc = 699000 WHERE ma = 'bo-thi-thu';
