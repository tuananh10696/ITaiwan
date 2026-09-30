#!/usr/bin/env node
/**
 * GẮN PHIÊN ÂM + NGHĨA TIẾNG VIỆT cho câu ví dụ ngữ pháp Thời Đại (5 quyển) — 2026-10-01
 *
 *   node scripts/gan-dich-ngu-phap.mjs          (npm run thoidai:grammar-dich)
 *
 * `gen-thoidai-grammar.mjs` bóc câu ví dụ từ PPT gốc với `vi: ''` (nguồn không có bản dịch). Script này
 * chạy SAU nó, điền vào mỗi ví dụ:
 *   vi — bản dịch, lấy ở scripts/du-lieu/ngu-phap-vi-du.json   { "<câu gốc>": "<tiếng Việt>" }
 *   py — phiên âm, lấy ở scripts/du-lieu/ngu-phap-pinyin.json   { "<câu đã làm sạch>": "<pinyin>" }
 * và làm sạch câu chữ Hán: bỏ chú thích tiếng Anh PPT gốc chèn vào câu ("你的國家(country)",
 * "開除(kāichú, to fire)", "Vs極了/ extremely, terribly..."). Bản dịch vẫn tra theo CÂU GỐC.
 *
 * Câu mới (chưa có phiên âm) -> tự gọi scripts/gen-pinyin-cau.py (cần scripts/.venv: pypinyin, jieba, opencc).
 * Câu mới chưa có bản dịch -> báo ra, vẫn để `vi: ''` (giao diện hiện câu chữ Hán, khuyết dòng nghĩa).
 * Chạy lại bao nhiêu lần cũng được (tra được cả theo câu đã làm sạch).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const F_VI = path.join(ROOT, 'scripts/du-lieu/ngu-phap-vi-du.json');
const F_PY = path.join(ROOT, 'scripts/du-lieu/ngu-phap-pinyin.json');
const PY_BIN = path.join(ROOT, 'scripts/.venv/bin/python');

/** Bỏ chú thích tiếng Anh trong câu chữ Hán. Giữ ký hiệu ngữ pháp của sách (V, N, Vs, Vst, Vpt...). */
function lamSach(hz) {
  let s = String(hz || '');
  s = s.replace(/[(（]\s*[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+\s*,\s*[A-Za-z][A-Za-z .'-]*[)）]/gi, '');   // (kāichú, to fire)
  s = s.replace(/[(（]\s*(?:country|Canada|pork|to blossom|Verb|Noun|result|Conj|Adv)\s*[)）]/g, '');
  s = s.replace(/[(（]豬肉,\s*pork[)）]/g, '');
  s = s.replace(/\s*extremely,\s*terribly\s*/g, ' ');
  s = s.replace(/\s*sometimes\.\.\.sometimes\.\.\.\s*/g, ' ');
  s = s.replace(/\s*to\s+V away\s*$/, '');
  s = s.replace(/\s*Hoàn thành [^。]*\.\s*$/, '');                   // hướng dẫn tiếng Việt chen sau đề
  s = s.replace(/“弟弟把糖吃光了”\s*;\s*however,\s*“我把功課寫光了”\s*is unacceptable\./,
    '「弟弟把糖吃光了」✔　「我把功課寫光了」✘');
  // cụm chú giải trong ngoặc có từ tiếng Anh: "(愛ài, to love; 爸爸bàba, dad)" -> bỏ cả cụm
  s = s.replace(/[(（][^()（）]*(?<![A-Za-zÀ-ɏ])(?!KTV|APP)[A-Za-z]{3,}[^()（）]*[)）]/g, '');
  // khoảng trắng thừa do bóc PDF ("公   司") -> bỏ nếu nằm giữa hai chữ Hán / dấu câu Trung
  s = s.replace(/(?<=[㐀-鿿豈-﫿，。、？！：；「」])[ \t\u00a0\u3000]+(?=[㐀-鿿豈-﫿，。、？！：；「」])/g, '');
  return s.replace(/\s{2,}/g, ' ').trim();
}

const doc = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const VI = doc(F_VI);
const VI_SACH = Object.fromEntries(Object.entries(VI).map(([k, v]) => [lamSach(k), v]));
let PY = doc(F_PY);

const QUYEN = [1, 2, 3, 4, 5].map((q) => {
  const file = path.join(ROOT, 'src/data', `thoidaiGrammar${q}.js`);
  const txt = fs.readFileSync(file, 'utf8');
  const mo = txt.indexOf(`export const thoidaiGrammar${q} = `);
  const dau = txt.indexOf('{', mo);
  const cuoi = txt.lastIndexOf('};') + 1;
  return { q, file, txt, dau, cuoi, data: JSON.parse(txt.slice(dau, cuoi)) };
});

const moiVD = function* () {
  for (const Q of QUYEN) for (const muc of Object.values(Q.data)) for (const m of muc)
    for (const p of m.points || []) for (const ex of p.examples || []) yield ex;
};

// 1) câu nào chưa có phiên âm -> sinh một lượt
const thieuPy = [...new Set([...moiVD()].map((ex) => lamSach(ex.hz)).filter((h) => h && !PY[h]))];
if (thieuPy.length) {
  const vao = path.join(ROOT, 'scripts/data-cache/ngu-phap-can-py.json');
  const ra = path.join(ROOT, 'scripts/data-cache/ngu-phap-py-moi.json');
  fs.mkdirSync(path.dirname(vao), { recursive: true });
  fs.writeFileSync(vao, JSON.stringify(thieuPy));
  execFileSync(PY_BIN, [path.join(ROOT, 'scripts/gen-pinyin-cau.py'), vao, ra], { stdio: 'ignore' });
  PY = { ...PY, ...doc(ra) };
  fs.writeFileSync(F_PY, JSON.stringify(PY, null, 0).replace(/","/g, '",\n"'), 'utf8');
  console.log(`sinh phiên âm ${thieuPy.length} câu mới`);
}

// 2) gắn vào dữ liệu
let tong = 0, coVi = 0, sach = 0;
const chuaDich = [];
for (const ex of moiVD()) {
  tong++;
  const goc = ex.hz;
  const hz = lamSach(goc);
  if (hz !== goc) { ex.hz = hz; sach++; }
  const vi = VI[goc] || VI_SACH[hz] || '';
  if (vi) { ex.vi = vi; coVi++; } else chuaDich.push(hz);
  if (PY[hz]) ex.py = PY[hz];
}
for (const Q of QUYEN) {
  fs.writeFileSync(Q.file, Q.txt.slice(0, Q.dau) + JSON.stringify(Q.data, null, 1) + Q.txt.slice(Q.cuoi), 'utf8');
}
console.log(`ví dụ: ${tong} · có nghĩa: ${coVi} · làm sạch chú thích tiếng Anh: ${sach}`);
if (chuaDich.length) {
  console.log(`⚠️  ${chuaDich.length} câu chưa có bản dịch (thêm vào ${path.relative(ROOT, F_VI)}):`);
  chuaDich.slice(0, 20).forEach((h) => console.log('   ', h));
}
