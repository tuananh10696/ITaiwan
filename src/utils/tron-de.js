// =============================================================
// Trộn đề — dùng chung cho MỌI bài tập và bài thi.
//
// Lý do có file này (2026-08-28, từ phản hồi của học viên):
// "làm 2 lần là thuộc đáp án mất rồi". Trước đây thứ tự câu hỏi và thứ tự đáp án
// đều cố định, nên làm lại lần hai là nhớ vị trí chứ không phải nhớ kiến thức.
//
// Nặng hơn: toàn bộ 1600 câu trong tocflExamData.js đều có `correct: 0` — đáp án
// đúng LUÔN nằm ở vị trí A. Cứ bấm A hết là 100% điểm. Trộn đáp án ở đây vá luôn
// lỗ đó mà không phải sửa tay 1600 câu dữ liệu.
// =============================================================

/** Fisher-Yates trên BẢN SAO. Không đụng mảng gốc — dữ liệu bài học là hằng số dùng chung. */
export function tronMang(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Đáp án có phải chỉ là nhãn "A" / "B" / "C" / "D" không?
 *
 * 315/1600 câu TOCFL là dạng nhìn ẢNH chọn đáp án: nội dung nằm trong `questionImg`,
 * còn `options` chỉ là chữ cái trỏ tới vùng A/B/C trên ảnh. Ảnh gốc có IN SẴN nhãn
 * (A) (B) (C) nên vẫn trộn được bình thường — chỉ cần khi hiển thị thì lấy nhãn theo
 * NỘI DUNG đáp án chứ đừng lấy theo vị trí dòng, nếu không dòng ghi "A" mà nội dung là
 * "C" thì học viên không biết đường nào mà lần. Câu như vậy được đánh dấu `nhanTuDapAn`.
 */
export function chiLaNhanChuCai(options) {
  return Array.isArray(options)
    && options.length > 0
    && options.every((o) => typeof o === 'string' && /^[A-Da-d][.)]?$/.test(o.trim()));
}

/**
 * Trộn đáp án của MỘT câu trắc nghiệm.
 *
 * Trả về câu hỏi MỚI (không sửa câu gốc) với:
 *   · <options> đã đảo thứ tự
 *   · <correct> là chỉ số MỚI của đáp án đúng
 *   · mapGoc[viTriMoi] = viTriGoc — bắt buộc phải giữ: bài thi chấm ở SERVER theo
 *     chỉ số gốc trong exam_questions.correct_option, nộp nhầm chỉ số hiển thị là
 *     sai sạch cả bài mà không có lỗi nào hiện ra.
 *
 * @param {object} q      câu hỏi
 * @param {object} cfg    { options, correct, kem } — tên field và các mảng song song
 *                        (optionImgs, optionsMeaning...) cần đảo theo cho khớp.
 */
export function tronDapAn(q, cfg = {}) {
  const fOptions = cfg.options || 'options';
  const fCorrect = cfg.correct || 'correct';
  const kem = cfg.kem || [];

  const options = q[fOptions];
  const correct = q[fCorrect];

  // Không đủ dữ kiện để trộn an toàn thì trả nguyên câu gốc, kèm mapGoc đồng nhất
  // để phía gọi lúc nào cũng dùng được `mapGoc` mà không phải kiểm tra null.
  if (!Array.isArray(options) || options.length < 2
      || !Number.isInteger(correct) || correct < 0 || correct >= options.length) {
    return { ...q, mapGoc: options ? options.map((_, i) => i) : [], nhanTuDapAn: false };
  }

  const mapGoc = tronMang(options.map((_, i) => i));
  const moi = {
    ...q,
    [fOptions]: mapGoc.map((g) => options[g]),
    [fCorrect]: mapGoc.indexOf(correct),
    mapGoc,
    nhanTuDapAn: chiLaNhanChuCai(options),
  };
  for (const f of kem) {
    if (Array.isArray(q[f]) && q[f].length === options.length) moi[f] = mapGoc.map((g) => q[f][g]);
  }
  return moi;
}

/**
 * Trộn cả ĐỀ: đảo thứ tự câu hỏi + đảo đáp án trong từng câu.
 * Gọi một lần lúc BẮT ĐẦU làm bài rồi giữ nguyên kết quả trong state —
 * trộn lại giữa chừng (mỗi lần render) sẽ làm đáp án nhảy lung tung dưới tay học viên.
 */
export function tronDe(questions, cfg = {}) {
  return tronMang(questions).map((q) => tronDapAn(q, cfg));
}
