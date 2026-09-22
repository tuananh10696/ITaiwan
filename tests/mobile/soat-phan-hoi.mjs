#!/usr/bin/env node
/**
 * Kiểm chứng PHẢN HỒI KHI NHẤN thật sự chạy trên WebView.
 *
 * Không đọc CSS rồi tin: một selector đặt sai chỗ, một `!important` ở đâu đó, hay đơn giản là
 * quên dựng lại bản mobile đều làm quy tắc thành vô nghĩa mà nhìn mã vẫn thấy ổn. Ở đây ép
 * trạng thái `:active` bằng `CSS.forcePseudoState` rồi đo `transform` thật sự được áp.
 *
 * ⚠️ Bản đầu của bộ kiểm này bắn `Input.dispatchTouchEvent` cho giống ngón tay thật — và nhận
 * về 0/6 thành phần có phản hồi, trông như toàn bộ phần vừa viết đều hỏng. Thực ra sự kiện
 * chạm do CDP tổng hợp KHÔNG kích hoạt `:active` trong WebView; ép trạng thái thì thấy quy tắc
 * chạy đúng. Bài học: khi phép đo cho kết quả "hỏng sạch", hãy nghi phép đo trước.
 */
const CONG = process.env.CDP_PORT || 9333;
const ds = await (await fetch(`http://localhost:${CONG}/json`)).json();
const t = ds.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id = 0; const cho = new Map();
const goi = (m, p = {}) => new Promise((r) => { const i = ++id; cho.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && cho.has(m.id)) { cho.get(m.id)(m.result); cho.delete(m.id); } };
await new Promise((r) => (ws.onopen = r));
await goi('Runtime.enable'); await goi('DOM.enable'); await goi('CSS.enable');
const ev = async (js) => (await goi('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true }))?.result?.value;
const di = async (u) => { await ev(`(history.pushState({},'',${JSON.stringify(u)}),dispatchEvent(new PopStateEvent('popstate')))`);
  await new Promise((r) => setTimeout(r, 1700)); await ev(`window.app?.closeAuth?.()`); };

async function thuNhan(sel) {
  const co = await ev(`!!document.querySelector(${JSON.stringify(sel)})`);
  if (!co) return { sel, bo: true };
  const doc = await goi('DOM.getDocument', { depth: -1 });
  const n = await goi('DOM.querySelector', { nodeId: doc.root.nodeId, selector: sel });
  if (!n.nodeId) return { sel, bo: true };

  const doc_ = (js) => ev(`getComputedStyle(document.querySelector(${JSON.stringify(sel)})).${js}`);
  const truoc = await doc_('transform');
  await goi('CSS.forcePseudoState', { nodeId: n.nodeId, forcedPseudoClasses: ['active'] });
  await new Promise((r) => setTimeout(r, 120));
  const trong = await doc_('transform');
  await goi('CSS.forcePseudoState', { nodeId: n.nodeId, forcedPseudoClasses: [] });
  // Đợi 500ms chứ không 260ms: một số thành phần dùng --dur = 0.28s cho lúc nhả ra, đo sớm thì
  // bắt được lúc đang trên đường trở về (scale 0.974) rồi kết luận nhầm là "kẹt ở trạng thái nhấn".
  await new Promise((r) => setTimeout(r, 500));
  const sau = await doc_('transform');

  return { sel, truoc, trong, sau, doi: trong !== truoc, veCu: sau === truoc };
}

const BO = [
  ['Trang chủ', '/', ['.roadmap-card', '.btn-mobile-menu', '.mnav-item', '.hero-btn-primary, .btn-primary']],
  ['Từ vựng', '/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung', ['.dd-tab-btn', '.dd-vocab-item', '.dd-btn-speak']],
  ['Học phát âm', '/hoc-phat-am/thanh-mau', ['.pron-card-head', '.pron-speedpick-btn', '.pron-card-speaker']],
  ['Bảng phiên âm', '/hoc-phat-am/bang-phien-am', ['.py-cell']],
];

console.log('Ép trạng thái :active rồi nhả — đo transform ở ba thời điểm\n');
let ok = 0, hong = 0, bo = 0;
for (const [ten, url, sels] of BO) {
  await di(url);
  console.log(`▸ ${ten}`);
  for (const sel of sels) {
    const r = await thuNhan(sel);
    if (r.bo) { console.log(`   ${sel.padEnd(34)} — không có trên màn, bỏ qua`); bo++; continue; }
    const dau = r.doi ? (r.veCu ? '✅' : '⚠️') : '✗';
    const ghi = r.doi ? (r.veCu ? 'có phản hồi, nhả ra trở lại đúng' : 'có phản hồi nhưng KHÔNG trở về trạng thái cũ')
                      : 'KHÔNG phản hồi khi nhấn';
    console.log(`   ${dau} ${sel.padEnd(32)} ${ghi}`);
    if (r.doi && r.veCu) ok++; else hong++;
  }
}
console.log(`\nKết quả: ${ok} thành phần có phản hồi đúng · ${hong} có vấn đề · ${bo} không xuất hiện trên màn`);
ws.close();
process.exit(hong ? 1 : 0);
