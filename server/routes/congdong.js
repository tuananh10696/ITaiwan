// ============================================================
// KHU CỘNG ĐỒNG (2026-09-08)
// ============================================================
// Bốn loại nội dung dùng CHUNG một bộ máy bài viết (`community_posts.loai`):
//   thao-luan · bai-viet · vlog · tin-tuc
// Nhờ vậy bình luận / thích / báo cáo / kiểm duyệt chỉ viết một lần. Học bổng tách bảng riêng
// vì là dữ liệu có cấu trúc. Xem CLAUDE.md 4.39.
//
// KIỂM DUYỆT (chốt với chủ dự án 2026-09-08): cho đăng NGAY, nhưng chặn từ tục tĩu / lăng mạ /
// miệt thị bằng `server/utils/loc-tu.js`. Bộ lọc có hai mức — 'chan' thì từ chối luôn và nói rõ
// từ nào, 'canh-bao' thì vẫn đăng nhưng gắn cờ vào danh sách chờ người thật rà.

import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
import { soiVanBan, loiTuChoi, soiSpam } from '../utils/loc-tu.js';
import { chanDangBai } from '../middleware/gioi-han.js';

const router = Router();

const LOAI = new Set(['thao-luan', 'bai-viet', 'vlog', 'tin-tuc']);
const CHU_DE = new Set(['du-hoc', 'doi-song', 'hoc-tieng', 'viec-lam', 'tocfl-hsk', 'khac']);
/** Số bài / bình luận tối đa mỗi giờ. Chống spam mà không phiền người viết bình thường. */
const TRAN_BAI_MOI_GIO = 10;
const TRAN_BINH_LUAN_MOI_GIO = 40;

const chuaCoBang = (e) => e && (e.code === 'ER_NO_SUCH_TABLE' || e.code === 'ER_BAD_FIELD_ERROR');
const cat = (v, n) => (v == null ? null : String(v).slice(0, n));

/** Vai trò của người gọi. Chỉ admin/giáo viên mới đăng được tin tức và ghim bài. */
async function layVaiTro(userId) {
  const [[u]] = await pool.query('SELECT COALESCE(role, IF(is_admin,"admin","student")) vt FROM users WHERE id = ?', [userId]);
  return u ? u.vt : 'student';
}
const laNhanSu = (vt) => vt === 'admin' || vt === 'teacher';

/**
 * Bóc link video thành (nguồn, id) để nhúng khung chính chủ.
 * CHỈ nhận 4 nền tảng có khung nhúng công khai — nhận link bất kỳ rồi đút vào <iframe> là mở
 * cửa cho người ta nhúng trang bất kỳ vào app.
 */
export function bocVideo(url) {
  const u = String(url || '').trim();
  if (!u) return null;
  let m;
  if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,20})/i))) {
    return { nguon: 'youtube', id: m[1], url: u };
  }
  if ((m = u.match(/tiktok\.com\/@[\w.-]+\/video\/(\d{6,25})/i)) || (m = u.match(/tiktok\.com\/v\/(\d{6,25})/i))) {
    return { nguon: 'tiktok', id: m[1], url: u };
  }
  if ((m = u.match(/instagram\.com\/(?:reel|reels|p|tv)\/([\w-]{5,20})/i))) {
    return { nguon: 'instagram', id: m[1], url: u };
  }
  if (/facebook\.com\/.+\/videos\/|fb\.watch\//i.test(u)) {
    // Facebook không có id ổn định trong URL -> khung nhúng của FB nhận nguyên URL.
    return { nguon: 'facebook', id: '', url: u };
  }
  return null;
}

