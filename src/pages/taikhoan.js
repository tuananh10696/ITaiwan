// ============================================================
// TRANG: TÀI KHOẢN — 4 trang (4.42)
// ============================================================
// Thông tin cá nhân · Cài đặt · Thông báo · Gói thành viên.
//
// Module NẠP ĐỘNG (4.40). Hai trang đầu vốn nằm trong `main.js`; chuyển sang đây khi làm hai
// trang còn lại để `main.js` không vượt lại ngưỡng cảnh báo 500 KB (4.39).
//
// ⚠️ Phần TẢI ẢNH ĐẠI DIỆN vẫn ở `main.js`, KHÔNG chuyển sang đây: nó gắn với menu người dùng
//    trên thanh tiêu đề nên phải chạy được ở mọi trang. Nó tìm `.profile-avatar-wrap` khi
//    `state.currentPage === 'account-profile'` — giữ nguyên tên class đó khi sửa giao diện.
import { app } from '../core/app.js';
import { state, tkState } from '../core/state.js';
import { tdEsc, toast, twPlayEnter, openDialog, closeDialog, khungXuongTrang } from '../core/ui.js';
import api from '../api/client.js';
import { quenBaiBiKhoa } from '../data/giaotrinh-kho.js';

// --- cầu nối tới phần còn nằm trong main.js ---
const navigate = (...a) => app.navigate(...a);
const updateUrl = (...a) => app.updateUrl(...a);
const openAuth = (...a) => app.openAuth(...a);
const notifLessonName = (...a) => app.notifLessonName(...a);
const assignmentLabel = (...a) => app.assignmentLabel(...a);
const openAssignment = (...a) => app.openAssignment(...a);
const toggleCharMode = (...a) => app.toggleCharMode(...a);

// ------------------------------------------------------------------ tiện ích chung

/** Màn "cần đăng nhập" dùng chung cho cả 4 trang. */
function canDangNhap(el, viec) {
  el.innerHTML = `
    <div class="coming-soon">
      <div class="coming-soon-icon"><i class="fa-solid fa-lock"></i></div>
      <h2 class="coming-soon-title">Cần đăng nhập</h2>
      <p class="coming-soon-desc">Vui lòng đăng nhập để ${tdEsc(viec)}.</p>
      <button class="btn-primary" style="margin-top:8px" onclick="window.app.openAuth()">
        <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập
      </button>
    </div>`;
}

const tkTien = (n) => Number(n || 0).toLocaleString('vi-VN') + 'đ';

/** "3 phút trước" · "2 ngày trước" — cho danh sách thông báo và đơn hàng. */
function tkKhiNao(x) {
  if (!x) return '';
  const giay = Math.floor((Date.now() - new Date(x).getTime()) / 1000);
  if (giay < 60) return 'vừa xong';
  if (giay < 3600) return `${Math.floor(giay / 60)} phút trước`;
  if (giay < 86400) return `${Math.floor(giay / 3600)} giờ trước`;
  if (giay < 2592000) return `${Math.floor(giay / 86400)} ngày trước`;
  return new Date(x).toLocaleDateString('vi-VN');
}

const tkNgay = (x) => (x ? new Date(x).toLocaleString('vi-VN', {
  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
}) : '');

/**
 * Nén ảnh biên lai trước khi gửi.
 * Ảnh chụp màn hình điện thoại thường 2-4 MB — gửi thẳng thì vừa chậm vừa đụng trần body của
 * server. 1400px là đủ đọc số tiền và nội dung chuyển khoản trên biên lai, đó là tất cả những
 * gì người duyệt cần nhìn.
 */
function tkNenAnh(file) {
  return new Promise((giai, tuChoi) => {
    const doc = new FileReader();
    doc.onerror = () => tuChoi(new Error('Không đọc được tệp ảnh.'));
    doc.onload = (ev) => {
      const img = new Image();
      img.onerror = () => tuChoi(new Error('Tệp này không phải ảnh hợp lệ.'));
      img.onload = () => {
        const MAX = 1400;
        const ty = Math.min(1, MAX / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * ty);
        c.height = Math.round(img.height * ty);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        giai(c.toDataURL('image/jpeg', 0.8));
      };
      img.src = ev.target.result;
    };
    doc.readAsDataURL(file);
  });
}

// ============================================================
// 1. THÔNG TIN CÁ NHÂN
// ============================================================

async function renderAccountProfile(el) {
  if (!state.isLoggedIn) return canDangNhap(el, 'xem thông tin cá nhân');

  let stats;
  try {
    stats = await api.getProfileStats();
  } catch (err) {
    el.innerHTML = `<div class="coming-soon"><h2 class="coming-soon-title">Lỗi tải thông tin</h2><p class="coming-soon-desc">${tdEsc(err.message)}</p></div>`;
    return;
  }

  const u = stats.user;
  const anh = u.avatar_url
    ? `<img src="${tdEsc(u.avatar_url)}" alt="Ảnh đại diện">`
    : `<span class="avatar-letter">${tdEsc(u.avatar_letter)}</span>`;

  el.innerHTML = `
    <div class="account-profile-page">
      <div class="profile-card account-summary-card">
        <div class="profile-avatar-wrap" onclick="window.app.triggerAvatarUpload()"
             title="Đổi ảnh đại diện">
          ${anh}
          <div class="user-dd-avatar-overlay"><i class="fa-solid fa-camera"></i></div>
        </div>
        <div class="profile-name">${tdEsc(u.name)}</div>
        <div class="profile-subtitle">${tdEsc(u.email)}</div>
        <div class="stats-row">
          <div class="stat-box"><div class="stat-value">${u.points || 0}</div><div class="stat-label">Điểm</div></div>
          <div class="stat-box"><div class="stat-value">${u.streak || 0}</div><div class="stat-label">Chuỗi ngày</div></div>
          <div class="stat-box"><div class="stat-value">${stats.vocab?.total_learned || 0}</div><div class="stat-label">Từ đã học</div></div>
        </div>
      </div>

      <div class="account-card">
        <h3><i class="fa-solid fa-id-card"></i> Thông tin cá nhân</h3>
        <div class="form-group"><label class="form-label" for="acc-name">Họ tên</label>
          <input type="text" class="form-input" id="acc-name" value="${tdEsc(u.name)}"></div>
        <div class="form-group"><label class="form-label" for="acc-phone">Số điện thoại</label>
          <input type="tel" class="form-input" id="acc-phone" value="${tdEsc(u.phone || '')}"></div>
        <div class="form-group"><label class="form-label">Email</label>
          <input type="email" class="form-input" value="${tdEsc(u.email)}" disabled
                 title="Email đăng nhập không đổi được. Liên hệ quản trị viên nếu cần thay đổi."></div>
        <div class="auth-error" id="acc-info-err"></div>
        <div class="auth-success" id="acc-info-ok"></div>
        <button class="btn btn-accent" onclick="window.app.accountSaveInfo()">
          <i class="fa-solid fa-floppy-disk"></i> Lưu thay đổi
        </button>
      </div>

      <div class="account-card">
        <h3><i class="fa-solid fa-users-rectangle"></i> Lớp học của tôi</h3>
        <div id="tk-lop-hien" class="tk-lop-hien">
          <i class="fa-solid fa-circle-notch fa-spin"></i> Đang tải…
        </div>
        <div class="form-group" style="margin-top:14px">
          <label class="form-label" for="tk-ma-lop">Vào lớp bằng mã mời</label>
          <input type="text" class="form-input" id="tk-ma-lop" maxlength="20"
                 placeholder="Nhập mã giáo viên phát, ví dụ FC6D909E"
                 onkeydown="if(event.key==='Enter')window.app.tkVaoLop()">
          <p class="tk-ma-hint">Giáo viên hoặc trung tâm sẽ cho bạn mã này. Vào lớp rồi bạn sẽ
            nhận được bài cô giao và lời phê ngay trên tài khoản của mình.</p>
        </div>
        <div class="auth-error" id="tk-lop-err"></div>
        <div class="auth-success" id="tk-lop-ok"></div>
        <button class="btn btn-accent" onclick="window.app.tkVaoLop()">
          <i class="fa-solid fa-right-to-bracket"></i> Vào lớp
        </button>
      </div>

      <div id="tk-duhoc-slot"></div>

      <div class="account-card tk-lienket">
        <h3><i class="fa-solid fa-arrow-up-right-from-square"></i> Lối tắt</h3>
        <div class="tk-lienket-row">
          <button class="tk-lk" onclick="window.app.navigate('account-settings')">
            <i class="fa-solid fa-gear"></i><span>Cài đặt</span></button>
          <button class="tk-lk" onclick="window.app.navigate('path-progress')">
            <i class="fa-solid fa-chart-line"></i><span>Tiến độ học</span></button>
        </div>
      </div>
    </div>`;

  tkNapLop();
  tkNapTheDuHoc();
}

