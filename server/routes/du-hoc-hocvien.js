// =============================================================
// DU HỌC — CỔNG HỌC SINH  (2026-09-16)
// =============================================================
// Mount ở /api/du-hoc. Chỉ `requireAuth`; MỌI truy vấn lọc `user_id = req.userId` ngay trong
// câu SELECT — không tra hồ sơ rồi tự so ở tầng JS.
//
// TÁCH KHỎI routes/du-hoc.js có chủ ý, không phải cho gọn file: du-hoc.js đi qua
// `requireStaff + phamViQuanTri + requireOrgAdmin`, còn đây là học viên thường. Nhét route học
// viên vào router đó rồi tự kiểm vai trò bằng tay chính là cách lỗi phân quyền đã lọt vào một
// lần (CLAUDE.md 4.22 — 3 route chấm bài dịch nằm nhầm router).
//
// HỌC SINH ĐƯỢC LÀM GÌ:
//   · khai thông tin cá nhân / học vấn / nguyện vọng / ký túc xá — CHỈ khi chưa gửi
//   · gửi chốt (khoá form), sau đó muốn sửa thì gửi yêu cầu cho trung tâm duyệt
//   · XEM: bước hiện tại, mốc phỏng vấn/visa/bay, tiền đã đóng, còn thiếu giấy tờ gì, tư vấn viên
//
// HỌC SINH CHỌN ĐƯỢC NGƯỜI TƯ VẤN (2026-10-07): `tu_van_id`, nhưng CHỈ trong số tài khoản role 'sale'
// (hoặc người đang phụ trách sẵn) — kiểm ở server trong `idTuVanHopLe`, không tin client.
//
// HỌC SINH KHÔNG ĐƯỢC ĐỤNG: `tong_phi`, `buoc`, mọi cột kết quả (`kq_*`), `ma_hs`,
// `org_id`, `user_id`, `ghi_chu` (ghi chú nội bộ của tư vấn viên), `ktx_kq`, `ktx_han`.
// Danh sách trắng nằm ở COT_HS bên dưới — thêm cột mới vào hồ sơ thì phải tự hỏi: học sinh có
// được khai cột này không? Mặc định là KHÔNG.
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { BUOC } from './du-hoc.js';
import { chuoiHe } from '../../shared/he-du-hoc.js';
import { baoHocSinh, chuaCoBangTb, LOAI_TB } from '../utils/du-hoc-thong-bao.js';
import { guiPush, guiPushVaiTro, guiNgam } from '../utils/push.js';
import { taoHoSoDuHocChoHocVien, SQL_LA_HOC_SINH_HOAC_ADMIN } from '../utils/du-hoc-tao-hs.js';

const router = Router();
router.use(requireAuth);

// ------------------------------------------------------------------ danh sách trắng

/**
 * Cột học sinh được tự khai, kèm NHÃN tiếng Việt.
 * Nhãn không chỉ để hiện form — nó còn là thứ người duyệt yêu cầu sửa đọc được ("Số hộ chiếu:
 * C1234567 → C7654321"). Nên giữ nhãn ở một chỗ duy nhất này.
 */
