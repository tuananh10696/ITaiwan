// =============================================================
// GIỚI HẠN THIẾT BỊ ĐĂNG NHẬP — chống chia sẻ tài khoản (2026-09-15)
//
// Chính sách (chủ dự án chốt 2026-09-15):
//   • tối đa 2 thiết bị / tài khoản;
//   • thiết bị thứ 2 -> vẫn vào được, kèm cảnh báo "đã dùng hết 2/2";
//   • thiết bị thứ 3 -> CHẶN đăng nhập + ghi `device_alerts` để admin xử lý.
//
// ⚠️ ĐÂY LÀ LỚP CHỐNG CHIA SẺ, KHÔNG PHẢI LỚP XÁC THỰC. `device_id` do client sinh và lưu ở
// localStorage nên người dùng sửa hoặc xoá được. Nhưng sửa thì thành "máy mới" và lại tính vào
// hạn mức, còn xoá thì chính họ phải đăng nhập lại — nên nó vẫn làm đúng việc cần làm: khiến
// việc chia một tài khoản cho cả lớp trở nên phiền tới mức không đáng. Đừng bao giờ dùng
// `device_id` để quyết định QUYỀN — quyền vẫn là JWT + entitlements.
//
// Thiếu bảng (chưa chạy migration-thiet-bi.sql) thì mọi hàm ở đây im lặng cho qua: một lần deploy
// thiếu migration không được phép chặn toàn bộ học viên đăng nhập.
import pool from '../config/db.js';

/** Tối đa bao nhiêu thiết bị cho một tài khoản học viên. */
export const TRAN_THIET_BI = 2;

/** Nhân sự dạy trên nhiều máy (trường, nhà, điện thoại) — chặn họ không bảo vệ thêm được gì. */
const MIEN_TRU = new Set(['admin', 'org_admin', 'teacher']);

function thieuBang(err) {
  return err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');
}

/** IP thật sau proxy của Vercel — phần tử đầu của x-forwarded-for là phần không giả được. */
export function ipCuaReq(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff) return xff.split(',')[0].trim().slice(0, 45);
  return String(req.headers['x-real-ip'] || req.ip || req.socket?.remoteAddress || '').slice(0, 45);
}

/**
 * Tên dễ đọc suy từ User-Agent — để học viên nhận ra máy nào là máy nào khi admin hỏi
 * "cái Chrome trên Windows này có phải của em không?".
 * Cố ý thô sơ: không cần thư viện phân tích UA cho một nhãn hiển thị.
 */
export function tenThietBi(ua = '') {
  const s = String(ua);
  const tb = /iPhone/i.test(s) ? 'iPhone'
    : /iPad/i.test(s) ? 'iPad'
    : /Android/i.test(s) ? 'Android'
    : /Windows/i.test(s) ? 'Windows'
    : /Macintosh|Mac OS/i.test(s) ? 'máy Mac'
    : /Linux/i.test(s) ? 'Linux' : 'thiết bị lạ';
  // Thứ tự quan trọng: Edge và Chrome đều chứa chuỗi "Chrome", Safari nằm trong UA của cả hai.
  const tr = /Edg\//i.test(s) ? 'Edge'
    : /OPR\/|Opera/i.test(s) ? 'Opera'
    : /Chrome\//i.test(s) ? 'Chrome'
    : /Firefox\//i.test(s) ? 'Firefox'
    : /Safari\//i.test(s) ? 'Safari' : 'ứng dụng';
  return `${tr} trên ${tb}`;
}

/** Mã thiết bị hợp lệ: chuỗi client sinh, chỉ chữ/số/gạch. Không hợp lệ -> coi như không có. */
function chuanMa(x) {
  const s = String(x || '').trim();
  return /^[A-Za-z0-9_-]{8,64}$/.test(s) ? s : null;
}

/**
 * Ghi nhận một lần đăng nhập và quyết định có cho vào không.
 *
 * @returns {Promise<{cho:boolean, so:number, tran:number, canhBao:string|null, ds?:Array}>}
 *   cho=false -> route login phải từ chối và KHÔNG phát token.
 */
