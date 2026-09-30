// =============================================================
// PUSH THÔNG BÁO (Web Push) — 2026-09-28
// =============================================================
// Gửi thông báo lên điện thoại / máy tính kể cả khi KHÔNG mở app: trình duyệt đã bấm "Bật thông
// báo" để lại một địa chỉ push (bảng `push_dang_ky`); server mã hoá nội dung bằng khoá VAPID rồi
// gửi tới dịch vụ push của trình duyệt (Google / Mozilla / Apple), dịch vụ đó đẩy xuống máy.
//
// Khoá VAPID nằm ở biến môi trường VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY / VAPID_SUBJECT.
// Thiếu khoá thì mọi hàm ở đây IM LẶNG không làm gì — hệ thống chạy như trước khi có push.
// ⚠️ ĐỔI KHOÁ = mọi đăng ký cũ mất hiệu lực, người dùng phải bấm "Bật thông báo" lại.
//
// NGUYÊN TẮC (cùng lối baoHocSinh / ghiNhatKy): push là việc PHỤ — KHÔNG BAO GIỜ ném lỗi ra ngoài.
// Nhân viên lưu ngày phỏng vấn mà nhận 500 vì dịch vụ push của Apple chậm là không chấp nhận được.
import webpush from 'web-push';
import pool from '../config/db.js';

let daCauHinh = null;   // null = chưa thử, true/false = đã thử
function cauHinh() {
  if (daCauHinh !== null) return daCauHinh;
  const { VAPID_PUBLIC_KEY: pub, VAPID_PRIVATE_KEY: pri, VAPID_SUBJECT: sub } = process.env;
  if (!pub || !pri) { daCauHinh = false; return false; }
  try {
    webpush.setVapidDetails(sub || 'mailto:admin@itaiwan.vn', pub, pri);
    daCauHinh = true;
  } catch (err) {
    console.error('Khoá VAPID không hợp lệ — tắt push:', err.message);
    daCauHinh = false;
  }
  return daCauHinh;
}

/** Push đã bật ở server chưa (có khoá VAPID hợp lệ). */
export const pushBat = () => cauHinh();
/** Khoá công khai trình duyệt cần để đăng ký. */
export const khoaCongKhai = () => (cauHinh() ? process.env.VAPID_PUBLIC_KEY : null);

/** Bảng chưa có (chưa chạy migration-push.sql) — coi như chưa ai đăng ký, không báo lỗi. */
const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/**
 * Gửi một thông báo tới MỌI thiết bị của các người dùng này.
 *
 * @param {number|number[]} userIds
 * @param {{ tieuDe: string, noiDung?: string, url?: string, the?: string }} tb
 *   the (tag): cùng tag thì thông báo sau THAY thông báo trước trên máy (vd. nhắc học mỗi ngày),
 *   không chồng thành chục cái.
 * @returns {Promise<number>} số thiết bị gửi thành công
 */
export async function guiPush(userIds, tb) {
  if (!cauHinh()) return 0;
  const ids = [...new Set([].concat(userIds || []).map(Number).filter((x) => Number.isInteger(x) && x > 0))];
  if (!ids.length || !tb?.tieuDe) return 0;
  try {
    const [ds] = await pool.query(
      `SELECT id, endpoint, p256dh, auth FROM push_dang_ky WHERE user_id IN (${ids.map(() => '?').join(',')})`, ids);
    if (!ds.length) return 0;
    const payload = JSON.stringify({
      tieu_de: String(tb.tieuDe).slice(0, 120),
      noi_dung: tb.noiDung ? String(tb.noiDung).slice(0, 300) : '',
      url: tb.url || '/',
      the: tb.the || undefined,
    });
    const kq = await Promise.allSettled(ds.map((d) => webpush.sendNotification(
      { endpoint: d.endpoint, keys: { p256dh: d.p256dh, auth: d.auth } }, payload,
      // TTL 1 ngày: máy tắt nguồn cả ngày thì bỏ, không dồn thông báo cũ lúc mở máy.
      { TTL: 86400, timeout: 8000, urgency: 'normal' },
    )));
    const ok = []; const chet = [];
    kq.forEach((r, i) => {
      if (r.status === 'fulfilled') ok.push(ds[i].id);
      // 404 / 410: người dùng đã tắt quyền, gỡ app hoặc đăng ký hết hạn -> xoá, lần sau khỏi gửi.
      else if ([404, 410].includes(r.reason?.statusCode)) chet.push(ds[i].id);
      else console.error('Gửi push lỗi:', r.reason?.statusCode || '', r.reason?.body || r.reason?.message);
    });
    if (chet.length) await pool.query(`DELETE FROM push_dang_ky WHERE id IN (${chet.map(() => '?').join(',')})`, chet);
    if (ok.length) await pool.query(`UPDATE push_dang_ky SET gui_ok_luc = NOW() WHERE id IN (${ok.map(() => '?').join(',')})`, ok);
    return ok.length;
  } catch (err) {
    if (!chuaCoBang(err)) console.error('Lỗi push:', err.message);
    return 0;
  }
}

/** Gửi cho mọi người có vai trò này (vd. mọi quản trị khi có tài khoản chờ duyệt). */
export async function guiPushVaiTro(vaiTro, tb) {
  if (!cauHinh()) return 0;
  try {
    const ds = [].concat(vaiTro);
    const [u] = await pool.query(`SELECT id FROM users WHERE role IN (${ds.map(() => '?').join(',')})`, ds);
    return guiPush(u.map((x) => x.id), tb);
  } catch (err) {
    console.error('Lỗi push theo vai trò:', err.message);
    return 0;
  }
}

/**
 * Gọi push mà KHÔNG bắt request chính phải đợi dịch vụ push (Apple/Google có lúc mất vài giây).
 * Trên VPS tiến trình Node sống liên tục nên việc gửi chạy nốt sau khi đã trả response.
 */
export function guiNgam(p) {
  Promise.resolve(p).catch((e) => console.error('Lỗi push chạy ngầm:', e?.message));
}
