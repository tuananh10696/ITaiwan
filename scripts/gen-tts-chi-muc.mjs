#!/usr/bin/env node
/**
 * CHỈ MỤC mp3 giọng máy: chữ Hán -> tên file — 2026-09-30
 *
 *   node scripts/gen-tts-chi-muc.mjs           # sinh public/data/tts-chi-muc.json
 *   node scripts/gen-tts-chi-muc.mjs --kiem    # chỉ báo số, không ghi
 *
 * VÌ SAO: những nút loa KHÔNG kèm đường dẫn mp3 (thẻ ôn tập SRS ở Lộ trình, sổ tay, trang Từ
 * điển, bộ thủ, câu hội thoại thiếu bản thu) rơi thẳng xuống Web Speech API. Máy nào không có
 * giọng tiếng Trung nào thì bấm loa KHÔNG RA TIẾNG GÌ và không có lỗi nào hiện ra — đúng loại
 * hỏng âm thầm nặng nhất, vì người dùng tưởng nút bị "lag".
 *
 * Kho `public/audio/tts-vi/` đã có mp3 của gần như toàn bộ vốn từ giáo trình + TOCFL, chỉ là
 * tên file băm md5 nên không tra được từ chữ Hán. File này là bảng tra đó.
 *
 * ⚠️ Tên file băm theo `md5(<chữ Hán>|-35%)` — PHẢI khớp `ten_file()` trong gen-tts-tuvung.py.
 *    Chỉ ghi vào chỉ mục những chữ mà file CÓ THẬT trên đĩa, để nút loa không bao giờ phải nếm
 *    một cú 404 (trên SPA, 404 trả về index.html kèm mã 200 nên còn chậm hơn 404 thật).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const RA = path.join(PUB, 'data/tts-chi-muc.json');
const KIEM = process.argv.includes('--kiem');
const TOC_DO = '-35%';

const ten = (h) => crypto.createHash('md5').update(`${h}|${TOC_DO}`, 'utf8').digest('hex').slice(0, 10);

// ---- gom mọi chữ Hán có trong vốn từ của dự án --------------------------------
const chu = new Set();
const themNeuHan = (s) => {
  const t = String(s || '').trim();
  if (t && /[㐀-鿿豈-﫿]/.test(t)) chu.add(t);
};

for (const f of fs.readdirSync(path.join(PUB, 'data/giaotrinh'))) {
  const d = JSON.parse(fs.readFileSync(path.join(PUB, 'data/giaotrinh', f), 'utf8'));
  for (const w of d.v || []) themNeuHan(w.hanzi);
}
for (const f of fs.readdirSync(path.join(PUB, 'data/tocfl'))) {
  if (!/^cap-/.test(f)) continue;
  for (const w of JSON.parse(fs.readFileSync(path.join(PUB, 'data/tocfl', f), 'utf8')).tu || []) themNeuHan(w.hanzi);
}
// Vốn từ tra cứu (kho.json): cột 0 là chữ phồn thể. Đây là nguồn của Sổ tay và trang Từ điển,
// tức đúng chỗ mà nút loa hay không có mp3 kèm theo.
{
  const p = path.join(PUB, 'data/tudien/kho.json');
  if (fs.existsSync(p)) for (const r of JSON.parse(fs.readFileSync(p, 'utf8'))) themNeuHan(r[0]);
}

// ---- chỉ giữ chữ có file thật ------------------------------------------------
const map = {};
for (const h of chu) {
  const t = ten(h);
  if (fs.existsSync(path.join(PUB, 'audio/tts-vi', `${t}.mp3`))) map[h] = t;
}

const soFile = fs.readdirSync(path.join(PUB, 'audio/tts-vi')).filter((f) => f.endsWith('.mp3')).length;
console.log(`${chu.size} chữ Hán trong vốn từ · ${Object.keys(map).length} chữ có mp3 giọng máy `
  + `(kho có ${soFile} file)`);
if (KIEM) process.exit(0);
fs.writeFileSync(RA, JSON.stringify(map));
console.log(`-> ${path.relative(ROOT, RA)} · ${(fs.statSync(RA).size / 1024).toFixed(0)} KB`);