/**
 * Thẻ "Hồ sơ du học" — CHỈ hiện với học sinh đã được trung tâm mở hồ sơ.
 *
 * Nạp sau khi vẽ xong và nuốt mọi lỗi: đây là mục phụ của trang Thông tin cá nhân, hỏng nó
 * không được phép làm hỏng cả trang (người không du học thì endpoint trả `{ co: false }`, còn
 * chưa chạy migration thì trả kèm cờ — cả hai đều chỉ là "không hiện thẻ").
 */
async function tkNapTheDuHoc() {
  const slot = document.getElementById('tk-duhoc-slot');
  if (!slot) return;
  let d;
  try {
    d = await api.hoSoDuHocCuaToi();
  } catch (_) { return; }
  if (!d?.co || !document.getElementById('tk-duhoc-slot')) return;

  // Dùng lại luôn cho trang du học: vừa mở ra là có dữ liệu, khỏi chờ thêm một vòng mạng.
  tkState.dh = d;

  // Đếm việc cần làm — đây mới là thứ khiến em bấm vào, chứ không phải cái tên mục.
  const viec = [];
  if (!d.da_gui) viec.push('chưa gửi khai báo');
  const chuaDoc = (d.thong_bao || []).filter((t) => !t.da_doc_luc).length;
  if (chuaDoc) viec.push(`${chuaDoc} thông báo mới`);
  const thieu = (d.giay_to || []).filter((g) => g.bat_buoc && g.trang_thai === 'chua').length;
  if (thieu) viec.push(`thiếu ${thieu} giấy tờ`);
  if (d.tien?.tong_phi > 0 && d.tien?.con_lai > 0) viec.push(`còn ${Number(d.tien.con_lai).toLocaleString('vi-VN')}đ`);

  slot.outerHTML = `
    <div class="account-card tk-duhoc">
      <h3><i class="fa-solid fa-plane-departure"></i> Hồ sơ du học
        ${viec.length ? `<span class="tk-dh-badge">${viec.length}</span>` : ''}</h3>
      <div class="tk-dh-tom">
        <div><span>Mã hồ sơ</span><b>${tdEsc(d.ma_hs)}</b></div>
        <div><span>Giai đoạn</span><b>${tdEsc(d.tien_do?.buoc_ten || '—')}</b></div>
        <div><span>Đã đóng</span><b>${Number(d.tien?.da_thu || 0).toLocaleString('vi-VN')}đ</b></div>
      </div>
      ${viec.length ? `<p class="tk-dh-viec"><i class="fa-solid fa-circle-exclamation"></i>
        <span>Cần xử lý: ${tdEsc(viec.join(' · '))}</span></p>` : ''}
      <button class="btn btn-accent" onclick="window.app.navigate('account-duhoc')">
        <i class="fa-solid fa-arrow-right"></i> ${d.da_gui ? 'Xem hồ sơ du học' : 'Điền hồ sơ du học'}
      </button>
    </div>`;
}

/** Danh sách lớp đang học — nạp sau khi vẽ xong để không chặn cả trang vì một request. */
async function tkNapLop() {
  const box = document.getElementById('tk-lop-hien');
  if (!box) return;
  try {
    const d = await api.getMyClasses();
    const ds = d.classes || [];
    box.innerHTML = ds.length
      ? ds.map((c) => `<div class="tk-lop-item"><i class="fa-solid fa-graduation-cap"></i>
           <span><strong>${tdEsc(c.name)}</strong>${c.session_count ? ` · ${c.session_count} buổi` : ''}</span></div>`).join('')
      : '<div class="tk-lop-trong">Bạn chưa vào lớp nào. Có mã mời thì nhập ở dưới.</div>';
  } catch {
    box.innerHTML = '<div class="tk-lop-trong">Chưa tải được danh sách lớp.</div>';
  }
}

async function tkVaoLop() {
  const ip = document.getElementById('tk-ma-lop');
  const ma = (ip?.value || '').trim();
  if (!ma) { accountShowMsg('tk-lop-err', 'tk-lop-ok', true, 'Vui lòng nhập mã mời.'); return; }
  try {
    const d = await api.vaoLopBangMa(ma);
    accountShowMsg('tk-lop-err', 'tk-lop-ok', false, d.message);
    toast(d.message);
    if (ip) ip.value = '';
    tkNapLop();
    // Vào lớp của một trung tâm có thể vừa mở thêm quyền nội dung — bỏ đệm bài đã bị khoá,
    // nếu không học viên vẫn thấy tấm chắn mời mua cho tới khi tải lại trang (CLAUDE.md 4.41).
    quenBaiBiKhoa();
  } catch (err) {
    accountShowMsg('tk-lop-err', 'tk-lop-ok', true, err.message);
  }
}

function accountShowMsg(errId, okId, isError, text) {
  const e = document.getElementById(errId);
  const o = document.getElementById(okId);
  if (!e || !o) return;
  if (isError) { e.textContent = text; e.style.display = 'block'; o.style.display = 'none'; }
  else { o.textContent = text; o.style.display = 'block'; e.style.display = 'none'; }
}

async function accountSaveInfo() {
  const name = document.getElementById('acc-name').value.trim();
  const phone = document.getElementById('acc-phone').value.trim();
  if (!name) { accountShowMsg('acc-info-err', 'acc-info-ok', true, 'Vui lòng nhập họ tên.'); return; }
  try {
    const data = await api.updateProfile({ name, phone });
    state.user = { ...state.user, name: data.user.name, phone: data.user.phone, avatar: data.user.avatar_letter };
    accountShowMsg('acc-info-err', 'acc-info-ok', false, 'Đã lưu thông tin thành công!');
    toast('Đã lưu thông tin.');
  } catch (err) {
    accountShowMsg('acc-info-err', 'acc-info-ok', true, err.message);
  }
}

// ============================================================
// 2. CÀI ĐẶT
// ============================================================

