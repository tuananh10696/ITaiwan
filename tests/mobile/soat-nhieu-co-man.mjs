#!/usr/bin/env node
/**
 * Soát cổng học viên ở NHIỀU cỡ điện thoại — đo bằng số + chụp ảnh từng đoạn màn hình (2026-09-18).
 *
 *   PORT=3997 TAT_GIOI_HAN=true NOI_DUNG_MO_HET=true EXTRA_ORIGINS=http://localhost:5197 node server/index.js
 *   VITE_API_TARGET=http://localhost:3997 npx vite --port 5197 --strictPort
 *   node tests/mobile/soat-nhieu-co-man.mjs --state student --uid 499 --widths 320,360,390,430 --shot 390
 *   node tests/mobile/soat-nhieu-co-man.mjs --state guest --widths 390 --shot 390 --cham
 *
 * Đo: tràn ngang · phần tử vượt mép · chữ < 11px · chữ bị cắt · nút bị thanh điều hướng dưới che ·
 * vùng chạm < 44px (elementFromPoint, chỉ khi --cham) · lỗi JS. Ảnh vào tests/mobile/anh-soat/.
 *
 * ⚠️ Khung cuộn thật là #page-content (app-shell 100dvh, overflow hidden) — screenshot fullPage
 * chỉ ra đúng một màn, nên script cuộn CHÍNH khung đó rồi chụp từng đoạn (-1, -2…).
 * ⚠️ `--cham` dùng scrollIntoView nên các dải cuộn ngang (thanh tab, chip nhóm) bị kéo về cuối
 * trước khi chụp — muốn ảnh đúng trạng thái ban đầu thì chạy lượt không --cham.
 * ⚠️ Cờ "đáy nội dung > nav" có thể là dương tính giả khi trang có khối thu gọn bằng max-height:0
 * (ví dụ của thẻ từ vựng) hoặc ảnh chưa tải xong — dò lại bằng tay trước khi kết luận.
 */
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { chromium, webkit } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d; };
const STATE = arg('--state', 'student');            // guest | student
const WIDTHS = arg('--widths', '320,360,390,430').split(',').map(Number);
const SHOT = Number(arg('--shot', '0'));            // chụp ở bề rộng này (0 = không chụp)
const MAX_SEG = Number(arg('--seg', '6'));          // số đoạn màn hình tối đa mỗi trang
const ENGINE = arg('--engine', 'chromium') === 'webkit' ? webkit : chromium;
const ONLY = arg('--only', '');                     // lọc tên trang (chuỗi con, phân cách dấu phẩy)
const CHAM = process.argv.includes('--cham');       // đo vùng chạm (chậm)
const BASE = arg('--web', 'http://localhost:5197');
const API = arg('--api', 'http://localhost:3997');
const UID = Number(arg('--uid', '0'));
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), 'anh-soat');
fs.mkdirSync(OUT, { recursive: true });
// Ký token thẳng bằng JWT_SECRET (như các test khác) — không cần mật khẩu tài khoản.
const TOK = STATE === 'student'
  ? jwt.sign({ id: UID || 499 }, process.env.JWT_SECRET, { expiresIn: '4h' })
  : '';

const CAO = { 320: 568, 344: 882, 360: 740, 375: 667, 390: 844, 412: 915, 430: 932, 440: 956, 768: 1024, 820: 1180, 844: 390, 896: 414, 932: 430 };

