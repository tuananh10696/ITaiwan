// =============================================================
// THANH TOÁN CHUYỂN KHOẢN + DUYỆT TAY — 2026-09-09
//
// Luồng (chốt với chủ dự án 2026-09-09):
//   học viên chọn khoá -> tạo ĐƠN (nội dung CK = `<email> - <tên khoá>`) -> quét VietQR / chuyển khoản
//   -> tải ảnh biên lai lên -> ĐƠN vào hàng chờ -> quản trị đối chiếu với app ngân hàng rồi bấm
//   Duyệt -> `capQuyen()` chạy -> học viên mở được khoá + nhận thông báo ở chuông.
//
// ⚠️ VÌ SAO KHÔNG ĐỂ MÁY TỰ ĐỘNG MỞ KHOÁ THEO ẢNH (đã cân nhắc và bỏ):
// ảnh biên lai chứng minh "có ai đó từng chuyển khoản", KHÔNG chứng minh "tài khoản này vừa trả
// tiền cho mình". Ảnh bill giả có sẵn hàng loạt công cụ tạo, và một ảnh thật gửi được cho nhiều
// tài khoản. OCR đọc ảnh giả y hệt ảnh thật nên không lấp được lỗ hổng đó, chỉ thêm phụ thuộc.
// Quyết định mở khoá vì vậy luôn do CON NGƯỜI bấm — xem `POST /admin/thanh-toan/:id/duyet`.
// Muốn tự động hoá THẬT thì đường đúng là webhook ngân hàng (SePay/Casso): ngân hàng báo khi
// tiền thật vào tài khoản, đối chiếu `ma_giao_dich` trong nội dung chuyển khoản rồi gọi
// `capQuyen()`. CHƯA làm ở đợt này (cần chủ dự án đăng ký dịch vụ + liên kết tài khoản).
//
// File này CHỈ có phần của học viên (tạo đơn, gửi biên lai, xem đơn của mình) — mọi route đều
// lọc theo `req.userId` nên tự an toàn. Phần DUYỆT nằm ở `server/routes/thanh-toan-admin.js`,
// đi qua tầng phân quyền chung; đừng đặt route duyệt vào đây (bài học CLAUDE.md 4.22).
//
// Bảng dùng: `payments` (đã có từ migration-to-chuc-quyen, bổ sung cột ở migration-thanh-toan).
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { docCaiDat } from '../utils/cai-dat.js';

const router = Router();

/** Đơn chờ quá lâu thì coi như bỏ — dọn để người học tạo lại đơn mới với mã khác. */
const HAN_DON_GIO = 72;

/** Ảnh biên lai: client đã nén; chặn ở đây để không ai đẩy 16MB base64 vào DB. */
const ANH_TOI_DA = 1_500_000;

/** Bảng chưa có (chưa chạy migration) — nói đúng nguyên nhân thay vì "Lỗi hệ thống". */
function loiThieuBang(err, macDinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'Hệ thống chưa chạy migration thanh toán. Báo quản trị viên chạy `npm run db:migrate:prod`.';
  }
  return macDinh;
}

/**
 * Tên khoá rút gọn, KHÔNG DẤU — phần sau của nội dung chuyển khoản.
 * Suy thẳng từ mã sản phẩm nên thêm khoá mới là tự có tên, không phải bảo trì bảng thứ hai.
 *   kh-duongdai-q1 -> 'duong dai q1'   kh-hsk-c2 -> 'hsk cap 2'   bo-thi-thu -> 'thi thu'
 */
const TEN_BO_CK = { duongdai: 'duong dai', thoidai: 'thoi dai', hsk: 'hsk' };
export function tenKhoaCK(productMa) {
  const m = /^kh-(duongdai|thoidai|hsk)-([qc])(\d+)$/.exec(String(productMa || ''));
  if (!m) return productMa === 'bo-thi-thu' ? 'thi thu' : String(productMa || '').replace(/-/g, ' ');
  return `${TEN_BO_CK[m[1]]} ${m[2] === 'c' ? 'cap ' : 'q'}${m[3]}`;
}

/**
 * Nội dung chuyển khoản — theo yêu cầu chủ dự án 2026-09-11: `<email> - <tên khoá>`.
 *   vd  hocvien@gmail.com - duong dai q1
 *
 * Cố ý KHÔNG dùng mã ngẫu nhiên nữa (bản cũ sinh `TENXXXXXX`): người học hay chép thiếu/sai một
 * mã vô nghĩa, còn email thì họ nhớ, và khi đối chiếu sao kê thì nhìn phát biết AI mua KHOÁ NÀO
 * mà không phải tra bảng.
 *
 * ⚠️ Nhiều app ngân hàng LƯỢC ký tự đặc biệt trong nội dung chuyển khoản, nên `@` và `.` có thể
 * biến mất khi tiền về ("a@b.com" -> "abcom"). Chấp nhận được vì phần chữ vẫn đọc ra đúng người;
 * đừng dựa vào chuỗi này để so khớp TỰ ĐỘNG — việc duyệt là do người nhìn và bấm (xem đầu file).
 *
 * Cắt 90 ký tự: trần nội dung chuyển khoản của phần lớn ngân hàng VN quanh 100-160 ký tự, để dư
 * cho phần ngân hàng tự chèn thêm.
 */
