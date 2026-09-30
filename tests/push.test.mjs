// =============================================================
// KIỂM THỬ PUSH THÔNG BÁO (Web Push) — 2026-09-28
// =============================================================
//   npm run test:push      (cần DB local đã chạy migration-push.sql; KHÔNG cần backend đang chạy)
//
// Không gửi được push thật trong máy (dịch vụ push là của Google / Mozilla / Apple), nên bộ test
// dựng một DỊCH VỤ PUSH GIẢ chạy HTTPS ngay tại chỗ rồi đóng vai trình duyệt:
//   · tự sinh cặp khoá ECDH + auth secret giống hệt trình duyệt khi pushManager.subscribe();
//   · đăng ký qua đúng API /api/push/dang-ky;
//   · kích từng nghiệp vụ (giao bài, nhận xét, đề bài, du học, cron…);
//   · nhận gói tin ở dịch vụ giả, GIẢI MÃ bằng khoá riêng, so tiêu đề + đường dẫn.
// Giải mã được = server mã hoá đúng chuẩn aes128gcm + ký VAPID đúng -> trình duyệt thật cũng đọc được.
//
// Thư viện web-push luôn gửi qua HTTPS nên dịch vụ giả dùng chứng chỉ tự ký; bộ test TỰ khởi động
// một backend riêng (cổng PUSH_TEST_PORT, mặc định 3997) có NODE_EXTRA_CA_CERTS trỏ vào chứng chỉ đó.
// =============================================================
import 'dotenv/config';
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:https';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import jwt from 'jsonwebtoken';
import ece from 'http_ece';
import webpush from 'web-push';
import pool from '../server/config/db.js';

const CONG_BE = Number(process.env.PUSH_TEST_PORT || 3997);
const CONG_PUSH = CONG_BE + 1000;   // 4997
const B = `http://localhost:${CONG_BE}/api`;
const EP = (ten) => `https://localhost:${CONG_PUSH}/${ten}`;
const MA = 'pusht-' + Math.random().toString(36).slice(2, 8);
const CRON_SECRET = 'cron-' + MA;
const tok = (id) => jwt.sign({ id, name: 't', email: `u${id}@t` }, process.env.JWT_SECRET, { expiresIn: '1h' });

const buoc = [];
function kiem(ten, thuc, mong) {
  const dat = JSON.stringify(thuc) === JSON.stringify(mong);
  buoc.push({ ten, dat, msg: dat ? '' : `mong ${JSON.stringify(mong)}, thực tế ${JSON.stringify(thuc)}` });
  console.log(`${dat ? '  ✅' : '  ❌'} ${ten}${dat ? '' : ' — ' + buoc.at(-1).msg}`);
}
async function G(token, method, p, body, them = {}) {
  const h = { 'Content-Type': 'application/json', ...(them.headers || {}) };
  if (token) h.Authorization = `Bearer ${token}`;
  const r = await fetch(B + p, { method, headers: h, body: body ? JSON.stringify(body) : undefined, redirect: 'manual' });
  let j = null; try { j = await r.json(); } catch {}
  return { s: r.status, j };
}
const ngu = (ms) => new Promise((r) => setTimeout(r, ms));

// ------------------------------------------------------------------ chứng chỉ tự ký
const thuMuc = fs.mkdtempSync(path.join(os.tmpdir(), 'push-test-'));
const fKey = path.join(thuMuc, 'key.pem'); const fCrt = path.join(thuMuc, 'cert.pem');
execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '1', '-subj', '/CN=localhost',
  '-addext', 'subjectAltName=DNS:localhost', '-keyout', fKey, '-out', fCrt], { stdio: 'ignore' });

// ------------------------------------------------------------------ "trình duyệt" giả
const mayGia = new Map();   // tên endpoint -> { ecdh, auth }
function taoMay(ten) {
  const ecdh = crypto.createECDH('prime256v1'); ecdh.generateKeys();
  const auth = crypto.randomBytes(16);
  mayGia.set(ten, { ecdh, auth });
  return { endpoint: EP(ten), keys: { p256dh: ecdh.getPublicKey().toString('base64url'), auth: auth.toString('base64url') } };
}

