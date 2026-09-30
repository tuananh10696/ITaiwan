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
const banThu = new Map();      // "chữ|cách đọc" -> bản thu THẬT đã kiểm
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
/**
 * Clip ĐỌC SAI TỪ — đã NGHE LẠI bằng `kiem-noi-dung-audio.py` và xác nhận (2026-09-30). Khác clip
 * cắt hụt: có tiếng, dài bình thường, nhưng đọc thiếu âm tiết ("美國" chỉ còn "國") hoặc đọc sang
 * từ khác. Không bộ kiểm nào dựa trên FILE bắt được, nên danh sách nằm trong repo:
 * `scripts/audio-clip-sai.json` = { "B1L01-1-17": "美國 — nghe ra: guo", … }.
 */
const CLIP_SAI = (() => {
  try { return new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/audio-clip-sai.json'), 'utf8')))); }
  catch { return new Set(); }
})();
const laClipSai = (src) => CLIP_SAI.has(path.basename(String(src || ''), '.mp3'));

const clipHut = (hanzi, src) => {
  if (!coFile(src)) return false;
  if (laClipSai(src)) return true;
  const d = doDai(src);
  return d > 0 && d / soAmTiet(hanzi) < 0.24;
};

const nguonGiaoTrinh = [];
for (const f of fs.readdirSync(path.join(PUB, 'data/giaotrinh'))) {
  const d = JSON.parse(fs.readFileSync(path.join(PUB, 'data/giaotrinh', f), 'utf8'));
  for (const w of d.v || []) nguonGiaoTrinh.push(w);
}
/**
 * Khoá tra bản thu = CHỮ + CÁCH ĐỌC (giữ dấu thanh). Tra theo chữ Hán thôi là sai với chữ đa âm:
 * lượt chạy 2026-10-01 đã gán clip 得 "děi" cho mục 得 "de", 長 "zhǎng" cho 長 "cháng", 還 "hái" cho
 * 還 "huán", 重 "zhòng" cho 重 "chóng" — học viên nghe một đằng, thẻ ghi một nẻo.
 */
const pyKhoa = (p) => String(p || '').replace(/[（(].*?[）)]/g, '').split(/[/／]/)[0].normalize('NFC').toLowerCase()
  .replace(/[^a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, '');
const khoaThu = (w) => `${(w.hanzi || '').trim()}|${pyKhoa(w.pinyin)}`;

/** Clip `B2L02-1-01` thuộc bài td2-2 — mục GỐC của clip là mục trong bài đó đang trỏ vào nó. */
const baiCuaClip = (src) => { const m = /B(\d)L(\d+)-/.exec(path.basename(String(src || ''))); return m ? `td${m[1]}-${+m[2]}` : null; };

/** Cùng cách đọc? So cả dấu thanh, trừ biến điệu 一/不 (yī/yí/yì, bù/bú) — sách ghi theo cách đọc
 *  trong từ, bảng TOCFL ghi thanh gốc, hai cách ghi đều đúng. */
const chuanDoc = (p) => pyKhoa(p).replace(/y[īíǐì]/g, 'yi').replace(/b[ùú]/g, 'bu');
const cungDoc = (a, b) => chuanDoc(a) === chuanDoc(b);

const nhoMayGiong = (w) => {
  const h = (w.hanzi || '').trim();
  const t = w.audioTts || w.tts;
  if (h && t && coFile(t) && !mpGiongMay.has(h)) mpGiongMay.set(h, t);
};
nguonGiaoTrinh.forEach(nhoMayGiong);

const capFiles = fs.readdirSync(path.join(PUB, 'data/tocfl')).filter((f) => /^cap-/.test(f));
const capData = new Map();
for (const f of capFiles) {
  const d = JSON.parse(fs.readFileSync(path.join(PUB, 'data/tocfl', f), 'utf8'));
  capData.set(f, d);
  (d.tu || []).forEach(nhoMayGiong);
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

// ============================================================ nạp nguồn giáo trình + MỤC GỐC của clip
// Clip `B2L02-1-01` là bản thu của một mục trong bài td2-2 — mục đó là MỤC GỐC. Mục ở bài khác (hoặc
// TOCFL) dùng lại clip này chỉ hợp lệ khi đọc GIỐNG mục gốc. Bảng bản thu (`banThu`) chỉ dựng từ mục
// gốc, để một lần gán nhầm không lan tiếp sang mục khác.
const QV = [];
for (let q = 1; q <= 5; q++) {
  const file = path.join(ROOT, 'src/data', `thoidaiVocab${q}.js`);
  const txt = fs.readFileSync(file, 'utf8');
  const kh = doiTuong(txt, `thoidaiVocab${q}`);
  if (!kh) { bao(`⚠️  không đọc được ${path.basename(file)} — bỏ qua`); continue; }
  QV.push({ q, file, txt, kh, data: JSON.parse(txt.slice(kh.dau, kh.cuoi)) });
}
// Bài có HAI mục cùng chữ khác cách đọc dùng chung một clip: mục đứng trước chưa chắc là mục gốc.
// Cách đọc thật của clip đo bằng đường cao độ (scripts/data-cache/thoidai/phat-am/cao-do.py):
//   B3L13-1-12 đi ngang (thanh 1)   -> 空 kōng, không phải kòng
//   B4L01-1-06 rơi mạnh (thanh 4)   -> 轉 zhuàn, không phải zhuǎn
const CLIP_DOC = {
  '/audio/thoidai-tu/B3L13-1-12.mp3': { hanzi: '空', pinyin: 'kōng' },
  '/audio/thoidai-tu/B4L01-1-06.mp3': { hanzi: '轉', pinyin: 'zhuàn' },
};
const mucGoc = new Map(Object.entries(CLIP_DOC));     // clip -> {hanzi, pinyin} của mục gốc
for (const { data } of QV) for (const [bai, ds] of Object.entries(data)) for (const w of ds) {
  if (w.audio && baiCuaClip(w.audio) === bai && !mucGoc.has(w.audio)) mucGoc.set(w.audio, { hanzi: w.hanzi, pinyin: w.pinyin });
}
for (const [clip, g] of mucGoc) {
  const h = (g.hanzi || '').trim();
  if (coFile(clip) && !clipHut(h, clip) && !banThu.has(khoaThu(g))) banThu.set(khoaThu(g), clip);
}
// Bản ghi bài PHÁT ÂM của sách (scripts/cat-phat-am-sgk.py): các từ đọc riêng như 美國, 英國, 老師,
// 你好, 謝謝… — giọng thật của sách, dùng cho mục từ vựng CHƯA có bản thu (xếp sau bản thu phần Từ vựng).
{
  const f = path.join(ROOT, 'scripts/du-lieu/phat-am-sgk.json');
  if (fs.existsSync(f)) {
    let them = 0;
    for (const v of Object.values(JSON.parse(fs.readFileSync(f, 'utf8')))) {
      if (v.loai !== 'tu' || !coFile(v.file)) continue;
      const k = khoaThu({ hanzi: v.hz.replace(/[。！？]$/, ''), pinyin: v.py });
      if (!banThu.has(k)) { banThu.set(k, v.file); them++; }
    }
    bao(`[Bài phát âm của sách] ${them} từ có bản ghi dùng được cho phần từ vựng`);
  }
}

/** Mục mượn clip của mục gốc mà đọc KHÁC (chữ đa âm) -> coi như hỏng. */
const muonLech = (w) => {
  const g = mucGoc.get(w.audio);
  return !!g && (g.hanzi || '').trim() === (w.hanzi || '').trim() && !cungDoc(g.pinyin, w.pinyin);
};

// ============================================================ chữ đơn đa âm đọc bằng giọng máy
// Giọng máy đọc MỘT chữ đứng riêng theo cách đọc mặc định: 空 -> kōng, 長 -> zhǎng, 還 -> hái...
// Mục ghi cách đọc khác (空 kòng, 長 cháng, 還 huán) mà không có bản thu thật thì cho giọng máy đọc
// một chữ ĐỒNG ÂM chỉ có một cách đọc (控, 常, 環): âm phát ra y hệt, chữ hiển thị vẫn giữ nguyên.
// Chỉ ghi những cặp đã đo lại cao độ file sinh ra (scripts/data-cache/thoidai/phat-am/cao-do.py).
const DONG_AM_MAY = {
  '中|zhòng': '眾', '乾|gān': '甘', '了|liǎo': '蓼', '倆|liǎng': '兩', '假|jià': '架',
  '分|fèn': '份', '划|huá': '華', '削|xiāo/xuè': '消', '吐|tù': '兔', '好|hào': '號',
  '彈|tán': '談', '撒|sǎ': '灑', '數|shǔ': '暑', '朝|zhāo': '招', '為|wéi': '圍',
  '率|shuài': '帥', '盡|jìn': '進', '種|zhòng': '眾', '稱|chèng': '秤', '空|kòng': '控',
  '著|zhuó': '酌', '處|chǔ': '楚', '行|háng': '航', '觀|guàn': '貫', '調|tiáo': '條',
  '還|huán': '環', '重|chóng': '崇', '量|liáng': '涼', '釘|dìng': '定', '鋪|pū': '撲',
  '長|cháng': '常',
};
/** Chữ đưa cho giọng máy đọc: chữ đồng âm nếu là chữ đơn đa âm đọc khác mặc định, còn lại chính nó. */
const chuMay = (w) => DONG_AM_MAY[`${(w.hanzi || '').trim()}|${(w.pinyin || '').trim().toLowerCase()}`] || (w.hanzi || '').trim();

// ============================================================ 1+2) từ vựng TOCFL
let vaThu = 0, vaTts = 0, choSinh = 0, boClipHut = 0;
for (const [f, d] of capData) {
  for (const w of d.tu || []) {
    const h = (w.hanzi || '').trim();
    if (!h) continue;
    // mp3 giọng máy mất file, hoặc là chữ đơn đa âm mà mp3 đang đọc cách đọc mặc định
    // Chưa có bản thu mà cùng chữ + cùng cách đọc có bản thu thật -> dùng (giọng máy giữ làm dự phòng)
    if (!w.audio && banThu.has(khoaThu(w))) { w.audio = banThu.get(khoaThu(w)); vaThu++; }
    const mayHong = w.audioTts && (!coFile(w.audioTts) || (chuMay(w) !== h && w.audioTts !== ttsPath(chuMay(w))));
    const hong = w.audio && (!coFile(w.audio) || clipHut(h, w.audio) || muonLech(w));
    if (!hong && !mayHong) continue;
    if (hong) {
      if (clipHut(h, w.audio)) boClipHut++;
      const thu = banThu.get(khoaThu(w));
      // Bản thu thật của chính chữ đó ở bộ giáo trình -> dùng luôn, khỏi cần giọng máy.
      if (thu && thu !== w.audio) { w.audio = thu; vaThu++; if (!mayHong) continue; }
      else delete w.audio;
    }
    if (w.audio && !mayHong) continue;
    const cm = chuMay(w);
    const may = cm !== h ? (coTts(cm) ? ttsPath(cm) : null) : (mpGiongMay.get(h) || (coTts(h) ? ttsPath(h) : null));
    if (may) { w.audioTts = may; vaTts++; }
    else { w.audioTts = ttsPath(cm); canSinh.add(cm); choSinh++; }
  }
}
bao(`[TOCFL] vá bằng bản thu thật: ${vaThu} · bằng mp3 giọng máy có sẵn: ${vaTts} · chờ sinh mp3: ${choSinh}`);
if (!XEM) for (const [f, d] of capData) {
  fs.writeFileSync(path.join(PUB, 'data/tocfl', f), JSON.stringify(d));
}

// ============================================================ 2) clip cắt hụt / đọc sai / mượn lệch của giáo trình
// Sửa ở NGUỒN (`src/data/thoidaiVocab<N>.js`), không sửa bản đã tách.
let hutGt = 0;
for (const Qn of QV) {
  let doi = 0;
  for (const [bai, ds] of Object.entries(Qn.data)) {
    for (const w of ds) {
      const h = (w.hanzi || '').trim();
      if (!h) continue;
      const k = khoaThu(w);
      // Chưa có bản thu mà CÙNG chữ, CÙNG cách đọc có bản thu lành ở bài khác -> dùng luôn: giọng
      // thật của sách vẫn hơn giọng máy.
      if (!w.audio) {
        if (banThu.has(k)) { w.audio = banThu.get(k); doi++; hutGt++; }
        else if (w.audioTts && (!coFile(w.audioTts) || (chuMay(w) !== h && w.audioTts !== ttsPath(chuMay(w))))) {
          // mp3 giọng máy mất file, hoặc chữ đơn đa âm đang trỏ vào mp3 đọc cách đọc mặc định
          w.audioTts = ttsPath(chuMay(w));
          if (!coFile(w.audioTts)) canSinh.add(chuMay(w));
          doi++; hutGt++;
        }
        continue;
      }
      const hong = !coFile(w.audio) || clipHut(h, w.audio) || muonLech(w);
      if (!hong) {
        // bản thu thật dùng được; mp3 giọng máy DỰ PHÒNG (khi tải clip lỗi) cũng phải có file
        if (w.audioTts && !coFile(w.audioTts)) {
          w.audioTts = ttsPath(chuMay(w));
          if (!coFile(w.audioTts)) canSinh.add(chuMay(w));
          doi++; hutGt++;
        }
        continue;
      }
      const thuKhac = banThu.get(k);
      if (thuKhac && thuKhac !== w.audio) { w.audio = thuKhac; doi++; hutGt++; continue; }
      delete w.audio;
      const cm = chuMay(w);
      const may = cm !== h ? (coTts(cm) ? ttsPath(cm) : null) : (mpGiongMay.get(h) || (coTts(h) ? ttsPath(h) : null));
      w.audioTts = may || ttsPath(cm);
      if (!may) canSinh.add(cm);
      doi++; hutGt++;
    }
  }
  if (doi && !XEM) {
    // Chỉ thay ĐÚNG object literal của export này — file còn export `thoidaiRange<N>` ở dưới,
    // cắt theo `indexOf('export const')` là xoá mất nó (và mọi bài con mất mốc from/to).
    fs.writeFileSync(Qn.file, Qn.txt.slice(0, Qn.kh.dau) + JSON.stringify(Qn.data, null, 1) + Qn.txt.slice(Qn.kh.cuoi), 'utf8');
  }
  if (doi) bao(`[Giáo trình Q${Qn.q}] ${doi} mục đổi nguồn âm thanh`);
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
