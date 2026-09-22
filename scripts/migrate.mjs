#!/usr/bin/env node
/**
 * migrate — chạy MỌI migration còn thiếu lên DB, một lệnh là xong.
 *
 *   npm run db:migrate:local          # tập dượt trên DB local (.env)
 *   npm run db:migrate:prod           # chạy thật lên production (.env.prod)
 *   npm run db:migrate:prod -- --xem  # chỉ xem kế hoạch, không đụng DB
 *
 * Cờ thêm:
 *   --file <đường/dẫn.sql>   chỉ chạy đúng 1 file (bỏ qua danh sách chờ)
 *   --da-chay <tên file>     đánh dấu file đó "đã chạy rồi" mà KHÔNG chạy
 *                            (dùng khi trước đây đã chạy tay trên prod)
 *   --khong-sao-luu          bỏ bước mysqldump (không khuyến khích)
 *   --cho-phep-xoa           mở khoá các câu lệnh XOÁ dữ liệu (DROP TABLE, TRUNCATE,
 *                            DELETE/UPDATE không có WHERE). Mặc định là chặn.
 *   --yes                    không hỏi xác nhận (dùng cho CI)
 *
 * Script làm đủ 5 việc, theo đúng thứ tự:
 *   1. Đọc thông tin DB (.env.prod hoặc .env) + bật SSL cho Aiven.
 *   2. Xem file nào đã chạy (bảng schema_migrations) -> lập danh sách còn thiếu.
 *   3. Đọc trước từng câu lệnh, phân loại, IN RA KẾ HOẠCH và hỏi xác nhận.
 *   4. mysqldump toàn bộ DB ra file backup, RỒI mới chạy.
 *   5. Chạy từng câu, ghi nhận file đã chạy, in bảng đối chiếu số liệu trước/sau.
 *
 * INSERT / UPDATE / DELETE-có-WHERE đều chạy bình thường — migration dữ liệu là việc
 * hợp lệ. Chỉ những câu XOÁ DIỆN RỘNG (DROP TABLE, TRUNCATE, DELETE không WHERE...)
 * mới bị chặn cho tới khi thêm --cho-phep-xoa, vì đó là loại lỗi không cứu được.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIG_DIR = path.join(ROOT, 'server/config');
const BACKUP_DIR = path.join(ROOT, 'backups');

// Thứ tự chạy khi DB còn trắng. File không có trong danh sách sẽ chạy sau, xếp theo tên.
// Thêm migration mới thì thêm tên vào CUỐI danh sách này.
const THU_TU = [
  'migration-classes-attendance.sql',
  'migration-classes-teacher-fk.sql',
  'migration-exercise-results-detail.sql',
  'migration-teacher-review.sql',
  'migration-assignments-notes.sql',
  'migration-teacher-role.sql',
  'migration-assignment-reads.sql',
  'migration-translate-submissions.sql',
  'migration-thoidai.sql',
  'migration-sotay.sql',
  'migration-lo-trinh.sql',
  'migration-thiet-bi.sql',
  'migration-du-hoc.sql',
  'migration-nhac-hoc.sql',
  'migration-du-hoc-hocvien.sql',
  'migration-quy.sql',
  'migration-ktx.sql',
  'migration-de-bai.sql',
  'migration-vai-tro-nhan-su.sql',
];

// Bảng đếm để đối chiếu trước/sau. Bảng nào chưa tồn tại thì bỏ qua.
const BANG_DEM = ['users', 'organizations', 'entitlements', 'du_hoc_ho_so', 'du_hoc_thu_tien', 'exercise_results', 'exam_results', 'class_enrollments', 'class_attendance', 'saved_words', 'notebook_words', 'srs_words', 'community_posts', 'community_comments'];

// ------------------------------------------------------------------ tham số
const argv = process.argv.slice(2);
const co = (t) => argv.includes(t);
const giaTri = (t) => { const i = argv.indexOf(t); return i >= 0 ? argv[i + 1] : null; };
const opt = {
  local: co('--local'),
  xem: co('--xem') || co('--dry-run'),
  file: giaTri('--file'),
  daChay: giaTri('--da-chay'),
  khongSaoLuu: co('--khong-sao-luu'),
  choPhepXoa: co('--cho-phep-xoa'),
  yes: co('--yes') || co('-y'),
};
const MOI_TRUONG = opt.local ? 'LOCAL' : 'PRODUCTION';

// ------------------------------------------------------------------ tách câu lệnh
/**
 * Tách file .sql thành từng câu lệnh, có tôn trọng chuỗi trong nháy và comment.
 * Không dùng split(';') thô vì dấu ; nằm trong chuỗi sẽ cắt sai câu.
 */
