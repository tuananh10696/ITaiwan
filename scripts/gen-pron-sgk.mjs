#!/usr/bin/env node
/**
 * BẢNG ÂM THANH THẬT CHO TRANG "HỌC PHÁT ÂM" — 2026-10-01
 *
 *   node scripts/gen-pron-sgk.mjs            (npm run audio:pron-sgk)
 *
 * Chạy sau scripts/cat-phat-am-sgk.py. Sinh src/data/pronSgkAudio.js:
 *   pronSgkAm   { 'initials/b': mp3, 'finals/ai': mp3 }   thanh mẫu / vận mẫu — một giọng của sách
 *   pronViDu    { '八|bā': mp3 }                            mọi chữ/từ ví dụ trên 3 trang phát âm
 *   pronBangSgk { 'a': mp3, 'wa': mp3 }                     ô bảng phiên âm hàng "không thanh mẫu"
 *
 * Nguồn cho một ví dụ, theo thứ tự:
 *   1) bản ghi bài phát âm của sách (scripts/du-lieu/phat-am-sgk.json, loại "tu") — đúng chữ
 *   2) bản thu phần Từ vựng của sách (thoidaiVocab1-5) — đúng chữ, đúng cách đọc, clip là của CHÍNH mục đó
 *      (không lấy clip mượn, không lấy clip trong scripts/audio-clip-sai.json)
 *   3) chữ đơn: âm tiết cùng thanh trong bộ 4 thanh của bài phát âm (大 dà <- dà) — cùng một âm
 * Không có nguồn nào -> không ghi; app đọc bằng giọng máy và script in ra để người sửa biết.
 */
import fs from 'node:fs';
import path from 'node:path';
import { initialsData, initialPairs, finalsData, tonesData, toneMinimalSet, toneDrills, toneSandhi, toneMarkRules, pronQuiz }
  from '../src/data/pronunciationData.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const SGK = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/du-lieu/phat-am-sgk.json'), 'utf8'));
const SAI = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/audio-clip-sai.json'), 'utf8'));
const OUT = path.join(ROOT, 'src/data/pronSgkAudio.js');
const coFile = (p) => fs.existsSync(path.join(ROOT, 'public', p));

// ---------- pinyin: so khớp cách đọc ----------
const DAU = { ā: 'a1', á: 'a2', ǎ: 'a3', à: 'a4', ē: 'e1', é: 'e2', ě: 'e3', è: 'e4', ī: 'i1', í: 'i2', ǐ: 'i3', ì: 'i4',
  ō: 'o1', ó: 'o2', ǒ: 'o3', ò: 'o4', ū: 'u1', ú: 'u2', ǔ: 'u3', ù: 'u4', ǖ: 'v1', ǘ: 'v2', ǚ: 'v3', ǜ: 'v4' };
