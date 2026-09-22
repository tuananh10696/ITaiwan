// Exercise Routes — Bài tập Giáo trình Đương đại
import { Router } from 'express';
import { congDiemVuotKyLuc } from '../utils/diem.js';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { capNhatChuoi } from './lotrinh.js';

const router = Router();

// Số thông báo tối đa trả về cho chuông. Đặt hằng số vì dùng ở 2 query rồi mới gộp:
// mỗi query lấy tối đa ngần này, gộp xong cắt lại đúng ngần này.
const NOTIF_LIMIT = 30;

// POST /api/exercise/submit — Nộp bài tập
router.post('/submit', requireAuth, async (req, res) => {
  try {
    const { lesson_id, total_questions, correct_answers, time_seconds, details } = req.body;

    if (!lesson_id || !total_questions || total_questions < 1) {
      return res.status(400).json({ error: 'Dữ liệu bài tập không hợp lệ.' });
    }
    if (lesson_id.length > 20) {
      return res.status(400).json({ error: 'lesson_id không hợp lệ (quá dài).' });
    }

    const scorePercent = Math.round((correct_answers / total_questions) * 100 * 100) / 100;

    // details (tuỳ chọn): snapshot câu hỏi/lựa chọn/đáp án từng câu — dùng để giáo viên xem lại
    // đúng-sai trong Quản lý lớp. Không bắt buộc để không phá các nơi gọi /exercise/submit cũ
    // (nếu có) chưa gửi kèm field này.
    let detailsJson = null;
    if (details !== undefined && details !== null) {
      try { detailsJson = JSON.stringify(details); } catch { detailsJson = null; }
    }

    // Save exercise result
    const [result] = await pool.query(
      `INSERT INTO exercise_results (user_id, lesson_id, total_questions, correct_answers, score_percent, time_seconds, details_json)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.userId, lesson_id, total_questions, correct_answers || 0, scorePercent, time_seconds || 0, detailsJson]
    );

    // Điểm theo THÀNH TÍCH TỐT NHẤT của bài này, không phải theo số lần nộp — xem utils/diem.js.
    // `boQuaId` là bản ghi vừa insert ở trên: thiếu nó thì chính lần nộp này nằm trong MAX và
    // phần cộng thêm luôn bằng 0.
    let diem = { them: 0, ky_luc_cu: 0, la_ky_luc_moi: false };
    try {
      diem = await congDiemVuotKyLuc(pool, {
        userId: req.userId, bang: 'exercise_results', cotKhoa: 'lesson_id',
        khoa: lesson_id, diemMoi: scorePercent, boQuaId: result.insertId,
      });
    } catch (e) { console.warn('Không cộng được điểm:', e.code || e.message); }
    const pointsEarned = diem.them;

    // Nộp bài là bằng chứng chắc chắn nhất của "hôm nay có học" -> cập nhật chuỗi ngày ngay,
    // không cần chờ đủ 5 phút hoạt động (4.38). Lỗi ở đây KHÔNG được làm hỏng việc nộp bài.
    let chuoi = null;
    try { chuoi = await capNhatChuoi(req.userId); }
    catch (e) { console.warn('Không cập nhật được chuỗi ngày:', e.code || e.message); }

    res.json({
      exercise_result_id: result.insertId,
      lesson_id,
      total_questions,
      correct_answers: correct_answers || 0,
      score_percent: scorePercent,
      points_earned: pointsEarned,
      // Giao diện cần phân biệt "được 0 điểm vì làm kém" với "được 0 điểm vì đã từng làm tốt hơn",
      // nếu không học viên tưởng hệ thống quên cộng điểm.
      ky_luc_cu: diem.ky_luc_cu,
      la_ky_luc_moi: diem.la_ky_luc_moi,
      chuoi,
    });
  } catch (err) {
    console.error('Exercise submit error:', err);
    res.status(500).json({ error: 'Lỗi nộp bài tập.' });
  }
});

// GET /api/exercise/history — Lịch sử bài tập của user
router.get('/history', requireAuth, async (req, res) => {
  try {
    const { lesson_id } = req.query;
    let sql = `SELECT id, lesson_id, total_questions, correct_answers, score_percent, time_seconds, created_at
               FROM exercise_results WHERE user_id = ?`;
    const params = [req.userId];

    if (lesson_id) {
      sql += ' AND lesson_id = ?';
      params.push(lesson_id);
    }

    sql += ' ORDER BY created_at DESC LIMIT 50';
    const [rows] = await pool.query(sql, params);
    res.json({ history: rows });
  } catch (err) {
    console.error('Exercise history error:', err);
    res.status(500).json({ error: 'Lỗi tải lịch sử bài tập.' });
  }
});

// GET /api/exercise/best/:lessonId — Điểm cao nhất cho 1 bài
router.get('/best/:lessonId', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT score_percent, correct_answers, total_questions, time_seconds, created_at
       FROM exercise_results
       WHERE user_id = ? AND lesson_id = ?
       ORDER BY score_percent DESC, time_seconds ASC
       LIMIT 1`,
      [req.userId, req.params.lessonId]
    );
    res.json({ best: rows[0] || null });
  } catch (err) {
    console.error('Exercise best error:', err);
    res.status(500).json({ error: 'Lỗi tải điểm cao nhất.' });
  }
});

