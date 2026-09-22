// ============================================================
// LỚP NATIVE — chỉ chạy bên trong app iOS/Android (Capacitor)
// ============================================================
//
// VÌ SAO MODULE NÀY TỒN TẠI, ngoài lý do kỹ thuật:
// Apple App Review Guideline 4.2 ("Minimum Functionality") từ chối những app chỉ là một khung
// trình duyệt bọc quanh website — "your app should include features, content, and UI that
// elevate it beyond a repackaged website". Nên app phải làm được những việc mà bản web không
// làm được: học offline, rung phản hồi khi chấm bài, chia sẻ qua khay hệ thống, nút Back của
// Android đi đúng lịch sử điều hướng, tạm dừng audio khi ứng dụng vào nền, mở link ngoài trong
// trình duyệt trong ứng dụng. Đó là danh sách việc của file này.
//
// KHÔNG import file này ở nhánh web: nó được `init()` nạp ĐỘNG và chỉ khi `laNative()` đúng,
// nên bundle web không phải mang theo một byte nào của Capacitor.

import { laIOS, laAndroid, nenTang } from '../utils/env.js';

let _daKhoiTao = false;
let _dangOnline = true;

/**
 * Plugin này có mặt trên nền tảng đang chạy không?
 *
 * Không phải câu hỏi thừa: Capacitor vẫn nạp được mã JavaScript của plugin ngay cả khi phần
 * native tương ứng chưa được nhúng vào bản dựng, rồi mới ném "… plugin is not implemented"
 * lúc gọi hàm đầu tiên. Lỗi đó là một Promise bị từ chối mà không ai bắt, nên nó thoát ra
 * ngoài mọi try/catch bọc quanh `await` — bắt được lúc kiểm thử đúng vì cách này.
 * Hỏi trước thì không bao giờ chạm tới nhánh đó.
 */
function coPlugin(ten) {
  try { return !!globalThis.Capacitor?.isPluginAvailable?.(ten); } catch { return false; }
}

// ------------------------------------------------------------
// RUNG PHẢN HỒI (Haptics)
// ------------------------------------------------------------
// Gắn bằng event delegation + MutationObserver nên KHÔNG phải sửa 9.400 dòng main.js. Đổi lại,
// nó bám vào tên class của giao diện — đó là đánh đổi có chủ ý: thêm một dạng bài mới mà quên
// khai class ở đây thì chỉ mất phần rung, không có gì hỏng.

let Haptics = null, ImpactStyle = null, NotificationType = null;

/**
 * Nạp plugin rung. Trả về BOOLEAN, tuyệt đối không trả về chính đối tượng plugin.
 *
 * ⚠️ Capacitor bọc mỗi plugin trong một Proxy trả về hàm cho MỌI tên thuộc tính được hỏi — kể
 * cả `then`. Nên `await <đối tượng plugin>` làm JavaScript tưởng đó là một Promise và gọi
 * `plugin.then(...)`, tức Capacitor đi tìm một phương thức native tên "then" và ném
 * `"Haptics.then()" is not implemented on android`.
 *
 * Bản đầu viết `if (await napHaptics())` với hàm trả về `Haptics`, nên MỖI LẦN CHẠM vào màn
 * hình lại ném một lỗi vào console. Không làm hỏng gì (đã bọc try/catch) nhưng lấp đầy log
 * bằng tiếng ồn, che mất lỗi thật — và đó chính là thứ làm việc chẩn đoán mất thời gian.
 */
async function napHaptics() {
  if (Haptics) return true;
  if (!coPlugin('Haptics')) return false;
  const m = await import('@capacitor/haptics');
  Haptics = m.Haptics; ImpactStyle = m.ImpactStyle; NotificationType = m.NotificationType;
  return true;
}

