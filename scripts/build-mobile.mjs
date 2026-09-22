#!/usr/bin/env node
// Dựng bản web dành riêng cho app native (iOS/Android) — xem md/app-mobile.md.
//
// Khác bản web ở ba điểm, và cả ba đều là điều kiện để app chạy được:
//   1. VITE_API_BASE — trong app, WebView chạy ở origin riêng của Capacitor nên '/api' trỏ vào
//      chính nó và luôn 404. Mọi lời gọi API phải là URL tuyệt đối (src/utils/env.js).
//   2. VITE_CDN_BASE — 276 MB audio KHÔNG nằm trong gói app (trần AAB của Google Play là
//      200 MB), nên phải phát qua mạng (src/utils/cdn.js).
//   3. TW_MOBILE=1 — bảo vite.config.js dựng vào `dist-mobile` và tự chép public/ có chọn lọc.
//
// Thiếu (1) thì app đăng nhập không được; thiếu (2) thì mọi nút loa im lặng rơi về giọng máy mà
// không báo lỗi gì (đúng kiểu hỏng đã xảy ra ở CLAUDE.md 4.11b) — nên script tự đặt cả hai và
// IN RA để nhìn thấy được, thay vì để lỡ quên.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RA = process.env.TW_MOBILE_OUT || 'dist-mobile';

// Máy chủ thật của app đã cài trên máy học viên. Đổi ở đây (hoặc đặt biến môi trường cùng tên)
// khi chuyển sang tên miền riêng — nhớ dựng lại và phát hành bản mới, người dùng KHÔNG tự đổi
// được giá trị này.
const API = process.env.VITE_API_BASE || 'https://taiwanese-mu.vercel.app';
const CDN = process.env.VITE_CDN_BASE || 'https://taiwanese-mu.vercel.app';

console.log('┌─ Dựng bản mobile');
console.log(`│  API  : ${API}`);
console.log(`│  CDN  : ${CDN}   (audio phát qua mạng, không nằm trong gói app)`);
console.log(`│  Ra   : ${RA}/`);
console.log('└─');

execFileSync('npx', ['vite', 'build'], {
  cwd: GOC,
  stdio: 'inherit',
  env: { ...process.env, TW_MOBILE: '1', TW_MOBILE_OUT: RA, VITE_API_BASE: API, VITE_CDN_BASE: CDN },
});

// ---- Kiểm tra lại kết quả, đừng tin là build xong nghĩa là đúng ----
const out = path.join(GOC, RA);
const loi = [];

if (fs.existsSync(path.join(out, 'audio'))) {
  loi.push('dist-mobile/audio VẪN CÒN — gói app sẽ vượt trần 200 MB của Google Play.');
}
if (!fs.existsSync(path.join(out, 'index.html'))) loi.push('thiếu index.html');
if (!fs.existsSync(path.join(out, 'data'))) loi.push('thiếu thư mục data/ (bài học offline)');

// API tuyệt đối phải thật sự nằm trong bundle. Nếu Vite không thay biến (đặt sai tên, sai
// thời điểm) thì app vẫn dựng xong bình thường rồi chết lúc đăng nhập trên máy thật.
const assets = path.join(out, 'assets');
const js = fs.existsSync(assets) ? fs.readdirSync(assets).filter((f) => f.endsWith('.js')) : [];
const coApi = js.some((f) => fs.readFileSync(path.join(assets, f), 'utf8').includes(API));
if (!coApi) loi.push(`không thấy '${API}' trong bundle — VITE_API_BASE chưa được thay vào mã.`);

if (loi.length) {
  console.error('\n❌ Bản dựng KHÔNG hợp lệ:');
  for (const l of loi) console.error('   • ' + l);
  process.exit(1);
}

const dungLuong = (d) => {
  let n = 0, f = 0;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { const r = dungLuong(p); n += r.n; f += r.f; }
    else { n += fs.statSync(p).size; f++; }
  }
  return { n, f };
};
const { n, f } = dungLuong(out);
console.log(`\n✅ Bản mobile hợp lệ: ${(n / 1024 / 1024).toFixed(1)} MB · ${f} file`);
console.log('   Tiếp theo: npx cap sync');
