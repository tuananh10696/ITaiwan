// Kiểm thử: hồ sơ du học theo MẪU KHÁCH (2026-10-03).
//   PORT=3099 TAT_GIOI_HAN=true node server/index.js &  rồi:  TEST_PORT=3099 node tests/du-hoc-mau-khach.test.mjs
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pool from '../server/config/db.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'dhkhach' + Math.random().toString(36).slice(2, 7);
const ketQua = [];
const kiem = (ten, dat, chiTiet = '') => ketQua.push({ ten, dat: !!dat, chiTiet });
const ngu = (ms) => new Promise((r) => setTimeout(r, ms));

async function G(token, method, path, body) {
  const h = { 'Content-Type': 'application/json' };
  if (token) h.Authorization = `Bearer ${token}`;
  const r = await fetch(B + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  let j = null; try { j = await r.json(); } catch {}
  return { s: r.status, j };
}

const COT_KHACH = [
  'ho_ten', 'ten_trung', 'ngay_sinh', 'cccd', 'ho_chieu', 'dia_chi',
  'diem_lop10', 'diem_lop11', 'diem_lop12', 'truong_tn', 'trinh_do_tieng', 'email', 'phone',
  'bo_ten', 'bo_cccd', 'bo_ngay_sinh', 'bo_nghe', 'bo_phone',
  'me_ten', 'me_cccd', 'me_ngay_sinh', 'me_nghe', 'me_phone',
  'nganh', 'he_nguyen_vong', 'qua_trinh_lam_viec',
  'truong_nv1', 'truong_nv2', 'truong_nv3', 'ktx_dang_ky',
];

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
const QT = tok(ad.id);
let uid = null;
const phu = [];   // tài khoản phụ tạo trong test, dọn ở finally

try {
  const tao = await G(QT, 'POST', '/admin/users', { email: `${MA}@local.invalid`, name: 'HS Mau Khach', password: '123456', role: 'student' });
  uid = tao.j?.id;
  await ngu(600);
  const HS = tok(uid);

  // 1. Bộ ô trả về đúng mẫu khách
  const me = await G(HS, 'GET', '/du-hoc/ho-so-cua-toi');
  const nhan = me.j?.nhan_cot || {};
  kiem('nhan_cot có đủ 25 ô mẫu khách + nguyện vọng + KTX', COT_KHACH.every((c) => nhan[c]), Object.keys(nhan).join(','));
  kiem('Mọi nhãn là tiếng Việt, không lộ tên cột', Object.values(nhan).every((v) => !/_/.test(v)));
  kiem('Có nhãn tiếng Việt cho cột cũ (lien_lac_khac)', nhan.lien_lac_khac === 'Liên lạc khác (Zalo/Facebook)');
  kiem('Họ tên tiếng Trung KHÔNG bắt buộc', !(me.j?.bat_buoc || []).includes('ten_trung'));
  const thu = await G(tok(uid), 'PUT', '/du-hoc/khai-bao', { lien_lac_khac: 'zalo', gioi_tinh: 'nam' });
  const [[cu]] = await pool.query('SELECT lien_lac_khac, gioi_tinh FROM du_hoc_ho_so WHERE user_id = ?', [uid]);
  kiem('Cột cũ vẫn KHÔNG ghi được dù có nhãn', thu.s === 200 && cu.lien_lac_khac === null && cu.gioi_tinh === null);
  kiem('Bắt buộc: họ tên, ngày sinh, SĐT, ngành nguyện vọng', JSON.stringify(me.j?.bat_buoc) === JSON.stringify(['ho_ten', 'ngay_sinh', 'phone', 'nganh']));

  // 2. Lưu nháp đủ ô + chèn ô cấm
  const dl = {
    ho_ten: 'Nguyễn Văn A', ten_trung: '阮文A', ngay_sinh: '2005-03-15', cccd: '001205000001', ho_chieu: 'C1234567',
    dia_chi: 'Số 1, Hà Nội', diem_lop10: '8.1', diem_lop11: '8,2', diem_lop12: '8.35', truong_tn: 'THPT Chu Văn An',
    trinh_do_tieng: 'Chưa thi, đã học tiếng Trung 8 tháng', email: 'a@x.vn', phone: '0912345678',
    bo_ten: 'Nguyễn Văn B', bo_cccd: '001170000001', bo_ngay_sinh: '1970-01-01', bo_nghe: 'Kỹ sư', bo_phone: '0911111111',
    me_ten: 'Trần Thị C', me_cccd: '001172000002', me_ngay_sinh: '1972-12-31', me_nghe: 'Giáo viên', me_phone: '0922222222',
    qua_trinh_lam_viec: 'Dòng 1\nDòng 2',
    truong_nv1: 'NCKU', truong_nv2: 'NTU', truong_nv3: 'NTNU', ktx_dang_ky: 'co', ktx_loai: 'Phòng 4 người', ktx_ghi_chu: 'Gần trường',   // 2 ô sau KHÔNG được ghi (đã bỏ khỏi form)
    gioi_tinh: 'nam', ph_ten: 'X', tong_phi: 999, buoc: 'visa',
  };
  const luu = await G(HS, 'PUT', '/du-hoc/khai-bao', dl);
  kiem('Lưu nháp OK', luu.s === 200, JSON.stringify(luu.j));
  const [[db]] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE user_id = ?', [uid]);
  kiem('Hai ô ký túc xá đã bỏ (loại phòng, yêu cầu thêm) KHÔNG ghi được, "Đăng ký ký túc xá" vẫn ghi được',
    db.ktx_loai === null && db.ktx_ghi_chu === null && db.ktx_dang_ky === 'co');
  kiem('Ô cấm không ghi được (gioi_tinh/ph_ten/tong_phi/buoc)',
    db.gioi_tinh === null && db.ph_ten === null && Number(db.tong_phi) === 0 && db.buoc !== 'visa');
  const sau = (await G(HS, 'GET', '/du-hoc/ho-so-cua-toi')).j?.khai || {};
  const lech = COT_KHACH.filter((c) => c !== 'nganh' && c !== 'he_nguyen_vong' && String(sau[c] ?? '') !== String(dl[c] ?? ''));
  kiem('Đọc lại đúng mọi ô (kể cả 3 ngày sinh, không lệch múi giờ)', !lech.length, lech.map((c) => `${c}: ${sau[c]} != ${dl[c]}`).join(' | '));

  // 3. Gửi khi thiếu ngành nguyện vọng -> 400
  const thieu = await G(HS, 'POST', '/du-hoc/gui-khai-bao', {});
  kiem('Gửi thiếu ngành nguyện vọng -> 400', thieu.s === 400 && /ngành nguyện vọng/i.test(thieu.j?.error || ''), JSON.stringify(thieu.j));

  // 4. Độ dài: điểm > 10 ký tự bị cắt, quá trình làm việc dài 1500 ký tự vẫn lưu
  const dai = 'x'.repeat(1500);
  const r4 = await G(HS, 'PUT', '/du-hoc/khai-bao', { diem_lop10: '12345678901234', qua_trinh_lam_viec: dai, nganh: 'Quản trị kinh doanh' });
  const [[db4]] = await pool.query('SELECT diem_lop10, qua_trinh_lam_viec FROM du_hoc_ho_so WHERE user_id = ?', [uid]);
  kiem('Ô điểm dài bị cắt 10 ký tự, không lỗi DB', r4.s === 200 && db4.diem_lop10 === '1234567890', JSON.stringify(r4.j));
  kiem('Quá trình làm việc 1500 ký tự lưu đủ', db4.qua_trinh_lam_viec?.length === 1500);

  // 5. Gửi chốt OK
  const gui = await G(HS, 'POST', '/du-hoc/gui-khai-bao', {});
  kiem('Gửi chốt khi đủ bắt buộc -> 200', gui.s === 200, JSON.stringify(gui.j));

  // 6. Yêu cầu sửa ô mới (bố) -> nhãn đúng
  const yc = await G(HS, 'POST', '/du-hoc/yeu-cau-sua', { thay_doi: { bo_nghe: 'Bác sĩ' }, ly_do: 'Bố đổi nghề' });
  kiem('Yêu cầu sửa ô "Nghề nghiệp của bố" -> 201', yc.s === 201, JSON.stringify(yc.j));
  const [[ycRow]] = await pool.query('SELECT id, thay_doi FROM du_hoc_yeu_cau_sua WHERE ho_so_id = ? ORDER BY id DESC LIMIT 1', [db.id]);
  kiem('Nhãn yêu cầu sửa = "Nghề nghiệp của bố"', JSON.parse(ycRow.thay_doi)[0]?.nhan === 'Nghề nghiệp của bố');

  // 7. Admin sửa ô mới + đọc chi tiết
  const put = await G(QT, 'PUT', `/admin/du-hoc/ho-so/${db.id}`, { me_nghe: 'Nội trợ', diem_lop12: '9.0', me_ngay_sinh: '1973-06-20', ho_ten: 'Nguyễn Văn A' });
  kiem('Admin PUT ô mới -> 200', put.s === 200, JSON.stringify(put.j));
  const ct = await G(QT, 'GET', `/admin/du-hoc/ho-so/${db.id}`);
  const h = ct.j?.ho_so || ct.j;
  kiem('Admin đọc lại me_nghe / diem_lop12', h?.me_nghe === 'Nội trợ' && h?.diem_lop12 === '9.0', JSON.stringify({ me: h?.me_nghe, d: h?.diem_lop12 }));
  const [[db7]] = await pool.query('SELECT truong_nv1, gioi_tinh, DATE_FORMAT(me_ngay_sinh, "%Y-%m-%d") ns FROM du_hoc_ho_so WHERE id = ?', [db.id]);
  kiem('Admin lưu ngày sinh mẹ đúng ngày', db7.ns === '1973-06-20', db7.ns);

  // 8. Duyệt yêu cầu sửa ô mới áp dụng được
  const duyet = await G(QT, 'POST', `/admin/du-hoc/yeu-cau-sua/${ycRow.id}/duyet`, { dong_y: true });
  const [[db8]] = await pool.query('SELECT bo_nghe FROM du_hoc_ho_so WHERE id = ?', [db.id]);
  kiem('Duyệt yêu cầu sửa -> bo_nghe = Bác sĩ', db8.bo_nghe === 'Bác sĩ', `status=${duyet.s} ${JSON.stringify(duyet.j)}`);
  // 9. Ô "Hệ" nguyện vọng (2026-10-06): tối đa 2, mã lạ bị bỏ, lưu theo thứ tự cố định
  const heDb = async () => (await pool.query('SELECT he_nguyen_vong FROM du_hoc_ho_so WHERE id = ?', [db.id]))[0][0].he_nguyen_vong;
  kiem('nhãn "Ngành nguyện vọng" + "Hệ nguyện vọng"', (await G(HS, 'GET', '/du-hoc/ho-so-cua-toi')).j?.nhan_cot?.nganh === 'Ngành nguyện vọng'
    && (await G(HS, 'GET', '/du-hoc/ho-so-cua-toi')).j?.nhan_cot?.he_nguyen_vong === 'Hệ nguyện vọng');
  // Hồ sơ đã gửi (bước 5) nên ghi trực tiếp bằng DB để thử riêng phần chuẩn hoá của PUT khai-bao
  await pool.query('UPDATE du_hoc_ho_so SET hs_gui_luc = NULL WHERE id = ?', [db.id]);
  await G(HS, 'PUT', '/du-hoc/khai-bao', { he_nguyen_vong: 'he-ngon-ngu,he-1-4' });
  kiem('Lưu 2 hệ theo thứ tự cố định (không theo thứ tự gửi)', (await heDb()) === 'he-1-4,he-ngon-ngu', await heDb());
  await G(HS, 'PUT', '/du-hoc/khai-bao', { he_nguyen_vong: 'he-1-4,he-tu-tuc,he-thac-si' });
  kiem('Gửi 3 hệ -> server chỉ giữ tối đa 2', (await heDb()).split(',').length === 2, await heDb());
  await G(HS, 'PUT', '/du-hoc/khai-bao', { he_nguyen_vong: 'khong-co,he-hoa-kieu,he-hoa-kieu' });
  kiem('Mã lạ bị bỏ, mã trùng chỉ tính một', (await heDb()) === 'he-hoa-kieu', await heDb());
  await G(HS, 'PUT', '/du-hoc/khai-bao', { he_nguyen_vong: '' });
  kiem('Bỏ chọn hết -> NULL', (await heDb()) === null);
  await G(HS, 'PUT', '/du-hoc/khai-bao', { he_nguyen_vong: 'he-tu-tuc' });
  const sauHe = (await G(HS, 'GET', '/du-hoc/ho-so-cua-toi')).j?.khai?.he_nguyen_vong;
  kiem('Đọc lại hệ đúng', sauHe === 'he-tu-tuc', String(sauHe));
  const ctHe = await G(QT, 'GET', `/admin/du-hoc/ho-so/${db.id}`);
  kiem('Admin đọc được hệ học sinh chọn', (ctHe.j?.ho_so || ctHe.j)?.he_nguyen_vong === 'he-tu-tuc');
  const putHe = await G(QT, 'PUT', `/admin/du-hoc/ho-so/${db.id}`, { he_nguyen_vong: 'he-thac-si,he-1-4,he-tu-tuc' });
  kiem('Admin sửa hệ -> 200, cũng giới hạn 2 (giữ 2 hệ đứng trước trong danh sách) và đúng thứ tự', putHe.s === 200 && (await heDb()) === 'he-1-4,he-tu-tuc', `${putHe.s} ${await heDb()}`);
  // Yêu cầu sửa sau khi gửi: đổi hệ thành chính nó (khác thứ tự) không phải một thay đổi
  await G(HS, 'POST', '/du-hoc/gui-khai-bao', {});
  const ycGiong = await G(HS, 'POST', '/du-hoc/yeu-cau-sua', { thay_doi: { he_nguyen_vong: 'he-tu-tuc,he-1-4' }, ly_do: 'thử' });
  kiem('Yêu cầu sửa hệ trùng giá trị cũ (chỉ khác thứ tự) -> 400', ycGiong.s === 400, JSON.stringify(ycGiong.j));
  const ycHe = await G(HS, 'POST', '/du-hoc/yeu-cau-sua', { thay_doi: { he_nguyen_vong: 'he-hoa-kieu' }, ly_do: 'đổi ý' });
  kiem('Yêu cầu sửa hệ khác -> 201', ycHe.s === 201, JSON.stringify(ycHe.j));
  const [[ycHeRow]] = await pool.query('SELECT id FROM du_hoc_yeu_cau_sua WHERE ho_so_id = ? AND trang_thai = "cho" ORDER BY id DESC LIMIT 1', [db.id]);
  await G(QT, 'POST', `/admin/du-hoc/yeu-cau-sua/${ycHeRow.id}/duyet`, { dong_y: true });
  kiem('Duyệt yêu cầu sửa hệ -> áp dụng', (await heDb()) === 'he-hoa-kieu', await heDb());

  // 10. Người tư vấn (2026-10-07): học sinh chọn trong danh sách sale; id lạ bị bỏ
  const taoNv = async (role, hau = '') => {
    const [r] = await pool.query(
      "INSERT INTO users (name, email, password_hash, role, is_admin, is_verified, is_approved) VALUES (?,?,?,?,0,1,1)",
      [`NV ${role} ${MA}${hau}`, `${role}-${MA}${hau}@local.invalid`, 'x', role]);
    phu.push(r.insertId); return r.insertId;
  };
  const sale1 = await taoNv('sale');
  const gv = await taoNv('teacher');
  const tvDb = async () => (await pool.query('SELECT tu_van_id FROM du_hoc_ho_so WHERE id = ?', [db.id]))[0][0].tu_van_id;
  const ds = (await G(HS, 'GET', '/du-hoc/ho-so-cua-toi')).j?.danh_sach_tu_van || [];
  kiem('Danh sách người tư vấn có sale, không có giáo viên, chỉ id + tên',
    ds.some((u) => u.id === sale1) && !ds.some((u) => u.id === gv) && ds.every((u) => Object.keys(u).sort().join() === 'id,name'), JSON.stringify(ds));
  kiem('Có nhãn "Người tư vấn"', (await G(HS, 'GET', '/du-hoc/ho-so-cua-toi')).j?.nhan_cot?.tu_van_id === 'Người tư vấn');
  await pool.query('UPDATE du_hoc_ho_so SET hs_gui_luc = NULL, tu_van_id = NULL WHERE id = ?', [db.id]);
  await G(HS, 'PUT', '/du-hoc/khai-bao', { tu_van_id: String(gv) });
  kiem('Chọn giáo viên làm người tư vấn -> bị bỏ qua', (await tvDb()) === null, String(await tvDb()));
  await G(HS, 'PUT', '/du-hoc/khai-bao', { tu_van_id: 'abc' });
  kiem('Id không phải số -> bị bỏ qua', (await tvDb()) === null);
  await G(HS, 'PUT', '/du-hoc/khai-bao', { tu_van_id: String(sale1) });
  kiem('Chọn sale -> lưu được', (await tvDb()) === sale1, String(await tvDb()));
  const me10 = (await G(HS, 'GET', '/du-hoc/ho-so-cua-toi')).j;
  kiem('Đọc lại: khai.tu_van_id đúng + thẻ "Người tư vấn của bạn" ra đúng sale', me10?.khai?.tu_van_id === sale1 && me10?.tu_van?.name === `NV sale ${MA}`, JSON.stringify(me10?.tu_van));
  await G(HS, 'PUT', '/du-hoc/khai-bao', { tu_van_id: '' });
  kiem('Bỏ chọn -> NULL', (await tvDb()) === null);
  await G(HS, 'PUT', '/du-hoc/khai-bao', { tu_van_id: sale1 });
  await G(HS, 'POST', '/du-hoc/gui-khai-bao', {});
  const sale2 = await taoNv('sale', 'B');
  const ycTv = await G(HS, 'POST', '/du-hoc/yeu-cau-sua', { thay_doi: { tu_van_id: String(sale2) }, ly_do: 'đổi người tư vấn' });
  kiem('Yêu cầu sửa người tư vấn -> 201', ycTv.s === 201, JSON.stringify(ycTv.j));
  const [[ycTvRow]] = await pool.query('SELECT id, thay_doi FROM du_hoc_yeu_cau_sua WHERE ho_so_id = ? AND trang_thai = "cho" ORDER BY id DESC LIMIT 1', [db.id]);
  const muc = JSON.parse(ycTvRow.thay_doi)[0];
  kiem('Yêu cầu sửa lưu id + tên cũ/mới', muc?.moi === sale2 && muc?.cu === sale1 && muc?.moi_ten === `NV sale ${MA}B` && muc?.cu_ten === `NV sale ${MA}`, JSON.stringify(muc));
  await G(QT, 'POST', `/admin/du-hoc/yeu-cau-sua/${ycTvRow.id}/duyet`, { dong_y: true });
  kiem('Duyệt -> tu_van_id đổi sang sale mới', (await tvDb()) === sale2, String(await tvDb()));
} catch (e) {
  kiem('Không lỗi bất ngờ', false, e.stack);
} finally {
  if (uid) {
    const [[hs]] = await pool.query('SELECT id FROM du_hoc_ho_so WHERE user_id = ?', [uid]);
    if (hs) {
      for (const b of ['du_hoc_yeu_cau_sua', 'du_hoc_lich_su', 'du_hoc_giay_to', 'du_hoc_thong_bao']) {
        await pool.query(`DELETE FROM ${b} WHERE ho_so_id = ?`, [hs.id]).catch(() => {});
      }
      await pool.query('DELETE FROM du_hoc_ho_so WHERE id = ?', [hs.id]);
    }
    await pool.query('DELETE FROM users WHERE id = ?', [uid]).catch(() => {});
  }
  for (const id of phu) await pool.query('DELETE FROM users WHERE id = ?', [id]).catch(() => {});
  for (const k of ketQua) console.log(`${k.dat ? '✅' : '❌'} ${k.ten}${k.dat ? '' : ' — ' + k.chiTiet}`);
  const hong = ketQua.filter((k) => !k.dat).length;
  console.log(`\n${ketQua.length - hong}/${ketQua.length} đạt`);
  await pool.end();
  process.exit(hong ? 1 : 0);
}