function tachCauLenh(sql) {
  if (/^\s*DELIMITER\b/im.test(sql)) {
    throw new Error('File có DELIMITER (trigger/procedure) — script này chưa xử lý, hãy chạy tay file đó.');
  }
  const out = [];
  let buf = '';
  let nhay = null;          // ' " `
  let comment = null;       // 'dong' | 'khoi'
  for (let i = 0; i < sql.length; i++) {
    const c = sql[i], c2 = sql[i + 1];
    if (comment === 'dong') { if (c === '\n') { comment = null; buf += c; } continue; }
    if (comment === 'khoi') { if (c === '*' && c2 === '/') { comment = null; i++; } continue; }
    if (!nhay) {
      if (c === '-' && c2 === '-' && (sql[i + 2] === ' ' || sql[i + 2] === '\n' || sql[i + 2] === undefined)) { comment = 'dong'; i++; continue; }
      if (c === '#') { comment = 'dong'; continue; }
      if (c === '/' && c2 === '*') { comment = 'khoi'; i++; continue; }
      if (c === "'" || c === '"' || c === '`') { nhay = c; buf += c; continue; }
      if (c === ';') { if (buf.trim()) out.push(buf.trim()); buf = ''; continue; }
      buf += c;
      continue;
    }
    // đang trong chuỗi
    buf += c;
    if (c === '\\' && nhay !== '`') { buf += c2 ?? ''; i++; continue; }   // ký tự escape
    if (c === nhay) {
      if (c2 === nhay) { buf += c2; i++; continue; }                      // '' hoặc "" = nháy lồng
      nhay = null;
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

// ------------------------------------------------------------------ phân loại
const XOA_DIEN_RONG = [
  [/\bDROP\s+(TABLE|DATABASE|SCHEMA)\b/i, 'DROP TABLE/DATABASE'],
  [/\bDROP\s+COLUMN\b/i, 'DROP COLUMN (mất dữ liệu cột)'],
  [/\bTRUNCATE\b/i, 'TRUNCATE'],
  [/\bRENAME\s+TABLE\b/i, 'RENAME TABLE'],
  [/\bSET\s+FOREIGN_KEY_CHECKS\s*=\s*0/i, 'tắt kiểm tra khoá ngoại'],
  [/\bGRANT\b|\bREVOKE\b/i, 'phân quyền'],
];
/** DELETE / UPDATE mà không có WHERE = quét sạch bảng. */
function quetSachBang(s) {
  if (/^\s*DELETE\s+FROM\b/i.test(s) && !/\bWHERE\b/i.test(s)) return 'DELETE không có WHERE';
  if (/^\s*UPDATE\b/i.test(s) && !/\bWHERE\b/i.test(s)) return 'UPDATE không có WHERE';
  return null;
}
function phanLoai(s) {
  const canh = [];
  for (const [re, ten] of XOA_DIEN_RONG) if (re.test(s)) canh.push(ten);
  const quet = quetSachBang(s);
  if (quet) canh.push(quet);
  if (canh.length) return { loai: 'xoa', canh };
  if (/^\s*(INSERT|REPLACE|UPDATE|DELETE)\b/i.test(s)) return { loai: 'du-lieu', canh: [] };
  if (/^\s*(CREATE|ALTER|SET|PREPARE|EXECUTE|DEALLOCATE)\b/i.test(s)) return { loai: 'cau-truc', canh: [] };
  return { loai: 'doc', canh: [] };
}
const NHAN = { 'cau-truc': 'cấu trúc', 'du-lieu': 'sửa dữ liệu', xoa: 'XOÁ DỮ LIỆU', doc: 'kiểm tra' };

// ------------------------------------------------------------------ môi trường
function docEnv() {
  for (const f of opt.local ? ['.env'] : ['.env.prod', '.env.production']) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) {
      const e = dotenv.parse(fs.readFileSync(p));
      if (e.DB_HOST && e.DB_NAME) return { env: e, from: f };
    }
  }
  if (process.env.DB_HOST && process.env.DB_NAME) return { env: process.env, from: 'biến môi trường' };
  console.error(`❌ Không tìm thấy thông tin DB ${MOI_TRUONG}.`);
  console.error(`   Cần file ${opt.local ? '.env' : '.env.prod'} có DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME.`);
  process.exit(1);
}

async function hoi(cauHoi) {
  if (opt.yes) return true;
  if (!process.stdin.isTTY) {
    console.error('❌ Không phải terminal tương tác — thêm --yes nếu chắc chắn.');
    process.exit(1);
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const tra = await new Promise(r => rl.question(cauHoi, r));
  rl.close();
  return /^(y|yes|c|co|có)$/i.test(tra.trim());
}

// ------------------------------------------------------------------ sao lưu
function saoLuu(env) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const d = new Date();
  const hai = (n) => String(n).padStart(2, '0');
  const ts = `${d.getFullYear()}${hai(d.getMonth() + 1)}${hai(d.getDate())}-${hai(d.getHours())}${hai(d.getMinutes())}${hai(d.getSeconds())}`;
  const out = path.join(BACKUP_DIR, `${env.DB_NAME}-${opt.local ? 'local' : 'prod'}-${ts}.sql`);
  const args = [
    `-h${env.DB_HOST}`, `-P${env.DB_PORT || 3306}`, `-u${env.DB_USER}`,
    '--single-transaction', '--set-gtid-purged=OFF', '--no-tablespaces',
  ];
  if (env.DB_PASSWORD) args.push(`-p${env.DB_PASSWORD}`);
  const caPath = path.join(ROOT, 'server/config/ca.pem');
  if (dungSsl(env) && fs.existsSync(caPath)) args.push(`--ssl-ca=${caPath}`);
  args.push(env.DB_NAME);

  const r = spawnSync('mysqldump', args, { encoding: 'buffer', maxBuffer: 1024 * 1024 * 512 });
  if (r.error || r.status !== 0) {
    const loi = r.error ? r.error.message : (r.stderr || '').toString().trim().split('\n').slice(-3).join(' ');
    return { ok: false, loi, out };
  }
  fs.writeFileSync(out, r.stdout);
  return { ok: true, out, kb: Math.round(r.stdout.length / 1024) };
}

const dungSsl = (env) => String(env.DB_SSL).toLowerCase() === 'true' || /aivencloud\.com$/.test(env.DB_HOST || '');

// ------------------------------------------------------------------ chạy
const { env, from } = docEnv();

let files;
if (opt.file) {
  const p = path.resolve(ROOT, opt.file);
  if (!fs.existsSync(p)) { console.error(`❌ Không thấy file: ${p}`); process.exit(1); }
  files = [p];                       // giữ nguyên đường dẫn đầy đủ
} else {
  const co_ = fs.readdirSync(MIG_DIR).filter(f => /^migration-.*\.sql$/.test(f));
  files = [...THU_TU.filter(f => co_.includes(f)), ...co_.filter(f => !THU_TU.includes(f)).sort()]
    .map(f => path.join(MIG_DIR, f));
}

console.log(`\n🗄  Môi trường : ${MOI_TRUONG}  (${from})`);
console.log(`   DB         : ${env.DB_USER}@${env.DB_HOST}:${env.DB_PORT || 3306}/${env.DB_NAME}`);

const conn = await mysql.createConnection({
  host: env.DB_HOST,
  port: Number(env.DB_PORT || 3306),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  multipleStatements: false,
  ...(dungSsl(env)
    ? { ssl: { rejectUnauthorized: true, ...(fs.existsSync(path.join(ROOT, 'server/config/ca.pem')) ? { ca: fs.readFileSync(path.join(ROOT, 'server/config/ca.pem')) } : {}) } }
    : {}),
});

try {
  // --- Sổ theo dõi migration. Tự tạo, không đụng bảng nào khác. ---
  await conn.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(191) NOT NULL UNIQUE,
      checksum CHAR(64) NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  const [daChayRows] = await conn.query('SELECT filename, checksum FROM schema_migrations');
  const daChay = new Map(daChayRows.map(r => [r.filename, r.checksum]));

  // --- Chỉ đánh dấu, không chạy ---
  if (opt.daChay) {
    const f = path.basename(opt.daChay);
    const p = path.join(MIG_DIR, f);
    if (!fs.existsSync(p)) { console.error(`❌ Không thấy ${p}`); process.exit(1); }
    const sum = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
    await conn.query('INSERT INTO schema_migrations (filename, checksum) VALUES (?,?) ON DUPLICATE KEY UPDATE checksum=VALUES(checksum)', [f, sum]);
    console.log(`\n✅ Đã đánh dấu "${f}" là ĐÃ CHẠY (không thực thi câu lệnh nào).`);
    process.exit(0);
  }

  // --- Lập kế hoạch ---
  const keHoach = [];
  for (const duongDan of files) {
    const f = path.basename(duongDan);
    const noiDung = fs.readFileSync(duongDan, 'utf8');
    const sum = crypto.createHash('sha256').update(noiDung).digest('hex');
    if (!opt.file && daChay.has(f)) {
      if (daChay.get(f) !== sum) console.log(`   ⚠️  ${f}: đã chạy nhưng NỘI DUNG FILE ĐÃ ĐỔI sau đó — bỏ qua, kiểm tra lại bằng tay.`);
      continue;
    }
    const cauLenh = tachCauLenh(noiDung).map(s => ({ sql: s, ...phanLoai(s) }));
    keHoach.push({ file: f, sum, cauLenh });
  }

  if (!keHoach.length) {
    console.log('\n✅ DB đã cập nhật đầy đủ, không có migration nào cần chạy.\n');
    process.exit(0);
  }

  console.log(`\n📋 KẾ HOẠCH — ${keHoach.length} file cần chạy:\n`);
  let coXoa = false;
  for (const k of keHoach) {
    const dem = k.cauLenh.reduce((a, c) => { a[c.loai] = (a[c.loai] || 0) + 1; return a; }, {});
    const tom = Object.entries(dem).map(([l, n]) => `${n} ${NHAN[l]}`).join(' · ');
    console.log(`   • ${k.file}  (${tom})`);
    for (const c of k.cauLenh) {
      if (c.loai === 'du-lieu') console.log(`       ✏️  ${c.sql.replace(/\s+/g, ' ').slice(0, 120)}`);
      if (c.loai === 'xoa') { coXoa = true; console.log(`       ⛔ ${c.canh.join(', ')} → ${c.sql.replace(/\s+/g, ' ').slice(0, 120)}`); }
    }
  }

  if (coXoa && !opt.choPhepXoa) {
    console.error('\n⛔ DỪNG: có câu lệnh xoá dữ liệu diện rộng (đánh dấu ⛔ ở trên).');
    console.error('   INSERT/UPDATE/DELETE có WHERE thì chạy bình thường, không cần cờ gì.');
    console.error('   Nếu đúng là muốn chạy cả những câu ⛔ đó: thêm --cho-phep-xoa (nhớ giữ file backup).');
    process.exit(2);
  }

  // --- Số liệu TRƯỚC ---
  const demSoLieu = async () => {
    const kq = {};
    for (const b of BANG_DEM) {
      try { const [[r]] = await conn.query(`SELECT COUNT(*) n FROM \`${b}\``); kq[b] = r.n; } catch { /* bảng chưa có */ }
    }
    return kq;
  };
  const truoc = await demSoLieu();
  console.log('\n📊 Số liệu TRƯỚC khi chạy:');
  console.table(truoc);

  if (opt.xem) {
    console.log('🔍 --xem: dừng ở đây, chưa chạy câu lệnh nào.\n');
    process.exit(0);
  }

  if (!await hoi(`\n❓ Chạy ${keHoach.length} file trên ${MOI_TRUONG} này? (y/N) `)) {
    console.log('Đã huỷ, không chạy gì.\n');
    process.exit(0);
  }

  // --- Sao lưu ---
  if (opt.khongSaoLuu) {
    console.log('\n⚠️  Bỏ qua sao lưu theo yêu cầu (--khong-sao-luu).');
  } else {
    process.stdout.write('\n💾 Đang sao lưu toàn bộ DB... ');
    const bk = saoLuu(env);
    if (bk.ok) {
      console.log(`xong → ${path.relative(ROOT, bk.out)} (${bk.kb} KB)`);
    } else {
      console.log('LỖI');
      console.error(`   ${bk.loi}`);
      if (!await hoi('   Không sao lưu được. Vẫn chạy tiếp? (y/N) ')) { console.log('Đã huỷ.\n'); process.exit(1); }
    }
  }

  // --- Chạy ---
  let tongCau = 0;
  for (const k of keHoach) {
    console.log(`\n▶️  ${k.file}`);
    for (const [i, c] of k.cauLenh.entries()) {
      const gon = c.sql.replace(/\s+/g, ' ').slice(0, 100);
      process.stdout.write(`   [${i + 1}/${k.cauLenh.length}] ${gon}${c.sql.length > 100 ? '…' : ''}\n`);
      try {
        const [rows] = await conn.query(c.sql);
        tongCau++;
        if (Array.isArray(rows) && rows.length) console.table(rows);
        else if (rows && rows.affectedRows !== undefined && c.loai === 'du-lieu') console.log(`        → ${rows.affectedRows} dòng bị ảnh hưởng`);
      } catch (err) {
        console.error(`\n❌ Lỗi ở ${k.file}, câu ${i + 1}: ${err.code || ''} ${err.sqlMessage || err.message}`);
        console.error('   Các câu TRƯỚC đó đã chạy xong (MySQL tự commit sau mỗi câu DDL, không rollback được).');
        console.error(`   File này CHƯA được ghi nhận là đã chạy — sửa xong chạy lại lệnh cũ là tiếp tục.`);
        if (!opt.khongSaoLuu) console.error('   Cần khôi phục thì dùng file trong thư mục backups/.');
        process.exit(1);
      }
    }
    await conn.query(
      'INSERT INTO schema_migrations (filename, checksum) VALUES (?,?) ON DUPLICATE KEY UPDATE checksum=VALUES(checksum), applied_at=NOW()',
      [k.file, k.sum]
    );
    console.log(`   ✅ ghi nhận đã chạy: ${k.file}`);
  }

  // --- Số liệu SAU + đối chiếu ---
  const sau = await demSoLieu();
  const bang = {};
  for (const b of new Set([...Object.keys(truoc), ...Object.keys(sau)])) {
    bang[b] = { truoc: truoc[b] ?? '—', sau: sau[b] ?? '—', lech: (sau[b] ?? 0) - (truoc[b] ?? 0) };
  }
  console.log('\n📊 Đối chiếu trước/sau:');
  console.table(bang);
  const lech = Object.entries(bang).filter(([, v]) => v.lech !== 0);
  if (lech.length) console.log(`⚠️  Có ${lech.length} bảng đổi số dòng — đúng như dự kiến nếu migration có INSERT/UPDATE, còn không thì kiểm tra lại.`);
  else console.log('✅ Không bảng nào mất/thêm dòng — dữ liệu học viên nguyên vẹn.');

  console.log(`\n🎉 Xong ${tongCau} câu lệnh / ${keHoach.length} file.`);
  console.log('   Bước cuối: deploy lại app (Vercel) hoặc restart `npm run server` để nạp code mới.\n');
} finally {
  await conn.end();
}
