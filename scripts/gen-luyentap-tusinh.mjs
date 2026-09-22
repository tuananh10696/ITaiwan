// =============================================================
// LUYỆN TẬP TỔNG HỢP tự sinh — Đương đại quyển 2-6 và TOÀN BỘ Thời Đại (2026-09-06)
// =============================================================
//   node scripts/gen-luyentap-tusinh.mjs --quyen 2,3,4,5,6           (Đương đại, mặc định)
//   node scripts/gen-luyentap-tusinh.mjs --bo thoidai --quyen 1,2,3,4,5
//
// ⚠️ HAI BỘ GHI CHUNG MỘT FILE. Script LUÔN nạp file cũ rồi chỉ THAY các bài của đúng
// (bộ × quyển) đang sinh — chạy cho Thời Đại KHÔNG được xoá đề của Đương đại. Đây đúng là
// cái bẫy đã ghi ở CLAUDE.md 4.26b (`napDeGhep`): đừng bao giờ khởi tạo `let data = []`
// rồi ghi đè cả file.
//
// VÌ SAO PHẢI TỰ SINH: "Luyện tập tổng hợp" của quyển 1 lấy từ onllang (đã mua khoá). Quyển 2-6
// KHÔNG có nguồn đề công khai:
//   · onllang khoá bài 2-15 ở phía máy chủ (CLAUDE.md 4.26b — đã dò cạn mọi đường)
//   · MTC chỉ phát hành 測驗卷 cho quyển 1 và 2 (dangdai_1/2_test.zip), và ở dạng .docx soạn tự
//     do nên bóc tự động chỉ ra được một phần (xem gen-dangdai-luyentap.mjs)
//   · Bản PDF 作業本 trôi nổi trên Scribd là hàng vi phạm bản quyền — không dùng
//
// Nên bài luyện tập ở đây SINH TỪ CHÍNH NỘI DUNG BÀI HỌC đã có trong dự án (từ vựng, câu ví dụ
// ngữ pháp, lời thoại bài khoá — đều là dữ liệu của sách). Đáp án được SUY RA từ dữ liệu gốc
// chứ không phải đoán — nhưng "suy ra từ dữ liệu gốc" KHÔNG tự động có nghĩa là đúng: lượt
// kiểm đầu tiên bắt được 90 câu hỏng (lộ đáp án, mồi nhử nằm sẵn trong câu, hai đáp án cùng
// đúng). Sinh lại đề thì PHẢI chạy `npm run luyentap:kiem` — nó truy ngược về dữ liệu sách để
// tự kết luận đáp án đúng rồi đối chiếu, không tin bộ sinh.
//
// Mỗi bài có 5 mục, bám cách sách ra đề:
//   I.   Nghe hiểu      — audio bài khoá thật + chọn câu đúng với đoạn vừa nghe
//   II.  Từ vựng trong câu — đục một từ khỏi câu ví dụ, chọn từ đúng
//   III. Nghĩa của từ   — chữ Hán -> nghĩa tiếng Việt
//   IV.  Ngữ pháp       — chọn câu dùng đúng mẫu ngữ pháp của bài
//   V.   Đặt câu (tự luận) — dùng từ/cấu trúc của bài, giáo viên chấm
// =============================================================
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DATA = path.join(ROOT, 'public', 'data', 'luyentap-tusinh.json');
const OUT_ANS = path.join(ROOT, 'public', 'data', 'luyentap-tusinh-answers.json');

