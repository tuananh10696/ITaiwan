// =============================================================
// HỒ SƠ DU HỌC — vòng đời một học sinh + cách ly giữa hai trung tâm (2026-09-15)
// =============================================================
//   TEST_PORT=3999 node tests/du-hoc.test.mjs      (cần server + DB local)
//   npm run test:du-hoc
//
// Đi hết luồng nghiệp vụ theo đúng thứ tự trung tâm sẽ làm:
//   Nhận hồ sơ -> Đóng tiền (nhiều đợt + hoàn) -> Học -> Phỏng vấn -> Visa -> Chốt lịch bay
// rồi mới kiểm cách ly. Làm ngược lại thì "cách ly đúng 100%" mà nghiệp vụ tắc ngay bước đầu vẫn
// không ai biết — đúng bài học của tests/trung-tam-thue.test.mjs (CLAUDE.md 4.46).
//
// TỰ TẠO rồi TỰ XOÁ dữ liệu của mình (mã tổ chức `dhtest-*`); in số bản ghi còn sót — phải là 0.
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

const MA = 'dhtest-' + Date.now().toString(36);
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
  buoc.push({ ten, s: JSON.stringify(thuc), mong: JSON.stringify(mong), dat: JSON.stringify(thuc) === JSON.stringify(mong), msg: '' });
}

