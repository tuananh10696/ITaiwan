// =============================================================
// QUẢN LÝ HỒ SƠ DU HỌC — cho trung tâm thuê hệ thống (2026-09-15)
// =============================================================
// Luồng: Nhận hồ sơ -> Đóng tiền -> Học -> Tiến độ hồ sơ trường -> Phỏng vấn -> Xin visa -> Chốt lịch bay.
//
// Mount ở /api/admin nên đường dẫn thật là /api/admin/du-hoc/...
// Tách khỏi routes/admin.js (đã ~2.100 dòng) theo quy ước "route mới thì file mới" trong CLAUDE.md.
//
// PHÂN QUYỀN — chỉ QUẢN TRỊ. Giáo viên KHÔNG khai trong bảng QUYEN
// nên tự nhận 403: hồ sơ ở đây có CCCD, hộ chiếu, địa chỉ, tiền nong — giáo viên dạy lớp không
// cần và không nên thấy. Bảng QUYEN là lưới thứ nhất; mọi truy vấn bên dưới vẫn phải kèm
// `dkOrg(req)` làm lưới thứ hai, đúng lối teachers.js đang làm.
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { loadRole, requireStaff, phamViQuanTri, requireHoSoStaff } from '../middleware/roles.js';
import { baoHocSinh } from '../utils/du-hoc-thong-bao.js';
import { LOAI_PV, MA_LOAI_PV, COT_PV, tinhPhongVan } from '../../shared/phong-van.js';
import { chuoiHe } from '../../shared/he-du-hoc.js';
import { ANH_GIAY_TO_TOI_DA, loiAnhGiayTo, themAnhGiayTo, anhTheoGiayTo } from '../utils/du-hoc-giay-to-anh.js';

const router = Router();

// ⚠️ BỘ LỌC ĐƯỜNG DẪN — PHẢI đứng TRƯỚC mọi middleware khác của router này.
// Nhiều router cùng mount ở '/api/admin', mà `router.use(mw)` KHÔNG giới hạn theo đường dẫn:
// middleware của router này sẽ chạy cho MỌI request tới /api/admin/*, kể cả những khu do router
// khác phục vụ. Hệ quả thật đã bắt được 17/09/2026: `requireOrgAdmin` của routes/du-hoc.js chặn
// giáo viên ở khu đề bài (mount sau nó) với thông báo "Chức năng này dành cho quản trị viên" —
// trong khi khu đó vốn cho phép giáo viên.
// Không dùng `router.use('/du-hoc', mw)` vì Express cắt tiền tố khỏi `req.path`, mà
// `phamViQuanTri` lại tra bảng QUYEN bằng chính `req.path` -> mọi luật hết khớp.
// `next('router')` thoát hẳn router này và trả quyền điều khiển về app để đi tiếp router sau.
router.use((req, res, next) => (/^\/du-hoc(\/|$)/.test(req.path) ? next() : next('router')));
router.use(requireAuth, loadRole, requireStaff, phamViQuanTri);

// ------------------------------------------------------------------ hằng số

/** Sáu bước nghiệp vụ + ba trạng thái kết thúc. Thứ tự ở đây là thứ tự hiển thị trên bảng. */
export const BUOC = [
  { ma: 'ho-so',      ten: 'Nhận hồ sơ',       icon: 'fa-folder-open',      mau: '#64748B' },
  { ma: 'dong-tien',  ten: 'Đóng tiền',        icon: 'fa-money-bill-wave',  mau: '#D97706' },
  { ma: 'hoc',        ten: 'Học',              icon: 'fa-graduation-cap',   mau: '#2563EB' },
  // Chen giữa "Học" và "Phỏng vấn" (2026-10-05, khách yêu cầu): hồ sơ đã nộp sang các trường và
  // đang chờ trường xét. Mã là 'nop-truong' — ĐỪNG nhầm với khu con "Tiến độ theo trường" của
  // admin (xem từng trường có những em nào), đó là một màn hình, còn đây là một BƯỚC của hồ sơ.
  { ma: 'nop-truong', ten: 'Tiến độ hồ sơ trường', icon: 'fa-school',       mau: '#0D9488' },
  // "Phỏng vấn" gồm phỏng vấn trường và/hoặc phỏng vấn VP Đài Bắc — xem shared/phong-van.js.
  { ma: 'phong-van',  ten: 'Phỏng vấn',        icon: 'fa-comments',         mau: '#7C3AED' },
  { ma: 'visa',       ten: 'Xin visa',         icon: 'fa-passport',         mau: '#0891B2' },
  { ma: 'bay',        ten: 'Chốt lịch bay',    icon: 'fa-plane-departure',  mau: '#059669' },
  { ma: 'hoan-thanh', ten: 'Đã bay',           icon: 'fa-circle-check',     mau: '#16A34A' },
  { ma: 'tam-dung',   ten: 'Tạm dừng',         icon: 'fa-pause',            mau: '#94A3B8' },
  { ma: 'huy',        ten: 'Huỷ / trượt',      icon: 'fa-circle-xmark',     mau: '#DC2626' },
];
const MA_BUOC = new Set(BUOC.map((b) => b.ma));
/** Sáu bước đang chạy — dùng để đếm "hồ sơ đang xử lý", không tính hồ sơ đã bay/huỷ. */
const BUOC_DANG_CHAY = ['ho-so', 'dong-tien', 'hoc', 'nop-truong', 'phong-van', 'visa', 'bay'];
/** Dạng đã bọc nháy để nhét vào `IN (...)` — một nguồn duy nhất, đừng viết tay danh sách bước ở câu SQL. */
const SQL_DANG_CHAY = BUOC_DANG_CHAY.map((b) => `'${b}'`).join(',');

import {
  GIAY_TO_MAC_DINH, chenGiayToMacDinh, laHocSinh, SQL_LA_HOC_SINH, sqlTuSinhChuaDung, xoaHoSoTuSinhChuaDung,
} from '../utils/du-hoc-tao-hs.js';
export { GIAY_TO_MAC_DINH };

/** Cột client được phép ghi. KHÔNG có org_id / id / ma_hs — đổi chủ sở hữu hồ sơ không phải việc
 *  của một form sửa thông tin. */
const COT_SUA = [
  'ho_ten', 'ten_trung', 'ngay_sinh', 'gioi_tinh', 'cccd', 'ho_chieu', 'ho_chieu_het_han',
  'dia_chi', 'phone', 'email', 'lien_lac_khac',
  'ph_ten', 'ph_phone', 'ph_quan_he',
  'truong_tn', 'nam_tn', 'xep_loai', 'trinh_do_tieng',
  'truong_nv1', 'truong_nv2', 'truong_nv3', 'nganh', 'he_nguyen_vong', 'ky_nhap_hoc', 'loai_hinh',
  // Mẫu hồ sơ khách chốt (2026-10-03): điểm lớp 10/11/12, bố, mẹ, quá trình làm việc.
  'diem_lop10', 'diem_lop11', 'diem_lop12',
  'bo_ten', 'bo_cccd', 'bo_ngay_sinh', 'bo_nghe', 'bo_phone',
  'me_ten', 'me_cccd', 'me_ngay_sinh', 'me_nghe', 'me_phone',
  'qua_trinh_lam_viec',
  'tu_van_id', 'nguon', 'ngay_nhan',
  'ngay_phong_van', 'kq_phong_van', 'truong_do', 'ngay_nop_visa', 'kq_visa', 'ngay_bay',
  // Ba loại phỏng vấn (2026-09-27): trường dùng hai cột cũ ở dòng trên, VP Đài Bắc dùng hai cột này.
  'loai_phong_van', 'ngay_pv_vp', 'kq_pv_vp',
  'chuyen_bay', 'tong_phi', 'ghi_chu', 'user_id',
  // Ký túc xá (2026-09-16). `ktx_dang_ky` / `ktx_loai` / `ktx_ghi_chu` là NGUYỆN VỌNG do học
  // sinh khai (cổng học sinh cũng ghi được), còn `ktx_kq` / `ktx_han` là kết quả + hạn nộp của
  // trường — chỉ nhân viên điền.
  'ktx_dang_ky', 'ktx_loai', 'ktx_ghi_chu', 'ktx_kq', 'ktx_han',
];
/** Cột ngày: chuỗi rỗng phải thành NULL, không phải '' (MySQL ép '' thành 0000-00-00). */
const COT_NGAY = new Set([
  'ngay_sinh', 'ho_chieu_het_han', 'ngay_nhan', 'ngay_phong_van', 'ngay_nop_visa', 'ngay_bay',
  'ktx_han', 'ngay_pv_vp', 'bo_ngay_sinh', 'me_ngay_sinh',
]);
/** Cột ngắn phải cắt đúng độ dài — MySQL strict mode từ chối cả câu UPDATE nếu vượt. */
const DAI_TOI_DA = {
  ten_trung: 80, cccd: 20, ho_chieu: 20, phone: 30, dia_chi: 300, trinh_do_tieng: 255,
  diem_lop10: 10, diem_lop11: 10, diem_lop12: 10, truong_tn: 200, nganh: 200,
  bo_ten: 120, bo_cccd: 20, bo_nghe: 120, bo_phone: 20,
  me_ten: 120, me_cccd: 20, me_nghe: 120, me_phone: 20,
  qua_trinh_lam_viec: 2000, ktx_loai: 60, ktx_ghi_chu: 300,
};
const COT_SO = new Set(['tong_phi', 'tu_van_id', 'user_id']);
const ENUM_HOP_LE = {
  gioi_tinh: ['nam', 'nu', 'khac'],
  loai_hinh: ['hoa-ngu', 'dai-hoc', 'cao-hoc', 'tien-si', 'khac'],
  kq_phong_van: ['cho', 'dau', 'truot'],
  kq_visa: ['cho', 'dau', 'truot'],
  loai_phong_van: MA_LOAI_PV,
  kq_pv_vp: ['cho', 'dau', 'truot'],
  ktx_dang_ky: ['chua-quyet', 'co', 'khong'],
  ktx_kq: ['cho', 'duoc', 'khong-duoc'],
};

// ------------------------------------------------------------------ helper

/** Mảnh SQL + tham số giới hạn theo tổ chức. Admin nền tảng không bị lọc. */
/**
 * Mảnh WHERE dùng chung cho MỌI truy vấn trong file này. Hai tầng lọc:
 *   • tổ chức (`locOrg`) — bản này luôn tắt, giữ cho tương lai tách cơ sở;
 *   • người phụ trách (`nhanSuId`) — sale / quản lý hồ sơ chỉ thấy hồ sơ của chính mình.
 *
 * Cố ý nhét việc lọc theo nhân sự vào ĐÚNG hai hàm này thay vì vá từng câu SELECT: mọi truy
 * vấn ở đây đều đã JOIN `du_hoc_ho_so h`, nên một chỗ sửa là cả khu được lọc, và route viết
 * thêm về sau tự động thừa hưởng. Quên lọc ở khu này không phải là phiền toái 403 — đó là
 * sale này đọc được hồ sơ, CCCD và tiền nong của khách do sale kia phụ trách.
 *
 * Thứ tự tham số trong `tsOrg` phải khớp thứ tự điều kiện trong `dkOrg`.
 */
const dkOrg = (req, cot = 'h.org_id') => {
  const bang = cot.includes('.') ? cot.split('.')[0] : 'h';
  return (req.locOrg ? ` AND ${cot} = ?` : '')
    + (req.nhanSuId ? ` AND ${bang}.tu_van_id = ?` : '');
};
const tsOrg = (req) => [
  ...(req.locOrg ? [req.orgId] : []),
  ...(req.nhanSuId ? [req.nhanSuId] : []),
];

