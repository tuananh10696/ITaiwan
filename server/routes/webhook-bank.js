// =============================================================
// WEBHOOK NGÂN HÀNG — tự duyệt đơn chuyển khoản (2026-09-16)
// =============================================================
// Duyệt thanh toán đang 100% thủ công (4.42): admin mở app ngân hàng, đối chiếu từng đơn rồi bấm
// Duyệt. Bán 20 đơn/ngày là ngồi duyệt cả ngày, và học viên chuyển tiền lúc 11 giờ đêm phải chờ
// tới sáng mới vào học được.
//
// Nay dịch vụ đọc biến động số dư (SePay / Casso) gọi vào đây mỗi khi có tiền về. Điểm nối đã
// được chuẩn bị sẵn từ 4.42: ghi `payments` rồi gọi `capQuyen()`.
//
// ⚠️ CHƯA BẬT cho tới khi chủ dự án đăng ký dịch vụ và đặt `BANK_WEBHOOK_KEY`. Thiếu biến thì
// route TỪ CHỐI (503) — một webhook mở toang là ai cũng tự cấp khoá học cho mình.
//
// NGUYÊN TẮC: chỉ tự duyệt khi CHẮC CHẮN. Mọi trường hợp mơ hồ (không tìm ra đơn, số tiền lệch,
// nhiều đơn cùng khớp) đều để nguyên trong hàng chờ cho người duyệt tay — tự đoán ở đây nghĩa là
// mở khoá cho người chưa trả đủ tiền, hoặc tệ hơn, cho nhầm người.
import { Router } from 'express';
import pool from '../config/db.js';
import { capQuyen } from '../utils/quyen-noi-dung.js';

const router = Router();

/**
 * Chuẩn hoá nội dung chuyển khoản để so khớp.
 * Nhiều app ngân hàng LƯỢC BỎ `@` và `.` khỏi nội dung (a@b.com -> abcom) và đổi hoa/thường,
 * nên không so nguyên văn được — 4.42 đã ghi nhận điều này khi chọn định dạng `ma_giao_dich`.
 */
const chuan = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Bóc giao dịch từ payload. SePay và Casso đặt tên trường khác nhau; nhận cả hai để đổi nhà cung
 * cấp không phải sửa code. Chỉ quan tâm giao dịch TIỀN VÀO.
 */
function bocGiaoDich(b) {
  if (!b || typeof b !== 'object') return null;
  const soTien = Number(b.transferAmount ?? b.amount ?? b.creditAmount ?? 0);
  const noiDung = b.content ?? b.description ?? b.transferContent ?? '';
  const ma = b.referenceCode ?? b.tid ?? b.id ?? b.transactionId ?? null;
  const loai = String(b.transferType ?? b.type ?? 'in').toLowerCase();
  // Tiền RA (chuyển đi) cũng được gửi tới webhook — duyệt theo nó là mở khoá mỗi khi mình trả tiền ai đó.
  if (soTien <= 0 || loai === 'out' || loai === 'debit') return null;
  return { soTien, noiDung: String(noiDung), maNganHang: ma ? String(ma) : null };
}

/**
 * POST /api/webhook/bank — nhận biến động số dư.
 *
 * Xác thực bằng `Authorization: Apikey <BANK_WEBHOOK_KEY>` (định dạng SePay dùng) hoặc
 * `Bearer <key>`. Luôn trả 200 kèm mô tả việc đã làm: dịch vụ webhook thường RETRY khi nhận mã
 * lỗi, mà retry một giao dịch đã xử lý xong chỉ tạo thêm nhiễu.
 */
