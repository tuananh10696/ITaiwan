// =============================================================
// TỰ ĐỘNG TẠO HỒ SƠ DU HỌC CHO HỌC SINH  (2026-10-03, sửa lại 2026-10-05)
// =============================================================
// 100% học viên của trung tâm ITaiwan là du học sinh: cứ có tài khoản HỌC SINH ĐÃ DUYỆT là tự có
// hồ sơ du học. Chưa duyệt (tự đăng ký, chưa xác thực email, tài khoản rác) thì CHƯA tạo — hồ sơ
// sinh ra lúc duyệt (PUT /admin/users/:id/approve) hoặc lần đầu em đó mở trang hồ sơ.
//
// ⚠️ CHỈ HỌC SINH. Nhân sự (giáo viên / quản trị / sale / quản lý hồ sơ) không được tạo hồ sơ, và
// /du-hoc/ho-so-cua-toi trả "không có" với họ.
//
// ⚠️ KHÔNG BAO GIỜ XOÁ HỒ SƠ CÓ DỮ LIỆU. Bản 03/10 xoá cứng mọi hồ sơ "chưa thu tiền + chưa gửi"
// khi đổi vai trò, và chạy cả lúc khởi động server: DELETE kéo theo (ON DELETE CASCADE) giấy tờ đã
// tick, nhật ký chăm sóc, thông báo, yêu cầu sửa, cùng mọi cột trung tâm đã điền (phí, lịch phỏng
// vấn, visa...). Admin bấm nhầm vai trò một lần là mất trắng. Nay:
//   • chỉ xoá hồ sơ TỰ SINH CHƯA AI ĐỤNG TỚI (xem `sqlTuSinhChuaDung`) — xoá nó không mất gì;
//   • hồ sơ đã có dữ liệu thì GIỮ NGUYÊN, kể cả liên kết tài khoản: đổi vai trò về học sinh là em
//     đó thấy lại đúng hồ sơ cũ, không bị tách thành hai.
//   • không quét gì lúc khởi động. Tạo bù cho học sinh cũ: `npm run du-hoc:tao-ho-so`.
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

/** Mảnh SQL "u là học sinh" — dùng chung để mọi câu lọc cùng một định nghĩa. */
export const SQL_LA_HOC_SINH =
  "(COALESCE(u.role, 'student') = 'student' AND COALESCE(u.is_admin, 0) = 0)";

/** Mảnh SQL "u là học sinh HOẶC quản trị" — chỉ cổng học sinh (/du-hoc/ho-so-cua-toi...) dùng, để
 *  admin tự kiểm hồ sơ của chính mình như một học sinh (2026-10-08). Mọi nơi khác vẫn dùng
 *  SQL_LA_HOC_SINH: sale / giáo viên / quản lý hồ sơ không có hồ sơ cá nhân. */
export const SQL_LA_HOC_SINH_HOAC_ADMIN =
  "((COALESCE(u.role, 'student') = 'student' AND COALESCE(u.is_admin, 0) = 0) OR u.role = 'admin' OR COALESCE(u.is_admin, 0) = 1)";

/** Tài khoản quản trị (role 'admin' hoặc cột cũ is_admin). */
export function laQuanTri(u) {
  return !!u && (!!u.is_admin || String(u.role || '').toLowerCase() === 'admin');
}

/** Tài khoản (bản ghi users) có phải học sinh không. Thiếu role coi như học sinh (mặc định DB). */
export function laHocSinh(u) {
  if (!u) return false;
  if (u.is_admin) return false;
  const role = String(u.role || 'student').toLowerCase();
  return role === 'student';
}

/** Dòng nhật ký do hàm tạo tự động ghi (cả bản 5113bd7 lẫn bản sau đều mở đầu bằng chuỗi này). */
const NHAT_KY_TU_SINH = 'Tự động tạo hồ sơ%';

/**
 * Mảnh SQL "hồ sơ `a` là hồ sơ TỰ SINH và CHƯA AI ĐỤNG TỚI" — chỉ hồ sơ như vậy mới được xoá
 * hoặc nhường chỗ cho hồ sơ admin tạo tay. Đủ mọi dấu vết, thiếu một điều kiện là coi như có dữ liệu:
 *   • nhật ký chỉ có đúng dòng "Tự động tạo hồ sơ..." (hồ sơ admin tạo tay ghi "Tạo hồ sơ ...");
 *   • bản ghi chưa từng bị UPDATE (updated_at = created_at) — học sinh tự khai, admin sửa, đổi
 *     bước... đều làm lệch hai cột này;
 *   • chưa gửi khai báo, chưa có tư vấn viên, chưa có khoản thu, thông báo, yêu cầu sửa;
 *   • giấy tờ còn nguyên trạng thái "chưa", chưa có ghi chú;
 *   • (tuỳ chọn) chưa được xếp ô ký túc xá.
 */
