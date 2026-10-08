// =============================================================
// ẢNH ĐÍNH KÈM GIẤY TỜ DU HỌC  (2026-10-08)
// =============================================================
// Dùng chung cho cổng học sinh (routes/du-hoc-hocvien.js) và quản trị (routes/du-hoc.js) — hai nơi
// khác nhau về AI được gọi, giống hệt nhau về việc kiểm ảnh, đếm số ảnh, ghi và đổi trạng thái.
// Mỗi nơi tự kiểm quyền sở hữu ở câu SELECT của nó, rồi mới gọi vào đây với `giayTo` đã được xác nhận.
import pool from '../config/db.js';

/** Cùng trần với ảnh chứng từ thu tiền (du-hoc.js `ANH_TOI_DA`): client nén ~400KB, chặn cứng ở đây. */
export const ANH_GIAY_TO_TOI_DA = 900_000;

/** Chuỗi lỗi nếu `anh` không hợp lệ, hoặc null. Bắt buộc có ảnh (khác chứng từ thu tiền: không có "gỡ bằng chuỗi rỗng"). */
export function loiAnhGiayTo(anh) {
  if (typeof anh !== 'string' || !/^data:image\/(jpeg|png|webp);base64,/.test(anh)) {
    return 'Hãy chọn một tệp ảnh (JPG, PNG hoặc WebP).';
  }
  if (anh.length > ANH_GIAY_TO_TOI_DA) return 'Ảnh quá lớn — hãy chụp lại hoặc chọn ảnh nhỏ hơn.';
  return null;
}

/**
 * Thêm một ảnh vào mục giấy tờ. Việc đếm "còn chỗ không" nằm NGAY TRONG câu INSERT nên hai lần tải
 * song song không vượt được trần. Đủ số ảnh thì mục đang "chưa nhận" tự chuyển "đã nhận".
 * @returns {Promise<{ok: boolean, id?: number, day?: boolean}>}
 */
export async function themAnhGiayTo(giayTo, anh, nguoiId) {
  const [r] = await pool.query(
    `INSERT INTO du_hoc_giay_to_anh (giay_to_id, anh, nguoi_up_id)
     SELECT ?, ?, ? FROM DUAL
      WHERE (SELECT COUNT(*) FROM du_hoc_giay_to_anh WHERE giay_to_id = ?) < ?`,
    [giayTo.id, anh, nguoiId, giayTo.id, giayTo.so_anh_toi_da]
  );
  if (!r.affectedRows) return { ok: false, day: true };

  const [[dem]] = await pool.query('SELECT COUNT(*) AS n FROM du_hoc_giay_to_anh WHERE giay_to_id = ?', [giayTo.id]);
  if (Number(dem.n) >= giayTo.so_anh_toi_da && giayTo.trang_thai === 'chua') {
    await pool.query(
      "UPDATE du_hoc_giay_to SET trang_thai = 'nhan', ngay_nhan = CURDATE() WHERE id = ? AND trang_thai = 'chua'",
      [giayTo.id]
    );
  }
  await pool.query('UPDATE du_hoc_ho_so SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [giayTo.ho_so_id]);
  return { ok: true, id: r.insertId };
}

/**
 * Danh sách ảnh (chỉ id — KHÔNG kéo base64) của các mục giấy tờ, gom theo `giay_to_id`.
 * Thiếu bảng (chưa migrate) thì coi như chưa có ảnh nào, không làm hỏng cả trang hồ sơ.
 */
export async function anhTheoGiayTo(dsGiayToId) {
  const theo = new Map();
  if (!dsGiayToId.length) return theo;
  try {
    const [rows] = await pool.query(
      'SELECT id, giay_to_id FROM du_hoc_giay_to_anh WHERE giay_to_id IN (?) ORDER BY id',
      [dsGiayToId]
    );
    for (const r of rows) {
      if (!theo.has(r.giay_to_id)) theo.set(r.giay_to_id, []);
      theo.get(r.giay_to_id).push({ id: r.id });
    }
  } catch (err) {
    if (err.code !== 'ER_NO_SUCH_TABLE') throw err;
  }
  return theo;
}
