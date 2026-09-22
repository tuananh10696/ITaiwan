// =============================================================
// QUYỀN NỘI DUNG (entitlement) — 2026-09-09
//
// Trả lời đúng một câu hỏi: "người này được học những bộ nào, tới bao giờ?".
// Nguồn quyền có hai đường, HỢP NHẤT lại chứ không loại trừ nhau:
//   1. Cấp thẳng cho tài khoản  (entitlements.user_id) — học viên tự mua.
//   2. Cấp cho cả tổ chức       (entitlements.org_id)  — trung tâm mua rồi phát cho học viên
//      của mình; học viên rời trung tâm là mất quyền đó ngay, không phải đi thu hồi từng người.
//
// Quyền của TỔ CHỨC chỉ có hiệu lực khi chính tổ chức còn hạn thuê — hết hạn hợp đồng thì toàn
// bộ học viên của trung tâm đó mất quyền cùng lúc, không cần thao tác gì thêm.
import pool from '../config/db.js';
import { SAN_PHAM_CUA_BO, maKhoaQuyen } from '../../shared/noi-dung-mo.js';

/** Nhân sự (admin nền tảng, quản trị trung tâm, giáo viên) luôn xem được nội dung để còn dạy. */
const VAI_TRO_XEM_TAT_CA = new Set(['admin', 'org_admin', 'teacher']);

// Bộ nhớ đệm ngắn: client mở một bài là gọi liên tiếp vài tài nguyên (giáo trình, luyện tập,
// dịch), tra DB từng lần là thừa. 60 giây nên thu hồi quyền chậm nhất 1 phút mới có tác dụng —
// đủ nhanh cho nghiệp vụ này, và `xoaCache()` được gọi ngay tại chỗ cấp/thu hồi nên thao tác của
// admin có hiệu lực tức thì trên chính tiến trình đó.
const CACHE_MS = 60_000;
const cache = new Map();

export function xoaCache(userId = null) {
  if (userId == null) cache.clear();
  else cache.delete(Number(userId));
}

/** Bảng chưa có (chưa chạy migration) — phân biệt với lỗi thật để không trả 500 oan. */
function thieuBang(err) {
  return err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');
}

/**
 * Quyền nội dung của một tài khoản.
 * `bo`    = các bộ được mở TRỌN (mua nguyên bộ, hoặc quyền tổ chức).
 * `quyen` = các quyển lẻ, dạng 'duongdai:2' — mua theo quyển từ 2026-09-09.
 * @returns {Promise<{tatCa:boolean, bo:Set<string>, quyen:Set<string>, hetHan:Date|null,
 *                    vaiTro:string, orgId:number, chuaCoBang:boolean, nguon:Array}>}
 */
