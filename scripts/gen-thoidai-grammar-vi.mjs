// =============================================================
// BẢN DỊCH TIẾNG VIỆT cho ngữ pháp Giáo trình Thời Đại (2026-09-06)
// =============================================================
//   node scripts/gen-thoidai-grammar-vi.mjs --quyen 1 --xuat   # xuất khung để soạn bản dịch
//   node scripts/gen-thoidai-grammar-vi.mjs --quyen 1          # trộn bản đã soạn vào dữ liệu
//
// PPT gốc của 淡江大學華語中心 giải thích ngữ pháp bằng TIẾNG ANH (quyển 1-2) hoặc TIẾNG TRUNG
// (quyển 3-5) — học viên Việt đọc rất nặng. Script này gắn thêm 2 trường vào từng điểm:
//   · `titleVi`   tên điểm ngữ pháp bằng tiếng Việt
//   · `giaiThich`  lời giảng tiếng Việt (dịch từ giải thích gốc, giữ nguyên thuật ngữ chữ Hán)
//     — cùng tên trường với Đương đại nên renderer `ddGramItemHtml` hiển thị được ngay.
//
// Bản soạn nằm ở scripts/data-cache/thoidai/grammar-vi/q<N>.json, KHOÁ LÀ TIÊU ĐỀ GỐC của điểm
// ngữ pháp — không dùng chỉ số, vì chạy lại gen-thoidai-grammar.mjs là chỉ số đổi hết.
// Cùng một điểm ngữ pháp xuất hiện ở nhiều bài thì chỉ cần soạn MỘT lần.
//
// Điểm nào chưa soạn thì giữ nguyên giải thích gốc — giao diện tự hiển thị bản gốc, KHÔNG bịa.
// =============================================================
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOAN = path.join(__dirname, 'data-cache', 'thoidai', 'grammar-vi');
const arg = (t, d) => { const i = process.argv.indexOf(t); return i > 0 ? process.argv[i + 1] : d; };
const QUYENS = String(arg('--quyen', '1')).split(',').map(Number).filter(Boolean);
const XUAT = process.argv.includes('--xuat');

async function main() {
  await fs.mkdir(SOAN, { recursive: true });
  for (const q of QUYENS) {
    const file = path.join(ROOT, 'src', 'data', `thoidaiGrammar${q}.js`);
    const txt = await fs.readFile(file, 'utf8');
    const m = /thoidaiGrammar\d+\s*=\s*(\{[\s\S]*\});\s*$/.exec(txt);
    const data = JSON.parse(m[1]);

    const fSoan = path.join(SOAN, `q${q}.json`);
    let soan = {};
    try { soan = JSON.parse(await fs.readFile(fSoan, 'utf8')); } catch {}

    if (XUAT) {
      // Khung: mỗi tiêu đề gốc một mục, kèm giải thích gốc để người soạn dịch.
      const khung = {};
      for (const [k, arr] of Object.entries(data)) {
        if (!k.endsWith('.1')) continue;
        for (const d of arr) {
          if (khung[d.title]) continue;
          const goc = (d.points || []).map((p) => p.formula).filter(Boolean).join(' ');
          khung[d.title] = soan[d.title] || { titleVi: '', giaiThichVi: '', _goc: goc.slice(0, 700) };
        }
      }
      await fs.writeFile(fSoan, JSON.stringify(khung, null, 1), 'utf8');
      const thieu = Object.values(khung).filter((x) => !x.giaiThichVi).length;
      console.log(`📤 Quyển ${q}: ${Object.keys(khung).length} điểm ngữ pháp -> ${path.relative(ROOT, fSoan)}`);
      console.log(`   còn ${thieu} điểm chưa có bản dịch`);
      continue;
    }

    let gan = 0;
    for (const arr of Object.values(data)) {
      for (const d of arr) {
        const s = soan[d.title];
        if (!s || (!s.titleVi && !s.giaiThichVi)) continue;
        if (s.titleVi) d.titleVi = s.titleVi;
        // Ghi vào ĐÚNG trường renderer đang đọc (`giaiThich`, dùng chung với Đương đại) —
        // đặt tên khác là dịch xong mà giao diện vẫn hiện bản tiếng Anh.
        if (s.giaiThichVi) d.giaiThich = s.giaiThichVi;
        gan++;
      }
    }
    const banner = txt.slice(0, txt.indexOf('export const'));
    await fs.writeFile(file, banner
      + `export const thoidaiGrammar${q} = ${JSON.stringify(data, null, 1)};\n`, 'utf8');
    const tong = Object.values(data).reduce((s2, a) => s2 + a.length, 0);
    console.log(`✅ Quyển ${q}: gắn bản dịch cho ${gan}/${tong} mục (tính cả bài con dùng chung)`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
