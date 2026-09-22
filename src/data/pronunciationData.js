// ============================================================
// DỮ LIỆU HỌC PHÁT ÂM — Thanh mẫu · Vận mẫu · Thanh điệu
// Biên soạn gốc cho ITaiwan. Âm thanh phát bằng Web Speech API (zh-TW),
// không phụ thuộc file mp3 bên ngoài.
// Mỗi mục có `speak` = chữ Hán đại diện để TTS đọc đúng âm.
// ============================================================

// ------------------------------------------------------------
// 1. THANH MẪU (聲母) — 21 phụ âm đầu, chia 6 nhóm theo vị trí lưỡi
// ------------------------------------------------------------
export const initialsData = [
  {
    group: 'Âm hai môi & môi răng',
    groupCn: '雙唇音 · 唇齒音',
    hint: 'Khép hai môi lại rồi bật ra. Riêng f thì răng trên chạm môi dưới.',
    color: 'violet',
    items: [
      { pinyin: 'b', ipa: '[p]', speak: '波', desc: 'Gần giống <b>p</b> tiếng Việt, KHÔNG bật hơi. Khép môi rồi mở nhẹ.', tip: 'Đặt tờ giấy trước miệng — giấy không được lay.', examples: [{ hanzi: '八', pinyin: 'bā', meaning: 'số tám' }, { hanzi: '爸爸', pinyin: 'bàba', meaning: 'bố' }] },
      { pinyin: 'p', ipa: '[pʰ]', speak: '怕', desc: 'Cũng là <b>p</b> nhưng BẬT HƠI thật mạnh.', tip: 'Tờ giấy trước miệng phải bay lên rõ rệt.', examples: [{ hanzi: '怕', pinyin: 'pà', meaning: 'sợ' }, { hanzi: '朋友', pinyin: 'péngyǒu', meaning: 'bạn bè' }] },
      { pinyin: 'm', ipa: '[m]', speak: '摸', desc: 'Giống hệt <b>m</b> tiếng Việt, hơi thoát qua mũi.', tip: 'Âm dễ nhất với người Việt.', examples: [{ hanzi: '媽媽', pinyin: 'māma', meaning: 'mẹ' }, { hanzi: '忙', pinyin: 'máng', meaning: 'bận' }] },
      { pinyin: 'f', ipa: '[f]', speak: '佛', desc: 'Giống <b>ph</b> tiếng Việt. Răng trên chạm nhẹ môi dưới.', tip: 'Đừng đọc thành "b" — phải có tiếng gió xát.', examples: [{ hanzi: '飯', pinyin: 'fàn', meaning: 'cơm' }, { hanzi: '飛機', pinyin: 'fēijī', meaning: 'máy bay' }] },
    ],
  },
  {
    group: 'Âm đầu lưỡi',
    groupCn: '舌尖中音',
    hint: 'Đầu lưỡi chạm chân răng trên.',
    color: 'blue',
    items: [
      { pinyin: 'd', ipa: '[t]', speak: '大', desc: 'Gần giống <b>t</b> tiếng Việt, KHÔNG bật hơi.', tip: 'Không phải "đ" — nhẹ và gọn hơn.', examples: [{ hanzi: '大', pinyin: 'dà', meaning: 'to, lớn' }, { hanzi: '對', pinyin: 'duì', meaning: 'đúng' }] },
      { pinyin: 't', ipa: '[tʰ]', speak: '他', desc: 'Giống <b>th</b> tiếng Việt, bật hơi mạnh.', tip: 'Cặp đôi với d: cùng khẩu hình, khác luồng hơi.', examples: [{ hanzi: '他', pinyin: 'tā', meaning: 'anh ấy' }, { hanzi: '天', pinyin: 'tiān', meaning: 'trời' }] },
      { pinyin: 'n', ipa: '[n]', speak: '你', desc: 'Giống <b>n</b> tiếng Việt, hơi thoát qua mũi.', tip: 'Phân biệt rõ với l — nhiều người hay lẫn.', examples: [{ hanzi: '你', pinyin: 'nǐ', meaning: 'bạn' }, { hanzi: '難', pinyin: 'nán', meaning: 'khó' }] },
      { pinyin: 'l', ipa: '[l]', speak: '來', desc: 'Giống <b>l</b> tiếng Việt, hơi thoát hai bên lưỡi.', tip: 'Đầu lưỡi cong lên chạm lợi.', examples: [{ hanzi: '來', pinyin: 'lái', meaning: 'đến' }, { hanzi: '老師', pinyin: 'lǎoshī', meaning: 'giáo viên' }] },
    ],
  },
  {
    group: 'Âm gốc lưỡi',
    groupCn: '舌根音',
    hint: 'Gốc lưỡi nâng lên chạm ngạc mềm, phát sâu trong họng.',
    color: 'teal',
    items: [
      { pinyin: 'g', ipa: '[k]', speak: '高', desc: 'Gần giống <b>c/k</b> tiếng Việt, KHÔNG bật hơi.', tip: 'Không đọc thành "g" tiếng Việt (gà) — âm này vô thanh.', examples: [{ hanzi: '高', pinyin: 'gāo', meaning: 'cao' }, { hanzi: '哥哥', pinyin: 'gēge', meaning: 'anh trai' }] },
      { pinyin: 'k', ipa: '[kʰ]', speak: '看', desc: 'Giống <b>kh</b> tiếng Việt nhưng bật hơi mạnh hơn nhiều.', tip: 'Cặp đôi với g.', examples: [{ hanzi: '看', pinyin: 'kàn', meaning: 'xem, nhìn' }, { hanzi: '可以', pinyin: 'kěyǐ', meaning: 'có thể' }] },
      { pinyin: 'h', ipa: '[x]', speak: '好', desc: 'Giống <b>h</b> tiếng Việt nhưng xát hơn, có tiếng ma sát ở cổ họng.', tip: 'Nghe hơi giống "kh" nhẹ.', examples: [{ hanzi: '好', pinyin: 'hǎo', meaning: 'tốt' }, { hanzi: '喝', pinyin: 'hē', meaning: 'uống' }] },
    ],
  },
  {
    group: 'Âm mặt lưỡi',
    groupCn: '舌面音',
    hint: 'Môi GIẸP sang hai bên, mặt lưỡi áp lên ngạc cứng. Chỉ ghép với i và ü.',
    color: 'amber',
    items: [
      { pinyin: 'j', ipa: '[tɕ]', speak: '家', desc: 'Gần giống <b>ch</b> tiếng Việt, môi giẹp, KHÔNG bật hơi.', tip: 'Cười mỉm khi phát âm là đúng khẩu hình.', examples: [{ hanzi: '家', pinyin: 'jiā', meaning: 'nhà' }, { hanzi: '幾', pinyin: 'jǐ', meaning: 'mấy' }] },
      { pinyin: 'q', ipa: '[tɕʰ]', speak: '去', desc: 'Như <b>j</b> nhưng BẬT HƠI mạnh.', tip: 'Đừng đọc thành "kw" như tiếng Anh (queen).', examples: [{ hanzi: '去', pinyin: 'qù', meaning: 'đi' }, { hanzi: '七', pinyin: 'qī', meaning: 'số bảy' }] },
      { pinyin: 'x', ipa: '[ɕ]', speak: '謝', desc: 'Gần giống <b>x</b> tiếng Việt, môi giẹp, lưỡi áp ngạc.', tip: 'Đừng đọc thành "s" — mỏng và cao hơn.', examples: [{ hanzi: '謝謝', pinyin: 'xièxie', meaning: 'cảm ơn' }, { hanzi: '小', pinyin: 'xiǎo', meaning: 'nhỏ' }] },
    ],
  },
  {
    group: 'Âm quặt lưỡi',
    groupCn: '舌尖後音',
    hint: 'UỐN đầu lưỡi ngược lên vòm miệng, môi hơi tròn. Nhóm khó nhất với người Việt.',
    color: 'coral',
    items: [
      { pinyin: 'zh', ipa: '[ʈʂ]', speak: '中', desc: 'Gần giống <b>tr</b> tiếng Việt (giọng Nam), uốn lưỡi, KHÔNG bật hơi.', tip: 'Lưỡi cong ngược, đầu lưỡi không chạm hẳn vào đâu.', examples: [{ hanzi: '中國', pinyin: 'Zhōngguó', meaning: 'Trung Quốc' }, { hanzi: '知道', pinyin: 'zhīdào', meaning: 'biết' }] },
      { pinyin: 'ch', ipa: '[ʈʂʰ]', speak: '吃', desc: 'Như <b>zh</b> nhưng BẬT HƠI mạnh.', tip: 'Cặp đôi với zh.', examples: [{ hanzi: '吃', pinyin: 'chī', meaning: 'ăn' }, { hanzi: '車', pinyin: 'chē', meaning: 'xe' }] },
      { pinyin: 'sh', ipa: '[ʂ]', speak: '是', desc: 'Gần giống <b>s</b> tiếng Việt (giọng Nam), uốn lưỡi.', tip: 'Dày và trầm hơn "x".', examples: [{ hanzi: '是', pinyin: 'shì', meaning: 'là' }, { hanzi: '書', pinyin: 'shū', meaning: 'sách' }] },
      { pinyin: 'r', ipa: '[ʐ]', speak: '人', desc: 'Uốn lưỡi như sh nhưng RUNG dây thanh. Nghe lai giữa <b>r</b> và <b>j</b>.', tip: 'Không rung đầu lưỡi như "r" tiếng Việt.', examples: [{ hanzi: '人', pinyin: 'rén', meaning: 'người' }, { hanzi: '日本', pinyin: 'Rìběn', meaning: 'Nhật Bản' }] },
    ],
  },
  {
    group: 'Âm đầu lưỡi trước',
    groupCn: '舌尖前音',
    hint: 'Đầu lưỡi ĐẨY RA sát mặt sau răng cửa trên, môi giẹp.',
    color: 'green',
    items: [
      { pinyin: 'z', ipa: '[ts]', speak: '字', desc: 'Phát âm như <b>ch</b> trong tiếng Việt, âm tắc sát KHÔNG bật hơi, đầu lưỡi thẳng tiếp xúc giữa hai hàm răng trên và dưới.', tip: 'Giống âm giữa trong từ "pizza".', examples: [{ hanzi: '字', pinyin: 'zì', meaning: 'chữ' }, { hanzi: '早上', pinyin: 'zǎoshang', meaning: 'buổi sáng' }] },
      { pinyin: 'c', ipa: '[tsʰ]', speak: '菜', desc: 'Đặt lưỡi giống chữ <b>z</b> nhưng BẬT HƠI mạnh.', tip: 'Giống "ts" trong "cats" kèm luồng hơi.', examples: [{ hanzi: '菜', pinyin: 'cài', meaning: 'món ăn, rau' }, { hanzi: '次', pinyin: 'cì', meaning: 'lần' }] },
      { pinyin: 's', ipa: '[s]', speak: '三', desc: 'Giống <b>x</b> tiếng Việt, đầu lưỡi sát răng cửa.', tip: 'Phẳng và mỏng, khác hẳn "sh" uốn lưỡi.', examples: [{ hanzi: '三', pinyin: 'sān', meaning: 'số ba' }, { hanzi: '四', pinyin: 'sì', meaning: 'số bốn' }] },
    ],
  },
];

