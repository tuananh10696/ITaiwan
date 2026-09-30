#!/usr/bin/env node
/**
 * VÁ những chỗ ÂM THANH TRỎ VÀO HƯ KHÔNG — 2026-09-30
 *
 *   node scripts/va-audio-thieu.mjs --xem     # chỉ báo cáo, không ghi gì
 *   node scripts/va-audio-thieu.mjs           # vá thật
 *
 * Chạy `node scripts/kiem-audio.mjs` trước/sau để đối chiếu.
 *
 * BỐN việc, theo đúng thứ tự ưu tiên nguồn phát của `ddSpeakWord` (bản thu gốc -> mp3 giọng
 * máy -> Web Speech):
 *
 *  1. TỪ VỰNG TOCFL trỏ vào `/audio/dangdai/*`. Bộ giáo trình Đương đại đã bị gỡ khỏi bản này
 *     nhưng `gen-tocfl-vocab.mjs` gán audio từ vốn từ CŨ, nên 3.071 mục trỏ vào thư mục không
 *     còn tồn tại. Vá theo ba mức:
 *        a) cùng chữ Hán có bản thu THẬT ở chỗ khác (thoidai-tu) -> dùng bản thu đó
 *        b) cùng chữ Hán đã có mp3 giọng máy -> `audioTts`
 *        c) chưa có gì -> ghi vào danh sách cần sinh TTS, tạm bỏ trường `audio`
 *     Bỏ `audio` là quan trọng: để nguyên thì mỗi lần bấm loa là một request 404 rồi mới rơi
 *     xuống nguồn sau — mà trên SPA, 404 trả về index.html kèm mã 200 nên còn chậm hơn.
 *
 *  2. CLIP CẮT HỤT. Bản thu bị `silenceremove` xoá gần hết tiếng (xem va-audio-tu-loi.py).
 *     Dài hơn ngưỡng 0,25s của `ddSpeakWord` nên KHÔNG tự rơi xuống nguồn sau. Bỏ `audio`,
 *     chuyển sang mp3 giọng máy — thà nghe giọng máy đủ từ còn hơn nghe nửa từ.
 *
 *  3. BẢNG PHIÊN ÂM có 6 ô ghi `"o.mp3"` (đường dẫn TƯƠNG ĐỐI, ghép vào URL trang hiện tại nên
 *     404 ở mọi trang). Năm ô có chữ Hán thanh 1 -> mp3 giọng máy của chữ đó; ô `miu` không có
 *     chữ thanh 1 thông dụng -> để trống, giao diện tự hiện ô mờ kèm lời giải thích.
 *
 *  4. ĐỀ THI TOCFL hotlink onllang.com bằng `http://` (547 mp3 + 178 jpg). Trang chạy HTTPS thì
 *     trình duyệt CHẶN mixed content: thẻ <audio> im lặng, ảnh không hiện, KHÔNG có lỗi nào.
 *
 * ⚠️ Sửa TỪ VỰNG GIÁO TRÌNH phải sửa `src/data/thoidaiVocab<N>.js` rồi chạy `npm run data:tach`
 *    — `public/data/giaotrinh/*.json` là bản SINH RA, ghi thẳng vào đó là mất khi tách lại.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const XEM = process.argv.includes('--xem');
const CAN_TTS = path.join(ROOT, 'scripts', 'data-cache', 'audio-can-tts.json');

/** Tên file mp3 giọng máy — phải khớp `ten_file()` trong gen-tts-tuvung.py. */
const TOC_DO = '-35%';
const GIONG = 'zh-TW-HsiaoChenNeural';
function ttsPath(hanzi) {
  const ten = crypto.createHash('md5').update(`${hanzi}|${TOC_DO}`, 'utf8').digest('hex').slice(0, 10);
  return `/audio/tts-vi/${ten}.mp3`;
}
const coFile = (p) => fs.existsSync(path.join(PUB, p));
/** mp3 giọng máy của chữ này đã có trên đĩa chưa. */
const coTts = (hanzi) => coFile(ttsPath(hanzi));

const canSinh = new Set();     // chữ Hán cần sinh mp3 giọng máy
const ghiChu = [];
const bao = (s) => { ghiChu.push(s); console.log(s); };

// ============================================================ 0) bảng tra: chữ Hán -> nguồn tốt nhất
const banThu = new Map();      // chữ Hán -> bản thu THẬT đã kiểm
const mpGiongMay = new Map();  // chữ Hán -> mp3 giọng máy đã có