/** Rung nhẹ — mỗi lần chạm vào thứ bấm được. */
export async function rungNhe() {
  try { if (await napHaptics()) await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
}
/** Rung xác nhận — trả lời ĐÚNG. */
export async function rungDung() {
  try { if (await napHaptics()) await Haptics.notification({ type: NotificationType.Success }); } catch {}
}
/** Rung báo lỗi — trả lời SAI. */
export async function rungSai() {
  try { if (await napHaptics()) await Haptics.notification({ type: NotificationType.Error }); } catch {}
}

// Phần tử bấm được có rung nhẹ. Danh sách bám theo class thật đang dùng trong app.
const CHAM_RUNG = [
  'button', '.nav-item', '.nav-child', '.nav-book', '.lesson-tab', '.dd-tab-btn',
  '.quiz-option', '.dd-ex-opt', '.opt', '.wp-bubble', '.bee-slot', '.bee-char',
  '.pron-card-head', '.pron-speedpick button', '.tone-card-play', '.py-cell',
  '.dd-onllang-opt', '.dd-tone-combo', '.dd-match-ans', '.flashcard', '.roadmap-card',
].join(',');

function ganRungKhiCham() {
  document.addEventListener('pointerdown', (e) => {
    const el = e.target?.closest?.(CHAM_RUNG);
    if (el && !el.disabled) rungNhe();
  }, { passive: true, capture: true });
}

// Chấm bài đúng/sai: các renderer gắn class trạng thái vào DOM sau khi chấm. Quan sát thay đổi
// class trong vùng nội dung là bắt được, không phải móc vào từng hàm chấm điểm.
const CLASS_DUNG = ['correct', 'is-correct', 'dung', 'is-dung', 'wp-hit', 'is-right'];
const CLASS_SAI = ['wrong', 'is-wrong', 'incorrect', 'sai', 'is-sai', 'wp-miss'];

function ganRungKhiCham2() {
  const vung = document.getElementById('page-content') || document.body;
  let choDoi = null;   // gộp nhiều thay đổi trong cùng một nhịp thành MỘT lần rung
  const qs = new MutationObserver((ds) => {
    if (choDoi) return;
    let dung = false, sai = false;
    for (const d of ds) {
      const cl = d.target?.classList;
      if (!cl) continue;
      if (CLASS_SAI.some((c) => cl.contains(c))) sai = true;
      else if (CLASS_DUNG.some((c) => cl.contains(c))) dung = true;
    }
    if (!dung && !sai) return;
    // Sai được ưu tiên: một lượt chấm cả bài thì cái người học cần biết là "có câu sai".
    choDoi = setTimeout(() => { choDoi = null; (sai ? rungSai : rungDung)(); }, 60);
  });
  qs.observe(vung, { attributes: true, attributeFilter: ['class'], subtree: true });
}

// ------------------------------------------------------------
// THANH TRẠNG THÁI + VÙNG AN TOÀN (tai thỏ / thanh gạt)
// ------------------------------------------------------------
async function dungThanhTrangThai() {
  if (!coPlugin('StatusBar')) return;
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');

    // CẨN THẬN VỚI TÊN: Capacitor đặt ngược với trực giác.
    //   Style.Light = chữ ĐEN, dành cho nền SÁNG
    //   Style.Dark  = chữ TRẮNG, dành cho nền TỐI
    // Thanh tiêu đề của app là rgba(246,248,248,.86) — nền sáng — nên phải là Style.Light.
    await StatusBar.setStyle({ style: Style.Light });

    if (laAndroid()) {
      // Màu này phải KHỚP nền thanh tiêu đề, không phải màu teal thương hiệu: thanh trạng thái
      // nằm sát ngay trên nó, lệch màu là thấy một vạch lạ vắt ngang đầu màn hình. Đặt teal như
      // bản đầu còn tệ hơn — chữ đen trên nền teal đậm thì tương phản quá thấp.
      //
      // Từ Android 15 (API 35) lệnh này bị hệ thống BỎ QUA (thanh trạng thái luôn trong suốt,
      // tràn viền là bắt buộc), nên trên máy mới nó vô hại. Nhưng minSdk là 24 — máy Android 14
      // trở xuống vẫn nghe lệnh này, và đó mới là chỗ đặt sai màu sẽ lộ ra.
      await StatusBar.setBackgroundColor({ color: '#F6F8F8' });
      await StatusBar.setOverlaysWebView({ overlay: false });
    }
  } catch {}
}

