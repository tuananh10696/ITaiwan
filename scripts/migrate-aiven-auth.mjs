// scripts/migrate-aiven-auth.mjs
// ------------------------------------------------------------------
// Migration AN TOÀN cho DB Aiven Live — KHÔNG drop/tạo lại bảng nào
// (khác hẳn `npm run db:init`, script đó DROP TABLE hết rồi tạo lại,
//  chạy nhầm vào Aiven Live sẽ MẤT SẠCH dữ liệu thật — đừng chạy).
//
// Script này chỉ:
//   1. Thêm cột is_verified / verification_token vào bảng `users` NẾU CHƯA CÓ.
//   2. Coi mọi user ĐANG CÓ SẴN trước migration là đã xác thực (is_verified=1)
//      — nếu không làm bước này, toàn bộ user thật đăng ký trước khi có tính
//      năng xác thực email sẽ bị KHOÁ ĐĂNG NHẬP oan (vì cột mới mặc định FALSE).
//   3. Thêm/-cập nhật ĐÚNG 1 tài khoản admin (buituananh106963007@gmail.com).
//   4. In danh sách toàn bộ user hiện có để BẠN TỰ QUYẾT xoá tài khoản demo nào
//      — script không tự xoá bất kỳ user nào để tránh mất dữ liệu thật.
//
// Chạy: node scripts/migrate-aiven-auth.mjs
// Cần .env trỏ đúng Aiven: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_SSL=true
// ------------------------------------------------------------------
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    console.error('❌ Thiếu biến .env:', missing.join(', '));
    console.error('   Trỏ .env sang Aiven trước khi chạy (DB_HOST/DB_USER/DB_PASSWORD/DB_NAME/DB_PORT/DB_SSL=true).');
    process.exit(1);
  }

  // Aiven dùng CA riêng (không nằm trong trust store mặc định của Node) -> phải nạp
  // server/config/ca.pem giống hệt server/config/db.js, không thì rejectUnauthorized:true
  // sẽ báo "self-signed certificate in certificate chain".
  let sslConfig;
  if (process.env.DB_SSL === 'true') {
    const caPath = path.join(__dirname, '..', 'server', 'config', 'ca.pem');
    let ca;
    try {
      ca = fs.readFileSync(caPath);
    } catch (e) {
      console.warn(`⚠️  Không đọc được ${caPath} — thử kết nối không kèm CA (có thể lỗi self-signed certificate).`);
    }
    sslConfig = { rejectUnauthorized: true, ...(ca ? { ca } : {}) };
  }

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306'),
    charset: 'utf8mb4',
    ssl: sslConfig,
  });

  console.log(`🔗 Đã kết nối ${process.env.DB_HOST}/${process.env.DB_NAME}`);

  const [cols] = await conn.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'`,
    [process.env.DB_NAME]
  );
  const colNames = cols.map(c => c.COLUMN_NAME);

  if (!colNames.includes('is_verified')) {
    console.log('➕ Thêm cột is_verified...');
    await conn.query('ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE');
    console.log('🛡️  Grandfather: đánh dấu mọi user ĐANG CÓ là đã xác thực (tránh khoá nhầm user cũ)...');
    const [g] = await conn.query('UPDATE users SET is_verified = TRUE');
    console.log(`   -> đã cập nhật ${g.affectedRows} user.`);
  } else {
    console.log('· Cột is_verified đã tồn tại, bỏ qua (không đụng dữ liệu).');
  }

  if (!colNames.includes('verification_token')) {
    console.log('➕ Thêm cột verification_token...');
    await conn.query('ALTER TABLE users ADD COLUMN verification_token VARCHAR(100) DEFAULT NULL');
  } else {
    console.log('· Cột verification_token đã tồn tại, bỏ qua.');
  }

  // Upsert admin account (không đổi mật khẩu nếu tài khoản đã tồn tại, tránh
  // ghi đè mật khẩu người dùng đã tự đổi sau này).
  const ADMIN_EMAIL = 'buituananh106963007@gmail.com';
  const [existingAdmin] = await conn.query('SELECT id FROM users WHERE email = ?', [ADMIN_EMAIL]);
  if (existingAdmin.length === 0) {
    console.log('➕ Chưa có tài khoản admin, tạo mới...');
    const hash = await bcrypt.hash('12345678', 10);
    await conn.query(
      `INSERT INTO users (name, email, phone, password_hash, is_admin, avatar_letter, avatar_color, level_label, level_num, streak, longest_streak, points, is_verified, verification_token)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      ['Admin', ADMIN_EMAIL, '0912345678', hash, true, 'A', '#027AB3', 'Quản trị viên', 99, 99, 99, 9999, true, null]
    );
    console.log('   -> đã tạo tài khoản admin (mật khẩu mặc định 12345678 — đổi lại sau khi login).');
  } else {
    console.log('· Tài khoản admin đã tồn tại, chỉ đảm bảo is_admin=1 và is_verified=1 (không đổi mật khẩu)...');
    await conn.query('UPDATE users SET is_admin = TRUE, is_verified = TRUE WHERE email = ?', [ADMIN_EMAIL]);
  }

  // Liệt kê toàn bộ user để tự quyết xoá demo — KHÔNG tự xoá.
  const [allUsers] = await conn.query(
    'SELECT id, name, email, is_admin, is_verified, created_at FROM users ORDER BY id'
  );
  console.log(`\n📋 Toàn bộ ${allUsers.length} user hiện có trên Aiven:`);
  for (const u of allUsers) {
    const flag = /demo|test|example\.com/i.test(u.email) ? '  <-- trông giống demo/rác?' : '';
    console.log(`   #${u.id}  ${u.email}  admin=${u.is_admin}  verified=${u.is_verified}  tạo=${u.created_at}${flag}`);
  }

  console.log('\n✅ Migration xong. KHÔNG có bảng/user nào bị xoá tự động.');
  console.log('   Muốn xoá tài khoản demo cụ thể, chạy tay: DELETE FROM users WHERE email = \'...\';');

  await conn.end();
}

main().catch(err => {
  console.error('❌ Lỗi migration:', err);
  process.exit(1);
});
