// Exam Routes
import { Router } from 'express';
import { congDiemVuotKyLuc } from '../utils/diem.js';
import pool from '../config/db.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
import { toLimit } from '../utils/num.js';

const router = Router();

// GET /api/exam/questions - Get exam questions
router.get('/questions', async (req, res) => {
  try {
    const { type, level = 'Band A' } = req.query;
    const limit = toLimit(req.query.limit, 10, 100); // kẹp lại: '?limit=abc' từng làm SQL lỗi 500
    let sql = 'SELECT * FROM exam_questions WHERE 1=1';
    const params = [];

    if (type) { sql += ' AND type = ?'; params.push(type); }
    if (level) { sql += ' AND level = ?'; params.push(level); }

    sql += ' ORDER BY RAND() LIMIT ?';
    params.push(limit);

    const [rows] = await pool.query(sql, params);
    // ⚠️ KHÔNG trả `correct_option` (2026-09-15). Route này KHÔNG đòi đăng nhập, mà trước đây nó
    // `SELECT *` rồi trả nguyên bản ghi — tức đáp án đúng của mọi câu nằm sẵn trong response, ai
    // mở tab Network cũng thấy, và một lời gọi curl là có trọn ngân hàng đề kèm đáp án.
    //
    // Bài thi được chấm ở SERVER (`POST /exam/submit` tự tra `correct_option` trong DB), nên bỏ
    // cột này đi không làm hỏng luồng nào. `explanation` cũng bỏ vì nó thường nói thẳng đáp án.
    res.json({ questions: rows.map(({ correct_option, explanation, ...q }) => q) });
  } catch (err) {
    console.error('Exam questions error:', err);
    res.status(500).json({ error: 'Lỗi tải đề thi.' });
  }
});