/** Bảng chưa có (chưa chạy migration) thì nói đúng nguyên nhân thay vì "Lỗi hệ thống". */
function loiBang(err, macDinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'DB chưa có bảng hồ sơ du học. Chạy `npm run db:migrate:prod` rồi thử lại.';
  }
  return macDinh;
}
const chuaCoBang = (err) => err && err.code === 'ER_NO_SUCH_TABLE';

/** `2027-03-15` -> `15/03/2027`. Thông báo cho học sinh phải đọc theo lối Việt, không phải ISO. */
function ngayVi(d) {
  const s = String(d instanceof Date ? d.toISOString().slice(0, 10) : d || '').slice(0, 10);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : s;
}

/** Hồ sơ có thuộc phạm vi người đang gọi không. Trả bản ghi hoặc null. */
async function layHoSo(id, req) {
  const [r] = await pool.query(
    `SELECT h.* FROM du_hoc_ho_so h WHERE h.id = ?${dkOrg(req)}`,
    [id, ...tsOrg(req)]
  );
  return r[0] || null;
}

/** Ghi một dòng nhật ký. Lỗi ở đây KHÔNG được làm hỏng thao tác chính — nhật ký là phần phụ. */
async function ghiNhatKy(hoSoId, loai, noiDung, nguoiId, buocCu = null, buocMoi = null) {
  try {
    await pool.query(
      `INSERT INTO du_hoc_lich_su (ho_so_id, loai, buoc_cu, buoc_moi, noi_dung, nguoi_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [hoSoId, loai, buocCu, buocMoi, String(noiDung || '').slice(0, 1000), nguoiId]
    );
  } catch (err) {
    console.error('Không ghi được nhật ký du học:', err.message);
  }
}

/** Chuẩn hoá một giá trị client gửi lên theo kiểu của cột. */
function chuanGiaTri(cot, v) {
  if (v === undefined) return undefined;
  if (v === null || v === '') return COT_SO.has(cot) && cot === 'tong_phi' ? 0 : null;
  if (COT_NGAY.has(cot)) {
    const s = String(v).slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
  }
  if (COT_SO.has(cot)) {
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }
  if (ENUM_HOP_LE[cot]) return ENUM_HOP_LE[cot].includes(v) ? v : null;
  if (cot === 'he_nguyen_vong') return chuoiHe(v);
  return String(v).trim().slice(0, DAI_TOI_DA[cot] || 1000) || null;
}

/**
 * Giá trị để SO SÁNH cũ/mới theo đúng thứ người dùng thấy. Cột DATE từ mysql2 về là Date object
 * dựng theo giờ máy chủ, nên lấy ngày bằng getter giờ ĐỊA PHƯƠNG — `toISOString()` sẽ lùi một
 * ngày trên máy đặt múi +07.
 */
function giaTriSo(v) {
  if (v === null || v === undefined || v === '') return '';
  if (v instanceof Date) {
    const p = (n) => String(n).padStart(2, '0');
    return `${v.getFullYear()}-${p(v.getMonth() + 1)}-${p(v.getDate())}`;
  }
  return String(v);
}

/**
 * Hồ sơ đang ở bước "Phỏng vấn" và đã ĐẬU đủ các buổi cần có (trường / VP Đài Bắc / cả 2) thì tự
 * chuyển sang "Xin visa", ghi lịch sử và báo học sinh như một lần chuyển bước bằng tay.
 *
 * Chỉ đi TỪ "Phỏng vấn": hồ sơ còn ở "Học" / "Đóng tiền" mà có kết quả phỏng vấn (học chạy song
 * song với phỏng vấn) thì không nhảy cóc — tự bỏ qua bước chưa xong là giấu mất việc còn nợ.
 * `AND buoc = 'phong-van'` nằm trong câu UPDATE để hai lần lưu cùng lúc không chuyển hai lần.
 *
 * @returns {Promise<string|null>} mã bước đã chuyển tới, hoặc null nếu không chuyển
 */
async function tuChuyenSauPhongVan(hoSoId, req) {
  try {
    const [r] = await pool.query(
      `SELECT id, buoc, user_id, loai_phong_van, ngay_phong_van, kq_phong_van, ngay_pv_vp, kq_pv_vp
         FROM du_hoc_ho_so WHERE id = ?`, [hoSoId]);
    const h = r[0];
    if (!h || h.buoc !== 'phong-van') return null;
    const pv = tinhPhongVan(h);
    if (!pv.du) return null;

    const [u] = await pool.query(
      "UPDATE du_hoc_ho_so SET buoc = 'visa', buoc_tu = CURDATE() WHERE id = ? AND buoc = 'phong-van'",
      [hoSoId]);
    if (!u.affectedRows) return null;

    const ten = (m) => BUOC.find((b) => b.ma === m)?.ten || m;
    await ghiNhatKy(hoSoId, 'buoc',
      `${ten('phong-van')} → ${ten('visa')} · tự chuyển vì đã đậu ${pv.tong > 1 ? `cả ${pv.tong} buổi phỏng vấn` : 'phỏng vấn'}`,
      req.userId, 'phong-van', 'visa');
    if (h.user_id) {
      await baoHocSinh(hoSoId, h.user_id, 'buoc', `Hồ sơ chuyển sang bước: ${ten('visa')}`,
        `Hồ sơ du học của bạn vừa được chuyển từ "${ten('phong-van')}" sang "${ten('visa')}".`);
    }
    return 'visa';
  } catch (err) {
    // Tự chuyển là việc phụ: lỗi ở đây không được làm hỏng lần lưu vừa thành công.
    console.error('Lỗi tự chuyển bước sau phỏng vấn:', err);
    return null;
  }
}

/** Tách phần thân hồ sơ client gửi lên thành cặp (cột, giá trị) đã lọc + chuẩn hoá. */
/**
 * Lọc các trường được phép ghi từ body.
 *
 * `req` bắt buộc phải truyền vào: với sale / quản lý hồ sơ, hàm ÉP `tu_van_id` về chính họ —
 * tạo hồ sơ thì hồ sơ thuộc về mình, sửa hồ sơ thì không chuyển được sang tên người khác.
 * Không có chốt này thì một sale sửa `tu_van_id` trong body là đẩy hồ sơ (kèm toàn bộ tiền
 * đã thu) sang người khác, hoặc kéo hồ sơ của đồng nghiệp về mình nếu biết id.
 */
function locThanHoSo(body, req) {
  const cot = [];
  const gt = [];
  for (const c of COT_SUA) {
    if (c === 'tu_van_id' && req?.nhanSuId) continue;   // xử lý riêng bên dưới
    if (!(c in body)) continue;
    const v = chuanGiaTri(c, body[c]);
    if (v === undefined) continue;
    cot.push(c);
    gt.push(v);
  }
  if (req?.nhanSuId) {
    cot.push('tu_van_id');
    gt.push(req.nhanSuId);
  }
  return { cot, gt };
}

// =============================================================
// SỐ LIỆU THEO VAI TRÒ (2026-10-05)
// =============================================================
// Bốn ô trên đầu màn Hồ sơ du học (Hồ sơ đang xử lý · Đã thu · Còn phải thu · Thu 30 ngày qua).
// Khách chốt ai thấy gì:
//   admin       — tổng thể cả trung tâm, đủ 4 ô.
//   ho_so       — (quản lý hồ sơ) CHỈ ô "Hồ sơ đang xử lý", đếm TOÀN trung tâm, không có tiền.
//   sale        — đủ 4 ô nhưng chỉ tính hồ sơ mình phụ trách (`tu_van_id`).
//   teacher     — đủ 4 ô, tính hồ sơ của học sinh trong lớp mình dạy (và hồ sơ mình tư vấn nếu có).
// Mục tiêu cuối: chỉ admin nhìn được tiền ra vào CỦA TRUNG TÂM. Số tiền của sale/giáo viên ở đây
// chỉ là của những em họ phụ trách, không phải dòng tiền toàn trung tâm.
// Việc lọc nằm ở SERVER: ô nào vai trò đó không được thấy thì KHÔNG tính và không gửi về — ẩn bằng
// giao diện thì bấm F12 là thấy.
function phamViSoLieu(req) {
  const org = req.locOrg ? ' AND h.org_id = ?' : '';
  const tsOrg_ = req.locOrg ? [req.orgId] : [];
  if (req.role === 'teacher') {
    return {
      pham_vi: 'hoc-sinh-lop', tien: true,
      sql: `${org} AND (h.tu_van_id = ? OR h.user_id IN (
              SELECT ce.user_id FROM class_enrollments ce JOIN classes c ON c.id = ce.class_id
               WHERE c.teacher_id = ?))`,
      ts: [...tsOrg_, req.userId, req.userId],
    };
  }
  if (req.role === 'sale') {
    return { pham_vi: 'ca-nhan', tien: true, sql: `${org} AND h.tu_van_id = ?`, ts: [...tsOrg_, req.userId] };
  }
  if (req.role === 'ho_so') {
    return { pham_vi: 'toan-bo', tien: false, sql: org, ts: tsOrg_ };
  }
  return { pham_vi: 'toan-bo', tien: true, sql: org, ts: tsOrg_ };
}

const SO_LIEU_RONG = {
  dang_chay: 0, tien: null, hien_tien: false,
};

/** Tính các ô số liệu cho người đang gọi. `tien` là null khi vai trò đó không được thấy tiền. */
async function tinhSoLieu(req) {
  const p = phamViSoLieu(req);
  const [[d]] = await pool.query(
    `SELECT COUNT(*) AS so FROM du_hoc_ho_so h WHERE h.buoc IN (${SQL_DANG_CHAY})${p.sql}`, p.ts);
  const kq = { dang_chay: Number(d.so) || 0, tien: null, hien_tien: p.tien, pham_vi: p.pham_vi, vai: req.role };
  if (!p.tien) return kq;

  // Công nợ: tổng phí đã chốt trừ số thực thu. Tính bằng subquery thay vì JOIN + GROUP BY để
  // hồ sơ CHƯA thu đồng nào vẫn được đếm (JOIN thường sẽ đánh rơi chúng).
  const [tien] = await pool.query(
    `SELECT
       COALESCE(SUM(h.tong_phi), 0) AS tong_phi,
       COALESCE(SUM((SELECT COALESCE(SUM(CASE WHEN tt.loai = 'hoan' THEN -tt.so_tien ELSE tt.so_tien END), 0)
                       FROM du_hoc_thu_tien tt WHERE tt.ho_so_id = h.id)), 0) AS da_thu
     FROM du_hoc_ho_so h
     WHERE h.buoc <> 'huy'${p.sql}`, p.ts);
  // Thu trong 30 ngày gần nhất — con số trung tâm nhìn hằng ngày.
  const [thu30] = await pool.query(
    `SELECT COALESCE(SUM(CASE WHEN tt.loai = 'hoan' THEN -tt.so_tien ELSE tt.so_tien END), 0) AS so
       FROM du_hoc_thu_tien tt JOIN du_hoc_ho_so h ON h.id = tt.ho_so_id
      WHERE tt.ngay_thu >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)${p.sql}`, p.ts);
  const tongPhi = Number(tien[0]?.tong_phi || 0);
  const daThu = Number(tien[0]?.da_thu || 0);
  kq.tien = {
    tong_phi: tongPhi, da_thu: daThu, con_thieu: Math.max(0, tongPhi - daThu),
    thu_30_ngay: Number(thu30[0]?.so || 0),
  };
  return kq;
}

// Giáo viên vào được ĐÚNG route này của khu du học (bảng QUYEN ở roles.js) — chỉ vài con số, không
// có tên, CCCD hay danh sách hồ sơ. Đứng TRƯỚC `requireHoSoStaff` bên dưới, nếu không giáo viên bị
// chặn ở đó. Thêm route nào khác vào trước dòng `router.use(requireHoSoStaff)` là mở nó cho giáo
// viên — đừng làm vậy với route trả dữ liệu cá nhân.
router.get('/du-hoc/so-lieu', async (req, res) => {
  try {
    res.json(await tinhSoLieu(req));
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ ...SO_LIEU_RONG, hien_tien: req.role !== 'ho_so', chua_migrate: true });
    console.error('Lỗi số liệu du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được số liệu hồ sơ du học.') });
  }
});

router.use(requireHoSoStaff);

// =============================================================
// TỔNG QUAN
// =============================================================
// Một request trả đủ mọi con số của bảng điều khiển: bảng điều khiển gọi 5 endpoint là 5 vòng
// mạng cho một màn hình (bài học ở CLAUDE.md 4.43).
router.get('/du-hoc/tong-quan', async (req, res) => {
  try {
    const o = dkOrg(req);
    const t = tsOrg(req);

    const [theoBuoc] = await pool.query(
      `SELECT h.buoc, COUNT(*) AS so FROM du_hoc_ho_so h WHERE 1=1${o} GROUP BY h.buoc`,
      t
    );

    // Bốn ô số liệu đầu màn hình — phạm vi và quyền xem tiền theo vai trò, xem `phamViSoLieu`.
    const soLieu = await tinhSoLieu(req);

    // --- VIỆC CẦN LÀM ---
    // Mỗi truy vấn trả lời một câu hỏi vận hành cụ thể. Giới hạn 20 để màn hình không thành một
    // danh sách dài vô tận; số tổng nằm ở `dem`.
    const viec = {};
    // Hai loại buổi (trường / VP Đài Bắc) gộp một danh sách, mỗi dòng ghi rõ `loai_buoi`: em
    // "Cả 2" có hai buổi trong 14 ngày thì hiện hai dòng — đó là hai việc phải chuẩn bị.
    const buoiPv = (cotNgay, cotKq, loai) => `
      SELECT h.id, h.ma_hs, h.ho_ten, '${loai}' AS loai_buoi, h.${cotNgay} AS ngay, h.truong_nv1
        FROM du_hoc_ho_so h
       WHERE h.${cotNgay} IS NOT NULL
         AND (h.${cotKq} IS NULL OR h.${cotKq} = 'cho')
         AND h.buoc NOT IN ('huy', 'tam-dung')
         AND h.${cotNgay} BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 14 DAY)${o}`;
    const [pv] = await pool.query(
      `SELECT * FROM (${buoiPv('ngay_phong_van', 'kq_phong_van', 'truong')}
        UNION ALL ${buoiPv('ngay_pv_vp', 'kq_pv_vp', 'vp')}) x
        ORDER BY x.ngay LIMIT 20`,
      [...t, ...t]
    );
    viec.phong_van = pv;

    const [bay] = await pool.query(
      `SELECT h.id, h.ma_hs, h.ho_ten, h.ngay_bay, h.chuyen_bay
         FROM du_hoc_ho_so h
        WHERE h.ngay_bay IS NOT NULL AND h.buoc NOT IN ('huy', 'tam-dung')
          AND h.ngay_bay BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)${o}
        ORDER BY h.ngay_bay LIMIT 20`,
      t
    );
    viec.sap_bay = bay;

    // Hộ chiếu phải còn hạn ít nhất 6 tháng khi nộp visa — cảnh báo sớm chứ không đợi tới lúc nộp.
    const [hc] = await pool.query(
      `SELECT h.id, h.ma_hs, h.ho_ten, h.ho_chieu_het_han
         FROM du_hoc_ho_so h
        WHERE h.ho_chieu_het_han IS NOT NULL
          AND h.ho_chieu_het_han <= DATE_ADD(CURDATE(), INTERVAL 6 MONTH)
          AND h.buoc IN (${SQL_DANG_CHAY})${o}
        ORDER BY h.ho_chieu_het_han LIMIT 20`,
      t
    );
    viec.ho_chieu = hc;

    // Hồ sơ đứng yên quá 30 ngày: thứ duy nhất chỉ ra em nào đang bị bỏ quên.
    const [im] = await pool.query(
      `SELECT h.id, h.ma_hs, h.ho_ten, h.buoc, h.buoc_tu,
              DATEDIFF(CURDATE(), h.buoc_tu) AS so_ngay
         FROM du_hoc_ho_so h
        WHERE h.buoc_tu IS NOT NULL AND h.buoc IN (${SQL_DANG_CHAY})
          AND h.buoc_tu <= DATE_SUB(CURDATE(), INTERVAL 30 DAY)${o}
        ORDER BY h.buoc_tu LIMIT 20`,
      t
    );
    viec.bo_quen = im;

    // Danh sách "còn nợ" kèm số tiền từng em: quản lý hồ sơ không được thấy tiền nên bỏ hẳn.
    if (soLieu.hien_tien) {
      const [congNo] = await pool.query(
        `SELECT h.id, h.ma_hs, h.ho_ten, h.tong_phi,
                (SELECT COALESCE(SUM(CASE WHEN tt.loai = 'hoan' THEN -tt.so_tien ELSE tt.so_tien END), 0)
                   FROM du_hoc_thu_tien tt WHERE tt.ho_so_id = h.id) AS da_thu
           FROM du_hoc_ho_so h
          WHERE h.tong_phi > 0 AND h.buoc <> 'huy'${o}
         HAVING da_thu < h.tong_phi
          ORDER BY (h.tong_phi - da_thu) DESC LIMIT 20`,
        t
      );
      viec.cong_no = congNo;
    } else {
      viec.cong_no = [];
    }

    res.json({
      buoc: BUOC,
      theo_buoc: theoBuoc,
      dang_chay: soLieu.dang_chay,
      tien: soLieu.tien,
      hien_tien: soLieu.hien_tien,
      pham_vi: soLieu.pham_vi,
      vai: soLieu.vai,
      viec,
    });
  } catch (err) {
    if (chuaCoBang(err)) {
      // Chưa migrate thì trả khung rỗng + cờ, KHÔNG ném 500: giao diện vẫn vẽ được và nói đúng
      // nguyên nhân, thay vì một màn hình lỗi không ai biết phải làm gì.
      return res.json({
        buoc: BUOC, theo_buoc: [], dang_chay: 0,
        tien: req.role === 'ho_so' ? null : { tong_phi: 0, da_thu: 0, con_thieu: 0, thu_30_ngay: 0 },
        hien_tien: req.role !== 'ho_so', vai: req.role,
        viec: { phong_van: [], sap_bay: [], ho_chieu: [], bo_quen: [], cong_no: [] },
        chua_migrate: true,
      });
    }
    console.error('Lỗi tổng quan du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được tổng quan du học.') });
  }
});

// =============================================================
// DANH SÁCH HỒ SƠ
// =============================================================
router.get('/du-hoc/ho-so', async (req, res) => {
  try {
    const dk = ['1=1'];
    const ts = [];
    if (req.locOrg) { dk.push('h.org_id = ?'); ts.push(req.orgId); }
    // Sale / quản lý hồ sơ: chỉ hồ sơ mình phụ trách. Đặt TRƯỚC bộ lọc `tu_van` của giao diện
    // để bộ lọc đó không nới rộng được phạm vi (?tu_van=<id người khác> chỉ làm hẹp thêm).
    if (req.nhanSuId) { dk.push('h.tu_van_id = ?'); ts.push(req.nhanSuId); }

    if (req.query.buoc && MA_BUOC.has(req.query.buoc)) { dk.push('h.buoc = ?'); ts.push(req.query.buoc); }
    else if (req.query.buoc === 'dang-chay') { dk.push(`h.buoc IN (${SQL_DANG_CHAY})`); }

    const tv = parseInt(req.query.tu_van || '', 10);
    if (Number.isFinite(tv)) { dk.push('h.tu_van_id = ?'); ts.push(tv); }

    if (req.query.ky) { dk.push('h.ky_nhap_hoc = ?'); ts.push(String(req.query.ky).slice(0, 40)); }

    const tim = String(req.query.tim || '').trim();
    if (tim) {
      dk.push('(h.ho_ten LIKE ? OR h.ma_hs LIKE ? OR h.phone LIKE ? OR h.email LIKE ? OR h.cccd LIKE ?)');
      const q = `%${tim}%`;
      ts.push(q, q, q, q, q);
    }

    const trang = Math.max(1, parseInt(req.query.trang || '1', 10) || 1);
    const moiTrang = Math.min(100, Math.max(10, parseInt(req.query.moi_trang || '25', 10) || 25));
    const where = dk.join(' AND ');

    const [dem] = await pool.query(`SELECT COUNT(*) AS so FROM du_hoc_ho_so h WHERE ${where}`, ts);

    // Số đã thu tính bằng subquery tương quan: hồ sơ chưa thu đồng nào vẫn phải có mặt trong danh
    // sách (JOIN + GROUP BY sẽ đánh rơi chúng, mà đó đúng là nhóm cần đòi tiền nhất).
    const [rows] = await pool.query(
      `SELECT h.id, h.ma_hs, h.ho_ten, h.phone, h.email, h.buoc, h.buoc_tu, h.ky_nhap_hoc,
              h.truong_nv1, h.nganh, h.truong_do, h.loai_hinh, h.ngay_phong_van, h.kq_phong_van, h.ngay_nop_visa,
              h.loai_phong_van, h.ngay_pv_vp, h.kq_pv_vp,
              h.kq_visa, h.ngay_bay, h.tong_phi, h.user_id, h.ho_chieu_het_han, h.created_at,
              u.name AS tu_van_ten,
              (SELECT COALESCE(SUM(CASE WHEN tt.loai = 'hoan' THEN -tt.so_tien ELSE tt.so_tien END), 0)
                 FROM du_hoc_thu_tien tt WHERE tt.ho_so_id = h.id) AS da_thu,
              (SELECT COUNT(*) FROM du_hoc_giay_to g
                WHERE g.ho_so_id = h.id AND g.bat_buoc = TRUE AND g.trang_thai = 'chua') AS thieu_giay_to
         FROM du_hoc_ho_so h
         LEFT JOIN users u ON u.id = h.tu_van_id
        WHERE ${where}
        ORDER BY h.updated_at DESC
        LIMIT ? OFFSET ?`,
      [...ts, moiTrang, (trang - 1) * moiTrang]
    );

    // Bộ lọc "kỳ nhập học" phải liệt kê được các kỳ đang có — trung tâm không nhớ mình đã gõ gì.
    const [kyList] = await pool.query(
      `SELECT DISTINCT h.ky_nhap_hoc FROM du_hoc_ho_so h
        WHERE h.ky_nhap_hoc IS NOT NULL AND h.ky_nhap_hoc <> ''${dkOrg(req)}
        ORDER BY h.ky_nhap_hoc`,
      tsOrg(req)
    );

    res.json({
      ho_so: rows,
      tong: dem[0].so,
      trang,
      so_trang: Math.max(1, Math.ceil(dem[0].so / moiTrang)),
      buoc: BUOC,
      ky_list: kyList.map((k) => k.ky_nhap_hoc),
    });
  } catch (err) {
    if (chuaCoBang(err)) {
      return res.json({ ho_so: [], tong: 0, trang: 1, so_trang: 1, buoc: BUOC, ky_list: [], chua_migrate: true });
    }
    console.error('Lỗi danh sách hồ sơ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được danh sách hồ sơ.') });
  }
});

// =============================================================
// TIẾN ĐỘ THEO TRƯỜNG — quản trị TỰ QUẢN LÝ (2026-10-08)
// =============================================================
// Quản trị tự thêm từng trường, rồi tự thêm học sinh (chọn từ hồ sơ du học có sẵn) vào trường đó —
// giống thêm lớp rồi add học sinh. Bản 2026-09-25 tự gom học sinh theo CHỮ tên trường trong hồ sơ
// (server/utils/nhom-truong.js); đã bỏ hẳn theo yêu cầu khách.
//
// Một hồ sơ thuộc được NHIỀU trường; mỗi cặp (trường, hồ sơ) có kết quả riêng: cho | dau | truot.
// Gỡ học sinh khỏi trường / xoá trường KHÔNG xoá hồ sơ (bảng liên kết ON DELETE CASCADE một chiều).
//
// PHÂN QUYỀN RIÊNG CỦA MÀN NÀY (2026-10-08, khách yêu cầu):
//   · quản trị + quản lý hồ sơ (ho_so): thấy và tìm được MỌI học sinh;
//   · sale: chỉ thấy và tìm được học sinh thuộc hồ sơ MÌNH phụ trách (`tu_van_id`).
//     Lưu ý: ở các khu khác (danh sách hồ sơ, chi tiết...) quản lý hồ sơ vẫn bị lọc như sale — chỉ
//     màn này mở rộng, nên KHÔNG dùng `dkOrg` ở đây mà dùng `dkPhamViTruong`.
//   · thêm / gỡ học sinh, đặt kết quả: cả ba vai trò, trong đúng phạm vi thấy được ở trên;
//   · thêm / đổi tên / xoá TRƯỜNG: chỉ quản trị — không có luật nào cho nhân sự ở middleware/roles.js
//     nên họ tự nhận 403.
// `sua_duoc` (quản lý trường) báo cho giao diện biết có hiện nút trường hay không.
// Chỉ lấy cột màn này cần — KHÔNG kéo CCCD, hộ chiếu, điện thoại, tiền.
const KET_QUA_TRUONG = ['cho', 'dau', 'truot'];
/** Phạm vi học sinh của màn này: chỉ sale bị lọc theo người phụ trách (xem đầu khối). Bí danh bảng hồ sơ phải là `h`. */
const dkPhamViTruong = (req) => (req.role === 'sale' ? ' AND h.tu_van_id = ?' : '');
const tsPhamViTruong = (req) => (req.role === 'sale' ? [req.userId] : []);

router.get('/du-hoc/theo-truong', async (req, res) => {
  try {
    const [[dsTruong], [dsHs]] = await Promise.all([
      pool.query('SELECT id, ten FROM du_hoc_truong ORDER BY ten'),
      pool.query(
        `SELECT m.id, m.truong_id, m.ket_qua, h.id AS ho_so_id, h.ho_ten, h.buoc, h.ky_nhap_hoc, h.nganh,
                u.name AS tu_van_ten
           FROM du_hoc_truong_hs m
           JOIN du_hoc_ho_so h ON h.id = m.ho_so_id
           LEFT JOIN users u ON u.id = h.tu_van_id
          WHERE 1=1${dkPhamViTruong(req)}
          ORDER BY h.ho_ten, m.id`,
        tsPhamViTruong(req)
      ),
    ]);
    const theo = new Map(dsTruong.map((t) => [t.id, { ...t, cho: 0, dau: 0, truot: 0, hoc_sinh: [] }]));
    for (const h of dsHs) {
      const t = theo.get(h.truong_id);
      if (!t) continue;
      t[h.ket_qua] += 1;
      t.hoc_sinh.push(h);
    }
    const truong = [...theo.values()].map((t) => ({ ...t, tong: t.hoc_sinh.length }));
    res.json({
      buoc: BUOC,
      sua_duoc: !req.nhanSuId,   // quản lý TRƯỜNG: chỉ quản trị
      tong_luot: dsHs.length,
      truong,
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ buoc: BUOC, sua_duoc: !req.nhanSuId, tong_luot: 0, truong: [], chua_migrate: true });
    console.error('Lỗi tiến độ theo trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được tiến độ theo trường.') });
  }
});

/** Tên trường hợp lệ chưa. Trả { ten } hoặc { loi }. */
function tenTruong(body) {
  const ten = String(body?.ten ?? '').trim().replace(/\s+/g, ' ');
  if (!ten) return { loi: 'Chưa nhập tên trường.' };
  if (ten.length > 200) return { loi: 'Tên trường tối đa 200 ký tự.' };
  return { ten };
}

router.post('/du-hoc/theo-truong', async (req, res) => {
  const { ten, loi } = tenTruong(req.body);
  if (loi) return res.status(400).json({ error: loi });
  try {
    const [r] = await pool.query('INSERT INTO du_hoc_truong (ten) VALUES (?)', [ten]);
    res.status(201).json({ id: r.insertId, message: 'Đã thêm trường.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Trường này đã có trong danh sách.' });
    console.error('Lỗi thêm trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không thêm được trường.') });
  }
});

router.put('/du-hoc/theo-truong/:id', async (req, res) => {
  const { ten, loi } = tenTruong(req.body);
  if (loi) return res.status(400).json({ error: loi });
  try {
    const [r] = await pool.query('UPDATE du_hoc_truong SET ten = ? WHERE id = ?', [ten, req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy trường.' });
    res.json({ message: 'Đã đổi tên trường.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Đã có trường khác trùng tên này.' });
    console.error('Lỗi đổi tên trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không đổi được tên trường.') });
  }
});

router.delete('/du-hoc/theo-truong/:id', async (req, res) => {
  try {
    const [r] = await pool.query('DELETE FROM du_hoc_truong WHERE id = ?', [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy trường.' });
    res.json({ message: 'Đã xoá trường.' });
  } catch (err) {
    console.error('Lỗi xoá trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không xoá được trường.') });
  }
});

/** Tìm hồ sơ để thêm vào trường — đúng phạm vi thấy được của người gọi (sale: hồ sơ mình phụ trách). */
router.get('/du-hoc/theo-truong/tim-hoc-sinh', async (req, res) => {
  const q = String(req.query.q || '').trim().slice(0, 100);
  if (!q) return res.json({ ho_so: [], tong: 0 });
  try {
    const like = `%${q}%`;
    const dk = `(h.ho_ten LIKE ? OR h.ma_hs LIKE ? OR h.phone LIKE ?)${dkPhamViTruong(req)}`;
    const ts = [like, like, like, ...tsPhamViTruong(req)];
    const [[dem], [rows]] = await Promise.all([
      pool.query(`SELECT COUNT(*) AS n FROM du_hoc_ho_so h WHERE ${dk}`, ts),
      pool.query(
        `SELECT h.id, h.ma_hs, h.ho_ten, h.ky_nhap_hoc, h.nganh FROM du_hoc_ho_so h
          WHERE ${dk} ORDER BY h.ho_ten LIMIT 10`, ts),
    ]);
    res.json({ ho_so: rows, tong: dem[0].n });
  } catch (err) {
    console.error('Lỗi tìm học sinh để thêm vào trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không tìm được học sinh.') });
  }
});

router.post('/du-hoc/theo-truong/:id/hoc-sinh', async (req, res) => {
  const hoSoId = parseInt(req.body?.ho_so_id, 10);
  if (!Number.isFinite(hoSoId)) return res.status(400).json({ error: 'Chưa chọn học sinh.' });
  try {
    const [[tr], [hs]] = await Promise.all([
      pool.query('SELECT id FROM du_hoc_truong WHERE id = ?', [req.params.id]),
      pool.query(`SELECT h.id FROM du_hoc_ho_so h WHERE h.id = ?${dkPhamViTruong(req)}`, [hoSoId, ...tsPhamViTruong(req)]),
    ]);
    if (!tr.length) return res.status(404).json({ error: 'Không tìm thấy trường.' });
    if (!hs.length) return res.status(404).json({ error: 'Không tìm thấy hồ sơ học sinh.' });
    const [r] = await pool.query('INSERT INTO du_hoc_truong_hs (truong_id, ho_so_id) VALUES (?, ?)', [tr[0].id, hs[0].id]);
    res.status(201).json({ id: r.insertId, message: 'Đã thêm học sinh vào trường.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Học sinh này đã có trong trường.' });
    console.error('Lỗi thêm học sinh vào trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không thêm được học sinh.') });
  }
});

router.put('/du-hoc/theo-truong-hs/:id', async (req, res) => {
  const kq = req.body?.ket_qua;
  if (!KET_QUA_TRUONG.includes(kq)) return res.status(400).json({ error: 'Kết quả không hợp lệ.' });
  try {
    const [r] = await pool.query(
      `UPDATE du_hoc_truong_hs m JOIN du_hoc_ho_so h ON h.id = m.ho_so_id
          SET m.ket_qua = ? WHERE m.id = ?${dkPhamViTruong(req)}`,
      [kq, req.params.id, ...tsPhamViTruong(req)]
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy học sinh trong trường.' });
    res.json({ message: 'Đã cập nhật kết quả.' });
  } catch (err) {
    console.error('Lỗi cập nhật kết quả theo trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không cập nhật được kết quả.') });
  }
});

router.delete('/du-hoc/theo-truong-hs/:id', async (req, res) => {
  try {
    const [r] = await pool.query(
      `DELETE m FROM du_hoc_truong_hs m JOIN du_hoc_ho_so h ON h.id = m.ho_so_id
        WHERE m.id = ?${dkPhamViTruong(req)}`,
      [req.params.id, ...tsPhamViTruong(req)]
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy học sinh trong trường.' });
    res.json({ message: 'Đã gỡ học sinh khỏi trường.' });
  } catch (err) {
    console.error('Lỗi gỡ học sinh khỏi trường:', err);
    res.status(500).json({ error: loiBang(err, 'Không gỡ được học sinh.') });
  }
});

// =============================================================
// CHI TIẾT MỘT HỒ SƠ
// =============================================================
router.get('/du-hoc/ho-so/:id', async (req, res) => {
  try {
    const hs = await layHoSo(req.params.id, req);
    if (!hs) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });

    const [[giayTo], [thuTien], [lichSu]] = await Promise.all([
      pool.query('SELECT * FROM du_hoc_giay_to WHERE ho_so_id = ? ORDER BY sort_order, id', [hs.id]),
      pool.query(
        // KHÔNG dùng `tt.*`: cột `anh` là MEDIUMTEXT base64, kéo cả danh sách về là vài MB cho
        // một bảng 20 dòng. Chỉ báo CÓ ảnh hay không; ảnh lấy riêng ở /thu-tien/:id/anh.
        `SELECT tt.id, tt.loai, tt.khoan, tt.so_tien, tt.ngay_thu, tt.hinh_thuc, tt.chung_tu,
                tt.ghi_chu, tt.created_at, (tt.anh IS NOT NULL) AS co_anh,
                u.name AS nguoi_thu_ten
           FROM du_hoc_thu_tien tt LEFT JOIN users u ON u.id = tt.nguoi_thu_id
          WHERE tt.ho_so_id = ? ORDER BY tt.ngay_thu DESC, tt.id DESC`, [hs.id]),
      pool.query(
        `SELECT ls.*, u.name AS nguoi_ten
           FROM du_hoc_lich_su ls LEFT JOIN users u ON u.id = ls.nguoi_id
          WHERE ls.ho_so_id = ? ORDER BY ls.created_at DESC, ls.id DESC LIMIT 100`, [hs.id]),
    ]);

    const anhGt = await anhTheoGiayTo(giayTo.map((g) => g.id));
    const daThu = thuTien.reduce((s, t) => s + (t.loai === 'hoan' ? -t.so_tien : t.so_tien), 0);

    // Hồ sơ đã gắn tài khoản học thì kèm luôn tình hình học tập — đó chính là lý do hai khu này
    // nằm trong cùng một hệ thống thay vì hai phần mềm rời.
    let hocTap = null;
    if (hs.user_id) {
      try {
        const [[u], [lop], [bt]] = await Promise.all([
          pool.query('SELECT id, name, email, level_label, points, streak, last_active FROM users WHERE id = ?', [hs.user_id]),
          pool.query(
            `SELECT c.id, c.name FROM class_enrollments ce JOIN classes c ON c.id = ce.class_id
              WHERE ce.user_id = ?`, [hs.user_id]),
          pool.query(
            `SELECT COUNT(*) AS so_bai, ROUND(AVG(score_percent)) AS diem_tb
               FROM exercise_results WHERE user_id = ?`, [hs.user_id]),
        ]);
        hocTap = { user: u[0] || null, lop, so_bai: bt[0]?.so_bai || 0, diem_tb: bt[0]?.diem_tb ?? null };
      } catch (e) {
        hocTap = null;   // thiếu bảng học tập không được làm hỏng cả trang hồ sơ
      }
    }

    res.json({
      ho_so: hs,
      giay_to: giayTo.map((g) => ({ ...g, anh: anhGt.get(g.id) || [] })),
      thu_tien: thuTien,
      lich_su: lichSu,
      tien: { tong_phi: hs.tong_phi, da_thu: daThu, con_thieu: Math.max(0, hs.tong_phi - daThu) },
      hoc_tap: hocTap,
      buoc: BUOC,
      loai_pv: LOAI_PV,
    });
  } catch (err) {
    console.error('Lỗi chi tiết hồ sơ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được hồ sơ.') });
  }
});

/**
 * Kiểm tài khoản học viên trước khi gắn vào hồ sơ. Trả chuỗi lỗi, hoặc null nếu hợp lệ.
 * Dùng cho CẢ tạo mới lẫn sửa — tách riêng vì bản đầu chỉ kiểm ở PUT, còn POST thì `user_id`
 * đi thẳng qua COT_SUA vào câu INSERT: tạo hồ sơ mới là gắn được học viên của trung tâm khác.
 */
async function loiGanHocVien(userId, req, hoSoHienTai = null) {
  const id = parseInt(userId, 10);
  if (!Number.isFinite(id)) return 'Tài khoản học viên không hợp lệ.';
  // Không dùng tsOrg ở đây: hàm đó nay kèm cả điều kiện `tu_van_id` của khu hồ sơ, mà câu này
  // chạy trên bảng `users`. Sale / quản lý hồ sơ chỉ gắn được tài khoản do CHÍNH MÌNH tạo —
  // nếu không, họ dò id để kéo học viên của đồng nghiệp vào hồ sơ mình.
  const [u] = await pool.query(
    `SELECT id, role, is_admin FROM users WHERE id = ?${req.locOrg ? ' AND org_id = ?' : ''}`
    + (req.nhanSuId ? ' AND created_by = ?' : ''),
    [id, ...(req.locOrg ? [req.orgId] : []), ...(req.nhanSuId ? [req.nhanSuId] : [])]
  );
  if (!u.length) return 'Tài khoản học viên không tồn tại trong phạm vi của bạn.';
  // Hồ sơ du học CHỈ dành cho học sinh — giáo viên / quản trị / sale / quản lý hồ sơ không được gắn.
  if (!laHocSinh(u[0])) return 'Tài khoản này là nhân sự (giáo viên / quản trị / sale), không gắn vào hồ sơ du học được.';
  // Học sinh nào đã duyệt cũng có sẵn hồ sơ TỰ SINH (du-hoc-tao-hs.js). Hồ sơ đó mà chưa ai đụng
  // tới thì nhường chỗ cho hồ sơ đang tạo / đang gắn — nếu không, "Tạo hồ sơ gắn tài khoản" và gắn
  // lại hồ sơ cũ luôn bị chặn vì "đã gắn với hồ sơ HS-xxxx". Hồ sơ có dữ liệu thì vẫn chặn như cũ.
  await xoaHoSoTuSinhChuaDung(id, hoSoHienTai);
  // Một tài khoản chỉ nên đứng sau MỘT hồ sơ: hai hồ sơ cùng trỏ một người thì tiền và tiến độ
  // của em đó nằm rải hai chỗ, không ai biết chỗ nào là thật.
  const [h] = await pool.query(
    `SELECT id, ma_hs, ho_ten FROM du_hoc_ho_so WHERE user_id = ?${hoSoHienTai ? ' AND id <> ?' : ''} LIMIT 1`,
    hoSoHienTai ? [id, hoSoHienTai] : [id]
  );
  if (h.length) return `Tài khoản này đã gắn với hồ sơ ${h[0].ma_hs} (${h[0].ho_ten}).`;
  return null;
}

// =============================================================
// TẠO HỒ SƠ
// =============================================================
router.post('/du-hoc/ho-so', async (req, res) => {
  const hoTen = String(req.body?.ho_ten || '').trim();
  if (!hoTen) return res.status(400).json({ error: 'Chưa nhập họ tên học sinh.' });

  const orgId = req.laAdminNenTang ? (parseInt(req.body?.org_id, 10) || req.orgId) : req.orgId;

  if (req.body?.user_id) {
    const loi = await loiGanHocVien(req.body.user_id, req);
    if (loi) return res.status(400).json({ error: loi });
  }

  const { cot, gt } = locThanHoSo({ ...req.body, ho_ten: hoTen }, req);

  // Mã hồ sơ: người dùng tự nhập, hoặc tự sinh HS-0001 theo từng tổ chức. Sinh bằng "lấy số lớn
  // nhất rồi +1, trùng thì thử tiếp" thay vì khoá bảng — hai người tạo cùng lúc thì lần thứ hai
  // đụng UNIQUE(org_id, ma_hs) và tự lùi một nhịp.
  const maNhap = String(req.body?.ma_hs || '').trim().slice(0, 30);

  try {
    let so = 0;
    if (!maNhap) {
      const [m] = await pool.query(
        `SELECT COALESCE(MAX(CAST(SUBSTRING(ma_hs, 4) AS UNSIGNED)), 0) AS n
           FROM du_hoc_ho_so WHERE org_id = ? AND ma_hs REGEXP '^HS-[0-9]+$'`,
        [orgId]
      );
      so = Number(m[0]?.n || 0);
    }

    let id = null;
    let maCuoi = maNhap;
    for (let lan = 0; lan < 6; lan++) {
      const ma = maNhap || `HS-${String(so + 1 + lan).padStart(4, '0')}`;
      try {
        const [r] = await pool.query(
          `INSERT INTO du_hoc_ho_so (org_id, ma_hs, buoc, buoc_tu${cot.length ? ', ' + cot.join(', ') : ''})
           VALUES (?, ?, 'ho-so', CURDATE()${cot.length ? ', ' + cot.map(() => '?').join(', ') : ''})`,
          [orgId, ma, ...gt]
        );
        id = r.insertId;
        maCuoi = ma;
        break;
      } catch (e) {
        if (e.code !== 'ER_DUP_ENTRY') throw e;
        if (maNhap) return res.status(400).json({ error: `Mã hồ sơ "${maNhap}" đã tồn tại.` });
      }
    }
    if (!id) return res.status(500).json({ error: 'Không sinh được mã hồ sơ, thử lại giúp.' });

    // Checklist giấy tờ mặc định. Một câu INSERT nhiều hàng.
    await chenGiayToMacDinh(id);

    await ghiNhatKy(id, 'he-thong', `Tạo hồ sơ ${maCuoi}`, req.userId, null, 'ho-so');
    res.status(201).json({ id, ma_hs: maCuoi, message: 'Đã tạo hồ sơ.' });
  } catch (err) {
    console.error('Lỗi tạo hồ sơ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tạo được hồ sơ.') });
  }
});

// =============================================================
// SỬA HỒ SƠ
// =============================================================
router.put('/du-hoc/ho-so/:id', async (req, res) => {
  try {
    const hs = await layHoSo(req.params.id, req);
    if (!hs) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });

    if ('ho_ten' in req.body && !String(req.body.ho_ten || '').trim()) {
      return res.status(400).json({ error: 'Họ tên không được để trống.' });
    }

    if (req.body.user_id) {
      const loi = await loiGanHocVien(req.body.user_id, req, hs.id);
      if (loi) return res.status(400).json({ error: loi });
    }

    const { cot, gt } = locThanHoSo(req.body, req);
    if (!cot.length) return res.json({ message: 'Không có gì thay đổi.' });

    await pool.query(
      `UPDATE du_hoc_ho_so SET ${cot.map((c) => `${c} = ?`).join(', ')} WHERE id = ?`,
      [...gt, hs.id]
    );

    // Chỉ ghi nhật ký cho những thay đổi CÓ Ý NGHĨA nghiệp vụ. Ghi mọi lần sửa một ô điện thoại
    // thì nhật ký ngập rác và không ai đọc nữa.
    const dangChu = {
      ngay_phong_van: 'ngày phỏng vấn trường', kq_phong_van: 'kết quả phỏng vấn trường',
      loai_phong_van: 'loại phỏng vấn',
      ngay_pv_vp: 'ngày phỏng vấn VP Đài Bắc', kq_pv_vp: 'kết quả phỏng vấn VP Đài Bắc',
      ngay_nop_visa: 'ngày nộp visa', kq_visa: 'kết quả visa',
      ngay_bay: 'ngày bay', tong_phi: 'tổng phí', tu_van_id: 'tư vấn viên phụ trách',
    };
    // So theo giá trị NGƯỜI DÙNG THẤY: cột DATE từ mysql2 về là Date object, còn giá trị mới là
    // chuỗi 'YYYY-MM-DD' — so String() hai thứ đó thì lần lưu nào cũng "đổi ngày", và học sinh
    // nhận lại thông báo "đã xếp lịch phỏng vấn / chốt lịch bay" mỗi khi ai đó bấm Lưu form.
    const doi = cot.filter((c, i) => dangChu[c] && giaTriSo(hs[c]) !== giaTriSo(gt[i]));
    if (doi.length) {
      await ghiNhatKy(hs.id, 'ghi-chu', `Cập nhật: ${doi.map((c) => dangChu[c]).join(', ')}`, req.userId);
    }

    // Đặt/đổi lịch mà học sinh không hay biết là lỗi nguy hiểm nhất của cả khu này — em bay
    // nhầm ngày thì không sửa được nữa. Nên mọi thay đổi MỐC đều bắn thông báo (chuông + email
    // nhắc hôm sau). So theo `moi(c)` chứ không theo `hs[c]`: giá trị mới nằm trong `gt`.
    const moi = (c) => gt[cot.indexOf(c)];
    const doiMoc = new Set(doi);
    if (hs.user_id) {
      if (doiMoc.has('ngay_phong_van') && moi('ngay_phong_van')) {
        await baoHocSinh(hs.id, hs.user_id, 'phong-van',
          'Trung tâm đã xếp lịch phỏng vấn trường',
          `Ngày phỏng vấn: ${ngayVi(moi('ngay_phong_van'))}. Bạn chuẩn bị hồ sơ và có mặt đúng giờ nhé.`,
          moi('ngay_phong_van'));
      }
      if (doiMoc.has('ngay_pv_vp') && moi('ngay_pv_vp')) {
        await baoHocSinh(hs.id, hs.user_id, 'phong-van',
          'Trung tâm đã xếp lịch phỏng vấn VP Đài Bắc',
          `Ngày phỏng vấn: ${ngayVi(moi('ngay_pv_vp'))}. Bạn chuẩn bị hồ sơ và có mặt đúng giờ nhé.`,
          moi('ngay_pv_vp'));
      }
      if (doiMoc.has('kq_pv_vp') && moi('kq_pv_vp') && moi('kq_pv_vp') !== 'cho') {
        await baoHocSinh(hs.id, hs.user_id, 'phong-van',
          moi('kq_pv_vp') === 'dau' ? 'Bạn đã ĐẬU phỏng vấn VP Đài Bắc' : 'Kết quả phỏng vấn VP Đài Bắc',
          moi('kq_pv_vp') === 'dau'
            ? 'Chúc mừng! Trung tâm sẽ hướng dẫn bước tiếp theo.'
            : 'Kết quả chưa như mong đợi. Liên hệ tư vấn viên để bàn phương án tiếp theo nhé.');
      }
      if (doiMoc.has('ngay_bay') && moi('ngay_bay')) {
        await baoHocSinh(hs.id, hs.user_id, 'bay',
          'Đã chốt lịch bay',
          `Ngày bay: ${ngayVi(moi('ngay_bay'))}${moi('chuyen_bay') || hs.chuyen_bay ? ' · Chuyến ' + (moi('chuyen_bay') || hs.chuyen_bay) : ''}.`,
          moi('ngay_bay'));
      }
      if (doiMoc.has('ngay_nop_visa') && moi('ngay_nop_visa')) {
        await baoHocSinh(hs.id, hs.user_id, 'visa',
          'Lịch nộp hồ sơ visa',
          `Ngày nộp visa: ${ngayVi(moi('ngay_nop_visa'))}.`, moi('ngay_nop_visa'));
      }
      if (doiMoc.has('kq_phong_van') && moi('kq_phong_van') && moi('kq_phong_van') !== 'cho') {
        await baoHocSinh(hs.id, hs.user_id, 'phong-van',
          moi('kq_phong_van') === 'dau' ? 'Bạn đã ĐẬU phỏng vấn' : 'Kết quả phỏng vấn',
          moi('kq_phong_van') === 'dau'
            ? `Chúc mừng! ${moi('truong_do') || hs.truong_do ? 'Trường: ' + (moi('truong_do') || hs.truong_do) + '. ' : ''}Trung tâm sẽ hướng dẫn bước tiếp theo.`
            : 'Kết quả chưa như mong đợi. Liên hệ tư vấn viên để bàn phương án tiếp theo nhé.');
      }
      if (doiMoc.has('kq_visa') && moi('kq_visa') && moi('kq_visa') !== 'cho') {
        await baoHocSinh(hs.id, hs.user_id, 'visa',
          moi('kq_visa') === 'dau' ? 'Visa đã được cấp' : 'Kết quả visa',
          moi('kq_visa') === 'dau' ? 'Visa của bạn đã được duyệt. Trung tâm sẽ chốt lịch bay.'
            : 'Hồ sơ visa chưa được duyệt. Liên hệ tư vấn viên để xử lý tiếp.');
      }
      // Ký túc xá: có kết quả, hoặc trung tâm vừa đặt hạn đăng ký.
      const ktxKq = cot.includes('ktx_kq') ? moi('ktx_kq') : undefined;
      if (ktxKq && ktxKq !== 'cho' && String(hs.ktx_kq ?? '') !== String(ktxKq)) {
        await baoHocSinh(hs.id, hs.user_id, 'ktx',
          ktxKq === 'duoc' ? 'Bạn đã được xếp ký túc xá' : 'Kết quả đăng ký ký túc xá',
          ktxKq === 'duoc' ? 'Trường đã xác nhận chỗ ở trong ký túc xá cho bạn.'
            : 'Lần này bạn chưa được xếp ký túc xá. Liên hệ tư vấn viên để tìm phương án thuê ngoài.');
      }
      const ktxHan = cot.includes('ktx_han') ? moi('ktx_han') : undefined;
      if (ktxHan && giaTriSo(hs.ktx_han) !== giaTriSo(ktxHan)) {
        await baoHocSinh(hs.id, hs.user_id, 'ktx', 'Hạn đăng ký ký túc xá',
          `Hạn đăng ký ký túc xá: ${ngayVi(ktxHan)}. Vào hồ sơ du học chọn nguyện vọng chỗ ở giúp trung tâm nhé.`, ktxHan);
      }
    }

    // Đậu đủ các buổi phỏng vấn cần có -> tự sang "Xin visa". Chỉ xét khi lần lưu này làm ĐỔI một
    // ô phỏng vấn — không phải chỉ "có gửi kèm": form sửa hồ sơ luôn gửi mọi ô, nên hồ sơ vừa được
    // kéo lùi về "Phỏng vấn" để phỏng vấn lại sẽ bị đẩy đi ngay khi ai đó sửa số điện thoại.
    const doiPv = cot.some((c, i) => COT_PV.includes(c) && giaTriSo(hs[c]) !== giaTriSo(gt[i]));
    const tuChuyen = doiPv ? await tuChuyenSauPhongVan(hs.id, req) : null;

    res.json({
      message: tuChuyen
        ? 'Đã lưu. Hồ sơ đậu đủ phỏng vấn nên đã tự chuyển sang bước "Xin visa".'
        : 'Đã lưu hồ sơ.',
      tu_chuyen_buoc: tuChuyen,
    });
  } catch (err) {
    console.error('Lỗi sửa hồ sơ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không lưu được hồ sơ.') });
  }
});

// =============================================================
// CHUYỂN BƯỚC
// =============================================================
// Cho chuyển tới/lùi TỰ DO có chủ ý: thực tế "Học" chạy song song với "Phỏng vấn"/"Xin visa", và
// em trượt visa phải quay lại làm hồ sơ. Ép tuần tự là trung tâm sẽ ghi sai bước cho khớp phần mềm.
router.post('/du-hoc/ho-so/:id/buoc', async (req, res) => {
  const buoc = String(req.body?.buoc || '');
  if (!MA_BUOC.has(buoc)) return res.status(400).json({ error: 'Bước không hợp lệ.' });
  try {
    const hs = await layHoSo(req.params.id, req);
    if (!hs) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });
    if (hs.buoc === buoc) return res.json({ message: 'Hồ sơ đã ở bước này.' });

    await pool.query('UPDATE du_hoc_ho_so SET buoc = ?, buoc_tu = CURDATE() WHERE id = ?', [buoc, hs.id]);
    const ten = (m) => BUOC.find((b) => b.ma === m)?.ten || m;
    await ghiNhatKy(
      hs.id, 'buoc',
      `${ten(hs.buoc)} → ${ten(buoc)}${req.body?.ly_do ? ' · ' + String(req.body.ly_do).slice(0, 400) : ''}`,
      req.userId, hs.buoc, buoc
    );
    if (hs.user_id) {
      await baoHocSinh(hs.id, hs.user_id, 'buoc', `Hồ sơ chuyển sang bước: ${ten(buoc)}`,
        `Hồ sơ du học của bạn vừa được chuyển từ "${ten(hs.buoc)}" sang "${ten(buoc)}".`);
    }
    res.json({ message: `Đã chuyển sang bước "${ten(buoc)}".` });
  } catch (err) {
    console.error('Lỗi chuyển bước du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không chuyển được bước.') });
  }
});

// =============================================================
// NHẬT KÝ CHĂM SÓC
// =============================================================
router.post('/du-hoc/ho-so/:id/ghi-chu', async (req, res) => {
  const noiDung = String(req.body?.noi_dung || '').trim();
  if (!noiDung) return res.status(400).json({ error: 'Chưa nhập nội dung.' });
  try {
    const hs = await layHoSo(req.params.id, req);
    if (!hs) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });
    await ghiNhatKy(hs.id, 'ghi-chu', noiDung, req.userId);
    // Có tương tác với hồ sơ thì nó không còn "bị bỏ quên" — chạm updated_at để danh sách xếp lại.
    await pool.query('UPDATE du_hoc_ho_so SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [hs.id]);
    res.status(201).json({ message: 'Đã ghi nhật ký.' });
  } catch (err) {
    console.error('Lỗi ghi nhật ký du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không ghi được nhật ký.') });
  }
});

// =============================================================
// SỔ THU TIỀN
// =============================================================
const KHOAN = ['dat-coc', 'phi-ho-so', 'hoc-phi', 'dich-thuat', 'phi-visa', 've-may-bay', 'khac'];
/**
 * Chứng từ ảnh: client đã nén xuống ~400KB (xem `tkNenAnh` / `dhNenAnh`), chặn ở đây để không ai
 * đẩy thẳng ảnh 16MB base64 vào DB. Thấp hơn mức 1,5MB của biên lai thanh toán có chủ ý: mỗi hồ
 * sơ du học có nhiều khoản thu, còn mỗi đơn thanh toán chỉ có một ảnh.
 */
const ANH_TOI_DA = 900_000;

/** Ảnh hợp lệ chưa. Trả chuỗi lỗi hoặc null. */
function loiAnh(anh) {
  if (anh === null || anh === undefined || anh === '') return null;   // không gửi ảnh là hợp lệ
  if (typeof anh !== 'string' || !anh.startsWith('data:image/')) return 'Chứng từ phải là tệp ảnh.';
  if (anh.length > ANH_TOI_DA) return 'Ảnh quá lớn — hãy chụp lại hoặc chọn ảnh nhỏ hơn.';
  return null;
}
const HINH_THUC = ['tien-mat', 'chuyen-khoan', 'the', 'khac'];

router.post('/du-hoc/ho-so/:id/thu-tien', async (req, res) => {
  const soTien = parseInt(req.body?.so_tien, 10);
  if (!Number.isFinite(soTien) || soTien <= 0) {
    // Khoản hoàn tiền đi bằng loai='hoan' với số DƯƠNG, không phải bằng số âm — số âm trông
    // giống lỗi nhập liệu và làm mọi câu SUM phải nhớ xét dấu.
    return res.status(400).json({ error: 'Số tiền phải lớn hơn 0.' });
  }
  const ngay = String(req.body?.ngay_thu || '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ngay)) return res.status(400).json({ error: 'Ngày thu không hợp lệ.' });

  const loai = req.body?.loai === 'hoan' ? 'hoan' : 'thu';
  const khoan = KHOAN.includes(req.body?.khoan) ? req.body.khoan : 'khac';
  const hinhThuc = HINH_THUC.includes(req.body?.hinh_thuc) ? req.body.hinh_thuc : 'tien-mat';

  const anh = req.body?.anh || null;
  const loiA = loiAnh(anh);
  if (loiA) return res.status(anh && anh.length > ANH_TOI_DA ? 413 : 400).json({ error: loiA });

  try {
    const hs = await layHoSo(req.params.id, req);
    if (!hs) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });

    await pool.query(
      `INSERT INTO du_hoc_thu_tien (ho_so_id, loai, khoan, so_tien, ngay_thu, hinh_thuc, chung_tu, nguoi_thu_id, ghi_chu, anh, anh_luc)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [hs.id, loai, khoan, soTien, ngay, hinhThuc,
       String(req.body?.chung_tu || '').trim().slice(0, 60) || null, req.userId,
       String(req.body?.ghi_chu || '').trim().slice(0, 500) || null,
       anh || null, anh ? new Date() : null]
    );
    await pool.query('UPDATE du_hoc_ho_so SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [hs.id]);
    await ghiNhatKy(
      hs.id, 'tien',
      `${loai === 'hoan' ? 'Hoàn' : 'Thu'} ${soTien.toLocaleString('vi-VN')}đ (${khoan})`,
      req.userId
    );
    if (hs.user_id) {
      await baoHocSinh(hs.id, hs.user_id, 'nhac-tien',
        loai === 'hoan' ? 'Trung tâm đã hoàn tiền' : 'Đã ghi nhận khoản bạn đóng',
        `${loai === 'hoan' ? 'Hoàn' : 'Thu'} ${soTien.toLocaleString('vi-VN')}đ · ${ngayVi(ngay)}. Xem chi tiết ở mục Hồ sơ du học.`);
    }
    res.status(201).json({ message: loai === 'hoan' ? 'Đã ghi khoản hoàn.' : 'Đã ghi khoản thu.' });
  } catch (err) {
    console.error('Lỗi ghi thu tiền du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không ghi được khoản thu.') });
  }
});

