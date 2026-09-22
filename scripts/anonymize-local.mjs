#!/usr/bin/env node
/**
 * anonymize-local — thay email THẬT của học viên trong DB local bằng địa chỉ không gửi được.
 *
 *   npm run db:anon:local              # chạy thật
 *   npm run db:anon:local -- --xem     # chỉ xem sẽ đổi những gì, không đụng DB
 *   npm run db:anon:local -- --mat-khau tentaiwan68   # đặt luôn 1 mật khẩu chung
 *                                                      để đăng nhập thử vai học viên
 *
 * VÌ SAO CẦN: máy dev đang chạy bản sao dữ liệu production (xem CLAUDE.md 4.16), nên bảng
 * `users` chứa email thật của học viên. `EMAIL_DRY_RUN=true` trong .env là lớp chặn thứ nhất,
 * nhưng chỉ cần một lần đổi cờ đó thành false — hoặc một route mới quên hỏi `isEmailDryRun()` —
 * là mail test bay thẳng tới các em. Xoá hẳn email thật khỏi DB local là lớp chặn thứ hai,
 * và là lớp không phụ thuộc vào việc code có nhớ kiểm tra hay không.
 *
 * Email mới có dạng `hocvien<id>@local.invalid`. Đuôi `.invalid` được RFC 2606 dành riêng để
 * KHÔNG BAO GIỜ phân giải được — dù có gửi thật thì cũng không tới đâu cả.
 *
 * AN TOÀN:
 *   · Chỉ chạy khi DB_HOST là localhost/127.0.0.1. Trỏ vào Aiven là script tự dừng.
 *   · Ghi bảng đối chiếu id -> email cũ ra backups/ (thư mục đã gitignore) trước khi đổi,
 *     để còn lần ngược lại được nếu cần.
 *   · Chạy lại nhiều lần vô hại: email đã đổi rồi thì bỏ qua.
 *   · GIỮ NGUYÊN các tài khoản trong GIU_NGUYEN bên dưới (admin + tài khoản test).
 */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BACKUP_DIR = path.join(ROOT, 'backups');

// Tài khoản KHÔNG đụng tới (so sánh không phân biệt hoa/thường):
//   · email admin của chính chủ dự án — đổi đi là mất đường đăng nhập trang admin ở local;
//   · các tài khoản test tự tạo, vốn đã không phải người thật.
// Thêm tài khoản test mới thì thêm vào đây.
const GIU_NGUYEN = [
  'buituananh106963007@gmail.com',
  'demo@taiwandiary.vn',
  'demo@ten.vn',
  // Giáo viên — đổi email đi là không đăng nhập thử được vai trò giáo viên ở máy dev nữa.
  'tinhhoang6688@gmail.com',
];
// Email khớp mẫu này cũng được coi là tài khoản test, giữ nguyên.
const MAU_TEST = /(^|[._-])test|@local\.invalid$|@example\.(com|org|net|invalid)$/i;

const DOMAIN = 'local.invalid';

// ------------------------------------------------------------------ tham số
const argv = process.argv.slice(2);
const co = (t) => argv.includes(t);
const giaTri = (t) => { const i = argv.indexOf(t); return i >= 0 ? argv[i + 1] : null; };
const chiXem = co('--xem');
const matKhauMoi = giaTri('--mat-khau');
const khongHoi = co('--yes');

// ------------------------------------------------------------------ kết nối
dotenv.config({ path: path.join(ROOT, '.env') });

const host = process.env.DB_HOST || '127.0.0.1';
const database = process.env.DB_NAME;

// Chốt chặn quan trọng nhất của cả script: không bao giờ để chạy nhầm lên DB thật.
const LA_LOCAL = ['127.0.0.1', 'localhost', '::1', '0.0.0.0'].includes(host);
if (!LA_LOCAL) {
  console.error(`\n❌ DB_HOST = "${host}" không phải máy local. Script này CHỈ chạy trên DB local.`);
  console.error('   Nếu đây đúng là ý bạn thì sửa .env trỏ về 127.0.0.1 trước.\n');
  process.exit(1);
}
if (!database) {
  console.error('\n❌ .env thiếu DB_NAME.\n');
  process.exit(1);
}

