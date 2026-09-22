// ============================================================
// TẺN - Main Application (SPA Router + Page Renderers)
// ============================================================
// `shadowingData` đã BỎ (2026-09-16): 5 chủ đề mà 0/5 có câu nào, trang Luyện nói nay chạy trên
// 324 bài hội thoại thật của giáo trình. `vocabularyData`/`dialogueData` vẫn import làm bản dự
// phòng cho vài chỗ cũ, nhưng 4 trang khu Luyện tập KHÔNG còn đọc chúng nữa.
import { vocabularyData as _mockVocab, dialogueData as _mockDialogue, examData as _mockExam, leaderboardData as _mockLeaderboard, blogData as _mockBlog } from './data/mockData.js';
import { nguonTuVung, napTuVung, napHoiThoai, nguonHoiThoai, tenNguon, quenKhoLuyenTap } from './utils/kho-luyen-tap.js';
import { coNhanDang, ngheDoc, tiLeKhop, soTungChu, LOI_NOI } from './utils/noi.js';
import { tocflExams, getTocflQuestions, napExam } from './data/exam-lazy.js';
import { tronMang, tronDe } from './utils/tron-de.js';
import { assetUrl } from './utils/cdn.js';
// Nội dung bài học đi qua API có kiểm quyền (2026-09-09) — xem src/utils/noi-dung.js.
import { napTaiNguyen, napGopTheoQuyen, LoiCanQuyen } from './utils/noi-dung.js';
import { baiMo, bocKhoaBai, maKhoaQuyen } from '../shared/noi-dung-mo.js';
import { BO_HIEN } from '../shared/bo-giao-trinh.js';
import { initialsData, initialPairs, finalsData, tonesData, toneMinimalSet, toneDrills, toneSandhi, toneMarkRules, pronQuiz } from './data/pronunciationData.js';
import { pronAudioMap } from './data/pronAudioMap.js';
import { pronAudioOverride } from './data/pronAudioFix.js';
import { pinyinChart, pinyinChartGroups, pinyinChartInitials, pinyinChartAudio } from './data/pinyinChartData.js';
// DANH MỤC bài (nhẹ, vào bundle chính) và NỘI DUNG bài (nạp động theo quyển) tách làm hai
// từ 2026-09-06 — xem CLAUDE.md 4.30. Đừng import lại `duongdaiData.js` / `thoidaiData.js` ở
// đây: hai file đó gộp tĩnh cả 11 quyển (11 MB) và chỉ dành cho script Node.
import {
  thoidaiLessons, thoidaiSubLessons, thoidaiTabs, thoidaiBooks,
  tdParseLessonId, tdLessonLabel, tdSubSegs, tdSegsToSub, tdBookOf,
  gtSubCoNoiDung,
} from './data/giaotrinh-index.js';
import {
  thoidaiVocab, thoidaiGrammar, thoidaiDialogues, thoidaiWriting,
  napBai, daNapBai, napNgam, baiBiKhoa, quenBaiBiKhoa,
} from './data/giaotrinh-kho.js';
import { generateQuiz, getExerciseInfo } from './data/sinh-de-trac-nghiem.js';
import { sangGianThe } from './data/gian-the.js';
// Kho tra cứu của khu "Từ vựng & Hán tự" (4.37). Chỉ là bộ NẠP + tìm kiếm; dữ liệu thật nằm
// ở public/data/tudien/ và chỉ được tải khi trang tương ứng cần tới.
import {
  K, C, TD_BO, TD_TU_LOAI, napKho, napChuDon, napChu, napBoThu, napManh,
  daNap, layNgay, tdKhongDau, coChuHan, tdAudio, tdGiaiNhan, tdNhomTuLoai,
  tdTimTrong, tdTraTu, tdTuBatDau, tdManhSangHang,
} from './data/tudien-kho.js';
import api from './api/client.js';
import { laNative, apiBase } from './utils/env.js';

// ---- LÕI dùng chung (4.40) ----
// Tách khỏi main.js để module trang nạp động dùng lại được mà không sinh vòng import.
import { dangKy } from './core/app.js';
import { state, kvState, tdxState, stState, btState, cdState, tkState } from './core/state.js';
import {
  tdEsc, tdNhay, toast, twPlayEnter, twFocusMode,
  openModal, closeModal, openDialog, closeDialog, khungXuongTrang,
} from './core/ui.js';
import {
  soTay, soTayCo, soTayNap, soTayDoi, soTayDongBo, soTayChuyenDoiCu, soTayXoaHet,
  tdNutLuuTuHtml, tdLuuNhanh,
} from './core/sotay.js';
import { nhipBatDau, nhipDoiTrang } from './core/nhip-do.js';

// ============================================================
// MUTABLE DATA (starts as mock, overwritten by API)
// ============================================================
let vocabularyData = [..._mockVocab];
let dialogueData = [..._mockDialogue];
let examData = { reading: [..._mockExam.reading], listening: [..._mockExam.listening] };
let leaderboardData = [..._mockLeaderboard];
let blogData = [..._mockBlog];

// ============================================================
// APP STATE
// ============================================================
// `state` đã chuyển sang `core/state.js` (4.40) — module trang nạp động dùng chung object này.

// ============================================================
// NAVIGATION CONFIG
// ============================================================
const navConfig = [
  { id: 'dashboard', path: '', label: 'Trang chủ', icon: 'fa-solid fa-house' },

  {
    type: 'parent', id: 'cat-pron', path: 'hoc-phat-am', label: 'Học phát âm', icon: 'fa-solid fa-volume-high',
    children: [
      { id: 'pron-vanmau', path: 'van-mau', label: 'Vận mẫu', icon: 'fa-solid fa-wave-square' },
      { id: 'pron-thanhmau', path: 'thanh-mau', label: 'Thanh mẫu', icon: 'fa-solid fa-spell-check' },
      { id: 'pron-thanhdieu', path: 'thanh-dieu', label: 'Thanh điệu', icon: 'fa-solid fa-chart-line' },
      { id: 'pron-bangphienam', path: 'bang-phien-am', label: 'Bảng phiên âm', icon: 'fa-solid fa-table-cells' },
    ],
  },

  {
    type: 'parent', id: 'cat-tocfl', path: 'tocfl', label: 'TOCFL', icon: 'fa-solid fa-graduation-cap',
    children: [
      // `books: true` -> mục này có thêm CẤP 3 trong sidebar: các quyển (xem navBooksHtml).
      // Mọi quyển dùng CHUNG page id này, quyển chỉ là một đoạn URL (/quyen-2) do PAGE_PARAMS đọc.
      { id: 'tocfl-thoidai', path: 'giao-trinh-thoi-dai', label: 'Giáo trình thời đại', icon: 'fa-solid fa-book', books: true },
      { id: 'tocfl-vocab', path: 'tu-vung-theo-band', label: 'Tổng hợp từ vựng từng Band', icon: 'fa-solid fa-layer-group' },
      { id: 'exam', path: 'thi-thu', label: 'Thi thử TOCFL', icon: 'fa-solid fa-file-pen' },
    ],
  },



  {
    type: 'parent', id: 'cat-words', path: 'tu-vung', label: 'Từ vựng & Hán tự', icon: 'fa-solid fa-language',
    children: [
      { id: 'dictionary', path: 'tu-dien', label: 'Từ điển Trung-Việt', icon: 'fa-solid fa-book-atlas' },
      { id: 'notebook', path: 'so-tay', label: 'Sổ tay từ vựng', icon: 'fa-solid fa-book-bookmark' },
      { id: 'radicals', path: 'bo-thu-han-tu', label: 'Bộ thủ Hán tự', icon: 'fa-solid fa-torii-gate' },
    ],
  },

  {
    type: 'parent', id: 'cat-path', path: 'lo-trinh', label: 'Lộ trình của tôi', icon: 'fa-solid fa-route',
    children: [
      { id: 'path-overview', path: 'tong-quan', label: 'Tổng quan', icon: 'fa-solid fa-chart-pie' },
      { id: 'path-today', path: 'hom-nay', label: 'Bài học hôm nay', icon: 'fa-solid fa-calendar-day' },
      { id: 'path-homework', path: 'bai-tap', label: 'Bài tập cần hoàn thành', icon: 'fa-solid fa-list-check' },
      { id: 'path-progress', path: 'tien-do', label: 'Tiến độ', icon: 'fa-solid fa-chart-line' },
      { id: 'path-kiemtra', path: 'bai-kiem-tra', label: 'Bài kiểm tra cô giao', icon: 'fa-solid fa-file-pen' },
      { id: 'path-achievements', path: 'thanh-tich', label: 'Thành tích', icon: 'fa-solid fa-trophy' },
    ],
  },


  {
    type: 'parent', id: 'cat-account', path: 'tai-khoan', label: 'Tài khoản', icon: 'fa-solid fa-circle-user',
    children: [
      { id: 'account-profile', path: 'ho-so', label: 'Thông tin cá nhân', icon: 'fa-solid fa-id-card' },
      { id: 'account-settings', path: 'cai-dat', label: 'Cài đặt', icon: 'fa-solid fa-gear' },
      { id: 'account-notifications', path: 'thong-bao', label: 'Thông báo', icon: 'fa-solid fa-bell' },
    ],
  },
];

// ------------------------------------------------------------
// Bảng tra cứu suy ra từ navConfig (title + icon + nhóm cha)
// ------------------------------------------------------------
const pageTitles = { 'exam-taking': 'Đang thi...', dictionary: 'Từ điển Trung-Việt' };
const pageIcons = { dictionary: 'fa-solid fa-book-atlas' };
const pageParent = {};
// pagePath: id trang -> đường dẫn ('/tocfl/giao-trinh-duong-dai')
// pathPage: đường dẫn -> id trang. Cả hai đều SINH TỰ ĐỘNG từ navConfig, không sửa tay.
const pagePath = {};
const pathPage = {};

function registerPath(id, path) {
  const p = '/' + path.split('/').filter(Boolean).join('/');
  pagePath[id] = p === '/' ? '/' : p;
  pathPage[pagePath[id]] = id;
}

navConfig.forEach(item => {
  if (item.type === 'parent') {
    item.children.forEach(c => {
      pageTitles[c.id] = c.label;
      pageIcons[c.id] = c.icon;
      pageParent[c.id] = item.id;
      registerPath(c.id, `${item.path}/${c.path}`);
    });
  } else if (item.id) {
    pageTitles[item.id] = item.label;
    pageIcons[item.id] = item.icon;
    registerPath(item.id, item.path || '');
  }
});

// Trang không nằm trong sidebar nhưng vẫn cần URL riêng
// exam-taking shares base path /tocfl/thi-thu — segs distinguish from setup
// e.g. /tocfl/thi-thu/band-a/de-1/doc
pagePath['exam-taking'] = pagePath['exam']; // Same base, segs added by write()

// `account-duhoc` CỐ Ý không nằm trong navConfig: chỉ học sinh CÓ hồ sơ du học mới dùng tới, để
// vào menu thì mọi học viên đều thấy một mục không liên quan gì tới mình. Lối vào là thẻ ở trang
// Thông tin cá nhân (chỉ hiện khi có hồ sơ) và từ chuông thông báo.
// Khai tay đủ 4 bảng, nếu không: buildPath() dựng URL sai, <title> rỗng, nhóm cha không tự mở
// (đúng bẫy đã ghi cho `hsk-30` ngay bên trên).
registerPath('account-duhoc', 'tai-khoan/ho-so-du-hoc');
pageTitles['account-duhoc'] = 'Hồ sơ du học';
pageIcons['account-duhoc'] = 'fa-solid fa-plane-departure';
pageParent['account-duhoc'] = 'cat-account';
pageTitles['not-found'] = 'Không tìm thấy trang';
pageIcons['not-found'] = 'fa-solid fa-compass';

// Trang đã có renderer thật; các trang còn lại render màn hình "Sắp ra mắt"
const IMPLEMENTED_PAGES = new Set([
  'path-kiemtra',
  'dashboard', 'exam', 'exam-taking', 'notebook', 'radicals', 'dictionary',
  'pron-vanmau', 'pron-thanhmau', 'pron-thanhdieu', 'pron-bangphienam',
  'tocfl-thoidai', 'tocfl-vocab',
  'account-profile', 'account-settings', 'account-notifications',
  // Hồ sơ du học của học sinh — không có trong menu, xem ghi chú ở registerPath.
  'account-duhoc',
  // Lộ trình của tôi. Cả 6 trang đều CẦN ĐĂNG NHẬP — dữ liệu là của riêng từng học viên,
  // nên cố ý không đưa vào PUBLIC_PAGES.
  'path-overview', 'path-today', 'path-homework', 'path-progress', 'path-achievements',
]);
// Trang cho phép xem mà KHÔNG cần đăng nhập. Mọi trang khác yêu cầu đăng nhập.
const PUBLIC_PAGES = new Set([
  'dashboard', 'not-found',
  'pron-vanmau', 'pron-thanhmau', 'pron-thanhdieu', 'pron-bangphienam',
  // Trang TRA CỨU từ vựng để mở: dữ liệu vốn là bảng từ công khai của SC-TOP, và giá trị giữ
  // chân nằm ở giáo trình chứ không ở đây.
  'tocfl-thoidai', 'tocfl-vocab',
  // Từ điển và Bộ thủ là công cụ TRA CỨU thuần: dữ liệu là từ điển CC BY-SA và bảng bộ thủ
  // Khang Hy, không phải nội dung riêng của dự án. Sổ tay để mở vì chưa đăng nhập vẫn dùng
  // được (lưu ở localStorage) — chặn lại thì mất luôn đường dẫn dắt người mới tạo tài khoản.
  'dictionary', 'radicals', 'notebook',
]);
// ============================================================
// INIT
// ============================================================
/**
 * Bật trạng thái `:active` trên thiết bị cảm ứng.
 *
 * Safari trên iOS (và WKWebView của app) CHỈ áp `:active` khi trang có ít nhất một trình nghe
 * sự kiện chạm — một quy định cũ của WebKit, không phải lỗi. Không có nó thì mọi hiệu ứng nhấn
 * viết trong CSS đều im lặng không chạy trên iPhone, trong khi trên máy tính vẫn thấy bình
 * thường nhờ `:hover` — nên rất dễ tưởng là đã xong.
 *
 * Một trình nghe rỗng, thụ động, gắn một lần là đủ. `passive: true` để trình duyệt biết ta
 * không chặn cuộn, nhờ vậy không ảnh hưởng độ mượt khi vuốt.
 */
function batActiveTrenCamUng() {
  try { document.addEventListener('touchstart', () => {}, { passive: true }); } catch {}
}

/**
 * PWA (2026-09-18): đăng ký service worker /sw.js để web cài được thành app trên màn hình chính
 * (Android/iOS) và mở lại được khung app khi mất mạng. Chỉ trên WEB ở BẢN BUILD:
 * - trong app native (Capacitor) đã có lớp offline riêng, hai lớp cache chồng nhau chỉ gây rối;
 * - lúc dev thì cache làm người sửa code thấy bản cũ mà không hiểu vì sao.
 * sw.js không bao giờ đụng /api/* và nạp HTML theo kiểu mạng-trước, nên deploy bản mới là thấy ngay.
 */
/**
 * Chiều cao khung app bám theo VÙNG NHÌN THẤY THẬT (2026-09-20).
 *
 * Trên iOS, ba con số dưới đây có thể khác nhau cùng lúc:
 *   - `100%`   : layout viewport — không đổi khi thanh công cụ Safari co giãn
 *   - `100dvh` : khung nhìn động của trình duyệt
 *   - `visualViewport.height` : phần người dùng THẬT SỰ nhìn thấy
 * Chỗ lệch giữa chúng hiện ra thành dải trống ở đáy màn hình — lỗi chủ dự án gặp trên iPhone 15
 * Pro Max. `visualViewport` là con số duy nhất luôn đúng, nên khung app bám theo nó.
 *
 * Bàn phím mở làm vùng nhìn thấy co lại quá nửa; lúc đó GIỮ NGUYÊN chiều cao, nếu không cả giao
 * diện nhảy dựng lên mỗi lần gõ chữ trong bài dịch.
 */
function capNhatChieuCaoKhung() {
  try {
    const vv = window.visualViewport;
    let h;
    if (laStandalone()) {
      // Ở chế độ PWA, CSS đã đặt `height: 100vh` cho khung app (xem style.css) — con số duy nhất
      // bằng đúng chiều cao màn hình trên iOS. Ghi đè `--tw-vh` ở đây chỉ làm hỏng điều đó.
      document.documentElement.style.removeProperty('--tw-vh');
      return;
      // ===== CHẾ ĐỘ PWA (đã thêm vào màn hình chính) =====
    } else {
      // ===== CHẾ ĐỘ TRÌNH DUYỆT =====
      // Thanh công cụ Safari co giãn nên chỉ `visualViewport.height` mới bám đúng vùng nhìn thấy.
      h = vv ? vv.height : window.innerHeight;
      // Bàn phím mở làm vùng nhìn thấy co lại quá nửa — giữ nguyên chiều cao, nếu không cả giao
      // diện nhảy dựng lên mỗi lần gõ chữ.
      if (window.innerHeight && h < window.innerHeight * 0.7) return;
    }
    if (!h) return;
    document.documentElement.style.setProperty('--tw-vh', Math.round(h) + 'px');
  } catch { /* trình duyệt không có visualViewport: CSS tự rơi về 100dvh */ }
}

/**
 * Lưới an toàn cuối: đo khoảng hở THẬT giữa đáy thanh điều hướng và đáy khung nhìn, rồi bù đúng
 * bằng ngần ấy. Chạy sau mỗi lần đổi trang/xoay máy.
 *
 * Vì sao cần dù đã tính chiều cao ở trên: iOS standalone có vài phiên bản báo số không nhất quán,
 * và ta không có cách nào mô phỏng hết trên máy dev. Đo trực tiếp thì đúng bất kể iOS báo gì.
 * Chỉ bù khi hở 2–200px (ngoài khoảng đó là số rác, bù vào còn hỏng hơn).
 */
function buKhoangHoDay() {
  try {
    if (laStandalone()) return;     // PWA: chiều cao do `height: 100vh` trong CSS lo
    const de = document.documentElement;
    const nav = document.querySelector('.mobile-nav');
    const shell = document.querySelector('.app-shell');
    if (!nav || !shell || getComputedStyle(nav).display === 'none') { de.style.removeProperty('--tw-bu-day'); return; }

    // BƯỚC 1 — khung app có phủ kín khung nhìn không? Nếu không, kéo dài CHÍNH KHUNG APP; bù vào
    // thanh điều hướng lúc này là vô ích vì thanh nằm bên trong khung (và khung `overflow: hidden`
    // sẽ cắt mất phần thừa).
    const hoKhung = Math.round(window.innerHeight - shell.getBoundingClientRect().bottom);
    if (hoKhung > 1 && hoKhung < 400) {
      de.style.setProperty('--tw-vh', window.innerHeight + 'px');
      de.style.removeProperty('--tw-bu-day');
      return;
    }

    // BƯỚC 2 — khung đã phủ kín mà đáy thanh vẫn chưa chạm đáy khung nhìn: bù đúng phần chênh.
    de.style.setProperty('--tw-bu-day', '0px');          // đo lại từ 0, không cộng dồn
    const ho = Math.round(window.innerHeight - nav.getBoundingClientRect().bottom);
    if (ho > 1 && ho < 200) de.style.setProperty('--tw-bu-day', ho + 'px');
  } catch {}
}

function theoDoiChieuCaoKhung() {
  capNhatChieuCaoKhung();
  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener('resize', capNhatChieuCaoKhung);
    // Thanh công cụ Safari co giãn KHI CUỘN chứ không phát resize — thiếu dòng này thì khung app
    // giữ nguyên chiều cao cũ và lại hở đáy.
    vv.addEventListener('scroll', capNhatChieuCaoKhung);
  }
  window.addEventListener('resize', capNhatChieuCaoKhung);
  window.addEventListener('orientationchange', () => setTimeout(capNhatChieuCaoKhung, 250));
  // Bù khoảng hở sau khi bố cục đã ổn định (và sau mỗi lần xoay máy).
  const buLai = () => { epTinhLaiViewport(); capNhatChieuCaoKhung(); requestAnimationFrame(() => { buKhoangHoDay(); veThuocDo(); }); };
  theoDoiThuocDo();
  setTimeout(buLai, 120);
  setTimeout(buLai, 600);
  setTimeout(buLai, 1500);                    // sau khi font + ảnh xong, bố cục mới thật sự ổn định
  window.addEventListener('resize', () => setTimeout(buLai, 100));
  window.addEventListener('orientationchange', () => setTimeout(buLai, 400));
  window.addEventListener('pageshow', () => setTimeout(buLai, 100));   // quay lại app từ nền
  document.addEventListener('visibilitychange', () => { if (!document.hidden) setTimeout(buLai, 150); });
  if (vv) vv.addEventListener('resize', () => setTimeout(buLai, 100));
}

/**
 * CHẨN ĐOÁN MÀN HÌNH NGAY TRONG APP (2026-09-21).
 *
 * Lỗi "khoảng trắng dưới footer" CHỈ xảy ra khi web được thêm vào màn hình chính iPhone (chế độ
 * standalone), không xảy ra trong Safari. Trong chế độ đó không gõ được URL nên trang
 * /chan-doan.html không mở tới được — bộ đo phải nằm trong app, mở từ menu. Nó in mọi con số iOS
 * đang báo (innerHeight, visualViewport, env(), chiều cao khung, đáy thanh nav so với đáy MÀN HÌNH
 * THẬT lấy từ screen.*) để nhìn một ảnh chụp là biết iOS tính viewport thế nào.
 */
function laStandalone() {
  try { return navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches; } catch { return false; }
}
function doManHinh() {
  const vv = window.visualViewport;
  const de = document.documentElement;
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
  document.body.appendChild(t);
  const c = getComputedStyle(t);
  const env = [c.paddingTop, c.paddingRight, c.paddingBottom, c.paddingLeft].map((v) => Math.round(parseFloat(v) || 0));
  t.remove();
  const shell = document.querySelector('.app-shell')?.getBoundingClientRect();
  const nav = document.querySelector('.mobile-nav');
  const nb = nav ? nav.getBoundingClientRect() : null;
  const pc = document.getElementById('page-content')?.getBoundingClientRect();
  const doc = window.matchMedia('(orientation: portrait)').matches;
  // iOS báo screen.width/height theo chiều DỌC bất kể đang xoay — lấy cạnh dài làm chiều cao khi dọc.
  const manCao = doc ? Math.max(screen.width, screen.height) : Math.min(screen.width, screen.height);
  const bundle = [...document.querySelectorAll('script[src]')]
    .map((s) => s.src.split('/').pop()).find((n) => /^main-/.test(n)) || '—';
  const lech = vv ? Math.round(window.innerHeight - vv.height) : 0;
  return {
    'Bản dựng đang chạy': bundle,
    'Chế độ': laStandalone() ? 'STANDALONE (thêm vào màn hình chính)' : 'Trình duyệt',
    'screen (W×H)': `${screen.width}×${screen.height}`,
    'Màn hình thật cao (ước)': manCao,
    'innerHeight': innerHeight,
    'documentElement.clientHeight': de.clientHeight,
    'visualViewport.height': vv ? Math.round(vv.height) : '—',
    'visualViewport.offsetTop': vv ? Math.round(vv.offsetTop) : '—',
    'env trên/phải/dưới/trái': env.join(' / '),
    '--tw-vh (JS đặt)': getComputedStyle(de).getPropertyValue('--tw-vh').trim() || '—',
    'app-shell cao': shell ? Math.round(shell.height) : '—',
    'app-shell đáy': shell ? Math.round(shell.bottom) : '—',
    'page-content đáy': pc ? Math.round(pc.bottom) : '—',
    'nav cao': nb ? Math.round(nb.height) : '—',
    'nav đáy': nb ? Math.round(nb.bottom) : '—',
    'HỞ: đáy nav → đáy MÀN THẬT': nb ? Math.round(manCao - nb.bottom) : '—',
    'HỞ: đáy nav → innerHeight': nb ? Math.round(innerHeight - nb.bottom) : '—',
    'innerHeight − visualViewport': lech,
    '--tw-bu-day (bù tự động)': getComputedStyle(de).getPropertyValue('--tw-bu-day').trim() || '0px',
    'devicePixelRatio': devicePixelRatio,
    'iOS/UA': (navigator.userAgent.match(/OS (\d+_\d+)/) || [])[1]?.replace('_', '.') || navigator.userAgent.slice(0, 60),
  };
}
function moChanDoanManHinh() {
  const d = doManHinh();
  const dong = Object.entries(d).map(([k, v]) => `${k}: ${v}`).join('\n');
  const bang = Object.entries(d).map(([k, v]) => {
    const quanTrong = /^HỞ:/.test(k) && Number(v) > 2;
    return `<tr><td style="color:var(--text-muted);padding:5px 8px;border-bottom:1px solid var(--line)">${tdEsc(k)}</td><td style="font-weight:700;padding:5px 8px;border-bottom:1px solid var(--line);font-variant-numeric:tabular-nums;${quanTrong ? 'color:#B91C1C' : ''}">${tdEsc(String(v))}</td></tr>`;
  }).join('');
  openDialog('Kiểm tra hiển thị màn hình',
    `<p style="margin:0 0 10px;font-size:13px;color:var(--text-secondary)">Chụp màn hình này gửi cho người phát triển, hoặc bấm <b>Sao chép</b> rồi dán vào chat. Dòng <b>HỞ</b> màu đỏ là khoảng trống dưới thanh điều hướng.</p>
     <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">${bang}</table></div>
     <textarea id="cd-txt" readonly style="position:absolute;left:-9999px">${tdEsc(dong)}</textarea>`,
    `<button class="btn btn-primary" onclick="window.app.chepChanDoan()"><i class="fa-solid fa-copy"></i> Sao chép</button>
     <button class="btn btn-outline" onclick="window.app.batThuocDo()"><i class="fa-solid fa-ruler"></i> Hiện thước đo</button>
     <button class="btn btn-outline" onclick="window.app.taiLaiSach()"><i class="fa-solid fa-rotate"></i> Xoá cache &amp; tải lại</button>
     <button class="btn btn-outline" onclick="window.app.closeDialog()">Đóng</button>`);
}
/**
 * Ép app lấy bản mới nhất. Cần vì app đã thêm vào màn hình chính giữ cache rất dai: gỡ service
 * worker + xoá toàn bộ cache rồi nạp lại kèm tham số chống cache.
 */
async function taiLaiSach() {
  try {
    if ('serviceWorker' in navigator) {
      const rs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(rs.map((r) => r.unregister()));
    }
    if (window.caches) {
      const ks = await caches.keys();
      await Promise.all(ks.map((k) => caches.delete(k)));
    }
  } catch {}
  location.replace(location.pathname + '?moi=' + Date.now());
}

function chepChanDoan() {
  const ta = document.getElementById('cd-txt'); if (!ta) return;
  const xong = () => toast('Đã sao chép — dán vào chat giúp nhé.');
  (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject())
    .then(xong).catch(() => { try { ta.style.left = '0'; ta.select(); document.execCommand('copy'); ta.style.left = '-9999px'; xong(); } catch { toast('Không sao chép được — chụp màn hình giúp nhé.'); } });
}

/**
 * THƯỚC ĐO TRỰC QUAN — chỉ hiện ở chế độ PWA (21/09).
 *
 * Sau sáu đợt sửa mà chủ dự án vẫn thấy khoảng trắng, cần một phép thử trả lời DỨT ĐIỂM một câu
 * hỏi: khoảng trắng đó NẰM TRONG hay NẰM NGOÀI khung nhìn của trang?
 *
 *   - Vạch HỒNG được vẽ đúng đáy khung nhìn (`position: fixed; bottom: 0`). Nếu trong ảnh chụp
 *     vạch hồng nằm SÁT đáy màn hình -> khung nhìn phủ kín, khoảng trắng nằm TRONG trang, sửa
 *     được bằng CSS.
 *   - Nếu vạch hồng nằm CAO HƠN đáy màn hình -> iOS đã co khung nhìn lại, phần dưới vạch KHÔNG
 *     THUỘC VỀ trang; không CSS/JS nào trong trang vẽ được vào đó và hướng sửa phải khác hẳn
 *     (đổi màu nền, hoặc đổi cấu hình PWA).
 *   - Dải ĐỎ (nếu có) là khoảng hở đo được giữa đáy thanh điều hướng và đáy khung nhìn.
 *
 * Người dùng chỉ cần chụp màn hình bình thường. Có nút ✕ để tắt, nhớ trong localStorage.
 */
/**
 * ÉP iOS TÍNH LẠI KHUNG NHÌN (21/09).
 *
 * Đo trên iPhone 15 Pro Max thật ở chế độ PWA: màn hình cao 932 nhưng khung nhìn của trang
 * (`documentElement.clientHeight`) chỉ 678 — iOS co mất 254px và không tự mở lại. Phần dưới đó
 * KHÔNG thuộc về trang: không CSS/JS nào trong trang vẽ vào được, nên nó hiện ra thành dải trắng
 * (iOS tô bằng màu nền của `html`).
 *
 * Mẹo chuẩn để buộc WebKit tính lại: đổi nhẹ `content` của thẻ meta viewport rồi trả lại ngay.
 * Chỉ chạy khi thật sự phát hiện co (khung nhìn hụt hơn 8px so với cạnh dài màn hình) và tối đa
 * 3 lần, để không rơi vào vòng lặp đổi meta liên tục.
 */
let _epViewport = 0;
function epTinhLaiViewport() {
  try {
    if (!laStandalone() || _epViewport >= 3) return;
    const de = document.documentElement;
    const man = Math.max(screen.width, screen.height);
    if (!man || de.clientHeight >= man - 8) return;      // đã phủ kín màn hình
    const mv = document.querySelector('meta[name="viewport"]');
    if (!mv) return;
    const goc = mv.getAttribute('content') || '';
    _epViewport++;
    mv.setAttribute('content', goc + ', minimal-ui');
    setTimeout(() => {
      mv.setAttribute('content', goc);
      setTimeout(() => { capNhatChieuCaoKhung(); buKhoangHoDay(); veThuocDo(); }, 60);
    }, 60);
  } catch {}
}

function veThuocDo() {
  try {
    if (!laStandalone()) return;
    // MẶC ĐỊNH TẮT (21/09, sau khi đã tìm ra nguyên nhân). Nó che mất nội dung nên chỉ bật khi cần
    // chẩn đoán: mở "Kiểm tra hiển thị màn hình" trong menu rồi bấm "Hiện thước đo".
    if (localStorage.getItem('tw_thuoc_do') !== '1') return;
    document.getElementById('tw-thuoc-do')?.remove();

    const nav = document.querySelector('.mobile-nav');
    const nb = nav && getComputedStyle(nav).display !== 'none' ? nav.getBoundingClientRect() : null;
    const de = document.documentElement;
    const layout = de.clientHeight;                      // layout viewport — mốc mà `fixed` neo vào
    const shell = document.querySelector('.app-shell')?.getBoundingClientRect();
    // Hở tính theo LAYOUT VIEWPORT, không theo innerHeight: `fixed` và `height:100%` đều neo vào
    // layout viewport, nên đó mới là mốc trang vẽ được tới.
    const ho = nb ? Math.round(layout - nb.bottom) : 0;
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;padding-bottom:env(safe-area-inset-bottom)';
    document.body.appendChild(t);
    const envDuoi = Math.round(parseFloat(getComputedStyle(t).paddingBottom) || 0);
    const envTren0 = Math.round(parseFloat(getComputedStyle(t).paddingTop) || 0);   // giá trị THẬT
    const envTren = envTren0 || 59;                                                  // để tính cảnh báo
    t.remove();
    const manCao = Math.max(screen.width, screen.height);
    // Bốn đơn vị chiều cao của CSS có thể KHÁC nhau trên iOS. Nếu cái nào bằng đúng chiều cao màn
    // hình thì đó là đơn vị cần dùng để khung app phủ kín.
    const dv = (u) => { const d = document.createElement('div');
      d.style.cssText = `position:fixed;left:-9999px;top:0;width:1px;height:100${u}`;
      document.body.appendChild(d); const h = Math.round(d.getBoundingClientRect().height); d.remove(); return h; };
    const donVi = ['vh', 'dvh', 'svh', 'lvh'].map((u) => `${u} ${dv(u)}`).join(' · ');
    // iOS luôn dành riêng phần thanh trạng thái (khoảng 59px trên máy có Dynamic Island) khi PWA
    // không chạy ở chế độ trong suốt — đó là bình thường, không phải lỗi. Chỉ cảnh báo khi hụt
    // NHIỀU HƠN thế.
    const coCoViewport = layout < manCao - envTren - 8;

    const box = document.createElement('div');
    box.id = 'tw-thuoc-do';
    box.innerHTML =
      (ho > 0 ? `<div style="position:fixed;left:0;right:0;bottom:4px;height:${ho}px;background:rgba(225,29,72,.55);z-index:99998;pointer-events:none"></div>` : '') +
      `<div style="position:fixed;left:0;right:0;bottom:0;height:4px;background:#FF00AA;z-index:99999;pointer-events:none"></div>` +
      `<div style="position:fixed;left:0;right:0;top:0;height:4px;background:#00C853;z-index:99999;pointer-events:none"></div>` +
      `<div style="position:fixed;left:6px;right:6px;bottom:${(nb ? Math.round(nb.height) : 0) + Math.max(ho, 0) + 8}px;z-index:99999;
         background:rgba(255,255,255,.95);color:#111;border:2px solid #FF00AA;border-radius:8px;
         padding:6px 8px;font:600 11px/1.45 ui-monospace,Menlo,monospace">
         <b>THƯỚC ĐO</b> · <span style="color:#00A040">xanh = ĐỈNH</span> · <span style="color:#FF00AA">hồng = ĐÁY</span> khung nhìn<br>
         ${donVi}<br>
         màn cao ${manCao} · <b>layout ${layout}</b> · inner ${innerHeight} · vv ${window.visualViewport ? Math.round(visualViewport.height) : '-'}<br>
         tw-vh ${getComputedStyle(de).getPropertyValue('--tw-vh').trim() || '-'} · shell ${shell ? Math.round(shell.height) : '-'} (đáy ${shell ? Math.round(shell.bottom) : '-'})<br>
         env trên <b>${envTren0}</b> · env dưới ${envDuoi} · nav cao ${nb ? Math.round(nb.height) : '-'} · <b style="color:#B91C1C">hở ${ho}</b><br>
         ${dv('vh') >= manCao - 2 && layout < manCao - 2
           ? '<b style="color:#047857">vh = màn hình → khung app đang dùng 100vh</b>'
           : 'khung nhìn hụt ' + (manCao - layout) + 'px so với màn hình'}<br>
         ${coCoViewport ? '<b style="color:#B91C1C">iOS CO KHUNG NHÌN ' + (manCao - layout) + 'px</b> · ' : ''}bản ${([...document.querySelectorAll('script[src]')].map((s) => s.src.split('/').pop()).find((n) => /^main-/.test(n)) || '-')}
         <button onclick="window.app.tatThuocDo()" style="float:right;margin-left:8px;border:0;background:#111;color:#fff;border-radius:4px;padding:2px 8px;font-weight:700">✕</button>
       </div>`;
    document.body.appendChild(box);
  } catch {}
}
let _thuocDoHen = 0;
function theoDoiThuocDo() {
  if (!laStandalone() || _thuocDoHen) return;
  let n = 0;
  _thuocDoHen = setInterval(() => { veThuocDo(); if (++n > 24) { clearInterval(_thuocDoHen); _thuocDoHen = -1; } }, 500);
}

function tatThuocDo() {
  if (_thuocDoHen > 0) clearInterval(_thuocDoHen);
  _thuocDoHen = -1;
  try { localStorage.setItem('tw_thuoc_do', '0'); } catch {}
  document.getElementById('tw-thuoc-do')?.remove();
}

/** Bật thước đo trực quan (chỉ dùng khi cần chẩn đoán màn hình). */
function batThuocDo() {
  try { localStorage.setItem('tw_thuoc_do', '1'); } catch {}
  _thuocDoHen = 0;
  closeDialog();
  veThuocDo();
  theoDoiThuocDo();
}

function dangKyServiceWorker() {
  try {
    if (laNative() || import.meta.env.DEV || !('serviceWorker' in navigator)) return;
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .catch((e) => console.warn('Không đăng ký được service worker:', e));
    });
  } catch { /* trình duyệt cũ: bỏ qua, web vẫn chạy như thường */ }
}

async function init() {
  // Sổ tay từ vựng: nạp từ localStorage trước mọi thứ (renderer nào cũng có thể hỏi tới),
  // rồi chuyển nốt dữ liệu của bản cũ (mảng id số) sang khoá chữ Hán — xem 4.37.
  soTayNap();
  soTayChuyenDoiCu(vocabularyData);
  // Bộ đo hoạt động học (4.38) — chỉ đếm khi tab đang hiện và có thao tác; tự bỏ qua khi
  // chưa đăng nhập. Bật một lần duy nhất, `init()` cũng chỉ được gọi một lần (xem 4.2).
  nhipBatDau();
  // Bản chụp quyền nội dung (2026-09-09) — chạy nền, không chặn bước nào của init().
  napQuyenNoiDung();

  // Check for email verification query params
  const urlParams = new URLSearchParams(window.location.search);
  const verified = urlParams.get('verified');
  if (verified === 'true') {
    setTimeout(() => alert('Xác nhận email thành công! Bạn có thể đăng nhập ngay bây giờ.'), 500);
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  } else if (verified === 'invalid') {
    setTimeout(() => alert('Link xác nhận không hợp lệ hoặc đã hết hạn.'), 500);
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }

  // Khôi phục user state từ api Client
  if (api.isLoggedIn && api.user) {
    state.isLoggedIn = true;
    state.user = {
      name: api.user.name,
      email: api.user.email || '',
      level: api.user.level_label || 'Tân Sinh · Lv1',
      avatar: api.user.avatar_letter || api.user.name.charAt(0),
      avatarColor: api.user.avatar_color || '#027AB3',
      avatarUrl: api.user.avatar_url || null,
      streak: api.user.streak || 0,
      longestStreak: api.user.longest_streak || 0,
      points: api.user.points || 0,
      wordsToReview: 0,
      charMode: api.user.char_mode || 'traditional',
      is_admin: !!api.user.is_admin,
      is_approved: !!api.user.is_approved,
    };
    state.charMode = api.user.char_mode || 'traditional';
  }
  theoDoiChieuCaoKhung();
  // Đang chạy như app từ màn hình chính -> lộ mục "Kiểm tra hiển thị" ở đáy menu (chỉ chế độ này
  // mới có lỗi viewport riêng của iOS, và cũng chỉ ở đây mới không gõ được URL để mở trang đo).
  if (laStandalone()) document.documentElement.classList.add('tw-standalone');
  renderSidebar();
  updateSidebarAuth();
  updateHeaderAvatar();
  setupDictSearch();
  batActiveTrenCamUng();
  bootRouter();

  // APP NATIVE (iOS/Android): nạp lớp native — rung phản hồi khi chấm bài, nút Back của Android,
  // báo mất mạng, chia sẻ qua khay hệ thống, dừng audio khi app vào nền. Nạp ĐỘNG và chỉ khi
  // đang thật sự chạy trong app, nên bundle web không phải mang theo một byte nào của Capacitor.
  // Hỏng ở đây KHÔNG được làm chết app: thiếu phần rung thì vẫn học được như thường.
  if (laNative()) {
    import('./native/index.js')
      .then((m) => m.khoiTaoNative())
      .catch((e) => console.warn('Không nạp được lớp native:', e));
  }
  dangKyServiceWorker();

  // Load real data from API (async, re-renders when done)
  loadApiData();

  // Tải sẵn BÀI 1 quyển 1 Đương đại lúc trình duyệt rảnh: gần như ai cũng mở nó đầu tiên, nên
  // bấm vào là có ngay, không nháy khung xương. Chỉ một bài (~30 KB) chứ không phải cả quyển —
  // chạy trong requestIdleCallback nên không tranh băng thông với thứ đang hiện trên màn hình.
  napFontHan();

  // Bỏ qua khi máy đang ở chế độ tiết kiệm dữ liệu hoặc mạng 2G/3G — ở đó ~100 KB (đã nén)
  // tải sẵn lại tranh băng thông với chính trang đang mở, lợi bất cập hại.
  const net = navigator.connection || {};
  const mangYeu = net.saveData === true || /2g|3g/.test(net.effectiveType || '');
  if (!mangYeu) {
    const ranh = window.requestIdleCallback || ((f) => setTimeout(f, 2500));
    ranh(() => { napNgam('duongdai', ['1']); }, { timeout: 6000 });
  }
}

/**
 * Những trang KHÔNG đọc dữ liệu API dùng chung (vocabulary / leaderboard / dialogues / blog):
 * nội dung của chúng là file tĩnh, nên đừng dựng lại DOM khi loadApiData() xong.
 * Sót một trang ở đây chỉ khiến nó vẽ lại như trước — không hỏng gì.
 */
const TRANG_KHONG_CAN_API = new Set([
  'path-kiemtra',
  'tocfl-thoidai',
  'pron-thanhmau', 'pron-vanmau', 'pron-thanhdieu', 'pron-bangphienam',
  'exam', 'exam-taking',
  // Trang nạp động: chúng đọc file tĩnh trong /data hoặc TỰ gọi API riêng, không đụng
  // vocabularyData/leaderboardData. Thiếu chúng ở đây thì `loadApiData()` xong lại navigate()
  // một lần nữa -> mỗi trang gọi API chính ĐÚNG HAI LẦN, cộng một nhịp nháy khung xương và
  // mất vị trí cuộn.
  'dictionary', 'notebook', 'radicals',
  'path-overview', 'path-today', 'path-homework', 'path-progress', 'path-achievements',
  'account-profile', 'account-settings', 'account-notifications', 'account-duhoc',
]);

/**
 * 3 trang của nhóm "Từ vựng & Hán tự" hiển thị trạng thái đã-lưu của sổ tay. Sổ tay chỉ được
 * gộp với tài khoản trong `soTayDongBo()` (chạy giữa `loadApiData`), tức SAU khi trang đã vẽ.
 * Trước đây chúng ăn ké lần `navigate()` vô điều kiện ở cuối `loadApiData` để cập nhật; nay
 * lần đó đã bỏ nên phải vẽ lại có chủ đích — vẽ TẠI CHỖ, không dựng lại cả app.
 */
const TRANG_THEO_SO_TAY = new Set(['dictionary', 'notebook', 'radicals']);

/** Vẽ lại một trang nạp động tại chỗ. Không đụng history, không nháy khung xương. */
function veLaiTrangNapDong(page) {
  if (!moduleSanSang(page)) return;
  const el = document.getElementById('page-content');
  if (el) _daNapModule.get(MODULE_TRANG[page]).render[page](el);
}

/**
 * FONT CHỮ HÁN (Noto Serif TC/SC) — nạp SAU, không nằm trong đường tải chặn (CLAUDE.md 4.32).
 *
 * Google Fonts chia font CJK thành ~100 subset theo unicode-range. Một trang từ vựng có vài
 * trăm chữ Hán khác nhau nên kéo về 34 file / 1,25 MB — nhiều gấp 12 lần toàn bộ JS của app.
 * Font file không chặn render (Google Fonts đặt `font-display: swap`), NHƯNG trên 4G nó bão hoà
 * đường truyền suốt 6-7 giây, làm mọi thứ khác tải cùng lúc chậm theo. Đó mới là chỗ đau.
 *
 * Nên: chữ Hán hiện NGAY bằng font hệ thống (`--font-chinese-tc` đã khai PingFang TC trên
 * Apple, Microsoft JhengHei trên Windows — đều là font CJK chất lượng tốt), còn webfont tải
 * lúc trình duyệt rảnh.
 *
 * Lần ghé sau thì font đã nằm trong cache HTTP, nên cờ `tw_font_han` cho phép chèn NGAY từ đầu:
 * lấy đúng bản đẹp mà không tốn thêm một byte nào. Cache miss cũng không sao — `font-display:
 * swap` đảm bảo chữ vẫn hiện bằng font hệ thống trong lúc chờ.
 *
 * Đừng đưa hai họ font này trở lại `<link>` trong index.html.
 */
const FONT_HAN_URL = 'https://fonts.googleapis.com/css2'
  + '?family=Noto+Serif+TC:wght@400;700&family=Noto+Serif+SC:wght@400;700&display=swap';
function napFontHan() {
  if (document.getElementById('font-han')) return;
  let daCache = false;
  try { daCache = localStorage.getItem('tw_font_han') === '1'; } catch (e) { /* private mode */ }

  const chen = () => {
    if (document.getElementById('font-han')) return;
    const l = document.createElement('link');
    l.id = 'font-han';
    l.rel = 'stylesheet';
    l.href = FONT_HAN_URL;
    l.onload = () => { try { localStorage.setItem('tw_font_han', '1'); } catch (e) { /* ignore */ } };
    document.head.appendChild(l);
  };

  if (daCache) { chen(); return; }          // đã có trong cache -> dùng luôn, không tốn mạng

  // Lần đầu: chỉ tải khi mạng cho phép. Trên 2G/3G hoặc chế độ tiết kiệm dữ liệu thì font hệ
  // thống là lựa chọn đúng — 1,25 MB cho một khác biệt thẩm mỹ là cái giá quá đắt.
  const net = navigator.connection || {};
  if (net.saveData === true || /2g|3g/.test(net.effectiveType || '')) return;
  const ranh = window.requestIdleCallback || ((f) => setTimeout(f, 3000));
  ranh(chen, { timeout: 8000 });
}

// ============================================================
// API DATA LOADER — fetches real data and normalizes field names
// ============================================================
async function loadApiData() {
  try {
    // Load vocabulary, leaderboard, dialogues, blog in parallel
    const [vocabRes, lbRes, dlgRes, blogRes] = await Promise.allSettled([
      api.getVocabulary({ limit: 500 }),
      api.getLeaderboard(50),
      api.getDialogues(),
      api.getBlogPosts(),
    ]);

    // Normalize vocabulary: API uses example_hanzi/example_meaning, mock uses example/exMeaning
    if (vocabRes.status === 'fulfilled' && vocabRes.value.vocabulary) {
      vocabularyData = vocabRes.value.vocabulary.map(w => ({
        ...w,
        example: w.example_hanzi || w.example || '',
        exMeaning: w.example_meaning || w.exMeaning || '',
      }));
    }

    // Normalize leaderboard: API uses avatar_letter/avatar_color/points/level_label, mock uses avatar/color/score/level
    if (lbRes.status === 'fulfilled' && lbRes.value.leaderboard) {
      leaderboardData = lbRes.value.leaderboard.map((u, i) => ({
        rank: i + 1,
        name: u.name,
        level: u.level_label || `Lv${u.level_num}`,
        score: u.points,
        streak: u.streak || 0,
        avatar: u.avatar_letter || u.name.charAt(0),
        color: u.avatar_color || '#027AB3',
      }));
    }

    // Normalize dialogues: API returns flat list + separate lines endpoint, mock has lines inline
    if (dlgRes.status === 'fulfilled' && dlgRes.value.dialogues) {
      const apiDialogues = dlgRes.value.dialogues;
      const detailPromises = apiDialogues.map(d => api.getDialogue(d.id));
      const detailResults = await Promise.allSettled(detailPromises);
      dialogueData = apiDialogues.map((d, i) => {
        const detail = detailResults[i];
        const lines = (detail.status === 'fulfilled' && detail.value.lines) ? detail.value.lines.map(l => ({
          speaker: l.speaker,
          name: l.speaker_name,
          hanzi: l.hanzi,
          pinyin: l.pinyin,
          meaning: l.meaning,
        })) : [];
        return {
          id: d.id,
          title: d.title,
          titleCn: d.title_cn,
          level: d.level,
          lines,
        };
      });
    }

    // Normalize blog: API uses published_at (date string), mock uses date (formatted)
    if (blogRes.status === 'fulfilled' && blogRes.value.posts) {
      blogData = blogRes.value.posts.map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt || '',
        date: p.published_at ? new Date(p.published_at).toLocaleDateString('vi-VN') : '',
        category: p.category || '',
        emoji: p.emoji || '📝',
      }));
    }

    // Gộp sổ tay của máy vào tài khoản (và ngược lại). Không nuốt lỗi im lặng — bản
    // localStorage vẫn dùng được, nhưng phải biết là chưa đồng bộ được.
    if (state.isLoggedIn) await soTayDongBo();

    state.dataLoaded = true;
    // Vẽ lại trang hiện tại bằng dữ liệu thật — NHƯNG chỉ những trang thật sự dùng nó.
    // Trước đây gọi navigate() vô điều kiện: đang đọc bài giáo trình (10.000 chữ) hay trang
    // Học phát âm thì ~1 giây sau cả trang bị dựng lại từ đầu, mất vị trí cuộn và nháy một
    // nhịp, trong khi mấy trang đó chẳng đọc vocabularyData/leaderboardData/blogData gì cả.
    if (!TRANG_KHONG_CAN_API.has(state.currentPage)) navigate(state.currentPage);
    else if (TRANG_THEO_SO_TAY.has(state.currentPage)) veLaiTrangNapDong(state.currentPage);
  } catch (err) {
    console.warn('API data load failed, using mock data:', err);
  }
}

function updateSidebarAuth() {
  const loginBtn = document.getElementById('btn-login-sidebar');
  if (!loginBtn) return;
  if (state.isLoggedIn) {
    loginBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i><span>Đăng xuất</span>`;
    loginBtn.onclick = () => window.app.logout();
    fetchNotifications();
  } else {
    loginBtn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i><span>Đăng nhập</span>`;
    loginBtn.onclick = () => window.app.openAuth();
    // Đăng xuất: xoá sạch thông báo của người vừa đăng xuất, đừng để lộ sang phiên sau.
    notifState.list = [];
    renderNotifications();
  }
}

// ============================================================
// ROUTER — History API, URL dạng đường dẫn (không dùng hash)
//
// Quy tắc:
//   · Cái gì ĐỔI NỘI DUNG trang  -> nằm trong path   (/…/bai-5-2/flashcard)
//   · Cái gì chỉ LỌC / SẮP XẾP   -> nằm trong query  (?nhom=3, ?loc=saved)
//   · Đổi page / đổi bài   -> pushState    (Back lùi đúng 1 bước)
//   · Đổi filter / đổi tab -> replaceState (không làm ngập history)
//
// Trang nào có tham số riêng thì khai báo 1 entry trong PAGE_PARAMS:
//   read(segs, query)  đọc URL -> ghi vào state  (LUÔN gọi TRƯỚC khi render)
//   write()            đọc state -> trả { segs, query } để dựng lại URL
// ============================================================
const SITE_ORIGIN = 'https://taiwanese-mu.vercel.app';

// Slug tab của Giáo trình Đương đại — URL đọc được thay vì id tiếng Anh
const DD_TAB_SLUG = {
  vocab: 'tu-vung', flashcard: 'flashcard', grammar: 'ngu-phap', dialogue: 'hoi-thoai',
  translate: 'dich-trung-viet', exercise: 'bai-tap', writing: 'luyen-viet', game: 'game',
};
const DD_SLUG_TAB = Object.fromEntries(Object.entries(DD_TAB_SLUG).map(([k, v]) => [v, k]));


// Spec dùng chung cho hai trang giáo trình (Đương đại / Thời Đại) — nguồn dữ liệu do TB() quyết
// định, ddState.tb đã được navigate() đặt trước khi read() chạy.
const GIAO_TRINH_PARAMS = {
    read(segs, query) {
      // /tocfl/giao-trinh-duong-dai/bai-5-2/flashcard          (quyển 1 — giữ nguyên URL cũ)
      // /tocfl/giao-trinh-duong-dai/quyen-2/bai-5-2/flashcard  (quyển 2-4, xem TB().books.js)
      // Mục "Văn Hóa Trung Hoa" có URL riêng /bai-5-van-hoa (id nội bộ "5.vh" / "2-5.vh") — đứng
      // riêng dưới bài x.1/x.2, KHÔNG có tab nào đi kèm nên cũng không đọc slug tab cho nó.
      const { book, subId, rest } = TB().segsToSub(segs);
      if (subId && subId.endsWith('.vh')) {
        if (TB().culture.some(c => c.id === subId)) {
          ddState.selectedSub = subId;
          ddState.openLessons.add(subId.slice(0, -3));
          return;
        }
      }
      // /quyen-2 không kèm bài -> mở bài 1.1 của quyển đó (Thời Đại luôn có tiền tố 'td').
      const rawSub = subId || (ddState.tb === 'hsk' ? `hsk${book}-1.1`
        : ddState.tb === 'thoidai' ? `td${book}-1.1`
        : (book !== 1 ? `${book}-1.1` : ''));
      if (rawSub && TB().subs.some(x => x.id === rawSub) && ddState.selectedSub !== rawSub) {
        ddState.selectedSub = rawSub;
        ddState.fcIdx = 0;
        ddState.fcFlipped = false;
        ddState.order = null;
      }
      const lessonKey = ddParentKey(ddState.selectedSub);
      if (lessonKey) ddState.openLessons.add(lessonKey);

      const rawTab = rest[0] || '';
      const tabId = DD_SLUG_TAB[rawTab] || rawTab;
      if (TB().tabs.some(t => t.id === tabId)) ddState.activeTab = tabId;

      // ?review=<exercise_result_id> — link giáo viên mở từ Quản lý lớp để xem lại 1 lần nộp bài cụ thể
      // (xem ddRenderExercise). Đọc ở đây (query truyền vào read() luôn phản ánh URL thật lúc gọi
      // navigate/bootRouter) vì write() bên dưới sẽ dựng lại URL KHÔNG có review nếu không đọc trước.
      if (query && query.get && query.get('review')) ddState.reviewExerciseId = query.get('review');

      // segs[2] — MÀN đang xem trong tab Bài tập, để Back/mở lại URL không rơi về màn giới thiệu
      // (2026-09-04): 'trac-nghiem' | 'luyen-tap-tong-hop' | (không có) = màn giới thiệu.
      // Có review đang xử lý riêng ở trên rồi (ex.phase tự thành 'submitted'), không đụng vào đây.
      if (tabId === 'exercise' && !ddState.reviewExerciseId) {
        const view = rest[1] || '';
        ddState.onllang.open = view === 'luyen-tap-tong-hop';
        if (view === 'trac-nghiem') {
          if (ddState.exercise.phase === 'idle' && state.isLoggedIn) {
            // Link chia sẻ/Back trỏ thẳng vào 1 lượt làm bài — câu hỏi luôn sinh ngẫu nhiên nên
            // không phục hồi được ĐÚNG bộ câu cũ, tự bắt đầu 1 lượt MỚI để link vẫn "chạy" được
            // thay vì rơi về màn giới thiệu. Bắt buộc kiểm tra đăng nhập ở đây — nếu không, link
            // chia sẻ sẽ cho khách vào thẳng bài làm, vượt qua tường đăng nhập của màn giới thiệu.
            // Chỉ đổi STATE (_ddExBatDauLuot), KHÔNG gọi ddExStart(): read() chạy TRƯỚC khi trang
            // dựng lại DOM, ddExStart() lại tự ghi URL + render — làm 2 lần trùng bước của chính
            // navigate() đang xử lý dở, và render vào #dd-tab-content lúc đó vẫn là null.
            _ddExBatDauLuot();
          }
        } else if (ddState.exercise.phase !== 'idle') {
          // URL đang nói "màn giới thiệu" (không có segs[2]) nhưng state vẫn còn nhớ lượt làm
          // bài cũ — xảy ra khi bấm Back trình duyệt TỪ màn trắc nghiệm: URL đổi đúng nhưng nếu
          // không đưa state khớp lại, DOM vẫn đứng yên ở bài đang làm dở, coi như Back "không ăn"
          // (bắt được qua Playwright 2026-09-04). Mất luôn câu đang làm dở, chấp nhận được — quay
          // Tiến lại (Forward) sẽ tự sinh 1 lượt MỚI qua nhánh trên, không phục hồi lượt cũ được
          // vì câu hỏi vốn sinh ngẫu nhiên, y hệt hạn chế đã có sẵn khi F5 giữa chừng bài làm.
          _ddExVeLaiIdle();
        }
      }
    },
    write() {
      const sub = ddState.selectedSub || (TB().subs[0] || {}).id || '1.1';
      // Bài văn hoá: URL không kèm slug tab. Quyển 2-4 có thêm đoạn /quyen-N phía trước (ddSubSegs).
      if (/\.vh$/.test(String(sub))) return { segs: TB().subSegs(sub), query: {} };
      const tab = ddState.activeTab || 'vocab';
      const q = (tab === 'exercise' && ddState.reviewExerciseId) ? { review: ddState.reviewExerciseId } : {};
      // Đang xem bài đã nộp qua ?review=<id> (link giáo viên) thì giữ nguyên URL không segs[2],
      // đúng dạng admin.js đã dựng sẵn (`/bai-tap?review=123`) — đừng đổi hình dạng URL đó.
      const view = (tab === 'exercise' && !ddState.reviewExerciseId) ? _ddExUrlSeg() : null;
      return { segs: [...TB().subSegs(sub), DD_TAB_SLUG[tab] || tab, view], query: q };
    },
};

const PAGE_PARAMS = {
  'tocfl-thoidai': GIAO_TRINH_PARAMS,

  'pron-vanmau': {
    read(segs, query) { pronState.group.finals = query.get('nhom') || 'all'; },
    write() { const g = pronState.group.finals; return { query: g && g !== 'all' ? { nhom: g } : {} }; },
  },
  'pron-thanhmau': {
    read(segs, query) { pronState.group.initials = query.get('nhom') || 'all'; },
    write() { const g = pronState.group.initials; return { query: g && g !== 'all' ? { nhom: g } : {} }; },
  },


  notebook: {
    read(segs, query) {
      stState.tim = query.get('tim') || '';
      stState.loc = query.get('noi') || 'all';
      stState.sap = query.get('sap') || 'moi';
      stState.tab = ['list', 'flashcard', 'quiz'].includes(query.get('hoc')) ? query.get('hoc') : 'list';
    },
    write() {
      const q = {};
      if (stState.tim) q.tim = stState.tim;
      if (stState.loc !== 'all') q.noi = stState.loc;
      if (stState.sap !== 'moi') q.sap = stState.sap;
      if (stState.tab !== 'list') q.hoc = stState.tab;
      return { query: q };
    },
  },

  // Bộ thủ: mở một bộ = đổi NỘI DUNG -> path segment ('/tu-vung/bo-thu-han-tu/bo-85').
  radicals: {
    read(segs, query) {
      const m = /^bo-(\d{1,3})$/.exec(String(segs[0] || ''));
      const so = m ? Number(m[1]) : 0;
      // Gán DỨT KHOÁT (luôn gán, không phải "gán nếu có") — Back từ chi tiết về lưới phải
      // thật sự đóng chi tiết, nếu không URL đổi mà màn hình đứng yên (bài học 4.21b).
      btState.chon = so >= 1 && so <= 214 ? so : null;
      btState.tim = query.get('tim') || '';
      btState.net = query.get('net') || 'all';
    },
    write() {
      const q = {};
      if (btState.tim) q.tim = btState.tim;
      if (btState.net !== 'all') q.net = btState.net;
      return { segs: btState.chon ? [`bo-${btState.chon}`] : [], query: q };
    },
  },

  // Từ vựng theo cấp TOCFL. segs[0] = cấp ('cap-3' / 'chuan-bi'), segs[1] = tab.
  // Không có segs -> màn chọn cấp. Đổi NỘI DUNG (cấp) -> segs; chỉ lọc/xem -> query.
  'tocfl-vocab': {
    read(segs, query) {
      const cap = TV_SLUG_CAP[segs[0]] || null;
      // Gán DỨT KHOÁT (luôn gán, không phải "gán nếu có") — Back từ màn một cấp về màn chọn cấp
      // phải thật sự xoá cấp đang mở, nếu không URL đổi mà màn hình đứng yên (bài học 4.21b).
      if (cap !== tvState.cap) {
        tvState.cap = cap;
        tvState.fcIdx = 0; tvState.fcFlipped = false; tvState.order = null; tvState.quiz = null;
      }
      tvState.tab = TV_SLUG_TAB[segs[1]] || 'list';
      tvState.tim = query.get('tim') || '';
      tvState.loai = query.get('loai') || 'all';
      tvState.trang = Math.max(1, parseInt(query.get('trang'), 10) || 1);
    },
    write() {
      if (!tvState.cap) return { segs: [], query: {} };
      const q = {};
      if (tvState.tim) q.tim = tvState.tim;
      if (tvState.loai && tvState.loai !== 'all') q.loai = tvState.loai;
      if (tvState.trang > 1) q.trang = String(tvState.trang);
      return { segs: [TV_CAP_SLUG[tvState.cap], TV_TAB_SLUG[tvState.tab] || 'danh-sach'], query: q };
    },
  },



  // Từ điển: URL mang CHÍNH CHỮ HÁN ('/tu-vung/tu-dien/學生') thay cho id số của bản cũ —
  // id số chỉ tồn tại cho 40 từ trong bảng `vocabulary`, không đủ để chia sẻ link tra từ.
  // Link cũ dạng số vẫn mở được: quy về từ tương ứng trong mockData nếu còn khớp.
  dictionary: {
    read(segs, query) {
      const seg = segs[0] ? decodeURIComponent(segs[0]) : '';
      if (!seg) { tdxState.tu = null; tdxState.chiTiet = null; }
      else if (/^\d+$/.test(seg)) {
        const w = vocabularyData.find((x) => String(x.id) === seg);
        tdxState.tu = w ? w.hanzi : null;
        tdxState.chiTiet = null;
      } else if (tdxState.tu !== seg) {
        tdxState.tu = seg;
        tdxState.chiTiet = null;
      }
      tdxState.tim = query.get('tim') || '';
    },
    write() {
      const q = tdxState.tim ? { tim: tdxState.tim } : {};
      return { segs: tdxState.tu ? [tdxState.tu] : [], query: q };
    },
  },

  // Bốn trang cộng đồng dùng CHUNG một spec: mở bài = segment id, lọc = query string.
  // ⚠️ `/cong-dong/blog/<id>` phải giữ nguyên — nó đã nằm trong sitemap và đã được chia sẻ.
  //    Migration cố ý giữ nguyên id khi chuyển 6 bài blog cũ sang bảng mới, nên link cũ vẫn
  //    mở đúng bài (tham số `?chuyen-muc=` của bản cũ thì bỏ, giờ lọc bằng `chu-de`).
  ...Object.fromEntries(['blog', 'community-forum', 'community-vlog', 'community-news'].map((p) => [p, {
    read(segs, query) {
      const id = parseInt(segs[0], 10);
      cdState.moBai = Number.isInteger(id) && id > 0 ? id : null;
      if (!cdState.moBai) cdState.chiTiet = null;
      cdState.chuDe = query.get('chu-de') || 'all';
      cdState.tim = query.get('tim') || '';
      cdState.tab = query.get('loai') || 'all';
      cdState.trang = Math.max(1, parseInt(query.get('trang'), 10) || 1);
    },
    write() {
      const q = {};
      if (cdState.chuDe !== 'all') q['chu-de'] = cdState.chuDe;
      if (cdState.tim) q.tim = cdState.tim;
      if (cdState.tab !== 'all') q.loai = cdState.tab;
      if (cdState.trang > 1) q.trang = String(cdState.trang);
      return { segs: cdState.moBai ? [String(cdState.moBai)] : [], query: q };
    },
  }])),

  'exam': {
    // When URL has segs like /tocfl/thi-thu/band-a/de-1/doc -> auto-start that exam
    read(segs) {
      if (!segs || segs.length < 2) return; // Just /tocfl/thi-thu -> show setup
      const bandSeg = String(segs[0] || '');
      const deSeg   = String(segs[1] || '');
      const typeSeg = String(segs[2] || 'ca-hai');
      const band = bandSeg.replace('band-', '').toUpperCase();
      const de = parseInt(deSeg.replace('de-', ''), 10);
      const skill = typeSeg === 'doc' ? 'reading' : typeSeg === 'nghe' ? 'listening' : 'both';
      if (!band || !de || !['A','B','C'].includes(band)) return;
      if (!state.exam.active) {
        // Bộ đề nạp động (CLAUDE.md 4.30) nên phải CHỜ tải xong mới dựng đề. Bỏ await ở đây thì
        // getTocflQuestions() trả rỗng và deep link im lặng rơi về 8 câu mock của examData.
        napExam().then(() => {
          if (state.exam.active) return;
          _loadTocflExamFromUrl(band, de, skill);
          navigate('exam-taking', { segs: [bandSeg, deSeg, typeSeg] });
        }).catch((e) => { console.warn('Nạp bộ đề thất bại:', e); navigate('exam'); });
      }
    },
    write() { return {}; },
  },

  'exam-taking': {
    // URL: /tocfl/thi-thu/band-a/de-1/doc
    read(segs) {
      // read() for exam-taking is handled via 'exam'.read above on initial load
      // This is only called when navigating to exam-taking programmatically
    },
    write() {
      const { examBand, examDe, examSkill } = state.exam;
      if (!examBand || !examDe) return { segs: [] };
      const bandSeg = 'band-' + examBand.toLowerCase();
      const deSeg   = 'de-' + examDe;
      const typeSeg = examSkill === 'reading' ? 'doc' : examSkill === 'listening' ? 'nghe' : 'ca-hai';
      return { segs: [bandSeg, deSeg, typeSeg] };
    },
  },
};

/** Dựng URL cho một trang. params = { segs: [], query: {} } */
function buildPath(page, params) {
  const base = pagePath[page] || '/';
  const segs = ((params && params.segs) || [])
    .filter(v => v !== null && v !== undefined && v !== '')
    .map(v => encodeURIComponent(String(v)));
  let path = base === '/' ? '/' + segs.join('/') : base + (segs.length ? '/' + segs.join('/') : '');
  if (path.length > 1) path = path.replace(/\/+$/, '');
  if (!path) path = '/';

  const q = new URLSearchParams();
  const qo = (params && params.query) || {};
  Object.keys(qo).forEach(k => {
    if (qo[k] !== null && qo[k] !== undefined && qo[k] !== '') q.set(k, qo[k]);
  });
  const qs = q.toString();
  return path + (qs ? '?' + qs : '');
}

/** Đọc URL hiện tại -> { page, segs, query }. Khớp đường dẫn DÀI NHẤT trước. */
function parseLocation() {
  const parts = location.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  const query = new URLSearchParams(location.search);
  if (!parts.length) return { page: 'dashboard', segs: [], query };
  // Khớp tiền tố DÀI NHẤT trước; phần dư phía sau là tham số của trang.
  // Chỉ xét từ i = 1 trở lên — nếu tụt về '/' thì mọi URL sai đều biến thành trang chủ.
  for (let i = parts.length; i >= 1; i--) {
    const page = pathPage['/' + parts.slice(0, i).join('/')];
    if (page) return { page, segs: parts.slice(i), query };
  }
  // Không khớp route nào -> trang 404 (giữ nguyên URL, gắn noindex)
  return { page: 'not-found', segs: parts, query, notFound: true };
}

/** URL hash cũ (#tocfl-duongdai/5.2/flashcard) -> path mới. null nếu không phải link cũ. */
function legacyHashToPath() {
  const hash = location.hash.replace(/^#\/?/, '');
  if (!hash) return null;
  const parts = hash.split('/').filter(Boolean);
  const page = parts[0];
  if (!page || !pagePath[page]) return null;
  if (page === 'tocfl-duongdai') {
    const sub = parts[1] && TB().subs.some(x => x.id === parts[1]) ? parts[1] : null;
    const tab = parts[2] || null;
    return buildPath(page, {
      segs: [
        sub ? 'bai-' + sub.replace(/\./g, '-') : null,
        tab ? (DD_TAB_SLUG[tab] || tab) : null,
      ].filter(Boolean),
    });
  }
  return buildPath(page, { segs: parts.slice(1) });
}

/** Ghi lại URL theo state hiện tại — gọi sau khi đổi filter / tab / bài */
function updateUrl(opts) {
  const page = state.currentPage;
  const spec = PAGE_PARAMS[page];
  const url = buildPath(page, spec && spec.write ? spec.write() : {});
  if (url !== location.pathname + location.search) {
    if (opts && opts.push) history.pushState({ page }, '', url);
    else history.replaceState({ page }, '', url);
  }
  syncSeoTags(page);
}

/** Cập nhật title + canonical + og theo trang đang xem (cho share link & SEO) */
function syncSeoTags(page) {
  // Trang 404 và màn đang thi không cho Google index
  const noindex = page === 'not-found' || page === 'exam-taking';
  let robots = document.querySelector('meta[name="robots"]');
  if (noindex && !robots) {
    robots = document.createElement('meta');
    robots.setAttribute('name', 'robots');
    document.head.appendChild(robots);
  }
  if (robots) robots.setAttribute('content', noindex ? 'noindex, follow' : 'index, follow');

  const label = pageTitles[page] || 'Tẻn';
  document.title = page === 'dashboard'
    ? 'Tẻn - Nền Tảng Học Tiếng Trung Phồn Thể & Luyện Thi TOCFL'
    : label + ' · Tẻn - Học Tiếng Trung Phồn Thể & Luyện Thi TOCFL';
  const url = SITE_ORIGIN + location.pathname + location.search;
  const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:url"]', 'content', url);
  set('meta[property="og:title"]', 'content', document.title);
}
// ============================================================
// SIDEBAR RENDERING
// ============================================================
function isMenuOpen(id) {
  return state.openMenus.includes(id);
}

function persistOpenMenus() {
  localStorage.setItem('tw_open_menus', JSON.stringify(state.openMenus));
}

// Mở / đóng một nhóm menu cha. Chỉ đổi class để CSS chạy animation,
// KHÔNG render lại sidebar (render lại sẽ làm mất hiệu ứng).
function toggleMenu(id, force) {
  const group = document.querySelector(`.nav-group[data-menu="${id}"]`);
  if (!group) return;
  const open = typeof force === 'boolean'
    ? (group.classList.toggle('open', force), force)
    : group.classList.toggle('open');
  // Nhóm cấp 3 (4 quyển) không có .nav-parent mà có .nav-subcaret — vẫn phải cập nhật aria-expanded.
  const btn = group.querySelector('.nav-parent') || group.querySelector('.nav-subcaret');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  state.openMenus = open
    ? [...new Set([...state.openMenus, id])]
    : state.openMenus.filter(x => x !== id);
  persistOpenMenus();
}

function navLinkHtml(item, isChild) {
  // href thật để Google crawl được, người dùng mở tab mới / copy link được.
  // onclick chặn reload và điều hướng bằng router.
  return `<a class="nav-item${isChild ? ' nav-child' : ''}${state.currentPage === item.id ? ' active' : ''}"
      data-page="${item.id}" href="${pagePath[item.id] || '/'}"
      onclick="event.preventDefault(); window.app.navigate('${item.id}')">
      <i class="${item.icon}"></i>
      <span>${item.label}</span>
    </a>`;
}

/**
 * Mục sidebar cho MỘT cấp/quyển đứng thẳng ở cấp 2 (không lồng trong nhóm cấp 3).
 * Dùng cho sáu cấp HSK. Xem ghi chú trong `navConfig` về việc vì sao KHÔNG có `data-page`.
 */
function navBookLinkHtml(item) {
  const t = TB(item.tb);
  const sanSang = t.lessons.some((l) => l.book === item.bookId && l.total > 0);
  const dangXem = state.currentPage === item.page && ddState.tb === item.tb
    && ddCurrentBook() === item.bookId;
  return `<a class="nav-item nav-child nav-book-lv2${dangXem ? ' active' : ''}${sanSang ? '' : ' is-soon'}"
      data-book="${item.bookId}" data-tb="${item.tb}"
      href="${buildPath(item.page, { segs: ddBookSegs(item.bookId, item.tb) })}"
      title="${item.title}${sanSang ? '' : ' (đang biên soạn)'}"
      onclick="event.preventDefault(); window.app.ddGoBook(${item.bookId}, '${item.tb}')">
      <i class="${item.icon}"></i>
      <span>${item.label}</span>
      ${item.chip ? `<span class="nav-book-lv">${item.chip}</span>` : ''}
    </a>`;
}

// Id nhóm accordion cấp 3 "4 quyển" trong state.openMenus (dùng chung cơ chế với nhóm cha).
const NAV_BOOKS_MENU = 'dd-quyen';

/**
 * Mục sidebar CẤP 3 — 4 quyển Giáo trình Đương đại (2026-09-04).
 *
 * Cả 4 quyển dùng CHUNG page id 'tocfl-duongdai'; quyển chỉ là một đoạn URL (/quyen-2) do
 * PAGE_PARAMS['tocfl-duongdai'].read() đọc. CỐ Ý không khai path riêng cho từng quyển trong
 * navConfig: pathPage sẽ có thêm '/tocfl/giao-trinh-duong-dai/quyen-2', mà parseLocation() khớp
 * tiền tố DÀI NHẤT nên URL '/quyen-2/bai-5-2/flashcard' sẽ bị cắt thành trang khác + mất segs
 * -> vỡ toàn bộ deep link của module.
 *
 * Vì thế link quyển KHÔNG có data-page (có thì updateNavActive tô sáng cả 4 cùng lúc) mà dùng
 * data-book, tô sáng riêng bằng updateNavBooks().
 *
 * Header là 2 phần tử ANH EM trong 1 flex row (link + nút caret), không lồng <button> trong <a>
 * — HTML không cho phép, đúng bài học đã ghi ở CLAUDE.md 4.11b.
 */
function navBooksHtml(item) {
  // Mỗi bộ giáo trình có nhóm quyển RIÊNG (khoá menu riêng) — nếu dùng chung khoá thì bung nhóm
  // này sẽ bung luôn nhóm kia và `active` nhảy sang bộ khác.
  const tbId = item.id === 'tocfl-thoidai' ? 'thoidai' : item.id === 'hsk-30' ? 'hsk' : 'duongdai';
  const menuKey = `${NAV_BOOKS_MENU}-${tbId}`;
  const onPage = state.currentPage === item.id;
  const open = isMenuOpen(menuKey) || onPage;
  const curBook = onPage ? ddCurrentBook() : null;
  return `<div class="nav-group nav-subgroup${open ? ' open' : ''}" data-menu="${menuKey}">
    <div class="nav-child-row">
      ${navLinkHtml(item, true)}
      <button type="button" class="nav-subcaret" aria-expanded="${open}" aria-label="Danh sách quyển"
        onclick="window.app.toggleMenu('${menuKey}')"><i class="fa-solid fa-chevron-down"></i></button>
    </div>
    <div class="nav-children"><div class="nav-children-inner">
      ${TB(tbId).books.map(b => {
        const ready = TB(tbId).lessons.some(l => l.book === b.id && l.total > 0);
        return `
        <a class="nav-item nav-child nav-book${b.id === curBook ? ' active' : ''}${ready ? '' : ' is-soon'}"
          data-book="${b.id}" data-tb="${tbId}" href="${buildPath(item.id, { segs: ddBookSegs(b.id, tbId) })}"
          title="${b.title} — ${b.level}${ready ? '' : ' (đang biên soạn)'}"
          onclick="event.preventDefault(); window.app.ddGoBook(${b.id}, '${tbId}')">
          <i class="fa-solid fa-bookmark"></i>
          <span>${b.label}</span>
          <span class="nav-book-lv">${b.chip || b.level.replace('TOCFL ', '')}</span>
        </a>`;
      }).join('')}
    </div></div>
  </div>`;
}

function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  // Tự mở nhóm chứa trang đang xem
  const activeParent = pageParent[state.currentPage];
  if (activeParent && !state.openMenus.includes(activeParent)) {
    state.openMenus.push(activeParent);
    persistOpenMenus();
  }

  let html = '';
  navConfig.forEach(item => {
    if (item.type === 'group') {
      html += `<div class="nav-group-label">${item.label}</div>`;
    } else if (item.type === 'parent') {
      const open = isMenuOpen(item.id);
      const hasActive = item.children.some(c => c.id === state.currentPage);
      html += `<div class="nav-group${open ? ' open' : ''}" data-menu="${item.id}">
        <button type="button" class="nav-item nav-parent${hasActive ? ' has-active' : ''}"
          aria-expanded="${open}" onclick="window.app.toggleMenu('${item.id}')">
          <i class="${item.icon}"></i>
          <span>${item.label}</span>
          <i class="fa-solid fa-chevron-down nav-caret"></i>
        </button>
        <div class="nav-children"><div class="nav-children-inner">
          ${item.children.map(c => (c.type === 'book' ? navBookLinkHtml(c)
            : c.books ? navBooksHtml(c) : navLinkHtml(c, true))).join('')}
        </div></div>
      </div>`;
    } else {
      html += navLinkHtml(item, false);
    }
  });
  nav.innerHTML = html;
}

// Cập nhật trạng thái active của sidebar + bottom nav (không render lại)
function updateNavActive(page) {
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  document.querySelectorAll('.mnav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  const parentId = pageParent[page];
  document.querySelectorAll('.nav-group[data-menu]').forEach(g => {
    const isCurrent = g.dataset.menu === parentId;
    const btn = g.querySelector('.nav-parent');
    if (btn) btn.classList.toggle('has-active', isCurrent);
    if (isCurrent && !g.classList.contains('open')) toggleMenu(parentId, true);
  });

  // Vào trang giáo trình thì bung sẵn danh sách quyển/cấp của ĐÚNG bộ đó (giống cách nhóm cha
  // tự mở ở trên).
  //
  // ⚠️ Khối này từng là CODE CHẾT: nó tìm `[data-menu="dd-quyen"]` trong khi khoá menu thật đã
  // đổi thành `dd-quyen-<bộ>` từ lúc thêm Thời Đại (4.27) — selector không khớp gì nên không bao
  // giờ bung được, mà cũng không báo lỗi. Sở dĩ Đương đại vẫn thấy mở là nhờ 'dd-quyen-duongdai'
  // nằm sẵn trong giá trị mặc định của `tw_open_menus`, còn Thời Đại thì im lặng không bung.
  const tbCuaTrang = { 'tocfl-duongdai': 'duongdai', 'tocfl-thoidai': 'thoidai', 'hsk-30': 'hsk' }[page];
  if (tbCuaTrang) {
    const key = `${NAV_BOOKS_MENU}-${tbCuaTrang}`;
    const g = document.querySelector(`.nav-group[data-menu="${key}"]`);
    if (g && !g.classList.contains('open')) toggleMenu(key, true);
  }
  updateNavBooks();
}

/**
 * Tô sáng quyển đang xem trong sidebar. Tách khỏi updateNavActive vì đổi quyển KHÔNG đi qua
 * navigate() (ddSelectSub chỉ đổi state rồi render lại) — renderDuongdai() gọi lại hàm này.
 */
function updateNavBooks() {
  const onPage = state.currentPage === 'tocfl-duongdai' || state.currentPage === 'tocfl-thoidai'
    || state.currentPage === 'hsk-30';
  const cur = onPage ? ddCurrentBook() : null;
  document.querySelectorAll('.nav-item[data-book]').forEach(el => {
    // Phải so CẢ bộ giáo trình: hai bộ đều có "Quyển 2", so mỗi số thì tô sáng nhầm bên kia.
    el.classList.toggle('active', onPage && el.dataset.tb === ddState.tb && Number(el.dataset.book) === cur);
  });
}
// ============================================================
// ROUTER
// ============================================================
/** Khởi động router: xử lý link hash cũ, render trang đầu, lắng nghe Back/Forward */
function bootRouter() {
  // Link hash cũ (#pron-vanmau, #tocfl-duongdai/5.2/flashcard) -> đổi sang path mới
  const legacy = legacyHashToPath();
  if (legacy) {
    history.replaceState(null, '', legacy);
  } else if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }

  const route = parseLocation();
  navigate(route.page, { segs: route.segs, query: route.query }, { replace: true });

  // Guard F5 / close tab when exam is active
  window.addEventListener('beforeunload', (e) => {
    if (state.exam.active) {
      e.preventDefault();
      e.returnValue = 'Bạn đang làm bài thi. Thoát ra sẽ mất tiến độ!';
    }
  });

  window.addEventListener('popstate', () => {
    // Guard: if exam is active, confirm before leaving
    if (state.exam.active) {
      const leave = confirm('Bạn đang làm bài thi. Thoát ra sẽ mất tiến độ. Bạn có chắc không?');
      if (!leave) {
        // Push exam URL back to prevent navigation
        const spec = PAGE_PARAMS['exam-taking'];
        const url = buildPath('exam-taking', spec && spec.write ? spec.write() : {});
        history.pushState({ page: 'exam-taking' }, '', url);
        return;
      }
      // User confirmed leaving — stop exam
      clearInterval(state.exam.timerInterval);
      state.exam.active = false;
    }
    const r = parseLocation();
    navigate(r.page, { segs: r.segs, query: r.query }, { silent: true });
  });
}

/**
 * Chuyển trang.
 *   page   id trang trong navConfig
 *   params { segs, query } — tham số muốn đưa lên URL (tuỳ chọn)
 *   opts   { replace, silent }
 *          replace: thay history entry thay vì đẩy thêm (dùng cho redirect)
 *          silent : KHÔNG đụng vào history — dùng khi đang xử lý popstate
 *
 * QUAN TRỌNG: đọc tham số từ URL (applyRouteParams) phải chạy TRƯỚC khi render,
 * và ghi URL phải chạy SAU. Bug cũ làm ngược nên deep link bị xoá sạch segment.
 */
// ============================================================
// CHUYỂN CẢNH (2026-09-06)
// CSS animation KHÔNG tự chạy lại khi chỉ đổi nội dung bên trong cùng một phần tử —
// phải gỡ class, ép trình duyệt tính lại layout (đọc offsetWidth), rồi gắn lại.
// Thiếu bước đọc offsetWidth thì trình duyệt gộp 2 thao tác làm một và animation im lặng
// không chạy — đây là chỗ dễ tưởng "CSS sai" nhất.
// ============================================================
/**
 * Đặt con trượt của thanh tab giáo trình vào đúng nút đang chọn.
 * Đo offsetLeft/offsetTop nên thanh tab xuống 2 hàng vẫn chạy đúng chỗ.
 * Gọi lại sau 400ms ở lần render đầu vì web font tải xong sẽ làm nút rộng ra.
 */
function ddMoveTabInk() {
  const bar = document.querySelector('.dd-tab-bar');
  if (!bar) return;
  const ink = bar.querySelector('.dd-tab-ink');
  if (!ink) return;
  const on = bar.querySelector('.dd-tab-btn.active');
  if (!on) { ink.style.opacity = '0'; return; }
  ink.style.width = on.offsetWidth + 'px';
  ink.style.height = on.offsetHeight + 'px';
  // offsetLeft/offsetTop tính so với chính .dd-tab-bar (nó là position:relative), nên vẫn đúng
  // cả khi thanh tab cuộn ngang — con trượt cuộn theo nội dung, không phải theo khung nhìn.
  ink.style.transform = `translate(${on.offsetLeft}px, ${on.offsetTop}px)`;
  ink.style.opacity = '1';

  // Trên màn hẹp thanh tab là MỘT HÀNG CUỘN NGANG, nên tab đang chọn có thể nằm ngoài tầm nhìn
  // (ví dụ mở thẳng vào tab Game qua liên kết sâu — nó là tab thứ tám). Kéo nó vào giữa để người
  // dùng thấy mình đang ở đâu và biết hai bên còn tab khác.
  if (bar.scrollWidth > bar.clientWidth + 4) {
    const giua = on.offsetLeft - (bar.clientWidth - on.offsetWidth) / 2;
    bar.scrollTo({ left: Math.max(0, giua), behavior: 'smooth' });
  }
  ddCapNhatMoTab(bar);
}

/**
 * Bật/tắt dải mờ ở mép phải thanh tab theo vị trí cuộn.
 * Cuộn tới cuối rồi mà vẫn để dải mờ là nói dối rằng còn tab nữa; hết chỗ cuộn thì bỏ đi.
 * Gắn trình nghe một lần cho mỗi thanh tab (đánh dấu bằng dataset) — `renderDuongdai` dựng lại
 * DOM khá thường xuyên, gắn mỗi lần sẽ chồng hàng chục trình nghe lên cùng một phần tử.
 */
/**
 * Bật/tắt dải mờ báo "còn nhóm bên phải" cho bộ lọc nhóm âm ở các trang Học phát âm.
 * Cùng ý với thanh tab bài học, nhưng ở đây chính phần tử cuộn mang dải mờ (bằng mask) nên chỉ
 * cần thêm/bớt một lớp trên chính nó.
 */
function pronCapNhatMoNhom() {
  for (const el of document.querySelectorAll('.pron-tabs')) {
    const tinh = () => el.classList.toggle('het-nhom',
      el.scrollWidth - el.clientWidth - el.scrollLeft <= 4);
    if (!el.dataset.ganCuon) {
      el.dataset.ganCuon = '1';
      el.addEventListener('scroll', tinh, { passive: true });
    }
    tinh();
  }
}

/**
 * Sau khi đổi tab, GIỮ thanh tab ở nguyên chỗ đang dính thay vì để trang bật về đỉnh.
 *
 * Vì sao cần: nội dung mỗi tab dài ngắn khác nhau. Đang cuộn xuống đọc mà bấm sang tab có nội
 * dung ngắn hơn thì khung cuộn không còn đủ chỗ, trình duyệt ép `scrollTop` về 0, và thanh tab
 * rơi từ chỗ ghim (ngay dưới thanh tiêu đề) xuống vị trí tĩnh của nó — nhìn như cả thanh menu
 * "nhảy xuống dưới". Đo được: y=70 -> y=217 khi bấm Flashcard.
 *
 * `.dd-tab-content` đã có min-height đủ để luôn cuộn được tới mốc này (khai trong style.css);
 * hàm này chỉ việc đưa trang về đúng mốc đó.
 */
function ddGhimThanhTab() {
  const wrap = document.querySelector('.dd-tab-wrap');
  const sc = document.getElementById('page-content');
  if (!wrap || !sc) return;
  // Chỉ ghim khi thanh tab đang thật sự ở chế độ dính (màn hẹp). Trên màn rộng nó nằm trong
  // luồng bình thường, kéo trang xuống ở đó là tự dưng giấu mất phần đầu bài.
  if (getComputedStyle(wrap).position !== 'sticky') return;
  const moc = wrap.offsetTop;
  if (sc.scrollTop > moc) return;          // đang cuộn sâu hơn rồi, để yên
  sc.scrollTo({ top: moc, behavior: 'instant' });
}

function ddCapNhatMoTab(bar) {
  const wrap = bar.parentElement;
  if (!wrap || !wrap.classList.contains('dd-tab-wrap')) return;
  const tinh = () => {
    const conCuon = bar.scrollWidth - bar.clientWidth - bar.scrollLeft;
    wrap.classList.toggle('het-tab', conCuon <= 4);
  };
  if (!bar.dataset.ganCuon) {
    bar.dataset.ganCuon = '1';
    bar.addEventListener('scroll', tinh, { passive: true });
  }
  tinh();
}

function navigate(page, params, opts) {
  const o = opts || {};

  // Dọn dẹp trang trước
  if (state.exam.timerInterval) clearInterval(state.exam.timerInterval);
  htDungKaraoke();   // rời trang -> dừng bản thu, đừng để nhạc chạy tiếp ở trang khác
  if (typeof pronStopSequence === 'function') pronStopSequence();
  // Rời hẳn trang cũng phải dừng game, nếu không timer vẫn chạy nền sau lưng.
  if (typeof _ddGameStopAll === 'function') _ddGameStopAll();
  ddDocDung();
  if (typeof ddDlgState !== 'undefined' && ddDlgState.audio) { ddDlgState.audio.pause(); ddDlgState.audio = null; }

  // Trang chưa có trong bảng route và cũng không phải 404 -> coi như trang chủ
  if (!pagePath[page] && page !== 'not-found') page = 'dashboard';

  // Đang thi mà mở thẳng URL /tocfl/thi-thu/... thì không có đề -> về màn đặt đề (handled by read())
  if (page === 'exam-taking' && !state.exam.active && !(params && params.segs && params.segs.length)) page = 'exam';

  // ĐẾN trang chủ từ nơi khác thì số liệu cũ không còn đáng tin (vừa nộp bài xong chẳng hạn).
  // Bộ nhớ đệm ngắn ở `tcNapSoLieu` chỉ để phục vụ lần vẽ lại ngay sau đó của `loadApiData()`.
  if (page === 'dashboard' && state.currentPage !== 'dashboard') tcQuenCache();

  state.currentPage = page;

  // BA trang giáo trình dùng CHUNG toàn bộ renderer dd* — chỉ khác nguồn dữ liệu, chọn ở đây
  // TRƯỚC read()/write()/render (mọi hàm bên dưới đọc TB() theo ddState.tb).
  if (page === 'tocfl-duongdai' || page === 'tocfl-thoidai' || page === 'hsk-30') {
    const tbMoi = page === 'tocfl-thoidai' ? 'thoidai' : page === 'hsk-30' ? 'hsk' : 'duongdai';
    if (ddState.tb !== tbMoi) {
      ddState.tb = tbMoi;
      // Đổi bộ thì bài đang chọn của bộ cũ vô nghĩa -> về bài đầu của bộ mới (read() bên dưới
      // sẽ ghi đè nếu URL có chỉ định bài cụ thể).
      const dau = TB().subs[0];
      ddState.selectedSub = dau ? dau.id : '';
      ddState.openLessons = new Set(dau ? [dau.parentId] : []);
      ddState.activeTab = 'vocab';
      ddState.order = null;
      ddState.fcIdx = 0;
      ddState.fcFlipped = false;
    }
  }

  // Gate: bắt buộc đăng nhập mới vào được các trang ngoài PUBLIC_PAGES
  // hoặc vào giáo trình nhưng không phải Bài 1 (bài học thử)
  let requireLogin = !PUBLIC_PAGES.has(page);

  // TRANG GIÁO TRÌNH LUÔN VÀO ĐƯỢC, kể cả khi chưa đăng nhập (đổi 2026-09-09).
  // Trước đây khách mở bài ngoài "bài 1 quyển 1" là bị đá thẳng về trang chủ — họ không hiểu vì
  // sao, và ta mất luôn cơ hội mời mua đúng lúc họ đang quan tâm. Nay tường thật nằm ở SERVER
  // (/api/noi-dung/*, kiểm entitlement); giao diện chỉ việc hiện tấm chắn "3 bài đầu miễn phí,
  // bài này cần mở khoá" ngay tại tab đang xem — xem ddKhoaPanelHtml().


  if (requireLogin && !state.isLoggedIn) {
    state.currentPage = 'dashboard';
    page = 'dashboard';
    // Bỏ luôn tham số của trang cũ, nếu không buildPath('dashboard') vẫn ghép segs vào và cho ra
    // URL rác kiểu /bai-5-2/bai-tap (base của dashboard là '/'), F5 lại là rơi vào trang 404.
    params = null;
    setTimeout(() => openAuth(), 300);
  } else if (requireLogin && state.isLoggedIn && !state.user.is_admin && !state.user.is_approved) {
    state.currentPage = 'dashboard';
    page = 'dashboard';
    params = null;
    setTimeout(() => showApprovalContactModal(), 300);
  }

  // 1) Đọc tham số vào state TRƯỚC KHI render
  const spec = PAGE_PARAMS[page];
  if (spec && spec.read) {
    if (params && (params.segs || params.query)) {
      spec.read(params.segs || [], new URLSearchParams(params.query || {}));
    } else {
      const loc = parseLocation();
      spec.read(loc.page === page ? loc.segs : [], loc.page === page ? loc.query : new URLSearchParams());
    }
  }

  // 2) Ghi URL (bỏ qua khi đang xử lý popstate — trình duyệt đã đổi URL rồi;
  //    trang 404 thì GIỮ NGUYÊN URL người dùng gõ, không viết đè)
  if (!o.silent && page !== 'not-found') {
    const url = buildPath(page, spec && spec.write ? spec.write() : (params || {}));
    if (url !== location.pathname + location.search) {
      if (o.replace) history.replaceState({ page }, '', url);
      else history.pushState({ page }, '', url);
    }
  }
  syncSeoTags(page);

  // Cap nhat active + tu mo nhom cha chua trang nay
  updateNavActive(page);

  // Tren mobile: dong drawer sau khi chon menu
  closeMobileSidebar();

  // Cập nhật tiêu đề trang
  document.getElementById('page-title').textContent = pageTitles[page] || 'Tẻn';

  // Render page
  const content = document.getElementById('page-content');
  content.scrollTop = 0;

  switch (page) {
    case 'dashboard': renderDashboard(content); break;
    case 'flashcard': renderFlashcard(content); break;
    case 'exam': renderExamSetup(content); break;
    case 'exam-taking': renderExamTaking(content); break;
    // 3 trang này KHÔNG nằm trong module nạp động — chúng vốn xen giữa 'vocabulary' và
    // 'dictionary' trong switch cũ, và đã bị cắt nhầm lúc gom 14 case lại (4.40). Hậu quả:
    // rơi vào `default: renderDashboard`, tức mở /luyen-tap/trac-nghiem ra lại thấy trang chủ
    // mà URL vẫn đúng nên không ai nhận ra. Đừng gộp chúng vào veTrangNapDong().
    case 'quiz': renderQuiz(content); break;
    case 'dialogue': renderDialogue(content); break;
    case 'shadowing': renderShadowing(content); break;
    // 18 trang dưới đây nằm ở module NẠP ĐỘNG (4.40 · 4.42) — `veTrangNapDong` vẽ khung xương,
    // await import, gắn handler vào window.app rồi mới render.
    case 'vocabulary': case 'dictionary': case 'notebook': case 'radicals':
    case 'path-overview': case 'path-today': case 'path-homework':
    case 'path-progress': case 'path-achievements':
    case 'blog': case 'community-forum': case 'community-vlog':
    case 'community-news': case 'community-scholarship':
    case 'account-profile': case 'account-settings':
    case 'account-notifications': case 'account-membership':
    case 'account-duhoc':
    case 'path-kiemtra':
      veTrangNapDong(page, content); break;
    case 'pron-vanmau': renderPronFinals(content); break;
    case 'pron-thanhmau': renderPronInitials(content); break;
    case 'pron-thanhdieu': renderPronTones(content); break;
    case 'pron-bangphienam': renderPinyinChart(content); break;
    // Bài con + tab đã được PAGE_PARAMS[...].read() nạp vào ddState ở trên; BA bộ giáo trình
    // dùng chung renderer, phân biệt bằng ddState.tb (đặt ở đầu navigate()).
    case 'tocfl-duongdai':
    case 'tocfl-thoidai':
    // Ba trang HSK: khi đang ẩn thì `navigate()` đã đổi `page` thành 'not-found' từ đầu hàm,
    // nên ba nhánh này chỉ chạy khi bật lại.
    case 'hsk-30': renderDuongdai(content); break;
    case 'hsk-vocab': renderHskVocab(content); break;
    case 'hsk-exam': renderHskExam(content); break;
    case 'tocfl-vocab': renderTocflVocab(content); break;
    case 'not-found': renderNotFound(content); break;
    default:
      // Trang mới trong navConfig nhưng chưa có dữ liệu -> màn hình "Sắp ra mắt"
      if (pageTitles[page] && !IMPLEMENTED_PAGES.has(page)) renderComingSoon(content, page);
      else renderDashboard(content);
  }

  // Trang mới trồi lên. Rời trang đang làm bài thì tắt luôn chế độ tập trung,
  // nếu không thanh bên kẹt ở dạng thu nhỏ suốt phiên.
  twFocusMode(false);
  twPlayEnter(content, 'tw-entering');
  // Ghi nhận một lượt mở trang cho bộ đo hoạt động (4.38). Đặt Ở ĐÂY chứ không ở đầu hàm:
  // đầu hàm có thể còn bị tường đăng nhập đá về dashboard, đếm lượt lúc đó là đếm trang
  // người dùng chưa từng thấy.
  nhipDoiTrang(page);
  // Dải mờ "còn nhóm bên phải" của bộ lọc nhóm âm: phải tính lại sau mỗi lần dựng trang, vì
  // số nhóm khác nhau theo từng trang (thanh mẫu 7 nhóm, vận mẫu 7, thanh điệu không có).
  pronCapNhatMoNhom();
}

// ============================================================
// NẠP ĐỘNG THEO ROUTE (4.40)
// ============================================================
// Ba khu tự chứa — Từ vựng & Hán tự · Lộ trình của tôi · Cộng đồng — được tách khỏi `main.js`
// thành module riêng và chỉ tải khi người dùng thật sự mở. Bundle chính nhờ vậy nhẹ đi ~25%.
//
// ⚠️ Ba điều bắt buộc, sai một là hỏng âm thầm:
//   1. `PAGE_PARAMS.read()` chạy TRƯỚC bước này (quy ước 4.2), nên object trạng thái của các
//      trang đó phải nằm ở `core/state.js`, KHÔNG nằm trong module.
//   2. Mọi hàm bị HTML gọi qua `window.app.xxx()` phải có trong `handlers` của module — thiếu
//      một tên là nút bấm im lặng không chạy, lỗi chỉ hiện ở console (quy ước 4.4).
//   3. Nạp hỏng (mất mạng giữa chừng) phải hiện nút thử lại, đừng để màn hình trắng.

const MODULE_TRANG = {
  dictionary: () => import('./pages/tuvung.js'),
  notebook: () => import('./pages/tuvung.js'),
  radicals: () => import('./pages/tuvung.js'),
  'path-overview': () => import('./pages/lotrinh.js'),
  'path-today': () => import('./pages/lotrinh.js'),
  'path-homework': () => import('./pages/lotrinh.js'),
  'path-progress': () => import('./pages/lotrinh.js'),
  'path-achievements': () => import('./pages/lotrinh.js'),
  'account-profile': () => import('./pages/taikhoan.js'),
  'account-settings': () => import('./pages/taikhoan.js'),
  'account-notifications': () => import('./pages/taikhoan.js'),
  'account-duhoc': () => import('./pages/taikhoan.js'),
  'path-kiemtra': () => import('./pages/kiemtra.js'),
};

/** Module đã nạp, khoá theo hàm nạp — bốn trang cùng một module thì chỉ tải một lần. */
const _daNapModule = new Map();

async function napModuleTrang(page) {
  const nap = MODULE_TRANG[page];
  if (!nap) return null;
  if (_daNapModule.has(nap)) return _daNapModule.get(nap);
  const m = await nap();
  // Gắn handler vào window.app NGAY khi có module: HTML do chính module vẽ ra mới gọi tới
  // chúng, mà lúc đó bước này đã xong.
  if (m.handlers) Object.assign(window.app, m.handlers);
  _daNapModule.set(nap, m);
  return m;
}

/** Đã có sẵn trong bộ nhớ chưa — dùng để bỏ qua khung xương khi quay lại trang cũ. */
const moduleSanSang = (page) => _daNapModule.has(MODULE_TRANG[page]);

function veTrangNapDong(page, content) {
  if (moduleSanSang(page)) {
    // Đã nạp rồi thì vẽ THẲNG, không nháy khung xương — đổi qua lại giữa hai trang cùng module
    // mà lần nào cũng chớp một nhịp thì trông như trang bị giật.
    _daNapModule.get(MODULE_TRANG[page]).render[page](content);
    return;
  }
  content.innerHTML = khungXuongTrang();
  napModuleTrang(page).then((m) => {
    // Người dùng có thể đã sang trang khác trong lúc chờ tải.
    if (state.currentPage !== page) return;
    const now = document.getElementById('page-content');
    if (now) { m.render[page](now); twPlayEnter(now, 'tw-entering'); }
  }).catch((e) => {
    console.warn('Không nạp được module trang', page, e);
    const now = document.getElementById('page-content');
    if (now && state.currentPage === page) {
      now.innerHTML = `<div class="tv-empty">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p>Không tải được phần này. Kiểm tra kết nối mạng rồi thử lại.</p>
        <button class="btn btn-primary" onclick="window.app.navigate('${page}')">Thử lại</button>
      </div>`;
    }
  });
}

// ============================================================
// 404 — URL không khớp route nào. Giữ nguyên URL để người dùng thấy mình gõ sai chỗ nào.
// ============================================================
function renderNotFound(el) {
  el.innerHTML = `
    <div class="coming-soon">
      <div class="coming-soon-icon"><i class="fa-solid fa-compass"></i></div>
      <h2 class="coming-soon-title">Không tìm thấy trang</h2>
      <p class="coming-soon-desc">
        Đường dẫn <code>${location.pathname.replace(/</g, '&lt;')}</code> không tồn tại.
        Có thể link đã cũ hoặc bị gõ sai.
      </p>
      <button class="btn-primary" style="margin-top:8px" onclick="window.app.navigate('dashboard')">
        <i class="fa-solid fa-house"></i> Về trang chủ
      </button>
    </div>
  `;
}

// ============================================================
// PLACEHOLDER — trang đã có menu nhưng chưa có dữ liệu
// ============================================================
function renderComingSoon(el, page) {
  el.innerHTML = `
    <div class="coming-soon">
      <div class="coming-soon-icon"><i class="${pageIcons[page] || 'fa-solid fa-screwdriver-wrench'}"></i></div>
      <h2 class="coming-soon-title">${pageTitles[page] || 'Chức năng mới'}</h2>
      <p class="coming-soon-desc">Chức năng đang được xây dựng. Nội dung và dữ liệu sẽ được bổ sung ở bước tiếp theo.</p>
      <span class="coming-soon-badge"><i class="fa-solid fa-hammer"></i> Sắp ra mắt</span>
    </div>
  `;
}

// ============================================================
// DASHBOARD PAGE
// ============================================================

/**
 * ============================================================
 * TRANG CHỦ — viết lại 2026-09-10
 * ============================================================
 * Bản cũ có bốn vấn đề, cả bốn đều im lặng nên rất dễ tưởng là ổn:
 *
 *  1. THẺ CHẾT. "Tiếp tục học" ghi cứng "Chưa có bài học nào gần đây" — không đọc dữ liệu nào
 *     (đã ghi ở CLAUDE.md mục 6). Banner ôn tập cũng chỉ dẫn tới flashcard 40 từ mock, trong khi
 *     phiên ôn SRS thật đã nằm ở /lo-trinh/hom-nay từ 4.38.
 *  2. LAYOUT VỠ. Khối Shadowing thiếu một `</div>` đóng `.section-header`, nên `.dash-right-col`
 *     (hồ sơ + bảng xếp hạng) bị LỒNG vào trong `.dash-main-col`: cột phải 320px của grid trống
 *     suốt 4.226px chiều cao, còn hồ sơ thì rơi xuống tận đáy cột trái. Đo bằng
 *     getBoundingClientRect mới thấy — nhìn ảnh chụp chỉ thấy "hơi nhiều khoảng trắng".
 *  3. SỐ LIỆU SAI/CHẾT. `u.words` không tồn tại trong `state.user` nên ô "từ đã học" luôn là 0;
 *     số liệu kho học liệu chỉ đếm 2/3 bộ giáo trình (thiếu HSK); hub ghi "10 chế độ" nhưng có 8
 *     thẻ, "14.000+ từ TOCFL" trong khi kho thật là 10.927 từ.
 *  4. KHÔNG DẪN ĐI ĐÂU. Mười mấy khu đã làm xong (Lộ trình của tôi, Cộng đồng, Từ điển 122k mục,
 *     Bộ thủ, Thi thử HSK, Gói thành viên) không có lối vào nào từ trang chủ.
 *
 * Nguyên tắc giữ khi sửa tiếp:
 *  · Mọi con số phải suy từ dữ liệu thật — `GIAO_TRINH` (đếm được ngay) hoặc `/lo-trinh/tong-quan`
 *    (số của riêng học viên). Chưa có dữ liệu thì NÓI THẲNG là chưa có, đừng vẽ số 0 cho đẹp.
 *  · Trang chủ vẽ NGAY bằng phần tĩnh rồi mới điền phần động vào `#tc-live` — không để cả trang
 *    chờ một request.
 *  · Khách và học viên là hai bản khác nhau: khách cần biết "có gì ở đây và học thử được không",
 *    học viên cần biết "hôm nay làm gì tiếp".
 */

/** Số liệu KHO HỌC LIỆU đếm thẳng từ danh mục — thêm quyển là số tự đúng, đừng gõ số cứng. */
function tcSoLieuKho() {
  let bai = 0, tu = 0, quyen = 0;
  // CHỈ đếm bộ đang hiện — khoe "435 bài" trong khi chỉ vào được 324 bài là nói sai với khách.
  BO_HIEN().map((id) => GIAO_TRINH[id]).forEach((g) => {
    bai += (g.subs || []).length;
    quyen += (g.books || []).length;
    tu += (g.lessons || []).reduce((s, l) => s + (l.total || 0), 0);
  });
  return { bai, tu, quyen };
}

/**
 * Số liệu của các kho KHÔNG nằm trong `GIAO_TRINH` (chúng là file tĩnh trong public/data,
 * nạp về chỉ để đếm thì tốn hàng trăm KB). Kiểm lại bằng:
 *   node -e "const f=require('fs');let n=0;for(let i=0;i<64;i++)n+=Object.keys(JSON.parse(
 *     f.readFileSync('public/data/tudien/w-'+String(i).padStart(2,'0')+'.json'))).length;console.log(n)"
 *   node -e "console.log(require('./public/data/tudien/bothu.json').length)"
 *   node -e "console.log(Object.keys(require('./public/data/hsk/dethi/index.json')).length)"
 * (đo lại 2026-09-10: 122.596 · 214 · 25 · 14.580 chữ trong chu.json · 18 đề TOCFL)
 */
const TC_KHO = { tuDien: 122596, boThu: 214, chuHan: 14580, deHsk: 25, deTocfl: 18 };

const tcSo = (n) => Number(n || 0).toLocaleString('vi-VN');

/** Bài con đầu tiên của một bộ — dùng cho thẻ "học thử". */
function tcBaiDau(tbId) {
  const t = GIAO_TRINH[tbId];
  return t && t.subs.length ? t.subs[0] : null;
}

/** Mở một bài con bất kể bộ nào (dùng trong onclick của thẻ trang chủ). */
function tcMoBai(subId, tab) {
  const nav = tbNav(subId, tab || DD_TAB_SLUG.vocab);
  navigate(nav.page, { segs: nav.segs });
}

/**
 * Tên để gọi trong lời chào. Người Việt xưng bằng TỪ CUỐI của họ tên ("Nguyễn Văn An" -> "An"),
 * nhưng rất nhiều tài khoản đăng ký bằng nickname có đuôi số ("nganhaa 2509") — lấy từ cuối thì
 * hoá ra chào bằng một dãy số. Đuôi toàn số / quá ngắn thì lùi về từ trước đó.
 */
function tcTenGoi(name) {
  const phan = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!phan.length) return '';
  const cuoi = phan[phan.length - 1];
  if (phan.length > 1 && (/^\d+$/.test(cuoi) || cuoi.length < 2)) return phan[phan.length - 2];
  return cuoi;
}

/**
 * Hero. Khách thấy lời mời + số liệu kho; học viên thấy lời chào + số của chính mình.
 * Ba ô số liệu của học viên mang id để `tcVeLive()` điền lại bằng dữ liệu thật — lúc vẽ lần đầu
 * chỉ có `state.user` (streak/points lấy từ token đăng nhập), còn "bài đã làm" thì phải hỏi server.
 */
function heroHtml() {
  const ten = state.isLoggedIn && state.user ? tcTenGoi(state.user.name) : '';

  let stats;
  if (state.isLoggedIn) {
    const u = state.user || {};
    stats = [
      ['tc-hs-streak', u.streak || 0, 'ngày liên tục'],
      ['tc-hs-bai', '—', 'bài đã làm'],
      ['tc-hs-diem', tcSo(u.points || 0), 'điểm tích luỹ'],
    ];
  } else {
    const k = tcSoLieuKho();
    stats = [
      ['', tcSo(k.bai), 'bài học'],
      ['', tcSo(k.tu), 'từ vựng'],
      ['', 'A1–C1', 'phủ 6 cấp TOCFL'],
    ];
  }

  return `
    <div class="hero-section">
      <div class="hero-text-panel">
        <span class="hero-badge">
          <i class="fa-solid fa-graduation-cap"></i> Tiếng Trung Phồn thể · Luyện thi TOCFL
        </span>
        <h2>${ten
          ? `Chào ${tdEsc(ten)}, <span>học tiếp thôi</span>`
          : `Học tiếng Trung Phồn thể <span>bài bản từ đầu</span>`}</h2>
        <p>${ten
          ? 'Mỗi ngày một chút — hệ thống tự nhắc bạn ôn đúng lúc sắp quên.'
          : 'Giáo trình có giọng đọc thật của sách, ngữ pháp giải thích bằng tiếng Việt, từ điển 122.596 mục và đề thi thử TOCFL.'}</p>
        <div class="hero-actions">
          <button class="hero-cta" onclick="window.app.navigate('${state.isLoggedIn ? 'path-today' : 'tocfl-duongdai'}')">
            ${ten ? 'Hôm nay học gì?' : 'Học thử miễn phí'} <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button class="hero-ghost" onclick="window.app.navigate('exam')">
            <i class="fa-solid fa-file-pen"></i> Thi thử TOCFL
          </button>
        </div>
        <div class="hero-stats">
          ${stats.map(([id, v, l]) => `<div><b${id ? ` id="${id}"` : ''}>${v}</b><span>${l}</span></div>`).join('')}
        </div>
      </div>
      <div class="hero-image-panel"></div>
    </div>`;
}

// ------------------------------------------------------------------ khối dùng chung

/** Tiêu đề mục có icon + link phụ bên phải. */
function tcSectionHtml(icon, ten, linkText, linkPage) {
  return `
    <div class="section-header">
      <h2><span class="section-icon"><i class="${icon}"></i></span>${ten}</h2>
      ${linkText ? `<a class="section-link" onclick="window.app.navigate('${linkPage}')">${linkText} <i class="fa-solid fa-arrow-right"></i></a>` : ''}
    </div>`;
}

/**
 * Lộ trình — 17 quyển của 3 bộ. Bìa vẽ bằng CSS (2 đường dẫn ảnh cũ chưa từng tồn tại, xem 4.25).
 * `daHoc` là Set id bài con đã nộp bài tập; có thì mỗi bìa hiện thêm vòng tiến độ.
 */
function tcRoadmapHtml(daHoc) {
  return BO_HIEN().map((tbId) => {
    const t = GIAO_TRINH[tbId];
    return `
      <div class="roadmap-group">
        <div class="roadmap-group-head">
          <span class="roadmap-group-name">${t.tenDay}</span>
          <span class="roadmap-group-hanzi font-tc">${t.hanzi}</span>
        </div>
        <div class="roadmap-grid">
          ${t.books.map((b) => {
            const ready = t.lessons.some((l) => l.book === b.id && l.total > 0);
            const subs = t.subs.filter((s) => s.book === b.id);
            const xong = daHoc ? subs.filter((s) => daHoc.has(s.id)).length : 0;
            const pt = subs.length ? Math.round((xong / subs.length) * 100) : 0;
            return `
            <div class="roadmap-item" onclick="window.app.ddGoBook(${b.id}, '${tbId}')"
              title="${tdEsc(b.title)} — ${tdEsc(b.level)}${ready ? '' : ' (đang biên soạn)'}">
              <div class="roadmap-cover rm-book${ready ? '' : ' is-soon'}" data-book="${b.id}" data-tb="${tbId}">
                <span class="rm-spine"></span>
                <span class="rm-series font-tc">${t.hanzi}</span>
                <span class="rm-mid">
                  <span class="rm-tap">${t.id === 'hsk' ? 'CẤP' : 'QUYỂN'}</span>
                  <span class="rm-num">${b.id}</span>
                </span>
                <span class="rm-lv">${b.chip || b.level.replace('TOCFL ', '')}</span>
                ${ready ? '' : '<span class="rm-soon">Sắp có</span>'}
                ${xong > 0 ? `<span class="rm-pt"><i style="width:${pt}%"></i></span>` : ''}
              </div>
              <span class="roadmap-label">${t.id === 'hsk' ? b.label : `Quyển ${b.id}`}</span>
              ${xong > 0 ? `<span class="rm-done">${xong}/${subs.length} bài</span>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');
}

/** Lối vào các khu đã làm xong. Trước đây hub trỏ vào 8 thẻ trùng lặp và bỏ quên nửa ứng dụng. */
const TC_HUB = [
  { page: 'exam', icon: 'fa-solid fa-file-pen', title: 'Thi thử TOCFL', desc: '18 đề có audio gốc', cls: 'blue' },
  { page: 'hsk-exam', icon: 'fa-solid fa-list-check', title: 'Thi thử HSK', desc: '25 đề, chấm tự động', cls: 'indigo' },
  { page: 'pron-thanhmau', icon: 'fa-solid fa-volume-high', title: 'Học phát âm', desc: 'Thanh mẫu · vận mẫu · thanh điệu', cls: 'cyan' },
  { page: 'dictionary', icon: 'fa-solid fa-book-open', title: 'Từ điển Trung–Việt', desc: '122.596 mục, tra theo nét', cls: 'sky' },
  { page: 'radicals', icon: 'fa-solid fa-torii-gate', title: '214 bộ thủ', desc: 'Kèm âm Hán Việt', cls: 'rose' },
  { page: 'notebook', icon: 'fa-solid fa-bookmark', title: 'Sổ tay của tôi', desc: 'Lưu từ ở mọi trang', cls: 'teal' },
  { page: 'tocfl-vocab', icon: 'fa-solid fa-layer-group', title: 'Từ vựng theo cấp', desc: '7.517 từ TOCFL, có giọng đọc', cls: 'purple' },
];

function tcHubHtml() {
  return `<div class="hub-grid">
    ${TC_HUB.map((h) => `
      <div class="hub-card ${h.cls}" onclick="window.app.navigate('${h.page}')">
        <div class="hub-card-icon"><i class="${h.icon}"></i></div>
        <h4>${h.title}</h4>
        <p>${h.desc}</p>
      </div>`).join('')}
  </div>`;
}

/**
 * GIỚI THIỆU NGƯỜI DẠY (2026-09-10) — thay khối "Truy cập nhanh" ở bản học viên.
 *
 * Nội dung và hai tấm ảnh lấy từ hồ sơ giới thiệu do chủ dự án cung cấp
 * (`Xin-Chao-Minh-La-Giao-Vien-Hoang-Thi-Tinh.pdf`), rút gọn còn học vấn + thành tích.
 * Ảnh đã cắt và nén sẵn vào `public/images/gv-*.jpg` — KHÔNG hotlink, không nhúng base64.
 *
 * ⚠️ Mọi con số/chức danh ở đây là thông tin CÁ NHÂN có thật, không phải chỗ để "làm đẹp" thêm:
 *    sửa gì thì sửa theo hồ sơ, đừng tự nâng cấp học hàm học vị.
 */
const TAC_GIA = {
  ten: 'Hoàng Thị Tỉnh',
  vai: 'Giáo viên tiếng Trung · Thạc sĩ MBA · Học bổng HES',
  dan: 'Rất vui được đồng hành cùng các bạn trong hành trình chinh phục tiếng Trung — mỗi bài trên Tẻn đều được biên soạn theo đúng lộ trình mình đang dạy trên lớp.',
  hienTai: 'Chuyên viên biên chế Văn phòng Quốc tế — Đại học Quốc lập Cần Ích, Đài Loan',
  moc: [
    { ic: 'fa-solid fa-building-columns', ten: 'Cử nhân Ngôn ngữ', mo: 'Đại học Ngoại ngữ — ĐHQG Hà Nội' },
    { ic: 'fa-solid fa-award', ten: 'Học bổng HES', mo: 'Bộ Giáo dục trao tặng, du học Đài Loan' },
    { ic: 'fa-solid fa-graduation-cap', ten: 'Thạc sĩ MBA', mo: 'ĐH Quốc lập Cần Ích, Đài Loan' },
    { ic: 'fa-solid fa-certificate', ten: 'TOCFL C1 (2023)', mo: 'Kèm chứng chỉ giảng dạy đại học' },
  ],
};

function tcTacGiaHtml() {
  const t = TAC_GIA;
  return `
    <div class="tc-gv">
      <div class="tc-gv-anh">
        <img src="/images/gv-hoang-thi-tinh.jpg" alt="Giáo viên ${tdEsc(t.ten)}" loading="lazy" width="450" height="600">
        <img class="tc-gv-anh2" src="/images/gv-tot-nghiep.jpg" alt="Lễ tốt nghiệp Thạc sĩ tại Đài Loan" loading="lazy" width="420" height="300">
      </div>
      <div class="tc-gv-body">
        <span class="tc-gv-tag"><i class="fa-solid fa-chalkboard-user"></i> Người biên soạn</span>
        <h3>${tdEsc(t.ten)}</h3>
        <p class="tc-gv-vai">${tdEsc(t.vai)}</p>
        <p class="tc-gv-dan"><i class="fa-solid fa-quote-left"></i><span>${tdEsc(t.dan)}</span></p>
        <div class="tc-gv-moc">
          ${t.moc.map((m) => `
            <div class="tc-gv-o">
              <i class="${m.ic}"></i>
              <div><b>${tdEsc(m.ten)}</b><span>${tdEsc(m.mo)}</span></div>
            </div>`).join('')}
        </div>
        <p class="tc-gv-now"><i class="fa-solid fa-location-dot"></i><span>${tdEsc(t.hienTai)}</span></p>
      </div>
    </div>`;
}

/** Hai lối vào thi thử — đặt cạnh nhau vì học viên hay so hai chuẩn thi. */
function tcThiThuHtml() {
  return `
    <div class="tc-exam-row">
      <div class="tc-exam" onclick="window.app.navigate('exam')">
        <div class="tc-exam-head"><span class="tc-exam-tag">TOCFL</span><span class="font-tc">華語文能力測驗</span></div>
        <h4>Thi thử TOCFL</h4>
        <p>${TC_KHO.deTocfl} đề Nghe – Đọc, audio gốc, chấm ngay và ước lượng band.</p>
        <span class="tc-exam-go">Vào thi <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>`;
}

/** Bảng xếp hạng — dùng ở cột phải cho cả khách lẫn học viên. */
function tcLeaderboardHtml() {
  const ds = leaderboardData.slice(0, 20);
  if (!ds.length) return '';
  return `
    <div class="leaderboard-card">
      <div class="leaderboard-header">
        <span class="lb-emoji">🐝</span>
        <h3>Ong chăm chỉ tháng này</h3>
      </div>
      <div class="lb-list">
        ${ds.map((u) => `
          <div class="lb-item">
            <span class="lb-rank ${u.rank <= 3 ? ['gold', 'silver', 'bronze'][u.rank - 1] : ''}">${u.rank}</span>
            <div class="lb-avatar" style="background:${u.color}">${tdEsc(u.avatar)}</div>
            <div class="lb-info">
              <div class="lb-name">${tdEsc(u.name)}</div>
              <div class="lb-level">${tdEsc(u.level)}${u.streak > 0 ? ` · 🔥 ${u.streak} ngày` : ''}</div>
            </div>
            <div class="lb-score">${tcSo(u.score)}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

// ------------------------------------------------------------------ bản cho KHÁCH

function tcKhachHtml() {
  const k = tcSoLieuKho();
  const thu = [
    { tb: 'thoidai', mo: 'Bộ giáo trình của 7 trung tâm Hoa ngữ, bám sát TOCFL.' },
  ].filter((x) => BO_HIEN().includes(x.tb));
  return `
    ${heroHtml()}
    <div class="dashboard-grid">
      <div class="dash-main-col">

        <div class="tc-free">
          <div class="tc-free-head">
            <span class="tc-free-tag"><i class="fa-solid fa-unlock"></i> Miễn phí</span>
            <h3>Ba bài đầu của <b>mọi quyển</b> đều học thử được</h3>
            <p>Không cần đăng ký, không cần thẻ. Vào học ngay để xem cách trình bày từ vựng, ngữ pháp và bài nghe.</p>
          </div>
          <div class="tc-free-grid">
            ${thu.map(({ tb, mo }) => {
              const t = GIAO_TRINH[tb];
              const s = tcBaiDau(tb);
              if (!s) return '';
              return `
              <div class="tc-free-card" onclick="window.app.tcMoBai('${s.id}')">
                <span class="tc-free-han font-tc">${t.hanzi.slice(0, 2)}</span>
                <h4>${t.tenDay}</h4>
                <p>${mo}</p>
                <span class="tc-free-go">Học thử ${tdEsc(s.title)} <i class="fa-solid fa-arrow-right"></i></span>
              </div>`;
            }).join('')}
          </div>
        </div>

        <div>
          ${tcSectionHtml('fa-solid fa-box-open', 'Kho học liệu', '', '')}
          <div class="tc-kho-grid">
            ${[
              ['fa-solid fa-book', tcSo(k.bai), 'bài học có nội dung thật', 'tocfl-duongdai'],
              ['fa-solid fa-language', tcSo(k.tu), 'từ vựng kèm giọng đọc', 'tocfl-vocab'],
              ['fa-solid fa-book-open', tcSo(TC_KHO.tuDien), 'mục từ điển Trung–Việt', 'dictionary'],
              ['fa-solid fa-torii-gate', tcSo(TC_KHO.boThu), 'bộ thủ + âm Hán Việt', 'radicals'],
              ['fa-solid fa-pen-nib', tcSo(TC_KHO.chuHan), 'chữ Hán tra được cách viết', 'dictionary'],
              ['fa-solid fa-file-pen', tcSo(TC_KHO.deTocfl), 'đề thi thử TOCFL', 'exam'],
            ].map(([ic, so, mo, page]) => `
              <div class="tc-kho" onclick="window.app.navigate('${page}')">
                <i class="${ic}"></i>
                <b>${so}</b>
                <span>${mo}</span>
              </div>`).join('')}
          </div>
        </div>

      </div>

      <div class="dash-right-col">
        <div class="tc-join">
          <span class="tc-join-han font-tc">學</span>
          <h3>Tạo tài khoản miễn phí</h3>
          <p>Lưu tiến độ, ôn từ đúng lúc sắp quên, nhận bài giáo viên giao và theo dõi chuỗi ngày học.</p>
          <button class="btn btn-white btn-sm" onclick="window.app.openAuth('register')">
            Đăng ký ngay <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button class="tc-join-alt" onclick="window.app.openAuth('login')">Đã có tài khoản? Đăng nhập</button>
        </div>
        ${tcLeaderboardHtml()}
      </div>
    </div>

    <!-- Khu RỘNG — xem chú thích ở bản học viên. -->
    <div class="dash-wide">
      <div>
        ${tcSectionHtml('fa-solid fa-route', 'Lộ trình — ' + k.quyen + ' quyển', 'Bảng giá', 'account-membership')}
        ${tcRoadmapHtml(null)}
      </div>

      <div>
        ${tcSectionHtml('fa-solid fa-file-pen', 'Thi thử', '', '')}
        ${tcThiThuHtml()}
      </div>

      <div>
        ${tcSectionHtml('fa-solid fa-compass', 'Công cụ khác', '', '')}
        ${tcHubHtml()}
      </div>

      <!-- TẠM ẨN "Người đứng sau Tẻn" theo yêu cầu chủ dự án 2026-09-11.
           Hàm tcTacGiaHtml(), hằng số TAC_GIA và 2 ảnh trong public/images GIỮ NGUYÊN — bật lại
           chỉ là gọi lại hàm đó ở đây và ở bản học viên bên dưới. Chỗ cũ của nó là SAU phần sản
           phẩm, vì khách lướt theo mạch "có gì học -> thi thử ra sao -> công cụ gì" rồi mới tới
           "ai đứng sau".
           KHÔNG dán lại đoạn gọi hàm vào trong comment này: chú thích nằm trong template
           literal nên backtick sẽ đóng chuỗi sớm, và cú pháp nội suy vẫn được chạy. -->

      <div id="tc-cd"></div>

      ${blogData && blogData.length ? `
      <div>
        ${tcSectionHtml('fa-solid fa-newspaper', 'Cẩm nang mới nhất', 'Xem tất cả', 'blog')}
        <div class="tc-blog-grid">
          ${blogData.slice(0, 3).map((p) => `
            <div class="tc-blog" onclick="window.app.navigate('blog', { segs: ['${p.id}'] })">
              <span class="tc-blog-emoji">${p.emoji || '📝'}</span>
              <h4>${tdEsc(p.title)}</h4>
              <p>${tdEsc((p.excerpt || '').slice(0, 110))}</p>
              <span class="tc-blog-meta">${tdEsc(p.category || 'Cẩm nang')}${p.date ? ` · ${tdEsc(p.date)}` : ''}</span>
            </div>`).join('')}
        </div>
      </div>` : ''}
    </div>`;
}

// ------------------------------------------------------------------ bản cho HỌC VIÊN

function tcHocVienHtml() {
  const u = state.user || {};
  return `
    ${heroHtml()}
    <div class="dashboard-grid">
      <div class="dash-main-col">
        <!-- Phần ĐỘNG: điền sau khi /lo-trinh/tong-quan trả về, không để cả trang chờ request -->
        <div id="tc-live">${tcLiveKhungXuong()}</div>

        <!-- Bài giáo viên giao (nạp riêng, tự ẩn khi không có bài) -->
        <div id="my-assignments"></div>

        <!-- Công cụ hằng ngày (Từ điển · Bộ thủ · Sổ tay · Cộng đồng…). Đặt ở CỘT TRÁI chứ không
             xuống khu rộng vì hai lẽ: chúng là thứ học viên mở nhiều lần trong ngày nên phải ở
             tầm mắt, và cột trái cần cao xấp xỉ cột phải (hồ sơ + bảng xếp hạng = 975px).
             Đo lại mỗi khi thêm/bớt khối, đừng đoán: hiện 980 ↔ 975. -->
        <div>
          ${tcSectionHtml('fa-solid fa-compass', 'Truy cập nhanh', '', '')}
          ${tcHubHtml()}
        </div>
      </div>

      <div class="dash-right-col">
        <div class="profile-card">
          <div class="profile-avatar-wrap">
            <span class="avatar-letter">${tdEsc(u.avatar || 'U')}</span>
            <span class="level-badge">${u.levelNum || 1}</span>
          </div>
          <div class="profile-name">${tdEsc(u.name || 'Học viên')}</div>
          <div class="profile-subtitle">${tdEsc(u.level || '')}</div>
          <div class="streak-display">
            <span class="streak-number">${u.streak || 0}</span>
            <div><div class="streak-label">ngày streak 🔥</div></div>
          </div>
          <div class="streak-sublabel" id="tc-pf-sub">Đang tải số liệu…</div>
          <div class="stats-row">
            <div class="stat-box">
              <div class="stat-value">${tcSo(u.points || 0)}</div>
              <div class="stat-label">Điểm</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="tc-pf-on">—</div>
              <div class="stat-label">Cần ôn</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="tc-pf-sotay">—</div>
              <div class="stat-label">Sổ tay</div>
            </div>
          </div>
          <button class="tc-pf-link" onclick="window.app.navigate('path-overview')">
            <i class="fa-solid fa-chart-line"></i> Lộ trình của tôi
          </button>
        </div>
        ${tcLeaderboardHtml()}
      </div>
    </div>

    <!-- Khu RỘNG: những khối cần cả bề ngang trang. Để chúng trong cột trái của lưới 2 cột thì
         17 bìa sách bị bó vào 752px (phải xuống dòng) trong khi cột phải bỏ trống hơn 1.000px
         — cột phải chỉ có hồ sơ + bảng xếp hạng, cao đúng 975px. -->
    <div class="dash-wide">
      <div>
        ${tcSectionHtml('fa-solid fa-route', 'Lộ trình của tôi', 'Xem tiến độ', 'path-progress')}
        <div id="tc-roadmap">${tcRoadmapHtml(null)}</div>
      </div>

      <div>
        ${tcSectionHtml('fa-solid fa-file-pen', 'Thi thử', '', '')}
        ${tcThiThuHtml()}
      </div>

      <!-- TẠM ẨN "Người đứng sau Tẻn" 2026-09-11 — xem chú thích ở bản khách phía trên. -->

      <div id="tc-cd"></div>
    </div>`;
}

/** Khung xương của khối động — giữ đúng chiều cao để trang không nhảy khi dữ liệu về. */
function tcLiveKhungXuong() {
  return `
    <div class="tc-sk-wrap">
      <div class="tw-sk" style="height:118px;border-radius:var(--radius-lg)"></div>
      <div class="tc-sk-row">
        ${'<div class="tw-sk" style="height:86px;border-radius:var(--radius-lg)"></div>'.repeat(4)}
      </div>
    </div>`;
}

// ------------------------------------------------------------------ phần động

/**
 * Nạp số liệu của chính học viên rồi vẽ khối động. Một request duy nhất
 * (`/lo-trinh/tong-quan` đã gộp sẵn mọi truy vấn nó cần — xem 4.38).
 *
 * KHÔNG dùng bộ nhớ đệm: vừa làm xong một bài mà quay ra trang chủ vẫn thấy số cũ là nói dối.
 * Lỗi thì để nguyên khung tĩnh + một dòng báo, đừng nuốt im (bài học 4.21b mục 6).
 */
let _tcCache = null;                 // { luc, d } — xem chú thích ngay dưới
/**
 * Cửa sổ dùng lại dữ liệu. KHÔNG phải bộ nhớ đệm dài hạn (trang tiến độ cố ý không có, 4.38):
 * nó chỉ để một lần MỞ trang chủ không gọi API hai lần. `loadApiData()` kết thúc bằng
 * `navigate('dashboard')` để vẽ lại bằng bảng xếp hạng và blog thật, nên `renderDashboard()`
 * chạy hai lượt cách nhau khoảng một giây — đo được 2x /lo-trinh/tong-quan mỗi lần vào trang.
 */
const TC_CACHE_MS = 30000;

async function tcNapSoLieu() {
  const box = document.getElementById('tc-live');
  if (!box || !state.isLoggedIn) return;
  if (_tcCache && Date.now() - _tcCache.luc < TC_CACHE_MS) { tcVeLive(_tcCache.d); return; }
  let d;
  try {
    d = await api.get('/lo-trinh/tong-quan');
  } catch (e) {
    if (state.currentPage !== 'dashboard') return;
    const now = document.getElementById('tc-live');
    if (now) {
      now.innerHTML = `<div class="tc-loi">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>Không tải được tiến độ học của bạn${e && e.status === 401 ? ' — hãy đăng nhập lại' : ''}.</span>
        <button class="btn btn-sm btn-outline" onclick="window.app.tcNapSoLieu()">Thử lại</button>
      </div>`;
    }
    return;
  }
  _tcCache = { luc: Date.now(), d };
  if (state.currentPage !== 'dashboard') return;   // đã sang trang khác trong lúc chờ
  tcVeLive(d);
}

// ------------------------------------------------------------------
// TRANG CHỦ — ba khối CỘNG ĐỒNG (2026-09-11)
// ------------------------------------------------------------------
// Học bổng · Bài viết mới nhất · Thảo luận sôi nổi. Một request gộp
// (`GET /api/cong-dong/trang-chu`), CÔNG KHAI nên khách cũng thấy.
//
// ⚠️ Khối nào KHÔNG có dữ liệu thì ẩn hẳn khối đó, và cả ba rỗng thì `#tc-cd` trống trơn —
// đây là yêu cầu rõ của chủ dự án khi làm trước lúc có nội dung. Đừng thay bằng ô "chưa có bài
// nào": trang chủ mà đầy ô rỗng thì trông như hệ thống hỏng, chứ không phải như đang chờ nội dung.

let _cdCache = null;   // { luc, d } — cùng lý do với `_tcCache`: renderDashboard chạy 2 lượt

/** Bài cộng đồng -> đúng trang chi tiết theo `loai`. Ba loại nằm ở ba route khác nhau (4.39).
 *  Tên có đuôi `Cd` vì `tcMoBai()` đã là hàm mở BÀI HỌC của khối "Học tiếp". */
function tcMoBaiCd(loai, id) {
  const trang = { 'thao-luan': 'community-forum', 'tin-tuc': 'community-news', vlog: 'community-vlog' }[loai] || 'blog';
  navigate(trang, { segs: [String(id)] });
}

function tcHocBongHtml(ds) {
  if (!ds.length) return '';
  return `<div>
    ${tcSectionHtml('fa-solid fa-graduation-cap', 'Học bổng du học Đài Loan', 'Xem tất cả', 'community-scholarship')}
    <div class="tc-hb-grid">
      ${ds.map((h) => `
        <button class="tc-hb" onclick="window.app.navigate('community-scholarship')">
          <span class="tc-hb-ic"><i class="fa-solid fa-award"></i></span>
          <span class="tc-hb-body">
            <span class="tc-hb-ten">${tdEsc(h.ten)}</span>
            ${h.don_vi ? `<span class="tc-hb-dv">${tdEsc(h.don_vi)}</span>` : ''}
            <span class="tc-hb-meta">
              ${h.gia_tri ? `<span class="tc-hb-chip">${tdEsc(String(h.gia_tri).slice(0, 40))}</span>` : ''}
              <span class="tc-hb-han"><i class="fa-regular fa-calendar"></i> ${tdEsc(h.han_nop || 'Xem trang chính thức')}</span>
            </span>
          </span>
        </button>`).join('')}
    </div>
  </div>`;
}

function tcBaiMoiHtml(ds) {
  if (!ds.length) return '';
  // Dùng lại `.tc-blog-grid` / `.tc-blog` sẵn có của khối "Cẩm nang mới nhất" — cùng hình dạng
  // thẻ, không cần CSS mới.
  return `<div>
    ${tcSectionHtml('fa-solid fa-newspaper', 'Bài viết mới nhất', 'Xem tất cả', 'blog')}
    <div class="tc-blog-grid">
      ${ds.map((b) => `
        <div class="tc-blog" onclick="window.app.tcMoBaiCd('${b.loai}', ${b.id})">
          <span class="tc-blog-emoji">${b.emoji || (b.loai === 'tin-tuc' ? '📰' : '📝')}</span>
          <h4>${tdEsc(b.tieu_de)}</h4>
          <p>${tdEsc((b.tom_tat || '').slice(0, 110))}</p>
          <span class="tc-blog-meta">
            ${b.tac_gia ? `${tdEsc(b.tac_gia)} · ` : ''}${tcNgayNgan(b.created_at)}
          </span>
        </div>`).join('')}
    </div>
  </div>`;
}

function tcThaoLuanHtml(ds) {
  if (!ds.length) return '';
  return `<div>
    ${tcSectionHtml('fa-solid fa-comments', 'Thảo luận sôi nổi', 'Xem tất cả', 'community-forum')}
    <div class="tc-tl-grid">
      ${ds.map((b) => `
        <button class="tc-tl" onclick="window.app.tcMoBaiCd('thao-luan', ${b.id})">
          <span class="tc-tl-top">
            <span class="tc-tl-ten">${tdEsc(b.tieu_de)}</span>
            ${b.tom_tat ? `<span class="tc-tl-mo">${tdEsc(String(b.tom_tat).slice(0, 90))}</span>` : ''}
          </span>
          <span class="tc-tl-meta">
            <span><i class="fa-regular fa-comment"></i> ${b.so_binh_luan || 0}</span>
            <span><i class="fa-regular fa-heart"></i> ${b.so_thich || 0}</span>
            <span class="tc-tl-ng">${b.tac_gia ? tdEsc(b.tac_gia) : 'Ẩn danh'}</span>
          </span>
        </button>`).join('')}
    </div>
  </div>`;
}

/** "3 ngày trước" / "12/09/2026" — ngắn hơn `timeAgo` vì thẻ bài viết rất hẹp. */
function tcNgayNgan(x) {
  const d = new Date(x);
  if (isNaN(d)) return '';
  const ngay = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (ngay <= 0) return 'hôm nay';
  if (ngay === 1) return 'hôm qua';
  if (ngay < 30) return `${ngay} ngày trước`;
  return d.toLocaleDateString('vi-VN');
}

/**
 * Nạp ba khối. KHÔNG đòi đăng nhập — đây là nội dung công khai, khách xem được.
 * Lỗi mạng / chưa chạy migration thì im lặng bỏ qua: ba khối này là phần THÊM của trang chủ,
 * hỏng chúng không được kéo theo phần tiến độ học.
 */
async function tcNapCongDong() {
  const box = document.getElementById('tc-cd');
  if (!box) return;
  let d;
  if (_cdCache && Date.now() - _cdCache.luc < TC_CACHE_MS) {
    d = _cdCache.d;
  } else {
    try {
      d = await api.get('/cong-dong/trang-chu');
      _cdCache = { luc: Date.now(), d };
    } catch (e) {
      console.warn('Không tải được khối cộng đồng:', e.message || e);
      return;
    }
  }
  if (state.currentPage !== 'dashboard') return;   // đã sang trang khác trong lúc chờ
  const now = document.getElementById('tc-cd');
  if (!now) return;
  const html = tcHocBongHtml(d.hoc_bong || [])
    + tcBaiMoiHtml(d.moi_nhat || [])
    + tcThaoLuanHtml(d.soi_noi || []);
  now.innerHTML = html;
  if (html) twPlayEnter(now, 'tw-entering');
}

/** Sau khi nộp bài / mua khoá thì số liệu trang chủ đã cũ — gọi hàm này để lần vẽ sau nạp lại. */
function tcQuenCache() { _tcCache = null; _bgCache = null; _cdCache = null; }

/** Điền mọi chỗ phụ thuộc số liệu: khối động, ba ô hero, thẻ hồ sơ, tiến độ trên bìa sách. */
function tcVeLive(d) {
  const daHoc = new Set(d.da_hoc || []);
  const box = document.getElementById('tc-live');
  if (box) {
    box.innerHTML = tcTiepTucHtml(d, daHoc) + tcViecHtml(d) + tcTienDoHtml(d, daHoc);
    twPlayEnter(box, 'tw-entering');
  }
  const rm = document.getElementById('tc-roadmap');
  if (rm) rm.innerHTML = tcRoadmapHtml(daHoc);

  const dat = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  dat('tc-hs-streak', d.user && d.user.streak != null ? d.user.streak : 0);
  dat('tc-hs-bai', tcSo(d.tong && d.tong.so_bai));
  dat('tc-hs-diem', tcSo(d.user && d.user.points));
  dat('tc-pf-on', tcSo(d.srs && d.srs.den_han));
  dat('tc-pf-sotay', tcSo(d.so_tay));
  const sub = document.getElementById('tc-pf-sub');
  if (sub) {
    const dai = d.user && d.user.longest_streak ? d.user.longest_streak : (d.user && d.user.streak) || 0;
    sub.textContent = `Kỷ lục dài nhất: ${dai} ngày`;
  }
}

/**
 * "Học tiếp chỗ đang dở". Hai vế, vì chúng trả lời hai câu khác nhau:
 *   · vừa học xong bài nào (có điểm) — để biết mình đang ở đâu
 *   · bài kế tiếp CHƯA làm là bài nào — đó mới là nút bấm
 * `exercise_results` chỉ ghi khi NỘP BÀI TẬP, nên "bài gần nhất" là bài vừa làm xong.
 */
function tcTiepTucHtml(d, daHoc) {
  const gan = (d.gan_nhat || []).find((r) => r.lesson_id && !String(r.lesson_id).includes(':'));
  const bo = gan ? tbOf(gan.lesson_id) : GIAO_TRINH.duongdai;
  const ke = bo.subs.find((s) => !daHoc.has(s.id))
    || GIAO_TRINH.duongdai.subs.find((s) => !daHoc.has(s.id));

  if (!gan && !daHoc.size) {
    const s = tcBaiDau('duongdai');
    return `
      <div class="tc-next is-moi" onclick="window.app.tcMoBai('${s.id}')">
        <div class="tc-next-ic"><i class="fa-solid fa-flag-checkered"></i></div>
        <div class="tc-next-body">
          <span class="tc-next-tag">Bắt đầu</span>
          <h3>${tdEsc(s.title)}</h3>
          <p>Bạn chưa nộp bài tập nào. Bắt đầu từ bài đầu tiên của Giáo trình Đương đại — ba bài đầu mọi quyển đều mở.</p>
        </div>
        <i class="fa-solid fa-arrow-right tc-next-arrow"></i>
      </div>`;
  }

  const ganSub = gan ? bo.subs.find((s) => s.id === String(gan.lesson_id)) : null;
  const diem = gan && gan.diem != null ? `${Math.round(gan.diem)}%` : null;
  return `
    <div class="tc-next" ${ke ? `onclick="window.app.tcMoBai('${ke.id}')"` : ''}>
      <div class="tc-next-ic"><i class="fa-solid fa-play"></i></div>
      <div class="tc-next-body">
        <span class="tc-next-tag">Học tiếp</span>
        <h3>${ke ? tdEsc(`${bo.ten}${ke.book !== 1 || bo.id !== 'duongdai' ? ` Q${ke.book}` : ''} — ${ke.title}`) : 'Bạn đã làm hết bài của bộ này 🎉'}</h3>
        <p>${ganSub
          ? `Gần nhất: ${tdEsc(ganSub.title)}${diem ? ` · đạt ${diem}` : ''}`
          : 'Tiếp tục từ bài chưa làm bài tập.'}</p>
      </div>
      ${ke ? '<i class="fa-solid fa-arrow-right tc-next-arrow"></i>' : ''}
    </div>`;
}

/**
 * Bốn ô "việc cần làm". Ô nào bằng 0 vẫn hiện nhưng ở trạng thái nhạt kèm chữ giải thích —
 * giấu đi thì học viên không biết mục đó tồn tại; tô đậm số 0 thì thành báo động giả.
 */
function tcViecHtml(d) {
  const srs = (d.srs && d.srs.den_han) || 0;
  const giao = d.bai_giao_chua_nop || 0;
  // `diem_yeu` do server cắt LIMIT 5 — đủ 5 nghĩa là "5 trở lên", ghi trần 5 là nói thiếu.
  const yeuDs = d.diem_yeu || [];
  const yeu = yeuDs.length;
  const yeuNhan = yeu >= 5 ? '5+' : String(yeu);
  // Chưa nộp bài nào trong 30 ngày thì server vẫn trả diem_tb = "0.0" — hiện "0%" ở đây là
  // nói học viên vừa làm bài và được 0 điểm. Không có mẫu thì nói thẳng là chưa có.
  const soBai30 = d.gan_day ? Number(d.gan_day.so_bai || 0) : 0;
  const tb = soBai30 > 0 ? Number(d.gan_day.diem_tb) : null;
  const o = [
    { n: giao, ten: 'bài cô giao chưa nộp', rong: 'Chưa có bài nào cô giao', ic: 'fa-solid fa-clipboard-list', page: 'path-homework', mau: 'is-cam' },
    { n: srs, ten: 'từ đến hạn ôn', rong: 'Không có từ nào cần ôn', ic: 'fa-solid fa-rotate', page: 'path-today', mau: 'is-tim' },
    { n: yeu, nhan: yeuNhan, ten: 'bài nên làm lại', rong: 'Không có bài điểm thấp', ic: 'fa-solid fa-arrow-trend-down', page: 'path-homework', mau: 'is-do' },
  ];
  return `
    <div class="tc-viec">
      ${o.map((x) => `
        <div class="tc-viec-o ${x.n > 0 ? x.mau : 'is-rong'}" onclick="window.app.navigate('${x.page}')">
          <i class="${x.ic}"></i>
          ${x.n > 0
            ? `<b>${x.nhan || x.n}</b><span>${x.ten}</span>`
            : `<b class="tc-viec-ok"><i class="fa-solid fa-check"></i></b><span>${x.rong}</span>`}
        </div>`).join('')}
      <div class="tc-viec-o is-xanh" onclick="window.app.navigate('path-progress')">
        <i class="fa-solid fa-chart-simple"></i>
        <b>${tb != null ? `${tb}%` : '—'}</b>
        <span>${tb != null ? 'điểm trung bình 30 ngày' : 'chưa có bài nào 30 ngày qua'}</span>
      </div>
    </div>`;
}

/**
 * Tiến độ 3 bộ + 14 ngày gần nhất.
 * "Đã học" = ĐÃ NỘP BÀI TẬP của bài đó — hệ thống không ghi lại việc "đọc xong tab Từ vựng",
 * nên dòng chú thích dưới bảng phải nói rõ, đừng để người đọc hiểu thành "đã học hết bài".
 */
function tcTienDoHtml(d, daHoc) {
  const bo = BO_HIEN().map((id) => {
    const t = GIAO_TRINH[id];
    const xong = t.subs.filter((s) => daHoc.has(s.id)).length;
    return { id, ten: t.ten, page: t.page, xong, tong: t.subs.length, pt: t.subs.length ? Math.round((xong / t.subs.length) * 100) : 0 };
  });

  // 14 ngày gần nhất, tính từ hôm nay lùi lại — mảng `lich` chỉ có ngày CÓ hoạt động.
  const map = new Map((d.lich || []).map((r) => [r.ngay, r]));
  const ngay = [];
  for (let i = 13; i >= 0; i--) {
    const t = new Date(); t.setDate(t.getDate() - i);
    const k = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    const e = map.get(k) || { giay: 0, bai: 0 };
    const muc = e.bai > 0 || e.giay >= 900 ? 3 : e.giay >= 300 ? 2 : e.giay > 0 ? 1 : 0;
    ngay.push({ k, muc, giay: e.giay, bai: e.bai, thu: t.getDate() });
  }

  return `
    <div class="tc-progress">
      <div class="tc-prog-bo">
        <h4><i class="fa-solid fa-book"></i> Tiến độ giáo trình</h4>
        ${bo.map((b) => `
          <div class="tc-prog-row" onclick="window.app.navigate('${b.page}')">
            <span class="tc-prog-ten">${b.ten}</span>
            <span class="tw-bar"><i style="width:${b.pt}%"></i></span>
            <span class="tc-prog-so">${b.xong}<em>/${b.tong}</em></span>
          </div>`).join('')}
        <p class="tc-prog-note">Tính theo số bài đã <b>nộp bài tập</b>, không phải số bài đã mở xem.</p>
      </div>
      <div class="tc-prog-lich">
        <h4><i class="fa-solid fa-fire"></i> 14 ngày gần đây</h4>
        <div class="tc-lich">
          ${ngay.map((n) => `<span class="tc-lich-o m${n.muc}" title="${n.k}: ${n.bai} bài, ${Math.round(n.giay / 60)} phút"><em>${n.thu}</em></span>`).join('')}
        </div>
        <p class="tc-prog-note">Ngày được tính vào chuỗi khi bạn nộp một bài, hoặc học thật ít nhất 5 phút.</p>
      </div>
    </div>`;
}

// ------------------------------------------------------------------ điểm vào

function renderDashboard(el) {
  el.innerHTML = state.isLoggedIn ? tcHocVienHtml() : tcKhachHtml();
  if (state.isLoggedIn) {
    loadMyAssignments();
    tcNapSoLieu();
  }
  // Ba khối cộng đồng chạy cho CẢ khách lẫn học viên — nội dung công khai, và với khách thì đây
  // là thứ cho thấy chỗ này có người thật đang học chứ không phải một kho tài liệu chết.
  tcNapCongDong();
}

// ============================================================
// BÀI GIÁO VIÊN GIAO (2026-08-27)
// ============================================================
// Giáo viên giao bài trong Admin > Quản lý lớp > Bài tập. Trước đây phía học viên KHÔNG có chỗ nào
// thấy được — bài giao xong nằm im trong DB, em nào không đọc email nhắc thì không biết mà làm.
// Khối này nạp sau khi dashboard đã vẽ (không chặn render) và tự ẩn nếu không có bài nào.

/**
 * Mở đúng trang làm bài từ lesson_id. Quy ước lesson_id xem CLAUDE.md 4.13.
 * Id của Thời Đại có tiền tố 'td' ('td2-5.1', 'writing:td2-5.1') nên `tbNav` tự chọn đúng
 * TRANG (tocfl-duongdai / tocfl-thoidai) — đừng hardcode 'tocfl-duongdai' ở đây nữa.
 */
function openAssignment(lessonId) {
  // Từ vựng TOCFL: 'tocfl:L3' -> mở thẳng tab Trắc nghiệm của đúng cấp đó.
  const mTv = /^tocfl:(L[0-5])$/.exec(String(lessonId));
  if (mTv) {
    navigate('tocfl-vocab', { segs: [TV_CAP_SLUG[mTv[1]], TV_TAB_SLUG.quiz] });
    return;
  }
  if (String(lessonId).startsWith('pron:')) {
    const kind = String(lessonId).slice(5);
    const page = kind === 'initials' ? 'pron-thanhmau' : kind === 'finals' ? 'pron-vanmau' : 'pron-thanhdieu';
    navigate(page);
    return;
  }
  // Luyện tập tổng hợp: 'onllang:5' -> mở tab Bài tập của PHẦN CUỐI bài đó rồi tự vào mục.
  // Đừng ghép cứng '.2': Thời Đại quyển 1 có 3 phần, thẻ luyện tập nằm ở '.3'.
  if (String(lessonId).startsWith('onllang:')) {
    const so = String(lessonId).slice(8); // '5' · '2-5' · 'td1-1'
    const bo = tbOf(so);
    const phan = bo.subs.filter(s => s.parentId === String(so));
    const subCuoi = phan.length ? phan[phan.length - 1].id : `${so}.2`;
    const nav = tbNav(subCuoi, DD_TAB_SLUG.exercise);
    navigate(nav.page, { segs: nav.segs });
    setTimeout(() => ddRenderOnllangEx(document.getElementById('dd-tab-content')), 120);
    return;
  }
  // Game: 'game:wordpop:5.2' -> tab Game của đúng bài đó (game nào thì học viên tự chọn
  // ở màn chọn game — không deep link thẳng vào ván chơi để tránh tự bắt đầu ngoài ý muốn).
  const mGame = /^game:[a-z]+:(.+)$/.exec(String(lessonId));
  if (mGame) {
    const nav = tbNav(mGame[1], DD_TAB_SLUG.game);
    navigate(nav.page, { segs: nav.segs });
    return;
  }
  // Luyện viết: 'writing:5.2' -> tab Luyện viết của đúng bài đó.
  if (String(lessonId).startsWith('writing:')) {
    const nav = tbNav(String(lessonId).slice(8), DD_TAB_SLUG.writing);
    navigate(nav.page, { segs: nav.segs });
    return;
  }
  // Bài giáo trình: '5.2' -> /tocfl/giao-trinh-duong-dai/bai-5-2/bai-tap
  //                 'td2-5.1' -> /tocfl/giao-trinh-thoi-dai/quyen-2/bai-5-1/bai-tap
  const nav = tbNav(String(lessonId), DD_TAB_SLUG.exercise);
  navigate(nav.page, { segs: nav.segs });
}

/** Nhãn cho kết quả/bài giao của tab Game: "game:wordpop:5.2" -> tên đọc được.
    Trả về null nếu không phải id của game. */
const GAME_TEN = { wordpop: 'Bong bóng từ vựng', bee: 'Cứu chú ong' };
function gameLessonLabel(lessonId) {
  const m = /^game:([a-z]+):(.+)$/.exec(String(lessonId || ''));
  if (!m) return null;
  return `Game ${GAME_TEN[m[1]] || m[1]} — ${tbLabel(m[2])}`;
}

/**
 * Nhãn cấp TOCFL cho `lesson_id` dạng 'tocfl:L3'. Trả null nếu không phải id của trang này.
 * Khai ở đây một lần rồi dùng lại ở cả nhãn thông báo lẫn nhãn bài giao — thiếu một chỗ là
 * giao diện hiện ra chuỗi thô "tocfl:L3" (đúng lỗi đã mắc với `writing:*`, xem 4.21).
 */
const TOCFL_CAP_TEN = {
  L0: 'Chuẩn bị (準備級)', L1: 'Nhập môn (Level 1)', L2: 'Cơ sở (Level 2)',
  L3: 'Nâng cao (Level 3)', L4: 'Cao cấp (Level 4)', L5: 'Lưu loát (Level 5)',
};
function tocflVocabLabel(lessonId) {
  const m = /^tocfl:(L[0-5])$/.exec(String(lessonId || ''));
  return m ? `Từ vựng TOCFL — ${TOCFL_CAP_TEN[m[1]]}` : null;
}

/** Nhãn bài đọc được cho học viên, khớp danh mục bên admin. */
function assignmentLabel(a) {
  if (a.title) return a.title;
  const tv = tocflVocabLabel(a.lesson_id);
  if (tv) return tv;
  const g = gameLessonLabel(a.lesson_id);
  if (g) return g;
  if (String(a.lesson_id).startsWith('onllang:')) return `Luyện tập tổng hợp — ${tbLabel(String(a.lesson_id).slice(8))}`;
  const PRON = { 'pron:initials': 'Luyện phát âm — Thanh mẫu', 'pron:finals': 'Luyện phát âm — Vận mẫu', 'pron:tones': 'Luyện phát âm — Thanh điệu' };
  return PRON[a.lesson_id] || `Giáo trình — ${tbLabel(a.lesson_id)}`;
}

/** Hạn nộp: quá hạn / hôm nay / còn N ngày. Trả về { text, color, bg }. */
function assignmentDue(due) {
  if (!due) return { text: 'Không hạn', color: 'var(--text-muted)', bg: 'var(--bg-subtle, #F1F5F9)' };
  const d = new Date(due);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);
  const txt = d.toLocaleDateString('vi-VN');
  if (diff < 0) return { text: `Quá hạn ${txt}`, color: '#B91C1C', bg: '#FEE2E2' };
  if (diff === 0) return { text: 'Hạn hôm nay', color: '#B45309', bg: '#FEF3C7' };
  if (diff <= 2) return { text: `${txt} · còn ${diff} ngày`, color: '#B45309', bg: '#FEF3C7' };
  return { text: `Hạn ${txt}`, color: 'var(--text-muted)', bg: 'var(--bg-subtle, #F1F5F9)' };
}

let _bgCache = null;   // { luc, list } — cùng lý do với `_tcCache` ở trên

async function loadMyAssignments() {
  const box = document.getElementById('my-assignments');
  if (!box || !state.isLoggedIn) return;
  let list = [];
  if (_bgCache && Date.now() - _bgCache.luc < TC_CACHE_MS) {
    list = _bgCache.list;
    if (!list.length) return;
    return veBaiCoGiao(box, list);
  }
  try {
    const data = await api.getMyAssignments();
    list = data.assignments || [];
    _bgCache = { luc: Date.now(), list };
  } catch (e) {
    // Chưa chạy migration / lỗi mạng: im lặng, dashboard vẫn dùng bình thường.
    console.warn('Không tải được bài cô giao:', e.message);
    return;
  }
  // Học viên không thuộc lớp nào -> không chiếm chỗ trên dashboard.
  if (list.length === 0) return;
  veBaiCoGiao(box, list);
}

/** Vẽ khối "Bài cô giao" — tách khỏi hàm nạp để lần vẽ lại từ bộ nhớ đệm dùng chung mã này. */
function veBaiCoGiao(box, list) {
  const pending = list.filter(a => !a.submitted);
  const done = list.filter(a => a.submitted);
  const card = (a) => {
    const due = assignmentDue(a.due_date);
    return `
      <div class="assign-item${a.submitted ? ' is-done' : ''}" onclick="window.app.openAssignment('${a.lesson_id}')">
        <div class="assign-item-icon"><i class="fa-solid ${a.submitted ? 'fa-circle-check' : 'fa-pen-to-square'}"></i></div>
        <div class="assign-item-info">
          <h4>${assignmentLabel(a)}</h4>
          <p>${a.class_name ? `Lớp ${a.class_name}` : ''}${a.note ? ` · ${a.note}` : ''}</p>
        </div>
        <div class="assign-item-meta">
          ${a.submitted
            ? `<span class="assign-badge" style="color:#047857;background:#D1FAE5">Đã làm${a.best_score != null ? ` · ${Math.round(a.best_score)}%` : ''}</span>`
            : `<span class="assign-badge" style="color:${due.color};background:${due.bg}">${due.text}</span>`}
        </div>
      </div>`;
  };

  box.innerHTML = `
    <div class="card card-padded assign-card">
      <div class="assign-head">
        <div class="assign-head-icon"><i class="fa-solid fa-clipboard-list"></i></div>
        <div>
          <h3>Bài cô giao</h3>
          <p>${pending.length ? `Còn ${pending.length} bài chưa làm` : 'Đã làm hết bài được giao 🎉'}</p>
        </div>
      </div>
      <div class="assign-list">
        ${pending.map(card).join('')}
        ${done.slice(0, 3).map(card).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// TÀI KHOẢN — THÔNG TIN CÁ NHÂN (đổi thông tin + đổi mật khẩu)
// ============================================================
const accountProfileState = { saving: false, changingPw: false };

// Bốn trang khu TÀI KHOẢN đã chuyển sang `src/pages/taikhoan.js` (module nạp động, 4.42).
// Phần TẢI ẢNH ĐẠI DIỆN vẫn ở file này vì nó gắn với menu người dùng trên thanh tiêu đề.





/** Người nói THỨ HAI trong bài — để dựng bong bóng chat hai phía. */
function htNguoiThuHai(cues) {
  const ten = [];
  for (const c of cues) {
    const m = /^([^:：]{1,14})[:：]/.exec(c.vi || '');
    if (m && !ten.includes(m[1].trim())) ten.push(m[1].trim());
    if (ten.length >= 2) break;
  }
  return ten[1] || '';
}

function htKhungHtml() {
  return `${htThanhChonHtml()}<div class="tv-empty"><i class="fa-solid fa-spinner fa-spin"></i><p>Đang tải hội thoại…</p></div>`;
}

/** Thanh chọn bài: gom theo bộ rồi theo quyển để 324 bài không thành một danh sách vô tận. */
function htThanhChonHtml() {
  const ds = nguonHoiThoai();
  const nhom = [...new Set(ds.map((x) => x.boTen))];
  return `
    <div class="luy-nguon">
      <label for="ht-chon"><i class="fa-solid fa-comments"></i> Bài hội thoại</label>
      <select id="ht-chon" onchange="window.app.htChonBai(this.value)">
        ${nhom.map((g) => `<optgroup label="${tdEsc(g)}">
          ${ds.filter((x) => x.boTen === g).map((x) => `
            <option value="${x.id}" ${x.id === state.dialogue.baiId ? 'selected' : ''}>${tdEsc(x.ten)}</option>`).join('')}
        </optgroup>`).join('')}
      </select>
      <span class="luy-dem">${ds.length} bài</span>
    </div>`;
}

async function htChonBai(baiId) {
  state.dialogue.baiId = baiId;
  htDungKaraoke();
  await htNapBai(baiId);
}

async function htNapBai(baiId) {
  const [bo, sub] = String(baiId).split(':');
  const st = state.dialogue;
  st.dangNap = true; st.khoa = false; st.bai = null; st.currentLine = -1;
  const el = document.getElementById('page-content');
  if (el && state.currentPage === 'dialogue') el.innerHTML = htKhungHtml();
  try {
    const d = await napHoiThoai(bo, sub);
    if (st.baiId !== baiId) return;            // đã đổi bài khác trong lúc chờ
    st.khoa = !!d.khoa;
    st.bai = d.khoa ? null : d;
  } finally {
    if (st.baiId === baiId) {
      st.dangNap = false;
      if (state.currentPage === 'dialogue') renderDialogue(document.getElementById('page-content'));
    }
  }
}

/** Bấm một câu -> tua bản thu tới đúng mốc câu đó rồi phát. */
function htNgheCau(i) {
  const c = state.dialogue.bai?.cues?.[i];
  if (!c) return;
  const a = document.getElementById('ht-audio');
  if (a && c.start != null) {
    a.currentTime = Math.max(0, c.start - 0.15);   // lùi một chút cho khỏi cụt âm đầu
    a.play().catch(() => {});
    return;
  }
  // Bài không có audio (hoặc câu thiếu mốc) thì đọc bằng giọng máy — vẫn nghe được, chỉ kém hơn.
  ddSpeakWord(c.text);
}

/** Tô sáng câu đang đọc theo THỜI GIAN THẬT của bản thu, không phải timeout đoán chừng. */
function htTheoDoi() {
  const a = document.getElementById('ht-audio');
  const cues = state.dialogue.bai?.cues || [];
  if (!a || !cues.length) return;
  const t = a.currentTime;
  const i = cues.findIndex((c) => c.start != null && c.end != null && t >= c.start - 0.2 && t <= c.end + 0.2);
  if (i === state.dialogue.currentLine) return;
  state.dialogue.currentLine = i;
  // Chỉ đổi class, KHÔNG render lại cả trang: render lại giữa lúc audio chạy sẽ dựng lại thẻ
  // <audio> và nhạc đứt quãng.
  document.querySelectorAll('#dialogue-container .dialogue-row').forEach((el, k) => {
    el.classList.toggle('karaoke-active', k === i);
  });
  if (i >= 0) document.getElementById(`ht-c${i}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function htDungKaraoke() {
  const a = document.getElementById('ht-audio');
  if (a) { try { a.pause(); } catch (_) { /* chưa dựng */ } }
  state.dialogue.currentLine = -1;
}


// ============================================================
// EXAM SETUP PAGE
// ============================================================
function renderExamSetup(el) {
  // Bộ đề 1,2 MB nạp động (CLAUDE.md 4.30) — chỉ người vào trang Thi thử mới phải tải.
  if (!napExam.daXong) {
    el.innerHTML = `<div class="exam-page" style="padding:28px 0">
        <div class="tw-sk" style="height:72px;width:72px;border-radius:20px;margin:0 auto 14px"></div>
        <div class="tw-sk" style="height:24px;width:280px;margin:0 auto 24px"></div>
        ${Array.from({ length: 3 }, () => '<div class="tw-sk" style="height:120px;margin-bottom:18px"></div>').join('')}
      </div>`;
    napExam().then(() => {
      if (state.currentPage !== 'exam') return;
      const now = document.getElementById('page-content');
      if (now) renderExamSetup(now);
    }).catch((e) => console.warn('Nạp bộ đề thất bại:', e));
    return;
  }
  // Đề thi thử KHÔNG có bản dùng thử (chốt 2026-09-09) — chưa mua thì hiện tấm chắn mời mua chứ
  // không phải danh sách đề rỗng, vì "không có đề nào" trông y hệt một lỗi tải dữ liệu.
  if (napExam.canQuyen) {
    el.innerHTML = `<div class="exam-page">${ddKhoaPanelHtml(
      { ...napExam.canQuyen, soBaiMo: state.quyen.soBaiMo || 3 },
      'Ngân hàng đề thi thử thuộc phần trả phí')}</div>`;
    return;
  }
  // Ba band ba màu để phân biệt trình độ, nhưng LẤY TỪ BẢNG MÀU CỦA APP (teal -> đất -> cam),
  // không phải xanh dương / tím như bản trước — hai màu đó không có trong hệ màu nào của app
  // (xem 4.29) nên cả trang thi thử trông như của một sản phẩm khác.
  const bandColors = {
    A: { bg: 'linear-gradient(135deg,#4FA3B5,#2A6B7D)', light: 'rgba(56,137,158,0.10)', border: '#38899E', label: 'Band A · Cơ bản', sub: 'Trình độ 1-2', emoji: '📚' },
    B: { bg: 'linear-gradient(135deg,#E08A4B,#B2571F)', light: 'rgba(210,102,47,0.10)', border: '#D2662F', label: 'Band B · Trung cấp', sub: 'Trình độ 3-4', emoji: '🔥' },
    C: { bg: 'linear-gradient(135deg,#FDA55C,#E2761F)', light: 'rgba(253,146,60,0.10)', border: '#FD923C', label: 'Band C · Cao cấp', sub: 'Trình độ 5-6', emoji: '⚡' },
  };
  const examsByBand = { A: tocflExams.filter(e => e.band === 'A'), B: tocflExams.filter(e => e.band === 'B'), C: tocflExams.filter(e => e.band === 'C') };

  el.innerHTML = `
    <div class="exam-page">
      <div style="text-align:center;padding:28px 0 24px">
        <div style="width:72px;height:72px;border-radius:20px;background:linear-gradient(180deg,var(--primary-light),var(--primary));display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:#fff;font-size:28px;box-shadow:var(--shadow-primary)">
          <i class="fa-solid fa-file-pen"></i>
        </div>
        <h2 style="font-size:24px;font-weight:900;color:var(--text-primary);margin-bottom:6px">Thư viện Đề thi TOCFL</h2>
        <p style="color:var(--text-muted);font-size:13px">18 bộ đề chuẩn · 1600+ câu hỏi · Đọc hiểu &amp; Nghe hiểu</p>
      </div>

      ${['A', 'B', 'C'].map(band => `
        <div style="margin-bottom:32px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border-light)">
            <div style="width:40px;height:40px;border-radius:10px;background:${bandColors[band].bg};display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(0,0,0,0.15)">${bandColors[band].emoji}</div>
            <div>
              <div style="font-weight:900;font-size:16px;color:var(--text-primary)">${bandColors[band].label}</div>
              <div style="font-size:12px;color:var(--text-muted);font-weight:500">${bandColors[band].sub} · ${examsByBand[band].length} bộ đề</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:16px">
            ${examsByBand[band].map(exam => `
              <div style="background:var(--white);border-radius:16px;border:1.5px solid var(--border-light);overflow:hidden;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.06)"
                   onmouseenter="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)';this.style.borderColor='${bandColors[band].border}'"
                   onmouseleave="this.style.transform='';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.06)';this.style.borderColor='var(--border-light)'">
                <div style="background:${bandColors[band].bg};padding:16px;text-align:center;cursor:pointer" onclick="window.app.startTocflExam('${exam.band}','${exam.de}','both')">
                  <div style="font-size:22px;font-weight:900;color:#fff;letter-spacing:-0.5px">Đề ${exam.de}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.8);margin-top:2px;font-weight:600">${exam.reading.length + exam.listening.length} câu hỏi</div>
                </div>
                <div style="padding:12px">
                  <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:11px;color:var(--text-muted);font-weight:600">
                    <span>📖 ${exam.reading.length} đọc</span>
                    <span>🎧 ${exam.listening.length} nghe</span>
                  </div>
                  <!-- Hành động chính của mỗi thẻ: để cùng màu band thì nó lẫn vào đúng cái
                       tiêu đề band ngay phía trên. Dùng màu NHẤN của app (cam) nên bấm vào đâu
                       là thấy ngay, và hai nút Đọc/Nghe phía dưới tự lùi về vai phụ. -->
                  <button onclick="window.app.startTocflExam('${exam.band}','${exam.de}','both')"
                    style="width:100%;min-height:40px;padding:8px;border-radius:9px;border:none;background:linear-gradient(180deg,var(--accent),var(--accent-hover));color:#fff;font-weight:800;font-size:13px;cursor:pointer;margin-bottom:6px;box-shadow:var(--shadow-accent)">
                    ▶ Làm cả đề
                  </button>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
                    <button onclick="window.app.startTocflExam('${exam.band}','${exam.de}','reading')"
                      style="padding:6px 4px;border-radius:7px;border:1.5px solid ${bandColors[band].border};background:${bandColors[band].light};color:var(--text-primary);font-weight:700;font-size:11px;cursor:pointer">
                      📖 Đọc
                    </button>
                    <button onclick="window.app.startTocflExam('${exam.band}','${exam.de}','listening')"
                      style="padding:6px 4px;border-radius:7px;border:1.5px solid ${bandColors[band].border};background:${bandColors[band].light};color:var(--text-primary);font-weight:700;font-size:11px;cursor:pointer">
                      🎧 Nghe
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <div style="max-width:500px;margin:0 auto 20px">
        <div class="exam-quick-card" onclick="window.app.navigate('quiz')" style="margin-top:8px">
          <div class="exam-quick-icon teal"><i class="fa-solid fa-circle-check"></i></div>
          <div class="exam-quick-info">
            <h4>Trắc nghiệm từ vựng</h4>
            <p>Kiểm tra nhanh từ vựng đã học</p>
          </div>
          <i class="fa-solid fa-chevron-right exam-quick-arrow"></i>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// EXAM TAKING PAGE
// ============================================================
function renderExamTaking(el) {
  const q = state.exam.questions[state.exam.currentQ];
  if (!q) { renderExamResults(el); return; }
  const answered = state.exam.answers[state.exam.currentQ];

  el.innerHTML = `
    <div class="exam-taking-layout">
      <div class="exam-timer-bar">
        <div class="exam-timer"><i class="fa-solid fa-clock"></i> <span id="exam-timer-display">${formatTime(state.exam.timer)}</span></div>
        <div class="exam-progress-text">Câu ${state.exam.currentQ + 1} / ${state.exam.questions.length}</div>
        <button class="btn btn-sm btn-secondary" onclick="window.app.endExam()">Nộp bài</button>
      </div>

      <div class="fc-progress-bar mb-4">
        <div class="fc-progress-fill" style="width:${((state.exam.currentQ + 1) / state.exam.questions.length) * 100}%"></div>
      </div>

      <div class="exam-question-card">
        <div class="exam-q-number">Câu ${state.exam.currentQ + 1} · ${q.type === 'reading' ? 'Đọc hiểu' : 'Nghe hiểu'} · ${q.level}</div>

        ${q.audioSrc ? `
          <div style="padding:10px 14px;background:var(--surface);border-radius:12px;margin-bottom:12px;display:flex;align-items:center;gap:12px">
            <i class="fa-solid fa-headphones" style="color:var(--primary);font-size:16px"></i>
            <audio controls style="flex:1;height:32px" src="${assetUrl(q.audioSrc)}"></audio>
          </div>` : (q.type === 'listening' && q.audioDesc ? `<div style="padding:16px;background:var(--surface);border-radius:12px;margin-bottom:12px;text-align:center;font-size:14px;color:var(--text-secondary)">${q.audioDesc}</div>` : '')}

        ${q.passage ? `<div class="exam-q-hanzi font-tc" style="padding:12px 16px;background:var(--surface);border-radius:12px;margin-bottom:12px;line-height:1.8;font-size:15px">${getDisplayText(q.passage, q.passage)}</div>` : ''}

        ${q.questionImg ? `<div style="margin-bottom:12px;border-radius:12px;overflow:hidden;background:var(--surface);padding:6px;text-align:center"><img src="${q.questionImg}" style="max-width:100%;border-radius:8px;max-height:220px;object-fit:contain" loading="lazy"></div>` : ''}

        ${q.question ? `<div class="exam-q-text font-tc">${getDisplayText(q.question, q.question)}</div>` : ''}

        <div class="quiz-options" id="exam-options">
          ${q.options.map((opt, i) => {
            // Trong lúc thi CHỈ đánh dấu ô đã chọn, KHÔNG lộ đúng/sai — đúng kiểu thi thử.
            // Điều kiện cũ (`q.correct > 0` mới tô màu) thực chất là hệ quả của việc cả 1600 câu
            // đều có correct = 0 nên nhánh đó không bao giờ chạy: học viên xưa nay không thấy
            // đáp án giữa bài. Sau khi trộn, correct là chỉ số THẬT, để nguyên điều kiện cũ thì
            // 2/3 số câu bỗng dưng lộ đáp án ngay khi vừa bấm.
            const cls = answered === i ? 'selected' : '';
            // Câu nhìn ảnh chọn đáp án: `opt` CHÍNH LÀ nhãn (A)(B)(C) in trên ảnh.
            // Sau khi trộn, nhãn phải lấy theo nội dung đáp án chứ không theo vị trí dòng —
            // lấy theo vị trí thì dòng ghi "A" mà thật ra là đáp án C. Cũng không lặp lại
            // chữ cái ở cột nội dung nữa (trước đây hiện "A  A" thừa một lần).
            const nhan = q.nhanTuDapAn ? String(opt).trim().replace(/[.)]$/, '') : ['A', 'B', 'C', 'D'][i];
            return `<button class="quiz-option ${cls}" data-index="${i}"
              onclick="window.app.examAnswer(${i})"
              ${answered !== undefined ? 'disabled' : ''}>
              <span class="option-letter">${nhan}</span>
              ${q.nhanTuDapAn ? '' : `<span class="font-tc">${getDisplayText(opt, opt)}</span>`}
            </button>`;
          }).join('')}
        </div>
      </div>

      <div class="exam-actions">
        <button class="btn btn-secondary" onclick="window.app.examPrev()" ${state.exam.currentQ === 0 ? 'disabled style="opacity:0.5"' : ''}>
          <i class="fa-solid fa-arrow-left"></i> Câu trước
        </button>
        <button class="btn btn-primary" onclick="window.app.examNext()">
          ${state.exam.currentQ === state.exam.questions.length - 1 ? 'Nộp bài' : 'Câu tiếp'}
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  // Reconnect timer after innerHTML re-render
  if (state.exam.timerInterval) {
    clearInterval(state.exam.timerInterval);
    state.exam.timerInterval = setInterval(() => {
      state.exam.timer++;
      const display = document.getElementById('exam-timer-display');
      if (display) display.textContent = formatTime(state.exam.timer);
    }, 1000);
  }
}


function renderExamResults(el) {
  const total = state.exam.questions.length;
  const correct = state.exam.answers.filter((a, i) => a === state.exam.questions[i]?.correct).length;
  const pct = Math.round((correct / total) * 100);

  el.innerHTML = `
    <div class="exam-page" style="text-align:center;padding:40px 0">
      <div class="completion-trophy" style="width:88px;height:88px;margin:0 auto 20px">
        <i class="fa-solid fa-trophy" style="font-size:40px"></i>
      </div>
      <h2 style="font-size:28px;font-weight:900;color:var(--text-primary);margin-bottom:8px">Kết quả bài thi</h2>
      <p style="color:var(--text-muted);margin-bottom:32px">Bạn đã hoàn thành bài thi TOCFL!</p>

      <div style="display:flex;justify-content:center;gap:32px;margin-bottom:32px">
        <div>
          <div style="font-size:40px;font-weight:900;color:var(--primary)">${pct}%</div>
          <div style="font-size:13px;color:var(--text-muted);font-weight:600">Tỷ lệ đúng</div>
        </div>
        <div>
          <div style="font-size:40px;font-weight:900;color:var(--success)">${correct}</div>
          <div style="font-size:13px;color:var(--text-muted);font-weight:600">Câu đúng</div>
        </div>
        <div>
          <div style="font-size:40px;font-weight:900;color:var(--danger)">${total - correct}</div>
          <div style="font-size:13px;color:var(--text-muted);font-weight:600">Câu sai</div>
        </div>
      </div>

      <div style="background:${pct >= 60 ? 'var(--success-light)' : 'var(--warning-light)'};padding:16px 24px;border-radius:12px;max-width:400px;margin:0 auto 24px">
        <p style="font-weight:700;color:${pct >= 60 ? '#065F46' : '#92400E'}">${pct >= 80 ? '🎉 Xuất sắc! Bạn đã nắm vững kiến thức!' : pct >= 60 ? '👍 Tốt lắm! Cần ôn thêm một chút.' : '📚 Cần luyện tập thêm. Đừng nản!'}</p>
      </div>

      <div style="display:flex;gap:12px;justify-content:center">
        <button class="btn btn-secondary" onclick="window.app.navigate('exam')">
          <i class="fa-solid fa-arrow-left"></i> Quay lại
        </button>
        <button class="btn btn-primary" onclick="window.app.navigate('dashboard')">
          Về trang chủ
        </button>
      </div>
    </div>
  `;
}


/** Từ vựng theo cấp cho riêng trang tra cứu. Tách khỏi kho giáo trình để không đụng tường trả phí. */
const _hskvCache = new Map();      // cấp -> [từ]
const _hskvDangNap = new Map();    // cấp -> promise đang chạy
const _hskvLoi = new Map();        // cấp -> thông báo lỗi

function _hskvNapCap(cap) {
  const k = Number(cap);
  if (_hskvCache.has(k)) return Promise.resolve(_hskvCache.get(k));
  if (!_hskvDangNap.has(k)) {
    const p = fetch(`${apiBase()}/noi-dung/tu-vung-hsk/${k}`)
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then((j) => { _hskvCache.set(k, j.tu || []); _hskvLoi.delete(k); return j.tu || []; })
      // Xoá promise hỏng để nút "Thử lại" còn gọi lại được, chứ không kẹt mãi ở bản lỗi.
      .catch((e) => { _hskvDangNap.delete(k); _hskvLoi.set(k, String(e.message || e)); throw e; });
    _hskvDangNap.set(k, p);
  }
  return _hskvDangNap.get(k);
}








// ============================================================
// HỌC PHÁT ÂM — Thanh mẫu · Vận mẫu · Thanh điệu
// ============================================================
let pronAudio = null;

// Tra đường dẫn mp3 của một âm. Không có file -> trả '' -> pronPlay tự dùng TTS.
// Bảng pronAudioMap do lệnh "npm run audio:pron" sinh ra.
function pronSrc(group, key) {
  const k = `${group}/${key}`;
  // bảng sửa tay (pronAudioFix.js) đè lên bảng tự sinh; giá trị null = ép dùng TTS
  if (Object.prototype.hasOwnProperty.call(pronAudioOverride, k)) return pronAudioOverride[k] || '';
  return pronAudioMap[k] || '';
}

const PRON_SPEEDS = [
  { v: 0.55, label: 'Rất chậm', text: '0.5×' },
  { v: 0.7, label: 'Chậm', text: '0.7×' },
  { v: 0.85, label: 'Vừa', text: '0.85×' },
  { v: 1, label: 'Bình thường', text: '1×' },
];
function pronLoadSpeed() {
  const n = parseFloat(localStorage.getItem('tw_pron_speed'));
  // Mặc định lần đầu ghé trang: "Bình thường" (1) — theo yêu cầu 2026-08-24.
  return PRON_SPEEDS.some(s => s.v === n) ? n : 1;
}

const pronState = {
  speed: pronLoadSpeed(),
  group: { initials: 'all', finals: 'all' },
  quiz: { kind: null, idx: 0, score: 0, answered: false, selected: -1, finished: false },
  seqTimers: [],
};

// Dừng mọi chuỗi phát âm đang chạy
function pronStopSequence() {
  if (pronAudio) { pronAudio.pause(); pronAudio = null; }
  pronState.seqTimers.forEach(t => clearTimeout(t));
  pronState.seqTimers = [];
  document.querySelectorAll('.is-playing').forEach(e => e.classList.remove('is-playing'));
}

// Phát 1 âm: ưu tiên file mp3, nếu không có / lỗi tải thì dùng giọng đọc máy (TTS)
// rateOverride: phát riêng từ này ở 1 tốc độ khác, KHÔNG đổi tốc độ chung của cả trang
// (dùng bởi menu tốc độ riêng từng thẻ — xem `pronSpeedPicker`).
function pronPlay(text, btn, src, rateOverride) {
  const el = btn || (typeof event !== 'undefined' && event ? event.currentTarget : null);
  const rate = typeof rateOverride === 'number' ? rateOverride : pronState.speed;
  if (pronAudio) { pronAudio.pause(); pronAudio = null; }
  if (src) {
    const a = new Audio(assetUrl(src));
    // mp3 nghe chậm lại theo cùng mức tốc độ đang chọn (giữ cao độ)
    a.playbackRate = Math.max(0.5, rate);
    if ('preservesPitch' in a) a.preservesPitch = true;
    pronAudio = a;
    const fallback = () => { if (pronAudio === a) pronAudio = null; speakWord(text, 'zh-TW', rate); };
    a.addEventListener('error', fallback, { once: true });
    a.play().catch(fallback);
  } else {
    speakWord(text, 'zh-TW', rate);
  }
  if (el && el.classList) {
    el.classList.remove('is-playing');
    void el.offsetWidth;
    el.classList.add('is-playing');
    setTimeout(() => el.classList.remove('is-playing'), 700);
  }
}

// Lọc theo nhóm
function pronSetGroup(kind, value) {
  pronStopSequence();
  pronState.group[kind] = value;
  const page = kind === 'initials' ? 'pron-thanhmau' : 'pron-vanmau';
  const el = document.getElementById('page-content');
  if (state.currentPage === page && el) {
    // Cùng trang: chỉ render lại + ghi ?nhom= vào URL, không đẩy thêm history
    updateUrl();
    renderPronSounds(el, kind);
  } else {
    navigate(page, { query: { nhom: value === 'all' ? '' : value } });
  }
}

// Phát 4 thanh của cùng một âm tiết
function pronPlayToneSet(syllable) {
  pronStopSequence();
  const set = syllable === 'ma'
    ? toneMinimalSet.items
    : (toneDrills.find(d => d.syllable === syllable) || { items: [] }).items;
  set.forEach((it, i) => {
    const t = setTimeout(() => {
      const chip = document.querySelector(`.tone-chip[data-tk="${syllable}-${i}"]`);
      speakWord(it.hanzi);
      if (chip) {
        chip.classList.add('is-playing');
        setTimeout(() => chip.classList.remove('is-playing'), 850);
      }
    }, i * 1050);
    pronState.seqTimers.push(t);
  });
}

// ---------- Thành phần dùng chung ----------
function pronSpeedBar() {
  return `
    <div class="pron-speedbar">
      <span class="pron-speed-label"><i class="fa-solid fa-gauge-simple-high"></i> Tốc độ đọc</span>
      <div class="pron-speed-opts">
        ${PRON_SPEEDS.map(sp => `
          <button class="pron-speed-btn ${pronState.speed === sp.v ? 'active' : ''}"
            onclick="window.app.pronSetSpeed(${sp.v})">${sp.label}</button>`).join('')}
      </div>
    </div>`;
}

function pronSetSpeed(v) {
  pronState.speed = v;
  try { localStorage.setItem('tw_pron_speed', String(v)); } catch (e) { /* bỏ qua */ }
  document.querySelectorAll('.pron-speed-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(`(${v})`));
  });
}

// Nút nhỏ mở menu chọn tốc độ RIÊNG cho một thẻ âm/thanh — không đụng vào
// tốc độ chung `pronState.speed` của cả trang (chỉ đổi tốc độ của lần phát này).
// Dùng chung cho thẻ thanh mẫu/vận mẫu (`pronSoundCard`) và thẻ thanh điệu (`renderPronTones`).
function pronSpeedPicker(text, src, targetExpr) {
  // Nút hiển thị số nhân tốc độ (0.5×, 0.7×, 0.85×, 1×) — trực quan hơn icon.
  // Nhãn đầy đủ vẫn còn ở `title` (tooltip khi hover).
  return `
    <div class="pron-speedpick">
      ${PRON_SPEEDS.map(sp => `
        <button type="button" class="pron-speedpick-btn" title="${sp.label} (${sp.v}×)"
          onclick="window.app.pronPlay('${text}', ${targetExpr}, '${src}', ${sp.v})">
          ${sp.text}</button>`).join('')}
    </div>`;
}

function pronHero(opts) {
  return `
    <div class="pron-hero pron-hero--${opts.theme}">
      <div class="pron-hero-main">
        <span class="pron-hero-eyebrow"><i class="fa-solid fa-headphones"></i> Học phát âm · Bài ${opts.step}/4</span>
        <h2 class="pron-hero-title">${opts.title} <span class="font-tc">${H(opts.titleCn)}</span></h2>
        <p class="pron-hero-desc">${opts.desc}</p>
        <div class="pron-hero-stats">
          ${opts.stats.map(s => `<div class="pron-stat"><b>${s.n}</b><span>${s.label}</span></div>`).join('')}
        </div>
      </div>
      <div class="pron-hero-char font-tc" aria-hidden="true">${H(opts.bigChar)}</div>
    </div>
    ${pronSpeedBar()}`;
}

// Resolve audio URL for a quiz item (listen type)
// initials quiz: dùng pinyinChartAudio (audio thật từ tiengtrungthaoan)
// finals quiz: dùng pronSrc (audio thật vận mẫu)
// tones quiz: trả '' → pronPlay sẽ fallback sang TTS
function pronQuizAudioSrc(item) {
  if (!item || item.type !== 'listen') return '';
  // field "audio" → look up in pinyinChartAudio
  if (item.audio && pinyinChartAudio[item.audio]) return pinyinChartAudio[item.audio];
  // field "audioKey" → look up in pronSrc
  if (item.audioKey) return pronSrc(...item.audioKey.split('/'));
  return '';
}

function pronQuizSection(kind, label) {
  return `
    <section class="pron-section">
      <div class="pron-section-head">
        <h3><i class="fa-solid fa-circle-question"></i> Bài tập trắc nghiệm</h3>
        <p>${label}</p>
      </div>
      <div id="pron-quiz-box">${pronQuizBoxHtml(kind)}</div>
    </section>`;
}

function pronQuizBoxHtml(kind) {
  if (!state.isLoggedIn) {
    return `
      <div class="pron-quiz-start">
        <div class="pron-quiz-start-icon" style="color:var(--text-light)"><i class="fa-solid fa-lock"></i></div>
        <p style="margin-bottom:15px;"><b>Bài tập thực hành</b></p>
        <button class="btn btn-primary" onclick="window.app.openAuth()">Đăng nhập để làm bài</button>
      </div>`;
  }
  
  const q = pronState.quiz;
  // `deck` là đề ĐÃ TRỘN của lượt làm bài hiện tại (thứ tự câu + thứ tự đáp án).
  // Màn hình chờ chưa có deck nên đếm tạm trên ngân hàng gốc.
  const bank = (q.kind === kind && q.deck) ? q.deck : (pronQuiz[kind] || []);
  if (q.kind !== kind || q.finished === 'idle') {
    return `
      <div class="pron-quiz-start">
        <div class="pron-quiz-start-icon"><i class="fa-solid fa-headphones-simple"></i></div>
        <p><b>${(pronQuiz[kind] || []).length} câu hỏi</b> — vừa nghe vừa trả lời</p>
        <button class="btn-primary" onclick="window.app.pronQuizStart('${kind}')">
          <i class="fa-solid fa-play"></i> Bắt đầu làm bài
        </button>
      </div>`;
  }
  if (q.finished) {
    const pct = Math.round((q.score / bank.length) * 100);
    const mood = pct >= 80 ? { i: 'fa-trophy', t: 'Xuất sắc!', c: 'good' } : pct >= 50 ? { i: 'fa-thumbs-up', t: 'Khá tốt!', c: 'mid' } : { i: 'fa-seedling', t: 'Cần luyện thêm', c: 'low' };
    return `
      <div class="pron-quiz-result pron-quiz-result--${mood.c}">
        <div class="pron-quiz-result-icon"><i class="fa-solid ${mood.i}"></i></div>
        <div class="pron-quiz-score">${q.score}<span>/${bank.length}</span></div>
        <div class="pron-quiz-mood">${mood.t}</div>
        <div class="pron-quiz-bar"><i style="width:${pct}%"></i></div>
        <button class="btn-primary" onclick="window.app.pronQuizStart('${kind}')">
          <i class="fa-solid fa-rotate-right"></i> Làm lại
        </button>
      </div>`;
  }
  const item = bank[q.idx];
  const pct = Math.round((q.idx / bank.length) * 100);
  return `
    <div class="pron-quiz">
      <div class="pron-quiz-top">
        <span class="pron-quiz-count">Câu ${q.idx + 1} / ${bank.length}</span>
        <span class="pron-quiz-scorechip"><i class="fa-solid fa-star"></i> ${q.score}</span>
      </div>
      <div class="pron-quiz-progress"><i style="width:${pct}%"></i></div>

      ${item.type === 'listen' ? (() => {
        const qSrc = pronQuizAudioSrc(item);
        return `<button class="pron-quiz-listen" onclick="window.app.pronPlay('${item.speak}', this, '${qSrc}')">
          <i class="fa-solid fa-volume-high"></i>
          <span>Bấm để nghe lại</span>
        </button>`;
      })() : ''}

      <div class="pron-quiz-q">${item.question}</div>

      <div class="pron-quiz-options">
        ${item.options.map((o, i) => {
          let cls = '';
          if (q.answered) {
            if (i === item.answer) cls = 'correct';
            else if (i === q.selected) cls = 'wrong';
            else cls = 'dim';
          }
          return `<button class="pron-quiz-opt ${cls}" ${q.answered ? 'disabled' : ''}
            onclick="window.app.pronQuizAnswer(${i})">
            <span class="pron-quiz-key">${'ABCD'[i]}</span>
            <span class="pron-quiz-label">${o}</span>
            ${q.answered && i === item.answer ? '<i class="fa-solid fa-circle-check"></i>' : ''}
            ${q.answered && i === q.selected && i !== item.answer ? '<i class="fa-solid fa-circle-xmark"></i>' : ''}
          </button>`;
        }).join('')}
      </div>

      ${q.answered ? `
        <div class="pron-quiz-explain ${q.selected === item.answer ? 'ok' : 'no'}">
          <i class="fa-solid ${q.selected === item.answer ? 'fa-circle-check' : 'fa-lightbulb'}"></i>
          <span>${item.explain}</span>
        </div>
        <button class="btn-primary pron-quiz-next" onclick="window.app.pronQuizNext()">
          ${q.idx + 1 >= bank.length ? 'Xem kết quả' : 'Câu tiếp theo'} <i class="fa-solid fa-arrow-right"></i>
        </button>` : ''}
    </div>`;
}

function pronQuizStart(kind) {
  // Trộn lại đề MỖI LẦN bắt đầu: đảo thứ tự câu + đảo đáp án trong từng câu (2026-08-28).
  // Ngân hàng câu hỏi là hằng số dùng chung nên tronDe() trả về bản sao, không đụng dữ liệu gốc.
  const deck = tronDe(pronQuiz[kind] || [], { correct: 'answer' });
  pronState.quiz = { kind, idx: 0, score: 0, answered: false, selected: -1, finished: false, history: [], deck };
  pronQuizRefresh();
  if (deck[0] && deck[0].type === 'listen') {
    const src0 = pronQuizAudioSrc(deck[0]);
    setTimeout(() => pronPlay(deck[0].speak, null, src0), 350);
  }
}

function pronQuizAnswer(i) {
  const q = pronState.quiz;
  if (q.answered) return;
  const item = q.deck[q.idx];
  q.answered = true;
  q.selected = i;
  if (i === item.answer) q.score++;
  // Lưu lại từng câu để gửi kèm khi nộp bài — giáo viên xem lại đúng/sai từng câu trong Quản lý lớp.
  if (!q.history) q.history = [];
  q.history.push({
    question: item.question,
    options: item.options,
    selected: i,
    correctIdx: item.answer,
    explain: item.explain || '',
  });
  pronQuizRefresh();
}

function pronQuizNext() {
  const q = pronState.quiz;
  const bank = q.deck;
  if (q.idx + 1 >= bank.length) {
    q.finished = true;
    pronQuizSubmitResult(q, bank);
  } else {
    q.idx++;
    q.answered = false;
    q.selected = -1;
  }
  pronQuizRefresh();
  const next = bank[q.idx];
  if (!q.finished && next && next.type === 'listen') {
    const srcN = pronQuizAudioSrc(next);
    setTimeout(() => pronPlay(next.speak, null, srcN), 300);
  }
}

/** Lưu kết quả bài luyện phát âm (thanh mẫu/vận mẫu/thanh điệu) lên server khi hoàn thành.
 *  Dùng chung bảng exercise_results với bài tập giáo trình, phân biệt bằng lesson_id "pron:<kind>"
 *  (xem server/routes/exercise.js + admin.js — trang Quản lý lớp đọc theo prefix này). */
function pronQuizSubmitResult(q, bank) {
  if (!state.user) return;
  api.post('/exercise/submit', {
    lesson_id: `pron:${q.kind}`,
    total_questions: bank.length,
    correct_answers: q.score,
    time_seconds: 0,
    details: q.history || [],
  }).catch(e => console.warn('Không gửi được kết quả luyện phát âm:', e));
}

function pronQuizRefresh() {
  const box = document.getElementById('pron-quiz-box');
  if (box) box.innerHTML = pronQuizBoxHtml(pronState.quiz.kind);
}

// ---------- Thẻ một âm ----------
function pronSoundCard(it, kind, gi, ii, color) {
  const src = pronSrc(kind, it.pinyin);
  return `
    <article class="pron-card pron-card--${color}" data-sound="${kind}-${gi}-${ii}">
      <div class="pron-card-head">
        <button class="pron-card-play" onclick="window.app.pronPlay('${it.speak}', this.closest('.pron-card'), '${src}')"
          title="Bấm để nghe (tốc độ chung)">
          <span class="pron-card-py">${it.pinyin}</span>
          <span class="pron-card-ipa">${it.ipa || ''}</span>
        </button>
        ${pronSpeedPicker(it.speak, src, `this.closest('.pron-card')`)}
        <button type="button" class="pron-card-speaker" onclick="window.app.pronPlay('${it.speak}', this.closest('.pron-card'), '${src}')"
          title="Bấm để nghe (tốc độ chung)"><i class="fa-solid fa-volume-high"></i></button>
      </div>
      <p class="pron-card-desc">${it.desc}</p>
      ${it.note ? `<p class="pron-card-note"><i class="fa-solid fa-circle-info"></i><span>${it.note}</span></p>` : ''}
      ${it.tip ? `<p class="pron-card-tip"><i class="fa-solid fa-lightbulb"></i><span>${it.tip}</span></p>` : ''}
      <div class="pron-card-ex">
        ${it.examples.map(e => `
          <button class="pron-ex" onclick="window.app.pronPlay('${e.hanzi}', this)">
            <span class="pron-ex-hz font-tc">${H(e.hanzi)}</span>
            <span class="pron-ex-py">${e.pinyin}</span>
            <span class="pron-ex-mn">${e.meaning}</span>
            <i class="fa-solid fa-volume-low"></i>
          </button>`).join('')}
      </div>
    </article>`;
}

// ---------- Trang chung: Thanh mẫu / Vận mẫu ----------
function renderPronSounds(el, kind) {
  const data = kind === 'initials' ? initialsData : finalsData;
  const total = data.reduce((s, g) => s + g.items.length, 0);
  const sel = pronState.group[kind];
  const shown = sel === 'all' ? data.map((g, i) => i) : [parseInt(sel, 10)];

  const hero = kind === 'initials'
    ? pronHero({
        theme: 'initials', step: 2, title: 'Thanh mẫu', titleCn: '聲母', bigChar: '聲',
        desc: 'Thanh mẫu là phụ âm đứng đầu âm tiết. Nắm chắc 21 thanh mẫu này là bạn đọc đúng được phần mở đầu của mọi chữ Hán.',
        stats: [{ n: total, label: 'thanh mẫu' }, { n: data.length, label: 'nhóm' }, { n: initialPairs.length, label: 'cặp dễ nhầm' }],
      })
    : pronHero({
        theme: 'finals', step: 1, title: 'Vận mẫu', titleCn: '韻母', bigChar: '韻',
        desc: 'Vận mẫu là phần vần đứng sau thanh mẫu. Tiếng Trung có 36 vận mẫu — học theo 6 nhóm sẽ nhớ nhanh hơn học rời từng cái.',
        stats: [{ n: total, label: 'vận mẫu' }, { n: data.length, label: 'nhóm' }, { n: 6, label: 'nguyên âm gốc' }],
      });

  el.innerHTML = `
    <div class="pron-page">
      ${hero}

      <div class="pron-tabs">
        <button class="lesson-tab ${sel === 'all' ? 'active' : ''}"
          onclick="window.app.pronSetGroup('${kind}','all')">Tất cả (${total})</button>
        ${data.map((g, i) => `
          <button class="lesson-tab ${sel === String(i) ? 'active' : ''}"
            onclick="window.app.pronSetGroup('${kind}','${i}')">${g.group} (${g.items.length})</button>`).join('')}
      </div>

      ${shown.map(gi => {
        const g = data[gi];
        return `
        <section class="pron-section">
          <div class="pron-group-head pron-group-head--${g.color}">
            <div class="pron-group-badge">${gi + 1}</div>
            <div class="pron-group-title">
              <h3>${g.group} <span class="font-tc">${H(g.groupCn)}</span></h3>
              <p>${g.hint}</p>
            </div>
          </div>
          <div class="pron-grid">
            ${g.items.map((it, ii) => pronSoundCard(it, kind, gi, ii, g.color)).join('')}
          </div>
        </section>`;
      }).join('')}

      ${kind === 'initials' ? `
        <section class="pron-section">
          <div class="pron-section-head">
            <h3><i class="fa-solid fa-code-compare"></i> Luyện phân biệt cặp dễ nhầm</h3>
            <p>Bấm từng bên để nghe và so sánh. Đây là những cặp người Việt hay đọc lẫn nhất.</p>
          </div>
          <div class="pron-pairs">
            ${initialPairs.map(p => `
              <div class="pron-pair">
                <button class="pron-pair-side" onclick="window.app.pronPlay('${p.speakA}', this)">
                  <span class="pron-pair-py">${p.a}</span>
                  <span class="font-tc pron-pair-hz">${H(p.speakA)}</span>
                </button>
                <span class="pron-pair-vs">vs</span>
                <button class="pron-pair-side" onclick="window.app.pronPlay('${p.speakB}', this)">
                  <span class="pron-pair-py">${p.b}</span>
                  <span class="font-tc pron-pair-hz">${H(p.speakB)}</span>
                </button>
                <p class="pron-pair-note">${p.note}</p>
              </div>`).join('')}
          </div>
        </section>` : ''}

      ${pronQuizSection(kind, kind === 'initials'
        ? 'Nghe âm và chọn thanh mẫu đúng, kèm câu hỏi lý thuyết.'
        : 'Nghe âm và chọn vận mẫu đúng, kèm câu hỏi về quy tắc viết.')}


      <div class="pron-nextstep">
        ${kind === 'finals'
          ? `<button class="pron-next-btn" onclick="window.app.navigate('pron-thanhmau')">
              <span><small>Tiết tiếp theo</small><b>Thanh mẫu 聲母</b></span>
              <i class="fa-solid fa-arrow-right"></i></button>`
          : `<button class="pron-next-btn" onclick="window.app.navigate('pron-thanhdieu')">
              <span><small>Tiết tiếp theo</small><b>Thanh điệu 聲調</b></span>
              <i class="fa-solid fa-arrow-right"></i></button>`}
      </div>
    </div>`;
}

function renderPronInitials(el) { renderPronSounds(el, 'initials'); }
function renderPronFinals(el) { renderPronSounds(el, 'finals'); }

// ---------- Biểu đồ cao độ (SVG vẽ gốc) ----------
function toneCurvePath(contour, w, h, padL, padR, padY) {
  const x = p => padL + (p / 100) * (w - padL - padR);
  const y = v => h - padY - ((v - 1) / 4) * (h - padY * 2);
  if (contour.length === 2) return `M ${x(contour[0][0])} ${y(contour[0][1])} L ${x(contour[1][0])} ${y(contour[1][1])}`;
  const [a, b, cc] = contour;
  return `M ${x(a[0])} ${y(a[1])} Q ${x(b[0] - 8)} ${y(b[1])} ${x(b[0] + 6)} ${y(b[1])} T ${x(cc[0])} ${y(cc[1])}`;
}

function toneMiniSvg(t, w = 96, h = 62) {
  const padY = 9;
  return `
    <svg class="tone-mini" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Đường cao độ ${t.name}">
      ${[1, 2, 3, 4, 5].map(v => {
        const y = h - padY - ((v - 1) / 4) * (h - padY * 2);
        return `<line x1="6" y1="${y}" x2="${w - 6}" y2="${y}" class="tone-grid${v === 3 ? ' mid' : ''}"/>`;
      }).join('')}
      <path d="${toneCurvePath(t.contour, w, h, 10, 10, padY)}" class="tone-curve tone-curve--${t.color}"/>
      ${t.num === 0 ? `<circle cx="${w / 2}" cy="${h - padY - ((2.9 - 1) / 4) * (h - padY * 2)}" r="4" class="tone-dot tone-dot--${t.color}"/>` : ''}
    </svg>`;
}

function toneBigChart() {
  const w = 600, h = 230, padL = 46, padR = 24, padY = 30;
  const y = v => h - padY - ((v - 1) / 4) * (h - padY * 2);
  return `
    <svg class="tone-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Biểu đồ cao độ bốn thanh điệu tiếng Trung">
      ${[1, 2, 3, 4, 5].map(v => `
        <line x1="${padL}" y1="${y(v)}" x2="${w - padR}" y2="${y(v)}" class="tone-grid${v === 3 ? ' mid' : ''}"/>
        <text x="${padL - 10}" y="${y(v) + 4}" class="tone-axis" text-anchor="end">${v}</text>`).join('')}
      <text x="${padL - 10}" y="${y(5) - 12}" class="tone-axis" text-anchor="end">cao</text>
      <text x="${padL - 10}" y="${y(1) + 20}" class="tone-axis" text-anchor="end">thấp</text>
      ${tonesData.filter(t => t.num > 0).map(t =>
        `<path d="${toneCurvePath(t.contour, w, h, padL, padR, padY)}" class="tone-curve tone-curve--${t.color}"/>`).join('')}
    </svg>
    <div class="tone-legend">
      ${tonesData.map(t => `
        <button class="tone-legend-item tone-legend--${t.color}" onclick="window.app.pronPlay('${t.speak}', this, '${pronSrc('tones', t.num)}')">
          <i></i><b>${t.num === 0 ? 'Nhẹ' : 'Thanh ' + t.num}</b><span>${t.pitch}</span>
        </button>`).join('')}
    </div>`;
}

function renderPronTones(el) {
  el.innerHTML = `
    <div class="pron-page">
      ${pronHero({
        theme: 'tones', step: 3, title: 'Thanh điệu', titleCn: '聲調', bigChar: '調',
        desc: 'Cùng một âm "ma" nhưng đổi thanh là đổi hẳn nghĩa: mẹ, cây gai, con ngựa hay mắng. Thanh điệu là phần quyết định người Đài Loan có hiểu bạn hay không.',
        stats: [{ n: 4, label: 'thanh chính' }, { n: 1, label: 'thanh nhẹ' }, { n: toneSandhi.length, label: 'quy tắc biến điệu' }],
      })}

      <section class="pron-section">
        <div class="pron-section-head">
          <h3><i class="fa-solid fa-chart-line"></i> Biểu đồ cao độ 4 thanh</h3>
          <p>Thang 1 (thấp nhất) đến 5 (cao nhất). Hình dung giọng mình chạy theo đường vẽ.</p>
        </div>
        <div class="tone-chart-wrap">${toneBigChart()}</div>
      </section>

      <section class="pron-section">
        <div class="pron-section-head">
          <h3><i class="fa-solid fa-list-ol"></i> Chi tiết từng thanh</h3>
          <p>Bấm vào thẻ để nghe chữ mẫu.</p>
        </div>
        <div class="tone-cards">
          ${tonesData.map(t => `
            <article class="tone-card tone-card--${t.color}">
              <button class="tone-card-play" onclick="window.app.pronPlay('${t.speak}', this.closest('.tone-card'), '${pronSrc('tones', t.num)}')">
                <div class="tone-card-top">
                  <span class="tone-num">${t.num === 0 ? '·' : t.num}</span>
                  <div class="tone-name">
                    <b>${t.name} <span class="tone-mark">${t.mark}</span></b>
                    <small class="font-tc">${H(t.nameCn)}</small>
                  </div>
                  <i class="fa-solid fa-volume-high tone-speaker"></i>
                </div>
                ${toneMiniSvg(t)}
                <div class="tone-sample">
                  <span class="font-tc">${H(t.sample.hanzi)}</span>
                  <b>${t.sample.pinyin}</b>
                  <small>${t.sample.meaning}</small>
                </div>
              </button>
              ${pronSpeedPicker(t.speak, pronSrc('tones', t.num), `this.closest('.tone-card')`)}
              <div class="tone-card-body">
                <span class="tone-pitch">Cao độ ${t.pitch}</span>
                <p>${t.desc}</p>
                <p class="tone-vi"><i class="fa-solid fa-flag"></i><span>${t.viNote}</span></p>
                <p class="tone-tip"><i class="fa-solid fa-lightbulb"></i><span>${t.tip}</span></p>
              </div>
            </article>`).join('')}
        </div>
      </section>

      <section class="pron-section">
        <div class="pron-section-head">
          <h3><i class="fa-solid fa-ear-listen"></i> Bộ 5 chữ kinh điển: ma</h3>
          <p>Cùng một âm, năm thanh, năm nghĩa hoàn toàn khác nhau.</p>
        </div>
        <div class="tone-set tone-set--hero">
          ${toneMinimalSet.items.map((it, i) => `
            <button class="tone-chip tone-chip--t${it.tone}" data-tk="ma-${i}"
              onclick="window.app.pronPlay('${it.hanzi}', this)">
              <span class="tone-chip-hz font-tc">${H(it.hanzi)}</span>
              <span class="tone-chip-py">${it.pinyin}</span>
              <span class="tone-chip-mn">${it.meaning}</span>
            </button>`).join('')}
          <button class="tone-set-all" onclick="window.app.pronPlayToneSet('ma')">
            <i class="fa-solid fa-play"></i><span>Nghe cả 5</span>
          </button>
        </div>
      </section>

      <section class="pron-section">
        <div class="pron-section-head">
          <h3><i class="fa-solid fa-dumbbell"></i> Luyện nghe phân biệt</h3>
          <p>Bốn bộ âm tiết khác để tai bạn quen dần với sự thay đổi cao độ.</p>
        </div>
        <div class="tone-drills">
          ${toneDrills.map(d => `
            <div class="tone-drill">
              <div class="tone-drill-head">
                <b>${d.syllable}</b>
                <button class="tone-drill-play" onclick="window.app.pronPlayToneSet('${d.syllable}')">
                  <i class="fa-solid fa-play"></i> Nghe cả bộ
                </button>
              </div>
              <div class="tone-set">
                ${d.items.map((it, i) => `
                  <button class="tone-chip tone-chip--t${it.tone}" data-tk="${d.syllable}-${i}"
                    onclick="window.app.pronPlay('${it.hanzi}', this)">
                    <span class="tone-chip-hz font-tc">${H(it.hanzi)}</span>
                    <span class="tone-chip-py">${it.pinyin}</span>
                    <span class="tone-chip-mn">${it.meaning}</span>
                  </button>`).join('')}
              </div>
            </div>`).join('')}
        </div>
      </section>

      <section class="pron-section">
        <div class="pron-section-head">
          <h3><i class="fa-solid fa-shuffle"></i> Quy tắc biến điệu</h3>
          <p>Chữ viết một đằng, đọc một nẻo — đây là những trường hợp bắt buộc phải nhớ.</p>
        </div>
        <div class="sandhi-list">
          ${toneSandhi.map(s => `
            <article class="sandhi-card">
              <div class="sandhi-head">
                <h4>${s.title}</h4>
                <span class="sandhi-formula">${s.formula}</span>
              </div>
              <p class="sandhi-rule">${s.rule}</p>
              <div class="sandhi-ex">
                ${s.examples.map(e => `
                  <button class="sandhi-item" onclick="window.app.pronPlay('${e.hanzi}', this, '${e.key ? pronSrc('sandhi', e.key) : ''}')">
                    <span class="sandhi-hz font-tc">${H(e.hanzi)}</span>
                    <span class="sandhi-arrow">${e.written} <i class="fa-solid fa-arrow-right"></i> <b>${e.spoken}</b></span>
                    <span class="sandhi-mn">${e.meaning}</span>
                    <i class="fa-solid fa-volume-low"></i>
                  </button>`).join('')}
              </div>
              ${s.note ? `<p class="sandhi-note"><i class="fa-solid fa-circle-info"></i><span>${s.note}</span></p>` : ''}
            </article>`).join('')}
        </div>
      </section>

      <section class="pron-section">
        <div class="pron-section-head">
          <h3><i class="fa-solid fa-pen-nib"></i> Quy tắc đánh dấu thanh điệu</h3>
          <p>Dấu thanh rơi vào nguyên âm nào? Theo đúng thứ tự ưu tiên dưới đây.</p>
        </div>
        <ol class="mark-rules">
          ${toneMarkRules.map((r, i) => `
            <li class="mark-rule">
              <span class="mark-rule-no">${i + 1}</span>
              <div>
                <p>${r.rule}</p>
                <div class="mark-rule-ex">
                  ${(r.samples || []).map(sm => `
                    <button class="mark-chip" onclick="window.app.pronPlay('${sm.hanzi}', this)" title="Bấm để nghe">
                      <span class="mark-chip-hz font-tc">${H(sm.hanzi)}</span>
                      <span class="mark-chip-py">${sm.pinyin}</span>
                      <i class="fa-solid fa-volume-low"></i>
                    </button>`).join('')}
                </div>
              </div>
            </li>`).join('')}
        </ol>
      </section>

      ${pronQuizSection('tones', 'Nghe chữ và đoán thanh, kèm câu hỏi về biến điệu và quy tắc đánh dấu.')}


      <div class="pron-nextstep">
        <button class="pron-next-btn" onclick="window.app.navigate('pron-bangphienam')">
          <span><small>Đã nắm thanh điệu</small><b>Sang bảng phiên âm tổng hợp</b></span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>`;
}

// ============================================================
// BẢNG PHIÊN ÂM TỔNG HỢP (thanh 1)
// ============================================================
const TONE1_MARK = { a: 'ā', o: 'ō', e: 'ē', i: 'ī', u: 'ū', 'ü': 'ǖ' };

/** Gắn dấu thanh 1 vào âm tiết không dấu: hǎo -> a, zǒu -> o/e, liù -> nguyên âm sau */
function toneOne(syl) {
  if (!syl) return syl;
  let i = syl.indexOf('a');
  if (i < 0) i = syl.indexOf('o');
  if (i < 0) i = syl.indexOf('e');
  if (i < 0) {
    for (let k = syl.length - 1; k >= 0; k--) {
      if ('iuü'.includes(syl[k])) { i = k; break; }
    }
  }
  if (i < 0) return syl;
  return syl.slice(0, i) + TONE1_MARK[syl[i]] + syl.slice(i + 1);
}

function renderPinyinChart(el) {
  const cellCount = pinyinChartInitials.reduce((n, ini) => n + Object.keys(pinyinChart[ini] || {}).length, 0);

  const tableHtml = (g) => `
    <section class="pron-section">
      <div class="pron-group-head pron-group-head--${g.color}">
        <div class="pron-group-badge"><i class="fa-solid fa-table-cells"></i></div>
        <div class="pron-group-title">
          <h3>${g.label} <span class="font-tc">${H(g.labelCn)}</span></h3>
          <p>${g.finals.length} vận mẫu — bấm ô để nghe, bấm tiêu đề hàng/cột để nghe riêng thanh mẫu hoặc vận mẫu.</p>
        </div>
      </div>
      <div class="py-table-wrap">
        <table class="py-table py-table--${g.color}">
          <thead>
            <tr>
              <th class="py-corner">聲母 \\ 韻母</th>
              ${g.finals.map(f => `
                <th class="py-fin" ${f === '-i' ? '' : `onclick="window.app.pronPlay('', this, '${pronSrc('finals', f)}')"`}>${f}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${pinyinChartInitials.map(ini => {
              const row = pinyinChart[ini] || {};
              if (!g.finals.some(f => row[f])) return '';
              return `
              <tr>
                <th class="py-ini" ${ini === '∅' ? '' : `onclick="window.app.pronPlay('', this, '${pronSrc('initials', ini)}')"`}>${ini}</th>
                ${g.finals.map(f => {
                  const cell = row[f];
                  if (!cell) return '<td class="py-empty"></td>';
                  const [syl, hz] = cell;
                  const py = toneOne(syl);
                  // 1) Audio gốc từ tiengtrungthaoan.edu.vn
                  let audioUrl = pinyinChartAudio[syl] || '';
                  // 2) Fallback: dùng audio vận mẫu/thanh mẫu đã có sẵn
                  if (!audioUrl) {
                    const ywMap = { yan:'ian', yang:'iang', yong:'iong', wan:'uan', wen:'un', wang:'uang', weng:'ueng' };
                    const fallbackFinal = ywMap[syl] || (ini === '∅' ? f : '');
                    if (fallbackFinal) audioUrl = pronSrc('finals', fallbackFinal);
                  }
                  if (!hz && !audioUrl) return `<td class="py-cell py-cell--mute" title="Không có chữ thanh 1 thông dụng">${py}</td>`;
                  if (!hz && audioUrl) return `<td class="py-cell"><button onclick="window.app.pronPlay('${syl}', this, '${audioUrl}')" title="${py}">${py}</button></td>`;
                  return `<td class="py-cell"><button onclick="window.app.pronPlay('${hz}', this, '${audioUrl}')" title="${hz} · ${py}">${py}</button></td>`;
                }).join('')}
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </section>`;

  el.innerHTML = `
    <div class="pron-page">
      ${pronHero({
        theme: 'chart', step: 4, title: 'Bảng phiên âm', titleCn: '拼音表', bigChar: '拼',
        desc: 'Toàn bộ âm tiết tiếng Trung ghép từ thanh mẫu và vận mẫu, đọc ở thanh 1. Đây là bảng dùng để luyện đọc thành tiếng.',
        stats: [{ n: cellCount, label: 'âm tiết' }, { n: pinyinChartInitials.length - 1, label: 'thanh mẫu' }, { n: 36, label: 'vận mẫu' }],
      })}

      <div class="py-task">
        <i class="fa-solid fa-video"></i>
        <div>
          <b class="py-task-title">Nghe và quay lại bảng phát âm gửi video cho giáo viên</b>
          <p>Đọc lần lượt từng hàng ở <b>thanh 1</b>. Bấm vào ô để nghe mẫu trước khi đọc theo.
             Ô mờ là âm tiết không có chữ Hán thanh 1 thông dụng — vẫn đọc bình thường, chỉ là không có mẫu để nghe.</p>
        </div>
      </div>

      ${pinyinChartGroups.map(tableHtml).join('')}

      <div class="pron-nextstep">
        <button class="pron-next-btn" onclick="window.app.navigate('vocabulary')">
          <span><small>Đã xong 4 tiết phát âm</small><b>Sang học từ vựng</b></span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>


    </div>`;
}

// ============================================================
// TEXT-TO-SPEECH (Web Speech API) — with voice pre-caching
// ============================================================
let _cachedVoices = [];
let _voicesLoaded = false;

// Pre-load voices (they load asynchronously in most browsers)
function _loadVoices() {
  if (!window.speechSynthesis) return;
  _cachedVoices = window.speechSynthesis.getVoices();
  if (_cachedVoices.length > 0) _voicesLoaded = true;
}
_loadVoices();
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    _loadVoices();
    const zh = _cachedVoices.filter(v => v.lang.startsWith('zh'));
    console.log(`🔊 TTS: ${_cachedVoices.length} voices loaded, ${zh.length} tiếng Trung:`,
      zh.map(v => `${v.name} (${v.lang})`));
  };
}

// Tên các giọng nữ tiếng Trung hay gặp trên macOS/iOS (Mei-Jia, Sinji, Tingting),
// Windows/Edge (Xiaoxiao, Yaoyao, Huihui, Xiaoyi, Hanhan), Android/Chrome (Google
// 國語（臺灣）/ Google 普通話（中國大陸）). Danh sách càng rộng thì càng ít khả năng
// rơi vào giọng nam/giọng robot mặc định của hệ thống.
const FEMALE_VOICE_KEYWORDS = [
  'female', 'woman',
  'mei-jia', 'meijia', 'ting-ting', 'tingting', 'sin-ji', 'sinji',
  'hanhan', 'lili', 'yafang', 'xiaoxiao', 'yaoyao', 'huihui', 'xiaoyi',
  'zhiyu', 'xiaoxuan', 'google 國語', 'google 国语', 'google 普通话',
  'google 普通話', 'tracy', 'mei',
];

function _pickChineseVoice() {
  const voices = _cachedVoices.length > 0 ? _cachedVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
  if (voices.length === 0) return null;

  const isFemale = v => FEMALE_VOICE_KEYWORDS.some(k => v.name.toLowerCase().includes(k));
  // 1st priority: Giọng nữ zh-TW
  let best = voices.find(v => v.lang === 'zh-TW' && isFemale(v));
  // 2nd: Giọng nữ tiếng Trung khác (zh-CN, zh-HK...) — thà giọng nữ giọng phổ thông
  // còn hơn giọng nam đài loan, dễ nghe hơn cho người mới học.
  if (!best) best = voices.find(v => v.lang.startsWith('zh') && isFemale(v));
  // 3rd: Bất kỳ giọng zh-TW nào
  if (!best) best = voices.find(v => v.lang === 'zh-TW');
  // 4th: Bất kỳ giọng tiếng Trung nào
  if (!best) best = voices.find(v => v.lang.startsWith('zh'));
  return best || null;
}

function speakWord(text, lang = 'zh-TW', rate, onEnd) {
  // `onEnd` (tuỳ chọn) báo lúc đọc xong — chức năng "Nghe toàn bộ" cần nó để biết khi nào sang
  // từ kế tiếp. Máy không có giọng nào thì gọi luôn, nếu không cả lượt đọc đứng im mãi.
  if (!window.speechSynthesis || !text) {
    console.warn('Speech synthesis not supported or no text');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const doSpeak = () => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    // Mặc định chậm hơn trước (0.82 -> 0.72) — giọng máy trình duyệt ở rate 1.0 luôn
    // nghe rất nhanh với người mới học, kể cả khi đã chọn "Tốc độ đọc" chậm ở trang.
    utter.rate = typeof rate === 'number' ? rate : 0.72;
    // Pitch nhẹ hơn (1.15 -> 1.08): pitch quá cao dễ làm giọng nghe "rít"/nhanh hơn
    // thực tế trên một số giọng hệ thống, kể cả khi rate đã chậm.
    utter.pitch = 1.08;

    const voice = _pickChineseVoice();
    if (voice) utter.voice = voice;
    if (onEnd) { utter.onend = onEnd; utter.onerror = onEnd; }

    // Chrome bug workaround: speechSynthesis can get stuck, resume it
    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(utter);
    }, 10);
  };

  // If voices not loaded yet, wait briefly then speak
  if (!_voicesLoaded && _cachedVoices.length === 0) {
    _loadVoices();
    if (_cachedVoices.length === 0) {
      // Wait for voices to load (max 500ms)
      setTimeout(() => {
        _loadVoices();
        doSpeak();
      }, 300);
      return;
    }
  }
  doSpeak();
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================
/**
 * Chữ Hán để HIỂN THỊ, theo nút 繁/简 trên thanh tiêu đề.
 *
 * Tham số `simplified` là dạng giản thể có sẵn trong dữ liệu — nhưng 6.200/10.562 từ vựng không
 * có nó, còn câu ví dụ / hội thoại / ngữ pháp / đề luyện tập thì chưa bao giờ có. Nên khi thiếu,
 * hàm rơi về bảng tra `sangGianThe()` (2.964 cặp chữ + 16 cụm, sinh từ OpenCC tw2s — xem
 * src/data/gian-the.js). Nhờ vậy MỌI chữ Hán trong app đều chuyển được mà không phải vá dữ liệu.
 *
 * Gọi với MỘT tham số cũng được: `getDisplayText(cauViDu)`.
 */
function getDisplayText(traditional, simplified) {
  if (state.charMode !== 'simplified') return traditional;
  const t = String(traditional == null ? '' : traditional);
  // `simplified` chỉ dùng được khi nó thật sự là bản giản của CHÍNH chuỗi này — vài nơi trong dữ
  // liệu để `simplified` bằng nguyên chuỗi phồn thể, nhận bừa là coi như không chuyển gì.
  if (simplified && simplified !== traditional) return simplified;
  return sangGianThe(t);
}

/** Tên ngắn của `getDisplayText` — dùng trong template chữ Hán cho đỡ dài dòng. */
const H = (traditional, simplified) => getDisplayText(traditional, simplified);

/**
 * Danh sách từ đang luyện (Flashcard + Trắc nghiệm).
 *
 * Trước 2026-09-16 hàm này trả `vocabularyData` — 40 từ mock trong `mockData.js`, lọc theo trường
 * `lesson` mà chỉ 40 từ đó mới có. Hai trang luyện tập vì thế là bản demo trong một hệ thống đang
 * có 23.535 mục từ. Nay đọc từ `state.luyen.tu`, nạp qua `src/utils/kho-luyen-tap.js`.
 */
function getFilteredVocab() {
  return state.luyen.tu || [];
}

/** Nạp một nguồn từ vựng rồi vẽ lại trang đang mở. */
async function luyenChonNguon(nguonId) {
  if (!nguonId) return;
  state.luyen.nguon = nguonId;
  state.luyen.dangNap = true;
  state.luyen.khoa = false;
  state.luyen.loi = '';
  // Đổi nguồn là đổi cả bộ thẻ -> đưa cả hai trang về đầu, nếu không thì chỉ số cũ trỏ vào giữa
  // danh sách mới và học viên tưởng mình đã học được nửa bộ.
  state.fc.currentIndex = 0;
  state.fc.flipped = false;
  state.quiz.order = null;
  state.quiz.currentIndex = 0;
  state.quiz.opts = null;
  state.quiz.answered = false;
  _luyenVeLai();

  try {
    const r = await napTuVung(nguonId, { soTay: [...soTay.values()] });
    if (state.luyen.nguon !== nguonId) return;   // người dùng đã đổi nguồn khác trong lúc chờ
    state.luyen.tu = r.tu || [];
    state.luyen.khoa = !!r.khoa;
    state.luyen.loi = r.loi || '';
  } catch (e) {
    if (state.luyen.nguon !== nguonId) return;
    state.luyen.tu = [];
    state.luyen.loi = 'Không tải được từ vựng. Thử lại nhé.';
  } finally {
    if (state.luyen.nguon === nguonId) {
      state.luyen.dangNap = false;
      _luyenVeLai();
    }
  }
}

function _luyenVeLai() {
  const el = document.getElementById('page-content');
  if (!el) return;
  if (state.currentPage === 'flashcard') renderFlashcard(el);
  else if (state.currentPage === 'quiz') renderQuiz(el);
}

/** Thanh chọn nguồn, dùng chung cho Flashcard và Trắc nghiệm. */
function luyenThanhNguonHtml() {
  const ds = nguonTuVung();
  const nhom = [...new Set(ds.map((n) => n.nhom))];
  const hien = state.luyen.nguon;
  return `
    <div class="luy-nguon">
      <label for="luy-chon"><i class="fa-solid fa-layer-group"></i> Bộ từ đang luyện</label>
      <select id="luy-chon" onchange="window.app.luyenChonNguon(this.value)">
        ${nhom.map((g) => `<optgroup label="${tdEsc(g)}">
          ${ds.filter((n) => n.nhom === g).map((n) => `
            <option value="${n.id}" ${n.id === hien ? 'selected' : ''}>${tdEsc(n.ten)}</option>`).join('')}
        </optgroup>`).join('')}
      </select>
      <span class="luy-dem">${state.luyen.dangNap ? 'đang tải…' : `${(state.luyen.tu || []).length} từ`}</span>
    </div>`;
}

/** Màn hình thay thế khi chưa có từ để học — nói rõ VÌ SAO thay vì để trang trống. */
function luyenTrongHtml() {
  const s = state.luyen;
  if (s.dangNap) return `${luyenThanhNguonHtml()}<div class="tv-empty"><i class="fa-solid fa-spinner fa-spin"></i><p>Đang tải bộ từ…</p></div>`;
  if (s.khoa) {
    return `${luyenThanhNguonHtml()}
      <div class="tv-empty">
        <i class="fa-solid fa-lock"></i>
        <p>Bộ từ này thuộc giáo trình bạn chưa mua.</p>
        <span>Chọn <b>TOCFL</b> hoặc <b>HSK</b> ở trên để luyện miễn phí, hoặc xem gói học.</span>
        <button class="btn btn-primary" onclick="window.app.navigate('account-membership')">Xem gói học</button>
      </div>`;
  }
  if (s.loi) {
    return `${luyenThanhNguonHtml()}<div class="tv-empty"><i class="fa-solid fa-triangle-exclamation"></i>
      <p>${tdEsc(s.loi)}</p>
      <button class="btn btn-primary" onclick="window.app.luyenChonNguon('${tdNhay(s.nguon)}')">Thử lại</button></div>`;
  }
  if (s.nguon === 'so-tay') {
    return `${luyenThanhNguonHtml()}<div class="tv-empty"><i class="fa-solid fa-bookmark"></i>
      <p>Sổ tay của bạn chưa có từ nào.</p>
      <span>Bấm dấu lưu ở bất kỳ thẻ từ nào trong bài học để thêm vào sổ tay.</span></div>`;
  }
  return `${luyenThanhNguonHtml()}<div class="tv-empty"><i class="fa-solid fa-inbox"></i><p>Bộ từ này chưa có dữ liệu.</p></div>`;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function emptyState(msg) {
  return `<div class="empty-state"><i class="fa-solid fa-inbox"></i><h3>${msg}</h3><p>Hãy thử lại sau.</p></div>`;
}




// -- Hội thoại --
// `selectDialogue` / `toggleDialoguePlay` / `dialogueClickLine` của bản mock đã BỎ (2026-09-16):
// chúng đi theo `dialogueData` 3 bài và chạy karaoke bằng `setInterval(2500)` — đoán mỗi câu
// đúng 2,5 giây, không liên quan gì tới bản thu thật. Nay dùng htChonBai / htNgheCau / htTheoDoi.

function toggleDialoguePinyin() {
  state.dialogue.showPinyin = !state.dialogue.showPinyin;
  renderDialogue(document.getElementById('page-content'));
}

function toggleDialogueTrans() {
  state.dialogue.showTrans = !state.dialogue.showTrans;
  renderDialogue(document.getElementById('page-content'));
}

// -- Exam --
function openExamSetup(type) {
  // Legacy: redirect to exam page which now shows the full library
  navigate('exam');
}

/** Helper: load exam from band+de+skill params (used by URL read() and startTocflExam) */
function _loadTocflExamFromUrl(band, de, skill) {
  de = parseInt(de);
  let questions = getTocflQuestions(band, skill, de);
  if (questions.length === 0) {
    questions = skill === 'listening' ? examData.listening : examData.reading;
  }
  // Trộn đề: đảo thứ tự câu + đảo đáp án trong từng câu (xem src/utils/tron-de.js).
  // `sort(() => Math.random() - 0.5)` cũ vừa lệch phân bố vừa KHÔNG đụng tới thứ tự đáp án,
  // mà chính đáp án mới là chỗ học viên thuộc lòng — cả 1600 câu đều có đáp án đúng ở vị trí A.
  questions = tronDe(questions, { kem: ['optionImgs', 'optionsMeaning'] });

  if (state.exam.timerInterval) clearInterval(state.exam.timerInterval);

  state.exam = {
    ...state.exam,
    active: true,
    currentQ: 0,
    answers: new Array(questions.length).fill(undefined),
    timer: 0,
    questions,
    skill,
    examBand: band,
    examDe: de,
    examSkill: skill,
    examLabel: `Band ${band} - Đề ${de}`,
    timerInterval: setInterval(() => {
      state.exam.timer++;
      const display = document.getElementById('exam-timer-display');
      if (display) display.textContent = formatTime(state.exam.timer);
    }, 1000),
  };
}

function startTocflExam(band, de, skill) {
  // Vào được nút này nghĩa là renderExamSetup đã napExam() xong; giữ guard cho chắc.
  if (!napExam.daXong) { napExam().then(() => startTocflExam(band, de, skill)); return; }
  _loadTocflExamFromUrl(band, de, skill);
  navigate('exam-taking', {
    segs: ['band-' + band.toLowerCase(), 'de-' + de, skill === 'reading' ? 'doc' : skill === 'listening' ? 'nghe' : 'ca-hai']
  });
}

async function startExam() {
  closeModal('exam-setup-modal');
  const skill = document.getElementById('exam-skill-select').value;
  let questions = [];
  if (skill === 'both' || skill === 'reading') questions = questions.concat(examData.reading);
  if (skill === 'both' || skill === 'listening') questions = questions.concat(examData.listening);
  questions = tronDe(questions, { kem: ['optionImgs', 'optionsMeaning'] });

  state.exam = {
    ...state.exam,
    active: true,
    currentQ: 0,
    answers: new Array(questions.length).fill(undefined),
    timer: 0,
    questions,
    skill,
  };

  // Start timer
  state.exam.timerInterval = setInterval(() => {
    state.exam.timer++;
    const display = document.getElementById('exam-timer-display');
    if (display) display.textContent = formatTime(state.exam.timer);
  }, 1000);

  navigate('exam-taking');
}

function examAnswer(idx) {
  state.exam.answers[state.exam.currentQ] = idx;
  renderExamTaking(document.getElementById('page-content'));
}

function examNext() {
  if (state.exam.currentQ >= state.exam.questions.length - 1) {
    endExam();
  } else {
    state.exam.currentQ++;
    renderExamTaking(document.getElementById('page-content'));
  }
}

function examPrev() {
  if (state.exam.currentQ > 0) {
    state.exam.currentQ--;
    renderExamTaking(document.getElementById('page-content'));
  }
}

async function endExam() {
  if (state.exam.timerInterval) clearInterval(state.exam.timerInterval);
  state.exam.active = false;

  // Submit kết quả thi lên server (bắt buộc đăng nhập mới vào được trang thi)
  if (state.exam.questions.length > 0 && state.exam.questions[0].id) {
    try {
      // Đáp án đã bị trộn ở client, nhưng server chấm theo exam_questions.correct_option
      // (chỉ số GỐC). Phải quy chỉ số hiển thị về chỉ số gốc bằng q.mapGoc trước khi nộp —
      // quên bước này là chấm sai sạch cả bài mà không có lỗi nào hiện ra.
      const answers = state.exam.questions.map((q, i) => {
        const chon = state.exam.answers[i];
        if (chon === undefined || chon < 0) return { question_id: q.id, selected_option: -1 };
        const goc = Array.isArray(q.mapGoc) && q.mapGoc[chon] !== undefined ? q.mapGoc[chon] : chon;
        return { question_id: q.id, selected_option: goc };
      }).filter(a => a.selected_option >= 0);
      if (answers.length > 0) {
        await api.submitExam(answers, state.exam.skill, state.exam.timer);
      }
    } catch (err) {
      console.warn('Exam submit error:', err);
    }
  }

  renderExamResults(document.getElementById('page-content'));
}

// -- Dictionary --
/**
 * Ô tìm kiếm ở thanh header. Tra bất đồng bộ vì có thể phải nạp mảnh từ điển / chỉ mục —
 * xem `dictTimKiem()` ở section TỪ VỰNG & HÁN TỰ.
 */
function setupDictSearch() {
  const input = document.getElementById('dict-search-input');
  const dropdown = document.getElementById('dict-dropdown');
  if (!input || !dropdown) return;
  let hen = null;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearTimeout(hen);
    if (!q) { dropdown.classList.remove('show'); return; }
    dropdown.innerHTML = '<div class="dict-dropdown-empty">Đang tìm…</div>';
    dropdown.classList.add('show');
    hen = setTimeout(async () => {
      // Ô tìm ở header có mặt trên MỌI trang, nhưng bộ tra nằm trong module Từ vựng & Hán tự
      // (nạp động, 4.40). Nạp ngay lần gõ đầu tiên rồi dùng lại cho các lần sau — thêm khoảng
      // 40 ms cho lần gõ đầu, đổi lại người không bao giờ tra từ thì không phải tải module.
      const mod = await napModuleTrang('dictionary').catch(() => null);
      if (!mod) { dropdown.innerHTML = '<div class="dict-dropdown-empty">Không tải được từ điển.</div>'; return; }
      const kq = await mod.dictTimKiem(q, 8).catch(() => []);
      // Người dùng có thể đã gõ tiếp trong lúc chờ -> bỏ kết quả cũ, đừng vẽ đè.
      if (input.value.trim() !== q) return;
      dropdown.innerHTML = kq.length
        ? kq.map(mod.dictResultItemHtml).join('')
        : '<div class="dict-dropdown-empty">Không tìm thấy kết quả</div>';
      dropdown.classList.add('show');
    }, 240);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length > 0) dropdown.classList.add('show');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#dict-search-wrap')) dropdown.classList.remove('show');
  });
}

// -- Character Mode Toggle --
function toggleCharMode() {
  state.charMode = state.charMode === 'traditional' ? 'simplified' : 'traditional';
  document.getElementById('char-toggle-label').textContent = state.charMode === 'traditional' ? '繁' : '简';
  navigate(state.currentPage);
}

// -- Modal Helpers --
// -- Auth --
function openAuth() {
  const formSide = document.getElementById('auth-form-side');
  formSide.innerHTML = `
    <div class="auth-form-logo">Tẻn <span>學中文</span></div>
    <h2 class="auth-form-title">Đăng nhập hệ thống</h2>
    <div class="auth-error" id="auth-error-msg"></div>
    <div class="auth-success" id="auth-success-msg"></div>

    <div class="auth-divider"><span>Dùng Email & Mật khẩu</span></div>

    <form id="login-form">
      <div class="form-group">
        <label class="form-label primary">Email</label>
        <!-- KHÔNG điền sẵn value. Tài khoản "demo@ten.vn" / "123456" từng được gắn cứng ở đây
             KHÔNG TỒN TẠI trong cơ sở dữ liệu (đã đối chiếu: 18 tài khoản thật, không có nó) —
             CLAUDE.md phần đầu cũng đã cảnh báo đúng chuyện này.
             Hậu quả trên app native: mở ra là ô đã có sẵn thông tin sai, bấm Đăng nhập liền
             nhận "Email hoặc mật khẩu không đúng". Người dùng tưởng tài khoản mình hỏng, chứ
             không nghĩ là phải xoá đi hai ô đã điền sẵn. Trên web ít lộ hơn vì trình duyệt
             thường tự điền đè lên; app native không có cơ chế đó.
             Thuộc tính autocomplete để hệ điều hành gợi ý đúng loại thông tin và lưu vào chuỗi
             khoá. (Chú thích này nằm trong một template literal: không được dùng dấu huyền.) -->
        <input type="email" class="form-input" id="login-email" placeholder="your@email.com"
               autocomplete="username" inputmode="email" autocapitalize="none" spellcheck="false" required>
      </div>
      <div class="form-group">
        <div class="form-row">
          <label class="form-label primary">Mật khẩu</label>
          <a class="form-link" href="javascript:void(0)">Quên mật khẩu?</a>
        </div>
        <input type="password" class="form-input" id="login-password" placeholder="••••••••"
               autocomplete="current-password" required>
      </div>
      <button type="submit" class="btn btn-primary btn-full mt-4" id="login-submit-btn">
        ĐĂNG NHẬP <i class="fa-solid fa-arrow-right"></i>
      </button>
    </form>

    <div class="auth-footer-text">
      Chưa có tài khoản? <a href="javascript:void(0)" onclick="window.app.showRegister()">Đăng ký ngay</a>
    </div>
  `;
  openModal('auth-modal');

  // Attach login handler
  setTimeout(() => {
    const form = document.getElementById('login-form');
    if (form) form.addEventListener('submit', handleLogin);
  }, 50);
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('auth-error-msg');
  const successEl = document.getElementById('auth-success-msg');
  const btn = document.getElementById('login-submit-btn');

  if (errEl) errEl.textContent = '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đăng nhập...'; }

  try {
    const data = await api.login(email, password);
    if (successEl) { successEl.textContent = data.message || 'Đăng nhập thành công!'; successEl.style.display = 'block'; }

    state.isLoggedIn = true;
    state.user = {
      name: data.user.name,
      email: data.user.email || '',
      level: data.user.level_label || 'Tân Sinh · Lv1',
      avatar: data.user.avatar_letter || data.user.name.charAt(0),
      avatarColor: data.user.avatar_color || '#027AB3',
      avatarUrl: data.user.avatar_url || null,
      streak: data.user.streak || 0,
      longestStreak: data.user.longest_streak || 0,
      points: data.user.points || 0,
      wordsToReview: 0,
      charMode: data.user.char_mode || 'traditional',
      is_admin: !!data.user.is_admin,
      is_approved: !!data.user.is_approved,
    };
    state.charMode = data.user.char_mode || 'traditional';

    setTimeout(async () => {
      closeAuth();
      updateSidebarAuth();
      updateHeaderAvatar();
      // Quyền nội dung đổi theo tài khoản — nạp XONG rồi mới vẽ lại, nếu không trang giáo trình
      // vẽ bằng bản chụp của phiên khách và bài vừa mua vẫn hiện ổ khoá cho tới lần đổi trang sau.
      await napQuyenNoiDung();
      navigate(state.currentPage);
    }, 500);
  } catch (err) {
    if (errEl) { errEl.textContent = err.message || 'Đăng nhập thất bại.'; errEl.style.display = 'block'; }
    if (btn) { btn.disabled = false; btn.innerHTML = 'ĐĂNG NHẬP <i class="fa-solid fa-arrow-right"></i>'; }
  }
}

function closeAuth() {
  closeModal('auth-modal');
}

function showApprovalContactModal() {
  openDialog('Tài khoản chưa kích hoạt',
    '<p style="margin-bottom:15px;line-height:1.5;">Tài khoản của bạn hiện đang chờ giáo viên duyệt. Bạn chỉ có thể xem trang chủ.</p>' +
    '<p style="margin-bottom:20px;line-height:1.5;">Vui lòng liên hệ với Facebook <b>Tỉnh Hoàng</b> để được mở tài khoản và cấp quyền sử dụng các chức năng học tập:</p>' +
    '<a href="https://www.facebook.com/tinh.hoang.858548/about" target="_blank" class="btn btn-primary" style="display:inline-block;text-decoration:none;"><i class="fa-brands fa-facebook"></i> Liên hệ Tỉnh Hoàng</a>',
    '<button class="btn btn-outline" onclick="window.app.closeDialog()">Đóng</button>'
  );
}

function showRegister() {
  const formSide = document.getElementById('auth-form-side');
  formSide.innerHTML = `
    <div class="auth-form-logo">Tẻn <span>學中文</span></div>
    <h2 class="auth-form-title">Đăng ký tài khoản</h2>
    <div class="auth-error" id="auth-error-msg"></div>
    <div class="auth-success" id="auth-success-msg"></div>

    <form id="register-form">
      <div class="form-group">
        <label class="form-label primary">Họ và tên</label>
        <input type="text" class="form-input" id="reg-name" placeholder="Nguyễn Văn A" required>
      </div>
      <div class="form-group">
        <label class="form-label primary">Số điện thoại</label>
        <input type="tel" class="form-input" id="reg-phone" placeholder="0912345678">
      </div>
      <div class="form-group">
        <label class="form-label primary">Email</label>
        <input type="email" class="form-input" id="reg-email" placeholder="your@email.com" required>
      </div>
      <div class="form-group">
        <label class="form-label primary">Mật khẩu</label>
        <input type="password" class="form-input" id="reg-password" placeholder="Tối thiểu 6 ký tự" required minlength="6">
      </div>
      <button type="submit" class="btn btn-primary btn-full mt-4" id="register-submit-btn">
        ĐĂNG KÝ <i class="fa-solid fa-check"></i>
      </button>
    </form>

    <div class="auth-footer-text">
      Đã có tài khoản? <a href="javascript:void(0)" onclick="window.app.openAuth()">Đăng nhập</a>
    </div>
  `;

  setTimeout(() => {
    const form = document.getElementById('register-form');
    if (form) form.addEventListener('submit', handleRegister);
  }, 50);
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const phone = document.getElementById('reg-phone').value;
  const errEl = document.getElementById('auth-error-msg');
  const successEl = document.getElementById('auth-success-msg');
  const btn = document.getElementById('register-submit-btn');

  if (errEl) errEl.textContent = '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đăng ký...'; }

  try {
    const data = await api.register(name, email, password, phone);
    if (successEl) { successEl.textContent = data.message || 'Đăng ký thành công! Vui lòng kiểm tra email của bạn.'; successEl.style.display = 'block'; }
    if (btn) { btn.disabled = false; btn.innerHTML = 'ĐÃ GỬI XÁC NHẬN <i class="fa-solid fa-check"></i>'; }

    // Do not log in immediately if verification is required
    if (!data.requireVerification) {
      state.isLoggedIn = true;
      state.user = {
        name: data.user.name,
        level: data.user.level_label || 'Tân Sinh · Lv1',
        avatar: data.user.avatar_letter || data.user.name.charAt(0),
        avatarColor: data.user.avatar_color || '#027AB3',
        streak: 0,
        points: 0,
        wordsToReview: 0,
      };
  
      setTimeout(() => {
        closeAuth();
        updateSidebarAuth();
        navigate(state.currentPage);
      }, 500);
    }
  } catch (err) {
    if (errEl) { errEl.textContent = err.message || 'Đăng ký thất bại.'; errEl.style.display = 'block'; }
    if (btn) { btn.disabled = false; btn.innerHTML = 'ĐĂNG KÝ <i class="fa-solid fa-check"></i>'; }
  }
}

// ============================================================
// USER MENU DROPDOWN
// ============================================================
function toggleUserMenu() {
  const dd = document.getElementById('user-dropdown');
  if (!dd) return;
  const isOpen = dd.classList.contains('open');
  if (isOpen) {
    closeUserMenu();
  } else {
    updateUserMenuUI();
    dd.classList.add('open');
    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', _userMenuOutsideClick, { once: true });
    }, 10);
  }
}

function _userMenuOutsideClick(e) {
  const wrap = document.getElementById('header-user-wrap');
  if (wrap && !wrap.contains(e.target)) {
    closeUserMenu();
  } else {
    // Re-attach if clicked inside
    setTimeout(() => {
      document.addEventListener('click', _userMenuOutsideClick, { once: true });
    }, 10);
  }
}

function closeUserMenu() {
  const dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.remove('open');
}

function _renderAvatarEl(el, user) {
  if (!el) return;
  if (user && user.avatarUrl) {
    el.innerHTML = `<img src="${user.avatarUrl}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
  } else if (user && user.avatar) {
    el.innerHTML = `<span style="font-weight:800;font-size:inherit">${user.avatar}</span>`;
    el.style.background = user.avatarColor || '#027AB3';
  } else {
    el.innerHTML = `<i class="fa-solid fa-user"></i>`;
    el.style.background = '';
  }
}

// ============================================================
// CHUÔNG THÔNG BÁO — nhận xét của giáo viên (xem CLAUDE.md 4.18)
//
// Giáo viên chấm bài trong Admin > Quản lý lớp -> ghi `teacher_review` và reset
// `review_read_at = NULL`. Phía học viên, chuông ở header là NƠI DUY NHẤT thấy được lời phê đó,
// nên khối này hỏng là coi như tính năng chấm bài không tồn tại.
//
// Hai bẫy đã từng làm nó chết im lặng — đừng lặp lại:
//   1. gọi `api.authFetch(...)` (method không tồn tại) rồi bọc trong `catch(e) {}` rỗng;
//   2. gọi `openModal('Tiêu đề', body, footer)` — openModal chỉ nhận ID modal tĩnh.
//      Modal dựng lúc chạy phải dùng `openDialog()`.
// ============================================================
const notifState = { list: [], tab: 'all' };

const NOTIF_PRON = {
  'pron:initials': { label: 'Luyện phát âm — Thanh mẫu', icon: 'fa-volume-high' },
  'pron:finals': { label: 'Luyện phát âm — Vận mẫu', icon: 'fa-volume-high' },
  'pron:tones': { label: 'Luyện phát âm — Thanh điệu', icon: 'fa-volume-high' },
};
const NOTIF_EXAM_SKILL = { listening: 'Nghe hiểu', reading: 'Đọc hiểu', both: 'Nghe + Đọc hiểu' };

/** Chặn HTML lọt vào innerHTML — lời phê là chữ giáo viên tự gõ, không phải markup. */
function escHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/**
 * Icon theo LOẠI thông báo du học. Phải khớp enum `du_hoc_thong_bao.loai` ở server
 * (server/utils/du-hoc-thong-bao.js) — thêm loại mới bên đó thì thêm icon ở đây, thiếu thì rơi
 * về icon máy bay chứ không vỡ.
 * Mọi icon dưới đây đã có trong subset Font Awesome (chạy `npm run data:fa` sau khi thêm mới —
 * icon không có trong subset thì BIẾN MẤT chứ không báo lỗi, CLAUDE.md 4.32).
 */
const NOTIF_DUHOC_ICON = {
  'phong-van': 'fa-comments',
  bay: 'fa-plane-departure',
  visa: 'fa-passport',
  buoc: 'fa-list-check',
  'nhac-giay-to': 'fa-folder-open',
  'nhac-tien': 'fa-money-bill-wave',
  ktx: 'fa-bed',
  'sua-duyet': 'fa-circle-check',
  'sua-tu-choi': 'fa-circle-xmark',
  'khai-bao': 'fa-pen-to-square',
};

/** Tên BÀI đọc được. `topic` = lesson_id (bài tập / bài giao) hoặc skill (bài thi). */
function notifLessonName(n) {
  // Thanh toán: `topic` là mã SẢN PHẨM ('kh-hsk-c3'), không phải mã bài. Phải chặn ở ĐẦU hàm —
  // để rơi xuống dưới thì `tbOf()` không nhận ra và chuông hiện chuỗi thô "Giáo trình — kh-hsk-c3".
  if (n.type === 'payment') return n.san_pham_ten || 'Đơn mua khoá học';
  // Du học: `topic` là LOẠI thông báo ('phong-van', 'bay'...), không phải mã bài — cùng lý do
  // phải chặn ở đầu hàm như thanh toán, để `tbOf()` không nhận nhầm rồi hiện chuỗi thô.
  if (n.type === 'du-hoc') return n.tieu_de || 'Hồ sơ du học';
  // Đề tự soạn: `topic` là 'giao' | 'cham', không phải mã bài — cùng lý do phải chặn ở đầu hàm.
  if (n.type === 'de-bai') return n.tieu_de || 'Bài kiểm tra';
  if (n.type === 'exam') return `Thi thử TOCFL — ${NOTIF_EXAM_SKILL[n.topic] || 'Tổng hợp'}`;
  if (NOTIF_PRON[n.topic]) return NOTIF_PRON[n.topic].label;
  const tv = tocflVocabLabel(n.topic);
  if (tv) return tv;
  if (String(n.topic).startsWith('onllang:')) return `Luyện tập tổng hợp — ${tbLabel(String(n.topic).slice(8))}`;
  if (String(n.topic).startsWith('writing:')) return `Luyện viết — ${tbLabel(String(n.topic).slice(8))}`;
  const g = gameLessonLabel(n.topic);
  if (g) return g;
  // Bài giáo trình: tìm trong ĐÚNG bộ mà id thuộc về (id Thời Đại có tiền tố 'td'), không phải
  // trong bộ đang mở — thông báo hiện ở mọi trang.
  const t = tbOf(n.topic);
  const sub = t.subs.find((s) => s.id === String(n.topic));
  return sub ? `${t.ten}${sub.book !== 1 || t.id === 'thoidai' ? ` Q${sub.book}` : ''} — ${sub.title}` : `Giáo trình — ${tbLabel(n.topic)}`;
}

/** Tiêu đề hiển thị trên chuông. Bài GIAO nói rõ là cô giao, để không lẫn với bài đã chấm. */
function notifLabel(n) {
  if (n.type === 'du-hoc') return n.tieu_de || 'Hồ sơ du học';
  if (n.type === 'assignment') return `Cô giao bài: ${n.title || notifLessonName(n)}`;
  if (n.type === 'de-bai') {
    return n.topic === 'cham'
      ? `Cô đã chấm: ${notifLessonName(n)}`
      : `Cô giao ${n.de_loai === 'kiem-tra' ? 'bài kiểm tra' : 'bài tập'}: ${notifLessonName(n)}`;
  }
  if (n.type === 'payment') {
    return n.trang_thai === 'thanh-cong'
      ? `Đã mở khoá: ${notifLessonName(n)}`
      : `Đơn mua chưa được duyệt: ${notifLessonName(n)}`;
  }
  return notifLessonName(n);
}

function notifIconOf(n) {
  if (n.type === 'payment') {
    return n.trang_thai === 'thanh-cong'
      ? { cls: 'is-pay-ok', icon: 'fa-circle-check' }
      : { cls: 'is-pay-no', icon: 'fa-circle-exclamation' };
  }
  if (n.type === 'du-hoc') return { cls: 'is-duhoc', icon: NOTIF_DUHOC_ICON[n.topic] || 'fa-plane-departure' };
  if (n.type === 'assignment') return { cls: 'is-assign', icon: 'fa-clipboard-list' };
  if (n.type === 'de-bai') return { cls: 'is-assign', icon: n.topic === 'cham' ? 'fa-circle-check' : 'fa-file-pen' };
  if (n.type === 'exam') return { cls: 'is-exam', icon: 'fa-file-pen' };
  if (NOTIF_PRON[n.topic]) return { cls: 'is-pron', icon: 'fa-volume-high' };
  return { cls: '', icon: 'fa-book-open' };
}

/** "vừa xong" / "12 phút trước" / "3 giờ trước" / "hôm qua" / "27/08/2026" */
function timeAgo(value) {
  const d = new Date(value);
  if (isNaN(d)) return '';
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return 'vừa xong';
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  if (s < 172800) return 'hôm qua';
  if (s < 604800) return `${Math.floor(s / 86400)} ngày trước`;
  return d.toLocaleDateString('vi-VN');
}

function fmtDateTime(value) {
  const d = new Date(value);
  if (isNaN(d)) return '—';
  return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function fmtDuration(sec) {
  const n = Number(sec) || 0;
  if (n <= 0) return '—';
  const m = Math.floor(n / 60);
  const s = n % 60;
  if (!m) return `${s} giây`;
  return s ? `${m} phút ${s} giây` : `${m} phút`;
}

/** Điểm dạng % — ưu tiên score_percent của DB, không có thì tự tính. */
function notifPercent(n) {
  if (n.score_percent != null) return Math.round(Number(n.score_percent));
  if (n.total_questions) return Math.round((Number(n.correct_answers) / Number(n.total_questions)) * 100);
  return null;
}

/** Màu chip điểm: ≥80 xanh · ≥50 vàng · dưới nữa đỏ. */
function scoreTone(pct) {
  const p = Number(pct);
  if (!isFinite(p)) return { color: 'var(--text-muted)', bg: 'var(--surface-2)', label: '' };
  if (p >= 80) return { color: '#00705F', bg: 'var(--success-light)', label: 'Tốt' };
  if (p >= 50) return { color: '#9A6B00', bg: 'var(--warning-light)', label: 'Cần cố gắng' };
  return { color: '#C33A3A', bg: 'var(--danger-light)', label: 'Cần làm lại' };
}

async function fetchNotifications() {
  if (!state.isLoggedIn) return;
  try {
    const data = await api.getNotifications();
    notifState.list = data.notifications || [];
  } catch (e) {
    // KHÔNG để catch rỗng: im lặng ở đây là bịt mắt chính mình khi luồng này hỏng.
    console.warn('Không tải được thông báo nhận xét:', e.message || e);
    return;
  }
  renderNotifications();
}

const notifUnreadCount = () => notifState.list.filter((n) => !n.read_at).length;

function renderNotifications() {
  const unread = notifUnreadCount();
  const total = notifState.list.length;

  const badge = document.getElementById('notifications-badge');
  if (badge) {
    badge.textContent = unread > 99 ? '99+' : String(unread);
    badge.style.display = unread ? 'flex' : 'none';
  }
  document.getElementById('btn-notifications')?.classList.toggle('has-unread', unread > 0);

  const cnt = document.getElementById('notif-head-count');
  if (cnt) { cnt.textContent = `${unread} mới`; cnt.style.display = unread ? '' : 'none'; }
  const readAll = document.getElementById('notif-readall');
  if (readAll) readAll.disabled = unread === 0;

  const tabAll = document.getElementById('notif-tab-all');
  const tabUnread = document.getElementById('notif-tab-unread');
  if (tabAll) {
    tabAll.textContent = `Tất cả (${total})`;
    tabAll.classList.toggle('active', notifState.tab === 'all');
  }
  if (tabUnread) {
    tabUnread.textContent = `Chưa đọc (${unread})`;
    tabUnread.classList.toggle('active', notifState.tab === 'unread');
  }

  const listEl = document.getElementById('notif-list');
  if (!listEl) return;
  const items = notifState.tab === 'unread'
    ? notifState.list.filter((n) => !n.read_at)
    : notifState.list;

  if (!items.length) {
    listEl.innerHTML = notifState.tab === 'unread'
      ? '<div class="notif-empty"><i class="fa-solid fa-circle-check"></i>Bạn đã đọc hết nhận xét 🎉</div>'
      : '<div class="notif-empty"><i class="fa-solid fa-bell-slash"></i>Chưa có thông báo nào từ giáo viên</div>';
    return;
  }
  listEl.innerHTML = items.map(notifItemHtml).join('');
}

function notifItemHtml(n) {
  const isUnread = !n.read_at;
  const ic = notifIconOf(n);
  const meta = [];
  let dong2;

  if (n.type === 'du-hoc') {
    // Du học: nội dung đã viết sẵn ở server, hiện nguyên văn. Có ngày liên quan thì thêm chip —
    // đó là thứ học sinh cần thấy đầu tiên (còn mấy ngày nữa tới lịch).
    dong2 = `<i class="fa-solid fa-circle-info"></i>${escHtml(n.noi_dung || '')}`;
    if (n.ngay_lien_quan) {
      const d = assignmentDue(n.ngay_lien_quan);
      meta.push(`<span class="notif-chip" style="color:${d.color};background:${d.bg}">${escHtml(d.text)}</span>`);
    }
  } else if (n.type === 'assignment') {
    // Bài GIAO: học viên cần biết bài nào, lớp nào, hạn bao giờ, mình nộp chưa.
    const due = assignmentDue(n.due_date);
    dong2 = `<i class="fa-solid fa-book"></i>${escHtml(notifLessonName(n))}${n.class_name ? ` · lớp ${escHtml(n.class_name)}` : ''}${n.note ? ` · ${escHtml(n.note)}` : ''}`;
    meta.push(n.submitted
      ? '<span class="notif-chip" style="color:#047857;background:var(--success-light)">Đã nộp</span>'
      : `<span class="notif-chip" style="color:${due.color};background:${due.bg}">${escHtml(due.text)}</span>`);
  } else {
    const pct = notifPercent(n);
    const tone = scoreTone(pct);
    dong2 = `<i class="fa-solid fa-quote-left"></i>${escHtml(n.teacher_review || '')}`;
    if (pct != null) meta.push(`<span class="notif-chip" style="color:${tone.color};background:${tone.bg}">${pct}%</span>`);
    if (n.total_questions) meta.push(`<span>${n.correct_answers}/${n.total_questions} câu đúng</span>`);
  }
  meta.push(`<span>${timeAgo(n.created_at)}</span>`);

  return `
    <div class="notif-item ${isUnread ? 'unread' : 'read'}" onclick="window.app.readNotification('${n.type}', ${n.id})">
      <div class="notif-ico ${ic.cls}"><i class="fa-solid ${ic.icon}"></i></div>
      <div class="notif-body">
        <div class="notif-title">
          <span class="notif-label">${escHtml(notifLabel(n))}</span>
          ${isUnread ? '<span class="notif-dot"></span>' : ''}
        </div>
        <div class="notif-quote">${dong2}</div>
        <div class="notif-meta">${meta.join('<span class="notif-sep">·</span>')}</div>
      </div>
    </div>`;
}

function setNotifTab(tab) {
  notifState.tab = tab;
  renderNotifications();
}

function toggleNotifications() {
  const dd = document.getElementById('notifications-dropdown');
  if (!dd) return;
  if (dd.classList.contains('show')) {
    dd.classList.remove('show');
  } else {
    document.getElementById('user-dropdown')?.classList.remove('show');
    dd.classList.add('show');
  }
}

async function markAllNotificationsRead() {
  if (notifUnreadCount() === 0) return;
  // Cập nhật ngay trên máy rồi mới gọi API: bấm là thấy đổi, không đợi mạng.
  const now = new Date().toISOString();
  notifState.list.forEach((n) => { if (!n.read_at) n.read_at = now; });
  renderNotifications();
  try {
    await api.markAllNotificationsRead();
  } catch (e) {
    console.warn('Không đánh dấu được tất cả đã đọc:', e.message || e);
  }
  fetchNotifications();
}

async function readNotification(type, id) {
  toggleNotifications();
  // Khoá tra là CẶP (type, id): exercise_results / exam_results / assignments là 3 bảng khác nhau,
  // id trùng nhau như cơm bữa — tra bằng mỗi id là mở nhầm bài.
  // ⚠️ id của 'de-bai' là chuỗi có tiền tố ('g12' = lượt giao, 'b7' = bài làm) để phân biệt hai
  // bảng khác nhau cùng mang type này — Number() ra NaN, phải so bằng chuỗi.
  const n = notifState.list.find((x) => x.type === type && String(x.id) === String(id));

  if (type === 'du-hoc') {
    // Mọi thông báo du học đều dẫn về một chỗ: trang hồ sơ du học của em.
    navigate('account-duhoc');
  } else if (type === 'payment') {
    // Đơn mua: đưa thẳng tới trang Gói thành viên — duyệt rồi thì vào học, bị từ chối thì gửi
    // lại biên lai. Modal xem lại bài làm không liên quan gì ở đây.
    navigate('account-membership');
  } else if (type === 'de-bai') {
    // Tin GIAO ĐỀ -> tới trang làm bài; tin ĐÃ CHẤM -> mở thẳng bài làm đó để xem điểm + nhận xét.
    // Modal "xem lại bài tập" không đọc được dữ liệu của đề tự soạn, đừng gọi vào đó.
    navigate('path-kiemtra');
    if (n && n.topic === 'cham' && n.bai_lam_id) {
      // Module trang nạp xong mới có handler — chờ một nhịp rồi mới gọi.
      setTimeout(() => window.app.ktXemLai?.(n.de_id, n.bai_lam_id), 400);
    }
  } else if (type === 'assignment') {
    // Bài GIAO thì không có gì để đọc trong modal — đi thẳng tới trang làm bài, đúng thứ
    // học viên cần khi bấm vào "cô giao bài".
    if (n) openAssignment(n.topic);
  } else {
    // Bài đã chấm: mở modal TRƯỚC, đánh dấu đã đọc SAU — lỗi đánh dấu không được chặn
    // học viên xem nhận xét.
    openStudentReviewModal(type, id);
  }

  if (n && n.read_at) return;
  if (n) { n.read_at = new Date().toISOString(); renderNotifications(); }
  try {
    await api.markNotificationRead(type, id);
  } catch (e) {
    console.warn('Không đánh dấu được đã đọc:', e.message || e);
  }
}

// ------------------------------------------------------------------
// Modal chi tiết: bài nào, làm lúc nào, điểm bao nhiêu, lời phê, và XEM LẠI TỪNG CÂU.
// ------------------------------------------------------------------

/**
 * Chuẩn hoá 3 kiểu dữ liệu bài làm về CÙNG một dạng để render chung:
 *   · bài thi   -> { result, answers } (answers đã JOIN sẵn câu hỏi)
 *   · giáo trình -> details = { questions, answers } (answers[i] = chỉ số đã chọn, -1 = bỏ trống)
 *   · phát âm    -> details = mảng phẳng, options là chuỗi, có sẵn `explain`
 * Xem thêm ghi chú "details_json có 2 dạng" ở CLAUDE.md 4.15.
 */
function reviewQuestions(type, data) {
  if (type === 'exam') {
    return (data.answers || []).map((a) => ({
      question: a.question || '',
      sub: a.question_meaning || '',
      options: [a.option_a, a.option_b, a.option_c, a.option_d].filter((o) => o != null && o !== ''),
      chosen: a.selected_option == null ? -1 : Number(a.selected_option),
      correctIdx: Number(a.correct_option),
      explain: '',
    }));
  }
  const d = data.details;
  if (d && Array.isArray(d.questions)) {
    const ans = Array.isArray(d.answers) ? d.answers : [];
    return d.questions.map((q, i) => ({
      question: q.question || q.prompt || '',
      sub: [q.wordHanzi, q.wordPinyin].filter(Boolean).join(' · '),
      options: (q.options || []).map((o) => (typeof o === 'string' ? o : o.text)),
      chosen: ans[i] == null ? -1 : Number(ans[i]),
      correctIdx: q.correctIdx != null ? Number(q.correctIdx) : (q.options || []).findIndex((o) => o && o.correct),
      explain: q.wordDef ? `${q.wordHanzi || ''}${q.wordPinyin ? ` (${q.wordPinyin})` : ''} — ${q.wordDef}`.trim() : '',
    }));
  }
  if (Array.isArray(d)) {
    return d.map((q) => ({
      question: q.question || '',
      sub: '',
      options: q.options || [],
      chosen: q.selected == null ? -1 : Number(q.selected),
      correctIdx: Number(q.correctIdx),
      explain: q.explain || '',
    }));
  }
  return [];
}

function reviewQuestionHtml(q, i) {
  const skipped = q.chosen < 0;
  const right = !skipped && q.chosen === q.correctIdx;
  const cls = right ? 'is-right' : (skipped ? 'is-skip' : 'is-wrong');

  const opts = q.options.map((o, oi) => {
    const isCorrect = oi === q.correctIdx;
    const isPicked = oi === q.chosen;
    const optCls = isCorrect ? 'is-correct' : (isPicked ? 'is-wrong' : '');
    const icon = isCorrect ? 'fa-circle-check' : (isPicked ? 'fa-circle-xmark' : 'fa-circle');
    const tag = isCorrect ? (isPicked ? 'Bạn chọn · đúng' : 'Đáp án đúng') : (isPicked ? 'Bạn chọn' : '');
    return `<div class="rv-opt ${optCls}">
      <i class="fa-${isCorrect || isPicked ? 'solid' : 'regular'} ${icon}"></i>
      <span>${escHtml(o)}</span>
      ${tag ? `<em class="rv-tag">${tag}</em>` : ''}
    </div>`;
  }).join('');

  return `
    <div class="rv-q ${cls}">
      <div class="rv-q-head">
        <span class="rv-q-num">${i + 1}</span>
        <div class="rv-q-text">
          ${escHtml(q.question)}
          ${q.sub ? `<div class="rv-q-sub">${escHtml(q.sub)}</div>` : ''}
        </div>
      </div>
      <div class="rv-opts">${opts}</div>
      ${skipped ? '<div class="rv-explain"><i class="fa-solid fa-circle-info"></i><span>Câu này bạn bỏ trống, chưa chọn đáp án nào.</span></div>' : ''}
      ${q.explain ? `<div class="rv-explain"><i class="fa-solid fa-lightbulb"></i><span>${escHtml(q.explain)}</span></div>` : ''}
    </div>`;
}

function toggleReviewList(btn) {
  const list = document.getElementById('rv-list');
  if (!list) return;
  const open = list.classList.toggle('open');
  btn.classList.toggle('open', open);
  const label = btn.querySelector('.rv-toggle-label');
  if (label) label.textContent = open ? 'Ẩn bài đã làm' : `Xem lại bài đã làm (${list.dataset.count} câu)`;
}

async function openStudentReviewModal(type, id) {
  openDialog('Nhận xét của giáo viên',
    '<div style="text-align:center;padding:40px 0"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px;color:var(--primary)"></i></div>', '');
  try {
    const data = type === 'exam' ? await api.getExamResult(id) : await api.getExerciseResult(id);
    const r = type === 'exam' ? data.result : data;
    const n = { type, topic: type === 'exam' ? r.skill : r.lesson_id };

    const pct = notifPercent(r);
    const tone = scoreTone(pct);
    const ic = notifIconOf(n);
    const questions = reviewQuestions(type, data);
    // Số câu sai lấy từ CON SỐ ĐÃ LƯU, không đếm lại từ details: details có thể thiếu
    // (bản ghi cũ nộp trước khi có details_json) và khi đó đếm ra 0 câu sai là nói dối.
    const wrong = (r.total_questions != null && r.correct_answers != null)
      ? Number(r.total_questions) - Number(r.correct_answers)
      : questions.filter((q) => q.chosen !== q.correctIdx).length;

    const body = `
      <div class="rv-head">
        <div class="notif-ico ${ic.cls}"><i class="fa-solid ${ic.icon}"></i></div>
        <div class="rv-head-txt">
          <h4>${escHtml(notifLabel(n))}</h4>
          <p>${type === 'exam' ? 'Bài thi thử' : 'Bài tập'} · đã làm ${timeAgo(r.created_at)}</p>
        </div>
      </div>

      <div class="rv-stats">
        <div class="rv-stat">
          <div class="rv-stat-label"><i class="fa-solid fa-bullseye"></i> Điểm</div>
          <div class="rv-stat-value" style="color:${tone.color}">${pct != null ? `${pct}%` : '—'}</div>
          ${tone.label ? `<div class="rv-stat-sub">${tone.label}</div>` : ''}
        </div>
        <div class="rv-stat">
          <div class="rv-stat-label"><i class="fa-solid fa-list-check"></i> Số câu đúng</div>
          <div class="rv-stat-value">${r.correct_answers ?? 0}<span style="font-size:13px;font-weight:600;color:var(--text-muted)">/${r.total_questions ?? 0}</span></div>
          ${wrong ? `<div class="rv-stat-sub">Sai ${wrong} câu</div>` : '<div class="rv-stat-sub">Không sai câu nào</div>'}
        </div>
        <div class="rv-stat">
          <div class="rv-stat-label"><i class="fa-regular fa-clock"></i> Thời gian làm</div>
          <div class="rv-stat-value" style="font-size:15px">${fmtDuration(r.time_seconds)}</div>
        </div>
        <div class="rv-stat">
          <div class="rv-stat-label"><i class="fa-regular fa-calendar"></i> Đã làm lúc</div>
          <div class="rv-stat-value" style="font-size:15px">${fmtDateTime(r.created_at)}</div>
          <div class="rv-stat-sub">${timeAgo(r.created_at)}</div>
        </div>
      </div>

      <div class="rv-review">
        <h5><i class="fa-solid fa-comment-dots"></i> Lời phê của giáo viên</h5>
        <p>${escHtml(r.teacher_review || 'Giáo viên chưa ghi nhận xét cho bài này.')}</p>
      </div>

      ${questions.length ? `
        <button class="rv-toggle" onclick="window.app.toggleReviewList(this)">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span class="rv-toggle-label">Xem lại bài đã làm (${questions.length} câu)</span>
          <i class="fa-solid fa-chevron-down rv-toggle-caret"></i>
        </button>
        <div class="rv-list" id="rv-list" data-count="${questions.length}">
          ${questions.map(reviewQuestionHtml).join('')}
        </div>
      ` : '<div class="rv-nodetail"><i class="fa-solid fa-box-open"></i> Bài này không lưu chi tiết từng câu nên không xem lại được.</div>'}
    `;

    const again = type === 'exam'
      ? `<button class="btn btn-primary" onclick="window.app.closeDialog(); window.app.navigate('exam')"><i class="fa-solid fa-file-pen"></i> Tới trang thi thử</button>`
      : `<button class="btn btn-primary" onclick="window.app.closeDialog(); window.app.openAssignment('${r.lesson_id}')"><i class="fa-solid fa-rotate-right"></i> Làm lại bài</button>`;

    openDialog('Nhận xét của giáo viên', body,
      `<button class="btn btn-outline" onclick="window.app.closeDialog()">Đóng</button>${again}`);
  } catch (err) {
    openDialog('Không mở được nhận xét',
      `<p style="line-height:1.6">${escHtml(err.message || 'Không tải được chi tiết bài làm.')}</p>`,
      `<button class="btn btn-outline" onclick="window.app.closeDialog()">Đóng</button>`);
  }
}


// Close notifications when clicking outside
document.addEventListener('click', (e) => {
  const notifBtn = document.getElementById('btn-notifications');
  const notifDd = document.getElementById('notifications-dropdown');
  if (notifBtn && notifDd && !notifBtn.contains(e.target) && !notifDd.contains(e.target)) {
    notifDd.classList.remove('show');
  }
});

function updateHeaderAvatar() {
  const inner = document.getElementById('user-avatar-inner');
  if (!inner) return;
  if (state.isLoggedIn && state.user) {
    if (state.user.avatarUrl) {
      inner.innerHTML = `<img src="${state.user.avatarUrl}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      inner.style.background = 'transparent';
      inner.style.fontSize = '0';
      inner.classList.remove('co-nen');
    } else {
      inner.innerHTML = `<span>${state.user.avatar || 'U'}</span>`;
      inner.style.background = state.user.avatarColor || '#027AB3';
      inner.style.fontSize = '';
      // Chữ cái đầu nằm trên nền màu đậm -> cần chữ trắng. Không có class này thì chữ lấy màu
      // xám nhạt của nút và gần như chìm vào nền.
      inner.classList.add('co-nen');
    }
  } else {
    inner.innerHTML = `<i class="fa-solid fa-user"></i>`;
    inner.style.background = '';
    // Bỏ nền màu thì cũng phải bỏ chữ trắng, nếu không icon người trắng nằm trên nền trắng của
    // nút và biến mất hoàn toàn.
    inner.classList.remove('co-nen');
  }
}

async function updateUserMenuUI() {
  const nameEl = document.getElementById('user-dd-name');
  const emailEl = document.getElementById('user-dd-email');
  const levelEl = document.getElementById('user-dd-level');
  const statsEl = document.getElementById('user-dd-stats');
  const ddAvatar = document.getElementById('user-dd-avatar');
  const loginBtn = document.getElementById('user-dd-login-btn');
  const classInfo = document.getElementById('user-dd-class-info');

  if (!state.isLoggedIn) {
    if (nameEl) nameEl.textContent = 'Khách';
    if (emailEl) emailEl.textContent = 'Chưa đăng nhập';
    if (levelEl) levelEl.textContent = '';
    if (statsEl) statsEl.innerHTML = '';
    if (ddAvatar) { ddAvatar.innerHTML = '<i class="fa-solid fa-user"></i>'; ddAvatar.style.background = ''; }
    if (loginBtn) { loginBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Đăng nhập'; loginBtn.className = 'user-dd-item'; }
    return;
  }

  const u = state.user;
  if (nameEl) nameEl.textContent = u.name || 'Học viên';
  if (emailEl) emailEl.textContent = u.email || '';
  if (levelEl) levelEl.textContent = u.level || '';
  _renderAvatarEl(ddAvatar, u);

  if (loginBtn) {
    loginBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Đăng xuất';
    loginBtn.className = 'user-dd-item user-dd-logout';
  }

  if (statsEl) {
    statsEl.innerHTML = `
      <div class="user-dd-stat"><span>${u.streak || 0}</span><small>🔥 Streak</small></div>
      <div class="user-dd-stat"><span>${u.points || 0}</span><small>⭐ Điểm</small></div>
    `;
  }

  // Load class info asynchronously
  if (classInfo) {
    try {
      const data = await api.getMyClasses();
      classInfo.textContent = data.classes && data.classes.length > 0
        ? data.classes.map(c => c.name).join(', ')
        : 'Chưa vào lớp nào';
    } catch (_) { classInfo.textContent = 'Khóa học của tôi'; }
  }
}

function userMenuAuthAction() {
  closeUserMenu();
  if (state.isLoggedIn) {
    logout();
  } else {
    openAuth();
  }
}

function triggerAvatarUpload() {
  if (!state.isLoggedIn) { closeUserMenu(); openAuth(); return; }
  if (state.isLoggedIn && !state.user.is_admin && !state.user.is_approved) {
    closeUserMenu();
    showApprovalContactModal();
    return;
  }
  const inp = document.getElementById('avatar-file-input');
  if (inp) inp.click();
}

async function handleAvatarFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = ''; // reset so same file can be selected again

  // Compress & convert to base64
  const reader = new FileReader();
  reader.onload = async (ev) => {
    const origDataUrl = ev.target.result;
    // Compress via canvas
    const img = new Image();
    img.onload = async () => {
      const MAX = 300;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);

      // Optimistic update
      state.user.avatarUrl = dataUrl;
      updateHeaderAvatar();
      const ddAvatar = document.getElementById('user-dd-avatar');
      if (ddAvatar) _renderAvatarEl(ddAvatar, state.user);
      
      // Update account page avatar if we are on that page
      if (state.currentPage === 'account-profile') {
        const wrap = document.querySelector('.profile-avatar-wrap');
        if (wrap) {
          const oldImg = wrap.querySelector('img, .avatar-letter');
          if (oldImg) oldImg.remove();
          wrap.insertAdjacentHTML('afterbegin', `<img src="${dataUrl}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`);
        }
      }

      // Upload to server
      try {
        await api.uploadAvatar(dataUrl);
        // Persist in local storage
        const stored = JSON.parse(localStorage.getItem('tw_user') || '{}');
        stored.avatar_url = dataUrl;
        localStorage.setItem('tw_user', JSON.stringify(stored));
      } catch (err) {
        console.error('Avatar upload failed:', err);
        // Revert
        state.user.avatarUrl = null;
        updateHeaderAvatar();
        if (ddAvatar) _renderAvatarEl(ddAvatar, state.user);

        if (state.currentPage === 'account-profile') {
          const wrap = document.querySelector('.profile-avatar-wrap');
          if (wrap) {
            const oldImg = wrap.querySelector('img');
            if (oldImg) oldImg.remove();
            if (!wrap.querySelector('.avatar-letter')) {
              wrap.insertAdjacentHTML('afterbegin', `<span class="avatar-letter">${state.user.avatar || state.user.name.charAt(0).toUpperCase()}</span>`);
            }
          }
        }
        
        alert('Không thể lưu ảnh đại diện: ' + (err.message || 'Lỗi không xác định.'));
      }
    };
    img.src = origDataUrl;
  };
  reader.readAsDataURL(file);
}

function logout() {
  api.logout();
  state.isLoggedIn = false;
  state.user = { name: 'Học viên', level: 'Tân Sinh · Lv1', avatar: 'U', streak: 0, points: 0, wordsToReview: 0, avatarUrl: null };
  // Xoá luôn sổ tay khỏi máy: máy dùng chung mà giữ lại thì người đăng nhập sau nhìn thấy
  // sổ tay của người trước. Bản trên tài khoản vẫn còn nguyên, đăng nhập lại là có.
  soTayXoaHet();
  // Quyền nội dung là của TÀI KHOẢN, không phải của máy — đăng xuất mà giữ lại thì người dùng
  // tiếp theo trên cùng máy thấy bài mở khoá (giao diện thôi, server vẫn chặn) rồi bấm vào lại
  // gặp tấm chắn: rối mà không giải thích được.
  state.quyen = { daNap: false, tatCa: false, bo: [], quyen: [], hetHan: null };
  quenBaiBiKhoa();
  napQuyenNoiDung();
  updateSidebarAuth();
  updateHeaderAvatar();
  navigate('dashboard');
}

// -- Mobile Sidebar --
function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

// -- Mascot --
function toggleMascot() {
  // Simple greeting
  alert('🐝 Chào bạn! Mình là Ong chăm chỉ. Hãy cố gắng học mỗi ngày nhé!');
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (state.currentPage === 'tocfl-duongdai' && ddState.activeTab === 'flashcard') {
    if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); ddFcNav(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); ddFcNav(-1); }
    if (e.code === 'Space') { e.preventDefault(); ddFcFlip(); }
  }
  // Flashcard của Kho từ vựng và Sổ tay (4.37) — cùng phím với flashcard giáo trình.
  const nsLuy = state.currentPage === 'vocabulary' ? 'kv'
    : state.currentPage === 'notebook' ? 'st' : null;
  // Handler nằm trong module nạp động; đang đứng ở đúng hai trang đó nghĩa là module đã tải,
  // nhưng vẫn kiểm tra trước khi gọi để phím tắt không ném lỗi trong lúc module đang tải dở.
  if (nsLuy && window.app.luyNav && window.app.luyLat) {
    const mod = _daNapModule.get(MODULE_TRANG[state.currentPage]);
    if (mod && mod.LUY_STATE[nsLuy]().tab === 'flashcard') {
      if (e.key === 'ArrowRight') { e.preventDefault(); window.app.luyNav(nsLuy, 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); window.app.luyNav(nsLuy, -1); }
      if (e.code === 'Space') { e.preventDefault(); window.app.luyLat(nsLuy); }
    }
  }
  if (state.currentPage === 'flashcard') {
    if (e.code === 'Space') { e.preventDefault(); fcFlip(); }
    if (state.fc.flipped) {
      if (e.key === '1') fcRate('again');
      if (e.key === '2') fcRate('hard');
      if (e.key === '3') fcRate('good');
      if (e.key === '4') fcRate('easy');
    }
  }
});

// ============================================================
// GIÁO TRÌNH — một bộ, nhưng khung vẫn dựng cho nhiều bộ
// ============================================================
// Toàn bộ renderer `dd*` đọc dữ liệu qua `TB()` chứ không đọc thẳng biến của một bộ, nên thêm
// bộ thứ hai về sau chỉ là thêm một entry ở đây. Id bài của Thời Đại luôn có tiền tố 'td'
// ('td2-5.1') — bộ thêm sau cũng phải có tiền tố riêng để `tbOf()` phân biệt được.
const GIAO_TRINH = {
  thoidai: {
    id: 'thoidai', page: 'tocfl-thoidai', ten: 'Thời Đại', tenDay: 'Giáo trình Thời Đại',
    hanzi: '時代華語',
    books: thoidaiBooks, lessons: thoidaiLessons, subs: thoidaiSubLessons, tabs: thoidaiTabs,
    vocab: thoidaiVocab, grammar: thoidaiGrammar, dialogues: thoidaiDialogues,
    writing: thoidaiWriting, culture: [],
    parseId: tdParseLessonId, subSegs: tdSubSegs, segsToSub: tdSegsToSub,
    label: tdLessonLabel, bookOf: tdBookOf,
    coVanHoa: false, coDich: false, coLuyenTap: true,
  },
};

/** Bộ giáo trình đang xem (mặc định Đương đại). */
function TB(id) { return GIAO_TRINH[id || ddState.tb] || GIAO_TRINH.thoidai; }

/** Bộ nào chứa id bài này? Hiện chỉ một bộ, nhưng giữ điểm nối để thêm bộ sau. */
function tbOf(_lessonId) { return GIAO_TRINH.thoidai; }
/** Nhãn ngắn cho MỌI id bài của cả hai bộ ('Bài 5.2' · 'TĐ Q2 · Bài 5.1'). */
function tbLabel(lessonId) { return tbOf(lessonId).label(lessonId); }
/** { page, segs } để navigate tới 1 bài con bất kể bộ nào. */
function tbNav(subId, extraSeg) {
  const t = tbOf(subId);
  return { page: t.page, segs: [...t.subSegs(subId), ...(extraSeg ? [extraSeg] : [])] };
}

// ============================================================
// GIÁO TRÌNH ĐƯƠNG ĐẠI / THỜI ĐẠI — 3-level curriculum UI
// ============================================================
const ddState = {
  tb: 'thoidai',             // bộ giáo trình đang xem
  openLessons: new Set(['td1-1']), // bài cha đang mở accordion — khoá CHUỖI ('td1-1')
  selectedSub: 'td1-1.1',    // bài con đang chọn
  activeTab: 'vocab',        // tab đang active
  fcIdx: 0,                  // flashcard index
  fcFlipped: false,          // flashcard đã lật chưa
  order: null,               // thứ tự thẻ sau khi xáo (mảng chỉ số), null = thứ tự gốc
  mobileListOpen: false,     // danh sách bài trên mobile đang mở?
  reviewExerciseId: null,
  exercise: {
    phase: 'idle',
    questions: [],
    answers: [],
    startTime: 0,
    elapsed: 0,
    timerId: null,
    correct: 0,
    scorePercent: 0,
    reviewLoadedId: null,
  },
};

/** Khoá bài cha từ id bài con / bài văn hoá: '5.2' -> '5', '2-5.vh' -> '2-5'. */
function ddParentKey(subId) {
  const s = String(subId || '');
  return s.includes('.') ? s.split('.')[0] : s;
}

/**
 * Mô tả thẻ "Luyện tập tổng hợp" — hai bộ giáo trình có NGUỒN ĐỀ khác nhau, nói chung một câu
 * là nói sai về nguồn kia (đúng nguyên tắc đã ghi ở CLAUDE.md 4.28).
 */
function _ddLuyenTapDesc() {
  return ddState.tb === 'thoidai'
    ? 'Nghe hiểu, chọn từ điền vào câu, nghĩa của từ, nhận diện ngữ pháp và đặt câu — sinh từ chính nội dung bài (từ vựng, câu ví dụ ngữ pháp, bản thu bài khoá) nên đáp án luôn khớp với sách.'
    : 'Nghe, đọc hiểu, ghép câu, viết — luyện tổng hợp cả bốn kỹ năng của bài.';
}

/**
 * Bài con này có phải PHẦN CUỐI của bài cha không?
 * "Luyện tập tổng hợp" là một bộ đề cho CẢ bài cha nên chỉ treo ở phần cuối — treo ở mọi phần
 * thì cùng một đề hiện 2-3 lần. Đương đại luôn 2 phần nên trước đây so cứng `.endsWith('.2')`;
 * Thời Đại quyển 1 có 3 phần (.1/.2/.3) nên so cứng như vậy là mất hẳn ở quyển đó.
 */
function ddLaPhanCuoi(subId) {
  const cha = ddParentKey(subId);
  const ds = TB().subs.filter(s => s.parentId === cha);
  return ds.length > 0 && ds[ds.length - 1].id === subId;
}

/** Quyển đang xem (suy từ bài đang chọn), mặc định 1. */
function ddCurrentBook() {
  const p = TB().parseId(ddState.selectedSub);
  return p ? p.book : 1;
}

/** Bài con đã có nội dung gì chưa (từ vựng / ngữ pháp / hội thoại / luyện viết)? Quyển 2-4 chưa nhập -> false. */
function ddSubHasContent(sub) {
  // Tra MANIFEST chứ không đọc TB().grammar/dialogues/writing: hàm này chạy cả khi quyển
  // chưa nạp xong (sidebar, thẻ trang chủ), đọc kho rỗng sẽ báo nhầm "chưa có nội dung".
  return gtSubCoNoiDung(sub);
}

/** Segs URL tới bài đầu tiên của một quyển — dùng cho link sidebar và thẻ ở trang chủ. */
function ddBookSegs(bookId, tbId) {
  const t = TB(tbId);
  const first = t.subs.find(s => s.book === Number(bookId));
  return first ? [...t.subSegs(first.id), DD_TAB_SLUG.vocab] : [];
}

/**
 * Mở một quyển từ NGOÀI trang (sidebar, trang chủ) — phải đi qua navigate() chứ không gọi
 * ddSelectBook(): ddSelectBook -> ddSelectSub -> updateUrl() dựng URL theo state.currentPage,
 * mà lúc đó ta còn đang ở trang khác nên sẽ ghi ra URL rác.
 */
function ddGoBook(bookId, tbId) {
  navigate(TB(tbId).page, { segs: ddBookSegs(bookId, tbId) });
}

/** Chuyển sang quyển khác: mở bài 1.1 của quyển đó. */
function ddSelectBook(bookId) {
  const first = TB().subs.find(s => s.book === Number(bookId));
  if (first && first.id !== ddState.selectedSub) ddSelectSub(first.id);
}

/** Lấy danh sách từ vựng cho bài con theo from/to range */
function ddGetVocab(subId) {
  const sub = TB().subs.find(s => s.id === subId);
  if (!sub) return [];
  const all = TB().vocab[String(sub.parentId)] || [];
  return all.slice(sub.from - 1, sub.to);
}

/** Bộ thẻ đang dùng cho flashcard (đã áp thứ tự xáo nếu có) */
function ddDeck() {
  const base = ddGetVocab(ddState.selectedSub);
  const o = ddState.order;
  if (!o || o.length !== base.length) return base;
  return o.map(i => base[i]);
}

function ddToggleLesson(lessonId) {
  if (ddState.openLessons.has(lessonId)) ddState.openLessons.delete(lessonId);
  else ddState.openLessons.add(lessonId);
  const group = document.querySelector(`.dd-lesson-group[data-lesson="${lessonId}"]`);
  if (group) {
    group.classList.toggle('open');
    if (group.classList.contains('open')) {
      setTimeout(() => {
        const list = document.querySelector('.dd-lesson-list');
        if (list) {
          const listRect = list.getBoundingClientRect();
          const groupRect = group.getBoundingClientRect();
          if (groupRect.bottom > listRect.bottom) {
            list.scrollBy({
              top: groupRect.bottom - listRect.bottom + 12,
              behavior: 'smooth'
            });
          }
        }
      }, 150);
    }
  }
}

/** Cuộn danh sách bài ở sidebar tới bài đang chọn và làm nổi bật (hover/active) */
function ddScrollSidebarToActive(smooth = true) {
  const list = document.querySelector('.dd-lesson-list');
  // Bắt CẢ hai kiểu hàng: `.dd-sub-item` (bài nhiều phần) và `.dd-lesson-header[data-sub]`
  // (bài MỘT phần của HSK — hàng cha chính là hàng bài, xem chỗ dựng danh sách bài).
  const activeItem = document.querySelector(`[data-sub="${ddState.selectedSub}"]`)
    || document.querySelector('.dd-sub-item.active, .dd-lesson-header.active');
  if (!list || !activeItem) return;

  const listRect = list.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  const relativeTop = itemRect.top - listRect.top + list.scrollTop;
  const targetScrollTop = Math.max(0, relativeTop - (list.clientHeight / 2) + (itemRect.height / 2));

  list.scrollTo({
    top: targetScrollTop,
    behavior: smooth ? 'smooth' : 'auto'
  });

  activeItem.classList.remove('just-selected');
  void activeItem.offsetWidth;
  activeItem.classList.add('just-selected');
}

function ddSelectSub(subId) {
  if (ddDlgState.audio) { ddDlgState.audio.pause(); ddDlgState.audio = null; }
  ddExStopTimer();
  Object.assign(ddState.exercise, {
    phase: 'idle', questions: [], answers: [], startTime: 0,
    elapsed: 0, timerId: null, correct: 0, scorePercent: 0,
  });
  ddState.selectedSub = subId;
  const parentLesson = ddParentKey(subId);
  if (parentLesson) ddState.openLessons.add(parentLesson);

  ddState.activeTab = 'vocab';
  ddState.fcIdx = 0;
  ddState.fcFlipped = false;
  ddState.order = null;
  ddState.mobileListOpen = false;
  ddState.writing = { idx: 0, mode: 0, completed: new Set() };
  if (ddState.translate) {
    ddState.translate.phase = 'input';
    ddState.translate.answers = {};
    ddState.translate.revealed = new Set();
    ddState.translate.allRevealed = false;
    ddState.translate.submission = null;
  }
  updateUrl({ push: true });
  const el = document.getElementById('page-content');
  if (el) renderDuongdai(el);
}

function ddSelectTab(tabId) {
  if (tabId !== 'dialogue' && ddDlgState.audio) { ddDlgState.audio.pause(); ddDlgState.audio = null; }
  if (tabId !== 'exercise') ddExStopTimer();
  if (ddState.activeTab === 'exercise' && tabId !== 'exercise') {
    ddExStopTimer();
    Object.assign(ddState.exercise, {
      phase: 'idle', questions: [], answers: [], startTime: 0,
      elapsed: 0, timerId: null, correct: 0, scorePercent: 0,
    });
  }
  // Rời tab Game thì phải dừng CẢ HAI game — không chỉ gỡ bong bóng. Timer còn sống sẽ
  // vẽ đè lên tab vừa chuyển sang (màn Game Over của Word Pop, hoặc bước "từ kế tiếp"
  // của Bee sau 1,4 giây) — xem ghi chú đầu module Game.
  if (ddState.activeTab === 'game' && tabId !== 'game') _ddGameStopAll();
  ddDocDung();
  // Rời tab đang làm bài thì trả thanh bên về bình thường, nếu không nó kẹt ở dạng thu nhỏ.
  if (tabId !== 'exercise') twFocusMode(false);
  ddState.activeTab = tabId;
  ddState.fcIdx = 0;
  ddState.fcFlipped = false;
  ddState.order = null;
  updateUrl();
  ddRenderTabContent();
  // Giữ thanh tab ở nguyên chỗ đang ghim thay vì để trang bật về đỉnh — xem ddGhimThanhTab().
  ddGhimThanhTab();
}

/** Alias cho ddSelectTab — dùng từ result page */
function ddSwitchTab(tabId) { ddSelectTab(tabId); }

// ============================================================
// NẠP TRƯỚC ÂM THANH TỪ VỰNG
// ============================================================
/**
 * Vì sao cần: đo trên PROD 2026-09-21, lần ĐẦU bấm loa một từ mất 360-600 ms mới ra tiếng, mà
 * gần như toàn bộ là thời gian tải mp3 (mốc `loadedmetadata` chiếm hết); bấm lại đúng từ đó chỉ
 * 22 ms vì trình duyệt đã có sẵn file. Trên mạng di động con số đầu vượt 1 giây — đúng phản hồi
 * của chủ dự án.
 *
 * Service worker KHÔNG đỡ được chỗ này: thẻ `<audio>` gửi kèm header `Range` nên máy chủ trả
 * 206, mà `public/sw.js` cố ý bỏ qua mọi request có Range (206 không lưu được bằng Cache API).
 * Nới chỗ đó ra cũng không giải quyết được lần bấm ĐẦU TIÊN, vốn mới là lần chậm.
 *
 * Nên cách chữa là tải sẵn mp3 của những từ ĐANG HIỆN trên màn hình lúc trình duyệt rảnh, giữ
 * dưới dạng blob rồi phát thẳng từ bộ nhớ. Mỗi mp3 chỉ ~6 KB (32 kbps mono) nên cả một bài 50
 * từ cũng chưa tới 300 KB — rẻ hơn nhiều so với một tấm ảnh bìa.
 *
 * ⚠️ TUYỆT ĐỐI KHÔNG `await` trước khi gọi `play()`. iOS chỉ cho phát âm thanh trong chính nhịp
 * xử lý cú chạm; chờ một promise là mất quyền đó và nút loa im lặng không kêu — đúng loại lỗi
 * không có thông báo nào đã ghi ở CLAUDE.md 4.44. Vì vậy `ddSpeakWord` chỉ TRA bộ nhớ (đồng bộ)
 * rồi phát ngay; chưa tải xong thì phát thẳng đường dẫn mạng như trước, không bao giờ đứng chờ.
 */
const _audioCache = new Map();        // đường dẫn gốc -> blob URL đã tải sẵn
const _audioDangTai = new Set();
const AUDIO_CACHE_MAX = 120;          // ~120 × 6 KB ≈ 0,7 MB; vượt thì bỏ cái vào sớm nhất

function _audioDonBot() {
  while (_audioCache.size > AUDIO_CACHE_MAX) {
    const k = _audioCache.keys().next().value;
    try { URL.revokeObjectURL(_audioCache.get(k)); } catch { }
    _audioCache.delete(k);
  }
}

/** Tải sẵn MỘT mp3 vào bộ nhớ. Lỗi thì im lặng bỏ qua — nút loa vẫn tải thẳng như cũ. */
async function _napMotAudio(src) {
  if (!src || _audioCache.has(src) || _audioDangTai.has(src)) return;
  _audioDangTai.add(src);
  try {
    const res = await fetch(assetUrl(src));
    if (!res.ok) return;
    const blob = await res.blob();
    if (!blob.size) return;
    _audioCache.set(src, URL.createObjectURL(blob));
    _audioDonBot();
  } catch { /* mất mạng / CORS: bỏ qua, không ảnh hưởng gì */ }
  finally { _audioDangTai.delete(src); }
}

/**
 * Nạp trước âm thanh cho một danh sách từ (mảng object có `audio` / `audioTts`).
 * Chỉ lấy nguồn ĐẦU TIÊN của mỗi từ — đúng thứ `ddSpeakWord` sẽ phát nếu người học bấm loa.
 * Gọi ở CUỐI renderer của mọi danh sách từ; gọi lại nhiều lần vô hại (đã tải thì bỏ qua).
 */
function napTruocAudioTu(words, gioiHan = 60) {
  if (!Array.isArray(words) || !words.length) return;
  // Mạng yếu hoặc chế độ tiết kiệm dữ liệu: đừng tranh băng thông với chính trang đang mở.
  const net = navigator.connection || {};
  if (net.saveData === true || /2g|3g/.test(net.effectiveType || '')) return;

  const ds = [];
  for (const w of words) {
    // Khu tra cứu (src/pages/tuvung.js) đặt tên trường là `tts`, hai bộ giáo trình là
    // `audioTts` — nhận cả hai để không phải nắn dữ liệu ở nơi gọi.
    const src = w && (w.audio || w.audioTts || w.tts);
    if (src && !_audioCache.has(src) && !ds.includes(src)) ds.push(src);
    if (ds.length >= gioiHan) break;
  }
  if (!ds.length) return;

  const ranh = window.requestIdleCallback || ((f) => setTimeout(f, 800));
  let i = 0;
  const LUONG = 4;   // 4 luồng: đủ nhanh mà không chiếm hết kết nối của ảnh/font đang tải
  const tiep = () => { if (i < ds.length) _napMotAudio(ds[i++]).then(tiep); };
  ranh(() => { for (let k = 0; k < LUONG; k++) tiep(); }, { timeout: 4000 });
}

// ============================================================
// NGHE HÀNG LOẠT — đọc lần lượt cả danh sách từ vựng
// ============================================================
/**
 * Bấm MỘT lần rồi cả bài tự đọc lần lượt; thẻ đang đọc được cuộn ra GIỮA màn hình và tô sáng.
 * Dùng chung cho mọi trang có danh sách `.dd-vocab-card`: tab Từ vựng của giáo trình, Từ vựng
 * theo cấp TOCFL, Kho từ vựng, Sổ tay.
 *
 * ⚠️ CẢ LƯỢT DÙNG CHUNG MỘT thẻ `<audio>`, tạo NGAY trong nhịp xử lý cú chạm. iOS chỉ mở khoá
 * phát âm thanh cho phần tử đã phát trong một cử chỉ của người dùng; tạo `new Audio()` mới cho
 * từng từ thì từ thứ hai trở đi im lặng vì lúc đó không còn cử chỉ nào. Đổi `.src` trên cùng
 * phần tử thì quyền đã mở vẫn còn.
 *
 * Nguồn phát rơi dần đúng ba mức của `ddSpeakWord`: bản thu gốc -> mp3 giọng máy -> Web Speech.
 */
const DOC_NGHI = 420;      // ms nghỉ giữa hai từ — đủ để tai tách từ mà không thành lê thê
const DOC_TRAN = 15000;    // ms: trần chờ MỘT từ, phòng khi `ended` không bao giờ bắn

/** [{ text, src, srcTts, lang }] — phải ĐÚNG thứ tự thẻ đang vẽ trên màn hình. */
let _docDs = [];
const _doc = { chay: false, i: -1, audio: null, timer: null, canh: null };

/**
 * Renderer của danh sách từ gọi hàm này TRƯỚC khi dựng HTML. Gọi lại là huỷ lượt đang đọc —
 * danh sách vừa đổi thì chỉ số cũ trỏ sang thẻ khác, đọc tiếp là đọc nhầm từ.
 */
function datDsDoc(ds) {
  ddDocDung();
  _docDs = Array.isArray(ds) ? ds.filter((m) => m && m.text) : [];
}

/** Nút đặt trong `.dd-vocab-header`. Danh sách rỗng thì không vẽ nút. */
function nutDocHtml() {
  if (!_docDs.length) return '';
  return `<button class="dd-doc-btn" id="dd-doc-btn" onclick="window.app.ddDocTatCa()"
    title="Đọc lần lượt toàn bộ danh sách">
    <i class="fa-solid fa-play"></i><span>Nghe toàn bộ</span></button>`;
}

/** Bấm nút: đang đọc thì dừng, chưa đọc thì bắt đầu từ đầu. */
function ddDocTatCa() {
  if (_doc.chay) { ddDocDung(); return; }
  if (!_docDs.length) return;
  if (_ddAudio) { try { _ddAudio.pause(); } catch { } _ddAudio = null; }
  // Tạo Ở ĐÂY, trong chính nhịp chạm — xem ghi chú iOS ở đầu khối.
  if (!_doc.audio) _doc.audio = new Audio();
  _doc.chay = true;
  _doc.i = -1;
  _docTiep();
}

function ddDocDung() {
  if (_doc.timer) { clearTimeout(_doc.timer); _doc.timer = null; }
  if (_doc.canh) { clearTimeout(_doc.canh); _doc.canh = null; }
  if (_doc.audio) {
    try { _doc.audio.pause(); } catch { }
    _doc.audio.onended = _doc.audio.onerror = _doc.audio.onloadedmetadata = null;
  }
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch { }
  _doc.chay = false;
  _doc.i = -1;
  _docToSang(-1);
  _docVeNut();
}

function _docTiep() {
  if (!_doc.chay) return;
  _doc.i++;
  if (_doc.i >= _docDs.length) { ddDocDung(); return; }
  _docToSang(_doc.i);
  _docVeNut();
  _docPhat(_docDs[_doc.i], () => {
    if (!_doc.chay) return;
    _doc.timer = setTimeout(_docTiep, DOC_NGHI);
  });
}

/** Phát MỘT từ rồi gọi `xong()`. Mọi nhánh kết thúc đều phải đi qua `ketThuc` đúng một lần. */
function _docPhat(m, xong) {
  const nguon = [m.src, m.srcTts].filter(Boolean);
  const a = _doc.audio;
  let daXong = false;
  const ketThuc = () => {
    if (daXong) return;
    daXong = true;
    if (_doc.canh) { clearTimeout(_doc.canh); _doc.canh = null; }
    xong();
  };
  const hen = () => {
    if (_doc.canh) clearTimeout(_doc.canh);
    _doc.canh = setTimeout(ketThuc, DOC_TRAN);
  };

  const thu = (i) => {
    if (!_doc.chay) return;
    if (i >= nguon.length) {
      speakWord(m.text, m.lang || (TB().gianThe ? 'zh-CN' : 'zh-TW'), undefined, ketThuc);
      hen();
      return;
    }
    a.onended = ketThuc;
    a.onerror = () => thu(i + 1);
    // Clip CÂM vẫn phát "thành công" nên `ended` bắn ngay — mà lượt đọc thì im bặt một nhịp.
    // Ngưỡng 0,25s giống `ddSpeakWord` (bài học 4.44): không clip lành nào ngắn tới vậy.
    a.onloadedmetadata = () => {
      if (Number.isFinite(a.duration) && a.duration > 0 && a.duration < 0.25) {
        a.onended = null;
        thu(i + 1);
      }
    };
    a.src = _audioCache.get(nguon[i]) || assetUrl(nguon[i]);
    a.play().catch(() => thu(i + 1));
    hen();
  };
  thu(0);
}

/** Tô sáng thẻ đang đọc và đưa nó ra GIỮA khung nhìn. `-1` = bỏ tô sáng hết. */
function _docToSang(i) {
  const the = document.querySelectorAll('.dd-vocab-list .dd-vocab-card');
  the.forEach((c, k) => c.classList.toggle('dang-doc', k === i));
  if (i >= 0 && the[i]) {
    try { the[i].scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch { the[i].scrollIntoView(); }
  }
}

function _docVeNut() {
  const b = document.getElementById('dd-doc-btn');
  if (!b) return;
  const ic = b.querySelector('i');
  const tx = b.querySelector('span');
  b.classList.toggle('dang-doc', _doc.chay);
  if (ic) ic.className = _doc.chay ? 'fa-solid fa-stop' : 'fa-solid fa-play';
  if (tx) tx.textContent = _doc.chay ? `Dừng (${_doc.i + 1}/${_docDs.length})` : 'Nghe toàn bộ';
}

/**
 * Phát âm một từ. Ưu tiên GIỌNG ĐỌC THẬT của sách (mp3 cắt từ bộ audio chính thức MTC-NTNU,
 * xem CLAUDE.md 4.26f); không có file hoặc tải lỗi thì tự rơi về giọng máy TTS.
 * Cùng nguyên tắc với pronPlay() ở module Học phát âm: app phải chạy được cả khi chưa tải mp3.
 */
let _ddAudio = null;
/**
 * Phát âm một từ. BA MỨC, rơi dần xuống khi mức trên không dùng được:
 *   1. `src`  — bản thu GỐC của sách (cắt từ mục 生詞, xem CLAUDE.md 4.26f/4.27)
 *   2. `srcTts` — mp3 Edge TTS giọng zh-TW-HsiaoChenNeural sinh sẵn (gen-tts-tuvung.py)
 *   3. Web Speech API — giọng của trình duyệt, chất lượng tuỳ máy người dùng
 * Mức 2 tồn tại vì cắt từ bản thu chỉ phủ ~78% số từ; 22% còn lại trước đây rơi thẳng xuống
 * giọng máy trình duyệt, nhiều máy nghe rất tệ.
 */
function ddSpeakWord(text, src, srcTts, langEp) {
  // HSK là chuẩn ĐẠI LỤC -> giọng zh-CN; hai bộ giáo trình Đài Loan -> zh-TW. Chỉ ảnh hưởng
  // nhánh cuối (Web Speech API); hai nhánh mp3 phía trước đã là giọng đúng của từng bộ rồi.
  //
  // `langEp` cho phép NƠI GỌI ép ngôn ngữ. Cần cho các trang KHÔNG thuộc module giáo trình
  // (vd Từ vựng theo cấp TOCFL): ở đó `ddState.tb` vẫn giữ bộ sách xem lần trước, nên
  // TB().gianThe có thể đang là HSK và đọc từ tiếng Đài Loan bằng giọng đại lục.
  ddDocDung();   // đang nghe hàng loạt mà bấm một từ -> dừng lượt, đừng để hai tiếng chồng nhau
  const lang = langEp || (TB().gianThe ? 'zh-CN' : 'zh-TW');
  const nguon = [src, srcTts].filter(Boolean);
  if (!nguon.length) { speakWord(text, lang); return; }
  const thu = (i) => {
    if (i >= nguon.length) { speakWord(text, lang); return; }
    try {
      if (_ddAudio) { _ddAudio.pause(); _ddAudio = null; }
      // Tra bộ nhớ trước (napTruocAudioTu đã tải sẵn) — phát từ blob là tức thì.
      // Phép tra này ĐỒNG BỘ, không chờ gì, nên vẫn nằm trong nhịp xử lý cú chạm của iOS.
      const a = new Audio(_audioCache.get(nguon[i]) || assetUrl(nguon[i]));
      _ddAudio = a;
      // Lỗi tải (file thiếu, mạng hỏng) -> nguồn kế tiếp, KHÔNG để bấm mà không nghe thấy gì.
      a.onerror = () => { if (_ddAudio === a) _ddAudio = null; thu(i + 1); };
      // Clip CÂM cũng phải rơi xuống nguồn sau. Một mp3 bị cắt hụt (0,07s) vẫn tải và phát
      // "thành công" nên `onerror` không bao giờ chạy — học viên bấm loa, không nghe gì, và
      // console sạch trơn. Đúng 32 clip như vậy đã nằm trong kho tới 2026-09-10 (xem CLAUDE.md
      // 4.44), gồm cả 魚 · 馬 · 龍 · 很 · 是. Hai bộ script cắt nay đã có lưới an toàn, đây là
      // lớp cuối phòng khi dữ liệu lại lọt clip hụt.
      // Ngưỡng 0,25s là rất rộng: bản thu thật ngắn nhất trong kho là 0,84s (đo 4.960 clip
      // Đương đại), mp3 giọng máy ngắn nhất 0,98s — không clip lành nào tới gần mức này.
      a.onloadedmetadata = () => {
        if (_ddAudio === a && Number.isFinite(a.duration) && a.duration > 0 && a.duration < 0.25) {
          a.pause(); _ddAudio = null; thu(i + 1);
        }
      };
      a.play().catch(() => { if (_ddAudio === a) _ddAudio = null; thu(i + 1); });
    } catch {
      thu(i + 1);
    }
  };
  thu(0);
}

function ddToggleVocab(idx) {
  const detail = document.getElementById(`dd-vocab-detail-${idx}`);
  const arrow = document.getElementById(`dd-vocab-arrow-${idx}`);
  if (detail) {
    detail.classList.toggle('open');
    if (arrow) arrow.classList.toggle('rotate');
  }
}

function ddFcFlip() {
  ddState.fcFlipped = !ddState.fcFlipped;
  const card = document.querySelector('.dd-fc-card-inner');
  if (card) card.classList.toggle('flipped', ddState.fcFlipped);
}

function ddFcNav(dir) {
  const deck = ddDeck();
  if (!deck.length) return;
  ddState.fcIdx = (ddState.fcIdx + dir + deck.length) % deck.length;
  ddState.fcFlipped = false;
  ddRenderFcCard();
}

/** Xáo trộn thật: sinh mảng thứ tự ngẫu nhiên (Fisher–Yates). Bấm lần nữa để về thứ tự gốc. */
function ddFcShuffle() {
  const n = ddGetVocab(ddState.selectedSub).length;
  if (ddState.order) {
    ddState.order = null;
  } else if (n > 1) {
    const arr = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    ddState.order = arr;
  }
  ddState.fcIdx = 0;
  ddState.fcFlipped = false;
  ddRenderTabContent();
}

/** Mở/đóng danh sách bài trên mobile */
function ddToggleMobileList() {
  ddState.mobileListOpen = !ddState.mobileListOpen;
  const sb = document.querySelector('.dd-sidebar');
  if (sb) {
    sb.classList.toggle('open', ddState.mobileListOpen);
    if (ddState.mobileListOpen) {
      setTimeout(() => ddScrollSidebarToActive(true), 60);
    }
  }
}

/** Render tab content vào #dd-tab-content */
/**
 * Nạp bản chụp quyền nội dung để VẼ GIAO DIỆN (ổ khoá trong danh sách bài, hạn gói ở trang tài
 * khoản). Không chặn gì cả — chặn thật là việc của server. Chạy nền, hỏng thì im lặng: mất mấy
 * cái ổ khoá còn hơn hỏng cả trang vì một lời gọi phụ.
 *
 * Gọi lúc khởi động VÀ sau mỗi lần đăng nhập/đăng xuất — quyền đổi theo tài khoản.
 */
async function napQuyenNoiDung() {
  try {
    const headers = {};
    const tk = localStorage.getItem('tw_token');
    if (tk) headers.Authorization = `Bearer ${tk}`;
    const d = await fetch(`${apiBase()}/noi-dung/quyen`, { headers }).then((r) => (r.ok ? r.json() : null));
    if (!d) return;
    // `quyen` = các quyển MUA LẺ, dạng 'duongdai:2'. Server đã trả trường này từ 2026-09-09 nhưng
    // client vứt đi, nên học viên mua lẻ một quyển vẫn thấy ổ khoá trên chính bài mình đã trả
    // tiền — trông như mua hụt. Đó là loại lỗi làm mất niềm tin nhanh nhất ở khâu bán hàng.
    state.quyen = {
      daNap: true, tatCa: !!d.tat_ca,
      bo: d.bo || [], quyen: d.quyen || [], hetHan: d.het_han || null,
      // Lấy từ server thay vì viết cứng 3: đổi chính sách số bài mở chỉ phải sửa SO_BAI_MO
      // trong shared/noi-dung-mo.js, không phải đi sửa từng câu chữ trong giao diện.
      soBaiMo: d.so_bai_mo || 3,
    };
    // Bài từng bị khoá phải được quên đi, nếu không học viên vừa được cấp quyền vẫn thấy tấm
    // chắn cho tới khi tải lại trang (kho đã ghi nhớ một promise "đã xong (rỗng)").
    quenBaiBiKhoa();
  } catch { /* không có mạng / server cũ chưa có route: cứ để giao diện như chưa biết gì */ }
}

/**
 * Người dùng đã mở khoá vị trí này chưa — chỉ dùng để quyết định có vẽ ổ khoá hay không.
 * Phải xét CẢ HAI đường: mua trọn bộ (`bo`) và mua lẻ từng quyển (`quyen`, dạng 'duongdai:2').
 * Chỉ xét `bo` là người mua lẻ thấy ổ khoá trên bài họ vừa mua.
 * Quyết định thật vẫn nằm ở server; đây chỉ là phần hiển thị.
 */
function ddCoQuyenBo(bo, quyen = null) {
  if (state.quyen.tatCa) return true;
  if ((state.quyen.bo || []).includes(bo)) return true;
  return quyen != null && (state.quyen.quyen || []).includes(`${bo}:${Number(quyen)}`);
}

/** Dấu hiệu khoá/mở cạnh tên bài trong danh sách bên trái. */
function ddDauKhoaHtml(lessonId) {
  if (ddCoQuyenBo(TB().id, bocKhoaBai(lessonId)?.quyen)) return '';
  if (baiMo(lessonId)) return '<span class="dd-lesson-mo" title="Bài học thử, mở cho mọi người">Mở</span>';
  return '<i class="fa-solid fa-lock dd-lesson-khoa" title="Cần mở khoá để học bài này"></i>';
}

// ============================================================
// TẤM CHẮN NỘI DUNG TRẢ PHÍ (2026-09-09)
// ============================================================
// Ba bài đầu của MỌI quyển/cấp mở miễn phí (shared/noi-dung-mo.js). Từ bài 4 trở đi cần quyền.
// Nguyên tắc trình bày: nói THẲNG đây là phần trả phí và còn thiếu gì, chứ không hiện thông báo
// lỗi chung chung — học viên bấm vào một bài có sẵn nội dung mà thấy "chưa có dữ liệu" thì tưởng
// hệ thống hỏng, và đó cũng là lúc dễ mất khách nhất.

const TEN_BO = { duongdai: 'Giáo trình Đương đại', thoidai: 'Giáo trình Thời Đại', hsk: 'HSK 3.0', 'thi-thu': 'Ngân hàng đề thi thử' };

function ddKhoaPanelHtml(khoa, tieuDe = 'Bài này thuộc phần trả phí') {
  const soMo = khoa?.soBaiMo || 3;
  const ten = TEN_BO[khoa?.bo] || 'bộ giáo trình này';
  const nutChinh = state.isLoggedIn
    ? `<button class="btn btn-primary" onclick="window.app.moBangGia('${tdEsc(khoa?.sanPham || '')}')"><i class="fa-solid fa-unlock"></i> Xem gói học</button>`
    : `<button class="btn btn-primary" onclick="window.app.openAuth()"><i class="fa-solid fa-right-to-bracket"></i> Đăng nhập</button>`;
  // Đề thi thử KHÔNG có bài mở nào (chốt 2026-09-09), nên câu "3 bài đầu miễn phí" và nút "học
  // thử bài 1" đều vô nghĩa ở đó — nói vậy là hứa một thứ không tồn tại.
  const laThi = khoa?.bo === 'thi-thu';
  const loiGiaiThich = laThi
    ? 'Ngân hàng 25 đề thi thử TOCFL và HSK (đề thật của SC-TOP và CTI) mở khi bạn có gói học hoặc mua riêng phần thi thử.'
    : `Bạn đang xem <strong>${tdEsc(ten)}</strong>. ${soMo} bài đầu của mỗi quyển/cấp mở miễn phí cho mọi người${state.isLoggedIn ? '' : ', kể cả khi chưa đăng nhập'} — từ bài ${soMo + 1} trở đi cần mở khoá.`;
  return `
    <div class="dd-khoa-panel">
      <div class="dd-khoa-ic"><i class="fa-solid fa-lock"></i></div>
      <h3>${tdEsc(tieuDe)}</h3>
      <p>${loiGiaiThich}</p>
      <div class="dd-khoa-nut">
        ${nutChinh}
        ${laThi ? '' : '<button class="btn btn-outline" onclick="window.app.ddVeBaiMo()"><i class="fa-solid fa-book-open"></i> Học thử bài 1</button>'}
      </div>
    </div>`;
}

/** Về bài đầu tiên (miễn phí) của chính quyển/cấp đang xem — không đá người dùng về tận Quyển 1. */
function ddVeBaiMo() {
  const cur = TB().subs.find((x) => x.id === ddState.selectedSub);
  const book = cur ? cur.book : 1;
  const dau = TB().subs.find((x) => x.book === book);
  if (dau) ddSelectSub(dau.id);
}

/**
 * Bảng gói học. Danh mục lấy từ server (`products`) chứ không viết cứng ở đây — đổi giá hay
 * thêm gói là việc của DB, không phải việc phải deploy lại giao diện.
 *
 * Chưa nối cổng thanh toán (chốt 2026-09-09: admin/trung tâm kích hoạt tay), nên nút cuối cùng
 * là liên hệ. Khi nối VNPay/MoMo/Stripe thì chỉ đổi đúng nút đó.
 */
async function moBangGia(nhanManh = '') {
  openDialog('Gói học', '<div class="tw-sk" style="height:120px"></div>', '');
  let ds = [];
  try {
    const d = await fetch(`${apiBase()}/noi-dung/goi`).then((r) => r.json());
    ds = d.goi || [];
  } catch (e) {
    console.warn('Không tải được bảng giá:', e);
  }
  if (!ds.length) {
    return openDialog('Gói học',
      '<p style="line-height:1.6">Chưa tải được bảng giá. Vui lòng liên hệ để được tư vấn.</p>',
      '<button class="btn btn-outline" onclick="window.app.closeDialog()">Đóng</button>');
  }
  const tien = (n) => n.toLocaleString('vi-VN') + '₫';
  const the = ds.map((g) => `
    <div class="gia-card${g.ma === nhanManh ? ' is-goi-y' : ''}">
      <div class="gia-ten">${tdEsc(g.ten)}${g.ma === nhanManh ? '<span class="gia-chip">Phù hợp với bài bạn đang xem</span>' : ''}</div>
      <div class="gia-mo-ta">${tdEsc(g.mo_ta || '')}</div>
      <div class="gia-tien">${tien(g.gia)}${g.so_ngay ? ` <span>/ ${g.so_ngay} ngày</span>` : ' <span>· trọn đời</span>'}</div>
    </div>`).join('');
  openDialog('Gói học',
    `<div class="gia-luoi">${the}</div>
     <p class="gia-ghi-chu"><i class="fa-solid fa-circle-info"></i> <span>Hiện chưa có thanh toán trực tuyến — nhắn tin để được kích hoạt trong ngày. Nếu bạn đang học ở một trung tâm, hãy hỏi giáo viên: quyền có thể đã được cấp sẵn theo lớp.</span></p>`,
    `<a href="https://www.facebook.com/tinh.hoang.858548/about" target="_blank" class="btn btn-primary" style="text-decoration:none"><i class="fa-brands fa-facebook"></i> Liên hệ mở khoá</a>
     <button class="btn btn-outline" onclick="window.app.closeDialog()">Đóng</button>`);
}

function ddRenderTabContent() {
  const el = document.getElementById('dd-tab-content');
  if (!el) return;
  document.querySelectorAll('.dd-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === ddState.activeTab);
  });
  ddMoveTabInk();
  twPlayEnter(el, 'tw-entering');

  const tab = TB().tabs.find(t => t.id === ddState.activeTab);
  if (tab && !tab.implemented) {
    el.innerHTML = `
      <div class="dd-coming-soon">
        <i class="fa-solid fa-hammer"></i>
        <p>Mục <strong>${tab.label}</strong> đang được xây dựng</p>
        <span>Sắp ra mắt!</span>
      </div>`;
    return;
  }

  // Bài TRẢ PHÍ mà chưa có quyền. Kho nội dung cố ý không ném lỗi (giaotrinh-kho.js) nên nếu
  // không hỏi ở đây thì mọi tab sẽ hiện "chưa có từ vựng" — nói SAI với học viên: bài có đủ nội
  // dung, chỉ là chưa mở. Phải chặn TRƯỚC nhánh "đang biên soạn" ngay bên dưới vì nhánh đó tra
  // manifest (luôn báo có) chứ không tra kho.
  const khoaNow = baiBiKhoa(ddParentKey(ddState.selectedSub));
  if (khoaNow) { el.innerHTML = ddKhoaPanelHtml(khoaNow); return; }

  // Quyển 2-4 chưa nhập dữ liệu: mọi tab hiện chung 1 bảng "đang biên soạn" thay vì 8 kiểu
  // thông báo rỗng khác nhau (có tab như Game/Bài tập còn tưởng là lỗi thiếu từ).
  const subNow = TB().subs.find(s => s.id === ddState.selectedSub);
  if (subNow && !ddSubHasContent(subNow)) {
    const bk = TB().bookOf(subNow.book);
    el.innerHTML = `
      <div class="dd-soon-panel">
        <i class="fa-solid fa-pen-ruler"></i>
        <h3>${bk ? bk.title : 'Giáo trình Đương đại'} — ${subNow.title}</h3>
        <p>Nội dung bài này đang được biên soạn. Từ vựng, ngữ pháp, hội thoại và bài tập sẽ lần lượt được bổ sung.</p>
        <button class="btn btn-outline" onclick="window.app.ddSelectBook(1)"><i class="fa-solid fa-arrow-left"></i> Về Quyển 1</button>
      </div>`;
    return;
  }

  if (ddState.activeTab === 'vocab') ddRenderVocabList(el);
  else if (ddState.activeTab === 'flashcard') ddRenderFlashcard(el);
  else if (ddState.activeTab === 'dialogue') ddRenderDialogue(el);
  else if (ddState.activeTab === 'exercise') (ddState.onllang.open ? ddRenderOnllangEx : ddRenderExercise)(el);
  else if (ddState.activeTab === 'grammar') ddRenderGrammar(el);
  else if (ddState.activeTab === 'writing') ddRenderWriting(el);
  else if (ddState.activeTab === 'translate') ddRenderTranslate(el);
  else if (ddState.activeTab === 'game') ddRenderGame(el);
}

// ============================================================
// TỪ VỰNG THEO CẤP TOCFL — 華語八千詞, 6 cấp, 7.517 từ
// ============================================================
// Bảng tra cứu tổng hợp, KHÔNG phải giáo trình: không có bài, không có hội thoại, người dùng
// tìm/lọc trong cả một cấp. Vì vậy nó đứng riêng khỏi module `dd*` — nhưng dùng lại nguyên
// thẻ từ `.dd-vocab-card`, `ddSpeakWord()` và cơ chế con trượt tab, để giao diện không lệch
// với ba bộ giáo trình.
//
// Dữ liệu: public/data/tocfl/cap-<L0..L5>.json + index.json, sinh bởi scripts/gen-tocfl-vocab.mjs.
// KHÔNG import tĩnh vào đây — 7.517 từ sẽ chui thẳng vào bundle chính (xem 4.30).
//
// ⚠️ GIỮ ĐÚNG 6 CẤP CHÍNH THỨC của SC-TOP. Nhiều trang khác gộp lại thành 5 "level A1..C1";
//    học viên đăng ký thi theo 6 cấp này nên gộp là màn chọn cấp không còn khớp cái họ sắp thi.

/** Slug URL của từng cấp. Cấp chuẩn bị không mang số Level nên có slug riêng. */
const TV_CAP_SLUG = { L0: 'chuan-bi', L1: 'cap-1', L2: 'cap-2', L3: 'cap-3', L4: 'cap-4', L5: 'cap-5' };
const TV_SLUG_CAP = Object.fromEntries(Object.entries(TV_CAP_SLUG).map(([k, v]) => [v, k]));
/** Slug tab. Cùng lối đặt tên với DD_TAB_SLUG của giáo trình. */
const TV_TAB_SLUG = { list: 'danh-sach', flashcard: 'flashcard', quiz: 'trac-nghiem' };
const TV_SLUG_TAB = Object.fromEntries(Object.entries(TV_TAB_SLUG).map(([k, v]) => [v, k]));
/** Số từ mỗi trang. 50 đủ để cuộn một hơi mà không phải bấm liên tục ở cấp 2.776 từ. */
const TV_MOI_TRANG = 50;
/** Số câu mỗi lượt trắc nghiệm. Cấp lớn nhất có 2.776 từ — hỏi hết là không ai làm nổi. */
const TV_SO_CAU = 20;

const tvState = {
  cap: null,            // null = màn chọn cấp; 'L0'..'L5' = đang mở một cấp
  tab: 'list',
  tim: '',
  loai: 'all',
  trang: 1,
  fcIdx: 0, fcFlipped: false, order: null,
  quiz: null,           // { questions, answers, phase, correct, scorePercent, batDau }
};

let _tvIndex = null, _tvIndexP = null;
const _tvCache = new Map();     // 'L3' -> { cap, nhan, tu: [...] }
const _tvDangNap = new Map();

/** Danh mục 6 cấp (nhẹ, vài trăm byte) — đủ vẽ màn chọn cấp mà không tải 7.517 từ. */
function _tvLoadIndex() {
  if (_tvIndex) return Promise.resolve(_tvIndex);
  // Gom nhiều lời gọi cùng lúc vào 1 request (bấm nhanh tay là gọi liên tiếp).
  if (!_tvIndexP) {
    _tvIndexP = fetch('/data/tocfl/index.json')
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then((j) => { _tvIndex = j; return j; })
      .catch((e) => { _tvIndexP = null; throw e; });
  }
  return _tvIndexP;
}

/** Từ vựng một cấp. Chỉ tải cấp đang mở — cấp lớn nhất ~90 KB sau gzip. */
function _tvLoadCap(cap) {
  if (_tvCache.has(cap)) return Promise.resolve(_tvCache.get(cap));
  if (!_tvDangNap.has(cap)) {
    // cap-* qua API có rate-limit (2026-09-15) — chặn cào cả 6 cấp trong 6 request.
    const p = fetch(`${apiBase()}/noi-dung/tocfl/${cap}`)
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then((j) => { _tvCache.set(cap, j); return j; })
      // Xoá promise hỏng để lần sau còn thử lại được, chứ không kẹt mãi ở bản lỗi.
      .catch((e) => { _tvDangNap.delete(cap); throw e; });
    _tvDangNap.set(cap, p);
  }
  return _tvDangNap.get(cap);
}

const _tvDaNap = (cap) => _tvCache.has(cap);

/** Bỏ dấu thanh pinyin để tìm kiếm gõ không dấu vẫn ra ("hao" tìm được "hǎo"). */
function _tvKhongDau(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Danh sách từ của cấp hiện tại sau khi áp bộ lọc + tìm kiếm. */
function _tvLoc() {
  const d = _tvCache.get(tvState.cap);
  if (!d) return [];
  let ds = d.tu;
  if (tvState.loai !== 'all') ds = ds.filter((w) => w.pos === tvState.loai);
  const q = tvState.tim.trim();
  if (q) {
    const k = _tvKhongDau(q);
    // Xếp theo MỨC KHỚP, không theo thứ tự bảng chữ cái. Nghĩa của lớp từ điển tự động có
    // chứa chữ Hán tham chiếu ("viết tắt của 化學工業"), nên gõ 學 mà không xếp hạng thì từ
    // đầu bảng lại là 化工 — người dùng tưởng tìm kiếm hỏng.
    //   3 = khớp ngay đầu chữ Hán · 2 = khớp trong chữ Hán · 1 = khớp pinyin · 0 = chỉ khớp nghĩa
    const diem = (w) => {
      const h = w.hanzi, s = w.simplified || '';
      if (h.startsWith(q) || s.startsWith(q)) return 3;
      if (h.includes(q) || s.includes(q)) return 2;
      if (_tvKhongDau(w.pinyin).includes(k)) return 1;
      return 0;
    };
    ds = ds.filter((w) => diem(w) > 0 || _tvKhongDau(w.def).includes(k))
      // Giữ nguyên thứ tự gốc trong cùng một mức -> sắp xếp phải ỔN ĐỊNH (Array#sort của
      // JS đã ổn định từ ES2019), nếu không danh sách nhảy lung tung giữa các lần gõ.
      .sort((a, b) => diem(b) - diem(a));
  }
  return ds;
}

// ---------- màn A: chọn cấp ----------

function _tvCapCardHtml(c) {
  const slug = TV_CAP_SLUG[c.cap];
  return `
    <button class="tv-cap-card tv-cap-${c.cap.toLowerCase()}" onclick="window.app.tvMoCap('${c.cap}')"
            aria-label="${c.nhan} — ${c.tongTu} từ">
      <div class="tv-cap-top">
        <span class="tv-cap-han font-tc">${H(c.han)}</span>
        ${c.level ? `<span class="tv-cap-lv">Level ${c.level}</span>`
          // 準備級 đứng TRƯỚC Level 1 nên không có số. Nhãn phải là "Novice" (tên SC-TOP dùng
          // trên chứng chỉ) — đừng ghi "Nhập môn": đó đúng là tên tiếng Việt của cấp KẾ TIẾP
          // (入門級) nên hai thẻ cạnh nhau sẽ cùng mang chữ "Nhập môn".
          : '<span class="tv-cap-lv">Novice</span>'}
      </div>
      <div class="tv-cap-name">${c.nhan}</div>
      <div class="tv-cap-chips">
        ${c.band ? `<span class="tw-chip is-primary">Band ${c.band}</span>` : ''}
        <span class="tw-chip">${c.cefr}</span>
      </div>
      <div class="tv-cap-stat">
        <strong>${c.tongTu.toLocaleString('vi-VN')}</strong> từ vựng
      </div>
      <span class="tv-cap-go">Bắt đầu học <i class="fa-solid fa-arrow-right"></i></span>
    </button>`;
}

function _tvRenderChonCap(el, ds) {
  const tong = ds.reduce((s, c) => s + c.tongTu, 0);
  el.innerHTML = `
    <div class="tv-page">
      <div class="tv-hero">
        <div class="tv-hero-text">
          <span class="tv-hero-badge"><i class="fa-solid fa-layer-group"></i> 華語八千詞</span>
          <h1>Từ vựng TOCFL theo cấp</h1>
          <p>Trọn bộ <strong>${tong.toLocaleString('vi-VN')} từ</strong> trong bảng từ vựng chính thức
             của kỳ thi TOCFL, chia đúng <strong>6 cấp</strong> mà bạn sẽ đăng ký thi.</p>
        </div>
        <div class="tv-hero-mark font-tc" aria-hidden="true">詞</div>
      </div>
      <div class="tv-cap-grid">${ds.map(_tvCapCardHtml).join('')}</div>
      <p class="tv-note"><i class="fa-solid fa-circle-info"></i>
        <span>Bảng từ vựng do <strong>國家華語測驗推動工作委員會 (SC-TOP)</strong> công bố — đây chính là
        phạm vi từ mà đề thi TOCFL ra. Mỗi cấp tương ứng một mức chứng chỉ; Band A gồm cấp 1–2,
        Band B gồm cấp 3–4, Band C là cấp 5.</span></p>
    </div>`;
}

// ---------- màn B: một cấp ----------

function _tvToolbarHtml(ds, tongCap) {
  const d = _tvCache.get(tvState.cap);
  // Danh sách từ loại lấy từ chính dữ liệu của cấp -> không bao giờ hiện một mục lọc rỗng.
  const loai = [...new Set(d.tu.map((w) => w.pos).filter(Boolean))].sort();
  return `
    <div class="tv-toolbar">
      <div class="tv-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="tv-tim" type="search" placeholder="Tìm chữ Hán, phiên âm hoặc nghĩa…"
               value="${String(tvState.tim).replace(/"/g, '&quot;')}"
               oninput="window.app.tvTim(this.value)" autocomplete="off">
        ${tvState.tim ? '<button class="tv-search-clear" onclick="window.app.tvTim(\'\')" title="Xoá tìm kiếm"><i class="fa-solid fa-xmark"></i></button>' : ''}
      </div>
      <select class="tv-select" onchange="window.app.tvLoai(this.value)" aria-label="Lọc theo từ loại">
        <option value="all"${tvState.loai === 'all' ? ' selected' : ''}>Mọi từ loại</option>
        ${loai.map((p) => `<option value="${p}"${tvState.loai === p ? ' selected' : ''}>${p}</option>`).join('')}
      </select>
      <button class="tv-char-toggle" onclick="window.app.tvDoiChu()"
              title="Chuyển giữa phồn thể và giản thể">
        <span class="font-tc">${state.charMode === 'simplified' ? '简' : '繁'}</span>
      </button>
    </div>
    <div class="tv-result">
      ${ds.length === tongCap
        ? `<span><strong>${tongCap.toLocaleString('vi-VN')}</strong> từ</span>`
        : `<span>Tìm thấy <strong>${ds.length.toLocaleString('vi-VN')}</strong> / ${tongCap.toLocaleString('vi-VN')} từ</span>`}
    </div>`;
}

/** Một thẻ từ. Dùng lại nguyên class .dd-vocab-* của giáo trình để giao diện không lệch. */
function _tvWordHtml(w, num, i) {
  const hien = getDisplayText(w.hanzi, w.simplified);
  const arg = `'${String(hien).replace(/'/g, "\\'")}', ${w.audio ? `'${w.audio}'` : 'null'}, ${w.audioTts ? `'${w.audioTts}'` : 'null'}, 'zh-TW'`;
  return `
    <div class="dd-vocab-card">
      <div class="dd-vocab-main" onclick="window.app.tvToggle(${i})">
        <span class="dd-vocab-num">${num}</span>
        <div class="dd-vocab-info">
          <div class="dd-vocab-hanzi-row">
            <span class="dd-vocab-hanzi font-tc">${hien}</span>
            <span class="dd-vocab-pinyin">${w.pinyin}</span>
            ${w.pos ? `<span class="dd-vocab-pos">${w.pos}</span>` : ''}
            ${w.audio ? '<span class="tv-real" title="Giọng đọc thu thật"><i class="fa-solid fa-headphones"></i></span>' : ''}
          </div>
          <div class="dd-vocab-def">${w.def}</div>
        </div>
        <div class="dd-vocab-actions">
          <button class="dd-btn-speak" onclick="event.stopPropagation(); window.app.ddSpeakWord(${arg})"
                  title="${w.audio ? 'Nghe giọng đọc thu thật' : 'Nghe phát âm'}">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          ${tdNutLuuTuHtml(w.hanzi, w.simplified, w.pinyin, w.def)}
          <i id="tv-arrow-${i}" class="fa-solid fa-chevron-down dd-vocab-arrow"></i>
        </div>
      </div>
      <div id="tv-detail-${i}" class="dd-vocab-detail">
        <div class="tv-detail-grid">
          <div><span class="tv-dt-label">Phồn thể</span><span class="font-tc">${w.hanzi}</span></div>
          ${w.simplified && w.simplified !== w.hanzi
            // Phần lớn từ có phồn = giản; hiện hai ô giống hệt nhau chỉ tổ làm loãng khối chi tiết.
            ? `<div><span class="tv-dt-label">Giản thể</span><span class="font-tc">${w.simplified}</span></div>` : ''}
          <div><span class="tv-dt-label">Phiên âm</span><span>${w.pinyin}</span></div>
          ${w.bienThe && w.bienThe.length
            ? `<div><span class="tv-dt-label">Dạng khác</span><span class="font-tc">${w.bienThe.join('、')}</span></div>` : ''}
        </div>
        ${w.nguonDef === 'cvdict'
          ? `<p class="tv-src"><i class="fa-solid fa-book"></i>
              <span>Nghĩa lấy từ từ điển Hán–Việt tự động, chưa qua biên soạn — đối chiếu thêm nếu thấy chưa sát.</span></p>` : ''}
      </div>
    </div>`;
}

function _tvPagerHtml(tong) {
  const soTrang = Math.max(1, Math.ceil(tong / TV_MOI_TRANG));
  if (soTrang <= 1) return '';
  const t = tvState.trang;
  // Cửa sổ trang quanh trang hiện tại — 56 trang (cấp L5) mà liệt kê hết thì tràn ngang.
  const nums = [];
  for (let i = Math.max(1, t - 2); i <= Math.min(soTrang, t + 2); i++) nums.push(i);
  const nut = (n, nhan, tat) => `<button class="tv-pg${n === t ? ' active' : ''}"${tat ? ' disabled' : ''}
      onclick="window.app.tvTrang(${n})">${nhan}</button>`;
  return `
    <div class="tv-pager">
      ${nut(t - 1, '<i class="fa-solid fa-chevron-left"></i>', t <= 1)}
      ${t > 3 ? nut(1, '1') + (t > 4 ? '<span class="tv-pg-gap">…</span>' : '') : ''}
      ${nums.map((n) => nut(n, String(n))).join('')}
      ${t < soTrang - 2 ? (t < soTrang - 3 ? '<span class="tv-pg-gap">…</span>' : '') + nut(soTrang, String(soTrang)) : ''}
      ${nut(t + 1, '<i class="fa-solid fa-chevron-right"></i>', t >= soTrang)}
    </div>`;
}

function _tvRenderList(el) {
  const d = _tvCache.get(tvState.cap);
  const ds = _tvLoc();
  const soTrang = Math.max(1, Math.ceil(ds.length / TV_MOI_TRANG));
  // Lọc xong có thể còn ít trang hơn trang đang đứng — kẹp lại, nếu không màn hình trống trơn.
  if (tvState.trang > soTrang) tvState.trang = soTrang;
  const dau = (tvState.trang - 1) * TV_MOI_TRANG;
  const trang = ds.slice(dau, dau + TV_MOI_TRANG);
  napTruocAudioTu(trang);
  datDsDoc(trang.map((w) => ({
    text: getDisplayText(w.hanzi, w.simplified), src: w.audio, srcTts: w.audioTts, lang: 'zh-TW',
  })));

  el.innerHTML = `
    ${_tvToolbarHtml(ds, d.tu.length)}
    ${ds.length ? `
      <div class="dd-vocab-header">
        <span class="dd-vocab-count"><i class="fa-solid fa-list"></i>
          Trang ${tvState.trang}/${soTrang} · từ ${dau + 1}–${Math.min(dau + TV_MOI_TRANG, ds.length)}</span>
        ${nutDocHtml()}
      </div>
      <div class="dd-vocab-list">
        ${trang.map((w, i) => _tvWordHtml(w, dau + i + 1, i)).join('')}
      </div>
      ${_tvPagerHtml(ds.length)}
    ` : `
      <div class="tv-empty">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>Không tìm thấy từ nào khớp với <strong>“${String(tvState.tim).replace(/</g, '&lt;')}”</strong>.</p>
        <button class="btn btn-primary" onclick="window.app.tvTim('')">Xoá bộ lọc</button>
      </div>`}`;
}

// ---------- flashcard ----------

/** Bộ thẻ đang dùng = danh sách đã lọc, áp thứ tự xáo nếu có. */
function _tvDeck() {
  const ds = _tvLoc();
  if (!tvState.order) return ds;
  return tvState.order.map((i) => ds[i]).filter(Boolean);
}

function _tvRenderFc(el) {
  const deck = _tvDeck();
  if (!deck.length) {
    el.innerHTML = `${_tvToolbarHtml([], (_tvCache.get(tvState.cap) || { tu: [] }).tu.length)}
      <div class="tv-empty"><i class="fa-solid fa-clone"></i><p>Không còn từ nào sau bộ lọc.</p>
      <button class="btn btn-primary" onclick="window.app.tvTim('')">Xoá bộ lọc</button></div>`;
    return;
  }
  if (tvState.fcIdx >= deck.length) tvState.fcIdx = 0;
  napTruocAudioTu(deck.slice(tvState.fcIdx, tvState.fcIdx + 12), 12);
  const w = deck[tvState.fcIdx];
  const hien = getDisplayText(w.hanzi, w.simplified);
  const arg = `'${String(hien).replace(/'/g, "\\'")}', ${w.audio ? `'${w.audio}'` : 'null'}, ${w.audioTts ? `'${w.audioTts}'` : 'null'}, 'zh-TW'`;
  el.innerHTML = `
    <div class="tv-fc-bar">
      <span class="dd-vocab-count">Thẻ ${tvState.fcIdx + 1} / ${deck.length}</span>
      <button class="btn btn-sm" onclick="window.app.tvFcShuffle()">
        <i class="fa-solid fa-shuffle"></i> ${tvState.order ? 'Thứ tự gốc' : 'Xáo thẻ'}</button>
    </div>
    <div class="tw-bar tv-fc-progress"><i style="width:${((tvState.fcIdx + 1) / deck.length) * 100}%"></i></div>
    <div class="dd-fc-container">
      <div class="dd-fc-card${tvState.fcFlipped ? ' flipped' : ''}" onclick="window.app.tvFcFlip()">
        <div class="dd-fc-card-inner">
          <div class="dd-fc-front">
            <div class="tv-fc-hanzi font-tc">${hien}</div>
            <button class="dd-btn-speak tv-fc-speak" onclick="event.stopPropagation(); window.app.ddSpeakWord(${arg})">
              <i class="fa-solid fa-volume-high"></i></button>
          </div>
          <div class="dd-fc-back">
            <div class="tv-fc-pinyin">${w.pinyin}</div>
            <div class="tv-fc-def">${w.def}</div>
            ${w.pos ? `<span class="dd-vocab-pos">${w.pos}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
    <div class="dd-fc-controls">
      <button class="dd-fc-nav-btn" onclick="window.app.tvFcNav(-1)" ${tvState.fcIdx === 0 ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-left"></i></button>
      <button class="btn btn-primary" onclick="window.app.tvFcFlip()">Lật thẻ</button>
      <button class="dd-fc-nav-btn" onclick="window.app.tvFcNav(1)" ${tvState.fcIdx >= deck.length - 1 ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-right"></i></button>
    </div>
    <p class="dd-fc-hint">Nhấn vào thẻ để lật<span class="fc-hint-kb"> · Phím ← → chuyển thẻ · Space lật thẻ</span></p>`;
}

// ---------- trắc nghiệm ----------

/**
 * Sinh một lượt đề từ chính từ vựng của cấp.
 *
 * Dùng lại `generateQuiz` của module giáo trình (4.19: đề đã trộn cả thứ tự câu lẫn thứ tự đáp
 * án ngay trong đó — ĐỪNG viết bộ xáo riêng). Hàm đó nhận một "nguồn" hình dạng giáo trình, nên
 * ở đây dựng một nguồn giả: hỏi TV_SO_CAU từ đầu, nhưng vocab mang thêm một ít từ cùng cấp làm
 * mồi nhử, để đáp án nhiễu luôn cùng trình độ với từ đang hỏi.
 */
function _tvSinhDe() {
  const ds = _tvLoc().filter((w) => w.def && w.hanzi);
  if (ds.length < 4) return null;
  const xao = [...ds];
  for (let i = xao.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [xao[i], xao[j]] = [xao[j], xao[i]];
  }
  const hoi = xao.slice(0, Math.min(TV_SO_CAU, xao.length));
  const moi = xao.slice(hoi.length, hoi.length + 40);   // mồi nhử thêm, không bị hỏi
  const key = tvState.cap;
  const nguon = {
    vocab: { [key]: [...hoi, ...moi] },
    subs: [{ id: `${key}.1`, parentId: key, from: 1, to: hoi.length }],
    lessons: [{ id: key }],
  };
  return generateQuiz(`${key}.1`, nguon);
}

function _tvRenderQuiz(el) {
  const q = tvState.quiz;
  if (!q) {
    const ds = _tvLoc();
    el.innerHTML = `
      <div class="tv-quiz-intro">
        <div class="tw-ic is-primary"><i class="fa-solid fa-circle-check"></i></div>
        <h3>Kiểm tra từ vựng</h3>
        <p>${TV_SO_CAU} câu ngẫu nhiên lấy từ ${ds.length.toLocaleString('vi-VN')} từ đang hiển thị.
           Bộ lọc và ô tìm kiếm ở tab Danh sách cũng áp dụng cho đề này.</p>
        ${ds.length < 4
          ? '<p class="tv-warn"><i class="fa-solid fa-triangle-exclamation"></i><span>Cần ít nhất 4 từ mới sinh được đề. Hãy nới bộ lọc lại.</span></p>'
          : `<button class="btn btn-primary btn-lg" onclick="window.app.tvQuizStart()">
               <i class="fa-solid fa-play"></i> Bắt đầu làm bài</button>`}
        ${state.isLoggedIn ? '' : '<p class="tv-warn"><i class="fa-solid fa-circle-info"></i><span>Đăng nhập để kết quả được lưu lại và giáo viên xem được.</span></p>'}
      </div>`;
    return;
  }

  if (q.phase === 'done') {
    const pt = q.scorePercent;
    el.innerHTML = `
      <div class="tv-quiz-done">
        <div class="tv-score ${pt >= 80 ? 'good' : pt >= 50 ? 'ok' : 'bad'}">${pt}%</div>
        <p>Đúng <strong>${q.correct}</strong> / ${q.questions.length} câu</p>
        <div class="tv-quiz-review">
          ${q.questions.map((c, i) => {
            const chon = q.answers[i];
            return `<div class="tv-rv${chon === c.correctIdx ? ' ok' : ' no'}">
              <div class="tv-rv-q">${i + 1}. ${c.question}</div>
              <div class="tv-rv-a">
                <span class="tv-rv-dung"><i class="fa-solid fa-check"></i> ${c.options[c.correctIdx].text}</span>
                ${chon !== c.correctIdx
                  ? `<span class="tv-rv-sai"><i class="fa-solid fa-xmark"></i> ${chon == null || chon < 0 ? 'Bỏ trống' : c.options[chon].text}</span>` : ''}
              </div></div>`;
          }).join('')}
        </div>
        <div class="tv-quiz-actions">
          <button class="btn btn-primary" onclick="window.app.tvQuizStart()"><i class="fa-solid fa-rotate-right"></i> Làm lượt mới</button>
          <button class="btn" onclick="window.app.tvQuizThoat()">Xong</button>
        </div>
      </div>`;
    return;
  }

  const i = q.idx;
  const c = q.questions[i];
  el.innerHTML = `
    <div class="tv-quiz">
      <div class="tv-quiz-head">
        <span class="dd-vocab-count">Câu ${i + 1} / ${q.questions.length}</span>
        <button class="btn btn-sm" onclick="window.app.tvQuizThoat()">Thoát</button>
      </div>
      <div class="tw-bar"><i style="width:${((i + 1) / q.questions.length) * 100}%"></i></div>
      <div class="tv-quiz-card">
        ${c.prompt ? `<div class="tv-quiz-prompt font-tc">${H(c.prompt)}</div>` : ''}
        <div class="tv-quiz-q">${c.question}</div>
        <div class="tv-quiz-opts">
          ${c.options.map((o, k) => `
            <button class="tv-opt${q.answers[i] === k ? ' picked' : ''}" onclick="window.app.tvQuizChon(${k})">
              <span class="tv-opt-key">${'ABCD'[k]}</span><span class="tv-opt-text font-tc">${H(o.text)}</span>
            </button>`).join('')}
        </div>
      </div>
      <div class="tv-quiz-nav">
        <button class="btn" onclick="window.app.tvQuizNav(-1)" ${i === 0 ? 'disabled' : ''}>Câu trước</button>
        ${i === q.questions.length - 1
          ? '<button class="btn btn-primary" onclick="window.app.tvQuizNop()">Nộp bài</button>'
          : '<button class="btn btn-primary" onclick="window.app.tvQuizNav(1)">Câu sau</button>'}
      </div>
    </div>`;
}

// ---------- khung + điều phối ----------

function _tvTabBarHtml() {
  const tabs = [
    { id: 'list', nhan: 'Danh sách', icon: 'fa-list' },
    { id: 'flashcard', nhan: 'Flashcard', icon: 'fa-clone' },
    { id: 'quiz', nhan: 'Trắc nghiệm', icon: 'fa-circle-check' },
  ];
  return `<div class="dd-tab-bar"><span class="dd-tab-ink"></span>
    ${tabs.map((t) => `<button class="dd-tab-btn${tvState.tab === t.id ? ' active' : ''}" data-tab="${t.id}"
        onclick="window.app.tvSelectTab('${t.id}')"><i class="fa-solid ${t.icon}"></i><span>${t.nhan}</span></button>`).join('')}
  </div>`;
}

/** Vẽ lại RIÊNG phần nội dung tab — giữ nguyên khung, không mất vị trí cuộn của thanh công cụ. */
function tvRenderTabContent() {
  const el = document.getElementById('tv-tab-content');
  if (!el) return;
  document.querySelectorAll('#tv-tabbar .dd-tab-btn')
    .forEach((b) => b.classList.toggle('active', b.dataset.tab === tvState.tab));
  ddMoveTabInk();
  twPlayEnter(el, 'tw-entering');
  if (tvState.tab === 'flashcard') _tvRenderFc(el);
  else if (tvState.tab === 'quiz') _tvRenderQuiz(el);
  else _tvRenderList(el);
}

function _tvRenderCap(el) {
  const d = _tvCache.get(tvState.cap);
  const meta = (_tvIndex || []).find((c) => c.cap === tvState.cap) || d;
  el.innerHTML = `
    <div class="tv-page tv-page--cap">
      <div class="tv-caphead">
        <button class="tv-back" onclick="window.app.tvVeChonCap()" aria-label="Về danh sách cấp">
          <i class="fa-solid fa-arrow-left"></i></button>
        <div class="tv-caphead-main">
          <div class="tv-caphead-title">
            <span class="font-tc">${H(meta.han)}</span>
            <h1>${meta.nhan}</h1>
          </div>
          <div class="tv-cap-chips">
            ${meta.level ? `<span class="tw-chip is-primary">Level ${meta.level}</span>` : ''}
            ${meta.band ? `<span class="tw-chip is-seal">Band ${meta.band}</span>` : ''}
            <span class="tw-chip">${meta.cefr}</span>
            <span class="tw-chip is-success">${d.tu.length.toLocaleString('vi-VN')} từ</span>
          </div>
        </div>
      </div>
      <div id="tv-tabbar">${_tvTabBarHtml()}</div>
      <div id="tv-tab-content" class="dd-tab-content"></div>
    </div>`;
  tvRenderTabContent();
}

/**
 * Renderer của trang. LỚP BỌC: dữ liệu đã có thì vẽ thẳng, chưa có thì hiện khung xương rồi vẽ.
 * Đã nạp thì KHÔNG qua skeleton — nếu không, đổi tab trong cùng một cấp lại nháy một nhịp.
 */
function renderTocflVocab(el) {
  const cap = tvState.cap;

  if (!cap) {
    if (_tvIndex) return _tvRenderChonCap(el, _tvIndex);
    el.innerHTML = _tvSkeletonHtml(false);
    _tvLoadIndex().then((ds) => {
      // Người dùng có thể đã sang trang/cấp khác trong lúc chờ.
      if (state.currentPage !== 'tocfl-vocab' || tvState.cap) return;
      const now = document.getElementById('page-content');
      if (now) { _tvRenderChonCap(now, ds); twPlayEnter(now, 'tw-entering'); }
    }).catch(() => _tvLoiHtml());
    return;
  }

  if (_tvDaNap(cap) && _tvIndex) return _tvRenderCap(el);
  el.innerHTML = _tvSkeletonHtml(true);
  Promise.all([_tvLoadIndex(), _tvLoadCap(cap)]).then(() => {
    if (state.currentPage !== 'tocfl-vocab' || tvState.cap !== cap) return;
    const now = document.getElementById('page-content');
    if (now) { _tvRenderCap(now); twPlayEnter(now, 'tw-entering'); }
  }).catch(() => _tvLoiHtml());
}

function _tvSkeletonHtml(trongCap) {
  const dong = (n, h) => Array.from({ length: n },
    () => `<div class="tw-sk" style="height:${h}px;margin-bottom:10px"></div>`).join('');
  return `<div class="tv-page">
    <div class="tw-sk" style="height:${trongCap ? 84 : 132}px;margin-bottom:18px"></div>
    ${trongCap ? `<div class="tw-sk" style="height:44px;margin-bottom:16px"></div>${dong(8, 62)}`
      : `<div class="tv-cap-grid">${Array.from({ length: 6 },
        () => '<div class="tw-sk" style="height:212px"></div>').join('')}</div>`}
  </div>`;
}

function _tvLoiHtml() {
  const now = document.getElementById('page-content');
  if (!now || state.currentPage !== 'tocfl-vocab') return;
  now.innerHTML = `<div class="tv-empty">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p>Không tải được dữ liệu từ vựng. Kiểm tra kết nối mạng rồi thử lại.</p>
      <button class="btn btn-primary" onclick="window.app.navigate('tocfl-vocab')">Thử lại</button>
    </div>`;
}

// ---------- handler (đều phải khai trong window.app) ----------

/** Đổi cấp = đổi nội dung -> pushState, để Back quay lại đúng màn chọn cấp. */
function tvMoCap(cap) {
  tvState.cap = cap;
  tvState.tab = 'list'; tvState.tim = ''; tvState.loai = 'all'; tvState.trang = 1;
  tvState.fcIdx = 0; tvState.fcFlipped = false; tvState.order = null; tvState.quiz = null;
  updateUrl({ push: true });
  renderTocflVocab(document.getElementById('page-content'));
}

function tvVeChonCap() {
  tvState.cap = null; tvState.quiz = null;
  updateUrl({ push: true });
  renderTocflVocab(document.getElementById('page-content'));
}

/** Đổi tab = chỉ đổi cách xem -> replaceState (Back không bị kẹt trong 3 tab). */
function tvSelectTab(tab) {
  if (tvState.tab === tab) return;
  tvState.tab = tab;
  if (tab !== 'quiz') tvState.quiz = null;
  updateUrl();
  tvRenderTabContent();
}

/** Ô tìm kiếm gõ liên tục -> gộp nhịp, tránh vẽ lại danh sách sau từng phím. */
let _tvTimer = null;
function tvTim(v) {
  tvState.tim = v;
  tvState.trang = 1; tvState.fcIdx = 0; tvState.order = null;
  clearTimeout(_tvTimer);
  _tvTimer = setTimeout(() => {
    updateUrl();
    tvRenderTabContent();
    // Vẽ lại làm mất con trỏ trong ô -> trả lại ngay, nếu không người dùng phải bấm lại mỗi chữ.
    const o = document.getElementById('tv-tim');
    if (o && document.activeElement !== o) { o.focus(); o.setSelectionRange(o.value.length, o.value.length); }
  }, 220);
}

function tvLoai(v) {
  tvState.loai = v; tvState.trang = 1; tvState.fcIdx = 0; tvState.order = null;
  updateUrl();
  tvRenderTabContent();
}

function tvTrang(n) {
  const ds = _tvLoc();
  const soTrang = Math.max(1, Math.ceil(ds.length / TV_MOI_TRANG));
  tvState.trang = Math.min(Math.max(1, n), soTrang);
  updateUrl();
  tvRenderTabContent();
  document.getElementById('page-content')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

/**
 * Toggle 繁/简 — đi qua `toggleCharMode()` của app chứ KHÔNG tự đổi `state.charMode`.
 * Tự đổi thì nhãn 繁/简 trên thanh header đứng im, hai nút cùng một chức năng lại hiện hai
 * trạng thái khác nhau. Hàm chung đã lo cả nhãn header lẫn việc vẽ lại trang.
 */
function tvDoiChu() { toggleCharMode(); }

function tvToggle(i) {
  document.getElementById(`tv-detail-${i}`)?.classList.toggle('open');
  document.getElementById(`tv-arrow-${i}`)?.classList.toggle('rotate');
}

function tvFcFlip() { tvState.fcFlipped = !tvState.fcFlipped; tvRenderTabContent(); }
function tvFcNav(d) {
  const n = _tvDeck().length;
  tvState.fcIdx = Math.min(Math.max(0, tvState.fcIdx + d), Math.max(0, n - 1));
  tvState.fcFlipped = false;
  tvRenderTabContent();
}
function tvFcShuffle() {
  if (tvState.order) tvState.order = null;
  else {
    const n = _tvLoc().length;
    const a = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    tvState.order = a;
  }
  tvState.fcIdx = 0; tvState.fcFlipped = false;
  tvRenderTabContent();
}

function tvQuizStart() {
  const qs = _tvSinhDe();
  if (!qs || !qs.length) { tvState.quiz = null; tvRenderTabContent(); return; }
  tvState.quiz = { questions: qs, answers: new Array(qs.length).fill(null), idx: 0, phase: 'doing', batDau: Date.now() };
  tvRenderTabContent();
}
function tvQuizChon(k) {
  const q = tvState.quiz; if (!q || q.phase !== 'doing') return;
  q.answers[q.idx] = k;
  tvRenderTabContent();
}
function tvQuizNav(d) {
  const q = tvState.quiz; if (!q) return;
  q.idx = Math.min(Math.max(0, q.idx + d), q.questions.length - 1);
  tvRenderTabContent();
}
function tvQuizThoat() { tvState.quiz = null; tvRenderTabContent(); }

async function tvQuizNop() {
  const q = tvState.quiz; if (!q || q.phase === 'done') return;
  let correct = 0;
  q.questions.forEach((c, i) => { if (q.answers[i] === c.correctIdx) correct++; });
  q.correct = correct;
  q.scorePercent = Math.round((correct / q.questions.length) * 100 * 100) / 100;
  q.phase = 'done';
  tvRenderTabContent();

  // Gửi lên server nếu đã đăng nhập. Cùng đường với bài tập giáo trình để giáo viên xem lại
  // và nhận xét được ở Quản lý lớp; `details` dùng đúng dạng {questions, answers} mà
  // reviewQuestions() và _normalizeExerciseDetails() đã đọc sẵn.
  if (state.isLoggedIn) {
    try {
      await api.post('/exercise/submit', {
        lesson_id: `tocfl:${tvState.cap}`,
        total_questions: q.questions.length,
        correct_answers: correct,
        time_seconds: Math.round((Date.now() - q.batDau) / 1000),
        details: { questions: q.questions, answers: q.answers },
      });
    } catch (e) {
      console.warn('Không gửi được kết quả trắc nghiệm TOCFL:', e);
    }
  }
}

// ============================================================
// VĂN HÓA TRUNG HOA — mục đọc thêm đứng riêng dưới bài x.1 / x.2
// ============================================================
// Dữ liệu: public/data/onllang-culture.json (clone từ onllang.com bằng
// `npm run onllang:culture`, xem scripts/scrape-onllang-culture.mjs).
// Ảnh đã tải sẵn về public/images/van-hoa/ — KHÔNG hotlink onllang.
//
// Đây KHÔNG phải một tab: chọn mục này thì cả khung bên phải đổi sang chế độ đọc bài viết
// (không có thanh tab, không có từ vựng). `renderDuongdai()` phân biệt 2 chế độ bằng
// `container.dataset.mode` — xem ghi chú ở đó.

let _ddCultureData = null;
let _ddCulturePromise = null;


const _ddCulEsc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const _ddCulChuan = (s) => String(s || '').toLowerCase().replace(/[\s:：.,!?]+/g, ' ').trim();


// ============================================================
// DỊCH TRUNG-VIỆT / VIỆT-TRUNG
//
// Luồng làm bài (đổi 2026-09-04 theo yêu cầu chủ dự án):
//   gõ 1 câu -> bấm "Nộp câu này" -> hiện đáp án NGAY câu đó
//   -> khối shadowing: nghe mẫu câu tiếng Trung rồi tự đọc theo
//   -> làm hết bài mới gửi MỘT bản ghi lên server cho giáo viên chấm.
//
// Trước đây nộp CẢ BÀI một lần rồi mới lật đáp án hàng loạt (phase input/review) —
// học viên dịch 20 câu liền mà không biết đúng sai câu nào, hết cả bài mới thấy.
//
// Chiều dịch:
//   - Bài 1.1 -> 5.1: CHỈ Trung -> Việt, ẩn hẳn thanh đổi chiều.
//   - Bài 5.2 trở đi: 2 chiều tách bạch, mỗi chiều 2 phần (Dịch câu + Dịch đoạn văn).
//     Phần nào chưa có dữ liệu thì ẩn hẳn — 11 bài (10.1, 10.2, 11.1, 12.1..15.2) hiện
//     chưa có đoạn văn, hiện mục rỗng chỉ làm học viên tưởng trang bị lỗi.
//
// KHÔNG có ghi âm ở đây: shadowing = nghe TTS rồi tự đọc theo, đúng như trang
// "Luyện nói (Shadowing)" đang làm. (Đã cân nhắc thu âm gửi giáo viên 2026-09-04
// rồi bỏ — không dựng thêm hạ tầng lưu file cho việc này.)
// ============================================================
/**
 * Tải đề dịch của MỘT bài con — `public/data/dich/<subId>.json` (tách 2026-09-06 bởi
 * scripts/gen-tach-data.mjs). Trước đây mỗi lần mở tab phải tải cả 0,5 MB của 146 bài.
 * Bài chưa có đề -> null, nơi gọi tự hiện "chưa có nội dung".
 */
const _ddTrCache = new Map();

if (!ddState.translate) {
  ddState.translate = {
    mode: 'zh-vi',
    answers: {},          // idx -> câu dịch học viên đang gõ
    done: new Set(),      // idx đã bấm "Nộp câu này" (đã lật đáp án)
    shadowed: new Set(),  // idx đã bấm "Đã đọc xong"
    submission: null,     // kết quả POST /exercise/translate/submit (cả bài)
    saving: false,
    loi: null,            // lỗi lúc lưu bài, để hiện cho học viên biết
  };
}

// Ngữ cảnh lượt làm bài hiện tại — các hàm gọi từ onclick chỉ nhận idx nên phải tra
// nội dung câu ở đây (không nhét chữ Hán vào chuỗi onclick: dấu nháy trong câu sẽ vỡ HTML).
let _ddTrCtx = { subId: null, mode: 'zh-vi', items: [], soCau: 0 };

const _ddTrEsc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const _ddTrNl2br = (s) => _ddTrEsc(s).split('\n').join('<br>');


// ============================================================
// LUYỆN VIẾT — Tập viết chữ Hán theo thứ tự nét (1 chữ/trang)
// 3 chế độ:
//   1. Hướng dẫn viết (animation loop)
//   2. Tập viết có gợi ý (quiz + outline)
//   3. Tập viết không gợi ý (quiz, no outline)
// ============================================================

// Writing practice state (reset khi đổi bài hoặc đổi tab)
if (!ddState.writing) {
  ddState.writing = { idx: 0, mode: 0, completed: new Set(), writers: {}, modes: {} };
}

function ddRenderWriting(el) {
  const subId = ddState.selectedSub;
  const chars = TB().writing[subId];

  // Khi render lại toàn bộ tab Luyện viết, DOM sẽ bị xoá và tạo mới.
  // Phải xoá sạch cache của HanziWriter vì chúng đang trỏ tới DOM cũ đã bị xoá.
  if (ddState.writing.writers) {
    ddState.writing.writers = {};
    ddState.writing.modes = {};
  }

  if (!chars || chars.length === 0) {
    el.innerHTML = `
      <div class="dd-coming-soon">
        <i class="fa-solid fa-pencil"></i>
        <p>Chưa có dữ liệu luyện viết cho bài <strong>${subId}</strong></p>
        <span>Sẽ được bổ sung sớm!</span>
      </div>`;
    return;
  }

  const ws = ddState.writing;
  const total = chars.length;
  const idx = Math.min(ws.idx, total - 1);
  const c = chars[idx];
  const completed = ws.completed.size;
  const isAllDone = completed === total;
  const modeLabels = ['Hướng dẫn viết', 'Tập viết (có gợi ý)', 'Tập viết (không gợi ý)'];
  const modeIcons  = ['fa-arrows-rotate', 'fa-paintbrush', 'fa-eye-slash'];

  el.innerHTML = `
    <div class="hw-page">
      <!-- Progress bar -->
      <div class="hw-progress-bar">
        <div class="hw-progress-fill" style="width:${(completed / total) * 100}%"></div>
      </div>
      <div class="hw-progress-text">${completed} / ${total} chữ đã hoàn thành</div>

      <!-- Character info -->
      <div class="hw-char-info">
        <span class="hw-char-pinyin">${c.pinyin}</span>
        <span class="hw-char-label font-tc">${H(c.char)}</span>
      </div>

      <!-- Mode selector tabs -->
      <div class="hw-mode-tabs">
        ${modeLabels.map((label, m) => `
          <button class="hw-mode-btn${ws.mode === m ? ' active' : ''}"
            onclick="window.app.ddWriteMode(${m})">
            <i class="fa-solid ${modeIcons[m]}"></i> ${label}
          </button>
        `).join('')}
      </div>

      <!-- Canvas area -->
      <div class="hw-canvas-wrap" id="hw-canvas-container">
        ${chars.map((ch, i) => `
          <div class="hw-canvas-box" id="hw-canvas-${i}" style="display: ${i === idx ? 'flex' : 'none'}">
            <svg xmlns="http://www.w3.org/2000/svg" class="hw-guideline" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid meet">
              <line x1="125" y1="0" x2="125" y2="250" stroke="#DDD" stroke-dasharray="6,4"/>
              <line x1="0" y1="125" x2="250" y2="125" stroke="#DDD" stroke-dasharray="6,4"/>
              <line x1="0" y1="0" x2="250" y2="250" stroke="#EEE" stroke-dasharray="4,6"/>
              <line x1="250" y1="0" x2="0" y2="250" stroke="#EEE" stroke-dasharray="4,6"/>
            </svg>
          </div>
        `).join('')}
        <button class="hw-reset-btn" onclick="window.app.ddWriteReset()" title="Làm lại">
          <i class="fa-solid fa-rotate-right"></i>
        </button>
      </div>

      <!-- Mark complete + navigation -->
      <div class="hw-actions">
        <button class="btn btn-secondary hw-nav-prev" onclick="window.app.ddWriteNav(-1)" ${idx === 0 ? 'disabled' : ''}>
          <i class="fa-solid fa-chevron-left"></i> Trước
        </button>
        <button class="btn ${ws.completed.has(idx) ? 'btn-success-outline' : 'btn-primary'}"
          onclick="window.app.ddWriteMarkDone()">
          ${ws.completed.has(idx)
            ? '<i class="fa-solid fa-check-circle"></i> Đã hoàn thành'
            : '<i class="fa-solid fa-circle-check"></i> Đánh dấu hoàn thành'}
        </button>
        <button class="btn btn-secondary hw-nav-next" onclick="window.app.ddWriteNav(1)" ${idx === total - 1 ? 'disabled' : ''}>
          Tiếp <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <!-- Character dots (mini navigation) -->
      <div class="hw-dots">
        ${chars.map((ch, i) => `
          <button class="hw-dot${i === idx ? ' current' : ''}${ws.completed.has(i) ? ' done' : ''}"
            onclick="window.app.ddWriteGoTo(${i})" title="${ch.char} — ${ch.pinyin}">
            <span class="hw-dot-char font-tc">${H(ch.char)}</span>
          </button>
        `).join('')}
      </div>

      ${isAllDone ? `
        <div class="hw-submit-area">
          <div class="hw-submit-msg">
            <i class="fa-solid fa-champagne-glasses" style="color:var(--warning)"></i>
            Bạn đã hoàn thành tất cả ${total} chữ!
          </div>
          <button class="btn btn-primary btn-lg" onclick="window.app.ddWriteSubmit()">
            <i class="fa-solid fa-paper-plane"></i> Nộp bài cho giáo viên
          </button>
          ${!state.user || !api.isLoggedIn ? '<p class="hw-login-hint"><i class="fa-solid fa-circle-info"></i> Đăng nhập để lưu kết quả và giáo viên có thể xem.</p>' : ''}
        </div>
      ` : ''}
    </div>
  `;

  // Initialize HanziWriter
  ddWriteInitCanvas(c.char, ws.mode);
}

/**
 * Tải thư viện HanziWriter (CDN) khi thật sự cần — trước đây nó là thẻ <script> ĐỒNG BỘ trong
 * <head>, chặn parse HTML của MỌI trang dù chỉ tab Luyện viết dùng tới (2026-09-06).
 * Trả về Promise; lỗi mạng thì reject để nơi gọi hiện thông báo thay vì im lặng không vẽ gì.
 */
const HW_SRC = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
let _hwPromise = null;
function napHanziWriter() {
  if (typeof HanziWriter !== 'undefined') return Promise.resolve();
  if (!_hwPromise) {
    _hwPromise = new Promise((ok, loi) => {
      const s = document.createElement('script');
      s.src = HW_SRC;
      s.onload = () => ok();
      s.onerror = () => { _hwPromise = null; loi(new Error('Không tải được HanziWriter')); };
      document.head.appendChild(s);
    });
  }
  return _hwPromise;
}

/** Khởi tạo HanziWriter cho canvas chính */
function ddWriteInitCanvas(char, mode) {
  if (typeof HanziWriter === 'undefined') {
    // Chưa có thư viện -> tải rồi gọi lại đúng chữ đang mở (người dùng có thể đã lật sang chữ
    // khác trong lúc chờ, nên kiểm tra lại state trước khi vẽ).
    napHanziWriter().then(() => {
      const ws2 = ddState.writing;
      const list = TB().writing[ddState.selectedSub] || [];
      const cur = list[ws2.idx];
      if (cur) ddWriteInitCanvas(cur.char, ws2.mode);
    }).catch((e) => console.warn(e));
    return;
  }
  
  const ws = ddState.writing;
  const targetId = `hw-canvas-${ws.idx}`;
  const target = document.getElementById(targetId);
  if (!target) return;

  // Nếu đã khởi tạo và không đổi mode, thì giữ nguyên
  if (ws.writers && ws.writers[ws.idx] && ws.modes && ws.modes[ws.idx] === mode) {
    return;
  }

  // Clear old
  const oldSvgs = target.querySelectorAll('svg:not(.hw-guideline)');
  oldSvgs.forEach(s => s.remove());

  // Hủy timeout cũ nếu có để tránh race condition khi render quá nhanh
  if (ws.initTimeout) clearTimeout(ws.initTimeout);

  ws.initTimeout = setTimeout(() => {
    // Nếu target đã bị xóa khỏi DOM (do render lại), thì hủy bỏ
    if (!document.contains(target)) return;

    const size = Math.min(target.offsetWidth, target.offsetHeight) || 250;

    try {
      const opts = {
        width: size,
        height: size,
        padding: 8,
        strokeColor: '#1a1a2e',
        radicalColor: '#6C5CE7',
        drawingColor: '#6C5CE7',
        drawingWidth: 40,
        showHintAfterMisses: 3,
        highlightOnComplete: true,
        highlightColor: '#00C9A7',
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 250,
        drawingFadeDuration: 600000, // Giữ nguyên nét vẽ của người dùng (10 phút)
        charDataLoader: (ch, onComplete) => {
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${ch}.json`)
            .then(r => r.json())
            .then(onComplete)
            .catch(() => {
              target.insertAdjacentHTML('beforeend',
                `<span class="hw-fallback-char font-tc">${H(char)}</span>`);
            });
        }
      };

      const isCompleted = ddState.writing.completed.has(ddState.writing.idx);

      if (mode === 0) {
        // Mode 0: Animation (hướng dẫn viết)
        opts.showOutline = true;
        opts.showCharacter = true;
        const writer = HanziWriter.create(target, char, opts);
        writer.loopCharacterAnimation();
        if(!ws.writers) ws.writers = {};
        if(!ws.modes) ws.modes = {};
        ws.writers[ws.idx] = writer;
        ws.modes[ws.idx] = mode;
      } else if (isCompleted) {
        // Already completed, just show the character
        opts.showOutline = true;
        opts.showCharacter = true;
        const writer = HanziWriter.create(target, char, opts);
        if(!ws.writers) ws.writers = {};
        if(!ws.modes) ws.modes = {};
        ws.writers[ws.idx] = writer;
        ws.modes[ws.idx] = mode;
      } else if (mode === 1) {
        // Mode 1: Quiz with outline (tập viết có gợi ý)
        opts.showCharacter = true; // MUST be true so quiz can reveal strokes!
        opts.showOutline = true;
        const writer = HanziWriter.create(target, char, opts);
        writer.quiz({
          onComplete: () => {
            // Auto mark done when quiz completed
            ddState.writing.completed.add(ddState.writing.idx);
            ddWriteUpdateUI();
          }
        });
        if(!ws.writers) ws.writers = {};
        if(!ws.modes) ws.modes = {};
        ws.writers[ws.idx] = writer;
        ws.modes[ws.idx] = mode;
      } else {
        // Mode 2: Quiz without outline (tập viết không gợi ý)
        opts.showCharacter = true; // MUST be true so quiz can reveal strokes!
        opts.showOutline = false;
        opts.showHintAfterMisses = 2;
        const writer = HanziWriter.create(target, char, opts);
        writer.quiz({
          onComplete: () => {
            ddState.writing.completed.add(ddState.writing.idx);
            ddWriteUpdateUI();
          }
        });
        if(!ws.writers) ws.writers = {};
        if(!ws.modes) ws.modes = {};
        ws.writers[ws.idx] = writer;
        ws.modes[ws.idx] = mode;
      }
    } catch (e) {
      console.warn('HanziWriter init error:', e);
      target.insertAdjacentHTML('beforeend',
        `<span class="hw-fallback-char font-tc">${H(char)}</span>`);
    }
  }, 50);
}

/** Đổi chế độ viết */
function ddWriteMode(mode) {
  ddState.writing.mode = mode;
  // Xoá writer cũ để ép khởi tạo lại cho mode mới
  if (ddState.writing.writers) {
    delete ddState.writing.writers[ddState.writing.idx];
  }
  ddWriteUpdateUI();
}

/** Điều hướng trước/sau */
function ddWriteNav(dir) {
  const chars = TB().writing[ddState.selectedSub];
  if (!chars) return;
  const ws = ddState.writing;
  ws.idx = Math.max(0, Math.min(chars.length - 1, ws.idx + dir));
  ddWriteUpdateUI();
}

/** Nhảy đến chữ theo index */
function ddWriteGoTo(idx) {
  ddState.writing.idx = idx;
  ddWriteUpdateUI();
}

/** Đánh dấu hoàn thành chữ hiện tại */
function ddWriteMarkDone() {
  const ws = ddState.writing;
  if (ws.completed.has(ws.idx)) {
    ws.completed.delete(ws.idx);
  } else {
    ws.completed.add(ws.idx);
  }
  ddWriteUpdateUI();
}

/** Cập nhật UI (progress, dots, buttons) mà không làm mất canvas */
function ddWriteUpdateUI() {
  const chars = TB().writing[ddState.selectedSub];
  if (!chars) return;
  const ws = ddState.writing;
  const total = chars.length;
  const completed = ws.completed.size;
  const idx = ws.idx;
  const c = chars[idx];
  const isAllDone = completed === total;

  // Cập nhật Mode Tabs
  const modeBtns = document.querySelectorAll('.hw-mode-btn');
  modeBtns.forEach((btn, m) => {
    if (m === ws.mode) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // Cập nhật Char Info
  const pinyinEl = document.querySelector('.hw-char-pinyin');
  if (pinyinEl) pinyinEl.innerText = c.pinyin;
  const charEl = document.querySelector('.hw-char-label');
  if (charEl) charEl.innerText = c.char;

  // Cập nhật Canvas Visibility
  for (let i = 0; i < total; i++) {
    const box = document.getElementById(`hw-canvas-${i}`);
    if (box) {
      box.style.display = i === idx ? 'flex' : 'none';
    }
  }

  // Khởi tạo Canvas cho chữ hiện tại nếu chưa có
  ddWriteInitCanvas(c.char, ws.mode);

  // Update progress
  const progressFill = document.querySelector('.hw-progress-fill');
  if (progressFill) progressFill.style.width = `${(completed / total) * 100}%`;
  
  const progressText = document.querySelector('.hw-progress-text');
  if (progressText) progressText.innerText = `${completed} / ${total} chữ đã hoàn thành`;

  // Update Mark Done button
  const actions = document.querySelector('.hw-actions');
  if (actions) {
    const markBtn = actions.querySelector('button:nth-child(2)');
    if (markBtn) {
      if (ws.completed.has(idx)) {
        markBtn.className = 'btn btn-success-outline';
        markBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Đã hoàn thành';
      } else {
        markBtn.className = 'btn btn-primary';
        markBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Đánh dấu hoàn thành';
      }
    }
    
    const prevBtn = document.querySelector('.hw-nav-prev');
    if (prevBtn) prevBtn.disabled = idx === 0;
    
    const nextBtn = document.querySelector('.hw-nav-next');
    if (nextBtn) nextBtn.disabled = idx === total - 1;
  }

  // Update dots
  const dots = document.querySelectorAll('.hw-dot');
  if (dots.length > 0) {
    dots.forEach((dot, i) => {
      if (ws.completed.has(i)) {
        dot.classList.add('done');
      } else {
        dot.classList.remove('done');
      }
      if (i === idx) {
        dot.classList.add('current');
      } else {
        dot.classList.remove('current');
      }
    });
  }

  // Handle submit area
  let submitArea = document.querySelector('.hw-submit-area');
  if (isAllDone) {
    if (!submitArea) {
       const hwPage = document.querySelector('.hw-page');
       if (hwPage) {
         const html = `
          <div class="hw-submit-area">
            <div class="hw-submit-msg">
              <i class="fa-solid fa-champagne-glasses" style="color:var(--warning)"></i>
              Bạn đã hoàn thành tất cả ${total} chữ!
            </div>
            <button class="btn btn-primary btn-lg" onclick="window.app.ddWriteSubmit()">
              <i class="fa-solid fa-paper-plane"></i> Nộp bài cho giáo viên
            </button>
            ${!state.user || !api.isLoggedIn ? '<p class="hw-login-hint"><i class="fa-solid fa-circle-info"></i> Đăng nhập để lưu kết quả và giáo viên có thể xem.</p>' : ''}
          </div>
         `;
         hwPage.insertAdjacentHTML('beforeend', html);
       }
    }
  } else {
    if (submitArea) submitArea.remove();
  }
}

/** Reset canvas (quiz lại) */
function ddWriteReset() {
  const chars = TB().writing[ddState.selectedSub];
  if (!chars) return;
  const c = chars[ddState.writing.idx];
  
  if (ddState.writing.writers) {
    delete ddState.writing.writers[ddState.writing.idx];
  }
  
  ddWriteInitCanvas(c.char, ddState.writing.mode);
}

/** Nộp bài viết → lưu kết quả lên server */
async function ddWriteSubmit() {
  const chars = TB().writing[ddState.selectedSub];
  if (!chars) return;

  const total = chars.length;
  const completed = ddState.writing.completed.size;

  if (state.user && api.isLoggedIn) {
    try {
      await api.post('/exercise/submit', {
        lesson_id: `writing:${ddState.selectedSub}`,
        total_questions: total,
        correct_answers: completed,
        time_seconds: 0,
      });
      alert(`✅ Đã nộp bài thành công!\n${completed}/${total} chữ đã hoàn thành.\nGiáo viên sẽ kiểm tra kết quả.`);
    } catch (e) {
      console.error('Writing submit error:', e);
      alert('❌ Không gửi được kết quả. Vui lòng thử lại.');
    }
  } else {
    alert(`📝 Bạn đã hoàn thành ${completed}/${total} chữ.\nĐăng nhập để lưu kết quả và gửi cho giáo viên.`);
  }
}

// ============================================================
// NGỮ PHÁP — render danh sách mục ngữ pháp cho bài con đang chọn
// ============================================================

/** Render 1 bảng tham khảo (dùng cho cả bảng cấp mục và bảng cấp điểm ngữ pháp) */
function ddGramTableHtml(t) {
  if (!t || !t.headers || !t.rows || !t.rows.length) return '';
  return `
    <div class="dd-gram-table-wrap">
      <table class="dd-gram-table">
        <thead><tr>${t.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>
          ${t.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

/** Cắt ghi chú dài thành từng câu để xuống dòng hợp lý (tránh 1 khối chữ dài dằng dặc) */
function ddGramSplitSentences(text) {
  if (!text) return [];
  return text
    .split(/(?<=[.!?。！？])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}

/** Render 1 hộp ghi chú (icon + nội dung), tự xuống dòng theo từng câu nếu dài */
function ddGramNoteHtml(note, extraClass) {
  if (!note) return '';
  const lines = ddGramSplitSentences(note)
    .map(s => `<span class="dd-gram-note-line">${s}</span>`)
    .join('');
  return `<div class="dd-gram-note${extraClass ? ' ' + extraClass : ''}"><i class="fa-solid fa-circle-info"></i><span>${lines}</span></div>`;
}

/** Render 1 ví dụ Hán tự (+ dịch nếu có) — không có nút phát âm (2026-08-25) */
function ddGramExampleHtml(ex, i) {
  // Ví dụ chưa có bản dịch vẫn hiện bình thường (câu chữ Hán là thứ chính), chỉ khuyết dòng nghĩa
  // — đừng ẩn cả câu đi, học viên mất luôn ví dụ.
  return `
    <div class="dd-gram-ex${ex.vi ? '' : ' is-chua-dich'}">
      <span class="dd-gram-ex-no">${i + 1}</span>
      <div class="dd-gram-ex-body">
        <div class="dd-gram-ex-hanzi font-tc">${H(ex.hz || '')}</div>
        ${ex.vi ? `<div class="dd-gram-ex-trans">${ex.vi}</div>` : ''}
      </div>
    </div>`;
}

/** Render 1 điểm (point) bên trong 1 mục ngữ pháp */
function ddGramPointHtml(p) {
  const exHtml = (p.examples || []).map(ddGramExampleHtml).join('');
  const nhan = ddGramNhan(p.label);
  const icon = DD_GRAM_ICON[nhan] || 'fa-angle-right';
  return `
    <div class="dd-gram-point">
      ${nhan ? `<div class="dd-gram-point-label"><i class="fa-solid ${icon}"></i>${nhan}</div>` : ''}
      ${p.formula ? `<div class="dd-gram-formula"><i class="fa-solid fa-diagram-project"></i><span>${p.formula}</span></div>` : ''}
      ${exHtml ? `<div class="dd-gram-ex-list">${exHtml}</div>` : ''}
      ${ddGramTableHtml(p.table)}
      ${p.answer ? `<div class="dd-gram-answer"><i class="fa-solid fa-circle-check"></i><span><b>Trả lời:</b> ${p.answer}</span></div>` : ''}
      ${ddGramNoteHtml(p.note)}
    </div>`;
}

/**
 * Nhãn mục trong PPT gốc của NTNU là tiếng Anh (Function/Structures/Negation/Questions/Usage)
 * và nhãn nguồn tiếng Trung của Q5-Q6 (課文一/二). Đổi sang tiếng Việt cho học viên đọc.
 */
const DD_GRAM_NHAN = {
  Function: 'Cách dùng', Usage: 'Cách dùng',
  Structure: 'Cấu trúc', Structures: 'Cấu trúc',
  Negation: 'Câu phủ định', Question: 'Câu hỏi', Questions: 'Câu hỏi',
  '課文一': 'Bài khoá 1', '課文二': 'Bài khoá 2', '課文三': 'Bài khoá 3', '課文四': 'Bài khoá 4',
};
const ddGramNhan = (l) => (l ? (DD_GRAM_NHAN[String(l).trim()] || l) : '');

/** Icon riêng cho từng loại nhãn — mắt nhận ra nhóm trước khi kịp đọc chữ. */
const DD_GRAM_ICON = {
  'Cách dùng': 'fa-lightbulb', 'Cấu trúc': 'fa-diagram-project',
  'Câu phủ định': 'fa-ban', 'Câu hỏi': 'fa-circle-question',
};

/**
 * Bỏ số thứ tự La Mã ở đầu tiêu đề gốc ("II. Judgmental V-起來…" -> "Judgmental V-起來…") —
 * số đã hiển thị riêng ở ô tròn bên trái rồi.
 *
 * ⚠️ ĐỪNG cố tách tiêu đề gốc thành "phần chữ Hán" và "phần tiếng Anh": pinyin nằm xen ngay
 * sau chữ Hán ("從 cóng…往 wǎng… go… from…") nên mọi cách tách theo chữ Latin đều cắt cụt cấu
 * trúc — bản đầu ra đúng một chữ "從". Khi đã có `titleVi` do người soạn thì tiêu đề gốc chỉ
 * cần giữ NGUYÊN VẸN làm dòng phụ.
 */
function ddGramBoSo(raw) {
  return String(raw || '').replace(/^([IVXⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]+|\d+)\s*[.、]\s*/, '').trim();
}

/** Render 1 mục ngữ pháp (item) — gồm nhiều điểm (points) */
function ddGramItemHtml(item, i) {
  const goc = ddGramBoSo(item.title);
  return `
    <div class="dd-gram-card">
      <div class="dd-gram-card-header">
        <span class="dd-gram-num">${i + 1}</span>
        <div class="dd-gram-head-text">
          ${item.titleVi
            ? `<h3 class="dd-gram-title-vi">${item.titleVi}</h3>
               <div class="dd-gram-title-en font-tc">${H(goc)}</div>`
            : `<h3 class="dd-gram-title font-tc">${H(goc)}</h3>`}
        </div>
      </div>
      ${item.giaiThich ? `<div class="dd-gram-giai"><i class="fa-solid fa-graduation-cap"></i>
        <span>${item.giaiThich}</span></div>` : ''}
      ${ddGramTableHtml(item.table)}
      <div class="dd-gram-points">
        ${(item.points || []).map(ddGramPointHtml).join('')}
      </div>
      ${ddGramNoteHtml(item.note, 'dd-gram-note-item')}
    </div>`;
}


/**
 * Thời lượng thi THẬT của từng cấp HSK, tính bằng phút (theo quy định của Hanban: phần nghe +
 * phần đọc + phần viết, đã gồm thời gian điền phiếu).
 *
 * Luyện đề mà không có áp lực thời gian thì không biết mình có kịp hay không — đó là thứ trượt
 * nhiều nhất ở phòng thi thật. Nhưng KHÔNG ép: học viên bật/tắt được, vì lần đầu làm quen đề thì
 * dừng lại tra từ mới là cách học đúng.
 */
const HSKE_PHUT = { 1: 40, 2: 55, 3: 90, 4: 105, 5: 125, 6: 140, '7-9': 210 };

const HSKE_TEN_KN = { nghe: 'Nghe hiểu', doc: 'Đọc hiểu', viet: 'Viết' };
const HSKE_IC_KN = { nghe: 'fa-headphones', doc: 'fa-book-open', viet: 'fa-pen' };



/**
 * Phân tích kết quả THEO KỸ NĂNG (2026-09-16).
 *
 * Trước đây nộp bài xong chỉ ra một con số phần trăm. Với người luyện thi, con số đó gần như vô
 * dụng: điều họ cần biết là "mình yếu phần nào" để dành thời gian đúng chỗ. Cùng 60% nhưng
 * nghe 30% / đọc 90% là một chiến lược ôn hoàn toàn khác với nghe 90% / đọc 30%.
 *
 * Nhóm kỹ năng suy từ chính dữ liệu đề (`nghe` / `dang: 'viet'`), không cần thêm trường nào.
 */
function _hskePhanTichHtml(d, cham) {
  const nhom = {};
  for (const c of cham) {
    const k = hskeKyNang(c);
    nhom[k] ??= { tong: 0, dung: 0, bo: 0 };
    nhom[k].tong++;
    const tl = hskExamState.dapAn[c.so];
    const daLam = c.dang === 'viet' ? !!String(tl || '').trim() : !!tl;
    if (!daLam) nhom[k].bo++;
    else if (hskCauDung(c, tl)) nhom[k].dung++;
  }
  const ds = Object.entries(nhom).filter(([, v]) => v.tong > 0);
  // Đề chỉ có một kỹ năng thì bảng "phân tích" chẳng phân tích gì — bỏ hẳn cho gọn.
  if (ds.length < 2) return '';

  const pt = (v) => Math.round((v.dung / v.tong) * 100);
  const yeu = ds.slice().sort((a, b) => pt(a[1]) - pt(b[1]))[0];
  const manh = ds.slice().sort((a, b) => pt(b[1]) - pt(a[1]))[0];
  // Chỉ nói "yếu phần X" khi thật sự có khoảng cách. Chênh 5% là nhiễu, khuyên theo đó là khuyên bừa.
  const dangKe = pt(yeu[1]) + 15 <= pt(manh[1]);

  return `
    <div class="hske-phantich">
      <h4><i class="fa-solid fa-chart-simple"></i> Kết quả theo kỹ năng</h4>
      <div class="hske-kn-ds">
        ${ds.map(([k, v]) => `
          <div class="hske-kn">
            <div class="hske-kn-dau">
              <i class="fa-solid ${HSKE_IC_KN[k]}"></i>
              <span>${HSKE_TEN_KN[k]}</span>
              <b class="${pt(v) >= 80 ? 'is-tot' : pt(v) >= 50 ? 'is-vua' : 'is-kem'}">${pt(v)}%</b>
            </div>
            <div class="tw-bar"><i style="width:${pt(v)}%"></i></div>
            <div class="hske-kn-chi">${v.dung}/${v.tong} câu đúng${v.bo ? ` · bỏ trống ${v.bo}` : ''}</div>
          </div>`).join('')}
      </div>
      ${dangKe ? `
        <p class="hske-kn-loi"><i class="fa-solid fa-lightbulb"></i>
          <span>Phần <strong>${HSKE_TEN_KN[yeu[0]]}</strong> đang thấp hơn hẳn
          (${pt(yeu[1])}% so với ${pt(manh[1])}% ở ${HSKE_TEN_KN[manh[0]]}) — nên dành thời gian ôn phần này trước.</span></p>`
        : `<p class="hske-kn-loi"><i class="fa-solid fa-circle-info"></i>
          <span>Các kỹ năng đang khá đều nhau. Cứ luyện tiếp theo lịch hiện tại.</span></p>`}
    </div>`;
}

function ddRenderGrammar(el) {
  const items = TB().grammar[ddState.selectedSub] || [];
  // HSK có renderer riêng: dữ liệu là danh mục điểm ngữ pháp + danh sách từ, không phải bài
  // giảng có ví dụ như hai bộ giáo trình. Nhận ra bằng chính trường `nhom` mà chỉ HSK mới có.
  if (items.length && items[0].nhom) return ddRenderGrammarHsk(el, items);
  if (!items.length) {
    el.innerHTML = '<p class="dd-empty">Bài này không có mục ngữ pháp riêng — nội dung ngữ pháp đã được gộp vào bài liền kề.</p>';
    return;
  }
  const coGiai = items.filter(x => x.giaiThich).length;
  const tongVd = items.reduce((a, x) => a + (x.points || []).reduce((b, p) => b + (p.examples || []).length, 0), 0);
  const vdDich = items.reduce((a, x) => a + (x.points || []).reduce((b, p) => b + (p.examples || []).filter(e => e.vi).length, 0), 0);
  el.innerHTML = `
    <div class="dd-vocab-header">
      <span class="dd-vocab-count"><i class="fa-solid fa-book-open"></i> ${items.length} mục ngữ pháp</span>
      ${coGiai ? `<span class="dd-gram-badge"><i class="fa-solid fa-graduation-cap"></i> ${coGiai} mục có giải thích</span>` : ''}
      ${tongVd ? `<span class="dd-gram-badge is-ex"><i class="fa-solid fa-language"></i> ${vdDich}/${tongVd} ví dụ có nghĩa</span>` : ''}
    </div>
    <div class="dd-gram-list">
      ${items.map(ddGramItemHtml).join('')}
    </div>`;
}

/**
 * Chữ Hán chính của một mục từ vựng, theo nút 繁/简.
 *
 * Hai bộ Đài Loan lưu PHỒN thể ở `hanzi` (giản thể ở `simplified`, thường thiếu -> `getDisplayText`
 * rơi về bảng tra); bộ HSK thì ngược lại, `hanzi` là GIẢN thể còn phồn nằm ở `traditional`.
 * Gộp cả hai vào đây để nơi gọi không phải nhớ bộ nào lưu kiểu gì.
 */
function ddChuChinh(w) {
  if (!TB().gianThe) return getDisplayText(w.hanzi, w.simplified);
  if (state.charMode === 'simplified') return w.hanzi;
  return w.traditional && w.traditional !== w.hanzi ? w.traditional : w.hanzi;
}

/** Chip chữ ở dạng CÒN LẠI (chỉ của bộ HSK, và chỉ khi hai dạng thật sự khác nhau). */
function ddChuPhuHtml(w) {
  if (!TB().gianThe || !w.traditional || w.traditional === w.hanzi) return '';
  const dangPhon = state.charMode !== 'simplified';
  const phu = dangPhon ? w.hanzi : w.traditional;
  return `<span class="hsk-phon font-tc" title="Dạng ${dangPhon ? 'giản' : 'phồn'} thể">${phu}</span>`;
}

function ddRenderVocabList(el) {
  const vocab = ddGetVocab(ddState.selectedSub);
  const sub = TB().subs.find(s => s.id === ddState.selectedSub);
  if (!vocab.length) {
    el.innerHTML = '<p class="dd-empty">Chưa có dữ liệu từ vựng cho bài này.</p>';
    return;
  }

  napTruocAudioTu(vocab);
  datDsDoc(vocab.map((w) => ({ text: w.hanzi, src: w.audio, srcTts: w.audioTts })));
  el.innerHTML = `
    <div class="dd-vocab-header">
      <span class="dd-vocab-count"><i class="fa-solid fa-list"></i> ${vocab.length} từ vựng</span>
      ${nutDocHtml()}
    </div>
    <div class="dd-vocab-list">
      ${vocab.map((w, i) => {
        const num = (sub ? sub.from : 1) + i;
        const exHtml = (w.ex || []).map(ex => `
          <div class="dd-ex-item">
            <div class="dd-ex-hanzi font-tc">${H(ex.h)}</div>
            <div class="dd-ex-pinyin">${ex.p}</div>
            <div class="dd-ex-trans">${ex.t}</div>
          </div>`).join('');
        return `
        <div class="dd-vocab-card">
          <div class="dd-vocab-main" onclick="window.app.ddToggleVocab(${i})">
            <span class="dd-vocab-num">${num}</span>
            <div class="dd-vocab-info">
              <div class="dd-vocab-hanzi-row">
                <span class="dd-vocab-hanzi font-tc">${ddChuChinh(w)}</span>${ddChuPhuHtml(w)}
                <span class="dd-vocab-pinyin">${w.pinyin}</span>
                ${w.pos ? `<span class="dd-vocab-pos">${w.pos}</span>` : ''}
              </div>
              <div class="dd-vocab-def">${w.def}</div>
            </div>
            <div class="dd-vocab-actions">
              <button class="dd-btn-speak" onclick="event.stopPropagation(); window.app.ddSpeakWord('${w.hanzi.replace(/'/g, "\\'")}', ${w.audio ? `'${w.audio}'` : 'null'}${w.audioTts ? `, '${w.audioTts}'` : ''})" title="${w.audio ? 'Nghe giọng đọc của sách' : 'Phát âm'}">
                <i class="fa-solid fa-volume-high"></i>
              </button>
              ${tdNutLuuTuHtml(w.traditional || w.hanzi, TB().gianThe ? w.hanzi : (w.simplified || ''), w.pinyin, w.def)}
              <i id="dd-vocab-arrow-${i}" class="fa-solid fa-chevron-down dd-vocab-arrow"></i>
            </div>
          </div>
          <div id="dd-vocab-detail-${i}" class="dd-vocab-detail">
            ${exHtml ? `<div class="dd-ex-label">Ví dụ:</div>${exHtml}` : '<p class="dd-no-ex">Chưa có ví dụ.</p>'}
          </div>
        </div>`;
      }).join('')}
    </div>
`;
}

function ddRenderFlashcard(el) {
  const vocab = ddDeck();
  if (!vocab.length) {
    el.innerHTML = '<p class="dd-empty">Chưa có dữ liệu flashcard cho bài này.</p>';
    return;
  }
  napTruocAudioTu(vocab);

  el.innerHTML = `
    <div class="dd-fc-controls">
      <button class="dd-fc-ctrl-btn ${ddState.order ? 'active' : ''}" onclick="window.app.ddFcShuffle()"
        title="${ddState.order ? 'Về thứ tự gốc' : 'Xáo trộn thứ tự thẻ'}"><i class="fa-solid fa-shuffle"></i></button>
      <span class="dd-fc-counter" id="dd-fc-counter">1 / ${vocab.length}</span>
      ${ddState.order ? '<span class="dd-fc-badge">đã xáo</span>' : ''}
    </div>
    <div class="dd-fc-container">
      <button class="dd-fc-nav-btn dd-fc-prev" onclick="window.app.ddFcNav(-1)"><i class="fa-solid fa-chevron-left"></i></button>
      <div class="dd-fc-card" onclick="window.app.ddFcFlip()">
        <div class="dd-fc-card-inner" id="dd-fc-card-inner">
          <div class="dd-fc-front" id="dd-fc-front"></div>
          <div class="dd-fc-back" id="dd-fc-back"></div>
        </div>
      </div>
      <button class="dd-fc-nav-btn dd-fc-next" onclick="window.app.ddFcNav(1)"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
    <div class="dd-fc-hint">Nhấn vào thẻ để lật<span class="fc-hint-kb"> · Phím <kbd>←</kbd> <kbd>→</kbd> chuyển thẻ · <kbd>Space</kbd> lật</span></div>`;

  ddRenderFcCard();
}

function ddRenderFcCard() {
  const vocab = ddDeck();
  if (!vocab.length) return;
  const w = vocab[ddState.fcIdx];
  const front = document.getElementById('dd-fc-front');
  const back = document.getElementById('dd-fc-back');
  const counter = document.getElementById('dd-fc-counter');
  const inner = document.getElementById('dd-fc-card-inner');
  if (!front || !back) return;

  front.innerHTML = `
    <div class="dd-fc-hanzi font-tc">${ddChuChinh(w)}</div>
    <button class="dd-fc-speak" onclick="event.stopPropagation(); window.app.ddSpeakWord('${w.hanzi.replace(/'/g, "\\'")}', ${w.audio ? `'${w.audio}'` : 'null'}${w.audioTts ? `, '${w.audioTts}'` : ''})">
      <i class="fa-solid fa-volume-high"></i>
    </button>`;

  // Mặt sau: Pinyin + Nghĩa tiếng Việt (+ từ loại).
  back.innerHTML = `
    <div class="dd-fc-pinyin">${w.pinyin}</div>
    <div class="dd-fc-def">${w.def}</div>
    ${w.pos ? `<div class="dd-fc-pos">${w.pos}</div>` : ''}`;

  if (counter) counter.textContent = `${ddState.fcIdx + 1} / ${vocab.length}`;
  if (inner) inner.classList.toggle('flipped', ddState.fcFlipped);
}

// ============================================================
// DIALOGUE / HỘI THOẠI — Audio player + cue list
// ============================================================
const ddDlgState = {
  audio: null,       // HTMLAudioElement
  playing: false,
  currentCue: -1,
  showPinyin: true,
  showTrans: true,
  loopCue: false,
  speed: 1,
};

function ddRenderDialogue(el) {
  const dialogue = TB().dialogues[ddState.selectedSub];
  if (!dialogue) {
    el.innerHTML = '<p class="dd-empty">Chưa có dữ liệu hội thoại cho bài này.</p>';
    return;
  }

  // Reset state
  if (ddDlgState.audio) { ddDlgState.audio.pause(); ddDlgState.audio = null; }
  ddDlgState.playing = false;
  ddDlgState.currentCue = -1;

  const cues = dialogue.cues || [];

  el.innerHTML = `
    <div class="dd-dlg-container">
      <!-- Player header -->
      <div class="dd-dlg-player">
        <div class="dd-dlg-player-info">
          <i class="fa-solid fa-comments dd-dlg-icon"></i>
          <div>
            <div class="dd-dlg-title font-tc">${H(dialogue.title)}</div>
            <div class="dd-dlg-meta">${cues.length} câu · ${tbLabel(ddState.selectedSub)}</div>
          </div>
        </div>
        <div class="dd-dlg-controls">
          <button class="dd-dlg-btn" id="dd-dlg-prev" onclick="window.app.ddDlgPrevCue()" title="Câu trước"><i class="fa-solid fa-backward-step"></i></button>
          <button class="dd-dlg-btn dd-dlg-play" id="dd-dlg-play" onclick="window.app.ddDlgTogglePlay()" title="Phát / Tạm dừng"><i class="fa-solid fa-play"></i></button>
          <button class="dd-dlg-btn" id="dd-dlg-next" onclick="window.app.ddDlgNextCue()" title="Câu sau"><i class="fa-solid fa-forward-step"></i></button>
          <button class="dd-dlg-btn ${ddDlgState.loopCue ? 'active' : ''}" id="dd-dlg-loop" onclick="window.app.ddDlgToggleLoop()" title="Lặp câu hiện tại"><i class="fa-solid fa-repeat"></i></button>
        </div>
        <div class="dd-dlg-progress-wrap">
          <div class="dd-dlg-progress" id="dd-dlg-progress"><div class="dd-dlg-progress-bar" id="dd-dlg-progress-bar"></div></div>
          <span class="dd-dlg-time" id="dd-dlg-time">0:00 / 0:00</span>
        </div>
        <div class="dd-dlg-options">
          <button class="dd-dlg-opt-btn ${ddDlgState.showPinyin ? 'active' : ''}" onclick="window.app.ddDlgTogglePinyin()" title="Hiện/ẩn pinyin">
            <i class="fa-solid fa-font"></i> <span>Pinyin</span>
          </button>
          <button class="dd-dlg-opt-btn ${ddDlgState.showTrans ? 'active' : ''}" onclick="window.app.ddDlgToggleTrans()" title="Hiện/ẩn dịch">
            <i class="fa-solid fa-language"></i> <span>Dịch</span>
          </button>
          <select class="dd-dlg-speed" onchange="window.app.ddDlgSetSpeed(parseFloat(this.value))" title="Tốc độ phát">
            ${[0.5, 0.75, 1, 1.25, 1.5].map(s => `<option value="${s}" ${ddDlgState.speed === s ? 'selected' : ''}>${s}x</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Cue list -->
      <div class="dd-dlg-cue-list" id="dd-dlg-cue-list">
        ${cues.map((cue, i) => {
          // Parse speaker from Vietnamese translation
          const viMatch = cue.vi ? cue.vi.match(/^([^:：]+)[：:]/) : null;
          const speaker = viMatch ? viMatch[1].trim() : '';
          const viText = viMatch ? cue.vi.substring(viMatch[0].length).trim() : (cue.vi || '');
          // Generate character-by-character pinyin display
          const chars = [...cue.text];

          return `
          <div class="dd-dlg-cue ${i === ddDlgState.currentCue ? 'active' : ''}" id="dd-dlg-cue-${i}" onclick="window.app.ddDlgGoCue(${i})">
            <div class="dd-dlg-cue-num">${i + 1}</div>
            <div class="dd-dlg-cue-content">
              ${speaker ? `<div class="dd-dlg-speaker">${speaker}</div>` : ''}
              ${ddDlgState.showPinyin && cue.pinyin ? `<div class="dd-dlg-cue-pinyin">${cue.pinyin}</div>` : ''}
              <div class="dd-dlg-cue-hanzi font-tc">${H(cue.text)}</div>
              ${ddDlgState.showTrans && cue.vi ? `<div class="dd-dlg-cue-trans">${viText}</div>` : ''}
            </div>
            <button class="dd-dlg-cue-speak" onclick="event.stopPropagation(); window.app.ddSpeakWord('${cue.text.replace(/'/g, "\\'")}')" title="Phát TTS">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>`;
        }).join('')}
      </div>
    </div>`;

  // Create and setup audio
  const audio = new Audio(assetUrl(dialogue.audio));
  audio.playbackRate = ddDlgState.speed;
  ddDlgState.audio = audio;

  audio.addEventListener('timeupdate', () => {
    const t = audio.currentTime;
    const dur = audio.duration || 1;
    const bar = document.getElementById('dd-dlg-progress-bar');
    const timeEl = document.getElementById('dd-dlg-time');
    if (bar) bar.style.width = (t / dur * 100) + '%';
    if (timeEl) timeEl.textContent = ddFormatTime(t) + ' / ' + ddFormatTime(dur);

    // Highlight active cue
    let activeCue = -1;
    for (let i = cues.length - 1; i >= 0; i--) {
      if (t >= cues[i].start) { activeCue = i; break; }
    }
    if (activeCue !== ddDlgState.currentCue) {
      // Remove old highlight
      const old = document.getElementById('dd-dlg-cue-' + ddDlgState.currentCue);
      if (old) old.classList.remove('active');
      // Add new
      ddDlgState.currentCue = activeCue;
      const cur = document.getElementById('dd-dlg-cue-' + activeCue);
      if (cur) {
        cur.classList.add('active');
        cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Loop single cue
    if (ddDlgState.loopCue && activeCue >= 0 && activeCue < cues.length) {
      if (t >= cues[activeCue].end) {
        audio.currentTime = cues[activeCue].start;
      }
    }
  });

  audio.addEventListener('ended', () => {
    ddDlgState.playing = false;
    const btn = document.getElementById('dd-dlg-play');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
  });

  // Click on progress bar to seek
  const progressWrap = document.getElementById('dd-dlg-progress');
  if (progressWrap) {
    progressWrap.addEventListener('click', (e) => {
      const rect = progressWrap.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * (audio.duration || 0);
    });
  }
}

function ddFormatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function ddDlgTogglePlay() {
  const a = ddDlgState.audio;
  if (!a) return;
  if (ddDlgState.playing) {
    a.pause();
    ddDlgState.playing = false;
  } else {
    a.play();
    ddDlgState.playing = true;
  }
  const btn = document.getElementById('dd-dlg-play');
  if (btn) btn.innerHTML = ddDlgState.playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
}

function ddDlgGoCue(idx) {
  const a = ddDlgState.audio;
  const dialogue = TB().dialogues[ddState.selectedSub];
  if (!a || !dialogue) return;
  const cue = dialogue.cues[idx];
  if (cue) {
    a.currentTime = cue.start;
    if (!ddDlgState.playing) { a.play(); ddDlgState.playing = true; }
    const btn = document.getElementById('dd-dlg-play');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}

function ddDlgPrevCue() {
  const idx = Math.max(0, ddDlgState.currentCue - 1);
  ddDlgGoCue(idx);
}

function ddDlgNextCue() {
  const dialogue = TB().dialogues[ddState.selectedSub];
  if (!dialogue) return;
  const idx = Math.min(dialogue.cues.length - 1, ddDlgState.currentCue + 1);
  ddDlgGoCue(idx);
}

function ddDlgToggleLoop() {
  ddDlgState.loopCue = !ddDlgState.loopCue;
  const btn = document.getElementById('dd-dlg-loop');
  if (btn) btn.classList.toggle('active', ddDlgState.loopCue);
}

function ddDlgTogglePinyin() {
  ddDlgState.showPinyin = !ddDlgState.showPinyin;
  ddRenderTabContent();
}

function ddDlgToggleTrans() {
  ddDlgState.showTrans = !ddDlgState.showTrans;
  ddRenderTabContent();
}

function ddDlgSetSpeed(speed) {
  ddDlgState.speed = speed;
  if (ddDlgState.audio) ddDlgState.audio.playbackRate = speed;
}


// ============================================================
// EXERCISE — Bài tập trắc nghiệm từ vựng
// ============================================================

/** Dừng timer bài tập nếu đang chạy */
function ddExStopTimer() {
  if (ddState.exercise.timerId) {
    clearInterval(ddState.exercise.timerId);
    ddState.exercise.timerId = null;
  }
}

/** Format giây → MM:SS */
function ddExFormatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/** Bắt đầu làm bài */
/**
 * Đoạn URL (segs[2]) mô tả màn đang xem trong tab Bài tập — dùng ở PAGE_PARAMS['tocfl-duongdai']
 * .write() để mỗi màn (giới thiệu / đang làm trắc nghiệm / Luyện tập tổng hợp) có URL riêng,
 * Back được và gửi được cho người khác (2026-09-04).
 */
function _ddExUrlSeg() {
  if (ddState.onllang.open) return 'luyen-tap-tong-hop';
  if (ddState.exercise.phase !== 'idle') return 'trac-nghiem';
  return null;
}

/**
 * Phần STATE THUẦN của việc bắt đầu 1 lượt trắc nghiệm — tách riêng khỏi ddExStart() vì
 * PAGE_PARAMS['tocfl-duongdai'].read() cũng cần gọi được phần này (khi URL trỏ thẳng vào
 * segs[2]='trac-nghiem'), NHƯNG read() chạy TRƯỚC khi renderDuongdai() dựng lại DOM của trang —
 * gọi updateUrl()/ddRenderExercise() ở đó là thao tác lên DOM chưa tồn tại (#dd-tab-content vẫn
 * là khung của trang trước) và ghi URL 2 lần chồng lên bước ghi URL của chính navigate(). Nên
 * hàm này CHỈ đổi state, không đụng DOM/URL — hai việc đó do người gọi tự lo.
 * @returns {boolean} có sinh được câu hỏi hay không (bài chưa đủ từ vựng thì false).
 */
function _ddExBatDauLuot() {
  const questions = generateQuiz(ddState.selectedSub, TB());   // TB() = bộ giáo trình đang xem
  if (!questions || questions.length === 0) return false;

  const ex = ddState.exercise;
  ex.phase = 'active';
  ex.questions = questions;
  ex.answers = new Array(questions.length).fill(-1);
  ex.startTime = Date.now();
  ex.elapsed = 0;
  ex.correct = 0;
  ex.scorePercent = 0;

  ddExStopTimer();
  ex.timerId = setInterval(() => {
    ex.elapsed = Math.floor((Date.now() - ex.startTime) / 1000);
    const timerEl = document.getElementById('dd-ex-timer');
    if (timerEl) timerEl.textContent = ddExFormatTime(ex.elapsed);
  }, 1000);
  return true;
}

/** Bấm nút "Bắt đầu làm bài" — đổi state, ghi URL riêng cho màn đang làm bài, rồi render. */
function ddExStart() {
  if (!_ddExBatDauLuot()) return;
  // URL riêng cho màn đang làm bài — Back được, gửi được cho người khác (2026-09-04).
  updateUrl({ push: true });
  const el = document.getElementById('dd-tab-content');
  ddRenderExercise(el);
  twFocusMode(true);
  twPlayEnter(el, 'tw-entering');
}

/** User chọn đáp án */
function ddExSelect(qIdx, optIdx) {
  if (ddState.exercise.phase !== 'active') return;
  ddState.exercise.answers[qIdx] = optIdx;

  // Update UI cho câu này
  const qCard = document.getElementById(`dd-ex-q-${qIdx}`);
  if (qCard) {
    qCard.querySelectorAll('.dd-ex-opt').forEach((btn, i) => {
      btn.classList.toggle('selected', i === optIdx);
    });
  }

  // Update progress
  const answered = ddState.exercise.answers.filter(a => a >= 0).length;
  const total = ddState.exercise.questions.length;
  const progEl = document.getElementById('dd-ex-progress-text');
  if (progEl) progEl.textContent = `${answered}/${total}`;
  const barEl = document.getElementById('dd-ex-progress-bar');
  if (barEl) barEl.style.width = `${(answered / total) * 100}%`;
}

/** Nộp bài */
async function ddExSubmit() {
  const ex = ddState.exercise;
  if (ex.phase !== 'active') return;

  // Kiểm tra đã trả lời hết chưa
  const unanswered = ex.answers.filter(a => a < 0).length;
  if (unanswered > 0) {
    if (!confirm(`Bạn còn ${unanswered} câu chưa trả lời. Nộp bài ngay?`)) return;
  }

  ddExStopTimer();
  ex.phase = 'submitted';

  // Chấm điểm
  let correct = 0;
  ex.questions.forEach((q, i) => {
    if (ex.answers[i] === q.correctIdx) correct++;
  });
  ex.correct = correct;
  ex.scorePercent = Math.round((correct / ex.questions.length) * 100 * 100) / 100;

  // Gửi lên server nếu đã đăng nhập
  if (state.user) {
    try {
      await api.post('/exercise/submit', {
        lesson_id: ddState.selectedSub,
        total_questions: ex.questions.length,
        correct_answers: correct,
        time_seconds: ex.elapsed,
        // Snapshot đầy đủ câu hỏi + lựa chọn đã chọn — để giáo viên xem lại đúng/sai từng câu
        // (Quản lý lớp > chi tiết học viên > bấm "Xem chi tiết" sẽ mở lại đúng trang này ở chế độ xem).
        details: { questions: ex.questions, answers: ex.answers },
      });
    } catch (e) {
      console.warn('Không gửi được kết quả bài tập:', e);
    }
  }

  const elKq = document.getElementById('dd-tab-content');
  ddRenderExercise(elKq);
  twFocusMode(false);
  twPlayEnter(elKq, 'tw-entering');
}

/** Phần STATE THUẦN của việc đưa bài tập về màn giới thiệu — xem lý do tách riêng ở
 * _ddExBatDauLuot() ngay phía trên: PAGE_PARAMS.read() cũng cần gọi được mà không đụng DOM/URL. */
function _ddExVeLaiIdle() {
  ddExStopTimer();
  Object.assign(ddState.exercise, {
    phase: 'idle', questions: [], answers: [], startTime: 0,
    elapsed: 0, timerId: null, correct: 0, scorePercent: 0,
  });
}

/** Bấm nút "Làm lại" — quay về màn giới thiệu, URL cũng trở lại không segs[2]. */
function ddExReset() {
  _ddExVeLaiIdle();
  updateUrl({ push: true });
  const el = document.getElementById('dd-tab-content');
  ddRenderExercise(el);
  twFocusMode(false);
  twPlayEnter(el, 'tw-entering');
}

// ============================================================
//  LUYỆN TẬP TỔNG HỢP (nguồn onllang.com) — xem CLAUDE.md 4.21
// ============================================================

/**
 * Tải "Luyện tập tổng hợp" của MỘT bài — `public/data/luyentap/<lessonId>.json` (2026-09-06).
 *
 * File đó do `scripts/gen-luyentap-split.mjs` gộp sẵn ba nguồn đề (onllang / 測驗卷 MTC / tự
 * sinh) và đáp án tương ứng. Trước đây hàm này tải CẢ SÁU file nguồn — 3,6 MB — rồi lọc lấy
 * một bài; trên 4G là chờ trắng màn hình cả chục giây cho dữ liệu của 153 bài khác.
 *
 * Trả `{ lesson, ans }`; bài chưa có đề thì `lesson` = null (nơi gọi tự hiện "chưa có").
 * Nhớ theo bài trong `_ddLtCache` để đổi qua lại giữa các mục không tải lại.
 */
const _ddLtCache = new Map();
function _ddLuyenTapLoad(lessonId) {
  const id = String(lessonId);
  if (!_ddLtCache.has(id)) {
    _ddLtCache.set(id, napTaiNguyen(`/noi-dung/luyentap/${encodeURIComponent(id)}`, 'luyentap', id)
      .then((d) => (d ? { lesson: d, ans: d.answers || {} } : { lesson: null, ans: {} }))
      .catch((e) => {
        if (e instanceof LoiCanQuyen) return { lesson: null, ans: {}, canQuyen: true, bo: e.bo, sanPham: e.sanPham };
        _ddLtCache.delete(id); console.warn('Không tải được luyện tập', id, e); return { lesson: null, ans: {} };
      }));
  }
  return _ddLtCache.get(id);
}

// State làm bài "Luyện tập tổng hợp": chọn/điền/ghép + đã nộp hay chưa, theo TỪNG MỤC (quiz
// slug) riêng — nộp mục này không khoá mục khác. Reset mỗi khi mở bài mới (đầu ddRenderOnllangEx).
// `open`: đang xem "Luyện tập tổng hợp" hay màn giới thiệu tab Bài tập — phản ánh vào URL
// (segs[2], xem PAGE_PARAMS['tocfl-duongdai']) để Back/share được đúng màn đang xem (2026-09-04).
if (!ddState.onllang) ddState.onllang = { lessonId: null, quiz: {}, open: false };

function _ddOnllangQuizState(slug) {
  if (!ddState.onllang.quiz[slug]) ddState.onllang.quiz[slug] = { nop: false, chon: {}, dien: {}, ghep: {}, thanhWord: {} };
  // thanhWord[wi] = chỉ số tổ hợp thanh đã bấm cho TỪ thứ wi (mục Phân biệt thanh điệu, xem
  // ddOnllangThanhCombo). Tên đổi từ `thanh` (chọn theo từng âm tiết) sang `thanhWord` (chọn
  // theo cả từ) ngày 2026-09-04 — đừng nhầm với state cũ đã bỏ.
  if (!ddState.onllang.quiz[slug].thanhWord) ddState.onllang.quiz[slug].thanhWord = {};
  if (!ddState.onllang.quiz[slug].o) ddState.onllang.quiz[slug].o = {};
  if (!ddState.onllang.quiz[slug].ghepChon) ddState.onllang.quiz[slug].ghepChon = {};
  return ddState.onllang.quiz[slug];
}

let _ddOnllangTone = null;
/**
 * Load onllang-tone-hints.json — phiên âm + vị trí ô trống + thanh đúng cho mục
 * "I. Phân biệt thanh điệu". Sinh bằng `npm run onllang:tone-hints` từ chính Sách bài tập
 * Đương Đại (bản in có phiên âm và tô đỏ đúng chữ mang thanh), nên đây là số liệu THẬT
 * lấy từ sách — không phải AI đoán như phần lớn đáp án khác của onllang.
 *
 * Dữ liệu onllang gốc KHÔNG dùng được cho mục này: bài 1 chỉ có chữ Hán trần (không phiên âm,
 * không biết hỏi thanh của âm tiết nào), còn bài 2-15 thì scraper gộp cả mục thành 1 câu
 * cloze_answer và MẤT SẠCH danh sách từ — không còn một chữ Hán nào. Bài nào chưa có trong
 * file này thì hiện thông báo thẳng, KHÔNG bịa từ/phiên âm.
 */
async function _ddOnllangToneLoad() {
  if (_ddOnllangTone) return _ddOnllangTone;
  try {
    // Qua API có kiểm quyền (2026-09-15) — xem _ddCultureLoad.
    _ddOnllangTone = await napGopTheoQuyen('/noi-dung/tone-hints');
  } catch (e) {
    _ddOnllangTone = {};
  }
  return _ddOnllangTone;
}

/** Mục này có phải "I. Phân biệt thanh điệu" không? (slug bài 1 không có số, bài 2+ có -N) */
function _ddOnllangLaThanhDieu(slug) {
  return /^i-phan-biet-thanh-dieu(-\d+)?$/.test(String(slug || ''));
}

/** Bấm 1 lựa chọn trắc nghiệm. single = chỉ giữ 1 lựa chọn (bấm lại để bỏ chọn); multiple = tích/bỏ tích độc lập. */
function ddOnllangChon(slug, qi, ai, isMultiple) {
  const st = _ddOnllangQuizState(slug);
  if (isMultiple) {
    const cur = Array.isArray(st.chon[qi]) ? st.chon[qi] : [];
    st.chon[qi] = cur.includes(ai) ? cur.filter((x) => x !== ai) : [...cur, ai];
  } else {
    st.chon[qi] = st.chon[qi] === ai ? undefined : ai;
  }
  // Chỉ đổi class trên DOM, KHÔNG render lại cả mục — render lại sẽ làm mất vị trí cuộn và
  // xoá trắng mọi ô textarea khác trong cùng mục đang được gõ dở.
  const box = document.querySelector(`.dd-onllang-question[data-qi="${qi}"][data-quiz="${slug}"]`);
  if (!box) return;
  const daChon = Array.isArray(st.chon[qi]) ? st.chon[qi] : (st.chon[qi] != null ? [st.chon[qi]] : []);
  box.querySelectorAll('.dd-onllang-opt').forEach((el, i) => el.classList.toggle('is-chon', daChon.includes(i)));
}

/**
 * Chọn 1 trong 4 tổ hợp thanh cho CẢ TỪ trong mục "Phân biệt thanh điệu" (bài 2-15).
 *
 * Trước đây bắt chọn thanh RIÊNG từng âm tiết (N ô trống rời trên trang gốc = N lượt bấm cho
 * 1 từ, từ 4 âm tiết là 4 lượt × 5 nút = rất khó bấm trên di động). Nay bấm 1 lần cho cả từ —
 * đổi lại là chấm điểm theo TỪ chứ không theo từng âm tiết nữa (xem _ddOnllangCham nhánh b),
 * hợp lý hơn về sư phạm: "đọc đúng cả từ" mới tính là biết, không phải may đúng từng nửa.
 * state: thanhWord[wi] = chỉ số lựa chọn đã bấm (0-3), khớp thứ tự trả về bởi
 * _ddOnllangToneCombos (deterministic, không đổi giữa các lần render).
 */
function ddOnllangThanhCombo(slug, wi, oi) {
  const st = _ddOnllangQuizState(slug);
  st.thanhWord[wi] = st.thanhWord[wi] === oi ? undefined : oi;   // bấm lại để bỏ chọn
  // Chỉ đổi class trên đúng từ đó, KHÔNG render lại cả mục (giữ vị trí cuộn + ô đang gõ dở).
  const box = document.querySelector(`.dd-tone-item[data-quiz="${slug}"][data-wi="${wi}"]`);
  if (!box) return;
  box.querySelectorAll('.dd-tone-opt--combo').forEach((el, i) => {
    el.classList.toggle('is-chon', i === st.thanhWord[wi]);
  });
}

/** Gõ vào ô điền (cloze/essay) — chỉ lưu state, KHÔNG render lại (giữ nguyên con trỏ đang gõ). */
function ddOnllangDien(slug, qi, value) {
  _ddOnllangQuizState(slug).dien[qi] = value;
}

/** Gõ vào MỘT ô trống rời của câu điền (cloze nhiều ô) — chỉ lưu state, không render lại. */
function ddOnllangODien(slug, qi, oi, value) {
  const st = _ddOnllangQuizState(slug);
  if (!st.o[qi]) st.o[qi] = {};
  st.o[qi][oi] = value;
}

/** Bấm vào một vế trái của bài ghép câu để "ngắm" nó, rồi mới chọn đáp án ở ngân hàng bên dưới. */
function ddOnllangGhepChon(slug, qi, promptIdx) {
  const st = _ddOnllangQuizState(slug);
  st.ghepChon[qi] = st.ghepChon[qi] === promptIdx ? undefined : promptIdx;
  _ddOnllangVeLaiGhep(slug, qi);
}

/** Vẽ lại đúng khối ghép câu (không đụng phần còn lại của trang). */
function _ddOnllangVeLaiGhep(slug, qi) {
  const st = _ddOnllangQuizState(slug);
  const box = document.querySelector(`.dd-onllang-question[data-quiz="${slug}"][data-qi="${qi}"]`);
  if (!box) return;
  const rows = [...box.querySelectorAll('.dd-onllang-match-row')];
  const dangChon = st.ghepChon[qi];
  rows.forEach((el, pi) => {
    el.classList.toggle('dang-chon', pi === dangChon);
    const slot = el.querySelector('.dd-onllang-match-slot');
    const v = (st.ghep[qi] || {})[pi];
    const bank = box.querySelectorAll('.dd-onllang-bank-opt');
    if (slot) {
      slot.textContent = v != null && bank[v] ? bank[v].textContent : 'bấm để chọn…';
      slot.classList.toggle('co', v != null);
    }
  });
  // Cập nhật dòng nhắc trong thanh sticky — nói rõ đang chọn đáp án cho vế nào, khỏi phải cuộn
  // lên nhìn lại đề (xem ghi chú ở chỗ render matchHtml).
  const hint = box.querySelector('.dd-onllang-bank-hint');
  if (hint) {
    const text = dangChon != null ? (rows[dangChon]?.querySelector('.dd-onllang-match-prompt')?.textContent || '') : '';
    hint.innerHTML = text
      ? `<i class="fa-solid fa-circle-check"></i> <span>Chọn đáp án cho: <b>${escHtml(text)}</b></span>`
      : `<i class="fa-solid fa-hand-pointer"></i> <span>Bấm một câu ở trên để chọn đáp án.</span>`;
  }
  const dung = new Set(Object.values(st.ghep[qi] || {}));
  box.querySelectorAll('.dd-onllang-bank-opt').forEach((el, wi) => {
    el.disabled = dangChon == null;
    el.classList.toggle('da-dung', dung.has(wi));
    el.setAttribute('onclick', `window.app.ddOnllangGhep('${slug}', ${qi}, ${dangChon}, ${wi})`);
  });
}

/** Chọn 1 câu trả lời cho vế trái đang ngắm ở dạng ghép câu (matrix_sort_answer). */
function ddOnllangGhep(slug, qi, promptIdx, sortWordIdx) {
  if (promptIdx == null) return;   // chưa ngắm vế trái nào
  const st = _ddOnllangQuizState(slug);
  if (!st.ghep[qi]) st.ghep[qi] = {};
  if (sortWordIdx < 0 || st.ghep[qi][promptIdx] === sortWordIdx) delete st.ghep[qi][promptIdx];
  else st.ghep[qi][promptIdx] = sortWordIdx;
  st.ghepChon[qi] = undefined;     // chọn xong thì thôi ngắm, mời chọn vế tiếp theo
  _ddOnllangVeLaiGhep(slug, qi);
}

/**
 * "Nộp toàn bộ bài" — MỘT nút cho cả 8-13 mục trong bài, không phải nộp riêng từng mục nữa
 * (bản trước có 1 nút "Nộp bài" mỗi mục, học viên phải bấm cả chục lần mới xong 1 bài).
 * Khoá lại + hiện gợi ý cho TẤT CẢ mục cùng lúc, chấm được hay không tuỳ câu: câu có trong
 * onllang-answers.json thì tô đúng/sai thật; câu không có (đa số là câu cần nghe audio) thì
 * nói thẳng "không xác định", không suy diễn/bịa — xem nguyên tắc ở đầu file này.
 */
/**
 * Chấm SƠ BỘ một bài tự luận.
 *
 * Tự luận không có đáp án đúng/sai nên KHÔNG chấm bằng cách so với bài mẫu. Chỉ kiểm hai thứ đề
 * bài nói rõ ràng: (1) có dùng đủ từ/cấu trúc đề yêu cầu không, (2) có đủ số chữ không.
 * Điểm này chỉ để học viên tự soi — **giáo viên mới là người cho điểm thật**, giao diện phải nói
 * rõ như vậy, đừng hiển thị như điểm chính thức.
 */
function _ddChamTuLuan(bai, cau) {
  const chu = String(bai || '').replace(/\s/g, '');
  const soChu = (chu.match(/[一-鿿]/g) || []).length || chu.length;
  const tuKhoa = cau.tuKhoa || [];
  const coTu = tuKhoa.filter((t) => String(bai || '').includes(t));
  const dat = { soChu, canChu: cau.soChu || 0, tuKhoa, coTu };
  if (!chu) return { ...dat, diem: 0, trong: true };
  const dTu = tuKhoa.length ? coTu.length / tuKhoa.length : 1;
  const dDai = cau.soChu ? Math.min(1, soChu / cau.soChu) : (soChu >= 20 ? 1 : soChu / 20);
  return { ...dat, diem: Math.round((dTu * 0.6 + dDai * 0.4) * 100), trong: false };
}

/**
 * Chấm bài "Luyện tập tổng hợp".
 *
 * Chỉ chấm những câu THẬT SỰ biết đáp án — tuyệt đối không suy diễn (nguyên tắc ở 4.21):
 *   · mục "Phân biệt thanh điệu": biết đủ đáp án cho cả 15 bài nhờ onllang-tone-hints.json;
 *   · các mục khác: chỉ câu nào có khoá trong onllang-answers.json (kind 'chon').
 * Câu cần NGHE audio không có đáp án -> KHÔNG tính vào mẫu số, để điểm không bị kéo xuống oan.
 *
 * `details` trả về theo dạng MẢNG PHẲNG {question, options, selected, correctIdx, explain} —
 * dạng này cả admin (_normalizeExerciseDetails) lẫn modal của học viên (reviewQuestions) đều
 * đọc được sẵn, nên giáo viên xem lại và nhận xét được y như bài giáo trình.
 */
function _ddOnllangCham(lessonNum, lesson, ans, toneHints) {
  const details = [];

  for (const quiz of lesson.quizzes) {
    if (!quiz.questions?.length) continue;
    const st = _ddOnllangQuizState(quiz.slug);
    const hints = _ddOnllangLaThanhDieu(quiz.slug) ? (toneHints || {})[String(lessonNum)] : null;

    quiz.questions.forEach((q, qi) => {
      if (_ddOnllangCauHong(q, quiz)) return;  // câu hỏng không vào mẫu số điểm
      const k = `${lessonNum}::${quiz.slug}::${qi}`;

      // (a) Thanh điệu dạng trắc nghiệm (bài 1): 1 câu = 1 từ, "Thanh N" là lựa chọn thứ N-1.
      if (hints && q.questionType === 'single' && hints[qi] && hints[qi].o.length === 1) {
        const h = hints[qi];
        const tone = h.tones[h.o[0]];
        if (tone >= 1 && tone <= (q.answers || []).length) {
          const chon = st.chon[qi];
          details.push({
            question: `${quiz.title} · ${h.hanzi} — thanh của âm "${h.syl[h.o[0]]}"`,
            options: (q.answers || []).map((a) => _ddOnllangCleanHtml(a.text).replace(/<[^>]+>/g, '').trim()),
            selected: typeof chon === 'number' ? chon : -1,
            correctIdx: tone - 1,
            explain: h.syl.map((sy, x) => _ddDatThanh(sy, h.tones[x])).join(''),
          });
        }
        return;
      }

      // (b) Thanh điệu dạng điền (bài 2-15): mỗi TỪ là một câu chấm riêng (đổi 2026-09-04 —
      //     trước đây mỗi ÂM TIẾT là 1 câu, nhưng giao diện giờ bắt chọn cả từ 1 lần nên chấm
      //     theo đúng đơn vị người học bấm: đúng cả từ mới tính đúng).
      if (hints && q.questionType === 'cloze_answer') {
        hints.forEach((h, wi) => {
          const combos = _ddOnllangToneCombos(h);
          const correctIdx = combos.findIndex((c) => c.dung);
          const chon = st.thanhWord[wi];
          details.push({
            question: `${quiz.title} · ${h.hanzi} — chọn cách đọc đúng`,
            options: combos.map((c) => c.label),
            selected: typeof chon === 'number' ? chon : -1,
            correctIdx,
            explain: combos[correctIdx].label,
          });
        });
        return;
      }

      // (c) Các mục khác: chỉ chấm câu có đáp án tham khảo dạng chọn, và chỉ khi 1 đáp án đúng
      //     (câu nhiều đáp án đúng chấm bằng so khớp tập hợp thì phức tạp, tạm bỏ qua).
      const dapAn = ans[k]?.kind === 'chon' ? ans[k].idx : null;
      if (dapAn && dapAn.length === 1 && q.questionType === 'single') {
        const chon = st.chon[qi];
        details.push({
          question: `${quiz.title} · Câu ${qi + 1}`,
          options: (q.answers || []).map((a) => _ddOnllangCleanHtml(a.text).replace(/<[^>]+>/g, '').trim()),
          selected: typeof chon === 'number' ? chon : -1,
          correctIdx: dapAn[0],
          explain: '',
        });
      }
    });
  }

  // Tự luận: KHÔNG tính vào điểm đúng/sai (không có đáp án đúng), nhưng vẫn phải gửi bài làm
  // lên để giáo viên chấm tay — nếu không thì học viên viết cả đoạn văn mà cô không thấy gì.
  // correctIdx = -1 nên nơi hiển thị tự biết là câu không chấm máy được.
  const tuLuan = [];
  for (const quiz of lesson.quizzes) {
    if (!quiz.questions?.length) continue;
    const st = _ddOnllangQuizState(quiz.slug);
    quiz.questions.forEach((q, qi) => {
      if (q.questionType !== 'essay') return;
      const a = ans[`${lessonNum}::${quiz.slug}::${qi}`];
      const bai = (st.dien[qi] || '').trim();
      if (!bai && !a) return;
      const kq = a?.kind === 'tuluan' ? _ddChamTuLuan(bai, a) : null;
      tuLuan.push({
        question: `${quiz.title} · Câu ${qi + 1} — TỰ LUẬN (giáo viên chấm)`,
        options: [],
        selected: -1,
        correctIdx: -1,
        explain: [
          `Bài làm: ${bai || '(chưa viết)'}`,
          kq ? `Tự chấm sơ bộ: ${kq.trong ? 'chưa viết' : kq.diem + '%'} — dùng đủ ${kq.coTu.length}/${kq.tuKhoa.length} từ yêu cầu, ${kq.soChu} chữ${kq.canChu ? `/${kq.canChu}` : ''}` : '',
          a?.goiY ? `Bài mẫu: ${a.goiY}` : '',
        ].filter(Boolean).join(' | '),
      });
    });
  }

  const dung = details.filter((d) => d.selected === d.correctIdx).length;
  return { details: [...details, ...tuLuan], tong: details.length, dung };
}

/**
 * "Nộp toàn bộ bài" — MỘT nút cho cả 8-13 mục trong bài.
 * Khoá lại + hiện đáp án cho TẤT CẢ mục cùng lúc, chấm điểm phần biết đáp án, rồi GỬI LÊN SERVER
 * để giáo viên xem lại và nhận xét được (cùng đường với bài giáo trình: POST /exercise/submit,
 * lesson_id dùng namespace `onllang:<số bài>` — xem CLAUDE.md mục 5 về các namespace lesson_id).
 */
async function ddOnllangNopTatCa() {
  const lessonNum = ddState.onllang.lessonId;
  const { lesson } = await _ddLuyenTapLoad(lessonNum);
  const body = document.getElementById('dd-onllang-body');
  if (!lesson || !body) return;

  ddState.onllang.daNopHet = true;
  for (const quiz of lesson.quizzes) {
    if (quiz.questions?.length) _ddOnllangQuizState(quiz.slug).nop = true;
  }

  const [{ ans }, toneHints] = await Promise.all([_ddLuyenTapLoad(lessonNum), _ddOnllangToneLoad()]);
  const kq = _ddOnllangCham(lessonNum, lesson, ans, toneHints);
  ddState.onllang.ketQua = kq;

  body.innerHTML = lesson.quizzes
    .map((quiz) => (quiz.questions?.length ? _ddOnllangRenderQuiz(lessonNum, quiz, ans, toneHints) : ''))
    .join('');

  const bar = document.getElementById('dd-onllang-submit-bar');
  if (bar) bar.outerHTML = _ddOnllangSubmitBarHtml();
  body.scrollIntoView({ block: 'start', behavior: 'smooth' });

  if (state.user && kq.tong > 0) {
    try {
      await api.post('/exercise/submit', {
        lesson_id: `onllang:${lessonNum}`,
        total_questions: kq.tong,
        correct_answers: kq.dung,
        time_seconds: 0,
        details: kq.details,
      });
    } catch (e) {
      console.warn('Không gửi được kết quả Luyện tập tổng hợp:', e);
    }
  }
}

/** Thanh nộp bài dưới cùng — 1 nút duy nhất cho cả bài, hoặc dòng xác nhận nếu đã nộp rồi. */
function _ddOnllangSubmitBarHtml() {
  if (!ddState.onllang.daNopHet) {
    return '<button class="dd-onllang-submit-btn" id="dd-onllang-submit-bar" onclick="window.app.ddOnllangNopTatCa()"><i class="fa-solid fa-paper-plane"></i> Nộp toàn bộ bài</button>';
  }
  const kq = ddState.onllang.ketQua;
  // Nói rõ mẫu số là "số câu chấm được", không phải tổng số câu của bài — nhiều câu phải nghe
  // audio mới biết đáp án, gộp vào là điểm sai.
  const diem = kq && kq.tong
    ? `<div class="dd-onllang-diem"><i class="fa-solid fa-clipboard-check"></i> <span>Đúng <b>${kq.dung}/${kq.tong}</b> câu chấm được (<b>${Math.round((kq.dung / kq.tong) * 100)}%</b>).
        ${state.user ? 'Kết quả đã gửi cho giáo viên.' : 'Đăng nhập để lưu kết quả và nhận nhận xét của giáo viên.'}</span></div>`
    : '';
  return `<div id="dd-onllang-submit-bar">${diem}<div class="dd-onllang-da-nop"><i class="fa-solid fa-circle-check"></i> Đã nộp toàn bộ bài — xem đáp án/gợi ý ngay dưới mỗi câu ở trên.</div></div>`;
}

/**
 * Render "Luyện tập tổng hợp" (nguồn onllang.com — CHỈ bài 1 có dữ liệu, xem CLAUDE.md).
 *
 * KHÔNG có bản "đáp án đúng" nào lấy được: onllang.com dùng plugin wpProQuiz, chấm điểm
 * hoàn toàn phía server — DOM lúc nghỉ không hề có thuộc tính data-correct/checked/value nào
 * chỉ ra lựa chọn đúng (đã kiểm chứng trực tiếp trên DOM khi đăng nhập, không phải đoán).
 * Vì vậy component này KHÔNG được tự vẽ ra đáp án đúng/sai — làm vậy là bịa dữ liệu và có
 * thể dạy sai cho học viên. Chỉ hiển thị đúng những gì lấy được thật: câu hỏi, audio, ảnh,
 * và với dạng ghép câu (matrix_sort) thì hiện danh sách vế trái + "ngân hàng" câu trả lời
 * bên phải để học viên tự ghép, không khẳng định cặp nào đúng.
 */
function _ddOnllangCleanHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  // Rác luôn đi kèm mỗi câu hỏi wpProQuiz: khung audio mejs không chạy được khi tách khỏi
  // trang gốc (thiếu JS của mediaelement.js), và các div/span trạng thái "Làm đúng!/Làm sai!"
  // vốn để display:none nhưng vẫn lọt vào khi trước đây lấy bằng .textContent.
  tmp.querySelectorAll(
    '.mejs-container, .mejs-audio, .mejs-offscreen, .wpProQuiz_correct, .wpProQuiz_incorrect, ' +
    '.wpProQuiz_AnswerMessage, .screen-reader-text, script, style, iframe, form, button'
  ).forEach((n) => n.remove());
  tmp.querySelectorAll('*').forEach((n) => {
    [...n.attributes].forEach((a) => { if (/^on/i.test(a.name)) n.removeAttribute(a.name); });
    // http:// -> https://: trang app chạy https, tải ảnh/audio qua http dễ bị trình duyệt chặn.
    if ((n.tagName === 'IMG' || n.tagName === 'SOURCE' || n.tagName === 'AUDIO') && n.src) {
      n.setAttribute('src', n.getAttribute('src').replace(/^http:\/\//, 'https://'));
    }
  });
  return tmp.innerHTML.trim();
}

const _ddOnllangHttps = (u) => assetUrl((u || '').replace(/^http:\/\//, 'https://'));

/**
 * Đoạn văn / hướng dẫn lấy từ khối "Content" của trang bài học LearnDash (nằm NGOÀI widget
 * quiz, TRƯỚC nó — xem CLAUDE.md 4.21 "Câu điền có THÂN BÀI riêng"). Giữ nguyên HTML gốc
 * (kể cả <details><summary>Dịch</summary> — trình duyệt tự bung được, không cần thêm code),
 * chỉ đổi src ảnh http-> https và chặn script/style phòng xa (dữ liệu lấy từ trang ngoài).
 */
function _ddOnllangPassageHtml(raw) {
  if (!raw) return '';
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/src="http:\/\//g, 'src="https://');
}

/** Vế trái của câu ghép hội thoại — text gốc dính rác "N. ... Làm đúng! Làm sai! Đáp án" vì
 *  trang gốc để 3 dòng trạng thái ẩn NGAY TRONG cùng thẻ, .textContent gom luôn cả 3 dòng đó.
 *  Không có DOM để dọn (dữ liệu đã phẳng thành chuỗi lúc lấy) nên phải cắt bằng chuỗi. */
function _ddOnllangCleanPrompt(text) {
  return String(text || '').replace(/\s*Làm đúng!\s*Làm sai!\s*Đáp án\s*$/u, '').trim();
}

/** Render màn hình Luyện tập tổng hợp (Onllang) */
/**
 * Dựng HTML của MỘT mục (quiz) — dùng cả lúc render lần đầu và lúc "Nộp bài" (chỉ mục đó
 * outerHTML lại, các mục khác trong bài giữ nguyên state). `ans` = onllang-answers.json.
 */
// Vị trí đặt dấu thanh trong 1 âm tiết pinyin: có "a" thì trên a; không thì trên "o"/"e";
// còn lại đặt trên nguyên âm CUỐI (đúng cho iu -> iù, ui -> uì).
const _PY_NGUYEN_AM = 'aoeiuü';
function _ddDatThanh(syl, tone) {
  if (!tone) return syl;                       // thanh nhẹ: không dấu
  const bang = {
    a: 'āáǎà', o: 'ōóǒò', e: 'ēéěè',
    i: 'īíǐì', u: 'ūúǔù', 'ü': 'ǖǘǚǜ',
  };
  let vt = syl.indexOf('a');
  if (vt < 0) vt = syl.indexOf('o');
  if (vt < 0) vt = syl.indexOf('e');
  if (vt < 0) for (let i = syl.length - 1; i >= 0; i--) {
    if (_PY_NGUYEN_AM.includes(syl[i])) { vt = i; break; }
  }
  if (vt < 0) return syl;
  const bo = bang[syl[vt]];
  return bo ? syl.slice(0, vt) + bo[tone - 1] + syl.slice(vt + 1) : syl;
}

/**
 * Phiên âm 1 từ của mục "Phân biệt thanh điệu", để trống đúng những âm tiết đề bài hỏi.
 *
 * Đề gốc chỉ đưa chữ Hán trần rồi hỏi "thanh mấy?" — nhìn vào không biết đang hỏi âm tiết nào
 * (歡迎 huānyíng có 2 thanh khác nhau). Ở đây tái hiện đúng bảng đề in trên trang gốc: âm tiết
 * KHÔNG hỏi thì in sẵn dấu, âm tiết PHẢI ĐIỀN thì để trần + làm mờ + gạch chân. Nộp bài rồi
 * mới hiện đủ dấu.
 *
 * @param {{syl: string[], tones: number[], o: number[]}} h  1 từ trong onllang-tone-hints.json
 * @param {boolean} daNop
 */
function _ddOnllangPyHtml(h, daNop) {
  const html = h.syl.map((sy, i) => {
    const phaiDien = h.o.includes(i);
    if (daNop || !phaiDien) {
      const chu = escHtml(_ddDatThanh(sy, h.tones[i]));
      return phaiDien ? `<span class="dd-tone-blank is-hien">${chu}</span>` : escHtml(chu);
    }
    return `<span class="dd-tone-blank">${escHtml(sy)}</span>`;
  }).join('');
  return `<span class="dd-tone-py">${html}</span>`;
}

/**
 * Nhãn cho biết đáp án ở đâu ra. BẮT BUỘC phân biệt 2 nguồn:
 *   · onllang-review = server trang gốc chấm -> chắc chắn đúng, không cần chú thích.
 *   · ai-soan        = hệ thống tự suy ra, CHƯA có giáo viên xác nhận -> phải nói rõ để học viên
 *                      không tin tuyệt đối (danh sách ở md/dap-an-can-xac-nhan.md).
 */
function _ddNguonHtml(a) {
  // Giao diện KHÔNG phân biệt nguồn đáp án nữa (2026-09-15): với học viên, đáp án là đáp án.
  // Trường `nguon` trong dữ liệu vẫn giữ để đội biên soạn biết chỗ nào cần rà lại.
  return '';
}

/** Đáp án dạng chữ cho 1 từ, hiện sau khi nộp: "kè (4) · qì (4)" */
function _ddOnllangDapAnHtml(h) {
  return h.o.map((i) => `${escHtml(_ddDatThanh(h.syl[i], h.tones[i]))} <b>${h.tones[i] || 'nhẹ'}</b>`).join(' · ');
}

/**
 * Sinh 4 lựa chọn GHÉP SẴN cho 1 từ của mục "Phân biệt thanh điệu" — thay vì bắt chọn thanh
 * riêng từng âm tiết (trước đây 1 từ 2 âm = 2 hàng × 5 nút = 10 nút, từ 3-4 âm còn nhiều hơn,
 * rất khó bấm). Mỗi lựa chọn là CẢ TỪ đọc theo 1 tổ hợp thanh, bấm 1 phát là xong cả từ.
 *
 * Tạo bằng offset thanh CỐ ĐỊNH (0/1/2/3, cộng modulo 5 vào từng thanh đúng) thay vì random —
 * để 4 lựa chọn LUÔN giống nhau qua các lần render (đổi tab, F5 mở lại bài đang làm dở) mà
 * không cần lưu thêm state nào. offset 0 luôn là combo đúng; thứ tự hiển thị xáo theo hash của
 * chính chữ Hán (deterministic) để đáp án đúng không luôn nằm ở vị trí đầu.
 *
 * @returns {{tones:number[], label:string, dung:boolean}[]}  luôn đúng 4 phần tử, đúng 1 dung.
 */
function _ddOnllangToneCombos(h) {
  const combos = [0, 1, 2, 3].map((off) => {
    const tones = h.o.map((si) => (h.tones[si] + off) % 5);
    const label = h.syl.map((sy, i) => {
      const j = h.o.indexOf(i);
      return _ddDatThanh(sy, j >= 0 ? tones[j] : h.tones[i]);
    }).join('');
    return { tones, label, dung: off === 0 };
  });
  const seed = [...h.hanzi].reduce((sum, c) => sum + c.codePointAt(0), 0);
  const order = [0, 1, 2, 3];
  for (let i = order.length - 1; i > 0; i--) {
    const j = (seed + i * 7) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((idx) => combos[idx]);
}

/**
 * Câu HỎNG của bộ bóc dữ liệu — không render, không tính vào điểm (2026-09-15).
 *
 * Hai dạng, đều do bộ bóc nguồn lấy thiếu chứ không phải đề gốc sai:
 *   1. Ghép cặp mà mất vế trái hoặc mất ngân hàng -> không có gì để ghép.
 *   2. "Lựa chọn" thực chất là LỜI THOẠI bài nghe (`男：…` `女：…` `Q：…`) bị trộn vào ô đáp án
 *      khi bóc .docx của đề MTC — học viên bấm được nhưng nội dung vô nghĩa.
 *
 * ⚠️ Mẫu cố ý rất HẸP (bắt 14/6.468 câu = 0,2%). Đã thử thêm dấu hiệu "mọi lựa chọn giống
 * nhau" và phải BỎ: nó bắt nhầm câu SẮP XẾP ẢNH, nơi text chỉ là chuỗi rác accessibility
 * ("Reorder Move up…") còn nội dung thật nằm trong ảnh (xem 4.21). Nới mẫu là mất câu tốt.
 *
 * Chỉ bỏ qua lúc RENDER/CHẤM, KHÔNG lọc khỏi mảng: đáp án tra theo CHỈ SỐ câu, cắt phần tử
 * là lệch toàn bộ đáp án của mục đó (bài học 4.28).
 */
function _ddOnllangCauHong(q, quiz) {
  if (!q) return false;
  const sach = (t) => String(t || '').replace(/<[^>]+>/g, '').replace(/Làm đúng!|Làm sai!|Đáp án|&nbsp;/g, '').trim();
  const coAnh = (q.imgSrcs || []).length || (q.answers || []).some((a) => /<img/i.test(a.text || ''));
  const lc = (q.answers || []).map((a) => sach(a.text)).filter(Boolean);
  if (q.questionType === 'matrix_sort_answer' && (!(q.sortWords || []).length || !lc.length)) return true;
  if (!coAnh && lc.length && lc.every((x) => /^[男女]：|^Q：/.test(x))) return true;

  // (c) CÂU MẤT NỘI DUNG — thêm 20/09/2026 sau khi học viên báo bị chấm sai.
  // 14 câu (12 của đề MTC, 2 của đề tự sinh) chỉ còn lại dòng hướng dẫn tiếng Anh hoặc mấy ô
  // trống: "Fill in the blank with the correct answer." · "Example：" · "3. ＿＿＿⋯⋯，＿＿＿⋯⋯".
  // Phần cần đọc để trả lời (câu có chỗ trống, đoạn văn, bài nghe) rơi mất lúc bóc .docx, còn
  // "lựa chọn" thì thực ra là các CÂU HỎI KHÁC của mục hoặc là từng dòng của bài đọc. Chúng
  // vẫn CÓ đáp án nên vẫn được chấm — học viên không thể nào trả lời đúng mà vẫn bị trừ điểm.
  // Ẩn hẳn thay vì sửa liều: không có nguồn nào dựng lại được phần đã mất.
  if (q.questionType === 'single' && !coAnh && !q.audioSrc && !(quiz && quiz.quizAudio)) {
    const han = /[\u4e00-\u9fff]/;
    const coChuHan = han.test(sach(q.questionText)) || han.test(sach(q.clozeText))
      || han.test(sach(quiz && quiz.passageHtml));
    // `<b>` là chỗ đề tự sinh đặt THUẬT NGỮ cần hỏi — "2. <b>BBC</b> (BBC)" không có chữ Hán
    // nhưng vẫn trả lời được, đừng ẩn nhầm.
    const coThuatNgu = /<b>\s*\S[\s\S]*?<\/b>/.test(String(q.questionText || ''));
    if (!coChuHan && !coThuatNgu) return true;
  }
  return false;
}

function _ddOnllangRenderQuiz(lessonNum, quiz, ans, toneHints) {
  const st = _ddOnllangQuizState(quiz.slug);
  const key = (qi) => `${lessonNum}::${quiz.slug}::${qi}`;

  const quizAudioHtml = quiz.quizAudio ? `
    <div class="dd-onllang-audio dd-onllang-audio--quiz">
      <audio controls preload="none"><source src="${_ddOnllangHttps(quiz.quizAudio)}" type="audio/mpeg"></audio>
    </div>` : '';

  // Mục "I. Phân biệt thanh điệu": giữ NGUYÊN bài tập gốc (trắc nghiệm 4 thanh ở bài 1,
  // ô điền số ở bài 2+), chỉ bổ sung phiên âm + làm mờ chữ mang thanh cần điền.
  // Đừng thay bằng giao diện tự chế — đã thử và bị yêu cầu hoàn nguyên (2026-09-03).
  const toneHint = _ddOnllangLaThanhDieu(quiz.slug) ? (toneHints || {})[String(lessonNum)] : null;

  let questionsHtml = '';
  quiz.questions.forEach((q, qi) => {
    if (_ddOnllangCauHong(q, quiz)) return;    // câu hỏng: không hiện, nhưng qi vẫn giữ nguyên
    const qText = _ddOnllangCleanHtml(q.questionText || '');
    const k = key(qi);

    // Bài 1: mỗi câu là 1 từ -> gắn phiên âm ngay cạnh chữ Hán của đúng câu đó.
    const hint = toneHint && q.questionType === 'single' ? toneHint[qi] : null;
    const pyHtml = hint ? `<div class="dd-tone-line">${_ddOnllangPyHtml(hint, st.nop)}</div>` : '';

    // Bài 2+: cả mục bị gộp thành 1 câu điền -> danh sách từ mất sạch khi thu dữ liệu, dựng lại
    // bảng tra cứu (số thứ tự + chữ Hán + phiên âm có ô trống) ngay trên ô điền để còn biết
    // đang điền thanh cho từ nào, ở âm tiết nào.
    // Mỗi từ chỉ 1 hàng 4 NÚT — mỗi nút là CẢ TỪ đọc theo 1 tổ hợp thanh (xem
    // _ddOnllangToneCombos). Trước đây bắt chọn thanh RIÊNG từng âm tiết (từ 2 âm = 10 nút,
    // từ 4 âm = 20 nút) — quá nhiều cú bấm cho 1 từ. Giờ bấm 1 phát là xong cả từ (2026-09-04,
    // theo yêu cầu "ghép 2 âm tiết trong 1 đáp án luôn").
    const dsHtml = (toneHint && q.questionType === 'cloze_answer')
      ? `<div class="dd-tone-list">${toneHint.map((h, wi) => {
          const combos = _ddOnllangToneCombos(h);
          const chonIdx = st.thanhWord[wi];
          const nut = combos.map((c, oi) => {
            let cls = chonIdx === oi ? 'is-chon' : '';
            if (st.nop) {
              if (c.dung) cls += ' is-dapan';
              else if (chonIdx === oi) cls += ' is-sai';
            }
            return `<button class="dd-tone-opt dd-tone-opt--combo ${cls.trim()}" ${st.nop ? 'disabled' : ''}
              onclick="window.app.ddOnllangThanhCombo('${quiz.slug}', ${wi}, ${oi})">${escHtml(c.label)}</button>`;
          }).join('');
          return `
          <div class="dd-tone-item" data-quiz="${quiz.slug}" data-wi="${wi}">
            <div class="dd-tone-head">
              <span class="dd-tone-num">${wi + 1}</span>
              <span class="dd-tone-hanzi font-tc">${escHtml(H(h.hanzi))}</span>
              ${_ddOnllangPyHtml(h, st.nop)}
              ${st.nop ? `<span class="dd-tone-dap">${_ddOnllangDapAnHtml(h)}</span>` : ''}
            </div>
            <div class="dd-tone-picks">${nut}</div>
          </div>`;
        }).join('')}</div>`
      : '';

    const audioHtml = (q.audioSrc && !/<audio\b/i.test(qText)) ? `
      <div class="dd-onllang-audio">
        <audio controls preload="none"><source src="${_ddOnllangHttps(q.audioSrc)}" type="audio/mpeg"></audio>
      </div>` : '';
    const imgHtml = (Array.isArray(q.imgSrcs) && q.imgSrcs.length && !/<img\b/i.test(qText))
      ? `<div class="dd-onllang-img">${q.imgSrcs.map(src => `<img src="${_ddOnllangHttps(src)}" alt="Hình minh hoạ câu hỏi">`).join('')}</div>`
      : '';

    // Ghép câu (matrix_sort_answer): mỗi vế trái hiện cả "ngân hàng" đáp án dạng nút bấm.
    // Câu dạng vế trái toàn ẢNH (không có prompts) thì không tương tác được — chỉ hiện tham khảo.
    let matchHtml = '';
    if (q.questionType === 'matrix_sort_answer') {
      const prompts = (q.answers || [])
        .map(a => _ddOnllangCleanPrompt(a.text))
        .filter(t => t && !/^\d+\.?$/.test(t));
      const coTuongTac = prompts.length > 0 && Array.isArray(q.sortWords) && q.sortWords.length > 0;
      const dapAnGhep = ans[k]?.kind === 'ghep' ? ans[k].dapAn : null;
      if (coTuongTac) {
        const gState = st.ghep[qi] || {};
        const dangChon = st.ghepChon[qi];
        // Ngân hàng đáp án hiện MỘT LẦN ở dưới, không lặp lại dưới từng vế trái (bản trước lặp
        // 8 nút × 5 vế = 40 nút giống hệt nhau, rối mắt). Cách dùng: bấm vế trái -> bấm đáp án.
        matchHtml = `<div class="dd-onllang-match-list">${prompts.map((t, pi) => {
          const daChon = gState[pi];
          const dung = dapAnGhep ? dapAnGhep[pi] : null;
          let cls = dangChon === pi ? 'dang-chon' : '';
          if (st.nop && dung != null) cls += daChon === dung ? ' is-dung' : (daChon != null ? ' is-sai' : '');
          return `
          <div class="dd-onllang-match-row ${cls.trim()}" data-quiz="${quiz.slug}" data-qi="${qi}" data-pi="${pi}"
            ${st.nop ? '' : `onclick="window.app.ddOnllangGhepChon('${quiz.slug}', ${qi}, ${pi})"`}>
            <span class="dd-onllang-match-num">${pi + 1}</span>
            <span class="dd-onllang-match-prompt">${t}</span>
            <span class="dd-onllang-match-slot ${daChon != null ? 'co' : ''}">${daChon != null ? q.sortWords[daChon] : 'bấm để chọn…'}</span>
            ${st.nop && dung != null && daChon !== dung ? `<span class="dd-onllang-match-dap">${q.sortWords[dung]}</span>` : ''}
          </div>`;
        }).join('')}</div>`;

        if (!st.nop) {
          const daDung = new Set(Object.values(gState));
          // Ngân hàng đáp án đặt trong 1 THANH STICKY dính đáy màn hình — trước đây nằm trần ở
          // cuối khối, câu nào nhiều vế trái (7-8 vế) là phải cuộn xuống tận cùng mới thấy được
          // ngân hàng, chọn xong lại cuộn lên xem vế tiếp theo, rất mất công (2026-09-04, theo
          // phản hồi "phải kéo xuống dưới mới xem được đáp án"). Thanh này còn nhắc luôn đang
          // chọn cho vế nào, khỏi phải cuộn lên nhìn lại đề.
          const dangChonText = dangChon != null ? escHtml(prompts[dangChon]) : null;
          matchHtml += `
            <div class="dd-onllang-bank-bar">
              <div class="dd-onllang-bank-hint">
                ${dangChonText
                  ? `<i class="fa-solid fa-circle-check"></i> <span>Chọn đáp án cho: <b>${dangChonText}</b></span>`
                  : `<i class="fa-solid fa-hand-pointer"></i> <span>Bấm một câu ở trên để chọn đáp án.</span>`}
              </div>
              <div class="dd-onllang-bank">${q.sortWords.map((w, wi) => `
                <button class="dd-onllang-bank-opt ${daDung.has(wi) ? 'da-dung' : ''}" ${dangChon == null ? 'disabled' : ''}
                  onclick="window.app.ddOnllangGhep('${quiz.slug}', ${qi}, ${dangChon}, ${wi})">${w}</button>`).join('')}</div>
            </div>`;
        }
        if (st.nop && dapAnGhep) matchHtml += _ddNguonHtml(ans[k]);
        if (st.nop && !dapAnGhep) matchHtml += `<div class="dd-onllang-noans"><i class="fa-solid fa-user-pen"></i> <span>Câu này do giáo viên chấm.</span></div>`;
      } else {
        if (prompts.length) matchHtml += `<ul class="dd-onllang-match-prompts">${prompts.map(t => `<li>${t}</li>`).join('')}</ul>`;
        if (Array.isArray(q.sortWords) && q.sortWords.length) {
          matchHtml += `
            <div class="dd-onllang-match-hint"><i class="fa-solid fa-shuffle"></i> <span>Ngân hàng câu trả lời (xáo trộn):</span></div>
            <div class="dd-onllang-sort-answer">${q.sortWords.map(w => `<span class="dd-onllang-sort-word">${w}</span>`).join('')}</div>`;
        }
      }
    }

    // Trắc nghiệm (single 1 đáp án / multiple nhiều đáp án): bấm để chọn, tô đúng/sai SAU KHI
    // nộp CHỈ khi có đáp án tham khảo (ans[k].kind === 'chon') — không có thì nói thẳng.
    let optsHtml = '';
    if ((q.questionType === 'single' || q.questionType === 'multiple') && q.answers && q.answers.length) {
      const daChonRaw = st.chon[qi];
      const daChon = Array.isArray(daChonRaw) ? daChonRaw : (daChonRaw != null ? [daChonRaw] : []);
      // Mục thanh điệu: đáp án suy thẳng từ onllang-tone-hints.json (số liệu thật lấy từ sách
      // bài tập) — "Thanh N" là lựa chọn thứ N-1. Nhờ vậy không phải chép tay vào
      // onllang-answers.json, và thu thêm bài mới là tự chấm được ngay.
      // Chỉ chấm được khi câu hỏi để trống ĐÚNG 1 âm tiết (bài 1) — "Thanh N" là lựa chọn thứ N-1.
      // Thanh nhẹ (0) không có trong 4 lựa chọn nên bỏ qua, không ép về lựa chọn nào.
      const thanhDung = hint && hint.o.length === 1 ? hint.tones[hint.o[0]] : null;
      const dapAnThanh = thanhDung >= 1 && thanhDung <= q.answers.length ? [thanhDung - 1] : null;
      const dapAnDung = dapAnThanh || (ans[k]?.kind === 'chon' ? ans[k].idx : null);
      optsHtml = `<div class="dd-onllang-opts">${q.answers.map((a, ai) => {
        const chon = daChon.includes(ai);
        let cls = chon ? 'is-chon' : '';
        if (st.nop && dapAnDung) {
          if (dapAnDung.includes(ai)) cls += ' is-dung';
          else if (chon) cls += ' is-sai';
        }
        const clickAttr = st.nop ? '' : `onclick="window.app.ddOnllangChon('${quiz.slug}', ${qi}, ${ai}, ${q.questionType === 'multiple'})"`;
        return `
          <div class="dd-onllang-opt ${cls.trim()}" ${clickAttr}>
            <span class="dd-onllang-opt-letter">${'ABCD'[ai] || (ai + 1)}</span>
            <span class="dd-onllang-opt-text">${_ddOnllangCleanHtml(a.text)}</span>
            ${st.nop && dapAnDung?.includes(ai) ? '<i class="fa-solid fa-circle-check dd-onllang-opt-mark"></i>' : ''}
          </div>`;
      }).join('')}</div>`;
      if (st.nop && dapAnDung) optsHtml += _ddNguonHtml(ans[k]);
      if (st.nop && !dapAnDung) optsHtml += `<div class="dd-onllang-noans"><i class="fa-solid fa-user-pen"></i> <span>Câu này do giáo viên chấm.</span></div>`;
    }

    // Điền tự do (cloze_answer / essay): 1 ô văn bản dài mỗi câu — dữ liệu gốc không cho biết
    // số ô trống / vị trí, nên không cố tách nhiều ô nhỏ theo đúng chỗ trống gốc.
    // Câu điền có THÂN BÀI riêng (clozeText do scraper bóc từ .wpProQuiz_questionList — xem 4.21):
    // ví dụ mục "VIII. Hoàn thành hội thoại" là cả đoạn hội thoại A/B kèm gợi ý trong ngoặc.
    // Trước đây chỉ vẽ questionText (chỉ có mấy dòng hướng dẫn) nên học viên thấy ô điền trống trơn,
    // không biết phải hoàn thành câu nào.
    let cloHtml = '';
    if (q.questionType === 'cloze_answer' && q.clozeText && !dsHtml) {
      const oVal = st.o[qi] || {};
      const dapAn = ans[k]?.kind === 'dien-nhieu' ? ans[k].o : null;
      let oi = -1;
      const than = escHtml(q.clozeText)
        .split('{}')
        .reduce((acc, phan, i, mang) => {
          acc += phan.replace(/\n/g, '<br>');
          if (i < mang.length - 1) {
            oi += 1;
            const v = oVal[oi] || '';
            const dung = dapAn && dapAn[oi];
            acc += `<input class="dd-onllang-o" type="text" value="${escHtml(v)}" ${st.nop ? 'disabled' : ''}
              placeholder="…" oninput="window.app.ddOnllangODien('${quiz.slug}', ${qi}, ${oi}, this.value)">`;
            if (st.nop && dung) acc += `<span class="dd-onllang-o-dap">${escHtml(dung)}</span>`;
          }
          return acc;
        }, '');
      cloHtml = `<div class="dd-onllang-cloze font-tc">${H(than)}</div>`;
      if (st.nop && dapAn) cloHtml += _ddNguonHtml(ans[k]);
      if (st.nop && !dapAn) cloHtml += `<div class="dd-onllang-noans"><i class="fa-solid fa-user-pen"></i> <span>Câu này do giáo viên chấm.</span></div>`;
    }

    let dienHtml = '';
    // Mục thanh điệu có ô chọn riêng (dsHtml), câu có thân bài riêng đã có ô điền tại chỗ (cloHtml)
    // -> cả hai trường hợp không cần ô văn bản chung nữa.
    if ((q.questionType === 'cloze_answer' || q.questionType === 'essay') && !dsHtml && !cloHtml) {
      const giaTri = st.dien[qi] || '';
      dienHtml = `<textarea class="dd-onllang-textarea" rows="2" placeholder="Viết câu trả lời của bạn..."
        ${st.nop ? 'disabled' : ''} oninput="window.app.ddOnllangDien('${quiz.slug}', ${qi}, this.value)">${escHtml(giaTri)}</textarea>`;
      if (st.nop) {
        const tl = ans[k]?.kind === 'tuluan' ? ans[k] : null;
        if (q.questionType === 'essay' && tl) {
          const kqTL = _ddChamTuLuan(st.dien[qi] || '', tl);
          dienHtml += `
            <div class="dd-onllang-tuluan">
              <div class="dd-tl-diem"><i class="fa-solid fa-gauge"></i> <span>Điểm sơ bộ: <b>${kqTL.trong ? 'chưa viết' : kqTL.diem + '%'}</b> — giáo viên sẽ chấm và cho điểm cuối.</span></div>
              ${tl.tuKhoa?.length ? `<div class="dd-tl-tu"><span class="dd-tl-nhan">Từ/cấu trúc cần dùng:</span>${tl.tuKhoa.map((t) => `<span class="dd-tl-chip ${kqTL.coTu.includes(t) ? 'co' : ''}">${escHtml(t)}</span>`).join('')}</div>` : ''}
              <div class="dd-tl-dai"><i class="fa-solid fa-ruler"></i> <span>Đã viết <b>${kqTL.soChu}</b> chữ${kqTL.canChu ? ` / cần tối thiểu <b>${kqTL.canChu}</b>` : ''}.</span></div>
              <div class="dd-onllang-goiy"><i class="fa-solid fa-lightbulb"></i> <span><b>Bài mẫu để đối chiếu:</b> <span class="font-tc">${escHtml(H(tl.goiY))}</span></span></div>
              ${_ddNguonHtml(ans[k])}
            </div>`;
        } else if (q.questionType === 'essay') {
          dienHtml += `<div class="dd-onllang-goiy dd-onllang-goiy--essay"><i class="fa-solid fa-pen-nib"></i> <span>Bài tự luận — không có đáp án mẫu cố định, giáo viên chấm theo nội dung bạn viết.</span></div>`;
        } else {
          const goiY = ans[k]?.kind === 'dien' ? ans[k].dapAn : null;
          dienHtml += goiY
            ? `<div class="dd-onllang-goiy"><i class="fa-solid fa-lightbulb"></i> <span>Đáp án tham khảo: <b class="font-tc">${escHtml(H(goiY))}</b></span></div>`
            : `<div class="dd-onllang-noans"><i class="fa-solid fa-user-pen"></i> <span>Câu này do giáo viên chấm.</span></div>`;
        }
      }
    }

    // "sort_answer" — 100% các câu đều cần NGHE để biết thứ tự đúng, không có gì tương tác
    // được ngoài xem ảnh; giữ nguyên dạng xem tham khảo như trước.
    let sortImgHtml = '';
    if (q.questionType === 'sort_answer' && q.answers && q.answers.length) {
      const anh = q.answers
        .map((a) => (String(a.text || '').match(/<img[^>]*src="([^"]+)"/) || [])[1])
        .filter(Boolean);
      if (anh.length) {
        sortImgHtml = `
          <div class="dd-onllang-match-hint"><i class="fa-solid fa-shuffle"></i> <span>Ảnh đã xáo trộn — nghe audio rồi tự sắp lại đúng thứ tự:</span></div>
          <div class="dd-onllang-sort-imgs">${anh.map((src) => `<img src="${_ddOnllangHttps(src)}" alt="Ảnh cần sắp xếp">`).join('')}</div>`;
      }
    }

    const trong = !qText && !audioHtml && !imgHtml && !matchHtml && !optsHtml && !dienHtml && !sortImgHtml && !pyHtml && !dsHtml && !cloHtml;

    questionsHtml += `
      <div class="dd-onllang-question" data-quiz="${quiz.slug}" data-qi="${qi}">
        <div class="dd-onllang-q-num">Câu ${qi + 1}</div>
        ${audioHtml}
        ${imgHtml}
        ${qText ? `<div class="dd-onllang-q-text font-tc">${H(qText)}</div>` : ''}
        ${pyHtml}
        ${dsHtml}
        ${cloHtml}
        ${matchHtml}
        ${optsHtml}
        ${dienHtml}
        ${sortImgHtml}
        ${trong ? '<div class="dd-onllang-q-hint">Nghe file audio ở trên rồi tự viết lại bằng chữ Hán.</div>' : ''}
      </div>`;
  });

  const passageHtml = quiz.passageHtml ? _ddOnllangPassageHtml(quiz.passageHtml) : '';

  if (!questionsHtml && !quizAudioHtml && !passageHtml) return '';

  // KHÔNG còn nút "Nộp bài" riêng từng mục — chỉ 1 nút "Nộp toàn bộ bài" ở cuối cả bài
  // (xem ddOnllangNopTatCa). Mỗi mục chỉ tự hiện 1 dòng nhỏ báo đã chấm khi bài đã nộp.
  return `
    <div class="dd-onllang-section" id="dd-onllang-quiz-${quiz.slug}">
      <div class="dd-onllang-section-title">
        <i class="fa-solid fa-chevron-right"></i>
        ${quiz.title}
      </div>
      ${passageHtml ? `<div class="dd-onllang-passage font-tc">${H(passageHtml)}</div>` : ''}
      ${quizAudioHtml}
      <div class="dd-onllang-questions">${questionsHtml}</div>
    </div>`;
}

/** Mở "Luyện tập tổng hợp" — có URL riêng (segs[2]='luyen-tap-tong-hop') để Back/share được. */
function ddOnllangOpenView() {
  ddState.onllang.open = true;
  updateUrl({ push: true });
  ddRenderOnllangEx(document.getElementById('dd-tab-content'));
}

/** Quay lại màn giới thiệu tab Bài tập — URL trở lại không segs[2]. */
function ddOnllangBackToIdle() {
  ddState.onllang.open = false;
  updateUrl({ push: true });
  ddRenderExercise(document.getElementById('dd-tab-content'));
}

async function ddRenderOnllangEx(el) {
  const lessonId = ddState.selectedSub; // e.g. '1.2', '5.2'
  const sub = TB().subs.find(s => s.id === lessonId);
  const lessonNum = ddParentKey(lessonId); // khoá bài cha: '5' (quyển 1) / '2-5' (quyển 2-4)

  el.innerHTML = `
    <div class="dd-onllang-loading">
      <i class="fa-solid fa-spinner fa-spin"></i>
      <p>Đang tải luyện tập tổng hợp...</p>
    </div>`;

  const [{ lesson, ans }, toneHints] = await Promise.all([_ddLuyenTapLoad(lessonNum), _ddOnllangToneLoad()]);

  if (!lesson || !lesson.quizzes || lesson.quizzes.length === 0) {
    el.innerHTML = `
      <div class="dd-ex2-unavailable">
        <i class="fa-solid fa-headphones"></i>
        <p>Chưa có luyện tập tổng hợp cho <strong>${tbLabel(lessonId)}</strong></p>
        <span>${lesson && lesson.error === 'not-accessible'
          ? 'Bài này nằm sau khoá học trả phí trên trang gốc, chưa lấy được nội dung.'
          : 'Nội dung sẽ được cập nhật sớm.'}</span>
        <button class="dd-ex-start-btn" style="margin-top:16px" onclick="window.app.ddOnllangBack()">
          <i class="fa-solid fa-arrow-left"></i> Quay lại
        </button>
      </div>`;
    return;
  }

  // Đổi bài -> xoá trạng thái làm bài của bài cũ (chọn/điền/đã nộp), tránh mang state bài này
  // sang bài khác nếu học viên bấm "Quay lại" rồi mở bài tiếp theo.
  if (ddState.onllang.lessonId !== lessonNum) {
    ddState.onllang.lessonId = lessonNum;
    ddState.onllang.quiz = {};
    ddState.onllang.daNopHet = false;
    ddState.onllang.ketQua = null;
  }

  const quizzesHtml = lesson.quizzes.map((quiz) => {
    if (!quiz.questions || quiz.questions.length === 0) return '';
    return _ddOnllangRenderQuiz(lessonNum, quiz, ans, toneHints);
  }).join('');

  const totalQ = lesson.quizzes.reduce((s, q) => s + (q.questions?.length || 0), 0);
  el.innerHTML = `
    <div class="dd-onllang-container">
      <div class="dd-onllang-toolbar">
        <button class="dd-onllang-back-btn" onclick="window.app.ddOnllangBack()">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div class="dd-onllang-toolbar-title">
          <i class="fa-solid fa-headphones-simple"></i>
          Luyện tập tổng hợp — ${sub?.title || lessonId}
        </div>
        <div class="dd-onllang-toolbar-meta">
          <span>${lesson.quizzes.length} phần · ${totalQ} câu</span>
        </div>
      </div>
      <div class="dd-onllang-note">
        <i class="fa-solid fa-circle-info"></i>
        <span>Chọn / điền câu trả lời của bạn ở tất cả các mục bên dưới, xong thì bấm
        <b>Nộp toàn bộ bài</b> ở cuối trang. Phần <b>Đặt câu</b> và <b>tự luận</b> do giáo viên
        chấm tay, không tính vào điểm tự động.</span>
      </div>
      <div class="dd-onllang-body" id="dd-onllang-body">
        ${quizzesHtml}
      </div>
      ${_ddOnllangSubmitBarHtml()}
    </div>`;
}

/** Render tab bài tập */
async function ddRenderExercise(el) {

  // Chế độ XEM LẠI (giáo viên): mở từ Quản lý lớp > chi tiết học viên > bấm "Xem chi tiết" ở 1 bài
  // giáo trình đã làm — link trỏ về đúng bài này kèm ?review=<exercise_result_id>. Tải snapshot câu
  // hỏi/lựa chọn đã lưu lúc nộp bài (details_json) rồi hiện lại y hệt màn hình "đã nộp bài" bình thường
  // (tái dùng nguyên khối render phase 'submitted' bên dưới — không có nút nộp/chọn đáp án nào hoạt động
  // ở phase này nên tự động là chế độ chỉ xem). Chỉ admin gọi được /admin/exercise-results/:id nên chỉ
  // giáo viên đăng nhập admin mới mở được link này thành công.
  const reviewId = ddState.reviewExerciseId;
  if (reviewId && ddState.exercise.reviewLoadedId !== reviewId) {
    el.innerHTML = '<div class="dd-ex-intro"><div class="dd-ex-intro-icon"><i class="fa-solid fa-spinner fa-spin"></i></div><p>Đang tải bài đã làm...</p></div>';
    try {
      const data = await api.get(`/admin/exercise-results/${reviewId}`);
      if (!data.details || !data.details.questions || !data.details.answers) {
        el.innerHTML = `<div class="dd-coming-soon"><i class="fa-solid fa-triangle-exclamation"></i><p>Bài này chưa có dữ liệu chi tiết từng câu.</p><span>Học sinh đã nộp bài trước khi tính năng xem chi tiết ra mắt (2026-08-25).</span></div>`;
        return;
      }
      ddExStopTimer();
      Object.assign(ddState.exercise, {
        phase: 'submitted',
        questions: data.details.questions,
        answers: data.details.answers,
        correct: data.correct_answers,
        scorePercent: Number(data.score_percent),
        elapsed: data.time_seconds || 0,
        reviewLoadedId: reviewId,
        teacherReview: data.teacher_review || '',
      });
    } catch (err) {
      el.innerHTML = `<div class="dd-coming-soon"><i class="fa-solid fa-triangle-exclamation"></i><p>Không tải được bài đã làm.</p><span>${err.message || ''}</span></div>`;
      return;
    }
  }

  const info = getExerciseInfo(ddState.selectedSub, TB());
  const sub = TB().subs.find(s => s.id === ddState.selectedSub);

  if (!info || !info.available) {
    el.innerHTML = `
      <div class="dd-coming-soon">
        <i class="fa-solid fa-clipboard-list"></i>
        <p>Bài <strong>${ddState.selectedSub}</strong> chưa có bài tập</p>
        <span>Bài này chưa đủ từ vựng trong dữ liệu để sinh bài tập (cần ít nhất 4 từ).</span>
      </div>`;
    return;
  }

  const ex = ddState.exercise;

  // Phase: IDLE — Chưa bắt đầu
  if (ex.phase === 'idle') {
    const isSub2 = TB().coLuyenTap && ddLaPhanCuoi(ddState.selectedSub);

    if (!state.isLoggedIn) {
      el.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div class="dd-ex-intro">
            <div class="dd-ex-intro-icon" style="color:var(--text-light)"><i class="fa-solid fa-lock"></i></div>
            <h3>Bài tập — ${sub?.title || ddState.selectedSub}</h3>
            <p class="dd-ex-intro-desc">Vui lòng đăng nhập để làm bài tập trắc nghiệm.</p>
            <button class="btn btn-primary" style="margin-top:20px;padding:12px 24px;border-radius:24px" onclick="window.app.openAuth()">Đăng nhập để làm bài</button>
          </div>

          ${isSub2 ? `
          <div class="dd-ex-intro dd-onllang-card">
            <div class="dd-ex-intro-icon" style="color:#e85d04"><i class="fa-solid fa-headphones-simple"></i></div>
            <h3>Luyện tập tổng hợp — ${sub?.title || ddState.selectedSub}</h3>
            <div class="dd-ex-meta">
              <span><i class="fa-solid fa-ear-listen"></i> Luyện nghe</span>
              <span><i class="fa-solid fa-eye"></i> Đọc hiểu</span>
              <span><i class="fa-solid fa-pen"></i> Luyện viết</span>
            </div>
            <p class="dd-ex-intro-desc">${_ddLuyenTapDesc()}</p>
            <button class="dd-ex-start-btn dd-onllang-btn" onclick="window.app.ddOnllangOpen()">
              <i class="fa-solid fa-headphones-simple"></i> Mở luyện tập tổng hợp
            </button>
          </div>` : ''}
        </div>`;
      return;
    }

    el.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div class="dd-ex-intro">
          <div class="dd-ex-intro-icon"><i class="fa-solid fa-pen-to-square"></i></div>
          <h3>Bài tập — ${sub?.title || ddState.selectedSub}</h3>
          <div class="dd-ex-meta">
            <span><i class="fa-solid fa-list-ol"></i> ${info.wordCount} câu hỏi</span>
            <span><i class="fa-solid fa-clock"></i> Không giới hạn thời gian</span>
            <span><i class="fa-solid fa-shuffle"></i> 3 dạng: Hanzi↔Nghĩa, Pinyin→Hanzi</span>
          </div>
          <p class="dd-ex-intro-desc">Trắc nghiệm toàn bộ từ vựng bài này. Câu hỏi được sinh ngẫu nhiên mỗi lần làm.</p>
          <button class="dd-ex-start-btn" onclick="window.app.ddExStart(1)">
            <i class="fa-solid fa-play"></i> Bắt đầu làm bài 1
          </button>
        </div>

        ${isSub2 ? `
        <div class="dd-ex-intro dd-onllang-card">
          <div class="dd-ex-intro-icon" style="color:#e85d04"><i class="fa-solid fa-headphones-simple"></i></div>
          <h3>Luyện tập tổng hợp — ${sub?.title || ddState.selectedSub}</h3>
          <div class="dd-ex-meta">
            <span><i class="fa-solid fa-ear-listen"></i> Luyện nghe</span>
            <span><i class="fa-solid fa-eye"></i> Đọc hiểu</span>
            <span><i class="fa-solid fa-pen"></i> Luyện viết</span>
          </div>
          <p class="dd-ex-intro-desc">${_ddLuyenTapDesc()}</p>
          <button class="dd-ex-start-btn dd-onllang-btn" onclick="window.app.ddOnllangOpen()">
            <i class="fa-solid fa-headphones-simple"></i> Mở luyện tập tổng hợp
          </button>
        </div>` : ''}
      </div>`;
    return;
  }

  // Phase: ACTIVE — Đang làm bài
  if (ex.phase === 'active') {
    const answered = ex.answers.filter(a => a >= 0).length;
    const total = ex.questions.length;

    let questionsHtml = '';
    ex.questions.forEach((q, qi) => {
      const typeLabel = q.type === 'hanzi-to-meaning' ? 'Chọn nghĩa đúng'
        : q.type === 'meaning-to-hanzi' ? 'Chọn chữ Hán'
        : 'Chọn chữ Hán theo pinyin';
      const typeIcon = q.type === 'hanzi-to-meaning' ? 'fa-language'
        : q.type === 'meaning-to-hanzi' ? 'fa-font'
        : 'fa-spell-check';

      questionsHtml += `
        <div class="dd-ex-question ${ex.answers[qi] >= 0 ? 'answered' : ''}" id="dd-ex-q-${qi}">
          <div class="dd-ex-q-header">
            <span class="dd-ex-q-num">Câu ${qi + 1}</span>
            <span class="dd-ex-q-type"><i class="fa-solid ${typeIcon}"></i> ${typeLabel}</span>
          </div>
          <div class="dd-ex-q-prompt">
            <span class="dd-ex-prompt-main">${q.prompt}</span>
            ${q.promptSub ? `<span class="dd-ex-prompt-sub">${q.promptSub}</span>` : ''}
          </div>
          <div class="dd-ex-options">
            ${q.options.map((opt, oi) => `
              <button class="dd-ex-opt ${ex.answers[qi] === oi ? 'selected' : ''}"
                onclick="window.app.ddExSelect(${qi}, ${oi})">
                <span class="dd-ex-opt-letter">${'ABCD'[oi]}</span>
                <span class="dd-ex-opt-text">${opt.text}</span>
              </button>
            `).join('')}
          </div>
        </div>`;
    });

    el.innerHTML = `
      <div class="dd-ex-active">
        <div class="dd-ex-toolbar">
          <div class="dd-ex-toolbar-left">
            <span class="dd-ex-timer-label"><i class="fa-solid fa-clock"></i></span>
            <span class="dd-ex-timer" id="dd-ex-timer">${ddExFormatTime(ex.elapsed)}</span>
          </div>
          <div class="dd-ex-toolbar-center">
            <div class="dd-ex-progress">
              <div class="dd-ex-progress-fill" id="dd-ex-progress-bar" style="width:${(answered / total) * 100}%"></div>
            </div>
            <span class="dd-ex-progress-label" id="dd-ex-progress-text">${answered}/${total}</span>
          </div>
          <div class="dd-ex-toolbar-right">
            <button class="dd-ex-submit-btn ${answered < total ? 'partial' : ''}" onclick="window.app.ddExSubmit()">
              <i class="fa-solid fa-paper-plane"></i> Nộp bài
            </button>
          </div>
        </div>
        <div class="dd-ex-questions-wrap">
          <div class="dd-ex-questions">${questionsHtml}</div>
        </div>
        <div class="dd-ex-bottom-submit">
          <button class="dd-ex-submit-btn ${answered < total ? 'partial' : ''}" onclick="window.app.ddExSubmit()">
            <i class="fa-solid fa-paper-plane"></i> Nộp bài (${answered}/${total})
          </button>
        </div>
      </div>`;
    return;
  }

  // Phase: SUBMITTED — Đã nộp, hiện kết quả dưới mỗi câu hỏi
  if (ex.phase === 'submitted') {
    const total = ex.questions.length;
    const pct = ex.scorePercent;
    const gradeEmoji = pct >= 90 ? '🎉' : pct >= 70 ? '👍' : pct >= 50 ? '📝' : '💪';
    const gradeText = pct >= 90 ? 'Xuất sắc!' : pct >= 70 ? 'Tốt lắm!' : pct >= 50 ? 'Cần cố gắng thêm' : 'Hãy ôn lại từ vựng';

    let questionsHtml = '';
    ex.questions.forEach((q, qi) => {
      const userAns = ex.answers[qi];
      const isCorrect = userAns === q.correctIdx;
      const statusClass = userAns < 0 ? 'skipped' : isCorrect ? 'correct' : 'wrong';
      const typeLabel = q.type === 'hanzi-to-meaning' ? 'Chọn nghĩa đúng'
        : q.type === 'meaning-to-hanzi' ? 'Chọn chữ Hán'
        : 'Chọn chữ Hán theo pinyin';
      const typeIcon = q.type === 'hanzi-to-meaning' ? 'fa-language'
        : q.type === 'meaning-to-hanzi' ? 'fa-font'
        : 'fa-spell-check';

      // Options with correct/wrong highlighting
      const optionsHtml = q.options.map((opt, oi) => {
        let cls = 'dd-ex-opt';
        if (oi === q.correctIdx) cls += ' opt-correct';
        else if (oi === userAns && !isCorrect) cls += ' opt-wrong';
        else cls += ' opt-neutral';
        return `<button class="${cls}">
          <span class="dd-ex-opt-letter">${'ABCD'[oi]}</span>
          <span class="dd-ex-opt-text">${opt.text}</span>
        </button>`;
      }).join('');

      // Feedback message
      let feedbackHtml = '';
      if (userAns < 0) {
        feedbackHtml = `<div class="dd-ex-feedback fb-skipped">
          <i class="fa-solid fa-minus-circle"></i>
          <div class="dd-ex-feedback-text">Chưa trả lời. Đáp án đúng: <b>${'ABCD'[q.correctIdx]}. ${q.options[q.correctIdx].text}</b>
            <div class="dd-ex-feedback-word">${q.wordHanzi} <span class="pinyin">${q.wordPinyin}</span> — ${q.wordDef}</div>
          </div>
        </div>`;
      } else if (isCorrect) {
        feedbackHtml = `<div class="dd-ex-feedback fb-correct">
          <i class="fa-solid fa-circle-check"></i>
          <div class="dd-ex-feedback-text">Chính xác!
            <div class="dd-ex-feedback-word">${q.wordHanzi} <span class="pinyin">${q.wordPinyin}</span> — ${q.wordDef}</div>
          </div>
        </div>`;
      } else {
        feedbackHtml = `<div class="dd-ex-feedback fb-wrong">
          <i class="fa-solid fa-circle-xmark"></i>
          <div class="dd-ex-feedback-text">Sai. Bạn chọn <b>${'ABCD'[userAns]}. ${q.options[userAns].text}</b> — Đáp án đúng: <b>${'ABCD'[q.correctIdx]}. ${q.options[q.correctIdx].text}</b>
            <div class="dd-ex-feedback-word">${q.wordHanzi} <span class="pinyin">${q.wordPinyin}</span> — ${q.wordDef}</div>
          </div>
        </div>`;
      }

      questionsHtml += `
        <div class="dd-ex-question ${statusClass}" id="dd-ex-q-${qi}">
          <div class="dd-ex-q-header">
            <span class="dd-ex-q-num">Câu ${qi + 1}</span>
            <span class="dd-ex-q-type"><i class="fa-solid ${typeIcon}"></i> ${typeLabel}</span>
          </div>
          <div class="dd-ex-q-prompt">
            <span class="dd-ex-prompt-main">${q.prompt}</span>
            ${q.promptSub ? `<span class="dd-ex-prompt-sub">${q.promptSub}</span>` : ''}
          </div>
          <div class="dd-ex-options">${optionsHtml}</div>
          ${feedbackHtml}
        </div>`;
    });

    el.innerHTML = `
      <div class="dd-ex-result">
        ${reviewId ? `<div class="dd-ex-review-banner"><i class="fa-solid fa-eye"></i> Đang xem lại bài học sinh đã nộp (chế độ giáo viên) — không tính là làm bài mới.</div>` : ''}
        <div class="dd-ex-result-summary">
          <div class="dd-ex-result-emoji">${gradeEmoji}</div>
          <div class="dd-ex-result-score">${pct}%</div>
          <div class="dd-ex-result-grade">${gradeText}</div>
          <div class="dd-ex-result-stats">
            <span><i class="fa-solid fa-check"></i> ${ex.correct}/${total} đúng</span>
            <span><i class="fa-solid fa-clock"></i> ${ddExFormatTime(ex.elapsed)}</span>
          </div>
          ${!state.user ? '<p class="dd-ex-login-hint"><i class="fa-solid fa-circle-info"></i> Đăng nhập để lưu điểm và giáo viên có thể theo dõi kết quả.</p>' : ''}
        </div>
        <div class="dd-ex-result-actions">
          ${reviewId ? '' : `
          <button class="dd-ex-retry-btn" onclick="window.app.ddExReset()">
            <i class="fa-solid fa-rotate-right"></i> Làm lại
          </button>
          <button class="dd-ex-vocab-btn" onclick="window.app.ddSwitchTab('vocab')">
            <i class="fa-solid fa-list"></i> Xem từ vựng
          </button>`}
        </div>
        ${reviewId ? `
        <div class="dd-ex-teacher-review-box" style="margin-top:20px;padding:16px;background:white;border-radius:12px;border:1px solid var(--border)">
          <h4 style="font-size:14px;font-weight:700;margin-bottom:8px">Nhận xét của giáo viên:</h4>
          <textarea id="dd-ex-teacher-review-input" style="width:100%;height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;font-family:inherit;resize:vertical" placeholder="Nhập nhận xét của bạn tại đây...">${ex.teacherReview || ''}</textarea>
          <div style="text-align:right;margin-top:10px">
            <button class="btn btn-primary" onclick="window.app.ddSubmitTeacherReview(${reviewId}, this)"><i class="fa-solid fa-paper-plane"></i> Lưu nhận xét</button>
          </div>
        </div>
        ` : ''}
        <div class="dd-ex-questions-wrap">
          <div class="dd-ex-questions">${questionsHtml}</div>
        </div>
      </div>`;
    return;
  }
}

/** Lưu nhận xét của giáo viên khi mở bài học sinh ở chế độ xem lại (?review=<id>).
 *  Nút này có từ commit "teacher review section" nhưng HÀM XỬ LÝ chưa từng được viết —
 *  bấm vào chỉ báo lỗi trong console (2026-08-27). Route đã có sẵn ở server/routes/admin.js. */
async function ddSubmitTeacherReview(id, btn) {
  const input = document.getElementById('dd-ex-teacher-review-input');
  if (!input) return;
  const text = input.value.trim();
  const el = btn || document.querySelector('.dd-ex-teacher-review-box .btn-primary');
  const goc = el ? el.innerHTML : '';
  if (el) { el.disabled = true; el.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...'; }
  try {
    await api.post(`/admin/exercise-results/${id}/review`, { teacher_review: text });
    ddState.exercise.teacherReview = text;
    if (el) el.innerHTML = '<i class="fa-solid fa-check"></i> Đã lưu';
    setTimeout(() => { if (el) { el.disabled = false; el.innerHTML = goc; } }, 1600);
  } catch (e) {
    alert(e.message || 'Không lưu được nhận xét.');
    if (el) { el.disabled = false; el.innerHTML = goc; }
  }
}

// ============================================================
// GAME TAB — Bong Bóng Từ Vựng & Cứu Chú Ong Tẻn
// Rà lại + viết lại phần lõi 2026-09-04. Những chỗ CỐ Ý, đừng "sửa" ngược lại:
//
// 1. **Bong bóng của đáp án KHÔNG có màu riêng.** Bản cũ tô đáp án bằng class
//    `wp-correct` (tím rực + viền phát sáng) còn mồi nhử dùng 5 màu khác — nhìn màu là
//    biết đáp án, không cần đọc chữ, game mất sạch tác dụng học. Nay mọi bong bóng lấy
//    màu theo VỊ TRÍ trong lượt (`_ddWpMauLop`), đúng/sai chỉ nằm ở `data-correct`.
// 2. **Mọi setTimeout đều được ghi vào `st.timers`** và bị huỷ trong `_ddWpStop()` /
//    `_ddBeeStop()`. Bản cũ để timer chạy tiếp sau khi rời tab: bong bóng vẫn sinh vào
//    arena đã gỡ khỏi DOM, và khi hết mạng `_ddWpGameOver()` ghi đè `#dd-tab-content` —
//    tức là màn "Game Over" nhảy ra đè lên tab Từ vựng/Flashcard mà học viên vừa chuyển
//    sang. Bee còn nặng hơn: `setTimeout(1500)` sau khi ghép xong từ cũng vẽ đè như vậy.
// 3. **Bấm trúng bong bóng là tăng `roundId` NGAY**, không đợi 380ms. Bản cũ có cửa sổ
//    ~380ms mà timer "rơi hụt" của chính bong bóng vừa bấm vẫn khớp roundId cũ → trừ oan
//    1 mạng VÀ gọi `_ddWpNextRound()` lần hai (nhảy cóc 2 từ liền).
// 4. **Quãng rơi tính theo chiều cao arena thật** (`--wp-fall` gắn vào từng bong bóng),
//    không phải hằng số 540px. Arena mobile chỉ cao 340px nên bản cũ có ~20% thời gian
//    bong bóng đã trôi khuất mắt mà lượt chơi vẫn chưa kết thúc — người chơi ngồi chờ
//    một thứ không còn nhìn thấy.
// 5. **Ẩn tab / khoá máy thì TẠM DỪNG** (`visibilitychange`), không trừ mạng.
// ============================================================

const DD_GAME_BEST_KEY = 'tw_game_best';
const DD_GAME_SOUND_KEY = 'tw_game_sound';

/** Điểm cao nhất từng đạt, lưu theo (game, bài) ở localStorage. */
function _ddGameBestAll() {
  try { return JSON.parse(localStorage.getItem(DD_GAME_BEST_KEY) || '{}') || {}; }
  catch (e) { return {}; }
}
function _ddGameGetBest(game, subId) {
  return Number(_ddGameBestAll()[`${game}:${subId}`] || 0);
}
/** Trả về true nếu vừa phá kỷ lục. */
function _ddGameSaveBest(game, subId, score) {
  const all = _ddGameBestAll();
  const k = `${game}:${subId}`;
  if (score <= Number(all[k] || 0)) return false;
  all[k] = score;
  try { localStorage.setItem(DD_GAME_BEST_KEY, JSON.stringify(all)); } catch (e) { /* chế độ riêng tư */ }
  return true;
}

/* ---- Âm thanh phản hồi ----------------------------------------------------
   WebAudio thuần, không tải file, không thư viện. AudioContext chỉ được tạo sau
   cú bấm đầu tiên của người dùng (trình duyệt chặn autoplay), và mọi lỗi đều
   nuốt im lặng — thiếu tiếng thì game vẫn chơi bình thường. */
let _ddAudioCtx = null;
function _ddGameSoundOn() {
  try { return localStorage.getItem(DD_GAME_SOUND_KEY) !== 'off'; } catch (e) { return true; }
}
function ddGameToggleSound() {
  const on = !_ddGameSoundOn();
  try { localStorage.setItem(DD_GAME_SOUND_KEY, on ? 'on' : 'off'); } catch (e) { /* bỏ qua */ }
  document.querySelectorAll('.dd-game-sound-btn').forEach(b => {
    b.classList.toggle('is-off', !on);
    b.innerHTML = `<i class="fa-solid fa-volume-${on ? 'high' : 'xmark'}"></i>`;
    b.title = on ? 'Tắt tiếng' : 'Bật tiếng';
  });
  if (on) _ddGameBeep('correct');
}
function _ddGameBeep(kind) {
  if (!_ddGameSoundOn()) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!_ddAudioCtx) _ddAudioCtx = new AC();
    const ctx = _ddAudioCtx;
    if (ctx.state === 'suspended') ctx.resume();
    const notes = {
      correct: [[660, 0], [880, 0.08]],
      combo:   [[660, 0], [880, 0.07], [1175, 0.14]],
      wrong:   [[300, 0], [180, 0.1]],
      win:     [[523, 0], [659, 0.1], [784, 0.2], [1046, 0.3]],
      lose:    [[400, 0], [300, 0.12], [200, 0.26]],
    }[kind] || [[600, 0]];
    notes.forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = kind === 'wrong' || kind === 'lose' ? 'sawtooth' : 'triangle';
      osc.frequency.value = freq;
      const t0 = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.16, t0 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.24);
    });
  } catch (e) { /* không có tiếng cũng không sao */ }
}

/** Shared game state */
const ddGameState = {
  mode: null,
  wordpop: {
    phase: 'idle',   // 'countdown'|'playing'|'paused'|'gameover'
    score: 0, lives: 3, level: 1,
    combo: 0, comboMulti: 1, bestCombo: 0,
    hit: 0, total: 0,
    vocab: [], queueIdx: 0,
    activeTarget: null,
    roundId: 0,
    arenaEl: null,
    missed: [],
    timers: new Set(),
  },
  bee: {
    phase: 'idle',   // 'playing'|'win'|'gameover'
    score: 0, lives: 5, streak: 0,
    vocab: [], wordIdx: 0,
    guessedChars: new Set(),
    wrongChars: new Set(),
    filledSlots: [],
    wordClean: true,   // chưa sai/chưa xin gợi ý ở từ này
    hintUsed: 0,
    missed: [],
    timers: new Set(),
    _currentWord: null,
    _currentChars: [],
    _allChars: [],
  },
};

/* ---- Utilities ---- */
function _ddShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** setTimeout có ghi sổ — mọi timer của game phải đi qua đây để `stop` huỷ được hết. */
function _ddGameLater(st, fn, ms) {
  const id = setTimeout(() => { st.timers.delete(id); fn(); }, ms);
  st.timers.add(id);
  return id;
}
function _ddGameClearTimers(st) {
  st.timers.forEach(id => clearTimeout(id));
  st.timers.clear();
}

function _ddWpStop() {
  const st = ddGameState.wordpop;
  _ddGameClearTimers(st);
  if (st.phase !== 'gameover') st.phase = 'idle';
  const arena = document.getElementById('dd-wp-arena');
  if (arena) {
    arena.querySelectorAll('.dd-wp-bubble, .dd-wp-score-popup, .dd-wp-pause').forEach(n => n.remove());
  }
  st.arenaEl = null;
}

function _ddBeeStop() {
  const st = ddGameState.bee;
  _ddGameClearTimers(st);
  if (st.phase === 'playing') st.phase = 'idle';
}

/** Dừng CẢ HAI game — gọi khi rời tab Game hoặc rời hẳn trang. */
function _ddGameStopAll() {
  _ddWpStop();
  _ddBeeStop();
  ddGameState.mode = null;
}

// Ẩn tab / khoá màn hình giữa lúc chơi thì tạm dừng, đừng để bong bóng rơi hụt trừ mạng oan.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && ddGameState.mode === 'wordpop' && ddGameState.wordpop.phase === 'playing') {
    _ddWpPause();
  }
});

// ---- Entry ----

function _ddGameSoundBtnHtml() {
  const on = _ddGameSoundOn();
  return `<button class="dd-game-sound-btn${on ? '' : ' is-off'}" onclick="window.app.ddGameToggleSound()"
    title="${on ? 'Tắt tiếng' : 'Bật tiếng'}"><i class="fa-solid fa-volume-${on ? 'high' : 'xmark'}"></i></button>`;
}

function ddRenderGame(el) {
  const vocab = ddGetVocab(ddState.selectedSub);
  _ddGameStopAll();

  if (vocab.length < 4) {
    el.innerHTML = `
      <div class="dd-coming-soon">
        <i class="fa-solid fa-gamepad"></i>
        <p>Bài này chưa đủ từ vựng để chơi game</p>
        <span>Cần ít nhất 4 từ (bài hiện tại có ${vocab.length} từ).</span>
      </div>`;
    return;
  }

  const sub = TB().subs.find(s => s.id === ddState.selectedSub);
  const bestWp = _ddGameGetBest('wordpop', ddState.selectedSub);
  const bestBee = _ddGameGetBest('bee', ddState.selectedSub);
  const kyLuc = (n) => n > 0
    ? `<div class="dd-game-card-best"><i class="fa-solid fa-trophy"></i><span>Kỷ lục của bạn: <b>${n}</b></span></div>`
    : `<div class="dd-game-card-best dd-game-card-best--empty"><i class="fa-regular fa-star"></i><span>Chưa có kỷ lục</span></div>`;

  el.innerHTML = `
    <div class="dd-game-select">
      <div class="dd-game-select-header">
        <div class="dd-game-select-title">🎮 Góc Game Từ Vựng</div>
        <div class="dd-game-select-sub">${sub?.title || ''} · ${vocab.length} từ vựng</div>
      </div>
      <div class="dd-game-cards">
        <div class="dd-game-card bubble-card" onclick="window.app.ddGameSelectMode('wordpop')">
          <div class="dd-game-card-blob"></div>
          <div class="dd-game-card-icon">🎈</div>
          <h3>Bong Bóng Từ Vựng</h3>
          <p>Đọc nghĩa → bấm nhanh đúng bong bóng chữ Hán trước khi chúng rơi mất!</p>
          ${kyLuc(bestWp)}
          <button class="dd-game-card-btn" onclick="event.stopPropagation();window.app.ddGameSelectMode('wordpop')">
            ▶ Chơi ngay
          </button>
        </div>
        <div class="dd-game-card bee-card" onclick="window.app.ddGameSelectMode('bee')">
          <div class="dd-game-card-blob"></div>
          <div class="dd-game-card-icon">🐝</div>
          <h3>Cứu Chú Ong Tẻn</h3>
          <p>Đọc nghĩa → chọn từng chữ Hán để phá lồng cứu chú ong trước khi hết mạng!</p>
          ${kyLuc(bestBee)}
          <button class="dd-game-card-btn" onclick="event.stopPropagation();window.app.ddGameSelectMode('bee')">
            ▶ Chơi ngay
          </button>
        </div>
      </div>
    </div>`;
}

function ddGameSelectMode(mode) {
  const el = document.getElementById('dd-tab-content');
  if (!el) return;
  _ddGameStopAll();
  ddGameState.mode = mode;
  if (mode === 'wordpop') _ddWpInit(el);
  else if (mode === 'bee') _ddBeeInit(el);
}

function ddGameBack() {
  _ddGameStopAll();
  ddGameState.wordpop.phase = 'idle';
  ddGameState.bee.phase = 'idle';
  ddRenderGame(document.getElementById('dd-tab-content'));
}

/* ---- Bảng "từ cần ôn lại" ở màn kết thúc -------------------------------------
   Chơi xong mà chỉ thấy con số điểm thì không học được gì. Liệt kê đúng những từ
   đã bấm trượt/đoán sai, kèm nút nghe — đây mới là phần có giá trị ôn tập. */
let _ddGameMissedList = [];
function _ddGameMissedHtml(list) {
  _ddGameMissedList = list.slice(0, 10);
  if (!_ddGameMissedList.length) {
    return `<div class="dd-game-missed dd-game-missed--none">
      <i class="fa-solid fa-circle-check"></i><span>Không sai từ nào. Quá đỉnh!</span></div>`;
  }
  return `<div class="dd-game-missed">
    <div class="dd-game-missed-head"><i class="fa-solid fa-rotate-left"></i>
      <span>Từ cần ôn lại (${_ddGameMissedList.length})</span></div>
    <div class="dd-game-missed-list">
      ${_ddGameMissedList.map((w, i) => `
        <button class="dd-game-missed-item" onclick="window.app.ddGameSpeakMissed(${i})" title="Nghe lại">
          <span class="dd-gm-hanzi font-tc">${H(w.hanzi)}</span>
          <span class="dd-gm-body"><span class="dd-gm-pinyin">${w.pinyin || ''}</span>
            <span class="dd-gm-def">${w.def || ''}</span></span>
          <i class="fa-solid fa-volume-high"></i>
        </button>`).join('')}
    </div>
  </div>`;
}
function ddGameSpeakMissed(i) {
  const w = _ddGameMissedList[i];
  if (w) speakWord(w.hanzi, 'zh-TW');
}

/** Gom từ sai, không trùng lặp. */
function _ddGameAddMissed(list, w) {
  if (!w || list.some(x => x.hanzi === w.hanzi)) return;
  list.push({ hanzi: w.hanzi, pinyin: w.pinyin, def: w.def });
}

/* ---- Lưu kết quả ván chơi cho giáo viên -------------------------------------
   Dùng chung bảng `exercise_results` như bài tập giáo trình / luyện phát âm
   (append-only, xem CLAUDE.md mục 5). Namespace lesson_id: `game:wordpop:<bài>` và
   `game:bee:<bài>` — dài nhất "game:wordpop:15.2" = 17 ký tự, vừa VARCHAR(20), KHÔNG
   cần migration. Thêm game mới thì nhớ giữ tên ngắn và khai nhãn ở đủ 5 chỗ:
   notifLessonName + assignmentLabel + openAssignment (main.js), assignmentLabel +
   _assignableGame (admin.js). */
function ddGameLessonId(game) { return `game:${game}:${ddState.selectedSub}`; }

/** Ô báo trạng thái lưu, đặt sẵn trong màn kết thúc rồi mới điền — nộp bài là việc
    chạy nền, không được chặn học viên xem điểm. */
function _ddGameSaveSlotHtml() { return '<div class="dd-game-save" id="dd-game-save"></div>'; }

function _ddGameSaveMsg(cls, icon, text) {
  const box = document.getElementById('dd-game-save');
  if (box) box.innerHTML = `<div class="dd-game-save-msg ${cls}"><i class="fa-solid ${icon}"></i><span>${text}</span></div>`;
}

async function _ddGameLuuKetQua(game, st, total, correct) {
  if (st.saved || !total) return;
  if (!(state.user && api.isLoggedIn)) {
    _ddGameSaveMsg('is-info', 'fa-circle-info', 'Đăng nhập để lưu điểm và giáo viên theo dõi được kết quả.');
    return;
  }
  st.saved = true;
  _ddGameSaveMsg('is-load', 'fa-spinner fa-spin', 'Đang lưu kết quả...');
  // Chi tiết gửi lên theo DẠNG MẢNG PHẲNG mà `reviewQuestions()` (modal học viên) và
  // `_normalizeExerciseDetails()` (admin) đã đọc được sẵn — xem 4.18. Chỉ gửi những từ
  // còn sai: đó là thứ giáo viên cần nhìn, không phải toàn bộ lượt bấm.
  const details = st.missed.map(w => ({
    question: `Từ chưa thuộc: ${w.def || ''}`,
    options: [w.hanzi],
    selected: -1,
    correctIdx: 0,
    explain: w.pinyin || '',
  }));
  try {
    await api.post('/exercise/submit', {
      lesson_id: ddGameLessonId(game),
      total_questions: total,
      correct_answers: correct,
      time_seconds: Math.max(0, Math.round((Date.now() - (st.startAt || Date.now())) / 1000)),
      details,
    });
    _ddGameSaveMsg('is-ok', 'fa-circle-check', 'Đã lưu kết quả — giáo viên xem được ở Quản lý lớp.');
  } catch (e) {
    // Đừng nuốt lỗi: học viên phải biết ván này chưa tới tay giáo viên (bài học từ 4.21b).
    st.saved = false;
    console.warn('Lưu điểm game lỗi:', e);
    _ddGameSaveMsg('is-err', 'fa-triangle-exclamation', 'Chưa lưu được kết quả lên hệ thống.');
  }
}

function _ddGameBestHtml(game, score) {
  const moi = _ddGameSaveBest(game, ddState.selectedSub, score);
  const best = _ddGameGetBest(game, ddState.selectedSub);
  if (moi) return `<div class="dd-game-best is-new"><i class="fa-solid fa-trophy"></i><span>Kỷ lục mới! <b>${score}</b> điểm</span></div>`;
  // Thua ngay từ đầu (0 điểm, chưa từng có kỷ lục) thì đừng khoe "Kỷ lục của bạn: 0".
  if (best <= 0) return '';
  return `<div class="dd-game-best"><i class="fa-solid fa-trophy"></i><span>Kỷ lục của bạn: <b>${best}</b></span></div>`;
}

// ================================================================
// GAME 1 — BONG BÓNG TỪ VỰNG (Word Pop)
// ================================================================

/** 6 màu bong bóng, gán theo VỊ TRÍ trong lượt — đáp án không có màu riêng (xem ghi chú đầu file). */
function _ddWpMauLop(i) { return `wp-c${i % 6}`; }

function _ddWpInit(el) {
  const vocab = ddGetVocab(ddState.selectedSub);
  const st = ddGameState.wordpop;
  _ddGameClearTimers(st);
  Object.assign(st, {
    phase: 'countdown',
    score: 0, lives: 3, level: 1,
    combo: 0, comboMulti: 1, bestCombo: 0,
    hit: 0, total: 0,
    vocab: _ddShuffle(vocab),
    queueIdx: 0,
    activeTarget: null,
    roundId: 0,
    arenaEl: null,
    missed: [],
    startAt: Date.now(),
    saved: false,
  });
  _ddWpRender(el);
  _ddWpCountdown(3);
}

function _ddWpHudHtml() {
  const st = ddGameState.wordpop;
  const lives = Array.from({ length: 3 }, (_, i) =>
    `<span class="${i >= st.lives ? 'lost' : ''}">❤️</span>`
  ).join('');
  const comboVis = st.comboMulti > 1 ? 'visible' : '';
  return `
    <div class="dd-game-hud">
      <button class="dd-game-back-btn" onclick="window.app.ddGameBack()">
        <i class="fa-solid fa-arrow-left"></i> Chọn game
      </button>
      <div class="dd-game-score-wrap">
        <span class="dd-game-score-label">Điểm</span>
        <span class="dd-game-score" id="dd-wp-score">${st.score}</span>
      </div>
      <span class="dd-game-combo ${comboVis}" id="dd-wp-combo">🔥 x${st.comboMulti}</span>
      <div class="dd-game-hud-right">
        <div class="dd-game-lives" id="dd-wp-lives">${lives}</div>
        ${_ddGameSoundBtnHtml()}
      </div>
    </div>`;
}

function _ddWpRender(el) {
  const st = ddGameState.wordpop;
  const best = _ddGameGetBest('wordpop', ddState.selectedSub);
  el.innerHTML = `
    <div class="dd-wp-wrap">
      ${_ddWpHudHtml()}
      <div class="dd-wp-prompt" id="dd-wp-prompt">
        <div class="dd-wp-prompt-label">🎯 Tìm chữ Hán của từ này</div>
        <div class="dd-wp-prompt-def" id="dd-wp-target-def">—</div>
        <div class="dd-wp-prompt-pinyin" id="dd-wp-target-pinyin"></div>
      </div>
      <div class="dd-wp-arena" id="dd-wp-arena">
        <span class="dd-wp-level-badge" id="dd-wp-level-badge">Cấp ${st.level}</span>
        ${best > 0 ? `<span class="dd-wp-best-badge"><i class="fa-solid fa-trophy"></i> ${best}</span>` : ''}
      </div>
    </div>`;
  st.arenaEl = document.getElementById('dd-wp-arena');
}

function _ddWpCountdown(n) {
  const st = ddGameState.wordpop;
  const arena = st.arenaEl || document.getElementById('dd-wp-arena');
  if (!arena) return;

  const old = arena.querySelector('.dd-wp-countdown');
  if (old) old.remove();

  if (n <= 0) {
    st.phase = 'playing';
    _ddWpNextRound();
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'dd-wp-countdown';
  const labels = ['', 'Sẵn sàng!', 'Bắt đầu!'];
  overlay.innerHTML = `
    <div class="dd-wp-countdown-num">${n}</div>
    <div class="dd-wp-countdown-label">${n <= 2 ? labels[n - 1] || '' : 'Chuẩn bị...'}</div>`;
  arena.appendChild(overlay);

  _ddGameLater(st, () => {
    overlay.remove();
    _ddWpCountdown(n - 1);
  }, 800);
}

function _ddWpUpdateHud() {
  const st = ddGameState.wordpop;
  const scoreEl = document.getElementById('dd-wp-score');
  if (scoreEl) {
    scoreEl.textContent = st.score;
    scoreEl.classList.remove('bump');
    void scoreEl.offsetWidth;
    scoreEl.classList.add('bump');
  }
  const livesEl = document.getElementById('dd-wp-lives');
  if (livesEl) {
    livesEl.innerHTML = Array.from({ length: 3 }, (_, i) =>
      `<span class="${i >= st.lives ? 'lost' : ''}">❤️</span>`
    ).join('');
  }
  const comboEl = document.getElementById('dd-wp-combo');
  if (comboEl) {
    comboEl.textContent = `🔥 x${st.comboMulti}`;
    comboEl.className = `dd-game-combo ${st.comboMulti > 1 ? 'visible' : ''}`;
  }
}

/** Tạm dừng khi người chơi rời tab trình duyệt — KHÔNG trừ mạng. */
function _ddWpPause() {
  const st = ddGameState.wordpop;
  if (st.phase !== 'playing') return;
  st.phase = 'paused';
  st.roundId++;                       // vô hiệu hoá mọi timer của lượt đang dở
  _ddGameClearTimers(st);
  const arena = st.arenaEl || document.getElementById('dd-wp-arena');
  if (!arena) return;
  arena.querySelectorAll('.dd-wp-bubble').forEach(b => b.remove());
  if (arena.querySelector('.dd-wp-pause')) return;
  const ov = document.createElement('div');
  ov.className = 'dd-wp-pause';
  ov.innerHTML = `
    <div class="dd-wp-pause-icon">⏸</div>
    <div class="dd-wp-pause-title">Tạm dừng</div>
    <div class="dd-wp-pause-sub">Lượt này sẽ chơi lại từ đầu, không mất mạng.</div>
    <button class="dd-wp-pause-btn" onclick="window.app.ddGameWordPopResume()">▶ Chơi tiếp</button>`;
  arena.appendChild(ov);
}

function ddGameWordPopResume() {
  const st = ddGameState.wordpop;
  if (st.phase !== 'paused') return;
  const arena = st.arenaEl || document.getElementById('dd-wp-arena');
  if (arena) arena.querySelectorAll('.dd-wp-pause').forEach(n => n.remove());
  st.phase = 'playing';
  _ddWpStartRound();                  // chơi lại đúng từ đang dở
}

function _ddWpNextRound() {
  const st = ddGameState.wordpop;
  if (st.phase !== 'playing') return;

  if (st.queueIdx >= st.vocab.length) {
    st.queueIdx = 0;
    st.vocab = _ddShuffle(st.vocab);
    st.level = Math.min(st.level + 1, 6);
    const badge = document.getElementById('dd-wp-level-badge');
    if (badge) {
      badge.textContent = `🔥 Cấp ${st.level}`;
      badge.classList.add('is-hot');
    }
  }
  st.activeTarget = st.vocab[st.queueIdx++];
  _ddWpStartRound();
}

/** Bày bong bóng cho `st.activeTarget` — tách khỏi `_ddWpNextRound` để "chơi tiếp" sau
    khi tạm dừng bày lại đúng từ đó chứ không nhảy sang từ mới. */
function _ddWpStartRound() {
  const st = ddGameState.wordpop;
  const target = st.activeTarget;
  if (st.phase !== 'playing' || !target) return;

  st.roundId++;
  st.total++;
  const thisRoundId = st.roundId;

  const defEl = document.getElementById('dd-wp-target-def');
  const pyEl  = document.getElementById('dd-wp-target-pinyin');
  if (defEl) { defEl.textContent = target.def; defEl.classList.remove('pop'); void defEl.offsetWidth; defEl.classList.add('pop'); }
  if (pyEl)  pyEl.textContent  = target.pinyin;

  const arena = st.arenaEl || document.getElementById('dd-wp-arena');
  if (!arena) return;
  st.arenaEl = arena;
  arena.querySelectorAll('.dd-wp-bubble').forEach(b => b.remove());

  // Mồi nhử: lọc theo CHỮ HÁN chứ không theo chỉ số — vài bài có 2 mục cùng chữ Hán,
  // lọc theo chỉ số sẽ sinh ra một "mồi nhử" giống hệt đáp án, bấm vào lại bị tính sai.
  const pool = st.vocab.filter(w => w.hanzi !== target.hanzi);
  const soMoi = Math.min(2 + st.level, 5);
  const decoys = _ddShuffle(pool).slice(0, soMoi);

  const allItems = _ddShuffle([
    { word: target, isCorrect: true },
    ...decoys.map(w => ({ word: w, isCorrect: false })),
  ]);

  allItems.forEach((item, i) => {
    _ddGameLater(st, () => {
      if (st.phase !== 'playing' || st.roundId !== thisRoundId) return;
      _ddWpSpawnBubble(arena, item.word, item.isCorrect, st.level, thisRoundId, i);
    }, i * 320);
  });
}

function _ddWpSpawnBubble(arena, word, isCorrect, level, roundId, viTri) {
  const st = ddGameState.wordpop;
  if (st.phase !== 'playing' || st.roundId !== roundId) return;

  const id = `wp-b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const arenaW = arena.clientWidth || 600;
  const arenaH = arena.clientHeight || 420;
  const isMobile = window.innerWidth <= 560;
  const size = isMobile ? 62 : 74;
  const fontSize = word.hanzi.length >= 3 ? (isMobile ? 15 : 18) : (isMobile ? 20 : 24);
  // Chừa bề rộng bong bóng Ở CẢ HAI MÉP, cộng thêm 12px cho biên độ lắc ngang của
  // animation (keyframe 50% đẩy sang phải 10px) — thiếu phần này thì bong bóng sát mép
  // phải bị viền arena cắt mất một góc đúng lúc lắc ra.
  const maxLeft = Math.max(0, arenaW - size - 20);
  const left = 8 + Math.random() * Math.max(1, maxLeft - 8);
  // Rơi hết đúng chiều cao arena + đường kính bong bóng: hết animation cũng là lúc
  // bong bóng vừa khuất hẳn, không còn khoảng "đã biến mất nhưng vẫn tính giờ".
  const fall = arenaH + size + 20;
  const dur = Math.max(2.2, 5.0 - (level - 1) * 0.5);

  const el = document.createElement('div');
  el.className = `dd-wp-bubble ${_ddWpMauLop(viTri)}`;
  el.id = id;
  el.style.cssText = `width:${size}px;height:${size}px;font-size:${fontSize}px;left:${Math.round(left)}px;`
    + `--wp-fall:${fall}px;animation-duration:${dur}s`;
  el.textContent = word.hanzi;
  el.setAttribute('data-correct', isCorrect ? '1' : '0');
  el.onclick = () => ddGameWordPopClick(id, isCorrect, word, roundId);
  arena.appendChild(el);

  _ddGameLater(st, () => {
    if (!el.parentNode) return;
    el.remove();
    if (isCorrect && st.phase === 'playing' && st.roundId === roundId) {
      _ddGameAddMissed(st.missed, word);
      _ddWpMiss(arena);
    }
  }, dur * 1000 + 60);
}

function _ddWpScorePopup(arena, points, x, y, isCombo) {
  const el = document.createElement('div');
  el.className = `dd-wp-score-popup${isCombo ? ' combo' : ''}`;
  el.textContent = isCombo ? `🔥 COMBO x${ddGameState.wordpop.comboMulti}  +${points}` : `+${points}`;
  el.style.left = `${x}px`;
  el.style.top  = `${y}px`;
  arena.appendChild(el);
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

function ddGameWordPopClick(bubbleId, isCorrect, word, roundId) {
  const st = ddGameState.wordpop;
  if (st.phase !== 'playing') return;
  if (roundId !== undefined && st.roundId !== roundId) return;

  const bubble = document.getElementById(bubbleId);
  if (!bubble) return;
  const arena = st.arenaEl || document.getElementById('dd-wp-arena');

  if (isCorrect) {
    // Tăng roundId NGAY: timer "rơi hụt" của chính bong bóng này (và của mọi bong bóng
    // cùng lượt) không còn khớp roundId nên không thể trừ oan 1 mạng trong 380ms chờ.
    st.roundId++;
    bubble.classList.add('burst');
    st.hit++;
    st.combo++;
    st.bestCombo = Math.max(st.bestCombo, st.combo);
    st.comboMulti = st.combo >= 3 ? Math.min(4, 1 + Math.floor(st.combo / 3)) : 1;

    const points = (10 + st.level * 5) * st.comboMulti;
    st.score += points;

    if (arena) {
      const bRect = bubble.getBoundingClientRect();
      const aRect = arena.getBoundingClientRect();
      _ddWpScorePopup(arena, points, bRect.left - aRect.left + bRect.width / 2, bRect.top - aRect.top, st.comboMulti > 1);
      arena.querySelectorAll('.dd-wp-bubble').forEach(b => { if (b !== bubble) b.classList.add('fade-out'); });
    }

    _ddGameBeep(st.comboMulti > 1 ? 'combo' : 'correct');
    speakWord(word.hanzi, 'zh-TW');
    _ddWpUpdateHud();
    _ddGameLater(st, () => _ddWpNextRound(), 420);
  } else {
    bubble.classList.add('wrong-burst');
    st.combo = 0; st.comboMulti = 1;
    st.lives--;
    _ddGameAddMissed(st.missed, st.activeTarget);
    _ddGameBeep('wrong');
    _ddWpUpdateHud();

    if (arena) {
      arena.classList.add('shake');
      arena.addEventListener('animationend', () => arena.classList.remove('shake'), { once: true });
    }
    if (st.lives <= 0) {
      st.roundId++;                    // chặn nốt các timer của lượt đang dở
      _ddGameLater(st, () => _ddWpGameOver(), 420);
    }
  }
}

function _ddWpMiss(arena) {
  const st = ddGameState.wordpop;
  if (st.phase !== 'playing') return;
  st.combo = 0; st.comboMulti = 1;
  st.lives--;
  _ddGameBeep('wrong');
  _ddWpUpdateHud();
  if (arena) {
    arena.classList.add('shake');
    arena.addEventListener('animationend', () => arena.classList.remove('shake'), { once: true });
  }
  if (st.lives <= 0) { _ddWpGameOver(); return; }
  _ddWpNextRound();
}

function _ddWpGameOver() {
  const st = ddGameState.wordpop;
  st.phase = 'gameover';
  _ddGameClearTimers(st);
  const el = document.getElementById('dd-tab-content');
  if (!el) return;
  _ddGameBeep('lose');
  const sub = TB().subs.find(s => s.id === ddState.selectedSub);
  const rank = st.score >= 300 ? '🥇 Xuất sắc!' : st.score >= 150 ? '🥈 Giỏi lắm!' : '🥉 Cố lên!';
  const doChinhXac = st.total ? Math.round((st.hit / st.total) * 100) : 0;
  el.innerHTML = `
    <div class="dd-wp-wrap">
      ${_ddWpHudHtml()}
      <div class="dd-game-over">
        <div class="dd-game-over-emoji">💥</div>
        <h2>Hết lượt rồi!</h2>
        <p>${sub?.title || ddState.selectedSub}</p>
        <div class="dd-go-score">${st.score} điểm</div>
        ${_ddGameBestHtml('wordpop', st.score)}
        <div class="dd-game-stats">
          <div class="dd-game-stat"><b>${st.hit}/${st.total}</b><span>Bấm trúng</span></div>
          <div class="dd-game-stat"><b>${doChinhXac}%</b><span>Chính xác</span></div>
          <div class="dd-game-stat"><b>x${st.bestCombo}</b><span>Chuỗi dài nhất</span></div>
        </div>
        <p>${rank}</p>
        ${_ddGameSaveSlotHtml()}
        ${_ddGameMissedHtml(st.missed)}
        <div class="dd-game-over-btns">
          <button class="btn-restart" onclick="window.app.ddGameWordPopRestart()">🎈 Chơi lại</button>
          <button class="btn-back" onclick="window.app.ddGameBack()">Chọn game khác</button>
        </div>
      </div>
    </div>`;
  _ddGameLuuKetQua('wordpop', st, st.total, st.hit);
}

function ddGameWordPopRestart() {
  ddGameSelectMode('wordpop');
}

// ================================================================
// GAME 2 — CỨU CHÚ ONG TẺN (Bee Rescue)
// ================================================================
// Đổi 2026-09-04: song sắt lồng giờ vỡ theo TIẾN ĐỘ GHÉP ĐÚNG, không phải theo số
// mạng đã mất. Bản cũ làm ngược hẳn câu chuyện của chính nó ("chọn chữ để PHÁ LỒNG
// cứu ong") — đoán sai thì song sắt vỡ, đoán đúng thì lồng vẫn nguyên, mà vỡ hết
// song lại là thua. Nay: ghép đúng chữ → vỡ một song → ghép xong cả từ thì ong bay
// ra; đoán sai chỉ mất tim.

const DD_BEE_MAX_LIVES = 5;

function _ddBeeFilterVocab(vocab) {
  return vocab.filter(w => {
    const n = [...w.hanzi].length;
    return n >= 1 && n <= 4;
  });
}

function _ddBeeInit(el) {
  const raw = ddGetVocab(ddState.selectedSub);
  let filtered = _ddBeeFilterVocab(raw);
  if (filtered.length < 3) filtered = [...raw];

  const st = ddGameState.bee;
  _ddGameClearTimers(st);
  Object.assign(st, {
    phase: 'playing',
    score: 0, lives: DD_BEE_MAX_LIVES, streak: 0,
    vocab: _ddShuffle(filtered),
    wordIdx: 0,
    guessedChars: new Set(),
    wrongChars: new Set(),
    filledSlots: [],
    wordClean: true,
    hintUsed: 0,
    missed: [],
    startAt: Date.now(),
    saved: false,
    _currentWord: null,
    _currentChars: [],
    _allChars: [],
  });
  _ddBeeLoadWord(el);
}

function _ddBeeLoadWord(el) {
  const st = ddGameState.bee;
  const target = el || document.getElementById('dd-tab-content');
  if (!target) return;
  if (st.wordIdx >= st.vocab.length) {
    st.phase = 'win';
    _ddBeeRenderWin(target);
    return;
  }

  const word = st.vocab[st.wordIdx];
  const chars = [...word.hanzi];
  st.guessedChars = new Set();
  st.wrongChars = new Set();
  st.filledSlots = chars.map(() => null);
  st.wordClean = true;
  st.hintUsed = 0;

  // Ngân hàng chữ nhiễu: lấy từ chữ Hán của các từ khác trong bài
  const allVocab = ddGetVocab(ddState.selectedSub);
  const decoyPool = new Set();
  allVocab.forEach(w => {
    if (w.hanzi !== word.hanzi) [...w.hanzi].forEach(c => decoyPool.add(c));
  });
  chars.forEach(c => decoyPool.delete(c));

  const decoyCount = Math.max(8, 14 - chars.length * 2);
  const decoys = _ddShuffle([...decoyPool]).slice(0, decoyCount);
  const allChars = _ddShuffle([...new Set([...chars, ...decoys])]);

  st._currentWord = word;
  st._currentChars = chars;
  st._allChars = allChars;
  _ddBeeRenderPlaying(target);
}

function _ddBeeHudHtml() {
  const st = ddGameState.bee;
  const lives = Array.from({ length: DD_BEE_MAX_LIVES }, (_, i) =>
    `<span class="${i >= st.lives ? 'lost' : ''}">❤️</span>`
  ).join('');
  return `
    <div class="dd-game-hud">
      <button class="dd-game-back-btn" onclick="window.app.ddGameBack()">
        <i class="fa-solid fa-arrow-left"></i> Chọn game
      </button>
      <div class="dd-game-score-wrap">
        <span class="dd-game-score-label">Điểm</span>
        <span class="dd-game-score" id="dd-bee-score">${st.score}</span>
      </div>
      ${st.streak >= 2 ? `<span class="dd-game-combo visible">🔥 ${st.streak} từ liền</span>` : ''}
      <div class="dd-game-hud-right">
        <div class="dd-game-lives" id="dd-bee-lives">${lives}</div>
        ${_ddGameSoundBtnHtml()}
      </div>
    </div>`;
}

/** Song sắt vỡ dần theo số ô ĐÃ ĐIỀN ĐÚNG (không phải theo mạng đã mất). */
function _ddBeeCageHtml() {
  const st = ddGameState.bee;
  const tong = st._currentChars.length || 1;
  const xong = st.filledSlots.filter(Boolean).length;
  const bars = Array.from({ length: 5 }, (_, i) => {
    const broken = Math.round((xong / tong) * 5) > i;
    return `<div class="dd-bee-bar${broken ? ' broken' : ''}"></div>`;
  }).join('');
  return `
    <div class="dd-bee-cage-wrap">
      <div class="dd-bee-cage">
        <div class="dd-bee-cage-oval"></div>
        <div class="dd-bee-bars" id="dd-bee-bars">${bars}</div>
        <span class="dd-bee-mascot" id="dd-bee-mascot">🐝</span>
      </div>
      <div class="dd-bee-lives-label" id="dd-bee-cage-label">${xong}/${tong} song sắt</div>
    </div>`;
}

function _ddBeeRenderPlaying(el) {
  const st = ddGameState.bee;
  const word = st._currentWord;
  const chars = st._currentChars;
  const total = st.vocab.length;
  const pct = Math.round((st.wordIdx / total) * 100);
  const best = _ddGameGetBest('bee', ddState.selectedSub);

  const slotsHtml = chars.map((_, i) => {
    const filled = st.filledSlots[i];
    return `<div class="dd-bee-slot ${filled ? 'filled' : ''}" id="dd-bee-slot-${i}">${filled || ''}</div>`;
  }).join('');

  const charsHtml = st._allChars.map((c, i) => {
    let cls = '';
    if (st.guessedChars.has(c) && chars.includes(c)) cls = 'guessed-correct';
    else if (st.wrongChars.has(c)) cls = 'guessed-wrong';
    const safeC = c.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `<button class="dd-bee-char-btn ${cls}" id="dd-bee-c-${i}"
      onclick="window.app.ddGameBeeGuess('${safeC}', ${i})"
      ${cls ? 'disabled' : ''}>${c}</button>`;
  }).join('');

  el.innerHTML = `
    <div class="dd-bee-wrap">
      ${_ddBeeHudHtml()}
      <div class="dd-bee-clue">
        <div class="dd-bee-clue-pos">${word.pos || ''}</div>
        <div class="dd-bee-clue-def">${word.def}</div>
        <div class="dd-bee-progress">Từ ${st.wordIdx + 1} / ${total}${best > 0 ? ` · 🏆 Kỷ lục ${best}` : ''}</div>
        <div class="dd-bee-progress-bar-wrap">
          <div class="dd-bee-progress-bar" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="dd-bee-main">
        ${_ddBeeCageHtml()}
        <div class="dd-bee-slots-area">
          <div class="dd-bee-slots">${slotsHtml}</div>
          <div class="dd-bee-pinyin-hint" id="dd-bee-pinyin-hint"></div>
          <button class="dd-bee-hint-btn" id="dd-bee-hint-btn" onclick="window.app.ddGameBeeHint()">
            <i class="fa-solid fa-lightbulb"></i><span>Gợi ý <em>(-15 điểm)</em></span>
          </button>
        </div>
      </div>
      <div class="dd-bee-char-grid-wrap">
        <div class="dd-bee-char-grid-label">Chọn chữ Hán để điền vào ô trống</div>
        <div class="dd-bee-char-grid">${charsHtml}</div>
      </div>
    </div>`;
}

function _ddBeeUpdateCage() {
  const st = ddGameState.bee;
  const barsEl = document.getElementById('dd-bee-bars');
  if (!barsEl) return;
  const tong = st._currentChars.length || 1;
  const xong = st.filledSlots.filter(Boolean).length;
  barsEl.querySelectorAll('.dd-bee-bar').forEach((bar, i) => {
    bar.classList.toggle('broken', Math.round((xong / tong) * 5) > i);
  });
  const label = document.getElementById('dd-bee-cage-label');
  if (label) label.textContent = `${xong}/${tong} song sắt`;
}

function _ddBeeUpdateLives() {
  const st = ddGameState.bee;
  const livesEl = document.getElementById('dd-bee-lives');
  if (livesEl) {
    livesEl.innerHTML = Array.from({ length: DD_BEE_MAX_LIVES }, (_, i) =>
      `<span class="${i >= st.lives ? 'lost' : ''}">❤️</span>`
    ).join('');
  }
}

function _ddBeeSetScore(score) {
  ddGameState.bee.score = Math.max(0, score);
  const el = document.getElementById('dd-bee-score');
  if (el) {
    el.textContent = ddGameState.bee.score;
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  }
}

/** Gợi ý: lần 1 hiện phiên âm, các lần sau mở sẵn 1 ô còn trống. Trừ 15 điểm mỗi lần. */
function ddGameBeeHint() {
  const st = ddGameState.bee;
  if (st.phase !== 'playing') return;
  const word = st._currentWord;
  const chars = st._currentChars;
  st.wordClean = false;
  st.hintUsed++;
  _ddBeeSetScore(st.score - 15);

  if (st.hintUsed === 1) {
    const hint = document.getElementById('dd-bee-pinyin-hint');
    if (hint) { hint.textContent = `💡 ${word.pinyin}`; hint.classList.add('is-hint'); }
    return;
  }
  const troi = chars.map((c, i) => (st.filledSlots[i] ? null : { c, i })).filter(Boolean);
  if (!troi.length) return;
  const chon = troi[Math.floor(Math.random() * troi.length)];
  const btnIdx = st._allChars.indexOf(chon.c);
  ddGameBeeGuess(chon.c, btnIdx >= 0 ? btnIdx : -1, true);
}

function ddGameBeeGuess(char, btnIdx, tuGoiY) {
  const st = ddGameState.bee;
  if (st.phase !== 'playing') return;

  const word = st._currentWord;
  const chars = st._currentChars;
  const mascot = document.getElementById('dd-bee-mascot');

  if (chars.includes(char) && !st.guessedChars.has(char)) {
    st.guessedChars.add(char);
    chars.forEach((c, i) => {
      if (c === char && !st.filledSlots[i]) {
        st.filledSlots[i] = char;
        const slotEl = document.getElementById(`dd-bee-slot-${i}`);
        if (slotEl) { slotEl.textContent = char; slotEl.className = 'dd-bee-slot filled'; }
      }
    });
    const btn = document.getElementById(`dd-bee-c-${btnIdx}`);
    if (btn) { btn.className = 'dd-bee-char-btn guessed-correct'; btn.disabled = true; }

    _ddBeeUpdateCage();               // ghép đúng = phá thêm một song sắt
    if (!tuGoiY) _ddGameBeep('correct');
    if (mascot) {
      mascot.className = 'dd-bee-mascot jump';
      mascot.addEventListener('animationend', () => { mascot.className = 'dd-bee-mascot'; }, { once: true });
    }

    if (st.filledSlots.every(s => s !== null)) _ddBeeWordDone(word, chars, mascot);
    return;
  }

  if (!chars.includes(char)) {
    st.wrongChars.add(char);
    st.wordClean = false;
    const btn = document.getElementById(`dd-bee-c-${btnIdx}`);
    if (btn) { btn.className = 'dd-bee-char-btn guessed-wrong'; btn.disabled = true; }
    st.lives--;
    st.streak = 0;
    _ddGameAddMissed(st.missed, word);
    _ddGameBeep('wrong');
    _ddBeeUpdateLives();

    const cage = document.querySelector('.dd-bee-cage');
    if (cage) {
      cage.classList.add('shake');
      cage.addEventListener('animationend', () => cage.classList.remove('shake'), { once: true });
    }
    if (mascot) {
      mascot.className = 'dd-bee-mascot sad';
      mascot.addEventListener('animationend', () => { mascot.className = 'dd-bee-mascot'; }, { once: true });
    }
    if (st.lives <= 0) {
      st.phase = 'gameover';
      _ddGameLater(st, () => _ddBeeRenderGameOver(), 600);
    }
  }
}

function _ddBeeWordDone(word, chars, mascot) {
  const st = ddGameState.bee;
  const hint = document.getElementById('dd-bee-pinyin-hint');
  if (hint) { hint.textContent = `✓ ${word.pinyin}`; hint.classList.remove('is-hint'); }
  chars.forEach((_, i) => {
    const slotEl = document.getElementById(`dd-bee-slot-${i}`);
    if (slotEl) slotEl.className = 'dd-bee-slot correct-word';
  });
  const hintBtn = document.getElementById('dd-bee-hint-btn');
  if (hintBtn) hintBtn.disabled = true;
  if (mascot) {
    mascot.className = 'dd-bee-mascot free';
    mascot.addEventListener('animationend', () => { mascot.className = 'dd-bee-mascot'; }, { once: true });
  }

  // Ghép sạch (không sai, không xin gợi ý) thì được thưởng và hồi 1 tim — 5 mạng cho
  // cả bài 20+ từ mà không có đường hồi thì gần như chắc chắn thua giữa chừng.
  if (st.wordClean) {
    st.streak++;
    if (st.lives < DD_BEE_MAX_LIVES) { st.lives++; _ddBeeUpdateLives(); }
  } else {
    st.streak = 0;
  }
  const bonus = 10 * chars.length + 5 * st.lives + (st.wordClean ? 15 : 0) + Math.min(st.streak, 5) * 5;
  _ddBeeSetScore(st.score + bonus);
  _ddGameBeep('win');
  speakWord(word.hanzi, 'zh-TW');

  _ddGameLater(st, () => { st.wordIdx++; _ddBeeLoadWord(); }, 1400);
}

function _ddBeeRenderGameOver() {
  const st = ddGameState.bee;
  const el = document.getElementById('dd-tab-content');
  if (!el) return;
  _ddGameBeep('lose');
  const word = st._currentWord;
  el.innerHTML = `
    <div class="dd-bee-wrap">
      ${_ddBeeHudHtml()}
      <div class="dd-game-over">
        <div class="dd-game-over-emoji">😢</div>
        <h2>Chú ong chưa được cứu!</h2>
        <p>Từ đang ghép dở: <strong class="dd-go-word font-tc">${H(word?.hanzi || '')}</strong> — ${word?.pinyin || ''}</p>
        <p>${word?.def || ''}</p>
        <div class="dd-go-score">${st.score} điểm</div>
        ${_ddGameBestHtml('bee', st.score)}
        <div class="dd-game-stats">
          <div class="dd-game-stat"><b>${st.wordIdx}/${st.vocab.length}</b><span>Từ đã cứu</span></div>
        </div>
        ${_ddGameSaveSlotHtml()}
        ${_ddGameMissedHtml(st.missed)}
        <div class="dd-game-over-btns">
          <button class="btn-restart" onclick="window.app.ddGameBeeRestart()">🐝 Chơi lại</button>
          <button class="btn-back" onclick="window.app.ddGameBack()">Chọn game khác</button>
        </div>
      </div>
    </div>`;
  _ddGameLuuKetQua('bee', st, st.vocab.length, st.wordIdx);
}

function _ddBeeRenderWin(el) {
  const st = ddGameState.bee;
  if (!el) el = document.getElementById('dd-tab-content');
  if (!el) return;
  _ddGameBeep('win');
  const sub = TB().subs.find(s => s.id === ddState.selectedSub);
  el.innerHTML = `
    <div class="dd-bee-wrap">
      ${_ddBeeHudHtml()}
      <div class="dd-game-over">
        <div class="dd-game-over-emoji">🎉</div>
        <h2>Chú ong tự do rồi!</h2>
        <p>Bạn đã phá lồng thành công ${st.vocab.length} từ của ${sub?.title || 'bài này'}!</p>
        <div class="dd-go-score">${st.score} điểm 🏆</div>
        ${_ddGameBestHtml('bee', st.score)}
        <p>${st.score >= 400 ? '🥇 Thiên tài từ vựng!' : st.score >= 200 ? '🥈 Rất giỏi!' : '🥉 Tốt lắm!'}</p>
        ${_ddGameSaveSlotHtml()}
        ${_ddGameMissedHtml(st.missed)}
        <div class="dd-game-over-btns">
          <button class="btn-restart" onclick="window.app.ddGameBeeRestart()">🐝 Chơi lại</button>
          <button class="btn-back" onclick="window.app.ddGameBack()">Chọn game khác</button>
        </div>
      </div>
    </div>`;
  _ddGameLuuKetQua('bee', st, st.vocab.length, st.wordIdx);
}

function ddGameBeeRestart() {
  ddGameSelectMode('bee');
}


/**
 * NẠP NỘI DUNG QUYỂN RỒI MỚI VẼ (2026-09-06, xem CLAUDE.md 4.30).
 *
 * Từ vựng/ngữ pháp/hội thoại/luyện viết của 11 quyển nặng 11 MB nên không còn nằm trong bundle
 * chính; mỗi quyển là một chunk tải riêng. Danh MỤC bài thì vẫn tĩnh, nên khung + danh sách bài
 * bên trái hiện ngay, chỉ phần nội dung chờ.
 *
 * Quyển đã nằm sẵn trong bộ nhớ thì vẽ THẲNG, không qua skeleton — nếu không, mỗi lần đổi tab
 * trong cùng một bài lại nháy một nhịp khung xương.
 */
function renderDuongdai(el) {
  const tb = ddState.tb;
  const key = ddParentKey(ddState.selectedSub) || ddParentKey(TB().subs[0].id);

  // Bài trước/sau cùng quyển: nạp NGẦM để bấm sang bài kế tiếp là thấy ngay. Cũng là lưới an
  // toàn cho `getDistractorPool` — nó mượn từ bài lân cận khi bài hiện tại có dưới 3 từ.
  const dsBai = TB().lessons.filter((l) => l.book === (TB().parseId(key)?.book ?? 1));
  const i = dsBai.findIndex((l) => l.id === key);
  const lanCan = [dsBai[i - 1]?.id, dsBai[i + 1]?.id].filter(Boolean);

  if (daNapBai(key)) { napNgam(tb, lanCan); return ddRenderNgay(el); }

  el.innerHTML = ddSkeletonHtml();
  const sub = ddState.selectedSub;
  napBai(tb, key).then(() => {
    napNgam(tb, lanCan);
    // Người dùng có thể đã sang trang/bài khác trong lúc chờ -> đừng vẽ đè lên trang mới.
    if (ddState.tb !== tb || ddState.selectedSub !== sub) return;
    const now = document.getElementById('page-content');
    if (now) ddRenderNgay(now);
  }).catch((e) => {
    console.warn('Nạp nội dung bài thất bại:', e);
    const now = document.getElementById('page-content');
    if (now) now.innerHTML = `<div class="dd-soon-panel"><i class="fa-solid fa-triangle-exclamation"></i>
      <span>Không tải được nội dung bài học. Kiểm tra kết nối mạng rồi
      <button class="btn btn-primary btn-sm" onclick="window.app.navigate(state.currentPage)">thử lại</button>.</span></div>`;
  });
}

/** Khung xương lúc chờ chunk nội dung — giữ đúng bố cục 2 cột để trang không nhảy. */
function ddSkeletonHtml() {
  const dong = (n) => Array.from({ length: n }, () => '<div class="tw-sk" style="height:38px;margin-bottom:8px"></div>').join('');
  return `<div class="dd-container dd-container--loading">
      <aside class="dd-sidebar"><div style="padding:14px">${dong(9)}</div></aside>
      <section class="dd-main"><div style="padding:18px">
        <div class="tw-sk" style="height:26px;width:46%;margin-bottom:14px"></div>
        <div class="tw-sk" style="height:44px;margin-bottom:18px"></div>
        ${dong(6)}
      </div></section>
    </div>`;
}

function ddRenderNgay(el) {
  // Hai chế độ dùng CHUNG khung sidebar nhưng khác hẳn nửa bên phải:
  //   'normal'  — bài con x.1/x.2: có thanh tab + nội dung tab
  //   'culture' — mục "Văn Hóa Trung Hoa" (id "5.vh"): chỉ có bài đọc, KHÔNG có thanh tab
  // Đánh dấu bằng container.dataset.mode để nhánh cập-nhật-tại-chỗ bên dưới biết lúc nào
  // buộc phải dựng lại DOM. Thiếu dấu này thì đổi qua lại giữa 2 chế độ chỉ đổi nội dung
  // bên trong mà khung cũ vẫn nguyên — sang bài văn hoá vẫn thấy thanh tab của bài trước.
  const cultureId = ddCultureLesson();
  const mode = cultureId ? 'culture' : 'normal';
  const cultureSub = cultureId ? TB().culture.find(c => c.parentId === cultureId) : null;
  const currentSub = cultureSub
    || TB().subs.find(s => s.id === ddState.selectedSub)
    || TB().subs[0];
  const parentLessonId = cultureId || ddParentKey(currentSub.id);
  if (parentLessonId) ddState.openLessons.add(parentLessonId);
  const book = TB().bookOf(currentSub.book) || TB().books[0];
  const bookLessons = TB().lessons.filter(l => l.book === book.id);

  // Đổi QUYỂN (hoặc đổi BỘ giáo trình) thì danh sách bài bên trái khác hẳn -> phải dựng lại DOM,
  // không cập nhật tại chỗ. Thiếu data-tb thì sang Thời Đại vẫn thấy danh sách bài Đương đại.
  const container = el.querySelector('.dd-container');
  if (container && container.dataset.mode === mode && container.dataset.book === String(book.id)
      && container.dataset.tb === ddState.tb) {
    const sb = container.querySelector('.dd-sidebar');
    if (sb) sb.classList.toggle('open', !!ddState.mobileListOpen);

    const currentText = container.querySelector('.dd-sidebar-current');
    if (currentText) currentText.textContent = `${book.label} · ${currentSub.title.replace(' - ', ' · ')}`;

    container.querySelectorAll('.dd-lesson-group').forEach(group => {
      const gId = group.getAttribute('data-lesson');
      const isParent = gId === parentLessonId;
      group.classList.toggle('has-active', isParent);
      if (isParent || ddState.openLessons.has(gId)) {
        group.classList.add('open');
      }
    });

    container.querySelectorAll('[data-sub]').forEach(item => {
      const isCur = item.getAttribute('data-sub') === currentSub.id;
      item.classList.toggle('active', isCur);
      // Hàng bài MỘT phần: cha và con là một, nên tô luôn `has-active` cho khối bao ngoài.
      const don = item.closest('.dd-lesson-group--don');
      if (don) don.classList.toggle('has-active', isCur);
    });

    const mainTitle = container.querySelector('.dd-main-title');
    if (mainTitle) mainTitle.textContent = cultureId ? `Văn Hóa Trung Hoa — ${tbLabel(cultureId)}` : currentSub.title;
    const mainRange = container.querySelector('.dd-main-range');
    if (mainRange) {
      mainRange.textContent = cultureId
        ? 'Bài đọc văn hóa'
        : (currentSub.count ? `Từ ${currentSub.from} → ${currentSub.to} (${currentSub.count} từ)` : 'Đang biên soạn');
    }

    container.querySelectorAll('.dd-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === ddState.activeTab);
    });

    el.scrollTop = 0;
    const pcUp = document.getElementById('page-content');
    if (pcUp) pcUp.scrollTop = 0;
    if (cultureId) ddRenderCulture(container.querySelector('#dd-tab-content'));
    else ddRenderTabContent();

    updateNavBooks();
    requestAnimationFrame(() => {
      ddScrollSidebarToActive(true);
    });
    return;
  }

  el.innerHTML = `
    <div class="dd-container" data-mode="${mode}" data-book="${book.id}" data-tb="${ddState.tb}">
      <!-- Sidebar: Lesson list -->
      <div class="dd-sidebar ${ddState.mobileListOpen ? 'open' : ''}">
        <button class="dd-sidebar-header" onclick="window.app.ddToggleMobileList()">
          <i class="fa-solid fa-book-open"></i>
          <span class="dd-sidebar-name">${book.title}</span>
          <span class="dd-sidebar-current">${book.label} · ${currentSub.title.replace(' - ', ' · ')}</span>
          <i class="fa-solid fa-chevron-down dd-sidebar-caret"></i>
        </button>
        <!-- Chọn quyển: 4 nút, quyển chưa có dữ liệu vẫn bấm được (mở danh mục bài + bảng "đang biên soạn") -->
        <div class="dd-book-tabs" role="tablist" aria-label="Chọn quyển">
          ${TB().books.map(b => {
            const ready = TB().lessons.some(l => l.book === b.id && l.total > 0);
            return `
            <button class="dd-book-tab ${b.id === book.id ? 'active' : ''} ${ready ? '' : 'is-soon'}" role="tab"
              aria-selected="${b.id === book.id}" title="${b.title} — ${b.level}${ready ? '' : ' (đang biên soạn)'}"
              onclick="window.app.ddSelectBook(${b.id})">
              <span class="dd-book-tab-num">${b.id}</span>
              <span class="dd-book-tab-lv">${b.level.replace('TOCFL ', '')}</span>
            </button>`;
          }).join('')}
        </div>
        <div class="dd-lesson-list">
          ${bookLessons.map(lesson => {
            const isOpen = ddState.openLessons.has(lesson.id);
            const isParent = lesson.id === parentLessonId;
            const subs = TB().subs.filter(s => s.parentId === lesson.id);
            // HSK: mỗi bài chỉ có MỘT phần (`.1`) nên hàng con "Bài 1.1" chỉ là bản sao của
            // chính hàng cha — bỏ đi, bấm thẳng vào bài. Hai bộ giáo trình có 2-3 phần thật
            // nên vẫn giữ nguyên cách cũ. Nhận ra bằng chính số phần, không hardcode tên bộ.
            const motPhan = subs.length === 1 && !TB().culture.some(c => c.parentId === lesson.id);
            if (motPhan) {
              const sub = subs[0];
              return `
              <div class="dd-lesson-group dd-lesson-group--don ${sub.id === ddState.selectedSub ? 'has-active' : ''}" data-lesson="${lesson.id}">
                <div class="dd-lesson-header ${sub.id === ddState.selectedSub ? 'active' : ''}"
                  data-sub="${sub.id}" onclick="window.app.ddSelectSub('${sub.id}')">
                  <i class="fa-solid fa-file-lines dd-lesson-chevron dd-lesson-chevron--don"></i>
                  <div class="dd-lesson-title">
                    <span class="dd-lesson-name">Bài ${lesson.num}</span>
                    <span class="dd-lesson-hanzi font-tc">${H(lesson.hanzi)}</span>
                  </div>
                  ${ddDauKhoaHtml(lesson.id)}
                  <span class="dd-lesson-badge ${lesson.total ? '' : 'dd-lesson-badge--soon'}">${lesson.total || 'Sắp có'}</span>
                </div>
              </div>`;
            }
            return `
            <div class="dd-lesson-group ${isOpen ? 'open' : ''} ${isParent ? 'has-active' : ''}" data-lesson="${lesson.id}">
              <div class="dd-lesson-header" onclick="window.app.ddToggleLesson('${lesson.id}')">
                <i class="fa-solid fa-chevron-right dd-lesson-chevron"></i>
                <div class="dd-lesson-title">
                  <span class="dd-lesson-name">Bài ${lesson.num}</span>
                  <span class="dd-lesson-hanzi font-tc">${H(lesson.hanzi)}</span>
                </div>
                ${ddDauKhoaHtml(lesson.id)}
                <span class="dd-lesson-badge ${lesson.total ? '' : 'dd-lesson-badge--soon'}">${lesson.total || 'Sắp có'}</span>
              </div>
              <div class="dd-lesson-children">
                ${subs.map(sub => `
                  <div class="dd-sub-item ${sub.id === ddState.selectedSub ? 'active' : ''}" data-sub="${sub.id}" onclick="window.app.ddSelectSub('${sub.id}')">
                    <i class="fa-solid fa-file-lines"></i>
                    <span>Bài ${sub.num}.${sub.part}</span>
                    <span class="dd-sub-count ${sub.count ? '' : 'dd-sub-count--soon'}">${sub.count ? `${sub.count} từ` : 'Sắp có'}</span>
                  </div>`).join('')}
                ${(() => {
                  // Mục đọc thêm, luôn đứng CUỐI — sau bài x.1 / x.2 của cùng bài cha.
                  const vh = TB().culture.find(c => c.parentId === lesson.id);
                  if (!vh) return '';
                  return `
                  <div class="dd-sub-item dd-sub-item--vh ${vh.id === ddState.selectedSub ? 'active' : ''}" data-sub="${vh.id}" onclick="window.app.ddSelectSub('${vh.id}')">
                    <i class="fa-solid fa-torii-gate"></i>
                    <span>${vh.title}</span>
                    <span class="dd-sub-count dd-sub-count--vh">Đọc thêm</span>
                  </div>`;
                })()}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Main content -->
      <div class="dd-main">
        <div class="dd-main-header">
          <span class="dd-book-badge" title="${book.title}"><i class="fa-solid fa-book"></i> ${book.label} · ${book.level}</span>
          <h2 class="dd-main-title">${cultureId ? `Văn Hóa Trung Hoa — ${tbLabel(cultureId)}` : currentSub.title}</h2>
          <span class="dd-main-range">${cultureId ? 'Bài đọc văn hóa' : (currentSub.count ? `Từ ${currentSub.from} → ${currentSub.to} (${currentSub.count} từ)` : 'Đang biên soạn')}</span>
        </div>

        ${cultureId ? '' : `
        <!-- Thanh tab. Lớp bọc .dd-tab-wrap là chỗ neo khi cuộn VÀ là nơi vẽ dải mờ báo "còn tab
             bên phải" — trên màn hẹp thanh tab là một hàng cuộn ngang, dải mờ đặt bên trong vùng
             cuộn sẽ trôi theo nội dung rồi biến mất ngay khi vuốt. -->
        <div class="dd-tab-wrap">
          <div class="dd-tab-bar">
            <span class="dd-tab-ink"></span>
            ${TB().tabs.map(tab => `
              <button class="dd-tab-btn ${tab.id === ddState.activeTab ? 'active' : ''} ${!tab.implemented ? 'disabled' : ''}"
                data-tab="${tab.id}" onclick="window.app.ddSelectTab('${tab.id}')">
                <i class="${tab.icon}"></i>
                <span>${tab.label}</span>
              </button>`).join('')}
          </div>
        </div>`}

        <!-- Tab content -->
        <div id="dd-tab-content" class="dd-tab-content"></div>
      </div>
    </div>`;

  if (cultureId) ddRenderCulture(el.querySelector('#dd-tab-content'));
  else ddRenderTabContent();

  updateNavBooks();
  setTimeout(() => {
    ddScrollSidebarToActive(false);
  }, 60);
}

// ============================================================
// EXPOSE PUBLIC API
// ============================================================
// ============================================================
// CẦU NỐI cho module trang nạp động (4.40)
// ============================================================
// Ba module trong `src/pages/` cần gọi ngược vào những thứ nằm ở đây (router, giáo trình, TTS).
// Import thẳng `main.js` từ module là sinh VÒNG LẶP, nên đi qua `core/app.js`: main.js ghi vào
// một lần, module chỉ đọc ra. Đăng ký NGAY TRƯỚC `window.app` để mọi hàm đều đã được định nghĩa.
//
// ⚠️ Cầu nối không có kiểm tra tĩnh — gõ sai tên ở đây thì tới lúc chạy mới biết. Thêm tên mới
//    thì phải chạy lại bộ kiểm giao diện (nó mở đủ 14 trang của ba module).
dangKy({
  navigate,
  updateUrl,
  openAuth,
  getDisplayText,
  ddSpeakWord,
  napTruocAudioTu,
  datDsDoc,
  nutDocHtml,
  ddMoveTabInk,
  toggleCharMode,
  napHanziWriter,
  notifLessonName,
  assignmentLabel,
  openAssignment,
  toggleNotifications,
});

window.app = {
  // ⚠️ 55 handler của ba khu NẠP ĐỘNG (Từ vựng & Hán tự · Lộ trình · Cộng đồng) KHÔNG nằm ở
  //    đây — chúng được `napModuleTrang()` gắn thêm vào `window.app` ngay khi module tải xong
  //    (xem `handlers` ở cuối mỗi file trong src/pages/). Thêm tay vào đây là ReferenceError.
  ddDocTatCa,

  // HSK — thi thử (4.34c)
  hskExamMoDe, hskExamChon, hskExamViet, hskExamNop, hskExamVeChonDe, hskExamLoc,
  luyenChonNguon,
  lnNoiThu,
  hskExamHenGio,

  // HSK — ngữ pháp (4.34)
  hskGramLoc, hskGramSpeak,

  // HSK — trang tra cứu từ vựng theo cấp (4.34)
  hskVocabSetCap, hskVocabTim, hskVocabSetPos, hskVocabThuLai,

  // TOCFL — từ vựng theo cấp (華語八千詞)
  tvMoCap, tvVeChonCap, tvSelectTab, tvTim, tvLoai, tvTrang, tvDoiChu, tvToggle,
  tvFcFlip, tvFcNav, tvFcShuffle,
  tvQuizStart, tvQuizChon, tvQuizNav, tvQuizNop, tvQuizThoat,

  // Trang chủ (viết lại 2026-09-10)
  tcMoBai, tcNapSoLieu, tcNapCongDong, tcMoBaiCd,

  navigate,
  toggleMenu,
  closeMobileSidebar,
  openAuth,
  closeAuth,
  showRegister,
  logout,
  toggleCharMode,
  toggleMobileSidebar,
  toggleMascot,
  openModal,
  closeModal,
  openDialog,
  closeDialog,
  moChanDoanManHinh,
  chepChanDoan,
  taiLaiSach,
  tatThuocDo,
  batThuocDo,
  openExamSetup,
  startExam,
  startTocflExam,

  // Bài cô giao (dashboard)
  openAssignment,
  // Giáo viên nhận xét khi xem lại bài học sinh (?review=<id>)
  ddSubmitTeacherReview,
  // Audio TTS
  speakWord,
  // Flashcard
  fcFlip,
  fcRate,
  fcSelectLesson,
  // Quiz
  quizAnswer,
  quizNext,
  // Writing
  // Hội thoại (viết lại 2026-09-16 — chạy trên 324 bài thật, xem renderDialogue)
  toggleDialoguePinyin,
  toggleDialogueTrans,
  htChonBai,
  htNgheCau,
  htTheoDoi,
  // Luyện nói
  lnChonBai,
  lnNgheCau,
  // Exam
  examAnswer,
  examNext,
  examPrev,
  endExam,
  tdLuuNhanh,
  // Shadowing
  // Học phát âm
  pronPlay,
  pronPlayToneSet,
  pronSetGroup,
  pronQuizStart,
  pronQuizAnswer,
  pronQuizNext,
  pronSetSpeed,
  // Tài khoản
  // User Menu Dropdown
  toggleUserMenu,
  closeUserMenu,
  userMenuAuthAction,
  triggerAvatarUpload,
  handleAvatarFileChange,
  // Blog
  // Giáo trình đương đại
  ddToggleLesson,
  ddSelectSub,
  ddSelectBook,
  // Tường nội dung trả phí (2026-09-09)
  moBangGia, ddVeBaiMo,
  ddGoBook,
  ddCultureSpeak,
  ddCultureJump,
  ddSelectTab,
  ddToggleVocab,
  ddFcFlip,
  ddFcNav,
  ddFcShuffle,
  ddToggleMobileList,
  ddScrollSidebarToActive,
  ddSpeakWord,
  // Hội thoại đương đại
  ddDlgTogglePlay,
  ddDlgGoCue,
  ddDlgPrevCue,
  ddDlgNextCue,
  ddDlgToggleLoop,
  ddDlgTogglePinyin,
  ddDlgToggleTrans,
  ddDlgSetSpeed,
  // Bài tập đương đại
  ddExStart,
  ddExSelect,
  ddExSubmit,
  ddExReset,
  ddSwitchTab,
  // Luyện tập tổng hợp (Onllang)
  ddOnllangOpen: ddOnllangOpenView,
  ddOnllangBack: ddOnllangBackToIdle,
  ddOnllangChon,
  ddOnllangThanhCombo,
  ddOnllangODien,
  ddOnllangDien,
  ddOnllangGhep,
  ddOnllangGhepChon,
  ddOnllangNopTatCa,
  // Dịch Trung-Việt
  ddTranslateSetMode,
  ddTranslateSaveAnswer,
  ddTranslateNopCau,
  ddTranslateNgheMau,
  ddTranslateDaDoc,
  ddTranslateLuuLai,
  ddTranslateReset,
  // Luyện viết đương đại
  ddWriteMode,
  ddWriteNav,
  ddWriteGoTo,
  ddWriteMarkDone,
  ddWriteReset,
  ddWriteSubmit,
  
  // Notifications
  toggleNotifications,
  readNotification,
  setNotifTab,
  markAllNotificationsRead,
  toggleReviewList,
  // Games — Word Pop & Bee Rescue
  ddGameSelectMode,
  ddGameBack,
  ddGameWordPopClick,
  ddGameWordPopRestart,
  ddGameWordPopResume,
  ddGameBeeGuess,
  ddGameBeeHint,
  ddGameBeeRestart,
  ddGameToggleSound,
  ddGameSpeakMissed,
};

// ============================================================
// Con trượt thanh tab phải đo lại khi bề ngang đổi (thanh tab wrap sang hàng khác)
// và khi web font tải xong (nút rộng ra vài px). Đo hụt thì con trượt lệch khỏi nút.
// ============================================================
let _twInkTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(_twInkTimer);
  _twInkTimer = setTimeout(ddMoveTabInk, 120);
});
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => setTimeout(ddMoveTabInk, 60));
}

// ============================================================
// START APP
// ============================================================
// Script nạp bằng type="module" nên luôn chạy sau khi DOM sẵn sàng.
// TRƯỚC ĐÂY gọi init() cả ở đây lẫn trong DOMContentLoaded -> đăng ký 2 listener,
// mỗi lần đổi trang render 3 lần. Chỉ gọi ĐÚNG MỘT LẦN.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
