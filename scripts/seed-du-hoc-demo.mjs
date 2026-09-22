// =============================================================
// DỮ LIỆU MẪU cho khu Hồ sơ du học — để demo với khách (2026-09-15)
// =============================================================
//   npm run demo:du-hoc              tạo 10 hồ sơ mẫu (kèm 6 tài khoản học viên)
//   npm run demo:du-hoc -- --xoa     xoá sạch dữ liệu mẫu, không đụng dữ liệu thật
//   npm run demo:du-hoc -- --org 7   đổ vào một trung tâm CÓ SẴN thay vì tạo trung tâm demo
//
// 10 hồ sơ cố ý rải đều 6 bước + 3 trạng thái kết thúc, và mỗi hồ sơ khác nhau ở một điểm mà
// người xem demo sẽ hỏi tới: em nợ tiền, em hộ chiếu sắp hết hạn, em bị bỏ quên lâu, em trượt
// visa đã hoàn tiền, em đã gắn tài khoản học nên xem được điểm...
//
// AN TOÀN: từ chối chạy nếu DB_HOST không phải localhost (cùng lối với scripts/anonymize-local.mjs)
// — dữ liệu giả lẫn vào DB thật là thứ rất khó gỡ về sau. Muốn demo trên production thì phải
// chỉnh tay có ý thức, đừng nới điều kiện này.
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const argv = process.argv.slice(2);
const co = (c) => argv.includes(c);
const lay = (c, md = null) => { const i = argv.indexOf(c); return i >= 0 ? argv[i + 1] : md; };

const MA_ORG = 'demo-du-hoc';
const DUOI_MAIL = '@demo.invalid';   // .invalid do RFC 2606 dành riêng — không bao giờ gửi tới đâu

if (!/^(localhost|127\.0\.0\.1)$/.test(String(process.env.DB_HOST || ''))) {
  console.error('❌ Chỉ chạy trên DB local. DB_HOST hiện tại:', process.env.DB_HOST);
  process.exit(1);
}

const db = await mysql.createConnection({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
});

const ng = (d) => {
  const t = new Date();
  t.setDate(t.getDate() + d);
  return t.toISOString().slice(0, 10);
};

// ------------------------------------------------------------------ xoá
async function xoa() {
  const [org] = await db.query('SELECT id FROM organizations WHERE ma = ?', [MA_ORG]);
  let n = 0;
  for (const o of org) {
    const [r] = await db.query('DELETE FROM du_hoc_ho_so WHERE org_id = ?', [o.id]);
    n += r.affectedRows;
    await db.query('DELETE FROM users WHERE org_id = ?', [o.id]);
    await db.query('DELETE FROM organizations WHERE id = ?', [o.id]);
  }
  // Hồ sơ mẫu đổ vào trung tâm có sẵn (--org) thì nhận ra bằng email .demo.invalid của tài khoản
  // đi kèm; hồ sơ không gắn tài khoản thì nhận ra bằng tiền tố mã.
  const [r2] = await db.query(`DELETE FROM du_hoc_ho_so WHERE ma_hs LIKE 'DEMO-%'`);
  n += r2.affectedRows;
  await db.query('DELETE FROM users WHERE email LIKE ?', ['%' + DUOI_MAIL]);
  console.log(`🧹 Đã xoá ${n} hồ sơ mẫu + tài khoản demo.`);
}

if (co('--xoa')) {
  await xoa();
  await db.end();
  process.exit(0);
}

// ------------------------------------------------------------------ chuẩn bị nơi đổ dữ liệu
await xoa();   // chạy lại nhiều lần vô hại

let orgId = parseInt(lay('--org', ''), 10);
let qtId = null;

