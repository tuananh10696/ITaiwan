#!/usr/bin/env node
/**
 * ÂM THANH + ẢNH CỦA BỘ ĐỀ THI THỬ TOCFL: lưu về server mình, không trỏ sang onllang.com — 2026-10-01
 *
 *   node scripts/tai-de-thi-tocfl.mjs
 *
 * public/data/thi/tocfl.json trước đây trỏ thẳng sang mp3/jpg của onllang.com: website đó đổi/xoá
 * file là đề thi câm / mất hình mà không có lỗi nào hiện ra. Theo quyết định của chủ dự án
 * (2026-10-01) tải về và trỏ vào bản lưu tại chỗ.
 *
 *   mp3 -> public/audio/thi/<năm>/<tháng>/<tên>.mp3   (nén mono 22,05 kHz 48 kbps — bản gốc stereo
 *          256-320 kbps, giữ nguyên thì ~1 GB; 48 kbps mono vẫn rõ cho bài nghe)
 *   ảnh -> public/images/thi/<năm>/<tháng>/<tên>       (giữ nguyên file)
 *
 * Bản gốc tải về giữ ở scripts/data-cache/thi/goc/ (không commit). Tải TUẦN TỰ + thử lại: onllang
 * rate-limit khi tải song song và trả trang lỗi kèm mã 200 — nên kiểm cả chữ ký file (ID3/FFFB, FFD8).
 * Chạy lại an toàn: URL đã đổi sang nội bộ thì thôi; file đã có thì không tải lại.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const DE = path.join(ROOT, 'public/data/thi/tocfl.json');
const GOC = path.join(ROOT, 'scripts/data-cache/thi/goc');
const URL_RE = /https?:\/\/onllang\.com\/wp-content\/uploads\/([^"'\s]+?\.(mp3|jpe?g|png|gif|webp))/gi;

const dungChuKy = (f, loai) => {
  const b = fs.readFileSync(f).subarray(0, 4);
  if (loai === 'mp3') return (b[0] === 0x49 && b[1] === 0x44 && b[2] === 0x33) || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0);
  if (/jpe?g/.test(loai)) return b[0] === 0xff && b[1] === 0xd8;
  if (loai === 'png') return b[0] === 0x89 && b[1] === 0x50;
  return b.length > 0;
};
const ngu = (ms) => execFileSync('sleep', [String(ms / 1000)]);

function tai(url, dich, loai) {
  if (fs.existsSync(dich) && fs.statSync(dich).size > 500 && dungChuKy(dich, loai)) return;
  fs.mkdirSync(path.dirname(dich), { recursive: true });
  for (let lan = 1; lan <= 4; lan++) {
    try {
      execFileSync('curl', ['-sfL', '--max-time', '120', '-A', 'Mozilla/5.0', '-o', dich, url.replace(/^http:/, 'https:')]);
      if (fs.statSync(dich).size > 500 && dungChuKy(dich, loai)) return;
    } catch { /* thử lại */ }
    ngu(1500 * lan);
  }
  throw new Error(`không tải được ${url}`);
}

let txt = fs.readFileSync(DE, 'utf8');
const ds = new Map();
for (const m of txt.matchAll(URL_RE)) ds.set(m[0], { rel: decodeURIComponent(m[1]), loai: m[2].toLowerCase() });
console.log(`${ds.size} URL onllang.com (${[...ds.values()].filter((x) => x.loai === 'mp3').length} mp3)`);

let i = 0;
const loi = [];
for (const [url, { rel, loai }] of ds) {
  i++;
  const goc = path.join(GOC, rel);
  const laAm = loai === 'mp3';
  const noiBo = laAm ? `/audio/thi/${rel}` : `/images/thi/${rel}`;
  const dich = path.join(ROOT, 'public', noiBo);
  try {
    tai(url, goc, loai);
    if (!fs.existsSync(dich)) {
      fs.mkdirSync(path.dirname(dich), { recursive: true });
      if (laAm) execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', goc, '-vn', '-map_metadata', '-1', '-ac', '1', '-ar', '22050', '-b:a', '48k', dich]);   // -vn: bỏ ẢNH BÌA nhúng (có file 62s nặng 5 MB vì nó)
      else fs.copyFileSync(goc, dich);
    }
    if (laAm) {
      const d = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', dich], { encoding: 'utf8' }));
      if (!(d > 0.5)) throw new Error(`file nén lỗi (${d}s)`);
    }
    txt = txt.split(url).join(noiBo);
  } catch (e) { loi.push(`${url}: ${e.message}`); fs.rmSync(dich, { force: true }); }
  if (i % 100 === 0) console.log(`  ${i}/${ds.size}`);
}
fs.writeFileSync(DE, txt, 'utf8');
const con = (txt.match(URL_RE) || []).length;
console.log(`xong: ${ds.size - loi.length}/${ds.size} chuyển sang nội bộ · còn URL ngoài: ${con}`);
if (loi.length) { console.log('⚠️ ', loi.join('\n   ')); process.exitCode = 1; }