/** Chỉ nhận đường dẫn ảnh http(s). Chặn `data:` để không ai nhét ảnh base64 phình cả bảng. */
function anhHopLe(v) {
  const s = String(v || '').trim();
  if (!s) return null;
  return /^https?:\/\/[^\s<>"']{5,480}$/i.test(s) ? s : null;
}

/** Kiểm bộ lọc + spam cho một bài / bình luận. Ném lỗi 400 nếu bị chặn. */
function kiemNoiDung(res, nhan, ...doan) {
  const kq = soiVanBan(...doan);
  if (kq.muc === 'chan') {
    res.status(400).json({ error: loiTuChoi(kq, nhan), tuDinh: kq.tuDinh.filter((t) => t.muc === 'chan').map((t) => t.tu) });
    return null;
  }
  const spam = soiSpam(doan.join('\n'));
  const co = kq.muc === 'canh-bao' || spam.length;
  return {
    co: co ? 1 : 0,
    lyDo: co ? cat([...kq.tuDinh.map((t) => t.tu), ...spam].join(', '), 300) : null,
  };
}

/** Quá số bài cho phép trong 1 giờ chưa. */
async function quaTran(userId, bang, tran) {
  const [[r]] = await pool.query(
    `SELECT COUNT(*) n FROM ${bang} WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)`,
    [userId],
  );
  return Number(r.n) >= tran;
}

// ------------------------------------------------------------------ đọc bài

/**
 * GET /api/cong-dong/bai — danh sách.
 * `loai` nhận nhiều giá trị ngăn bằng dấu phẩy: trang gộp Blog+Thảo luận hỏi 'bai-viet,thao-luan'.
 * `optionalAuth` để khách vẫn đọc được, còn người đã đăng nhập thì biết mình đã thích bài nào.
 */
// ------------------------------------------------------------------ TRANG CHỦ
/**
 * GET /api/cong-dong/trang-chu — ba khối gọn cho trang chủ, MỘT request (2026-09-11).
 *
 * Gộp cả ba thay vì để trang chủ gọi 3 lần: nó vốn đã gọi `/lo-trinh/tong-quan` +
 * `/exercise/my-assignments`, thêm ba request nữa là năm vòng mạng cho một màn hình (4.43).
 *
 * CÔNG KHAI — khách chưa đăng nhập cũng thấy, và nội dung giống nhau với mọi người nên cho phép
 * cache dùng chung ở CDN. Cố ý KHÔNG trả `da_thich`: nó là dữ liệu riêng từng người, có nó là
 * mất cache dùng chung mà trang chủ cũng chẳng hiện nút thích.
 *
 * Bảng chưa có (production chưa chạy `migration-cong-dong.sql`) -> trả ba mảng RỖNG kèm cờ, giao
 * diện tự ẩn khối. Đừng đổi thành 500: trang chủ là thứ hỏng thì ai cũng thấy.
 */
router.get('/trang-chu', async (req, res) => {
  const CHON = `p.id, p.loai, p.tieu_de, p.tom_tat, p.chu_de, p.emoji, p.anh_bia,
                p.so_xem, p.so_thich, p.so_binh_luan, p.created_at,
                u.name AS tac_gia, u.avatar_letter, u.avatar_color, u.avatar_url`;
  const TU = `FROM community_posts p LEFT JOIN users u ON u.id = p.user_id`;

  try {
    // --- 3 học bổng ---
    // Lấy từ bảng `scholarships` (dữ liệu CÓ CẤU TRÚC), không phải bài viết chủ đề du học.
    // `sort_order` là thứ tự chủ dự án tự xếp — muốn đổi mục nào lên trang chủ thì sửa cột đó.
    const [hocBong] = await pool.query(
      `SELECT id, ten, don_vi, gia_tri, han_nop, cap_hoc, link, cap_nhat_luc
         FROM scholarships WHERE trang_thai = 'hien'
        ORDER BY sort_order, id LIMIT 3`,
    );

    // --- 3 bài viết mới nhất ---
    // Chỉ `bai-viet` + `tin-tuc` (nội dung biên tập). Gộp cả `thao-luan` vào đây thì hai khối
    // dưới trùng bài nhau ngay khi có người đăng thảo luận mới.
    const [moiNhat] = await pool.query(
      `SELECT ${CHON} ${TU}
        WHERE p.trang_thai = 'hien' AND p.loai IN ('bai-viet','tin-tuc')
        ORDER BY p.ghim DESC, p.created_at DESC LIMIT 3`,
    );

    // --- 3 thảo luận sôi nổi nhất ---
    // Điểm = bình luận x2 + thích: một bình luận tốn công hơn một cú bấm thích nhiều, nên nó mới
    // là dấu hiệu "sôi nổi" thật.
    //
    // ⚠️ CÓ giới hạn 90 ngày, và đó là phần quan trọng: xếp hạng trên toàn bộ lịch sử thì ba bài
    // đầu tiên đông người bàn sẽ ĐÓNG BĂNG trang chủ vĩnh viễn, người mới đăng không bao giờ lên
    // được. Thiếu chưa đủ 3 thì mới nới ra toàn thời gian để khối không bị trống lúc mới chạy.
    const DIEM = '(p.so_binh_luan * 2 + p.so_thich)';
    const [soiNoiGanDay] = await pool.query(
      `SELECT ${CHON} ${TU}
        WHERE p.trang_thai = 'hien' AND p.loai = 'thao-luan'
          AND p.created_at > DATE_SUB(NOW(), INTERVAL 90 DAY)
        ORDER BY ${DIEM} DESC, p.created_at DESC LIMIT 3`,
    );
    let soiNoi = soiNoiGanDay;
    if (soiNoi.length < 3) {
      const bo = soiNoi.map((x) => x.id);
      const [bu] = await pool.query(
        `SELECT ${CHON} ${TU}
          WHERE p.trang_thai = 'hien' AND p.loai = 'thao-luan'
            ${bo.length ? `AND p.id NOT IN (${bo.map(() => '?').join(',')})` : ''}
          ORDER BY ${DIEM} DESC, p.created_at DESC LIMIT ?`,
        [...bo, 3 - soiNoi.length],
      );
      soiNoi = [...soiNoi, ...bu];
    }

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
    res.json({ hoc_bong: hocBong, moi_nhat: moiNhat, soi_noi: soiNoi });
  } catch (err) {
    if (chuaCoBang(err)) {
      return res.json({ hoc_bong: [], moi_nhat: [], soi_noi: [], chuaCoBang: true });
    }
    console.error('Cộng đồng — khối trang chủ lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải nội dung cộng đồng.' });
  }
});

