// Saved Words Routes
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/saved-words - List saved words
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.*, sw.created_at as saved_at
      FROM saved_words sw
      JOIN vocabulary v ON v.id = sw.vocabulary_id
      WHERE sw.user_id = ?
      ORDER BY sw.created_at DESC
    `, [req.userId]);
    res.json({ saved_words: rows });
  } catch (err) {
    console.error('Saved words error:', err);
    res.status(500).json({ error: 'Lỗi tải sổ tay từ vựng.' });
  }
});

// POST /api/saved-words/:wordId - Toggle save/unsave word
router.post('/:wordId', requireAuth, async (req, res) => {
  try {
    // parseInt trên đường dẫn rác (vd /api/saved-words/abc) cho NaN; mysql2 chuyển NaN thành chuỗi
    // "NaN" trong câu SQL -> lỗi cú pháp -> 500. Chặn sớm và trả 400 cho rõ ràng.
    const wordId = parseInt(req.params.wordId, 10);
    if (!Number.isInteger(wordId) || wordId <= 0) {
      return res.status(400).json({ error: 'Mã từ vựng không hợp lệ.' });
    }

    // Check if word exists
    const [vocab] = await pool.query('SELECT id FROM vocabulary WHERE id = ?', [wordId]);
    if (vocab.length === 0) return res.status(404).json({ error: 'Không tìm thấy từ vựng.' });

    // Check if already saved
    const [existing] = await pool.query(
      'SELECT id FROM saved_words WHERE user_id = ? AND vocabulary_id = ?',
      [req.userId, wordId]
    );

    if (existing.length > 0) {
      // Unsave
      await pool.query('DELETE FROM saved_words WHERE user_id = ? AND vocabulary_id = ?', [req.userId, wordId]);
      res.json({ saved: false, message: 'Đã bỏ lưu từ.' });
    } else {
      // Save
      await pool.query('INSERT INTO saved_words (user_id, vocabulary_id) VALUES (?, ?)', [req.userId, wordId]);
      res.json({ saved: true, message: 'Đã lưu vào sổ tay.' });
    }
  } catch (err) {
    console.error('Toggle save error:', err);
    res.status(500).json({ error: 'Lỗi lưu từ vựng.' });
  }
});

// DELETE /api/saved-words/:wordId - Remove saved word
router.delete('/:wordId', requireAuth, async (req, res) => {
  try {
    const wordId = parseInt(req.params.wordId, 10);
    if (!Number.isInteger(wordId) || wordId <= 0) {
      return res.status(400).json({ error: 'Mã từ vựng không hợp lệ.' });
    }
    await pool.query('DELETE FROM saved_words WHERE user_id = ? AND vocabulary_id = ?', [req.userId, wordId]);
    res.json({ message: 'Đã xóa khỏi sổ tay.' });
  } catch (err) {
    console.error('Delete saved word error:', err);
    res.status(500).json({ error: 'Lỗi xóa từ vựng.' });
  }
});

export default router;
