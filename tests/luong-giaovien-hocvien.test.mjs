// =============================================================
// KIỂM THỬ LUỒNG GIÁO VIÊN <-> HỌC VIÊN, đầu-đến-cuối (2026-09-06)
// =============================================================
//   npm run test:luong        (cần `npm run server` đang chạy + DB local)
//
// Giao bài -> học viên thấy ở "Bài cô giao" + chuông -> nộp bài -> giáo viên xem & chấm ->
// học viên nhận nhận xét -> đánh dấu đã đọc -> học viên KHÁC không đọc trộm được.
// ⚠️ Test này GHI THẬT vào DB rồi tự xoá ở cuối và in lại số bản ghi còn sót (phải 0/0).
//    Chỉ chạy trên DB LOCAL. Đứt giữa chừng thì xoá tay theo lesson_id 'td1-1.3'.
// =============================================================
import 'dotenv/config';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
const c = await mysql.createConnection({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,port:Number(process.env.DB_PORT||3306)});
const tok=(id)=>jwt.sign({id,name:'t',email:'t@t'},process.env.JWT_SECRET,{expiresIn:'1h'});
const B=`http://localhost:${process.env.TEST_PORT || 3001}/api`;
const call = async (m,p,t,body) => {
  const r = await fetch(B+p,{method:m,headers:{'Content-Type':'application/json',...(t?{Authorization:'Bearer '+t}:{})},body:body?JSON.stringify(body):undefined});
  let j=null; try{ j=await r.json(); }catch{}
  return {st:r.status,j};
};
const ok=(b,l)=>console.log(`  ${b?'✅':'❌'} ${l}`);
/** API trả khi thì mảng, khi thì {assignments|notifications|students|results:[...]} — chuẩn hoá về mảng. */
const ds=(j)=>Array.isArray(j)?j:(j&&(j.assignments||j.notifications||j.students||j.results||j.rows||j.data))||[];

// lớp 1 (của admin id=1) + một học viên trong lớp
const [[hv]] = await c.query('SELECT user_id FROM class_enrollments WHERE class_id=1 LIMIT 1');
const ADMIN=tok(1), HS=tok(hv.user_id);
const LESSON='td1-1.3';                       // bài Thời Đại, chắc chắn không đụng dữ liệu cũ
console.log(`Lớp 1 · học viên id=${hv.user_id} · bài ${LESSON}\n`);
const donDep = { assignment:null, result:null };

// ---------- 1. Giáo viên giao bài ----------
let r = await call('POST','/admin/classes/1/assignments',ADMIN,{lesson_id:LESSON,exercise_type:'bai-tap',title:'KIỂM THỬ TỰ ĐỘNG',note:'test',due_date:'2026-12-31'});
ok(r.st===200||r.st===201,`giáo viên giao bài → ${r.st}`);
const [[asg]] = await c.query('SELECT id FROM assignments WHERE class_id=1 AND lesson_id=? ORDER BY id DESC LIMIT 1',[LESSON]);
donDep.assignment = asg?.id; ok(!!asg,`ghi vào bảng assignments (id=${asg?.id})`);

// ---------- 2. Học viên thấy bài ----------
r = await call('GET','/exercise/my-assignments',HS);
ok(r.st===200 && ds(r.j).some(x=>x.lesson_id===LESSON), `học viên thấy ở "Bài cô giao" → ${r.st}, ${ds(r.j).length} bài`);
r = await call('GET','/exercise/notifications',HS);
const tb = ds(r.j).filter(x=>x.type==='assignment' && String(x.topic)===LESSON);
ok(r.st===200 && tb.length>0, `chuông thông báo có tin giao bài → ${tb.length} tin`);
ok(tb[0] && !tb[0].read_at, 'tin ở trạng thái CHƯA ĐỌC');

// ---------- 3. Học viên nộp bài ----------
r = await call('POST','/exercise/submit',HS,{lesson_id:LESSON,total_questions:10,correct_answers:8,score_percent:80,time_seconds:120,
  details:[{question:'Câu kiểm thử',options:['a','b'],selected:0,correctIdx:0,explain:''}]});
ok(r.st===200, `học viên nộp bài → ${r.st}`);
const [[kq]] = await c.query('SELECT id, score_percent FROM exercise_results WHERE user_id=? AND lesson_id=? ORDER BY id DESC LIMIT 1',[hv.user_id,LESSON]);
donDep.result = kq?.id; ok(!!kq && Number(kq.score_percent)===80, `ghi exercise_results (id=${kq?.id}, ${kq?.score_percent}%)`);

// ---------- 4. Giáo viên thấy bài đã nộp ----------
r = await call('GET',`/admin/assignments/${donDep.assignment}/submissions`,ADMIN);

ok(r.st===200, `giáo viên xem ai đã nộp → ${r.st}`);
r = await call('GET',`/admin/exercise-results/${donDep.result}`,ADMIN);
ok(r.st===200 && r.j?.details, `giáo viên mở chi tiết bài làm → ${r.st}, có details: ${!!r.j?.details}`);

// ---------- 5. Giáo viên chấm + nhận xét ----------
r = await call('POST',`/admin/exercise-results/${donDep.result}/review`,ADMIN,{teacher_review:'Nhận xét kiểm thử tự động.'});
ok(r.st===200, `giáo viên gửi nhận xét → ${r.st}`);

// ---------- 6. Học viên nhận thông báo nhận xét ----------
r = await call('GET','/exercise/notifications',HS);
const nx = ds(r.j).filter(x=>x.type==='exercise' && String(x.id)===String(donDep.result));
ok(nx.length>0, `chuông có tin nhận xét → ${nx.length} tin`);
ok(nx[0] && !nx[0].read_at, 'tin nhận xét CHƯA ĐỌC');
r = await call('POST',`/exercise/notifications/exercise/${donDep.result}/read`,HS);
ok(r.st===200, `đánh dấu đã đọc → ${r.st}`);
r = await call('GET','/exercise/notifications',HS);
const sau = ds(r.j).find(x=>x.type==='exercise' && String(x.id)===String(donDep.result));
ok(sau && sau.read_at, 'sau khi đọc, read_at đã có giá trị');

// ---------- 7. Học viên KHÁC không đọc trộm được ----------
const [[hv2]] = await c.query('SELECT id FROM users WHERE role="student" AND id<>? AND is_approved=1 LIMIT 1',[hv.user_id]);
r = await call('GET',`/admin/exercise-results/${donDep.result}`,tok(hv2.id));
ok(r.st===403, `học viên khác mở bài làm của bạn → ${r.st} (phải 403)`);

// ---------- dọn dẹp ----------
if (donDep.result) await c.query('DELETE FROM exercise_results WHERE id=?',[donDep.result]);
if (donDep.assignment) { await c.query('DELETE FROM assignment_reads WHERE assignment_id=?',[donDep.assignment]); await c.query('DELETE FROM assignments WHERE id=?',[donDep.assignment]); }
const [[left]] = await c.query('SELECT (SELECT COUNT(*) FROM assignments WHERE lesson_id=?) a,(SELECT COUNT(*) FROM exercise_results WHERE lesson_id=?) e',[LESSON,LESSON]);
console.log(`\n🧹 dọn dẹp: assignments còn ${left.a}, exercise_results còn ${left.e} (phải 0/0)`);
await c.end();
