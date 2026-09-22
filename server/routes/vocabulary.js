// Vocabulary Routes
import { Router } from 'express';
import pool from '../config/db.js';
import { optionalAuth } from '../middleware/auth.js';
import { toLimit, toPage } from '../utils/num.js';
import { chanTraCuu } from '../middleware/gioi-han.js';

const router = Router();

// Kho từ vựng là tài sản của dự án (10.927 mục đã rà nghĩa tiếng Việt). Không giới hạn thì lấy
// trọn kho chỉ là một vòng lặp `?page=1..N` — xem server/middleware/gioi-han.js.
router.use(chanTraCuu);

// GET /api/vocabulary - List vocabulary with filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { level, lesson, search } = req.query;
    // Kẹp page/limit: '?page=0' từng cho OFFSET âm và '?limit=abc' cho LIMIT NaN — cả hai đều làm
    // MySQL ném lỗi và route trả 500. Xem server/utils/num.js.
    const page = toPage(req.query.page);
    const limit = toLimit(req.query.limit, 50, 200);
    let sql = 'SELECT v.*';
    const params = [];

    // If user is logged in, include saved status
    if (req.userId) {
      sql += ', IF(sw.id IS NOT NULL, 1, 0) AS is_saved';
    }
    sql += ' FROM vocabulary v';
    if (req.userId) {
      sql += ' LEFT JOIN saved_words sw ON sw.vocabulary_id = v.id AND sw.user_id = ?';
      params.push(req.userId);
    }

    const where = [];
    if (level) { where.push('v.level = ?'); params.push(level); }
    if (lesson) { where.push('v.lesson = ?'); params.push(lesson); }
    if (search) {
      where.push('(v.hanzi LIKE ? OR v.simplified LIKE ? OR v.pinyin LIKE ? OR v.meaning LIKE ?)');
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }
    if (where.length) sql += ' WHERE ' + where.join(' AND ');

    sql += ' ORDER BY v.level, v.lesson, v.id';
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM vocabulary v';
    const countParams = [];
    const countWhere = [];
    if (level) { countWhere.push('v.level = ?'); countParams.push(level); }
    if (lesson) { countWhere.push('v.lesson = ?'); countParams.push(lesson); }
    if (search) {
      countWhere.push('(v.hanzi LIKE ? OR v.simplified LIKE ? OR v.pinyin LIKE ? OR v.meaning LIKE ?)');
      const s = `%${search}%`;
      countParams.push(s, s, s, s);
    }
    if (countWhere.length) countSql += ' WHERE ' + countWhere.join(' AND ');
    const [countRows] = await pool.query(countSql, countParams);

    res.json({
      vocabulary: rows,
      total: countRows[0].total,
      page,
      limit,
    });
  } catch (err) {
    console.error('Vocabulary list error:', err);
    res.status(500).json({ error: 'Lỗi tải từ vựng.' });
  }
});

// GET /api/vocabulary/search - Quick search for dictionary
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 1) return res.json({ results: [] });

    const s = `%${q}%`;
    const [rows] = await pool.query(
      `SELECT id, hanzi, simplified, pinyin, meaning, level
       FROM vocabulary
       WHERE hanzi LIKE ? OR simplified LIKE ? OR pinyin LIKE ? OR meaning LIKE ?
       LIMIT 10`,
      [s, s, s, s]
    );
    res.json({ results: rows });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Lỗi tìm kiếm.' });
  }
});

// GET /api/vocabulary/levels/stats - Get vocab count by level
// IMPORTANT: Must be BEFORE /:id to avoid matching "levels" as an id
router.get('/levels/stats', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT level, COUNT(*) as count FROM vocabulary GROUP BY level ORDER BY level'
    );
    res.json({ levels: rows });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải thống kê.' });
  }
});

// GET /api/vocabulary/:id - Single word detail
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    let sql = 'SELECT v.*';
    const params = [];
    if (req.userId) {
      sql += ', IF(sw.id IS NOT NULL, 1, 0) AS is_saved';
    }
    sql += ' FROM vocabulary v';
    if (req.userId) {
      sql += ' LEFT JOIN saved_words sw ON sw.vocabulary_id = v.id AND sw.user_id = ?';
      params.push(req.userId);
    }
    sql += ' WHERE v.id = ?';
    params.push(req.params.id);

    const [rows] = await pool.query(sql, params);
    if (rows.length === 0) return res.status(404).json({ error: 'Không tìm thấy từ vựng.' });
    res.json({ word: rows[0] });
  } catch (err) {
    console.error('Vocab detail error:', err);
    res.status(500).json({ error: 'Lỗi tải chi tiết từ.' });
  }
});

export default router;

