// =============================================================
// DỮ LIỆU MẪU: sổ thu chi · ký túc xá · đề bài  (2026-09-17)
// =============================================================
//   npm run demo:trung-tam            dựng dữ liệu
//   npm run demo:trung-tam -- --xoa   xoá sạch phần do script này tạo
//
// Đổ vào trung tâm DEMO đã có sẵn (`demo-du-hoc`) để dùng chung tài khoản với demo du học.
// TỪ CHỐI chạy nếu DB_HOST không phải localhost — cùng lối `seed-du-hoc-demo.mjs` (4.49):
// dữ liệu giả lẫn vào DB thật là thứ rất khó gỡ về sau.
import 'dotenv/config';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

if (!/^(localhost|127\.0\.0\.1)$/.test(String(process.env.DB_HOST || ''))) {
  console.error('❌ Chỉ chạy trên DB local. DB_HOST hiện tại:', process.env.DB_HOST);
  process.exit(1);
}
const XOA = process.argv.includes('--xoa');
const db = await mysql.createConnection({
  host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
});

const [[org]] = await db.query("SELECT id FROM organizations WHERE ma = 'demo-du-hoc'");
if (!org) { console.error('❌ Chưa có trung tâm demo. Chạy `npm run demo:du-hoc` trước.'); process.exit(1); }
const ORG = org.id;

const ngay = (lui = 0) => new Date(Date.now() - lui * 864e5).toISOString().slice(0, 10);
const ky = (luiThang = 0) => { const d = new Date(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() - luiThang); return d.toISOString().slice(0, 7); };

// ------------------------------------------------------------------ XOÁ
if (XOA) {
  await db.query(`DELETE t FROM ktx_thu_tien t JOIN ktx_o o ON o.id=t.o_id
                    JOIN ktx_phong p ON p.id=o.phong_id JOIN ktx_toa toa ON toa.id=p.toa_id WHERE toa.org_id = ?`, [ORG]);
  await db.query('DELETE FROM ktx_toa WHERE org_id = ?', [ORG]);
  await db.query('DELETE FROM quy_phieu WHERE org_id = ?', [ORG]);
  await db.query('DELETE FROM quy_danh_muc WHERE org_id = ?', [ORG]);
  await db.query('DELETE FROM de_bai WHERE org_id = ?', [ORG]);
  await db.query("DELETE FROM users WHERE org_id = ? AND email = 'giaovien@demo.invalid'", [ORG]);
  await db.query('DELETE FROM classes WHERE org_id = ?', [ORG]);
  console.log('🧹 Đã xoá dữ liệu mẫu 3 khu của trung tâm demo.');
  await db.end(); process.exit(0);
}

const mk = await bcrypt.hash('demo123456', 10);

// ------------------------------------------------------------------ GIÁO VIÊN + LỚP
let [[gv]] = await db.query("SELECT id FROM users WHERE email = 'giaovien@demo.invalid'");
if (!gv) {
  const [r] = await db.query(
    "INSERT INTO users (name, email, password_hash, role, org_id, is_approved, is_verified) VALUES (?,?,?,'teacher',?,1,1)",
    ['Cô Mai Anh (GV demo)', 'giaovien@demo.invalid', mk, ORG]
  );
  gv = { id: r.insertId };
}
let [[lop]] = await db.query('SELECT id FROM classes WHERE org_id = ? LIMIT 1', [ORG]);
if (!lop) {
  const [r] = await db.query(
    "INSERT INTO classes (org_id, name, description, teacher_id, invite_code) VALUES (?,?,?,?,?)",
    [ORG, 'Lớp tiếng Hoa A1 (demo)', 'Lớp học tiếng chuẩn bị du học', gv.id, 'DEMOA1']
  );
  lop = { id: r.insertId };
}
const [hs] = await db.query("SELECT id, name FROM users WHERE org_id = ? AND role = 'student' ORDER BY id", [ORG]);
for (const h of hs) {
  await db.query('INSERT IGNORE INTO class_enrollments (class_id, user_id) VALUES (?,?)', [lop.id, h.id]);
}

