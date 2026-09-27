// =============================================================
// KIỂM THỬ GỘP TÊN TRƯỜNG — server/utils/nhom-truong.js
// =============================================================
//   npm run test:truong      (thuần JS, KHÔNG cần server hay DB)
//
// Hai chiều đều phải giữ: cách viết khác nhau của CÙNG một trường phải về một nhóm, và hai
// trường KHÁC nhau không được gộp nhầm — gộp nhầm là học sinh trường này nằm lẫn trong danh sách
// trường kia mà không ai hay (xem ghi chú đầu file nhom-truong.js).
// =============================================================
import { khoaTruong, vietTatTrongNgoac, dungBoGop, nhomTheoTruong } from '../server/utils/nhom-truong.js';

let ok = 0;
const hong = [];
const dat = (moTa, dieuKien) => {
  if (dieuKien) { ok += 1; console.log(`  ✅ ${moTa}`); }
  else { hong.push(moTa); console.log(`  ❌ ${moTa}`); }
};

console.log('\n── 1. Khoá chuẩn hoá ────────────────────────────────────');
{
  const k = khoaTruong('Đại học Thành Công (NCKU)');
  for (const ten of ['đại học thành công', 'ĐH Thành Công', 'Trường Đại học Thành Công',
    '  Đại  học Thành Công. ', 'Dai hoc Thanh Cong', 'Đại học Thành Công（NCKU）']) {
    dat(`"${ten}" cùng khoá với "Đại học Thành Công (NCKU)"`, khoaTruong(ten) === k);
  }
  dat('台 và 臺 cùng khoá', khoaTruong('國立台灣大學') === khoaTruong('國立臺灣大學'));
  dat('"Đại học Đài Bắc" khác "Đại học Đài Nam"', khoaTruong('Đại học Đài Bắc') !== khoaTruong('Đại học Đài Nam'));
  // "dh" chỉ mở khi là MỘT TỪ riêng, không đụng vào giữa chữ khác.
  dat('"dh" giữa một từ không bị mở thành "đại học"', !khoaTruong('Adhoc Institute').includes('dai hoc'));
  for (const rong of ['', '   ', null, undefined, 'Chưa chọn', 'chưa có', '-', '?', 'N/A', 'không']) {
    dat(`"${rong}" không phải tên trường`, khoaTruong(rong) === '');
  }
  dat('"(NTU)" đứng một mình vẫn có khoá', khoaTruong('(NTU)') === 'ntu');
}

console.log('\n── 2. Viết tắt trong ngoặc ──────────────────────────────');
{
  dat('lấy được NCKU', JSON.stringify(vietTatTrongNgoac('Đại học Thành Công (NCKU)')) === '["ncku"]');
  dat('lấy được N.T.U -> ntu', JSON.stringify(vietTatTrongNgoac('ĐH Quốc lập Đài Loan (N.T.U)')) === '["ntu"]');
  dat('chữ thường trong ngoặc không phải viết tắt', vietTatTrongNgoac('Đại học Phụ Nhân (Tân Bắc)').length === 0);
  dat('hai viết tắt ngăn bằng "/"', vietTatTrongNgoac('Đại học Sư phạm (NTNU / SHIDA)').length === 2);
}

