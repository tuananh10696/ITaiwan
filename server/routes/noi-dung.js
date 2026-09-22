// =============================================================
// NỘI DUNG HỌC CÓ KIỂM QUYỀN — 2026-09-09
//
// Trước đợt này, toàn bộ giáo trình nằm ở `public/data/**` và được client fetch thẳng, nên tường
// phân quyền trong `navigate()` chỉ ngăn được người dùng bình thường: ai gõ đúng URL là tải được
// cả bộ. Nói cách khác, hệ thống chưa BÁN được nội dung, chỉ bán được phần lớp học/theo dõi.
//
// Nay mọi bài học đi qua đây. Ba mức:
//   1. Bài MỞ (3 bài đầu mỗi quyển/cấp)  -> ai cũng lấy được, kể cả chưa đăng nhập.
//   2. Bài trả phí + đã có quyền          -> trả nội dung, cấm cache dùng chung.
//   3. Bài trả phí + chưa có quyền        -> 402 kèm mã sản phẩm cần mua, để giao diện mời mua
//                                            đúng thứ đang thiếu thay vì báo lỗi chung chung.
//
// File vẫn nằm nguyên chỗ cũ trong `public/data/**` (mọi script sinh dữ liệu không phải đổi);
// thứ thay đổi là chúng KHÔNG còn được publish ra `dist/` — plugin `tw-gate-noi-dung` trong
// vite.config.js loại chúng khỏi bản build và chặn luôn ở dev server để hành vi hai bên giống nhau.
import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pool from '../config/db.js';
import { optionalAuth } from '../middleware/auth.js';
import { quyenCuaNguoiDung, sanPhamCanMua, coQuyen } from '../utils/quyen-noi-dung.js';
import { taiNguyenMo, viTriTaiNguyen, SO_BAI_MO } from '../../shared/noi-dung-mo.js';
import { chanTaiNoiDung } from '../middleware/gioi-han.js';


const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Giới hạn tần suất cho MỌI route nội dung. Đặt ở đây một lần thay vì gắn vào từng route: route
// thêm sau tự được bảo vệ, không phải nhớ.
//
// `optionalAuth` chạy ở đây để bộ đếm biết người gọi là AI (đếm theo tài khoản thay vì theo IP —
// cả một lớp học chung wifi sẽ ra cùng một IP). Từng route vẫn giữ `optionalAuth` của nó: chúng
// phải dùng được cả khi mount riêng lẻ, và chạy lại chỉ là verify một chuỗi JWT.
//
// `/tinh-trang`, `/quyen`, `/goi` không phải nội dung bài học nên không tính vào hạn mức.
const KHONG_TINH = new Set(['/tinh-trang', '/quyen', '/goi']);
router.use(optionalAuth, (req, res, next) => {
  if (KHONG_TINH.has(req.path)) return next();
  return chanTaiNoiDung(req, res, next);
});

// Gốc dữ liệu. Trên Vercel, `public/data/**` được kéo vào function bundle qua `includeFiles`
// trong vercel.json — thiếu khai báo đó thì route này 404 sạch mà không có lỗi nào hiện ra, nên
// có /tinh-trang bên dưới để kiểm ngay sau khi deploy.
const GOC = process.env.NOI_DUNG_DIR
  ? path.resolve(process.env.NOI_DUNG_DIR)
  : path.resolve(__dirname, '../../public/data');

/** Van thoát hiểm: đặt NOI_DUNG_MO_HET=true để mở toàn bộ, dùng khi gate hỏng trên production. */
const MO_HET = String(process.env.NOI_DUNG_MO_HET || '').toLowerCase() === 'true';

/**
 * Đọc một file JSON trong kho nội dung.
 * `phan` và `ten` do route ghép, KHÔNG lấy thẳng từ người dùng: `ten` được lọc qua AN_TOAN trước
 * đó. Vẫn kiểm lại đường dẫn cuối có nằm trong GOC không — một lớp nữa chống path traversal.
 */
