#!/usr/bin/env node
/**
 * DANH MỤC FILE NGHE SÁCH BÀI TẬP (作業本聽力測驗) theo bài — 2026-10-01
 *
 *   node scripts/gen-sbt-nghe.mjs          (npm run sbt:nghe)
 *
 * File mp3 là bản thu CHÍNH THỨC của 淡江大學華語中心 (Drive công khai, thư mục Workbook của từng
 * quyển), tải + nén lại vào public/audio/sbt/ (mono 40 kbps). Tên file gốc: B1-01-A.mp3 (quyển 1,
 * bài 1, phần A) · B2-05-1.mp3 (quyển 2, bài 5, phần 1).
 *
 * CHỈ có tiếng: đề và phương án in trong sách bài tập, không nguồn công khai nào có chữ — nên trang
 * chỉ phát bản thu để học viên làm cùng sách in, KHÔNG tự dựng câu hỏi (dựng là bịa đề của sách).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'public/audio/sbt');
const OUT = path.join(ROOT, 'src/data/sbtNghe.js');

const bang = {};
for (const f of fs.readdirSync(DIR).sort()) {
  const m = /^B(\d)-(\d+)-([A-Z0-9]+)\.mp3$/i.exec(f);
  if (!m) continue;
  const key = `td${m[1]}-${parseInt(m[2], 10)}`;
  (bang[key] ||= []).push({ phan: m[3].toUpperCase(), file: `/audio/sbt/${f}` });
}
for (const ds of Object.values(bang)) ds.sort((a, b) => a.phan.localeCompare(b.phan, 'en', { numeric: true }));

fs.writeFileSync(OUT, `// TỰ ĐỘNG SINH bởi scripts/gen-sbt-nghe.mjs — ĐỪNG SỬA TAY (npm run sbt:nghe)
// File nghe sách bài tập (作業本聽力測驗) theo bài cha: { 'td1-1': [{ phan: 'A', file }] }
export const sbtNghe = ${JSON.stringify(bang, null, 1)};
`, 'utf8');
console.log(`${Object.keys(bang).length} bài · ${Object.values(bang).flat().length} file`);
