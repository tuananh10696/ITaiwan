-- =============================================================
-- BẬT LẠI GÓI TRỌN BỘ — giảm 20% so với mua lẻ (2026-09-15)
--
-- Vì sao cần: từ 2026-09-09 hệ thống chỉ bán lẻ từng quyển, 3 gói `bo-*` bị tắt. Hệ quả là học
-- viên muốn học hết một bộ phải mua 6 lần và KHÔNG được ưu đãi nào — mua càng nhiều càng thiệt
-- so với mặt bằng thị trường. Đó là chỗ mất doanh thu lớn nhất của mô hình bán lẻ thuần: nhóm
-- khách sẵn sàng trả nhiều nhất lại không có gì để mua.
--
-- Giá = TỔNG giá mua lẻ × 0,8 (chủ dự án chốt 2026-09-15), làm tròn xuống nghìn:
--   Đương đại  Q1..Q6: 399+399+499+499+699+699 = 3.194.000 -> 2.555.000   (tiết kiệm 639.000)
--   Thời Đại   Q1..Q5: 399+399+499+499+699     = 2.495.000 -> 1.996.000   (tiết kiệm 499.000)
--   HSK        C1..C6: 399+399+499+499+699+699 = 3.194.000 -> 2.555.000   (tiết kiệm 639.000)
--
-- `gia_goc` đặt bằng TỔNG GIÁ MUA LẺ, không phải một con số trang trí: giao diện tính phần trăm
-- từ chính hai cột này, nên nó hiện đúng "-20%" và số tiền tiết kiệm là số THẬT — người mua đối
-- chiếu với bảng giá lẻ ngay bên cạnh thấy khớp. Đặt một `gia_goc` bịa ra thì chỉ cần một học
-- viên cộng lại là mất lòng tin vào cả bảng giá.
--
-- ⚠️ KHÔNG đụng tới 17 khoá lẻ và `bo-thi-thu` — chúng vẫn bán song song. Người đã mua lẻ vài
-- quyển rồi mua combo thì hai quyền cùng tồn tại, `coQuyen()` hợp nhất chúng, không xung đột.
--
-- ⚠️ Ba gói `goi-*-thang` (thuê bao theo thời gian) CỐ Ý vẫn tắt — chủ dự án đã chốt mô hình
-- "mua một lần, sở hữu vĩnh viễn" và giao diện đang nói đúng như vậy.

UPDATE products
   SET gia = 2555000, gia_goc = 3194000, is_active = TRUE, nhom = 'duongdai', sort_order = 1,
       ten = 'Giáo trình Đương đại — TRỌN BỘ 6 quyển',
       mo_ta = 'Mở toàn bộ 6 quyển Đương đại (90 bài): từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, dịch, luyện viết, văn hoá và game. Tiết kiệm 639.000đ so với mua lẻ từng quyển.'
 WHERE ma = 'bo-duongdai';

UPDATE products
   SET gia = 1996000, gia_goc = 2495000, is_active = TRUE, nhom = 'thoidai', sort_order = 1,
       ten = 'Giáo trình Thời Đại — TRỌN BỘ 5 quyển',
       mo_ta = 'Mở toàn bộ 5 quyển Thời Đại (80 bài): từ vựng, ngữ pháp, hội thoại, luyện tập tổng hợp, luyện viết và game. Tiết kiệm 499.000đ so với mua lẻ từng quyển.'
 WHERE ma = 'bo-thoidai';

UPDATE products
   SET gia = 2555000, gia_goc = 3194000, is_active = TRUE, nhom = 'hsk', sort_order = 1,
       ten = 'Giáo trình HSK 3.0 — TRỌN BỘ 6 cấp',
       mo_ta = 'Mở toàn bộ 6 cấp HSK 3.0 (111 bài, 5.456 từ): từ vựng, ngữ pháp, luyện viết và game. Tiết kiệm 639.000đ so với mua lẻ từng cấp.'
 WHERE ma = 'bo-hsk';

-- Khoá lẻ xếp sau gói trọn bộ trong cùng nhóm, để người xem thấy phương án trọn bộ trước rồi
-- mới tới từng quyển — không phải cuộn hết 6 thẻ mới biết có lựa chọn rẻ hơn.
UPDATE products SET sort_order = 10 + CAST(RIGHT(ma, 1) AS UNSIGNED)
 WHERE ma LIKE 'kh-%' AND is_active = TRUE;
