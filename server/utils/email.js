// Gửi email qua Resend (transactional email API) thay vì SMTP Gmail.
//
// 2026-08-25: chuyển từ Gmail SMTP sang Resend sau khi xác nhận qua log Vercel
// thật là Gmail chặn đăng nhập SMTP theo rủi ro IP (534-5.7.9 WebLoginRequired) —
// lỗi này không "sửa" được vĩnh viễn khi vẫn gửi qua Gmail cá nhân từ IP cloud
// dùng chung của Vercel (IP đổi liên tục, Google luôn coi là đáng ngờ). Resend
// được xây riêng cho việc gửi mail từ server/serverless nên không gặp vấn đề này.
// Không cần thêm package `resend` — chỉ cần `fetch` (có sẵn trong Node 18+) gọi
// thẳng REST API, tránh phải thêm dependency mới + cập nhật package-lock.json.
//
// 2026-09-28: thêm kênh thứ hai — SMTP của Email Doanh Nghiệp Vietnix (hộp noreply@) — khi chuyển
// từ Vercel sang VPS. Mục đích là CỘNG hạn mức: Resend Free chỉ 100 mail/ngày, Vietnix 200 mail/giờ.
// Mỗi mail đi theo thứ tự kênh trong `THU_TU` bên dưới, kênh đầu lỗi (hết hạn mức, sai cấu hình,
// mạng) thì tự thử kênh sau. Chỉ kênh nào ĐỦ biến môi trường mới được dùng — thiếu cả hai thì
// giữ nguyên hành vi dev cũ: in ra console và coi như đã gửi.
import nodemailer from 'nodemailer';

const RESEND_API_URL = 'https://api.resend.com/emails';

// EMAIL_DRY_RUN=true  -> KHÔNG gửi mail thật, chỉ in ra console.
// Đặt cờ này ở .env của máy dev sau khi clone dữ liệu production về: DB local lúc đó chứa email
// THẬT của học viên, bấm nhầm nút "Nhắc nộp bài" hay "Thêm học viên" là mail bay tới các em thật
// (2026-08-27).
export const isEmailDryRun = () => String(process.env.EMAIL_DRY_RUN).toLowerCase() === 'true';

/** 'san-sang' | 'dry-run' | 'thieu-key' — dùng để báo đúng sự thật cho người bấm nút. */
export const emailStatus = () => (isEmailDryRun() ? 'dry-run' : (coResend() || coSmtp() ? 'san-sang' : 'thieu-key'));

// Có gửi được mail thật hay không. Các hàm gửi bên dưới cố ý trả về true khi thiếu cả hai kênh
// (để môi trường dev không vỡ luồng, chỉ in ra console) — nhưng chỗ nào BÁO CÁO lại cho người dùng
// hoặc GHI NHỚ "đã gửi" thì phải hỏi hàm này trước, nếu không giáo viên sẽ thấy "Đã gửi nhắc 5 em"
// trong khi thực tế không có email nào rời khỏi server (2026-08-27).
export const isEmailConfigured = () => emailStatus() === 'san-sang';

// Base URL công khai của app — dùng để build link xác nhận trong email và link
// redirect sau khi xác nhận. Thứ tự ưu tiên:
//   1. APP_URL (đặt tay trong biến môi trường Vercel — production nên set rõ)
//   2. VERCEL_PROJECT_PRODUCTION_URL — domain production ổn định Vercel tự cấp
//      (không đổi giữa các lần deploy, không có protocol nên phải tự thêm https://)
//   3. VERCEL_URL — domain của lần deploy hiện tại (preview/production), Vercel
//      luôn tự set nên đây là lưới an toàn cuối cùng trước khi rơi về localhost
//   4. localhost:3001 — chỉ đúng khi chạy `npm run server` ở máy dev
export function getAppBaseUrl() {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3001';
}

// ------------------------------------------------------------------ KÊNH GỬI
function coResend() { return Boolean(process.env.RESEND_API_KEY); }
function coSmtp() { return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS); }

const tenNguoiGui = () => process.env.EMAIL_FROM_NAME || process.env.RESEND_FROM_NAME || 'Trung tâm ITaiwan';

