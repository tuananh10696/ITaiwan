// ============================================================
// Sinh public/sitemap.xml + public/robots.txt từ bảng route trong src/main.js
// Chạy: npm run seo:sitemap  (chạy lại mỗi khi thêm/đổi path trong navConfig)
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Tên miền thật của trung tâm — đặt qua biến môi trường SITE_URL khi deploy.
const SITE = (process.env.SITE_URL || 'https://duhocitaiwan.com').replace(/\/+$/, '');

// Trang chưa có nội dung thật thì không đưa vào sitemap (tránh Google index màn "Sắp ra mắt")
const src = fs.readFileSync(path.join(ROOT, 'src/main.js'), 'utf8');

const implemented = new Set(
  (src.match(/const IMPLEMENTED_PAGES = new Set\(\[([\s\S]*?)\]\)/) || [, ''])[1]
    .match(/'([^']+)'/g)?.map(x => x.slice(1, -1)) || []
);
// Trang chỉ tồn tại trong 1 phiên làm việc, không share được -> loại khỏi sitemap
['exam-taking'].forEach(p => implemented.delete(p));
// CHỈ trang khách xem được. Trước đây loại trừ bằng một danh sách viết tay, và mỗi lần thêm trang
// cần đăng nhập mà quên khai là sitemap lại có một URL soft-404 (Thi thử TOCFL, Bài kiểm tra,
// Hồ sơ du học đều từng lọt). Khách mở trang không có trong PUBLIC_PAGES là bị đá về trang chủ.
const congKhai = new Set(
  (src.match(/const PUBLIC_PAGES = new Set\(\[([\s\S]*?)\]\)/) || [, ''])[1]
    .match(/'([^']+)'/g)?.map(x => x.slice(1, -1)) || []
);
if (!congKhai.size) throw new Error('Không đọc được PUBLIC_PAGES trong src/main.js — đổi cách khai báo thì sửa regex ở đây.');

// Bóc navConfig (mảng literal thuần, không gọi hàm nào) rồi dựng path ĐÚNG như registerPath() của
// main.js — kể cả nhóm `subparent` (/tocfl/hoc-phat-am/thanh-mau). Bản cũ bóc theo từng dòng, không
// biết subparent, nên sitemap ghi /hoc-phat-am/... và /tocfl/bo-thu-han-tu/... — toàn trang 404.
const navDau = src.indexOf('const navConfig = [');
const navSrc = src.slice(src.indexOf('[', navDau), src.indexOf('\n];', navDau)) + '\n]';
const navConfig = new Function(`return ${navSrc};`)();
const urls = [];

const ghep = (...p) => '/' + p.join('/').split('/').filter(Boolean).join('/');
function themTrang(id, loc) {
  if (!implemented.has(id)) return;
  // Trang cần đăng nhập: khách (và Googlebot) mở ra là bị đá về trang chủ -> soft-404.
  if (!congKhai.has(id)) return;
  urls.push({ id, loc });
}
for (const item of navConfig) {
  if (item.type !== 'parent') { if (item.id) themTrang(item.id, ghep(item.path || '')); continue; }
  for (const c of item.children) {
    if (c.type === 'group') continue;
    if (c.type === 'subparent') c.children.forEach((cc) => themTrang(cc.id, ghep(item.path, c.path, cc.path)));
    else themTrang(c.id, ghep(item.path, c.path));
  }
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