// Cặp thanh mẫu dễ nhầm — dùng cho phần "Luyện phân biệt"
export const initialPairs = [
  { a: 'b', b: 'p', speakA: '八', speakB: '怕', note: 'b không bật hơi · p bật hơi' },
  { a: 'd', b: 't', speakA: '大', speakB: '他', note: 'd không bật hơi · t bật hơi' },
  { a: 'g', b: 'k', speakA: '高', speakB: '看', note: 'g không bật hơi · k bật hơi' },
  { a: 'j', b: 'q', speakA: '家', speakB: '去', note: 'j không bật hơi · q bật hơi' },
  { a: 'zh', b: 'ch', speakA: '中', speakB: '吃', note: 'zh không bật hơi · ch bật hơi' },
  { a: 'z', b: 'c', speakA: '字', speakB: '菜', note: 'z không bật hơi · c bật hơi' },
  { a: 'zh', b: 'z', speakA: '知', speakB: '資', note: 'zh uốn lưỡi · z lưỡi sát răng' },
  { a: 'sh', b: 's', speakA: '是', speakB: '四', note: 'sh uốn lưỡi · s lưỡi sát răng' },
  { a: 'x', b: 'sh', speakA: '西', speakB: '師', note: 'x môi giẹp · sh uốn lưỡi' },
  { a: 'n', b: 'l', speakA: '你', speakB: '力', note: 'n hơi qua mũi · l hơi qua hai bên lưỡi' },
];