/**
 * Thứ tự thử kênh theo LOẠI mail:
 *   • 'giao-dich' (xác thực, chào mừng) — người dùng đang đứng đợi mail -> Resend trước, vì tỉ lệ
 *     vào inbox tốt hơn và không vướng trần theo giờ.
 *   • 'hang-loat' (nhắc học, nhắc du học, nhắc nộp bài) — đi theo lô cả trăm mail -> SMTP Vietnix
 *     trước để để dành 100 mail/ngày của Resend cho mail giao dịch.
 */
const THU_TU = { 'giao-dich': ['resend', 'smtp'], 'hang-loat': ['smtp', 'resend'] };

// Resend trả 429 khi chạm trần (Free: 100 mail/ngày) -> nghỉ kênh này 10 phút thay vì gọi hỏng
// từng mail một suốt cả lô cron.
let resendNghiDen = 0;

async function quaResend({ to, subject, text, html }) {
  if (Date.now() < resendNghiDen) return { ok: false, loi: 'Resend đang tạm nghỉ sau lỗi 429' };
  // RESEND_FROM_EMAIL phải thuộc domain đã verify trên Resend Dashboard → Domains; để mặc định
  // "onboarding@resend.dev" thì Resend chỉ giao tới đúng email chủ tài khoản Resend (403 với
  // mọi địa chỉ khác, dù code chạy đúng).
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const payload = { from: `${tenNguoiGui()} <${fromAddress}>`, to: [to], subject, text, html };
  if (process.env.EMAIL_REPLY_TO) payload.reply_to = process.env.EMAIL_REPLY_TO;

  // Timeout rõ ràng: fail nhanh và có kiểm soát thay vì treo cả lô cron.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      if (res.status === 429) resendNghiDen = Date.now() + 10 * 60 * 1000;
      return { ok: false, loi: `Resend ${res.status}`, chiTiet: data };
    }
    return { ok: true, id: data?.id };
  } catch (error) {
    return { ok: false, loi: `Resend: ${error?.name || ''} ${error?.message || ''}`.trim() };
  } finally {
    clearTimeout(timeoutId);
  }
}

// Trần theo giờ của Email Doanh Nghiệp Vietnix là 200 mail/giờ; mặc định tự dừng ở 180 để chừa
// chỗ cho mail nhân viên gửi tay cùng domain. Đếm trong bộ nhớ tiến trình — đúng khi PM2 chạy
// MỘT tiến trình (deploy/ecosystem.config.cjs). Vượt trần thì mail rơi sang Resend, không mất.
const SMTP_DA_GUI = [];
function smtpConHanMuc() {
  const tran = Number.parseInt(process.env.SMTP_GIOI_HAN_GIO, 10) || 180;
  const mocGio = Date.now() - 60 * 60 * 1000;
  while (SMTP_DA_GUI.length && SMTP_DA_GUI[0] < mocGio) SMTP_DA_GUI.shift();
  return SMTP_DA_GUI.length < tran;
}

let smtpTransport = null;
function laySmtp() {
  if (!smtpTransport) {
    const port = Number.parseInt(process.env.SMTP_PORT, 10) || 465;
    smtpTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      // 465 = SSL ngay từ đầu; 587 = STARTTLS. SMTP_SECURE ghi đè khi nhà cung cấp làm khác lệ.
      secure: process.env.SMTP_SECURE ? String(process.env.SMTP_SECURE).toLowerCase() === 'true' : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
  }
  return smtpTransport;
}

async function quaSmtp({ to, subject, text, html }) {
  if (!smtpConHanMuc()) return { ok: false, loi: 'SMTP đã chạm trần mail/giờ (SMTP_GIOI_HAN_GIO)' };
  try {
    const info = await laySmtp().sendMail({
      // Máy chủ mail thường từ chối From khác hộp đang đăng nhập -> mặc định From = SMTP_USER.
      from: { name: tenNguoiGui(), address: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER },
      to, subject, text, html,
      ...(process.env.EMAIL_REPLY_TO ? { replyTo: process.env.EMAIL_REPLY_TO } : {}),
    });
    SMTP_DA_GUI.push(Date.now());
    return { ok: true, id: info?.messageId };
  } catch (error) {
    return { ok: false, loi: `SMTP: ${error?.code || ''} ${error?.message || ''}`.trim() };
  }
}

/**
 * Gửi một mail qua các kênh đang cấu hình, theo thứ tự của `loai`.
 * @returns {Promise<{ok: boolean, kenh?: string, id?: string, loi?: Array}>}
 *   Chưa cấu hình kênh nào -> in `devLog` và trả ok (hành vi dev như trước).
 */