router.get('/bai', optionalAuth, async (req, res) => {
  try {
    const loai = String(req.query.loai || '').split(',').map((x) => x.trim()).filter((x) => LOAI.has(x));
    const chuDe = CHU_DE.has(String(req.query.chu_de)) ? String(req.query.chu_de) : null;
    const tim = cat(req.query.tim, 100);
    const trang = Math.max(1, parseInt(req.query.trang, 10) || 1);
    const moiTrang = Math.min(50, Math.max(5, parseInt(req.query.moi_trang, 10) || 20));

    const dk = ["p.trang_thai = 'hien'"];
    const ts = [];
    if (loai.length) { dk.push(`p.loai IN (${loai.map(() => '?').join(',')})`); ts.push(...loai); }
    if (chuDe) { dk.push('p.chu_de = ?'); ts.push(chuDe); }
    if (tim) { dk.push('(p.tieu_de LIKE ? OR p.tom_tat LIKE ?)'); ts.push(`%${tim}%`, `%${tim}%`); }
    const where = dk.join(' AND ');

    const [[dem]] = await pool.query(`SELECT COUNT(*) n FROM community_posts p WHERE ${where}`, ts);
    const [rows] = await pool.query(
      `SELECT p.id, p.user_id, p.loai, p.tieu_de, p.tom_tat, p.chu_de, p.emoji, p.anh_bia,
              p.video_nguon, p.video_id, p.video_url, p.ghim, p.chinh_thuc,
              p.so_xem, p.so_thich, p.so_binh_luan, p.created_at,
              u.name AS tac_gia, u.avatar_letter, u.avatar_color, u.avatar_url,
              COALESCE(u.role,'student') AS vai_tro
              ${req.userId ? ', EXISTS(SELECT 1 FROM community_likes l WHERE l.post_id = p.id AND l.user_id = ?) AS da_thich' : ''}
       FROM community_posts p LEFT JOIN users u ON u.id = p.user_id
       WHERE ${where}
       ORDER BY p.ghim DESC, p.created_at DESC
       LIMIT ? OFFSET ?`,
      req.userId ? [req.userId, ...ts, moiTrang, (trang - 1) * moiTrang] : [...ts, moiTrang, (trang - 1) * moiTrang],
    );
    res.json({ bai: rows, tong: Number(dem.n), trang, moi_trang: moiTrang });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ bai: [], tong: 0, chuaCoBang: true });
    console.error('Cộng đồng — danh sách lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách bài.' });
  }
});