function renderAccountSettings(el) {
  if (!state.isLoggedIn) return canDangNhap(el, 'xem phần cài đặt');

  const phon = state.charMode !== 'simplified';
  // Mặc định BẬT khi chưa biết (tài khoản cũ, hoặc DB chưa chạy migration) — khớp với DEFAULT TRUE
  // của cột; hiện "Tắt" trong khi thực tế đang bật là nói sai với người dùng.
  const nhacBat = state.user?.nhan_mail_nhac !== 0 && state.user?.nhan_mail_nhac !== false;
  el.innerHTML = `
    <div class="account-profile-page">
      <div class="account-card">
        <h3><i class="fa-solid fa-language"></i> Hiển thị chữ Hán</h3>
        <p class="tk-cai-mo">Chọn hệ chữ hiển thị mặc định trong toàn bộ bài học.</p>
        <div class="tk-doi">
          <button class="tk-doi-btn ${phon ? 'active' : ''}" onclick="window.app.tkDatChu('traditional')">
            <span class="font-tc">繁</span> Phồn thể</button>
          <button class="tk-doi-btn ${phon ? '' : 'active'}" onclick="window.app.tkDatChu('simplified')">
            <span class="font-tc">简</span> Giản thể</button>
        </div>
      </div>

      <div class="account-card">
        <h3><i class="fa-solid fa-bell"></i> Nhắc học qua email</h3>
        <p class="tk-cai-mo">Mỗi tối, nếu hôm đó bạn chưa học và đang có từ đến hạn ôn hoặc bài
          giáo viên giao, ITaiwan gửi một email nhắc. Không có việc gì thì không gửi.</p>
        <div class="tk-doi">
          <button class="tk-doi-btn ${nhacBat ? 'active' : ''}" onclick="window.app.tkDatNhac(true)">
            <i class="fa-solid fa-bell"></i> Bật</button>
          <button class="tk-doi-btn ${nhacBat ? '' : 'active'}" onclick="window.app.tkDatNhac(false)">
            <i class="fa-solid fa-bell-slash"></i> Tắt</button>
        </div>
      </div>

      <div class="account-card">
        <h3><i class="fa-solid fa-key"></i> Đổi mật khẩu</h3>
        <div class="form-group"><label class="form-label" for="acc-pw-current">Mật khẩu hiện tại</label>
          <input type="password" class="form-input" id="acc-pw-current" placeholder="••••••••" autocomplete="current-password"></div>
        <div class="form-group"><label class="form-label" for="acc-pw-new">Mật khẩu mới</label>
          <input type="password" class="form-input" id="acc-pw-new" placeholder="Tối thiểu 6 ký tự" minlength="6" autocomplete="new-password"></div>
        <div class="form-group"><label class="form-label" for="acc-pw-confirm">Nhập lại mật khẩu mới</label>
          <input type="password" class="form-input" id="acc-pw-confirm" placeholder="Tối thiểu 6 ký tự" minlength="6" autocomplete="new-password"></div>
        <div class="auth-error" id="acc-pw-err"></div>
        <div class="auth-success" id="acc-pw-ok"></div>
        <button class="btn btn-accent" onclick="window.app.accountChangePassword()">
          <i class="fa-solid fa-key"></i> Đổi mật khẩu
        </button>
      </div>

      <div class="account-card">
        <h3><i class="fa-solid fa-right-from-bracket"></i> Phiên đăng nhập</h3>
        <p class="tk-cai-mo">Đăng xuất khỏi thiết bị này. Sổ tay từ vựng đã đồng bộ vẫn còn nguyên trên tài khoản.</p>
        <button class="btn tk-btn-thoat" onclick="window.app.logout()">
          <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
        </button>
      </div>
    </div>`;
}

async function tkDatNhac(bat) {
  try {
    const r = await api.put('/profile/nhac-hoc', { bat });
    if (state.user) state.user.nhan_mail_nhac = bat ? 1 : 0;
    try { localStorage.setItem('tw_user', JSON.stringify(state.user)); } catch (_) {}
    toast(r.message || 'Đã lưu.');
    renderAccountSettings(document.getElementById('page-content'));
  } catch (e) {
    toast(e?.message || 'Không lưu được cài đặt.', 'error');
  }
}

/** Đi qua `toggleCharMode()` của main.js chứ KHÔNG tự gán `state.charMode`: hàm đó còn cập nhật
 *  nhãn 繁/简 trên thanh tiêu đề và vẽ lại trang. Tự gán thì hai nút cùng chức năng lại hiện hai
 *  trạng thái khác nhau (bài học 4.35). */
function tkDatChu(che) {
  const dangPhon = state.charMode !== 'simplified';
  if ((che === 'traditional') === dangPhon) return;   // đã đúng rồi, đừng lật ngược
  toggleCharMode();
}

async function accountChangePassword() {
  const current = document.getElementById('acc-pw-current').value;
  const next = document.getElementById('acc-pw-new').value;
  const lai = document.getElementById('acc-pw-confirm').value;

  if (!current || !next) { accountShowMsg('acc-pw-err', 'acc-pw-ok', true, 'Vui lòng nhập đầy đủ mật khẩu.'); return; }
  if (next.length < 6) { accountShowMsg('acc-pw-err', 'acc-pw-ok', true, 'Mật khẩu mới cần ít nhất 6 ký tự.'); return; }
  if (next !== lai) { accountShowMsg('acc-pw-err', 'acc-pw-ok', true, 'Mật khẩu nhập lại không khớp.'); return; }

  try {
    await api.changePassword(current, next);
    accountShowMsg('acc-pw-err', 'acc-pw-ok', false, 'Đổi mật khẩu thành công!');
    document.getElementById('acc-pw-current').value = '';
    document.getElementById('acc-pw-new').value = '';
    document.getElementById('acc-pw-confirm').value = '';
    toast('Đã đổi mật khẩu.');
  } catch (err) {
    accountShowMsg('acc-pw-err', 'acc-pw-ok', true, err.message);
  }
}

// ============================================================
// 3. THÔNG BÁO
// ============================================================
// Cùng nguồn dữ liệu với chuông ở thanh tiêu đề (`GET /api/exercise/notifications`), nhưng đây
// là bản ĐẦY ĐỦ có chỗ thở: chuông chỉ là dropdown hẹp, xem lại tin cũ rất khó.
//
// CỐ Ý gọi API mới mỗi lần mở thay vì đọc `notifState` của main.js: vào đây là để xem có gì mới,
// hiện lại danh sách đã nạp từ lúc đăng nhập thì sai mục đích.

const TB_NHAN = {
  all: 'Tất cả', unread: 'Chưa đọc', review: 'Bài đã chấm',
  assignment: 'Cô giao bài', payment: 'Thanh toán',
};

async function renderAccountNotifications(el) {
  if (!state.isLoggedIn) return canDangNhap(el, 'xem thông báo của bạn');

  el.innerHTML = `<div class="account-profile-page">
    <div class="tw-sk" style="height:56px;margin-bottom:14px"></div>
    ${'<div class="tw-sk" style="height:78px;margin-bottom:10px"></div>'.repeat(4)}
  </div>`;

  let ds = [];
  try {
    ds = (await api.getNotifications()).notifications || [];
  } catch (err) {
    el.innerHTML = `<div class="coming-soon">
      <div class="coming-soon-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <h2 class="coming-soon-title">Không tải được thông báo</h2>
      <p class="coming-soon-desc">${tdEsc(err.message || 'Lỗi kết nối.')}</p>
      <button class="btn-primary" style="margin-top:8px" onclick="window.app.navigate('account-notifications')">Thử lại</button>
    </div>`;
    return;
  }

  tkState.tbDs = ds;
  tkVeThongBao(el);
}

