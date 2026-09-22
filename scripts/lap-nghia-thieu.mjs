// =============================================================
// LẤP NGHĨA / PHIÊN ÂM CÒN THIẾU CỦA TỪ VỰNG — 2026-09-13
//   node scripts/lap-nghia-thieu.mjs [--xem]
//
// Rà 2026-09-13 tìm thấy trong dữ liệu giáo trình (gần như toàn bộ ở bộ THỜI ĐẠI, vốn bóc từ
// PPT nên hay sót — xem CLAUDE.md 4.27):
//   • 128 từ có `def` RỖNG            -> thẻ từ hiện chữ Hán mà không có nghĩa nào
//   • 156 từ thiếu `pinyin`           -> không đọc được, không tra được
//   •  41 từ có `def` là MẨU PINYIN   -> "奶茶 = ǎichá", "大聲 = ǐ bú yào shuō..."
//
// Cách lấp: tra chính vốn từ ĐÃ RÀ của dự án theo thứ tự tin cậy giảm dần —
//   1. từ vựng giáo trình khác đã có nghĩa   (cùng dự án, đã rà tay)
//   2. bảng từ TOCFL / HSK                   (nghĩa đã rà ở 4.34b / 4.35)
//   3. kho tra cứu `public/data/tudien/kho.json`
// KHÔNG có nguồn nào khớp thì ĐỂ NGUYÊN và báo ra — bịa nghĩa còn tệ hơn để trống.
//
// ⚠️ Chỉ ghi vào ô ĐANG TRỐNG (hoặc ô chứa rác pinyin). Không bao giờ đè lên nghĩa đã có.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOC = path.resolve(__dirname, '..');
const XEM = process.argv.includes('--xem');

const docJson = (p) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } };

// Dấu thanh pinyin mà tiếng Việt KHÔNG dùng — chỗ duy nhất phân biệt chắc chắn "nghĩa" với "pinyin".
const DAU_HAN = /[āēīōūǖǎěǐǒǔǚǘǜ]/;
const CJK = /[㐀-鿿]/;
const laRacPinyin = (s) => !!s && DAU_HAN.test(s) && !CJK.test(s) && !/[ăâêôơưđ]/i.test(s);

/** "Táiwān; Đài Loan" -> "Đài Loan": cắt vế pinyin dẫn đầu, giữ phần nghĩa thật phía sau. */
function catVePinyin(s) {
  const i = s.indexOf(';');
  if (i > 0) {
    const dau = s.slice(0, i).trim();
    const sau = s.slice(i + 1).trim();
    if (laRacPinyin(dau) && sau && !laRacPinyin(sau)) return sau;
  }
  return null;
}

// ------------------------------------------------------------------ dựng từ điển tra
/** hanzi -> { def, pinyin } theo thứ tự ưu tiên; nguồn nạp trước thắng. */
const tra = new Map();
const them = (hz, def, py) => {
  if (!hz) return;
  const cu = tra.get(hz) || {};
  if (!cu.def && def) cu.def = def;
  if (!cu.pinyin && py) cu.pinyin = py;
  tra.set(hz, cu);
};

// 1. từ vựng giáo trình đã có nghĩa
const dGT = path.join(GOC, 'public/data/giaotrinh');
for (const f of fs.readdirSync(dGT)) {
  const d = docJson(path.join(dGT, f));
  for (const w of (d?.v || [])) {
    const def = String(w.def || '').trim();
    if (def && !laRacPinyin(def)) them(w.hanzi, def, String(w.pinyin || '').trim());
  }
}
// 2. TOCFL rồi HSK
for (const [thu, lay] of [['tocfl', (d) => d?.tu || []], ['hsk', (d) => d?.v || []]]) {
  const dir = path.join(GOC, 'public/data', thu);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    const d = docJson(path.join(dir, f));
    for (const w of lay(d)) {
      const def = String(w.def || '').trim();
      if (def && !laRacPinyin(def)) {
        them(w.hanzi, def, String(w.pinyin || '').trim());
        if (w.traditional) them(w.traditional, def, String(w.pinyin || '').trim());
      }
    }
  }
}
// 3. kho tra cứu (mảng: [phồn, ?, pinyin-không-dấu, pinyin, nghĩa, từ loại, ...])
for (const r of (docJson(path.join(GOC, 'public/data/tudien/kho.json')) || [])) {
  const def = String(r[4] || '').trim();
  if (def && !laRacPinyin(def)) them(r[0], def, String(r[3] || '').trim());
}

console.log(`Từ điển tra dựng được: ${tra.size} mục`);

