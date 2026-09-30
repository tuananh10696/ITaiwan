#!/usr/bin/env node
/**
 * KIỂM TOÀN BỘ ÂM THANH — 2026-09-30
 *
 *   node scripts/kiem-audio.mjs            # báo cáo
 *   node scripts/kiem-audio.mjs --im       # chỉ in số, mã thoát 1 nếu còn lỗi (dùng cho CI)
 *
 * Bốn loại lỗi mà app KHÔNG tự báo — bấm loa không nghe gì, console sạch trơn:
 *
 *   1. THIẾU FILE. Dữ liệu trỏ vào `/audio/...` không có trên đĩa. App rơi xuống nguồn sau
 *      (mp3 giọng máy -> Web Speech) nên nhìn bề ngoài vẫn "chạy", nhưng nhiều máy không có
 *      giọng zh-TW nào nên rơi tới đáy là im bặt.
 *   2. CLIP CÂM / CẮT HỤT. File có thật, phát "thành công", mà gần như không có tiếng.
 *      `ddSpeakWord` chỉ bỏ clip < 0,25s; clip 0,32s đọc từ 2 âm tiết thì lọt lưới.
 *      Ở đây xét theo ĐỘ DÀI TRÊN MỖI ÂM TIẾT (< 0,24s là cắt hụt).
 *   3. URL ngoài dùng `http://`. Trang chạy HTTPS thì trình duyệt CHẶN mixed content —
 *      thẻ <audio> im lặng không phát, không có lỗi mạng nào để lần ra.
 *   4. ĐƯỜNG DẪN TƯƠNG ĐỐI (không bắt đầu bằng `/` hoặc `http`). Trình duyệt ghép vào URL
 *      trang hiện tại nên mỗi trang một kết quả 404 khác nhau.
 *
 * Cần `ffprobe` cho loại 2; không có thì bỏ qua phần đó và nói rõ.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const IM = process.argv.includes('--im');
const PUB = path.join(ROOT, 'public');

const noi = (...a) => { if (!IM) console.log(...a); };
const coFile = (p) => fs.existsSync(path.join(PUB, p));

// ---------------------------------------------------------------- gom mọi tham chiếu
/** [{src, oNoi, hanzi}] — hanzi chỉ có với từ vựng, dùng để xét độ dài trên mỗi âm tiết. */
const thamChieu = [];

const dequy = (d, ra = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) dequy(p, ra); else ra.push(p);
  }
  return ra;
};

// 1) từ vựng giáo trình + TOCFL: có chữ Hán nên xét được cả độ dài clip
const tuVung = [];
for (const f of fs.readdirSync(path.join(PUB, 'data/giaotrinh'))) {
  const d = JSON.parse(fs.readFileSync(path.join(PUB, 'data/giaotrinh', f), 'utf8'));
  for (const w of d.v || []) tuVung.push({ oNoi: `giaotrinh/${f}`, ...w });
  for (const [id, dlg] of Object.entries(d.d || {})) {
    if (dlg.audio) thamChieu.push({ src: dlg.audio, oNoi: `giaotrinh/${f} · hội thoại ${id}` });
  }
}
for (const f of fs.readdirSync(path.join(PUB, 'data/tocfl'))) {
  if (!/^cap-/.test(f)) continue;
  const d = JSON.parse(fs.readFileSync(path.join(PUB, 'data/tocfl', f), 'utf8'));
  for (const w of d.tu || []) tuVung.push({ oNoi: `tocfl/${f}`, ...w });
}
for (const w of tuVung) {
  for (const k of ['audio', 'audioTts', 'tts']) {
    if (w[k]) thamChieu.push({ src: w[k], oNoi: `${w.oNoi} · ${w.hanzi}`, hanzi: w.hanzi, truong: k });
  }
}