async function guiMail({ to, subject, text, html }, { loai, nhan, devLog }) {
  const kenh = THU_TU[loai].filter((k) => (k === 'resend' ? coResend() : coSmtp()));
  if (!kenh.length) {
    console.log(devLog);
    return { ok: true, kenh: 'dev' };
  }
  const loi = [];
  for (const k of kenh) {
    const kq = k === 'resend' ? await quaResend({ to, subject, text, html }) : await quaSmtp({ to, subject, text, html });
    if (kq.ok) {
      if (loi.length) console.warn(`✉️ Mail ${nhan} tới ${to} đi qua ${k} sau khi kênh trước lỗi:`, loi);
      return { ok: true, kenh: k, id: kq.id };
    }
    loi.push({ kenh: k, loi: kq.loi, ...(kq.chiTiet ? { chiTiet: kq.chiTiet } : {}) });
  }
  console.error(`Lỗi gửi email ${nhan}:`, { to, loi });
  return { ok: false, loi };
}

export const sendVerificationEmail = async (email, token) => {
  if (isEmailDryRun()) {
    console.log(`✉️  [DRY-RUN] Bỏ qua gửi mail "Xác thực tài khoản" tới ${email} (EMAIL_DRY_RUN=true).`);
    return true;
  }
  const baseUrl = getAppBaseUrl();
  const verifyLink = `${baseUrl}/api/auth/verify?token=${token}`;

  const payload = {
    subject: 'Xác nhận đăng ký tài khoản - ITaiwan',
    text: `Chào bạn,\n\nCảm ơn bạn đã đăng ký tài khoản trên hệ thống học tiếng Trung ITaiwan.\n\nVui lòng copy đường link sau dán vào trình duyệt để xác nhận địa chỉ email của bạn:\n${verifyLink}\n\nTrân trọng,\nĐội ngũ ITaiwan`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #027AB3; text-align: center;">Xác nhận tài khoản ITaiwan</h2>
        <p>Chào bạn,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản trên hệ thống học tiếng Trung <strong>ITaiwan</strong>.</p>
        <p>Vui lòng click vào nút bên dưới để xác nhận địa chỉ email của bạn và hoàn tất việc đăng ký:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" style="background-color: #027AB3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Xác nhận Email</a>
        </div>
        <p>Hoặc bạn có thể copy đường link sau dán vào trình duyệt:</p>
        <p style="word-break: break-all; color: #64748b; font-size: 14px;">${verifyLink}</p>
        <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
        <br/>
        <p>Trân trọng,<br/>Đội ngũ ITaiwan</p>
      </div>
    `,
  };

  // Chưa cấu hình kênh nào (máy dev): in link xác nhận thẳng ra console để tự test được luồng
  // đăng ký mà không cần key thật.
  const kq = await guiMail({ to: email, ...payload }, {
    loai: 'giao-dich',
    nhan: 'xác nhận',
    devLog: `✉️ [DEV] Chưa cấu hình kênh gửi mail — link xác nhận cho ${email}:\n${verifyLink}`,
  });
  // Lỗi hay gặp nhất khi chưa verify domain trên Resend: 403 "You can only send testing emails to
  // your own email address..." — guiMail đã log đủ status + body của từng kênh.
  if (kq.ok && kq.kenh !== 'dev') console.log(`✉️ Đã gửi email xác nhận thành công tới: ${email} qua ${kq.kenh} — id=${kq.id}`);
  return kq.ok;
};

// Gửi email chào mừng kèm thông tin đăng nhập — dùng khi admin tạo tài khoản học
// viên trực tiếp từ trang Quản lý lớp (không qua luồng tự đăng ký nên không cần
// xác nhận email — is_verified được set true ngay lúc tạo).
//
// LƯU Ý QUAN TRỌNG (giống sendVerificationEmail ở trên): khi RESEND_API_KEY chưa
// verify domain riêng, Resend CHỈ cho gửi tới đúng địa chỉ email đã dùng đăng ký
// tài khoản Resend — gửi tới email học viên thật sẽ bị Resend từ chối (403), dù
// tài khoản + mật khẩu vẫn được tạo bình thường trong DB. Hàm này trả về false
// khi gửi thất bại để route gọi nó biết mà báo rõ cho admin, không đoán mò.
export const sendWelcomeEmail = async (email, password, className) => {
  if (isEmailDryRun()) {
    console.log(`✉️  [DRY-RUN] Bỏ qua gửi mail "Chào mừng học viên mới" tới ${email} (EMAIL_DRY_RUN=true).`);
    return true;
  }
  const baseUrl = getAppBaseUrl();
  const loginLink = `${baseUrl}/`;

  const payload = {
    subject: `Tài khoản học tiếng Trung ITaiwan${className ? ` — Lớp ${className}` : ''}`,
    text: `Chào bạn,\n\nBạn đã được thêm vào lớp học "${className || ''}" trên hệ thống ITaiwan. Thông tin đăng nhập của bạn:\n\nEmail: ${email}\nMật khẩu: ${password}\n\nTruy cập tại: ${loginLink}\n\nBạn nên đổi mật khẩu sau khi đăng nhập lần đầu (mục Tài khoản > Thông tin cá nhân).\n\nTrân trọng,\nĐội ngũ ITaiwan`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #027AB3; text-align: center;">Chào mừng đến với ITaiwan${className ? ` — Lớp ${className}` : ''}</h2>
        <p>Chào bạn,</p>
        <p>Giáo viên đã thêm bạn vào lớp học <strong>${className || ''}</strong> trên hệ thống học tiếng Trung <strong>ITaiwan</strong>. Đây là thông tin đăng nhập của bạn:</p>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:4px 0"><strong>Email:</strong> ${email}</p>
          <p style="margin:4px 0"><strong>Mật khẩu:</strong> ${password}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${loginLink}" style="background-color: #027AB3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Đăng nhập ngay</a>
        </div>
        <p style="color:#64748b;font-size:13px">Bạn nên đổi mật khẩu sau khi đăng nhập lần đầu, ở mục <em>Tài khoản → Thông tin cá nhân</em>.</p>
        <br/>
        <p>Trân trọng,<br/>Đội ngũ ITaiwan</p>
      </div>
    `,
  };

  const kq = await guiMail({ to: email, ...payload }, {
    loai: 'giao-dich',
    nhan: 'chào mừng',
    devLog: `✉️ [DEV] Chưa cấu hình kênh gửi mail — tài khoản cho ${email}: mật khẩu "${password}"${className ? `, lớp ${className}` : ''}`,
  });
  if (kq.ok && kq.kenh !== 'dev') console.log(`✉️ Đã gửi email chào mừng thành công tới: ${email} qua ${kq.kenh} — id=${kq.id}`);
  return kq.ok;
};