export function noiDungCK(email, productMa) {
  const mail = String(email || '').trim().toLowerCase();
  return `${mail} - ${tenKhoaCK(productMa)}`.slice(0, 90);
}

// ------------------------------------------------------------------ cấu hình
/**
 * Thông tin tài khoản nhận tiền + link liên hệ.
 * KHÔNG cần đăng nhập: trang bảng giá hiện được cho khách vãng lai. Không có gì bí mật ở đây —
 * số tài khoản vốn phải đưa cho người trả tiền.
 */
router.get('/cau-hinh', async (req, res) => {
  try {
    const c = await docCaiDat(['bank_bin', 'bank_ten', 'bank_stk', 'bank_chu_tk', 'lien_he_admin']);
    res.json({
      // Chưa cấu hình thì giao diện hiện lời mời liên hệ quản trị viên, KHÔNG hiện số tài khoản bịa.
      da_cau_hinh: !!(c.bank_stk && c.bank_bin),
      bank_bin: c.bank_bin || '',
      bank_ten: c.bank_ten || '',
      bank_stk: c.bank_stk || '',
      bank_chu_tk: c.bank_chu_tk || '',
      lien_he: c.lien_he_admin || '',
    });
  } catch (err) {
    console.error('Lỗi đọc cấu hình thanh toán:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải thông tin thanh toán.') });
  }
});

// ------------------------------------------------------------------ đơn của tôi
/** Đơn của chính mình. Lọc theo `req.userId` nên không cần thêm tầng phân quyền nào. */
router.get('/don', requireAuth, async (req, res) => {
  try {
    // CỐ Ý không SELECT `anh_bill`: cột MEDIUMTEXT base64, kéo cả danh sách về là vài MB cho một
    // màn hình chỉ hiện tên khoá và trạng thái. Ảnh lấy riêng ở `/don/:id/anh` khi thật sự cần xem.
    const [rows] = await pool.query(
      `SELECT p.id, p.ma_giao_dich, p.product_ma, p.so_tien, p.trang_thai, p.ghi_chu,
              p.created_at, p.anh_gui_luc, p.duyet_luc, p.da_doc_luc,
              (p.anh_bill IS NOT NULL) AS co_anh,
              pr.ten AS san_pham_ten, pr.nhom
         FROM payments p
         LEFT JOIN products pr ON pr.ma = p.product_ma
        WHERE p.user_id = ?
        ORDER BY p.created_at DESC
        LIMIT 50`,
      [req.userId],
    );
    res.json({ don: rows.map((r) => ({ ...r, co_anh: !!r.co_anh })) });
  } catch (err) {
    console.error('Lỗi tải đơn thanh toán:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải danh sách đơn.') });
  }
});

/** Ảnh biên lai của MỘT đơn — chỉ chủ đơn xem được (điều kiện user_id nằm ngay trong WHERE). */
router.get('/don/:id/anh', requireAuth, async (req, res) => {
  try {
    const [[r]] = await pool.query(
      'SELECT anh_bill FROM payments WHERE id = ? AND user_id = ?',
      [Number(req.params.id) || 0, req.userId],
    );
    if (!r || !r.anh_bill) return res.status(404).json({ error: 'Đơn chưa có ảnh chuyển khoản.' });
    res.json({ anh: r.anh_bill });
  } catch (err) {
    console.error('Lỗi tải ảnh biên lai:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tải ảnh.') });
  }
});

// ------------------------------------------------------------------ tạo đơn
/**
 * Tạo đơn cho một sản phẩm.
 * Đã có đơn CHỜ cho đúng sản phẩm đó thì TRẢ LẠI đơn cũ thay vì đẻ đơn mới: người học hay bấm
 * lại nút Mua, mỗi lần một mã đơn khác nhau thì lúc đối chiếu không biết mã nào là mã họ đã ghi.
 */
