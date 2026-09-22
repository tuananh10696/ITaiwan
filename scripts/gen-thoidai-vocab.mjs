// =============================================================
// TỪ VỰNG Giáo trình Thời Đại (時代華語) — sinh từ PPT bài giảng chính thức (2026-09-05)
// =============================================================
//   node scripts/gen-thoidai-vocab.mjs --quyen 2
//   node scripts/gen-thoidai-vocab.mjs --quyen 1,2,3,4,5
//
// NGUỒN (đều công khai, xem md/nguon-du-lieu-thoi-dai.md):
//   · Khuôn + ví dụ: PPT bài giảng của 淡江大學華語中心 — 81/81 bài, mỗi slide từ vựng có
//     chữ Hán · pinyin · từ loại · nghĩa tiếng Anh · câu ví dụ.
//   · Nghĩa tiếng Việt: glossary onllang (công khai) + vốn từ Đương đại đã có trong dự án.
//     Chỉ phủ ~54% (Q1 81% → Q5 32%) — từ nào không có thì GIỮ NGHĨA TIẾNG ANH và ghi cờ
//     `en: true`, KHÔNG tự bịa nghĩa.
//   · Ranh giới bài con: scripts/data-cache/thoidai/ranh-gioi.json do gen-thoidai-parts.py
//     dựng từ BẢN THU 生詞 (mỗi phần một file, người đọc đọc "一、<từ>…"). Chạy script đó trước.
//
// ĐỐI CHIẾU CHÉO BẮT BUỘC (đừng bỏ): số từ bóc được so với số nhà xuất bản công bố
// (Q1 868 · Q2 960 · Q3 971 · Q4 1371). Đã dùng nó để bắt 2 lỗi parser thật (bỏ sót mục 短語/俗語
// không có mã từ loại, và nhận nhầm bảng cấu trúc ngữ pháp).
// SAU KHI SỬA, phần lệch còn lại là do CHÍNH PPT, không phải parser — đã đếm slide thô để kiểm:
//   Q2 960/960 khớp tuyệt đối · Q1 +2% · Q3 +9% (PPT có thêm 短語 ngoài danh mục sách)
//   Q4 -10% (PPT chỉ có 1.216 slide từ vựng, sách công bố 1.371 — thiếu ở nguồn, nhiều khả năng
//   là phần 認讀詞 chỉ in trong sách). Đừng "sửa" bằng cách nới lỏng bộ nhận dạng: làm thế chỉ
//   rước câu hỏi thảo luận và ô bảng ngữ pháp vào danh sách từ vựng.
// =============================================================
import fs from 'fs/promises';
import path from 'path';
import {
  ROOT, CACHE, SO_BAI, khoaTrang, napBanDo, pptBai, docSlide, chuanHoa,
  CO_HAN, THUAN_HAN, CO_DAU_THANH, POS_VI, RE_POS, napGlossaryOnllang, napTuVungDuongDai,
} from './thoidai-nguon.mjs';

const arg = (t, d) => { const i = process.argv.indexOf(t); return i > 0 ? process.argv[i + 1] : d; };
const QUYENS = String(arg('--quyen', '1')).split(',').map(Number).filter(Boolean);

/** Số từ nhà xuất bản công bố — dùng để bắt lỗi parser, không phải để sửa dữ liệu. */
const SO_TU_NXB = { 1: 868, 2: 960, 3: 971, 4: 1371 };

const RAC = /^(by |from Flaticon|from Freepik|Flaticon|icon|圖片|來源)/i;
/** Tiêu đề mục in ngay trên slide đầu mỗi phần — KHÔNG phải từ vựng. Lọt vào là bài con đầu
 *  tiên có một "từ" tên 對話一, và ranh giới dò theo bản thu cũng lệch đi một ô. */
