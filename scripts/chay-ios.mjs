#!/usr/bin/env node
/**
 * Dựng và chạy app trên iOS Simulator ngay tại máy này.
 *
 *   node scripts/chay-ios.mjs                 # dựng + cài + mở trên máy ảo
 *   node scripts/chay-ios.mjs --may "iPhone 17 Pro"
 *   node scripts/chay-ios.mjs --anh ten       # chụp màn hình ra store/anh-may-ao-ios/
 *   node scripts/chay-ios.mjs --log           # xem log của app
 *   node scripts/chay-ios.mjs --dung          # tắt máy ảo
 *
 * KHÔNG cần tài khoản Apple Developer: máy ảo chạy được bằng chữ ký tạm của Xcode. Chỉ khi
 * đưa lên máy thật hoặc nộp App Store mới cần tài khoản trả phí.
 */
import { execFileSync, execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const co = (t) => args.includes(t);
const sau = (t) => { const i = args.indexOf(t); return i >= 0 ? args[i + 1] : null; };
const GOI = 'com.taiwanese.app';

const chay = (c, opt = {}) => execSync(c, { cwd: GOC, encoding: 'utf8', stdio: opt.im ? 'pipe' : 'inherit', ...opt });
const thu = (c) => { try { return chay(c, { im: true }); } catch { return ''; } };

// ---- kiểm tra Xcode dùng được chưa ----
// Phải hỏi bằng `-showsdks` chứ KHÔNG phải `-version`: `-version` in ra số hiệu bình thường
// ngay cả khi chưa đồng ý điều khoản, nên dùng nó để kiểm thì lọt.
const loiXcode = thu('xcodebuild -showsdks 2>&1');
if (/license/i.test(loiXcode) || !loiXcode.trim()) {
  console.error('❌ Xcode chưa dùng được. Chạy MỘT LẦN trong Terminal (cần mật khẩu máy):\n');
  console.error('   sudo xcodebuild -license accept');
  console.error('   sudo xcodebuild -runFirstLaunch');
  console.error('   xcodebuild -downloadPlatform iOS\n');
  console.error('Hoặc chỉ cần mở Xcode.app một lần rồi bấm Agree khi nó hỏi.');
  process.exit(1);
}

if (co('--dung')) { thu('xcrun simctl shutdown all'); console.log('✓ đã tắt máy ảo iOS'); process.exit(0); }

// ---- chọn máy ảo ----
const ds = JSON.parse(thu('xcrun simctl list devices available --json') || '{"devices":{}}');
const tatCa = Object.entries(ds.devices).flatMap(([rt, ms]) => ms.map((m) => ({ ...m, rt })));
if (!tatCa.length) {
  console.error('❌ Chưa có máy ảo iOS nào. Tải nền tảng iOS bằng:\n   xcodebuild -downloadPlatform iOS');
  process.exit(1);
}
const ten = sau('--may');
// Ưu tiên máy đang bật, rồi tới iPhone đời mới nhất — tên máy đổi theo từng bản Xcode nên
// KHÔNG gắn cứng một model nào.
const may = (ten && tatCa.find((m) => m.name === ten))
  || tatCa.find((m) => m.state === 'Booted')
  || tatCa.filter((m) => /^iPhone/.test(m.name)).sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))[0]
  || tatCa[0];
console.log(`📱 Máy ảo: ${may.name}  (${may.rt.split('.').pop()})`);

if (co('--anh')) {
  const raw = path.join(GOC, 'store/anh-may-ao-ios'); fs.mkdirSync(raw, { recursive: true });
  const f = path.join(raw, `${sau('--anh') || 'man-hinh'}.png`);
  chay(`xcrun simctl io ${may.udid} screenshot "${f}"`);
  console.log(`✓ ${path.relative(GOC, f)}`);
  process.exit(0);
}
if (co('--log')) {
  spawn('xcrun', ['simctl', 'spawn', may.udid, 'log', 'stream', '--level', 'debug',
    '--predicate', `subsystem CONTAINS "${GOI}" OR process == "App"`], { stdio: 'inherit' });
  await new Promise(() => {});
}

if (may.state !== 'Booted') { console.log('⚙️  Bật máy ảo …'); thu(`xcrun simctl boot ${may.udid}`); }
thu('open -a Simulator');

// ---- dựng ----
// Ký bằng chữ ký tạm: máy ảo không kiểm chứng thư, nên không cần tài khoản Apple Developer.
console.log('\n🔨 Dựng cho máy ảo … (lần đầu mất vài phút)\n');
const RA = path.join(GOC, 'ios/App/build-sim');
chay(`xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Debug `
  + `-sdk iphonesimulator -destination "id=${may.udid}" -derivedDataPath "${RA}" `
  + `CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO build`);

const app = path.join(RA, 'Build/Products/Debug-iphonesimulator/App.app');
if (!fs.existsSync(app)) { console.error(`❌ Không thấy ${app}`); process.exit(1); }

console.log('\n⚙️  Cài và mở …');
thu(`xcrun simctl uninstall ${may.udid} ${GOI}`);
chay(`xcrun simctl install ${may.udid} "${app}"`);
chay(`xcrun simctl launch ${may.udid} ${GOI}`);

console.log(`\n✅ Đã mở "${GOI}" trên ${may.name}.`);
console.log('   Chụp màn : node scripts/chay-ios.mjs --anh ten-anh');
console.log('   Xem log  : node scripts/chay-ios.mjs --log');
console.log('   Tắt      : node scripts/chay-ios.mjs --dung');
