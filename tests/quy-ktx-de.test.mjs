// =============================================================
// SỔ THU CHI · KÝ TÚC XÁ · ĐỀ BÀI TỰ SOẠN (2026-09-17)
// =============================================================
//   npm run test:quy-ktx-de          (cần server + DB local)
//
// Đi theo đúng thứ tự người dùng thật sẽ trải qua, RỒI mới kiểm phân quyền — kiểm cách ly trước
// mà nghiệp vụ tắc thì vẫn "xanh" (bài học 4.46).
//
// TỰ TẠO rồi TỰ XOÁ dữ liệu của mình; in số bản ghi còn sót — phải là 0. CHỈ chạy trên DB local.
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

const MA = 'qkdtest-' + Date.now().toString(36);
const buoc = [];

async function G(t, m, p, body) {
  const r = await fetch(B + p, {
    method: m,
    headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: 'Bearer ' + t } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  let j = null; try { j = await r.json(); } catch { /* body rỗng */ }
  return { s: r.status, j };
}
function ghi(ten, r, mong) {
  const dat = Array.isArray(mong) ? mong.includes(r.s) : r.s === mong;
  buoc.push({ ten, s: r.s, mong, dat, msg: dat ? '' : (r.j?.error || '') });
  return r;
}
function kiem(ten, thuc, mong) {
  buoc.push({ ten, s: JSON.stringify(thuc), mong: JSON.stringify(mong), dat: JSON.stringify(thuc) === JSON.stringify(mong), msg: '' });
}

const hom = new Date().toISOString().slice(0, 10);
const kyNay = hom.slice(0, 7);
let orgA = null; let orgB = null;

/** Tạo một tổ chức + bộ tài khoản. Trả id. */
async function taoOrg(hau) {
  const [o] = await db.query(
    "INSERT INTO organizations (ma, ten, loai, trang_thai, het_han) VALUES (?,?,'trung-tam','hoat-dong', DATE_ADD(CURDATE(), INTERVAL 1 YEAR))",
    [`${MA}-${hau}`, `Trung tâm test ${hau}`]
  );
  return o.insertId;
}
async function taoUser(org, vai, hau) {
  const [u] = await db.query(
    'INSERT INTO users (name, email, password_hash, role, org_id, is_approved, is_verified) VALUES (?,?,?,?,?,1,1)',
    [`${vai} ${hau}`, `${MA}-${hau}@test.invalid`, '$2b$10$abcdefghijklmnopqrstuv', vai, org]
  );
  return u.insertId;
}

try {
  // ------------------------------------------------------------ DỰNG BỐI CẢNH
  orgA = await taoOrg('a');
  orgB = await taoOrg('b');
  const qtA = await taoUser(orgA, 'org_admin', 'qta');
  const gvA = await taoUser(orgA, 'teacher', 'gva');
  const gvA2 = await taoUser(orgA, 'teacher', 'gva2');
  const hsA = await taoUser(orgA, 'student', 'hsa');
  const hsA2 = await taoUser(orgA, 'student', 'hsa2');
  const qtB = await taoUser(orgB, 'org_admin', 'qtb');

  const [lopA] = await db.query(
    "INSERT INTO classes (org_id, name, teacher_id, invite_code) VALUES (?,?,?,?)",
    [orgA, 'Lớp test A', gvA, `${MA}A`.slice(0, 20)]
  );
  const [lopA2] = await db.query(
    "INSERT INTO classes (org_id, name, teacher_id, invite_code) VALUES (?,?,?,?)",
    [orgA, 'Lớp của GV2', gvA2, `${MA}A2`.slice(0, 20)]
  );
  await db.query('INSERT INTO class_enrollments (class_id, user_id) VALUES (?,?),(?,?)',
    [lopA.insertId, hsA, lopA.insertId, hsA2]);

  const TQT = tok(qtA); const TGV = tok(gvA); const TGV2 = tok(gvA2);
  const THS = tok(hsA); const THS2 = tok(hsA2); const TQTB = tok(qtB);

  // =================================================================
  // PHẦN 1 — SỔ THU CHI
  // =================================================================
  let r = ghi('Quỹ: danh mục tự dựng bộ mặc định', await G(TQT, 'GET', '/admin/quy/danh-muc'), 200);
  const dmThu = r.j?.danh_muc?.filter((d) => d.loai === 'thu') || [];
  const dmChi = r.j?.danh_muc?.filter((d) => d.loai === 'chi') || [];
  kiem('Quỹ: có cả danh mục thu lẫn chi', dmThu.length > 0 && dmChi.length > 0, true);

  r = ghi('Quỹ: thêm danh mục mới', await G(TQT, 'POST', '/admin/quy/danh-muc', { loai: 'thu', ten: `Thu test ${MA}` }), 200);
  const dmMoi = r.j?.id;
  ghi('Quỹ: thêm danh mục TRÙNG TÊN bị chặn', await G(TQT, 'POST', '/admin/quy/danh-muc', { loai: 'thu', ten: `Thu test ${MA}` }), 409);

  r = ghi('Quỹ: lập phiếu THU', await G(TQT, 'POST', '/admin/quy/phieu', {
    loai: 'thu', ngay: hom, so_tien: 5_000_000, danh_muc_id: dmMoi, doi_tuong: 'Nguyễn Văn A', dien_giai: 'Học phí tháng 9',
  }), 200);
  const phieuThu = r.j?.id;
  kiem('Quỹ: mã phiếu thu đúng dạng PT-xxxx', /^PT-\d{4}$/.test(r.j?.ma_phieu || ''), true);

  r = ghi('Quỹ: lập phiếu CHI', await G(TQT, 'POST', '/admin/quy/phieu', {
    loai: 'chi', ngay: hom, so_tien: 2_000_000, danh_muc_id: dmChi[0]?.id, doi_tuong: 'Chủ nhà', dien_giai: 'Thuê mặt bằng',
  }), 200);
  kiem('Quỹ: mã phiếu chi đúng dạng PC-xxxx', /^PC-\d{4}$/.test(r.j?.ma_phieu || ''), true);

  ghi('Quỹ: số tiền ÂM bị chặn', await G(TQT, 'POST', '/admin/quy/phieu', { loai: 'thu', ngay: hom, so_tien: -100 }), 400);
  ghi('Quỹ: ngày sai định dạng bị chặn', await G(TQT, 'POST', '/admin/quy/phieu', { loai: 'thu', ngay: 'hôm qua', so_tien: 100 }), 400);
  ghi('Quỹ: danh mục CHI gắn vào phiếu THU bị chặn',
    await G(TQT, 'POST', '/admin/quy/phieu', { loai: 'thu', ngay: hom, so_tien: 100, danh_muc_id: dmChi[0]?.id }), 400);

  r = ghi('Quỹ: đọc sổ quỹ', await G(TQT, 'GET', '/admin/quy/phieu'), 200);
  kiem('Quỹ: tổng thu/chi/tồn đúng', [r.j?.tong?.thu, r.j?.tong?.chi, r.j?.tong?.ton], [5_000_000, 2_000_000, 3_000_000]);
  kiem('Quỹ: danh sách KHÔNG kèm cột ảnh base64', Object.keys(r.j?.phieu?.[0] || {}).includes('anh'), false);

  r = ghi('Quỹ: lọc chỉ phiếu chi', await G(TQT, 'GET', '/admin/quy/phieu?loai=chi'), 200);
  kiem('Quỹ: lọc ra đúng 1 phiếu chi', r.j?.phieu?.length, 1);

  ghi('Quỹ: sửa phiếu', await G(TQT, 'PUT', `/admin/quy/phieu/${phieuThu}`, { so_tien: 6_000_000 }), 200);
  r = await G(TQT, 'GET', '/admin/quy/phieu?loai=thu');
  kiem('Quỹ: sửa xong số tiền đúng', Number(r.j?.phieu?.[0]?.so_tien), 6_000_000);

  ghi('Quỹ: xoá danh mục ĐANG CÓ phiếu bị chặn', await G(TQT, 'DELETE', `/admin/quy/danh-muc/${dmMoi}`), 409);

  // =================================================================
  // PHẦN 2 — KÝ TÚC XÁ
  // =================================================================
  r = ghi('KTX: tạo toà', await G(TQT, 'POST', '/admin/ktx/toa', { ten: 'Toà A test', dia_chi: '1 Nguyễn Trãi' }), 200);
  const toaA = r.j?.id;
  r = ghi('KTX: tạo phòng', await G(TQT, 'POST', '/admin/ktx/phong', {
    toa_id: toaA, ten_phong: 'P101', tang: '1', suc_chua: 2, loai: 'nam', gia_thang: 1_500_000,
  }), 200);
  const phongA = r.j?.id;
  ghi('KTX: phòng TRÙNG TÊN trong cùng toà bị chặn',
    await G(TQT, 'POST', '/admin/ktx/phong', { toa_id: toaA, ten_phong: 'P101', suc_chua: 2 }), 409);
  ghi('KTX: thêm phòng vào toà của trung tâm KHÁC bị chặn',
    await G(TQTB, 'POST', '/admin/ktx/phong', { toa_id: toaA, ten_phong: 'X', suc_chua: 2 }), 404);

  r = ghi('KTX: xếp người thứ nhất vào phòng', await G(TQT, 'POST', `/admin/ktx/phong/${phongA}/nguoi`, {
    ho_ten: 'Trần Văn B', phone: '0900000001', ngay_vao: hom, tien_coc: 1_500_000,
  }), 200);
  const nguoi1 = r.j?.id;
  r = ghi('KTX: xếp người thứ hai', await G(TQT, 'POST', `/admin/ktx/phong/${phongA}/nguoi`, {
    ho_ten: 'Lê Thị C', ngay_vao: hom,
  }), 200);
  const nguoi2 = r.j?.id;
  ghi('KTX: người thứ BA vào phòng 2 chỗ bị chặn',
    await G(TQT, 'POST', `/admin/ktx/phong/${phongA}/nguoi`, { ho_ten: 'Quá tải', ngay_vao: hom }), 409);

  r = await G(TQT, 'GET', `/admin/ktx/phong/${phongA}`);
  kiem('KTX: giá thuê chép từ giá niêm yết của phòng', Number(r.j?.nguoi_o?.find((x) => x.id === nguoi2)?.gia_thang), 1_500_000);

  ghi('KTX: hạ sức chứa xuống dưới số người đang ở bị chặn',
    await G(TQT, 'PUT', `/admin/ktx/phong/${phongA}`, { suc_chua: 1 }), 400);

  r = await G(TQT, 'GET', '/admin/ktx/tong-quan');
  kiem('KTX: tổng quan đếm đúng chỗ/đang ở/còn trống', [r.j?.tong_cho, r.j?.dang_o, r.j?.con_trong], [2, 2, 0]);
  kiem('KTX: cả 2 người đều đang nợ tháng này', r.j?.chua_dong?.length, 2);

  ghi('KTX: thu tiền phòng', await G(TQT, 'POST', `/admin/ktx/nguoi/${nguoi1}/thu-tien`, {
    ky: kyNay, loai: 'tien-phong', so_tien: 1_500_000, ngay_thu: hom, hinh_thuc: 'chuyen-khoan',
  }), 200);
  ghi('KTX: kỳ sai định dạng bị chặn', await G(TQT, 'POST', `/admin/ktx/nguoi/${nguoi1}/thu-tien`, {
    ky: '2026/09', so_tien: 100, ngay_thu: hom,
  }), 400);

  r = await G(TQT, 'GET', '/admin/ktx/tong-quan');
  kiem('KTX: thu xong còn 1 người nợ', r.j?.chua_dong?.length, 1);
  kiem('KTX: tổng thu tháng này đúng', r.j?.thu_thang_nay, 1_500_000);

  r = ghi('KTX: bảng công nợ theo tháng', await G(TQT, 'GET', `/admin/ktx/cong-no?tu=${kyNay}&den=${kyNay}`), 200);
  const dong1 = r.j?.bang?.find((x) => x.id === nguoi1);
  kiem('KTX: người đã đóng được đánh dấu đúng', dong1?.o?.[0]?.da_dong, true);
  const dong2 = r.j?.bang?.find((x) => x.id === nguoi2);
  kiem('KTX: người chưa đóng được đánh dấu đúng', dong2?.o?.[0]?.da_dong, false);

  ghi('KTX: xoá người ĐÃ CÓ khoản thu bị chặn', await G(TQT, 'DELETE', `/admin/ktx/nguoi/${nguoi1}`), 409);
  ghi('KTX: xoá toà còn người ở bị chặn', await G(TQT, 'DELETE', `/admin/ktx/toa/${toaA}`), 409);

  ghi('KTX: cho trả phòng', await G(TQT, 'PUT', `/admin/ktx/nguoi/${nguoi2}`, { trang_thai: 'da-tra' }), 200);
  r = await G(TQT, 'GET', `/admin/ktx/phong/${phongA}`);
  const daTra = r.j?.nguoi_o?.find((x) => x.id === nguoi2);
  kiem('KTX: trả phòng tự điền ngày ra', !!daTra?.ngay_ra, true);

  // Tiền KTX phải chảy vào báo cáo quỹ mà KHÔNG sinh phiếu (quyết định 17/09/2026).
  r = ghi('Quỹ: báo cáo gộp 3 nguồn', await G(TQT, 'GET', `/admin/quy/bao-cao?tu=${hom}&den=${hom}`), 200);
  const nguon = Object.fromEntries((r.j?.theo_nguon || []).map((x) => [x.nguon, x]));
  kiem('Quỹ: báo cáo có nguồn ktx', !!nguon.ktx, true);
  kiem('Quỹ: tổng thu = phiếu 6tr + ktx 1,5tr', r.j?.tong?.thu, 7_500_000);
  const [[demPhieu]] = await db.query('SELECT COUNT(*) n FROM quy_phieu WHERE org_id = ?', [orgA]);
  kiem('Quỹ: KHÔNG tự sinh phiếu từ tiền KTX (vẫn đúng 2 phiếu)', demPhieu.n, 2);

  // =================================================================
  // PHẦN 3 — ĐỀ BÀI
  // =================================================================
  r = ghi('Đề: giáo viên tạo được đề', await G(TGV, 'POST', '/admin/de-bai', {
    tieu_de: 'Kiểm tra giữa kỳ', loai: 'kiem-tra', thoi_gian_phut: 30, so_lan_lam: 1, diem_dat: 50,
  }), 200);
  const deId = r.j?.id;
  kiem('Đề: mã đề đúng dạng DE-xxxx', /^DE-\d{4}$/.test(r.j?.ma || ''), true);

  ghi('Đề: giao khi CHƯA phát hành bị chặn',
    await G(TGV, 'POST', `/admin/de-bai/${deId}/giao`, { class_id: lopA.insertId }), 400);
  ghi('Đề: phát hành khi chưa có câu hỏi bị chặn', await G(TGV, 'POST', `/admin/de-bai/${deId}/phat-hanh`), 400);

  // 5 dạng câu hỏi
  r = ghi('Đề: thêm câu MỘT đáp án', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'mot-dap-an', noi_dung: '你好 nghĩa là gì?', lua_chon: ['Xin chào', 'Tạm biệt', 'Cảm ơn'], dap_an: [0], diem: 2,
  }), 200);
  const cau1 = r.j?.id;
  r = ghi('Đề: thêm câu NHIỀU đáp án', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'nhieu-dap-an', noi_dung: 'Chọn các từ chỉ màu sắc', lua_chon: ['紅', '走', '藍', '吃'], dap_an: [0, 2], diem: 2,
  }), 200);
  const cau2 = r.j?.id;
  r = ghi('Đề: thêm câu ĐÚNG/SAI', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'dung-sai', noi_dung: '謝謝 nghĩa là cảm ơn', dap_an: [0], diem: 1,
  }), 200);
  const cau3 = r.j?.id;
  r = ghi('Đề: thêm câu ĐIỀN TỪ', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'dien-tu', noi_dung: 'Điền phiên âm của 我', dap_an: ['wǒ', 'wo'], diem: 2,
  }), 200);
  const cau4 = r.j?.id;
  r = ghi('Đề: thêm câu TỰ LUẬN', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'tu-luan', noi_dung: 'Viết một đoạn giới thiệu bản thân', diem: 3,
  }), 200);
  const cau5 = r.j?.id;

  ghi('Đề: câu trắc nghiệm KHÔNG có đáp án đúng bị chặn', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'mot-dap-an', noi_dung: 'x', lua_chon: ['a', 'b'], dap_an: [], diem: 1,
  }), 400);
  ghi('Đề: đáp án trỏ RA NGOÀI danh sách lựa chọn bị chặn', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'mot-dap-an', noi_dung: 'x', lua_chon: ['a', 'b'], dap_an: [5], diem: 1,
  }), 400);
  ghi('Đề: câu 1 lựa chọn bị chặn', await G(TGV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, {
    loai: 'mot-dap-an', noi_dung: 'x', lua_chon: ['a'], dap_an: [0], diem: 1,
  }), 400);

  ghi('Đề: phát hành', await G(TGV, 'POST', `/admin/de-bai/${deId}/phat-hanh`), 200);

  // --- Phân quyền giao đề: chỗ dễ thủng nhất ---
  ghi('Đề: GV giao vào lớp của GIÁO VIÊN KHÁC bị chặn',
    await G(TGV, 'POST', `/admin/de-bai/${deId}/giao`, { class_id: lopA2.insertId }), 403);
  r = ghi('Đề: GV giao vào lớp MÌNH phụ trách', await G(TGV, 'POST', `/admin/de-bai/${deId}/giao`, {
    class_id: lopA.insertId, ghi_chu: 'Làm trước thứ 6',
  }), 200);
  const giaoId = r.j?.ids?.[0];

  // --- Học sinh ---
  r = ghi('HS: thấy đề được giao', await G(THS, 'GET', '/de-bai/cua-toi'), 200);
  const deCuaToi = r.j?.de?.find((d) => d.de_id === deId);
  kiem('HS: đề hiện đúng số câu', deCuaToi?.so_cau, 5);
  kiem('HS: tổng điểm đúng', Number(deCuaToi?.tong_diem), 10);

  r = ghi('HS: bắt đầu làm bài', await G(THS, 'POST', `/de-bai/giao/${giaoId}/bat-dau`), 200);
  const baiLamId = r.j?.bai_lam_id;
  kiem('HS: server trả mốc hết hạn (đồng hồ tính ở server)', !!r.j?.het_han_luc, true);
  // ⚠️ PHÉP KIỂM QUAN TRỌNG NHẤT CỦA CẢ BỘ TEST
  const loDapAn = (r.j?.cau_hoi || []).some((c) => 'dap_an' in c || 'giai_thich' in c);
  kiem('HS: đề KHÔNG kèm đáp án (chống gian lận)', loDapAn, false);

  r = await G(THS, 'POST', `/de-bai/giao/${giaoId}/bat-dau`);
  kiem('HS: bấm bắt đầu lần 2 trả LẠI bài đang làm, không mở lượt mới', r.j?.bai_lam_id, baiLamId);

  r = ghi('HS: nộp bài', await G(THS, 'POST', `/de-bai/bai-lam/${baiLamId}/nop`, {
    bai_lam: {
      [cau1]: [0],        // đúng  (2đ)
      [cau2]: [0],        // thiếu 1 đáp án -> SAI (0đ)
      [cau3]: [0],        // đúng  (1đ)
      [cau4]: 'WO',       // đúng sau chuẩn hoá (2đ)
      [cau5]: 'Tôi tên là…',  // tự luận, chờ chấm tay
    },
  }), 200);
  kiem('HS: điểm máy chấm = 5 (2+0+1+2)', Number(r.j?.diem), 5);
  kiem('HS: tổng điểm = 10 (tính cả câu tự luận)', Number(r.j?.tong_diem), 10);
  kiem('HS: nhiều-đáp-án thiếu 1 ý thì KHÔNG được điểm', Number(r.j?.so_cau_dung), 3);
  kiem('HS: báo còn chờ chấm tay', r.j?.cho_cham_tay, true);

  ghi('HS: nộp LẠI bài đã nộp bị chặn', await G(THS, 'POST', `/de-bai/bai-lam/${baiLamId}/nop`, { bai_lam: {} }), 409);
  ghi('HS: làm lần 2 khi đề chỉ cho 1 lần bị chặn', await G(THS, 'POST', `/de-bai/giao/${giaoId}/bat-dau`), 409);

  r = ghi('HS: xem lại bài đã làm', await G(THS, 'GET', `/de-bai/bai-lam/${baiLamId}`), 200);
  kiem('HS: đề cấu hình "hiện đáp án ngay" thì được xem đáp án', r.j?.cho_xem_dap_an, true);

  ghi('HS khác KHÔNG xem được bài làm của bạn', await G(THS2, 'GET', `/de-bai/bai-lam/${baiLamId}`), 404);

  // Ghi sang exercise_results để lên trang Tiến độ
  const [[er]] = await db.query("SELECT COUNT(*) n FROM exercise_results WHERE user_id = ? AND lesson_id = ?", [hsA, `de:${deId}`]);
  kiem('HS: có ghi 1 dòng sang exercise_results (lên trang Tiến độ)', er.n, 1);

  // --- Giáo viên chấm ---
  r = ghi('GV: xem bảng kết quả cả lớp', await G(TGV, 'GET', `/admin/de-bai/${deId}/ket-qua`), 200);
  kiem('GV: 1 em đã làm, 1 em chưa', [r.j?.ket_qua?.length, r.j?.chua_lam?.length], [1, 1]);
  const cauSaiNhat = r.j?.thong_ke_cau?.[0];
  kiem('GV: thống kê chỉ ra đúng câu bị sai', cauSaiNhat?.id, cau2);

  r = ghi('GV: chấm tay câu tự luận', await G(TGV, 'POST', `/admin/de-bai-lam/${baiLamId}/cham`, {
    diem_tu_luan: { [cau5]: 3 }, nhan_xet: 'Viết tốt, chú ý dấu câu.',
  }), 200);
  kiem('GV: chấm xong điểm = 5 + 3 = 8', Number(r.j?.diem), 8);

  r = await G(TGV, 'POST', `/admin/de-bai-lam/${baiLamId}/cham`, { diem_tu_luan: { [cau5]: 2 } });
  kiem('GV: chấm LẠI không cộng dồn (5+2=7)', Number(r.j?.diem), 7);

  r = ghi('GV: cho điểm tự luận VƯỢT thang bị ép về tối đa',
    await G(TGV, 'POST', `/admin/de-bai-lam/${baiLamId}/cham`, { diem_tu_luan: { [cau5]: 999 } }), 200);
  kiem('GV: điểm bị ép về 5+3=8', Number(r.j?.diem), 8);

  // --- Chuông thông báo ---
  r = ghi('HS: chuông có thông báo', await G(THS, 'GET', '/exercise/notifications'), 200);
  const tbDe = (r.j?.notifications || []).filter((n) => n.type === 'de-bai');
  kiem('HS: chuông có cả tin GIAO ĐỀ lẫn tin ĐÃ CHẤM', new Set(tbDe.map((x) => x.topic)), new Set(['giao', 'cham']));
  const tinCham = tbDe.find((x) => x.topic === 'cham');
  kiem('HS: tin đã chấm đang là CHƯA ĐỌC', tinCham?.read_at, null);
  ghi('HS: đánh dấu đã đọc', await G(THS, 'POST', `/exercise/notifications/de-bai/${tinCham?.id}/read`), 200);
  r = await G(THS, 'GET', '/exercise/notifications');
  const tinCham2 = (r.j?.notifications || []).find((n) => n.type === 'de-bai' && n.topic === 'cham');
  kiem('HS: sau khi bấm thì thành đã đọc', !!tinCham2?.read_at, true);

  // =================================================================
  // PHẦN 4 — PHÂN QUYỀN & CÁCH LY
  // =================================================================
  ghi('GV KHÔNG vào được sổ quỹ', await G(TGV, 'GET', '/admin/quy/phieu'), 403);
  ghi('GV KHÔNG vào được ký túc xá', await G(TGV, 'GET', '/admin/ktx/tong-quan'), 403);
  ghi('HS KHÔNG vào được sổ quỹ', await G(THS, 'GET', '/admin/quy/phieu'), 403);
  ghi('HS KHÔNG vào được khu đề bài của giáo viên', await G(THS, 'GET', '/admin/de-bai'), 403);
  ghi('Khách (không token) bị chặn', await G(null, 'GET', '/admin/quy/phieu'), 401);

  r = ghi('Trung tâm B KHÔNG thấy phiếu của A', await G(TQTB, 'GET', '/admin/quy/phieu'), 200);
  kiem('Trung tâm B thấy 0 phiếu', r.j?.phieu?.length, 0);
  r = ghi('Trung tâm B KHÔNG thấy toà của A', await G(TQTB, 'GET', '/admin/ktx/toa'), 200);
  kiem('Trung tâm B thấy 0 toà', r.j?.toa?.length, 0);
  ghi('Trung tâm B KHÔNG sửa được phiếu của A', await G(TQTB, 'PUT', `/admin/quy/phieu/${phieuThu}`, { so_tien: 1 }), 404);
  ghi('Trung tâm B KHÔNG xem được đề của A', await G(TQTB, 'GET', `/admin/de-bai/${deId}`), 403);

  r = ghi('GV2 KHÔNG thấy đề của GV1 trong danh sách', await G(TGV2, 'GET', '/admin/de-bai'), 200);
  kiem('GV2 thấy 0 đề', r.j?.de?.length, 0);
  ghi('GV2 KHÔNG mở được đề của GV1', await G(TGV2, 'GET', `/admin/de-bai/${deId}`), 403);
  ghi('GV2 KHÔNG sửa được câu hỏi của GV1', await G(TGV2, 'PUT', `/admin/de-cau-hoi/${cau1}`, {
    loai: 'mot-dap-an', noi_dung: 'hack', lua_chon: ['a', 'b'], dap_an: [1], diem: 1,
  }), 403);
  r = ghi('Quản trị trung tâm THÌ mở được đề của giáo viên mình', await G(TQT, 'GET', `/admin/de-bai/${deId}`), 200);
  kiem('Quản trị thấy đủ 5 câu', r.j?.cau_hoi?.length, 5);

  ghi('HS2 (cùng lớp) cũng được giao đề', await G(THS2, 'GET', '/de-bai/cua-toi'), 200);
  ghi('Xoá đề ĐÃ CÓ bài nộp bị chặn', await G(TGV, 'DELETE', `/admin/de-bai/${deId}`), 409);
} catch (err) {
  buoc.push({ ten: '💥 NỔ GIỮA CHỪNG', s: err.message, mong: '—', dat: false, msg: err.stack?.split('\n')[1] || '' });
} finally {
  // Dọn theo đúng thứ tự khoá ngoại; CASCADE lo phần con.
  for (const o of [orgA, orgB]) {
    if (!o) continue;
    const [us] = await db.query('SELECT id FROM users WHERE org_id = ?', [o]);
    const ids = us.map((x) => x.id);
    await db.query('DELETE t FROM ktx_thu_tien t JOIN ktx_o o ON o.id=t.o_id JOIN ktx_phong p ON p.id=o.phong_id JOIN ktx_toa toa ON toa.id=p.toa_id WHERE toa.org_id = ?', [o]);
    await db.query('DELETE FROM ktx_toa WHERE org_id = ?', [o]);
    await db.query('DELETE FROM quy_phieu WHERE org_id = ?', [o]);
    await db.query('DELETE FROM quy_danh_muc WHERE org_id = ?', [o]);
    await db.query('DELETE FROM de_bai WHERE org_id = ?', [o]);
    if (ids.length) {
      await db.query('DELETE FROM exercise_results WHERE user_id IN (?)', [ids]);
      await db.query('DELETE FROM class_enrollments WHERE user_id IN (?)', [ids]);
    }
    await db.query('DELETE FROM classes WHERE org_id = ?', [o]);
    await db.query('DELETE FROM users WHERE org_id = ?', [o]);
    await db.query('DELETE FROM organizations WHERE id = ?', [o]);
  }
}

const [[{ sot }]] = await db.query(
  `SELECT (SELECT COUNT(*) FROM organizations WHERE ma LIKE ?)
        + (SELECT COUNT(*) FROM users WHERE email LIKE ?) AS sot`, [`${MA}%`, `%${MA}%`]);
await db.end();

for (const b of buoc) {
  console.log(`${b.dat ? '✅' : '❌'} ${b.ten.padEnd(58)} ${String(b.s).padEnd(14)} (mong ${b.mong}) ${b.msg || ''}`);
}
const dat = buoc.filter((b) => b.dat).length;
console.log(`\n🧹 Dọn dẹp: còn sót ${sot} bản ghi (phải là 0)`);
console.log(`QUỸ · KTX · ĐỀ BÀI: ${dat}/${buoc.length} bước đạt`);
process.exit(dat === buoc.length && sot === 0 ? 0 : 1);
