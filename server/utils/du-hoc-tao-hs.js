// =============================================================
// TỰ ĐỘNG TẠO HỒ SƠ DU HỌC CHO HỌC VIÊN  (2026-10-03)
// =============================================================
// Vì 100% học viên của trung tâm ITaiwan là du học sinh:
// Cứ có tài khoản đăng ký hoặc tạo tài khoản thì học sinh đó sẽ
// được tự động thêm vào hồ sơ du học.
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

/**
 * Tự động tạo hồ sơ du học cho học viên nếu chưa có.
 * Đảm bảo tính Idempotent (gọi nhiều lần không sinh trùng).
 *
 * @param {number|string} userId
 * @param {object} [thongTin] - { name, email, phone, orgId }
 * @returns {Promise<object|null>} Bản ghi du_hoc_ho_so hoặc null
 */
export async function taoHoSoDuHocChoHocVien(userId, thongTin = {}) {
  const uid = parseInt(userId, 10);
  if (!uid || isNaN(uid)) return null;

  try {
    // 1. Kiểm tra đã có hồ sơ du học cho user_id này chưa
    const [co] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE user_id = ? LIMIT 1', [uid]);
    if (co.length > 0) {
      return co[0];
    }

    // 2. Lấy thông tin tài khoản nếu chưa truyền đủ
    const [uRows] = await pool.query(
      'SELECT id, name, email, phone, org_id, role, is_admin FROM users WHERE id = ?',
      [uid]
    );
    if (!uRows.length) return null;
    const u = uRows[0];

    // Tránh tự động tạo cho tài khoản giáo viên (teacher)
    if (u.role === 'teacher') {
      return null;
    }

    const orgId = thongTin.orgId || u.org_id || 1;
    const hoTen = String(thongTin.name || u.name || '').trim() || 'Học viên';
    const email = String(thongTin.email || u.email || '').trim() || null;
    const phone = String(thongTin.phone || u.phone || '').trim() || null;

    // 3. Sinh mã hồ sơ HS-XXXX
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

    // 4. Khởi tạo checklist giấy tờ mặc định
    try {
      await pool.query(
        `INSERT INTO du_hoc_giay_to (ho_so_id, ten, bat_buoc, sort_order) VALUES ${GIAY_TO_MAC_DINH.map(() => '(?, ?, ?, ?)').join(', ')}`,
        GIAY_TO_MAC_DINH.flatMap(([ten, bb], i) => [hoSoId, ten, bb, (i + 1) * 10])
      );
    } catch (errGiayTo) {
      console.warn('[du-hoc] Lỗi chèn checklist giấy tờ mặc định:', errGiayTo.message);
    }

    // 5. Ghi nhật ký khởi tạo
    try {
      await pool.query(
        `INSERT INTO du_hoc_lich_su (ho_so_id, loai, noi_dung, nguoi_id, buoc_cu, buoc_moi)
         VALUES (?, 'he-thong', ?, ?, NULL, 'ho-so')`,
        [hoSoId, `Tự động tạo hồ sơ ${maCuoi} khi có tài khoản`, uid]
      );
    } catch (_) {}

    const [moi] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE id = ?', [hoSoId]);
    return moi[0] || null;
  } catch (err) {
    if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
      return null;
    }
    console.error(`[du-hoc] Lỗi tạo hồ sơ tự động cho user ${uid}:`, err);
    return null;
  }
}

/**
 * Quét toàn bộ học viên (role = 'student' hoặc NULL) chưa có hồ sơ du học và tự động tạo.
 * Giúp các học viên đã đăng ký trước đây lập tức có hồ sơ du học trong hệ thống.
 */
export async function dongBoHocVienVaoDuHoc() {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.phone, u.org_id
         FROM users u
        WHERE (u.role = 'student' OR u.role IS NULL)
          AND (u.is_admin = 0 OR u.is_admin IS NULL)
          AND NOT EXISTS (SELECT 1 FROM du_hoc_ho_so h WHERE h.user_id = u.id)`
    );
    if (!rows.length) return { da_tao: 0 };
    let dem = 0;
    for (const u of rows) {
      const hs = await taoHoSoDuHocChoHocVien(u.id, {
        name: u.name,
        email: u.email,
        phone: u.phone,
        orgId: u.org_id,
      });
      if (hs) dem++;
    }
    if (dem > 0) {
      console.log(`[du-hoc] Đã đồng bộ tự động tạo hồ sơ du học cho ${dem} học viên cũ.`);
    }
    return { da_tao: dem };
  } catch (err) {
    if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
      return { da_tao: 0 };
    }
    console.warn('[du-hoc] Lỗi đồng bộ học viên vào hồ sơ du học:', err.message);
    return { da_tao: 0 };
  }
}
