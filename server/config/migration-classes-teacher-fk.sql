-- ============================================================
-- Migration: đổi ràng buộc classes.teacher_id từ ON DELETE CASCADE sang ON DELETE SET NULL
-- Chạy TAY trên DB production (Aiven) — KHÔNG chạy `npm run db:init`.
--
-- LÝ DO (quan trọng): bảng `classes` đang khai báo
--     teacher_id INT NOT NULL,
--     FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
-- Nghĩa là XOÁ MỘT TÀI KHOẢN GIÁO VIÊN sẽ xoá luôn TẤT CẢ lớp do người đó tạo, và vì
-- class_sessions / class_attendance lại CASCADE theo class_id nên toàn bộ buổi học + dữ liệu
-- điểm danh của những lớp đó cũng bị xoá theo. Chỉ một thao tác dọn tài khoản là mất sạch dữ liệu.
--
-- Sau migration: xoá giáo viên thì lớp vẫn còn, teacher_id chỉ thành NULL và có thể gán lại người khác.
--
-- An toàn để chạy lại nhiều lần (kiểm tra trước khi đổi).
-- ============================================================

-- Thứ tự bắt buộc: XOÁ khoá ngoại cũ -> đổi cột sang NULL -> TẠO LẠI khoá ngoại.
-- (Đổi nullability khi cột vẫn đang bị khoá ngoại tham chiếu dễ bị MySQL từ chối.)

-- 1) Xoá ràng buộc khoá ngoại cũ (tên ràng buộc do MySQL tự đặt nên phải tra ra trước).
SET @fk := (
  SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'classes'
    AND COLUMN_NAME = 'teacher_id' AND REFERENCED_TABLE_NAME = 'users'
  LIMIT 1
);
SET @s := IF(@fk IS NULL,
  'SELECT ''Khong co FK teacher_id, bo qua buoc xoa'' AS ghi_chu',
  CONCAT('ALTER TABLE classes DROP FOREIGN KEY `', @fk, '`'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- 2) Cho phép NULL (bắt buộc, vì SET NULL không dùng được với cột NOT NULL).
ALTER TABLE classes MODIFY COLUMN teacher_id INT NULL;

-- 3) Tạo lại ràng buộc với ON DELETE SET NULL (bỏ qua nếu đã tồn tại, để chạy lại được nhiều lần).
SET @has := (
  SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'classes'
    AND CONSTRAINT_NAME = 'fk_classes_teacher'
);
SET @s := IF(@has = 0,
  'ALTER TABLE classes ADD CONSTRAINT fk_classes_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL',
  'SELECT ''fk_classes_teacher da ton tai, bo qua'' AS ghi_chu');
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- Kiểm tra lại: DELETE_RULE phải là SET NULL.
SELECT rc.CONSTRAINT_NAME, rc.DELETE_RULE
FROM information_schema.REFERENTIAL_CONSTRAINTS rc
WHERE rc.CONSTRAINT_SCHEMA = DATABASE() AND rc.TABLE_NAME = 'classes';
