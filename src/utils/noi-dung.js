// =============================================================
// NẠP NỘI DUNG BÀI HỌC QUA API CÓ KIỂM QUYỀN (2026-09-09)
//
// Trước đây client fetch thẳng `public/data/**`. Nay file đó không còn được publish (plugin
// `tw-gate-noi-dung` trong vite.config.js loại khỏi bản build) và mọi bài đi qua
// `/api/noi-dung/*` — xem server/routes/noi-dung.js.
//
// Quy tắc "bài nào mở" nằm ở `shared/noi-dung-mo.js`, DÙNG CHUNG với server. Đừng chép lại quy
// tắc ở đây: lệch một nhịp là giao diện mở khoá một bài mà server vẫn chặn (hoặc ngược lại).
import { apiBase } from './env.js';
import { taiNguyenMo } from '../../shared/noi-dung-mo.js';

/** Server trả 402 = nội dung trả phí, chưa có quyền. Mang theo mã sản phẩm cần mua. */
export class LoiCanQuyen extends Error {
  constructor(data) {
    super(data?.error || 'Nội dung này thuộc phần trả phí.');
    this.name = 'LoiCanQuyen';
    this.canQuyen = true;
    this.bo = data?.bo || null;
    this.sanPham = data?.san_pham || null;
    this.soBaiMo = data?.so_bai_mo || 3;
  }
}

/**
 * Tải một tài nguyên bài học.
 * @param {string} duong  đường dẫn sau /api, vd '/noi-dung/giaotrinh/hsk/hsk3-5'
 * @param {string} loai   'giaotrinh' | 'luyentap' | 'dich' | 'dethi'
 * @param {string} id     khoá bài / mã đề — để biết có phải gắn token không
 * @returns {Promise<object|null>} null = không có file (bài chưa có dữ liệu), KHÔNG phải lỗi quyền
 * @throws {LoiCanQuyen} khi bị chặn vì chưa mua
 */
export async function napTaiNguyen(duong, loai, id) {
  const headers = {};
  // CỐ Ý không gắn token cho bài MỞ: có header Authorization là CDN không dùng lại được bản đã
  // cache, mà bài mở chính là thứ khách vãng lai tải nhiều nhất. Bài trả phí thì ngược lại —
  // phải có token, và server đánh dấu `private` để không lọt vào cache dùng chung.
  if (!taiNguyenMo(loai, id)) {
    const token = (() => { try { return localStorage.getItem('tw_token'); } catch { return null; } })();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const r = await fetch(`${apiBase()}${duong}`, { headers });
  if (r.status === 402) throw new LoiCanQuyen(await r.json().catch(() => null));
  if (!r.ok) return null;
  return r.json();
}

/**
 * Tải một file GỘP mà server đã LỌC theo quyền (bài văn hoá, gợi ý thanh điệu).
 *
 * Khác `napTaiNguyen`: ở đây một response chứa NHIỀU bài với mức quyền khác nhau, nên luôn phải
 * gắn token — không có token thì server chỉ trả về phần mở, và học viên đã mua sẽ thấy thiếu bài
 * mà không hiểu vì sao. Server đánh dấu `private` cho bản có token nên nó không lọt cache chung.
 *
 * Trả `{}` khi lỗi: hai file này là nội dung PHỤ (bài đọc thêm, gợi ý phiên âm) — hỏng thì phần
 * đó hiện "chưa có nội dung", không được làm vỡ cả trang.
 */
export async function napGopTheoQuyen(duong) {
  const headers = {};
  const token = (() => { try { return localStorage.getItem('tw_token'); } catch { return null; } })();
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const r = await fetch(`${apiBase()}${duong}`, { headers });
    return r.ok ? await r.json() : {};
  } catch {
    return {};
  }
}