router.post('/bank', async (req, res) => {
  const key = process.env.BANK_WEBHOOK_KEY;
  if (!key) return res.status(503).json({ error: 'Webhook ngân hàng chưa được bật.' });

  const h = String(req.headers.authorization || '');
  if (h !== `Apikey ${key}` && h !== `Bearer ${key}`) {
    return res.status(401).json({ error: 'Sai khoá webhook.' });
  }

  const gd = bocGiaoDich(req.body);
  if (!gd) return res.json({ xu_ly: false, ly_do: 'Không phải giao dịch tiền vào hợp lệ.' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Chỉ xét đơn ĐANG CHỜ. Khoá hàng để hai webhook cùng lúc (hoặc webhook + admin bấm tay)
    // không cùng duyệt một đơn.
    const [dons] = await conn.query(
      `SELECT id, user_id, product_ma, so_tien, ma_giao_dich
         FROM payments
        WHERE trang_thai = 'cho' AND ma_giao_dich IS NOT NULL
          AND created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY)
        ORDER BY created_at DESC FOR UPDATE`,
    );

    const nd = chuan(gd.noiDung);
    const khop = dons.filter((d) => {
      const m = chuan(d.ma_giao_dich);
      return m.length >= 8 && nd.includes(m);
    });

    const ghiLai = async (ket) => {
      await conn.commit();
      // Ghi log để đối chiếu khi có khiếu nại "em chuyển rồi mà chưa mở khoá".
      console.log(`[webhook-bank] ${gd.soTien}đ · "${gd.noiDung.slice(0, 60)}" -> ${ket.ly_do}`);
      res.json({ ...ket, so_tien: gd.soTien });
    };

    if (!khop.length) {
      return ghiLai({ xu_ly: false, ly_do: 'Không tìm thấy đơn nào khớp nội dung — để admin duyệt tay.' });
    }
    if (khop.length > 1) {
      // Hai đơn cùng khớp thì không có cách nào biết chắc tiền cho đơn nào.
      return ghiLai({ xu_ly: false, ly_do: `${khop.length} đơn cùng khớp — để admin duyệt tay.` });
    }

    const don = khop[0];
    // Thiếu tiền thì KHÔNG mở khoá. Thừa cũng không tự duyệt: có thể học viên chuyển gộp hai
    // khoá, mở một khoá rồi coi như xong là thiệt cho họ.
    if (Number(don.so_tien) !== gd.soTien) {
      return ghiLai({
        xu_ly: false, don_id: don.id,
        ly_do: `Số tiền lệch (đơn ${don.so_tien}đ, nhận ${gd.soTien}đ) — để admin duyệt tay.`,
      });
    }
    if (!don.product_ma) {
      return ghiLai({ xu_ly: false, don_id: don.id, ly_do: 'Đơn không gắn khoá học nào.' });
    }

    const [r] = await conn.query(
      `UPDATE payments SET trang_thai = 'thanh-cong', duyet_luc = NOW(), da_doc_luc = NULL,
              ghi_chu = ? WHERE id = ? AND trang_thai = 'cho'`,
      [`Tự duyệt qua webhook ngân hàng${gd.maNganHang ? ` · mã GD ${gd.maNganHang}` : ''}`, don.id],
    );
    if (!r.affectedRows) {
      return ghiLai({ xu_ly: false, don_id: don.id, ly_do: 'Đơn vừa được xử lý ở nơi khác.' });
    }

    // Cùng thứ tự với đường duyệt tay (thanh-toan-admin.js): cấp quyền SAU khi update và TRƯỚC
    // commit — hỏng thì rollback trả đơn về hàng chờ. Quyền thừa còn thu hồi được, mất tiền mà
    // không có quyền thì không.
    const entitlementId = await capQuyen({
      userId: don.user_id, productMa: don.product_ma, nguon: 'mua',
      ghiChu: `Webhook ngân hàng — đơn #${don.id}`,
    });
    await conn.query('UPDATE payments SET entitlement_id = ? WHERE id = ?', [entitlementId, don.id]);

    await conn.commit();
    console.log(`[webhook-bank] ✅ tự duyệt đơn #${don.id} · ${gd.soTien}đ · ${don.product_ma}`);
    res.json({ xu_ly: true, don_id: don.id, entitlement_id: entitlementId, so_tien: gd.soTien });
  } catch (err) {
    await conn.rollback().catch(() => {});
    console.error('Lỗi webhook ngân hàng:', err);
    // 500 để dịch vụ retry — ở đây lỗi là của mình, giao dịch vẫn cần được xử lý.
    res.status(500).json({ error: 'Lỗi xử lý webhook.' });
  } finally {
    conn.release();
  }
});

export default router;