const TIEU_DE_MUC = /^(對話[一二三]?|短文|課文[一二]?|生詞|語法|Vocabulary|Dialogue|Grammar)$/;
const LA_VI_DU = (t) => CO_HAN.test(t) && (/[。，、？！,?!]/.test(t) || (t.match(/[一-鿿]/g) || []).length >= 6);

/**
 * Bóc 1 slide thành mục từ vựng, hoặc null nếu slide không phải slide từ vựng.
 * Ba quyển ba kiểu trình bày khác nhau nên KHÔNG bám vị trí, chỉ bám đặc trưng từng đoạn:
 *   Q1/Q3: [hanzi] [pinyin] [POS] [nghĩa Anh] (+ ví dụ, + pinyin ví dụ ở Q1)
 *   Q2/Q4/Q5: [ví dụ] [hanzi] ["(N) nghĩa Anh"] [pinyin]
 */
function bocSlide(parts) {
  const doan = parts.filter((t) => !RAC.test(t));
  if (!doan.length) return null;

  let pos = '', defEn = '';
  for (const t of doan) {
    const m = RE_POS.exec(t.trim());
    if (!m) continue;
    // 'N' trần cũng khớp, nhưng phải là ĐOẠN RIÊNG (không phải chữ N trong câu tiếng Anh).
    if (!m[2] && t.trim().length > 12) continue;
    pos = m[1];
    if (m[2] && m[2].trim() && !CO_HAN.test(m[2])) defEn = m[2].trim();
    break;
  }
  // Mục 短語/俗語 (thành ngữ, tục ngữ) KHÔNG có mã từ loại — vẫn là từ vựng của bài, phải nhận.
  // Dấu hiệu: đúng một cụm Hán thuần 2-8 chữ + một dòng pinyin có dấu thanh + một dòng nghĩa
  // tiếng Anh. Bỏ qua thì mất ~12% số từ ở quyển 4 (đối chiếu với số của NXB mới lộ ra).
  let laThanhNgu = false;
  if (!pos) {
    const han = doan.filter((t) => THUAN_HAN.test(t.replace(/[／/、·\s]/g, '')) && t.replace(/\s/g, '').length >= 2 && t.replace(/\s/g, '').length <= 8);
    const py = doan.filter((t) => !CO_HAN.test(t) && CO_DAU_THANH.test(t));
    const en = doan.filter((t) => !CO_HAN.test(t) && !CO_DAU_THANH.test(t) && /[a-zA-Z]{4}/.test(t) && t.length >= 8);
    if (han.length === 1 && py.length && en.length) laThanhNgu = true;
    else return null;
  }

  const hanCands = doan.filter((t) => {
    const s = t.replace(/[／/、·]/g, '').trim();
    return THUAN_HAN.test(s) && s.length <= 8 && !LA_VI_DU(t);
  });
  if (!hanCands.length) return null;
  const hanzi = hanCands.reduce((a, b) => (b.length < a.length ? b : a)).replace(/\s+/g, '');
  if (TIEU_DE_MUC.test(hanzi)) return null;

  // latin còn lại: pinyin (có dấu thanh, ít khoảng trắng) vs nghĩa Anh vs pinyin của câu ví dụ
  const latin = doan.filter((t) => !CO_HAN.test(t) && /[a-zA-Z]/.test(t) && !RE_POS.test(t.trim()));
  const coDau = latin.filter((t) => CO_DAU_THANH.test(t));
  const soTuTrongHan = Math.max(1, (hanzi.match(/[一-鿿]/g) || []).length);
  const laPinyinTu = (t) => t.trim().split(/\s+/).length <= soTuTrongHan + 1 && t.trim().length <= 26;
  let pinyin = coDau.filter(laPinyinTu).sort((a, b) => a.length - b.length)[0] || '';
  if (!pinyin) pinyin = latin.filter((t) => laPinyinTu(t) && !/[.?!]$/.test(t)).sort((a, b) => a.length - b.length)[0] || '';
  if (!defEn) {
    defEn = latin.filter((t) => t !== pinyin && !CO_DAU_THANH.test(t)).sort((a, b) => b.length - a.length)[0] || '';
  }

  // ví dụ: câu tiếng Trung (bỏ chính từ khoá); pinyin ví dụ = latin dài còn lại (chỉ Q1 có)
  const cauVi = doan.filter((t) => LA_VI_DU(t) && t !== hanzi);
  const pyVi = latin.filter((t) => t !== pinyin && t !== defEn && CO_DAU_THANH.test(t));
  const ex = cauVi.map((h, i) => ({ h, p: pyVi[i] || '', t: '' }));

  return { hanzi, pinyin: pinyin.trim(), pos: pos || (laThanhNgu ? 'Idiom' : ''), defEn: defEn.replace(/\s+/g, ' ').trim(), ex };
}

