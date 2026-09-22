#!/usr/bin/env node
// Sinh bộ icon + màn hình chờ cho app từ MỘT nguồn duy nhất: hình logo trong public/favicon.svg.
//
// Vì sao không dùng thẳng favicon.png: nó 360×360, mà App Store bắt buộc 1024×1024 và Google
// Play bắt buộc 512×512 — phóng to ảnh nhỏ lên sẽ răng cưa và bị từ chối ngay ở khâu tải lên.
// Nên vẽ lại từ đường path vector, ra bao nhiêu pixel cũng sắc nét.
//
// MÀU: hình logo giữ nguyên, nhưng nền dùng bảng màu teal của giao diện v2 (CLAUDE.md 4.29)
// thay cho màu tím cũ — icon phải khớp với thứ người dùng thấy khi mở app ra.
//
// Render bằng Playwright (đã có sẵn trong dự án) chứ không phải sharp: sharp cần biên dịch
// node-gyp và hay hỏng khi đổi phiên bản Node.

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RA = path.join(GOC, 'assets');
fs.mkdirSync(RA, { recursive: true });

// Đường path của logo, bóc từ public/favicon.svg (viewBox 0 0 48 46).
const LOGO = 'M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287'
  + 'c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788'
  + 'L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579'
  + 'h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z';

const TEAL = '#38899E', TEAL_DAM = '#2A6B7D', TEAL_SANG = '#4A9DB5', CAM = '#FD923C';

/** Logo trắng, canh giữa, chiếm `tyLe` bề rộng khung. */
function logoSvg(tyLe) {
  const w = 48, h = 46;
  const s = (100 * tyLe) / w;                       // đơn vị: % khung
  return `<svg viewBox="0 0 100 100" width="100%" height="100%">
    <g transform="translate(${(100 - w * s) / 2} ${(100 - h * s) / 2}) scale(${s})">
      <path d="${LOGO}" fill="#fff"/>
    </g></svg>`;
}

const trang = (noiDung, w, h) => `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;width:${w}px;height:${h}px;overflow:hidden}
  .k{width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;position:relative}
</style>${noiDung}`;

// Gradient LUÔN đổ từ trên xuống — quy ước của giao diện v2 (CLAUDE.md 4.29).
const nenTeal = (a = TEAL_SANG, b = TEAL_DAM) => `background:linear-gradient(180deg,${a} 0%,${b} 100%)`;

const BO = [
  // App Store 1024 + Google Play 512 đều lấy từ đây. Icon KHÔNG được bo góc sẵn và KHÔNG được
  // có kênh trong suốt — Apple từ chối cả hai; hệ điều hành tự bo góc.
  { ten: 'icon.png', w: 1024, h: 1024, html: `<div class="k" style="${nenTeal()}">${logoSvg(0.46)}</div>` },

  // Android adaptive icon: hệ thống cắt theo hình bất kỳ (tròn, vuông bo, giọt nước) và chỉ
  // bảo đảm giữ lại 66% ở giữa. Nên phần nhìn thấy phải nhỏ hơn hẳn so với icon thường —
  // để nguyên 46% như trên là logo bị cắt cụt trên máy dùng icon tròn.
  { ten: 'icon-foreground.png', w: 1024, h: 1024, html: `<div class="k">${logoSvg(0.30)}</div>`, trongSuot: true },
  { ten: 'icon-background.png', w: 1024, h: 1024, html: `<div class="k" style="${nenTeal()}"></div>` },

  // Màn hình chờ: 2732×2732 để cắt vừa mọi tỉ lệ màn hình mà không méo (Capacitor cắt giữa).
  {
    ten: 'splash.png', w: 2732, h: 2732,
    html: `<div class="k" style="${nenTeal(TEAL, TEAL_DAM)}">
      <div style="display:flex;flex-direction:column;align-items:center;gap:64px">
        <div style="width:520px;height:520px">${logoSvg(0.86)}</div>
        <div style="font:700 132px/1 -apple-system,'PingFang TC','Helvetica Neue',sans-serif;color:#fff;letter-spacing:8px">Tẻn</div>
        <div style="width:180px;height:8px;border-radius:4px;background:${CAM}"></div>
      </div></div>`,
  },
  {
    ten: 'splash-dark.png', w: 2732, h: 2732,
    html: `<div class="k" style="${nenTeal('#20505E', '#122E36')}">
      <div style="display:flex;flex-direction:column;align-items:center;gap:64px">
        <div style="width:520px;height:520px">${logoSvg(0.86)}</div>
        <div style="font:700 132px/1 -apple-system,'PingFang TC','Helvetica Neue',sans-serif;color:#fff;letter-spacing:8px">Tẻn</div>
        <div style="width:180px;height:8px;border-radius:4px;background:${CAM}"></div>
      </div></div>`,
  },

  // Ảnh giới thiệu trên Google Play (bắt buộc, đúng 1024×500).
  {
    ten: 'play-feature-graphic.png', w: 1024, h: 500,
    html: `<div class="k" style="${nenTeal(TEAL, TEAL_DAM)};justify-content:flex-start;padding-left:88px;box-sizing:border-box">
      <div style="width:150px;height:150px;flex:none">${logoSvg(0.9)}</div>
      <div style="margin-left:48px;font-family:-apple-system,'PingFang TC','Helvetica Neue',sans-serif;color:#fff">
        <div style="font-size:76px;font-weight:800;letter-spacing:2px">Tẻn</div>
        <div style="font-size:34px;font-weight:600;opacity:.94;margin-top:10px">Học tiếng Trung Phồn thể</div>
        <div style="font-size:27px;font-weight:500;opacity:.8;margin-top:8px">Luyện thi TOCFL · 324 bài · 10.562 từ</div>
      </div></div>`,
  },
];

const b = await chromium.launch();
for (const m of BO) {
  const pg = await b.newPage({
    viewport: { width: m.w, height: m.h },
    deviceScaleFactor: 1,
  });
  await pg.setContent(trang(m.html, m.w, m.h));
  await pg.screenshot({
    path: path.join(RA, m.ten),
    omitBackground: !!m.trongSuot,   // chỉ lớp trước của adaptive icon mới cần nền trong suốt
  });
  await pg.close();
  console.log(`  ✓ assets/${m.ten}  ${m.w}×${m.h}`);
}
await b.close();
console.log('\nXong. Chạy `npm run mobile:assets` để trải ra tất cả kích thước iOS/Android.');