/** Clip cắt hụt: dài dưới 0,24s mỗi âm tiết. */
const soAmTiet = (s) => (String(s || '').match(/[㐀-鿿豈-﫿]/g) || []).length || 1;
const _doDai = new Map();
function doDai(src) {
  if (_doDai.has(src)) return _doDai.get(src);
  let d = 0;
  try {
    d = parseFloat(execFileSync('ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path.join(PUB, src)],
      { encoding: 'utf8' }).trim()) || 0;
  } catch { d = 0; }
  _doDai.set(src, d);
  return d;
}
const clipHut = (hanzi, src) => {
  if (!coFile(src)) return false;
  const d = doDai(src);
  return d > 0 && d / soAmTiet(hanzi) < 0.24;
};

const nguonGiaoTrinh = [];
for (const f of fs.readdirSync(path.join(PUB, 'data/giaotrinh'))) {
  const d = JSON.parse(fs.readFileSync(path.join(PUB, 'data/giaotrinh', f), 'utf8'));
  for (const w of d.v || []) nguonGiaoTrinh.push(w);
}
const nhoNguon = (w) => {
  const h = (w.hanzi || '').trim();
  if (!h) return;
  if (w.audio && coFile(w.audio) && !clipHut(h, w.audio) && !banThu.has(h)) banThu.set(h, w.audio);
  const t = w.audioTts || w.tts;
  if (t && coFile(t) && !mpGiongMay.has(h)) mpGiongMay.set(h, t);
};
nguonGiaoTrinh.forEach(nhoNguon);

const capFiles = fs.readdirSync(path.join(PUB, 'data/tocfl')).filter((f) => /^cap-/.test(f));
const capData = new Map();
for (const f of capFiles) {
  const d = JSON.parse(fs.readFileSync(path.join(PUB, 'data/tocfl', f), 'utf8'));
  capData.set(f, d);
  (d.tu || []).forEach(nhoNguon);
}

/**
 * Vị trí object literal của `export const <ten> = {...}` trong một file JS, tìm bằng cách ĐẾM
 * NGOẶC. Không dùng regex `\{[\s\S]*\}`: các file vocab có HAI export (`thoidaiVocab<N>` và
 * `thoidaiRange<N>`), regex tham lam sẽ ôm cả hai rồi JSON.parse chết ở dấu `}` thừa.
 */
function doiTuong(txt, ten) {
  const i = txt.indexOf(`export const ${ten}`);
  if (i < 0) return null;
  const dau = txt.indexOf('{', i);
  if (dau < 0) return null;
  let sau = 0, trongChuoi = null;
  for (let k = dau; k < txt.length; k++) {
    const c = txt[k];
    if (trongChuoi) {
      if (c === '\\') k++;
      else if (c === trongChuoi) trongChuoi = null;
      continue;
    }
    if (c === '"' || c === "'") { trongChuoi = c; continue; }
    if (c === '{') sau++;
    else if (c === '}' && --sau === 0) return { dau, cuoi: k + 1 };
  }
  return null;
}

// ============================================================ 1+2) từ vựng TOCFL
let vaThu = 0, vaTts = 0, choSinh = 0, boClipHut = 0;
for (const [f, d] of capData) {
  for (const w of d.tu || []) {
    const h = (w.hanzi || '').trim();
    if (!h) continue;
    const mayHong = w.audioTts && !coFile(w.audioTts);
    const hong = w.audio && (!coFile(w.audio) || clipHut(h, w.audio));
    if (!hong && !mayHong) continue;
    if (hong) {
      if (clipHut(h, w.audio)) boClipHut++;
      const thu = banThu.get(h);
      // Bản thu thật của chính chữ đó ở bộ giáo trình -> dùng luôn, khỏi cần giọng máy.
      if (thu && thu !== w.audio) { w.audio = thu; vaThu++; if (!mayHong) continue; }
      else delete w.audio;
    }
    if (w.audio && !mayHong) continue;
    const may = mpGiongMay.get(h) || (coTts(h) ? ttsPath(h) : null);
    if (may) { w.audioTts = may; vaTts++; }
    else { w.audioTts = ttsPath(h); canSinh.add(h); choSinh++; }
  }
}
bao(`[TOCFL] vá bằng bản thu thật: ${vaThu} · bằng mp3 giọng máy có sẵn: ${vaTts} · chờ sinh mp3: ${choSinh}`);
if (!XEM) for (const [f, d] of capData) {
  fs.writeFileSync(path.join(PUB, 'data/tocfl', f), JSON.stringify(d));
}

