// Quản lý GIÁO VIÊN — chỉ admin dùng được.
//
// Tách khỏi routes/admin.js (đã ~1.800 dòng) theo quy ước "route mới thì file mới" trong CLAUDE.md.
// Mount ở /api/admin nên đường dẫn là /api/admin/teachers...
//
// Ba lớp đánh giá giáo viên, cố ý tách riêng vì trả lời 3 câu hỏi khác nhau:
//   1. Chỉ số tự động  — tính thẳng từ dữ liệu dạy học, không ai nhập tay nên không nói dối được.
//   2. Sổ nhận xét     — admin ghi tự do theo thời gian (teacher_notes), dùng khi họp/đánh giá.
//   3. Phiếu chấm điểm — 5 tiêu chí, thang 1-5, mỗi kỳ (tháng) một phiếu (teacher_reviews),
//                        để so sánh được giữa các kỳ và giữa các giáo viên.
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { loadRole, requireStaff, phamViQuanTri } from '../middleware/roles.js';
import { sendWelcomeEmail } from '../utils/email.js';

const router = Router();

// Mật khẩu mặc định khi admin tạo tài khoản giáo viên mới (giáo viên đổi lại sau khi đăng nhập).
const MAT_KHAU_MAC_DINH_GV = 'tengiaovien68';

// Admin nền tảng: toàn quyền. Quản trị TRUNG TÂM: quản lý giáo viên của chính tổ chức mình
// (đã khai trong bảng QUYEN ở middleware/roles.js). Giáo viên: không khai -> 403.
// Mọi truy vấn bên dưới phải kèm `dkOrg(req)` — bảng quyền chỉ là lưới thứ nhất.
router.use(requireAuth, loadRole, requireStaff, phamViQuanTri);

/** Mảnh SQL + tham số giới hạn theo tổ chức. Admin nền tảng không bị lọc. */
const dkOrg = (req, cot = 'org_id') => (req.locOrg ? ` AND ${cot} = ?` : '');
const tsOrg = (req) => (req.locOrg ? [req.orgId] : []);

/** Bảng chưa có (chưa chạy migration) thì báo đúng nguyên nhân thay vì "Lỗi hệ thống". */
function loiThieuBang(err, mac_dinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'DB chưa có bảng/cột giáo viên. Chạy `npm run db:migrate:prod` rồi thử lại.';
  }
  return mac_dinh;
}

// =============================================
// DANH SÁCH + HỒ SƠ
// =============================================
router.get('/teachers', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.name, u.email, u.phone, u.role, u.last_active, u.created_at,
        (SELECT COUNT(*) FROM classes c WHERE c.teacher_id = u.id) AS so_lop,
        (SELECT COUNT(DISTINCT ce.user_id) FROM class_enrollments ce
           JOIN classes c ON c.id = ce.class_id WHERE c.teacher_id = u.id) AS so_hoc_vien,
        (SELECT ROUND(AVG(tr.diem_chuyen_can + tr.diem_bai_giang + tr.diem_theo_sat
                        + tr.diem_phan_hoi + tr.diem_ket_qua) / 5, 1)
           FROM teacher_reviews tr WHERE tr.teacher_id = u.id) AS diem_tb
      FROM users u
      WHERE u.role = 'teacher'${dkOrg(req, 'u.org_id')}
      ORDER BY u.name ASC
    `, tsOrg(req));
    res.json({ teachers: rows });
  } catch (err) {
    console.error('List teachers error:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải danh sách giáo viên.') });
  }
});

/** Danh sách rút gọn để đổ vào ô chọn "giáo viên phụ trách" ở form lớp. */
router.get('/teachers-options', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, role FROM users WHERE role IN ('teacher','admin')${dkOrg(req)} ORDER BY role DESC, name ASC`, tsOrg(req)
    );
    res.json({ teachers: rows });
  } catch (err) {
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải danh sách giáo viên.') });
  }
});

