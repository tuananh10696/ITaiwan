// ============================================================
// ADMIN PANEL — ITaiwan (SPA Controller)
// ============================================================
// Danh mục quyển + helper id/URL — module thuần dữ liệu, dùng chung với main.js.
// Không import thoidaiData.js: file đó kéo theo toàn bộ từ vựng.
import { thoidaiBooks, tdLessonKey, tdLessonLabel, tdSubSegs, tdParseLessonId } from './data/thoidaiBooks.js';

// Ba khu vận hành trung tâm (sổ thu chi · ký túc xá · đề bài) — tách ra file riêng vì file này
// đã 5.400 dòng. Cầu nối MỘT CHIỀU `dangKyTrungTam` ở cuối file: module chỉ đọc, không import
// ngược lại đây (tránh vòng lặp import — đúng lối src/core/app.js ở 4.40).
import {
  dangKy as dangKyTrungTam, renderQuy, renderKtx, renderDeBai,
  quyHandlers, ktxHandlers, deHandlers,
} from './admin-trungtam.js';

const _khongNs = (id) => String(id || '').replace(/^[a-z]+(?::[a-z]+)?:/, '');
/** Nhãn bài cho mọi id bài. */
const tbLabel = (id) => tdLessonLabel(id);
/** Đoạn URL + trang tương ứng để mở bài đó bên user portal. */
const tbSlug = (id) => tdSubSegs(String(id)).join('/');
const tbPage = () => 'giao-trinh-thoi-dai';

const API = '/api';

/**
 * Escape HTML cho dữ liệu do NGƯỜI DÙNG nhập (tên, email, ghi chú) trước khi ghép vào innerHTML.
 * Cổng quản trị dựng giao diện bằng template string như cổng học viên, nhưng trước 2026-09-13 ở
 * đây không có hàm nào tương đương `tdEsc()` bên main.js — tên học viên chứa `<` là vỡ bảng, và
 * tệ hơn là chạy được script trong phiên của giáo viên/quản trị.
 */
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

let token = localStorage.getItem('tw_token') || null;
let currentSection = 'dashboard';
let adminUser = null;

function submitExamReview(id, btn) {
  return _saveReview(`/admin/exam-results/${id}/review`, btn);
}

// Lưu lời phê. `btn` được truyền vào bằng `this` từ onclick.
//
// 2026-08-27 — TRƯỚC ĐÂY dùng `document.activeElement` để lấy nút, RẤT NGUY HIỂM: Safari (trình duyệt
// mặc định trên máy Mac) KHÔNG focus vào <button> khi bấm chuột, nên activeElement là <body> —
// dòng `btn.innerHTML = '...Đang lưu...'` sẽ XOÁ SẠCH nội dung trang admin. Luôn truyền nút vào rõ ràng.
// Đồng thời đóng modal sau khi lưu (bản cũ render lại nền nhưng để modal treo lại phía trên).
async function _saveReview(endpoint, btn) {
  const box = document.getElementById('f-teacher-review');
  if (!box) return;
  const text = box.value;
  const restore = '<i class="fa-solid fa-paper-plane"></i> Lưu nhận xét';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...'; }
  try {
    await apiPost(endpoint, { teacher_review: text });
    toast(text.trim() ? 'Đã lưu nhận xét!' : 'Đã xoá nhận xét.');
    closeModal();
    renderStudentDetail(document.getElementById('admin-content'));
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = restore; }
  }
}

function submitExerciseReview(id, btn) {
  return _saveReview(`/admin/exercise-results/${id}/review`, btn);
}

// ============================================================
// API HELPERS
// ============================================================
async function api(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, message: data.error || 'Lỗi không xác định.' };
  return data;
}

function apiGet(ep) { return api(ep); }
function apiPost(ep, body) { return api(ep, { method: 'POST', body: JSON.stringify(body) }); }
function apiPut(ep, body) { return api(ep, { method: 'PUT', body: JSON.stringify(body) }); }
function apiDel(ep) { return api(ep, { method: 'DELETE' }); }

// ============================================================
// TOAST
// ============================================================
function toast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

// ============================================================
// FORMAT HELPERS
// ============================================================
function scoreBadge(p) {
  return `<span class="badge ${p >= 80 ? 'badge-success' : p >= 50 ? 'badge-warning' : 'badge-danger'}">${Math.round(p)}%</span>`;
}

// ============================================================
// MODAL HELPERS
// ============================================================
function openModal(title, bodyHtml, footerHtml = '') {
  closeModal();
  const el = document.createElement('div');
  el.className = 'admin-modal-overlay';
  el.id = 'admin-modal';
  el.innerHTML = `
    <div class="admin-modal">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close" onclick="adminApp.closeModal()">&times;</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
    </div>
  `;
  document.body.appendChild(el);
  el.addEventListener('click', e => { if (e.target === el) closeModal(); });
  requestAnimationFrame(() => el.classList.add('show'));
}

function closeModal() {
  const m = document.getElementById('admin-modal');
  if (m) { m.classList.remove('show'); setTimeout(() => m.remove(), 250); }
}

function confirmDialog(title, message, onConfirm) {
  openModal(title,
    `<div class="confirm-body"><i class="fa-solid fa-triangle-exclamation"></i><h3>${title}</h3><p>${message}</p></div>`,
    `<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>
     <button class="btn btn-danger" id="confirm-yes-btn">Xác nhận xóa</button>`
  );
  setTimeout(() => {
    const btn = document.getElementById('confirm-yes-btn');
    if (btn) btn.onclick = async () => { await onConfirm(); closeModal(); };
  }, 50);
}

// ============================================================
// LOGIN / AUTH
// ============================================================
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');

  if (!email || !password) { errEl.textContent = 'Vui lòng nhập email và mật khẩu.'; errEl.style.display = 'block'; return; }

  btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đăng nhập...';
  errEl.style.display = 'none';

  try {
    const data = await apiPost('/auth/login', { email, password });
    // Quyền admin nay đã có sẵn trong response login (field is_admin) — không cần gọi thêm
    // /admin/stats chỉ để "test quyền" như trước (giảm 1 lượt round-trip, giảm rủi ro lỗi vặt mạng/cold start).
    if (!laNhanSu(data.user)) {
      errEl.textContent = 'Tài khoản này không có quyền quản trị.';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> ĐĂNG NHẬP';
      return;
    }
    token = data.token;
    localStorage.setItem('tw_token', data.token);
    localStorage.setItem('tw_user', JSON.stringify(data.user));
    adminUser = data.user;
    showAdminShell();
  } catch (err) {
    errEl.textContent = err.message || 'Không có quyền admin hoặc thông tin đăng nhập sai.';
    errEl.style.display = 'block';
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> ĐĂNG NHẬP';
  }
}

/** Kết thúc trạng thái "đang kiểm tra phiên": gỡ class ở <html> để splash tắt và
 *  #login-gate hiện lại bình thường theo CSS. Gọi ở MỌI nhánh kết thúc của checkAuth(). */
function endAuthChecking() {
  document.documentElement.classList.remove('tw-auth-checking');
}

function logout() {
  token = null;
  adminUser = null;
  localStorage.removeItem('tw_token');
  localStorage.removeItem('tw_user');
  endAuthChecking();
  document.getElementById('admin-shell').style.display = 'none';
  document.getElementById('login-gate').style.display = 'flex';
  const errEl = document.getElementById('login-error');
  if (errEl) errEl.style.display = 'none';
  // Xoá đường dẫn sâu khỏi URL khi đăng xuất — tránh để lộ id lớp/học viên trên thanh địa chỉ
  // và tránh việc người đăng nhập sau bị ném thẳng vào màn của người trước.
  try { history.replaceState(null, '', location.pathname + location.search); } catch (_) {}
}

// ============================================================
// VAI TRÒ (2026-08-27)
// ============================================================
// users.role: 'admin' | 'org_admin' | 'teacher' | 'student'. Trang này mở cho ba vai trò đầu.
//
//   admin     — chủ NỀN TẢNG (thuộc tổ chức gốc). Thấy mọi trung tâm, sửa được nội dung dùng chung.
//   org_admin — quản trị một TRUNG TÂM (2026-09-09): toàn quyền trong tổ chức mình — lớp, giáo
//               viên, học viên — nhưng không thấy trung tâm khác và không đụng nội dung nền tảng.
//   teacher   — chỉ lớp mình phụ trách.
//
// LƯU Ý: ẩn menu KHÔNG phải là bảo mật — chặn thật nằm ở server (middleware/roles.js). Ở đây chỉ
// để người dùng không nhìn thấy những nút bấm vào sẽ nhận 403.
function vaiTro(u) {
  const x = u || adminUser;
  return x?.role || (x?.is_admin ? 'admin' : 'student');
}
const laAdmin = (u) => vaiTro(u) === 'admin';
/** Quản trị viên: admin nền tảng HOẶC quản trị trung tâm. */
const laQuanTri = (u) => ['admin', 'org_admin'].includes(vaiTro(u));
const laNhanSu = (u) => ['admin', 'org_admin', 'teacher'].includes(vaiTro(u));

const NHAN_VAI_TRO = { admin: 'ADMIN', org_admin: 'QUẢN TRỊ TRUNG TÂM', teacher: 'GIÁO VIÊN' };
const MAU_VAI_TRO = { admin: '', org_admin: '#2F6B58', teacher: '#12726B' };

/**
 * Ẩn/hiện mục theo vai trò + đổi nhãn trên sidebar.
 *   data-chi-admin    -> chỉ admin NỀN TẢNG (nội dung dùng chung, danh sách mọi trung tâm)
 *   data-tu-quan-tri  -> admin nền tảng + quản trị trung tâm (giáo viên, quyền học)
 */
function apDungVaiTro() {
  const chiAdmin = laAdmin();
  const quanTri = laQuanTri();
  document.querySelectorAll('[data-chi-admin]').forEach(el => { el.style.display = chiAdmin ? '' : 'none'; });
  document.querySelectorAll('[data-tu-quan-tri]').forEach(el => { el.style.display = quanTri ? '' : 'none'; });
  const badge = document.getElementById('vai-tro-badge');
  if (badge) {
    const v = vaiTro();
    badge.textContent = NHAN_VAI_TRO[v] || 'GIÁO VIÊN';
    badge.style.background = MAU_VAI_TRO[v] ?? '#12726B';
  }
}

/** Gõ tay URL của khu không được vào -> đưa về Tổng quan thay vì để nhận 403 khó hiểu. */
const KHU_CHI_ADMIN = ['users', 'thiet-bi'];
const KHU_QUAN_TRI = ['teachers', 'du-hoc', 'quy', 'ktx'];
function chanKhuCam() {
  const cam = (!laAdmin() && KHU_CHI_ADMIN.includes(currentSection))
    || (!laQuanTri() && KHU_QUAN_TRI.includes(currentSection));
  if (cam) {
    currentSection = 'dashboard';
    _writeAdminUrl(buildAdminHash('dashboard'), true);
    return true;
  }
  return false;
}

function showAdminShell() {
  endAuthChecking();
  apDungVaiTro();
  document.getElementById('login-gate').style.display = 'none';
  document.getElementById('admin-shell').style.display = 'flex';
  document.getElementById('admin-name').textContent = adminUser?.name || 'Admin';

  // Mở đúng trang ghi trong URL (kể cả link sâu như #/lop-hoc/12/hoc-vien/9), không còn luôn về
  // Tổng quan. Nếu URL trống thì chuẩn hoá thành #/tong-quan để địa chỉ luôn phản ánh trang đang xem.
  applyAdminRoute(); // đã tự chuẩn hoá URL bên trong

  // Back/Forward của trình duyệt, hoặc người dùng tự sửa URL rồi Enter.
  // (pushState/replaceState mà code này dùng KHÔNG bắn hashchange, nên ở đây chỉ còn thao tác thật
  // của người dùng — không lo render lặp.)
  if (!window.__adminHashBound) {
    window.__adminHashBound = true;
    window.addEventListener('hashchange', () => {
      if (!token) return;
      applyAdminRoute();
    });
  }

  if (laAdmin()) refreshPendingBadge();
}

async function refreshPendingBadge() {
  try {
    const data = await apiGet('/admin/pending-count');
    const badge = document.getElementById('pending-badge');
    if (badge) {
      if (data.count > 0) {
        badge.textContent = data.count;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
  } catch (e) { /* ignore */ }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/** Đợi 1 nhịp rồi hiện lại form login kèm thông báo lỗi cụ thể (dùng khi checkAuth() thất bại hẳn). */
function showLoginWithError(message) {
  endAuthChecking();
  const errEl = document.getElementById('login-error');
  if (errEl && message) { errEl.textContent = message; errEl.style.display = 'block'; }
  document.getElementById('admin-shell').style.display = 'none';
  document.getElementById('login-gate').style.display = 'flex';
}

// Auto-login check — chạy khi mở lại trang admin (F5, mở tab mới) mà đã có sẵn token trong localStorage.
// QUAN TRỌNG: chỉ xoá token + bắt đăng nhập lại khi server xác nhận RÕ RÀNG token không hợp lệ (401/403 —
// tức "Phiên đăng nhập đã hết hạn" từ requireAuth hoặc "không có quyền admin"). Với lỗi mạng/lỗi server tạm
// thời (mất mạng, Vercel cold start, DB pool timeout...) thì KHÔNG được xoá token và đá về màn hình login
// ngay — trước đây làm vậy nên chỉ cần 1 lần gọi API bị trục trặc thoáng qua lúc F5 là bị văng ra login dù
// phiên đăng nhập vẫn còn hạn. Giờ retry vài lần trước khi bó tay, và nếu vẫn lỗi thì GIỮ NGUYÊN token, chỉ
// báo lỗi để người dùng bấm tải lại — lần sau vẫn có thể vào thẳng nếu server đã ổn định trở lại.
async function checkAuth() {
  if (!token) return;
  const MAX_ATTEMPTS = 3;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const data = await apiGet('/auth/me');
      if (!laNhanSu(data.user)) {
        // Server trả lời rõ ràng: tài khoản này không có quyền vào — đây mới là lúc nên đăng xuất.
        logout();
        showLoginWithError('Tài khoản này không có quyền quản trị.');
        return;
      }
      adminUser = data.user;
      showAdminShell();
      return;
    } catch (e) {
      const isAuthRejected = e && (e.status === 401 || e.status === 403);
      if (isAuthRejected) {
        // Token thật sự hết hạn / không hợp lệ — đăng xuất là đúng.
        logout();
        showLoginWithError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return;
      }
      if (attempt < MAX_ATTEMPTS) {
        await sleep(600 * attempt);
        continue;
      }
      // Hết lượt retry mà vẫn lỗi mạng/server — KHÔNG xoá token, chỉ báo lỗi tạm thời.
      showLoginWithError('Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và tải lại trang.');
    }
  }
}

// ============================================================
// NAVIGATION
// ============================================================
// opts.keepView: giữ nguyên classesView đang có (dùng khi nhảy thẳng vào 1 màn con của Quản lý lớp
// từ Tổng quan). Mặc định, bấm menu "Quản lý lớp" luôn quay về danh sách lớp — nếu không reset thì
// lần sau mở menu sẽ thấy lại màn chi tiết học viên/điểm danh cũ, rất khó hiểu.

// ============================================================
// ROUTER — mỗi trang/chức năng của admin là MỘT URL riêng (2026-08-27)
// ============================================================
// TRƯỚC ĐÂY chỉ có `location.hash = section` với 7 giá trị phẳng ('#classes', '#users'...).
// Nghĩa là mọi màn con của Quản lý lớp (chi tiết lớp, buổi học, điểm danh, chi tiết học viên)
// đều dùng chung đúng 1 URL '#classes': không bookmark được, không gửi link cho đồng nghiệp được,
// F5 là văng về danh sách lớp, và nút Back của trình duyệt không lùi được từng bước.
//
// Sơ đồ URL mới (hash, slug tiếng Việt không dấu cho đồng bộ với trang học):
//   #/tong-quan
//   #/lop-hoc
//   #/lop-hoc/12                                  chi tiết lớp 12
//   #/lop-hoc/12/buoi-hoc                         danh sách buổi học của lớp 12
//   #/lop-hoc/12/buoi-hoc/45/diem-danh            điểm danh buổi 45
//   #/lop-hoc/12/hoc-vien/9                       chi tiết học viên 9 trong lớp 12
//   #/nguoi-dung?tim=an&trang=2
//   #/tu-vung?tim=&trang=3&sap-xep=hanzi&chieu=ASC
//   #/cau-hoi-thi · #/hoi-thoai · #/blog
//
// Vì sao dùng hash chứ không phải đường dẫn thật (/admin/lop-hoc/12)? admin.html là file tĩnh
// riêng; muốn dùng path thật phải thêm rewrite trong vercel.json VÀ cấu hình lại dev server,
// dễ vỡ. Hash chạy giống nhau ở cả dev lẫn production, không cần cấu hình gì thêm.
const ADMIN_ROUTES = [
  { section: 'dashboard',  slug: 'tong-quan',   title: 'Tổng quan' },
  { section: 'classes',    slug: 'lop-hoc',     title: 'Quản lý lớp' },
  { section: 'users',      slug: 'nguoi-dung',  title: 'Học viên & tài khoản' },
  { section: 'teachers',   slug: 'giao-vien',   title: 'Quản lý Giáo viên' },
  { section: 'thiet-bi',   slug: 'thiet-bi',    title: 'Thiết bị đăng nhập' },
  // Hồ sơ du học của trung tâm
  { section: 'du-hoc',     slug: 'du-hoc',      title: 'Hồ sơ du học' },
  // Ba khu vận hành trung tâm
  { section: 'quy',        slug: 'thu-chi',     title: 'Sổ thu – chi' },
  { section: 'ktx',        slug: 'ky-tuc-xa',   title: 'Ký túc xá' },
  { section: 'de-bai',     slug: 'de-bai',      title: 'Đề bài & kiểm tra' },
];

function _routeBySection(section) {
  return ADMIN_ROUTES.find(r => r.section === section) || ADMIN_ROUTES[0];
}

// Query string riêng của từng trang (bộ lọc / trang hiện tại) — để F5 hay gửi link vẫn giữ nguyên
// đúng kết quả tìm kiếm và đúng trang đang xem.
function _queryForSection(section) {
  const q = new URLSearchParams();
  if (section === 'users') {
    if (userSearch) q.set('tim', userSearch);
    if (userPage > 1) q.set('trang', userPage);
  }
  return q;
}

// Đọc query string trên URL vào biến trạng thái của trang tương ứng.
function _applyQueryToSection(section, q) {
  if (section === 'users') {
    userSearch = q.get('tim') || '';
    userPage = Math.max(1, parseInt(q.get('trang') || '1', 10) || 1);
  }
}

// Number() chứ không dùng thẳng `n`: cột SUM()/COUNT() của MySQL về tới đây là CHUỖI (mysql2
// trả DECIMAL dạng string để khỏi mất chính xác), mà String.prototype.toLocaleString trả lại
// nguyên chuỗi — ra "12000000₫" thay vì "12.000.000₫". Không lỗi nào hiện ra, chỉ nhìn mới thấy.
const _tien = (n) => (Number(n) || 0).toLocaleString('vi-VN') + '₫';

/** Dựng chuỗi hash phản ánh ĐÚNG trạng thái đang xem. */
function buildAdminHash(section) {
  const r = _routeBySection(section);
  let path = '#/' + r.slug;
  if (section === 'teachers' && _gvDangXem) path += '/' + _gvDangXem;
  if (section === 'du-hoc' && dhView === 'detail' && dhId) path += '/' + dhId;
  if (section === 'classes' && currentClassId) {
    path += '/' + currentClassId;
    if (classesView === 'sessions') path += '/buoi-hoc';
    else if (classesView === 'assignments') path += '/bai-tap';
    else if (classesView === 'mistakes') path += '/loi-sai';
    else if (classesView === 'attendance') path += '/buoi-hoc/' + currentSessionId + '/diem-danh';
    else if (classesView === 'student') path += '/hoc-vien/' + currentStudentId;
  }
  const qs = _queryForSection(section).toString();
  return path + (qs ? '?' + qs : '');
}

/** Phân tích hash hiện tại. Chấp nhận cả hash CŨ dạng '#classes' để link cũ không chết. */
function parseAdminHash() {
  const raw = String(location.hash || '').replace(/^#\/?/, '');
  const [pathPart, queryPart] = raw.split('?');
  const segs = pathPart.split('/').filter(Boolean);
  const first = segs[0] || '';
  const route =
    ADMIN_ROUTES.find(r => r.slug === first) ||
    ADMIN_ROUTES.find(r => r.section === first) || // tương thích hash cũ: #dashboard, #classes...
    ADMIN_ROUTES[0];
  return { route, segs, query: new URLSearchParams(queryPart || '') };
}

// Ghi URL mà KHÔNG kích hoạt hashchange (pushState/replaceState theo chuẩn không bắn sự kiện này),
// nhờ vậy hashchange chỉ còn ứng với thao tác Back/Forward hoặc người dùng tự sửa URL.
// replace = true dùng cho đổi bộ lọc/phân trang, để Back không phải bấm qua từng trang một.
function _writeAdminUrl(hash, replace) {
  if (location.hash === hash) return;
  try {
    history[replace ? 'replaceState' : 'pushState'](null, '', hash);
  } catch (_) {
    location.hash = hash; // môi trường lạ không cho dùng History API
  }
}

/** Đồng bộ URL theo trạng thái hiện tại (không render lại). Dùng sau khi đổi lọc/phân trang/màn con. */
function syncAdminUrl(replace) {
  _writeAdminUrl(buildAdminHash(currentSection), replace);
}

/** Vẽ lại giao diện theo `currentSection` + các biến trạng thái, KHÔNG đụng tới URL. */
function renderCurrentSection() {
  chanKhuCam();
  const r = _routeBySection(currentSection);
  document.querySelectorAll('.nav-item[data-section]').forEach(el => {
    el.classList.toggle('active', el.dataset.section === currentSection);
  });
  document.getElementById('section-title').textContent = r.title;
  // Đổi cả tiêu đề tab trình duyệt để bookmark / lịch sử / nhiều tab mở cùng lúc phân biệt được nhau.
  document.title = `${r.title} · ITaiwan Admin`;
  document.getElementById('admin-sidebar').classList.remove('open');

  const content = document.getElementById('admin-content');
  switch (currentSection) {
    case 'users': renderUsers(content); break;
    case 'teachers': renderTeachers(content); break;
    case 'classes': renderClasses(content); break;
    case 'thiet-bi': renderThietBi(content); break;
    case 'du-hoc': renderDuHoc(content); break;
    case 'quy': renderQuy(content); break;
    case 'ktx': renderKtx(content); break;
    case 'de-bai': renderDeBai(content); break;
    default: renderDashboard(content);
  }
}

/** Đọc URL -> đặt trạng thái -> render. Gọi khi mở trang lần đầu và khi bấm Back/Forward. */
function applyAdminRoute() {
  const { route, segs, query } = parseAdminHash();
  currentSection = route.section;
  _applyQueryToSection(currentSection, query);

  if (currentSection === 'du-hoc') {
    // #/du-hoc[/<id hồ sơ>]
    const id = parseInt(segs[1] || '', 10);
    dhId = Number.isFinite(id) ? id : null;
    dhView = dhId ? 'detail' : 'list';
    dhChiTiet = null;
    dhNapNhanSu();   // nạp nền, form cần mà không phải chờ
  }

  if (currentSection === 'classes') {
    // #/lop-hoc[/<classId>[/buoi-hoc[/<sessionId>/diem-danh] | /hoc-vien/<userId>]]
    const classId = parseInt(segs[1], 10);
    if (Number.isInteger(classId)) {
      currentClassId = classId;
      if (segs[2] === 'loi-sai') {
        classesView = 'mistakes';
      } else if (segs[2] === 'bai-tap') {
        classesView = 'assignments';
      } else if (segs[2] === 'buoi-hoc') {
        const sid = parseInt(segs[3], 10);
        if (Number.isInteger(sid) && segs[4] === 'diem-danh') {
          currentSessionId = sid;
          classesView = 'attendance';
        } else {
          classesView = 'sessions';
        }
      } else if (segs[2] === 'hoc-vien' && Number.isInteger(parseInt(segs[3], 10))) {
        currentStudentId = parseInt(segs[3], 10);
        classesView = 'student';
      } else {
        classesView = 'detail';
      }
    } else {
      classesView = 'list';
      currentClassId = null;
      currentClassName = '';
      currentSessionId = null;
      currentStudentId = null;
    }
  }

  if (currentSection === 'teachers') {
    // #/giao-vien[/<id>] — mở thẳng hồ sơ một giáo viên bằng link.
    const gvId = parseInt(segs[1], 10);
    _gvDangXem = Number.isInteger(gvId) ? gvId : null;
  }

  // Chuẩn hoá URL về dạng chính tắc: hash cũ '#classes' -> '#/lop-hoc', bỏ tham số thừa,
  // link sâu thiếu/thừa dấu '/' cũng về đúng một dạng. Dùng replaceState nên không tạo entry mới
  // và không bắn hashchange (không có vòng lặp).
  _writeAdminUrl(buildAdminHash(currentSection), true);

  renderCurrentSection();
}

// Điều hướng giữa các mục ở sidebar. Giữ nguyên chữ ký cũ vì rất nhiều onclick đang gọi hàm này.
// opts.keepView: giữ nguyên màn con của Quản lý lớp (dùng khi nhảy thẳng từ Tổng quan).
// opts.replace : thay thế entry lịch sử hiện tại thay vì tạo entry mới.
function navigate(section, opts) {
  if (section === 'teachers' && !(opts && opts.keepView)) _gvDangXem = null;
  if (section === 'du-hoc' && !(opts && opts.keepView)) { dhView = 'list'; dhId = null; dhChiTiet = null; }
  if (section === 'classes' && !(opts && opts.keepView)) {
    classesView = 'list';
    currentClassId = null;
    currentClassName = '';
    currentSessionId = null;
    currentStudentId = null;
  }
  currentSection = section;
  _writeAdminUrl(buildAdminHash(section), !!(opts && opts.replace));
  renderCurrentSection();
}

/** Đổi màn con trong Quản lý lớp: cập nhật URL rồi vẽ lại. */
function gotoClassesView(view) {
  classesView = view;
  currentSection = 'classes';
  _writeAdminUrl(buildAdminHash('classes'), false);
  renderClasses(document.getElementById('admin-content'));
}

// ============================================================
// QUẢN LÝ GIÁO VIÊN (2026-08-27) — chỉ admin
// ============================================================
// Ba lớp đánh giá, cố ý tách vì trả lời 3 câu hỏi khác nhau:
//   1. Chỉ số tự động: tính từ dữ liệu dạy học, không ai nhập tay nên không "làm đẹp" được.
//   2. Sổ nhận xét: admin ghi tự do theo thời gian.
//   3. Phiếu chấm điểm 5 tiêu chí theo từng tháng, để so sánh giữa các kỳ và giữa giáo viên.

let _gvDangXem = null;   // id giáo viên đang mở hồ sơ; null = đang ở danh sách

const TIEU_CHI_GV = [
  { key: 'diem_chuyen_can', nhan: 'Chuyên cần', mo_ta: 'Đi dạy đủ, điểm danh đầy đủ' },
  { key: 'diem_bai_giang', nhan: 'Chất lượng bài giảng', mo_ta: 'Chuẩn bị, truyền đạt' },
  { key: 'diem_theo_sat', nhan: 'Theo sát học viên', mo_ta: 'Giao bài, chấm bài, nhận xét' },
  { key: 'diem_phan_hoi', nhan: 'Phản hồi', mo_ta: 'Trả lời học viên / phụ huynh' },
  { key: 'diem_ket_qua', nhan: 'Kết quả lớp', mo_ta: 'Tiến bộ và điểm số của học viên' },
];

function moGiaoVien(id) {
  _gvDangXem = id;
  currentSection = 'teachers';
  _writeAdminUrl(buildAdminHash('teachers'), false);
  renderCurrentSection();
}
function veDanhSachGiaoVien() {
  _gvDangXem = null;
  currentSection = 'teachers';
  _writeAdminUrl(buildAdminHash('teachers'), false);
  renderCurrentSection();
}


const TT_MAU = {
  cho: 'badge-warning', 'thanh-cong': 'badge-success',
  'tu-choi': 'badge-danger', 'that-bai': 'badge-gray', hoan: 'badge-gray',
};
const TT_CHU = {
  cho: 'Đang chờ', 'thanh-cong': 'Đã duyệt', 'tu-choi': 'Từ chối',
  'that-bai': 'Đã huỷ', hoan: 'Hoàn tiền',
};
const _gio = (d) => (d ? new Date(d).toLocaleString('vi-VN', {
  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
}) : '—');

let _sanPhamCache = [];

function renderTeachers(el) {
  return _gvDangXem ? renderTeacherDetail(el, _gvDangXem) : renderTeacherList(el);
}

async function renderTeacherList(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const { teachers } = await apiGet('/admin/teachers');
    el.innerHTML = `
      <div class="data-table-wrapper">
        <div class="table-toolbar">
          <h3 style="font-size:14px;font-weight:700;flex:1">${teachers.length} giáo viên</h3>
          <button class="btn btn-sm btn-primary" onclick="adminApp.moFormGiaoVien()"><i class="fa-solid fa-plus"></i> Thêm giáo viên</button>
        </div>
        <table class="data-table">
          <thead><tr><th>Giáo viên</th><th style="width:90px">Số lớp</th><th style="width:100px">Học viên</th><th style="width:120px">Điểm đánh giá</th><th style="width:150px">Thao tác</th></tr></thead>
          <tbody>
            ${teachers.length === 0 ? `<tr><td colspan="5"><div class="empty-state" style="padding:26px">
              <p>Chưa có giáo viên nào.</p>
              <p style="font-size:12px">Thêm giáo viên rồi gán lớp cho họ ở mục Quản lý lớp.</p></div></td></tr>` : ''}
            ${teachers.map(t => `
              <tr>
                <td>
                  <div style="font-weight:700">${_escHtml(t.name)}</div>
                  <div style="font-size:11px;color:var(--admin-text-muted)">${_escHtml(t.email)}${t.phone ? ' · ' + _esc(t.phone) : ''}</div>
                </td>
                <td>${t.so_lop}</td>
                <td>${t.so_hoc_vien}</td>
                <td>${t.diem_tb != null ? `<span class="badge ${t.diem_tb >= 4 ? 'badge-success' : t.diem_tb >= 3 ? 'badge-warning' : 'badge-danger'}">${t.diem_tb}/5</span>` : '<span style="color:var(--admin-text-muted)">chưa chấm</span>'}</td>
                <td>
                  <button class="btn btn-sm btn-outline" onclick="adminApp.moGiaoVien(${t.id})"><i class="fa-solid fa-eye"></i> Hồ sơ</button>
                  <button class="btn btn-icon btn-outline" title="Bỏ vai trò giáo viên" onclick="adminApp.boVaiTroGiaoVien(${t.id}, '${_escAttr(t.name)}')"><i class="fa-solid fa-user-minus"></i></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${_escHtml(err.message)}</p></div>`;
  }
}

function moFormGiaoVien() {
  openModal('Thêm giáo viên', `
    <p style="font-size:12.5px;color:var(--admin-text-muted);margin-bottom:14px">
      Email đã có tài khoản thì được chuyển thành giáo viên. Chưa có thì tạo tài khoản mới với
      mật khẩu mặc định <b>tengiaovien68</b> và gửi mail báo cho họ.
    </p>
    <div class="form-group"><label>Email <span style="color:#EF4444">*</span></label>
      <input type="email" id="f-gv-email" placeholder="giaovien@email.com"></div>
    <div class="form-group"><label>Họ tên</label>
      <input type="text" id="f-gv-name" placeholder="Để trống thì lấy theo email"></div>
    <div class="form-group"><label>Số điện thoại</label>
      <input type="text" id="f-gv-phone"></div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.luuGiaoVien(this)">Lưu</button>`);
}

async function luuGiaoVien(btn) {
  const email = document.getElementById('f-gv-email').value.trim();
  const name = document.getElementById('f-gv-name').value.trim();
  const phone = document.getElementById('f-gv-phone').value.trim();
  if (!email) { toast('Vui lòng nhập email.', 'error'); return; }
  const goc = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...'; }
  try {
    const r = await apiPost('/admin/teachers', { email, name, phone });
    toast(r.message);
    closeModal();
    veDanhSachGiaoVien();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = goc; }
  }
}

async function boVaiTroGiaoVien(id, ten) {
  if (!confirm(`Bỏ vai trò giáo viên của "${ten}"?\n\nTài khoản KHÔNG bị xoá, chỉ chuyển về học viên thường.`)) return;
  try {
    const r = await apiDel(`/admin/teachers/${id}`);
    toast(r.message);
    veDanhSachGiaoVien();
  } catch (err) { toast(err.message, 'error'); }
}

async function renderTeacherDetail(el, id) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const d = await apiGet(`/admin/teachers/${id}`);
    const cs = d.chi_so;
    const tyLeDiemDanh = cs.buoi_da_toi_ngay > 0 ? Math.round((cs.buoi_da_diem_danh / cs.buoi_da_toi_ngay) * 100) : null;
    const tyLeNop = cs.luot_can_nop > 0 ? Math.round((cs.luot_da_nop / cs.luot_can_nop) * 100) : null;
    const soNhanXet = cs.so_nhan_xet_so + cs.so_nhan_xet_buoi + cs.so_loi_phe_bai;
    const the = (nhan, gt, phu, mau) => `
      <div class="stat-card" style="border-left:3px solid ${mau || 'var(--admin-primary)'}">
        <div style="font-size:11px;color:var(--admin-text-muted);font-weight:600;text-transform:uppercase">${nhan}</div>
        <div style="font-size:22px;font-weight:800;margin:2px 0">${gt}</div>
        <div style="font-size:11px;color:var(--admin-text-muted)">${phu}</div>
      </div>`;
    const mauTyLe = (v) => v == null ? '#94A3B8' : v >= 80 ? '#10B981' : v >= 50 ? '#F59E0B' : '#EF4444';

    el.innerHTML = `
      <div style="margin-bottom:16px">
        <button class="btn btn-sm btn-outline" onclick="adminApp.veDanhSachGiaoVien()"><i class="fa-solid fa-arrow-left"></i> Danh sách giáo viên</button>
      </div>

      <div class="data-table-wrapper" style="padding:18px;margin-bottom:18px">
        <h3 style="font-size:17px;font-weight:800">${_escHtml(d.teacher.name)}</h3>
        <p style="font-size:12.5px;color:var(--admin-text-muted);margin-top:2px">
          ${_escHtml(d.teacher.email)}${d.teacher.phone ? ' · ' + _esc(d.teacher.phone) : ''}
          · Lớp phụ trách: ${d.classes.map(c => _esc(c.name)).join(', ') || '—'}
        </p>
      </div>

      <h3 style="font-size:14px;font-weight:800;margin:0 0 10px">1. Chỉ số tự động <span style="font-weight:400;font-size:12px;color:var(--admin-text-muted)">— tính thẳng từ dữ liệu dạy học</span></h3>
      <div class="stats-grid" style="margin-bottom:22px">
        ${the('Lớp / học viên', `${cs.so_lop} / ${cs.so_hoc_vien}`, 'đang phụ trách')}
        ${the('Ghi điểm danh', tyLeDiemDanh == null ? '—' : tyLeDiemDanh + '%', `${cs.buoi_da_diem_danh}/${cs.buoi_da_toi_ngay} buổi đã qua`, mauTyLe(tyLeDiemDanh))}
        ${the('Học viên nộp bài', tyLeNop == null ? '—' : tyLeNop + '%', `${cs.luot_da_nop}/${cs.luot_can_nop} lượt · ${cs.so_bai_giao} bài đã giao`, mauTyLe(tyLeNop))}
        ${the('Điểm TB học viên', cs.diem_tb_hoc_vien == null ? '—' : cs.diem_tb_hoc_vien + '%', 'lần nộp mới nhất mỗi bài', mauTyLe(cs.diem_tb_hoc_vien))}
        ${the('Nhận xét đã viết', soNhanXet, `${cs.so_nhan_xet_so} sổ · ${cs.so_nhan_xet_buoi} buổi · ${cs.so_loi_phe_bai} lời phê bài`)}
      </div>

      <h3 style="font-size:14px;font-weight:800;margin:0 0 10px">2. Phiếu chấm điểm theo kỳ</h3>
      <div class="data-table-wrapper" style="margin-bottom:22px">
        <div class="table-toolbar">
          <h3 style="font-size:13px;font-weight:700;flex:1">${d.reviews.length} phiếu</h3>
          <button class="btn btn-sm btn-primary" onclick="adminApp.moPhieuChamDiem(${id})"><i class="fa-solid fa-star"></i> Chấm điểm kỳ này</button>
        </div>
        <table class="data-table">
          <thead><tr><th style="width:90px">Kỳ</th>${TIEU_CHI_GV.map(t => `<th title="${t.mo_ta}">${t.nhan}</th>`).join('')}<th style="width:80px">TB</th><th>Nhận xét</th><th style="width:90px"></th></tr></thead>
          <tbody>
            ${d.reviews.length === 0 ? `<tr><td colspan="9"><div class="empty-state" style="padding:22px"><p>Chưa chấm điểm kỳ nào.</p></div></td></tr>` : ''}
            ${d.reviews.map(r => `
              <tr>
                <td style="font-weight:700">${r.ky}</td>
                ${TIEU_CHI_GV.map(t => `<td>${r[t.key] == null ? '—' : r[t.key] + '/5'}</td>`).join('')}
                <td><span class="badge ${r.diem_tb >= 4 ? 'badge-success' : r.diem_tb >= 3 ? 'badge-warning' : 'badge-danger'}">${r.diem_tb ?? '—'}</span></td>
                <td style="font-size:12px">${_escHtml(r.nhan_xet || '')}</td>
                <td>
                  <button class="btn btn-icon btn-outline" title="Sửa" onclick="adminApp.moPhieuChamDiem(${id}, '${r.ky}')"><i class="fa-solid fa-pen"></i></button>
                  <button class="btn btn-icon btn-outline" title="Xoá" onclick="adminApp.xoaPhieuChamDiem(${r.id})"><i class="fa-solid fa-trash"></i></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <h3 style="font-size:14px;font-weight:800;margin:0 0 10px">3. Sổ nhận xét</h3>
      <div class="data-table-wrapper" style="padding:16px">
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <input type="text" id="f-gv-note" placeholder="Ghi nhận xét về giáo viên này..." style="flex:1;padding:9px 11px;border:1.5px solid var(--admin-border);border-radius:8px;font-size:13px">
          <button class="btn btn-sm btn-primary" onclick="adminApp.themNhanXetGiaoVien(${id}, this)"><i class="fa-solid fa-plus"></i> Thêm</button>
        </div>
        ${d.notes.length === 0 ? '<p style="font-size:12.5px;color:var(--admin-text-muted)">Chưa có nhận xét nào.</p>' : ''}
        ${d.notes.map(n => `
          <div style="display:flex;gap:10px;padding:10px 0;border-top:1px solid var(--admin-border)">
            <div style="flex:1">
              <div style="font-size:13px">${_escHtml(n.note)}</div>
              <div style="font-size:11px;color:var(--admin-text-muted);margin-top:3px">
                ${new Date(n.created_at).toLocaleString('vi-VN')}${n.author_name ? ' · ' + _esc(n.author_name) : ''}
              </div>
            </div>
            <button class="btn btn-icon btn-outline" title="Xoá" onclick="adminApp.xoaNhanXetGiaoVien(${n.id})"><i class="fa-solid fa-trash"></i></button>
          </div>`).join('')}
      </div>`;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${_escHtml(err.message)}</p></div>`;
  }
}

