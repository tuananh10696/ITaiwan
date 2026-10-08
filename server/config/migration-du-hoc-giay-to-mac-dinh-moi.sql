-- ============================================================
-- Migration: ĐỔI HỒ SƠ CŨ sang danh mục giấy tờ mặc định mới   (2026-10-08)
--
-- Khách yêu cầu: hồ sơ cũ cũng bỏ hết các mục giấy tờ đang lưu, chỉ còn đúng 5 mục mặc định
-- (Học bạ, Bằng tốt nghiệp, Hộ chiếu, Ảnh thẻ, Ảnh CCCD) — xem GIAY_TO_MAC_DINH ở
-- server/utils/du-hoc-tao-hs.js. Tên + thứ tự + số ảnh PHẢI khớp hằng số đó.
--
-- ⚠️ XOÁ DỮ LIỆU: mọi mục giấy tờ KHÁC 5 tên mới (kể cả mục admin tự thêm) bị xoá, kéo theo ảnh
-- đính kèm của chúng. Lúc chạy trên prod: 498 mục / 34 hồ sơ, chỉ 2 mục đã tick, không ghi chú, chưa
-- có ảnh nào. Chỉ MỘT thứ được giữ: trạng thái + ngày nhận của "Hộ chiếu (bản sao)" cũ được chép
-- sang mục "Hộ chiếu" mới (cùng một loại giấy).
--
-- Chạy lại an toàn: chỉ chèn cho hồ sơ chưa có mục "Ảnh CCCD", và lần chạy sau không còn gì để xoá.
-- Chạy bằng: npm run db:migrate:prod  (tự sao lưu trước)
-- ============================================================

INSERT INTO du_hoc_giay_to (ho_so_id, ten, bat_buoc, so_anh_toi_da, sort_order, trang_thai, ngay_nhan)
SELECT h.id, m.ten, 1, m.so_anh, m.thu_tu,
       IF(m.ten = 'Hộ chiếu',
          COALESCE((SELECT g.trang_thai FROM du_hoc_giay_to g
                     WHERE g.ho_so_id = h.id AND g.ten = 'Hộ chiếu (bản sao)' LIMIT 1), 'chua'),
          'chua'),
       IF(m.ten = 'Hộ chiếu',
          (SELECT g.ngay_nhan FROM du_hoc_giay_to g
            WHERE g.ho_so_id = h.id AND g.ten = 'Hộ chiếu (bản sao)' LIMIT 1),
          NULL)
  FROM du_hoc_ho_so h
 CROSS JOIN (
   SELECT 'Học bạ' AS ten, 0 AS so_anh, 10 AS thu_tu
   UNION ALL SELECT 'Bằng tốt nghiệp', 0, 20
   UNION ALL SELECT 'Hộ chiếu', 0, 30
   UNION ALL SELECT 'Ảnh thẻ (2 file khác nhau, nền trắng, tóc không che trán và tai)', 2, 40
   UNION ALL SELECT 'Ảnh CCCD', 1, 50
 ) m
 WHERE NOT EXISTS (SELECT 1 FROM du_hoc_giay_to x WHERE x.ho_so_id = h.id AND x.ten = 'Ảnh CCCD');

DELETE FROM du_hoc_giay_to
 WHERE ten NOT IN ('Học bạ', 'Bằng tốt nghiệp', 'Hộ chiếu',
                   'Ảnh thẻ (2 file khác nhau, nền trắng, tóc không che trán và tai)', 'Ảnh CCCD');
