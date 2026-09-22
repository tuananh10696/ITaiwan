// =============================================================
// DUYỆT THANH TOÁN (phía quản trị) — 2026-09-09
//
// Tách khỏi `thanh-toan.js` (phần của học viên) vì đây là nơi TIỀN đổi thành QUYỀN: mọi route ở
// đây phải đi qua tầng phân quyền chung. Đừng gộp hai file — route "xem/sửa dữ liệu của người
// khác" mà nằm ở router chỉ có `requireAuth` rồi tự kiểm vai trò bằng tay chính là cách lỗi phân
// quyền đã lọt vào một lần (CLAUDE.md 4.22, luồng chấm bài dịch).
//
// Mount cùng tiền tố /api/admin.
//
// AI LÀM GÌ:
//   • admin NỀN TẢNG — xem mọi đơn, duyệt, từ chối, cấu hình tài khoản nhận tiền.
//   • quản trị trung tâm / giáo viên — KHÔNG đụng được gì ở đây (requireAdminOnly). Tiền chảy về
//     tài khoản của chủ nền tảng, nên chỉ chủ nền tảng mới được xác nhận đã nhận tiền.
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { loadRole, requireStaff, requireAdminOnly, phamViQuanTri } from '../middleware/roles.js';
import { capQuyen } from '../utils/quyen-noi-dung.js';
import { docCaiDat, ghiCaiDat } from '../utils/cai-dat.js';

const router = Router();

router.use(requireAuth, loadRole, requireStaff, phamViQuanTri);

/** Khoá cấu hình được phép ghi qua API — danh sách TRẮNG, không nhận khoá tuỳ ý từ client. */
const KHOA_CAU_HINH = ['bank_bin', 'bank_ten', 'bank_stk', 'bank_chu_tk', 'lien_he_admin'];

function loiThieuBang(err, macDinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'Chưa chạy migration thanh toán. Chạy `npm run db:migrate:prod` rồi thử lại.';
  }
  return macDinh;
}

// ------------------------------------------------------------------ danh sách đơn
/**
 * Danh sách đơn. `?trang_thai=cho` (mặc định) — hàng chờ cần duyệt.
 * Không trả `anh_bill` ở đây (MEDIUMTEXT base64): 30 đơn là vài chục MB cho một bảng danh sách.
 * Ảnh lấy riêng khi bấm xem.
 */
router.get('/thanh-toan', requireAdminOnly, async (req, res) => {
  try {
    const tt = String(req.query.trang_thai || 'cho');
    const hopLe = ['cho', 'thanh-cong', 'tu-choi', 'that-bai', 'tat-ca'];
    if (!hopLe.includes(tt)) return res.status(400).json({ error: 'Trạng thái không hợp lệ.' });

    const dieuKien = tt === 'tat-ca' ? '1=1' : 'p.trang_thai = ?';
    const tham = tt === 'tat-ca' ? [] : [tt];

    const [rows] = await pool.query(
      `SELECT p.id, p.ma_giao_dich, p.product_ma, p.so_tien, p.trang_thai, p.ghi_chu,
              p.created_at, p.anh_gui_luc, p.duyet_luc,
              (p.anh_bill IS NOT NULL) AS co_anh,
              pr.ten AS san_pham_ten,
              u.id AS user_id, u.name AS hoc_vien, u.email, u.phone,
              nd.name AS duyet_boi_ten
         FROM payments p
         JOIN users u ON u.id = p.user_id
         LEFT JOIN products pr ON pr.ma = p.product_ma
         LEFT JOIN users nd ON nd.id = p.duyet_boi
        WHERE ${dieuKien}
        ORDER BY (p.anh_bill IS NOT NULL) DESC, p.created_at DESC
        LIMIT 200`,
      tham,
    );

    const [[dem]] = await pool.query(
      `SELECT SUM(trang_thai = 'cho' AND anh_bill IS NOT NULL) AS cho_duyet,
              SUM(trang_thai = 'cho' AND anh_bill IS NULL)     AS chua_gui_anh,
              SUM(trang_thai = 'thanh-cong')                   AS da_duyet
         FROM payments`,
    );

    res.json({
      don: rows.map((r) => ({ ...r, co_anh: !!r.co_anh })),
      dem: {
        cho_duyet: Number(dem?.cho_duyet || 0),
        chua_gui_anh: Number(dem?.chua_gui_anh || 0),
        da_duyet: Number(dem?.da_duyet || 0),
      },
    });
  } catch (err) {
    console.error('Lỗi tải đơn thanh toán:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải danh sách đơn.') });
  }
});

/** Ảnh biên lai của một đơn — để đối chiếu với app ngân hàng trước khi duyệt. */
router.get('/thanh-toan/:id/anh', requireAdminOnly, async (req, res) => {
  try {
    const [[r]] = await pool.query('SELECT anh_bill FROM payments WHERE id = ?', [Number(req.params.id) || 0]);
    if (!r || !r.anh_bill) return res.status(404).json({ error: 'Đơn này chưa có ảnh biên lai.' });
    res.json({ anh: r.anh_bill });
  } catch (err) {
    console.error('Lỗi tải ảnh biên lai:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải ảnh.') });
  }
});

// ------------------------------------------------------------------ duyệt
/**
 * Duyệt đơn -> cấp quyền học.
 *
 * Dùng GIAO DỊCH: đổi trạng thái đơn và cấp quyền phải cùng thành công hoặc cùng không. Nếu
 * `capQuyen()` hỏng sau khi đơn đã đánh 'thanh-cong' thì đơn biến mất khỏi hàng chờ trong khi
 * học viên chưa hề được mở khoá — không ai còn nhìn thấy để sửa.
 *
 * `UPDATE ... WHERE trang_thai = 'cho'` cũng là khoá chống DUYỆT HAI LẦN: hai tab cùng bấm thì
 * lần thứ hai đổi 0 dòng và bị chặn, thay vì cấp quyền hai lần cho một lần trả tiền.
 */