// ------------------------------------------------------------
// 2. VẬN MẪU (韻母) — 36 vần, chia 6 nhóm
// ------------------------------------------------------------
export const finalsData = [
  {
    group: 'Vận mẫu đơn',
    groupCn: '單韻母',
    hint: '6 nguyên âm gốc. Nắm chắc nhóm này thì các vần còn lại chỉ là ghép lại.',
    color: 'violet',
    items: [
      { pinyin: 'a', ipa: '[a]', speak: '啊', desc: 'Há to miệng, lưỡi hạ thấp. Giống <b>a</b> tiếng Việt.', examples: [{ hanzi: '媽', pinyin: 'mā', meaning: 'mẹ' }, { hanzi: '大', pinyin: 'dà', meaning: 'to' }] },
      { pinyin: 'o', ipa: '[o]', speak: '哦', desc: 'Tròn môi, lưỡi lùi sau. Giống chữ <b>ô</b> trong tiếng Việt khi kéo dài nếu đứng 1 mình, nếu đi kèm với thanh mẫu thì đọc giống <b>uô</b>. ', examples: [{ hanzi: '我', pinyin: 'wǒ', meaning: 'tôi' }, { hanzi: '波', pinyin: 'bō', meaning: 'sóng' }] },
      { pinyin: 'e', ipa: '[ɤ]', speak: '餓', desc: 'Miệng hé giẹp, lưỡi lùi. Giống <b>ưa</b> tiếng Việt.', note: 'Chữ <b>e</b> đọc là <b>ơ</b> khi đi với thanh mẫu <b>d · m · l · n</b> và KHÔNG mang thanh điệu. Tất cả trường hợp còn lại đều đọc là <b>ưa</b>.', examples: [{ hanzi: '餓', pinyin: 'è', meaning: 'đói' }, { hanzi: '喝', pinyin: 'hē', meaning: 'uống' }] },
      { pinyin: 'i', ipa: '[i]', speak: '一', desc: 'Môi giẹp sang hai bên, lưỡi nâng cao. Giống <b>i</b> tiếng Việt.', note: 'Đứng một mình viết là <b>yi</b>.', examples: [{ hanzi: '你', pinyin: 'nǐ', meaning: 'bạn' }, { hanzi: '七', pinyin: 'qī', meaning: 'bảy' }] },
      { pinyin: 'u', ipa: '[u]', speak: '五', desc: 'Tròn môi thật nhỏ, đẩy về phía trước. Giống <b>u</b> tiếng Việt.', note: 'Đứng một mình viết là <b>wu</b>.', examples: [{ hanzi: '五', pinyin: 'wǔ', meaning: 'năm' }, { hanzi: '書', pinyin: 'shū', meaning: 'sách' }] },
      { pinyin: 'ü', ipa: '[y]', speak: '魚', desc: 'Môi tròn như <b>u</b> nhưng lưỡi ở vị trí <b>i</b>. Tiếng Việt KHÔNG có âm này.', note: 'Đứng một mình viết là <b>yu</b>. Sau j/q/x/y thì bỏ hai chấm: ju, qu, xu.', examples: [{ hanzi: '魚', pinyin: 'yú', meaning: 'cá' }, { hanzi: '女', pinyin: 'nǚ', meaning: 'nữ' }] },
    ],
  },
  {
    group: 'Vận mẫu kép',
    groupCn: '複韻母',
    hint: 'Trượt từ nguyên âm này sang nguyên âm kia. Âm đầu đọc rõ và dài hơn.',
    color: 'blue',
    items: [
      { pinyin: 'ai', ipa: '[ai]', speak: '愛', desc: 'Từ <b>a</b> trượt nhanh sang <b>i</b>. Giống <b>ai</b> tiếng Việt.', examples: [{ hanzi: '愛', pinyin: 'ài', meaning: 'yêu' }, { hanzi: '來', pinyin: 'lái', meaning: 'đến' }] },
      { pinyin: 'ei', ipa: '[ei]', speak: '北', desc: 'Từ <b>ê</b> trượt sang <b>i</b>. Giống <b>ây</b> tiếng Việt.', examples: [{ hanzi: '北', pinyin: 'běi', meaning: 'bắc' }, { hanzi: '給', pinyin: 'gěi', meaning: 'cho' }] },
      { pinyin: 'ao', ipa: '[au]', speak: '好', desc: 'Từ <b>a</b> trượt sang <b>o</b>, kết thúc tròn môi. Giống <b>ao</b> tiếng Việt.', examples: [{ hanzi: '好', pinyin: 'hǎo', meaning: 'tốt' }, { hanzi: '高', pinyin: 'gāo', meaning: 'cao' }] },
      { pinyin: 'ou', ipa: '[ou]', speak: '有', desc: 'Từ <b>ô</b> trượt sang <b>u</b>. Giống <b>âu</b> tiếng Việt.', examples: [{ hanzi: '有', pinyin: 'yǒu', meaning: 'có' }, { hanzi: '都', pinyin: 'dōu', meaning: 'đều' }] },
    ],
  },
  {
    group: 'Vận mẫu mũi',
    groupCn: '鼻韻母',
    hint: 'Kết thúc bằng -n (đầu lưỡi chạm lợi) hoặc -ng (gốc lưỡi nâng, hơi qua mũi).',
    color: 'teal',
    items: [
      { pinyin: 'an', ipa: '[an]', speak: '安', desc: '<b>a</b> + đầu lưỡi chạm lợi. Giống <b>an</b> tiếng Việt.', examples: [{ hanzi: '安全', pinyin: 'ānquán', meaning: 'an toàn' }, { hanzi: '看', pinyin: 'kàn', meaning: 'xem' }] },
      { pinyin: 'en', ipa: '[ən]', speak: '恩', desc: '<b>ơ</b> ngắn + <b>n</b>. Giống <b>ân</b> tiếng Việt.', examples: [{ hanzi: '很', pinyin: 'hěn', meaning: 'rất' }, { hanzi: '門', pinyin: 'mén', meaning: 'cửa' }] },
      { pinyin: 'ang', ipa: '[aŋ]', speak: '忙', desc: '<b>a</b> + gốc lưỡi nâng. Giống <b>ang</b> tiếng Việt.', examples: [{ hanzi: '忙', pinyin: 'máng', meaning: 'bận' }, { hanzi: '幫', pinyin: 'bāng', meaning: 'giúp' }] },
      { pinyin: 'eng', ipa: '[əŋ]', speak: '冷', desc: '<b>ơ</b> + <b>ng</b>. Giống <b>âng</b> tiếng Việt.', examples: [{ hanzi: '冷', pinyin: 'lěng', meaning: 'lạnh' }, { hanzi: '朋友', pinyin: 'péngyǒu', meaning: 'bạn bè' }] },
      { pinyin: 'ong', ipa: '[ʊŋ]', speak: '中', desc: '<b>u</b> + <b>ng</b>, tròn môi. Giống <b>ung</b> tiếng Việt.', note: 'Không bao giờ đứng một mình.', examples: [{ hanzi: '中', pinyin: 'zhōng', meaning: 'giữa, trung' }, { hanzi: '紅', pinyin: 'hóng', meaning: 'đỏ' }] },
      { pinyin: 'er', ipa: '[ɚ]', speak: '二', desc: 'Đọc <b>ơ</b> rồi UỐN đầu lưỡi lên. Chỉ đứng một mình, không ghép thanh mẫu.', examples: [{ hanzi: '二', pinyin: 'èr', meaning: 'số hai' }, { hanzi: '兒子', pinyin: 'érzi', meaning: 'con trai' }] },
    ],
  },
  {
    group: 'Nhóm i-',
    groupCn: '齊齒呼',
    hint: 'Bắt đầu bằng i, môi giẹp. Đứng đầu âm tiết thì i đổi thành y.',
    color: 'amber',
    items: [
      { pinyin: 'ia', ipa: '[ia]', speak: '家', desc: '<b>i</b> lướt nhanh sang <b>a</b>.', note: 'Viết riêng: <b>ya</b>.', examples: [{ hanzi: '家', pinyin: 'jiā', meaning: 'nhà' }, { hanzi: '鴨', pinyin: 'yā', meaning: 'vịt' }] },
      { pinyin: 'ie', ipa: '[iɛ]', speak: '謝', desc: '<b>i</b> + <b>ê</b>. Đọc là "iê" chứ không phải "iơ".', note: 'Viết riêng: <b>ye</b>.', examples: [{ hanzi: '謝謝', pinyin: 'xièxie', meaning: 'cảm ơn' }, { hanzi: '也', pinyin: 'yě', meaning: 'cũng' }] },
      { pinyin: 'iao', ipa: '[iau]', speak: '小', desc: '<b>i</b> + <b>ao</b>.', note: 'Viết riêng: <b>yao</b>.', examples: [{ hanzi: '小', pinyin: 'xiǎo', meaning: 'nhỏ' }, { hanzi: '要', pinyin: 'yào', meaning: 'muốn' }] },
      { pinyin: 'iu', ipa: '[iou]', speak: '六', desc: 'Viết tắt của <b>iou</b> — vẫn phải đọc rõ âm <b>o</b> ở giữa.', note: 'Viết riêng: <b>you</b>.', examples: [{ hanzi: '六', pinyin: 'liù', meaning: 'số sáu' }, { hanzi: '有', pinyin: 'yǒu', meaning: 'có' }] },
      { pinyin: 'ian', ipa: '[iɛn]', speak: '天', desc: '<b>i</b> + <b>an</b>, nhưng đọc gần "iên" hơn là "ian".', note: 'Viết riêng: <b>yan</b>.', examples: [{ hanzi: '天', pinyin: 'tiān', meaning: 'trời' }, { hanzi: '錢', pinyin: 'qián', meaning: 'tiền' }] },
      { pinyin: 'in', ipa: '[in]', speak: '心', desc: '<b>i</b> + <b>n</b>. Giống <b>in</b> tiếng Việt.', note: 'Viết riêng: <b>yin</b>.', examples: [{ hanzi: '心', pinyin: 'xīn', meaning: 'tim, tâm' }, { hanzi: '銀行', pinyin: 'yínháng', meaning: 'ngân hàng' }] },
      { pinyin: 'iang', ipa: '[iaŋ]', speak: '想', desc: '<b>i</b> + <b>ang</b>.', note: 'Viết riêng: <b>yang</b>.', examples: [{ hanzi: '想', pinyin: 'xiǎng', meaning: 'nghĩ, muốn' }, { hanzi: '樣子', pinyin: 'yàngzi', meaning: 'dáng vẻ' }] },
      { pinyin: 'ing', ipa: '[iŋ]', speak: '名', desc: '<b>i</b> + <b>ng</b>. Giống <b>inh</b> tiếng Việt.', note: 'Viết riêng: <b>ying</b>.', examples: [{ hanzi: '名字', pinyin: 'míngzi', meaning: 'tên' }, { hanzi: '英文', pinyin: 'Yīngwén', meaning: 'tiếng Anh' }] },
      { pinyin: 'iong', ipa: '[iʊŋ]', speak: '熊', desc: '<b>i</b> + <b>ong</b>.', note: 'Viết riêng: <b>yong</b>.', examples: [{ hanzi: '熊', pinyin: 'xióng', meaning: 'con gấu' }, { hanzi: '用', pinyin: 'yòng', meaning: 'dùng' }] },
    ],
  },
  {
    group: 'Nhóm u-',
    groupCn: '合口呼',
    hint: 'Bắt đầu bằng u, tròn môi. Đứng đầu âm tiết thì u đổi thành w.',
    color: 'coral',
    items: [
      { pinyin: 'ua', ipa: '[ua]', speak: '花', desc: '<b>u</b> lướt sang <b>a</b>.', note: 'Viết riêng: <b>wa</b>.', examples: [{ hanzi: '花', pinyin: 'huā', meaning: 'hoa' }, { hanzi: '娃娃', pinyin: 'wáwa', meaning: 'búp bê' }] },
      { pinyin: 'uo', ipa: '[uo]', speak: '說', desc: '<b>u</b> lướt sang <b>ô</b>.', note: 'Viết riêng: <b>wo</b>.', examples: [{ hanzi: '說', pinyin: 'shuō', meaning: 'nói' }, { hanzi: '我', pinyin: 'wǒ', meaning: 'tôi' }] },
      { pinyin: 'uai', ipa: '[uai]', speak: '快', desc: '<b>u</b> + <b>ai</b>.', note: 'Viết riêng: <b>wai</b>.', examples: [{ hanzi: '快', pinyin: 'kuài', meaning: 'nhanh' }, { hanzi: '外面', pinyin: 'wàimiàn', meaning: 'bên ngoài' }] },
      { pinyin: 'ui', ipa: '[uei]', speak: '對', desc: 'Viết tắt của <b>uei</b> — vẫn phải đọc âm <b>ê</b> ở giữa.', note: 'Viết riêng: <b>wei</b>.', examples: [{ hanzi: '對', pinyin: 'duì', meaning: 'đúng' }, { hanzi: '為什麼', pinyin: 'wèishénme', meaning: 'tại sao' }] },
      { pinyin: 'uan', ipa: '[uan]', speak: '短', desc: '<b>u</b> + <b>an</b>.', note: 'Viết riêng: <b>wan</b>.', examples: [{ hanzi: '短', pinyin: 'duǎn', meaning: 'ngắn' }, { hanzi: '晚上', pinyin: 'wǎnshang', meaning: 'buổi tối' }] },
      { pinyin: 'un', ipa: '[uən]', speak: '春', desc: 'Viết tắt của <b>uen</b> — có âm <b>ơ</b> mờ ở giữa.', note: 'Viết riêng: <b>wen</b>.', examples: [{ hanzi: '春天', pinyin: 'chūntiān', meaning: 'mùa xuân' }, { hanzi: '問', pinyin: 'wèn', meaning: 'hỏi' }] },
      { pinyin: 'uang', ipa: '[uaŋ]', speak: '光', desc: '<b>u</b> + <b>ang</b>.', note: 'Viết riêng: <b>wang</b>.', examples: [{ hanzi: '光', pinyin: 'guāng', meaning: 'ánh sáng' }, { hanzi: '王', pinyin: 'wáng', meaning: 'vua, họ Vương' }] },
      { pinyin: 'ueng', ipa: '[uəŋ]', speak: '翁', desc: '<b>u</b> + <b>eng</b>. Chỉ xuất hiện ở dạng <b>weng</b>, không ghép thanh mẫu.', examples: [{ hanzi: '老翁', pinyin: 'lǎowēng', meaning: 'ông lão' }] },
    ],
  },
  {
    group: 'Nhóm ü-',
    groupCn: '撮口呼',
    hint: 'Bắt đầu bằng ü. Sau j/q/x/y viết bỏ hai chấm nhưng vẫn đọc là ü.',
    color: 'green',
    items: [
      { pinyin: 'üe', ipa: '[yɛ]', speak: '月', desc: '<b>ü</b> lướt sang <b>ê</b>.', note: 'Viết riêng: <b>yue</b>.', examples: [{ hanzi: '月亮', pinyin: 'yuèliàng', meaning: 'mặt trăng' }, { hanzi: '學', pinyin: 'xué', meaning: 'học' }] },
      { pinyin: 'üan', ipa: '[yɛn]', speak: '圓', desc: '<b>ü</b> + <b>an</b>, đọc gần "uyên".', note: 'Viết riêng: <b>yuan</b>.', examples: [{ hanzi: '圓', pinyin: 'yuán', meaning: 'tròn' }, { hanzi: '公園', pinyin: 'gōngyuán', meaning: 'công viên' }] },
      { pinyin: 'ün', ipa: '[yn]', speak: '雲', desc: '<b>ü</b> + <b>n</b>.', note: 'Viết riêng: <b>yun</b>.', examples: [{ hanzi: '雲', pinyin: 'yún', meaning: 'mây' }, { hanzi: '裙子', pinyin: 'qúnzi', meaning: 'váy' }] },
    ],
  },
];

