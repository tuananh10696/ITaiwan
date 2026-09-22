#!/usr/bin/env node
/**
 * Soát giao diện trên WebView THẬT của máy ảo, đo bằng số chứ không nhìn ảnh đoán.
 *
 *   node scripts/chay-android.mjs --debug     # phải chạy trước (bản release không mở gỡ lỗi)
 *   node tests/mobile/soat-ui.mjs
 *
 * Đo 6 nhóm vấn đề, tất cả đều là thứ ảnh chụp KHÔNG cho thấy:
 *   1. Tràn ngang  — trang rộng hơn màn hình, người dùng phải kéo ngang mới đọc hết
 *   2. Vùng chạm   — nút nhỏ hơn 44×44 (Apple HIG) / 48×48 (Material) thì hay bấm trượt
 *   3. Chữ bị cắt  — phần tử có overflow ẩn mà nội dung dài hơn khung
 *   4. Chữ quá nhỏ — dưới 12px trên điện thoại là khó đọc
 *   5. Chồng lấn   — nút bị phần tử khác che, bấm không trúng
 *   6. Vùng an toàn— nội dung chui vào tai thỏ hoặc dưới thanh gạt về nhà
 */
const CONG = process.env.CDP_PORT || 9333;
const ds = await (await fetch(`http://localhost:${CONG}/json`)).json();
const trang = ds.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
if (!trang) { console.error('Không thấy WebView. Chạy `node scripts/chay-android.mjs --debug` trước.'); process.exit(1); }