// ------------------------------------------------------------------ SỔ THU CHI
const DM = [
  ['thu', 'Học phí'], ['thu', 'Phí dịch vụ du học'], ['thu', 'Tiền ký túc xá'],
  ['thu', 'Phí ghi danh'], ['thu', 'Bán giáo trình'], ['thu', 'Khác'],
  ['chi', 'Lương nhân viên'], ['chi', 'Thuê mặt bằng'], ['chi', 'Điện nước - Internet'],
  ['chi', 'Marketing - Quảng cáo'], ['chi', 'In ấn - Văn phòng phẩm'],
  ['chi', 'Công tác phí'], ['chi', 'Thuế - Phí'], ['chi', 'Khác'],
];
await db.query(
  `INSERT IGNORE INTO quy_danh_muc (org_id, loai, ten, sort_order) VALUES ${DM.map(() => '(?,?,?,?)').join(',')}`,
  DM.flatMap(([l, t], i) => [ORG, l, t, (i + 1) * 10])
);
const [dmRows] = await db.query('SELECT id, loai, ten FROM quy_danh_muc WHERE org_id = ?', [ORG]);
const dm = (ten) => dmRows.find((x) => x.ten === ten)?.id || null;

// Phiếu rải 3 tháng để biểu đồ báo cáo có hình dạng thật, không phải một cột đơn độc.
const PHIEU = [
  ['thu', 62, 12_000_000, 'Học phí', 'Nguyễn Văn Khoa', 'Học phí khoá A1 tháng 7', 'chuyen-khoan'],
  ['chi', 60, 18_000_000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng 7', 'chuyen-khoan'],
  ['chi', 58, 25_000_000, 'Lương nhân viên', 'Bảng lương T7', 'Lương 5 nhân viên', 'chuyen-khoan'],
  ['thu', 40, 9_500_000, 'Học phí', 'Lớp A1 đợt 2', 'Học phí 5 học viên', 'tien-mat'],
  ['thu', 35, 3_000_000, 'Bán giáo trình', 'Học viên lớp A1', '10 bộ Đương đại Q1', 'tien-mat'],
  ['chi', 32, 4_200_000, 'Điện nước - Internet', 'EVN + FPT', 'Điện nước + mạng tháng 8', 'chuyen-khoan'],
  ['chi', 30, 18_000_000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng 8', 'chuyen-khoan'],
  ['thu', 22, 15_000_000, 'Phí dịch vụ du học', 'Phụ huynh em Hồng', 'Đợt 2 phí hồ sơ', 'chuyen-khoan'],
  ['chi', 18, 6_500_000, 'Marketing - Quảng cáo', 'Facebook Ads', 'Chạy quảng cáo tuyển sinh', 'the'],
  ['thu', 12, 8_000_000, 'Phí ghi danh', '4 học viên mới', 'Ghi danh khoá tháng 10', 'tien-mat'],
  ['chi', 9, 1_800_000, 'In ấn - Văn phòng phẩm', 'Cửa hàng Minh Châu', 'In tài liệu + văn phòng phẩm', 'tien-mat'],
  ['chi', 5, 18_000_000, 'Thuê mặt bằng', 'Chủ nhà - anh Tuấn', 'Tiền thuê tháng 9', 'chuyen-khoan'],
  ['thu', 3, 6_000_000, 'Học phí', 'Trần Quốc Bảo', 'Học phí tháng 9', 'chuyen-khoan'],
];
let stt = { thu: 0, chi: 0 };
for (const [loai, lui, tien, dmTen, doiTuong, dg, ht] of PHIEU) {
  stt[loai] += 1;
  const ma = `${loai === 'thu' ? 'PT' : 'PC'}-${String(stt[loai]).padStart(4, '0')}`;
  await db.query(
    `INSERT IGNORE INTO quy_phieu (org_id, ma_phieu, loai, ngay, so_tien, danh_muc_id, doi_tuong, hinh_thuc, dien_giai, nguoi_lap_id)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [ORG, ma, loai, ngay(lui), tien, dm(dmTen), doiTuong, ht, dg, 440]
  );
}

// ------------------------------------------------------------------ KÝ TÚC XÁ
const [toa1] = await db.query(
  'INSERT INTO ktx_toa (org_id, ten, dia_chi, ghi_chu, sort_order) VALUES (?,?,?,?,10)',
  [ORG, 'Cơ sở 1 — Nguyễn Trãi', '145 Nguyễn Trãi, Thanh Xuân, Hà Nội', 'Gần trung tâm, đi bộ 5 phút']
);
const [toa2] = await db.query(
  'INSERT INTO ktx_toa (org_id, ten, dia_chi, sort_order) VALUES (?,?,?,20)',
  [ORG, 'Cơ sở 2 — Khuất Duy Tiến', '88 Khuất Duy Tiến, Hà Nội']
);
const PHONG = [
  [toa1.insertId, 'P101', '1', 4, 'nam', 1_500_000, 'Điều hoà, nóng lạnh, wifi', 'dang-dung'],
  [toa1.insertId, 'P102', '1', 4, 'nu', 1_500_000, 'Điều hoà, nóng lạnh, wifi', 'dang-dung'],
  [toa1.insertId, 'P201', '2', 2, 'nu', 2_200_000, 'Điều hoà, ban công, wifi', 'dang-dung'],
  [toa1.insertId, 'P202', '2', 4, 'nam', 1_500_000, 'Điều hoà, wifi', 'bao-tri'],
  [toa2.insertId, 'A01', '1', 6, 'chung', 1_200_000, 'Quạt trần, wifi', 'dang-dung'],
  [toa2.insertId, 'A02', '1', 6, 'chung', 1_200_000, 'Quạt trần, wifi', 'dang-dung'],
];
const phongId = [];
for (const p of PHONG) {
  const [r] = await db.query(
    'INSERT INTO ktx_phong (toa_id, ten_phong, tang, suc_chua, loai, gia_thang, tien_ich, trang_thai) VALUES (?,?,?,?,?,?,?,?)', p
  );
  phongId.push(r.insertId);
}
const [hoSo] = await db.query('SELECT id, ho_ten, phone, user_id FROM du_hoc_ho_so WHERE org_id = ? ORDER BY id', [ORG]);
// Người ở: 6 em — trong đó 4 em gắn hồ sơ du học, 2 người nhập tay (chứng minh "không bắt buộc
// phải là học sinh du học", đúng quyết định 17/09/2026).
const NGUOI = [
  [phongId[0], hoSo[0], 'Trần Quốc Bảo', '0901111222', 150, 1_500_000, 1_500_000],
  [phongId[0], hoSo[3], 'Đỗ Khánh Linh', '0901111333', 120, 1_500_000, 1_500_000],
  [phongId[0], null, 'Phạm Minh Tuấn (học viên tiếng)', '0901111444', 90, 1_500_000, 1_500_000],
  [phongId[1], hoSo[1], 'Lê Thị Hồng', '0902222111', 140, 1_500_000, 1_500_000],
  [phongId[2], hoSo[2], 'Vũ Hải Đăng', '0903333111', 60, 2_200_000, 2_200_000],
  [phongId[4], null, 'Nguyễn Thu Trang (người ngoài)', '0904444111', 45, 1_200_000, 1_200_000],
];
const oId = [];
for (const [pid, hsRow, ten, phone, lui, gia, coc] of NGUOI) {
  const [r] = await db.query(
    'INSERT INTO ktx_o (phong_id, ho_so_id, user_id, ho_ten, phone, ngay_vao, gia_thang, tien_coc) VALUES (?,?,?,?,?,?,?,?)',
    [pid, hsRow?.id || null, hsRow?.user_id || null, ten, phone, ngay(lui), gia, coc]
  );
  oId.push({ id: r.insertId, gia, lui });
}
// Thu tiền 3 kỳ gần nhất; CỐ Ý để 2 người chưa đóng tháng này để bảng công nợ có ô đỏ thật.
for (let i = 0; i < oId.length; i++) {
  const o = oId[i];
  for (let k = 2; k >= 0; k--) {
    if (k === 0 && (i === 2 || i === 5)) continue;          // 2 người nợ tháng này
    if (o.lui < k * 30) continue;                            // chưa vào ở thì không thu
    await db.query(
      'INSERT INTO ktx_thu_tien (o_id, ky, loai, so_tien, ngay_thu, hinh_thuc, nguoi_thu_id) VALUES (?,?,?,?,?,?,?)',
      [o.id, ky(k), 'tien-phong', o.gia, ngay(k * 30 - 3), k % 2 ? 'chuyen-khoan' : 'tien-mat', 440]
    );
  }
  await db.query(
    'INSERT INTO ktx_thu_tien (o_id, ky, loai, so_tien, ngay_thu, hinh_thuc, nguoi_thu_id, ghi_chu) VALUES (?,?,?,?,?,?,?,?)',
    [o.id, ky(2), 'coc', o.gia, ngay(o.lui), 'tien-mat', 440, 'Tiền cọc khi nhận phòng']
  );
}

// ------------------------------------------------------------------ ĐỀ BÀI
const [de] = await db.query(
  `INSERT INTO de_bai (org_id, ma, tieu_de, mo_ta, loai, thoi_gian_phut, tron_cau, tron_dap_an,
                       so_lan_lam, hien_dap_an, diem_dat, tao_boi, trang_thai)
   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'phat-hanh')`,
  [ORG, 'DE-0001', 'Kiểm tra 15 phút — Bài 1 & 2',
   'Làm trong 15 phút. Đọc kỹ đề, câu tự luận viết ít nhất 3 câu.',
   'kiem-tra', 15, 1, 1, 1, 'ngay', 50, gv.id]
);
const CAU = [
  ['mot-dap-an', '「你好」 nghĩa là gì?', ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], [0], 2, 'Đây là câu chào phổ biến nhất.'],
  ['mot-dap-an', 'Chữ 「我」 đọc là gì?', ['nǐ', 'wǒ', 'tā', 'men'], [1], 2, null],
  ['nhieu-dap-an', 'Chọn TẤT CẢ các từ chỉ thành viên gia đình', ['爸爸', '學校', '媽媽', '哥哥', '書'], [0, 2, 3], 3,
    'Ba từ chỉ người thân: bố, mẹ, anh trai.'],
  ['dung-sai', '「謝謝」 nghĩa là "cảm ơn".', null, [0], 1, null],
  ['dien-tu', 'Điền phiên âm có dấu của chữ 「老師」', null, ['lǎoshī', 'lao shi', 'laoshi'], 2,
    'Chấp nhận cả dạng không dấu vì bàn phím có thể không gõ được.'],
  ['tu-luan', 'Viết 3–5 câu giới thiệu bản thân bằng tiếng Trung (tên, tuổi, nghề nghiệp).', null, null, 5, null],
];
let so = 0;
for (const [loai, nd, lc, da, diem, gt] of CAU) {
  so += 10;
  await db.query(
    'INSERT INTO de_cau_hoi (de_id, sort_order, loai, noi_dung, lua_chon, dap_an, diem, giai_thich) VALUES (?,?,?,?,?,?,?,?)',
    [de.insertId, so, loai, nd,
     loai === 'dung-sai' ? JSON.stringify(['Đúng', 'Sai']) : lc ? JSON.stringify(lc) : null,
     da ? JSON.stringify(da) : null, diem, gt]
  );
}
const [giao] = await db.query(
  'INSERT INTO de_giao (de_id, class_id, dong_luc, ghi_chu, giao_boi) VALUES (?,?,?,?,?)',
  [de.insertId, lop.id, new Date(Date.now() + 7 * 864e5), 'Làm trước cuối tuần nhé cả lớp.', gv.id]
);

// Đề thứ hai: bài tập luyện, không giới hạn thời gian, làm lại được — để thấy khác biệt hai loại.
const [de2] = await db.query(
  `INSERT INTO de_bai (org_id, ma, tieu_de, mo_ta, loai, thoi_gian_phut, so_lan_lam, hien_dap_an, diem_dat, tao_boi, trang_thai)
   VALUES (?,?,?,?,'bai-tap',NULL,0,'ngay',60,?,'phat-hanh')`,
  [ORG, 'DE-0002', 'Luyện từ vựng bài 3 (làm lại thoải mái)',
   'Bài tập tự luyện — làm bao nhiêu lần cũng được, điểm lấy lần cao nhất.', gv.id]
);
const CAU2 = [
  ['mot-dap-an', '「學生」 nghĩa là gì?', ['giáo viên', 'học sinh', 'trường học', 'lớp học'], [0 + 1], 1],
  ['mot-dap-an', '「老師」 nghĩa là gì?', ['học sinh', 'bạn bè', 'giáo viên', 'bác sĩ'], [2], 1],
  ['dien-tu', 'Viết chữ Hán của từ "trường học" (2 chữ)', null, ['學校', '学校'], 2],
];
so = 0;
for (const [loai, nd, lc, da, diem] of CAU2) {
  so += 10;
  await db.query(
    'INSERT INTO de_cau_hoi (de_id, sort_order, loai, noi_dung, lua_chon, dap_an, diem) VALUES (?,?,?,?,?,?,?)',
    [de2.insertId, so, loai, nd, lc ? JSON.stringify(lc) : null, JSON.stringify(da), diem]
  );
}
await db.query('INSERT INTO de_giao (de_id, class_id, ghi_chu, giao_boi) VALUES (?,?,?,?)',
  [de2.insertId, lop.id, 'Luyện thêm ở nhà.', gv.id]);

// Một bài ĐÃ NỘP sẵn để màn "Kết quả" có dữ liệu ngay khi mở demo.
const em = hs[1];   // Lê Thị Hồng
if (em) {
  const [cauRows] = await db.query('SELECT id, loai, dap_an, diem FROM de_cau_hoi WHERE de_id = ? ORDER BY sort_order', [de.insertId]);
  const tl = {};
  let diem = 0;
  cauRows.forEach((c, i) => {
    const da = typeof c.dap_an === 'string' ? JSON.parse(c.dap_an || 'null') : c.dap_an;
    if (c.loai === 'tu-luan') { tl[c.id] = { tra_loi: '我叫黃紅。我今年十八歲。我是學生。', dung: null, diem: 0 }; return; }
    const dung = i !== 2;                       // cố ý sai câu 3 để thống kê "câu sai nhiều nhất" có dữ liệu
    const traLoi = c.loai === 'dien-tu' ? (dung ? 'lǎoshī' : 'sai') : dung ? da : [9];
    if (dung) diem += Number(c.diem);
    tl[c.id] = { tra_loi: traLoi, dung, diem: dung ? Number(c.diem) : 0 };
  });
  await db.query(
    `INSERT INTO de_bai_lam (de_id, giao_id, user_id, lan_thu, bat_dau_luc, nop_luc, diem, tong_diem,
                             so_cau_dung, tong_cau, tra_loi, trang_thai)
     VALUES (?,?,?,1,DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), ?, 15, 4, 6, ?, 'da-nop')`,
    [de.insertId, giao.insertId, em.id, diem, JSON.stringify(tl)]
  );
}

const [[dem]] = await db.query(
  `SELECT (SELECT COUNT(*) FROM quy_phieu WHERE org_id=?) phieu,
          (SELECT COUNT(*) FROM ktx_phong p JOIN ktx_toa t ON t.id=p.toa_id WHERE t.org_id=?) phong,
          (SELECT COUNT(*) FROM ktx_o o JOIN ktx_phong p ON p.id=o.phong_id JOIN ktx_toa t ON t.id=p.toa_id WHERE t.org_id=?) nguoi,
          (SELECT COUNT(*) FROM de_bai WHERE org_id=?) de`, [ORG, ORG, ORG, ORG]);
await db.end();
console.log(`✅ Đã dựng dữ liệu mẫu cho trung tâm demo (org ${ORG}):`);
console.log(`   Sổ quỹ    : ${dem.phieu} phiếu · 14 danh mục`);
console.log(`   Ký túc xá : 2 toà · ${dem.phong} phòng · ${dem.nguoi} người ở · thu 3 kỳ`);
console.log(`   Đề bài    : ${dem.de} đề (1 kiểm tra 15', 1 bài tập luyện) · đã giao cho lớp · 1 bài đã nộp`);
console.log(`   Giáo viên : giaovien@demo.invalid / demo123456`);
