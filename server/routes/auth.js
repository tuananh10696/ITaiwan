// Auth Routes - Register, Login, Me
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';
import { requireAuth, generateToken } from '../middleware/auth.js';
import { sendVerificationEmail, getAppBaseUrl } from '../utils/email.js';
import { chanDangNhap, chanDangKy, chanGuiMail } from '../middleware/gioi-han.js';
import { ghiNhanDangNhap, ipCuaReq } from '../utils/thiet-bi.js';

const router = Router();

// POST /api/auth/register
router.post('/register', chanDangKy, async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ tên, email và mật khẩu.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu cần ít nhất 6 ký tự.' });
    }

    // Check if email already exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email này đã được đăng ký.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarLetter = name.charAt(0).toUpperCase();
    const colors = ['#F59E0B', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F97316', '#06B6D4'];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];
    
    const verificationToken = uuidv4();

    await pool.query(
      `INSERT INTO users (name, email, phone, password_hash, avatar_letter, avatar_color, last_active, is_verified, verification_token) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), false, ?)`,
      [name, email, phone || null, passwordHash, avatarLetter, avatarColor, verificationToken]
    );

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (!emailSent) {
      console.warn(`Không thể gửi email tới ${email}.`);
    }

    // emailSent: tài khoản luôn được tạo dù gửi mail thất bại (không chặn đăng ký
    // vì lỗi SMTP), nhưng vẫn trả cờ này để frontend có thể phân biệt "đã gửi" với
    // "tạo tài khoản xong nhưng gửi mail lỗi, hãy thử đăng nhập lại/liên hệ hỗ trợ" —
    // trước đây nuốt luôn kết quả, người dùng không có cách nào biết mail có đi hay
    // không ngoài việc chờ và không thấy gì.
    res.status(201).json({
      message: emailSent
        ? 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản. Sau khi xác nhận, giáo viên sẽ duyệt và kích hoạt tài khoản cho bạn.'
        : 'Đăng ký thành công, nhưng hệ thống gửi email xác nhận đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.',
      requireVerification: true,
      emailSent,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại.' });
  }
});

// GET /api/auth/verify?token=...
router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send('Token không hợp lệ.');

    const [rows] = await pool.query('SELECT id FROM users WHERE verification_token = ? AND is_verified = false', [token]);
    if (rows.length === 0) {
      return res.redirect('/?verified=invalid');
    }

    await pool.query('UPDATE users SET is_verified = true, verification_token = NULL WHERE id = ?', [rows[0].id]);

    // Redirect to frontend with success query param. FRONTEND_URL riêng vẫn được ưu
    // tiên nếu có (trường hợp frontend deploy ở domain khác API), nhưng ở dự án này
    // frontend + API chung 1 domain Vercel nên getAppBaseUrl() (cùng helper build
    // link xác nhận trong email) là fallback đúng — trước đây fallback cứng về
    // localhost:5173, redirect sau khi xác nhận trên production sẽ hỏng.
    const frontendUrl = process.env.FRONTEND_URL || getAppBaseUrl();
    res.redirect(`${frontendUrl}/?verified=true`);
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).send('Lỗi hệ thống khi xác nhận email.');
  }
});

// POST /api/auth/resend-verification — gửi lại email xác nhận
//
// 2026-08-27: trước đây KHÔNG có route này. Nếu lần gửi mail lúc đăng ký thất bại (Resend hết hạn key,
// chưa verify domain, mạng lỗi...) thì tài khoản nằm lại trong DB với is_verified = 0 và học viên
// KẸT HOÀN TOÀN: không đăng nhập được, cũng không có cách nào yêu cầu gửi lại mail.
//
// Lưu ý bảo mật: luôn trả cùng một thông báo dù email có tồn tại hay không, để không biến endpoint này
// thành công cụ dò xem email nào đã đăng ký. Token cũng được cấp mới mỗi lần gửi lại.
router.post('/resend-verification', chanGuiMail, async (req, res) => {
  const genericMessage = 'Nếu email này đã đăng ký và chưa xác nhận, hệ thống đã gửi lại link xác nhận. Vui lòng kiểm tra hộp thư (kể cả mục Spam).';
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Vui lòng nhập email.' });
    }

    const [rows] = await pool.query(
      'SELECT id, is_verified FROM users WHERE email = ?',
      [email.trim()]
    );

    // Không tồn tại, hoặc đã xác nhận rồi -> vẫn trả thông báo chung, không gửi gì cả.
    if (rows.length === 0 || rows[0].is_verified) {
      return res.json({ message: genericMessage });
    }

    const verificationToken = uuidv4();
    await pool.query('UPDATE users SET verification_token = ? WHERE id = ?', [verificationToken, rows[0].id]);

    const sent = await sendVerificationEmail(email.trim(), verificationToken);
    if (!sent) console.warn(`Gửi lại email xác nhận thất bại cho ${email}.`);

    // emailSent để frontend/admin biết thực tế mail có đi hay không; message thì vẫn trung tính.
    res.json({ message: genericMessage, emailSent: sent });
  } catch (err) {
    console.error('Resend verification error:', err);
    res.status(500).json({ error: 'Lỗi gửi lại email xác nhận.' });
  }
});

