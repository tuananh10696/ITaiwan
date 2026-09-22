// =============================================================
// SỔ THU – CHI CỦA TRUNG TÂM (2026-09-17)
// =============================================================
// Mount ở /api/admin nên đường dẫn thật là /api/admin/quy/...
//
// PHÂN QUYỀN — chỉ QUẢN TRỊ, như khu du học. Giáo viên không khai
// trong bảng QUYEN nên tự nhận 403: đây là toàn bộ dòng tiền của trung tâm.
//
// ⚠️ BÁO CÁO GỘP BA NGUỒN LÚC ĐỌC, KHÔNG SINH PHIẾU TỰ ĐỘNG (chốt 17/09/2026).
//    `quy_phieu` chỉ chứa phiếu tự tạo; tiền du học nằm ở `du_hoc_thu_tien`, tiền phòng ở
//    `ktx_thu_tien`. Sinh phiếu tự động thì mỗi lần sửa/xoá một khoản là phải đồng bộ hai chiều,
//    quên một nhánh là sổ quỹ lệch mà không ai biết (cùng lý do công nợ du học không lưu sẵn, 4.49).
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { loadRole, requireStaff, phamViQuanTri, requireOrgAdmin } from '../middleware/roles.js';

const router = Router();

// ⚠️ BỘ LỌC ĐƯỜNG DẪN — PHẢI đứng TRƯỚC mọi middleware khác của router này.
// Nhiều router cùng mount ở '/api/admin', mà `router.use(mw)` KHÔNG giới hạn theo đường dẫn:
// middleware của router này sẽ chạy cho MỌI request tới /api/admin/*, kể cả những khu do router
// khác phục vụ. Hệ quả thật đã bắt được 17/09/2026: `requireOrgAdmin` của routes/du-hoc.js chặn
// giáo viên ở khu đề bài (mount sau nó) với thông báo "Chức năng này dành cho quản trị viên" —
// trong khi khu đó vốn cho phép giáo viên.
// Không dùng `router.use('/quy', mw)` vì Express cắt tiền tố khỏi `req.path`, mà
// `phamViQuanTri` lại tra bảng QUYEN bằng chính `req.path` -> mọi luật hết khớp.
// `next('router')` thoát hẳn router này và trả quyền điều khiển về app để đi tiếp router sau.
router.use((req, res, next) => (/^\/quy(\/|$)/.test(req.path) ? next() : next('router')));
router.use(requireAuth, loadRole, requireStaff, phamViQuanTri, requireOrgAdmin);

/** Ảnh chứng từ: cùng ngưỡng với biên lai du học (4.51) — client đã nén trước khi gửi. */
const ANH_TOI_DA = 900_000;

const HINH_THUC = ['tien-mat', 'chuyen-khoan', 'the', 'khac'];

/** Danh mục dựng sẵn cho trung tâm mới — tạo lần đầu tiên họ mở khu này. */
const DANH_MUC_MAC_DINH = [
  ['thu', 'Học phí'], ['thu', 'Phí dịch vụ du học'], ['thu', 'Tiền ký túc xá'],
  ['thu', 'Phí ghi danh'], ['thu', 'Bán giáo trình'], ['thu', 'Khác'],
  ['chi', 'Lương nhân viên'], ['chi', 'Thuê mặt bằng'], ['chi', 'Điện nước - Internet'],
  ['chi', 'Marketing - Quảng cáo'], ['chi', 'In ấn - Văn phòng phẩm'],
  ['chi', 'Công tác phí'], ['chi', 'Thuế - Phí'], ['chi', 'Khác'],
];

// ------------------------------------------------------------------ helper

/** Bảng chưa có (chưa chạy migration) thì nói đúng nguyên nhân thay vì "Lỗi hệ thống". */
function loiBang(err, macDinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'DB chưa có bảng sổ quỹ. Chạy `npm run db:migrate:prod` rồi thử lại.';
  }
  return macDinh;
}
const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/** Tổ chức của người đang gọi. Admin nền tảng thao tác trên chính tổ chức gốc của mình. */
const orgCua = (req) => req.orgId;