/** Vẽ lại danh sách từ `tkState.tbDs` — dùng cho cả lần đầu lẫn khi đổi bộ lọc. */
function tkVeThongBao(el) {
  const root = el || document.getElementById('page-content');
  if (!root) return;
  const ds = tkState.tbDs || [];
  const loc = tkState.tbLoc || 'all';

  const hop = (n) => {
    if (loc === 'all') return true;
    if (loc === 'unread') return !n.read_at;
    if (loc === 'review') return n.type === 'exercise' || n.type === 'exam';
    return n.type === loc;
  };
  const hien = ds.filter(hop);
  const chuaDoc = ds.filter((n) => !n.read_at).length;

  const tabs = Object.entries(TB_NHAN).map(([k, v]) => {
    const dem = k === 'all' ? ds.length : ds.filter((n) => (k === 'unread' ? !n.read_at
      : k === 'review' ? (n.type === 'exercise' || n.type === 'exam') : n.type === k)).length;
    return `<button class="tk-tb-tab ${loc === k ? 'active' : ''}" onclick="window.app.tkTbLoc('${k}')">
      ${v}${dem ? ` <span class="tk-tb-dem">${dem}</span>` : ''}</button>`;
  }).join('');

  root.innerHTML = `
    <div class="account-profile-page tk-tb-page">
      <div class="tk-tb-bar">
        <div class="tk-tb-tabs">${tabs}</div>
        ${chuaDoc ? `<button class="tk-tb-all" onclick="window.app.tkTbDocHet()">
          <i class="fa-solid fa-check-double"></i> Đánh dấu đã đọc</button>` : ''}
      </div>
      ${hien.length ? `<div class="tk-tb-list">${hien.map(tkTbItemHtml).join('')}</div>` : `
        <div class="coming-soon">
          <div class="coming-soon-icon"><i class="fa-regular fa-bell"></i></div>
          <h2 class="coming-soon-title">${loc === 'unread' ? 'Bạn đã đọc hết rồi' : 'Chưa có thông báo nào'}</h2>
          <p class="coming-soon-desc">${loc === 'unread'
            ? 'Không còn thông báo nào chưa đọc.'
            : 'Thông báo về bài cô chấm, bài được giao và đơn mua khoá học sẽ hiện ở đây.'}</p>
        </div>`}
    </div>`;
  twPlayEnter(root, 'tw-entering');
}

function tkTbItemHtml(n) {
  const chuaDoc = !n.read_at;
  let icon = 'fa-book-open'; let mau = '';
  let tieuDe = ''; let than = '';

  if (n.type === 'payment') {
    const ok = n.trang_thai === 'thanh-cong';
    icon = ok ? 'fa-circle-check' : 'fa-circle-exclamation';
    mau = ok ? 'is-pay-ok' : 'is-pay-no';
    tieuDe = ok ? `Đã mở khoá: ${n.san_pham_ten || 'khoá học'}`
                : `Đơn mua chưa được duyệt: ${n.san_pham_ten || 'khoá học'}`;
    than = ok
      ? `Đơn <b>${tdEsc(n.ma_giao_dich || '')}</b> đã được xác nhận. Bạn có thể vào học ngay.`
      : `Lý do: ${tdEsc(n.ghi_chu || 'không ghi rõ')}`;
  } else if (n.type === 'assignment') {
    icon = 'fa-clipboard-list'; mau = 'is-assign';
    tieuDe = `Cô giao bài: ${n.title || assignmentLabel(n)}`;
    than = [n.class_name ? `Lớp ${tdEsc(n.class_name)}` : '', n.note ? tdEsc(n.note) : '']
      .filter(Boolean).join(' · ');
  } else {
    icon = n.type === 'exam' ? 'fa-file-pen' : 'fa-book-open';
    mau = n.type === 'exam' ? 'is-exam' : '';
    tieuDe = notifLessonName(n);
    than = tdEsc(n.teacher_review || '');
  }

  const diem = (n.type === 'exercise' || n.type === 'exam') && n.score_percent != null
    ? `<span class="tk-tb-chip">${n.score_percent}%</span>` : '';
  const tien = n.type === 'payment' && n.so_tien ? `<span class="tk-tb-chip">${tkTien(n.so_tien)}</span>` : '';

  return `
    <button class="tk-tb-item ${chuaDoc ? 'unread' : ''}" onclick="window.app.tkTbMo('${n.type}', ${n.id})">
      <span class="tk-tb-ic ${mau}"><i class="fa-solid ${icon}"></i></span>
      <span class="tk-tb-body">
        <span class="tk-tb-title">${tdEsc(tieuDe)}${chuaDoc ? '<span class="tk-tb-cham"></span>' : ''}</span>
        ${than ? `<span class="tk-tb-desc">${than}</span>` : ''}
        <span class="tk-tb-meta">${diem}${tien}<span class="tk-tb-time">${tkKhiNao(n.created_at)}</span></span>
      </span>
    </button>`;
}

function tkTbLoc(k) { tkState.tbLoc = k; tkVeThongBao(); }

/** Bấm một thông báo — đi qua đúng `readNotification` của chuông, không tự viết luồng thứ hai. */
function tkTbMo(type, id) {
  const n = (tkState.tbDs || []).find((x) => x.type === type && Number(x.id) === Number(id));
  if (n && !n.read_at) n.read_at = new Date().toISOString();
  window.app.readNotification(type, id);
}

async function tkTbDocHet() {
  (tkState.tbDs || []).forEach((n) => { if (!n.read_at) n.read_at = new Date().toISOString(); });
  tkVeThongBao();
  try {
    await api.markAllNotificationsRead();
    toast('Đã đánh dấu tất cả là đã đọc.');
  } catch (err) {
    toast('Chưa đồng bộ được: ' + (err.message || 'lỗi mạng'));
  }
}



/** Đơn đang CHỜ của một sản phẩm — để thẻ hiện "đang chờ duyệt" thay vì mời mua lại. */
const tkDonCho = (ma) => (tkState.don || []).find((d) => d.product_ma === ma && d.trang_thai === 'cho');



// ------------------------------------------------------------------ đơn của tôi

const TT_NHAN = {
  cho: { t: 'Đang chờ', c: 'cho', i: 'fa-clock' },
  'thanh-cong': { t: 'Đã duyệt', c: 'ok', i: 'fa-circle-check' },
  'tu-choi': { t: 'Bị từ chối', c: 'no', i: 'fa-circle-xmark' },
  'that-bai': { t: 'Đã huỷ', c: 'huy', i: 'fa-ban' },
  hoan: { t: 'Đã hoàn tiền', c: 'huy', i: 'fa-rotate-left' },
};

// ============================================================
// Xuất cho khung app
// ============================================================


// ============================================================
// 5. HỒ SƠ DU HỌC  (2026-09-16)
// ============================================================
// Trang này CHỈ dành cho học sinh đã được trung tâm mở hồ sơ du học (`du_hoc_ho_so.user_id`).
// Không nằm trong menu — lối vào là thẻ ở trang Thông tin cá nhân và từ chuông thông báo.
//
// HAI TRẠNG THÁI, khác hẳn nhau:
//   · CHƯA GỬI  -> form điền tự do, tự lưu nháp, nút "Gửi cho trung tâm" (có cảnh báo khoá)
//   · ĐÃ GỬI    -> bảng chỉ đọc; muốn sửa thì mở form "Yêu cầu sửa" gửi cho trung tâm duyệt
//
// Vì sao khoá sau khi gửi: tư vấn viên đang làm hồ sơ mà dữ liệu đổi dưới tay là hỏng việc thật
// (đã in giấy tờ theo tên cũ, đã nộp trường theo nguyện vọng cũ).