export async function ghiNhanDangNhap({ userId, vaiTro, deviceId, userAgent, ip }) {
  const ma = chuanMa(deviceId);
  const ten = tenThietBi(userAgent);

  // Không có mã thiết bị: client cũ chưa cập nhật, hoặc gọi bằng curl/script. Cho qua để không
  // khoá người dùng ngoài app chỉ vì họ chưa tải bản mới — nhưng cũng không ghi nhận gì.
  if (!ma) return { cho: true, so: 0, tran: TRAN_THIET_BI, canhBao: null };
  if (MIEN_TRU.has(vaiTro)) return { cho: true, so: 0, tran: TRAN_THIET_BI, canhBao: null };

  try {
    const [dang] = await pool.query(
      'SELECT device_id FROM user_devices WHERE user_id = ? AND da_go = FALSE', [userId]);
    const daBiet = dang.some((d) => d.device_id === ma);

    if (daBiet) {
      await pool.query(
        `UPDATE user_devices SET lan_cuoi = NOW(), so_lan = so_lan + 1, ip_lan_cuoi = ?, user_agent = ?
          WHERE user_id = ? AND device_id = ?`, [ip, String(userAgent || '').slice(0, 255), userId, ma]);
      return { cho: true, so: dang.length, tran: TRAN_THIET_BI, canhBao: null };
    }

    // Thiết bị MỚI mà đã đủ hạn mức -> chặn, và để lại dấu vết cho admin.
    if (dang.length >= TRAN_THIET_BI) {
      await pool.query(
        `INSERT INTO device_alerts (user_id, device_id, ten, user_agent, ip, so_dang_co)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, ma, ten, String(userAgent || '').slice(0, 255), ip, dang.length]);
      const [ds] = await pool.query(
        `SELECT ten, lan_cuoi FROM user_devices WHERE user_id = ? AND da_go = FALSE ORDER BY lan_cuoi DESC`,
        [userId]);
      return { cho: false, so: dang.length, tran: TRAN_THIET_BI, canhBao: null, ds };
    }

    await pool.query(
      `INSERT INTO user_devices (user_id, device_id, ten, user_agent, ip_lan_dau, ip_lan_cuoi)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE lan_cuoi = NOW(), so_lan = so_lan + 1, da_go = FALSE,
                               go_luc = NULL, go_boi = NULL, ip_lan_cuoi = VALUES(ip_lan_cuoi)`,
      [userId, ma, ten, String(userAgent || '').slice(0, 255), ip, ip]);

    const so = dang.length + 1;
    // Cảnh báo ở thiết bị CUỐI CÙNG còn trống, để học viên biết trước khi bị chặn ở lần sau —
    // báo sau khi đã chặn thì họ chỉ thấy một cánh cửa đóng mà không hiểu vì sao.
    const canhBao = so >= TRAN_THIET_BI
      ? `Bạn đang dùng ${so}/${TRAN_THIET_BI} thiết bị cho phép. Đăng nhập trên thiết bị thứ ${TRAN_THIET_BI + 1} sẽ bị từ chối — hãy liên hệ quản trị viên nếu bạn cần đổi máy.`
      : null;
    return { cho: true, so, tran: TRAN_THIET_BI, canhBao };
  } catch (err) {
    if (thieuBang(err)) {
      console.warn('⚠️  Chưa có bảng user_devices — bỏ qua giới hạn thiết bị. Chạy npm run db:migrate:prod');
      return { cho: true, so: 0, tran: TRAN_THIET_BI, canhBao: null };
    }
    // Lỗi DB thật: KHÔNG chặn đăng nhập. Một trục trặc ở lớp chống chia sẻ không được phép khoá
    // cửa của học viên đã trả tiền.
    console.error('Lỗi ghi nhận thiết bị:', err);
    return { cho: true, so: 0, tran: TRAN_THIET_BI, canhBao: null };
  }
}

/** Thiết bị đang hoạt động của một tài khoản — cho trang Tài khoản và cho admin. */
export async function dsThietBi(userId) {
  try {
    const [r] = await pool.query(
      `SELECT id, device_id, ten, ip_lan_cuoi, lan_dau, lan_cuoi, so_lan
         FROM user_devices WHERE user_id = ? AND da_go = FALSE ORDER BY lan_cuoi DESC`, [userId]);
    return r;
  } catch (err) {
    if (thieuBang(err)) return [];
    throw err;
  }
}

/** Gỡ một thiết bị (admin, hoặc chính chủ tài khoản). Giữ hàng để còn tra lịch sử. */
export async function goThietBi(userId, id, boiAi) {
  try {
    const [r] = await pool.query(
      'UPDATE user_devices SET da_go = TRUE, go_luc = NOW(), go_boi = ? WHERE id = ? AND user_id = ?',
      [boiAi, id, userId]);
    return r.affectedRows > 0;
  } catch (err) {
    if (thieuBang(err)) return false;
    throw err;
  }
}
