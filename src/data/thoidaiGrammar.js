// =============================================================
// Ngữ pháp Giáo trình Thời Đại — gộp 5 quyển (các file thoidaiGrammar<N>.js do script sinh)
//   node scripts/gen-thoidai-grammar.mjs --quyen 1,2,3,4,5
// Khoá = id bài con ('td2-5.1'); ngữ pháp thuộc cả bài nên các bài con dùng chung danh sách.
// =============================================================
import { thoidaiGrammar1 } from './thoidaiGrammar1.js';
import { thoidaiGrammar2 } from './thoidaiGrammar2.js';
import { thoidaiGrammar3 } from './thoidaiGrammar3.js';
import { thoidaiGrammar4 } from './thoidaiGrammar4.js';
import { thoidaiGrammar5 } from './thoidaiGrammar5.js';

export const thoidaiGrammar = {
  ...thoidaiGrammar1, ...thoidaiGrammar2, ...thoidaiGrammar3, ...thoidaiGrammar4, ...thoidaiGrammar5,
};