export function sqlTuSinhChuaDung(a = 'h', { ktx = true } = {}) {
  return `(${a}.hs_gui_luc IS NULL AND ${a}.tu_van_id IS NULL AND ${a}.updated_at = ${a}.created_at
    AND EXISTS (SELECT 1 FROM du_hoc_lich_su l WHERE l.ho_so_id = ${a}.id
                 AND l.loai = 'he-thong' AND l.noi_dung LIKE '${NHAT_KY_TU_SINH}')
    AND NOT EXISTS (SELECT 1 FROM du_hoc_lich_su l WHERE l.ho_so_id = ${a}.id
                     AND NOT (l.loai = 'he-thong' AND l.noi_dung LIKE '${NHAT_KY_TU_SINH}'))
    AND NOT EXISTS (SELECT 1 FROM du_hoc_thu_tien t WHERE t.ho_so_id = ${a}.id)
    AND NOT EXISTS (SELECT 1 FROM du_hoc_thong_bao tb WHERE tb.ho_so_id = ${a}.id)
    AND NOT EXISTS (SELECT 1 FROM du_hoc_yeu_cau_sua ys WHERE ys.ho_so_id = ${a}.id)
    AND NOT EXISTS (SELECT 1 FROM du_hoc_giay_to g WHERE g.ho_so_id = ${a}.id
                     AND (g.trang_thai <> 'chua' OR g.ghi_chu IS NOT NULL OR g.ngay_nhan IS NOT NULL))
    ${ktx ? `AND NOT EXISTS (SELECT 1 FROM ktx_o o WHERE o.ho_so_id = ${a}.id)` : ''})`;
}

const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/**
 * Xoá các hồ sơ TỰ SINH CHƯA AI ĐỤNG TỚI của một tài khoản (trừ `triId` nếu có).
 * Hồ sơ có bất kỳ dữ liệu nào thì để nguyên — xem đầu file.
 * @returns {Promise<number>} số hồ sơ đã xoá
 */
export async function xoaHoSoTuSinhChuaDung(userId, triId = null) {
  const uid = parseInt(userId, 10);
  if (!uid) return 0;
  const chay = (ktx) => pool.query(
    `DELETE h FROM du_hoc_ho_so h
      WHERE h.user_id = ?${triId ? ' AND h.id <> ?' : ''} AND ${sqlTuSinhChuaDung('h', { ktx })}`,
    triId ? [uid, triId] : [uid]
  );
  try {
    let r;
    try {
      [r] = await chay(true);
    } catch (e) {
      // Chưa chạy migration-ktx.sql thì không có ô ký túc xá nào để mà kiểm.
      if (e.code !== 'ER_NO_SUCH_TABLE' || !String(e.message).includes('ktx_o')) throw e;
      [r] = await chay(false);
    }
    return r.affectedRows || 0;
  } catch (err) {
    if (!chuaCoBang(err)) console.error(`[du-hoc] Lỗi dọn hồ sơ tự sinh của tài khoản ${uid}:`, err);
    return 0;
  }
}

// Một tài khoản đang được tạo hồ sơ thì lời gọi thứ hai chờ chung kết quả thay vì tạo thêm hồ sơ
// nữa. `user_id` không UNIQUE nên "SELECT rồi INSERT" mà chạy song song (trang Tài khoản + trang Hồ
// sơ cùng gọi, hoặc duyệt + nhập lớp cùng lúc) là ra hai hồ sơ. Đủ dùng vì server chạy MỘT tiến
// trình (deploy/ecosystem.config.cjs: fork, instances 1).
const dangTao = new Map();

/**
 * Hồ sơ du học của một học sinh; học sinh ĐÃ DUYỆT mà chưa có thì tạo. Idempotent.
 * Không phải học sinh -> null, không đụng gì tới dữ liệu.
 *
 * @param {number|string} userId
 * @param {object} [thongTin] - { name, email, phone, orgId, tuVanId, nguoiId }
 *   tuVanId: sale / quản lý hồ sơ tạo tài khoản thì hồ sơ thuộc về người đó (nếu không, họ không
 *            thấy hồ sơ của chính học sinh mình tạo).
 *   nguoiId: ai gây ra việc tạo, để ghi nhật ký. Bỏ trống = hệ thống.
 * @returns {Promise<object|null>} Bản ghi du_hoc_ho_so hoặc null
 */
export function taoHoSoDuHocChoHocVien(userId, thongTin = {}) {
  const uid = parseInt(userId, 10);
  if (!uid || isNaN(uid)) return Promise.resolve(null);
  if (dangTao.has(uid)) return dangTao.get(uid);
  const p = taoHoSo(uid, thongTin).finally(() => dangTao.delete(uid));
  dangTao.set(uid, p);
  return p;
}