export async function quyenCuaNguoiDung(userId) {
  const id = Number(userId);
  if (!id) return { tatCa: false, bo: new Set(), quyen: new Set(), hetHan: null, vaiTro: 'khach', orgId: 0, chuaCoBang: false, nguon: [] };

  const sang = cache.get(id);
  if (sang && sang.het > Date.now()) return sang.gt;

  const [[u]] = await pool.query('SELECT id, org_id, role, is_admin FROM users WHERE id = ?', [id]);
  if (!u) return { tatCa: false, bo: new Set(), quyen: new Set(), hetHan: null, vaiTro: 'khach', orgId: 0, chuaCoBang: false, nguon: [] };

  const vaiTro = u.role || (u.is_admin ? 'admin' : 'student');
  const orgId = u.org_id || 1;
  const gt = { tatCa: false, bo: new Set(), quyen: new Set(), hetHan: null, vaiTro, orgId, chuaCoBang: false, nguon: [] };

  if (VAI_TRO_XEM_TAT_CA.has(vaiTro)) {
    gt.tatCa = true;
    gt.nguon.push({ loai: 'vai-tro', vaiTro });
    cache.set(id, { het: Date.now() + CACHE_MS, gt });
    return gt;
  }

  try {
    // Quyền của tổ chức chỉ tính khi tổ chức còn hoạt động và chưa hết hạn thuê.
    const [rows] = await pool.query(
      `SELECT e.id, e.product_ma, e.het_han, e.nguon, e.org_id, e.user_id, p.pham_vi, p.ten
         FROM entitlements e
         JOIN products p ON p.ma = e.product_ma
    LEFT JOIN organizations o ON o.id = e.org_id
        WHERE e.trang_thai = 'hoat-dong'
          AND (e.bat_dau IS NULL OR e.bat_dau <= NOW())
          AND (e.het_han IS NULL OR e.het_han > NOW())
          AND ( e.user_id = ?
                OR ( e.org_id = ?
                     AND o.trang_thai = 'hoat-dong'
                     AND (o.het_han IS NULL OR o.het_han >= CURDATE()) ) )`,
      [id, orgId]
    );

    for (const r of rows) {
      // `pham_vi` là JSON; mysql2 trả về object với cột JSON, nhưng vẫn phòng trường hợp chuỗi.
      let pv = r.pham_vi;
      if (typeof pv === 'string') { try { pv = JSON.parse(pv); } catch { pv = {}; } }
      pv = pv || {};
      if (pv.tatCa) gt.tatCa = true;
      // Có "quyen" -> quyền chỉ trong mấy quyển đó. KHÔNG có -> trọn bộ (giữ đúng nghĩa cũ của
      // 3 sản phẩm `bo-*`, nên entitlements đã cấp trước 2026-09-09 không đổi hành vi).
      for (const b of pv.bo || []) {
        if (Array.isArray(pv.quyen) && pv.quyen.length) {
          for (const q of pv.quyen) gt.quyen.add(`${b}:${Number(q)}`);
        } else {
          gt.bo.add(b);
        }
      }
      // Hạn xa nhất trong các quyền đang có — dùng để hiện "gói của bạn còn tới ngày…".
      if (r.het_han) {
        const d = new Date(r.het_han);
        if (!gt.hetHan || d > gt.hetHan) gt.hetHan = d;
      } else {
        gt.hetHan = gt.hetHan === undefined ? null : gt.hetHan;
      }
      gt.nguon.push({
        id: r.id, product_ma: r.product_ma, ten: r.ten,
        pham_vi: pv, het_han: r.het_han, nguon: r.nguon,
        cap_cho: r.user_id ? 'ca-nhan' : 'to-chuc',
      });
    }
    // Có ít nhất một quyền VĨNH VIỄN thì không nói "hết hạn ngày X" nữa.
    if (rows.some((r) => !r.het_han)) gt.hetHan = null;
  } catch (err) {
    if (thieuBang(err)) {
      // Chưa chạy migration: KHÔNG khoá sạch nội dung của cả hệ thống đang chạy. Trả cờ để route
      // biết mà mở tạm + ghi log, thay vì để mọi học viên đột ngột mất bài sau một lần deploy.
      console.warn('⚠️  Chưa có bảng entitlements/products — tạm mở toàn bộ nội dung. Chạy npm run db:migrate:prod');
      gt.chuaCoBang = true;
      gt.tatCa = true;
    } else {
      throw err;
    }
  }

  cache.set(id, { het: Date.now() + CACHE_MS, gt });
  return gt;
}

/**
 * Quyền `q` (kết quả của `quyenCuaNguoiDung`) có mở được vị trí này không.
 *
 * Ba đường cho qua, hợp nhất chứ không loại trừ nhau:
 *   • `tatCa`      — nhân sự, hoặc gói thời gian mở tất cả.
 *   • `bo`         — mua/được cấp TRỌN bộ.
 *   • `quyen`      — mua lẻ đúng quyển đang mở.
 *
 * `quyen` = null (đề thi thử — không chia quyển) thì chỉ hai đường đầu có tác dụng.
 * Hàm THUẦN, không chạm DB: nơi gọi đã có sẵn `q` nên đừng tra lại.
 */