console.log('\n── 3. Gộp viết tắt đứng riêng ───────────────────────────');
{
  const gop = dungBoGop(['Đại học Thành Công (NCKU)', 'NCKU', 'ncku', 'Đại học Phụ Nhân']);
  dat('"NCKU" gộp vào Đại học Thành Công', gop('NCKU') === gop('Đại học Thành Công (NCKU)'));
  dat('"ncku" (chữ thường) cũng gộp', gop('ncku') === gop('Đại học Thành Công'));
  dat('trường không liên quan vẫn riêng', gop('Đại học Phụ Nhân') !== gop('NCKU'));
}
{
  // CCU: hai trường khác nhau cùng một viết tắt -> KHÔNG đoán.
  const gop = dungBoGop(['Đại học Trung Chính (CCU)', 'Đại học Văn Hoá Trung Quốc (CCU)', 'CCU']);
  dat('viết tắt thuộc HAI trường -> "CCU" đứng riêng', gop('CCU') === 'ccu');
  dat('hai tên đầy đủ chung viết tắt KHÔNG bị gộp với nhau',
    gop('Đại học Trung Chính (CCU)') !== gop('Đại học Văn Hoá Trung Quốc (CCU)'));
}
{
  // Tên đầy đủ khác ngôn ngữ, chung viết tắt: vẫn hai nhóm (cố ý dè dặt).
  const gop = dungBoGop(['國立成功大學 (NCKU)', 'Đại học Thành Công (NCKU)']);
  dat('hai tên đầy đủ khác ngôn ngữ không gộp qua viết tắt',
    gop('國立成功大學 (NCKU)') !== gop('Đại học Thành Công (NCKU)'));
}

{
  // CCU nằm trong danh sách mơ hồ: kể cả khi dữ liệu chỉ có MỘT trường ghi (CCU) cũng không gộp.
  const gop = dungBoGop(['Đại học Văn Hoá Trung Quốc (CCU)', 'CCU']);
  dat('"CCU" đứng riêng không gộp dù dữ liệu chỉ có một chủ', gop('CCU') === 'ccu');
}

console.log('\n── 3b. Phần trong ngoặc dùng để PHÂN BIỆT trường ────────');
{
  // Hai trường khác nhau cùng tên gốc, chỉ khác viết tắt trong ngoặc.
  const gop = dungBoGop(['Đại học Khoa học Kỹ thuật (NTUST)', 'Đại học Khoa học Kỹ thuật (NKUST)',
    'NKUST', 'Đại học Khoa học Kỹ thuật']);
  dat('NTUST và NKUST là hai nhóm', gop('Đại học Khoa học Kỹ thuật (NTUST)') !== gop('Đại học Khoa học Kỹ thuật (NKUST)'));
  dat('"NKUST" đứng riêng về đúng nhóm NKUST', gop('NKUST') === gop('Đại học Khoa học Kỹ thuật (NKUST)'));
  dat('tên trơn không ngoặc khi gốc mơ hồ -> nhóm riêng, không đoán',
    gop('Đại học Khoa học Kỹ thuật') !== gop('Đại học Khoa học Kỹ thuật (NTUST)')
    && gop('Đại học Khoa học Kỹ thuật') !== gop('Đại học Khoa học Kỹ thuật (NKUST)'));
}
{
  // Phân biệt bằng địa danh.
  const gop = dungBoGop(['Đại học Sư phạm (Đài Bắc)', 'Đại học Sư phạm (Cao Hùng)', 'Đại học Sư phạm (Chương Hoá)']);
  const k = new Set(['Đại học Sư phạm (Đài Bắc)', 'Đại học Sư phạm (Cao Hùng)', 'Đại học Sư phạm (Chương Hoá)'].map(gop));
  dat('Sư phạm Đài Bắc / Cao Hùng / Chương Hoá là ba nhóm', k.size === 3);
}
{
  // Định danh đi chung một ngoặc là của cùng một trường; ghi chú "(hệ 2+2)" không phải định danh.
  const gop = dungBoGop(['Đại học Sư phạm (NTNU / SHIDA)', 'Đại học Sư phạm (NTNU)', 'Đại học Sư phạm (SHIDA)',
    'Đại học Sư phạm', 'Đại học Sư phạm (hệ 2+2)']);
  const k = new Set(['Đại học Sư phạm (NTNU / SHIDA)', 'Đại học Sư phạm (NTNU)', 'Đại học Sư phạm (SHIDA)',
    'Đại học Sư phạm', 'Đại học Sư phạm (hệ 2+2)'].map(gop));
  dat('(NTNU / SHIDA), (NTNU), (SHIDA), tên trơn, (hệ 2+2) cùng một nhóm', k.size === 1);
}
{
  // Chỉ có MỘT định danh cho khoá gốc -> tên trơn và tên có ngoặc vẫn gộp như trước.
  const gop = dungBoGop(['Đại học Phụ Nhân (Tân Bắc)', 'Đại học Phụ Nhân']);
  dat('"Phụ Nhân (Tân Bắc)" và "Phụ Nhân" vẫn gộp', gop('Đại học Phụ Nhân (Tân Bắc)') === gop('Đại học Phụ Nhân'));
}