router.delete('/du-hoc/thu-tien/:id', async (req, res) => {
  try {
    // JOIN sang hồ sơ ngay trong câu SELECT để kiểm tổ chức — không tra hai bước rồi tự so.
    const [r] = await pool.query(
      `SELECT tt.id, tt.ho_so_id, tt.so_tien, tt.loai
         FROM du_hoc_thu_tien tt JOIN du_hoc_ho_so h ON h.id = tt.ho_so_id
        WHERE tt.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy khoản thu.' });

    await pool.query('DELETE FROM du_hoc_thu_tien WHERE id = ?', [r[0].id]);
    await ghiNhatKy(
      r[0].ho_so_id, 'tien',
      `Xoá khoản ${r[0].loai === 'hoan' ? 'hoàn' : 'thu'} ${Number(r[0].so_tien).toLocaleString('vi-VN')}đ`,
      req.userId
    );
    res.json({ message: 'Đã xoá khoản thu.' });
  } catch (err) {
    console.error('Lỗi xoá thu tiền du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không xoá được khoản thu.') });
  }
});

// ------------------------------------------------------------------ chứng từ ảnh
/**
 * Ảnh chứng từ của MỘT khoản thu. Endpoint riêng có chủ ý — danh sách khoản thu chỉ trả cờ
 * `co_anh`, ảnh chỉ tải khi người dùng thật sự bấm xem.
 */
router.get('/du-hoc/thu-tien/:id/anh', async (req, res) => {
  try {
    const [r] = await pool.query(
      `SELECT tt.anh FROM du_hoc_thu_tien tt JOIN du_hoc_ho_so h ON h.id = tt.ho_so_id
        WHERE tt.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length || !r[0].anh) return res.status(404).json({ error: 'Khoản thu này chưa có ảnh chứng từ.' });
    res.json({ anh: r[0].anh });
  } catch (err) {
    console.error('Lỗi xem ảnh chứng từ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được ảnh.') });
  }
});

