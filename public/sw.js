/* Service worker của ITaiwan — PWA (2026-09-18).
 *
 * MỤC ĐÍCH: đủ điều kiện "Thêm vào màn hình chính" thành app thật trên Android/iOS, mở lại được
 * khung app khi mất mạng, và không tải lại những file bất biến (JS/CSS có hash, audio, ảnh).
 *
 * NGUYÊN TẮC — cố ý BẢO THỦ để không bao giờ phục vụ bản cũ:
 *  - /api/**            : KHÔNG đụng. Mọi dữ liệu học/quyền/điểm luôn đi thẳng máy chủ.
 *  - điều hướng (HTML)  : MẠNG TRƯỚC; mất mạng thì trả khung app đã cache lúc cài. index.html đổi
 *                         mỗi lần deploy (trỏ sang assets hash mới) nên không được cache lâu.
 *  - /assets/**         : CACHE TRƯỚC — tên file có hash, nội dung bất biến (vercel.json cũng đặt
 *                         immutable 1 năm).
 *  - /audio/** /fa/** /images/** /icons/** /data/** : cache trước, có trần số mục; chỉ cache
 *                         phản hồi 200 cùng origin (bỏ 206 của request Range, bỏ opaque từ CDN).
 *  - Đổi VERSION là xoá sạch cache cũ ở bước activate.
 */
// v2 (2026-09-28): khung app tách riêng cổng học viên / cổng quản trị + push thông báo.
// Đổi VERSION -> bước activate xoá cache v1 (có thể đang giữ nhầm admin.html làm khung '/').
const VERSION = 'ten-sw-v2';
const CACHE_SHELL = `${VERSION}-shell`;
const CACHE_ASSETS = `${VERSION}-assets`;
const CACHE_STATIC = `${VERSION}-static`;
const CACHE_AUDIO = `${VERSION}-audio`;
const TRAN = { [CACHE_STATIC]: 300, [CACHE_AUDIO]: 400, [CACHE_ASSETS]: 80 };
const SHELL = ['/', '/manifest.webmanifest', '/icons/icon-192.png'];
/** Khung app của trang đang mở: cổng quản trị có khung RIÊNG, không được đè khung cổng học viên. */
const khoaKhung = (url) => (url.pathname.startsWith('/admin') ? '/admin.html' : '/');

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE_SHELL);
    // Từng file một: một file hỏng không được làm hỏng cả lượt cài.
    await Promise.all(SHELL.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => null)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

const cungOrigin = (url) => url.origin === self.location.origin;

async function catBot(cacheName) {
  const tran = TRAN[cacheName]; if (!tran) return;
  const c = await caches.open(cacheName);
  const ks = await c.keys();
  if (ks.length <= tran) return;
  // keys() trả theo thứ tự thêm vào -> xoá những mục cũ nhất
  await Promise.all(ks.slice(0, ks.length - tran).map((k) => c.delete(k)));
}

async function cacheTruoc(req, cacheName) {
  const c = await caches.open(cacheName);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && res.status === 200 && res.type === 'basic') {
    c.put(req, res.clone()).then(() => catBot(cacheName)).catch(() => {});
  }
  return res;
}

async function mangTruocHtml(req) {
  const khoa = khoaKhung(new URL(req.url));
  try {
    const res = await fetch(req);
    // Cập nhật khung app mỗi lần vào được mạng, để lần mất mạng sau có bản mới nhất. Khoá THEO
    // CỔNG: bản cũ cất mọi trang vào '/', mở admin.html một lần là khung cổng học viên thành trang admin.
    if (res && res.status === 200) {
      const c = await caches.open(CACHE_SHELL);
      c.put(khoa, res.clone()).catch(() => {});
    }
    return res;
  } catch {
    const c = await caches.open(CACHE_SHELL);
    const shell = await c.match(khoa);
    if (shell) return shell;
    return new Response('<!doctype html><meta charset="utf-8"><title>ITaiwan</title><p style="font-family:system-ui;padding:24px">Không có kết nối mạng. Hãy thử lại khi có mạng.</p>', { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 });
  }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!cungOrigin(url)) return;                 // CDN, Google Fonts, YouTube... để trình duyệt tự lo
  if (url.pathname.startsWith('/api/')) return; // dữ liệu động: không bao giờ cache
  if (url.pathname === '/sw.js') return;
  if (req.headers.has('range')) return;         // audio tua giữa chừng -> 206, không cache được

  if (req.mode === 'navigate') { e.respondWith(mangTruocHtml(req)); return; }

  const p = url.pathname;
  if (p.startsWith('/assets/')) { e.respondWith(cacheTruoc(req, CACHE_ASSETS)); return; }
  if (p.startsWith('/audio/')) { e.respondWith(cacheTruoc(req, CACHE_AUDIO)); return; }
  if (p.startsWith('/fa/') || p.startsWith('/images/') || p.startsWith('/icons/') || p.startsWith('/data/')
      || p === '/favicon.png' || p === '/banner.jpg' || p === '/banner.webp' || p === '/manifest.webmanifest') {
    e.respondWith(cacheTruoc(req, CACHE_STATIC)); return;
  }
  // còn lại (src/* lúc dev, file lạ): không can thiệp
});

// =============================================================
// PUSH THÔNG BÁO (2026-09-28) — xem server/utils/push.js
// =============================================================
// Server gửi JSON { tieu_de, noi_dung, url, the }. Hiện ngay cả khi không mở app (điện thoại
// khoá màn hình). iOS chỉ nhận khi web đã được "Thêm vào Màn hình chính" (iOS 16.4+).
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { tieu_de: e.data ? e.data.text() : '' }; }
  const tieuDe = d.tieu_de || 'ITaiwan';
  e.waitUntil(self.registration.showNotification(tieuDe, {
    body: d.noi_dung || '',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png',
    tag: d.the || undefined,
    // Cùng tag -> thông báo mới THAY thông báo cũ; renotify để máy vẫn rung/kêu lại.
    renotify: !!d.the,
    data: { url: d.url || '/' },
    lang: 'vi',
  }));
});

// Bấm vào thông báo: có sẵn một tab/app của đúng cổng thì chuyển nó tới trang cần xem, không thì mở mới.
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const dich = new URL((e.notification.data && e.notification.data.url) || '/', self.location.origin);
  e.waitUntil((async () => {
    const ds = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const cungCong = ds.find((c) => {
      try { return khoaKhung(new URL(c.url)) === khoaKhung(dich); } catch { return false; }
    });
    if (cungCong) {
      await cungCong.focus();
      try { await cungCong.navigate(dich.href); } catch { /* trang khác origin / không cho điều hướng: đã focus là đủ */ }
      return;
    }
    await self.clients.openWindow(dich.href);
  })());
});

// Trình duyệt tự đổi địa chỉ push (hết hạn) -> báo các tab đang mở để chúng đăng ký lại với server.
self.addEventListener('pushsubscriptionchange', (e) => {
  e.waitUntil((async () => {
    const ds = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    ds.forEach((c) => c.postMessage({ loai: 'push-doi-dang-ky' }));
  })());
});
