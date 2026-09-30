// =============================================================
// ĐĂNG KÝ NHẬN PUSH — /api/push/*   (2026-09-28)
// =============================================================
// Dùng chung cho cổng học viên và cổng quản trị: mỗi trình duyệt bấm "Bật thông báo" thì gửi
// `PushSubscription` lên đây, gắn với tài khoản đang đăng nhập. Nội dung gửi ở server/utils/push.js.
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { pushBat, khoaCongKhai, guiPush } from '../utils/push.js';

const router = Router();

/** Rút gọn User-Agent thành "Chrome · Android" để người dùng nhận ra máy. */
function tenThietBi(ua = '') {
  const tb = /iPhone|iPad/.test(ua) ? 'iPhone/iPad' : /Android/.test(ua) ? 'Android'
    : /Mac OS X/.test(ua) ? 'macOS' : /Windows/.test(ua) ? 'Windows' : /Linux/.test(ua) ? 'Linux' : 'Khác';
  const tr = /Edg\//.test(ua) ? 'Edge' : /Firefox\//.test(ua) ? 'Firefox'
    : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Trình duyệt';
  return `${tr} · ${tb}`;
}

// Dịch vụ push của các trình duyệt: Chrome/Edge Android/Samsung/Opera -> FCM, Firefox -> Mozilla,
// Safari (macOS + iPhone) -> Apple, Edge Windows -> WNS.
const HOST_PUSH = [/\.googleapis\.com$/, /\.mozilla\.com$/, /\.mozaws\.net$/, /\.push\.apple\.com$/, /\.notify\.windows\.com$/];

/**
 * Endpoint phải là HTTPS của một DỊCH VỤ PUSH THẬT — không thì ai có tài khoản cũng khiến server đi
 * gọi một địa chỉ tuỳ ý (kể cả địa chỉ nội bộ của VPS). Ngoài production cho thêm https://localhost
 * để bộ test (tests/push.test.mjs) dựng dịch vụ push giả.
 */
function endpointHopLe(ep) {
  try {
    const u = new URL(ep);
    if (u.protocol !== 'https:') return false;
    if (HOST_PUSH.some((re) => re.test(u.hostname))) return true;
    return process.env.NODE_ENV !== 'production' && u.hostname === 'localhost';
  } catch { return false; }
}

/** Khoá công khai + push có đang bật ở server không. Không cần đăng nhập. */
router.get('/khoa', (req, res) => {
  res.json({ bat: pushBat(), khoa: khoaCongKhai() });
});

/** Đăng ký (hoặc cập nhật) thiết bị này cho tài khoản đang đăng nhập. */
router.post('/dang-ky', requireAuth, async (req, res) => {
  if (!pushBat()) return res.status(503).json({ error: 'Máy chủ chưa bật thông báo đẩy.' });
  const s = req.body?.subscription || req.body || {};
  const endpoint = String(s.endpoint || '');
  const p256dh = String(s.keys?.p256dh || '');
  const auth = String(s.keys?.auth || '');
  if (!endpointHopLe(endpoint) || endpoint.length > 700 || !p256dh || p256dh.length > 200 || !auth || auth.length > 100) {
    return res.status(400).json({ error: 'Thông tin đăng ký thông báo không hợp lệ.' });
  }
  try {
    // Trùng endpoint = cùng trình duyệt -> chuyển sang tài khoản đang đăng nhập (đổi người dùng
    // trên cùng máy thì máy đó nhận thông báo của người MỚI, không phải người cũ).
    await pool.query(
      `INSERT INTO push_dang_ky (user_id, endpoint, p256dh, auth, thiet_bi) VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), p256dh = VALUES(p256dh), auth = VALUES(auth),
                               thiet_bi = VALUES(thiet_bi)`,
      [req.userId, endpoint, p256dh, auth, tenThietBi(req.headers['user-agent'])]
    );
    res.status(201).json({ message: 'Đã bật thông báo trên thiết bị này.' });
  } catch (err) {
    console.error('Lỗi đăng ký push:', err);
    res.status(500).json({ error: err.code === 'ER_NO_SUCH_TABLE'
      ? 'DB chưa có bảng thông báo đẩy. Chạy migration rồi thử lại.' : 'Không bật được thông báo.' });
  }
});

/** Tắt thông báo trên thiết bị này. Chỉ xoá được đăng ký của CHÍNH MÌNH. */
router.post('/huy', requireAuth, async (req, res) => {
  const endpoint = String(req.body?.endpoint || '');
  if (!endpoint) return res.status(400).json({ error: 'Thiếu thông tin thiết bị.' });
  try {
    await pool.query('DELETE FROM push_dang_ky WHERE endpoint = ? AND user_id = ?', [endpoint, req.userId]);
    res.json({ message: 'Đã tắt thông báo trên thiết bị này.' });
  } catch (err) {
    console.error('Lỗi huỷ push:', err);
    res.status(500).json({ error: 'Không tắt được thông báo.' });
  }
});

/** Gửi một thông báo thử tới mọi thiết bị của chính mình — để người dùng biết đã bật đúng. */
router.post('/thu', requireAuth, async (req, res) => {
  const n = await guiPush(req.userId, {
    tieuDe: 'ITaiwan', noiDung: 'Thông báo đã được bật trên thiết bị này.', the: 'thu-push',
    url: req.body?.url === '/admin.html' ? '/admin.html' : '/',
  });
  if (!n) return res.status(404).json({ error: 'Chưa có thiết bị nào nhận được thông báo.' });
  res.json({ message: `Đã gửi thử tới ${n} thiết bị.`, so_thiet_bi: n });
});

export default router;
