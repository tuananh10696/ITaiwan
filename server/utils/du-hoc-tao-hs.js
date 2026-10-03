// =============================================================
// TỰ ĐỘNG TẠO HỒ SƠ DU HỌC CHO HỌC SINH  (2026-10-03)
// =============================================================
// 100% học viên của trung tâm ITaiwan là du học sinh: cứ có tài khoản HỌC SINH (tự đăng ký hoặc
// do trung tâm tạo) là tự có hồ sơ du học.
//
// ⚠️ CHỈ HỌC SINH. Giáo viên / quản trị / sale / quản lý hồ sơ TUYỆT ĐỐI không có hồ sơ.
// Bẫy đã dính (03/10/2026): tài khoản đăng ký là học sinh -> được tạo hồ sơ -> sau đó admin đổi
// vai trò sang giáo viên -> hồ sơ cũ vẫn nằm đó và giáo viên hiện trong danh sách du học. Vì vậy
// MỌI chỗ đổi vai trò phải gọi `dongBoHoSoTheoVaiTro()` ngay sau câu UPDATE.
import pool from '../config/db.js';

export const GIAY_TO_MAC_DINH = [
  ['Hộ chiếu (bản sao)', true],
  ['CCCD/CMND (công chứng)', true],
  ['Ảnh thẻ 3.5×4.5 (6 ảnh)', true],
  ['Bằng tốt nghiệp (công chứng + dịch)', true],
  ['Học bạ / bảng điểm (công chứng + dịch)', true],
  ['Giấy khai sinh (công chứng + dịch)', true],
  ['Giấy khám sức khoẻ', true],
  ['Lý lịch tư pháp số 2', true],
  ['Chứng minh tài chính (sổ tiết kiệm)', true],
  ['Giấy bảo lãnh tài chính của phụ huynh', true],
  ['Đơn xin nhập học của trường', true],
  ['Kế hoạch học tập (讀書計畫書)', true],
  ['Thư giới thiệu', false],
  ['Chứng chỉ tiếng (TOCFL / HSK / TOEFL)', false],
  ['Sơ yếu lý lịch', false],
];

/** Vai trò nhân sự — không bao giờ có hồ sơ du học. */
export const VAI_TRO_NHAN_SU = ['admin', 'teacher', 'sale', 'ho_so'];

/** Mảnh SQL "u là học sinh" — dùng chung để mọi câu lọc cùng một định nghĩa. */
export const SQL_LA_HOC_SINH =
  "(COALESCE(u.role, 'student') = 'student' AND COALESCE(u.is_admin, 0) = 0)";

/** Tài khoản (bản ghi users) có phải học sinh không. Thiếu role coi như học sinh (mặc định DB). */
export function laHocSinh(u) {
  if (!u) return false;
  if (u.is_admin) return false;
  const role = String(u.role || 'student').toLowerCase();
  return role === 'student';
}

const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/**
 * Gỡ hồ sơ du học khỏi một tài khoản KHÔNG phải học sinh.
 *   · Hồ sơ "rỗng" (chưa thu đồng nào, học sinh chưa gửi khai báo) -> XOÁ hẳn: đó là hồ sơ tự sinh,
 *     không có dữ liệu nghiệp vụ gì để giữ.
 *   · Hồ sơ đã có tiền / đã gửi -> chỉ CẮT liên kết (user_id = NULL), giữ nguyên dữ liệu: xoá là
 *     mất luôn sổ thu tiền (ON DELETE CASCADE), trung tâm không đối soát lại được.
 * @returns {Promise<number>} số hồ sơ đã xử lý
 */
export async function goHoSoNhanSu(userId) {
  const uid = parseInt(userId, 10);
  if (!uid) return 0;
  try {
    const [ds] = await pool.query(
      `SELECT h.id, h.hs_gui_luc,
              (SELECT COUNT(*) FROM du_hoc_thu_tien t WHERE t.ho_so_id = h.id) AS so_khoan
         FROM du_hoc_ho_so h WHERE h.user_id = ?`,
      [uid]
    );
    for (const h of ds) {
      if (Number(h.so_khoan) === 0 && !h.hs_gui_luc) {
        await pool.query('DELETE FROM du_hoc_ho_so WHERE id = ?', [h.id]);
      } else {
        await pool.query('UPDATE du_hoc_ho_so SET user_id = NULL WHERE id = ?', [h.id]);
      }
    }
    return ds.length;
  } catch (err) {
    if (!chuaCoBang(err)) console.error(`[du-hoc] Lỗi gỡ hồ sơ của nhân sự ${uid}:`, err);
    return 0;
  }
}

/**
 * Tự động tạo hồ sơ du học cho HỌC SINH nếu chưa có. Idempotent.
 * Không phải học sinh -> trả null, và KHÔNG trả về hồ sơ cũ (nếu có thì gỡ luôn).
 *
 * @param {number|string} userId
 * @param {object} [thongTin] - { name, email, phone, orgId }
 * @returns {Promise<object|null>} Bản ghi du_hoc_ho_so hoặc null
 */
