// =============================================================
// CHẤM ĐỀ TỰ SOẠN — dùng chung cho route học sinh và route giáo viên (2026-09-17)
// =============================================================
// ⚠️ CHẤM Ở SERVER, KHÔNG Ở CLIENT. Mọi bài tập khác trong dự án đều chấm ở trình duyệt rồi gửi
//    điểm lên (giáo trình, game, HSK) — chấp nhận được vì là bài tự luyện. Đây là bài kiểm tra
//    có điểm thật của giáo viên: chấm ở client thì học viên sửa request là 100%.
//
// Vì vậy `de_cau_hoi.dap_an` không bao giờ rời khỏi server trước khi học sinh nộp bài.

/** Năm dạng câu hỏi. `tu-luan` không chấm tự động được — giáo viên cho điểm tay. */
export const DANG_CAU = ['mot-dap-an', 'nhieu-dap-an', 'dung-sai', 'dien-tu', 'tu-luan'];

/** Dạng nào máy chấm được. */
export const chamTuDong = (loai) => loai !== 'tu-luan';

/**
 * Chuẩn hoá câu trả lời dạng ĐIỀN TỪ trước khi so.
 * Bỏ khoảng trắng thừa, bỏ dấu câu, đưa về chữ thường. Bắt đúng cả dấu chấm thì gần như câu nào
 * cũng sai — cùng cách `hskChuanCau()` đang làm cho đề HSK (4.34d).
 */
export function chuanHoa(s) {
  return String(s ?? '')
    .trim()
    .toLowerCase()
    .replace(/[。，、？！；：「」『』（）　.,?!;:()"'\[\]]/g, '')
    .replace(/\s+/g, ' ');
}

/** mysql2 trả cột JSON có khi là object, có khi là chuỗi tuỳ phiên bản driver — đỡ cả hai. */
function doc(v, macDinh) {
  if (v === null || v === undefined) return macDinh;
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { return macDinh; }
  }
  return v;
}

/**
 * Chấm MỘT câu.
 * @param {object} cau  bản ghi de_cau_hoi (phải có `loai`, `dap_an`, `diem`)
 * @param {*} traLoi    thứ học sinh gửi lên
 * @returns {{dung: boolean|null, diem: number}}  dung = null nghĩa là chưa chấm được (tự luận)
 */
export function chamCau(cau, traLoi) {
  const diemToiDa = Number(cau.diem) || 0;
  const dapAn = doc(cau.dap_an, null);

  if (cau.loai === 'tu-luan') return { dung: null, diem: 0 };

  // Không trả lời thì sai — nhưng phân biệt rõ với "trả lời sai" ở chỗ gọi nếu cần thống kê.
  if (traLoi === null || traLoi === undefined || traLoi === '') return { dung: false, diem: 0 };

  if (cau.loai === 'dien-tu') {
    // Nguồn cho phép nhiều phương án đúng: ["hôm nay", "bữa nay"].
    const ds = Array.isArray(dapAn) ? dapAn : [dapAn];
    const hs = chuanHoa(traLoi);
    const dung = ds.some((d) => chuanHoa(d) === hs && hs !== '');
    return { dung, diem: dung ? diemToiDa : 0 };
  }

  // Ba dạng còn lại đều là chỉ số lựa chọn.
  const dungIdx = (Array.isArray(dapAn) ? dapAn : [dapAn]).map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  const chonIdx = (Array.isArray(traLoi) ? traLoi : [traLoi]).map(Number).filter(Number.isFinite).sort((a, b) => a - b);

  if (cau.loai === 'nhieu-dap-an') {
    // Đúng HẾT mới tính điểm: chọn 1 trong 3 đáp án đúng rồi được 1/3 điểm thì học viên chỉ cần
    // tick hết mọi ô là luôn có điểm. Không chấm điểm từng phần.
    const dung = dungIdx.length > 0
      && dungIdx.length === chonIdx.length
      && dungIdx.every((v, i) => v === chonIdx[i]);
    return { dung, diem: dung ? diemToiDa : 0 };
  }

  const dung = dungIdx.length === 1 && chonIdx.length === 1 && dungIdx[0] === chonIdx[0];
  return { dung, diem: dung ? diemToiDa : 0 };
}

/**
 * Chấm cả bài.
 * @param {Array} cauHoi  danh sách de_cau_hoi (đầy đủ, có dap_an)
 * @param {object} baiLam { "<cau_hoi_id>": traLoi }
 */
export function chamBai(cauHoi, baiLam) {
  const bl = baiLam && typeof baiLam === 'object' ? baiLam : {};
  const chiTiet = {};
  let diem = 0;
  let tongDiem = 0;
  let soCauDung = 0;
  let soCauChamDuoc = 0;
  let coTuLuan = false;

  for (const c of cauHoi) {
    const traLoi = bl[c.id] ?? bl[String(c.id)] ?? null;
    const kq = chamCau(c, traLoi);
    // Tổng điểm tính TRÊN MỌI CÂU kể cả tự luận: học sinh phải thấy được thang điểm thật của đề,
    // không phải thang đã trừ đi phần chưa chấm.
    tongDiem += Number(c.diem) || 0;
    if (kq.dung === null) {
      coTuLuan = true;
    } else {
      soCauChamDuoc += 1;
      if (kq.dung) soCauDung += 1;
      diem += kq.diem;
    }
    chiTiet[c.id] = { tra_loi: traLoi, dung: kq.dung, diem: kq.diem };
  }

  return {
    chi_tiet: chiTiet,
    diem: Math.round(diem * 100) / 100,
    tong_diem: Math.round(tongDiem * 100) / 100,
    so_cau_dung: soCauDung,
    so_cau_cham_duoc: soCauChamDuoc,
    tong_cau: cauHoi.length,
    co_tu_luan: coTuLuan,
  };
}

/**
 * Bỏ đáp án khỏi câu hỏi trước khi gửi xuống cho học sinh ĐANG LÀM BÀI.
 * Hàm này là lưới an toàn cuối: dù nơi gọi có lỡ `SELECT *` thì đáp án vẫn không lọt ra.
 */
export function anDapAn(cau) {
  const { dap_an, giai_thich, ...conLai } = cau;
  return conLai;
}

/** Trộn mảng tại chỗ trên BẢN SAO (Fisher-Yates). Dùng cho tuỳ chọn xáo câu / xáo đáp án. */
export function tron(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Xáo thứ tự lựa chọn của một câu và trả kèm bảng quy chiếu về chỉ số GỐC.
 * ⚠️ Phải giữ `mapGoc` tới lúc nộp để quy chỉ số hiển thị về gốc trước khi chấm — quên bước này
 *    là chấm sai sạch cả bài mà không có lỗi nào hiện ra (đúng bài học 4.19).
 */
export function tronLuaChon(luaChon) {
  const idx = tron(luaChon.map((_, i) => i));
  return { luaChon: idx.map((i) => luaChon[i]), mapGoc: idx };
}