// GET /api/exercise/my-assignments — Bài giáo viên GIAO cho các lớp học viên đang theo học.
// Không có endpoint này thì giáo viên giao bài mà học viên chẳng biết đường nào mà làm.
router.get('/my-assignments', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.id, a.lesson_id, a.title, a.due_date, a.note, c.name AS class_name,
        EXISTS (SELECT 1 FROM exercise_results er
                WHERE er.user_id = ? AND er.lesson_id = a.lesson_id) AS submitted,
        (SELECT MAX(er2.score_percent) FROM exercise_results er2
          WHERE er2.user_id = ? AND er2.lesson_id = a.lesson_id) AS best_score
      FROM assignments a
      JOIN classes c ON c.id = a.class_id
      JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
      ORDER BY (a.due_date IS NULL), a.due_date ASC
      LIMIT 50
    `, [req.userId, req.userId, req.userId]);
    res.json({ assignments: rows });
  } catch (err) {
    // Chưa chạy migration thì trả rỗng, đừng làm vỡ trang của học viên.
    console.warn('My assignments unavailable:', err.code || err.message);
    res.json({ assignments: [], unavailable: true });
  }
});

// GET /api/exercise/notifications — Chuông của học viên. Gộp 2 loại việc:
//   · 'exercise' / 'exam' — giáo viên đã CHẤM bài, có lời phê
//   · 'assignment'        — giáo viên vừa GIAO bài cho lớp (2026-08-27)
//   · 'payment'           — đơn mua khoá đã được DUYỆT hoặc TỪ CHỐI (2026-09-09)
//   · 'du-hoc'            — lịch phỏng vấn / lịch bay / nhắc nộp của hồ sơ du học (2026-09-16)
// Cả 5 loại dùng chung field `read_at` để frontend chỉ có một khái niệm "đã đọc".
router.get('/notifications', requireAuth, async (req, res) => {
  try {
    // TRIM(...) <> '': chỉ coi là "có nhận xét" khi lời phê thực sự có chữ.
    // 2026-08-27 — nếu chỉ lọc `IS NOT NULL` thì một lời phê rỗng/toàn khoảng trắng vẫn sinh ra
    // chuông đỏ, học viên bấm vào lại không thấy gì. Route lưu nhận xét cũng đã trim + đổi chuỗi
    // rỗng thành NULL, đây là lớp chặn thứ hai cho các bản ghi cũ đã lỡ lưu chuỗi rỗng.
    // `topic` là lesson_id / skill thô — frontend tự đổi thành nhãn đọc được (notifLabel).
    // Trả kèm điểm + số câu + thời gian làm để dropdown hiện được ngay, không phải gọi thêm API
    // cho từng thông báo.
    const [reviews] = await pool.query(
      `SELECT 'exercise' AS type, id, lesson_id AS topic,
              total_questions, correct_answers, score_percent, time_seconds,
              teacher_review, review_read_at AS read_at, created_at
       FROM exercise_results
       WHERE user_id = ? AND teacher_review IS NOT NULL AND TRIM(teacher_review) <> ''
       UNION ALL
       SELECT 'exam' AS type, id, skill AS topic,
              total_questions, correct_answers, score_percent, time_seconds,
              teacher_review, review_read_at AS read_at, created_at
       FROM exam_results
       WHERE user_id = ? AND teacher_review IS NOT NULL AND TRIM(teacher_review) <> ''
       ORDER BY created_at DESC LIMIT ${NOTIF_LIMIT}`,
      [req.userId, req.userId]
    );

    const assignments = await layThongBaoBaiGiao(req.userId);
    const thanhToan = await layThongBaoThanhToan(req.userId);
    const duHoc = await layThongBaoDuHoc(req.userId);
    const deBai = await layThongBaoDeBai(req.userId);

    // Gộp rồi sắp lại theo thời gian: chấm bài, giao bài và kết quả duyệt thanh toán xen kẽ nhau
    // theo đúng dòng thời gian.
    const notifications = [...reviews, ...assignments, ...thanhToan, ...duHoc, ...deBai]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, NOTIF_LIMIT);

    res.json({ notifications });
  } catch (err) {
    console.error('Notifications error:', err);
    res.status(500).json({ error: 'Lỗi tải thông báo.' });
  }
});

/**
 * Thông báo "cô vừa giao bài" của các lớp học viên đang theo học.
 *
 * `created_at` cố ý lấy `a.updated_at` (mốc giao/sửa gần nhất) chứ không phải lúc tạo: giáo viên
 * đổi hạn nộp thì đó là TIN MỚI với học viên, phải nổi lên đầu và thành chưa đọc lại.
 * Cùng lý do đó, đã đọc trước lần sửa (`read_at < updated_at`) cũng bị coi là chưa đọc.
 *
 * Chưa chạy migration `migration-assignment-reads.sql` thì trả rỗng — chuông vẫn hiện được
 * phần nhận xét, không vỡ cả tính năng chỉ vì thiếu một bảng.
 */
async function layThongBaoBaiGiao(userId) {
  try {
    const [rows] = await pool.query(`
      SELECT 'assignment' AS type, a.id, a.lesson_id AS topic, a.title, a.note,
             a.due_date, c.name AS class_name,
             a.updated_at AS created_at, ar.read_at,
             EXISTS (SELECT 1 FROM exercise_results er
                     WHERE er.user_id = ? AND er.lesson_id = a.lesson_id) AS submitted
      FROM assignments a
      JOIN classes c ON c.id = a.class_id
      JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
      LEFT JOIN assignment_reads ar ON ar.assignment_id = a.id AND ar.user_id = ?
      ORDER BY a.updated_at DESC
      LIMIT ${NOTIF_LIMIT}
    `, [userId, userId, userId]);

    return rows.map((r) => ({
      ...r,
      submitted: !!r.submitted,
      // Đọc từ trước lần giáo viên sửa gần nhất = chưa đọc bản mới.
      read_at: r.read_at && new Date(r.read_at) >= new Date(r.created_at) ? r.read_at : null,
    }));
  } catch (err) {
    console.warn('Thông báo bài giao không dùng được:', err.code || err.message);
    return [];
  }
}

/**
 * Kết quả duyệt đơn mua khoá học (2026-09-09).
 *
 * Chỉ đơn ĐÃ XỬ LÝ mới thành thông báo — đơn đang chờ thì học viên vừa tự tạo xong, báo lại cho
 * chính họ là thừa. Mốc thời gian lấy `duyet_luc` (lúc có kết quả), không phải lúc tạo đơn.
 *
 * Chưa chạy `migration-thanh-toan.sql` thì trả rỗng, chuông vẫn chạy phần còn lại — cùng lối
 * phòng thủ với `layThongBaoBaiGiao`.
 */
async function layThongBaoThanhToan(userId) {
  try {
    const [rows] = await pool.query(`
      SELECT 'payment' AS type, p.id, p.product_ma AS topic, p.trang_thai, p.so_tien,
             p.ma_giao_dich, p.ghi_chu, pr.ten AS san_pham_ten,
             p.duyet_luc AS created_at, p.da_doc_luc AS read_at
        FROM payments p
        LEFT JOIN products pr ON pr.ma = p.product_ma
       WHERE p.user_id = ? AND p.trang_thai IN ('thanh-cong','tu-choi') AND p.duyet_luc IS NOT NULL
       ORDER BY p.duyet_luc DESC
       LIMIT ${NOTIF_LIMIT}
    `, [userId]);
    return rows;
  } catch (err) {
    console.warn('Thông báo thanh toán không dùng được:', err.code || err.message);
    return [];
  }
}

/**
 * Thông báo của hồ sơ du học: lịch phỏng vấn, lịch bay, kết quả visa, nhắc nộp giấy tờ/phí,
 * kết quả duyệt yêu cầu sửa. Ghi sẵn thành bản ghi ở `du_hoc_thong_bao` (xem
 * server/utils/du-hoc-thong-bao.js) chứ không suy tại chỗ từ cột mốc của hồ sơ — suy tại chỗ
 * thì không biết em đã đọc chưa, và đổi ngày phỏng vấn hai lần chỉ còn thấy lần cuối.
 *
 * Chưa chạy `migration-du-hoc-hocvien.sql` thì trả rỗng, chuông vẫn chạy 4 loại còn lại.
 */
async function layThongBaoDuHoc(userId) {
  try {
    const [rows] = await pool.query(`
      SELECT 'du-hoc' AS type, t.id, t.loai AS topic, t.tieu_de, t.noi_dung,
             t.ngay_lien_quan, t.created_at, t.da_doc_luc AS read_at
        FROM du_hoc_thong_bao t
       WHERE t.user_id = ?
       ORDER BY t.created_at DESC
       LIMIT ${NOTIF_LIMIT}
    `, [userId]);
    return rows;
  } catch (err) {
    console.warn('Thông báo du học không dùng được:', err.code || err.message);
    return [];
  }
}

/**
 * Thông báo của ĐỀ TỰ SOẠN (2026-09-17) — loại thứ SÁU của chuông.
 *
 * Gồm hai việc, phân biệt bằng `topic`:
 *   'giao'  — giáo viên vừa giao một đề cho lớp mình / cho riêng mình
 *   'cham'  — giáo viên vừa chấm bài của mình (có nhận xét hoặc điểm tự luận)
 *
 * SUY THẲNG từ `de_giao` và `de_bai_lam`, KHÔNG có bảng thông báo riêng — đúng cách "bài cô giao"
 * đang làm (4.18): thông báo suy ra từ chính bảng nghiệp vụ nên không bao giờ có chuyện giao bài
 * xong mà quên tạo thông báo.
 *
 * ⚠️ `id` của hai nhóm đến từ HAI bảng khác nhau nên chắc chắn trùng nhau. Khoá tra một thông báo
 *    là cặp (type, id) — nhưng ở đây cùng type 'de-bai', nên phải cho `id` mang tiền tố
 *    ('g<id>' / 'b<id>') để phân biệt. Route đánh dấu đã đọc bên dưới đọc đúng tiền tố đó.
 *
 * Chưa chạy `migration-de-bai.sql` thì trả rỗng, chuông vẫn chạy 5 loại còn lại.
 */
async function layThongBaoDeBai(userId) {
  try {
    const [giao] = await pool.query(`
      SELECT 'de-bai' AS type, CONCAT('g', g.id) AS id, 'giao' AS topic,
             d.tieu_de, d.loai AS de_loai, d.thoi_gian_phut,
             g.dong_luc AS due_date, c.name AS class_name, g.ghi_chu AS note,
             g.id AS giao_id, d.id AS de_id,
             (SELECT COUNT(*) FROM de_bai_lam b
               WHERE b.de_id = d.id AND b.user_id = ? AND b.trang_thai <> 'dang-lam') AS submitted,
             g.updated_at AS created_at,
             NULL AS read_at
        FROM de_giao g
        JOIN de_bai d ON d.id = g.de_id AND d.trang_thai = 'phat-hanh'
        LEFT JOIN classes c ON c.id = g.class_id
       WHERE g.user_id = ?
          OR (g.class_id IS NOT NULL AND EXISTS (
               SELECT 1 FROM class_enrollments ce WHERE ce.class_id = g.class_id AND ce.user_id = ?
             ))
       ORDER BY g.updated_at DESC
       LIMIT ${NOTIF_LIMIT}
    `, [userId, userId, userId]);

    const [cham] = await pool.query(`
      SELECT 'de-bai' AS type, CONCAT('b', b.id) AS id, 'cham' AS topic,
             d.tieu_de, d.loai AS de_loai,
             b.diem, b.tong_diem, b.so_cau_dung, b.tong_cau, b.nhan_xet,
             b.id AS bai_lam_id, d.id AS de_id,
             b.cham_luc AS created_at, b.da_doc_luc AS read_at
        FROM de_bai_lam b
        JOIN de_bai d ON d.id = b.de_id
       WHERE b.user_id = ? AND b.cham_luc IS NOT NULL
       ORDER BY b.cham_luc DESC
       LIMIT ${NOTIF_LIMIT}
    `, [userId]);

    // Lượt giao KHÔNG có mốc "đã đọc" riêng: coi là đã đọc khi học sinh đã nộp bài — bấm vào
    // thông báo là đi thẳng tới trang làm bài, nộp xong thì việc đó không còn cần nhắc nữa.
    return [
      ...giao.map((g) => ({ ...g, read_at: Number(g.submitted) > 0 ? g.created_at : null })),
      ...cham,
    ];
  } catch (err) {
    console.warn('Thông báo đề bài không dùng được:', err.code || err.message);
    return [];
  }
}

// POST /api/exercise/notifications/:type/:id/read — Đánh dấu đã đọc 1 thông báo.
router.post('/notifications/:type/:id/read', requireAuth, async (req, res) => {
  const { type, id } = req.params;
  try {
    if (type === 'assignment') {
      // JOIN class_enrollments trong chính câu INSERT: học viên không thuộc lớp thì SELECT ra 0 dòng
      // -> không ghi được gì. Đây là chỗ chặn quyền, đừng đổi thành INSERT ... VALUES.
      await pool.query(`
        INSERT INTO assignment_reads (assignment_id, user_id)
        SELECT a.id, ?
        FROM assignments a
        JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
        WHERE a.id = ?
        ON DUPLICATE KEY UPDATE read_at = NOW()
      `, [req.userId, req.userId, id]);
      return res.json({ success: true });
    }

    if (type === 'du-hoc') {
      // user_id trong WHERE là chỗ chặn quyền — thông báo của người khác thì đổi 0 dòng.
      await pool.query(
        'UPDATE du_hoc_thong_bao SET da_doc_luc = NOW() WHERE id = ? AND user_id = ? AND da_doc_luc IS NULL',
        [id, req.userId],
      );
      return res.json({ success: true });
    }

    if (type === 'de-bai') {
      // id mang tiền tố: 'b<id>' là bài đã chấm (đánh dấu được), 'g<id>' là lượt giao (không có
      // mốc đọc riêng — trạng thái suy từ việc đã nộp hay chưa, xem layThongBaoDeBai).
      if (String(id).startsWith('b')) {
        // user_id trong WHERE là chỗ chặn quyền.
        await pool.query(
          'UPDATE de_bai_lam SET da_doc_luc = NOW() WHERE id = ? AND user_id = ? AND da_doc_luc IS NULL',
          [String(id).slice(1), req.userId],
        );
      }
      return res.json({ success: true });
    }

    if (type === 'payment') {
      // Điều kiện user_id nằm ngay trong WHERE: đơn của người khác thì đổi 0 dòng.
      await pool.query(
        'UPDATE payments SET da_doc_luc = NOW() WHERE id = ? AND user_id = ? AND da_doc_luc IS NULL',
        [id, req.userId],
      );
      return res.json({ success: true });
    }

    // Whitelist tên bảng — KHÔNG bao giờ ghép tên bảng từ chuỗi người dùng gửi lên.
    const BANG = { exercise: 'exercise_results', exam: 'exam_results' };
    const table = BANG[type];
    if (!table) return res.status(400).json({ error: 'Loại thông báo không hợp lệ.' });

    await pool.query(
      `UPDATE ${table} SET review_read_at = NOW() WHERE id = ? AND user_id = ? AND review_read_at IS NULL`,
      [id, req.userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Mark read error:', err);
    res.status(500).json({ error: 'Lỗi cập nhật trạng thái.' });
  }
});

// POST /api/exercise/notifications/read-all — Đánh dấu ĐÃ ĐỌC toàn bộ thông báo đang chưa đọc.
// Chỉ đụng tới bản ghi CÓ lời phê thật, để không "đọc" nhầm những dòng không hề sinh ra thông báo.
router.post('/notifications/read-all', requireAuth, async (req, res) => {
  try {
    const dieuKien = `user_id = ? AND review_read_at IS NULL
                      AND teacher_review IS NOT NULL AND TRIM(teacher_review) <> ''`;
    const [a] = await pool.query(`UPDATE exercise_results SET review_read_at = NOW() WHERE ${dieuKien}`, [req.userId]);
    const [b] = await pool.query(`UPDATE exam_results SET review_read_at = NOW() WHERE ${dieuKien}`, [req.userId]);

    let baiGiao = 0;
    try {
      const [c] = await pool.query(`
        INSERT INTO assignment_reads (assignment_id, user_id)
        SELECT a.id, ?
        FROM assignments a
        JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
        ON DUPLICATE KEY UPDATE read_at = NOW()
      `, [req.userId, req.userId]);
      baiGiao = c.affectedRows || 0;
    } catch (err) {
      // Chưa chạy migration: phần nhận xét vẫn đánh dấu được, đừng làm hỏng cả nút.
      console.warn('Không đánh dấu được thông báo bài giao:', err.code || err.message);
    }

    let thanhToan = 0;
    try {
      const [d] = await pool.query(
        `UPDATE payments SET da_doc_luc = NOW()
          WHERE user_id = ? AND da_doc_luc IS NULL
            AND trang_thai IN ('thanh-cong','tu-choi') AND duyet_luc IS NOT NULL`,
        [req.userId],
      );
      thanhToan = d.affectedRows || 0;
    } catch (err) {
      console.warn('Không đánh dấu được thông báo thanh toán:', err.code || err.message);
    }

    let duHoc = 0;
    try {
      const [e] = await pool.query(
        'UPDATE du_hoc_thong_bao SET da_doc_luc = NOW() WHERE user_id = ? AND da_doc_luc IS NULL',
        [req.userId],
      );
      duHoc = e.affectedRows || 0;
    } catch (err) {
      console.warn('Không đánh dấu được thông báo du học:', err.code || err.message);
    }

    res.json({ success: true, updated: (a.affectedRows || 0) + (b.affectedRows || 0) + baiGiao + thanhToan + duHoc });
  } catch (err) {
    console.error('Mark all read error:', err);
    res.status(500).json({ error: 'Lỗi cập nhật trạng thái.' });
  }
});

// GET /api/exercise/result/:id — Lấy chi tiết 1 bài làm (User view)
router.get('/result/:id', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, lesson_id, total_questions, correct_answers, score_percent, time_seconds,
              details_json, teacher_review, review_read_at, created_at
       FROM exercise_results WHERE id = ? AND user_id = ?`,
      [req.params.id, req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Không tìm thấy bài làm.' });
    
    const row = rows[0];
    let details = [];
    try { if (row.details_json) details = JSON.parse(row.details_json); } catch(e) {}
    
    res.json({
      id: row.id,
      lesson_id: row.lesson_id,
      total_questions: row.total_questions,
      correct_answers: row.correct_answers,
      score_percent: row.score_percent,
      time_seconds: row.time_seconds,
      teacher_review: row.teacher_review,
      review_read_at: row.review_read_at,
      created_at: row.created_at,
      details
    });
  } catch (err) {
    console.error('Get result detail error:', err);
    res.status(500).json({ error: 'Lỗi tải chi tiết bài làm.' });
  }
});

