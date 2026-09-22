// =============================================================
// ĐỀ BÀI TẬP / BÀI KIỂM TRA TỰ SOẠN — phía GIÁO VIÊN & QUẢN TRỊ (2026-09-17)
// =============================================================
// Mount ở /api/admin nên đường dẫn thật là /api/admin/de-bai/...
//
// PHÂN QUYỀN (chốt với chủ dự án 17/09/2026):
//   - Giáo viên TẠO được đề, nhưng chỉ đụng được đề CHÍNH MÌNH tạo (`qua: 'de'` trong bảng QUYEN)
//     và chỉ giao cho lớp mình phụ trách.
//   - Quản trị trung tâm: mọi đề và mọi lớp của tổ chức mình.
//
// ⚠️ `class_id` khi giao đề nằm trong BODY nên regex của bảng QUYEN không bắt được — route này
//    PHẢI tự gọi `lopThuocPhamVi()`. Quên bước đó là giáo viên A giao đề vào lớp của giáo viên B.
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import {
  loadRole, requireStaff, phamViQuanTri, lopThuocPhamVi, hocVienThuocPhamVi,
} from '../middleware/roles.js';
import { DANG_CAU, chamBai } from '../utils/cham-de.js';

const router = Router();

// ⚠️ BỘ LỌC ĐƯỜNG DẪN — PHẢI đứng TRƯỚC mọi middleware khác của router này.
// Nhiều router cùng mount ở '/api/admin', mà `router.use(mw)` KHÔNG giới hạn theo đường dẫn:
// middleware của router này sẽ chạy cho MỌI request tới /api/admin/*, kể cả những khu do router
// khác phục vụ. Hệ quả thật đã bắt được 17/09/2026: `requireOrgAdmin` của routes/du-hoc.js chặn
// giáo viên ở khu đề bài (mount sau nó) với thông báo "Chức năng này dành cho quản trị viên" —
// trong khi khu đó vốn cho phép giáo viên.
// Không dùng `router.use('/de-bai', mw)` vì Express cắt tiền tố khỏi `req.path`, mà
// `phamViQuanTri` lại tra bảng QUYEN bằng chính `req.path` -> mọi luật hết khớp.
// `next('router')` thoát hẳn router này và trả quyền điều khiển về app để đi tiếp router sau.
router.use((req, res, next) => (/^\/(de-bai|de-cau-hoi|de-giao|de-bai-lam)(\/|$)/.test(req.path) ? next() : next('router')));
router.use(requireAuth, loadRole, requireStaff, phamViQuanTri);

const ANH_TOI_DA = 900_000;

function loiBang(err, macDinh) {
  if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR')) {
    return 'DB chưa có bảng đề bài. Chạy `npm run db:migrate:prod` rồi thử lại.';
  }
  return macDinh;
}
const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

/** Giáo viên chỉ thấy đề mình tạo — để danh sách khớp đúng với thứ bấm vào được (tránh 403 lạ). */
function dkDe(req) {
  return req.role === 'teacher'
    ? { sql: ' AND d.org_id = ? AND d.tao_boi = ?', ts: [req.orgId, req.userId] }
    : { sql: ' AND d.org_id = ?', ts: [req.orgId] };
}

async function maDeKeTiep(conn, orgId) {
  const [r] = await conn.query(
    `SELECT ma FROM de_bai WHERE org_id = ? AND ma LIKE 'DE-%'
      ORDER BY CAST(SUBSTRING(ma, 4) AS UNSIGNED) DESC LIMIT 1 FOR UPDATE`, [orgId]
  );
  const so = r.length ? parseInt(String(r[0].ma).slice(3), 10) + 1 : 1;
  return `DE-${String(so).padStart(4, '0')}`;
}

/** mysql2 trả cột JSON lúc là object lúc là chuỗi tuỳ phiên bản — đỡ cả hai. */
function docJson(v, macDinh) {
  if (v === null || v === undefined) return macDinh;
  if (typeof v === 'string') { try { return JSON.parse(v); } catch { return macDinh; } }
  return v;
}