// Thêm giáo viên bằng email — cùng cách làm với "thêm học viên hàng loạt":
// email đã có tài khoản thì nâng vai trò lên teacher, chưa có thì tạo mới + gửi mail chào mừng.
router.post('/teachers', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const mail = String(email || '').trim().toLowerCase();
    if (!mail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      return res.status(400).json({ error: 'Email không hợp lệ.' });
    }
    const [ton_tai] = await pool.query('SELECT id, name, role, org_id FROM users WHERE email = ?', [mail]);

    if (ton_tai.length) {
      const u = ton_tai[0];
      if (u.role === 'admin') return res.status(400).json({ error: 'Đây là tài khoản quản trị viên, không cần đổi thành giáo viên.' });
      if (u.role === 'teacher') return res.status(400).json({ error: 'Tài khoản này đã là giáo viên.' });
      // Người đã thuộc tổ chức KHÁC thì không được kéo sang: họ đang có lớp, có lịch sử học ở
      // bên kia. Thông báo cố ý không nói họ đang ở tổ chức nào.
      if (req.locOrg && u.org_id !== req.orgId) {
        return res.status(400).json({ error: 'Email này đã được dùng ở một tổ chức khác.' });
      }
      await pool.query('UPDATE users SET role = ?, is_approved = 1 WHERE id = ?', ['teacher', u.id]);
      return res.status(200).json({ message: `Đã chuyển "${u.name}" thành giáo viên.`, id: u.id, nang_cap: true });
    }

    const hash = await bcrypt.hash(MAT_KHAU_MAC_DINH_GV, 10);
    const ten = String(name || '').trim() || mail.split('@')[0];
    const [r] = await pool.query(
      `INSERT INTO users (org_id, name, email, phone, password_hash, role, is_admin, is_verified, is_approved, avatar_letter)
       VALUES (?,?,?,?,?, 'teacher', 0, 1, 1, ?)`,
      [req.orgId, ten, mail, String(phone || '').trim(), hash, ten.charAt(0).toUpperCase()]
    );
    // Gửi mail báo mật khẩu mặc định. Không chặn luồng nếu gửi lỗi — tài khoản đã tạo xong.
    sendWelcomeEmail(mail, MAT_KHAU_MAC_DINH_GV, null).catch(e => console.warn('Không gửi được mail giáo viên:', e.message));
    res.status(201).json({
      message: `Đã tạo tài khoản giáo viên cho ${mail} (mật khẩu mặc định: ${MAT_KHAU_MAC_DINH_GV}).`,
      id: r.insertId,
    });
  } catch (err) {
    console.error('Create teacher error:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tạo giáo viên.') });
  }
});

router.put('/teachers/:id', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const sets = [], vals = [];
    if (name !== undefined) { sets.push('name=?'); vals.push(String(name).trim()); }
    if (phone !== undefined) { sets.push('phone=?'); vals.push(String(phone).trim()); }
    if (!sets.length) return res.status(400).json({ error: 'Không có gì để cập nhật.' });
    vals.push(req.params.id);
    const [r] = await pool.query(
      `UPDATE users SET ${sets.join(', ')} WHERE id = ? AND role = 'teacher'${dkOrg(req)}`, [...vals, ...tsOrg(req)]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy giáo viên.' });
    res.json({ message: 'Đã cập nhật thông tin giáo viên.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật giáo viên.' });
  }
});

