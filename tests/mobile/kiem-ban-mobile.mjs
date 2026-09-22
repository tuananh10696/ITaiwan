// Kiểm chứng bản dựng mobile CHẠY THẬT, không chỉ "dựng xong".
// Giả lập đúng môi trường app native: origin https://localhost + window.Capacitor có sẵn.
import { chromium, webkit } from 'playwright';

// Chạy bằng engine nào. MẶC ĐỊNH Chromium (gần với WebView của Android), thêm `--webkit` để
// chạy bằng WebKit — chính là engine của Safari và của WKWebView trên iOS.
//
// Không phải chuyện thừa: WebView của iOS và Android là HAI engine khác nhau. Những thứ Chromium
// tha nhưng WebKit thì không: `lookbehind` trong biểu thức chính quy (Safari chỉ hỗ trợ từ 16.4),
// `Intl` với vài tuỳ chọn, `position: sticky` bên trong phần tử có `overflow` (dự án đã dính một
// lần, CLAUDE.md 4.21b mục 2), và ngày giờ tạo bằng `new Date("2026-09-07 08:00")` — Chromium
// hiểu, WebKit trả Invalid Date. Chạy được ở đây nghĩa là không phải chờ cài Xcode mới biết.
const DUNG_WEBKIT = process.argv.includes('--webkit');
const ENGINE = DUNG_WEBKIT ? webkit : chromium;
const TEN_ENGINE = DUNG_WEBKIT ? 'WebKit (Safari / WKWebView của iOS)' : 'Chromium (WebView của Android)';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const GOC = '/Users/lt00838/DATA/TA/taiwanese/dist-mobile';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg' };

const sv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(GOC, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(GOC, 'index.html'); // SPA
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => sv.listen(4599, r));

const b = await ENGINE.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

// Cầu nối Capacitor giả lập.
//
// `isPluginAvailable` cố ý trả FALSE hết: đây là tình huống XẤU NHẤT — app tưởng mình đang chạy
// native (nên dùng URL API tuyệt đối) nhưng không plugin nào được nhúng. Nếu code chịu được
// tình huống này thì trên máy thật, nơi plugin có đủ, chắc chắn không tệ hơn. Nó cũng chính là
// thứ bắt được lỗi "Keyboard plugin is not implemented" ở lượt kiểm trước.
const NEN_TANG = DUNG_WEBKIT ? 'ios' : 'android';
await ctx.addInitScript((NEN_TANG) => {
  window.Capacitor = {
    isNativePlatform: () => true,
    getPlatform: () => NEN_TANG,
    isPluginAvailable: () => false,
    Plugins: {},
    convertFileSrc: (s) => s,
  };
}, NEN_TANG);

// Chặn lời gọi API và trả dữ liệu rỗng hợp lệ. Máy chủ thật chưa nhận origin của app (phải
// triển khai bản server mới), mà đó là việc khác — ở đây cần biết MÃ CỦA APP có lỗi không, chứ
// không phải mạng có thông không. Vẫn ghi lại URL để kiểm tra app gọi đúng máy chủ tuyệt đối.
const goiApi = [];
await ctx.route('**/api/**', (route) => {
  goiApi.push(route.request().url());
  route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
});
// Font Google: trả về rỗng thay vì huỷ yêu cầu. Huỷ thì trình duyệt ghi net::ERR_FAILED vào
// console, và nó lẫn vào cột "lỗi JS" làm mọi trang trông như đang hỏng.
await ctx.route('**/fonts.g*.com/**', (r) =>
  r.fulfill({ status: 200, contentType: 'text/css', body: '' }));

const loi = [], mang = [];
const pg = await ctx.newPage();
pg.on('console', (m) => { if (m.type() === 'error') loi.push(m.text()); });
pg.on('pageerror', (e) => loi.push('PAGEERROR: ' + e.message));
pg.on('request', (r) => { const u = r.url(); if (!u.includes('localhost:4599')) mang.push(u); });