// POST /api/exam/submit - Submit exam answers
router.post('/submit', requireAuth, async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { answers, skill, time_seconds } = req.body;
    // answers: [{ question_id, selected_option }]
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Không có câu trả lời nào.' });
    }

    // Chuẩn hoá về số NGAY từ đầu. Trước đây so sánh `correct_option === selected_option` bằng ===
    // trong khi correct_option là TINYINT (số) từ DB còn selected_option lấy thẳng từ JSON body —
    // client gửi "2" (chuỗi) là chấm sai sạch cả bài mà không có lỗi nào hiện ra.
    const cleaned = answers
      .map(a => ({
        question_id: Number(a?.question_id),
        selected_option: Number(a?.selected_option),
      }))
      .filter(a => Number.isInteger(a.question_id) && Number.isInteger(a.selected_option) && a.selected_option >= 0);

    if (cleaned.length === 0) {
      return res.status(400).json({ error: 'Dữ liệu câu trả lời không hợp lệ.' });
    }

    // Get correct answers
    const questionIds = cleaned.map(a => a.question_id);
    const [questions] = await conn.query(
      `SELECT id, correct_option FROM exam_questions WHERE id IN (${questionIds.map(() => '?').join(',')})`,
      questionIds
    );
    const correctMap = {};
    questions.forEach(q => { correctMap[q.id] = Number(q.correct_option); });

    // Bỏ những câu trỏ tới question_id không còn tồn tại (đề bị xoá trong lúc học viên đang thi) —
    // giữ lại sẽ vi phạm khoá ngoại exam_answers.question_id và làm hỏng cả lượt nộp bài.
    const valid = cleaned.filter(a => correctMap[a.question_id] !== undefined);
    if (valid.length === 0) {
      return res.status(400).json({ error: 'Các câu hỏi của bài thi này không còn tồn tại.' });
    }

    let correctCount = 0;
    const answerDetails = valid.map(a => {
      const isCorrect = correctMap[a.question_id] === a.selected_option;
      if (isCorrect) correctCount++;
      return { ...a, is_correct: isCorrect };
    });

    const totalQuestions = answerDetails.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100 * 100) / 100;

    // Bọc transaction: trước đây insert exam_results xong rồi chạy vòng lặp insert từng câu trả lời,
    // câu nào lỗi giữa chừng là để lại 1 lượt thi "cụt" (có điểm nhưng thiếu chi tiết) không xoá được.
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO exam_results (user_id, skill, total_questions, correct_answers, score_percent, time_seconds) VALUES (?, ?, ?, ?, ?, ?)`,
      [req.userId, skill || 'mixed', totalQuestions, correctCount, scorePercent, time_seconds || 0]
    );

    // Insert 1 lần cho tất cả câu trả lời thay vì N query riêng (nhanh hơn nhiều trên serverless,
    // mỗi round-trip tới Aiven đều tốn thời gian).
    await conn.query(
      'INSERT INTO exam_answers (exam_result_id, question_id, selected_option, is_correct) VALUES ?',
      [answerDetails.map(a => [result.insertId, a.question_id, a.selected_option, a.is_correct ? 1 : 0])]
    );

    // Điểm theo thành tích tốt nhất của CÙNG KỸ NĂNG (exam_results định danh bài bằng `skill`),
    // hệ số 2 giữ nguyên như trước. Xem utils/diem.js.
    let diemThi = { them: 0, ky_luc_cu: 0, la_ky_luc_moi: false };
    try {
      diemThi = await congDiemVuotKyLuc(conn, {
        userId: req.userId, bang: 'exam_results', cotKhoa: 'skill',
        khoa: skill, diemMoi: scorePercent, heSo: 2, boQuaId: result.insertId,
      });
    } catch (e) { console.warn('Không cộng được điểm thi:', e.code || e.message); }
    const pointsEarned = diemThi.them;

    // Thi thử cũng là "hôm nay có học" (4.38). Lỗi ở đây không được làm hỏng việc nộp bài thi.
    try { await capNhatChuoi(req.userId); }
    catch (e) { console.warn('Không cập nhật được chuỗi ngày:', e.code || e.message); }

    await conn.commit();

    res.json({
      exam_result_id: result.insertId,
      total_questions: totalQuestions,
      correct_answers: correctCount,
      score_percent: scorePercent,
      points_earned: pointsEarned,
      answers: answerDetails,
    });
  } catch (err) {
    if (conn) { try { await conn.rollback(); } catch (_) { /* chưa mở transaction thì bỏ qua */ } }
    console.error('Exam submit error:', err);
    res.status(500).json({ error: 'Lỗi nộp bài thi.' });
  } finally {
    // Bắt buộc trả connection về pool kể cả khi lỗi — quên release là pool cạn dần rồi treo toàn bộ API.
    if (conn) conn.release();
  }
});

// GET /api/exam/history - User exam history
router.get('/history', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, skill, total_questions, correct_answers, score_percent, time_seconds, created_at
       FROM exam_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`,
      [req.userId]
    );
    res.json({ history: rows });
  } catch (err) {
    console.error('Exam history error:', err);
    res.status(500).json({ error: 'Lỗi tải lịch sử thi.' });
  }
});

// GET /api/exam/result/:id - Detailed exam result
router.get('/result/:id', requireAuth, async (req, res) => {
  try {
    const [results] = await pool.query(
      'SELECT * FROM exam_results WHERE id = ? AND user_id = ?',
      [req.params.id, req.userId]
    );
    if (results.length === 0) return res.status(404).json({ error: 'Không tìm thấy kết quả.' });

    const [answers] = await pool.query(`
      SELECT ea.*, eq.question, eq.question_meaning, eq.option_a, eq.option_b, eq.option_c, eq.option_d,
             eq.correct_option, eq.passage, eq.audio_desc
      FROM exam_answers ea
      JOIN exam_questions eq ON eq.id = ea.question_id
      WHERE ea.exam_result_id = ?
    `, [req.params.id]);

    res.json({ result: results[0], answers });
  } catch (err) {
    console.error('Exam result error:', err);
    res.status(500).json({ error: 'Lỗi tải kết quả.' });
  }
});

export default router;
