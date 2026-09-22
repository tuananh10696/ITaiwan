import { chromium } from 'playwright';
import jwt from 'jsonwebtoken'; import fs from 'node:fs';
const env=Object.fromEntries(fs.readFileSync('.env','utf8').split('\n').filter(l=>l.includes('=')&&!l.startsWith('#')).map(l=>[l.slice(0,l.indexOf('=')),l.slice(l.indexOf('=')+1)]));
const token=jwt.sign({id:1,name:'QT',email:'admin@itaiwan.vn'},env.JWT_SECRET,{expiresIn:'2h'});
const user={id:1,name:'Quản trị viên',email:'admin@itaiwan.vn',is_admin:1,role:'admin',avatar_letter:'A'};
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},locale:'vi-VN'});
await ctx.addInitScript(([t,u])=>{localStorage.setItem('tw_token',t);localStorage.setItem('tw_user',u);},[token,JSON.stringify(user)]);
const p=await ctx.newPage();
const loi=[]; p.on('console',m=>{if(m.type()==='error')loi.push(m.text().slice(0,80))});
p.on('pageerror',e=>loi.push('PAGEERROR '+e.message.slice(0,80)));
p.on('response',r=>{if(r.status()>=400)loi.push(r.status()+' '+r.url().split('/api')[1])});

const KHU=[['Tổng quan','#/tong-quan'],['Quản lý lớp','#/lop-hoc'],['Đề bài','#/de-bai'],['Giáo viên','#/giao-vien'],
 ['Học viên','#/nguoi-dung'],['Hồ sơ du học','#/du-hoc'],['Ký túc xá','#/ky-tuc-xa'],['Sổ thu chi','#/thu-chi'],['Thiết bị','#/thiet-bi']];
console.log('KHU ADMIN'.padEnd(20),'kýtự  tràn  lỗi');
let xau=0;
for(const [ten,h] of KHU){
  loi.length=0;
  await p.goto('http://localhost:5212/admin.html'+h,{waitUntil:'networkidle'});
  await p.waitForTimeout(900);
  const r=await p.evaluate(()=>({n:(document.getElementById('admin-content')?.innerText||'').length,
    tran:document.documentElement.scrollWidth-document.documentElement.clientWidth}));
  const ok=r.n>60 && r.tran<=0 && loi.length===0;
  if(!ok)xau++;
  console.log((ok?'  ':'❌').padEnd(2)+ten.padEnd(18),String(r.n).padStart(5),String(r.tran).padStart(5),String(loi.length).padStart(5),loi.length?'| '+loi[0]:'');
}
// Menu sidebar phai dung 3 nhom
await p.goto('http://localhost:5212/admin.html',{waitUntil:'networkidle'}); await p.waitForTimeout(600);
const menu=await p.evaluate(()=>[...document.querySelectorAll('.sidebar-nav .nav-section-label, .sidebar-nav .nav-item')]
  .filter(e=>getComputedStyle(e).display!=='none').map(e=>(e.classList.contains('nav-section-label')?'— ':'  ')+e.innerText.trim().split('\n')[0]));
console.log('\nMENU ADMIN:'); menu.forEach(m=>console.log('   '+m));
await b.close();
console.log(xau?`\n❌ ${xau} khu có vấn đề`:'\n✅ Admin đạt');