function moPhieuChamDiem(teacherId, ky) {
  const kyMacDinh = ky || new Date().toISOString().slice(0, 7);
  openModal(`Chấm điểm giáo viên — kỳ ${kyMacDinh}`, `
    <div class="form-group"><label>Kỳ đánh giá (YYYY-MM)</label>
      <input type="month" id="f-gv-ky" value="${kyMacDinh}"></div>
    ${TIEU_CHI_GV.map(t => `
      <div class="form-group">
        <label>${t.nhan} <span style="font-weight:400;color:var(--admin-text-muted)">— ${t.mo_ta}</span></label>
        <select id="f-gv-${t.key}">
          <option value="">Chưa chấm</option>
          ${[1, 2, 3, 4, 5].map(n => `<option value="${n}">${n} — ${['Kém', 'Yếu', 'Đạt', 'Tốt', 'Xuất sắc'][n - 1]}</option>`).join('')}
        </select>
      </div>`).join('')}
    <div class="form-group"><label>Nhận xét chung</label>
      <textarea id="f-gv-nhanxet" rows="3" style="width:100%;padding:9px;border:1px solid var(--admin-border);border-radius:6px;font-family:inherit;font-size:13px"></textarea></div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.luuPhieuChamDiem(${teacherId}, this)">Lưu phiếu</button>`);
}

async function luuPhieuChamDiem(teacherId, btn) {
  const body = { ky: document.getElementById('f-gv-ky').value, nhan_xet: document.getElementById('f-gv-nhanxet').value };
  TIEU_CHI_GV.forEach(t => { body[t.key] = document.getElementById(`f-gv-${t.key}`).value; });
  const goc = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...'; }
  try {
    const r = await apiPut(`/admin/teachers/${teacherId}/reviews`, body);
    toast(r.message);
    closeModal();
    moGiaoVien(teacherId);
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = goc; }
  }
}

async function xoaPhieuChamDiem(id) {
  if (!confirm('Xoá phiếu đánh giá này?')) return;
  try { toast((await apiDel(`/admin/teacher-reviews/${id}`)).message); moGiaoVien(_gvDangXem); }
  catch (err) { toast(err.message, 'error'); }
}

async function themNhanXetGiaoVien(teacherId, btn) {
  const inp = document.getElementById('f-gv-note');
  const note = inp.value.trim();
  if (!note) { toast('Nhận xét không được để trống.', 'error'); return; }
  if (btn) btn.disabled = true;
  try { toast((await apiPost(`/admin/teachers/${teacherId}/notes`, { note })).message); moGiaoVien(teacherId); }
  catch (err) { toast(err.message, 'error'); if (btn) btn.disabled = false; }
}

async function xoaNhanXetGiaoVien(id) {
  if (!confirm('Xoá nhận xét này?')) return;
  try { toast((await apiDel(`/admin/teacher-notes/${id}`)).message); moGiaoVien(_gvDangXem); }
  catch (err) { toast(err.message, 'error'); }
}

// ============================================================
// DASHBOARD
// ============================================================
// ============================================================
// TỔNG QUAN — HAI BẢN KHÁC HẲN NHAU THEO VAI TRÒ
// ============================================================
// Giáo viên và quản trị mở cùng một trang nhưng cần hai thứ khác nhau:
//   • giáo viên — việc phải làm trong hôm nay: buổi chưa điểm danh, em chưa nộp bài, bài vừa nộp.
//   • quản trị  — trung tâm đang sống thế nào: tiền vào ra hôm nay/tuần/tháng, tiền đi vào mục
//                 nào, lớp nào đang đuối, còn việc gì kẹt. Ba bảng "việc của người đứng lớp"
//                 KHÔNG hiện cho quản trị: họ không phải người điểm danh, và 49 buổi × nhiều lớp
//                 đổ ra đây thì thứ cần nhìn (tiền) bị đẩy xuống dưới màn hình.
// Quản trị vẫn xem được các bảng đó khi vào từng lớp ở khu Quản lý lớp.
async function renderDashboard(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i><p style="margin-top:12px">Đang tải...</p></div>';
  return laQuanTri() ? renderTongQuanQuanTri(el) : renderTongQuanGiaoVien(el);
}

// ------------------------------------------------------------
// TIỀN — định dạng gọn
// ------------------------------------------------------------
/** 45.000.000 -> "45 tr" · 1.250.000.000 -> "1,25 tỷ". Dùng cho nhãn trục và ô số liệu. */
function tienGon(n) {
  const v = Number(n) || 0;
  const dau = v < 0 ? '-' : '';
  const a = Math.abs(v);
  if (a >= 1e9) return dau + (a / 1e9).toFixed(a >= 1e10 ? 0 : 2).replace(/\.?0+$/, '').replace('.', ',') + ' tỷ';
  if (a >= 1e6) return dau + (a / 1e6).toFixed(a >= 1e8 ? 0 : 1).replace(/[,.]0$/, '').replace('.', ',') + ' tr';
  if (a >= 1e3) return dau + Math.round(a / 1e3) + ' ng';
  return dau + a;
}
/** Số đầy đủ kèm "đ" — dùng ở tooltip và bảng, nơi cần con số chính xác. */
const tienDay = (n) => (Number(n) || 0).toLocaleString('vi-VN') + 'đ';

/**
 * Nấc trục tròn trịa gần nhất trên `max`. Trục lẻ kiểu 47.320.000 rất khó đọc.
 *
 * Dãy hệ số phải MỊN. Bản đầu chỉ có [1, 2, 2.5, 5, 10]: đỉnh dữ liệu 50,7tr nhảy thẳng lên
 * nấc 100tr, tức cột cao nhất chỉ chiếm 51% chiều cao và NỬA TRÊN biểu đồ trống trơn — nhìn
 * như đồ thị hỏng. Dãy hiện tại cho ra 60tr (85%). Đo lại vài mốc: 12tr -> 12tr (100%),
 * 3,2tr -> 4tr (80%), 43tr -> 50tr (86%).
 */
