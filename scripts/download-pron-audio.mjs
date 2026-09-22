#!/usr/bin/env node
// ============================================================
// Tải file phát âm mp3 từ tiengtrungthuonghai.vn về public/audio/pron/
//
//   npm run audio:pron
//
// URL nằm trong onclick của nút phát âm, dạng:
//   play_mp3('play','<id>','https://.../wp-content/uploads/2019/12/a.mp3','80','false')
// Script đọc HTML thô và bóc URL từ đó (bỏ qua video YouTube).
//
// Các bước:
//   1. Xoá sạch public/audio/pron cho đỡ rác
//   2. Crawl các trang bài học phát âm, gom mọi URL trong play_mp3()
//   3. Tải về, LƯU ĐÚNG TÊN GỐC trên server
//   4. Tự map tên file -> âm trong app, sinh src/data/pronAudioMap.js
//
// Chạy lại bao nhiêu lần cũng được. Âm nào không có file thì app tự
// dùng giọng đọc máy (TTS), giao diện không vỡ.
// ============================================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DEST = path.join(ROOT, 'public', 'audio', 'pron');
const MAP_FILE = path.join(ROOT, 'src', 'data', 'pronAudioMap.js');

const SITE = 'https://tiengtrungthuonghai.vn';
const HEAD = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
  Referer: SITE + '/',
};

