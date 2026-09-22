import { defineConfig } from 'vite';
import { resolve } from 'path';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

/**
 * Giữ `src/data/giaotrinh-manifest.js` luôn khớp dữ liệu thật (CLAUDE.md 4.30).
 *
 * Manifest là bảng số liệu nhẹ (số từ mỗi bài, from/to bài con) để sidebar hiện được ngay mà
 * không phải nạp 11 MB từ vựng. Nó tự sinh, nhưng nếu phải nhớ gõ lệnh thì sớm muộn cũng có
 * lần thêm bài xong quên chạy -> sidebar báo "Sắp có" cho bài đã có dữ liệu. Nên plugin này
 * chạy script mỗi lần build/dev khi thấy file dữ liệu MỚI HƠN manifest (so mtime, ~0 chi phí
 * khi không đổi; sinh lại mất ~0,3s).
 */
function manifestGiaoTrinh() {
  const RA = resolve(__dirname, 'src/data/giaotrinh-manifest.js');
  const chay = () => {
    const moi = fs.existsSync(RA) ? fs.statSync(RA).mtimeMs : 0;
    const canSinh = !moi || fs.readdirSync(resolve(__dirname, 'src/data'))
      .filter((f) => /^(duongdai|thoidai)(Vocab|Grammar|Dialogues|Writing|Books|Data)/.test(f))
      .some((f) => fs.statSync(resolve(__dirname, 'src/data', f)).mtimeMs > moi);
    if (!canSinh) return;
    execFileSync('node', [resolve(__dirname, 'scripts/gen-giaotrinh-manifest.mjs')], { stdio: 'inherit' });
  };
  return { name: 'tw-manifest-giao-trinh', buildStart: chay, configureServer: chay };
}

/**
 * Giữ `public/data/luyentap/` và `public/data/dich/` (tách theo bài) khớp file nguồn.
 * Cùng lý do với manifest ở trên: chạy tự động thì không có lần nào quên (CLAUDE.md 4.30).
 */
function tachDuLieu() {
  const DATA = resolve(__dirname, 'public/data');
  const NGUON = ['onllang-exercises.json', 'dangdai-luyentap.json', 'luyentap-tusinh.json',
    'onllang-answers.json', 'dangdai-luyentap-answers.json', 'luyentap-tusinh-answers.json',
    'translate-exercises.json'];
  const chay = () => {
    const dich = resolve(DATA, 'dich/index.json');
    const moi = fs.existsSync(dich) ? fs.statSync(dich).mtimeMs : 0;
    // Nội dung giáo trình cũng do script này sinh ra (public/data/giaotrinh/) nên phải theo dõi
    // luôn các file dữ liệu nguồn trong src/data — quên thì sửa từ vựng xong app vẫn đọc bản cũ.
    const srcData = resolve(__dirname, 'src/data');
    const nguonJs = fs.readdirSync(srcData)
      .filter((f) => /^(duongdai|thoidai).*\.js$/.test(f))
      .map((f) => resolve(srcData, f));
    const canSinh = !moi || !fs.existsSync(resolve(DATA, 'giaotrinh'))
      // Bộ đề TOCFL cũng do script này sinh (public/data/thi/tocfl.json, xem CLAUDE.md 4.41).
      // Thiếu điều kiện này thì xoá file đi là nó không bao giờ được sinh lại — trang Thi thử
      // hiện tấm chắn "cần mua" cho cả người đã mua, mà không có lỗi nào chỉ ra nguyên nhân.
      || !fs.existsSync(resolve(DATA, 'thi/tocfl.json'))
      || NGUON.some((f) => {
        const p = resolve(DATA, f);
        return fs.existsSync(p) && fs.statSync(p).mtimeMs > moi;
      })
      || nguonJs.some((p) => fs.statSync(p).mtimeMs > moi);
    if (!canSinh) return;
    execFileSync('node', [resolve(__dirname, 'scripts/gen-tach-data.mjs')], { stdio: 'inherit' });
  };
  return { name: 'tw-tach-du-lieu', buildStart: chay, configureServer: chay };
}

/**
 * Canh chừng bundle CHÍNH (CLAUDE.md 4.30). Cảnh báo `chunkSizeWarningLimit` sẵn có của Vite
 * không dùng được ở đây: nó bắn cho MỌI chunk, mà các chunk nạp động (bộ đề TOCFL 0,9 MB, từ
 * vựng từng quyển) vốn dĩ to — cảnh báo kêu suốt thì không ai còn để ý. Chỉ `main-*.js` mới
 * đáng canh: nó phình lên nghĩa là có ai đó lỡ import tĩnh lại một file dữ liệu nặng.
 */
