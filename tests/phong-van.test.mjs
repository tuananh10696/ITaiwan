// =============================================================
// KIỂM THỬ BƯỚC PHỎNG VẤN — trường / VP Đài Bắc / cả 2  (2026-09-27)
// =============================================================
//   npm run test:phong-van   (cần `npm run server:test` đang chạy + DB local đã migrate)
//
// Trả lời ba câu hỏi:
//   1. Đậu ĐỦ các buổi cần có thì hồ sơ có tự sang "Xin visa" không — và CHỈ khi đó.
//   2. Những lần lưu KHÔNG đổi gì ở phỏng vấn (sửa số điện thoại, lưu lại form) có vô tình đẩy
//      hồ sơ đi, hay gửi lại thông báo "đã xếp lịch" cho học sinh không.
//   3. Danh sách / tổng quan có trả đủ dữ liệu của buổi VP Đài Bắc không.
// =============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../server/config/db.js';
import { tinhPhongVan, loaiPv } from '../shared/phong-van.js';

const B = `http://localhost:${process.env.TEST_PORT || 3001}/api`;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });
const MA = 'pvtest-' + Math.random().toString(36).slice(2, 8);

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
if (!ad) { console.error('❌ DB chưa có tài khoản quản trị — chạy `npm run db:init` trước.'); process.exit(1); }
const T = tok(ad.id);

