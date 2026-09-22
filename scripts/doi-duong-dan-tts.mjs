/**
 * ĐỔI đường dẫn `audioTts` sang bộ mp3 giọng máy mới — 2026-09-10
 *
 *   node scripts/doi-duong-dan-tts.mjs --xem     # chỉ báo cáo, không ghi gì
 *   node scripts/doi-duong-dan-tts.mjs           # đổi thật
 *   node scripts/doi-duong-dan-tts.mjs --don     # đổi xong thì xoá luôn mp3 cũ mồ côi
 *
 * VÌ SAO: `gen-tts-tuvung.py` nay sinh mp3 ở tốc độ -35% và băm TÊN FILE kèm tốc độ đó, nên
 * mọi `audioTts` đã ghi trong dữ liệu vẫn trỏ vào bộ file CŨ (đọc nhanh). Script này đổi
 * đường dẫn theo bảng "tên cũ -> tên mới" dựng lại từ chính công thức băm.
 *
 * Thay theo CHUỖI ĐƯỜNG DẪN chứ không đi vào cấu trúc JSON: nhờ vậy dùng được cho cả
 * `public/data/**.json` lẫn `src/data/*Vocab*.js` (file JS, key không có nháy nên JSON.parse
 * không đọc nổi — đúng cái bẫy đã làm `--bo duongdai` chết ở gen-tts-tuvung.py).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const XEM = process.argv.includes('--xem');
const DON = process.argv.includes('--don');
const TOC_DO = '-35%';   // phải khớp TOC_DO trong gen-tts-tuvung.py

// map -> giọng đã dùng để sinh (quyết định khoá băm)
const NGUON = [
  { map: 'scripts/data-cache/tts-tuvung-map.json', giong: 'zh-TW-HsiaoChenNeural' },
  { map: 'scripts/data-cache/hsk/tts-map.json', giong: 'zh-CN-XiaoxiaoNeural' },
  { map: 'scripts/data-cache/tocfl/tts-map.json', giong: 'zh-TW-HsiaoChenNeural' },
];

const bam = (tu, giong, tocDo) => {
  const goc = giong === 'zh-TW-HsiaoChenNeural' ? tu : `${giong}|${tu}`;
  const khoa = tocDo === '+0%' ? goc : `${goc}|${tocDo}`;
  return crypto.createHash('md5').update(khoa, 'utf8').digest('hex').slice(0, 10) + '.mp3';
};

// ---- bảng cũ -> mới -------------------------------------------------------
const doi = new Map();      // '<cũ>.mp3' -> '<mới>.mp3'
const moiCoThat = new Set();
for (const { map, giong } of NGUON) {
  const p = path.join(ROOT, map);
  if (!fs.existsSync(p)) { console.log(`⚠️  thiếu map ${map} — bỏ qua`); continue; }
  for (const tu of Object.keys(JSON.parse(fs.readFileSync(p, 'utf8')))) {
    const cu = bam(tu, giong, '+0%');
    const moi = bam(tu, giong, TOC_DO);
    if (cu === moi) continue;
    if (!fs.existsSync(path.join(ROOT, 'public/audio/tts-vi', moi))) continue;  // chưa sinh -> giữ nguyên
    doi.set(cu, moi);
    moiCoThat.add(moi);
  }
}
console.log(`Bảng đổi tên: ${doi.size} file (mp3 mới đã có thật trên đĩa)\n`);

// ---- quét file dữ liệu ----------------------------------------------------
const canQuet = [];
const dequy = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) dequy(f);
    else if (/\.(json|js)$/.test(e.name)) canQuet.push(f);
  }
};
dequy(path.join(ROOT, 'public/data'));
dequy(path.join(ROOT, 'src/data'));

let soFile = 0, soThay = 0, conCu = 0;
const cuConSot = new Set();
for (const f of canQuet) {
  const goc = fs.readFileSync(f, 'utf8');
  if (!goc.includes('/audio/tts-vi/')) continue;
  let s = goc, n = 0;
  // Thay theo TỪNG tên file, không dùng một regex chung — regex chung dễ nuốt nhầm và
  // không cho biết tên nào không có trong bảng.
  for (const [cu, moi] of doi) {
    const truoc = s;
    s = s.split(`/audio/tts-vi/${cu}`).join(`/audio/tts-vi/${moi}`);
    if (s !== truoc) n++;
  }
  // Còn sót tên nào chưa đổi? (từ bị bỏ khỏi map, hoặc map chưa sinh xong)
  for (const m of s.matchAll(/\/audio\/tts-vi\/([0-9a-f]{10}\.mp3)/g)) {
    if (!moiCoThat.has(m[1])) { conCu++; cuConSot.add(m[1]); }
  }
  if (n) {
    soFile++; soThay += n;
    if (!XEM) fs.writeFileSync(f, s);
  }
}
console.log(`${XEM ? '[XEM] ' : ''}Đã đổi trong ${soFile} file · ${soThay} tên file khác nhau`);
if (conCu) console.log(`⚠️  Còn ${cuConSot.size} tên chưa đổi được (${conCu} chỗ) — vd: ${[...cuConSot].slice(0, 5).join(', ')}`);

// ---- dọn mp3 mồ côi -------------------------------------------------------
if (DON && !XEM) {
  const dangDung = new Set();
  for (const f of canQuet) {
    if (!/\.(json|js)$/.test(f)) continue;
    const s = fs.readFileSync(f, 'utf8');
    for (const m of s.matchAll(/\/audio\/tts-vi\/([0-9a-f]{10}\.mp3)/g)) dangDung.add(m[1]);
  }
  const thuMuc = path.join(ROOT, 'public/audio/tts-vi');
  let xoa = 0, byte = 0;
  for (const ten of fs.readdirSync(thuMuc)) {
    if (!ten.endsWith('.mp3') || dangDung.has(ten)) continue;
    byte += fs.statSync(path.join(thuMuc, ten)).size;
    fs.rmSync(path.join(thuMuc, ten));
    xoa++;
  }
  console.log(`🗑  Xoá ${xoa} mp3 mồ côi (${(byte / 1048576).toFixed(1)} MB) · còn ${dangDung.size} file đang dùng`);
}
