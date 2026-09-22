#!/usr/bin/env node
/**
 * Chạy app trên máy ảo Android ngay tại máy này.
 *
 *   node scripts/chay-android.mjs              # bật máy ảo, cài bản release, mở app
 *   node scripts/chay-android.mjs --debug      # dùng bản debug (xem được console qua chrome://inspect)
 *   node scripts/chay-android.mjs --dung       # tắt máy ảo
 *   node scripts/chay-android.mjs --anh ten    # chụp màn hình máy ảo ra store/anh-may-ao/ten.png
 *   node scripts/chay-android.mjs --log        # xem log của app (lọc sẵn phần WebView)
 *
 * VÌ SAO CẦN THỬ TRÊN MÁY ẢO chứ không chỉ tin bộ kiểm bằng trình duyệt: hai thứ chỉ máy ảo mới
 * bắt được.
 *   1. Rút gọn mã (minify/ProGuard) chỉ chạy ở bản release. Đổi tên lớp sai là app cài vào MỞ RA
 *      TRẮNG MÀN HÌNH, logcat sạch trơn — bản dựng vẫn "thành công".
 *   2. Từ Android 15 (API 35), app khai targetSdk 35+ bị ép tràn viền (edge-to-edge): thanh trạng
 *      thái đè lên nội dung. Trình duyệt không mô phỏng được điều đó.
 */
