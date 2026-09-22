// ============================================================
// Sinh public/sitemap.xml + public/robots.txt từ bảng route trong src/main.js
// Chạy: npm run seo:sitemap  (chạy lại mỗi khi thêm/đổi path trong navConfig)
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Tên miền thật của trung tâm — đặt qua biến môi trường SITE_URL khi deploy.
const SITE = (process.env.SITE_URL || 'https://itaiwan.vn').replace(/\/+$/, '');

// Trang chưa có nội dung thật thì không đưa vào sitemap (tránh Google index màn "Sắp ra mắt")
const src = fs.readFileSync(path.join(ROOT, 'src/main.js'), 'utf8');

const implemented = new Set(
  (src.match(/const IMPLEMENTED_PAGES = new Set\(\[([\s\S]*?)\]\)/) || [, ''])[1]
    .match(/'([^']+)'/g)?.map(x => x.slice(1, -1)) || []
);
// Trang chỉ tồn tại trong 1 phiên làm việc, không share được -> loại khỏi sitemap
['exam-taking'].forEach(p => implemented.delete(p));

// Bóc navConfig để lấy path
const navSrc = src.slice(src.indexOf('const navConfig = ['), src.indexOf('\n];', src.indexOf('const navConfig = [')));
const urls = [];
/** Trang cần đăng nhập mới có nội dung -> không đưa vào sitemap. */
const KHONG_VAO_SITEMAP = new Set([
  'path-overview', 'path-today', 'path-homework', 'path-progress', 'path-achievements',
  // Ba trang tài khoản chỉ có nội dung khi ĐÃ ĐĂNG NHẬP — cùng lý do với 5 trang Lộ trình.
  // `account-membership` thì NGƯỢC LẠI: bảng giá cố ý mở cho khách (nằm trong PUBLIC_PAGES),
  // và đó là trang đáng để Google lập chỉ mục nhất trong nhóm này (4.41).
  'account-profile', 'account-settings', 'account-notifications',
  // Khu HSK đang ẩn — hai trang này có `id` nên vốn tự vào sitemap từ navConfig.
]);

let currentParent = '';
for (const line of navSrc.split('\n')) {
  const parent = line.match(/type: 'parent', id: '([^']+)', path: '([^']*)'/);
  if (parent) { currentParent = parent[2]; continue; }
  const m = line.match(/\{\s*id: '([^']+)', path: '([^']*)'/);
  if (!m) continue;
  const [, id, slug] = m;
  if (!implemented.has(id)) continue;
  // 5 trang "Lộ trình của tôi" chỉ có nội dung khi ĐÃ ĐĂNG NHẬP — khách (và Googlebot) mở ra
  // là bị đá về trang chủ, tức một trang soft-404 nữa trong sitemap. Không đưa vào (4.38).
  if (KHONG_VAO_SITEMAP.has(id)) continue;
  const isTop = /^\s*\{ id:/.test(line) && !line.includes('nav-child');
  const full = currentParent && !isTopLevel(navSrc, id) ? `${currentParent}/${slug}` : slug;
  urls.push({ id, loc: '/' + full.split('/').filter(Boolean).join('/') });
}

function isTopLevel(nav, id) {
  // entry cấp 1 nằm ngay dưới navConfig, không thụt vào trong children
  const re = new RegExp(`^  \\{ id: '${id}'`, 'm');
  return re.test(nav);
}

// Bài con Giáo trình Thời Đại — cùng nguyên tắc: chỉ bài ĐÃ CÓ từ vựng. Số phần mỗi bài không
// cố định (quyển 1 có 3 phần) nên duyệt thẳng thoidaiSubLessons chứ đừng giả định x.1/x.2.
const tdBase = urls.find(u => u.id === 'tocfl-thoidai');
if (tdBase) {
  const { thoidaiSubLessons, tdSubSegs } =
    await import(pathToFileURL(path.join(ROOT, 'src/data/thoidaiData.js')).href);
  for (const s of thoidaiSubLessons) {
    if (s.count > 0) urls.push({ id: 'td-' + s.id, loc: `${tdBase.loc}/${tdSubSegs(s.id).join('/')}/tu-vung` });
  }
}

// Từ vựng TOCFL theo cấp — 6 trang cấp. Đọc index.json (vài trăm byte) chứ KHÔNG mở 6 file
// dữ liệu 7.517 từ; index đã mang đủ danh sách cấp. Chỉ đưa cấp thật sự có từ, tránh soft-404.
const tvBase = urls.find(u => u.id === 'tocfl-vocab');
if (tvBase) {
  try {
    const idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/tocfl/index.json'), 'utf8'));
    const SLUG = { L0: 'chuan-bi', L1: 'cap-1', L2: 'cap-2', L3: 'cap-3', L4: 'cap-4', L5: 'cap-5' };
    for (const c of idx) {
      if (c.tongTu > 0 && SLUG[c.cap]) urls.push({ id: 'tocfl-vocab-' + c.cap, loc: `${tvBase.loc}/${SLUG[c.cap]}/danh-sach` });
    }
  } catch {
    // Chưa chạy `npm run tocfl:vocab` thì bỏ qua — sitemap vẫn sinh được, chỉ thiếu 6 URL này.
    console.warn('  (chưa có public/data/tocfl/index.json — bỏ qua URL từ vựng TOCFL)');
  }
}

// ---- 214 trang bộ thủ (4.37) ----
// Mỗi bộ là một trang tra cứu đứng riêng ("bộ 水 thuỷ — nước", kèm 622 chữ thuộc bộ), đúng
// loại nội dung người Việt tìm kiếm. `bothu.json` chỉ 7 KB nên đọc thẳng, không phải mở
// file dữ liệu lớn nào.
const btBase = urls.find(u => u.id === 'radicals');
if (btBase) {
  try {
    const bo = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/tudien/bothu.json'), 'utf8'));
    for (const b of bo) urls.push({ id: 'bothu-' + b.so, loc: `${btBase.loc}/bo-${b.so}` });
  } catch {
    // Chưa chạy `npm run tudien:build` thì bỏ qua — sitemap vẫn sinh được, chỉ thiếu 214 URL.
    console.warn('  (chưa có public/data/tudien/bothu.json — bỏ qua URL bộ thủ)');
  }
}

const uniq = [...new Map(urls.map(u => [u.loc, u])).values()];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniq.map(u => `  <url>
    <loc>${SITE}${u.loc === '/' ? '/' : u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.loc === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /api/
Disallow: /tocfl/thi-thu/dang-thi

Sitemap: ${SITE}/sitemap.xml
`;

fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml);
fs.writeFileSync(path.join(ROOT, 'public/robots.txt'), robots);
console.log(`✅ sitemap.xml — ${uniq.length} URL`);
uniq.forEach(u => console.log('   ' + u.loc));
console.log('✅ robots.txt');