/**
 * Kiểm tra và chuẩn hoá một câu hỏi trước khi ghi.
 * Trả `{ loi }` hoặc `{ ok: {...} }`. Kiểm ở đây là lưới DUY NHẤT — không có ràng buộc DB nào
 * bắt được "câu 1 đáp án mà đáp án trỏ ra ngoài danh sách lựa chọn".
 */
function kiemCauHoi(body) {
  const loai = DANG_CAU.includes(body.loai) ? body.loai : 'mot-dap-an';
  const noiDung = String(body.noi_dung || '').trim();
  if (!noiDung) return { loi: 'Chưa nhập nội dung câu hỏi.' };
  const diem = Number(body.diem);
  if (!Number.isFinite(diem) || diem <= 0 || diem > 100) return { loi: 'Điểm mỗi câu phải từ 0 đến 100.' };
  if (body.anh && body.anh.length > ANH_TOI_DA) return { loi: 'Ảnh minh hoạ quá lớn.' };

  let luaChon = null; let dapAn = null;

  if (loai === 'tu-luan') {
    // Không lựa chọn, không đáp án — giáo viên chấm tay.
  } else if (loai === 'dien-tu') {
    const ds = (Array.isArray(body.dap_an) ? body.dap_an : [body.dap_an])
      .map((x) => String(x ?? '').trim()).filter(Boolean);
    if (!ds.length) return { loi: 'Câu điền từ phải có ít nhất một đáp án.' };
    dapAn = ds.slice(0, 10);
  } else {
    const ds = (Array.isArray(body.lua_chon) ? body.lua_chon : [])
      .map((x) => String(x ?? '').trim());
    if (loai === 'dung-sai') {
      luaChon = ['Đúng', 'Sai'];
    } else {
      // Bỏ lựa chọn trống ở cuối (form hay để sẵn 4 ô mà giáo viên chỉ điền 3).
      const sach = ds.filter((x) => x !== '');
      if (sach.length < 2) return { loi: 'Câu trắc nghiệm phải có ít nhất 2 lựa chọn.' };
      if (sach.length > 10) return { loi: 'Tối đa 10 lựa chọn cho một câu.' };
      luaChon = sach;
    }
    const idx = (Array.isArray(body.dap_an) ? body.dap_an : [body.dap_an])
      .map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n < luaChon.length);
    if (!idx.length) return { loi: 'Chưa chọn đáp án đúng.' };
    if (loai !== 'nhieu-dap-an' && idx.length > 1) return { loi: 'Dạng câu này chỉ có một đáp án đúng.' };
    dapAn = [...new Set(idx)].sort((a, b) => a - b);
  }

  return {
    ok: {
      loai, noi_dung: noiDung.slice(0, 5000), diem,
      lua_chon: luaChon ? JSON.stringify(luaChon) : null,
      dap_an: dapAn ? JSON.stringify(dapAn) : null,
      giai_thich: String(body.giai_thich || '').slice(0, 1000) || null,
      anh: body.anh || null,
    },
  };
}

// ------------------------------------------------------------------ ĐỀ

router.get('/de-bai', async (req, res) => {
  try {
    const d = dkDe(req);
    const [rows] = await pool.query(
      `SELECT d.id, d.ma, d.tieu_de, d.loai, d.thoi_gian_phut, d.so_lan_lam, d.trang_thai,
              d.created_at, d.tao_boi, u.name AS nguoi_tao,
              (SELECT COUNT(*) FROM de_cau_hoi c WHERE c.de_id = d.id) AS so_cau,
              (SELECT COALESCE(SUM(c.diem),0) FROM de_cau_hoi c WHERE c.de_id = d.id) AS tong_diem,
              (SELECT COUNT(*) FROM de_giao g WHERE g.de_id = d.id) AS so_lan_giao,
              (SELECT COUNT(*) FROM de_bai_lam b WHERE b.de_id = d.id AND b.trang_thai <> 'dang-lam') AS so_bai_nop
         FROM de_bai d LEFT JOIN users u ON u.id = d.tao_boi
        WHERE 1=1${d.sql}
        ORDER BY d.created_at DESC`, d.ts
    );
    res.json({ de: rows });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ de: [], chua_migration: true });
    console.error('Lỗi đọc danh sách đề:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được danh sách đề.') });
  }
});