// Nhắc học viên chưa nộp bài đến hạn. Dùng cùng cơ chế Resend như 2 hàm trên — xem ghi chú giới hạn
// domain chưa verify ở đầu file: chưa verify domain riêng thì Resend CHỈ gửi tới email đã đăng ký
// tài khoản Resend, các địa chỉ khác sẽ bị từ chối (403) dù code chạy đúng.
export const sendAssignmentReminderEmail = async (email, { studentName, className, lessonLabel, dueDate }) => {
  if (isEmailDryRun()) {
    console.log(`✉️  [DRY-RUN] Bỏ qua gửi mail "Nhắc nộp bài" tới ${email} (EMAIL_DRY_RUN=true).`);
    return true;
  }
  const baseUrl = getAppBaseUrl();

  const dueText = dueDate
    ? new Date(dueDate).toLocaleDateString('vi-VN')
    : null;

  const payload = {
    subject: `Nhắc nộp bài: ${lessonLabel}${dueText ? ` — hạn ${dueText}` : ''}`,
    text: `Chào ${studentName || 'bạn'},\n\nBạn chưa làm bài "${lessonLabel}" mà giáo viên đã giao cho lớp ${className || ''}.${dueText ? `\nHạn nộp: ${dueText}.` : ''}\n\nVào học tại: ${baseUrl}/\n\nTrân trọng,\nĐội ngũ ITaiwan`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #027AB3;">Nhắc nộp bài tập</h2>
        <p>Chào <strong>${studentName || 'bạn'}</strong>,</p>
        <p>Bạn chưa làm bài <strong>${lessonLabel}</strong> mà giáo viên đã giao cho lớp <strong>${className || ''}</strong>.</p>
        ${dueText ? `<p style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:10px 14px;color:#92400E"><strong>Hạn nộp: ${dueText}</strong></p>` : ''}
        <div style="text-align: center; margin: 28px 0;">
          <a href="${baseUrl}/" style="background-color: #027AB3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Vào làm bài</a>
        </div>
        <p style="color:#64748b;font-size:13px">Nếu bạn đã làm bài rồi thì bỏ qua email này nhé.</p>
        <br/>
        <p>Trân trọng,<br/>Đội ngũ ITaiwan</p>
      </div>
    `,
  };

  const kq = await guiMail({ to: email, ...payload }, {
    loai: 'hang-loat',
    nhan: 'nhắc nộp bài',
    devLog: `✉️ [DEV] Nhắc nộp bài cho ${email}: ${lessonLabel}${dueText ? ` (hạn ${dueText})` : ''}`,
  });
  return kq.ok;
};

/**
 * Email NHẮC HỌC hằng ngày (2026-09-16).
 *
 * Gửi cho học viên đang học dở mà hôm nay chưa vào app. Nội dung ghép từ 3 việc có thật trong
 * dữ liệu của chính họ — KHÔNG gửi mail chung chung kiểu "hãy học đi", thứ đó bị bỏ qua ngay
 * lần thứ hai và kéo theo cả mail xác thực tài khoản vào thư rác.
 *
 * @param {object} v
 * @param {string} v.hoTen
 * @param {number} v.soTuOn      số từ đến hạn ôn hôm nay
 * @param {Array}  v.baiGiao     [{ ten, han }] bài cô giao sắp/đã hết hạn
 * @param {number} v.chuoi       chuỗi ngày hiện tại (0 = không có chuỗi để mất)
 */
export const sendNhacHocEmail = async (email, v) => {
  if (isEmailDryRun()) {
    console.log(`✉️  [DRY-RUN] Bỏ qua mail nhắc học tới ${email} (EMAIL_DRY_RUN=true).`);
    return true;
  }
  const baseUrl = getAppBaseUrl();

  const y = [];
  if (v.chuoi > 0) y.push(`giữ chuỗi <strong>${v.chuoi} ngày</strong> đang có`);
  if (v.soTuOn > 0) y.push(`ôn <strong>${v.soTuOn} từ</strong> đến hạn`);
  if (v.baiGiao?.length) y.push(`làm <strong>${v.baiGiao.length} bài</strong> giáo viên giao`);
  const tomTat = y.join(' · ');

  // Tiêu đề đổi theo việc CẤP THIẾT NHẤT — mở hộp thư là biết ngay có gì, không phải mở mail.
  const tieuDe = v.baiGiao?.length
    ? `Bạn còn ${v.baiGiao.length} bài cô giao chưa nộp`
    : v.chuoi > 0
      ? `Chuỗi ${v.chuoi} ngày của bạn sắp đứt`
      : `${v.soTuOn} từ đang đợi bạn ôn hôm nay`;

  const dsBai = (v.baiGiao || []).slice(0, 3)
    .map((b) => `<li>${b.ten}${b.han ? ` — hạn ${new Date(b.han).toLocaleDateString('vi-VN')}` : ''}</li>`)
    .join('');

  const payload = {
    subject: tieuDe,
    text: `Chào ${v.hoTen || 'bạn'},\n\nHôm nay bạn có thể: ${tomTat.replace(/<[^>]+>/g, '')}.\n\n`
      + `Vào học: ${baseUrl}/lo-trinh/hom-nay\n\n`
      + `Không muốn nhận email nhắc học nữa? Tắt trong Tài khoản > Cài đặt: ${baseUrl}/tai-khoan/cai-dat\n`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e3e9ea; border-radius: 12px;">
        <h2 style="color: #38899E; margin: 0 0 4px;">${tieuDe}</h2>
        <p style="margin: 0 0 18px; color: #4B5D64;">Chào <strong>${v.hoTen || 'bạn'}</strong>, hôm nay bạn có thể ${tomTat}.</p>
        ${dsBai ? `<div style="background:#F6F8F8;border-radius:8px;padding:12px 16px;margin-bottom:18px">
          <div style="font-size:13px;font-weight:700;color:#4B5D64;margin-bottom:6px">BÀI GIÁO VIÊN GIAO</div>
          <ul style="margin:0;padding-left:18px;color:#1F2E33">${dsBai}</ul></div>` : ''}
        <a href="${baseUrl}/lo-trinh/hom-nay"
           style="display:inline-block;background:#38899E;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700">
          Học ngay hôm nay</a>
        <p style="margin:22px 0 0;font-size:12px;color:#8A9AA1">
          Không muốn nhận email này nữa?
          <a href="${baseUrl}/tai-khoan/cai-dat" style="color:#8A9AA1">Tắt nhắc học trong Cài đặt</a>.</p>
      </div>`,
  };

  const kq = await guiMail({ to: email, ...payload }, {
    loai: 'hang-loat',
    nhan: 'nhắc học',
    devLog: `✉️ [DEV] Nhắc học ${email}: ${tieuDe} (${tomTat})`,
  });
  return kq.ok;
};

