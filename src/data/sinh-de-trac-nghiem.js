// =============================================================
// Bài tập trắc nghiệm — Sinh tự động từ dữ liệu từ vựng
// =============================================================
// Mọi hàm nhận tham số `nguon` = { vocab, subs, lessons }; không truyền thì dùng bộ giáo
// trình mặc định. Danh mục lấy từ index (nhẹ), từ vựng lấy từ kho nạp động — KHÔNG import
// thoidaiData.js (file đó gộp tĩnh cả 5 quyển). Kho rỗng cho tới khi trang giáo trình gọi
// napBai(), mà bài tập chỉ sinh được từ trong trang đó nên luôn đã có dữ liệu.
import { thoidaiSubLessons, thoidaiLessons } from './giaotrinh-index.js';
import { thoidaiVocab } from './giaotrinh-kho.js';

const NGUON_MAC_DINH = { vocab: thoidaiVocab, subs: thoidaiSubLessons, lessons: thoidaiLessons };
const _ng = (n) => (n && n.vocab && n.subs ? n : NGUON_MAC_DINH);

// ---------- helpers ----------

/** Fisher-Yates shuffle (in-place) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Lấy pool "nhiễu" — các từ cùng bài cha + bài lân cận, loại trừ từ đang hỏi.
 * Đảm bảo đủ ít nhất 3 từ nhiễu để tạo 4 đáp án.
 */
function getDistractorPool(parentId, excludeHanzi, nguon) {
  const N = _ng(nguon);
  // Lấy tất cả từ vựng của bài cha
  const allWords = N.vocab[String(parentId)] || [];
  let pool = allWords.filter(w => w.hanzi !== excludeHanzi);

  // Nếu không đủ 3, mở rộng sang bài lân cận CÙNG QUYỂN (id bài cha là chuỗi: '5' / '2-5',
  // nên không cộng trừ số được — tìm theo vị trí trong danh sách bài của quyển đó).
  if (pool.length < 3) {
    const lesson = N.lessons.find(l => l.id === String(parentId));
    const sameBook = lesson ? N.lessons.filter(l => l.book === lesson.book) : [];
    const idx = sameBook.indexOf(lesson);
    const neighbors = [sameBook[idx - 1], sameBook[idx + 1]].filter(Boolean).map(l => l.id);
    for (const nId of neighbors) {
      const extra = N.vocab[String(nId)] || [];
      pool = pool.concat(extra.filter(w => w.hanzi !== excludeHanzi));
      if (pool.length >= 6) break;
    }
  }
  return pool;
}

/** Chọn N phần tử ngẫu nhiên không trùng lặp từ mảng */
function pickRandom(arr, n) {
  const shuffled = shuffle([...arr]);
  return shuffled.slice(0, n);
}


