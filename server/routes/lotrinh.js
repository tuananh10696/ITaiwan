// ============================================================
// "LỘ TRÌNH CỦA TÔI" — 5 trang (2026-09-08)
// ============================================================
// Tổng quan · Bài học hôm nay · Bài tập cần hoàn thành · Tiến độ · Thành tích.
// Xem CLAUDE.md 4.38.
//
// Mỗi trang MỘT endpoint gộp sẵn mọi truy vấn nó cần, thay vì để frontend gọi 5-6 request rồi
// tự ghép: các truy vấn ở đây đều đụng cùng vài bảng, gọi riêng lẻ là nhân số round-trip lên
// trong khi dữ liệu vẫn thế.
//
// ⚠️ MỌI route ở đây phải chịu được việc CHƯA CHẠY MIGRATION: bảng `study_activity` /
//    `srs_words` chưa có thì trả phần còn lại chứ đừng ném 500 làm vỡ cả trang — cùng cách
//    `my-assignments` đã làm với bảng `assignments`.

import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/** Bảng chưa tồn tại (chưa chạy migration) — phân biệt với lỗi thật để không nuốt nhầm. */
const chuaCoBang = (e) => e && (e.code === 'ER_NO_SUCH_TABLE' || e.code === 'ER_BAD_FIELD_ERROR');

// ------------------------------------------------------------------ nhịp đo hoạt động

/** Khu vực hợp lệ. Chuỗi lạ do client gửi lên bị quy về 'khac' chứ không ghi thẳng vào DB. */
const KHU_VUC = new Set(['giaotrinh', 'phat-am', 'tu-vung', 'thi-thu', 'luyen-tap', 'lo-trinh', 'cong-dong', 'khac']);
/** Trần mỗi nhịp. Client gửi mỗi ~60 giây; 120 là dư dung sai cho máy chậm. */
const GIAY_TOI_DA_MOI_NHIP = 120;
/** Trần một ngày. Không ai học 8 tiếng liên tục trên app này — quá số đó là dấu hiệu bất thường. */
const GIAY_TOI_DA_MOI_NGAY = 8 * 3600;
/** Ngưỡng để một ngày được tính vào chuỗi: 5 phút hoạt động thật VÀ mở ít nhất 3 lượt trang. */
const NGUONG_GIAY = 300;
const NGUONG_LUOT = 3;

/**
 * Hôm nay có phải "ngày có học" không.
 *   (a) đã nộp ít nhất một bài (bài tập / thi thử / bài dịch), HOẶC
 *   (b) hoạt động thật ≥ 5 phút VÀ mở ≥ 3 lượt trang.
 * Điều kiện (a) đứng riêng vì có học viên vào làm đúng một bài rồi thoát — vẫn là có học.
 */
async function ngayCoHoc(userId) {
  const [[nop]] = await pool.query(
    `SELECT
       (SELECT COUNT(*) FROM exercise_results WHERE user_id = ? AND DATE(created_at) = CURDATE())
     + (SELECT COUNT(*) FROM exam_results     WHERE user_id = ? AND DATE(created_at) = CURDATE()) AS n`,
    [userId, userId],
  );
  if (Number(nop.n) > 0) return true;
  try {
    const [[hd]] = await pool.query(
      'SELECT COALESCE(SUM(giay),0) g, COALESCE(SUM(so_lan),0) l FROM study_activity WHERE user_id = ? AND ngay = CURDATE()',
      [userId],
    );
    return Number(hd.g) >= NGUONG_GIAY && Number(hd.l) >= NGUONG_LUOT;
  } catch (e) {
    if (chuaCoBang(e)) return false;
    throw e;
  }
}

/**
 * Cập nhật chuỗi ngày. Gọi sau mỗi nhịp đo và sau mỗi lần nộp bài.
 *
 * ⚠️ `users.last_active` giờ mang nghĩa "ngày gần nhất ĐƯỢC TÍNH vào chuỗi", không còn là
 *    "ngày gần nhất đăng nhập". Route đăng nhập đã thôi đụng vào hai cột này — nếu để nó set
 *    `last_active = CURDATE()` thì hàm dưới đây luôn thấy "hôm nay tính rồi" và chuỗi đứng im.
 *
 * ⚠️ CỐ Ý không tính lại chuỗi cho quá khứ: trước hôm nay không có dữ liệu hoạt động nào, tính
 *    lại thì những ngày học viên có học mà không nộp bài sẽ mất trắng — phạt oan. Số chuỗi đang
 *    có được giữ nguyên, luật mới áp dụng từ ngày triển khai.
 */
