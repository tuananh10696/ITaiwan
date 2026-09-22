// Sinh bộ icon PWA (public/icons/*.png) + nguồn cho capacitor-assets (assets/icon*.png, splash*.png,
// play-feature-graphic.png) từ logo thật (public/favicon.png: huy hiệu ITaiwan — nền đỏ tràn viền,
// vòng tròn trắng chứa gấu trúc đội mũ tốt nghiệp, chữ ITaiwan và 愛台灣).
//   npm run pwa:icons            rồi, cho app native:  npm run mobile:assets && npx cap sync
//
// ⚠️ Logo hiện tại là ảnh VUÔNG TRÀN VIỀN (đỏ chạy thẳng ra mép), khác hẳn logo cũ vốn là huy hiệu
// tròn nhỏ nằm giữa một ảnh trong suốt. Hệ quả cho từng loại ảnh:
//   · icon "any"  : lấy logo ở 100%, không cần vẽ nền — bản thân nó đã là một icon vuông hoàn chỉnh.
//   · maskable    : thu nhỏ để VÒNG TRÒN TRẮNG nằm gọn trong vùng an toàn 80%, phần thừa tô cùng
//                   màu đỏ của logo nên chỗ nối không nhìn ra.
//   · splash      : CẮT TRÒN logo (border-radius 50%) đặt trên nền xanh #1E4E9C — đúng
//                   `background_color` của manifest nên lúc mở app không chớp đổi màu.
import { chromium } from 'playwright';
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const GOC = new URL('..', import.meta.url).pathname;
const OUT = path.join(GOC, 'public/icons'); fs.mkdirSync(OUT, { recursive: true });
const b64 = fs.readFileSync(path.join(GOC, 'public/favicon.png')).toString('base64');
// Đo bằng cách đọc pixel của chính public/favicon.png, không chọn bằng mắt. Đổi logo thì đo lại.
const DO = '#FF3231';          // nền đỏ tràn viền của logo
const XANH = '#1E4E9C';        // màu chính của hệ thống (README mục 7) = background_color của manifest
const VONG_TRON = 0.879;       // vòng tròn trắng chiếm 87,9% cạnh ảnh nguồn
const NEN = `linear-gradient(180deg,#2C63B8 0%,${XANH} 55%,#16376E 100%)`;
// `tron` = cắt ảnh thành hình tròn, để lộ vòng trắng của logo và bỏ bốn góc đỏ.
const html = (size, ti, bg, tron = false) => `<!doctype html><html><body style="margin:0;background:transparent">
<div id="ic" style="width:${size}px;height:${size}px;background:${bg};display:flex;align-items:center;justify-content:center;overflow:hidden">
<img src="data:image/png;base64,${b64}" style="width:${Math.round(size * ti)}px;height:${Math.round(size * ti)}px;display:block${tron ? ';border-radius:50%' : ''}"></div></body></html>`;
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1100, height: 1100 }, deviceScaleFactor: 1 });
async function ve(file, size, ti, bg, tron = false) {
  await pg.setContent(html(size, ti, bg, tron)); await pg.waitForTimeout(80);
  await pg.locator('#ic').screenshot({ path: file, omitBackground: true, type: 'png' });
}
// Tỉ lệ img = (đường kính vòng trắng mong muốn) / VONG_TRON.
await ve(path.join(OUT, 'goc-1024.png'), 1024, 1, DO);                          // icon "any": logo tràn viền
await ve(path.join(OUT, 'icon-maskable-512.png'), 512, 0.78 / VONG_TRON, DO);   // maskable: vòng trắng ~78%, trong vùng an toàn 80%
await ve(path.join(GOC, 'assets/icon.png'), 1024, 1, DO);                        // nguồn cho capacitor-assets
await ve(path.join(GOC, 'assets/icon-foreground.png'), 1024, 0.78 / VONG_TRON, 'transparent', true);
await ve(path.join(GOC, 'assets/icon-background.png'), 1024, 0, DO);

