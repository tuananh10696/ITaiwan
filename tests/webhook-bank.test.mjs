// =============================================================
// WEBHOOK NGÂN HÀNG — 2026-09-16
// =============================================================
//   TEST_PORT=3999 BANK_WEBHOOK_KEY=... npm run test:webhook
//
// Webhook này TỰ CẤP QUYỀN HỌC nên mọi nhánh "không chắc chắn" phải dừng lại chứ không đoán.
// Bộ này kiểm đúng các nhánh đó: sai khoá, tiền ra, không khớp, khớp nhiều đơn, lệch tiền,
// và duyệt hai lần.
import 'dotenv/config';
import mysql from 'mysql2/promise';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const KEY = process.env.BANK_WEBHOOK_KEY || 'khoa-thu';
if (!/^(localhost|127\.0\.0\.1)$/.test(String(process.env.DB_HOST || ''))) {
  console.error('❌ Chỉ chạy trên DB local.'); process.exit(1);
}
const db = await mysql.createConnection({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
});

const MA = 'wh-' + Date.now().toString(36);
const buoc = [];
const ghi = (ten, thuc, mong) => buoc.push({
  ten, thuc: JSON.stringify(thuc), mong: JSON.stringify(mong),
  dat: JSON.stringify(thuc) === JSON.stringify(mong),
});

const goi = async (body, key = KEY) => {
  const r = await fetch(B + '/webhook/bank', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(key ? { Authorization: `Apikey ${key}` } : {}) },
    body: JSON.stringify(body),
  });
  return { s: r.status, j: await r.json().catch(() => null) };
};

const [u] = await db.query(
  "INSERT INTO users (name, email, password_hash, role, is_verified, is_approved) VALUES (?,?,'x','student',1,1)",
  [`WH ${MA}`, `${MA}@local.invalid`]);
const uid = u.insertId;
const [[sp]] = await db.query("SELECT ma, gia FROM products WHERE is_active = TRUE ORDER BY gia LIMIT 1");

const taoDon = async (ndung, tien) => {
  const [r] = await db.query(
    "INSERT INTO payments (user_id, product_ma, so_tien, cong, ma_giao_dich, trang_thai) VALUES (?,?,?,'chuyen-khoan',?,'cho')",
    [uid, sp.ma, tien, ndung]);
  return r.insertId;
};
const trangThai = async (id) => {
  const [r] = await db.query('SELECT trang_thai, entitlement_id FROM payments WHERE id = ?', [id]);
  return r[0];
};

try {
  // --- bảo vệ ---
  ghi('Sai khoá → 401', (await goi({ transferAmount: 1, content: 'x' }, 'sai')).s, 401);
  ghi('Không có khoá → 401', (await goi({ transferAmount: 1, content: 'x' }, '')).s, 401);

  // --- tiền RA không được xử lý (duyệt theo nó = mở khoá mỗi khi mình trả tiền ai đó) ---
  let r = await goi({ transferAmount: 500000, content: 'abc', transferType: 'out' });
  ghi('Giao dịch tiền RA → bỏ qua', r.j?.xu_ly, false);

  // --- không tìm thấy đơn ---
  r = await goi({ transferAmount: 399000, content: 'chuyen tien linh tinh khong khop gi' });
  ghi('Nội dung không khớp đơn nào → không xử lý', r.j?.xu_ly, false);

  // --- khớp đúng + đúng tiền → TỰ DUYỆT ---
  const nd = `hocvien.${MA}@gmail.com - duong dai q1`;
  const don1 = await taoDon(nd, sp.gia);
  // App ngân hàng thường lược @ và . khỏi nội dung — webhook phải khớp được bản đã lược.
  const ndBank = nd.replace(/[@.]/g, '').toUpperCase();
  r = await goi({ transferAmount: sp.gia, content: `CT DEN:${ndBank} FT123456`, referenceCode: 'FT123456' });
  ghi('Khớp đơn + đúng tiền → tự duyệt', r.j?.xu_ly, true);
  const t1 = await trangThai(don1);
  ghi('  đơn chuyển thành-công', t1.trang_thai, 'thanh-cong');
  ghi('  đã cấp quyền học', !!t1.entitlement_id, true);

  // --- gọi lại chính giao dịch đó → không duyệt lần hai ---
  r = await goi({ transferAmount: sp.gia, content: `CT DEN:${ndBank} FT123456` });
  ghi('Webhook retry cùng giao dịch → không duyệt lại', r.j?.xu_ly, false);

  // --- lệch số tiền → KHÔNG tự duyệt ---
  const nd2 = `thieu.${MA}@gmail.com - hsk cap 1`;
  const don2 = await taoDon(nd2, sp.gia);
  r = await goi({ transferAmount: sp.gia - 50000, content: nd2.replace(/[@.]/g, '') });
  ghi('Chuyển THIẾU tiền → không mở khoá', r.j?.xu_ly, false);
  ghi('  đơn vẫn ở hàng chờ', (await trangThai(don2)).trang_thai, 'cho');
  r = await goi({ transferAmount: sp.gia + 100000, content: nd2.replace(/[@.]/g, '') });
  ghi('Chuyển THỪA tiền → cũng không tự duyệt', r.j?.xu_ly, false);

  // --- hai đơn cùng khớp → để người duyệt ---
  const ndChung = `trung.${MA}@gmail.com - hsk cap 2`;
  await taoDon(ndChung, sp.gia);
  await taoDon(ndChung, sp.gia);
  r = await goi({ transferAmount: sp.gia, content: ndChung.replace(/[@.]/g, '') });
  ghi('Hai đơn cùng khớp → không đoán, để duyệt tay', r.j?.xu_ly, false);
} finally {
  await db.query('DELETE FROM entitlements WHERE user_id = ?', [uid]);
  await db.query('DELETE FROM payments WHERE user_id = ?', [uid]);
  await db.query('DELETE FROM users WHERE id = ?', [uid]);
}

const [[{ sot }]] = await db.query('SELECT COUNT(*) AS sot FROM users WHERE email LIKE ?', [`${MA}%`]);
await db.end();
for (const b of buoc) console.log(`${b.dat ? '✅' : '❌'} ${b.ten.padEnd(52)} ${b.thuc.padEnd(14)} (mong ${b.mong})`);
const dat = buoc.filter(b => b.dat).length;
console.log(`\n🧹 còn sót ${sot} bản ghi (phải 0)`);
console.log(`WEBHOOK NGÂN HÀNG: ${dat}/${buoc.length} bước đạt`);
process.exit(dat === buoc.length && sot === 0 ? 0 : 1);