// ------------------------------------------------------------
// 3. THANH ĐIỆU (聲調) — 4 thanh + thanh nhẹ
// `contour` = đường cao độ vẽ SVG, thang 1 (thấp) → 5 (cao)
// ------------------------------------------------------------
export const tonesData = [
  {
    num: 1, name: 'Thanh ngang', nameCn: '第一聲 · 陰平', mark: 'ˉ', pitch: '5–5',
    contour: [[0, 5], [100, 5]],
    color: 'violet',
    desc: 'Giữ giọng CAO và ĐỀU từ đầu đến cuối, không lên không xuống.',
    viNote: 'Tiếng Việt không có thanh tương đương hoàn toàn — gần với thanh không dấu nhưng phải cao hơn nhiều.',
    tip: 'Hát một nốt nhạc cao rồi giữ nguyên 2 giây.',
    speak: '巴', sample: { hanzi: '巴', pinyin: 'bā', meaning: 'mong mỏi' },
  },
  {
    num: 2, name: 'Thanh sắc', nameCn: '第二聲 · 陽平', mark: 'ˊ', pitch: '3–5',
    contour: [[0, 3], [100, 5]],
    color: 'blue',
    desc: 'Đi LÊN đều từ cao độ trung bình tới cao nhất.',
    viNote: 'Giống dấu SẮC tiếng Việt, nhưng kéo dài và mượt hơn.',
    tip: 'Giống ngữ điệu khi bạn hỏi lại "Hả?" đầy ngạc nhiên.',
    speak: '拔', sample: { hanzi: '拔', pinyin: 'bá', meaning: 'nhổ, rút' },
  },
  {
    num: 3, name: 'Thanh hỏi', nameCn: '第三聲 · 上聲', mark: 'ˇ', pitch: '2–1–4',
    contour: [[0, 2.4], [42, 1], [100, 4]],
    color: 'amber',
    desc: 'XUỐNG thấp nhất rồi mới VỌT LÊN. Thanh dài nhất trong 4 thanh.',
    viNote: 'Gần dấu HỎI tiếng Việt nhưng phần xuống sâu hơn và phần lên rõ hơn.',
    tip: 'Trong câu nói thường, thanh 3 hay chỉ đọc nửa đầu (xuống thấp, không lên).',
    speak: '把', sample: { hanzi: '把', pinyin: 'bǎ', meaning: 'cầm, nắm' },
  },
  {
    num: 4, name: 'Thanh huyền', nameCn: '第四聲 · 去聲', mark: 'ˋ', pitch: '5–1',
    contour: [[0, 5], [100, 1]],
    color: 'coral',
    desc: 'Từ CAO NHẤT rơi thẳng xuống THẤP NHẤT, dứt khoát và ngắn.',
    viNote: 'Mạnh hơn dấu HUYỀN tiếng Việt nhiều — giống giọng ra lệnh.',
    tip: 'Giống khi bạn cáu gắt nói "Thôi!".',
    speak: '爸', sample: { hanzi: '爸', pinyin: 'bà', meaning: 'bố' },
  },
  {
    num: 0, name: 'Thanh nhẹ', nameCn: '輕聲', mark: '·', pitch: 'ngắn, nhẹ',
    contour: [[35, 3], [65, 2.8]],
    color: 'teal',
    desc: 'Đọc NGẮN và NHẸ, không có dấu. Cao độ phụ thuộc thanh của chữ đứng trước.',
    viNote: 'Thường gặp ở trợ từ (嗎, 吧, 呢) và âm tiết thứ hai của từ láy (媽媽, 爸爸).',
    tip: 'Đừng nhấn — lướt qua thật nhanh.',
    speak: '吧', sample: { hanzi: '吧', pinyin: 'ba', meaning: 'trợ từ đề nghị' },
  },
];

