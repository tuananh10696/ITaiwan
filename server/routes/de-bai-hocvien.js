// =============================================================
// ĐỀ BÀI TẬP / BÀI KIỂM TRA — phía HỌC SINH (2026-09-17)
// =============================================================
// Mount ở /api/de-bai. Chỉ `requireAuth` — mọi truy vấn tự lọc theo `req.userId`, đó là chỗ
// chặn quyền (cùng lối `du-hoc-hocvien.js` ở 4.51).
//
// BA ĐIỀU BẮT BUỘC, sai một cái là tính năng vô nghĩa:
//
// 1. ĐÁP ÁN KHÔNG BAO GIỜ RỜI SERVER TRƯỚC KHI NỘP. Mọi câu SELECT trả đề cho học sinh đều liệt
//    kê cột tường minh, không `SELECT *`. Đây là bài kiểm tra có điểm thật của giáo viên — khác
//    mọi bài tự luyện khác trong dự án vốn chấm ngay ở trình duyệt.
//
// 2. ĐỒNG HỒ TÍNH THEO MỐC SERVER (`bat_dau_luc`). Client chỉ hiển thị. Không làm vậy thì F5 là
//    đồng hồ chạy lại từ đầu và giới hạn thời gian thành vô nghĩa.
//
// 3. TRỘN CÂU / TRỘN ĐÁP ÁN LÀM Ở CLIENT, gửi lên chỉ số GỐC.
//    Trộn chỉ để hạn chế nhìn bài nhau, KHÔNG phải cơ chế chống gian lận — thứ tự gốc không hề
//    lộ đáp án. Làm ở client thì không phải lưu bảng quy chiếu ở server và không có nguy cơ lệch
//    chỉ số lúc chấm (đúng cái bẫy `mapGoc` đã ghi ở 4.19).
import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { chamBai } from '../utils/cham-de.js';
import { congDiemVuotKyLuc } from '../utils/diem.js';
import { capNhatChuoi } from './lotrinh.js';

const router = Router();
router.use(requireAuth);

const chuaCoBang = (err) => err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_BAD_FIELD_ERROR');

function docJson(v, macDinh) {
  if (v === null || v === undefined) return macDinh;
  if (typeof v === 'string') { try { return JSON.parse(v); } catch { return macDinh; } }
  return v;
}

/**
 * Các lượt giao đang có hiệu lực với người này.
 * Gồm: đề giao cho LỚP mình đang học, và đề giao RIÊNG cho mình.
 */
const SQL_GIAO_CUA_TOI = `
  FROM de_giao g
  JOIN de_bai d ON d.id = g.de_id AND d.trang_thai = 'phat-hanh'
  LEFT JOIN classes c ON c.id = g.class_id
  WHERE (
      g.user_id = ?
      OR (g.class_id IS NOT NULL AND EXISTS (
           SELECT 1 FROM class_enrollments ce WHERE ce.class_id = g.class_id AND ce.user_id = ?
         ))
  )`;

/** Lượt giao này có mở với người đang gọi không — trả bản ghi hoặc null. */
async function layGiao(giaoId, userId) {
  const [r] = await pool.query(
    `SELECT g.id, g.de_id, g.mo_luc, g.dong_luc, g.class_id, g.user_id ${SQL_GIAO_CUA_TOI} AND g.id = ?`,
    [userId, userId, giaoId]
  );
  return r[0] || null;
}

// ------------------------------------------------------------------ DANH SÁCH