let ok = 0;
const hong = [];
const dat = (moTa, dk) => {
  if (dk) { ok += 1; console.log(`  ✅ ${moTa}`); } else { hong.push(moTa); console.log(`  ❌ ${moTa}`); }
};
async function goi(method, duong, body) {
  const r = await fetch(B + duong, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${T}` },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  let j = null;
  try { j = await r.json(); } catch { /* rỗng */ }
  return { ma: r.status, j };
}
const buocCua = async (id) => (await pool.query('SELECT buoc FROM du_hoc_ho_so WHERE id = ?', [id]))[0][0]?.buoc;
const soThongBao = async (id) => (await pool.query('SELECT COUNT(*) AS n FROM du_hoc_thong_bao WHERE ho_so_id = ?', [id]))[0][0].n;
const ngaySau = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

// Học viên có tài khoản để kiểm thông báo.
const hash = await bcrypt.hash('x'.repeat(12), 10);
const [u] = await pool.query(
  `INSERT INTO users (name, email, password_hash, role, is_verified, is_approved, avatar_letter)
   VALUES (?, ?, ?, 'student', 1, 1, 'P')`, [`HV ${MA}`, `hv.${MA}@local.invalid`, hash]);
const hvId = u.insertId;

console.log('\n── 0. Quy tắc dùng chung (shared/phong-van.js) ──────────');
{
  dat('chưa chọn + chưa nhập gì -> chưa có loại', loaiPv({}) === null);
  dat('hồ sơ cũ chỉ có phỏng vấn trường -> suy ra "truong"', loaiPv({ ngay_phong_van: '2026-10-01' }) === 'truong');
  dat('có cả hai buổi -> suy ra "ca-hai"', loaiPv({ kq_phong_van: 'dau', ngay_pv_vp: '2026-10-01' }) === 'ca-hai');
  const p = tinhPhongVan({ loai_phong_van: 'ca-hai', kq_phong_van: 'dau', ngay_pv_vp: '2026-10-10' });
  dat('cả 2: đậu 1/2, chưa đủ', p.tong === 2 && p.dau === 1 && !p.du);
  dat('buổi VP có ngày chưa kết quả -> "hen"', p.buoi[1].trang_thai === 'hen');
  dat('chỉ VP + đậu -> đủ', tinhPhongVan({ loai_phong_van: 'vp', kq_pv_vp: 'dau' }).du);
  dat('chọn "truong" thì dữ liệu VP cũ không tính', tinhPhongVan({ loai_phong_van: 'truong', kq_phong_van: 'dau', kq_pv_vp: 'truot' }).du);
}

console.log('\n── 1. Tự chuyển sang "Xin visa" khi đậu đủ ─────────────');
const { j: tao } = await goi('POST', '/admin/du-hoc/ho-so', { ho_ten: `Học sinh ${MA}`, ma_hs: `HS-${MA}-1`, user_id: hvId });
const id = tao?.id;
dat(`tạo hồ sơ (${id})`, !!id);
await goi('POST', `/admin/du-hoc/ho-so/${id}/buoc`, { buoc: 'phong-van' });
{
  const r = await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { loai_phong_van: 'ca-hai' });
  dat(`chọn "Cả 2" (${r.ma})`, r.ma === 200 && !r.j?.tu_chuyen_buoc);
  const r2 = await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { kq_phong_van: 'dau' });
  dat('đậu trường (1/2) -> CHƯA chuyển', !r2.j?.tu_chuyen_buoc && (await buocCua(id)) === 'phong-van');
  const r3 = await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { kq_pv_vp: 'dau' });
  dat('đậu nốt VP Đài Bắc (2/2) -> tự chuyển', r3.j?.tu_chuyen_buoc === 'visa' && (await buocCua(id)) === 'visa');
  const [[ls]] = await pool.query(
    "SELECT noi_dung FROM du_hoc_lich_su WHERE ho_so_id = ? AND loai = 'buoc' ORDER BY id DESC LIMIT 1", [id]);
  dat('lịch sử ghi rõ là tự chuyển', /tự chuyển/.test(ls?.noi_dung || ''));
  const [[tb]] = await pool.query(
    "SELECT tieu_de FROM du_hoc_thong_bao WHERE ho_so_id = ? AND loai = 'buoc' ORDER BY id DESC LIMIT 1", [id]);
  dat('học sinh được báo chuyển bước', /Xin visa/.test(tb?.tieu_de || ''));
}

console.log('\n── 2. KHÔNG tự chuyển khi không nên ────────────────────');
{
  // Kéo lùi về "Phỏng vấn" để phỏng vấn lại: phải ở lại được.
  await goi('POST', `/admin/du-hoc/ho-so/${id}/buoc`, { buoc: 'phong-van' });
  dat('chuyển bước tay về "Phỏng vấn" -> ở lại (kết quả cũ vẫn là đậu)', (await buocCua(id)) === 'phong-van');
  // Lưu lại cả form (gửi kèm mọi ô phỏng vấn KHÔNG đổi) + sửa số điện thoại.
  const [[h]] = await pool.query('SELECT * FROM du_hoc_ho_so WHERE id = ?', [id]);
  await goi('PUT', `/admin/du-hoc/ho-so/${id}`, {
    phone: '0900000000', loai_phong_van: h.loai_phong_van, kq_phong_van: h.kq_phong_van,
    kq_pv_vp: h.kq_pv_vp, ngay_phong_van: '', ngay_pv_vp: '',
  });
  dat('lưu form không đổi ô phỏng vấn nào -> vẫn ở "Phỏng vấn"', (await buocCua(id)) === 'phong-van');
}
{
  const { j } = await goi('POST', '/admin/du-hoc/ho-so', { ho_ten: `Học sinh ${MA} 2`, ma_hs: `HS-${MA}-2` });
  await goi('POST', `/admin/du-hoc/ho-so/${j.id}/buoc`, { buoc: 'hoc' });
  const r = await goi('PUT', `/admin/du-hoc/ho-so/${j.id}`, { loai_phong_van: 'truong', kq_phong_van: 'dau' });
  dat('đang ở "Học" mà đậu -> KHÔNG nhảy cóc sang visa', !r.j?.tu_chuyen_buoc && (await buocCua(j.id)) === 'hoc');
  await goi('POST', `/admin/du-hoc/ho-so/${j.id}/buoc`, { buoc: 'phong-van' });
  const r2 = await goi('PUT', `/admin/du-hoc/ho-so/${j.id}`, { kq_phong_van: 'truot' });
  dat('trượt -> không chuyển', !r2.j?.tu_chuyen_buoc && (await buocCua(j.id)) === 'phong-van');
  const r3 = await goi('PUT', `/admin/du-hoc/ho-so/${j.id}`, { loai_phong_van: 'vp', kq_pv_vp: 'dau' });
  dat('đổi sang "chỉ VP" + đậu VP -> tự chuyển (trượt trường không còn tính)',
    r3.j?.tu_chuyen_buoc === 'visa' && (await buocCua(j.id)) === 'visa');
  const r4 = await goi('PUT', `/admin/du-hoc/ho-so/${j.id}`, { loai_phong_van: 'khong-hop-le' });
  dat(`loại không hợp lệ không làm hỏng request (${r4.ma})`, r4.ma === 200);
}

console.log('\n── 3. Không gửi lại thông báo khi ngày không đổi ───────');
{
  const ngay = ngaySau(9);
  await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { ngay_pv_vp: ngay, ngay_phong_van: ngay });
  const truoc = await soThongBao(id);
  await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { ngay_pv_vp: ngay, ngay_phong_van: ngay, phone: '0911111111' });
  const sau = await soThongBao(id);
  dat(`lưu lại cùng ngày -> không thêm thông báo (${truoc} -> ${sau})`, truoc === sau);
  await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { ngay_pv_vp: ngaySau(10) });
  const [[tb]] = await pool.query(
    "SELECT tieu_de FROM du_hoc_thong_bao WHERE ho_so_id = ? ORDER BY id DESC LIMIT 1", [id]);
  dat('đổi ngày VP -> báo "lịch phỏng vấn VP Đài Bắc"', /VP Đài Bắc/.test(tb?.tieu_de || ''));
}

console.log('\n── 4. Danh sách + tổng quan ─────────────────────────────');
{
  // Cả hai buổi về "Đang chờ": danh sách "trong 14 ngày" chỉ gồm buổi CHƯA có kết quả.
  await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { kq_pv_vp: 'cho', kq_phong_van: 'cho' });
  const { j } = await goi('GET', `/admin/du-hoc/ho-so?tim=${encodeURIComponent(`HS-${MA}-1`)}`);
  const h = (j?.ho_so || [])[0];
  dat('danh sách trả loai_phong_van / ngay_pv_vp / kq_pv_vp',
    h && h.loai_phong_van === 'ca-hai' && !!h.ngay_pv_vp && h.kq_pv_vp === 'cho');
  const { j: tq } = await goi('GET', '/admin/du-hoc/tong-quan');
  const dong = (tq?.viec?.phong_van || []).filter((x) => x.id === id);
  dat('"Phỏng vấn trong 14 ngày" có cả buổi trường lẫn VP', dong.some((x) => x.loai_buoi === 'vp')
    && dong.some((x) => x.loai_buoi === 'truong'));
  await goi('PUT', `/admin/du-hoc/ho-so/${id}`, { kq_phong_van: 'dau' });
  const { j: tq2 } = await goi('GET', '/admin/du-hoc/tong-quan');
  const dong2 = (tq2?.viec?.phong_van || []).filter((x) => x.id === id);
  dat('buổi trường đã có kết quả -> rời danh sách, buổi VP còn lại',
    dong2.length === 1 && dong2[0].loai_buoi === 'vp');
  const { j: ct } = await goi('GET', `/admin/du-hoc/ho-so/${id}`);
  dat('bước tên "Phỏng vấn"', (ct?.buoc || []).find((b) => b.ma === 'phong-van')?.ten === 'Phỏng vấn');
  const { j: tt } = await goi('GET', '/admin/du-hoc/theo-truong');
  dat('Tiến độ theo trường vẫn chạy', Array.isArray(tt?.truong));
}

// ------------------------------------------------------------------ dọn
await pool.query('DELETE FROM du_hoc_ho_so WHERE ma_hs LIKE ?', [`HS-${MA}-%`]);
await pool.query('DELETE FROM users WHERE email LIKE ?', [`%${MA}@local.invalid`]);
const [[con]] = await pool.query(
  'SELECT (SELECT COUNT(*) FROM du_hoc_ho_so WHERE ma_hs LIKE ?) + (SELECT COUNT(*) FROM users WHERE email LIKE ?) AS n',
  [`HS-${MA}-%`, `%${MA}@local.invalid`]);
console.log(`\n🧹 dọn xong, còn sót ${con.n} bản ghi (phải 0)`);

console.log(`\nBƯỚC PHỎNG VẤN: ${ok}/${ok + hong.length} đúng kỳ vọng`);
if (hong.length) {
  console.log('  ❌ chưa đạt:');
  for (const h of hong) console.log('     -', h);
}
await pool.end();
process.exit(hong.length || con.n ? 1 : 0);
