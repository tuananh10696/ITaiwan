// SRS (Spaced Repetition System) Routes
import { Router } from 'express';
import { congDiemCoTranNgay } from '../utils/diem.js';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { toLimit } from '../utils/num.js';

const router = Router();

// GET /api/srs/due - Get cards due for review
router.get('/due', requireAuth, async (req, res) => {
  try {
    const { lesson } = req.query;
    // '?limit=abc' trước đây thành LIMIT NaN -> lỗi SQL -> 500. Xem server/utils/num.js.
    const limit = toLimit(req.query.limit, 20, 100);
    let sql = `
      SELECT v.*, uv.ease_factor, uv.interval_days, uv.repetitions, uv.status, uv.due_date,
             uv.total_reviews, uv.correct_count
      FROM vocabulary v
      LEFT JOIN user_vocabulary uv ON uv.vocabulary_id = v.id AND uv.user_id = ?
      WHERE (uv.due_date IS NULL OR uv.due_date <= NOW())
    `;
    const params = [req.userId];

    if (lesson && lesson !== 'all') {
      sql += ' AND v.lesson = ?';
      params.push(lesson);
    }

    sql += ' ORDER BY CASE WHEN uv.status IS NULL THEN 0 WHEN uv.status = "new" THEN 1 WHEN uv.status = "learning" THEN 2 ELSE 3 END, uv.due_date ASC';
    sql += ' LIMIT ?';
    params.push(limit);

    const [rows] = await pool.query(sql, params);

    // Count stats
    const [stats] = await pool.query(`
      SELECT
        COALESCE(SUM(CASE WHEN uv.status IS NULL OR uv.status = 'new' THEN 1 ELSE 0 END), 0) as new_count,
        COALESCE(SUM(CASE WHEN uv.status = 'learning' THEN 1 ELSE 0 END), 0) as learning_count,
        COALESCE(SUM(CASE WHEN uv.status IN ('review','mastered') THEN 1 ELSE 0 END), 0) as mastered_count
      FROM vocabulary v
      LEFT JOIN user_vocabulary uv ON uv.vocabulary_id = v.id AND uv.user_id = ?
    `, [req.userId]);

    res.json({
      cards: rows,
      stats: stats[0],
    });
  } catch (err) {
    console.error('SRS due error:', err);
    res.status(500).json({ error: 'Lỗi tải thẻ ôn tập.' });
  }
});

// POST /api/srs/review - Record a review
router.post('/review', requireAuth, async (req, res) => {
  try {
    const { vocabulary_id, rating } = req.body;
    // rating: 1=Quên, 2=Khó, 3=Nhớ, 4=Dễ
    if (!vocabulary_id || !rating || rating < 1 || rating > 4) {
      return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
    }

    // Get current SRS state
    const [existing] = await pool.query(
      'SELECT * FROM user_vocabulary WHERE user_id = ? AND vocabulary_id = ?',
      [req.userId, vocabulary_id]
    );

    let easeFactor, intervalDays, repetitions, status;

    if (existing.length === 0) {
      // First review
      easeFactor = 2.5;
      repetitions = 0;
      intervalDays = 0;
    } else {
      easeFactor = parseFloat(existing[0].ease_factor);
      repetitions = existing[0].repetitions;
      intervalDays = existing[0].interval_days;
    }

    // SM-2 algorithm with modifications
    const isCorrect = rating >= 3;

    if (rating === 1) {
      // Forgot - reset
      repetitions = 0;
      intervalDays = 0;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      status = 'learning';
    } else if (rating === 2) {
      // Hard - small interval
      repetitions = Math.max(0, repetitions);
      intervalDays = Math.max(1, Math.ceil(intervalDays * 0.6));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      status = 'learning';
    } else if (rating === 3) {
      // Good
      repetitions += 1;
      if (repetitions === 1) intervalDays = 1;
      else if (repetitions === 2) intervalDays = 6;
      else intervalDays = Math.ceil(intervalDays * easeFactor);
      status = intervalDays >= 21 ? 'mastered' : 'review';
    } else if (rating === 4) {
      // Easy
      repetitions += 1;
      if (repetitions === 1) intervalDays = 4;
      else intervalDays = Math.ceil(intervalDays * easeFactor * 1.3);
      easeFactor = Math.min(3.0, easeFactor + 0.15);
      status = intervalDays >= 21 ? 'mastered' : 'review';
    }

    const dueDate = new Date(Date.now() + intervalDays * 86400000);

    if (existing.length === 0) {
      await pool.query(
        `INSERT INTO user_vocabulary (user_id, vocabulary_id, ease_factor, interval_days, repetitions, due_date, last_review, status, total_reviews, correct_count)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, 1, ?)`,
        [req.userId, vocabulary_id, easeFactor, intervalDays, repetitions, dueDate, status, isCorrect ? 1 : 0]
      );
    } else {
      await pool.query(
        `UPDATE user_vocabulary SET ease_factor = ?, interval_days = ?, repetitions = ?, due_date = ?, last_review = NOW(), status = ?, total_reviews = total_reviews + 1, correct_count = correct_count + ?
         WHERE user_id = ? AND vocabulary_id = ?`,
        [easeFactor, intervalDays, repetitions, dueDate, status, isCorrect ? 1 : 0, req.userId, vocabulary_id]
      );
    }

    // Ôn thẻ không có khái niệm "kỷ lục của một bài" nên dùng TRẦN THEO NGÀY: ôn bao nhiêu thẻ
    // cũng được, nhưng quá 60 thẻ/ngày thì thôi cộng điểm. Trước đây 10-15 điểm mỗi thẻ không
    // giới hạn — ôn 200 thẻ liền tay là 3.000 điểm.
    const diemThe = rating >= 3 ? (rating === 4 ? 15 : 10) : 5;
    let ketQuaDiem = { them: 0 };
    try {
      ketQuaDiem = await congDiemCoTranNgay(pool, {
        userId: req.userId, diem: diemThe, bang: 'user_vocabulary', cotNgay: 'last_review',
      });
    } catch (e) { console.warn('Không cộng được điểm SRS:', e.code || e.message); }
    const pointsEarned = ketQuaDiem.them;

    res.json({
      message: 'Đã ghi nhận!',
      next_review: dueDate,
      interval_days: intervalDays,
      status,
      points_earned: pointsEarned,
    });
  } catch (err) {
    console.error('SRS review error:', err);
    res.status(500).json({ error: 'Lỗi ghi nhận ôn tập.' });
  }
});