const ws = new WebSocket(trang.webSocketDebuggerUrl);
let id = 0; const cho = new Map();
const goi = (m, p = {}) => new Promise((r) => { const i = ++id; cho.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && cho.has(m.id)) { cho.get(m.id)(m.result); cho.delete(m.id); } };
await new Promise((r) => (ws.onopen = r));
await goi('Runtime.enable');
const ev = async (js) => (await goi('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true }))?.result?.value;

const TRANG = [
  ['Trang chủ', '/'],
  ['Học phát âm — thanh mẫu', '/hoc-phat-am/thanh-mau'],
  ['Học phát âm — thanh điệu', '/hoc-phat-am/thanh-dieu'],
  ['Bảng phiên âm', '/hoc-phat-am/bang-phien-am'],
  ['ĐĐ 1.1 Từ vựng', '/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung'],
  ['ĐĐ 1.1 Flashcard', '/tocfl/giao-trinh-duong-dai/bai-1-1/flashcard'],
  ['ĐĐ 1.1 Ngữ pháp', '/tocfl/giao-trinh-duong-dai/bai-1-1/ngu-phap'],
  ['ĐĐ 1.1 Hội thoại', '/tocfl/giao-trinh-duong-dai/bai-1-1/hoi-thoai'],
  ['ĐĐ 1.1 Luyện viết', '/tocfl/giao-trinh-duong-dai/bai-1-1/luyen-viet'],
  ['ĐĐ 1.1 Game', '/tocfl/giao-trinh-duong-dai/bai-1-1/game'],
  ['ĐĐ 1.2 Bài tập', '/tocfl/giao-trinh-duong-dai/bai-1-2/bai-tap'],
  ['ĐĐ 1 Văn hoá', '/tocfl/giao-trinh-duong-dai/bai-1-van-hoa'],
  ['Thi thử TOCFL', '/tocfl/thi-thu'],
  ['Từ vựng theo Band', '/tu-vung/tong-hop'],
];

const DO = `(() => {
  const r = { tranNgang: 0, chamNho: [], chuCat: [], chuNho: [], anToan: [] };
  const de = document.documentElement, tt = document.getElementById('page-content');
  r.tranNgang = Math.max(0, de.scrollWidth - de.clientWidth);
  r.rongMan = de.clientWidth;

  const nhin = (el) => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false;
    const b = el.getBoundingClientRect();
    return b.width > 0 && b.height > 0;
  };

  // 2. Vùng chạm nhỏ
  for (const el of document.querySelectorAll('button, a[href], [onclick], input, select, [role=button]')) {
    if (!nhin(el)) continue;
    const b = el.getBoundingClientRect();
    if (b.top > innerHeight * 3 || b.bottom < 0) continue;   // chỉ xét phần gần khung nhìn
    // vùng chạm ảo qua ::after (native.css có mở rộng cho nút icon)
    const sau = getComputedStyle(el, '::after');
    const noiRong = sau.content !== 'none' && sau.position === 'absolute' ? 16 : 0;
    const w = b.width + noiRong, h = b.height + noiRong;
    if (w < 44 || h < 44) {
      r.chamNho.push({ tag: el.tagName.toLowerCase(), cls: (el.className||'').toString().slice(0,40),
        w: Math.round(w), h: Math.round(h), chu: (el.textContent||'').trim().slice(0,24) });
    }
  }

  // 3. Chữ bị cắt
  for (const el of document.querySelectorAll('*')) {
    if (!nhin(el) || el.children.length) continue;
    const s = getComputedStyle(el);
    if (s.overflow === 'hidden' || s.textOverflow === 'ellipsis') {
      if (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) {
        r.chuCat.push({ cls: (el.className||'').toString().slice(0,40), chu: (el.textContent||'').trim().slice(0,30) });
      }
    }
    // 4. Chữ quá nhỏ
    const px = parseFloat(s.fontSize);
    if (px && px < 12 && (el.textContent||'').trim().length > 2) {
      r.chuNho.push({ px: px.toFixed(1), cls: (el.className||'').toString().slice(0,36), chu: (el.textContent||'').trim().slice(0,24) });
    }
  }

  // 6. Vùng an toàn: phần tử bấm được nằm dưới mép an toàn dưới cùng
  const duoi = parseFloat(getComputedStyle(de).getPropertyValue('--tw-safe-bottom')) || 0;
  for (const el of document.querySelectorAll('button, a[href], [onclick]')) {
    if (!nhin(el)) continue;
    const b = el.getBoundingClientRect();
    if (b.top >= 0 && b.top < 24) r.anToan.push({ loai: 'sát mép trên', cls: (el.className||'').toString().slice(0,36), top: Math.round(b.top) });
  }

  const gom = (a, k) => { const m = new Map(); for (const x of a) { const s = JSON.stringify(x[k]||x); if (!m.has(s)) m.set(s, x); } return [...m.values()]; };
  r.chamNho = gom(r.chamNho, 'cls').slice(0, 6);
  r.chuCat  = gom(r.chuCat, 'cls').slice(0, 6);
  r.chuNho  = gom(r.chuNho, 'cls').slice(0, 6);
  r.anToan  = gom(r.anToan, 'cls').slice(0, 4);
  return r;
})()`;

console.log('Màn hình:', await ev('innerWidth + "×" + innerHeight + " @dpr" + devicePixelRatio'));
console.log('');
const vd = [];
for (const [ten, url] of TRANG) {
  await ev(`(history.pushState({}, '', ${JSON.stringify(url)}), dispatchEvent(new PopStateEvent('popstate')))`);
  await new Promise((r) => setTimeout(r, 1600));
  const d = await ev(DO);
  if (!d) { console.log(`${ten.padEnd(26)} — không đo được`); continue; }
  const n = d.tranNgang + d.chamNho.length + d.chuCat.length + d.chuNho.length;
  console.log(`${ten.padEnd(26)} tràn ngang:${String(d.tranNgang).padStart(3)}px  chạm nhỏ:${String(d.chamNho.length).padStart(2)}  chữ cắt:${String(d.chuCat.length).padStart(2)}  chữ <12px:${String(d.chuNho.length).padStart(2)}`);
  if (n) vd.push([ten, d]);
}

console.log('\n══════ CHI TIẾT ══════');
for (const [ten, d] of vd) {
  console.log(`\n▸ ${ten}`);
  if (d.tranNgang) console.log(`   ✗ TRÀN NGANG ${d.tranNgang}px (màn ${d.rongMan}px)`);
  for (const x of d.chamNho) console.log(`   • chạm nhỏ ${x.w}×${x.h}  <${x.tag} class="${x.cls}">  "${x.chu}"`);
  for (const x of d.chuCat)  console.log(`   • chữ bị cắt  .${x.cls}  "${x.chu}"`);
  for (const x of d.chuNho)  console.log(`   • chữ ${x.px}px  .${x.cls}  "${x.chu}"`);
}
if (!vd.length) console.log('Không phát hiện vấn đề nào.');
ws.close();
