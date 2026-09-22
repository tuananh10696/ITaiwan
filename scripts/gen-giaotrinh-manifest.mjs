#!/usr/bin/env node
/**
 * Sinh `src/data/giaotrinh-manifest.js` — BẢNG SỐ LIỆU NHẸ của cả hai bộ giáo trình.
 *
 * VÌ SAO CẦN (2026-09-06, xem CLAUDE.md 4.30): danh sách bài trong sidebar phải có NGAY khi
 * vào trang, nhưng nó vốn được tính bằng cách đếm `duongdaiVocab[key].length` — tức là kéo
 * theo 11 MB từ vựng/ngữ pháp/hội thoại vào bundle chính. Manifest tách đúng phần SỐ (số từ
 * mỗi bài, from/to mỗi bài con, bài nào có ngữ pháp/hội thoại/luyện viết) ra một file ~20 KB,
 * để nội dung thật nạp động theo quyển.
 *
 * KHÔNG PHẢI GÕ TAY: `vite.config.js` chạy script này ở đầu mỗi lần build/dev khi thấy file
 * dữ liệu mới hơn manifest. Chạy tay được bằng `npm run data:manifest`.
 *
 * Script tự ĐỐI CHIẾU: dựng lại lessons/subs từ manifest rồi so với bản tính trực tiếp từ dữ
 * liệu thật — lệch một trường là thoát với mã lỗi, không ghi file. Đó là lưới an toàn duy nhất
 * chống chuyện manifest cũ đi mà không ai biết.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RA = path.join(ROOT, 'src/data/giaotrinh-manifest.js');
const nap = (p, q = '') => import(pathToFileURL(path.join(ROOT, 'src/data', p)).href + q);

/** Bảng `{id: true}` cho các khoá có dữ liệu thật (mảng rỗng / object rỗng = chưa có). */
function coDuLieu(obj) {
  const ra = [];
  for (const [k, v] of Object.entries(obj || {})) {
    const rong = v == null || (Array.isArray(v) ? !v.length : (typeof v === 'object' && !Object.keys(v).length));
    if (!rong) ra.push(k);
  }
  return ra.sort();
}

async function main() {
  const dd = await nap('duongdaiData.js');
  const ddG = await nap('duongdaiGrammar.js');
  const ddD = await nap('duongdaiDialogues.js');
  const td = await nap('thoidaiData.js');
  const tdG = await nap('thoidaiGrammar.js');
  const tdD = await nap('thoidaiDialogues.js');

  const bo = (lessons, subs, vocab, grammar, dialogues, writing) => ({
    total: Object.fromEntries(lessons.map((l) => [l.id, l.total])),
    range: Object.fromEntries(subs.map((s) => [s.id, [s.from, s.to]])),
    g: coDuLieu(grammar),
    d: coDuLieu(dialogues),
    w: coDuLieu(writing),
    // đối chiếu chéo: số từ trong manifest phải bằng số phần tử thật của mảng từ vựng
    _n: Object.fromEntries(Object.entries(vocab).map(([k, v]) => [k, v.length])),
  });

  const manifest = {
    duongdai: bo(dd.duongdaiLessons, dd.duongdaiSubLessons, dd.duongdaiVocab,
      ddG.duongdaiGrammar, ddD.duongdaiDialogues, dd.duongdaiWriting),
    thoidai: bo(td.thoidaiLessons, td.thoidaiSubLessons, td.thoidaiVocab,
      tdG.thoidaiGrammar, tdD.thoidaiDialogues, td.thoidaiWriting),
  };

  // --- Đối chiếu 1: total của manifest = độ dài mảng từ vựng thật ---
  for (const [ten, m] of Object.entries(manifest)) {
    for (const [k, n] of Object.entries(m.total)) {
      const that = m._n[k] || 0;
      if (n !== that) throw new Error(`${ten}: bài ${k} total=${n} nhưng từ vựng thật có ${that} từ`);
    }
    delete m._n;
  }

  // --- Ghi file ---
  const noiDung = `// FILE TỰ SINH bởi scripts/gen-giaotrinh-manifest.mjs — ĐỪNG SỬA TAY.
// Bảng số liệu nhẹ để dựng danh sách bài (sidebar) mà không phải nạp 11 MB từ vựng.
// total: số từ mỗi bài cha · range: [from, to] mỗi bài con · g/d/w: bài con có ngữ pháp /
// hội thoại / luyện viết. Xem CLAUDE.md 4.30.
export const GT_MANIFEST = ${JSON.stringify(manifest)};
`;
  const cu = fs.existsSync(RA) ? fs.readFileSync(RA, 'utf8') : '';
  if (cu === noiDung) return { doi: false, manifest };
  fs.writeFileSync(RA, noiDung);
  return { doi: true, manifest };
}

// --- Đối chiếu 2: dựng lại lessons/subs từ manifest, so với bản tính trực tiếp ---
async function kiemTra() {
  // import sau khi đã ghi file, nếu không sẽ đọc bản cũ
  const idx = await nap('giaotrinh-index.js', `?t=${Date.now()}`);
  const dd = await nap('duongdaiData.js');
  const td = await nap('thoidaiData.js');
  const cap = [
    ['duongdai lessons', idx.duongdaiLessons, dd.duongdaiLessons],
    ['duongdai subs', idx.duongdaiSubLessons, dd.duongdaiSubLessons],
    ['thoidai lessons', idx.thoidaiLessons, td.thoidaiLessons],
    ['thoidai subs', idx.thoidaiSubLessons, td.thoidaiSubLessons],
  ];
  for (const [ten, a, b] of cap) {
    const sx = (x) => JSON.stringify([...x].map((o) => Object.fromEntries(Object.entries(o).sort())));
    if (sx(a) !== sx(b)) {
      const lech = a.find((o, i) => JSON.stringify(Object.entries(o).sort()) !== JSON.stringify(Object.entries(b[i] || {}).sort()));
      throw new Error(`${ten}: manifest dựng lại KHÔNG khớp dữ liệu thật (${a.length} vs ${b.length}). Ví dụ lệch: ${JSON.stringify(lech)}`);
    }
  }
}

const { doi, manifest } = await main();
if (fs.existsSync(path.join(ROOT, 'src/data/giaotrinh-index.js'))) await kiemTra();
const dem = (m) => `${Object.keys(m.total).length} bài · ${Object.keys(m.range).length} bài con`;
console.log(`[manifest] ${doi ? 'đã cập nhật' : 'không đổi'} — Đương đại: ${dem(manifest.duongdai)} · Thời Đại: ${dem(manifest.thoidai)}`);
