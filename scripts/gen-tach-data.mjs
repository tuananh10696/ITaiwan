#!/usr/bin/env node
/**
 * Tách các file dữ liệu runtime LỚN thành mỗi bài một file:
 *   · public/data/luyentap/<lessonId>.json  — Luyện tập tổng hợp (đề + đáp án, gộp 3 nguồn)
 *   · public/data/dich/<subId>.json         — Dịch Trung–Việt
 *   · public/data/giaotrinh/<bài cha>.json  — từ vựng + ngữ pháp + hội thoại + luyện viết
 *
 * Tách "Luyện tập tổng hợp" thành MỖI BÀI MỘT FILE — `public/data/luyentap/<lessonId>.json`.
 *
 * VÌ SAO (2026-09-06, xem CLAUDE.md 4.30): mở tab Luyện tập của MỘT bài trước đây phải tải cả
 * sáu file nguồn — 3,5 MB đề + 0,5 MB đáp án — rồi lọc ra đúng một bài trong bộ nhớ. Trên 4G
 * là ~15 giây chờ trắng màn hình cho thứ mà 99% là dữ liệu của bài khác.
 *
 * Ba nguồn đề (onllang / 測驗卷 MTC / tự sinh) và ba file đáp án tương ứng được GỘP sẵn ở đây,
 * đúng thứ tự nối cũ của `_ddOnllangLoadData`, nên phía trình duyệt chỉ còn một lần fetch.
 *
 * KHÔNG PHẢI GÕ TAY: vite.config.js chạy lại khi file nguồn mới hơn thư mục kết quả.
 * Chạy tay: `npm run data:luyentap`.
 *
 * File nguồn VẪN GIỮ NGUYÊN — mọi script scrape/kiểm tra vẫn đọc chúng như cũ.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'public/data');
const RA = path.join(DATA, 'luyentap');

const NGUON_DE = ['luyentap-tusinh.json'];
const NGUON_DA = ['luyentap-tusinh-answers.json'];

const doc = (f, macDinh) => {
  const p = path.join(DATA, f);
  if (!fs.existsSync(p)) return macDinh;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return macDinh; }
};

// --- gộp đề theo bài (NỐI các mục, không ghi đè — một bài có thể có mặt ở nhiều nguồn) ---
const theoBai = new Map();
for (const f of NGUON_DE) {
  for (const bai of doc(f, [])) {
    const k = String(bai.lessonId);
    if (!theoBai.has(k)) theoBai.set(k, { ...bai, lessonId: k, quizzes: [...(bai.quizzes || [])] });
    else theoBai.get(k).quizzes.push(...(bai.quizzes || []));
  }
}

// --- gộp đáp án rồi phát về đúng bài (khoá dạng `<bài>::<slug mục>::<số câu>`) ---
const dapAn = Object.assign({}, ...NGUON_DA.map((f) => doc(f, {})));
const daPhat = new Map();
for (const [k, v] of Object.entries(dapAn)) {
  const bai = k.split('::')[0];
  if (!daPhat.has(bai)) daPhat.set(bai, {});
  daPhat.get(bai)[k] = v;
}

fs.rmSync(RA, { recursive: true, force: true });
fs.mkdirSync(RA, { recursive: true });

let tong = 0;
const chiMuc = [];
for (const [id, bai] of theoBai) {
  if (!/^[\w.-]+$/.test(id)) throw new Error(`lessonId không an toàn cho tên file: ${id}`);
  // GIỮ NGUYÊN MỌI TRƯỜNG của bài, chỉ thêm `answers`. Bản đầu chỉ chép lessonId/error/quizzes
  // nên đánh rơi `nguon` ('tu-sinh' | 'mtc-test' | onllang) — ghi chú đầu trang đọc trường đó,
  // mất nó là mọi bài đều hiện lời nhắc của onllang, tức nói SAI về nguồn đề (CLAUDE.md 4.28).
  const noi = { ...bai, lessonId: id, answers: daPhat.get(id) || {} };
  const s = JSON.stringify(noi);
  fs.writeFileSync(path.join(RA, `${id}.json`), s);
  tong += s.length;
  if (bai.quizzes.length) chiMuc.push(id);
}
fs.writeFileSync(path.join(RA, 'index.json'), JSON.stringify(chiMuc.sort()));

const cu = NGUON_DE.concat(NGUON_DA).reduce((s, f) => {
  const p = path.join(DATA, f);
  return s + (fs.existsSync(p) ? fs.statSync(p).size : 0);
}, 0);
console.log(`[luyentap] ${theoBai.size} bài · ${(tong / 1048576).toFixed(1)} MB tổng `
  + `(trước: mỗi lần mở tab tải ${(cu / 1048576).toFixed(1)} MB, nay trung bình ${(tong / theoBai.size / 1024).toFixed(0)} KB/bài)`);


// =============================================================
// NỘI DUNG GIÁO TRÌNH — mỗi BÀI CHA một file (2026-09-06, CLAUDE.md 4.32)
// =============================================================
// Đợt tối ưu trước đã chia theo QUYỂN: mở bài 1.1 vẫn kéo về 138 KB từ vựng của cả 15 bài
// quyển 1. Nay mỗi bài cha ~25-40 KB, và đó cũng là toàn bộ thứ một bài cần.
//
// Khoá viết tắt (v/g/d/w) để file nhỏ hơn — 154 file nên vài KB mỗi file cũng đáng.
import { pathToFileURL } from 'node:url';
const nap = (f) => import(pathToFileURL(path.join(ROOT, 'src/data', f)).href);

const td = await nap('thoidaiData.js');
const tdG = await nap('thoidaiGrammar.js');
const tdD = await nap('thoidaiDialogues.js');

const RA_GT = path.join(DATA, 'giaotrinh');
fs.rmSync(RA_GT, { recursive: true, force: true });
fs.mkdirSync(RA_GT, { recursive: true });

/** Gom mọi khoá bài con thuộc bài cha `key` từ một bảng tra theo bài con. */
const theoBaiCon = (bang, key) => Object.fromEntries(
  Object.entries(bang || {}).filter(([k]) => k === key || k.startsWith(key + '.')));

let tongGt = 0, soGt = 0;
for (const [lessons, vocab, grammar, dialogues, writing] of [
  [td.thoidaiLessons, td.thoidaiVocab, tdG.thoidaiGrammar, tdD.thoidaiDialogues, td.thoidaiWriting],
]) {
  for (const l of lessons) {
    const key = String(l.id);
    if (!/^[\w.-]+$/.test(key)) throw new Error(`khoá bài không an toàn cho tên file: ${key}`);
    const noi = {
      v: vocab[key] || [],
      g: theoBaiCon(grammar, key),
      d: theoBaiCon(dialogues, key),
      w: theoBaiCon(writing, key),
    };
    const s2 = JSON.stringify(noi);
    fs.writeFileSync(path.join(RA_GT, `${key}.json`), s2);
    tongGt += s2.length; soGt++;
  }
}
console.log(`[giaotrinh] ${soGt} bài · ${(tongGt / 1048576).toFixed(1)} MB tổng · `
  + `trung bình ${(tongGt / soGt / 1024).toFixed(0)} KB/bài `
  + `(trước: chunk theo quyển, mở 1 bài kéo về 138 KB của cả quyển)`);

// ------------------------------------------------------------------ ĐỀ THI TOCFL
// `public/data/thi/tocfl.json` là bản chạy được và cũng là NGUỒN — sửa thẳng file đó.
// Nó KHÔNG được sinh lại ở đây, nên đừng thêm bước xoá thư mục `thi/`.
