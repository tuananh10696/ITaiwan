// =============================================================
// ÁP BẢN DỊCH TIẾNG VIỆT vào hội thoại giáo trình — 2026-09-16
// =============================================================
// `gen-duongdai-dialogue.py` / `gen-thoidai-dialogue` dựng hội thoại bằng ASR nên chỉ có chữ Hán
// và phiên âm — trường `vi` để RỖNG (4.26h ghi rõ: "script không tự dịch"). Đo được: **294/324
// bài không có bản dịch**, tức học viên mở trang Hội thoại ra chỉ thấy chữ Hán và pinyin.
//
// Bản dịch soạn tay để ở `scripts/data-cache/dich-hoi-thoai/<bộ><quyển>.json`:
//   { "<id bài con>": ["dịch câu 0", "dịch câu 1", ...] }
//
// ⚠️ GÁN THEO VỊ TRÍ nên rất dễ lệch: thiếu một câu ở giữa là mọi câu sau đó mang bản dịch của
// câu khác — sai mà không có lỗi nào hiện ra. Vì vậy script BỎ QUA CẢ BÀI khi số câu không khớp,
// thay vì ghép bừa phần đầu (cùng nguyên tắc với `gop-dich.mjs` ở 4.26i).
//
//   node scripts/ap-dich-hoi-thoai.mjs --xem   đối chiếu, không ghi
//   node scripts/ap-dich-hoi-thoai.mjs         ghi vào src/data/*Dialogues*.js
import fs from 'node:fs';
import path from 'node:path';

const GOC = path.resolve(import.meta.dirname, '..');
const DICH_DIR = path.join(GOC, 'scripts/data-cache/dich-hoi-thoai');
const XEM = process.argv.includes('--xem');

if (!fs.existsSync(DICH_DIR)) { console.error('❌ Chưa có thư mục bản dịch:', DICH_DIR); process.exit(1); }

let tongAp = 0, tongLech = 0, tongThieu = 0;

for (const fd of fs.readdirSync(DICH_DIR).filter((f) => f.endsWith('.json'))) {
  const dich = JSON.parse(fs.readFileSync(path.join(DICH_DIR, fd), 'utf8'));
  // duongdai2.json -> src/data/duongdaiDialogues2.js
  const m = /^([a-z]+)(\d+)\.json$/.exec(fd);
  if (!m) { console.log('  ⚠ tên file không theo mẫu <bộ><quyển>.json:', fd); continue; }
  const dest = path.join(GOC, 'src/data', `${m[1]}Dialogues${m[2]}.js`);
  if (!fs.existsSync(dest)) { console.log('  ⚠ không có file đích:', path.basename(dest)); continue; }

  const raw = fs.readFileSync(dest, 'utf8');
  const i = raw.indexOf('{');
  const j = raw.lastIndexOf('}');
  const data = JSON.parse(raw.slice(i, j + 1));

  let ap = 0, lech = 0, thieu = 0;
  for (const [bai, ds] of Object.entries(dich)) {
    const v = data[bai];
    if (!v || !Array.isArray(v.cues)) { console.log(`  ✗ ${bai}: không có trong dữ liệu`); thieu++; continue; }
    if (v.cues.length !== ds.length) {
      console.log(`  ✗ ${bai}: dữ liệu ${v.cues.length} câu nhưng bản dịch ${ds.length} câu — BỎ QUA cả bài`);
      lech++;
      continue;
    }
    v.cues.forEach((c, k) => { if (ds[k] && ds[k].trim()) c.vi = ds[k].trim(); });
    ap++;
  }

  if (!XEM && ap) fs.writeFileSync(dest, raw.slice(0, i) + JSON.stringify(data, null, 1) + raw.slice(j + 1), 'utf8');
  console.log(`  ${fd.padEnd(18)} áp ${ap} bài · lệch ${lech} · thiếu ${thieu}`);
  tongAp += ap; tongLech += lech; tongThieu += thieu;
}

console.log(`\n${XEM ? '[--xem] ' : ''}Áp ${tongAp} bài · ${tongLech} bài lệch số câu · ${tongThieu} bài không tìm thấy`);
if (!XEM && tongAp) console.log('Chạy `npm run data:tach` để sinh lại public/data.');