// GET /api/srs/stats - User SRS statistics
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT
        COUNT(*) as total_words,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
        SUM(CASE WHEN status = 'learning' THEN 1 ELSE 0 END) as learning_count,
        SUM(CASE WHEN status = 'review' THEN 1 ELSE 0 END) as review_count,
        SUM(CASE WHEN status = 'mastered' THEN 1 ELSE 0 END) as mastered_count,
        SUM(total_reviews) as total_reviews,
        ROUND(AVG(CASE WHEN total_reviews > 0 THEN correct_count / total_reviews * 100 END), 1) as accuracy
      FROM user_vocabulary WHERE user_id = ?
    `, [req.userId]);

    const [due] = await pool.query(
      'SELECT COUNT(*) as due_count FROM user_vocabulary WHERE user_id = ? AND due_date <= NOW()',
      [req.userId]
    );

    res.json({
      ...stats[0],
      due_count: due[0].due_count,
    });
  } catch (err) {
    console.error('SRS stats error:', err);
    res.status(500).json({ error: 'Lỗi tải thống kê.' });
  }
});


// ============================================================
// SRS v2 — khoá theo CHỮ HÁN (2026-09-08, xem CLAUDE.md 4.38)
// ============================================================
// Các route ở TRÊN dùng bảng `user_vocabulary`, khoá ngoại vào `vocabulary(id)` — bảng đó chỉ
// có 40 từ seed nên SRS chưa bao giờ ôn được quá 40 từ (đó là lý do menu SRS bị gỡ 2026-08-23).
// ĐÚNG CÙNG MỘT BỆNH với `saved_words`, đã sửa cho sổ tay ở migration-sotay.sql.
//
// Nhóm route dưới đây dùng bảng `srs_words` khoá theo chữ Hán nên ôn được MỌI từ. Thuật toán
// giãn cách giữ nguyên SM-2 biến thể của bản cũ — không đổi cách tính, chỉ đổi khoá.
//
// Route cũ GIỮ NGUYÊN, chưa xoá: dữ liệu ôn tập cũ (nếu có) vẫn đọc được.

/** Chữ Hán (kể cả khối mở rộng A). Chặn ở đây để không ai nhét chuỗi rác vào lịch ôn. */
const CHU_HAN_SRS = /^[㐀-鿿豈-﫿]{1,32}$/;
const catSrs = (v, n) => (v == null ? null : String(v).slice(0, n));

/**
 * Bước SM-2. Tách hẳn ra hàm để hai nhóm route dùng chung MỘT bộ công thức — trước đây logic
 * nằm thẳng trong handler, thêm bảng thứ hai là lập tức có nguy cơ hai bản lệch nhau.
 *   rating: 1 = Quên · 2 = Khó · 3 = Nhớ · 4 = Dễ
 */
export function buocSm2(rating, { ease_factor: ef = 2.5, interval_days: iv = 0, repetitions: rep = 0 } = {}) {
  let easeFactor = Number(ef) || 2.5;
  let intervalDays = Number(iv) || 0;
  let repetitions = Number(rep) || 0;
  let status;
  if (rating === 1) {
    repetitions = 0; intervalDays = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2); status = 'learning';
  } else if (rating === 2) {
    intervalDays = Math.max(1, Math.ceil(intervalDays * 0.6));
    easeFactor = Math.max(1.3, easeFactor - 0.15); status = 'learning';
  } else if (rating === 3) {
    repetitions += 1;
    intervalDays = repetitions === 1 ? 1 : repetitions === 2 ? 6 : Math.ceil(intervalDays * easeFactor);
    status = intervalDays >= 21 ? 'mastered' : 'review';
  } else {
    repetitions += 1;
    intervalDays = repetitions === 1 ? 4 : Math.ceil(intervalDays * easeFactor * 1.3);
    easeFactor = Math.min(3.0, easeFactor + 0.15);
    status = intervalDays >= 21 ? 'mastered' : 'review';
  }
  return { easeFactor, intervalDays, repetitions, status, dung: rating >= 3 };
}

/**
 * GET /api/srs/hom-nay — bộ thẻ ôn của hôm nay.
 *
 * Trộn hai nguồn:
 *   · thẻ ĐẾN HẠN trong `srs_words` (ưu tiên tuyệt đối — quên là phí công đã học);
 *   · nếu còn chỗ thì lấy thêm TỪ MỚI từ sổ tay mà chưa vào lịch ôn.
 *
 * Từ mới CHƯA được ghi vào `srs_words` ở bước này — chỉ ghi khi học viên thật sự ôn lần đầu
 * (POST /on). Có vậy mở trang ra rồi thoát mới không làm phình lịch ôn bằng những từ chưa hề học.
 */
router.get('/hom-nay', requireAuth, async (req, res) => {
  try {
    const limit = toLimit(req.query.limit, 20, 100);
    const [denHan] = await pool.query(
      `SELECT tu, gian, pinyin, han_viet, nghia, nguon, ease_factor, interval_days, repetitions,
              due_date, status, total_reviews, correct_count, 0 AS la_moi
       FROM srs_words WHERE user_id = ? AND due_date <= NOW()
       ORDER BY due_date ASC LIMIT ?`, [req.userId, limit],
    );
    let moi = [];
    if (denHan.length < limit) {
      const [rows] = await pool.query(
        `SELECT nw.tu, nw.gian, nw.pinyin, nw.han_viet, nw.nghia, 'so-tay' nguon,
                2.50 ease_factor, 0 interval_days, 0 repetitions, NOW() due_date,
                'new' status, 0 total_reviews, 0 correct_count, 1 AS la_moi
         FROM notebook_words nw
         WHERE nw.user_id = ?
           AND NOT EXISTS (SELECT 1 FROM srs_words s WHERE s.user_id = nw.user_id AND s.tu = nw.tu)
         ORDER BY nw.created_at ASC LIMIT ?`,
        [req.userId, limit - denHan.length],
      );
      moi = rows;
    }
    const [[tk]] = await pool.query(
      `SELECT COUNT(*) tong,
              COALESCE(SUM(due_date <= NOW()),0) den_han,
              COALESCE(SUM(status = 'mastered'),0) thuoc,
              COALESCE(SUM(status IN ('new','learning')),0) dang_hoc
       FROM srs_words WHERE user_id = ?`, [req.userId],
    );
    res.json({ the: [...denHan, ...moi], thong_ke: tk });
  } catch (err) {
    if (err && err.code === 'ER_NO_SUCH_TABLE') {
      return res.json({ the: [], thong_ke: { tong: 0, den_han: 0, thuoc: 0, dang_hoc: 0 }, chuaCoBang: true });
    }
    console.error('SRS hôm nay lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải thẻ ôn tập.' });
  }
});

/**
 * POST /api/srs/on — ghi nhận một lượt ôn.
 * Body: { tu, rating, gian?, pinyin?, han_viet?, nghia?, nguon? }
 * Bản chụp từ đi kèm để lần ôn đầu tiên tạo được bản ghi mà server không phải tra chỉ mục.
 */
router.post('/on', requireAuth, async (req, res) => {
  try {
    const tu = String(req.body?.tu || '');
    const rating = Number(req.body?.rating);
    if (!CHU_HAN_SRS.test(tu)) return res.status(400).json({ error: 'Từ cần ôn phải là chữ Hán.' });
    if (!(rating >= 1 && rating <= 4)) return res.status(400).json({ error: 'Mức đánh giá không hợp lệ.' });

    const [cu] = await pool.query('SELECT * FROM srs_words WHERE user_id = ? AND tu = ?', [req.userId, tu]);
    const b = buocSm2(rating, cu[0]);
    const dueDate = new Date(Date.now() + b.intervalDays * 86400000);

    if (cu.length === 0) {
      await pool.query(
        `INSERT INTO srs_words (user_id, tu, gian, pinyin, han_viet, nghia, nguon,
           ease_factor, interval_days, repetitions, due_date, last_review, status, total_reviews, correct_count)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 1, ?)`,
        [req.userId, tu, catSrs(req.body.gian, 32), catSrs(req.body.pinyin, 120),
          catSrs(req.body.han_viet, 120), catSrs(req.body.nghia, 500), catSrs(req.body.nguon, 40),
          b.easeFactor, b.intervalDays, b.repetitions, dueDate, b.status, b.dung ? 1 : 0],
      );
    } else {
      await pool.query(
        `UPDATE srs_words SET ease_factor = ?, interval_days = ?, repetitions = ?, due_date = ?,
           last_review = NOW(), status = ?, total_reviews = total_reviews + 1,
           correct_count = correct_count + ? WHERE user_id = ? AND tu = ?`,
        [b.easeFactor, b.intervalDays, b.repetitions, dueDate, b.status, b.dung ? 1 : 0, req.userId, tu],
      );
    }
    res.json({ tu, status: b.status, interval_days: b.intervalDays, due_date: dueDate });
  } catch (err) {
    if (err && err.code === 'ER_NO_SUCH_TABLE') {
      return res.status(503).json({ error: 'Chưa chạy migration cho ôn tập ngắt quãng.' });
    }
    console.error('SRS ôn lỗi:', err);
    res.status(500).json({ error: 'Lỗi ghi nhận lượt ôn.' });
  }
});

/**
 * POST /api/srs/them — đưa một loạt từ vào lịch ôn (vd toàn bộ từ vựng của một bài).
 * Body: { tu: [{ tu, gian, pinyin, han_viet, nghia }], nguon }
 */
router.post('/them', requireAuth, async (req, res) => {
  try {
    const ds = Array.isArray(req.body?.tu) ? req.body.tu.slice(0, 300) : [];
    const nguon = catSrs(req.body?.nguon, 40);
    const hang = ds.filter((w) => w && CHU_HAN_SRS.test(String(w.tu || '')))
      .map((w) => [req.userId, String(w.tu), catSrs(w.gian, 32), catSrs(w.pinyin, 120),
        catSrs(w.han_viet, 120), catSrs(w.nghia, 500), nguon]);
    if (!hang.length) return res.json({ them: 0 });
    // INSERT IGNORE: từ đã có trong lịch ôn thì GIỮ NGUYÊN tiến độ, đừng đặt lại về 'new'.
    const [r] = await pool.query(
      'INSERT IGNORE INTO srs_words (user_id, tu, gian, pinyin, han_viet, nghia, nguon) VALUES ?', [hang]);
    res.json({ them: r.affectedRows });
  } catch (err) {
    if (err && err.code === 'ER_NO_SUCH_TABLE') {
      return res.status(503).json({ error: 'Chưa chạy migration cho ôn tập ngắt quãng.' });
    }
    console.error('SRS thêm lỗi:', err);
    res.status(500).json({ error: 'Lỗi thêm từ vào lịch ôn.' });
  }
});

/** DELETE /api/srs/:tu — bỏ một từ khỏi lịch ôn. */
router.delete('/:tu', requireAuth, async (req, res) => {
  try {
    const tu = decodeURIComponent(req.params.tu || '');
    if (!CHU_HAN_SRS.test(tu)) return res.status(400).json({ error: 'Từ không hợp lệ.' });
    await pool.query('DELETE FROM srs_words WHERE user_id = ? AND tu = ?', [req.userId, tu]);
    res.json({ ok: true });
  } catch (err) {
    console.error('SRS xoá lỗi:', err);
    res.status(500).json({ error: 'Lỗi xoá từ khỏi lịch ôn.' });
  }
});

export default router;