/** Từ ghi "A/B" (hai cách nói) — thử từng vế. */
const ungVien = (hz) => [hz, ...String(hz).split('/').map((x) => x.trim())].filter(Boolean);
const timDef = (hz) => { for (const k of ungVien(hz)) { const v = tra.get(k); if (v?.def) return v.def; } return null; };
const timPy = (hz) => { for (const k of ungVien(hz)) { const v = tra.get(k); if (v?.pinyin) return v.pinyin; } return null; };

// ------------------------------------------------------------------ vá vào src/data
const dSrc = path.join(GOC, 'src/data');
const KHOA = /(["']?(def|pinyin)["']?\s*:\s*)(["'])((?:\\.|(?!\3)[^\\])*)\3/g;

let laDef = 0, laPy = 0, laRac = 0, conThieuDef = [], conThieuPy = [];
const doi = [];

/**
 * Mỗi file có HAI export: object từ vựng và object phạm vi bài (`{from,to}`).
 * Tách từng khối `export const TEN = {...};` rồi chỉ nhận khối mà giá trị là MẢNG từ.
 */
function tachKhoiTuVung(src) {
  for (const m of src.matchAll(/export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*/g)) {
    const mo = src.indexOf('{', m.index + m[0].length - 1);
    if (mo < 0) continue;
    let sau = 1, i = mo + 1;
    while (i < src.length && sau > 0) {
      const c = src[i];
      if (c === '{') sau++;
      else if (c === '}') sau--;
      else if (c === '"') { i++; while (i < src.length && (src[i] !== '"' || src[i - 1] === '\\')) i++; }
      i++;
    }
    const than = src.slice(mo, i);
    let o;
    try { o = JSON.parse(than); } catch { continue; }
    const dau = Object.values(o)[0];
    if (Array.isArray(dau)) return { ten: m[1], o, mo, het: i };
  }
  return null;
}

for (const f of fs.readdirSync(dSrc)) {
  if (!/Vocab\d*\.js$/.test(f)) continue;
  const p = path.join(dSrc, f);
  const src = fs.readFileSync(p, 'utf8');
  const khoi = tachKhoiTuVung(src);
  if (!khoi) { console.warn(`  (bỏ qua ${f}: không phân tích được)`); continue; }
  const d = khoi.o;

  let sua = false;
  for (const bai of Object.keys(d)) {
    for (const w of (d[bai] || [])) {
      const hz = w.hanzi;
      const def = String(w.def ?? '').trim();

      if (!def) {
        const moi = timDef(hz);
        if (moi) { w.def = moi; laDef++; sua = true; doi.push(`${f} ${bai} ${hz} def: (rỗng) -> ${moi.slice(0, 40)}`); }
        else conThieuDef.push(`${f} ${bai} ${hz}`);
      } else if (laRacPinyin(def)) {
        const catDuoc = catVePinyin(def);
        const moi = catDuoc || timDef(hz);
        if (moi) { w.def = moi; laRac++; sua = true; doi.push(`${f} ${bai} ${hz} def: "${def.slice(0, 22)}" -> ${moi.slice(0, 40)}`); }
        else conThieuDef.push(`${f} ${bai} ${hz} (def rác: ${def.slice(0, 20)})`);
      }

      if (!String(w.pinyin ?? '').trim()) {
        const moi = timPy(hz);
        if (moi) { w.pinyin = moi; laPy++; sua = true; }
        else conThieuPy.push(`${f} ${bai} ${hz}`);
      }
    }
  }

  if (sua && !XEM) {
    // Thay ĐÚNG khối từ vựng, giữ nguyên mọi thứ khác (chú thích, export thứ hai).
    fs.writeFileSync(p, src.slice(0, khoi.mo) + JSON.stringify(d, null, 1) + src.slice(khoi.het));
  }
}

console.log(`\n${XEM ? '[chỉ xem] ' : ''}Đã lấp: ${laDef} nghĩa rỗng · ${laRac} nghĩa rác pinyin · ${laPy} phiên âm`);
console.log(`Còn thiếu nghĩa: ${conThieuDef.length} · còn thiếu phiên âm: ${conThieuPy.length}`);
if (conThieuDef.length) console.log('  ' + conThieuDef.slice(0, 12).join('\n  '));
if (doi.length) { console.log('\nMẫu thay đổi:'); console.log('  ' + doi.slice(0, 10).join('\n  ')); }
if (!XEM) console.log('\n⚠️  Chạy `npm run data:tach` để sinh lại public/data/giaotrinh/*.json');