const TRANG = [
  ['trang-chu', '/'],
  ['pron-van-mau', '/hoc-phat-am/van-mau'],
  ['pron-thanh-mau', '/hoc-phat-am/thanh-mau'],
  ['pron-thanh-dieu', '/hoc-phat-am/thanh-dieu'],
  ['pron-bang', '/hoc-phat-am/bang-phien-am'],
  ['dd-tu-vung', '/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung'],
  ['dd-flashcard', '/tocfl/giao-trinh-duong-dai/bai-1-1/flashcard'],
  ['dd-ngu-phap', '/tocfl/giao-trinh-duong-dai/bai-1-1/ngu-phap'],
  ['dd-hoi-thoai', '/tocfl/giao-trinh-duong-dai/bai-1-1/hoi-thoai'],
  ['dd-luyen-viet', '/tocfl/giao-trinh-duong-dai/bai-1-1/luyen-viet'],
  ['dd-game', '/tocfl/giao-trinh-duong-dai/bai-1-1/game'],
  ['dd-dich', '/tocfl/giao-trinh-duong-dai/bai-1-1/dich-trung-viet'],
  ['dd-bai-tap', '/tocfl/giao-trinh-duong-dai/bai-1-2/bai-tap'],
  ['dd-bai-tap-tn', '/tocfl/giao-trinh-duong-dai/bai-1-2/bai-tap/trac-nghiem'],
  ['dd-luyen-tap-th', '/tocfl/giao-trinh-duong-dai/bai-1-2/bai-tap/luyen-tap-tong-hop'],
  ['dd-van-hoa', '/tocfl/giao-trinh-duong-dai/bai-1-van-hoa'],
  ['td-tu-vung', '/tocfl/giao-trinh-thoi-dai/quyen-1/bai-1-1/tu-vung'],
  ['td-ngu-phap', '/tocfl/giao-trinh-thoi-dai/quyen-1/bai-1-1/ngu-phap'],
  ['tocfl-vocab', '/tocfl/tu-vung-theo-band'],
  ['tocfl-vocab-l1', '/tocfl/tu-vung-theo-band/cap-L1'],
  ['thi-thu', '/tocfl/thi-thu'],
  ['lt-flashcard', '/luyen-tap/flashcard'],
  ['lt-quiz', '/luyen-tap/trac-nghiem'],
  ['lt-hoi-thoai', '/luyen-tap/hoi-thoai'],
  ['lt-luyen-noi', '/luyen-tap/luyen-noi'],
  ['kho-tu-vung', '/tu-vung/kho-tu-vung'],
  ['tu-dien', '/tu-vung/tu-dien'],
  ['tu-dien-tu', '/tu-vung/tu-dien/學生'],
  ['so-tay', '/tu-vung/so-tay'],
  ['bo-thu', '/tu-vung/bo-thu-han-tu'],
  ['bo-thu-85', '/tu-vung/bo-thu-han-tu/bo-85'],
  ['lo-tong-quan', '/lo-trinh/tong-quan'],
  ['lo-hom-nay', '/lo-trinh/hom-nay'],
  ['lo-bai-tap', '/lo-trinh/bai-tap'],
  ['lo-tien-do', '/lo-trinh/tien-do'],
  ['lo-kiem-tra', '/lo-trinh/bai-kiem-tra'],
  ['lo-thanh-tich', '/lo-trinh/thanh-tich'],
  ['cd-thao-luan', '/cong-dong/thao-luan'],
  ['cd-blog', '/cong-dong/blog'],
  ['cd-blog-1', '/cong-dong/blog/1'],
  ['cd-vlog', '/cong-dong/vlog'],
  ['cd-tin-tuc', '/cong-dong/tin-tuc'],
  ['cd-hoc-bong', '/cong-dong/hoc-bong'],
  ['tk-ho-so', '/tai-khoan/ho-so'],
  ['tk-cai-dat', '/tai-khoan/cai-dat'],
  ['tk-thong-bao', '/tai-khoan/thong-bao'],
  ['tk-goi', '/tai-khoan/goi-thanh-vien'],
  // lớp phủ — mở từ trang chủ (chỉ chụp 1 màn)
  ['ov-sidebar', '/', 'window.app.toggleMobileSidebar()'],
  ['ov-auth', '/', "window.app.openAuth && window.app.openAuth('login')"],
  ['ov-user', '/', 'window.app.toggleUserMenu()'],
  ['ov-notif', '/', 'window.app.toggleNotifications()'],
  ['ov-mascot', '/', 'window.app.toggleMascot()'],
].filter(([t]) => !ONLY || ONLY.split(',').some((o) => t.includes(o)));