/** GET /api/cong-dong/bai/:id — chi tiết + bình luận. */
router.get('/bai/:id', optionalAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'Mã bài không hợp lệ.' });
    const [[bai]] = await pool.query(
      `SELECT p.*, u.name AS tac_gia, u.avatar_letter, u.avatar_color, u.avatar_url,
              COALESCE(u.role,'student') AS vai_tro
              ${req.userId ? ', EXISTS(SELECT 1 FROM community_likes l WHERE l.post_id = p.id AND l.user_id = ?) AS da_thich' : ''}
       FROM community_posts p LEFT JOIN users u ON u.id = p.user_id
       WHERE p.id = ? AND p.trang_thai = 'hien'`,
      req.userId ? [req.userId, id] : [id],
    );
    if (!bai) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });
    const [bl] = await pool.query(
      `SELECT c.id, c.parent_id, c.user_id, c.noi_dung, c.created_at,
              u.name AS tac_gia, u.avatar_letter, u.avatar_color, u.avatar_url,
              COALESCE(u.role,'student') AS vai_tro
       FROM community_comments c JOIN users u ON u.id = c.user_id
       WHERE c.post_id = ? AND c.trang_thai = 'hien'
       ORDER BY c.created_at ASC LIMIT 300`, [id],
    );
    // Đếm lượt xem KHÔNG chặn phản hồi — lỗi ghi số đếm không được làm hỏng việc đọc bài.
    pool.query('UPDATE community_posts SET so_xem = so_xem + 1 WHERE id = ?', [id]).catch(() => {});
    res.json({ bai, binh_luan: bl });
  } catch (err) {
    if (chuaCoBang(err)) return res.status(404).json({ error: 'Chưa chạy migration khu Cộng đồng.' });
    console.error('Cộng đồng — chi tiết lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải bài viết.' });
  }
});

// ------------------------------------------------------------------ đăng bài

