// =============================================================
// PUSH THÔNG BÁO — phía trình duyệt, DÙNG CHUNG cổng học viên + cổng quản trị (2026-09-28)
// =============================================================
// Không import gì của hai cổng: nơi gọi truyền vào hàm `goi(method, path, body)` gọi API bằng
// client của chính nó (cổng học viên: api/client.js; cổng quản trị: apiGet/apiPost). Nhờ vậy một
// bản duy nhất chạy cho cả hai, không chép quy tắc ra hai chỗ rồi lệch nhau.
//
// Điều kiện để nhận được push:
//   · HTTPS (hoặc localhost khi phát triển) + trình duyệt có Service Worker + PushManager;
//   · iPhone/iPad: iOS 16.4+ VÀ web đã "Thêm vào Màn hình chính" (Safari trong tab thường không có push);
//   · người dùng bấm Cho phép khi trình duyệt hỏi — bấm Chặn thì chỉ đổi lại được trong cài đặt trình duyệt.

const laIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);   // iPad đời mới tự nhận là Mac
const dangChayNhuApp = () => window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;

/**
 * Trạng thái push của thiết bị này:
 *   'bat'          đã bật, đang nhận
 *   'tat'          chưa bật (bấm được)
 *   'bi-chan'      người dùng đã chặn quyền thông báo cho trang
 *   'ios-can-cai'  iPhone/iPad chưa thêm vào màn hình chính
 *   'khong-ho-tro' trình duyệt không có push (hoặc không phải HTTPS)
 */
export async function trangThaiPush() {
  const coApi = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  if (!coApi) return laIos() && !dangChayNhuApp() ? 'ios-can-cai' : 'khong-ho-tro';
  if (!window.isSecureContext) return 'khong-ho-tro';
  if (Notification.permission === 'denied') return 'bi-chan';
  try {
    const reg = await navigator.serviceWorker.getRegistration('/');
    const sub = reg && await reg.pushManager.getSubscription();
    return sub && Notification.permission === 'granted' ? 'bat' : 'tat';
  } catch { return 'tat'; }
}

/** Khoá VAPID dạng base64url -> Uint8Array mà pushManager.subscribe cần. */
function khoaThanhMang(b64) {
  const pad = '='.repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

/** Service worker của trang: có rồi thì dùng, chưa có (vd. đang chạy dev) thì đăng ký tại chỗ. */
async function laySw() {
  const co = await navigator.serviceWorker.getRegistration('/');
  if (co) return co;
  await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  return navigator.serviceWorker.ready;
}

/**
 * Bật push cho thiết bị này. PHẢI gọi từ một cú bấm của người dùng (trình duyệt chặn xin quyền tự động).
 * @param {(method:string, path:string, body?:object)=>Promise<any>} goi
 * @returns {Promise<string>} trạng thái mới (xem trangThaiPush)
 */
export async function batPush(goi) {
  const tt = await trangThaiPush();
  if (tt === 'khong-ho-tro' || tt === 'ios-can-cai' || tt === 'bi-chan') return tt;
  const cfg = await goi('GET', '/push/khoa');
  if (!cfg?.bat || !cfg.khoa) throw new Error('Máy chủ chưa bật thông báo đẩy.');
  const quyen = await Notification.requestPermission();
  if (quyen !== 'granted') return quyen === 'denied' ? 'bi-chan' : 'tat';
  const reg = await laySw();
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    try {
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: khoaThanhMang(cfg.khoa) });
    } catch (e) {
      // Lỗi của trình duyệt là tiếng Anh thô ("Registration failed - permission denied"). Hay gặp
      // nhất: cửa sổ ẩn danh (Chrome không cho push và cố ý không để web dò ra), hoặc máy không
      // tới được dịch vụ push của Google/Apple.
      console.warn('pushManager.subscribe lỗi:', e?.message);
      throw new Error('Trình duyệt chưa đăng ký nhận thông báo được. Nếu đang mở ở cửa sổ ẩn danh, hãy mở bằng cửa sổ thường rồi thử lại.');
    }
  }
  await goi('POST', '/push/dang-ky', { subscription: sub.toJSON() });
  return 'bat';
}

/** Tắt push trên thiết bị này (huỷ ở trình duyệt + xoá ở server). */
export async function tatPush(goi) {
  const reg = await navigator.serviceWorker.getRegistration('/');
  const sub = reg && await reg.pushManager.getSubscription();
  if (sub) {
    try { await goi('POST', '/push/huy', { endpoint: sub.endpoint }); } catch { /* vẫn huỷ phía trình duyệt */ }
    await sub.unsubscribe();
  }
  return 'tat';
}

/**
 * Đồng bộ lại với server khi mở app: đăng nhập tài khoản khác trên cùng máy, hoặc trình duyệt đã tự
 * đổi địa chỉ push -> gửi lại để thông báo tới đúng người. Im lặng nếu chưa bật.
 */
export async function dongBoPush(goi) {
  try {
    if ((await trangThaiPush()) !== 'bat') return;
    const reg = await navigator.serviceWorker.getRegistration('/');
    const sub = await reg.pushManager.getSubscription();
    if (sub) await goi('POST', '/push/dang-ky', { subscription: sub.toJSON() });
  } catch { /* không có mạng / hết phiên: lần mở sau thử lại */ }
}

/** Nghe service worker báo "địa chỉ push đã đổi" để đăng ký lại. Gọi một lần lúc khởi động. */
export function ngheDoiDangKy(goi) {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (e.data?.loai === 'push-doi-dang-ky') batPush(goi).catch(() => {});
  });
}

/** Câu giải thích cho từng trạng thái — dùng chung hai cổng để nói cùng một kiểu. */
export const NHAN_PUSH = {
  bat: 'Đang bật trên thiết bị này.',
  tat: 'Chưa bật trên thiết bị này.',
  'bi-chan': 'Bạn đã chặn thông báo cho trang này. Mở cài đặt trình duyệt (biểu tượng ổ khoá cạnh địa chỉ web) và cho phép Thông báo, rồi tải lại trang.',
  'ios-can-cai': 'Trên iPhone/iPad: bấm nút Chia sẻ của Safari → "Thêm vào Màn hình chính", rồi mở ITaiwan từ biểu tượng đó để bật thông báo (cần iOS 16.4 trở lên).',
  'khong-ho-tro': 'Trình duyệt này không hỗ trợ thông báo đẩy. Hãy dùng Chrome, Edge, Firefox hoặc Safari bản mới.',
};