// Bộ 5 chữ cùng âm "ma" — kinh điển để cảm nhận sự khác biệt của thanh điệu
export const toneMinimalSet = {
  syllable: 'ma',
  items: [
    { hanzi: '媽', pinyin: 'mā', tone: 1, meaning: 'mẹ' },
    { hanzi: '麻', pinyin: 'má', tone: 2, meaning: 'cây gai' },
    { hanzi: '馬', pinyin: 'mǎ', tone: 3, meaning: 'con ngựa' },
    { hanzi: '罵', pinyin: 'mà', tone: 4, meaning: 'mắng' },
    { hanzi: '嗎', pinyin: 'ma', tone: 0, meaning: 'trợ từ hỏi' },
  ],
};

// Các bộ tối thiểu khác để luyện nghe
export const toneDrills = [
  { syllable: 'yi', items: [{ hanzi: '一', pinyin: 'yī', tone: 1, meaning: 'một' }, { hanzi: '姨', pinyin: 'yí', tone: 2, meaning: 'dì' }, { hanzi: '椅', pinyin: 'yǐ', tone: 3, meaning: 'ghế' }, { hanzi: '意', pinyin: 'yì', tone: 4, meaning: 'ý' }] },
  { syllable: 'tang', items: [{ hanzi: '湯', pinyin: 'tāng', tone: 1, meaning: 'canh' }, { hanzi: '糖', pinyin: 'táng', tone: 2, meaning: 'đường' }, { hanzi: '躺', pinyin: 'tǎng', tone: 3, meaning: 'nằm' }, { hanzi: '燙', pinyin: 'tàng', tone: 4, meaning: 'nóng bỏng' }] },
  { syllable: 'wen', items: [{ hanzi: '溫', pinyin: 'wēn', tone: 1, meaning: 'ấm' }, { hanzi: '文', pinyin: 'wén', tone: 2, meaning: 'văn' }, { hanzi: '穩', pinyin: 'wěn', tone: 3, meaning: 'vững' }, { hanzi: '問', pinyin: 'wèn', tone: 4, meaning: 'hỏi' }] },
];

