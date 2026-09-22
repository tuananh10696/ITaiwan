// =============================================================
// TÁC VỤ ĐỊNH KỲ — 2026-09-16
// =============================================================
// Vercel Cron gọi các route ở đây theo lịch khai trong `vercel.json`.
//
// BẢO VỆ: Vercel Cron gửi header `Authorization: Bearer $CRON_SECRET`. Không kiểm thì bất kỳ ai
// biết đường dẫn cũng gọi được — với route nhắc học thì đó là một nút "gửi mail cho toàn bộ học
// viên" mở công khai, đủ để đốt hạn mức Resend và đưa tên miền vào danh sách spam.
//
// THIẾU `CRON_SECRET` thì route TỪ CHỐI CHẠY (503), không phải "cho qua vì chưa cấu hình" — một
// cửa mở im lặng nguy hiểm hơn một lỗi nhìn thấy được.
import { Router } from 'express';
import pool from '../config/db.js';
import { sendNhacHocEmail, sendNhacDuHocEmail, emailStatus, isEmailConfigured } from '../utils/email.js';
import { baoHocSinh, daBaoGanDay } from '../utils/du-hoc-thong-bao.js';

const router = Router();

/** Số học viên tối đa gửi trong một lần chạy — chặn hoá đơn bất ngờ nếu truy vấn sai. */
const TRAN_MOI_LAN = 200;

function kiemQuyen(req, res) {
  const bi = process.env.CRON_SECRET;
  if (!bi) {
    res.status(503).json({ error: 'Chưa cấu hình CRON_SECRET — từ chối chạy tác vụ định kỳ.' });
    return false;
  }
  const h = String(req.headers.authorization || '');
  if (h !== `Bearer ${bi}`) {
    res.status(401).json({ error: 'Không có quyền.' });
    return false;
  }
  return true;
}

/**
 * GET /api/cron/nhac-hoc — mail nhắc học hằng ngày.
 *
 * Chỉ gửi cho học viên thoả ĐỦ các điều kiện dưới. Mỗi điều kiện đều nhằm tránh làm phiền người
 * không cần nhắc — mail nhắc học bị bỏ qua một lần là lần sau không ai mở nữa:
 *   1. Còn bật nhận mail nhắc (tự tắt được ở trang Cài đặt)
 *   2. Đã xác thực + được duyệt, và có hoạt động trong 30 ngày qua (bỏ tài khoản chết)
 *   3. HÔM NAY chưa học gì (có học rồi thì nhắc là vô duyên)
 *   4. Hôm nay chưa được nhắc (cron chạy lại không gửi trùng)
 *   5. Thật sự CÓ VIỆC để làm: từ đến hạn ôn, bài cô giao chưa nộp, hoặc chuỗi ngày đang có
 *
 * `?thu=1` chạy thử: tính toán và trả danh sách nhưng KHÔNG gửi mail, KHÔNG ghi nhac_lan_cuoi.
 */
