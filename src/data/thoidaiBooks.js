// =============================================================
// Giáo trình Thời Đại (時代華語) — danh mục 5 QUYỂN + helper phân tích id bài / URL
// =============================================================
// Bộ 《時代華語》 do 淡江大學華語中心 khởi xướng, 7 trung tâm Hoa ngữ Đài Loan biên soạn
// (淡江 · 輔仁 · 文藻 · 慈濟 · 北教大 · 文化 · 逢甲), NXB 正中書局. Trọn bộ dự kiến 7 quyển,
// mỗi quyển 16 bài xoay quanh 16 chủ đề CỐ ĐỊNH lặp lại theo hình xoắn ốc. Tài nguyên chính
// thức hiện có tới quyển 5 — xem md/nguon-du-lieu-thoi-dai.md.
//
// KHÔNG PHẢI "bản mới của Đương đại": Đương đại (當代中文課程) là của MTC-NTNU, bộ khác hẳn.
//
// QUY ƯỚC ID — luôn có tiền tố 'td' + số quyển, kể cả quyển 1 (khác Đương đại: quyển 1 của
// Đương đại giữ id trần '5.2' vì đã lưu trong DB từ trước; Thời Đại là module mới nên đặt
// tiền tố ngay từ đầu, không bao giờ đụng namespace của Đương đại):
//   bài cha 'td2-5' · bài con 'td2-5.1' · lesson_id trong DB: 'td2-5.1', 'writing:td2-5.1',
//   'game:wordpop:td5-16.3' (21 ký tự — CẦN cột lesson_id VARCHAR(32), xem
//   server/config/migration-thoidai.sql).
//
// SỐ PHẦN MỖI BÀI KHÔNG CỐ ĐỊNH: quyển 1 có 3 phần (對話一 · 對話二 · 短文), quyển 2-5 có
// 2 phần (對話 · 短文). Ranh giới lấy từ bản thu 生詞 của chính sách, không chia tay.
//
// URL: /tocfl/giao-trinh-thoi-dai/quyen-2/bai-5-1/flashcard
// =============================================================

export const thoidaiBooks = [
  // Nhãn cấp độ là ƯỚC theo thứ tự quyển để người học định hướng — nhà xuất bản KHÔNG công bố
  // ánh xạ chính thức từng quyển ⇄ cấp TOCFL (chỉ nói bộ sách được 華測會 thẩm định là hỗ trợ
  // ôn TOCFL, từ vựng khớp trên 95% "三等七級詞表").
  {
    id: 1, slug: 'quyen-1', label: 'Quyển 1', title: 'Giáo trình Thời Đại 1', level: 'Nhập môn (A1)',
    lessons: [
      '新同學', '你幾點去學校？', '買生日禮物', '你要咖啡還是茶？', '我的錢包在哪裡？',
      '週末去打網球吧！', '怎麼到飯店去？', '這條裙子真好看', '我的中文課', '最近感冒的人很多',
      '你們是怎麼認識的？', '你想做什麼工作？', '用手機上網', '跨年活動', '十二生肖', '在台灣旅行',
    ],
  },
  {
    id: 2, slug: 'quyen-2', label: 'Quyển 2', title: 'Giáo trình Thời Đại 2', level: 'Sơ cấp (A2)',
    lessons: [
      '認識新朋友', '我得做家事', '我要租房子', '逛夜市真有趣', '歡迎到我家來玩',
      '我們去KTV唱歌吧！', '坐火車到花蓮去旅行', '請給我貼紙，我要換史努比！', '你怕考試嗎？',
      '下課後一起去健身吧！', '你想參加哪一個社團？', '小職員？大老闆？', '我要買筆電',
      '年年有「魚」', '孔子不知道的事', '世界各國的朋友',
    ],
  },
  {
    id: 3, slug: 'quyen-3', label: 'Quyển 3', title: 'Giáo trình Thời Đại 3', level: 'Trung cấp (B1)',
    lessons: [
      '我的夢想', '便利商店真方便', '貨比三家不吃虧', '孩子滿月了', '地震和颱風',
      '休閒新生活', '背包客的旅行', '穿著和品味', '誰說得念大學才有未來？', '健康檢查不麻煩',
      '網路交友要小心', '你有面試的經驗嗎？', '雲端科技真便利', '七夕情人節的故事',
      '去淡水參觀古蹟', '愛惜食物從你我做起',
    ],
  },
  {
    id: 4, slug: 'quyen-4', label: 'Quyển 4', title: 'Giáo trình Thời Đại 4', level: 'Trung cấp trên (B1–B2)',
    lessons: [
      '好久不見', '到銀行辦事', '網路購物停看聽', '飲一口好茶', '資源回收你我他',
      '看演唱會樂趣多', '全家自助旅遊去', '快工作 慢生活', '放手讓孩子做自己', '不幸中的大幸',
      '辦喜事 喝喜酒', '各行各業大家談', '參觀機器人科技展', '做月餅 慶中秋',
      '到臺北故宮一遊', '看奧運 聊體育',
    ],
  },
  {
    id: 5, slug: 'quyen-5', label: 'Quyển 5', title: 'Giáo trình Thời Đại 5', level: 'Cao cấp (B2)',
    lessons: [
      '我的未來不是夢', '生活不簡單', '不出門也能買遍全世界', '禮貌與禮儀', '愛地球就是愛自己',
      '不只是遊戲', '臺灣的鐵道', '自然就是美', '運用網路，學習零距離', '吃得安心又放心',
      '感情這條路', '工作環境與工作態度', '網路與生活', '歡喜慶元宵', '做自己人生的導演',
      '全球人口危機',
    ],
  },
];

