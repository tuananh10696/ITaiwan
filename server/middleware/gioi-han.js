// =============================================================
// GIỚI HẠN TẦN SUẤT (rate limit) — 2026-09-15
//
// Trước đợt này hệ thống KHÔNG có lớp nào giới hạn số lời gọi, nên ba việc sau đều làm được bằng
// một vòng lặp bash:
//   • dò mật khẩu: /auth/login không đếm số lần sai, bcrypt cost 10 vẫn cho ~10 lần thử/giây;
//   • cào nội dung: 3 bài mở × 17 quyển × 3 loại tài nguyên là hơn 150 file, lấy hết trong vài
//     giây; một tài khoản đã mua một quyển thì lấy trọn quyển đó cũng nhanh như vậy;
//   • spam: đăng ký hàng loạt, gửi lại mail xác nhận liên tục (mỗi lần là một email thật đi ra,
//     đốt hạn mức Resend và làm hỏng uy tín tên miền gửi).
//
// ⚠️ GIỚI HẠN CỦA CÁCH LÀM NÀY TRÊN VERCEL — đọc trước khi tin vào nó:
// Bộ đếm nằm trong BỘ NHỚ của tiến trình. Vercel chạy serverless, mỗi instance có bộ nhớ riêng và
// instance bị thu hồi khi nguội, nên người gọi bị chia ra nhiều instance sẽ được cộng dồn hạn mức
// theo số instance. Nó CHẶN ĐƯỢC kẻ cào bằng script thông thường (đa số request rơi vào cùng một
// instance đang nóng), nhưng KHÔNG phải lớp phòng thủ tuyệt đối trước tấn công có chủ đích, phân
// tán. Muốn chắc thì cần một kho đếm dùng chung (Upstash Redis / Vercel KV) hoặc bật Vercel WAF —
// khi nào có, chỉ cần thay phần thân `dem()` bên dưới, mọi nơi gọi giữ nguyên.
//
// Không dùng `express-rate-limit`: thêm một phụ thuộc cho khoảng 60 dòng, mà vẫn phải tự viết
// phần lấy IP cho đúng với Vercel.

/**
 * IP của người gọi.
 * Trên Vercel, `req.ip` là IP của lớp proxy nội bộ — vô dụng để phân biệt người dùng. IP thật nằm
 * ở `x-forwarded-for`, và PHẢI lấy phần tử ĐẦU TIÊN: client tự gửi được header này, nhưng proxy
 * của Vercel nối IP thật của nó vào đầu chuỗi, nên phần tử đầu là phần tử không giả được.
 */
function layIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff) return xff.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.ip || req.socket?.remoteAddress || 'khong-ro';
}

/**
 * Van tắt cho BỘ KIỂM THỬ.
 *
 * `tests/api-test.js` đăng nhập sai có chủ ý, đổi mật khẩu rồi đăng nhập lại, tạo hàng loạt tài
 * khoản — đúng những hành vi mà lớp này sinh ra để chặn. Không có van thì bộ test tụt từ 124/124
 * xuống 63/122 và mọi lần chạy sau đều đỏ vì lý do sai, tức là ta mất luôn cái lưới bắt regression.
 *
 * ⚠️ Cờ này KHÔNG có tác dụng khi NODE_ENV=production — để một biến môi trường đặt nhầm trên
 * production không âm thầm gỡ bỏ toàn bộ chống dò mật khẩu. Ở đó nó chỉ in cảnh báo rồi bị bỏ qua.
 */
const YEU_CAU_TAT = String(process.env.TAT_GIOI_HAN || '').toLowerCase() === 'true';
const LA_PRODUCTION = process.env.NODE_ENV === 'production';
const DA_TAT = YEU_CAU_TAT && !LA_PRODUCTION;
if (YEU_CAU_TAT && LA_PRODUCTION) {
  console.warn('⚠️  TAT_GIOI_HAN=true bị BỎ QUA vì NODE_ENV=production — giới hạn tần suất vẫn bật.');
} else if (DA_TAT) {
  console.warn('⚠️  Giới hạn tần suất đang TẮT (TAT_GIOI_HAN=true). Chỉ dùng khi chạy bộ kiểm thử.');
}

const kho = new Map();

// Dọn định kỳ để Map không phình vô hạn trên tiến trình chạy dài (VPS). `unref()` để bộ hẹn giờ
// này không giữ event loop sống — thiếu nó thì `node scripts/...` nào lỡ import file này sẽ treo.
const DON_MOI = 5 * 60_000;
setInterval(() => {
  const gio = Date.now();
  for (const [k, v] of kho) if (v.het <= gio) kho.delete(k);
}, DON_MOI).unref?.();

