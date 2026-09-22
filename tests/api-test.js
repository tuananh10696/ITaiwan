#!/usr/bin/env node
// Comprehensive API Test Suite for Taiwan Diary
// Tests all endpoints, validates responses, checks security

import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const BASE = `http://localhost:${process.env.TEST_PORT || 3001}/api`;

// ============================================================
// 2026-09-06 — SỬA BỘ TEST CHO KHỚP LUỒNG ĐĂNG KÝ MỚI
// ------------------------------------------------------------
// `POST /auth/register` nay KHÔNG trả token nữa mà trả {requireVerification:true}: tài khoản
// phải xác thực email rồi giáo viên duyệt mới đăng nhập được. Bộ test viết trước thay đổi đó
// nên hỏng ở bước đầu và kéo theo 53/120 test đỏ — luôn đỏ nên không ai còn nhìn, regression
// thật sẽ lẫn vào đấy.
// Vì EMAIL_DRY_RUN=true nên token xác thực CHỈ nằm trong DB, không có mail để bấm link.
// => test tự kích hoạt tài khoản vừa tạo bằng một câu UPDATE, rồi đăng nhập như người thật.
// Tài khoản test tự xoá ở cuối (dọn theo tiền tố email), nên chạy lại bao nhiêu lần cũng sạch.
// CHỈ CHẠY TRÊN DB LOCAL.
// ============================================================
const TIEN_TO = 'apitest_';
let db = null;
async function dbConn() {
  if (!db) db = await mysql.createConnection({
    host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, port: Number(process.env.DB_PORT || 3306),
  });
  return db;
}
/** Đánh dấu đã xác thực email + đã được duyệt, trả về id. */
async function kichHoat(email) {
  const c = await dbConn();
  await c.query('UPDATE users SET is_verified = 1, is_approved = 1, verification_token = NULL WHERE email = ?', [email]);
  const [[u]] = await c.query('SELECT id FROM users WHERE email = ?', [email]);
  return u ? u.id : 0;
}
/**
 * Đáp án đúng của các câu hỏi — tra thẳng DB.
 *
 * ⚠️ Trước 2026-09-15 bộ test lấy `correct_option` từ chính response của `GET /exam/questions`.
 * Route đó KHÔNG đòi đăng nhập, nên trường ấy nằm sẵn trong response cho bất kỳ ai gọi — tức là
 * bộ test đang kiểm chứng đúng cái lỗ hổng (một lời gọi curl là có trọn ngân hàng đề kèm đáp án).
 * Route nay đã bỏ `correct_option` khỏi response, và bài thi vẫn được chấm ở server. Test lấy đáp
 * án từ DB — đúng vai người kiểm thử, không phải vai người dùng.
 */
async function dapAnDung(ids) {
  if (!ids.length) return new Map();
  const c = await dbConn();
  const [rows] = await c.query(
    `SELECT id, correct_option FROM exam_questions WHERE id IN (${ids.map(() => '?').join(',')})`, ids);
  return new Map(rows.map((r) => [r.id, r.correct_option]));
}

async function donDep() {
  if (!db) return;
  await db.query('DELETE FROM users WHERE email LIKE ?', [TIEN_TO + '%']);
  // Dọn luôn rác của các lần chạy CŨ: bản test trước dùng tiền tố 'test_…@test.com' và
  // KHÔNG hề dọn, nên DB local tích lại hàng chục tài khoản chưa xác thực.
  await db.query("DELETE FROM users WHERE email LIKE 'test\\_%@test.com' AND is_verified = 0");
  await db.end();
  db = null;
}
let TOKEN = '';
let USER_ID = 0;
let TOKEN2 = '';
let USER_ID2 = 0;
let TEST_EMAIL = '';
let TEST_EMAIL_2 = '';
let passed = 0;
let failed = 0;
const failures = [];

async function req(method, path, body = null, token = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

function test(name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`  ✅ ${name}`);
  } else {
    failed++;
    const msg = `${name}${detail ? ' — ' + detail : ''}`;
    failures.push(msg);
    console.log(`  ❌ ${name}${detail ? ' → ' + detail : ''}`);
  }
}

