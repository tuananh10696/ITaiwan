// =============================================================
// TÍNH LẠI ĐIỂM theo luật mới (thành tích tốt nhất) — 2026-09-16
// =============================================================
//   npm run diem:tinh-lai                 xem chênh lệch, KHÔNG sửa gì (mặc định)
//   npm run diem:tinh-lai -- --ap-dung    ghi điểm mới vào users.points
//   npm run diem:tinh-lai -- --prod       chạy trên .env.prod (mặc định là DB local)
//
// Luật mới (server/utils/diem.js) chỉ áp cho những lần nộp TỪ NAY. Điểm đã cày trước đó vẫn nằm
// trong `users.points`, nên bảng xếp hạng còn lệch cho tới khi chạy script này.
//
// ⚠️ Đây là thao tác ĐỔI DỮ LIỆU NGƯỜI DÙNG (có người sẽ TỤT hạng). Mặc định chỉ xem; `--ap-dung`
// là quyết định của chủ dự án, không phải việc script tự làm.
import 'dotenv/config';
import fs from 'node:fs';
import mysql from 'mysql2/promise';

const argv = process.argv.slice(2);
const co = (c) => argv.includes(c);
const LA_PROD = co('--prod');
const AP_DUNG = co('--ap-dung');

if (LA_PROD) {
  const f = fs.existsSync('.env.prod') ? '.env.prod' : null;
  if (!f) { console.error('❌ Không có .env.prod'); process.exit(1); }
  for (const l of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = l.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const db = await mysql.createConnection({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
  ...(LA_PROD ? { ssl: { ca: fs.readFileSync('server/config/ca.pem') } } : {}),
});

console.log(`\n🗄  ${LA_PROD ? 'PRODUCTION' : 'local'} — ${process.env.DB_HOST}/${process.env.DB_NAME}`);
console.log(AP_DUNG ? '✏️  CHẾ ĐỘ GHI THẬT\n' : '👀 chỉ xem, không sửa (thêm --ap-dung để ghi)\n');

// Điểm ĐÚNG = tổng thành tích tốt nhất mỗi bài tập + tổng thành tích tốt nhất mỗi kỹ năng thi ×2.
// Phần điểm từ ôn thẻ SRS KHÔNG truy ngược được (không có bảng lưu điểm từng lần) nên script
// GIỮ NGUYÊN phần đó bằng cách chỉ hạ tối đa xuống mức "điểm đúng", không bao giờ nâng lên.
const [rows] = await db.query(`
  SELECT u.id, u.name, u.email, u.points AS hien_tai,
         COALESCE(bt.tong, 0) + COALESCE(t.tong, 0) AS dung
    FROM users u
    LEFT JOIN (SELECT user_id, SUM(m) tong FROM
                 (SELECT user_id, MAX(score_percent) m FROM exercise_results GROUP BY user_id, lesson_id) x
               GROUP BY user_id) bt ON bt.user_id = u.id
    LEFT JOIN (SELECT user_id, SUM(m) * 2 tong FROM
                 (SELECT user_id, MAX(score_percent) m FROM exam_results GROUP BY user_id, skill) y
               GROUP BY user_id) t ON t.user_id = u.id
   WHERE u.points > 0
   ORDER BY (u.points - (COALESCE(bt.tong,0) + COALESCE(t.tong,0))) DESC`);

let doi = 0, tongGiam = 0;
console.log('  HỌC VIÊN'.padEnd(34), 'HIỆN TẠI'.padStart(9), 'ĐÚNG'.padStart(9), 'CHÊNH'.padStart(9));
for (const r of rows) {
  const dung = Math.round(Number(r.dung));
  const nay = Number(r.hien_tai);
  const chenh = nay - dung;
  if (chenh === 0) continue;
  doi++;
  if (chenh > 0) tongGiam += chenh;
  const ten = `${r.name || '(không tên)'}`.slice(0, 32);
  console.log('  ' + ten.padEnd(32), String(nay).padStart(9), String(dung).padStart(9),
              (chenh > 0 ? '-' : '+') + String(Math.abs(chenh)).padStart(8));
  if (AP_DUNG && chenh > 0) {
    // CHỈ HẠ, không nâng: người có điểm THẤP hơn mức tính được nhiều khả năng đã ôn SRS (phần
    // điểm không truy ngược được) — nâng lên là tự bịa thêm điểm cho họ.
    await db.query('UPDATE users SET points = ? WHERE id = ?', [dung, r.id]);
  }
}

console.log(`\n${doi} tài khoản lệch · tổng điểm ảo: ${tongGiam}`);
if (!AP_DUNG && doi) console.log('Chạy lại với --ap-dung để hạ những tài khoản đang cao hơn mức đúng.');
if (AP_DUNG) console.log('✅ Đã ghi. Những tài khoản thấp hơn mức đúng được GIỮ NGUYÊN (điểm SRS cũ không truy ngược được).');
await db.end();