const DO = (cham) => `(async () => {
  const W = innerWidth, H = innerHeight, de = document.documentElement, pc = document.getElementById('page-content');
  const r = { url: location.pathname, tran: 0, tranPc: 0, loi: [], vuotMep: [], chuNho: [], chuCat: [], cham: [], duoiNav: [], dauTrang: null, caoNoiDung: pc ? pc.scrollHeight : 0 };
  const vis = (el) => { const s = getComputedStyle(el); if (s.display==='none'||s.visibility==='hidden'||+s.opacity===0) return false;
    const b = el.getBoundingClientRect(); return b.width>0 && b.height>0; };
  const trongSidebar = (el) => !!el.closest('.sidebar, #sidebar, .sidebar-overlay, .mobile-sidebar-overlay');
  const biKep = (el) => { let p = el.parentElement; while (p && p !== document.body) { const s = getComputedStyle(p);
    if (/(auto|scroll|hidden|clip)/.test(s.overflowX) || /(auto|scroll|hidden|clip)/.test(s.overflow)) return p; p = p.parentElement; } return null; };
  const ten = (el) => (el.tagName.toLowerCase() + '.' + String(el.className||'').trim().split(/\\s+/).slice(0,2).join('.')).slice(0, 44);
  // 1. tràn ngang (cả document lẫn khung cuộn nội dung)
  r.tran = Math.max(0, de.scrollWidth - de.clientWidth, document.body.scrollWidth - W);
  r.tranPc = pc ? Math.max(0, pc.scrollWidth - pc.clientWidth) : 0;
  // 2. phần tử vượt mép phải/trái mà KHÔNG bị khung cha kẹp lại (kẹp bởi page-content cũng tính là lỗi: chữ bị cắt mất)
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el) || trongSidebar(el)) continue;
    const b = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (s.position === 'fixed' && (b.left >= W || b.right <= 0)) continue;   // ngăn kéo trượt ngoài màn là cố ý
    if (b.right > W + 1 || b.left < -1) {
      const k = biKep(el);
      if (!k || k === pc || k.id === 'page-content') r.vuotMep.push({ el: ten(el), l: Math.round(b.left), r: Math.round(b.right), w: Math.round(b.width), kep: k ? ten(k) : null });
    }
  }
  // 3. chữ nhỏ + 4. chữ bị cắt
  for (const el of document.querySelectorAll('body *')) {
    if (el.children.length || !vis(el) || trongSidebar(el)) continue;
    const t = (el.textContent||'').trim(); if (t.length < 2) continue;
    const s = getComputedStyle(el); const px = parseFloat(s.fontSize);
    if (px < 11) r.chuNho.push({ px: +px.toFixed(1), el: ten(el), chu: t.slice(0, 24) });
    if ((s.overflow === 'hidden' || s.overflowX === 'hidden') && s.textOverflow !== 'ellipsis' && (el.scrollWidth > el.clientWidth + 2)) r.chuCat.push({ el: ten(el), chu: t.slice(0, 24), sw: el.scrollWidth, cw: el.clientWidth });
  }
  // 5. đầu trang
  const hd = document.querySelector('.top-header');
  if (hd && pc) { const nd = [...pc.children].find(vis); if (nd) r.dauTrang = { header: Math.round(hd.getBoundingClientRect().bottom), noiDung: Math.round(nd.getBoundingClientRect().top) }; }
  // 6. cuộn khung nội dung xuống đáy: nút nào bị thanh điều hướng dưới che
  const nav = document.querySelector('.mobile-nav');
  if (nav && vis(nav) && pc) {
    pc.scrollTo({ top: pc.scrollHeight, behavior: 'instant' }); await new Promise(r => setTimeout(r, 200));
    const nb = nav.getBoundingClientRect();
    // Phần tử nằm trong một khung cuộn CON (danh sách bài dính bên trái, bảng cuộn…) mà đang cuộn ra
    // ngoài tầm nhìn thì KHÔNG phải bị thanh nav che — bỏ qua, nếu không lần nào chạy cũng đỏ.
    const trongKhungCuonCon = (el) => { let p = el.parentElement; while (p && p !== pc) { const s = getComputedStyle(p); if (/(auto|scroll)/.test(s.overflowY) && p.scrollHeight > p.clientHeight + 1) return true; p = p.parentElement; } return false; };
    for (const el of pc.querySelectorAll('button, a[href], [onclick], input, select, textarea')) {
      if (!vis(el) || trongKhungCuonCon(el)) continue; const b = el.getBoundingClientRect();
      if (b.bottom > nb.top + 2 && b.top < nb.bottom && b.top < H && b.height > 0) r.duoiNav.push({ el: ten(el), chu: (el.textContent||'').trim().slice(0,20), top: Math.round(b.top), bottom: Math.round(b.bottom), navTop: Math.round(nb.top) });
    }
    // phần tử nội dung cuối cùng có bị nav che không
    const cuoi = [...pc.querySelectorAll('*')].filter(vis).map(e => e.getBoundingClientRect().bottom).filter(v => v < H + 1);
    r.dayNoiDung = Math.round(Math.max(...cuoi, 0)); r.navTop = Math.round(nb.top);
    pc.scrollTo({ top: 0, behavior: 'instant' });
  }
  // 7. vùng chạm (elementFromPoint, chỉ khi bật) — bỏ phần tử mà tâm không bấm tới (đang ẩn trong dropdown)
  if (${cham ? 'true' : 'false'} && pc) {
    const cands = [...document.querySelectorAll('#page-content button, #page-content a[href], #page-content [onclick], #page-content input:not([type=hidden]), #page-content select, .top-header button, .mobile-nav a, .mobile-nav button')].filter(vis).slice(0, 300);
    for (const el of cands) {
      const b0 = el.getBoundingClientRect(); if (b0.width >= 44 && b0.height >= 44) continue;
      el.scrollIntoView({ block: 'center', behavior: 'instant' }); await new Promise(r => setTimeout(r, 25));
      const b = el.getBoundingClientRect(); const cx = b.left + b.width/2, cy = b.top + b.height/2;
      const hit = (x, y) => { const t = document.elementFromPoint(x, y); return !!t && (t === el || el.contains(t)); };
      if (!hit(cx, cy)) continue;
      let up = 0, dn = 0; while (up < 30 && hit(cx, cy - up - 1)) up++; while (dn < 30 && hit(cx, cy + dn + 1)) dn++;
      let lf = 0, rt = 0; while (lf < 30 && hit(cx - lf - 1, cy)) lf++; while (rt < 30 && hit(cx + rt + 1, cy)) rt++;
      const h = up + dn + 1, w = lf + rt + 1;
      if (h < 44 || w < 44) r.cham.push({ el: ten(el), chu: (el.textContent||'').trim().slice(0,18), w, h });
    }
    pc.scrollTo({ top: 0, behavior: 'instant' });
  }
  const gom = (a, k = 'el', n = 6) => { const m = new Map(); for (const x of a) if (!m.has(x[k])) m.set(x[k], x); return { n: a.length, ds: [...m.values()].slice(0, n) }; };
  r.vuotMep = gom(r.vuotMep); r.chuNho = gom(r.chuNho); r.chuCat = gom(r.chuCat); r.cham = gom(r.cham, 'el', 12); r.duoiNav = gom(r.duoiNav);
  return r;
})()`;