/** Bổ sung / thay ảnh chứng từ cho khoản thu đã ghi (chụp lại cho rõ hơn, hoặc lúc ghi chưa có). */
router.put('/du-hoc/thu-tien/:id/anh', async (req, res) => {
  const anh = req.body?.anh;
  // Gửi chuỗi rỗng = GỠ ảnh. Cố ý cho phép: nhân viên tải nhầm ảnh của hồ sơ khác thì phải gỡ
  // được ngay, không đợi xoá cả khoản thu.
  const go = anh === '' || anh === null;
  if (!go) {
    const loiA = loiAnh(anh);
    if (loiA) return res.status(anh && anh.length > ANH_TOI_DA ? 413 : 400).json({ error: loiA });
  }
  try {
    const [r] = await pool.query(
      `SELECT tt.id, tt.ho_so_id FROM du_hoc_thu_tien tt JOIN du_hoc_ho_so h ON h.id = tt.ho_so_id
        WHERE tt.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy khoản thu.' });

    await pool.query(
      'UPDATE du_hoc_thu_tien SET anh = ?, anh_luc = ? WHERE id = ?',
      [go ? null : anh, go ? null : new Date(), r[0].id]
    );
    res.json({ message: go ? 'Đã gỡ ảnh chứng từ.' : 'Đã lưu ảnh chứng từ.' });
  } catch (err) {
    console.error('Lỗi lưu ảnh chứng từ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không lưu được ảnh.') });
  }
});

// =============================================================
// YÊU CẦU SỬA của học sinh — hàng chờ duyệt
// =============================================================
// Học sinh gửi khai báo xong là hồ sơ KHOÁ (CLAUDE.md — cổng học sinh). Muốn sửa thì gửi yêu cầu
// qua đây, và CHỈ khi được duyệt mới ghi vào `du_hoc_ho_so`. Không cho sửa thẳng vì tư vấn viên
// đang làm hồ sơ mà dữ liệu đổi dưới tay là hỏng việc thật.

/** Danh sách yêu cầu chờ duyệt của cả trung tâm — chuông việc cần làm của quản trị. */
router.get('/du-hoc/yeu-cau-sua', async (req, res) => {
  const trangThai = ['cho', 'duyet', 'tu-choi'].includes(req.query.trang_thai) ? req.query.trang_thai : 'cho';
  try {
    const [rows] = await pool.query(
      `SELECT y.id, y.ho_so_id, y.thay_doi, y.ly_do, y.trang_thai, y.phan_hoi,
              y.created_at, y.duyet_luc,
              h.ma_hs, h.ho_ten, u.name AS nguoi_duyet_ten
         FROM du_hoc_yeu_cau_sua y
         JOIN du_hoc_ho_so h ON h.id = y.ho_so_id
         LEFT JOIN users u ON u.id = y.nguoi_duyet_id
        WHERE y.trang_thai = ?${dkOrg(req)}
        ORDER BY y.created_at DESC LIMIT 100`,
      [trangThai, ...tsOrg(req)]
    );
    res.json({
      items: rows.map((r) => ({ ...r, thay_doi: JSON.parse(r.thay_doi || '[]') })),
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ items: [], chua_migration: true });
    console.error('Lỗi danh sách yêu cầu sửa du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được danh sách.') });
  }
});

/**
 * Duyệt: áp thay đổi vào hồ sơ.
 *
 * Chạy trong GIAO DỊCH và `trang_thai = 'cho'` nằm ngay trong câu UPDATE — hai người cùng bấm
 * duyệt thì lần thứ hai đổi 0 dòng và bị chặn, thay vì áp thay đổi hai lần (cùng khoá chống
 * duyệt trùng với thanh toán ở 4.42).
 */
router.post('/du-hoc/yeu-cau-sua/:id/duyet', async (req, res) => {
  const con = await pool.getConnection();
  try {
    const [r] = await con.query(
      `SELECT y.*, h.user_id, h.ma_hs FROM du_hoc_yeu_cau_sua y
         JOIN du_hoc_ho_so h ON h.id = y.ho_so_id
        WHERE y.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) { con.release(); return res.status(404).json({ error: 'Không tìm thấy yêu cầu.' }); }
    const yc = r[0];
    if (yc.trang_thai !== 'cho') { con.release(); return res.status(409).json({ error: 'Yêu cầu này đã được xử lý.' }); }

    const thayDoi = JSON.parse(yc.thay_doi || '[]');
    // Chỉ áp những cột NẰM TRONG danh sách trắng của chính route này. Yêu cầu sửa là dữ liệu do
    // client sinh ra — tin thẳng vào `cot` trong đó là mở đường ghi vào bất kỳ cột nào.
    const apDung = thayDoi.filter((t) => t && COT_SUA.includes(t.cot));

    await con.beginTransaction();
    const [u] = await con.query(
      "UPDATE du_hoc_yeu_cau_sua SET trang_thai = 'duyet', nguoi_duyet_id = ?, duyet_luc = NOW(), phan_hoi = ? WHERE id = ? AND trang_thai = 'cho'",
      [req.userId, String(req.body?.phan_hoi || '').trim().slice(0, 500) || null, yc.id]
    );
    if (!u.affectedRows) { await con.rollback(); con.release(); return res.status(409).json({ error: 'Yêu cầu này vừa được người khác xử lý.' }); }

    if (apDung.length) {
      const cot = apDung.map((t) => t.cot);
      const gt = apDung.map((t) => chuanGiaTri(t.cot, t.moi));
      await con.query(
        `UPDATE du_hoc_ho_so SET ${cot.map((c) => `${c} = ?`).join(', ')} WHERE id = ?`,
        [...gt, yc.ho_so_id]
      );
    }
    await con.commit();
    con.release();

    await ghiNhatKy(yc.ho_so_id, 'ghi-chu',
      `Duyệt yêu cầu sửa của học sinh: ${apDung.map((t) => t.nhan || t.cot).join(', ')}`, req.userId);
    if (yc.user_id) {
      await baoHocSinh(yc.ho_so_id, yc.user_id, 'sua-duyet', 'Yêu cầu sửa hồ sơ đã được duyệt',
        `Trung tâm đã cập nhật: ${apDung.map((t) => t.nhan || t.cot).join(', ')}.`);
    }
    res.json({ message: `Đã duyệt và cập nhật ${apDung.length} mục.` });
  } catch (err) {
    try { await con.rollback(); } catch { /* đã rollback hoặc chưa mở giao dịch */ }
    con.release();
    console.error('Lỗi duyệt yêu cầu sửa du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không duyệt được yêu cầu.') });
  }
});

