// =============================================================
// Giáo trình Thời Đại (時代華語) — lớp dữ liệu gộp cho module
// =============================================================
// Dữ liệu từng quyển do script sinh (đừng sửa tay các file thoidaiVocab*/Grammar*/Writing*):
//   node scripts/gen-thoidai-vocab.mjs   --quyen 1,2,3,4,5
//   node scripts/gen-thoidai-grammar.mjs --quyen 1,2,3,4,5
//   node scripts/gen-thoidai-writing.mjs --quyen 1,2,3,4,5
//   scripts/.venv/bin/python scripts/gen-thoidai-dialogue.py --quyen 1,2,3,4,5   (hội thoại + đoạn văn)
//
// SỐ PHẦN MỖI BÀI KHÔNG CỐ ĐỊNH (quyển 1: 3 phần; quyển 2-5: 2 phần) — bài con sinh theo đúng
// những khoá `thoidaiRange*` mà script bóc ra từ bản thu 生詞, KHÔNG chia cứng 2 phần như
// Đương đại. Bài nào chưa có ranh giới thì script đã tạm chia đôi và in cảnh báo.
// =============================================================
import { thoidaiBooks, tdLessonKey } from './thoidaiBooks.js';
import { thoidaiVocab1, thoidaiRange1 } from './thoidaiVocab1.js';
import { thoidaiVocab2, thoidaiRange2 } from './thoidaiVocab2.js';
import { thoidaiVocab3, thoidaiRange3 } from './thoidaiVocab3.js';
import { thoidaiVocab4, thoidaiRange4 } from './thoidaiVocab4.js';
import { thoidaiVocab5, thoidaiRange5 } from './thoidaiVocab5.js';
import { thoidaiWriting1 } from './thoidaiWriting1.js';
import { thoidaiWriting2 } from './thoidaiWriting2.js';
import { thoidaiWriting3 } from './thoidaiWriting3.js';
import { thoidaiWriting4 } from './thoidaiWriting4.js';
import { thoidaiWriting5 } from './thoidaiWriting5.js';

export { thoidaiBooks, thoidaiThemes, tdLessonKey, tdParseLessonId, tdLessonLabel, tdSubSegs, tdSegsToSub, tdBookOf } from './thoidaiBooks.js';

export const thoidaiVocab = { ...thoidaiVocab1, ...thoidaiVocab2, ...thoidaiVocab3, ...thoidaiVocab4, ...thoidaiVocab5 };
export const thoidaiRange = { ...thoidaiRange1, ...thoidaiRange2, ...thoidaiRange3, ...thoidaiRange4, ...thoidaiRange5 };
export const thoidaiWriting = { ...thoidaiWriting1, ...thoidaiWriting2, ...thoidaiWriting3, ...thoidaiWriting4, ...thoidaiWriting5 };

/** Tab của module — Thời Đại chưa có "Luyện tập tổng hợp"/"Dịch"/"Văn hoá" (không có nguồn). */
export const thoidaiTabs = [
  { id: 'vocab', label: 'Từ vựng', icon: 'fa-solid fa-list', implemented: true },
  { id: 'flashcard', label: 'Flashcard', icon: 'fa-solid fa-clone', implemented: true },
  { id: 'grammar', label: 'Ngữ pháp', icon: 'fa-solid fa-spell-check', implemented: true },
  { id: 'dialogue', label: 'Hội thoại', icon: 'fa-solid fa-comments', implemented: true },
  { id: 'exercise', label: 'Bài tập', icon: 'fa-solid fa-pen-to-square', implemented: true },
  { id: 'writing', label: 'Luyện viết', icon: 'fa-solid fa-pencil', implemented: true },
  { id: 'game', label: 'Game', icon: 'fa-solid fa-gamepad', implemented: true },
];

const _lessons = [];
const _subs = [];
for (const book of thoidaiBooks) {
  book.lessons.forEach((hanzi, i) => {
    const num = i + 1;
    const key = tdLessonKey(book.id, num);
    const total = (thoidaiVocab[key] || []).length;
    _lessons.push({ id: key, book: book.id, num, title: `Bài ${num} - ${hanzi}`, hanzi, total });
    // Số phần đọc THẲNG từ range đã sinh (2 hoặc 3), không giả định.
    const parts = Object.keys(thoidaiRange)
      .filter((k) => k.startsWith(key + '.'))
      .map((k) => k.split('.')[1])
      .sort((a, b) => Number(a) - Number(b));
    for (const part of (parts.length ? parts : ['1', '2'])) {
      const r = thoidaiRange[`${key}.${part}`] || { from: 1, to: 0 };
      _subs.push({
        id: `${key}.${part}`, parentId: key, book: book.id, num, part,
        title: `Bài ${num}.${part} - ${hanzi}`,
        from: r.from, to: r.to, count: Math.max(0, r.to - r.from + 1),
      });
    }
  });
}

export const thoidaiLessons = _lessons;
export const thoidaiSubLessons = _subs;

/** Từ vựng của 1 bài con (cắt từ mảng của bài cha bằng from/to, 1-based). */
export function tdGetVocab(subId) {
  const sub = _subs.find((s) => s.id === subId);
  if (!sub) return [];
  const all = thoidaiVocab[sub.parentId] || [];
  return all.slice(sub.from - 1, sub.to);
}