/** Nhóm các ô trong form — thứ tự này cũng là thứ tự học sinh điền. */
const DH_NHOM = [
  { ten: 'Thông tin cá nhân', icon: 'fa-id-card',
    cot: ['ho_ten', 'ngay_sinh', 'gioi_tinh', 'cccd', 'ho_chieu', 'ho_chieu_het_han', 'phone', 'email', 'dia_chi', 'lien_lac_khac'] },
  { ten: 'Người bảo lãnh', icon: 'fa-user-shield',
    cot: ['ph_ten', 'ph_phone', 'ph_quan_he'] },
  { ten: 'Học vấn', icon: 'fa-graduation-cap',
    cot: ['truong_tn', 'nam_tn', 'xep_loai', 'trinh_do_tieng'] },
  { ten: 'Nguyện vọng', icon: 'fa-bullseye',
    cot: ['truong_nv1', 'truong_nv2', 'truong_nv3', 'nganh', 'ky_nhap_hoc', 'loai_hinh'] },
  { ten: 'Ký túc xá', icon: 'fa-bed',
    cot: ['ktx_dang_ky', 'ktx_loai', 'ktx_ghi_chu'] },
];

/** Ô nào là select, ô nào là ngày, ô nào nhập nhiều dòng. Còn lại là input text. */
const DH_CHON = {
  gioi_tinh: [['', '— chọn —'], ['nam', 'Nam'], ['nu', 'Nữ'], ['khac', 'Khác']],
  loai_hinh: [['', '— chọn —'], ['hoa-ngu', 'Học tiếng (Hoa ngữ)'], ['dai-hoc', 'Đại học'],
              ['cao-hoc', 'Cao học'], ['tien-si', 'Tiến sĩ'], ['khac', 'Khác']],
  ktx_dang_ky: [['chua-quyet', 'Chưa quyết định'], ['co', 'Có — tôi muốn ở ký túc xá'],
                ['khong', 'Không — tôi tự thuê ngoài']],
};
const DH_NGAY = new Set(['ngay_sinh', 'ho_chieu_het_han']);
const DH_NHIEU_DONG = new Set(['dia_chi', 'ktx_ghi_chu']);
/** Gợi ý cho những ô học sinh hay điền sai hoặc bỏ trống vì không biết ghi gì. */
const DH_GOI_Y = {
  ho_chieu: 'Chưa có hộ chiếu thì để trống, trung tâm sẽ hướng dẫn làm',
  ho_chieu_het_han: 'Phải còn hạn ít nhất 6 tháng khi xin visa',
  trinh_do_tieng: 'Ví dụ: TOCFL A2, HSK 3, hoặc "chưa học"',
  ky_nhap_hoc: 'Ví dụ: Kỳ Xuân 2027, hoặc 9/2027',
  ktx_loai: 'Ví dụ: phòng 4 người, phòng đôi…',
  lien_lac_khac: 'Zalo / LINE / Facebook để trung tâm liên lạc nhanh',
};

const DH_KQ = { cho: 'Đang chờ kết quả', dau: 'Đạt', truot: 'Chưa đạt' };
const DH_KTX_KQ = { cho: 'Đang chờ trường xếp', duoc: 'Đã được xếp phòng', 'khong-duoc': 'Chưa được xếp' };

const dhSo = (n) => Number(n || 0).toLocaleString('vi-VN') + 'đ';
function dhNgay(d) {
  if (!d) return '—';
  const x = new Date(d);
  return isNaN(x) ? '—' : x.toLocaleDateString('vi-VN');
}
/** Còn bao nhiêu ngày nữa. Trả null nếu không có ngày. */
function dhConNgay(d) {
  if (!d) return null;
  const x = new Date(d); if (isNaN(x)) return null;
  const h = new Date(); h.setHours(0, 0, 0, 0); x.setHours(0, 0, 0, 0);
  return Math.round((x - h) / 86400000);
}

async function renderAccountDuhoc(el) {
  if (!state.isLoggedIn) return canDangNhap(el, 'xem hồ sơ du học');

  // LUÔN nạp lại mỗi lần vào trang. Đây là trang theo dõi hồ sơ: trung tâm vừa duyệt yêu cầu sửa
  // hoặc vừa đặt lịch bay mà mở ra vẫn thấy số cũ là nói dối (cùng nguyên tắc với `ltNap` ở 4.38,
  // và `_tcCache` chỉ sống 30 giây ở 4.43).
  // Bản cũ trong `tkState.dh` vẫn dùng để VẼ NGAY — chỉ khi chưa có gì mới hiện khung xương, nhờ
  // vậy quay lại trang không nháy một nhịp.
  if (tkState.dh) dhVe(el); else el.innerHTML = khungXuongTrang();

  try {
    const moi = await api.hoSoDuHocCuaToi();
    // Trang có thể đã bị rời trong lúc chờ mạng — kiểm trước khi vẽ, nếu không sẽ ghi đè nội
    // dung của trang người dùng vừa mở (bẫy đã ghi ở 4.30).
    if (state.currentPage !== 'account-duhoc') { tkState.dh = moi; return; }
    tkState.dh = moi;
    tkState.dhNhap = {};
  } catch (e) {
    if (state.currentPage !== 'account-duhoc') return;
    if (tkState.dh) { toast('Không làm mới được hồ sơ — đang hiện bản đã tải trước đó.'); return; }
    el.innerHTML = `<div class="tc-loi"><i class="fa-solid fa-triangle-exclamation"></i>
      <span>Không tải được hồ sơ du học. ${tdEsc(e.message || '')}</span>
      <button class="btn btn-outline btn-sm" onclick="window.app.dhTaiLai()">Thử lại</button></div>`;
    return;
  }
  dhVe(el);
}

function dhVe(el) {
  const root = el || document.getElementById('page-content');
  if (!root) return;
  const d = tkState.dh;

  if (!d || !d.co) {
    root.innerHTML = `
      <div class="dh-hero"><h1><i class="fa-solid fa-plane-departure"></i> Hồ sơ du học</h1></div>
      <div class="account-card dh-empty">
        <i class="fa-solid fa-folder-open"></i>
        <h3>Bạn chưa có hồ sơ du học</h3>
        <p>${d?.chua_migration
          ? 'Chức năng đang được bật, bạn quay lại sau giúp nhé.'
          : 'Nếu bạn đang làm hồ sơ du học tại trung tâm, hãy báo tư vấn viên mở hồ sơ và gắn tài khoản này — sau đó bạn tự điền thông tin ngay tại đây.'}</p>
      </div>`;
    return;
  }

  root.innerHTML = `
    <div class="dh-hero">
      <h1><i class="fa-solid fa-plane-departure"></i> Hồ sơ du học</h1>
      <p>Mã hồ sơ <strong>${tdEsc(d.ma_hs)}</strong> · ${d.da_gui
        ? `đã gửi ngày ${dhNgay(d.gui_luc)}`
        : 'chưa gửi — bạn còn sửa được'}</p>
    </div>
    ${dhTienDoHtml(d)}
    ${dhThongBaoHtml(d)}
    ${dhYeuCauHtml(d)}
    ${d.da_gui ? dhXemHtml(d) : dhFormHtml(d)}
    <div class="dh-2cot">
      ${dhTienHtml(d)}
      ${dhGiayToHtml(d)}
    </div>
    ${dhTuVanHtml(d)}`;
}

// ------------------------------------------------------------ các khối chỉ xem

