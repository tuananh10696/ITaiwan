// =============================================================
// KÝ TÚC XÁ CỦA TRUNG TÂM (2026-09-17)
// =============================================================
// Mount ở /api/admin nên đường dẫn thật là /api/admin/ktx/...
//
// ⚠️ KHÔNG liên quan `du_hoc_ho_so.ktx_*` — 5 cột đó là nguyện vọng ở KTX của TRƯỜNG BÊN ĐÀI
//    LOAN (4.51). Đây là chỗ ở do chính trung tâm vận hành ở Việt Nam.
//
// PHÂN QUYỀN — chỉ QUẢN TRỊ, như khu du học: có thông tin cá nhân và tiền nong.
//
// Mọi truy vấn phải lọc theo `ktx_toa.org_id`. Phòng / người ở / khoản thu đều nằm SÂU dưới toà
// nên phải JOIN ngược lên toà để lọc — không có cột org_id trực tiếp ở bảng con là có chủ ý:
// một người ở luôn thuộc đúng một phòng, một phòng thuộc đúng một toà, nhân org_id ra bốn bảng
// là bốn cơ hội để chúng lệch nhau.
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { loadRole, requireStaff, phamViQuanTri, requireHoSoStaff } from '../middleware/roles.js';

const router = Router();

// ⚠️ BỘ LỌC ĐƯỜNG DẪN — PHẢI đứng TRƯỚC mọi middleware khác của router này.
// Nhiều router cùng mount ở '/api/admin', mà `router.use(mw)` KHÔNG giới hạn theo đường dẫn:
// middleware của router này sẽ chạy cho MỌI request tới /api/admin/*, kể cả những khu do router
// khác phục vụ. Hệ quả thật đã bắt được 17/09/2026: `requireOrgAdmin` của routes/du-hoc.js chặn
// giáo viên ở khu đề bài (mount sau nó) với thông báo "Chức năng này dành cho quản trị viên" —
// trong khi khu đó vốn cho phép giáo viên.
// Không dùng `router.use('/ktx', mw)` vì Express cắt tiền tố khỏi `req.path`, mà
// `phamViQuanTri` lại tra bảng QUYEN bằng chính `req.path` -> mọi luật hết khớp.
// `next('router')` thoát hẳn router này và trả quyền điều khiển về app để đi tiếp router sau.
router.use((req, res, next) => (/^\/ktx(\/|$)/.test(req.path) ? next() : next('router')));
router.use(requireAuth, loadRole, requireStaff, phamViQuanTri, requireHoSoStaff);

const ANH_TOI_DA = 900_000;
const HINH_THUC = ['tien-mat', 'chuyen-khoan', 'the', 'khac'];
const LOAI_THU = ['tien-phong', 'dien-nuoc', 'coc', 'hoan-coc', 'khac'];

// ------------------------------------------------------------------ helper

function loiBang(err, macDinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'DB chưa có bảng ký túc xá. Chạy `npm run db:migrate:prod` rồi thử lại.';
  }
  return macDinh;
}
const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');
const orgCua = (req) => req.orgId;

function soTien(v, choPhepKhong = false) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n) || n < 0 || n >= 1e12) return null;
  return choPhepKhong || n > 0 ? n : null;
}
function ngay(v) {
  const s = String(v || '').slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}
/** Kỳ thu tiền phòng: `2026-09`. */
function ky(v) {
  const s = String(v || '').slice(0, 7);
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(s) ? s : null;
}

/** Phòng có thuộc tổ chức người đang gọi không. Trả bản ghi kèm tên toà, hoặc null. */
async function layPhong(id, orgId) {
  const [r] = await pool.query(
    `SELECT p.*, t.ten AS toa_ten, t.org_id
       FROM ktx_phong p JOIN ktx_toa t ON t.id = p.toa_id
      WHERE p.id = ? AND t.org_id = ?`, [id, orgId]
  );
  return r[0] || null;
}

/** Bản ghi "người ở" có thuộc tổ chức không — JOIN ngược lên toà. */
async function layO(id, orgId) {
  const [r] = await pool.query(
    `SELECT o.*, p.ten_phong, p.suc_chua, t.ten AS toa_ten
       FROM ktx_o o
       JOIN ktx_phong p ON p.id = o.phong_id
       JOIN ktx_toa t ON t.id = p.toa_id
      WHERE o.id = ? AND t.org_id = ?`, [id, orgId]
  );
  return r[0] || null;
}

// ------------------------------------------------------------------ TỔNG QUAN