const arg = (t, d) => { const i = process.argv.indexOf(t); return i > 0 ? process.argv[i + 1] : d; };
const BO = String(arg('--bo', 'duongdai'));
if (!['duongdai', 'thoidai'].includes(BO)) { console.error('--bo phải là duongdai hoặc thoidai'); process.exit(1); }
const QUYENS = String(arg('--quyen', BO === 'thoidai' ? '1,2,3,4,5' : '2,3,4,5,6')).split(',').map(Number).filter(Boolean);

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** So tên mẫu ngữ pháp bỏ qua hoa/thường, dấu câu và khoảng trắng — xem chỗ dùng ở mục IV. */
const chuanTen = (s) => String(s ?? '').toLowerCase().replace(/[\s.,;:!?"'()（）［］\[\]、，。；：？！…·\-–—/]/g, '');
const HAN = /[一-鿿]/;

/** Xáo trộn CÓ HẠT GIỐNG: cùng một bài luôn ra cùng một đề, để học viên và giáo viên nhìn thấy
 *  cùng một thứ (đề sinh ngẫu nhiên mỗi lần chạy script thì đáp án đã lưu sẽ lệch). */
function rng(seed) {
  let s = 0;
  for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
}
function xao(arr, r) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const lay = (arr, n, r) => xao(arr, r).slice(0, n);

/** Nạp file JSON cũ; thiếu file thì trả về giá trị rỗng (lần chạy đầu). */
async function napCu(f, rong) {
  try { return JSON.parse(await fs.readFile(f, 'utf8')); } catch { return rong; }
}

async function main() {
  let duongdaiVocab, duongdaiLessons, duongdaiSubLessons, duongdaiGrammar, duongdaiDialogues;
  if (BO === 'thoidai') {
    ({ thoidaiVocab: duongdaiVocab, thoidaiLessons: duongdaiLessons, thoidaiSubLessons: duongdaiSubLessons } =
      await import(path.join(ROOT, 'src/data/thoidaiData.js')));
    ({ thoidaiGrammar: duongdaiGrammar } = await import(path.join(ROOT, 'src/data/thoidaiGrammar.js')));
    ({ thoidaiDialogues: duongdaiDialogues } = await import(path.join(ROOT, 'src/data/thoidaiDialogues.js')));
  } else {
    ({ duongdaiVocab, duongdaiLessons, duongdaiSubLessons } =
      await import(path.join(ROOT, 'src/data/duongdaiData.js')));
    ({ duongdaiGrammar } = await import(path.join(ROOT, 'src/data/duongdaiGrammar.js')));
    ({ duongdaiDialogues } = await import(path.join(ROOT, 'src/data/duongdaiDialogues.js')));
  }

  // Nạp file cũ rồi BỎ đúng những bài thuộc (bộ × quyển) sắp sinh lại — giữ nguyên phần còn lại.
  const idCuaQuyen = new Set(duongdaiLessons.filter((l) => QUYENS.includes(l.book)).map((l) => l.id));
  const data = (await napCu(OUT_DATA, [])).filter((d) => !idCuaQuyen.has(String(d.lessonId)));
  const ansCu = await napCu(OUT_ANS, {});
  const ans = {};
  for (const [k, v] of Object.entries(ansCu)) {
    if (!idCuaQuyen.has(k.split('::')[0])) ans[k] = v;
  }
  const giuLai = data.length;
  let tongCau = 0;

  for (const q of QUYENS) {
    const baiCuaQuyen = duongdaiLessons.filter((l) => l.book === q);
    let soBaiCoDe = 0;
    for (const lesson of baiCuaQuyen) {
      const key = lesson.id;                       // '2-5'
      const tu = duongdaiVocab[key] || [];
      if (tu.length < 8) continue;                 // quá ít từ thì không dựng nổi đề tử tế
      const r = rng(key);
      const quizzes = [];
      const ghiDapAn = (slug, i, dapAn) => { ans[`${key}::${slug}::${i}`] = { ...dapAn, nguon: 'tu-sinh' }; };

      // ---------- I. Nghe hiểu (chỉ khi bài đã có lời thoại nhận dạng từ bản thu) ----------
      const subs = duongdaiSubLessons.filter((s) => s.parentId === key);
      // Nhãn phần bài: Đương đại luôn 2 phần (Hội thoại / Đoạn văn); Thời Đại quyển 1 có 3
      // phần (對話一 / 對話二 / 短文). Trước đây suy nhãn bằng `part === '1' ? …' : 'Đoạn văn'`
      // nên bài 3 phần cho ra HAI mục cùng tên "Ib. Nghe hiểu — Đoạn văn".
      const _tenPhan = subs.length >= 3
        ? ['Hội thoại 1', 'Hội thoại 2', 'Đoạn văn']
        : ['Hội thoại', 'Đoạn văn'];
      for (const sub of subs) {
        const iPhan = subs.indexOf(sub);
        const dlg = duongdaiDialogues[sub.id];
        if (!dlg || !(dlg.cues || []).length) continue;
        const cauBai = dlg.cues.map((c) => c.text).filter((t) => HAN.test(t) && t.length >= 6);
        if (cauBai.length < 4) continue;
        // Nhiễu: câu của bài KHÁC cùng quyển -> chắc chắn không trùng nội dung bài này
        const nhieu = [];
        for (const l2 of baiCuaQuyen) {
          if (l2.id === key) continue;
          for (const s2 of duongdaiSubLessons.filter((x) => x.parentId === l2.id)) {
            const d2 = duongdaiDialogues[s2.id];
            if (d2) nhieu.push(...(d2.cues || []).map((c) => c.text).filter((t) => t.length >= 6));
          }
        }
        if (nhieu.length < 3) continue;
        const slug = `ts-${key}-nghe-${sub.part}`;
        const chon = lay(cauBai, Math.min(5, cauBai.length), r);
        const questions = chon.map((dung, i) => {
          const opts = xao([dung, ...lay(nhieu, 3, rng(key + i))], rng(key + 'x' + i));
          ghiDapAn(slug, i, { kind: 'chon', idx: [opts.indexOf(dung)] });
          return {
            questionText: `<p>Câu ${i + 1}. Câu nào <b>có</b> trong đoạn vừa nghe?</p>`,
            questionType: 'single',
            answers: opts.map((t) => ({ text: t })),
          };
        });
        quizzes.push({
          slug,
          title: `I${['', 'b', 'c', 'd'][iPhan] || ''}. Nghe hiểu — ${_tenPhan[iPhan] || 'Bài khoá'}`,
          quizAudio: dlg.audio || null,
          passageHtml: '<p>Nghe bản thu của bài rồi chọn câu <b>có xuất hiện</b> trong đó.</p>',
          questions,
        });
      }

      // ---------- II. Từ vựng trong câu ----------
      // Nguồn câu: ví dụ của chính từ (`ex`, chỉ quyển 1 có) HOẶC câu ví dụ ngữ pháp của bài
      // (quyển 2-6 có sẵn, xem 4.26d) — miễn là câu đó CHỨA từ cần đục.
      // Ngữ pháp gom từ MỌI phần của bài rồi khử trùng theo tiêu đề: Đương đại gán CÙNG một
      // danh sách cho .1 và .2 (xem 4.26d) nên không khử là nhân đôi; Thời Đại quyển 1 có 3 phần
      // nên chỉ đọc .1/.2 là bỏ sót phần .3.
      const diemBai = [];
      for (const s3 of duongdaiSubLessons.filter((s) => s.parentId === key)) {
        for (const d of duongdaiGrammar[s3.id] || []) {
          if (!diemBai.some((x) => x.title === d.title)) diemBai.push(d);
        }
      }
      const _cauNguPhap = [];
      for (const d of diemBai) {
        for (const p2 of d.points || []) for (const e of p2.examples || []) if (e.hz) _cauNguPhap.push(e.hz);
      }
      const _cauCuaTu = (w) => (w.ex || []).map((e) => e.h).find((h) => h && h.includes(w.hanzi) && h.length >= 8)
        || _cauNguPhap.find((h) => h.includes(w.hanzi) && h.length >= 8 && h.length <= 60);
      /**
       * Dựng đề cho MỘT từ. Trả null nếu không dựng nổi -> lọc TRƯỚC khi map, tuyệt đối không
       * lọc sau: đáp án ghi theo CHỈ SỐ câu (`slug::i`), lọc sau là toàn bộ đáp án lệch một nấc.
       * Hai điều kiện phải giữ (bộ kiểm tra kiem-tra-luyentap-tusinh.mjs soi đúng hai chỗ này):
       *  · đục HẾT mọi lần từ đó xuất hiện — `replace` chỉ thay lần đầu nên từ còn hiện ở vế
       *    sau của câu, tức LỘ ĐÁP ÁN (34 câu đã dính trước khi sửa)
       *  · mồi nhử KHÔNG được nằm sẵn trong câu — nhìn thấy nó trong đề thì học viên loại ngay,
       *    đề mất tác dụng (55 câu đã dính)
       */
      const _deDien = (w) => {
        const cau = _cauCuaTu(w);
        if (!cau) return null;
        const de = cau.split(w.hanzi).join('＿＿＿');
        const nhieu = [...new Set(tu.filter((x) => x.hanzi !== w.hanzi && !de.includes(x.hanzi)).map((x) => x.hanzi))];
        return nhieu.length >= 3 ? { de, nhieu } : null;
      };
      const coViDu = tu.filter((w) => w.hanzi.length >= 2 && _deDien(w));
      if (coViDu.length >= 4) {
        const slug = `ts-${key}-tu-trong-cau`;
        // Câu gốc đôi khi rỗng ruột trong dữ liệu ngữ pháp ("＿＿＿⋯⋯，＿＿＿⋯⋯"), đục thêm chỗ
        // trống thì còn mỗi mấy dấu chấm lửng — không có gì để đọc mà chọn. LỌC TRƯỚC khi map
        // để chỉ số câu (và khoá đáp án `slug::i`) không lệch (bài học CLAUDE.md 4.47).
        const _deCoChu = (w) => /[\u4e00-\u9fff]/.test(String(_deDien(w).de || '').replace(/[＿_]+/g, ''));
        const chon = lay(coViDu.filter(_deCoChu), Math.min(8, coViDu.length), r);
        const questions = chon.map((w, i) => {
          const { de, nhieu } = _deDien(w);
          const opts = xao([w.hanzi, ...lay(nhieu, 3, rng(key + 'v' + i))], rng(key + 'w' + i));
          ghiDapAn(slug, i, { kind: 'chon', idx: [opts.indexOf(w.hanzi)] });
          return {
            questionText: `<p>${i + 1}. ${esc(de)}</p>`,
            questionType: 'single',
            answers: opts.map((t) => ({ text: t })),
          };
        });
        quizzes.push({ slug, title: 'II. Chọn từ điền vào chỗ trống', quizAudio: null,
          passageHtml: '<p>Chọn từ thích hợp điền vào chỗ trống trong câu của bài.</p>', questions });
      }

      // ---------- III. Nghĩa của từ ----------
      // Mồi nhử phải loại cả những mục CÙNG CHỮ HÁN với từ đang hỏi: vài bài có một chữ Hán
      // xuất hiện 2 lần với 2 nghĩa hơi khác nhau (vd td3-6 環島, ĐĐ 6-9 普洱 — lỗi ghép của bộ
      // bóc từ vựng). Không loại thì đề có hai lựa chọn cùng đúng, học viên chọn đúng vẫn bị
      // chấm sai. Lọc trước khi map để chỉ số câu không lệch.
      const _nhieuNghia = (w) => [...new Set(tu.filter((x) => x.def && x.def !== w.def && x.hanzi !== w.hanzi).map((x) => x.def))];
      const coNghia = tu.filter((w) => w.def && w.def.length >= 2 && _nhieuNghia(w).length >= 3);
      if (coNghia.length >= 6) {
        const slug = `ts-${key}-nghia`;
        const chon = lay(coNghia, Math.min(8, coNghia.length), r);
        const questions = chon.map((w, i) => {
          const nhieu = lay(_nhieuNghia(w), 3, rng(key + 'n' + i));
          const opts = xao([w.def, ...nhieu], rng(key + 'm' + i));
          ghiDapAn(slug, i, { kind: 'chon', idx: [opts.indexOf(w.def)] });
          return {
            questionText: `<p>${i + 1}. <b>${esc(w.hanzi)}</b>${w.pinyin ? ` (${esc(w.pinyin)})` : ''}</p>`,
            questionType: 'single',
            answers: opts.map((t) => ({ text: t })),
          };
        });
        quizzes.push({ slug, title: 'III. Nghĩa của từ', quizAudio: null,
          passageHtml: '<p>Chọn nghĩa đúng của từ.</p>', questions });
      }

      // ---------- IV. Ngữ pháp ----------
      const diem = diemBai;
      const _cauTho = [];
      for (const d of diem) {
        for (const p of d.points || []) {
          for (const e of p.examples || []) {
            if (e.hz && e.hz.length >= 8) _cauTho.push({ title: d.title, hz: e.hz });
          }
        }
      }
      // Một câu ví dụ có thể được sách đưa vào NHIỀU mẫu ngữ pháp. Hỏi "câu này dùng mẫu nào?"
      // với câu như vậy là câu có HAI đáp án cùng đúng -> học viên chọn đúng vẫn bị chấm sai
      // (đã dính 1 câu ở td4-13). Chỉ giữ câu thuộc DUY NHẤT một mẫu.
      const _mauCuaCau = new Map();
      for (const c of _cauTho) {
        if (!_mauCuaCau.has(c.hz)) _mauCuaCau.set(c.hz, new Set());
        _mauCuaCau.get(c.hz).add(c.title);
      }
      const cauNP = _cauTho.filter((c) => _mauCuaCau.get(c.hz).size === 1)
        .filter((c, i, a) => i === a.findIndex((x) => x.hz === c.hz));
      if (cauNP.length >= 4 && diem.length >= 2) {
        const slug = `ts-${key}-ngu-phap`;
        const chon = lay(cauNP, Math.min(6, cauNP.length), r);
        // Gộp theo tên đã CHUẨN HOÁ: sách có hai mẫu chỉ khác hoa/thường
        // ("I. Transposed objects" vs "I. Transposed Objects"), so bằng `!==` thì cả hai cùng
        // vào lựa chọn — học viên chọn đúng vẫn bị tính sai (6 câu td1-*, phát hiện 20/09/2026).
        const tenDiem = [];
        const _daCo = new Set();
        for (const d of diem) { const c = chuanTen(d.title); if (c && !_daCo.has(c)) { _daCo.add(c); tenDiem.push(d.title); } }
        const questions = chon.map((c, i) => {
          const nhieu = lay(tenDiem.filter((t) => chuanTen(t) !== chuanTen(c.title)), 3, rng(key + 'g' + i));
          if (nhieu.length < 2) return null;
          const opts = xao([c.title, ...nhieu], rng(key + 'h' + i));
          ghiDapAn(slug, i, { kind: 'chon', idx: [opts.indexOf(c.title)] });
          return {
            questionText: `<p>${i + 1}. Câu sau dùng mẫu ngữ pháp nào?<br><b>${esc(c.hz)}</b></p>`,
            questionType: 'single',
            answers: opts.map((t) => ({ text: t })),
          };
        }).filter(Boolean);
        if (questions.length) {
          quizzes.push({ slug, title: 'IV. Nhận diện ngữ pháp', quizAudio: null,
            passageHtml: '<p>Đọc câu rồi cho biết câu đó dùng mẫu ngữ pháp nào của bài.</p>', questions });
        }
      }

      // ---------- V. Đặt câu (tự luận, giáo viên chấm) ----------
      const tuDatCau = lay(tu.filter((w) => w.hanzi.length >= 2).map((w) => w.hanzi), 3, r);
      const mauNP = lay(diem.map((d) => d.title), 2, r);
      if (tuDatCau.length >= 2) {
        const slug = `ts-${key}-dat-cau`;
        const yeuCau = [...tuDatCau.map((t) => `Đặt một câu với từ <b>${esc(t)}</b>.`),
                        ...mauNP.map((t) => `Đặt một câu dùng mẫu ngữ pháp <b>${esc(t)}</b>.`)];
        quizzes.push({
          slug, title: 'V. Đặt câu', quizAudio: null,
          passageHtml: '<p>Viết câu bằng chữ Hán. Phần này giáo viên chấm tay.</p>',
          questions: yeuCau.map((y, i) => ({
            questionText: `<p>${i + 1}. ${y}</p>`,
            questionType: 'essay',
            answers: [],
          })),
        });
      }

      if (!quizzes.length) continue;
      soBaiCoDe++;
      tongCau += quizzes.reduce((s, z) => s + z.questions.length, 0);
      data.push({
        lessonId: key,
        lessonTitle: `Luyện tập tổng hợp — ${lesson.title}`,
        slug: `ts-${key}`,
        nguon: 'tu-sinh',
        quizzes,
      });
    }
    console.log(`📘 ${BO === 'thoidai' ? 'Thời Đại' : 'Đương đại'} quyển ${q}: ${soBaiCoDe}/${baiCuaQuyen.length} bài có đề`);
  }

  await fs.writeFile(OUT_DATA, JSON.stringify(data, null, 1), 'utf8');
  await fs.writeFile(OUT_ANS, JSON.stringify(ans, null, 1), 'utf8');
  console.log(`\n✅ ${data.length} bài trong file (${giuLai} bài của bộ/quyển khác giữ nguyên)`
    + ` · +${tongCau} câu vừa sinh · ${Object.keys(ans).length} khoá đáp án`);
  console.log(`   -> ${path.relative(ROOT, OUT_DATA)} + ${path.relative(ROOT, OUT_ANS)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