import { execFileSync, execFile, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const co = (t) => args.includes(t);
const sau = (t) => { const i = args.indexOf(t); return i >= 0 ? args[i + 1] : null; };

// Cùng cách dò như build-apk.mjs: kiểm tra đường dẫn CÓ THẬT rồi mới dùng, vì JAVA_HOME trên máy
// này trỏ tới một bản JDK đã bị xoá.
const chon = (ten, ...ds) => {
  for (const p of ds) if (p && fs.existsSync(p)) return p;
  console.error(`❌ Không tìm thấy ${ten}. Đã thử: ${ds.filter(Boolean).join(', ')}`);
  process.exit(1);
};
const SDK = chon('ANDROID_HOME', process.env.ANDROID_HOME, process.env.ANDROID_SDK_ROOT,
  '/usr/local/share/android-commandlinetools', '/opt/homebrew/share/android-commandlinetools',
  path.join(process.env.HOME || '', 'Library/Android/sdk'));
const JAVA = chon('JAVA_HOME', process.env.JAVA_HOME, '/usr/local/opt/openjdk@21',
  '/opt/homebrew/opt/openjdk@21');

const ADB = path.join(SDK, 'platform-tools/adb');
const EMU = path.join(SDK, 'emulator/emulator');
const AVDMAN = path.join(SDK, 'cmdline-tools/latest/bin/avdmanager');
const MOI_TRUONG = { ...process.env, ANDROID_HOME: SDK, ANDROID_SDK_ROOT: SDK, JAVA_HOME: JAVA };
const AVD = 'ten-test';
const GOI = 'com.taiwanese.app';

const chay = (f, a, opt = {}) =>
  execFileSync(f, a, { env: MOI_TRUONG, encoding: 'utf8', stdio: opt.im ? ['ignore', 'pipe', 'pipe'] : 'inherit', ...opt });
const thu = (f, a) => { try { return chay(f, a, { im: true }); } catch { return ''; } };

// ---------- tắt ----------
if (co('--dung')) {
  thu(ADB, ['emu', 'kill']);
  console.log('✓ đã tắt máy ảo');
  process.exit(0);
}

// ---------- chụp màn hình ----------
if (co('--anh')) {
  const ten = sau('--anh') || 'man-hinh';
  const raw = path.join(GOC, 'store/anh-may-ao');
  fs.mkdirSync(raw, { recursive: true });
  const f = path.join(raw, `${ten}.png`);
  const buf = execFileSync(ADB, ['exec-out', 'screencap', '-p'], { env: MOI_TRUONG, maxBuffer: 64 * 1024 * 1024 });
  fs.writeFileSync(f, buf);
  console.log(`✓ ${path.relative(GOC, f)}  (${(buf.length / 1024).toFixed(0)} KB)`);
  process.exit(0);
}

// ---------- xem log ----------
if (co('--log')) {
  // Lọc sẵn phần WebView và Capacitor: logcat đầy đủ trôi quá nhanh để đọc được gì.
  const p = spawn(ADB, ['logcat', '-v', 'brief', 'chromium:D', 'Capacitor:V', 'CapacitorConsole:V',
    'SystemWebViewClient:V', 'AndroidRuntime:E', '*:S'], { env: MOI_TRUONG, stdio: 'inherit' });
  process.on('SIGINT', () => p.kill());
  await new Promise(() => {});
}

// ---------- tạo máy ảo nếu chưa có ----------
const dsAvd = thu(EMU, ['-list-avds']);
if (!dsAvd.includes(AVD)) {
  // Ảnh hệ thống phải là arm64-v8a: máy này là Apple Silicon, dùng ảnh x86 thì máy ảo phải
  // phiên dịch từng lệnh, chậm tới mức không dùng được.
  const anh = 'system-images;android-36;google_apis;arm64-v8a';
  console.log(`⚙️  Tạo máy ảo "${AVD}" …`);
  execFileSync(AVDMAN, ['create', 'avd', '-n', AVD, '-k', anh, '-d', 'pixel_7', '--force'],
    { env: MOI_TRUONG, input: 'no\n', stdio: ['pipe', 'inherit', 'inherit'] });

  // Sửa cấu hình cho hợp việc thử app học tập: RAM rộng tay, bàn phím máy tính gõ thẳng vào
  // được (đỡ phải bấm bàn phím ảo khi nhập bài dịch).
  const cfg = path.join(process.env.HOME, `.android/avd/${AVD}.avd/config.ini`);
  if (fs.existsSync(cfg)) {
    let s = fs.readFileSync(cfg, 'utf8');
    const dat = { 'hw.ramSize': '4096', 'hw.keyboard': 'yes', 'vm.heapSize': '512',
      'hw.lcd.density': '420', 'disk.dataPartition.size': '6G' };
    for (const [k, v] of Object.entries(dat)) {
      s = s.match(new RegExp(`^${k.replace(/\./g, '\\.')}=.*$`, 'm'))
        ? s.replace(new RegExp(`^${k.replace(/\./g, '\\.')}=.*$`, 'm'), `${k}=${v}`)
        : s + `\n${k}=${v}`;
    }
    fs.writeFileSync(cfg, s);
  }
  console.log('✓ đã tạo máy ảo');
}

// ---------- bật máy ảo ----------
const dangChay = thu(ADB, ['devices']).includes('emulator-');
if (!dangChay) {
  console.log('⚙️  Bật máy ảo … (lần đầu mất 1-2 phút)');
  const p = spawn(EMU, ['-avd', AVD, '-no-boot-anim', '-no-snapshot-save', '-gpu', 'auto'],
    { env: MOI_TRUONG, detached: true, stdio: 'ignore' });
  p.unref();
  execFileSync(ADB, ['wait-for-device'], { env: MOI_TRUONG, stdio: 'inherit' });
  // `wait-for-device` chỉ đợi máy ảo NHẬN LỆNH được, chưa phải khởi động xong. Cài app quá sớm
  // thì gặp "Package manager has died". Phải đợi sys.boot_completed.
  process.stdout.write('   đợi hệ điều hành khởi động xong ');
  for (let i = 0; i < 120; i++) {
    if (thu(ADB, ['shell', 'getprop', 'sys.boot_completed']).trim() === '1') break;
    process.stdout.write('.');
    execFileSync('/bin/sleep', ['2']);
  }
  console.log(' xong');
} else {
  console.log('✓ máy ảo đang chạy sẵn');
}

// ---------- cài app ----------
const loai = co('--debug') ? 'debug' : 'release';
const apk = path.join(GOC, `android/app/build/outputs/apk/${loai}/app-${loai}.apk`);
if (!fs.existsSync(apk)) {
  console.error(`❌ Chưa có ${path.relative(GOC, apk)}`);
  console.error(`   Dựng bằng: node scripts/build-apk.mjs${loai === 'debug' ? ' --debug' : ''}`);
  process.exit(1);
}
const goiThat = loai === 'debug' ? `${GOI}.debug` : GOI;
console.log(`⚙️  Cài bản ${loai} …`);
thu(ADB, ['uninstall', goiThat]);           // gỡ bản cũ để không vướng khác chữ ký
chay(ADB, ['install', '-r', apk]);

// ---------- mở app ----------
chay(ADB, ['shell', 'monkey', '-p', goiThat, '-c', 'android.intent.category.LAUNCHER', '1'], { stdio: 'ignore' });
console.log(`\n✅ Đã mở "${goiThat}" trên máy ảo.`);
console.log('   Xem log   : node scripts/chay-android.mjs --log');
console.log('   Chụp màn  : node scripts/chay-android.mjs --anh ten-anh');
console.log('   Tắt máy ảo: node scripts/chay-android.mjs --dung');
if (loai === 'debug') console.log('   Console JS: mở Chrome -> chrome://inspect');