router.post('/don', requireAuth, async (req, res) => {
  try {
    const productMa = String(req.body?.product_ma || '').trim();
    if (!productMa) return res.status(400).json({ error: 'Thiếu mã sản phẩm.' });

    const [[sp]] = await pool.query(
      'SELECT ma, ten, gia, is_active FROM products WHERE ma = ?', [productMa]);
    if (!sp) return res.status(404).json({ error: 'Khoá học không tồn tại.' });
    if (!sp.is_active) return res.status(400).json({ error: 'Khoá học này đã ngừng bán.' });

    // Đã sở hữu rồi thì đừng cho trả tiền lần nữa.
    const [[daCo]] = await pool.query(
      `SELECT id FROM entitlements
        WHERE user_id = ? AND product_ma = ? AND trang_thai = 'hoat-dong'
          AND (het_han IS NULL OR het_han > NOW()) LIMIT 1`,
      [req.userId, productMa],
    );
    if (daCo) return res.status(409).json({ error: 'Bạn đã sở hữu khoá học này rồi.' });

    const [[cho]] = await pool.query(
      `SELECT id, ma_giao_dich, so_tien, trang_thai, created_at, (anh_bill IS NOT NULL) AS co_anh
         FROM payments
        WHERE user_id = ? AND product_ma = ? AND trang_thai = 'cho'
          AND created_at > DATE_SUB(NOW(), INTERVAL ? HOUR)
        ORDER BY created_at DESC LIMIT 1`,
      [req.userId, productMa, HAN_DON_GIO],
    );
    if (cho) {
      return res.json({ don: { ...cho, co_anh: !!cho.co_anh, product_ma: productMa, san_pham_ten: sp.ten }, moi: false });
    }

    // Chốt GIÁ tại thời điểm tạo đơn: đổi bảng giá sau đó không được làm lệch số tiền người học
    // đã chuyển, vì lúc duyệt còn phải đối chiếu đúng con số này với sao kê.
    const [[u]] = await pool.query('SELECT email FROM users WHERE id = ?', [req.userId]);
    const ma = noiDungCK(u?.email, productMa);
    const [r] = await pool.query(
      `INSERT INTO payments (user_id, product_ma, so_tien, cong, ma_giao_dich, trang_thai)
       VALUES (?, ?, ?, 'chuyen-khoan', ?, 'cho')`,
      [req.userId, productMa, sp.gia, ma],
    );
    res.status(201).json({
      don: {
        id: r.insertId, ma_giao_dich: ma, product_ma: productMa, san_pham_ten: sp.ten,
        so_tien: sp.gia, trang_thai: 'cho', co_anh: false,
      },
      moi: true,
    });
  } catch (err) {
    console.error('Lỗi tạo đơn thanh toán:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi tạo đơn thanh toán.') });
  }
});

// ------------------------------------------------------------------ gửi biên lai
/** Tải ảnh biên lai lên cho một đơn đang chờ. Gửi lại thì GHI ĐÈ ảnh cũ (chụp lại cho rõ hơn). */
router.post('/don/:id/anh', requireAuth, async (req, res) => {
  try {
    const anh = req.body?.anh;
    if (typeof anh !== 'string' || !anh.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Ảnh không hợp lệ. Hãy chọn ảnh chụp màn hình biên lai.' });
    }
    if (anh.length > ANH_TOI_DA) {
      return res.status(413).json({ error: 'Ảnh quá lớn. Hãy chụp lại hoặc chọn ảnh nhỏ hơn.' });
    }

    // Điều kiện quyền nằm NGAY TRONG câu UPDATE: đơn không phải của mình thì 0 dòng bị đổi.
    const [r] = await pool.query(
      `UPDATE payments SET anh_bill = ?, anh_gui_luc = NOW()
        WHERE id = ? AND user_id = ? AND trang_thai = 'cho'`,
      [anh, Number(req.params.id) || 0, req.userId],
    );
    if (!r.affectedRows) {
      return res.status(404).json({ error: 'Không tìm thấy đơn đang chờ. Đơn có thể đã được duyệt hoặc đã huỷ.' });
    }
    res.json({ message: 'Đã gửi biên lai. Quản trị viên sẽ đối chiếu và mở khoá cho bạn.' });
  } catch (err) {
    console.error('Lỗi lưu biên lai:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi lưu ảnh biên lai.') });
  }
});

/** Huỷ đơn của chính mình khi chưa được duyệt. Giữ bản ghi (đổi trạng thái) để còn tra lịch sử. */
router.delete('/don/:id', requireAuth, async (req, res) => {
  try {
    const [r] = await pool.query(
      `UPDATE payments SET trang_thai = 'that-bai', ghi_chu = 'Người học tự huỷ đơn.'
        WHERE id = ? AND user_id = ? AND trang_thai = 'cho'`,
      [Number(req.params.id) || 0, req.userId],
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy đơn đang chờ.' });
    res.json({ message: 'Đã huỷ đơn.' });
  } catch (err) {
    console.error('Lỗi huỷ đơn:', err);
    res.status(500).json({ error: loiThieuBang(err, 'Lỗi huỷ đơn.') });
  }
});

/** Đánh dấu đã xem kết quả duyệt — tắt chấm đỏ ở chuông thông báo. */
router.post('/don/:id/da-doc', requireAuth, async (req, res) => {
  try {
    await pool.query(
      'UPDATE payments SET da_doc_luc = NOW() WHERE id = ? AND user_id = ? AND da_doc_luc IS NULL',
      [Number(req.params.id) || 0, req.userId],
    );
    res.json({ message: 'ok' });
  } catch (err) {
    console.error('Lỗi đánh dấu đã đọc:', err);
    res.status(500).json({ error: 'Lỗi đánh dấu đã đọc.' });
  }
});

export default router;
