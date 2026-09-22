// =============================================================
// Hội thoại + đoạn văn Giáo trình Thời Đại — gộp 5 quyển
// =============================================================
// Phần CHỮ của bài khoá chỉ có trong sách in (không nguồn công khai nào có), nhưng BẢN THU thì
// công khai trên Drive của 淡江大學華語中心 — nên lấy ngược chữ từ tiếng nói:
//   scripts/.venv/bin/python scripts/gen-thoidai-dialogue.py --quyen 1,2,3,4,5
// Quyển nào chưa chạy thì file thoidaiDialogues<N>.js vẫn export object rỗng và tab Hội thoại
// tự hiện "chưa có nội dung" — không vỡ gì.
// =============================================================
import { thoidaiDialogues1 } from './thoidaiDialogues1.js';
import { thoidaiDialogues2 } from './thoidaiDialogues2.js';
import { thoidaiDialogues3 } from './thoidaiDialogues3.js';
import { thoidaiDialogues4 } from './thoidaiDialogues4.js';
import { thoidaiDialogues5 } from './thoidaiDialogues5.js';

export const thoidaiDialogues = {
  ...thoidaiDialogues1, ...thoidaiDialogues2, ...thoidaiDialogues3, ...thoidaiDialogues4, ...thoidaiDialogues5,
};
