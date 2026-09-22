#!/usr/bin/env node
/**
 * db-diff — so sánh CẤU TRÚC (không phải dữ liệu) giữa DB local (.env) và prod (.env.prod).
 *
 *   npm run db:diff
 *
 * Dùng để trả lời đúng một câu: "local và prod đã giống nhau chưa?".
 * Chỉ chạy SELECT trên information_schema — không đụng vào dữ liệu của bên nào.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CA = path.join(ROOT, 'server/config/ca.pem');

function docEnv(file) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) { console.error(`❌ Thiếu file ${file}`); process.exit(1); }
  return dotenv.parse(fs.readFileSync(p));
}
const ssl = (e) => (String(e.DB_SSL).toLowerCase() === 'true' || /aivencloud\.com$/.test(e.DB_HOST || ''))
  ? { ssl: { rejectUnauthorized: true, ...(fs.existsSync(CA) ? { ca: fs.readFileSync(CA) } : {}) } } : {};

async function moKetNoi(e) {
  return mysql.createConnection({
    host: e.DB_HOST, port: Number(e.DB_PORT || 3306), user: e.DB_USER,
    password: e.DB_PASSWORD, database: e.DB_NAME, ...ssl(e),
  });
}

/** { 'bảng.cột': 'kiểu | NULL | mặc định' } + tập tên bảng */
async function docSchema(conn) {
  const [cols] = await conn.query(`
    SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
    ORDER BY TABLE_NAME, ORDINAL_POSITION`);
  const bang = new Set();
  const cot = new Map();
  for (const c of cols) {
    bang.add(c.TABLE_NAME);
    cot.set(`${c.TABLE_NAME}.${c.COLUMN_NAME}`, `${c.COLUMN_TYPE} · ${c.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'}${c.COLUMN_KEY ? ' · ' + c.COLUMN_KEY : ''}`);
  }
  return { bang, cot };
}

const envLocal = docEnv('.env');
const envProd = docEnv('.env.prod');
const [cLocal, cProd] = await Promise.all([moKetNoi(envLocal), moKetNoi(envProd)]);

try {
  const [L, P] = await Promise.all([docSchema(cLocal), docSchema(cProd)]);
  console.log(`\nLOCAL : ${envLocal.DB_USER}@${envLocal.DB_HOST}/${envLocal.DB_NAME}  (${L.bang.size} bảng)`);
  console.log(`PROD  : ${envProd.DB_USER}@${envProd.DB_HOST}/${envProd.DB_NAME}  (${P.bang.size} bảng)\n`);

  const chiLocal = [...L.bang].filter(t => !P.bang.has(t)).sort();
  const chiProd = [...P.bang].filter(t => !L.bang.has(t)).sort();
  const lechCot = [];
  for (const [k, v] of L.cot) {
    const t = k.split('.')[0];
    if (!P.bang.has(t)) continue;
    if (!P.cot.has(k)) lechCot.push([k, v, '(không có)']);
    else if (P.cot.get(k) !== v) lechCot.push([k, v, P.cot.get(k)]);
  }
  for (const [k, v] of P.cot) {
    const t = k.split('.')[0];
    if (!L.bang.has(t)) continue;
    if (!L.cot.has(k)) lechCot.push([k, '(không có)', v]);
  }

  if (chiLocal.length) { console.log('📗 Chỉ có ở LOCAL (prod còn thiếu → chạy `npm run db:migrate:prod`):'); chiLocal.forEach(t => console.log('   + ' + t)); console.log(''); }
  if (chiProd.length) { console.log('📕 Chỉ có ở PROD (local còn thiếu → chạy `npm run db:migrate:local`):'); chiProd.forEach(t => console.log('   + ' + t)); console.log(''); }
  if (lechCot.length) {
    console.log('📙 Cột khác nhau:');
    console.table(lechCot.map(([cot, local, prod]) => ({ cot, local, prod })));
  }
  if (!chiLocal.length && !chiProd.length && !lechCot.length) {
    console.log('✅ Cấu trúc LOCAL và PROD giống hệt nhau.\n');
  } else {
    console.log(`⚠️  Còn lệch: ${chiLocal.length} bảng thừa ở local · ${chiProd.length} bảng thừa ở prod · ${lechCot.length} cột khác nhau.\n`);
  }
} finally {
  await Promise.all([cLocal.end(), cProd.end()]);
}
