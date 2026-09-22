#!/usr/bin/env node
/**
 * Soát phần TƯƠNG TÁC trên WebView thật: vùng chạm đo bằng điểm chạm thật, thanh tab dính,
 * và độ mượt khi đổi trang / đổi tab.
 *
 *   node scripts/chay-android.mjs --debug
 *   adb forward tcp:9333 localabstract:webview_devtools_remote_$(adb shell pidof com.taiwanese.app.debug)
 *   node tests/mobile/soat-tuong-tac.mjs
 *
 * Khác `soat-ui.mjs` ở chỗ: bộ kia đo KÍCH THƯỚC khai trong CSS, bộ này đo thứ người dùng thật
 * sự chạm phải. Một nút 32px nới vùng chạm bằng lớp phủ ::after thì bộ kia vẫn báo nhỏ, còn bộ
 * này bắn tia vào điểm cách tâm 20px rồi hỏi `elementFromPoint` xem có trúng nút không.
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
const di = async (u) => { await ev(`(history.pushState({},'',${JSON.stringify(u)}),dispatchEvent(new PopStateEvent('popstate')))`);
  await new Promise((r) => setTimeout(r, 1700)); await ev(`window.app?.closeAuth?.()`); };

// ───────── 1. VÙNG CHẠM THẬT ─────────
const CHAM = `(() => {
  const xau = [];
  const nhin = (el) => { const s = getComputedStyle(el);
    if (s.display==='none'||s.visibility==='hidden'||+s.opacity===0) return false;
    const b = el.getBoundingClientRect();
    // Phải lọc CẢ TRỤC X: thanh bên khi đóng nằm ở left=-292 (ngoài màn), mọi nút trong đó
    // vẫn có kích thước nhưng elementFromPoint không bao giờ trúng — bỏ qua thì bảng kết quả
    // toàn báo "trúng 0/4" cho cả những nút to 270px, nhìn như app hỏng nặng.
    return b.width>0 && b.height>0 && b.top>-40 && b.top<innerHeight
        && b.left>=0 && b.right<=innerWidth+1; };
  for (const el of document.querySelectorAll('button, a[href], [onclick], [role=button]')) {
    if (!nhin(el)) continue;
    const b = el.getBoundingClientRect();
    const cx = b.left + b.width/2, cy = b.top + b.height/2;
    // Bắn 4 tia ra bốn phía tới mép của một ô chạm 44px lý tưởng
    let dat = 0;
    for (const [dx,dy] of [[-21,0],[21,0],[0,-21],[0,21]]) {
      const x = Math.max(1, Math.min(innerWidth-1, cx+dx));
      const y = Math.max(1, Math.min(innerHeight-1, cy+dy));
      const o = document.elementFromPoint(x, y);
      if (o && (o === el || el.contains(o) || o.contains(el))) dat++;
    }
    if (dat < 4) xau.push({ cls:(el.className||'').toString().split(' ')[0].slice(0,28),
      w:Math.round(b.width), h:Math.round(b.height), trung:dat,
      chu:(el.textContent||'').trim().slice(0,18) });
  }
  const m = new Map(); for (const x of xau) if (!m.has(x.cls)) m.set(x.cls, x);
  return [...m.values()].slice(0, 8);
})()`;

// ───────── 2. THANH TAB DÍNH ─────────
const DINH = `(async () => {
  const bar = document.querySelector('.dd-tab-bar');
  const sc  = document.getElementById('page-content');
  if (!bar || !sc) return { co:false, ly:'không thấy thanh tab hoặc khung cuộn' };
  const s = getComputedStyle(bar);
  // PHẢI dùng scrollTo({behavior:'instant'}): trang đặt scroll-behavior smooth, nên gán thẳng
  // scrollTop chỉ khởi động một hoạt ảnh, đọc lại ngay vẫn ra 0 — đo kiểu đó thì thấy trang
  // không nhúc nhích rồi kết luận nhầm là sticky hỏng.
  // (Chú thích này nằm trong một template literal: đừng dùng dấu huyền, nó cắt chuỗi.)
  const den = async (y) => { sc.scrollTo({ top: y, behavior: 'instant' });
    await new Promise(r=>setTimeout(r, 120)); return sc.scrollTop; };
  await den(0);
  const t0 = bar.getBoundingClientRect().top;
  const moc = [];
  for (const y of [200, 400, 700, 1100]) {
    const that = await den(y);
    moc.push({ cuon:that, top: Math.round(bar.getBoundingClientRect().top) });
  }
  await den(0);
  const mepKhung = Math.round(sc.getBoundingClientRect().top);
  return { position:s.position, top:s.top, zIndex:s.zIndex, topBanDau:Math.round(t0), moc, mepKhung };
})()`;

// ───────── 3. ĐỘ MƯỢT ─────────
const MUOT = `(async () => {
  const dem = () => new Promise(res => {
    let n = 0; const t0 = performance.now();
    const tick = () => { n++; performance.now()-t0 < 600 ? requestAnimationFrame(tick)
      : res(Math.round(n / ((performance.now()-t0)/1000))); };
    requestAnimationFrame(tick);
  });
  const el = document.getElementById('page-content');
  const truoc = getComputedStyle(el).animationName;
  window.app.navigate('pron-thanhmau');
  const fps = await dem();
  const sau = getComputedStyle(el).animationName;
  return { fps, animTruoc: truoc, animSau: sau,
    coAnim: sau !== 'none' && sau !== '' };
})()`;

console.log('════ 1. VÙNG CHẠM THẬT (bắn tia ±21px quanh tâm nút) ════\n');
for (const [ten, url] of [['Trang chủ','/'], ['Từ vựng','/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung'],
                          ['Học phát âm','/hoc-phat-am/thanh-mau'], ['Bảng phiên âm','/hoc-phat-am/bang-phien-am']]) {
  await di(url);
  const r = await ev(CHAM);
  console.log(`▸ ${ten}  —  ${r.length ? r.length + ' nút chưa đủ vùng chạm' : '✅ mọi nút đủ 44px'}`);
  for (const x of r) console.log(`     .${x.cls.padEnd(24)} ${x.w}×${x.h}  trúng ${x.trung}/4 hướng  "${x.chu}"`);
}

console.log('\n════ 2. THANH TAB DÍNH KHI CUỘN ════\n');
await di('/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung');
const d = await ev(DINH);
if (d.co === false) console.log('  ' + d.ly);
else {
  console.log(`  position=${d.position}  top=${d.top}  z-index=${d.zIndex}`);
  console.log(`  chưa cuộn: thanh tab ở y=${d.topBanDau}px`);
  // Sticky dính vào mép trên của KHUNG CUỘN (#page-content nằm dưới thanh tiêu đề), nên mốc
  // đúng là mép khung chứ không phải y=0 của màn hình.
  console.log(`  mép trên khung cuộn: y=${d.mepKhung}px  <- đây mới là mốc "đã dính"`);
  for (const m of d.moc) console.log(`  cuộn ${String(Math.round(m.cuon)).padStart(4)}px  ->  thanh tab ở y=${String(m.top).padStart(4)}px  ${Math.abs(m.top - d.mepKhung) <= 10 ? '✅ dính' : '✗ trôi theo'}`);
}

console.log('\n════ 3. ĐỘ MƯỢT KHI ĐỔI TRANG ════\n');
await di('/');
const mu = await ev(MUOT);
console.log(`  khung hình/giây khi đổi trang : ${mu.fps}`);
console.log(`  hiệu ứng vào trang            : ${mu.coAnim ? '✅ có (' + mu.animSau + ')' : '✗ KHÔNG chạy'}`);
ws.close();
