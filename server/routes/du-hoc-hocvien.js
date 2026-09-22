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
// HỌC SINH KHÔNG ĐƯỢC ĐỤNG: `tong_phi`, `tu_van_id`, `buoc`, mọi cột kết quả (`kq_*`), `ma_hs`,
// `org_id`, `user_id`, `ghi_chu` (ghi chú nội bộ của tư vấn viên), `ktx_kq`, `ktx_han`.
// Danh sách trắng nằm ở COT_HS bên dưới — thêm cột mới vào hồ sơ thì phải tự hỏi: học sinh có
// được khai cột này không? Mặc định là KHÔNG.
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { BUOC } from './du-hoc.js';
import { baoHocSinh, chuaCoBangTb, LOAI_TB } from '../utils/du-hoc-thong-bao.js';

const router = Router();
router.use(requireAuth);

// ------------------------------------------------------------------ danh sách trắng

/**
 * Cột học sinh được tự khai, kèm NHÃN tiếng Việt.
 * Nhãn không chỉ để hiện form — nó còn là thứ người duyệt yêu cầu sửa đọc được ("Số hộ chiếu:
 * C1234567 → C7654321"). Nên giữ nhãn ở một chỗ duy nhất này.
 */
const COT_HS = {
  ho_ten: 'Họ và tên',
  ngay_sinh: 'Ngày sinh',
  gioi_tinh: 'Giới tính',
  cccd: 'Số CCCD/CMND',
  ho_chieu: 'Số hộ chiếu',
  ho_chieu_het_han: 'Hộ chiếu hết hạn',
  dia_chi: 'Địa chỉ thường trú',
  phone: 'Số điện thoại',
  email: 'Email',
  lien_lac_khac: 'Liên lạc khác (Zalo/LINE…)',

  ph_ten: 'Họ tên người bảo lãnh',
  ph_phone: 'SĐT người bảo lãnh',
  ph_quan_he: 'Quan hệ với người bảo lãnh',

  truong_tn: 'Trường tốt nghiệp',
  nam_tn: 'Năm tốt nghiệp',
  xep_loai: 'Xếp loại',
  trinh_do_tieng: 'Trình độ tiếng Trung',

  truong_nv1: 'Nguyện vọng 1',
  truong_nv2: 'Nguyện vọng 2',
  truong_nv3: 'Nguyện vọng 3',
  nganh: 'Ngành đăng ký',
  ky_nhap_hoc: 'Kỳ nhập học',
  loai_hinh: 'Loại hình du học',

  ktx_dang_ky: 'Đăng ký ký túc xá',
  ktx_loai: 'Loại phòng mong muốn',
  ktx_ghi_chu: 'Yêu cầu thêm về chỗ ở',
};
const COT_NGAY = new Set(['ngay_sinh', 'ho_chieu_het_han']);
const ENUM_HS = {
  gioi_tinh: ['nam', 'nu', 'khac'],
  loai_hinh: ['hoa-ngu', 'dai-hoc', 'cao-hoc', 'tien-si', 'khac'],
  ktx_dang_ky: ['chua-quyet', 'co', 'khong'],
};
/** Bốn ô tối thiểu phải có thì mới cho gửi — thiếu là trung tâm không làm được gì với hồ sơ. */
const BAT_BUOC = ['ho_ten', 'ngay_sinh', 'phone', 'truong_nv1'];

const NHAN_KHOAN = {
  'dat-coc': 'Đặt cọc', 'phi-ho-so': 'Phí hồ sơ', 'hoc-phi': 'Học phí',
  'dich-thuat': 'Dịch thuật', 'phi-visa': 'Phí visa', 've-may-bay': 'Vé máy bay', khac: 'Khác',
};
const NHAN_GIAY_TO = {
  chua: 'Chưa nộp', nhan: 'Đã nộp', dich: 'Đã dịch công chứng', nop: 'Đã nộp trường', 'khong-can': 'Không cần',
};

// ------------------------------------------------------------------ helper

const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/** Hồ sơ của CHÍNH người đang gọi. `null` nếu em này không phải học sinh du học. */
async function hoSoCuaToi(userId) {
  const [r] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE user_id = ? LIMIT 1', [userId]);
  return r[0] || null;
}

/** Chuẩn hoá một giá trị học sinh gửi lên theo đúng kiểu cột. Trả `undefined` nếu cột không hợp lệ. */
function chuanHoa(cot, gtRaw) {
  if (!(cot in COT_HS)) return undefined;
  if (ENUM_HS[cot]) return ENUM_HS[cot].includes(gtRaw) ? gtRaw : undefined;
  if (COT_NGAY.has(cot)) {
    const d = String(gtRaw || '').slice(0, 10);
    // Chuỗi rỗng phải thành NULL chứ không phải '' — MySQL ép '' thành 0000-00-00.
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
  }
  const s = String(gtRaw ?? '').trim();
  if (!s) return null;
  return s.slice(0, cot === 'dia_chi' ? 300 : cot === 'ktx_ghi_chu' ? 300 : 200);
}

/** So hai giá trị "như người dùng nhìn thấy" — DATE từ MySQL là Date object, từ form là chuỗi. */
function nhuNhau(a, b) {
  const chuan = (x) => (x instanceof Date ? x.toISOString().slice(0, 10) : x === null || x === undefined ? '' : String(x));
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
    const hs = await hoSoCuaToi(req.userId);
    // KHÔNG phải học sinh du học — trả 200 với cờ, không phải 404. Trang profile gọi endpoint
    // này cho MỌI học viên để biết có hiện mục du học hay không; 404 ở đó là lỗi giả.
    if (!hs) return res.json({ co: false });

    // Mỗi phần tử của Promise.all là [rows, fields] của mysql2 — destructure đồng loạt `[x]`
    // để mọi biến đều là MẢNG BẢN GHI. Trộn hai kiểu (`[[a]]` chỗ này, `[a]` chỗ kia) là chỗ
    // rất dễ gọi `.map` lên một bản ghi đơn lẻ.
    const [[tien], [giayTo], [tuVan], [thongBao], [ycSua]] = await Promise.all([
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
      khai[c] = hs[c] instanceof Date ? hs[c].toISOString().slice(0, 10) : hs[c];
    }

    res.json({
      co: true,
      ma_hs: hs.ma_hs,
      da_gui: !!hs.hs_gui_luc,
      gui_luc: hs.hs_gui_luc,
      khai,
      nhan_cot: COT_HS,
      bat_buoc: BAT_BUOC,
      // --- phần chỉ xem ---
      tien_do: {
        buoc: hs.buoc,
        buoc_ten: nhanBuoc(hs.buoc),
        buoc_tu: hs.buoc_tu,
        cac_buoc: BUOC,
        ngay_phong_van: hs.ngay_phong_van,
        kq_phong_van: hs.kq_phong_van,
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

    const cot = [];
    const gt = [];
    for (const [c, v] of Object.entries(req.body || {})) {
      const x = chuanHoa(c, v);
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
    const cot = [];
    const gt = [];
    for (const [c, v] of Object.entries(req.body || {})) {
      const x = chuanHoa(c, v);
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
    const thayDoi = [];
    for (const [c, v] of Object.entries(req.body?.thay_doi || {})) {
      const x = chuanHoa(c, v);
      if (x === undefined) continue;
      if (nhuNhau(hs[c], x)) continue;   // gửi lại y nguyên giá trị cũ thì không phải một thay đổi
      thayDoi.push({ cot: c, nhan: COT_HS[c], cu: hs[c] instanceof Date ? hs[c].toISOString().slice(0, 10) : hs[c], moi: x });
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