/**
 * Icon Font Awesome nay là SUBSET tự host (CLAUDE.md 4.32) — icon không nằm trong subset sẽ hiện
 * thành Ô TRỐNG, không có lỗi nào trong console. Plugin này quét mã nguồn ở mỗi lần build/dev và
 * cảnh báo nếu có tên icon chưa được subset. KHÔNG tự sinh lại: sinh subset cần fonttools, và im
 * lặng đổi file font giữa chừng còn khó lần hơn là một dòng cảnh báo rõ ràng.
 */
function kiemIcon() {
  const chay = async () => {
    const DS = resolve(__dirname, 'public/fa/icon-dang-dung.json');
    if (!fs.existsSync(DS)) return;
    const { quetIcon, bangCodepoint } = await import('./scripts/gen-fontawesome-subset.mjs');
    const css = resolve(__dirname, 'scripts/data-cache/fa/all.min.css');
    const daCo = new Set(JSON.parse(fs.readFileSync(DS, 'utf8')));
    const bang = fs.existsSync(css) ? bangCodepoint(fs.readFileSync(css, 'utf8')) : null;
    const thieu = [...quetIcon(__dirname)].filter((t) => !daCo.has(t) && (!bang || bang.has(t)));
    if (thieu.length) {
      console.warn(`\n⚠️  ${thieu.length} icon chưa có trong subset Font Awesome: ${thieu.join(' ')}`);
      console.warn('   Chúng sẽ hiện thành ô trống. Chạy `npm run data:fa` để sinh lại.\n');
    }
  };
  return { name: 'tw-kiem-icon', buildStart: chay, configureServer: chay };
}

/**
 * BẢN DỰNG CHO APP NATIVE (TW_MOBILE=1) — xem md/app-mobile.md.
 *
 * Capacitor chép NGUYÊN thư mục `webDir` vào gói cài đặt. Mà `public/audio` là 276 MB / 10.842
 * file: gói AAB của Google Play có trần 200 MB, nên chép cả vào là không nộp store được — và
 * cũng vô nghĩa, vì audio đã có đường phát qua CDN (`assetUrl`, CLAUDE.md 4.31).
 *
 * Cách làm: khi dựng bản mobile thì TẮT hẳn `publicDir` của Vite rồi tự chép sang, bỏ qua
 * những thứ app không cần. Chép-rồi-xoá cũng ra kết quả đúng nhưng mỗi lần dựng lại ghi 276 MB
 * xuống đĩa cho vui.
 *
 * ⚠️ TUYỆT ĐỐI KHÔNG "dọn" bằng cách di chuyển hay xoá `public/audio` — dự án đã mất trắng 85
 * file audio phát âm đúng một lần vì kiểu thao tác đó (CLAUDE.md 4.11b), và nó hỏng rất êm:
 * mọi nút loa tự rơi về giọng máy, không có lỗi nào hiện ra.
 */
function mobilePublic() {
  // audio -> CDN. sitemap/robots/og-image -> chỉ có nghĩa với công cụ tìm kiếm, không có nghĩa
  // trong app. test.html -> trang thử nghiệm, không phải thứ đem đi nộp store.
  const BO_QUA = new Set(['audio', 'sitemap.xml', 'robots.txt', 'test.html', 'chan-doan.html', 'og-image.png', 'splash']);
  return {
    name: 'tw-mobile-public',
    apply: 'build',
    closeBundle() {
      if (!process.env.TW_MOBILE) return;
      const src = resolve(__dirname, 'public');
      const out = resolve(__dirname, process.env.TW_MOBILE_OUT || 'dist-mobile');
      let n = 0;
      for (const f of fs.readdirSync(src)) {
        if (BO_QUA.has(f)) continue;
        fs.cpSync(resolve(src, f), resolve(out, f), { recursive: true });
        n++;
      }
      // admin.html là cổng quản trị của giáo viên, không phải màn hình của học viên. Để lọt vào
      // gói app thì Apple sẽ hỏi "màn hình đăng nhập quản trị này là gì" trong lúc duyệt.
      for (const f of ['admin.html']) {
        const pth = resolve(out, f);
        if (fs.existsSync(pth)) fs.rmSync(pth);
      }
      console.log(`\n📦 Bản mobile: đã chép ${n} mục từ public/ (bỏ qua ${[...BO_QUA].join(', ')})`);
    },
  };
}

