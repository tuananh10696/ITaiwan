// =============================================================
// DU HỌC — CỔNG HỌC SINH: khai báo · khoá · duyệt sửa · thông báo · chứng từ (2026-09-16)
// =============================================================
//   TEST_PORT=3999 node tests/du-hoc-hocvien.test.mjs      (cần server + DB local)
//   npm run test:du-hoc-hs
//
// Đi theo đúng thứ tự một học sinh sẽ trải qua:
//   trung tâm mở hồ sơ + gắn tài khoản -> em tự khai -> gửi chốt (KHOÁ) -> xin sửa ->
//   trung tâm duyệt/từ chối -> trung tâm đặt lịch -> em nhận thông báo ở chuông
// rồi mới kiểm phân quyền và cách ly. Kiểm cách ly trước mà nghiệp vụ tắc thì vẫn "xanh" —
// đúng bài học của tests/trung-tam-thue.test.mjs (CLAUDE.md 4.46).
//
// TỰ TẠO rồi TỰ XOÁ dữ liệu của mình (mã tổ chức `hstest-*`); in số bản ghi còn sót — phải là 0.
// CHỈ chạy trên DB local.
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

if (!/^(localhost|127\.0\.0\.1)$/.test(String(process.env.DB_HOST || ''))) {
  console.error('❌ Chỉ chạy trên DB local. DB_HOST hiện tại:', process.env.DB_HOST);
  process.exit(1);
}

const db = await mysql.createConnection({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
});

const MA = 'hstest-' + Date.now().toString(36);
const buoc = [];