if (Number.isFinite(orgId)) {
  const [[o]] = await db.query('SELECT id, ten FROM organizations WHERE id = ?', [orgId]);
  if (!o) { console.error('❌ Không có trung tâm id =', orgId); process.exit(1); }
  console.log(`📍 Đổ hồ sơ mẫu vào trung tâm CÓ SẴN: ${o.ten} (id ${o.id})`);
  const [[qt]] = await db.query(
    "SELECT id FROM users WHERE org_id = ? AND role IN ('org_admin','admin') ORDER BY id LIMIT 1", [orgId]);
  qtId = qt?.id || null;
} else {
  const [r] = await db.query(
    `INSERT INTO organizations (ma, ten, loai, goi, trang_thai, bat_dau, het_han, mon, lien_he_ten, ghi_chu)
     VALUES (?, ?, 'trung-tam', 'co-ban', 'hoat-dong', CURDATE(), ?, 'zh', ?, ?)`,
    [MA_ORG, 'Trung tâm Du học Minh Đức (DEMO)', ng(365), 'Chị Thu Hà',
     'Dữ liệu MẪU để demo — xoá bằng `npm run demo:du-hoc -- --xoa`.']
  );
  orgId = r.insertId;
  const bam = await bcrypt.hash('demo123456', 10);
  const [q] = await db.query(
    `INSERT INTO users (name, email, phone, password_hash, role, is_admin, org_id, is_verified, is_approved, avatar_letter)
     VALUES (?, ?, ?, ?, 'org_admin', 0, ?, 1, 1, 'TH')`,
    ['Chị Thu Hà (QT demo)', 'quantri' + DUOI_MAIL, '0901234567', bam, orgId]
  );
  qtId = q.insertId;
  console.log(`🏢 Tạo trung tâm demo id ${orgId}, tài khoản quản trị: quantri${DUOI_MAIL} / demo123456`);
}