// Bộ ô theo MẪU KHÁCH chốt ngày 2026-10-03 (đúng thứ tự 1 → 13 + quá trình làm việc). Các cột
// cũ (giới tính, người bảo lãnh, nguyện vọng trường, kỳ nhập học, KTX…) vẫn còn trong DB nhưng
// học sinh KHÔNG khai nữa — bỏ khỏi đây là server tự chặn, không chỉ ẩn ở giao diện.
const COT_HS = {
  ho_ten: 'Họ tên tiếng Việt',
  ten_trung: 'Họ tên tiếng Trung',
  ngay_sinh: 'Ngày tháng năm sinh',
  cccd: 'Số CCCD',
  ho_chieu: 'Số hộ chiếu',
  dia_chi: 'Địa chỉ theo hộ khẩu',

  diem_lop10: 'Điểm tổng kết lớp 10',
  diem_lop11: 'Điểm tổng kết lớp 11',
  diem_lop12: 'Điểm tổng kết lớp 12',
  truong_tn: 'Tên trường cấp 3',

  trinh_do_tieng: 'Chứng chỉ ngoại ngữ',

  email: 'Email liên lạc',
  phone: 'Số điện thoại',

  bo_ten: 'Họ tên bố',
  bo_cccd: 'Số CCCD của bố',
  bo_ngay_sinh: 'Ngày sinh của bố',
  bo_nghe: 'Nghề nghiệp của bố',
  bo_phone: 'Số điện thoại của bố',

  me_ten: 'Họ tên mẹ',
  me_cccd: 'Số CCCD của mẹ',
  me_ngay_sinh: 'Ngày sinh của mẹ',
  me_nghe: 'Nghề nghiệp của mẹ',
  me_phone: 'Số điện thoại của mẹ',

  // Mục Nguyện vọng (2026-10-06): Hệ (chọn tối đa 2) -> Ngành -> 3 trường. Ô "Đăng ký chuyên ngành"
  // cũ được gộp vào đây và đổi nhãn; cột `nganh` giữ nguyên nên dữ liệu đã nhập không mất.
  he_nguyen_vong: 'Hệ nguyện vọng',
  nganh: 'Ngành nguyện vọng',

  qua_trinh_lam_viec: 'Quá trình làm việc từ khi tốt nghiệp đến nay',

  // Thêm lại theo yêu cầu 2026-10-03: nguyện vọng trường + đăng ký ký túc xá.
  truong_nv1: 'Trường nguyện vọng 1',
  truong_nv2: 'Trường nguyện vọng 2',
  truong_nv3: 'Trường nguyện vọng 3',
  ktx_dang_ky: 'Đăng ký ký túc xá',
  // Người tư vấn (2026-10-07): chọn trong danh sách nhân viên sale. Đây là CỘT SỐ (id), không phải
  // chữ — chuanHoa kiểm id có nằm trong danh sách được chọn hay không.
  tu_van_id: 'Người tư vấn',
  // `ktx_loai` / `ktx_ghi_chu` đã bỏ khỏi form học sinh (2026-10-06) — xem NHAN_CU bên dưới.
};
const COT_NGAY = new Set(['ngay_sinh', 'bo_ngay_sinh', 'me_ngay_sinh']);
/**
 * Nhãn tiếng Việt của các cột ĐÃ BỎ khỏi form — CHỈ để hiển thị, học sinh không ghi được.
 * Tab trình duyệt mở từ trước lúc deploy vẫn chạy JS cũ và vẽ các ô này; không có nhãn thì nó
 * hiện nguyên tên cột ("lien_lac_khac") — khách đã gặp đúng lỗi này ngày 2026-10-03.
 */
const NHAN_CU = {
  gioi_tinh: 'Giới tính', ho_chieu_het_han: 'Ngày hết hạn hộ chiếu',
  lien_lac_khac: 'Liên lạc khác (Zalo/Facebook)',
  ph_ten: 'Họ tên người bảo lãnh', ph_phone: 'Số điện thoại người bảo lãnh',
  ph_quan_he: 'Quan hệ với người bảo lãnh',
  nam_tn: 'Năm tốt nghiệp', xep_loai: 'Xếp loại',
  ky_nhap_hoc: 'Kỳ nhập học', loai_hinh: 'Loại hình du học',
  ktx_loai: 'Loại phòng mong muốn', ktx_ghi_chu: 'Yêu cầu thêm về chỗ ở',
};
const ENUM_HS = { ktx_dang_ky: ['chua-quyet', 'co', 'khong'] };
/** Độ dài tối đa theo cột (khớp kiểu cột trong DB). Không có trong bảng thì 200. */
const DAI_TOI_DA = {
  dia_chi: 300, trinh_do_tieng: 255, qua_trinh_lam_viec: 2000, ktx_ghi_chu: 300, ktx_loai: 60,
  diem_lop10: 10, diem_lop11: 10, diem_lop12: 10,
  cccd: 20, bo_cccd: 20, me_cccd: 20, bo_phone: 20, me_phone: 20,
  ten_trung: 80, bo_ten: 120, me_ten: 120, bo_nghe: 120, me_nghe: 120,
  ho_ten: 120, ho_chieu: 20, phone: 30, he_nguyen_vong: 120,
};
/** Bốn ô tối thiểu phải có thì mới cho gửi — thiếu là trung tâm không làm được gì với hồ sơ. */
const BAT_BUOC = ['ho_ten', 'ngay_sinh', 'phone', 'nganh'];