router.post('/bai', requireAuth, chanDangBai, async (req, res) => {
  try {
    const b = req.body || {};
    const loai = LOAI.has(b.loai) ? b.loai : 'thao-luan';
    const tieuDe = String(b.tieu_de || '').trim();
    const noiDung = String(b.noi_dung || '').trim();
    if (tieuDe.length < 5) return res.status(400).json({ error: 'Tiêu đề cần ít nhất 5 ký tự.' });
    if (tieuDe.length > 300) return res.status(400).json({ error: 'Tiêu đề dài quá 300 ký tự.' });

    const vt = await layVaiTro(req.userId);
    if (loai === 'tin-tuc' && !laNhanSu(vt)) {
      return res.status(403).json({ error: 'Chỉ giáo viên và quản trị viên đăng được mục Tin tức.' });
    }
    let video = null;
    if (loai === 'vlog') {
      video = bocVideo(b.video_url);
      if (!video) {
        return res.status(400).json({
          error: 'Link video chưa hợp lệ. Hiện nhận link YouTube, TikTok, Facebook và Instagram Reels.',
        });
      }
    }
    if (loai !== 'vlog' && noiDung.length < 10) {
      return res.status(400).json({ error: 'Nội dung cần ít nhất 10 ký tự.' });
    }
    if (await quaTran(req.userId, 'community_posts', TRAN_BAI_MOI_GIO)) {
      return res.status(429).json({ error: `Bạn đã đăng ${TRAN_BAI_MOI_GIO} bài trong một giờ. Nghỉ chút rồi quay lại nhé.` });
    }

    const co = kiemNoiDung(res, 'Bài', tieuDe, noiDung, b.tom_tat);
    if (!co) return;                                    // đã trả 400 trong kiemNoiDung

    const [r] = await pool.query(
      `INSERT INTO community_posts
        (user_id, loai, tieu_de, tom_tat, noi_dung, chu_de, video_nguon, video_id, video_url,
         anh_bia, emoji, chinh_thuc, co_canh_bao, ly_do_co)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [req.userId, loai, tieuDe, cat(b.tom_tat, 600) || cat(noiDung.replace(/\s+/g, ' '), 240),
        noiDung || null, CHU_DE.has(b.chu_de) ? b.chu_de : 'khac',
        video ? video.nguon : null, video ? video.id : null, video ? video.url : null,
        anhHopLe(b.anh_bia), cat(b.emoji, 10), laNhanSu(vt) ? 1 : 0, co.co, co.lyDo],
    );
    res.json({ id: r.insertId, canh_bao: !!co.co, message: 'Đã đăng bài.' });
  } catch (err) {
    if (chuaCoBang(err)) return res.status(503).json({ error: 'Chưa chạy migration khu Cộng đồng.' });
    console.error('Cộng đồng — đăng bài lỗi:', err);
    res.status(500).json({ error: 'Lỗi đăng bài.' });
  }
});

/** PUT /api/cong-dong/bai/:id — sửa bài của chính mình (hoặc nhân sự sửa bài bất kỳ). */
router.put('/bai/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [[bai]] = await pool.query('SELECT user_id FROM community_posts WHERE id = ?', [id]);
    if (!bai) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });
    const vt = await layVaiTro(req.userId);
    if (bai.user_id !== req.userId && !laNhanSu(vt)) {
      return res.status(403).json({ error: 'Bạn chỉ sửa được bài của mình.' });
    }
    const b = req.body || {};
    const tieuDe = String(b.tieu_de || '').trim();
    const noiDung = String(b.noi_dung || '').trim();
    if (tieuDe.length < 5) return res.status(400).json({ error: 'Tiêu đề cần ít nhất 5 ký tự.' });
    const co = kiemNoiDung(res, 'Bài', tieuDe, noiDung, b.tom_tat);
    if (!co) return;
    await pool.query(
      `UPDATE community_posts SET tieu_de = ?, tom_tat = ?, noi_dung = ?, chu_de = ?,
        anh_bia = ?, co_canh_bao = ?, ly_do_co = ? WHERE id = ?`,
      [tieuDe, cat(b.tom_tat, 600), noiDung || null, CHU_DE.has(b.chu_de) ? b.chu_de : 'khac',
        anhHopLe(b.anh_bia), co.co, co.lyDo, id],
    );
    res.json({ message: 'Đã lưu.' });
  } catch (err) {
    console.error('Cộng đồng — sửa bài lỗi:', err);
    res.status(500).json({ error: 'Lỗi lưu bài.' });
  }
});

/** DELETE /api/cong-dong/bai/:id — tác giả xoá bài mình, nhân sự xoá bài bất kỳ. */
router.delete('/bai/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [[bai]] = await pool.query('SELECT user_id FROM community_posts WHERE id = ?', [id]);
    if (!bai) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });
    const vt = await layVaiTro(req.userId);
    if (bai.user_id !== req.userId && !laNhanSu(vt)) {
      return res.status(403).json({ error: 'Bạn chỉ xoá được bài của mình.' });
    }
    await pool.query('DELETE FROM community_posts WHERE id = ?', [id]);
    res.json({ message: 'Đã xoá bài.' });
  } catch (err) {
    console.error('Cộng đồng — xoá bài lỗi:', err);
    res.status(500).json({ error: 'Lỗi xoá bài.' });
  }
});

// ------------------------------------------------------------------ thích · bình luận · báo cáo

router.post('/bai/:id/thich', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [r] = await pool.query('DELETE FROM community_likes WHERE post_id = ? AND user_id = ?', [id, req.userId]);
    if (r.affectedRows) {
      await pool.query('UPDATE community_posts SET so_thich = GREATEST(so_thich - 1, 0) WHERE id = ?', [id]);
      return res.json({ thich: false });
    }
    await pool.query('INSERT INTO community_likes (post_id, user_id) VALUES (?, ?)', [id, req.userId]);
    await pool.query('UPDATE community_posts SET so_thich = so_thich + 1 WHERE id = ?', [id]);
    res.json({ thich: true });
  } catch (err) {
    if (err && err.code === 'ER_NO_REFERENCED_ROW_2') return res.status(404).json({ error: 'Bài viết không tồn tại.' });
    console.error('Cộng đồng — thích lỗi:', err);
    res.status(500).json({ error: 'Lỗi ghi lượt thích.' });
  }
});

router.post('/bai/:id/binh-luan', requireAuth, chanDangBai, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const noiDung = String(req.body?.noi_dung || '').trim();
    if (noiDung.length < 2) return res.status(400).json({ error: 'Bình luận quá ngắn.' });
    if (noiDung.length > 2000) return res.status(400).json({ error: 'Bình luận dài quá 2000 ký tự.' });
    const [[bai]] = await pool.query("SELECT id FROM community_posts WHERE id = ? AND trang_thai = 'hien'", [id]);
    if (!bai) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });
    if (await quaTran(req.userId, 'community_comments', TRAN_BINH_LUAN_MOI_GIO)) {
      return res.status(429).json({ error: 'Bạn bình luận hơi nhanh. Nghỉ một chút rồi quay lại nhé.' });
    }
    const co = kiemNoiDung(res, 'Bình luận', noiDung);
    if (!co) return;
    // Chỉ cho lồng MỘT cấp: trả lời của trả lời bị quy về bình luận cha.
    let parent = parseInt(req.body?.parent_id, 10);
    if (Number.isInteger(parent) && parent > 0) {
      const [[cha]] = await pool.query('SELECT id, parent_id FROM community_comments WHERE id = ? AND post_id = ?', [parent, id]);
      parent = cha ? (cha.parent_id || cha.id) : null;
    } else parent = null;
    const [r] = await pool.query(
      'INSERT INTO community_comments (post_id, user_id, parent_id, noi_dung, co_canh_bao) VALUES (?,?,?,?,?)',
      [id, req.userId, parent, noiDung, co.co],
    );
    await pool.query('UPDATE community_posts SET so_binh_luan = so_binh_luan + 1 WHERE id = ?', [id]);
    res.json({ id: r.insertId, canh_bao: !!co.co });
  } catch (err) {
    if (chuaCoBang(err)) return res.status(503).json({ error: 'Chưa chạy migration khu Cộng đồng.' });
    console.error('Cộng đồng — bình luận lỗi:', err);
    res.status(500).json({ error: 'Lỗi gửi bình luận.' });
  }
});

router.delete('/binh-luan/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [[c]] = await pool.query('SELECT user_id, post_id FROM community_comments WHERE id = ?', [id]);
    if (!c) return res.status(404).json({ error: 'Không tìm thấy bình luận.' });
    const vt = await layVaiTro(req.userId);
    if (c.user_id !== req.userId && !laNhanSu(vt)) {
      return res.status(403).json({ error: 'Bạn chỉ xoá được bình luận của mình.' });
    }
    await pool.query('DELETE FROM community_comments WHERE id = ?', [id]);
    await pool.query('UPDATE community_posts SET so_binh_luan = GREATEST(so_binh_luan - 1, 0) WHERE id = ?', [c.post_id]);
    res.json({ message: 'Đã xoá bình luận.' });
  } catch (err) {
    console.error('Cộng đồng — xoá bình luận lỗi:', err);
    res.status(500).json({ error: 'Lỗi xoá bình luận.' });
  }
});

router.post('/bao-cao', requireAuth, chanDangBai, async (req, res) => {
  try {
    const postId = parseInt(req.body?.post_id, 10) || null;
    const cmtId = parseInt(req.body?.comment_id, 10) || null;
    if (!postId && !cmtId) return res.status(400).json({ error: 'Thiếu nội dung cần báo cáo.' });
    await pool.query(
      `INSERT INTO community_reports (post_id, comment_id, user_id, ly_do) VALUES (?,?,?,?)
       ON DUPLICATE KEY UPDATE ly_do = VALUES(ly_do), trang_thai = 'moi', created_at = NOW()`,
      [postId, cmtId, req.userId, cat(req.body?.ly_do, 300)],
    );
    res.json({ message: 'Đã gửi báo cáo. Cảm ơn bạn — chúng tôi sẽ xem lại.' });
  } catch (err) {
    console.error('Cộng đồng — báo cáo lỗi:', err);
    res.status(500).json({ error: 'Lỗi gửi báo cáo.' });
  }
});

// ------------------------------------------------------------------ kiểm duyệt (nhân sự)

/**
 * GET /api/cong-dong/kiem-duyet — bài/bình luận bị bộ lọc gắn cờ + báo cáo của người dùng.
 * Đặt trong file này (không phải admin.js) vì màn kiểm duyệt nằm ngay trong app học viên, chỉ
 * hiện với admin/giáo viên — tự kiểm vai trò ở đây, đúng mẫu 4.22 đã dặn thì phải kiểm tường minh.
 */
router.get('/kiem-duyet', requireAuth, async (req, res) => {
  try {
    if (!laNhanSu(await layVaiTro(req.userId))) return res.status(403).json({ error: 'Không có quyền.' });
    const [baiCo] = await pool.query(
      `SELECT p.id, p.loai, p.tieu_de, p.ly_do_co, p.trang_thai, p.created_at, u.name AS tac_gia
       FROM community_posts p LEFT JOIN users u ON u.id = p.user_id
       WHERE p.co_canh_bao = 1 ORDER BY p.created_at DESC LIMIT 100`);
    const [blCo] = await pool.query(
      `SELECT c.id, c.post_id, c.noi_dung, c.trang_thai, c.created_at, u.name AS tac_gia
       FROM community_comments c JOIN users u ON u.id = c.user_id
       WHERE c.co_canh_bao = 1 ORDER BY c.created_at DESC LIMIT 100`);
    const [baoCao] = await pool.query(
      `SELECT r.id, r.post_id, r.comment_id, r.ly_do, r.created_at, u.name AS nguoi_bao,
              p.tieu_de, c.noi_dung AS binh_luan
       FROM community_reports r
       JOIN users u ON u.id = r.user_id
       LEFT JOIN community_posts p ON p.id = r.post_id
       LEFT JOIN community_comments c ON c.id = r.comment_id
       WHERE r.trang_thai = 'moi' ORDER BY r.created_at DESC LIMIT 100`);
    res.json({ bai_gan_co: baiCo, binh_luan_gan_co: blCo, bao_cao: baoCao });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ bai_gan_co: [], binh_luan_gan_co: [], bao_cao: [] });
    console.error('Cộng đồng — kiểm duyệt lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách kiểm duyệt.' });
  }
});

/** PUT /api/cong-dong/kiem-duyet/bai/:id — ẩn/hiện/ghim/bỏ cờ. */
router.put('/kiem-duyet/bai/:id', requireAuth, async (req, res) => {
  try {
    if (!laNhanSu(await layVaiTro(req.userId))) return res.status(403).json({ error: 'Không có quyền.' });
    const id = parseInt(req.params.id, 10);
    const sets = [], vals = [];
    if (req.body?.trang_thai === 'hien' || req.body?.trang_thai === 'an') { sets.push('trang_thai=?'); vals.push(req.body.trang_thai); }
    if (req.body?.ghim !== undefined) { sets.push('ghim=?'); vals.push(req.body.ghim ? 1 : 0); }
    if (req.body?.bo_co) { sets.push('co_canh_bao=0', 'ly_do_co=NULL'); }
    if (!sets.length) return res.status(400).json({ error: 'Không có gì để đổi.' });
    vals.push(id);
    await pool.query(`UPDATE community_posts SET ${sets.join(', ')} WHERE id = ?`, vals);
    await pool.query("UPDATE community_reports SET trang_thai='da-xu-ly' WHERE post_id = ?", [id]);
    res.json({ message: 'Đã cập nhật.' });
  } catch (err) {
    console.error('Cộng đồng — kiểm duyệt bài lỗi:', err);
    res.status(500).json({ error: 'Lỗi cập nhật.' });
  }
});

/** PUT /api/cong-dong/kiem-duyet/binh-luan/:id — ẩn/hiện một bình luận. */
router.put('/kiem-duyet/binh-luan/:id', requireAuth, async (req, res) => {
  try {
    if (!laNhanSu(await layVaiTro(req.userId))) return res.status(403).json({ error: 'Không có quyền.' });
    const id = parseInt(req.params.id, 10);
    const tt = req.body?.trang_thai === 'an' ? 'an' : 'hien';
    await pool.query('UPDATE community_comments SET trang_thai = ?, co_canh_bao = 0 WHERE id = ?', [tt, id]);
    await pool.query("UPDATE community_reports SET trang_thai='da-xu-ly' WHERE comment_id = ?", [id]);
    res.json({ message: 'Đã cập nhật.' });
  } catch (err) {
    console.error('Cộng đồng — kiểm duyệt bình luận lỗi:', err);
    res.status(500).json({ error: 'Lỗi cập nhật.' });
  }
});

// ------------------------------------------------------------------ học bổng

router.get('/hoc-bong', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM scholarships WHERE trang_thai = 'hien' ORDER BY sort_order ASC, id ASC`);
    res.json({ hoc_bong: rows });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ hoc_bong: [], chuaCoBang: true });
    console.error('Học bổng lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách học bổng.' });
  }
});