// ------------------------------------------------------------------ 10 hồ sơ
// `tk`: có tạo tài khoản học viên đi kèm không (để demo khối "Việc học trên hệ thống").
// `thu`: các đợt đã thu [số tiền, số ngày trước, khoản, hình thức].
// `gt` : tick giấy tờ tới mục thứ N (0 = chưa nhận gì).
const HO_SO = [
  {
    ma: 'DEMO-01', buoc: 'ho-so', diem_nhan: 'Mới nhận hồ sơ hôm nay, chưa đóng đồng nào',
    ho_ten: 'Nguyễn Minh Anh', ngay_sinh: '2007-03-14', gioi_tinh: 'nu', phone: '0912345678',
    email: 'minhanh' + DUOI_MAIL, cccd: '001307001234', dia_chi: 'Số 12 ngõ 45 Cầu Giấy, Hà Nội',
    lien_lac_khac: 'FB: Minh Anh Nguyen',
    ph_ten: 'Nguyễn Văn Bình', ph_phone: '0987654321', ph_quan_he: 'Bố',
    truong_tn: 'THPT Chu Văn An', nam_tn: '2025', xep_loai: 'Giỏi', trinh_do_tieng: 'Chưa có',
    truong_nv1: 'Đại học Sư phạm Đài Loan (NTNU)', nganh: 'Trung tâm Hoa ngữ',
    ky_nhap_hoc: '2027 Xuân', loai_hinh: 'hoa-ngu', tong_phi: 45000000, nguon: 'Facebook',
    ngay_nhan: ng(0), buoc_tu: ng(0), gt: 3, thu: [],
    ghi_chu: 'Gia đình đã có sổ tiết kiệm 250 triệu, cần bổ sung bản dịch công chứng.',
    nhat_ky: ['Tư vấn qua điện thoại 40 phút, gia đình quyết định nộp hồ sơ kỳ Xuân 2027.'],
  },
  {
    ma: 'DEMO-02', buoc: 'dong-tien', diem_nhan: 'Đóng 1 đợt, còn nợ',
    ho_ten: 'Trần Quốc Bảo', ngay_sinh: '2006-11-02', gioi_tinh: 'nam', phone: '0934567890',
    email: 'quocbao' + DUOI_MAIL, cccd: '001206005678', ho_chieu: 'C7654321', ho_chieu_het_han: ng(1400),
    dia_chi: '89 Lê Lợi, TP. Vinh, Nghệ An',
    ph_ten: 'Trần Văn Hùng', ph_phone: '0912000111', ph_quan_he: 'Bố',
    truong_tn: 'THPT Huỳnh Thúc Kháng', nam_tn: '2024', xep_loai: 'Khá', trinh_do_tieng: 'TOCFL A1',
    truong_nv1: 'Đại học Trung Nguyên', truong_nv2: 'Đại học Minh Truyền',
    nganh: 'Quản trị kinh doanh', ky_nhap_hoc: '2027 Xuân', loai_hinh: 'dai-hoc',
    tong_phi: 52000000, nguon: 'Người quen giới thiệu', ngay_nhan: ng(-25), buoc_tu: ng(-12),
    gt: 6, tk: true,
    thu: [[15000000, -20, 'dat-coc', 'chuyen-khoan', 'BL0012'], [10000000, -5, 'phi-ho-so', 'tien-mat', 'BL0019']],
    nhat_ky: ['Đã nhắc gia đình chuyển nốt 27 triệu trước ngày 30.'],
  },
  {
    ma: 'DEMO-03', buoc: 'hoc', diem_nhan: 'Đã gắn tài khoản học — xem được lớp và điểm',
    ho_ten: 'Lê Thị Hồng', ngay_sinh: '2005-07-21', gioi_tinh: 'nu', phone: '0945678901',
    email: 'lehong' + DUOI_MAIL, cccd: '001305009012', ho_chieu: 'C5551234', ho_chieu_het_han: ng(1600),
    dia_chi: '22 Trần Phú, Hải Phòng',
    ph_ten: 'Lê Văn Tâm', ph_phone: '0933444555', ph_quan_he: 'Bố',
    truong_tn: 'Cao đẳng Kinh tế Hải Phòng', nam_tn: '2024', xep_loai: 'Khá',
    trinh_do_tieng: 'TOCFL A2', truong_nv1: 'Đại học Đạm Giang', nganh: 'Tiếng Trung thương mại',
    ky_nhap_hoc: '2027 Thu', loai_hinh: 'dai-hoc', tong_phi: 48000000, nguon: 'Fanpage trung tâm',
    ngay_nhan: ng(-60), buoc_tu: ng(-30), gt: 9, tk: true,
    thu: [[48000000, -50, 'hoc-phi', 'chuyen-khoan', 'BL0008']],
    nhat_ky: ['Em học lớp tối 3-5-7, chuyên cần tốt.', 'Đã đóng đủ học phí, chờ lịch phỏng vấn trường.'],
  },
  {
    ma: 'DEMO-04', buoc: 'hoc', diem_nhan: '⚠ Hộ chiếu sắp hết hạn + hồ sơ đứng yên 48 ngày',
    ho_ten: 'Phạm Gia Huy', ngay_sinh: '2006-01-30', gioi_tinh: 'nam', phone: '0956789012',
    email: 'giahuy' + DUOI_MAIL, cccd: '001206003456',
    ho_chieu: 'C1112223', ho_chieu_het_han: ng(95),
    dia_chi: '5 Nguyễn Huệ, Huế',
    ph_ten: 'Phạm Thị Lan', ph_phone: '0905111222', ph_quan_he: 'Mẹ',
    truong_tn: 'THPT Quốc Học Huế', nam_tn: '2024', xep_loai: 'Giỏi', trinh_do_tieng: 'HSK 3',
    truong_nv1: 'Đại học Thành Công (NCKU)', nganh: 'Kỹ thuật cơ khí',
    ky_nhap_hoc: '2027 Xuân', loai_hinh: 'dai-hoc', tong_phi: 50000000, nguon: 'TikTok',
    ngay_nhan: ng(-75), buoc_tu: ng(-48), gt: 5,
    thu: [[20000000, -70, 'dat-coc', 'chuyen-khoan', 'BL0005']],
    ghi_chu: 'Hộ chiếu còn dưới 6 tháng — phải làm lại trước khi nộp visa.',
    nhat_ky: ['Gọi 2 lần không nghe máy, đã nhắn Zalo.'],
  },
  {
    ma: 'DEMO-05', buoc: 'phong-van', diem_nhan: 'Phỏng vấn trong 6 ngày nữa',
    ho_ten: 'Vũ Hải Đăng', ngay_sinh: '2004-09-08', gioi_tinh: 'nam', phone: '0967890123',
    email: 'haidang' + DUOI_MAIL, cccd: '001204007890', ho_chieu: 'C9998887', ho_chieu_het_han: ng(1200),
    dia_chi: '17 Hoàng Diệu, Đà Nẵng',
    ph_ten: 'Vũ Đức Thắng', ph_phone: '0913222333', ph_quan_he: 'Bố',
    truong_tn: 'Đại học Duy Tân', nam_tn: '2023', xep_loai: 'Khá', trinh_do_tieng: 'TOCFL B1',
    truong_nv1: 'Đại học Quốc lập Đài Loan (NTU)', truong_nv2: 'Đại học Thanh Hoa Đài Loan',
    nganh: 'Khoa học máy tính', ky_nhap_hoc: '2027 Xuân', loai_hinh: 'cao-hoc',
    tong_phi: 55000000, nguon: 'Google', ngay_nhan: ng(-90), buoc_tu: ng(-10),
    ngay_phong_van: ng(6), gt: 11, tk: true,
    thu: [[30000000, -85, 'dat-coc', 'chuyen-khoan', 'BL0002'], [25000000, -30, 'hoc-phi', 'chuyen-khoan', 'BL0015']],
    nhat_ky: ['Đã gửi em bộ câu hỏi phỏng vấn mẫu, hẹn luyện thử thứ 5.'],
  },
  {
    ma: 'DEMO-06', buoc: 'visa', diem_nhan: 'Phỏng vấn đậu, đang chờ kết quả visa',
    ho_ten: 'Đặng Thu Trang', ngay_sinh: '2005-12-25', gioi_tinh: 'nu', phone: '0978901234',
    email: 'thutrang' + DUOI_MAIL, cccd: '001305002468', ho_chieu: 'C4443332', ho_chieu_het_han: ng(1500),
    dia_chi: '101 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    ph_ten: 'Đặng Quang Vinh', ph_phone: '0988777666', ph_quan_he: 'Bố',
    truong_tn: 'THPT Kim Liên', nam_tn: '2024', xep_loai: 'Giỏi', trinh_do_tieng: 'TOCFL A2',
    truong_nv1: 'Đại học Phụ Nhân', nganh: 'Ngôn ngữ Trung',
    ky_nhap_hoc: '2027 Xuân', loai_hinh: 'dai-hoc', tong_phi: 53000000, nguon: 'Học viên cũ giới thiệu',
    ngay_nhan: ng(-120), buoc_tu: ng(-8), ngay_phong_van: ng(-22), kq_phong_van: 'dau',
    truong_do: 'Đại học Phụ Nhân', ngay_nop_visa: ng(-6), kq_visa: 'cho', gt: 13,
    thu: [[53000000, -100, 'hoc-phi', 'chuyen-khoan', 'BL0003']],
    nhat_ky: ['Nộp hồ sơ visa tại VPKTVH Đài Bắc, hẹn trả kết quả sau 10 ngày làm việc.'],
  },
  {
    ma: 'DEMO-07', buoc: 'bay', diem_nhan: 'Bay sau 21 ngày — đã xong mọi thứ',
    ho_ten: 'Đỗ Khánh Linh', ngay_sinh: '2005-05-19', gioi_tinh: 'nu', phone: '0989012345',
    email: 'khanhlinh' + DUOI_MAIL, cccd: '001305001357', ho_chieu: 'C2223334', ho_chieu_het_han: ng(1800),
    dia_chi: '68 Lý Thường Kiệt, Quy Nhơn',
    ph_ten: 'Đỗ Minh Quân', ph_phone: '0966555444', ph_quan_he: 'Bố',
    truong_tn: 'THPT Lê Quý Đôn', nam_tn: '2024', xep_loai: 'Giỏi', trinh_do_tieng: 'TOCFL B1',
    truong_nv1: 'Đại học Đài Bắc', nganh: 'Quản trị du lịch',
    ky_nhap_hoc: '2027 Xuân', loai_hinh: 'dai-hoc', tong_phi: 60000000, nguon: 'Fanpage trung tâm',
    ngay_nhan: ng(-150), buoc_tu: ng(-4), ngay_phong_van: ng(-50), kq_phong_van: 'dau',
    truong_do: 'Đại học Đài Bắc', ngay_nop_visa: ng(-25), kq_visa: 'dau',
    ngay_bay: ng(21), chuyen_bay: 'VN576 HAN–TPE 09:15 ngày ' + ng(21).split('-').reverse().join('/'),
    gt: 15, tk: true,
    thu: [[30000000, -140, 'dat-coc', 'chuyen-khoan', 'BL0001'],
          [25000000, -60, 'hoc-phi', 'chuyen-khoan', 'BL0011'],
          [5000000, -20, 'phi-visa', 'tien-mat', 'BL0021']],
    nhat_ky: ['Đã đặt vé, gia đình tiễn ở Nội Bài.', 'Đã gửi em thông tin ký túc xá và người đón tại sân bay.'],
  },
  {
    ma: 'DEMO-08', buoc: 'hoan-thanh', diem_nhan: 'Đã bay — hồ sơ hoàn thành',
    ho_ten: 'Bùi Anh Tuấn', ngay_sinh: '2004-02-11', gioi_tinh: 'nam', phone: '0990123456',
    email: 'anhtuan' + DUOI_MAIL, cccd: '001204008642', ho_chieu: 'C6667778', ho_chieu_het_han: ng(1700),
    dia_chi: '39 Hùng Vương, Cần Thơ',
    ph_ten: 'Bùi Văn Sáu', ph_phone: '0977888999', ph_quan_he: 'Bố',
    truong_tn: 'Đại học Cần Thơ', nam_tn: '2023', xep_loai: 'Khá', trinh_do_tieng: 'TOCFL B1',
    truong_nv1: 'Đại học Trung Sơn', nganh: 'Điện tử viễn thông',
    ky_nhap_hoc: '2026 Thu', loai_hinh: 'cao-hoc', tong_phi: 58000000, nguon: 'Người quen giới thiệu',
    ngay_nhan: ng(-300), buoc_tu: ng(-35), ngay_phong_van: ng(-160), kq_phong_van: 'dau',
    truong_do: 'Đại học Trung Sơn', ngay_nop_visa: ng(-120), kq_visa: 'dau',
    ngay_bay: ng(-35), chuyen_bay: 'CI782 SGN–TPE 01:20', gt: 15,
    thu: [[58000000, -280, 'hoc-phi', 'chuyen-khoan', 'BL0000']],
    nhat_ky: ['Em đã nhập học, gửi ảnh ký túc xá về cho trung tâm.'],
  },
  {
    ma: 'DEMO-09', buoc: 'tam-dung', diem_nhan: 'Tạm dừng — gia đình hoãn sang kỳ sau',
    ho_ten: 'Hoàng Thị Mai', ngay_sinh: '2006-08-03', gioi_tinh: 'nu', phone: '0901112223',
    email: 'thimai' + DUOI_MAIL, cccd: '001306007531', dia_chi: '7 Quang Trung, Nam Định',
    ph_ten: 'Hoàng Văn Thái', ph_phone: '0944333222', ph_quan_he: 'Bố',
    truong_tn: 'THPT Nguyễn Khuyến', nam_tn: '2025', xep_loai: 'Khá', trinh_do_tieng: 'Chưa có',
    truong_nv1: 'Đại học Văn Hoá Trung Quốc', nganh: 'Thiết kế đồ hoạ',
    ky_nhap_hoc: '2027 Thu', loai_hinh: 'dai-hoc', tong_phi: 47000000, nguon: 'Facebook',
    ngay_nhan: ng(-110), buoc_tu: ng(-40), gt: 4,
    thu: [[10000000, -100, 'dat-coc', 'tien-mat', 'BL0009']],
    ghi_chu: 'Gia đình xin hoãn sang kỳ Thu 2027 vì lý do tài chính. Giữ nguyên tiền cọc.',
    nhat_ky: ['Gia đình xin dừng tạm, hẹn liên hệ lại tháng 3.'],
  },
  {
    ma: 'DEMO-10', buoc: 'huy', diem_nhan: 'Trượt visa — đã hoàn lại một phần tiền',
    ho_ten: 'Ngô Văn Kiên', ngay_sinh: '2005-04-27', gioi_tinh: 'nam', phone: '0912223334',
    email: 'vankien' + DUOI_MAIL, cccd: '001205004321', ho_chieu: 'C8889990', ho_chieu_het_han: ng(1300),
    dia_chi: '250 Phan Đình Phùng, Buôn Ma Thuột',
    ph_ten: 'Ngô Thị Hoa', ph_phone: '0922111000', ph_quan_he: 'Mẹ',
    truong_tn: 'THPT Buôn Ma Thuột', nam_tn: '2023', xep_loai: 'Trung bình', trinh_do_tieng: 'TOCFL A1',
    truong_nv1: 'Đại học Khai Nam', nganh: 'Nhà hàng khách sạn',
    ky_nhap_hoc: '2026 Thu', loai_hinh: 'dai-hoc', tong_phi: 46000000, nguon: 'TikTok',
    ngay_nhan: ng(-220), buoc_tu: ng(-55), ngay_phong_van: ng(-140), kq_phong_van: 'dau',
    truong_do: 'Đại học Khai Nam', ngay_nop_visa: ng(-90), kq_visa: 'truot', gt: 12,
    thu: [[35000000, -200, 'hoc-phi', 'chuyen-khoan', 'BL0006'],
          [20000000, -60, 'khac', 'chuyen-khoan', 'HT001', 'hoan']],
    ghi_chu: 'Trượt visa vòng 2 do chứng minh tài chính không đạt. Đã hoàn 20 triệu theo thoả thuận.',
    nhat_ky: ['Nhận kết quả trượt visa.', 'Đã hoàn 20 triệu, gia đình cân nhắc nộp lại năm sau.'],
  },
];