router.get('/ktx/tong-quan', async (req, res) => {
  const orgId = orgCua(req);
  const kyNay = new Date().toISOString().slice(0, 7);
  try {
    // Đếm toà và đếm phòng phải là HAI câu riêng: gộp một câu thì SUM(suc_chua) chạy trên kết
    // quả đã JOIN nên mỗi phòng bị cộng nhiều lần theo số dòng — ra tổng chỗ lớn gấp mấy lần thật.
    const [[soToa]] = await pool.query(
      `SELECT COUNT(*) n FROM ktx_toa WHERE org_id = ? AND trang_thai = 'dang-dung'`, [orgId]
    );
    const [[soLieu]] = await pool.query(
      `SELECT COUNT(*) so_phong, COALESCE(SUM(p.suc_chua), 0) AS tong_cho
         FROM ktx_phong p JOIN ktx_toa t ON t.id = p.toa_id
        WHERE t.org_id = ? AND t.trang_thai = 'dang-dung' AND p.trang_thai = 'dang-dung'`, [orgId]
    );
    const [[dangO]] = await pool.query(
      `SELECT COUNT(*) n FROM ktx_o o
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
        WHERE t.org_id = ? AND o.trang_thai = 'dang-o'`, [orgId]
    );
    // Công nợ tháng này: người đang ở, có giá thuê > 0, mà chưa có khoản `tien-phong` của kỳ này.
    // Số TOÀ / PHÒNG / CHỖ TRỐNG ở trên cố ý KHÔNG lọc: đó là hạ tầng của trung tâm, sale cần
    // biết còn chỗ nào mà xếp học sinh. Từ đây xuống là số gắn với NGƯỜI (ai nợ, thu được bao
    // nhiêu) nên phải về đúng phạm vi — nếu không, sale thấy "2 người chưa đóng" rồi bấm sang
    // Công nợ lại trống trơn.
    const [chuaDong] = await pool.query(
      `SELECT o.id, o.ho_ten, o.gia_thang, p.ten_phong, t.ten AS toa_ten
         FROM ktx_o o
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
         ${req.nhanSuId ? 'JOIN du_hoc_ho_so hs ON hs.id = o.ho_so_id' : ''}
        WHERE t.org_id = ? AND o.trang_thai = 'dang-o' AND o.gia_thang > 0
          ${req.nhanSuId ? 'AND hs.tu_van_id = ?' : ''}
          AND NOT EXISTS (
            SELECT 1 FROM ktx_thu_tien tt
             WHERE tt.o_id = o.id AND tt.ky = ? AND tt.loai = 'tien-phong'
          )
        ORDER BY t.ten, p.ten_phong, o.ho_ten`,
      [orgId, ...(req.nhanSuId ? [req.nhanSuId] : []), kyNay]
    );
    const [[thuThang]] = await pool.query(
      `SELECT COALESCE(SUM(IF(tt.loai='hoan-coc', -tt.so_tien, tt.so_tien)), 0) tong
         FROM ktx_thu_tien tt
         JOIN ktx_o o ON o.id = tt.o_id
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
         ${req.nhanSuId ? 'JOIN du_hoc_ho_so hs ON hs.id = o.ho_so_id' : ''}
        WHERE t.org_id = ? AND tt.ky = ?${req.nhanSuId ? ' AND hs.tu_van_id = ?' : ''}`,
      [orgId, kyNay, ...(req.nhanSuId ? [req.nhanSuId] : [])]
    );
    res.json({
      ky: kyNay,
      so_toa: soToa.n, so_phong: soLieu.so_phong,
      tong_cho: Number(soLieu.tong_cho), dang_o: dangO.n,
      con_trong: Math.max(0, Number(soLieu.tong_cho) - dangO.n),
      thu_thang_nay: Number(thuThang.tong),
      chua_dong: chuaDong,
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ chua_migration: true, so_toa: 0, so_phong: 0, tong_cho: 0, dang_o: 0, con_trong: 0, thu_thang_nay: 0, chua_dong: [] });
    console.error('Lỗi tổng quan KTX:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được tổng quan ký túc xá.') });
  }
});

// ------------------------------------------------------------------ TOÀ

