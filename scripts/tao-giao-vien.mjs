#!/usr/bin/env node
/**
 * tao-giao-vien — tạo (hoặc nâng cấp) một tài khoản GIÁO VIÊN, đặt sẵn mật khẩu.
 *
 *   npm run gv:tao -- --ten "Hoàng Tỉnh" --email a@b.com --mat-khau "..."            # DB local (.env)
 *   npm run gv:tao -- --prod --ten "Hoàng Tỉnh" --email a@b.com --mat-khau "..."     # DB production (.env.prod)
 *   npm run gv:tao -- --prod --email a@b.com --xem                                   # chỉ xem, không đụng DB
 *
 * VÌ SAO CẦN, TRONG KHI ĐÃ CÓ `POST /api/admin/teachers`: route đó cố ý dùng MẬT KHẨU MẶC ĐỊNH
 * (`tengiaovien68`) rồi gửi mail báo — hợp lý cho admin thao tác hằng ngày, nhưng không đặt được
 * mật khẩu cụ thể. Script này dành cho việc seed tài khoản ban đầu, khi mật khẩu đã thống nhất từ trước.
 *
 * Chạy lại nhiều lần vô hại:
 *   · email chưa có          -> tạo mới, role = teacher
 *   · email đã có, là học viên -> nâng lên teacher, đặt lại mật khẩu + tên
 *   · email đã có, là admin    -> DỪNG, không hạ quyền (hạ nhầm admin là mất đường vào hệ thống)
 */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ------------------------------------------------------------------ tham số
const argv = process.argv.slice(2);
const co = (t) => argv.includes(t);
const giaTri = (t) => { const i = argv.indexOf(t); return i >= 0 ? argv[i + 1] : null; };

const laProd = co('--prod');
const chiXem = co('--xem');
const khongHoi = co('--yes');
const ten = giaTri('--ten');
const email = String(giaTri('--email') || '').trim().toLowerCase();
const matKhau = giaTri('--mat-khau');

if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
  console.error('\n❌ Thiếu hoặc sai --email.\n   Ví dụ: npm run gv:tao -- --ten "Hoàng Tỉnh" --email co@truong.vn --mat-khau "..."\n');
  process.exit(1);
}
if (!chiXem && !matKhau) {
  console.error('\n❌ Thiếu --mat-khau (bắt buộc khi tạo thật; dùng --xem nếu chỉ muốn kiểm tra).\n');
  process.exit(1);
}

// ------------------------------------------------------------------ môi trường
// Đọc y hệt cách scripts/migrate.mjs làm, để "local"/"prod" luôn cùng nghĩa giữa 2 script.
function docEnv() {
  for (const f of laProd ? ['.env.prod', '.env.production'] : ['.env']) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) {
      const e = dotenv.parse(fs.readFileSync(p));
      if (e.DB_HOST && e.DB_NAME) return { env: e, from: f };
    }
  }
  console.error(`\n❌ Không tìm thấy thông tin DB ${laProd ? 'production' : 'local'}.`);
  console.error(`   Cần file ${laProd ? '.env.prod' : '.env'} có DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME.\n`);
  process.exit(1);
}
const { env, from } = docEnv();
const dungSsl = String(env.DB_SSL).toLowerCase() === 'true' || /aivencloud\.com$/i.test(env.DB_HOST || '');