export async function capNhatChuoi(userId) {
  if (!(await ngayCoHoc(userId))) return null;
  const [[u]] = await pool.query(
    'SELECT streak, longest_streak, last_active, DATEDIFF(CURDATE(), last_active) AS cach FROM users WHERE id = ?',
    [userId],
  );
  if (!u) return null;
  if (u.cach === 0) return u.streak;                       // hôm nay đã tính rồi
  const moi = u.cach === 1 ? (u.streak || 0) + 1 : 1;      // đứt quãng thì bắt đầu lại từ 1
  const dai = Math.max(moi, u.longest_streak || 0);
  await pool.query('UPDATE users SET streak = ?, longest_streak = ?, last_active = CURDATE() WHERE id = ?',
    [moi, dai, userId]);
  return moi;
}

/**
 * POST /api/lo-trinh/nhip — trình duyệt báo "vừa học thêm N giây ở khu vực X".
 *
 * Client gom giờ ở máy rồi gửi mỗi ~60 giây hoạt động THẬT (tab đang hiện + có thao tác), nên
 * số request rất thấp. Server vẫn phải tự chặn: `giay` do client gửi lên, không tin được.
 */
router.post('/nhip', requireAuth, async (req, res) => {
  try {
    const kv = KHU_VUC.has(String(req.body?.khu_vuc)) ? String(req.body.khu_vuc) : 'khac';
    const giay = Math.max(0, Math.min(GIAY_TOI_DA_MOI_NHIP, Math.round(Number(req.body?.giay) || 0)));
    const soLan = Math.max(0, Math.min(60, Math.round(Number(req.body?.so_lan) || 0)));
    if (!giay && !soLan) return res.json({ ok: true, boQua: true });

    await pool.query(
      `INSERT INTO study_activity (user_id, ngay, khu_vuc, giay, so_lan)
       VALUES (?, CURDATE(), ?, ?, ?)
       ON DUPLICATE KEY UPDATE giay = LEAST(giay + VALUES(giay), ?), so_lan = so_lan + VALUES(so_lan)`,
      [req.userId, kv, giay, soLan, GIAY_TOI_DA_MOI_NGAY],
    );
    const chuoi = await capNhatChuoi(req.userId);
    res.json({ ok: true, chuoi });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ ok: false, chuaCoBang: true });
    console.error('Nhịp hoạt động lỗi:', err);
    res.status(500).json({ error: 'Lỗi ghi nhận hoạt động.' });
  }
});

// ------------------------------------------------------------------ mảnh dùng chung

/**
 * Số ngày có học trong N ngày gần nhất, kèm số giây mỗi ngày — nuôi lịch nhiệt và biểu đồ.
 * Gộp hai nguồn: hoạt động (study_activity) và bài đã nộp (exercise_results), vì trước ngày
 * triển khai nhịp đo thì chỉ có nguồn thứ hai.
 */
