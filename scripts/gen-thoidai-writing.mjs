// =============================================================
// Sinh dữ liệu LUYỆN VIẾT cho Giáo trình THỜI ĐẠI (時代華語) — 2026-09-05
// =============================================================
//   node scripts/gen-thoidai-writing.mjs --quyen 1,2,3,4,5
//
// Giống hệt cách làm ở Đương đại (CLAUDE.md 4.26g), chỉ khác: số phần mỗi bài của Thời Đại
// KHÔNG cố định (quyển 1 có 3 phần) nên duyệt thẳng các khoá trong `thoidaiRange*`.
//
// Tab Luyện viết chỉ cần `[{ char, pinyin }]` — CHỮ HÁN ĐƠN + pinyin của chính chữ đó
// (HanziWriter vẽ nét từ chữ, không cần dữ liệu nét riêng). Vậy KHÔNG cần nguồn ngoài:
// tách thẳng từ vựng của bài ra từng chữ.
//
// Khó ở chỗ ghép pinyin cho ĐÚNG chữ: từ vựng chỉ có pinyin của cả từ, viết liền ("lùrén").
// Tách bằng regex âm tiết là sai (tham lam, nuốt cả chuỗi). Cách dùng ở đây: lấy 407 âm tiết
// pinyin hợp lệ có sẵn trong src/data/pinyinChartData.js rồi khớp DÀI NHẤT TRƯỚC trên chuỗi đã
// bỏ dấu — đã kiểm: 路人->lù/rén, 紅綠燈->hóng/lǜ/dēng, 提款機->tí/kuǎn/jī đều đúng.
//
// Chỉ nhận khi SỐ ÂM TIẾT KHỚP SỐ CHỮ HÁN. Lệch (từ có chữ Latin/số, tên riêng lạ) thì bỏ từ đó
// thay vì gán pinyin sai cho chữ — dạy sai chữ còn tệ hơn thiếu chữ.
// =============================================================

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { pinyinChart } from '../src/data/pinyinChartData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2);
const lay = (c, md) => { const i = argv.indexOf(c); return i >= 0 && argv[i + 1] ? argv[i + 1] : md; };
const QUYEN = (lay('--quyen', '1') || '').split(',').map((x) => Number(x.trim())).filter(Boolean);

const AM_TIET = (() => {
  const s = new Set();
  for (const tm of Object.keys(pinyinChart)) {
    for (const vm of Object.keys(pinyinChart[tm])) {
      const v = pinyinChart[tm][vm];
      if (v && v[0]) s.add(String(v[0]).toLowerCase());
    }
  }
  return [...s].sort((a, b) => b.length - a.length);   // dài nhất trước
})();

const boDau = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[üÜ]/g, 'v').toLowerCase();
const laHan = (c) => /[一-鿿]/.test(c);

/** "lùrén" -> ["lù","rén"]; không tách được -> null. */
function tachAmTiet(pinyin) {
  // Sách Thời Đại hay ghi 2 cách đọc ("nǎ/něi") hoặc kèm chú thích trong ngoặc — chỉ lấy cách
  // đọc đầu, nếu không thì cả từ bị bỏ vì "số âm tiết không khớp số chữ".
  const raw = String(pinyin || '').split(/[/／,，]/)[0].replace(/\(.*?\)|（.*?）/g, '').replace(/\s+/g, '');
  const flat = boDau(raw);
  if (!flat) return null;
  const doan = [];
  let i = 0;
  while (i < flat.length) {
    const hit = AM_TIET.find((s) => flat.startsWith(s, i));
    if (!hit) return null;
    doan.push([i, i + hit.length]);
    i += hit.length;
  }
  return doan.map(([a, b]) => raw.slice(a, b));
}

async function main() {
  for (const q of QUYEN) {
    const mod = await import(`../src/data/thoidaiVocab${q}.js`);
    const vocab = mod[`thoidaiVocab${q}`];
    const range = mod[`thoidaiRange${q}`];
    const ra = {};
    let boQua = 0, tongChu = 0;

    for (const [key, list] of Object.entries(vocab)) {
      const parts = Object.keys(range).filter((k) => k.startsWith(key + '.')).map((k) => k.split('.')[1]);
      for (const part of parts) {
        const r = range[`${key}.${part}`];
        if (!r || r.to < r.from) continue;
        const tu = list.slice(r.from - 1, r.to);
        const daCo = new Set();
        const chu = [];
        for (const w of tu) {
          const han = [...w.hanzi].filter(laHan);
          if (!han.length) continue;
          const am = tachAmTiet(w.pinyin);
          // Số âm tiết phải bằng số chữ Hán, nếu không thì không biết âm nào của chữ nào.
          if (!am || am.length !== han.length) { boQua++; continue; }
          han.forEach((c, i) => {
            if (daCo.has(c)) return;      // trong 1 bài chỉ luyện mỗi chữ một lần
            daCo.add(c);
            chu.push({ char: c, pinyin: am[i] });
          });
        }
        if (chu.length) { ra[`${key}.${part}`] = chu; tongChu += chu.length; }
      }
    }

    const out = path.join(ROOT, 'src', 'data', `thoidaiWriting${q}.js`);
    await fs.writeFile(out, `// Luyện viết Thời Đại quyển ${q} — SINH TỰ ĐỘNG, đừng sửa tay.\n`
      + `//   node scripts/gen-thoidai-writing.mjs --quyen ${q}\n`
      + `// Tách chữ Hán đơn từ chính từ vựng của bài + ghép pinyin theo âm tiết (như 4.26g).\n`
      + `export const thoidaiWriting${q} = ${JSON.stringify(ra, null, 1)};\n`, 'utf8');
    console.log(`✅ Quyển ${q}: ${Object.keys(ra).length} bài con, ${tongChu} chữ`
      + (boQua ? ` · bỏ ${boQua} từ (pinyin không khớp số chữ)` : ''));
  }
}

main().catch((e) => { console.error('💥', e); process.exit(1); });