// Quy tắc biến điệu
export const toneSandhi = [
  {
    title: 'Hai thanh 3 đi liền nhau',
    rule: 'Thanh 3 đứng trước → đọc thành thanh 2',
    formula: '3 + 3 → 2 + 3',
    examples: [
      { key: 'ni-hao', hanzi: '你好', written: 'nǐ hǎo', spoken: 'ní hǎo', meaning: 'xin chào' },
      { hanzi: '很好', written: 'hěn hǎo', spoken: 'hén hǎo', meaning: 'rất tốt' },
      { hanzi: '可以', written: 'kě yǐ', spoken: 'ké yǐ', meaning: 'có thể' },
    ],
    note: 'Chỉ đổi khi ĐỌC, chữ pinyin viết vẫn giữ nguyên dấu gốc.',
  },
  {
    title: 'Ba thanh 3 liên tiếp',
    rule: 'Thường đọc 2 + 2 + 3, hoặc 3 + 2 + 3 tuỳ ngắt nhịp',
    formula: '3 + 3 + 3 → 2 + 2 + 3',
    examples: [
      { key: 'wo-hen-hao', hanzi: '我很好', written: 'wǒ hěn hǎo', spoken: 'wó hén hǎo', meaning: 'tôi rất khoẻ' },
      { hanzi: '展覽館', written: 'zhǎn lǎn guǎn', spoken: 'zhán lán guǎn', meaning: 'nhà triển lãm' },
    ],
  },
  {
    title: 'Biến điệu của 不 (bù)',
    rule: 'Đứng trước thanh 4 → đọc thành bú. Các trường hợp khác giữ nguyên bù.',
    formula: 'bù + thanh 4 → bú',
    examples: [
      { key: 'bu-qu', hanzi: '不去', written: 'bù qù', spoken: 'bú qù', meaning: 'không đi' },
      { key: 'bu-bian', hanzi: '不變', written: 'bù biàn', spoken: 'bú biàn', meaning: 'không đổi' },
      { key: 'bu-lun', hanzi: '不論', written: 'bù lùn', spoken: 'bú lùn', meaning: 'bất luận' },
      { hanzi: '不好', written: 'bù hǎo', spoken: 'bù hǎo', meaning: 'không tốt (giữ nguyên)' },
    ],
  },
  {
    title: 'Biến điệu của 一 (yī)',
    rule: 'Đứng một mình hoặc làm số thứ tự: yī. Trước thanh 4: yí. Trước thanh 1/2/3: yì.',
    formula: 'yī → yí (trước thanh 4) · yì (trước thanh 1,2,3)',
    examples: [
      { key: 'yi-ge', hanzi: '一個', written: 'yī gè', spoken: 'yí ge', meaning: 'một cái' },
      { key: 'yi-ding', hanzi: '一定', written: 'yī dìng', spoken: 'yí dìng', meaning: 'nhất định' },
      { key: 'yi-yang', hanzi: '一樣', written: 'yī yàng', spoken: 'yí yàng', meaning: 'giống nhau' },
      { key: 'yi-tian', hanzi: '一天', written: 'yī tiān', spoken: 'yì tiān', meaning: 'một ngày' },
      { key: 'yi-nian', hanzi: '一年', written: 'yī nián', spoken: 'yì nián', meaning: 'một năm' },
      { key: 'yi-miao', hanzi: '一秒', written: 'yī miǎo', spoken: 'yì miǎo', meaning: 'một giây' },
      { hanzi: '第一', written: 'dì yī', spoken: 'dì yī', meaning: 'thứ nhất (giữ nguyên)' },
    ],
  },
];

// Quy tắc đánh dấu thanh điệu
export const toneMarkRules = [
  {
    rule: 'Có <b>a</b> thì đánh dấu vào <b>a</b>',
    example: 'hǎo · xiǎng · guāng',
    samples: [{ hanzi: '好', pinyin: 'hǎo' }, { hanzi: '想', pinyin: 'xiǎng' }, { hanzi: '光', pinyin: 'guāng' }],
  },
  {
    rule: 'Không có a, có <b>o</b> hoặc <b>e</b> thì đánh vào o/e',
    example: 'zǒu · xiè · duō',
    samples: [{ hanzi: '走', pinyin: 'zǒu' }, { hanzi: '謝', pinyin: 'xiè' }, { hanzi: '多', pinyin: 'duō' }],
  },
  {
    rule: 'Chỉ có <b>i</b>, <b>u</b>, <b>ü</b> thì đánh vào chữ ĐỨNG SAU',
    example: 'liù (vào u) · duì (vào i)',
    samples: [{ hanzi: '六', pinyin: 'liù' }, { hanzi: '對', pinyin: 'duì' }, { hanzi: '牛', pinyin: 'niú' }],
  },
  {
    rule: 'Đánh dấu lên <b>i</b> thì bỏ dấu chấm',
    example: 'ī · í · ǐ · ì',
    samples: [{ hanzi: '衣', pinyin: 'yī' }, { hanzi: '姨', pinyin: 'yí' }, { hanzi: '椅', pinyin: 'yǐ' }, { hanzi: '意', pinyin: 'yì' }],
  },
  {
    rule: 'Thanh nhẹ KHÔNG đánh dấu',
    example: 'māma · bàba · xièxie',
    samples: [{ hanzi: '媽媽', pinyin: 'māma' }, { hanzi: '爸爸', pinyin: 'bàba' }, { hanzi: '謝謝', pinyin: 'xièxie' }],
  },
];