/** POST/PUT/DELETE học bổng — chỉ nhân sự. Form nằm ngay trong app, không phải mở admin.html. */
router.post('/hoc-bong', requireAuth, async (req, res) => {
  try {
    if (!laNhanSu(await layVaiTro(req.userId))) return res.status(403).json({ error: 'Không có quyền.' });
    const b = req.body || {};
    if (!String(b.ten || '').trim()) return res.status(400).json({ error: 'Thiếu tên học bổng.' });
    const cot = ['ten', 'ten_goc', 'don_vi', 'cap_hoc', 'gia_tri', 'han_nop', 'yeu_cau_tieng', 'doi_tuong', 'mo_ta', 'link'];
    const gt = cot.map((c) => cat(b[c], c === 'mo_ta' ? 4000 : 400));
    const [r] = await pool.query(
      `INSERT INTO scholarships (${cot.join(',')}, sort_order, cap_nhat_luc)
       VALUES (${cot.map(() => '?').join(',')}, ?, CURDATE())`,
      [...gt, Number(b.sort_order) || 0],
    );
    res.json({ id: r.insertId });
  } catch (err) {
    console.error('Học bổng — thêm lỗi:', err);
    res.status(500).json({ error: 'Lỗi thêm học bổng.' });
  }
});

router.put('/hoc-bong/:id', requireAuth, async (req, res) => {
  try {
    if (!laNhanSu(await layVaiTro(req.userId))) return res.status(403).json({ error: 'Không có quyền.' });
    const b = req.body || {};
    const cot = ['ten', 'ten_goc', 'don_vi', 'cap_hoc', 'gia_tri', 'han_nop', 'yeu_cau_tieng', 'doi_tuong', 'mo_ta', 'link'];
    const sets = [], vals = [];
    for (const c of cot) if (b[c] !== undefined) { sets.push(`${c}=?`); vals.push(cat(b[c], c === 'mo_ta' ? 4000 : 400)); }
    if (b.trang_thai === 'hien' || b.trang_thai === 'an') { sets.push('trang_thai=?'); vals.push(b.trang_thai); }
    if (b.sort_order !== undefined) { sets.push('sort_order=?'); vals.push(Number(b.sort_order) || 0); }
    if (!sets.length) return res.status(400).json({ error: 'Không có gì để đổi.' });
    // Mỗi lần sửa là một lần xác nhận số liệu còn đúng -> luôn dập lại mốc cập nhật.
    sets.push('cap_nhat_luc=CURDATE()');
    vals.push(parseInt(req.params.id, 10));
    await pool.query(`UPDATE scholarships SET ${sets.join(', ')} WHERE id = ?`, vals);
    res.json({ message: 'Đã lưu.' });
  } catch (err) {
    console.error('Học bổng — sửa lỗi:', err);
    res.status(500).json({ error: 'Lỗi lưu học bổng.' });
  }
});

router.delete('/hoc-bong/:id', requireAuth, async (req, res) => {
  try {
    if (!laNhanSu(await layVaiTro(req.userId))) return res.status(403).json({ error: 'Không có quyền.' });
    await pool.query('DELETE FROM scholarships WHERE id = ?', [parseInt(req.params.id, 10)]);
    res.json({ message: 'Đã xoá.' });
  } catch (err) {
    console.error('Học bổng — xoá lỗi:', err);
    res.status(500).json({ error: 'Lỗi xoá học bổng.' });
  }
});

export default router;