// SPLASH (2732×2732, capacitor-assets cắt cho mọi cỡ) + ảnh nổi bật Play Store (1024×500).
// Font Be Vietnam Pro tải từ Google Fonts lúc sinh; không có mạng thì rơi về system-ui — chỉ khác
// kiểu chữ, vẫn đúng logo. Logo cắt tròn (xem ghi chú đầu file) nên trên nền xanh chỉ còn vòng
// trắng viền đỏ mảnh, không phải một khối vuông đỏ chọi màu.
const FONT = `<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;800&display=swap" rel="stylesheet">`;
const splash = (bg, chuPhu) => `<!doctype html><html><head><meta charset="utf-8">${FONT}</head><body style="margin:0">
<div id="ic" style="width:2732px;height:2732px;background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;font-family:'Be Vietnam Pro',system-ui,sans-serif">
  <img src="data:image/png;base64,${b64}" style="width:760px;height:760px;display:block;margin-bottom:24px;border-radius:50%">
  <div style="font-size:200px;font-weight:800;color:#fff;letter-spacing:-4px;line-height:1">ITaiwan</div>
  <div style="font-size:64px;font-weight:700;color:${chuPhu};margin-top:26px;letter-spacing:14px">學中文</div>
  <div style="width:180px;height:10px;border-radius:5px;background:#FD923C;margin-top:44px"></div>
</div></body></html>`;
const NEN_TOI = 'linear-gradient(180deg,#22528F 0%,#16376E 55%,#0E244A 100%)';
await pg.setViewportSize({ width: 2800, height: 2800 });
await pg.setContent(splash(NEN, 'rgba(255,255,255,.82)')); await pg.waitForTimeout(1200);
await pg.locator('#ic').screenshot({ path: path.join(GOC, 'assets/splash.png'), type: 'png' });
await pg.setContent(splash(NEN_TOI, 'rgba(255,255,255,.72)')); await pg.waitForTimeout(600);
await pg.locator('#ic').screenshot({ path: path.join(GOC, 'assets/splash-dark.png'), type: 'png' });

const feature = `<!doctype html><html><head><meta charset="utf-8">${FONT}</head><body style="margin:0">
<div id="ic" style="width:1024px;height:500px;background:linear-gradient(105deg,#2C63B8 0%,${XANH} 50%,#16376E 100%);display:flex;align-items:center;gap:56px;padding:0 84px;box-sizing:border-box;font-family:'Be Vietnam Pro',system-ui,sans-serif;color:#fff">
  <img src="data:image/png;base64,${b64}" style="width:250px;height:250px;flex:none;display:block;border-radius:50%">
  <div style="min-width:0">
    <!-- nowrap + cỡ chữ 72: logo tròn rộng hơn logo cũ, để 92px thì "學中文" rớt xuống dòng hai -->
    <div style="font-size:72px;font-weight:800;letter-spacing:-2px;line-height:1;white-space:nowrap">ITaiwan <span style="color:#FDBA74;font-weight:700">學中文</span></div>
    <div style="font-size:34px;font-weight:700;margin-top:22px;line-height:1.3">Học tiếng Trung Phồn thể<br>&amp; luyện thi TOCFL</div>
    <div style="font-size:24px;margin-top:18px;opacity:.85;white-space:nowrap">324 bài · 10.562 từ có giọng đọc thật</div>
  </div>
</div></body></html>`;
await pg.setViewportSize({ width: 1100, height: 600 });
await pg.setContent(feature); await pg.waitForTimeout(800);
await pg.locator('#ic').screenshot({ path: path.join(GOC, 'assets/play-feature-graphic.png'), type: 'png' });

