// Blog Routes
import { Router } from 'express';
import pool from '../config/db.js';
import { toLimit } from '../utils/num.js';

const router = Router();

// GET /api/blog - List blog posts
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    // '?limit=abc' trước đây thành LIMIT NaN -> MySQL lỗi cú pháp -> 500. Xem server/utils/num.js.
    const limit = toLimit(req.query.limit, 20, 100);
    let sql = 'SELECT * FROM blog_posts';
    const params = [];

    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    sql += ' ORDER BY published_at DESC LIMIT ?';
    params.push(limit);

    const [rows] = await pool.query(sql, params);

    // Get categories
    const [cats] = await pool.query('SELECT DISTINCT category FROM blog_posts ORDER BY category');

    res.json({ posts: rows, categories: cats.map(c => c.category) });
  } catch (err) {
    console.error('Blog list error:', err);
    res.status(500).json({ error: 'Lỗi tải bài viết.' });
  }
});

// GET /api/blog/:id - Blog post detail
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });
    res.json({ post: rows[0] });
  } catch (err) {
    console.error('Blog detail error:', err);
    res.status(500).json({ error: 'Lỗi tải bài viết.' });
  }
});

export default router;