// ============================================================ 2) clip cắt hụt của giáo trình
// Sửa ở NGUỒN (`src/data/thoidaiVocab<N>.js`), không sửa bản đã tách.
let hutGt = 0;
for (let q = 1; q <= 5; q++) {
  const file = path.join(ROOT, 'src/data', `thoidaiVocab${q}.js`);
  const txt = fs.readFileSync(file, 'utf8');
  const kh = doiTuong(txt, `thoidaiVocab${q}`);
  if (!kh) { bao(`⚠️  không đọc được ${path.basename(file)} — bỏ qua`); continue; }
  const data = JSON.parse(txt.slice(kh.dau, kh.cuoi));
  let doi = 0;
  for (const ds of Object.values(data)) {
    for (const w of ds) {
      const h = (w.hanzi || '').trim();
      if (!w.audio || !h) continue;
      if (!clipHut(h, w.audio) && coFile(w.audio)) continue;
      delete w.audio;
      const may = mpGiongMay.get(h) || (coTts(h) ? ttsPath(h) : null);
      w.audioTts = may || ttsPath(h);
      if (!may) canSinh.add(h);
      doi++; hutGt++;
    }
  }
  if (doi && !XEM) {
    // Chỉ thay ĐÚNG object literal của export này — file còn export `thoidaiRange<N>` ở dưới,
    // cắt theo `indexOf('export const')` là xoá mất nó (và mọi bài con mất mốc from/to).
    fs.writeFileSync(file, txt.slice(0, kh.dau) + JSON.stringify(data, null, 1) + txt.slice(kh.cuoi), 'utf8');
  }
  if (doi) bao(`[Giáo trình Q${q}] ${doi} từ đổi từ clip cắt hụt sang mp3 giọng máy`);
}
bao(`[Giáo trình] tổng ${hutGt} từ · [TOCFL] ${boClipHut} mục cùng dùng clip hụt đó`);

// ============================================================ 3) bảng phiên âm
const PC = path.join(ROOT, 'src/data/pinyinChartData.js');
{
  let txt = fs.readFileSync(PC, 'utf8');
  // Chữ Hán THANH 1 của từng âm, lấy đúng ô tương ứng trong `pinyinChart`.
  const CHU = { wu: '屋', wa: '挖', wo: '窩', wai: '歪', wei: '威', miu: null };
  let doi = 0;
  for (const [am, chu] of Object.entries(CHU)) {
    const re = new RegExp(`("${am}"\\s*:\\s*)"o\\.mp3"`);
    if (!re.test(txt)) continue;
    if (!chu) { txt = txt.replace(re, '$1null'); doi++; continue; }
    if (!coTts(chu)) canSinh.add(chu);
    txt = txt.replace(re, `$1"${ttsPath(chu)}"`);
    doi++;
  }
  bao(`[Bảng phiên âm] sửa ${doi} ô trỏ vào "o.mp3"`);
  if (doi && !XEM) fs.writeFileSync(PC, txt, 'utf8');
}

// ============================================================ 4) đề thi TOCFL: http -> https
{
  const f = path.join(PUB, 'data/thi/tocfl.json');
  const txt = fs.readFileSync(f, 'utf8');
  const so = (txt.match(/http:\/\/onllang\.com/g) || []).length;
  bao(`[Đề thi] đổi ${so} URL http://onllang.com sang https://`);
  if (so && !XEM) fs.writeFileSync(f, txt.replaceAll('http://onllang.com', 'https://onllang.com'), 'utf8');
}

// ============================================================ danh sách cần sinh TTS
fs.mkdirSync(path.dirname(CAN_TTS), { recursive: true });
const ds = [...canSinh].sort();
if (!XEM) fs.writeFileSync(CAN_TTS, JSON.stringify(ds, null, 1), 'utf8');
bao(`\n${ds.length} chữ Hán chưa có mp3 giọng máy -> ${path.relative(ROOT, CAN_TTS)}`);
if (ds.length) {
  console.log('Sinh mp3 rồi CHẠY LẠI script này (lần hai chỉ còn việc gán đường dẫn):');
  console.log('   scripts/.venv/bin/python scripts/gen-tts-bo-sung.py');
}
if (XEM) console.log('\n(--xem: không ghi file nào)');
