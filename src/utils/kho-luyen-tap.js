// =============================================================
// NGUỒN DỮ LIỆU cho khu LUYỆN TẬP — 2026-09-16
// =============================================================
// Bốn trang Flashcard · Trắc nghiệm · Hội thoại · Luyện nói vẫn đang chạy trên `mockData.js`:
// 40 từ, 3 bài hội thoại 18 câu, 5 chủ đề shadowing KHÔNG có câu nào. Trong khi cùng repo đã có
// 10.562 từ giáo trình + 7.517 từ TOCFL + 5.456 từ HSK và **324 bài hội thoại kèm bản thu gốc
// của sách** (11.405 câu). Bốn trang này vì thế trông như bản demo trong một hệ thống đầy dữ liệu.
//
// Module này gom mọi nguồn về một chỗ, trả CÙNG MỘT dạng để bốn trang dùng chung:
//   từ vựng     { hanzi, simplified, pinyin, def, pos, audio, audioTts, ex }
//   hội thoại   { id, ten, bo, audio, cues: [{ text, pinyin, vi, start, end }] }
//
// QUYỀN TRUY CẬP — phải phân biệt rạch ròi, đây là chỗ dễ làm hỏng tường trả phí nhất:
//   · TOCFL + HSK: bảng từ công khai của SC-TOP / Hanban, phục vụ qua /api/noi-dung/* (4.35, 4.46).
//     Khách chưa đăng nhập dùng được.
//   · Sổ tay: dữ liệu của chính học viên.
//   · GIÁO TRÌNH (từ vựng lẫn hội thoại): NỘI DUNG TRẢ PHÍ. Chỉ nạp qua `napBai()` — hàm đó tự
//     đi qua gate và ghi vào `daKhoa` khi bị chặn, KHÔNG được tự fetch thẳng file tĩnh.
import api from '../api/client.js';
import {
  napBai, baiBiKhoa,
  duongdaiVocab, thoidaiVocab, hskVocab,
  duongdaiDialogues, thoidaiDialogues, hskDialogues,
} from '../data/giaotrinh-kho.js';

// Kho export từng object rời (giữ NGUYÊN THAM CHIẾU để `napQuyen`/`napBai` chỉ Object.assign thêm
// vào — xem 4.30). Gom lại ở đây để tra theo tên bộ.
const KHO_TU = { duongdai: duongdaiVocab, thoidai: thoidaiVocab, hsk: hskVocab };
const KHO_HT = { duongdai: duongdaiDialogues, thoidai: thoidaiDialogues, hsk: hskDialogues };
import {
  duongdaiBooks, thoidaiBooks, hskBooks,
  duongdaiSubLessons, thoidaiSubLessons, hskSubLessons,
} from '../data/giaotrinh-index.js';

// ------------------------------------------------------------------ bộ nhớ đệm

const _cache = new Map();
const nho = async (khoa, lam) => {
  if (_cache.has(khoa)) return _cache.get(khoa);
  const v = await lam();
  _cache.set(khoa, v);
  return v;
};
/** Xoá đệm khi đăng nhập/đăng xuất hoặc vừa mua khoá — quyền đổi thì dữ liệu nạp được cũng đổi. */
export function quenKhoLuyenTap() { _cache.clear(); }

// ------------------------------------------------------------------ danh mục nguồn

/**
 * Danh mục nguồn cho Flashcard / Trắc nghiệm.
 * `mo: true` = khách chưa đăng nhập cũng dùng được.
 */
export function nguonTuVung() {
  const ds = [
    { id: 'so-tay', nhom: 'Của tôi', ten: 'Sổ tay của tôi', mo: true, icon: 'fa-bookmark' },
    { id: 'can-on', nhom: 'Của tôi', ten: 'Từ đến hạn ôn', mo: false, icon: 'fa-rotate' },
  ];
  for (const c of ['L0', 'L1', 'L2', 'L3', 'L4', 'L5']) {
    ds.push({ id: `tocfl:${c}`, nhom: 'TOCFL', ten: `TOCFL ${c.slice(1)}`, mo: true, icon: 'fa-layer-group' });
  }
  for (let i = 1; i <= 6; i++) {
    ds.push({ id: `hsk:${i}`, nhom: 'HSK 3.0', ten: `HSK ${i}`, mo: true, icon: 'fa-layer-group' });
  }
  for (const [bo, sach, ten] of [['duongdai', duongdaiBooks, 'Đương đại'],
                                 ['thoidai', thoidaiBooks, 'Thời Đại'],
                                 ['hsk', hskBooks, 'HSK']]) {
    for (const q of sach) {
      ds.push({
        id: `gt:${bo}:${q.id}`, nhom: `Giáo trình ${ten}`,
        ten: q.label || q.title || `Quyển ${q.id}`, mo: false, icon: 'fa-book',
      });
    }
  }
  return ds;
}

