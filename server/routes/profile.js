// Profile Routes
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { xoaCache } from '../utils/quyen-noi-dung.js';
import bcrypt from 'bcryptjs';

// Đảm bảo cột users.avatar_url tồn tại (chạy 1 lần lúc khởi động).
//
// 2026-08-25 — SỬA LỖI NGHIÊM TRỌNG: bản cũ dùng
//     ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url MEDIUMTEXT DEFAULT NULL
// Cú pháp `ADD COLUMN IF NOT EXISTS` là của MariaDB, MySQL KHÔNG hỗ trợ (DB của dự án là MySQL trên
// Aiven) -> câu lệnh luôn ném lỗi cú pháp, mà catch lại nuốt im lặng -> cột avatar_url KHÔNG BAO GIỜ
// được tạo. Hậu quả: mọi query bên dưới có `SELECT ... avatar_url ...` đều lỗi "Unknown column"
// -> GET /api/profile/stats và PUT /api/profile/update trả 500 -> vỡ nguyên trang Tài khoản.
// Thêm nữa, MySQL không cho đặt DEFAULT trên cột TEXT/MEDIUMTEXT nên `DEFAULT NULL` cũng sai.
// Cách đúng: hỏi information_schema trước rồi mới ALTER, và khai báo cột là NULL (không DEFAULT).
(async () => {
  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS n FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'avatar_url'`
    );
    if (!rows[0].n) {
      await pool.query('ALTER TABLE users ADD COLUMN avatar_url MEDIUMTEXT NULL');
      console.log('✅ Đã thêm cột users.avatar_url');
    }
  } catch (err) {
    // Không throw: server vẫn phải chạy được. Nhưng PHẢI log ra để còn biết mà xử lý,
    // thay vì nuốt lỗi như bản cũ.
    console.error('Không tạo được cột users.avatar_url:', err.code || err.message);
  }
})();

const router = Router();

// GET /api/profile/stats - User statistics
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT id, name, email, phone, avatar_letter, avatar_color, avatar_url, level_label, level_num, streak, longest_streak, points, char_mode, created_at FROM users WHERE id = ?',
      [req.userId]
    );
    if (user.length === 0) return res.status(404).json({ error: 'Không tìm thấy tài khoản.' });

    // Vocab stats
    const [vocabStats] = await pool.query(`
      SELECT COUNT(*) as total_learned,
        COALESCE(SUM(CASE WHEN status = 'mastered' THEN 1 ELSE 0 END), 0) as mastered,
        COALESCE(SUM(CASE WHEN due_date <= NOW() THEN 1 ELSE 0 END), 0) as due_review
      FROM user_vocabulary WHERE user_id = ?
    `, [req.userId]);

    // Exam stats
    const [examStats] = await pool.query(`
      SELECT COUNT(*) as total_exams,
        ROUND(AVG(score_percent), 1) as avg_score,
        MAX(score_percent) as best_score
      FROM exam_results WHERE user_id = ?
    `, [req.userId]);

    // Saved words count
    const [savedCount] = await pool.query(
      'SELECT COUNT(*) as count FROM saved_words WHERE user_id = ?',
      [req.userId]
    );

    res.json({
      user: user[0],
      vocab: vocabStats[0],
      exam: examStats[0],
      saved_words_count: savedCount[0].count,
    });
  } catch (err) {
    console.error('Profile stats error:', err);
    res.status(500).json({ error: 'Lỗi tải thống kê.' });
  }
});

// PUT /api/profile/update - Update profile
router.put('/update', requireAuth, async (req, res) => {
  try {
    const { name, phone, char_mode } = req.body;
    const updates = [];
    const params = [];

    // Chỉ đổi tên khi thực sự có nội dung (tránh " " làm tên rỗng + avatar_letter thành khoảng trắng).
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    if (trimmedName) {
      updates.push('name = ?'); params.push(trimmedName);
      updates.push('avatar_letter = ?'); params.push(trimmedName.charAt(0).toUpperCase());
    }
    if (phone !== undefined) {
      const trimmedPhone = typeof phone === 'string' ? phone.trim() : phone;
      updates.push('phone = ?'); params.push(trimmedPhone || null);
    }
    if (char_mode && ['traditional', 'simplified'].includes(char_mode)) {
      updates.push('char_mode = ?'); params.push(char_mode);
    }

    if (updates.length === 0) return res.status(400).json({ error: 'Không có dữ liệu cập nhật.' });

    params.push(req.userId);
    await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);

    const [user] = await pool.query(
      'SELECT id, name, email, phone, avatar_letter, avatar_color, avatar_url, level_label, level_num, streak, longest_streak, points, char_mode FROM users WHERE id = ?',
      [req.userId]
    );

    res.json({ message: 'Cập nhật thành công!', user: user[0] });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Lỗi cập nhật thông tin.' });
  }
});

// PUT /api/profile/password - Change password
router.put('/password', requireAuth, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới.' });
    }
    if (new_password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu mới cần ít nhất 6 ký tự.' });
    }
    if (current_password === new_password) {
      return res.status(400).json({ error: 'Mật khẩu mới phải khác mật khẩu hiện tại.' });
    }

    const [user] = await pool.query('SELECT password_hash FROM users WHERE id = ?', [req.userId]);
    // Token hợp lệ nhưng tài khoản đã bị xoá -> user[0] undefined. Bản cũ truy cập thẳng
    // user[0].password_hash nên ném TypeError và trả 500 khó hiểu; giờ trả 404 rõ ràng.
    if (user.length === 0) return res.status(404).json({ error: 'Không tìm thấy tài khoản.' });

    const valid = await bcrypt.compare(current_password, user[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Mật khẩu hiện tại không đúng.' });

    const newHash = await bcrypt.hash(new_password, 10);
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, req.userId]);

    res.json({ message: 'Đổi mật khẩu thành công!' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ error: 'Lỗi đổi mật khẩu.' });
  }
});

/**
 * PUT /api/profile/nhac-hoc — học viên tự bật/tắt email nhắc học hằng ngày.
 *
 * Bắt buộc phải có: gửi mail cho người đã nói "đừng gửi nữa" là cách nhanh nhất để bị đánh dấu
 * spam, và khi tên miền đã vào danh sách spam thì mail XÁC THỰC TÀI KHOẢN của người khác cũng
 * không tới nơi — hỏng một việc quan trọng hơn nhiều.
 */
router.put('/nhac-hoc', requireAuth, async (req, res) => {
  const bat = req.body?.bat !== false;
  try {
    await pool.query('UPDATE users SET nhan_mail_nhac = ? WHERE id = ?', [bat, req.userId]);
    res.json({ bat, message: bat ? 'Đã bật nhắc học qua email.' : 'Đã tắt nhắc học qua email.' });
  } catch (err) {
    if (err?.code === 'ER_BAD_FIELD_ERROR') {
      return res.status(503).json({ error: 'DB chưa chạy migration-nhac-hoc.sql.' });
    }
    console.error('Lỗi đổi cài đặt nhắc học:', err);
    res.status(500).json({ error: 'Không lưu được cài đặt.' });
  }
});

// GET /api/profile/my-classes - List classes the logged-in student is enrolled in
router.get('/my-classes', requireAuth, async (req, res) => {
  try {
    // Đếm sĩ số bằng subquery thay vì LEFT JOIN thêm class_enrollments rồi COUNT: cách cũ nhân bản
    // dòng khi lớp có nhiều buổi/nhiều bản ghi, dễ ra số sai. Subquery luôn cho đúng số học viên.
    const [classes] = await pool.query(`
      SELECT c.id, c.name, c.description,
             (SELECT COUNT(*) FROM class_enrollments ce2 WHERE ce2.class_id = c.id) AS student_count,
             (SELECT COUNT(*) FROM class_sessions cs WHERE cs.class_id = c.id) AS session_count
      FROM class_enrollments ce
      JOIN classes c ON c.id = ce.class_id
      WHERE ce.user_id = ?
      ORDER BY c.name ASC
    `, [req.userId]);
    res.json({ classes });
  } catch (err) {
    // Nếu DB chưa chạy migration (chưa có class_sessions) thì đây là route của HỌC VIÊN — không
    // được để vỡ trang tài khoản của các em. Trả danh sách rỗng thay vì 500.
    console.error('My classes error:', err.code || err.message);
    res.json({ classes: [], unavailable: true });
  }
});

/**
 * POST /api/profile/vao-lop — học viên tự vào lớp bằng MÃ MỜI của lớp.
 *
 * `classes.invite_code` được sinh và hiện cho giáo viên từ lâu ("Mã mời: FC6D909E" ở màn chi tiết
 * lớp), nhưng tới 2026-09-13 KHÔNG có route nào nhận nó — tức giao diện hứa một việc mà hệ thống
 * không làm được. Đây cũng là đường onboarding tốt nhất cho trung tâm thuê hệ thống: trung tâm
 * chỉ phát một mã, học viên tự đăng ký và TỰ ĐẶT MẬT KHẨU, không phải dùng chung mật khẩu mặc
 * định như đường thêm bằng email.
 *
 * Việc đổi tổ chức là do CHÍNH HỌC VIÊN khởi xướng nên hợp lệ — khác hẳn với việc trung tâm gõ
 * email người lạ để kéo họ về (đường đó cố ý bị chặn ở POST /admin/classes/:id/students).
 */
router.post('/vao-lop', requireAuth, async (req, res) => {
  const ma = String(req.body?.ma || '').trim().toUpperCase();
  if (!ma) return res.status(400).json({ error: 'Vui lòng nhập mã mời của lớp.' });

  try {
    const [[lop]] = await pool.query(
      'SELECT id, name, is_active FROM classes WHERE invite_code = ?', [ma]);
    if (!lop) return res.status(404).json({ error: 'Mã mời không đúng. Kiểm tra lại với giáo viên nhé.' });
    if (!lop.is_active) return res.status(400).json({ error: 'Lớp này đã đóng.' });

    const [[u]] = await pool.query('SELECT id, role FROM users WHERE id = ?', [req.userId]);
    if ((u.role || 'student') !== 'student') {
      return res.status(400).json({ error: 'Chỉ tài khoản học viên mới vào lớp bằng mã mời.' });
    }

    const [[daCo]] = await pool.query(
      'SELECT 1 AS x FROM class_enrollments WHERE class_id = ? AND user_id = ?', [lop.id, req.userId]);
    if (daCo) return res.json({ message: `Bạn đã ở trong lớp "${lop.name}" rồi.`, lop: { id: lop.id, name: lop.name } });

    // Hệ thống đang theo mô hình MỘT học viên ở MỘT lớp (đường thêm của giáo viên cũng xoá lớp cũ
    // trước khi thêm). Nói rõ trong thông báo thay vì im lặng đá họ ra khỏi lớp đang học.
    const [[cu]] = await pool.query(
      `SELECT c.name FROM class_enrollments ce JOIN classes c ON c.id = ce.class_id
        WHERE ce.user_id = ? LIMIT 1`, [req.userId]);

    await pool.query('DELETE FROM class_enrollments WHERE user_id = ?', [req.userId]);
    await pool.query('INSERT INTO class_enrollments (class_id, user_id) VALUES (?, ?)', [lop.id, req.userId]);
    // Quyền nội dung có thể vừa đổi (vào trung tâm đã mua khoá) — bỏ đệm để có hiệu lực ngay.
    xoaCache(req.userId);

    res.json({
      message: cu && cu.name !== lop.name
        ? `Đã vào lớp "${lop.name}" (bạn được chuyển khỏi lớp "${cu.name}").`
        : `Đã vào lớp "${lop.name}".`,
      lop: { id: lop.id, name: lop.name },
    });
  } catch (err) {
    console.error('Lỗi vào lớp bằng mã mời:', err);
    res.status(500).json({ error: 'Lỗi vào lớp. Thử lại sau nhé.' });
  }
});

// PUT /api/profile/avatar - Upload avatar image (base64 dataURL, max ~2MB)
router.put('/avatar', requireAuth, async (req, res) => {
  try {
    const { avatar_url } = req.body;
    if (!avatar_url) return res.status(400).json({ error: 'Không có dữ liệu ảnh.' });
    // Basic validation: must be a data URL image
    if (typeof avatar_url !== 'string' || !avatar_url.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Định dạng ảnh không hợp lệ.' });
    }
    // Limit size ~2MB base64 ≈ 2.7MB string
    if (avatar_url.length > 3_000_000) {
      return res.status(400).json({ error: 'Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 2MB.' });
    }
    await pool.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatar_url, req.userId]);
    res.json({ message: 'Cập nhật ảnh đại diện thành công!', avatar_url });
  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ error: 'Lỗi lưu ảnh đại diện.' });
  }
});

export default router;
