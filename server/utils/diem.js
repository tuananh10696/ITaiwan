// =============================================================
// CỘNG ĐIỂM — chống cày (2026-09-16)
// =============================================================
// TRƯỚC ĐÂY: mỗi lần nộp bài là cộng thẳng `score_percent` vào `users.points`, không giới hạn.
// Bài tập và nhất là GAME (một ván Bong Bóng Từ Vựng chỉ 1-2 phút, chơi lại vô hạn) trở thành
// đường cày điểm dễ nhất hệ thống — CLAUDE.md 4.24 đã cảnh báo "nếu bảng xếp hạng bị lệch thì
// sửa ở route". Ai rảnh tay bấm 100 ván là leo top mà không học thêm chữ nào.
//
// NAY: điểm phản ánh THÀNH TÍCH TỐT NHẤT của từng bài, không phản ánh số lần bấm.
// Làm lại bài cũ tốt hơn -> cộng đúng phần vượt kỷ lục. Làm lại kém hơn -> cộng 0.
//
// Vì sao chọn cách này thay vì "chỉ cộng lần đầu" hay "giới hạn N lần/ngày":
//   - "Chỉ lần đầu" phạt người làm lại để tiến bộ — đúng thứ ta muốn khuyến khích.
//   - "N lần/ngày" vẫn cày được, chỉ chậm hơn, và phải giải thích một con số tuỳ tiện cho người dùng.
//   - Cách này có tính chất đẹp: tổng điểm = tổng thành tích tốt nhất mỗi bài. Ổn định, không phụ
//     thuộc thứ tự hay số lần làm, và giải thích được bằng một câu.
//
// LƯU Ý khi dùng: gọi SAU khi đã INSERT bản ghi kết quả, và truyền `boQuaId` = id bản ghi vừa
// insert — nếu không, chính lần nộp này đã nằm trong MAX và phần cộng thêm luôn bằng 0.

/**
 * Cộng phần điểm vượt kỷ lục cũ của cùng một bài.
 * @param {object} db      pool hoặc connection (đang trong transaction thì truyền connection)
 * @param {object} o
 * @param {number} o.userId
 * @param {string} o.bang     'exercise_results' | 'exam_results'
 * @param {string} o.cotKhoa  cột định danh bài: 'lesson_id' | 'skill'
 * @param {string} o.khoa     giá trị của cột đó
 * @param {number} o.diemMoi  điểm lần này (đã nhân hệ số nếu có)
 * @param {number} [o.heSo]   hệ số quy đổi % -> điểm (bài thi đang là 2)
 * @param {number} [o.boQuaId] id bản ghi vừa insert, để không tự tính mình vào kỷ lục cũ
 */
export async function congDiemVuotKyLuc(db, { userId, bang, cotKhoa, khoa, diemMoi, heSo = 1, boQuaId = null }) {
  // Chỉ nhận đúng 2 bảng + 2 cột đã biết: hai giá trị này được nối thẳng vào câu SQL nên không
  // bao giờ được lấy từ dữ liệu người dùng gửi lên.
  if (!['exercise_results', 'exam_results'].includes(bang)) throw new Error('Bảng không hợp lệ: ' + bang);
  if (!['lesson_id', 'skill'].includes(cotKhoa)) throw new Error('Cột khoá không hợp lệ: ' + cotKhoa);

  const dk = boQuaId ? ' AND id <> ?' : '';
  const ts = boQuaId ? [userId, khoa, boQuaId] : [userId, khoa];
  const [r] = await db.query(
    `SELECT COALESCE(MAX(score_percent), 0) AS cao_nhat FROM ${bang}
      WHERE user_id = ? AND ${cotKhoa} = ?${dk}`,
    ts
  );

  const kyLucCu = Math.round(Number(r[0]?.cao_nhat || 0) * heSo);
  const lanNay = Math.round(Number(diemMoi) * heSo);
  const them = Math.max(0, lanNay - kyLucCu);

  if (them > 0) {
    await db.query('UPDATE users SET points = points + ? WHERE id = ?', [them, userId]);
  }
  return { them, ky_luc_cu: kyLucCu, lan_nay: lanNay, la_ky_luc_moi: them > 0 };
}

/**
 * Trần điểm theo ngày cho hoạt động lặp lại nhiều lần (ôn thẻ SRS). Ở đây không có khái niệm
 * "kỷ lục của một bài" nên dùng trần: ôn bao nhiêu thẻ cũng được, nhưng quá `tranThe` thẻ trong
 * một ngày thì thôi cộng điểm — việc học vẫn ghi nhận đầy đủ, chỉ điểm là dừng.
 */
export async function congDiemCoTranNgay(db, { userId, diem, bang, cotNgay, tranThe = 60 }) {
  if (!['user_vocabulary', 'srs_words'].includes(bang)) throw new Error('Bảng không hợp lệ: ' + bang);
  if (!['last_review'].includes(cotNgay)) throw new Error('Cột ngày không hợp lệ: ' + cotNgay);

  const [r] = await db.query(
    `SELECT COUNT(*) AS so FROM ${bang} WHERE user_id = ? AND DATE(${cotNgay}) = CURDATE()`,
    [userId]
  );
  const daOn = Number(r[0]?.so || 0);
  if (daOn > tranThe) return { them: 0, da_on_hom_nay: daOn, cham_tran: true };

  await db.query('UPDATE users SET points = points + ? WHERE id = ?', [diem, userId]);
  return { them: diem, da_on_hom_nay: daOn, cham_tran: false };
}
