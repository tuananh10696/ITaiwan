// =============================================================
// ĐỀ THI TOCFL — nạp ĐỘNG qua API có kiểm quyền
//
// 2026-09-06 (CLAUDE.md 4.30): tách khỏi bundle chính vì 1,2 MB chỉ dùng ở trang Thi thử.
// 2026-09-09: chuyển từ `import('./tocflExamData.js')` sang `/api/noi-dung/thi/tocfl`.
//   Lý do: chunk JS nằm trong `dist/assets/` là file tĩnh CÔNG KHAI — ai biết đường dẫn là tải
//   được nguyên ngân hàng 1.600 câu. Mà đề thi thử là phần KHÔNG có bản dùng thử (chốt với chủ
//   dự án 2026-09-09: "3 bài đầu mở, trừ bài thi"), nên nó phải đi qua tường phân quyền như mọi
//   nội dung trả phí khác.
//
// `tocflExams` là LIVE BINDING của ESM: cứ `import { tocflExams }` như cũ, giá trị tự cập nhật
// sau khi `napExam()` xong. Đừng destructure vào biến khác (`const {tocflExams} = mod`) —
// làm thế là chốt cứng mảng rỗng.
//
// ⚠️ Chưa có quyền thì `napExam()` KHÔNG ném lỗi mà trả mảng rỗng và bật cờ `napExam.canQuyen`.
// Nơi gọi kiểm cờ đó để hiện lời mời mua; ném lỗi thì mọi điểm gọi phải bọc try/catch, quên một
// chỗ là trang trắng (bài học CLAUDE.md 4.21b).
import { napTaiNguyen, LoiCanQuyen } from '../utils/noi-dung.js';

export let tocflExams = [];

let _p = null;
/** Nạp bộ đề (chỉ tải một lần). Phải await xong trước khi render trang thi thử. */
export function napExam() {
  if (!_p) {
    _p = napTaiNguyen('/noi-dung/thi/tocfl', 'dethi', 'tocfl')
      .then((d) => {
        tocflExams = Array.isArray(d) ? d : [];
        napExam.daXong = true;
        napExam.canQuyen = null;
        return tocflExams;
      })
      .catch((e) => {
        if (e instanceof LoiCanQuyen) {
          tocflExams = [];
          napExam.daXong = true;
          napExam.canQuyen = { bo: e.bo, sanPham: e.sanPham };
          return tocflExams;
        }
        _p = null;
        throw e;
      });
  }
  return _p;
}

/** Câu hỏi của một đề. Trả mảng rỗng nếu chưa nạp — nơi gọi tự rơi về đề mock, không vỡ. */
export function getTocflQuestions(band, type = 'both', de = null) {
  let exams = tocflExams.filter((e) => !band || e.band === band);
  if (de) exams = exams.filter((e) => e.de === de);
  let questions = [];
  for (const exam of exams) {
    if (type === 'both' || type === 'reading') questions = questions.concat(exam.reading || []);
    if (type === 'both' || type === 'listening') questions = questions.concat(exam.listening || []);
  }
  return questions;
}
