// =============================================================
// TỔ CHỨC (trung tâm) + CẤP QUYỀN HỌC — 2026-09-09
//
// Mount cùng tiền tố /api/admin, nhưng KHÔNG dùng chung router với admin.js: khu này quyết định
// ai được học cái gì và trung tâm nào còn hạn hợp đồng, tức là nơi tiền đi qua. Để lẫn vào file
// 1.900 dòng thì rất khó rà.
//
// AI LÀM GÌ:
//   • admin NỀN TẢNG — tạo/sửa trung tâm, gia hạn hợp đồng, cấp và thu hồi quyền học.
//   • quản trị TRUNG TÂM — chỉ XEM: tổ chức mình còn hạn tới bao giờ, học viên nào đang có quyền
//     gì. CỐ Ý không cho tự cấp quyền: quyền là thứ bán ra, trung tâm tự cấp cho mình được thì
//     không còn gì để bán. Muốn cho trung tâm phân bổ theo suất thì phải có bảng "suất đã mua"
//     riêng — việc khác, chưa làm.
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { loadRole, requireStaff, requireAdminOnly, phamViQuanTri, ORG_NEN_TANG } from '../middleware/roles.js';
import { capQuyen, thuHoiQuyen, quyenCuaNguoiDung, xoaCache } from '../utils/quyen-noi-dung.js';
import { sendWelcomeEmail } from '../utils/email.js';

const router = Router();

/** Mật khẩu mặc định khi tạo tài khoản quản trị cho một trung tâm mới. */
const MAT_KHAU_QUAN_TRI = 'tentrungtam68';

router.use(requireAuth, loadRole, requireStaff, phamViQuanTri);

/** Bảng chưa có (chưa chạy migration) — nói đúng nguyên nhân thay vì "Lỗi hệ thống". */
function loiThieuBang(err, macDinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'DB chưa có bảng tổ chức/quyền học. Chạy `npm run db:migrate:prod` rồi thử lại.';
  }
  return macDinh;
}

// ------------------------------------------------------------------ TỔ CHỨC
/** Tổ chức của chính mình — quản trị trung tâm và giáo viên xem hạn hợp đồng còn lại. */
router.get('/to-chuc/cua-toi', async (req, res) => {
  try {
    const [[o]] = await pool.query(
      `SELECT id, ma, ten, loai, goi, trang_thai, bat_dau, het_han, gioi_han_hoc_vien,
              gioi_han_giao_vien, mon
         FROM organizations WHERE id = ?`, [req.orgId]);
    if (!o) return res.status(404).json({ error: 'Không tìm thấy tổ chức.' });
    const [[{ hv }]] = await pool.query("SELECT COUNT(*) AS hv FROM users WHERE org_id = ? AND role = 'student'", [req.orgId]);
    const [[{ gv }]] = await pool.query("SELECT COUNT(*) AS gv FROM users WHERE org_id = ? AND role IN ('teacher','org_admin')", [req.orgId]);
    res.json({ to_chuc: { ...o, so_hoc_vien: hv, so_giao_vien: gv } });
  } catch (err) {
    console.error('Lỗi đọc tổ chức:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải thông tin tổ chức.') });
  }
});