router.get('/nhac-hoc', async (req, res) => {
  if (!kiemQuyen(req, res)) return;
  const chayThu = req.query.thu === '1';

  try {
    const [ds] = await pool.query(
      `SELECT u.id, u.name, u.email, u.streak,
              (SELECT COUNT(*) FROM srs_words s
                WHERE s.user_id = u.id AND s.due_date IS NOT NULL AND s.due_date <= CURDATE()) AS tu_on
         FROM users u
        WHERE u.nhan_mail_nhac = TRUE
          AND u.is_verified = TRUE AND u.is_approved = TRUE
          AND u.email NOT LIKE '%@local.invalid' AND u.email NOT LIKE '%@demo.invalid'
          AND u.email NOT LIKE '%@example.%' AND u.email NOT LIKE '%_test@%'
          AND (u.nhac_lan_cuoi IS NULL OR u.nhac_lan_cuoi < CURDATE())
          AND u.last_active IS NOT NULL AND u.last_active >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          -- Hôm nay đã học thì thôi: vừa nộp bài xong mà nhận mail "hãy học đi" là mất tin tưởng.
          AND NOT EXISTS (SELECT 1 FROM exercise_results er
                           WHERE er.user_id = u.id AND DATE(er.created_at) = CURDATE())
        LIMIT ?`,
      [TRAN_MOI_LAN]
    );

    const ketQua = [];
    for (const u of ds) {
      // Bài cô giao chưa nộp. Dùng chung quy ước lesson_id với exercise_results (4.15) nên
      // "đã nộp hay chưa" chỉ là một phép EXISTS, không có bảng nộp bài riêng.
      let baiGiao = [];
      try {
        const [b] = await pool.query(
          `SELECT a.title, a.lesson_id, a.due_date
             FROM assignments a
             JOIN class_enrollments ce ON ce.class_id = a.class_id AND ce.user_id = ?
            WHERE NOT EXISTS (SELECT 1 FROM exercise_results er
                               WHERE er.user_id = ? AND er.lesson_id = a.lesson_id)
              AND (a.due_date IS NULL OR a.due_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY))
            ORDER BY a.due_date IS NULL, a.due_date LIMIT 5`,
          [u.id, u.id]
        );
        baiGiao = b.map((x) => ({ ten: x.title || x.lesson_id, han: x.due_date }));
      } catch (_) { baiGiao = []; }   // thiếu bảng assignments không được chặn cả tác vụ

      const soTuOn = Number(u.tu_on || 0);
      const chuoi = Number(u.streak || 0);
      // Không có việc gì để làm thì KHÔNG gửi. Đây là điều kiện quan trọng nhất của cả tác vụ:
      // mail nhắc mà mở ra không có gì để làm thì lần sau không ai mở nữa.
      if (!baiGiao.length && soTuOn === 0 && chuoi === 0) continue;

      const gui = chayThu ? true
        : await sendNhacHocEmail(u.email, { hoTen: u.name, soTuOn, baiGiao, chuoi });

      if (gui && !chayThu) {
        await pool.query('UPDATE users SET nhac_lan_cuoi = CURDATE() WHERE id = ?', [u.id]);
      }
      ketQua.push({ id: u.id, email: u.email, tu_on: soTuOn, bai_giao: baiGiao.length, chuoi, gui });
    }

    res.json({
      quet: ds.length, gui: ketQua.length, chay_thu: chayThu,
      email: emailStatus(),
      // Nói thẳng khi mail không rời khỏi server, thay vì báo "đã gửi N" cho một việc chưa xảy ra
      // (bài học ở route nhắc nộp bài, 4.15).
      canh_bao: isEmailConfigured() ? null : 'Mail KHÔNG được gửi thật (thiếu RESEND_API_KEY hoặc đang EMAIL_DRY_RUN).',
      chi_tiet: ketQua.slice(0, 50),
    });
  } catch (err) {
    if (err?.code === 'ER_BAD_FIELD_ERROR' || err?.code === 'ER_NO_SUCH_TABLE') {
      return res.status(503).json({ error: 'DB chưa chạy migration-nhac-hoc.sql.' });
    }
    console.error('Lỗi cron nhắc học:', err);
    res.status(500).json({ error: 'Lỗi chạy tác vụ nhắc học.' });
  }
});

/**
 * GET /api/cron/nhac-du-hoc — nhắc hồ sơ du học (2026-09-16).
 *
 * Tách khỏi `/nhac-hoc` có chủ ý: đây là việc CÓ HẠN CHÓT THẬT (lịch phỏng vấn, lịch bay, hạn
 * đăng ký ký túc xá, giấy tờ trung tâm đang đợi) nên vừa ghi thông báo vào chuông, vừa gửi mail;
 * còn nhắc học chỉ là lời mời quay lại. Trộn hai thứ vào một mail thì việc gấp bị chìm.
 *
 * Chống spam — thứ giữ cho tính năng này không tự giết mình:
 *   · mỗi loại việc chỉ nhắc lại sau N ngày (`daBaoGanDay`), vì "còn thiếu 3 giấy tờ" thì tối
 *     nào cũng đúng; không có chốt này là em nhận đúng một câu đó 30 tối liền rồi tắt nhận mail,
 *     và mất luôn kênh báo LỊCH BAY.
 *   · hồ sơ đã bay / tạm dừng / huỷ thì không nhắc gì nữa.
 *   · vẫn tôn trọng công tắc `nhan_mail_nhac` ở trang Cài đặt.
 *
 * `?thu=1` chạy thử: tính đầy đủ, KHÔNG gửi mail và KHÔNG ghi thông báo.
 */
