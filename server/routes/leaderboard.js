// Leaderboard Routes
import { Router } from 'express';
import pool from '../config/db.js';
import { toLimit } from '../utils/num.js';

const router = Router();

// GET /api/leaderboard - Top users by points
router.get('/', async (req, res) => {
  try {
    // '?limit=abc' trước đây thành LIMIT NaN -> lỗi SQL -> 500. Xem server/utils/num.js.
    const limit = toLimit(req.query.limit, 50, 200);
    const [rows] = await pool.query(`
      SELECT id, name, avatar_letter, avatar_color, level_label, level_num, points, streak
      FROM users
      WHERE is_admin = 0
      ORDER BY points DESC
      LIMIT ?
    `, [limit]);
    res.json({ leaderboard: rows });
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: 'Lỗi tải bảng xếp hạng.' });
  }
});

// GET /api/leaderboard/monthly - Top by exam scores this month
router.get('/monthly', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.name, u.avatar_letter, u.avatar_color, u.level_label,
             COALESCE(SUM(er.score_percent * er.total_questions), 0) as total_score,
             COUNT(er.id) as exam_count
      FROM users u
      LEFT JOIN exam_results er ON er.user_id = u.id AND er.created_at >= DATE_FORMAT(NOW(), '%Y-%m-01')
      WHERE u.is_admin = 0
      GROUP BY u.id
      HAVING total_score > 0
      ORDER BY total_score DESC
      LIMIT 10
    `);
    res.json({ leaderboard: rows });
  } catch (err) {
    console.error('Monthly leaderboard error:', err);
    res.status(500).json({ error: 'Lỗi tải bảng xếp hạng tháng.' });
  }
});

export default router;
