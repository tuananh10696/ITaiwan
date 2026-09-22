// ============================================================
// SỬA TAY bảng audio phát âm — file NÀY sửa được, khác `pronAudioMap.js`
// (`pronAudioMap.js` do script `npm run audio:pron` tự sinh, chạy lại là mất
//  hết chỉnh sửa; nên mọi correction nghe-bằng-tai để ở đây cho an toàn).
//
// Cách hoạt động: `pronSrc(nhóm, âm)` tra file này TRƯỚC, không thấy mới
// tra `pronAudioMap.js`.
//   giá trị là chuỗi  ->  dùng đúng file đó
//   giá trị là null   ->  coi như KHÔNG có file, app tự đọc bằng TTS
// ============================================================

export const pronAudioOverride = {
  // --- Vận mẫu -------------------------------------------------
  // Nghe thực tế: hai file u.mp3 và u1.mp3 bị gán ngược nhau.
  'finals/u': '/audio/pron/u1.mp3',
  'finals/ü': '/audio/pron/u.mp3',

  // Nguồn ghi âm đặt tên theo DẠNG ĐẦY ĐỦ của vần:
  //   un (viết tắt của uen) -> file uen.mp3
  //   ün                    -> file un.mp3
  'finals/un': '/audio/pron/uen.mp3',
  'finals/ün': '/audio/pron/un.mp3',

  // --- Thanh mẫu -----------------------------------------------
  // Tên thanh mẫu phải đọc là "bo / mo / fo".
  // File 巴.mp3 đang gán cho b là chữ "ba" -> sai, bỏ đi để TTS đọc 波 (bō).
  // m và f chưa có file đúng -> TTS đọc 摸 (mō) và 佛 (fó).
  'initials/b': null,
  'initials/m': null,
  'initials/f': null,
};
