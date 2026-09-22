#!/usr/bin/env node
// Dựng gói cài đặt Android. Mặc định ra APK (cài thẳng vào máy để thử);
// thêm `--aab` để ra Android App Bundle — định dạng BẮT BUỘC khi nộp Google Play.
//
// Script tự đặt JAVA_HOME và ANDROID_HOME nên không phải sửa ~/.zshrc. Nếu máy đã có sẵn hai
// biến đó thì tôn trọng giá trị của máy.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AAB = process.argv.includes('--aab');
const DEBUG = process.argv.includes('--debug');

// Chọn bộ công cụ theo thứ tự: biến môi trường của máy (nếu đường dẫn CÓ THẬT) -> nơi Homebrew
// cài -> nơi Android Studio cài.
//
// Phải kiểm tra tồn tại chứ không chỉ đọc biến: máy này đang có JAVA_HOME trỏ tới một bản JDK 14
// bản Linux đã bị xoá từ lâu. Tin biến đó thì Gradle chết với thông báo khó hiểu về trình biên
// dịch, trong khi máy vẫn có sẵn JDK 21 dùng được ngay bên cạnh.
const chon = (ten, ...ungVien) => {
  for (const p of ungVien) if (p && fs.existsSync(p)) return p;
  console.error(`❌ Không tìm thấy ${ten}. Đã thử: ${ungVien.filter(Boolean).join(', ')}`);
  console.error('   Cài bằng: brew install openjdk@21 && brew install --cask android-commandlinetools');
  process.exit(1);
};

const JAVA = chon('JAVA_HOME',
  process.env.JAVA_HOME,
  '/usr/local/opt/openjdk@21',
  '/opt/homebrew/opt/openjdk@21',
  '/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home');

const SDK = chon('ANDROID_HOME',
  process.env.ANDROID_HOME,
  process.env.ANDROID_SDK_ROOT,
  '/usr/local/share/android-commandlinetools',
  '/opt/homebrew/share/android-commandlinetools',
  path.join(process.env.HOME || '', 'Library/Android/sdk'));

// Gradle đọc JAVA_HOME thừa kế từ tiến trình này; Gradle 8 từ chối chạy trên JDK 14.
const ver = execFileSync(path.join(JAVA, 'bin/java'), ['-version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  + execFileSync(path.join(JAVA, 'bin/java'), ['-version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const so = Number((ver.match(/version "(\d+)/) || [])[1] || 0);
if (so && so < 17) {
  console.error(`❌ ${JAVA} là JDK ${so}. Gradle của Capacitor 8 cần JDK 17 trở lên.`);
  process.exit(1);
}
console.log(`   JDK  : ${JAVA}`);
console.log(`   SDK  : ${SDK}`);

// Gradle đọc đường dẫn SDK từ file này. Ghi lại mỗi lần dựng để máy nào chạy cũng đúng —
// file nằm trong .gitignore vì đường dẫn khác nhau theo từng máy.
fs.writeFileSync(path.join(GOC, 'android/local.properties'), `sdk.dir=${SDK}\n`);

const khoa = path.join(GOC, 'android/keystore/keystore.properties');
if (!DEBUG && !fs.existsSync(khoa)) {
  console.error('❌ Thiếu android/keystore/keystore.properties — không ký được bản phát hành.');
  console.error('   Google Play từ chối gói ký bằng khoá gỡ lỗi, và thông báo lỗi ở đó rất khó lần.');
  process.exit(1);
}

const viec = DEBUG ? 'assembleDebug' : (AAB ? 'bundleRelease' : 'assembleRelease');
console.log(`\n🔨 Gradle ${viec} …  (lần đầu tải Gradle + thư viện, có thể mất vài phút)\n`);

execFileSync('./gradlew', [viec, '--no-daemon'], {
  cwd: path.join(GOC, 'android'),
  stdio: 'inherit',
  env: { ...process.env, JAVA_HOME: JAVA, ANDROID_HOME: SDK, ANDROID_SDK_ROOT: SDK },
});

// ---- Tìm và báo cáo sản phẩm ----
const thuMuc = path.join(GOC, 'android/app/build/outputs', AAB ? 'bundle' : 'apk');
const timFile = (d, duoi) => {
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? timFile(p, duoi) : (e.name.endsWith(duoi) ? [p] : []);
  });
};
const ra = timFile(thuMuc, AAB ? '.aab' : '.apk');
if (!ra.length) { console.error('❌ Gradle chạy xong nhưng không thấy file sản phẩm.'); process.exit(1); }

console.log('\n✅ Xong:');
for (const f of ra) {
  const mb = (fs.statSync(f).size / 1024 / 1024).toFixed(1);
  console.log(`   ${path.relative(GOC, f)}  —  ${mb} MB`);
}
if (AAB) {
  console.log('\n   Đây là file để TẢI LÊN Google Play Console (không cài thẳng vào máy được).');
} else {
  console.log('\n   Cài vào máy đang cắm USB:  adb install -r <đường dẫn .apk ở trên>');
}