// GET /api/de-bai/cua-toi — đề được giao cho mình
router.get('/cua-toi', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT g.id AS giao_id, g.mo_luc, g.dong_luc, g.ghi_chu,
              d.id AS de_id, d.ma, d.tieu_de, d.mo_ta, d.loai, d.thoi_gian_phut,
              d.so_lan_lam, d.hien_dap_an, d.diem_dat,
              c.name AS lop_ten,
              (SELECT COUNT(*) FROM de_cau_hoi ch WHERE ch.de_id = d.id) AS so_cau,
              (SELECT COALESCE(SUM(ch.diem),0) FROM de_cau_hoi ch WHERE ch.de_id = d.id) AS tong_diem,
              (SELECT COUNT(*) FROM de_bai_lam b
                WHERE b.de_id = d.id AND b.user_id = ? AND b.trang_thai <> 'dang-lam') AS da_lam,
              (SELECT MAX(b.diem) FROM de_bai_lam b
                WHERE b.de_id = d.id AND b.user_id = ? AND b.trang_thai <> 'dang-lam') AS diem_cao_nhat,
              (SELECT b.id FROM de_bai_lam b
                WHERE b.de_id = d.id AND b.user_id = ? AND b.trang_thai = 'dang-lam'
                ORDER BY b.id DESC LIMIT 1) AS dang_lam_id
       ${SQL_GIAO_CUA_TOI}
       ORDER BY (g.dong_luc IS NULL), g.dong_luc ASC, g.created_at DESC`,
      [req.userId, req.userId, req.userId, req.userId, req.userId]
    );
    const gio = Date.now();
    res.json({
      de: rows.map((r) => ({
        ...r,
        // Trạng thái tính ở SERVER để client không phải tự suy từ giờ máy nó (lệch múi giờ là
        // học sinh thấy "đã hết hạn" trong khi vẫn còn thời gian).
        chua_mo: r.mo_luc ? new Date(r.mo_luc).getTime() > gio : false,
        het_han: r.dong_luc ? new Date(r.dong_luc).getTime() < gio : false,
        con_lam_duoc: r.so_lan_lam === 0 ? true : Number(r.da_lam) < Number(r.so_lan_lam),
      })),
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.json({ de: [], chua_migration: true });
    console.error('Lỗi đọc đề của học sinh:', err);
    res.status(500).json({ error: 'Không đọc được danh sách bài được giao.' });
  }
});

// ------------------------------------------------------------------ LÀM BÀI

// POST /api/de-bai/giao/:giaoId/bat-dau — server ghi mốc bắt đầu rồi trả đề
router.post('/giao/:giaoId/bat-dau', async (req, res) => {
  try {
    const g = await layGiao(req.params.giaoId, req.userId);
    if (!g) return res.status(404).json({ error: 'Bài này không được giao cho bạn.' });

    const gio = Date.now();
    if (g.mo_luc && new Date(g.mo_luc).getTime() > gio) {
      return res.status(400).json({ error: 'Chưa tới giờ mở bài.' });
    }
    if (g.dong_luc && new Date(g.dong_luc).getTime() < gio) {
      return res.status(400).json({ error: 'Đã hết hạn nộp bài này.' });
    }

    const [d] = await pool.query(
      'SELECT id, tieu_de, loai, thoi_gian_phut, so_lan_lam, tron_cau, tron_dap_an FROM de_bai WHERE id = ?',
      [g.de_id]
    );
    if (!d.length) return res.status(404).json({ error: 'Không tìm thấy đề.' });
    const de = d[0];

    // Đang làm dở thì TRẢ LẠI bài cũ, không mở lượt mới — nếu không, F5 giữa chừng là được làm
    // lại từ đầu với đồng hồ mới, tức giới hạn thời gian thành vô nghĩa.
    const [dangLam] = await pool.query(
      "SELECT id, bat_dau_luc, lan_thu FROM de_bai_lam WHERE de_id = ? AND user_id = ? AND trang_thai = 'dang-lam' ORDER BY id DESC LIMIT 1",
      [de.id, req.userId]
    );
    let baiLamId; let batDau; let lanThu;
    if (dangLam.length) {
      baiLamId = dangLam[0].id; batDau = dangLam[0].bat_dau_luc; lanThu = dangLam[0].lan_thu;
    } else {
      const [daLam] = await pool.query(
        "SELECT COUNT(*) n FROM de_bai_lam WHERE de_id = ? AND user_id = ? AND trang_thai <> 'dang-lam'",
        [de.id, req.userId]
      );
      if (de.so_lan_lam > 0 && daLam[0].n >= de.so_lan_lam) {
        return res.status(409).json({ error: `Bài này chỉ được làm ${de.so_lan_lam} lần. Bạn đã làm đủ.` });
      }
      lanThu = daLam[0].n + 1;
      const [r] = await pool.query(
        'INSERT INTO de_bai_lam (de_id, giao_id, user_id, lan_thu, bat_dau_luc) VALUES (?,?,?,?,NOW())',
        [de.id, g.id, req.userId, lanThu]
      );
      baiLamId = r.insertId;
      const [b] = await pool.query('SELECT bat_dau_luc FROM de_bai_lam WHERE id = ?', [baiLamId]);
      batDau = b[0].bat_dau_luc;
    }

    // ⚠️ KHÔNG lấy `dap_an` và `giai_thich` — đó là lý do phải liệt kê cột tường minh ở đây.
    const [cau] = await pool.query(
      `SELECT id, sort_order, loai, noi_dung, lua_chon, diem, (anh IS NOT NULL) AS co_anh
         FROM de_cau_hoi WHERE de_id = ? ORDER BY sort_order, id`, [de.id]
    );

    const hetHan = de.thoi_gian_phut
      ? new Date(new Date(batDau).getTime() + de.thoi_gian_phut * 60000).toISOString()
      : null;

    res.json({
      bai_lam_id: baiLamId,
      lan_thu: lanThu,
      de: {
        id: de.id, tieu_de: de.tieu_de, loai: de.loai,
        thoi_gian_phut: de.thoi_gian_phut, tron_cau: !!de.tron_cau, tron_dap_an: !!de.tron_dap_an,
      },
      cau_hoi: cau.map((c) => ({ ...c, lua_chon: docJson(c.lua_chon, null) })),
      bat_dau_luc: batDau,
      // Hai mốc này để client đếm ngược. `gio_server` cho client tự tính độ lệch đồng hồ máy nó.
      het_han_luc: hetHan,
      gio_server: new Date().toISOString(),
      dong_luc: g.dong_luc,
    });
  } catch (err) {
    if (chuaCoBang(err)) return res.status(503).json({ error: 'Chức năng chưa sẵn sàng (thiếu bảng).' });
    console.error('Lỗi bắt đầu làm bài:', err);
    res.status(500).json({ error: 'Không bắt đầu được bài làm.' });
  }
});

/** Ảnh câu hỏi — chỉ trả khi người gọi thật sự được giao đề này. */
router.get('/cau-hoi/:id/anh', async (req, res) => {
  try {
    const [r] = await pool.query(
      `SELECT ch.anh FROM de_cau_hoi ch
        WHERE ch.id = ? AND EXISTS (
          SELECT 1 ${SQL_GIAO_CUA_TOI} AND g.de_id = ch.de_id
        )`, [req.params.id, req.userId, req.userId]
    );
    if (!r.length || !r[0].anh) return res.status(404).json({ error: 'Không có ảnh.' });
    res.json({ anh: r[0].anh });
  } catch (err) {
    console.error('Lỗi đọc ảnh câu hỏi (học sinh):', err);
    res.status(500).json({ error: 'Không đọc được ảnh.' });
  }
});

// POST /api/de-bai/bai-lam/:id/nop — SERVER chấm
router.post('/bai-lam/:id/nop', async (req, res) => {
  const { bai_lam: traLoi } = req.body || {};
  try {
    const [b] = await pool.query(
      'SELECT * FROM de_bai_lam WHERE id = ? AND user_id = ?', [req.params.id, req.userId]
    );
    if (!b.length) return res.status(404).json({ error: 'Không tìm thấy bài làm của bạn.' });
    if (b[0].trang_thai !== 'dang-lam') return res.status(409).json({ error: 'Bài này đã nộp rồi.' });

    const [d] = await pool.query('SELECT * FROM de_bai WHERE id = ?', [b[0].de_id]);
    const de = d[0];

    // Hết giờ vẫn NHẬN bài nhưng đánh dấu `het_gio` — từ chối thẳng thì học sinh mất trắng công
    // làm chỉ vì mạng chậm lúc bấm nộp. Giáo viên nhìn cờ đó để quyết định.
    let hetGio = false;
    if (de.thoi_gian_phut) {
      const han = new Date(b[0].bat_dau_luc).getTime() + de.thoi_gian_phut * 60000;
      // Nới 15 giây cho độ trễ mạng — chặt hơn thì bài nộp đúng giây cuối bị đánh dấu oan.
      hetGio = Date.now() > han + 15000;
    }

    const [cau] = await pool.query(
      'SELECT id, loai, dap_an, diem FROM de_cau_hoi WHERE de_id = ? ORDER BY sort_order, id',
      [de.id]
    );
    const kq = chamBai(cau, traLoi);

    await pool.query(
      `UPDATE de_bai_lam
          SET nop_luc = NOW(), het_gio = ?, diem = ?, tong_diem = ?, so_cau_dung = ?, tong_cau = ?,
              tra_loi = ?, trang_thai = ?
        WHERE id = ?`,
      [hetGio ? 1 : 0, kq.diem, kq.tong_diem, kq.so_cau_dung, kq.tong_cau,
       JSON.stringify(kq.chi_tiet),
       // Còn câu tự luận thì vẫn là 'da-nop' (chờ giáo viên); không có thì coi như chấm xong luôn.
       kq.co_tu_luan ? 'da-nop' : 'da-cham', req.params.id]
    );

    // Ghi MỘT dòng tóm tắt sang `exercise_results` để bài này lên đúng trang Tiến độ / Lộ trình
    // và cộng vào điểm + chuỗi ngày, mà không phải sửa 5 chỗ thống kê đã có.
    // `lesson_id` dài nhất: `de:99999` = 8 ký tự, vừa VARCHAR(32).
    let phanTram = kq.tong_diem > 0 ? Math.round((kq.diem / kq.tong_diem) * 10000) / 100 : 0;
    try {
      const lessonId = `de:${de.id}`;
      const [ins] = await pool.query(
        `INSERT INTO exercise_results (user_id, lesson_id, total_questions, correct_answers, score_percent, time_seconds)
         VALUES (?,?,?,?,?,?)`,
        [req.userId, lessonId, kq.tong_cau, kq.so_cau_dung, phanTram,
         Math.max(0, Math.round((Date.now() - new Date(b[0].bat_dau_luc).getTime()) / 1000))]
      );
      await congDiemVuotKyLuc(pool, {
        userId: req.userId, bang: 'exercise_results', cotKhoa: 'lesson_id',
        khoa: lessonId, diemMoi: phanTram, boQuaId: ins.insertId,
      });
    } catch (e) {
      // Thống kê hỏng KHÔNG được làm hỏng việc nộp bài — bài đã chấm xong ở trên rồi.
      console.warn('Không ghi được exercise_results cho đề tự soạn:', e.code || e.message);
    }
    try { await capNhatChuoi(req.userId); } catch { /* chuỗi ngày là phần phụ */ }

    res.json({
      success: true,
      het_gio: hetGio,
      diem: kq.diem, tong_diem: kq.tong_diem, phan_tram: phanTram,
      so_cau_dung: kq.so_cau_dung, tong_cau: kq.tong_cau,
      cho_cham_tay: kq.co_tu_luan,
      dat: phanTram >= Number(de.diem_dat),
    });
  } catch (err) {
    console.error('Lỗi nộp bài:', err);
    res.status(500).json({ error: 'Không nộp được bài.' });
  }
});

/** Bài làm ĐÃ NỘP gần nhất của mình cho một đề — để nút "Xem bài đã làm" biết mở cái nào. */
router.get('/de/:deId/bai-lam-cua-toi', async (req, res) => {
  try {
    // Ràng buộc "đề này có được giao cho mình không" nằm ngay trong EXISTS — không có nó thì
    // đoán id đề là xem được bài của chính mình ở đề chưa từng được giao (không nguy hiểm, nhưng
    // vẫn là lối vào không nên mở).
    const [r] = await pool.query(
      `SELECT b.id FROM de_bai_lam b
        WHERE b.de_id = ? AND b.user_id = ? AND b.trang_thai <> 'dang-lam'
          AND EXISTS (SELECT 1 ${SQL_GIAO_CUA_TOI} AND g.de_id = b.de_id)
        ORDER BY b.id DESC LIMIT 1`,
      [req.params.deId, req.userId, req.userId, req.userId]
    );
    res.json({ bai_lam_id: r[0]?.id || null });
  } catch (err) {
    console.error('Lỗi tra bài làm của tôi:', err);
    res.status(500).json({ error: 'Không tra được bài làm.' });
  }
});

// GET /api/de-bai/bai-lam/:id — xem lại bài đã làm
router.get('/bai-lam/:id', async (req, res) => {
  try {
    const [b] = await pool.query(
      `SELECT b.*, d.tieu_de, d.ma, d.loai, d.hien_dap_an, d.diem_dat, d.thoi_gian_phut
         FROM de_bai_lam b JOIN de_bai d ON d.id = b.de_id
        WHERE b.id = ? AND b.user_id = ?`, [req.params.id, req.userId]
    );
    if (!b.length) return res.status(404).json({ error: 'Không tìm thấy bài làm của bạn.' });
    const bl = b[0];
    if (bl.trang_thai === 'dang-lam') return res.status(400).json({ error: 'Bài này bạn chưa nộp.' });

    // Được xem đáp án hay không do CẤU HÌNH TỪNG ĐỀ quyết định (chốt 17/09/2026).
    let choXem = bl.hien_dap_an === 'ngay';
    if (bl.hien_dap_an === 'sau-han') {
      const [g] = await pool.query('SELECT dong_luc FROM de_giao WHERE id = ?', [bl.giao_id]);
      const dong = g.length ? g[0].dong_luc : null;
      // Không đặt hạn nộp thì "sau hạn" không bao giờ tới — coi như cho xem ngay, thay vì khoá
      // vĩnh viễn một thứ giáo viên tưởng là sẽ mở.
      choXem = !dong || new Date(dong).getTime() < Date.now();
    }

    const cot = choXem
      ? 'id, sort_order, loai, noi_dung, lua_chon, dap_an, diem, giai_thich, (anh IS NOT NULL) AS co_anh'
      : 'id, sort_order, loai, noi_dung, lua_chon, diem, (anh IS NOT NULL) AS co_anh';
    const [cau] = await pool.query(
      `SELECT ${cot} FROM de_cau_hoi WHERE de_id = ? ORDER BY sort_order, id`, [bl.de_id]
    );

    const chiTiet = docJson(bl.tra_loi, {});
    res.json({
      bai_lam: {
        id: bl.id, lan_thu: bl.lan_thu, bat_dau_luc: bl.bat_dau_luc, nop_luc: bl.nop_luc,
        het_gio: !!bl.het_gio, diem: bl.diem, tong_diem: bl.tong_diem,
        so_cau_dung: bl.so_cau_dung, tong_cau: bl.tong_cau, trang_thai: bl.trang_thai,
        nhan_xet: bl.nhan_xet, cham_luc: bl.cham_luc,
        tieu_de: bl.tieu_de, ma: bl.ma, loai: bl.loai, diem_dat: bl.diem_dat,
        dat: bl.tong_diem > 0 ? (Number(bl.diem) / Number(bl.tong_diem)) * 100 >= Number(bl.diem_dat) : false,
      },
      cho_xem_dap_an: choXem,
      cau_hoi: cau.map((c) => ({
        ...c,
        lua_chon: docJson(c.lua_chon, null),
        dap_an: choXem ? docJson(c.dap_an, null) : undefined,
        ket_qua: chiTiet[c.id] || null,
      })),
    });
  } catch (err) {
    console.error('Lỗi xem lại bài làm:', err);
    res.status(500).json({ error: 'Không xem được bài làm.' });
  }
});

/** Đánh dấu đã đọc nhận xét của giáo viên — tắt chấm đỏ trên chuông. */
router.post('/bai-lam/:id/doc', async (req, res) => {
  try {
    await pool.query(
      'UPDATE de_bai_lam SET da_doc_luc = NOW() WHERE id = ? AND user_id = ? AND da_doc_luc IS NULL',
      [req.params.id, req.userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi đánh dấu đã đọc bài làm:', err);
    res.status(500).json({ error: 'Không đánh dấu được.' });
  }
});

export default router;