// 2) mọi đường dẫn audio còn lại trong dữ liệu (đề luyện tập, đề thi, bảng phiên âm…)
for (const p of dequy(path.join(PUB, 'data')).concat(dequy(path.join(ROOT, 'src/data')))) {
  if (!/\.(json|js|mjs)$/.test(p) || /\/tudien\//.test(p)) continue;
  // Giáo trình và TOCFL đã quét ở bước 1 (kèm chữ Hán) — quét lại là đếm đôi.
  if (/[/\\]data[/\\](giaotrinh|tocfl)[/\\]/.test(p) || /[/\\]src[/\\]data[/\\]thoidai(Vocab|Dialogues)/.test(p)) continue;
  const txt = fs.readFileSync(p, 'utf8');
  for (const raw of txt.match(/["'](\/audio\/[^"']*|https?:\/\/[^"']*\.(?:mp3|m4a|ogg|wav))["']/g) || []) {
    thamChieu.push({ src: raw.slice(1, -1), oNoi: path.relative(ROOT, p) });
  }
}

// 3) bảng phiên âm + bảng âm của khu Học phát âm (file JS, giá trị là URL)
const bangJs = ['src/data/pinyinChartData.js', 'src/data/pronAudioMap.js', 'src/data/pronAudioFix.js'];
for (const f of bangJs) {
  const mod = await import(pathToFileURL(path.join(ROOT, f)).href);
  for (const bang of Object.values(mod)) {
    if (!bang || typeof bang !== 'object') continue;
    for (const [k, v] of Object.entries(bang)) {
      if (typeof v === 'string' && /\.mp3$/i.test(v)) thamChieu.push({ src: v, oNoi: `${f} · ${k}` });
    }
  }
}

// ---------------------------------------------------------------- phân loại lỗi
const loi = { thieu: [], tuongDoi: [], http: [], hut: [] };
const nguonNgoai = new Set();

for (const t of thamChieu) {
  const s = t.src;
  if (/^https?:\/\//i.test(s)) {
    if (/^http:\/\//i.test(s)) loi.http.push(t);
    nguonNgoai.add(s);
    continue;
  }
  if (!s.startsWith('/')) { loi.tuongDoi.push(t); continue; }
  if (!coFile(s)) loi.thieu.push(t);
}

// clip cắt hụt — chỉ xét được với từ vựng (biết số âm tiết)
let coFfprobe = true;
try { execFileSync('ffprobe', ['-version'], { stdio: 'ignore' }); } catch { coFfprobe = false; }
if (coFfprobe) {
  const doDai = new Map();
  const soAmTiet = (s) => (String(s || '').match(/[㐀-鿿豈-﫿]/g) || []).length || 1;
  for (const t of thamChieu) {
    if (!t.hanzi || !t.src.startsWith('/') || !coFile(t.src)) continue;
    if (!doDai.has(t.src)) {
      try {
        const out = execFileSync('ffprobe',
          ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path.join(PUB, t.src)],
          { encoding: 'utf8' });
        doDai.set(t.src, parseFloat(out.trim()) || 0);
      } catch { doDai.set(t.src, 0); }
    }
    const d = doDai.get(t.src);
    const moiAm = d / soAmTiet(t.hanzi);
    // 0,24s/âm tiết: bản thu thật ngắn nhất trong kho là 0,42s/âm tiết, mp3 giọng máy 0,49s.
    if (d > 0 && moiAm < 0.24) loi.hut.push({ ...t, giay: +d.toFixed(2), moiAm: +moiAm.toFixed(2) });
  }
}

// ---------------------------------------------------------------- báo cáo
noi(`Đã soát ${thamChieu.length} tham chiếu âm thanh (${nguonNgoai.size} URL ngoài).\n`);
const bang = [
  ['Thiếu file trên đĩa', loi.thieu],
  ['Đường dẫn tương đối (404 tuỳ trang)', loi.tuongDoi],
  ['URL http:// — bị chặn mixed content trên HTTPS', loi.http],
  ['Clip cắt hụt (< 0,24s mỗi âm tiết)', loi.hut],
];
for (const [ten, ds] of bang) {
  const dau = ds.length ? '❌' : '✅';
  console.log(`${dau} ${ten}: ${ds.length}`);
  if (!IM) for (const t of ds.slice(0, 12)) {
    console.log(`     ${t.src}${t.moiAm ? ` (${t.giay}s · ${t.moiAm}s/âm)` : ''}  ←  ${t.oNoi}`);
  }
  if (!IM && ds.length > 12) console.log(`     … và ${ds.length - 12} mục nữa`);
}
if (!coFfprobe) console.log('⚠️  không có ffprobe — bỏ qua phần kiểm clip cắt hụt');

const tong = bang.reduce((s, [, d]) => s + d.length, 0);
if (tong) process.exitCode = 1;