function dhTienDoHtml(d) {
  const t = d.tien_do;
  // Chỉ vẽ 6 bước đang chạy; 3 trạng thái kết thúc (đã bay/tạm dừng/huỷ) hiện thành chip riêng
  // vì chúng không nằm trên trục tiến độ.
  const chay = t.cac_buoc.filter((b) => !['hoan-thanh', 'tam-dung', 'huy'].includes(b.ma));
  const i = chay.findIndex((b) => b.ma === t.buoc);
  const ketThuc = i < 0;

  const moc = [];
  if (t.ngay_phong_van) moc.push(['Phỏng vấn', t.ngay_phong_van, t.kq_phong_van, 'fa-comments']);
  if (t.ngay_nop_visa) moc.push(['Nộp visa', t.ngay_nop_visa, t.kq_visa, 'fa-passport']);
  if (t.ngay_bay) moc.push(['Bay', t.ngay_bay, null, 'fa-plane-departure']);

  return `
    <div class="account-card">
      <h3><i class="fa-solid fa-list-check"></i> Tiến độ hồ sơ</h3>
      ${ketThuc
        ? `<div class="dh-ket-thuc"><i class="fa-solid fa-flag-checkered"></i> ${tdEsc(t.buoc_ten)}</div>`
        : `<div class="dh-steps">${chay.map((b, k) => `
            <div class="dh-step ${k < i ? 'xong' : k === i ? 'dang' : ''}">
              <span class="dh-step-ic"><i class="fa-solid ${b.icon}"></i></span>
              <span class="dh-step-ten">${tdEsc(b.ten)}</span>
            </div>`).join('')}</div>`}
      ${t.buoc_tu && !ketThuc ? `<p class="dh-note"><i class="fa-solid fa-clock"></i><span>Ở bước này từ ${dhNgay(t.buoc_tu)}</span></p>` : ''}
      ${moc.length ? `<div class="dh-moc">${moc.map(([ten, ngay, kq, ic]) => {
        const con = dhConNgay(ngay);
        return `<div class="dh-moc-i">
          <i class="fa-solid ${ic}"></i>
          <div><b>${ten}</b><div class="dh-sub">${dhNgay(ngay)}${
            con !== null && con >= 0 && con <= 30 ? ` · còn ${con === 0 ? 'hôm nay' : con + ' ngày'}` : ''}</div></div>
          ${kq ? `<span class="dh-chip ${kq === 'dau' ? 'ok' : kq === 'truot' ? 'no' : ''}">${DH_KQ[kq] || ''}</span>` : ''}
        </div>`;
      }).join('')}</div>` : ''}
      ${t.truong_do ? `<p class="dh-note"><i class="fa-solid fa-school"></i><span>Trường đã đỗ: <strong>${tdEsc(t.truong_do)}</strong></span></p>` : ''}
      ${t.chuyen_bay ? `<p class="dh-note"><i class="fa-solid fa-ticket"></i><span>Chuyến bay: <strong>${tdEsc(t.chuyen_bay)}</strong></span></p>` : ''}
      ${d.ktx.kq || d.ktx.han ? `<p class="dh-note"><i class="fa-solid fa-bed"></i><span>Ký túc xá: ${
        d.ktx.kq ? tdEsc(DH_KTX_KQ[d.ktx.kq] || d.ktx.kq) : 'chưa có kết quả'}${
        d.ktx.han ? ` · hạn đăng ký ${dhNgay(d.ktx.han)}` : ''}</span></p>` : ''}
    </div>`;
}

function dhThongBaoHtml(d) {
  const ds = (d.thong_bao || []).filter((t) => !t.da_doc_luc).slice(0, 5);
  if (!ds.length) return '';
  return `
    <div class="account-card dh-tb">
      <h3><i class="fa-solid fa-bell"></i> Thông báo mới</h3>
      ${ds.map((t) => `
        <div class="dh-tb-i" onclick="window.app.dhDocTb(${t.id})">
          <i class="fa-solid ${t.icon || 'fa-bell'}"></i>
          <div><b>${tdEsc(t.tieu_de)}</b>
            ${t.noi_dung ? `<div class="dh-sub">${tdEsc(t.noi_dung)}</div>` : ''}</div>
          ${t.ngay_lien_quan ? `<span class="dh-chip">${dhNgay(t.ngay_lien_quan)}</span>` : ''}
        </div>`).join('')}
    </div>`;
}

function dhYeuCauHtml(d) {
  const ds = d.yeu_cau_sua || [];
  if (!ds.length) return '';
  const cho = ds.filter((y) => y.trang_thai === 'cho');
  const xong = ds.filter((y) => y.trang_thai !== 'cho').slice(0, 2);
  if (!cho.length && !xong.length) return '';
  return `
    <div class="account-card">
      <h3><i class="fa-solid fa-pen-to-square"></i> Yêu cầu sửa hồ sơ</h3>
      ${[...cho, ...xong].map((y) => `
        <div class="dh-yc ${y.trang_thai}">
          <div class="dh-yc-top">
            <span class="dh-chip ${y.trang_thai === 'duyet' ? 'ok' : y.trang_thai === 'tu-choi' ? 'no' : ''}">${
              y.trang_thai === 'cho' ? 'Đang chờ trung tâm duyệt'
              : y.trang_thai === 'duyet' ? 'Đã duyệt' : 'Không được duyệt'}</span>
            <span class="dh-sub">${dhNgay(y.created_at)}</span>
          </div>
          <ul class="dh-yc-ds">${(y.thay_doi || []).map((t) => `
            <li>${tdEsc(t.nhan || t.cot)}: <s>${tdEsc(t.cu || '(trống)')}</s> → <strong>${tdEsc(t.moi || '(trống)')}</strong></li>`).join('')}</ul>
          ${y.phan_hoi ? `<p class="dh-note"><i class="fa-solid fa-comment-dots"></i><span>Trung tâm: ${tdEsc(y.phan_hoi)}</span></p>` : ''}
        </div>`).join('')}
    </div>`;
}

function dhTienHtml(d) {
  const t = d.tien;
  return `
    <div class="account-card">
      <h3><i class="fa-solid fa-money-bill-wave"></i> Chi phí</h3>
      <div class="dh-tien-tom">
        <div><span class="dh-sub">Tổng phí dịch vụ</span><b>${t.tong_phi ? dhSo(t.tong_phi) : 'Chưa chốt'}</b></div>
        <div><span class="dh-sub">Đã đóng</span><b class="ok">${dhSo(t.da_thu)}</b></div>
        ${t.tong_phi ? `<div><span class="dh-sub">Còn lại</span><b class="${t.con_lai > 0 ? 'no' : 'ok'}">${dhSo(t.con_lai)}</b></div>` : ''}
      </div>
      ${t.da_hoan > 0 ? `<p class="dh-note"><i class="fa-solid fa-rotate-left"></i><span>Đã hoàn lại: ${dhSo(t.da_hoan)}</span></p>` : ''}
      ${t.khoan.length ? `<table class="dh-bang">
          <thead><tr><th>Ngày</th><th>Khoản</th><th class="pha">Số tiền</th></tr></thead>
          <tbody>${t.khoan.map((k) => `<tr>
            <td>${dhNgay(k.ngay_thu)}</td>
            <td>${tdEsc(k.khoan_ten)}${k.loai === 'hoan' ? ' <span class="dh-chip no">hoàn</span>' : ''}${
              k.co_anh ? ' <i class="fa-solid fa-paperclip" title="Có chứng từ"></i>' : ''}</td>
            <td class="pha ${k.loai === 'hoan' ? 'no' : ''}">${k.loai === 'hoan' ? '−' : ''}${dhSo(k.so_tien)}</td>
          </tr>`).join('')}</tbody>
        </table>`
        : '<p class="dh-sub">Chưa có khoản nào được ghi nhận.</p>'}
      <p class="dh-note"><i class="fa-solid fa-circle-info"></i><span>Số liệu do trung tâm ghi nhận. Thấy chưa khớp thì báo tư vấn viên giúp nhé.</span></p>
    </div>`;
}

