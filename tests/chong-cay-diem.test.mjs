// =============================================================
// CHỐNG CÀY ĐIỂM — 2026-09-16
// =============================================================
//   TEST_PORT=3999 npm run test:diem     (cần server + DB local)
//
// Trước đây mỗi lần nộp bài là cộng thẳng score_percent vào users.points, không giới hạn — game
// chơi lại 1-2 phút/ván nên leo top bằng cách bấm, không phải bằng cách học (CLAUDE.md 4.24).
// Bộ này mô phỏng đúng hành vi cày: nộp CÙNG MỘT BÀI nhiều lần và đòi hỏi điểm không phình.
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
if (!/^(localhost|127\.0\.0\.1)$/.test(String(process.env.DB_HOST || ''))) {
  console.error('❌ Chỉ chạy trên DB local.'); process.exit(1);
}
const db = await mysql.createConnection({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
});

const MA = 'diemtest-' + Date.now().toString(36);
const buoc = [];
const ghi = (ten, thuc, mong) => buoc.push({
  ten, thuc: JSON.stringify(thuc), mong: JSON.stringify(mong),
  dat: JSON.stringify(thuc) === JSON.stringify(mong),
});

const [u] = await db.query(
  "INSERT INTO users (name, email, password_hash, role, is_verified, is_approved, points) VALUES (?, ?, 'x', 'student', 1, 1, 0)",
  [`Cày điểm ${MA}`, `${MA}@local.invalid`]
);
const uid = u.insertId;
const tok = jwt.sign({ id: uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

const nop = async (lesson, correct, total = 10) => {
  const r = await fetch(B + '/exercise/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok },
    body: JSON.stringify({ lesson_id: lesson, total_questions: total, correct_answers: correct, time_seconds: 30 }),
  });
  return r.json().catch(() => null);
};
const diem = async () => {
  const [r] = await db.query('SELECT points FROM users WHERE id = ?', [uid]);
  return Number(r[0].points);
};

try {
  // --- 1. Lần đầu: cộng đúng điểm ---
  let j = await nop('game:wordpop:1.1', 8);           // 80%
  ghi('Lần đầu nộp 80% → cộng 80 điểm', j?.points_earned, 80);
  ghi('  users.points = 80', await diem(), 80);

  // --- 2. CÀY: nộp lại CÙNG BÀI, cùng điểm, 9 lần nữa ---
  for (let i = 0; i < 9; i++) await nop('game:wordpop:1.1', 8);
  ghi('Cày 9 ván nữa cùng 80% → điểm KHÔNG đổi', await diem(), 80);

  // --- 3. Làm KÉM hơn: không trừ, cũng không cộng ---
  j = await nop('game:wordpop:1.1', 5);               // 50%
  ghi('Làm lại kém hơn (50%) → cộng 0', j?.points_earned, 0);
  ghi('  và điểm vẫn giữ 80 (không bị trừ)', await diem(), 80);
  ghi('  API nói rõ vì sao: kỷ lục cũ 80', j?.ky_luc_cu, 80);

  // --- 4. Làm TỐT hơn: chỉ cộng phần vượt kỷ lục ---
  j = await nop('game:wordpop:1.1', 10);              // 100%
  ghi('Phá kỷ lục (100%) → chỉ cộng phần chênh 20', j?.points_earned, 20);
  ghi('  users.points = 100', await diem(), 100);
  ghi('  API báo là kỷ lục mới', j?.la_ky_luc_moi, true);

  // --- 5. Bài KHÁC vẫn cộng bình thường (không chặn nhầm người học thật) ---
  j = await nop('game:wordpop:1.2', 9);               // 90%
  ghi('Bài khác 90% → cộng đủ 90', j?.points_earned, 90);
  ghi('  users.points = 190', await diem(), 190);

  // --- 6. Cày trên nhiều bài cũng vô ích ---
  const truoc = await diem();
  for (const b of ['game:wordpop:1.1', 'game:wordpop:1.2', 'game:bee:1.1']) {
    for (let i = 0; i < 5; i++) await nop(b, 7);      // 70%, thấp hơn kỷ lục 2 bài đầu
  }
  ghi('Cày 15 ván (70%) → chỉ cộng đúng 70 của bài MỚI', await diem() - truoc, 70);

  // --- 7. Tổng điểm = tổng thành tích tốt nhất mỗi bài ---
  const [tt] = await db.query(
    `SELECT COALESCE(SUM(m), 0) AS tong FROM (
       SELECT MAX(score_percent) m FROM exercise_results WHERE user_id = ? GROUP BY lesson_id) t`,
    [uid]
  );
  ghi('Tổng điểm = tổng điểm tốt nhất mỗi bài', await diem(), Math.round(Number(tt[0].tong)));
} finally {
  await db.query('DELETE FROM exercise_results WHERE user_id = ?', [uid]);
  await db.query('DELETE FROM study_activity WHERE user_id = ?', [uid]);
  await db.query('DELETE FROM users WHERE id = ?', [uid]);
}

const [[{ sot }]] = await db.query("SELECT COUNT(*) AS sot FROM users WHERE email LIKE ?", [`${MA}%`]);
await db.end();
for (const b of buoc) console.log(`${b.dat ? '✅' : '❌'} ${b.ten.padEnd(52)} ${b.thuc.padEnd(8)} (mong ${b.mong})`);
const dat = buoc.filter(b => b.dat).length;
console.log(`\n🧹 còn sót ${sot} bản ghi (phải 0)`);
console.log(`CHỐNG CÀY ĐIỂM: ${dat}/${buoc.length} bước đạt`);
process.exit(dat === buoc.length && sot === 0 ? 0 : 1);