const TRANG = [
  ['Trang chủ', '/'],
  ['Học phát âm — thanh mẫu', '/hoc-phat-am/thanh-mau'],
  ['Đương đại 1.1 Từ vựng', '/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung'],
  ['Đương đại 1.1 Flashcard', '/tocfl/giao-trinh-duong-dai/bai-1-1/flashcard'],
  ['Đương đại 1.1 Ngữ pháp', '/tocfl/giao-trinh-duong-dai/bai-1-1/ngu-phap'],
  ['Đương đại 1.2 Bài tập', '/tocfl/giao-trinh-duong-dai/bai-1-2/bai-tap'],
  ['Đương đại 1.1 Game', '/tocfl/giao-trinh-duong-dai/bai-1-1/game'],
  ['Thi thử TOCFL', '/tocfl/thi-thu'],
  ['Bảng phiên âm', '/hoc-phat-am/bang-phien-am'],
  // Hai trang NẠP ĐỘNG (4.40) — đủ để bắt lỗi "chunk không tải được trong WebView".
  // ⚠️ Module thứ ba (`lotrinh`) KHÔNG có trang nào công khai nên bộ kiểm chạy không đăng nhập
  //    này chỉ thấy trang chủ; nó được phủ bởi bộ kiểm riêng có token thật.
  ['Từ điển (module tuvung)', '/tu-vung/tu-dien'],
  ['Cộng đồng (module congdong)', '/cong-dong/thao-luan'],
];

console.log(`Engine: ${TEN_ENGINE}\n`);
console.log('TRANG'.padEnd(32), 'KÝ TỰ'.padStart(7), 'DOM'.padStart(6), '  LỖI JS');
console.log('─'.repeat(66));
let tong = 0;
for (const [ten, url] of TRANG) {
  const truoc = loi.length;
  await pg.goto('http://localhost:4599' + url, { waitUntil: 'networkidle' }).catch(() => {});
  await pg.waitForTimeout(700);
  const r = await pg.evaluate(() => {
    const el = document.getElementById('page-content');
    // Đo bằng textContent, KHÔNG dùng innerText: innerText phụ thuộc layout và mỗi engine tính
    // một kiểu — cùng một trang từ vựng cho 9009 ký tự trên Chromium nhưng 1572 trên WebKit,
    // trong khi textContent bằng nhau đúng 31.199 ở cả hai. Dùng innerText thì mỗi lần đổi engine
    // lại tưởng app hỏng.
    return { chu: (el?.textContent || '').length, dom: el?.querySelectorAll('*').length || 0 };
  });
  const n = loi.length - truoc;
  tong += n;
  const co = r.chu > 200 ? '' : '  ⚠️ NỘI DUNG TRỐNG';
  console.log(ten.padEnd(32), String(r.chu).padStart(7), String(r.dom).padStart(6), '  ' + (n || '-') + co);
}

// Kiểm tra riêng: API base có thành URL tuyệt đối không, lớp native có nạp không.
const chiTiet = await pg.evaluate(() => ({
  classHtml: document.documentElement.className,
  coApp: typeof window.app === 'object',
}));

console.log('\n── Đặc thù app native ──');
console.log('class trên <html>          :', chiTiet.classHtml || '(trống)');
console.log('window.app đã gắn          :', chiTiet.coApp ? 'có' : 'KHÔNG');
const origins = [...new Set(goiApi.map((u) => new URL(u).origin))];
console.log('API gọi tới                :', origins.join(', ') || '(chưa gọi)');
console.log('Số lời gọi API             :', goiApi.length);

// Đây là điều kiện SỐNG CÒN của app: gọi API bằng đường dẫn tương đối thì trong app native nó
// trỏ vào chính WebView và luôn 404 — người dùng không đăng nhập được, và không có lỗi nào nói
// cho biết vì sao.
const saiApi = origins.filter((o) => o.includes('localhost'));
if (saiApi.length) {
  console.log('\n❌ API gọi vào origin nội bộ:', saiApi.join(', '));
  console.log('   Trong app thật đây là 404 câm. Kiểm tra apiBase() ở src/utils/env.js.');
}
console.log('\nTổng lỗi JS:', tong);
if (loi.length) { console.log('\n── Chi tiết lỗi ──'); [...new Set(loi)].slice(0, 12).forEach(l => console.log(' •', l.slice(0, 180))); }

await b.close(); sv.close();
process.exit(tong > 0 || saiApi.length ? 1 : 0);