/** Từ chối. BẮT BUỘC có lý do — không thì học sinh gửi lại y hệt và cả hai bên cùng mất thời gian. */
router.post('/du-hoc/yeu-cau-sua/:id/tu-choi', async (req, res) => {
  const phanHoi = String(req.body?.phan_hoi || '').trim().slice(0, 500);
  if (!phanHoi) return res.status(400).json({ error: 'Nhập lý do từ chối để học sinh biết cần sửa gì.' });
  try {
    const [r] = await pool.query(
      `SELECT y.id, y.ho_so_id, y.trang_thai, h.user_id FROM du_hoc_yeu_cau_sua y
         JOIN du_hoc_ho_so h ON h.id = y.ho_so_id
        WHERE y.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy yêu cầu.' });
    if (r[0].trang_thai !== 'cho') return res.status(409).json({ error: 'Yêu cầu này đã được xử lý.' });

    const [u] = await pool.query(
      "UPDATE du_hoc_yeu_cau_sua SET trang_thai = 'tu-choi', nguoi_duyet_id = ?, duyet_luc = NOW(), phan_hoi = ? WHERE id = ? AND trang_thai = 'cho'",
      [req.userId, phanHoi, r[0].id]
    );
    if (!u.affectedRows) return res.status(409).json({ error: 'Yêu cầu này vừa được người khác xử lý.' });

    if (r[0].user_id) {
      await baoHocSinh(r[0].ho_so_id, r[0].user_id, 'sua-tu-choi', 'Yêu cầu sửa hồ sơ chưa được duyệt', phanHoi);
    }
    res.json({ message: 'Đã từ chối yêu cầu.' });
  } catch (err) {
    console.error('Lỗi từ chối yêu cầu sửa du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không xử lý được yêu cầu.') });
  }
});

// =============================================================
// CHECKLIST GIẤY TỜ
// =============================================================
const TT_GIAY_TO = ['chua', 'nhan', 'dich', 'nop', 'khong-can'];

router.put('/du-hoc/giay-to/:id', async (req, res) => {
  const tt = req.body?.trang_thai;
  if (tt !== undefined && !TT_GIAY_TO.includes(tt)) {
    return res.status(400).json({ error: 'Trạng thái giấy tờ không hợp lệ.' });
  }
  try {
    const [r] = await pool.query(
      `SELECT g.id, g.ho_so_id, g.ten, g.trang_thai
         FROM du_hoc_giay_to g JOIN du_hoc_ho_so h ON h.id = g.ho_so_id
        WHERE g.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy mục giấy tờ.' });

    const cot = [];
    const gt = [];
    if (tt !== undefined) {
      cot.push('trang_thai'); gt.push(tt);
      // Tick "đã nhận" mà chưa ghi ngày thì lấy hôm nay; gỡ về "chưa" thì xoá ngày, nếu không
      // hồ sơ hiện "chưa nhận" mà vẫn kèm một ngày nhận cũ.
      if (tt === 'chua') { cot.push('ngay_nhan'); gt.push(null); }
      else if (r[0].trang_thai === 'chua' && !('ngay_nhan' in req.body)) { cot.push('ngay_nhan'); gt.push(new Date().toISOString().slice(0, 10)); }
    }
    if ('ghi_chu' in req.body) { cot.push('ghi_chu'); gt.push(String(req.body.ghi_chu || '').trim().slice(0, 300) || null); }
    if ('ngay_nhan' in req.body) {
      const d = String(req.body.ngay_nhan || '').slice(0, 10);
      cot.push('ngay_nhan'); gt.push(/^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null);
    }
    if (!cot.length) return res.json({ message: 'Không có gì thay đổi.' });

    await pool.query(`UPDATE du_hoc_giay_to SET ${cot.map((c) => `${c} = ?`).join(', ')} WHERE id = ?`, [...gt, r[0].id]);
    await pool.query('UPDATE du_hoc_ho_so SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [r[0].ho_so_id]);
    res.json({ message: 'Đã cập nhật.' });
  } catch (err) {
    console.error('Lỗi cập nhật giấy tờ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không cập nhật được giấy tờ.') });
  }
});