export function coQuyen(q, bo, quyen = null) {
  if (!q) return false;
  if (q.tatCa) return true;
  if (!bo) return false;
  if (q.bo.has(bo)) return true;
  return quyen != null && q.quyen.has(`${bo}:${Number(quyen)}`);
}

/** Người này có quyền với một vị trí nội dung chưa? Tra DB — dùng khi chưa có sẵn `q`. */
export async function coQuyenBo(userId, bo, quyen = null) {
  if (!bo) return false;
  return coQuyen(await quyenCuaNguoiDung(userId), bo, quyen);
}

/**
 * Mã sản phẩm cần mua để mở một vị trí — để giao diện mời mua ĐÚNG thứ đang thiếu.
 * Có số quyển thì trả mã khoá theo quyển ('kh-hsk-c3'); không thì rơi về mã trọn bộ.
 *
 * Ba mã trọn bộ đã ngừng bán, nhưng vẫn là câu trả lời đúng cho đề thi thử (`bo-thi-thu`) và là
 * lưới an toàn cho tài nguyên không bóc được số quyển.
 */
export function sanPhamCanMua(bo, quyen = null) {
  return maKhoaQuyen(bo, quyen) || SAN_PHAM_CUA_BO[bo] || null;
}

/**
 * Cấp quyền cho một tài khoản hoặc cả tổ chức.
 * Hạn tính từ `products.so_ngay`; sản phẩm mua lẻ (so_ngay NULL) thì vĩnh viễn.
 *
 * ĐÂY LÀ ĐIỂM NỐI CỔNG THANH TOÁN: khi có VNPay/MoMo/Stripe, webhook chỉ việc ghi `payments` rồi
 * gọi hàm này với nguon='mua'. Không phải sửa chỗ nào khác trong luồng phân quyền.
 */
export async function capQuyen({ userId = null, orgId = null, productMa, nguon = 'admin', soNgay = null, capBoi = null, ghiChu = null }) {
  if (!userId && !orgId) throw new Error('capQuyen: phải có userId hoặc orgId');
  if (userId && orgId) throw new Error('capQuyen: chỉ được một trong userId / orgId');

  const [[sp]] = await pool.query('SELECT ma, so_ngay, is_active FROM products WHERE ma = ?', [productMa]);
  if (!sp) throw Object.assign(new Error('Sản phẩm không tồn tại.'), { status: 400 });
  if (!sp.is_active) throw Object.assign(new Error('Sản phẩm đã ngừng bán.'), { status: 400 });

  const ngay = soNgay != null ? Number(soNgay) : sp.so_ngay;
  const [r] = await pool.query(
    `INSERT INTO entitlements (user_id, org_id, product_ma, nguon, bat_dau, het_han, cap_boi, ghi_chu)
     VALUES (?, ?, ?, ?, NOW(), ${ngay ? 'DATE_ADD(NOW(), INTERVAL ? DAY)' : 'NULL'}, ?, ?)`,
    ngay ? [userId, orgId, productMa, nguon, ngay, capBoi, ghiChu]
         : [userId, orgId, productMa, nguon, capBoi, ghiChu]
  );

  if (userId) xoaCache(userId);
  else xoaCache();   // quyền của tổ chức ảnh hưởng mọi thành viên -> dọn sạch đệm
  return r.insertId;
}

/** Thu hồi một quyền đã cấp (giữ bản ghi để còn tra lịch sử — không xoá hàng). */
export async function thuHoiQuyen(id) {
  const [[e]] = await pool.query('SELECT user_id, org_id FROM entitlements WHERE id = ?', [id]);
  if (!e) return false;
  await pool.query("UPDATE entitlements SET trang_thai = 'huy' WHERE id = ?", [id]);
  if (e.user_id) xoaCache(e.user_id); else xoaCache();
  return true;
}