/** Nhãn đọc được của một nguồn, để hiện trên thanh công cụ. */
export function tenNguon(id) {
  return nguonTuVung().find((n) => n.id === id)?.ten || 'Từ vựng';
}

// ------------------------------------------------------------------ nạp từ vựng

/** Chuẩn hoá một mục từ về cùng một dạng, dù đến từ nguồn nào. */
const chuanTu = (w, i, tien) => {
  const def = w.def || w.nghia || w.meaning || '';
  const ex = Array.isArray(w.ex) ? w.ex : [];
  return {
    id: w.id || `${tien}-${i}`,
    hanzi: w.hanzi || w.tu || w.traditional || '',
    simplified: w.simplified || w.gian || '',
    pinyin: w.pinyin || '',
    def,
    pos: w.pos || w.tuLoai || '',
    audio: w.audio || null,
    audioTts: w.audioTts || null,
    ex,
    // Tên cũ, giữ để phần mã viết trước 2026-09-16 (generateQuizOptions, trắc nghiệm, sổ tay…)
    // chạy nguyên mà không phải sửa đồng loạt — đổi tên trường ở hàng chục chỗ chỉ để cho đẹp
    // là rủi ro không đáng, nhất là khi mỗi chỗ sót lại hỏng im lặng.
    meaning: def,
    example: ex[0]?.h || '',
    exMeaning: ex[0]?.t || '',
    lesson: w.lesson || '',
  };
};

/**
 * Nạp danh sách từ của một nguồn.
 * @returns {Promise<{tu: Array, khoa?: boolean, loi?: string}>}
 *   `khoa: true` = nội dung trả phí mà người dùng chưa có quyền (giao diện mời mua, KHÔNG báo lỗi).
 */
export async function napTuVung(nguonId, { soTay = [] } = {}) {
  if (!nguonId) return { tu: [] };

  // --- của tôi ---
  if (nguonId === 'so-tay') {
    return { tu: (soTay || []).map((w, i) => chuanTu(w, i, 'st')) };
  }
  if (nguonId === 'can-on') {
    try {
      const d = await api.get('/srs/hom-nay?limit=100');
      return { tu: (d.the || []).map((w, i) => chuanTu({ ...w, hanzi: w.tu || w.hanzi }, i, 'on')) };
    } catch (e) {
      return { tu: [], loi: e?.status === 401 ? 'Đăng nhập để ôn từ theo lịch.' : 'Không tải được danh sách ôn.' };
    }
  }

  // --- TOCFL: file tĩnh công khai ---
  if (nguonId.startsWith('tocfl:')) {
    const cap = nguonId.slice(6);
    return nho(nguonId, async () => {
      try {
        // Route thật là /noi-dung/tocfl/:cap (có rate-limit, xem 4.48) — file tĩnh cap-*.json
        // đã bị gate loại khỏi dist nên KHÔNG fetch thẳng được.
        const d = await api.get(`/noi-dung/tocfl/${cap}`);
        return { tu: (d.tu || []).map((w, i) => chuanTu(w, i, cap)) };
      } catch (e) {
        return { tu: [], loi: 'Không tải được từ vựng TOCFL.' };
      }
    });
  }

  // --- HSK: route công khai trả cả cấp trong MỘT request (4.46) ---
  if (nguonId.startsWith('hsk:')) {
    const cap = nguonId.slice(4);
    return nho(nguonId, async () => {
      try {
        const d = await api.get(`/noi-dung/tu-vung-hsk/${cap}`);
        return { tu: (d.tu || d.v || []).map((w, i) => chuanTu(w, i, `hsk${cap}`)) };
      } catch (e) {
        return { tu: [], loi: 'Không tải được từ vựng HSK.' };
      }
    });
  }

  // --- giáo trình: NỘI DUNG TRẢ PHÍ, luôn đi qua napBai() ---
  if (nguonId.startsWith('gt:')) {
    const [, bo, quyen] = nguonId.split(':');
    return nho(nguonId, async () => {
      const subs = { duongdai: duongdaiSubLessons, thoidai: thoidaiSubLessons, hsk: hskSubLessons }[bo] || [];
      const cha = [...new Set(subs.map((s) => s.id.split('.')[0]))]
        .filter((k) => _thuocQuyen(bo, k, quyen));
      const tu = [];
      let khoa = false;
      for (const key of cha) {
        await napBai(bo, key);
        // `daKhoa` khoá theo CHÍNH `key` của bài, không có tiền tố bộ (xem giaotrinh-kho.js).
        if (baiBiKhoa(key)) { khoa = true; continue; }
        for (const w of (KHO_TU[bo]?.[key] || [])) tu.push(chuanTu(w, tu.length, `${bo}${key}`));
      }
      // Khoá MỘT PHẦN vẫn trả những bài mở được: khách xem thử 3 bài đầu quyển là đúng chính sách
      // 4.41, chặn sạch thì họ không thấy gì để muốn mua.
      return { tu, khoa: khoa && !tu.length };
    });
  }

  return { tu: [] };
}

