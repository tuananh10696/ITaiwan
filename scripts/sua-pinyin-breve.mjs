// =============================================================
// SỬA DẤU BREVE TRONG PHIÊN ÂM — 2026-09-13
//   node scripts/sua-pinyin-breve.mjs [--xem]
//
// Một phần dữ liệu Thời Đại / Đương đại ghi thanh 3 bằng dấu BREVE (˘: ă ĕ ĭ ŏ ŭ) thay vì dấu
// CARON (ˇ: ǎ ě ǐ ǒ ǔ). Hai dấu này nhìn gần giống nhau nên lọt qua mọi lần rà bằng mắt, nhưng:
//   • thanh 3 của pinyin LÀ caron — breve không phải dấu thanh tiếng Trung, tức đang dạy SAI;
//   • gõ "zhǐyǒu" tìm không ra "zhĭyŏu", nên tra cứu hụt.
// CLAUDE.md 4.37 đã ghi nhận lỗi này nhưng chỉ vá ở lớp TRA CỨU (`chuanPinyin()`), file nguồn
// vẫn nguyên — nên tab Từ vựng của giáo trình vẫn hiện dấu sai.
//
// ⚠️ CHỈ sửa trong trường `pinyin`. Tuyệt đối KHÔNG thay trên cả file: `ă` là chữ cái TIẾNG VIỆT
//    thật (ăn, năm, tăng...). Đo được trên dữ liệu hiện tại: 3.486 ký tự breve nằm trong nghĩa /
//    bản dịch / lời giảng tiếng Việt và đều HỢP LỆ; chỉ 683 ký tự nằm trong phiên âm là lỗi.
//    Thay cả file là hỏng gần 3.500 chỗ tiếng Việt mà không có lỗi nào hiện ra.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOC = path.resolve(__dirname, '..');
const XEM = process.argv.includes('--xem');

const MAP = { ă: 'ǎ', ĕ: 'ě', ĭ: 'ǐ', ŏ: 'ǒ', ŭ: 'ǔ', Ă: 'Ǎ', Ĕ: 'Ě', Ĭ: 'Ǐ', Ŏ: 'Ǒ', Ŭ: 'Ǔ' };
const BREVE = /[ăĕĭŏŭĂĔĬŎŬ]/g;
const sua = (s) => s.replace(BREVE, (c) => MAP[c] || c);

/** Chỉ đụng giá trị của khoá `pinyin` — cả dạng JSON ("pinyin": "...") lẫn dạng JS (pinyin: '...'). */
const KHOA_PINYIN = /(["']?pinyin["']?\s*:\s*)(["'])((?:\\.|(?!\2)[^\\])*)\2/g;

const thuMuc = [path.join(GOC, 'src/data'), path.join(GOC, 'public/data/giaotrinh'),
                path.join(GOC, 'public/data/hsk'), path.join(GOC, 'public/data/tocfl')];

let tongFile = 0, tongKyTu = 0;
const chiTiet = [];

for (const tm of thuMuc) {
  if (!fs.existsSync(tm)) continue;
  for (const f of fs.readdirSync(tm)) {
    if (!/\.(js|json)$/.test(f)) continue;
    const p = path.join(tm, f);
    const truoc = fs.readFileSync(p, 'utf8');
    let n = 0;
    const sau = truoc.replace(KHOA_PINYIN, (all, dau, nhay, gt) => {
      const moi = sua(gt);
      if (moi !== gt) n += (gt.match(BREVE) || []).length;
      return dau + nhay + moi + nhay;
    });
    if (!n) continue;
    tongFile++; tongKyTu += n;
    chiTiet.push(`${path.relative(GOC, p)}  ${n} ký tự`);
    if (!XEM) fs.writeFileSync(p, sau);
  }
}

console.log(chiTiet.join('\n'));
console.log(`\n${XEM ? '[chỉ xem] ' : ''}${tongKyTu} ký tự breve trong trường \`pinyin\` ở ${tongFile} file.`);

// Lưới an toàn: đếm lại breve NGOÀI trường pinyin để chắc chắn không đụng vào tiếng Việt.
let conNgoai = 0;
for (const tm of thuMuc) {
  if (!fs.existsSync(tm)) continue;
  for (const f of fs.readdirSync(tm)) {
    if (!/\.(js|json)$/.test(f)) continue;
    const s = fs.readFileSync(path.join(tm, f), 'utf8').replace(KHOA_PINYIN, '');
    conNgoai += (s.match(BREVE) || []).length;
  }
}
console.log(`Breve còn lại ngoài trường \`pinyin\` (tiếng Việt hợp lệ, KHÔNG đụng): ${conNgoai}`);
