// Điều hướng qua CDP rồi chụp bằng adb — để xem giao diện thật ở nhiều màn.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const CONG = process.env.CDP_PORT || 9333;
const ADB = '/usr/local/share/android-commandlinetools/platform-tools/adb';
const RA = 'store/soat-ui'; fs.mkdirSync(RA, { recursive: true });

const ds = await (await fetch(`http://localhost:${CONG}/json`)).json();
const t = ds.find(x => x.type === 'page' && x.webSocketDebuggerUrl);
const ws = new WebSocket(t.webSocketDebuggerUrl);
let id = 0; const cho = new Map();
const goi = (m, p = {}) => new Promise(r => { const i = ++id; cho.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && cho.has(m.id)) { cho.get(m.id)(m.result); cho.delete(m.id); } };
await new Promise(r => ws.onopen = r);
await goi('Runtime.enable');
const ev = js => goi('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true });

const MAN = [
  ['a-trang-chu', '/'],
  ['b-tu-vung', '/tocfl/giao-trinh-duong-dai/bai-1-1/tu-vung'],
  ['c-flashcard', '/tocfl/giao-trinh-duong-dai/bai-1-1/flashcard'],
  ['d-ngu-phap', '/tocfl/giao-trinh-duong-dai/bai-1-1/ngu-phap'],
  ['e-hoi-thoai', '/tocfl/giao-trinh-duong-dai/bai-1-1/hoi-thoai'],
  ['f-luyen-viet', '/tocfl/giao-trinh-duong-dai/bai-1-1/luyen-viet'],
  ['g-game', '/tocfl/giao-trinh-duong-dai/bai-1-1/game'],
  ['h-bai-tap', '/tocfl/giao-trinh-duong-dai/bai-1-2/bai-tap'],
  ['i-phat-am', '/hoc-phat-am/thanh-mau'],
  ['j-thanh-dieu', '/hoc-phat-am/thanh-dieu'],
  ['k-bang-phien-am', '/hoc-phat-am/bang-phien-am'],
  ['l-thi-thu', '/tocfl/thi-thu'],
  ['m-van-hoa', '/tocfl/giao-trinh-duong-dai/bai-1-van-hoa'],
];
for (const [ten, url] of MAN) {
  await ev(`(history.pushState({},'',${JSON.stringify(url)}), dispatchEvent(new PopStateEvent('popstate')))`);
  await new Promise(r => setTimeout(r, 1800));
  // Đóng mọi hộp thoại đang đè lên: tường đăng nhập bật ở vài tab, che mất trang cần xem.
  // Đóng tường đăng nhập bằng ĐÚNG hàm của app: xoá class thì renderer bật lại ngay ở lần
  // vẽ kế tiếp, ảnh chụp ra vẫn thấy hộp thoại che kín trang.
  await ev(`window.app?.closeAuth?.(); window.app?.closeDialog?.();
            document.querySelectorAll('.modal.active').forEach(m=>m.classList.remove('active'))`);
  await new Promise(r => setTimeout(r, 500));
  const buf = execFileSync(ADB, ['exec-out', 'screencap', '-p'], { maxBuffer: 64e6 });
  fs.writeFileSync(`${RA}/${ten}.png`, buf);
  console.log(`  ✓ ${ten}.png`);
}
ws.close();