router.post('/de-bai', async (req, res) => {
  const { tieu_de, mo_ta, loai, thoi_gian_phut, tron_cau, tron_dap_an, so_lan_lam, hien_dap_an, diem_dat } = req.body || {};
  const td = String(tieu_de || '').trim();
  if (!td) return res.status(400).json({ error: 'Chưa nhập tiêu đề đề bài.' });
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const ma = await maDeKeTiep(conn, req.orgId);
    const tg = thoi_gian_phut === '' || thoi_gian_phut === null || thoi_gian_phut === undefined
      ? null : Math.max(1, Math.min(600, parseInt(thoi_gian_phut, 10) || 0)) || null;
    const [r] = await conn.query(
      `INSERT INTO de_bai (org_id, ma, tieu_de, mo_ta, loai, thoi_gian_phut, tron_cau, tron_dap_an,
                           so_lan_lam, hien_dap_an, diem_dat, tao_boi)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [req.orgId, ma, td.slice(0, 200), String(mo_ta || '').slice(0, 1000) || null,
       ['bai-tap', 'kiem-tra'].includes(loai) ? loai : 'bai-tap', tg,
       tron_cau ? 1 : 0, tron_dap_an ? 1 : 0,
       Math.max(0, Math.min(99, parseInt(so_lan_lam, 10) || 1)),
       ['ngay', 'sau-han', 'khong'].includes(hien_dap_an) ? hien_dap_an : 'ngay',
       Math.max(0, Math.min(100, Number(diem_dat) || 50)), req.userId]
    );
    await conn.commit();
    res.json({ success: true, id: r.insertId, ma });
  } catch (err) {
    await conn.rollback().catch(() => {});
    console.error('Lỗi tạo đề:', err);
    res.status(500).json({ error: loiBang(err, 'Không tạo được đề.') });
  } finally { conn.release(); }
});

// ⚠️ PHẢI khai TRƯỚC '/de-bai/:id' — Express khớp theo thứ tự, để sau thì đường dẫn này rơi
// vào route tham số với id = 'hoc-vien-chon' và luôn trả 404 mà không lỗi nào hiện ra.
/** Học sinh để chọn khi giao riêng. Giáo viên chỉ thấy học sinh lớp mình. */
router.get('/de-bai/hoc-vien-chon', async (req, res) => {
  const tim = String(req.query.tim || '').trim();
  try {
    const ts = []; let sql;
    if (req.role === 'teacher') {
      sql = `SELECT DISTINCT u.id, u.name, u.email, c.name AS lop
               FROM users u
               JOIN class_enrollments ce ON ce.user_id = u.id
               JOIN classes c ON c.id = ce.class_id
              WHERE c.teacher_id = ?`;
      ts.push(req.userId);
    } else {
      sql = `SELECT u.id, u.name, u.email,
                    (SELECT c.name FROM class_enrollments ce JOIN classes c ON c.id = ce.class_id
                      WHERE ce.user_id = u.id LIMIT 1) AS lop
               FROM users u
              WHERE u.org_id = ? AND u.role = 'student'`;
      ts.push(req.orgId);
    }
    if (tim) { sql += ' AND (u.name LIKE ? OR u.email LIKE ?)'; const k = `%${tim}%`; ts.push(k, k); }
    sql += ' ORDER BY u.name LIMIT 50';
    const [rows] = await pool.query(sql, ts);
    res.json({ hoc_vien: rows });
  } catch (err) {
    console.error('Lỗi đọc học viên để giao đề:', err);
    res.status(500).json({ error: 'Không đọc được danh sách học viên.' });
  }
});

router.get('/de-bai/:id', async (req, res) => {
  try {
    const [d] = await pool.query('SELECT * FROM de_bai WHERE id = ?', [req.params.id]);
    if (!d.length) return res.status(404).json({ error: 'Không tìm thấy đề.' });
    // Màn soạn đề CẦN thấy đáp án (giáo viên đang soạn), nhưng KHÔNG cần ảnh base64 trong danh
    // sách — ảnh lấy riêng khi bấm xem.
    const [cau] = await pool.query(
      `SELECT id, sort_order, loai, noi_dung, lua_chon, dap_an, diem, giai_thich,
              (anh IS NOT NULL) AS co_anh
         FROM de_cau_hoi WHERE de_id = ? ORDER BY sort_order, id`, [req.params.id]
    );
    const [giao] = await pool.query(
      `SELECT g.id, g.class_id, g.user_id, g.mo_luc, g.dong_luc, g.ghi_chu, g.created_at,
              c.name AS lop_ten, u.name AS hoc_vien_ten,
              (SELECT COUNT(*) FROM de_bai_lam b WHERE b.giao_id = g.id AND b.trang_thai <> 'dang-lam') AS da_nop
         FROM de_giao g
         LEFT JOIN classes c ON c.id = g.class_id
         LEFT JOIN users u ON u.id = g.user_id
        WHERE g.de_id = ? ORDER BY g.created_at DESC`, [req.params.id]
    );
    res.json({
      de: d[0],
      cau_hoi: cau.map((c) => ({ ...c, lua_chon: docJson(c.lua_chon, null), dap_an: docJson(c.dap_an, null) })),
      giao,
    });
  } catch (err) {
    console.error('Lỗi đọc chi tiết đề:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được đề.') });
  }
});

router.put('/de-bai/:id', async (req, res) => {
  const b = req.body || {};
  const dat = []; const ts = [];
  if (b.tieu_de !== undefined) {
    const t = String(b.tieu_de || '').trim();
    if (!t) return res.status(400).json({ error: 'Tiêu đề không được để trống.' });
    dat.push('tieu_de = ?'); ts.push(t.slice(0, 200));
  }
  if (b.mo_ta !== undefined) { dat.push('mo_ta = ?'); ts.push(String(b.mo_ta || '').slice(0, 1000) || null); }
  if (b.loai !== undefined && ['bai-tap', 'kiem-tra'].includes(b.loai)) { dat.push('loai = ?'); ts.push(b.loai); }
  if (b.thoi_gian_phut !== undefined) {
    const tg = b.thoi_gian_phut === '' || b.thoi_gian_phut === null
      ? null : Math.max(1, Math.min(600, parseInt(b.thoi_gian_phut, 10) || 0)) || null;
    dat.push('thoi_gian_phut = ?'); ts.push(tg);
  }
  if (b.tron_cau !== undefined) { dat.push('tron_cau = ?'); ts.push(b.tron_cau ? 1 : 0); }
  if (b.tron_dap_an !== undefined) { dat.push('tron_dap_an = ?'); ts.push(b.tron_dap_an ? 1 : 0); }
  if (b.so_lan_lam !== undefined) { dat.push('so_lan_lam = ?'); ts.push(Math.max(0, Math.min(99, parseInt(b.so_lan_lam, 10) || 0))); }
  if (b.hien_dap_an !== undefined && ['ngay', 'sau-han', 'khong'].includes(b.hien_dap_an)) { dat.push('hien_dap_an = ?'); ts.push(b.hien_dap_an); }
  if (b.diem_dat !== undefined) { dat.push('diem_dat = ?'); ts.push(Math.max(0, Math.min(100, Number(b.diem_dat) || 0))); }
  if (!dat.length) return res.status(400).json({ error: 'Không có gì để sửa.' });
  try {
    await pool.query(`UPDATE de_bai SET ${dat.join(', ')} WHERE id = ?`, [...ts, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi sửa đề:', err);
    res.status(500).json({ error: 'Không sửa được đề.' });
  }
});

router.post('/de-bai/:id/phat-hanh', async (req, res) => {
  try {
    const [[dem]] = await pool.query('SELECT COUNT(*) n FROM de_cau_hoi WHERE de_id = ?', [req.params.id]);
    if (!dem.n) return res.status(400).json({ error: 'Đề chưa có câu hỏi nào, chưa phát hành được.' });
    const tt = req.body?.trang_thai === 'nhap' ? 'nhap' : 'phat-hanh';
    await pool.query('UPDATE de_bai SET trang_thai = ? WHERE id = ?', [tt, req.params.id]);
    res.json({ success: true, trang_thai: tt });
  } catch (err) {
    console.error('Lỗi phát hành đề:', err);
    res.status(500).json({ error: 'Không phát hành được đề.' });
  }
});

router.delete('/de-bai/:id', async (req, res) => {
  try {
    // Đã có người làm thì KHÔNG cho xoá: xoá đề kéo theo toàn bộ bài làm (CASCADE), tức xoá luôn
    // điểm của học sinh. Muốn ẩn đi thì chuyển về nháp.
    const [[d]] = await pool.query("SELECT COUNT(*) n FROM de_bai_lam WHERE de_id = ? AND trang_thai <> 'dang-lam'", [req.params.id]);
    if (d.n > 0) return res.status(409).json({ error: `Đã có ${d.n} bài nộp cho đề này. Chuyển đề về "Nháp" để ngừng giao, thay vì xoá (xoá là mất luôn điểm của học sinh).` });
    await pool.query('DELETE FROM de_bai WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá đề:', err);
    res.status(500).json({ error: 'Không xoá được đề.' });
  }
});

// ------------------------------------------------------------------ CÂU HỎI

router.post('/de-bai/:id/cau-hoi', async (req, res) => {
  const kq = kiemCauHoi(req.body || {});
  if (kq.loi) return res.status(400).json({ error: kq.loi });
  try {
    const [[m]] = await pool.query('SELECT COALESCE(MAX(sort_order),0) s FROM de_cau_hoi WHERE de_id = ?', [req.params.id]);
    const c = kq.ok;
    const [r] = await pool.query(
      `INSERT INTO de_cau_hoi (de_id, sort_order, loai, noi_dung, anh, lua_chon, dap_an, diem, giai_thich)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [req.params.id, m.s + 10, c.loai, c.noi_dung, c.anh, c.lua_chon, c.dap_an, c.diem, c.giai_thich]
    );
    res.json({ success: true, id: r.insertId });
  } catch (err) {
    console.error('Lỗi thêm câu hỏi:', err);
    res.status(500).json({ error: loiBang(err, 'Không thêm được câu hỏi.') });
  }
});