const b = await ENGINE.launch();
const ketQua = [];
for (const W of WIDTHS) {
  const H = CAO[W] || 800;
  const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'vi-VN' });
  if (STATE === 'student') {
    const me = await (await fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${TOK}` } })).json();
    if (!me.user) { console.error('Không lấy được hồ sơ của --uid', UID, '— server có chạy đúng cổng không?'); process.exit(1); }
    const u = me.user || me;
    await ctx.addInitScript(({ TOK, u }) => { localStorage.setItem('tw_token', TOK); localStorage.setItem('tw_user', JSON.stringify(u)); }, { TOK, u });
  }
  await ctx.route('**/fonts.g*.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  const pg = await ctx.newPage();
  const loi = []; pg.on('console', (m) => { if (m.type() === 'error') loi.push(m.text().slice(0, 140)); });
  pg.on('pageerror', (e) => loi.push('PAGEERROR ' + e.message.slice(0, 140)));
  const shotDir = path.join(OUT, 'shots', `${STATE}-${W}`); if (SHOT === W) fs.mkdirSync(shotDir, { recursive: true });
  for (const [ten, url, ov] of TRANG) {
    loi.length = 0;
    try {
      await pg.goto(BASE + url, { waitUntil: 'load', timeout: 30000 });
      await pg.waitForTimeout(1800);
      if (ov) { await pg.evaluate(ov); await pg.waitForTimeout(600); }
      else await pg.evaluate(() => { try { window.app?.closeAuth?.(); window.app?.closeDialog?.(); } catch {} });
      const r = await Promise.race([pg.evaluate(DO(CHAM)), new Promise((_, rej) => setTimeout(() => rej(new Error('treo 25s')), 25000))]);
      r.loi = [...loi]; r.ten = ten; r.w = W; r.state = STATE;
      ketQua.push(r);
      if (SHOT === W) {
        if (ov) await pg.screenshot({ path: path.join(shotDir, `${ten}.png`) });
        else {
          // chụp từng đoạn của khung cuộn #page-content
          const info = await pg.evaluate(() => { const pc = document.getElementById('page-content'); return pc ? { sh: pc.scrollHeight, ch: pc.clientHeight } : null; });
          const buoc = info ? Math.max(200, info.ch - 60) : H;
          const soDoan = info ? Math.min(MAX_SEG, Math.ceil((info.sh - 60) / buoc)) : 1;
          for (let i = 0; i < Math.max(1, soDoan); i++) {
            await pg.evaluate((y) => { const pc = document.getElementById('page-content'); if (pc) pc.scrollTo({ top: y, behavior: 'instant' }); }, i * buoc);
            await pg.waitForTimeout(120);
            await pg.screenshot({ path: path.join(shotDir, `${ten}${soDoan > 1 ? '-' + (i + 1) : ''}.png`) });
          }
          await pg.evaluate(() => { const pc = document.getElementById('page-content'); if (pc) pc.scrollTo({ top: 0, behavior: 'instant' }); });
        }
      }
      const flags = [];
      if (r.tran || r.tranPc) flags.push(`TRÀN doc ${r.tran}px / pc ${r.tranPc}px`);
      if (r.vuotMep.n) flags.push(`vượt mép ${r.vuotMep.n}: ${r.vuotMep.ds.slice(0,4).map(x => x.el + '(' + x.l + '..' + x.r + ')').join(', ')}`);
      if (r.chuNho.n) flags.push(`chữ<11 ${r.chuNho.n}: ${r.chuNho.ds.slice(0,3).map(x => x.el + ' ' + x.px).join(', ')}`);
      if (r.chuCat.n) flags.push(`cắt ${r.chuCat.n}: ${r.chuCat.ds.slice(0,3).map(x => x.el + ' "' + x.chu + '"').join(', ')}`);
      if (r.duoiNav.n) flags.push(`dưới nav ${r.duoiNav.n}: ${r.duoiNav.ds.slice(0,3).map(x => x.el + '(' + x.bottom + '>' + x.navTop + ')').join(', ')}`);
      if (r.dayNoiDung && r.navTop && r.dayNoiDung > r.navTop + 2) flags.push(`đáy nội dung ${r.dayNoiDung} > nav ${r.navTop}`);
      if (r.cham.n) flags.push(`chạm nhỏ ${r.cham.n}: ${r.cham.ds.slice(0,6).map(x => x.el + ' ' + x.w + 'x' + x.h).join(', ')}`);
      if (r.dauTrang && r.dauTrang.noiDung < r.dauTrang.header - 1) flags.push(`nội dung dưới header (${r.dauTrang.noiDung}<${r.dauTrang.header})`);
      if (r.loi.length) flags.push(`JS ${r.loi.length}: ${r.loi[0]}`);
      const chuyen = r.url !== url && decodeURIComponent(r.url) !== url ? ` → ${decodeURIComponent(r.url)}` : '';
      console.log(`[${STATE} ${W}] ${ten}${chuyen}${flags.length ? '\n     ' + flags.join('\n     ') : '  ✓'}`);
    } catch (e) {
      console.log(`[${STATE} ${W}] ${ten}  ✗ ${e.message.slice(0, 100)}`);
      ketQua.push({ ten, w: W, state: STATE, loiScript: e.message });
    }
  }
  await ctx.close();
}
fs.writeFileSync(path.join(OUT, `ket-qua-${STATE}-${WIDTHS.join('_')}.json`), JSON.stringify(ketQua, null, 1));
console.log(`\nẢnh + kết quả JSON ở ${OUT}`);
await b.close();
