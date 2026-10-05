// Kiểm tra bản WEB không bị lớp native làm hỏng.
//
// Việc thêm app native đụng vào 3 file dùng chung: src/api/client.js (đổi API_BASE thành
// apiBase()), src/main.js (nạp động lớp native), index.html (thêm native.css). Nếu một trong ba
// chỗ đó sai thì web hỏng — mà web đang có người dùng thật, còn app thì chưa.
//
// Điều PHẢI đúng: không có Capacitor -> apiBase() trả '/api' tương đối, và KHÔNG nạp lớp native.
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const GOC = path.resolve(import.meta.dirname, '../../dist');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg' };
const sv = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(GOC, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(GOC, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => sv.listen(4601, r));

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const goiApi = [];
await ctx.route('**/api/**', (r) => { goiApi.push(r.request().url()); r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }); });
await ctx.route('**/fonts.g*.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));

const loi = [];
const pg = await ctx.newPage();
pg.on('console', (m) => { if (m.type() === 'error') loi.push(m.text()); });
pg.on('pageerror', (e) => loi.push('PAGEERROR: ' + e.message));

const TRANG = [['Trang chủ', '/'], ['Phát âm', '/hoc-phat-am/thanh-mau'],
  ['Bảng phiên âm', '/hoc-phat-am/bang-phien-am'],
  ['Thời Đại 1.1', '/tocfl/giao-trinh-thoi-dai/bai-1-1/tu-vung'],
  ['TOCFL Band', '/tocfl/tu-vung-theo-band'],
  // Hai trang NẠP ĐỘNG — bắt lỗi tách route trên bản WEB. Module `lotrinh` cần đăng
  // nhập nên không đưa vào đây (bộ kiểm này chạy với tư cách khách).
  ['Từ điển', '/tu-vung/tu-dien'],
  ['Bộ thủ Hán tự', '/tu-vung/bo-thu-han-tu'],
  // Hướng dẫn (2026-10-05) — nạp động, mở cho khách. Trang tạo tài khoản phải có nút đăng ký.
  ['Cài app', '/huong-dan/cai-app'], ['Tạo tài khoản', '/huong-dan/dang-ky-tai-khoan']];

console.log('TRANG'.padEnd(20), 'KÝ TỰ'.padStart(7), '  LỖI');
console.log('─'.repeat(40));
let tong = 0;
for (const [ten, url] of TRANG) {
  const truoc = loi.length;
  await pg.goto('http://localhost:4601' + url, { waitUntil: 'networkidle' }).catch(() => {});
  await pg.waitForTimeout(600);
  const chu = await pg.evaluate(() => (document.getElementById('page-content')?.innerText || '').length);
  const n = loi.length - truoc; tong += n;
  console.log(ten.padEnd(20), String(chu).padStart(7), '  ' + (n || '-'));
}

// Khách mở "Cách tạo tài khoản" phải thấy nút đăng ký — từng bị ẩn vì điều kiện hỏi `state.user`
// (luôn có giá trị) thay vì `state.isLoggedIn`.
await pg.goto('http://localhost:4601/huong-dan/dang-ky-tai-khoan', { waitUntil: 'networkidle' }).catch(() => {});
await pg.waitForTimeout(600);
const coNutDangKy = await pg.evaluate(() => !!document.querySelector('.hd-reg-cta-banner'));
console.log('Nút đăng ký (khách) :', coNutDangKy ? 'CÓ' : 'KHÔNG — lỗi');

const cls = await pg.evaluate(() => document.documentElement.className);
const tuongDoi = goiApi.every((u) => new URL(u).origin === 'http://localhost:4601');

console.log('\nclass trên <html>   :', cls || '(trống — đúng, web không có tw-native)');
console.log('API gọi tương đối   :', tuongDoi ? 'ĐÚNG' : 'SAI — ' + [...new Set(goiApi.map(u => new URL(u).origin))].join(', '));
console.log('Số lời gọi API      :', goiApi.length);
console.log('Lỗi JS              :', tong);
if (loi.length) [...new Set(loi)].slice(0, 6).forEach((l) => console.log('  •', l.slice(0, 150)));

const hong = tong > 0 || !tuongDoi || cls.includes('tw-native') || !coNutDangKy;
console.log(hong ? '\n❌ BẢN WEB CÓ VẤN ĐỀ' : '\n✅ Bản web không bị ảnh hưởng');
await b.close(); sv.close();
process.exit(hong ? 1 : 0);
