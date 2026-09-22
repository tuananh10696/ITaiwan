#!/usr/bin/env node
/**
 * Đọc THẲNG hoạt động mạng của app đang chạy trên máy ảo Android.
 *
 *   node scripts/chay-android.mjs --debug          # cài bản debug (bản release không mở gỡ lỗi)
 *   adb forward tcp:9222 localabstract:webview_devtools_remote_$(adb shell pidof com.taiwanese.app.debug)
 *   node tests/mobile/doc-mang-app.mjs
 *
 * VÌ SAO CẦN: ảnh chụp màn hình cho biết giao diện dựng đúng, nhưng KHÔNG cho biết app gọi mạng
 * tới đâu. Mà đó lại là chỗ hỏng êm nhất của bản native — gọi sai máy chủ thì `ddSpeakWord` tự
 * rơi về giọng máy, `request()` chỉ báo "Không thể kết nối server", không có lỗi nào chỉ ra
 * nguyên nhân. Công cụ này đọc từng request thật, kèm mã trạng thái và số byte.
 *
 * Playwright KHÔNG dùng được ở đây: `connectOverCDP` đòi phần quản lý ngữ cảnh trình duyệt mà
 * WebView của Android không có ("Browser context management is not supported"). Nên nói chuyện
 * thẳng bằng giao thức CDP qua WebSocket sẵn có của Node.
 */
const trang = ds.find(x => x.type === 'page' && x.webSocketDebuggerUrl);
if (!trang) { console.error('Không thấy trang nào'); process.exit(1); }
console.log('Trang:', trang.url);

const ws = new WebSocket(trang.webSocketDebuggerUrl);
let id = 0;
const cho = new Map();
const goi = (method, params = {}) => new Promise(res => {
  const i = ++id; cho.set(i, res); ws.send(JSON.stringify({ id: i, method, params }));
});

const audio = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && cho.has(m.id)) { cho.get(m.id)(m.result); cho.delete(m.id); return; }
  if (m.method === 'Network.requestWillBeSent' && /\.(mp3|m4a|wav)/i.test(m.params.request.url))
    audio.push({ url: m.params.request.url, id: m.params.requestId });
  if (m.method === 'Network.responseReceived') {
    const a = audio.find(x => x.id === m.params.requestId);
    if (a) { a.status = m.params.response.status; a.mime = m.params.response.mimeType; }
  }
  if (m.method === 'Network.loadingFinished') {
    const a = audio.find(x => x.id === m.params.requestId);
    if (a) a.bytes = m.params.encodedDataLength;
  }
  if (m.method === 'Network.loadingFailed') {
    const a = audio.find(x => x.id === m.params.requestId);
    if (a) a.loi = m.params.errorText;
  }
};
await new Promise(r => ws.onopen = r);
await goi('Network.enable');
await goi('Runtime.enable');

const ev = async (js) => (await goi('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true }))?.result?.value;

console.log('Số nút loa:', await ev(`document.querySelectorAll('[onclick*="ddSpeakWord"]').length`));
console.log('onclick mẫu:', String(await ev(`(document.querySelector('[onclick*="ddSpeakWord"]')||{}).getAttribute?.('onclick')||'(không có)'`)).slice(0, 160));

console.log('\n→ bấm nút loa đầu tiên …');
await ev(`(document.querySelector('[onclick*="ddSpeakWord"]')||{click(){}}).click()`);
await new Promise(r => setTimeout(r, 5000));

console.log('\nRequest audio bắt được:', audio.length);
for (const a of audio) {
  console.log(`  ${a.status ?? '-'} ${a.mime ?? ''} ${a.bytes ?? '?'}B ${a.loi ? '❌ ' + a.loi : ''}`);
  console.log(`     ${a.url}`);
}
if (!audio.length) console.log('  ⚠️ KHÔNG có request audio nào — nút không gọi mp3, hoặc rơi thẳng về giọng máy.');
ws.close();