function docJson(phan, ten) {
  const p = path.resolve(GOC, phan, `${ten}.json`);
  if (!p.startsWith(path.resolve(GOC) + path.sep)) return null;
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

/** Khoá bài / mã đề hợp lệ: chữ, số, dấu chấm, gạch ngang. Không có '/', '..', khoảng trắng. */
const AN_TOAN = /^[A-Za-z0-9.\-]{1,40}$/;

function traFile(res, phan, ten, cache) {
  const s = docJson(phan, ten);
  if (s == null) return res.status(404).json({ error: 'Không tìm thấy nội dung.' });
  res.set('Cache-Control', cache);
  res.type('application/json').send(s);
}

/** 402 = "cần trả tiền". Kèm mã sản phẩm để giao diện mời mua đúng thứ đang thiếu. */
function canMua(res, bo, quyen) {
  return res.status(402).json({
    error: 'Nội dung này thuộc phần trả phí.',
    can_quyen: true,
    bo,
    quyen,
    san_pham: sanPhamCanMua(bo, quyen),
    so_bai_mo: SO_BAI_MO,
  });
}

/**
 * Cửa kiểm chung cho mọi loại tài nguyên bài học.
 * Trả về `true` nếu đã tự gửi response (bị chặn) — nơi gọi chỉ việc `return`.
 */
async function biChan(req, res, loai, id) {
  if (MO_HET) return false;
  if (taiNguyenMo(loai, id)) {
    // Bài mở: cho phép cả edge cache dùng chung, đây chính là nội dung khách vãng lai xem thử.
    res.locals.cache = 'public, max-age=600, s-maxage=3600, stale-while-revalidate=604800';
    return false;
  }
  // Từ 2026-09-09 quyền bán theo từng QUYỂN, nên chỉ so "bộ" là không đủ: mua Đương đại quyển 2
  // mà mở được quyển 5 thì coi như cho không 5 khoá.
  const { bo, quyen } = viTriTaiNguyen(loai, id);
  if (!req.userId) { canMua(res, bo, quyen); return true; }

  const q = await quyenCuaNguoiDung(req.userId);
  if (coQuyen(q, bo, quyen)) {
    // Nội dung riêng của một tài khoản — không được nằm trong cache dùng chung của CDN.
    res.locals.cache = 'private, max-age=300';
    return false;
  }
  canMua(res, bo, quyen);
  return true;
}

// ------------------------------------------------------------------ nội dung bài học
// Một bài giáo trình: từ vựng + ngữ pháp + hội thoại + luyện viết (CLAUDE.md 4.32).
router.get('/giaotrinh/:bo/:key', optionalAuth, async (req, res) => {
  try {
    const { bo, key } = req.params;
    if (!AN_TOAN.test(key)) return res.status(400).json({ error: 'Mã bài không hợp lệ.' });
    if (await biChan(req, res, 'giaotrinh', key)) return;
    traFile(res, bo === 'hsk' ? 'hsk' : 'giaotrinh', key, res.locals.cache);
  } catch (err) {
    console.error('Lỗi tải bài giáo trình:', err);
    res.status(500).json({ error: 'Lỗi tải nội dung bài học.' });
  }
});

router.get('/luyentap/:key', optionalAuth, async (req, res) => {
  try {
    const { key } = req.params;
    if (!AN_TOAN.test(key)) return res.status(400).json({ error: 'Mã bài không hợp lệ.' });
    if (await biChan(req, res, 'luyentap', key)) return;
    traFile(res, 'luyentap', key, res.locals.cache);
  } catch (err) {
    console.error('Lỗi tải luyện tập:', err);
    res.status(500).json({ error: 'Lỗi tải nội dung bài học.' });
  }
});

router.get('/dich/:sub', optionalAuth, async (req, res) => {
  try {
    const { sub } = req.params;
    if (!AN_TOAN.test(sub)) return res.status(400).json({ error: 'Mã bài không hợp lệ.' });
    if (await biChan(req, res, 'dich', sub)) return;
    traFile(res, 'dich', sub, res.locals.cache);
  } catch (err) {
    console.error('Lỗi tải bài dịch:', err);
    res.status(500).json({ error: 'Lỗi tải nội dung bài học.' });
  }
});

// Đề thi thử HSK. Chốt với chủ dự án: đề thi KHÔNG có bản dùng thử — `taiNguyenMo('dethi')` luôn
// false nên nhánh này luôn đi qua kiểm quyền.
router.get('/de-thi-hsk/:ma', optionalAuth, async (req, res) => {
  try {
    const { ma } = req.params;
    if (!AN_TOAN.test(ma)) return res.status(400).json({ error: 'Mã đề không hợp lệ.' });
    if (await biChan(req, res, 'dethi', ma)) return;
    traFile(res, 'hsk/dethi', ma, res.locals.cache);
  } catch (err) {
    console.error('Lỗi tải đề thi HSK:', err);
    res.status(500).json({ error: 'Lỗi tải đề thi.' });
  }
});

// Ngân hàng đề thi thử TOCFL (18 đề / 1.600 câu). Trước đây là một chunk JS trong dist/assets,
// tức tải thẳng được — nay đi qua đây như mọi nội dung trả phí. Không có bản dùng thử.
router.get('/thi/tocfl', optionalAuth, async (req, res) => {
  try {
    if (await biChan(req, res, 'dethi', 'tocfl')) return;
    traFile(res, 'thi', 'tocfl', res.locals.cache);
  } catch (err) {
    console.error('Lỗi tải đề TOCFL:', err);
    res.status(500).json({ error: 'Lỗi tải bộ đề.' });
  }
});

// ------------------------------------------------------------------ hai file GỘP còn lại
// Hai file dưới đây app nạp MỘT LẦN rồi giữ trong bộ nhớ (chúng nhỏ, tách theo bài là thêm hàng
// chục request cho một thứ 20-60 KB). Nhưng chúng chứa CẢ bài trả phí, nên không thể để client
// fetch thẳng `/data/*.json` như trước: đó là cách 24/30 bài Văn hoá nằm ngoài tường suốt từ khi
// tường được dựng (2026-09-09) — cả client lẫn server đều không kiểm, gõ đúng URL là có đủ bài.
//
// Cách xử lý: vẫn trả MỘT object như cũ để client không phải đổi logic, nhưng LỌC BỎ bài mà
// người gọi chưa có quyền. Bài bị lọc thì client thấy "chưa có nội dung" — đúng như khi dữ liệu
// thật sự thiếu, và tường ở tầng trên (ddKhoaPanelHtml) mới là chỗ mời mua.
async function locTheoQuyen(req, s, loai) {
  let d;
  try { d = JSON.parse(s); } catch { return null; }
  if (MO_HET) return d;

  const q = req.userId ? await quyenCuaNguoiDung(req.userId) : null;
  const ra = {};
  for (const [key, val] of Object.entries(d)) {
    if (taiNguyenMo(loai, key)) { ra[key] = val; continue; }
    const { bo, quyen } = viTriTaiNguyen(loai, key);
    if (q && coQuyen(q, bo, quyen)) ra[key] = val;
  }
  return ra;
}

// Bài đọc "Văn hoá Trung Hoa" — khoá là bài cha ('5', '2-5'), mỗi bài một bài đọc.
router.get('/van-hoa', optionalAuth, async (req, res) => {
  try {
    const s = docJson('.', 'onllang-culture');
    if (s == null) return res.status(404).json({ error: 'Không tìm thấy nội dung.' });
    const d = await locTheoQuyen(req, s, 'giaotrinh');
    if (d == null) return res.status(500).json({ error: 'Dữ liệu văn hoá không đọc được.' });
    // Riêng tư: nội dung phụ thuộc quyền của từng tài khoản, không được vào cache dùng chung.
    res.set('Cache-Control', req.userId ? 'private, max-age=300' : 'public, max-age=600');
    res.json(d);
  } catch (err) {
    console.error('Lỗi tải bài văn hoá:', err);
    res.status(500).json({ error: 'Lỗi tải nội dung.' });
  }
});

// Phiên âm + vị trí ô trống của mục "I. Phân biệt thanh điệu" (khoá là số bài Đương đại quyển 1).
router.get('/tone-hints', optionalAuth, async (req, res) => {
  try {
    const s = docJson('.', 'onllang-tone-hints');
    if (s == null) return res.status(404).json({ error: 'Không tìm thấy nội dung.' });
    const d = await locTheoQuyen(req, s, 'luyentap');
    if (d == null) return res.status(500).json({ error: 'Dữ liệu thanh điệu không đọc được.' });
    res.set('Cache-Control', req.userId ? 'private, max-age=300' : 'public, max-age=600');
    res.json(d);
  } catch (err) {
    console.error('Lỗi tải gợi ý thanh điệu:', err);
    res.status(500).json({ error: 'Lỗi tải nội dung.' });
  }
});

// Ngữ pháp HSK tra theo CẤP chứ không theo bài (CLAUDE.md 4.34), nên không có khái niệm "3 bài
// đầu" để cắt. CỐ Ý để MỞ: đây là bảng điểm ngữ pháp của đại cương HSK 3.0 — tài liệu công khai
// của Hanban, không phải nội dung biên soạn riêng; mà chặn nó thì 3 bài mở của mỗi cấp lại mất
// một tab, đúng phần khách cần xem thử.
router.get('/ngu-phap-hsk/:book', (req, res) => {
  const { book } = req.params;
  if (!/^hsk[1-6]$/.test(book)) return res.status(400).json({ error: 'Cấp không hợp lệ.' });
  traFile(res, 'hsk', `grammar-${book}`, 'public, max-age=3600, s-maxage=86400');
});

// Bảng TỪ VỰNG của cả một cấp HSK — cho trang tra cứu "Tổng hợp từ vựng từng cấp độ".
// CỐ Ý để MỞ, cùng lý do với ngữ pháp HSK ngay trên: đây là bảng từ của đại cương HSK 3.0
// (GF0025-2021), tài liệu công khai của Hanban. Trang tra cứu nằm trong `PUBLIC_PAGES` cùng
// trang song sinh TOCFL, mà dữ liệu TOCFL (`public/data/tocfl/cap-*.json`) chưa bao giờ bị chặn —
// để HSK đi qua cửa trả phí là hai trang cùng vai trò mà hành xử khác nhau.
//
// ⚠️ CHỈ trả trường `v` (từ vựng). Ngữ pháp / hội thoại / luyện viết của từng bài vẫn là nội dung
// trả phí và KHÔNG được lọt qua đây — trả nguyên bài thì route này thành cửa sau của /giaotrinh.
//
// Vì sao route này tồn tại thay vì client tự nạp từng bài: trước 2026-09-13 trang tra cứu gọi
// `napBai()` cho MỌI bài của cấp, nên sau khi có tường trả phí (4.41) người chưa mua nhận 402 ở
// mọi bài từ thứ 4 trở đi. Kho không ném lỗi mà trả rỗng, nên điều kiện "bài nào chưa nạp" của
// renderer không bao giờ hết — renderer tự gọi lại chính nó trong vòng lặp microtask và ĐÔNG CỨNG
// hẳn tab trình duyệt. Một cấp = một request là hết cả hai vấn đề.
router.get('/tu-vung-hsk/:cap', (req, res) => {
  try {
    const { cap } = req.params;
    if (!/^[1-6]$/.test(cap)) return res.status(400).json({ error: 'Cấp không hợp lệ.' });

    const thuMuc = path.resolve(GOC, 'hsk');
    const mau = new RegExp(`^hsk${cap}-(\\d+)\\.json$`);
    let ten = [];
    try {
      ten = fs.readdirSync(thuMuc)
        .map((f) => [f, mau.exec(f)])
        .filter(([, m]) => m)
        .sort((a, b) => Number(a[1][1]) - Number(b[1][1]));
    } catch {
      return res.status(404).json({ error: 'Không tìm thấy dữ liệu HSK.' });
    }
    if (!ten.length) return res.status(404).json({ error: 'Không tìm thấy dữ liệu HSK.' });

    const tu = [];
    for (const [f, m] of ten) {
      const s = docJson('hsk', f.replace(/\.json$/, ''));
      if (!s) continue;
      let d;
      try { d = JSON.parse(s); } catch { continue; }
      for (const w of (d.v || [])) tu.push({ ...w, bai: Number(m[1]) });
    }

    res.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    res.json({ cap: Number(cap), so_bai: ten.length, tu });
  } catch (err) {
    console.error('Lỗi tải từ vựng HSK theo cấp:', err);
    res.status(500).json({ error: 'Lỗi tải từ vựng.' });
  }
});

// ------------------------------------------------------------------ tra cứu từ vựng (công khai + rate-limit)
// Các file BULK vốn từ của DỰ ÁN đi qua đây để hưởng rate limit (router.use ở đầu file). Đây là
// vốn từ đã rà nghĩa Việt + ví dụ (công sức lớn của dự án, CLAUDE.md 4.45) — để tĩnh ở CDN thì
// một vòng lặp vài request là lấy sạch cả bộ. CÔNG KHAI (không cần đăng nhập) nhưng có ma sát.
//
// KHÔNG đưa vào đây: từ điển 122k mục (chu.json, w-*/k-*/c-* shard) và bảng bộ thủ — chúng là
// CC BY-SA / Unihan (redistribute tự do), cần nạp nhanh cho tra cứu từng chữ, và hưởng cache CDN.

router.get('/tra-cuu-kho', (req, res) => {
  // Vốn từ dự án: 10.927 mục, nghĩa Việt + ví dụ đã rà. Cache riêng (không private vì công khai)
  // nhưng qua API nên tính vào hạn mức tra cứu, chặn cào cả bộ.
  traFile(res, 'tudien', 'kho', 'public, max-age=3600, stale-while-revalidate=604800');
});

router.get('/tocfl/:cap', (req, res) => {
  const { cap } = req.params;
  if (!/^L[0-5]$/.test(cap)) return res.status(400).json({ error: 'Cấp không hợp lệ.' });
  traFile(res, 'tocfl', `cap-${cap}`, 'public, max-age=3600, stale-while-revalidate=604800');
});


// ------------------------------------------------------------------ trạng thái
/** Quyền của chính mình — giao diện dùng để biết bài nào hiện ổ khoá, gói còn hạn tới bao giờ. */
router.get('/quyen', optionalAuth, (req, res) => {
  // Bản này không bán khoá: mọi nội dung mở cho người đã đăng nhập. Giữ route để giao diện
  // không phải bỏ lời gọi — nó đọc `tat_ca` để biết có vẽ ổ khoá nào không.
  res.json({
    dang_nhap: !!req.userId,
    tat_ca: true,
    bo: [], quyen: [], het_han: null, so_bai_mo: SO_BAI_MO,
  });
});

/**
 * Chẩn đoán sau khi deploy — kho nội dung có thật sự đi theo function không.
 * Trên Vercel, thiếu `includeFiles` thì mọi bài học 404 mà log sạch trơn; mở đường dẫn này là
 * biết ngay. Không lộ nội dung, chỉ đếm file.
 */
router.get('/tinh-trang', (req, res) => {
  const dem = (p) => {
    try { return fs.readdirSync(path.resolve(GOC, p)).filter((f) => f.endsWith('.json')).length; }
    catch { return -1; }
  };
  res.json({
    goc: GOC,
    mo_het: MO_HET,
    so_bai_mo: SO_BAI_MO,
    so_file: {
      giaotrinh: dem('giaotrinh'), hsk: dem('hsk'),
      luyentap: dem('luyentap'), dich: dem('dich'),
      'hsk/dethi': dem('hsk/dethi'), thi: dem('thi'),
    },
  });
});

export default router;