const gon = (p) => String(p || '').normalize('NFC').toLowerCase().replace(/[\s'’\-.,。!?！？、]/g, '').replace(/ü/g, 'v');
/** 'nǐhǎo' -> 'ni3hao3' ; không dấu = thanh nhẹ (0) */
function soHoa(p) {
  let s = gon(p), ra = '', thanh = '';
  for (const c of s) {
    if (DAU[c]) { ra += DAU[c][0]; thanh = DAU[c][1]; } else ra += c;
  }
  return { tron: ra, thanh };
}
/** Tách pinyin liền thành âm tiết để so thanh từng âm (đủ dùng cho từ 1-4 âm tiết). */
const AM_TIET = /(?:zh|ch|sh|[bpmfdtnlgkhjqxrzcsyw])?(?:iang|iong|uang|ueng|iao|ian|uai|uan|van|ang|eng|ing|ong|ai|ei|ao|ou|an|en|in|un|vn|ia|ie|iu|ua|uo|ui|ve|er|a|o|e|i|u|v)(?:r(?![aeiouv]))?/g;
function tachAm(p) {
  const s = gon(p);
  const ra = [];
  let bo = '';
  for (const c of s) bo += DAU[c] ? DAU[c][0] : c;
  const m = bo.match(AM_TIET) || [];
  // thanh của từng âm tiết: dò lại trên chuỗi gốc theo vị trí
  let vt = 0;
  for (const am of m) {
    const doan = [...s].slice(vt, vt + am.length).join('');
    const t = [...doan].map((c) => (DAU[c] ? DAU[c][1] : '')).join('') || '0';
    ra.push(am + t);
    vt += am.length;
  }
  return ra;
}
/** Cùng cách đọc: cùng âm tiết, cùng thanh; âm tiết thanh nhẹ ở một bên thì bỏ qua thanh (sách ghi lúc có lúc không). */
function cungDoc(a, b) {
  const x = tachAm(a), y = tachAm(b);
  if (x.length !== y.length || !x.length) return false;
  return x.every((am, i) => {
    const [p, t] = [am.slice(0, -1), am.slice(-1)];
    const [q, u] = [y[i].slice(0, -1), y[i].slice(-1)];
    if (p !== q) return false;
    return t === u || t === '0' || u === '0' || (i > 0 && (t === '0' || u === '0'));
  });
}

// ---------- nguồn 1: bài phát âm của sách ----------
const tuSgk = new Map();       // chữ -> [{py, file}]
const amSgk = new Map();       // 'da4' -> file
for (const v of Object.values(SGK)) {
  if (v.loai === 'tu') {
    const hz = v.hz.replace(/[。！？]$/, '');
    if (!tuSgk.has(hz)) tuSgk.set(hz, []);
    tuSgk.get(hz).push(v);
  } else if (v.loai === 'am') {
    const { tron, thanh } = soHoa(v.py);
    amSgk.set(tron + thanh, v.file);
  }
}

// Tên thanh mẫu (bō pō mō … sī) và vận mẫu đọc đứng riêng đều là thanh 1 -> cũng là âm tiết dùng được
const TEN_TM = { b: 'bo', p: 'po', m: 'mo', f: 'fo', d: 'de', t: 'te', n: 'ne', l: 'le', g: 'ge', k: 'ke', h: 'he',
  j: 'ji', q: 'qi', x: 'xi', zh: 'zhi', ch: 'chi', sh: 'shi', r: 'ri', z: 'zi', c: 'ci', s: 'si' };
const DUNG_RIENG = { i: 'yi', ia: 'ya', ie: 'ye', iao: 'yao', iu: 'you', ian: 'yan', in: 'yin', iang: 'yang', ing: 'ying',
  iong: 'yong', u: 'wu', ua: 'wa', uo: 'wo', uai: 'wai', ui: 'wei', uan: 'wan', un: 'wen', uang: 'wang', ueng: 'weng',
  'ü': 'yu', 'üe': 'yue', 'üan': 'yuan', 'ün': 'yun' };
for (const v of Object.values(SGK)) {
  let am = null;
  if (v.loai === 'thanh-mau') am = TEN_TM[v.py];
  if (v.loai === 'van-mau' && !['ê', 'yai'].includes(v.py)) am = (DUNG_RIENG[v.py] || v.py).replace(/ü/g, 'v');
  if (am && !amSgk.has(am + '1')) amSgk.set(am + '1', v.file);
}

// ---------- nguồn 2: bản thu Từ vựng của sách ----------
const baiCuaClip = (a) => {
  const m = /B(\d)L(\d+)-/.exec(a || '');
  return m ? `td${m[1]}-${parseInt(m[2], 10)}` : '';
};
const clipSai = new Set(Object.keys(SAI).map((k) => `/audio/thoidai-tu/${k}.mp3`));
const tuSach = new Map();       // chữ -> [{py, file}]
for (let q = 1; q <= 5; q++) {
  const txt = fs.readFileSync(path.join(ROOT, 'src/data', `thoidaiVocab${q}.js`), 'utf8');
  const dau = txt.indexOf('{', txt.indexOf(`export const thoidaiVocab${q}`));
  let sau = 0, cuoi = dau, chuoi = null;
  for (let k = dau; k < txt.length; k++) {      // tìm } đóng của object (bỏ qua ngoặc trong chuỗi)
    const c = txt[k];
    if (chuoi) { if (c === '\\') k++; else if (c === chuoi) chuoi = null; continue; }
    if (c === '"' || c === "'") { chuoi = c; continue; }
    if (c === '{') sau++; else if (c === '}' && --sau === 0) { cuoi = k + 1; break; }
  }
  const data = JSON.parse(txt.slice(dau, cuoi));
  for (const [bai, ds] of Object.entries(data)) for (const w of ds) {
    const a = w.audio;
    if (!a || clipSai.has(a) || baiCuaClip(a) !== bai || !coFile(a)) continue;   // chỉ clip của chính mục
    for (const hz of String(w.hanzi || '').split('/').map((x) => x.trim()).filter(Boolean)) {
      if (!tuSach.has(hz)) tuSach.set(hz, []);
      tuSach.get(hz).push({ py: w.pinyin, file: a });
    }
  }
}

/** uuTienAm: bộ luyện thanh / câu nghe đoán thanh — lấy âm tiết trong bộ 4 thanh trước (cùng một giọng,
 *  đọc tách rõ từng thanh), rồi mới tới bản thu từ vựng (mỗi từ một giọng, một bài khác nhau). */
function timNguon(hz, py, uuTienAm = false) {
  const chu = String(hz || '').trim();
  if (uuTienAm && [...chu].length === 1) {
    const [am] = tachAm(py);
    if (am && amSgk.has(am)) return amSgk.get(am);
  }
  for (const v of tuSgk.get(chu) || []) if (cungDoc(v.py, py)) return v.file;
  for (const v of tuSach.get(chu) || []) if (cungDoc(v.py, py)) return v.file;
  if ([...chu].length === 1) {
    const [am] = tachAm(py);
    if (am && amSgk.has(am)) return amSgk.get(am);
  }
  return '';
}

// ---------- gom mọi chữ ví dụ cần âm ----------
const can = [];
// `doc`: cách đọc thật khi khác cách viết (biến điệu: viết yī gè, đọc yí ge) — bản thu ghi theo cách đọc
const them = (hz, py, noi, doc, uuTienAm) => { if (hz && py) can.push({ hz, py, noi, doc, uuTienAm }); };
for (const g of initialsData) for (const it of g.items) for (const e of it.examples) them(e.hanzi, e.pinyin, `thanh mẫu ${it.pinyin}`);
for (const g of finalsData) for (const it of g.items) for (const e of it.examples) them(e.hanzi, e.pinyin, `vận mẫu ${it.pinyin}`);
for (const it of toneMinimalSet.items) them(it.hanzi, it.pinyin, `bộ ${toneMinimalSet.syllable}`, null, true);
for (const d of toneDrills) for (const it of d.items) them(it.hanzi, it.pinyin, `bộ ${d.syllable}`, null, true);
for (const q of pronQuiz.tones || []) if (q.type === 'listen') them(q.speak, q.pinyin, 'trắc nghiệm thanh', null, true);
for (const s of toneSandhi) for (const e of s.examples) them(e.hanzi, e.written, `biến điệu: ${s.title}`, e.spoken);
for (const r of toneMarkRules) for (const sm of r.samples || []) them(sm.hanzi, sm.pinyin, 'đánh dấu thanh');

const pronViDu = {};
const thieu = [];
for (const c of can) {
  const k = `${c.hz}|${c.py}`;
  if (k in pronViDu) continue;
  const f = timNguon(c.hz, c.py, c.uuTienAm) || (c.doc ? timNguon(c.hz, c.doc) : '');
  if (f) pronViDu[k] = f; else thieu.push(c);
}

// ---------- thanh mẫu / vận mẫu ----------
const pronSgkAm = {};
for (const v of Object.values(SGK)) {
  if (v.loai === 'thanh-mau') pronSgkAm[`initials/${v.py}`] = v.file;
  if (v.loai === 'van-mau') pronSgkAm[`finals/${v.py}`] = v.file;
}
// ---------- bảng phiên âm: hàng không thanh mẫu = vận mẫu đọc đứng riêng ----------
const VIET_RIENG = { yi: 'i', ya: 'ia', ye: 'ie', yao: 'iao', you: 'iu', yan: 'ian', yin: 'in', yang: 'iang', ying: 'ing',
  yong: 'iong', wu: 'u', wa: 'ua', wo: 'uo', wai: 'uai', wei: 'ui', wan: 'uan', wen: 'un', wang: 'uang', weng: 'ueng',
  yu: 'ü', yue: 'üe', yuan: 'üan', yun: 'ün' };
const pronBangSgk = {};
for (const f of ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er']) {
  if (pronSgkAm[`finals/${f}`]) pronBangSgk[f] = pronSgkAm[`finals/${f}`];
}
for (const [am, f] of Object.entries(VIET_RIENG)) if (pronSgkAm[`finals/${f}`]) pronBangSgk[am] = pronSgkAm[`finals/${f}`];

const js = `// ============================================================
// TỰ ĐỘNG SINH bởi scripts/gen-pron-sgk.mjs — ĐỪNG SỬA TAY (npm run audio:pron-sgk)
// Âm thanh THẬT cho trang Học phát âm, lấy từ bài phát âm + phần Từ vựng của giáo trình Thời Đại.
// Mục nào không có ở đây thì app đọc bằng giọng máy.
// Đang có: ${Object.keys(pronSgkAm).length} thanh mẫu/vận mẫu · ${Object.keys(pronViDu).length}/${Object.keys(pronViDu).length + thieu.length} chữ ví dụ · ${Object.keys(pronBangSgk).length} ô bảng phiên âm
// ============================================================
export const pronSgkAm = ${JSON.stringify(pronSgkAm, null, 1)};

export const pronViDu = ${JSON.stringify(pronViDu, null, 1)};

export const pronBangSgk = ${JSON.stringify(pronBangSgk, null, 1)};
`;
fs.writeFileSync(OUT, js, 'utf8');
console.log(`thanh mẫu/vận mẫu: ${Object.keys(pronSgkAm).length} · ví dụ có âm thật: ${Object.keys(pronViDu).length}/${Object.keys(pronViDu).length + thieu.length} · ô bảng: ${Object.keys(pronBangSgk).length}`);
if (thieu.length) {
  console.log(`⚠️  ${thieu.length} ví dụ chưa có âm thật (đang đọc bằng giọng máy):`);
  for (const c of thieu) console.log(`   ${c.hz} ${c.py}  — ${c.noi}`);
}
void initialPairs; void tonesData;
