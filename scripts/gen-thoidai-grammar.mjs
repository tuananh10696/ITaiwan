// =============================================================
// NGỮ PHÁP Giáo trình Thời Đại (時代華語) — sinh từ PPT bài giảng chính thức (2026-09-05)
// =============================================================
//   node scripts/gen-thoidai-grammar.mjs --quyen 1,2,3,4,5
//
// Cùng nguồn với gen-thoidai-vocab.mjs (PPT của 淡江大學華語中心). Trong PPT, sau các slide
// từ vựng là phần ngữ pháp. BỐN KIỂU TRÌNH BÀY khác nhau giữa các quyển — đừng bám một kiểu:
//   Q1/Q2: [tiêu đề "I. …"] [giải thích tiếng Anh] [bảng cấu trúc] [ví dụ] rồi slide bài tập
//   Q3   : [số thứ tự "1.因為⋯⋯而⋯⋯"] rồi slide "語法說明" + slide "語法例句"
//   Q4/Q5: [tiêu đề "I. …"] [giải thích tiếng TRUNG] [例句：…]
//
// Ngữ pháp thuộc CẢ BÀI (không chia theo phần) -> mọi bài con của bài dùng chung một danh sách,
// giống cách làm ở Đương đại (CLAUDE.md 4.26d).
// Ví dụ chỉ có tiếng Trung (nguồn không kèm bản dịch) -> `vi` để rỗng, KHÔNG tự dịch.
// =============================================================
import fs from 'fs/promises';
import path from 'path';
import { ROOT, SO_BAI, napBanDo, pptBai, docSlide, CO_HAN, CO_DAU_THANH, RE_POS } from './thoidai-nguon.mjs';

const arg = (t, d) => { const i = process.argv.indexOf(t); return i > 0 ? process.argv[i + 1] : d; };
const QUYENS = String(arg('--quyen', '1')).split(',').map(Number).filter(Boolean);

/** Tiêu đề điểm ngữ pháp: "I. …" · "1.因為…" · "II 以A為B" (có chữ Hán hoặc chữ Anh phía sau). */
const RE_TIEUDE = /^(?:[IVX]{1,4}|[0-9]{1,2})\s*[.、．]\s*(.*)$/;
const NHAN = /^(Function|Structures?|Negation|Questions?|Usage|語法說明|語法例句|例句|說明|用法)\s*[:：]?$/i;
const BO = /^(語法|Grammar|生詞|Vocabulary|對話|Dialogue|短文|課室活動|練習|Exercise)s?$/i;

const LA_CAU = (t) => CO_HAN.test(t) && (t.match(/[一-鿿]/g) || []).length >= 4;
/** Slide từ vựng: có mã từ loại + chữ Hán ngắn -> không phải slide ngữ pháp. */
function laSlideTuVung(sl) {
  const pos = sl.some((t) => { const m = RE_POS.exec(t.trim()); return m && (m[2] ? true : t.trim().length <= 12); });
  const han = sl.some((t) => /^[一-鿿]{1,8}$/.test(t.replace(/[／/、·\s]/g, '')));
  return pos && han;
}

/** PowerPoint ngắt dòng giữa câu -> ghép lại tới khi gặp 。？！ */
function ghepCau(dong) {
  const ra = []; let dem = '';
  for (const d of dong) {
    dem = dem ? dem + d : d;
    if (/[。？！?!]\s*$/.test(dem)) { ra.push(dem.trim()); dem = ''; }
  }
  if (dem.trim()) ra.push(dem.trim());
  return ra;
}

