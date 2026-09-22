// Dialogue Routes
import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/dialogues - List all dialogues
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT d.*, COUNT(dl.id) as line_count
       FROM dialogues d
       LEFT JOIN dialogue_lines dl ON dl.dialogue_id = d.id
       GROUP BY d.id ORDER BY d.sort_order`
    );
    res.json({ dialogues: rows });
  } catch (err) {
    console.error('Dialogues list error:', err);
    res.status(500).json({ error: 'Lỗi tải hội thoại.' });
  }
});

// GET /api/dialogues/:id - Get dialogue with lines
router.get('/:id', async (req, res) => {
  try {
    const [dialogues] = await pool.query('SELECT * FROM dialogues WHERE id = ?', [req.params.id]);
    if (dialogues.length === 0) return res.status(404).json({ error: 'Không tìm thấy hội thoại.' });

    const [lines] = await pool.query(
      'SELECT * FROM dialogue_lines WHERE dialogue_id = ? ORDER BY line_order',
      [req.params.id]
    );

    res.json({ dialogue: dialogues[0], lines });
  } catch (err) {
    console.error('Dialogue detail error:', err);
    res.status(500).json({ error: 'Lỗi tải chi tiết hội thoại.' });
  }
});

export default router;