router.get('/ktx/toa', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.*,
              (SELECT COUNT(*) FROM ktx_phong p WHERE p.toa_id = t.id) AS so_phong,
              (SELECT COALESCE(SUM(p.suc_chua),0) FROM ktx_phong p
                WHERE p.toa_id = t.id AND p.trang_thai = 'dang-dung') AS tong_cho,
              (SELECT COUNT(*) FROM ktx_o o JOIN ktx_phong p ON p.id = o.phong_id
                WHERE p.toa_id = t.id AND o.trang_thai = 'dang-o') AS dang_o
         FROM ktx_toa t WHERE t.org_id = ?
        ORDER BY t.sort_order, t.ten`, [orgCua(req)]
    );
    res.json({ toa: rows });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ toa: [], chua_migration: true });
    console.error('Lỗi đọc toà KTX:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được danh sách toà.') });
  }
});

router.post('/ktx/toa', async (req, res) => {
  const { ten, dia_chi, ghi_chu } = req.body || {};
  const t = String(ten || '').trim();
  if (!t) return res.status(400).json({ error: 'Chưa nhập tên toà / cơ sở.' });
  try {
    const [r] = await pool.query(
      'INSERT INTO ktx_toa (org_id, ten, dia_chi, ghi_chu) VALUES (?,?,?,?)',
      [orgCua(req), t.slice(0, 120), String(dia_chi || '').slice(0, 300) || null, String(ghi_chu || '').slice(0, 500) || null]
    );
    res.json({ success: true, id: r.insertId });
  } catch (err) {
    console.error('Lỗi thêm toà KTX:', err);
    res.status(500).json({ error: loiBang(err, 'Không thêm được toà.') });
  }
});

router.put('/ktx/toa/:id', async (req, res) => {
  const { ten, dia_chi, ghi_chu, trang_thai } = req.body || {};
  const dat = []; const ts = [];
  if (ten !== undefined) {
    const t = String(ten || '').trim();
    if (!t) return res.status(400).json({ error: 'Tên toà không được để trống.' });
    dat.push('ten = ?'); ts.push(t.slice(0, 120));
  }
  if (dia_chi !== undefined) { dat.push('dia_chi = ?'); ts.push(String(dia_chi || '').slice(0, 300) || null); }
  if (ghi_chu !== undefined) { dat.push('ghi_chu = ?'); ts.push(String(ghi_chu || '').slice(0, 500) || null); }
  if (trang_thai !== undefined && ['dang-dung', 'dong'].includes(trang_thai)) { dat.push('trang_thai = ?'); ts.push(trang_thai); }
  if (!dat.length) return res.status(400).json({ error: 'Không có gì để sửa.' });
  try {
    const [r] = await pool.query(`UPDATE ktx_toa SET ${dat.join(', ')} WHERE id = ? AND org_id = ?`,
      [...ts, req.params.id, orgCua(req)]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy toà.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi sửa toà KTX:', err);
    res.status(500).json({ error: 'Không sửa được toà.' });
  }
});

// Xoá toà kéo theo phòng + người ở + lịch sử thu tiền (CASCADE). Chặn khi còn người đang ở:
// xoá nhầm là mất sạch lịch sử tiền phòng của họ, không lấy lại được.
router.delete('/ktx/toa/:id', async (req, res) => {
  try {
    const [[d]] = await pool.query(
      `SELECT COUNT(*) n FROM ktx_o o
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
        WHERE t.id = ? AND t.org_id = ? AND o.trang_thai = 'dang-o'`, [req.params.id, orgCua(req)]
    );
    if (d.n > 0) return res.status(409).json({ error: `Toà này còn ${d.n} người đang ở. Cho họ trả phòng trước, hoặc đổi trạng thái toà sang "Ngừng cho thuê".` });
    const [r] = await pool.query('DELETE FROM ktx_toa WHERE id = ? AND org_id = ?', [req.params.id, orgCua(req)]);
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy toà.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá toà KTX:', err);
    res.status(500).json({ error: 'Không xoá được toà.' });
  }
});

// ------------------------------------------------------------------ PHÒNG

router.get('/ktx/phong', async (req, res) => {
  const { toa_id } = req.query;
  const kyNay = new Date().toISOString().slice(0, 7);
  try {
    const dk = ['t.org_id = ?']; const ts = [orgCua(req)];
    if (toa_id) { dk.push('p.toa_id = ?'); ts.push(toa_id); }
    const [rows] = await pool.query(
      `SELECT p.*, t.ten AS toa_ten,
              (SELECT COUNT(*) FROM ktx_o o WHERE o.phong_id = p.id AND o.trang_thai='dang-o') AS dang_o,
              (SELECT COUNT(*) FROM ktx_o o
                WHERE o.phong_id = p.id AND o.trang_thai='dang-o' AND o.gia_thang > 0
                  AND NOT EXISTS (SELECT 1 FROM ktx_thu_tien tt
                                   WHERE tt.o_id = o.id AND tt.ky = ? AND tt.loai='tien-phong')
              ) AS no_thang_nay
         FROM ktx_phong p JOIN ktx_toa t ON t.id = p.toa_id
        WHERE ${dk.join(' AND ')}
        ORDER BY t.sort_order, t.ten, p.tang, p.ten_phong`, [kyNay, ...ts]
    );
    res.json({ phong: rows, ky: kyNay });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ phong: [], chua_migration: true });
    console.error('Lỗi đọc phòng KTX:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được danh sách phòng.') });
  }
});

router.get('/ktx/phong/:id', async (req, res) => {
  try {
    const p = await layPhong(req.params.id, orgCua(req));
    if (!p) return res.status(404).json({ error: 'Không tìm thấy phòng.' });
    // Sale / quản lý hồ sơ chỉ thấy DANH SÁCH học sinh của mình trong phòng. Họ vẫn cần biết
    // phòng còn mấy chỗ, nên số người đang ở được đếm RIÊNG trên toàn phòng (`so_dang_o` dưới
    // đây) — con số thì chia sẻ được, còn tên và điện thoại học sinh của đồng nghiệp thì không.
    const [nguoiO] = await pool.query(
      `SELECT o.*, h.ma_hs, h.buoc AS buoc_du_hoc
         FROM ktx_o o LEFT JOIN du_hoc_ho_so h ON h.id = o.ho_so_id
        WHERE o.phong_id = ?${req.nhanSuId ? ' AND h.tu_van_id = ?' : ''}
        ORDER BY o.trang_thai, o.ngay_vao DESC`,
      [req.params.id, ...(req.nhanSuId ? [req.nhanSuId] : [])]
    );
    const [[dem]] = await pool.query(
      "SELECT COUNT(*) AS n FROM ktx_o WHERE phong_id = ? AND trang_thai = 'dang-o'", [req.params.id]
    );
    const [thu] = await pool.query(
      `SELECT tt.id, tt.o_id, tt.ky, tt.loai, tt.so_tien, tt.ngay_thu, tt.hinh_thuc,
              tt.chung_tu, tt.ghi_chu, (tt.anh IS NOT NULL) AS co_anh,
              o.ho_ten, u.name AS nguoi_thu
         FROM ktx_thu_tien tt
         JOIN ktx_o o ON o.id = tt.o_id
         LEFT JOIN users u ON u.id = tt.nguoi_thu_id
         ${req.nhanSuId ? 'JOIN du_hoc_ho_so hs ON hs.id = o.ho_so_id' : ''}
        WHERE o.phong_id = ?${req.nhanSuId ? ' AND hs.tu_van_id = ?' : ''}
        ORDER BY tt.ngay_thu DESC, tt.id DESC LIMIT 200`,
      [req.params.id, ...(req.nhanSuId ? [req.nhanSuId] : [])]
    );
    res.json({ phong: p, nguoi_o: nguoiO, thu_tien: thu, so_dang_o: dem.n });
  } catch (err) {
    console.error('Lỗi đọc chi tiết phòng:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được chi tiết phòng.') });
  }
});

router.post('/ktx/phong', async (req, res) => {
  const { toa_id, ten_phong, tang, suc_chua, loai, gia_thang, tien_ich, ghi_chu } = req.body || {};
  const ten = String(ten_phong || '').trim();
  if (!toa_id || !ten) return res.status(400).json({ error: 'Chưa chọn toà hoặc chưa nhập tên phòng.' });
  const sc = parseInt(suc_chua, 10);
  if (!Number.isFinite(sc) || sc < 1 || sc > 50) return res.status(400).json({ error: 'Sức chứa phải từ 1 đến 50.' });
  try {
    // Toà phải thuộc tổ chức này — không kiểm thì thêm được phòng vào toà của trung tâm khác.
    const [t] = await pool.query('SELECT id FROM ktx_toa WHERE id = ? AND org_id = ?', [toa_id, orgCua(req)]);
    if (!t.length) return res.status(404).json({ error: 'Không tìm thấy toà.' });
    const [r] = await pool.query(
      `INSERT INTO ktx_phong (toa_id, ten_phong, tang, suc_chua, loai, gia_thang, tien_ich, ghi_chu)
       VALUES (?,?,?,?,?,?,?,?)`,
      [toa_id, ten.slice(0, 60), String(tang || '').slice(0, 20) || null, sc,
       ['nam', 'nu', 'chung'].includes(loai) ? loai : 'chung',
       soTien(gia_thang, true) ?? 0, String(tien_ich || '').slice(0, 300) || null,
       String(ghi_chu || '').slice(0, 500) || null]
    );
    res.json({ success: true, id: r.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Toà này đã có phòng trùng tên.' });
    console.error('Lỗi thêm phòng KTX:', err);
    res.status(500).json({ error: loiBang(err, 'Không thêm được phòng.') });
  }
});

router.put('/ktx/phong/:id', async (req, res) => {
  const { ten_phong, tang, suc_chua, loai, gia_thang, tien_ich, ghi_chu, trang_thai } = req.body || {};
  try {
    const p = await layPhong(req.params.id, orgCua(req));
    if (!p) return res.status(404).json({ error: 'Không tìm thấy phòng.' });
    const dat = []; const ts = [];
    if (ten_phong !== undefined) {
      const t = String(ten_phong || '').trim();
      if (!t) return res.status(400).json({ error: 'Tên phòng không được để trống.' });
      dat.push('ten_phong = ?'); ts.push(t.slice(0, 60));
    }
    if (tang !== undefined) { dat.push('tang = ?'); ts.push(String(tang || '').slice(0, 20) || null); }
    if (suc_chua !== undefined) {
      const sc = parseInt(suc_chua, 10);
      if (!Number.isFinite(sc) || sc < 1 || sc > 50) return res.status(400).json({ error: 'Sức chứa phải từ 1 đến 50.' });
      // Không cho hạ sức chứa xuống dưới số người ĐANG Ở — phòng "5/4 người" là con số vô nghĩa
      // và làm mọi phép tính chỗ trống ra số âm.
      const [[d]] = await pool.query("SELECT COUNT(*) n FROM ktx_o WHERE phong_id = ? AND trang_thai='dang-o'", [req.params.id]);
      if (sc < d.n) return res.status(400).json({ error: `Phòng đang có ${d.n} người ở, không đặt sức chứa nhỏ hơn được.` });
      dat.push('suc_chua = ?'); ts.push(sc);
    }
    if (loai !== undefined && ['nam', 'nu', 'chung'].includes(loai)) { dat.push('loai = ?'); ts.push(loai); }
    if (gia_thang !== undefined) { dat.push('gia_thang = ?'); ts.push(soTien(gia_thang, true) ?? 0); }
    if (tien_ich !== undefined) { dat.push('tien_ich = ?'); ts.push(String(tien_ich || '').slice(0, 300) || null); }
    if (ghi_chu !== undefined) { dat.push('ghi_chu = ?'); ts.push(String(ghi_chu || '').slice(0, 500) || null); }
    if (trang_thai !== undefined && ['dang-dung', 'bao-tri', 'dong'].includes(trang_thai)) { dat.push('trang_thai = ?'); ts.push(trang_thai); }
    if (!dat.length) return res.status(400).json({ error: 'Không có gì để sửa.' });
    await pool.query(`UPDATE ktx_phong SET ${dat.join(', ')} WHERE id = ?`, [...ts, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Toà này đã có phòng trùng tên.' });
    console.error('Lỗi sửa phòng KTX:', err);
    res.status(500).json({ error: 'Không sửa được phòng.' });
  }
});

router.delete('/ktx/phong/:id', async (req, res) => {
  try {
    const p = await layPhong(req.params.id, orgCua(req));
    if (!p) return res.status(404).json({ error: 'Không tìm thấy phòng.' });
    const [[d]] = await pool.query("SELECT COUNT(*) n FROM ktx_o WHERE phong_id = ? AND trang_thai='dang-o'", [req.params.id]);
    if (d.n > 0) return res.status(409).json({ error: `Phòng còn ${d.n} người đang ở. Cho trả phòng trước khi xoá.` });
    await pool.query('DELETE FROM ktx_phong WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá phòng KTX:', err);
    res.status(500).json({ error: 'Không xoá được phòng.' });
  }
});

// ------------------------------------------------------------------ NGƯỜI Ở

router.post('/ktx/phong/:id/nguoi', async (req, res) => {
  const { ho_ten, phone, ho_so_id, user_id, ngay_vao, gia_thang, tien_coc, ghi_chu } = req.body || {};
  const ten = String(ho_ten || '').trim();
  if (!ten) return res.status(400).json({ error: 'Chưa nhập họ tên người ở.' });
  const nv = ngay(ngay_vao);
  if (!nv) return res.status(400).json({ error: 'Ngày vào ở không hợp lệ.' });
  try {
    const orgId = orgCua(req);
    const p = await layPhong(req.params.id, orgId);
    if (!p) return res.status(404).json({ error: 'Không tìm thấy phòng.' });
    if (p.trang_thai !== 'dang-dung') return res.status(400).json({ error: 'Phòng này đang bảo trì hoặc ngừng cho thuê.' });

    const [[d]] = await pool.query("SELECT COUNT(*) n FROM ktx_o WHERE phong_id = ? AND trang_thai='dang-o'", [p.id]);
    if (d.n >= p.suc_chua) return res.status(409).json({ error: `Phòng đã đủ ${p.suc_chua} người.` });

    // Hồ sơ du học (nếu có gắn) phải cùng tổ chức — không kiểm thì gắn được hồ sơ của trung tâm
    // khác rồi đọc thông tin bên đó, đúng lỗ hổng đã vá ở 4.49.
    let hsId = null;
    if (ho_so_id) {
      // `ho_so_id` nằm trong BODY nên bảng quyền không chặn được — kiểm tại đây. Thiếu dòng
      // `tu_van_id` này thì một sale xếp học sinh của sale khác vào phòng, và từ đó đọc được
      // tên, điện thoại, tiền phòng của em đó qua màn hình ký túc xá.
      const [h] = await pool.query(
        'SELECT id FROM du_hoc_ho_so WHERE id = ? AND org_id = ?'
        + (req.nhanSuId ? ' AND tu_van_id = ?' : ''),
        [ho_so_id, orgId, ...(req.nhanSuId ? [req.nhanSuId] : [])]);
      if (!h.length) return res.status(400).json({ error: 'Hồ sơ du học không hợp lệ.' });
      const [dangO] = await pool.query("SELECT id FROM ktx_o WHERE ho_so_id = ? AND trang_thai='dang-o'", [ho_so_id]);
      if (dangO.length) return res.status(409).json({ error: 'Học sinh này đang ở một phòng khác. Cho trả phòng cũ trước.' });
      hsId = h[0].id;
    }
    let uId = null;
    if (user_id) {
      const [u] = await pool.query('SELECT id FROM users WHERE id = ? AND org_id = ?', [user_id, orgId]);
      if (!u.length) return res.status(400).json({ error: 'Tài khoản học viên không hợp lệ.' });
      uId = u[0].id;
    }
    // Giá CHỐT cho người này: không truyền thì chép giá niêm yết của phòng tại thời điểm vào ở.
    const gia = gia_thang === undefined || gia_thang === null || gia_thang === '' ? p.gia_thang : (soTien(gia_thang, true) ?? 0);
    const [r] = await pool.query(
      `INSERT INTO ktx_o (phong_id, ho_so_id, user_id, ho_ten, phone, ngay_vao, gia_thang, tien_coc, ghi_chu)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [p.id, hsId, uId, ten.slice(0, 120), String(phone || '').slice(0, 30) || null, nv,
       gia, soTien(tien_coc, true) ?? 0, String(ghi_chu || '').slice(0, 500) || null]
    );
    res.json({ success: true, id: r.insertId });
  } catch (err) {
    console.error('Lỗi xếp người vào phòng:', err);
    res.status(500).json({ error: loiBang(err, 'Không xếp được người vào phòng.') });
  }
});