// ------------------------------------------------------------------ dịch vụ push giả
const hopThu = [];   // { ten, tb, vapid }
const svPush = createServer({ key: fs.readFileSync(fKey), cert: fs.readFileSync(fCrt) }, (req, res) => {
  const ch = [];
  req.on('data', (c) => ch.push(c));
  req.on('end', () => {
    const ten = req.url.slice(1);
    // "chet-…" = trình duyệt đã gỡ app / thu hồi quyền -> dịch vụ push trả 410 Gone.
    if (ten.startsWith('chet')) { res.writeHead(410); return res.end(); }
    const may = mayGia.get(ten);
    let tb = null;
    try {
      tb = JSON.parse(ece.decrypt(Buffer.concat(ch), { version: 'aes128gcm', privateKey: may.ecdh, authSecret: may.auth.toString('base64url') }).toString());
    } catch (e) { tb = { loi: e.message }; }
    hopThu.push({ ten, tb, vapid: String(req.headers.authorization || ''), ttl: req.headers.ttl });
    res.writeHead(201); res.end();
  });
});
await new Promise((r) => svPush.listen(CONG_PUSH, r));

/** Đợi tới khi `ten` nhận thêm thông báo có tiêu đề này (push chạy ngầm sau khi route trả lời). */
async function doiNhan(ten, tieuDe, ms = 4000) {
  const het = Date.now() + ms;
  while (Date.now() < het) {
    const x = hopThu.find((h) => h.ten === ten && h.tb?.tieu_de === tieuDe && !h.daXem);
    if (x) { x.daXem = true; return x; }
    await ngu(80);
  }
  return null;
}
const demNhan = (ten) => hopThu.filter((h) => h.ten === ten).length;

// ------------------------------------------------------------------ backend riêng cho bộ test
const vapid = process.env.VAPID_PUBLIC_KEY ? {} : (() => {
  const k = webpush.generateVAPIDKeys();
  return { VAPID_PUBLIC_KEY: k.publicKey, VAPID_PRIVATE_KEY: k.privateKey, VAPID_SUBJECT: 'mailto:test@itaiwan.vn' };
})();
const be = spawn(process.execPath, ['server/index.js'], {
  env: { ...process.env, ...vapid, PORT: String(CONG_BE), TAT_GIOI_HAN: 'true', CRON_SECRET,
    NODE_EXTRA_CA_CERTS: fCrt, EMAIL_DRY_RUN: 'true', NODE_ENV: 'development' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let nhatKyBe = '';
be.stdout.on('data', (d) => { nhatKyBe += d; });
be.stderr.on('data', (d) => { nhatKyBe += d; });
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(`${B}/push/khoa`)).ok) break; } catch {}
  await ngu(250);
}

const [[ad]] = await pool.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
const QT = tok(ad.id);
let lopId, gvId, hvId, nhId, chuaDuyetId, deId, hoSoId, erId;