const NHAN_KHOAN = {
  'dat-coc': 'Đặt cọc', 'phi-ho-so': 'Phí hồ sơ', 'hoc-phi': 'Học phí',
  'dich-thuat': 'Dịch thuật', 'phi-visa': 'Phí visa', 've-may-bay': 'Vé máy bay', khac: 'Khác',
};
const NHAN_GIAY_TO = {
  chua: 'Chưa nộp', nhan: 'Đã nộp', dich: 'Đã dịch công chứng', nop: 'Đã nộp trường', 'khong-can': 'Không cần',
};

// ------------------------------------------------------------------ helper

const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/** Hồ sơ của CHÍNH người đang gọi. `null` nếu không phải học sinh du học hoặc quản trị
 *  (giáo viên / sale / quản lý hồ sơ luôn null). Admin được vào để tự kiểm hồ sơ của mình. */
async function hoSoCuaToi(userId) {
  const [r] = await pool.query(
    `SELECT h.* FROM du_hoc_ho_so h JOIN users u ON u.id = h.user_id
      WHERE h.user_id = ? AND ${SQL_LA_HOC_SINH_HOAC_ADMIN} ORDER BY h.id LIMIT 1`,
    [userId]
  );
  return r[0] || null;
}

/** Chuẩn hoá một giá trị học sinh gửi lên theo đúng kiểu cột. Trả `undefined` nếu cột không hợp lệ. */
function chuanHoa(cot, gtRaw, tuVanHopLe) {
  if (!(cot in COT_HS)) return undefined;
  if (cot === 'tu_van_id') {
    if (gtRaw === null || gtRaw === undefined || String(gtRaw).trim() === '') return null;   // bỏ chọn
    const id = Number(gtRaw);
    // Id lạ (không phải sale, không phải người đang phụ trách) bị bỏ qua như cột không hợp lệ.
    return Number.isInteger(id) && tuVanHopLe?.has(id) ? id : undefined;
  }
  if (ENUM_HS[cot]) return ENUM_HS[cot].includes(gtRaw) ? gtRaw : undefined;
  // Hệ: lọc mã lạ, bỏ trùng, tối đa MAX_HE — client đã chặn nhưng server là nơi quyết định.
  if (cot === 'he_nguyen_vong') return chuoiHe(gtRaw);
  if (COT_NGAY.has(cot)) {
    const d = String(gtRaw || '').slice(0, 10);
    // Chuỗi rỗng phải thành NULL chứ không phải '' — MySQL ép '' thành 0000-00-00.
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
  }
  const s = String(gtRaw ?? '').trim();
  if (!s) return null;
  return s.slice(0, DAI_TOI_DA[cot] || 200);
}

/** Id nhân viên sale (role = 'sale'). Học sinh chỉ chọn người tư vấn trong danh sách này. */
async function danhSachSale(hs) {
  const [rows] = await pool.query(
    "SELECT id, name FROM users WHERE role = 'sale' OR id = ? ORDER BY name LIMIT 200",
    [hs.tu_van_id || 0]
  );
  return rows;
}
/** Tập id học sinh được phép đặt vào `tu_van_id`: mọi sale + người đang phụ trách hồ sơ này
 *  (có thể là quản lý hồ sơ do trung tâm gán — không được làm họ "biến mất" khỏi ô chọn). */
async function idTuVanHopLe(hs) {
  return new Set((await danhSachSale(hs)).map((u) => u.id));
}

/**
 * DATE từ mysql2 về là Date dựng lúc 00:00 GIỜ MÁY CHỦ — phải lấy ngày bằng getter địa phương.
 * `toISOString()` đổi sang UTC nên máy đặt múi +07 (cả VPS) lùi một ngày: học sinh thấy ngày
 * sinh sớm hơn một ngày, bấm lưu lại là ngày trong DB lùi thật (cùng bẫy với `giaTriSo` ở du-hoc.js).
 */
