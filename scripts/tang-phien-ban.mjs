#!/usr/bin/env node
// Tăng số phiên bản app ở CẢ HAI nền tảng cùng lúc.
//
//   node scripts/tang-phien-ban.mjs           -> chỉ tăng số bản dựng (1.0 (3) -> 1.0 (4))
//   node scripts/tang-phien-ban.mjs 1.1.0     -> đặt phiên bản hiển thị mới, bản dựng +1
//
// VÌ SAO CẦN MỘT LỆNH: hai cửa hàng đếm phiên bản ở hai chỗ khác nhau và cả hai đều TỪ CHỐI
// bản tải lên trùng số bản dựng cũ — mà thông báo lỗi thì mãi tới lúc tải lên mới hiện, sau khi
// đã ngồi chờ dựng xong. Sửa tay bốn chỗ trong hai ngôn ngữ cấu hình khác nhau thì sớm muộn
// cũng có lần lệch.
//
//   Android  versionName  = phiên bản người dùng thấy   |  versionCode = số nguyên tăng dần
//   iOS      MARKETING_VERSION                          |  CURRENT_PROJECT_VERSION

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const moi = process.argv[2];
if (moi && !/^\d+\.\d+(\.\d+)?$/.test(moi)) {
  console.error(`❌ "${moi}" không phải dạng phiên bản. Ví dụ đúng: 1.1 hoặc 1.2.3`);
  process.exit(1);
}

const G = path.join(GOC, 'android/app/build.gradle');
const X = path.join(GOC, 'ios/App/App.xcodeproj/project.pbxproj');
let g = fs.readFileSync(G, 'utf8');
let x = fs.readFileSync(X, 'utf8');

const codeCu = Number((g.match(/versionCode\s+(\d+)/) || [])[1]);
const tenCu = (g.match(/versionName\s+"([^"]+)"/) || [])[1];
if (!codeCu || !tenCu) { console.error('❌ Không đọc được phiên bản trong build.gradle'); process.exit(1); }

// Số bản dựng của iOS và Android cố ý giữ BẰNG NHAU. Không bắt buộc về mặt kỹ thuật, nhưng khi
// người dùng báo lỗi kèm số bản dựng thì không phải hỏi lại họ đang dùng máy gì.
const code = codeCu + 1;
const ten = moi || tenCu;

g = g.replace(/versionCode\s+\d+/, `versionCode ${code}`)
     .replace(/versionName\s+"[^"]+"/, `versionName "${ten}"`);
x = x.replace(/CURRENT_PROJECT_VERSION = \d+;/g, `CURRENT_PROJECT_VERSION = ${code};`)
     .replace(/MARKETING_VERSION = [^;]+;/g, `MARKETING_VERSION = ${ten};`);

fs.writeFileSync(G, g);
fs.writeFileSync(X, x);

console.log(`✅ ${tenCu} (${codeCu})  →  ${ten} (${code})`);
console.log('   Android: versionName + versionCode');
console.log('   iOS    : MARKETING_VERSION + CURRENT_PROJECT_VERSION (cả Debug lẫn Release)');
console.log('\n   Tiếp theo:  npm run mobile:aab   /   npm run mobile:ios');