// MÀN HÌNH KHỞI ĐỘNG iOS (apple-touch-startup-image). iOS KHÔNG đọc splash từ manifest như Android —
// không có bộ này thì mở app từ màn hình chính là một màn TRẮNG cho tới khi trang nạp xong. Mỗi cỡ
// máy một ảnh đúng pixel, chọn bằng media query. Nền PHẲNG (không gradient) để PNG nhẹ (~40 KB thay
// vì ~300 KB) — 17 ảnh mà gradient là 5 MB vào repo. Cùng màu với background_color của manifest.
const MAY = [
  // [rộng CSS, cao CSS, dpr]   — đo theo thông số Apple, KHÔNG đoán từ tên máy
  [440, 956, 3],  // iPhone 16 Pro Max · 17 Pro Max
  [402, 874, 3],  // iPhone 16 Pro · 17 Pro · 17
  [430, 932, 3],  // iPhone 15 Pro Max · 14 Pro Max · 15 Plus · 16 Plus
  [393, 852, 3],  // iPhone 15 · 15 Pro · 14 Pro · 16 · 16e
  [428, 926, 3],  // iPhone 14 Plus · 13 Pro Max · 12 Pro Max
  [390, 844, 3],  // iPhone 14 · 13 · 13 Pro · 12 · 12 Pro
  [375, 812, 3],  // iPhone 13 mini · 12 mini · 11 Pro · XS · X
  [414, 896, 3],  // iPhone 11 Pro Max · XS Max
  [414, 896, 2],  // iPhone 11 · XR
  [375, 667, 2],  // iPhone SE 2/3 · 8
  [414, 736, 3],  // iPhone 8 Plus
  [1032, 1376, 2], // iPad Pro 13" (M4)
  [1024, 1366, 2], // iPad Pro 12.9"
  [834, 1194, 2],  // iPad Pro 11" · Air 11"
  [820, 1180, 2],  // iPad 10/11 · Air 10.9"
  [768, 1024, 2],  // iPad 9 · iPad mini 5
  [744, 1133, 2],  // iPad mini 6/7
];
const SPLASH = path.join(GOC, 'public/splash'); fs.mkdirSync(SPLASH, { recursive: true });
const khoiDong = (w, h) => {
  const nho = Math.min(w, h);
  return `<!doctype html><html><head><meta charset="utf-8">${FONT}</head><body style="margin:0">
<div id="ic" style="width:${w}px;height:${h}px;background:${XANH};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Be Vietnam Pro',system-ui,sans-serif">
  <img src="data:image/png;base64,${b64}" style="width:${Math.round(nho * 0.42)}px;height:${Math.round(nho * 0.42)}px;display:block;border-radius:50%">
  <div style="font-size:${Math.round(nho * 0.11)}px;font-weight:800;color:#fff;letter-spacing:-1px;line-height:1;margin-top:${Math.round(nho * 0.02)}px">ITaiwan</div>
  <div style="font-size:${Math.round(nho * 0.038)}px;font-weight:700;color:rgba(255,255,255,.82);letter-spacing:${Math.round(nho * 0.008)}px;margin-top:${Math.round(nho * 0.02)}px">學中文</div>
</div></body></html>`;
};
const links = [];
for (const [w, h, dpr] of MAY) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  const p2 = await ctx.newPage();
  await p2.setContent(khoiDong(w, h)); await p2.waitForTimeout(400);
  const file = `ios-${w}x${h}@${dpr}x.png`;
  await p2.locator('#ic').screenshot({ path: path.join(SPLASH, file), type: 'png' });
  await ctx.close();
  links.push(`    <link rel="apple-touch-startup-image" media="screen and (device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)" href="/splash/${file}">`);
}
// Chèn vào index.html giữa hai mốc — chạy lại script là thay cả khối, không nhân đôi.
const idx = path.join(GOC, 'index.html');
let trangChu = fs.readFileSync(idx, "utf8");
const BEGIN = '    <!-- SPLASH-IOS:BEGIN — tự sinh bởi scripts/gen-pwa-icons.mjs, đừng sửa tay -->';
const END = '    <!-- SPLASH-IOS:END -->';
const khoi = [BEGIN, ...links, END].join('\n');
if (trangChu.includes("SPLASH-IOS:BEGIN")) {
  trangChu = trangChu.replace(/    <!-- SPLASH-IOS:BEGIN[\s\S]*?SPLASH-IOS:END -->/, khoi);
} else {
  trangChu = trangChu.replace('    <link rel="stylesheet" href="/fa/fa-subset.css">', khoi + '\n    <link rel="stylesheet" href="/fa/fa-subset.css">');
}
fs.writeFileSync(idx, trangChu);
console.log(`splash iOS: ${MAY.length} ảnh -> public/splash/, đã chèn ${links.length} <link> vào index.html`);
await b.close();
for (const s of [512, 256, 192, 180, 128, 96, 72, 48]) {
  const f = path.join(OUT, s === 180 ? 'apple-touch-icon.png' : `icon-${s}.png`);
  execFileSync('sips', ['-z', String(s), String(s), path.join(OUT, 'goc-1024.png'), '--out', f], { stdio: 'ignore' });
}
fs.unlinkSync(path.join(OUT, 'goc-1024.png'));
for (const f of fs.readdirSync(OUT)) console.log(f, fs.statSync(path.join(OUT, f)).size);