const [[ad]] = await db.query("SELECT id FROM users WHERE role = 'admin' AND org_id = 1 ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB local không có admin nền tảng nào.'); process.exit(1); }
const ADMIN = tok(ad.id);

let orgA, orgB, qtA, qtB, gvTok, gvId, hsId, hsIdB;
try {
  // ---------------------------------------------------------------- dựng 2 trung tâm
  let r = ghi('Mở trung tâm A', await G(ADMIN, 'POST', '/admin/to-chuc', {
    ma: MA + '-a', ten: 'TT Du học A', quan_tri_email: `qta.${MA}@local.invalid`, quan_tri_ten: 'QT A',
    het_han: '2099-12-31',
  }), 201);
  orgA = r.j?.id; qtA = tok(r.j.quan_tri.id);

  r = ghi('Mở trung tâm B', await G(ADMIN, 'POST', '/admin/to-chuc', {
    ma: MA + '-b', ten: 'TT Du học B', quan_tri_email: `qtb.${MA}@local.invalid`, quan_tri_ten: 'QT B',
    het_han: '2099-12-31',
  }), 201);
  orgB = r.j?.id; qtB = tok(r.j.quan_tri.id);

  ghi('A thêm giáo viên', await G(qtA, 'POST', '/admin/teachers',
    { email: `gv.${MA}@local.invalid`, name: 'Cô Du Học' }), [200, 201]);
  const [[gv]] = await db.query('SELECT id FROM users WHERE email = ?', [`gv.${MA}@local.invalid`]);
  gvId = gv?.id; gvTok = tok(gvId);

  // ---------------------------------------------------------------- 1. NHẬN HỒ SƠ
  r = ghi('A tạo hồ sơ (không cần tài khoản học)', await G(qtA, 'POST', '/admin/du-hoc/ho-so', {
    ho_ten: 'Nguyễn Văn Thử', ngay_sinh: '2006-04-12', gioi_tinh: 'nam',
    phone: '0900000001', cccd: '001206000001', ho_chieu: 'C1234567',
    ho_chieu_het_han: '2031-05-20', truong_tn: 'THPT Thử', nam_tn: '2024',
    truong_nv1: 'Đại học Sư phạm Đài Loan', nganh: 'Hoa ngữ', ky_nhap_hoc: '2027 Xuân',
    loai_hinh: 'hoa-ngu', tong_phi: 45000000, ngay_nhan: '2026-09-15',
  }), 201);
  hsId = r.j?.id;
  kiem('Mã hồ sơ tự sinh dạng HS-0001', /^HS-\d{4}$/.test(r.j?.ma_hs || ''), true);

  r = ghi('Chi tiết hồ sơ', await G(qtA, 'GET', `/admin/du-hoc/ho-so/${hsId}`), 200);
  kiem('Checklist giấy tờ tạo sẵn 15 mục', r.j?.giay_to?.length, 15);
  kiem('Bước khởi đầu là "ho-so"', r.j?.ho_so?.buoc, 'ho-so');
  kiem('Chưa thu đồng nào', r.j?.tien?.da_thu, 0);
  kiem('Còn thiếu = tổng phí', r.j?.tien?.con_thieu, 45000000);

  ghi('Tạo hồ sơ không có họ tên bị chặn',
    await G(qtA, 'POST', '/admin/du-hoc/ho-so', { phone: '0900' }), 400);

  // Giấy tờ
  const gt1 = r.j.giay_to[0].id;
  ghi('Tick đã nhận một giấy tờ', await G(qtA, 'PUT', `/admin/du-hoc/giay-to/${gt1}`, { trang_thai: 'nhan' }), 200);
  const [[gtSau]] = await db.query('SELECT trang_thai, ngay_nhan FROM du_hoc_giay_to WHERE id = ?', [gt1]);
  kiem('Tick "đã nhận" thì tự điền ngày nhận', !!gtSau.ngay_nhan, true);
  ghi('Gỡ về "chưa"', await G(qtA, 'PUT', `/admin/du-hoc/giay-to/${gt1}`, { trang_thai: 'chua' }), 200);
  const [[gtVe]] = await db.query('SELECT ngay_nhan FROM du_hoc_giay_to WHERE id = ?', [gt1]);
  kiem('Gỡ về "chưa" thì xoá luôn ngày nhận', gtVe.ngay_nhan, null);
  ghi('Trạng thái giấy tờ lạ bị chặn',
    await G(qtA, 'PUT', `/admin/du-hoc/giay-to/${gt1}`, { trang_thai: 'xoa-het' }), 400);
  ghi('Thêm giấy tờ riêng', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/giay-to`,
    { ten: 'Giấy xác nhận hạnh kiểm', bat_buoc: false }), 201);

  // ---------------------------------------------------------------- 2. ĐÓNG TIỀN
  ghi('Chuyển bước sang Đóng tiền',
    await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'dong-tien' }), 200);
  ghi('Bước không hợp lệ bị chặn',
    await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'bay-thang' }), 400);

  ghi('Thu đợt 1 (đặt cọc)', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/thu-tien`, {
    so_tien: 10000000, ngay_thu: '2026-09-15', khoan: 'dat-coc', hinh_thuc: 'chuyen-khoan', chung_tu: 'BL001',
  }), 201);
  ghi('Thu đợt 2 (phí hồ sơ)', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/thu-tien`, {
    so_tien: 20000000, ngay_thu: '2026-09-16', khoan: 'phi-ho-so', hinh_thuc: 'tien-mat',
  }), 201);
  ghi('Ghi khoản HOÀN', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/thu-tien`, {
    so_tien: 2000000, ngay_thu: '2026-09-17', loai: 'hoan', khoan: 'khac', ghi_chu: 'Hoàn phí dịch thuật thừa',
  }), 201);
  ghi('Số tiền <= 0 bị chặn', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/thu-tien`,
    { so_tien: 0, ngay_thu: '2026-09-15' }), 400);
  ghi('Ngày thu sai định dạng bị chặn', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/thu-tien`,
    { so_tien: 500000, ngay_thu: '15/09/2026' }), 400);

  r = await G(qtA, 'GET', `/admin/du-hoc/ho-so/${hsId}`);
  kiem('Đã thu = 10tr + 20tr - 2tr hoàn', r.j?.tien?.da_thu, 28000000);
  kiem('Còn thiếu = 45tr - 28tr', r.j?.tien?.con_thieu, 17000000);
  kiem('Sổ thu có 3 dòng', r.j?.thu_tien?.length, 3);

  const idHoan = r.j.thu_tien.find((t) => t.loai === 'hoan').id;
  ghi('Xoá khoản hoàn', await G(qtA, 'DELETE', `/admin/du-hoc/thu-tien/${idHoan}`), 200);
  r = await G(qtA, 'GET', `/admin/du-hoc/ho-so/${hsId}`);
  kiem('Xoá khoản hoàn thì đã thu về 30tr', r.j?.tien?.da_thu, 30000000);

  // ---------------------------------------------------------------- 3. HỌC (gắn tài khoản)
  const [hv] = await db.query(
    "INSERT INTO users (name, email, password_hash, role, org_id, is_verified, is_approved) VALUES (?, ?, 'x', 'student', ?, 1, 1)",
    [`HV ${MA}`, `hv.${MA}@local.invalid`, orgA]);
  ghi('Tìm học viên để gắn vào hồ sơ',
    await G(qtA, 'GET', `/admin/du-hoc/hoc-vien?tim=${encodeURIComponent('HV ' + MA)}`), 200);
  ghi('Gắn tài khoản học vào hồ sơ',
    await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hsId}`, { user_id: hv.insertId }), 200);
  ghi('Chuyển bước sang Học',
    await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'hoc' }), 200);
  r = await G(qtA, 'GET', `/admin/du-hoc/ho-so/${hsId}`);
  kiem('Hồ sơ kèm được tình hình học tập', !!r.j?.hoc_tap?.user, true);

  // ---------------------------------------------------------------- 4-6. PHỎNG VẤN → VISA → BAY
  const sau7 = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
  const sau20 = new Date(Date.now() + 20 * 864e5).toISOString().slice(0, 10);
  ghi('Đặt lịch phỏng vấn (chưa tick kết quả)', await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hsId}`,
    { ngay_phong_van: sau7 }), 200);
  r = await G(qtA, 'GET', '/admin/du-hoc/tong-quan');
  kiem('Lịch phỏng vấn CHƯA có kết quả vẫn được nhắc', r.j?.viec?.phong_van?.length, 1);
  ghi('Chuyển bước Phỏng vấn', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'phong-van' }), 200);
  ghi('Ghi kết quả phỏng vấn: đậu', await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hsId}`,
    { kq_phong_van: 'dau', truong_do: 'Đại học Sư phạm Đài Loan' }), 200);
  r = await G(qtA, 'GET', '/admin/du-hoc/tong-quan');
  kiem('Phỏng vấn xong thì thôi nhắc', r.j?.viec?.phong_van?.length, 0);

  ghi('Chuyển bước Xin visa', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'visa' }), 200);
  ghi('Nộp visa', await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hsId}`,
    { ngay_nop_visa: '2026-09-20', kq_visa: 'dau' }), 200);

  ghi('Chốt lịch bay', await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hsId}`,
    { ngay_bay: sau20, chuyen_bay: 'VN576 HAN-TPE 09:15' }), 200);
  ghi('Chuyển bước Chốt lịch bay', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'bay' }), 200);

  // Bước LÙI phải được — trượt visa thì quay lại làm hồ sơ.
  ghi('Chuyển bước LÙI được (trượt visa làm lại)',
    await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'visa', ly_do: 'Trượt vòng 1, nộp lại' }), 200);
  ghi('Quay lại bước bay', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'bay' }), 200);

  ghi('Ghi nhật ký chăm sóc', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/ghi-chu`,
    { noi_dung: 'Đã gọi nhắc em mang hộ chiếu lên trung tâm.' }), 201);
  ghi('Nhật ký rỗng bị chặn', await G(qtA, 'POST', `/admin/du-hoc/ho-so/${hsId}/ghi-chu`, { noi_dung: '  ' }), 400);

  r = await G(qtA, 'GET', `/admin/du-hoc/ho-so/${hsId}`);
  const ls = r.j?.lich_su || [];
  kiem('Lịch sử ghi đủ các lần chuyển bước', ls.filter((x) => x.loai === 'buoc').length, 7);
  kiem('Lịch sử có dòng tiền', ls.some((x) => x.loai === 'tien'), true);

  // ---------------------------------------------------------------- TỔNG QUAN
  r = ghi('Tổng quan', await G(qtA, 'GET', '/admin/du-hoc/tong-quan'), 200);
  kiem('Tổng quan: đang xử lý 1 hồ sơ', r.j?.dang_chay, 1);
  kiem('Tổng quan: đã thu 30tr', r.j?.tien?.da_thu, 30000000);
  kiem('Tổng quan: còn thiếu 15tr', r.j?.tien?.con_thieu, 15000000);
  kiem('Việc cần làm: sắp bay', r.j?.viec?.sap_bay?.length, 1);
  kiem('Việc cần làm: công nợ', r.j?.viec?.cong_no?.length, 1);

  // Danh sách + lọc
  ghi('Danh sách hồ sơ', await G(qtA, 'GET', '/admin/du-hoc/ho-so'), 200);
  r = await G(qtA, 'GET', '/admin/du-hoc/ho-so?buoc=bay');
  kiem('Lọc theo bước', r.j?.ho_so?.length, 1);
  r = await G(qtA, 'GET', '/admin/du-hoc/ho-so?buoc=ho-so');
  kiem('Lọc bước khác thì rỗng', r.j?.ho_so?.length, 0);
  r = await G(qtA, 'GET', '/admin/du-hoc/ho-so?tim=' + encodeURIComponent('Nguyễn Văn Thử'));
  kiem('Tìm theo tên', r.j?.ho_so?.length, 1);
  kiem('Danh sách tính sẵn số đã thu', Number(r.j?.ho_so?.[0]?.da_thu), 30000000);

  // ---------------------------------------------------------------- CÁCH LY + PHÂN QUYỀN
  r = ghi('B tạo hồ sơ của mình', await G(qtB, 'POST', '/admin/du-hoc/ho-so',
    { ho_ten: 'Trần Thị B', phone: '0900000002', tong_phi: 30000000 }), 201);
  hsIdB = r.j?.id;

  r = await G(qtB, 'GET', '/admin/du-hoc/ho-so');
  kiem('B chỉ thấy hồ sơ của B', r.j?.ho_so?.length, 1);
  kiem('B không thấy tên học sinh của A', JSON.stringify(r.j).includes('Nguyễn Văn Thử'), false);

  ghi('B KHÔNG xem được hồ sơ của A', await G(qtB, 'GET', `/admin/du-hoc/ho-so/${hsId}`), 404);
  ghi('B KHÔNG sửa được hồ sơ của A', await G(qtB, 'PUT', `/admin/du-hoc/ho-so/${hsId}`, { ho_ten: 'Bị đổi' }), 404);
  ghi('B KHÔNG chuyển bước hồ sơ của A',
    await G(qtB, 'POST', `/admin/du-hoc/ho-so/${hsId}/buoc`, { buoc: 'huy' }), 404);
  ghi('B KHÔNG ghi tiền vào hồ sơ của A',
    await G(qtB, 'POST', `/admin/du-hoc/ho-so/${hsId}/thu-tien`, { so_tien: 1, ngay_thu: '2026-09-15' }), 404);
  ghi('B KHÔNG xoá được hồ sơ của A', await G(qtB, 'DELETE', `/admin/du-hoc/ho-so/${hsId}`), 404);

  const [[gtA]] = await db.query('SELECT id FROM du_hoc_giay_to WHERE ho_so_id = ? LIMIT 1', [hsId]);
  ghi('B KHÔNG sửa được giấy tờ của A',
    await G(qtB, 'PUT', `/admin/du-hoc/giay-to/${gtA.id}`, { trang_thai: 'nop' }), 404);
  const [[ttA]] = await db.query('SELECT id FROM du_hoc_thu_tien WHERE ho_so_id = ? LIMIT 1', [hsId]);
  ghi('B KHÔNG xoá được khoản thu của A',
    await G(qtB, 'DELETE', `/admin/du-hoc/thu-tien/${ttA.id}`), 404);

  // Giáo viên: hồ sơ có CCCD, hộ chiếu, tiền -> cố ý KHÔNG cho vào.
  ghi('Giáo viên KHÔNG xem được danh sách hồ sơ', await G(gvTok, 'GET', '/admin/du-hoc/ho-so'), 403);
  ghi('Giáo viên KHÔNG xem được tổng quan', await G(gvTok, 'GET', '/admin/du-hoc/tong-quan'), 403);
  ghi('Giáo viên KHÔNG tạo được hồ sơ',
    await G(gvTok, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'X' }), 403);
  ghi('Học viên KHÔNG vào được khu này', await G(tok(hv.insertId), 'GET', '/admin/du-hoc/ho-so'), 403);
  ghi('Khách KHÔNG vào được khu này', await G(null, 'GET', '/admin/du-hoc/ho-so'), 401);

  // Gắn tài khoản học viên của tổ chức KHÁC vào hồ sơ mình -> phải chặn, nếu không B đọc được
  // kết quả học tập của học viên bên A.
  ghi('B KHÔNG gắn được học viên của A vào hồ sơ mình',
    await G(qtB, 'PUT', `/admin/du-hoc/ho-so/${hsIdB}`, { user_id: hv.insertId }), 400);
  // Cùng phép chặn đó phải có ở TẠO MỚI. Bản đầu chỉ kiểm ở PUT, còn POST thì user_id đi thẳng
  // qua danh sách cột cho sửa vào câu INSERT — tạo hồ sơ mới là gắn được học viên của trung tâm khác.
  ghi('B KHÔNG gắn được học viên của A ngay khi TẠO hồ sơ',
    await G(qtB, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Chui qua POST', user_id: hv.insertId }), 400);

  // --- tạo hồ sơ TỪ tài khoản học viên đã có ---
  const [hv2] = await db.query(
    "INSERT INTO users (name, email, password_hash, role, org_id, is_verified, is_approved) VALUES (?, ?, 'x', 'student', ?, 1, 1)",
    [`HV2 ${MA}`, `hv2.${MA}@local.invalid`, orgA]);
  r = ghi('Tạo hồ sơ kèm sẵn tài khoản học viên', await G(qtA, 'POST', '/admin/du-hoc/ho-so',
    { ho_ten: `HV2 ${MA}`, user_id: hv2.insertId }), 201);
  const hsGan = r.j?.id;
  r = await G(qtA, 'GET', `/admin/du-hoc/ho-so/${hsGan}`);
  kiem('Hồ sơ tạo xong đã gắn đúng tài khoản', r.j?.ho_so?.user_id, hv2.insertId);

  // Một tài khoản chỉ đứng sau MỘT hồ sơ: hai hồ sơ cùng trỏ một người thì tiền và tiến độ của em
  // đó nằm rải hai chỗ, không ai biết chỗ nào là thật.
  ghi('KHÔNG gắn một tài khoản vào hồ sơ THỨ HAI',
    await G(qtA, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Trùng tài khoản', user_id: hv2.insertId }), 400);
  ghi('Hồ sơ tự giữ tài khoản của chính nó khi sửa',
    await G(qtA, 'PUT', `/admin/du-hoc/ho-so/${hsGan}`, { user_id: hv2.insertId, nguon: 'sửa thử' }), 200);

  // Danh sách chọn: KHÔNG gõ gì vẫn phải liệt kê, và phải chỉ ra ai đã có hồ sơ.
  r = ghi('Liệt kê học viên khi chưa gõ gì', await G(qtA, 'GET', '/admin/du-hoc/hoc-vien'), 200);
  kiem('Danh sách chọn có đánh dấu ai đã có hồ sơ',
    (r.j?.hoc_vien || []).some((u) => u.id === hv2.insertId && u.ho_so_ma), true);
  r = await G(qtB, 'GET', '/admin/du-hoc/hoc-vien');
  kiem('Danh sách chọn của B không lộ học viên của A',
    (r.j?.hoc_vien || []).some((u) => String(u.email).includes(MA)), false);

  // Admin nền tảng xuyên tổ chức.
  r = await G(ADMIN, 'GET', '/admin/du-hoc/ho-so?tim=' + encodeURIComponent(MA.slice(0, 6)));
  ghi('Admin nền tảng xem được hồ sơ mọi trung tâm', await G(ADMIN, 'GET', `/admin/du-hoc/ho-so/${hsId}`), 200);

  // Mã hồ sơ trùng trong cùng trung tâm -> chặn; khác trung tâm -> cho.
  ghi('Mã hồ sơ trùng trong cùng trung tâm bị chặn',
    await G(qtA, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Trùng mã', ma_hs: 'HS-0001' }), 400);
  ghi('A đặt mã tay', await G(qtA, 'POST', '/admin/du-hoc/ho-so',
    { ho_ten: 'A mã tay', ma_hs: 'DH-2027-01' }), 201);
  ghi('Mã hồ sơ giống hệt ở HAI trung tâm thì được (UNIQUE theo org)',
    await G(qtB, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'B mã tay', ma_hs: 'DH-2027-01' }), 201);

  // Client không được tự đặt org_id để nhét hồ sơ sang trung tâm khác.
  r = await G(qtB, 'POST', '/admin/du-hoc/ho-so', { ho_ten: 'Chui sang A', org_id: orgA });
  const [[chui]] = await db.query('SELECT org_id FROM du_hoc_ho_so WHERE id = ?', [r.j?.id || 0]);
  kiem('Client tự đặt org_id KHÔNG có tác dụng', chui?.org_id, orgB);

  ghi('Xoá hồ sơ', await G(qtA, 'DELETE', `/admin/du-hoc/ho-so/${hsId}`), 200);
  const [[con]] = await db.query('SELECT COUNT(*) AS n FROM du_hoc_thu_tien WHERE ho_so_id = ?', [hsId]);
  kiem('Xoá hồ sơ kéo theo sổ thu (CASCADE)', Number(con.n), 0);
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
        + (SELECT COUNT(*) FROM du_hoc_ho_so WHERE org_id NOT IN (SELECT id FROM organizations)) AS sot`,
  [`${MA}%`, `%${MA}%`]);
await db.end();

for (const b of buoc) {
  console.log(`${b.dat ? '✅' : '❌'} ${b.ten.padEnd(52)} ${String(b.s).padEnd(10)} (mong ${b.mong}) ${b.msg || ''}`);
}
const dat = buoc.filter((b) => b.dat).length;
console.log(`\n🧹 Dọn dẹp: còn sót ${sot} bản ghi (phải là 0)`);
console.log(`HỒ SƠ DU HỌC: ${dat}/${buoc.length} bước đạt`);
process.exit(dat === buoc.length && sot === 0 ? 0 : 1);
