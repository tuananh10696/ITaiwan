#!/usr/bin/env node
/**
 * Tạo bù hồ sơ du học cho học sinh ĐÃ DUYỆT mà chưa có hồ sơ (tài khoản có từ trước khi có tính
 * năng tự tạo, 2026-10-03).
 *
 *   npm run du-hoc:tao-ho-so            # chỉ IN danh sách sẽ tạo, không ghi gì
 *   npm run du-hoc:tao-ho-so -- --chay  # tạo thật
 *
 * Đọc DB theo .env như server (server/config/db.js). Script này CHỈ TẠO, không xoá / không gỡ hồ
 * sơ nào. Thay cho bản quét lúc khởi động server (đã bỏ): việc ghi hàng loạt vào DB production
 * phải là việc người chạy NHÌN THẤY trước, không phải việc ngầm sau mỗi lần pm2 reload.
 */
import pool from '../server/config/db.js';
import { hocSinhChuaCoHoSo, taoHoSoDuHocChoHocVien } from '../server/utils/du-hoc-tao-hs.js';

const chay = process.argv.includes('--chay');

try {
  const ds = await hocSinhChuaCoHoSo();
  console.log(`DB: ${process.env.DB_HOST || 'localhost'}/${process.env.DB_NAME || ''}`);
  console.log(`${ds.length} học sinh đã duyệt chưa có hồ sơ du học.`);
  for (const u of ds) console.log(`  #${u.id}  ${u.name}  <${u.email}>`);

  if (!chay) {
    if (ds.length) console.log('\nChưa ghi gì. Chạy lại với --chay để tạo.');
  } else {
    let dem = 0;
    for (const u of ds) {
      const hs = await taoHoSoDuHocChoHocVien(u.id, {
        name: u.name, email: u.email, phone: u.phone, orgId: u.org_id,
      });
      if (hs) dem++;
    }
    console.log(`\nĐã tạo ${dem}/${ds.length} hồ sơ.`);
  }
} catch (err) {
  console.error('Lỗi:', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