function dem(khoa, cuaSoMs, tran) {
  const gio = Date.now();
  const cu = kho.get(khoa);
  if (!cu || cu.het <= gio) {
    kho.set(khoa, { so: 1, het: gio + cuaSoMs });
    return { vuot: false, con: tran - 1, doiGiay: 0 };
  }
  cu.so++;
  const vuot = cu.so > tran;
  return { vuot, con: Math.max(0, tran - cu.so), doiGiay: Math.ceil((cu.het - gio) / 1000) };
}

/**
 * Dựng một middleware giới hạn.
 * @param {object} o
 * @param {string} o.ten      tên nhóm — hạn mức tính riêng cho từng nhóm
 * @param {number} o.tran     số lời gọi tối đa trong cửa sổ
 * @param {number} o.phut     độ dài cửa sổ, tính bằng phút
 * @param {string} [o.loi]    thông báo trả về khi vượt
 * @param {boolean} [o.theoNguoiDung]  đếm theo tài khoản khi đã đăng nhập (đặt SAU requireAuth)
 * @param {(req:any)=>boolean} [o.boQua]  trả true thì không tính lần gọi này
 */
export function gioiHan({ ten, tran, phut, loi, theoNguoiDung = false, boQua = null }) {
  const cuaSo = phut * 60_000;
  return function chan(req, res, next) {
    if (DA_TAT) return next();
    if (boQua && boQua(req)) return next();
    // Đã đăng nhập thì đếm theo TÀI KHOẢN: nhiều học viên học chung một mạng lớp học sẽ ra cùng
    // một IP, đếm theo IP là cả lớp dùng chung hạn mức của một người.
    const ai = theoNguoiDung && req.userId ? `u${req.userId}` : `ip${layIp(req)}`;
    const r = dem(`${ten}:${ai}`, cuaSo, tran);

    res.set('X-RateLimit-Limit', String(tran));
    res.set('X-RateLimit-Remaining', String(r.con));

    if (!r.vuot) return next();
    res.set('Retry-After', String(r.doiGiay));
    return res.status(429).json({
      error: loi || `Bạn thao tác quá nhanh. Vui lòng thử lại sau ${r.doiGiay} giây.`,
      thu_lai_sau: r.doiGiay,
    });
  };
}

// ------------------------------------------------------------------ các mức dùng sẵn
//
// Con số chọn theo hành vi THẬT của người dùng, không chọn cho tròn:

/** Đăng nhập: người quên mật khẩu thử 3-4 lần là cùng; 10 lần/15 phút vẫn thoải mái cho họ. */
export const chanDangNhap = gioiHan({
  ten: 'dang-nhap', tran: 10, phut: 15,
  loi: 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng đợi ít phút rồi thử lại.',
});

/** Đăng ký / gửi lại mail xác nhận: mỗi lần là một email thật đi ra. */
export const chanDangKy = gioiHan({
  ten: 'dang-ky', tran: 5, phut: 60,
  loi: 'Bạn đã tạo quá nhiều tài khoản từ thiết bị này. Vui lòng thử lại sau.',
});

export const chanGuiMail = gioiHan({
  ten: 'gui-mail', tran: 5, phut: 60,
  loi: 'Bạn đã yêu cầu gửi lại email quá nhiều lần. Vui lòng kiểm tra hộp thư (kể cả mục Spam) rồi thử lại sau.',
});

/**
 * Tải nội dung bài học.
 *
 * 240 lần/10 phút nghe rất rộng, và đúng là phải rộng: mở MỘT bài đã gọi 3-4 tài nguyên (giáo
 * trình, luyện tập, dịch, đề), đổi tab và chuyển bài liên tục là chuyện bình thường của người học
 * thật, chưa kể prefetch bài trước/sau. Mức này không cản người học, nhưng cắt đứt vòng lặp cào
 * hàng nghìn file — vốn là thứ ta thật sự cần chặn.
 *
 * Nhân sự (giáo viên, quản trị) được bỏ qua: họ mở nhiều bài để soạn giáo án, và họ vốn đã xem
 * được tất cả nên chặn cũng không bảo vệ thêm được gì.
 */
export const chanTaiNoiDung = gioiHan({
  ten: 'noi-dung', tran: 240, phut: 10, theoNguoiDung: true,
  loi: 'Bạn đang tải nội dung quá nhanh. Vui lòng chờ một lát rồi tiếp tục.',
});

/** Tra cứu / tìm kiếm: rẻ hơn nhưng vẫn là cửa để cào kho từ điển 122.596 mục. */
export const chanTraCuu = gioiHan({
  ten: 'tra-cuu', tran: 300, phut: 10, theoNguoiDung: true,
  loi: 'Bạn tra cứu quá nhanh. Vui lòng chờ một lát rồi tiếp tục.',
});

/** Đăng bài / bình luận khu Cộng đồng — lớp chặn spam thứ hai, sau bộ lọc từ ngữ. */
export const chanDangBai = gioiHan({
  ten: 'dang-bai', tran: 20, phut: 60, theoNguoiDung: true,
  loi: 'Bạn đăng quá nhiều trong một giờ. Vui lòng chờ rồi thử lại.',
});
