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
const VERSION = 'ten-sw-v1';
const CACHE_SHELL = `${VERSION}-shell`;
const CACHE_ASSETS = `${VERSION}-assets`;
const CACHE_STATIC = `${VERSION}-static`;
const CACHE_AUDIO = `${VERSION}-audio`;
const TRAN = { [CACHE_STATIC]: 300, [CACHE_AUDIO]: 400, [CACHE_ASSETS]: 80 };
const SHELL = ['/', '/manifest.webmanifest', '/icons/icon-192.png'];

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
  try {
    const res = await fetch(req);
    // Cập nhật khung app mỗi lần vào được mạng, để lần mất mạng sau có bản mới nhất.
    if (res && res.status === 200) {
      const c = await caches.open(CACHE_SHELL);
      c.put('/', res.clone()).catch(() => {});
    }
    return res;
  } catch {
    const c = await caches.open(CACHE_SHELL);
    const shell = await c.match('/');
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
