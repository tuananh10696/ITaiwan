import { chromium } from 'playwright';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
const BASE='http://localhost:5212';
const env=Object.fromEntries(fs.readFileSync('/Users/lt00838/DATA/TA/ITaiwan/.env','utf8').split('\n').filter(l=>l.includes('=')&&!l.startsWith('#')).map(l=>[l.slice(0,l.indexOf('=')),l.slice(l.indexOf('=')+1)]));
const token=jwt.sign({id:1,name:'Quản trị viên',email:'admin@itaiwan.vn'},env.JWT_SECRET,{expiresIn:'2h'});
const user={id:1,name:'Quản trị viên',email:'admin@itaiwan.vn',is_admin:1,role:'admin',is_approved:1,is_verified:1,avatar_letter:'A'};

const TRANG=[
 ['Trang chủ','/'],
 ['Vận mẫu','/hoc-phat-am/van-mau'],
 ['Thanh mẫu','/hoc-phat-am/thanh-mau'],
 ['Thanh điệu','/hoc-phat-am/thanh-dieu'],
 ['Bảng phiên âm','/hoc-phat-am/bang-phien-am'],
 ['Giáo trình Thời đại','/tocfl/giao-trinh-thoi-dai'],
 ['Từ vựng theo Band','/tocfl/tu-vung-theo-band'],
 ['Thi thử TOCFL','/tocfl/thi-thu'],
 ['Từ điển','/tu-vung/tu-dien'],
 ['Sổ tay','/tu-vung/so-tay'],
 ['Bộ thủ','/tu-vung/bo-thu-han-tu'],
 ['Lộ trình · Tổng quan','/lo-trinh/tong-quan'],
 ['Lộ trình · Hôm nay','/lo-trinh/hom-nay'],
 ['Lộ trình · Bài tập','/lo-trinh/bai-tap'],
 ['Lộ trình · Tiến độ','/lo-trinh/tien-do'],
 ['Lộ trình · Kiểm tra','/lo-trinh/bai-kiem-tra'],
 ['Lộ trình · Thành tích','/lo-trinh/thanh-tich'],
 ['TK · Thông tin','/tai-khoan/ho-so'],
 ['TK · Cài đặt','/tai-khoan/cai-dat'],
 ['TK · Thông báo','/tai-khoan/thong-bao'],
];
const BO=[['Đương đại','/tocfl/giao-trinh-duong-dai'],['HSK','/hsk/hsk-3-0'],['HSK từ vựng','/hsk/tu-vung-theo-cap-do'],
 ['Cộng đồng','/cong-dong/thao-luan'],['Blog','/cong-dong/blog'],['Luyện tập · Flashcard','/luyen-tap/flashcard'],
 ['Luyện tập · Trắc nghiệm','/luyen-tap/trac-nghiem'],['Kho từ vựng','/tu-vung/kho-tu-vung'],['Gói thành viên','/tai-khoan/goi-thanh-vien']];

const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},locale:'vi-VN'});
await ctx.addInitScript(([t,u])=>{localStorage.setItem('tw_token',t);localStorage.setItem('tw_user',u);},[token,JSON.stringify(user)]);
const p=await ctx.newPage();
const loi=[];
p.on('console',m=>{if(m.type()==='error')loi.push(m.text().slice(0,90));});
p.on('pageerror',e=>loi.push('PAGEERROR '+e.message.slice(0,90)));

console.log('TRANG GIỮ LẠI'.padEnd(26),'kýtự  tràn  lỗiJS  tiêu đề');
let xau=0;
for(const [ten,url] of TRANG){
  loi.length=0;
  await p.goto(BASE+url,{waitUntil:'networkidle'});
  await p.waitForTimeout(700);
  const r=await p.evaluate(()=>{
    const el=document.getElementById('page-content');
    return {n:(el?.innerText||'').length, tran:document.documentElement.scrollWidth-document.documentElement.clientWidth,
            tt:(document.getElementById('page-title')?.textContent||'').slice(0,26)};
  });
  const ok=r.n>150 && r.tran<=0 && loi.length===0;
  if(!ok) xau++;
  console.log((ok?'  ':'❌').padEnd(2)+ten.padEnd(24), String(r.n).padStart(5), String(r.tran).padStart(5), String(loi.length).padStart(6), ' ', r.tt, loi.length?('| '+loi[0]):'');
}
console.log('\nTRANG ĐÃ BỎ (phải ra 404 hoặc về trang chủ)');
for(const [ten,url] of BO){
  await p.goto(BASE+url,{waitUntil:'networkidle'});
  await p.waitForTimeout(400);
  const r=await p.evaluate(()=>({tt:(document.getElementById('page-title')?.textContent||''), txt:(document.getElementById('page-content')?.innerText||'').slice(0,40)}));
  const ok = /Không tìm thấy/i.test(r.tt) || /Trang chủ/i.test(r.tt);
  if(!ok) xau++;
  console.log((ok?'  ':'❌').padEnd(2)+ten.padEnd(24), '->', r.tt||'(trống)');
}
await b.close();
console.log(xau? `\n❌ ${xau} mục có vấn đề` : '\n✅ Tất cả đạt');