// ══════════════════════════════════════════════════════════════
// TRANSLATE SUBMISSION ROUTES (chỉ phía học viên — nộp bài của CHÍNH MÌNH,
// lọc theo req.userId nên không cần scope thêm gì).
// Xem/chấm bài của HỌC VIÊN (phía giáo viên) nằm ở server/routes/admin.js
// (được bảo vệ bởi teacherScope — xem CLAUDE.md 4.17), KHÔNG đặt ở đây:
// router này không đi qua teacherScope nên không lọc được theo lớp giáo viên
// phụ trách — đặt route chấm bài ở đây từng để lộ bài của HỌC VIÊN LỚP KHÁC.
// ══════════════════════════════════════════════════════════════

// Fuzzy string similarity score (0-1) — dùng k\u1ebft h\u1ee3p token Dice + Levenshtein c\u1ea5p \u0111\u1ed9 ký t\u1ef1
function fuzzyScore(student, model) {
  if (!student && !model) return 1;
  if (!student || !model) return 0;
  // Normalize: lowercase, trim, collapse spaces, remove punctuation tiers
  const norm = s => s.trim().toLowerCase()
    .replace(/[。，、！？,.!?;；：:""''「」【】\(\)（）]/g, ' ')
    .replace(/\s+/g, ' ').trim();
  const a = norm(student);
  const b = norm(model);
  if (a === b) return 1;
  if (!a || !b) return 0;

  // 1. Token Dice similarity (word overlap)
  const tokA = a.split(/\s+/);
  const tokB = b.split(/\s+/);
  const setA = new Set(tokA);
  const setB = new Set(tokB);
  let common = 0;
  for (const t of setA) if (setB.has(t)) common++;
  const dice = (2 * common) / (setA.size + setB.size);

  // 2. Character-level Levenshtein (scaled to 0-1)
  const m = a.length, n = b.length;
  if (m === 0) return 0;
  if (n === 0) return 0;
  // Only compute if strings aren't too long (avoid O(m*n) for huge strings)
  let lev = 0;
  if (m <= 200 && n <= 200) {
    const dp = Array.from({ length: m + 1 }, (_, i) => i === 0
      ? Array.from({ length: n + 1 }, (_, j) => j)
      : [i, ...new Array(n).fill(0)]);
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
    lev = 1 - dp[m][n] / Math.max(m, n);
  }

  // 3. Length-ratio penalty (very different length = likely wrong)
  const lenRatio = Math.min(m, n) / Math.max(m, n);

  // Weighted combination
  return Math.max(0, Math.min(1, 0.45 * dice + 0.35 * lev + 0.20 * lenRatio));
}