console.log('\n── 3c. Cách viết khác của cùng một trường ───────────────');
{
  dat('ngoặc vuông như ngoặc tròn', khoaTruong('Đại học Thành Công [NCKU]') === khoaTruong('Đại học Thành Công'));
  dat('ngoặc 【】 như ngoặc tròn', khoaTruong('國立成功大學【NCKU】') === khoaTruong('國立成功大學'));
  dat('"Đ.H" như "Đại học"', khoaTruong('Đ.H Thành Công') === khoaTruong('Đại học Thành Công'));
  dat('giản thể = phồn thể (成功大学 / 成功大學)', khoaTruong('成功大学') === khoaTruong('成功大學'));
  dat('giản thể = phồn thể (国立台湾师范大学)', khoaTruong('国立台湾师范大学') === khoaTruong('國立臺灣師範大學'));
}

console.log('\n── 3d. Câu "chưa có trường" ─────────────────────────────');
for (const cau of ['Chưa chọn trường', 'chưa có trường', 'Đang tìm hiểu', 'Chưa có kết quả', 'Đang cân nhắc',
  'Chờ kết quả', 'Chưa khai trường nào', 'Đại học', 'Hoa ngữ', 'Không có']) {
  dat(`"${cau}" không phải tên trường`, khoaTruong(cau) === '');
}
dat('"Đại học Đài Loan" VẪN là tên trường (tên thường gọi của NTU)', khoaTruong('Đại học Đài Loan') !== '');