/** 16 chủ đề cố định, bài thứ N của MỌI quyển đều thuộc chủ đề thứ N (đặc điểm riêng của bộ này). */
export const thoidaiThemes = [
  'Cá nhân & gia đình', 'Đời sống hằng ngày', 'Mua sắm & giao dịch', 'Ẩm thực & văn hoá',
  'Nhà ở & môi trường', 'Giải trí & thư giãn', 'Du lịch & giao thông', 'Thời trang & phong cách',
  'Giáo dục & học tập', 'Sức khoẻ & chăm sóc cơ thể', 'Quan hệ giữa người với người',
  'Công việc & xã hội', 'Công nghệ & đổi mới', 'Lễ tết & phong tục', 'Lịch sử & nhân văn',
  'Địa lý & thế giới',
];

/** Khoá bài cha: 'td2-5'. */
export function tdLessonKey(book, num) { return `td${book}-${num}`; }

/**
 * Phân tích id Thời Đại về { book, num, part, key, ns }:
 *   'td2-5'                 -> bài cha (part = null)
 *   'td2-5.1'               -> bài con
 *   'writing:td2-5.1' · 'game:bee:td2-5.1' -> ns = tiền tố
 * Không khớp -> null.
 */
export function tdParseLessonId(raw) {
  const s = String(raw == null ? '' : raw).trim();
  const m = /^(?:([a-z]+(?::[a-z]+)?):)?td(\d+)-(\d+)(?:\.(\d+))?$/.exec(s);
  if (!m) return null;
  const book = Number(m[2]), num = Number(m[3]);
  return { ns: m[1] || null, book, num, part: m[4] || null, key: tdLessonKey(book, num) };
}

export function tdBookOf(id) { return thoidaiBooks.find((b) => b.id === Number(id)) || null; }

/** Nhãn ngắn: 'TĐ Q2 · Bài 5.1' — luôn kèm quyển vì mọi quyển đều có bài cùng số. */
export function tdLessonLabel(raw) {
  const p = tdParseLessonId(raw);
  if (!p) return `Bài ${raw}`;
  return `TĐ Q${p.book} · Bài ${p.num}${p.part ? '.' + p.part : ''}`;
}

/** Đoạn URL của 1 bài con: 'td2-5.1' -> ['quyen-2', 'bai-5-1']. */
export function tdSubSegs(subId) {
  const p = tdParseLessonId(subId);
  if (!p) return ['bai-' + String(subId).replace(/\./g, '-')];
  return [`quyen-${p.book}`, p.part ? `bai-${p.num}-${p.part}` : `bai-${p.num}`];
}

/** Ngược lại: ['quyen-2','bai-5-1','flashcard'] -> { book, subId, rest }. */
export function tdSegsToSub(segs) {
  const s = (segs || []).map((x) => String(x || ''));
  let book = 1, i = 0;
  const mQ = /^quyen-(\d+)$/.exec(s[0] || '');
  if (mQ) { book = Number(mQ[1]); i = 1; }
  const mSub = /^bai-(\d+)-(\d+)$/.exec(s[i] || '');
  const subId = mSub ? `${tdLessonKey(book, mSub[1])}.${mSub[2]}` : null;
  return { book, subId, rest: subId ? s.slice(i + 1) : s.slice(i) };
}