// ------------------------------------------------------------
// Trang bắt đầu crawl. Script sẽ tự tìm thêm các bài cùng series.
// ------------------------------------------------------------
const SEEDS = [
  '/tailieuhoc/bai-6-bang-phien-am-tieng-trung-gom-thanh-mau-va-van-mau/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-1-van-mau-don-aoe/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-3-thanh-mau-b-p-m-f/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-4-thanh-mau-d-t-n-l/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-6-thanh-mau-j-q-x/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-9-thanh-mau-y-w/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-11-van-mau-ao-ou-iu/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-12-van-mau-ie-ue-er/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-13-van-mau-an-en/',
  '/tuhoctiengtrung/hoc-phat-am-chuan-tieng-trung-bai-14-van-mau-in-un-un/',
];
const LESSON_RE = /\/(tuhoctiengtrung|tailieuhoc)\/[^"'?#]*(phat-am|phien-am|thanh-mau|van-mau|thanh-dieu)[^"'?#]*\//i;
const MAX_PAGES = 60;

// ------------------------------------------------------------
// Bảng nhận diện: âm trong app  ->  các tên file có thể gặp
// ------------------------------------------------------------
const FINALS = {
  a: ['a'], o: ['o'], e: ['e'], i: ['i', 'yi'], u: ['u', 'wu'], 'ü': ['u1', 'v', 'yu', 'ü'],
  ai: ['ai'], ei: ['ei'], ao: ['ao'], ou: ['ou'],
  an: ['an'], en: ['en'], ang: ['ang'], eng: ['eng'], ong: ['ong'], er: ['er'],
  ia: ['ia', 'ya'], ie: ['ie', 'ye'], iao: ['iao', 'yao'], iu: ['iu', 'iou', 'you'],
  ian: ['ian', 'yan'], in: ['in', 'yin'], iang: ['iang', 'yang'], ing: ['ing', 'ying'],
  iong: ['iong', 'yong'],
  ua: ['ua', 'wa'], uo: ['uo', 'wo'], uai: ['uai', 'wai'], ui: ['ui', 'uei', 'wei'],
  uan: ['uan', 'wan'], un: ['un', 'uen', 'wen'], uang: ['uang', 'wang'], ueng: ['ueng', 'weng', '翁'],
  'üe': ['ue', 'üe', 've', 'yue'], 'üan': ['uan1', 'üan', 'van', 'yuan'], 'ün': ['un1', 'ün', 'vn', 'yun'],
};

const INITIALS = {
  // LƯU Ý: tên thanh mẫu đọc là "bo/po/mo/fo", KHÔNG phải "ba".
  // Đừng thêm '巴' vào b — file đó là chữ "ba", dùng cho tones/1.
  b: ['b', 'bo', 'bo1', '波', '玻'], p: ['p', 'po', '泼', '坡'],
  m: ['m', 'mo', 'mo1', '摸', '摩'], f: ['f', 'fo', 'fo1', '佛'],
  d: ['d', 'de'], t: ['t', 'te'], n: ['n', 'ne'], l: ['l', 'le'],
  g: ['g', 'ge'], k: ['k', 'ke'], h: ['h', 'he'],
  j: ['j', 'ji'], q: ['q', 'qi'], x: ['x', 'xi'],
  zh: ['zh', 'zhi'], ch: ['ch', 'chi'], sh: ['sh', 'shi'], r: ['r', 'ri'],
  z: ['z', 'zi', '资'], c: ['c', 'ci', '疵'], s: ['s', 'si', '私'],
};

const TONES = {
  1: ['巴', 'ma1', 'thanh1', 'ba1'],
  2: ['拔', 'ma2', 'thanh2', 'ba2'],
  3: ['把', 'ma3', 'thanh3', 'ba3'],
  4: ['爸', 'ma4', 'thanh4', 'ba4'],
  0: ['吧', 'ma0', 'thanh-nhe'],
};

// Ví dụ biến điệu — key phải khớp trường `key` trong toneSandhi (pronunciationData.js)
const SANDHI = {
  'ni-hao': ['你好'], 'wo-hen-hao': ['我很好'],
  'bu-qu': ['不去'], 'bu-bian': ['不变', '不變'], 'bu-lun': ['不论', '不論'],
  'yi-ge': ['一个', '一個'], 'yi-tian': ['一天'], 'yi-ding': ['一定'],
  'yi-nian': ['一年'], 'yi-yang': ['一样', '一樣'], 'yi-gai': ['一概'], 'yi-miao': ['一秒'],
};

// Vận mẫu và thanh mẫu có tên trùng nhau (a, e, i, o, u, n, r...).
// Ưu tiên: nếu trang đang nói về thanh mẫu thì gán cho thanh mẫu.
const AMBIGUOUS = new Set(['a', 'e', 'i', 'o', 'u', 'n', 'r', 'ai', 'an', 'en', 'ei']);

const log = (...a) => console.log(...a);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const abs = u => (u.startsWith('http') ? u : SITE + (u.startsWith('/') ? u : '/' + u));

// ------------------------------------------------------------
// 1. Dọn thư mục cũ
// ------------------------------------------------------------
// KHÔNG xoá thẳng thư mục cũ. Trước đây script xoá trước rồi mới crawl —
// crawl hỏng (mất mạng / site đổi layout) là mất sạch file đã tải, phải tải lại từ đầu.
// Giờ đổi tên sang .backup, chỉ xoá backup khi tải mới THÀNH CÔNG; hỏng thì trả lại.
const BACKUP = DEST + '.backup';
let backupCount = 0;
if (fs.existsSync(BACKUP)) fs.rmSync(BACKUP, { recursive: true, force: true });
if (fs.existsSync(DEST)) {
  backupCount = fs.readdirSync(DEST, { recursive: true }).filter(f => String(f).endsWith('.mp3')).length;
  fs.renameSync(DEST, BACKUP);
  log(`💾 Giữ tạm ${backupCount} file mp3 cũ ở public/audio/pron.backup\n`);
}
fs.mkdirSync(DEST, { recursive: true });

/** Tải hỏng -> trả lại thư mục cũ nguyên vẹn rồi thoát */
function restoreBackup(why) {
  if (fs.existsSync(BACKUP)) {
    fs.rmSync(DEST, { recursive: true, force: true });
    fs.renameSync(BACKUP, DEST);
    log(`\n❌ ${why}`);
    log(`↩️  Đã khôi phục ${backupCount} file mp3 cũ — không mất gì. Bảng pronAudioMap.js giữ nguyên.`);
  } else {
    log(`\n❌ ${why}`);
    log('   Không có bản cũ để khôi phục.');
  }
  process.exit(1);
}

process.on('uncaughtException', e => restoreBackup('Script lỗi: ' + e.message));

// ------------------------------------------------------------
// 2. Crawl, bóc URL trong play_mp3()
// ------------------------------------------------------------
log('🕸  Crawl các trang bài học phát âm...\n');

const queue = [...SEEDS];
const visited = new Set();
const hits = [];             // { url, page, pageSlug }

while (queue.length && visited.size < MAX_PAGES) {
  const p = queue.shift();
  const key = p.replace(/^https?:\/\/[^/]+/, '');
  if (visited.has(key)) continue;
  visited.add(key);

  let html;
  try {
    const res = await fetch(abs(p), { headers: HEAD });
    if (!res.ok) { log(`  ⚠️  ${key} → HTTP ${res.status}`); continue; }
    html = await res.text();
  } catch (e) { log(`  ⚠️  ${key} → ${e.message}`); continue; }

  // URL trong onclick play_mp3('play','<id>','<URL>',...)
  let n = 0;
  for (const m of html.matchAll(/play_mp3\s*\(\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'([^']+?\.mp3)'/gi)) {
    hits.push({ url: abs(m[1]), page: key }); n++;
  }
  // Dự phòng: mọi link .mp3 khác trong HTML (không tính youtube)
  for (const m of html.matchAll(/(https?:\/\/[^"'\s)<>\\]+?\.mp3)/gi)) {
    if (/youtu\.?be|ytimg/i.test(m[1])) continue;
    hits.push({ url: m[1], page: key }); n++;
  }
  log(`  ${n ? '🔊' : '  '} ${key.slice(0, 68).padEnd(70)} ${n} link`);

  // Tìm thêm bài cùng series
  for (const m of html.matchAll(/href="([^"]+)"/gi)) {
    const href = m[1];
    if (!LESSON_RE.test(href)) continue;
    const k = abs(href).replace(/^https?:\/\/[^/]+/, '');
    if (!visited.has(k) && !queue.includes(k) && visited.size + queue.length < MAX_PAGES) queue.push(k);
  }
  await sleep(150);
}

const byUrl = new Map();
hits.forEach(h => { if (!byUrl.has(h.url)) byUrl.set(h.url, h); });
log(`\n📥 Tìm được ${byUrl.size} file mp3 duy nhất trên ${visited.size} trang\n`);

if (!byUrl.size) {
  log('❌ Không thấy link mp3 nào. Có thể trang đã đổi cấu trúc.');
  log('   Mở 1 trang bài học, xem onclick của nút phát âm, rồi báo lại URL mẫu.\n');
  process.exit(1);
}

// ------------------------------------------------------------
// 3. Tải về, giữ nguyên tên gốc
// ------------------------------------------------------------
function fileNameFromUrl(url) {
  let n = decodeURIComponent(url.split('/').pop().split('?')[0]);
  return n.normalize('NFC').replace(/[^\p{L}\p{N}._-]+/gu, '-').replace(/-+/g, '-').toLowerCase();
}

const downloaded = [];   // { name, stem, page, bytes }
const failed = [];
const items = [...byUrl.values()];

for (let i = 0; i < items.length; i += 4) {
  await Promise.all(items.slice(i, i + 4).map(async h => {
    const name = fileNameFromUrl(h.url);
    const dest = path.join(DEST, name);
    try {
      const res = await fetch(h.url, { headers: HEAD, redirect: 'follow' });
      if (!res.ok) { failed.push({ ...h, why: `HTTP ${res.status}` }); return; }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 800 || /text\/html/i.test(res.headers.get('content-type') || '')) {
        failed.push({ ...h, why: 'không phải mp3 hợp lệ' }); return;
      }
      fs.writeFileSync(dest, buf);
      downloaded.push({ name, stem: name.replace(/\.mp3$/, ''), page: h.page, bytes: buf.length });
    } catch (e) { failed.push({ ...h, why: e.message }); }
  }));
  process.stdout.write(`\r  đã tải ${downloaded.length}/${items.length}...`);
  await sleep(120);
}
log(`\r  ✅ Tải xong ${downloaded.length}/${items.length} file${failed.length ? ` (${failed.length} lỗi)` : ''}\n`);

// ------------------------------------------------------------
// 4. Map tên file -> âm trong app
// ------------------------------------------------------------
const targets = [
  ...Object.entries(INITIALS).map(([k, c]) => ({ key: `initials/${k}`, label: `thanh mẫu ${k}`, cands: c, kind: 'initials' })),
  ...Object.entries(FINALS).map(([k, c]) => ({ key: `finals/${k}`, label: `vận mẫu ${k}`, cands: c, kind: 'finals' })),
  ...Object.entries(TONES).map(([k, c]) => ({ key: `tones/${k}`, label: `thanh ${k}`, cands: c, kind: 'tones' })),
  ...Object.entries(SANDHI).map(([k, c]) => ({ key: `sandhi/${k}`, label: `biến điệu ${k}`, cands: c, kind: 'sandhi' })),
];

// stem -> danh sách target khớp
const found = {};
const usedFiles = new Set();

function pageHints(page) {
  return {
    initials: /thanh-mau/i.test(page),
    finals: /van-mau/i.test(page),
    tones: /thanh-dieu/i.test(page),
  };
}

for (const t of targets) {
  // ứng viên khớp, ưu tiên file nằm trên trang đúng chủ đề
  const matches = downloaded.filter(f => t.cands.includes(f.stem));
  if (!matches.length) continue;
  let pick = matches.find(f => pageHints(f.page)[t.kind]);
  if (!pick) {
    // tên mơ hồ (a, e, i, n, r...) mà không có gợi ý từ trang -> chỉ nhận nếu chưa ai dùng
    const amb = t.cands.some(c => AMBIGUOUS.has(c));
    pick = matches.find(f => !usedFiles.has(f.name)) || (amb ? null : matches[0]);
  }
  if (!pick) continue;
  found[t.key] = pick.name;
  usedFiles.add(pick.name);
}

// Âm nào crawl không ra thì thử gõ thẳng URL theo mẫu đã biết
const BASE = SITE + '/wp-content/uploads/2019/12';
const notYet = targets.filter(t => !found[t.key]);
if (notYet.length) {
  log(`\n🔗 Thử gõ thẳng URL cho ${notYet.length} âm còn thiếu...`);
  for (const t of notYet) {
    for (const cand of t.cands) {
      const url = `${BASE}/${encodeURIComponent(cand)}.mp3`;
      try {
        const res = await fetch(url, { headers: HEAD, redirect: 'follow' });
        if (!res.ok) continue;
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 800 || /text\/html/i.test(res.headers.get('content-type') || '')) continue;
        const name = `${cand}.mp3`.toLowerCase();
        fs.writeFileSync(path.join(DEST, name), buf);
        downloaded.push({ name, stem: cand.toLowerCase(), page: t.kind, bytes: buf.length });
        found[t.key] = name; usedFiles.add(name);
        log(`  ✅ ${t.label} → ${name}`);
        break;
      } catch { /* thử tên tiếp theo */ }
    }
    await sleep(120);
  }
}

const missing = targets.filter(t => !found[t.key]);
const extra = downloaded.filter(f => !usedFiles.has(f.name)).map(f => f.name).sort();
const downloadedCount = fs.readdirSync(DEST).filter(f => f.endsWith('.mp3')).length;
if (downloadedCount === 0) {
  restoreBackup('Không tải được file mp3 nào (mạng chặn, hoặc site đã đổi cấu trúc).');
}
if (backupCount > 0 && downloadedCount < backupCount * 0.6) {
  restoreBackup(`Chỉ tải được ${downloadedCount} file, ít hơn nhiều so với ${backupCount} file đang có.`);
}

const entries = Object.entries(found).sort(([a], [b]) => a.localeCompare(b));

const mapJs = `// ============================================================
// TỰ ĐỘNG SINH bởi scripts/download-pron-audio.mjs — ĐỪNG SỬA TAY
// Chạy lại: npm run audio:pron
//
// key = "<nhóm>/<pinyin>"  ->  đường dẫn file trong public/
// Âm nào không có trong bảng này thì app tự dùng giọng đọc máy (TTS).
// Sửa tay ở đây sẽ MẤT khi chạy lại script — muốn sửa vĩnh viễn thì dùng
// src/data/pronAudioFix.js (bảng đó được ưu tiên hơn bảng này).
// Đã map ${entries.length}/${targets.length} âm.
// ============================================================
export const pronAudioMap = {
${entries.map(([k, v]) => `  '${k}': '/audio/pron/${v}',`).join('\n')}
};

// File tải được nhưng chưa map vào âm nào — xem tên rồi bổ sung thủ công nếu cần:
export const pronAudioExtra = [
${extra.map(f => `  '/audio/pron/${f}',`).join('\n')}
];
`;

fs.mkdirSync(path.dirname(MAP_FILE), { recursive: true });
fs.writeFileSync(MAP_FILE, mapJs);

// Tải mới ổn -> mới dọn bản cũ
if (fs.existsSync(BACKUP)) {
  fs.rmSync(BACKUP, { recursive: true, force: true });
  log(`🧹 Đã dọn bản cũ (${backupCount} file) — bản mới có ${downloadedCount} file\n`);
}

// ------------------------------------------------------------
log('─'.repeat(60));
log(`📊 Map được ${entries.length}/${targets.length} âm · ${extra.length} file chưa map`);
log(`📝 Đã ghi ${path.relative(ROOT, MAP_FILE)}`);

if (missing.length) {
  log(`\n⚠️  ${missing.length} âm chưa có file (app dùng giọng đọc máy):`);
  log('   ' + missing.map(t => t.key).join(', '));
}
if (extra.length) {
  log(`\n📦 File chưa map (${extra.length}) — nếu thấy tên nào ứng với âm nào,`);
  log('   thêm tên đó vào FINALS/INITIALS/TONES trong script rồi chạy lại:');
  log('   ' + extra.slice(0, 40).join(', ') + (extra.length > 40 ? ` ... +${extra.length - 40}` : ''));
}
if (failed.length) {
  log(`\n❌ ${failed.length} link tải lỗi:`);
  failed.slice(0, 10).forEach(f => log(`   ${f.url} — ${f.why}`));
}
if (Object.keys(found).some(k => k.startsWith('tones/'))) {
  log('\n🔊 Kiểm tra giúp: file thanh điệu phát ra âm tiết gì?');
  log('   App đang hiện chữ mẫu 媽 / 麻 / 馬 / 罵 (mā má mǎ mà).');
  log('   Nếu ghi âm dùng âm khác, báo để đổi chữ mẫu cho khớp tiếng.');
  Object.entries(found).filter(([k]) => k.startsWith('tones/')).forEach(([k, v]) => log(`   ${k} → ${v}`));
}
log('');
