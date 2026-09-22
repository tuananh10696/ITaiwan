// Gửi email qua Resend (transactional email API) thay vì SMTP Gmail.
//
// 2026-08-25: chuyển từ Gmail SMTP sang Resend sau khi xác nhận qua log Vercel
// thật là Gmail chặn đăng nhập SMTP theo rủi ro IP (534-5.7.9 WebLoginRequired) —
// lỗi này không "sửa" được vĩnh viễn khi vẫn gửi qua Gmail cá nhân từ IP cloud
// dùng chung của Vercel (IP đổi liên tục, Google luôn coi là đáng ngờ). Resend
// được xây riêng cho việc gửi mail từ server/serverless nên không gặp vấn đề này.
// Không cần thêm package `resend` — chỉ cần `fetch` (có sẵn trong Node 18+) gọi
// thẳng REST API, tránh phải thêm dependency mới + cập nhật package-lock.json.
const RESEND_API_URL = 'https://api.resend.com/emails';

// EMAIL_DRY_RUN=true  -> KHÔNG gửi mail thật, chỉ in ra console.
// Đặt cờ này ở .env của máy dev sau khi clone dữ liệu production về: DB local lúc đó chứa email
// THẬT của học viên, bấm nhầm nút "Nhắc nộp bài" hay "Thêm học viên" là mail bay tới các em thật
// (2026-08-27).
export const isEmailDryRun = () => String(process.env.EMAIL_DRY_RUN).toLowerCase() === 'true';

/** 'san-sang' | 'dry-run' | 'thieu-key' — dùng để báo đúng sự thật cho người bấm nút. */
export const emailStatus = () => (isEmailDryRun() ? 'dry-run' : (process.env.RESEND_API_KEY ? 'san-sang' : 'thieu-key'));

// Có gửi được mail thật hay không. Các hàm gửi bên dưới cố ý trả về true khi thiếu RESEND_API_KEY
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

