// ============================================================
// TRANG: HƯỚNG DẪN — CÀI APP (PWA) & CÁCH TẠO TÀI KHOẢN (2026-10-05)
// ============================================================
// Module NẠP ĐỘNG (4.40): Tách thành trang nạp động theo route để không làm phình
// bundle chính `main.js`. Dùng chung các tiện ích lõi và hệ thống design tokens.
import { app } from '../core/app.js';
import { state } from '../core/state.js';
import { tdEsc, toast, twPlayEnter } from '../core/ui.js';

let hdOsTab = 'auto'; // 'auto' | 'ios' | 'android'

function nhanDienOs() {
  if (hdOsTab !== 'auto') return hdOsTab;
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  if (/Android/i.test(ua)) {
    return 'android';
  }
  return 'ios';
}

// ============================================================
// 1. TRANG: HƯỚNG DẪN CÀI ĐẶT APP (PWA)
// ============================================================
export function renderGuideCaiApp(el) {
  const currentOs = nhanDienOs();
  const coCaiNhanh = typeof window.app?.coTheCaiNhanh === 'function' && window.app.coTheCaiNhanh();

  el.innerHTML = `
    <div class="hd-wrap">
      <!-- Hero Header -->
      <div class="tv-hero">
        <div class="tv-hero-text">
          <span class="tv-hero-badge"><i class="fa-solid fa-mobile-screen-button"></i> TIỆN ÍCH PWA</span>
          <h1>Cài Đặt App ITaiwan</h1>
          <p>
            Chỉ mất <strong>10 giây</strong> để cài ứng dụng ra màn hình chính điện thoại.
            Học tập toàn màn hình, mở bài học tức thì, không tốn dung lượng máy và hoàn toàn không cần tải qua App Store / Google Play!
          </p>
        </div>
        <i class="fa-solid fa-mobile-screen tv-hero-mark"></i>
      </div>

      <!-- Feature Highlight Badges -->
      <div class="hd-highlights-grid">
        <div class="hd-hl-card">
          <div class="hd-hl-icon"><i class="fa-solid fa-bolt"></i></div>
          <div class="hd-hl-info">
            <h4>Siêu nhẹ & Tiết kiệm pin</h4>
            <p>Dung lượng &lt; 2MB, không tốn bộ nhớ lưu trữ, tải tài nguyên siêu tốc.</p>
          </div>
        </div>
        <div class="hd-hl-card">
          <div class="hd-hl-icon"><i class="fa-solid fa-mobile-screen"></i></div>
          <div class="hd-hl-info">
            <h4>Trải nghiệm trọn màn hình</h4>
            <p>Mở app mượt mà, không vướng thanh địa chỉ trình duyệt, giống 100% app native.</p>
          </div>
        </div>
        <div class="hd-hl-card">
          <div class="hd-hl-icon"><i class="fa-solid fa-bell"></i></div>
          <div class="hd-hl-info">
            <h4>Nhận thông báo nhắc học</h4>
            <p>Nhận lịch ôn bài, thông báo bài tập mới từ cô giáo ngay trên điện thoại.</p>
          </div>
        </div>
      </div>

      ${coCaiNhanh ? `
      <!-- Fast Install Banner for Android / Supported Browsers -->
      <div class="hd-quick-install-banner">
        <div class="hd-quick-left">
          <div class="hd-quick-badge"><i class="fa-solid fa-circle-check"></i> Thiết bị sẵn sàng</div>
          <h3>Cài đặt ứng dụng chỉ với 1 chạm!</h3>
          <p>Trình duyệt của bạn hỗ trợ cài trực tiếp PWA về màn hình chính.</p>
        </div>
        <button class="btn btn-primary hd-btn-install" onclick="window.app.caiDatAppNhanh()">
          <i class="fa-solid fa-download"></i> CÀI ĐẶT NGAY
        </button>
      </div>` : ''}

      <!-- OS Switch Tabs -->
      <div class="hd-platform-tabs">
        <button type="button" class="hd-tab-btn ${currentOs === 'ios' ? 'active' : ''}" onclick="window.app.doiTabCaiApp('ios')">
          <span class="hd-os-emoji">🍎</span>
          <span>iPhone / iPad (iOS)</span>
        </button>
        <button type="button" class="hd-tab-btn ${currentOs === 'android' ? 'active' : ''}" onclick="window.app.doiTabCaiApp('android')">
          <span class="hd-os-emoji">🤖</span>
          <span>Điện thoại Android</span>
        </button>
      </div>

      <!-- Content: iOS Guide -->
      <div class="hd-guide-content ${currentOs === 'ios' ? 'active' : ''}" id="hd-ios-content">
        <div class="hd-note-alert">
          <i class="fa-solid fa-circle-info"></i>
          <div>
            <strong>Lưu ý quan trọng cho iPhone:</strong> Bạn cần mở website bằng trình duyệt <strong>Safari</strong> (biểu tượng la bàn của Apple). Trình duyệt Chrome trên iOS hoặc trình duyệt mở trong Facebook/Zalo sẽ không hiện nút thêm vào màn hình chính.
          </div>
        </div>

        <div class="hd-steps-list">
          <div class="hd-step-item">
            <div class="hd-step-num">1</div>
            <div class="hd-step-body">
              <h4>Mở Safari và truy cập website</h4>
              <p>Mở ứng dụng <strong>Safari</strong> trên iPhone và truy cập vào địa chỉ: <code>https://duhocitaiwan.com</code></p>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">2</div>
            <div class="hd-step-body">
              <h4>Bấm vào biểu tượng "Chia sẻ"</h4>
              <p>
                Nhìn xuống thanh công cụ dưới đáy màn hình Safari, bấm vào biểu tượng <strong>Chia sẻ</strong> (nút hình ô vuông có mũi tên hướng lên).
              </p>
              <div class="hd-chip-preview"><i class="fa-solid fa-arrow-up-right-from-square"></i> Nút Chia sẻ (Share) ở giữa thanh dưới</div>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">3</div>
            <div class="hd-step-body">
              <h4>Chọn "Thêm vào MH chính"</h4>
              <p>
                Cuộn menu chia sẻ xuống một chút, tìm và nhấn vào dòng <strong>"Thêm vào MH chính"</strong> (tiếng Anh là <em>Add to Home Screen</em>).
              </p>
              <div class="hd-chip-preview"><i class="fa-solid fa-mobile-screen"></i> Thêm vào MH chính (Add to Home Screen)</div>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">4</div>
            <div class="hd-step-body">
              <h4>Nhấn "Thêm" ở góc trên bên phải</h4>
              <p>
                Màn hình xác nhận xuất hiện kèm tên và logo ITaiwan. Bạn chỉ cần nhấn nút <strong>"Thêm" (Add)</strong> ở góc trên bên phải màn hình.
              </p>
            </div>
          </div>
        </div>

        <div class="hd-success-box">
          <i class="fa-solid fa-circle-check"></i>
          <div>
            <strong>Hoàn tất thành công!</strong> Biểu tượng ITaiwan đã xuất hiện trên Màn hình chính của iPhone. Khi cần học, bạn chỉ cần bấm vào biểu tượng để vào thẳng app toàn màn hình mượt mà!
          </div>
        </div>
      </div>

      <!-- Content: Android Guide -->
      <div class="hd-guide-content ${currentOs === 'android' ? 'active' : ''}" id="hd-android-content">
        <div class="hd-note-alert">
          <i class="fa-solid fa-circle-info"></i>
          <div>
            <strong>Khuyến nghị cho Android:</strong> Mở website bằng trình duyệt <strong>Google Chrome</strong> hoặc <strong>Samsung Internet</strong> để có trải nghiệm cài đặt và tự động cập nhật tốt nhất.
          </div>
        </div>

        <div class="hd-steps-list">
          <div class="hd-step-item">
            <div class="hd-step-num">1</div>
            <div class="hd-step-body">
              <h4>Mở web bằng Google Chrome</h4>
              <p>Mở trình duyệt <strong>Chrome</strong> trên điện thoại Android của bạn và vào trang <code>duhocitaiwan.com</code></p>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">2</div>
            <div class="hd-step-body">
              <h4>Bấm vào biểu tượng 3 dấu chấm (⋮)</h4>
              <p>
                Ở góc trên cùng bên phải màn hình cạnh thanh địa chỉ, nhấn vào biểu tượng <strong>3 dấu chấm dọc (⋮)</strong> để mở menu cài đặt của Chrome.
              </p>
              <div class="hd-chip-preview"><i class="fa-solid fa-ellipsis"></i> Menu 3 chấm góc trên bên phải</div>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">3</div>
            <div class="hd-step-body">
              <h4>Chọn "Cài đặt ứng dụng"</h4>
              <p>
                Trong danh sách menu xổ xuống, tìm và bấm vào dòng <strong>"Cài đặt ứng dụng"</strong> (Install app).<br>
                <em>(Nếu máy không hiện "Cài đặt ứng dụng", hãy bấm vào dòng <strong>"Thêm vào màn hình chính"</strong> / Add to Home screen).</em>
              </p>
              <div class="hd-chip-preview"><i class="fa-solid fa-download"></i> Cài đặt ứng dụng / Thêm vào màn hình chính</div>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">4</div>
            <div class="hd-step-body">
              <h4>Bấm "Cài đặt" để xác nhận</h4>
              <p>
                Một hộp thoại sẽ hiện lên kèm logo ITaiwan. Bấm nút <strong>"Cài đặt"</strong> (Install). Hệ thống Android sẽ tự động tạo app vào màn hình chính và khay ứng dụng.
              </p>
            </div>
          </div>
        </div>

        <div class="hd-success-box">
          <i class="fa-solid fa-circle-check"></i>
          <div>
            <strong>Hoàn tất thành công!</strong> Ứng dụng ITaiwan đã được tạo độc lập trên điện thoại Android. Bạn có thể mở app từ màn hình chính hoặc khay ứng dụng (App Drawer) để học tập bất cứ lúc nào!
          </div>
        </div>
      </div>

      <!-- FAQ & Trouble Shooting -->
      <div class="hd-faq-card">
        <h3><i class="fa-solid fa-circle-question"></i> Một số thắc mắc thường gặp</h3>
        <div class="hd-faq-item">
          <h5>1. Tôi mở link từ Zalo, Messenger hoặc Facebook thì không thấy chỗ cài đặt?</h5>
          <p>
            Trình duyệt tích hợp sẵn bên trong Zalo / Facebook thường chặn tính năng cài đặt app. Bạn chỉ cần bấm vào biểu tượng dấu 3 chấm ở góc trên màn hình Zalo/Facebook, chọn <strong>"Mở bằng trình duyệt ngoài"</strong> (Safari hoặc Chrome) rồi làm theo các bước ở trên là được.
          </p>
        </div>
        <div class="hd-faq-item">
          <h5>2. Cài app này có tốn dung lượng bộ nhớ máy không?</h5>
          <p>
            Không. Ứng dụng sử dụng công nghệ PWA (Progressive Web App) tiêu chuẩn thế giới, dung lượng chỉ dưới 2MB (nhẹ hơn hàng trăm lần so với các app thông thường) nên tuyệt đối không lo đầy bộ nhớ điện thoại.
          </p>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// 2. TRANG: CÁCH TẠO TÀI KHOẢN (HỌC VIÊN)
// ============================================================
export function renderGuideDangKy(el) {
  el.innerHTML = `
    <div class="hd-wrap">
      <!-- Hero Header -->
      <div class="tv-hero">
        <div class="tv-hero-text">
          <span class="tv-hero-badge"><i class="fa-solid fa-user-plus"></i> DÀNH CHO HỌC VIÊN</span>
          <h1>Cách Tạo Tài Khoản ITaiwan</h1>
          <p>
            Hướng dẫn chi tiết từng bước đăng ký tài khoản học tập trên ITaiwan.
            Tạo tài khoản ngay hôm nay để làm bài tập cô giao, thi thử TOCFL, tra cứu từ điển và theo dõi hồ sơ du học Đài Loan!
          </p>
        </div>
        <i class="fa-solid fa-user-graduate tv-hero-mark"></i>
      </div>

      <!-- Action Card -->
      <div class="hd-reg-cta-banner">
        <div class="hd-reg-cta-text">
          <h3>Bắt đầu học ngay hôm nay!</h3>
          <p>Chỉ cần 1 phút điền thông tin là bạn đã có tài khoản học tiếng Trung tại ITaiwan.</p>
        </div>
        <button class="btn btn-primary hd-btn-register" onclick="window.app.moModalDangKy()">
          <i class="fa-solid fa-user-plus"></i> ĐĂNG KÝ TÀI KHOẢN NGAY
        </button>
      </div>

      <!-- 4 Steps of Registration -->
      <div class="hd-card hd-steps-container">
        <h3 class="hd-section-title"><i class="fa-solid fa-clipboard-check"></i> Quy trình đăng ký tài khoản (4 bước)</h3>

        <div class="hd-steps-list">
          <div class="hd-step-item">
            <div class="hd-step-num">1</div>
            <div class="hd-step-body">
              <h4>Mở bảng Đăng ký</h4>
              <p>
                Bấm vào nút <strong>"Đăng ký tài khoản ngay"</strong> ở trên, hoặc bấm nút <strong>"Đăng nhập"</strong> ở góc trên bên phải màn hình (hoặc dưới thanh bên) rồi chọn liên kết <em>"Đăng ký ngay"</em>.
              </p>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">2</div>
            <div class="hd-step-body">
              <h4>Điền thông tin cá nhân</h4>
              <p>Hoàn thành 4 thông tin cơ bản trong biểu mẫu:</p>
              <div class="hd-info-table">
                <div class="hd-info-row">
                  <div class="hd-info-key"><i class="fa-solid fa-user"></i> Họ và tên:</div>
                  <div class="hd-info-val">Nhập họ tên thật có dấu (ví dụ: <em>Nguyễn Văn A</em>) để thầy cô dễ dàng điểm danh và chấm bài.</div>
                </div>
                <div class="hd-info-row">
                  <div class="hd-info-key"><i class="fa-solid fa-phone"></i> Số điện thoại:</div>
                  <div class="hd-info-val">Số điện thoại liên hệ chính thức của bạn để trung tâm hỗ trợ xếp lớp học phù hợp.</div>
                </div>
                <div class="hd-info-row">
                  <div class="hd-info-key"><i class="fa-solid fa-envelope"></i> Email:</div>
                  <div class="hd-info-val">Địa chỉ email chính xác để đăng nhập, nhận thông báo khóa học và khôi phục mật khẩu khi cần.</div>
                </div>
                <div class="hd-info-row">
                  <div class="hd-info-key"><i class="fa-solid fa-lock"></i> Mật khẩu:</div>
                  <div class="hd-info-val">Đặt mật khẩu an toàn có tối thiểu 6 ký tự để bảo vệ tài khoản cá nhân của bạn.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">3</div>
            <div class="hd-step-body">
              <h4>Bấm nút "ĐĂNG KÝ"</h4>
              <p>
                Sau khi điền đủ thông tin, bấm nút <strong>"ĐĂNG KÝ"</strong> màu xanh. Hệ thống sẽ tạo tài khoản của bạn ngay lập tức. Nếu có thông báo xác thực qua email, vui lòng mở hòm thư để xác nhận.
              </p>
            </div>
          </div>

          <div class="hd-step-item">
            <div class="hd-step-num">4</div>
            <div class="hd-step-body">
              <h4>Kích hoạt & Phân quyền lớp học</h4>
              <p>
                Tài khoản vừa tạo có thể học thử ngay các bài học mở miễn phí (Từ vựng, Phát âm, các bài đầu của giáo trình).<br>
                Để được cấp quyền làm bài tập cô giao, thi thử đề TOCFL và vào lớp học chính thức, bạn hãy liên hệ với trung tâm hoặc thầy cô phụ trách để được duyệt tài khoản.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Support Box -->
      <div class="hd-card hd-support-card">
        <div class="hd-support-head">
          <div class="hd-support-icon"><i class="fa-solid fa-phone"></i></div>
          <div>
            <h3>Cần hỗ trợ kích hoạt tài khoản hoặc tư vấn lộ trình?</h3>
            <p>Đội ngũ thầy cô và tư vấn viên ITaiwan luôn sẵn sàng hỗ trợ bạn 24/7.</p>
          </div>
        </div>
        <div class="hd-support-actions">
          <a href="https://www.facebook.com/tinh.hoang.858548/about" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="fa-brands fa-facebook"></i> Nhắn tin Facebook Tỉnh Hoàng
          </a>
          <button class="btn btn-outline" onclick="window.app.moModalDangKy()">
            <i class="fa-solid fa-user-plus"></i> Đăng ký tài khoản ngay
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// HANDLERS
// ============================================================
function doiTabCaiApp(os) {
  hdOsTab = os;
  const content = document.getElementById('page-content');
  if (content && state.currentPage === 'guide-cai-app') {
    renderGuideCaiApp(content);
  }
}

function moModalDangKy() {
  if (typeof window.app?.showRegister === 'function') {
    window.app.showRegister();
  } else if (typeof window.app?.openAuth === 'function') {
    window.app.openAuth();
  }
}

function capNhatNutCaiApp() {
  const content = document.getElementById('page-content');
  if (content && state.currentPage === 'guide-cai-app') {
    renderGuideCaiApp(content);
  }
}

export const render = {
  'guide-cai-app': renderGuideCaiApp,
  'guide-dang-ky': renderGuideDangKy,
};

export const handlers = {
  doiTabCaiApp,
  moModalDangKy,
  capNhatNutCaiApp,
};