router.post('/du-hoc/ho-so/:id/giay-to', async (req, res) => {
  const ten = String(req.body?.ten || '').trim().slice(0, 150);
  if (!ten) return res.status(400).json({ error: 'Chưa nhập tên giấy tờ.' });
  try {
    const hs = await layHoSo(req.params.id, req);
    if (!hs) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });
    const [m] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) AS n FROM du_hoc_giay_to WHERE ho_so_id = ?', [hs.id]);
    const [r] = await pool.query(
      'INSERT INTO du_hoc_giay_to (ho_so_id, ten, bat_buoc, sort_order) VALUES (?, ?, ?, ?)',
      [hs.id, ten, req.body?.bat_buoc !== false, Number(m[0].n) + 10]
    );
    res.status(201).json({ id: r.insertId, message: 'Đã thêm giấy tờ.' });
  } catch (err) {
    console.error('Lỗi thêm giấy tờ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không thêm được giấy tờ.') });
  }
});

// --- ảnh đính kèm giấy tờ (2026-10-08) ---
// Chỉ mục có `so_anh_toi_da` > 0 (Ảnh thẻ, Ảnh CCCD) nhận ảnh. Logic dùng chung với cổng học sinh
// nằm ở utils/du-hoc-giay-to-anh.js; ở đây chỉ kiểm quyền theo phạm vi hồ sơ (dkOrg).
router.post('/du-hoc/giay-to/:id/anh', async (req, res) => {
  const anh = req.body?.anh;
  const loiA = loiAnhGiayTo(anh);
  if (loiA) return res.status(anh && anh.length > ANH_GIAY_TO_TOI_DA ? 413 : 400).json({ error: loiA });
  try {
    const [r] = await pool.query(
      `SELECT g.id, g.ho_so_id, g.trang_thai, g.so_anh_toi_da
         FROM du_hoc_giay_to g JOIN du_hoc_ho_so h ON h.id = g.ho_so_id
        WHERE g.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy mục giấy tờ.' });
    if (!r[0].so_anh_toi_da) return res.status(400).json({ error: 'Mục giấy tờ này không nhận ảnh tải lên.' });

    const kq = await themAnhGiayTo(r[0], anh, req.userId);
    if (!kq.ok) {
      return res.status(409).json({ error: `Mục này chỉ nhận tối đa ${r[0].so_anh_toi_da} ảnh — hãy xoá bớt ảnh cũ trước.` });
    }
    res.status(201).json({ id: kq.id, message: 'Đã lưu ảnh.' });
  } catch (err) {
    console.error('Lỗi tải ảnh giấy tờ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không lưu được ảnh.') });
  }
});

router.get('/du-hoc/giay-to-anh/:id', async (req, res) => {
  try {
    const [r] = await pool.query(
      `SELECT a.anh FROM du_hoc_giay_to_anh a
         JOIN du_hoc_giay_to g ON g.id = a.giay_to_id JOIN du_hoc_ho_so h ON h.id = g.ho_so_id
        WHERE a.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
    res.json({ anh: r[0].anh });
  } catch (err) {
    console.error('Lỗi xem ảnh giấy tờ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không tải được ảnh.') });
  }
});