async function G(t, m, p, body) {
  const r = await fetch(B + p, {
    method: m,
    headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: 'Bearer ' + t } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  let j = null;
  try { j = await r.json(); } catch { /* body rỗng */ }
  return { s: r.status, j };
}
function ghi(ten, r, mong) {
  const dat = Array.isArray(mong) ? mong.includes(r.s) : r.s === mong;
  buoc.push({ ten, s: r.s, mong, dat, msg: r.j?.error || r.j?.message || '' });
  return r;
}
function kiem(ten, thuc, mong) {
  const dat = JSON.stringify(thuc) === JSON.stringify(mong);
  buoc.push({ ten, s: JSON.stringify(thuc), mong: JSON.stringify(mong), dat, msg: '' });
}

/** Ảnh JPEG 1×1 thật (không phải chuỗi bịa) — server chỉ xét tiền tố data:image/ và độ dài. */
const ANH = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsL'
  + 'DBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAA'
  + 'AAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==';

const [[ad]] = await db.query("SELECT id FROM users WHERE role = 'admin' AND org_id = 1 ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB local không có admin nền tảng nào.'); process.exit(1); }
const ADMIN = tok(ad.id);

let orgA, orgB, qtA, qtB, hsTok, hsId2, hoSoA, hoSoB, gvTok;
try {
  // ---------------------------------------------------------------- dựng 2 trung tâm
  let r = ghi('Mở trung tâm A', await G(ADMIN, 'POST', '/admin/to-chuc', {
    ma: MA + '-a', ten: 'TT HS A', quan_tri_email: `qta.${MA}@local.invalid`,
    quan_tri_ten: 'QT A', het_han: '2099-12-31',
  }), 201);
  orgA = r.j?.id; qtA = tok(r.j.quan_tri.id);

  r = ghi('Mở trung tâm B', await G(ADMIN, 'POST', '/admin/to-chuc', {
    ma: MA + '-b', ten: 'TT HS B', quan_tri_email: `qtb.${MA}@local.invalid`,
    quan_tri_ten: 'QT B', het_han: '2099-12-31',
  }), 201);
  orgB = r.j?.id; qtB = tok(r.j.quan_tri.id);

  ghi('A thêm giáo viên', await G(qtA, 'POST', '/admin/teachers',
    { email: `gv.${MA}@local.invalid`, name: 'Cô A' }), [200, 201]);
  const [[gv]] = await db.query('SELECT id FROM users WHERE email = ?', [`gv.${MA}@local.invalid`]);
  gvTok = tok(gv.id);

  // Hai tài khoản học viên của trung tâm A
  await db.query(
    `INSERT INTO users (name, email, password_hash, org_id, role, is_verified, is_approved)
     VALUES ('HS Một', ?, 'x', ?, 'student', 1, 1), ('HS Hai', ?, 'x', ?, 'student', 1, 1)`,
    [`hs1.${MA}@local.invalid`, orgA, `hs2.${MA}@local.invalid`, orgA]
  );
  const [[u1]] = await db.query('SELECT id FROM users WHERE email = ?', [`hs1.${MA}@local.invalid`]);
  const [[u2]] = await db.query('SELECT id FROM users WHERE email = ?', [`hs2.${MA}@local.invalid`]);
  hsTok = tok(u1.id); hsId2 = u2.id;

  // ---------------------------------------------------------------- 0. CHƯA CÓ HỒ SƠ
  r = ghi('Học viên chưa có hồ sơ vẫn gọi được (không 404)',
    await G(hsTok, 'GET', '/du-hoc/ho-so-cua-toi'), 200);
  kiem('...và trả cờ co=false để trang profile biết mà ẩn thẻ', r.j?.co, false);
  ghi('Chưa có hồ sơ thì không khai được',
    await G(hsTok, 'PUT', '/du-hoc/khai-bao', { ho_ten: 'X' }), 404);
  ghi('Khách chưa đăng nhập bị chặn', await G(null, 'GET', '/du-hoc/ho-so-cua-toi'), 401);

  // ---------------------------------------------------------------- 1. TRUNG TÂM MỞ HỒ SƠ
  r = ghi('A mở hồ sơ + gắn tài khoản học viên', await G(qtA, 'POST', '/admin/du-hoc/ho-so', {
    ho_ten: 'HS Một', user_id: u1.id, tong_phi: 30000000,
  }), 201);
  hoSoA = r.j?.id;

  r = ghi('Học viên thấy hồ sơ của mình', await G(hsTok, 'GET', '/du-hoc/ho-so-cua-toi'), 200);
  kiem('co = true', r.j?.co, true);
  kiem('chưa gửi khai báo', r.j?.da_gui, false);
  kiem('checklist giấy tờ hiện đủ 15 mục', r.j?.giay_to?.length, 15);
  kiem('tổng phí do trung tâm chốt', r.j?.tien?.tong_phi, 30000000);
  kiem('KHÔNG lộ ghi chú nội bộ của giấy tờ', 'ghi_chu' in (r.j?.giay_to?.[0] || {}), false);

  // ---------------------------------------------------------------- 2. HỌC SINH TỰ KHAI
  ghi('Lưu nháp thông tin cá nhân + nguyện vọng', await G(hsTok, 'PUT', '/du-hoc/khai-bao', {
    ngay_sinh: '2006-04-12', gioi_tinh: 'nam', phone: '0900000001',
    cccd: '001206000001', truong_nv1: 'ĐH Sư phạm Đài Loan', nganh: 'Hoa ngữ',
    ktx_dang_ky: 'co', ktx_loai: 'phòng 4 người',
  }), 200);

  const [[sauNhap]] = await db.query('SELECT gioi_tinh, ktx_dang_ky, tong_phi FROM du_hoc_ho_so WHERE id = ?', [hoSoA]);
  kiem('Nháp đã vào DB', sauNhap.gioi_tinh, 'nam');
  kiem('Nguyện vọng ký túc xá đã lưu', sauNhap.ktx_dang_ky, 'co');

  // Danh sách trắng: cột ngoài COT_HS phải bị BỎ QUA im lặng, không được ghi vào DB.
  ghi('Gửi kèm cột cấm (tong_phi, buoc) — request vẫn 200',
    await G(hsTok, 'PUT', '/du-hoc/khai-bao', { tong_phi: 1, buoc: 'bay', ghi_chu: 'hack' }), 200);
  const [[camSau]] = await db.query('SELECT tong_phi, buoc, ghi_chu FROM du_hoc_ho_so WHERE id = ?', [hoSoA]);
  kiem('...nhưng tong_phi KHÔNG đổi', Number(camSau.tong_phi), 30000000);
  kiem('...buoc KHÔNG đổi', camSau.buoc, 'ho-so');
  kiem('...ghi chú nội bộ KHÔNG bị ghi đè', camSau.ghi_chu, null);

  // ---------------------------------------------------------------- 3. GỬI CHỐT
  // Xoá một ô bắt buộc để kiểm đúng nhánh "thiếu" — lúc này hồ sơ đã đủ cả 4 ô nên gửi sẽ
  // thành công, và bài kiểm sẽ xanh vì lý do sai.
  ghi('Tạm xoá một ô bắt buộc', await G(hsTok, 'PUT', '/du-hoc/khai-bao', { truong_nv1: '' }), 200);
  r = ghi('Gửi khi còn thiếu ô bắt buộc bị chặn',
    await G(hsTok, 'POST', '/du-hoc/gui-khai-bao', {}), 400);
  kiem('...và nói rõ thiếu gì', Array.isArray(r.j?.thieu) && r.j.thieu.length > 0, true);

  ghi('Gửi kèm phần đang gõ dở → chốt thành công', await G(hsTok, 'POST', '/du-hoc/gui-khai-bao',
    { ho_ten: 'Nguyễn Văn Một', truong_nv1: 'ĐH Sư phạm Đài Loan' }), 200);
  const [[daGui]] = await db.query('SELECT hs_gui_luc, ho_ten FROM du_hoc_ho_so WHERE id = ?', [hoSoA]);
  kiem('Đã đóng dấu thời điểm gửi', !!daGui.hs_gui_luc, true);
  kiem('Phần gõ dở lúc bấm Gửi cũng được lưu', daGui.ho_ten, 'Nguyễn Văn Một');

  ghi('Gửi lần hai bị chặn', await G(hsTok, 'POST', '/du-hoc/gui-khai-bao', {}), 409);
  ghi('Đã gửi thì KHÔNG sửa trực tiếp được nữa',
    await G(hsTok, 'PUT', '/du-hoc/khai-bao', { phone: '0911111111' }), 409);
  const [[khoa]] = await db.query('SELECT phone FROM du_hoc_ho_so WHERE id = ?', [hoSoA]);
  kiem('...và số điện thoại giữ nguyên', khoa.phone, '0900000001');

  // ---------------------------------------------------------------- 4. XIN SỬA
  ghi('Gửi yêu cầu sửa không có thay đổi nào bị chặn',
    await G(hsTok, 'POST', '/du-hoc/yeu-cau-sua', { thay_doi: { phone: '0900000001' }, ly_do: 'x' }), 400);

  r = ghi('Gửi yêu cầu sửa số điện thoại', await G(hsTok, 'POST', '/du-hoc/yeu-cau-sua', {
    thay_doi: { phone: '0988888888' }, ly_do: 'Em vừa đổi số',
  }), 201);
  const ycId = r.j?.id;

  ghi('Đang chờ duyệt thì không gửi yêu cầu thứ hai',
    await G(hsTok, 'POST', '/du-hoc/yeu-cau-sua', { thay_doi: { cccd: '999' }, ly_do: 'y' }), 409);

  r = ghi('Trung tâm thấy yêu cầu trong hàng chờ',
    await G(qtA, 'GET', '/admin/du-hoc/yeu-cau-sua?trang_thai=cho'), 200);
  kiem('Đúng 1 yêu cầu chờ', r.j?.items?.length, 1);
  const t0 = r.j?.items?.[0]?.thay_doi?.[0];
  kiem('Hiện được CẶP cũ → mới để người duyệt so',
    t0 ? t0.cu + '→' + t0.moi : '(không có yêu cầu nào)', '0900000001→0988888888');

  ghi('Trung tâm B KHÔNG thấy yêu cầu của A',
    await G(qtB, 'GET', '/admin/du-hoc/yeu-cau-sua?trang_thai=cho'), 200);
  const rB = await G(qtB, 'GET', '/admin/du-hoc/yeu-cau-sua?trang_thai=cho');
  kiem('...danh sách của B rỗng', rB.j?.items?.length, 0);
  ghi('Trung tâm B không duyệt được yêu cầu của A',
    await G(qtB, 'POST', `/admin/du-hoc/yeu-cau-sua/${ycId}/duyet`, {}), 404);

  ghi('A duyệt yêu cầu', await G(qtA, 'POST', `/admin/du-hoc/yeu-cau-sua/${ycId}/duyet`, {}), 200);
  const [[apDung]] = await db.query('SELECT phone FROM du_hoc_ho_so WHERE id = ?', [hoSoA]);
  kiem('Duyệt xong hồ sơ MỚI đổi', apDung.phone, '0988888888');
  ghi('Duyệt lần hai bị chặn (chống duyệt trùng)',
    await G(qtA, 'POST', `/admin/du-hoc/yeu-cau-sua/${ycId}/duyet`, {}), 409);

  // từ chối
  r = ghi('Gửi yêu cầu sửa thứ hai', await G(hsTok, 'POST', '/du-hoc/yeu-cau-sua', {
    thay_doi: { cccd: '001206999999' }, ly_do: 'Em ghi nhầm',
  }), 201);
  ghi('Từ chối mà không ghi lý do bị chặn',
    await G(qtA, 'POST', `/admin/du-hoc/yeu-cau-sua/${r.j.id}/tu-choi`, {}), 400);
  ghi('Từ chối có lý do', await G(qtA, 'POST', `/admin/du-hoc/yeu-cau-sua/${r.j.id}/tu-choi`,
    { phan_hoi: 'Em mang CCCD tới trung tâm đối chiếu' }), 200);
  const [[tuChoi]] = await db.query('SELECT cccd FROM du_hoc_ho_so WHERE id = ?', [hoSoA]);
  kiem('Từ chối thì hồ sơ KHÔNG đổi', tuChoi.cccd, '001206000001');

  // ---------------------------------------------------------------- 5. THÔNG BÁO
  ghi('Trung tâm đặt lịch phỏng vấn', await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hoSoA}`, {
    ngay_phong_van: '2026-10-01',
  }), 200);
  ghi('Trung tâm chốt lịch bay', await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hoSoA}`, {
    ngay_bay: '2027-02-15', chuyen_bay: 'VN576',
  }), 200);
  ghi('Trung tâm chuyển bước', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hoSoA}/buoc`,
    { buoc: 'phong-van' }), 200);

  const [tb] = await db.query('SELECT loai FROM du_hoc_thong_bao WHERE ho_so_id = ? ORDER BY id', [hoSoA]);
  const loai = tb.map((x) => x.loai);
  kiem('Sinh thông báo phỏng vấn', loai.includes('phong-van'), true);
  kiem('Sinh thông báo lịch bay', loai.includes('bay'), true);
  kiem('Sinh thông báo chuyển bước', loai.includes('buoc'), true);
  kiem('Duyệt/từ chối yêu cầu sửa cũng báo cho học sinh',
    loai.includes('sua-duyet') && loai.includes('sua-tu-choi'), true);

  r = ghi('Thông báo du học vào CHUÔNG của học viên',
    await G(hsTok, 'GET', '/exercise/notifications'), 200);
  const cua = (r.j?.notifications || []).filter((n) => n.type === 'du-hoc');
  kiem('Chuông có thông báo du học', cua.length >= 4, true);
  kiem('Chuông mang sẵn tiêu đề (không phải mã thô)', !!cua[0]?.tieu_de, true);

  const tbId = cua[0].id;
  ghi('Đánh dấu đã đọc qua chuông',
    await G(hsTok, 'POST', `/exercise/notifications/du-hoc/${tbId}/read`), 200);
  const [[daDoc]] = await db.query('SELECT da_doc_luc FROM du_hoc_thong_bao WHERE id = ?', [tbId]);
  kiem('...đã ghi mốc đọc', !!daDoc.da_doc_luc, true);

  ghi('Học viên KHÁC không đánh dấu đọc hộ được',
    await G(tok(hsId2), 'POST', `/exercise/notifications/du-hoc/${cua[1].id}/read`), 200);
  const [[hoDoc]] = await db.query('SELECT da_doc_luc FROM du_hoc_thong_bao WHERE id = ?', [cua[1].id]);
  kiem('...và thông báo đó VẪN chưa đọc', hoDoc.da_doc_luc, null);

  // ---------------------------------------------------------------- 6. CHỨNG TỪ ẢNH
  r = ghi('Ghi khoản thu kèm ảnh chứng từ', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hoSoA}/thu-tien`, {
    so_tien: 10000000, ngay_thu: '2026-09-16', khoan: 'dat-coc', anh: ANH,
  }), 201);
  const [[kt]] = await db.query(
    'SELECT id, (anh IS NOT NULL) AS co FROM du_hoc_thu_tien WHERE ho_so_id = ? ORDER BY id DESC LIMIT 1', [hoSoA]);
  kiem('Ảnh đã lưu', !!kt.co, true);

  r = ghi('Xem lại ảnh chứng từ', await G(qtA, 'GET', `/admin/du-hoc/thu-tien/${kt.id}/anh`), 200);
  kiem('Trả đúng ảnh đã lưu', r.j?.anh === ANH, true);
  ghi('Trung tâm B không xem được chứng từ của A',
    await G(qtB, 'GET', `/admin/du-hoc/thu-tien/${kt.id}/anh`), 404);

  ghi('Ảnh không phải image/ bị chặn', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hoSoA}/thu-tien`, {
    so_tien: 1000, ngay_thu: '2026-09-16', anh: 'data:text/html,<script>',
  }), 400);
  ghi('Ảnh quá lớn bị chặn (413)', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hoSoA}/thu-tien`, {
    so_tien: 1000, ngay_thu: '2026-09-16', anh: 'data:image/jpeg;base64,' + 'A'.repeat(1_000_000),
  }), 413);

  r = ghi('Học viên xem được số tiền đã đóng', await G(hsTok, 'GET', '/du-hoc/ho-so-cua-toi'), 200);
  kiem('Đã đóng 10 triệu', r.j?.tien?.da_thu, 10000000);
  kiem('Còn lại 20 triệu', r.j?.tien?.con_lai, 20000000);
  kiem('Biết khoản nào có chứng từ', r.j?.tien?.khoan?.[0]?.co_anh, true);
  kiem('KHÔNG kéo cả ảnh base64 về danh sách', 'anh' in (r.j?.tien?.khoan?.[0] || {}), false);
  kiem('Thấy tên người tư vấn nếu đã gán', r.j?.tu_van === null, true);
  kiem('Thấy giai đoạn hiện tại', r.j?.tien_do?.buoc, 'phong-van');

  // ---------------------------------------------------------------- 7. CÁCH LY & PHÂN QUYỀN
  r = ghi('B mở hồ sơ riêng', await G(qtB, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'HS của B' }), 201);
  hoSoB = r.j?.id;
  ghi('A không xem được hồ sơ của B', await G(qtA, 'GET', `/admin/du-hoc/ho-so/${hoSoB}`), 404);
  ghi('B không gắn được tài khoản học viên của A',
    await G(qtB, 'PUT', `/admin/du-hoc/ho-so/${hoSoB}`, { user_id: hsId2 }), 400);

  ghi('Giáo viên KHÔNG vào được khu du học', await G(gvTok, 'GET', '/admin/du-hoc/ho-so'), 403);
  ghi('Giáo viên không duyệt được yêu cầu sửa',
    await G(gvTok, 'GET', '/admin/du-hoc/yeu-cau-sua'), 403);
  ghi('Học viên không vào được khu quản trị du học',
    await G(hsTok, 'GET', '/admin/du-hoc/ho-so'), 403);

  r = ghi('Học viên thứ hai (chưa có hồ sơ) không thấy gì',
    await G(tok(hsId2), 'GET', '/du-hoc/ho-so-cua-toi'), 200);
  kiem('...co = false', r.j?.co, false);

  // ---------------------------------------------------------------- 8. CRON NHẮC
  // Chỉ chạy khi server được bật kèm CRON_SECRET (xem hướng dẫn ở đầu file). Không có thì bỏ
  // qua chứ không báo đỏ — bộ test này không được phép đòi một biến môi trường tuỳ chọn.
  const BI_MAT = process.env.CRON_SECRET;
  if (!BI_MAT) {
    buoc.push({ ten: '⏭️  Bỏ qua phần cron (thiếu CRON_SECRET)', s: '-', mong: '-', dat: true, msg: '' });
  } else {
    // Email phải LỌT bộ lọc chống-gửi-nhầm của cron (@local.invalid / @demo.invalid / _test@ đều
    // bị loại có chủ ý), nên dùng một tên miền .invalid khác.
    await db.query(
      `INSERT INTO users (name, email, password_hash, org_id, role, is_verified, is_approved, nhan_mail_nhac)
       VALUES ('HS Cron', ?, 'x', ?, 'student', 1, 1, 1)`,
      [`cron.${MA}@kiemtra.invalid`, orgA]
    );
    const [[uc]] = await db.query('SELECT id FROM users WHERE email = ?', [`cron.${MA}@kiemtra.invalid`]);
    r = ghi('Mở hồ sơ cho học sinh "cron"', await G(qtA, 'POST', '/admin/du-hoc/ho-so', {
      ho_ten: 'HS Cron', user_id: uc.id, tong_phi: 50000000,
    }), 201);
    const hsCron = r.j?.id;

    // Lịch phỏng vấn NGÀY MAI + còn nợ tiền + thiếu giấy tờ + chưa khai => phải nhắc.
    const mai = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    await db.query('UPDATE du_hoc_ho_so SET ngay_phong_van = ?, buoc = ? WHERE id = ?', [mai, 'phong-van', hsCron]);

    const H = { Authorization: 'Bearer ' + BI_MAT };
    let cr = await fetch(`${B}/cron/nhac-du-hoc?thu=1`, { headers: H });
    let cj = await cr.json();
    buoc.push({ ten: 'Cron chạy thử trả 200', s: cr.status, mong: 200, dat: cr.status === 200, msg: '' });
    const mucCron = (cj.chi_tiet || []).find((x) => x.email === `cron.${MA}@kiemtra.invalid`);
    kiem('Cron tìm ra hồ sơ cần nhắc', !!mucCron, true);
    kiem('...nhắc đúng lịch phỏng vấn ngày mai',
      (mucCron?.viec || []).some((v) => /phỏng vấn/i.test(v)), true);
    kiem('...và nhắc cả việc chưa gửi khai báo',
      (mucCron?.viec || []).some((v) => /chưa gửi khai báo/i.test(v)), true);

    const [tbTruoc] = await db.query('SELECT id FROM du_hoc_thong_bao WHERE ho_so_id = ?', [hsCron]);
    kiem('Chạy THỬ thì KHÔNG ghi thông báo nào', tbTruoc.length, 0);

    cr = await fetch(`${B}/cron/nhac-du-hoc`, { headers: H });
    await cr.json();
    const [tbSau] = await db.query('SELECT loai FROM du_hoc_thong_bao WHERE ho_so_id = ?', [hsCron]);
    kiem('Chạy thật thì có ghi thông báo', tbSau.length > 0, true);

    // Chạy lại ngay: chốt chặn `daBaoGanDay` phải giữ cho nó KHÔNG nhắc lại.
    cr = await fetch(`${B}/cron/nhac-du-hoc`, { headers: H });
    await cr.json();
    const [tbLan2] = await db.query('SELECT loai FROM du_hoc_thong_bao WHERE ho_so_id = ?', [hsCron]);
    kiem('Chạy lại ngay KHÔNG nhắc trùng (chống spam)', tbLan2.length, tbSau.length);

    // Hồ sơ đã bay thì thôi nhắc.
    await db.query("UPDATE du_hoc_ho_so SET buoc = 'hoan-thanh' WHERE id = ?", [hsCron]);
    cr = await fetch(`${B}/cron/nhac-du-hoc?thu=1`, { headers: H });
    cj = await cr.json();
    kiem('Hồ sơ đã bay thì không nhắc nữa',
      (cj.chi_tiet || []).some((x) => x.email === `cron.${MA}@kiemtra.invalid`), false);

    cr = await fetch(`${B}/cron/nhac-du-hoc?thu=1`);   // không kèm bí mật
    buoc.push({ ten: 'Cron không có bí mật bị chặn', s: cr.status, mong: 401, dat: cr.status === 401, msg: '' });
  }
} catch (err) {
  // In được tới đâu hay tới đó — crash giữa chừng mà không in gì thì không biết bước nào hỏng.
  buoc.push({ ten: '💥 NỔ GIỮA CHỪNG', s: err.message, mong: '—', dat: false, msg: '' });
} finally {
  for (const o of [orgA, orgB]) {
    if (!o) continue;
    await db.query('DELETE FROM du_hoc_ho_so WHERE org_id = ?', [o]);
    const [hs] = await db.query('SELECT id FROM users WHERE org_id = ?', [o]);
    const ids = hs.map((x) => x.id);
    if (ids.length) {
      await db.query('DELETE FROM exercise_results WHERE user_id IN (?)', [ids]);
      await db.query('DELETE FROM class_enrollments WHERE user_id IN (?)', [ids]);
      await db.query('DELETE FROM entitlements WHERE user_id IN (?)', [ids]);
    }
    await db.query('DELETE FROM classes WHERE org_id = ?', [o]);
    await db.query('DELETE FROM entitlements WHERE org_id = ?', [o]);
    await db.query('DELETE FROM users WHERE org_id = ?', [o]);
    await db.query('DELETE FROM organizations WHERE id = ?', [o]);
  }
  await db.query('DELETE FROM users WHERE email LIKE ?', [`%${MA}%`]);
}

const [[{ sot }]] = await db.query(
  `SELECT (SELECT COUNT(*) FROM organizations WHERE ma LIKE ?)
        + (SELECT COUNT(*) FROM users WHERE email LIKE ?)
        + (SELECT COUNT(*) FROM du_hoc_thong_bao WHERE ho_so_id NOT IN (SELECT id FROM du_hoc_ho_so))
        + (SELECT COUNT(*) FROM du_hoc_yeu_cau_sua WHERE ho_so_id NOT IN (SELECT id FROM du_hoc_ho_so)) AS sot`,
  [`${MA}%`, `%${MA}%`]);
await db.end();

for (const b of buoc) {
  console.log(`${b.dat ? '✅' : '❌'} ${b.ten.padEnd(56)} ${String(b.s).padEnd(12)} (mong ${b.mong}) ${b.msg || ''}`);
}
const dat = buoc.filter((b) => b.dat).length;
console.log(`\n🧹 Dọn dẹp: còn sót ${sot} bản ghi (phải là 0)`);
console.log(`CỔNG HỌC SINH DU HỌC: ${dat}/${buoc.length} bước đạt`);
process.exit(dat === buoc.length && sot === 0 ? 0 : 1);