// "Xoá" giáo viên = hạ vai trò về học viên, KHÔNG xoá tài khoản.
// Xoá tài khoản sẽ kéo theo teacher_notes/teacher_reviews (ON DELETE CASCADE) và làm mất
// lịch sử đánh giá; lớp đang phụ trách cũng bị bỏ trống. Ai thực sự muốn xoá hẳn thì dùng
// trang Người dùng.
router.delete('/teachers/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [[lop]] = await pool.query('SELECT COUNT(*) AS n FROM classes WHERE teacher_id = ?', [id]);
    if (lop.n > 0) {
      return res.status(400).json({
        error: `Giáo viên này còn phụ trách ${lop.n} lớp. Hãy chuyển lớp cho người khác trước.`,
      });
    }
    const [r] = await pool.query(
      `UPDATE users SET role = 'student' WHERE id = ? AND role = 'teacher'${dkOrg(req)}`, [id, ...tsOrg(req)]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy giáo viên.' });
    res.json({ message: 'Đã bỏ vai trò giáo viên (tài khoản vẫn còn).' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi bỏ vai trò giáo viên.' });
  }
});

// =============================================
// CHI TIẾT + CHỈ SỐ TỰ ĐỘNG
// =============================================
router.get('/teachers/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [[gv]] = await pool.query(
      `SELECT id, name, email, phone, role, last_active, created_at FROM users WHERE id = ? AND role IN ('teacher','admin')${dkOrg(req)}`,
      [id, ...tsOrg(req)]
    );
    if (!gv) return res.status(404).json({ error: 'Không tìm thấy giáo viên.' });

    const [classes] = await pool.query(`
      SELECT c.id, c.name, c.is_active,
        (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = c.id) AS so_hoc_vien,
        (SELECT COUNT(*) FROM class_sessions cs WHERE cs.class_id = c.id) AS so_buoi
      FROM classes c WHERE c.teacher_id = ? ORDER BY c.is_active DESC, c.name ASC
    `, [id]);

    // --- Chỉ số 1: chuyên cần ghi chép — buổi đã tới ngày mà chưa điểm danh đủ sĩ số ---
    const [[buoi]] = await pool.query(`
      SELECT COUNT(*) AS tong, SUM(t.marked >= t.roster AND t.roster > 0) AS da_diem_danh
      FROM (
        SELECT cs.id,
          (SELECT COUNT(*) FROM class_attendance ca WHERE ca.session_id = cs.id) AS marked,
          (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = cs.class_id) AS roster
        FROM class_sessions cs JOIN classes c ON c.id = cs.class_id
        WHERE c.teacher_id = ? AND cs.session_date <= CURDATE()
      ) t
    `, [id]);

    // --- Chỉ số 2: bài giao và tỉ lệ nộp ---
    const [[bai]] = await pool.query(`
      SELECT COUNT(*) AS so_bai_giao,
             COALESCE(SUM(x.total_students), 0) AS luot_can_nop,
             COALESCE(SUM(x.submitted_count), 0) AS luot_da_nop
      FROM (
        SELECT
          (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = a.class_id) AS total_students,
          (SELECT COUNT(*) FROM class_enrollments ce JOIN users u ON u.id = ce.user_id
            WHERE ce.class_id = a.class_id
              AND EXISTS (SELECT 1 FROM exercise_results er WHERE er.user_id = u.id AND er.lesson_id = a.lesson_id)
          ) AS submitted_count
        FROM assignments a JOIN classes c ON c.id = a.class_id
        WHERE c.teacher_id = ?
      ) x
    `, [id]);

    // --- Chỉ số 3: điểm trung bình học viên (chỉ lần nộp mới nhất của mỗi bài) ---
    const [[diem]] = await pool.query(`
      SELECT ROUND(AVG(er.score_percent)) AS diem_tb_hoc_vien, COUNT(*) AS so_luot_tinh
      FROM exercise_results er
      INNER JOIN (
        SELECT e2.user_id, e2.lesson_id, MAX(e2.created_at) AS mx
        FROM exercise_results e2
        JOIN class_enrollments ce ON ce.user_id = e2.user_id
        JOIN classes c ON c.id = ce.class_id AND c.teacher_id = ?
        GROUP BY e2.user_id, e2.lesson_id
      ) t ON t.user_id = er.user_id AND t.lesson_id = er.lesson_id AND t.mx = er.created_at
    `, [id]);

    // --- Chỉ số 4: mức độ theo sát — nhận xét đã viết ---
    const [[nx]] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM student_notes sn WHERE sn.author_id = ?) AS so_nhan_xet_so,
        (SELECT COUNT(*) FROM class_attendance ca
           JOIN class_sessions cs ON cs.id = ca.session_id
           JOIN classes c ON c.id = cs.class_id
          WHERE c.teacher_id = ? AND ca.teacher_note IS NOT NULL AND ca.teacher_note <> '') AS so_nhan_xet_buoi,
        (SELECT COUNT(*) FROM exercise_results er
           JOIN class_enrollments ce ON ce.user_id = er.user_id
           JOIN classes c ON c.id = ce.class_id AND c.teacher_id = ?
          WHERE er.teacher_review IS NOT NULL AND er.teacher_review <> '') AS so_loi_phe_bai
    `, [id, id, id]);

    const [notes] = await pool.query(`
      SELECT tn.id, tn.note, tn.created_at, u.name AS author_name
      FROM teacher_notes tn LEFT JOIN users u ON u.id = tn.author_id
      WHERE tn.teacher_id = ? ORDER BY tn.created_at DESC LIMIT 100
    `, [id]);

    const [reviews] = await pool.query(`
      SELECT tr.*, u.name AS author_name,
        ROUND((tr.diem_chuyen_can + tr.diem_bai_giang + tr.diem_theo_sat
             + tr.diem_phan_hoi + tr.diem_ket_qua) / 5, 1) AS diem_tb
      FROM teacher_reviews tr LEFT JOIN users u ON u.id = tr.author_id
      WHERE tr.teacher_id = ? ORDER BY tr.ky DESC LIMIT 36
    `, [id]);

    res.json({
      teacher: gv,
      classes,
      chi_so: {
        so_lop: classes.length,
        so_hoc_vien: classes.reduce((a, c) => a + Number(c.so_hoc_vien || 0), 0),
        buoi_da_toi_ngay: Number(buoi.tong || 0),
        buoi_da_diem_danh: Number(buoi.da_diem_danh || 0),
        so_bai_giao: Number(bai.so_bai_giao || 0),
        luot_can_nop: Number(bai.luot_can_nop || 0),
        luot_da_nop: Number(bai.luot_da_nop || 0),
        diem_tb_hoc_vien: diem.diem_tb_hoc_vien,
        so_nhan_xet_so: Number(nx.so_nhan_xet_so || 0),
        so_nhan_xet_buoi: Number(nx.so_nhan_xet_buoi || 0),
        so_loi_phe_bai: Number(nx.so_loi_phe_bai || 0),
      },
      notes,
      reviews,
    });
  } catch (err) {
    console.error('Teacher detail error:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải hồ sơ giáo viên.') });
  }
});

// =============================================
// SỔ NHẬN XÉT GIÁO VIÊN
// =============================================
router.post('/teachers/:id/notes', async (req, res) => {
  try {
    const note = typeof req.body.note === 'string' ? req.body.note.trim() : '';
    if (!note) return res.status(400).json({ error: 'Nhận xét không được để trống.' });
    await pool.query('INSERT INTO teacher_notes (teacher_id, author_id, note) VALUES (?,?,?)',
      [req.params.id, req.userId, note]);
    res.status(201).json({ message: 'Đã lưu nhận xét.' });
  } catch (err) {
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi lưu nhận xét.') });
  }
});

router.delete('/teacher-notes/:id', async (req, res) => {
  try {
    const [r] = await pool.query('DELETE FROM teacher_notes WHERE id = ?', [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy nhận xét.' });
    res.json({ message: 'Đã xoá nhận xét.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xoá nhận xét.' });
  }
});

// =============================================
// PHIẾU CHẤM ĐIỂM THEO TIÊU CHÍ
// =============================================
const TIEU_CHI = ['diem_chuyen_can', 'diem_bai_giang', 'diem_theo_sat', 'diem_phan_hoi', 'diem_ket_qua'];

router.put('/teachers/:id/reviews', async (req, res) => {
  try {
    const ky = String(req.body.ky || '').trim();
    if (!/^\d{4}-\d{2}$/.test(ky)) return res.status(400).json({ error: 'Kỳ đánh giá phải có dạng YYYY-MM.' });

    const diem = {};
    for (const t of TIEU_CHI) {
      const v = req.body[t];
      if (v === null || v === undefined || v === '') { diem[t] = null; continue; }
      const n = parseInt(v, 10);
      if (!Number.isInteger(n) || n < 1 || n > 5) {
        return res.status(400).json({ error: 'Điểm mỗi tiêu chí phải từ 1 đến 5.' });
      }
      diem[t] = n;
    }
    const nhan_xet = typeof req.body.nhan_xet === 'string' ? req.body.nhan_xet.trim() : '';

    await pool.query(`
      INSERT INTO teacher_reviews (teacher_id, ky, ${TIEU_CHI.join(', ')}, nhan_xet, author_id)
      VALUES (?,?,?,?,?,?,?,?,?)
      ON DUPLICATE KEY UPDATE
        ${TIEU_CHI.map(t => `${t}=VALUES(${t})`).join(', ')},
        nhan_xet=VALUES(nhan_xet), author_id=VALUES(author_id)
    `, [req.params.id, ky, ...TIEU_CHI.map(t => diem[t]), nhan_xet, req.userId]);

    res.json({ message: `Đã lưu phiếu đánh giá kỳ ${ky}.` });
  } catch (err) {
    console.error('Save teacher review error:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi lưu phiếu đánh giá.') });
  }
});

router.delete('/teacher-reviews/:id', async (req, res) => {
  try {
    const [r] = await pool.query('DELETE FROM teacher_reviews WHERE id = ?', [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy phiếu đánh giá.' });
    res.json({ message: 'Đã xoá phiếu đánh giá.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xoá phiếu đánh giá.' });
  }
});

export default router;