// ---------- chống câu MƠ HỒ (2026-09-20) ----------
// Học viên báo "chấm sai đáp án". Truy ra: ba hàm make* dưới đây lọc mồi nhử bằng phép so
// CHUỖI CHÍNH XÁC (`w.def !== word.def`), nên mọi khác biệt vụn vặt đều lọt:
//   · "Ngủ" (睡覺) vs "ngủ" (睡)            -> câu "Từ nào có nghĩa là Ngủ?" có 2 đáp án đúng
//   · "shǔ" (屬)  vs "shǔ/" (鼠/老鼠)        -> câu "Phiên âm shǔ là của chữ nào?" có 2 đáp án đúng
// Chọn đúng vẫn bị tính sai, mà không có lỗi nào hiện ra. Nay so bằng `chuanHoa()` và chốt
// bằng `optionDuyNhat()` — hai lớp, lớp sau bắt mọi trường hợp lớp trước chưa nghĩ tới.
const chuanHoa = (s) => String(s ?? '').toLowerCase()
  .replace(/[\s.,;:!?"'()（）［］\[\]、，。；：？！…·\-–—/]/g, '');

/** Đề chỉ dùng được khi có nội dung THẬT — dữ liệu từ vựng còn vài ô rác của bộ bóc PPT
 *  (看 có pinyin "S", 了 có "(S)", 年年高升 không có pinyin). Sinh đề từ đó ra câu hỏi trống
 *  hoặc vô nghĩa, nên thà bỏ dạng đó cho từ này còn hơn hỏi một câu không trả lời được. */
const nghiaDung = (w) => chuanHoa(w?.def).length >= 1;
const _NGUYEN_DON = /^[aoeiüāáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜ]$/;  // KHÔNG cờ /i — "A" là nhãn ngữ pháp
const _NHAN_NGU_PHAP = /^(s|o|a|v|vs|vi|vp|vst|n|ns|adj|adv|clause|ph|sv|vo|m|det)\d*$/i;
const pinyinDung = (w) => {
  const p = String(w?.pinyin ?? '').trim();
  if (!p || /[()0-9]/.test(p)) return false;                  // "(S)" · "(A)Vs" — nhãn ngữ pháp lọt vào ô phiên âm
  const chu = p.replace(/[\s'’·-]/g, '');
  if (!chu || _NHAN_NGU_PHAP.test(chu)) return false;
  // 啊 "a" · 餓 "è" là phiên âm THẬT dài đúng 1 ký tự — đừng loại theo độ dài.
  if (chu.length === 1 && !_NGUYEN_DON.test(chu)) return false;
  if (chuanHoa(p) === chuanHoa(w?.hanzi)) return false;       // KTV / BBC: "phiên âm" trùng luôn chữ -> đề tự lộ đáp án
  return true;
};

/** Chốt cuối: mọi lựa chọn phải KHÁC NHAU sau chuẩn hoá, nếu không thì bỏ hẳn câu này.
 *  Đây là lưới an toàn cho cả những kiểu trùng chưa ai lường trước. */
function optionDuyNhat(options) {
  const thay = new Set();
  for (const o of options) {
    const c = chuanHoa(o.text);
    if (!c || thay.has(c)) return null;
    thay.add(c);
  }
  return options;
}

// ---------- Dạng câu hỏi ----------

/** Dạng 1: Cho Hanzi → chọn nghĩa đúng */
function makeHanziToMeaning(word, pool) {
  if (!nghiaDung(word)) return null;
  let validDistractors = pool.filter(w => nghiaDung(w) && chuanHoa(w.def) !== chuanHoa(word.def));
  validDistractors = validDistractors.filter((w, index, self) => index === self.findIndex(t => chuanHoa(t.def) === chuanHoa(w.def)));

  const distractors = pickRandom(validDistractors, 3);
  if (distractors.length < 3) return null;

  const options = optionDuyNhat(shuffle([
    { text: word.def, correct: true },
    ...distractors.map(d => ({ text: d.def, correct: false })),
  ]));
  if (!options) return null;

  return {
    type: 'hanzi-to-meaning',
    prompt: word.hanzi,
    promptSub: word.pinyin,
    question: `Từ "${word.hanzi}" có nghĩa là gì?`,
    options,
    correctIdx: options.findIndex(o => o.correct),
  };
}

/** Dạng 2: Cho nghĩa → chọn Hanzi đúng */
function makeMeaningToHanzi(word, pool) {
  if (!nghiaDung(word)) return null;
  // Nghĩa CHỨA chính chữ đang hỏi thì đề tự lộ đáp án — từ điển máy để lại những mục kiểu
  // 蛇 = "biến thể của 蛇", 踏 = "xem 踏實". Hỏi "Từ nào có nghĩa là …" là chỉ luôn đáp án.
  if (word.hanzi && String(word.def).includes(word.hanzi)) return null;
  let validDistractors = pool.filter(w => chuanHoa(w.hanzi) !== chuanHoa(word.hanzi) && chuanHoa(w.def) !== chuanHoa(word.def));
  validDistractors = validDistractors.filter((w, index, self) => index === self.findIndex(t => chuanHoa(t.hanzi) === chuanHoa(w.hanzi)));

  const distractors = pickRandom(validDistractors, 3);
  if (distractors.length < 3) return null;

  const options = optionDuyNhat(shuffle([
    { text: word.hanzi, correct: true },
    ...distractors.map(d => ({ text: d.hanzi, correct: false })),
  ]));
  if (!options) return null;

  return {
    type: 'meaning-to-hanzi',
    prompt: word.def,
    promptSub: '',
    question: `Từ nào có nghĩa là "${word.def}"?`,
    options,
    correctIdx: options.findIndex(o => o.correct),
  };
}

/** Dạng 3: Cho Pinyin → chọn Hanzi đúng */
function makePinyinToHanzi(word, pool) {
  if (!pinyinDung(word)) return null;
  let validDistractors = pool.filter(w => chuanHoa(w.hanzi) !== chuanHoa(word.hanzi) && chuanHoa(w.pinyin) !== chuanHoa(word.pinyin));
  validDistractors = validDistractors.filter((w, index, self) => index === self.findIndex(t => chuanHoa(t.hanzi) === chuanHoa(w.hanzi)));

  const distractors = pickRandom(validDistractors, 3);
  if (distractors.length < 3) return null;

  const options = optionDuyNhat(shuffle([
    { text: word.hanzi, correct: true },
    ...distractors.map(d => ({ text: d.hanzi, correct: false })),
  ]));
  if (!options) return null;

  return {
    type: 'pinyin-to-hanzi',
    prompt: word.pinyin,
    promptSub: '',
    question: `Phiên âm "${word.pinyin}" là của chữ Hán nào?`,
    options,
    correctIdx: options.findIndex(o => o.correct),
  };
}

// ---------- Dạng NGHE (2026-10-01, phản hồi của khách: thêm câu nghe âm thanh) ----------
// Chỉ dùng BẢN THU THẬT của sách (`audio`), không dùng giọng máy: câu nghe mà nghe giọng máy đọc
// sai thanh / sai âm đa âm thì học viên chọn đúng cũng bị chấm sai.
const coBanThu = (w) => typeof w?.audio === 'string' && /\.mp3$/i.test(w.audio);

/** Dạng 4: Nghe từ → chọn chữ Hán. Mồi nhử phải KHÁC phiên âm (kể cả thanh) — trùng âm thì
 *  nghe không phân biệt được, câu hỏi có hai đáp án đúng. */
function makeNgheChonChu(word, pool) {
  if (!coBanThu(word) || !pinyinDung(word)) return null;
  // Mọi cách đọc (trong bài) của chữ đáp án — chữ đa âm như 得 (de/děi/dé) và 地 (dì/de) chung
  // một cách đọc thì không cho làm mồi nhử của nhau, dù clip đang đọc cách khác.
  const amCua = (h) => new Set([word, ...pool].filter(w => chuanHoa(w.hanzi) === chuanHoa(h)).map(w => chuanHoa(w.pinyin)));
  const amDung = amCua(word.hanzi);
  let ds = pool.filter(w => chuanHoa(w.hanzi) !== chuanHoa(word.hanzi) && pinyinDung(w)
    && ![...amCua(w.hanzi)].some(a => amDung.has(a)));
  ds = ds.filter((w, i, self) => i === self.findIndex(t => chuanHoa(t.hanzi) === chuanHoa(w.hanzi)));
  const distractors = pickRandom(ds, 3);
  if (distractors.length < 3) return null;
  const options = optionDuyNhat(shuffle([
    { text: word.hanzi, correct: true },
    ...distractors.map(d => ({ text: d.hanzi, correct: false })),
  ]));
  if (!options) return null;
  return {
    type: 'nghe-chon-chu',
    prompt: '',
    promptSub: '',
    audio: word.audio,
    question: 'Nghe và chọn chữ Hán đúng',
    options,
    correctIdx: options.findIndex(o => o.correct),
  };
}

/** Dạng 5: Nghe từ → chọn nghĩa. */
function makeNgheChonNghia(word, pool) {
  if (!coBanThu(word) || !nghiaDung(word)) return null;
  let ds = pool.filter(w => nghiaDung(w) && chuanHoa(w.def) !== chuanHoa(word.def)
    && chuanHoa(w.pinyin) !== chuanHoa(word.pinyin));
  ds = ds.filter((w, i, self) => i === self.findIndex(t => chuanHoa(t.def) === chuanHoa(w.def)));
  const distractors = pickRandom(ds, 3);
  if (distractors.length < 3) return null;
  const options = optionDuyNhat(shuffle([
    { text: word.def, correct: true },
    ...distractors.map(d => ({ text: d.def, correct: false })),
  ]));
  if (!options) return null;
  return {
    type: 'nghe-chon-nghia',
    prompt: '',
    promptSub: '',
    audio: word.audio,
    question: 'Nghe và chọn nghĩa đúng',
    options,
    correctIdx: options.findIndex(o => o.correct),
  };
}

/** Dạng 6: Nghe một câu trong bài hội thoại (đoạn start–end của file bài khoá) → chọn nghĩa.
 *  Đáp án là NGHĨA TIẾNG VIỆT chứ không phải chữ Hán: chữ của bài khoá bóc bằng nhận dạng giọng
 *  nói (gen-thoidai-dialogue.py) nên còn chỗ sai chữ, còn bản dịch thì đã được soát theo ngữ cảnh. */
function makeNgheCauThoai(dialogue, soCau) {
  if (!dialogue || !dialogue.audio || !Array.isArray(dialogue.cues)) return [];
  const cues = dialogue.cues.filter(c => c && c.end > c.start && (c.end - c.start) <= 15
    && nghiaDung({ def: c.vi }) && [...String(c.text || '')].length >= 3);
  if (cues.length < 4) return [];
  const ra = [];
  for (const cue of pickRandom(cues, soCau)) {
    let ds = cues.filter(c => c !== cue && chuanHoa(c.vi) !== chuanHoa(cue.vi));
    ds = ds.filter((c, i, self) => i === self.findIndex(t => chuanHoa(t.vi) === chuanHoa(c.vi)));
    const distractors = pickRandom(ds, 3);
    if (distractors.length < 3) continue;
    const options = optionDuyNhat(shuffle([
      { text: cue.vi, correct: true },
      ...distractors.map(d => ({ text: d.vi, correct: false })),
    ]));
    if (!options) continue;
    ra.push({
      type: 'nghe-cau-thoai',
      prompt: '',
      promptSub: '',
      audio: dialogue.audio,
      start: cue.start,
      end: cue.end,
      question: 'Nghe câu hội thoại và chọn nghĩa đúng',
      options,
      correctIdx: options.findIndex(o => o.correct),
      wordHanzi: cue.text,
      wordPinyin: cue.pinyin || '',
      wordDef: cue.vi,
    });
  }
  return ra;
}

// ---------- Sinh quiz chính ----------

const QUESTION_MAKERS = [makeHanziToMeaning, makeMeaningToHanzi, makePinyinToHanzi];
const MAKERS_NGHE = [makeNgheChonChu, makeNgheChonNghia];
/** Số câu nghe hội thoại thêm vào mỗi đề (khi bài con có hội thoại kèm bản thu). */
const SO_CAU_THOAI = 2;

/**
 * Sinh bài tập trắc nghiệm cho một bài con.
 * @param {string} subLessonId — ví dụ 'td2-5.1'
 * @param {{vocab:object, subs:Array, lessons:Array, dialogues?:object}} [nguon] — bộ giáo trình
 * @param {{nghe?:boolean}} [tuyChon] — nghe: thêm câu NGHE (từ vựng có bản thu + câu hội thoại).
 *   Chỉ trang Bài tập giáo trình bật — nơi khác (kiểm tra từ vựng TOCFL) có renderer riêng chưa
 *   biết vẽ nút nghe.
 * @returns {Array|null} — mảng câu hỏi, hoặc null nếu bài chưa có data
 */
export function generateQuiz(subLessonId, nguon, tuyChon = {}) {
  const N = _ng(nguon);
  const sub = N.subs.find(s => s.id === subLessonId);
  if (!sub) return null;

  const parentId = sub.parentId;
  const allWords = N.vocab[String(parentId)] || [];
  // Lấy từ vựng trong phạm vi bài con (from..to, 1-indexed)
  const words = allWords.slice(sub.from - 1, sub.to);
  if (words.length === 0) return null;

  const questions = [];

  for (const word of words) {
    const pool = getDistractorPool(parentId, word.hanzi, N);

    // Chọn ngẫu nhiên 1 dạng câu hỏi cho mỗi từ (3 dạng đọc, thêm 2 dạng nghe nếu bật)
    const makers = shuffle([...QUESTION_MAKERS, ...(tuyChon.nghe ? MAKERS_NGHE : [])]);
    let q = null;
    for (const maker of makers) {
      q = maker(word, pool);
      if (q) break;
    }
    if (q) {
      q.wordHanzi = word.hanzi;
      q.wordPinyin = word.pinyin;
      q.wordDef = word.def;
      questions.push(q);
    }
  }

  if (tuyChon.nghe && N.dialogues) questions.push(...makeNgheCauThoai(N.dialogues[subLessonId], SO_CAU_THOAI));

  // Đảo thứ tự câu hỏi mỗi lần sinh đề (2026-08-28, theo phản hồi của học viên).
  // Đáp án trong từng câu vốn đã được shuffle ở các hàm make*, nhưng THỨ TỰ CÂU trước đây
  // luôn bám đúng thứ tự từ vựng của bài -> làm lần thứ hai là nhớ được cả bài theo vị trí.
  return shuffle(questions);
}

/**
 * Lấy thông tin bài tập (không sinh quiz, chỉ meta).
 * @param {string} subLessonId
 * @returns {{ available: boolean, wordCount: number, subLesson: object }|null}
 */
export function getExerciseInfo(subLessonId, nguon) {
  const N = _ng(nguon);
  const sub = N.subs.find(s => s.id === subLessonId);
  if (!sub) return null;

  const allWords = N.vocab[String(sub.parentId)] || [];
  const words = allWords.slice(sub.from - 1, sub.to);
  return { available: words.length >= 4, wordCount: words.length, subLesson: sub };
}
