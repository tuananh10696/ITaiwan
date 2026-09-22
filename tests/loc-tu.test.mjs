// Kiểm bộ lọc từ ngữ khu Cộng đồng — chạy: node tests/loc-tu.test.mjs
// Phần QUAN TRỌNG NHẤT là nhóm "không được chặn oan": bỏ dấu để bắt lách chữ làm "đụ" -> "du",
// trùng ngay với "du học" / "du lịch" — chủ đề chính của khu này.
import { soiVanBan, soiSpam, chuanHoa } from '../server/utils/loc-tu.js';

let dat = 0, hong = 0;
const kiem = (ten, dk) => { if (dk) { dat++; } else { hong++; console.log('  ❌', ten); } };

console.log('\n── PHẢI CHẶN ──');
const phaiChan = [
  'đm thằng này', 'Địt mẹ nó', 'đ.m mày', 'thằng ngu vãi', 'đồ chó',
  'bọn tàu khựa', 'thằng bê đê', 'mày là đồ mọi', 'con lồn', 'vcl luôn',
  'ĐỊT MẸ', 'd i t m e', 'óc chó thật', 'vãi lồn', '傻逼', '操你妈', 'khốn nạn thật',
];
for (const t of phaiChan) {
  const r = soiVanBan(t);
  kiem(`chặn: "${t}" (ra ${r.muc})`, r.muc === 'chan');
}

console.log('\n── KHÔNG ĐƯỢC CHẶN OAN (quan trọng nhất) ──');
const phaiSach = [
  'Mình muốn du học Đài Loan năm sau',
  'Học bổng du học toàn phần của Bộ Giáo dục',
  'Đi du lịch Đài Bắc 5 ngày',
  'Các bạn ơi cho mình hỏi',
  'Mình mua được vé máy bay giá rẻ',
  'Tiền cắc lẻ để đi tàu điện',
  'Cắt tóc ở Đài Loan bao nhiêu tiền?',
  'Đủ điều kiện nộp hồ sơ chưa nhỉ',
  'Lồng đèn Trung thu ở Đài Nam rất đẹp',
  'Đây là bài đọc hiểu TOCFL band A',
  'Mình đang ở Đài Trung, có ai cùng khu không?',
  'Cần người hướng dẫn làm visa',
  'Chị ấy dạy rất có tâm',
  'Mình thi đạt 85 điểm rồi',
  'Bài này khó quá, mình làm mãi không xong',
  '我今天去了台北車站',
  'Học phí một kỳ khoảng 25.000 Đài tệ',
  'Cho mình xin kinh nghiệm phỏng vấn học bổng ICDF',
];
for (const t of phaiSach) {
  const r = soiVanBan(t);
  kiem(`sạch: "${t}" (ra ${r.muc}${r.tuDinh.length ? ' vì ' + r.tuDinh.map(x=>x.tu).join(',') : ''})`, r.muc === 'sach');
}

console.log('\n── CHỈ GẮN CỜ, VẪN ĐĂNG ĐƯỢC ──');
const phaiCanhBao = [
  'Bài này khó vl', 'Mình ngu môn nghe quá', 'Đề này ngáo thật',
  '媽的 sao khó thế', 'dân bắc kỳ hay nói thế',
];
for (const t of phaiCanhBao) {
  const r = soiVanBan(t);
  kiem(`cảnh báo: "${t}" (ra ${r.muc})`, r.muc === 'canh-bao');
}

console.log('\n── CHUẨN HOÁ ──');
kiem('gỡ ký tự chèn', chuanHoa('đ.ị.t  m*ẹ') === 'ditme');
kiem('rút gọn lặp', chuanHoa('nguuuuu') === 'nguu');
kiem('giữ chữ số', chuanHoa('TOCFL band A2') === 'tocflbanda2');

console.log('\n── SPAM (chỉ gắn cờ) ──');
kiem('4 link → gắn cờ', soiSpam('a http://a.com http://b.com http://c.com http://d.com').length > 0);
kiem('1 link → sạch', soiSpam('Tham khảo tại https://edu.tw nhé').length === 0);
kiem('viết hoa hết → gắn cờ', soiSpam('MUA NGAY KHOÁ HỌC GIÁ RẺ NHẤT THỊ TRƯỜNG LIÊN HỆ NGAY HÔM NAY').length > 0);
kiem('bài thường → sạch', soiSpam('Mình chia sẻ kinh nghiệm thi TOCFL band B, mọi người tham khảo.').length === 0);

console.log(`\n${hong ? '❌' : '✅'} BỘ LỌC TỪ NGỮ: ${dat} đạt, ${hong} hỏng\n`);
process.exit(hong ? 1 : 0);