function ngayChuoi(x) {
  if (!(x instanceof Date)) return x;
  const p = (n) => String(n).padStart(2, '0');
  return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`;
}

/** So hai giá trị "như người dùng nhìn thấy" — DATE từ MySQL là Date object, từ form là chuỗi. */
function nhuNhau(a, b) {
  const chuan = (x) => (x instanceof Date ? ngayChuoi(x) : x === null || x === undefined ? '' : String(x));
  return chuan(a) === chuan(b);
}

function nhanBuoc(ma) {
  const b = BUOC.find((x) => x.ma === ma);
  return b ? b.ten : ma;
}

// =============================================================
// XEM HỒ SƠ CỦA TÔI
// =============================================================
// Một request trả đủ mọi thứ trang cần: hồ sơ + tiến độ + tiền + giấy tờ + tư vấn viên + thông
// báo. Trang này mở ra là xem ngay chứ không thao tác nhiều, chia nhỏ thành 5 endpoint chỉ tốn
// thêm 4 vòng mạng.
router.get('/ho-so-cua-toi', async (req, res) => {
  try {
    // Luôn đi qua helper: nó kiểm VAI TRÒ trước — giáo viên / sale / quản lý hồ sơ trả null dù
    // còn hồ sơ cũ (và KHÔNG đụng gì tới hồ sơ đó); học sinh đã duyệt hoặc quản trị mà chưa có thì tự tạo.
    const hs = await taoHoSoDuHocChoHocVien(req.userId, { choAdmin: true });
    if (!hs) return res.json({ co: false });

    // Mỗi phần tử của Promise.all là [rows, fields] của mysql2 — destructure đồng loạt `[x]`
    // để mọi biến đều là MẢNG BẢN GHI. Trộn hai kiểu (`[[a]]` chỗ này, `[a]` chỗ kia) là chỗ
    // rất dễ gọi `.map` lên một bản ghi đơn lẻ.
    const [[tien], [giayTo], [tuVan], [thongBao], [ycSua], dsTuVan] = await Promise.all([
      pool.query(
        `SELECT COALESCE(SUM(CASE WHEN loai = 'thu'  THEN so_tien END), 0) AS da_thu,
                COALESCE(SUM(CASE WHEN loai = 'hoan' THEN so_tien END), 0) AS da_hoan
           FROM du_hoc_thu_tien WHERE ho_so_id = ?`, [hs.id]),
      // Cố ý KHÔNG trả `ghi_chu` của giấy tờ: đó là chỗ tư vấn viên ghi việc nội bộ
      // ("gọi 3 lần chưa nghe máy").
      pool.query(
        `SELECT id, ten, trang_thai, bat_buoc FROM du_hoc_giay_to
          WHERE ho_so_id = ? ORDER BY sort_order, id`, [hs.id]),
      hs.tu_van_id
        ? pool.query('SELECT name, email, phone FROM users WHERE id = ?', [hs.tu_van_id])
        : Promise.resolve([[]]),
      pool.query(
        `SELECT id, loai, tieu_de, noi_dung, ngay_lien_quan, da_doc_luc, created_at
           FROM du_hoc_thong_bao WHERE user_id = ? ORDER BY created_at DESC LIMIT 30`, [req.userId]),
      pool.query(
        `SELECT id, thay_doi, ly_do, trang_thai, phan_hoi, created_at, duyet_luc
           FROM du_hoc_yeu_cau_sua WHERE ho_so_id = ? ORDER BY created_at DESC LIMIT 10`, [hs.id]),
      danhSachSale(hs),
    ]);

    // Các khoản thu — không trả `ghi_chu` (nội bộ), chỉ báo có chứng từ ảnh hay không.
    const [khoanThu] = await pool.query(
      `SELECT id, loai, khoan, so_tien, ngay_thu, hinh_thuc, (anh IS NOT NULL) AS co_anh
         FROM du_hoc_thu_tien WHERE ho_so_id = ? ORDER BY ngay_thu DESC, id DESC`, [hs.id]
    );

    const daThu = Number(tien[0]?.da_thu || 0);
    const daHoan = Number(tien[0]?.da_hoan || 0);

    const khai = {};
    for (const c of Object.keys(COT_HS)) {
      khai[c] = ngayChuoi(hs[c]);
    }

    res.json({
      co: true,
      ma_hs: hs.ma_hs,
      da_gui: !!hs.hs_gui_luc,
      gui_luc: hs.hs_gui_luc,
      khai,
      nhan_cot: { ...NHAN_CU, ...COT_HS },
      bat_buoc: BAT_BUOC,
      // Danh sách để chọn người tư vấn: chỉ id + tên (liên hệ chỉ hiện sau khi đã được gán).
      danh_sach_tu_van: dsTuVan,
      // --- phần chỉ xem ---
      tien_do: {
        buoc: hs.buoc,
        buoc_ten: nhanBuoc(hs.buoc),
        buoc_tu: hs.buoc_tu,
        cac_buoc: BUOC,
        ngay_phong_van: hs.ngay_phong_van,
        kq_phong_van: hs.kq_phong_van,
        // Ba loại phỏng vấn (2026-09-27) — cổng học sinh vẽ từng buổi bằng shared/phong-van.js.
        loai_phong_van: hs.loai_phong_van ?? null,
        ngay_pv_vp: hs.ngay_pv_vp ?? null,
        kq_pv_vp: hs.kq_pv_vp ?? null,
        truong_do: hs.truong_do,
        ngay_nop_visa: hs.ngay_nop_visa,
        kq_visa: hs.kq_visa,
        ngay_bay: hs.ngay_bay,
        chuyen_bay: hs.chuyen_bay,
      },
      ktx: { kq: hs.ktx_kq, han: hs.ktx_han },
      tien: {
        tong_phi: Number(hs.tong_phi || 0),
        da_thu: daThu,
        da_hoan: daHoan,
        con_lai: Math.max(0, Number(hs.tong_phi || 0) - (daThu - daHoan)),
        khoan: khoanThu.map((k) => ({ ...k, khoan_ten: NHAN_KHOAN[k.khoan] || 'Khác', co_anh: !!k.co_anh })),
      },
      giay_to: giayTo.map((g) => ({ ...g, trang_thai_ten: NHAN_GIAY_TO[g.trang_thai] || g.trang_thai })),
      tu_van: tuVan[0] || null,
      thong_bao: thongBao.map((t) => ({ ...t, ...(LOAI_TB[t.loai] || { nhan: 'Thông báo', icon: 'fa-bell' }) })),
      yeu_cau_sua: ycSua.map((y) => ({ ...y, thay_doi: JSON.parse(y.thay_doi || '[]') })),
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ co: false, chua_migration: true });
    console.error('Lỗi xem hồ sơ du học của tôi:', err);
    res.status(500).json({ error: 'Không tải được hồ sơ du học.' });
  }
});

// =============================================================
// KHAI BÁO — lưu nháp
// =============================================================
router.put('/khai-bao', async (req, res) => {
  try {
    const hs = await hoSoCuaToi(req.userId);
    if (!hs) return res.status(404).json({ error: 'Bạn chưa có hồ sơ du học. Liên hệ trung tâm để được mở hồ sơ.' });
    if (hs.hs_gui_luc) {
      return res.status(409).json({ error: 'Hồ sơ đã gửi nên không sửa trực tiếp được. Hãy gửi yêu cầu sửa để trung tâm duyệt.' });
    }

    const tuVanHopLe = await idTuVanHopLe(hs);
    const cot = [];
    const gt = [];
    for (const [c, v] of Object.entries(req.body || {})) {
      const x = chuanHoa(c, v, tuVanHopLe);
      if (x === undefined) continue;
      cot.push(c); gt.push(x);
    }
    if (!cot.length) return res.json({ message: 'Không có gì thay đổi.' });

    await pool.query(
      `UPDATE du_hoc_ho_so SET ${cot.map((c) => `${c} = ?`).join(', ')} WHERE id = ? AND user_id = ?`,
      [...gt, hs.id, req.userId]
    );
    res.json({ message: 'Đã lưu.' });
  } catch (err) {
    if (chuaCoBang(err)) return res.status(503).json({ error: 'Chức năng chưa sẵn sàng (DB chưa chạy migration).' });
    console.error('Lỗi lưu khai báo du học:', err);
    res.status(500).json({ error: 'Không lưu được.' });
  }
});

// =============================================================
// GỬI CHỐT KHAI BÁO — khoá form
// =============================================================
router.post('/gui-khai-bao', async (req, res) => {
  try {
    const hs = await hoSoCuaToi(req.userId);
    if (!hs) return res.status(404).json({ error: 'Bạn chưa có hồ sơ du học.' });
    if (hs.hs_gui_luc) return res.status(409).json({ error: 'Hồ sơ đã được gửi trước đó.' });

    // Lưu nốt phần đang gõ dở rồi mới chốt — nếu không, ô vừa gõ mà chưa kịp auto-save sẽ mất
    // và học sinh không sửa lại được nữa (đúng cái mình vừa cảnh báo họ).
    const tuVanHopLe = await idTuVanHopLe(hs);
    const cot = [];
    const gt = [];
    for (const [c, v] of Object.entries(req.body || {})) {
      const x = chuanHoa(c, v, tuVanHopLe);
      if (x === undefined) continue;
      cot.push(c); gt.push(x);
    }
    if (cot.length) {
      await pool.query(
        `UPDATE du_hoc_ho_so SET ${cot.map((c) => `${c} = ?`).join(', ')} WHERE id = ? AND user_id = ?`,
        [...gt, hs.id, req.userId]
      );
    }

    const [sau] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE id = ?', [hs.id]);
    const thieu = BAT_BUOC.filter((c) => {
      const v = sau[0][c];
      return v === null || v === undefined || String(v).trim() === '';
    });
    if (thieu.length) {
      return res.status(400).json({
        error: `Còn thiếu: ${thieu.map((c) => COT_HS[c]).join(', ')}.`,
        thieu,
      });
    }

    // `hs_gui_luc IS NULL` trong WHERE là khoá chống gửi hai lần: hai tab cùng bấm thì lần thứ
    // hai đổi 0 dòng — cùng lối với việc duyệt thanh toán ở 4.42.
    const [r] = await pool.query(
      'UPDATE du_hoc_ho_so SET hs_gui_luc = NOW() WHERE id = ? AND user_id = ? AND hs_gui_luc IS NULL',
      [hs.id, req.userId]
    );
    if (!r.affectedRows) return res.status(409).json({ error: 'Hồ sơ đã được gửi trước đó.' });

    await pool.query(
      `INSERT INTO du_hoc_lich_su (ho_so_id, loai, noi_dung, nguoi_id)
       VALUES (?, 'he-thong', 'Học sinh đã gửi khai báo hồ sơ', ?)`,
      [hs.id, req.userId]
    ).catch(() => {});

    res.json({ message: 'Đã gửi hồ sơ cho trung tâm.' });
  } catch (err) {
    if (chuaCoBang(err)) return res.status(503).json({ error: 'Chức năng chưa sẵn sàng (DB chưa chạy migration).' });
    console.error('Lỗi gửi khai báo du học:', err);
    res.status(500).json({ error: 'Không gửi được hồ sơ.' });
  }
});

// =============================================================
// YÊU CẦU SỬA — sau khi đã chốt
// =============================================================
router.post('/yeu-cau-sua', async (req, res) => {
  try {
    const hs = await hoSoCuaToi(req.userId);
    if (!hs) return res.status(404).json({ error: 'Bạn chưa có hồ sơ du học.' });
    if (!hs.hs_gui_luc) return res.status(400).json({ error: 'Hồ sơ chưa gửi — bạn sửa trực tiếp được.' });

    // Một yêu cầu chờ tại một thời điểm. Cho gửi chồng thì trung tâm duyệt cái cũ xong lại thấy
    // cái mới mâu thuẫn, và học sinh không biết cái nào đang có hiệu lực.
    const [dangCho] = await pool.query(
      "SELECT id FROM du_hoc_yeu_cau_sua WHERE ho_so_id = ? AND trang_thai = 'cho' LIMIT 1", [hs.id]
    );
    if (dangCho.length) {
      return res.status(409).json({ error: 'Bạn đang có một yêu cầu sửa chờ duyệt. Đợi trung tâm xử lý xong rồi gửi tiếp nhé.' });
    }

    // Lưu NGUYÊN CẶP cũ→mới: người duyệt phải thấy "đổi từ gì sang gì" mới quyết được.
    const dsSale = await danhSachSale(hs);
    const tuVanHopLe = new Set(dsSale.map((u) => u.id));
    const tenSale = (id) => dsSale.find((u) => u.id === Number(id))?.name || null;
    const thayDoi = [];
    for (const [c, v] of Object.entries(req.body?.thay_doi || {})) {
      const x = chuanHoa(c, v, tuVanHopLe);
      if (x === undefined) continue;
      if (nhuNhau(hs[c], x)) continue;   // gửi lại y nguyên giá trị cũ thì không phải một thay đổi
      const muc = { cot: c, nhan: COT_HS[c], cu: ngayChuoi(hs[c]), moi: x };
      // `cu` / `moi` của người tư vấn là ID (để áp vào cột khi duyệt) — kèm tên cho người đọc.
      if (c === 'tu_van_id') { muc.cu_ten = tenSale(hs[c]); muc.moi_ten = tenSale(x); }
      thayDoi.push(muc);
    }
    if (!thayDoi.length) return res.status(400).json({ error: 'Chưa có thay đổi nào so với hồ sơ hiện tại.' });

    const [r] = await pool.query(
      `INSERT INTO du_hoc_yeu_cau_sua (ho_so_id, user_id, thay_doi, ly_do) VALUES (?, ?, ?, ?)`,
      [hs.id, req.userId, JSON.stringify(thayDoi), String(req.body?.ly_do || '').trim().slice(0, 500) || null]
    );

    await pool.query(
      `INSERT INTO du_hoc_lich_su (ho_so_id, loai, noi_dung, nguoi_id)
       VALUES (?, 'ghi-chu', ?, ?)`,
      [hs.id, `Học sinh gửi yêu cầu sửa ${thayDoi.length} mục: ${thayDoi.map((t) => t.nhan).join(', ')}`.slice(0, 1000), req.userId]
    ).catch(() => {});

    res.status(201).json({ id: r.insertId, message: 'Đã gửi yêu cầu sửa. Trung tâm sẽ duyệt và phản hồi.' });
    // Báo nhân viên: người phụ trách hồ sơ + quản trị (quản trị duyệt được mọi hồ sơ).
    const tbNv = { tieuDe: 'Học sinh xin sửa hồ sơ', noiDung: `${hs.ho_ten} (${hs.ma_hs}) · ${thayDoi.map((t) => t.nhan).join(', ')}`,
      url: `/admin.html#/du-hoc/${hs.id}` };
    guiNgam(Promise.all([hs.tu_van_id ? guiPush(hs.tu_van_id, tbNv) : 0, guiPushVaiTro('admin', tbNv)]));
  } catch (err) {
    if (chuaCoBang(err)) return res.status(503).json({ error: 'Chức năng chưa sẵn sàng (DB chưa chạy migration).' });
    console.error('Lỗi gửi yêu cầu sửa du học:', err);
    res.status(500).json({ error: 'Không gửi được yêu cầu.' });
  }
});