router.delete('/du-hoc/giay-to-anh/:id', async (req, res) => {
  try {
    const [r] = await pool.query(
      `SELECT a.id, g.ho_so_id FROM du_hoc_giay_to_anh a
         JOIN du_hoc_giay_to g ON g.id = a.giay_to_id JOIN du_hoc_ho_so h ON h.id = g.ho_so_id
        WHERE a.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
    await pool.query('DELETE FROM du_hoc_giay_to_anh WHERE id = ?', [r[0].id]);
    await pool.query('UPDATE du_hoc_ho_so SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [r[0].ho_so_id]);
    res.json({ message: 'Đã xoá ảnh.' });
  } catch (err) {
    console.error('Lỗi xoá ảnh giấy tờ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không xoá được ảnh.') });
  }
});

router.delete('/du-hoc/giay-to/:id', async (req, res) => {
  try {
    const [r] = await pool.query(
      `SELECT g.id FROM du_hoc_giay_to g JOIN du_hoc_ho_so h ON h.id = g.ho_so_id
        WHERE g.id = ?${dkOrg(req)}`,
      [req.params.id, ...tsOrg(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy mục giấy tờ.' });
    await pool.query('DELETE FROM du_hoc_giay_to WHERE id = ?', [r[0].id]);
    res.json({ message: 'Đã xoá.' });
  } catch (err) {
    console.error('Lỗi xoá giấy tờ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không xoá được giấy tờ.') });
  }
});

// =============================================================
// XOÁ HỒ SƠ
// =============================================================
router.delete('/du-hoc/ho-so/:id', async (req, res) => {
  try {
    const hs = await layHoSo(req.params.id, req);
    if (!hs) return res.status(404).json({ error: 'Không tìm thấy hồ sơ.' });
    // Xoá kéo theo nhật ký, sổ thu và checklist (ON DELETE CASCADE). Học sinh bỏ ngang thì nên
    // chuyển bước sang 'huy' để giữ lại lịch sử và số tiền đã thu; giao diện nói rõ điều đó.
    await pool.query('DELETE FROM du_hoc_ho_so WHERE id = ?', [hs.id]);
    res.json({ message: `Đã xoá hồ sơ ${hs.ma_hs}.` });
  } catch (err) {
    console.error('Lỗi xoá hồ sơ du học:', err);
    res.status(500).json({ error: loiBang(err, 'Không xoá được hồ sơ.') });
  }
});

// =============================================================
// DANH SÁCH PHỤ CHO FORM
// =============================================================
/** Nhân sự trong tổ chức, để gán tư vấn viên phụ trách. */
router.get('/du-hoc/nhan-su', async (req, res) => {
  try {
    // Tư vấn viên phụ trách hồ sơ nay gồm cả quản lý hồ sơ và sale. Người đang gọi là sale
    // thì danh sách chỉ có chính họ: ô "tư vấn viên" của họ không phải chỗ để chọn người khác.
    const dk = ["role IN ('admin','ho_so','sale','teacher')"];
    const ts = [];
    if (req.locOrg) { dk.push('org_id = ?'); ts.push(req.orgId); }
    if (req.nhanSuId) { dk.push('id = ?'); ts.push(req.nhanSuId); }
    const [rows] = await pool.query(
      `SELECT id, name, email, role FROM users
        WHERE ${dk.join(' AND ')}
        ORDER BY name LIMIT 200`,
      ts
    );
    res.json({ nhan_su: rows });
  } catch (err) {
    console.error('Lỗi danh sách nhân sự:', err);
    res.status(500).json({ error: 'Không tải được danh sách nhân sự.' });
  }
});

/** Tìm tài khoản học viên trong tổ chức để gắn vào hồ sơ. */
router.get('/du-hoc/hoc-vien', async (req, res) => {
  const tim = String(req.query.tim || '').trim();
  try {
    const dk = [SQL_LA_HOC_SINH];
    const ts = [];
    if (req.locOrg) { dk.push('u.org_id = ?'); ts.push(req.orgId); }
    if (req.nhanSuId) { dk.push('u.created_by = ?'); ts.push(req.nhanSuId); }
    if (tim) {
      dk.push('(u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)');
      const q = `%${tim}%`;
      ts.push(q, q, q);
    }
    // Hồ sơ TỰ SINH chưa ai đụng tới không tính là "đã có": gắn vào là nó tự nhường chỗ (loiGanHocVien).
    // Người CHƯA có hồ sơ xếp trước: đó mới là nhóm chọn được, để lẫn xuống dưới thì phải cuộn
    // qua một loạt mục xám mới thấy. `u.id DESC` chứ không phải `created_at DESC` — hàng loạt tài
    // khoản tạo trong cùng một giây có created_at bằng nhau, thứ tự khi đó không xác định.
    // Chưa gõ gì thì vẫn LIỆT KÊ (20 tài khoản mới nhất) — người dùng cần thấy có những ai để
    // chọn, chứ không phải đoán tên rồi mới gõ. Trả kèm mã hồ sơ đã có để giao diện chặn chọn
    // trùng ngay trên danh sách thay vì để họ bấm rồi mới nhận lỗi.
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.phone,
              (SELECT h.ma_hs FROM du_hoc_ho_so h WHERE h.user_id = u.id
                  AND NOT ${sqlTuSinhChuaDung('h', { ktx: false })} LIMIT 1) AS ho_so_ma
         FROM users u
        WHERE ${dk.join(' AND ')}
        ORDER BY ho_so_ma IS NOT NULL, ${tim ? 'u.name' : 'u.id DESC'} LIMIT 20`,
      ts
    );
    res.json({ hoc_vien: rows });
  } catch (err) {
    console.error('Lỗi tìm học viên:', err);
    res.status(500).json({ error: 'Không tìm được học viên.' });
  }
});

export default router;
