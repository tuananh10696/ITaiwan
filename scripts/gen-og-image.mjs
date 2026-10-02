// ============================================================
// Script sinh ảnh Open Graph thumbnail (1200x630 px) cho ITaiwan
// Chạy: node scripts/gen-og-image.mjs
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_PATH = path.join(ROOT, 'public/og-image.png');
const LOGO_PATH = path.join(ROOT, 'itaiwan.jpg');

const logoBase64 = fs.readFileSync(LOGO_PATH).toString('base64');
const logoSrc = `data:image/jpeg;base64,${logoBase64}`;

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
    background: radial-gradient(circle at 80% 20%, #2252A0 0%, #16376E 45%, #0B1C3A 100%);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* Decorative glowing backgrounds */
  .orb-red {
    position: absolute;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.28) 0%, rgba(239, 68, 68, 0) 70%);
    top: -120px;
    left: -80px;
    filter: blur(40px);
  }
  
  .orb-cyan {
    position: absolute;
    width: 550px;
    height: 550px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 70%);
    bottom: -180px;
    right: -100px;
    filter: blur(50px);
  }

  /* Delicate subtle grid */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .container {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 75px;
    gap: 65px;
  }

  /* Logo Frame */
  .logo-wrap {
    flex-shrink: 0;
    width: 330px;
    height: 330px;
    border-radius: 50%;
    background: #FFFFFF;
    padding: 10px;
    box-shadow: 0 25px 65px rgba(0, 0, 0, 0.55), 0 0 45px rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 6px solid rgba(255, 255, 255, 0.95);
  }

  .logo-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  /* Main text column */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .badge-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .top-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(10px);
    padding: 7px 18px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #FDE047;
  }

  .top-pill-red {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.4);
    color: #FFA5A5;
  }

  .brand-title {
    font-size: 52px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -0.5px;
    color: #FFFFFF;
    margin-bottom: 8px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }

  .brand-sub {
    font-size: 22px;
    font-weight: 700;
    color: #FF6464;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-sub .hanzi {
    color: #93C5FD;
    font-weight: 600;
    font-size: 20px;
    background: rgba(147, 197, 253, 0.12);
    padding: 3px 10px;
    border-radius: 6px;
    border: 1px solid rgba(147, 197, 253, 0.25);
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 18px;
    font-weight: 600;
    color: #F8FAFC;
  }

  .check-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #10B981;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
  }

  .footer-row {
    display: flex;
    align-items: center;
    gap: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 17px;
    font-weight: 700;
    color: #FFFFFF;
  }

  .contact-label {
    background: #E11D48;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    padding: 4px 9px;
    border-radius: 6px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .domain-tag {
    background: rgba(255, 255, 255, 0.15);
    color: #67E8F9;
    font-size: 11px;
    font-weight: 800;
    padding: 4px 9px;
    border-radius: 6px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="orb-red"></div>
  <div class="orb-cyan"></div>
  <div class="grid-pattern"></div>

  <div class="container">
    <div class="logo-wrap">
      <img src="${logoSrc}" class="logo-img" alt="ITaiwan Logo" />
    </div>

    <div class="content">
      <div class="badge-row">
        <div class="top-pill">★ TRUNG TÂM DU HỌC ĐÀI LOAN</div>
        <div class="top-pill top-pill-red">UY TÍN HÀNG ĐẦU</div>
      </div>

      <h1 class="brand-title">DU HỌC ITAIWAN</h1>

      <div class="brand-sub">
        <span>Săn Học Bổng Toàn Phần</span>
        <span class="hanzi">愛台灣 • 學中文</span>
      </div>

      <div class="feature-list">
        <div class="feature-item">
          <div class="check-icon">✓</div>
          <span>Đào tạo tiếng Trung Phồn thể &amp; Luyện thi TOCFL chuẩn đầu ra</span>
        </div>
        <div class="feature-item">
          <div class="check-icon">✓</div>
          <span>Tư vấn các hệ: Ngôn ngữ • 1+4 • Đại học • Thạc sĩ Đài Loan</span>
        </div>
        <div class="feature-item">
          <div class="check-icon">✓</div>
          <span>Cam kết tỷ lệ đỗ Visa cao &amp; Hỗ trợ làm hồ sơ trọn gói</span>
        </div>
      </div>

      <div class="footer-row">
        <div class="contact-item">
          <span class="contact-label">Hotline 24/7</span>
          <span>036 567 8977</span>
        </div>
        <div class="contact-item">
          <span class="domain-tag">Website</span>
          <span>duhocitaiwan.com</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function main() {
  console.log('Khởi động Playwright để dựng og-image.png (1200x630)...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: OUT_PATH, type: 'png' });
  await browser.close();

  console.log('✅ Đã tạo thành công:', OUT_PATH);
}

main().catch(err => {
  console.error('Lỗi sinh og-image:', err);
  process.exit(1);
});
