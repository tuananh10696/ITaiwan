// ============================================================
// SỔ TAY TỪ VỰNG — khoá theo CHỮ HÁN (2026-09-08)
// ============================================================
// Thay cho `/api/saved-words`, vốn khoá ngoại vào `vocabulary(id)` nên chỉ lưu được 40 từ
// seed trong DB. Ở đây khoá là chính chữ Hán phồn thể, nên lưu được mọi từ ở mọi module
// (giáo trình · HSK · TOCFL · từ điển · bộ thủ).
//
// Bảng: `notebook_words` — xem server/config/migration-sotay.sql.
// ⚠️ Route cũ `/api/saved-words` VẪN CÒN và vẫn chạy; chưa xoá vì dữ liệu cũ đã được migration
//    chuyển sang bảng mới rồi, xoá route là việc dọn dẹp riêng.

import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/** Chữ Hán (kể cả khối mở rộng A). Chặn ở đây để không ai nhét chuỗi rác vào sổ tay. */
const CHU_HAN = /^[㐀-鿿豈-﫿]{1,32}$/;

const cat = (v, n) => (v == null ? null : String(v).slice(0, n));

// GET /api/notebook — toàn bộ sổ tay của người đang đăng nhập
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT tu, gian, pinyin, han_viet, nghia, nguon, ghi_chu, created_at
       FROM notebook_words WHERE user_id = ? ORDER BY created_at DESC`,
      [req.userId],
    );
    res.json({ tu: rows });
  } catch (err) {
    console.error('Notebook list error:', err);
    res.status(500).json({ error: 'Lỗi tải sổ tay từ vựng.' });
  }
});

// POST /api/notebook — lưu 1 từ (đã có thì cập nhật bản chụp, không sinh bản ghi trùng)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { tu, gian, pinyin, han_viet: hanViet, nghia, nguon, ghi_chu: ghiChu } = req.body || {};
    if (!tu || !CHU_HAN.test(String(tu))) {
      return res.status(400).json({ error: 'Từ cần lưu phải là chữ Hán (tối đa 32 chữ).' });
    }
    await pool.query(
      `INSERT INTO notebook_words (user_id, tu, gian, pinyin, han_viet, nghia, nguon, ghi_chu)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE gian = VALUES(gian), pinyin = VALUES(pinyin),
         han_viet = VALUES(han_viet), nghia = VALUES(nghia),
         ghi_chu = COALESCE(VALUES(ghi_chu), ghi_chu)`,
      [req.userId, String(tu), cat(gian, 32), cat(pinyin, 120), cat(hanViet, 120),
        cat(nghia, 500), cat(nguon, 40), cat(ghiChu, 500)],
    );
    res.json({ luu: true, message: 'Đã lưu vào sổ tay.' });
  } catch (err) {
    console.error('Notebook save error:', err);
    res.status(500).json({ error: 'Lỗi lưu từ vào sổ tay.' });
  }
});

// DELETE /api/notebook/:tu — bỏ 1 từ khỏi sổ tay
router.delete('/:tu', requireAuth, async (req, res) => {
  try {
    const tu = decodeURIComponent(req.params.tu || '');
    if (!CHU_HAN.test(tu)) return res.status(400).json({ error: 'Từ không hợp lệ.' });
    await pool.query('DELETE FROM notebook_words WHERE user_id = ? AND tu = ?', [req.userId, tu]);
    res.json({ luu: false, message: 'Đã bỏ khỏi sổ tay.' });
  } catch (err) {
    console.error('Notebook delete error:', err);
    res.status(500).json({ error: 'Lỗi xoá từ khỏi sổ tay.' });
  }
});

// PUT /api/notebook/:tu/ghi-chu — ghi chú riêng của học viên cho một từ
router.put('/:tu/ghi-chu', requireAuth, async (req, res) => {
  try {
    const tu = decodeURIComponent(req.params.tu || '');
    if (!CHU_HAN.test(tu)) return res.status(400).json({ error: 'Từ không hợp lệ.' });
    const [r] = await pool.query(
      'UPDATE notebook_words SET ghi_chu = ? WHERE user_id = ? AND tu = ?',
      [cat(req.body && req.body.ghi_chu, 500), req.userId, tu],
    );
    if (!r.affectedRows) return res.status(404).json({ error: 'Từ này chưa có trong sổ tay.' });
    res.json({ message: 'Đã lưu ghi chú.' });
  } catch (err) {
    console.error('Notebook note error:', err);
    res.status(500).json({ error: 'Lỗi lưu ghi chú.' });
  }
});

/**
 * POST /api/notebook/dong-bo — gộp sổ tay đang nằm ở localStorage vào tài khoản.
 * Dùng ngay sau khi đăng nhập: máy có gì mà tài khoản chưa có thì đẩy lên, rồi trả về bản
 * hợp nhất để trình duyệt ghi đè lại. Nhờ vậy từ đã lưu lúc chưa đăng nhập không bị mất.
 */
router.post('/dong-bo', requireAuth, async (req, res) => {
  try {
    const ds = Array.isArray(req.body && req.body.tu) ? req.body.tu.slice(0, 500) : [];
    const hang = ds
      .filter((w) => w && CHU_HAN.test(String(w.tu || '')))
      .map((w) => [req.userId, String(w.tu), cat(w.gian, 32), cat(w.pinyin, 120),
        cat(w.han_viet, 120), cat(w.nghia, 500), cat(w.nguon, 40)]);
    if (hang.length) {
      // Không đụng tới bản ghi đã có trên server (bản trên server mới là bản chuẩn) —
      // INSERT IGNORE chứ không ON DUPLICATE KEY UPDATE.
      await pool.query(
        'INSERT IGNORE INTO notebook_words (user_id, tu, gian, pinyin, han_viet, nghia, nguon) VALUES ?',
        [hang],
      );
    }
    const [rows] = await pool.query(
      `SELECT tu, gian, pinyin, han_viet, nghia, nguon, ghi_chu, created_at
       FROM notebook_words WHERE user_id = ? ORDER BY created_at DESC`,
      [req.userId],
    );
    res.json({ tu: rows, daDay: hang.length });
  } catch (err) {
    console.error('Notebook sync error:', err);
    res.status(500).json({ error: 'Lỗi đồng bộ sổ tay.' });
  }
});

export default router;