async function taoHoSo(uid, thongTin) {
  try {
    const [uRows] = await pool.query(
      'SELECT id, name, email, phone, org_id, role, is_admin, is_approved FROM users WHERE id = ?',
      [uid]
    );
    if (!uRows.length) return null;
    const u = uRows[0];
    // Admin chỉ được tạo khi chính cổng học sinh gọi (`choAdmin`) — các đường khác (duyệt tài khoản,
    // nhập lớp, đồng bộ vai trò) vẫn chỉ tạo cho học sinh.
    const laAdminTuKiem = !!thongTin.choAdmin && laQuanTri(u);
    if (!laHocSinh(u) && !laAdminTuKiem) return null;

    // Đã có hồ sơ -> trả luôn. ORDER BY để lần nào cũng ra cùng một hồ sơ nếu lỡ có hai.
    const [co] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE user_id = ? ORDER BY id LIMIT 1', [uid]);
    if (co.length > 0) return co[0];

    if (!u.is_approved && !laAdminTuKiem) return null;

    const orgId = thongTin.orgId || u.org_id || 1;
    const hoTen = String(thongTin.name || u.name || '').trim() || 'Học viên';
    const email = String(thongTin.email || u.email || '').trim() || null;
    const phone = String(thongTin.phone || u.phone || '').trim() || null;
    const tuVanId = parseInt(thongTin.tuVanId, 10) || null;
    const nguoiId = parseInt(thongTin.nguoiId, 10) || null;

    // Sinh mã hồ sơ HS-XXXX (trùng thì lùi một nhịp, cùng lối với POST /admin/du-hoc/ho-so)
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
          `INSERT INTO du_hoc_ho_so (org_id, user_id, ma_hs, ho_ten, email, phone, tu_van_id, buoc, buoc_tu)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'ho-so', CURDATE())`,
          [orgId, uid, ma, hoTen, email, phone, tuVanId]
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

    // Checklist giấy tờ mặc định
    try {
      await pool.query(
        `INSERT INTO du_hoc_giay_to (ho_so_id, ten, bat_buoc, sort_order) VALUES ${GIAY_TO_MAC_DINH.map(() => '(?, ?, ?, ?)').join(', ')}`,
        GIAY_TO_MAC_DINH.flatMap(([ten, bb], i) => [hoSoId, ten, bb, (i + 1) * 10])
      );
    } catch (errGiayTo) {
      console.warn('[du-hoc] Lỗi chèn checklist giấy tờ mặc định:', errGiayTo.message);
    }

    // Nhật ký — nội dung phải khớp NHAT_KY_TU_SINH, sqlTuSinhChuaDung dựa vào nó.
    try {
      await pool.query(
        `INSERT INTO du_hoc_lich_su (ho_so_id, loai, noi_dung, nguoi_id, buoc_cu, buoc_moi)
         VALUES (?, 'he-thong', ?, ?, NULL, 'ho-so')`,
        [hoSoId, `Tự động tạo hồ sơ ${maCuoi} khi có tài khoản ${laAdminTuKiem ? 'quản trị tự kiểm' : 'học sinh'}`, nguoiId]
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
 * Gọi NGAY SAU mọi câu đổi vai trò:
 *   • về học sinh -> có hồ sơ (hồ sơ cũ còn gắn thì dùng lại đúng hồ sơ đó);
 *   • thành nhân sự -> chỉ dọn hồ sơ tự sinh chưa ai đụng tới. Hồ sơ có dữ liệu GIỮ NGUYÊN.
 */
export async function dongBoHoSoTheoVaiTro(userId, thongTin = {}) {
  const uid = parseInt(userId, 10);
  if (!uid) return null;
  try {
    const [u] = await pool.query('SELECT role, is_admin FROM users WHERE id = ?', [uid]);
    if (!u.length) return null;
    if (laHocSinh(u[0])) return taoHoSoDuHocChoHocVien(uid, thongTin);
    await xoaHoSoTuSinhChuaDung(uid);
    return null;
  } catch (err) {
    if (!chuaCoBang(err)) console.error(`[du-hoc] Lỗi đồng bộ hồ sơ theo vai trò cho user ${uid}:`, err);
    return null;
  }
}

/**
 * Học sinh đã duyệt mà chưa có hồ sơ — cho script tạo bù (scripts/du-hoc-tao-ho-so.mjs).
 * KHÔNG chạy lúc khởi động server.
 */
export async function hocSinhChuaCoHoSo() {
  const [rows] = await pool.query(
    `SELECT u.id, u.name, u.email, u.phone, u.org_id FROM users u
      WHERE ${SQL_LA_HOC_SINH} AND u.is_approved = 1
        AND NOT EXISTS (SELECT 1 FROM du_hoc_ho_so h WHERE h.user_id = u.id)
      ORDER BY u.id`
  );
  return rows;
}