export async function taoHoSoDuHocChoHocVien(userId, thongTin = {}) {
  const uid = parseInt(userId, 10);
  if (!uid || isNaN(uid)) return null;

  try {
    // 1. Kiểm VAI TRÒ TRƯỚC. Bản cũ trả hồ sơ có sẵn trước khi kiểm vai trò -> giáo viên từng là
    //    học sinh vẫn thấy hồ sơ của mình.
    const [uRows] = await pool.query(
      'SELECT id, name, email, phone, org_id, role, is_admin FROM users WHERE id = ?',
      [uid]
    );
    if (!uRows.length) return null;
    const u = uRows[0];
    if (!laHocSinh(u)) {
      await goHoSoNhanSu(uid);
      return null;
    }

    // 2. Đã có hồ sơ -> trả luôn
    const [co] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE user_id = ? LIMIT 1', [uid]);
    if (co.length > 0) return co[0];

    const orgId = thongTin.orgId || u.org_id || 1;
    const hoTen = String(thongTin.name || u.name || '').trim() || 'Học viên';
    const email = String(thongTin.email || u.email || '').trim() || null;
    const phone = String(thongTin.phone || u.phone || '').trim() || null;

    // 3. Sinh mã hồ sơ HS-XXXX (trùng thì lùi một nhịp, cùng lối với POST /admin/du-hoc/ho-so)
    const [m] = await pool.query(
      `SELECT COALESCE(MAX(CAST(SUBSTRING(ma_hs, 4) AS UNSIGNED)), 0) AS n
         FROM du_hoc_ho_so WHERE org_id = ? AND ma_hs REGEXP '^HS-[0-9]+$'`,
      [orgId]
    );
    const so = Number(m[0]?.n || 0);

    let hoSoId = null;
    let maCuoi = '';
    for (let lan = 0; lan < 6; lan++) {
      const ma = `HS-${String(so + 1 + lan).padStart(4, '0')}`;
      try {
        const [r] = await pool.query(
          `INSERT INTO du_hoc_ho_so (org_id, user_id, ma_hs, ho_ten, email, phone, buoc, buoc_tu)
           VALUES (?, ?, ?, ?, ?, ?, 'ho-so', CURDATE())`,
          [orgId, uid, ma, hoTen, email, phone]
        );
        hoSoId = r.insertId;
        maCuoi = ma;
        break;
      } catch (e) {
        if (e.code !== 'ER_DUP_ENTRY') throw e;
      }
    }
    if (!hoSoId) {
      console.warn(`[du-hoc] Không sinh được mã hồ sơ cho user ${uid}`);
      return null;
    }

    // 4. Checklist giấy tờ mặc định
    try {
      await pool.query(
        `INSERT INTO du_hoc_giay_to (ho_so_id, ten, bat_buoc, sort_order) VALUES ${GIAY_TO_MAC_DINH.map(() => '(?, ?, ?, ?)').join(', ')}`,
        GIAY_TO_MAC_DINH.flatMap(([ten, bb], i) => [hoSoId, ten, bb, (i + 1) * 10])
      );
    } catch (errGiayTo) {
      console.warn('[du-hoc] Lỗi chèn checklist giấy tờ mặc định:', errGiayTo.message);
    }

    // 5. Nhật ký
    try {
      await pool.query(
        `INSERT INTO du_hoc_lich_su (ho_so_id, loai, noi_dung, nguoi_id, buoc_cu, buoc_moi)
         VALUES (?, 'he-thong', ?, ?, NULL, 'ho-so')`,
        [hoSoId, `Tự động tạo hồ sơ ${maCuoi} khi có tài khoản học sinh`, uid]
      );
    } catch (_) {}

    const [moi] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE id = ?', [hoSoId]);
    return moi[0] || null;
  } catch (err) {
    if (chuaCoBang(err)) return null;
    console.error(`[du-hoc] Lỗi tạo hồ sơ tự động cho user ${uid}:`, err);
    return null;
  }
}

/**
 * Gọi NGAY SAU mọi câu đổi vai trò: học sinh -> có hồ sơ; nhân sự -> gỡ hồ sơ.
 */
export async function dongBoHoSoTheoVaiTro(userId) {
  // taoHoSoDuHocChoHocVien đã tự rẽ nhánh theo vai trò (nhân sự thì gỡ, học sinh thì tạo).
  return taoHoSoDuHocChoHocVien(userId);
}

/**
 * Chạy lúc khởi động server:
 *   1. Gỡ hồ sơ khỏi mọi tài khoản nhân sự (sót lại từ trước khi có chốt chặn).
 *   2. Tạo hồ sơ cho mọi học sinh chưa có.
 */
export async function dongBoHocVienVaoDuHoc() {
  try {
    const [nhanSu] = await pool.query(
      `SELECT DISTINCT h.user_id FROM du_hoc_ho_so h JOIN users u ON u.id = h.user_id
        WHERE NOT ${SQL_LA_HOC_SINH}`
    );
    for (const r of nhanSu) await goHoSoNhanSu(r.user_id);
    if (nhanSu.length) console.log(`[du-hoc] Đã gỡ hồ sơ du học khỏi ${nhanSu.length} tài khoản nhân sự.`);

    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.phone, u.org_id FROM users u
        WHERE ${SQL_LA_HOC_SINH}
          AND NOT EXISTS (SELECT 1 FROM du_hoc_ho_so h WHERE h.user_id = u.id)`
    );
    let dem = 0;
    for (const u of rows) {
      const hs = await taoHoSoDuHocChoHocVien(u.id, {
        name: u.name, email: u.email, phone: u.phone, orgId: u.org_id,
      });
      if (hs) dem++;
    }
    if (dem > 0) console.log(`[du-hoc] Đã tự động tạo hồ sơ du học cho ${dem} học sinh.`);
    return { da_tao: dem, da_go: nhanSu.length };
  } catch (err) {
    if (chuaCoBang(err)) return { da_tao: 0, da_go: 0 };
    console.warn('[du-hoc] Lỗi đồng bộ học viên vào hồ sơ du học:', err.message);
    return { da_tao: 0, da_go: 0 };
  }
}