/** Số tiền: chỉ nhận số nguyên dương. Tiền Việt không có phần lẻ. */
function soTien(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n > 0 && n < 1e12 ? n : null;
}

/** `2026-09-17` hợp lệ? Chuỗi rỗng / sai định dạng trả null để câu INSERT không nhận rác. */
function ngay(v) {
  const s = String(v || '').slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

/**
 * Sinh mã phiếu kế tiếp cho tổ chức: PT-0001 / PC-0001.
 * Chạy TRONG giao dịch và khoá dòng lớn nhất, nếu không hai người cùng lập phiếu một lúc sẽ ra
 * trùng mã rồi UNIQUE(org_id, ma_phieu) ném lỗi ngay trước mặt người dùng.
 */
async function maPhieuKeTiep(conn, orgId, loai) {
  const tienTo = loai === 'thu' ? 'PT' : 'PC';
  const [r] = await conn.query(
    `SELECT ma_phieu FROM quy_phieu
      WHERE org_id = ? AND ma_phieu LIKE ?
      ORDER BY CAST(SUBSTRING(ma_phieu, 4) AS UNSIGNED) DESC LIMIT 1 FOR UPDATE`,
    [orgId, `${tienTo}-%`]
  );
  const so = r.length ? parseInt(String(r[0].ma_phieu).slice(3), 10) + 1 : 1;
  return `${tienTo}-${String(so).padStart(4, '0')}`;
}

/** Trung tâm chưa có danh mục nào thì dựng bộ mặc định — form tạo phiếu không được trống trơn. */
async function bacDanhMucNeuTrong(orgId) {
  const [r] = await pool.query('SELECT COUNT(*) n FROM quy_danh_muc WHERE org_id = ?', [orgId]);
  if (r[0].n > 0) return;
  await pool.query(
    `INSERT IGNORE INTO quy_danh_muc (org_id, loai, ten, sort_order) VALUES ${DANH_MUC_MAC_DINH.map(() => '(?,?,?,?)').join(',')}`,
    DANH_MUC_MAC_DINH.flatMap(([loai, ten], i) => [orgId, loai, ten, (i + 1) * 10])
  );
}

// ------------------------------------------------------------------ DANH MỤC

router.get('/quy/danh-muc', async (req, res) => {
  try {
    const orgId = orgCua(req);
    await bacDanhMucNeuTrong(orgId);
    const [rows] = await pool.query(
      `SELECT id, loai, ten, sort_order, is_active FROM quy_danh_muc
        WHERE org_id = ? ORDER BY loai, sort_order, ten`, [orgId]
    );
    res.json({ danh_muc: rows });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ danh_muc: [], chua_migration: true });
    console.error('Lỗi đọc danh mục quỹ:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được danh mục.') });
  }
});