/**
 * TƯỜNG NỘI DUNG TRẢ PHÍ (2026-09-09).
 *
 * Bài học nay đi qua `/api/noi-dung/*` để server kiểm quyền (server/routes/noi-dung.js). Nhưng
 * bản thân file vẫn nằm trong `public/data/**` — mà Vite chép NGUYÊN thư mục `public/` ra `dist/`,
 * nên nếu không làm gì thì cả bộ giáo trình vẫn tải thẳng được bằng URL cũ và tường kia thành vô
 * nghĩa. Plugin này loại chúng khỏi bản build, và chặn luôn ở dev server để hành vi hai môi
 * trường giống nhau (lỗi "chỉ hỏng trên production" là loại tốn thời gian nhất để lần ra).
 *
 * ⚠️ File nguồn trong `public/data/` KHÔNG bị đụng tới — mọi script sinh dữ liệu ghi vào đó như
 * cũ, và server đọc chính chỗ đó. Plugin chỉ xoá BẢN SAO trong thư mục build.
 *
 * ⚠️ Bản app native (`dist-mobile`) cũng phải lọc: `mobilePublic()` chép public/ vào gói cài đặt,
 * để lọt là ai cũng giải nén file .apk ra đọc được toàn bộ giáo trình.
 */
function gateNoiDung() {
  let mo = null;   // nạp một lần: shared/noi-dung-mo.js là ESM thuần, dùng chung với server
  const nap = async () => (mo ||= await import('./shared/noi-dung-mo.js'));

  /**
   * File GỘP ở ngay `data/` (không nằm trong thư mục con) — CỬA SAU của tường trả phí.
   *
   * ⚠️ 2026-09-15 — lỗ hổng thật, đã đo: regex bên dưới chỉ khớp `data/<thư mục>/<bài>.json`, nên
   * mọi file gộp nằm THẲNG trong `data/` đều lọt. Mà đó chính là file NGUỒN mà bản tách theo bài
   * được sinh ra từ đó (CLAUDE.md 4.30): chặn bản tách nhưng để lọt bản gộp thì tường thành vô
   * nghĩa — `data/luyentap-tusinh.json` một mình là 2,4 MB gồm 121 bài trả phí và 5.715 câu hỏi,
   * `translate-exercises.json` là 142 bài dịch, lại còn kèm cả file đáp án.
   *
   * Cả 11 file này app KHÔNG còn dùng (đã đối chiếu mọi `fetch('/data/…')` trong src/): app đọc
   * bản tách qua `/api/noi-dung/*`. Chúng chỉ là bản sao build còn sót lại từ đợt tách dữ liệu.
   * File NGUỒN trong `public/data/` vẫn giữ nguyên — mọi script sinh dữ liệu và bộ kiểm đáp án
   * (`npm run luyentap:kiem`) đọc thẳng từ đó.
   *
   * Thêm file gộp mới thì thêm vào đây, nếu không nó lại publish nguyên nội dung trả phí.
   */
  const FILE_GOP_CAM = new Set([
    'luyentap-tusinh.json',            // 121 bài trả phí, 5.715 câu
    'luyentap-tusinh-answers.json',    // đáp án của chính bộ trên
    'translate-exercises.json',        // 142 bài Dịch Trung-Việt
    'onllang-exercises.json',          // Luyện tập tổng hợp (onllang)
    'onllang-answers.json',            // đáp án của bộ trên
    'onllang-exercises-a2.json',
    'onllang-grammar-a2.json',
    'onllang-course-2.json',           // hội thoại + đoạn văn + ngữ pháp quyển 2
    'dangdai-luyentap.json',           // đề kiểm tra MTC
    'dangdai-luyentap-answers.json',
    'dd-exercises-2.json',             // bản thu Sách bài tập Đương Đại
    // Hai file dưới app VẪN dùng, nhưng từ 2026-09-15 đi qua `/api/noi-dung/van-hoa` và
    // `/api/noi-dung/tone-hints` — nơi server lọc bỏ bài chưa mua. Để bản tĩnh nằm lại trong
    // dist/ thì chỉ cần gõ thẳng URL cũ là vòng qua được cửa đó và lấy đủ 30 bài văn hoá.
    'onllang-culture.json',
    'onllang-tone-hints.json',
  ]);

  /** Đường dẫn tương đối trong public/ (vd 'data/giaotrinh/2-5.json') có phải nội dung trả phí? */
  const laTraPhi = (rel) => {
    const duong = rel.replace(/\\/g, '/');
    const gop = /^data\/([^/]+\.json)$/.exec(duong);
    if (gop) return FILE_GOP_CAM.has(gop[1]);
    // Vốn từ BULK của dự án: công khai nhưng CHỈ phục vụ qua /api/noi-dung/* (có rate-limit) để
    // chặn cào cả bộ trong vài request (2026-09-15). Loại bản tĩnh để không có đường vòng.
    // Từ điển 122k mục + shard nhỏ + index/bothu/chu KHÔNG loại: CC BY-SA/Unihan, cần cache CDN.
    if (duong === 'data/tudien/kho.json') return true;
    if (/^data\/tocfl\/cap-L[0-5]\.json$/.test(duong)) return true;
    const m = /^data\/(giaotrinh|luyentap|dich|hsk|thi)\/(.+)\.json$/.exec(duong);
    if (!m) return false;
    const [, phan, ten] = m;
    // Đề thi thử: không có bản dùng thử (chốt 2026-09-09). index.json chỉ là danh mục -> để mở,
    // nếu không thì màn chọn đề trống trơn, khách không biết có gì để mua.
    if (phan === 'hsk' && ten.startsWith('dethi/')) return ten !== 'dethi/index';
    // Ngân hàng đề TOCFL: cả thư mục là nội dung trả phí, không có file danh mục công khai.
    if (phan === 'thi') return true;
    // Trong public/data/hsk/ còn có index/chars/grammar-* — tra cứu, để mở.
    if (phan === 'hsk' && !/^hsk\d+-\d+$/.test(ten)) return false;
    return !mo.taiNguyenMo(phan === 'hsk' ? 'giaotrinh' : phan, ten);
  };

  return {
    name: 'tw-gate-noi-dung',
    async configureServer(server) {
      await nap();
      server.middlewares.use((req, res, next) => {
        const p = decodeURIComponent((req.url || '').split('?')[0]).replace(/^\//, '');
        if (!laTraPhi(p)) return next();
        // Cùng mã lỗi với server thật (402) để phần client xử lý một đường duy nhất.
        res.statusCode = 402;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
          error: 'Nội dung trả phí — tải qua /api/noi-dung/, không tải thẳng file.',
          can_quyen: true,
        }));
      });
    },
    async closeBundle() {
      await nap();
      const out = resolve(__dirname, process.env.TW_MOBILE
        ? (process.env.TW_MOBILE_OUT || 'dist-mobile') : 'dist');
      let n = 0;
      const duyet = (thuMuc, tienTo) => {
        if (!fs.existsSync(thuMuc)) return;
        for (const f of fs.readdirSync(thuMuc, { withFileTypes: true })) {
          const p = resolve(thuMuc, f.name);
          const rel = tienTo ? `${tienTo}/${f.name}` : f.name;
          if (f.isDirectory()) duyet(p, rel);
          else if (laTraPhi(rel)) { fs.rmSync(p); n++; }
        }
      };
      duyet(resolve(out, 'data'), 'data');
      if (n) console.log(`🔒 Đã loại ${n} file nội dung trả phí khỏi ${out.split('/').pop()}/ (phục vụ qua /api/noi-dung).`);
    },
  };
}