// ------------------------------------------------------------
// 4. NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM
// type: 'listen' = nghe rồi chọn | 'know' = câu hỏi kiến thức
// ------------------------------------------------------------
export const pronQuiz = {
  initials: [
    // --- Nghe (listen) — dùng audio thật từ pinyinChartAudio ---
    { type: 'listen', speak: 'ba', audio: 'ba', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['b', 'p', 'm', 'f'], answer: 0, explain: 'ba — âm b không bật hơi.' },
    { type: 'listen', speak: 'pa', audio: 'pa', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['b', 'p', 'd', 't'], answer: 1, explain: 'pa — âm p bật hơi mạnh.' },
    { type: 'listen', speak: 'ma', audio: 'ma', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['m', 'n', 'l', 'r'], answer: 0, explain: 'ma — âm m, môi chạm nhau.' },
    { type: 'listen', speak: 'fa', audio: 'fa', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['f', 'h', 'p', 's'], answer: 0, explain: 'fa — âm f, răng cắn môi dưới.' },
    { type: 'listen', speak: 'de', audio: 'de', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['d', 't', 'n', 'l'], answer: 0, explain: 'de — âm d không bật hơi.' },
    { type: 'listen', speak: 'te', audio: 'te', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['d', 't', 'n', 'l'], answer: 1, explain: 'te — âm t bật hơi.' },
    { type: 'listen', speak: 'ge', audio: 'ge', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['g', 'k', 'h', 'j'], answer: 0, explain: 'ge — âm g, gốc lưỡi, không bật hơi.' },
    { type: 'listen', speak: 'ke', audio: 'ke', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['g', 'k', 'h', 'q'], answer: 1, explain: 'ke — âm k, gốc lưỡi + bật hơi.' },
    { type: 'listen', speak: 'zhi', audio: 'zhi', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['z', 'j', 'zh', 'ch'], answer: 2, explain: 'zhi — âm zh uốn lưỡi, không bật hơi.' },
    { type: 'listen', speak: 'chi', audio: 'chi', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['zh', 'ch', 'sh', 'c'], answer: 1, explain: 'chi — âm ch uốn lưỡi + bật hơi.' },
    { type: 'listen', speak: 'shi', audio: 'shi', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['sh', 's', 'x', 'zh'], answer: 0, explain: 'shi — âm sh uốn lưỡi, xát.' },
    { type: 'listen', speak: 'ji', audio: 'ji', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['j', 'zh', 'z', 'q'], answer: 0, explain: 'ji — âm j, mặt lưỡi, không bật hơi.' },
    { type: 'listen', speak: 'xi', audio: 'xi', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['s', 'sh', 'x', 'c'], answer: 2, explain: 'xi — âm x, mặt lưỡi xát.' },
    { type: 'listen', speak: 'ri', audio: 'ri', question: 'Bạn nghe thấy thanh mẫu nào?', options: ['r', 'l', 'n', 'sh'], answer: 0, explain: 'ri — âm r, uốn lưỡi, hữu thanh.' },
    // --- Kiến thức (know) ---
    { type: 'know', question: 'Nhóm thanh mẫu nào CHỈ ghép được với vận mẫu i và ü?', options: ['b, p, m, f', 'j, q, x', 'zh, ch, sh, r', 'z, c, s'], answer: 1, explain: 'j, q, x là âm mặt lưỡi, chỉ đi với i và ü.' },
    { type: 'know', question: 'Cặp nào KHÁC nhau ở chỗ bật hơi / không bật hơi?', options: ['n và l', 'g và k', 'zh và z', 'x và sh'], answer: 1, explain: 'g không bật hơi, k bật hơi. n/l khác vị trí hơi thoát.' },
    { type: 'know', question: 'Thanh mẫu nào phải UỐN lưỡi?', options: ['z, c, s', 'j, q, x', 'zh, ch, sh, r', 'd, t, n, l'], answer: 2, explain: 'zh, ch, sh, r là nhóm âm quặt lưỡi.' },
    { type: 'know', question: 'Âm "f" và "h" khác nhau thế nào?', options: ['f là môi-răng, h là gốc lưỡi', 'f bật hơi, h không bật hơi', 'f uốn lưỡi, h không uốn', 'Không khác'], answer: 0, explain: 'f: răng trên cắn nhẹ môi dưới. h: hơi thoát ra từ khe gốc lưỡi.' },
    { type: 'know', question: 'Âm "n" và "l" khác nhau thế nào?', options: ['n là mũi, l là bên lưỡi', 'n bật hơi, l không', 'n uốn lưỡi, l không', 'Giống nhau'], answer: 0, explain: 'n: hơi thoát qua mũi. l: hơi thoát hai bên lưỡi.' },
    { type: 'know', question: 'Thanh mẫu nào là hữu thanh (dây thanh rung)?', options: ['b', 'r', 'p', 'k'], answer: 1, explain: 'Trong tiếng Trung, chỉ có r là phụ âm hữu thanh (dây thanh rung khi phát âm).' },
  ],
  finals: [
    // --- Nghe (listen) — dùng audio thật từ pronAudioMap finals ---
    { type: 'listen', speak: 'ai', audioKey: 'finals/ai', question: 'Bạn nghe thấy vận mẫu nào?', options: ['ai', 'ei', 'ao', 'ou'], answer: 0, explain: 'ai — miệng mở rộng rồi khép lại.' },
    { type: 'listen', speak: 'ei', audioKey: 'finals/ei', question: 'Bạn nghe thấy vận mẫu nào?', options: ['ai', 'ei', 'ao', 'ou'], answer: 1, explain: 'ei — bắt đầu từ ê rồi khép thành i.' },
    { type: 'listen', speak: 'ao', audioKey: 'finals/ao', question: 'Bạn nghe thấy vận mẫu nào?', options: ['ai', 'ei', 'ao', 'ou'], answer: 2, explain: 'ao — miệng mở rồi tròn lại thành o.' },
    { type: 'listen', speak: 'ou', audioKey: 'finals/ou', question: 'Bạn nghe thấy vận mẫu nào?', options: ['ai', 'ei', 'ao', 'ou'], answer: 3, explain: 'ou — bắt đầu từ o rồi khép thành u.' },
    { type: 'listen', speak: 'an', audioKey: 'finals/an', question: 'Bạn nghe thấy vận mẫu nào?', options: ['an', 'ang', 'en', 'eng'], answer: 0, explain: 'an — đầu lưỡi chạm nướu răng khi kết thúc.' },
    { type: 'listen', speak: 'ang', audioKey: 'finals/ang', question: 'Bạn nghe thấy vận mẫu nào?', options: ['an', 'ang', 'en', 'eng'], answer: 1, explain: 'ang — gốc lưỡi nâng lên, hơi thoát qua mũi (âm mũi sau).' },
    { type: 'listen', speak: 'en', audioKey: 'finals/en', question: 'Bạn nghe thấy vận mẫu nào?', options: ['an', 'ang', 'en', 'eng'], answer: 2, explain: 'en — bắt đầu từ ê, kết thúc đầu lưỡi chạm nướu.' },
    { type: 'listen', speak: 'eng', audioKey: 'finals/eng', question: 'Bạn nghe thấy vận mẫu nào?', options: ['an', 'ang', 'en', 'eng'], answer: 3, explain: 'eng — bắt đầu từ ê, kết thúc bằng âm mũi sau ng.' },
    { type: 'listen', speak: 'ong', audioKey: 'finals/ong', question: 'Bạn nghe thấy vận mẫu nào?', options: ['ong', 'eng', 'ang', 'un'], answer: 0, explain: 'ong — miệng tròn, âm mũi sau.' },
    { type: 'listen', speak: 'ian', audioKey: 'finals/ian', question: 'Bạn nghe thấy vận mẫu nào?', options: ['ian', 'iang', 'ie', 'in'], answer: 0, explain: 'ian — i + an.' },
    { type: 'listen', speak: 'iao', audioKey: 'finals/iao', question: 'Bạn nghe thấy vận mẫu nào?', options: ['iao', 'iu', 'ie', 'ia'], answer: 0, explain: 'iao — i + ao.' },
    { type: 'listen', speak: 'er', audioKey: 'finals/er', question: 'Bạn nghe thấy vận mẫu nào?', options: ['er', 'e', 'en', 'ei'], answer: 0, explain: 'er — lưỡi cuộn lên, đặc trưng của vận mẫu er.' },
    { type: 'listen', speak: 'üe', audioKey: 'finals/üe', question: 'Bạn nghe thấy vận mẫu nào?', options: ['ie', 'üe', 'uo', 'ei'], answer: 1, explain: 'üe — bắt đầu từ ü, miệng tròn nhỏ.' },
    // --- Kiến thức (know) ---
    { type: 'know', question: 'Vận mẫu <b>iu</b> thực chất là viết tắt của?', options: ['iou', 'iu', 'iao', 'ui'], answer: 0, explain: 'iu = iou, khi đọc vẫn phải có âm o mờ ở giữa.' },
    { type: 'know', question: 'Vận mẫu <b>ui</b> thực chất là viết tắt của?', options: ['uai', 'uei', 'uo', 'uen'], answer: 1, explain: 'ui = uei, khi đọc vẫn phải có âm ê ở giữa.' },
    { type: 'know', question: 'Sau j, q, x thì <b>ü</b> được viết thế nào?', options: ['Giữ nguyên ü', 'Bỏ hai chấm, viết u', 'Đổi thành yu', 'Đổi thành v'], answer: 1, explain: 'ju, qu, xu — bỏ hai chấm nhưng vẫn đọc là ü.' },
    { type: 'know', question: 'Vận mẫu nào KHÔNG bao giờ ghép với thanh mẫu?', options: ['ong', 'er', 'ing', 'uo'], answer: 1, explain: 'er luôn đứng một mình thành âm tiết riêng.' },
    { type: 'know', question: '"an" và "ang" khác nhau ở chỗ nào?', options: ['an: âm mũi trước (n), ang: âm mũi sau (ng)', 'an ngắn, ang dài', 'an thanh 1, ang thanh 2', 'Giống nhau'], answer: 0, explain: 'an kết thúc bằng đầu lưỡi chạm nướu (n), ang kết thúc bằng gốc lưỡi nâng (ng).' },
    { type: 'know', question: 'Khi đứng một mình (không có thanh mẫu), "ü" viết thành?', options: ['u', 'yu', 'vu', 'ü'], answer: 1, explain: 'ü đứng một mình viết thành yu, thêm y ở trước và bỏ hai chấm.' },
    { type: 'know', question: 'Vận mẫu <b>un</b> thực chất đọc là gì?', options: ['un', 'uen', 'ün', 'uən'], answer: 1, explain: 'un = uen, khi đọc phải có âm ê nhẹ ở giữa.' },
  ],
  tones: [
    // --- Nghe (listen) — dùng TTS với từ đơn rõ ràng, dễ phân biệt ---
    { type: 'listen', speak: '天', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 0, explain: '天 tiān — thanh 1, cao và đều (như kéo dài một nốt nhạc).' },
    { type: 'listen', speak: '書', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 0, explain: '書 shū — thanh 1, cao đều.' },
    { type: 'listen', speak: '人', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 1, explain: '人 rén — thanh 2, đi lên (như hỏi "Hả?").' },
    { type: 'listen', speak: '茶', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 1, explain: '茶 chá — thanh 2, đi lên.' },
    { type: 'listen', speak: '水', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 2, explain: '水 shuǐ — thanh 3, xuống rồi lên (như ngạc nhiên "Ủa?").' },
    { type: 'listen', speak: '馬', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 2, explain: '馬 mǎ — thanh 3, xuống rồi lên.' },
    { type: 'listen', speak: '大', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 3, explain: '大 dà — thanh 4, rơi nhanh từ cao xuống thấp.' },
    { type: 'listen', speak: '四', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 3, explain: '四 sì — thanh 4, rơi mạnh.' },
    { type: 'listen', speak: '花', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 0, explain: '花 huā — thanh 1, cao đều.' },
    { type: 'listen', speak: '學', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 1, explain: '學 xué — thanh 2, đi lên.' },
    { type: 'listen', speak: '你', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 2, explain: '你 nǐ — thanh 3, xuống rồi lên.' },
    { type: 'listen', speak: '去', question: 'Chữ này mang thanh mấy?', options: ['Thanh 1', 'Thanh 2', 'Thanh 3', 'Thanh 4'], answer: 3, explain: '去 qù — thanh 4, rơi nhanh.' },
    // --- Kiến thức (know) ---
    { type: 'know', question: '你好 khi ĐỌC sẽ thành gì?', options: ['nǐ hǎo', 'ní hǎo', 'nì hǎo', 'nī hǎo'], answer: 1, explain: 'Hai thanh 3 liền nhau → chữ đầu đọc thành thanh 2.' },
    { type: 'know', question: '不 đứng trước thanh 4 thì đọc là?', options: ['bù', 'bú', 'bǔ', 'bū'], answer: 1, explain: 'bù + thanh 4 → bú. Ví dụ 不是 bú shì.' },
    { type: 'know', question: 'Trong <b>liù</b>, dấu thanh đánh vào chữ nào và vì sao?', options: ['Vào i, vì i đứng trước', 'Vào u, vì chỉ có i/u thì đánh vào chữ sau', 'Vào l', 'Đánh vào cả hai'], answer: 1, explain: 'Khi chỉ có i, u, ü thì dấu rơi vào nguyên âm ĐỨNG SAU.' },
    { type: 'know', question: 'Thanh nào KHÔNG có dấu?', options: ['Thanh 1', 'Thanh 2', 'Thanh nhẹ', 'Thanh 3'], answer: 2, explain: 'Thanh nhẹ (輕聲) đọc ngắn, nhẹ và không đánh dấu.' },
    { type: 'know', question: '一 (yī) đứng trước thanh 4 đọc thành gì?', options: ['yī', 'yí', 'yǐ', 'yì'], answer: 1, explain: '一 + thanh 4 → yí. Ví dụ 一個 yí gè.' },
    { type: 'know', question: '一 (yī) đứng trước thanh 1/2/3 đọc thành gì?', options: ['yī', 'yí', 'yǐ', 'yì'], answer: 3, explain: '一 + thanh 1/2/3 → yì. Ví dụ 一天 yì tiān.' },
    { type: 'know', question: 'Dấu thanh đánh vào nguyên âm nào trước?', options: ['Luôn đánh vào a hoặc e', 'Luôn đánh vào chữ đầu', 'Luôn đánh vào chữ cuối', 'Đánh vào u'], answer: 0, explain: 'Nếu có a hoặc e thì dấu đánh vào đó. Nếu chỉ còn i/u/ü thì đánh vào chữ sau.' },
    { type: 'know', question: 'Thanh 3 đứng trước thanh 1, 2, 4 sẽ đọc thế nào?', options: ['Giữ nguyên đầy đủ', 'Chỉ đọc nửa đầu (xuống thôi, không lên)', 'Đọc thành thanh 2', 'Bỏ hẳn'], answer: 1, explain: 'Thanh 3 trước 1/2/4 chỉ đọc "nửa thanh 3" — xuống thấp rồi dừng, không lên.' },
  ],
};