// =============================================================
// THÔNG BÁO
// =============================================================
router.post('/thong-bao/:id/doc', async (req, res) => {
  try {
    // `user_id = ?` ngay trong WHERE là chỗ chặn quyền — không tra rồi so ở JS.
    await pool.query(
      'UPDATE du_hoc_thong_bao SET da_doc_luc = NOW() WHERE id = ? AND user_id = ? AND da_doc_luc IS NULL',
      [req.params.id, req.userId]
    );
    res.json({ message: 'ok' });
  } catch (err) {
    if (chuaCoBangTb(err)) return res.json({ message: 'ok' });
    console.error('Lỗi đánh dấu đọc thông báo du học:', err);
    res.status(500).json({ error: 'Không cập nhật được.' });
  }
});

router.post('/thong-bao/doc-het', async (req, res) => {
  try {
    await pool.query(
      'UPDATE du_hoc_thong_bao SET da_doc_luc = NOW() WHERE user_id = ? AND da_doc_luc IS NULL',
      [req.userId]
    );
    res.json({ message: 'ok' });
  } catch (err) {
    if (chuaCoBangTb(err)) return res.json({ message: 'ok' });
    console.error('Lỗi đọc hết thông báo du học:', err);
    res.status(500).json({ error: 'Không cập nhật được.' });
  }
});

export default router;
export { COT_HS, BAT_BUOC };