function dhGiayToHtml(d) {
  const ds = d.giay_to || [];
  const thieu = ds.filter((g) => g.bat_buoc && g.trang_thai === 'chua').length;
  return `
    <div class="account-card">
      <h3><i class="fa-solid fa-folder-open"></i> Giấy tờ
        ${thieu ? `<span class="dh-chip no">còn ${thieu}</span>` : '<span class="dh-chip ok">đủ</span>'}</h3>
      ${ds.length ? `<ul class="dh-gt">${ds.map((g) => `
        <li class="${g.trang_thai === 'chua' ? 'chua' : 'roi'}">
          <i class="fa-solid ${g.trang_thai === 'chua' ? 'fa-circle' : 'fa-circle-check'}"></i>
          <span>${tdEsc(g.ten)}${g.bat_buoc ? '' : ' <span class="dh-sub">(không bắt buộc)</span>'}</span>
          <span class="dh-sub">${tdEsc(g.trang_thai_ten)}</span>
        </li>`).join('')}</ul>` : '<p class="dh-sub">Trung tâm chưa lập danh sách giấy tờ.</p>'}
      ${thieu ? '<p class="dh-note"><i class="fa-solid fa-triangle-exclamation"></i><span>Mang các giấy tờ còn thiếu tới trung tâm để kịp tiến độ nhé.</span></p>' : ''}
    </div>`;
}

function dhTuVanHtml(d) {
  if (!d.tu_van) return '';
  return `
    <div class="account-card dh-tv">
      <h3><i class="fa-solid fa-user-tie"></i> Người tư vấn của bạn</h3>
      <div class="dh-tv-i">
        <div class="dh-tv-av">${tdEsc((d.tu_van.name || '?').trim().charAt(0).toUpperCase())}</div>
        <div>
          <b>${tdEsc(d.tu_van.name || '')}</b>
          <div class="dh-sub">${[d.tu_van.phone, d.tu_van.email].filter(Boolean).map(tdEsc).join(' · ') || 'Chưa có thông tin liên hệ'}</div>
        </div>
        ${d.tu_van.phone ? `<a class="btn btn-outline btn-sm" href="tel:${tdEsc(d.tu_van.phone)}"><i class="fa-solid fa-phone"></i> Gọi</a>` : ''}
      </div>
    </div>`;
}

// ------------------------------------------------------------ form khai báo

/** Giá trị đang hiển thị của một ô: ưu tiên cái người dùng vừa gõ, rồi mới tới dữ liệu server. */
const dhGt = (c) => (c in tkState.dhNhap ? tkState.dhNhap[c] : (tkState.dh?.khai?.[c] ?? '')) ?? '';

function dhOHtml(c, nhan, batBuoc, khoa = false) {
  const v = dhGt(c);
  const id = `dh-${c}`;
  const goiY = DH_GOI_Y[c] ? `<div class="dh-goi-y">${tdEsc(DH_GOI_Y[c])}</div>` : '';
  const chung = `id="${id}" ${khoa ? 'disabled' : `oninput="window.app.dhGo('${c}', this.value)" onchange="window.app.dhGo('${c}', this.value)"`}`;

  let o;
  if (DH_CHON[c]) {
    o = `<select ${chung}>${DH_CHON[c].map(([g, t]) =>
      `<option value="${g}"${String(v) === g ? ' selected' : ''}>${tdEsc(t)}</option>`).join('')}</select>`;
  } else if (DH_NHIEU_DONG.has(c)) {
    o = `<textarea rows="2" ${chung}>${tdEsc(v)}</textarea>`;
  } else {
    o = `<input type="${DH_NGAY.has(c) ? 'date' : c === 'email' ? 'email' : c.includes('phone') ? 'tel' : 'text'}"
           value="${tdEsc(v)}" ${chung}>`;
  }
  return `<div class="dh-o ${DH_NHIEU_DONG.has(c) ? 'rong' : ''}">
    <label for="${id}">${tdEsc(nhan)}${batBuoc ? ' <span class="dh-sao">*</span>' : ''}</label>
    ${o}${goiY}</div>`;
}

function dhFormHtml(d) {
  const bb = new Set(d.bat_buoc || []);
  return `
    <div class="account-card">
      <h3><i class="fa-solid fa-pen-to-square"></i> Khai thông tin hồ sơ</h3>
      <p class="dh-note canh"><i class="fa-solid fa-circle-info"></i><span>
        Bạn tự lưu nháp thoải mái. <strong>Chỉ khi bấm “Gửi cho trung tâm” hồ sơ mới bị khoá</strong>
        — lúc đó muốn sửa phải gửi yêu cầu và đợi trung tâm duyệt.</span></p>

      ${DH_NHOM.map((n) => `
        <section class="dh-nhom">
          <h3><i class="fa-solid ${n.icon}"></i> ${tdEsc(n.ten)}</h3>
          <div class="dh-luoi">${n.cot.map((c) => dhOHtml(c, d.nhan_cot[c] || c, bb.has(c))).join('')}</div>
        </section>`).join('')}

      <div id="dh-msg"></div>
      <div class="dh-nut">
        <button class="btn btn-outline" onclick="window.app.dhLuuNhap()" ${tkState.dhDangLuu ? 'disabled' : ''}>
          <i class="fa-solid fa-floppy-disk"></i> Lưu nháp</button>
        <button class="btn btn-primary" onclick="window.app.dhGui()" ${tkState.dhDangLuu ? 'disabled' : ''}>
          <i class="fa-solid fa-paper-plane"></i> Gửi cho trung tâm</button>
      </div>
    </div>`;
}

/** Hồ sơ đã chốt: bảng chỉ đọc + lối mở form yêu cầu sửa. */
function dhXemHtml(d) {
  const hien = (c) => {
    const v = d.khai[c];
    if (v === null || v === undefined || v === '') return '—';
    if (DH_NGAY.has(c)) return dhNgay(v);
    const chon = DH_CHON[c]?.find(([g]) => g === String(v));
    return chon ? chon[1] : String(v);
  };
  return `
    <div class="account-card">
      <h3><i class="fa-solid fa-lock"></i> Thông tin đã gửi</h3>
      <p class="dh-note"><i class="fa-solid fa-circle-check"></i><span>
        Bạn đã gửi hồ sơ ngày ${dhNgay(d.gui_luc)}. Thông tin dưới đây đang được trung tâm dùng để làm hồ sơ.</span></p>

      ${DH_NHOM.map((n) => `
        <section class="dh-nhom">
          <h3><i class="fa-solid ${n.icon}"></i> ${tdEsc(n.ten)}</h3>
          <dl class="dh-dl">${n.cot.map((c) => `
            <div><dt>${tdEsc(d.nhan_cot[c] || c)}</dt><dd>${tdEsc(hien(c))}</dd></div>`).join('')}</dl>
        </section>`).join('')}

      ${tkState.dhSua ? dhFormSuaHtml(d) : `
        <div class="dh-nut">
          <button class="btn btn-outline" onclick="window.app.dhMoSua()">
            <i class="fa-solid fa-pen"></i> Yêu cầu sửa thông tin</button>
        </div>`}
    </div>`;
}