async function lichHoat(userId, soNgay = 84) {
  const map = new Map();
  const them = (ngay, giay, bai) => {
    const k = typeof ngay === 'string' ? ngay : ngay.toISOString().slice(0, 10);
    const e = map.get(k) || { ngay: k, giay: 0, bai: 0 };
    e.giay += giay; e.bai += bai;
    map.set(k, e);
  };
  try {
    const [rows] = await pool.query(
      `SELECT DATE_FORMAT(ngay, '%Y-%m-%d') ngay, SUM(giay) g FROM study_activity
       WHERE user_id = ? AND ngay >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY ngay`,
      [userId, soNgay],
    );
    for (const r of rows) them(r.ngay, Number(r.g), 0);
  } catch (e) { if (!chuaCoBang(e)) throw e; }
  const [bai] = await pool.query(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') ngay, COUNT(*) n FROM exercise_results
     WHERE user_id = ? AND created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY 1`,
    [userId, soNgay],
  );
  for (const r of bai) them(r.ngay, 0, Number(r.n));
  return [...map.values()].sort((a, b) => (a.ngay < b.ngay ? -1 : 1));
}

/**
 * Quy `lesson_id` về KỸ NĂNG. Namespace của `lesson_id` vốn đã tách sẵn theo kỹ năng (4.24,
 * 4.21, 4.35) nên chỉ cần đọc tiền tố — không phải thêm cột nào vào DB.
 */
function kyNang(lessonId) {
  const s = String(lessonId || '');
  if (s.startsWith('pron:')) return 'phat-am';
  if (s.startsWith('onllang:')) return 'luyen-tap';
  if (s.startsWith('writing:')) return 'luyen-viet';
  if (s.startsWith('game:')) return 'game';
  if (s.startsWith('tocfl:')) return 'tu-vung-tocfl';
  if (s.startsWith('kho:')) return 'tra-cuu';
  return 'giaotrinh';
}

const TEN_KY_NANG = {
  giaotrinh: 'Từ vựng giáo trình', 'luyen-tap': 'Luyện tập tổng hợp', 'phat-am': 'Phát âm',
  'luyen-viet': 'Luyện viết', game: 'Game từ vựng', 'tu-vung-tocfl': 'Từ vựng theo cấp',
  'tra-cuu': 'Tra cứu', dich: 'Dịch Trung-Việt', 'thi-thu': 'Thi thử TOCFL',
};

// ------------------------------------------------------------------ 1. Tổng quan

router.get('/tong-quan', requireAuth, async (req, res) => {
  try {
    const [[u]] = await pool.query(
      'SELECT name, level_label, level_num, streak, longest_streak, points, created_at FROM users WHERE id = ?',
      [req.userId],
    );
    const [[tong]] = await pool.query(
      `SELECT COUNT(*) so_bai, COALESCE(SUM(time_seconds),0) giay_lam,
              COALESCE(ROUND(AVG(score_percent),1),0) diem_tb
       FROM exercise_results WHERE user_id = ?`, [req.userId],
    );
    const [[gan]] = await pool.query(
      `SELECT COUNT(*) so_bai, COALESCE(ROUND(AVG(score_percent),1),0) diem_tb
       FROM exercise_results WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)`,
      [req.userId],
    );
    // Bài con ĐÃ NỘP BÀI TẬP — mẫu số (435 bài của 3 bộ) do frontend biết, ở đây chỉ trả tử số.
    const [daHoc] = await pool.query(
      `SELECT DISTINCT lesson_id FROM exercise_results
       WHERE user_id = ? AND lesson_id NOT LIKE '%:%'`, [req.userId],
    );
    // 3 bài điểm thấp nhất (lấy lần nộp MỚI NHẤT của mỗi bài — quy tắc thống kê ở 4.15)
    const [yeu] = await pool.query(
      `SELECT er.lesson_id, er.score_percent, er.created_at
       FROM exercise_results er
       JOIN (SELECT lesson_id, MAX(created_at) m FROM exercise_results WHERE user_id = ? GROUP BY lesson_id) t
         ON t.lesson_id = er.lesson_id AND t.m = er.created_at
       WHERE er.user_id = ? AND er.score_percent < 80
       ORDER BY er.score_percent ASC LIMIT 5`, [req.userId, req.userId],
    );
    let srs = { den_han: 0, tong: 0 };
    try {
      const [[s]] = await pool.query(
        `SELECT COUNT(*) tong, COALESCE(SUM(due_date <= NOW()),0) den_han FROM srs_words WHERE user_id = ?`,
        [req.userId],
      );
      srs = { den_han: Number(s.den_han), tong: Number(s.tong) };
    } catch (e) { if (!chuaCoBang(e)) throw e; }
    let baiGiao = 0;
    try {
      const [[bg]] = await pool.query(
        `SELECT COUNT(*) n FROM assignments a
         JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
         WHERE NOT EXISTS (SELECT 1 FROM exercise_results er WHERE er.user_id = ? AND er.lesson_id = a.lesson_id
                             AND (a.exercise_type IS NULL OR a.exercise_type = 'bai-tap'))
           AND NOT EXISTS (SELECT 1 FROM translate_submissions ts WHERE ts.user_id = ? AND ts.lesson_id = a.lesson_id
                             AND a.exercise_type = 'translate')`,
        [req.userId, req.userId, req.userId],
      );
      baiGiao = Number(bg.n);
    } catch (e) { if (!chuaCoBang(e)) throw e; }
    const [[soTay]] = await pool.query('SELECT COUNT(*) n FROM notebook_words WHERE user_id = ?', [req.userId])
      .catch(() => [[{ n: 0 }]]);
    // Bài động vào GẦN NHẤT — nguyên liệu của thẻ "Tiếp tục học" ở trang chủ. Trước đây thẻ đó
    // là chữ chết ("Chưa có bài học nào gần đây") vì không nơi nào trả về dữ liệu này.
    const [ganNhat] = await pool.query(
      `SELECT lesson_id, MAX(created_at) lan_cuoi,
              SUBSTRING_INDEX(GROUP_CONCAT(score_percent ORDER BY created_at DESC), ',', 1) diem
       FROM exercise_results WHERE user_id = ?
       GROUP BY lesson_id ORDER BY lan_cuoi DESC LIMIT 5`, [req.userId],
    );

    res.json({
      user: u,
      tong: { ...tong, so_bai: Number(tong.so_bai), giay_lam: Number(tong.giay_lam) },
      gan_day: gan,
      da_hoc: daHoc.map((r) => r.lesson_id),
      diem_yeu: yeu,
      srs,
      bai_giao_chua_nop: baiGiao,
      so_tay: Number(soTay.n),
      gan_nhat: ganNhat.map((r) => ({ ...r, diem: r.diem === null ? null : Number(r.diem) })),
      lich: await lichHoat(req.userId, 84),
    });
  } catch (err) {
    console.error('Tổng quan lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải tổng quan lộ trình.' });
  }
});

// ------------------------------------------------------------------ 2. Bài học hôm nay

/**
 * Kế hoạch TỰ SINH cho hôm nay. Hệ thống không có khái niệm lịch học hay khoá học có thứ tự,
 * nên "hôm nay học gì" được suy ra từ chính dấu vết học tập:
 *   1. bài cô giao đến hạn / quá hạn      (việc có deadline thật, ưu tiên cao nhất)
 *   2. từ đến hạn ôn                      (SRS — quên mất thì phí công đã học)
 *   3. bài con kế tiếp CHƯA làm bài tập   (frontend suy ra, vì nó mới biết danh mục 435 bài)
 *   4. 5 phút phát âm / game              (việc nhẹ để giữ chuỗi ngày)
 * Server trả nguyên liệu; frontend dựng thẻ và biết bài kế tiếp là bài nào.
 */
router.get('/hom-nay', requireAuth, async (req, res) => {
  try {
    let baiGiao = [];
    try {
      const [rows] = await pool.query(
        `SELECT a.id, a.lesson_id, a.title, a.due_date, a.note, a.exercise_type, c.name class_name,
           EXISTS (SELECT 1 FROM exercise_results er WHERE er.user_id = ? AND er.lesson_id = a.lesson_id
                     AND (a.exercise_type IS NULL OR a.exercise_type = 'bai-tap')) AS nop_bt,
           EXISTS (SELECT 1 FROM translate_submissions ts WHERE ts.user_id = ? AND ts.lesson_id = a.lesson_id
                     AND a.exercise_type = 'translate') AS nop_dich
         FROM assignments a
         JOIN classes c ON c.id = a.class_id
         JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
         ORDER BY (a.due_date IS NULL), a.due_date ASC LIMIT 50`,
        [req.userId, req.userId, req.userId],
      );
      baiGiao = rows.map((r) => ({ ...r, submitted: !!(r.nop_bt || r.nop_dich) }));
    } catch (e) { if (!chuaCoBang(e)) throw e; }

    let srsDenHan = 0, srsMoi = 0;
    try {
      const [[s]] = await pool.query(
        'SELECT COALESCE(SUM(due_date <= NOW()),0) den_han FROM srs_words WHERE user_id = ?', [req.userId]);
      srsDenHan = Number(s.den_han);
      const [[m]] = await pool.query(
        `SELECT COUNT(*) n FROM notebook_words nw
         WHERE nw.user_id = ? AND NOT EXISTS (SELECT 1 FROM srs_words s WHERE s.user_id = nw.user_id AND s.tu = nw.tu)`,
        [req.userId],
      );
      srsMoi = Number(m.n);
    } catch (e) { if (!chuaCoBang(e)) throw e; }

    // Bài đã nộp bài tập — frontend dùng để tìm bài con KẾ TIẾP chưa làm.
    const [daLam] = await pool.query(
      'SELECT DISTINCT lesson_id FROM exercise_results WHERE user_id = ?', [req.userId]);
    // Bài học gần nhất, để gợi ý "học tiếp chỗ đang dở"
    const [ganDay] = await pool.query(
      `SELECT lesson_id, MAX(created_at) m FROM exercise_results WHERE user_id = ?
       GROUP BY lesson_id ORDER BY m DESC LIMIT 5`, [req.userId]);

    let hoatDong = { giay: 0, so_lan: 0 };
    try {
      const [[hd]] = await pool.query(
        'SELECT COALESCE(SUM(giay),0) giay, COALESCE(SUM(so_lan),0) so_lan FROM study_activity WHERE user_id = ? AND ngay = CURDATE()',
        [req.userId]);
      hoatDong = { giay: Number(hd.giay), so_lan: Number(hd.so_lan) };
    } catch (e) { if (!chuaCoBang(e)) throw e; }

    const [[nopHomNay]] = await pool.query(
      'SELECT COUNT(*) n FROM exercise_results WHERE user_id = ? AND DATE(created_at) = CURDATE()', [req.userId]);

    res.json({
      bai_giao: baiGiao,
      srs: { den_han: srsDenHan, tu_moi: srsMoi },
      da_lam: daLam.map((r) => r.lesson_id),
      gan_day: ganDay,
      hom_nay: { ...hoatDong, so_bai: Number(nopHomNay.n), nguong_giay: NGUONG_GIAY, nguong_luot: NGUONG_LUOT },
    });
  } catch (err) {
    console.error('Hôm nay lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải kế hoạch hôm nay.' });
  }
});

// ------------------------------------------------------------------ 3. Bài tập cần hoàn thành

/**
 * Gộp BA loại việc, vì với học viên chúng đều là "bài còn nợ":
 *   · bài cô giao chưa nộp (kèm quá hạn / còn mấy ngày)
 *   · bài đã làm nhưng điểm thấp -> nên làm lại
 *   · bài đã được cô CHẤM mà chưa đọc lời phê
 */
router.get('/bai-tap', requireAuth, async (req, res) => {
  try {
    let giao = [];
    try {
      const [rows] = await pool.query(
        `SELECT a.id, a.lesson_id, a.title, a.due_date, a.note, a.exercise_type, a.created_at,
           c.name class_name,
           EXISTS (SELECT 1 FROM exercise_results er WHERE er.user_id = ? AND er.lesson_id = a.lesson_id
                     AND (a.exercise_type IS NULL OR a.exercise_type = 'bai-tap')) AS nop_bt,
           EXISTS (SELECT 1 FROM translate_submissions ts WHERE ts.user_id = ? AND ts.lesson_id = a.lesson_id
                     AND a.exercise_type = 'translate') AS nop_dich,
           (SELECT MAX(er2.score_percent) FROM exercise_results er2
              WHERE er2.user_id = ? AND er2.lesson_id = a.lesson_id) AS diem_cao_nhat
         FROM assignments a
         JOIN classes c ON c.id = a.class_id
         JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
         ORDER BY (a.due_date IS NULL), a.due_date ASC LIMIT 200`,
        [req.userId, req.userId, req.userId, req.userId],
      );
      giao = rows.map((r) => ({ ...r, submitted: !!(r.nop_bt || r.nop_dich) }));
    } catch (e) { if (!chuaCoBang(e)) throw e; }

    // Bài điểm thấp — chỉ xét lần nộp MỚI NHẤT của mỗi bài (quy tắc 4.15: tính cả các lần làm
    // lại thì một em chăm làm đi làm lại sẽ tự kéo mình xuống).
    const [diemThap] = await pool.query(
      `SELECT er.lesson_id, er.score_percent, er.total_questions, er.correct_answers, er.created_at
       FROM exercise_results er
       JOIN (SELECT lesson_id, MAX(created_at) m FROM exercise_results WHERE user_id = ? GROUP BY lesson_id) t
         ON t.lesson_id = er.lesson_id AND t.m = er.created_at
       WHERE er.user_id = ? AND er.score_percent < 60
       ORDER BY er.created_at DESC LIMIT 50`, [req.userId, req.userId],
    );

    // Lời phê chưa đọc — cùng nguồn với chuông thông báo (4.18)
    const [chuaDoc] = await pool.query(
      `SELECT 'exercise' loai, id, lesson_id, teacher_review, score_percent, created_at
       FROM exercise_results WHERE user_id = ? AND teacher_review IS NOT NULL AND review_read_at IS NULL
       UNION ALL
       SELECT 'exam', id, CONCAT('exam:', COALESCE(skill,'')), teacher_review, score_percent, created_at
       FROM exam_results WHERE user_id = ? AND teacher_review IS NOT NULL AND review_read_at IS NULL
       ORDER BY created_at DESC LIMIT 30`, [req.userId, req.userId],
    );

    res.json({ bai_giao: giao, diem_thap: diemThap, nhan_xet_chua_doc: chuaDoc });
  } catch (err) {
    console.error('Bài tập lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải danh sách bài tập.' });
  }
});

// ------------------------------------------------------------------ 4. Tiến độ

router.get('/tien-do', requireAuth, async (req, res) => {
  try {
    // Điểm theo NGÀY (90 ngày) — vẽ đường xu hướng
    const [theoNgay] = await pool.query(
      `SELECT DATE_FORMAT(created_at,'%Y-%m-%d') ngay, COUNT(*) n,
              ROUND(AVG(score_percent),1) diem, COALESCE(SUM(time_seconds),0) giay
       FROM exercise_results WHERE user_id = ? AND created_at >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
       GROUP BY 1 ORDER BY 1`, [req.userId],
    );
    // Mọi bài đã làm (lần mới nhất) — frontend gom theo kỹ năng và theo bộ giáo trình
    const [moiNhat] = await pool.query(
      `SELECT er.lesson_id, er.score_percent, er.total_questions, er.correct_answers,
              er.time_seconds, er.created_at
       FROM exercise_results er
       JOIN (SELECT lesson_id, MAX(created_at) m FROM exercise_results WHERE user_id = ? GROUP BY lesson_id) t
         ON t.lesson_id = er.lesson_id AND t.m = er.created_at
       WHERE er.user_id = ?`, [req.userId, req.userId],
    );
    // Gom theo kỹ năng ngay ở server cho gọn payload
    const kn = {};
    for (const r of moiNhat) {
      const k = kyNang(r.lesson_id);
      const e = kn[k] || (kn[k] = { id: k, ten: TEN_KY_NANG[k] || k, so_bai: 0, tong_diem: 0, giay: 0 });
      e.so_bai++; e.tong_diem += Number(r.score_percent); e.giay += Number(r.time_seconds || 0);
    }
    for (const e of Object.values(kn)) e.diem_tb = Math.round((e.tong_diem / e.so_bai) * 10) / 10;

    const [thi] = await pool.query(
      `SELECT id, skill, score_percent, correct_answers, total_questions, time_seconds, created_at
       FROM exam_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 30`, [req.userId]);
    const [dich] = await pool.query(
      `SELECT lesson_id, mode, auto_score, teacher_score, submitted_at FROM translate_submissions
       WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 50`, [req.userId]).catch(() => [[]]);

    let theoKhuVuc = [];
    try {
      const [rows] = await pool.query(
        `SELECT khu_vuc, SUM(giay) giay, SUM(so_lan) so_lan FROM study_activity
         WHERE user_id = ? AND ngay >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) GROUP BY khu_vuc ORDER BY giay DESC`,
        [req.userId]);
      theoKhuVuc = rows.map((r) => ({ ...r, giay: Number(r.giay), so_lan: Number(r.so_lan) }));
    } catch (e) { if (!chuaCoBang(e)) throw e; }

    // So với lớp: chỉ số TRUNG BÌNH, không lộ danh tính bạn cùng lớp.
    let lop = null;
    try {
      const [[l]] = await pool.query(
        `SELECT c.id, c.name,
           (SELECT ROUND(AVG(x.score_percent),1) FROM exercise_results x
              JOIN class_enrollments ce2 ON ce2.user_id = x.user_id AND ce2.class_id = c.id) AS diem_tb_lop,
           (SELECT COUNT(DISTINCT ce3.user_id) FROM class_enrollments ce3 WHERE ce3.class_id = c.id) AS si_so
         FROM classes c JOIN class_enrollments ce ON ce.class_id = c.id AND ce.user_id = ?
         LIMIT 1`, [req.userId]);
      if (l) lop = l;
    } catch (e) { if (!chuaCoBang(e)) throw e; }

    res.json({ theo_ngay: theoNgay, ky_nang: Object.values(kn), moi_nhat: moiNhat,
      thi_thu: thi, dich, theo_khu_vuc: theoKhuVuc, lop });
  } catch (err) {
    console.error('Tiến độ lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải tiến độ.' });
  }
});

// ------------------------------------------------------------------ 5. Thành tích

router.get('/thanh-tich', requireAuth, async (req, res) => {
  try {
    const [[u]] = await pool.query(
      `SELECT name, avatar_letter, avatar_color, level_label, level_num, streak, longest_streak,
              points, created_at FROM users WHERE id = ?`, [req.userId]);
    const [[bai]] = await pool.query(
      `SELECT COUNT(*) so_lan, COUNT(DISTINCT lesson_id) so_bai,
              COALESCE(SUM(time_seconds),0) giay,
              COALESCE(SUM(score_percent >= 100),0) diem_tuyet_doi,
              COALESCE(ROUND(AVG(score_percent),1),0) diem_tb
       FROM exercise_results WHERE user_id = ?`, [req.userId]);
    const [[thi]] = await pool.query(
      `SELECT COUNT(*) so_lan, COALESCE(MAX(score_percent),0) cao_nhat FROM exam_results WHERE user_id = ?`,
      [req.userId]);
    const [[soTay]] = await pool.query('SELECT COUNT(*) n FROM notebook_words WHERE user_id = ?', [req.userId])
      .catch(() => [[{ n: 0 }]]);
    let srs = { tong: 0, thuoc: 0 };
    try {
      const [[s]] = await pool.query(
        `SELECT COUNT(*) tong, COALESCE(SUM(status='mastered'),0) thuoc FROM srs_words WHERE user_id = ?`,
        [req.userId]);
      srs = { tong: Number(s.tong), thuoc: Number(s.thuoc) };
    } catch (e) { if (!chuaCoBang(e)) throw e; }
    let soNgayHoc = 0;
    try {
      const [[n]] = await pool.query(
        `SELECT COUNT(DISTINCT ngay) n FROM study_activity WHERE user_id = ? AND giay >= ?`,
        [req.userId, NGUONG_GIAY]);
      soNgayHoc = Number(n.n);
    } catch (e) { if (!chuaCoBang(e)) throw e; }
    // Ngày có nộp bài cũng là ngày có học — gộp lại để con số không thấp hơn thực tế.
    const [[nBai]] = await pool.query(
      'SELECT COUNT(DISTINCT DATE(created_at)) n FROM exercise_results WHERE user_id = ?', [req.userId]);

    // Bài con đã làm, để tính huy hiệu "hoàn thành quyển".
    const [daHoc] = await pool.query(
      `SELECT lesson_id, MAX(score_percent) AS cao_nhat FROM exercise_results
        WHERE user_id = ? AND lesson_id NOT LIKE '%:%' GROUP BY lesson_id`,
      [req.userId]);

    const [bxh] = await pool.query(
      `SELECT id, name, avatar_letter, avatar_color, level_label, points, streak
       FROM users WHERE COALESCE(role,'student') = 'student' ORDER BY points DESC, streak DESC LIMIT 10`);
    const [[hang]] = await pool.query(
      `SELECT COUNT(*) + 1 hang FROM users
       WHERE COALESCE(role,'student') = 'student' AND points > (SELECT points FROM users WHERE id = ?)`,
      [req.userId]);

    res.json({
      user: u,
      bai: { ...bai, so_lan: Number(bai.so_lan), so_bai: Number(bai.so_bai), giay: Number(bai.giay),
        diem_tuyet_doi: Number(bai.diem_tuyet_doi) },
      thi: { so_lan: Number(thi.so_lan), cao_nhat: Number(thi.cao_nhat) },
      so_tay: Number(soTay.n),
      srs,
      so_ngay_hoc: Math.max(soNgayHoc, Number(nBai.n)),
      da_hoc: daHoc.map((r) => r.lesson_id),
      // Điểm cao nhất mỗi bài — client dùng để xét điều kiện cấp chứng chỉ hoàn thành quyển.
      // Trả dạng object thay vì mảng để client tra O(1) qua 435 bài con.
      diem_bai: Object.fromEntries(daHoc.map((r) => [r.lesson_id, Math.round(Number(r.cao_nhat))])),
      bang_xep_hang: bxh,
      hang: Number(hang.hang),
    });
  } catch (err) {
    console.error('Thành tích lỗi:', err);
    res.status(500).json({ error: 'Lỗi tải thành tích.' });
  }
});

/**
 * GET /api/lo-trinh/lich-hoc — lịch buổi học của chính học viên đang đăng nhập.
 *
 * `class_sessions` lưu buổi học + chủ đề từ 2026-08-25 và `class_attendance` lưu điểm danh, nhưng
 * tới nay HỌC VIÊN không có chỗ nào xem được: `/profile/my-classes` chỉ ĐẾM số buổi. Tức trung
 * tâm nhập lịch vào hệ thống rồi vẫn phải nhắn Zalo cho các em "mai học lúc mấy giờ".
 *
 * Trả 3 phần vì chúng trả lời 3 câu hỏi khác nhau:
 *   sap_toi  — "buổi tới học khi nào, chủ đề gì"
 *   da_qua   — "hôm đó mình có đi không" (kèm lời phê của cô nếu có)
 *   chuyen_can — "mình đã nghỉ mấy buổi rồi"
 */
router.get('/lich-hoc', requireAuth, async (req, res) => {
  try {
    const [lop] = await pool.query(
      `SELECT c.id, c.name FROM class_enrollments ce JOIN classes c ON c.id = ce.class_id
        WHERE ce.user_id = ?`, [req.userId]);
    if (!lop.length) return res.json({ lop: [], sap_toi: [], da_qua: [], chuyen_can: null });

    const ids = lop.map((l) => l.id);

    // Buổi CHƯA diễn ra. Buổi chưa đặt ngày (session_date NULL) cố ý không tính là "sắp tới" —
    // hiện lên thì học viên tưởng có lịch mà không biết ngày nào.
    const [sapToi] = await pool.query(
      `SELECT cs.id, cs.class_id, cs.session_date, cs.topic, cs.course_type, cs.notes, c.name AS lop_ten,
              DATEDIFF(cs.session_date, CURDATE()) AS con_ngay
         FROM class_sessions cs JOIN classes c ON c.id = cs.class_id
        WHERE cs.class_id IN (?) AND cs.session_date IS NOT NULL AND cs.session_date >= CURDATE()
        ORDER BY cs.session_date LIMIT 10`, [ids]);

    // Buổi đã qua + điểm danh của CHÍNH em này (LEFT JOIN: buổi cô chưa điểm danh thì trạng thái NULL).
    const [daQua] = await pool.query(
      `SELECT cs.id, cs.session_date, cs.topic, c.name AS lop_ten,
              ca.status, ca.is_late, ca.is_left_early, ca.teacher_note
         FROM class_sessions cs
         JOIN classes c ON c.id = cs.class_id
         LEFT JOIN class_attendance ca ON ca.session_id = cs.id AND ca.user_id = ?
        WHERE cs.class_id IN (?) AND cs.session_date IS NOT NULL AND cs.session_date < CURDATE()
        ORDER BY cs.session_date DESC LIMIT 12`, [req.userId, ids]);

    const [cc] = await pool.query(
      `SELECT COUNT(*) AS da_diem_danh,
              SUM(ca.status = 'present') AS co_mat,
              SUM(ca.status = 'absent')  AS vang,
              SUM(ca.is_late = 1)        AS di_muon
         FROM class_attendance ca JOIN class_sessions cs ON cs.id = ca.session_id
        WHERE ca.user_id = ? AND cs.class_id IN (?)`, [req.userId, ids]);

    const c = cc[0] || {};
    const daDd = Number(c.da_diem_danh || 0);
    res.json({
      lop, sap_toi: sapToi, da_qua: daQua,
      chuyen_can: daDd ? {
        da_diem_danh: daDd,
        co_mat: Number(c.co_mat || 0),
        vang: Number(c.vang || 0),
        di_muon: Number(c.di_muon || 0),
        ti_le: Math.round((Number(c.co_mat || 0) / daDd) * 100),
      } : null,
    });
  } catch (err) {
    // Chưa chạy migration lớp học thì trả khung rỗng, đừng làm vỡ trang của học viên.
    if (err?.code === 'ER_NO_SUCH_TABLE') return res.json({ lop: [], sap_toi: [], da_qua: [], chuyen_can: null, chua_migrate: true });
    console.error('Lỗi lịch học:', err);
    res.status(500).json({ error: 'Không tải được lịch học.' });
  }
});

export default router;