router.get('/to-chuc', requireAdminOnly, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.*,
        (SELECT COUNT(*) FROM users u WHERE u.org_id = o.id AND u.role = 'student') AS so_hoc_vien,
        (SELECT COUNT(*) FROM users u WHERE u.org_id = o.id AND u.role IN ('teacher','org_admin')) AS so_giao_vien,
        (SELECT COUNT(*) FROM classes c WHERE c.org_id = o.id) AS so_lop
      FROM organizations o ORDER BY o.loai = 'nen-tang' DESC, o.ten ASC`);
    res.json({ to_chuc: rows });
  } catch (err) {
    console.error('Lỗi danh sách tổ chức:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải danh sách tổ chức.') });
  }
});

/**
 * Tạo một trung tâm mới, kèm tài khoản quản trị đầu tiên của họ.
 * Tạo luôn tài khoản quản trị chứ không để bước riêng: trung tâm không có ai đăng nhập được thì
 * bản ghi tổ chức chẳng dùng vào việc gì, mà bước "nhớ tạo tài khoản sau" thì sớm muộn cũng quên.
 */
router.post('/to-chuc', requireAdminOnly, async (req, res) => {
  const { ma, ten, goi, het_han, gioi_han_hoc_vien, gioi_han_giao_vien, mon,
          quan_tri_email, quan_tri_ten, lien_he_phone, ghi_chu } = req.body;
  if (!ma || !/^[a-z0-9-]{2,40}$/.test(ma)) {
    return res.status(400).json({ error: 'Mã tổ chức chỉ gồm chữ thường, số và dấu gạch ngang.' });
  }
  if (!ten) return res.status(400).json({ error: 'Vui lòng nhập tên tổ chức.' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [r] = await conn.query(
      `INSERT INTO organizations (ma, ten, loai, goi, trang_thai, bat_dau, het_han,
                                  gioi_han_hoc_vien, gioi_han_giao_vien, mon, lien_he_phone, ghi_chu)
       VALUES (?,?, 'trung-tam', ?, 'hoat-dong', CURDATE(), ?, ?, ?, ?, ?, ?)`,
      [ma, ten, goi || 'dung-thu', het_han || null,
       gioi_han_hoc_vien || null, gioi_han_giao_vien || null, mon || 'zh',
       lien_he_phone || null, ghi_chu || null]);
    const orgId = r.insertId;

    let taiKhoan = null;
    const mail = String(quan_tri_email || '').trim().toLowerCase();
    if (mail) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
        throw Object.assign(new Error('Email quản trị không hợp lệ.'), { status: 400 });
      }
      const [da] = await conn.query('SELECT id FROM users WHERE email = ?', [mail]);
      if (da.length) throw Object.assign(new Error('Email này đã có tài khoản trong hệ thống.'), { status: 400 });
      const ten2 = String(quan_tri_ten || '').trim() || mail.split('@')[0];
      const hash = await bcrypt.hash(MAT_KHAU_QUAN_TRI, 10);
      const [u] = await conn.query(
        `INSERT INTO users (org_id, name, email, password_hash, role, is_admin, is_verified, is_approved, avatar_letter)
         VALUES (?,?,?,?, 'org_admin', 0, 1, 1, ?)`,
        [orgId, ten2, mail, hash, ten2.charAt(0).toUpperCase()]);
      taiKhoan = { id: u.insertId, email: mail, mat_khau: MAT_KHAU_QUAN_TRI };
    }
    await conn.commit();

    // Gửi mail sau khi commit — gửi lỗi thì tài khoản vẫn đã tạo xong, đừng cuộn ngược cả giao dịch.
    if (taiKhoan) {
      sendWelcomeEmail(taiKhoan.email, MAT_KHAU_QUAN_TRI, null)
        .catch((e) => console.warn('Không gửi được mail quản trị trung tâm:', e.message));
    }
    res.status(201).json({ message: `Đã tạo trung tâm "${ten}".`, id: orgId, quan_tri: taiKhoan });
  } catch (err) {
    await conn.rollback();
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Mã tổ chức đã tồn tại.' });
    if (err.status === 400) return res.status(400).json({ error: err.message });
    console.error('Lỗi tạo tổ chức:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tạo tổ chức.') });
  } finally {
    conn.release();
  }
});

/** Gia hạn / tạm dừng / đổi hạn mức. Đây là chỗ "hết hạn hợp đồng" có hiệu lực với cả trung tâm. */
router.put('/to-chuc/:id', requireAdminOnly, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (id === ORG_NEN_TANG && req.body.trang_thai && req.body.trang_thai !== 'hoat-dong') {
      // Tổ chức gốc mà bị tạm dừng thì chính admin cũng mất quyền — không có đường quay lại
      // ngoài việc sửa thẳng DB.
      return res.status(400).json({ error: 'Không thể tạm dừng tổ chức nền tảng.' });
    }
    const cho = ['ten', 'goi', 'trang_thai', 'bat_dau', 'het_han', 'gioi_han_hoc_vien',
                 'gioi_han_giao_vien', 'mon', 'lien_he_ten', 'lien_he_email', 'lien_he_phone', 'ghi_chu'];
    const sets = [], vals = [];
    for (const k of cho) {
      if (req.body[k] !== undefined) { sets.push(`${k} = ?`); vals.push(req.body[k] === '' ? null : req.body[k]); }
    }
    if (!sets.length) return res.status(400).json({ error: 'Không có gì để cập nhật.' });
    vals.push(id);
    const [r] = await pool.query(`UPDATE organizations SET ${sets.join(', ')} WHERE id = ?`, vals);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy tổ chức.' });
    // Quyền của cả tổ chức vừa đổi -> đệm quyền của mọi thành viên không còn đúng nữa.
    xoaCache();
    res.json({ message: 'Đã cập nhật tổ chức.' });
  } catch (err) {
    console.error('Lỗi cập nhật tổ chức:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi cập nhật tổ chức.') });
  }
});

// ------------------------------------------------------------------ QUYỀN HỌC
/** Danh mục sản phẩm để dựng ô chọn khi cấp quyền. */
router.get('/quyen-hoc/san-pham', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT ma, ten, loai, mon, so_ngay, gia, is_active FROM products ORDER BY sort_order, gia');
    res.json({ san_pham: rows });
  } catch (err) {
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải danh mục sản phẩm.') });
  }
});

/**
 * Quyền học đã cấp. Không truyền user_id thì liệt kê theo phạm vi (tổ chức mình / cả hệ thống).
 * Quản trị trung tâm CHỈ XEM — nút cấp/thu hồi không mở cho họ (xem ghi chú đầu file).
 */
router.get('/quyen-hoc', async (req, res) => {
  try {
    const uid = req.query.user_id ? parseInt(req.query.user_id, 10) : null;
    const dk = [], vals = [];
    if (uid) { dk.push('e.user_id = ?'); vals.push(uid); }
    // Giới hạn phạm vi: quyền của người trong tổ chức mình, HOẶC quyền cấp cho chính tổ chức mình.
    if (req.locOrg) { dk.push('(u.org_id = ? OR e.org_id = ?)'); vals.push(req.orgId, req.orgId); }
    const [rows] = await pool.query(`
      SELECT e.id, e.user_id, e.org_id, e.product_ma, e.nguon, e.bat_dau, e.het_han,
             e.trang_thai, e.ghi_chu, e.created_at,
             p.ten AS san_pham_ten, u.name AS hoc_vien, u.email AS hoc_vien_email,
             o.ten AS to_chuc_ten
        FROM entitlements e
        JOIN products p ON p.ma = e.product_ma
   LEFT JOIN users u ON u.id = e.user_id
   LEFT JOIN organizations o ON o.id = e.org_id
       ${dk.length ? 'WHERE ' + dk.join(' AND ') : ''}
       ORDER BY e.created_at DESC LIMIT 200`, vals);

    // Kèm trạng thái hợp nhất của học viên đang xem — trả lời thẳng câu hỏi hay gặp nhất của
    // giáo viên: "sao em này không mở được bài?".
    let hien_tai = null;
    if (uid) {
      const q = await quyenCuaNguoiDung(uid);
      hien_tai = { tat_ca: q.tatCa, bo: [...q.bo], het_han: q.hetHan, vai_tro: q.vaiTro };
    }
    res.json({ quyen: rows, hien_tai });
  } catch (err) {
    console.error('Lỗi đọc quyền học:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải quyền học.') });
  }
});

/** Cấp quyền cho MỘT học viên hoặc cho CẢ tổ chức. Chỉ admin nền tảng. */
router.post('/quyen-hoc', requireAdminOnly, async (req, res) => {
  try {
    const { user_id, org_id, product_ma, so_ngay, ghi_chu, nguon } = req.body;
    if (!product_ma) return res.status(400).json({ error: 'Vui lòng chọn sản phẩm.' });
    if (!user_id && !org_id) return res.status(400).json({ error: 'Chọn học viên hoặc tổ chức để cấp.' });
    if (user_id && org_id) return res.status(400).json({ error: 'Chỉ cấp cho học viên HOẶC tổ chức, không cả hai.' });

    const id = await capQuyen({
      userId: user_id ? parseInt(user_id, 10) : null,
      orgId: org_id ? parseInt(org_id, 10) : null,
      productMa: product_ma,
      nguon: nguon || 'admin',
      soNgay: so_ngay === '' || so_ngay === undefined ? null : Number(so_ngay),
      capBoi: req.userId,
      ghiChu: ghi_chu || null,
    });
    res.status(201).json({ message: 'Đã cấp quyền học.', id });
  } catch (err) {
    if (err.status === 400) return res.status(400).json({ error: err.message });
    console.error('Lỗi cấp quyền:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi cấp quyền học.') });
  }
});

/** Thu hồi — đổi trạng thái, KHÔNG xoá hàng: còn phải tra được ai cấp gì lúc nào khi có tranh cãi. */
router.delete('/quyen-hoc/:id', requireAdminOnly, async (req, res) => {
  try {
    const ok = await thuHoiQuyen(parseInt(req.params.id, 10));
    if (!ok) return res.status(404).json({ error: 'Không tìm thấy quyền học.' });
    res.json({ message: 'Đã thu hồi quyền học.' });
  } catch (err) {
    console.error('Lỗi thu hồi quyền:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi thu hồi quyền học.') });
  }
});

export default router;