// POST /api/exercise/translate/submit
// Body: { lesson_id, mode, answers: [{idx, q, studentAnswer, modelAnswer}] }
router.post('/translate/submit', requireAuth, async (req, res) => {
  try {
    const { lesson_id, mode, answers } = req.body;
    if (!lesson_id || !mode || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
    }
    if (lesson_id.length > 20) return res.status(400).json({ error: 'lesson_id không hợp lệ.' });
    if (!['vi-zh', 'zh-vi'].includes(mode)) return res.status(400).json({ error: 'mode không hợp lệ.' });

    // Auto-score: average fuzzy similarity
    let totalScore = 0;
    const scoredAnswers = answers.map(item => {
      const s = fuzzyScore(item.studentAnswer || '', item.modelAnswer || '');
      totalScore += s;
      return { idx: item.idx, q: item.q, studentAnswer: item.studentAnswer || '', modelAnswer: item.modelAnswer || '', fuzzy: Math.round(s * 100) };
    });
    const autoScore = Math.round((totalScore / answers.length) * 100);

    // Append-only, giống exercise_results (CLAUDE.md mục 5): làm lại nhiều lần thì ghi
    // bản mới, không UPDATE đè — không có UNIQUE(user_id, lesson_id, mode) nên không upsert
    // được. Nơi đọc (translate/my, admin/translate-submissions) luôn lấy bản MỚI NHẤT.
    const [result] = await pool.query(
      `INSERT INTO translate_submissions (user_id, lesson_id, mode, answers_json, auto_score)
       VALUES (?, ?, ?, ?, ?)`,
      [req.userId, lesson_id, mode, JSON.stringify(scoredAnswers), autoScore]
    );
    res.json({ submission_id: result.insertId, auto_score: autoScore, message: 'Đã nộp bài thành công.' });
  } catch (err) {
    console.error('Translate submit error:', err);
    res.status(500).json({ error: 'Lỗi nộp bài dịch.' });
  }
});

// GET /api/exercise/translate/my?lesson_id=1.1&mode=vi-zh
// Trả về submission gần nhất của user hiện tại cho bài đó
router.get('/translate/my', requireAuth, async (req, res) => {
  try {
    const { lesson_id, mode } = req.query;
    if (!lesson_id) return res.status(400).json({ error: 'Thiếu lesson_id.' });
    const modeClause = mode ? 'AND mode = ?' : '';
    const params = mode ? [req.userId, lesson_id, mode] : [req.userId, lesson_id];
    const [rows] = await pool.query(
      `SELECT id, lesson_id, mode, answers_json, auto_score, submitted_at, teacher_score, teacher_comment, reviewed_at
       FROM translate_submissions
       WHERE user_id = ? AND lesson_id = ? ${modeClause}
       ORDER BY submitted_at DESC LIMIT 1`,
      params
    );
    if (rows.length === 0) return res.json(null);
    const row = rows[0];
    let answers = [];
    try { answers = JSON.parse(row.answers_json); } catch {}
    res.json({ ...row, answers, answers_json: undefined });
  } catch (err) {
    console.error('Get translate my error:', err);
    res.status(500).json({ error: 'Lỗi tải bài đã nộp.' });
  }
});

export default router;