const hoi = (cauHoi) => new Promise((resolve) => {
  if (khongHoi) return resolve(true);
  if (!process.stdin.isTTY) {
    console.error('❌ Không phải terminal tương tác — thêm --yes nếu chắc chắn.');
    process.exit(1);
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question(cauHoi, (a) => { rl.close(); resolve(['co', 'c', 'y', 'yes'].includes(a.trim().toLowerCase())); });
});

const caPath = path.join(ROOT, 'server/config/ca.pem');
const conn = await mysql.createConnection({
  host: env.DB_HOST,
  port: Number(env.DB_PORT || 3306),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  ...(dungSsl
    ? { ssl: { rejectUnauthorized: true, ...(fs.existsSync(caPath) ? { ca: fs.readFileSync(caPath) } : {}) } }
    : {}),
});

console.log(`\n🗄  Môi trường : ${laProd ? '🚨 PRODUCTION' : 'local'}  (${from})`);
console.log(`   DB         : ${env.DB_USER}@${env.DB_HOST}:${env.DB_PORT || 3306}/${env.DB_NAME}`);

// Cột `role` do migration-teacher-role.sql thêm. Chưa có cột thì dừng hẳn — tạo tài khoản mà
// không đặt được vai trò thì người đó thành học viên, âm thầm sai.
const [cot] = await conn.query(
  `SELECT COUNT(*) AS n FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'`,
  [env.DB_NAME]
);
if (!cot[0].n) {
  console.error('\n❌ Bảng users chưa có cột `role`. Chạy migration trước:');
  console.error(`   npm run db:migrate:${laProd ? 'prod' : 'local'}\n`);
  await conn.end();
  process.exit(1);
}

const [dangCo] = await conn.query('SELECT id, name, email, role, is_admin FROM users WHERE email = ?', [email]);
const u = dangCo[0] || null;

if (u && u.role === 'admin') {
  console.error(`\n❌ ${email} đang là QUẢN TRỊ VIÊN (${u.name}). Script từ chối hạ quyền xuống giáo viên.`);
  console.error('   Hạ nhầm admin là mất đường vào hệ thống. Nếu thật sự muốn, đổi bằng tay.\n');
  await conn.end();
  process.exit(1);
}

console.log('\n📋 Kế hoạch:');
if (u) {
  console.log(`   Đã có tài khoản #${u.id} "${u.name}" (${u.email}), vai trò hiện tại: ${u.role}`);
  console.log(`   -> đặt vai trò 'teacher'${ten ? `, đổi tên thành "${ten}"` : ''}, đặt lại mật khẩu, duyệt + xác thực sẵn.`);
} else {
  console.log(`   Chưa có ${email} -> TẠO MỚI: "${ten || email.split('@')[0]}", vai trò 'teacher', duyệt + xác thực sẵn.`);
}

if (chiXem) {
  console.log('\n👀 --xem: không đụng gì tới DB.\n');
  await conn.end();
  process.exit(0);
}

if (laProd && !(await hoi('\n🚨 Đây là DB PRODUCTION. Tiến hành? (co/khong) '))) {
  console.log('Đã huỷ.\n');
  await conn.end();
  process.exit(0);
}

const hash = await bcrypt.hash(matKhau, 10);
const tenCuoi = (ten && ten.trim()) || (u && u.name) || email.split('@')[0];

if (u) {
  await conn.query(
    `UPDATE users SET name = ?, password_hash = ?, role = 'teacher', is_admin = 0,
            is_verified = 1, is_approved = 1, verification_token = NULL, avatar_letter = ?
      WHERE id = ?`,
    [tenCuoi, hash, tenCuoi.charAt(0).toUpperCase(), u.id]
  );
  console.log(`\n✅ Đã cập nhật #${u.id} "${tenCuoi}" thành GIÁO VIÊN.`);
} else {
  const [r] = await conn.query(
    `INSERT INTO users (name, email, password_hash, role, is_admin, is_verified, is_approved, avatar_letter)
     VALUES (?,?,?, 'teacher', 0, 1, 1, ?)`,
    [tenCuoi, email, hash, tenCuoi.charAt(0).toUpperCase()]
  );
  console.log(`\n✅ Đã tạo GIÁO VIÊN #${r.insertId} "${tenCuoi}" (${email}).`);
}

const [sau] = await conn.query('SELECT id, name, email, role, is_admin, is_approved, is_verified FROM users WHERE email = ?', [email]);
console.table(sau);
console.log('   Đăng nhập được ở cả trang học viên và /admin.html (khu giáo viên).\n');

await conn.end();