function dhFormSuaHtml(d) {
  const dangCho = (d.yeu_cau_sua || []).some((y) => y.trang_thai === 'cho');
  if (dangCho) {
    return `<p class="dh-note canh"><i class="fa-solid fa-hourglass-half"></i><span>
      Bạn đang có một yêu cầu chờ duyệt. Đợi trung tâm xử lý xong rồi gửi tiếp nhé.</span></p>`;
  }
  return `
    <div class="dh-sua">
      <h3><i class="fa-solid fa-pen"></i> Yêu cầu sửa</h3>
      <p class="dh-sub">Sửa những ô cần đổi rồi ghi lý do. Trung tâm duyệt xong thì hồ sơ mới thay đổi.</p>
      ${DH_NHOM.map((n) => `
        <div class="dh-luoi">${n.cot.map((c) => dhOHtml(c, d.nhan_cot[c] || c, false)).join('')}</div>`).join('')}
      <div class="dh-o rong">
        <label for="dh-ly-do">Lý do cần sửa <span class="dh-sao">*</span></label>
        <textarea id="dh-ly-do" rows="2" placeholder="Ví dụ: em vừa đổi số điện thoại"></textarea>
      </div>
      <div id="dh-msg"></div>
      <div class="dh-nut">
        <button class="btn btn-outline" onclick="window.app.dhDongSua()">Huỷ</button>
        <button class="btn btn-primary" onclick="window.app.dhGuiSua()" ${tkState.dhDangLuu ? 'disabled' : ''}>
          <i class="fa-solid fa-paper-plane"></i> Gửi yêu cầu</button>
      </div>
    </div>`;
}

// ------------------------------------------------------------ handler

/**
 * Ghi giá trị đang gõ vào state — KHÔNG vẽ lại.
 *
 * Vẽ lại giữa lúc gõ là mất con trỏ và mất cả bộ gõ tiếng Việt đang mở dở (cùng lý do
 * `_ddTrItemHtml` phải ở cấp module ở 4.22b, và `hskExamViet` chỉ ghi state ở 4.34d).
 */
function dhGo(cot, giaTri) { tkState.dhNhap[cot] = giaTri; }

function dhMsg(loi, ok) {
  const el = document.getElementById('dh-msg');
  if (!el) return;
  el.innerHTML = loi
    ? `<div class="dh-msg no"><i class="fa-solid fa-circle-exclamation"></i><span>${tdEsc(loi)}</span></div>`
    : ok ? `<div class="dh-msg ok"><i class="fa-solid fa-circle-check"></i><span>${tdEsc(ok)}</span></div>` : '';
}

async function dhTaiLai() {
  tkState.dh = null; tkState.dhNhap = {}; tkState.dhSua = false;
  await renderAccountDuhoc(document.getElementById('page-content'));
}

async function dhLuuNhap(im = false) {
  if (tkState.dhDangLuu) return false;
  if (!Object.keys(tkState.dhNhap).length) { if (!im) dhMsg(null, 'Không có thay đổi nào để lưu.'); return true; }
  tkState.dhDangLuu = true;
  try {
    await api.luuKhaiBaoDuHoc(tkState.dhNhap);
    // Ghi phần vừa lưu vào bản chụp để "đã lưu" và "đang gõ" không lệch nhau.
    Object.assign(tkState.dh.khai, tkState.dhNhap);
    tkState.dhNhap = {};
    if (!im) dhMsg(null, 'Đã lưu nháp.');
    return true;
  } catch (e) {
    dhMsg(e.message || 'Không lưu được.');
    return false;
  } finally {
    tkState.dhDangLuu = false;
  }
}

async function dhGui() {
  if (tkState.dhDangLuu) return;
  const d = tkState.dh;
  // Kiểm ô bắt buộc NGAY TRÊN MÁY trước khi hỏi xác nhận — hỏi "chắc chưa?" rồi mới báo thiếu
  // ô là bắt người ta đọc cảnh báo hai lần cho một việc chưa làm được.
  const thieu = (d.bat_buoc || []).filter((c) => !String(dhGt(c) ?? '').trim());
  if (thieu.length) {
    dhMsg(`Còn thiếu: ${thieu.map((c) => d.nhan_cot[c] || c).join(', ')}.`);
    document.getElementById(`dh-${thieu[0]}`)?.focus();
    return;
  }

  const oke = window.confirm(
    'GỬI HỒ SƠ CHO TRUNG TÂM?\n\n'
    + 'Hãy kiểm tra thật kỹ — nhất là họ tên, ngày sinh, số hộ chiếu và nguyện vọng trường.\n\n'
    + 'Sau khi gửi, bạn KHÔNG sửa trực tiếp được nữa. Muốn sửa phải gửi yêu cầu và đợi trung tâm duyệt.'
  );
  if (!oke) return;

  tkState.dhDangLuu = true;
  try {
    // Gửi kèm phần đang gõ dở: server lưu nốt rồi mới chốt, nếu không ô vừa gõ mà chưa lưu sẽ
    // mất và học sinh không sửa lại được nữa (đúng cái mình vừa cảnh báo họ).
    await api.guiKhaiBaoDuHoc(tkState.dhNhap);
    toast('Đã gửi hồ sơ cho trung tâm.');
    await dhTaiLai();
  } catch (e) {
    dhMsg(e.message || 'Không gửi được hồ sơ.');
  } finally {
    tkState.dhDangLuu = false;
  }
}

function dhMoSua() { tkState.dhSua = true; tkState.dhNhap = {}; dhVe(); }
function dhDongSua() { tkState.dhSua = false; tkState.dhNhap = {}; dhVe(); }

async function dhGuiSua() {
  if (tkState.dhDangLuu) return;
  const lyDo = (document.getElementById('dh-ly-do')?.value || '').trim();
  const doi = {};
  for (const [c, v] of Object.entries(tkState.dhNhap)) {
    const cu = tkState.dh.khai[c];
    if (String(cu ?? '') !== String(v ?? '')) doi[c] = v;
  }
  if (!Object.keys(doi).length) { dhMsg('Bạn chưa sửa ô nào so với hồ sơ hiện tại.'); return; }
  if (!lyDo) { dhMsg('Ghi giúp lý do cần sửa để trung tâm duyệt nhanh hơn.'); document.getElementById('dh-ly-do')?.focus(); return; }

  tkState.dhDangLuu = true;
  try {
    await api.guiYeuCauSuaDuHoc(doi, lyDo);
    toast('Đã gửi yêu cầu sửa.');
    tkState.dhSua = false;
    await dhTaiLai();
  } catch (e) {
    dhMsg(e.message || 'Không gửi được yêu cầu.');
  } finally {
    tkState.dhDangLuu = false;
  }
}

async function dhDocTb(id) {
  const t = (tkState.dh?.thong_bao || []).find((x) => Number(x.id) === Number(id));
  if (t) { t.da_doc_luc = new Date().toISOString(); dhVe(); }
  try { await api.docThongBaoDuHoc(id); } catch (e) { console.warn('Không đánh dấu đọc được:', e.message || e); }
}

export const render = {
  'account-profile': renderAccountProfile,
  'account-settings': renderAccountSettings,
  'account-notifications': renderAccountNotifications,
  'account-duhoc': renderAccountDuhoc,
};

export const handlers = {
  accountSaveInfo, accountChangePassword, tkDatChu, tkVaoLop,
  tkDatNhac,
  tkTbLoc, tkTbMo, tkTbDocHet,
  // Hồ sơ du học (2026-09-16). Thiếu một tên ở đây thì nút bấm im lặng không chạy — lỗi chỉ
  // hiện ở console (quy ước 4.4).
  dhGo, dhLuuNhap, dhGui, dhTaiLai, dhMoSua, dhDongSua, dhGuiSua, dhDocTb,
};