/**
 * Mail nhắc HỒ SƠ DU HỌC (2026-09-16).
 *
 * Khác `sendNhacHocEmail` ở chỗ đây là việc CÓ HẠN CHÓT THẬT: lịch phỏng vấn, lịch bay, hạn
 * đăng ký ký túc xá, giấy tờ trung tâm đang đợi. Nên tiêu đề luôn nói rõ VIỆC GÌ + KHI NÀO chứ
 * không phải một lời động viên chung chung.
 *
 * `v`: { hoTen, maHs, viec: [{ nhan, chiTiet, ngay }] } — `viec` đã được cron xếp theo mức gấp.
 */
export const sendNhacDuHocEmail = async (email, v) => {
  if (isEmailDryRun()) {
    console.log(`✉️  [DRY-RUN] Bỏ qua mail nhắc du học tới ${email} (EMAIL_DRY_RUN=true).`);
    return true;
  }
  const baseUrl = getAppBaseUrl();
  const viec = (v.viec || []).slice(0, 5);
  if (!viec.length) return false;

  // Tiêu đề lấy theo việc GẤP NHẤT (phần tử đầu) — mở hộp thư là biết ngay, không phải mở mail.
  const tieuDe = viec[0].ngay
    ? `${viec[0].nhan} — ${new Date(viec[0].ngay).toLocaleDateString('vi-VN')}`
    : viec[0].nhan;

  const dong = viec.map((x) => `<li style="margin-bottom:6px"><strong>${x.nhan}</strong>`
    + `${x.ngay ? ` — ${new Date(x.ngay).toLocaleDateString('vi-VN')}` : ''}`
    + `${x.chiTiet ? `<br><span style="color:#4B5D64">${x.chiTiet}</span>` : ''}</li>`).join('');

  const payload = {
    subject: tieuDe,
    text: `Chào ${v.hoTen || 'bạn'},\n\nHồ sơ du học ${v.maHs || ''} của bạn có việc cần xử lý:\n`
      + viec.map((x) => `- ${x.nhan}${x.ngay ? ` (${new Date(x.ngay).toLocaleDateString('vi-VN')})` : ''}`
        + `${x.chiTiet ? `: ${x.chiTiet}` : ''}`).join('\n')
      + `\n\nXem hồ sơ: ${baseUrl}/tai-khoan/ho-so-du-hoc\n\n`
      + `Không muốn nhận email nhắc nữa? Tắt trong Tài khoản > Cài đặt: ${baseUrl}/tai-khoan/cai-dat\n`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e3e9ea; border-radius: 12px;">
        <h2 style="color: #38899E; margin: 0 0 4px;">${tieuDe}</h2>
        <p style="margin: 0 0 18px; color: #4B5D64;">Chào <strong>${v.hoTen || 'bạn'}</strong>, hồ sơ du học${v.maHs ? ` <strong>${v.maHs}</strong>` : ''} của bạn có việc cần xử lý:</p>
        <div style="background:#F6F8F8;border-radius:8px;padding:12px 16px;margin-bottom:18px">
          <ul style="margin:0;padding-left:18px;color:#1F2E33">${dong}</ul></div>
        <a href="${baseUrl}/tai-khoan/ho-so-du-hoc"
           style="display:inline-block;background:#38899E;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700">
          Xem hồ sơ du học</a>
        <p style="margin:22px 0 0;font-size:12px;color:#8A9AA1">
          Không muốn nhận email này nữa?
          <a href="${baseUrl}/tai-khoan/cai-dat" style="color:#8A9AA1">Tắt nhắc trong Cài đặt</a>.</p>
      </div>`,
  };

  const kq = await guiMail({ to: email, ...payload }, {
    loai: 'hang-loat',
    nhan: 'nhắc du học',
    devLog: `✉️ [DEV] Nhắc du học ${email}: ${tieuDe}`,
  });
  return kq.ok;
};