console.log('\n── 4. Nhóm hồ sơ ────────────────────────────────────────');
const BUOC = ['ho-so', 'dong-tien', 'hoc', 'phong-van', 'visa', 'bay', 'hoan-thanh', 'tam-dung', 'huy'];
const HS = [
  { id: 1, ho_ten: 'An', buoc: 'visa', truong_nv1: 'Đại học Phụ Nhân', truong_nv2: 'Đại học Đài Bắc', truong_do: 'ĐH Phụ Nhân' },
  { id: 2, ho_ten: 'Bình', buoc: 'hoc', truong_nv1: 'đại học phụ nhân', truong_nv2: 'Đại học Phụ Nhân' },
  { id: 3, ho_ten: 'Chi', buoc: 'ho-so', truong_nv1: 'Đại học Đài Bắc', truong_do: 'Đại học Minh Truyền' },
  { id: 4, ho_ten: 'Dũng', buoc: 'dong-tien', truong_nv1: 'Chưa chọn' },
  { id: 5, ho_ten: 'Em', buoc: 'huy' },
];
{
  const { truong, chuaKhai } = nhomTheoTruong(HS, { thuTuBuoc: BUOC });
  const pn = truong.find((t) => t.khoa === khoaTruong('Đại học Phụ Nhân'));
  dat('Phụ Nhân gộp 3 cách viết thành một thẻ', pn && pn.bien_the.length === 3);
  dat('Phụ Nhân có 2 học sinh (Bình ghi 2 ô vẫn tính 1)', pn?.tong === 2);
  dat('Phụ Nhân: NV1 = 2, NV2 = 1, đậu = 1', pn?.nv1 === 2 && pn?.nv2 === 1 && pn?.dau === 1);
  const binh = pn?.hoc_sinh.find((h) => h.id === 2);
  dat('Bình mang cả hai vai NV1 + NV2', JSON.stringify(binh?.vai) === '["nv1","nv2"]');
  dat('học sinh trong thẻ xếp theo thứ tự bước (Bình "Học" trước An "Visa")',
    pn?.hoc_sinh.map((h) => h.id).join(',') === '2,1');
  dat('theo_buoc của Phụ Nhân đúng', pn?.theo_buoc.hoc === 1 && pn?.theo_buoc.visa === 1);

  const db = truong.find((t) => t.khoa === khoaTruong('Đại học Đài Bắc'));
  const an = db?.hoc_sinh.find((h) => h.id === 1);
  dat('An ở thẻ Đài Bắc được báo "đã đậu trường khác"', an?.dau_truong_khac === 'ĐH Phụ Nhân');
  dat('Chi (đậu trường ngoài nguyện vọng) có trong thẻ Minh Truyền với vai "Đậu"',
    truong.find((t) => t.khoa === khoaTruong('Đại học Minh Truyền'))?.hoc_sinh[0]?.vai.join() === 'do');

  dat('"Chưa chọn" không thành một trường', !truong.some((t) => t.khoa === khoaTruong('Chưa chọn') || t.ten === 'Chưa chọn'));
  dat('Dũng và Em nằm ở nhóm chưa khai trường', chuaKhai.map((h) => h.id).sort().join(',') === '4,5');
  dat('thẻ xếp theo số học sinh giảm dần', truong[0].tong >= truong[truong.length - 1].tong);
}
{
  const { truong, chuaKhai } = nhomTheoTruong(HS, { phamVi: '1', thuTuBuoc: BUOC });
  dat('phạm vi NV1: không có thẻ Minh Truyền (chỉ là trường đậu)',
    !truong.some((t) => t.khoa === khoaTruong('Đại học Minh Truyền')));
  dat('phạm vi NV1: Đài Bắc chỉ có Chi (An ghi Đài Bắc ở NV2)',
    truong.find((t) => t.khoa === khoaTruong('Đại học Đài Bắc'))?.hoc_sinh.map((h) => h.id).join() === '3');
  dat('phạm vi NV1: Chi vẫn được báo đã đậu trường khác',
    truong.find((t) => t.khoa === khoaTruong('Đại học Đài Bắc'))?.hoc_sinh[0]?.dau_truong_khac === 'Đại học Minh Truyền');
  dat('phạm vi NV1: Dũng + Em chưa khai NV1', chuaKhai.map((h) => h.id).sort().join(',') === '4,5');
}
{
  const { truong, chuaKhai } = nhomTheoTruong(HS, { phamVi: 'do', thuTuBuoc: BUOC });
  dat('phạm vi trường đậu: đúng 2 thẻ', truong.length === 2);
  dat('phạm vi trường đậu: 3 em chưa có trường đậu', chuaKhai.length === 3);
}
{
  // Trường đậu ghi "Chưa có kết quả" không được đếm là đã đậu.
  const { truong } = nhomTheoTruong([
    { id: 9, ho_ten: 'Giang', buoc: 'phong-van', truong_nv1: 'Đại học Phụ Nhân', truong_do: 'Chưa có kết quả' },
  ], { thuTuBuoc: BUOC });
  dat('truong_do "Chưa có kết quả" không thành thẻ, không tính là đậu',
    truong.length === 1 && truong[0].dau === 0 && truong[0].hoc_sinh[0].dau_truong_khac === null);
}
{
  const { truong } = nhomTheoTruong(HS, { phamVi: 'constructor', thuTuBuoc: BUOC });
  dat('phạm vi lạ ("constructor") rơi về "tất cả", không ném lỗi', truong.length > 0);
}

console.log(`\nGỘP TÊN TRƯỜNG: ${ok}/${ok + hong.length} đúng kỳ vọng`);
if (hong.length) {
  console.log('  ❌ chưa đạt:');
  for (const h of hong) console.log('     -', h);
}
process.exit(hong.length ? 1 : 0);