const hoi = (cauHoi) => new Promise((resolve) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question(cauHoi, (a) => { rl.close(); resolve(a.trim().toLowerCase()); });
});

const conn = await mysql.createConnection({
  host,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database,
});

console.log(`\n🗄️  DB local: ${process.env.DB_USER}@${host}:${process.env.DB_PORT || 3306}/${database}`);

const [users] = await conn.query('SELECT id, name, email FROM users ORDER BY id');

const giuNguyenSet = new Set(GIU_NGUYEN.map((e) => e.toLowerCase()));
const canDoi = users.filter((u) => {
  const e = (u.email || '').toLowerCase();
  if (!e) return false;
  if (giuNguyenSet.has(e)) return false;
  if (MAU_TEST.test(e)) return false;
  return true;
});

if (canDoi.length === 0) {
  console.log('\n✅ Không còn email thật nào trong DB local. Không phải làm gì.\n');
  await conn.end();
  process.exit(0);
}

console.log(`\n📋 ${canDoi.length}/${users.length} tài khoản sẽ được đổi email:\n`);
for (const u of canDoi) {
  console.log(`   #${String(u.id).padStart(3)}  ${u.email}  ->  hocvien${u.id}@${DOMAIN}   (${u.name})`);
}
const giuLai = users.filter((u) => !canDoi.includes(u));
if (giuLai.length) {
  console.log(`\n🔒 Giữ nguyên ${giuLai.length} tài khoản: ${giuLai.map((u) => u.email).join(', ')}`);
}
if (matKhauMoi) {
  console.log(`\n🔑 Đồng thời đặt mật khẩu của ${canDoi.length} tài khoản trên thành: "${matKhauMoi}"`);
}

if (chiXem) {
  console.log('\n👀 --xem: không đụng gì tới DB.\n');
  await conn.end();
  process.exit(0);
}

if (!khongHoi) {
  const tl = await hoi('\nTiến hành? (co/khong) ');
  if (!['co', 'c', 'y', 'yes'].includes(tl)) {
    console.log('Đã huỷ.\n');
    await conn.end();
    process.exit(0);
  }
}

// Ghi bảng đối chiếu TRƯỚC khi đổi — backups/ đã nằm trong .gitignore vì chứa email thật.
fs.mkdirSync(BACKUP_DIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const mapFile = path.join(BACKUP_DIR, `anonymize-local-${stamp}.json`);
fs.writeFileSync(mapFile, JSON.stringify(
  canDoi.map((u) => ({ id: u.id, name: u.name, email_cu: u.email, email_moi: `hocvien${u.id}@${DOMAIN}` })),
  null, 2,
));
console.log(`\n💾 Đã lưu bảng đối chiếu email cũ: ${path.relative(ROOT, mapFile)}`);

// Băm mật khẩu bằng đúng thư viện backend đang dùng, để đăng nhập được thật.
let hash = null;
if (matKhauMoi) {
  const bcrypt = (await import('bcryptjs')).default;
  hash = await bcrypt.hash(matKhauMoi, 10);
}

let ok = 0;
for (const u of canDoi) {
  const emailMoi = `hocvien${u.id}@${DOMAIN}`;
  if (hash) {
    await conn.query('UPDATE users SET email = ?, password_hash = ? WHERE id = ?', [emailMoi, hash, u.id]);
  } else {
    await conn.query('UPDATE users SET email = ? WHERE id = ?', [emailMoi, u.id]);
  }
  ok++;
}

console.log(`\n✅ Đã đổi email của ${ok} tài khoản sang @${DOMAIN}.`);
if (hash) console.log(`✅ Đã đặt lại mật khẩu chung: "${matKhauMoi}"`);
console.log('   Từ giờ dù EMAIL_DRY_RUN có bị tắt thì cũng không có mail nào tới học viên thật.\n');

await conn.end();