function bocPpt(slides) {
  const ra = [];
  const thay = new Set();
  for (const sl of slides.slice(1)) {          // slide 1 = bìa (第N課 + tên bài)
    const w = bocSlide(sl);
    if (!w || !w.hanzi) continue;
    const k = w.hanzi + '|' + w.pos + '|' + w.defEn.slice(0, 20);
    if (thay.has(k)) continue;                 // vài PPT lặp lại slide ôn tập
    thay.add(k);
    ra.push(w);
  }
  return ra;
}

/**
 * Ranh giới phần: bản thu 生詞 của mỗi phần mở đầu bằng chính TỪ ĐẦU TIÊN của phần đó.
 * Whisper nghe được ~26 chữ đầu (kèm luôn câu ví dụ ngay sau từ), nên tìm từ nào của bài xuất
 * hiện SỚM NHẤT trong chuỗi đó — chắc hơn so khớp tiền tố, vì bản nhận dạng hay dính rác
 * ("聲詞1." · ":" · lặp từ). Không tìm được -> trả null để caller báo lỗi, KHÔNG đoán bừa.
 */
function chiaPhan(list, moDau) {
  if (!moDau || moDau.length < 2) return null;
  const moc = [0];
  for (let i = 1; i < moDau.length; i++) {
    const chuoi = chuanHoa(moDau[i]);
    if (!chuoi) return null;
    let tot = -1, best = Infinity, dai = 0;
    for (let j = moc[moc.length - 1] + 1; j < list.length; j++) {
      const h = chuanHoa(list[j].hanzi);
      if (!h || h.length < 1) continue;
      const vt = chuoi.indexOf(h);
      if (vt < 0 || vt > 8) continue;                       // phải nằm ở ngay đầu đoạn nghe được
      if (vt < best || (vt === best && h.length > dai)) { tot = j; best = vt; dai = h.length; }
    }
    if (tot < 0) return null;
    moc.push(tot);
  }
  return moc;
}

