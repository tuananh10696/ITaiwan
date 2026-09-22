#!/usr/bin/env node
/**
 * Soát BỐ CỤC từng màn hình trên WebView thật: bao nhiêu phần màn hình bị khung giao diện chiếm
 * trước khi tới nội dung, nút nào bị bóp méo, thanh tab dính chưa.
 *
 *   node scripts/chay-android.mjs --debug
 *   adb forward tcp:9333 localabstract:webview_devtools_remote_$(adb shell pidof com.taiwanese.app.debug)
 *   node tests/mobile/soat-man-hinh.mjs
 */
const CONG = process.env.CDP_PORT || 9333;
const ds = await (await fetch(`http://localhost:${CONG}/json`)).json();
const t = ds.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
if (!t) { console.error('Không thấy WebView.'); process.exit(1); }
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id = 0; const cho = new Map();
const goi = (m, p = {}) => new Promise((r) => { const i = ++id; cho.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && cho.has(m.id)) { cho.get(m.id)(m.result); cho.delete(m.id); } };
await new Promise((r) => (ws.onopen = r));
await goi('Runtime.enable');
const ev = async (js) => (await goi('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true }))?.result?.value;

const DO = `(() => {
  const H = innerHeight, W = innerWidth, r = { meo: [], lech: [] };
  const nhin = (el) => { const s = getComputedStyle(el);
    if (s.display==='none'||s.visibility==='hidden'||+s.opacity===0) return false;
    const b = el.getBoundingClientRect();
    return b.width>1 && b.height>1 && b.top>-40 && b.top<H && b.left>=-1 && b.right<=W+1; };

  // nội dung thật bắt đầu ở đâu
  const nd = document.querySelector('.dd-tab-content > *, .page-content > *:not(script)');
  r.batDau = nd ? Math.round(nd.getBoundingClientRect().top) : null;
  r.man = H;
  r.tranNgang = Math.max(0, document.documentElement.scrollWidth - W);

  // NÚT BÓP MÉO: icon vuông bị kéo thành chữ nhật
  for (const el of document.querySelectorAll('button, a[href]')) {
    if (!nhin(el)) continue;
    const b = el.getBoundingClientRect();
    const chuChinh = (el.textContent||'').trim().length;
    const coIcon = !!el.querySelector('i, svg');
    // nút chỉ có icon mà cao/rộng lệch quá 25% -> trông méo
    if (coIcon && chuChinh === 0 && b.width>10 && b.height>10) {
      const lech = Math.abs(b.width - b.height) / Math.max(b.width, b.height);
      if (lech > 0.25) r.meo.push({ cls:String(el.className).split(' ')[0].slice(0,26),
        w:Math.round(b.width), h:Math.round(b.height), lech:(lech*100).toFixed(0)+'%' });
    }
  }

  // LỆCH HÀNG: các phần tử anh em cùng loại mà chiều cao chênh nhau nhiều
  const nhom = {};
  for (const el of document.querySelectorAll('.dd-tab-btn, .mnav-item, .nav-item, .pron-card-head, .dd-vocab-item')) {
    if (!nhin(el)) continue;
    const k = String(el.className).split(' ')[0];
    (nhom[k] = nhom[k] || []).push(Math.round(el.getBoundingClientRect().height));
  }
  for (const [k, hs] of Object.entries(nhom)) {
    if (hs.length < 2) continue;
    const min = Math.min(...hs), max = Math.max(...hs);
    if (max - min > 6) r.lech.push({ cls:k, min, max, n:hs.length });
  }

  const gom = (a) => { const m=new Map(); for(const x of a) if(!m.has(x.cls)) m.set(x.cls,x); return [...m.values()].slice(0,5); };
  r.meo = gom(r.meo); r.lech = gom(r.lech);
  return r;
})()`;

const TRANG = [
  ['Trang chủ', '/'],
  ['ĐĐ 1.1 Từ vựng', '/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung'],
  ['ĐĐ 1.1 Flashcard', '/tocfl/giao-trinh-duong-dai/bai-1-1/flashcard'],
  ['ĐĐ 1.1 Ngữ pháp', '/tocfl/giao-trinh-duong-dai/bai-1-1/ngu-phap'],
  ['ĐĐ 1.1 Hội thoại', '/tocfl/giao-trinh-duong-dai/bai-1-1/hoi-thoai'],
  ['ĐĐ 1.1 Luyện viết', '/tocfl/giao-trinh-duong-dai/bai-1-1/luyen-viet'],
  ['ĐĐ 1.1 Game', '/tocfl/giao-trinh-duong-dai/bai-1-1/game'],
  ['ĐĐ 1.2 Bài tập', '/tocfl/giao-trinh-duong-dai/bai-1-2/bai-tap'],
  ['ĐĐ 1 Văn hoá', '/tocfl/giao-trinh-duong-dai/bai-1-van-hoa'],
  ['Phát âm — thanh mẫu', '/hoc-phat-am/thanh-mau'],
  ['Phát âm — thanh điệu', '/hoc-phat-am/thanh-dieu'],
  ['Bảng phiên âm', '/hoc-phat-am/bang-phien-am'],
  ['Thi thử TOCFL', '/tocfl/thi-thu'],
  ['Từ vựng theo Band', '/tu-vung/tong-hop'],
];

console.log('MÀN HÌNH'.padEnd(24) + 'NỘI DUNG BẮT ĐẦU   TRÀN   NÚT MÉO  LỆCH HÀNG');
console.log('─'.repeat(74));
const xau = [];
for (const [ten, url] of TRANG) {
  await ev(`(history.pushState({},'',${JSON.stringify(url)}),dispatchEvent(new PopStateEvent('popstate')))`);
  await new Promise((r) => setTimeout(r, 1700));
  await ev(`window.app?.closeAuth?.()`);
  await new Promise((r) => setTimeout(r, 250));
  const d = await ev(DO);
  if (!d) { console.log(ten.padEnd(24) + '  (không đo được)'); continue; }
  const pc = d.batDau != null ? (d.batDau / d.man * 100).toFixed(0) + '%' : '—';
  const co = d.meo.length + d.lech.length + (d.tranNgang ? 1 : 0);
  console.log(ten.padEnd(24) + String(d.batDau ?? '—').padStart(5) + 'px = ' + pc.padStart(4)
    + '   ' + String(d.tranNgang).padStart(4) + '   ' + String(d.meo.length).padStart(6)
    + '   ' + String(d.lech.length).padStart(6) + (co ? '' : '   ✅'));
  if (co) xau.push([ten, d]);
}
if (xau.length) {
  console.log('\n══════ CHI TIẾT ══════');
  for (const [ten, d] of xau) {
    console.log('\n▸ ' + ten);
    if (d.tranNgang) console.log(`   ✗ tràn ngang ${d.tranNgang}px`);
    for (const x of d.meo)  console.log(`   • nút méo   .${x.cls.padEnd(24)} ${x.w}×${x.h}  lệch ${x.lech}`);
    for (const x of d.lech) console.log(`   • lệch hàng .${x.cls.padEnd(24)} ${x.n} phần tử cao từ ${x.min} tới ${x.max}px`);
  }
}
ws.close();