function nacTron(max) {
  if (!(max > 0)) return 1;
  const mu = Math.pow(10, Math.floor(Math.log10(max)));
  for (const b of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (mu * b >= max) return mu * b;
  return mu * 10;
}

/**
 * Phần trăm thay đổi so với kỳ trước. Trả null khi kỳ trước KHÔNG DƯƠNG — nơi gọi hiện con số
 * tuyệt đối thay thế.
 *
 * Vì sao chặn cả số ÂM chứ không chỉ số 0: tháng trước lỗ 12,7tr, tháng này lãi 2,6tr, công thức
 * ra -120% — mũi tên chỉ XUỐNG màu đỏ trong khi thực tế là từ lỗ chuyển sang lãi. Phần trăm thay
 * đổi chỉ có nghĩa khi mẫu số dương; với mẫu âm thì phải nói thẳng con số.
 */
function chenhLech(nay, truoc) {
  if (!(truoc > 0)) return null;
  return Math.round(((nay - truoc) / truoc) * 100);
}

// ------------------------------------------------------------
// BIỂU ĐỒ CỘT GHÉP — thu / chi theo tháng
// ------------------------------------------------------------
// SVG vẽ tay, KHÔNG thêm thư viện chart (dự án là vanilla JS thuần — xem README mục 6; cùng lối
// với đường xu hướng điểm ở src/pages/lotrinh.js).
//
// Vì sao CỘT GHÉP chứ không phải hai trục hay cột chồng:
//   • hai trục y trên một khung là lỗi kinh điển — tỉ lệ giữa hai trục do người vẽ tự chọn nên
//     biểu đồ "sinh ra" một mối tương quan không có thật.
//   • cột chồng trả lời "tổng bao nhiêu", còn câu hỏi ở đây là "thu so với chi tháng đó thế nào"
//     — phải đặt cạnh nhau, chung MỘT trục, mới so được.
// Thu = xanh lá #17794A, chi = cam đất #D2762F (tông lấy từ ảnh mẫu khách gửi). Cặp này đã chạy
// qua bộ kiểm tra mù màu: ΔE 8,0 (protan) / 24,8 (thị lực thường) — vừa đủ ngưỡng 8. Danh sách
// các cặp đã thử và TRƯỢT nằm ở đầu khối --tq-* trong src/css/admin.css; đổi màu thì đọc chỗ đó
// và CHẠY LẠI bộ kiểm, đừng chọn bằng mắt.

/** Dữ liệu tháng đang vẽ — tooltip tra theo chỉ số nên phải giữ ở đây. */
let _tqThang = [];

/**
 * Cắt bỏ những tháng RỖNG ở ĐẦU dãy. Trung tâm mới mở thì 3-4 tháng đầu không có phiếu nào,
 * để nguyên là một phần ba biểu đồ trắng trơn. Giữ tối thiểu 5 tháng để trục không quá ngắn,
 * và chỉ cắt ở đầu — tháng rỗng ở GIỮA là thông tin thật ("tháng đó không thu chi gì").
 */
function _tqCatDauRong(ds) {
  let dau = 0;
  while (dau < ds.length - 5 && ds[dau].thu === 0 && ds[dau].chi === 0) dau++;
  return ds.slice(dau);
}

function _tqCotHtml(thangGoc) {
  const thang = _tqCatDauRong(thangGoc);
  _tqThang = thang;
  const W = 960, H = 290;
  const TREN = 18, DUOI = 40, TRAI = 76, PHAI = 16;
  const nen = W - TRAI - PHAI, cao = H - TREN - DUOI;
  const dinh = nacTron(Math.max(1, ...thang.flatMap((t) => [t.thu, t.chi])));
  const y = (v) => TREN + cao - (v / dinh) * cao;
  const bang = nen / thang.length;
  // Cột dày tối đa 26px, khe 3px giữa hai cột cùng tháng — hai khối màu dính nhau thì mắt đọc
  // thành một khối duy nhất.
  const rongCot = Math.min(30, (bang - 28) / 2);
  const KHE = 4;

  const cot = (x, v, lop) => {
    if (v <= 0) return '';
    const h = TREN + cao - y(v);
    // Bo 8px (ảnh mẫu bo tròn hẳn đầu cột) nhưng không quá nửa bề ngang cột, nếu không
    // hai cung bo chồng nhau và đầu cột méo thành hình giọt nước.
    const r = Math.min(8, h, rongCot / 2);
    // Bo ở ĐẦU SỐ LIỆU, vuông ở chân: chân cột là vạch 0, bo tròn cả hai đầu là nói dối về
    // điểm xuất phát.
    return `<path class="${lop}" d="M${x},${TREN + cao} L${x},${y(v) + r} Q${x},${y(v)} ${x + r},${y(v)}`
      + ` L${x + rongCot - r},${y(v)} Q${x + rongCot},${y(v)} ${x + rongCot},${y(v) + r}`
      + ` L${x + rongCot},${TREN + cao} Z"/>`;
  };

  return `
    <div class="tq-chart" id="tq-chart-box">
      <svg class="tq-svg" viewBox="0 0 ${W} ${H}" role="img"
           aria-label="Biểu đồ cột thu và chi theo tháng">
        ${[0, 0.25, 0.5, 0.75, 1].map((p) => `
          <line class="tq-luoi" x1="${TRAI}" x2="${W - PHAI}" y1="${y(dinh * p)}" y2="${y(dinh * p)}"/>
          <text class="tq-truc-y" x="${TRAI - 12}" y="${y(dinh * p) + 4}" text-anchor="end">${tienGon(dinh * p)}</text>`).join('')}
        ${thang.map((t, i) => {
          const giua = TRAI + bang * i + bang / 2;
          const x0 = giua - rongCot - KHE / 2;
          const cuoi = i === thang.length - 1;
          return `
            ${/* Vùng bắt chuột phủ CẢ BỀ CAO của tháng: bắt đúng trên thân cột thì cột thấp gần
                 như không rê trúng được. Vùng này cũng là thứ tô sáng nền tháng khi rê. */ ''}
            <rect class="tq-vung" x="${TRAI + bang * i}" y="${TREN}" width="${bang}" height="${cao}"
                  rx="7" onmousemove="adminApp.tqTip(event, ${i})" onmouseleave="adminApp.tqTip(event, -1)"/>
            ${cot(x0, t.thu, 'tq-cot-thu')}
            ${cot(x0 + rongCot + KHE, t.chi, 'tq-cot-chi')}
            <text class="tq-truc-x${cuoi ? ' is-nay' : ''}" x="${giua}" y="${H - 16}" text-anchor="middle">${t.ky.slice(5)}/${t.ky.slice(2, 4)}</text>`;
        }).join('')}
        <line class="tq-truc" x1="${TRAI}" x2="${W - PHAI}" y1="${TREN + cao}" y2="${TREN + cao}"/>
      </svg>
      <div class="tq-tip" id="tq-tip" hidden></div>
    </div>`;
}

/** Bảng chú thích nổi khi rê chuột. `i < 0` = ẩn đi. */
function tqTip(ev, i) {
  const box = document.getElementById('tq-chart-box');
  const tip = document.getElementById('tq-tip');
  if (!box || !tip) return;
  const t = _tqThang[i];
  if (!t) { tip.hidden = true; return; }
  const chenh = t.thu - t.chi;
  tip.innerHTML = `
    <div class="tq-tip-ky">Tháng ${t.ky.slice(5)}/${t.ky.slice(0, 4)}</div>
    <div class="tq-tip-hang"><i style="background:var(--tq-thu)"></i><span>Thu</span><b>${tienDay(t.thu)}</b></div>
    <div class="tq-tip-hang"><i style="background:var(--tq-chi)"></i><span>Chi</span><b>${tienDay(t.chi)}</b></div>
    <div class="tq-tip-hang is-chenh"><i></i><span>Chênh lệch</span><b>${tienDay(chenh)}</b></div>`;
  tip.hidden = false;
  const r = box.getBoundingClientRect();
  const x = ev.clientX - r.left;
  const y = ev.clientY - r.top;
  // Kẹp trong khung để bảng không tràn ra ngoài thẻ ở hai mép trái/phải.
  tip.style.left = Math.max(6, Math.min(r.width - tip.offsetWidth - 6, x - tip.offsetWidth / 2)) + 'px';
  tip.style.top = Math.max(6, y - tip.offsetHeight - 14) + 'px';
}

/** Dải thanh ngang cho "tiền vào/ra mục nào". Một biểu đồ = MỘT màu: độ dài thanh đã nói hết
 *  về độ lớn rồi, tô mỗi mục một màu chỉ là mã hoá lặp và làm hỏng bộ màu phân loại. */
function _tqThanhHtml(ds, lop) {
  if (!ds.length) return '<p class="tq-trong">Tháng này chưa có phiếu nào.</p>';
  const dinh = Math.max(...ds.map((d) => d.tien)) || 1;
  const tong = ds.reduce((a, d) => a + d.tien, 0);
  return `<div class="tq-thanh-ds">${ds.map((d) => `
    <div class="tq-thanh-hang">
      <span class="tq-thanh-ten" title="${esc(d.ten)}">${esc(d.ten)}</span>
      <span class="tq-thanh-ray"><i class="${lop}" style="width:${Math.max(3, (d.tien / dinh) * 100)}%"></i></span>
      <span class="tq-thanh-so">${tienGon(d.tien)}<em>${Math.round((d.tien / tong) * 100)}%</em></span>
    </div>`).join('')}</div>`;
}

/**
 * Ô số liệu của Tổng quan quản trị. KHÔNG dùng lại `.stat-card` chung: thẻ đó có khối icon
 * pastel 42px nằm trên cùng, đẩy con số xuống dưới và làm sáu thẻ cạnh nhau trông nặng nề.
 * Ở đây icon nhỏ nằm CÙNG DÒNG với nhãn, con số là thứ to nhất — mắt bắt số trước, nhãn sau.
 */
function _tqOHtml({ nhan, so, phu, delta, tot = true, mau, icon, di }) {
  const mui = delta == null ? '' : delta > 0 ? 'fa-arrow-up' : delta < 0 ? 'fa-arrow-down' : 'fa-minus';
  const lop = delta == null || delta === 0 ? '' : ((delta > 0) === tot ? ' is-tot' : ' is-xau');
  return `
    <div class="tq-o${di ? ' is-bam' : ''}"${di ? ` onclick="adminApp.navigate('${di}')"` : ''} style="--tq-o-mau:${mau}">
      <div class="tq-o-dau"><i class="fa-solid ${icon}"></i><span>${nhan}</span></div>
      <div class="tq-o-so">${so}</div>
      ${delta != null
        ? `<div class="tq-o-phu${lop}"><i class="fa-solid ${mui}"></i><span>${Math.abs(delta)}% so với tháng trước</span></div>`
        : `<div class="tq-o-phu">${phu ? `<span>${phu}</span>` : ''}</div>`}
    </div>`;
}

/**
 * Một chỉ số của lớp: nhãn + con số + thanh mức. Thanh mức dùng CÙNG MỘT ramp một màu
 * (đậm dần theo giá trị) chứ không đổi hẳn sang màu khác, để "70%" và "92%" đọc ra là hai mức
 * của cùng một thứ. Dưới 70% tô màu cảnh báo vì đó là ngưỡng cần để mắt tới.
 */
function _tqDoHtml(nhan, giaTri) {
  if (giaTri == null) return `<div class="tq-do"><span class="tq-do-nhan">${nhan}</span><b>—</b></div>`;
  const v = Math.max(0, Math.min(100, Number(giaTri)));
  const muc = v >= 85 ? 'is-tot' : v >= 70 ? 'is-vua' : 'is-kem';
  return `
    <div class="tq-do">
      <span class="tq-do-nhan">${nhan}</span>
      <b>${Math.round(v)}%</b>
      <span class="tq-do-ray"><i class="${muc}" style="width:${v}%"></i></span>
    </div>`;
}

async function renderTongQuanQuanTri(el) {
  try {
    const d = await apiGet('/admin/tong-quan');
    const k = d.tien.ky;
    const chenh = k.thang.thu - k.thang.chi;
    const chenhTruoc = k.thang_truoc.thu - k.thang_truoc.chi;
    const cb = d.canh_bao || {};

    // Chỉ liệt kê những việc THẬT SỰ còn tồn; đếm = 0 thì không hiện dòng nào, để danh sách
    // luôn đúng nghĩa "việc cần xử lý" chứ không phải bảng kê toàn số 0.
    const viec = [
      ['cho_duyet', 'tài khoản chờ duyệt', 'fa-user-check', 'users'],
      ['diem_danh', 'buổi chưa điểm danh xong', 'fa-clipboard-check', 'classes'],
      ['bai_qua_han', 'bài quá hạn còn em chưa nộp', 'fa-list-check', 'classes'],
      ['cho_cham', 'bài kiểm tra chờ chấm', 'fa-file-pen', 'de-bai'],
      ['du_hoc_yeu_cau', 'yêu cầu sửa hồ sơ chờ duyệt', 'fa-pen-to-square', 'du-hoc'],
      ['du_hoc_dung', 'hồ sơ du học đứng yên quá 30 ngày', 'fa-plane-departure', 'du-hoc'],
      ['ktx_no', 'người ở KTX chưa đóng tiền kỳ này', 'fa-bed', 'ktx'],
      ['thiet_bi', 'cảnh báo thiết bị chưa xử lý', 'fa-mobile-screen-button', 'thiet-bi'],
    ].filter(([key]) => cb[key] > 0);

    el.innerHTML = `
      <div class="tq-luoi-o">
        ${_tqOHtml({ nhan: 'Thu tháng này', so: tienGon(k.thang.thu), delta: chenhLech(k.thang.thu, k.thang_truoc.thu),
          tot: true, mau: 'var(--tq-thu)', icon: 'fa-money-bill-wave', di: 'quy' })}
        ${_tqOHtml({ nhan: 'Chi tháng này', so: tienGon(k.thang.chi), delta: chenhLech(k.thang.chi, k.thang_truoc.chi),
          tot: false, mau: 'var(--tq-chi)', icon: 'fa-receipt', di: 'quy' })}
        ${_tqOHtml({ nhan: 'Chênh lệch tháng này', so: tienGon(chenh), delta: chenhLech(chenh, chenhTruoc),
          phu: `Tháng trước ${tienGon(chenhTruoc)}`, tot: true,
          mau: chenh >= 0 ? 'var(--admin-success)' : 'var(--admin-danger)',
          icon: chenh >= 0 ? 'fa-wallet' : 'fa-triangle-exclamation', di: 'quy' })}
        ${_tqOHtml({ nhan: 'Thu hôm nay', so: tienGon(k.hom_nay.thu), phu: `Tuần này ${tienGon(k.tuan.thu)}`,
          mau: '#2F6B58', icon: 'fa-calendar-day', di: 'quy' })}
        ${_tqOHtml({ nhan: 'Du học còn phải thu', so: tienGon(d.nguon_khac.du_hoc_con_phai_thu),
          phu: `Đã thu ${tienGon(d.nguon_khac.du_hoc_da_thu)}`,
          mau: 'var(--admin-warning)', icon: 'fa-plane-departure', di: 'du-hoc' })}
        ${_tqOHtml({ nhan: 'Ký túc xá tháng này', so: tienGon(d.nguon_khac.ktx_thang_nay),
          phu: d.nguon_khac.ktx_no_nguoi > 0 ? `${d.nguon_khac.ktx_no_nguoi} người chưa đóng` : 'Đã thu đủ',
          mau: '#12726B', icon: 'fa-bed', di: 'ktx' })}
      </div>

      <div class="tq-the">
        <div class="tq-the-dau">
          <h3>Thu – chi theo tháng</h3>
          <div class="tq-chu-giai">
            <span><i style="background:var(--tq-thu)"></i>Thu</span>
            <span><i style="background:var(--tq-chi)"></i>Chi</span>
          </div>
        </div>
        ${d.tien.co_bang ? _tqCotHtml(d.tien.theo_thang) : '<p class="tq-trong">Chưa chạy migration sổ thu chi.</p>'}
        <p class="tq-ghi-chu">Chỉ tính phiếu trong Sổ thu – chi. Tiền du học và ký túc xá ghi ở sổ riêng.</p>
      </div>

      <div class="admin-cols-2 tq-hang">
        <div class="tq-the">
          <div class="tq-the-dau"><h3><span class="tq-cham" style="background:var(--tq-thu)"></span> Thu tháng này theo mục</h3></div>
          ${_tqThanhHtml(d.tien.thu_theo_dm, 'is-thu')}
        </div>
        <div class="tq-the">
          <div class="tq-the-dau"><h3><span class="tq-cham" style="background:var(--tq-chi)"></span> Chi tháng này theo mục</h3></div>
          ${_tqThanhHtml(d.tien.chi_theo_dm, 'is-chi')}
        </div>
      </div>

      <div class="admin-cols-2 tq-hang">
        <div class="tq-the">
          <div class="tq-the-dau"><h3>Tình trạng lớp</h3><a class="tq-the-link" onclick="adminApp.navigate('classes')">Quản lý lớp</a></div>
          ${!d.lop.length
            ? '<p class="tq-trong">Chưa có lớp nào.</p>'
            : `<div class="tq-lop-ds">${d.lop.map((l) => `
                <div class="tq-lop" onclick="adminApp.openClassDetail(${l.id}, '${String(l.name).replace(/'/g, "\\'")}')">
                  <div class="tq-lop-ten">
                    <b>${esc(l.name)}</b>
                    <span>${esc(l.teacher_name || 'Chưa có giáo viên')} · ${l.si_so} học viên · ${l.buoi} buổi</span>
                  </div>
                  <div class="tq-lop-so">
                    ${_tqDoHtml('Chuyên cần', l.chuyen_can)}
                    ${_tqDoHtml('Điểm TB', l.diem_tb)}
                    <div class="tq-do">
                      <span class="tq-do-nhan">Chưa nộp</span>
                      <b class="${l.chua_nop > 0 ? 'is-canh-bao' : ''}">${l.chua_nop || 0}</b>
                    </div>
                  </div>
                </div>`).join('')}</div>`}
        </div>

        <div class="tq-the">
          <div class="tq-the-dau"><h3>Cần xử lý</h3>${viec.length ? `<span class="tq-the-dem">${viec.length}</span>` : ''}</div>
          ${!viec.length
            ? '<p class="tq-trong">Không có việc nào đang kẹt. 🎉</p>'
            : `<ul class="tq-viec">${viec.map(([key, nhan, icon, di]) => `
                <li onclick="adminApp.navigate('${di}')">
                  <i class="fa-solid ${icon}"></i>
                  <span>${nhan}</span>
                  <b>${cb[key]}</b>
                  <i class="fa-solid fa-chevron-right tq-viec-mui"></i>
                </li>`).join('')}</ul>`}
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-exclamation-triangle"></i><h3>Lỗi tải dữ liệu</h3><p>${esc(err.message)}</p></div>`;
  }
}

async function renderTongQuanGiaoVien(el) {
  try {
    const data = await apiGet('/admin/stats');
    const ex = data.exercise7d || {};
    const dt = (s) => new Date(s).toLocaleDateString('vi-VN');
    const lessonLabel = (id) => ({
      'pron:initials': 'Thanh mẫu', 'pron:finals': 'Vận mẫu', 'pron:tones': 'Thanh điệu',
    }[id] || tbLabel(id));

    el.innerHTML = `
      ${!data.classTablesReady ? `
        <div class="admin-alert admin-alert--warn">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <div>
            <b>Chưa chạy migration bảng lớp học.</b>
            Chạy <code>server/config/migration-classes-attendance.sql</code> rồi tải lại trang.
          </div>
        </div>` : ''}

      <!-- Nhóm số liệu dạy & học — thứ giáo viên cần nhìn mỗi ngày -->
      <div class="stats-grid">
        <div class="stat-card stat-card--link" onclick="adminApp.navigate('classes')">
          <div class="stat-icon" style="background:#E4F1EA;color:#265648"><i class="fa-solid fa-chalkboard-user"></i></div>
          <div class="stat-value">${data.classCount}</div>
          <div class="stat-label">Lớp</div>
        </div>
        <div class="stat-card stat-card--link" onclick="adminApp.navigate('classes')">
          <div class="stat-icon" style="background:#DDF1E6;color:#17794A"><i class="fa-solid fa-user-graduate"></i></div>
          <div class="stat-value">${data.studentCount}</div>
          <div class="stat-label">Học viên</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#E6F0EC;color:#2F6B58"><i class="fa-solid fa-calendar-days"></i></div>
          <div class="stat-value">${data.sessionCount}</div>
          <div class="stat-label">Buổi học</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#FBEEDF;color:#B85C1A"><i class="fa-solid fa-pen-to-square"></i></div>
          <div class="stat-value">${ex.count || 0}</div>
          <div class="stat-label">Bài nộp · 7 ngày</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#DFF0EF;color:#12726B"><i class="fa-solid fa-bullseye"></i></div>
          <div class="stat-value">${ex.avg_score != null ? ex.avg_score + '%' : '—'}</div>
          <div class="stat-label">Điểm TB · 7 ngày</div>
        </div>
        <div class="stat-card stat-card--link" onclick="adminApp.navigate('users')">
          <div class="stat-icon" style="background:#F6E7DC;color:#A2541C"><i class="fa-solid fa-bolt"></i></div>
          <div class="stat-value">${data.activeToday}</div>
          <div class="stat-label">Học hôm nay</div>
        </div>
      </div>

      <div class="admin-cols-2">
        <!-- Việc cần làm: buổi học tới ngày rồi mà chưa điểm danh xong -->
        <div class="data-table-wrapper">
          <div class="table-toolbar">
            <h3 style="font-size:14px;font-weight:800;flex:1"><i class="fa-solid fa-clipboard-check" style="color:var(--admin-warning)"></i> Chưa điểm danh</h3>
          </div>
          ${(data.pendingAttendance || []).length === 0
            ? `<div class="empty-state" style="padding:24px"><p>Đã điểm danh hết. 🎉</p></div>`
            : `<table class="data-table">
                <thead><tr><th>Ngày</th><th>Lớp</th><th>Đã ghi</th><th></th></tr></thead>
                <tbody>
                  ${data.pendingAttendance.map(s => `
                    <tr>
                      <td style="font-weight:700;white-space:nowrap">${dt(s.session_date)}</td>
                      <td>${s.class_name}${s.topic ? `<div style="font-size:12px;color:var(--admin-text-muted)">${s.topic}</div>` : ''}</td>
                      <td><span class="badge badge-warning">${s.marked}/${s.roster}</span></td>
                      <td><button class="btn btn-sm btn-primary" onclick="adminApp.jumpToAttendance(${s.class_id}, '${String(s.class_name).replace(/'/g, "\\'")}', ${s.id})">Điểm danh</button></td>
                    </tr>`).join('')}
                </tbody>
              </table>`}
        </div>

        <!-- Học viên cần chú ý: vắng nhiều / điểm thấp / chưa làm bài nào -->
        <div class="data-table-wrapper">
          <div class="table-toolbar">
            <h3 style="font-size:14px;font-weight:800;flex:1"><i class="fa-solid fa-user-clock" style="color:var(--admin-danger)"></i> Học viên cần chú ý</h3>
          </div>
          ${(data.attentionStudents || []).length === 0
            ? `<div class="empty-state" style="padding:24px"><p>Không có em nào đáng lo. 👍</p></div>`
            : `<table class="data-table">
                <thead><tr><th>Học viên</th><th>Vắng</th><th>Điểm TB</th><th></th></tr></thead>
                <tbody>
                  ${data.attentionStudents.map(s => `
                    <tr>
                      <td style="font-weight:700">${s.name}<div style="font-size:12px;color:var(--admin-text-muted)">${s.class_name}</div></td>
                      <td>${s.absent_count > 0 ? `<span class="badge badge-danger">${s.absent_count}</span>` : '—'}</td>
                      <td>${s.ex_count === 0 ? '<span class="badge badge-gray">Chưa làm bài</span>' : scoreBadge(s.avg_score)}</td>
                      <td><button class="btn btn-sm btn-outline" onclick="adminApp.jumpToStudent(${s.class_id}, '${String(s.class_name).replace(/'/g, "\\'")}', ${s.id})">Xem</button></td>
                    </tr>`).join('')}
                </tbody>
              </table>`}
        </div>
      </div>

      <!-- Bài đã giao còn em chưa nộp — việc theo dõi rõ ràng nhất của giáo viên -->
      ${(data.pendingAssignments || []).length === 0 ? '' : `
      <div class="data-table-wrapper" style="margin-bottom:20px">
        <div class="table-toolbar">
          <h3 style="font-size:14px;font-weight:800;flex:1"><i class="fa-solid fa-list-check" style="color:var(--admin-warning)"></i> Bài còn em chưa nộp</h3>
        </div>
        <table class="data-table">
          <thead><tr><th>Bài</th><th>Lớp</th><th>Hạn</th><th>Còn thiếu</th><th></th></tr></thead>
          <tbody>
            ${data.pendingAssignments.map(a => `
              <tr>
                <td style="font-weight:700">${assignmentLabel(a.lesson_id, a.title)}</td>
                <td>${a.class_name}</td>
                <td>${_dueText(a.due_date)}</td>
                <td><span class="badge badge-warning">${a.total_students - a.submitted_count} em</span></td>
                <td><button class="btn btn-sm btn-outline" onclick="adminApp.viewAssignmentSubmissions(${a.id})">Xem tên</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`}

      <!-- Hoạt động làm bài mới nhất của toàn hệ thống -->
      <div class="data-table-wrapper" style="margin-bottom:20px">
        <div class="table-toolbar">
          <h3 style="font-size:14px;font-weight:800;flex:1"><i class="fa-solid fa-wave-square" style="color:var(--admin-primary)"></i> Vừa nộp</h3>
        </div>
        ${(data.recentSubmissions || []).length === 0
          ? `<div class="empty-state" style="padding:24px"><p>Chưa có ai nộp bài.</p></div>`
          : `<table class="data-table">
              <thead><tr><th>Học viên</th><th>Bài</th><th>Đúng</th><th>Điểm</th><th>Lúc</th></tr></thead>
              <tbody>
                ${data.recentSubmissions.map(s => `
                  <tr>
                    <td style="font-weight:700">${s.user_name}</td>
                    <td>${lessonLabel(s.lesson_id)}</td>
                    <td>${s.correct_answers}/${s.total_questions}</td>
                    <td>${scoreBadge(s.score_percent)}</td>
                    <td style="color:var(--admin-text-muted);font-size:12px">${new Date(s.created_at).toLocaleString('vi-VN')}</td>
                  </tr>`).join('')}
              </tbody>
            </table>`}
      </div>

      <div class="mini-stats">
        <div class="mini-stat" onclick="adminApp.navigate('users')"><i class="fa-solid fa-users"></i><b>${data.users}</b><span>Tài khoản</span></div>
        <div class="mini-stat"><i class="fa-solid fa-clipboard-check"></i><b>${data.examResults}</b><span>Lượt thi</span></div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-exclamation-triangle"></i><h3>Lỗi tải dữ liệu</h3><p>${err.message}</p></div>`;
  }
}


// ============================================================
// USERS MANAGEMENT
// ============================================================
let userPage = 1;
let userSearch = '';

async function renderUsers(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';

  try {
    const qs = `?page=${userPage}&limit=20${userSearch ? '&search=' + encodeURIComponent(userSearch) : ''}`;
    const data = await apiGet('/admin/users' + qs);

    el.innerHTML = `
      <div class="data-table-wrapper">
        <div class="table-toolbar">
          <input class="search-input" placeholder="Tìm kiếm người dùng..." value="${userSearch}" onkeydown="if(event.key==='Enter'){adminApp.userSearchFn(this.value)}" id="user-search-input">
          <button class="btn btn-sm btn-outline" onclick="adminApp.userSearchFn(document.getElementById('user-search-input').value)"><i class="fa-solid fa-search"></i></button>
        </div>
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th></th><th>Tên</th><th>Email</th><th>Level</th><th>Trạng thái</th><th style="width:120px">Thao tác</th>
          </tr></thead>
          <tbody>
            ${data.users.map(u => {
              var approvedCol = '';
              if (u.is_admin) {
                approvedCol = '<span class="badge badge-danger">Admin</span>';
              } else if (u.is_approved) {
                approvedCol = '<span class="badge badge-success">Đã duyệt</span>';
              } else {
                approvedCol = '<span class="badge" style="background:#FBEEDF;color:#8A4513">Chờ duyệt</span>';
              }
              return `
              <tr>
                <td>#${u.id}</td>
                <td><div style="width:32px;height:32px;border-radius:50%;background:${u.avatar_color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px">${u.avatar_letter}</div></td>
                <td style="font-weight:700">${u.name}</td>
                <td>${u.email}</td>
                <td><span class="badge badge-gray">${u.level_label || 'Lv1'}</span></td>
                <td>${approvedCol}</td>
                <td>
                  <div class="table-actions">
                    ${!u.is_approved && !u.is_admin ? '<button class="btn btn-icon btn-outline" onclick="adminApp.approveUser(' + u.id + ', \'' + u.name.replace(/'/g, "\\'") + '\')" title="Duyệt" style="color:#10B981"><i class="fa-solid fa-check"></i></button>' : ''}
                    <button class="btn btn-icon btn-outline" onclick="adminApp.openUserForm(${u.id})" title="Sửa"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-icon btn-outline" onclick="adminApp.deleteUser(${u.id}, '${u.name.replace(/'/g, "\\'")}')" title="Xóa" style="color:var(--admin-danger)"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            `}).join('')}
          </tbody>
        </table>
        <div class="table-pagination">
          <span>Trang ${data.page} · ${data.total} người dùng</span>
          <div style="display:flex;gap:6px">
            <button class="btn btn-sm btn-outline" ${data.page <= 1 ? 'disabled' : ''} onclick="adminApp.userPageFn(${data.page - 1})">← Trước</button>
            <button class="btn btn-sm btn-outline" ${data.page * data.limit >= data.total ? 'disabled' : ''} onclick="adminApp.userPageFn(${data.page + 1})">Sau →</button>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

function userSearchFn(val) { userSearch = val; userPage = 1; syncAdminUrl(true); renderUsers(document.getElementById('admin-content')); }
function userPageFn(p) { userPage = p; syncAdminUrl(true); renderUsers(document.getElementById('admin-content')); }

async function openUserForm(id) {
  let u = {};
  let classesList = [];
  try { 
    const data = await apiGet(`/admin/users/${id}`); 
    u = data.user; 
    
    // Fetch classes for the dropdown
    const cData = await apiGet('/admin/classes');
    if (cData && cData.classes) {
      classesList = cData.classes;
    }
  } catch (e) { toast('Không tìm thấy.', 'error'); return; }

  openModal(`Sửa người dùng #${id}`, `
    <div class="form-row">
      <div class="form-group"><label>Tên</label><input id="f-name" value="${u.name}"></div>
      <div class="form-group"><label>Email</label><input id="f-email" value="${u.email}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>SĐT</label><input id="f-phone" value="${u.phone || ''}"></div>
      <div class="form-group">
        <label>Lớp học</label>
        <select id="f-class-id">
          <option value="">-- Không có lớp --</option>
          ${classesList.map(c => `<option value="${c.id}" ${u.class_id === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Level Label</label><input id="f-level-label" value="${u.level_label || ''}"></div>
      <div class="form-group"><label>Level Num</label><input type="number" id="f-level-num" value="${u.level_num || 1}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Điểm</label><input type="number" id="f-points" value="${u.points || 0}"></div>
      <div class="form-group"><label>Streak</label><input type="number" id="f-streak" value="${u.streak || 0}"></div>
    </div>
    <div class="form-group">
      <label><input type="checkbox" id="f-is-admin" ${u.is_admin ? 'checked' : ''} style="margin-right:6px"> Quyền Admin</label>
    </div>
    <hr style="margin:16px 0;border:none;border-top:1px solid var(--admin-border)">
    <div class="form-group"><label>Đổi mật khẩu (để trống nếu không đổi)</label><input type="password" id="f-new-password" placeholder="Nhập mật khẩu mới..."></div>
  `,
  `<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>
   <button class="btn btn-primary" onclick="adminApp.saveUser(${id})">Cập nhật</button>`
  );
}

async function saveUser(id) {
  const body = {
    name: document.getElementById('f-name').value,
    email: document.getElementById('f-email').value,
    phone: document.getElementById('f-phone').value,
    level_label: document.getElementById('f-level-label').value,
    level_num: parseInt(document.getElementById('f-level-num').value),
    points: parseInt(document.getElementById('f-points').value),
    streak: parseInt(document.getElementById('f-streak').value),
    is_admin: document.getElementById('f-is-admin').checked,
    class_id: document.getElementById('f-class-id').value ? parseInt(document.getElementById('f-class-id').value, 10) : null,
  };
  const newPw = document.getElementById('f-new-password').value;

  try {
    await apiPut(`/admin/users/${id}`, body);
    if (newPw && newPw.length >= 6) {
      await apiPut(`/admin/users/${id}/password`, { password: newPw });
    }
    toast('Cập nhật người dùng thành công!');
    closeModal();
    renderUsers(document.getElementById('admin-content'));
  } catch (err) { toast(err.message, 'error'); }
}

function deleteUser(id, name) {
  confirmDialog('Xóa người dùng', 'Bạn có chắc muốn xóa "' + name + '"? Toàn bộ dữ liệu học tập sẽ bị xóa vĩnh viễn.', async () => {
    try { await apiDel('/admin/users/' + id); toast('Đã xóa người dùng.'); renderUsers(document.getElementById('admin-content')); }
    catch (err) { toast(err.message, 'error'); }
  });
}

async function approveUser(id, name) {
  // Load danh sách lớp để cho chọn
  var classOptions = '<option value="">(Không xếp lớp)</option>';
  try {
    var cData = await apiGet('/admin/classes');
    if (cData.classes && cData.classes.length) {
      for (var i = 0; i < cData.classes.length; i++) {
        var c = cData.classes[i];
        classOptions += '<option value="' + c.id + '">' + c.name + '</option>';
      }
    }
  } catch (e) { /* ignore */ }

  openModal('Duyệt tài khoản: ' + name, 
    '<p style="margin-bottom:12px">Xác nhận duyệt tài khoản <b>' + name + '</b>? Học viên sẽ có thể đăng nhập và sử dụng hệ thống.</p>' +
    '<div class="form-group"><label>Xếp vào lớp (tuỳ chọn)</label><select id="approve-class">' + classOptions + '</select></div>',
    '<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>' +
    ' <button class="btn btn-primary" onclick="adminApp._doApprove(' + id + ')"><i class="fa-solid fa-check"></i> Duyệt</button>'
  );
}

async function _doApprove(id) {
  var classId = document.getElementById('approve-class').value;
  try {
    await apiPut('/admin/users/' + id + '/approve', { class_id: classId || undefined });
    toast('Đã duyệt tài khoản thành công!');
    closeModal();
    renderUsers(document.getElementById('admin-content'));
    refreshPendingBadge();
  } catch (err) { toast(err.message, 'error'); }
}

// ============================================================
// QUẢN LÝ LỚP (classes / roster / sessions / attendance)
// ============================================================
let classesView = 'list'; // 'list' | 'detail' | 'sessions' | 'attendance' | 'student'
let currentClassId = null;
let currentClassName = '';
let currentSessionId = null;
let currentSessionsCache = []; // cache buổi học của lớp đang xem, dùng để tra dữ liệu khi mở form Sửa
let editingSessionId = null;   // != null khi form buổi học đang ở chế độ Sửa (thay vì Thêm mới)

// Quyền chỉnh sửa buổi học đã đăng ký (điểm danh) — hiện tại admin.html chỉ cho phép is_admin=true
// đăng nhập được vào (xem requireAdmin phía server), nên về bản chất ai vào tới đây cũng là admin.
// Hàm này tồn tại như một điểm mở rộng: sau này nếu thêm vai trò "giáo viên" / "phụ huynh" cùng dùng
// chung UI Quản lý lớp (quyền hẹp hơn), chỉ cần sửa điều kiện ở đây — không cần sửa lại từng chỗ gọi.
function canEditClassSessions() {
  return !!adminUser?.is_admin;
}
let currentStudentId = null;

// Nhảy thẳng từ Tổng quan vào màn điểm danh của đúng buổi học đó (bỏ qua 3 lần bấm:
// Quản lý lớp -> chọn lớp -> Buổi học -> Điểm danh).
function jumpToAttendance(classId, className, sessionId) {
  currentClassId = classId;
  currentClassName = className;
  currentSessionId = sessionId;
  classesView = 'attendance';
  navigate('classes', { keepView: true });
}

// Nhảy thẳng từ Tổng quan vào trang chi tiết của đúng học viên đó.
function jumpToStudent(classId, className, userId) {
  currentClassId = classId;
  currentClassName = className;
  currentStudentId = userId;
  classesView = 'student';
  navigate('classes', { keepView: true });
}

function renderClasses(el) {
  if (classesView === 'detail') return renderClassDetail(el);
  if (classesView === 'sessions') return renderClassSessions(el);
  if (classesView === 'attendance') return renderAttendance(el);
  if (classesView === 'student') return renderStudentDetail(el);
  if (classesView === 'assignments') return renderAssignments(el);
  if (classesView === 'mistakes') return renderClassMistakes(el);
  return renderClassesList(el);
}

async function renderClassesList(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const data = await apiGet('/admin/classes');
    el.innerHTML = `
      <div class="data-table-wrapper">
        <div class="table-toolbar">
          <h3 style="font-size:14px;font-weight:700;flex:1">${data.classes.length} lớp học</h3>
          ${laQuanTri() ? '<button class="btn btn-sm btn-primary" onclick="adminApp.openClassForm()"><i class="fa-solid fa-plus"></i> Tạo lớp mới</button>' : ''}
        </div>
        <table class="data-table">
          <thead><tr><th>ID</th><th>Tên lớp</th><th>Giáo viên</th><th>Học viên</th><th>Buổi học</th><th>Trạng thái</th>${laQuanTri() ? '<th style="width:100px">Thao tác</th>' : ''}</tr></thead>
          <tbody>
            ${data.classes.length === 0 ? `<tr><td colspan="7"><div class="empty-state"><p>${laQuanTri()
                ? 'Chưa có lớp học nào. Bấm <strong>Tạo lớp mới</strong> để mở lớp đầu tiên.'
                : 'Bạn chưa được phân công lớp nào. Liên hệ quản trị viên để được gán lớp.'}</p></div></td></tr>` : ''}
            ${data.classes.map(c => `
              <tr style="cursor:pointer" onclick="adminApp.openClassDetail(${c.id}, '${(c.name || '').replace(/'/g, "\\'")}')">
                <td>#${c.id}</td>
                <td style="font-weight:700">${c.name}</td>
                <td>${c.teacher_name || '—'}</td>
                <td><span class="badge badge-primary">${c.student_count} học viên</span></td>
                <td>${c.session_count} buổi</td>
                <td>${c.is_active ? '<span class="badge badge-success">Hoạt động</span>' : '<span class="badge badge-gray">Đã đóng</span>'}</td>
                ${laQuanTri() ? `
                <td onclick="event.stopPropagation()">
                  <div class="table-actions">
                    <button class="btn btn-icon btn-outline" onclick="adminApp.openClassForm(${c.id}, '${_escAttr(c.name)}', '${_escAttr(c.description)}', ${c.is_active ? 1 : 0}, ${c.teacher_id || 'null'})" title="Sửa"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-icon btn-outline" onclick="adminApp.deleteClass(${c.id}, '${_escAttr(c.name)}')" title="Xóa" style="color:var(--admin-danger)"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

async function openClassForm(id, name, description, isActive, teacherId) {
  let classes = [];
  if (!id) {
    try {
      const data = await apiGet('/admin/classes');
      classes = data.classes || [];
    } catch (e) {
      console.error(e);
    }
  }
  // Danh sách giáo viên để chọn người phụ trách. Chỉ admin gọi được route này; giáo viên không
  // vào được form lớp nên không cần xử lý nhánh 403.
  let giaoViens = [];
  try {
    const t = await apiGet('/admin/teachers-options');
    giaoViens = t.teachers || [];
  } catch (e) {
    console.warn('Không tải được danh sách giáo viên:', e.message);
  }

  openModal(id ? `Sửa lớp #${id}` : 'Tạo lớp mới', `
    <div class="form-group"><label>Tên lớp *</label><input id="f-class-name" value="${name || ''}" placeholder="vd: K1, K2..."></div>
    <div class="form-group"><label>Mô tả</label><textarea id="f-class-desc" rows="3">${description || ''}</textarea></div>
    <div class="form-group">
      <label>Giáo viên phụ trách</label>
      <select id="f-class-teacher">
        <option value="">-- Chưa phân công --</option>
        ${giaoViens.map(g => `<option value="${g.id}" ${String(g.id) === String(teacherId || '') ? 'selected' : ''}>${_escHtml(g.name)}${g.role === 'admin' ? ' (admin)' : ''} — ${_escHtml(g.email)}</option>`).join('')}
      </select>
      <div style="font-size:12px;color:var(--admin-text-muted);margin-top:4px">
        Giáo viên được phân công sẽ đăng nhập được vào trang này và CHỈ thấy lớp của mình.
        Chưa có ai trong danh sách thì thêm ở mục <b>Giáo viên</b>.
      </div>
    </div>
    ${!id && classes.length > 0 ? `
      <div class="form-group">
        <label>Copy danh sách bài học từ lớp: (tùy chọn)</label>
        <select id="f-class-copy">
          <option value="">-- Không copy --</option>
          ${classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
        <div style="font-size:12px; color:var(--admin-text-muted); margin-top:4px;">Danh sách buổi học của lớp được chọn sẽ được copy sang lớp mới này (không copy điểm danh).</div>
      </div>
    ` : ''}
    ${id ? `<div class="form-group"><label><input type="checkbox" id="f-class-active" ${isActive ? 'checked' : ''} style="margin-right:6px"> Đang hoạt động</label></div>` : ''}
  `,
  `<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>
   <button class="btn btn-primary" onclick="adminApp.saveClass(${id || 'null'})">${id ? 'Cập nhật' : 'Tạo lớp'}</button>`
  );
}

async function saveClass(id) {
  const name = document.getElementById('f-class-name').value;
  const description = document.getElementById('f-class-desc').value;
  const gvEl = document.getElementById('f-class-teacher');
  // '' = chưa phân công -> gửi null để server xoá giáo viên phụ trách.
  const teacher_id = gvEl ? (gvEl.value ? parseInt(gvEl.value, 10) : null) : undefined;
  if (!name.trim()) { toast('Vui lòng nhập tên lớp.', 'error'); return; }
  try {
    if (id) {
      const isActive = document.getElementById('f-class-active').checked;
      await apiPut(`/admin/classes/${id}`, { name, description, is_active: isActive, teacher_id });
      toast('Cập nhật lớp thành công!');
    } else {
      const copyEl = document.getElementById('f-class-copy');
      const copy_from_class_id = copyEl && copyEl.value ? parseInt(copyEl.value, 10) : null;
      await apiPost('/admin/classes', { name, description, copy_from_class_id, teacher_id });
      toast('Tạo lớp thành công!');
    }
    closeModal();
    renderClassesList(document.getElementById('admin-content'));
  } catch (err) { toast(err.message, 'error'); }
}

function deleteClass(id, name) {
  confirmDialog('Xóa lớp học', `Bạn có chắc muốn xóa lớp "${name}"? Toàn bộ danh sách học viên, buổi học và điểm danh của lớp sẽ bị xóa vĩnh viễn.`, async () => {
    try { await apiDel(`/admin/classes/${id}`); toast('Đã xóa lớp học.'); renderClassesList(document.getElementById('admin-content')); }
    catch (err) { toast(err.message, 'error'); }
  });
}

function openClassDetail(id, name) {
  currentClassId = id;
  currentClassName = name || '';
  currentSessionId = null;
  currentStudentId = null;
  gotoClassesView('detail');
}

function backToClassesList() {
  currentClassId = null;
  currentClassName = '';
  currentSessionId = null;
  currentStudentId = null;
  gotoClassesView('list');
}

async function renderClassDetail(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const data = await apiGet(`/admin/classes/${currentClassId}`);
    const cls = data.class;
    currentClassName = cls.name;
    el.innerHTML = `
      <div style="margin-bottom:16px">
        <button class="btn btn-sm btn-outline" onclick="adminApp.backToClassesList()"><i class="fa-solid fa-arrow-left"></i> Danh sách lớp</button>
      </div>
      <div class="data-table-wrapper" style="margin-bottom:20px">
        <div class="table-toolbar">
          <div style="flex:1">
            <h3 style="font-size:16px;font-weight:800">${cls.name} <span class="badge badge-gray" style="margin-left:6px">Mã mời: ${cls.invite_code}</span></h3>
            <p style="font-size:13px;color:var(--admin-text-muted);margin-top:4px">${cls.description || 'Không có mô tả'} · GV: ${cls.teacher_name || '—'}</p>
          </div>
          <button class="btn btn-sm btn-outline" onclick="adminApp.goToSessions()"><i class="fa-solid fa-calendar-days"></i> Buổi học &amp; điểm danh</button>
          <button class="btn btn-sm btn-outline" onclick="adminApp.goToAssignments()"><i class="fa-solid fa-list-check"></i> Bài tập đã giao</button>
          <button class="btn btn-sm btn-outline" onclick="adminApp.goToMistakes()"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi sai của lớp</button>
          <button class="btn btn-sm btn-outline" onclick="adminApp.openReportForm()"><i class="fa-solid fa-file-arrow-down"></i> Xuất báo cáo</button>
          <button class="btn btn-sm btn-primary" onclick="adminApp.openBulkAddForm()"><i class="fa-solid fa-user-plus"></i> Thêm học viên</button>
        </div>
      </div>
      <div class="data-table-wrapper">
        <div class="table-toolbar"><h3 style="font-size:14px;font-weight:700;flex:1">${data.students.length} học viên</h3></div>
        <table class="data-table">
          <thead><tr><th>Học viên</th><th>Email</th><th>Điểm danh</th><th>Đi muộn</th><th>Về sớm</th><th>Bài tập đã làm</th><th style="width:80px">Thao tác</th></tr></thead>
          <tbody>
            ${data.students.length === 0 ? '<tr><td colspan="7"><div class="empty-state"><p>Chưa có học viên nào. Bấm "Thêm học viên" để thêm.</p></div></td></tr>' : ''}
            ${data.students.map(s => `
              <tr style="cursor:pointer" onclick="adminApp.openStudentDetail(${s.id})">
                <td style="font-weight:700">${s.name}</td>
                <td>${s.email}</td>
                <td>${s.attended_count}/${s.total_sessions} <span style="color:var(--admin-text-muted)">(vắng ${s.absent_count})</span></td>
                <td>${s.late_count > 0 ? `<span class="badge badge-warning">${s.late_count}</span>` : '—'}</td>
                <td>${s.early_leave_count > 0 ? `<span class="badge badge-warning">${s.early_leave_count}</span>` : '—'}</td>
                <td><span class="badge badge-primary">${s.exercises_done} bài</span></td>
                <td onclick="event.stopPropagation()">
                  <button class="btn btn-icon btn-outline" onclick="adminApp.removeStudentFromClass(${s.id}, '${(s.name || '').replace(/'/g, "\\'")}')" title="Xóa khỏi lớp" style="color:var(--admin-danger)"><i class="fa-solid fa-user-minus"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

async function openBulkAddForm() {
  openModal('Thêm học viên vào lớp', '<div style="text-align:center;padding:20px"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải...</div>');
  try {
    const data = await apiGet('/admin/users-unassigned');
    const users = data.users || [];
    
    // Ô dán EMAIL luôn hiện, kể cả khi danh sách tick chọn rỗng — với một trung tâm vừa thuê hệ
    // thống thì danh sách đó CHẮC CHẮN rỗng (chưa có học viên nào), và trước 2026-09-13 màn này
    // chỉ có ô tick nên trung tâm không đưa được ai vào lớp.
    const html = `
      <div style="margin-bottom:16px">
        <label style="display:block;font-weight:700;margin-bottom:6px">
          <i class="fa-solid fa-envelope"></i> Thêm bằng email
        </label>
        <p style="font-size:13px;color:var(--admin-text-secondary);margin:0 0 8px">
          Mỗi email một dòng (hoặc cách nhau bằng dấu phẩy). Email chưa có tài khoản sẽ được
          <strong>tạo mới</strong> và nhận mail kèm mật khẩu mặc định.
        </p>
        <textarea id="bulk-add-emails" rows="4" placeholder="an.nguyen@gmail.com&#10;binh.tran@gmail.com"
          style="width:100%;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:inherit;font-size:14px"></textarea>
      </div>
      ${users.length ? `
        <div>
          <label style="display:block;font-weight:700;margin-bottom:6px">
            <i class="fa-solid fa-user-check"></i> Hoặc chọn học viên đã có tài khoản, chưa xếp lớp
          </label>
          <div style="max-height: 240px; overflow-y: auto; border: 1px solid var(--admin-border); border-radius: 6px; padding: 8px;">
            ${users.map(u => `
              <label style="display:flex; align-items:center; gap:8px; padding: 8px; cursor: pointer; border-bottom: 1px solid var(--admin-border-light);">
                <input type="checkbox" name="bulk-add-user" value="${u.id}">
                <span><strong>${esc(u.name)}</strong> <small style="color:var(--admin-text-muted)">(${esc(u.email)})</small></span>
              </label>
            `).join('')}
          </div>
        </div>` : `
        <p style="font-size:13px;color:var(--admin-text-muted);margin:0">
          Chưa có học viên nào đã đăng ký mà chưa xếp lớp — dùng ô email ở trên để thêm.
        </p>`}
      <div id="bulk-add-result" style="margin-top:12px"></div>
    `;

    openModal('Thêm học viên vào lớp', html, `
      <button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>
      <button class="btn btn-primary" id="bulk-add-submit-btn" onclick="adminApp.submitBulkAdd()"><i class="fa-solid fa-user-plus"></i> Thêm vào lớp</button>
    `);
  } catch (err) {
    openModal('Lỗi', `<p>${err.message}</p>`, '<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>');
  }
}

async function submitBulkAdd() {
  const checkboxes = document.querySelectorAll('input[name="bulk-add-user"]:checked');
  const userIds = Array.from(checkboxes).map(cb => parseInt(cb.value, 10));
  const emails = (document.getElementById('bulk-add-emails')?.value || '')
    .split(/[\s,;]+/).map(e => e.trim()).filter(Boolean);
  if (!userIds.length && !emails.length) {
    toast('Nhập email hoặc chọn ít nhất 1 học viên.', 'error');
    return;
  }

  const btn = document.getElementById('bulk-add-submit-btn');
  btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...';
  try {
    const data = await apiPost(`/admin/classes/${currentClassId}/students`, { userIds, emails });
    const kq = data.results || [];
    const hong = kq.filter(r => r.status === 'error');
    // Danh sách phía sau modal cập nhật ngay, nhưng modal chỉ tự đóng khi MỌI dòng đều ổn —
    // có dòng lỗi mà đóng luôn thì người dùng không kịp đọc email nào không thêm được và vì sao.
    renderClassDetail(document.getElementById('admin-content'));
    if (!hong.length) {
      toast(`Đã thêm ${kq.length} học viên vào lớp.`);
      closeModal();
      return;
    }
    const box = document.getElementById('bulk-add-result');
    if (box) {
      box.innerHTML = `
        <div style="border:1px solid var(--admin-border);border-radius:6px;padding:10px;font-size:13px">
          <strong>${kq.length - hong.length} thành công · ${hong.length} không thêm được:</strong>
          <ul style="margin:8px 0 0;padding-left:18px">
            ${hong.map(r => `<li><code>${esc(r.email || r.userId)}</code> — ${esc(r.message)}</li>`).join('')}
          </ul>
        </div>`;
    }
    toast(`${hong.length} email không thêm được — xem chi tiết trong hộp thoại.`, 'error');
    btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Thêm vào lớp';
  } catch (err) {
    toast(err.message, 'error');
    btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Thêm vào lớp';
  }
}

function removeStudentFromClass(userId, name) {
  confirmDialog('Xóa khỏi lớp', `Bạn có chắc muốn xóa "${name}" khỏi lớp này? Lịch sử điểm danh và bài tập của học viên vẫn được giữ nguyên.`, async () => {
    try {
      await apiDel(`/admin/classes/${currentClassId}/students/${userId}`);
      toast('Đã xóa học viên khỏi lớp.');
      renderClassDetail(document.getElementById('admin-content'));
    } catch (err) { toast(err.message, 'error'); }
  });
}

function goToSessions() {
  gotoClassesView('sessions');
}

function backToClassDetail() {
  currentSessionId = null;
  gotoClassesView('detail');
}

// Bộ lọc danh sách buổi học. Với lớp 33 buổi thì cuộn tay tìm buổi cần điểm danh rất mất công,
// nên mặc định mở ở "Chưa điểm danh xong" — đúng việc giáo viên cần làm.
let sessionFilter = 'pending'; // 'pending' | 'done' | 'all'

function setSessionFilter(f) {
  sessionFilter = f;
  renderClassSessions(document.getElementById('admin-content'));
}

function _isSessionDone(s) {
  return s.roster_count > 0 && s.marked_count >= s.roster_count;
}

async function renderClassSessions(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const data = await apiGet(`/admin/classes/${currentClassId}/sessions`);
    currentSessionsCache = data.sessions;
    const canEdit = canEditClassSessions();

    const all = data.sessions;
    const doneCount = all.filter(_isSessionDone).length;
    const pendingCount = all.length - doneCount;
    // Không còn buổi nào phải điểm danh thì đừng bắt giáo viên nhìn bảng rỗng — tự chuyển sang Tất cả.
    let filter = sessionFilter;
    if (filter === 'pending' && pendingCount === 0) filter = 'all';
    const rows = filter === 'all' ? all
      : filter === 'done' ? all.filter(_isSessionDone)
      : all.filter(s => !_isSessionDone(s));

    // Đánh dấu buổi của hôm nay (hoặc buổi sắp tới gần nhất) để mắt nhìn vào là thấy ngay.
    const todayStr = new Date().toISOString().slice(0, 10);
    const dateOf = (s) => (s.session_date ? String(s.session_date).slice(0, 10) : '');
    let highlightId = all.find(s => dateOf(s) === todayStr)?.id;
    if (!highlightId) {
      const upcoming = all.filter(s => dateOf(s) && dateOf(s) > todayStr).sort((a, b) => dateOf(a).localeCompare(dateOf(b)));
      highlightId = upcoming[0]?.id;
    }

    const chip = (key, label, count) =>
      `<button class="btn btn-sm ${filter === key ? 'btn-primary' : 'btn-outline'}" onclick="adminApp.setSessionFilter('${key}')">${label}${count != null ? ` (${count})` : ''}</button>`;

    el.innerHTML = `
      <div style="margin-bottom:16px">
        <button class="btn btn-sm btn-outline" onclick="adminApp.backToClassDetail()"><i class="fa-solid fa-arrow-left"></i> ${currentClassName || "Chi tiết lớp"}</button>
      </div>
      <div class="data-table-wrapper">
        <div class="table-toolbar" style="flex-wrap:wrap;gap:10px">
          <h3 style="font-size:14px;font-weight:700;flex:1;min-width:160px">${all.length} buổi học</h3>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${chip('pending', 'Chưa điểm danh', pendingCount)}
            ${chip('done', 'Đã xong', doneCount)}
            ${chip('all', 'Tất cả', all.length)}
            <button class="btn btn-sm btn-outline" onclick="adminApp.openSessionForm()"><i class="fa-solid fa-plus"></i> Thêm buổi</button>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>Ngày</th><th>Chủ đề</th><th>Khóa học</th><th>Ghi chú</th><th>Điểm danh</th><th style="width:200px">Thao tác</th></tr></thead>
          <tbody>
            ${rows.length === 0 ? `<tr><td colspan="6"><div class="empty-state"><p>${all.length === 0 ? 'Chưa có buổi học nào.' : 'Không có buổi nào trong mục này.'}</p></div></td></tr>` : ''}
            ${rows.map(s => {
              const done = _isSessionDone(s);
              const isToday = dateOf(s) === todayStr;
              return `
              <tr ${s.id === highlightId ? 'class="session-row--next"' : ''}>
                <td style="font-weight:700;white-space:nowrap">
                  ${s.session_date ? new Date(s.session_date).toLocaleDateString('vi-VN') : '<span style="color:#999;font-style:italic">Chưa có ngày</span>'}
                  ${isToday ? '<div><span class="badge badge-primary" style="margin-top:4px">Hôm nay</span></div>' : ''}
                </td>
                <td>${s.topic || '—'}</td>
                <td>${s.course_type ? `<span class="badge badge-outline">${s.course_type}</span>` : '—'}</td>
                <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.notes || '—'}</td>
                <td><span class="badge ${done ? 'badge-success' : 'badge-gray'}">${s.marked_count}/${s.roster_count}</span></td>
                <td>
                  <div class="table-actions">
                    <button class="btn btn-sm ${done ? 'btn-outline' : 'btn-primary'}" onclick="adminApp.openAttendance(${s.id})"><i class="fa-solid fa-clipboard-check"></i> ${done ? 'Sửa' : 'Điểm danh'}</button>
                    ${canEdit ? `<button class="btn btn-icon btn-outline" onclick="adminApp.openSessionForm(${s.id})" title="Sửa buổi học"><i class="fa-solid fa-pen"></i></button>` : ''}
                    <button class="btn btn-icon btn-outline" onclick="adminApp.deleteSession(${s.id})" title="Xóa" style="color:var(--admin-danger)"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

// sessionId truyền vào => mở form ở chế độ SỬA buổi học đã đăng ký trước đó (điền sẵn dữ liệu cũ).
// Không truyền => mở form Thêm mới. Sửa buổi học đã có điểm danh vẫn được phép (chỉ đổi ngày/chủ đề/
// ghi chú của buổi, không đụng tới các bản ghi điểm danh đã lưu) — theo yêu cầu 2026-08-25, chỉ giới hạn
// bằng canEditClassSessions() (hiện = quyền admin, xem comment ở khai báo hàm).
async function openSessionForm(sessionId) {
  if (sessionId && !canEditClassSessions()) { toast('Bạn không có quyền sửa buổi học.', 'error'); return; }
  editingSessionId = sessionId || null;
  const existing = sessionId ? currentSessionsCache.find(s => s.id === sessionId) : null;
  const dateVal = existing?.session_date ? new Date(existing.session_date).toISOString().split('T')[0] : '';
  const courseType = existing?.course_type || '';

  let classes = [];
  if (!existing) {
    try {
      const data = await apiGet('/admin/classes');
      classes = data.classes || [];
    } catch (e) {
      console.error(e);
    }
  }

  openModal(existing ? 'Sửa buổi học' : 'Thêm buổi học mới', `
    <div class="form-group"><label>Ngày học (tùy chọn)</label><input type="date" id="f-session-date" value="${dateVal}"></div>
    <div class="form-group">
      <label>Khóa học</label>
      <select id="f-session-course">
        <option value="" ${!courseType ? 'selected' : ''}>-- Chọn khóa học --</option>
        <option value="Phát Âm" ${courseType === 'Phát Âm' ? 'selected' : ''}>Phát Âm</option>
        <option value="Đương Đại 1" ${courseType === 'Đương Đại 1' ? 'selected' : ''}>Đương Đại 1</option>
        <option value="Thời Đại 1" ${courseType === 'Thời Đại 1' ? 'selected' : ''}>Thời Đại 1</option>
      </select>
    </div>
    <div class="form-group"><label>Chủ đề</label><input id="f-session-topic" placeholder="vd: Bài 5.1 - Vận mẫu" value="${(existing?.topic || '').replace(/"/g, '&quot;')}"></div>
    <div class="form-group"><label>Ghi chú</label><textarea id="f-session-notes" rows="2">${existing?.notes || ''}</textarea></div>
    
    ${!existing && classes.length > 0 ? `
      <div class="form-group" style="margin-top: 16px;">
        <label>Áp dụng tạo cho các lớp:</label>
        <div class="class-checkbox-grid">
          ${classes.map(c => `
            <label class="class-checkbox-item">
              <input type="checkbox" name="f-session-classes" value="${c.id}" ${c.id === currentClassId ? 'checked' : ''}>
              <span>${c.name}</span>
            </label>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `,
  `<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>
   <button class="btn btn-primary" onclick="adminApp.saveSession()">${existing ? 'Lưu thay đổi' : 'Tạo buổi học'}</button>`
  );
}

async function saveSession() {
  const session_date = document.getElementById('f-session-date').value;
  const course_type = document.getElementById('f-session-course').value;
  const topic = document.getElementById('f-session-topic').value;
  const notes = document.getElementById('f-session-notes').value;
  
  let classIds = [currentClassId];
  if (!editingSessionId) {
    const checkboxes = document.querySelectorAll('input[name="f-session-classes"]:checked');
    if (checkboxes.length > 0) {
      classIds = Array.from(checkboxes).map(cb => parseInt(cb.value, 10));
    }
  }

  try {
    if (editingSessionId) {
      await apiPut(`/admin/sessions/${editingSessionId}`, { session_date, topic, course_type, notes });
      toast('Đã lưu thay đổi buổi học!');
    } else {
      await apiPost(`/admin/classes/${currentClassId}/sessions`, { session_date, topic, course_type, notes, classIds });
      toast('Tạo buổi học thành công!');
    }
    editingSessionId = null;
    closeModal();
    renderClassSessions(document.getElementById('admin-content'));
  } catch (err) { toast(err.message, 'error'); }
}

function deleteSession(id) {
  confirmDialog('Xóa buổi học', 'Bạn có chắc muốn xóa buổi học này? Toàn bộ điểm danh của buổi sẽ bị xóa.', async () => {
    try { await apiDel(`/admin/sessions/${id}`); toast('Đã xóa buổi học.'); renderClassSessions(document.getElementById('admin-content')); }
    catch (err) { toast(err.message, 'error'); }
  });
}

function openAttendance(sessionId) {
  currentSessionId = sessionId;
  gotoClassesView('attendance');
}

// ============================================================
// ĐIỂM DANH NHANH (2026-08-27)
// ============================================================
// Trước đây mỗi học viên phải: mở dropdown -> chọn Có mặt/Vắng (2 thao tác), nhân với 6-10 em,
// nhân với 2 buổi/tuần. Thực tế đại đa số buổi thì gần như cả lớp có mặt, chỉ 1-2 em vắng.
// Nay: mặc định cả lớp "Có mặt", giáo viên chỉ bấm đổi đúng những em vắng rồi Lưu.
// Nút Có mặt/Vắng là 1 lần bấm (không còn dropdown), kèm các nút hàng loạt ở thanh trên.

let _attRoster = []; // dữ liệu điểm danh của buổi đang mở, dùng để vẽ lại nhanh không cần gọi API

function _attRowHtml(a) {
  const status = a.status === 'absent' ? 'absent' : 'present'; // chưa điểm danh -> coi như có mặt
  const isAbsent = status === 'absent';
  return `
    <tr data-user-id="${a.user_id}" data-status="${status}" class="att-row ${isAbsent ? 'att-row--absent' : ''}">
      <td style="font-weight:700">${a.name}<div style="font-weight:400;font-size:11px;color:var(--admin-text-muted)">${a.email}</div></td>
      <td>
        <div class="att-toggle">
          <button type="button" class="att-btn att-btn--present ${!isAbsent ? 'is-on' : ''}"
            onclick="adminApp.attSetStatus(${a.user_id}, 'present')">Có mặt</button>
          <button type="button" class="att-btn att-btn--absent ${isAbsent ? 'is-on' : ''}"
            onclick="adminApp.attSetStatus(${a.user_id}, 'absent')">Vắng</button>
        </div>
      </td>
      <td style="text-align:center"><input type="checkbox" class="att-late" ${a.is_late ? 'checked' : ''}></td>
      <td style="text-align:center"><input type="checkbox" class="att-early" ${a.is_left_early ? 'checked' : ''}></td>
      <td><input type="text" class="att-note" value="${(a.teacher_note || '').replace(/"/g, '&quot;')}" placeholder="Nhận xét buổi này..." style="width:100%;padding:6px 8px;border:1.5px solid var(--admin-border);border-radius:6px;font-size:12px"></td>
    </tr>`;
}

/** Cập nhật dòng tổng kết "x có mặt · y vắng" ở đầu bảng. */
function attRefreshSummary() {
  // Phải lọc [data-user-id]: lớp chưa có học viên thì tbody vẫn có 1 dòng "empty state", đếm cả
  // dòng đó là hiện "1 có mặt" cho lớp rỗng (2026-08-27).
  const rows = document.querySelectorAll('#attendance-table tbody tr[data-user-id]');
  let present = 0, absent = 0;
  rows.forEach(r => (r.dataset.status === 'absent' ? absent++ : present++));
  const el = document.getElementById('att-summary');
  if (el) {
    el.innerHTML = `<span class="badge badge-success">${present} có mặt</span>` +
      (absent ? ` <span class="badge badge-danger">${absent} vắng</span>` : '');
  }
}

/** Đổi trạng thái 1 học viên — chỉ sửa DOM tại chỗ, không vẽ lại cả bảng (không mất nội dung đang gõ). */
function attSetStatus(userId, status) {
  const row = document.querySelector(`#attendance-table tbody tr[data-user-id="${userId}"]`);
  if (!row) return;
  row.dataset.status = status;
  row.classList.toggle('att-row--absent', status === 'absent');
  row.querySelector('.att-btn--present').classList.toggle('is-on', status !== 'absent');
  row.querySelector('.att-btn--absent').classList.toggle('is-on', status === 'absent');
  // Vắng cả buổi thì đi muộn / về sớm không còn ý nghĩa -> tự bỏ tick cho khỏi lưu dữ liệu vô lý.
  if (status === 'absent') {
    row.querySelector('.att-late').checked = false;
    row.querySelector('.att-early').checked = false;
  }
  attRefreshSummary();
}

/** Đặt trạng thái cho TOÀN BỘ lớp trong 1 lần bấm. */
function attSetAll(status) {
  document.querySelectorAll('#attendance-table tbody tr').forEach(r => {
    attSetStatus(parseInt(r.dataset.userId, 10), status);
  });
}

/** Bỏ mọi tick đi muộn / về sớm (hay dùng khi bấm nhầm). */
function attClearFlags() {
  document.querySelectorAll('#attendance-table tbody tr').forEach(r => {
    r.querySelector('.att-late').checked = false;
    r.querySelector('.att-early').checked = false;
  });
  toast('Đã bỏ hết đánh dấu đi muộn / về sớm.');
}

async function renderAttendance(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const data = await apiGet(`/admin/sessions/${currentSessionId}/attendance`);
    const s = data.session;
    _attRoster = data.attendance || [];
    const markedCount = _attRoster.filter(a => a.status).length;

    el.innerHTML = `
      <div style="margin-bottom:16px">
        <button class="btn btn-sm btn-outline" onclick="adminApp.goToSessions()"><i class="fa-solid fa-arrow-left"></i> Danh sách buổi học</button>
      </div>
      <div class="data-table-wrapper">
        <div class="table-toolbar" style="flex-wrap:wrap;gap:10px">
          <h3 style="font-size:15px;font-weight:800;flex:1;min-width:200px">
            Điểm danh ${s.session_date ? '— ' + new Date(s.session_date).toLocaleDateString('vi-VN') : ''} ${s.topic ? `· ${s.topic}` : ''}
            <div id="att-summary" style="margin-top:6px;font-weight:400"></div>
          </h3>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <button class="btn btn-sm btn-outline" onclick="adminApp.attSetAll('present')"><i class="fa-solid fa-check-double"></i> Tất cả có mặt</button>
            <button class="btn btn-sm btn-outline" onclick="adminApp.attSetAll('absent')">Tất cả vắng</button>
            <button class="btn btn-sm btn-outline" onclick="adminApp.attClearFlags()" title="Bỏ hết tick đi muộn / về sớm"><i class="fa-solid fa-eraser"></i></button>
            <button class="btn btn-sm btn-primary" onclick="adminApp.saveAttendance(this)"><i class="fa-solid fa-floppy-disk"></i> Lưu điểm danh</button>
          </div>
        </div>
        ${markedCount === 0 ? `<div class="att-hint"><i class="fa-solid fa-circle-info"></i>
          Buổi này chưa điểm danh. Mặc định cả lớp <b>Có mặt</b> — chỉ cần bấm <b>Vắng</b> ở những em nghỉ rồi <b>Lưu</b>.</div>` : ''}
        <table class="data-table" id="attendance-table">
          <thead><tr><th>Học viên</th><th style="width:160px">Trạng thái</th><th style="width:80px">Đi muộn</th><th style="width:80px">Về sớm</th><th>Nhận xét</th></tr></thead>
          <tbody>
            ${_attRoster.length === 0 ? '<tr><td colspan="5"><div class="empty-state" style="padding:24px"><p>Lớp chưa có học viên nào.</p></div></td></tr>' : ''}
            ${_attRoster.map(_attRowHtml).join('')}
          </tbody>
        </table>
      </div>
    `;
    attRefreshSummary();
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

async function saveAttendance(btn) {
  const rows = document.querySelectorAll('#attendance-table tbody tr[data-user-id]');
  if (rows.length === 0) { toast('Lớp chưa có học viên để điểm danh.', 'error'); return; }
  const records = Array.from(rows).map(row => ({
    user_id: parseInt(row.dataset.userId, 10),
    status: row.dataset.status === 'absent' ? 'absent' : 'present',
    is_late: row.querySelector('.att-late').checked,
    is_left_early: row.querySelector('.att-early').checked,
    teacher_note: row.querySelector('.att-note').value,
  }));
  const restore = '<i class="fa-solid fa-floppy-disk"></i> Lưu điểm danh';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...'; }
  try {
    await apiPut(`/admin/sessions/${currentSessionId}/attendance`, { records });
    const absent = records.filter(r => r.status === 'absent').length;
    toast(`Đã lưu điểm danh: ${records.length - absent} có mặt${absent ? `, ${absent} vắng` : ''}.`);
  } catch (err) {
    toast(err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = restore; }
  }
}

function openStudentDetail(userId) {
  currentStudentId = userId;
  gotoClassesView('student');
}

function backToClassDetailFromStudent() {
  currentStudentId = null;
  gotoClassesView('detail');
}

// ============================================================
// GIAO BÀI TẬP CÓ HẠN NỘP (2026-08-27)
// ============================================================
// Trước đây hệ thống chỉ ghi lại bài học sinh TỰ làm; giáo viên không giao bài được, nên mục
// "học viên cần chú ý → chưa làm bài" chỉ là suy đoán. Nay giáo viên giao bài kèm hạn nộp,
// và mọi nơi đều đối chiếu được "ai chưa nộp bài cô giao".

// Danh mục bài có thể giao. lesson_id phải khớp đúng giá trị mà frontend học viên ghi vào
// exercise_results.lesson_id (xem src/main.js: pron:<kind> và ddState.selectedSub).
const ASSIGNABLE_PRON = [
  { id: 'pron:initials', label: 'Luyện phát âm — Thanh mẫu' },
  { id: 'pron:finals', label: 'Luyện phát âm — Vận mẫu' },
  { id: 'pron:tones', label: 'Luyện phát âm — Thanh điệu' },
];
// Danh mục bài con để giao bài: "td2-5.1" — quyển 1 có 3 PHẦN (對話一 · 對話二 · 短文),
// quyển 2-5 có 2 phần. Id phải khớp đúng ddState.selectedSub phía học viên, nếu không giao
// bài xong không ai nộp được.
const TD_SO_PHAN = (bookId) => (Number(bookId) === 1 ? 3 : 2);
function _ddBaiCon() {
  const out = [];
  for (const b of thoidaiBooks) {
    for (let i = 1; i <= b.lessons.length; i++) {
      for (let p = 1; p <= TD_SO_PHAN(b.id); p++) {
        out.push({ tb: 'thoidai', book: b.id, key: tdLessonKey(b.id, i), id: `${tdLessonKey(b.id, i)}.${p}`, label: `Bài ${i}.${p} · ${b.lessons[i - 1]}` });
      }
    }
  }
  return out;
}
function _assignableTextbook(bookId) {
  const out = _ddBaiCon().filter(x => !bookId || x.book === bookId);
  // Luyện tập tổng hợp — lesson_id phải khớp đúng giá trị main.js ghi vào exercise_results
  // khi học viên nộp (xem ddOnllangNopTatCa): 'onllang:td1-1'. Namespace giữ nguyên tên
  // 'onllang:' dù nguồn đề đã khác, để không mất liên kết với bản ghi cũ trong DB.
  for (const b of thoidaiBooks) {
    if (bookId && b.id !== bookId) continue;
    for (let i = 1; i <= b.lessons.length; i++) {
      out.push({ book: b.id, id: `onllang:${tdLessonKey(b.id, i)}`, label: `Luyện tập tổng hợp — Bài ${i}` });
    }
  }
  return out;
}
// Tab Game — lesson_id 'game:wordpop:5.2' / 'game:bee:5.2', khớp đúng giá trị main.js ghi
// vào exercise_results khi học viên chơi xong (xem _ddGameLuuKetQua).
const GAME_TEN_ADMIN = { wordpop: 'Bong bóng từ vựng', bee: 'Cứu chú ong' };
function _assignableGame(bookId, tb) {
  const out = [];
  for (const g of ['wordpop', 'bee']) {
    for (const x of _ddBaiCon(tb)) {
      if (bookId && x.book !== bookId) continue;
      out.push({ book: x.book, id: `game:${g}:${x.id}`, label: `Game ${GAME_TEN_ADMIN[g]} — ${tbLabel(x.id)}` });
    }
  }
  return out;
}
function gameLessonLabel(lessonId) {
  const m = /^game:([a-z]+):(.+)$/.exec(String(lessonId || ''));
  if (!m) return null;
  return `Game ${GAME_TEN_ADMIN[m[1]] || m[1]} — ${tbLabel(m[2])}`;
}
/** Nhãn cấp cho kết quả trang "Tổng hợp từ vựng từng Band" (lesson_id dạng 'tocfl:L3'). */
const TOCFL_CAP_TEN = {
  L0: 'Chuẩn bị (準備級)', L1: 'Nhập môn (Level 1)', L2: 'Cơ sở (Level 2)',
  L3: 'Nâng cao (Level 3)', L4: 'Cao cấp (Level 4)', L5: 'Lưu loát (Level 5)',
};

function assignmentLabel(lessonId, title, exerciseType) {
  if (title) return title;
  const mTv = /^tocfl:(L[0-5])$/.exec(String(lessonId || ''));
  if (mTv) return `Từ vựng TOCFL — ${TOCFL_CAP_TEN[mTv[1]]}`;
  const g = gameLessonLabel(lessonId);
  if (g) return g;
  const p = ASSIGNABLE_PRON.find(x => x.id === lessonId);
  if (p) return p.label;
  if (String(lessonId).startsWith('onllang:')) return `Luyện tập tổng hợp — ${tbLabel(String(lessonId).slice(8))}`;
  if (String(lessonId).startsWith('writing:')) return `Luyện viết — ${tbLabel(String(lessonId).slice(8))}`;
  if (exerciseType === 'translate' || String(lessonId).startsWith('translate:')) {
    return `Dịch Trung-Việt — ${tbLabel(String(lessonId).replace('translate:', ''))}`;
  }
  return `Giáo trình — ${tbLabel(lessonId)}`;
}
function _dueText(due) {
  if (!due) return '<span style="color:var(--admin-text-muted)">Không hạn</span>';
  const d = new Date(due);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);
  const txt = d.toLocaleDateString('vi-VN');
  if (diff < 0) return `<span class="badge badge-danger">Quá hạn ${txt}</span>`;
  if (diff === 0) return `<span class="badge badge-warning">Hạn hôm nay</span>`;
  if (diff <= 2) return `<span class="badge badge-warning">${txt} (còn ${diff} ngày)</span>`;
  return txt;
}

function goToAssignments() { gotoClassesView('assignments'); }

async function renderAssignments(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const data = await apiGet(`/admin/classes/${currentClassId}/assignments`);
    const list = data.assignments || [];
    el.innerHTML = `
      <div style="margin-bottom:16px">
        <button class="btn btn-sm btn-outline" onclick="adminApp.backToClassDetail()"><i class="fa-solid fa-arrow-left"></i> ${currentClassName || 'Chi tiết lớp'}</button>
      </div>
      <div class="data-table-wrapper">
        <div class="table-toolbar">
          <h3 style="font-size:14px;font-weight:700;flex:1">${list.length} bài đã giao</h3>
          <button class="btn btn-sm btn-primary" onclick="adminApp.openAssignmentForm()"><i class="fa-solid fa-plus"></i> Giao bài mới</button>
        </div>
        <table class="data-table">
          <thead><tr><th>Bài</th><th style="width:190px">Hạn nộp</th><th style="width:150px">Tiến độ nộp</th><th>Ghi chú</th><th style="width:190px">Thao tác</th></tr></thead>
          <tbody>
            ${list.length === 0 ? '<tr><td colspan="5"><div class="empty-state" style="padding:26px"><p>Chưa giao bài nào cho lớp này.</p><p style="font-size:12px">Giao bài để theo dõi được ai đã làm, ai chưa.</p></div></td></tr>' : ''}
            ${list.map(a => {
              const missing = (a.total_students || 0) - (a.submitted_count || 0);
              const done = a.total_students > 0 && missing <= 0;
              const isTranslate = a.exercise_type === 'translate' || String(a.lesson_id).startsWith('translate:');
              const typeBadge = isTranslate ? '<span class="badge badge-purple" style="margin-left:6px;font-size:10px">Bài dịch</span>' : '';
              const actionLabel = isTranslate ? '<i class="fa-solid fa-language"></i> Xem & Chấm bài' : '<i class="fa-solid fa-list-ul"></i> Ai chưa nộp';
              return `
              <tr>
                <td style="font-weight:700">${assignmentLabel(a.lesson_id, a.title, a.exercise_type)}${typeBadge}</td>
                <td>${_dueText(a.due_date)}</td>
                <td>
                  <span class="badge ${done ? 'badge-success' : missing > 0 ? 'badge-warning' : 'badge-gray'}">${a.submitted_count}/${a.total_students} đã nộp</span>
                </td>
                <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.note || '—'}</td>
                <td>
                  <div class="table-actions">
                    <button class="btn btn-sm btn-outline" onclick="adminApp.viewAssignmentSubmissions(${a.id})">${actionLabel}</button>
                    <button class="btn btn-icon btn-outline" onclick="adminApp.openAssignmentForm(${a.id})" title="Sửa hạn nộp"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-icon btn-outline" onclick="adminApp.deleteAssignment(${a.id})" title="Bỏ giao" style="color:var(--admin-danger)"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
    _assignmentsCache = list;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

let _assignmentsCache = [];
let _editingAssignmentId = null;

function openAssignmentForm(id) {
  _editingAssignmentId = id || null;
  const cur = id ? _assignmentsCache.find(a => a.id === id) : null;
  const curLessonId = cur?.lesson_id ? String(cur.lesson_id).replace('translate:', '') : '';
  const curType = cur?.exercise_type || (String(cur?.lesson_id || '').startsWith('translate:') ? 'translate' : 'bai-tap');
  // Build grouped <select> — option value = "lesson_id|exercise_type"
  // Gom theo QUYỂN (4 quyển × 30/24 bài con — dồn chung 1 optgroup là danh sách dài không tìm nổi).
  const opt = (o, type) => `<option value="${o.id}|${type}" ${curType === type && curLessonId === o.id ? 'selected' : ''}>${o.label}</option>`;
  const theoQuyen = (fn, type, icon, ten, sach, tb) => sach.map(b =>
    `<optgroup label="${icon} ${ten} — ${b.label} (${b.level})">${fn(b.id, tb).map(o => opt(o, type)).join('')}</optgroup>`).join('');
  const tdOpts = theoQuyen(_assignableTextbook, 'bai-tap', '📘', 'Giáo trình Thời Đại', thoidaiBooks, 'thoidai');
  const pronOpts = ASSIGNABLE_PRON.map(o => `<option value="${o.id}|bai-tap" ${curType === 'bai-tap' && (cur?.lesson_id === o.id) ? 'selected' : ''}>${o.label}</option>`).join('');
  const gameOpts = theoQuyen(_assignableGame, 'bai-tap', '🎮', 'Game từ vựng', thoidaiBooks, 'thoidai');
  const selectHtml = cur
    ? `<select id="f-asg-lesson" disabled><option value="${curLessonId}|${curType}">${assignmentLabel(cur.lesson_id, '', curType)}</option></select>
       <p style="font-size:12px;color:var(--admin-text-muted);margin-top:4px">Không đổi được bài — muốn giao bài khác thì bỏ giao bài này rồi giao bài mới.</p>`
    : `<select id="f-asg-lesson">
         ${tdOpts}
         <optgroup label="🎤 Luyện phát âm">${pronOpts}</optgroup>
         ${gameOpts}
       </select>`;
  const dueVal = cur && cur.due_date ? String(cur.due_date).slice(0, 10) : '';
  openModal(cur ? 'Sửa bài đã giao' : 'Giao bài cho lớp', `
    <div class="form-group">
      <label>Bài cần giao *</label>
      ${selectHtml}
    </div>
    <div class="form-group"><label>Hạn nộp</label><input type="date" id="f-asg-due" value="${dueVal}"></div>
    <div class="form-group"><label>Ghi chú cho học viên</label><textarea id="f-asg-note" rows="2" placeholder="vd: Làm ít nhất 2 lần, chú ý vần ün">${cur?.note || ''}</textarea></div>
  `,
  `<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>
   <button class="btn btn-primary" onclick="adminApp.saveAssignment(this)">${cur ? 'Lưu thay đổi' : 'Giao bài'}</button>`);
}

async function saveAssignment(btn) {
  const rawVal = document.getElementById('f-asg-lesson').value || '';
  // Value format: "lesson_id|exercise_type" (e.g., "1.1|translate") or just "lesson_id" for pron
  const [lesson_id, exercise_type] = rawVal.includes('|') ? rawVal.split('|') : [rawVal, 'bai-tap'];
  const due_date = document.getElementById('f-asg-due').value || null;
  const note = document.getElementById('f-asg-note').value;
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...'; }
  try {
    if (_editingAssignmentId) {
      await apiPut(`/admin/assignments/${_editingAssignmentId}`, { title: '', due_date, note });
      toast('Đã cập nhật bài giao.');
    } else {
      await apiPost(`/admin/classes/${currentClassId}/assignments`, { lesson_id, exercise_type, title: '', due_date, note });
      toast('Đã giao bài cho lớp.');
    }
    _editingAssignmentId = null;
    closeModal();
    renderAssignments(document.getElementById('admin-content'));
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = 'Lưu'; }
  }
}

function deleteAssignment(id) {
  confirmDialog('Bỏ giao bài', 'Bỏ bài này khỏi danh sách giao? Kết quả học viên đã làm vẫn được giữ nguyên.', async () => {
    try {
      await apiDel(`/admin/assignments/${id}`);
      toast('Đã bỏ giao bài.');
      renderAssignments(document.getElementById('admin-content'));
    } catch (err) { toast(err.message, 'error'); }
  });
}

// Bấm vào "Ai chưa nộp / Xem bài dịch" -> tuỳ loại bài
async function viewAssignmentSubmissions(id) {
  const asg = _assignmentsCache.find(a => a.id === id);
  // Bài dịch -> mở view chuyên biệt
  if (asg && (asg.exercise_type === 'translate' || String(asg.lesson_id).startsWith('translate:'))) {
    return viewTranslateSubmissions(id, asg);
  }
  // Bài tập thông thường -> danh sách đã nộp/chưa nộp
  openModal('Tình trạng nộp bài', '<div style="text-align:center;padding:24px"><i class="fa-solid fa-spinner fa-spin"></i></div>', '');
  try {
    const data = await apiGet(`/admin/assignments/${id}/submissions`);
    const a = data.assignment;
    const rows = data.students || [];
    const missing = rows.filter(r => !r.exercise_result_id);
    const doneRows = rows.filter(r => r.exercise_result_id);
    const listHtml = (arr, isDone) => arr.map(r => `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid var(--admin-border);border-radius:8px;background:${isDone ? '#F0FDF4' : '#FEF2F2'}">
        <div style="flex:1">
          <div style="font-weight:700;font-size:13px">${r.name}</div>
          <div style="font-size:11px;color:var(--admin-text-muted)">${r.email}</div>
        </div>
        ${isDone
          ? `${scoreBadge(Math.round(r.score_percent))} <span style="font-size:11px;color:var(--admin-text-muted)">${new Date(r.submitted_at).toLocaleDateString('vi-VN')}</span>`
          : '<span class="badge badge-danger">Chưa nộp</span>'}
      </div>`).join('');
    openModal(`${assignmentLabel(a.lesson_id, a.title)} — ${doneRows.length}/${rows.length} đã nộp`, `
      <div style="max-height:60vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px">
        <div>
          <h4 style="font-size:13px;font-weight:800;margin-bottom:8px;color:var(--admin-danger)">Chưa nộp (${missing.length})</h4>
          <div style="display:flex;flex-direction:column;gap:6px">${missing.length ? listHtml(missing, false) : '<p style="font-size:13px;color:var(--admin-text-muted)">Cả lớp đã nộp đủ. 🎉</p>'}</div>
        </div>
        <div>
          <h4 style="font-size:13px;font-weight:800;margin-bottom:8px;color:#17794A">Đã nộp (${doneRows.length})</h4>
          <div style="display:flex;flex-direction:column;gap:6px">${doneRows.length ? listHtml(doneRows, true) : '<p style="font-size:13px;color:var(--admin-text-muted)">Chưa có ai nộp.</p>'}</div>
        </div>
      </div>`,
      `${missing.length ? `<button class="btn btn-outline" onclick="adminApp.remindAssignment(${a.id}, this)"><i class="fa-solid fa-envelope"></i> Nhắc ${missing.length} em chưa nộp</button>` : ''}
       <button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`);
  } catch (err) {
    openModal('Lỗi', `<p>${err.message}</p>`, '<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>');
  }
}

// ──────────────────────────────────────────────────
// BẢNG CHẤM BÀI DỊCH TRUNG-VIỆT
// ──────────────────────────────────────────────────
async function viewTranslateSubmissions(assignmentId, asg) {
  // Support both old translate: prefix and new exercise_type column
  const lessonId = String(asg.lesson_id).replace('translate:', '');
  const label = assignmentLabel(asg.lesson_id, '', asg.exercise_type);
  openModal(
    `Bài dịch — ${label}`,
    '<div style="text-align:center;padding:24px"><i class="fa-solid fa-spinner fa-spin"></i></div>',
    ''
  );
  try {
    const data = await apiGet(`/admin/translate-submissions?lesson_id=${lessonId}&class_id=${currentClassId}`);
    const subs = data.submissions || [];
    const enrolled = data.enrolled || 0;
    const pending = subs.filter(s => s.teacher_score === null || s.teacher_score === undefined);
    const reviewed = subs.filter(s => s.teacher_score !== null && s.teacher_score !== undefined);
    const notSubmitted = Math.max(0, enrolled - subs.length);
    const nl2br = s => (s || '').replace(/</g,'&lt;').replace(/\n/g,'<br>');

    const mkSubCard = (s) => {
      let answers = [];
      try { answers = JSON.parse(s.answers_json || '[]'); } catch(e) {}
      const previewHtml = answers.slice(0, 3).map((ans, i) => `
        <div style="font-size:12px;padding:4px 0;border-bottom:1px solid var(--admin-border)">
          <div style="color:var(--admin-text-muted);margin-bottom:2px">${nl2br(ans.q || '')}</div>
          <div style="color:var(--admin-text)">${nl2br(ans.studentAnswer || '<em>Chưa trả lời</em>')}</div>
        </div>`).join('');
      const scoreHtml = s.teacher_score != null
        ? `<span class="badge badge-success">${s.teacher_score}/100</span>`
        : `<span class="badge badge-warning">Chưa chấm</span>`;
      return `
        <div style="border:1px solid var(--admin-border);border-radius:10px;padding:12px 14px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div>
              <div style="font-weight:700;font-size:13px">${s.student_name}</div>
              <div style="font-size:11px;color:var(--admin-text-muted)">${s.student_email} · Nộp ${new Date(s.submitted_at).toLocaleDateString('vi-VN')}</div>
            </div>
            ${scoreHtml}
          </div>
          <div style="max-height:100px;overflow:hidden;margin-bottom:8px">${previewHtml}</div>
          <button class="btn btn-sm btn-outline" onclick="adminApp.openTranslateReview(${s.id})">
            <i class="fa-solid fa-pen-to-square"></i> ${s.teacher_score != null ? 'Sửa nhận xét' : 'Chấm bài'}
          </button>
        </div>`;
    };

    openModal(
      `Bài dịch — ${label} <span style="font-weight:400;font-size:13px;margin-left:8px">${subs.length}/${enrolled} đã nộp</span>`,
      `<div style="max-height:65vh;overflow-y:auto">
        ${notSubmitted > 0 ? `<div style="padding:8px 0;color:var(--admin-danger);font-size:13px"><i class="fa-solid fa-triangle-exclamation"></i> ${notSubmitted} học viên chưa nộp bài dịch</div>` : '<div style="padding:8px 0;color:#17794A;font-size:13px"><i class="fa-solid fa-check-circle"></i> Cả lớp đã nộp đủ!</div>'}
        ${pending.length > 0 ? `<h4 style="font-size:12px;font-weight:700;margin:12px 0 8px;text-transform:uppercase;color:var(--admin-danger)">Chưa chấm (${pending.length})</h4>${pending.map(mkSubCard).join('')}` : ''}
        ${reviewed.length > 0 ? `<h4 style="font-size:12px;font-weight:700;margin:12px 0 8px;text-transform:uppercase;color:#17794A">Đã chấm (${reviewed.length})</h4>${reviewed.map(mkSubCard).join('')}` : ''}
        ${subs.length === 0 ? '<p style="text-align:center;color:var(--admin-text-muted);padding:24px">Chưa có học viên nào nộp bài dịch.</p>' : ''}
      </div>`,
      `<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`
    );
    // Cache for review
    window._translateSubsCache = subs;
  } catch (err) {
    openModal('Lỗi', `<p>${err.message}</p>`, '<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>');
  }
}

async function openTranslateReview(submissionId) {
  const s = (window._translateSubsCache || []).find(x => x.id === submissionId);
  if (!s) return;
  let answers = [];
  try { answers = JSON.parse(s.answers_json || '[]'); } catch(e) {}
  const nl2br = str => (str || '').replace(/</g,'&lt;').replace(/\n/g,'<br>');
  const answersHtml = answers.map((ans, i) => `
    <div style="border:1px solid var(--admin-border);border-radius:8px;padding:10px 12px;margin-bottom:8px">
      <div style="font-size:11px;color:var(--admin-text-muted);margin-bottom:4px">${i+1}. ${nl2br(ans.q)}</div>
      <div style="font-size:13px;margin-bottom:4px"><strong>Học viên:</strong> ${nl2br(ans.studentAnswer || '<em>Không trả lời</em>')}</div>
      <div style="font-size:12px;color:#17794A"><i class="fa-solid fa-check"></i> Đáp án: ${nl2br(ans.modelAnswer || ans.a || '—')}</div>
    </div>`).join('');
  openModal(
    `Chấm bài — ${s.student_name}`,
    `<div style="max-height:55vh;overflow-y:auto;margin-bottom:12px">${answersHtml}</div>
     <div style="display:grid;grid-template-columns:1fr 2fr;gap:12px">
       <div class="form-group" style="margin:0">
         <label style="font-size:12px">Điểm (0–100)</label>
         <input type="number" id="tr-review-score" min="0" max="100" value="${s.teacher_score ?? s.auto_score ?? 70}" style="width:100%">
       </div>
       <div class="form-group" style="margin:0">
         <label style="font-size:12px">Nhận xét</label>
         <textarea id="tr-review-comment" rows="2" style="width:100%;box-sizing:border-box">${s.teacher_comment || ''}</textarea>
       </div>
     </div>`,
    `<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>
     <button class="btn btn-primary" onclick="adminApp.saveTranslateReview(${submissionId}, this)">Lưu nhận xét</button>`
  );
}

async function saveTranslateReview(submissionId, btn) {
  const score = parseInt(document.getElementById('tr-review-score').value);
  const comment = document.getElementById('tr-review-comment').value;
  if (isNaN(score) || score < 0 || score > 100) { toast('Điểm phải từ 0-100', 'error'); return; }
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; }
  try {
    await apiPut(`/admin/translate-submissions/${submissionId}/review`, { teacher_score: score, teacher_comment: comment });
    toast('Đã lưu nhận xét.');
    closeModal();
    // Update cache
    const s = (window._translateSubsCache || []).find(x => x.id === submissionId);
    if (s) { s.teacher_score = score; s.teacher_comment = comment; }
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = 'Lưu nhận xét'; }
  }
}

// Gửi email nhắc những em chưa nộp (chỉ nhắc em chưa từng được nhắc cho bài này).
async function remindAssignment(id, btn) {
  const restore = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...'; }
  try {
    const r = await apiPost(`/admin/assignments/${id}/remind`, {});
    toast(r.message);
    closeModal();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = restore; }
  }
}

// ============================================================
// PHÂN TÍCH LỖI SAI CHUNG CỦA LỚP (2026-08-27)
// ============================================================
// Thay vì mở từng bài của từng em để đoán xem cả lớp yếu chỗ nào, màn này gom sẵn:
// câu nào nhiều em sai nhất, và các em hay chọn nhầm sang đáp án nào.
function goToMistakes() { gotoClassesView('mistakes'); }

async function renderClassMistakes(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const data = await apiGet(`/admin/classes/${currentClassId}/mistakes`);
    const list = data.mistakes || [];
    el.innerHTML = `
      <div style="margin-bottom:16px">
        <button class="btn btn-sm btn-outline" onclick="adminApp.backToClassDetail()"><i class="fa-solid fa-arrow-left"></i> ${currentClassName || 'Chi tiết lớp'}</button>
      </div>
      <div class="data-table-wrapper">
        <div class="table-toolbar">
          <h3 style="font-size:14px;font-weight:800;flex:1">
            <i class="fa-solid fa-triangle-exclamation" style="color:var(--admin-warning)"></i> Cả lớp hay sai ở đâu
            <div style="font-weight:400;font-size:12px;color:var(--admin-text-muted);margin-top:4px">
              Tổng hợp từ ${data.analysed_submissions} lần nộp bài gần nhất của các em trong lớp. Xếp theo số em sai nhiều nhất.
            </div>
          </h3>
        </div>
        ${list.length === 0
          ? `<div class="empty-state" style="padding:30px"><p>Chưa đủ dữ liệu để phân tích.</p>
             <p style="font-size:12px">Cần học viên làm bài (và bài phải được lưu chi tiết từng câu) thì mới thống kê được.</p></div>`
          : `<table class="data-table">
              <thead><tr><th>Câu hỏi</th><th style="width:120px">Bài</th><th style="width:130px">Số em sai</th><th>Hay chọn nhầm thành</th><th style="width:150px">Đáp án đúng</th></tr></thead>
              <tbody>
                ${list.map(m => `
                  <tr>
                    <td style="font-weight:600">${String(m.question).replace(/</g, '&lt;')}</td>
                    <td><span class="badge badge-gray">${assignmentLabel(m.lesson_id, '')}</span></td>
                    <td>
                      <span class="badge ${m.wrong_rate >= 60 ? 'badge-danger' : m.wrong_rate >= 30 ? 'badge-warning' : 'badge-gray'}">${m.wrong}/${m.attempts} em (${m.wrong_rate}%)</span>
                    </td>
                    <td style="color:var(--admin-danger)">${m.common_wrong_answer ? `${String(m.common_wrong_answer).replace(/</g, '&lt;')} <span style="color:var(--admin-text-muted);font-size:11px">(${m.common_wrong_count} em)</span>` : '—'}</td>
                    <td style="color:#17794A;font-weight:700">${String(m.correct_answer || '—').replace(/</g, '&lt;')}</td>
                  </tr>`).join('')}
              </tbody>
            </table>`}
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

// ============================================================
// XUẤT BÁO CÁO LỚP RA CSV (2026-08-27)
// ============================================================
// Xuất CSV chứ không phải .xlsx: Excel mở CSV trực tiếp, mà không phải nhét thư viện sinh Excel
// nặng vào serverless function. Có kèm BOM UTF-8 để Excel trên Windows không hiển thị lỗi tiếng Việt.
function _csvCell(v) {
  const t = v == null ? '' : String(v);
  return /[",\n;]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
}

function openReportForm() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
  openModal('Xuất báo cáo lớp', `
    <p style="font-size:13px;color:var(--admin-text-muted);margin-bottom:14px">
      Xuất bảng chuyên cần + điểm của lớp <b>${currentClassName || ''}</b> ra file CSV (mở được bằng Excel).
      Để trống ngày = tính toàn bộ thời gian.
    </p>
    <div class="form-row">
      <div class="form-group"><label>Từ ngày</label><input type="date" id="f-rp-from" value="${first}"></div>
      <div class="form-group"><label>Đến ngày</label><input type="date" id="f-rp-to" value="${last}"></div>
    </div>
  `,
  `<button class="btn btn-outline" onclick="adminApp.closeModal()">Hủy</button>
   <button class="btn btn-primary" onclick="adminApp.exportClassReport(this)"><i class="fa-solid fa-file-arrow-down"></i> Tải file</button>`);
}

async function exportClassReport(btn) {
  const from = document.getElementById('f-rp-from').value;
  const to = document.getElementById('f-rp-to').value;
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tạo...'; }
  try {
    const q = new URLSearchParams();
    if (from) q.set('tu', from);
    if (to) q.set('den', to);
    const data = await apiGet(`/admin/classes/${currentClassId}/report?${q}`);

    const period = from || to ? `${from || '...'} → ${to || '...'}` : 'Toàn bộ';
    const lines = [
      [`Báo cáo lớp: ${data.class.name}`],
      [`Kỳ báo cáo: ${period}`],
      [`Tổng số buổi trong kỳ: ${data.total_sessions}`],
      [`Xuất lúc: ${new Date(data.generated_at).toLocaleString('vi-VN')}`],
      [],
      ['Học viên', 'Email', 'Điện thoại', 'Có mặt', 'Vắng', 'Đi muộn', 'Về sớm', 'Tỉ lệ chuyên cần (%)', 'Số bài đã làm', 'Điểm TB (%)'],
      ...data.students.map(s => {
        const rate = data.total_sessions > 0 ? Math.round((s.attended / data.total_sessions) * 100) : '';
        return [s.name, s.email, s.phone || '', s.attended, s.absent, s.late, s.left_early, rate, s.exercises_done, s.avg_score ?? ''];
      }),
    ];
    const csv = '﻿' + lines.map(r => r.map(_csvCell).join(',')).join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bao-cao-${(data.class.name || 'lop').replace(/[^\w\-]+/g, '-')}-${from || 'all'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);

    toast(`Đã xuất báo cáo ${data.students.length} học viên.`);
    closeModal();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Tải file'; }
  }
}

// --- Helper: render nút "Xem" chi tiết 1 lần nộp bài (dùng trong accordion) ---
// 2026-08-27 — viết lại. Vấn đề của bản cũ:
//   1. Bài giáo trình chỉ có nút mở TAB MỚI sang trang bài tập, không có chỗ nào ghi nhận xét;
//      nút "Nhận xét" ở dòng con thì gọi openTextbookReviewModal() — hàm này ĐÃ BỊ XOÁ nên bấm vào
//      chỉ báo lỗi "is not a function". Kết quả: mất luôn đường xem chi tiết + nhận xét bài giáo trình.
//   2. Nút của dòng CHA (có onclick toggle accordion) không chặn nổi bọt sự kiện với type 'pron',
//      nên bấm "Xem" vừa mở modal vừa đóng/mở accordion.
// Nay: mọi loại bài đều mở CHUNG một modal chi tiết (đúng/sai từng câu + ô nhận xét ngay bên dưới),
// và luôn có event.stopPropagation(). Riêng bài giáo trình giữ thêm nút mở trang bài tập thật.
function _esc(s) {
  return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
/** Thoát chuỗi để nhét vào thuộc tính onclick="...('<chuỗi>')" — nháy đơn và xuống dòng làm vỡ HTML. */
/** Thoát để in text vào HTML. KHÁC _esc (chỉ thoát nháy cho thuộc tính) — hàm này thoát cả < > &,
 *  bắt buộc dùng khi nhét tên/email/nhận xét do người dùng nhập vào innerHTML. */
function _escHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function _escAttr(str) {
  return String(str == null ? '' : str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;')
    .replace(/[\r\n]+/g, ' ');
}

function _exDetailBtn(id, label) {
  return '<button class="btn btn-sm btn-outline" onclick="event.stopPropagation();adminApp.viewExerciseDetail(' +
    id + ", '" + _esc(label) + "')\"><i class=\"fa-solid fa-eye\"></i> Xem</button>";
}
// Nút phụ chỉ dành cho bài giáo trình: mở trang bài tập thật của học sinh ở tab mới.
function _exOpenPageBtn(id, lessonId) {
  return ' <button class="btn btn-sm btn-outline" title="Mở trang bài tập" onclick="event.stopPropagation();adminApp.openTextbookExerciseDetail(' +
    id + ", '" + _esc(lessonId) + "')\"><i class=\"fa-solid fa-arrow-up-right-from-square\"></i></button>";
}
function _noDetail() {
  return '<span style="color:var(--admin-text-muted);font-size:12px">—</span>';
}
function _fmtDate(d) { return new Date(d).toLocaleDateString('vi-VN'); }

function _renderPronAccordion(groups) {
  var empty = '<tr><td colspan="5"><div class="empty-state" style="padding:20px"><p>Chưa làm bài luyện phát âm nào.</p></div></td></tr>';
  var rows = '';
  for (var g = 0; g < groups.length; g++) {
    var group = groups[g];
    var latest = group.submissions[0];
    var count = group.submissions.length;
    rows += '<tr class="exercise-group-header" onclick="this.classList.toggle(\'expanded\');this.nextElementSibling.classList.toggle(\'show\')" style="cursor:pointer;background:var(--admin-bg-subtle,#f8f9fa)">' +
      '<td style="font-weight:700"><i class="fa-solid fa-chevron-right exercise-chevron" style="margin-right:6px;font-size:10px;transition:transform .2s"></i>' + group.label + ' <span style="color:var(--admin-text-muted);font-weight:400;font-size:12px">(' + count + ' lần)</span></td>' +
      '<td>' + scoreBadge(Math.round(latest.score_percent)) + '</td>' +
      '<td>' + latest.correct_answers + '/' + latest.total_questions + '</td>' +
      '<td>' + _fmtDate(latest.created_at) + '</td>' +
      '<td>' + (latest.has_detail ? _exDetailBtn(latest.exercise_result_id, group.label) : _noDetail()) + '</td>' +
      '</tr>';
    // Sub-rows
    var subHtml = '';
    if (count > 1) {
      for (var s = 1; s < group.submissions.length; s++) {
        var e = group.submissions[s];
        subHtml += '<tr style="background:var(--admin-bg,#fff)">' +
          '<td style="padding-left:30px;color:var(--admin-text-muted)">Lần ' + (count - s) + '</td>' +
          '<td>' + scoreBadge(Math.round(e.score_percent)) + '</td>' +
          '<td>' + e.correct_answers + '/' + e.total_questions + '</td>' +
          '<td>' + _fmtDate(e.created_at) + '</td>' +
          '<td>' + (e.has_detail ? _exDetailBtn(e.exercise_result_id, group.label) : _noDetail()) + '</td>' +
          '</tr>';
      }
    }
    rows += '<tr class="exercise-sub-rows"><td colspan="5" style="padding:0"><table class="data-table" style="margin:0;border:none;box-shadow:none">' + subHtml + '</table></td></tr>';
  }
  return '<div class="data-table-wrapper" style="margin-bottom:20px">' +
    '<div class="table-toolbar"><h3 style="font-size:14px;font-weight:700">🎧 Bài luyện phát âm — tất cả lần nộp</h3></div>' +
    '<table class="data-table"><thead><tr><th>Phần</th><th>Điểm</th><th>Số câu đúng</th><th>Ngày làm</th><th style="width:110px">Chi tiết</th></tr></thead>' +
    '<tbody>' + (groups.length === 0 ? empty : rows) + '</tbody></table></div>';
}

function _renderExamAccordion(groups) {
  var empty = '<tr><td colspan="6"><div class="empty-state" style="padding:20px"><p>Chưa làm bài thi nào.</p></div></td></tr>';
  var rows = '';
  for (var g = 0; g < groups.length; g++) {
    var group = groups[g];
    var latest = group.submissions[0];
    var count = group.submissions.length;
    var skillLabel = { 'mixed': 'Tổng hợp', 'listening': 'Nghe', 'reading': 'Đọc' }[group.skill] || group.skill;
    
    rows += '<tr class="exercise-group-header" onclick="this.classList.toggle(\'expanded\');this.nextElementSibling.classList.toggle(\'show\')" style="cursor:pointer;background:var(--admin-bg-subtle,#f8f9fa)">' +
      '<td style="font-weight:700"><i class="fa-solid fa-chevron-right exercise-chevron" style="margin-right:6px;font-size:10px;transition:transform .2s"></i>Kỹ năng: ' + skillLabel + ' <span style="color:var(--admin-text-muted);font-weight:400;font-size:12px">(' + count + ' lần)</span></td>' +
      '<td>' + scoreBadge(Math.round(latest.score_percent)) + '</td>' +
      '<td>' + latest.correct_answers + '/' + latest.total_questions + '</td>' +
      '<td>' + latest.time_seconds + 's</td>' +
      '<td>' + _fmtDate(latest.created_at) + '</td>' +
      '<td><button class="btn btn-sm btn-outline" onclick="event.stopPropagation();adminApp.viewExamExerciseDetail(' + latest.exam_result_id + ', \'' + skillLabel + '\')"><i class="fa-solid fa-eye"></i> Xem</button></td>' +
      '</tr>';
    var subHtml = '';
    if (count > 1) {
      for (var s = 1; s < group.submissions.length; s++) {
        var e = group.submissions[s];
        subHtml += '<tr style="background:var(--admin-bg,#fff)">' +
          '<td style="padding-left:30px;color:var(--admin-text-muted)">Lần ' + (count - s) + '</td>' +
          '<td>' + scoreBadge(Math.round(e.score_percent)) + '</td>' +
          '<td>' + e.correct_answers + '/' + e.total_questions + '</td>' +
          '<td>' + e.time_seconds + 's</td>' +
          '<td>' + _fmtDate(e.created_at) + '</td>' +
          '<td><button class="btn btn-sm btn-outline" onclick="adminApp.viewExamExerciseDetail(' + e.exam_result_id + ', \'' + skillLabel + '\')"><i class="fa-solid fa-eye"></i> Xem</button></td>' +
          '</tr>';
      }
    }
    rows += '<tr class="exercise-sub-rows"><td colspan="6" style="padding:0"><table class="data-table" style="margin:0;border:none;box-shadow:none">' + subHtml + '</table></td></tr>';
  }
  return '<div class="data-table-wrapper" style="margin-bottom:20px">' +
    '<div class="table-toolbar"><h3 style="font-size:14px;font-weight:700">📝 Bài thi — tất cả lần nộp</h3></div>' +
    '<table class="data-table"><thead><tr><th>Kỹ năng</th><th>Điểm</th><th>Số câu đúng</th><th>Thời gian</th><th>Ngày làm</th><th style="width:110px">Chi tiết</th></tr></thead>' +
    '<tbody>' + (groups.length === 0 ? empty : rows) + '</tbody></table></div>';
}

function _renderTextbookAccordion(groups) {
  var empty = '<tr><td colspan="6"><div class="empty-state" style="padding:20px"><p>Chưa làm bài tập giáo trình nào.</p></div></td></tr>';
  var rows = '';
  for (var g = 0; g < groups.length; g++) {
    var group = groups[g];
    var latest = group.submissions[0];
    var count = group.submissions.length;
    rows += '<tr class="exercise-group-header" onclick="this.classList.toggle(\'expanded\');this.nextElementSibling.classList.toggle(\'show\')" style="cursor:pointer;background:var(--admin-bg-subtle,#f8f9fa)">' +
      '<td style="font-weight:700"><i class="fa-solid fa-chevron-right exercise-chevron" style="margin-right:6px;font-size:10px;transition:transform .2s"></i>' + assignmentLabel(group.lesson_id) + ' <span style="color:var(--admin-text-muted);font-weight:400;font-size:12px">(' + count + ' lần)</span></td>' +
      '<td>' + scoreBadge(Math.round(latest.score_percent)) + '</td>' +
      '<td>' + latest.correct_answers + '/' + latest.total_questions + '</td>' +
      '<td>' + latest.time_seconds + 's</td>' +
      '<td>' + _fmtDate(latest.created_at) + '</td>' +
      '<td>' + (latest.has_detail
        ? _exDetailBtn(latest.exercise_result_id, assignmentLabel(group.lesson_id)) + _exOpenPageBtn(latest.exercise_result_id, group.lesson_id)
        : _noDetail()) + '</td>' +
      '</tr>';
    var subHtml = '';
    if (count > 1) {
      for (var s = 1; s < group.submissions.length; s++) {
        var e = group.submissions[s];
        subHtml += '<tr style="background:var(--admin-bg,#fff)">' +
          '<td style="padding-left:30px;color:var(--admin-text-muted)">Lần ' + (count - s) + '</td>' +
          '<td>' + scoreBadge(Math.round(e.score_percent)) + '</td>' +
          '<td>' + e.correct_answers + '/' + e.total_questions + '</td>' +
          '<td>' + e.time_seconds + 's</td>' +
          '<td>' + _fmtDate(e.created_at) + '</td>' +
          '<td>' + (e.has_detail
            ? _exDetailBtn(e.exercise_result_id, assignmentLabel(group.lesson_id)) + _exOpenPageBtn(e.exercise_result_id, group.lesson_id)
            : _noDetail()) + '</td>' +
          '</tr>';
      }
    }
    rows += '<tr class="exercise-sub-rows"><td colspan="6" style="padding:0"><table class="data-table" style="margin:0;border:none;box-shadow:none">' + subHtml + '</table></td></tr>';
  }
  return '<div class="data-table-wrapper" style="margin-bottom:20px">' +
    '<div class="table-toolbar"><h3 style="font-size:14px;font-weight:700">📖 Bài tập giáo trình — tất cả lần nộp</h3></div>' +
    '<table class="data-table"><thead><tr><th>Bài</th><th>Điểm</th><th>Số câu đúng</th><th>Thời gian</th><th>Ngày làm</th><th style="width:110px">Chi tiết</th></tr></thead>' +
    '<tbody>' + (groups.length === 0 ? empty : rows) + '</tbody></table></div>';
}

async function renderStudentDetail(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const data = await apiGet(`/admin/classes/${currentClassId}/students/${currentStudentId}`);
    const st = data.student;
    const att = data.attendance_summary || {};

    el.innerHTML = `
      <div style="margin-bottom:16px">
        <button class="btn btn-sm btn-outline" onclick="adminApp.backToClassDetailFromStudent()"><i class="fa-solid fa-arrow-left"></i> ${currentClassName || "Chi tiết lớp"}</button>
      </div>

      <!-- Sổ nhận xét: nạp bất đồng bộ sau khi khung đã hiện, đỡ làm chậm phần chính -->
      <div id="student-notes-box" class="data-table-wrapper" style="margin-bottom:20px"></div>

      <div class="stats-grid" style="margin-bottom:20px">
        <div class="stat-card">
          <div class="stat-icon" style="background:#E4F1EA;color:#265648"><i class="fa-solid fa-user"></i></div>
          <div class="stat-value" style="font-size:16px">${st.name}</div>
          <div class="stat-label">${st.email}</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#DDF1E6;color:#17794A"><i class="fa-solid fa-calendar-check"></i></div>
          <div class="stat-value">${att.attended_count || 0}/${att.total_sessions || 0}</div>
          <div class="stat-label">Buổi tham gia</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#FBEEDF;color:#B85C1A"><i class="fa-solid fa-clock"></i></div>
          <div class="stat-value">${att.late_count || 0}</div>
          <div class="stat-label">Lần đi muộn</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#F6E7DC;color:#A2541C"><i class="fa-solid fa-person-walking-arrow-right"></i></div>
          <div class="stat-value">${att.early_leave_count || 0}</div>
          <div class="stat-label">Lần về sớm</div>
        </div>
      </div>

      ${_renderPronAccordion(data.exercises.pronunciation)}

      ${_renderTextbookAccordion(data.exercises.textbook)}

      ${_renderExamAccordion(data.exercises.exams)}

      <div class="data-table-wrapper">
        <div class="table-toolbar"><h3 style="font-size:14px;font-weight:700">📅 Lịch sử điểm danh</h3></div>
        <table class="data-table">
          <thead><tr><th>Ngày</th><th>Chủ đề</th><th>Trạng thái</th><th>Đi muộn</th><th>Về sớm</th><th>Nhận xét giáo viên</th></tr></thead>
          <tbody>
            ${data.attendance_history.length === 0 ? '<tr><td colspan="6"><div class="empty-state" style="padding:20px"><p>Chưa có buổi học nào.</p></div></td></tr>' : ''}
            ${data.attendance_history.map(h => `
              <tr>
                <td>${h.session_date ? new Date(h.session_date).toLocaleDateString('vi-VN') : '<span style="color:#999;font-style:italic">Chưa có ngày</span>'}</td>
                <td>${h.topic || '—'}</td>
                <td>${h.status === 'absent' ? '<span class="badge badge-danger">Vắng</span>' : h.status === 'present' ? '<span class="badge badge-success">Có mặt</span>' : '<span class="badge badge-gray">Chưa điểm danh</span>'}</td>
                <td>${h.is_late ? '<span class="badge badge-warning">Muộn</span>' : '—'}</td>
                <td>${h.is_left_early ? '<span class="badge badge-warning">Về sớm</span>' : '—'}</td>
                <td style="font-size:12px">${h.teacher_note || '—'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    loadStudentNotes();
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><h3>Lỗi</h3><p>${err.message}</p></div>`;
  }
}

// ============================================================
// SỔ NHẬN XÉT HỌC VIÊN (2026-08-27)
// ============================================================
// teacher_note hiện có chỉ gắn với TỪNG BUỔI điểm danh — không có chỗ nào ghi nhận xét chung kiểu
// "em này phát âm tiến bộ nhưng lười làm bài". Sổ này là dòng thời gian riêng, rất hợp lúc họp
// phụ huynh: mở ra là thấy cả quá trình chứ không phải lật từng buổi.
async function loadStudentNotes() {
  const box = document.getElementById('student-notes-box');
  if (!box) return;
  box.innerHTML = '<div class="table-toolbar"><h3 style="font-size:14px;font-weight:700">📝 Sổ nhận xét</h3></div><div style="padding:16px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin"></i></div>';
  try {
    const data = await apiGet(`/admin/students/${currentStudentId}/notes`);
    const notes = data.notes || [];
    box.innerHTML = `
      <div class="table-toolbar">
        <h3 style="font-size:14px;font-weight:700;flex:1">📝 Sổ nhận xét ${notes.length ? `(${notes.length})` : ''}</h3>
      </div>
      <div style="padding:14px 18px">
        ${data.unavailable ? '<p style="font-size:13px;color:var(--admin-warning)">Chưa chạy migration-assignments-notes.sql nên chưa lưu được nhận xét.</p>' : ''}
        <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:${notes.length ? '14px' : '0'}">
          <textarea id="f-student-note" rows="2" placeholder="Nhận xét chung về học viên (tiến bộ, thái độ, điều cần lưu ý...)"
            style="flex:1;padding:8px;border:1.5px solid var(--admin-border);border-radius:8px;font-family:inherit;font-size:13px;resize:vertical"></textarea>
          <button class="btn btn-sm btn-primary" onclick="adminApp.addStudentNote(this)"><i class="fa-solid fa-plus"></i> Thêm</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${notes.map(n => `
            <div class="student-note">
              <div style="flex:1">
                <div style="font-size:13px;line-height:1.6;white-space:pre-wrap">${String(n.note).replace(/</g, '&lt;')}</div>
                <div style="font-size:11px;color:var(--admin-text-muted);margin-top:4px">
                  ${new Date(n.created_at).toLocaleString('vi-VN')}${n.author_name ? ` · ${n.author_name}` : ''}
                </div>
              </div>
              <button class="btn btn-icon btn-outline" title="Xoá nhận xét" style="color:var(--admin-danger)" onclick="adminApp.deleteStudentNote(${n.id})"><i class="fa-solid fa-trash"></i></button>
            </div>`).join('')}
        </div>
      </div>`;
  } catch (err) {
    box.innerHTML = `<div style="padding:16px;color:var(--admin-danger)">Lỗi tải sổ nhận xét: ${err.message}</div>`;
  }
}

async function addStudentNote(btn) {
  const box = document.getElementById('f-student-note');
  const note = box ? box.value.trim() : '';
  if (!note) { toast('Nhận xét không được để trống.', 'error'); return; }
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; }
  try {
    await apiPost(`/admin/students/${currentStudentId}/notes`, { note, class_id: currentClassId });
    toast('Đã lưu nhận xét.');
    loadStudentNotes();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-plus"></i> Thêm'; }
  }
}

function deleteStudentNote(id) {
  confirmDialog('Xoá nhận xét', 'Xoá nhận xét này khỏi sổ?', async () => {
    try { await apiDel(`/admin/student-notes/${id}`); toast('Đã xoá.'); loadStudentNotes(); }
    catch (err) { toast(err.message, 'error'); }
  });
}

// Chuẩn hoá `details_json` về CÙNG một dạng để chỉ cần 1 hàm render duy nhất.
// Hai loại bài lưu snapshot khác nhau:
//   - Luyện phát âm : mảng [{ question, options:[string], selected, correctIdx, explain }]
//   - Giáo trình    : { questions:[{ prompt, promptSub, options:[{text}], correctIdx, wordHanzi,
//                       wordPinyin, wordDef }], answers:[chỉ số đã chọn] }
// Trả về mảng thống nhất; câu chưa trả lời có selected = -1.
function _normalizeExerciseDetails(details) {
  if (!details) return [];
  if (Array.isArray(details)) {
    return details.map(it => ({
      question: it.question,
      sub: '',
      options: (it.options || []).map(o => (o && typeof o === 'object' ? o.text : o)),
      selected: typeof it.selected === 'number' ? it.selected : -1,
      correctIdx: it.correctIdx,
      note: it.explain || '',
    }));
  }
  if (Array.isArray(details.questions)) {
    const answers = details.answers || [];
    return details.questions.map((q, i) => ({
      question: q.prompt,
      sub: q.promptSub || '',
      options: (q.options || []).map(o => (o && typeof o === 'object' ? o.text : o)),
      selected: typeof answers[i] === 'number' ? answers[i] : -1,
      correctIdx: q.correctIdx,
      note: [q.wordHanzi, q.wordPinyin, q.wordDef].filter(Boolean).join(' · '),
    }));
  }
  return [];
}

// Khối "Nhận xét của giáo viên" gắn ngay dưới phần chi tiết bài làm — dùng chung cho bài tập lẫn bài thi.
// Đây chính là yêu cầu 2026-08-27: xem bài học sinh đã làm VÀ nhận xét ở cùng một chỗ.
function _reviewBox(existing, saveCall) {
  return `
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--admin-border)">
      <h4 style="font-size:13px;font-weight:700;margin-bottom:8px"><i class="fa-solid fa-comment-dots"></i> Nhận xét của giáo viên</h4>
      <textarea id="f-teacher-review" rows="3" style="width:100%;padding:8px;border:1px solid var(--admin-border);border-radius:6px;resize:vertical;font-family:inherit;font-size:13px" placeholder="Nhập nhận xét cho học viên...">${(existing || '').replace(/</g, '&lt;')}</textarea>
      <div style="display:flex;align-items:center;gap:10px;margin-top:8px">
        <span style="flex:1;font-size:12px;color:var(--admin-text-muted)">Học viên sẽ thấy nhận xét này ở chuông thông báo.</span>
        <button class="btn btn-sm btn-primary" onclick="${saveCall}"><i class="fa-solid fa-paper-plane"></i> Lưu nhận xét</button>
      </div>
    </div>`;
}

// Render danh sách câu hỏi kèm đánh dấu đúng/sai + đáp án học sinh đã chọn.
function _renderDetailItems(items) {
  if (items.length === 0) {
    return '<p style="color:var(--admin-text-muted)">Bài này chưa lưu dữ liệu chi tiết từng câu (học viên nộp trước khi có tính năng xem chi tiết).</p>';
  }
  return `<div style="display:flex;flex-direction:column;gap:10px;max-height:52vh;overflow-y:auto">
    ${items.map((it, i) => {
      const skipped = it.selected < 0;
      const ok = !skipped && it.selected === it.correctIdx;
      const bg = skipped ? '#F8FAFC' : (ok ? '#F0FDF4' : '#FEF2F2');
      const badge = skipped
        ? '<span class="badge badge-gray" style="margin-left:6px">Chưa trả lời</span>'
        : `<span class="badge ${ok ? 'badge-success' : 'badge-danger'}" style="margin-left:6px">${ok ? 'Đúng' : 'Sai'}</span>`;
      return `
      <div style="border:1px solid var(--admin-border,#e2e8f0);border-radius:10px;padding:12px 14px;background:${bg}">
        <div style="font-weight:700;font-size:13px;margin-bottom:6px">
          Câu ${i + 1}: ${it.question ?? ''}${badge}
          ${it.sub ? `<div style="font-weight:400;color:var(--admin-text-muted);font-size:12px">${it.sub}</div>` : ''}
        </div>
        <div style="font-size:13px;display:flex;flex-direction:column;gap:2px">
          ${(it.options || []).map((opt, oi) => {
            let style = 'color:var(--admin-text-muted)';
            let tag = '';
            if (oi === it.correctIdx) { style = 'color:#17794A;font-weight:700'; tag = ' ✓ đáp án đúng'; }
            if (oi === it.selected && oi !== it.correctIdx) { style = 'color:#DC2626;font-weight:700'; tag = ' ✗ học viên chọn'; }
            else if (oi === it.selected && oi === it.correctIdx) { tag = ' ✓ học viên chọn'; }
            return `<span style="${style}">${'ABCD'[oi] || ''}. ${opt}${tag}</span>`;
          }).join('')}
        </div>
        ${it.note ? `<div style="font-size:12px;color:var(--admin-text-muted);margin-top:6px"><i class="fa-solid fa-lightbulb"></i> ${it.note}</div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}

// Modal xem chi tiết 1 lần nộp bài (dùng cho CẢ luyện phát âm lẫn bài tập giáo trình):
// đúng/sai từng câu + ô nhận xét của giáo viên ngay bên dưới.
async function viewExerciseDetail(id, label) {
  openModal(`Chi tiết — ${label}`, '<div style="text-align:center;padding:24px"><i class="fa-solid fa-spinner fa-spin"></i></div>', '');
  try {
    const data = await apiGet(`/admin/exercise-results/${id}`);
    const items = _normalizeExerciseDetails(data.details);
    const body = _renderDetailItems(items) + _reviewBox(data.teacher_review, `adminApp.submitExerciseReview(${id}, this)`);
    openModal(`Chi tiết — ${label} (${data.correct_answers}/${data.total_questions} đúng)`, body,
      `<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`);
  } catch (err) {
    openModal('Lỗi', `<p>${err.message}</p>`, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`);
  }
}

// Giữ 2 tên cũ để mọi nút/liên kết đã tồn tại trước đây vẫn chạy được (không phá backward-compat).
const viewPronExerciseDetail = viewExerciseDetail;
const openTextbookReviewModal = viewExerciseDetail;

// Bài tập giáo trình: mở tab mới sang đúng trang bài tập của bài đó, kèm ?review=<id> — main.js sẽ tự tải
// lại đúng câu hỏi/lựa chọn học sinh đã chọn và hiện y hệt màn hình "đã nộp bài" (chỉ xem, không sửa được).
// Theo yêu cầu 2026-08-25 "có thể redirect về trang bài tập tương ứng kèm các options mà học sinh đã chọn".
function openTextbookExerciseDetail(id, lessonId) {
  // '5.2' -> bai-5-2 ; '2-5.2' -> quyen-2/bai-5-2 ; 'td2-5.1' -> quyen-2/bai-5-1 (khớp PAGE_PARAMS
  // bên main.js). Trang cũng phải đúng bộ giáo trình, nếu không link mở ra bài khác hẳn.
  window.open(`/tocfl/${tbPage(lessonId)}/${tbSlug(lessonId)}/bai-tap?review=${id}`, '_blank');
}


async function viewExamExerciseDetail(id, label) {
  openModal(`Chi tiết bài thi — ${label}`, '<div style="text-align:center;padding:24px"><i class="fa-solid fa-spinner fa-spin"></i></div>', '');
  try {
    const data = await apiGet(`/admin/exam-results/${id}`);
    const r = data.result;
    const answers = data.answers || [];
    
    let body = answers.length === 0
      ? '<p style="color:var(--admin-text-muted)">Không có dữ liệu chi tiết cho lần thi này.</p>'
      : `<div style="display:flex;flex-direction:column;gap:10px;max-height:60vh;overflow-y:auto">
          ${answers.map((ans, i) => {
            const ok = ans.is_correct;
            return `
            <div style="border:1px solid var(--admin-border,#e2e8f0);border-radius:10px;padding:12px 14px;background:${ok ? '#F0FDF4' : '#FEF2F2'}">
              <div style="font-weight:700;font-size:13px;margin-bottom:6px">
                Câu ${i + 1}: ${ans.question ?? ''}
                <span class="badge ${ok ? 'badge-success' : 'badge-danger'}" style="margin-left:6px">${ok ? 'Đúng' : 'Sai'}</span>
              </div>
              <div style="font-size:13px;display:flex;flex-direction:column;gap:2px">
                ${[ans.option_a, ans.option_b, ans.option_c, ans.option_d].map((opt, oi) => {
                  if (!opt) return '';
                  let style = 'color:var(--admin-text-muted)';
                  let tag = '';
                  if (oi === ans.correct_option) { style = 'color:#17794A;font-weight:700'; tag = ' ✓'; }
                  if (oi === ans.selected_option && oi !== ans.correct_option) { style = 'color:#DC2626;font-weight:700'; tag = ' ✗ (đã chọn)'; }
                  else if (oi === ans.selected_option && oi === ans.correct_option) { tag = ' ✓ (đã chọn)'; }
                  return `<span style="${style}">${'ABCD'[oi]}. ${opt}${tag}</span>`;
                }).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>`;

    body += _reviewBox(r.teacher_review, `adminApp.submitExamReview(${id}, this)`);

    openModal(`Chi tiết bài thi — ${label} (${r.correct_answers}/${r.total_questions} đúng)`, body,
      `<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`);
  } catch (err) {
    openModal('Lỗi', `<p>${err.message}</p>`, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`);
  }
}

// ============================================================
// REORDER — Move Up/Down (1 step) + Drag & Drop
// ============================================================
let _dragState = { table: null, dragIdx: null, items: [] };

// ============================================================
// EXPOSE PUBLIC API + INIT
// ============================================================

// =============================================================
// THIẾT BỊ ĐĂNG NHẬP — chống chia sẻ tài khoản (2026-09-15)
// =============================================================
// Chính sách: tối đa 2 thiết bị/tài khoản. Máy thứ 3 bị CHẶN đăng nhập và để lại một dòng ở đây.
// Màn này trả lời đúng một câu hỏi vận hành: "ai đang bị kẹt, và tôi bấm gì để mở cho họ?".
//
// Một dòng ở đây KHÔNG có nghĩa là học viên gian lận — đổi điện thoại, cài lại máy, xoá dữ liệu
// trình duyệt đều sinh ra "máy mới". Nên giao diện đưa ra hai hành động ngang nhau: gỡ máy cũ
// (trường hợp đổi máy thật) và bỏ qua (trường hợp đúng là chia sẻ tài khoản), chứ không mặc định
// coi ai cũng là gian lận.

let tbCanhBao = [];

async function renderThietBi(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const d = await apiGet('/admin/thiet-bi/canh-bao');
    tbCanhBao = d.canh_bao || [];
    _tbVe(el, d);
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><p>${_escHtml(err.message || 'Lỗi tải danh sách.')}</p></div>`;
  }
}

function _tbVe(el, d) {
  _tbBadge(tbCanhBao.length);
  const chuaMigrate = d.chua_migrate
    ? `<div class="alert alert-warning">Chưa chạy <code>migration-thiet-bi.sql</code> — giới hạn thiết bị đang TẮT.
       Chạy <code>npm run db:migrate:prod</code> để bật.</div>` : '';

  const rong = `
    <div class="empty-state">
      <i class="fa-solid fa-circle-check" style="font-size:32px;color:#16a34a"></i>
      <p>Không có tài khoản nào đang bị chặn vì quá số thiết bị.</p>
      <span>Mỗi tài khoản học viên dùng được trên tối đa ${d.tran || 2} thiết bị. Giáo viên và quản trị viên không bị giới hạn.</span>
    </div>`;

  const hang = tbCanhBao.map((c) => `
    <tr>
      <td>
        <strong>${esc(c.name || '(không tên)')}</strong>
        <div style="font-size:12px;color:var(--admin-text-muted)">${esc(c.email || '')}</div>
      </td>
      <td>${esc(c.ten || 'không rõ')}<div style="font-size:12px;color:var(--admin-text-muted)">IP ${esc(c.ip || '?')}</div></td>
      <td style="text-align:center">${c.so_lan_bi_chan}</td>
      <td>${_tbGio(c.tao_luc)}</td>
      <td style="white-space:nowrap">
        <button class="btn btn-sm btn-outline" onclick="adminApp.tbXem(${c.user_id}, '${esc(c.name || '')}')">
          <i class="fa-solid fa-mobile-screen-button"></i> Xem máy
        </button>
        <button class="btn btn-sm btn-outline" onclick="adminApp.tbBoQua(${c.user_id})">Bỏ qua</button>
      </td>
    </tr>`).join('');

  // `section-header` / `section-sub` KHÔNG tồn tại trong admin.css (cổng học viên mới có) — dùng
  // chúng là mất style mà không có lỗi nào hiện ra, đúng bẫy đã ghi ở CLAUDE.md 4.42.
  // `table-toolbar` + `data-table-wrapper` là cặp mà mọi màn khác trong admin đang dùng.
  el.innerHTML = `
    <div class="table-toolbar">
      <div>
        <h2 style="margin:0">Thiết bị đăng nhập</h2>
        <p style="margin:4px 0 0;font-size:13px;color:var(--admin-text-muted)">
          Tài khoản bị chặn vì đăng nhập quá ${d.tran || 2} thiết bị.
          Đổi máy thật thì gỡ máy cũ; đúng là chia sẻ tài khoản thì bỏ qua.</p>
      </div>
    </div>
    ${chuaMigrate}
    ${tbCanhBao.length ? `
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead><tr><th>Học viên</th><th>Máy bị chặn</th><th style="text-align:center">Số lần</th><th>Gần nhất</th><th></th></tr></thead>
          <tbody>${hang}</tbody>
        </table>
      </div>` : rong}`;
}

function _tbGio(x) {
  if (!x) return '—';
  const d = new Date(x);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getDate()}/${d.getMonth() + 1}`;
}

function _tbBadge(n) {
  const b = document.getElementById('tb-badge');
  if (!b) return;
  b.hidden = !n;
  b.textContent = n > 99 ? '99+' : String(n);
}

/** Danh sách máy đang hoạt động của một học viên, kèm nút gỡ từng máy. */
async function tbXem(userId, ten) {
  try {
    const d = await apiGet(`/admin/thiet-bi/${userId}`);
    const ds = d.thiet_bi || [];
    const body = ds.length ? `
      <p>Tài khoản <strong>${esc(ten)}</strong> đang dùng ${ds.length}/${d.tran} thiết bị.
         Gỡ một máy để học viên đăng nhập được trên máy mới.</p>
      <table class="data-table"><tbody>
      ${ds.map((t) => `
        <tr>
          <td><strong>${esc(t.ten || 'không rõ')}</strong>
            <div style="font-size:12px;color:var(--admin-text-muted)">IP ${esc(t.ip_lan_cuoi || '?')} · đăng nhập ${t.so_lan} lần · gần nhất ${_tbGio(t.lan_cuoi)}</div></td>
          <td style="text-align:right"><button class="btn btn-sm btn-danger" onclick="adminApp.tbGo(${userId}, ${t.id})">Gỡ máy này</button></td>
        </tr>`).join('')}
      </tbody></table>`
      : '<p>Tài khoản này hiện không có thiết bị nào đang hoạt động.</p>';
    openModal(`Thiết bị của ${esc(ten)}`, body);
  } catch (err) {
    alert(err.message || 'Lỗi tải danh sách thiết bị.');
  }
}

async function tbGo(userId, id) {
  if (!confirm('Gỡ thiết bị này? Học viên sẽ phải đăng nhập lại trên máy đó.')) return;
  try {
    await apiDel(`/admin/thiet-bi/${userId}/${id}`);
    closeModal();
    renderThietBi(document.getElementById('admin-content'));
  } catch (err) {
    alert(err.message || 'Lỗi gỡ thiết bị.');
  }
}

async function tbBoQua(userId) {
  if (!confirm('Bỏ qua cảnh báo này mà KHÔNG gỡ máy nào?')) return;
  try {
    await apiPost(`/admin/thiet-bi/canh-bao/${userId}/da-xu-ly`, {});
    renderThietBi(document.getElementById('admin-content'));
  } catch (err) {
    alert(err.message || 'Lỗi cập nhật.');
  }
}

// ============================================================
// HỒ SƠ DU HỌC (2026-09-15) — chỉ quản trị trung tâm
// ============================================================
// Luồng: Nhận hồ sơ -> Đóng tiền -> Học -> Phỏng vấn trường -> Xin visa -> Chốt lịch bay.
// Backend: server/routes/du-hoc.js. Giáo viên KHÔNG vào được (hồ sơ có CCCD, hộ chiếu, tiền).
//
// Hai màn, đổi bằng `dhView` giống cách Quản lý lớp làm: danh sách -> chi tiết một hồ sơ.

let dhView = 'list';          // 'list' | 'detail'
let dhId = null;              // id hồ sơ đang mở
let dhLoc = { buoc: '', tim: '', ky: '', trang: 1 };
let dhChiTiet = null;         // dữ liệu màn chi tiết đang xem
let dhBuocList = [];          // danh mục bước, server trả kèm mọi response
let dhNhanSu = [];            // để gán tư vấn viên phụ trách

const DH_KHOAN = {
  'dat-coc': 'Đặt cọc', 'phi-ho-so': 'Phí hồ sơ', 'hoc-phi': 'Học phí',
  'dich-thuat': 'Dịch thuật', 'phi-visa': 'Phí visa', 've-may-bay': 'Vé máy bay', khac: 'Khác',
};
const DH_HINH_THUC = { 'tien-mat': 'Tiền mặt', 'chuyen-khoan': 'Chuyển khoản', the: 'Thẻ', khac: 'Khác' };
const DH_GIAY_TO_TT = {
  chua: 'Chưa nhận', nhan: 'Đã nhận', dich: 'Đã dịch/công chứng', nop: 'Đã nộp trường', 'khong-can': 'Không cần',
};
const DH_LOAI_HINH = {
  'hoa-ngu': 'Hoa ngữ', 'dai-hoc': 'Đại học', 'cao-hoc': 'Cao học', 'tien-si': 'Tiến sĩ', khac: 'Khác',
};
const DH_KET_QUA = { cho: 'Đang chờ', dau: 'Đậu', truot: 'Trượt' };
/** Ký túc xá (2026-09-16). Nguyện vọng do HỌC SINH khai; kết quả + hạn do trung tâm điền. */
const DH_KTX_DK = { 'chua-quyet': 'Chưa quyết định', co: 'Có đăng ký', khong: 'Không đăng ký' };
const DH_KTX_KQ = { cho: 'Đang chờ trường xếp', duoc: 'Đã được xếp', 'khong-duoc': 'Không được xếp' };

const _dhBuoc = (ma) => dhBuocList.find((b) => b.ma === ma) || { ma, ten: ma, icon: 'fa-circle', mau: '#94A3B8' };
const _dhNgay = (d) => (d ? new Date(d).toLocaleDateString('vi-VN') : '—');
const _dhVal = (id) => (document.getElementById(id)?.value || '').trim();
const _dhSo = (id) => parseInt(String(_dhVal(id)).replace(/[^\d]/g, ''), 10) || 0;

/** Chip trạng thái bước, dùng chung ở bảng danh sách và các thẻ việc cần làm. */
function _dhChipBuoc(ma) {
  const b = _dhBuoc(ma);
  return `<span class="dh-chip" style="background:${b.mau}1a;color:${b.mau}">
    <i class="fa-solid ${b.icon}"></i> ${esc(b.ten)}</span>`;
}

// ------------------------------------------------------------------ điều phối

async function renderDuHoc(el) {
  if (dhView === 'detail' && dhId) return _dhVeChiTiet(el);
  const r = await _dhVeDanhSach(el);
  dhNapYeuCau();     // nạp sau, không chặn cả màn vì một request phụ
  return r;
}

// ------------------------------------------------------------------ yêu cầu sửa của học sinh
/**
 * Hàng chờ duyệt, đặt ngay đầu màn danh sách vì đây là việc cần xử lý trong ngày — học sinh gửi
 * xong là đang đợi, để lẫn vào một tab riêng thì không ai nhớ mở.
 * Rỗng thì ẩn hẳn khối (không để một ô "chưa có yêu cầu nào" chiếm chỗ).
 */
async function dhNapYeuCau() {
  const slot = document.getElementById('dh-yc-slot');
  if (!slot) return;
  let r;
  try { r = await apiGet('/admin/du-hoc/yeu-cau-sua?trang_thai=cho'); } catch (_) { return; }
  const ds = r?.items || [];
  if (!ds.length || !document.getElementById('dh-yc-slot')) return;

  slot.innerHTML = `
    <div class="dh-yc-box">
      <div class="dh-yc-head"><i class="fa-solid fa-pen-to-square"></i>
        Học sinh xin sửa hồ sơ <span class="dh-yc-so">${ds.length}</span></div>
      ${ds.map((y) => `
        <div class="dh-yc-i">
          <div class="dh-yc-top">
            <b onclick="adminApp.dhMo(${y.ho_so_id})" class="dh-yc-ten">${esc(y.ho_ten)}</b>
            <span class="dh-sub">${esc(y.ma_hs)} · ${_dhNgay(y.created_at)}</span>
          </div>
          <ul class="dh-yc-ds">${(y.thay_doi || []).map((t) => `
            <li><span class="dh-yc-nhan">${esc(t.nhan || t.cot)}</span>
              <s>${esc(t.cu || '(trống)')}</s> → <strong>${esc(t.moi || '(trống)')}</strong></li>`).join('')}</ul>
          ${y.ly_do ? `<div class="dh-sub dh-yc-lydo"><i class="fa-solid fa-quote-left"></i> ${esc(y.ly_do)}</div>` : ''}
          <div class="dh-yc-nut">
            <button class="btn btn-outline btn-sm" onclick="adminApp.dhTuChoiYc(${y.id})">Từ chối</button>
            <button class="btn btn-primary btn-sm" onclick="adminApp.dhDuyetYc(${y.id})">
              <i class="fa-solid fa-check"></i> Duyệt &amp; cập nhật</button>
          </div>
        </div>`).join('')}
    </div>`;
}

function dhDuyetYc(id) {
  confirmDialog('Duyệt yêu cầu sửa',
    'Áp các thay đổi này vào hồ sơ? Học sinh sẽ nhận được thông báo.', async () => {
      try {
        const r = await apiPost(`/admin/du-hoc/yeu-cau-sua/${id}/duyet`, {});
        toast(r.message || 'Đã duyệt.');
        renderDuHoc(document.getElementById('admin-content'));
      } catch (err) { toast(err.message || 'Không duyệt được.', 'error'); }
    });
}

function dhTuChoiYc(id) {
  // BẮT BUỘC có lý do — không thì học sinh gửi lại y hệt và cả hai bên cùng mất thời gian.
  openModal('Từ chối yêu cầu sửa', `
    <div class="form-group"><label>Lý do từ chối <span style="color:#EF4444">*</span></label>
      <textarea id="f-yc-phan-hoi" rows="3"
        placeholder="Ví dụ: hồ sơ đã nộp trường theo tên cũ, em mang giấy tờ tới trung tâm để làm lại"></textarea></div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.dhTuChoiYcLuu(${id})">Gửi từ chối</button>`);
}

async function dhTuChoiYcLuu(id) {
  const ly = document.getElementById('f-yc-phan-hoi')?.value.trim() || '';
  if (!ly) return toast('Nhập lý do để học sinh biết cần làm gì.', 'error');
  try {
    await apiPost(`/admin/du-hoc/yeu-cau-sua/${id}/tu-choi`, { phan_hoi: ly });
    toast('Đã từ chối yêu cầu.');
    closeModal();
    renderDuHoc(document.getElementById('admin-content'));
  } catch (err) { toast(err.message || 'Không xử lý được.', 'error'); }
}

function dhMo(id) {
  dhView = 'detail';
  dhId = id;
  currentSection = 'du-hoc';
  _writeAdminUrl(buildAdminHash('du-hoc'), false);
  renderDuHoc(document.getElementById('admin-content'));
}

function dhVeDanhSach() {
  dhView = 'list';
  dhId = null;
  dhChiTiet = null;
  currentSection = 'du-hoc';
  _writeAdminUrl(buildAdminHash('du-hoc'), false);
  renderDuHoc(document.getElementById('admin-content'));
}

// ------------------------------------------------------------------ MÀN DANH SÁCH

async function _dhVeDanhSach(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    const q = new URLSearchParams();
    if (dhLoc.buoc) q.set('buoc', dhLoc.buoc);
    if (dhLoc.tim) q.set('tim', dhLoc.tim);
    if (dhLoc.ky) q.set('ky', dhLoc.ky);
    if (dhLoc.trang > 1) q.set('trang', dhLoc.trang);

    // Hai request song song: tổng quan (số liệu + việc cần làm) và danh sách đã lọc. Gộp làm một
    // endpoint thì mỗi lần gõ ô tìm kiếm lại tính lại toàn bộ số liệu — tốn mà không đổi gì.
    const [tq, ds] = await Promise.all([
      apiGet('/admin/du-hoc/tong-quan'),
      apiGet('/admin/du-hoc/ho-so?' + q.toString()),
    ]);
    dhBuocList = ds.buoc || tq.buoc || [];
    _dhVeDanhSachHtml(el, tq, ds);
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><p>${_escHtml(err.message || 'Không tải được hồ sơ du học.')}</p></div>`;
  }
}

function _dhVeDanhSachHtml(el, tq, ds) {
  const chuaMigrate = (tq.chua_migrate || ds.chua_migrate)
    ? `<div class="alert alert-warning">Chưa chạy <code>migration-du-hoc.sql</code>.
       Chạy <code>npm run db:migrate:prod</code> để bật khu Hồ sơ du học.</div>` : '';

  const t = tq.tien || {};
  const soLieu = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon" style="background:#2656481a;color:#265648"><i class="fa-solid fa-folder-open"></i></div>
        <div><div class="stat-value">${tq.dang_chay || 0}</div><div class="stat-label">Hồ sơ đang xử lý</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#16A34A1a;color:#16A34A"><i class="fa-solid fa-hand-holding-dollar"></i></div>
        <div><div class="stat-value" style="font-size:20px">${_tien(t.da_thu)}</div><div class="stat-label">Đã thu</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#B85C1A1a;color:#B85C1A"><i class="fa-solid fa-scale-unbalanced"></i></div>
        <div><div class="stat-value" style="font-size:20px">${_tien(t.con_thieu)}</div><div class="stat-label">Còn phải thu</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#2F6B581a;color:#2F6B58"><i class="fa-solid fa-calendar-day"></i></div>
        <div><div class="stat-value" style="font-size:20px">${_tien(t.thu_30_ngay)}</div><div class="stat-label">Thu 30 ngày qua</div></div></div>
    </div>`;

  // --- VIỆC CẦN LÀM ---
  // Nhóm nào rỗng thì ẩn hẳn nhóm đó; rỗng cả 5 thì ẩn cả khối. Để lại năm ô trống trông như hệ
  // thống hỏng chứ không phải như "hôm nay không có việc" (cùng lối với khu Cộng đồng, CLAUDE.md 4.43).
  const v = tq.viec || {};
  const oViec = (ten, icon, mau, ds_, ve) => (!ds_ || !ds_.length ? '' : `
    <div class="dh-viec">
      <div class="dh-viec-head" style="color:${mau}"><i class="fa-solid ${icon}"></i> ${ten}
        <span class="dh-viec-so" style="background:${mau}">${ds_.length}${ds_.length >= 20 ? '+' : ''}</span></div>
      <ul class="dh-viec-list">${ds_.map(ve).join('')}</ul>
    </div>`);

  const li = (h, phu) => `<li onclick="adminApp.dhMo(${h.id})">
      <span class="dh-viec-ten">${esc(h.ho_ten)}</span><span class="dh-viec-phu">${phu}</span></li>`;

  const khoiViec = [
    oViec('Phỏng vấn trong 14 ngày', 'fa-comments', '#2F6B58', v.phong_van,
      (h) => li(h, _dhNgay(h.ngay_phong_van))),
    oViec('Bay trong 30 ngày', 'fa-plane-departure', '#17794A', v.sap_bay,
      (h) => li(h, _dhNgay(h.ngay_bay))),
    oViec('Hộ chiếu sắp hết hạn', 'fa-passport', '#DC2626', v.ho_chieu,
      (h) => li(h, _dhNgay(h.ho_chieu_het_han))),
    oViec('Đứng yên quá 30 ngày', 'fa-hourglass-half', '#B85C1A', v.bo_quen,
      (h) => li(h, `${h.so_ngay} ngày · ${esc(_dhBuoc(h.buoc).ten)}`)),
    oViec('Còn nợ học phí', 'fa-scale-unbalanced', '#8A4513', v.cong_no,
      (h) => li(h, _tien(Math.max(0, h.tong_phi - h.da_thu)))),
  ].join('');

  // --- Bộ lọc theo bước: mỗi bước một nút kèm số hồ sơ đang ở đó ---
  const dem = {};
  (tq.theo_buoc || []).forEach((x) => { dem[x.buoc] = x.so; });
  const nutBuoc = [
    `<button class="dh-tab ${dhLoc.buoc === '' ? 'active' : ''}" onclick="adminApp.dhDoiBuocLoc('')">Tất cả</button>`,
    `<button class="dh-tab ${dhLoc.buoc === 'dang-chay' ? 'active' : ''}" onclick="adminApp.dhDoiBuocLoc('dang-chay')">Đang xử lý</button>`,
    ...dhBuocList.map((b) => `
      <button class="dh-tab ${dhLoc.buoc === b.ma ? 'active' : ''}" onclick="adminApp.dhDoiBuocLoc('${b.ma}')"
              style="${dhLoc.buoc === b.ma ? `background:${b.mau};border-color:${b.mau}` : ''}">
        <i class="fa-solid ${b.icon}"></i> ${esc(b.ten)}
        ${dem[b.ma] ? `<span class="dh-tab-so">${dem[b.ma]}</span>` : ''}
      </button>`),
  ].join('');

  const hang = (ds.ho_so || []).map((h) => {
    const thieu = Math.max(0, h.tong_phi - Number(h.da_thu || 0));
    return `
    <tr class="dh-row" onclick="adminApp.dhMo(${h.id})">
      <td>
        <strong>${esc(h.ho_ten)}</strong>
        <div class="dh-sub">${esc(h.ma_hs)}${h.phone ? ' · ' + esc(h.phone) : ''}</div>
      </td>
      <td>${_dhChipBuoc(h.buoc)}
        ${h.buoc_tu ? `<div class="dh-sub">từ ${_dhNgay(h.buoc_tu)}</div>` : ''}</td>
      <td>${h.truong_nv1 ? esc(h.truong_nv1) : '<span class="dh-sub">—</span>'}
        <div class="dh-sub">${h.ky_nhap_hoc ? esc(h.ky_nhap_hoc) : ''}${h.loai_hinh ? ' · ' + DH_LOAI_HINH[h.loai_hinh] : ''}</div></td>
      <td style="white-space:nowrap">
        ${h.tong_phi
          ? `${_tien(h.da_thu)}<span class="dh-sub"> / ${_tien(h.tong_phi)}</span>
             ${!thieu ? '<div class="dh-sub" style="color:#16A34A;font-weight:700">đủ</div>'
               : h.buoc === 'huy'
                 // Hồ sơ đã huỷ thì khoản chênh không còn là nợ phải đòi — ô "Còn nợ học phí" ở
                 // trên cũng đã loại nhóm này. Tô cam ở đây là hai chỗ trên cùng một màn hình nói
                 // hai kiểu khác nhau về cùng một người.
                 ? `<div class="dh-sub">chênh ${_tien(thieu)}</div>`
                 : `<div class="dh-sub" style="color:#8A4513;font-weight:700">thiếu ${_tien(thieu)}</div>`}`
          : '<span class="dh-sub">chưa chốt phí</span>'}</td>
      <td style="text-align:center">
        ${h.thieu_giay_to
          ? `<span class="badge badge-warning">thiếu ${h.thieu_giay_to}</span>`
          : '<span class="badge badge-success">đủ</span>'}</td>
      <td class="dh-sub" style="white-space:nowrap">
        ${h.ngay_bay ? '<i class="fa-solid fa-plane-departure"></i> ' + _dhNgay(h.ngay_bay)
          : h.ngay_phong_van ? '<i class="fa-solid fa-comments"></i> ' + _dhNgay(h.ngay_phong_van) : '—'}</td>
    </tr>`;
  }).join('');

  const rong = `
    <div class="empty-state">
      <i class="fa-solid fa-folder-open" style="font-size:32px;color:var(--admin-text-muted)"></i>
      <p>${dhLoc.tim || dhLoc.buoc || dhLoc.ky ? 'Không có hồ sơ nào khớp bộ lọc.' : 'Chưa có hồ sơ du học nào.'}</p>
      <span>Bấm <b>Thêm hồ sơ</b> để nhận hồ sơ đầu tiên. Học sinh chưa có tài khoản trên hệ thống vẫn tạo được.</span>
    </div>`;

  el.innerHTML = `
    <div class="table-toolbar">
      <div>
        <h2 style="margin:0">Hồ sơ du học</h2>
        <p style="margin:4px 0 0;font-size:13px;color:var(--admin-text-muted)">
          Nhận hồ sơ → Đóng tiền → Học → Phỏng vấn trường → Xin visa → Chốt lịch bay.</p>
      </div>
      <button class="btn btn-primary" onclick="adminApp.dhFormHoSo()">
        <i class="fa-solid fa-plus"></i> Thêm hồ sơ
      </button>
    </div>
    ${chuaMigrate}
    ${soLieu}
    <div id="dh-yc-slot"></div>
    ${khoiViec ? `<div class="dh-viec-grid">${khoiViec}</div>` : ''}
    <div class="dh-tabs">${nutBuoc}</div>
    <div class="dh-filter">
      <input type="search" id="dh-tim" placeholder="Tìm tên, mã hồ sơ, điện thoại, email, CCCD…"
             value="${_escAttr(dhLoc.tim)}" onkeydown="if(event.key==='Enter')adminApp.dhTim()">
      <button class="btn btn-outline btn-sm" onclick="adminApp.dhTim()"><i class="fa-solid fa-magnifying-glass"></i></button>
      ${(ds.ky_list || []).length ? `
        <select id="dh-ky" onchange="adminApp.dhDoiKy()">
          <option value="">Mọi kỳ nhập học</option>
          ${ds.ky_list.map((k) => `<option value="${_escAttr(k)}" ${dhLoc.ky === k ? 'selected' : ''}>${esc(k)}</option>`).join('')}
        </select>` : ''}
      ${(dhLoc.tim || dhLoc.ky || dhLoc.buoc)
        ? `<button class="btn btn-outline btn-sm" onclick="adminApp.dhXoaLoc()">Xoá lọc</button>` : ''}
      <span style="margin-left:auto;font-size:13px;color:var(--admin-text-muted)">${ds.tong || 0} hồ sơ</span>
    </div>
    ${(ds.ho_so || []).length ? `
      <div class="data-table-wrapper dh-table-wrap">
        <table class="data-table">
          <thead><tr>
            <th>Học sinh</th><th>Bước</th><th>Nguyện vọng</th><th>Tiền</th>
            <th style="text-align:center">Giấy tờ</th><th>Mốc gần nhất</th>
          </tr></thead>
          <tbody>${hang}</tbody>
        </table>
      </div>
      ${ds.so_trang > 1 ? `
        <div class="table-pagination">
          <button class="btn btn-sm btn-outline" ${dhLoc.trang <= 1 ? 'disabled' : ''}
                  onclick="adminApp.dhTrang(${dhLoc.trang - 1})">Trước</button>
          <span>Trang ${ds.trang} / ${ds.so_trang}</span>
          <button class="btn btn-sm btn-outline" ${dhLoc.trang >= ds.so_trang ? 'disabled' : ''}
                  onclick="adminApp.dhTrang(${dhLoc.trang + 1})">Sau</button>
        </div>` : ''}
    ` : rong}`;
}

function dhDoiBuocLoc(b) { dhLoc.buoc = b; dhLoc.trang = 1; renderDuHoc(document.getElementById('admin-content')); }
function dhTim() { dhLoc.tim = _dhVal('dh-tim'); dhLoc.trang = 1; renderDuHoc(document.getElementById('admin-content')); }
function dhDoiKy() { dhLoc.ky = _dhVal('dh-ky'); dhLoc.trang = 1; renderDuHoc(document.getElementById('admin-content')); }
function dhXoaLoc() { dhLoc = { buoc: '', tim: '', ky: '', trang: 1 }; renderDuHoc(document.getElementById('admin-content')); }
function dhTrang(n) { dhLoc.trang = Math.max(1, n); renderDuHoc(document.getElementById('admin-content')); }

// ------------------------------------------------------------------ MÀN CHI TIẾT

async function _dhVeChiTiet(el) {
  el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';
  try {
    dhChiTiet = await apiGet(`/admin/du-hoc/ho-so/${dhId}`);
    dhBuocList = dhChiTiet.buoc || dhBuocList;
    _dhVeChiTietHtml(el);
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><p>${_escHtml(err.message || 'Không mở được hồ sơ.')}</p>
      <button class="btn btn-outline" onclick="adminApp.dhVeDanhSach()">← Về danh sách</button></div>`;
  }
}

function _dhVeChiTietHtml(el) {
  const d = dhChiTiet;
  const h = d.ho_so;
  const t = d.tien || {};

  // --- Thanh 6 bước. Bấm thẳng vào bước để chuyển; cho tới/lùi tự do (trượt visa phải làm lại). ---
  const chinh = dhBuocList.filter((b) => !['hoan-thanh', 'tam-dung', 'huy'].includes(b.ma));
  const viTri = chinh.findIndex((b) => b.ma === h.buoc);
  const ketThuc = ['hoan-thanh', 'tam-dung', 'huy'].includes(h.buoc);
  const thanhBuoc = `
    <div class="dh-steps">
      ${chinh.map((b, i) => {
        const qua = !ketThuc && viTri >= 0 && i < viTri;
        const nay = b.ma === h.buoc;
        return `
        <button class="dh-step ${nay ? 'is-now' : qua ? 'is-done' : ''}"
                style="${nay ? `--c:${b.mau}` : ''}"
                onclick="adminApp.dhChuyenBuoc('${b.ma}')" title="Chuyển sang bước này">
          <span class="dh-step-ic"><i class="fa-solid ${qua ? 'fa-check' : b.icon}"></i></span>
          <span class="dh-step-ten">${esc(b.ten)}</span>
        </button>`;
      }).join('')}
    </div>
    <div class="dh-step-end">
      ${['hoan-thanh', 'tam-dung', 'huy'].map((m) => {
        const b = _dhBuoc(m);
        return `<button class="dh-step-endbtn ${h.buoc === m ? 'active' : ''}"
          style="${h.buoc === m ? `background:${b.mau};border-color:${b.mau};color:#fff` : ''}"
          onclick="adminApp.dhChuyenBuoc('${m}')"><i class="fa-solid ${b.icon}"></i> ${esc(b.ten)}</button>`;
      }).join('')}
      ${h.buoc_tu ? `<span class="dh-sub" style="margin-left:auto">Ở bước hiện tại từ ${_dhNgay(h.buoc_tu)}</span>` : ''}
    </div>`;

  // --- Thông tin hồ sơ ---
  const o = (nhan, gt) => `<div class="dh-f"><span>${nhan}</span><b>${gt || '—'}</b></div>`;
  const hetHanGan = h.ho_chieu_het_han
    && new Date(h.ho_chieu_het_han) <= new Date(Date.now() + 182 * 864e5);

  const thongTin = `
    <div class="data-table-wrapper" style="padding:16px">
      <div class="dh-block-head">
        <h3>Thông tin hồ sơ</h3>
        <button class="btn btn-sm btn-outline" onclick="adminApp.dhFormHoSo(${h.id})">
          <i class="fa-solid fa-pen"></i> Sửa</button>
      </div>
      <div class="dh-fields">
        ${o('Ngày sinh', _dhNgay(h.ngay_sinh))}
        ${o('Giới tính', h.gioi_tinh ? ({ nam: 'Nam', nu: 'Nữ', khac: 'Khác' })[h.gioi_tinh] : '')}
        ${o('Điện thoại', esc(h.phone || ''))}
        ${o('Email', esc(h.email || ''))}
        ${o('CCCD', esc(h.cccd || ''))}
        ${o('Hộ chiếu', h.ho_chieu ? `${esc(h.ho_chieu)}${h.ho_chieu_het_han
            ? ` <span class="${hetHanGan ? 'dh-warn' : 'dh-sub'}">(hết hạn ${_dhNgay(h.ho_chieu_het_han)}${hetHanGan ? ' ⚠' : ''})</span>` : ''}` : '')}
        ${o('Địa chỉ', esc(h.dia_chi || ''))}
        ${o('Liên lạc khác', esc(h.lien_lac_khac || ''))}
        ${o('Người bảo lãnh', h.ph_ten ? `${esc(h.ph_ten)}${h.ph_quan_he ? ` (${esc(h.ph_quan_he)})` : ''}${h.ph_phone ? ' · ' + esc(h.ph_phone) : ''}` : '')}
        ${o('Trường tốt nghiệp', h.truong_tn ? `${esc(h.truong_tn)}${h.nam_tn ? ' · ' + esc(h.nam_tn) : ''}${h.xep_loai ? ' · ' + esc(h.xep_loai) : ''}` : '')}
        ${o('Trình độ tiếng', esc(h.trinh_do_tieng || ''))}
        ${o('Nguyện vọng', [h.truong_nv1, h.truong_nv2, h.truong_nv3].filter(Boolean).map(esc).join('<br>'))}
        ${o('Ngành', esc(h.nganh || ''))}
        ${o('Kỳ nhập học', `${esc(h.ky_nhap_hoc || '')}${h.loai_hinh ? ' · ' + DH_LOAI_HINH[h.loai_hinh] : ''}`)}
        ${o('Tư vấn viên', esc(h.tu_van_ten || dhNhanSu.find((n) => n.id === h.tu_van_id)?.name || ''))}
        ${o('Nguồn khách', esc(h.nguon || ''))}
        ${o('Ngày nhận hồ sơ', _dhNgay(h.ngay_nhan))}
        ${o('Ký túc xá', h.ktx_dang_ky && h.ktx_dang_ky !== 'chua-quyet'
            ? `${DH_KTX_DK[h.ktx_dang_ky]}${h.ktx_loai ? ' · ' + esc(h.ktx_loai) : ''}`
              + `${h.ktx_kq ? ` <span class="dh-sub">(${DH_KTX_KQ[h.ktx_kq]})</span>` : ''}`
              + `${h.ktx_han ? ` <span class="dh-sub">· hạn ${_dhNgay(h.ktx_han)}</span>` : ''}`
            : (h.ktx_han ? `<span class="dh-sub">học sinh chưa chọn · hạn ${_dhNgay(h.ktx_han)}</span>` : ''))}
        ${o('Học sinh khai hồ sơ', h.hs_gui_luc
            ? `<span class="dh-ok">Đã gửi ${_dhNgay(h.hs_gui_luc)}</span>`
            : (h.user_id ? '<span class="dh-warn">Chưa gửi</span>' : '<span class="dh-sub">chưa gắn tài khoản</span>'))}
      </div>
      ${h.ghi_chu ? `<div class="dh-note"><i class="fa-solid fa-note-sticky"></i><span>${esc(h.ghi_chu)}</span></div>` : ''}
    </div>`;

  // --- Mốc phỏng vấn / visa / bay ---
  const kq = (v) => (v ? `<span class="badge ${v === 'dau' ? 'badge-success' : v === 'truot' ? 'badge-danger' : 'badge-gray'}">${DH_KET_QUA[v]}</span>` : '');
  const mocs = `
    <div class="data-table-wrapper" style="padding:16px">
      <div class="dh-block-head"><h3>Phỏng vấn · Visa · Lịch bay</h3></div>
      <div class="dh-moc">
        <div><span class="dh-sub">Phỏng vấn trường</span>
          <b>${_dhNgay(h.ngay_phong_van)}</b> ${kq(h.kq_phong_van)}
          ${h.truong_do ? `<div class="dh-sub">Đậu: ${esc(h.truong_do)}</div>` : ''}</div>
        <div><span class="dh-sub">Nộp hồ sơ visa</span>
          <b>${_dhNgay(h.ngay_nop_visa)}</b> ${kq(h.kq_visa)}</div>
        <div><span class="dh-sub">Chuyến bay</span>
          <b>${_dhNgay(h.ngay_bay)}</b>
          ${h.chuyen_bay ? `<div class="dh-sub">${esc(h.chuyen_bay)}</div>` : ''}</div>
      </div>
    </div>`;

  // --- Checklist giấy tờ ---
  const gt = d.giay_to || [];
  const thieu = gt.filter((g) => g.bat_buoc && g.trang_thai === 'chua').length;
  const giayTo = `
    <div class="data-table-wrapper" style="padding:16px">
      <div class="dh-block-head">
        <h3>Giấy tờ
          ${thieu ? `<span class="badge badge-warning">thiếu ${thieu}</span>`
                  : '<span class="badge badge-success">đủ giấy bắt buộc</span>'}</h3>
        <button class="btn btn-sm btn-outline" onclick="adminApp.dhThemGiayTo()">
          <i class="fa-solid fa-plus"></i> Thêm</button>
      </div>
      <p class="dh-sub" style="margin:0 0 10px">Bản giấy vẫn lưu tại trung tâm — ở đây chỉ đánh dấu đã nhận tới đâu.</p>
      <ul class="dh-gt">
        ${gt.map((g) => `
          <li class="dh-gt-item is-${g.trang_thai}">
            <div class="dh-gt-ten">${esc(g.ten)}
              ${g.bat_buoc ? '' : '<span class="dh-sub">(không bắt buộc)</span>'}
              ${g.ngay_nhan ? `<span class="dh-sub"> · ${_dhNgay(g.ngay_nhan)}</span>` : ''}</div>
            <div class="dh-gt-act">
              <select onchange="adminApp.dhDoiGiayTo(${g.id}, this.value)">
                ${Object.entries(DH_GIAY_TO_TT).map(([k, v]) =>
                  `<option value="${k}" ${g.trang_thai === k ? 'selected' : ''}>${v}</option>`).join('')}
              </select>
              <button class="btn-icon" title="Xoá mục này" onclick="adminApp.dhXoaGiayTo(${g.id})">
                <i class="fa-solid fa-trash"></i></button>
            </div>
          </li>`).join('')}
      </ul>
    </div>`;

  // --- Sổ thu tiền ---
  const tt = d.thu_tien || [];
  const pct = h.tong_phi > 0 ? Math.min(100, Math.round((t.da_thu / h.tong_phi) * 100)) : 0;
  const tien = `
    <div class="data-table-wrapper" style="padding:16px">
      <div class="dh-block-head">
        <h3>Học phí &amp; công nợ</h3>
        <button class="btn btn-sm btn-primary" onclick="adminApp.dhFormThu()">
          <i class="fa-solid fa-plus"></i> Ghi khoản thu</button>
      </div>
      ${h.tong_phi > 0 ? `
        <div class="dh-tien-top">
          <div><span class="dh-sub">Tổng phí</span><b>${_tien(h.tong_phi)}</b></div>
          <div><span class="dh-sub">Đã thu</span><b style="color:#16A34A">${_tien(t.da_thu)}</b></div>
          <div><span class="dh-sub">Còn thiếu</span>
            <b style="color:${t.con_thieu ? '#8A4513' : '#16A34A'}">${_tien(t.con_thieu)}</b></div>
        </div>
        <div class="dh-bar"><i style="width:${pct}%"></i></div>`
      : `<p class="dh-sub" style="margin:0 0 12px">Chưa chốt tổng phí dịch vụ.
           Bấm <b>Sửa</b> ở khối thông tin để nhập, khi đó mới tính được công nợ.</p>`}
      ${tt.length ? `
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th>Ngày</th><th>Khoản</th><th style="text-align:right">Số tiền</th><th></th></tr></thead>
          <tbody>${tt.map((x) => `
            <tr>
              <td style="white-space:nowrap">${_dhNgay(x.ngay_thu)}
                <div class="dh-sub">${DH_HINH_THUC[x.hinh_thuc] || ''}${x.chung_tu ? ' · ' + esc(x.chung_tu) : ''}</div></td>
              <td>${DH_KHOAN[x.khoan] || 'Khác'}
                ${x.ghi_chu ? `<div class="dh-sub">${esc(x.ghi_chu)}</div>` : ''}
                ${x.nguoi_thu_ten ? `<div class="dh-sub">${esc(x.nguoi_thu_ten)}</div>` : ''}</td>
              <td style="text-align:right;white-space:nowrap;font-weight:700;color:${x.loai === 'hoan' ? '#DC2626' : '#16A34A'}">
                ${x.loai === 'hoan' ? '− ' : '+ '}${_tien(x.so_tien)}</td>
              <td style="white-space:nowrap">
                ${x.co_anh ? `<button class="btn-icon" title="Xem chứng từ" onclick="adminApp.dhXemAnh(${x.id})">
                  <i class="fa-solid fa-image"></i></button>` : ''}
                <button class="btn-icon" title="Xoá khoản này" onclick="adminApp.dhXoaThu(${x.id})">
                <i class="fa-solid fa-trash"></i></button></td>
            </tr>`).join('')}</tbody>
        </table>` : '<p class="dh-sub" style="margin:12px 0 0">Chưa có khoản thu nào.</p>'}
    </div>`;

  // --- Học tập (chỉ khi hồ sơ đã gắn tài khoản học) ---
  const ht = d.hoc_tap;
  const hocTap = `
    <div class="data-table-wrapper" style="padding:16px">
      <div class="dh-block-head"><h3>Việc học trên hệ thống</h3></div>
      ${ht && ht.user ? `
        <div class="dh-fields">
          ${o('Tài khoản', `${esc(ht.user.name)}<div class="dh-sub">${esc(ht.user.email)}</div>`)}
          ${o('Lớp', ht.lop.length ? ht.lop.map((l) => esc(l.name)).join(', ') : '<span class="dh-sub">chưa xếp lớp</span>')}
          ${o('Bài đã làm', `${ht.so_bai} bài${ht.diem_tb != null ? ` · TB ${ht.diem_tb}%` : ''}`)}
          ${o('Hoạt động gần nhất', _dhNgay(ht.user.last_active))}
        </div>
        <button class="btn btn-sm btn-outline" onclick="adminApp.dhBoHocVien()">Bỏ liên kết tài khoản</button>`
      : `<p class="dh-sub" style="margin:0 0 10px">Hồ sơ chưa gắn với tài khoản học nào.
           Gắn vào thì xem được luôn lớp, điểm danh và điểm bài tập của em ngay tại đây.</p>
         <div class="dh-link-hv">
           <input type="search" id="dh-hv-tim" placeholder="Gõ tên hoặc email học viên…"
                  oninput="adminApp.dhTimHocVien()">
           <div id="dh-hv-kq" class="dh-hv-kq"></div>
         </div>`}
    </div>`;

  // --- Nhật ký ---
  const ls = d.lich_su || [];
  const icLoai = { buoc: 'fa-arrow-right', tien: 'fa-money-bill', 'giay-to': 'fa-file', 'he-thong': 'fa-gear', 'ghi-chu': 'fa-comment' };
  const nhatKy = `
    <div class="data-table-wrapper" style="padding:16px">
      <div class="dh-block-head"><h3>Nhật ký chăm sóc</h3></div>
      <div class="dh-ghi">
        <input type="text" id="dh-ghi-chu" placeholder="Đã gọi nhắc em nộp bằng tốt nghiệp…"
               onkeydown="if(event.key==='Enter')adminApp.dhGhiChu()">
        <button class="btn btn-sm btn-primary" onclick="adminApp.dhGhiChu()">Ghi</button>
      </div>
      ${ls.length ? `<ul class="dh-ls">${ls.map((x) => `
        <li>
          <i class="fa-solid ${icLoai[x.loai] || 'fa-circle'}"></i>
          <div>
            <div>${esc(x.noi_dung || '')}</div>
            <div class="dh-sub">${new Date(x.created_at).toLocaleString('vi-VN')}${x.nguoi_ten ? ' · ' + esc(x.nguoi_ten) : ''}</div>
          </div>
        </li>`).join('')}</ul>` : '<p class="dh-sub">Chưa có ghi chú nào.</p>'}
    </div>`;

  el.innerHTML = `
    <div class="table-toolbar">
      <div>
        <button class="btn btn-sm btn-outline" onclick="adminApp.dhVeDanhSach()">← Danh sách</button>
        <h2 style="margin:8px 0 0">${esc(h.ho_ten)}
          <span class="dh-sub" style="font-weight:500">${esc(h.ma_hs)}</span></h2>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline" onclick="adminApp.dhFormHoSo(${h.id})"><i class="fa-solid fa-pen"></i> Sửa</button>
        <button class="btn btn-danger btn-sm" onclick="adminApp.dhXoaHoSo()"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    ${thanhBuoc}
    <div class="admin-cols-2">
      <div style="display:flex;flex-direction:column;gap:20px">${thongTin}${giayTo}</div>
      <div style="display:flex;flex-direction:column;gap:20px">${mocs}${tien}${hocTap}${nhatKy}</div>
    </div>`;
}

// ------------------------------------------------------------------ thao tác

async function dhChuyenBuoc(buoc) {
  if (!dhId || !dhChiTiet) return;
  if (dhChiTiet.ho_so.buoc === buoc) return;
  const ten = _dhBuoc(buoc).ten;
  try {
    const r = await apiPost(`/admin/du-hoc/ho-so/${dhId}/buoc`, { buoc });
    toast(r.message || `Đã chuyển sang "${ten}".`);
    renderDuHoc(document.getElementById('admin-content'));
  } catch (err) {
    toast(err.message || 'Không chuyển được bước.', 'error');
  }
}

function dhFormHoSo(id) {
  const sua = !!id;
  const h = sua && dhChiTiet && dhChiTiet.ho_so.id === id ? dhChiTiet.ho_so : {};
  const d = (v) => (v ? String(v).slice(0, 10) : '');
  const opt = (map, cur) => Object.entries(map)
    .map(([k, v]) => `<option value="${k}" ${cur === k ? 'selected' : ''}>${v}</option>`).join('');

  // Khối chọn tài khoản có sẵn chỉ hiện khi TẠO MỚI. Ở màn sửa, việc gắn/bỏ tài khoản đã có chỗ
  // riêng (khối "Việc học trên hệ thống") — để cả hai nơi cùng làm một việc thì hai nơi cùng phải
  // nhớ đồng bộ trạng thái, dễ lệch.
  const khoiChon = sua ? '' : `
    <div class="dh-pick">
      <div class="dh-pick-head">
        <i class="fa-solid fa-user-check"></i>
        <span><b>Học sinh đã có tài khoản học?</b> Chọn ở đây để lấy sẵn tên, email, điện thoại
          và gắn luôn hồ sơ với tài khoản đó. Không có thì bỏ qua, nhập tay bên dưới.</span>
      </div>
      <div id="dh-pick-chon" hidden></div>
      <input type="search" id="dh-pick-tim" placeholder="Gõ tên / email / số điện thoại, hoặc để trống xem 20 tài khoản mới nhất…"
             oninput="adminApp.dhPickTim()">
      <div id="dh-pick-kq" class="dh-hv-kq"></div>
    </div>`;

  openModal(sua ? 'Sửa hồ sơ' : 'Thêm hồ sơ du học', `
    ${khoiChon}
    <p class="dh-sub" style="margin:0 0 14px">Chỉ <b>họ tên</b> là bắt buộc — phần còn lại bổ sung dần
      khi học sinh nộp giấy tờ. Học sinh chưa có tài khoản trên hệ thống vẫn tạo hồ sơ được.</p>

    <div class="dh-form-sec">Cá nhân</div>
    <div class="form-group"><label>Họ tên <span style="color:#EF4444">*</span></label>
      <input type="text" id="f-dh-ho-ten" value="${_escAttr(h.ho_ten || '')}"></div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Ngày sinh</label>
        <input type="date" id="f-dh-ngay-sinh" value="${d(h.ngay_sinh)}"></div>
      <div class="form-group"><label>Giới tính</label>
        <select id="f-dh-gioi-tinh"><option value="">—</option>${opt({ nam: 'Nam', nu: 'Nữ', khac: 'Khác' }, h.gioi_tinh)}</select></div>
      <div class="form-group"><label>Mã hồ sơ</label>
        ${sua ? `<input type="text" value="${_escAttr(h.ma_hs || '')}" disabled>`
              : '<input type="text" id="f-dh-ma" placeholder="để trống = tự sinh HS-0001">'}</div>
    </div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Điện thoại</label>
        <input type="text" id="f-dh-phone" value="${_escAttr(h.phone || '')}"></div>
      <div class="form-group"><label>Email</label>
        <input type="email" id="f-dh-email" value="${_escAttr(h.email || '')}"></div>
      <div class="form-group"><label>Zalo / Facebook</label>
        <input type="text" id="f-dh-lien-lac" value="${_escAttr(h.lien_lac_khac || '')}"></div>
    </div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>CCCD</label>
        <input type="text" id="f-dh-cccd" value="${_escAttr(h.cccd || '')}"></div>
      <div class="form-group"><label>Số hộ chiếu</label>
        <input type="text" id="f-dh-ho-chieu" value="${_escAttr(h.ho_chieu || '')}"></div>
      <div class="form-group"><label>Hộ chiếu hết hạn</label>
        <input type="date" id="f-dh-hc-het-han" value="${d(h.ho_chieu_het_han)}"></div>
    </div>
    <div class="form-group"><label>Địa chỉ</label>
      <input type="text" id="f-dh-dia-chi" value="${_escAttr(h.dia_chi || '')}"></div>

    <div class="dh-form-sec">Người bảo lãnh</div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Họ tên</label>
        <input type="text" id="f-dh-ph-ten" value="${_escAttr(h.ph_ten || '')}"></div>
      <div class="form-group"><label>Điện thoại</label>
        <input type="text" id="f-dh-ph-phone" value="${_escAttr(h.ph_phone || '')}"></div>
      <div class="form-group"><label>Quan hệ</label>
        <input type="text" id="f-dh-ph-quan-he" value="${_escAttr(h.ph_quan_he || '')}" placeholder="Bố / Mẹ / Anh…"></div>
    </div>

    <div class="dh-form-sec">Học vấn &amp; nguyện vọng</div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Trường đã tốt nghiệp</label>
        <input type="text" id="f-dh-truong-tn" value="${_escAttr(h.truong_tn || '')}"></div>
      <div class="form-group"><label>Năm TN</label>
        <input type="text" id="f-dh-nam-tn" value="${_escAttr(h.nam_tn || '')}"></div>
      <div class="form-group"><label>Xếp loại</label>
        <input type="text" id="f-dh-xep-loai" value="${_escAttr(h.xep_loai || '')}"></div>
    </div>
    <div class="form-group"><label>Trình độ tiếng hiện có</label>
      <input type="text" id="f-dh-trinh-do" value="${_escAttr(h.trinh_do_tieng || '')}" placeholder="TOCFL A2 / HSK 3 / chưa có"></div>
    <div class="form-group"><label>Nguyện vọng 1</label>
      <input type="text" id="f-dh-nv1" value="${_escAttr(h.truong_nv1 || '')}"></div>
    <div class="form-row">
      <div class="form-group"><label>Nguyện vọng 2</label>
        <input type="text" id="f-dh-nv2" value="${_escAttr(h.truong_nv2 || '')}"></div>
      <div class="form-group"><label>Nguyện vọng 3</label>
        <input type="text" id="f-dh-nv3" value="${_escAttr(h.truong_nv3 || '')}"></div>
    </div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Ngành</label>
        <input type="text" id="f-dh-nganh" value="${_escAttr(h.nganh || '')}"></div>
      <div class="form-group"><label>Kỳ nhập học</label>
        <input type="text" id="f-dh-ky" value="${_escAttr(h.ky_nhap_hoc || '')}" placeholder="2027 Xuân"></div>
      <div class="form-group"><label>Loại hình</label>
        <select id="f-dh-loai-hinh"><option value="">—</option>${opt(DH_LOAI_HINH, h.loai_hinh)}</select></div>
    </div>

    <div class="dh-form-sec">Ký túc xá</div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Nguyện vọng của học sinh</label>
        <select id="f-dh-ktx-dk">${opt(DH_KTX_DK, h.ktx_dang_ky || 'chua-quyet')}</select></div>
      <div class="form-group"><label>Loại phòng mong muốn</label>
        <input type="text" id="f-dh-ktx-loai" value="${_escAttr(h.ktx_loai || '')}" placeholder="phòng 4 người"></div>
      <div class="form-group"><label>Hạn đăng ký của trường</label>
        <input type="date" id="f-dh-ktx-han" value="${d(h.ktx_han)}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Kết quả xếp phòng</label>
        <select id="f-dh-ktx-kq"><option value="">—</option>${opt(DH_KTX_KQ, h.ktx_kq)}</select></div>
      <div class="form-group"><label>Ghi chú chỗ ở của học sinh</label>
        <input type="text" id="f-dh-ktx-gc" value="${_escAttr(h.ktx_ghi_chu || '')}"></div>
    </div>

    <div class="dh-form-sec">Tiến độ &amp; vận hành</div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Ngày phỏng vấn</label>
        <input type="date" id="f-dh-ngay-pv" value="${d(h.ngay_phong_van)}"></div>
      <div class="form-group"><label>Kết quả phỏng vấn</label>
        <select id="f-dh-kq-pv"><option value="">—</option>${opt(DH_KET_QUA, h.kq_phong_van)}</select></div>
      <div class="form-group"><label>Trường đã đậu</label>
        <input type="text" id="f-dh-truong-do" value="${_escAttr(h.truong_do || '')}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Ngày nộp visa</label>
        <input type="date" id="f-dh-ngay-visa" value="${d(h.ngay_nop_visa)}"></div>
      <div class="form-group"><label>Kết quả visa</label>
        <select id="f-dh-kq-visa"><option value="">—</option>${opt(DH_KET_QUA, h.kq_visa)}</select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Ngày bay</label>
        <input type="date" id="f-dh-ngay-bay" value="${d(h.ngay_bay)}"></div>
      <div class="form-group"><label>Chuyến bay</label>
        <input type="text" id="f-dh-chuyen-bay" value="${_escAttr(h.chuyen_bay || '')}" placeholder="VN576 HAN-TPE 09:15"></div>
    </div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Tổng phí dịch vụ (₫)</label>
        <input type="number" id="f-dh-tong-phi" value="${h.tong_phi || ''}" placeholder="0"></div>
      <div class="form-group"><label>Tư vấn viên phụ trách</label>
        <select id="f-dh-tu-van"><option value="">—</option>
          ${dhNhanSu.map((n) => `<option value="${n.id}" ${h.tu_van_id === n.id ? 'selected' : ''}>${_escHtml(n.name)}</option>`).join('')}
        </select></div>
      <div class="form-group"><label>Nguồn khách</label>
        <input type="text" id="f-dh-nguon" value="${_escAttr(h.nguon || '')}" placeholder="Facebook / giới thiệu…"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Ngày nhận hồ sơ</label>
        <input type="date" id="f-dh-ngay-nhan" value="${d(h.ngay_nhan) || new Date().toISOString().slice(0, 10)}"></div>
    </div>
    <div class="form-group"><label>Ghi chú</label>
      <textarea id="f-dh-ghi-chu" rows="3">${esc(h.ghi_chu || '')}</textarea></div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.dhLuuHoSo(${id || 'null'})">
        <i class="fa-solid fa-floppy-disk"></i> ${sua ? 'Lưu' : 'Tạo hồ sơ'}</button>`);

  _dhPickChon = null;
  if (!sua) dhPickTim();   // nạp sẵn danh sách, khỏi phải gõ mới thấy có ai
}

// --- chọn học viên đã có tài khoản khi TẠO hồ sơ ---
let _dhPickChon = null;      // { id, name, email, phone } đang chọn
let _dhPickTimer = null;

function dhPickTim() {
  clearTimeout(_dhPickTimer);
  _dhPickTimer = setTimeout(async () => {
    const kq = document.getElementById('dh-pick-kq');
    if (!kq) return;
    kq.innerHTML = '<p class="dh-sub">Đang tìm…</p>';
    try {
      const r = await apiGet('/admin/du-hoc/hoc-vien?tim=' + encodeURIComponent(_dhVal('dh-pick-tim')));
      const ds = r.hoc_vien || [];
      kq.innerHTML = ds.length ? ds.map((u) => {
        // Đã có hồ sơ thì hiện mờ và KHÔNG bấm được — để bấm rồi mới báo lỗi là bắt người dùng
        // làm một việc thừa.
        const ban = !!u.ho_so_ma;
        return `<button class="dh-hv-item${ban ? ' is-ban' : ''}" ${ban ? 'disabled' : ''}
                  onclick="adminApp.dhPickChon(${u.id})">
            <b>${_escHtml(u.name)}</b>
            <span class="dh-sub">${_escHtml(u.email || '')}${u.phone ? ' · ' + _escHtml(u.phone) : ''}${
              ban ? ` — đã có hồ sơ ${_escHtml(u.ho_so_ma)}` : ''}</span>
          </button>`;
      }).join('') : '<p class="dh-sub">Không có tài khoản học viên nào khớp.</p>';
      window._dhPickDs = ds;
    } catch (err) {
      kq.innerHTML = `<p class="dh-sub">${_escHtml(err.message || 'Lỗi tìm kiếm.')}</p>`;
    }
  }, 250);
}

function dhPickChon(userId) {
  const u = (window._dhPickDs || []).find((x) => x.id === userId);
  if (!u) return;
  _dhPickChon = u;
  // Chỉ điền vào ô đang TRỐNG: người dùng có thể đã gõ tên đầy đủ có dấu trong khi tài khoản chỉ
  // là nickname — ghi đè cái họ vừa gõ là mất công của họ.
  const dat = (id, v) => { const e = document.getElementById(id); if (e && !e.value && v) e.value = v; };
  dat('f-dh-ho-ten', u.name);
  dat('f-dh-email', u.email);
  dat('f-dh-phone', u.phone);
  const box = document.getElementById('dh-pick-chon');
  if (box) {
    box.hidden = false;
    box.innerHTML = `<span><i class="fa-solid fa-link"></i> Sẽ gắn với tài khoản
      <b>${_escHtml(u.name)}</b> <span class="dh-sub">${_escHtml(u.email || '')}</span></span>
      <button type="button" class="btn btn-sm btn-outline" onclick="adminApp.dhPickBo()">Bỏ chọn</button>`;
  }
  const kq = document.getElementById('dh-pick-kq');
  if (kq) kq.innerHTML = '';
  const o = document.getElementById('dh-pick-tim');
  if (o) o.value = '';
}

function dhPickBo() {
  _dhPickChon = null;
  const box = document.getElementById('dh-pick-chon');
  if (box) { box.hidden = true; box.innerHTML = ''; }
  dhPickTim();
}

async function dhLuuHoSo(id) {
  const body = {
    ho_ten: _dhVal('f-dh-ho-ten'),
    ngay_sinh: _dhVal('f-dh-ngay-sinh'), gioi_tinh: _dhVal('f-dh-gioi-tinh'),
    phone: _dhVal('f-dh-phone'), email: _dhVal('f-dh-email'), lien_lac_khac: _dhVal('f-dh-lien-lac'),
    cccd: _dhVal('f-dh-cccd'), ho_chieu: _dhVal('f-dh-ho-chieu'), ho_chieu_het_han: _dhVal('f-dh-hc-het-han'),
    dia_chi: _dhVal('f-dh-dia-chi'),
    ph_ten: _dhVal('f-dh-ph-ten'), ph_phone: _dhVal('f-dh-ph-phone'), ph_quan_he: _dhVal('f-dh-ph-quan-he'),
    truong_tn: _dhVal('f-dh-truong-tn'), nam_tn: _dhVal('f-dh-nam-tn'), xep_loai: _dhVal('f-dh-xep-loai'),
    trinh_do_tieng: _dhVal('f-dh-trinh-do'),
    truong_nv1: _dhVal('f-dh-nv1'), truong_nv2: _dhVal('f-dh-nv2'), truong_nv3: _dhVal('f-dh-nv3'),
    nganh: _dhVal('f-dh-nganh'), ky_nhap_hoc: _dhVal('f-dh-ky'), loai_hinh: _dhVal('f-dh-loai-hinh'),
    ngay_phong_van: _dhVal('f-dh-ngay-pv'), kq_phong_van: _dhVal('f-dh-kq-pv'), truong_do: _dhVal('f-dh-truong-do'),
    ngay_nop_visa: _dhVal('f-dh-ngay-visa'), kq_visa: _dhVal('f-dh-kq-visa'),
    ngay_bay: _dhVal('f-dh-ngay-bay'), chuyen_bay: _dhVal('f-dh-chuyen-bay'),
    ktx_dang_ky: _dhVal('f-dh-ktx-dk'), ktx_loai: _dhVal('f-dh-ktx-loai'),
    ktx_ghi_chu: _dhVal('f-dh-ktx-gc'), ktx_kq: _dhVal('f-dh-ktx-kq'), ktx_han: _dhVal('f-dh-ktx-han'),
    tong_phi: _dhSo('f-dh-tong-phi'), tu_van_id: _dhVal('f-dh-tu-van'), nguon: _dhVal('f-dh-nguon'),
    ngay_nhan: _dhVal('f-dh-ngay-nhan'),
    ghi_chu: document.getElementById('f-dh-ghi-chu')?.value || '',
  };
  if (!body.ho_ten) return toast('Chưa nhập họ tên học sinh.', 'error');
  if (!id) {
    const ma = _dhVal('f-dh-ma');
    if (ma) body.ma_hs = ma;
    if (_dhPickChon) body.user_id = _dhPickChon.id;
  }
  try {
    if (id) {
      await apiPut(`/admin/du-hoc/ho-so/${id}`, body);
      toast('Đã lưu hồ sơ.');
      closeModal();
      renderDuHoc(document.getElementById('admin-content'));
    } else {
      const r = await apiPost('/admin/du-hoc/ho-so', body);
      toast(`Đã tạo hồ sơ ${r.ma_hs}.`);
      closeModal();
      dhMo(r.id);   // vào thẳng hồ sơ vừa tạo để làm tiếp checklist giấy tờ
    }
  } catch (err) {
    toast(err.message || 'Không lưu được hồ sơ.', 'error');
  }
}

function dhXoaHoSo() {
  if (!dhChiTiet) return;
  const h = dhChiTiet.ho_so;
  confirmDialog('Xoá hồ sơ',
    `Xoá <b>${esc(h.ho_ten)}</b> (${esc(h.ma_hs)}) sẽ mất luôn sổ thu tiền, checklist giấy tờ và nhật ký.
     Học sinh bỏ ngang thì nên chuyển bước sang <b>Huỷ / trượt</b> để còn giữ lịch sử và số tiền đã thu.`,
    async () => {
      try {
        await apiDel(`/admin/du-hoc/ho-so/${h.id}`);
        toast('Đã xoá hồ sơ.');
        dhVeDanhSach();
      } catch (err) { toast(err.message || 'Không xoá được.', 'error'); }
    });
}

// --- tiền ---
function dhFormThu() {
  openModal('Ghi khoản thu', `
    <div class="form-row">
      <div class="form-group"><label>Loại</label>
        <select id="f-tt-loai">
          <option value="thu">Thu tiền</option>
          <option value="hoan">Hoàn lại cho học sinh</option>
        </select></div>
      <div class="form-group"><label>Khoản</label>
        <select id="f-tt-khoan">
          ${Object.entries(DH_KHOAN).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
        </select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Số tiền (₫) <span style="color:#EF4444">*</span></label>
        <input type="number" id="f-tt-so-tien" placeholder="10000000"></div>
      <div class="form-group"><label>Ngày <span style="color:#EF4444">*</span></label>
        <input type="date" id="f-tt-ngay" value="${new Date().toISOString().slice(0, 10)}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Hình thức</label>
        <select id="f-tt-hinh-thuc">
          ${Object.entries(DH_HINH_THUC).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
        </select></div>
      <div class="form-group"><label>Số biên lai</label>
        <input type="text" id="f-tt-chung-tu" placeholder="BL001"></div>
    </div>
    <div class="form-group"><label>Ghi chú</label>
      <input type="text" id="f-tt-ghi-chu"></div>
    <div class="form-group"><label>Ảnh chứng từ (biên lai / ủy nhiệm chi)</label>
      <input type="file" id="f-tt-anh" accept="image/*" onchange="adminApp.dhChonAnh(this)">
      <div id="f-tt-anh-xem" class="dh-anh-xem"></div>
      <p class="dh-anh-note">Ảnh được nén ngay trên máy trước khi gửi — chọn ảnh to cỡ nào cũng được.</p></div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.dhLuuThu()">Ghi vào sổ</button>`);
  _dhAnhTam = null;
}

async function dhLuuThu() {
  const soTien = _dhSo('f-tt-so-tien');
  if (soTien <= 0) return toast('Số tiền phải lớn hơn 0.', 'error');
  try {
    const r = await apiPost(`/admin/du-hoc/ho-so/${dhId}/thu-tien`, {
      loai: _dhVal('f-tt-loai'), khoan: _dhVal('f-tt-khoan'), so_tien: soTien,
      ngay_thu: _dhVal('f-tt-ngay'), hinh_thuc: _dhVal('f-tt-hinh-thuc'),
      chung_tu: _dhVal('f-tt-chung-tu'), ghi_chu: _dhVal('f-tt-ghi-chu'),
      anh: _dhAnhTam || null,
    });
    toast(r.message || 'Đã ghi.');
    _dhAnhTam = null;
    closeModal();
    renderDuHoc(document.getElementById('admin-content'));
  } catch (err) {
    toast(err.message || 'Không ghi được khoản thu.', 'error');
  }
}

// ------------------------------------------------------------------ ảnh chứng từ
/** Ảnh vừa chọn (đã nén), chưa gửi lên server. */
let _dhAnhTam = null;

/**
 * Nén ảnh NGAY TRÊN MÁY trước khi gửi.
 *
 * Ảnh chụp biên lai bằng điện thoại thường 3-5 MB; gửi thẳng thì vừa chậm vừa đụng trần body của
 * server, mà lưu nguyên vào DB thì vài trăm hồ sơ là hết dung lượng. Hạ dần chất lượng cho tới
 * khi dưới ngưỡng thay vì chốt cứng một mức — ảnh chữ nhiều cần chất lượng cao hơn ảnh đơn giản,
 * cố định 0.8 thì hoặc thừa dung lượng hoặc mờ chữ.
 */
function dhNenAnh(file) {
  const NGUONG = 420_000;   // ~420KB base64, thấp hơn hẳn trần 900KB của server
  return new Promise((giai, tuChoi) => {
    const doc = new FileReader();
    doc.onerror = () => tuChoi(new Error('Không đọc được tệp ảnh.'));
    doc.onload = (ev) => {
      const img = new Image();
      img.onerror = () => tuChoi(new Error('Tệp này không phải ảnh hợp lệ.'));
      img.onload = () => {
        // 1600px: đủ đọc số tiền và nội dung trên biên lai A5 chụp bằng điện thoại.
        const MAX = 1600;
        const ty = Math.min(1, MAX / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * ty);
        c.height = Math.round(img.height * ty);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        let q = 0.85;
        let out = c.toDataURL('image/jpeg', q);
        while (out.length > NGUONG && q > 0.4) { q -= 0.1; out = c.toDataURL('image/jpeg', q); }
        giai(out);
      };
      img.src = ev.target.result;
    };
    doc.readAsDataURL(file);
  });
}

async function dhChonAnh(input) {
  const f = input.files?.[0];
  const xem = document.getElementById('f-tt-anh-xem');
  if (!f) { _dhAnhTam = null; if (xem) xem.innerHTML = ''; return; }
  if (xem) xem.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Đang nén ảnh…';
  try {
    _dhAnhTam = await dhNenAnh(f);
    const kb = Math.round(_dhAnhTam.length / 1024);
    if (xem) {
      xem.innerHTML = `<img src="${_dhAnhTam}" alt="Chứng từ">
        <span>Đã nén còn ~${kb} KB
          <button type="button" class="btn-link" onclick="adminApp.dhBoAnh()">Bỏ ảnh</button></span>`;
    }
  } catch (err) {
    _dhAnhTam = null;
    if (xem) xem.innerHTML = `<span class="dh-anh-loi">${esc(err.message)}</span>`;
  }
}

function dhBoAnh() {
  _dhAnhTam = null;
  const i = document.getElementById('f-tt-anh');
  if (i) i.value = '';
  const xem = document.getElementById('f-tt-anh-xem');
  if (xem) xem.innerHTML = '';
}

/** Xem ảnh chứng từ của một khoản thu — chỉ tải khi thật sự bấm xem. */
async function dhXemAnh(id) {
  try {
    const r = await apiGet(`/admin/du-hoc/thu-tien/${id}/anh`);
    openModal('Chứng từ', `<div class="dh-anh-to"><img src="${r.anh}" alt="Chứng từ"></div>`,
      `<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`);
  } catch (err) {
    toast(err.message || 'Không tải được ảnh.', 'error');
  }
}

function dhXoaThu(id) {
  confirmDialog('Xoá khoản thu', 'Xoá khoản này khỏi sổ? Công nợ sẽ được tính lại.', async () => {
    try {
      await apiDel(`/admin/du-hoc/thu-tien/${id}`);
      toast('Đã xoá.');
      renderDuHoc(document.getElementById('admin-content'));
    } catch (err) { toast(err.message || 'Không xoá được.', 'error'); }
  });
}

// --- giấy tờ ---
async function dhDoiGiayTo(id, trangThai) {
  try {
    await apiPut(`/admin/du-hoc/giay-to/${id}`, { trang_thai: trangThai });
    renderDuHoc(document.getElementById('admin-content'));
  } catch (err) {
    toast(err.message || 'Không cập nhật được.', 'error');
  }
}

function dhThemGiayTo() {
  openModal('Thêm giấy tờ', `
    <div class="form-group"><label>Tên giấy tờ <span style="color:#EF4444">*</span></label>
      <input type="text" id="f-gt-ten" placeholder="vd: Giấy xác nhận hạnh kiểm"></div>
    <div class="form-group">
      <label style="display:flex;align-items:center;gap:8px;font-weight:500">
        <input type="checkbox" id="f-gt-bat-buoc" checked style="width:auto"> Bắt buộc phải có
      </label>
      <span class="dh-sub">Giấy bắt buộc còn thiếu sẽ hiện cảnh báo ở danh sách hồ sơ.</span>
    </div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.dhLuuGiayTo()">Thêm</button>`);
}

async function dhLuuGiayTo() {
  const ten = _dhVal('f-gt-ten');
  if (!ten) return toast('Chưa nhập tên giấy tờ.', 'error');
  try {
    await apiPost(`/admin/du-hoc/ho-so/${dhId}/giay-to`, {
      ten, bat_buoc: document.getElementById('f-gt-bat-buoc')?.checked !== false,
    });
    toast('Đã thêm.');
    closeModal();
    renderDuHoc(document.getElementById('admin-content'));
  } catch (err) { toast(err.message || 'Không thêm được.', 'error'); }
}

function dhXoaGiayTo(id) {
  confirmDialog('Xoá mục giấy tờ', 'Xoá mục này khỏi checklist của hồ sơ?', async () => {
    try {
      await apiDel(`/admin/du-hoc/giay-to/${id}`);
      renderDuHoc(document.getElementById('admin-content'));
    } catch (err) { toast(err.message || 'Không xoá được.', 'error'); }
  });
}

// --- nhật ký ---
async function dhGhiChu() {
  const noiDung = _dhVal('dh-ghi-chu');
  if (!noiDung) return;
  try {
    await apiPost(`/admin/du-hoc/ho-so/${dhId}/ghi-chu`, { noi_dung: noiDung });
    renderDuHoc(document.getElementById('admin-content'));
  } catch (err) { toast(err.message || 'Không ghi được.', 'error'); }
}

// --- gắn tài khoản học ---
let _dhTimHvTimer = null;
function dhTimHocVien() {
  clearTimeout(_dhTimHvTimer);
  _dhTimHvTimer = setTimeout(async () => {
    const tim = _dhVal('dh-hv-tim');
    const kq = document.getElementById('dh-hv-kq');
    if (!kq) return;
    if (tim.length < 2) { kq.innerHTML = ''; return; }
    try {
      const r = await apiGet('/admin/du-hoc/hoc-vien?tim=' + encodeURIComponent(tim));
      kq.innerHTML = (r.hoc_vien || []).length
        ? r.hoc_vien.map((u) => `
            <button class="dh-hv-item" onclick="adminApp.dhGanHocVien(${u.id})">
              <b>${_escHtml(u.name)}</b><span class="dh-sub">${_escHtml(u.email)}</span></button>`).join('')
        : '<p class="dh-sub">Không tìm thấy học viên nào trong trung tâm.</p>';
    } catch (err) {
      kq.innerHTML = `<p class="dh-sub">${_escHtml(err.message || 'Lỗi tìm kiếm.')}</p>`;
    }
  }, 300);
}

async function dhGanHocVien(userId) {
  try {
    await apiPut(`/admin/du-hoc/ho-so/${dhId}`, { user_id: userId });
    toast('Đã gắn tài khoản học.');
    renderDuHoc(document.getElementById('admin-content'));
  } catch (err) { toast(err.message || 'Không gắn được.', 'error'); }
}

function dhBoHocVien() {
  confirmDialog('Bỏ liên kết', 'Hồ sơ sẽ không còn hiện thông tin học tập. Tài khoản học viên vẫn giữ nguyên.',
    async () => {
      try {
        await apiPut(`/admin/du-hoc/ho-so/${dhId}`, { user_id: '' });
        renderDuHoc(document.getElementById('admin-content'));
      } catch (err) { toast(err.message || 'Không bỏ được liên kết.', 'error'); }
    });
}

/** Nạp danh sách nhân sự một lần cho ô "tư vấn viên phụ trách" trong form. */
async function dhNapNhanSu() {
  if (dhNhanSu.length) return;
  try {
    const r = await apiGet('/admin/du-hoc/nhan-su');
    dhNhanSu = r.nhan_su || [];
  } catch (_) { dhNhanSu = []; }
}

// Nạp cầu nối cho module 3 khu trung tâm TRƯỚC khi gắn handler — module gọi các helper này
// ngay từ lần render đầu tiên.
dangKyTrungTam({ apiGet, apiPost, apiPut, apiDel, esc, toast, openModal, closeModal, confirmDialog, _tien });

window.adminApp = {
  // Ba khu vận hành trung tâm — quên dòng này là mọi nút trong đó im lặng không chạy (quy ước 4.4).
  ...quyHandlers, ...ktxHandlers, ...deHandlers,
  tbXem, tbGo, tbBoQua,
  // Hồ sơ du học
  dhMo, dhVeDanhSach, dhDoiBuocLoc, dhTim, dhDoiKy, dhXoaLoc, dhTrang,
  dhFormHoSo, dhLuuHoSo, dhXoaHoSo, dhChuyenBuoc,
  dhFormThu, dhLuuThu, dhXoaThu,
  // Chứng từ ảnh + yêu cầu sửa của học sinh (2026-09-16). Thiếu một tên ở đây thì nút bấm im
  // lặng không chạy, lỗi chỉ hiện ở console (quy ước 4.4).
  dhChonAnh, dhBoAnh, dhXemAnh,
  dhDuyetYc, dhTuChoiYc, dhTuChoiYcLuu,
  dhDoiGiayTo, dhThemGiayTo, dhLuuGiayTo, dhXoaGiayTo,
  dhGhiChu, dhTimHocVien, dhGanHocVien, dhBoHocVien,
  dhPickTim, dhPickChon, dhPickBo,
  login, logout, navigate, closeModal,
  // Vocabulary
  // Exam
  // Dialogues
  // Blog
  // Users
  openUserForm, saveUser, deleteUser, userSearchFn, userPageFn, approveUser, _doApprove,
  // Kinh doanh: trung tâm & quyền học (2026-09-09)
  // Quản lý giáo viên
  moGiaoVien, veDanhSachGiaoVien, moFormGiaoVien, luuGiaoVien, boVaiTroGiaoVien,
  moPhieuChamDiem, luuPhieuChamDiem, xoaPhieuChamDiem,
  themNhanXetGiaoVien, xoaNhanXetGiaoVien,
  // Quản lý lớp
  openClassForm, saveClass, deleteClass, openClassDetail, backToClassesList,
  openBulkAddForm, submitBulkAdd, removeStudentFromClass,
  goToSessions, backToClassDetail, openSessionForm, saveSession, deleteSession,
  openAttendance, saveAttendance, attSetStatus, attSetAll, attClearFlags, setSessionFilter,
  goToAssignments, openAssignmentForm, saveAssignment, deleteAssignment, viewAssignmentSubmissions,
  remindAssignment, viewTranslateSubmissions, openTranslateReview, saveTranslateReview,
  addStudentNote, deleteStudentNote,
  goToMistakes,
  openReportForm, exportClassReport,
  openStudentDetail, backToClassDetailFromStudent,
  viewExerciseDetail, viewPronExerciseDetail, openTextbookReviewModal, openTextbookExerciseDetail,
  submitExerciseReview, viewExamExerciseDetail, submitExamReview,
  jumpToAttendance, jumpToStudent,
  // Tổng quan quản trị: bảng chú thích nổi của biểu đồ thu-chi. Thiếu tên ở đây thì rê chuột
  // lên biểu đồ không hiện gì, lỗi chỉ nằm ở console (quy ước 4.4).
  tqTip,
  // Duyệt thanh toán (4.42)
  // Reorder
};

// Auto-check auth on load
checkAuth();