export const sendVerificationEmail = async (email, token) => {
  if (isEmailDryRun()) {
    console.log(`✉️  [DRY-RUN] Bỏ qua gửi mail "Xác thực tài khoản" tới ${email} (EMAIL_DRY_RUN=true).`);
    return true;
  }
  const baseUrl = getAppBaseUrl();
  const verifyLink = `${baseUrl}/api/auth/verify?token=${token}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local dev chưa cấu hình RESEND_API_KEY: không gọi Resend, chỉ in link xác
    // nhận thẳng ra console để tự test được luồng đăng ký mà không cần key thật
    // (trước đây dùng Ethereal — dịch vụ SMTP giả lập cần gọi mạng để tạo tài
    // khoản test; in thẳng link ra console đơn giản hơn và không cần mạng).
    console.log(`✉️ [DEV] RESEND_API_KEY chưa được cấu hình — link xác nhận cho ${email}:\n${verifyLink}`);
    return true;
  }

  // RESEND_FROM_EMAIL: mặc định "onboarding@resend.dev" (domain test có sẵn của
  // Resend, dùng được ngay không cần cấu hình gì thêm) — NHƯNG Resend chỉ cho gửi
  // từ domain test này tới đúng địa chỉ email đã đăng ký tài khoản Resend, cho tới
  // khi verify 1 domain riêng (Resend Dashboard → Domains → thêm bản ghi DNS của
  // domain bạn sở hữu). Trước khi verify domain, người dùng thật (không phải bạn)
  // đăng ký sẽ KHÔNG nhận được mail dù log vẫn báo gửi thành công (Resend chặn
  // ngầm ở phía họ, trả lỗi rõ trong response nếu request bị từ chối). Set
  // RESEND_FROM_EMAIL sau khi verify domain, ví dụ "no-reply@taiwandiary.vn".
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME || 'Tẻn - Học Tiếng Trung';

  const payload = {
    from: `${fromName} <${fromAddress}>`,
    to: [email],
    subject: 'Xác nhận đăng ký tài khoản - Tẻn',
    text: `Chào bạn,\n\nCảm ơn bạn đã đăng ký tài khoản trên hệ thống học tiếng Trung Tẻn.\n\nVui lòng copy đường link sau dán vào trình duyệt để xác nhận địa chỉ email của bạn:\n${verifyLink}\n\nTrân trọng,\nĐội ngũ Tẻn`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #027AB3; text-align: center;">Xác nhận tài khoản Tẻn</h2>
        <p>Chào bạn,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản trên hệ thống học tiếng Trung <strong>Tẻn</strong>.</p>
        <p>Vui lòng click vào nút bên dưới để xác nhận địa chỉ email của bạn và hoàn tất việc đăng ký:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" style="background-color: #027AB3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Xác nhận Email</a>
        </div>
        <p>Hoặc bạn có thể copy đường link sau dán vào trình duyệt:</p>
        <p style="word-break: break-all; color: #64748b; font-size: 14px;">${verifyLink}</p>
        <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
        <br/>
        <p>Trân trọng,<br/>Đội ngũ Tẻn</p>
      </div>
    `,
  };

  // Timeout rõ ràng (giống lý do đã thêm cho SMTP trước đây): fail nhanh và có
  // kiểm soát thay vì có thể treo tới hết thời gian chạy của serverless function.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      // Lỗi hay gặp nhất khi chưa verify domain: Resend trả 403 với message dạng
      // "You can only send testing emails to your own email address..." — log rõ
      // status + toàn bộ body để không phải đoán khi đọc Vercel Logs.
      console.error('Lỗi gửi email xác nhận (Resend):', { to: email, status: res.status, body: data });
      return false;
    }

    console.log(`✉️ Đã gửi email xác nhận thành công tới: ${email} — id=${data?.id}`);
    return true;
  } catch (error) {
    console.error('Lỗi gửi email xác nhận (Resend):', {
      to: email,
      message: error?.message,
      name: error?.name,
    });
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`✉️ [DEV] RESEND_API_KEY chưa được cấu hình — tài khoản cho ${email}: mật khẩu "${password}"${className ? `, lớp ${className}` : ''}`);
    return true;
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME || 'Tẻn - Học Tiếng Trung';

  const payload = {
    from: `${fromName} <${fromAddress}>`,
    to: [email],
    subject: `Tài khoản học tiếng Trung Tẻn${className ? ` — Lớp ${className}` : ''}`,
    text: `Chào bạn,\n\nBạn đã được thêm vào lớp học "${className || ''}" trên hệ thống Tẻn. Thông tin đăng nhập của bạn:\n\nEmail: ${email}\nMật khẩu: ${password}\n\nTruy cập tại: ${loginLink}\n\nBạn nên đổi mật khẩu sau khi đăng nhập lần đầu (mục Tài khoản > Thông tin cá nhân).\n\nTrân trọng,\nĐội ngũ Tẻn`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #027AB3; text-align: center;">Chào mừng đến với Tẻn${className ? ` — Lớp ${className}` : ''}</h2>
        <p>Chào bạn,</p>
        <p>Giáo viên đã thêm bạn vào lớp học <strong>${className || ''}</strong> trên hệ thống học tiếng Trung <strong>Tẻn</strong>. Đây là thông tin đăng nhập của bạn:</p>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:4px 0"><strong>Email:</strong> ${email}</p>
          <p style="margin:4px 0"><strong>Mật khẩu:</strong> ${password}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${loginLink}" style="background-color: #027AB3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Đăng nhập ngay</a>
        </div>
        <p style="color:#64748b;font-size:13px">Bạn nên đổi mật khẩu sau khi đăng nhập lần đầu, ở mục <em>Tài khoản → Thông tin cá nhân</em>.</p>
        <br/>
        <p>Trân trọng,<br/>Đội ngũ Tẻn</p>
      </div>
    `,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error('Lỗi gửi email chào mừng (Resend):', { to: email, status: res.status, body: data });
      return false;
    }

    console.log(`✉️ Đã gửi email chào mừng thành công tới: ${email} — id=${data?.id}`);
    return true;
  } catch (error) {
    console.error('Lỗi gửi email chào mừng (Resend):', {
      to: email,
      message: error?.message,
      name: error?.name,
    });
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
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
  const apiKey = process.env.RESEND_API_KEY;

  const dueText = dueDate
    ? new Date(dueDate).toLocaleDateString('vi-VN')
    : null;

  if (!apiKey) {
    console.log(`✉️ [DEV] Nhắc nộp bài cho ${email}: ${lessonLabel}${dueText ? ` (hạn ${dueText})` : ''}`);
    return true;
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME || 'Tẻn - Học Tiếng Trung';

  const payload = {
    from: `${fromName} <${fromAddress}>`,
    to: [email],
    subject: `Nhắc nộp bài: ${lessonLabel}${dueText ? ` — hạn ${dueText}` : ''}`,
    text: `Chào ${studentName || 'bạn'},\n\nBạn chưa làm bài "${lessonLabel}" mà giáo viên đã giao cho lớp ${className || ''}.${dueText ? `\nHạn nộp: ${dueText}.` : ''}\n\nVào học tại: ${baseUrl}/\n\nTrân trọng,\nĐội ngũ Tẻn`,
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
        <p>Trân trọng,<br/>Đội ngũ Tẻn</p>
      </div>
    `,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error('Lỗi gửi email nhắc nộp bài (Resend):', { to: email, status: res.status, body: data });
      return false;
    }
    return true;
  } catch (error) {
    console.error('Lỗi gửi email nhắc nộp bài (Resend):', { to: email, message: error?.message, name: error?.name });
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
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
  const apiKey = process.env.RESEND_API_KEY;

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

  if (!apiKey) {
    console.log(`✉️ [DEV] Nhắc học ${email}: ${tieuDe} (${tomTat})`);
    return true;
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME || 'Tẻn - Học Tiếng Trung';
  const dsBai = (v.baiGiao || []).slice(0, 3)
    .map((b) => `<li>${b.ten}${b.han ? ` — hạn ${new Date(b.han).toLocaleDateString('vi-VN')}` : ''}</li>`)
    .join('');

  const payload = {
    from: `${fromName} <${fromAddress}>`,
    to: [email],
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

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Lỗi gửi mail nhắc học:', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('Lỗi gửi mail nhắc học:', err.message);
    return false;
  }
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
  const apiKey = process.env.RESEND_API_KEY;
  const viec = (v.viec || []).slice(0, 5);
  if (!viec.length) return false;

  // Tiêu đề lấy theo việc GẤP NHẤT (phần tử đầu) — mở hộp thư là biết ngay, không phải mở mail.
  const tieuDe = viec[0].ngay
    ? `${viec[0].nhan} — ${new Date(viec[0].ngay).toLocaleDateString('vi-VN')}`
    : viec[0].nhan;

  if (!apiKey) {
    console.log(`✉️ [DEV] Nhắc du học ${email}: ${tieuDe}`);
    return true;
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME || 'Tẻn - Học Tiếng Trung';
  const dong = viec.map((x) => `<li style="margin-bottom:6px"><strong>${x.nhan}</strong>`
    + `${x.ngay ? ` — ${new Date(x.ngay).toLocaleDateString('vi-VN')}` : ''}`
    + `${x.chiTiet ? `<br><span style="color:#4B5D64">${x.chiTiet}</span>` : ''}</li>`).join('');

  const payload = {
    from: `${fromName} <${fromAddress}>`,
    to: [email],
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

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Lỗi gửi mail nhắc du học:', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('Lỗi gửi mail nhắc du học:', err.message);
    return false;
  }
};