try {
  // ---------------------------------------------------------------- 0. DỰNG DỮ LIỆU
  console.log('\n── 0. Dựng dữ liệu ─────────────');
  let r = await G(QT, 'POST', '/admin/classes', { name: `Lớp ${MA}`, level: 'A1' });
  lopId = r.j?.id ?? r.j?.class?.id;
  await G(QT, 'POST', '/admin/teachers', { email: `gv.${MA}@local.invalid`, name: 'Cô Thử' });
  [[{ id: gvId }]] = await pool.query('SELECT id FROM users WHERE email = ?', [`gv.${MA}@local.invalid`]);
  await G(QT, 'PUT', `/admin/classes/${lopId}`, { name: `Lớp ${MA}`, teacher_id: gvId });
  await G(QT, 'POST', `/admin/classes/${lopId}/students`, { emails: [`hv.${MA}@local.invalid`] });
  [[{ id: hvId }]] = await pool.query('SELECT id FROM users WHERE email = ?', [`hv.${MA}@local.invalid`]);
  kiem('Có lớp + giáo viên + học viên', [typeof lopId, typeof gvId, typeof hvId], ['number', 'number', 'number']);
  const GV = tok(gvId); const HV = tok(hvId);

  // ---------------------------------------------------------------- 1. ĐĂNG KÝ
  console.log('\n── 1. Đăng ký thiết bị ─────────────');
  r = await G(null, 'GET', '/push/khoa');
  kiem('GET /push/khoa: push đang bật + có khoá công khai', [r.j?.bat, typeof r.j?.khoa], [true, 'string']);

  kiem('Chưa đăng nhập thì không đăng ký được', (await G(null, 'POST', '/push/dang-ky', { subscription: taoMay('x0') })).s, 401);
  const xau = taoMay('x1'); xau.endpoint = 'http://evil.example.com/hook';
  kiem('Endpoint http:// (không phải dịch vụ push) bị từ chối', (await G(HV, 'POST', '/push/dang-ky', { subscription: xau })).s, 400);
  const la = taoMay('x4'); la.endpoint = 'https://169.254.169.254/latest/meta-data';
  kiem('Endpoint HTTPS nhưng không phải dịch vụ push bị từ chối', (await G(HV, 'POST', '/push/dang-ky', { subscription: la })).s, 400);
  const fcm = taoMay('x5'); fcm.endpoint = 'https://fcm.googleapis.com/fcm/send/abc';
  const rFcm = await G(HV, 'POST', '/push/dang-ky', { subscription: fcm });
  kiem('Endpoint FCM thật được nhận', rFcm.s, 201);
  await pool.query('DELETE FROM push_dang_ky WHERE endpoint = ?', [fcm.endpoint]);
  kiem('Thiếu khoá bị từ chối', (await G(HV, 'POST', '/push/dang-ky', { subscription: { endpoint: EP('x2'), keys: {} } })).s, 400);
  const dai = taoMay('x3'); dai.endpoint = EP('x'.repeat(720));
  kiem('Endpoint quá dài bị từ chối', (await G(HV, 'POST', '/push/dang-ky', { subscription: dai })).s, 400);

  kiem('Học viên đăng ký máy 1', (await G(HV, 'POST', '/push/dang-ky', { subscription: taoMay('hv') })).s, 201);
  kiem('Học viên đăng ký máy 2 (sắp "gỡ app")', (await G(HV, 'POST', '/push/dang-ky', { subscription: taoMay('chet-hv') })).s, 201);
  kiem('Giáo viên đăng ký', (await G(GV, 'POST', '/push/dang-ky', { subscription: taoMay('gv') })).s, 201);
  kiem('Quản trị đăng ký', (await G(QT, 'POST', '/push/dang-ky', { subscription: taoMay('ad') })).s, 201);
  const [[{ n: soHv }]] = await pool.query('SELECT COUNT(*) n FROM push_dang_ky WHERE user_id = ?', [hvId]);
  kiem('Học viên có 2 thiết bị', soHv, 2);

  // Cùng một trình duyệt, đổi tài khoản -> dòng chuyển chủ, không sinh dòng mới.
  const chung = taoMay('chung');
  await G(HV, 'POST', '/push/dang-ky', { subscription: chung });
  await G(GV, 'POST', '/push/dang-ky', { subscription: chung });
  const [dsChung] = await pool.query('SELECT user_id FROM push_dang_ky WHERE endpoint = ?', [EP('chung')]);
  kiem('Đổi tài khoản trên cùng máy: 1 dòng, thuộc người MỚI', dsChung.map((x) => x.user_id), [gvId]);

  // ---------------------------------------------------------------- 2. GỬI THỬ + 410
  console.log('\n── 2. Gửi thử + dọn thiết bị chết ─────────────');
  r = await G(HV, 'POST', '/push/thu', { url: '/' });
  kiem('Gửi thử: 1 máy nhận (máy "đã gỡ" trả 410)', [r.s, r.j?.so_thiet_bi], [200, 1]);
  const thu = await doiNhan('hv', 'ITaiwan');
  kiem('Giải mã được gói tin gửi thử', thu?.tb?.noi_dung, 'Thông báo đã được bật trên thiết bị này.');
  kiem('Có chữ ký VAPID', /^vapid t=.+, k=.+/.test(thu?.vapid || ''), true);
  kiem('TTL 1 ngày', thu?.ttl, '86400');
  const [[{ n: conChet }]] = await pool.query('SELECT COUNT(*) n FROM push_dang_ky WHERE endpoint = ?', [EP('chet-hv')]);
  kiem('Thiết bị trả 410 bị xoá khỏi DB', conChet, 0);
  const [[{ ok }]] = await pool.query('SELECT gui_ok_luc IS NOT NULL ok FROM push_dang_ky WHERE endpoint = ?', [EP('hv')]);
  kiem('Ghi lần gửi thành công', ok, 1);

  // ---------------------------------------------------------------- 3. BÀI TẬP CÔ GIAO
  console.log('\n── 3. Giao bài · nhận xét · điểm danh ─────────────');
  await G(GV, 'POST', `/admin/classes/${lopId}/assignments`, { lesson_id: 'td1-1.1', exercise_type: 'bai-tap', title: 'Bài 1.1', due_date: '2099-12-31' });
  const giao = await doiNhan('hv', 'Cô vừa giao bài mới');
  kiem('Giao bài -> học viên nhận push', [giao?.tb?.noi_dung, giao?.tb?.url], ['Bài 1.1 · Hạn nộp 31/12', '/lo-trinh/bai-tap']);
  let truoc = demNhan('hv');
  await G(GV, 'POST', `/admin/classes/${lopId}/assignments`, { lesson_id: 'td1-1.1', exercise_type: 'bai-tap', title: 'Bài 1.1', due_date: '2099-12-30' });
  await ngu(1200);
  kiem('Giao lại cùng bài (sửa hạn) -> KHÔNG bắn lại', demNhan('hv'), truoc);

  const [er] = await pool.query(
    "INSERT INTO exercise_results (user_id, lesson_id, total_questions, correct_answers, score_percent, time_seconds) VALUES (?, 'td1-1.1', 10, 8, 80, 60)", [hvId]);
  erId = er.insertId;
  await G(QT, 'POST', `/admin/exercise-results/${erId}/review`, { teacher_review: 'Làm tốt, chú ý thanh điệu.' });
  const nx = await doiNhan('hv', 'Cô đã nhận xét bài tập của bạn');
  kiem('Nhận xét bài tập -> push kèm lời phê', [nx?.tb?.noi_dung, nx?.tb?.url], ['Làm tốt, chú ý thanh điệu.', '/tai-khoan/thong-bao']);
  truoc = demNhan('hv');
  await G(QT, 'POST', `/admin/exercise-results/${erId}/review`, { teacher_review: '   ' });
  await ngu(1000);
  kiem('Xoá lời phê -> KHÔNG push', demNhan('hv'), truoc);

  r = await G(GV, 'POST', `/admin/classes/${lopId}/sessions`, { session_date: '2026-09-28', topic: 'Bài 1' });
  const buoiId = r.j?.ids?.[0];
  const diemDanh = (note) => G(GV, 'PUT', `/admin/sessions/${buoiId}/attendance`, { records: [{ user_id: hvId, status: 'present', teacher_note: note }] });
  await diemDanh('Phát âm tốt');
  const dd1 = await doiNhan('hv', 'Cô nhận xét buổi học của bạn');
  kiem('Điểm danh có nhận xét -> push', dd1?.tb?.noi_dung, 'Phát âm tốt');
  truoc = demNhan('hv');
  await diemDanh('Phát âm tốt');
  await ngu(1000);
  kiem('Lưu lại y nguyên -> KHÔNG push lần 2', demNhan('hv'), truoc);
  await diemDanh('Phát âm tốt, cần luyện thêm thanh 3');
  const dd2 = await doiNhan('hv', 'Cô nhận xét buổi học của bạn');
  kiem('Sửa nhận xét -> push nội dung mới', dd2?.tb?.noi_dung, 'Phát âm tốt, cần luyện thêm thanh 3');

  // ---------------------------------------------------------------- 4. ĐỀ BÀI
  console.log('\n── 4. Đề bài: giao · nộp · chấm ─────────────');
  r = await G(GV, 'POST', '/admin/de-bai', { tieu_de: `Đề ${MA}`, thoi_gian_phut: 15 });
  deId = r.j?.id ?? r.j?.de?.id;
  await G(GV, 'POST', `/admin/de-bai/${deId}/cau-hoi`, { loai: 'tu-luan', noi_dung: 'Giới thiệu bản thân', diem: 2 });
  await G(GV, 'POST', `/admin/de-bai/${deId}/phat-hanh`, { trang_thai: 'phat-hanh' });
  await G(GV, 'POST', `/admin/de-bai/${deId}/giao`, { class_id: lopId, han_nop: '2099-12-31 23:59' });
  const giaoDe = await doiNhan('hv', 'Cô vừa giao bài kiểm tra');
  kiem('Giao đề -> học viên nhận push', [!!giaoDe?.tb?.noi_dung?.includes(`Đề ${MA}`), giaoDe?.tb?.url], [true, '/lo-trinh/bai-kiem-tra']);

  r = await G(HV, 'GET', '/de-bai/cua-toi');
  const giaoId = (r.j?.de || []).find((d) => d.de_id === deId)?.giao_id;
  r = await G(HV, 'POST', `/de-bai/giao/${giaoId}/bat-dau`);
  const baiLamId = r.j?.bai_lam_id; const cauId = r.j?.cau_hoi?.[0]?.id;
  r = await G(HV, 'POST', `/de-bai/bai-lam/${baiLamId}/nop`, { bai_lam: { [cauId]: 'Em tên là Thử.' } });
  kiem('Học viên nộp bài tự luận', [r.s, r.j?.cho_cham_tay], [200, true]);
  const cho = await doiNhan('gv', 'Có bài chờ chấm');
  kiem('Người ra đề nhận "Có bài chờ chấm"', [!!cho?.tb?.noi_dung?.includes(`Đề ${MA}`), cho?.tb?.url], [true, '/admin.html#/de-bai']);

  await G(GV, 'POST', `/admin/de-bai-lam/${baiLamId}/cham`, { diem_tu_luan: { [cauId]: 2 }, nhan_xet: 'Tốt' });
  const cham = await doiNhan('hv', 'Bài kiểm tra đã được chấm');
  kiem('Chấm xong -> học viên nhận push', !!cham, true);

  // ---------------------------------------------------------------- 5. DU HỌC
  console.log('\n── 5. Du học ─────────────');
  r = await G(QT, 'POST', '/admin/du-hoc/ho-so', { ho_ten: `Học sinh ${MA}`, ma_hs: `HS-${MA}`, user_id: hvId });
  hoSoId = r.j?.id;
  await G(QT, 'PUT', `/admin/du-hoc/ho-so/${hoSoId}`, { ngay_phong_van: '2099-10-15' });
  const pv = await doiNhan('hv', 'Trung tâm đã xếp lịch phỏng vấn trường');
  kiem('Xếp lịch phỏng vấn -> học viên nhận push', [!!pv?.tb?.noi_dung?.includes('15/10/2099'), pv?.tb?.url], [true, '/tai-khoan/ho-so-du-hoc']);

  await pool.query('UPDATE du_hoc_ho_so SET hs_gui_luc = NOW() WHERE id = ?', [hoSoId]);
  r = await G(HV, 'POST', '/du-hoc/yeu-cau-sua', { thay_doi: { ho_chieu: 'C1234567' }, ly_do: 'Mới làm hộ chiếu' });
  kiem('Học viên gửi yêu cầu sửa hồ sơ', r.s, 201);
  const sua = await doiNhan('ad', 'Học sinh xin sửa hồ sơ');
  kiem('Quản trị nhận "Học sinh xin sửa hồ sơ"', sua?.tb?.url, `/admin.html#/du-hoc/${hoSoId}`);

  // ---------------------------------------------------------------- 6. TÀI KHOẢN CHỜ DUYỆT
  console.log('\n── 6. Tài khoản chờ duyệt ─────────────');
  const maXt = crypto.randomBytes(16).toString('hex');
  const [u] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, is_verified, is_approved, verification_token)
     VALUES (?, ?, 'x', 'student', FALSE, FALSE, ?)`, [`Chờ ${MA}`, `cho.${MA}@local.invalid`, maXt]);
  chuaDuyetId = u.insertId;
  r = await G(null, 'GET', `/auth/verify?token=${maXt}`);
  kiem('Xác thực email -> chuyển hướng', r.s, 302);
  const choDuyet = await doiNhan('ad', 'Có tài khoản chờ duyệt');
  kiem('Quản trị nhận "Có tài khoản chờ duyệt"', choDuyet?.tb?.noi_dung, `Chờ ${MA} · cho.${MA}@local.invalid`);

  // ---------------------------------------------------------------- 7. CRON NHẮC HỌC
  console.log('\n── 7. Cron nhắc học ─────────────');
  // Cron bỏ qua email @local.invalid (tài khoản thử) nên người này dùng miền .invalid khác.
  const [nh] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, is_verified, is_approved, nhan_mail_nhac, last_active, streak)
     VALUES (?, ?, 'x', 'student', TRUE, TRUE, TRUE, NOW(), 3)`, [`Nhắc ${MA}`, `nh.${MA}@push.invalid`]);
  nhId = nh.insertId;
  await G(tok(nhId), 'POST', '/push/dang-ky', { subscription: taoMay('nh') });
  kiem('Cron không có khoá bị chặn', (await G(null, 'GET', '/cron/nhac-hoc')).s, 401);
  r = await G(null, 'GET', '/cron/nhac-hoc', null, { headers: { Authorization: `Bearer ${CRON_SECRET}` } });
  const dong = (r.j?.chi_tiet || []).find((x) => x.id === nhId);
  kiem('Cron nhắc học: người này được 1 push', [r.s, dong?.push], [200, 1]);
  const nhac = await doiNhan('nh', 'Hôm nay bạn chưa học', 1500);
  kiem('Nhắc học có tag để thay lời nhắc hôm trước', [nhac?.tb?.noi_dung, nhac?.tb?.the], ['giữ chuỗi 3 ngày', 'nhac-hoc']);
  const [[{ nlc }]] = await pool.query('SELECT nhac_lan_cuoi = CURDATE() nlc FROM users WHERE id = ?', [nhId]);
  kiem('Đã ghi nhac_lan_cuoi (không nhắc trùng trong ngày)', nlc, 1);

  // ---------------------------------------------------------------- 8. HUỶ
  console.log('\n── 8. Tắt thông báo ─────────────');
  await G(GV, 'POST', '/push/huy', { endpoint: EP('hv') });
  const [[{ n: conHv }]] = await pool.query('SELECT COUNT(*) n FROM push_dang_ky WHERE endpoint = ?', [EP('hv')]);
  kiem('Người khác KHÔNG tắt hộ được máy của học viên', conHv, 1);
  await G(HV, 'POST', '/push/huy', { endpoint: EP('hv') });
  const [[{ n: sauHuy }]] = await pool.query('SELECT COUNT(*) n FROM push_dang_ky WHERE endpoint = ?', [EP('hv')]);
  kiem('Học viên tự tắt được', sauHuy, 0);
  r = await G(HV, 'POST', '/push/thu');
  kiem('Hết thiết bị -> gửi thử báo 404', r.s, 404);

  kiem('Mọi gói tin đều giải mã được', hopThu.filter((h) => h.tb?.loi).map((h) => h.tb.loi), []);
} catch (e) {
  buoc.push({ ten: 'NGOẠI LỆ', dat: false, msg: e.stack });
} finally {
  // ------------------------------------------------------------------ dọn
  await pool.query('DELETE FROM push_dang_ky WHERE endpoint LIKE ?', [`https://localhost:${CONG_PUSH}/%`]);
  if (deId) await pool.query('DELETE FROM de_bai WHERE id = ?', [deId]);
  if (hoSoId) await pool.query('DELETE FROM du_hoc_ho_so WHERE id = ?', [hoSoId]);
  if (erId) await pool.query('DELETE FROM exercise_results WHERE id = ?', [erId]);
  if (lopId) await pool.query('DELETE FROM classes WHERE id = ?', [lopId]);
  await pool.query('DELETE FROM exercise_results WHERE user_id IN (SELECT id FROM users WHERE email LIKE ?)', [`%.${MA}@%`]);
  await pool.query('DELETE FROM users WHERE email LIKE ?', [`%.${MA}@%`]);
  const [[{ sot }]] = await pool.query(
    `SELECT (SELECT COUNT(*) FROM users WHERE email LIKE ?)
          + (SELECT COUNT(*) FROM classes WHERE name LIKE ?)
          + (SELECT COUNT(*) FROM push_dang_ky WHERE endpoint LIKE ?) AS sot`,
    [`%.${MA}@%`, `%${MA}`, `https://localhost:${CONG_PUSH}/%`]);
  console.log(`\n🧹 dọn xong, còn sót ${sot} bản ghi (phải 0)`);
  await pool.end();
  be.kill();
  svPush.close();
  fs.rmSync(thuMuc, { recursive: true, force: true });
}

const dat = buoc.filter((b) => b.dat).length;
console.log(`\nPUSH THÔNG BÁO: ${dat}/${buoc.length} bước đạt`);
buoc.filter((b) => !b.dat).forEach((b) => console.log(`  ❌ ${b.ten} — ${b.msg}`));
if (dat !== buoc.length) console.log('\n--- nhật ký backend (cuối) ---\n' + nhatKyBe.slice(-3000));
process.exit(dat === buoc.length ? 0 : 1);
