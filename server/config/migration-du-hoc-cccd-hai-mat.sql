-- ============================================================
-- Migration: Ảnh CCCD nhận 2 ảnh (mặt trước + mặt sau)   (2026-10-08)
--
-- Khách yêu cầu mục CCCD cho tải 2 ảnh. Đổi mục "Ảnh CCCD" của MỌI hồ sơ: số ảnh tối đa 1 -> 2 và
-- đổi tên cho học sinh biết cần cả hai mặt. Khớp GIAY_TO_MAC_DINH ở server/utils/du-hoc-tao-hs.js.
--
-- Không xoá gì; ảnh đã tải (nếu có) giữ nguyên. Mục đã "đã nhận" vì đủ 1 ảnh cũng giữ nguyên
-- (hiện chưa hồ sơ nào có ảnh). Chạy lại an toàn: sau lần đầu không còn dòng nào khớp WHERE.
-- Chạy bằng: npm run db:migrate:prod  (tự sao lưu trước)
-- ============================================================

UPDATE du_hoc_giay_to
   SET ten = 'Ảnh CCCD (mặt trước và mặt sau)', so_anh_toi_da = 2
 WHERE ten = 'Ảnh CCCD';