// POST /api/auth/login
router.post('/login', chanDangNhap, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu.' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
    }

    const user = rows[0];
    
    if (!user.is_verified) {
      return res.status(403).json({ error: 'Vui lòng kiểm tra email để xác nhận tài khoản trước khi đăng nhập.' });
    }



    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
    }

    // ⚠️ ĐĂNG NHẬP KHÔNG CÒN CỘNG CHUỖI NGÀY (2026-09-08, xem CLAUDE.md 4.38).
    //
    // Trước đây chỗ này +1 chuỗi mỗi ngày có đăng nhập, tức nó đếm "ngày MỞ APP" chứ không
    // phải "ngày CÓ HỌC" — mở app rồi treo đó vẫn được tính, nên con số khoe ở trang chủ và
    // bảng xếp hạng là số ảo.
    //
    // Nay chuỗi do `capNhatChuoi()` trong server/routes/lotrinh.js quyết định, dựa trên hoạt
    // động THẬT (≥5 phút và ≥3 lượt trang) hoặc có nộp bài. `users.last_active` vì vậy đổi
    // nghĩa thành "ngày gần nhất ĐƯỢC TÍNH vào chuỗi" — route này mà còn set `last_active`
    // thì hàm kia luôn thấy "hôm nay tính rồi" và chuỗi đứng im mãi mãi.
    const newStreak = user.streak;

    // ------------------------------------------------ giới hạn thiết bị (2026-09-15)
    // Đặt SAU khi đã kiểm mật khẩu: kiểm trước thì endpoint này thành công cụ dò xem một email có
    // tồn tại hay không (thông báo "quá số thiết bị" chỉ xuất hiện với tài khoản CÓ THẬT).
    // Đặt TRƯỚC khi phát token: phát rồi mới chặn thì token vẫn dùng được cho mọi API khác.
    const tb = await ghiNhanDangNhap({
      userId: user.id,
      vaiTro: user.role || (user.is_admin ? 'admin' : 'student'),
      deviceId: req.body?.device_id,
      userAgent: req.headers['user-agent'],
      ip: ipCuaReq(req),
    });
    if (!tb.cho) {
      const ds = (tb.ds || []).map((d) => d.ten).filter(Boolean).join(' và ');
      return res.status(403).json({
        error: `Tài khoản này đã đăng nhập trên ${tb.tran} thiết bị${ds ? ` (${ds})` : ''}. `
             + 'Mỗi tài khoản chỉ dùng được trên 2 thiết bị. Vui lòng liên hệ quản trị viên để gỡ bớt thiết bị cũ.',
        qua_thiet_bi: true,
        so_thiet_bi: tb.so,
        tran_thiet_bi: tb.tran,
      });
    }

    const token = generateToken(user);
    res.json({
      message: 'Đăng nhập thành công!',
      // Cảnh báo "đang dùng 2/2 thiết bị" — báo TRƯỚC khi họ bị chặn ở máy thứ 3, chứ không phải
      // sau. Null khi chưa chạm hạn mức, khi là nhân sự, hoặc khi client chưa gửi device_id.
      canh_bao_thiet_bi: tb.canhBao,
      so_thiet_bi: tb.so,
      tran_thiet_bi: tb.tran,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar_letter: user.avatar_letter,
        avatar_color: user.avatar_color,
        avatar_url: user.avatar_url || null,
        level_label: user.level_label,
        level_num: user.level_num,
        streak: newStreak,
        longest_streak: Math.max(newStreak, user.longest_streak),
        points: user.points,
        char_mode: user.char_mode,
        is_admin: user.is_admin,
        // role: student | teacher | admin — trang admin.html dùng để biết hiện những mục nào.
        role: user.role || (user.is_admin ? 'admin' : 'student'),
        is_approved: user.is_approved,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, avatar_letter, avatar_color, level_label, level_num, streak, longest_streak, points, char_mode, is_admin, role, is_approved, nhan_mail_nhac FROM users WHERE id = ?',
      [req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản.' });
    }
    res.json({ user: rows[0] });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
});

export default router;