/** Câu hỏi không có id đề trên URL nên bảng QUYEN khai `qua: null` — route TỰ kiểm sở hữu. */
async function deCuaCauHoi(cauId, req) {
  const [r] = await pool.query(
    'SELECT d.id, d.org_id, d.tao_boi FROM de_cau_hoi c JOIN de_bai d ON d.id = c.de_id WHERE c.id = ?',
    [cauId]
  );
  if (!r.length) return null;
  if (!req.laAdminNenTang && r[0].org_id !== req.orgId) return null;
  if (req.role === 'teacher' && r[0].tao_boi !== req.userId) return null;
  return r[0];
}

router.put('/de-cau-hoi/:id', async (req, res) => {
  try {
    const de = await deCuaCauHoi(req.params.id, req);
    if (!de) return res.status(403).json({ error: 'Câu hỏi này không thuộc phạm vi bạn quản lý.' });
    // Đổi thứ tự là thao tác riêng, không kèm nội dung.
    if (req.body?.sort_order !== undefined && Object.keys(req.body).length === 1) {
      await pool.query('UPDATE de_cau_hoi SET sort_order = ? WHERE id = ?',
        [parseInt(req.body.sort_order, 10) || 0, req.params.id]);
      return res.json({ success: true });
    }
    const kq = kiemCauHoi(req.body || {});
    if (kq.loi) return res.status(400).json({ error: kq.loi });
    const c = kq.ok;
    // Ảnh: không gửi `anh` thì GIỮ NGUYÊN ảnh cũ. Gửi chuỗi rỗng thì mới là xoá ảnh — nếu coi
    // "không gửi" là xoá thì mỗi lần sửa chính tả câu hỏi là mất ảnh.
    const datAnh = req.body.anh !== undefined ? ', anh = ?' : '';
    const tsAnh = req.body.anh !== undefined ? [req.body.anh || null] : [];
    await pool.query(
      `UPDATE de_cau_hoi SET loai=?, noi_dung=?, lua_chon=?, dap_an=?, diem=?, giai_thich=?${datAnh}
        WHERE id = ?`,
      [c.loai, c.noi_dung, c.lua_chon, c.dap_an, c.diem, c.giai_thich, ...tsAnh, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi sửa câu hỏi:', err);
    res.status(500).json({ error: 'Không sửa được câu hỏi.' });
  }
});

router.delete('/de-cau-hoi/:id', async (req, res) => {
  try {
    const de = await deCuaCauHoi(req.params.id, req);
    if (!de) return res.status(403).json({ error: 'Câu hỏi này không thuộc phạm vi bạn quản lý.' });
    await pool.query('DELETE FROM de_cau_hoi WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi xoá câu hỏi:', err);
    res.status(500).json({ error: 'Không xoá được câu hỏi.' });
  }
});

router.get('/de-bai/:id/cau-hoi/:cauId/anh', async (req, res) => {
  try {
    const [r] = await pool.query('SELECT anh FROM de_cau_hoi WHERE id = ? AND de_id = ?', [req.params.cauId, req.params.id]);
    if (!r.length || !r[0].anh) return res.status(404).json({ error: 'Câu hỏi này không có ảnh.' });
    res.json({ anh: r[0].anh });
  } catch (err) {
    console.error('Lỗi đọc ảnh câu hỏi:', err);
    res.status(500).json({ error: 'Không đọc được ảnh.' });
  }
});

// ------------------------------------------------------------------ GIAO ĐỀ

router.post('/de-bai/:id/giao', async (req, res) => {
  const { class_id, user_ids, mo_luc, dong_luc, ghi_chu } = req.body || {};
  const dsUser = Array.isArray(user_ids) ? user_ids.filter((x) => Number.isInteger(Number(x))) : [];
  if (!class_id && !dsUser.length) return res.status(400).json({ error: 'Chưa chọn lớp hoặc học sinh để giao.' });
  try {
    const [d] = await pool.query('SELECT id, trang_thai FROM de_bai WHERE id = ?', [req.params.id]);
    if (!d.length) return res.status(404).json({ error: 'Không tìm thấy đề.' });
    if (d[0].trang_thai !== 'phat-hanh') {
      return res.status(400).json({ error: 'Đề đang ở trạng thái Nháp. Phát hành đề trước khi giao.' });
    }
    const [[dem]] = await pool.query('SELECT COUNT(*) n FROM de_cau_hoi WHERE de_id = ?', [req.params.id]);
    if (!dem.n) return res.status(400).json({ error: 'Đề chưa có câu hỏi nào.' });

    // ⚠️ ĐÂY là chỗ chặn quyền cho class_id / user_id nằm trong body — bảng QUYEN không bắt được.
    if (class_id && !(await lopThuocPhamVi(class_id, req))) {
      return res.status(403).json({ error: 'Lớp này không thuộc phạm vi bạn quản lý.' });
    }
    for (const uid of dsUser) {
      if (!(await hocVienThuocPhamVi(uid, req))) {
        return res.status(403).json({ error: 'Có học sinh không thuộc phạm vi bạn quản lý.' });
      }
    }

    const mo = mo_luc ? new Date(mo_luc) : null;
    const dong = dong_luc ? new Date(dong_luc) : null;
    if (mo && dong && mo > dong) return res.status(400).json({ error: 'Thời điểm mở phải trước hạn nộp.' });
    const gc = String(ghi_chu || '').slice(0, 500) || null;

    const ids = [];
    if (class_id) {
      const [r] = await pool.query(
        'INSERT INTO de_giao (de_id, class_id, mo_luc, dong_luc, ghi_chu, giao_boi) VALUES (?,?,?,?,?,?)',
        [req.params.id, class_id, mo, dong, gc, req.userId]
      );
      ids.push(r.insertId);
    }
    for (const uid of dsUser) {
      const [r] = await pool.query(
        'INSERT INTO de_giao (de_id, user_id, mo_luc, dong_luc, ghi_chu, giao_boi) VALUES (?,?,?,?,?,?)',
        [req.params.id, uid, mo, dong, gc, req.userId]
      );
      ids.push(r.insertId);
    }
    // Không ghi bảng thông báo nào: chuông suy THẲNG từ `de_giao` (cùng cách bài cô giao làm ở
    // 4.18) nên không bao giờ có chuyện giao xong mà quên tạo thông báo.
    res.json({ success: true, ids });
  } catch (err) {
    console.error('Lỗi giao đề:', err);
    res.status(500).json({ error: loiBang(err, 'Không giao được đề.') });
  }
});

router.delete('/de-giao/:id', async (req, res) => {
  try {
    const [r] = await pool.query(
      'SELECT g.id, d.org_id, d.tao_boi FROM de_giao g JOIN de_bai d ON d.id = g.de_id WHERE g.id = ?',
      [req.params.id]
    );
    if (!r.length) return res.status(404).json({ error: 'Không tìm thấy lượt giao.' });
    if (!req.laAdminNenTang && r[0].org_id !== req.orgId) return res.status(403).json({ error: 'Không thuộc phạm vi bạn quản lý.' });
    if (req.role === 'teacher' && r[0].tao_boi !== req.userId) return res.status(403).json({ error: 'Không thuộc phạm vi bạn quản lý.' });
    await pool.query('DELETE FROM de_giao WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi thu hồi lượt giao:', err);
    res.status(500).json({ error: 'Không thu hồi được.' });
  }
});


// ------------------------------------------------------------------ KẾT QUẢ

router.get('/de-bai/:id/ket-qua', async (req, res) => {
  try {
    const [d] = await pool.query('SELECT id, tieu_de, ma, diem_dat FROM de_bai WHERE id = ?', [req.params.id]);
    if (!d.length) return res.status(404).json({ error: 'Không tìm thấy đề.' });

    // Ai ĐƯỢC GIAO: gồm cả học viên của lớp được giao lẫn người được giao riêng.
    const [duocGiao] = await pool.query(
      `SELECT DISTINCT u.id, u.name, u.email, c.name AS lop
         FROM de_giao g
         LEFT JOIN class_enrollments ce ON ce.class_id = g.class_id
         LEFT JOIN classes c ON c.id = g.class_id
         JOIN users u ON u.id = COALESCE(ce.user_id, g.user_id)
        WHERE g.de_id = ?`, [req.params.id]
    );
    // Bài làm: mỗi người lấy lần điểm CAO NHẤT trong các lần đã nộp — cùng nguyên tắc "thành tích
    // tốt nhất" của điểm hệ thống (4.50), và là cách giáo viên thực tế vẫn chấm khi cho làm lại.
    const [baiLam] = await pool.query(
      `SELECT b.id, b.user_id, b.lan_thu, b.diem, b.tong_diem, b.so_cau_dung, b.tong_cau,
              b.bat_dau_luc, b.nop_luc, b.het_gio, b.trang_thai, b.nhan_xet, b.cham_luc,
              b.tra_loi, u.name AS hoc_vien
         FROM de_bai_lam b JOIN users u ON u.id = b.user_id
        WHERE b.de_id = ?
        ORDER BY b.user_id, b.diem DESC, b.id DESC`, [req.params.id]
    );
    const tot = new Map();
    for (const b of baiLam) if (!tot.has(b.user_id) && b.trang_thai !== 'dang-lam') tot.set(b.user_id, b);

    // Câu sai nhiều nhất — biết cả lớp yếu chỗ nào để dạy lại đúng phần đó.
    const [cau] = await pool.query('SELECT id, sort_order, noi_dung, loai FROM de_cau_hoi WHERE de_id = ? ORDER BY sort_order, id', [req.params.id]);
    const thongKe = new Map(cau.map((c) => [c.id, { ...c, dung: 0, sai: 0 }]));
    for (const b of tot.values()) {
      const ct = docJson(b.tra_loi, null) || {};
      for (const [cid, v] of Object.entries(ct)) {
        const t = thongKe.get(Number(cid));
        if (!t || v.dung === null) continue;
        if (v.dung) t.dung += 1; else t.sai += 1;
      }
    }
    res.json({
      de: d[0],
      duoc_giao: duocGiao,
      ket_qua: [...tot.values()],
      chua_lam: duocGiao.filter((u) => !tot.has(u.id)),
      thong_ke_cau: [...thongKe.values()].sort((a, b) => b.sai - a.sai),
    });
  } catch (err) {
    console.error('Lỗi đọc kết quả đề:', err);
    res.status(500).json({ error: loiBang(err, 'Không đọc được kết quả.') });
  }
});

router.get('/de-bai-lam/:id', async (req, res) => {
  try {
    const [b] = await pool.query(
      `SELECT b.*, u.name AS hoc_vien, d.tieu_de, d.ma, d.diem_dat
         FROM de_bai_lam b JOIN users u ON u.id = b.user_id JOIN de_bai d ON d.id = b.de_id
        WHERE b.id = ?`, [req.params.id]
    );
    if (!b.length) return res.status(404).json({ error: 'Không tìm thấy bài làm.' });
    const [cau] = await pool.query(
      `SELECT id, sort_order, loai, noi_dung, lua_chon, dap_an, diem, giai_thich,
              (anh IS NOT NULL) AS co_anh
         FROM de_cau_hoi WHERE de_id = ? ORDER BY sort_order, id`, [b[0].de_id]
    );
    res.json({
      bai_lam: { ...b[0], tra_loi: docJson(b[0].tra_loi, {}) },
      cau_hoi: cau.map((c) => ({ ...c, lua_chon: docJson(c.lua_chon, null), dap_an: docJson(c.dap_an, null) })),
    });
  } catch (err) {
    console.error('Lỗi đọc bài làm:', err);
    res.status(500).json({ error: 'Không đọc được bài làm.' });
  }
});

/** Chấm tay (câu tự luận) + nhận xét. Cộng điểm tự luận vào điểm máy đã chấm. */
router.post('/de-bai-lam/:id/cham', async (req, res) => {
  const { diem_tu_luan, nhan_xet } = req.body || {};
  try {
    const [b] = await pool.query('SELECT * FROM de_bai_lam WHERE id = ?', [req.params.id]);
    if (!b.length) return res.status(404).json({ error: 'Không tìm thấy bài làm.' });
    if (b[0].trang_thai === 'dang-lam') return res.status(400).json({ error: 'Học sinh chưa nộp bài này.' });

    const traLoi = docJson(b[0].tra_loi, {});
    let diem = Number(b[0].diem) || 0;

    // diem_tu_luan: { "<cau_hoi_id>": số điểm }
    if (diem_tu_luan && typeof diem_tu_luan === 'object') {
      const [cau] = await pool.query("SELECT id, diem FROM de_cau_hoi WHERE de_id = ? AND loai = 'tu-luan'", [b[0].de_id]);
      const toiDa = new Map(cau.map((c) => [String(c.id), Number(c.diem) || 0]));
      for (const [cid, v] of Object.entries(diem_tu_luan)) {
        if (!toiDa.has(String(cid))) continue;
        const d = Math.max(0, Math.min(toiDa.get(String(cid)), Number(v) || 0));
        const cu = traLoi[cid] || {};
        // Chấm lại thì trừ điểm cũ rồi cộng điểm mới — cộng thẳng là chấm hai lần thành điểm đôi.
        diem = diem - (Number(cu.diem) || 0) + d;
        traLoi[cid] = { ...cu, diem: d, dung: d > 0 };
      }
    }
    await pool.query(
      `UPDATE de_bai_lam SET diem = ?, tra_loi = ?, nhan_xet = ?, cham_boi = ?, cham_luc = NOW(),
              trang_thai = 'da-cham', da_doc_luc = NULL
        WHERE id = ?`,
      [Math.round(diem * 100) / 100, JSON.stringify(traLoi),
       nhan_xet === undefined ? b[0].nhan_xet : String(nhan_xet || '').slice(0, 5000) || null,
       req.userId, req.params.id]
    );
    // da_doc_luc = NULL để bài vừa chấm nổi lên chuông của học sinh, y hệt cách lời phê bài tập
    // làm ở 4.18.
    res.json({ success: true, diem: Math.round(diem * 100) / 100 });
  } catch (err) {
    console.error('Lỗi chấm bài:', err);
    res.status(500).json({ error: 'Không chấm được bài.' });
  }
});

export default router;
