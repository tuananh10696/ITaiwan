#!/usr/bin/env node
/**
 * Chẩn đoán luồng ĐĂNG NHẬP trong app, đọc thẳng request và response thật.
 *
 * Dùng tài khoản CHẮC CHẮN SAI: mục đích không phải đăng nhập được, mà là xem app có gửi được
 * yêu cầu tới đúng máy chủ không và nhận về gì. Ba kết cục phân biệt rõ ba nguyên nhân khác nhau:
 *   401 kèm "Email hoặc mật khẩu không đúng"  -> luồng CHẠY ĐÚNG, lỗi nằm ở thông tin đăng nhập
 *   không có yêu cầu nào                       -> app chưa gửi đi (lỗi mã, hoặc bấm không ăn)
 *   yêu cầu lỗi mạng / bị CORS chặn            -> lỗi cấu hình máy chủ hoặc origin
 */
const CONG = process.env.CDP_PORT || 9333;
const ds = await (await fetch(`http://localhost:${CONG}/json`)).json();
const t = ds.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
if (!t) { console.error('Không thấy WebView.'); process.exit(1); }
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id = 0; const cho = new Map();
const goi = (m, p = {}) => new Promise((r) => { const i = ++id; cho.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });

const req = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && cho.has(m.id)) { cho.get(m.id)(m.result); cho.delete(m.id); return; }
  const p = m.params || {};
  if (m.method === 'Network.requestWillBeSent' && /\/api\//.test(p.request?.url || ''))
    req.set(p.requestId, { url: p.request.url, method: p.request.method });
  if (m.method === 'Network.responseReceived' && req.has(p.requestId))
    Object.assign(req.get(p.requestId), { status: p.response.status, mime: p.response.mimeType });
  if (m.method === 'Network.loadingFailed' && req.has(p.requestId))
    Object.assign(req.get(p.requestId), { loi: p.errorText, chanCors: p.blockedReason });
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
    console.log('   [console]', (m.params.args || []).map(a => a.value ?? a.description ?? '').join(' ').slice(0, 160));
};
await new Promise((r) => (ws.onopen = r));
await goi('Runtime.enable'); await goi('Network.enable');
const ev = async (js) => (await goi('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true }))?.result?.value;

console.log('URL trong app :', await ev('location.href'));
console.log('Chạy native   :', await ev('!!(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform())'));
console.log('Đã có token   :', await ev(`!!localStorage.getItem('tw_token')`));

// Gọi thẳng api.login qua đúng đường mã của app, không giả lập fetch riêng
// Mở hộp đăng nhập trước, nếu không thì không có ô nhập nào để điền.
await ev(`window.app?.openAuth?.()`);
await new Promise(r => setTimeout(r, 900));
console.log('\n→ điền tài khoản chắc chắn sai rồi bấm Đăng nhập …\n');
const kq = await ev(`(async () => {
  try {
    // window.app.login là hàm xử lý biểu mẫu; gọi thẳng ApiClient qua biểu mẫu thật thì sát hơn
    const em = document.getElementById('login-email') || document.querySelector('input[type=email]');
    const pw = document.getElementById('login-password') || document.querySelector('input[type=password]');
    if (!em || !pw) return 'KHÔNG THẤY ô nhập — biểu mẫu đăng nhập chưa mở';
    em.value = 'khong-ton-tai-abc@test.invalid'; pw.value = 'saibet123';
    em.dispatchEvent(new Event('input', {bubbles:true})); pw.dispatchEvent(new Event('input', {bubbles:true}));
    // Phải submit CHÍNH BIỂU MẪU: nút gửi không có onclick, luồng đăng nhập nằm ở trình nghe
    // 'submit' của #login-form. Bấm .click() lên nút thì trong vài trình duyệt không sinh ra sự
    // kiện submit, và ta ngồi kết luận nhầm là "app không gửi gì đi".
    const f = document.getElementById('login-form');
    if (!f) return 'KHÔNG THẤY #login-form';
    if (f.requestSubmit) f.requestSubmit();
    else f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    return 'đã gửi biểu mẫu #login-form';
  } catch (e) { return 'lỗi: ' + e.message; }
})()`);
console.log('  ', kq);

await new Promise((r) => setTimeout(r, 5000));

console.log('\n── Yêu cầu tới /api/ bắt được ──');
if (!req.size) console.log('   ⚠️ KHÔNG có yêu cầu nào — app chưa gửi gì đi.');
for (const r of req.values()) {
  console.log(`   ${r.method} ${r.url}`);
  console.log(`      ${r.loi ? '❌ ' + r.loi + (r.chanCors ? ' (bị chặn: ' + r.chanCors + ')' : '') : 'HTTP ' + r.status + ' ' + (r.mime||'')}`);
}
const bao = await ev(`(document.querySelector('.auth-error, .form-error, .error-msg, [class*=error]')||{}).textContent || '(không thấy thông báo lỗi trên màn)'`);
console.log('\nThông báo app hiện ra:', String(bao).trim().slice(0, 120));
ws.close();