router.post('/thanh-toan/:id/duyet', requireAdminOnly, async (req, res) => {
  const id = Number(req.params.id) || 0;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[don]] = await conn.query(
      'SELECT id, user_id, product_ma, so_tien, trang_thai FROM payments WHERE id = ? FOR UPDATE', [id]);
    if (!don) { await conn.rollback(); return res.status(404).json({ error: 'Không tìm thấy đơn.' }); }
    if (don.trang_thai !== 'cho') {
      await conn.rollback();
      return res.status(409).json({ error: `Đơn này đã ở trạng thái "${don.trang_thai}", không duyệt lại được.` });
    }
    if (!don.product_ma) { await conn.rollback(); return res.status(400).json({ error: 'Đơn không gắn với khoá học nào.' }); }

    const [r] = await conn.query(
      `UPDATE payments SET trang_thai = 'thanh-cong', duyet_boi = ?, duyet_luc = NOW(),
              da_doc_luc = NULL, ghi_chu = ?
        WHERE id = ? AND trang_thai = 'cho'`,
      [req.userId, String(req.body?.ghi_chu || '').slice(0, 500) || null, id],
    );
    if (!r.affectedRows) { await conn.rollback(); return res.status(409).json({ error: 'Đơn vừa được xử lý ở nơi khác.' }); }

    // capQuyen() dùng `pool` chứ không dùng `conn` nên nằm NGOÀI giao dịch này. Đặt nó sau bước
    // UPDATE và trước commit: hỏng thì rollback trả đơn về hàng chờ, quyền thừa (nếu có) thì
    // admin thu hồi được ở khu Quyền học — an toàn hơn chiều ngược lại (mất tiền, không có quyền).
    const entitlementId = await capQuyen({
      userId: don.user_id,
      productMa: don.product_ma,
      nguon: 'mua',
      capBoi: req.userId,
      ghiChu: `Duyệt chuyển khoản — đơn #${id}`,
    });
    await conn.query('UPDATE payments SET entitlement_id = ? WHERE id = ?', [entitlementId, id]);

    await conn.commit();
    res.json({ message: 'Đã duyệt và mở khoá cho học viên.', entitlement_id: entitlementId });
  } catch (err) {
    await conn.rollback().catch(() => {});
    if (err.status === 400) return res.status(400).json({ error: err.message });
    console.error('Lỗi duyệt thanh toán:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi duyệt đơn.') });
  } finally {
    conn.release();
  }
});

/** Từ chối đơn. Lý do BẮT BUỘC — học viên phải biết cần sửa gì để gửi lại. */
router.post('/thanh-toan/:id/tu-choi', requireAdminOnly, async (req, res) => {
  try {
    const lyDo = String(req.body?.ly_do || '').trim();
    if (!lyDo) return res.status(400).json({ error: 'Vui lòng ghi lý do từ chối để học viên biết cần làm gì.' });

    const [r] = await pool.query(
      `UPDATE payments SET trang_thai = 'tu-choi', duyet_boi = ?, duyet_luc = NOW(),
              da_doc_luc = NULL, ghi_chu = ?
        WHERE id = ? AND trang_thai = 'cho'`,
      [req.userId, lyDo.slice(0, 500), Number(req.params.id) || 0],
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy đơn đang chờ.' });
    res.json({ message: 'Đã từ chối đơn.' });
  } catch (err) {
    console.error('Lỗi từ chối đơn:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi từ chối đơn.') });
  }
});

// ------------------------------------------------------------------ cấu hình nhận tiền
router.get('/thanh-toan-cau-hinh', requireAdminOnly, async (req, res) => {
  try {
    res.json({ cau_hinh: await docCaiDat(KHOA_CAU_HINH) });
  } catch (err) {
    console.error('Lỗi đọc cấu hình:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải cấu hình.') });
  }
});

router.put('/thanh-toan-cau-hinh', requireAdminOnly, async (req, res) => {
  try {
    const v = req.body || {};
    // Số tài khoản: chỉ chữ và số. Người ta hay dán kèm khoảng trắng/dấu chấm từ app ngân hàng,
    // mà chuỗi đó đi thẳng vào URL sinh mã QR — sai một ký tự là QR trỏ vào tài khoản không tồn tại.
    if (v.bank_stk != null) v.bank_stk = String(v.bank_stk).replace(/[^0-9A-Za-z]/g, '');
    if (v.bank_bin != null) v.bank_bin = String(v.bank_bin).replace(/\D/g, '');
    if (v.bank_bin && !/^\d{6}$/.test(v.bank_bin)) {
      return res.status(400).json({ error: 'Mã BIN ngân hàng phải là 6 chữ số (vd 970436 = Vietcombank).' });
    }
    if (v.lien_he_admin && !/^https?:\/\//i.test(String(v.lien_he_admin))) {
      return res.status(400).json({ error: 'Link liên hệ phải bắt đầu bằng http:// hoặc https://' });
    }
    await ghiCaiDat(v, KHOA_CAU_HINH);
    res.json({ message: 'Đã lưu cấu hình nhận tiền.', cau_hinh: await docCaiDat(KHOA_CAU_HINH) });
  } catch (err) {
    console.error('Lỗi lưu cấu hình:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi lưu cấu hình.') });
  }
});

export default router;