const NGUONG_MAIN_KB = 500;
function canhBaoBundle() {
  return {
    name: 'tw-canh-bao-bundle',
    writeBundle(opts, bundle) {
      for (const [ten, ch] of Object.entries(bundle)) {
        if (!/^assets\/main-.*\.js$/.test(ten) || ch.type !== 'chunk') continue;
        const kb = Buffer.byteLength(ch.code) / 1024;
        if (kb > NGUONG_MAIN_KB) {
          console.warn(`\n⚠️  ${ten} = ${kb.toFixed(0)} KB, vượt ngưỡng ${NGUONG_MAIN_KB} KB.`);
          console.warn('   Nhiều khả năng main.js vừa import TĨNH một file dữ liệu nặng.');
          console.warn('   Nội dung giáo trình phải đi qua giaotrinh-kho.js (CLAUDE.md 4.30).\n');
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [manifestGiaoTrinh(), tachDuLieu(), kiemIcon(), canhBaoBundle(), mobilePublic(), gateNoiDung()],
  // Bản mobile tự chép public/ (bỏ audio) trong plugin mobilePublic() ở trên.
  publicDir: process.env.TW_MOBILE ? false : 'public',
  build: {
    outDir: process.env.TW_MOBILE ? (process.env.TW_MOBILE_OUT || 'dist-mobile') : 'dist',
    // Chunk nạp động cố tình to (bộ đề, từ vựng từng quyển) — cảnh báo mặc định của Vite ở đây
    // chỉ gây nhiễu; việc canh chừng do canhBaoBundle() lo, đúng vào main-*.js.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        // VITE_API_TARGET cho phép chạy song song một backend khác cổng để thử nghiệm mà không
        // phải đụng vào server đang chạy: VITE_API_TARGET=http://localhost:3999 npx vite --port 5199
        target: process.env.VITE_API_TARGET || 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