router.post('/quy/danh-muc', async (req, res) => {
  const { loai, ten } = req.body || {};
  if (!['thu', 'chi'].includes(loai)) return res.status(400).json({ error: 'Loại phải là thu hoặc chi.' });
  const t = String(ten || '').trim();
  if (!t) return res.status(400).json({ error: 'Chưa nhập tên danh mục.' });
  try {
    const [r] = await pool.query(
      'INSERT INTO quy_danh_muc (org_id, loai, ten, sort_order) VALUES (?, ?, ?, ?)',
      [orgCua(req), loai, t.slice(0, 100), 999]
    );
    res.json({ success: true, id: r.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Danh mục này đã có rồi.' });
    console.error('Lỗi thêm danh mục quỹ:', err);
    res.status(500).json({ error: loiBang(err, 'Không thêm được danh mục.') });
  }
});

router.put('/quy/danh-muc/:id', async (req, res) => {
  const { ten, is_active } = req.body || {};
  const dat = []; const ts = [];
  if (ten !== undefined) {
    const t = String(ten || '').trim();
    if (!t) return res.status(400).json({ error: 'Tên danh mục không được để trống.' });
    dat.push('ten = ?'); ts.push(t.slice(0, 100));
  }
  if (is_active !== undefined) { dat.push('is_active = ?'); ts.push(is_active ? 1 : 0); }
  if (!dat.length) return res.status(400).json({ error: 'Không có gì để sửa.' });
  try {
    // org_id trong WHERE là chỗ chặn quyền — danh mục của trung tâm khác thì đổi 0 dòng.
    const [r] = await pool.query(
      `UPDATE quy_danh_muc SET ${dat.join(', ')} WHERE id = ? AND org_id = ?`,
      [...ts, req.params.id, orgCua(req)]
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy danh mục.' });
    res.json({ success: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Đã có danh mục trùng tên.' });
    console.error('Lỗi sửa danh mục quỹ:', err);
    res.status(500).json({ error: 'Không sửa được danh mục.' });
  }
});

// Xoá danh mục KHÔNG xoá phiếu cũ (khoá ngoại ON DELETE SET NULL) — phiếu chỉ mất nhãn.
// Nhưng vẫn chặn khi còn phiếu dùng tới nó và bảo người dùng TẮT thay vì xoá, vì mất nhãn
// là mất luôn ý nghĩa của mấy chục dòng trong báo cáo cũ.
router.delete('/quy/danh-muc/:id', async (req, res) => {
  try {
    const [d] = await pool.query(
      'SELECT COUNT(*) n FROM quy_phieu WHERE danh_muc_id = ? AND org_id = ?',
      [req.params.id, orgCua(req)]
    );
    if (d[0].n > 0) {
      return res.status(409).json({
        error: `Danh mục này đang có ${d[0].n} phiếu. Tắt danh mục thay vì xoá để báo cáo cũ giữ nguyên nhãn.`,
      });
    }
    const [r] = await pool.query('DELETE FROM quy_danh_muc WHERE id = ? AND org_id = ?', [req.params.id, orgCua(req)]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy danh mục.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá danh mục quỹ:', err);
    res.status(500).json({ error: 'Không xoá được danh mục.' });
  }
});

// ------------------------------------------------------------------ PHIẾU

// GET /quy/phieu?loai=&tu=&den=&danh_muc=&tim=&trang=
// ⚠️ KHÔNG BAO GIỜ SELECT cột `anh` ở đây — 30 phiếu là vài chục MB (bài học 4.42/4.51).
router.get('/quy/phieu', async (req, res) => {
  const { loai, tu, den, danh_muc, tim } = req.query;
  const trang = Math.max(1, parseInt(req.query.trang, 10) || 1);
  const moiTrang = 50;
  try {
    const dk = ['p.org_id = ?']; const ts = [orgCua(req)];
    if (['thu', 'chi'].includes(loai)) { dk.push('p.loai = ?'); ts.push(loai); }
    if (ngay(tu)) { dk.push('p.ngay >= ?'); ts.push(ngay(tu)); }
    if (ngay(den)) { dk.push('p.ngay <= ?'); ts.push(ngay(den)); }
    if (danh_muc) { dk.push('p.danh_muc_id = ?'); ts.push(danh_muc); }
    if (tim) {
      dk.push('(p.ma_phieu LIKE ? OR p.doi_tuong LIKE ? OR p.dien_giai LIKE ?)');
      const k = `%${String(tim).trim()}%`; ts.push(k, k, k);
    }
    const where = `WHERE ${dk.join(' AND ')}`;

    const [[dem]] = await pool.query(`SELECT COUNT(*) n FROM quy_phieu p ${where}`, ts);
    const [rows] = await pool.query(
      `SELECT p.id, p.ma_phieu, p.loai, p.ngay, p.so_tien, p.danh_muc_id, p.doi_tuong,
              p.hinh_thuc, p.dien_giai, p.created_at,
              (p.anh IS NOT NULL) AS co_anh,
              dm.ten AS danh_muc_ten, u.name AS nguoi_lap
         FROM quy_phieu p
         LEFT JOIN quy_danh_muc dm ON dm.id = p.danh_muc_id
         LEFT JOIN users u ON u.id = p.nguoi_lap_id
         ${where}
         ORDER BY p.ngay DESC, p.id DESC
         LIMIT ${moiTrang} OFFSET ${(trang - 1) * moiTrang}`, ts
    );
    // Tổng của TOÀN BỘ bộ lọc, không phải của riêng trang đang xem — người dùng lọc "tháng 9"
    // là muốn biết tổng tháng 9, không phải tổng 50 dòng đầu.
    const [[tong]] = await pool.query(
      `SELECT COALESCE(SUM(CASE WHEN p.loai='thu' THEN p.so_tien ELSE 0 END),0) thu,
              COALESCE(SUM(CASE WHEN p.loai='chi' THEN p.so_tien ELSE 0 END),0) chi
         FROM quy_phieu p ${where}`, ts
    );
    res.json({
      phieu: rows, tong_so: dem.n, trang, moi_trang: moiTrang,
      tong: { thu: Number(tong.thu), chi: Number(tong.chi), ton: Number(tong.thu) - Number(tong.chi) },
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ phieu: [], tong_so: 0, chua_migration: true });
    console.error('Lỗi đọc phiếu quỹ:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được sổ quỹ.') });
  }
});

router.post('/quy/phieu', async (req, res) => {
  const { loai, ngay: ng, so_tien, danh_muc_id, doi_tuong, hinh_thuc, dien_giai, anh } = req.body || {};
  if (!['thu', 'chi'].includes(loai)) return res.status(400).json({ error: 'Chưa chọn loại phiếu (thu hay chi).' });
  const tien = soTien(so_tien);
  if (!tien) return res.status(400).json({ error: 'Số tiền phải là số dương.' });
  const d = ngay(ng);
  if (!d) return res.status(400).json({ error: 'Ngày không hợp lệ.' });
  if (anh && anh.length > ANH_TOI_DA) {
    return res.status(413).json({ error: 'Ảnh chứng từ quá lớn. Chụp lại hoặc chọn ảnh nhỏ hơn.' });
  }

  const conn = await pool.getConnection();
  try {
    const orgId = orgCua(req);
    await conn.beginTransaction();
    // Danh mục phải thuộc CHÍNH tổ chức này — không kiểm thì gán được vào danh mục trung tâm khác
    // và báo cáo của họ mọc thêm dòng lạ.
    let dmId = null;
    if (danh_muc_id) {
      const [dm] = await conn.query(
        'SELECT id FROM quy_danh_muc WHERE id = ? AND org_id = ? AND loai = ?',
        [danh_muc_id, orgId, loai]
      );
      if (!dm.length) { await conn.rollback(); return res.status(400).json({ error: 'Danh mục không hợp lệ với loại phiếu này.' }); }
      dmId = dm[0].id;
    }
    const ma = await maPhieuKeTiep(conn, orgId, loai);
    const [r] = await conn.query(
      `INSERT INTO quy_phieu (org_id, ma_phieu, loai, ngay, so_tien, danh_muc_id, doi_tuong,
                              hinh_thuc, dien_giai, nguoi_lap_id, anh, anh_luc)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [orgId, ma, loai, d, tien, dmId, String(doi_tuong || '').slice(0, 150) || null,
       HINH_THUC.includes(hinh_thuc) ? hinh_thuc : 'tien-mat',
       String(dien_giai || '').slice(0, 500) || null, req.userId,
       anh || null, anh ? new Date() : null]
    );
    await conn.commit();
    res.json({ success: true, id: r.insertId, ma_phieu: ma });
  } catch (err) {
    await conn.rollback().catch(() => {});
    console.error('Lỗi tạo phiếu quỹ:', err);
    res.status(500).json({ error: loiBang(err, 'Không tạo được phiếu.') });
  } finally {
    conn.release();
  }
});

router.put('/quy/phieu/:id', async (req, res) => {
  const { ngay: ng, so_tien, danh_muc_id, doi_tuong, hinh_thuc, dien_giai } = req.body || {};
  const dat = []; const ts = [];
  if (ng !== undefined) {
    const d = ngay(ng);
    if (!d) return res.status(400).json({ error: 'Ngày không hợp lệ.' });
    dat.push('ngay = ?'); ts.push(d);
  }
  if (so_tien !== undefined) {
    const t = soTien(so_tien);
    if (!t) return res.status(400).json({ error: 'Số tiền phải là số dương.' });
    dat.push('so_tien = ?'); ts.push(t);
  }
  if (danh_muc_id !== undefined) { dat.push('danh_muc_id = ?'); ts.push(danh_muc_id || null); }
  if (doi_tuong !== undefined) { dat.push('doi_tuong = ?'); ts.push(String(doi_tuong || '').slice(0, 150) || null); }
  if (hinh_thuc !== undefined && HINH_THUC.includes(hinh_thuc)) { dat.push('hinh_thuc = ?'); ts.push(hinh_thuc); }
  if (dien_giai !== undefined) { dat.push('dien_giai = ?'); ts.push(String(dien_giai || '').slice(0, 500) || null); }
  if (!dat.length) return res.status(400).json({ error: 'Không có gì để sửa.' });
  try {
    // Mã phiếu và loại KHÔNG cho sửa: mã đã in ra giấy và đưa cho người nộp tiền; đổi loại
    // thu <-> chi thì mã PT- lại mang nội dung chi, sổ sách không đối chiếu được nữa.
    const [r] = await pool.query(
      `UPDATE quy_phieu SET ${dat.join(', ')} WHERE id = ? AND org_id = ?`,
      [...ts, req.params.id, orgCua(req)]
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy phiếu.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi sửa phiếu quỹ:', err);
    res.status(500).json({ error: 'Không sửa được phiếu.' });
  }
});

router.delete('/quy/phieu/:id', async (req, res) => {
  try {
    const [r] = await pool.query('DELETE FROM quy_phieu WHERE id = ? AND org_id = ?', [req.params.id, orgCua(req)]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy phiếu.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá phiếu quỹ:', err);
    res.status(500).json({ error: 'Không xoá được phiếu.' });
  }
});

// Ảnh chứng từ lấy RIÊNG, không đi kèm danh sách.
router.get('/quy/phieu/:id/anh', async (req, res) => {
  try {
    const [r] = await pool.query('SELECT anh FROM quy_phieu WHERE id = ? AND org_id = ?', [req.params.id, orgCua(req)]);
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy phiếu.' });
    if (!r[0].anh) return res.status(404).json({ error: 'Phiếu này chưa có ảnh chứng từ.' });
    res.json({ anh: r[0].anh });
  } catch (err) {
    console.error('Lỗi đọc ảnh chứng từ:', err);
    res.status(500).json({ error: 'Không đọc được ảnh.' });
  }
});

router.put('/quy/phieu/:id/anh', async (req, res) => {
  const { anh } = req.body || {};
  if (anh && anh.length > ANH_TOI_DA) {
    return res.status(413).json({ error: 'Ảnh chứng từ quá lớn. Chụp lại hoặc chọn ảnh nhỏ hơn.' });
  }
  try {
    const [r] = await pool.query(
      'UPDATE quy_phieu SET anh = ?, anh_luc = ? WHERE id = ? AND org_id = ?',
      [anh || null, anh ? new Date() : null, req.params.id, orgCua(req)]
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy phiếu.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi lưu ảnh chứng từ:', err);
    res.status(500).json({ error: 'Không lưu được ảnh.' });
  }
});

// ------------------------------------------------------------------ BÁO CÁO

/**
 * GET /quy/bao-cao?tu=&den=
 * Gộp BA nguồn tiền lúc đọc (xem chú thích đầu file). Mỗi dòng ghi rõ `nguon` để người xem biết
 * phải sửa ở đâu nếu thấy sai — đó là cái giá phải trả cho việc không sinh phiếu tự động, và là
 * cái giá rẻ hơn nhiều so với hai bảng lệch nhau.
 */
router.get('/quy/bao-cao', async (req, res) => {
  const tu = ngay(req.query.tu) || '1970-01-01';
  const den = ngay(req.query.den) || '2999-12-31';
  const orgId = orgCua(req);
  try {
    // 1. Phiếu tự lập
    const [phieu] = await pool.query(
      `SELECT p.loai, p.ngay, p.so_tien, COALESCE(dm.ten,'Chưa phân loại') AS danh_muc
         FROM quy_phieu p LEFT JOIN quy_danh_muc dm ON dm.id = p.danh_muc_id
        WHERE p.org_id = ? AND p.ngay BETWEEN ? AND ?`, [orgId, tu, den]
    );
    // 2. Phí dịch vụ du học — `hoan` là tiền TRẢ RA nên tính là chi.
    let duHoc = [];
    try {
      const [r] = await pool.query(
        `SELECT IF(t.loai='hoan','chi','thu') AS loai, t.ngay_thu AS ngay, t.so_tien,
                'Phí dịch vụ du học' AS danh_muc
           FROM du_hoc_thu_tien t JOIN du_hoc_ho_so h ON h.id = t.ho_so_id
          WHERE h.org_id = ? AND t.ngay_thu BETWEEN ? AND ?`, [orgId, tu, den]
      );
      duHoc = r;
    } catch (e) { if (!chuaCoBang(e)) throw e; }
    // 3. Tiền ký túc xá
    let ktx = [];
    try {
      const [r] = await pool.query(
        `SELECT IF(tt.loai='hoan-coc','chi','thu') AS loai, tt.ngay_thu AS ngay, tt.so_tien,
                'Tiền ký túc xá' AS danh_muc
           FROM ktx_thu_tien tt
           JOIN ktx_o o ON o.id = tt.o_id
           JOIN ktx_phong p ON p.id = o.phong_id
           JOIN ktx_toa toa ON toa.id = p.toa_id
          WHERE toa.org_id = ? AND tt.ngay_thu BETWEEN ? AND ?`, [orgId, tu, den]
      );
      ktx = r;
    } catch (e) { if (!chuaCoBang(e)) throw e; }

    const tatCa = [
      ...phieu.map((x) => ({ ...x, nguon: 'phieu' })),
      ...duHoc.map((x) => ({ ...x, nguon: 'du-hoc' })),
      ...ktx.map((x) => ({ ...x, nguon: 'ktx' })),
    ];

    // Gom theo THÁNG và theo DANH MỤC — làm trong JS vì ba nguồn có cấu trúc khác nhau, ghép
    // bằng UNION trong SQL thì mỗi lần thêm nguồn lại phải sửa một câu truy vấn dài.
    const theoThang = {}; const theoDanhMuc = {}; const theoNguon = {};
    let tongThu = 0; let tongChi = 0;
    for (const d of tatCa) {
      const t = Number(d.so_tien) || 0;
      const thang = String(d.ngay instanceof Date ? d.ngay.toISOString().slice(0, 7) : String(d.ngay).slice(0, 7));
      theoThang[thang] ||= { thang, thu: 0, chi: 0 };
      theoThang[thang][d.loai] += t;
      const k = `${d.loai}|${d.danh_muc}`;
      theoDanhMuc[k] ||= { loai: d.loai, danh_muc: d.danh_muc, tong: 0, so_dong: 0 };
      theoDanhMuc[k].tong += t; theoDanhMuc[k].so_dong += 1;
      theoNguon[d.nguon] ||= { nguon: d.nguon, thu: 0, chi: 0 };
      theoNguon[d.nguon][d.loai] += t;
      if (d.loai === 'thu') tongThu += t; else tongChi += t;
    }
    res.json({
      tu, den,
      tong: { thu: tongThu, chi: tongChi, ton: tongThu - tongChi, so_dong: tatCa.length },
      theo_thang: Object.values(theoThang).sort((a, b) => a.thang.localeCompare(b.thang)),
      theo_danh_muc: Object.values(theoDanhMuc).sort((a, b) => b.tong - a.tong),
      theo_nguon: Object.values(theoNguon),
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ tong: { thu: 0, chi: 0, ton: 0, so_dong: 0 }, theo_thang: [], theo_danh_muc: [], theo_nguon: [], chua_migration: true });
    console.error('Lỗi báo cáo quỹ:', err);
    res.status(500).json({ error: loiBang(err, 'Không dựng được báo cáo.') });
  }
});

export default router;