const GIAY_TO = [
  ['Hộ chiếu (bản sao)', 1], ['CCCD/CMND (công chứng)', 1], ['Ảnh thẻ 3.5×4.5 (6 ảnh)', 1],
  ['Bằng tốt nghiệp (công chứng + dịch)', 1], ['Học bạ / bảng điểm (công chứng + dịch)', 1],
  ['Giấy khai sinh (công chứng + dịch)', 1], ['Giấy khám sức khoẻ', 1], ['Lý lịch tư pháp số 2', 1],
  ['Chứng minh tài chính (sổ tiết kiệm)', 1], ['Giấy bảo lãnh tài chính của phụ huynh', 1],
  ['Đơn xin nhập học của trường', 1], ['Kế hoạch học tập (讀書計畫書)', 1],
  ['Thư giới thiệu', 0], ['Chứng chỉ tiếng (TOCFL / HSK / TOEFL)', 0], ['Sơ yếu lý lịch', 0],
];

const bamChung = await bcrypt.hash('demo123456', 10);
let soTk = 0;

for (const h of HO_SO) {
  // Tài khoản học viên đi kèm — để demo khối "Việc học trên hệ thống" và tính năng vừa thêm
  // ("chọn từ học viên đã có tài khoản").
  let userId = null;
  if (h.tk) {
    const [u] = await db.query(
      `INSERT INTO users (name, email, phone, password_hash, role, org_id, is_verified, is_approved,
                          avatar_letter, level_label, points, streak, last_active)
       VALUES (?, ?, ?, ?, 'student', ?, 1, 1, ?, ?, ?, ?, ?)`,
      [h.ho_ten, h.email, h.phone || null, bamChung, orgId,
       h.ho_ten.split(' ').pop().slice(0, 1).toUpperCase(),
       'Tân Sinh · Lv' + (1 + (soTk % 4)), 120 + soTk * 85, 3 + soTk, ng(-(soTk % 5))]
    );
    userId = u.insertId;
    soTk++;
  }

  const [r] = await db.query(
    `INSERT INTO du_hoc_ho_so
      (org_id, user_id, ma_hs, ho_ten, ngay_sinh, gioi_tinh, cccd, ho_chieu, ho_chieu_het_han,
       dia_chi, phone, email, lien_lac_khac, ph_ten, ph_phone, ph_quan_he,
       truong_tn, nam_tn, xep_loai, trinh_do_tieng, truong_nv1, truong_nv2, truong_nv3,
       nganh, ky_nhap_hoc, loai_hinh, tu_van_id, nguon, ngay_nhan, buoc, buoc_tu,
       ngay_phong_van, kq_phong_van, truong_do, ngay_nop_visa, kq_visa, ngay_bay, chuyen_bay,
       tong_phi, ghi_chu)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [orgId, userId, h.ma, h.ho_ten, h.ngay_sinh || null, h.gioi_tinh || null, h.cccd || null,
     h.ho_chieu || null, h.ho_chieu_het_han || null, h.dia_chi || null, h.phone || null,
     h.email || null, h.lien_lac_khac || null, h.ph_ten || null, h.ph_phone || null, h.ph_quan_he || null,
     h.truong_tn || null, h.nam_tn || null, h.xep_loai || null, h.trinh_do_tieng || null,
     h.truong_nv1 || null, h.truong_nv2 || null, h.truong_nv3 || null, h.nganh || null,
     h.ky_nhap_hoc || null, h.loai_hinh || null, qtId, h.nguon || null, h.ngay_nhan || null,
     h.buoc, h.buoc_tu || null, h.ngay_phong_van || null, h.kq_phong_van || null, h.truong_do || null,
     h.ngay_nop_visa || null, h.kq_visa || null, h.ngay_bay || null, h.chuyen_bay || null,
     h.tong_phi || 0, h.ghi_chu || null]
  );
  const id = r.insertId;

  // Giấy tờ: tick tới mục thứ `gt`. Những mục đầu đã nộp trường, vài mục cuối mới chỉ dịch xong —
  // để bảng checklist trên demo có đủ các màu trạng thái chứ không phẳng một màu.
  await db.query(
    `INSERT INTO du_hoc_giay_to (ho_so_id, ten, bat_buoc, trang_thai, ngay_nhan, sort_order) VALUES ${
      GIAY_TO.map(() => '(?,?,?,?,?,?)').join(',')}`,
    GIAY_TO.flatMap(([ten, bb], i) => {
      const xong = i < (h.gt || 0);
      const tt = !xong ? 'chua' : (i < (h.gt || 0) - 3 ? 'nop' : 'dich');
      return [id, ten, bb, tt, xong ? ng(-(30 - i)) : null, (i + 1) * 10];
    })
  );

  for (const [tien, ngay, khoan, hinhThuc, chungTu, loai] of (h.thu || [])) {
    await db.query(
      `INSERT INTO du_hoc_thu_tien (ho_so_id, loai, khoan, so_tien, ngay_thu, hinh_thuc, chung_tu, nguoi_thu_id)
       VALUES (?,?,?,?,?,?,?,?)`,
      [id, loai || 'thu', khoan, tien, ng(ngay), hinhThuc, chungTu || null, qtId]
    );
  }

  // Nhật ký: dòng "tạo hồ sơ" + các dòng chăm sóc. created_at để mặc định (giờ hiện tại) — bảng
  // này chỉ dùng để xem, không có truy vấn nào lọc theo mốc thời gian của nó.
  await db.query(
    `INSERT INTO du_hoc_lich_su (ho_so_id, loai, buoc_moi, noi_dung, nguoi_id) VALUES (?, 'he-thong', 'ho-so', ?, ?)`,
    [id, `Tạo hồ sơ ${h.ma}`, qtId]);
  for (const n of (h.nhat_ky || [])) {
    await db.query(
      `INSERT INTO du_hoc_lich_su (ho_so_id, loai, noi_dung, nguoi_id) VALUES (?, 'ghi-chu', ?, ?)`,
      [id, n, qtId]);
  }
  console.log(`  ✅ ${h.ma}  ${h.ho_ten.padEnd(20)} ${h.buoc.padEnd(11)} ${h.diem_nhan}`);
}

// Vài tài khoản học viên KHÔNG có hồ sơ — để demo đúng tính năng "chọn học sinh đã có tài khoản
// rồi tạo hồ sơ cho em ấy". Không có nhóm này thì danh sách chọn trống trơn khi demo.
const CHUA_CO = [
  ['Trịnh Hoài Nam', 'hoainam' + DUOI_MAIL, '0911222333'],
  ['Lý Thanh Thảo', 'thanhthao' + DUOI_MAIL, '0922333444'],
  ['Cao Đức Mạnh', 'ducmanh' + DUOI_MAIL, '0933444555'],
];
for (const [ten, mail, dt] of CHUA_CO) {
  await db.query(
    `INSERT INTO users (name, email, phone, password_hash, role, org_id, is_verified, is_approved, avatar_letter)
     VALUES (?, ?, ?, ?, 'student', ?, 1, 1, ?)`,
    [ten, mail, dt, bamChung, orgId, ten.split(' ').pop().slice(0, 1).toUpperCase()]);
}

const [[tk]] = await db.query(
  `SELECT COUNT(*) AS so,
          COALESCE(SUM(tong_phi), 0) AS phi,
          (SELECT COALESCE(SUM(CASE WHEN loai='hoan' THEN -so_tien ELSE so_tien END), 0)
             FROM du_hoc_thu_tien tt JOIN du_hoc_ho_so h2 ON h2.id = tt.ho_so_id WHERE h2.org_id = ?) AS thu
     FROM du_hoc_ho_so WHERE org_id = ?`, [orgId, orgId]);

console.log(`\n📊 ${tk.so} hồ sơ · tổng phí ${Number(tk.phi).toLocaleString('vi-VN')}đ · đã thu ${Number(tk.thu).toLocaleString('vi-VN')}đ`);
console.log(`👥 ${soTk} hồ sơ có gắn tài khoản học + ${CHUA_CO.length} tài khoản chưa có hồ sơ (để thử nút "chọn học sinh đã có").`);
console.log(`\n🔑 Đăng nhập admin: quantri${DUOI_MAIL} / demo123456   →  /admin.html#/du-hoc`);
console.log(`🧹 Xoá sạch: npm run demo:du-hoc -- --xoa`);
await db.end();