/** Bài cha `key` có thuộc quyển/cấp `quyen` của bộ `bo` không. Suy từ id, mỗi bộ đánh số một kiểu. */
function _thuocQuyen(bo, key, quyen) {
  const q = String(quyen);
  if (bo === 'hsk') return new RegExp(`^hsk${q}-`).test(key);
  if (bo === 'thoidai') return new RegExp(`^td${q}-`).test(key);
  const m = /^(\d+)-/.exec(key);              // Đương đại: '5' = quyển 1, '2-5' = quyển 2
  return (m ? m[1] : '1') === q;
}

// ------------------------------------------------------------------ hội thoại

/** Danh mục hội thoại: mọi bài con của 3 bộ, kèm quyển để nhóm lại trên giao diện. */
export function nguonHoiThoai() {
  const ra = [];
  for (const [bo, subs, ten] of [['duongdai', duongdaiSubLessons, 'Đương đại'],
                                 ['thoidai', thoidaiSubLessons, 'Thời Đại'],
                                 ['hsk', hskSubLessons, 'HSK']]) {
    for (const s of subs) {
      const key = s.id.split('.')[0];
      ra.push({ id: `${bo}:${s.id}`, bo, boTen: ten, key, sub: s.id, ten: s.label || s.id });
    }
  }
  return ra;
}

/**
 * Nạp một bài hội thoại. Trả `khoa: true` khi bài thuộc nội dung trả phí chưa mua — giao diện
 * mời mua thay vì báo lỗi kỹ thuật.
 */
export async function napHoiThoai(bo, subId) {
  const key = String(subId).split('.')[0];
  return nho(`ht:${bo}:${subId}`, async () => {
    await napBai(bo, key);
    if (baiBiKhoa(key)) return { khoa: true };
    const d = KHO_HT[bo]?.[subId];
    if (!d) return { trong: true };
    const cues = (d.cues || d.lines || []).map((c) => ({
      text: c.text || c.hanzi || '',
      pinyin: c.pinyin || '',
      vi: c.vi || '',
      start: c.start ?? null,
      end: c.end ?? null,
    })).filter((c) => c.text);
    // Bài "có dịch" = quá nửa số câu có bản dịch. Dưới ngưỡng đó thì giao diện chuyển sang dạng
    // danh sách câu thay vì giả vờ dựng hội thoại hai người (xem renderDialogue).
    const coDich = cues.length > 0 && cues.filter((c) => c.vi).length / cues.length > 0.5;
  // Dựng bong bóng chat hai phía CHỈ khi bản dịch có ghi tên người nói ("Minh Hoa: …"). Có dịch
  // mà không có tên thì vẫn không biết ai nói câu nào — dựng ra một cuộc đối đáp không có trong
  // dữ liệu là bịa; khi đó hiện danh sách câu đánh số, đúng với thứ đang có.
  const coTen = cues.filter((c) => /^[^:：]{1,14}[:：]/.test(c.vi || '')).length / Math.max(1, cues.length) > 0.5;
    return { ten: d.title || subId, audio: d.audio || null, cues, coDich, coTen };
  });
}
