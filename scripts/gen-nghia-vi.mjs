// =============================================================
// Lấp NGHĨA TIẾNG VIỆT cho những từ vựng còn đang mang nghĩa tiếng Anh.
//
//   node scripts/gen-nghia-vi.mjs            # sinh scripts/data-cache/bosung/nghia-vi.json
//   node scripts/gen-nghia-vi.mjs --kiem     # chỉ thống kê, không ghi file
//
// Vì sao có việc này: 4.853/10.562 từ của Đương đại Q5–Q6 và Thời Đại Q1–Q5 vẫn giữ nguyên
// nghĩa tiếng Anh của sách gốc (CLAUDE.md 4.26e, 4.27) — học viên người Việt mở tab Từ vựng ra
// đọc "(be) about to, on the point of" thì coi như bài đó chưa dịch.
//
// Nguồn: chính từ điển Trung–Việt đã có trong dự án (`public/data/tudien/w-*.json`, 120.180 mục
// dẫn xuất từ CVDICT — xem 4.37). Không tải gì thêm, không phụ thuộc dịch vụ ngoài.
//
// ⚠️ Nghĩa CVDICT PHẢI dọn trước khi dùng: CC-CEDICT xếp nghĩa theo thứ tự TỪ NGUYÊN chứ không
//    theo tần suất, nên chữ càng phổ thông thì nghĩa đầu càng lạ (水 = "họ Thuỷ"). Bộ dọn dùng
//    lại đúng `xepLaiNghia()` / `donDefCuoi()` của `gen-tudien.mjs` — đừng viết bản thứ hai.
//
// Từ nào từ điển cũng không có nghĩa Việt dùng được thì ghi vào `thieu.json` để soạn tay; bản
// soạn tay nằm ở `nghia-tay.json` và luôn được ưu tiên hơn từ điển.
// =============================================================
import fs from 'node:fs';
import path from 'node:path';

const GOC = path.resolve(import.meta.dirname, '..');
const THU_MUC = path.join(GOC, 'scripts/data-cache/bosung');
const KIEM = process.argv.includes('--kiem');

// ------------------------------------------------------------------ mượn bộ dò của gen-tudien
// Trích thẳng từ mã nguồn thay vì chép lại: hai bản dò "nghĩa này là tiếng Anh hay tiếng Việt"
// lệch nhau một chút là mỗi bên xếp một kiểu, và lỗi đó im lặng hoàn toàn.
const src = fs.readFileSync(path.join(GOC, 'scripts/gen-tudien.mjs'), 'utf8');
function trichHam(ten) {
  const i = src.indexOf(`function ${ten}(`);
  if (i < 0) throw new Error(`gen-tudien.mjs không còn hàm ${ten}()`);
  let sau = 0;
  for (let k = src.indexOf('{', i); k < src.length; k++) {
    if (src[k] === '{') sau++;
    else if (src[k] === '}' && !--sau) return src.slice(i, k + 1);
  }
  throw new Error(`không đóng được ngoặc của ${ten}()`);
}
const hangSo = (src.match(/const (CO_DAU_VIET|TU_TIENG_ANH|AM_DAU|NGUYEN|AM_CUOI) = [^;]+;/gs) || []).join('\n');
const { laTiengAnh, xepLaiNghia, donDefCuoi } = new Function(`
  ${hangSo}
  ${trichHam('laAmTietViet')}
  ${trichHam('laTiengAnh')}
  ${trichHam('xepLaiNghia')}
  ${trichHam('donDefCuoi')}
  return { laTiengAnh, xepLaiNghia, donDefCuoi };`)();


/**
 * Dọn thêm hai thứ mà `donDefCuoi()` không lo: ký hiệu lượng từ đứng thành VẾ RIÊNG và cái đuôi
 * nghĩa dài lê thê.
 *
 * · "LT:個[gè]" / "LT: 通[tòng], 面[miàn]" — `donDefCuoi` chỉ bỏ được dạng nằm trong ngoặc, còn
 *   dạng đứng riêng sau dấu chấm phẩy thì lọt, và thẻ từ vựng hiện ra "phim; LT:部[bù]".
 * · Từ điển liệt kê tới 7–8 vế nghĩa cho một chữ phổ thông. Thẻ từ chỉ cần vài nghĩa đầu; nghĩa
 *   đầy đủ vẫn còn nguyên ở trang Từ điển.
 */
function donNghia(d, toiDa = 3) {
  const ve = String(d || '')
    .split(/\s*;\s*/)
    .map((x) => x.replace(/\bLT\s*:[^;]*/gi, '').replace(/[\s,;]+$/, '').trim())
    .filter(Boolean);
  const gom = [...new Set(ve)];
  return gom.slice(0, toiDa).join('; ');
}

// ------------------------------------------------------------------ nạp từ điển
const tuDien = new Map();
for (let i = 0; i < 64; i++) {
  const f = path.join(GOC, `public/data/tudien/w-${String(i).padStart(2, '0')}.json`);
  if (!fs.existsSync(f)) continue;
  for (const r of JSON.parse(fs.readFileSync(f, 'utf8'))) {
    if (!tuDien.has(r[0])) tuDien.set(r[0], r[3] || []);
    if (r[1] && !tuDien.has(r[1])) tuDien.set(r[1], r[3] || []);   // tra được cả bằng dạng giản
  }
}
const traNghia = (tu) => tuDien.get(tu) || [];

// bản soạn tay luôn thắng từ điển máy
const fTay = path.join(THU_MUC, 'nghia-tay.json');
const nghiaTay = fs.existsSync(fTay) ? JSON.parse(fs.readFileSync(fTay, 'utf8')) : {};

// ------------------------------------------------------------------ quét từ vựng
const DIR = path.join(GOC, 'public/data/giaotrinh');
const ra = {}, thieu = [];
let tong = 0, tuTay = 0, tuDienLap = 0;

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const d = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  for (const w of d.v || []) {
    const han = String(w.hanzi || '');
    if (!han || !laTiengAnh(w.def)) continue;
    tong++;
    if (nghiaTay[han]) { ra[han] = nghiaTay[han]; tuTay++; continue; }
    const goc = traNghia(han).length ? traNghia(han) : traNghia(w.simplified || '');
    const sach = donNghia(donDefCuoi(xepLaiNghia(han, goc, traNghia).filter((x) => !laTiengAnh(x)).join('; ')));
    if (sach && !laTiengAnh(sach)) { ra[han] = sach; tuDienLap++; }
    else thieu.push({ hanzi: han, pinyin: w.pinyin || '', def: w.def, pos: w.pos || '', bai: f.replace('.json', '') });
  }
}

console.log(`từ mang nghĩa tiếng Anh : ${tong}`);
console.log(`  · bản soạn tay        : ${tuTay}`);
console.log(`  · từ điển Trung–Việt  : ${tuDienLap}`);
console.log(`  · CÒN THIẾU           : ${thieu.length}`);
if (KIEM) process.exit(0);

fs.mkdirSync(THU_MUC, { recursive: true });
fs.writeFileSync(path.join(THU_MUC, 'nghia-vi.json'), JSON.stringify(ra, null, 0));
fs.writeFileSync(path.join(THU_MUC, 'thieu-nghia.json'), JSON.stringify(thieu, null, 1));
console.log(`đã ghi nghia-vi.json (${Object.keys(ra).length} từ) và thieu-nghia.json`);
