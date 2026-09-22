// =============================================================
// DANH MỤC BÀI của giáo trình Thời Đại — phần NHẸ, vào bundle chính.
//
// Số liệu lấy từ `giaotrinh-manifest.js` (tự sinh, ~11 KB), còn NỘI DUNG nạp động theo bài
// qua `giaotrinh-kho.js`. File này KHÔNG được import bất kỳ file dữ liệu nặng nào
// (thoidaiVocab*, *Grammar*, *Dialogues*, *Writing*) — thêm một dòng import như thế là
// bundle chính phình lên vài MB.
// =============================================================
import { thoidaiBooks, tdLessonKey } from './thoidaiBooks.js';
import { GT_MANIFEST } from './giaotrinh-manifest.js';

export { thoidaiBooks, thoidaiThemes, tdLessonKey, tdParseLessonId, tdLessonLabel, tdSubSegs, tdSegsToSub, tdBookOf } from './thoidaiBooks.js';

/**
 * Dựng lessons + subs từ manifest.
 * Tên bài lấy từ `thoidaiBooks.js` (tĩnh); số từ và from/to lấy từ manifest.
 * Số phần mỗi bài đọc THẲNG từ khoá của `range` (quyển 1 có 3 phần) — đừng giả định 2.
 */
function _dung(books, lessonKey, m) {
  const lessons = [];
  const subs = [];
  for (const book of books) {
    book.lessons.forEach((hanzi, i) => {
      const num = i + 1;
      const key = lessonKey(book.id, num);
      lessons.push({ id: key, book: book.id, num, title: `Bài ${num} - ${hanzi}`, hanzi, total: m.total[key] || 0 });
      const parts = Object.keys(m.range)
        .filter((k) => k.startsWith(key + '.'))
        .map((k) => k.slice(key.length + 1))
        .sort((a, b) => Number(a) - Number(b));
      for (const part of (parts.length ? parts : ['1', '2'])) {
        const [from, to] = m.range[`${key}.${part}`] || [1, 0];
        subs.push({
          id: `${key}.${part}`, parentId: key, book: book.id, num, part,
          title: `Bài ${num}.${part} - ${hanzi}`,
          from, to, count: Math.max(0, to - from + 1),
        });
      }
    });
  }
  return { lessons, subs };
}

const _td = _dung(thoidaiBooks, tdLessonKey, GT_MANIFEST.thoidai);

export const thoidaiLessons = _td.lessons;
export const thoidaiSubLessons = _td.subs;

export const thoidaiTabs = [
  { id: 'vocab', label: 'Từ vựng', icon: 'fa-solid fa-list', implemented: true },
  { id: 'flashcard', label: 'Flashcard', icon: 'fa-solid fa-clone', implemented: true },
  { id: 'grammar', label: 'Ngữ pháp', icon: 'fa-solid fa-spell-check', implemented: true },
  { id: 'dialogue', label: 'Hội thoại', icon: 'fa-solid fa-comments', implemented: true },
  { id: 'exercise', label: 'Bài tập', icon: 'fa-solid fa-pen-to-square', implemented: true },
  { id: 'writing', label: 'Luyện viết', icon: 'fa-solid fa-pencil', implemented: true },
  { id: 'game', label: 'Game', icon: 'fa-solid fa-gamepad', implemented: true },
];

/**
 * Bài con này CÓ nội dung gì chưa — trả lời được mà KHÔNG cần nạp dữ liệu nặng.
 */
export function gtSubCoNoiDung(sub) {
  if (!sub) return false;
  if (sub.count > 0) return true;
  const m = GT_MANIFEST.thoidai;
  return m.g.includes(sub.id) || m.d.includes(sub.id) || m.w.includes(sub.id);
}

/** Có ngữ pháp / hội thoại / luyện viết cho bài con đó không? (dùng để hiện tab rỗng) */
export function gtCo(loai, subId) {
  return GT_MANIFEST.thoidai[loai].includes(subId);
}