// ------------------------------------------------------------
// MÀN HÌNH CHỜ
// ------------------------------------------------------------
async function anManHinhCho() {
  if (!coPlugin('SplashScreen')) return;
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide({ fadeOutDuration: 250 });
  } catch {}
}

// ------------------------------------------------------------
// NÚT BACK CỦA ANDROID
// ------------------------------------------------------------
// Mặc định Capacitor cho nút Back THOÁT app ngay — mất bài đang làm dở. Thứ tự đúng là: đóng
// thứ đang đè lên trên trước (hộp thoại, ngăn kéo), rồi mới lùi lịch sử điều hướng, và chỉ khi
// không còn gì để lùi mới hỏi thoát.
async function ganNutBack() {
  if (!laAndroid() || !coPlugin('App')) return;
  try {
    const { App } = await import('@capacitor/app');
    App.addListener('backButton', async ({ canGoBack }) => {
      // ⚠️ LỚP ĐANG MỞ ĐƯỢC ĐÁNH DẤU BẰNG CLASS `show`, KHÔNG PHẢI `active`.
      // `openModal()` và `openDialog()` trong main.js đều dùng `classList.add('show')`. Bản đầu
      // của đoạn này dò `.active` nên KHÔNG BAO GIỜ thấy hộp thoại nào đang mở: bấm Back trong
      // lúc popup đăng nhập đang hiện thì nó nhảy thẳng sang bước lùi trang, hoặc hỏi thoát app,
      // trong khi popup vẫn nằm đó. Đối chiếu tên class với main.js trước khi sửa đoạn này.

      // 1. Hộp thoại dựng lúc chạy (openDialog) — xem CLAUDE.md 4.18 mục 2.
      const dialog = document.getElementById('app-dialog');
      if (dialog && dialog.classList.contains('show')) {
        window.app?.closeDialog?.(); return;
      }
      // 2. Lớp phủ tĩnh đang mở (đăng nhập, khoá nội dung cho khách, cài đặt bài thi…).
      //    Nhận cả `show` lẫn `active` cho chắc, phòng khi có chỗ khác dùng tên còn lại.
      const modal = document.querySelector('.modal-overlay.show, .modal.show, .modal-overlay.active, .modal.active');
      if (modal) {
        // Ưu tiên hàm đóng của app (nó còn dọn trạng thái, gỡ khoá cuộn…); không có thì gỡ class.
        if (modal.id === 'auth-modal' && window.app?.closeAuth) window.app.closeAuth();
        else if (modal.id && window.app?.closeModal) window.app.closeModal(modal.id);
        else modal.classList.remove('show', 'active');
        return;
      }
      // 3. Ngăn kéo menu trên mobile.
      if (document.querySelector('.sidebar.open, .app-shell.sidebar-open')) {
        window.app?.closeMobileSidebar?.(); return;
      }
      // 4. Lùi trong lịch sử điều hướng của chính app.
      if (canGoBack && window.history.length > 1) { window.history.back(); return; }
      // 5. Hết đường lùi — hỏi trước khi thoát, đừng thoát lặng lẽ.
      if (!coPlugin('Dialog')) { App.exitApp(); return; }
      const { Dialog } = await import('@capacitor/dialog');
      const { value } = await Dialog.confirm({
        title: 'Thoát ứng dụng',
        message: 'Bạn có muốn thoát ITaiwan không?',
        okButtonTitle: 'Thoát',
        cancelButtonTitle: 'Ở lại',
      });
      if (value) App.exitApp();
    });
  } catch {}
}