router.put('/ktx/nguoi/:id', async (req, res) => {
  const { ho_ten, phone, gia_thang, tien_coc, ghi_chu, ngay_ra, trang_thai } = req.body || {};
  try {
    const o = await layO(req.params.id, orgCua(req));
    if (!o) return res.status(404).json({ error: 'Không tìm thấy người ở.' });
    const dat = []; const ts = [];
    if (ho_ten !== undefined) {
      const t = String(ho_ten || '').trim();
      if (!t) return res.status(400).json({ error: 'Họ tên không được để trống.' });
      dat.push('ho_ten = ?'); ts.push(t.slice(0, 120));
    }
    if (phone !== undefined) { dat.push('phone = ?'); ts.push(String(phone || '').slice(0, 30) || null); }
    if (gia_thang !== undefined) { dat.push('gia_thang = ?'); ts.push(soTien(gia_thang, true) ?? 0); }
    if (tien_coc !== undefined) { dat.push('tien_coc = ?'); ts.push(soTien(tien_coc, true) ?? 0); }
    if (ghi_chu !== undefined) { dat.push('ghi_chu = ?'); ts.push(String(ghi_chu || '').slice(0, 500) || null); }
    if (ngay_ra !== undefined) {
      const nr = ngay(ngay_ra);
      if (ngay_ra && !nr) return res.status(400).json({ error: 'Ngày trả phòng không hợp lệ.' });
      dat.push('ngay_ra = ?'); ts.push(nr);
    }
    if (trang_thai !== undefined && ['dang-o', 'da-tra'].includes(trang_thai)) {
      dat.push('trang_thai = ?'); ts.push(trang_thai);
      // Trả phòng mà chưa ghi ngày ra thì lấy hôm nay — để trống là sau này không ai biết em đó
      // ở tới bao giờ, mà đó chính là căn cứ tính tiền tháng cuối.
      if (trang_thai === 'da-tra' && ngay_ra === undefined && !o.ngay_ra) {
        dat.push('ngay_ra = ?'); ts.push(new Date().toISOString().slice(0, 10));
      }
    }
    if (!dat.length) return res.status(400).json({ error: 'Không có gì để sửa.' });
    await pool.query(`UPDATE ktx_o SET ${dat.join(', ')} WHERE id = ?`, [...ts, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi sửa người ở:', err);
    res.status(500).json({ error: 'Không sửa được thông tin người ở.' });
  }
});

router.delete('/ktx/nguoi/:id', async (req, res) => {
  try {
    const o = await layO(req.params.id, orgCua(req));
    if (!o) return res.status(404).json({ error: 'Không tìm thấy người ở.' });
    const [[d]] = await pool.query('SELECT COUNT(*) n FROM ktx_thu_tien WHERE o_id = ?', [req.params.id]);
    if (d.n > 0) return res.status(409).json({ error: `Đã có ${d.n} khoản thu gắn với người này. Chuyển sang "Đã trả phòng" thay vì xoá để giữ lịch sử tiền.` });
    await pool.query('DELETE FROM ktx_o WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá người ở:', err);
    res.status(500).json({ error: 'Không xoá được người ở.' });
  }
});

// ------------------------------------------------------------------ THU TIỀN

router.post('/ktx/nguoi/:id/thu-tien', async (req, res) => {
  const { ky: k, loai, so_tien, ngay_thu, hinh_thuc, chung_tu, ghi_chu, anh } = req.body || {};
  const kyThu = ky(k);
  if (!kyThu) return res.status(400).json({ error: 'Kỳ thu không hợp lệ (định dạng 2026-09).' });
  const tien = soTien(so_tien);
  if (!tien) return res.status(400).json({ error: 'Số tiền phải là số dương.' });
  const nt = ngay(ngay_thu);
  if (!nt) return res.status(400).json({ error: 'Ngày thu không hợp lệ.' });
  if (anh && anh.length > ANH_TOI_DA) return res.status(413).json({ error: 'Ảnh biên lai quá lớn.' });
  try {
    const o = await layO(req.params.id, orgCua(req));
    if (!o) return res.status(404).json({ error: 'Không tìm thấy người ở.' });
    const [r] = await pool.query(
      `INSERT INTO ktx_thu_tien (o_id, ky, loai, so_tien, ngay_thu, hinh_thuc, chung_tu, nguoi_thu_id, ghi_chu, anh, anh_luc)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [o.id, kyThu, LOAI_THU.includes(loai) ? loai : 'tien-phong', tien, nt,
       HINH_THUC.includes(hinh_thuc) ? hinh_thuc : 'tien-mat',
       String(chung_tu || '').slice(0, 60) || null, req.userId,
       String(ghi_chu || '').slice(0, 500) || null, anh || null, anh ? new Date() : null]
    );
    res.json({ success: true, id: r.insertId });
  } catch (err) {
    console.error('Lỗi thu tiền KTX:', err);
    res.status(500).json({ error: loiBang(err, 'Không ghi được khoản thu.') });
  }
});

router.delete('/ktx/thu-tien/:id', async (req, res) => {
  try {
    // JOIN ngược lên toà ngay trong câu DELETE là chỗ chặn quyền.
    const [r] = await pool.query(
      `DELETE tt FROM ktx_thu_tien tt
         JOIN ktx_o o ON o.id = tt.o_id
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
        WHERE tt.id = ? AND t.org_id = ?`, [req.params.id, orgCua(req)]
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Không tìm thấy khoản thu.' });
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá khoản thu KTX:', err);
    res.status(500).json({ error: 'Không xoá được khoản thu.' });
  }
});

router.get('/ktx/thu-tien/:id/anh', async (req, res) => {
  try {
    const [r] = await pool.query(
      `SELECT tt.anh FROM ktx_thu_tien tt
         JOIN ktx_o o ON o.id = tt.o_id
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
        WHERE tt.id = ? AND t.org_id = ?`, [req.params.id, orgCua(req)]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy khoản thu.' });
    if (!r[0].anh) return res.status(404).json({ error: 'Khoản thu này chưa có ảnh.' });
    res.json({ anh: r[0].anh });
  } catch (err) {
    console.error('Lỗi đọc ảnh biên lai KTX:', err);
    res.status(500).json({ error: 'Không đọc được ảnh.' });
  }
});

/**
 * GET /ktx/cong-no?tu=2026-01&den=2026-12
 * Bảng người ở × các tháng — màn hình dùng nhiều nhất mỗi ngày: nhìn một lần biết tháng nào ai
 * chưa nộp. Dựng ma trận trong JS thay vì PIVOT trong SQL: số cột đổi theo khoảng người dùng
 * chọn, mà MySQL không có pivot động.
 */
router.get('/ktx/cong-no', async (req, res) => {
  const nay = new Date();
  const denKy = ky(req.query.den) || nay.toISOString().slice(0, 7);
  let tuKy = ky(req.query.tu);
  if (!tuKy) {
    const d = new Date(`${denKy}-01T00:00:00Z`);
    d.setUTCMonth(d.getUTCMonth() - 5);
    tuKy = d.toISOString().slice(0, 7);
  }
  if (tuKy > denKy) return res.status(400).json({ error: 'Kỳ bắt đầu phải trước kỳ kết thúc.' });

  // Dựng danh sách kỳ, chặn trên 24 tháng — bảng rộng hơn thế thì không ai đọc nổi.
  const cacKy = [];
  const d = new Date(`${tuKy}-01T00:00:00Z`);
  const het = new Date(`${denKy}-01T00:00:00Z`);
  while (d <= het && cacKy.length < 24) {
    cacKy.push(d.toISOString().slice(0, 7));
    d.setUTCMonth(d.getUTCMonth() + 1);
  }
  try {
    const orgId = orgCua(req);
    const [nguoi] = await pool.query(
      `SELECT o.id, o.ho_ten, o.gia_thang, o.ngay_vao, o.ngay_ra, o.trang_thai,
              p.ten_phong, t.ten AS toa_ten
         FROM ktx_o o
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
         ${req.nhanSuId ? 'JOIN du_hoc_ho_so hs ON hs.id = o.ho_so_id' : ''}
        WHERE t.org_id = ?${req.nhanSuId ? ' AND hs.tu_van_id = ?' : ''}
        ORDER BY o.trang_thai, t.ten, p.ten_phong, o.ho_ten`,
      [orgId, ...(req.nhanSuId ? [req.nhanSuId] : [])]
    );
    const [daThu] = await pool.query(
      `SELECT tt.o_id, tt.ky,
              SUM(IF(tt.loai='hoan-coc', -tt.so_tien, tt.so_tien)) AS tong,
              SUM(IF(tt.loai='tien-phong', tt.so_tien, 0)) AS tien_phong
         FROM ktx_thu_tien tt
         JOIN ktx_o o ON o.id = tt.o_id
         JOIN ktx_phong p ON p.id = o.phong_id
         JOIN ktx_toa t ON t.id = p.toa_id
         ${req.nhanSuId ? 'JOIN du_hoc_ho_so hs ON hs.id = o.ho_so_id' : ''}
        WHERE t.org_id = ? AND tt.ky BETWEEN ? AND ?${req.nhanSuId ? ' AND hs.tu_van_id = ?' : ''}
        GROUP BY tt.o_id, tt.ky`,
      [orgId, cacKy[0], cacKy[cacKy.length - 1], ...(req.nhanSuId ? [req.nhanSuId] : [])]
    );
    const tra = new Map();
    for (const r of daThu) tra.set(`${r.o_id}|${r.ky}`, { tong: Number(r.tong), tien_phong: Number(r.tien_phong) });

    const bang = nguoi.map((n) => {
      const vao = String(n.ngay_vao instanceof Date ? n.ngay_vao.toISOString().slice(0, 7) : n.ngay_vao).slice(0, 7);
      const ra = n.ngay_ra ? String(n.ngay_ra instanceof Date ? n.ngay_ra.toISOString().slice(0, 7) : n.ngay_ra).slice(0, 7) : null;
      const o = cacKy.map((k) => {
        // Kỳ nằm ngoài thời gian ở thì KHÔNG phải nợ — ô trống, không tô đỏ. Bỏ phép kiểm này
        // là người mới vào tháng 9 bị báo nợ cả 8 tháng đầu năm.
        if (k < vao || (ra && k > ra)) return { ky: k, ngoai: true };
        const t = tra.get(`${n.id}|${k}`);
        const daDong = t ? t.tien_phong > 0 : false;
        return { ky: k, ngoai: false, da_dong: daDong, thu: t ? t.tong : 0, can: Number(n.gia_thang) || 0 };
      });
      return { ...n, gia_thang: Number(n.gia_thang), o };
    });
    res.json({ cac_ky: cacKy, bang });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ cac_ky: cacKy, bang: [], chua_migration: true });
    console.error('Lỗi bảng công nợ KTX:', err);
    res.status(500).json({ error: loiBang(err, 'Không dựng được bảng công nợ.') });
  }
});

/** Danh sách hồ sơ du học để gắn khi xếp phòng. Chỉ trả những em CHƯA ở phòng nào. */
router.get('/ktx/ho-so-chon', async (req, res) => {
  const tim = String(req.query.tim || '').trim();
  try {
    const ts = [orgCua(req)];
    let dk = '';
    if (req.nhanSuId) { dk += ' AND h.tu_van_id = ?'; ts.push(req.nhanSuId); }
    if (tim) { dk += ' AND (h.ho_ten LIKE ? OR h.ma_hs LIKE ? OR h.phone LIKE ?)'; const k = `%${tim}%`; ts.push(k, k, k); }
    const [rows] = await pool.query(
      `SELECT h.id, h.ma_hs, h.ho_ten, h.phone, h.user_id,
              (SELECT p.ten_phong FROM ktx_o o JOIN ktx_phong p ON p.id = o.phong_id
                WHERE o.ho_so_id = h.id AND o.trang_thai='dang-o' LIMIT 1) AS phong_dang_o
         FROM du_hoc_ho_so h
        WHERE h.org_id = ? AND h.buoc NOT IN ('hoan-thanh','huy')${dk}
        ORDER BY h.ho_ten LIMIT 50`, ts
    );
    res.json({ ho_so: rows });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ ho_so: [] });
    console.error('Lỗi đọc hồ sơ để gắn KTX:', err);
    res.status(500).json({ error: 'Không đọc được danh sách hồ sơ.' });
  }
});

export default router;