async function main() {
  const banDo = await napBanDo();
  // Audio gốc của sách, cắt sẵn theo từng từ (scripts/gen-thoidai-audio.py). Chỉ gắn khi FILE CÓ
  // THẬT — suy đường dẫn theo quy tắc rồi để 404 thì mỗi lần bấm phải chờ request hỏng mới ra
  // tiếng (đúng bài học ở CLAUDE.md 4.26f).
  // Map audio: MỖI QUYỂN MỘT FILE (5 tiến trình cắt audio chạy song song, dùng chung một file
  // là chúng ghi đè nhau và mất quá nửa số từ — đã dính một lần).
  let audioMap = {};
  for (const qq of [1, 2, 3, 4, 5]) {
    try { Object.assign(audioMap, JSON.parse(await fs.readFile(path.join(CACHE, `audio-tu-q${qq}.json`), 'utf8'))); } catch {}
  }
  if (Object.keys(audioMap).length) console.log(`🔊 ${Object.keys(audioMap).length} từ đã có audio gốc của sách`);
  else console.log('🔊 Chưa cắt audio từ vựng (chạy scripts/gen-thoidai-audio.py trước nếu muốn).');

  // mp3 TTS (Edge, giọng zh-TW-HsiaoChenNeural) cho những từ KHÔNG cắt được từ bản thu gốc —
  // vẫn hơn hẳn giọng Web Speech của trình duyệt. Xem scripts/gen-tts-tuvung.py.
  let ttsMap = {};
  try {
    ttsMap = JSON.parse(await fs.readFile(path.join(CACHE, '..', 'tts-tuvung-map.json'), 'utf8'));
    console.log(`🗣  ${Object.keys(ttsMap).length} từ có mp3 TTS dự phòng`);
  } catch {}

  console.log('🌐 Nạp nghĩa Việt (glossary onllang + vốn từ Đương đại của dự án)…');
  const glo = await napGlossaryOnllang();
  const dd = await napTuVungDuongDai();
  console.log(`   glossary ${glo.size} mục · Đương đại ${dd.size} chữ Hán`);

  for (const q of QUYENS) {
    // ranh-gioi-q<N>.json: mỗi quyển một file (5 tiến trình gen-thoidai-parts.py chạy song song).
    const rg = JSON.parse(await fs.readFile(path.join(CACHE, `ranh-gioi-q${q}.json`), 'utf8').catch(() => '{}'));
    const vocab = {}, range = {};
    let tong = 0, coVi = 0, thieuPinyin = 0, baiLoi = [];

    for (let bai = 1; bai <= SO_BAI; bai++) {
      const file = await pptBai(banDo, q, bai);
      if (!file) { baiLoi.push(`${bai}: không có PPT`); continue; }
      const slides = docSlide(file);
      if (!slides) { baiLoi.push(`${bai}: PPT hỏng`); continue; }
      const tho = bocPpt(slides);
      if (!tho.length) { baiLoi.push(`${bai}: 0 từ`); continue; }

      const key = `td${q}-${bai}`;
      vocab[key] = tho.map((w) => {
        const k = chuanHoa(w.hanzi);
        const g = glo.get(k), d = dd.get(k);
        const vi = (g && g.def) || (d && d.def) || '';
        if (vi) coVi++;
        if (!w.pinyin) thieuPinyin++;
        return {
          hanzi: w.hanzi,
          pinyin: w.pinyin || (g && g.pinyin) || (d && d.pinyin) || '',
          def: vi || w.defEn,
          ...(vi ? {} : { en: true }),          // chưa có nghĩa Việt -> đang hiển thị nghĩa tiếng Anh
          ...(w.defEn && vi ? { defEn: w.defEn } : {}),
          pos: POS_VI[w.pos] || w.pos,
          ...(w.ex.length ? { ex: w.ex } : {}),
        };
      });
      tong += tho.length;

      // chia bài con theo ranh giới nghe được từ bản thu
      // khoá trong ranh-gioi luôn đệm 0 ('b2-l01'), khoá trang site thì không — thử cả hai.
      const kRG = `b${q}-l${String(bai).padStart(2, '0')}`;
      const recRG = rg[kRG] || rg[khoaTrang(q, bai)] || {};
      const moDau = recRG.mo_dau;
      const moc0 = chiaPhan(vocab[key], moDau);
      const moc = moc0;
      if (moc) {
        moc.forEach((m, i) => {
          const to = i + 1 < moc.length ? moc[i + 1] : vocab[key].length;
          range[`${key}.${i + 1}`] = { from: m + 1, to };
        });
      } else {
        // Không dò được từ mở đầu (bản nhận dạng quá nhiễu). Vẫn biết bài này có MẤY PHẦN (số file
        // 生詞 trên Drive), nên chia đều theo đúng số phần đó — chia đôi cứng sẽ làm quyển 1 mất
        // hẳn phần 3. Đây là ƯỚC LƯỢNG: script in cảnh báo để còn quét lại
        // (`npm run thoidai:parts -- --quyen N --bai X --giay 25 --bs 5 --lam-lai`).
        // Số phần lấy từ SỐ FILE 生詞 trên Drive (so_phan), không phải từ số chuỗi nghe được —
        // có bài chỉ nhận dạng nổi 1 phần, lấy theo đó là cả bài dồn vào 1 bài con.
        const soPhan = Math.max(2, recRG.so_phan || (moDau && moDau.length) || 2);
        baiLoi.push(`${bai}: chưa dò được ranh giới — tạm chia đều ${soPhan} phần`);
        const n = vocab[key].length;
        for (let i = 0; i < soPhan; i++) {
          range[`${key}.${i + 1}`] = {
            from: Math.floor((n * i) / soPhan) + 1,
            to: Math.floor((n * (i + 1)) / soPhan),
          };
        }
      }
    }

    // Gắn audio sau khi đã biết bài con của từng từ (khoá map là "<chữ Hán>|<id bài con>").
    let coAudio = 0, coTts = 0;
    for (const [subId, r] of Object.entries(range)) {
      const cha = subId.split('.')[0];
      const ds = vocab[cha] || [];
      for (let i = r.from - 1; i < r.to && i < ds.length; i++) {
        const ten = audioMap[`${ds[i].hanzi}|${subId}`];
        if (ten) { ds[i].audio = `/audio/thoidai-tu/${ten}`; coAudio++; continue; }
        // Không có bản thu gốc -> gắn mp3 TTS làm phương án 2 (app vẫn ưu tiên `audio` nếu có).
        const tts = ttsMap[ds[i].hanzi];
        if (tts) { ds[i].audioTts = `/audio/tts-vi/${tts}`; coTts++; }
      }
    }

    const out = path.join(ROOT, 'src', 'data', `thoidaiVocab${q}.js`);
    const banner = `// =============================================================
// Từ vựng Giáo trình Thời Đại QUYỂN ${q} — SINH TỰ ĐỘNG, đừng sửa tay.
//   node scripts/gen-thoidai-vocab.mjs --quyen ${q}
// Nguồn: PPT bài giảng CHÍNH THỨC của 淡江大學華語中心 (7 trường ĐH biên soạn, NXB 正中書局),
// công khai tại sites.google.com/clc.tku.edu.tw/modernchinese-official.
// Nghĩa Việt: glossary onllang + vốn từ Đương đại của dự án; từ nào chưa có thì GIỮ nghĩa
// tiếng Anh của sách và gắn cờ \`en: true\`. Ranh giới bài con lấy từ bản thu 生詞.
// Xem md/nguon-du-lieu-thoi-dai.md.
// =============================================================
`;
    await fs.writeFile(out, banner
      + `export const thoidaiVocab${q} = ${JSON.stringify(vocab, null, 1)};\n\n`
      + `export const thoidaiRange${q} = ${JSON.stringify(range, null, 1)};\n`, 'utf8');

    const nxb = SO_TU_NXB[q];
    console.log(`\n✅ Quyển ${q}: ${Object.keys(vocab).length} bài · ${tong} từ -> src/data/thoidaiVocab${q}.js`);
    console.log(`   Nghĩa Việt: ${coVi}/${tong} (${Math.round(coVi / tong * 100)}%) · thiếu pinyin: ${thieuPinyin}`
      + ` · audio gốc: ${coAudio}/${tong} (${Math.round(coAudio / tong * 100)}%)`
      + ` · TTS dự phòng: ${coTts}`);
    if (nxb) {
      const lech = Math.round((tong - nxb) / nxb * 100);
      console.log(`   Đối chiếu NXB: ${tong}/${nxb} (${lech > 0 ? '+' : ''}${lech}%)${Math.abs(lech) > 5 ? '  ⚠️  lệch >5% — kiểm lại bằng cách ĐẾM SLIDE THÔ trước khi kết luận parser sai' : '  ✓'}`);
    }
    if (baiLoi.length) console.log(`   ⚠️  ${baiLoi.join(' · ')}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