// ------------------------------------------------------------
// VÒNG ĐỜI ỨNG DỤNG — vào nền thì dừng mọi thứ đang phát/đếm giờ
// ------------------------------------------------------------
// Trên web, `visibilitychange` lo việc này (game tab đã dùng, CLAUDE.md 4.24). Trong app native
// nó KHÔNG phải lúc nào cũng bắn khi người dùng chuyển sang app khác hay khoá màn hình — nên
// phải nghe thêm sự kiện vòng đời của chính vỏ native, nếu không audio bài khoá vẫn phát khi
// điện thoại đã nằm trong túi.
async function ganVongDoi() {
  if (!coPlugin('App')) return;
  try {
    const { App } = await import('@capacitor/app');
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) return;
      try { window.app?._ddGameStopAll?.(); } catch {}
      try { window.speechSynthesis?.cancel?.(); } catch {}
      document.querySelectorAll('audio').forEach((a) => { try { a.pause(); } catch {} });
      // Phát tiếp sự kiện web để mọi đoạn mã sẵn có đang nghe `visibilitychange` cũng chạy.
      try { document.dispatchEvent(new Event('visibilitychange')); } catch {}
    });
  } catch {}
}

// ------------------------------------------------------------
// LIÊN KẾT SÂU (mở app từ link taiwanese-mu.vercel.app/…)
// ------------------------------------------------------------
async function ganDeepLink() {
  if (!coPlugin('App')) return;
  try {
    const { App } = await import('@capacitor/app');
    App.addListener('appUrlOpen', ({ url }) => {
      try {
        const u = new URL(url);

        // HAI DẠNG LINK, TÁCH RA KHÁC NHAU — đây là chỗ dễ sai nhất:
        //
        //   https://taiwanese-mu.vercel.app/tocfl/bai-1-1  ->  host='taiwanese-mu…'  pathname='/tocfl/bai-1-1'
        //   com.taiwanese.app://tocfl/bai-1-1              ->  host='tocfl'          pathname='/bai-1-1'
        //
        // Với lược đồ riêng, đoạn ĐẦU TIÊN của đường dẫn bị bộ phân tích URL coi là tên máy chủ
        // và cắt khỏi `pathname`. Lấy thẳng `u.pathname` thì link mở ra thiếu mất một đoạn và
        // rơi về trang không tìm thấy — mà nhìn thì tưởng app mở link hỏng.
        const laWeb = u.protocol === 'http:' || u.protocol === 'https:';
        const duong = (laWeb ? u.pathname : '/' + u.host + u.pathname) + u.search;

        // Chỉ đi theo đường dẫn nội bộ. Không bao giờ điều hướng theo tên máy chủ lạ gửi vào.
        if (duong && duong !== '/' && duong.startsWith('/')) docDuong(duong);
      } catch {}
    });
  } catch {}
}