async function runTests() {
  console.log('\n🧪 TAIWAN DIARY API TEST SUITE\n');
  console.log('═'.repeat(60));

  // ============================================================
  // HEALTH CHECK
  // ============================================================
  console.log('\n📍 Health Check');
  {
    const r = await req('GET', '/health');
    test('Health check returns 200', r.status === 200);
    test('Health check has status ok', r.data.status === 'ok');
  }

  // ============================================================
  // AUTH - REGISTER
  // ============================================================
  console.log('\n📍 Auth - Register');
  {
    // Missing fields
    const r1 = await req('POST', '/auth/register', { name: 'Test' });
    test('Register missing fields → 400', r1.status === 400);

    // Short password
    const r2 = await req('POST', '/auth/register', { name: 'Test', email: 'test@test.com', password: '123' });
    test('Register short password → 400', r2.status === 400);

    // Successful register
    const email = `${TIEN_TO}${Date.now()}@example.com`;
    const r3 = await req('POST', '/auth/register', { name: 'Test User API', email, password: 'test123456', phone: '0999999999' });
    test('Register success → 201', r3.status === 201);
    test('Register yêu cầu xác thực email', r3.data.requireVerification === true);
    test('Register KHÔNG trả token (phải xác thực trước)', !r3.data.token);
    test('Register password_hash NOT in response', !r3.data.user?.password_hash);

    // Chưa xác thực thì không đăng nhập được
    const rChua = await req('POST', '/auth/login', { email, password: 'test123456' });
    test('Chưa xác thực email → không đăng nhập được', rChua.status >= 400);

    // Kích hoạt rồi đăng nhập -> lấy token cho các nhóm test phía sau
    USER_ID2 = await kichHoat(email);
    test('Kích hoạt được tài khoản vừa tạo', USER_ID2 > 0);
    const rDn = await req('POST', '/auth/login', { email, password: 'test123456' });
    test('Sau khi xác thực → đăng nhập 200', rDn.status === 200);
    test('Login trả token', !!rDn.data.token);
    TOKEN2 = rDn.data.token;
    TEST_EMAIL_2 = email;

    // Duplicate email
    const r4 = await req('POST', '/auth/register', { name: 'Dup', email, password: 'test123456' });
    test('Register duplicate email → 409', r4.status === 409);
  }

  // ============================================================
  // AUTH - LOGIN
  // ============================================================
  console.log('\n📍 Auth - Login');
  {
    // Missing fields
    const r1 = await req('POST', '/auth/login', {});
    test('Login missing fields → 400', r1.status === 400);

    // Tài khoản CHÍNH của bộ test: tự tạo + kích hoạt, KHÔNG dùng 'demo@taiwandiary.vn'
    // — email đó không tồn tại trong DB nào (xem cảnh báo đầu CLAUDE.md), test cũ luôn đỏ vì nó.
    TEST_EMAIL = `${TIEN_TO}main_${Date.now()}@example.com`;
    await req('POST', '/auth/register', { name: 'Demo User', email: TEST_EMAIL, password: 'test123456' });
    await kichHoat(TEST_EMAIL);

    // Wrong password
    const r2 = await req('POST', '/auth/login', { email: TEST_EMAIL, password: 'wrongpassword' });
    test('Login wrong password → 401', r2.status === 401);

    // Wrong email
    const r3 = await req('POST', '/auth/login', { email: 'nonexistent@test.com', password: '123456' });
    test('Login wrong email → 401', r3.status === 401);

    // Successful login
    const r4 = await req('POST', '/auth/login', { email: TEST_EMAIL, password: 'test123456' });
    test('Login success → 200', r4.status === 200);
    test('Login returns token', !!r4.data.token);
    test('Login returns user', !!r4.data.user);
    test('Login user name = Demo User', r4.data.user?.name === 'Demo User');
    test('Login password_hash NOT in response', !r4.data.user?.password_hash);
    test('Login user has streak', typeof r4.data.user?.streak === 'number');
    test('Login user has points', typeof r4.data.user?.points === 'number');
    TOKEN = r4.data.token;
    USER_ID = r4.data.user?.id;
  }

  // ============================================================
  // AUTH - ME
  // ============================================================
  console.log('\n📍 Auth - Me');
  {
    // No token
    const r1 = await req('GET', '/auth/me');
    test('Me without token → 401', r1.status === 401);

    // Invalid token
    const r2 = await req('GET', '/auth/me', null, 'invalid-token');
    test('Me invalid token → 401', r2.status === 401);

    // Valid token
    const r3 = await req('GET', '/auth/me', null, TOKEN);
    test('Me valid token → 200', r3.status === 200);
    test('Me returns user object', !!r3.data.user);
    test('Me user has correct id', r3.data.user?.id === USER_ID);
    test('Me password_hash NOT in response', !r3.data.user?.password_hash);
  }

  // ============================================================
  // VOCABULARY
  // ============================================================
  console.log('\n📍 Vocabulary');
  {
    // List all
    const r1 = await req('GET', '/vocabulary');
    test('Vocabulary list → 200', r1.status === 200);
    test('Vocabulary has array', Array.isArray(r1.data.vocabulary));
    test('Vocabulary has total count', typeof r1.data.total === 'number');
    test('Vocabulary has 40 words', r1.data.total === 40);
    test('Vocabulary has pagination', typeof r1.data.page === 'number');

    // Filter by level
    const r2 = await req('GET', '/vocabulary?level=TOCFL%201');
    test('Vocabulary filter level TOCFL 1', r2.data.vocabulary?.length > 0);
    test('All filtered have correct level', r2.data.vocabulary?.every(v => v.level === 'TOCFL 1'));

    // Filter by lesson
    const r3 = await req('GET', '/vocabulary?lesson=Bài%201');
    test('Vocabulary filter lesson Bài 1', r3.data.vocabulary?.length > 0);

    // Search
    const r4 = await req('GET', '/vocabulary?search=chào');
    test('Vocabulary search "chào"', r4.data.vocabulary?.length > 0);

    // Empty search
    const r5 = await req('GET', '/vocabulary?search=xyz_nonexistent_word');
    test('Vocabulary search empty result', r5.data.vocabulary?.length === 0);

    // Single word detail
    const r6 = await req('GET', '/vocabulary/1');
    test('Vocabulary detail id=1 → 200', r6.status === 200);
    test('Vocabulary detail has word', !!r6.data.word);
    test('Vocabulary detail has hanzi', !!r6.data.word?.hanzi);
    test('Vocabulary detail has pinyin', !!r6.data.word?.pinyin);

    // Non-existent word
    const r7 = await req('GET', '/vocabulary/99999');
    test('Vocabulary non-existent → 404', r7.status === 404);

    // Search endpoint
    const r8 = await req('GET', '/vocabulary/search?q=你好');
    test('Vocabulary search endpoint', r8.status === 200);
    test('Vocabulary search has results', Array.isArray(r8.data.results));

    // Levels stats - BUG: this may match /:id route
    const r9 = await req('GET', '/vocabulary/levels/stats');
    test('Vocabulary levels/stats → 200', r9.status === 200, `Got status ${r9.status}, data: ${JSON.stringify(r9.data).slice(0, 100)}`);
  }

  // ============================================================
  // SRS
  // ============================================================
  console.log('\n📍 SRS / Flashcard');
  {
    // Due cards without auth
    const r1 = await req('GET', '/srs/due');
    test('SRS due without auth → 401', r1.status === 401);

    // Due cards with auth
    const r2 = await req('GET', '/srs/due', null, TOKEN);
    test('SRS due with auth → 200', r2.status === 200);
    test('SRS due has cards array', Array.isArray(r2.data.cards));
    test('SRS due has stats', !!r2.data.stats);

    // Review - missing data
    const r3 = await req('POST', '/srs/review', {}, TOKEN);
    test('SRS review missing data → 400', r3.status === 400);

    // Review - invalid rating
    const r4 = await req('POST', '/srs/review', { vocabulary_id: 1, rating: 5 }, TOKEN);
    test('SRS review invalid rating → 400', r4.status === 400);

    // Review - successful (rating 3 = Good)
    const r5 = await req('POST', '/srs/review', { vocabulary_id: 1, rating: 3 }, TOKEN);
    test('SRS review good → 200', r5.status === 200);
    test('SRS review has interval', typeof r5.data.interval_days === 'number');
    test('SRS review has status', !!r5.data.status);
    test('SRS review has points', typeof r5.data.points_earned === 'number');

    // Review again (rating 1 = Forgot)
    const r6 = await req('POST', '/srs/review', { vocabulary_id: 1, rating: 1 }, TOKEN);
    test('SRS review again → 200', r6.status === 200);
    test('SRS review again resets interval', r6.data.interval_days === 0);
    test('SRS review again status = learning', r6.data.status === 'learning');

    // Review with different user — should not affect user 1
    const r7 = await req('POST', '/srs/review', { vocabulary_id: 1, rating: 4 }, TOKEN2);
    test('SRS review user2 → 200', r7.status === 200);

    // Stats
    const r8 = await req('GET', '/srs/stats', null, TOKEN);
    test('SRS stats → 200', r8.status === 200);
    test('SRS stats has total', typeof r8.data.total_words === 'number');
  }

  // ============================================================
  // SAVED WORDS
  // ============================================================
  console.log('\n📍 Saved Words');
  {
    // Without auth
    const r1 = await req('GET', '/saved-words');
    test('Saved words without auth → 401', r1.status === 401);

    // List (empty initially for demo user after db:init)
    const r2 = await req('GET', '/saved-words', null, TOKEN);
    test('Saved words list → 200', r2.status === 200);
    test('Saved words has array', Array.isArray(r2.data.saved_words));

    // Save a word
    const r3 = await req('POST', '/saved-words/1', null, TOKEN);
    test('Save word → 200', r3.status === 200);
    test('Save word saved=true', r3.data.saved === true);

    // Verify saved
    const r4 = await req('GET', '/saved-words', null, TOKEN);
    test('Saved words now has 1 word', r4.data.saved_words?.length === 1);

    // Toggle (unsave)
    const r5 = await req('POST', '/saved-words/1', null, TOKEN);
    test('Toggle unsave → 200', r5.status === 200);
    test('Toggle unsave saved=false', r5.data.saved === false);

    // Verify unsaved
    const r6 = await req('GET', '/saved-words', null, TOKEN);
    test('Saved words now empty', r6.data.saved_words?.length === 0);

    // Non-existent word
    const r7 = await req('POST', '/saved-words/99999', null, TOKEN);
    test('Save non-existent word → 404', r7.status === 404);

    // User isolation — save with user 2
    await req('POST', '/saved-words/5', null, TOKEN2);
    const r8 = await req('GET', '/saved-words', null, TOKEN);
    test('User isolation - user1 not affected by user2', r8.data.saved_words?.length === 0);
  }

  // ============================================================
  // EXAM
  // ============================================================
  console.log('\n📍 Exam');
  {
    // Get questions
    const r1 = await req('GET', '/exam/questions');
    test('Exam questions → 200', r1.status === 200);
    test('Exam has questions array', Array.isArray(r1.data.questions));
    test('Exam questions > 0', r1.data.questions?.length > 0);

    // Filter by type
    const r2 = await req('GET', '/exam/questions?type=reading&level=Band%20A');
    test('Exam filter reading', r2.data.questions?.length > 0);
    test('All reading type', r2.data.questions?.every(q => q.type === 'reading'));

    // Submit without auth
    const r3 = await req('POST', '/exam/submit', { answers: [{ question_id: 1, selected_option: 1 }] });
    test('Exam submit without auth → 401', r3.status === 401);

    // Route công khai KHÔNG được trả đáp án (xem dapAnDung ở đầu file).
    test('Exam questions KHONG lo correct_option',
      (r1.data.questions || []).every(q => q.correct_option === undefined));
    test('Exam questions KHONG lo explanation',
      (r1.data.questions || []).every(q => q.explanation === undefined));

    // Submit with auth — đáp án tra từ DB, không lấy từ response.
    const questions = r1.data.questions?.slice(0, 3) || [];
    const dap = await dapAnDung(questions.map(q => q.id));
    const answers = questions.map(q => ({ question_id: q.id, selected_option: dap.get(q.id) }));
    const r4 = await req('POST', '/exam/submit', { answers, skill: 'reading', time_seconds: 120 }, TOKEN);
    test('Exam submit → 200', r4.status === 200);
    test('Exam result has score', typeof r4.data.score_percent === 'number');
    test('Exam all correct = 100%', r4.data.score_percent === 100);
    test('Exam result has points', typeof r4.data.points_earned === 'number');

    // Submit wrong answers
    const wrongAnswers = questions.map(q => ({ question_id: q.id, selected_option: (dap.get(q.id) + 1) % 4 }));
    const r5 = await req('POST', '/exam/submit', { answers: wrongAnswers, skill: 'reading' }, TOKEN);
    test('Exam wrong answers = 0%', r5.data.score_percent === 0);

    // History
    const r6 = await req('GET', '/exam/history', null, TOKEN);
    test('Exam history → 200', r6.status === 200);
    test('Exam history has entries', r6.data.history?.length >= 2);

    // Result detail
    if (r4.data.exam_result_id) {
      const r7 = await req('GET', `/exam/result/${r4.data.exam_result_id}`, null, TOKEN);
      test('Exam result detail → 200', r7.status === 200);
      test('Exam result has answers', Array.isArray(r7.data.answers));
    }

    // User isolation
    const r8 = await req('GET', '/exam/history', null, TOKEN2);
    test('Exam history user2 empty', r8.data.history?.length === 0);
  }

  // ============================================================
  // DIALOGUES
  // ============================================================
  console.log('\n📍 Dialogues');
  {
    const r1 = await req('GET', '/dialogues');
    test('Dialogues list → 200', r1.status === 200);
    test('Dialogues has array', Array.isArray(r1.data.dialogues));
    test('Dialogues has 3 items', r1.data.dialogues?.length === 3);
    test('Dialogue has line_count', typeof r1.data.dialogues?.[0]?.line_count === 'number');

    // Detail
    const r2 = await req('GET', '/dialogues/1');
    test('Dialogue detail → 200', r2.status === 200);
    test('Dialogue has lines', Array.isArray(r2.data.lines));
    test('Dialogue lines > 0', r2.data.lines?.length > 0);
    test('Dialogue line has speaker', !!r2.data.lines?.[0]?.speaker);

    // Non-existent
    const r3 = await req('GET', '/dialogues/99999');
    test('Dialogue non-existent → 404', r3.status === 404);
  }

  // ============================================================
  // LEADERBOARD
  // ============================================================
  console.log('\n📍 Leaderboard');
  {
    const r1 = await req('GET', '/leaderboard');
    test('Leaderboard → 200', r1.status === 200);
    test('Leaderboard has array', Array.isArray(r1.data.leaderboard));
    test('Leaderboard has users', r1.data.leaderboard?.length > 0);
    test('Leaderboard sorted by points DESC', (() => {
      const lb = r1.data.leaderboard || [];
      for (let i = 1; i < lb.length; i++) {
        if (lb[i].points > lb[i-1].points) return false;
      }
      return true;
    })());
    test('Leaderboard no password_hash', !r1.data.leaderboard?.some(u => u.password_hash));
  }

  // ============================================================
  // PROFILE
  // ============================================================
  console.log('\n📍 Profile');
  {
    // Without auth
    const r1 = await req('GET', '/profile/stats');
    test('Profile stats without auth → 401', r1.status === 401);

    // With auth
    const r2 = await req('GET', '/profile/stats', null, TOKEN);
    test('Profile stats → 200', r2.status === 200);
    test('Profile has user', !!r2.data.user);
    test('Profile has vocab stats', !!r2.data.vocab);
    test('Profile has exam stats', !!r2.data.exam);
    test('Profile no password_hash', !r2.data.user?.password_hash);

    // Update profile
    const r3 = await req('PUT', '/profile/update', { name: 'Demo Updated' }, TOKEN);
    test('Profile update → 200', r3.status === 200);
    test('Profile name updated', r3.data.user?.name === 'Demo Updated');

    // Restore original name
    await req('PUT', '/profile/update', { name: 'Demo User' }, TOKEN);

    // Change password (invalid current)
    const r4 = await req('PUT', '/profile/password', { current_password: 'wrong', new_password: 'newpass123' }, TOKEN);
    test('Password change wrong current → 401', r4.status === 401);

    // Change password (valid)
    const r5 = await req('PUT', '/profile/password', { current_password: 'test123456', new_password: 'newpass123' }, TOKEN);
    test('Password change success → 200', r5.status === 200);

    // Login with new password
    const r6 = await req('POST', '/auth/login', { email: TEST_EMAIL, password: 'newpass123' });
    test('Login with new password works', r6.status === 200);

    // Restore old password
    TOKEN = r6.data.token;
    await req('PUT', '/profile/password', { current_password: 'newpass123', new_password: '123456' }, TOKEN);
  }

  // ============================================================
  // BLOG
  // ============================================================
  console.log('\n📍 Blog');
  {
    const r1 = await req('GET', '/blog');
    test('Blog list → 200', r1.status === 200);
    test('Blog has posts array', Array.isArray(r1.data.posts));
    test('Blog has 6 posts', r1.data.posts?.length === 6);
    test('Blog has categories', Array.isArray(r1.data.categories));

    // Filter
    const r2 = await req('GET', '/blog?category=TOCFL');
    test('Blog filter TOCFL', r2.data.posts?.length > 0);

    // Detail
    const r3 = await req('GET', '/blog/1');
    test('Blog detail → 200', r3.status === 200);
    test('Blog post has title', !!r3.data.post?.title);

    // Non-existent
    const r4 = await req('GET', '/blog/99999');
    test('Blog non-existent → 404', r4.status === 404);
  }

  // ============================================================
  // 404 HANDLER
  // ============================================================
  console.log('\n📍 404 Handler');
  {
    const r1 = await req('GET', '/nonexistent/route');
    test('Unknown API route → 404', r1.status === 404);
  }

  // ============================================================
  // CLEANUP - Delete test user
  // ============================================================
  // (no admin route, so we'll leave it)

  // ============================================================
  // RESULTS
  // ============================================================
  console.log('\n' + '═'.repeat(60));

  await donDep();   // xoá tài khoản test vừa tạo
  console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed, ${passed + failed} total\n`);
  if (failures.length > 0) {
    console.log('❌ FAILURES:');
    failures.forEach(f => console.log(`   • ${f}`));
  }
  console.log('');
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('Test suite error:', err);
  process.exit(1);
});