function bocNguPhap(slides) {
  const diem = [];
  let hienTai = null;
  for (const sl of slides.slice(1)) {
    if (!sl.length) continue;

    // 1) TÌM TIÊU ĐỀ ở BẤT KỲ đoạn nào — Q1/Q2 đặt tiêu đề GIỮA slide (sau bảng cấu trúc và
    //    ví dụ), Q5 đặt ở đầu, Q3 tách làm 2 đoạn ("1." rồi "S 把 NP1 + V 成 NP2").
    let tieuDe = null, viTri = -1;
    for (let i = 0; i < sl.length; i++) {
      const t = sl[i].replace(/\s+/g, ' ').trim();
      const m = RE_TIEUDE.exec(t);
      if (!m) continue;
      let nhan = m[1].trim();
      if (!nhan && sl[i + 1] && !LA_CAU_KET(sl[i + 1])) nhan = sl[i + 1].trim();   // kiểu Q3
      if (!nhan || nhan.length > 45 || /[＿_]{2,}/.test(nhan)) continue;
      // Câu ví dụ cũng mở đầu bằng "1." nên phải loại: tiêu đề KHÔNG chứa dấu câu tiếng Trung
      // (「……」 thì được — nhiều điểm ngữ pháp có dạng "再……也/都……").
      if (/[，。、；：？！]|[?!]/.test(nhan)) continue;   // dấu câu tiếng Trung; dấu ',' ASCII được phép (tiêu đề tiếng Anh)
      if (!CO_HAN.test(nhan) && !/[a-zA-Z]{3}/.test(nhan)) continue;
      tieuDe = `${t.match(/^([IVX]{1,4}|[0-9]{1,2})/)[1]}. ${nhan.replace(/^[IVX0-9]{1,4}\s*[.、．]\s*/, '')}`;
      viTri = i;
      break;
    }
    if (tieuDe) { hienTai = { title: tieuDe, points: [] }; diem.push(hienTai); }
    else if (laSlideTuVung(sl)) { continue; }   // slide từ vựng xen giữa -> bỏ, giữ nguyên điểm hiện tại
    if (!hienTai) continue;

    // 2) Phân loại các đoạn còn lại
    const than = sl.filter((_, i) => i !== viTri);
    const giaiThich = [], viDu = [];
    for (const d0 of than) {
      const d = d0.trim();
      if (!d || NHAN.test(d.replace(/[:：]\s*$/, '')) || BO.test(d)) continue;
      if (/[＿_]{2,}/.test(d)) continue;                       // slide bài tập điền
      const soHan = (d.match(/[一-鿿]/g) || []).length;
      const soLatin = (d.match(/[a-zA-Z]/g) || []).length;
      // Giải thích tiếng Anh (Q1/Q2) thường lẫn vài chữ Hán -> xét theo TỈ LỆ, không theo "có Hán".
      if (soLatin > 25 && soLatin > soHan * 2) {
        if (!CO_DAU_THANH.test(d) || d.length > 60) giaiThich.push(d);
        continue;
      }
      if (!CO_HAN.test(d)) continue;                           // pinyin trần -> bỏ
      // Ô bảng cấu trúc ("他" · "叫" · "中明。") — quá ngắn để là ví dụ, ghép lại chỉ ra câu rác.
      if (soHan < 6 && !/[。？！]$/.test(d)) continue;
      if (soHan < 4) continue;
      // Giải thích tiếng Trung: dài + có ngôn ngữ siêu ngữ pháp ("的意思", "表示", "當連詞"…)
      if (soHan >= 25 && /意思|表示|用來|用在|當連詞|可表示|常和|須注意|指的是|形式|語氣|結構/.test(d)) giaiThich.push(d);
      else viDu.push(d);
    }
    const examples = ghepCau(viDu)
      .filter((h) => (h.match(/[一-鿿]/g) || []).length >= 4)
      .map((hz) => ({ hz: hz.replace(/^[0-9]{1,2}\s*[.、．]\s*/, '').trim(), vi: '' }));
    if (examples.length || giaiThich.length) {
      hienTai.points.push({
        label: null,
        formula: giaiThich.length ? giaiThich.join(' ') : null,
        examples,
        answer: null,
      });
    }
  }
  // gộp các point liền nhau của cùng điểm cho gọn
  for (const d of diem) {
    const gt = d.points.map((p) => p.formula).filter(Boolean);
    const ex = d.points.flatMap((p) => p.examples);
    d.points = [{ label: null, formula: gt.join(' ') || null, examples: ex, answer: null }];
  }
  return diem.filter((d) => d.points[0].examples.length || d.points[0].formula);
}

/** Câu hoàn chỉnh (kết thúc bằng dấu câu) — dùng để loại trường hợp "1." + câu ví dụ ở Q3. */
const LA_CAU_KET = (t) => /[。？！]\s*$/.test(String(t || ''));

async function main() {
  const banDo = await napBanDo();
  for (const q of QUYENS) {
    const ra = {};
    let soDiem = 0, soVd = 0, baiTrong = [];
    for (let bai = 1; bai <= SO_BAI; bai++) {
      const file = await pptBai(banDo, q, bai);
      if (!file) { baiTrong.push(bai); continue; }
      const slides = docSlide(file);
      const diem = slides ? bocNguPhap(slides) : [];
      if (!diem.length) { baiTrong.push(bai); continue; }
      soDiem += diem.length;
      soVd += diem.reduce((s, d) => s + d.points.reduce((t, p) => t + p.examples.length, 0), 0);
      // gán cho MỌI bài con của bài (tối đa 4 phần) — ngữ pháp thuộc cả bài
      for (let p = 1; p <= 4; p++) ra[`td${q}-${bai}.${p}`] = diem;
    }
    const out = path.join(ROOT, 'src', 'data', `thoidaiGrammar${q}.js`);
    await fs.writeFile(out, `// =============================================================
// Ngữ pháp Giáo trình Thời Đại QUYỂN ${q} — SINH TỰ ĐỘNG, đừng sửa tay.
//   node scripts/gen-thoidai-grammar.mjs --quyen ${q}
// Nguồn: PPT bài giảng chính thức của 淡江大學華語中心 (công khai).
// Ví dụ CHỈ CÓ tiếng Trung (nguồn không kèm bản dịch) -> \`vi\` rỗng.
// Ngữ pháp thuộc cả bài nên các bài con dùng chung một danh sách.
// =============================================================
export const thoidaiGrammar${q} = ${JSON.stringify(ra, null, 1)};
`, 'utf8');
    console.log(`✅ Quyển ${q}: ${soDiem} điểm ngữ pháp · ${soVd} ví dụ -> src/data/thoidaiGrammar${q}.js`
      + (baiTrong.length ? `\n   ⚠️  bài không bóc được: ${baiTrong.join(', ')}` : ''));
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