// Mở một đường dẫn nội bộ. Router đã có sẵn `parseLocation()` để khớp tiền tố dài nhất, nên ở
// đây chỉ cần đẩy URL vào lịch sử rồi bắn `popstate` — router tự lo phần còn lại. Nhân bản logic
// khớp tiền tố ở đây là tạo ra bảng route thứ hai phải đồng bộ tay (CLAUDE.md 4.2).
function docDuong(duong) {
  window.history.pushState({}, '', duong);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// ------------------------------------------------------------
// MẠNG — học offline vẫn được, nhưng phải nói cho người dùng biết
// ------------------------------------------------------------
async function ganMang() {
  if (!coPlugin('Network')) return;
  try {
    const { Network } = await import('@capacitor/network');
    const ve = (st) => {
      _dangOnline = !!st.connected;
      veBangMang(_dangOnline);
    };
    ve(await Network.getStatus());
    Network.addListener('networkStatusChange', ve);
  } catch {}
}

function veBangMang(online) {
  let el = document.getElementById('tw-offline-bar');
  if (online) { el?.remove(); return; }
  if (el) return;
  el = document.createElement('div');
  el.id = 'tw-offline-bar';
  el.innerHTML = '<i class="fa-solid fa-wifi"></i><span>Đang ngoại tuyến — bài học đã tải vẫn dùng được, '
    + 'kết quả sẽ gửi lên khi có mạng lại.</span>';
  document.body.appendChild(el);
}

/** Có mạng không — main.js hỏi trước khi nộp bài để báo cho học viên thay vì nuốt lỗi. */
export const dangOnline = () => _dangOnline;

// ------------------------------------------------------------
// LINK RA NGOÀI — mở trong trình duyệt trong ứng dụng
// ------------------------------------------------------------
// `target="_blank"` trong WebView native thường KHÔNG mở gì cả (người dùng bấm mà không có
// phản ứng gì). Apple cũng muốn link ngoài mở trong SFSafariViewController chứ không đá người
// dùng ra khỏi app.
function ganLinkNgoai() {
  document.addEventListener('click', async (e) => {
    const a = e.target?.closest?.('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (!/^https?:\/\//i.test(href)) return;             // link nội bộ: router lo
    try {
      const u = new URL(href);
      if (u.hostname === 'localhost') return;
    } catch { return; }
    e.preventDefault();
    if (!coPlugin('Browser')) { globalThis.open?.(href, '_blank'); return; }
    try {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url: href, presentationStyle: 'popover', toolbarColor: '#38899E' });
    } catch {}
  }, true);
}

// ------------------------------------------------------------
// CHIA SẺ QUA KHAY HỆ THỐNG
// ------------------------------------------------------------
export async function chiaSe({ tieuDe, noiDung, url } = {}) {
  if (!coPlugin('Share')) return false;
  try {
    const { Share } = await import('@capacitor/share');
    await Share.share({
      title: tieuDe || 'ITaiwan — Học tiếng Trung',
      text: noiDung || '',
      url: url || 'https://taiwanese-mu.vercel.app',
      dialogTitle: 'Chia sẻ',
    });
    return true;
  } catch { return false; }
}

// ------------------------------------------------------------
// BÀN PHÍM — đừng để nó che ô đang gõ
// ------------------------------------------------------------
async function ganBanPhim() {
  if (!coPlugin('Keyboard')) return;
  try {
    const { Keyboard } = await import('@capacitor/keyboard');
    Keyboard.addListener('keyboardWillShow', (info) => {
      document.body.style.setProperty('--tw-keyboard', `${info.keyboardHeight}px`);
      document.body.classList.add('tw-keyboard-open');
    });
    Keyboard.addListener('keyboardWillHide', () => {
      document.body.style.setProperty('--tw-keyboard', '0px');
      document.body.classList.remove('tw-keyboard-open');
    });
    if (laIOS()) await Keyboard.setAccessoryBarVisible({ isVisible: true });
  } catch {}
}

// ------------------------------------------------------------
// KHỞI TẠO
// ------------------------------------------------------------
export async function khoiTaoNative() {
  if (_daKhoiTao) return;
  _daKhoiTao = true;

  document.documentElement.classList.add('tw-native', `tw-${nenTang()}`);

  ganRungKhiCham();
  ganRungKhiCham2();
  ganLinkNgoai();

  await Promise.all([
    dungThanhTrangThai(),
    ganNutBack(),
    ganVongDoi(),
    ganDeepLink(),
    ganMang(),
    ganBanPhim(),
  ]);

  // Ẩn màn hình chờ SAU CÙNG: ẩn sớm thì người dùng nhìn thấy một khung trắng trong lúc
  // giao diện còn đang dựng.
  requestAnimationFrame(() => setTimeout(anManHinhCho, 120));
}

export default { khoiTaoNative, rungNhe, rungDung, rungSai, chiaSe, dangOnline };