router.get('/nhac-du-hoc', async (req, res) => {
  if (!kiemQuyen(req, res)) return;
  const chayThu = req.query.thu === '1';

  try {
    const [ds] = await pool.query(
      `SELECT h.id, h.ma_hs, h.ho_ten, h.user_id, h.buoc, h.tong_phi,
              h.ngay_phong_van, h.ngay_bay, h.ngay_nop_visa, h.ktx_han, h.ktx_dang_ky,
              h.hs_gui_luc,
              u.name, u.email, u.nhan_mail_nhac,
              (SELECT COUNT(*) FROM du_hoc_giay_to g
                WHERE g.ho_so_id = h.id AND g.bat_buoc = TRUE AND g.trang_thai = 'chua') AS thieu_giay,
              COALESCE((SELECT SUM(CASE WHEN tt.loai = 'thu' THEN tt.so_tien ELSE -tt.so_tien END)
                          FROM du_hoc_thu_tien tt WHERE tt.ho_so_id = h.id), 0) AS da_thu
         FROM du_hoc_ho_so h
         JOIN users u ON u.id = h.user_id
        WHERE h.user_id IS NOT NULL
          AND h.buoc NOT IN ('hoan-thanh', 'tam-dung', 'huy')
          AND u.is_verified = TRUE AND u.is_approved = TRUE
          AND u.email NOT LIKE '%@local.invalid' AND u.email NOT LIKE '%@demo.invalid'
          AND u.email NOT LIKE '%@example.%' AND u.email NOT LIKE '%_test@%'
        LIMIT ?`,
      [TRAN_MOI_LAN]
    );

    const homNay = new Date(); homNay.setHours(0, 0, 0, 0);
    const conMay = (d) => (d ? Math.round((new Date(d).setHours(0, 0, 0, 0) - homNay) / 86400000) : null);
    const ketQua = [];

    for (const h of ds) {
      const viec = [];

      // 1. Lịch sắp tới — nhắc khi còn <= 7 ngày, và chỉ khi CHƯA QUA.
      const pv = conMay(h.ngay_phong_van);
      if (pv !== null && pv >= 0 && pv <= 7 && !(await daBaoGanDay(h.id, 'phong-van', 3))) {
        viec.push({ loai: 'phong-van', nhan: pv === 0 ? 'Hôm nay phỏng vấn trường' : `Còn ${pv} ngày tới buổi phỏng vấn`,
          chiTiet: 'Chuẩn bị hồ sơ và có mặt đúng giờ.', ngay: h.ngay_phong_van, gap: pv });
      }
      const bay = conMay(h.ngay_bay);
      if (bay !== null && bay >= 0 && bay <= 14 && !(await daBaoGanDay(h.id, 'bay', 3))) {
        viec.push({ loai: 'bay', nhan: bay === 0 ? 'Hôm nay bay' : `Còn ${bay} ngày nữa bạn bay`,
          chiTiet: 'Kiểm tra lại hộ chiếu, visa và hành lý.', ngay: h.ngay_bay, gap: bay });
      }
      const visa = conMay(h.ngay_nop_visa);
      if (visa !== null && visa >= 0 && visa <= 7 && !(await daBaoGanDay(h.id, 'visa', 3))) {
        viec.push({ loai: 'visa', nhan: visa === 0 ? 'Hôm nay nộp hồ sơ visa' : `Còn ${visa} ngày tới hạn nộp visa`,
          ngay: h.ngay_nop_visa, gap: visa });
      }
      const ktx = conMay(h.ktx_han);
      if (ktx !== null && ktx >= 0 && ktx <= 10 && h.ktx_dang_ky === 'chua-quyet'
          && !(await daBaoGanDay(h.id, 'ktx', 5))) {
        viec.push({ loai: 'ktx', nhan: `Còn ${ktx} ngày để đăng ký ký túc xá`,
          chiTiet: 'Bạn chưa chọn nguyện vọng chỗ ở — vào hồ sơ du học chọn giúp trung tâm nhé.',
          ngay: h.ktx_han, gap: ktx });
      }

      // 2. Giấy tờ còn thiếu — nhắc mỗi 7 ngày.
      const thieu = Number(h.thieu_giay || 0);
      if (thieu > 0 && !(await daBaoGanDay(h.id, 'nhac-giay-to', 7))) {
        viec.push({ loai: 'nhac-giay-to', nhan: `Còn ${thieu} giấy tờ bắt buộc chưa nộp`,
          chiTiet: 'Xem danh sách trong hồ sơ du học và mang tới trung tâm.', gap: 90 });
      }

      // 3. Công nợ — nhắc mỗi 10 ngày. Chỉ nhắc khi trung tâm ĐÃ chốt tổng phí; chưa chốt mà đòi
      //    tiền là sai (tong_phi = 0 nghĩa là chưa thoả thuận, không phải "nợ toàn bộ").
      const conNo = Number(h.tong_phi || 0) - Number(h.da_thu || 0);
      if (Number(h.tong_phi || 0) > 0 && conNo > 0 && !(await daBaoGanDay(h.id, 'nhac-tien', 10))) {
        viec.push({ loai: 'nhac-tien', nhan: `Còn ${conNo.toLocaleString('vi-VN')}đ chưa đóng`,
          chiTiet: 'Liên hệ tư vấn viên để sắp lịch đóng phí.', gap: 95 });
      }

      // 4. Chưa khai hồ sơ — nhắc mỗi 5 ngày.
      if (!h.hs_gui_luc && !(await daBaoGanDay(h.id, 'khai-bao', 5))) {
        viec.push({ loai: 'khai-bao', nhan: 'Bạn chưa gửi khai báo hồ sơ',
          chiTiet: 'Điền thông tin cá nhân và nguyện vọng để trung tâm bắt đầu làm hồ sơ.', gap: 99 });
      }

      if (!viec.length) continue;
      viec.sort((a, b) => a.gap - b.gap);   // gấp nhất lên đầu — quyết định tiêu đề mail

      let gui = true;
      if (!chayThu) {
        for (const v of viec) await baoHocSinh(h.id, h.user_id, v.loai, v.nhan, v.chiTiet, v.ngay);
        // Tôn trọng công tắc tắt mail: thông báo trong chuông vẫn ghi (em vào app là thấy),
        // nhưng KHÔNG gửi mail cho người đã nói đừng gửi nữa.
        gui = h.nhan_mail_nhac
          ? await sendNhacDuHocEmail(h.email, { hoTen: h.name, maHs: h.ma_hs, viec })
          : false;
      }
      ketQua.push({ ho_so: h.ma_hs, email: h.email, so_viec: viec.length, viec: viec.map((v) => v.nhan), gui });
    }

    res.json({
      quet: ds.length, nhac: ketQua.length, chay_thu: chayThu,
      email: emailStatus(),
      canh_bao: isEmailConfigured() ? null : 'Mail KHÔNG được gửi thật (thiếu RESEND_API_KEY hoặc đang EMAIL_DRY_RUN).',
      chi_tiet: ketQua.slice(0, 50),
    });
  } catch (err) {
    if (err?.code === 'ER_BAD_FIELD_ERROR' || err?.code === 'ER_NO_SUCH_TABLE') {
      return res.status(503).json({ error: 'DB chưa chạy migration-du-hoc-hocvien.sql.' });
    }
    console.error('Lỗi cron nhắc du học:', err);
    res.status(500).json({ error: 'Lỗi chạy tác vụ nhắc du học.' });
  }
});

export default router;
