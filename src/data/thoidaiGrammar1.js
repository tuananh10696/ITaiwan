// =============================================================
// Ngữ pháp Giáo trình Thời Đại QUYỂN 1 — SINH TỰ ĐỘNG, đừng sửa tay.
//   node scripts/gen-thoidai-grammar.mjs --quyen 1
// Nguồn: PPT bài giảng chính thức của 淡江大學華語中心 (công khai).
// Ví dụ CHỈ CÓ tiếng Trung (nguồn không kèm bản dịch) -> `vi` rỗng.
// Ngữ pháp thuộc cả bài nên các bài con dùng chung một danh sách.
// =============================================================
export const thoidaiGrammar1 = {
 "td1-1.1": [
  {
   "title": "I. Sentences with 叫, 姓 or 是",
   "points": [
    {
     "label": null,
     "formula": "叫, 姓and 是 are used as verbs and equate two nouns in a sentence. 姓 is only used for a family name. But叫can be used for either a given name or a full name.",
     "examples": [
      {
       "hz": "B：她是新同學。",
       "vi": "B: Cô ấy là bạn học mới.",
       "py": "B: Tā shì xīn tóngxué."
      },
      {
       "hz": "她是日本人，她不是台灣人。",
       "vi": "Cô ấy là người Nhật, cô ấy không phải người Đài Loan.",
       "py": "Tā shì Rìběn rén, tā búshì táiwānrén."
      },
      {
       "hz": "她不姓李，她姓小林，叫小林友美。",
       "vi": "Cô ấy không họ Lý, cô ấy họ Kobayashi, tên là Kobayashi Yumi.",
       "py": "Tā bú xìnglǐ, tā xìng Xiǎolín, jiào Xiǎolín Yǒuměi."
      },
      {
       "hz": "A：誰是新學生？",
       "vi": "A: Ai là học sinh mới?",
       "py": "A: Shéi shì xīn xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 叫, 姓, 是",
   "giaiThich": "叫, 姓, 是 đều làm động từ, nối hai danh từ với nhau. 姓 chỉ dùng cho HỌ; còn 叫 dùng được cho tên riêng hoặc cả họ lẫn tên."
  },
  {
   "title": "II. 很/不 Modifying Intransitive State Verbs (Vs)",
   "points": [
    {
     "label": null,
     "formula": "Adverbs 很 and 不 can be placed before a Vs . In this pattern, a Vs can be regarded as an adjective, but there is no need to add the verb \"to be\" because it is already embedded in the Intransitive State Verb.",
     "examples": [
      {
       "hz": "她很可愛。",
       "vi": "Cô ấy rất dễ thương.",
       "py": "Tā hěn kě'ài."
      },
      {
       "hz": "王(Wáng)先生很忙。",
       "vi": "Ông Vương rất bận.",
       "py": "Wáng xiānshēng hěn máng."
      },
      {
       "hz": "我們不累，王(Wáng)太太很累。",
       "vi": "Chúng tôi không mệt, bà Vương thì rất mệt.",
       "py": "Wǒmen bú lèi, Wáng tàitai hěn lèi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "很 / 不 bổ nghĩa cho tính từ (Vs)",
   "giaiThich": "Phó từ 很 và 不 đặt TRƯỚC tính từ (Vs). Trong mẫu này Vs coi như tính từ tiếng Việt, và KHÔNG cần thêm động từ 是 (\"là\") vì ý \"thì/là\" đã nằm sẵn trong Vs."
  },
  {
   "title": "III. Simple Questions with Particle 嗎",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by adding 嗎 at the end of the statement without any change in order. It is close to a yes/no question in English.",
     "examples": [
      {
       "hz": "A：他是日本人嗎？",
       "vi": "A: Anh ấy là người Nhật à?",
       "py": "A: Tā shì Rìběn rén ma?"
      },
      {
       "hz": "B：他不是日本人，他是台灣人。",
       "vi": "B: Anh ấy không phải người Nhật, anh ấy là người Đài Loan.",
       "py": "B: Tā búshì Rìběn rén, tā shì táiwānrén."
      },
      {
       "hz": "高(Gāo)先生叫家樂(Jiālè)嗎？",
       "vi": "Ông Cao tên là Gia Lạc phải không?",
       "py": "Gāo xiānshēng jiào Jiālè ma?"
      },
      {
       "hz": "中明姓什麼？",
       "vi": "Trung Minh họ gì?",
       "py": "Zhōngmíng xìng shénme?"
      },
      {
       "hz": "新同學姓什麼？",
       "vi": "Bạn học mới họ gì?",
       "py": "Xīn tóngxué xìng shénme?"
      },
      {
       "hz": "友美是日本人，中明呢？",
       "vi": "Yumi là người Nhật, còn Trung Minh thì sao?",
       "py": "Yǒuměi shì Rìběn rén, Zhōngmíng ne?"
      },
      {
       "hz": "友美喜歡台灣嗎？",
       "vi": "Yumi có thích Đài Loan không?",
       "py": "Yǒuměi xǐhuān Táiwān ma?"
      },
      {
       "hz": "你喜歡台灣嗎？",
       "vi": "Bạn có thích Đài Loan không?",
       "py": "Nǐ xǐhuān Táiwān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi với trợ từ 嗎",
   "giaiThich": "Thêm 嗎 vào cuối câu trần thuật là thành câu hỏi, trật tự câu giữ nguyên. Tương đương câu hỏi có/không trong tiếng Việt."
  },
  {
   "title": "I. Abbreviated Questions with 呢",
   "points": [
    {
     "label": null,
     "formula": "呢 is used at the end of the sentence in an abbreviated way to ask a question from the previous clause.",
     "examples": [
      {
       "hz": "A：我是日本人，你呢？",
       "vi": "A: Tôi là người Nhật, còn bạn?",
       "py": "A: Wǒ shì Rìběn rén, nǐ ne?"
      },
      {
       "hz": "B：我是臺灣人。",
       "vi": "B: Tôi là người Đài Loan.",
       "py": "B: Wǒ shì táiwānrén."
      },
      {
       "hz": "A：小林小姐叫友美，李先生呢？",
       "vi": "A: Cô Kobayashi tên là Yumi, còn anh Lý thì sao?",
       "py": "A: Xiǎolín xiǎojiě jiào Yǒuměi, Lǐ xiānshēng ne?"
      },
      {
       "hz": "B：他叫中明。",
       "vi": "B: Anh ấy tên là Trung Minh.",
       "py": "B: Tā jiào Zhōngmíng."
      },
      {
       "hz": "A：王太太很累，王先生呢？",
       "vi": "A: Bà Vương rất mệt, còn ông Vương thì sao?",
       "py": "A: Wáng tàitai hěn lèi, Wáng xiānshēng ne?"
      },
      {
       "hz": "B：我是印尼人。",
       "vi": "B: Tôi là người Indonesia.",
       "py": "B: Wǒ shì Yìnní rén."
      },
      {
       "hz": "A：我姓李，你呢？",
       "vi": "A: Tôi họ Lý, còn bạn?",
       "py": "A: Wǒ xìnglǐ, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi rút gọn với 呢",
   "giaiThich": "呢 đặt cuối câu để hỏi lại về đối tượng khác, dựa trên nội dung vừa nói. Tương đương \"còn … thì sao?\"."
  },
  {
   "title": "II. Subject-Verb-Object Structure",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我喜歡李(Lĭ)小姐，不喜歡王(Wáng)小姐。",
       "vi": "Tôi thích cô Lý, không thích cô Vương.",
       "py": "Wǒ xǐhuān Lǐ xiǎojiě, bù xǐhuān Wáng xiǎojiě."
      },
      {
       "hz": "你喜歡什麼？",
       "vi": "Bạn thích gì?",
       "py": "Nǐ xǐhuān shénme?"
      },
      {
       "hz": "我愛爸爸、媽媽。",
       "vi": "Tôi yêu bố, mẹ.",
       "py": "Wǒ ài bàba, māma."
      },
      {
       "hz": "A：你喜歡台灣嗎？",
       "vi": "A: Bạn có thích Đài Loan không?",
       "py": "A: Nǐ xǐhuān Táiwān ma?"
      },
      {
       "hz": "A：你喜歡誰？",
       "vi": "A: Bạn thích ai?",
       "py": "A: Nǐ xǐhuān shéi?"
      },
      {
       "hz": "A：王先生愛王太太嗎？",
       "vi": "A: Ông Vương có yêu bà Vương không?",
       "py": "A: Wáng xiānshēng ài Wáng tàitai ma?"
      },
      {
       "hz": "友美愛吃什麼？",
       "vi": "Yumi thích ăn gì?",
       "py": "Yǒuměi ài chī shénme?"
      },
      {
       "hz": "友美愛喝什麼？",
       "vi": "Yumi thích uống gì?",
       "py": "Yǒuměi àihē shénme?"
      },
      {
       "hz": "你愛吃什麼？愛喝什麼？",
       "vi": "Bạn thích ăn gì? Thích uống gì?",
       "py": "Nǐ ài chī shénme? Àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cấu trúc Chủ ngữ – Động từ – Tân ngữ",
   "giaiThich": "Trật tự cơ bản của câu tiếng Trung: chủ ngữ đứng trước, rồi đến động từ, cuối cùng là tân ngữ."
  }
 ],
 "td1-1.2": [
  {
   "title": "I. Sentences with 叫, 姓 or 是",
   "points": [
    {
     "label": null,
     "formula": "叫, 姓and 是 are used as verbs and equate two nouns in a sentence. 姓 is only used for a family name. But叫can be used for either a given name or a full name.",
     "examples": [
      {
       "hz": "B：她是新同學。",
       "vi": "B: Cô ấy là bạn học mới.",
       "py": "B: Tā shì xīn tóngxué."
      },
      {
       "hz": "她是日本人，她不是台灣人。",
       "vi": "Cô ấy là người Nhật, cô ấy không phải người Đài Loan.",
       "py": "Tā shì Rìběn rén, tā búshì táiwānrén."
      },
      {
       "hz": "她不姓李，她姓小林，叫小林友美。",
       "vi": "Cô ấy không họ Lý, cô ấy họ Kobayashi, tên là Kobayashi Yumi.",
       "py": "Tā bú xìnglǐ, tā xìng Xiǎolín, jiào Xiǎolín Yǒuměi."
      },
      {
       "hz": "A：誰是新學生？",
       "vi": "A: Ai là học sinh mới?",
       "py": "A: Shéi shì xīn xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 叫, 姓, 是",
   "giaiThich": "叫, 姓, 是 đều làm động từ, nối hai danh từ với nhau. 姓 chỉ dùng cho HỌ; còn 叫 dùng được cho tên riêng hoặc cả họ lẫn tên."
  },
  {
   "title": "II. 很/不 Modifying Intransitive State Verbs (Vs)",
   "points": [
    {
     "label": null,
     "formula": "Adverbs 很 and 不 can be placed before a Vs . In this pattern, a Vs can be regarded as an adjective, but there is no need to add the verb \"to be\" because it is already embedded in the Intransitive State Verb.",
     "examples": [
      {
       "hz": "她很可愛。",
       "vi": "Cô ấy rất dễ thương.",
       "py": "Tā hěn kě'ài."
      },
      {
       "hz": "王(Wáng)先生很忙。",
       "vi": "Ông Vương rất bận.",
       "py": "Wáng xiānshēng hěn máng."
      },
      {
       "hz": "我們不累，王(Wáng)太太很累。",
       "vi": "Chúng tôi không mệt, bà Vương thì rất mệt.",
       "py": "Wǒmen bú lèi, Wáng tàitai hěn lèi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "很 / 不 bổ nghĩa cho tính từ (Vs)",
   "giaiThich": "Phó từ 很 và 不 đặt TRƯỚC tính từ (Vs). Trong mẫu này Vs coi như tính từ tiếng Việt, và KHÔNG cần thêm động từ 是 (\"là\") vì ý \"thì/là\" đã nằm sẵn trong Vs."
  },
  {
   "title": "III. Simple Questions with Particle 嗎",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by adding 嗎 at the end of the statement without any change in order. It is close to a yes/no question in English.",
     "examples": [
      {
       "hz": "A：他是日本人嗎？",
       "vi": "A: Anh ấy là người Nhật à?",
       "py": "A: Tā shì Rìběn rén ma?"
      },
      {
       "hz": "B：他不是日本人，他是台灣人。",
       "vi": "B: Anh ấy không phải người Nhật, anh ấy là người Đài Loan.",
       "py": "B: Tā búshì Rìběn rén, tā shì táiwānrén."
      },
      {
       "hz": "高(Gāo)先生叫家樂(Jiālè)嗎？",
       "vi": "Ông Cao tên là Gia Lạc phải không?",
       "py": "Gāo xiānshēng jiào Jiālè ma?"
      },
      {
       "hz": "中明姓什麼？",
       "vi": "Trung Minh họ gì?",
       "py": "Zhōngmíng xìng shénme?"
      },
      {
       "hz": "新同學姓什麼？",
       "vi": "Bạn học mới họ gì?",
       "py": "Xīn tóngxué xìng shénme?"
      },
      {
       "hz": "友美是日本人，中明呢？",
       "vi": "Yumi là người Nhật, còn Trung Minh thì sao?",
       "py": "Yǒuměi shì Rìběn rén, Zhōngmíng ne?"
      },
      {
       "hz": "友美喜歡台灣嗎？",
       "vi": "Yumi có thích Đài Loan không?",
       "py": "Yǒuměi xǐhuān Táiwān ma?"
      },
      {
       "hz": "你喜歡台灣嗎？",
       "vi": "Bạn có thích Đài Loan không?",
       "py": "Nǐ xǐhuān Táiwān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi với trợ từ 嗎",
   "giaiThich": "Thêm 嗎 vào cuối câu trần thuật là thành câu hỏi, trật tự câu giữ nguyên. Tương đương câu hỏi có/không trong tiếng Việt."
  },
  {
   "title": "I. Abbreviated Questions with 呢",
   "points": [
    {
     "label": null,
     "formula": "呢 is used at the end of the sentence in an abbreviated way to ask a question from the previous clause.",
     "examples": [
      {
       "hz": "A：我是日本人，你呢？",
       "vi": "A: Tôi là người Nhật, còn bạn?",
       "py": "A: Wǒ shì Rìběn rén, nǐ ne?"
      },
      {
       "hz": "B：我是臺灣人。",
       "vi": "B: Tôi là người Đài Loan.",
       "py": "B: Wǒ shì táiwānrén."
      },
      {
       "hz": "A：小林小姐叫友美，李先生呢？",
       "vi": "A: Cô Kobayashi tên là Yumi, còn anh Lý thì sao?",
       "py": "A: Xiǎolín xiǎojiě jiào Yǒuměi, Lǐ xiānshēng ne?"
      },
      {
       "hz": "B：他叫中明。",
       "vi": "B: Anh ấy tên là Trung Minh.",
       "py": "B: Tā jiào Zhōngmíng."
      },
      {
       "hz": "A：王太太很累，王先生呢？",
       "vi": "A: Bà Vương rất mệt, còn ông Vương thì sao?",
       "py": "A: Wáng tàitai hěn lèi, Wáng xiānshēng ne?"
      },
      {
       "hz": "B：我是印尼人。",
       "vi": "B: Tôi là người Indonesia.",
       "py": "B: Wǒ shì Yìnní rén."
      },
      {
       "hz": "A：我姓李，你呢？",
       "vi": "A: Tôi họ Lý, còn bạn?",
       "py": "A: Wǒ xìnglǐ, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi rút gọn với 呢",
   "giaiThich": "呢 đặt cuối câu để hỏi lại về đối tượng khác, dựa trên nội dung vừa nói. Tương đương \"còn … thì sao?\"."
  },
  {
   "title": "II. Subject-Verb-Object Structure",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我喜歡李(Lĭ)小姐，不喜歡王(Wáng)小姐。",
       "vi": "Tôi thích cô Lý, không thích cô Vương.",
       "py": "Wǒ xǐhuān Lǐ xiǎojiě, bù xǐhuān Wáng xiǎojiě."
      },
      {
       "hz": "你喜歡什麼？",
       "vi": "Bạn thích gì?",
       "py": "Nǐ xǐhuān shénme?"
      },
      {
       "hz": "我愛爸爸、媽媽。",
       "vi": "Tôi yêu bố, mẹ.",
       "py": "Wǒ ài bàba, māma."
      },
      {
       "hz": "A：你喜歡台灣嗎？",
       "vi": "A: Bạn có thích Đài Loan không?",
       "py": "A: Nǐ xǐhuān Táiwān ma?"
      },
      {
       "hz": "A：你喜歡誰？",
       "vi": "A: Bạn thích ai?",
       "py": "A: Nǐ xǐhuān shéi?"
      },
      {
       "hz": "A：王先生愛王太太嗎？",
       "vi": "A: Ông Vương có yêu bà Vương không?",
       "py": "A: Wáng xiānshēng ài Wáng tàitai ma?"
      },
      {
       "hz": "友美愛吃什麼？",
       "vi": "Yumi thích ăn gì?",
       "py": "Yǒuměi ài chī shénme?"
      },
      {
       "hz": "友美愛喝什麼？",
       "vi": "Yumi thích uống gì?",
       "py": "Yǒuměi àihē shénme?"
      },
      {
       "hz": "你愛吃什麼？愛喝什麼？",
       "vi": "Bạn thích ăn gì? Thích uống gì?",
       "py": "Nǐ ài chī shénme? Àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cấu trúc Chủ ngữ – Động từ – Tân ngữ",
   "giaiThich": "Trật tự cơ bản của câu tiếng Trung: chủ ngữ đứng trước, rồi đến động từ, cuối cùng là tân ngữ."
  }
 ],
 "td1-1.3": [
  {
   "title": "I. Sentences with 叫, 姓 or 是",
   "points": [
    {
     "label": null,
     "formula": "叫, 姓and 是 are used as verbs and equate two nouns in a sentence. 姓 is only used for a family name. But叫can be used for either a given name or a full name.",
     "examples": [
      {
       "hz": "B：她是新同學。",
       "vi": "B: Cô ấy là bạn học mới.",
       "py": "B: Tā shì xīn tóngxué."
      },
      {
       "hz": "她是日本人，她不是台灣人。",
       "vi": "Cô ấy là người Nhật, cô ấy không phải người Đài Loan.",
       "py": "Tā shì Rìběn rén, tā búshì táiwānrén."
      },
      {
       "hz": "她不姓李，她姓小林，叫小林友美。",
       "vi": "Cô ấy không họ Lý, cô ấy họ Kobayashi, tên là Kobayashi Yumi.",
       "py": "Tā bú xìnglǐ, tā xìng Xiǎolín, jiào Xiǎolín Yǒuměi."
      },
      {
       "hz": "A：誰是新學生？",
       "vi": "A: Ai là học sinh mới?",
       "py": "A: Shéi shì xīn xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 叫, 姓, 是",
   "giaiThich": "叫, 姓, 是 đều làm động từ, nối hai danh từ với nhau. 姓 chỉ dùng cho HỌ; còn 叫 dùng được cho tên riêng hoặc cả họ lẫn tên."
  },
  {
   "title": "II. 很/不 Modifying Intransitive State Verbs (Vs)",
   "points": [
    {
     "label": null,
     "formula": "Adverbs 很 and 不 can be placed before a Vs . In this pattern, a Vs can be regarded as an adjective, but there is no need to add the verb \"to be\" because it is already embedded in the Intransitive State Verb.",
     "examples": [
      {
       "hz": "她很可愛。",
       "vi": "Cô ấy rất dễ thương.",
       "py": "Tā hěn kě'ài."
      },
      {
       "hz": "王(Wáng)先生很忙。",
       "vi": "Ông Vương rất bận.",
       "py": "Wáng xiānshēng hěn máng."
      },
      {
       "hz": "我們不累，王(Wáng)太太很累。",
       "vi": "Chúng tôi không mệt, bà Vương thì rất mệt.",
       "py": "Wǒmen bú lèi, Wáng tàitai hěn lèi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "很 / 不 bổ nghĩa cho tính từ (Vs)",
   "giaiThich": "Phó từ 很 và 不 đặt TRƯỚC tính từ (Vs). Trong mẫu này Vs coi như tính từ tiếng Việt, và KHÔNG cần thêm động từ 是 (\"là\") vì ý \"thì/là\" đã nằm sẵn trong Vs."
  },
  {
   "title": "III. Simple Questions with Particle 嗎",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by adding 嗎 at the end of the statement without any change in order. It is close to a yes/no question in English.",
     "examples": [
      {
       "hz": "A：他是日本人嗎？",
       "vi": "A: Anh ấy là người Nhật à?",
       "py": "A: Tā shì Rìběn rén ma?"
      },
      {
       "hz": "B：他不是日本人，他是台灣人。",
       "vi": "B: Anh ấy không phải người Nhật, anh ấy là người Đài Loan.",
       "py": "B: Tā búshì Rìběn rén, tā shì táiwānrén."
      },
      {
       "hz": "高(Gāo)先生叫家樂(Jiālè)嗎？",
       "vi": "Ông Cao tên là Gia Lạc phải không?",
       "py": "Gāo xiānshēng jiào Jiālè ma?"
      },
      {
       "hz": "中明姓什麼？",
       "vi": "Trung Minh họ gì?",
       "py": "Zhōngmíng xìng shénme?"
      },
      {
       "hz": "新同學姓什麼？",
       "vi": "Bạn học mới họ gì?",
       "py": "Xīn tóngxué xìng shénme?"
      },
      {
       "hz": "友美是日本人，中明呢？",
       "vi": "Yumi là người Nhật, còn Trung Minh thì sao?",
       "py": "Yǒuměi shì Rìběn rén, Zhōngmíng ne?"
      },
      {
       "hz": "友美喜歡台灣嗎？",
       "vi": "Yumi có thích Đài Loan không?",
       "py": "Yǒuměi xǐhuān Táiwān ma?"
      },
      {
       "hz": "你喜歡台灣嗎？",
       "vi": "Bạn có thích Đài Loan không?",
       "py": "Nǐ xǐhuān Táiwān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi với trợ từ 嗎",
   "giaiThich": "Thêm 嗎 vào cuối câu trần thuật là thành câu hỏi, trật tự câu giữ nguyên. Tương đương câu hỏi có/không trong tiếng Việt."
  },
  {
   "title": "I. Abbreviated Questions with 呢",
   "points": [
    {
     "label": null,
     "formula": "呢 is used at the end of the sentence in an abbreviated way to ask a question from the previous clause.",
     "examples": [
      {
       "hz": "A：我是日本人，你呢？",
       "vi": "A: Tôi là người Nhật, còn bạn?",
       "py": "A: Wǒ shì Rìběn rén, nǐ ne?"
      },
      {
       "hz": "B：我是臺灣人。",
       "vi": "B: Tôi là người Đài Loan.",
       "py": "B: Wǒ shì táiwānrén."
      },
      {
       "hz": "A：小林小姐叫友美，李先生呢？",
       "vi": "A: Cô Kobayashi tên là Yumi, còn anh Lý thì sao?",
       "py": "A: Xiǎolín xiǎojiě jiào Yǒuměi, Lǐ xiānshēng ne?"
      },
      {
       "hz": "B：他叫中明。",
       "vi": "B: Anh ấy tên là Trung Minh.",
       "py": "B: Tā jiào Zhōngmíng."
      },
      {
       "hz": "A：王太太很累，王先生呢？",
       "vi": "A: Bà Vương rất mệt, còn ông Vương thì sao?",
       "py": "A: Wáng tàitai hěn lèi, Wáng xiānshēng ne?"
      },
      {
       "hz": "B：我是印尼人。",
       "vi": "B: Tôi là người Indonesia.",
       "py": "B: Wǒ shì Yìnní rén."
      },
      {
       "hz": "A：我姓李，你呢？",
       "vi": "A: Tôi họ Lý, còn bạn?",
       "py": "A: Wǒ xìnglǐ, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi rút gọn với 呢",
   "giaiThich": "呢 đặt cuối câu để hỏi lại về đối tượng khác, dựa trên nội dung vừa nói. Tương đương \"còn … thì sao?\"."
  },
  {
   "title": "II. Subject-Verb-Object Structure",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我喜歡李(Lĭ)小姐，不喜歡王(Wáng)小姐。",
       "vi": "Tôi thích cô Lý, không thích cô Vương.",
       "py": "Wǒ xǐhuān Lǐ xiǎojiě, bù xǐhuān Wáng xiǎojiě."
      },
      {
       "hz": "你喜歡什麼？",
       "vi": "Bạn thích gì?",
       "py": "Nǐ xǐhuān shénme?"
      },
      {
       "hz": "我愛爸爸、媽媽。",
       "vi": "Tôi yêu bố, mẹ.",
       "py": "Wǒ ài bàba, māma."
      },
      {
       "hz": "A：你喜歡台灣嗎？",
       "vi": "A: Bạn có thích Đài Loan không?",
       "py": "A: Nǐ xǐhuān Táiwān ma?"
      },
      {
       "hz": "A：你喜歡誰？",
       "vi": "A: Bạn thích ai?",
       "py": "A: Nǐ xǐhuān shéi?"
      },
      {
       "hz": "A：王先生愛王太太嗎？",
       "vi": "A: Ông Vương có yêu bà Vương không?",
       "py": "A: Wáng xiānshēng ài Wáng tàitai ma?"
      },
      {
       "hz": "友美愛吃什麼？",
       "vi": "Yumi thích ăn gì?",
       "py": "Yǒuměi ài chī shénme?"
      },
      {
       "hz": "友美愛喝什麼？",
       "vi": "Yumi thích uống gì?",
       "py": "Yǒuměi àihē shénme?"
      },
      {
       "hz": "你愛吃什麼？愛喝什麼？",
       "vi": "Bạn thích ăn gì? Thích uống gì?",
       "py": "Nǐ ài chī shénme? Àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cấu trúc Chủ ngữ – Động từ – Tân ngữ",
   "giaiThich": "Trật tự cơ bản của câu tiếng Trung: chủ ngữ đứng trước, rồi đến động từ, cuối cùng là tân ngữ."
  }
 ],
 "td1-1.4": [
  {
   "title": "I. Sentences with 叫, 姓 or 是",
   "points": [
    {
     "label": null,
     "formula": "叫, 姓and 是 are used as verbs and equate two nouns in a sentence. 姓 is only used for a family name. But叫can be used for either a given name or a full name.",
     "examples": [
      {
       "hz": "B：她是新同學。",
       "vi": "B: Cô ấy là bạn học mới.",
       "py": "B: Tā shì xīn tóngxué."
      },
      {
       "hz": "她是日本人，她不是台灣人。",
       "vi": "Cô ấy là người Nhật, cô ấy không phải người Đài Loan.",
       "py": "Tā shì Rìběn rén, tā búshì táiwānrén."
      },
      {
       "hz": "她不姓李，她姓小林，叫小林友美。",
       "vi": "Cô ấy không họ Lý, cô ấy họ Kobayashi, tên là Kobayashi Yumi.",
       "py": "Tā bú xìnglǐ, tā xìng Xiǎolín, jiào Xiǎolín Yǒuměi."
      },
      {
       "hz": "A：誰是新學生？",
       "vi": "A: Ai là học sinh mới?",
       "py": "A: Shéi shì xīn xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 叫, 姓, 是",
   "giaiThich": "叫, 姓, 是 đều làm động từ, nối hai danh từ với nhau. 姓 chỉ dùng cho HỌ; còn 叫 dùng được cho tên riêng hoặc cả họ lẫn tên."
  },
  {
   "title": "II. 很/不 Modifying Intransitive State Verbs (Vs)",
   "points": [
    {
     "label": null,
     "formula": "Adverbs 很 and 不 can be placed before a Vs . In this pattern, a Vs can be regarded as an adjective, but there is no need to add the verb \"to be\" because it is already embedded in the Intransitive State Verb.",
     "examples": [
      {
       "hz": "她很可愛。",
       "vi": "Cô ấy rất dễ thương.",
       "py": "Tā hěn kě'ài."
      },
      {
       "hz": "王(Wáng)先生很忙。",
       "vi": "Ông Vương rất bận.",
       "py": "Wáng xiānshēng hěn máng."
      },
      {
       "hz": "我們不累，王(Wáng)太太很累。",
       "vi": "Chúng tôi không mệt, bà Vương thì rất mệt.",
       "py": "Wǒmen bú lèi, Wáng tàitai hěn lèi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "很 / 不 bổ nghĩa cho tính từ (Vs)",
   "giaiThich": "Phó từ 很 và 不 đặt TRƯỚC tính từ (Vs). Trong mẫu này Vs coi như tính từ tiếng Việt, và KHÔNG cần thêm động từ 是 (\"là\") vì ý \"thì/là\" đã nằm sẵn trong Vs."
  },
  {
   "title": "III. Simple Questions with Particle 嗎",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by adding 嗎 at the end of the statement without any change in order. It is close to a yes/no question in English.",
     "examples": [
      {
       "hz": "A：他是日本人嗎？",
       "vi": "A: Anh ấy là người Nhật à?",
       "py": "A: Tā shì Rìběn rén ma?"
      },
      {
       "hz": "B：他不是日本人，他是台灣人。",
       "vi": "B: Anh ấy không phải người Nhật, anh ấy là người Đài Loan.",
       "py": "B: Tā búshì Rìběn rén, tā shì táiwānrén."
      },
      {
       "hz": "高(Gāo)先生叫家樂(Jiālè)嗎？",
       "vi": "Ông Cao tên là Gia Lạc phải không?",
       "py": "Gāo xiānshēng jiào Jiālè ma?"
      },
      {
       "hz": "中明姓什麼？",
       "vi": "Trung Minh họ gì?",
       "py": "Zhōngmíng xìng shénme?"
      },
      {
       "hz": "新同學姓什麼？",
       "vi": "Bạn học mới họ gì?",
       "py": "Xīn tóngxué xìng shénme?"
      },
      {
       "hz": "友美是日本人，中明呢？",
       "vi": "Yumi là người Nhật, còn Trung Minh thì sao?",
       "py": "Yǒuměi shì Rìběn rén, Zhōngmíng ne?"
      },
      {
       "hz": "友美喜歡台灣嗎？",
       "vi": "Yumi có thích Đài Loan không?",
       "py": "Yǒuměi xǐhuān Táiwān ma?"
      },
      {
       "hz": "你喜歡台灣嗎？",
       "vi": "Bạn có thích Đài Loan không?",
       "py": "Nǐ xǐhuān Táiwān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi với trợ từ 嗎",
   "giaiThich": "Thêm 嗎 vào cuối câu trần thuật là thành câu hỏi, trật tự câu giữ nguyên. Tương đương câu hỏi có/không trong tiếng Việt."
  },
  {
   "title": "I. Abbreviated Questions with 呢",
   "points": [
    {
     "label": null,
     "formula": "呢 is used at the end of the sentence in an abbreviated way to ask a question from the previous clause.",
     "examples": [
      {
       "hz": "A：我是日本人，你呢？",
       "vi": "A: Tôi là người Nhật, còn bạn?",
       "py": "A: Wǒ shì Rìběn rén, nǐ ne?"
      },
      {
       "hz": "B：我是臺灣人。",
       "vi": "B: Tôi là người Đài Loan.",
       "py": "B: Wǒ shì táiwānrén."
      },
      {
       "hz": "A：小林小姐叫友美，李先生呢？",
       "vi": "A: Cô Kobayashi tên là Yumi, còn anh Lý thì sao?",
       "py": "A: Xiǎolín xiǎojiě jiào Yǒuměi, Lǐ xiānshēng ne?"
      },
      {
       "hz": "B：他叫中明。",
       "vi": "B: Anh ấy tên là Trung Minh.",
       "py": "B: Tā jiào Zhōngmíng."
      },
      {
       "hz": "A：王太太很累，王先生呢？",
       "vi": "A: Bà Vương rất mệt, còn ông Vương thì sao?",
       "py": "A: Wáng tàitai hěn lèi, Wáng xiānshēng ne?"
      },
      {
       "hz": "B：我是印尼人。",
       "vi": "B: Tôi là người Indonesia.",
       "py": "B: Wǒ shì Yìnní rén."
      },
      {
       "hz": "A：我姓李，你呢？",
       "vi": "A: Tôi họ Lý, còn bạn?",
       "py": "A: Wǒ xìnglǐ, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi rút gọn với 呢",
   "giaiThich": "呢 đặt cuối câu để hỏi lại về đối tượng khác, dựa trên nội dung vừa nói. Tương đương \"còn … thì sao?\"."
  },
  {
   "title": "II. Subject-Verb-Object Structure",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我喜歡李(Lĭ)小姐，不喜歡王(Wáng)小姐。",
       "vi": "Tôi thích cô Lý, không thích cô Vương.",
       "py": "Wǒ xǐhuān Lǐ xiǎojiě, bù xǐhuān Wáng xiǎojiě."
      },
      {
       "hz": "你喜歡什麼？",
       "vi": "Bạn thích gì?",
       "py": "Nǐ xǐhuān shénme?"
      },
      {
       "hz": "我愛爸爸、媽媽。",
       "vi": "Tôi yêu bố, mẹ.",
       "py": "Wǒ ài bàba, māma."
      },
      {
       "hz": "A：你喜歡台灣嗎？",
       "vi": "A: Bạn có thích Đài Loan không?",
       "py": "A: Nǐ xǐhuān Táiwān ma?"
      },
      {
       "hz": "A：你喜歡誰？",
       "vi": "A: Bạn thích ai?",
       "py": "A: Nǐ xǐhuān shéi?"
      },
      {
       "hz": "A：王先生愛王太太嗎？",
       "vi": "A: Ông Vương có yêu bà Vương không?",
       "py": "A: Wáng xiānshēng ài Wáng tàitai ma?"
      },
      {
       "hz": "友美愛吃什麼？",
       "vi": "Yumi thích ăn gì?",
       "py": "Yǒuměi ài chī shénme?"
      },
      {
       "hz": "友美愛喝什麼？",
       "vi": "Yumi thích uống gì?",
       "py": "Yǒuměi àihē shénme?"
      },
      {
       "hz": "你愛吃什麼？愛喝什麼？",
       "vi": "Bạn thích ăn gì? Thích uống gì?",
       "py": "Nǐ ài chī shénme? Àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cấu trúc Chủ ngữ – Động từ – Tân ngữ",
   "giaiThich": "Trật tự cơ bản của câu tiếng Trung: chủ ngữ đứng trước, rồi đến động từ, cuối cùng là tân ngữ."
  }
 ],
 "td1-2.1": [
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：現在(是)幾點(幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "B：現在(是)十點十五分。",
       "vi": "B: Bây giờ là mười giờ mười lăm phút.",
       "py": "B: Xiànzài (shì) shídiǎn shíwǔfēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "B：今天(是)星期一。",
       "vi": "B: Hôm nay là thứ Hai.",
       "py": "B: Jīntiān (shì) xīngqíyī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      },
      {
       "hz": "B：今天(是)十二月七號。",
       "vi": "B: Hôm nay là ngày 7 tháng 12.",
       "py": "B: Jīntiān (shì) shí'èryuè qīhào."
      },
      {
       "hz": "A：現在（是）幾點 (幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "A：今天（是）星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "A：今天（是）幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "II. Placement of Time Words",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, time of event is always precedes the verb.",
     "examples": [
      {
       "hz": "我九點三十分上課。",
       "vi": "Tôi vào học lúc chín giờ ba mươi.",
       "py": "Wǒ jiǔdiǎn sānshífēn shàngkè."
      },
      {
       "hz": "他今天沒有課。",
       "vi": "Hôm nay anh ấy không có tiết học.",
       "py": "Tā jīntiān méiyǒu kè."
      },
      {
       "hz": "你幾點去圖書館？",
       "vi": "Mấy giờ bạn đi thư viện?",
       "py": "Nǐ jǐdiǎn qù túshūguǎn?"
      },
      {
       "hz": "A：你今天幾點下課？",
       "vi": "A: Hôm nay mấy giờ bạn tan học?",
       "py": "A: Nǐ jīntiān jǐdiǎn xiàkè?"
      },
      {
       "hz": "A：你星期幾不去學校？",
       "vi": "A: Thứ mấy bạn không đến trường?",
       "py": "A: Nǐ xīngqí jǐ bú qù xuéxiào?"
      },
      {
       "hz": "A：你幾月幾號去日本？",
       "vi": "A: Ngày mấy tháng mấy bạn đi Nhật?",
       "py": "A: Nǐ jǐyuè jǐhào qù Rìběn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của từ chỉ thời gian",
   "giaiThich": "Từ chỉ thời gian của sự việc luôn đứng TRƯỚC động từ."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "我們有新同學。",
       "vi": "Chúng tôi có bạn học mới.",
       "py": "Wǒmen yǒu xīn tóngxué."
      },
      {
       "hz": "A：王先生有孩子嗎？",
       "vi": "A: Ông Vương có con không?",
       "py": "A: Wáng xiānshēng yǒu háizi ma?"
      },
      {
       "hz": "B：王先生沒有孩子。",
       "vi": "B: Ông Vương không có con.",
       "py": "B: Wáng xiānshēng méiyǒu háizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "A：你今天有課嗎？",
       "vi": "A: Hôm nay bạn có tiết học không?",
       "py": "A: Nǐ jīntiān yǒu kè ma?"
      },
      {
       "hz": "B：我今天下午有課。",
       "vi": "B: Chiều nay tôi có tiết học.",
       "py": "B: Wǒ jīntiānxiàwǔ yǒu kè."
      },
      {
       "hz": "A：你有美國朋友嗎？",
       "vi": "A: Bạn có bạn người Mỹ không?",
       "py": "A: Nǐ yǒu Měiguó péngyǒu ma?"
      },
      {
       "hz": "A：你有手機嗎？",
       "vi": "A: Bạn có điện thoại di động không?",
       "py": "A: Nǐ yǒu shǒujī ma?"
      },
      {
       "hz": "中明、友美今天去宜文家嗎？",
       "vi": "Hôm nay Trung Minh và Yumi có đến nhà Nghi Văn không?",
       "py": "Zhōngmíng, Yǒuměi jīntiān qù Yíwén jiā ma?"
      },
      {
       "hz": "宜文的生日是幾月幾號星期幾？",
       "vi": "Sinh nhật của Nghi Văn là thứ mấy, ngày mấy tháng mấy?",
       "py": "Yíwén de shēngrì shì jǐyuè jǐhào xīngqí jǐ?"
      },
      {
       "hz": "友美明天幾點去宜文家？",
       "vi": "Ngày mai mấy giờ Yumi đến nhà Nghi Văn?",
       "py": "Yǒuměi míngtiān jǐdiǎn qù Yíwén jiā?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "I. 的 as a Possessive Particle",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你的手機很新。",
       "vi": "Điện thoại của bạn mới quá.",
       "py": "Nǐ de shǒujī hěn xīn."
      },
      {
       "hz": "他的孩子很可愛嗎？",
       "vi": "Con của anh ấy có dễ thương không?",
       "py": "Tā de háizi hěn kě'ài ma?"
      },
      {
       "hz": "我的英國朋友不喜歡喝奶茶。",
       "vi": "Bạn người Anh của tôi không thích uống trà sữa.",
       "py": "Wǒ de Yīngguó péngyǒu bù xǐhuān hē nǎichá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 chỉ quan hệ sở hữu",
   "giaiThich": "的 đặt giữa người sở hữu và vật được sở hữu, tương đương \"của\" trong tiếng Việt."
  },
  {
   "title": "II. Placement of a Vaux",
   "points": [
    {
     "label": null,
     "formula": "Auxiliary verbs (Vaux) always precedes verbs when used in Chinese sentences.",
     "examples": [
      {
       "hz": "媽媽喜歡喝奶茶。",
       "vi": "Mẹ thích uống trà sữa.",
       "py": "Māma xǐhuān hē nǎichá."
      },
      {
       "hz": "你要去老師家嗎？",
       "vi": "Bạn có muốn đến nhà thầy giáo không?",
       "py": "Nǐ yào qù lǎoshī jiā ma?"
      },
      {
       "hz": "我愛吃水果，不愛喝珍珠奶茶。",
       "vi": "Tôi thích ăn trái cây, không thích uống trà sữa trân châu.",
       "py": "Wǒ ài chīshuǐguǒ, bú àihē zhēnzhūnǎichá."
      },
      {
       "hz": "A：你要吃水果嗎？",
       "vi": "A: Bạn có muốn ăn trái cây không?",
       "py": "A: Nǐ yào chīshuǐguǒ ma?"
      },
      {
       "hz": "A：你喜歡來學校嗎？",
       "vi": "A: Bạn có thích đến trường không?",
       "py": "A: Nǐ xǐhuān lái xuéxiào ma?"
      },
      {
       "hz": "A：你愛喝什麼？",
       "vi": "A: Bạn thích uống gì?",
       "py": "A: Nǐ àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của trợ động từ (Vaux)",
   "giaiThich": "Trợ động từ luôn đứng TRƯỚC động từ chính."
  },
  {
   "title": "III. Questions with Positive-Negative Form",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by “positive -negative” ways .  It is close to yes /no question in English ,but嗎  is never used in this pattern.",
     "examples": [
      {
       "hz": "老師忙不忙？",
       "vi": "Thầy giáo có bận không?",
       "py": "Lǎoshī máng bù máng?"
      },
      {
       "hz": "他有沒有台灣朋友？",
       "vi": "Anh ấy có bạn người Đài Loan không?",
       "py": "Tā yǒuméiyǒu Táiwān péngyǒu?"
      },
      {
       "hz": "你喜(歡)不喜歡喝茶？",
       "vi": "Bạn có thích uống trà không?",
       "py": "Nǐ xǐ (huān) bù xǐhuān hēchá?"
      },
      {
       "hz": "B：台灣很熱。",
       "vi": "B: Đài Loan rất nóng.",
       "py": "B: Táiwān hěn rè."
      },
      {
       "hz": "B：我很喜歡吃。",
       "vi": "B: Tôi rất thích ăn.",
       "py": "B: Wǒ hěn xǐhuān chī."
      },
      {
       "hz": "B：我不要去他家。",
       "vi": "B: Tôi không muốn đến nhà anh ấy.",
       "py": "B: Wǒ búyào qù tājiā."
      },
      {
       "hz": "友美幾歲？",
       "vi": "Yumi bao nhiêu tuổi?",
       "py": "Yǒuměi jǐsuì?"
      },
      {
       "hz": "友美幾點上課？幾點下課？",
       "vi": "Yumi vào học lúc mấy giờ? Mấy giờ tan học?",
       "py": "Yǒuměi jǐdiǎn shàngkè? Jǐdiǎn xiàkè?"
      },
      {
       "hz": "友美下午一點做什麼？",
       "vi": "Một giờ chiều Yumi làm gì?",
       "py": "Yǒuměi xiàwǔ yìdiǎn zuò shénme?"
      },
      {
       "hz": "友美幾點睡覺？",
       "vi": "Yumi đi ngủ lúc mấy giờ?",
       "py": "Yǒuměi jǐdiǎn shuìjiào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi dạng khẳng định – phủ định",
   "giaiThich": "Ghép dạng khẳng định với dạng phủ định của cùng một từ để hỏi (ví dụ 忙不忙). Ý nghĩa như câu hỏi có/không, nhưng TUYỆT ĐỐI không dùng kèm 嗎."
  }
 ],
 "td1-2.2": [
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：現在(是)幾點(幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "B：現在(是)十點十五分。",
       "vi": "B: Bây giờ là mười giờ mười lăm phút.",
       "py": "B: Xiànzài (shì) shídiǎn shíwǔfēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "B：今天(是)星期一。",
       "vi": "B: Hôm nay là thứ Hai.",
       "py": "B: Jīntiān (shì) xīngqíyī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      },
      {
       "hz": "B：今天(是)十二月七號。",
       "vi": "B: Hôm nay là ngày 7 tháng 12.",
       "py": "B: Jīntiān (shì) shí'èryuè qīhào."
      },
      {
       "hz": "A：現在（是）幾點 (幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "A：今天（是）星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "A：今天（是）幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "II. Placement of Time Words",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, time of event is always precedes the verb.",
     "examples": [
      {
       "hz": "我九點三十分上課。",
       "vi": "Tôi vào học lúc chín giờ ba mươi.",
       "py": "Wǒ jiǔdiǎn sānshífēn shàngkè."
      },
      {
       "hz": "他今天沒有課。",
       "vi": "Hôm nay anh ấy không có tiết học.",
       "py": "Tā jīntiān méiyǒu kè."
      },
      {
       "hz": "你幾點去圖書館？",
       "vi": "Mấy giờ bạn đi thư viện?",
       "py": "Nǐ jǐdiǎn qù túshūguǎn?"
      },
      {
       "hz": "A：你今天幾點下課？",
       "vi": "A: Hôm nay mấy giờ bạn tan học?",
       "py": "A: Nǐ jīntiān jǐdiǎn xiàkè?"
      },
      {
       "hz": "A：你星期幾不去學校？",
       "vi": "A: Thứ mấy bạn không đến trường?",
       "py": "A: Nǐ xīngqí jǐ bú qù xuéxiào?"
      },
      {
       "hz": "A：你幾月幾號去日本？",
       "vi": "A: Ngày mấy tháng mấy bạn đi Nhật?",
       "py": "A: Nǐ jǐyuè jǐhào qù Rìběn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của từ chỉ thời gian",
   "giaiThich": "Từ chỉ thời gian của sự việc luôn đứng TRƯỚC động từ."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "我們有新同學。",
       "vi": "Chúng tôi có bạn học mới.",
       "py": "Wǒmen yǒu xīn tóngxué."
      },
      {
       "hz": "A：王先生有孩子嗎？",
       "vi": "A: Ông Vương có con không?",
       "py": "A: Wáng xiānshēng yǒu háizi ma?"
      },
      {
       "hz": "B：王先生沒有孩子。",
       "vi": "B: Ông Vương không có con.",
       "py": "B: Wáng xiānshēng méiyǒu háizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "A：你今天有課嗎？",
       "vi": "A: Hôm nay bạn có tiết học không?",
       "py": "A: Nǐ jīntiān yǒu kè ma?"
      },
      {
       "hz": "B：我今天下午有課。",
       "vi": "B: Chiều nay tôi có tiết học.",
       "py": "B: Wǒ jīntiānxiàwǔ yǒu kè."
      },
      {
       "hz": "A：你有美國朋友嗎？",
       "vi": "A: Bạn có bạn người Mỹ không?",
       "py": "A: Nǐ yǒu Měiguó péngyǒu ma?"
      },
      {
       "hz": "A：你有手機嗎？",
       "vi": "A: Bạn có điện thoại di động không?",
       "py": "A: Nǐ yǒu shǒujī ma?"
      },
      {
       "hz": "中明、友美今天去宜文家嗎？",
       "vi": "Hôm nay Trung Minh và Yumi có đến nhà Nghi Văn không?",
       "py": "Zhōngmíng, Yǒuměi jīntiān qù Yíwén jiā ma?"
      },
      {
       "hz": "宜文的生日是幾月幾號星期幾？",
       "vi": "Sinh nhật của Nghi Văn là thứ mấy, ngày mấy tháng mấy?",
       "py": "Yíwén de shēngrì shì jǐyuè jǐhào xīngqí jǐ?"
      },
      {
       "hz": "友美明天幾點去宜文家？",
       "vi": "Ngày mai mấy giờ Yumi đến nhà Nghi Văn?",
       "py": "Yǒuměi míngtiān jǐdiǎn qù Yíwén jiā?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "I. 的 as a Possessive Particle",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你的手機很新。",
       "vi": "Điện thoại của bạn mới quá.",
       "py": "Nǐ de shǒujī hěn xīn."
      },
      {
       "hz": "他的孩子很可愛嗎？",
       "vi": "Con của anh ấy có dễ thương không?",
       "py": "Tā de háizi hěn kě'ài ma?"
      },
      {
       "hz": "我的英國朋友不喜歡喝奶茶。",
       "vi": "Bạn người Anh của tôi không thích uống trà sữa.",
       "py": "Wǒ de Yīngguó péngyǒu bù xǐhuān hē nǎichá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 chỉ quan hệ sở hữu",
   "giaiThich": "的 đặt giữa người sở hữu và vật được sở hữu, tương đương \"của\" trong tiếng Việt."
  },
  {
   "title": "II. Placement of a Vaux",
   "points": [
    {
     "label": null,
     "formula": "Auxiliary verbs (Vaux) always precedes verbs when used in Chinese sentences.",
     "examples": [
      {
       "hz": "媽媽喜歡喝奶茶。",
       "vi": "Mẹ thích uống trà sữa.",
       "py": "Māma xǐhuān hē nǎichá."
      },
      {
       "hz": "你要去老師家嗎？",
       "vi": "Bạn có muốn đến nhà thầy giáo không?",
       "py": "Nǐ yào qù lǎoshī jiā ma?"
      },
      {
       "hz": "我愛吃水果，不愛喝珍珠奶茶。",
       "vi": "Tôi thích ăn trái cây, không thích uống trà sữa trân châu.",
       "py": "Wǒ ài chīshuǐguǒ, bú àihē zhēnzhūnǎichá."
      },
      {
       "hz": "A：你要吃水果嗎？",
       "vi": "A: Bạn có muốn ăn trái cây không?",
       "py": "A: Nǐ yào chīshuǐguǒ ma?"
      },
      {
       "hz": "A：你喜歡來學校嗎？",
       "vi": "A: Bạn có thích đến trường không?",
       "py": "A: Nǐ xǐhuān lái xuéxiào ma?"
      },
      {
       "hz": "A：你愛喝什麼？",
       "vi": "A: Bạn thích uống gì?",
       "py": "A: Nǐ àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của trợ động từ (Vaux)",
   "giaiThich": "Trợ động từ luôn đứng TRƯỚC động từ chính."
  },
  {
   "title": "III. Questions with Positive-Negative Form",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by “positive -negative” ways .  It is close to yes /no question in English ,but嗎  is never used in this pattern.",
     "examples": [
      {
       "hz": "老師忙不忙？",
       "vi": "Thầy giáo có bận không?",
       "py": "Lǎoshī máng bù máng?"
      },
      {
       "hz": "他有沒有台灣朋友？",
       "vi": "Anh ấy có bạn người Đài Loan không?",
       "py": "Tā yǒuméiyǒu Táiwān péngyǒu?"
      },
      {
       "hz": "你喜(歡)不喜歡喝茶？",
       "vi": "Bạn có thích uống trà không?",
       "py": "Nǐ xǐ (huān) bù xǐhuān hēchá?"
      },
      {
       "hz": "B：台灣很熱。",
       "vi": "B: Đài Loan rất nóng.",
       "py": "B: Táiwān hěn rè."
      },
      {
       "hz": "B：我很喜歡吃。",
       "vi": "B: Tôi rất thích ăn.",
       "py": "B: Wǒ hěn xǐhuān chī."
      },
      {
       "hz": "B：我不要去他家。",
       "vi": "B: Tôi không muốn đến nhà anh ấy.",
       "py": "B: Wǒ búyào qù tājiā."
      },
      {
       "hz": "友美幾歲？",
       "vi": "Yumi bao nhiêu tuổi?",
       "py": "Yǒuměi jǐsuì?"
      },
      {
       "hz": "友美幾點上課？幾點下課？",
       "vi": "Yumi vào học lúc mấy giờ? Mấy giờ tan học?",
       "py": "Yǒuměi jǐdiǎn shàngkè? Jǐdiǎn xiàkè?"
      },
      {
       "hz": "友美下午一點做什麼？",
       "vi": "Một giờ chiều Yumi làm gì?",
       "py": "Yǒuměi xiàwǔ yìdiǎn zuò shénme?"
      },
      {
       "hz": "友美幾點睡覺？",
       "vi": "Yumi đi ngủ lúc mấy giờ?",
       "py": "Yǒuměi jǐdiǎn shuìjiào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi dạng khẳng định – phủ định",
   "giaiThich": "Ghép dạng khẳng định với dạng phủ định của cùng một từ để hỏi (ví dụ 忙不忙). Ý nghĩa như câu hỏi có/không, nhưng TUYỆT ĐỐI không dùng kèm 嗎."
  }
 ],
 "td1-2.3": [
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：現在(是)幾點(幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "B：現在(是)十點十五分。",
       "vi": "B: Bây giờ là mười giờ mười lăm phút.",
       "py": "B: Xiànzài (shì) shídiǎn shíwǔfēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "B：今天(是)星期一。",
       "vi": "B: Hôm nay là thứ Hai.",
       "py": "B: Jīntiān (shì) xīngqíyī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      },
      {
       "hz": "B：今天(是)十二月七號。",
       "vi": "B: Hôm nay là ngày 7 tháng 12.",
       "py": "B: Jīntiān (shì) shí'èryuè qīhào."
      },
      {
       "hz": "A：現在（是）幾點 (幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "A：今天（是）星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "A：今天（是）幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "II. Placement of Time Words",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, time of event is always precedes the verb.",
     "examples": [
      {
       "hz": "我九點三十分上課。",
       "vi": "Tôi vào học lúc chín giờ ba mươi.",
       "py": "Wǒ jiǔdiǎn sānshífēn shàngkè."
      },
      {
       "hz": "他今天沒有課。",
       "vi": "Hôm nay anh ấy không có tiết học.",
       "py": "Tā jīntiān méiyǒu kè."
      },
      {
       "hz": "你幾點去圖書館？",
       "vi": "Mấy giờ bạn đi thư viện?",
       "py": "Nǐ jǐdiǎn qù túshūguǎn?"
      },
      {
       "hz": "A：你今天幾點下課？",
       "vi": "A: Hôm nay mấy giờ bạn tan học?",
       "py": "A: Nǐ jīntiān jǐdiǎn xiàkè?"
      },
      {
       "hz": "A：你星期幾不去學校？",
       "vi": "A: Thứ mấy bạn không đến trường?",
       "py": "A: Nǐ xīngqí jǐ bú qù xuéxiào?"
      },
      {
       "hz": "A：你幾月幾號去日本？",
       "vi": "A: Ngày mấy tháng mấy bạn đi Nhật?",
       "py": "A: Nǐ jǐyuè jǐhào qù Rìběn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của từ chỉ thời gian",
   "giaiThich": "Từ chỉ thời gian của sự việc luôn đứng TRƯỚC động từ."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "我們有新同學。",
       "vi": "Chúng tôi có bạn học mới.",
       "py": "Wǒmen yǒu xīn tóngxué."
      },
      {
       "hz": "A：王先生有孩子嗎？",
       "vi": "A: Ông Vương có con không?",
       "py": "A: Wáng xiānshēng yǒu háizi ma?"
      },
      {
       "hz": "B：王先生沒有孩子。",
       "vi": "B: Ông Vương không có con.",
       "py": "B: Wáng xiānshēng méiyǒu háizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "A：你今天有課嗎？",
       "vi": "A: Hôm nay bạn có tiết học không?",
       "py": "A: Nǐ jīntiān yǒu kè ma?"
      },
      {
       "hz": "B：我今天下午有課。",
       "vi": "B: Chiều nay tôi có tiết học.",
       "py": "B: Wǒ jīntiānxiàwǔ yǒu kè."
      },
      {
       "hz": "A：你有美國朋友嗎？",
       "vi": "A: Bạn có bạn người Mỹ không?",
       "py": "A: Nǐ yǒu Měiguó péngyǒu ma?"
      },
      {
       "hz": "A：你有手機嗎？",
       "vi": "A: Bạn có điện thoại di động không?",
       "py": "A: Nǐ yǒu shǒujī ma?"
      },
      {
       "hz": "中明、友美今天去宜文家嗎？",
       "vi": "Hôm nay Trung Minh và Yumi có đến nhà Nghi Văn không?",
       "py": "Zhōngmíng, Yǒuměi jīntiān qù Yíwén jiā ma?"
      },
      {
       "hz": "宜文的生日是幾月幾號星期幾？",
       "vi": "Sinh nhật của Nghi Văn là thứ mấy, ngày mấy tháng mấy?",
       "py": "Yíwén de shēngrì shì jǐyuè jǐhào xīngqí jǐ?"
      },
      {
       "hz": "友美明天幾點去宜文家？",
       "vi": "Ngày mai mấy giờ Yumi đến nhà Nghi Văn?",
       "py": "Yǒuměi míngtiān jǐdiǎn qù Yíwén jiā?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "I. 的 as a Possessive Particle",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你的手機很新。",
       "vi": "Điện thoại của bạn mới quá.",
       "py": "Nǐ de shǒujī hěn xīn."
      },
      {
       "hz": "他的孩子很可愛嗎？",
       "vi": "Con của anh ấy có dễ thương không?",
       "py": "Tā de háizi hěn kě'ài ma?"
      },
      {
       "hz": "我的英國朋友不喜歡喝奶茶。",
       "vi": "Bạn người Anh của tôi không thích uống trà sữa.",
       "py": "Wǒ de Yīngguó péngyǒu bù xǐhuān hē nǎichá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 chỉ quan hệ sở hữu",
   "giaiThich": "的 đặt giữa người sở hữu và vật được sở hữu, tương đương \"của\" trong tiếng Việt."
  },
  {
   "title": "II. Placement of a Vaux",
   "points": [
    {
     "label": null,
     "formula": "Auxiliary verbs (Vaux) always precedes verbs when used in Chinese sentences.",
     "examples": [
      {
       "hz": "媽媽喜歡喝奶茶。",
       "vi": "Mẹ thích uống trà sữa.",
       "py": "Māma xǐhuān hē nǎichá."
      },
      {
       "hz": "你要去老師家嗎？",
       "vi": "Bạn có muốn đến nhà thầy giáo không?",
       "py": "Nǐ yào qù lǎoshī jiā ma?"
      },
      {
       "hz": "我愛吃水果，不愛喝珍珠奶茶。",
       "vi": "Tôi thích ăn trái cây, không thích uống trà sữa trân châu.",
       "py": "Wǒ ài chīshuǐguǒ, bú àihē zhēnzhūnǎichá."
      },
      {
       "hz": "A：你要吃水果嗎？",
       "vi": "A: Bạn có muốn ăn trái cây không?",
       "py": "A: Nǐ yào chīshuǐguǒ ma?"
      },
      {
       "hz": "A：你喜歡來學校嗎？",
       "vi": "A: Bạn có thích đến trường không?",
       "py": "A: Nǐ xǐhuān lái xuéxiào ma?"
      },
      {
       "hz": "A：你愛喝什麼？",
       "vi": "A: Bạn thích uống gì?",
       "py": "A: Nǐ àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của trợ động từ (Vaux)",
   "giaiThich": "Trợ động từ luôn đứng TRƯỚC động từ chính."
  },
  {
   "title": "III. Questions with Positive-Negative Form",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by “positive -negative” ways .  It is close to yes /no question in English ,but嗎  is never used in this pattern.",
     "examples": [
      {
       "hz": "老師忙不忙？",
       "vi": "Thầy giáo có bận không?",
       "py": "Lǎoshī máng bù máng?"
      },
      {
       "hz": "他有沒有台灣朋友？",
       "vi": "Anh ấy có bạn người Đài Loan không?",
       "py": "Tā yǒuméiyǒu Táiwān péngyǒu?"
      },
      {
       "hz": "你喜(歡)不喜歡喝茶？",
       "vi": "Bạn có thích uống trà không?",
       "py": "Nǐ xǐ (huān) bù xǐhuān hēchá?"
      },
      {
       "hz": "B：台灣很熱。",
       "vi": "B: Đài Loan rất nóng.",
       "py": "B: Táiwān hěn rè."
      },
      {
       "hz": "B：我很喜歡吃。",
       "vi": "B: Tôi rất thích ăn.",
       "py": "B: Wǒ hěn xǐhuān chī."
      },
      {
       "hz": "B：我不要去他家。",
       "vi": "B: Tôi không muốn đến nhà anh ấy.",
       "py": "B: Wǒ búyào qù tājiā."
      },
      {
       "hz": "友美幾歲？",
       "vi": "Yumi bao nhiêu tuổi?",
       "py": "Yǒuměi jǐsuì?"
      },
      {
       "hz": "友美幾點上課？幾點下課？",
       "vi": "Yumi vào học lúc mấy giờ? Mấy giờ tan học?",
       "py": "Yǒuměi jǐdiǎn shàngkè? Jǐdiǎn xiàkè?"
      },
      {
       "hz": "友美下午一點做什麼？",
       "vi": "Một giờ chiều Yumi làm gì?",
       "py": "Yǒuměi xiàwǔ yìdiǎn zuò shénme?"
      },
      {
       "hz": "友美幾點睡覺？",
       "vi": "Yumi đi ngủ lúc mấy giờ?",
       "py": "Yǒuměi jǐdiǎn shuìjiào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi dạng khẳng định – phủ định",
   "giaiThich": "Ghép dạng khẳng định với dạng phủ định của cùng một từ để hỏi (ví dụ 忙不忙). Ý nghĩa như câu hỏi có/không, nhưng TUYỆT ĐỐI không dùng kèm 嗎."
  }
 ],
 "td1-2.4": [
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：現在(是)幾點(幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "B：現在(是)十點十五分。",
       "vi": "B: Bây giờ là mười giờ mười lăm phút.",
       "py": "B: Xiànzài (shì) shídiǎn shíwǔfēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "B：今天(是)星期一。",
       "vi": "B: Hôm nay là thứ Hai.",
       "py": "B: Jīntiān (shì) xīngqíyī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "I. Indicating time",
   "points": [
    {
     "label": null,
     "formula": "When expressing a date in Chinese, the month comes before the date. The numbers from 1 to 6 follow 星期 are used to express Monday to Saturday respectively. 幾 is used to ask dates, months and time.",
     "examples": [
      {
       "hz": "A：今天(是)幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      },
      {
       "hz": "B：今天(是)十二月七號。",
       "vi": "B: Hôm nay là ngày 7 tháng 12.",
       "py": "B: Jīntiān (shì) shí'èryuè qīhào."
      },
      {
       "hz": "A：現在（是）幾點 (幾分)？",
       "vi": "A: Bây giờ là mấy giờ (mấy phút)?",
       "py": "A: Xiànzài (shì) jǐdiǎn (jǐfēn)?"
      },
      {
       "hz": "A：今天（是）星期幾？",
       "vi": "A: Hôm nay là thứ mấy?",
       "py": "A: Jīntiān (shì) xīngqí jǐ?"
      },
      {
       "hz": "A：今天（是）幾月幾號？",
       "vi": "A: Hôm nay là ngày mấy tháng mấy?",
       "py": "A: Jīntiān (shì) jǐyuè jǐhào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cách nói thời gian",
   "giaiThich": "Ngày tháng tiếng Trung nói THÁNG TRƯỚC, NGÀY SAU. Thứ trong tuần dùng 星期 + số 1–6 (thứ Hai đến thứ Bảy). Muốn hỏi ngày, tháng, giờ thì dùng 幾."
  },
  {
   "title": "II. Placement of Time Words",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, time of event is always precedes the verb.",
     "examples": [
      {
       "hz": "我九點三十分上課。",
       "vi": "Tôi vào học lúc chín giờ ba mươi.",
       "py": "Wǒ jiǔdiǎn sānshífēn shàngkè."
      },
      {
       "hz": "他今天沒有課。",
       "vi": "Hôm nay anh ấy không có tiết học.",
       "py": "Tā jīntiān méiyǒu kè."
      },
      {
       "hz": "你幾點去圖書館？",
       "vi": "Mấy giờ bạn đi thư viện?",
       "py": "Nǐ jǐdiǎn qù túshūguǎn?"
      },
      {
       "hz": "A：你今天幾點下課？",
       "vi": "A: Hôm nay mấy giờ bạn tan học?",
       "py": "A: Nǐ jīntiān jǐdiǎn xiàkè?"
      },
      {
       "hz": "A：你星期幾不去學校？",
       "vi": "A: Thứ mấy bạn không đến trường?",
       "py": "A: Nǐ xīngqí jǐ bú qù xuéxiào?"
      },
      {
       "hz": "A：你幾月幾號去日本？",
       "vi": "A: Ngày mấy tháng mấy bạn đi Nhật?",
       "py": "A: Nǐ jǐyuè jǐhào qù Rìběn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của từ chỉ thời gian",
   "giaiThich": "Từ chỉ thời gian của sự việc luôn đứng TRƯỚC động từ."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "我們有新同學。",
       "vi": "Chúng tôi có bạn học mới.",
       "py": "Wǒmen yǒu xīn tóngxué."
      },
      {
       "hz": "A：王先生有孩子嗎？",
       "vi": "A: Ông Vương có con không?",
       "py": "A: Wáng xiānshēng yǒu háizi ma?"
      },
      {
       "hz": "B：王先生沒有孩子。",
       "vi": "B: Ông Vương không có con.",
       "py": "B: Wáng xiānshēng méiyǒu háizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "III. Expressing Possession with 有/沒有",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 有refers to possession or ownership and is always negatd with 沒.",
     "examples": [
      {
       "hz": "台灣朋友。",
       "vi": "Bạn người Đài Loan.",
       "py": "Táiwān péngyǒu."
      },
      {
       "hz": "A：你今天有課嗎？",
       "vi": "A: Hôm nay bạn có tiết học không?",
       "py": "A: Nǐ jīntiān yǒu kè ma?"
      },
      {
       "hz": "B：我今天下午有課。",
       "vi": "B: Chiều nay tôi có tiết học.",
       "py": "B: Wǒ jīntiānxiàwǔ yǒu kè."
      },
      {
       "hz": "A：你有美國朋友嗎？",
       "vi": "A: Bạn có bạn người Mỹ không?",
       "py": "A: Nǐ yǒu Měiguó péngyǒu ma?"
      },
      {
       "hz": "A：你有手機嗎？",
       "vi": "A: Bạn có điện thoại di động không?",
       "py": "A: Nǐ yǒu shǒujī ma?"
      },
      {
       "hz": "中明、友美今天去宜文家嗎？",
       "vi": "Hôm nay Trung Minh và Yumi có đến nhà Nghi Văn không?",
       "py": "Zhōngmíng, Yǒuměi jīntiān qù Yíwén jiā ma?"
      },
      {
       "hz": "宜文的生日是幾月幾號星期幾？",
       "vi": "Sinh nhật của Nghi Văn là thứ mấy, ngày mấy tháng mấy?",
       "py": "Yíwén de shēngrì shì jǐyuè jǐhào xīngqí jǐ?"
      },
      {
       "hz": "友美明天幾點去宜文家？",
       "vi": "Ngày mai mấy giờ Yumi đến nhà Nghi Văn?",
       "py": "Yǒuměi míngtiān jǐdiǎn qù Yíwén jiā?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt sở hữu với 有 / 沒有",
   "giaiThich": "有 chỉ sự sở hữu; phủ định luôn dùng 沒 (không dùng 不)."
  },
  {
   "title": "I. 的 as a Possessive Particle",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你的手機很新。",
       "vi": "Điện thoại của bạn mới quá.",
       "py": "Nǐ de shǒujī hěn xīn."
      },
      {
       "hz": "他的孩子很可愛嗎？",
       "vi": "Con của anh ấy có dễ thương không?",
       "py": "Tā de háizi hěn kě'ài ma?"
      },
      {
       "hz": "我的英國朋友不喜歡喝奶茶。",
       "vi": "Bạn người Anh của tôi không thích uống trà sữa.",
       "py": "Wǒ de Yīngguó péngyǒu bù xǐhuān hē nǎichá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 chỉ quan hệ sở hữu",
   "giaiThich": "的 đặt giữa người sở hữu và vật được sở hữu, tương đương \"của\" trong tiếng Việt."
  },
  {
   "title": "II. Placement of a Vaux",
   "points": [
    {
     "label": null,
     "formula": "Auxiliary verbs (Vaux) always precedes verbs when used in Chinese sentences.",
     "examples": [
      {
       "hz": "媽媽喜歡喝奶茶。",
       "vi": "Mẹ thích uống trà sữa.",
       "py": "Māma xǐhuān hē nǎichá."
      },
      {
       "hz": "你要去老師家嗎？",
       "vi": "Bạn có muốn đến nhà thầy giáo không?",
       "py": "Nǐ yào qù lǎoshī jiā ma?"
      },
      {
       "hz": "我愛吃水果，不愛喝珍珠奶茶。",
       "vi": "Tôi thích ăn trái cây, không thích uống trà sữa trân châu.",
       "py": "Wǒ ài chīshuǐguǒ, bú àihē zhēnzhūnǎichá."
      },
      {
       "hz": "A：你要吃水果嗎？",
       "vi": "A: Bạn có muốn ăn trái cây không?",
       "py": "A: Nǐ yào chīshuǐguǒ ma?"
      },
      {
       "hz": "A：你喜歡來學校嗎？",
       "vi": "A: Bạn có thích đến trường không?",
       "py": "A: Nǐ xǐhuān lái xuéxiào ma?"
      },
      {
       "hz": "A：你愛喝什麼？",
       "vi": "A: Bạn thích uống gì?",
       "py": "A: Nǐ àihē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vị trí của trợ động từ (Vaux)",
   "giaiThich": "Trợ động từ luôn đứng TRƯỚC động từ chính."
  },
  {
   "title": "III. Questions with Positive-Negative Form",
   "points": [
    {
     "label": null,
     "formula": "A question can be formed by “positive -negative” ways .  It is close to yes /no question in English ,but嗎  is never used in this pattern.",
     "examples": [
      {
       "hz": "老師忙不忙？",
       "vi": "Thầy giáo có bận không?",
       "py": "Lǎoshī máng bù máng?"
      },
      {
       "hz": "他有沒有台灣朋友？",
       "vi": "Anh ấy có bạn người Đài Loan không?",
       "py": "Tā yǒuméiyǒu Táiwān péngyǒu?"
      },
      {
       "hz": "你喜(歡)不喜歡喝茶？",
       "vi": "Bạn có thích uống trà không?",
       "py": "Nǐ xǐ (huān) bù xǐhuān hēchá?"
      },
      {
       "hz": "B：台灣很熱。",
       "vi": "B: Đài Loan rất nóng.",
       "py": "B: Táiwān hěn rè."
      },
      {
       "hz": "B：我很喜歡吃。",
       "vi": "B: Tôi rất thích ăn.",
       "py": "B: Wǒ hěn xǐhuān chī."
      },
      {
       "hz": "B：我不要去他家。",
       "vi": "B: Tôi không muốn đến nhà anh ấy.",
       "py": "B: Wǒ búyào qù tājiā."
      },
      {
       "hz": "友美幾歲？",
       "vi": "Yumi bao nhiêu tuổi?",
       "py": "Yǒuměi jǐsuì?"
      },
      {
       "hz": "友美幾點上課？幾點下課？",
       "vi": "Yumi vào học lúc mấy giờ? Mấy giờ tan học?",
       "py": "Yǒuměi jǐdiǎn shàngkè? Jǐdiǎn xiàkè?"
      },
      {
       "hz": "友美下午一點做什麼？",
       "vi": "Một giờ chiều Yumi làm gì?",
       "py": "Yǒuměi xiàwǔ yìdiǎn zuò shénme?"
      },
      {
       "hz": "友美幾點睡覺？",
       "vi": "Yumi đi ngủ lúc mấy giờ?",
       "py": "Yǒuměi jǐdiǎn shuìjiào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu hỏi dạng khẳng định – phủ định",
   "giaiThich": "Ghép dạng khẳng định với dạng phủ định của cùng một từ để hỏi (ví dụ 忙不忙). Ý nghĩa như câu hỏi có/không, nhưng TUYỆT ĐỐI không dùng kèm 嗎."
  }
 ],
 "td1-3.1": [
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": "When a noun is modified by a number, a measure word is necessary in order to specify a certain quantity. The number 二 becomes 兩 when there is a measure word used. 幾(how many) is always used together with a measure word and is usually used when the amount is less than ten.",
     "examples": [
      {
       "hz": "A：你有幾個台灣朋友？",
       "vi": "A: Bạn có mấy người bạn Đài Loan?",
       "py": "A: Nǐ yǒu jǐgè Táiwān péngyǒu?"
      },
      {
       "hz": "B：我有三個台灣朋友。",
       "vi": "B: Tôi có ba người bạn Đài Loan.",
       "py": "B: Wǒ yǒu sāngè Táiwān péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你有幾本中文書？",
       "vi": "A: Bạn có mấy quyển sách tiếng Trung?",
       "py": "A: Nǐ yǒu jǐběn zhōng wénshū?"
      },
      {
       "hz": "B：我有五本中文書。",
       "vi": "B: Tôi có năm quyển sách tiếng Trung.",
       "py": "B: Wǒ yǒu wǔ běn zhōng wénshū."
      },
      {
       "hz": "A：你們有幾個新同學？",
       "vi": "A: Lớp các bạn có mấy bạn học mới?",
       "py": "A: Nǐmen yǒu jǐgè xīn tóngxué?"
      },
      {
       "hz": "B：我們有兩個新同學。",
       "vi": "B: Lớp chúng tôi có hai bạn học mới.",
       "py": "B: Wǒmen yǒu liǎnggè xīn tóngxué."
      },
      {
       "hz": "A：她有幾朵花？",
       "vi": "A: Cô ấy có mấy bông hoa?",
       "py": "A: Tā yǒu jǐduǒ huā?"
      },
      {
       "hz": "A：你要買幾本書？",
       "vi": "A: Bạn muốn mua mấy quyển sách?",
       "py": "A: Nǐ yào mǎi jǐběnshū?"
      },
      {
       "hz": "B：我有四本英文書。",
       "vi": "B: Tôi có bốn quyển sách tiếng Anh.",
       "py": "B: Wǒ yǒu sìběn yīngwénshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": "送 is followed by two objects. The indirect object is ‘‘people’’; the other one is direct object. The order is ‘‘送+ indirect object + direct object.’’",
     "examples": [
      {
       "hz": "一個禮物。",
       "vi": "Một món quà.",
       "py": "Yígè lǐwù."
      },
      {
       "hz": "A：你想送媽媽什麼？",
       "vi": "A: Bạn muốn tặng mẹ cái gì?",
       "py": "A: Nǐ xiǎng sòng māma shénme?"
      },
      {
       "hz": "B：我想送她花。",
       "vi": "B: Tôi muốn tặng mẹ hoa.",
       "py": "B: Wǒ xiǎng sòng tā huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要送誰蛋糕？",
       "vi": "A: Bạn muốn tặng bánh kem cho ai?",
       "py": "A: Nǐ yào sòng shéi dàngāo?"
      },
      {
       "hz": "B：我要送老師蛋糕。",
       "vi": "B: Tôi muốn tặng bánh kem cho thầy giáo.",
       "py": "B: Wǒ yào sòng lǎoshī dàngāo."
      },
      {
       "hz": "A：你想送他什麼禮物？",
       "vi": "A: Bạn muốn tặng anh ấy món quà gì?",
       "py": "A: Nǐ xiǎng sòng tā shénme lǐwù?"
      },
      {
       "hz": "B：我想送他一本中文書。",
       "vi": "B: Tôi muốn tặng anh ấy một quyển sách tiếng Trung.",
       "py": "B: Wǒ xiǎng sòng tā yìběn zhōng wénshū."
      },
      {
       "hz": "一本/爸爸/他/書/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīběn / bàba / tā / shū / sòng /."
      },
      {
       "hz": "想/一個/我/她/大蛋糕/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Xiǎng / yígè / wǒ / tā / dà dàngāo / sòng /."
      },
      {
       "hz": "英國同學/一本/送/中文書/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīngguó tóngxué / yìběn / sòng / zhōng wénshū / wǒ /."
      },
      {
       "hz": "友美喜歡可愛的東西嗎？",
       "vi": "Yumi có thích đồ dễ thương không?",
       "py": "Yǒuměi xǐhuān kě'ài de dōngxī ma?"
      },
      {
       "hz": "一枝小鉛筆五十元嗎？",
       "vi": "Một cây bút chì nhỏ giá năm mươi đồng phải không?",
       "py": "Yīzhī xiǎo qiānbǐ wǔshíyuán ma?"
      },
      {
       "hz": "他們買什麼顏色的小鉛筆？",
       "vi": "Họ mua bút chì nhỏ màu gì?",
       "py": "Tāmen mǎi shénme yánsè de xiǎo qiānbǐ?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": "These three words mean ‘‘this’’, ‘‘that’’ and ‘‘which’’. It depends on the proximity of the nouns you are referring to. If it is close to you, use 這; if it is far, use 那. When the number is one, we usually omit it. When the number is two, then change it to ‘‘兩’’.",
     "examples": [
      {
       "hz": "A：你喜歡喝哪種茶？",
       "vi": "A: Bạn thích uống loại trà nào?",
       "py": "A: Nǐ xǐhuān hē nǎ zhǒng chá?"
      },
      {
       "hz": "B：我喜歡喝這種茶。",
       "vi": "B: Tôi thích uống loại trà này.",
       "py": "B: Wǒ xǐhuān hē zhèzhǒng chá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：這四枝筆怎麼樣？",
       "vi": "A: Bốn cây bút này thế nào?",
       "py": "A: Zhè sìzhī bǐ zěnmeyàng?"
      },
      {
       "hz": "B：這四枝筆很好看。",
       "vi": "B: Bốn cây bút này rất đẹp.",
       "py": "B: Zhè sìzhī bǐ hěn hǎokàn."
      },
      {
       "hz": "A：這兩本中文書很新嗎？",
       "vi": "A: Hai quyển sách tiếng Trung này có mới không?",
       "py": "A: Zhè liǎngběn zhōng wénshū hěn xīn ma?"
      },
      {
       "hz": "B：一本很新，一本不新。",
       "vi": "B: Một quyển mới, một quyển không mới.",
       "py": "B: Yīběn hěn xīn, yìběn bù xīn."
      },
      {
       "hz": "A：這三件衣服漂亮嗎？",
       "vi": "A: Ba bộ quần áo này có đẹp không?",
       "py": "A: Zhè sānjiàn yīfú piàoliàng ma?"
      },
      {
       "hz": "A：那四朵花怎麼樣？",
       "vi": "A: Bốn bông hoa kia thế nào?",
       "py": "A: Nà sìduǒ huā zěnmeyàng?"
      },
      {
       "hz": "A：你想買哪種東西？",
       "vi": "A: Bạn muốn mua loại đồ nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ zhǒng dōngxī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "When a Vs modifies a noun, 的 can be used between them.",
     "examples": [
      {
       "hz": "他是一個快樂的孩子。",
       "vi": "Cậu bé là một đứa trẻ vui vẻ.",
       "py": "Tā shì yígè kuàilè de háizi."
      },
      {
       "hz": "李太太有三個可愛的孩子。",
       "vi": "Bà Lý có ba đứa con dễ thương.",
       "py": "Lǐ tàitai yǒu sāngè kě'ài de háizi."
      },
      {
       "hz": "我喜歡漂亮的花。",
       "vi": "Tôi thích hoa đẹp.",
       "py": "Wǒ xǐhuān piàoliàng de huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "We often omit 的 when it is used with one-syllable Vs.",
     "examples": [
      {
       "hz": "你有幾個好朋友？",
       "vi": "Bạn có mấy người bạn thân?",
       "py": "Nǐ yǒu jǐgè hǎo péngyǒu?"
      },
      {
       "hz": "我要買一個小蛋糕。",
       "vi": "Tôi muốn mua một cái bánh kem nhỏ.",
       "py": "Wǒ yào mǎi yígè xiǎo dàngāo."
      },
      {
       "hz": "他是我們的新同學。",
       "vi": "Anh ấy là bạn học mới của chúng tôi.",
       "py": "Tā shì wǒmen de xīn tóngxué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "Nouns, mentioned previously, can be omitted for subsequent usage to avoid repetition; however, the 的 cannot be omitted.",
     "examples": [
      {
       "hz": "A：你們要買哪個蛋糕？",
       "vi": "A: Các bạn muốn mua cái bánh kem nào?",
       "py": "A: Nǐmen yào mǎi nǎge dàngāo?"
      },
      {
       "hz": "B：他要買大的，我要買小的。",
       "vi": "B: Anh ấy muốn mua cái lớn, tôi muốn mua cái nhỏ.",
       "py": "B: Tā yào mǎi dà de, wǒ yào mǎi xiǎo de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要買哪件衣服？",
       "vi": "A: Bạn muốn mua bộ quần áo nào?",
       "py": "A: Nǐ yào mǎi nǎ jiàn yīfú?"
      },
      {
       "hz": "B：我要買便宜的，不要買貴的。",
       "vi": "B: Tôi muốn mua bộ rẻ, không muốn mua bộ đắt.",
       "py": "B: Wǒ yào mǎi piányi de, búyào mǎi guì de."
      },
      {
       "hz": "A：妳想買哪朵花？",
       "vi": "A: Bạn muốn mua bông hoa nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ duǒhuā?"
      },
      {
       "hz": "B：我想買那朵漂亮的。",
       "vi": "B: Tôi muốn mua bông hoa đẹp kia.",
       "py": "B: Wǒ xiǎng mǎi nà duǒ piàoliàng de."
      },
      {
       "hz": "A：你喜歡哪個禮物？",
       "vi": "A: Bạn thích món quà nào?",
       "py": "A: Nǐ xǐhuān nǎge lǐwù?"
      },
      {
       "hz": "A：你要買哪本書？",
       "vi": "A: Bạn muốn mua quyển sách nào?",
       "py": "A: Nǐ yào mǎi nǎ běnshū?"
      },
      {
       "hz": "A：你喜歡哪個蛋糕？（好看）",
       "vi": "A: Bạn thích cái bánh kem nào? (đẹp)",
       "py": "A: Nǐ xǐhuān nǎge dàngāo? (hǎokàn)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "III. Expressing “Both”, “All” with 都",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這兩件衣服都很漂亮。",
       "vi": "Hai bộ quần áo này đều rất đẹp.",
       "py": "Zhè liǎngjiàn yīfú dōu hěnpiàoliàng."
      },
      {
       "hz": "我們都不要去他家。",
       "vi": "Chúng tôi đều không muốn đến nhà anh ấy.",
       "py": "Wǒmen dōu búyào qù tājiā."
      },
      {
       "hz": "他們都喜歡喝珍珠奶茶嗎？",
       "vi": "Họ đều thích uống trà sữa trân châu phải không?",
       "py": "Tāmen dōu xǐhuān hē zhēnzhūnǎichá ma?"
      },
      {
       "hz": "枝/很/筆/貴/都/五/這/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zhī / hěn / bǐ / guì / dōu / wǔ / zhè /."
      },
      {
       "hz": "人/是/這/個/都/我的同學/四/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Rén / shì / zhè / gè / dōu / wǒ de tóngxué / sì /."
      },
      {
       "hz": "都/這種/喜歡/不/喝/他們/茶/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dōu / zhèzhǒng / xǐhuān / bù / hē / tāmen / chá /."
      },
      {
       "hz": "這個星期天是誰的生日？",
       "vi": "Chủ nhật tuần này là sinh nhật của ai?",
       "py": "Zhège xīngqítiān shì shéi de shēngrì?"
      },
      {
       "hz": "他們買什麼送友美？",
       "vi": "Họ mua gì tặng Yumi?",
       "py": "Tāmen mǎi shénme sòng Yǒuměi?"
      },
      {
       "hz": "友美請他們吃什麼？",
       "vi": "Yumi mời họ ăn gì?",
       "py": "Yǒuměi qǐng tāmen chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"đều\" với 都",
   "giaiThich": "都 là phó từ, đứng sau chủ ngữ và trước động từ/tính từ, mang nghĩa \"đều, tất cả\"."
  }
 ],
 "td1-3.2": [
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": "When a noun is modified by a number, a measure word is necessary in order to specify a certain quantity. The number 二 becomes 兩 when there is a measure word used. 幾(how many) is always used together with a measure word and is usually used when the amount is less than ten.",
     "examples": [
      {
       "hz": "A：你有幾個台灣朋友？",
       "vi": "A: Bạn có mấy người bạn Đài Loan?",
       "py": "A: Nǐ yǒu jǐgè Táiwān péngyǒu?"
      },
      {
       "hz": "B：我有三個台灣朋友。",
       "vi": "B: Tôi có ba người bạn Đài Loan.",
       "py": "B: Wǒ yǒu sāngè Táiwān péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你有幾本中文書？",
       "vi": "A: Bạn có mấy quyển sách tiếng Trung?",
       "py": "A: Nǐ yǒu jǐběn zhōng wénshū?"
      },
      {
       "hz": "B：我有五本中文書。",
       "vi": "B: Tôi có năm quyển sách tiếng Trung.",
       "py": "B: Wǒ yǒu wǔ běn zhōng wénshū."
      },
      {
       "hz": "A：你們有幾個新同學？",
       "vi": "A: Lớp các bạn có mấy bạn học mới?",
       "py": "A: Nǐmen yǒu jǐgè xīn tóngxué?"
      },
      {
       "hz": "B：我們有兩個新同學。",
       "vi": "B: Lớp chúng tôi có hai bạn học mới.",
       "py": "B: Wǒmen yǒu liǎnggè xīn tóngxué."
      },
      {
       "hz": "A：她有幾朵花？",
       "vi": "A: Cô ấy có mấy bông hoa?",
       "py": "A: Tā yǒu jǐduǒ huā?"
      },
      {
       "hz": "A：你要買幾本書？",
       "vi": "A: Bạn muốn mua mấy quyển sách?",
       "py": "A: Nǐ yào mǎi jǐběnshū?"
      },
      {
       "hz": "B：我有四本英文書。",
       "vi": "B: Tôi có bốn quyển sách tiếng Anh.",
       "py": "B: Wǒ yǒu sìběn yīngwénshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": "送 is followed by two objects. The indirect object is ‘‘people’’; the other one is direct object. The order is ‘‘送+ indirect object + direct object.’’",
     "examples": [
      {
       "hz": "一個禮物。",
       "vi": "Một món quà.",
       "py": "Yígè lǐwù."
      },
      {
       "hz": "A：你想送媽媽什麼？",
       "vi": "A: Bạn muốn tặng mẹ cái gì?",
       "py": "A: Nǐ xiǎng sòng māma shénme?"
      },
      {
       "hz": "B：我想送她花。",
       "vi": "B: Tôi muốn tặng mẹ hoa.",
       "py": "B: Wǒ xiǎng sòng tā huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要送誰蛋糕？",
       "vi": "A: Bạn muốn tặng bánh kem cho ai?",
       "py": "A: Nǐ yào sòng shéi dàngāo?"
      },
      {
       "hz": "B：我要送老師蛋糕。",
       "vi": "B: Tôi muốn tặng bánh kem cho thầy giáo.",
       "py": "B: Wǒ yào sòng lǎoshī dàngāo."
      },
      {
       "hz": "A：你想送他什麼禮物？",
       "vi": "A: Bạn muốn tặng anh ấy món quà gì?",
       "py": "A: Nǐ xiǎng sòng tā shénme lǐwù?"
      },
      {
       "hz": "B：我想送他一本中文書。",
       "vi": "B: Tôi muốn tặng anh ấy một quyển sách tiếng Trung.",
       "py": "B: Wǒ xiǎng sòng tā yìběn zhōng wénshū."
      },
      {
       "hz": "一本/爸爸/他/書/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīběn / bàba / tā / shū / sòng /."
      },
      {
       "hz": "想/一個/我/她/大蛋糕/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Xiǎng / yígè / wǒ / tā / dà dàngāo / sòng /."
      },
      {
       "hz": "英國同學/一本/送/中文書/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīngguó tóngxué / yìběn / sòng / zhōng wénshū / wǒ /."
      },
      {
       "hz": "友美喜歡可愛的東西嗎？",
       "vi": "Yumi có thích đồ dễ thương không?",
       "py": "Yǒuměi xǐhuān kě'ài de dōngxī ma?"
      },
      {
       "hz": "一枝小鉛筆五十元嗎？",
       "vi": "Một cây bút chì nhỏ giá năm mươi đồng phải không?",
       "py": "Yīzhī xiǎo qiānbǐ wǔshíyuán ma?"
      },
      {
       "hz": "他們買什麼顏色的小鉛筆？",
       "vi": "Họ mua bút chì nhỏ màu gì?",
       "py": "Tāmen mǎi shénme yánsè de xiǎo qiānbǐ?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": "These three words mean ‘‘this’’, ‘‘that’’ and ‘‘which’’. It depends on the proximity of the nouns you are referring to. If it is close to you, use 這; if it is far, use 那. When the number is one, we usually omit it. When the number is two, then change it to ‘‘兩’’.",
     "examples": [
      {
       "hz": "A：你喜歡喝哪種茶？",
       "vi": "A: Bạn thích uống loại trà nào?",
       "py": "A: Nǐ xǐhuān hē nǎ zhǒng chá?"
      },
      {
       "hz": "B：我喜歡喝這種茶。",
       "vi": "B: Tôi thích uống loại trà này.",
       "py": "B: Wǒ xǐhuān hē zhèzhǒng chá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：這四枝筆怎麼樣？",
       "vi": "A: Bốn cây bút này thế nào?",
       "py": "A: Zhè sìzhī bǐ zěnmeyàng?"
      },
      {
       "hz": "B：這四枝筆很好看。",
       "vi": "B: Bốn cây bút này rất đẹp.",
       "py": "B: Zhè sìzhī bǐ hěn hǎokàn."
      },
      {
       "hz": "A：這兩本中文書很新嗎？",
       "vi": "A: Hai quyển sách tiếng Trung này có mới không?",
       "py": "A: Zhè liǎngběn zhōng wénshū hěn xīn ma?"
      },
      {
       "hz": "B：一本很新，一本不新。",
       "vi": "B: Một quyển mới, một quyển không mới.",
       "py": "B: Yīběn hěn xīn, yìběn bù xīn."
      },
      {
       "hz": "A：這三件衣服漂亮嗎？",
       "vi": "A: Ba bộ quần áo này có đẹp không?",
       "py": "A: Zhè sānjiàn yīfú piàoliàng ma?"
      },
      {
       "hz": "A：那四朵花怎麼樣？",
       "vi": "A: Bốn bông hoa kia thế nào?",
       "py": "A: Nà sìduǒ huā zěnmeyàng?"
      },
      {
       "hz": "A：你想買哪種東西？",
       "vi": "A: Bạn muốn mua loại đồ nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ zhǒng dōngxī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "When a Vs modifies a noun, 的 can be used between them.",
     "examples": [
      {
       "hz": "他是一個快樂的孩子。",
       "vi": "Cậu bé là một đứa trẻ vui vẻ.",
       "py": "Tā shì yígè kuàilè de háizi."
      },
      {
       "hz": "李太太有三個可愛的孩子。",
       "vi": "Bà Lý có ba đứa con dễ thương.",
       "py": "Lǐ tàitai yǒu sāngè kě'ài de háizi."
      },
      {
       "hz": "我喜歡漂亮的花。",
       "vi": "Tôi thích hoa đẹp.",
       "py": "Wǒ xǐhuān piàoliàng de huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "We often omit 的 when it is used with one-syllable Vs.",
     "examples": [
      {
       "hz": "你有幾個好朋友？",
       "vi": "Bạn có mấy người bạn thân?",
       "py": "Nǐ yǒu jǐgè hǎo péngyǒu?"
      },
      {
       "hz": "我要買一個小蛋糕。",
       "vi": "Tôi muốn mua một cái bánh kem nhỏ.",
       "py": "Wǒ yào mǎi yígè xiǎo dàngāo."
      },
      {
       "hz": "他是我們的新同學。",
       "vi": "Anh ấy là bạn học mới của chúng tôi.",
       "py": "Tā shì wǒmen de xīn tóngxué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "Nouns, mentioned previously, can be omitted for subsequent usage to avoid repetition; however, the 的 cannot be omitted.",
     "examples": [
      {
       "hz": "A：你們要買哪個蛋糕？",
       "vi": "A: Các bạn muốn mua cái bánh kem nào?",
       "py": "A: Nǐmen yào mǎi nǎge dàngāo?"
      },
      {
       "hz": "B：他要買大的，我要買小的。",
       "vi": "B: Anh ấy muốn mua cái lớn, tôi muốn mua cái nhỏ.",
       "py": "B: Tā yào mǎi dà de, wǒ yào mǎi xiǎo de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要買哪件衣服？",
       "vi": "A: Bạn muốn mua bộ quần áo nào?",
       "py": "A: Nǐ yào mǎi nǎ jiàn yīfú?"
      },
      {
       "hz": "B：我要買便宜的，不要買貴的。",
       "vi": "B: Tôi muốn mua bộ rẻ, không muốn mua bộ đắt.",
       "py": "B: Wǒ yào mǎi piányi de, búyào mǎi guì de."
      },
      {
       "hz": "A：妳想買哪朵花？",
       "vi": "A: Bạn muốn mua bông hoa nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ duǒhuā?"
      },
      {
       "hz": "B：我想買那朵漂亮的。",
       "vi": "B: Tôi muốn mua bông hoa đẹp kia.",
       "py": "B: Wǒ xiǎng mǎi nà duǒ piàoliàng de."
      },
      {
       "hz": "A：你喜歡哪個禮物？",
       "vi": "A: Bạn thích món quà nào?",
       "py": "A: Nǐ xǐhuān nǎge lǐwù?"
      },
      {
       "hz": "A：你要買哪本書？",
       "vi": "A: Bạn muốn mua quyển sách nào?",
       "py": "A: Nǐ yào mǎi nǎ běnshū?"
      },
      {
       "hz": "A：你喜歡哪個蛋糕？（好看）",
       "vi": "A: Bạn thích cái bánh kem nào? (đẹp)",
       "py": "A: Nǐ xǐhuān nǎge dàngāo? (hǎokàn)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "III. Expressing “Both”, “All” with 都",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這兩件衣服都很漂亮。",
       "vi": "Hai bộ quần áo này đều rất đẹp.",
       "py": "Zhè liǎngjiàn yīfú dōu hěnpiàoliàng."
      },
      {
       "hz": "我們都不要去他家。",
       "vi": "Chúng tôi đều không muốn đến nhà anh ấy.",
       "py": "Wǒmen dōu búyào qù tājiā."
      },
      {
       "hz": "他們都喜歡喝珍珠奶茶嗎？",
       "vi": "Họ đều thích uống trà sữa trân châu phải không?",
       "py": "Tāmen dōu xǐhuān hē zhēnzhūnǎichá ma?"
      },
      {
       "hz": "枝/很/筆/貴/都/五/這/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zhī / hěn / bǐ / guì / dōu / wǔ / zhè /."
      },
      {
       "hz": "人/是/這/個/都/我的同學/四/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Rén / shì / zhè / gè / dōu / wǒ de tóngxué / sì /."
      },
      {
       "hz": "都/這種/喜歡/不/喝/他們/茶/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dōu / zhèzhǒng / xǐhuān / bù / hē / tāmen / chá /."
      },
      {
       "hz": "這個星期天是誰的生日？",
       "vi": "Chủ nhật tuần này là sinh nhật của ai?",
       "py": "Zhège xīngqítiān shì shéi de shēngrì?"
      },
      {
       "hz": "他們買什麼送友美？",
       "vi": "Họ mua gì tặng Yumi?",
       "py": "Tāmen mǎi shénme sòng Yǒuměi?"
      },
      {
       "hz": "友美請他們吃什麼？",
       "vi": "Yumi mời họ ăn gì?",
       "py": "Yǒuměi qǐng tāmen chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"đều\" với 都",
   "giaiThich": "都 là phó từ, đứng sau chủ ngữ và trước động từ/tính từ, mang nghĩa \"đều, tất cả\"."
  }
 ],
 "td1-3.3": [
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": "When a noun is modified by a number, a measure word is necessary in order to specify a certain quantity. The number 二 becomes 兩 when there is a measure word used. 幾(how many) is always used together with a measure word and is usually used when the amount is less than ten.",
     "examples": [
      {
       "hz": "A：你有幾個台灣朋友？",
       "vi": "A: Bạn có mấy người bạn Đài Loan?",
       "py": "A: Nǐ yǒu jǐgè Táiwān péngyǒu?"
      },
      {
       "hz": "B：我有三個台灣朋友。",
       "vi": "B: Tôi có ba người bạn Đài Loan.",
       "py": "B: Wǒ yǒu sāngè Táiwān péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你有幾本中文書？",
       "vi": "A: Bạn có mấy quyển sách tiếng Trung?",
       "py": "A: Nǐ yǒu jǐběn zhōng wénshū?"
      },
      {
       "hz": "B：我有五本中文書。",
       "vi": "B: Tôi có năm quyển sách tiếng Trung.",
       "py": "B: Wǒ yǒu wǔ běn zhōng wénshū."
      },
      {
       "hz": "A：你們有幾個新同學？",
       "vi": "A: Lớp các bạn có mấy bạn học mới?",
       "py": "A: Nǐmen yǒu jǐgè xīn tóngxué?"
      },
      {
       "hz": "B：我們有兩個新同學。",
       "vi": "B: Lớp chúng tôi có hai bạn học mới.",
       "py": "B: Wǒmen yǒu liǎnggè xīn tóngxué."
      },
      {
       "hz": "A：她有幾朵花？",
       "vi": "A: Cô ấy có mấy bông hoa?",
       "py": "A: Tā yǒu jǐduǒ huā?"
      },
      {
       "hz": "A：你要買幾本書？",
       "vi": "A: Bạn muốn mua mấy quyển sách?",
       "py": "A: Nǐ yào mǎi jǐběnshū?"
      },
      {
       "hz": "B：我有四本英文書。",
       "vi": "B: Tôi có bốn quyển sách tiếng Anh.",
       "py": "B: Wǒ yǒu sìběn yīngwénshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": "送 is followed by two objects. The indirect object is ‘‘people’’; the other one is direct object. The order is ‘‘送+ indirect object + direct object.’’",
     "examples": [
      {
       "hz": "一個禮物。",
       "vi": "Một món quà.",
       "py": "Yígè lǐwù."
      },
      {
       "hz": "A：你想送媽媽什麼？",
       "vi": "A: Bạn muốn tặng mẹ cái gì?",
       "py": "A: Nǐ xiǎng sòng māma shénme?"
      },
      {
       "hz": "B：我想送她花。",
       "vi": "B: Tôi muốn tặng mẹ hoa.",
       "py": "B: Wǒ xiǎng sòng tā huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要送誰蛋糕？",
       "vi": "A: Bạn muốn tặng bánh kem cho ai?",
       "py": "A: Nǐ yào sòng shéi dàngāo?"
      },
      {
       "hz": "B：我要送老師蛋糕。",
       "vi": "B: Tôi muốn tặng bánh kem cho thầy giáo.",
       "py": "B: Wǒ yào sòng lǎoshī dàngāo."
      },
      {
       "hz": "A：你想送他什麼禮物？",
       "vi": "A: Bạn muốn tặng anh ấy món quà gì?",
       "py": "A: Nǐ xiǎng sòng tā shénme lǐwù?"
      },
      {
       "hz": "B：我想送他一本中文書。",
       "vi": "B: Tôi muốn tặng anh ấy một quyển sách tiếng Trung.",
       "py": "B: Wǒ xiǎng sòng tā yìběn zhōng wénshū."
      },
      {
       "hz": "一本/爸爸/他/書/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīběn / bàba / tā / shū / sòng /."
      },
      {
       "hz": "想/一個/我/她/大蛋糕/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Xiǎng / yígè / wǒ / tā / dà dàngāo / sòng /."
      },
      {
       "hz": "英國同學/一本/送/中文書/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīngguó tóngxué / yìběn / sòng / zhōng wénshū / wǒ /."
      },
      {
       "hz": "友美喜歡可愛的東西嗎？",
       "vi": "Yumi có thích đồ dễ thương không?",
       "py": "Yǒuměi xǐhuān kě'ài de dōngxī ma?"
      },
      {
       "hz": "一枝小鉛筆五十元嗎？",
       "vi": "Một cây bút chì nhỏ giá năm mươi đồng phải không?",
       "py": "Yīzhī xiǎo qiānbǐ wǔshíyuán ma?"
      },
      {
       "hz": "他們買什麼顏色的小鉛筆？",
       "vi": "Họ mua bút chì nhỏ màu gì?",
       "py": "Tāmen mǎi shénme yánsè de xiǎo qiānbǐ?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": "These three words mean ‘‘this’’, ‘‘that’’ and ‘‘which’’. It depends on the proximity of the nouns you are referring to. If it is close to you, use 這; if it is far, use 那. When the number is one, we usually omit it. When the number is two, then change it to ‘‘兩’’.",
     "examples": [
      {
       "hz": "A：你喜歡喝哪種茶？",
       "vi": "A: Bạn thích uống loại trà nào?",
       "py": "A: Nǐ xǐhuān hē nǎ zhǒng chá?"
      },
      {
       "hz": "B：我喜歡喝這種茶。",
       "vi": "B: Tôi thích uống loại trà này.",
       "py": "B: Wǒ xǐhuān hē zhèzhǒng chá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：這四枝筆怎麼樣？",
       "vi": "A: Bốn cây bút này thế nào?",
       "py": "A: Zhè sìzhī bǐ zěnmeyàng?"
      },
      {
       "hz": "B：這四枝筆很好看。",
       "vi": "B: Bốn cây bút này rất đẹp.",
       "py": "B: Zhè sìzhī bǐ hěn hǎokàn."
      },
      {
       "hz": "A：這兩本中文書很新嗎？",
       "vi": "A: Hai quyển sách tiếng Trung này có mới không?",
       "py": "A: Zhè liǎngběn zhōng wénshū hěn xīn ma?"
      },
      {
       "hz": "B：一本很新，一本不新。",
       "vi": "B: Một quyển mới, một quyển không mới.",
       "py": "B: Yīběn hěn xīn, yìběn bù xīn."
      },
      {
       "hz": "A：這三件衣服漂亮嗎？",
       "vi": "A: Ba bộ quần áo này có đẹp không?",
       "py": "A: Zhè sānjiàn yīfú piàoliàng ma?"
      },
      {
       "hz": "A：那四朵花怎麼樣？",
       "vi": "A: Bốn bông hoa kia thế nào?",
       "py": "A: Nà sìduǒ huā zěnmeyàng?"
      },
      {
       "hz": "A：你想買哪種東西？",
       "vi": "A: Bạn muốn mua loại đồ nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ zhǒng dōngxī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "When a Vs modifies a noun, 的 can be used between them.",
     "examples": [
      {
       "hz": "他是一個快樂的孩子。",
       "vi": "Cậu bé là một đứa trẻ vui vẻ.",
       "py": "Tā shì yígè kuàilè de háizi."
      },
      {
       "hz": "李太太有三個可愛的孩子。",
       "vi": "Bà Lý có ba đứa con dễ thương.",
       "py": "Lǐ tàitai yǒu sāngè kě'ài de háizi."
      },
      {
       "hz": "我喜歡漂亮的花。",
       "vi": "Tôi thích hoa đẹp.",
       "py": "Wǒ xǐhuān piàoliàng de huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "We often omit 的 when it is used with one-syllable Vs.",
     "examples": [
      {
       "hz": "你有幾個好朋友？",
       "vi": "Bạn có mấy người bạn thân?",
       "py": "Nǐ yǒu jǐgè hǎo péngyǒu?"
      },
      {
       "hz": "我要買一個小蛋糕。",
       "vi": "Tôi muốn mua một cái bánh kem nhỏ.",
       "py": "Wǒ yào mǎi yígè xiǎo dàngāo."
      },
      {
       "hz": "他是我們的新同學。",
       "vi": "Anh ấy là bạn học mới của chúng tôi.",
       "py": "Tā shì wǒmen de xīn tóngxué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "Nouns, mentioned previously, can be omitted for subsequent usage to avoid repetition; however, the 的 cannot be omitted.",
     "examples": [
      {
       "hz": "A：你們要買哪個蛋糕？",
       "vi": "A: Các bạn muốn mua cái bánh kem nào?",
       "py": "A: Nǐmen yào mǎi nǎge dàngāo?"
      },
      {
       "hz": "B：他要買大的，我要買小的。",
       "vi": "B: Anh ấy muốn mua cái lớn, tôi muốn mua cái nhỏ.",
       "py": "B: Tā yào mǎi dà de, wǒ yào mǎi xiǎo de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要買哪件衣服？",
       "vi": "A: Bạn muốn mua bộ quần áo nào?",
       "py": "A: Nǐ yào mǎi nǎ jiàn yīfú?"
      },
      {
       "hz": "B：我要買便宜的，不要買貴的。",
       "vi": "B: Tôi muốn mua bộ rẻ, không muốn mua bộ đắt.",
       "py": "B: Wǒ yào mǎi piányi de, búyào mǎi guì de."
      },
      {
       "hz": "A：妳想買哪朵花？",
       "vi": "A: Bạn muốn mua bông hoa nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ duǒhuā?"
      },
      {
       "hz": "B：我想買那朵漂亮的。",
       "vi": "B: Tôi muốn mua bông hoa đẹp kia.",
       "py": "B: Wǒ xiǎng mǎi nà duǒ piàoliàng de."
      },
      {
       "hz": "A：你喜歡哪個禮物？",
       "vi": "A: Bạn thích món quà nào?",
       "py": "A: Nǐ xǐhuān nǎge lǐwù?"
      },
      {
       "hz": "A：你要買哪本書？",
       "vi": "A: Bạn muốn mua quyển sách nào?",
       "py": "A: Nǐ yào mǎi nǎ běnshū?"
      },
      {
       "hz": "A：你喜歡哪個蛋糕？（好看）",
       "vi": "A: Bạn thích cái bánh kem nào? (đẹp)",
       "py": "A: Nǐ xǐhuān nǎge dàngāo? (hǎokàn)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "III. Expressing “Both”, “All” with 都",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這兩件衣服都很漂亮。",
       "vi": "Hai bộ quần áo này đều rất đẹp.",
       "py": "Zhè liǎngjiàn yīfú dōu hěnpiàoliàng."
      },
      {
       "hz": "我們都不要去他家。",
       "vi": "Chúng tôi đều không muốn đến nhà anh ấy.",
       "py": "Wǒmen dōu búyào qù tājiā."
      },
      {
       "hz": "他們都喜歡喝珍珠奶茶嗎？",
       "vi": "Họ đều thích uống trà sữa trân châu phải không?",
       "py": "Tāmen dōu xǐhuān hē zhēnzhūnǎichá ma?"
      },
      {
       "hz": "枝/很/筆/貴/都/五/這/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zhī / hěn / bǐ / guì / dōu / wǔ / zhè /."
      },
      {
       "hz": "人/是/這/個/都/我的同學/四/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Rén / shì / zhè / gè / dōu / wǒ de tóngxué / sì /."
      },
      {
       "hz": "都/這種/喜歡/不/喝/他們/茶/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dōu / zhèzhǒng / xǐhuān / bù / hē / tāmen / chá /."
      },
      {
       "hz": "這個星期天是誰的生日？",
       "vi": "Chủ nhật tuần này là sinh nhật của ai?",
       "py": "Zhège xīngqítiān shì shéi de shēngrì?"
      },
      {
       "hz": "他們買什麼送友美？",
       "vi": "Họ mua gì tặng Yumi?",
       "py": "Tāmen mǎi shénme sòng Yǒuměi?"
      },
      {
       "hz": "友美請他們吃什麼？",
       "vi": "Yumi mời họ ăn gì?",
       "py": "Yǒuměi qǐng tāmen chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"đều\" với 都",
   "giaiThich": "都 là phó từ, đứng sau chủ ngữ và trước động từ/tính từ, mang nghĩa \"đều, tất cả\"."
  }
 ],
 "td1-3.4": [
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": "When a noun is modified by a number, a measure word is necessary in order to specify a certain quantity. The number 二 becomes 兩 when there is a measure word used. 幾(how many) is always used together with a measure word and is usually used when the amount is less than ten.",
     "examples": [
      {
       "hz": "A：你有幾個台灣朋友？",
       "vi": "A: Bạn có mấy người bạn Đài Loan?",
       "py": "A: Nǐ yǒu jǐgè Táiwān péngyǒu?"
      },
      {
       "hz": "B：我有三個台灣朋友。",
       "vi": "B: Tôi có ba người bạn Đài Loan.",
       "py": "B: Wǒ yǒu sāngè Táiwān péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "I. Measure Words",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你有幾本中文書？",
       "vi": "A: Bạn có mấy quyển sách tiếng Trung?",
       "py": "A: Nǐ yǒu jǐběn zhōng wénshū?"
      },
      {
       "hz": "B：我有五本中文書。",
       "vi": "B: Tôi có năm quyển sách tiếng Trung.",
       "py": "B: Wǒ yǒu wǔ běn zhōng wénshū."
      },
      {
       "hz": "A：你們有幾個新同學？",
       "vi": "A: Lớp các bạn có mấy bạn học mới?",
       "py": "A: Nǐmen yǒu jǐgè xīn tóngxué?"
      },
      {
       "hz": "B：我們有兩個新同學。",
       "vi": "B: Lớp chúng tôi có hai bạn học mới.",
       "py": "B: Wǒmen yǒu liǎnggè xīn tóngxué."
      },
      {
       "hz": "A：她有幾朵花？",
       "vi": "A: Cô ấy có mấy bông hoa?",
       "py": "A: Tā yǒu jǐduǒ huā?"
      },
      {
       "hz": "A：你要買幾本書？",
       "vi": "A: Bạn muốn mua mấy quyển sách?",
       "py": "A: Nǐ yào mǎi jǐběnshū?"
      },
      {
       "hz": "B：我有四本英文書。",
       "vi": "B: Tôi có bốn quyển sách tiếng Anh.",
       "py": "B: Wǒ yǒu sìběn yīngwénshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lượng từ",
   "giaiThich": "Khi danh từ đi với số đếm thì bắt buộc phải có lượng từ ở giữa. Số 二 đổi thành 兩 khi đứng trước lượng từ. 幾 (mấy) luôn đi kèm lượng từ, thường dùng khi số lượng nhỏ."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": "送 is followed by two objects. The indirect object is ‘‘people’’; the other one is direct object. The order is ‘‘送+ indirect object + direct object.’’",
     "examples": [
      {
       "hz": "一個禮物。",
       "vi": "Một món quà.",
       "py": "Yígè lǐwù."
      },
      {
       "hz": "A：你想送媽媽什麼？",
       "vi": "A: Bạn muốn tặng mẹ cái gì?",
       "py": "A: Nǐ xiǎng sòng māma shénme?"
      },
      {
       "hz": "B：我想送她花。",
       "vi": "B: Tôi muốn tặng mẹ hoa.",
       "py": "B: Wǒ xiǎng sòng tā huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "II. S+送+IO+DO",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要送誰蛋糕？",
       "vi": "A: Bạn muốn tặng bánh kem cho ai?",
       "py": "A: Nǐ yào sòng shéi dàngāo?"
      },
      {
       "hz": "B：我要送老師蛋糕。",
       "vi": "B: Tôi muốn tặng bánh kem cho thầy giáo.",
       "py": "B: Wǒ yào sòng lǎoshī dàngāo."
      },
      {
       "hz": "A：你想送他什麼禮物？",
       "vi": "A: Bạn muốn tặng anh ấy món quà gì?",
       "py": "A: Nǐ xiǎng sòng tā shénme lǐwù?"
      },
      {
       "hz": "B：我想送他一本中文書。",
       "vi": "B: Tôi muốn tặng anh ấy một quyển sách tiếng Trung.",
       "py": "B: Wǒ xiǎng sòng tā yìběn zhōng wénshū."
      },
      {
       "hz": "一本/爸爸/他/書/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīběn / bàba / tā / shū / sòng /."
      },
      {
       "hz": "想/一個/我/她/大蛋糕/送/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Xiǎng / yígè / wǒ / tā / dà dàngāo / sòng /."
      },
      {
       "hz": "英國同學/一本/送/中文書/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Yīngguó tóngxué / yìběn / sòng / zhōng wénshū / wǒ /."
      },
      {
       "hz": "友美喜歡可愛的東西嗎？",
       "vi": "Yumi có thích đồ dễ thương không?",
       "py": "Yǒuměi xǐhuān kě'ài de dōngxī ma?"
      },
      {
       "hz": "一枝小鉛筆五十元嗎？",
       "vi": "Một cây bút chì nhỏ giá năm mươi đồng phải không?",
       "py": "Yīzhī xiǎo qiānbǐ wǔshíyuán ma?"
      },
      {
       "hz": "他們買什麼顏色的小鉛筆？",
       "vi": "Họ mua bút chì nhỏ màu gì?",
       "py": "Tāmen mǎi shénme yánsè de xiǎo qiānbǐ?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "S + 送 + tân ngữ gián tiếp + tân ngữ trực tiếp",
   "giaiThich": "送 mang hai tân ngữ: người nhận đứng trước, vật được tặng đứng sau — 送 + người + vật."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": "These three words mean ‘‘this’’, ‘‘that’’ and ‘‘which’’. It depends on the proximity of the nouns you are referring to. If it is close to you, use 這; if it is far, use 那. When the number is one, we usually omit it. When the number is two, then change it to ‘‘兩’’.",
     "examples": [
      {
       "hz": "A：你喜歡喝哪種茶？",
       "vi": "A: Bạn thích uống loại trà nào?",
       "py": "A: Nǐ xǐhuān hē nǎ zhǒng chá?"
      },
      {
       "hz": "B：我喜歡喝這種茶。",
       "vi": "B: Tôi thích uống loại trà này.",
       "py": "B: Wǒ xǐhuān hē zhèzhǒng chá."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "I. 這/那/哪 + Nu + M + N",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：這四枝筆怎麼樣？",
       "vi": "A: Bốn cây bút này thế nào?",
       "py": "A: Zhè sìzhī bǐ zěnmeyàng?"
      },
      {
       "hz": "B：這四枝筆很好看。",
       "vi": "B: Bốn cây bút này rất đẹp.",
       "py": "B: Zhè sìzhī bǐ hěn hǎokàn."
      },
      {
       "hz": "A：這兩本中文書很新嗎？",
       "vi": "A: Hai quyển sách tiếng Trung này có mới không?",
       "py": "A: Zhè liǎngběn zhōng wénshū hěn xīn ma?"
      },
      {
       "hz": "B：一本很新，一本不新。",
       "vi": "B: Một quyển mới, một quyển không mới.",
       "py": "B: Yīběn hěn xīn, yìběn bù xīn."
      },
      {
       "hz": "A：這三件衣服漂亮嗎？",
       "vi": "A: Ba bộ quần áo này có đẹp không?",
       "py": "A: Zhè sānjiàn yīfú piàoliàng ma?"
      },
      {
       "hz": "A：那四朵花怎麼樣？",
       "vi": "A: Bốn bông hoa kia thế nào?",
       "py": "A: Nà sìduǒ huā zěnmeyàng?"
      },
      {
       "hz": "A：你想買哪種東西？",
       "vi": "A: Bạn muốn mua loại đồ nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ zhǒng dōngxī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這 / 那 / 哪 + số + lượng từ + danh từ",
   "giaiThich": "這 (này) dùng cho vật ở gần, 那 (kia) cho vật ở xa, 哪 (nào) để hỏi. Số 1 thường được lược bỏ; số 2 đổi thành 兩."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "When a Vs modifies a noun, 的 can be used between them.",
     "examples": [
      {
       "hz": "他是一個快樂的孩子。",
       "vi": "Cậu bé là một đứa trẻ vui vẻ.",
       "py": "Tā shì yígè kuàilè de háizi."
      },
      {
       "hz": "李太太有三個可愛的孩子。",
       "vi": "Bà Lý có ba đứa con dễ thương.",
       "py": "Lǐ tàitai yǒu sāngè kě'ài de háizi."
      },
      {
       "hz": "我喜歡漂亮的花。",
       "vi": "Tôi thích hoa đẹp.",
       "py": "Wǒ xǐhuān piàoliàng de huā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "We often omit 的 when it is used with one-syllable Vs.",
     "examples": [
      {
       "hz": "你有幾個好朋友？",
       "vi": "Bạn có mấy người bạn thân?",
       "py": "Nǐ yǒu jǐgè hǎo péngyǒu?"
      },
      {
       "hz": "我要買一個小蛋糕。",
       "vi": "Tôi muốn mua một cái bánh kem nhỏ.",
       "py": "Wǒ yào mǎi yígè xiǎo dàngāo."
      },
      {
       "hz": "他是我們的新同學。",
       "vi": "Anh ấy là bạn học mới của chúng tôi.",
       "py": "Tā shì wǒmen de xīn tóngxué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": "Nouns, mentioned previously, can be omitted for subsequent usage to avoid repetition; however, the 的 cannot be omitted.",
     "examples": [
      {
       "hz": "A：你們要買哪個蛋糕？",
       "vi": "A: Các bạn muốn mua cái bánh kem nào?",
       "py": "A: Nǐmen yào mǎi nǎge dàngāo?"
      },
      {
       "hz": "B：他要買大的，我要買小的。",
       "vi": "B: Anh ấy muốn mua cái lớn, tôi muốn mua cái nhỏ.",
       "py": "B: Tā yào mǎi dà de, wǒ yào mǎi xiǎo de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "II. 的 as a Modifier Marker",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：你要買哪件衣服？",
       "vi": "A: Bạn muốn mua bộ quần áo nào?",
       "py": "A: Nǐ yào mǎi nǎ jiàn yīfú?"
      },
      {
       "hz": "B：我要買便宜的，不要買貴的。",
       "vi": "B: Tôi muốn mua bộ rẻ, không muốn mua bộ đắt.",
       "py": "B: Wǒ yào mǎi piányi de, búyào mǎi guì de."
      },
      {
       "hz": "A：妳想買哪朵花？",
       "vi": "A: Bạn muốn mua bông hoa nào?",
       "py": "A: Nǐ xiǎng mǎi nǎ duǒhuā?"
      },
      {
       "hz": "B：我想買那朵漂亮的。",
       "vi": "B: Tôi muốn mua bông hoa đẹp kia.",
       "py": "B: Wǒ xiǎng mǎi nà duǒ piàoliàng de."
      },
      {
       "hz": "A：你喜歡哪個禮物？",
       "vi": "A: Bạn thích món quà nào?",
       "py": "A: Nǐ xǐhuān nǎge lǐwù?"
      },
      {
       "hz": "A：你要買哪本書？",
       "vi": "A: Bạn muốn mua quyển sách nào?",
       "py": "A: Nǐ yào mǎi nǎ běnshū?"
      },
      {
       "hz": "A：你喜歡哪個蛋糕？（好看）",
       "vi": "A: Bạn thích cái bánh kem nào? (đẹp)",
       "py": "A: Nǐ xǐhuān nǎge dàngāo? (hǎokàn)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối định ngữ với danh từ",
   "giaiThich": "Khi tính từ (Vs) bổ nghĩa cho danh từ, dùng 的 đặt ở giữa."
  },
  {
   "title": "III. Expressing “Both”, “All” with 都",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這兩件衣服都很漂亮。",
       "vi": "Hai bộ quần áo này đều rất đẹp.",
       "py": "Zhè liǎngjiàn yīfú dōu hěnpiàoliàng."
      },
      {
       "hz": "我們都不要去他家。",
       "vi": "Chúng tôi đều không muốn đến nhà anh ấy.",
       "py": "Wǒmen dōu búyào qù tājiā."
      },
      {
       "hz": "他們都喜歡喝珍珠奶茶嗎？",
       "vi": "Họ đều thích uống trà sữa trân châu phải không?",
       "py": "Tāmen dōu xǐhuān hē zhēnzhūnǎichá ma?"
      },
      {
       "hz": "枝/很/筆/貴/都/五/這/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zhī / hěn / bǐ / guì / dōu / wǔ / zhè /."
      },
      {
       "hz": "人/是/這/個/都/我的同學/四/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Rén / shì / zhè / gè / dōu / wǒ de tóngxué / sì /."
      },
      {
       "hz": "都/這種/喜歡/不/喝/他們/茶/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dōu / zhèzhǒng / xǐhuān / bù / hē / tāmen / chá /."
      },
      {
       "hz": "這個星期天是誰的生日？",
       "vi": "Chủ nhật tuần này là sinh nhật của ai?",
       "py": "Zhège xīngqítiān shì shéi de shēngrì?"
      },
      {
       "hz": "他們買什麼送友美？",
       "vi": "Họ mua gì tặng Yumi?",
       "py": "Tāmen mǎi shénme sòng Yǒuměi?"
      },
      {
       "hz": "友美請他們吃什麼？",
       "vi": "Yumi mời họ ăn gì?",
       "py": "Yǒuměi qǐng tāmen chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"đều\" với 都",
   "giaiThich": "都 là phó từ, đứng sau chủ ngữ và trước động từ/tính từ, mang nghĩa \"đều, tất cả\"."
  }
 ],
 "td1-4.1": [
  {
   "title": "I. Transposed Objects",
   "points": [
    {
     "label": null,
     "formula": "An object can be moved to the beginning of a sentence, and it then becomes a topic. A topic is a certain part we would like to emphasize in a sentence.",
     "examples": [
      {
       "hz": "茶，我喜歡；咖啡，我不喜歡。",
       "vi": "Trà thì tôi thích; cà phê thì tôi không thích.",
       "py": "Chá, wǒ xǐhuān; kāfēi, wǒ bù xǐhuān."
      },
      {
       "hz": "這枝鉛筆，我要；那枝鉛筆，我不要。",
       "vi": "Cây bút chì này thì tôi lấy; cây bút chì kia thì tôi không lấy.",
       "py": "Zhè zhī qiānbǐ, wǒ yào; nà zhī qiānbǐ, wǒ búyào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu",
   "giaiThich": "Tân ngữ có thể đưa lên đầu câu để làm chủ đề — phần muốn nhấn mạnh."
  },
  {
   "title": "I. Transposed objects",
   "points": [
    {
     "label": null,
     "formula": "(2)Plural Topic: When the topic is plural, 都 is used after the topic.",
     "examples": [
      {
       "hz": "A:你要哪個禮物？",
       "vi": "A: Bạn muốn món quà nào?",
       "py": "A: Nǐ yào nǎge lǐwù?"
      },
      {
       "hz": "B:大的、小的，我都要。",
       "vi": "B: Cái lớn, cái nhỏ, tôi đều muốn.",
       "py": "B: Dà de, xiǎo de, wǒ dōu yào."
      },
      {
       "hz": "A:你想吃哪種蛋糕？",
       "vi": "A: Bạn muốn ăn loại bánh kem nào?",
       "py": "A: Nǐ xiǎng chī nǎ zhǒng dàngāo?"
      },
      {
       "hz": "B:這兩種蛋糕，我都不想吃。",
       "vi": "B: Hai loại bánh kem này tôi đều không muốn ăn.",
       "py": "B: Zhè liǎngzhǒng dàngāo, wǒ dōu bùxiǎng chī."
      },
      {
       "hz": "A:你喜歡紅色的衣服嗎？",
       "vi": "A: Bạn có thích quần áo màu đỏ không?",
       "py": "A: Nǐ xǐhuān hóngsè de yīfú ma?"
      },
      {
       "hz": "A:你要買這種鉛筆嗎？",
       "vi": "A: Bạn có muốn mua loại bút chì này không?",
       "py": "A: Nǐ yào mǎi zhèzhǒng qiānbǐ ma?"
      },
      {
       "hz": "A:你喜歡吃什麼東西？",
       "vi": "A: Bạn thích ăn món gì?",
       "py": "A: Nǐ xǐhuān chī shénme dōngxī?"
      },
      {
       "hz": "A:你喜歡什麼生日禮物？",
       "vi": "A: Bạn thích quà sinh nhật gì?",
       "py": "A: Nǐ xǐhuān shénme shēngrìlǐwù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu (chủ đề số nhiều)",
   "giaiThich": "Khi chủ đề đưa lên đầu là số nhiều thì thêm 都 ngay sau chủ đề."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs.",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs. (2) When the subjects are different",
     "examples": [
      {
       "hz": "A:你喜歡什麼顏色？",
       "vi": "A: Bạn thích màu gì?",
       "py": "A: Nǐ xǐhuān shénme yánsè?"
      },
      {
       "hz": "B:我喜歡紅色，也喜歡白色。",
       "vi": "B: Tôi thích màu đỏ, cũng thích màu trắng.",
       "py": "B: Wǒ xǐhuān hóngsè, yě xǐhuān báisè."
      },
      {
       "hz": "A:你們要喝什麼飲料？",
       "vi": "A: Các bạn muốn uống đồ uống gì?",
       "py": "A: Nǐmen yào hē shénme yǐnliào?"
      },
      {
       "hz": "B:他要喝奶茶，我也要喝奶茶。",
       "vi": "B: Anh ấy muốn uống trà sữa, tôi cũng muốn uống trà sữa.",
       "py": "B: Tā yào hē nǎichá, wǒ yě yào hē nǎichá."
      },
      {
       "hz": "A:哪件衣服好看？",
       "vi": "A: Bộ quần áo nào đẹp?",
       "py": "A: Nǎ jiàn yīfú hǎokàn?"
      },
      {
       "hz": "B:這件衣服很好看，那件衣服也很好看。",
       "vi": "B: Bộ quần áo này rất đẹp, bộ kia cũng rất đẹp.",
       "py": "B: Zhèjiàn yīfú hěn hǎokàn, nà jiàn yīfú yě hěn hǎokàn."
      },
      {
       "hz": "A:你要吃什麼？",
       "vi": "A: Bạn muốn ăn gì?",
       "py": "A: Nǐ yào chī shénme?"
      },
      {
       "hz": "A:誰喜歡買便宜的東西？",
       "vi": "A: Ai thích mua đồ rẻ?",
       "py": "A: Shéi xǐhuān mǎi piányi de dōngxī?"
      },
      {
       "hz": "A:那家餐廳什麼好吃？",
       "vi": "A: Nhà hàng đó có món gì ngon?",
       "py": "A: Nà jiā cāntīng shénme hǎochī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:今天天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiāntiānqì zěnmeyàng?"
      },
      {
       "hz": "B:今天太熱了。",
       "vi": "B: Hôm nay nóng quá.",
       "py": "B: Jīntiān tài rè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你今天好嗎？",
       "vi": "A: Hôm nay bạn khoẻ không?",
       "py": "A: Nǐ jīntiān hǎo ma?"
      },
      {
       "hz": "B:我今天太累了，現在很想睡覺。",
       "vi": "B: Hôm nay tôi mệt quá, bây giờ rất muốn ngủ.",
       "py": "B: Wǒ jīntiān tài lèi le, xiànzài hěn xiǎng shuìjiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": "Qǐngwèn yì wǎn niúròu miàn mài yì bǎi kuài qián, nǐ xiǎng guì háishì piányí? Nǐ de guójiā, nán, nǚ péngyǒu yìqǐ chīfàn, chángcháng shéi gěi qián?",
     "examples": [
      {
       "hz": "A:那家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Mì bò của nhà hàng đó thế nào?",
       "py": "A: Nà jiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "B:太好吃了，我常常去吃。",
       "vi": "B: Ngon lắm, tôi thường đến đó ăn.",
       "py": "B: Tài hǎochī le, wǒ chángcháng qù chī."
      },
      {
       "hz": "A:這件衣服怎麼樣？",
       "vi": "A: Bộ quần áo này thế nào?",
       "py": "A: Zhèjiàn yīfú zěnmeyàng?"
      },
      {
       "hz": "A:他現在怎麼樣？",
       "vi": "A: Bây giờ anh ấy thế nào?",
       "py": "A: Tā xiànzài zěnmeyàng?"
      },
      {
       "hz": "A:珍珠奶茶怎麼樣？",
       "vi": "A: Trà sữa trân châu thế nào?",
       "py": "A: Zhēnzhūnǎichá zěnmeyàng?"
      },
      {
       "hz": "中明和友美點什麼？",
       "vi": "Trung Minh và Yumi gọi món gì?",
       "py": "Zhōngmíng hàn Yǒuměi diǎn shénme?"
      },
      {
       "hz": "中明想一共兩百一十五塊，貴不貴？",
       "vi": "Trung Minh nghĩ tổng cộng hai trăm mười lăm đồng thì có đắt không?",
       "py": "Zhōngmíng xiǎng yígòng liǎngbǎi yì shíwǔkuài, guì bú guì?"
      },
      {
       "hz": "請問一碗牛肉麵賣一百塊錢，你想貴還是便宜？",
       "vi": "Cho hỏi, một bát mì bò bán một trăm đồng, bạn thấy đắt hay rẻ?",
       "py": "Qǐngwèn yìwǎn niúròumiàn mài yìbǎikuài qián, nǐ xiǎng guì háishì piányi?"
      },
      {
       "hz": "你喜歡吃什麼？喝什麼？",
       "vi": "Bạn thích ăn gì? Uống gì?",
       "py": "Nǐ xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你的國家，男、女朋友一起吃飯，常常誰給錢？",
       "vi": "Ở nước bạn, khi bạn trai bạn gái đi ăn cùng nhau, thường thì ai trả tiền?",
       "py": "Nǐ de guójiā, nán, nǚpéngyǒu yìqǐ chīfàn, chángcháng shéi gěiqián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "1. Please read the following numbers.",
   "points": [
    {
     "label": null,
     "formula": "2. Read the following cell phone numbers. 3 .Read the following nouns (with measure words).",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Luyện đọc số và lượng từ",
   "giaiThich": "Phần luyện đọc: đọc số, đọc số điện thoại, đọc danh từ kèm lượng từ."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "一百多枝鉛筆 (101~199)六萬多個學生 (60,001~69,999)",
       "vi": "Hơn một trăm cây bút chì (101–199); hơn sáu vạn học sinh (60.001–69.999)",
       "py": "Yìbǎiduō zhī qiānbǐ (101~199) liùwànduō gè xuéshēng (60,001~69,999)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:現在你有多少錢？",
       "vi": "A: Bây giờ bạn có bao nhiêu tiền?",
       "py": "A: Xiànzài nǐ yǒu duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:你們學校有多少學生？",
       "vi": "A: Trường các bạn có bao nhiêu học sinh?",
       "py": "A: Nǐmen xuéxiào yǒu duōshǎo xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:這支手機多少錢？",
       "vi": "A: Chiếc điện thoại này bao nhiêu tiền?",
       "py": "A: Zhè zhī shǒujī duōshǎo qián?"
      },
      {
       "hz": "B:一萬多塊錢。",
       "vi": "B: Hơn một vạn đồng.",
       "py": "B: Yīwànduōkuài qián."
      },
      {
       "hz": "A:一共多少人？",
       "vi": "A: Tổng cộng bao nhiêu người?",
       "py": "A: Yīgòng duōshǎo rén?"
      },
      {
       "hz": "A:兩杯紅茶多少錢？",
       "vi": "A: Hai cốc hồng trà bao nhiêu tiền?",
       "py": "A: Liǎngbēi hóngchá duōshǎo qián?"
      },
      {
       "hz": "A:這件衣服多少錢？",
       "vi": "A: Bộ quần áo này bao nhiêu tiền?",
       "py": "A: Zhèjiàn yīfú duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [
      {
       "hz": "A:現在幾點？",
       "vi": "A: Bây giờ mấy giờ rồi?",
       "py": "A: Xiànzài jǐdiǎn?"
      },
      {
       "hz": "A:李(Lǐ)先生的孩子幾歲？",
       "vi": "A: Con của anh Lý mấy tuổi?",
       "py": "A: Lǐ xiānshēng de háizi jǐsuì?"
      },
      {
       "hz": "A:這些東西一共多少錢？",
       "vi": "A: Những thứ này tổng cộng bao nhiêu tiền?",
       "py": "A: Zhèxiē dōngxī yígòng duōshǎo qián?"
      },
      {
       "hz": "台灣的夏天很熱，很多人都喜歡做什麼？",
       "vi": "Mùa hè ở Đài Loan rất nóng, nhiều người thích làm gì?",
       "py": "Táiwān de xiàtiān hěn rè, hěnduō rén dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "台灣的飲料店賣哪些飲料？",
       "vi": "Các tiệm đồ uống ở Đài Loan bán những loại đồ uống nào?",
       "py": "Táiwān de yǐnliàodiàn mài nǎxiē yǐnliào?"
      },
      {
       "hz": "你喜歡喝飲料店的哪種飲料？",
       "vi": "Bạn thích uống loại đồ uống nào ở tiệm đồ uống?",
       "py": "Nǐ xǐhuān hē yǐnliàodiàn de nǎ zhǒng yǐnliào?"
      },
      {
       "hz": "你國家的人夏天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa hè thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén xiàtiān xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你國家的人冬天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa đông thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén dōngtiān xǐhuān chī shénme? Hē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  }
 ],
 "td1-4.2": [
  {
   "title": "I. Transposed Objects",
   "points": [
    {
     "label": null,
     "formula": "An object can be moved to the beginning of a sentence, and it then becomes a topic. A topic is a certain part we would like to emphasize in a sentence.",
     "examples": [
      {
       "hz": "茶，我喜歡；咖啡，我不喜歡。",
       "vi": "Trà thì tôi thích; cà phê thì tôi không thích.",
       "py": "Chá, wǒ xǐhuān; kāfēi, wǒ bù xǐhuān."
      },
      {
       "hz": "這枝鉛筆，我要；那枝鉛筆，我不要。",
       "vi": "Cây bút chì này thì tôi lấy; cây bút chì kia thì tôi không lấy.",
       "py": "Zhè zhī qiānbǐ, wǒ yào; nà zhī qiānbǐ, wǒ búyào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu",
   "giaiThich": "Tân ngữ có thể đưa lên đầu câu để làm chủ đề — phần muốn nhấn mạnh."
  },
  {
   "title": "I. Transposed objects",
   "points": [
    {
     "label": null,
     "formula": "(2)Plural Topic: When the topic is plural, 都 is used after the topic.",
     "examples": [
      {
       "hz": "A:你要哪個禮物？",
       "vi": "A: Bạn muốn món quà nào?",
       "py": "A: Nǐ yào nǎge lǐwù?"
      },
      {
       "hz": "B:大的、小的，我都要。",
       "vi": "B: Cái lớn, cái nhỏ, tôi đều muốn.",
       "py": "B: Dà de, xiǎo de, wǒ dōu yào."
      },
      {
       "hz": "A:你想吃哪種蛋糕？",
       "vi": "A: Bạn muốn ăn loại bánh kem nào?",
       "py": "A: Nǐ xiǎng chī nǎ zhǒng dàngāo?"
      },
      {
       "hz": "B:這兩種蛋糕，我都不想吃。",
       "vi": "B: Hai loại bánh kem này tôi đều không muốn ăn.",
       "py": "B: Zhè liǎngzhǒng dàngāo, wǒ dōu bùxiǎng chī."
      },
      {
       "hz": "A:你喜歡紅色的衣服嗎？",
       "vi": "A: Bạn có thích quần áo màu đỏ không?",
       "py": "A: Nǐ xǐhuān hóngsè de yīfú ma?"
      },
      {
       "hz": "A:你要買這種鉛筆嗎？",
       "vi": "A: Bạn có muốn mua loại bút chì này không?",
       "py": "A: Nǐ yào mǎi zhèzhǒng qiānbǐ ma?"
      },
      {
       "hz": "A:你喜歡吃什麼東西？",
       "vi": "A: Bạn thích ăn món gì?",
       "py": "A: Nǐ xǐhuān chī shénme dōngxī?"
      },
      {
       "hz": "A:你喜歡什麼生日禮物？",
       "vi": "A: Bạn thích quà sinh nhật gì?",
       "py": "A: Nǐ xǐhuān shénme shēngrìlǐwù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu (chủ đề số nhiều)",
   "giaiThich": "Khi chủ đề đưa lên đầu là số nhiều thì thêm 都 ngay sau chủ đề."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs.",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs. (2) When the subjects are different",
     "examples": [
      {
       "hz": "A:你喜歡什麼顏色？",
       "vi": "A: Bạn thích màu gì?",
       "py": "A: Nǐ xǐhuān shénme yánsè?"
      },
      {
       "hz": "B:我喜歡紅色，也喜歡白色。",
       "vi": "B: Tôi thích màu đỏ, cũng thích màu trắng.",
       "py": "B: Wǒ xǐhuān hóngsè, yě xǐhuān báisè."
      },
      {
       "hz": "A:你們要喝什麼飲料？",
       "vi": "A: Các bạn muốn uống đồ uống gì?",
       "py": "A: Nǐmen yào hē shénme yǐnliào?"
      },
      {
       "hz": "B:他要喝奶茶，我也要喝奶茶。",
       "vi": "B: Anh ấy muốn uống trà sữa, tôi cũng muốn uống trà sữa.",
       "py": "B: Tā yào hē nǎichá, wǒ yě yào hē nǎichá."
      },
      {
       "hz": "A:哪件衣服好看？",
       "vi": "A: Bộ quần áo nào đẹp?",
       "py": "A: Nǎ jiàn yīfú hǎokàn?"
      },
      {
       "hz": "B:這件衣服很好看，那件衣服也很好看。",
       "vi": "B: Bộ quần áo này rất đẹp, bộ kia cũng rất đẹp.",
       "py": "B: Zhèjiàn yīfú hěn hǎokàn, nà jiàn yīfú yě hěn hǎokàn."
      },
      {
       "hz": "A:你要吃什麼？",
       "vi": "A: Bạn muốn ăn gì?",
       "py": "A: Nǐ yào chī shénme?"
      },
      {
       "hz": "A:誰喜歡買便宜的東西？",
       "vi": "A: Ai thích mua đồ rẻ?",
       "py": "A: Shéi xǐhuān mǎi piányi de dōngxī?"
      },
      {
       "hz": "A:那家餐廳什麼好吃？",
       "vi": "A: Nhà hàng đó có món gì ngon?",
       "py": "A: Nà jiā cāntīng shénme hǎochī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:今天天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiāntiānqì zěnmeyàng?"
      },
      {
       "hz": "B:今天太熱了。",
       "vi": "B: Hôm nay nóng quá.",
       "py": "B: Jīntiān tài rè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你今天好嗎？",
       "vi": "A: Hôm nay bạn khoẻ không?",
       "py": "A: Nǐ jīntiān hǎo ma?"
      },
      {
       "hz": "B:我今天太累了，現在很想睡覺。",
       "vi": "B: Hôm nay tôi mệt quá, bây giờ rất muốn ngủ.",
       "py": "B: Wǒ jīntiān tài lèi le, xiànzài hěn xiǎng shuìjiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": "Qǐngwèn yì wǎn niúròu miàn mài yì bǎi kuài qián, nǐ xiǎng guì háishì piányí? Nǐ de guójiā, nán, nǚ péngyǒu yìqǐ chīfàn, chángcháng shéi gěi qián?",
     "examples": [
      {
       "hz": "A:那家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Mì bò của nhà hàng đó thế nào?",
       "py": "A: Nà jiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "B:太好吃了，我常常去吃。",
       "vi": "B: Ngon lắm, tôi thường đến đó ăn.",
       "py": "B: Tài hǎochī le, wǒ chángcháng qù chī."
      },
      {
       "hz": "A:這件衣服怎麼樣？",
       "vi": "A: Bộ quần áo này thế nào?",
       "py": "A: Zhèjiàn yīfú zěnmeyàng?"
      },
      {
       "hz": "A:他現在怎麼樣？",
       "vi": "A: Bây giờ anh ấy thế nào?",
       "py": "A: Tā xiànzài zěnmeyàng?"
      },
      {
       "hz": "A:珍珠奶茶怎麼樣？",
       "vi": "A: Trà sữa trân châu thế nào?",
       "py": "A: Zhēnzhūnǎichá zěnmeyàng?"
      },
      {
       "hz": "中明和友美點什麼？",
       "vi": "Trung Minh và Yumi gọi món gì?",
       "py": "Zhōngmíng hàn Yǒuměi diǎn shénme?"
      },
      {
       "hz": "中明想一共兩百一十五塊，貴不貴？",
       "vi": "Trung Minh nghĩ tổng cộng hai trăm mười lăm đồng thì có đắt không?",
       "py": "Zhōngmíng xiǎng yígòng liǎngbǎi yì shíwǔkuài, guì bú guì?"
      },
      {
       "hz": "請問一碗牛肉麵賣一百塊錢，你想貴還是便宜？",
       "vi": "Cho hỏi, một bát mì bò bán một trăm đồng, bạn thấy đắt hay rẻ?",
       "py": "Qǐngwèn yìwǎn niúròumiàn mài yìbǎikuài qián, nǐ xiǎng guì háishì piányi?"
      },
      {
       "hz": "你喜歡吃什麼？喝什麼？",
       "vi": "Bạn thích ăn gì? Uống gì?",
       "py": "Nǐ xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你的國家，男、女朋友一起吃飯，常常誰給錢？",
       "vi": "Ở nước bạn, khi bạn trai bạn gái đi ăn cùng nhau, thường thì ai trả tiền?",
       "py": "Nǐ de guójiā, nán, nǚpéngyǒu yìqǐ chīfàn, chángcháng shéi gěiqián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "1. Please read the following numbers.",
   "points": [
    {
     "label": null,
     "formula": "2. Read the following cell phone numbers. 3 .Read the following nouns (with measure words).",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Luyện đọc số và lượng từ",
   "giaiThich": "Phần luyện đọc: đọc số, đọc số điện thoại, đọc danh từ kèm lượng từ."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "一百多枝鉛筆 (101~199)六萬多個學生 (60,001~69,999)",
       "vi": "Hơn một trăm cây bút chì (101–199); hơn sáu vạn học sinh (60.001–69.999)",
       "py": "Yìbǎiduō zhī qiānbǐ (101~199) liùwànduō gè xuéshēng (60,001~69,999)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:現在你有多少錢？",
       "vi": "A: Bây giờ bạn có bao nhiêu tiền?",
       "py": "A: Xiànzài nǐ yǒu duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:你們學校有多少學生？",
       "vi": "A: Trường các bạn có bao nhiêu học sinh?",
       "py": "A: Nǐmen xuéxiào yǒu duōshǎo xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:這支手機多少錢？",
       "vi": "A: Chiếc điện thoại này bao nhiêu tiền?",
       "py": "A: Zhè zhī shǒujī duōshǎo qián?"
      },
      {
       "hz": "B:一萬多塊錢。",
       "vi": "B: Hơn một vạn đồng.",
       "py": "B: Yīwànduōkuài qián."
      },
      {
       "hz": "A:一共多少人？",
       "vi": "A: Tổng cộng bao nhiêu người?",
       "py": "A: Yīgòng duōshǎo rén?"
      },
      {
       "hz": "A:兩杯紅茶多少錢？",
       "vi": "A: Hai cốc hồng trà bao nhiêu tiền?",
       "py": "A: Liǎngbēi hóngchá duōshǎo qián?"
      },
      {
       "hz": "A:這件衣服多少錢？",
       "vi": "A: Bộ quần áo này bao nhiêu tiền?",
       "py": "A: Zhèjiàn yīfú duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [
      {
       "hz": "A:現在幾點？",
       "vi": "A: Bây giờ mấy giờ rồi?",
       "py": "A: Xiànzài jǐdiǎn?"
      },
      {
       "hz": "A:李(Lǐ)先生的孩子幾歲？",
       "vi": "A: Con của anh Lý mấy tuổi?",
       "py": "A: Lǐ xiānshēng de háizi jǐsuì?"
      },
      {
       "hz": "A:這些東西一共多少錢？",
       "vi": "A: Những thứ này tổng cộng bao nhiêu tiền?",
       "py": "A: Zhèxiē dōngxī yígòng duōshǎo qián?"
      },
      {
       "hz": "台灣的夏天很熱，很多人都喜歡做什麼？",
       "vi": "Mùa hè ở Đài Loan rất nóng, nhiều người thích làm gì?",
       "py": "Táiwān de xiàtiān hěn rè, hěnduō rén dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "台灣的飲料店賣哪些飲料？",
       "vi": "Các tiệm đồ uống ở Đài Loan bán những loại đồ uống nào?",
       "py": "Táiwān de yǐnliàodiàn mài nǎxiē yǐnliào?"
      },
      {
       "hz": "你喜歡喝飲料店的哪種飲料？",
       "vi": "Bạn thích uống loại đồ uống nào ở tiệm đồ uống?",
       "py": "Nǐ xǐhuān hē yǐnliàodiàn de nǎ zhǒng yǐnliào?"
      },
      {
       "hz": "你國家的人夏天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa hè thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén xiàtiān xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你國家的人冬天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa đông thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén dōngtiān xǐhuān chī shénme? Hē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  }
 ],
 "td1-4.3": [
  {
   "title": "I. Transposed Objects",
   "points": [
    {
     "label": null,
     "formula": "An object can be moved to the beginning of a sentence, and it then becomes a topic. A topic is a certain part we would like to emphasize in a sentence.",
     "examples": [
      {
       "hz": "茶，我喜歡；咖啡，我不喜歡。",
       "vi": "Trà thì tôi thích; cà phê thì tôi không thích.",
       "py": "Chá, wǒ xǐhuān; kāfēi, wǒ bù xǐhuān."
      },
      {
       "hz": "這枝鉛筆，我要；那枝鉛筆，我不要。",
       "vi": "Cây bút chì này thì tôi lấy; cây bút chì kia thì tôi không lấy.",
       "py": "Zhè zhī qiānbǐ, wǒ yào; nà zhī qiānbǐ, wǒ búyào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu",
   "giaiThich": "Tân ngữ có thể đưa lên đầu câu để làm chủ đề — phần muốn nhấn mạnh."
  },
  {
   "title": "I. Transposed objects",
   "points": [
    {
     "label": null,
     "formula": "(2)Plural Topic: When the topic is plural, 都 is used after the topic.",
     "examples": [
      {
       "hz": "A:你要哪個禮物？",
       "vi": "A: Bạn muốn món quà nào?",
       "py": "A: Nǐ yào nǎge lǐwù?"
      },
      {
       "hz": "B:大的、小的，我都要。",
       "vi": "B: Cái lớn, cái nhỏ, tôi đều muốn.",
       "py": "B: Dà de, xiǎo de, wǒ dōu yào."
      },
      {
       "hz": "A:你想吃哪種蛋糕？",
       "vi": "A: Bạn muốn ăn loại bánh kem nào?",
       "py": "A: Nǐ xiǎng chī nǎ zhǒng dàngāo?"
      },
      {
       "hz": "B:這兩種蛋糕，我都不想吃。",
       "vi": "B: Hai loại bánh kem này tôi đều không muốn ăn.",
       "py": "B: Zhè liǎngzhǒng dàngāo, wǒ dōu bùxiǎng chī."
      },
      {
       "hz": "A:你喜歡紅色的衣服嗎？",
       "vi": "A: Bạn có thích quần áo màu đỏ không?",
       "py": "A: Nǐ xǐhuān hóngsè de yīfú ma?"
      },
      {
       "hz": "A:你要買這種鉛筆嗎？",
       "vi": "A: Bạn có muốn mua loại bút chì này không?",
       "py": "A: Nǐ yào mǎi zhèzhǒng qiānbǐ ma?"
      },
      {
       "hz": "A:你喜歡吃什麼東西？",
       "vi": "A: Bạn thích ăn món gì?",
       "py": "A: Nǐ xǐhuān chī shénme dōngxī?"
      },
      {
       "hz": "A:你喜歡什麼生日禮物？",
       "vi": "A: Bạn thích quà sinh nhật gì?",
       "py": "A: Nǐ xǐhuān shénme shēngrìlǐwù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu (chủ đề số nhiều)",
   "giaiThich": "Khi chủ đề đưa lên đầu là số nhiều thì thêm 都 ngay sau chủ đề."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs.",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs. (2) When the subjects are different",
     "examples": [
      {
       "hz": "A:你喜歡什麼顏色？",
       "vi": "A: Bạn thích màu gì?",
       "py": "A: Nǐ xǐhuān shénme yánsè?"
      },
      {
       "hz": "B:我喜歡紅色，也喜歡白色。",
       "vi": "B: Tôi thích màu đỏ, cũng thích màu trắng.",
       "py": "B: Wǒ xǐhuān hóngsè, yě xǐhuān báisè."
      },
      {
       "hz": "A:你們要喝什麼飲料？",
       "vi": "A: Các bạn muốn uống đồ uống gì?",
       "py": "A: Nǐmen yào hē shénme yǐnliào?"
      },
      {
       "hz": "B:他要喝奶茶，我也要喝奶茶。",
       "vi": "B: Anh ấy muốn uống trà sữa, tôi cũng muốn uống trà sữa.",
       "py": "B: Tā yào hē nǎichá, wǒ yě yào hē nǎichá."
      },
      {
       "hz": "A:哪件衣服好看？",
       "vi": "A: Bộ quần áo nào đẹp?",
       "py": "A: Nǎ jiàn yīfú hǎokàn?"
      },
      {
       "hz": "B:這件衣服很好看，那件衣服也很好看。",
       "vi": "B: Bộ quần áo này rất đẹp, bộ kia cũng rất đẹp.",
       "py": "B: Zhèjiàn yīfú hěn hǎokàn, nà jiàn yīfú yě hěn hǎokàn."
      },
      {
       "hz": "A:你要吃什麼？",
       "vi": "A: Bạn muốn ăn gì?",
       "py": "A: Nǐ yào chī shénme?"
      },
      {
       "hz": "A:誰喜歡買便宜的東西？",
       "vi": "A: Ai thích mua đồ rẻ?",
       "py": "A: Shéi xǐhuān mǎi piányi de dōngxī?"
      },
      {
       "hz": "A:那家餐廳什麼好吃？",
       "vi": "A: Nhà hàng đó có món gì ngon?",
       "py": "A: Nà jiā cāntīng shénme hǎochī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:今天天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiāntiānqì zěnmeyàng?"
      },
      {
       "hz": "B:今天太熱了。",
       "vi": "B: Hôm nay nóng quá.",
       "py": "B: Jīntiān tài rè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你今天好嗎？",
       "vi": "A: Hôm nay bạn khoẻ không?",
       "py": "A: Nǐ jīntiān hǎo ma?"
      },
      {
       "hz": "B:我今天太累了，現在很想睡覺。",
       "vi": "B: Hôm nay tôi mệt quá, bây giờ rất muốn ngủ.",
       "py": "B: Wǒ jīntiān tài lèi le, xiànzài hěn xiǎng shuìjiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": "Qǐngwèn yì wǎn niúròu miàn mài yì bǎi kuài qián, nǐ xiǎng guì háishì piányí? Nǐ de guójiā, nán, nǚ péngyǒu yìqǐ chīfàn, chángcháng shéi gěi qián?",
     "examples": [
      {
       "hz": "A:那家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Mì bò của nhà hàng đó thế nào?",
       "py": "A: Nà jiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "B:太好吃了，我常常去吃。",
       "vi": "B: Ngon lắm, tôi thường đến đó ăn.",
       "py": "B: Tài hǎochī le, wǒ chángcháng qù chī."
      },
      {
       "hz": "A:這件衣服怎麼樣？",
       "vi": "A: Bộ quần áo này thế nào?",
       "py": "A: Zhèjiàn yīfú zěnmeyàng?"
      },
      {
       "hz": "A:他現在怎麼樣？",
       "vi": "A: Bây giờ anh ấy thế nào?",
       "py": "A: Tā xiànzài zěnmeyàng?"
      },
      {
       "hz": "A:珍珠奶茶怎麼樣？",
       "vi": "A: Trà sữa trân châu thế nào?",
       "py": "A: Zhēnzhūnǎichá zěnmeyàng?"
      },
      {
       "hz": "中明和友美點什麼？",
       "vi": "Trung Minh và Yumi gọi món gì?",
       "py": "Zhōngmíng hàn Yǒuměi diǎn shénme?"
      },
      {
       "hz": "中明想一共兩百一十五塊，貴不貴？",
       "vi": "Trung Minh nghĩ tổng cộng hai trăm mười lăm đồng thì có đắt không?",
       "py": "Zhōngmíng xiǎng yígòng liǎngbǎi yì shíwǔkuài, guì bú guì?"
      },
      {
       "hz": "請問一碗牛肉麵賣一百塊錢，你想貴還是便宜？",
       "vi": "Cho hỏi, một bát mì bò bán một trăm đồng, bạn thấy đắt hay rẻ?",
       "py": "Qǐngwèn yìwǎn niúròumiàn mài yìbǎikuài qián, nǐ xiǎng guì háishì piányi?"
      },
      {
       "hz": "你喜歡吃什麼？喝什麼？",
       "vi": "Bạn thích ăn gì? Uống gì?",
       "py": "Nǐ xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你的國家，男、女朋友一起吃飯，常常誰給錢？",
       "vi": "Ở nước bạn, khi bạn trai bạn gái đi ăn cùng nhau, thường thì ai trả tiền?",
       "py": "Nǐ de guójiā, nán, nǚpéngyǒu yìqǐ chīfàn, chángcháng shéi gěiqián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "1. Please read the following numbers.",
   "points": [
    {
     "label": null,
     "formula": "2. Read the following cell phone numbers. 3 .Read the following nouns (with measure words).",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Luyện đọc số và lượng từ",
   "giaiThich": "Phần luyện đọc: đọc số, đọc số điện thoại, đọc danh từ kèm lượng từ."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "一百多枝鉛筆 (101~199)六萬多個學生 (60,001~69,999)",
       "vi": "Hơn một trăm cây bút chì (101–199); hơn sáu vạn học sinh (60.001–69.999)",
       "py": "Yìbǎiduō zhī qiānbǐ (101~199) liùwànduō gè xuéshēng (60,001~69,999)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:現在你有多少錢？",
       "vi": "A: Bây giờ bạn có bao nhiêu tiền?",
       "py": "A: Xiànzài nǐ yǒu duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:你們學校有多少學生？",
       "vi": "A: Trường các bạn có bao nhiêu học sinh?",
       "py": "A: Nǐmen xuéxiào yǒu duōshǎo xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:這支手機多少錢？",
       "vi": "A: Chiếc điện thoại này bao nhiêu tiền?",
       "py": "A: Zhè zhī shǒujī duōshǎo qián?"
      },
      {
       "hz": "B:一萬多塊錢。",
       "vi": "B: Hơn một vạn đồng.",
       "py": "B: Yīwànduōkuài qián."
      },
      {
       "hz": "A:一共多少人？",
       "vi": "A: Tổng cộng bao nhiêu người?",
       "py": "A: Yīgòng duōshǎo rén?"
      },
      {
       "hz": "A:兩杯紅茶多少錢？",
       "vi": "A: Hai cốc hồng trà bao nhiêu tiền?",
       "py": "A: Liǎngbēi hóngchá duōshǎo qián?"
      },
      {
       "hz": "A:這件衣服多少錢？",
       "vi": "A: Bộ quần áo này bao nhiêu tiền?",
       "py": "A: Zhèjiàn yīfú duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [
      {
       "hz": "A:現在幾點？",
       "vi": "A: Bây giờ mấy giờ rồi?",
       "py": "A: Xiànzài jǐdiǎn?"
      },
      {
       "hz": "A:李(Lǐ)先生的孩子幾歲？",
       "vi": "A: Con của anh Lý mấy tuổi?",
       "py": "A: Lǐ xiānshēng de háizi jǐsuì?"
      },
      {
       "hz": "A:這些東西一共多少錢？",
       "vi": "A: Những thứ này tổng cộng bao nhiêu tiền?",
       "py": "A: Zhèxiē dōngxī yígòng duōshǎo qián?"
      },
      {
       "hz": "台灣的夏天很熱，很多人都喜歡做什麼？",
       "vi": "Mùa hè ở Đài Loan rất nóng, nhiều người thích làm gì?",
       "py": "Táiwān de xiàtiān hěn rè, hěnduō rén dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "台灣的飲料店賣哪些飲料？",
       "vi": "Các tiệm đồ uống ở Đài Loan bán những loại đồ uống nào?",
       "py": "Táiwān de yǐnliàodiàn mài nǎxiē yǐnliào?"
      },
      {
       "hz": "你喜歡喝飲料店的哪種飲料？",
       "vi": "Bạn thích uống loại đồ uống nào ở tiệm đồ uống?",
       "py": "Nǐ xǐhuān hē yǐnliàodiàn de nǎ zhǒng yǐnliào?"
      },
      {
       "hz": "你國家的人夏天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa hè thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén xiàtiān xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你國家的人冬天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa đông thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén dōngtiān xǐhuān chī shénme? Hē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  }
 ],
 "td1-4.4": [
  {
   "title": "I. Transposed Objects",
   "points": [
    {
     "label": null,
     "formula": "An object can be moved to the beginning of a sentence, and it then becomes a topic. A topic is a certain part we would like to emphasize in a sentence.",
     "examples": [
      {
       "hz": "茶，我喜歡；咖啡，我不喜歡。",
       "vi": "Trà thì tôi thích; cà phê thì tôi không thích.",
       "py": "Chá, wǒ xǐhuān; kāfēi, wǒ bù xǐhuān."
      },
      {
       "hz": "這枝鉛筆，我要；那枝鉛筆，我不要。",
       "vi": "Cây bút chì này thì tôi lấy; cây bút chì kia thì tôi không lấy.",
       "py": "Zhè zhī qiānbǐ, wǒ yào; nà zhī qiānbǐ, wǒ búyào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu",
   "giaiThich": "Tân ngữ có thể đưa lên đầu câu để làm chủ đề — phần muốn nhấn mạnh."
  },
  {
   "title": "I. Transposed objects",
   "points": [
    {
     "label": null,
     "formula": "(2)Plural Topic: When the topic is plural, 都 is used after the topic.",
     "examples": [
      {
       "hz": "A:你要哪個禮物？",
       "vi": "A: Bạn muốn món quà nào?",
       "py": "A: Nǐ yào nǎge lǐwù?"
      },
      {
       "hz": "B:大的、小的，我都要。",
       "vi": "B: Cái lớn, cái nhỏ, tôi đều muốn.",
       "py": "B: Dà de, xiǎo de, wǒ dōu yào."
      },
      {
       "hz": "A:你想吃哪種蛋糕？",
       "vi": "A: Bạn muốn ăn loại bánh kem nào?",
       "py": "A: Nǐ xiǎng chī nǎ zhǒng dàngāo?"
      },
      {
       "hz": "B:這兩種蛋糕，我都不想吃。",
       "vi": "B: Hai loại bánh kem này tôi đều không muốn ăn.",
       "py": "B: Zhè liǎngzhǒng dàngāo, wǒ dōu bùxiǎng chī."
      },
      {
       "hz": "A:你喜歡紅色的衣服嗎？",
       "vi": "A: Bạn có thích quần áo màu đỏ không?",
       "py": "A: Nǐ xǐhuān hóngsè de yīfú ma?"
      },
      {
       "hz": "A:你要買這種鉛筆嗎？",
       "vi": "A: Bạn có muốn mua loại bút chì này không?",
       "py": "A: Nǐ yào mǎi zhèzhǒng qiānbǐ ma?"
      },
      {
       "hz": "A:你喜歡吃什麼東西？",
       "vi": "A: Bạn thích ăn món gì?",
       "py": "A: Nǐ xǐhuān chī shénme dōngxī?"
      },
      {
       "hz": "A:你喜歡什麼生日禮物？",
       "vi": "A: Bạn thích quà sinh nhật gì?",
       "py": "A: Nǐ xǐhuān shénme shēngrìlǐwù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Đảo tân ngữ lên đầu câu (chủ đề số nhiều)",
   "giaiThich": "Khi chủ đề đưa lên đầu là số nhiều thì thêm 都 ngay sau chủ đề."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs.",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "II. Expressing “Too”, “Also” with 也",
   "points": [
    {
     "label": null,
     "formula": "也 is an adverb and is followed by a verb or a Vs. (2) When the subjects are different",
     "examples": [
      {
       "hz": "A:你喜歡什麼顏色？",
       "vi": "A: Bạn thích màu gì?",
       "py": "A: Nǐ xǐhuān shénme yánsè?"
      },
      {
       "hz": "B:我喜歡紅色，也喜歡白色。",
       "vi": "B: Tôi thích màu đỏ, cũng thích màu trắng.",
       "py": "B: Wǒ xǐhuān hóngsè, yě xǐhuān báisè."
      },
      {
       "hz": "A:你們要喝什麼飲料？",
       "vi": "A: Các bạn muốn uống đồ uống gì?",
       "py": "A: Nǐmen yào hē shénme yǐnliào?"
      },
      {
       "hz": "B:他要喝奶茶，我也要喝奶茶。",
       "vi": "B: Anh ấy muốn uống trà sữa, tôi cũng muốn uống trà sữa.",
       "py": "B: Tā yào hē nǎichá, wǒ yě yào hē nǎichá."
      },
      {
       "hz": "A:哪件衣服好看？",
       "vi": "A: Bộ quần áo nào đẹp?",
       "py": "A: Nǎ jiàn yīfú hǎokàn?"
      },
      {
       "hz": "B:這件衣服很好看，那件衣服也很好看。",
       "vi": "B: Bộ quần áo này rất đẹp, bộ kia cũng rất đẹp.",
       "py": "B: Zhèjiàn yīfú hěn hǎokàn, nà jiàn yīfú yě hěn hǎokàn."
      },
      {
       "hz": "A:你要吃什麼？",
       "vi": "A: Bạn muốn ăn gì?",
       "py": "A: Nǐ yào chī shénme?"
      },
      {
       "hz": "A:誰喜歡買便宜的東西？",
       "vi": "A: Ai thích mua đồ rẻ?",
       "py": "A: Shéi xǐhuān mǎi piányi de dōngxī?"
      },
      {
       "hz": "A:那家餐廳什麼好吃？",
       "vi": "A: Nhà hàng đó có món gì ngon?",
       "py": "A: Nà jiā cāntīng shénme hǎochī?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"cũng\" với 也",
   "giaiThich": "也 là phó từ, đứng trước động từ hoặc tính từ."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:今天天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiāntiānqì zěnmeyàng?"
      },
      {
       "hz": "B:今天太熱了。",
       "vi": "B: Hôm nay nóng quá.",
       "py": "B: Jīntiān tài rè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你今天好嗎？",
       "vi": "A: Hôm nay bạn khoẻ không?",
       "py": "A: Nǐ jīntiān hǎo ma?"
      },
      {
       "hz": "B:我今天太累了，現在很想睡覺。",
       "vi": "B: Hôm nay tôi mệt quá, bây giờ rất muốn ngủ.",
       "py": "B: Wǒ jīntiān tài lèi le, xiànzài hěn xiǎng shuìjiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "III. Expressing “Excessively” with 太……了",
   "points": [
    {
     "label": null,
     "formula": "Qǐngwèn yì wǎn niúròu miàn mài yì bǎi kuài qián, nǐ xiǎng guì háishì piányí? Nǐ de guójiā, nán, nǚ péngyǒu yìqǐ chīfàn, chángcháng shéi gěi qián?",
     "examples": [
      {
       "hz": "A:那家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Mì bò của nhà hàng đó thế nào?",
       "py": "A: Nà jiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "B:太好吃了，我常常去吃。",
       "vi": "B: Ngon lắm, tôi thường đến đó ăn.",
       "py": "B: Tài hǎochī le, wǒ chángcháng qù chī."
      },
      {
       "hz": "A:這件衣服怎麼樣？",
       "vi": "A: Bộ quần áo này thế nào?",
       "py": "A: Zhèjiàn yīfú zěnmeyàng?"
      },
      {
       "hz": "A:他現在怎麼樣？",
       "vi": "A: Bây giờ anh ấy thế nào?",
       "py": "A: Tā xiànzài zěnmeyàng?"
      },
      {
       "hz": "A:珍珠奶茶怎麼樣？",
       "vi": "A: Trà sữa trân châu thế nào?",
       "py": "A: Zhēnzhūnǎichá zěnmeyàng?"
      },
      {
       "hz": "中明和友美點什麼？",
       "vi": "Trung Minh và Yumi gọi món gì?",
       "py": "Zhōngmíng hàn Yǒuměi diǎn shénme?"
      },
      {
       "hz": "中明想一共兩百一十五塊，貴不貴？",
       "vi": "Trung Minh nghĩ tổng cộng hai trăm mười lăm đồng thì có đắt không?",
       "py": "Zhōngmíng xiǎng yígòng liǎngbǎi yì shíwǔkuài, guì bú guì?"
      },
      {
       "hz": "請問一碗牛肉麵賣一百塊錢，你想貴還是便宜？",
       "vi": "Cho hỏi, một bát mì bò bán một trăm đồng, bạn thấy đắt hay rẻ?",
       "py": "Qǐngwèn yìwǎn niúròumiàn mài yìbǎikuài qián, nǐ xiǎng guì háishì piányi?"
      },
      {
       "hz": "你喜歡吃什麼？喝什麼？",
       "vi": "Bạn thích ăn gì? Uống gì?",
       "py": "Nǐ xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你的國家，男、女朋友一起吃飯，常常誰給錢？",
       "vi": "Ở nước bạn, khi bạn trai bạn gái đi ăn cùng nhau, thường thì ai trả tiền?",
       "py": "Nǐ de guójiā, nán, nǚpéngyǒu yìqǐ chīfàn, chángcháng shéi gěiqián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"quá\" với 太……了",
   "giaiThich": "Mẫu 太 + tính từ + 了 nhấn mạnh mức độ vượt quá bình thường."
  },
  {
   "title": "1. Please read the following numbers.",
   "points": [
    {
     "label": null,
     "formula": "2. Read the following cell phone numbers. 3 .Read the following nouns (with measure words).",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Luyện đọc số và lượng từ",
   "giaiThich": "Phần luyện đọc: đọc số, đọc số điện thoại, đọc danh từ kèm lượng từ."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "一百多枝鉛筆 (101~199)六萬多個學生 (60,001~69,999)",
       "vi": "Hơn một trăm cây bút chì (101–199); hơn sáu vạn học sinh (60.001–69.999)",
       "py": "Yìbǎiduō zhī qiānbǐ (101~199) liùwànduō gè xuéshēng (60,001~69,999)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:現在你有多少錢？",
       "vi": "A: Bây giờ bạn có bao nhiêu tiền?",
       "py": "A: Xiànzài nǐ yǒu duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:你們學校有多少學生？",
       "vi": "A: Trường các bạn có bao nhiêu học sinh?",
       "py": "A: Nǐmen xuéxiào yǒu duōshǎo xuéshēng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "多 Can be use to express the number is in excess of a certain amount.",
     "examples": [
      {
       "hz": "A:這支手機多少錢？",
       "vi": "A: Chiếc điện thoại này bao nhiêu tiền?",
       "py": "A: Zhè zhī shǒujī duōshǎo qián?"
      },
      {
       "hz": "B:一萬多塊錢。",
       "vi": "B: Hơn một vạn đồng.",
       "py": "B: Yīwànduōkuài qián."
      },
      {
       "hz": "A:一共多少人？",
       "vi": "A: Tổng cộng bao nhiêu người?",
       "py": "A: Yīgòng duōshǎo rén?"
      },
      {
       "hz": "A:兩杯紅茶多少錢？",
       "vi": "A: Hai cốc hồng trà bao nhiêu tiền?",
       "py": "A: Liǎngbēi hóngchá duōshǎo qián?"
      },
      {
       "hz": "A:這件衣服多少錢？",
       "vi": "A: Bộ quần áo này bao nhiêu tiền?",
       "py": "A: Zhèjiàn yīfú duōshǎo qián?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  },
  {
   "title": "II. Expressing “More Than” with 多",
   "points": [
    {
     "label": null,
     "formula": "In this from 多 indicates a vague amount which is between ‘‘one’’ and ‘‘zero’’",
     "examples": [
      {
       "hz": "A:現在幾點？",
       "vi": "A: Bây giờ mấy giờ rồi?",
       "py": "A: Xiànzài jǐdiǎn?"
      },
      {
       "hz": "A:李(Lǐ)先生的孩子幾歲？",
       "vi": "A: Con của anh Lý mấy tuổi?",
       "py": "A: Lǐ xiānshēng de háizi jǐsuì?"
      },
      {
       "hz": "A:這些東西一共多少錢？",
       "vi": "A: Những thứ này tổng cộng bao nhiêu tiền?",
       "py": "A: Zhèxiē dōngxī yígòng duōshǎo qián?"
      },
      {
       "hz": "台灣的夏天很熱，很多人都喜歡做什麼？",
       "vi": "Mùa hè ở Đài Loan rất nóng, nhiều người thích làm gì?",
       "py": "Táiwān de xiàtiān hěn rè, hěnduō rén dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "台灣的飲料店賣哪些飲料？",
       "vi": "Các tiệm đồ uống ở Đài Loan bán những loại đồ uống nào?",
       "py": "Táiwān de yǐnliàodiàn mài nǎxiē yǐnliào?"
      },
      {
       "hz": "你喜歡喝飲料店的哪種飲料？",
       "vi": "Bạn thích uống loại đồ uống nào ở tiệm đồ uống?",
       "py": "Nǐ xǐhuān hē yǐnliàodiàn de nǎ zhǒng yǐnliào?"
      },
      {
       "hz": "你國家的人夏天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa hè thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén xiàtiān xǐhuān chī shénme? Hē shénme?"
      },
      {
       "hz": "你國家的人冬天喜歡吃什麼？喝什麼？",
       "vi": "Người nước bạn mùa đông thích ăn gì? Uống gì?",
       "py": "Nǐ guójiā de rén dōngtiān xǐhuān chī shénme? Hē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt \"hơn\" với 多",
   "giaiThich": "多 dùng để nói số lượng nhiều hơn một mức nào đó (ví dụ 三十多 = hơn ba mươi)."
  }
 ],
 "td1-5.1": [
  {
   "title": "I. 在 as a Verb with a Place Word (PW)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 在 always precedes the place word.",
     "examples": [
      {
       "hz": "A：你爸爸在哪裡？",
       "vi": "A: Bố bạn ở đâu?",
       "py": "A: Nǐ bàba zài nǎlǐ?"
      },
      {
       "hz": "B：他在他朋友家。",
       "vi": "B: Bố tôi ở nhà bạn của bố.",
       "py": "B: Tā zài tā péngyǒujiā."
      },
      {
       "hz": "A：他在學校嗎？",
       "vi": "A: Anh ấy có ở trường không?",
       "py": "A: Tā zài xuéxiào ma?"
      },
      {
       "hz": "B：他不在學校，他在咖啡廳。",
       "vi": "B: Anh ấy không ở trường, anh ấy ở quán cà phê.",
       "py": "B: Tā bú zài xuéxiào, tā zài kāfēitīng."
      },
      {
       "hz": "A：老師在哪裡？",
       "vi": "A: Thầy giáo ở đâu?",
       "py": "A: Lǎoshī zài nǎlǐ?"
      },
      {
       "hz": "B：老師不在這裡，我不知道他在哪裡。",
       "vi": "B: Thầy giáo không ở đây, tôi không biết thầy ở đâu.",
       "py": "B: Lǎoshī bú zài zhèlǐ, wǒ bù zhīdào tā zài nǎlǐ."
      },
      {
       "hz": "A:他們在哪裡？",
       "vi": "A: Họ ở đâu?",
       "py": "A: Tāmen zài nǎlǐ?"
      },
      {
       "hz": "A:小美在圖書館嗎？",
       "vi": "A: Tiểu Mỹ có ở thư viện không?",
       "py": "A: Xiǎo měi zài túshūguǎn ma?"
      },
      {
       "hz": "B:李(Lǐ)老師今天早上九點在學校。",
       "vi": "B: Chín giờ sáng nay thầy Lý ở trường.",
       "py": "B: Lǐ lǎoshī jīntiān zǎoshàng jiǔdiǎn zài xuéxiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 làm động từ đi với từ chỉ nơi chốn",
   "giaiThich": "在 luôn đứng trước từ chỉ nơi chốn, nghĩa là \"ở (đâu đó)\"."
  },
  {
   "title": "II. Location of an Action",
   "points": [
    {
     "label": null,
     "formula": "在+PW precedes an action to express where the action is taking place.",
     "examples": [
      {
       "hz": "上中文課。",
       "vi": "Học tiết tiếng Trung.",
       "py": "Shàng zhōngwén kè."
      },
      {
       "hz": "A：你週末要做什麼？",
       "vi": "A: Cuối tuần bạn định làm gì?",
       "py": "A: Nǐ zhōumò yào zuò shénme?"
      },
      {
       "hz": "B：我要在家看書。",
       "vi": "B: Tôi định ở nhà đọc sách.",
       "py": "B: Wǒ yào zàijiā kànshū."
      },
      {
       "hz": "A：小美在哪裡？",
       "vi": "A: Tiểu Mỹ ở đâu?",
       "py": "A: Xiǎo měi zài nǎlǐ?"
      },
      {
       "hz": "B：她在學校上課。",
       "vi": "B: Cô ấy đang học ở trường.",
       "py": "B: Tā zài xuéxiào shàngkè."
      },
      {
       "hz": "A：他們在中明家玩嗎？",
       "vi": "A: Họ chơi ở nhà Trung Minh phải không?",
       "py": "A: Tāmen zài Zhōngmíng jiā wán ma?"
      },
      {
       "hz": "B：他們不在中明家玩，他們在圖書館看書。",
       "vi": "B: Họ không chơi ở nhà Trung Minh, họ đọc sách ở thư viện.",
       "py": "B: Tāmen bú zài Zhōngmíng jiā wán, tāmen zài túshūguǎn kànshū."
      },
      {
       "hz": "A:你在哪裡買咖啡？",
       "vi": "A: Bạn mua cà phê ở đâu?",
       "py": "A: Nǐ zài nǎlǐ mǎi kāfēi?"
      },
      {
       "hz": "A:你喜歡在家做什麼？",
       "vi": "A: Bạn thích làm gì ở nhà?",
       "py": "A: Nǐ xǐhuān zàijiā zuò shénme?"
      },
      {
       "hz": "A:你今天要在家吃晚飯嗎？",
       "vi": "A: Hôm nay bạn có ăn tối ở nhà không?",
       "py": "A: Nǐ jīntiān yào zàijiā chīwǎnfàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nơi diễn ra hành động",
   "giaiThich": "在 + nơi chốn đặt TRƯỚC động từ để nói hành động xảy ra ở đâu."
  },
  {
   "title": "III. Expressing Suggestion with 吧",
   "points": [
    {
     "label": null,
     "formula": "吧 is placed at the end of a sentence, to express the suggestion from the speaker. Nǐ kàn zhè liǎng jiàn yīfu, hóng de hǎokàn háishì bái de hǎokàn? above; over; on top of; on the surface of",
     "examples": [
      {
       "hz": "這個蛋糕太大，你買小的吧。",
       "vi": "Cái bánh kem này to quá, bạn mua cái nhỏ đi.",
       "py": "Zhège dàngāo tài dà, nǐ mǎi xiǎo de ba."
      },
      {
       "hz": "那杯水太熱，你喝這杯吧。",
       "vi": "Cốc nước kia nóng quá, bạn uống cốc này đi.",
       "py": "Nà bēishuǐ tài rè, nǐ hē zhè bēi ba."
      },
      {
       "hz": "A：我想去圖書館看書。",
       "vi": "A: Tôi muốn đến thư viện đọc sách.",
       "py": "A: Wǒ xiǎng qù túshūguǎn kànshū."
      },
      {
       "hz": "B：我也想去，我們一起去吧。",
       "vi": "B: Tôi cũng muốn đi, chúng ta cùng đi nhé.",
       "py": "B: Wǒ yě xiǎng qù, wǒmen yìqǐ qù ba."
      },
      {
       "hz": "B：都很好看，這兩件妳都買吧。",
       "vi": "B: Cả hai đều đẹp, bạn mua cả hai bộ đi.",
       "py": "B: Dōu hěn hǎokàn, zhè liǎngjiàn nǐ dōu mǎi ba."
      },
      {
       "hz": "A：你看這兩件衣服，紅的好看還是白的好看？",
       "vi": "A: Bạn xem hai bộ quần áo này, bộ đỏ đẹp hay bộ trắng đẹp?",
       "py": "A: Nǐ kàn zhè liǎngjiàn yīfú, hóng de hǎokàn háishì bái de hǎokàn?"
      },
      {
       "hz": "A:今天好冷。",
       "vi": "A: Hôm nay lạnh quá.",
       "py": "A: Jīntiān hǎo lěng."
      },
      {
       "hz": "A:我很餓，也很渴。",
       "vi": "A: Tôi đói quá, cũng khát nữa.",
       "py": "A: Wǒ hěn è, yě hěnkě."
      },
      {
       "hz": "你的書在房間裡。",
       "vi": "Sách của bạn ở trong phòng.",
       "py": "Nǐ de shū zài fángjiān lǐ."
      },
      {
       "hz": "他在房間外面做什麼？",
       "vi": "Anh ấy đang làm gì ở ngoài phòng?",
       "py": "Tā zài fángjiān wàimiàn zuò shénme?"
      },
      {
       "hz": "你的筆在那本書上面。",
       "vi": "Bút của bạn ở trên quyển sách kia.",
       "py": "Nǐ de bǐ zài nàběnshū shàngmiàn."
      },
      {
       "hz": "你的錢包在那件衣服下面。",
       "vi": "Ví tiền của bạn ở dưới bộ quần áo kia.",
       "py": "Nǐ de qiánbāo zài nà jiàn yīfú xiàmiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt đề nghị với 吧",
   "giaiThich": "吧 đặt cuối câu để nêu đề nghị, rủ rê hoặc phỏng đoán nhẹ nhàng."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": "\"Noun + Directional Word\" is used to denote the  direction and the location of a place.",
     "examples": [
      {
       "hz": "A:那家餐廳在你家旁邊嗎？",
       "vi": "A: Nhà hàng đó ở cạnh nhà bạn à?",
       "py": "A: Nà jiā cāntīng zài nǐjiā pángbiān ma?"
      },
      {
       "hz": "桌子上面。",
       "vi": "Trên bàn.",
       "py": "Zhuōzi shàngmiàn."
      },
      {
       "hz": "學校旁邊。",
       "vi": "Cạnh trường.",
       "py": "Xuéxiào pángbiān."
      },
      {
       "hz": "B:不在我家旁邊，在我家後面。",
       "vi": "B: Không ở cạnh nhà tôi, ở sau nhà tôi.",
       "py": "B: Bú zài wǒjiā pángbiān, zài wǒjiā hòumiàn."
      },
      {
       "hz": "A:我的筆在哪裡？",
       "vi": "A: Bút của tôi đâu rồi?",
       "py": "A: Wǒ de bǐ zài nǎlǐ?"
      },
      {
       "hz": "B:你看，你的筆在椅子下面。",
       "vi": "B: Bạn xem kìa, bút của bạn ở dưới ghế.",
       "py": "B: Nǐ kàn, nǐ de bǐ zài yǐzi xiàmiàn."
      },
      {
       "hz": "A:他們都在房間裡面嗎？",
       "vi": "A: Họ đều ở trong phòng à?",
       "py": "A: Tāmen dōu zài fángjiān lǐmiàn ma?"
      },
      {
       "hz": "B:哥哥在房間裡面，我不知道弟弟在哪裡。",
       "vi": "B: Anh trai ở trong phòng, tôi không biết em trai ở đâu.",
       "py": "B: Gēge zài fángjiān lǐmiàn, wǒ bù zhīdào dìdi zài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他在房間裡睡覺。",
       "vi": "Anh ấy đang ngủ trong phòng.",
       "py": "Tā zài fángjiān lǐ shuìjiào."
      },
      {
       "hz": "那個孩子在媽媽旁邊看書。",
       "vi": "Đứa bé kia đang đọc sách cạnh mẹ.",
       "py": "Nàge háizi zài māma pángbiān kànshū."
      },
      {
       "hz": "他們在圖書館外面做什麼？",
       "vi": "Họ đang làm gì ở ngoài thư viện?",
       "py": "Tāmen zài túshūguǎn wàimiàn zuò shénme?"
      },
      {
       "hz": "A:弟弟在哪裡？",
       "vi": "A: Em trai ở đâu?",
       "py": "A: Dìdi zài nǎlǐ?"
      },
      {
       "hz": "A:我的書在哪裡？",
       "vi": "A: Sách của tôi ở đâu?",
       "py": "A: Wǒ de shū zài nǎlǐ?"
      },
      {
       "hz": "A:她在哪裡看書？",
       "vi": "A: Cô ấy đọc sách ở đâu?",
       "py": "A: Tā zài nǎlǐ kànshū?"
      },
      {
       "hz": "A:小明在圖書館裡面做什麼？",
       "vi": "A: Tiểu Minh đang làm gì trong thư viện?",
       "py": "A: Xiǎo míng zài túshūguǎn lǐmiàn zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "II. Existential Sentences with 有",
   "points": [
    {
     "label": null,
     "formula": "有 can be placed after a place word to express ‘‘ there is/are something on a place’’ and is always negated with 沒.",
     "examples": [
      {
       "hz": "很多好吃的東西。",
       "vi": "Rất nhiều món ngon.",
       "py": "Hěnduō hǎochī de dōngxī."
      },
      {
       "hz": "很多東西。",
       "vi": "Rất nhiều đồ.",
       "py": "Hěnduō dōngxī."
      },
      {
       "hz": "A：台灣有什麼好吃的東西？",
       "vi": "A: Đài Loan có món gì ngon?",
       "py": "A: Táiwān yǒu shénme hǎochī de dōngxī?"
      },
      {
       "hz": "B：水果、牛肉麵跟小籠包，我都很喜歡。",
       "vi": "B: Trái cây, mì bò và bánh bao nhỏ, món nào tôi cũng rất thích.",
       "py": "B: Shuǐguǒ, niúròumiàn gēn xiǎolóngbāo, wǒ dōu hěn xǐhuān."
      },
      {
       "hz": "A：你們學校旁邊有什麼？",
       "vi": "A: Cạnh trường các bạn có gì?",
       "py": "A: Nǐmen xuéxiào pángbiān yǒu shénme?"
      },
      {
       "hz": "B：我們學校旁邊有一家很大的餐廳。",
       "vi": "B: Cạnh trường chúng tôi có một nhà hàng rất lớn.",
       "py": "B: Wǒmen xuéxiào pángbiān yǒu yìjiā hěndà de cāntīng."
      },
      {
       "hz": "A：那個房間裡面有桌子、椅子嗎？",
       "vi": "A: Trong căn phòng đó có bàn, ghế không?",
       "py": "A: Nàge fángjiān lǐmiàn yǒu zhuōzi, yǐzi ma?"
      },
      {
       "hz": "B：房間裡面有一張桌子跟兩張椅子。",
       "vi": "B: Trong phòng có một cái bàn và hai cái ghế.",
       "py": "B: Fángjiān lǐmiàn yǒu yìzhāng zhuōzi gēn liǎngzhāng yǐzi."
      },
      {
       "hz": "A:我們學校有多少學生？",
       "vi": "A: Trường chúng ta có bao nhiêu học sinh?",
       "py": "A: Wǒmen xuéxiào yǒu duōshǎo xuéshēng?"
      },
      {
       "hz": "A:你家旁邊有飲料店嗎？",
       "vi": "A: Cạnh nhà bạn có tiệm đồ uống không?",
       "py": "A: Nǐjiā pángbiān yǒu yǐnliàodiàn ma?"
      },
      {
       "hz": "A:你的桌子上面有什麼東西？",
       "vi": "A: Trên bàn của bạn có những gì?",
       "py": "A: Nǐ de zhuōzi shàngmiàn yǒu shénme dōngxī?"
      },
      {
       "hz": "他的房間裡面有什麼家具？",
       "vi": "Trong phòng anh ấy có những đồ nội thất gì?",
       "py": "Tā de fángjiān lǐmiàn yǒu shénme jiājù?"
      },
      {
       "hz": "他的房間有窗戶嗎？",
       "vi": "Phòng anh ấy có cửa sổ không?",
       "py": "Tā de fángjiān yǒu chuānghù ma?"
      },
      {
       "hz": "他有貓/狗嗎？他的貓/狗喜歡做什麼？",
       "vi": "Anh ấy có nuôi mèo/chó không? Mèo/chó của anh ấy thích làm gì?",
       "py": "Tā yǒu māo / gǒu ma? Tā de māo / gǒu xǐhuān zuò shénme?"
      },
      {
       "hz": "他喜歡在家裡做什麼？",
       "vi": "Anh ấy thích làm gì ở nhà?",
       "py": "Tā xǐhuān zài jiālǐ zuò shénme?"
      },
      {
       "hz": "我想買一台電視機。",
       "vi": "Tôi muốn mua một chiếc tivi.",
       "py": "Wǒ xiǎng mǎi yìtái diànshìjī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu tồn tại với 有",
   "giaiThich": "有 đặt sau từ chỉ nơi chốn, nghĩa \"ở đâu đó có gì\"; phủ định dùng 沒."
  }
 ],
 "td1-5.2": [
  {
   "title": "I. 在 as a Verb with a Place Word (PW)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 在 always precedes the place word.",
     "examples": [
      {
       "hz": "A：你爸爸在哪裡？",
       "vi": "A: Bố bạn ở đâu?",
       "py": "A: Nǐ bàba zài nǎlǐ?"
      },
      {
       "hz": "B：他在他朋友家。",
       "vi": "B: Bố tôi ở nhà bạn của bố.",
       "py": "B: Tā zài tā péngyǒujiā."
      },
      {
       "hz": "A：他在學校嗎？",
       "vi": "A: Anh ấy có ở trường không?",
       "py": "A: Tā zài xuéxiào ma?"
      },
      {
       "hz": "B：他不在學校，他在咖啡廳。",
       "vi": "B: Anh ấy không ở trường, anh ấy ở quán cà phê.",
       "py": "B: Tā bú zài xuéxiào, tā zài kāfēitīng."
      },
      {
       "hz": "A：老師在哪裡？",
       "vi": "A: Thầy giáo ở đâu?",
       "py": "A: Lǎoshī zài nǎlǐ?"
      },
      {
       "hz": "B：老師不在這裡，我不知道他在哪裡。",
       "vi": "B: Thầy giáo không ở đây, tôi không biết thầy ở đâu.",
       "py": "B: Lǎoshī bú zài zhèlǐ, wǒ bù zhīdào tā zài nǎlǐ."
      },
      {
       "hz": "A:他們在哪裡？",
       "vi": "A: Họ ở đâu?",
       "py": "A: Tāmen zài nǎlǐ?"
      },
      {
       "hz": "A:小美在圖書館嗎？",
       "vi": "A: Tiểu Mỹ có ở thư viện không?",
       "py": "A: Xiǎo měi zài túshūguǎn ma?"
      },
      {
       "hz": "B:李(Lǐ)老師今天早上九點在學校。",
       "vi": "B: Chín giờ sáng nay thầy Lý ở trường.",
       "py": "B: Lǐ lǎoshī jīntiān zǎoshàng jiǔdiǎn zài xuéxiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 làm động từ đi với từ chỉ nơi chốn",
   "giaiThich": "在 luôn đứng trước từ chỉ nơi chốn, nghĩa là \"ở (đâu đó)\"."
  },
  {
   "title": "II. Location of an Action",
   "points": [
    {
     "label": null,
     "formula": "在+PW precedes an action to express where the action is taking place.",
     "examples": [
      {
       "hz": "上中文課。",
       "vi": "Học tiết tiếng Trung.",
       "py": "Shàng zhōngwén kè."
      },
      {
       "hz": "A：你週末要做什麼？",
       "vi": "A: Cuối tuần bạn định làm gì?",
       "py": "A: Nǐ zhōumò yào zuò shénme?"
      },
      {
       "hz": "B：我要在家看書。",
       "vi": "B: Tôi định ở nhà đọc sách.",
       "py": "B: Wǒ yào zàijiā kànshū."
      },
      {
       "hz": "A：小美在哪裡？",
       "vi": "A: Tiểu Mỹ ở đâu?",
       "py": "A: Xiǎo měi zài nǎlǐ?"
      },
      {
       "hz": "B：她在學校上課。",
       "vi": "B: Cô ấy đang học ở trường.",
       "py": "B: Tā zài xuéxiào shàngkè."
      },
      {
       "hz": "A：他們在中明家玩嗎？",
       "vi": "A: Họ chơi ở nhà Trung Minh phải không?",
       "py": "A: Tāmen zài Zhōngmíng jiā wán ma?"
      },
      {
       "hz": "B：他們不在中明家玩，他們在圖書館看書。",
       "vi": "B: Họ không chơi ở nhà Trung Minh, họ đọc sách ở thư viện.",
       "py": "B: Tāmen bú zài Zhōngmíng jiā wán, tāmen zài túshūguǎn kànshū."
      },
      {
       "hz": "A:你在哪裡買咖啡？",
       "vi": "A: Bạn mua cà phê ở đâu?",
       "py": "A: Nǐ zài nǎlǐ mǎi kāfēi?"
      },
      {
       "hz": "A:你喜歡在家做什麼？",
       "vi": "A: Bạn thích làm gì ở nhà?",
       "py": "A: Nǐ xǐhuān zàijiā zuò shénme?"
      },
      {
       "hz": "A:你今天要在家吃晚飯嗎？",
       "vi": "A: Hôm nay bạn có ăn tối ở nhà không?",
       "py": "A: Nǐ jīntiān yào zàijiā chīwǎnfàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nơi diễn ra hành động",
   "giaiThich": "在 + nơi chốn đặt TRƯỚC động từ để nói hành động xảy ra ở đâu."
  },
  {
   "title": "III. Expressing Suggestion with 吧",
   "points": [
    {
     "label": null,
     "formula": "吧 is placed at the end of a sentence, to express the suggestion from the speaker. Nǐ kàn zhè liǎng jiàn yīfu, hóng de hǎokàn háishì bái de hǎokàn? above; over; on top of; on the surface of",
     "examples": [
      {
       "hz": "這個蛋糕太大，你買小的吧。",
       "vi": "Cái bánh kem này to quá, bạn mua cái nhỏ đi.",
       "py": "Zhège dàngāo tài dà, nǐ mǎi xiǎo de ba."
      },
      {
       "hz": "那杯水太熱，你喝這杯吧。",
       "vi": "Cốc nước kia nóng quá, bạn uống cốc này đi.",
       "py": "Nà bēishuǐ tài rè, nǐ hē zhè bēi ba."
      },
      {
       "hz": "A：我想去圖書館看書。",
       "vi": "A: Tôi muốn đến thư viện đọc sách.",
       "py": "A: Wǒ xiǎng qù túshūguǎn kànshū."
      },
      {
       "hz": "B：我也想去，我們一起去吧。",
       "vi": "B: Tôi cũng muốn đi, chúng ta cùng đi nhé.",
       "py": "B: Wǒ yě xiǎng qù, wǒmen yìqǐ qù ba."
      },
      {
       "hz": "B：都很好看，這兩件妳都買吧。",
       "vi": "B: Cả hai đều đẹp, bạn mua cả hai bộ đi.",
       "py": "B: Dōu hěn hǎokàn, zhè liǎngjiàn nǐ dōu mǎi ba."
      },
      {
       "hz": "A：你看這兩件衣服，紅的好看還是白的好看？",
       "vi": "A: Bạn xem hai bộ quần áo này, bộ đỏ đẹp hay bộ trắng đẹp?",
       "py": "A: Nǐ kàn zhè liǎngjiàn yīfú, hóng de hǎokàn háishì bái de hǎokàn?"
      },
      {
       "hz": "A:今天好冷。",
       "vi": "A: Hôm nay lạnh quá.",
       "py": "A: Jīntiān hǎo lěng."
      },
      {
       "hz": "A:我很餓，也很渴。",
       "vi": "A: Tôi đói quá, cũng khát nữa.",
       "py": "A: Wǒ hěn è, yě hěnkě."
      },
      {
       "hz": "你的書在房間裡。",
       "vi": "Sách của bạn ở trong phòng.",
       "py": "Nǐ de shū zài fángjiān lǐ."
      },
      {
       "hz": "他在房間外面做什麼？",
       "vi": "Anh ấy đang làm gì ở ngoài phòng?",
       "py": "Tā zài fángjiān wàimiàn zuò shénme?"
      },
      {
       "hz": "你的筆在那本書上面。",
       "vi": "Bút của bạn ở trên quyển sách kia.",
       "py": "Nǐ de bǐ zài nàběnshū shàngmiàn."
      },
      {
       "hz": "你的錢包在那件衣服下面。",
       "vi": "Ví tiền của bạn ở dưới bộ quần áo kia.",
       "py": "Nǐ de qiánbāo zài nà jiàn yīfú xiàmiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt đề nghị với 吧",
   "giaiThich": "吧 đặt cuối câu để nêu đề nghị, rủ rê hoặc phỏng đoán nhẹ nhàng."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": "\"Noun + Directional Word\" is used to denote the  direction and the location of a place.",
     "examples": [
      {
       "hz": "A:那家餐廳在你家旁邊嗎？",
       "vi": "A: Nhà hàng đó ở cạnh nhà bạn à?",
       "py": "A: Nà jiā cāntīng zài nǐjiā pángbiān ma?"
      },
      {
       "hz": "桌子上面。",
       "vi": "Trên bàn.",
       "py": "Zhuōzi shàngmiàn."
      },
      {
       "hz": "學校旁邊。",
       "vi": "Cạnh trường.",
       "py": "Xuéxiào pángbiān."
      },
      {
       "hz": "B:不在我家旁邊，在我家後面。",
       "vi": "B: Không ở cạnh nhà tôi, ở sau nhà tôi.",
       "py": "B: Bú zài wǒjiā pángbiān, zài wǒjiā hòumiàn."
      },
      {
       "hz": "A:我的筆在哪裡？",
       "vi": "A: Bút của tôi đâu rồi?",
       "py": "A: Wǒ de bǐ zài nǎlǐ?"
      },
      {
       "hz": "B:你看，你的筆在椅子下面。",
       "vi": "B: Bạn xem kìa, bút của bạn ở dưới ghế.",
       "py": "B: Nǐ kàn, nǐ de bǐ zài yǐzi xiàmiàn."
      },
      {
       "hz": "A:他們都在房間裡面嗎？",
       "vi": "A: Họ đều ở trong phòng à?",
       "py": "A: Tāmen dōu zài fángjiān lǐmiàn ma?"
      },
      {
       "hz": "B:哥哥在房間裡面，我不知道弟弟在哪裡。",
       "vi": "B: Anh trai ở trong phòng, tôi không biết em trai ở đâu.",
       "py": "B: Gēge zài fángjiān lǐmiàn, wǒ bù zhīdào dìdi zài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他在房間裡睡覺。",
       "vi": "Anh ấy đang ngủ trong phòng.",
       "py": "Tā zài fángjiān lǐ shuìjiào."
      },
      {
       "hz": "那個孩子在媽媽旁邊看書。",
       "vi": "Đứa bé kia đang đọc sách cạnh mẹ.",
       "py": "Nàge háizi zài māma pángbiān kànshū."
      },
      {
       "hz": "他們在圖書館外面做什麼？",
       "vi": "Họ đang làm gì ở ngoài thư viện?",
       "py": "Tāmen zài túshūguǎn wàimiàn zuò shénme?"
      },
      {
       "hz": "A:弟弟在哪裡？",
       "vi": "A: Em trai ở đâu?",
       "py": "A: Dìdi zài nǎlǐ?"
      },
      {
       "hz": "A:我的書在哪裡？",
       "vi": "A: Sách của tôi ở đâu?",
       "py": "A: Wǒ de shū zài nǎlǐ?"
      },
      {
       "hz": "A:她在哪裡看書？",
       "vi": "A: Cô ấy đọc sách ở đâu?",
       "py": "A: Tā zài nǎlǐ kànshū?"
      },
      {
       "hz": "A:小明在圖書館裡面做什麼？",
       "vi": "A: Tiểu Minh đang làm gì trong thư viện?",
       "py": "A: Xiǎo míng zài túshūguǎn lǐmiàn zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "II. Existential Sentences with 有",
   "points": [
    {
     "label": null,
     "formula": "有 can be placed after a place word to express ‘‘ there is/are something on a place’’ and is always negated with 沒.",
     "examples": [
      {
       "hz": "很多好吃的東西。",
       "vi": "Rất nhiều món ngon.",
       "py": "Hěnduō hǎochī de dōngxī."
      },
      {
       "hz": "很多東西。",
       "vi": "Rất nhiều đồ.",
       "py": "Hěnduō dōngxī."
      },
      {
       "hz": "A：台灣有什麼好吃的東西？",
       "vi": "A: Đài Loan có món gì ngon?",
       "py": "A: Táiwān yǒu shénme hǎochī de dōngxī?"
      },
      {
       "hz": "B：水果、牛肉麵跟小籠包，我都很喜歡。",
       "vi": "B: Trái cây, mì bò và bánh bao nhỏ, món nào tôi cũng rất thích.",
       "py": "B: Shuǐguǒ, niúròumiàn gēn xiǎolóngbāo, wǒ dōu hěn xǐhuān."
      },
      {
       "hz": "A：你們學校旁邊有什麼？",
       "vi": "A: Cạnh trường các bạn có gì?",
       "py": "A: Nǐmen xuéxiào pángbiān yǒu shénme?"
      },
      {
       "hz": "B：我們學校旁邊有一家很大的餐廳。",
       "vi": "B: Cạnh trường chúng tôi có một nhà hàng rất lớn.",
       "py": "B: Wǒmen xuéxiào pángbiān yǒu yìjiā hěndà de cāntīng."
      },
      {
       "hz": "A：那個房間裡面有桌子、椅子嗎？",
       "vi": "A: Trong căn phòng đó có bàn, ghế không?",
       "py": "A: Nàge fángjiān lǐmiàn yǒu zhuōzi, yǐzi ma?"
      },
      {
       "hz": "B：房間裡面有一張桌子跟兩張椅子。",
       "vi": "B: Trong phòng có một cái bàn và hai cái ghế.",
       "py": "B: Fángjiān lǐmiàn yǒu yìzhāng zhuōzi gēn liǎngzhāng yǐzi."
      },
      {
       "hz": "A:我們學校有多少學生？",
       "vi": "A: Trường chúng ta có bao nhiêu học sinh?",
       "py": "A: Wǒmen xuéxiào yǒu duōshǎo xuéshēng?"
      },
      {
       "hz": "A:你家旁邊有飲料店嗎？",
       "vi": "A: Cạnh nhà bạn có tiệm đồ uống không?",
       "py": "A: Nǐjiā pángbiān yǒu yǐnliàodiàn ma?"
      },
      {
       "hz": "A:你的桌子上面有什麼東西？",
       "vi": "A: Trên bàn của bạn có những gì?",
       "py": "A: Nǐ de zhuōzi shàngmiàn yǒu shénme dōngxī?"
      },
      {
       "hz": "他的房間裡面有什麼家具？",
       "vi": "Trong phòng anh ấy có những đồ nội thất gì?",
       "py": "Tā de fángjiān lǐmiàn yǒu shénme jiājù?"
      },
      {
       "hz": "他的房間有窗戶嗎？",
       "vi": "Phòng anh ấy có cửa sổ không?",
       "py": "Tā de fángjiān yǒu chuānghù ma?"
      },
      {
       "hz": "他有貓/狗嗎？他的貓/狗喜歡做什麼？",
       "vi": "Anh ấy có nuôi mèo/chó không? Mèo/chó của anh ấy thích làm gì?",
       "py": "Tā yǒu māo / gǒu ma? Tā de māo / gǒu xǐhuān zuò shénme?"
      },
      {
       "hz": "他喜歡在家裡做什麼？",
       "vi": "Anh ấy thích làm gì ở nhà?",
       "py": "Tā xǐhuān zài jiālǐ zuò shénme?"
      },
      {
       "hz": "我想買一台電視機。",
       "vi": "Tôi muốn mua một chiếc tivi.",
       "py": "Wǒ xiǎng mǎi yìtái diànshìjī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu tồn tại với 有",
   "giaiThich": "有 đặt sau từ chỉ nơi chốn, nghĩa \"ở đâu đó có gì\"; phủ định dùng 沒."
  }
 ],
 "td1-5.3": [
  {
   "title": "I. 在 as a Verb with a Place Word (PW)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 在 always precedes the place word.",
     "examples": [
      {
       "hz": "A：你爸爸在哪裡？",
       "vi": "A: Bố bạn ở đâu?",
       "py": "A: Nǐ bàba zài nǎlǐ?"
      },
      {
       "hz": "B：他在他朋友家。",
       "vi": "B: Bố tôi ở nhà bạn của bố.",
       "py": "B: Tā zài tā péngyǒujiā."
      },
      {
       "hz": "A：他在學校嗎？",
       "vi": "A: Anh ấy có ở trường không?",
       "py": "A: Tā zài xuéxiào ma?"
      },
      {
       "hz": "B：他不在學校，他在咖啡廳。",
       "vi": "B: Anh ấy không ở trường, anh ấy ở quán cà phê.",
       "py": "B: Tā bú zài xuéxiào, tā zài kāfēitīng."
      },
      {
       "hz": "A：老師在哪裡？",
       "vi": "A: Thầy giáo ở đâu?",
       "py": "A: Lǎoshī zài nǎlǐ?"
      },
      {
       "hz": "B：老師不在這裡，我不知道他在哪裡。",
       "vi": "B: Thầy giáo không ở đây, tôi không biết thầy ở đâu.",
       "py": "B: Lǎoshī bú zài zhèlǐ, wǒ bù zhīdào tā zài nǎlǐ."
      },
      {
       "hz": "A:他們在哪裡？",
       "vi": "A: Họ ở đâu?",
       "py": "A: Tāmen zài nǎlǐ?"
      },
      {
       "hz": "A:小美在圖書館嗎？",
       "vi": "A: Tiểu Mỹ có ở thư viện không?",
       "py": "A: Xiǎo měi zài túshūguǎn ma?"
      },
      {
       "hz": "B:李(Lǐ)老師今天早上九點在學校。",
       "vi": "B: Chín giờ sáng nay thầy Lý ở trường.",
       "py": "B: Lǐ lǎoshī jīntiān zǎoshàng jiǔdiǎn zài xuéxiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 làm động từ đi với từ chỉ nơi chốn",
   "giaiThich": "在 luôn đứng trước từ chỉ nơi chốn, nghĩa là \"ở (đâu đó)\"."
  },
  {
   "title": "II. Location of an Action",
   "points": [
    {
     "label": null,
     "formula": "在+PW precedes an action to express where the action is taking place.",
     "examples": [
      {
       "hz": "上中文課。",
       "vi": "Học tiết tiếng Trung.",
       "py": "Shàng zhōngwén kè."
      },
      {
       "hz": "A：你週末要做什麼？",
       "vi": "A: Cuối tuần bạn định làm gì?",
       "py": "A: Nǐ zhōumò yào zuò shénme?"
      },
      {
       "hz": "B：我要在家看書。",
       "vi": "B: Tôi định ở nhà đọc sách.",
       "py": "B: Wǒ yào zàijiā kànshū."
      },
      {
       "hz": "A：小美在哪裡？",
       "vi": "A: Tiểu Mỹ ở đâu?",
       "py": "A: Xiǎo měi zài nǎlǐ?"
      },
      {
       "hz": "B：她在學校上課。",
       "vi": "B: Cô ấy đang học ở trường.",
       "py": "B: Tā zài xuéxiào shàngkè."
      },
      {
       "hz": "A：他們在中明家玩嗎？",
       "vi": "A: Họ chơi ở nhà Trung Minh phải không?",
       "py": "A: Tāmen zài Zhōngmíng jiā wán ma?"
      },
      {
       "hz": "B：他們不在中明家玩，他們在圖書館看書。",
       "vi": "B: Họ không chơi ở nhà Trung Minh, họ đọc sách ở thư viện.",
       "py": "B: Tāmen bú zài Zhōngmíng jiā wán, tāmen zài túshūguǎn kànshū."
      },
      {
       "hz": "A:你在哪裡買咖啡？",
       "vi": "A: Bạn mua cà phê ở đâu?",
       "py": "A: Nǐ zài nǎlǐ mǎi kāfēi?"
      },
      {
       "hz": "A:你喜歡在家做什麼？",
       "vi": "A: Bạn thích làm gì ở nhà?",
       "py": "A: Nǐ xǐhuān zàijiā zuò shénme?"
      },
      {
       "hz": "A:你今天要在家吃晚飯嗎？",
       "vi": "A: Hôm nay bạn có ăn tối ở nhà không?",
       "py": "A: Nǐ jīntiān yào zàijiā chīwǎnfàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nơi diễn ra hành động",
   "giaiThich": "在 + nơi chốn đặt TRƯỚC động từ để nói hành động xảy ra ở đâu."
  },
  {
   "title": "III. Expressing Suggestion with 吧",
   "points": [
    {
     "label": null,
     "formula": "吧 is placed at the end of a sentence, to express the suggestion from the speaker. Nǐ kàn zhè liǎng jiàn yīfu, hóng de hǎokàn háishì bái de hǎokàn? above; over; on top of; on the surface of",
     "examples": [
      {
       "hz": "這個蛋糕太大，你買小的吧。",
       "vi": "Cái bánh kem này to quá, bạn mua cái nhỏ đi.",
       "py": "Zhège dàngāo tài dà, nǐ mǎi xiǎo de ba."
      },
      {
       "hz": "那杯水太熱，你喝這杯吧。",
       "vi": "Cốc nước kia nóng quá, bạn uống cốc này đi.",
       "py": "Nà bēishuǐ tài rè, nǐ hē zhè bēi ba."
      },
      {
       "hz": "A：我想去圖書館看書。",
       "vi": "A: Tôi muốn đến thư viện đọc sách.",
       "py": "A: Wǒ xiǎng qù túshūguǎn kànshū."
      },
      {
       "hz": "B：我也想去，我們一起去吧。",
       "vi": "B: Tôi cũng muốn đi, chúng ta cùng đi nhé.",
       "py": "B: Wǒ yě xiǎng qù, wǒmen yìqǐ qù ba."
      },
      {
       "hz": "B：都很好看，這兩件妳都買吧。",
       "vi": "B: Cả hai đều đẹp, bạn mua cả hai bộ đi.",
       "py": "B: Dōu hěn hǎokàn, zhè liǎngjiàn nǐ dōu mǎi ba."
      },
      {
       "hz": "A：你看這兩件衣服，紅的好看還是白的好看？",
       "vi": "A: Bạn xem hai bộ quần áo này, bộ đỏ đẹp hay bộ trắng đẹp?",
       "py": "A: Nǐ kàn zhè liǎngjiàn yīfú, hóng de hǎokàn háishì bái de hǎokàn?"
      },
      {
       "hz": "A:今天好冷。",
       "vi": "A: Hôm nay lạnh quá.",
       "py": "A: Jīntiān hǎo lěng."
      },
      {
       "hz": "A:我很餓，也很渴。",
       "vi": "A: Tôi đói quá, cũng khát nữa.",
       "py": "A: Wǒ hěn è, yě hěnkě."
      },
      {
       "hz": "你的書在房間裡。",
       "vi": "Sách của bạn ở trong phòng.",
       "py": "Nǐ de shū zài fángjiān lǐ."
      },
      {
       "hz": "他在房間外面做什麼？",
       "vi": "Anh ấy đang làm gì ở ngoài phòng?",
       "py": "Tā zài fángjiān wàimiàn zuò shénme?"
      },
      {
       "hz": "你的筆在那本書上面。",
       "vi": "Bút của bạn ở trên quyển sách kia.",
       "py": "Nǐ de bǐ zài nàběnshū shàngmiàn."
      },
      {
       "hz": "你的錢包在那件衣服下面。",
       "vi": "Ví tiền của bạn ở dưới bộ quần áo kia.",
       "py": "Nǐ de qiánbāo zài nà jiàn yīfú xiàmiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt đề nghị với 吧",
   "giaiThich": "吧 đặt cuối câu để nêu đề nghị, rủ rê hoặc phỏng đoán nhẹ nhàng."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": "\"Noun + Directional Word\" is used to denote the  direction and the location of a place.",
     "examples": [
      {
       "hz": "A:那家餐廳在你家旁邊嗎？",
       "vi": "A: Nhà hàng đó ở cạnh nhà bạn à?",
       "py": "A: Nà jiā cāntīng zài nǐjiā pángbiān ma?"
      },
      {
       "hz": "桌子上面。",
       "vi": "Trên bàn.",
       "py": "Zhuōzi shàngmiàn."
      },
      {
       "hz": "學校旁邊。",
       "vi": "Cạnh trường.",
       "py": "Xuéxiào pángbiān."
      },
      {
       "hz": "B:不在我家旁邊，在我家後面。",
       "vi": "B: Không ở cạnh nhà tôi, ở sau nhà tôi.",
       "py": "B: Bú zài wǒjiā pángbiān, zài wǒjiā hòumiàn."
      },
      {
       "hz": "A:我的筆在哪裡？",
       "vi": "A: Bút của tôi đâu rồi?",
       "py": "A: Wǒ de bǐ zài nǎlǐ?"
      },
      {
       "hz": "B:你看，你的筆在椅子下面。",
       "vi": "B: Bạn xem kìa, bút của bạn ở dưới ghế.",
       "py": "B: Nǐ kàn, nǐ de bǐ zài yǐzi xiàmiàn."
      },
      {
       "hz": "A:他們都在房間裡面嗎？",
       "vi": "A: Họ đều ở trong phòng à?",
       "py": "A: Tāmen dōu zài fángjiān lǐmiàn ma?"
      },
      {
       "hz": "B:哥哥在房間裡面，我不知道弟弟在哪裡。",
       "vi": "B: Anh trai ở trong phòng, tôi không biết em trai ở đâu.",
       "py": "B: Gēge zài fángjiān lǐmiàn, wǒ bù zhīdào dìdi zài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他在房間裡睡覺。",
       "vi": "Anh ấy đang ngủ trong phòng.",
       "py": "Tā zài fángjiān lǐ shuìjiào."
      },
      {
       "hz": "那個孩子在媽媽旁邊看書。",
       "vi": "Đứa bé kia đang đọc sách cạnh mẹ.",
       "py": "Nàge háizi zài māma pángbiān kànshū."
      },
      {
       "hz": "他們在圖書館外面做什麼？",
       "vi": "Họ đang làm gì ở ngoài thư viện?",
       "py": "Tāmen zài túshūguǎn wàimiàn zuò shénme?"
      },
      {
       "hz": "A:弟弟在哪裡？",
       "vi": "A: Em trai ở đâu?",
       "py": "A: Dìdi zài nǎlǐ?"
      },
      {
       "hz": "A:我的書在哪裡？",
       "vi": "A: Sách của tôi ở đâu?",
       "py": "A: Wǒ de shū zài nǎlǐ?"
      },
      {
       "hz": "A:她在哪裡看書？",
       "vi": "A: Cô ấy đọc sách ở đâu?",
       "py": "A: Tā zài nǎlǐ kànshū?"
      },
      {
       "hz": "A:小明在圖書館裡面做什麼？",
       "vi": "A: Tiểu Minh đang làm gì trong thư viện?",
       "py": "A: Xiǎo míng zài túshūguǎn lǐmiàn zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "II. Existential Sentences with 有",
   "points": [
    {
     "label": null,
     "formula": "有 can be placed after a place word to express ‘‘ there is/are something on a place’’ and is always negated with 沒.",
     "examples": [
      {
       "hz": "很多好吃的東西。",
       "vi": "Rất nhiều món ngon.",
       "py": "Hěnduō hǎochī de dōngxī."
      },
      {
       "hz": "很多東西。",
       "vi": "Rất nhiều đồ.",
       "py": "Hěnduō dōngxī."
      },
      {
       "hz": "A：台灣有什麼好吃的東西？",
       "vi": "A: Đài Loan có món gì ngon?",
       "py": "A: Táiwān yǒu shénme hǎochī de dōngxī?"
      },
      {
       "hz": "B：水果、牛肉麵跟小籠包，我都很喜歡。",
       "vi": "B: Trái cây, mì bò và bánh bao nhỏ, món nào tôi cũng rất thích.",
       "py": "B: Shuǐguǒ, niúròumiàn gēn xiǎolóngbāo, wǒ dōu hěn xǐhuān."
      },
      {
       "hz": "A：你們學校旁邊有什麼？",
       "vi": "A: Cạnh trường các bạn có gì?",
       "py": "A: Nǐmen xuéxiào pángbiān yǒu shénme?"
      },
      {
       "hz": "B：我們學校旁邊有一家很大的餐廳。",
       "vi": "B: Cạnh trường chúng tôi có một nhà hàng rất lớn.",
       "py": "B: Wǒmen xuéxiào pángbiān yǒu yìjiā hěndà de cāntīng."
      },
      {
       "hz": "A：那個房間裡面有桌子、椅子嗎？",
       "vi": "A: Trong căn phòng đó có bàn, ghế không?",
       "py": "A: Nàge fángjiān lǐmiàn yǒu zhuōzi, yǐzi ma?"
      },
      {
       "hz": "B：房間裡面有一張桌子跟兩張椅子。",
       "vi": "B: Trong phòng có một cái bàn và hai cái ghế.",
       "py": "B: Fángjiān lǐmiàn yǒu yìzhāng zhuōzi gēn liǎngzhāng yǐzi."
      },
      {
       "hz": "A:我們學校有多少學生？",
       "vi": "A: Trường chúng ta có bao nhiêu học sinh?",
       "py": "A: Wǒmen xuéxiào yǒu duōshǎo xuéshēng?"
      },
      {
       "hz": "A:你家旁邊有飲料店嗎？",
       "vi": "A: Cạnh nhà bạn có tiệm đồ uống không?",
       "py": "A: Nǐjiā pángbiān yǒu yǐnliàodiàn ma?"
      },
      {
       "hz": "A:你的桌子上面有什麼東西？",
       "vi": "A: Trên bàn của bạn có những gì?",
       "py": "A: Nǐ de zhuōzi shàngmiàn yǒu shénme dōngxī?"
      },
      {
       "hz": "他的房間裡面有什麼家具？",
       "vi": "Trong phòng anh ấy có những đồ nội thất gì?",
       "py": "Tā de fángjiān lǐmiàn yǒu shénme jiājù?"
      },
      {
       "hz": "他的房間有窗戶嗎？",
       "vi": "Phòng anh ấy có cửa sổ không?",
       "py": "Tā de fángjiān yǒu chuānghù ma?"
      },
      {
       "hz": "他有貓/狗嗎？他的貓/狗喜歡做什麼？",
       "vi": "Anh ấy có nuôi mèo/chó không? Mèo/chó của anh ấy thích làm gì?",
       "py": "Tā yǒu māo / gǒu ma? Tā de māo / gǒu xǐhuān zuò shénme?"
      },
      {
       "hz": "他喜歡在家裡做什麼？",
       "vi": "Anh ấy thích làm gì ở nhà?",
       "py": "Tā xǐhuān zài jiālǐ zuò shénme?"
      },
      {
       "hz": "我想買一台電視機。",
       "vi": "Tôi muốn mua một chiếc tivi.",
       "py": "Wǒ xiǎng mǎi yìtái diànshìjī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu tồn tại với 有",
   "giaiThich": "有 đặt sau từ chỉ nơi chốn, nghĩa \"ở đâu đó có gì\"; phủ định dùng 沒."
  }
 ],
 "td1-5.4": [
  {
   "title": "I. 在 as a Verb with a Place Word (PW)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, 在 always precedes the place word.",
     "examples": [
      {
       "hz": "A：你爸爸在哪裡？",
       "vi": "A: Bố bạn ở đâu?",
       "py": "A: Nǐ bàba zài nǎlǐ?"
      },
      {
       "hz": "B：他在他朋友家。",
       "vi": "B: Bố tôi ở nhà bạn của bố.",
       "py": "B: Tā zài tā péngyǒujiā."
      },
      {
       "hz": "A：他在學校嗎？",
       "vi": "A: Anh ấy có ở trường không?",
       "py": "A: Tā zài xuéxiào ma?"
      },
      {
       "hz": "B：他不在學校，他在咖啡廳。",
       "vi": "B: Anh ấy không ở trường, anh ấy ở quán cà phê.",
       "py": "B: Tā bú zài xuéxiào, tā zài kāfēitīng."
      },
      {
       "hz": "A：老師在哪裡？",
       "vi": "A: Thầy giáo ở đâu?",
       "py": "A: Lǎoshī zài nǎlǐ?"
      },
      {
       "hz": "B：老師不在這裡，我不知道他在哪裡。",
       "vi": "B: Thầy giáo không ở đây, tôi không biết thầy ở đâu.",
       "py": "B: Lǎoshī bú zài zhèlǐ, wǒ bù zhīdào tā zài nǎlǐ."
      },
      {
       "hz": "A:他們在哪裡？",
       "vi": "A: Họ ở đâu?",
       "py": "A: Tāmen zài nǎlǐ?"
      },
      {
       "hz": "A:小美在圖書館嗎？",
       "vi": "A: Tiểu Mỹ có ở thư viện không?",
       "py": "A: Xiǎo měi zài túshūguǎn ma?"
      },
      {
       "hz": "B:李(Lǐ)老師今天早上九點在學校。",
       "vi": "B: Chín giờ sáng nay thầy Lý ở trường.",
       "py": "B: Lǐ lǎoshī jīntiān zǎoshàng jiǔdiǎn zài xuéxiào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 làm động từ đi với từ chỉ nơi chốn",
   "giaiThich": "在 luôn đứng trước từ chỉ nơi chốn, nghĩa là \"ở (đâu đó)\"."
  },
  {
   "title": "II. Location of an Action",
   "points": [
    {
     "label": null,
     "formula": "在+PW precedes an action to express where the action is taking place.",
     "examples": [
      {
       "hz": "上中文課。",
       "vi": "Học tiết tiếng Trung.",
       "py": "Shàng zhōngwén kè."
      },
      {
       "hz": "A：你週末要做什麼？",
       "vi": "A: Cuối tuần bạn định làm gì?",
       "py": "A: Nǐ zhōumò yào zuò shénme?"
      },
      {
       "hz": "B：我要在家看書。",
       "vi": "B: Tôi định ở nhà đọc sách.",
       "py": "B: Wǒ yào zàijiā kànshū."
      },
      {
       "hz": "A：小美在哪裡？",
       "vi": "A: Tiểu Mỹ ở đâu?",
       "py": "A: Xiǎo měi zài nǎlǐ?"
      },
      {
       "hz": "B：她在學校上課。",
       "vi": "B: Cô ấy đang học ở trường.",
       "py": "B: Tā zài xuéxiào shàngkè."
      },
      {
       "hz": "A：他們在中明家玩嗎？",
       "vi": "A: Họ chơi ở nhà Trung Minh phải không?",
       "py": "A: Tāmen zài Zhōngmíng jiā wán ma?"
      },
      {
       "hz": "B：他們不在中明家玩，他們在圖書館看書。",
       "vi": "B: Họ không chơi ở nhà Trung Minh, họ đọc sách ở thư viện.",
       "py": "B: Tāmen bú zài Zhōngmíng jiā wán, tāmen zài túshūguǎn kànshū."
      },
      {
       "hz": "A:你在哪裡買咖啡？",
       "vi": "A: Bạn mua cà phê ở đâu?",
       "py": "A: Nǐ zài nǎlǐ mǎi kāfēi?"
      },
      {
       "hz": "A:你喜歡在家做什麼？",
       "vi": "A: Bạn thích làm gì ở nhà?",
       "py": "A: Nǐ xǐhuān zàijiā zuò shénme?"
      },
      {
       "hz": "A:你今天要在家吃晚飯嗎？",
       "vi": "A: Hôm nay bạn có ăn tối ở nhà không?",
       "py": "A: Nǐ jīntiān yào zàijiā chīwǎnfàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nơi diễn ra hành động",
   "giaiThich": "在 + nơi chốn đặt TRƯỚC động từ để nói hành động xảy ra ở đâu."
  },
  {
   "title": "III. Expressing Suggestion with 吧",
   "points": [
    {
     "label": null,
     "formula": "吧 is placed at the end of a sentence, to express the suggestion from the speaker. Nǐ kàn zhè liǎng jiàn yīfu, hóng de hǎokàn háishì bái de hǎokàn? above; over; on top of; on the surface of",
     "examples": [
      {
       "hz": "這個蛋糕太大，你買小的吧。",
       "vi": "Cái bánh kem này to quá, bạn mua cái nhỏ đi.",
       "py": "Zhège dàngāo tài dà, nǐ mǎi xiǎo de ba."
      },
      {
       "hz": "那杯水太熱，你喝這杯吧。",
       "vi": "Cốc nước kia nóng quá, bạn uống cốc này đi.",
       "py": "Nà bēishuǐ tài rè, nǐ hē zhè bēi ba."
      },
      {
       "hz": "A：我想去圖書館看書。",
       "vi": "A: Tôi muốn đến thư viện đọc sách.",
       "py": "A: Wǒ xiǎng qù túshūguǎn kànshū."
      },
      {
       "hz": "B：我也想去，我們一起去吧。",
       "vi": "B: Tôi cũng muốn đi, chúng ta cùng đi nhé.",
       "py": "B: Wǒ yě xiǎng qù, wǒmen yìqǐ qù ba."
      },
      {
       "hz": "B：都很好看，這兩件妳都買吧。",
       "vi": "B: Cả hai đều đẹp, bạn mua cả hai bộ đi.",
       "py": "B: Dōu hěn hǎokàn, zhè liǎngjiàn nǐ dōu mǎi ba."
      },
      {
       "hz": "A：你看這兩件衣服，紅的好看還是白的好看？",
       "vi": "A: Bạn xem hai bộ quần áo này, bộ đỏ đẹp hay bộ trắng đẹp?",
       "py": "A: Nǐ kàn zhè liǎngjiàn yīfú, hóng de hǎokàn háishì bái de hǎokàn?"
      },
      {
       "hz": "A:今天好冷。",
       "vi": "A: Hôm nay lạnh quá.",
       "py": "A: Jīntiān hǎo lěng."
      },
      {
       "hz": "A:我很餓，也很渴。",
       "vi": "A: Tôi đói quá, cũng khát nữa.",
       "py": "A: Wǒ hěn è, yě hěnkě."
      },
      {
       "hz": "你的書在房間裡。",
       "vi": "Sách của bạn ở trong phòng.",
       "py": "Nǐ de shū zài fángjiān lǐ."
      },
      {
       "hz": "他在房間外面做什麼？",
       "vi": "Anh ấy đang làm gì ở ngoài phòng?",
       "py": "Tā zài fángjiān wàimiàn zuò shénme?"
      },
      {
       "hz": "你的筆在那本書上面。",
       "vi": "Bút của bạn ở trên quyển sách kia.",
       "py": "Nǐ de bǐ zài nàběnshū shàngmiàn."
      },
      {
       "hz": "你的錢包在那件衣服下面。",
       "vi": "Ví tiền của bạn ở dưới bộ quần áo kia.",
       "py": "Nǐ de qiánbāo zài nà jiàn yīfú xiàmiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Diễn đạt đề nghị với 吧",
   "giaiThich": "吧 đặt cuối câu để nêu đề nghị, rủ rê hoặc phỏng đoán nhẹ nhàng."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": "\"Noun + Directional Word\" is used to denote the  direction and the location of a place.",
     "examples": [
      {
       "hz": "A:那家餐廳在你家旁邊嗎？",
       "vi": "A: Nhà hàng đó ở cạnh nhà bạn à?",
       "py": "A: Nà jiā cāntīng zài nǐjiā pángbiān ma?"
      },
      {
       "hz": "桌子上面。",
       "vi": "Trên bàn.",
       "py": "Zhuōzi shàngmiàn."
      },
      {
       "hz": "學校旁邊。",
       "vi": "Cạnh trường.",
       "py": "Xuéxiào pángbiān."
      },
      {
       "hz": "B:不在我家旁邊，在我家後面。",
       "vi": "B: Không ở cạnh nhà tôi, ở sau nhà tôi.",
       "py": "B: Bú zài wǒjiā pángbiān, zài wǒjiā hòumiàn."
      },
      {
       "hz": "A:我的筆在哪裡？",
       "vi": "A: Bút của tôi đâu rồi?",
       "py": "A: Wǒ de bǐ zài nǎlǐ?"
      },
      {
       "hz": "B:你看，你的筆在椅子下面。",
       "vi": "B: Bạn xem kìa, bút của bạn ở dưới ghế.",
       "py": "B: Nǐ kàn, nǐ de bǐ zài yǐzi xiàmiàn."
      },
      {
       "hz": "A:他們都在房間裡面嗎？",
       "vi": "A: Họ đều ở trong phòng à?",
       "py": "A: Tāmen dōu zài fángjiān lǐmiàn ma?"
      },
      {
       "hz": "B:哥哥在房間裡面，我不知道弟弟在哪裡。",
       "vi": "B: Anh trai ở trong phòng, tôi không biết em trai ở đâu.",
       "py": "B: Gēge zài fángjiān lǐmiàn, wǒ bù zhīdào dìdi zài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "I. Nouns + Directional Word as a Place Word",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他在房間裡睡覺。",
       "vi": "Anh ấy đang ngủ trong phòng.",
       "py": "Tā zài fángjiān lǐ shuìjiào."
      },
      {
       "hz": "那個孩子在媽媽旁邊看書。",
       "vi": "Đứa bé kia đang đọc sách cạnh mẹ.",
       "py": "Nàge háizi zài māma pángbiān kànshū."
      },
      {
       "hz": "他們在圖書館外面做什麼？",
       "vi": "Họ đang làm gì ở ngoài thư viện?",
       "py": "Tāmen zài túshūguǎn wàimiàn zuò shénme?"
      },
      {
       "hz": "A:弟弟在哪裡？",
       "vi": "A: Em trai ở đâu?",
       "py": "A: Dìdi zài nǎlǐ?"
      },
      {
       "hz": "A:我的書在哪裡？",
       "vi": "A: Sách của tôi ở đâu?",
       "py": "A: Wǒ de shū zài nǎlǐ?"
      },
      {
       "hz": "A:她在哪裡看書？",
       "vi": "A: Cô ấy đọc sách ở đâu?",
       "py": "A: Tā zài nǎlǐ kànshū?"
      },
      {
       "hz": "A:小明在圖書館裡面做什麼？",
       "vi": "A: Tiểu Minh đang làm gì trong thư viện?",
       "py": "A: Xiǎo míng zài túshūguǎn lǐmiàn zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Danh từ + từ chỉ phương hướng",
   "giaiThich": "Ghép \"danh từ + từ chỉ phương hướng\" (上, 下, 裡, 外…) để chỉ vị trí, nơi chốn."
  },
  {
   "title": "II. Existential Sentences with 有",
   "points": [
    {
     "label": null,
     "formula": "有 can be placed after a place word to express ‘‘ there is/are something on a place’’ and is always negated with 沒.",
     "examples": [
      {
       "hz": "很多好吃的東西。",
       "vi": "Rất nhiều món ngon.",
       "py": "Hěnduō hǎochī de dōngxī."
      },
      {
       "hz": "很多東西。",
       "vi": "Rất nhiều đồ.",
       "py": "Hěnduō dōngxī."
      },
      {
       "hz": "A：台灣有什麼好吃的東西？",
       "vi": "A: Đài Loan có món gì ngon?",
       "py": "A: Táiwān yǒu shénme hǎochī de dōngxī?"
      },
      {
       "hz": "B：水果、牛肉麵跟小籠包，我都很喜歡。",
       "vi": "B: Trái cây, mì bò và bánh bao nhỏ, món nào tôi cũng rất thích.",
       "py": "B: Shuǐguǒ, niúròumiàn gēn xiǎolóngbāo, wǒ dōu hěn xǐhuān."
      },
      {
       "hz": "A：你們學校旁邊有什麼？",
       "vi": "A: Cạnh trường các bạn có gì?",
       "py": "A: Nǐmen xuéxiào pángbiān yǒu shénme?"
      },
      {
       "hz": "B：我們學校旁邊有一家很大的餐廳。",
       "vi": "B: Cạnh trường chúng tôi có một nhà hàng rất lớn.",
       "py": "B: Wǒmen xuéxiào pángbiān yǒu yìjiā hěndà de cāntīng."
      },
      {
       "hz": "A：那個房間裡面有桌子、椅子嗎？",
       "vi": "A: Trong căn phòng đó có bàn, ghế không?",
       "py": "A: Nàge fángjiān lǐmiàn yǒu zhuōzi, yǐzi ma?"
      },
      {
       "hz": "B：房間裡面有一張桌子跟兩張椅子。",
       "vi": "B: Trong phòng có một cái bàn và hai cái ghế.",
       "py": "B: Fángjiān lǐmiàn yǒu yìzhāng zhuōzi gēn liǎngzhāng yǐzi."
      },
      {
       "hz": "A:我們學校有多少學生？",
       "vi": "A: Trường chúng ta có bao nhiêu học sinh?",
       "py": "A: Wǒmen xuéxiào yǒu duōshǎo xuéshēng?"
      },
      {
       "hz": "A:你家旁邊有飲料店嗎？",
       "vi": "A: Cạnh nhà bạn có tiệm đồ uống không?",
       "py": "A: Nǐjiā pángbiān yǒu yǐnliàodiàn ma?"
      },
      {
       "hz": "A:你的桌子上面有什麼東西？",
       "vi": "A: Trên bàn của bạn có những gì?",
       "py": "A: Nǐ de zhuōzi shàngmiàn yǒu shénme dōngxī?"
      },
      {
       "hz": "他的房間裡面有什麼家具？",
       "vi": "Trong phòng anh ấy có những đồ nội thất gì?",
       "py": "Tā de fángjiān lǐmiàn yǒu shénme jiājù?"
      },
      {
       "hz": "他的房間有窗戶嗎？",
       "vi": "Phòng anh ấy có cửa sổ không?",
       "py": "Tā de fángjiān yǒu chuānghù ma?"
      },
      {
       "hz": "他有貓/狗嗎？他的貓/狗喜歡做什麼？",
       "vi": "Anh ấy có nuôi mèo/chó không? Mèo/chó của anh ấy thích làm gì?",
       "py": "Tā yǒu māo / gǒu ma? Tā de māo / gǒu xǐhuān zuò shénme?"
      },
      {
       "hz": "他喜歡在家裡做什麼？",
       "vi": "Anh ấy thích làm gì ở nhà?",
       "py": "Tā xǐhuān zài jiālǐ zuò shénme?"
      },
      {
       "hz": "我想買一台電視機。",
       "vi": "Tôi muốn mua một chiếc tivi.",
       "py": "Wǒ xiǎng mǎi yìtái diànshìjī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu tồn tại với 有",
   "giaiThich": "有 đặt sau từ chỉ nơi chốn, nghĩa \"ở đâu đó có gì\"; phủ định dùng 沒."
  }
 ],
 "td1-6.1": [
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "A:你跑得快不快？",
       "vi": "A: Bạn chạy có nhanh không?",
       "py": "A: Nǐ pǎodekuài búkuài?"
      },
      {
       "hz": "B:我跑得很慢。",
       "vi": "B: Tôi chạy rất chậm.",
       "py": "B: Wǒ pǎo de hěn màn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "我每天都睡得很好。",
       "vi": "Ngày nào tôi cũng ngủ rất ngon.",
       "py": "Wǒ měitiān dōu shuì de hěn hǎo."
      },
      {
       "hz": "我哥哥走得好快，我妹妹走得好慢。",
       "vi": "Anh trai tôi đi rất nhanh, em gái tôi đi rất chậm.",
       "py": "Wǒ gēge zǒu de hǎo kuài, wǒ mèimei zǒu de hǎo màn."
      },
      {
       "hz": "A : 他喝得多不多？",
       "vi": "A: Anh ấy uống có nhiều không?",
       "py": "A: Tā hē de duōbùduō?"
      },
      {
       "hz": "A : 他吃得很多嗎？",
       "vi": "A: Anh ấy ăn nhiều lắm à?",
       "py": "A: Tā chī de hěnduō ma?"
      },
      {
       "hz": "A : 你昨天晚上睡得怎麼樣？",
       "vi": "A: Tối qua bạn ngủ thế nào?",
       "py": "A: Nǐ zuótiānwǎnshàng shuì de zěnmeyàng?"
      },
      {
       "hz": "A : 你游泳游得怎麼樣？",
       "vi": "A: Bạn bơi thế nào?",
       "py": "A: Nǐ yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "B : 我游泳游得不太好。",
       "vi": "B: Tôi bơi không giỏi lắm.",
       "py": "B: Wǒ yóuyǒng yóu de bútàihǎo."
      },
      {
       "hz": "A : 你騎腳踏車騎得快不快？",
       "vi": "A: Bạn đạp xe có nhanh không?",
       "py": "A: Nǐ qí jiǎotàchē qí de kuài búkuài?"
      },
      {
       "hz": "B : 我騎腳踏車騎得很慢。",
       "vi": "B: Tôi đạp xe rất chậm.",
       "py": "B: Wǒ qí jiǎotàchē qí de hěn màn."
      },
      {
       "hz": "A : 你朋友打網球打得怎麼樣？",
       "vi": "A: Bạn của bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ péngyǒu dǎwǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "A : 昨天他睡覺睡得好嗎？",
       "vi": "A: Hôm qua anh ấy ngủ có ngon không?",
       "py": "A: Zuótiān tā shuìjiào shuì de hǎo ma?"
      },
      {
       "hz": "A : 你踢足球踢得好不好？",
       "vi": "A: Bạn đá bóng có giỏi không?",
       "py": "A: Nǐ tīzúqiú tī de hǎobùhǎo?"
      },
      {
       "hz": "A : 他網球打得怎麼樣？",
       "vi": "A: Anh ấy chơi quần vợt thế nào?",
       "py": "A: Tā wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 他網球打得不錯。",
       "vi": "B: Anh ấy chơi quần vợt khá giỏi.",
       "py": "B: Tā wǎngqiú dǎ de búcuò."
      },
      {
       "hz": "A : 你們飯吃得多不多？",
       "vi": "A: Các bạn ăn cơm có nhiều không?",
       "py": "A: Nǐmen fàn chī de duōbùduō?"
      },
      {
       "hz": "B : 我飯吃得不多，他吃得很多。",
       "vi": "B: Tôi ăn không nhiều, anh ấy ăn rất nhiều.",
       "py": "B: Wǒ fàn chī de bù duō, tā chī de hěnduō."
      },
      {
       "hz": "A : 你媽媽牛肉麵做得好不好？",
       "vi": "A: Mẹ bạn nấu mì bò có ngon không?",
       "py": "A: Nǐ māma niúròumiàn zuò de hǎobùhǎo?"
      },
      {
       "hz": "A : 你網球打得怎麼樣？",
       "vi": "A: Bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 我哥哥棒球打得很好。",
       "vi": "B: Anh trai tôi chơi bóng chày rất giỏi.",
       "py": "B: Wǒ gēge bàngqiú dǎ de hěn hǎo."
      },
      {
       "hz": "A : 你弟弟的足球踢得好嗎？",
       "vi": "A: Em trai bạn đá bóng có giỏi không?",
       "py": "A: Nǐ dìdi de zúqiú tī de hǎo ma?"
      },
      {
       "hz": "B : 我弟弟的足球踢得很好。",
       "vi": "B: Em trai tôi đá bóng rất giỏi.",
       "py": "B: Wǒ dìdi de zúqiú tī de hěn hǎo."
      },
      {
       "hz": "A : 她的腳踏車騎得快嗎？",
       "vi": "A: Cô ấy đạp xe có nhanh không?",
       "py": "A: Tā de jiǎotàchē qí de kuài ma?"
      },
      {
       "hz": "B : 她的腳踏車騎得不快。",
       "vi": "B: Cô ấy đạp xe không nhanh.",
       "py": "B: Tā de jiǎotàchē qí de búkuài."
      },
      {
       "hz": "A : 你的飯做得怎麼樣？",
       "vi": "A: Bạn nấu cơm thế nào?",
       "py": "A: Nǐ de fàn zuò de zěnmeyàng?"
      },
      {
       "hz": "A : 你哥哥的籃球打得好不好？",
       "vi": "A: Anh trai bạn chơi bóng rổ có giỏi không?",
       "py": "A: Nǐ gēge de lánqiú dǎ de hǎobùhǎo?"
      },
      {
       "hz": "B : 她的英文說得很好。",
       "vi": "B: Cô ấy nói tiếng Anh rất giỏi.",
       "py": "B: Tā de yīngwén shuō de hěn hǎo."
      },
      {
       "hz": "國安晚上想去做什麼？",
       "vi": "Tối nay Quốc An muốn đi làm gì?",
       "py": "Guó'ān wǎnshàng xiǎng qù zuò shénme?"
      },
      {
       "hz": "中明常常做什麼？",
       "vi": "Trung Minh thường làm gì?",
       "py": "Zhōngmíng chángcháng zuò shénme?"
      },
      {
       "hz": "中明明天想做什麼？",
       "vi": "Ngày mai Trung Minh muốn làm gì?",
       "py": "Zhōngmíng míngtiān xiǎng zuò shénme?"
      },
      {
       "hz": "後天天氣熱嗎？",
       "vi": "Ngày kia trời có nóng không?",
       "py": "Hòutiān tiānqì rè ma?"
      },
      {
       "hz": "那家店的冰淇淋很好吃，可是有點兒貴。",
       "vi": "Kem của tiệm đó rất ngon, nhưng hơi đắt.",
       "py": "Nà jiā diàn de bīngqílín hěn hǎochī, kěshì yǒudiǎn'ér guì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "I. 有(一)點(兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": "有(一)點(兒）is used as an adverb to express slightly / a little, modifying the Vs that follows it.",
     "examples": [
      {
       "hz": "A : 我們在這家咖啡廳喝咖啡吧。",
       "vi": "A: Chúng ta uống cà phê ở quán này nhé.",
       "py": "A: Wǒmen zài zhèjiā kāfēitīng hēkāfēi ba."
      },
      {
       "hz": "B :一杯咖啡一百八十塊錢，我覺得有點兒貴。",
       "vi": "B: Một cốc cà phê một trăm tám mươi đồng, tôi thấy hơi đắt.",
       "py": "B: Yībēi kāfēi yìbǎibāshí kuàiqián, wǒ juéde yǒudiǎn'ér guì."
      },
      {
       "hz": "我們去那家吧。",
       "vi": "Chúng ta đi quán kia đi.",
       "py": "Wǒmen qù nà jiā ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "I. 有(一)點 (兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 我們今天晚上去看電影，好不好？",
       "vi": "A: Tối nay chúng ta đi xem phim, được không?",
       "py": "A: Wǒmen jīntiān wǎnshàng qù kàn diànyǐng, hǎobùhǎo?"
      },
      {
       "hz": "B : 今天我有點兒忙，我不想去。",
       "vi": "B: Hôm nay tôi hơi bận, tôi không muốn đi.",
       "py": "B: Jīntiān wǒ yǒudiǎn'ér máng, wǒ bùxiǎng qù."
      },
      {
       "hz": "A : 這件衣服很漂亮，也很便宜，你不買嗎？",
       "vi": "A: Bộ quần áo này rất đẹp, lại rẻ, bạn không mua à?",
       "py": "A: Zhèjiàn yīfú hěnpiàoliàng, yě hěn piányi, nǐ bù mǎi ma?"
      },
      {
       "hz": "B : 我很喜歡這件衣服，可是我覺得有點兒小。",
       "vi": "B: Tôi rất thích bộ này, nhưng tôi thấy hơi nhỏ.",
       "py": "B: Wǒ hěn xǐhuān zhèjiàn yīfú, kěshì wǒ juéde yǒudiǎn'ér xiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 對不起，我不喝咖啡。",
       "vi": "A: Xin lỗi, tôi không uống cà phê.",
       "py": "A: Duìbùqǐ, wǒ bù hēkāfēi."
      },
      {
       "hz": "B : 沒關係，你可以點一杯熱茶。",
       "vi": "B: Không sao, bạn có thể gọi một cốc trà nóng.",
       "py": "B: Méiguānxì, nǐ kěyǐ diǎn yìbēi rèchá."
      },
      {
       "hz": "A : 我不知道要送媽媽什麼禮物。",
       "vi": "A: Tôi không biết nên tặng mẹ quà gì.",
       "py": "A: Wǒ bù zhīdào yào sòng māma shénme lǐwù."
      },
      {
       "hz": "B : 你可以送她一件紅色的新衣服。",
       "vi": "B: Bạn có thể tặng mẹ một bộ quần áo mới màu đỏ.",
       "py": "B: Nǐ kěyǐ sòng tā yíjiàn hóngsè de xīn yīfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 你想要點什麼？",
       "vi": "A: Bạn muốn gọi gì?",
       "py": "A: Nǐ xiǎngyào diǎn shénme?"
      },
      {
       "hz": "B : 這裡的珍珠奶茶很好喝，我們可以點（珍珠奶茶）。",
       "vi": "B: Trà sữa trân châu ở đây rất ngon, chúng ta có thể gọi (trà sữa trân châu).",
       "py": "B: Zhèlǐ de zhēnzhūnǎichá hěn hǎohē, wǒmen kěyǐ diǎn (zhēnzhūnǎichá)."
      },
      {
       "hz": "A : 我現在不餓，不想吃飯。",
       "vi": "A: Bây giờ tôi không đói, không muốn ăn cơm.",
       "py": "A: Wǒ xiànzài bú è, bùxiǎng chīfàn."
      },
      {
       "hz": "A : 天氣好熱，我不要去外面。",
       "vi": "A: Trời nóng quá, tôi không muốn ra ngoài.",
       "py": "A: Tiānqì hǎo rè, wǒ búyào qù wàimiàn."
      },
      {
       "hz": "A : 聽說那部電影很不錯。",
       "vi": "A: Nghe nói bộ phim đó rất hay.",
       "py": "A: Tīngshuō nà bù diànyǐng hěn búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux 可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:媽媽，我可以吃冰淇淋嗎？",
       "vi": "A: Mẹ ơi, con ăn kem được không?",
       "py": "A: Māma, wǒ kěyǐ chī bīngqílín ma?"
      },
      {
       "hz": "B:太冷了，不可以。",
       "vi": "B: Lạnh quá, không được.",
       "py": "B: Tàilěng le, bù kěyǐ."
      },
      {
       "hz": "A:老師，我現在可以去洗手間嗎？",
       "vi": "A: Thưa cô, bây giờ em đi vệ sinh được không ạ?",
       "py": "A: Lǎoshī, wǒ xiànzài kěyǐ qù xǐshǒujiān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:我們可不可以在捷運上吃東西？",
       "vi": "A: Chúng ta có được ăn uống trên tàu điện ngầm không?",
       "py": "A: Wǒmen kěbùkěyǐ zài jiéyùn shàng chī dōngxī?"
      },
      {
       "hz": "B:不可以，也不可以喝飲料。",
       "vi": "B: Không được, uống đồ uống cũng không được.",
       "py": "B: Bù kěyǐ, yě bù kěyǐ hē yǐnliào."
      },
      {
       "hz": "他們都喜歡做什麼？",
       "vi": "Họ đều thích làm gì?",
       "py": "Tāmen dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "週末他們常一起做什麼？",
       "vi": "Cuối tuần họ thường cùng nhau làm gì?",
       "py": "Zhōumò tāmen cháng yìqǐ zuò shénme?"
      },
      {
       "hz": "宜文游泳游得怎麼樣？",
       "vi": "Nghi Văn bơi thế nào?",
       "py": "Yíwén yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "國安的籃球打得怎麼樣？",
       "vi": "Quốc An chơi bóng rổ thế nào?",
       "py": "Guó'ān de lánqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "他們喜歡看什麼比賽？",
       "vi": "Họ thích xem trận đấu gì?",
       "py": "Tāmen xǐhuān kàn shénme bǐsài?"
      },
      {
       "hz": "我平常喜歡喝茶，有(的)時候喝一點兒咖啡。",
       "vi": "Bình thường tôi thích uống trà, thỉnh thoảng uống một chút cà phê.",
       "py": "Wǒ píngcháng xǐhuān hēchá, yǒu (de) shíhòu hē yìdiǎn'ér kāfēi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  }
 ],
 "td1-6.2": [
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "A:你跑得快不快？",
       "vi": "A: Bạn chạy có nhanh không?",
       "py": "A: Nǐ pǎodekuài búkuài?"
      },
      {
       "hz": "B:我跑得很慢。",
       "vi": "B: Tôi chạy rất chậm.",
       "py": "B: Wǒ pǎo de hěn màn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "我每天都睡得很好。",
       "vi": "Ngày nào tôi cũng ngủ rất ngon.",
       "py": "Wǒ měitiān dōu shuì de hěn hǎo."
      },
      {
       "hz": "我哥哥走得好快，我妹妹走得好慢。",
       "vi": "Anh trai tôi đi rất nhanh, em gái tôi đi rất chậm.",
       "py": "Wǒ gēge zǒu de hǎo kuài, wǒ mèimei zǒu de hǎo màn."
      },
      {
       "hz": "A : 他喝得多不多？",
       "vi": "A: Anh ấy uống có nhiều không?",
       "py": "A: Tā hē de duōbùduō?"
      },
      {
       "hz": "A : 他吃得很多嗎？",
       "vi": "A: Anh ấy ăn nhiều lắm à?",
       "py": "A: Tā chī de hěnduō ma?"
      },
      {
       "hz": "A : 你昨天晚上睡得怎麼樣？",
       "vi": "A: Tối qua bạn ngủ thế nào?",
       "py": "A: Nǐ zuótiānwǎnshàng shuì de zěnmeyàng?"
      },
      {
       "hz": "A : 你游泳游得怎麼樣？",
       "vi": "A: Bạn bơi thế nào?",
       "py": "A: Nǐ yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "B : 我游泳游得不太好。",
       "vi": "B: Tôi bơi không giỏi lắm.",
       "py": "B: Wǒ yóuyǒng yóu de bútàihǎo."
      },
      {
       "hz": "A : 你騎腳踏車騎得快不快？",
       "vi": "A: Bạn đạp xe có nhanh không?",
       "py": "A: Nǐ qí jiǎotàchē qí de kuài búkuài?"
      },
      {
       "hz": "B : 我騎腳踏車騎得很慢。",
       "vi": "B: Tôi đạp xe rất chậm.",
       "py": "B: Wǒ qí jiǎotàchē qí de hěn màn."
      },
      {
       "hz": "A : 你朋友打網球打得怎麼樣？",
       "vi": "A: Bạn của bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ péngyǒu dǎwǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "A : 昨天他睡覺睡得好嗎？",
       "vi": "A: Hôm qua anh ấy ngủ có ngon không?",
       "py": "A: Zuótiān tā shuìjiào shuì de hǎo ma?"
      },
      {
       "hz": "A : 你踢足球踢得好不好？",
       "vi": "A: Bạn đá bóng có giỏi không?",
       "py": "A: Nǐ tīzúqiú tī de hǎobùhǎo?"
      },
      {
       "hz": "A : 他網球打得怎麼樣？",
       "vi": "A: Anh ấy chơi quần vợt thế nào?",
       "py": "A: Tā wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 他網球打得不錯。",
       "vi": "B: Anh ấy chơi quần vợt khá giỏi.",
       "py": "B: Tā wǎngqiú dǎ de búcuò."
      },
      {
       "hz": "A : 你們飯吃得多不多？",
       "vi": "A: Các bạn ăn cơm có nhiều không?",
       "py": "A: Nǐmen fàn chī de duōbùduō?"
      },
      {
       "hz": "B : 我飯吃得不多，他吃得很多。",
       "vi": "B: Tôi ăn không nhiều, anh ấy ăn rất nhiều.",
       "py": "B: Wǒ fàn chī de bù duō, tā chī de hěnduō."
      },
      {
       "hz": "A : 你媽媽牛肉麵做得好不好？",
       "vi": "A: Mẹ bạn nấu mì bò có ngon không?",
       "py": "A: Nǐ māma niúròumiàn zuò de hǎobùhǎo?"
      },
      {
       "hz": "A : 你網球打得怎麼樣？",
       "vi": "A: Bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 我哥哥棒球打得很好。",
       "vi": "B: Anh trai tôi chơi bóng chày rất giỏi.",
       "py": "B: Wǒ gēge bàngqiú dǎ de hěn hǎo."
      },
      {
       "hz": "A : 你弟弟的足球踢得好嗎？",
       "vi": "A: Em trai bạn đá bóng có giỏi không?",
       "py": "A: Nǐ dìdi de zúqiú tī de hǎo ma?"
      },
      {
       "hz": "B : 我弟弟的足球踢得很好。",
       "vi": "B: Em trai tôi đá bóng rất giỏi.",
       "py": "B: Wǒ dìdi de zúqiú tī de hěn hǎo."
      },
      {
       "hz": "A : 她的腳踏車騎得快嗎？",
       "vi": "A: Cô ấy đạp xe có nhanh không?",
       "py": "A: Tā de jiǎotàchē qí de kuài ma?"
      },
      {
       "hz": "B : 她的腳踏車騎得不快。",
       "vi": "B: Cô ấy đạp xe không nhanh.",
       "py": "B: Tā de jiǎotàchē qí de búkuài."
      },
      {
       "hz": "A : 你的飯做得怎麼樣？",
       "vi": "A: Bạn nấu cơm thế nào?",
       "py": "A: Nǐ de fàn zuò de zěnmeyàng?"
      },
      {
       "hz": "A : 你哥哥的籃球打得好不好？",
       "vi": "A: Anh trai bạn chơi bóng rổ có giỏi không?",
       "py": "A: Nǐ gēge de lánqiú dǎ de hǎobùhǎo?"
      },
      {
       "hz": "B : 她的英文說得很好。",
       "vi": "B: Cô ấy nói tiếng Anh rất giỏi.",
       "py": "B: Tā de yīngwén shuō de hěn hǎo."
      },
      {
       "hz": "國安晚上想去做什麼？",
       "vi": "Tối nay Quốc An muốn đi làm gì?",
       "py": "Guó'ān wǎnshàng xiǎng qù zuò shénme?"
      },
      {
       "hz": "中明常常做什麼？",
       "vi": "Trung Minh thường làm gì?",
       "py": "Zhōngmíng chángcháng zuò shénme?"
      },
      {
       "hz": "中明明天想做什麼？",
       "vi": "Ngày mai Trung Minh muốn làm gì?",
       "py": "Zhōngmíng míngtiān xiǎng zuò shénme?"
      },
      {
       "hz": "後天天氣熱嗎？",
       "vi": "Ngày kia trời có nóng không?",
       "py": "Hòutiān tiānqì rè ma?"
      },
      {
       "hz": "那家店的冰淇淋很好吃，可是有點兒貴。",
       "vi": "Kem của tiệm đó rất ngon, nhưng hơi đắt.",
       "py": "Nà jiā diàn de bīngqílín hěn hǎochī, kěshì yǒudiǎn'ér guì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "I. 有(一)點(兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": "有(一)點(兒）is used as an adverb to express slightly / a little, modifying the Vs that follows it.",
     "examples": [
      {
       "hz": "A : 我們在這家咖啡廳喝咖啡吧。",
       "vi": "A: Chúng ta uống cà phê ở quán này nhé.",
       "py": "A: Wǒmen zài zhèjiā kāfēitīng hēkāfēi ba."
      },
      {
       "hz": "B :一杯咖啡一百八十塊錢，我覺得有點兒貴。",
       "vi": "B: Một cốc cà phê một trăm tám mươi đồng, tôi thấy hơi đắt.",
       "py": "B: Yībēi kāfēi yìbǎibāshí kuàiqián, wǒ juéde yǒudiǎn'ér guì."
      },
      {
       "hz": "我們去那家吧。",
       "vi": "Chúng ta đi quán kia đi.",
       "py": "Wǒmen qù nà jiā ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "I. 有(一)點 (兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 我們今天晚上去看電影，好不好？",
       "vi": "A: Tối nay chúng ta đi xem phim, được không?",
       "py": "A: Wǒmen jīntiān wǎnshàng qù kàn diànyǐng, hǎobùhǎo?"
      },
      {
       "hz": "B : 今天我有點兒忙，我不想去。",
       "vi": "B: Hôm nay tôi hơi bận, tôi không muốn đi.",
       "py": "B: Jīntiān wǒ yǒudiǎn'ér máng, wǒ bùxiǎng qù."
      },
      {
       "hz": "A : 這件衣服很漂亮，也很便宜，你不買嗎？",
       "vi": "A: Bộ quần áo này rất đẹp, lại rẻ, bạn không mua à?",
       "py": "A: Zhèjiàn yīfú hěnpiàoliàng, yě hěn piányi, nǐ bù mǎi ma?"
      },
      {
       "hz": "B : 我很喜歡這件衣服，可是我覺得有點兒小。",
       "vi": "B: Tôi rất thích bộ này, nhưng tôi thấy hơi nhỏ.",
       "py": "B: Wǒ hěn xǐhuān zhèjiàn yīfú, kěshì wǒ juéde yǒudiǎn'ér xiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 對不起，我不喝咖啡。",
       "vi": "A: Xin lỗi, tôi không uống cà phê.",
       "py": "A: Duìbùqǐ, wǒ bù hēkāfēi."
      },
      {
       "hz": "B : 沒關係，你可以點一杯熱茶。",
       "vi": "B: Không sao, bạn có thể gọi một cốc trà nóng.",
       "py": "B: Méiguānxì, nǐ kěyǐ diǎn yìbēi rèchá."
      },
      {
       "hz": "A : 我不知道要送媽媽什麼禮物。",
       "vi": "A: Tôi không biết nên tặng mẹ quà gì.",
       "py": "A: Wǒ bù zhīdào yào sòng māma shénme lǐwù."
      },
      {
       "hz": "B : 你可以送她一件紅色的新衣服。",
       "vi": "B: Bạn có thể tặng mẹ một bộ quần áo mới màu đỏ.",
       "py": "B: Nǐ kěyǐ sòng tā yíjiàn hóngsè de xīn yīfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 你想要點什麼？",
       "vi": "A: Bạn muốn gọi gì?",
       "py": "A: Nǐ xiǎngyào diǎn shénme?"
      },
      {
       "hz": "B : 這裡的珍珠奶茶很好喝，我們可以點（珍珠奶茶）。",
       "vi": "B: Trà sữa trân châu ở đây rất ngon, chúng ta có thể gọi (trà sữa trân châu).",
       "py": "B: Zhèlǐ de zhēnzhūnǎichá hěn hǎohē, wǒmen kěyǐ diǎn (zhēnzhūnǎichá)."
      },
      {
       "hz": "A : 我現在不餓，不想吃飯。",
       "vi": "A: Bây giờ tôi không đói, không muốn ăn cơm.",
       "py": "A: Wǒ xiànzài bú è, bùxiǎng chīfàn."
      },
      {
       "hz": "A : 天氣好熱，我不要去外面。",
       "vi": "A: Trời nóng quá, tôi không muốn ra ngoài.",
       "py": "A: Tiānqì hǎo rè, wǒ búyào qù wàimiàn."
      },
      {
       "hz": "A : 聽說那部電影很不錯。",
       "vi": "A: Nghe nói bộ phim đó rất hay.",
       "py": "A: Tīngshuō nà bù diànyǐng hěn búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux 可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:媽媽，我可以吃冰淇淋嗎？",
       "vi": "A: Mẹ ơi, con ăn kem được không?",
       "py": "A: Māma, wǒ kěyǐ chī bīngqílín ma?"
      },
      {
       "hz": "B:太冷了，不可以。",
       "vi": "B: Lạnh quá, không được.",
       "py": "B: Tàilěng le, bù kěyǐ."
      },
      {
       "hz": "A:老師，我現在可以去洗手間嗎？",
       "vi": "A: Thưa cô, bây giờ em đi vệ sinh được không ạ?",
       "py": "A: Lǎoshī, wǒ xiànzài kěyǐ qù xǐshǒujiān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:我們可不可以在捷運上吃東西？",
       "vi": "A: Chúng ta có được ăn uống trên tàu điện ngầm không?",
       "py": "A: Wǒmen kěbùkěyǐ zài jiéyùn shàng chī dōngxī?"
      },
      {
       "hz": "B:不可以，也不可以喝飲料。",
       "vi": "B: Không được, uống đồ uống cũng không được.",
       "py": "B: Bù kěyǐ, yě bù kěyǐ hē yǐnliào."
      },
      {
       "hz": "他們都喜歡做什麼？",
       "vi": "Họ đều thích làm gì?",
       "py": "Tāmen dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "週末他們常一起做什麼？",
       "vi": "Cuối tuần họ thường cùng nhau làm gì?",
       "py": "Zhōumò tāmen cháng yìqǐ zuò shénme?"
      },
      {
       "hz": "宜文游泳游得怎麼樣？",
       "vi": "Nghi Văn bơi thế nào?",
       "py": "Yíwén yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "國安的籃球打得怎麼樣？",
       "vi": "Quốc An chơi bóng rổ thế nào?",
       "py": "Guó'ān de lánqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "他們喜歡看什麼比賽？",
       "vi": "Họ thích xem trận đấu gì?",
       "py": "Tāmen xǐhuān kàn shénme bǐsài?"
      },
      {
       "hz": "我平常喜歡喝茶，有(的)時候喝一點兒咖啡。",
       "vi": "Bình thường tôi thích uống trà, thỉnh thoảng uống một chút cà phê.",
       "py": "Wǒ píngcháng xǐhuān hēchá, yǒu (de) shíhòu hē yìdiǎn'ér kāfēi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  }
 ],
 "td1-6.3": [
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "A:你跑得快不快？",
       "vi": "A: Bạn chạy có nhanh không?",
       "py": "A: Nǐ pǎodekuài búkuài?"
      },
      {
       "hz": "B:我跑得很慢。",
       "vi": "B: Tôi chạy rất chậm.",
       "py": "B: Wǒ pǎo de hěn màn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "我每天都睡得很好。",
       "vi": "Ngày nào tôi cũng ngủ rất ngon.",
       "py": "Wǒ měitiān dōu shuì de hěn hǎo."
      },
      {
       "hz": "我哥哥走得好快，我妹妹走得好慢。",
       "vi": "Anh trai tôi đi rất nhanh, em gái tôi đi rất chậm.",
       "py": "Wǒ gēge zǒu de hǎo kuài, wǒ mèimei zǒu de hǎo màn."
      },
      {
       "hz": "A : 他喝得多不多？",
       "vi": "A: Anh ấy uống có nhiều không?",
       "py": "A: Tā hē de duōbùduō?"
      },
      {
       "hz": "A : 他吃得很多嗎？",
       "vi": "A: Anh ấy ăn nhiều lắm à?",
       "py": "A: Tā chī de hěnduō ma?"
      },
      {
       "hz": "A : 你昨天晚上睡得怎麼樣？",
       "vi": "A: Tối qua bạn ngủ thế nào?",
       "py": "A: Nǐ zuótiānwǎnshàng shuì de zěnmeyàng?"
      },
      {
       "hz": "A : 你游泳游得怎麼樣？",
       "vi": "A: Bạn bơi thế nào?",
       "py": "A: Nǐ yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "B : 我游泳游得不太好。",
       "vi": "B: Tôi bơi không giỏi lắm.",
       "py": "B: Wǒ yóuyǒng yóu de bútàihǎo."
      },
      {
       "hz": "A : 你騎腳踏車騎得快不快？",
       "vi": "A: Bạn đạp xe có nhanh không?",
       "py": "A: Nǐ qí jiǎotàchē qí de kuài búkuài?"
      },
      {
       "hz": "B : 我騎腳踏車騎得很慢。",
       "vi": "B: Tôi đạp xe rất chậm.",
       "py": "B: Wǒ qí jiǎotàchē qí de hěn màn."
      },
      {
       "hz": "A : 你朋友打網球打得怎麼樣？",
       "vi": "A: Bạn của bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ péngyǒu dǎwǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "A : 昨天他睡覺睡得好嗎？",
       "vi": "A: Hôm qua anh ấy ngủ có ngon không?",
       "py": "A: Zuótiān tā shuìjiào shuì de hǎo ma?"
      },
      {
       "hz": "A : 你踢足球踢得好不好？",
       "vi": "A: Bạn đá bóng có giỏi không?",
       "py": "A: Nǐ tīzúqiú tī de hǎobùhǎo?"
      },
      {
       "hz": "A : 他網球打得怎麼樣？",
       "vi": "A: Anh ấy chơi quần vợt thế nào?",
       "py": "A: Tā wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 他網球打得不錯。",
       "vi": "B: Anh ấy chơi quần vợt khá giỏi.",
       "py": "B: Tā wǎngqiú dǎ de búcuò."
      },
      {
       "hz": "A : 你們飯吃得多不多？",
       "vi": "A: Các bạn ăn cơm có nhiều không?",
       "py": "A: Nǐmen fàn chī de duōbùduō?"
      },
      {
       "hz": "B : 我飯吃得不多，他吃得很多。",
       "vi": "B: Tôi ăn không nhiều, anh ấy ăn rất nhiều.",
       "py": "B: Wǒ fàn chī de bù duō, tā chī de hěnduō."
      },
      {
       "hz": "A : 你媽媽牛肉麵做得好不好？",
       "vi": "A: Mẹ bạn nấu mì bò có ngon không?",
       "py": "A: Nǐ māma niúròumiàn zuò de hǎobùhǎo?"
      },
      {
       "hz": "A : 你網球打得怎麼樣？",
       "vi": "A: Bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 我哥哥棒球打得很好。",
       "vi": "B: Anh trai tôi chơi bóng chày rất giỏi.",
       "py": "B: Wǒ gēge bàngqiú dǎ de hěn hǎo."
      },
      {
       "hz": "A : 你弟弟的足球踢得好嗎？",
       "vi": "A: Em trai bạn đá bóng có giỏi không?",
       "py": "A: Nǐ dìdi de zúqiú tī de hǎo ma?"
      },
      {
       "hz": "B : 我弟弟的足球踢得很好。",
       "vi": "B: Em trai tôi đá bóng rất giỏi.",
       "py": "B: Wǒ dìdi de zúqiú tī de hěn hǎo."
      },
      {
       "hz": "A : 她的腳踏車騎得快嗎？",
       "vi": "A: Cô ấy đạp xe có nhanh không?",
       "py": "A: Tā de jiǎotàchē qí de kuài ma?"
      },
      {
       "hz": "B : 她的腳踏車騎得不快。",
       "vi": "B: Cô ấy đạp xe không nhanh.",
       "py": "B: Tā de jiǎotàchē qí de búkuài."
      },
      {
       "hz": "A : 你的飯做得怎麼樣？",
       "vi": "A: Bạn nấu cơm thế nào?",
       "py": "A: Nǐ de fàn zuò de zěnmeyàng?"
      },
      {
       "hz": "A : 你哥哥的籃球打得好不好？",
       "vi": "A: Anh trai bạn chơi bóng rổ có giỏi không?",
       "py": "A: Nǐ gēge de lánqiú dǎ de hǎobùhǎo?"
      },
      {
       "hz": "B : 她的英文說得很好。",
       "vi": "B: Cô ấy nói tiếng Anh rất giỏi.",
       "py": "B: Tā de yīngwén shuō de hěn hǎo."
      },
      {
       "hz": "國安晚上想去做什麼？",
       "vi": "Tối nay Quốc An muốn đi làm gì?",
       "py": "Guó'ān wǎnshàng xiǎng qù zuò shénme?"
      },
      {
       "hz": "中明常常做什麼？",
       "vi": "Trung Minh thường làm gì?",
       "py": "Zhōngmíng chángcháng zuò shénme?"
      },
      {
       "hz": "中明明天想做什麼？",
       "vi": "Ngày mai Trung Minh muốn làm gì?",
       "py": "Zhōngmíng míngtiān xiǎng zuò shénme?"
      },
      {
       "hz": "後天天氣熱嗎？",
       "vi": "Ngày kia trời có nóng không?",
       "py": "Hòutiān tiānqì rè ma?"
      },
      {
       "hz": "那家店的冰淇淋很好吃，可是有點兒貴。",
       "vi": "Kem của tiệm đó rất ngon, nhưng hơi đắt.",
       "py": "Nà jiā diàn de bīngqílín hěn hǎochī, kěshì yǒudiǎn'ér guì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "I. 有(一)點(兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": "有(一)點(兒）is used as an adverb to express slightly / a little, modifying the Vs that follows it.",
     "examples": [
      {
       "hz": "A : 我們在這家咖啡廳喝咖啡吧。",
       "vi": "A: Chúng ta uống cà phê ở quán này nhé.",
       "py": "A: Wǒmen zài zhèjiā kāfēitīng hēkāfēi ba."
      },
      {
       "hz": "B :一杯咖啡一百八十塊錢，我覺得有點兒貴。",
       "vi": "B: Một cốc cà phê một trăm tám mươi đồng, tôi thấy hơi đắt.",
       "py": "B: Yībēi kāfēi yìbǎibāshí kuàiqián, wǒ juéde yǒudiǎn'ér guì."
      },
      {
       "hz": "我們去那家吧。",
       "vi": "Chúng ta đi quán kia đi.",
       "py": "Wǒmen qù nà jiā ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "I. 有(一)點 (兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 我們今天晚上去看電影，好不好？",
       "vi": "A: Tối nay chúng ta đi xem phim, được không?",
       "py": "A: Wǒmen jīntiān wǎnshàng qù kàn diànyǐng, hǎobùhǎo?"
      },
      {
       "hz": "B : 今天我有點兒忙，我不想去。",
       "vi": "B: Hôm nay tôi hơi bận, tôi không muốn đi.",
       "py": "B: Jīntiān wǒ yǒudiǎn'ér máng, wǒ bùxiǎng qù."
      },
      {
       "hz": "A : 這件衣服很漂亮，也很便宜，你不買嗎？",
       "vi": "A: Bộ quần áo này rất đẹp, lại rẻ, bạn không mua à?",
       "py": "A: Zhèjiàn yīfú hěnpiàoliàng, yě hěn piányi, nǐ bù mǎi ma?"
      },
      {
       "hz": "B : 我很喜歡這件衣服，可是我覺得有點兒小。",
       "vi": "B: Tôi rất thích bộ này, nhưng tôi thấy hơi nhỏ.",
       "py": "B: Wǒ hěn xǐhuān zhèjiàn yīfú, kěshì wǒ juéde yǒudiǎn'ér xiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 對不起，我不喝咖啡。",
       "vi": "A: Xin lỗi, tôi không uống cà phê.",
       "py": "A: Duìbùqǐ, wǒ bù hēkāfēi."
      },
      {
       "hz": "B : 沒關係，你可以點一杯熱茶。",
       "vi": "B: Không sao, bạn có thể gọi một cốc trà nóng.",
       "py": "B: Méiguānxì, nǐ kěyǐ diǎn yìbēi rèchá."
      },
      {
       "hz": "A : 我不知道要送媽媽什麼禮物。",
       "vi": "A: Tôi không biết nên tặng mẹ quà gì.",
       "py": "A: Wǒ bù zhīdào yào sòng māma shénme lǐwù."
      },
      {
       "hz": "B : 你可以送她一件紅色的新衣服。",
       "vi": "B: Bạn có thể tặng mẹ một bộ quần áo mới màu đỏ.",
       "py": "B: Nǐ kěyǐ sòng tā yíjiàn hóngsè de xīn yīfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 你想要點什麼？",
       "vi": "A: Bạn muốn gọi gì?",
       "py": "A: Nǐ xiǎngyào diǎn shénme?"
      },
      {
       "hz": "B : 這裡的珍珠奶茶很好喝，我們可以點（珍珠奶茶）。",
       "vi": "B: Trà sữa trân châu ở đây rất ngon, chúng ta có thể gọi (trà sữa trân châu).",
       "py": "B: Zhèlǐ de zhēnzhūnǎichá hěn hǎohē, wǒmen kěyǐ diǎn (zhēnzhūnǎichá)."
      },
      {
       "hz": "A : 我現在不餓，不想吃飯。",
       "vi": "A: Bây giờ tôi không đói, không muốn ăn cơm.",
       "py": "A: Wǒ xiànzài bú è, bùxiǎng chīfàn."
      },
      {
       "hz": "A : 天氣好熱，我不要去外面。",
       "vi": "A: Trời nóng quá, tôi không muốn ra ngoài.",
       "py": "A: Tiānqì hǎo rè, wǒ búyào qù wàimiàn."
      },
      {
       "hz": "A : 聽說那部電影很不錯。",
       "vi": "A: Nghe nói bộ phim đó rất hay.",
       "py": "A: Tīngshuō nà bù diànyǐng hěn búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux 可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:媽媽，我可以吃冰淇淋嗎？",
       "vi": "A: Mẹ ơi, con ăn kem được không?",
       "py": "A: Māma, wǒ kěyǐ chī bīngqílín ma?"
      },
      {
       "hz": "B:太冷了，不可以。",
       "vi": "B: Lạnh quá, không được.",
       "py": "B: Tàilěng le, bù kěyǐ."
      },
      {
       "hz": "A:老師，我現在可以去洗手間嗎？",
       "vi": "A: Thưa cô, bây giờ em đi vệ sinh được không ạ?",
       "py": "A: Lǎoshī, wǒ xiànzài kěyǐ qù xǐshǒujiān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:我們可不可以在捷運上吃東西？",
       "vi": "A: Chúng ta có được ăn uống trên tàu điện ngầm không?",
       "py": "A: Wǒmen kěbùkěyǐ zài jiéyùn shàng chī dōngxī?"
      },
      {
       "hz": "B:不可以，也不可以喝飲料。",
       "vi": "B: Không được, uống đồ uống cũng không được.",
       "py": "B: Bù kěyǐ, yě bù kěyǐ hē yǐnliào."
      },
      {
       "hz": "他們都喜歡做什麼？",
       "vi": "Họ đều thích làm gì?",
       "py": "Tāmen dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "週末他們常一起做什麼？",
       "vi": "Cuối tuần họ thường cùng nhau làm gì?",
       "py": "Zhōumò tāmen cháng yìqǐ zuò shénme?"
      },
      {
       "hz": "宜文游泳游得怎麼樣？",
       "vi": "Nghi Văn bơi thế nào?",
       "py": "Yíwén yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "國安的籃球打得怎麼樣？",
       "vi": "Quốc An chơi bóng rổ thế nào?",
       "py": "Guó'ān de lánqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "他們喜歡看什麼比賽？",
       "vi": "Họ thích xem trận đấu gì?",
       "py": "Tāmen xǐhuān kàn shénme bǐsài?"
      },
      {
       "hz": "我平常喜歡喝茶，有(的)時候喝一點兒咖啡。",
       "vi": "Bình thường tôi thích uống trà, thỉnh thoảng uống một chút cà phê.",
       "py": "Wǒ píngcháng xǐhuān hēchá, yǒu (de) shíhòu hē yìdiǎn'ér kāfēi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  }
 ],
 "td1-6.4": [
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "A:你跑得快不快？",
       "vi": "A: Bạn chạy có nhanh không?",
       "py": "A: Nǐ pǎodekuài búkuài?"
      },
      {
       "hz": "B:我跑得很慢。",
       "vi": "B: Tôi chạy rất chậm.",
       "py": "B: Wǒ pǎo de hěn màn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "II. Complement Maker 得",
   "points": [
    {
     "label": null,
     "formula": "Complement Maker 得 follows a verb and introduces the complement, which expresses the result or state of the action.",
     "examples": [
      {
       "hz": "我每天都睡得很好。",
       "vi": "Ngày nào tôi cũng ngủ rất ngon.",
       "py": "Wǒ měitiān dōu shuì de hěn hǎo."
      },
      {
       "hz": "我哥哥走得好快，我妹妹走得好慢。",
       "vi": "Anh trai tôi đi rất nhanh, em gái tôi đi rất chậm.",
       "py": "Wǒ gēge zǒu de hǎo kuài, wǒ mèimei zǒu de hǎo màn."
      },
      {
       "hz": "A : 他喝得多不多？",
       "vi": "A: Anh ấy uống có nhiều không?",
       "py": "A: Tā hē de duōbùduō?"
      },
      {
       "hz": "A : 他吃得很多嗎？",
       "vi": "A: Anh ấy ăn nhiều lắm à?",
       "py": "A: Tā chī de hěnduō ma?"
      },
      {
       "hz": "A : 你昨天晚上睡得怎麼樣？",
       "vi": "A: Tối qua bạn ngủ thế nào?",
       "py": "A: Nǐ zuótiānwǎnshàng shuì de zěnmeyàng?"
      },
      {
       "hz": "A : 你游泳游得怎麼樣？",
       "vi": "A: Bạn bơi thế nào?",
       "py": "A: Nǐ yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "B : 我游泳游得不太好。",
       "vi": "B: Tôi bơi không giỏi lắm.",
       "py": "B: Wǒ yóuyǒng yóu de bútàihǎo."
      },
      {
       "hz": "A : 你騎腳踏車騎得快不快？",
       "vi": "A: Bạn đạp xe có nhanh không?",
       "py": "A: Nǐ qí jiǎotàchē qí de kuài búkuài?"
      },
      {
       "hz": "B : 我騎腳踏車騎得很慢。",
       "vi": "B: Tôi đạp xe rất chậm.",
       "py": "B: Wǒ qí jiǎotàchē qí de hěn màn."
      },
      {
       "hz": "A : 你朋友打網球打得怎麼樣？",
       "vi": "A: Bạn của bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ péngyǒu dǎwǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "A : 昨天他睡覺睡得好嗎？",
       "vi": "A: Hôm qua anh ấy ngủ có ngon không?",
       "py": "A: Zuótiān tā shuìjiào shuì de hǎo ma?"
      },
      {
       "hz": "A : 你踢足球踢得好不好？",
       "vi": "A: Bạn đá bóng có giỏi không?",
       "py": "A: Nǐ tīzúqiú tī de hǎobùhǎo?"
      },
      {
       "hz": "A : 他網球打得怎麼樣？",
       "vi": "A: Anh ấy chơi quần vợt thế nào?",
       "py": "A: Tā wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 他網球打得不錯。",
       "vi": "B: Anh ấy chơi quần vợt khá giỏi.",
       "py": "B: Tā wǎngqiú dǎ de búcuò."
      },
      {
       "hz": "A : 你們飯吃得多不多？",
       "vi": "A: Các bạn ăn cơm có nhiều không?",
       "py": "A: Nǐmen fàn chī de duōbùduō?"
      },
      {
       "hz": "B : 我飯吃得不多，他吃得很多。",
       "vi": "B: Tôi ăn không nhiều, anh ấy ăn rất nhiều.",
       "py": "B: Wǒ fàn chī de bù duō, tā chī de hěnduō."
      },
      {
       "hz": "A : 你媽媽牛肉麵做得好不好？",
       "vi": "A: Mẹ bạn nấu mì bò có ngon không?",
       "py": "A: Nǐ māma niúròumiàn zuò de hǎobùhǎo?"
      },
      {
       "hz": "A : 你網球打得怎麼樣？",
       "vi": "A: Bạn chơi quần vợt thế nào?",
       "py": "A: Nǐ wǎngqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "B : 我哥哥棒球打得很好。",
       "vi": "B: Anh trai tôi chơi bóng chày rất giỏi.",
       "py": "B: Wǒ gēge bàngqiú dǎ de hěn hǎo."
      },
      {
       "hz": "A : 你弟弟的足球踢得好嗎？",
       "vi": "A: Em trai bạn đá bóng có giỏi không?",
       "py": "A: Nǐ dìdi de zúqiú tī de hǎo ma?"
      },
      {
       "hz": "B : 我弟弟的足球踢得很好。",
       "vi": "B: Em trai tôi đá bóng rất giỏi.",
       "py": "B: Wǒ dìdi de zúqiú tī de hěn hǎo."
      },
      {
       "hz": "A : 她的腳踏車騎得快嗎？",
       "vi": "A: Cô ấy đạp xe có nhanh không?",
       "py": "A: Tā de jiǎotàchē qí de kuài ma?"
      },
      {
       "hz": "B : 她的腳踏車騎得不快。",
       "vi": "B: Cô ấy đạp xe không nhanh.",
       "py": "B: Tā de jiǎotàchē qí de búkuài."
      },
      {
       "hz": "A : 你的飯做得怎麼樣？",
       "vi": "A: Bạn nấu cơm thế nào?",
       "py": "A: Nǐ de fàn zuò de zěnmeyàng?"
      },
      {
       "hz": "A : 你哥哥的籃球打得好不好？",
       "vi": "A: Anh trai bạn chơi bóng rổ có giỏi không?",
       "py": "A: Nǐ gēge de lánqiú dǎ de hǎobùhǎo?"
      },
      {
       "hz": "B : 她的英文說得很好。",
       "vi": "B: Cô ấy nói tiếng Anh rất giỏi.",
       "py": "B: Tā de yīngwén shuō de hěn hǎo."
      },
      {
       "hz": "國安晚上想去做什麼？",
       "vi": "Tối nay Quốc An muốn đi làm gì?",
       "py": "Guó'ān wǎnshàng xiǎng qù zuò shénme?"
      },
      {
       "hz": "中明常常做什麼？",
       "vi": "Trung Minh thường làm gì?",
       "py": "Zhōngmíng chángcháng zuò shénme?"
      },
      {
       "hz": "中明明天想做什麼？",
       "vi": "Ngày mai Trung Minh muốn làm gì?",
       "py": "Zhōngmíng míngtiān xiǎng zuò shénme?"
      },
      {
       "hz": "後天天氣熱嗎？",
       "vi": "Ngày kia trời có nóng không?",
       "py": "Hòutiān tiānqì rè ma?"
      },
      {
       "hz": "那家店的冰淇淋很好吃，可是有點兒貴。",
       "vi": "Kem của tiệm đó rất ngon, nhưng hơi đắt.",
       "py": "Nà jiā diàn de bīngqílín hěn hǎochī, kěshì yǒudiǎn'ér guì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ bổ ngữ 得",
   "giaiThich": "得 đứng sau động từ để dẫn vào bổ ngữ, diễn tả kết quả hoặc trạng thái của hành động (ví dụ 說得很好)."
  },
  {
   "title": "I. 有(一)點(兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": "有(一)點(兒）is used as an adverb to express slightly / a little, modifying the Vs that follows it.",
     "examples": [
      {
       "hz": "A : 我們在這家咖啡廳喝咖啡吧。",
       "vi": "A: Chúng ta uống cà phê ở quán này nhé.",
       "py": "A: Wǒmen zài zhèjiā kāfēitīng hēkāfēi ba."
      },
      {
       "hz": "B :一杯咖啡一百八十塊錢，我覺得有點兒貴。",
       "vi": "B: Một cốc cà phê một trăm tám mươi đồng, tôi thấy hơi đắt.",
       "py": "B: Yībēi kāfēi yìbǎibāshí kuàiqián, wǒ juéde yǒudiǎn'ér guì."
      },
      {
       "hz": "我們去那家吧。",
       "vi": "Chúng ta đi quán kia đi.",
       "py": "Wǒmen qù nà jiā ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "I. 有(一)點 (兒) as an Adverb",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 我們今天晚上去看電影，好不好？",
       "vi": "A: Tối nay chúng ta đi xem phim, được không?",
       "py": "A: Wǒmen jīntiān wǎnshàng qù kàn diànyǐng, hǎobùhǎo?"
      },
      {
       "hz": "B : 今天我有點兒忙，我不想去。",
       "vi": "B: Hôm nay tôi hơi bận, tôi không muốn đi.",
       "py": "B: Jīntiān wǒ yǒudiǎn'ér máng, wǒ bùxiǎng qù."
      },
      {
       "hz": "A : 這件衣服很漂亮，也很便宜，你不買嗎？",
       "vi": "A: Bộ quần áo này rất đẹp, lại rẻ, bạn không mua à?",
       "py": "A: Zhèjiàn yīfú hěnpiàoliàng, yě hěn piányi, nǐ bù mǎi ma?"
      },
      {
       "hz": "B : 我很喜歡這件衣服，可是我覺得有點兒小。",
       "vi": "B: Tôi rất thích bộ này, nhưng tôi thấy hơi nhỏ.",
       "py": "B: Wǒ hěn xǐhuān zhèjiàn yīfú, kěshì wǒ juéde yǒudiǎn'ér xiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有(一)點(兒) làm phó từ",
   "giaiThich": "有(一)點(兒) đứng trước tính từ, nghĩa \"hơi, một chút\", thường mang sắc thái không hài lòng."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 對不起，我不喝咖啡。",
       "vi": "A: Xin lỗi, tôi không uống cà phê.",
       "py": "A: Duìbùqǐ, wǒ bù hēkāfēi."
      },
      {
       "hz": "B : 沒關係，你可以點一杯熱茶。",
       "vi": "B: Không sao, bạn có thể gọi một cốc trà nóng.",
       "py": "B: Méiguānxì, nǐ kěyǐ diǎn yìbēi rèchá."
      },
      {
       "hz": "A : 我不知道要送媽媽什麼禮物。",
       "vi": "A: Tôi không biết nên tặng mẹ quà gì.",
       "py": "A: Wǒ bù zhīdào yào sòng māma shénme lǐwù."
      },
      {
       "hz": "B : 你可以送她一件紅色的新衣服。",
       "vi": "B: Bạn có thể tặng mẹ một bộ quần áo mới màu đỏ.",
       "py": "B: Nǐ kěyǐ sòng tā yíjiàn hóngsè de xīn yīfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A : 你想要點什麼？",
       "vi": "A: Bạn muốn gọi gì?",
       "py": "A: Nǐ xiǎngyào diǎn shénme?"
      },
      {
       "hz": "B : 這裡的珍珠奶茶很好喝，我們可以點（珍珠奶茶）。",
       "vi": "B: Trà sữa trân châu ở đây rất ngon, chúng ta có thể gọi (trà sữa trân châu).",
       "py": "B: Zhèlǐ de zhēnzhūnǎichá hěn hǎohē, wǒmen kěyǐ diǎn (zhēnzhūnǎichá)."
      },
      {
       "hz": "A : 我現在不餓，不想吃飯。",
       "vi": "A: Bây giờ tôi không đói, không muốn ăn cơm.",
       "py": "A: Wǒ xiànzài bú è, bùxiǎng chīfàn."
      },
      {
       "hz": "A : 天氣好熱，我不要去外面。",
       "vi": "A: Trời nóng quá, tôi không muốn ra ngoài.",
       "py": "A: Tiānqì hǎo rè, wǒ búyào qù wàimiàn."
      },
      {
       "hz": "A : 聽說那部電影很不錯。",
       "vi": "A: Nghe nói bộ phim đó rất hay.",
       "py": "A: Tīngshuō nà bù diànyǐng hěn búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux 可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:媽媽，我可以吃冰淇淋嗎？",
       "vi": "A: Mẹ ơi, con ăn kem được không?",
       "py": "A: Māma, wǒ kěyǐ chī bīngqílín ma?"
      },
      {
       "hz": "B:太冷了，不可以。",
       "vi": "B: Lạnh quá, không được.",
       "py": "B: Tàilěng le, bù kěyǐ."
      },
      {
       "hz": "A:老師，我現在可以去洗手間嗎？",
       "vi": "A: Thưa cô, bây giờ em đi vệ sinh được không ạ?",
       "py": "A: Lǎoshī, wǒ xiànzài kěyǐ qù xǐshǒujiān ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  },
  {
   "title": "II. Vaux可以",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:我們可不可以在捷運上吃東西？",
       "vi": "A: Chúng ta có được ăn uống trên tàu điện ngầm không?",
       "py": "A: Wǒmen kěbùkěyǐ zài jiéyùn shàng chī dōngxī?"
      },
      {
       "hz": "B:不可以，也不可以喝飲料。",
       "vi": "B: Không được, uống đồ uống cũng không được.",
       "py": "B: Bù kěyǐ, yě bù kěyǐ hē yǐnliào."
      },
      {
       "hz": "他們都喜歡做什麼？",
       "vi": "Họ đều thích làm gì?",
       "py": "Tāmen dōu xǐhuān zuò shénme?"
      },
      {
       "hz": "週末他們常一起做什麼？",
       "vi": "Cuối tuần họ thường cùng nhau làm gì?",
       "py": "Zhōumò tāmen cháng yìqǐ zuò shénme?"
      },
      {
       "hz": "宜文游泳游得怎麼樣？",
       "vi": "Nghi Văn bơi thế nào?",
       "py": "Yíwén yóuyǒng yóu de zěnmeyàng?"
      },
      {
       "hz": "國安的籃球打得怎麼樣？",
       "vi": "Quốc An chơi bóng rổ thế nào?",
       "py": "Guó'ān de lánqiú dǎ de zěnmeyàng?"
      },
      {
       "hz": "他們喜歡看什麼比賽？",
       "vi": "Họ thích xem trận đấu gì?",
       "py": "Tāmen xǐhuān kàn shénme bǐsài?"
      },
      {
       "hz": "我平常喜歡喝茶，有(的)時候喝一點兒咖啡。",
       "vi": "Bình thường tôi thích uống trà, thỉnh thoảng uống một chút cà phê.",
       "py": "Wǒ píngcháng xǐhuān hēchá, yǒu (de) shíhòu hē yìdiǎn'ér kāfēi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 可以",
   "giaiThich": "可以 đứng trước động từ, diễn đạt \"có thể, được phép\"."
  }
 ],
 "td1-7.1": [
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": "This sentence pattern is used to convey someone departing from somewhere or going to somewhere.",
     "examples": [
      {
       "hz": "A:你從哪裡來？",
       "vi": "A: Bạn từ đâu đến?",
       "py": "A: Nǐ cóng nǎlǐ lái?"
      },
      {
       "hz": "B:我從飯店來。",
       "vi": "B: Tôi từ khách sạn đến.",
       "py": "B: Wǒ cóng fàndiàn lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你到哪裡去？",
       "vi": "A: Bạn đi đâu?",
       "py": "A: Nǐ dào nǎlǐ qù?"
      },
      {
       "hz": "B:我到咖啡廳去。",
       "vi": "B: Tôi đến quán cà phê.",
       "py": "B: Wǒ dào kāfēitīng qù."
      },
      {
       "hz": "A:他到圖書館去嗎？",
       "vi": "A: Anh ấy đi thư viện à?",
       "py": "A: Tā dào túshūguǎn qù ma?"
      },
      {
       "hz": "B:他不到圖書館去，他到朋友家去。",
       "vi": "B: Anh ấy không đi thư viện, anh ấy đến nhà bạn.",
       "py": "B: Tā búdào túshūguǎn qù, tā dào péngyǒujiā qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他從旅館到我家來吃飯。",
       "vi": "Anh ấy từ khách sạn đến nhà tôi ăn cơm.",
       "py": "Tā cóng lǚguǎn dào wǒjiā lái chīfàn."
      },
      {
       "hz": "他從學校到飲料店去買珍珠奶茶。",
       "vi": "Anh ấy từ trường đến tiệm đồ uống mua trà sữa trân châu.",
       "py": "Tā cóng xuéxiào dào yǐnliàodiàn qù mǎi zhēnzhūnǎichá."
      },
      {
       "hz": "他今天從韓國到台灣來看朋友。",
       "vi": "Hôm nay anh ấy từ Hàn Quốc đến Đài Loan thăm bạn.",
       "py": "Tā jīntiān cóng Hánguó dào Táiwān láikàn péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "This pattern expresses how to get around with transportation or on foot.",
     "examples": [
      {
       "hz": "A:你們怎麼來？",
       "vi": "A: Các bạn đến bằng gì?",
       "py": "A: Nǐmen zěnme lái?"
      },
      {
       "hz": "B:我們騎腳踏車來。",
       "vi": "B: Chúng tôi đạp xe đến.",
       "py": "B: Wǒmen qí jiǎotàchē lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "Rearrange the following sentences.",
     "examples": [
      {
       "hz": "A:你要走路去嗎？",
       "vi": "A: Bạn định đi bộ đến đó à?",
       "py": "A: Nǐ yào zǒulù qù ma?"
      },
      {
       "hz": "B:我不要走路去，我要坐捷運去。",
       "vi": "B: Tôi không đi bộ, tôi sẽ đi tàu điện ngầm.",
       "py": "B: Wǒ búyào zǒulù qù, wǒ yào zuò jiéyùn qù."
      },
      {
       "hz": "A:他坐公車到學校去嗎？",
       "vi": "A: Anh ấy đi xe buýt đến trường à?",
       "py": "A: Tā zuògōngchē dào xuéxiào qù ma?"
      },
      {
       "hz": "B:不，他坐計程車到學校去。",
       "vi": "B: Không, anh ấy đi taxi đến trường.",
       "py": "B: Bù, tā zuò jìchéngchē dào xuéxiào qù."
      },
      {
       "hz": "怎麼/到/你/他家/去/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zěnme / dào / nǐ / tājiā / qù /?"
      },
      {
       "hz": "到/坐公車/每天/來/學校/他/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dào / zuògōngchē / měitiān / lái / xuéxiào / tā /."
      },
      {
       "hz": "不要/那家/走路/去/到/飯店/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Búyào / nà jiā / zǒulù / qù / dào / fàndiàn / wǒ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "When there is a new situation, 了 can be placed at the end of the sentence to express the change.",
     "examples": [
      {
       "hz": "我餓了，想吃一點東西。",
       "vi": "Tôi đói rồi, muốn ăn chút gì đó.",
       "py": "Wǒ è le, xiǎng chī yìdiǎn dōngxī."
      },
      {
       "hz": "孩子都累了，我們一起休息吧！",
       "vi": "Bọn trẻ đều mệt rồi, chúng ta cùng nghỉ ngơi thôi!",
       "py": "Háizi dōu lèi le, wǒmen yìqǐ xiūxí ba!"
      },
      {
       "hz": "啊！現在十點了！我的錶慢了。",
       "vi": "Ôi! Bây giờ đã mười giờ rồi! Đồng hồ của tôi chạy chậm.",
       "py": "A! Xiànzài shídiǎn le! Wǒ de biǎo màn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了 Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你十五歲了，應該學做飯了。",
       "vi": "Con mười lăm tuổi rồi, nên học nấu ăn đi.",
       "py": "Nǐ shíwǔsuì le, yīnggāi xué zuòfàn le."
      },
      {
       "hz": "上課了，老師來了，我們不可以玩手機了。",
       "vi": "Vào học rồi, thầy giáo đến rồi, chúng ta không được chơi điện thoại nữa.",
       "py": "Shàngkè le, lǎoshī lái le, wǒmen bù kěyǐ wán shǒujī le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "A:請你明天早上九點來。",
       "vi": "A: Mời anh chín giờ sáng mai đến.",
       "py": "A: Qǐng nǐ míngtiān zǎoshàng jiǔdiǎn lái."
      },
      {
       "hz": "B:好，我知道了，謝謝。",
       "vi": "B: Vâng, tôi biết rồi, cảm ơn.",
       "py": "B: Hǎo, wǒ zhīdào le, xièxie."
      },
      {
       "hz": "老師:不可以說「吃飯得很快」，應該說",
       "vi": "Thầy giáo: Không được nói “吃飯得很快”, phải nói là",
       "py": "Lǎoshī: Bù kěyǐ shuō “chīfàn de hěnkuài”, yīnggāi shuō"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "I. Verb-Objects Serving as Topics",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "走路去太慢了!",
       "vi": "Đi bộ đến đó chậm quá!",
       "py": "Zǒulù qù tàimàn le!"
      },
      {
       "hz": "唱歌、跳舞都很有趣。",
       "vi": "Ca hát, nhảy múa đều rất thú vị.",
       "py": "Chànggē, tiàowǔ dōu hěn yǒuqù."
      },
      {
       "hz": "跑步、游泳、打網球，我都喜歡。",
       "vi": "Chạy bộ, bơi lội, chơi quần vợt, môn nào tôi cũng thích.",
       "py": "Pǎobù, yóuyǒng, dǎwǎngqiú, wǒ dōu xǐhuān."
      },
      {
       "hz": "我們都很喜歡。",
       "vi": "Chúng tôi đều rất thích.",
       "py": "Wǒmen dōu hěn xǐhuān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cụm động–tân làm chủ đề câu",
   "giaiThich": "Đưa cụm \"động từ + tân ngữ\" lên đầu câu để làm chủ đề, phần muốn nói về nó đứng sau."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎnr chá, chī yìdiǎnr fàn.",
     "examples": [
      {
       "hz": "我同學的妹妹又可愛又漂亮。",
       "vi": "Em gái của bạn học tôi vừa dễ thương vừa xinh đẹp.",
       "py": "Wǒ tóngxué de mèimei yòu kě'ài yòu piàoliàng."
      },
      {
       "hz": "我現在又餓又渴，想喝一點兒茶、吃一點兒飯。",
       "vi": "Bây giờ tôi vừa đói vừa khát, muốn uống chút trà, ăn chút cơm.",
       "py": "Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎn'ér chá, chī yìdiǎn'ér fàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó. This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Complete the following sentences with 又……又…….",
     "examples": [
      {
       "hz": "他又想去日本，又想去韓國，不知道應該先去哪國。",
       "vi": "Anh ấy vừa muốn đi Nhật, vừa muốn đi Hàn Quốc, không biết nên đi nước nào trước.",
       "py": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó."
      },
      {
       "hz": "A:你喜歡夏天嗎？",
       "vi": "A: Bạn có thích mùa hè không?",
       "py": "A: Nǐ xǐhuān xiàtiān ma?"
      },
      {
       "hz": "A:你覺得這家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Bạn thấy mì bò của nhà hàng này thế nào?",
       "py": "A: Nǐ juéde zhèjiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "A:他常常去海邊嗎？",
       "vi": "A: Anh ấy có hay đi biển không?",
       "py": "A: Tā chángcháng qù hǎibiān ma?"
      },
      {
       "hz": "他平常坐哪一條捷運線去上課？",
       "vi": "Bình thường anh ấy đi tuyến tàu điện ngầm nào đến lớp?",
       "py": "Tā píngcháng zuò nǎyìtiáo jiéyùn xiàn qù shàngkè?"
      },
      {
       "hz": "他也坐捷運去哪裡？",
       "vi": "Anh ấy còn đi tàu điện ngầm đến đâu nữa?",
       "py": "Tā yě zuò jiéyùn qù nǎlǐ?"
      },
      {
       "hz": "朋友去他家方便嗎？",
       "vi": "Bạn bè đến nhà anh ấy có tiện không?",
       "py": "Péngyǒu qù tājiā fāngbiàn ma?"
      },
      {
       "hz": "他家附近有機場嗎？他可以怎麼去機場？",
       "vi": "Gần nhà anh ấy có sân bay không? Anh ấy có thể đến sân bay bằng cách nào?",
       "py": "Tājiā fùjìn yǒu jīchǎng ma? Tā kěyǐ zěnme qù jīchǎng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  }
 ],
 "td1-7.2": [
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": "This sentence pattern is used to convey someone departing from somewhere or going to somewhere.",
     "examples": [
      {
       "hz": "A:你從哪裡來？",
       "vi": "A: Bạn từ đâu đến?",
       "py": "A: Nǐ cóng nǎlǐ lái?"
      },
      {
       "hz": "B:我從飯店來。",
       "vi": "B: Tôi từ khách sạn đến.",
       "py": "B: Wǒ cóng fàndiàn lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你到哪裡去？",
       "vi": "A: Bạn đi đâu?",
       "py": "A: Nǐ dào nǎlǐ qù?"
      },
      {
       "hz": "B:我到咖啡廳去。",
       "vi": "B: Tôi đến quán cà phê.",
       "py": "B: Wǒ dào kāfēitīng qù."
      },
      {
       "hz": "A:他到圖書館去嗎？",
       "vi": "A: Anh ấy đi thư viện à?",
       "py": "A: Tā dào túshūguǎn qù ma?"
      },
      {
       "hz": "B:他不到圖書館去，他到朋友家去。",
       "vi": "B: Anh ấy không đi thư viện, anh ấy đến nhà bạn.",
       "py": "B: Tā búdào túshūguǎn qù, tā dào péngyǒujiā qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他從旅館到我家來吃飯。",
       "vi": "Anh ấy từ khách sạn đến nhà tôi ăn cơm.",
       "py": "Tā cóng lǚguǎn dào wǒjiā lái chīfàn."
      },
      {
       "hz": "他從學校到飲料店去買珍珠奶茶。",
       "vi": "Anh ấy từ trường đến tiệm đồ uống mua trà sữa trân châu.",
       "py": "Tā cóng xuéxiào dào yǐnliàodiàn qù mǎi zhēnzhūnǎichá."
      },
      {
       "hz": "他今天從韓國到台灣來看朋友。",
       "vi": "Hôm nay anh ấy từ Hàn Quốc đến Đài Loan thăm bạn.",
       "py": "Tā jīntiān cóng Hánguó dào Táiwān láikàn péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "This pattern expresses how to get around with transportation or on foot.",
     "examples": [
      {
       "hz": "A:你們怎麼來？",
       "vi": "A: Các bạn đến bằng gì?",
       "py": "A: Nǐmen zěnme lái?"
      },
      {
       "hz": "B:我們騎腳踏車來。",
       "vi": "B: Chúng tôi đạp xe đến.",
       "py": "B: Wǒmen qí jiǎotàchē lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "Rearrange the following sentences.",
     "examples": [
      {
       "hz": "A:你要走路去嗎？",
       "vi": "A: Bạn định đi bộ đến đó à?",
       "py": "A: Nǐ yào zǒulù qù ma?"
      },
      {
       "hz": "B:我不要走路去，我要坐捷運去。",
       "vi": "B: Tôi không đi bộ, tôi sẽ đi tàu điện ngầm.",
       "py": "B: Wǒ búyào zǒulù qù, wǒ yào zuò jiéyùn qù."
      },
      {
       "hz": "A:他坐公車到學校去嗎？",
       "vi": "A: Anh ấy đi xe buýt đến trường à?",
       "py": "A: Tā zuògōngchē dào xuéxiào qù ma?"
      },
      {
       "hz": "B:不，他坐計程車到學校去。",
       "vi": "B: Không, anh ấy đi taxi đến trường.",
       "py": "B: Bù, tā zuò jìchéngchē dào xuéxiào qù."
      },
      {
       "hz": "怎麼/到/你/他家/去/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zěnme / dào / nǐ / tājiā / qù /?"
      },
      {
       "hz": "到/坐公車/每天/來/學校/他/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dào / zuògōngchē / měitiān / lái / xuéxiào / tā /."
      },
      {
       "hz": "不要/那家/走路/去/到/飯店/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Búyào / nà jiā / zǒulù / qù / dào / fàndiàn / wǒ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "When there is a new situation, 了 can be placed at the end of the sentence to express the change.",
     "examples": [
      {
       "hz": "我餓了，想吃一點東西。",
       "vi": "Tôi đói rồi, muốn ăn chút gì đó.",
       "py": "Wǒ è le, xiǎng chī yìdiǎn dōngxī."
      },
      {
       "hz": "孩子都累了，我們一起休息吧！",
       "vi": "Bọn trẻ đều mệt rồi, chúng ta cùng nghỉ ngơi thôi!",
       "py": "Háizi dōu lèi le, wǒmen yìqǐ xiūxí ba!"
      },
      {
       "hz": "啊！現在十點了！我的錶慢了。",
       "vi": "Ôi! Bây giờ đã mười giờ rồi! Đồng hồ của tôi chạy chậm.",
       "py": "A! Xiànzài shídiǎn le! Wǒ de biǎo màn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了 Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你十五歲了，應該學做飯了。",
       "vi": "Con mười lăm tuổi rồi, nên học nấu ăn đi.",
       "py": "Nǐ shíwǔsuì le, yīnggāi xué zuòfàn le."
      },
      {
       "hz": "上課了，老師來了，我們不可以玩手機了。",
       "vi": "Vào học rồi, thầy giáo đến rồi, chúng ta không được chơi điện thoại nữa.",
       "py": "Shàngkè le, lǎoshī lái le, wǒmen bù kěyǐ wán shǒujī le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "A:請你明天早上九點來。",
       "vi": "A: Mời anh chín giờ sáng mai đến.",
       "py": "A: Qǐng nǐ míngtiān zǎoshàng jiǔdiǎn lái."
      },
      {
       "hz": "B:好，我知道了，謝謝。",
       "vi": "B: Vâng, tôi biết rồi, cảm ơn.",
       "py": "B: Hǎo, wǒ zhīdào le, xièxie."
      },
      {
       "hz": "老師:不可以說「吃飯得很快」，應該說",
       "vi": "Thầy giáo: Không được nói “吃飯得很快”, phải nói là",
       "py": "Lǎoshī: Bù kěyǐ shuō “chīfàn de hěnkuài”, yīnggāi shuō"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "I. Verb-Objects Serving as Topics",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "走路去太慢了!",
       "vi": "Đi bộ đến đó chậm quá!",
       "py": "Zǒulù qù tàimàn le!"
      },
      {
       "hz": "唱歌、跳舞都很有趣。",
       "vi": "Ca hát, nhảy múa đều rất thú vị.",
       "py": "Chànggē, tiàowǔ dōu hěn yǒuqù."
      },
      {
       "hz": "跑步、游泳、打網球，我都喜歡。",
       "vi": "Chạy bộ, bơi lội, chơi quần vợt, môn nào tôi cũng thích.",
       "py": "Pǎobù, yóuyǒng, dǎwǎngqiú, wǒ dōu xǐhuān."
      },
      {
       "hz": "我們都很喜歡。",
       "vi": "Chúng tôi đều rất thích.",
       "py": "Wǒmen dōu hěn xǐhuān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cụm động–tân làm chủ đề câu",
   "giaiThich": "Đưa cụm \"động từ + tân ngữ\" lên đầu câu để làm chủ đề, phần muốn nói về nó đứng sau."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎnr chá, chī yìdiǎnr fàn.",
     "examples": [
      {
       "hz": "我同學的妹妹又可愛又漂亮。",
       "vi": "Em gái của bạn học tôi vừa dễ thương vừa xinh đẹp.",
       "py": "Wǒ tóngxué de mèimei yòu kě'ài yòu piàoliàng."
      },
      {
       "hz": "我現在又餓又渴，想喝一點兒茶、吃一點兒飯。",
       "vi": "Bây giờ tôi vừa đói vừa khát, muốn uống chút trà, ăn chút cơm.",
       "py": "Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎn'ér chá, chī yìdiǎn'ér fàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó. This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Complete the following sentences with 又……又…….",
     "examples": [
      {
       "hz": "他又想去日本，又想去韓國，不知道應該先去哪國。",
       "vi": "Anh ấy vừa muốn đi Nhật, vừa muốn đi Hàn Quốc, không biết nên đi nước nào trước.",
       "py": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó."
      },
      {
       "hz": "A:你喜歡夏天嗎？",
       "vi": "A: Bạn có thích mùa hè không?",
       "py": "A: Nǐ xǐhuān xiàtiān ma?"
      },
      {
       "hz": "A:你覺得這家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Bạn thấy mì bò của nhà hàng này thế nào?",
       "py": "A: Nǐ juéde zhèjiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "A:他常常去海邊嗎？",
       "vi": "A: Anh ấy có hay đi biển không?",
       "py": "A: Tā chángcháng qù hǎibiān ma?"
      },
      {
       "hz": "他平常坐哪一條捷運線去上課？",
       "vi": "Bình thường anh ấy đi tuyến tàu điện ngầm nào đến lớp?",
       "py": "Tā píngcháng zuò nǎyìtiáo jiéyùn xiàn qù shàngkè?"
      },
      {
       "hz": "他也坐捷運去哪裡？",
       "vi": "Anh ấy còn đi tàu điện ngầm đến đâu nữa?",
       "py": "Tā yě zuò jiéyùn qù nǎlǐ?"
      },
      {
       "hz": "朋友去他家方便嗎？",
       "vi": "Bạn bè đến nhà anh ấy có tiện không?",
       "py": "Péngyǒu qù tājiā fāngbiàn ma?"
      },
      {
       "hz": "他家附近有機場嗎？他可以怎麼去機場？",
       "vi": "Gần nhà anh ấy có sân bay không? Anh ấy có thể đến sân bay bằng cách nào?",
       "py": "Tājiā fùjìn yǒu jīchǎng ma? Tā kěyǐ zěnme qù jīchǎng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  }
 ],
 "td1-7.3": [
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": "This sentence pattern is used to convey someone departing from somewhere or going to somewhere.",
     "examples": [
      {
       "hz": "A:你從哪裡來？",
       "vi": "A: Bạn từ đâu đến?",
       "py": "A: Nǐ cóng nǎlǐ lái?"
      },
      {
       "hz": "B:我從飯店來。",
       "vi": "B: Tôi từ khách sạn đến.",
       "py": "B: Wǒ cóng fàndiàn lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你到哪裡去？",
       "vi": "A: Bạn đi đâu?",
       "py": "A: Nǐ dào nǎlǐ qù?"
      },
      {
       "hz": "B:我到咖啡廳去。",
       "vi": "B: Tôi đến quán cà phê.",
       "py": "B: Wǒ dào kāfēitīng qù."
      },
      {
       "hz": "A:他到圖書館去嗎？",
       "vi": "A: Anh ấy đi thư viện à?",
       "py": "A: Tā dào túshūguǎn qù ma?"
      },
      {
       "hz": "B:他不到圖書館去，他到朋友家去。",
       "vi": "B: Anh ấy không đi thư viện, anh ấy đến nhà bạn.",
       "py": "B: Tā búdào túshūguǎn qù, tā dào péngyǒujiā qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他從旅館到我家來吃飯。",
       "vi": "Anh ấy từ khách sạn đến nhà tôi ăn cơm.",
       "py": "Tā cóng lǚguǎn dào wǒjiā lái chīfàn."
      },
      {
       "hz": "他從學校到飲料店去買珍珠奶茶。",
       "vi": "Anh ấy từ trường đến tiệm đồ uống mua trà sữa trân châu.",
       "py": "Tā cóng xuéxiào dào yǐnliàodiàn qù mǎi zhēnzhūnǎichá."
      },
      {
       "hz": "他今天從韓國到台灣來看朋友。",
       "vi": "Hôm nay anh ấy từ Hàn Quốc đến Đài Loan thăm bạn.",
       "py": "Tā jīntiān cóng Hánguó dào Táiwān láikàn péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "This pattern expresses how to get around with transportation or on foot.",
     "examples": [
      {
       "hz": "A:你們怎麼來？",
       "vi": "A: Các bạn đến bằng gì?",
       "py": "A: Nǐmen zěnme lái?"
      },
      {
       "hz": "B:我們騎腳踏車來。",
       "vi": "B: Chúng tôi đạp xe đến.",
       "py": "B: Wǒmen qí jiǎotàchē lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "Rearrange the following sentences.",
     "examples": [
      {
       "hz": "A:你要走路去嗎？",
       "vi": "A: Bạn định đi bộ đến đó à?",
       "py": "A: Nǐ yào zǒulù qù ma?"
      },
      {
       "hz": "B:我不要走路去，我要坐捷運去。",
       "vi": "B: Tôi không đi bộ, tôi sẽ đi tàu điện ngầm.",
       "py": "B: Wǒ búyào zǒulù qù, wǒ yào zuò jiéyùn qù."
      },
      {
       "hz": "A:他坐公車到學校去嗎？",
       "vi": "A: Anh ấy đi xe buýt đến trường à?",
       "py": "A: Tā zuògōngchē dào xuéxiào qù ma?"
      },
      {
       "hz": "B:不，他坐計程車到學校去。",
       "vi": "B: Không, anh ấy đi taxi đến trường.",
       "py": "B: Bù, tā zuò jìchéngchē dào xuéxiào qù."
      },
      {
       "hz": "怎麼/到/你/他家/去/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zěnme / dào / nǐ / tājiā / qù /?"
      },
      {
       "hz": "到/坐公車/每天/來/學校/他/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dào / zuògōngchē / měitiān / lái / xuéxiào / tā /."
      },
      {
       "hz": "不要/那家/走路/去/到/飯店/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Búyào / nà jiā / zǒulù / qù / dào / fàndiàn / wǒ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "When there is a new situation, 了 can be placed at the end of the sentence to express the change.",
     "examples": [
      {
       "hz": "我餓了，想吃一點東西。",
       "vi": "Tôi đói rồi, muốn ăn chút gì đó.",
       "py": "Wǒ è le, xiǎng chī yìdiǎn dōngxī."
      },
      {
       "hz": "孩子都累了，我們一起休息吧！",
       "vi": "Bọn trẻ đều mệt rồi, chúng ta cùng nghỉ ngơi thôi!",
       "py": "Háizi dōu lèi le, wǒmen yìqǐ xiūxí ba!"
      },
      {
       "hz": "啊！現在十點了！我的錶慢了。",
       "vi": "Ôi! Bây giờ đã mười giờ rồi! Đồng hồ của tôi chạy chậm.",
       "py": "A! Xiànzài shídiǎn le! Wǒ de biǎo màn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了 Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你十五歲了，應該學做飯了。",
       "vi": "Con mười lăm tuổi rồi, nên học nấu ăn đi.",
       "py": "Nǐ shíwǔsuì le, yīnggāi xué zuòfàn le."
      },
      {
       "hz": "上課了，老師來了，我們不可以玩手機了。",
       "vi": "Vào học rồi, thầy giáo đến rồi, chúng ta không được chơi điện thoại nữa.",
       "py": "Shàngkè le, lǎoshī lái le, wǒmen bù kěyǐ wán shǒujī le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "A:請你明天早上九點來。",
       "vi": "A: Mời anh chín giờ sáng mai đến.",
       "py": "A: Qǐng nǐ míngtiān zǎoshàng jiǔdiǎn lái."
      },
      {
       "hz": "B:好，我知道了，謝謝。",
       "vi": "B: Vâng, tôi biết rồi, cảm ơn.",
       "py": "B: Hǎo, wǒ zhīdào le, xièxie."
      },
      {
       "hz": "老師:不可以說「吃飯得很快」，應該說",
       "vi": "Thầy giáo: Không được nói “吃飯得很快”, phải nói là",
       "py": "Lǎoshī: Bù kěyǐ shuō “chīfàn de hěnkuài”, yīnggāi shuō"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "I. Verb-Objects Serving as Topics",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "走路去太慢了!",
       "vi": "Đi bộ đến đó chậm quá!",
       "py": "Zǒulù qù tàimàn le!"
      },
      {
       "hz": "唱歌、跳舞都很有趣。",
       "vi": "Ca hát, nhảy múa đều rất thú vị.",
       "py": "Chànggē, tiàowǔ dōu hěn yǒuqù."
      },
      {
       "hz": "跑步、游泳、打網球，我都喜歡。",
       "vi": "Chạy bộ, bơi lội, chơi quần vợt, môn nào tôi cũng thích.",
       "py": "Pǎobù, yóuyǒng, dǎwǎngqiú, wǒ dōu xǐhuān."
      },
      {
       "hz": "我們都很喜歡。",
       "vi": "Chúng tôi đều rất thích.",
       "py": "Wǒmen dōu hěn xǐhuān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cụm động–tân làm chủ đề câu",
   "giaiThich": "Đưa cụm \"động từ + tân ngữ\" lên đầu câu để làm chủ đề, phần muốn nói về nó đứng sau."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎnr chá, chī yìdiǎnr fàn.",
     "examples": [
      {
       "hz": "我同學的妹妹又可愛又漂亮。",
       "vi": "Em gái của bạn học tôi vừa dễ thương vừa xinh đẹp.",
       "py": "Wǒ tóngxué de mèimei yòu kě'ài yòu piàoliàng."
      },
      {
       "hz": "我現在又餓又渴，想喝一點兒茶、吃一點兒飯。",
       "vi": "Bây giờ tôi vừa đói vừa khát, muốn uống chút trà, ăn chút cơm.",
       "py": "Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎn'ér chá, chī yìdiǎn'ér fàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó. This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Complete the following sentences with 又……又…….",
     "examples": [
      {
       "hz": "他又想去日本，又想去韓國，不知道應該先去哪國。",
       "vi": "Anh ấy vừa muốn đi Nhật, vừa muốn đi Hàn Quốc, không biết nên đi nước nào trước.",
       "py": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó."
      },
      {
       "hz": "A:你喜歡夏天嗎？",
       "vi": "A: Bạn có thích mùa hè không?",
       "py": "A: Nǐ xǐhuān xiàtiān ma?"
      },
      {
       "hz": "A:你覺得這家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Bạn thấy mì bò của nhà hàng này thế nào?",
       "py": "A: Nǐ juéde zhèjiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "A:他常常去海邊嗎？",
       "vi": "A: Anh ấy có hay đi biển không?",
       "py": "A: Tā chángcháng qù hǎibiān ma?"
      },
      {
       "hz": "他平常坐哪一條捷運線去上課？",
       "vi": "Bình thường anh ấy đi tuyến tàu điện ngầm nào đến lớp?",
       "py": "Tā píngcháng zuò nǎyìtiáo jiéyùn xiàn qù shàngkè?"
      },
      {
       "hz": "他也坐捷運去哪裡？",
       "vi": "Anh ấy còn đi tàu điện ngầm đến đâu nữa?",
       "py": "Tā yě zuò jiéyùn qù nǎlǐ?"
      },
      {
       "hz": "朋友去他家方便嗎？",
       "vi": "Bạn bè đến nhà anh ấy có tiện không?",
       "py": "Péngyǒu qù tājiā fāngbiàn ma?"
      },
      {
       "hz": "他家附近有機場嗎？他可以怎麼去機場？",
       "vi": "Gần nhà anh ấy có sân bay không? Anh ấy có thể đến sân bay bằng cách nào?",
       "py": "Tājiā fùjìn yǒu jīchǎng ma? Tā kěyǐ zěnme qù jīchǎng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  }
 ],
 "td1-7.4": [
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": "This sentence pattern is used to convey someone departing from somewhere or going to somewhere.",
     "examples": [
      {
       "hz": "A:你從哪裡來？",
       "vi": "A: Bạn từ đâu đến?",
       "py": "A: Nǐ cóng nǎlǐ lái?"
      },
      {
       "hz": "B:我從飯店來。",
       "vi": "B: Tôi từ khách sạn đến.",
       "py": "B: Wǒ cóng fàndiàn lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A:你到哪裡去？",
       "vi": "A: Bạn đi đâu?",
       "py": "A: Nǐ dào nǎlǐ qù?"
      },
      {
       "hz": "B:我到咖啡廳去。",
       "vi": "B: Tôi đến quán cà phê.",
       "py": "B: Wǒ dào kāfēitīng qù."
      },
      {
       "hz": "A:他到圖書館去嗎？",
       "vi": "A: Anh ấy đi thư viện à?",
       "py": "A: Tā dào túshūguǎn qù ma?"
      },
      {
       "hz": "B:他不到圖書館去，他到朋友家去。",
       "vi": "B: Anh ấy không đi thư viện, anh ấy đến nhà bạn.",
       "py": "B: Tā búdào túshūguǎn qù, tā dào péngyǒujiā qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "I. Sentences with 從 or/and 到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "他從旅館到我家來吃飯。",
       "vi": "Anh ấy từ khách sạn đến nhà tôi ăn cơm.",
       "py": "Tā cóng lǚguǎn dào wǒjiā lái chīfàn."
      },
      {
       "hz": "他從學校到飲料店去買珍珠奶茶。",
       "vi": "Anh ấy từ trường đến tiệm đồ uống mua trà sữa trân châu.",
       "py": "Tā cóng xuéxiào dào yǐnliàodiàn qù mǎi zhēnzhūnǎichá."
      },
      {
       "hz": "他今天從韓國到台灣來看朋友。",
       "vi": "Hôm nay anh ấy từ Hàn Quốc đến Đài Loan thăm bạn.",
       "py": "Tā jīntiān cóng Hánguó dào Táiwān láikàn péngyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 從 và 到",
   "giaiThich": "Mẫu câu nói ai đó đi TỪ đâu (從) hoặc ĐẾN đâu (到)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "This pattern expresses how to get around with transportation or on foot.",
     "examples": [
      {
       "hz": "A:你們怎麼來？",
       "vi": "A: Các bạn đến bằng gì?",
       "py": "A: Nǐmen zěnme lái?"
      },
      {
       "hz": "B:我們騎腳踏車來。",
       "vi": "B: Chúng tôi đạp xe đến.",
       "py": "B: Wǒmen qí jiǎotàchē lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "II. How to Get Around with Transportation",
   "points": [
    {
     "label": null,
     "formula": "Rearrange the following sentences.",
     "examples": [
      {
       "hz": "A:你要走路去嗎？",
       "vi": "A: Bạn định đi bộ đến đó à?",
       "py": "A: Nǐ yào zǒulù qù ma?"
      },
      {
       "hz": "B:我不要走路去，我要坐捷運去。",
       "vi": "B: Tôi không đi bộ, tôi sẽ đi tàu điện ngầm.",
       "py": "B: Wǒ búyào zǒulù qù, wǒ yào zuò jiéyùn qù."
      },
      {
       "hz": "A:他坐公車到學校去嗎？",
       "vi": "A: Anh ấy đi xe buýt đến trường à?",
       "py": "A: Tā zuògōngchē dào xuéxiào qù ma?"
      },
      {
       "hz": "B:不，他坐計程車到學校去。",
       "vi": "B: Không, anh ấy đi taxi đến trường.",
       "py": "B: Bù, tā zuò jìchéngchē dào xuéxiào qù."
      },
      {
       "hz": "怎麼/到/你/他家/去/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Zěnme / dào / nǐ / tājiā / qù /?"
      },
      {
       "hz": "到/坐公車/每天/來/學校/他/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Dào / zuògōngchē / měitiān / lái / xuéxiào / tā /."
      },
      {
       "hz": "不要/那家/走路/去/到/飯店/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Búyào / nà jiā / zǒulù / qù / dào / fàndiàn / wǒ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nói về phương tiện đi lại",
   "giaiThich": "Mẫu câu diễn đạt đi bằng phương tiện gì hoặc đi bộ (坐/搭 + phương tiện + động từ)."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "When there is a new situation, 了 can be placed at the end of the sentence to express the change.",
     "examples": [
      {
       "hz": "我餓了，想吃一點東西。",
       "vi": "Tôi đói rồi, muốn ăn chút gì đó.",
       "py": "Wǒ è le, xiǎng chī yìdiǎn dōngxī."
      },
      {
       "hz": "孩子都累了，我們一起休息吧！",
       "vi": "Bọn trẻ đều mệt rồi, chúng ta cùng nghỉ ngơi thôi!",
       "py": "Háizi dōu lèi le, wǒmen yìqǐ xiūxí ba!"
      },
      {
       "hz": "啊！現在十點了！我的錶慢了。",
       "vi": "Ôi! Bây giờ đã mười giờ rồi! Đồng hồ của tôi chạy chậm.",
       "py": "A! Xiànzài shídiǎn le! Wǒ de biǎo màn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了 Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "你十五歲了，應該學做飯了。",
       "vi": "Con mười lăm tuổi rồi, nên học nấu ăn đi.",
       "py": "Nǐ shíwǔsuì le, yīnggāi xué zuòfàn le."
      },
      {
       "hz": "上課了，老師來了，我們不可以玩手機了。",
       "vi": "Vào học rồi, thầy giáo đến rồi, chúng ta không được chơi điện thoại nữa.",
       "py": "Shàngkè le, lǎoshī lái le, wǒmen bù kěyǐ wán shǒujī le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "III. 了Indicating Changed Situations",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "A:請你明天早上九點來。",
       "vi": "A: Mời anh chín giờ sáng mai đến.",
       "py": "A: Qǐng nǐ míngtiān zǎoshàng jiǔdiǎn lái."
      },
      {
       "hz": "B:好，我知道了，謝謝。",
       "vi": "B: Vâng, tôi biết rồi, cảm ơn.",
       "py": "B: Hǎo, wǒ zhīdào le, xièxie."
      },
      {
       "hz": "老師:不可以說「吃飯得很快」，應該說",
       "vi": "Thầy giáo: Không được nói “吃飯得很快”, phải nói là",
       "py": "Lǎoshī: Bù kěyǐ shuō “chīfàn de hěnkuài”, yīnggāi shuō"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ sự thay đổi tình huống",
   "giaiThich": "Khi tình huống đã đổi khác, đặt 了 ở cuối câu để diễn đạt sự thay đổi đó."
  },
  {
   "title": "I. Verb-Objects Serving as Topics",
   "points": [
    {
     "label": null,
     "formula": "Complete the following sentences.",
     "examples": [
      {
       "hz": "走路去太慢了!",
       "vi": "Đi bộ đến đó chậm quá!",
       "py": "Zǒulù qù tàimàn le!"
      },
      {
       "hz": "唱歌、跳舞都很有趣。",
       "vi": "Ca hát, nhảy múa đều rất thú vị.",
       "py": "Chànggē, tiàowǔ dōu hěn yǒuqù."
      },
      {
       "hz": "跑步、游泳、打網球，我都喜歡。",
       "vi": "Chạy bộ, bơi lội, chơi quần vợt, môn nào tôi cũng thích.",
       "py": "Pǎobù, yóuyǒng, dǎwǎngqiú, wǒ dōu xǐhuān."
      },
      {
       "hz": "我們都很喜歡。",
       "vi": "Chúng tôi đều rất thích.",
       "py": "Wǒmen dōu hěn xǐhuān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Cụm động–tân làm chủ đề câu",
   "giaiThich": "Đưa cụm \"động từ + tân ngữ\" lên đầu câu để làm chủ đề, phần muốn nói về nó đứng sau."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎnr chá, chī yìdiǎnr fàn.",
     "examples": [
      {
       "hz": "我同學的妹妹又可愛又漂亮。",
       "vi": "Em gái của bạn học tôi vừa dễ thương vừa xinh đẹp.",
       "py": "Wǒ tóngxué de mèimei yòu kě'ài yòu piàoliàng."
      },
      {
       "hz": "我現在又餓又渴，想喝一點兒茶、吃一點兒飯。",
       "vi": "Bây giờ tôi vừa đói vừa khát, muốn uống chút trà, ăn chút cơm.",
       "py": "Wǒ xiànzài yòu è yòu kě, xiǎng hē yìdiǎn'ér chá, chī yìdiǎn'ér fàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  },
  {
   "title": "II. Sentences with Adverb 又……又……",
   "points": [
    {
     "label": null,
     "formula": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó. This double 又 structure is like “both… and...”. It is used to describe two qualities to the subject. However, 又 can not be followed by nouns. Complete the following sentences with 又……又…….",
     "examples": [
      {
       "hz": "他又想去日本，又想去韓國，不知道應該先去哪國。",
       "vi": "Anh ấy vừa muốn đi Nhật, vừa muốn đi Hàn Quốc, không biết nên đi nước nào trước.",
       "py": "Tā yòu xiǎng qù Rìběn, yòu xiǎng qù Hánguó, bù zhīdào yīnggāi xiān qù nǎ guó."
      },
      {
       "hz": "A:你喜歡夏天嗎？",
       "vi": "A: Bạn có thích mùa hè không?",
       "py": "A: Nǐ xǐhuān xiàtiān ma?"
      },
      {
       "hz": "A:你覺得這家餐廳的牛肉麵怎麼樣？",
       "vi": "A: Bạn thấy mì bò của nhà hàng này thế nào?",
       "py": "A: Nǐ juéde zhèjiā cāntīng de niúròumiàn zěnmeyàng?"
      },
      {
       "hz": "A:他常常去海邊嗎？",
       "vi": "A: Anh ấy có hay đi biển không?",
       "py": "A: Tā chángcháng qù hǎibiān ma?"
      },
      {
       "hz": "他平常坐哪一條捷運線去上課？",
       "vi": "Bình thường anh ấy đi tuyến tàu điện ngầm nào đến lớp?",
       "py": "Tā píngcháng zuò nǎyìtiáo jiéyùn xiàn qù shàngkè?"
      },
      {
       "hz": "他也坐捷運去哪裡？",
       "vi": "Anh ấy còn đi tàu điện ngầm đến đâu nữa?",
       "py": "Tā yě zuò jiéyùn qù nǎlǐ?"
      },
      {
       "hz": "朋友去他家方便嗎？",
       "vi": "Bạn bè đến nhà anh ấy có tiện không?",
       "py": "Péngyǒu qù tājiā fāngbiàn ma?"
      },
      {
       "hz": "他家附近有機場嗎？他可以怎麼去機場？",
       "vi": "Gần nhà anh ấy có sân bay không? Anh ấy có thể đến sân bay bằng cách nào?",
       "py": "Tājiā fùjìn yǒu jīchǎng ma? Tā kěyǐ zěnme qù jīchǎng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu với 又……又…… (vừa… vừa…)",
   "giaiThich": "Cấu trúc 又…又… nêu HAI tính chất cùng lúc của chủ ngữ, như \"vừa… vừa…\". Lưu ý: sau 又 KHÔNG được đặt danh từ."
  }
 ],
 "td1-8.1": [
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這家餐廳的牛肉麵很好吃，我常吃。",
       "vi": "Mì bò của nhà hàng này rất ngon, tôi hay ăn.",
       "py": "Zhèjiā cāntīng de niúròumiàn hěn hǎochī, wǒ cháng chī."
      },
      {
       "hz": "這杯茶有點兒難喝，我不要喝。",
       "vi": "Cốc trà này hơi khó uống, tôi không uống đâu.",
       "py": "Zhè bēi chá yǒudiǎn'ér nán hē, wǒ búyào hē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "Nǐ chànggē chàng de hěn hǎotīng, xiànzài chàng yì shǒu, hǎo ma? (1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這件衣服的顏色很好看，我很喜歡。",
       "vi": "Màu của bộ quần áo này rất đẹp, tôi rất thích.",
       "py": "Zhèjiàn yīfú de yánsè hěn hǎokàn, wǒ hěn xǐhuān."
      },
      {
       "hz": "你唱歌唱得很好聽，現在唱一首，好嗎？",
       "vi": "Bạn hát hay lắm, bây giờ hát một bài nhé?",
       "py": "Nǐ chàng gēchàng de hěn hǎotīng, xiànzài chàng yìshǒu, hǎo ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Zhè shǒu Zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng.",
     "examples": [
      {
       "hz": "這首中文歌很好唱，我朋友都會唱。",
       "vi": "Bài hát tiếng Trung này rất dễ hát, bạn bè tôi ai cũng biết hát.",
       "py": "Zhè shǒu zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng."
      },
      {
       "hz": "弟弟不喜歡說英文，他覺得英文很難學。",
       "vi": "Em trai không thích nói tiếng Anh, cậu ấy thấy tiếng Anh rất khó học.",
       "py": "Dìdi bù xǐhuān shuō yīngwén, tā juéde yīngwén hěn nán xué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Use 好 or 難 with perception verbs or action verbs to complete the following sentences.",
     "examples": [
      {
       "hz": "這裡附近只有一家百貨公司，很好找。",
       "vi": "Gần đây chỉ có một trung tâm thương mại, rất dễ tìm.",
       "py": "Zhèlǐ fùjìn zhǐyǒu yìjiā bǎihuògōngsī, hěn hǎozhǎo."
      },
      {
       "hz": "這輛腳踏車太小了，很難騎。",
       "vi": "Chiếc xe đạp này nhỏ quá, rất khó đi.",
       "py": "Zhèliàng jiǎotàchē tàixiǎo le, hěn nán qí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "II. Cause and Effect with 因為……所以……",
   "points": [
    {
     "label": null,
     "formula": "Yīnwèi zhè ge páizi hěn yǒumíng, yīfu yě hěn hǎokàn, suǒyǐ hěn duō rén xǐhuān. In this pattern, two clauses are connected in one cause-effect sentence. The clause with 因為 usually comes first to state the reason , followed by the other one with 所以 to state the result. Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bù xiǎng zǒulù dào xuéxiào qù. Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrì lǐwù. Complete the following dialogues. Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shài tàiyáng, suǒyǐ xiǎng qù hǎibiān wán.",
     "examples": [
      {
       "hz": "因為這個牌子很有名，衣服也很好看，所以很多人喜歡。",
       "vi": "Vì nhãn hiệu này rất nổi tiếng, quần áo cũng rất đẹp, nên nhiều người thích.",
       "py": "Yīnwèi zhège páizi hěn yǒumíng, yīfú yě hěn hǎokàn, suǒyǐ hěnduō rén xǐhuān."
      },
      {
       "hz": "A:為什麼你的朋友不跟你來？",
       "vi": "A: Sao bạn của bạn không đi cùng bạn?",
       "py": "A: Wèishénme nǐ de péngyǒu bù gēn nǐ lái?"
      },
      {
       "hz": "B:因為他很累，所以他要在家休息。",
       "vi": "B: Vì cậu ấy rất mệt, nên cậu ấy muốn ở nhà nghỉ ngơi.",
       "py": "B: Yīnwèi tā hěn lèi, suǒyǐ tā yào zàijiā xiūxí."
      },
      {
       "hz": "A:你為什麼不想走路到學校去？",
       "vi": "A: Sao bạn không muốn đi bộ đến trường?",
       "py": "A: Nǐ wèishénme bùxiǎng zǒulù dào xuéxiào qù?"
      },
      {
       "hz": "B:因為學校很遠，所以我不想走路到學校去。",
       "vi": "B: Vì trường rất xa, nên tôi không muốn đi bộ đến trường.",
       "py": "B: Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bùxiǎng zǒulù dào xuéxiào qù."
      },
      {
       "hz": "A:你為什麼今天一定要去百貨公司？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi trung tâm thương mại?",
       "py": "A: Nǐ wèishénme jīntiān yídìng yào qù bǎihuògōngsī?"
      },
      {
       "hz": "B:因為明天是我弟弟的生日，所以我要去買他的生日禮物。",
       "vi": "B: Vì ngày mai là sinh nhật em trai tôi, nên tôi phải đi mua quà sinh nhật cho em.",
       "py": "B: Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrìlǐwù."
      },
      {
       "hz": "A：他為什麼常常穿綠色的衣服？",
       "vi": "A: Sao anh ấy hay mặc quần áo màu xanh lá?",
       "py": "A: Tā wèishénme chángcháng chuān lǜsè de yīfú?"
      },
      {
       "hz": "B：因為我想游泳，也想曬太陽，所以想去海邊玩。",
       "vi": "B: Vì tôi muốn bơi, cũng muốn tắm nắng, nên muốn đi biển chơi.",
       "py": "B: Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shàitàiyáng, suǒyǐ xiǎng qù hǎibiān wán."
      },
      {
       "hz": "A：你為什麼想學中文？",
       "vi": "A: Sao bạn muốn học tiếng Trung?",
       "py": "A: Nǐ wèishénme xiǎng xué zhōngwén?"
      },
      {
       "hz": "什麼顏色是今年流行的顏色？",
       "vi": "Màu nào là màu thịnh hành năm nay?",
       "py": "Shénme yánsè shì jīnnián liúxíng de yánsè?"
      },
      {
       "hz": "宜文覺得褲子怎麼樣？",
       "vi": "Nghi Văn thấy chiếc quần thế nào?",
       "py": "Yíwén juéde kùzi zěnmeyàng?"
      },
      {
       "hz": "她們為什麼現在要去買鞋子？",
       "vi": "Sao bây giờ họ lại muốn đi mua giày?",
       "py": "Tāmen wèishénme xiànzài yào qù mǎi xiézi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhân quả với 因為……所以……",
   "giaiThich": "Hai mệnh đề nối thành câu nhân quả: 因為 nêu NGUYÊN NHÂN (đứng trước), 所以 nêu KẾT QUẢ (đứng sau)."
  },
  {
   "title": "I. Expressing Supposition with 吧",
   "points": [
    {
     "label": null,
     "formula": "This 吧 expresses that the speaker has an assumption, but asks for confirmation. Nǐ xiànzài yǒukòng ba? Yào bú yào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài? Complete the following dialogues.",
     "examples": [
      {
       "hz": "A:你會唱中文歌吧？",
       "vi": "A: Bạn biết hát bài hát tiếng Trung chứ?",
       "py": "A: Nǐ huì chàng zhōngwén gē ba?"
      },
      {
       "hz": "B:會。可是不多，我只會唱三首。",
       "vi": "B: Biết. Nhưng không nhiều, tôi chỉ biết hát ba bài.",
       "py": "B: Huì. Kěshì bù duō, wǒ zhǐ huì chàng sānshǒu."
      },
      {
       "hz": "你還要買鞋子",
       "vi": "Bạn còn muốn mua giày nữa",
       "py": "Nǐ háiyào mǎi xiézi"
      },
      {
       "hz": "A:你現在有空吧？要不要跟我一起去看網球比賽？",
       "vi": "A: Bây giờ bạn rảnh chứ? Có muốn đi xem trận quần vợt với tôi không?",
       "py": "A: Nǐ xiànzài yǒukòng ba? Yào búyào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài?"
      },
      {
       "hz": "B:有空，可是我想先吃一點兒東西。",
       "vi": "B: Rảnh, nhưng tôi muốn ăn chút gì đó trước đã.",
       "py": "B: Yǒukòng, kěshì wǒ xiǎng xiān chī yìdiǎn'ér dōngxī."
      },
      {
       "hz": "A:他平常都坐捷運來上課吧？",
       "vi": "A: Bình thường anh ấy đều đi tàu điện ngầm đến lớp nhỉ?",
       "py": "A: Tā píngcháng dōu zuò jiéyùn lái shàngkè ba?"
      },
      {
       "hz": "B:不是，他都坐公車來上課。",
       "vi": "B: Không, anh ấy toàn đi xe buýt đến lớp.",
       "py": "B: Búshì, tā dōu zuògōngchē lái shàngkè."
      },
      {
       "hz": "B:喜歡，我每天早上都一定要喝。",
       "vi": "B: Thích chứ, sáng nào tôi cũng nhất định phải uống.",
       "py": "B: Xǐhuān, wǒ měitiān zǎoshàng dōu yídìng yào hē."
      },
      {
       "hz": "B:是啊，他是韓國人。",
       "vi": "B: Đúng vậy, anh ấy là người Hàn Quốc.",
       "py": "B: Shì a, tā shì Hánguó rén."
      },
      {
       "hz": "B:不會，可是我會打網球。",
       "vi": "B: Không biết, nhưng tôi biết chơi quần vợt.",
       "py": "B: Búhuì, kěshì wǒhuì dǎwǎngqiú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "吧 diễn đạt phỏng đoán",
   "giaiThich": "吧 ở cuối câu khi người nói đã đoán sẵn điều gì đó và muốn hỏi lại cho chắc (\"… phải không?\")."
  },
  {
   "title": "II. VV 看 (to try and see)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, a mono-syllable action verb is reduplicated and a cognitive verb 看 is placed at the end. Complete the following dialogues. Cóng Táiběi huǒchēzhàn dào Táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn.",
     "examples": [
      {
       "hz": "A:我不知道要買哪種甜點。",
       "vi": "A: Tôi không biết nên mua loại bánh ngọt nào.",
       "py": "A: Wǒ bù zhīdào yào mǎi nǎ zhǒng tiándiǎn."
      },
      {
       "hz": "B:你可以先吃吃看。",
       "vi": "B: Bạn có thể ăn thử trước xem.",
       "py": "B: Nǐ kěyǐ xiān chī chī kàn."
      },
      {
       "hz": "A:我的錢包在你那裡嗎？",
       "vi": "A: Ví tiền của tôi có ở chỗ bạn không?",
       "py": "A: Wǒ de qiánbāo zài nǐ nàlǐ ma?"
      },
      {
       "hz": "B:不在我這裡，你去客廳找找看。",
       "vi": "B: Không ở chỗ tôi, bạn ra phòng khách tìm thử xem.",
       "py": "B: Bú zài wǒ zhèlǐ, nǐ qù kètīng zhǎozhǎokàn."
      },
      {
       "hz": "A:聽說這裡的咖啡很好喝。",
       "vi": "A: Nghe nói cà phê ở đây rất ngon.",
       "py": "A: Tīngshuō zhèlǐ de kāfēi hěn hǎohē."
      },
      {
       "hz": "B:好，我喝喝看。",
       "vi": "B: Được, để tôi uống thử xem.",
       "py": "B: Hǎo, wǒ hēhē kàn."
      },
      {
       "hz": "A:從台北火車站到桃園機場，坐捷運又快又方便。",
       "vi": "A: Từ ga tàu Đài Bắc đến sân bay Đào Viên, đi tàu điện ngầm vừa nhanh vừa tiện.",
       "py": "A: Cóng Táiběi huǒchēzhàn dào táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn."
      },
      {
       "hz": "A:我不想等他了，我們先去餐廳吧。",
       "vi": "A: Tôi không muốn đợi anh ấy nữa, chúng ta đến nhà hàng trước đi.",
       "py": "A: Wǒ bùxiǎng děng tā le, wǒmen xiān qù cāntīng ba."
      },
      {
       "hz": "A:他們都不太喜歡這首歌，你呢？",
       "vi": "A: Họ đều không thích bài hát này lắm, còn bạn?",
       "py": "A: Tāmen dōu bú tài xǐhuān zhè shǒugē, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "VV 看 — thử làm xem sao",
   "giaiThich": "Lặp lại động từ đơn âm rồi thêm 看 ở cuối, nghĩa \"thử … xem\" (試試看, 看看)."
  },
  {
   "title": "III. 快(要)/要…了 (to be about to)",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates that the action following 快 (要)/要 is about to happen. 了 is always used at the end of the sentence.",
     "examples": [
      {
       "hz": "火車快要來了。",
       "vi": "Tàu hoả sắp đến rồi.",
       "py": "Huǒchē kuàiyào lái le."
      },
      {
       "hz": "現在八點五十分了，圖書館快開了。",
       "vi": "Bây giờ là tám giờ năm mươi rồi, thư viện sắp mở cửa rồi.",
       "py": "Xiànzài bādiǎn wǔ shífēn le, túshūguǎn kuài kāi le."
      },
      {
       "hz": "十月了，冬天快要到了。",
       "vi": "Tháng Mười rồi, mùa đông sắp đến rồi.",
       "py": "Shíyuè le, dōngtiān kuàiyào dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "快(要)/要……了 — sắp sửa",
   "giaiThich": "Diễn đạt hành động SẮP xảy ra; cuối câu luôn có 了."
  }
 ],
 "td1-8.2": [
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這家餐廳的牛肉麵很好吃，我常吃。",
       "vi": "Mì bò của nhà hàng này rất ngon, tôi hay ăn.",
       "py": "Zhèjiā cāntīng de niúròumiàn hěn hǎochī, wǒ cháng chī."
      },
      {
       "hz": "這杯茶有點兒難喝，我不要喝。",
       "vi": "Cốc trà này hơi khó uống, tôi không uống đâu.",
       "py": "Zhè bēi chá yǒudiǎn'ér nán hē, wǒ búyào hē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "Nǐ chànggē chàng de hěn hǎotīng, xiànzài chàng yì shǒu, hǎo ma? (1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這件衣服的顏色很好看，我很喜歡。",
       "vi": "Màu của bộ quần áo này rất đẹp, tôi rất thích.",
       "py": "Zhèjiàn yīfú de yánsè hěn hǎokàn, wǒ hěn xǐhuān."
      },
      {
       "hz": "你唱歌唱得很好聽，現在唱一首，好嗎？",
       "vi": "Bạn hát hay lắm, bây giờ hát một bài nhé?",
       "py": "Nǐ chàng gēchàng de hěn hǎotīng, xiànzài chàng yìshǒu, hǎo ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Zhè shǒu Zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng.",
     "examples": [
      {
       "hz": "這首中文歌很好唱，我朋友都會唱。",
       "vi": "Bài hát tiếng Trung này rất dễ hát, bạn bè tôi ai cũng biết hát.",
       "py": "Zhè shǒu zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng."
      },
      {
       "hz": "弟弟不喜歡說英文，他覺得英文很難學。",
       "vi": "Em trai không thích nói tiếng Anh, cậu ấy thấy tiếng Anh rất khó học.",
       "py": "Dìdi bù xǐhuān shuō yīngwén, tā juéde yīngwén hěn nán xué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Use 好 or 難 with perception verbs or action verbs to complete the following sentences.",
     "examples": [
      {
       "hz": "這裡附近只有一家百貨公司，很好找。",
       "vi": "Gần đây chỉ có một trung tâm thương mại, rất dễ tìm.",
       "py": "Zhèlǐ fùjìn zhǐyǒu yìjiā bǎihuògōngsī, hěn hǎozhǎo."
      },
      {
       "hz": "這輛腳踏車太小了，很難騎。",
       "vi": "Chiếc xe đạp này nhỏ quá, rất khó đi.",
       "py": "Zhèliàng jiǎotàchē tàixiǎo le, hěn nán qí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "II. Cause and Effect with 因為……所以……",
   "points": [
    {
     "label": null,
     "formula": "Yīnwèi zhè ge páizi hěn yǒumíng, yīfu yě hěn hǎokàn, suǒyǐ hěn duō rén xǐhuān. In this pattern, two clauses are connected in one cause-effect sentence. The clause with 因為 usually comes first to state the reason , followed by the other one with 所以 to state the result. Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bù xiǎng zǒulù dào xuéxiào qù. Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrì lǐwù. Complete the following dialogues. Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shài tàiyáng, suǒyǐ xiǎng qù hǎibiān wán.",
     "examples": [
      {
       "hz": "因為這個牌子很有名，衣服也很好看，所以很多人喜歡。",
       "vi": "Vì nhãn hiệu này rất nổi tiếng, quần áo cũng rất đẹp, nên nhiều người thích.",
       "py": "Yīnwèi zhège páizi hěn yǒumíng, yīfú yě hěn hǎokàn, suǒyǐ hěnduō rén xǐhuān."
      },
      {
       "hz": "A:為什麼你的朋友不跟你來？",
       "vi": "A: Sao bạn của bạn không đi cùng bạn?",
       "py": "A: Wèishénme nǐ de péngyǒu bù gēn nǐ lái?"
      },
      {
       "hz": "B:因為他很累，所以他要在家休息。",
       "vi": "B: Vì cậu ấy rất mệt, nên cậu ấy muốn ở nhà nghỉ ngơi.",
       "py": "B: Yīnwèi tā hěn lèi, suǒyǐ tā yào zàijiā xiūxí."
      },
      {
       "hz": "A:你為什麼不想走路到學校去？",
       "vi": "A: Sao bạn không muốn đi bộ đến trường?",
       "py": "A: Nǐ wèishénme bùxiǎng zǒulù dào xuéxiào qù?"
      },
      {
       "hz": "B:因為學校很遠，所以我不想走路到學校去。",
       "vi": "B: Vì trường rất xa, nên tôi không muốn đi bộ đến trường.",
       "py": "B: Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bùxiǎng zǒulù dào xuéxiào qù."
      },
      {
       "hz": "A:你為什麼今天一定要去百貨公司？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi trung tâm thương mại?",
       "py": "A: Nǐ wèishénme jīntiān yídìng yào qù bǎihuògōngsī?"
      },
      {
       "hz": "B:因為明天是我弟弟的生日，所以我要去買他的生日禮物。",
       "vi": "B: Vì ngày mai là sinh nhật em trai tôi, nên tôi phải đi mua quà sinh nhật cho em.",
       "py": "B: Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrìlǐwù."
      },
      {
       "hz": "A：他為什麼常常穿綠色的衣服？",
       "vi": "A: Sao anh ấy hay mặc quần áo màu xanh lá?",
       "py": "A: Tā wèishénme chángcháng chuān lǜsè de yīfú?"
      },
      {
       "hz": "B：因為我想游泳，也想曬太陽，所以想去海邊玩。",
       "vi": "B: Vì tôi muốn bơi, cũng muốn tắm nắng, nên muốn đi biển chơi.",
       "py": "B: Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shàitàiyáng, suǒyǐ xiǎng qù hǎibiān wán."
      },
      {
       "hz": "A：你為什麼想學中文？",
       "vi": "A: Sao bạn muốn học tiếng Trung?",
       "py": "A: Nǐ wèishénme xiǎng xué zhōngwén?"
      },
      {
       "hz": "什麼顏色是今年流行的顏色？",
       "vi": "Màu nào là màu thịnh hành năm nay?",
       "py": "Shénme yánsè shì jīnnián liúxíng de yánsè?"
      },
      {
       "hz": "宜文覺得褲子怎麼樣？",
       "vi": "Nghi Văn thấy chiếc quần thế nào?",
       "py": "Yíwén juéde kùzi zěnmeyàng?"
      },
      {
       "hz": "她們為什麼現在要去買鞋子？",
       "vi": "Sao bây giờ họ lại muốn đi mua giày?",
       "py": "Tāmen wèishénme xiànzài yào qù mǎi xiézi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhân quả với 因為……所以……",
   "giaiThich": "Hai mệnh đề nối thành câu nhân quả: 因為 nêu NGUYÊN NHÂN (đứng trước), 所以 nêu KẾT QUẢ (đứng sau)."
  },
  {
   "title": "I. Expressing Supposition with 吧",
   "points": [
    {
     "label": null,
     "formula": "This 吧 expresses that the speaker has an assumption, but asks for confirmation. Nǐ xiànzài yǒukòng ba? Yào bú yào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài? Complete the following dialogues.",
     "examples": [
      {
       "hz": "A:你會唱中文歌吧？",
       "vi": "A: Bạn biết hát bài hát tiếng Trung chứ?",
       "py": "A: Nǐ huì chàng zhōngwén gē ba?"
      },
      {
       "hz": "B:會。可是不多，我只會唱三首。",
       "vi": "B: Biết. Nhưng không nhiều, tôi chỉ biết hát ba bài.",
       "py": "B: Huì. Kěshì bù duō, wǒ zhǐ huì chàng sānshǒu."
      },
      {
       "hz": "你還要買鞋子",
       "vi": "Bạn còn muốn mua giày nữa",
       "py": "Nǐ háiyào mǎi xiézi"
      },
      {
       "hz": "A:你現在有空吧？要不要跟我一起去看網球比賽？",
       "vi": "A: Bây giờ bạn rảnh chứ? Có muốn đi xem trận quần vợt với tôi không?",
       "py": "A: Nǐ xiànzài yǒukòng ba? Yào búyào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài?"
      },
      {
       "hz": "B:有空，可是我想先吃一點兒東西。",
       "vi": "B: Rảnh, nhưng tôi muốn ăn chút gì đó trước đã.",
       "py": "B: Yǒukòng, kěshì wǒ xiǎng xiān chī yìdiǎn'ér dōngxī."
      },
      {
       "hz": "A:他平常都坐捷運來上課吧？",
       "vi": "A: Bình thường anh ấy đều đi tàu điện ngầm đến lớp nhỉ?",
       "py": "A: Tā píngcháng dōu zuò jiéyùn lái shàngkè ba?"
      },
      {
       "hz": "B:不是，他都坐公車來上課。",
       "vi": "B: Không, anh ấy toàn đi xe buýt đến lớp.",
       "py": "B: Búshì, tā dōu zuògōngchē lái shàngkè."
      },
      {
       "hz": "B:喜歡，我每天早上都一定要喝。",
       "vi": "B: Thích chứ, sáng nào tôi cũng nhất định phải uống.",
       "py": "B: Xǐhuān, wǒ měitiān zǎoshàng dōu yídìng yào hē."
      },
      {
       "hz": "B:是啊，他是韓國人。",
       "vi": "B: Đúng vậy, anh ấy là người Hàn Quốc.",
       "py": "B: Shì a, tā shì Hánguó rén."
      },
      {
       "hz": "B:不會，可是我會打網球。",
       "vi": "B: Không biết, nhưng tôi biết chơi quần vợt.",
       "py": "B: Búhuì, kěshì wǒhuì dǎwǎngqiú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "吧 diễn đạt phỏng đoán",
   "giaiThich": "吧 ở cuối câu khi người nói đã đoán sẵn điều gì đó và muốn hỏi lại cho chắc (\"… phải không?\")."
  },
  {
   "title": "II. VV 看 (to try and see)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, a mono-syllable action verb is reduplicated and a cognitive verb 看 is placed at the end. Complete the following dialogues. Cóng Táiběi huǒchēzhàn dào Táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn.",
     "examples": [
      {
       "hz": "A:我不知道要買哪種甜點。",
       "vi": "A: Tôi không biết nên mua loại bánh ngọt nào.",
       "py": "A: Wǒ bù zhīdào yào mǎi nǎ zhǒng tiándiǎn."
      },
      {
       "hz": "B:你可以先吃吃看。",
       "vi": "B: Bạn có thể ăn thử trước xem.",
       "py": "B: Nǐ kěyǐ xiān chī chī kàn."
      },
      {
       "hz": "A:我的錢包在你那裡嗎？",
       "vi": "A: Ví tiền của tôi có ở chỗ bạn không?",
       "py": "A: Wǒ de qiánbāo zài nǐ nàlǐ ma?"
      },
      {
       "hz": "B:不在我這裡，你去客廳找找看。",
       "vi": "B: Không ở chỗ tôi, bạn ra phòng khách tìm thử xem.",
       "py": "B: Bú zài wǒ zhèlǐ, nǐ qù kètīng zhǎozhǎokàn."
      },
      {
       "hz": "A:聽說這裡的咖啡很好喝。",
       "vi": "A: Nghe nói cà phê ở đây rất ngon.",
       "py": "A: Tīngshuō zhèlǐ de kāfēi hěn hǎohē."
      },
      {
       "hz": "B:好，我喝喝看。",
       "vi": "B: Được, để tôi uống thử xem.",
       "py": "B: Hǎo, wǒ hēhē kàn."
      },
      {
       "hz": "A:從台北火車站到桃園機場，坐捷運又快又方便。",
       "vi": "A: Từ ga tàu Đài Bắc đến sân bay Đào Viên, đi tàu điện ngầm vừa nhanh vừa tiện.",
       "py": "A: Cóng Táiběi huǒchēzhàn dào táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn."
      },
      {
       "hz": "A:我不想等他了，我們先去餐廳吧。",
       "vi": "A: Tôi không muốn đợi anh ấy nữa, chúng ta đến nhà hàng trước đi.",
       "py": "A: Wǒ bùxiǎng děng tā le, wǒmen xiān qù cāntīng ba."
      },
      {
       "hz": "A:他們都不太喜歡這首歌，你呢？",
       "vi": "A: Họ đều không thích bài hát này lắm, còn bạn?",
       "py": "A: Tāmen dōu bú tài xǐhuān zhè shǒugē, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "VV 看 — thử làm xem sao",
   "giaiThich": "Lặp lại động từ đơn âm rồi thêm 看 ở cuối, nghĩa \"thử … xem\" (試試看, 看看)."
  },
  {
   "title": "III. 快(要)/要…了 (to be about to)",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates that the action following 快 (要)/要 is about to happen. 了 is always used at the end of the sentence.",
     "examples": [
      {
       "hz": "火車快要來了。",
       "vi": "Tàu hoả sắp đến rồi.",
       "py": "Huǒchē kuàiyào lái le."
      },
      {
       "hz": "現在八點五十分了，圖書館快開了。",
       "vi": "Bây giờ là tám giờ năm mươi rồi, thư viện sắp mở cửa rồi.",
       "py": "Xiànzài bādiǎn wǔ shífēn le, túshūguǎn kuài kāi le."
      },
      {
       "hz": "十月了，冬天快要到了。",
       "vi": "Tháng Mười rồi, mùa đông sắp đến rồi.",
       "py": "Shíyuè le, dōngtiān kuàiyào dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "快(要)/要……了 — sắp sửa",
   "giaiThich": "Diễn đạt hành động SẮP xảy ra; cuối câu luôn có 了."
  }
 ],
 "td1-8.3": [
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這家餐廳的牛肉麵很好吃，我常吃。",
       "vi": "Mì bò của nhà hàng này rất ngon, tôi hay ăn.",
       "py": "Zhèjiā cāntīng de niúròumiàn hěn hǎochī, wǒ cháng chī."
      },
      {
       "hz": "這杯茶有點兒難喝，我不要喝。",
       "vi": "Cốc trà này hơi khó uống, tôi không uống đâu.",
       "py": "Zhè bēi chá yǒudiǎn'ér nán hē, wǒ búyào hē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "Nǐ chànggē chàng de hěn hǎotīng, xiànzài chàng yì shǒu, hǎo ma? (1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這件衣服的顏色很好看，我很喜歡。",
       "vi": "Màu của bộ quần áo này rất đẹp, tôi rất thích.",
       "py": "Zhèjiàn yīfú de yánsè hěn hǎokàn, wǒ hěn xǐhuān."
      },
      {
       "hz": "你唱歌唱得很好聽，現在唱一首，好嗎？",
       "vi": "Bạn hát hay lắm, bây giờ hát một bài nhé?",
       "py": "Nǐ chàng gēchàng de hěn hǎotīng, xiànzài chàng yìshǒu, hǎo ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Zhè shǒu Zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng.",
     "examples": [
      {
       "hz": "這首中文歌很好唱，我朋友都會唱。",
       "vi": "Bài hát tiếng Trung này rất dễ hát, bạn bè tôi ai cũng biết hát.",
       "py": "Zhè shǒu zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng."
      },
      {
       "hz": "弟弟不喜歡說英文，他覺得英文很難學。",
       "vi": "Em trai không thích nói tiếng Anh, cậu ấy thấy tiếng Anh rất khó học.",
       "py": "Dìdi bù xǐhuān shuō yīngwén, tā juéde yīngwén hěn nán xué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Use 好 or 難 with perception verbs or action verbs to complete the following sentences.",
     "examples": [
      {
       "hz": "這裡附近只有一家百貨公司，很好找。",
       "vi": "Gần đây chỉ có một trung tâm thương mại, rất dễ tìm.",
       "py": "Zhèlǐ fùjìn zhǐyǒu yìjiā bǎihuògōngsī, hěn hǎozhǎo."
      },
      {
       "hz": "這輛腳踏車太小了，很難騎。",
       "vi": "Chiếc xe đạp này nhỏ quá, rất khó đi.",
       "py": "Zhèliàng jiǎotàchē tàixiǎo le, hěn nán qí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "II. Cause and Effect with 因為……所以……",
   "points": [
    {
     "label": null,
     "formula": "Yīnwèi zhè ge páizi hěn yǒumíng, yīfu yě hěn hǎokàn, suǒyǐ hěn duō rén xǐhuān. In this pattern, two clauses are connected in one cause-effect sentence. The clause with 因為 usually comes first to state the reason , followed by the other one with 所以 to state the result. Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bù xiǎng zǒulù dào xuéxiào qù. Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrì lǐwù. Complete the following dialogues. Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shài tàiyáng, suǒyǐ xiǎng qù hǎibiān wán.",
     "examples": [
      {
       "hz": "因為這個牌子很有名，衣服也很好看，所以很多人喜歡。",
       "vi": "Vì nhãn hiệu này rất nổi tiếng, quần áo cũng rất đẹp, nên nhiều người thích.",
       "py": "Yīnwèi zhège páizi hěn yǒumíng, yīfú yě hěn hǎokàn, suǒyǐ hěnduō rén xǐhuān."
      },
      {
       "hz": "A:為什麼你的朋友不跟你來？",
       "vi": "A: Sao bạn của bạn không đi cùng bạn?",
       "py": "A: Wèishénme nǐ de péngyǒu bù gēn nǐ lái?"
      },
      {
       "hz": "B:因為他很累，所以他要在家休息。",
       "vi": "B: Vì cậu ấy rất mệt, nên cậu ấy muốn ở nhà nghỉ ngơi.",
       "py": "B: Yīnwèi tā hěn lèi, suǒyǐ tā yào zàijiā xiūxí."
      },
      {
       "hz": "A:你為什麼不想走路到學校去？",
       "vi": "A: Sao bạn không muốn đi bộ đến trường?",
       "py": "A: Nǐ wèishénme bùxiǎng zǒulù dào xuéxiào qù?"
      },
      {
       "hz": "B:因為學校很遠，所以我不想走路到學校去。",
       "vi": "B: Vì trường rất xa, nên tôi không muốn đi bộ đến trường.",
       "py": "B: Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bùxiǎng zǒulù dào xuéxiào qù."
      },
      {
       "hz": "A:你為什麼今天一定要去百貨公司？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi trung tâm thương mại?",
       "py": "A: Nǐ wèishénme jīntiān yídìng yào qù bǎihuògōngsī?"
      },
      {
       "hz": "B:因為明天是我弟弟的生日，所以我要去買他的生日禮物。",
       "vi": "B: Vì ngày mai là sinh nhật em trai tôi, nên tôi phải đi mua quà sinh nhật cho em.",
       "py": "B: Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrìlǐwù."
      },
      {
       "hz": "A：他為什麼常常穿綠色的衣服？",
       "vi": "A: Sao anh ấy hay mặc quần áo màu xanh lá?",
       "py": "A: Tā wèishénme chángcháng chuān lǜsè de yīfú?"
      },
      {
       "hz": "B：因為我想游泳，也想曬太陽，所以想去海邊玩。",
       "vi": "B: Vì tôi muốn bơi, cũng muốn tắm nắng, nên muốn đi biển chơi.",
       "py": "B: Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shàitàiyáng, suǒyǐ xiǎng qù hǎibiān wán."
      },
      {
       "hz": "A：你為什麼想學中文？",
       "vi": "A: Sao bạn muốn học tiếng Trung?",
       "py": "A: Nǐ wèishénme xiǎng xué zhōngwén?"
      },
      {
       "hz": "什麼顏色是今年流行的顏色？",
       "vi": "Màu nào là màu thịnh hành năm nay?",
       "py": "Shénme yánsè shì jīnnián liúxíng de yánsè?"
      },
      {
       "hz": "宜文覺得褲子怎麼樣？",
       "vi": "Nghi Văn thấy chiếc quần thế nào?",
       "py": "Yíwén juéde kùzi zěnmeyàng?"
      },
      {
       "hz": "她們為什麼現在要去買鞋子？",
       "vi": "Sao bây giờ họ lại muốn đi mua giày?",
       "py": "Tāmen wèishénme xiànzài yào qù mǎi xiézi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhân quả với 因為……所以……",
   "giaiThich": "Hai mệnh đề nối thành câu nhân quả: 因為 nêu NGUYÊN NHÂN (đứng trước), 所以 nêu KẾT QUẢ (đứng sau)."
  },
  {
   "title": "I. Expressing Supposition with 吧",
   "points": [
    {
     "label": null,
     "formula": "This 吧 expresses that the speaker has an assumption, but asks for confirmation. Nǐ xiànzài yǒukòng ba? Yào bú yào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài? Complete the following dialogues.",
     "examples": [
      {
       "hz": "A:你會唱中文歌吧？",
       "vi": "A: Bạn biết hát bài hát tiếng Trung chứ?",
       "py": "A: Nǐ huì chàng zhōngwén gē ba?"
      },
      {
       "hz": "B:會。可是不多，我只會唱三首。",
       "vi": "B: Biết. Nhưng không nhiều, tôi chỉ biết hát ba bài.",
       "py": "B: Huì. Kěshì bù duō, wǒ zhǐ huì chàng sānshǒu."
      },
      {
       "hz": "你還要買鞋子",
       "vi": "Bạn còn muốn mua giày nữa",
       "py": "Nǐ háiyào mǎi xiézi"
      },
      {
       "hz": "A:你現在有空吧？要不要跟我一起去看網球比賽？",
       "vi": "A: Bây giờ bạn rảnh chứ? Có muốn đi xem trận quần vợt với tôi không?",
       "py": "A: Nǐ xiànzài yǒukòng ba? Yào búyào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài?"
      },
      {
       "hz": "B:有空，可是我想先吃一點兒東西。",
       "vi": "B: Rảnh, nhưng tôi muốn ăn chút gì đó trước đã.",
       "py": "B: Yǒukòng, kěshì wǒ xiǎng xiān chī yìdiǎn'ér dōngxī."
      },
      {
       "hz": "A:他平常都坐捷運來上課吧？",
       "vi": "A: Bình thường anh ấy đều đi tàu điện ngầm đến lớp nhỉ?",
       "py": "A: Tā píngcháng dōu zuò jiéyùn lái shàngkè ba?"
      },
      {
       "hz": "B:不是，他都坐公車來上課。",
       "vi": "B: Không, anh ấy toàn đi xe buýt đến lớp.",
       "py": "B: Búshì, tā dōu zuògōngchē lái shàngkè."
      },
      {
       "hz": "B:喜歡，我每天早上都一定要喝。",
       "vi": "B: Thích chứ, sáng nào tôi cũng nhất định phải uống.",
       "py": "B: Xǐhuān, wǒ měitiān zǎoshàng dōu yídìng yào hē."
      },
      {
       "hz": "B:是啊，他是韓國人。",
       "vi": "B: Đúng vậy, anh ấy là người Hàn Quốc.",
       "py": "B: Shì a, tā shì Hánguó rén."
      },
      {
       "hz": "B:不會，可是我會打網球。",
       "vi": "B: Không biết, nhưng tôi biết chơi quần vợt.",
       "py": "B: Búhuì, kěshì wǒhuì dǎwǎngqiú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "吧 diễn đạt phỏng đoán",
   "giaiThich": "吧 ở cuối câu khi người nói đã đoán sẵn điều gì đó và muốn hỏi lại cho chắc (\"… phải không?\")."
  },
  {
   "title": "II. VV 看 (to try and see)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, a mono-syllable action verb is reduplicated and a cognitive verb 看 is placed at the end. Complete the following dialogues. Cóng Táiběi huǒchēzhàn dào Táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn.",
     "examples": [
      {
       "hz": "A:我不知道要買哪種甜點。",
       "vi": "A: Tôi không biết nên mua loại bánh ngọt nào.",
       "py": "A: Wǒ bù zhīdào yào mǎi nǎ zhǒng tiándiǎn."
      },
      {
       "hz": "B:你可以先吃吃看。",
       "vi": "B: Bạn có thể ăn thử trước xem.",
       "py": "B: Nǐ kěyǐ xiān chī chī kàn."
      },
      {
       "hz": "A:我的錢包在你那裡嗎？",
       "vi": "A: Ví tiền của tôi có ở chỗ bạn không?",
       "py": "A: Wǒ de qiánbāo zài nǐ nàlǐ ma?"
      },
      {
       "hz": "B:不在我這裡，你去客廳找找看。",
       "vi": "B: Không ở chỗ tôi, bạn ra phòng khách tìm thử xem.",
       "py": "B: Bú zài wǒ zhèlǐ, nǐ qù kètīng zhǎozhǎokàn."
      },
      {
       "hz": "A:聽說這裡的咖啡很好喝。",
       "vi": "A: Nghe nói cà phê ở đây rất ngon.",
       "py": "A: Tīngshuō zhèlǐ de kāfēi hěn hǎohē."
      },
      {
       "hz": "B:好，我喝喝看。",
       "vi": "B: Được, để tôi uống thử xem.",
       "py": "B: Hǎo, wǒ hēhē kàn."
      },
      {
       "hz": "A:從台北火車站到桃園機場，坐捷運又快又方便。",
       "vi": "A: Từ ga tàu Đài Bắc đến sân bay Đào Viên, đi tàu điện ngầm vừa nhanh vừa tiện.",
       "py": "A: Cóng Táiběi huǒchēzhàn dào táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn."
      },
      {
       "hz": "A:我不想等他了，我們先去餐廳吧。",
       "vi": "A: Tôi không muốn đợi anh ấy nữa, chúng ta đến nhà hàng trước đi.",
       "py": "A: Wǒ bùxiǎng děng tā le, wǒmen xiān qù cāntīng ba."
      },
      {
       "hz": "A:他們都不太喜歡這首歌，你呢？",
       "vi": "A: Họ đều không thích bài hát này lắm, còn bạn?",
       "py": "A: Tāmen dōu bú tài xǐhuān zhè shǒugē, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "VV 看 — thử làm xem sao",
   "giaiThich": "Lặp lại động từ đơn âm rồi thêm 看 ở cuối, nghĩa \"thử … xem\" (試試看, 看看)."
  },
  {
   "title": "III. 快(要)/要…了 (to be about to)",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates that the action following 快 (要)/要 is about to happen. 了 is always used at the end of the sentence.",
     "examples": [
      {
       "hz": "火車快要來了。",
       "vi": "Tàu hoả sắp đến rồi.",
       "py": "Huǒchē kuàiyào lái le."
      },
      {
       "hz": "現在八點五十分了，圖書館快開了。",
       "vi": "Bây giờ là tám giờ năm mươi rồi, thư viện sắp mở cửa rồi.",
       "py": "Xiànzài bādiǎn wǔ shífēn le, túshūguǎn kuài kāi le."
      },
      {
       "hz": "十月了，冬天快要到了。",
       "vi": "Tháng Mười rồi, mùa đông sắp đến rồi.",
       "py": "Shíyuè le, dōngtiān kuàiyào dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "快(要)/要……了 — sắp sửa",
   "giaiThich": "Diễn đạt hành động SẮP xảy ra; cuối câu luôn có 了."
  }
 ],
 "td1-8.4": [
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這家餐廳的牛肉麵很好吃，我常吃。",
       "vi": "Mì bò của nhà hàng này rất ngon, tôi hay ăn.",
       "py": "Zhèjiā cāntīng de niúròumiàn hěn hǎochī, wǒ cháng chī."
      },
      {
       "hz": "這杯茶有點兒難喝，我不要喝。",
       "vi": "Cốc trà này hơi khó uống, tôi không uống đâu.",
       "py": "Zhè bēi chá yǒudiǎn'ér nán hē, wǒ búyào hē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "Nǐ chànggē chàng de hěn hǎotīng, xiànzài chàng yì shǒu, hǎo ma? (1) Something is good or bad to do (perception verbs).",
     "examples": [
      {
       "hz": "這件衣服的顏色很好看，我很喜歡。",
       "vi": "Màu của bộ quần áo này rất đẹp, tôi rất thích.",
       "py": "Zhèjiàn yīfú de yánsè hěn hǎokàn, wǒ hěn xǐhuān."
      },
      {
       "hz": "你唱歌唱得很好聽，現在唱一首，好嗎？",
       "vi": "Bạn hát hay lắm, bây giờ hát một bài nhé?",
       "py": "Nǐ chàng gēchàng de hěn hǎotīng, xiànzài chàng yìshǒu, hǎo ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Zhè shǒu Zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng.",
     "examples": [
      {
       "hz": "這首中文歌很好唱，我朋友都會唱。",
       "vi": "Bài hát tiếng Trung này rất dễ hát, bạn bè tôi ai cũng biết hát.",
       "py": "Zhè shǒu zhōngwén gē hěn hǎo chàng, wǒ péngyǒu dōu huì chàng."
      },
      {
       "hz": "弟弟不喜歡說英文，他覺得英文很難學。",
       "vi": "Em trai không thích nói tiếng Anh, cậu ấy thấy tiếng Anh rất khó học.",
       "py": "Dìdi bù xǐhuān shuō yīngwén, tā juéde yīngwén hěn nán xué."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "I. 好/難 as Adverbial Prefixes",
   "points": [
    {
     "label": null,
     "formula": "(2) Something is easy or difficult to do (action verbs). Use 好 or 難 with perception verbs or action verbs to complete the following sentences.",
     "examples": [
      {
       "hz": "這裡附近只有一家百貨公司，很好找。",
       "vi": "Gần đây chỉ có một trung tâm thương mại, rất dễ tìm.",
       "py": "Zhèlǐ fùjìn zhǐyǒu yìjiā bǎihuògōngsī, hěn hǎozhǎo."
      },
      {
       "hz": "這輛腳踏車太小了，很難騎。",
       "vi": "Chiếc xe đạp này nhỏ quá, rất khó đi.",
       "py": "Zhèliàng jiǎotàchē tàixiǎo le, hěn nán qí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "好 / 難 làm tiền tố",
   "giaiThich": "好 + động từ = dễ chịu, đáng làm (好吃, 好看); 難 + động từ = khó chịu, khó làm (難吃, 難看). Thường ghép với động từ tri giác."
  },
  {
   "title": "II. Cause and Effect with 因為……所以……",
   "points": [
    {
     "label": null,
     "formula": "Yīnwèi zhè ge páizi hěn yǒumíng, yīfu yě hěn hǎokàn, suǒyǐ hěn duō rén xǐhuān. In this pattern, two clauses are connected in one cause-effect sentence. The clause with 因為 usually comes first to state the reason , followed by the other one with 所以 to state the result. Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bù xiǎng zǒulù dào xuéxiào qù. Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrì lǐwù. Complete the following dialogues. Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shài tàiyáng, suǒyǐ xiǎng qù hǎibiān wán.",
     "examples": [
      {
       "hz": "因為這個牌子很有名，衣服也很好看，所以很多人喜歡。",
       "vi": "Vì nhãn hiệu này rất nổi tiếng, quần áo cũng rất đẹp, nên nhiều người thích.",
       "py": "Yīnwèi zhège páizi hěn yǒumíng, yīfú yě hěn hǎokàn, suǒyǐ hěnduō rén xǐhuān."
      },
      {
       "hz": "A:為什麼你的朋友不跟你來？",
       "vi": "A: Sao bạn của bạn không đi cùng bạn?",
       "py": "A: Wèishénme nǐ de péngyǒu bù gēn nǐ lái?"
      },
      {
       "hz": "B:因為他很累，所以他要在家休息。",
       "vi": "B: Vì cậu ấy rất mệt, nên cậu ấy muốn ở nhà nghỉ ngơi.",
       "py": "B: Yīnwèi tā hěn lèi, suǒyǐ tā yào zàijiā xiūxí."
      },
      {
       "hz": "A:你為什麼不想走路到學校去？",
       "vi": "A: Sao bạn không muốn đi bộ đến trường?",
       "py": "A: Nǐ wèishénme bùxiǎng zǒulù dào xuéxiào qù?"
      },
      {
       "hz": "B:因為學校很遠，所以我不想走路到學校去。",
       "vi": "B: Vì trường rất xa, nên tôi không muốn đi bộ đến trường.",
       "py": "B: Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bùxiǎng zǒulù dào xuéxiào qù."
      },
      {
       "hz": "A:你為什麼今天一定要去百貨公司？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi trung tâm thương mại?",
       "py": "A: Nǐ wèishénme jīntiān yídìng yào qù bǎihuògōngsī?"
      },
      {
       "hz": "B:因為明天是我弟弟的生日，所以我要去買他的生日禮物。",
       "vi": "B: Vì ngày mai là sinh nhật em trai tôi, nên tôi phải đi mua quà sinh nhật cho em.",
       "py": "B: Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrìlǐwù."
      },
      {
       "hz": "A：他為什麼常常穿綠色的衣服？",
       "vi": "A: Sao anh ấy hay mặc quần áo màu xanh lá?",
       "py": "A: Tā wèishénme chángcháng chuān lǜsè de yīfú?"
      },
      {
       "hz": "B：因為我想游泳，也想曬太陽，所以想去海邊玩。",
       "vi": "B: Vì tôi muốn bơi, cũng muốn tắm nắng, nên muốn đi biển chơi.",
       "py": "B: Yīnwèi wǒ xiǎng yóuyǒng, yě xiǎng shàitàiyáng, suǒyǐ xiǎng qù hǎibiān wán."
      },
      {
       "hz": "A：你為什麼想學中文？",
       "vi": "A: Sao bạn muốn học tiếng Trung?",
       "py": "A: Nǐ wèishénme xiǎng xué zhōngwén?"
      },
      {
       "hz": "什麼顏色是今年流行的顏色？",
       "vi": "Màu nào là màu thịnh hành năm nay?",
       "py": "Shénme yánsè shì jīnnián liúxíng de yánsè?"
      },
      {
       "hz": "宜文覺得褲子怎麼樣？",
       "vi": "Nghi Văn thấy chiếc quần thế nào?",
       "py": "Yíwén juéde kùzi zěnmeyàng?"
      },
      {
       "hz": "她們為什麼現在要去買鞋子？",
       "vi": "Sao bây giờ họ lại muốn đi mua giày?",
       "py": "Tāmen wèishénme xiànzài yào qù mǎi xiézi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhân quả với 因為……所以……",
   "giaiThich": "Hai mệnh đề nối thành câu nhân quả: 因為 nêu NGUYÊN NHÂN (đứng trước), 所以 nêu KẾT QUẢ (đứng sau)."
  },
  {
   "title": "I. Expressing Supposition with 吧",
   "points": [
    {
     "label": null,
     "formula": "This 吧 expresses that the speaker has an assumption, but asks for confirmation. Nǐ xiànzài yǒukòng ba? Yào bú yào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài? Complete the following dialogues.",
     "examples": [
      {
       "hz": "A:你會唱中文歌吧？",
       "vi": "A: Bạn biết hát bài hát tiếng Trung chứ?",
       "py": "A: Nǐ huì chàng zhōngwén gē ba?"
      },
      {
       "hz": "B:會。可是不多，我只會唱三首。",
       "vi": "B: Biết. Nhưng không nhiều, tôi chỉ biết hát ba bài.",
       "py": "B: Huì. Kěshì bù duō, wǒ zhǐ huì chàng sānshǒu."
      },
      {
       "hz": "你還要買鞋子",
       "vi": "Bạn còn muốn mua giày nữa",
       "py": "Nǐ háiyào mǎi xiézi"
      },
      {
       "hz": "A:你現在有空吧？要不要跟我一起去看網球比賽？",
       "vi": "A: Bây giờ bạn rảnh chứ? Có muốn đi xem trận quần vợt với tôi không?",
       "py": "A: Nǐ xiànzài yǒukòng ba? Yào búyào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài?"
      },
      {
       "hz": "B:有空，可是我想先吃一點兒東西。",
       "vi": "B: Rảnh, nhưng tôi muốn ăn chút gì đó trước đã.",
       "py": "B: Yǒukòng, kěshì wǒ xiǎng xiān chī yìdiǎn'ér dōngxī."
      },
      {
       "hz": "A:他平常都坐捷運來上課吧？",
       "vi": "A: Bình thường anh ấy đều đi tàu điện ngầm đến lớp nhỉ?",
       "py": "A: Tā píngcháng dōu zuò jiéyùn lái shàngkè ba?"
      },
      {
       "hz": "B:不是，他都坐公車來上課。",
       "vi": "B: Không, anh ấy toàn đi xe buýt đến lớp.",
       "py": "B: Búshì, tā dōu zuògōngchē lái shàngkè."
      },
      {
       "hz": "B:喜歡，我每天早上都一定要喝。",
       "vi": "B: Thích chứ, sáng nào tôi cũng nhất định phải uống.",
       "py": "B: Xǐhuān, wǒ měitiān zǎoshàng dōu yídìng yào hē."
      },
      {
       "hz": "B:是啊，他是韓國人。",
       "vi": "B: Đúng vậy, anh ấy là người Hàn Quốc.",
       "py": "B: Shì a, tā shì Hánguó rén."
      },
      {
       "hz": "B:不會，可是我會打網球。",
       "vi": "B: Không biết, nhưng tôi biết chơi quần vợt.",
       "py": "B: Búhuì, kěshì wǒhuì dǎwǎngqiú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "吧 diễn đạt phỏng đoán",
   "giaiThich": "吧 ở cuối câu khi người nói đã đoán sẵn điều gì đó và muốn hỏi lại cho chắc (\"… phải không?\")."
  },
  {
   "title": "II. VV 看 (to try and see)",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, a mono-syllable action verb is reduplicated and a cognitive verb 看 is placed at the end. Complete the following dialogues. Cóng Táiběi huǒchēzhàn dào Táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn.",
     "examples": [
      {
       "hz": "A:我不知道要買哪種甜點。",
       "vi": "A: Tôi không biết nên mua loại bánh ngọt nào.",
       "py": "A: Wǒ bù zhīdào yào mǎi nǎ zhǒng tiándiǎn."
      },
      {
       "hz": "B:你可以先吃吃看。",
       "vi": "B: Bạn có thể ăn thử trước xem.",
       "py": "B: Nǐ kěyǐ xiān chī chī kàn."
      },
      {
       "hz": "A:我的錢包在你那裡嗎？",
       "vi": "A: Ví tiền của tôi có ở chỗ bạn không?",
       "py": "A: Wǒ de qiánbāo zài nǐ nàlǐ ma?"
      },
      {
       "hz": "B:不在我這裡，你去客廳找找看。",
       "vi": "B: Không ở chỗ tôi, bạn ra phòng khách tìm thử xem.",
       "py": "B: Bú zài wǒ zhèlǐ, nǐ qù kètīng zhǎozhǎokàn."
      },
      {
       "hz": "A:聽說這裡的咖啡很好喝。",
       "vi": "A: Nghe nói cà phê ở đây rất ngon.",
       "py": "A: Tīngshuō zhèlǐ de kāfēi hěn hǎohē."
      },
      {
       "hz": "B:好，我喝喝看。",
       "vi": "B: Được, để tôi uống thử xem.",
       "py": "B: Hǎo, wǒ hēhē kàn."
      },
      {
       "hz": "A:從台北火車站到桃園機場，坐捷運又快又方便。",
       "vi": "A: Từ ga tàu Đài Bắc đến sân bay Đào Viên, đi tàu điện ngầm vừa nhanh vừa tiện.",
       "py": "A: Cóng Táiběi huǒchēzhàn dào táoyuán jīchǎng, zuò jiéyùn yòu kuài yòu fāngbiàn."
      },
      {
       "hz": "A:我不想等他了，我們先去餐廳吧。",
       "vi": "A: Tôi không muốn đợi anh ấy nữa, chúng ta đến nhà hàng trước đi.",
       "py": "A: Wǒ bùxiǎng děng tā le, wǒmen xiān qù cāntīng ba."
      },
      {
       "hz": "A:他們都不太喜歡這首歌，你呢？",
       "vi": "A: Họ đều không thích bài hát này lắm, còn bạn?",
       "py": "A: Tāmen dōu bú tài xǐhuān zhè shǒugē, nǐ ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "VV 看 — thử làm xem sao",
   "giaiThich": "Lặp lại động từ đơn âm rồi thêm 看 ở cuối, nghĩa \"thử … xem\" (試試看, 看看)."
  },
  {
   "title": "III. 快(要)/要…了 (to be about to)",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates that the action following 快 (要)/要 is about to happen. 了 is always used at the end of the sentence.",
     "examples": [
      {
       "hz": "火車快要來了。",
       "vi": "Tàu hoả sắp đến rồi.",
       "py": "Huǒchē kuàiyào lái le."
      },
      {
       "hz": "現在八點五十分了，圖書館快開了。",
       "vi": "Bây giờ là tám giờ năm mươi rồi, thư viện sắp mở cửa rồi.",
       "py": "Xiànzài bādiǎn wǔ shífēn le, túshūguǎn kuài kāi le."
      },
      {
       "hz": "十月了，冬天快要到了。",
       "vi": "Tháng Mười rồi, mùa đông sắp đến rồi.",
       "py": "Shíyuè le, dōngtiān kuàiyào dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "快(要)/要……了 — sắp sửa",
   "giaiThich": "Diễn đạt hành động SẮP xảy ra; cuối câu luôn có 了."
  }
 ],
 "td1-9.1": [
  {
   "title": "I. “在 V” Indicating Ongoing Actions",
   "points": [
    {
     "label": null,
     "formula": "“在 V” indicates the progressive aspect of an action.",
     "examples": [
      {
       "hz": "A：你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B：我在做功課。",
       "vi": "B: Tôi đang làm bài tập.",
       "py": "B: Wǒ zài zuò gōngkè."
      },
      {
       "hz": "A：你哥哥在做什麼？",
       "vi": "A: Anh trai bạn đang làm gì?",
       "py": "A: Nǐ gēge zài zuò shénme?"
      },
      {
       "hz": "B：他在運動。",
       "vi": "B: Anh ấy đang tập thể thao.",
       "py": "B: Tā zài yùndòng."
      },
      {
       "hz": "A：他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B：他們在騎腳踏車。",
       "vi": "B: Họ đang đạp xe.",
       "py": "B: Tāmen zài qí jiǎotàchē."
      },
      {
       "hz": "A:他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B:他們在跳日本舞。",
       "vi": "B: Họ đang múa điệu múa Nhật Bản.",
       "py": "B: Tāmen zài tiào Rìběn wǔ."
      },
      {
       "hz": "A:這個孩子在做什麼？",
       "vi": "A: Đứa bé này đang làm gì?",
       "py": "A: Zhège háizi zài zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 + V — hành động đang diễn ra",
   "giaiThich": "在 đặt trước động từ để nói hành động đang tiếp diễn."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": "Jīntiān wǒ cóng zǎoshàng jiǔ diǎn dào xiàwǔ wǔ diǎn dōu yǒu kè. Indicating “from…to…”, 從……到……can be used for a temporal duration of time.",
     "examples": [
      {
       "hz": "A：你今天幾點有課？",
       "vi": "A: Hôm nay mấy giờ bạn có tiết học?",
       "py": "A: Nǐ jīntiān jǐdiǎn yǒu kè?"
      },
      {
       "hz": "B：今天我從早上九點到下午五點都有課。",
       "vi": "B: Hôm nay từ chín giờ sáng đến năm giờ chiều tôi đều có tiết.",
       "py": "B: Jīntiān wǒ cóng zǎoshàng jiǔdiǎn dào xiàwǔ wǔdiǎn dōu yǒu kè."
      },
      {
       "hz": "這裡的春天是從二月到四月。",
       "vi": "Mùa xuân ở đây là từ tháng Hai đến tháng Tư.",
       "py": "Zhèlǐ de chūntiān shìcóng èryuè dào sìyuè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：我明天要跟國安去吃飯，你要一起去嗎？",
       "vi": "A: Ngày mai tôi sẽ đi ăn với Quốc An, bạn có muốn đi cùng không?",
       "py": "A: Wǒ míngtiān yào gēn Guó'ān qù chīfàn, nǐ yào yìqǐ qù ma?"
      },
      {
       "hz": "B：我明天從早上到晚上都沒有空，後天可以嗎？",
       "vi": "B: Ngày mai từ sáng đến tối tôi đều bận, ngày kia được không?",
       "py": "B: Wǒ míngtiān cóng zǎoshàng dào wǎnshàng dōu méiyǒu kōng, hòutiān kěyǐ ma?"
      },
      {
       "hz": "A：這家餐廳哪天要休息？",
       "vi": "A: Nhà hàng này nghỉ vào ngày nào?",
       "py": "A: Zhèjiā cāntīng nǎ tiān yào xiūxí?"
      },
      {
       "hz": "A：棒球比賽的時間是從幾點到幾點？",
       "vi": "A: Trận bóng chày diễn ra từ mấy giờ đến mấy giờ?",
       "py": "A: Bàngqiú bǐsài de shíjiān shìcóng jǐdiǎn dào jǐdiǎn?"
      },
      {
       "hz": "A：他從2013年到2017年都在法國學畫畫嗎？",
       "vi": "A: Từ năm 2013 đến năm 2017 anh ấy đều học vẽ ở Pháp à?",
       "py": "A: Tā cóng 2013 nián dào 2017 nián dōu zài Fǎguó xué huàhuà ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "III. 先……再…… (First…, then…)",
   "points": [
    {
     "label": null,
     "formula": "先……再……is a pattern used for sequencing events, much like “First …, then…”. If the subjects are the same, then omit the second one. Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxi, zài qù péngyǒu jiā.",
     "examples": [
      {
       "hz": "A：你們兩個人，誰先說？",
       "vi": "A: Hai bạn, ai nói trước?",
       "py": "A: Nǐmen liǎnggè rén, shéi xiān shuō?"
      },
      {
       "hz": "B：他先說，我再說。",
       "vi": "B: Anh ấy nói trước, tôi nói sau.",
       "py": "B: Tā xiān shuō, wǒ zàishuō."
      },
      {
       "hz": "A：你明天想要做什麼？",
       "vi": "A: Ngày mai bạn muốn làm gì?",
       "py": "A: Nǐ míngtiān xiǎngyào zuò shénme?"
      },
      {
       "hz": "B：我想先去百貨公司買東西，再去朋友家。",
       "vi": "B: Tôi muốn đi trung tâm thương mại mua đồ trước, rồi đến nhà bạn.",
       "py": "B: Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxī, zài qù péngyǒujiā."
      },
      {
       "hz": "A：我要怎麼到那家飯店？",
       "vi": "A: Tôi đến khách sạn đó bằng cách nào?",
       "py": "A: Wǒ yào zěnme dào nà jiā fàndiàn?"
      },
      {
       "hz": "B：你要先坐捷運，再坐公車。",
       "vi": "B: Bạn đi tàu điện ngầm trước, rồi đi xe buýt.",
       "py": "B: Nǐ yào xiān zuò jiéyùn, zài zuògōngchē."
      },
      {
       "hz": "A：你明天下午要上什麼課？",
       "vi": "A: Chiều mai bạn học môn gì?",
       "py": "A: Nǐ míngtiān xiàwǔ yào shàng shénme kè?"
      },
      {
       "hz": "A：你們週末想去哪裡？",
       "vi": "A: Cuối tuần các bạn muốn đi đâu?",
       "py": "A: Nǐmen zhōumò xiǎng qù nǎlǐ?"
      },
      {
       "hz": "A：你不去吃晚飯嗎？",
       "vi": "A: Bạn không đi ăn tối à?",
       "py": "A: Nǐ bú qù chīwǎnfàn ma?"
      },
      {
       "hz": "為什麼他們要看書？",
       "vi": "Tại sao họ phải đọc sách?",
       "py": "Wèishénme tāmen yào kànshū?"
      },
      {
       "hz": "他們想在哪裡看書？",
       "vi": "Họ muốn đọc sách ở đâu?",
       "py": "Tāmen xiǎng zài nǎlǐ kànshū?"
      },
      {
       "hz": "家樂為什麼不能去看書？",
       "vi": "Tại sao Gia Lạc không thể đi đọc sách?",
       "py": "Jiālè wèishénme bùnéng qù kànshū?"
      },
      {
       "hz": "他們想要怎麼做？",
       "vi": "Họ định làm thế nào?",
       "py": "Tāmen xiǎngyào zěnme zuò?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "先……再…… — trước… rồi…",
   "giaiThich": "Nêu thứ tự việc làm: việc trước dùng 先, việc sau dùng 再. Nếu cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  },
  {
   "title": "I. Vaux 能",
   "points": [
    {
     "label": null,
     "formula": "When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bù néng kàn shǒujī. When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. (3) 能 (possibility due to objective factors) 能 can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Tā bù néng lái, yīnwèi tā nǚ péngyǒu de māma yào qǐng tā chīfàn. (3) 能 (possibility due to objective factors) 能can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba.",
     "examples": [
      {
       "hz": "鳥能飛，人不能飛。",
       "vi": "Chim biết bay, người không bay được.",
       "py": "Niǎo néng fēi, rén bùnéng fēi."
      },
      {
       "hz": "他現在只能走，不能跑。",
       "vi": "Bây giờ anh ấy chỉ đi được, không chạy được.",
       "py": "Tā xiànzài zhǐnéng zǒu, bùnéng pǎo."
      },
      {
       "hz": "我不能喝太多咖啡，因為不能睡覺。",
       "vi": "Tôi không thể uống quá nhiều cà phê, vì sẽ không ngủ được.",
       "py": "Wǒ bùnéng hē tài duō kāfēi, yīnwèi bùnéng shuìjiào."
      },
      {
       "hz": "A:他現在能說話嗎？",
       "vi": "A: Bây giờ anh ấy nói chuyện được chưa?",
       "py": "A: Tā xiànzài néng shuōhuà ma?"
      },
      {
       "hz": "A:他現在能打球嗎？",
       "vi": "A: Bây giờ anh ấy chơi bóng được không?",
       "py": "A: Tā xiànzài néng dǎqiú ma?"
      },
      {
       "hz": "A:你一天能喝多少咖啡？",
       "vi": "A: Một ngày bạn uống được bao nhiêu cà phê?",
       "py": "A: Nǐ yìtiān néng hē duōshǎo kāfēi?"
      },
      {
       "hz": "現在是上課時間，老師說我們不能看手機。",
       "vi": "Bây giờ là giờ học, thầy giáo nói chúng ta không được xem điện thoại.",
       "py": "Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bùnéng kàn shǒujī."
      },
      {
       "hz": "A：在捷運上能吃東西嗎？",
       "vi": "A: Trên tàu điện ngầm có được ăn không?",
       "py": "A: Zài jiéyùn shàng néng chī dōngxī ma?"
      },
      {
       "hz": "B：不可以吃東西。",
       "vi": "B: Không được ăn.",
       "py": "B: Bù kěyǐ chī dōngxī."
      },
      {
       "hz": "A：我能在這裡用電腦嗎？",
       "vi": "A: Tôi dùng máy tính ở đây được không?",
       "py": "A: Wǒ néng zài zhèlǐ yòng diànnǎo ma?"
      },
      {
       "hz": "B：可以，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Kěyǐ, méi wèntí."
      },
      {
       "hz": "A：我能不能開妳的車？",
       "vi": "A: Tôi lái xe của bạn được không?",
       "py": "A: Wǒ néng bùnéng kāi nǐ de chē?"
      },
      {
       "hz": "A：在圖書館裡我們能不能說話？",
       "vi": "A: Trong thư viện chúng ta có được nói chuyện không?",
       "py": "A: Zài túshūguǎn lǐ wǒmen néng bùnéng shuōhuà?"
      },
      {
       "hz": "A：為什麼我們不能在樓上跳舞？",
       "vi": "A: Tại sao chúng ta không được nhảy ở tầng trên?",
       "py": "A: Wèishénme wǒmen bùnéng zài lóushàng tiàowǔ?"
      },
      {
       "hz": "今天我有中文課，不能跟你們去玩。",
       "vi": "Hôm nay tôi có tiết tiếng Trung, không đi chơi với các bạn được.",
       "py": "Jīntiān wǒ yǒu zhōngwén kè, bùnéng gēn nǐmen qù wán."
      },
      {
       "hz": "A：那個地方很遠，我們十點鐘能到嗎？",
       "vi": "A: Chỗ đó rất xa, mười giờ chúng ta đến kịp không?",
       "py": "A: Nàge dìfāng hěn yuǎn, wǒmen shídiǎnzhōng néng dào ma?"
      },
      {
       "hz": "B：沒問題，坐捷運很快。",
       "vi": "B: Không vấn đề gì, đi tàu điện ngầm nhanh lắm.",
       "py": "B: Méi wèntí, zuò jiéyùn hěnkuài."
      },
      {
       "hz": "A:明天他能來嗎？",
       "vi": "A: Ngày mai anh ấy đến được không?",
       "py": "A: Míngtiān tā néng lái ma?"
      },
      {
       "hz": "B:他不能來，因為他女朋友的媽媽要請他吃飯。",
       "vi": "B: Anh ấy không đến được, vì mẹ bạn gái anh ấy mời anh ấy ăn cơm.",
       "py": "B: Tā bùnéng lái, yīnwèi tā nǚpéngyǒu de māma yào qǐng tā chīfàn."
      },
      {
       "hz": "A：今天晚上你要不要跟我去百貨公司？",
       "vi": "A: Tối nay bạn có muốn đi trung tâm thương mại với tôi không?",
       "py": "A: Jīntiān wǎnshàng nǐ yào búyào gēn wǒ qù bǎihuògōngsī?"
      },
      {
       "hz": "A：上課時間快到了，你坐計程車到學校去吧。",
       "vi": "A: Sắp đến giờ học rồi, bạn đi taxi đến trường đi.",
       "py": "A: Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba."
      },
      {
       "hz": "B：好，沒問題，我明天幫你寄。",
       "vi": "B: Được, không vấn đề gì, ngày mai tôi gửi giúp bạn.",
       "py": "B: Hǎo, méi wèntí, wǒ míngtiān bāng nǐ jì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 能",
   "giaiThich": "能 diễn đạt khả năng hoặc sự cho phép; khi nói về cho phép thì thay được bằng 可以. Hay gặp ở câu hỏi và câu phủ định."
  },
  {
   "title": "II. Implicit Comparison with 比較",
   "points": [
    {
     "label": null,
     "formula": "比較 is used to express implicit comparison. If both subjects are known from the context, we can  just use the “比較Vs” pattern. Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiān wǎnshàng tā zuò shénme?",
     "examples": [
      {
       "hz": "A：誰比較瘦？",
       "vi": "A: Ai gầy hơn?",
       "py": "A: Shéi bǐjiào shòu?"
      },
      {
       "hz": "B：姊姊比較瘦，妹妹比較胖。",
       "vi": "B: Chị gầy hơn, em béo hơn.",
       "py": "B: Jiějie bǐjiào shòu, mèimei bǐjiào pàng."
      },
      {
       "hz": "A：你們兩個人，誰唱歌唱得比較好聽？",
       "vi": "A: Hai bạn, ai hát hay hơn?",
       "py": "A: Nǐmen liǎnggè rén, shéi chàng gēchàng de bǐjiào hǎotīng?"
      },
      {
       "hz": "B：我覺得他唱得比較好聽。",
       "vi": "B: Tôi thấy anh ấy hát hay hơn.",
       "py": "B: Wǒ juéde tā chàng de bǐjiào hǎotīng."
      },
      {
       "hz": "A：坐飛機比較舒服，還是坐車比較舒服？",
       "vi": "A: Đi máy bay thoải mái hơn hay đi xe thoải mái hơn?",
       "py": "A: Zuòfēijī bǐjiào shūfú, háishì zuòchē bǐjiào shūfú?"
      },
      {
       "hz": "B：我覺得坐飛機比較舒服。",
       "vi": "B: Tôi thấy đi máy bay thoải mái hơn.",
       "py": "B: Wǒ juéde zuòfēijī bǐjiào shūfú."
      },
      {
       "hz": "A：你覺得誰跳舞跳得比較好？",
       "vi": "A: Bạn thấy ai nhảy giỏi hơn?",
       "py": "A: Nǐ juéde shéi tiàowǔ tiào de bǐjiào hǎo?"
      },
      {
       "hz": "A：你覺得哪件衣服比較好看？",
       "vi": "A: Bạn thấy bộ quần áo nào đẹp hơn?",
       "py": "A: Nǐ juéde nǎ jiàn yīfú bǐjiào hǎokàn?"
      },
      {
       "hz": "A：國安的房間大，還是中明的房間大？",
       "vi": "A: Phòng của Quốc An lớn hay phòng của Trung Minh lớn?",
       "py": "A: Guó'ān de fángjiān dà, háishì Zhōngmíng de fángjiān dà?"
      },
      {
       "hz": "這學期開始，他早上做什麼？",
       "vi": "Từ đầu học kỳ này, buổi sáng anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā zǎoshàng zuò shénme?"
      },
      {
       "hz": "這學期開始，他下午做什麼？",
       "vi": "Từ đầu học kỳ này, buổi chiều anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā xiàwǔ zuò shénme?"
      },
      {
       "hz": "為什麼他的中文進步了？",
       "vi": "Tại sao tiếng Trung của anh ấy tiến bộ?",
       "py": "Wèishénme tā de zhōngwén jìnbù le?"
      },
      {
       "hz": "因為期中考快要到了，所以每天晚上他做什麼？",
       "vi": "Vì sắp thi giữa kỳ, nên tối nào anh ấy cũng làm gì?",
       "py": "Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiānwǎnshàng tā zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "So sánh ngầm với 比較",
   "giaiThich": "比較 dùng khi so sánh mà không nêu rõ đối tượng kia; nếu ngữ cảnh đã rõ cả hai bên thì chỉ cần \"比較 + tính từ\"."
  }
 ],
 "td1-9.2": [
  {
   "title": "I. “在 V” Indicating Ongoing Actions",
   "points": [
    {
     "label": null,
     "formula": "“在 V” indicates the progressive aspect of an action.",
     "examples": [
      {
       "hz": "A：你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B：我在做功課。",
       "vi": "B: Tôi đang làm bài tập.",
       "py": "B: Wǒ zài zuò gōngkè."
      },
      {
       "hz": "A：你哥哥在做什麼？",
       "vi": "A: Anh trai bạn đang làm gì?",
       "py": "A: Nǐ gēge zài zuò shénme?"
      },
      {
       "hz": "B：他在運動。",
       "vi": "B: Anh ấy đang tập thể thao.",
       "py": "B: Tā zài yùndòng."
      },
      {
       "hz": "A：他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B：他們在騎腳踏車。",
       "vi": "B: Họ đang đạp xe.",
       "py": "B: Tāmen zài qí jiǎotàchē."
      },
      {
       "hz": "A:他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B:他們在跳日本舞。",
       "vi": "B: Họ đang múa điệu múa Nhật Bản.",
       "py": "B: Tāmen zài tiào Rìběn wǔ."
      },
      {
       "hz": "A:這個孩子在做什麼？",
       "vi": "A: Đứa bé này đang làm gì?",
       "py": "A: Zhège háizi zài zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 + V — hành động đang diễn ra",
   "giaiThich": "在 đặt trước động từ để nói hành động đang tiếp diễn."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": "Jīntiān wǒ cóng zǎoshàng jiǔ diǎn dào xiàwǔ wǔ diǎn dōu yǒu kè. Indicating “from…to…”, 從……到……can be used for a temporal duration of time.",
     "examples": [
      {
       "hz": "A：你今天幾點有課？",
       "vi": "A: Hôm nay mấy giờ bạn có tiết học?",
       "py": "A: Nǐ jīntiān jǐdiǎn yǒu kè?"
      },
      {
       "hz": "B：今天我從早上九點到下午五點都有課。",
       "vi": "B: Hôm nay từ chín giờ sáng đến năm giờ chiều tôi đều có tiết.",
       "py": "B: Jīntiān wǒ cóng zǎoshàng jiǔdiǎn dào xiàwǔ wǔdiǎn dōu yǒu kè."
      },
      {
       "hz": "這裡的春天是從二月到四月。",
       "vi": "Mùa xuân ở đây là từ tháng Hai đến tháng Tư.",
       "py": "Zhèlǐ de chūntiān shìcóng èryuè dào sìyuè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：我明天要跟國安去吃飯，你要一起去嗎？",
       "vi": "A: Ngày mai tôi sẽ đi ăn với Quốc An, bạn có muốn đi cùng không?",
       "py": "A: Wǒ míngtiān yào gēn Guó'ān qù chīfàn, nǐ yào yìqǐ qù ma?"
      },
      {
       "hz": "B：我明天從早上到晚上都沒有空，後天可以嗎？",
       "vi": "B: Ngày mai từ sáng đến tối tôi đều bận, ngày kia được không?",
       "py": "B: Wǒ míngtiān cóng zǎoshàng dào wǎnshàng dōu méiyǒu kōng, hòutiān kěyǐ ma?"
      },
      {
       "hz": "A：這家餐廳哪天要休息？",
       "vi": "A: Nhà hàng này nghỉ vào ngày nào?",
       "py": "A: Zhèjiā cāntīng nǎ tiān yào xiūxí?"
      },
      {
       "hz": "A：棒球比賽的時間是從幾點到幾點？",
       "vi": "A: Trận bóng chày diễn ra từ mấy giờ đến mấy giờ?",
       "py": "A: Bàngqiú bǐsài de shíjiān shìcóng jǐdiǎn dào jǐdiǎn?"
      },
      {
       "hz": "A：他從2013年到2017年都在法國學畫畫嗎？",
       "vi": "A: Từ năm 2013 đến năm 2017 anh ấy đều học vẽ ở Pháp à?",
       "py": "A: Tā cóng 2013 nián dào 2017 nián dōu zài Fǎguó xué huàhuà ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "III. 先……再…… (First…, then…)",
   "points": [
    {
     "label": null,
     "formula": "先……再……is a pattern used for sequencing events, much like “First …, then…”. If the subjects are the same, then omit the second one. Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxi, zài qù péngyǒu jiā.",
     "examples": [
      {
       "hz": "A：你們兩個人，誰先說？",
       "vi": "A: Hai bạn, ai nói trước?",
       "py": "A: Nǐmen liǎnggè rén, shéi xiān shuō?"
      },
      {
       "hz": "B：他先說，我再說。",
       "vi": "B: Anh ấy nói trước, tôi nói sau.",
       "py": "B: Tā xiān shuō, wǒ zàishuō."
      },
      {
       "hz": "A：你明天想要做什麼？",
       "vi": "A: Ngày mai bạn muốn làm gì?",
       "py": "A: Nǐ míngtiān xiǎngyào zuò shénme?"
      },
      {
       "hz": "B：我想先去百貨公司買東西，再去朋友家。",
       "vi": "B: Tôi muốn đi trung tâm thương mại mua đồ trước, rồi đến nhà bạn.",
       "py": "B: Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxī, zài qù péngyǒujiā."
      },
      {
       "hz": "A：我要怎麼到那家飯店？",
       "vi": "A: Tôi đến khách sạn đó bằng cách nào?",
       "py": "A: Wǒ yào zěnme dào nà jiā fàndiàn?"
      },
      {
       "hz": "B：你要先坐捷運，再坐公車。",
       "vi": "B: Bạn đi tàu điện ngầm trước, rồi đi xe buýt.",
       "py": "B: Nǐ yào xiān zuò jiéyùn, zài zuògōngchē."
      },
      {
       "hz": "A：你明天下午要上什麼課？",
       "vi": "A: Chiều mai bạn học môn gì?",
       "py": "A: Nǐ míngtiān xiàwǔ yào shàng shénme kè?"
      },
      {
       "hz": "A：你們週末想去哪裡？",
       "vi": "A: Cuối tuần các bạn muốn đi đâu?",
       "py": "A: Nǐmen zhōumò xiǎng qù nǎlǐ?"
      },
      {
       "hz": "A：你不去吃晚飯嗎？",
       "vi": "A: Bạn không đi ăn tối à?",
       "py": "A: Nǐ bú qù chīwǎnfàn ma?"
      },
      {
       "hz": "為什麼他們要看書？",
       "vi": "Tại sao họ phải đọc sách?",
       "py": "Wèishénme tāmen yào kànshū?"
      },
      {
       "hz": "他們想在哪裡看書？",
       "vi": "Họ muốn đọc sách ở đâu?",
       "py": "Tāmen xiǎng zài nǎlǐ kànshū?"
      },
      {
       "hz": "家樂為什麼不能去看書？",
       "vi": "Tại sao Gia Lạc không thể đi đọc sách?",
       "py": "Jiālè wèishénme bùnéng qù kànshū?"
      },
      {
       "hz": "他們想要怎麼做？",
       "vi": "Họ định làm thế nào?",
       "py": "Tāmen xiǎngyào zěnme zuò?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "先……再…… — trước… rồi…",
   "giaiThich": "Nêu thứ tự việc làm: việc trước dùng 先, việc sau dùng 再. Nếu cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  },
  {
   "title": "I. Vaux 能",
   "points": [
    {
     "label": null,
     "formula": "When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bù néng kàn shǒujī. When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. (3) 能 (possibility due to objective factors) 能 can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Tā bù néng lái, yīnwèi tā nǚ péngyǒu de māma yào qǐng tā chīfàn. (3) 能 (possibility due to objective factors) 能can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba.",
     "examples": [
      {
       "hz": "鳥能飛，人不能飛。",
       "vi": "Chim biết bay, người không bay được.",
       "py": "Niǎo néng fēi, rén bùnéng fēi."
      },
      {
       "hz": "他現在只能走，不能跑。",
       "vi": "Bây giờ anh ấy chỉ đi được, không chạy được.",
       "py": "Tā xiànzài zhǐnéng zǒu, bùnéng pǎo."
      },
      {
       "hz": "我不能喝太多咖啡，因為不能睡覺。",
       "vi": "Tôi không thể uống quá nhiều cà phê, vì sẽ không ngủ được.",
       "py": "Wǒ bùnéng hē tài duō kāfēi, yīnwèi bùnéng shuìjiào."
      },
      {
       "hz": "A:他現在能說話嗎？",
       "vi": "A: Bây giờ anh ấy nói chuyện được chưa?",
       "py": "A: Tā xiànzài néng shuōhuà ma?"
      },
      {
       "hz": "A:他現在能打球嗎？",
       "vi": "A: Bây giờ anh ấy chơi bóng được không?",
       "py": "A: Tā xiànzài néng dǎqiú ma?"
      },
      {
       "hz": "A:你一天能喝多少咖啡？",
       "vi": "A: Một ngày bạn uống được bao nhiêu cà phê?",
       "py": "A: Nǐ yìtiān néng hē duōshǎo kāfēi?"
      },
      {
       "hz": "現在是上課時間，老師說我們不能看手機。",
       "vi": "Bây giờ là giờ học, thầy giáo nói chúng ta không được xem điện thoại.",
       "py": "Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bùnéng kàn shǒujī."
      },
      {
       "hz": "A：在捷運上能吃東西嗎？",
       "vi": "A: Trên tàu điện ngầm có được ăn không?",
       "py": "A: Zài jiéyùn shàng néng chī dōngxī ma?"
      },
      {
       "hz": "B：不可以吃東西。",
       "vi": "B: Không được ăn.",
       "py": "B: Bù kěyǐ chī dōngxī."
      },
      {
       "hz": "A：我能在這裡用電腦嗎？",
       "vi": "A: Tôi dùng máy tính ở đây được không?",
       "py": "A: Wǒ néng zài zhèlǐ yòng diànnǎo ma?"
      },
      {
       "hz": "B：可以，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Kěyǐ, méi wèntí."
      },
      {
       "hz": "A：我能不能開妳的車？",
       "vi": "A: Tôi lái xe của bạn được không?",
       "py": "A: Wǒ néng bùnéng kāi nǐ de chē?"
      },
      {
       "hz": "A：在圖書館裡我們能不能說話？",
       "vi": "A: Trong thư viện chúng ta có được nói chuyện không?",
       "py": "A: Zài túshūguǎn lǐ wǒmen néng bùnéng shuōhuà?"
      },
      {
       "hz": "A：為什麼我們不能在樓上跳舞？",
       "vi": "A: Tại sao chúng ta không được nhảy ở tầng trên?",
       "py": "A: Wèishénme wǒmen bùnéng zài lóushàng tiàowǔ?"
      },
      {
       "hz": "今天我有中文課，不能跟你們去玩。",
       "vi": "Hôm nay tôi có tiết tiếng Trung, không đi chơi với các bạn được.",
       "py": "Jīntiān wǒ yǒu zhōngwén kè, bùnéng gēn nǐmen qù wán."
      },
      {
       "hz": "A：那個地方很遠，我們十點鐘能到嗎？",
       "vi": "A: Chỗ đó rất xa, mười giờ chúng ta đến kịp không?",
       "py": "A: Nàge dìfāng hěn yuǎn, wǒmen shídiǎnzhōng néng dào ma?"
      },
      {
       "hz": "B：沒問題，坐捷運很快。",
       "vi": "B: Không vấn đề gì, đi tàu điện ngầm nhanh lắm.",
       "py": "B: Méi wèntí, zuò jiéyùn hěnkuài."
      },
      {
       "hz": "A:明天他能來嗎？",
       "vi": "A: Ngày mai anh ấy đến được không?",
       "py": "A: Míngtiān tā néng lái ma?"
      },
      {
       "hz": "B:他不能來，因為他女朋友的媽媽要請他吃飯。",
       "vi": "B: Anh ấy không đến được, vì mẹ bạn gái anh ấy mời anh ấy ăn cơm.",
       "py": "B: Tā bùnéng lái, yīnwèi tā nǚpéngyǒu de māma yào qǐng tā chīfàn."
      },
      {
       "hz": "A：今天晚上你要不要跟我去百貨公司？",
       "vi": "A: Tối nay bạn có muốn đi trung tâm thương mại với tôi không?",
       "py": "A: Jīntiān wǎnshàng nǐ yào búyào gēn wǒ qù bǎihuògōngsī?"
      },
      {
       "hz": "A：上課時間快到了，你坐計程車到學校去吧。",
       "vi": "A: Sắp đến giờ học rồi, bạn đi taxi đến trường đi.",
       "py": "A: Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba."
      },
      {
       "hz": "B：好，沒問題，我明天幫你寄。",
       "vi": "B: Được, không vấn đề gì, ngày mai tôi gửi giúp bạn.",
       "py": "B: Hǎo, méi wèntí, wǒ míngtiān bāng nǐ jì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 能",
   "giaiThich": "能 diễn đạt khả năng hoặc sự cho phép; khi nói về cho phép thì thay được bằng 可以. Hay gặp ở câu hỏi và câu phủ định."
  },
  {
   "title": "II. Implicit Comparison with 比較",
   "points": [
    {
     "label": null,
     "formula": "比較 is used to express implicit comparison. If both subjects are known from the context, we can  just use the “比較Vs” pattern. Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiān wǎnshàng tā zuò shénme?",
     "examples": [
      {
       "hz": "A：誰比較瘦？",
       "vi": "A: Ai gầy hơn?",
       "py": "A: Shéi bǐjiào shòu?"
      },
      {
       "hz": "B：姊姊比較瘦，妹妹比較胖。",
       "vi": "B: Chị gầy hơn, em béo hơn.",
       "py": "B: Jiějie bǐjiào shòu, mèimei bǐjiào pàng."
      },
      {
       "hz": "A：你們兩個人，誰唱歌唱得比較好聽？",
       "vi": "A: Hai bạn, ai hát hay hơn?",
       "py": "A: Nǐmen liǎnggè rén, shéi chàng gēchàng de bǐjiào hǎotīng?"
      },
      {
       "hz": "B：我覺得他唱得比較好聽。",
       "vi": "B: Tôi thấy anh ấy hát hay hơn.",
       "py": "B: Wǒ juéde tā chàng de bǐjiào hǎotīng."
      },
      {
       "hz": "A：坐飛機比較舒服，還是坐車比較舒服？",
       "vi": "A: Đi máy bay thoải mái hơn hay đi xe thoải mái hơn?",
       "py": "A: Zuòfēijī bǐjiào shūfú, háishì zuòchē bǐjiào shūfú?"
      },
      {
       "hz": "B：我覺得坐飛機比較舒服。",
       "vi": "B: Tôi thấy đi máy bay thoải mái hơn.",
       "py": "B: Wǒ juéde zuòfēijī bǐjiào shūfú."
      },
      {
       "hz": "A：你覺得誰跳舞跳得比較好？",
       "vi": "A: Bạn thấy ai nhảy giỏi hơn?",
       "py": "A: Nǐ juéde shéi tiàowǔ tiào de bǐjiào hǎo?"
      },
      {
       "hz": "A：你覺得哪件衣服比較好看？",
       "vi": "A: Bạn thấy bộ quần áo nào đẹp hơn?",
       "py": "A: Nǐ juéde nǎ jiàn yīfú bǐjiào hǎokàn?"
      },
      {
       "hz": "A：國安的房間大，還是中明的房間大？",
       "vi": "A: Phòng của Quốc An lớn hay phòng của Trung Minh lớn?",
       "py": "A: Guó'ān de fángjiān dà, háishì Zhōngmíng de fángjiān dà?"
      },
      {
       "hz": "這學期開始，他早上做什麼？",
       "vi": "Từ đầu học kỳ này, buổi sáng anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā zǎoshàng zuò shénme?"
      },
      {
       "hz": "這學期開始，他下午做什麼？",
       "vi": "Từ đầu học kỳ này, buổi chiều anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā xiàwǔ zuò shénme?"
      },
      {
       "hz": "為什麼他的中文進步了？",
       "vi": "Tại sao tiếng Trung của anh ấy tiến bộ?",
       "py": "Wèishénme tā de zhōngwén jìnbù le?"
      },
      {
       "hz": "因為期中考快要到了，所以每天晚上他做什麼？",
       "vi": "Vì sắp thi giữa kỳ, nên tối nào anh ấy cũng làm gì?",
       "py": "Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiānwǎnshàng tā zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "So sánh ngầm với 比較",
   "giaiThich": "比較 dùng khi so sánh mà không nêu rõ đối tượng kia; nếu ngữ cảnh đã rõ cả hai bên thì chỉ cần \"比較 + tính từ\"."
  }
 ],
 "td1-9.3": [
  {
   "title": "I. “在 V” Indicating Ongoing Actions",
   "points": [
    {
     "label": null,
     "formula": "“在 V” indicates the progressive aspect of an action.",
     "examples": [
      {
       "hz": "A：你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B：我在做功課。",
       "vi": "B: Tôi đang làm bài tập.",
       "py": "B: Wǒ zài zuò gōngkè."
      },
      {
       "hz": "A：你哥哥在做什麼？",
       "vi": "A: Anh trai bạn đang làm gì?",
       "py": "A: Nǐ gēge zài zuò shénme?"
      },
      {
       "hz": "B：他在運動。",
       "vi": "B: Anh ấy đang tập thể thao.",
       "py": "B: Tā zài yùndòng."
      },
      {
       "hz": "A：他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B：他們在騎腳踏車。",
       "vi": "B: Họ đang đạp xe.",
       "py": "B: Tāmen zài qí jiǎotàchē."
      },
      {
       "hz": "A:他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B:他們在跳日本舞。",
       "vi": "B: Họ đang múa điệu múa Nhật Bản.",
       "py": "B: Tāmen zài tiào Rìběn wǔ."
      },
      {
       "hz": "A:這個孩子在做什麼？",
       "vi": "A: Đứa bé này đang làm gì?",
       "py": "A: Zhège háizi zài zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 + V — hành động đang diễn ra",
   "giaiThich": "在 đặt trước động từ để nói hành động đang tiếp diễn."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": "Jīntiān wǒ cóng zǎoshàng jiǔ diǎn dào xiàwǔ wǔ diǎn dōu yǒu kè. Indicating “from…to…”, 從……到……can be used for a temporal duration of time.",
     "examples": [
      {
       "hz": "A：你今天幾點有課？",
       "vi": "A: Hôm nay mấy giờ bạn có tiết học?",
       "py": "A: Nǐ jīntiān jǐdiǎn yǒu kè?"
      },
      {
       "hz": "B：今天我從早上九點到下午五點都有課。",
       "vi": "B: Hôm nay từ chín giờ sáng đến năm giờ chiều tôi đều có tiết.",
       "py": "B: Jīntiān wǒ cóng zǎoshàng jiǔdiǎn dào xiàwǔ wǔdiǎn dōu yǒu kè."
      },
      {
       "hz": "這裡的春天是從二月到四月。",
       "vi": "Mùa xuân ở đây là từ tháng Hai đến tháng Tư.",
       "py": "Zhèlǐ de chūntiān shìcóng èryuè dào sìyuè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：我明天要跟國安去吃飯，你要一起去嗎？",
       "vi": "A: Ngày mai tôi sẽ đi ăn với Quốc An, bạn có muốn đi cùng không?",
       "py": "A: Wǒ míngtiān yào gēn Guó'ān qù chīfàn, nǐ yào yìqǐ qù ma?"
      },
      {
       "hz": "B：我明天從早上到晚上都沒有空，後天可以嗎？",
       "vi": "B: Ngày mai từ sáng đến tối tôi đều bận, ngày kia được không?",
       "py": "B: Wǒ míngtiān cóng zǎoshàng dào wǎnshàng dōu méiyǒu kōng, hòutiān kěyǐ ma?"
      },
      {
       "hz": "A：這家餐廳哪天要休息？",
       "vi": "A: Nhà hàng này nghỉ vào ngày nào?",
       "py": "A: Zhèjiā cāntīng nǎ tiān yào xiūxí?"
      },
      {
       "hz": "A：棒球比賽的時間是從幾點到幾點？",
       "vi": "A: Trận bóng chày diễn ra từ mấy giờ đến mấy giờ?",
       "py": "A: Bàngqiú bǐsài de shíjiān shìcóng jǐdiǎn dào jǐdiǎn?"
      },
      {
       "hz": "A：他從2013年到2017年都在法國學畫畫嗎？",
       "vi": "A: Từ năm 2013 đến năm 2017 anh ấy đều học vẽ ở Pháp à?",
       "py": "A: Tā cóng 2013 nián dào 2017 nián dōu zài Fǎguó xué huàhuà ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "III. 先……再…… (First…, then…)",
   "points": [
    {
     "label": null,
     "formula": "先……再……is a pattern used for sequencing events, much like “First …, then…”. If the subjects are the same, then omit the second one. Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxi, zài qù péngyǒu jiā.",
     "examples": [
      {
       "hz": "A：你們兩個人，誰先說？",
       "vi": "A: Hai bạn, ai nói trước?",
       "py": "A: Nǐmen liǎnggè rén, shéi xiān shuō?"
      },
      {
       "hz": "B：他先說，我再說。",
       "vi": "B: Anh ấy nói trước, tôi nói sau.",
       "py": "B: Tā xiān shuō, wǒ zàishuō."
      },
      {
       "hz": "A：你明天想要做什麼？",
       "vi": "A: Ngày mai bạn muốn làm gì?",
       "py": "A: Nǐ míngtiān xiǎngyào zuò shénme?"
      },
      {
       "hz": "B：我想先去百貨公司買東西，再去朋友家。",
       "vi": "B: Tôi muốn đi trung tâm thương mại mua đồ trước, rồi đến nhà bạn.",
       "py": "B: Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxī, zài qù péngyǒujiā."
      },
      {
       "hz": "A：我要怎麼到那家飯店？",
       "vi": "A: Tôi đến khách sạn đó bằng cách nào?",
       "py": "A: Wǒ yào zěnme dào nà jiā fàndiàn?"
      },
      {
       "hz": "B：你要先坐捷運，再坐公車。",
       "vi": "B: Bạn đi tàu điện ngầm trước, rồi đi xe buýt.",
       "py": "B: Nǐ yào xiān zuò jiéyùn, zài zuògōngchē."
      },
      {
       "hz": "A：你明天下午要上什麼課？",
       "vi": "A: Chiều mai bạn học môn gì?",
       "py": "A: Nǐ míngtiān xiàwǔ yào shàng shénme kè?"
      },
      {
       "hz": "A：你們週末想去哪裡？",
       "vi": "A: Cuối tuần các bạn muốn đi đâu?",
       "py": "A: Nǐmen zhōumò xiǎng qù nǎlǐ?"
      },
      {
       "hz": "A：你不去吃晚飯嗎？",
       "vi": "A: Bạn không đi ăn tối à?",
       "py": "A: Nǐ bú qù chīwǎnfàn ma?"
      },
      {
       "hz": "為什麼他們要看書？",
       "vi": "Tại sao họ phải đọc sách?",
       "py": "Wèishénme tāmen yào kànshū?"
      },
      {
       "hz": "他們想在哪裡看書？",
       "vi": "Họ muốn đọc sách ở đâu?",
       "py": "Tāmen xiǎng zài nǎlǐ kànshū?"
      },
      {
       "hz": "家樂為什麼不能去看書？",
       "vi": "Tại sao Gia Lạc không thể đi đọc sách?",
       "py": "Jiālè wèishénme bùnéng qù kànshū?"
      },
      {
       "hz": "他們想要怎麼做？",
       "vi": "Họ định làm thế nào?",
       "py": "Tāmen xiǎngyào zěnme zuò?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "先……再…… — trước… rồi…",
   "giaiThich": "Nêu thứ tự việc làm: việc trước dùng 先, việc sau dùng 再. Nếu cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  },
  {
   "title": "I. Vaux 能",
   "points": [
    {
     "label": null,
     "formula": "When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bù néng kàn shǒujī. When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. (3) 能 (possibility due to objective factors) 能 can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Tā bù néng lái, yīnwèi tā nǚ péngyǒu de māma yào qǐng tā chīfàn. (3) 能 (possibility due to objective factors) 能can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba.",
     "examples": [
      {
       "hz": "鳥能飛，人不能飛。",
       "vi": "Chim biết bay, người không bay được.",
       "py": "Niǎo néng fēi, rén bùnéng fēi."
      },
      {
       "hz": "他現在只能走，不能跑。",
       "vi": "Bây giờ anh ấy chỉ đi được, không chạy được.",
       "py": "Tā xiànzài zhǐnéng zǒu, bùnéng pǎo."
      },
      {
       "hz": "我不能喝太多咖啡，因為不能睡覺。",
       "vi": "Tôi không thể uống quá nhiều cà phê, vì sẽ không ngủ được.",
       "py": "Wǒ bùnéng hē tài duō kāfēi, yīnwèi bùnéng shuìjiào."
      },
      {
       "hz": "A:他現在能說話嗎？",
       "vi": "A: Bây giờ anh ấy nói chuyện được chưa?",
       "py": "A: Tā xiànzài néng shuōhuà ma?"
      },
      {
       "hz": "A:他現在能打球嗎？",
       "vi": "A: Bây giờ anh ấy chơi bóng được không?",
       "py": "A: Tā xiànzài néng dǎqiú ma?"
      },
      {
       "hz": "A:你一天能喝多少咖啡？",
       "vi": "A: Một ngày bạn uống được bao nhiêu cà phê?",
       "py": "A: Nǐ yìtiān néng hē duōshǎo kāfēi?"
      },
      {
       "hz": "現在是上課時間，老師說我們不能看手機。",
       "vi": "Bây giờ là giờ học, thầy giáo nói chúng ta không được xem điện thoại.",
       "py": "Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bùnéng kàn shǒujī."
      },
      {
       "hz": "A：在捷運上能吃東西嗎？",
       "vi": "A: Trên tàu điện ngầm có được ăn không?",
       "py": "A: Zài jiéyùn shàng néng chī dōngxī ma?"
      },
      {
       "hz": "B：不可以吃東西。",
       "vi": "B: Không được ăn.",
       "py": "B: Bù kěyǐ chī dōngxī."
      },
      {
       "hz": "A：我能在這裡用電腦嗎？",
       "vi": "A: Tôi dùng máy tính ở đây được không?",
       "py": "A: Wǒ néng zài zhèlǐ yòng diànnǎo ma?"
      },
      {
       "hz": "B：可以，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Kěyǐ, méi wèntí."
      },
      {
       "hz": "A：我能不能開妳的車？",
       "vi": "A: Tôi lái xe của bạn được không?",
       "py": "A: Wǒ néng bùnéng kāi nǐ de chē?"
      },
      {
       "hz": "A：在圖書館裡我們能不能說話？",
       "vi": "A: Trong thư viện chúng ta có được nói chuyện không?",
       "py": "A: Zài túshūguǎn lǐ wǒmen néng bùnéng shuōhuà?"
      },
      {
       "hz": "A：為什麼我們不能在樓上跳舞？",
       "vi": "A: Tại sao chúng ta không được nhảy ở tầng trên?",
       "py": "A: Wèishénme wǒmen bùnéng zài lóushàng tiàowǔ?"
      },
      {
       "hz": "今天我有中文課，不能跟你們去玩。",
       "vi": "Hôm nay tôi có tiết tiếng Trung, không đi chơi với các bạn được.",
       "py": "Jīntiān wǒ yǒu zhōngwén kè, bùnéng gēn nǐmen qù wán."
      },
      {
       "hz": "A：那個地方很遠，我們十點鐘能到嗎？",
       "vi": "A: Chỗ đó rất xa, mười giờ chúng ta đến kịp không?",
       "py": "A: Nàge dìfāng hěn yuǎn, wǒmen shídiǎnzhōng néng dào ma?"
      },
      {
       "hz": "B：沒問題，坐捷運很快。",
       "vi": "B: Không vấn đề gì, đi tàu điện ngầm nhanh lắm.",
       "py": "B: Méi wèntí, zuò jiéyùn hěnkuài."
      },
      {
       "hz": "A:明天他能來嗎？",
       "vi": "A: Ngày mai anh ấy đến được không?",
       "py": "A: Míngtiān tā néng lái ma?"
      },
      {
       "hz": "B:他不能來，因為他女朋友的媽媽要請他吃飯。",
       "vi": "B: Anh ấy không đến được, vì mẹ bạn gái anh ấy mời anh ấy ăn cơm.",
       "py": "B: Tā bùnéng lái, yīnwèi tā nǚpéngyǒu de māma yào qǐng tā chīfàn."
      },
      {
       "hz": "A：今天晚上你要不要跟我去百貨公司？",
       "vi": "A: Tối nay bạn có muốn đi trung tâm thương mại với tôi không?",
       "py": "A: Jīntiān wǎnshàng nǐ yào búyào gēn wǒ qù bǎihuògōngsī?"
      },
      {
       "hz": "A：上課時間快到了，你坐計程車到學校去吧。",
       "vi": "A: Sắp đến giờ học rồi, bạn đi taxi đến trường đi.",
       "py": "A: Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba."
      },
      {
       "hz": "B：好，沒問題，我明天幫你寄。",
       "vi": "B: Được, không vấn đề gì, ngày mai tôi gửi giúp bạn.",
       "py": "B: Hǎo, méi wèntí, wǒ míngtiān bāng nǐ jì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 能",
   "giaiThich": "能 diễn đạt khả năng hoặc sự cho phép; khi nói về cho phép thì thay được bằng 可以. Hay gặp ở câu hỏi và câu phủ định."
  },
  {
   "title": "II. Implicit Comparison with 比較",
   "points": [
    {
     "label": null,
     "formula": "比較 is used to express implicit comparison. If both subjects are known from the context, we can  just use the “比較Vs” pattern. Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiān wǎnshàng tā zuò shénme?",
     "examples": [
      {
       "hz": "A：誰比較瘦？",
       "vi": "A: Ai gầy hơn?",
       "py": "A: Shéi bǐjiào shòu?"
      },
      {
       "hz": "B：姊姊比較瘦，妹妹比較胖。",
       "vi": "B: Chị gầy hơn, em béo hơn.",
       "py": "B: Jiějie bǐjiào shòu, mèimei bǐjiào pàng."
      },
      {
       "hz": "A：你們兩個人，誰唱歌唱得比較好聽？",
       "vi": "A: Hai bạn, ai hát hay hơn?",
       "py": "A: Nǐmen liǎnggè rén, shéi chàng gēchàng de bǐjiào hǎotīng?"
      },
      {
       "hz": "B：我覺得他唱得比較好聽。",
       "vi": "B: Tôi thấy anh ấy hát hay hơn.",
       "py": "B: Wǒ juéde tā chàng de bǐjiào hǎotīng."
      },
      {
       "hz": "A：坐飛機比較舒服，還是坐車比較舒服？",
       "vi": "A: Đi máy bay thoải mái hơn hay đi xe thoải mái hơn?",
       "py": "A: Zuòfēijī bǐjiào shūfú, háishì zuòchē bǐjiào shūfú?"
      },
      {
       "hz": "B：我覺得坐飛機比較舒服。",
       "vi": "B: Tôi thấy đi máy bay thoải mái hơn.",
       "py": "B: Wǒ juéde zuòfēijī bǐjiào shūfú."
      },
      {
       "hz": "A：你覺得誰跳舞跳得比較好？",
       "vi": "A: Bạn thấy ai nhảy giỏi hơn?",
       "py": "A: Nǐ juéde shéi tiàowǔ tiào de bǐjiào hǎo?"
      },
      {
       "hz": "A：你覺得哪件衣服比較好看？",
       "vi": "A: Bạn thấy bộ quần áo nào đẹp hơn?",
       "py": "A: Nǐ juéde nǎ jiàn yīfú bǐjiào hǎokàn?"
      },
      {
       "hz": "A：國安的房間大，還是中明的房間大？",
       "vi": "A: Phòng của Quốc An lớn hay phòng của Trung Minh lớn?",
       "py": "A: Guó'ān de fángjiān dà, háishì Zhōngmíng de fángjiān dà?"
      },
      {
       "hz": "這學期開始，他早上做什麼？",
       "vi": "Từ đầu học kỳ này, buổi sáng anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā zǎoshàng zuò shénme?"
      },
      {
       "hz": "這學期開始，他下午做什麼？",
       "vi": "Từ đầu học kỳ này, buổi chiều anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā xiàwǔ zuò shénme?"
      },
      {
       "hz": "為什麼他的中文進步了？",
       "vi": "Tại sao tiếng Trung của anh ấy tiến bộ?",
       "py": "Wèishénme tā de zhōngwén jìnbù le?"
      },
      {
       "hz": "因為期中考快要到了，所以每天晚上他做什麼？",
       "vi": "Vì sắp thi giữa kỳ, nên tối nào anh ấy cũng làm gì?",
       "py": "Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiānwǎnshàng tā zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "So sánh ngầm với 比較",
   "giaiThich": "比較 dùng khi so sánh mà không nêu rõ đối tượng kia; nếu ngữ cảnh đã rõ cả hai bên thì chỉ cần \"比較 + tính từ\"."
  }
 ],
 "td1-9.4": [
  {
   "title": "I. “在 V” Indicating Ongoing Actions",
   "points": [
    {
     "label": null,
     "formula": "“在 V” indicates the progressive aspect of an action.",
     "examples": [
      {
       "hz": "A：你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B：我在做功課。",
       "vi": "B: Tôi đang làm bài tập.",
       "py": "B: Wǒ zài zuò gōngkè."
      },
      {
       "hz": "A：你哥哥在做什麼？",
       "vi": "A: Anh trai bạn đang làm gì?",
       "py": "A: Nǐ gēge zài zuò shénme?"
      },
      {
       "hz": "B：他在運動。",
       "vi": "B: Anh ấy đang tập thể thao.",
       "py": "B: Tā zài yùndòng."
      },
      {
       "hz": "A：他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B：他們在騎腳踏車。",
       "vi": "B: Họ đang đạp xe.",
       "py": "B: Tāmen zài qí jiǎotàchē."
      },
      {
       "hz": "A:他們在做什麼？",
       "vi": "A: Họ đang làm gì?",
       "py": "A: Tāmen zài zuò shénme?"
      },
      {
       "hz": "B:他們在跳日本舞。",
       "vi": "B: Họ đang múa điệu múa Nhật Bản.",
       "py": "B: Tāmen zài tiào Rìběn wǔ."
      },
      {
       "hz": "A:這個孩子在做什麼？",
       "vi": "A: Đứa bé này đang làm gì?",
       "py": "A: Zhège háizi zài zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在 + V — hành động đang diễn ra",
   "giaiThich": "在 đặt trước động từ để nói hành động đang tiếp diễn."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": "Jīntiān wǒ cóng zǎoshàng jiǔ diǎn dào xiàwǔ wǔ diǎn dōu yǒu kè. Indicating “from…to…”, 從……到……can be used for a temporal duration of time.",
     "examples": [
      {
       "hz": "A：你今天幾點有課？",
       "vi": "A: Hôm nay mấy giờ bạn có tiết học?",
       "py": "A: Nǐ jīntiān jǐdiǎn yǒu kè?"
      },
      {
       "hz": "B：今天我從早上九點到下午五點都有課。",
       "vi": "B: Hôm nay từ chín giờ sáng đến năm giờ chiều tôi đều có tiết.",
       "py": "B: Jīntiān wǒ cóng zǎoshàng jiǔdiǎn dào xiàwǔ wǔdiǎn dōu yǒu kè."
      },
      {
       "hz": "這裡的春天是從二月到四月。",
       "vi": "Mùa xuân ở đây là từ tháng Hai đến tháng Tư.",
       "py": "Zhèlǐ de chūntiān shìcóng èryuè dào sìyuè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "II. 從……到……（時間）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "A：我明天要跟國安去吃飯，你要一起去嗎？",
       "vi": "A: Ngày mai tôi sẽ đi ăn với Quốc An, bạn có muốn đi cùng không?",
       "py": "A: Wǒ míngtiān yào gēn Guó'ān qù chīfàn, nǐ yào yìqǐ qù ma?"
      },
      {
       "hz": "B：我明天從早上到晚上都沒有空，後天可以嗎？",
       "vi": "B: Ngày mai từ sáng đến tối tôi đều bận, ngày kia được không?",
       "py": "B: Wǒ míngtiān cóng zǎoshàng dào wǎnshàng dōu méiyǒu kōng, hòutiān kěyǐ ma?"
      },
      {
       "hz": "A：這家餐廳哪天要休息？",
       "vi": "A: Nhà hàng này nghỉ vào ngày nào?",
       "py": "A: Zhèjiā cāntīng nǎ tiān yào xiūxí?"
      },
      {
       "hz": "A：棒球比賽的時間是從幾點到幾點？",
       "vi": "A: Trận bóng chày diễn ra từ mấy giờ đến mấy giờ?",
       "py": "A: Bàngqiú bǐsài de shíjiān shìcóng jǐdiǎn dào jǐdiǎn?"
      },
      {
       "hz": "A：他從2013年到2017年都在法國學畫畫嗎？",
       "vi": "A: Từ năm 2013 đến năm 2017 anh ấy đều học vẽ ở Pháp à?",
       "py": "A: Tā cóng 2013 nián dào 2017 nián dōu zài Fǎguó xué huàhuà ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……到…… (thời gian) — từ… đến…",
   "giaiThich": "Dùng 從…到… để nêu khoảng thời gian kéo dài từ mốc này tới mốc kia."
  },
  {
   "title": "III. 先……再…… (First…, then…)",
   "points": [
    {
     "label": null,
     "formula": "先……再……is a pattern used for sequencing events, much like “First …, then…”. If the subjects are the same, then omit the second one. Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxi, zài qù péngyǒu jiā.",
     "examples": [
      {
       "hz": "A：你們兩個人，誰先說？",
       "vi": "A: Hai bạn, ai nói trước?",
       "py": "A: Nǐmen liǎnggè rén, shéi xiān shuō?"
      },
      {
       "hz": "B：他先說，我再說。",
       "vi": "B: Anh ấy nói trước, tôi nói sau.",
       "py": "B: Tā xiān shuō, wǒ zàishuō."
      },
      {
       "hz": "A：你明天想要做什麼？",
       "vi": "A: Ngày mai bạn muốn làm gì?",
       "py": "A: Nǐ míngtiān xiǎngyào zuò shénme?"
      },
      {
       "hz": "B：我想先去百貨公司買東西，再去朋友家。",
       "vi": "B: Tôi muốn đi trung tâm thương mại mua đồ trước, rồi đến nhà bạn.",
       "py": "B: Wǒ xiǎng xiān qù bǎihuògōngsī mǎi dōngxī, zài qù péngyǒujiā."
      },
      {
       "hz": "A：我要怎麼到那家飯店？",
       "vi": "A: Tôi đến khách sạn đó bằng cách nào?",
       "py": "A: Wǒ yào zěnme dào nà jiā fàndiàn?"
      },
      {
       "hz": "B：你要先坐捷運，再坐公車。",
       "vi": "B: Bạn đi tàu điện ngầm trước, rồi đi xe buýt.",
       "py": "B: Nǐ yào xiān zuò jiéyùn, zài zuògōngchē."
      },
      {
       "hz": "A：你明天下午要上什麼課？",
       "vi": "A: Chiều mai bạn học môn gì?",
       "py": "A: Nǐ míngtiān xiàwǔ yào shàng shénme kè?"
      },
      {
       "hz": "A：你們週末想去哪裡？",
       "vi": "A: Cuối tuần các bạn muốn đi đâu?",
       "py": "A: Nǐmen zhōumò xiǎng qù nǎlǐ?"
      },
      {
       "hz": "A：你不去吃晚飯嗎？",
       "vi": "A: Bạn không đi ăn tối à?",
       "py": "A: Nǐ bú qù chīwǎnfàn ma?"
      },
      {
       "hz": "為什麼他們要看書？",
       "vi": "Tại sao họ phải đọc sách?",
       "py": "Wèishénme tāmen yào kànshū?"
      },
      {
       "hz": "他們想在哪裡看書？",
       "vi": "Họ muốn đọc sách ở đâu?",
       "py": "Tāmen xiǎng zài nǎlǐ kànshū?"
      },
      {
       "hz": "家樂為什麼不能去看書？",
       "vi": "Tại sao Gia Lạc không thể đi đọc sách?",
       "py": "Jiālè wèishénme bùnéng qù kànshū?"
      },
      {
       "hz": "他們想要怎麼做？",
       "vi": "Họ định làm thế nào?",
       "py": "Tāmen xiǎngyào zěnme zuò?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "先……再…… — trước… rồi…",
   "giaiThich": "Nêu thứ tự việc làm: việc trước dùng 先, việc sau dùng 再. Nếu cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  },
  {
   "title": "I. Vaux 能",
   "points": [
    {
     "label": null,
     "formula": "When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bù néng kàn shǒujī. When indicating permission, 能could be replaced with 可以. It is commonly used in question forms or negative forms. (3) 能 (possibility due to objective factors) 能 can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Tā bù néng lái, yīnwèi tā nǚ péngyǒu de māma yào qǐng tā chīfàn. (3) 能 (possibility due to objective factors) 能can indicate possibility due to objective factors which are related to      the occurrence of particular events, not inherent in the speakers. Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba.",
     "examples": [
      {
       "hz": "鳥能飛，人不能飛。",
       "vi": "Chim biết bay, người không bay được.",
       "py": "Niǎo néng fēi, rén bùnéng fēi."
      },
      {
       "hz": "他現在只能走，不能跑。",
       "vi": "Bây giờ anh ấy chỉ đi được, không chạy được.",
       "py": "Tā xiànzài zhǐnéng zǒu, bùnéng pǎo."
      },
      {
       "hz": "我不能喝太多咖啡，因為不能睡覺。",
       "vi": "Tôi không thể uống quá nhiều cà phê, vì sẽ không ngủ được.",
       "py": "Wǒ bùnéng hē tài duō kāfēi, yīnwèi bùnéng shuìjiào."
      },
      {
       "hz": "A:他現在能說話嗎？",
       "vi": "A: Bây giờ anh ấy nói chuyện được chưa?",
       "py": "A: Tā xiànzài néng shuōhuà ma?"
      },
      {
       "hz": "A:他現在能打球嗎？",
       "vi": "A: Bây giờ anh ấy chơi bóng được không?",
       "py": "A: Tā xiànzài néng dǎqiú ma?"
      },
      {
       "hz": "A:你一天能喝多少咖啡？",
       "vi": "A: Một ngày bạn uống được bao nhiêu cà phê?",
       "py": "A: Nǐ yìtiān néng hē duōshǎo kāfēi?"
      },
      {
       "hz": "現在是上課時間，老師說我們不能看手機。",
       "vi": "Bây giờ là giờ học, thầy giáo nói chúng ta không được xem điện thoại.",
       "py": "Xiànzài shì shàngkè shíjiān, lǎoshī shuō wǒmen bùnéng kàn shǒujī."
      },
      {
       "hz": "A：在捷運上能吃東西嗎？",
       "vi": "A: Trên tàu điện ngầm có được ăn không?",
       "py": "A: Zài jiéyùn shàng néng chī dōngxī ma?"
      },
      {
       "hz": "B：不可以吃東西。",
       "vi": "B: Không được ăn.",
       "py": "B: Bù kěyǐ chī dōngxī."
      },
      {
       "hz": "A：我能在這裡用電腦嗎？",
       "vi": "A: Tôi dùng máy tính ở đây được không?",
       "py": "A: Wǒ néng zài zhèlǐ yòng diànnǎo ma?"
      },
      {
       "hz": "B：可以，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Kěyǐ, méi wèntí."
      },
      {
       "hz": "A：我能不能開妳的車？",
       "vi": "A: Tôi lái xe của bạn được không?",
       "py": "A: Wǒ néng bùnéng kāi nǐ de chē?"
      },
      {
       "hz": "A：在圖書館裡我們能不能說話？",
       "vi": "A: Trong thư viện chúng ta có được nói chuyện không?",
       "py": "A: Zài túshūguǎn lǐ wǒmen néng bùnéng shuōhuà?"
      },
      {
       "hz": "A：為什麼我們不能在樓上跳舞？",
       "vi": "A: Tại sao chúng ta không được nhảy ở tầng trên?",
       "py": "A: Wèishénme wǒmen bùnéng zài lóushàng tiàowǔ?"
      },
      {
       "hz": "今天我有中文課，不能跟你們去玩。",
       "vi": "Hôm nay tôi có tiết tiếng Trung, không đi chơi với các bạn được.",
       "py": "Jīntiān wǒ yǒu zhōngwén kè, bùnéng gēn nǐmen qù wán."
      },
      {
       "hz": "A：那個地方很遠，我們十點鐘能到嗎？",
       "vi": "A: Chỗ đó rất xa, mười giờ chúng ta đến kịp không?",
       "py": "A: Nàge dìfāng hěn yuǎn, wǒmen shídiǎnzhōng néng dào ma?"
      },
      {
       "hz": "B：沒問題，坐捷運很快。",
       "vi": "B: Không vấn đề gì, đi tàu điện ngầm nhanh lắm.",
       "py": "B: Méi wèntí, zuò jiéyùn hěnkuài."
      },
      {
       "hz": "A:明天他能來嗎？",
       "vi": "A: Ngày mai anh ấy đến được không?",
       "py": "A: Míngtiān tā néng lái ma?"
      },
      {
       "hz": "B:他不能來，因為他女朋友的媽媽要請他吃飯。",
       "vi": "B: Anh ấy không đến được, vì mẹ bạn gái anh ấy mời anh ấy ăn cơm.",
       "py": "B: Tā bùnéng lái, yīnwèi tā nǚpéngyǒu de māma yào qǐng tā chīfàn."
      },
      {
       "hz": "A：今天晚上你要不要跟我去百貨公司？",
       "vi": "A: Tối nay bạn có muốn đi trung tâm thương mại với tôi không?",
       "py": "A: Jīntiān wǎnshàng nǐ yào búyào gēn wǒ qù bǎihuògōngsī?"
      },
      {
       "hz": "A：上課時間快到了，你坐計程車到學校去吧。",
       "vi": "A: Sắp đến giờ học rồi, bạn đi taxi đến trường đi.",
       "py": "A: Shàngkè shíjiān kuài dào le, nǐ zuò jìchéngchē dào xuéxiào qù ba."
      },
      {
       "hz": "B：好，沒問題，我明天幫你寄。",
       "vi": "B: Được, không vấn đề gì, ngày mai tôi gửi giúp bạn.",
       "py": "B: Hǎo, méi wèntí, wǒ míngtiān bāng nǐ jì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ động từ 能",
   "giaiThich": "能 diễn đạt khả năng hoặc sự cho phép; khi nói về cho phép thì thay được bằng 可以. Hay gặp ở câu hỏi và câu phủ định."
  },
  {
   "title": "II. Implicit Comparison with 比較",
   "points": [
    {
     "label": null,
     "formula": "比較 is used to express implicit comparison. If both subjects are known from the context, we can  just use the “比較Vs” pattern. Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiān wǎnshàng tā zuò shénme?",
     "examples": [
      {
       "hz": "A：誰比較瘦？",
       "vi": "A: Ai gầy hơn?",
       "py": "A: Shéi bǐjiào shòu?"
      },
      {
       "hz": "B：姊姊比較瘦，妹妹比較胖。",
       "vi": "B: Chị gầy hơn, em béo hơn.",
       "py": "B: Jiějie bǐjiào shòu, mèimei bǐjiào pàng."
      },
      {
       "hz": "A：你們兩個人，誰唱歌唱得比較好聽？",
       "vi": "A: Hai bạn, ai hát hay hơn?",
       "py": "A: Nǐmen liǎnggè rén, shéi chàng gēchàng de bǐjiào hǎotīng?"
      },
      {
       "hz": "B：我覺得他唱得比較好聽。",
       "vi": "B: Tôi thấy anh ấy hát hay hơn.",
       "py": "B: Wǒ juéde tā chàng de bǐjiào hǎotīng."
      },
      {
       "hz": "A：坐飛機比較舒服，還是坐車比較舒服？",
       "vi": "A: Đi máy bay thoải mái hơn hay đi xe thoải mái hơn?",
       "py": "A: Zuòfēijī bǐjiào shūfú, háishì zuòchē bǐjiào shūfú?"
      },
      {
       "hz": "B：我覺得坐飛機比較舒服。",
       "vi": "B: Tôi thấy đi máy bay thoải mái hơn.",
       "py": "B: Wǒ juéde zuòfēijī bǐjiào shūfú."
      },
      {
       "hz": "A：你覺得誰跳舞跳得比較好？",
       "vi": "A: Bạn thấy ai nhảy giỏi hơn?",
       "py": "A: Nǐ juéde shéi tiàowǔ tiào de bǐjiào hǎo?"
      },
      {
       "hz": "A：你覺得哪件衣服比較好看？",
       "vi": "A: Bạn thấy bộ quần áo nào đẹp hơn?",
       "py": "A: Nǐ juéde nǎ jiàn yīfú bǐjiào hǎokàn?"
      },
      {
       "hz": "A：國安的房間大，還是中明的房間大？",
       "vi": "A: Phòng của Quốc An lớn hay phòng của Trung Minh lớn?",
       "py": "A: Guó'ān de fángjiān dà, háishì Zhōngmíng de fángjiān dà?"
      },
      {
       "hz": "這學期開始，他早上做什麼？",
       "vi": "Từ đầu học kỳ này, buổi sáng anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā zǎoshàng zuò shénme?"
      },
      {
       "hz": "這學期開始，他下午做什麼？",
       "vi": "Từ đầu học kỳ này, buổi chiều anh ấy làm gì?",
       "py": "Zhè xuéqíkāishǐ, tā xiàwǔ zuò shénme?"
      },
      {
       "hz": "為什麼他的中文進步了？",
       "vi": "Tại sao tiếng Trung của anh ấy tiến bộ?",
       "py": "Wèishénme tā de zhōngwén jìnbù le?"
      },
      {
       "hz": "因為期中考快要到了，所以每天晚上他做什麼？",
       "vi": "Vì sắp thi giữa kỳ, nên tối nào anh ấy cũng làm gì?",
       "py": "Yīnwèi qízhōngkǎo kuàiyào dào le, suǒyǐ měitiānwǎnshàng tā zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "So sánh ngầm với 比較",
   "giaiThich": "比較 dùng khi so sánh mà không nêu rõ đối tượng kia; nếu ngữ cảnh đã rõ cả hai bên thì chỉ cần \"比較 + tính từ\"."
  }
 ],
 "td1-10.1": [
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我喜歡跟家人去海邊玩。",
       "vi": "Tôi thích đi biển chơi với gia đình.",
       "py": "Wǒ xǐhuān gēn jiārén qù hǎibiān wán."
      },
      {
       "hz": "今天晚上我要跟朋友吃飯。",
       "vi": "Tối nay tôi sẽ ăn cơm với bạn.",
       "py": "Jīntiān wǎnshàng wǒ yào gēn péngyǒu chīfàn."
      },
      {
       "hz": "我常常跟他一起去百貨公司買東西。",
       "vi": "Tôi thường cùng anh ấy đi trung tâm thương mại mua đồ.",
       "py": "Wǒ chángcháng gēn tā yìqǐ qù bǎihuògōngsī mǎi dōngxī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng yì qiān liǎng bǎi kuài qián.” Wǒ míngtiān bù néng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià. When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "他跟家人說英文，跟同學說中文。",
       "vi": "Anh ấy nói tiếng Anh với gia đình, nói tiếng Trung với bạn học.",
       "py": "Tā gēn jiārén shuō yīngwén, gēn tóngxué shuō zhōngwén."
      },
      {
       "hz": "計程車司機跟我說：「去機場1200塊錢。」3.我明天不能來上課，今天要先跟老師請假。",
       "vi": "Tài xế taxi nói với tôi: “Đi sân bay 1200 đồng.” Ngày mai tôi không đến lớp được, hôm nay phải xin phép thầy giáo trước.",
       "py": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng 1200 kuàiqián.” 3. Wǒ míngtiān bùnéng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我跟李老師學書法。",
       "vi": "Tôi học thư pháp với thầy Lý.",
       "py": "Wǒ gēn Lǐ lǎoshī xué shūfǎ."
      },
      {
       "hz": "他二十歲了，不跟爸媽要錢了。",
       "vi": "Anh ấy hai mươi tuổi rồi, không xin tiền bố mẹ nữa.",
       "py": "Tā èrshísuì le, bù gēn bàmā yàoqián le."
      },
      {
       "hz": "我不想跟朋友買舊車，我想買新車。",
       "vi": "Tôi không muốn mua xe cũ của bạn, tôi muốn mua xe mới.",
       "py": "Wǒ bùxiǎng gēn péngyǒu mǎi jiùchē, wǒ xiǎng mǎi xīnchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": "This pattern is a phrase with a modifying clause and a noun. 的 is placed between the clause and the noun. The noun is the main part of this pattern and is placed at the end of it.",
     "examples": [
      {
       "hz": "媽媽買的蘋果非常好吃。",
       "vi": "Táo mẹ mua cực kỳ ngon.",
       "py": "Māma mǎi de píngguǒ fēicháng hǎochī."
      },
      {
       "hz": "他唱的歌很好聽，是哪國歌？",
       "vi": "Bài hát anh ấy hát rất hay, là bài hát của nước nào?",
       "py": "Tā chàngdegē hěn hǎotīng, shì nǎ guógē?"
      },
      {
       "hz": "我不懂他們說的話，你懂嗎？",
       "vi": "Tôi không hiểu lời họ nói, bạn có hiểu không?",
       "py": "Wǒ bù dǒng tāmen shuō dehuà, nǐ dǒngma?"
      },
      {
       "hz": "A：他看的書難不難？",
       "vi": "A: Sách anh ấy đọc có khó không?",
       "py": "A: Tā kàn de shū nán bùnán?"
      },
      {
       "hz": "A：他戴的眼鏡怎麼樣？",
       "vi": "A: Cặp kính anh ấy đeo thế nào?",
       "py": "A: Tā dài de yǎnjìng zěnmeyàng?"
      },
      {
       "hz": "A：你喜歡吃他做的牛肉麵嗎？",
       "vi": "A: Bạn có thích ăn mì bò anh ấy nấu không?",
       "py": "A: Nǐ xǐhuān chī tā zuò de niúròumiàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在台北坐捷運的人很多。",
       "vi": "Ở Đài Bắc, người đi tàu điện ngầm rất đông.",
       "py": "Zài Táiběi zuò jiéyùn de rén hěnduō."
      },
      {
       "hz": "會說中文的人不一定會教中文。",
       "vi": "Người biết nói tiếng Trung chưa chắc đã biết dạy tiếng Trung.",
       "py": "Huì shuō zhōngwén de rén bù yídìng huì jiào zhōngwén."
      },
      {
       "hz": "常常生病的人要注意身體健康。",
       "vi": "Người hay ốm cần chú ý giữ gìn sức khoẻ.",
       "py": "Chángcháng shēngbìng de rén yào zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "A：愛唱歌的人一定愛聽音樂嗎？",
       "vi": "A: Người thích ca hát thì nhất định thích nghe nhạc à?",
       "py": "A: Ài chànggē de rén yídìng ài tīng yīnyuè ma?"
      },
      {
       "hz": "A：常常上網的學生都不喜歡看書嗎？",
       "vi": "A: Học sinh hay lên mạng đều không thích đọc sách à?",
       "py": "A: Chángcháng shàngwǎng de xuéshēng dōu bù xǐhuān kànshū ma?"
      },
      {
       "hz": "A：喜歡去海邊游泳的人不怕曬太陽嗎？",
       "vi": "A: Người thích đi biển bơi không sợ nắng à?",
       "py": "A: Xǐhuān qù hǎibiān yóuyǒng de rén búpà shàitàiyáng ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我太太買的那件衣服好貴！",
       "vi": "Bộ quần áo vợ tôi mua đắt thật!",
       "py": "Wǒ tàitai mǎi de nà jiàn yīfú hǎo guì!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在跳舞的那些學生都是我的朋友。",
       "vi": "Những học sinh đang nhảy kia đều là bạn tôi.",
       "py": "Zài tiàowǔ de nàxiē xuéshēng dōu shì wǒ de péngyǒu."
      },
      {
       "hz": "你問的這兩個問題都非常難。",
       "vi": "Hai câu hỏi bạn hỏi đều cực kỳ khó.",
       "py": "Nǐ wèn de zhè liǎnggè wèntí dōu fēicháng nán."
      },
      {
       "hz": "A：她們吃的這些點心，你也想吃嗎？",
       "vi": "A: Những món điểm tâm họ đang ăn, bạn cũng muốn ăn à?",
       "py": "A: Tāmen chī de zhèxiē diǎnxīn, nǐ yě xiǎng chī ma?"
      },
      {
       "hz": "A：穿紅衣服的那個女孩子是姐姐還是妹妹？",
       "vi": "A: Cô bé mặc áo đỏ kia là chị hay em?",
       "py": "A: Chuān hóngyīfú de nàge nǚháizi shì jiějie háishì mèimei?"
      },
      {
       "hz": "A：她們穿的這兩件衣服都是媽媽做的嗎？",
       "vi": "A: Hai bộ quần áo họ mặc đều do mẹ may à?",
       "py": "A: Tāmen chuān de zhè liǎngjiàn yīfú dōu shì māma zuò de ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "III. 多/少+V (to do something more or less)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to give some suggestions. Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duō hē shuǐ, duō xiūxí,",
     "examples": [
      {
       "hz": "你應該多運動，少喝一點兒酒。",
       "vi": "Bạn nên tập thể dục nhiều hơn, uống ít rượu đi.",
       "py": "Nǐ yīnggāi duō yùndòng, shǎo hē yìdiǎn'ér jiǔ."
      },
      {
       "hz": "我發燒了，醫生跟我說要多喝水、多休息、少看手機。",
       "vi": "Tôi bị sốt, bác sĩ bảo tôi uống nhiều nước, nghỉ ngơi nhiều, ít xem điện thoại.",
       "py": "Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duōhēshuǐ, duō xiūxí, shǎo kàn shǒujī."
      },
      {
       "hz": "我們學習語言，平常應該要多聽、多說、多寫、多練習。",
       "vi": "Khi học ngoại ngữ, bình thường chúng ta nên nghe nhiều, nói nhiều, viết nhiều, luyện tập nhiều.",
       "py": "Wǒmen xuéxí yǔyán, píngcháng yīnggāi yào duō tīng, duō shuō, duō xiě, duō liànxí."
      },
      {
       "hz": "國安在哪裡？他在那裡做什麼？",
       "vi": "Quốc An đang ở đâu? Anh ấy làm gì ở đó?",
       "py": "Guó'ān zài nǎlǐ? Tā zài nàlǐ zuò shénme?"
      },
      {
       "hz": "國安哪裡不舒服？",
       "vi": "Quốc An khó chịu ở đâu?",
       "py": "Guó'ān nǎlǐ bù shūfú?"
      },
      {
       "hz": "醫生說很多人肚子痛，為什麼？",
       "vi": "Bác sĩ nói nhiều người bị đau bụng, tại sao?",
       "py": "Yīshēng shuō hěnduō rén dùzitòng, wèishénme?"
      },
      {
       "hz": "國安需要吃藥嗎？醫生怎麼說？",
       "vi": "Quốc An có cần uống thuốc không? Bác sĩ nói thế nào?",
       "py": "Guó'ān xūyào chīyào ma? Yīshēng zěnme shuō?"
      },
      {
       "hz": "醫生要國安做什麼？",
       "vi": "Bác sĩ bảo Quốc An làm gì?",
       "py": "Yīshēng yào Guó'ān zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "多 / 少 + động từ",
   "giaiThich": "Dùng để khuyên nhủ: 多 + động từ là \"… nhiều lên\", 少 + động từ là \"… bớt đi\"."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”.",
     "examples": [
      {
       "hz": "孩子：媽，妳要幫我買襪子嗎？",
       "vi": "Con: Mẹ ơi, mẹ mua tất giúp con không?",
       "py": "Háizi: Mā, nǐ yào bāng wǒ mǎi wàzi ma?"
      },
      {
       "hz": "媽媽：我今天會去百貨公司幫你買。",
       "vi": "Mẹ: Hôm nay mẹ sẽ đi trung tâm thương mại mua giúp con.",
       "py": "Māma: Wǒ jīntiān huì qù bǎihuògōngsī bāng nǐ mǎi."
      },
      {
       "hz": "老師：你明天要記得帶毛筆來學校。",
       "vi": "Thầy giáo: Ngày mai em nhớ mang bút lông đến trường nhé.",
       "py": "Lǎoshī: Nǐ míngtiān yào jìde dài máobǐ lái xuéxiào."
      },
      {
       "hz": "學生：好，我會帶毛筆來。",
       "vi": "Học sinh: Vâng, em sẽ mang bút lông đến.",
       "py": "Xuéshēng: Hǎo, wǒhuì dài máobǐ lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”. Jīntiān wǎnshàng dàjiā kěyǐ chī hěn duō hǎochī de dōngxi, tā huì lái ma?",
     "examples": [
      {
       "hz": "宜文：國安生病了，明天會來學校考試嗎？",
       "vi": "Nghi Văn: Quốc An ốm rồi, ngày mai có đến trường thi không?",
       "py": "Yíwén: Guó'ān shēngbìng le, míngtiān huì lái xuéxiào kǎoshì ma?"
      },
      {
       "hz": "元真：我也不知道。今天下午我們一起去",
       "vi": "Nguyên Chân: Mình cũng không biết. Chiều nay chúng mình cùng đi",
       "py": "Yuánzhēn: Wǒ yě bù zhīdào. Jīntiānxiàwǔ wǒmen yìqǐ qù"
      },
      {
       "hz": "A：明天你要怎麼去老師家？",
       "vi": "A: Ngày mai bạn đến nhà thầy giáo bằng cách nào?",
       "py": "A: Míngtiān nǐ yào zěnme qù lǎoshī jiā?"
      },
      {
       "hz": "A：今天晚上大家可以吃很多好吃的東西，她會來嗎？",
       "vi": "A: Tối nay mọi người được ăn nhiều món ngon, cô ấy có đến không?",
       "py": "A: Jīntiān wǎnshàng dàjiā kěyǐ chī hěnduō hǎochī de dōngxī, tā huì lái ma?"
      },
      {
       "hz": "A：後天我們要去打棒球，會下雨嗎？",
       "vi": "A: Ngày kia chúng ta đi chơi bóng chày, trời có mưa không?",
       "py": "A: Hòutiān wǒmen yào qù dǎ bàngqiú, huì xiàyǔ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "II. 如果/要是……,就…… (If…, then…)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted. Rúguǒ míngtiān yào lái de rén hěn duō, wǒ jiù duō mǎi yìdiǎnr yǐnliào gēn dàngāo. This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted.",
     "examples": [
      {
       "hz": "如果明天天氣不好，我們就不要去游泳了。",
       "vi": "Nếu ngày mai thời tiết không tốt, chúng ta sẽ không đi bơi nữa.",
       "py": "Rúguǒ míngtiān tiānqì bùhǎo, wǒmen jiù búyào qù yóuyǒng le."
      },
      {
       "hz": "不要去了。",
       "vi": "Đừng đi nữa.",
       "py": "Búyào qù le."
      },
      {
       "hz": "多吃一點吧！",
       "vi": "Ăn thêm chút nữa đi!",
       "py": "Duō chī yìdiǎn ba!"
      },
      {
       "hz": "如果明天要來的人很多，我就多買一點兒飲料跟蛋糕。",
       "vi": "Nếu ngày mai có nhiều người đến, tôi sẽ mua thêm một ít đồ uống và bánh kem.",
       "py": "Rúguǒ míngtiān yào lái de rén hěnduō, wǒ jiù duō mǎi yìdiǎn'ér yǐnliào gēn dàngāo."
      },
      {
       "hz": "要是我有車，就可以開車去上課。",
       "vi": "Nếu tôi có xe thì có thể lái xe đi học.",
       "py": "Yàoshì wǒ yǒu chē, jiù kěyǐ kāichē qù shàngkè."
      },
      {
       "hz": "A：要是你有很多錢，你想做什麼？",
       "vi": "A: Nếu bạn có rất nhiều tiền, bạn muốn làm gì?",
       "py": "A: Yàoshì nǐ yǒu hěnduō qián, nǐ xiǎng zuò shénme?"
      },
      {
       "hz": "A：如果你的手機不能上網，你會怎麼做？",
       "vi": "A: Nếu điện thoại của bạn không lên mạng được, bạn sẽ làm thế nào?",
       "py": "A: Rúguǒ nǐ de shǒujī bùnéng shàngwǎng, nǐ huì zěnme zuò?"
      },
      {
       "hz": "A：要是你想多練習中文，你會怎麼做？",
       "vi": "A: Nếu bạn muốn luyện tiếng Trung nhiều hơn, bạn sẽ làm thế nào?",
       "py": "A: Yàoshì nǐ xiǎng duō liànxí zhōngwén, nǐ huì zěnme zuò?"
      },
      {
       "hz": "這個短文是誰寫的？她為什麼擔心國安？",
       "vi": "Bài văn ngắn này do ai viết? Tại sao cô ấy lo cho Quốc An?",
       "py": "Zhège duǎnwén shì shéi xiě de? Tā wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "她告訴國安應該做什麼？國安怎麼說？",
       "vi": "Cô ấy bảo Quốc An nên làm gì? Quốc An nói thế nào?",
       "py": "Tā gàosù Guó'ān yīnggāi zuò shénme? Guó'ān zěnme shuō?"
      },
      {
       "hz": "她今天要做什麼？",
       "vi": "Hôm nay cô ấy phải làm gì?",
       "py": "Tā jīntiān yào zuò shénme?"
      },
      {
       "hz": "我為什麼擔心國安？",
       "vi": "Tại sao tôi lo cho Quốc An?",
       "py": "Wǒ wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "我請國安做什麼？",
       "vi": "Tôi nhờ Quốc An làm gì?",
       "py": "Wǒ qǐng Guó'ān zuò shénme?"
      },
      {
       "hz": "國安怎麼做？",
       "vi": "Quốc An làm thế nào?",
       "py": "Guó'ān zěnme zuò?"
      },
      {
       "hz": "我今天要做什麼？",
       "vi": "Hôm nay tôi phải làm gì?",
       "py": "Wǒ jīntiān yào zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "如果 / 要是……, 就…… — nếu… thì…",
   "giaiThich": "如果 hoặc 要是 nêu giả thiết (vế trước), 就 nêu kết quả (vế sau). Cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  }
 ],
 "td1-10.2": [
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我喜歡跟家人去海邊玩。",
       "vi": "Tôi thích đi biển chơi với gia đình.",
       "py": "Wǒ xǐhuān gēn jiārén qù hǎibiān wán."
      },
      {
       "hz": "今天晚上我要跟朋友吃飯。",
       "vi": "Tối nay tôi sẽ ăn cơm với bạn.",
       "py": "Jīntiān wǎnshàng wǒ yào gēn péngyǒu chīfàn."
      },
      {
       "hz": "我常常跟他一起去百貨公司買東西。",
       "vi": "Tôi thường cùng anh ấy đi trung tâm thương mại mua đồ.",
       "py": "Wǒ chángcháng gēn tā yìqǐ qù bǎihuògōngsī mǎi dōngxī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng yì qiān liǎng bǎi kuài qián.” Wǒ míngtiān bù néng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià. When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "他跟家人說英文，跟同學說中文。",
       "vi": "Anh ấy nói tiếng Anh với gia đình, nói tiếng Trung với bạn học.",
       "py": "Tā gēn jiārén shuō yīngwén, gēn tóngxué shuō zhōngwén."
      },
      {
       "hz": "計程車司機跟我說：「去機場1200塊錢。」3.我明天不能來上課，今天要先跟老師請假。",
       "vi": "Tài xế taxi nói với tôi: “Đi sân bay 1200 đồng.” Ngày mai tôi không đến lớp được, hôm nay phải xin phép thầy giáo trước.",
       "py": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng 1200 kuàiqián.” 3. Wǒ míngtiān bùnéng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我跟李老師學書法。",
       "vi": "Tôi học thư pháp với thầy Lý.",
       "py": "Wǒ gēn Lǐ lǎoshī xué shūfǎ."
      },
      {
       "hz": "他二十歲了，不跟爸媽要錢了。",
       "vi": "Anh ấy hai mươi tuổi rồi, không xin tiền bố mẹ nữa.",
       "py": "Tā èrshísuì le, bù gēn bàmā yàoqián le."
      },
      {
       "hz": "我不想跟朋友買舊車，我想買新車。",
       "vi": "Tôi không muốn mua xe cũ của bạn, tôi muốn mua xe mới.",
       "py": "Wǒ bùxiǎng gēn péngyǒu mǎi jiùchē, wǒ xiǎng mǎi xīnchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": "This pattern is a phrase with a modifying clause and a noun. 的 is placed between the clause and the noun. The noun is the main part of this pattern and is placed at the end of it.",
     "examples": [
      {
       "hz": "媽媽買的蘋果非常好吃。",
       "vi": "Táo mẹ mua cực kỳ ngon.",
       "py": "Māma mǎi de píngguǒ fēicháng hǎochī."
      },
      {
       "hz": "他唱的歌很好聽，是哪國歌？",
       "vi": "Bài hát anh ấy hát rất hay, là bài hát của nước nào?",
       "py": "Tā chàngdegē hěn hǎotīng, shì nǎ guógē?"
      },
      {
       "hz": "我不懂他們說的話，你懂嗎？",
       "vi": "Tôi không hiểu lời họ nói, bạn có hiểu không?",
       "py": "Wǒ bù dǒng tāmen shuō dehuà, nǐ dǒngma?"
      },
      {
       "hz": "A：他看的書難不難？",
       "vi": "A: Sách anh ấy đọc có khó không?",
       "py": "A: Tā kàn de shū nán bùnán?"
      },
      {
       "hz": "A：他戴的眼鏡怎麼樣？",
       "vi": "A: Cặp kính anh ấy đeo thế nào?",
       "py": "A: Tā dài de yǎnjìng zěnmeyàng?"
      },
      {
       "hz": "A：你喜歡吃他做的牛肉麵嗎？",
       "vi": "A: Bạn có thích ăn mì bò anh ấy nấu không?",
       "py": "A: Nǐ xǐhuān chī tā zuò de niúròumiàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在台北坐捷運的人很多。",
       "vi": "Ở Đài Bắc, người đi tàu điện ngầm rất đông.",
       "py": "Zài Táiběi zuò jiéyùn de rén hěnduō."
      },
      {
       "hz": "會說中文的人不一定會教中文。",
       "vi": "Người biết nói tiếng Trung chưa chắc đã biết dạy tiếng Trung.",
       "py": "Huì shuō zhōngwén de rén bù yídìng huì jiào zhōngwén."
      },
      {
       "hz": "常常生病的人要注意身體健康。",
       "vi": "Người hay ốm cần chú ý giữ gìn sức khoẻ.",
       "py": "Chángcháng shēngbìng de rén yào zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "A：愛唱歌的人一定愛聽音樂嗎？",
       "vi": "A: Người thích ca hát thì nhất định thích nghe nhạc à?",
       "py": "A: Ài chànggē de rén yídìng ài tīng yīnyuè ma?"
      },
      {
       "hz": "A：常常上網的學生都不喜歡看書嗎？",
       "vi": "A: Học sinh hay lên mạng đều không thích đọc sách à?",
       "py": "A: Chángcháng shàngwǎng de xuéshēng dōu bù xǐhuān kànshū ma?"
      },
      {
       "hz": "A：喜歡去海邊游泳的人不怕曬太陽嗎？",
       "vi": "A: Người thích đi biển bơi không sợ nắng à?",
       "py": "A: Xǐhuān qù hǎibiān yóuyǒng de rén búpà shàitàiyáng ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我太太買的那件衣服好貴！",
       "vi": "Bộ quần áo vợ tôi mua đắt thật!",
       "py": "Wǒ tàitai mǎi de nà jiàn yīfú hǎo guì!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在跳舞的那些學生都是我的朋友。",
       "vi": "Những học sinh đang nhảy kia đều là bạn tôi.",
       "py": "Zài tiàowǔ de nàxiē xuéshēng dōu shì wǒ de péngyǒu."
      },
      {
       "hz": "你問的這兩個問題都非常難。",
       "vi": "Hai câu hỏi bạn hỏi đều cực kỳ khó.",
       "py": "Nǐ wèn de zhè liǎnggè wèntí dōu fēicháng nán."
      },
      {
       "hz": "A：她們吃的這些點心，你也想吃嗎？",
       "vi": "A: Những món điểm tâm họ đang ăn, bạn cũng muốn ăn à?",
       "py": "A: Tāmen chī de zhèxiē diǎnxīn, nǐ yě xiǎng chī ma?"
      },
      {
       "hz": "A：穿紅衣服的那個女孩子是姐姐還是妹妹？",
       "vi": "A: Cô bé mặc áo đỏ kia là chị hay em?",
       "py": "A: Chuān hóngyīfú de nàge nǚháizi shì jiějie háishì mèimei?"
      },
      {
       "hz": "A：她們穿的這兩件衣服都是媽媽做的嗎？",
       "vi": "A: Hai bộ quần áo họ mặc đều do mẹ may à?",
       "py": "A: Tāmen chuān de zhè liǎngjiàn yīfú dōu shì māma zuò de ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "III. 多/少+V (to do something more or less)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to give some suggestions. Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duō hē shuǐ, duō xiūxí,",
     "examples": [
      {
       "hz": "你應該多運動，少喝一點兒酒。",
       "vi": "Bạn nên tập thể dục nhiều hơn, uống ít rượu đi.",
       "py": "Nǐ yīnggāi duō yùndòng, shǎo hē yìdiǎn'ér jiǔ."
      },
      {
       "hz": "我發燒了，醫生跟我說要多喝水、多休息、少看手機。",
       "vi": "Tôi bị sốt, bác sĩ bảo tôi uống nhiều nước, nghỉ ngơi nhiều, ít xem điện thoại.",
       "py": "Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duōhēshuǐ, duō xiūxí, shǎo kàn shǒujī."
      },
      {
       "hz": "我們學習語言，平常應該要多聽、多說、多寫、多練習。",
       "vi": "Khi học ngoại ngữ, bình thường chúng ta nên nghe nhiều, nói nhiều, viết nhiều, luyện tập nhiều.",
       "py": "Wǒmen xuéxí yǔyán, píngcháng yīnggāi yào duō tīng, duō shuō, duō xiě, duō liànxí."
      },
      {
       "hz": "國安在哪裡？他在那裡做什麼？",
       "vi": "Quốc An đang ở đâu? Anh ấy làm gì ở đó?",
       "py": "Guó'ān zài nǎlǐ? Tā zài nàlǐ zuò shénme?"
      },
      {
       "hz": "國安哪裡不舒服？",
       "vi": "Quốc An khó chịu ở đâu?",
       "py": "Guó'ān nǎlǐ bù shūfú?"
      },
      {
       "hz": "醫生說很多人肚子痛，為什麼？",
       "vi": "Bác sĩ nói nhiều người bị đau bụng, tại sao?",
       "py": "Yīshēng shuō hěnduō rén dùzitòng, wèishénme?"
      },
      {
       "hz": "國安需要吃藥嗎？醫生怎麼說？",
       "vi": "Quốc An có cần uống thuốc không? Bác sĩ nói thế nào?",
       "py": "Guó'ān xūyào chīyào ma? Yīshēng zěnme shuō?"
      },
      {
       "hz": "醫生要國安做什麼？",
       "vi": "Bác sĩ bảo Quốc An làm gì?",
       "py": "Yīshēng yào Guó'ān zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "多 / 少 + động từ",
   "giaiThich": "Dùng để khuyên nhủ: 多 + động từ là \"… nhiều lên\", 少 + động từ là \"… bớt đi\"."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”.",
     "examples": [
      {
       "hz": "孩子：媽，妳要幫我買襪子嗎？",
       "vi": "Con: Mẹ ơi, mẹ mua tất giúp con không?",
       "py": "Háizi: Mā, nǐ yào bāng wǒ mǎi wàzi ma?"
      },
      {
       "hz": "媽媽：我今天會去百貨公司幫你買。",
       "vi": "Mẹ: Hôm nay mẹ sẽ đi trung tâm thương mại mua giúp con.",
       "py": "Māma: Wǒ jīntiān huì qù bǎihuògōngsī bāng nǐ mǎi."
      },
      {
       "hz": "老師：你明天要記得帶毛筆來學校。",
       "vi": "Thầy giáo: Ngày mai em nhớ mang bút lông đến trường nhé.",
       "py": "Lǎoshī: Nǐ míngtiān yào jìde dài máobǐ lái xuéxiào."
      },
      {
       "hz": "學生：好，我會帶毛筆來。",
       "vi": "Học sinh: Vâng, em sẽ mang bút lông đến.",
       "py": "Xuéshēng: Hǎo, wǒhuì dài máobǐ lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”. Jīntiān wǎnshàng dàjiā kěyǐ chī hěn duō hǎochī de dōngxi, tā huì lái ma?",
     "examples": [
      {
       "hz": "宜文：國安生病了，明天會來學校考試嗎？",
       "vi": "Nghi Văn: Quốc An ốm rồi, ngày mai có đến trường thi không?",
       "py": "Yíwén: Guó'ān shēngbìng le, míngtiān huì lái xuéxiào kǎoshì ma?"
      },
      {
       "hz": "元真：我也不知道。今天下午我們一起去",
       "vi": "Nguyên Chân: Mình cũng không biết. Chiều nay chúng mình cùng đi",
       "py": "Yuánzhēn: Wǒ yě bù zhīdào. Jīntiānxiàwǔ wǒmen yìqǐ qù"
      },
      {
       "hz": "A：明天你要怎麼去老師家？",
       "vi": "A: Ngày mai bạn đến nhà thầy giáo bằng cách nào?",
       "py": "A: Míngtiān nǐ yào zěnme qù lǎoshī jiā?"
      },
      {
       "hz": "A：今天晚上大家可以吃很多好吃的東西，她會來嗎？",
       "vi": "A: Tối nay mọi người được ăn nhiều món ngon, cô ấy có đến không?",
       "py": "A: Jīntiān wǎnshàng dàjiā kěyǐ chī hěnduō hǎochī de dōngxī, tā huì lái ma?"
      },
      {
       "hz": "A：後天我們要去打棒球，會下雨嗎？",
       "vi": "A: Ngày kia chúng ta đi chơi bóng chày, trời có mưa không?",
       "py": "A: Hòutiān wǒmen yào qù dǎ bàngqiú, huì xiàyǔ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "II. 如果/要是……,就…… (If…, then…)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted. Rúguǒ míngtiān yào lái de rén hěn duō, wǒ jiù duō mǎi yìdiǎnr yǐnliào gēn dàngāo. This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted.",
     "examples": [
      {
       "hz": "如果明天天氣不好，我們就不要去游泳了。",
       "vi": "Nếu ngày mai thời tiết không tốt, chúng ta sẽ không đi bơi nữa.",
       "py": "Rúguǒ míngtiān tiānqì bùhǎo, wǒmen jiù búyào qù yóuyǒng le."
      },
      {
       "hz": "不要去了。",
       "vi": "Đừng đi nữa.",
       "py": "Búyào qù le."
      },
      {
       "hz": "多吃一點吧！",
       "vi": "Ăn thêm chút nữa đi!",
       "py": "Duō chī yìdiǎn ba!"
      },
      {
       "hz": "如果明天要來的人很多，我就多買一點兒飲料跟蛋糕。",
       "vi": "Nếu ngày mai có nhiều người đến, tôi sẽ mua thêm một ít đồ uống và bánh kem.",
       "py": "Rúguǒ míngtiān yào lái de rén hěnduō, wǒ jiù duō mǎi yìdiǎn'ér yǐnliào gēn dàngāo."
      },
      {
       "hz": "要是我有車，就可以開車去上課。",
       "vi": "Nếu tôi có xe thì có thể lái xe đi học.",
       "py": "Yàoshì wǒ yǒu chē, jiù kěyǐ kāichē qù shàngkè."
      },
      {
       "hz": "A：要是你有很多錢，你想做什麼？",
       "vi": "A: Nếu bạn có rất nhiều tiền, bạn muốn làm gì?",
       "py": "A: Yàoshì nǐ yǒu hěnduō qián, nǐ xiǎng zuò shénme?"
      },
      {
       "hz": "A：如果你的手機不能上網，你會怎麼做？",
       "vi": "A: Nếu điện thoại của bạn không lên mạng được, bạn sẽ làm thế nào?",
       "py": "A: Rúguǒ nǐ de shǒujī bùnéng shàngwǎng, nǐ huì zěnme zuò?"
      },
      {
       "hz": "A：要是你想多練習中文，你會怎麼做？",
       "vi": "A: Nếu bạn muốn luyện tiếng Trung nhiều hơn, bạn sẽ làm thế nào?",
       "py": "A: Yàoshì nǐ xiǎng duō liànxí zhōngwén, nǐ huì zěnme zuò?"
      },
      {
       "hz": "這個短文是誰寫的？她為什麼擔心國安？",
       "vi": "Bài văn ngắn này do ai viết? Tại sao cô ấy lo cho Quốc An?",
       "py": "Zhège duǎnwén shì shéi xiě de? Tā wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "她告訴國安應該做什麼？國安怎麼說？",
       "vi": "Cô ấy bảo Quốc An nên làm gì? Quốc An nói thế nào?",
       "py": "Tā gàosù Guó'ān yīnggāi zuò shénme? Guó'ān zěnme shuō?"
      },
      {
       "hz": "她今天要做什麼？",
       "vi": "Hôm nay cô ấy phải làm gì?",
       "py": "Tā jīntiān yào zuò shénme?"
      },
      {
       "hz": "我為什麼擔心國安？",
       "vi": "Tại sao tôi lo cho Quốc An?",
       "py": "Wǒ wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "我請國安做什麼？",
       "vi": "Tôi nhờ Quốc An làm gì?",
       "py": "Wǒ qǐng Guó'ān zuò shénme?"
      },
      {
       "hz": "國安怎麼做？",
       "vi": "Quốc An làm thế nào?",
       "py": "Guó'ān zěnme zuò?"
      },
      {
       "hz": "我今天要做什麼？",
       "vi": "Hôm nay tôi phải làm gì?",
       "py": "Wǒ jīntiān yào zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "如果 / 要是……, 就…… — nếu… thì…",
   "giaiThich": "如果 hoặc 要是 nêu giả thiết (vế trước), 就 nêu kết quả (vế sau). Cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  }
 ],
 "td1-10.3": [
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我喜歡跟家人去海邊玩。",
       "vi": "Tôi thích đi biển chơi với gia đình.",
       "py": "Wǒ xǐhuān gēn jiārén qù hǎibiān wán."
      },
      {
       "hz": "今天晚上我要跟朋友吃飯。",
       "vi": "Tối nay tôi sẽ ăn cơm với bạn.",
       "py": "Jīntiān wǎnshàng wǒ yào gēn péngyǒu chīfàn."
      },
      {
       "hz": "我常常跟他一起去百貨公司買東西。",
       "vi": "Tôi thường cùng anh ấy đi trung tâm thương mại mua đồ.",
       "py": "Wǒ chángcháng gēn tā yìqǐ qù bǎihuògōngsī mǎi dōngxī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng yì qiān liǎng bǎi kuài qián.” Wǒ míngtiān bù néng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià. When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "他跟家人說英文，跟同學說中文。",
       "vi": "Anh ấy nói tiếng Anh với gia đình, nói tiếng Trung với bạn học.",
       "py": "Tā gēn jiārén shuō yīngwén, gēn tóngxué shuō zhōngwén."
      },
      {
       "hz": "計程車司機跟我說：「去機場1200塊錢。」3.我明天不能來上課，今天要先跟老師請假。",
       "vi": "Tài xế taxi nói với tôi: “Đi sân bay 1200 đồng.” Ngày mai tôi không đến lớp được, hôm nay phải xin phép thầy giáo trước.",
       "py": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng 1200 kuàiqián.” 3. Wǒ míngtiān bùnéng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我跟李老師學書法。",
       "vi": "Tôi học thư pháp với thầy Lý.",
       "py": "Wǒ gēn Lǐ lǎoshī xué shūfǎ."
      },
      {
       "hz": "他二十歲了，不跟爸媽要錢了。",
       "vi": "Anh ấy hai mươi tuổi rồi, không xin tiền bố mẹ nữa.",
       "py": "Tā èrshísuì le, bù gēn bàmā yàoqián le."
      },
      {
       "hz": "我不想跟朋友買舊車，我想買新車。",
       "vi": "Tôi không muốn mua xe cũ của bạn, tôi muốn mua xe mới.",
       "py": "Wǒ bùxiǎng gēn péngyǒu mǎi jiùchē, wǒ xiǎng mǎi xīnchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": "This pattern is a phrase with a modifying clause and a noun. 的 is placed between the clause and the noun. The noun is the main part of this pattern and is placed at the end of it.",
     "examples": [
      {
       "hz": "媽媽買的蘋果非常好吃。",
       "vi": "Táo mẹ mua cực kỳ ngon.",
       "py": "Māma mǎi de píngguǒ fēicháng hǎochī."
      },
      {
       "hz": "他唱的歌很好聽，是哪國歌？",
       "vi": "Bài hát anh ấy hát rất hay, là bài hát của nước nào?",
       "py": "Tā chàngdegē hěn hǎotīng, shì nǎ guógē?"
      },
      {
       "hz": "我不懂他們說的話，你懂嗎？",
       "vi": "Tôi không hiểu lời họ nói, bạn có hiểu không?",
       "py": "Wǒ bù dǒng tāmen shuō dehuà, nǐ dǒngma?"
      },
      {
       "hz": "A：他看的書難不難？",
       "vi": "A: Sách anh ấy đọc có khó không?",
       "py": "A: Tā kàn de shū nán bùnán?"
      },
      {
       "hz": "A：他戴的眼鏡怎麼樣？",
       "vi": "A: Cặp kính anh ấy đeo thế nào?",
       "py": "A: Tā dài de yǎnjìng zěnmeyàng?"
      },
      {
       "hz": "A：你喜歡吃他做的牛肉麵嗎？",
       "vi": "A: Bạn có thích ăn mì bò anh ấy nấu không?",
       "py": "A: Nǐ xǐhuān chī tā zuò de niúròumiàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在台北坐捷運的人很多。",
       "vi": "Ở Đài Bắc, người đi tàu điện ngầm rất đông.",
       "py": "Zài Táiběi zuò jiéyùn de rén hěnduō."
      },
      {
       "hz": "會說中文的人不一定會教中文。",
       "vi": "Người biết nói tiếng Trung chưa chắc đã biết dạy tiếng Trung.",
       "py": "Huì shuō zhōngwén de rén bù yídìng huì jiào zhōngwén."
      },
      {
       "hz": "常常生病的人要注意身體健康。",
       "vi": "Người hay ốm cần chú ý giữ gìn sức khoẻ.",
       "py": "Chángcháng shēngbìng de rén yào zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "A：愛唱歌的人一定愛聽音樂嗎？",
       "vi": "A: Người thích ca hát thì nhất định thích nghe nhạc à?",
       "py": "A: Ài chànggē de rén yídìng ài tīng yīnyuè ma?"
      },
      {
       "hz": "A：常常上網的學生都不喜歡看書嗎？",
       "vi": "A: Học sinh hay lên mạng đều không thích đọc sách à?",
       "py": "A: Chángcháng shàngwǎng de xuéshēng dōu bù xǐhuān kànshū ma?"
      },
      {
       "hz": "A：喜歡去海邊游泳的人不怕曬太陽嗎？",
       "vi": "A: Người thích đi biển bơi không sợ nắng à?",
       "py": "A: Xǐhuān qù hǎibiān yóuyǒng de rén búpà shàitàiyáng ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我太太買的那件衣服好貴！",
       "vi": "Bộ quần áo vợ tôi mua đắt thật!",
       "py": "Wǒ tàitai mǎi de nà jiàn yīfú hǎo guì!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在跳舞的那些學生都是我的朋友。",
       "vi": "Những học sinh đang nhảy kia đều là bạn tôi.",
       "py": "Zài tiàowǔ de nàxiē xuéshēng dōu shì wǒ de péngyǒu."
      },
      {
       "hz": "你問的這兩個問題都非常難。",
       "vi": "Hai câu hỏi bạn hỏi đều cực kỳ khó.",
       "py": "Nǐ wèn de zhè liǎnggè wèntí dōu fēicháng nán."
      },
      {
       "hz": "A：她們吃的這些點心，你也想吃嗎？",
       "vi": "A: Những món điểm tâm họ đang ăn, bạn cũng muốn ăn à?",
       "py": "A: Tāmen chī de zhèxiē diǎnxīn, nǐ yě xiǎng chī ma?"
      },
      {
       "hz": "A：穿紅衣服的那個女孩子是姐姐還是妹妹？",
       "vi": "A: Cô bé mặc áo đỏ kia là chị hay em?",
       "py": "A: Chuān hóngyīfú de nàge nǚháizi shì jiějie háishì mèimei?"
      },
      {
       "hz": "A：她們穿的這兩件衣服都是媽媽做的嗎？",
       "vi": "A: Hai bộ quần áo họ mặc đều do mẹ may à?",
       "py": "A: Tāmen chuān de zhè liǎngjiàn yīfú dōu shì māma zuò de ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "III. 多/少+V (to do something more or less)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to give some suggestions. Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duō hē shuǐ, duō xiūxí,",
     "examples": [
      {
       "hz": "你應該多運動，少喝一點兒酒。",
       "vi": "Bạn nên tập thể dục nhiều hơn, uống ít rượu đi.",
       "py": "Nǐ yīnggāi duō yùndòng, shǎo hē yìdiǎn'ér jiǔ."
      },
      {
       "hz": "我發燒了，醫生跟我說要多喝水、多休息、少看手機。",
       "vi": "Tôi bị sốt, bác sĩ bảo tôi uống nhiều nước, nghỉ ngơi nhiều, ít xem điện thoại.",
       "py": "Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duōhēshuǐ, duō xiūxí, shǎo kàn shǒujī."
      },
      {
       "hz": "我們學習語言，平常應該要多聽、多說、多寫、多練習。",
       "vi": "Khi học ngoại ngữ, bình thường chúng ta nên nghe nhiều, nói nhiều, viết nhiều, luyện tập nhiều.",
       "py": "Wǒmen xuéxí yǔyán, píngcháng yīnggāi yào duō tīng, duō shuō, duō xiě, duō liànxí."
      },
      {
       "hz": "國安在哪裡？他在那裡做什麼？",
       "vi": "Quốc An đang ở đâu? Anh ấy làm gì ở đó?",
       "py": "Guó'ān zài nǎlǐ? Tā zài nàlǐ zuò shénme?"
      },
      {
       "hz": "國安哪裡不舒服？",
       "vi": "Quốc An khó chịu ở đâu?",
       "py": "Guó'ān nǎlǐ bù shūfú?"
      },
      {
       "hz": "醫生說很多人肚子痛，為什麼？",
       "vi": "Bác sĩ nói nhiều người bị đau bụng, tại sao?",
       "py": "Yīshēng shuō hěnduō rén dùzitòng, wèishénme?"
      },
      {
       "hz": "國安需要吃藥嗎？醫生怎麼說？",
       "vi": "Quốc An có cần uống thuốc không? Bác sĩ nói thế nào?",
       "py": "Guó'ān xūyào chīyào ma? Yīshēng zěnme shuō?"
      },
      {
       "hz": "醫生要國安做什麼？",
       "vi": "Bác sĩ bảo Quốc An làm gì?",
       "py": "Yīshēng yào Guó'ān zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "多 / 少 + động từ",
   "giaiThich": "Dùng để khuyên nhủ: 多 + động từ là \"… nhiều lên\", 少 + động từ là \"… bớt đi\"."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”.",
     "examples": [
      {
       "hz": "孩子：媽，妳要幫我買襪子嗎？",
       "vi": "Con: Mẹ ơi, mẹ mua tất giúp con không?",
       "py": "Háizi: Mā, nǐ yào bāng wǒ mǎi wàzi ma?"
      },
      {
       "hz": "媽媽：我今天會去百貨公司幫你買。",
       "vi": "Mẹ: Hôm nay mẹ sẽ đi trung tâm thương mại mua giúp con.",
       "py": "Māma: Wǒ jīntiān huì qù bǎihuògōngsī bāng nǐ mǎi."
      },
      {
       "hz": "老師：你明天要記得帶毛筆來學校。",
       "vi": "Thầy giáo: Ngày mai em nhớ mang bút lông đến trường nhé.",
       "py": "Lǎoshī: Nǐ míngtiān yào jìde dài máobǐ lái xuéxiào."
      },
      {
       "hz": "學生：好，我會帶毛筆來。",
       "vi": "Học sinh: Vâng, em sẽ mang bút lông đến.",
       "py": "Xuéshēng: Hǎo, wǒhuì dài máobǐ lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”. Jīntiān wǎnshàng dàjiā kěyǐ chī hěn duō hǎochī de dōngxi, tā huì lái ma?",
     "examples": [
      {
       "hz": "宜文：國安生病了，明天會來學校考試嗎？",
       "vi": "Nghi Văn: Quốc An ốm rồi, ngày mai có đến trường thi không?",
       "py": "Yíwén: Guó'ān shēngbìng le, míngtiān huì lái xuéxiào kǎoshì ma?"
      },
      {
       "hz": "元真：我也不知道。今天下午我們一起去",
       "vi": "Nguyên Chân: Mình cũng không biết. Chiều nay chúng mình cùng đi",
       "py": "Yuánzhēn: Wǒ yě bù zhīdào. Jīntiānxiàwǔ wǒmen yìqǐ qù"
      },
      {
       "hz": "A：明天你要怎麼去老師家？",
       "vi": "A: Ngày mai bạn đến nhà thầy giáo bằng cách nào?",
       "py": "A: Míngtiān nǐ yào zěnme qù lǎoshī jiā?"
      },
      {
       "hz": "A：今天晚上大家可以吃很多好吃的東西，她會來嗎？",
       "vi": "A: Tối nay mọi người được ăn nhiều món ngon, cô ấy có đến không?",
       "py": "A: Jīntiān wǎnshàng dàjiā kěyǐ chī hěnduō hǎochī de dōngxī, tā huì lái ma?"
      },
      {
       "hz": "A：後天我們要去打棒球，會下雨嗎？",
       "vi": "A: Ngày kia chúng ta đi chơi bóng chày, trời có mưa không?",
       "py": "A: Hòutiān wǒmen yào qù dǎ bàngqiú, huì xiàyǔ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "II. 如果/要是……,就…… (If…, then…)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted. Rúguǒ míngtiān yào lái de rén hěn duō, wǒ jiù duō mǎi yìdiǎnr yǐnliào gēn dàngāo. This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted.",
     "examples": [
      {
       "hz": "如果明天天氣不好，我們就不要去游泳了。",
       "vi": "Nếu ngày mai thời tiết không tốt, chúng ta sẽ không đi bơi nữa.",
       "py": "Rúguǒ míngtiān tiānqì bùhǎo, wǒmen jiù búyào qù yóuyǒng le."
      },
      {
       "hz": "不要去了。",
       "vi": "Đừng đi nữa.",
       "py": "Búyào qù le."
      },
      {
       "hz": "多吃一點吧！",
       "vi": "Ăn thêm chút nữa đi!",
       "py": "Duō chī yìdiǎn ba!"
      },
      {
       "hz": "如果明天要來的人很多，我就多買一點兒飲料跟蛋糕。",
       "vi": "Nếu ngày mai có nhiều người đến, tôi sẽ mua thêm một ít đồ uống và bánh kem.",
       "py": "Rúguǒ míngtiān yào lái de rén hěnduō, wǒ jiù duō mǎi yìdiǎn'ér yǐnliào gēn dàngāo."
      },
      {
       "hz": "要是我有車，就可以開車去上課。",
       "vi": "Nếu tôi có xe thì có thể lái xe đi học.",
       "py": "Yàoshì wǒ yǒu chē, jiù kěyǐ kāichē qù shàngkè."
      },
      {
       "hz": "A：要是你有很多錢，你想做什麼？",
       "vi": "A: Nếu bạn có rất nhiều tiền, bạn muốn làm gì?",
       "py": "A: Yàoshì nǐ yǒu hěnduō qián, nǐ xiǎng zuò shénme?"
      },
      {
       "hz": "A：如果你的手機不能上網，你會怎麼做？",
       "vi": "A: Nếu điện thoại của bạn không lên mạng được, bạn sẽ làm thế nào?",
       "py": "A: Rúguǒ nǐ de shǒujī bùnéng shàngwǎng, nǐ huì zěnme zuò?"
      },
      {
       "hz": "A：要是你想多練習中文，你會怎麼做？",
       "vi": "A: Nếu bạn muốn luyện tiếng Trung nhiều hơn, bạn sẽ làm thế nào?",
       "py": "A: Yàoshì nǐ xiǎng duō liànxí zhōngwén, nǐ huì zěnme zuò?"
      },
      {
       "hz": "這個短文是誰寫的？她為什麼擔心國安？",
       "vi": "Bài văn ngắn này do ai viết? Tại sao cô ấy lo cho Quốc An?",
       "py": "Zhège duǎnwén shì shéi xiě de? Tā wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "她告訴國安應該做什麼？國安怎麼說？",
       "vi": "Cô ấy bảo Quốc An nên làm gì? Quốc An nói thế nào?",
       "py": "Tā gàosù Guó'ān yīnggāi zuò shénme? Guó'ān zěnme shuō?"
      },
      {
       "hz": "她今天要做什麼？",
       "vi": "Hôm nay cô ấy phải làm gì?",
       "py": "Tā jīntiān yào zuò shénme?"
      },
      {
       "hz": "我為什麼擔心國安？",
       "vi": "Tại sao tôi lo cho Quốc An?",
       "py": "Wǒ wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "我請國安做什麼？",
       "vi": "Tôi nhờ Quốc An làm gì?",
       "py": "Wǒ qǐng Guó'ān zuò shénme?"
      },
      {
       "hz": "國安怎麼做？",
       "vi": "Quốc An làm thế nào?",
       "py": "Guó'ān zěnme zuò?"
      },
      {
       "hz": "我今天要做什麼？",
       "vi": "Hôm nay tôi phải làm gì?",
       "py": "Wǒ jīntiān yào zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "如果 / 要是……, 就…… — nếu… thì…",
   "giaiThich": "如果 hoặc 要是 nêu giả thiết (vế trước), 就 nêu kết quả (vế sau). Cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  }
 ],
 "td1-10.4": [
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我喜歡跟家人去海邊玩。",
       "vi": "Tôi thích đi biển chơi với gia đình.",
       "py": "Wǒ xǐhuān gēn jiārén qù hǎibiān wán."
      },
      {
       "hz": "今天晚上我要跟朋友吃飯。",
       "vi": "Tối nay tôi sẽ ăn cơm với bạn.",
       "py": "Jīntiān wǎnshàng wǒ yào gēn péngyǒu chīfàn."
      },
      {
       "hz": "我常常跟他一起去百貨公司買東西。",
       "vi": "Tôi thường cùng anh ấy đi trung tâm thương mại mua đồ.",
       "py": "Wǒ chángcháng gēn tā yìqǐ qù bǎihuògōngsī mǎi dōngxī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng yì qiān liǎng bǎi kuài qián.” Wǒ míngtiān bù néng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià. When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "他跟家人說英文，跟同學說中文。",
       "vi": "Anh ấy nói tiếng Anh với gia đình, nói tiếng Trung với bạn học.",
       "py": "Tā gēn jiārén shuō yīngwén, gēn tóngxué shuō zhōngwén."
      },
      {
       "hz": "計程車司機跟我說：「去機場1200塊錢。」3.我明天不能來上課，今天要先跟老師請假。",
       "vi": "Tài xế taxi nói với tôi: “Đi sân bay 1200 đồng.” Ngày mai tôi không đến lớp được, hôm nay phải xin phép thầy giáo trước.",
       "py": "Jìchéngchē sījī gēn wǒ shuō: “Qù jīchǎng 1200 kuàiqián.” 3. Wǒ míngtiān bùnéng lái shàngkè, jīntiān yào xiān gēn lǎoshī qǐngjià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "I. 跟 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 跟 is used as a preposition, it precedes a noun (a person). If a Vaux or an adverb is needed in the sentence, it should precede 跟.",
     "examples": [
      {
       "hz": "我跟李老師學書法。",
       "vi": "Tôi học thư pháp với thầy Lý.",
       "py": "Wǒ gēn Lǐ lǎoshī xué shūfǎ."
      },
      {
       "hz": "他二十歲了，不跟爸媽要錢了。",
       "vi": "Anh ấy hai mươi tuổi rồi, không xin tiền bố mẹ nữa.",
       "py": "Tā èrshísuì le, bù gēn bàmā yàoqián le."
      },
      {
       "hz": "我不想跟朋友買舊車，我想買新車。",
       "vi": "Tôi không muốn mua xe cũ của bạn, tôi muốn mua xe mới.",
       "py": "Wǒ bùxiǎng gēn péngyǒu mǎi jiùchē, wǒ xiǎng mǎi xīnchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "跟 làm giới từ",
   "giaiThich": "跟 đứng trước danh từ chỉ người, nghĩa \"với, cùng\". Nếu câu có trợ động từ hoặc phó từ thì chúng đứng TRƯỚC 跟."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": "This pattern is a phrase with a modifying clause and a noun. 的 is placed between the clause and the noun. The noun is the main part of this pattern and is placed at the end of it.",
     "examples": [
      {
       "hz": "媽媽買的蘋果非常好吃。",
       "vi": "Táo mẹ mua cực kỳ ngon.",
       "py": "Māma mǎi de píngguǒ fēicháng hǎochī."
      },
      {
       "hz": "他唱的歌很好聽，是哪國歌？",
       "vi": "Bài hát anh ấy hát rất hay, là bài hát của nước nào?",
       "py": "Tā chàngdegē hěn hǎotīng, shì nǎ guógē?"
      },
      {
       "hz": "我不懂他們說的話，你懂嗎？",
       "vi": "Tôi không hiểu lời họ nói, bạn có hiểu không?",
       "py": "Wǒ bù dǒng tāmen shuō dehuà, nǐ dǒngma?"
      },
      {
       "hz": "A：他看的書難不難？",
       "vi": "A: Sách anh ấy đọc có khó không?",
       "py": "A: Tā kàn de shū nán bùnán?"
      },
      {
       "hz": "A：他戴的眼鏡怎麼樣？",
       "vi": "A: Cặp kính anh ấy đeo thế nào?",
       "py": "A: Tā dài de yǎnjìng zěnmeyàng?"
      },
      {
       "hz": "A：你喜歡吃他做的牛肉麵嗎？",
       "vi": "A: Bạn có thích ăn mì bò anh ấy nấu không?",
       "py": "A: Nǐ xǐhuān chī tā zuò de niúròumiàn ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在台北坐捷運的人很多。",
       "vi": "Ở Đài Bắc, người đi tàu điện ngầm rất đông.",
       "py": "Zài Táiběi zuò jiéyùn de rén hěnduō."
      },
      {
       "hz": "會說中文的人不一定會教中文。",
       "vi": "Người biết nói tiếng Trung chưa chắc đã biết dạy tiếng Trung.",
       "py": "Huì shuō zhōngwén de rén bù yídìng huì jiào zhōngwén."
      },
      {
       "hz": "常常生病的人要注意身體健康。",
       "vi": "Người hay ốm cần chú ý giữ gìn sức khoẻ.",
       "py": "Chángcháng shēngbìng de rén yào zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "A：愛唱歌的人一定愛聽音樂嗎？",
       "vi": "A: Người thích ca hát thì nhất định thích nghe nhạc à?",
       "py": "A: Ài chànggē de rén yídìng ài tīng yīnyuè ma?"
      },
      {
       "hz": "A：常常上網的學生都不喜歡看書嗎？",
       "vi": "A: Học sinh hay lên mạng đều không thích đọc sách à?",
       "py": "A: Chángcháng shàngwǎng de xuéshēng dōu bù xǐhuān kànshū ma?"
      },
      {
       "hz": "A：喜歡去海邊游泳的人不怕曬太陽嗎？",
       "vi": "A: Người thích đi biển bơi không sợ nắng à?",
       "py": "A: Xǐhuān qù hǎibiān yóuyǒng de rén búpà shàitàiyáng ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "我太太買的那件衣服好貴！",
       "vi": "Bộ quần áo vợ tôi mua đắt thật!",
       "py": "Wǒ tàitai mǎi de nà jiàn yīfú hǎo guì!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "II. 的 with Nouns Modified by Clauses",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在跳舞的那些學生都是我的朋友。",
       "vi": "Những học sinh đang nhảy kia đều là bạn tôi.",
       "py": "Zài tiàowǔ de nàxiē xuéshēng dōu shì wǒ de péngyǒu."
      },
      {
       "hz": "你問的這兩個問題都非常難。",
       "vi": "Hai câu hỏi bạn hỏi đều cực kỳ khó.",
       "py": "Nǐ wèn de zhè liǎnggè wèntí dōu fēicháng nán."
      },
      {
       "hz": "A：她們吃的這些點心，你也想吃嗎？",
       "vi": "A: Những món điểm tâm họ đang ăn, bạn cũng muốn ăn à?",
       "py": "A: Tāmen chī de zhèxiē diǎnxīn, nǐ yě xiǎng chī ma?"
      },
      {
       "hz": "A：穿紅衣服的那個女孩子是姐姐還是妹妹？",
       "vi": "A: Cô bé mặc áo đỏ kia là chị hay em?",
       "py": "A: Chuān hóngyīfú de nàge nǚháizi shì jiějie háishì mèimei?"
      },
      {
       "hz": "A：她們穿的這兩件衣服都是媽媽做的嗎？",
       "vi": "A: Hai bộ quần áo họ mặc đều do mẹ may à?",
       "py": "A: Tāmen chuān de zhè liǎngjiàn yīfú dōu shì māma zuò de ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "的 nối mệnh đề với danh từ",
   "giaiThich": "Khi cả một mệnh đề bổ nghĩa cho danh từ, đặt 的 ở giữa; danh từ chính luôn đứng CUỐI cụm."
  },
  {
   "title": "III. 多/少+V (to do something more or less)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to give some suggestions. Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duō hē shuǐ, duō xiūxí,",
     "examples": [
      {
       "hz": "你應該多運動，少喝一點兒酒。",
       "vi": "Bạn nên tập thể dục nhiều hơn, uống ít rượu đi.",
       "py": "Nǐ yīnggāi duō yùndòng, shǎo hē yìdiǎn'ér jiǔ."
      },
      {
       "hz": "我發燒了，醫生跟我說要多喝水、多休息、少看手機。",
       "vi": "Tôi bị sốt, bác sĩ bảo tôi uống nhiều nước, nghỉ ngơi nhiều, ít xem điện thoại.",
       "py": "Wǒ fāshāo le, yīshēng gēn wǒ shuō yào duōhēshuǐ, duō xiūxí, shǎo kàn shǒujī."
      },
      {
       "hz": "我們學習語言，平常應該要多聽、多說、多寫、多練習。",
       "vi": "Khi học ngoại ngữ, bình thường chúng ta nên nghe nhiều, nói nhiều, viết nhiều, luyện tập nhiều.",
       "py": "Wǒmen xuéxí yǔyán, píngcháng yīnggāi yào duō tīng, duō shuō, duō xiě, duō liànxí."
      },
      {
       "hz": "國安在哪裡？他在那裡做什麼？",
       "vi": "Quốc An đang ở đâu? Anh ấy làm gì ở đó?",
       "py": "Guó'ān zài nǎlǐ? Tā zài nàlǐ zuò shénme?"
      },
      {
       "hz": "國安哪裡不舒服？",
       "vi": "Quốc An khó chịu ở đâu?",
       "py": "Guó'ān nǎlǐ bù shūfú?"
      },
      {
       "hz": "醫生說很多人肚子痛，為什麼？",
       "vi": "Bác sĩ nói nhiều người bị đau bụng, tại sao?",
       "py": "Yīshēng shuō hěnduō rén dùzitòng, wèishénme?"
      },
      {
       "hz": "國安需要吃藥嗎？醫生怎麼說？",
       "vi": "Quốc An có cần uống thuốc không? Bác sĩ nói thế nào?",
       "py": "Guó'ān xūyào chīyào ma? Yīshēng zěnme shuō?"
      },
      {
       "hz": "醫生要國安做什麼？",
       "vi": "Bác sĩ bảo Quốc An làm gì?",
       "py": "Yīshēng yào Guó'ān zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "多 / 少 + động từ",
   "giaiThich": "Dùng để khuyên nhủ: 多 + động từ là \"… nhiều lên\", 少 + động từ là \"… bớt đi\"."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”.",
     "examples": [
      {
       "hz": "孩子：媽，妳要幫我買襪子嗎？",
       "vi": "Con: Mẹ ơi, mẹ mua tất giúp con không?",
       "py": "Háizi: Mā, nǐ yào bāng wǒ mǎi wàzi ma?"
      },
      {
       "hz": "媽媽：我今天會去百貨公司幫你買。",
       "vi": "Mẹ: Hôm nay mẹ sẽ đi trung tâm thương mại mua giúp con.",
       "py": "Māma: Wǒ jīntiān huì qù bǎihuògōngsī bāng nǐ mǎi."
      },
      {
       "hz": "老師：你明天要記得帶毛筆來學校。",
       "vi": "Thầy giáo: Ngày mai em nhớ mang bút lông đến trường nhé.",
       "py": "Lǎoshī: Nǐ míngtiān yào jìde dài máobǐ lái xuéxiào."
      },
      {
       "hz": "學生：好，我會帶毛筆來。",
       "vi": "Học sinh: Vâng, em sẽ mang bút lông đến.",
       "py": "Xuéshēng: Hǎo, wǒhuì dài máobǐ lái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "I. 會 Meaning “will”",
   "points": [
    {
     "label": null,
     "formula": "會 can be used as a Vaux which means “will”. Jīntiān wǎnshàng dàjiā kěyǐ chī hěn duō hǎochī de dōngxi, tā huì lái ma?",
     "examples": [
      {
       "hz": "宜文：國安生病了，明天會來學校考試嗎？",
       "vi": "Nghi Văn: Quốc An ốm rồi, ngày mai có đến trường thi không?",
       "py": "Yíwén: Guó'ān shēngbìng le, míngtiān huì lái xuéxiào kǎoshì ma?"
      },
      {
       "hz": "元真：我也不知道。今天下午我們一起去",
       "vi": "Nguyên Chân: Mình cũng không biết. Chiều nay chúng mình cùng đi",
       "py": "Yuánzhēn: Wǒ yě bù zhīdào. Jīntiānxiàwǔ wǒmen yìqǐ qù"
      },
      {
       "hz": "A：明天你要怎麼去老師家？",
       "vi": "A: Ngày mai bạn đến nhà thầy giáo bằng cách nào?",
       "py": "A: Míngtiān nǐ yào zěnme qù lǎoshī jiā?"
      },
      {
       "hz": "A：今天晚上大家可以吃很多好吃的東西，她會來嗎？",
       "vi": "A: Tối nay mọi người được ăn nhiều món ngon, cô ấy có đến không?",
       "py": "A: Jīntiān wǎnshàng dàjiā kěyǐ chī hěnduō hǎochī de dōngxī, tā huì lái ma?"
      },
      {
       "hz": "A：後天我們要去打棒球，會下雨嗎？",
       "vi": "A: Ngày kia chúng ta đi chơi bóng chày, trời có mưa không?",
       "py": "A: Hòutiān wǒmen yào qù dǎ bàngqiú, huì xiàyǔ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會 mang nghĩa \"sẽ\"",
   "giaiThich": "會 làm trợ động từ, diễn đạt việc sẽ xảy ra trong tương lai."
  },
  {
   "title": "II. 如果/要是……,就…… (If…, then…)",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted. Rúguǒ míngtiān yào lái de rén hěn duō, wǒ jiù duō mǎi yìdiǎnr yǐnliào gēn dàngāo. This pattern is used to connect two clauses. The clause with 要是/如果comes first to put forward an assumption, followed by the other one with 就to state the result. If the subject are the same, the second one can be omitted.",
     "examples": [
      {
       "hz": "如果明天天氣不好，我們就不要去游泳了。",
       "vi": "Nếu ngày mai thời tiết không tốt, chúng ta sẽ không đi bơi nữa.",
       "py": "Rúguǒ míngtiān tiānqì bùhǎo, wǒmen jiù búyào qù yóuyǒng le."
      },
      {
       "hz": "不要去了。",
       "vi": "Đừng đi nữa.",
       "py": "Búyào qù le."
      },
      {
       "hz": "多吃一點吧！",
       "vi": "Ăn thêm chút nữa đi!",
       "py": "Duō chī yìdiǎn ba!"
      },
      {
       "hz": "如果明天要來的人很多，我就多買一點兒飲料跟蛋糕。",
       "vi": "Nếu ngày mai có nhiều người đến, tôi sẽ mua thêm một ít đồ uống và bánh kem.",
       "py": "Rúguǒ míngtiān yào lái de rén hěnduō, wǒ jiù duō mǎi yìdiǎn'ér yǐnliào gēn dàngāo."
      },
      {
       "hz": "要是我有車，就可以開車去上課。",
       "vi": "Nếu tôi có xe thì có thể lái xe đi học.",
       "py": "Yàoshì wǒ yǒu chē, jiù kěyǐ kāichē qù shàngkè."
      },
      {
       "hz": "A：要是你有很多錢，你想做什麼？",
       "vi": "A: Nếu bạn có rất nhiều tiền, bạn muốn làm gì?",
       "py": "A: Yàoshì nǐ yǒu hěnduō qián, nǐ xiǎng zuò shénme?"
      },
      {
       "hz": "A：如果你的手機不能上網，你會怎麼做？",
       "vi": "A: Nếu điện thoại của bạn không lên mạng được, bạn sẽ làm thế nào?",
       "py": "A: Rúguǒ nǐ de shǒujī bùnéng shàngwǎng, nǐ huì zěnme zuò?"
      },
      {
       "hz": "A：要是你想多練習中文，你會怎麼做？",
       "vi": "A: Nếu bạn muốn luyện tiếng Trung nhiều hơn, bạn sẽ làm thế nào?",
       "py": "A: Yàoshì nǐ xiǎng duō liànxí zhōngwén, nǐ huì zěnme zuò?"
      },
      {
       "hz": "這個短文是誰寫的？她為什麼擔心國安？",
       "vi": "Bài văn ngắn này do ai viết? Tại sao cô ấy lo cho Quốc An?",
       "py": "Zhège duǎnwén shì shéi xiě de? Tā wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "她告訴國安應該做什麼？國安怎麼說？",
       "vi": "Cô ấy bảo Quốc An nên làm gì? Quốc An nói thế nào?",
       "py": "Tā gàosù Guó'ān yīnggāi zuò shénme? Guó'ān zěnme shuō?"
      },
      {
       "hz": "她今天要做什麼？",
       "vi": "Hôm nay cô ấy phải làm gì?",
       "py": "Tā jīntiān yào zuò shénme?"
      },
      {
       "hz": "我為什麼擔心國安？",
       "vi": "Tại sao tôi lo cho Quốc An?",
       "py": "Wǒ wèishénme dānxīn Guó'ān?"
      },
      {
       "hz": "我請國安做什麼？",
       "vi": "Tôi nhờ Quốc An làm gì?",
       "py": "Wǒ qǐng Guó'ān zuò shénme?"
      },
      {
       "hz": "國安怎麼做？",
       "vi": "Quốc An làm thế nào?",
       "py": "Guó'ān zěnme zuò?"
      },
      {
       "hz": "我今天要做什麼？",
       "vi": "Hôm nay tôi phải làm gì?",
       "py": "Wǒ jīntiān yào zuò shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "如果 / 要是……, 就…… — nếu… thì…",
   "giaiThich": "如果 hoặc 要是 nêu giả thiết (vế trước), 就 nêu kết quả (vế sau). Cùng chủ ngữ thì bỏ chủ ngữ ở vế sau."
  }
 ],
 "td1-11.1": [
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "(1) 了 is placed after Verb (object) for indicating a completed action.",
     "examples": [
      {
       "hz": "他已經去上課了。",
       "vi": "Anh ấy đã đi học rồi.",
       "py": "Tā yǐjīng qù shàngkè le."
      },
      {
       "hz": "我今天早上去看醫生了。",
       "vi": "Sáng nay tôi đã đi khám bác sĩ.",
       "py": "Wǒ jīntiān zǎoshàng qù kàn yīshēng le."
      },
      {
       "hz": "我跟弟弟都寫功課了。",
       "vi": "Tôi và em trai đều đã làm bài tập.",
       "py": "Wǒ gēn dìdi dōu xiě gōngkè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "Bàba yǐjīng mǎi le yí liàng xīn chē le, hái xiǎng zài mǎi yí liàng. Tā hěn ài chī píngguǒ, yǐjīng chī le yí ge le, hái xiǎng zài chī.",
     "examples": [
      {
       "hz": "a. 我上個禮拜學了十個中國字。",
       "vi": "a. Tuần trước tôi đã học mười chữ Hán.",
       "py": "A. Wǒ shàng gè lǐbài xué le shígè Zhōngguó zì."
      },
      {
       "hz": "b.我已經學了四百多個中國字了。",
       "vi": "b. Tôi đã học được hơn bốn trăm chữ Hán rồi.",
       "py": "B. Wǒ yǐjīng xué le sìbǎiduōgè Zhōngguó zì le."
      },
      {
       "hz": "b.爸爸已經買了一輛新車了，還想再買一輛。",
       "vi": "b. Bố đã mua một chiếc xe mới rồi, vẫn còn muốn mua thêm một chiếc nữa.",
       "py": "B. Bàba yǐjīng mǎi le yíliàng xīnchē le, hái xiǎng zài mǎi yíliàng."
      },
      {
       "hz": "a.爸爸上個月買了一輛新車。",
       "vi": "a. Tháng trước bố đã mua một chiếc xe mới.",
       "py": "A. Bàba shànggèyuè mǎi le yíliàng xīnchē."
      },
      {
       "hz": "b.他很愛吃蘋果，已經吃了一個了，還想再吃。",
       "vi": "b. Anh ấy rất thích ăn táo, đã ăn một quả rồi, vẫn còn muốn ăn nữa.",
       "py": "B. Tā hěn ài chī píngguǒ, yǐjīng chī le yígè le, hái xiǎng zài chī."
      },
      {
       "hz": "a.他昨天晚上吃了兩個蘋果。",
       "vi": "a. Tối qua anh ấy đã ăn hai quả táo.",
       "py": "A. Tā zuótiānwǎnshàng chī le liǎnggè píngguǒ."
      },
      {
       "hz": "A:你買電影票了嗎？",
       "vi": "A: Bạn đã mua vé xem phim chưa?",
       "py": "A: Nǐ mǎi diànyǐngpiào le ma?"
      },
      {
       "hz": "下午還要去郵局跟超級市場。",
       "vi": "Buổi chiều còn phải đi bưu điện và siêu thị.",
       "py": "Xiàwǔ háiyào qù yóujú gēn chāojíshìchǎng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "A.沒 is used to negate past actions. B.沒(有) can be at the end of the sentence",
     "examples": [
      {
       "hz": "A:他昨天來了嗎？",
       "vi": "A: Hôm qua anh ấy có đến không?",
       "py": "A: Tā zuótiān lái le ma?"
      },
      {
       "hz": "B:他昨天沒來。",
       "vi": "B: Hôm qua anh ấy không đến.",
       "py": "B: Tā zuótiān méi lái."
      },
      {
       "hz": "B:他沒看書。",
       "vi": "B: Anh ấy không đọc sách.",
       "py": "B: Tā méi kànshū."
      },
      {
       "hz": "A:他看書了沒有？",
       "vi": "A: Anh ấy đã đọc sách chưa?",
       "py": "A: Tā kànshū le méiyǒu?"
      },
      {
       "hz": "B:爸爸沒喝咖啡。",
       "vi": "B: Bố không uống cà phê.",
       "py": "B: Bàba méi hēkāfēi."
      },
      {
       "hz": "A:爸爸喝咖啡了沒？",
       "vi": "A: Bố đã uống cà phê chưa?",
       "py": "A: Bàba hēkāfēi le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "It indicates that the action has not happened but it will probably happen.",
     "examples": [
      {
       "hz": "B:還沒看，我這幾天很忙。",
       "vi": "B: Vẫn chưa đọc, mấy hôm nay tôi rất bận.",
       "py": "B: Hái méi kàn, wǒ zhè jǐtiān hěn máng."
      },
      {
       "hz": "A:老師要你看的書，你看了嗎？",
       "vi": "A: Sách thầy giáo bảo bạn đọc, bạn đọc chưa?",
       "py": "A: Lǎoshī yào nǐ kàn de shū, nǐ kàn le ma?"
      },
      {
       "hz": "B:還沒吃，現在要吃了。",
       "vi": "B: Vẫn chưa ăn, bây giờ sắp ăn rồi.",
       "py": "B: Hái méi chī, xiànzài yào chī le."
      },
      {
       "hz": "A:你今天去看醫生了，那你吃藥了沒有？",
       "vi": "A: Hôm nay bạn đi khám bác sĩ rồi, vậy bạn uống thuốc chưa?",
       "py": "A: Nǐ jīntiān qù kàn yīshēng le, nà nǐ chīyào le méiyǒu?"
      },
      {
       "hz": "B:我不知道，也許也還沒寫。",
       "vi": "B: Tôi không biết, có lẽ cũng chưa viết.",
       "py": "B: Wǒ bù zhīdào, yěxǔ yě hái méi xiě."
      },
      {
       "hz": "A:我們都還沒寫功課，他寫了沒？",
       "vi": "A: Chúng tôi đều chưa làm bài tập, anh ấy làm chưa?",
       "py": "A: Wǒmen dōuháiméi xiě gōngkè, tā xiě le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:他是幾點到的？",
       "vi": "B: Anh ấy đến lúc mấy giờ?",
       "py": "B: Tā shì jǐdiǎn dào de?"
      },
      {
       "hz": "A:他已經到學校了。",
       "vi": "A: Anh ấy đã đến trường rồi.",
       "py": "A: Tā yǐjīng dào xuéxiào le."
      },
      {
       "hz": "A:他是三點三十分到的。",
       "vi": "A: Anh ấy đến lúc ba giờ ba mươi.",
       "py": "A: Tā shì sāndiǎn sānshífēn dào de."
      },
      {
       "hz": "他是昨天晚上到的，不是今天早上到的。",
       "vi": "Anh ấy đến vào tối qua, không phải sáng nay.",
       "py": "Tā shì zuótiānwǎnshàng dào de, búshì jīntiān zǎoshàng dào de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:我在台灣學的。",
       "vi": "B: Tôi học ở Đài Loan.",
       "py": "B: Wǒ zài Táiwān xué de."
      },
      {
       "hz": "A:你的中文說得真好，你是在哪裡學的？",
       "vi": "A: Bạn nói tiếng Trung giỏi thật, bạn học ở đâu vậy?",
       "py": "A: Nǐ de zhōngwén shuō de zhēn hǎo, nǐ shì zài nǎlǐ xué de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:是她媽媽告訴我的。",
       "vi": "B: Là mẹ cô ấy nói cho tôi biết.",
       "py": "B: Shì tā māma gàosù wǒ de."
      },
      {
       "hz": "A:你知道她的手機號碼嗎？是誰告訴你的？",
       "vi": "A: Bạn biết số điện thoại của cô ấy không? Ai nói cho bạn biết?",
       "py": "A: Nǐ zhīdào tā de shǒujīhàomǎ ma? Shì shéi gàosù nǐ de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where,who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence. This pattern expresses that before statement 2 takes place, the subject(s) must wait until statement 1 takes place. Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiāo nǐ, hǎo bù hǎo? 先……，等……，再…… is a pattern used for sequencing events. Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, Nǚér :   Wǒ yào xiān qù péngyǒu jiā, děng bǎihuògōngsī kāi le,",
     "examples": [
      {
       "hz": "B:他是開車來的嗎？",
       "vi": "B: Anh ấy lái xe đến à?",
       "py": "B: Tā shì kāichē lái de ma?"
      },
      {
       "hz": "A:張先生來了。",
       "vi": "A: Anh Trương đến rồi.",
       "py": "A: Zhāng xiānshēng lái le."
      },
      {
       "hz": "A:不是，他是走路來的。",
       "vi": "A: Không, anh ấy đi bộ đến.",
       "py": "A: Búshì, tā shì zǒulù lái de."
      },
      {
       "hz": "A:你看，這是我買的新衣服。",
       "vi": "A: Bạn xem, đây là quần áo mới tôi mua.",
       "py": "A: Nǐ kàn, zhè shì wǒ mǎi de xīn yīfú."
      },
      {
       "hz": "A:我是昨天買的。",
       "vi": "A: Tôi mua hôm qua.",
       "py": "A: Wǒ shì zuótiān mǎi de."
      },
      {
       "hz": "A:我看到他的女朋友了。",
       "vi": "A: Tôi gặp bạn gái của anh ấy rồi.",
       "py": "A: Wǒ kàndào tā de nǚpéngyǒu le."
      },
      {
       "hz": "A:是昨天看到的。",
       "vi": "A: Tôi gặp hôm qua.",
       "py": "A: Shì zuótiān kàndào de."
      },
      {
       "hz": "A:是在學校附近的咖啡廳看到的。",
       "vi": "A: Tôi gặp ở quán cà phê gần trường.",
       "py": "A: Shì zài xuéxiào fùjìn de kāfēitīng kàndào de."
      },
      {
       "hz": "A:聽說元真去台中了，她是哪天去的？",
       "vi": "A: Nghe nói Nguyên Chân đi Đài Trung rồi, cô ấy đi hôm nào?",
       "py": "A: Tīngshuō Yuánzhēn qù Táizhōng le, tā shì nǎ tiān qù de?"
      },
      {
       "hz": "B:她是開車去的。",
       "vi": "B: Cô ấy lái xe đi.",
       "py": "B: Tā shì kāichē qù de."
      },
      {
       "hz": "A:她是跟友美一起去的嗎？",
       "vi": "A: Cô ấy đi cùng Yumi à?",
       "py": "A: Tā shì gēn Yǒuměi yìqǐ qù de ma?"
      },
      {
       "hz": "A:爸爸，這個句子是什麼意思？",
       "vi": "A: Bố ơi, câu này có nghĩa là gì?",
       "py": "A: Bàba, zhège jùzi shì shénme yìsi?"
      },
      {
       "hz": "B:我現在沒空，晚上再告訴你。",
       "vi": "B: Bây giờ bố không rảnh, tối bố nói cho con.",
       "py": "B: Wǒ xiànzài méikòng, wǎnshàng zài gàosù nǐ."
      },
      {
       "hz": "A:你要不要跟我一起去打球？",
       "vi": "A: Bạn có muốn đi chơi bóng với tôi không?",
       "py": "A: Nǐ yào búyào gēn wǒ yìqǐ qù dǎqiú?"
      },
      {
       "hz": "B:我今天有一點兒累，我們週末再去吧。",
       "vi": "B: Hôm nay tôi hơi mệt, cuối tuần chúng ta đi nhé.",
       "py": "B: Wǒ jīntiān yǒu yìdiǎn'ér lèi, wǒmen zhōumò zài qù ba."
      },
      {
       "hz": "天氣太冷了，等車來了，我們再去外面。",
       "vi": "Trời lạnh quá, đợi xe đến rồi chúng ta hãy ra ngoài.",
       "py": "Tiānqì tàilěng le, děng chē lái le, wǒmen zài qù wàimiàn."
      },
      {
       "hz": "A:妳決定買這種茶了嗎？",
       "vi": "A: Chị đã quyết định mua loại trà này chưa?",
       "py": "A: Nǐ juédìng mǎi zhèzhǒng chá le ma?"
      },
      {
       "hz": "B:等我先生也喝了，我們再決定買不買。",
       "vi": "B: Đợi chồng tôi uống thử đã, rồi chúng tôi mới quyết định có mua hay không.",
       "py": "B: Děng wǒ xiānshēng yě hē le, wǒmen zài juédìng mǎi bù mǎi."
      },
      {
       "hz": "A:這個問題很難，你可以教我嗎？",
       "vi": "A: Câu hỏi này khó quá, bạn dạy tôi được không?",
       "py": "A: Zhège wèntí hěn nán, nǐ kěyǐ jiào wǒ ma?"
      },
      {
       "hz": "B:我現在要去上課，等下課了再教你，好不好？",
       "vi": "B: Bây giờ tôi phải đi học, đợi tan học rồi tôi dạy bạn nhé?",
       "py": "B: Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiào nǐ, hǎobùhǎo?"
      },
      {
       "hz": "A:我們一起去吃飯吧。",
       "vi": "A: Chúng ta cùng đi ăn cơm đi.",
       "py": "A: Wǒmen yìqǐ qù chīfàn ba."
      },
      {
       "hz": "一起吃晚飯。",
       "vi": "Cùng ăn tối.",
       "py": "Yìqǐ chīwǎnfàn."
      },
      {
       "hz": "B:現在去吃飯的人太多了，我想先寫功課，等人少了再去吃。",
       "vi": "B: Bây giờ người đi ăn đông quá, tôi muốn làm bài tập trước, đợi vắng người rồi hãy đi ăn.",
       "py": "B: Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, děng rén shǎo le zài qù chī."
      },
      {
       "hz": "A：現在太熱了！",
       "vi": "A: Bây giờ nóng quá!",
       "py": "A: Xiànzài tài rè le!"
      },
      {
       "hz": "B：對啊，我們先去吃冰淇淋，等不熱了，再去海邊玩，好不好？",
       "vi": "B: Đúng vậy, chúng ta đi ăn kem trước, đợi hết nóng rồi đi biển chơi, được không?",
       "py": "B: Duì a, wǒmen xiān qù chī bīngqílín, děng bú rè le, zài qù hǎibiān wán, hǎobùhǎo?"
      },
      {
       "hz": "媽媽：明天妳打算去哪裡？",
       "vi": "Mẹ: Ngày mai con định đi đâu?",
       "py": "Māma: Míngtiān nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "女兒：我要先去朋友家，等百貨公司開了，再去買衣服。",
       "vi": "Con gái: Con sẽ đến nhà bạn trước, đợi trung tâm thương mại mở cửa rồi đi mua quần áo.",
       "py": "Nǚ'ér: Wǒ yào xiān qù péngyǒujiā, děng bǎihuògōngsī kāi le, zài qù mǎi yīfú."
      },
      {
       "hz": "孩子:媽媽，我好餓。",
       "vi": "Con: Mẹ ơi, con đói quá.",
       "py": "Háizi: Māma, wǒ hǎo è."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "II. 給 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 給 serves as a preposition, it indicates “to” or “for”.",
     "examples": [
      {
       "hz": "媽媽給我買了我最愛吃的冰淇淋。",
       "vi": "Mẹ mua cho tôi món kem tôi thích ăn nhất.",
       "py": "Māma gěi wǒ mǎi le wǒ zuì ài chī de bīngqílín."
      },
      {
       "hz": "A:你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B:我在給我男朋友寫信。",
       "vi": "B: Tôi đang viết thư cho bạn trai.",
       "py": "B: Wǒ zài gěi wǒ nánpéngyǒu xiěxìn."
      },
      {
       "hz": "A:你還沒給哥哥寫生日卡片嗎？",
       "vi": "A: Bạn vẫn chưa viết thiệp sinh nhật cho anh trai à?",
       "py": "A: Nǐ hái méi gěi gēge xiě shēngrì kǎpiàn ma?"
      },
      {
       "hz": "B:還沒，我今天晚上會寫。",
       "vi": "B: Chưa, tối nay tôi sẽ viết.",
       "py": "B: Hái méi, wǒ jīntiān wǎnshàng huì xiě."
      },
      {
       "hz": "A:他要給誰打電話？",
       "vi": "A: Anh ấy định gọi điện cho ai?",
       "py": "A: Tā yào gěi shéi dǎdiànhuà?"
      },
      {
       "hz": "A:你給誰買衣服？",
       "vi": "A: Bạn mua quần áo cho ai?",
       "py": "A: Nǐ gěi shéi mǎi yīfú?"
      },
      {
       "hz": "A:你給老師寫信了嗎？",
       "vi": "A: Bạn đã viết thư cho thầy giáo chưa?",
       "py": "A: Nǐ gěi lǎoshī xiěxìn le ma?"
      },
      {
       "hz": "這個短文是誰寫的？",
       "vi": "Bài văn ngắn này do ai viết?",
       "py": "Zhège duǎnwén shì shéi xiě de?"
      },
      {
       "hz": "他是怎麼約友美的？",
       "vi": "Anh ấy hẹn Yumi bằng cách nào?",
       "py": "Tā shì zěnme yuē Yǒuměi de?"
      },
      {
       "hz": "他們在哪裡見面？那個地方怎麼樣？",
       "vi": "Họ gặp nhau ở đâu? Chỗ đó thế nào?",
       "py": "Tāmen zài nǎlǐ jiànmiàn? Nàge dìfāng zěnmeyàng?"
      },
      {
       "hz": "他們在見面的地方，做了哪些事？",
       "vi": "Ở chỗ gặp nhau, họ đã làm những gì?",
       "py": "Tāmen zài jiànmiàn de dìfāng, zuò le nǎxiē shì?"
      },
      {
       "hz": "他還想跟友美見面嗎？為什麼？",
       "vi": "Anh ấy còn muốn gặp Yumi nữa không? Tại sao?",
       "py": "Tā hái xiǎng gēn Yǒuměi jiànmiàn ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "給 làm giới từ",
   "giaiThich": "給 đứng trước người nhận, nghĩa \"cho, giúp cho\"."
  }
 ],
 "td1-11.2": [
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "(1) 了 is placed after Verb (object) for indicating a completed action.",
     "examples": [
      {
       "hz": "他已經去上課了。",
       "vi": "Anh ấy đã đi học rồi.",
       "py": "Tā yǐjīng qù shàngkè le."
      },
      {
       "hz": "我今天早上去看醫生了。",
       "vi": "Sáng nay tôi đã đi khám bác sĩ.",
       "py": "Wǒ jīntiān zǎoshàng qù kàn yīshēng le."
      },
      {
       "hz": "我跟弟弟都寫功課了。",
       "vi": "Tôi và em trai đều đã làm bài tập.",
       "py": "Wǒ gēn dìdi dōu xiě gōngkè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "Bàba yǐjīng mǎi le yí liàng xīn chē le, hái xiǎng zài mǎi yí liàng. Tā hěn ài chī píngguǒ, yǐjīng chī le yí ge le, hái xiǎng zài chī.",
     "examples": [
      {
       "hz": "a. 我上個禮拜學了十個中國字。",
       "vi": "a. Tuần trước tôi đã học mười chữ Hán.",
       "py": "A. Wǒ shàng gè lǐbài xué le shígè Zhōngguó zì."
      },
      {
       "hz": "b.我已經學了四百多個中國字了。",
       "vi": "b. Tôi đã học được hơn bốn trăm chữ Hán rồi.",
       "py": "B. Wǒ yǐjīng xué le sìbǎiduōgè Zhōngguó zì le."
      },
      {
       "hz": "b.爸爸已經買了一輛新車了，還想再買一輛。",
       "vi": "b. Bố đã mua một chiếc xe mới rồi, vẫn còn muốn mua thêm một chiếc nữa.",
       "py": "B. Bàba yǐjīng mǎi le yíliàng xīnchē le, hái xiǎng zài mǎi yíliàng."
      },
      {
       "hz": "a.爸爸上個月買了一輛新車。",
       "vi": "a. Tháng trước bố đã mua một chiếc xe mới.",
       "py": "A. Bàba shànggèyuè mǎi le yíliàng xīnchē."
      },
      {
       "hz": "b.他很愛吃蘋果，已經吃了一個了，還想再吃。",
       "vi": "b. Anh ấy rất thích ăn táo, đã ăn một quả rồi, vẫn còn muốn ăn nữa.",
       "py": "B. Tā hěn ài chī píngguǒ, yǐjīng chī le yígè le, hái xiǎng zài chī."
      },
      {
       "hz": "a.他昨天晚上吃了兩個蘋果。",
       "vi": "a. Tối qua anh ấy đã ăn hai quả táo.",
       "py": "A. Tā zuótiānwǎnshàng chī le liǎnggè píngguǒ."
      },
      {
       "hz": "A:你買電影票了嗎？",
       "vi": "A: Bạn đã mua vé xem phim chưa?",
       "py": "A: Nǐ mǎi diànyǐngpiào le ma?"
      },
      {
       "hz": "下午還要去郵局跟超級市場。",
       "vi": "Buổi chiều còn phải đi bưu điện và siêu thị.",
       "py": "Xiàwǔ háiyào qù yóujú gēn chāojíshìchǎng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "A.沒 is used to negate past actions. B.沒(有) can be at the end of the sentence",
     "examples": [
      {
       "hz": "A:他昨天來了嗎？",
       "vi": "A: Hôm qua anh ấy có đến không?",
       "py": "A: Tā zuótiān lái le ma?"
      },
      {
       "hz": "B:他昨天沒來。",
       "vi": "B: Hôm qua anh ấy không đến.",
       "py": "B: Tā zuótiān méi lái."
      },
      {
       "hz": "B:他沒看書。",
       "vi": "B: Anh ấy không đọc sách.",
       "py": "B: Tā méi kànshū."
      },
      {
       "hz": "A:他看書了沒有？",
       "vi": "A: Anh ấy đã đọc sách chưa?",
       "py": "A: Tā kànshū le méiyǒu?"
      },
      {
       "hz": "B:爸爸沒喝咖啡。",
       "vi": "B: Bố không uống cà phê.",
       "py": "B: Bàba méi hēkāfēi."
      },
      {
       "hz": "A:爸爸喝咖啡了沒？",
       "vi": "A: Bố đã uống cà phê chưa?",
       "py": "A: Bàba hēkāfēi le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "It indicates that the action has not happened but it will probably happen.",
     "examples": [
      {
       "hz": "B:還沒看，我這幾天很忙。",
       "vi": "B: Vẫn chưa đọc, mấy hôm nay tôi rất bận.",
       "py": "B: Hái méi kàn, wǒ zhè jǐtiān hěn máng."
      },
      {
       "hz": "A:老師要你看的書，你看了嗎？",
       "vi": "A: Sách thầy giáo bảo bạn đọc, bạn đọc chưa?",
       "py": "A: Lǎoshī yào nǐ kàn de shū, nǐ kàn le ma?"
      },
      {
       "hz": "B:還沒吃，現在要吃了。",
       "vi": "B: Vẫn chưa ăn, bây giờ sắp ăn rồi.",
       "py": "B: Hái méi chī, xiànzài yào chī le."
      },
      {
       "hz": "A:你今天去看醫生了，那你吃藥了沒有？",
       "vi": "A: Hôm nay bạn đi khám bác sĩ rồi, vậy bạn uống thuốc chưa?",
       "py": "A: Nǐ jīntiān qù kàn yīshēng le, nà nǐ chīyào le méiyǒu?"
      },
      {
       "hz": "B:我不知道，也許也還沒寫。",
       "vi": "B: Tôi không biết, có lẽ cũng chưa viết.",
       "py": "B: Wǒ bù zhīdào, yěxǔ yě hái méi xiě."
      },
      {
       "hz": "A:我們都還沒寫功課，他寫了沒？",
       "vi": "A: Chúng tôi đều chưa làm bài tập, anh ấy làm chưa?",
       "py": "A: Wǒmen dōuháiméi xiě gōngkè, tā xiě le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:他是幾點到的？",
       "vi": "B: Anh ấy đến lúc mấy giờ?",
       "py": "B: Tā shì jǐdiǎn dào de?"
      },
      {
       "hz": "A:他已經到學校了。",
       "vi": "A: Anh ấy đã đến trường rồi.",
       "py": "A: Tā yǐjīng dào xuéxiào le."
      },
      {
       "hz": "A:他是三點三十分到的。",
       "vi": "A: Anh ấy đến lúc ba giờ ba mươi.",
       "py": "A: Tā shì sāndiǎn sānshífēn dào de."
      },
      {
       "hz": "他是昨天晚上到的，不是今天早上到的。",
       "vi": "Anh ấy đến vào tối qua, không phải sáng nay.",
       "py": "Tā shì zuótiānwǎnshàng dào de, búshì jīntiān zǎoshàng dào de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:我在台灣學的。",
       "vi": "B: Tôi học ở Đài Loan.",
       "py": "B: Wǒ zài Táiwān xué de."
      },
      {
       "hz": "A:你的中文說得真好，你是在哪裡學的？",
       "vi": "A: Bạn nói tiếng Trung giỏi thật, bạn học ở đâu vậy?",
       "py": "A: Nǐ de zhōngwén shuō de zhēn hǎo, nǐ shì zài nǎlǐ xué de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:是她媽媽告訴我的。",
       "vi": "B: Là mẹ cô ấy nói cho tôi biết.",
       "py": "B: Shì tā māma gàosù wǒ de."
      },
      {
       "hz": "A:你知道她的手機號碼嗎？是誰告訴你的？",
       "vi": "A: Bạn biết số điện thoại của cô ấy không? Ai nói cho bạn biết?",
       "py": "A: Nǐ zhīdào tā de shǒujīhàomǎ ma? Shì shéi gàosù nǐ de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where,who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence. This pattern expresses that before statement 2 takes place, the subject(s) must wait until statement 1 takes place. Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiāo nǐ, hǎo bù hǎo? 先……，等……，再…… is a pattern used for sequencing events. Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, Nǚér :   Wǒ yào xiān qù péngyǒu jiā, děng bǎihuògōngsī kāi le,",
     "examples": [
      {
       "hz": "B:他是開車來的嗎？",
       "vi": "B: Anh ấy lái xe đến à?",
       "py": "B: Tā shì kāichē lái de ma?"
      },
      {
       "hz": "A:張先生來了。",
       "vi": "A: Anh Trương đến rồi.",
       "py": "A: Zhāng xiānshēng lái le."
      },
      {
       "hz": "A:不是，他是走路來的。",
       "vi": "A: Không, anh ấy đi bộ đến.",
       "py": "A: Búshì, tā shì zǒulù lái de."
      },
      {
       "hz": "A:你看，這是我買的新衣服。",
       "vi": "A: Bạn xem, đây là quần áo mới tôi mua.",
       "py": "A: Nǐ kàn, zhè shì wǒ mǎi de xīn yīfú."
      },
      {
       "hz": "A:我是昨天買的。",
       "vi": "A: Tôi mua hôm qua.",
       "py": "A: Wǒ shì zuótiān mǎi de."
      },
      {
       "hz": "A:我看到他的女朋友了。",
       "vi": "A: Tôi gặp bạn gái của anh ấy rồi.",
       "py": "A: Wǒ kàndào tā de nǚpéngyǒu le."
      },
      {
       "hz": "A:是昨天看到的。",
       "vi": "A: Tôi gặp hôm qua.",
       "py": "A: Shì zuótiān kàndào de."
      },
      {
       "hz": "A:是在學校附近的咖啡廳看到的。",
       "vi": "A: Tôi gặp ở quán cà phê gần trường.",
       "py": "A: Shì zài xuéxiào fùjìn de kāfēitīng kàndào de."
      },
      {
       "hz": "A:聽說元真去台中了，她是哪天去的？",
       "vi": "A: Nghe nói Nguyên Chân đi Đài Trung rồi, cô ấy đi hôm nào?",
       "py": "A: Tīngshuō Yuánzhēn qù Táizhōng le, tā shì nǎ tiān qù de?"
      },
      {
       "hz": "B:她是開車去的。",
       "vi": "B: Cô ấy lái xe đi.",
       "py": "B: Tā shì kāichē qù de."
      },
      {
       "hz": "A:她是跟友美一起去的嗎？",
       "vi": "A: Cô ấy đi cùng Yumi à?",
       "py": "A: Tā shì gēn Yǒuměi yìqǐ qù de ma?"
      },
      {
       "hz": "A:爸爸，這個句子是什麼意思？",
       "vi": "A: Bố ơi, câu này có nghĩa là gì?",
       "py": "A: Bàba, zhège jùzi shì shénme yìsi?"
      },
      {
       "hz": "B:我現在沒空，晚上再告訴你。",
       "vi": "B: Bây giờ bố không rảnh, tối bố nói cho con.",
       "py": "B: Wǒ xiànzài méikòng, wǎnshàng zài gàosù nǐ."
      },
      {
       "hz": "A:你要不要跟我一起去打球？",
       "vi": "A: Bạn có muốn đi chơi bóng với tôi không?",
       "py": "A: Nǐ yào búyào gēn wǒ yìqǐ qù dǎqiú?"
      },
      {
       "hz": "B:我今天有一點兒累，我們週末再去吧。",
       "vi": "B: Hôm nay tôi hơi mệt, cuối tuần chúng ta đi nhé.",
       "py": "B: Wǒ jīntiān yǒu yìdiǎn'ér lèi, wǒmen zhōumò zài qù ba."
      },
      {
       "hz": "天氣太冷了，等車來了，我們再去外面。",
       "vi": "Trời lạnh quá, đợi xe đến rồi chúng ta hãy ra ngoài.",
       "py": "Tiānqì tàilěng le, děng chē lái le, wǒmen zài qù wàimiàn."
      },
      {
       "hz": "A:妳決定買這種茶了嗎？",
       "vi": "A: Chị đã quyết định mua loại trà này chưa?",
       "py": "A: Nǐ juédìng mǎi zhèzhǒng chá le ma?"
      },
      {
       "hz": "B:等我先生也喝了，我們再決定買不買。",
       "vi": "B: Đợi chồng tôi uống thử đã, rồi chúng tôi mới quyết định có mua hay không.",
       "py": "B: Děng wǒ xiānshēng yě hē le, wǒmen zài juédìng mǎi bù mǎi."
      },
      {
       "hz": "A:這個問題很難，你可以教我嗎？",
       "vi": "A: Câu hỏi này khó quá, bạn dạy tôi được không?",
       "py": "A: Zhège wèntí hěn nán, nǐ kěyǐ jiào wǒ ma?"
      },
      {
       "hz": "B:我現在要去上課，等下課了再教你，好不好？",
       "vi": "B: Bây giờ tôi phải đi học, đợi tan học rồi tôi dạy bạn nhé?",
       "py": "B: Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiào nǐ, hǎobùhǎo?"
      },
      {
       "hz": "A:我們一起去吃飯吧。",
       "vi": "A: Chúng ta cùng đi ăn cơm đi.",
       "py": "A: Wǒmen yìqǐ qù chīfàn ba."
      },
      {
       "hz": "一起吃晚飯。",
       "vi": "Cùng ăn tối.",
       "py": "Yìqǐ chīwǎnfàn."
      },
      {
       "hz": "B:現在去吃飯的人太多了，我想先寫功課，等人少了再去吃。",
       "vi": "B: Bây giờ người đi ăn đông quá, tôi muốn làm bài tập trước, đợi vắng người rồi hãy đi ăn.",
       "py": "B: Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, děng rén shǎo le zài qù chī."
      },
      {
       "hz": "A：現在太熱了！",
       "vi": "A: Bây giờ nóng quá!",
       "py": "A: Xiànzài tài rè le!"
      },
      {
       "hz": "B：對啊，我們先去吃冰淇淋，等不熱了，再去海邊玩，好不好？",
       "vi": "B: Đúng vậy, chúng ta đi ăn kem trước, đợi hết nóng rồi đi biển chơi, được không?",
       "py": "B: Duì a, wǒmen xiān qù chī bīngqílín, děng bú rè le, zài qù hǎibiān wán, hǎobùhǎo?"
      },
      {
       "hz": "媽媽：明天妳打算去哪裡？",
       "vi": "Mẹ: Ngày mai con định đi đâu?",
       "py": "Māma: Míngtiān nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "女兒：我要先去朋友家，等百貨公司開了，再去買衣服。",
       "vi": "Con gái: Con sẽ đến nhà bạn trước, đợi trung tâm thương mại mở cửa rồi đi mua quần áo.",
       "py": "Nǚ'ér: Wǒ yào xiān qù péngyǒujiā, děng bǎihuògōngsī kāi le, zài qù mǎi yīfú."
      },
      {
       "hz": "孩子:媽媽，我好餓。",
       "vi": "Con: Mẹ ơi, con đói quá.",
       "py": "Háizi: Māma, wǒ hǎo è."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "II. 給 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 給 serves as a preposition, it indicates “to” or “for”.",
     "examples": [
      {
       "hz": "媽媽給我買了我最愛吃的冰淇淋。",
       "vi": "Mẹ mua cho tôi món kem tôi thích ăn nhất.",
       "py": "Māma gěi wǒ mǎi le wǒ zuì ài chī de bīngqílín."
      },
      {
       "hz": "A:你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B:我在給我男朋友寫信。",
       "vi": "B: Tôi đang viết thư cho bạn trai.",
       "py": "B: Wǒ zài gěi wǒ nánpéngyǒu xiěxìn."
      },
      {
       "hz": "A:你還沒給哥哥寫生日卡片嗎？",
       "vi": "A: Bạn vẫn chưa viết thiệp sinh nhật cho anh trai à?",
       "py": "A: Nǐ hái méi gěi gēge xiě shēngrì kǎpiàn ma?"
      },
      {
       "hz": "B:還沒，我今天晚上會寫。",
       "vi": "B: Chưa, tối nay tôi sẽ viết.",
       "py": "B: Hái méi, wǒ jīntiān wǎnshàng huì xiě."
      },
      {
       "hz": "A:他要給誰打電話？",
       "vi": "A: Anh ấy định gọi điện cho ai?",
       "py": "A: Tā yào gěi shéi dǎdiànhuà?"
      },
      {
       "hz": "A:你給誰買衣服？",
       "vi": "A: Bạn mua quần áo cho ai?",
       "py": "A: Nǐ gěi shéi mǎi yīfú?"
      },
      {
       "hz": "A:你給老師寫信了嗎？",
       "vi": "A: Bạn đã viết thư cho thầy giáo chưa?",
       "py": "A: Nǐ gěi lǎoshī xiěxìn le ma?"
      },
      {
       "hz": "這個短文是誰寫的？",
       "vi": "Bài văn ngắn này do ai viết?",
       "py": "Zhège duǎnwén shì shéi xiě de?"
      },
      {
       "hz": "他是怎麼約友美的？",
       "vi": "Anh ấy hẹn Yumi bằng cách nào?",
       "py": "Tā shì zěnme yuē Yǒuměi de?"
      },
      {
       "hz": "他們在哪裡見面？那個地方怎麼樣？",
       "vi": "Họ gặp nhau ở đâu? Chỗ đó thế nào?",
       "py": "Tāmen zài nǎlǐ jiànmiàn? Nàge dìfāng zěnmeyàng?"
      },
      {
       "hz": "他們在見面的地方，做了哪些事？",
       "vi": "Ở chỗ gặp nhau, họ đã làm những gì?",
       "py": "Tāmen zài jiànmiàn de dìfāng, zuò le nǎxiē shì?"
      },
      {
       "hz": "他還想跟友美見面嗎？為什麼？",
       "vi": "Anh ấy còn muốn gặp Yumi nữa không? Tại sao?",
       "py": "Tā hái xiǎng gēn Yǒuměi jiànmiàn ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "給 làm giới từ",
   "giaiThich": "給 đứng trước người nhận, nghĩa \"cho, giúp cho\"."
  }
 ],
 "td1-11.3": [
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "(1) 了 is placed after Verb (object) for indicating a completed action.",
     "examples": [
      {
       "hz": "他已經去上課了。",
       "vi": "Anh ấy đã đi học rồi.",
       "py": "Tā yǐjīng qù shàngkè le."
      },
      {
       "hz": "我今天早上去看醫生了。",
       "vi": "Sáng nay tôi đã đi khám bác sĩ.",
       "py": "Wǒ jīntiān zǎoshàng qù kàn yīshēng le."
      },
      {
       "hz": "我跟弟弟都寫功課了。",
       "vi": "Tôi và em trai đều đã làm bài tập.",
       "py": "Wǒ gēn dìdi dōu xiě gōngkè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "Bàba yǐjīng mǎi le yí liàng xīn chē le, hái xiǎng zài mǎi yí liàng. Tā hěn ài chī píngguǒ, yǐjīng chī le yí ge le, hái xiǎng zài chī.",
     "examples": [
      {
       "hz": "a. 我上個禮拜學了十個中國字。",
       "vi": "a. Tuần trước tôi đã học mười chữ Hán.",
       "py": "A. Wǒ shàng gè lǐbài xué le shígè Zhōngguó zì."
      },
      {
       "hz": "b.我已經學了四百多個中國字了。",
       "vi": "b. Tôi đã học được hơn bốn trăm chữ Hán rồi.",
       "py": "B. Wǒ yǐjīng xué le sìbǎiduōgè Zhōngguó zì le."
      },
      {
       "hz": "b.爸爸已經買了一輛新車了，還想再買一輛。",
       "vi": "b. Bố đã mua một chiếc xe mới rồi, vẫn còn muốn mua thêm một chiếc nữa.",
       "py": "B. Bàba yǐjīng mǎi le yíliàng xīnchē le, hái xiǎng zài mǎi yíliàng."
      },
      {
       "hz": "a.爸爸上個月買了一輛新車。",
       "vi": "a. Tháng trước bố đã mua một chiếc xe mới.",
       "py": "A. Bàba shànggèyuè mǎi le yíliàng xīnchē."
      },
      {
       "hz": "b.他很愛吃蘋果，已經吃了一個了，還想再吃。",
       "vi": "b. Anh ấy rất thích ăn táo, đã ăn một quả rồi, vẫn còn muốn ăn nữa.",
       "py": "B. Tā hěn ài chī píngguǒ, yǐjīng chī le yígè le, hái xiǎng zài chī."
      },
      {
       "hz": "a.他昨天晚上吃了兩個蘋果。",
       "vi": "a. Tối qua anh ấy đã ăn hai quả táo.",
       "py": "A. Tā zuótiānwǎnshàng chī le liǎnggè píngguǒ."
      },
      {
       "hz": "A:你買電影票了嗎？",
       "vi": "A: Bạn đã mua vé xem phim chưa?",
       "py": "A: Nǐ mǎi diànyǐngpiào le ma?"
      },
      {
       "hz": "下午還要去郵局跟超級市場。",
       "vi": "Buổi chiều còn phải đi bưu điện và siêu thị.",
       "py": "Xiàwǔ háiyào qù yóujú gēn chāojíshìchǎng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "A.沒 is used to negate past actions. B.沒(有) can be at the end of the sentence",
     "examples": [
      {
       "hz": "A:他昨天來了嗎？",
       "vi": "A: Hôm qua anh ấy có đến không?",
       "py": "A: Tā zuótiān lái le ma?"
      },
      {
       "hz": "B:他昨天沒來。",
       "vi": "B: Hôm qua anh ấy không đến.",
       "py": "B: Tā zuótiān méi lái."
      },
      {
       "hz": "B:他沒看書。",
       "vi": "B: Anh ấy không đọc sách.",
       "py": "B: Tā méi kànshū."
      },
      {
       "hz": "A:他看書了沒有？",
       "vi": "A: Anh ấy đã đọc sách chưa?",
       "py": "A: Tā kànshū le méiyǒu?"
      },
      {
       "hz": "B:爸爸沒喝咖啡。",
       "vi": "B: Bố không uống cà phê.",
       "py": "B: Bàba méi hēkāfēi."
      },
      {
       "hz": "A:爸爸喝咖啡了沒？",
       "vi": "A: Bố đã uống cà phê chưa?",
       "py": "A: Bàba hēkāfēi le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "It indicates that the action has not happened but it will probably happen.",
     "examples": [
      {
       "hz": "B:還沒看，我這幾天很忙。",
       "vi": "B: Vẫn chưa đọc, mấy hôm nay tôi rất bận.",
       "py": "B: Hái méi kàn, wǒ zhè jǐtiān hěn máng."
      },
      {
       "hz": "A:老師要你看的書，你看了嗎？",
       "vi": "A: Sách thầy giáo bảo bạn đọc, bạn đọc chưa?",
       "py": "A: Lǎoshī yào nǐ kàn de shū, nǐ kàn le ma?"
      },
      {
       "hz": "B:還沒吃，現在要吃了。",
       "vi": "B: Vẫn chưa ăn, bây giờ sắp ăn rồi.",
       "py": "B: Hái méi chī, xiànzài yào chī le."
      },
      {
       "hz": "A:你今天去看醫生了，那你吃藥了沒有？",
       "vi": "A: Hôm nay bạn đi khám bác sĩ rồi, vậy bạn uống thuốc chưa?",
       "py": "A: Nǐ jīntiān qù kàn yīshēng le, nà nǐ chīyào le méiyǒu?"
      },
      {
       "hz": "B:我不知道，也許也還沒寫。",
       "vi": "B: Tôi không biết, có lẽ cũng chưa viết.",
       "py": "B: Wǒ bù zhīdào, yěxǔ yě hái méi xiě."
      },
      {
       "hz": "A:我們都還沒寫功課，他寫了沒？",
       "vi": "A: Chúng tôi đều chưa làm bài tập, anh ấy làm chưa?",
       "py": "A: Wǒmen dōuháiméi xiě gōngkè, tā xiě le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:他是幾點到的？",
       "vi": "B: Anh ấy đến lúc mấy giờ?",
       "py": "B: Tā shì jǐdiǎn dào de?"
      },
      {
       "hz": "A:他已經到學校了。",
       "vi": "A: Anh ấy đã đến trường rồi.",
       "py": "A: Tā yǐjīng dào xuéxiào le."
      },
      {
       "hz": "A:他是三點三十分到的。",
       "vi": "A: Anh ấy đến lúc ba giờ ba mươi.",
       "py": "A: Tā shì sāndiǎn sānshífēn dào de."
      },
      {
       "hz": "他是昨天晚上到的，不是今天早上到的。",
       "vi": "Anh ấy đến vào tối qua, không phải sáng nay.",
       "py": "Tā shì zuótiānwǎnshàng dào de, búshì jīntiān zǎoshàng dào de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:我在台灣學的。",
       "vi": "B: Tôi học ở Đài Loan.",
       "py": "B: Wǒ zài Táiwān xué de."
      },
      {
       "hz": "A:你的中文說得真好，你是在哪裡學的？",
       "vi": "A: Bạn nói tiếng Trung giỏi thật, bạn học ở đâu vậy?",
       "py": "A: Nǐ de zhōngwén shuō de zhēn hǎo, nǐ shì zài nǎlǐ xué de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:是她媽媽告訴我的。",
       "vi": "B: Là mẹ cô ấy nói cho tôi biết.",
       "py": "B: Shì tā māma gàosù wǒ de."
      },
      {
       "hz": "A:你知道她的手機號碼嗎？是誰告訴你的？",
       "vi": "A: Bạn biết số điện thoại của cô ấy không? Ai nói cho bạn biết?",
       "py": "A: Nǐ zhīdào tā de shǒujīhàomǎ ma? Shì shéi gàosù nǐ de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where,who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence. This pattern expresses that before statement 2 takes place, the subject(s) must wait until statement 1 takes place. Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiāo nǐ, hǎo bù hǎo? 先……，等……，再…… is a pattern used for sequencing events. Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, Nǚér :   Wǒ yào xiān qù péngyǒu jiā, děng bǎihuògōngsī kāi le,",
     "examples": [
      {
       "hz": "B:他是開車來的嗎？",
       "vi": "B: Anh ấy lái xe đến à?",
       "py": "B: Tā shì kāichē lái de ma?"
      },
      {
       "hz": "A:張先生來了。",
       "vi": "A: Anh Trương đến rồi.",
       "py": "A: Zhāng xiānshēng lái le."
      },
      {
       "hz": "A:不是，他是走路來的。",
       "vi": "A: Không, anh ấy đi bộ đến.",
       "py": "A: Búshì, tā shì zǒulù lái de."
      },
      {
       "hz": "A:你看，這是我買的新衣服。",
       "vi": "A: Bạn xem, đây là quần áo mới tôi mua.",
       "py": "A: Nǐ kàn, zhè shì wǒ mǎi de xīn yīfú."
      },
      {
       "hz": "A:我是昨天買的。",
       "vi": "A: Tôi mua hôm qua.",
       "py": "A: Wǒ shì zuótiān mǎi de."
      },
      {
       "hz": "A:我看到他的女朋友了。",
       "vi": "A: Tôi gặp bạn gái của anh ấy rồi.",
       "py": "A: Wǒ kàndào tā de nǚpéngyǒu le."
      },
      {
       "hz": "A:是昨天看到的。",
       "vi": "A: Tôi gặp hôm qua.",
       "py": "A: Shì zuótiān kàndào de."
      },
      {
       "hz": "A:是在學校附近的咖啡廳看到的。",
       "vi": "A: Tôi gặp ở quán cà phê gần trường.",
       "py": "A: Shì zài xuéxiào fùjìn de kāfēitīng kàndào de."
      },
      {
       "hz": "A:聽說元真去台中了，她是哪天去的？",
       "vi": "A: Nghe nói Nguyên Chân đi Đài Trung rồi, cô ấy đi hôm nào?",
       "py": "A: Tīngshuō Yuánzhēn qù Táizhōng le, tā shì nǎ tiān qù de?"
      },
      {
       "hz": "B:她是開車去的。",
       "vi": "B: Cô ấy lái xe đi.",
       "py": "B: Tā shì kāichē qù de."
      },
      {
       "hz": "A:她是跟友美一起去的嗎？",
       "vi": "A: Cô ấy đi cùng Yumi à?",
       "py": "A: Tā shì gēn Yǒuměi yìqǐ qù de ma?"
      },
      {
       "hz": "A:爸爸，這個句子是什麼意思？",
       "vi": "A: Bố ơi, câu này có nghĩa là gì?",
       "py": "A: Bàba, zhège jùzi shì shénme yìsi?"
      },
      {
       "hz": "B:我現在沒空，晚上再告訴你。",
       "vi": "B: Bây giờ bố không rảnh, tối bố nói cho con.",
       "py": "B: Wǒ xiànzài méikòng, wǎnshàng zài gàosù nǐ."
      },
      {
       "hz": "A:你要不要跟我一起去打球？",
       "vi": "A: Bạn có muốn đi chơi bóng với tôi không?",
       "py": "A: Nǐ yào búyào gēn wǒ yìqǐ qù dǎqiú?"
      },
      {
       "hz": "B:我今天有一點兒累，我們週末再去吧。",
       "vi": "B: Hôm nay tôi hơi mệt, cuối tuần chúng ta đi nhé.",
       "py": "B: Wǒ jīntiān yǒu yìdiǎn'ér lèi, wǒmen zhōumò zài qù ba."
      },
      {
       "hz": "天氣太冷了，等車來了，我們再去外面。",
       "vi": "Trời lạnh quá, đợi xe đến rồi chúng ta hãy ra ngoài.",
       "py": "Tiānqì tàilěng le, děng chē lái le, wǒmen zài qù wàimiàn."
      },
      {
       "hz": "A:妳決定買這種茶了嗎？",
       "vi": "A: Chị đã quyết định mua loại trà này chưa?",
       "py": "A: Nǐ juédìng mǎi zhèzhǒng chá le ma?"
      },
      {
       "hz": "B:等我先生也喝了，我們再決定買不買。",
       "vi": "B: Đợi chồng tôi uống thử đã, rồi chúng tôi mới quyết định có mua hay không.",
       "py": "B: Děng wǒ xiānshēng yě hē le, wǒmen zài juédìng mǎi bù mǎi."
      },
      {
       "hz": "A:這個問題很難，你可以教我嗎？",
       "vi": "A: Câu hỏi này khó quá, bạn dạy tôi được không?",
       "py": "A: Zhège wèntí hěn nán, nǐ kěyǐ jiào wǒ ma?"
      },
      {
       "hz": "B:我現在要去上課，等下課了再教你，好不好？",
       "vi": "B: Bây giờ tôi phải đi học, đợi tan học rồi tôi dạy bạn nhé?",
       "py": "B: Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiào nǐ, hǎobùhǎo?"
      },
      {
       "hz": "A:我們一起去吃飯吧。",
       "vi": "A: Chúng ta cùng đi ăn cơm đi.",
       "py": "A: Wǒmen yìqǐ qù chīfàn ba."
      },
      {
       "hz": "一起吃晚飯。",
       "vi": "Cùng ăn tối.",
       "py": "Yìqǐ chīwǎnfàn."
      },
      {
       "hz": "B:現在去吃飯的人太多了，我想先寫功課，等人少了再去吃。",
       "vi": "B: Bây giờ người đi ăn đông quá, tôi muốn làm bài tập trước, đợi vắng người rồi hãy đi ăn.",
       "py": "B: Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, děng rén shǎo le zài qù chī."
      },
      {
       "hz": "A：現在太熱了！",
       "vi": "A: Bây giờ nóng quá!",
       "py": "A: Xiànzài tài rè le!"
      },
      {
       "hz": "B：對啊，我們先去吃冰淇淋，等不熱了，再去海邊玩，好不好？",
       "vi": "B: Đúng vậy, chúng ta đi ăn kem trước, đợi hết nóng rồi đi biển chơi, được không?",
       "py": "B: Duì a, wǒmen xiān qù chī bīngqílín, děng bú rè le, zài qù hǎibiān wán, hǎobùhǎo?"
      },
      {
       "hz": "媽媽：明天妳打算去哪裡？",
       "vi": "Mẹ: Ngày mai con định đi đâu?",
       "py": "Māma: Míngtiān nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "女兒：我要先去朋友家，等百貨公司開了，再去買衣服。",
       "vi": "Con gái: Con sẽ đến nhà bạn trước, đợi trung tâm thương mại mở cửa rồi đi mua quần áo.",
       "py": "Nǚ'ér: Wǒ yào xiān qù péngyǒujiā, děng bǎihuògōngsī kāi le, zài qù mǎi yīfú."
      },
      {
       "hz": "孩子:媽媽，我好餓。",
       "vi": "Con: Mẹ ơi, con đói quá.",
       "py": "Háizi: Māma, wǒ hǎo è."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "II. 給 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 給 serves as a preposition, it indicates “to” or “for”.",
     "examples": [
      {
       "hz": "媽媽給我買了我最愛吃的冰淇淋。",
       "vi": "Mẹ mua cho tôi món kem tôi thích ăn nhất.",
       "py": "Māma gěi wǒ mǎi le wǒ zuì ài chī de bīngqílín."
      },
      {
       "hz": "A:你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B:我在給我男朋友寫信。",
       "vi": "B: Tôi đang viết thư cho bạn trai.",
       "py": "B: Wǒ zài gěi wǒ nánpéngyǒu xiěxìn."
      },
      {
       "hz": "A:你還沒給哥哥寫生日卡片嗎？",
       "vi": "A: Bạn vẫn chưa viết thiệp sinh nhật cho anh trai à?",
       "py": "A: Nǐ hái méi gěi gēge xiě shēngrì kǎpiàn ma?"
      },
      {
       "hz": "B:還沒，我今天晚上會寫。",
       "vi": "B: Chưa, tối nay tôi sẽ viết.",
       "py": "B: Hái méi, wǒ jīntiān wǎnshàng huì xiě."
      },
      {
       "hz": "A:他要給誰打電話？",
       "vi": "A: Anh ấy định gọi điện cho ai?",
       "py": "A: Tā yào gěi shéi dǎdiànhuà?"
      },
      {
       "hz": "A:你給誰買衣服？",
       "vi": "A: Bạn mua quần áo cho ai?",
       "py": "A: Nǐ gěi shéi mǎi yīfú?"
      },
      {
       "hz": "A:你給老師寫信了嗎？",
       "vi": "A: Bạn đã viết thư cho thầy giáo chưa?",
       "py": "A: Nǐ gěi lǎoshī xiěxìn le ma?"
      },
      {
       "hz": "這個短文是誰寫的？",
       "vi": "Bài văn ngắn này do ai viết?",
       "py": "Zhège duǎnwén shì shéi xiě de?"
      },
      {
       "hz": "他是怎麼約友美的？",
       "vi": "Anh ấy hẹn Yumi bằng cách nào?",
       "py": "Tā shì zěnme yuē Yǒuměi de?"
      },
      {
       "hz": "他們在哪裡見面？那個地方怎麼樣？",
       "vi": "Họ gặp nhau ở đâu? Chỗ đó thế nào?",
       "py": "Tāmen zài nǎlǐ jiànmiàn? Nàge dìfāng zěnmeyàng?"
      },
      {
       "hz": "他們在見面的地方，做了哪些事？",
       "vi": "Ở chỗ gặp nhau, họ đã làm những gì?",
       "py": "Tāmen zài jiànmiàn de dìfāng, zuò le nǎxiē shì?"
      },
      {
       "hz": "他還想跟友美見面嗎？為什麼？",
       "vi": "Anh ấy còn muốn gặp Yumi nữa không? Tại sao?",
       "py": "Tā hái xiǎng gēn Yǒuměi jiànmiàn ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "給 làm giới từ",
   "giaiThich": "給 đứng trước người nhận, nghĩa \"cho, giúp cho\"."
  }
 ],
 "td1-11.4": [
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "(1) 了 is placed after Verb (object) for indicating a completed action.",
     "examples": [
      {
       "hz": "他已經去上課了。",
       "vi": "Anh ấy đã đi học rồi.",
       "py": "Tā yǐjīng qù shàngkè le."
      },
      {
       "hz": "我今天早上去看醫生了。",
       "vi": "Sáng nay tôi đã đi khám bác sĩ.",
       "py": "Wǒ jīntiān zǎoshàng qù kàn yīshēng le."
      },
      {
       "hz": "我跟弟弟都寫功課了。",
       "vi": "Tôi và em trai đều đã làm bài tập.",
       "py": "Wǒ gēn dìdi dōu xiě gōngkè le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "I. Completed Action with 了",
   "points": [
    {
     "label": null,
     "formula": "Bàba yǐjīng mǎi le yí liàng xīn chē le, hái xiǎng zài mǎi yí liàng. Tā hěn ài chī píngguǒ, yǐjīng chī le yí ge le, hái xiǎng zài chī.",
     "examples": [
      {
       "hz": "a. 我上個禮拜學了十個中國字。",
       "vi": "a. Tuần trước tôi đã học mười chữ Hán.",
       "py": "A. Wǒ shàng gè lǐbài xué le shígè Zhōngguó zì."
      },
      {
       "hz": "b.我已經學了四百多個中國字了。",
       "vi": "b. Tôi đã học được hơn bốn trăm chữ Hán rồi.",
       "py": "B. Wǒ yǐjīng xué le sìbǎiduōgè Zhōngguó zì le."
      },
      {
       "hz": "b.爸爸已經買了一輛新車了，還想再買一輛。",
       "vi": "b. Bố đã mua một chiếc xe mới rồi, vẫn còn muốn mua thêm một chiếc nữa.",
       "py": "B. Bàba yǐjīng mǎi le yíliàng xīnchē le, hái xiǎng zài mǎi yíliàng."
      },
      {
       "hz": "a.爸爸上個月買了一輛新車。",
       "vi": "a. Tháng trước bố đã mua một chiếc xe mới.",
       "py": "A. Bàba shànggèyuè mǎi le yíliàng xīnchē."
      },
      {
       "hz": "b.他很愛吃蘋果，已經吃了一個了，還想再吃。",
       "vi": "b. Anh ấy rất thích ăn táo, đã ăn một quả rồi, vẫn còn muốn ăn nữa.",
       "py": "B. Tā hěn ài chī píngguǒ, yǐjīng chī le yígè le, hái xiǎng zài chī."
      },
      {
       "hz": "a.他昨天晚上吃了兩個蘋果。",
       "vi": "a. Tối qua anh ấy đã ăn hai quả táo.",
       "py": "A. Tā zuótiānwǎnshàng chī le liǎnggè píngguǒ."
      },
      {
       "hz": "A:你買電影票了嗎？",
       "vi": "A: Bạn đã mua vé xem phim chưa?",
       "py": "A: Nǐ mǎi diànyǐngpiào le ma?"
      },
      {
       "hz": "下午還要去郵局跟超級市場。",
       "vi": "Buổi chiều còn phải đi bưu điện và siêu thị.",
       "py": "Xiàwǔ háiyào qù yóujú gēn chāojíshìchǎng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "了 chỉ hành động đã hoàn thành",
   "giaiThich": "了 đặt sau động từ (và tân ngữ) để nói hành động đã xong."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "A.沒 is used to negate past actions. B.沒(有) can be at the end of the sentence",
     "examples": [
      {
       "hz": "A:他昨天來了嗎？",
       "vi": "A: Hôm qua anh ấy có đến không?",
       "py": "A: Tā zuótiān lái le ma?"
      },
      {
       "hz": "B:他昨天沒來。",
       "vi": "B: Hôm qua anh ấy không đến.",
       "py": "B: Tā zuótiān méi lái."
      },
      {
       "hz": "B:他沒看書。",
       "vi": "B: Anh ấy không đọc sách.",
       "py": "B: Tā méi kànshū."
      },
      {
       "hz": "A:他看書了沒有？",
       "vi": "A: Anh ấy đã đọc sách chưa?",
       "py": "A: Tā kànshū le méiyǒu?"
      },
      {
       "hz": "B:爸爸沒喝咖啡。",
       "vi": "B: Bố không uống cà phê.",
       "py": "B: Bàba méi hēkāfēi."
      },
      {
       "hz": "A:爸爸喝咖啡了沒？",
       "vi": "A: Bố đã uống cà phê chưa?",
       "py": "A: Bàba hēkāfēi le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "II. Negated Action with 沒/還沒",
   "points": [
    {
     "label": null,
     "formula": "It indicates that the action has not happened but it will probably happen.",
     "examples": [
      {
       "hz": "B:還沒看，我這幾天很忙。",
       "vi": "B: Vẫn chưa đọc, mấy hôm nay tôi rất bận.",
       "py": "B: Hái méi kàn, wǒ zhè jǐtiān hěn máng."
      },
      {
       "hz": "A:老師要你看的書，你看了嗎？",
       "vi": "A: Sách thầy giáo bảo bạn đọc, bạn đọc chưa?",
       "py": "A: Lǎoshī yào nǐ kàn de shū, nǐ kàn le ma?"
      },
      {
       "hz": "B:還沒吃，現在要吃了。",
       "vi": "B: Vẫn chưa ăn, bây giờ sắp ăn rồi.",
       "py": "B: Hái méi chī, xiànzài yào chī le."
      },
      {
       "hz": "A:你今天去看醫生了，那你吃藥了沒有？",
       "vi": "A: Hôm nay bạn đi khám bác sĩ rồi, vậy bạn uống thuốc chưa?",
       "py": "A: Nǐ jīntiān qù kàn yīshēng le, nà nǐ chīyào le méiyǒu?"
      },
      {
       "hz": "B:我不知道，也許也還沒寫。",
       "vi": "B: Tôi không biết, có lẽ cũng chưa viết.",
       "py": "B: Wǒ bù zhīdào, yěxǔ yě hái méi xiě."
      },
      {
       "hz": "A:我們都還沒寫功課，他寫了沒？",
       "vi": "A: Chúng tôi đều chưa làm bài tập, anh ấy làm chưa?",
       "py": "A: Wǒmen dōuháiméi xiě gōngkè, tā xiě le méi?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phủ định với 沒 / 還沒",
   "giaiThich": "沒 phủ định hành động đã xảy ra (chưa làm); 沒(有) có thể đứng cuối câu. 還沒 nghĩa \"vẫn chưa\"."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:他是幾點到的？",
       "vi": "B: Anh ấy đến lúc mấy giờ?",
       "py": "B: Tā shì jǐdiǎn dào de?"
      },
      {
       "hz": "A:他已經到學校了。",
       "vi": "A: Anh ấy đã đến trường rồi.",
       "py": "A: Tā yǐjīng dào xuéxiào le."
      },
      {
       "hz": "A:他是三點三十分到的。",
       "vi": "A: Anh ấy đến lúc ba giờ ba mươi.",
       "py": "A: Tā shì sāndiǎn sānshífēn dào de."
      },
      {
       "hz": "他是昨天晚上到的，不是今天早上到的。",
       "vi": "Anh ấy đến vào tối qua, không phải sáng nay.",
       "py": "Tā shì zuótiānwǎnshàng dào de, búshì jīntiān zǎoshàng dào de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:我在台灣學的。",
       "vi": "B: Tôi học ở Đài Loan.",
       "py": "B: Wǒ zài Táiwān xué de."
      },
      {
       "hz": "A:你的中文說得真好，你是在哪裡學的？",
       "vi": "A: Bạn nói tiếng Trung giỏi thật, bạn học ở đâu vậy?",
       "py": "A: Nǐ de zhōngwén shuō de zhēn hǎo, nǐ shì zài nǎlǐ xué de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where, who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence.",
     "examples": [
      {
       "hz": "B:是她媽媽告訴我的。",
       "vi": "B: Là mẹ cô ấy nói cho tôi biết.",
       "py": "B: Shì tā māma gàosù wǒ de."
      },
      {
       "hz": "A:你知道她的手機號碼嗎？是誰告訴你的？",
       "vi": "A: Bạn biết số điện thoại của cô ấy không? Ai nói cho bạn biết?",
       "py": "A: Nǐ zhīdào tā de shǒujīhàomǎ ma? Shì shéi gàosù nǐ de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "III. Emphasis with 是……的",
   "points": [
    {
     "label": null,
     "formula": "是……的 can be used to describe or emphasize on when, where,who or how. 是 is optional in a positive sentence, but it cannot be omitted in a negative sentence. This pattern expresses that before statement 2 takes place, the subject(s) must wait until statement 1 takes place. Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiāo nǐ, hǎo bù hǎo? 先……，等……，再…… is a pattern used for sequencing events. Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, Nǚér :   Wǒ yào xiān qù péngyǒu jiā, děng bǎihuògōngsī kāi le,",
     "examples": [
      {
       "hz": "B:他是開車來的嗎？",
       "vi": "B: Anh ấy lái xe đến à?",
       "py": "B: Tā shì kāichē lái de ma?"
      },
      {
       "hz": "A:張先生來了。",
       "vi": "A: Anh Trương đến rồi.",
       "py": "A: Zhāng xiānshēng lái le."
      },
      {
       "hz": "A:不是，他是走路來的。",
       "vi": "A: Không, anh ấy đi bộ đến.",
       "py": "A: Búshì, tā shì zǒulù lái de."
      },
      {
       "hz": "A:你看，這是我買的新衣服。",
       "vi": "A: Bạn xem, đây là quần áo mới tôi mua.",
       "py": "A: Nǐ kàn, zhè shì wǒ mǎi de xīn yīfú."
      },
      {
       "hz": "A:我是昨天買的。",
       "vi": "A: Tôi mua hôm qua.",
       "py": "A: Wǒ shì zuótiān mǎi de."
      },
      {
       "hz": "A:我看到他的女朋友了。",
       "vi": "A: Tôi gặp bạn gái của anh ấy rồi.",
       "py": "A: Wǒ kàndào tā de nǚpéngyǒu le."
      },
      {
       "hz": "A:是昨天看到的。",
       "vi": "A: Tôi gặp hôm qua.",
       "py": "A: Shì zuótiān kàndào de."
      },
      {
       "hz": "A:是在學校附近的咖啡廳看到的。",
       "vi": "A: Tôi gặp ở quán cà phê gần trường.",
       "py": "A: Shì zài xuéxiào fùjìn de kāfēitīng kàndào de."
      },
      {
       "hz": "A:聽說元真去台中了，她是哪天去的？",
       "vi": "A: Nghe nói Nguyên Chân đi Đài Trung rồi, cô ấy đi hôm nào?",
       "py": "A: Tīngshuō Yuánzhēn qù Táizhōng le, tā shì nǎ tiān qù de?"
      },
      {
       "hz": "B:她是開車去的。",
       "vi": "B: Cô ấy lái xe đi.",
       "py": "B: Tā shì kāichē qù de."
      },
      {
       "hz": "A:她是跟友美一起去的嗎？",
       "vi": "A: Cô ấy đi cùng Yumi à?",
       "py": "A: Tā shì gēn Yǒuměi yìqǐ qù de ma?"
      },
      {
       "hz": "A:爸爸，這個句子是什麼意思？",
       "vi": "A: Bố ơi, câu này có nghĩa là gì?",
       "py": "A: Bàba, zhège jùzi shì shénme yìsi?"
      },
      {
       "hz": "B:我現在沒空，晚上再告訴你。",
       "vi": "B: Bây giờ bố không rảnh, tối bố nói cho con.",
       "py": "B: Wǒ xiànzài méikòng, wǎnshàng zài gàosù nǐ."
      },
      {
       "hz": "A:你要不要跟我一起去打球？",
       "vi": "A: Bạn có muốn đi chơi bóng với tôi không?",
       "py": "A: Nǐ yào búyào gēn wǒ yìqǐ qù dǎqiú?"
      },
      {
       "hz": "B:我今天有一點兒累，我們週末再去吧。",
       "vi": "B: Hôm nay tôi hơi mệt, cuối tuần chúng ta đi nhé.",
       "py": "B: Wǒ jīntiān yǒu yìdiǎn'ér lèi, wǒmen zhōumò zài qù ba."
      },
      {
       "hz": "天氣太冷了，等車來了，我們再去外面。",
       "vi": "Trời lạnh quá, đợi xe đến rồi chúng ta hãy ra ngoài.",
       "py": "Tiānqì tàilěng le, děng chē lái le, wǒmen zài qù wàimiàn."
      },
      {
       "hz": "A:妳決定買這種茶了嗎？",
       "vi": "A: Chị đã quyết định mua loại trà này chưa?",
       "py": "A: Nǐ juédìng mǎi zhèzhǒng chá le ma?"
      },
      {
       "hz": "B:等我先生也喝了，我們再決定買不買。",
       "vi": "B: Đợi chồng tôi uống thử đã, rồi chúng tôi mới quyết định có mua hay không.",
       "py": "B: Děng wǒ xiānshēng yě hē le, wǒmen zài juédìng mǎi bù mǎi."
      },
      {
       "hz": "A:這個問題很難，你可以教我嗎？",
       "vi": "A: Câu hỏi này khó quá, bạn dạy tôi được không?",
       "py": "A: Zhège wèntí hěn nán, nǐ kěyǐ jiào wǒ ma?"
      },
      {
       "hz": "B:我現在要去上課，等下課了再教你，好不好？",
       "vi": "B: Bây giờ tôi phải đi học, đợi tan học rồi tôi dạy bạn nhé?",
       "py": "B: Wǒ xiànzài yào qù shàngkè, děng xiàkè le zài jiào nǐ, hǎobùhǎo?"
      },
      {
       "hz": "A:我們一起去吃飯吧。",
       "vi": "A: Chúng ta cùng đi ăn cơm đi.",
       "py": "A: Wǒmen yìqǐ qù chīfàn ba."
      },
      {
       "hz": "一起吃晚飯。",
       "vi": "Cùng ăn tối.",
       "py": "Yìqǐ chīwǎnfàn."
      },
      {
       "hz": "B:現在去吃飯的人太多了，我想先寫功課，等人少了再去吃。",
       "vi": "B: Bây giờ người đi ăn đông quá, tôi muốn làm bài tập trước, đợi vắng người rồi hãy đi ăn.",
       "py": "B: Xiànzài qù chīfàn de rén tài duō le, wǒ xiǎng xiān xiě gōngkè, děng rén shǎo le zài qù chī."
      },
      {
       "hz": "A：現在太熱了！",
       "vi": "A: Bây giờ nóng quá!",
       "py": "A: Xiànzài tài rè le!"
      },
      {
       "hz": "B：對啊，我們先去吃冰淇淋，等不熱了，再去海邊玩，好不好？",
       "vi": "B: Đúng vậy, chúng ta đi ăn kem trước, đợi hết nóng rồi đi biển chơi, được không?",
       "py": "B: Duì a, wǒmen xiān qù chī bīngqílín, děng bú rè le, zài qù hǎibiān wán, hǎobùhǎo?"
      },
      {
       "hz": "媽媽：明天妳打算去哪裡？",
       "vi": "Mẹ: Ngày mai con định đi đâu?",
       "py": "Māma: Míngtiān nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "女兒：我要先去朋友家，等百貨公司開了，再去買衣服。",
       "vi": "Con gái: Con sẽ đến nhà bạn trước, đợi trung tâm thương mại mở cửa rồi đi mua quần áo.",
       "py": "Nǚ'ér: Wǒ yào xiān qù péngyǒujiā, děng bǎihuògōngsī kāi le, zài qù mǎi yīfú."
      },
      {
       "hz": "孩子:媽媽，我好餓。",
       "vi": "Con: Mẹ ơi, con đói quá.",
       "py": "Háizi: Māma, wǒ hǎo è."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Nhấn mạnh với 是……的",
   "giaiThich": "是……的 dùng để nhấn mạnh THỜI GIAN, NƠI CHỐN, NGƯỜI hay CÁCH THỨC của việc đã xảy ra. Câu khẳng định có thể lược 是, nhưng câu phủ định thì KHÔNG được lược."
  },
  {
   "title": "II. 給 as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "When 給 serves as a preposition, it indicates “to” or “for”.",
     "examples": [
      {
       "hz": "媽媽給我買了我最愛吃的冰淇淋。",
       "vi": "Mẹ mua cho tôi món kem tôi thích ăn nhất.",
       "py": "Māma gěi wǒ mǎi le wǒ zuì ài chī de bīngqílín."
      },
      {
       "hz": "A:你在做什麼？",
       "vi": "A: Bạn đang làm gì?",
       "py": "A: Nǐ zài zuò shénme?"
      },
      {
       "hz": "B:我在給我男朋友寫信。",
       "vi": "B: Tôi đang viết thư cho bạn trai.",
       "py": "B: Wǒ zài gěi wǒ nánpéngyǒu xiěxìn."
      },
      {
       "hz": "A:你還沒給哥哥寫生日卡片嗎？",
       "vi": "A: Bạn vẫn chưa viết thiệp sinh nhật cho anh trai à?",
       "py": "A: Nǐ hái méi gěi gēge xiě shēngrì kǎpiàn ma?"
      },
      {
       "hz": "B:還沒，我今天晚上會寫。",
       "vi": "B: Chưa, tối nay tôi sẽ viết.",
       "py": "B: Hái méi, wǒ jīntiān wǎnshàng huì xiě."
      },
      {
       "hz": "A:他要給誰打電話？",
       "vi": "A: Anh ấy định gọi điện cho ai?",
       "py": "A: Tā yào gěi shéi dǎdiànhuà?"
      },
      {
       "hz": "A:你給誰買衣服？",
       "vi": "A: Bạn mua quần áo cho ai?",
       "py": "A: Nǐ gěi shéi mǎi yīfú?"
      },
      {
       "hz": "A:你給老師寫信了嗎？",
       "vi": "A: Bạn đã viết thư cho thầy giáo chưa?",
       "py": "A: Nǐ gěi lǎoshī xiěxìn le ma?"
      },
      {
       "hz": "這個短文是誰寫的？",
       "vi": "Bài văn ngắn này do ai viết?",
       "py": "Zhège duǎnwén shì shéi xiě de?"
      },
      {
       "hz": "他是怎麼約友美的？",
       "vi": "Anh ấy hẹn Yumi bằng cách nào?",
       "py": "Tā shì zěnme yuē Yǒuměi de?"
      },
      {
       "hz": "他們在哪裡見面？那個地方怎麼樣？",
       "vi": "Họ gặp nhau ở đâu? Chỗ đó thế nào?",
       "py": "Tāmen zài nǎlǐ jiànmiàn? Nàge dìfāng zěnmeyàng?"
      },
      {
       "hz": "他們在見面的地方，做了哪些事？",
       "vi": "Ở chỗ gặp nhau, họ đã làm những gì?",
       "py": "Tāmen zài jiànmiàn de dìfāng, zuò le nǎxiē shì?"
      },
      {
       "hz": "他還想跟友美見面嗎？為什麼？",
       "vi": "Anh ấy còn muốn gặp Yumi nữa không? Tại sao?",
       "py": "Tā hái xiǎng gēn Yǒuměi jiànmiàn ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "給 làm giới từ",
   "giaiThich": "給 đứng trước người nhận, nghĩa \"cho, giúp cho\"."
  }
 ],
 "td1-12.1": [
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你會用毛筆寫字嗎？",
       "vi": "A: Bạn có biết viết chữ bằng bút lông không?",
       "py": "A: Nǐ huì yòng máobǐ xiězì ma?"
      },
      {
       "hz": "B:不會，你可以教我嗎？",
       "vi": "B: Không biết, bạn dạy tôi được không?",
       "py": "B: Búhuì, nǐ kěyǐ jiào wǒ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你有照相機嗎？",
       "vi": "A: Bạn có máy ảnh không?",
       "py": "A: Nǐ yǒu zhàoxiàngjī ma?"
      },
      {
       "hz": "B:沒有，我都用手機照相。",
       "vi": "B: Không có, tôi toàn chụp ảnh bằng điện thoại.",
       "py": "B: Méiyǒu, wǒ dōu yòng shǒujī zhàoxiàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”. Zhēn de ma? Kěnéng shì yīnwèi zuìjìn wǒ chángcháng yòng Zhōngwén gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "A:我覺得你的中文進步了。",
       "vi": "A: Tôi thấy tiếng Trung của bạn tiến bộ rồi.",
       "py": "A: Wǒ juéde nǐ de zhōngwén jìnbù le."
      },
      {
       "hz": "B:真的嗎？可能是因為最近我常常用中文跟朋友聊天。",
       "vi": "B: Thật à? Có lẽ vì gần đây tôi hay dùng tiếng Trung nói chuyện với bạn bè.",
       "py": "B: Zhēnde ma? Kěnéng shìyīnwèi zuìjìn wǒ chángcháng yòng zhōngwén gēn péngyǒu liáotiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò.",
     "examples": [
      {
       "hz": "我以前很胖，現在瘦了幾公斤。",
       "vi": "Trước đây tôi rất béo, bây giờ đã giảm được mấy cân.",
       "py": "Wǒ yǐqián hěnpàng, xiànzài shòu le jǐgōngjīn."
      },
      {
       "hz": "以前我想在銀行工作，現在覺得當記者也不錯。",
       "vi": "Trước đây tôi muốn làm việc ở ngân hàng, bây giờ thấy làm phóng viên cũng không tệ.",
       "py": "Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Rúguǒ nǐ bù néng lái, qǐng nǐ zài zhè ge lǐbài sān yǐqián gàosù wǒ. Yínháng xiàwǔ sān diǎn bàn xiūxí, suǒyǐ sān diǎn yǐqián wǒ yídìng yào dào yínháng. Wǒ xīwàng yí ge lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn. (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?",
     "examples": [
      {
       "hz": "A：聽說你的英文老師快要回美國了，以後你要跟誰學？",
       "vi": "A: Nghe nói cô giáo tiếng Anh của bạn sắp về Mỹ rồi, sau này bạn sẽ học với ai?",
       "py": "A: Tīngshuō nǐ de yīngwén lǎoshī kuàiyào huí Měiguó le, yǐhòu nǐ yào gēn shéi xué?"
      },
      {
       "hz": "B：我現在還不知道。",
       "vi": "B: Bây giờ tôi vẫn chưa biết.",
       "py": "B: Wǒ xiànzài hái bù zhīdào."
      },
      {
       "hz": "我會回來。",
       "vi": "Tôi sẽ quay lại.",
       "py": "Wǒhuì huílái."
      },
      {
       "hz": "我一定在家。",
       "vi": "Tôi chắc chắn sẽ ở nhà.",
       "py": "Wǒ yídìng zàijiā."
      },
      {
       "hz": "今天中午以前，我都會在家。",
       "vi": "Trước trưa hôm nay tôi đều ở nhà.",
       "py": "Jīntiān zhōngwǔ yǐqián, wǒ dōu huì zàijiā."
      },
      {
       "hz": "如果你不能來，請你在這個禮拜三以前告訴我。",
       "vi": "Nếu bạn không đến được, xin hãy báo cho tôi trước thứ Tư tuần này.",
       "py": "Rúguǒ nǐ bùnéng lái, qǐng nǐ zài zhège lǐbàisān yǐqián gàosù wǒ."
      },
      {
       "hz": "銀行下午三點半休息，所以三點以前我一定要到銀行。",
       "vi": "Ngân hàng nghỉ lúc ba giờ rưỡi chiều, nên tôi nhất định phải đến ngân hàng trước ba giờ.",
       "py": "Yínháng xiàwǔ sāndiǎn bàn xiūxí, suǒyǐ sāndiǎn yǐqián wǒ yídìng yào dào yínháng."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "我們是兩年以前在日本認識的。",
       "vi": "Chúng tôi quen nhau ở Nhật từ hai năm trước.",
       "py": "Wǒmen shì liǎngnián yǐqián zài Rìběn rènshì de."
      },
      {
       "hz": "我希望一個禮拜以後，可以在英國跟他見面。",
       "vi": "Tôi hy vọng một tuần sau có thể gặp anh ấy ở Anh.",
       "py": "Wǒ xīwàng yígè lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "三天以前，我給他寄了一封信。",
       "vi": "Ba ngày trước tôi đã gửi cho anh ấy một bức thư.",
       "py": "Sāntiān yǐqián, wǒ gěi tā jì le yìfēngxìn."
      },
      {
       "hz": "A：你每天幾點吃晚飯？",
       "vi": "A: Hằng ngày bạn ăn tối lúc mấy giờ?",
       "py": "A: Nǐ měitiān jǐdiǎn chīwǎnfàn?"
      },
      {
       "hz": "A：你是什麼時候來台灣的？",
       "vi": "A: Bạn đến Đài Loan khi nào?",
       "py": "A: Nǐ shì shénme shíhòu lái Táiwān de?"
      },
      {
       "hz": "A：十點了，中明還沒來，他遲到了。",
       "vi": "A: Mười giờ rồi mà Trung Minh vẫn chưa đến, cậu ấy đến muộn rồi.",
       "py": "A: Shídiǎn le, Zhōngmíng hái méi lái, tā chídào le."
      },
      {
       "hz": "A：上班以前，你吃早飯嗎？",
       "vi": "A: Trước khi đi làm, bạn có ăn sáng không?",
       "py": "A: Shàngbān yǐqián, nǐ chī zǎofàn ma?"
      },
      {
       "hz": "B：不吃，我沒有時間吃。",
       "vi": "B: Không ăn, tôi không có thời gian ăn.",
       "py": "B: Bùchī, wǒ méiyǒu shíjiān chī."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：他來台灣上中文課以前，會說一點兒中文，你呢？",
       "vi": "A: Trước khi đến Đài Loan học tiếng Trung, anh ấy đã biết nói một chút tiếng Trung, còn bạn?",
       "py": "A: Tā lái Táiwān shàng zhōngwén kè yǐqián, huì shuō yìdiǎn'ér zhōngwén, nǐ ne?"
      },
      {
       "hz": "B：我也會說一點兒，可是說得不好。",
       "vi": "B: Tôi cũng biết nói một chút, nhưng nói không giỏi.",
       "py": "B: Wǒ yě huì shuō yìdiǎn'ér, kěshì shuō de bùhǎo."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：下班以後，妳有空嗎？",
       "vi": "A: Sau khi tan làm, chị có rảnh không?",
       "py": "A: Xiàbān yǐhòu, nǐyǒu kōng ma?"
      },
      {
       "hz": "B：對不起，下班以後我要去上課。",
       "vi": "B: Xin lỗi, sau khi tan làm tôi phải đi học.",
       "py": "B: Duìbùqǐ, xiàbān yǐhòu wǒ yào qù shàngkè."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "國安為什麼覺得在麵包店工作不辛苦？",
       "vi": "Tại sao Quốc An thấy làm ở tiệm bánh mì không vất vả?",
       "py": "Guó'ān wèishénme juéde zài miànbāodiàn gōngzuò bù xīnkǔ?"
      },
      {
       "hz": "中明以前在哪裡上過班？為什麼現在不做了？",
       "vi": "Trước đây Trung Minh đã từng làm việc ở đâu? Tại sao bây giờ không làm nữa?",
       "py": "Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?"
      },
      {
       "hz": "國安什麼時候上班？",
       "vi": "Quốc An đi làm lúc nào?",
       "py": "Guó'ān shénme shíhòu shàngbān?"
      },
      {
       "hz": "中明也會去麵包店工作嗎？",
       "vi": "Trung Minh cũng sẽ đến tiệm bánh mì làm việc à?",
       "py": "Zhōngmíng yě huì qù miànbāodiàn gōngzuò ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition , it indicates “to” or “for” and usually precedes a noun. Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duō hē shuǐ.”",
     "examples": [
      {
       "hz": "他常對我說：「我們應該要多運動、多喝水。」2.這件事我只對你說，你不要告訴別人。",
       "vi": "Anh ấy thường nói với tôi: “Chúng ta nên tập thể dục nhiều, uống nhiều nước.” Chuyện này tôi chỉ nói với bạn, bạn đừng kể với người khác.",
       "py": "Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duōhēshuǐ.” 2. Zhèjiàn shì wǒ zhǐ duì nǐ shuō, nǐ búyào gàosù biérén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "常用手機對眼睛不好。",
       "vi": "Dùng điện thoại nhiều không tốt cho mắt.",
       "py": "Chángyòng shǒujī duì yǎnjīng bùhǎo."
      },
      {
       "hz": "這本書對我不難，我可以學學看。",
       "vi": "Quyển sách này đối với tôi không khó, tôi có thể học thử xem.",
       "py": "Zhè běnshū duì wǒ bùnán, wǒ kěyǐ xuéxuékàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "他對我很好，常常幫我的忙。",
       "vi": "Anh ấy đối xử với tôi rất tốt, thường giúp đỡ tôi.",
       "py": "Tā duì wǒ hěn hǎo, chángcháng bāng wǒ de máng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun. Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐ jiànkāng. cāntīng / nà jiā / le /  tài yuǎn / ， / bù fāngbiàn / duì / wǒmen / dōu /. shuō le hěn duō huà / tā / duì wǒ / zuótiān /，/ wǒ bú tài dǒng / yǒu de / kěshì /. duì shēntǐ / yùndòng / hěn hǎo /，/ tài duō tiándiǎn / chī / bù hǎo / duì shēntǐ /. duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo/，/duō xiūxí/ chángcháng yào tā / yǐhòu / xiàbān /.",
     "examples": [
      {
       "hz": "A：老闆對你們怎麼樣？",
       "vi": "A: Ông chủ đối xử với các bạn thế nào?",
       "py": "A: Lǎobǎn duì nǐmen zěnmeyàng?"
      },
      {
       "hz": "B：他對我們很不錯，常常要我們注意身體健康。",
       "vi": "B: Ông ấy đối xử với chúng tôi rất tốt, thường nhắc chúng tôi chú ý giữ gìn sức khoẻ.",
       "py": "B: Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "餐廳/那家/了/太遠/，/不方便/對/我們/都/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Cāntīng / nà jiā / le / tài yuǎn /, / bù fāngbiàn / duì / wǒmen / dōu /."
      },
      {
       "hz": "說了很多話/他/對我/昨天/，/我不太懂/有的/可是/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shuō le hěnduō huà / tā / duì wǒ / zuótiān /, / wǒ bú tài dǒng / yǒu de / kěshì /."
      },
      {
       "hz": "對/李先生/李太太/很好/，/多休息/常常要他/以後/下班/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo /, / duō xiūxí / chángcháng yào tā / yǐhòu / xiàbān /."
      },
      {
       "hz": "對身體/運動/很好/，/太多甜點/吃/不好/對身體/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì shēntǐ / yùndòng / hěn hǎo /, / tài duō tiándiǎn / chī / bùhǎo / duì shēntǐ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. Hěn duō Táiwān rén qù guò Rìběn, yīnwèi cóng Táiwān dào Rìběn bù yuǎn .",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "很多台灣人去過日本，因為從台灣到日本不遠。",
       "vi": "Nhiều người Đài Loan đã từng đi Nhật, vì từ Đài Loan sang Nhật không xa.",
       "py": "Hěnduō táiwānrén qùguò Rìběn, yīnwèi cóng Táiwān dào Rìběn bùyuǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience.",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：他來過我們家嗎？",
       "vi": "A: Anh ấy đã từng đến nhà chúng ta chưa?",
       "py": "A: Tā lái guò wǒmen jiā ma?"
      },
      {
       "hz": "B：來過，那個時候你不在家。",
       "vi": "B: Đến rồi, lúc đó bạn không ở nhà.",
       "py": "B: Lái guò, nàge shíhòu nǐ bú zàijiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. yě xué le yìdiǎnr Rìwén gēn Yìnníwén, wǒ qù Yìdàlì, Déguó, Fǎguó Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěn duō guójiā wán. 1.Read the article below and answer the questions. dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yí ge yǒumíng de jìzhě. (國家 guójiā, country/nation; 義大利 Yìdàlì, Italy; 德國 Déguó, Germany; 法國 Fǎguó, France; 印尼文 Yìnníwén, Indonesian language; 的時候 de shíhòu, when)",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：你吃過臭豆腐嗎？",
       "vi": "A: Bạn đã từng ăn đậu phụ thối chưa?",
       "py": "A: Nǐ chī guò chòudòufǔ ma?"
      },
      {
       "hz": "B：我還沒吃過，聽說很特別。",
       "vi": "B: Tôi chưa ăn bao giờ, nghe nói rất đặc biệt.",
       "py": "B: Wǒ hái méichīguò, tīngshuō hěn tèbié."
      },
      {
       "hz": "我很喜歡學習語言，也很想去很多國家玩。",
       "vi": "Tôi rất thích học ngoại ngữ, cũng rất muốn đi chơi nhiều nước.",
       "py": "Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěnduō guójiā wán."
      },
      {
       "hz": "我會說英文、中文、義大利文、德文跟法文，也學了一點兒日文跟印尼文，我去義大利、德國、法國的時候，會說他們的語言，所以很好玩。",
       "vi": "Tôi biết nói tiếng Anh, tiếng Trung, tiếng Ý, tiếng Đức và tiếng Pháp, cũng đã học một chút tiếng Nhật và tiếng Indonesia. Khi đi Ý, Đức, Pháp, tôi nói được tiếng của họ nên rất vui.",
       "py": "Wǒhuì shuō yīngwén, zhōngwén, yìdàlìwén, déwén gēn fǎwén, yě xué le yìdiǎn'ér rìwén gēn Yìnní wén, wǒ qù yìdàlì, Déguó, Fǎguó de shíhòu, huì shuō tāmen de yǔyán, suǒyǐ hěn hǎowán."
      },
      {
       "hz": "我想做一個可以用很多語言的工作，當記者很不錯，希望以後能當一個有名的記者。",
       "vi": "Tôi muốn làm một công việc dùng được nhiều ngoại ngữ, làm phóng viên rất hay, hy vọng sau này có thể trở thành một phóng viên nổi tiếng.",
       "py": "Wǒ xiǎng zuò yígè kěyǐ yòng hěnduō yǔyán de gōngzuò, dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yígè yǒumíng de jìzhě."
      },
      {
       "hz": "問題ㄧ：他去過法國嗎？",
       "vi": "Câu hỏi 1: Anh ấy đã từng đi Pháp chưa?",
       "py": "Wèntí ㄧ: Tā qùguò Fǎguó ma?"
      },
      {
       "hz": "問題二：他學過印尼文嗎？",
       "vi": "Câu hỏi 2: Anh ấy đã từng học tiếng Indonesia chưa?",
       "py": "Wèntí èr: Tā xué guò Yìnní wén ma?"
      },
      {
       "hz": "問題三：他當過記者嗎？",
       "vi": "Câu hỏi 3: Anh ấy đã từng làm phóng viên chưa?",
       "py": "Wèntí sān: Tā dāng guò jìzhě ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "2. Complete the dialogues with V 過.",
   "points": [
    {
     "label": null,
     "formula": "Māma：Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bù néng zuò wǎnfàn le. 的時候 is used to express “when ” succeeding statements. 的時候 is used to express “when ” succeeding statements. Wǒ xīnqíng bù hǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "B：還沒，我上的是晚上的課。",
       "vi": "B: Chưa, tôi học lớp buổi tối.",
       "py": "B: Hái méi, wǒ shàng de shì wǎnshàng de kè."
      },
      {
       "hz": "2) A：你很不舒服吧？要不要去看醫生？",
       "vi": "2) A: Bạn khó chịu lắm phải không? Có muốn đi khám bác sĩ không?",
       "py": "2) A: Nǐ hěn bù shūfú ba? Yào búyào qù kàn yīshēng?"
      },
      {
       "hz": "3) 媽媽：我今天晚上要跟朋友去吃飯，不能做晚飯了。",
       "vi": "3) Mẹ: Tối nay mẹ đi ăn với bạn, không nấu cơm tối được.",
       "py": "3) māma: Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bùnéng zuò wǎnfàn le."
      },
      {
       "hz": "我喜歡出去運動。",
       "vi": "Tôi thích ra ngoài tập thể dục.",
       "py": "Wǒ xǐhuān chūqù yùndòng."
      },
      {
       "hz": "在我們家，吃飯的時候，不可以用手機。",
       "vi": "Ở nhà chúng tôi, khi ăn cơm không được dùng điện thoại.",
       "py": "Zài wǒmen jiā, chīfàn de shíhòu, bù kěyǐ yòng shǒujī."
      },
      {
       "hz": "他玩電腦的時候，都不跟別人說話。",
       "vi": "Khi chơi máy tính, cậu ấy không nói chuyện với ai cả.",
       "py": "Tā wándiànnǎo de shíhòu, dōu bù gēn biérén shuōhuà."
      },
      {
       "hz": "我喜歡出去走走3.我心情不好的時候，都會聽音樂、跟朋友聊天。",
       "vi": "Tôi thích ra ngoài đi dạo. Khi tâm trạng không tốt, tôi thường nghe nhạc, nói chuyện với bạn bè.",
       "py": "Wǒ xǐhuān chūqù zǒuzǒu 3. Wǒ xīnqíng bùhǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān."
      },
      {
       "hz": "A：你什麼時候最開心？",
       "vi": "A: Khi nào bạn vui nhất?",
       "py": "A: Nǐ shénme shíhòu zuì kāixīn?"
      },
      {
       "hz": "A：你發燒的時候，會怎麼做？",
       "vi": "A: Khi bị sốt bạn sẽ làm gì?",
       "py": "A: Nǐ fāshāo de shíhòu, huì zěnme zuò?"
      },
      {
       "hz": "A：你不上課的時候，都在做什麼？",
       "vi": "A: Khi không phải đi học bạn thường làm gì?",
       "py": "A: Nǐ bú shàngkè de shíhòu, dōu zài zuò shénme?"
      },
      {
       "hz": "昨天他看了什麼電視節目？",
       "vi": "Hôm qua anh ấy đã xem chương trình tivi gì?",
       "py": "Zuótiān tā kàn le shénme diànshìjiémù?"
      },
      {
       "hz": "現在的年輕人覺得什麼比較重要？",
       "vi": "Giới trẻ bây giờ thấy điều gì quan trọng hơn?",
       "py": "Xiànzài de niánqīngrén juéde shénme bǐjiào zhòngyào?"
      },
      {
       "hz": "現在的年輕人喜歡哪種工作？",
       "vi": "Giới trẻ bây giờ thích loại công việc nào?",
       "py": "Xiànzài de niánqīngrén xǐhuān nǎ zhǒng gōngzuò?"
      },
      {
       "hz": "為什麼工人常常不夠？",
       "vi": "Tại sao công nhân thường bị thiếu?",
       "py": "Wèishénme gōngrén chángcháng búgòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với V 過 và 的時候",
   "giaiThich": "Phần luyện tập dùng \"động từ + 過\"; kèm mẫu 的時候 nghĩa \"khi, lúc\"."
  }
 ],
 "td1-12.2": [
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你會用毛筆寫字嗎？",
       "vi": "A: Bạn có biết viết chữ bằng bút lông không?",
       "py": "A: Nǐ huì yòng máobǐ xiězì ma?"
      },
      {
       "hz": "B:不會，你可以教我嗎？",
       "vi": "B: Không biết, bạn dạy tôi được không?",
       "py": "B: Búhuì, nǐ kěyǐ jiào wǒ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你有照相機嗎？",
       "vi": "A: Bạn có máy ảnh không?",
       "py": "A: Nǐ yǒu zhàoxiàngjī ma?"
      },
      {
       "hz": "B:沒有，我都用手機照相。",
       "vi": "B: Không có, tôi toàn chụp ảnh bằng điện thoại.",
       "py": "B: Méiyǒu, wǒ dōu yòng shǒujī zhàoxiàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”. Zhēn de ma? Kěnéng shì yīnwèi zuìjìn wǒ chángcháng yòng Zhōngwén gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "A:我覺得你的中文進步了。",
       "vi": "A: Tôi thấy tiếng Trung của bạn tiến bộ rồi.",
       "py": "A: Wǒ juéde nǐ de zhōngwén jìnbù le."
      },
      {
       "hz": "B:真的嗎？可能是因為最近我常常用中文跟朋友聊天。",
       "vi": "B: Thật à? Có lẽ vì gần đây tôi hay dùng tiếng Trung nói chuyện với bạn bè.",
       "py": "B: Zhēnde ma? Kěnéng shìyīnwèi zuìjìn wǒ chángcháng yòng zhōngwén gēn péngyǒu liáotiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò.",
     "examples": [
      {
       "hz": "我以前很胖，現在瘦了幾公斤。",
       "vi": "Trước đây tôi rất béo, bây giờ đã giảm được mấy cân.",
       "py": "Wǒ yǐqián hěnpàng, xiànzài shòu le jǐgōngjīn."
      },
      {
       "hz": "以前我想在銀行工作，現在覺得當記者也不錯。",
       "vi": "Trước đây tôi muốn làm việc ở ngân hàng, bây giờ thấy làm phóng viên cũng không tệ.",
       "py": "Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Rúguǒ nǐ bù néng lái, qǐng nǐ zài zhè ge lǐbài sān yǐqián gàosù wǒ. Yínháng xiàwǔ sān diǎn bàn xiūxí, suǒyǐ sān diǎn yǐqián wǒ yídìng yào dào yínháng. Wǒ xīwàng yí ge lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn. (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?",
     "examples": [
      {
       "hz": "A：聽說你的英文老師快要回美國了，以後你要跟誰學？",
       "vi": "A: Nghe nói cô giáo tiếng Anh của bạn sắp về Mỹ rồi, sau này bạn sẽ học với ai?",
       "py": "A: Tīngshuō nǐ de yīngwén lǎoshī kuàiyào huí Měiguó le, yǐhòu nǐ yào gēn shéi xué?"
      },
      {
       "hz": "B：我現在還不知道。",
       "vi": "B: Bây giờ tôi vẫn chưa biết.",
       "py": "B: Wǒ xiànzài hái bù zhīdào."
      },
      {
       "hz": "我會回來。",
       "vi": "Tôi sẽ quay lại.",
       "py": "Wǒhuì huílái."
      },
      {
       "hz": "我一定在家。",
       "vi": "Tôi chắc chắn sẽ ở nhà.",
       "py": "Wǒ yídìng zàijiā."
      },
      {
       "hz": "今天中午以前，我都會在家。",
       "vi": "Trước trưa hôm nay tôi đều ở nhà.",
       "py": "Jīntiān zhōngwǔ yǐqián, wǒ dōu huì zàijiā."
      },
      {
       "hz": "如果你不能來，請你在這個禮拜三以前告訴我。",
       "vi": "Nếu bạn không đến được, xin hãy báo cho tôi trước thứ Tư tuần này.",
       "py": "Rúguǒ nǐ bùnéng lái, qǐng nǐ zài zhège lǐbàisān yǐqián gàosù wǒ."
      },
      {
       "hz": "銀行下午三點半休息，所以三點以前我一定要到銀行。",
       "vi": "Ngân hàng nghỉ lúc ba giờ rưỡi chiều, nên tôi nhất định phải đến ngân hàng trước ba giờ.",
       "py": "Yínháng xiàwǔ sāndiǎn bàn xiūxí, suǒyǐ sāndiǎn yǐqián wǒ yídìng yào dào yínháng."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "我們是兩年以前在日本認識的。",
       "vi": "Chúng tôi quen nhau ở Nhật từ hai năm trước.",
       "py": "Wǒmen shì liǎngnián yǐqián zài Rìběn rènshì de."
      },
      {
       "hz": "我希望一個禮拜以後，可以在英國跟他見面。",
       "vi": "Tôi hy vọng một tuần sau có thể gặp anh ấy ở Anh.",
       "py": "Wǒ xīwàng yígè lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "三天以前，我給他寄了一封信。",
       "vi": "Ba ngày trước tôi đã gửi cho anh ấy một bức thư.",
       "py": "Sāntiān yǐqián, wǒ gěi tā jì le yìfēngxìn."
      },
      {
       "hz": "A：你每天幾點吃晚飯？",
       "vi": "A: Hằng ngày bạn ăn tối lúc mấy giờ?",
       "py": "A: Nǐ měitiān jǐdiǎn chīwǎnfàn?"
      },
      {
       "hz": "A：你是什麼時候來台灣的？",
       "vi": "A: Bạn đến Đài Loan khi nào?",
       "py": "A: Nǐ shì shénme shíhòu lái Táiwān de?"
      },
      {
       "hz": "A：十點了，中明還沒來，他遲到了。",
       "vi": "A: Mười giờ rồi mà Trung Minh vẫn chưa đến, cậu ấy đến muộn rồi.",
       "py": "A: Shídiǎn le, Zhōngmíng hái méi lái, tā chídào le."
      },
      {
       "hz": "A：上班以前，你吃早飯嗎？",
       "vi": "A: Trước khi đi làm, bạn có ăn sáng không?",
       "py": "A: Shàngbān yǐqián, nǐ chī zǎofàn ma?"
      },
      {
       "hz": "B：不吃，我沒有時間吃。",
       "vi": "B: Không ăn, tôi không có thời gian ăn.",
       "py": "B: Bùchī, wǒ méiyǒu shíjiān chī."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：他來台灣上中文課以前，會說一點兒中文，你呢？",
       "vi": "A: Trước khi đến Đài Loan học tiếng Trung, anh ấy đã biết nói một chút tiếng Trung, còn bạn?",
       "py": "A: Tā lái Táiwān shàng zhōngwén kè yǐqián, huì shuō yìdiǎn'ér zhōngwén, nǐ ne?"
      },
      {
       "hz": "B：我也會說一點兒，可是說得不好。",
       "vi": "B: Tôi cũng biết nói một chút, nhưng nói không giỏi.",
       "py": "B: Wǒ yě huì shuō yìdiǎn'ér, kěshì shuō de bùhǎo."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：下班以後，妳有空嗎？",
       "vi": "A: Sau khi tan làm, chị có rảnh không?",
       "py": "A: Xiàbān yǐhòu, nǐyǒu kōng ma?"
      },
      {
       "hz": "B：對不起，下班以後我要去上課。",
       "vi": "B: Xin lỗi, sau khi tan làm tôi phải đi học.",
       "py": "B: Duìbùqǐ, xiàbān yǐhòu wǒ yào qù shàngkè."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "國安為什麼覺得在麵包店工作不辛苦？",
       "vi": "Tại sao Quốc An thấy làm ở tiệm bánh mì không vất vả?",
       "py": "Guó'ān wèishénme juéde zài miànbāodiàn gōngzuò bù xīnkǔ?"
      },
      {
       "hz": "中明以前在哪裡上過班？為什麼現在不做了？",
       "vi": "Trước đây Trung Minh đã từng làm việc ở đâu? Tại sao bây giờ không làm nữa?",
       "py": "Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?"
      },
      {
       "hz": "國安什麼時候上班？",
       "vi": "Quốc An đi làm lúc nào?",
       "py": "Guó'ān shénme shíhòu shàngbān?"
      },
      {
       "hz": "中明也會去麵包店工作嗎？",
       "vi": "Trung Minh cũng sẽ đến tiệm bánh mì làm việc à?",
       "py": "Zhōngmíng yě huì qù miànbāodiàn gōngzuò ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition , it indicates “to” or “for” and usually precedes a noun. Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duō hē shuǐ.”",
     "examples": [
      {
       "hz": "他常對我說：「我們應該要多運動、多喝水。」2.這件事我只對你說，你不要告訴別人。",
       "vi": "Anh ấy thường nói với tôi: “Chúng ta nên tập thể dục nhiều, uống nhiều nước.” Chuyện này tôi chỉ nói với bạn, bạn đừng kể với người khác.",
       "py": "Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duōhēshuǐ.” 2. Zhèjiàn shì wǒ zhǐ duì nǐ shuō, nǐ búyào gàosù biérén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "常用手機對眼睛不好。",
       "vi": "Dùng điện thoại nhiều không tốt cho mắt.",
       "py": "Chángyòng shǒujī duì yǎnjīng bùhǎo."
      },
      {
       "hz": "這本書對我不難，我可以學學看。",
       "vi": "Quyển sách này đối với tôi không khó, tôi có thể học thử xem.",
       "py": "Zhè běnshū duì wǒ bùnán, wǒ kěyǐ xuéxuékàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "他對我很好，常常幫我的忙。",
       "vi": "Anh ấy đối xử với tôi rất tốt, thường giúp đỡ tôi.",
       "py": "Tā duì wǒ hěn hǎo, chángcháng bāng wǒ de máng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun. Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐ jiànkāng. cāntīng / nà jiā / le /  tài yuǎn / ， / bù fāngbiàn / duì / wǒmen / dōu /. shuō le hěn duō huà / tā / duì wǒ / zuótiān /，/ wǒ bú tài dǒng / yǒu de / kěshì /. duì shēntǐ / yùndòng / hěn hǎo /，/ tài duō tiándiǎn / chī / bù hǎo / duì shēntǐ /. duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo/，/duō xiūxí/ chángcháng yào tā / yǐhòu / xiàbān /.",
     "examples": [
      {
       "hz": "A：老闆對你們怎麼樣？",
       "vi": "A: Ông chủ đối xử với các bạn thế nào?",
       "py": "A: Lǎobǎn duì nǐmen zěnmeyàng?"
      },
      {
       "hz": "B：他對我們很不錯，常常要我們注意身體健康。",
       "vi": "B: Ông ấy đối xử với chúng tôi rất tốt, thường nhắc chúng tôi chú ý giữ gìn sức khoẻ.",
       "py": "B: Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "餐廳/那家/了/太遠/，/不方便/對/我們/都/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Cāntīng / nà jiā / le / tài yuǎn /, / bù fāngbiàn / duì / wǒmen / dōu /."
      },
      {
       "hz": "說了很多話/他/對我/昨天/，/我不太懂/有的/可是/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shuō le hěnduō huà / tā / duì wǒ / zuótiān /, / wǒ bú tài dǒng / yǒu de / kěshì /."
      },
      {
       "hz": "對/李先生/李太太/很好/，/多休息/常常要他/以後/下班/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo /, / duō xiūxí / chángcháng yào tā / yǐhòu / xiàbān /."
      },
      {
       "hz": "對身體/運動/很好/，/太多甜點/吃/不好/對身體/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì shēntǐ / yùndòng / hěn hǎo /, / tài duō tiándiǎn / chī / bùhǎo / duì shēntǐ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. Hěn duō Táiwān rén qù guò Rìběn, yīnwèi cóng Táiwān dào Rìběn bù yuǎn .",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "很多台灣人去過日本，因為從台灣到日本不遠。",
       "vi": "Nhiều người Đài Loan đã từng đi Nhật, vì từ Đài Loan sang Nhật không xa.",
       "py": "Hěnduō táiwānrén qùguò Rìběn, yīnwèi cóng Táiwān dào Rìběn bùyuǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience.",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：他來過我們家嗎？",
       "vi": "A: Anh ấy đã từng đến nhà chúng ta chưa?",
       "py": "A: Tā lái guò wǒmen jiā ma?"
      },
      {
       "hz": "B：來過，那個時候你不在家。",
       "vi": "B: Đến rồi, lúc đó bạn không ở nhà.",
       "py": "B: Lái guò, nàge shíhòu nǐ bú zàijiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. yě xué le yìdiǎnr Rìwén gēn Yìnníwén, wǒ qù Yìdàlì, Déguó, Fǎguó Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěn duō guójiā wán. 1.Read the article below and answer the questions. dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yí ge yǒumíng de jìzhě. (國家 guójiā, country/nation; 義大利 Yìdàlì, Italy; 德國 Déguó, Germany; 法國 Fǎguó, France; 印尼文 Yìnníwén, Indonesian language; 的時候 de shíhòu, when)",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：你吃過臭豆腐嗎？",
       "vi": "A: Bạn đã từng ăn đậu phụ thối chưa?",
       "py": "A: Nǐ chī guò chòudòufǔ ma?"
      },
      {
       "hz": "B：我還沒吃過，聽說很特別。",
       "vi": "B: Tôi chưa ăn bao giờ, nghe nói rất đặc biệt.",
       "py": "B: Wǒ hái méichīguò, tīngshuō hěn tèbié."
      },
      {
       "hz": "我很喜歡學習語言，也很想去很多國家玩。",
       "vi": "Tôi rất thích học ngoại ngữ, cũng rất muốn đi chơi nhiều nước.",
       "py": "Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěnduō guójiā wán."
      },
      {
       "hz": "我會說英文、中文、義大利文、德文跟法文，也學了一點兒日文跟印尼文，我去義大利、德國、法國的時候，會說他們的語言，所以很好玩。",
       "vi": "Tôi biết nói tiếng Anh, tiếng Trung, tiếng Ý, tiếng Đức và tiếng Pháp, cũng đã học một chút tiếng Nhật và tiếng Indonesia. Khi đi Ý, Đức, Pháp, tôi nói được tiếng của họ nên rất vui.",
       "py": "Wǒhuì shuō yīngwén, zhōngwén, yìdàlìwén, déwén gēn fǎwén, yě xué le yìdiǎn'ér rìwén gēn Yìnní wén, wǒ qù yìdàlì, Déguó, Fǎguó de shíhòu, huì shuō tāmen de yǔyán, suǒyǐ hěn hǎowán."
      },
      {
       "hz": "我想做一個可以用很多語言的工作，當記者很不錯，希望以後能當一個有名的記者。",
       "vi": "Tôi muốn làm một công việc dùng được nhiều ngoại ngữ, làm phóng viên rất hay, hy vọng sau này có thể trở thành một phóng viên nổi tiếng.",
       "py": "Wǒ xiǎng zuò yígè kěyǐ yòng hěnduō yǔyán de gōngzuò, dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yígè yǒumíng de jìzhě."
      },
      {
       "hz": "問題ㄧ：他去過法國嗎？",
       "vi": "Câu hỏi 1: Anh ấy đã từng đi Pháp chưa?",
       "py": "Wèntí ㄧ: Tā qùguò Fǎguó ma?"
      },
      {
       "hz": "問題二：他學過印尼文嗎？",
       "vi": "Câu hỏi 2: Anh ấy đã từng học tiếng Indonesia chưa?",
       "py": "Wèntí èr: Tā xué guò Yìnní wén ma?"
      },
      {
       "hz": "問題三：他當過記者嗎？",
       "vi": "Câu hỏi 3: Anh ấy đã từng làm phóng viên chưa?",
       "py": "Wèntí sān: Tā dāng guò jìzhě ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "2. Complete the dialogues with V 過.",
   "points": [
    {
     "label": null,
     "formula": "Māma：Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bù néng zuò wǎnfàn le. 的時候 is used to express “when ” succeeding statements. 的時候 is used to express “when ” succeeding statements. Wǒ xīnqíng bù hǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "B：還沒，我上的是晚上的課。",
       "vi": "B: Chưa, tôi học lớp buổi tối.",
       "py": "B: Hái méi, wǒ shàng de shì wǎnshàng de kè."
      },
      {
       "hz": "2) A：你很不舒服吧？要不要去看醫生？",
       "vi": "2) A: Bạn khó chịu lắm phải không? Có muốn đi khám bác sĩ không?",
       "py": "2) A: Nǐ hěn bù shūfú ba? Yào búyào qù kàn yīshēng?"
      },
      {
       "hz": "3) 媽媽：我今天晚上要跟朋友去吃飯，不能做晚飯了。",
       "vi": "3) Mẹ: Tối nay mẹ đi ăn với bạn, không nấu cơm tối được.",
       "py": "3) māma: Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bùnéng zuò wǎnfàn le."
      },
      {
       "hz": "我喜歡出去運動。",
       "vi": "Tôi thích ra ngoài tập thể dục.",
       "py": "Wǒ xǐhuān chūqù yùndòng."
      },
      {
       "hz": "在我們家，吃飯的時候，不可以用手機。",
       "vi": "Ở nhà chúng tôi, khi ăn cơm không được dùng điện thoại.",
       "py": "Zài wǒmen jiā, chīfàn de shíhòu, bù kěyǐ yòng shǒujī."
      },
      {
       "hz": "他玩電腦的時候，都不跟別人說話。",
       "vi": "Khi chơi máy tính, cậu ấy không nói chuyện với ai cả.",
       "py": "Tā wándiànnǎo de shíhòu, dōu bù gēn biérén shuōhuà."
      },
      {
       "hz": "我喜歡出去走走3.我心情不好的時候，都會聽音樂、跟朋友聊天。",
       "vi": "Tôi thích ra ngoài đi dạo. Khi tâm trạng không tốt, tôi thường nghe nhạc, nói chuyện với bạn bè.",
       "py": "Wǒ xǐhuān chūqù zǒuzǒu 3. Wǒ xīnqíng bùhǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān."
      },
      {
       "hz": "A：你什麼時候最開心？",
       "vi": "A: Khi nào bạn vui nhất?",
       "py": "A: Nǐ shénme shíhòu zuì kāixīn?"
      },
      {
       "hz": "A：你發燒的時候，會怎麼做？",
       "vi": "A: Khi bị sốt bạn sẽ làm gì?",
       "py": "A: Nǐ fāshāo de shíhòu, huì zěnme zuò?"
      },
      {
       "hz": "A：你不上課的時候，都在做什麼？",
       "vi": "A: Khi không phải đi học bạn thường làm gì?",
       "py": "A: Nǐ bú shàngkè de shíhòu, dōu zài zuò shénme?"
      },
      {
       "hz": "昨天他看了什麼電視節目？",
       "vi": "Hôm qua anh ấy đã xem chương trình tivi gì?",
       "py": "Zuótiān tā kàn le shénme diànshìjiémù?"
      },
      {
       "hz": "現在的年輕人覺得什麼比較重要？",
       "vi": "Giới trẻ bây giờ thấy điều gì quan trọng hơn?",
       "py": "Xiànzài de niánqīngrén juéde shénme bǐjiào zhòngyào?"
      },
      {
       "hz": "現在的年輕人喜歡哪種工作？",
       "vi": "Giới trẻ bây giờ thích loại công việc nào?",
       "py": "Xiànzài de niánqīngrén xǐhuān nǎ zhǒng gōngzuò?"
      },
      {
       "hz": "為什麼工人常常不夠？",
       "vi": "Tại sao công nhân thường bị thiếu?",
       "py": "Wèishénme gōngrén chángcháng búgòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với V 過 và 的時候",
   "giaiThich": "Phần luyện tập dùng \"động từ + 過\"; kèm mẫu 的時候 nghĩa \"khi, lúc\"."
  }
 ],
 "td1-12.3": [
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你會用毛筆寫字嗎？",
       "vi": "A: Bạn có biết viết chữ bằng bút lông không?",
       "py": "A: Nǐ huì yòng máobǐ xiězì ma?"
      },
      {
       "hz": "B:不會，你可以教我嗎？",
       "vi": "B: Không biết, bạn dạy tôi được không?",
       "py": "B: Búhuì, nǐ kěyǐ jiào wǒ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你有照相機嗎？",
       "vi": "A: Bạn có máy ảnh không?",
       "py": "A: Nǐ yǒu zhàoxiàngjī ma?"
      },
      {
       "hz": "B:沒有，我都用手機照相。",
       "vi": "B: Không có, tôi toàn chụp ảnh bằng điện thoại.",
       "py": "B: Méiyǒu, wǒ dōu yòng shǒujī zhàoxiàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”. Zhēn de ma? Kěnéng shì yīnwèi zuìjìn wǒ chángcháng yòng Zhōngwén gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "A:我覺得你的中文進步了。",
       "vi": "A: Tôi thấy tiếng Trung của bạn tiến bộ rồi.",
       "py": "A: Wǒ juéde nǐ de zhōngwén jìnbù le."
      },
      {
       "hz": "B:真的嗎？可能是因為最近我常常用中文跟朋友聊天。",
       "vi": "B: Thật à? Có lẽ vì gần đây tôi hay dùng tiếng Trung nói chuyện với bạn bè.",
       "py": "B: Zhēnde ma? Kěnéng shìyīnwèi zuìjìn wǒ chángcháng yòng zhōngwén gēn péngyǒu liáotiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò.",
     "examples": [
      {
       "hz": "我以前很胖，現在瘦了幾公斤。",
       "vi": "Trước đây tôi rất béo, bây giờ đã giảm được mấy cân.",
       "py": "Wǒ yǐqián hěnpàng, xiànzài shòu le jǐgōngjīn."
      },
      {
       "hz": "以前我想在銀行工作，現在覺得當記者也不錯。",
       "vi": "Trước đây tôi muốn làm việc ở ngân hàng, bây giờ thấy làm phóng viên cũng không tệ.",
       "py": "Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Rúguǒ nǐ bù néng lái, qǐng nǐ zài zhè ge lǐbài sān yǐqián gàosù wǒ. Yínháng xiàwǔ sān diǎn bàn xiūxí, suǒyǐ sān diǎn yǐqián wǒ yídìng yào dào yínháng. Wǒ xīwàng yí ge lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn. (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?",
     "examples": [
      {
       "hz": "A：聽說你的英文老師快要回美國了，以後你要跟誰學？",
       "vi": "A: Nghe nói cô giáo tiếng Anh của bạn sắp về Mỹ rồi, sau này bạn sẽ học với ai?",
       "py": "A: Tīngshuō nǐ de yīngwén lǎoshī kuàiyào huí Měiguó le, yǐhòu nǐ yào gēn shéi xué?"
      },
      {
       "hz": "B：我現在還不知道。",
       "vi": "B: Bây giờ tôi vẫn chưa biết.",
       "py": "B: Wǒ xiànzài hái bù zhīdào."
      },
      {
       "hz": "我會回來。",
       "vi": "Tôi sẽ quay lại.",
       "py": "Wǒhuì huílái."
      },
      {
       "hz": "我一定在家。",
       "vi": "Tôi chắc chắn sẽ ở nhà.",
       "py": "Wǒ yídìng zàijiā."
      },
      {
       "hz": "今天中午以前，我都會在家。",
       "vi": "Trước trưa hôm nay tôi đều ở nhà.",
       "py": "Jīntiān zhōngwǔ yǐqián, wǒ dōu huì zàijiā."
      },
      {
       "hz": "如果你不能來，請你在這個禮拜三以前告訴我。",
       "vi": "Nếu bạn không đến được, xin hãy báo cho tôi trước thứ Tư tuần này.",
       "py": "Rúguǒ nǐ bùnéng lái, qǐng nǐ zài zhège lǐbàisān yǐqián gàosù wǒ."
      },
      {
       "hz": "銀行下午三點半休息，所以三點以前我一定要到銀行。",
       "vi": "Ngân hàng nghỉ lúc ba giờ rưỡi chiều, nên tôi nhất định phải đến ngân hàng trước ba giờ.",
       "py": "Yínháng xiàwǔ sāndiǎn bàn xiūxí, suǒyǐ sāndiǎn yǐqián wǒ yídìng yào dào yínháng."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "我們是兩年以前在日本認識的。",
       "vi": "Chúng tôi quen nhau ở Nhật từ hai năm trước.",
       "py": "Wǒmen shì liǎngnián yǐqián zài Rìběn rènshì de."
      },
      {
       "hz": "我希望一個禮拜以後，可以在英國跟他見面。",
       "vi": "Tôi hy vọng một tuần sau có thể gặp anh ấy ở Anh.",
       "py": "Wǒ xīwàng yígè lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "三天以前，我給他寄了一封信。",
       "vi": "Ba ngày trước tôi đã gửi cho anh ấy một bức thư.",
       "py": "Sāntiān yǐqián, wǒ gěi tā jì le yìfēngxìn."
      },
      {
       "hz": "A：你每天幾點吃晚飯？",
       "vi": "A: Hằng ngày bạn ăn tối lúc mấy giờ?",
       "py": "A: Nǐ měitiān jǐdiǎn chīwǎnfàn?"
      },
      {
       "hz": "A：你是什麼時候來台灣的？",
       "vi": "A: Bạn đến Đài Loan khi nào?",
       "py": "A: Nǐ shì shénme shíhòu lái Táiwān de?"
      },
      {
       "hz": "A：十點了，中明還沒來，他遲到了。",
       "vi": "A: Mười giờ rồi mà Trung Minh vẫn chưa đến, cậu ấy đến muộn rồi.",
       "py": "A: Shídiǎn le, Zhōngmíng hái méi lái, tā chídào le."
      },
      {
       "hz": "A：上班以前，你吃早飯嗎？",
       "vi": "A: Trước khi đi làm, bạn có ăn sáng không?",
       "py": "A: Shàngbān yǐqián, nǐ chī zǎofàn ma?"
      },
      {
       "hz": "B：不吃，我沒有時間吃。",
       "vi": "B: Không ăn, tôi không có thời gian ăn.",
       "py": "B: Bùchī, wǒ méiyǒu shíjiān chī."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：他來台灣上中文課以前，會說一點兒中文，你呢？",
       "vi": "A: Trước khi đến Đài Loan học tiếng Trung, anh ấy đã biết nói một chút tiếng Trung, còn bạn?",
       "py": "A: Tā lái Táiwān shàng zhōngwén kè yǐqián, huì shuō yìdiǎn'ér zhōngwén, nǐ ne?"
      },
      {
       "hz": "B：我也會說一點兒，可是說得不好。",
       "vi": "B: Tôi cũng biết nói một chút, nhưng nói không giỏi.",
       "py": "B: Wǒ yě huì shuō yìdiǎn'ér, kěshì shuō de bùhǎo."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：下班以後，妳有空嗎？",
       "vi": "A: Sau khi tan làm, chị có rảnh không?",
       "py": "A: Xiàbān yǐhòu, nǐyǒu kōng ma?"
      },
      {
       "hz": "B：對不起，下班以後我要去上課。",
       "vi": "B: Xin lỗi, sau khi tan làm tôi phải đi học.",
       "py": "B: Duìbùqǐ, xiàbān yǐhòu wǒ yào qù shàngkè."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "國安為什麼覺得在麵包店工作不辛苦？",
       "vi": "Tại sao Quốc An thấy làm ở tiệm bánh mì không vất vả?",
       "py": "Guó'ān wèishénme juéde zài miànbāodiàn gōngzuò bù xīnkǔ?"
      },
      {
       "hz": "中明以前在哪裡上過班？為什麼現在不做了？",
       "vi": "Trước đây Trung Minh đã từng làm việc ở đâu? Tại sao bây giờ không làm nữa?",
       "py": "Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?"
      },
      {
       "hz": "國安什麼時候上班？",
       "vi": "Quốc An đi làm lúc nào?",
       "py": "Guó'ān shénme shíhòu shàngbān?"
      },
      {
       "hz": "中明也會去麵包店工作嗎？",
       "vi": "Trung Minh cũng sẽ đến tiệm bánh mì làm việc à?",
       "py": "Zhōngmíng yě huì qù miànbāodiàn gōngzuò ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition , it indicates “to” or “for” and usually precedes a noun. Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duō hē shuǐ.”",
     "examples": [
      {
       "hz": "他常對我說：「我們應該要多運動、多喝水。」2.這件事我只對你說，你不要告訴別人。",
       "vi": "Anh ấy thường nói với tôi: “Chúng ta nên tập thể dục nhiều, uống nhiều nước.” Chuyện này tôi chỉ nói với bạn, bạn đừng kể với người khác.",
       "py": "Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duōhēshuǐ.” 2. Zhèjiàn shì wǒ zhǐ duì nǐ shuō, nǐ búyào gàosù biérén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "常用手機對眼睛不好。",
       "vi": "Dùng điện thoại nhiều không tốt cho mắt.",
       "py": "Chángyòng shǒujī duì yǎnjīng bùhǎo."
      },
      {
       "hz": "這本書對我不難，我可以學學看。",
       "vi": "Quyển sách này đối với tôi không khó, tôi có thể học thử xem.",
       "py": "Zhè běnshū duì wǒ bùnán, wǒ kěyǐ xuéxuékàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "他對我很好，常常幫我的忙。",
       "vi": "Anh ấy đối xử với tôi rất tốt, thường giúp đỡ tôi.",
       "py": "Tā duì wǒ hěn hǎo, chángcháng bāng wǒ de máng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun. Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐ jiànkāng. cāntīng / nà jiā / le /  tài yuǎn / ， / bù fāngbiàn / duì / wǒmen / dōu /. shuō le hěn duō huà / tā / duì wǒ / zuótiān /，/ wǒ bú tài dǒng / yǒu de / kěshì /. duì shēntǐ / yùndòng / hěn hǎo /，/ tài duō tiándiǎn / chī / bù hǎo / duì shēntǐ /. duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo/，/duō xiūxí/ chángcháng yào tā / yǐhòu / xiàbān /.",
     "examples": [
      {
       "hz": "A：老闆對你們怎麼樣？",
       "vi": "A: Ông chủ đối xử với các bạn thế nào?",
       "py": "A: Lǎobǎn duì nǐmen zěnmeyàng?"
      },
      {
       "hz": "B：他對我們很不錯，常常要我們注意身體健康。",
       "vi": "B: Ông ấy đối xử với chúng tôi rất tốt, thường nhắc chúng tôi chú ý giữ gìn sức khoẻ.",
       "py": "B: Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "餐廳/那家/了/太遠/，/不方便/對/我們/都/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Cāntīng / nà jiā / le / tài yuǎn /, / bù fāngbiàn / duì / wǒmen / dōu /."
      },
      {
       "hz": "說了很多話/他/對我/昨天/，/我不太懂/有的/可是/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shuō le hěnduō huà / tā / duì wǒ / zuótiān /, / wǒ bú tài dǒng / yǒu de / kěshì /."
      },
      {
       "hz": "對/李先生/李太太/很好/，/多休息/常常要他/以後/下班/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo /, / duō xiūxí / chángcháng yào tā / yǐhòu / xiàbān /."
      },
      {
       "hz": "對身體/運動/很好/，/太多甜點/吃/不好/對身體/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì shēntǐ / yùndòng / hěn hǎo /, / tài duō tiándiǎn / chī / bùhǎo / duì shēntǐ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. Hěn duō Táiwān rén qù guò Rìběn, yīnwèi cóng Táiwān dào Rìběn bù yuǎn .",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "很多台灣人去過日本，因為從台灣到日本不遠。",
       "vi": "Nhiều người Đài Loan đã từng đi Nhật, vì từ Đài Loan sang Nhật không xa.",
       "py": "Hěnduō táiwānrén qùguò Rìběn, yīnwèi cóng Táiwān dào Rìběn bùyuǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience.",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：他來過我們家嗎？",
       "vi": "A: Anh ấy đã từng đến nhà chúng ta chưa?",
       "py": "A: Tā lái guò wǒmen jiā ma?"
      },
      {
       "hz": "B：來過，那個時候你不在家。",
       "vi": "B: Đến rồi, lúc đó bạn không ở nhà.",
       "py": "B: Lái guò, nàge shíhòu nǐ bú zàijiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. yě xué le yìdiǎnr Rìwén gēn Yìnníwén, wǒ qù Yìdàlì, Déguó, Fǎguó Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěn duō guójiā wán. 1.Read the article below and answer the questions. dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yí ge yǒumíng de jìzhě. (國家 guójiā, country/nation; 義大利 Yìdàlì, Italy; 德國 Déguó, Germany; 法國 Fǎguó, France; 印尼文 Yìnníwén, Indonesian language; 的時候 de shíhòu, when)",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：你吃過臭豆腐嗎？",
       "vi": "A: Bạn đã từng ăn đậu phụ thối chưa?",
       "py": "A: Nǐ chī guò chòudòufǔ ma?"
      },
      {
       "hz": "B：我還沒吃過，聽說很特別。",
       "vi": "B: Tôi chưa ăn bao giờ, nghe nói rất đặc biệt.",
       "py": "B: Wǒ hái méichīguò, tīngshuō hěn tèbié."
      },
      {
       "hz": "我很喜歡學習語言，也很想去很多國家玩。",
       "vi": "Tôi rất thích học ngoại ngữ, cũng rất muốn đi chơi nhiều nước.",
       "py": "Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěnduō guójiā wán."
      },
      {
       "hz": "我會說英文、中文、義大利文、德文跟法文，也學了一點兒日文跟印尼文，我去義大利、德國、法國的時候，會說他們的語言，所以很好玩。",
       "vi": "Tôi biết nói tiếng Anh, tiếng Trung, tiếng Ý, tiếng Đức và tiếng Pháp, cũng đã học một chút tiếng Nhật và tiếng Indonesia. Khi đi Ý, Đức, Pháp, tôi nói được tiếng của họ nên rất vui.",
       "py": "Wǒhuì shuō yīngwén, zhōngwén, yìdàlìwén, déwén gēn fǎwén, yě xué le yìdiǎn'ér rìwén gēn Yìnní wén, wǒ qù yìdàlì, Déguó, Fǎguó de shíhòu, huì shuō tāmen de yǔyán, suǒyǐ hěn hǎowán."
      },
      {
       "hz": "我想做一個可以用很多語言的工作，當記者很不錯，希望以後能當一個有名的記者。",
       "vi": "Tôi muốn làm một công việc dùng được nhiều ngoại ngữ, làm phóng viên rất hay, hy vọng sau này có thể trở thành một phóng viên nổi tiếng.",
       "py": "Wǒ xiǎng zuò yígè kěyǐ yòng hěnduō yǔyán de gōngzuò, dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yígè yǒumíng de jìzhě."
      },
      {
       "hz": "問題ㄧ：他去過法國嗎？",
       "vi": "Câu hỏi 1: Anh ấy đã từng đi Pháp chưa?",
       "py": "Wèntí ㄧ: Tā qùguò Fǎguó ma?"
      },
      {
       "hz": "問題二：他學過印尼文嗎？",
       "vi": "Câu hỏi 2: Anh ấy đã từng học tiếng Indonesia chưa?",
       "py": "Wèntí èr: Tā xué guò Yìnní wén ma?"
      },
      {
       "hz": "問題三：他當過記者嗎？",
       "vi": "Câu hỏi 3: Anh ấy đã từng làm phóng viên chưa?",
       "py": "Wèntí sān: Tā dāng guò jìzhě ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "2. Complete the dialogues with V 過.",
   "points": [
    {
     "label": null,
     "formula": "Māma：Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bù néng zuò wǎnfàn le. 的時候 is used to express “when ” succeeding statements. 的時候 is used to express “when ” succeeding statements. Wǒ xīnqíng bù hǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "B：還沒，我上的是晚上的課。",
       "vi": "B: Chưa, tôi học lớp buổi tối.",
       "py": "B: Hái méi, wǒ shàng de shì wǎnshàng de kè."
      },
      {
       "hz": "2) A：你很不舒服吧？要不要去看醫生？",
       "vi": "2) A: Bạn khó chịu lắm phải không? Có muốn đi khám bác sĩ không?",
       "py": "2) A: Nǐ hěn bù shūfú ba? Yào búyào qù kàn yīshēng?"
      },
      {
       "hz": "3) 媽媽：我今天晚上要跟朋友去吃飯，不能做晚飯了。",
       "vi": "3) Mẹ: Tối nay mẹ đi ăn với bạn, không nấu cơm tối được.",
       "py": "3) māma: Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bùnéng zuò wǎnfàn le."
      },
      {
       "hz": "我喜歡出去運動。",
       "vi": "Tôi thích ra ngoài tập thể dục.",
       "py": "Wǒ xǐhuān chūqù yùndòng."
      },
      {
       "hz": "在我們家，吃飯的時候，不可以用手機。",
       "vi": "Ở nhà chúng tôi, khi ăn cơm không được dùng điện thoại.",
       "py": "Zài wǒmen jiā, chīfàn de shíhòu, bù kěyǐ yòng shǒujī."
      },
      {
       "hz": "他玩電腦的時候，都不跟別人說話。",
       "vi": "Khi chơi máy tính, cậu ấy không nói chuyện với ai cả.",
       "py": "Tā wándiànnǎo de shíhòu, dōu bù gēn biérén shuōhuà."
      },
      {
       "hz": "我喜歡出去走走3.我心情不好的時候，都會聽音樂、跟朋友聊天。",
       "vi": "Tôi thích ra ngoài đi dạo. Khi tâm trạng không tốt, tôi thường nghe nhạc, nói chuyện với bạn bè.",
       "py": "Wǒ xǐhuān chūqù zǒuzǒu 3. Wǒ xīnqíng bùhǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān."
      },
      {
       "hz": "A：你什麼時候最開心？",
       "vi": "A: Khi nào bạn vui nhất?",
       "py": "A: Nǐ shénme shíhòu zuì kāixīn?"
      },
      {
       "hz": "A：你發燒的時候，會怎麼做？",
       "vi": "A: Khi bị sốt bạn sẽ làm gì?",
       "py": "A: Nǐ fāshāo de shíhòu, huì zěnme zuò?"
      },
      {
       "hz": "A：你不上課的時候，都在做什麼？",
       "vi": "A: Khi không phải đi học bạn thường làm gì?",
       "py": "A: Nǐ bú shàngkè de shíhòu, dōu zài zuò shénme?"
      },
      {
       "hz": "昨天他看了什麼電視節目？",
       "vi": "Hôm qua anh ấy đã xem chương trình tivi gì?",
       "py": "Zuótiān tā kàn le shénme diànshìjiémù?"
      },
      {
       "hz": "現在的年輕人覺得什麼比較重要？",
       "vi": "Giới trẻ bây giờ thấy điều gì quan trọng hơn?",
       "py": "Xiànzài de niánqīngrén juéde shénme bǐjiào zhòngyào?"
      },
      {
       "hz": "現在的年輕人喜歡哪種工作？",
       "vi": "Giới trẻ bây giờ thích loại công việc nào?",
       "py": "Xiànzài de niánqīngrén xǐhuān nǎ zhǒng gōngzuò?"
      },
      {
       "hz": "為什麼工人常常不夠？",
       "vi": "Tại sao công nhân thường bị thiếu?",
       "py": "Wèishénme gōngrén chángcháng búgòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với V 過 và 的時候",
   "giaiThich": "Phần luyện tập dùng \"động từ + 過\"; kèm mẫu 的時候 nghĩa \"khi, lúc\"."
  }
 ],
 "td1-12.4": [
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你會用毛筆寫字嗎？",
       "vi": "A: Bạn có biết viết chữ bằng bút lông không?",
       "py": "A: Nǐ huì yòng máobǐ xiězì ma?"
      },
      {
       "hz": "B:不會，你可以教我嗎？",
       "vi": "B: Không biết, bạn dạy tôi được không?",
       "py": "B: Búhuì, nǐ kěyǐ jiào wǒ ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”.",
     "examples": [
      {
       "hz": "A:你有照相機嗎？",
       "vi": "A: Bạn có máy ảnh không?",
       "py": "A: Nǐ yǒu zhàoxiàngjī ma?"
      },
      {
       "hz": "B:沒有，我都用手機照相。",
       "vi": "B: Không có, tôi toàn chụp ảnh bằng điện thoại.",
       "py": "B: Méiyǒu, wǒ dōu yòng shǒujī zhàoxiàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "I. 用 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 用 serves as a preposition, it indicates “with” or “using”. Zhēn de ma? Kěnéng shì yīnwèi zuìjìn wǒ chángcháng yòng Zhōngwén gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "A:我覺得你的中文進步了。",
       "vi": "A: Tôi thấy tiếng Trung của bạn tiến bộ rồi.",
       "py": "A: Wǒ juéde nǐ de zhōngwén jìnbù le."
      },
      {
       "hz": "B:真的嗎？可能是因為最近我常常用中文跟朋友聊天。",
       "vi": "B: Thật à? Có lẽ vì gần đây tôi hay dùng tiếng Trung nói chuyện với bạn bè.",
       "py": "B: Zhēnde ma? Kěnéng shìyīnwèi zuìjìn wǒ chángcháng yòng zhōngwén gēn péngyǒu liáotiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 làm giới từ",
   "giaiThich": "用 đứng trước công cụ/cách thức, nghĩa \"bằng, dùng\"."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò.",
     "examples": [
      {
       "hz": "我以前很胖，現在瘦了幾公斤。",
       "vi": "Trước đây tôi rất béo, bây giờ đã giảm được mấy cân.",
       "py": "Wǒ yǐqián hěnpàng, xiànzài shòu le jǐgōngjīn."
      },
      {
       "hz": "以前我想在銀行工作，現在覺得當記者也不錯。",
       "vi": "Trước đây tôi muốn làm việc ở ngân hàng, bây giờ thấy làm phóng viên cũng không tệ.",
       "py": "Yǐqián wǒ xiǎng zài yínháng gōngzuò, xiànzài juéde dāng jìzhě yě búcuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "II. 以前/以後",
   "points": [
    {
     "label": null,
     "formula": "以前 means “previously/formerly”; 以後 means “afterwards/in the future”. Rúguǒ nǐ bù néng lái, qǐng nǐ zài zhè ge lǐbài sān yǐqián gàosù wǒ. Yínháng xiàwǔ sān diǎn bàn xiūxí, suǒyǐ sān diǎn yǐqián wǒ yídìng yào dào yínháng. Wǒ xīwàng yí ge lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn. (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements (3)以前/以後 as Time Words Succeeding Statements Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?",
     "examples": [
      {
       "hz": "A：聽說你的英文老師快要回美國了，以後你要跟誰學？",
       "vi": "A: Nghe nói cô giáo tiếng Anh của bạn sắp về Mỹ rồi, sau này bạn sẽ học với ai?",
       "py": "A: Tīngshuō nǐ de yīngwén lǎoshī kuàiyào huí Měiguó le, yǐhòu nǐ yào gēn shéi xué?"
      },
      {
       "hz": "B：我現在還不知道。",
       "vi": "B: Bây giờ tôi vẫn chưa biết.",
       "py": "B: Wǒ xiànzài hái bù zhīdào."
      },
      {
       "hz": "我會回來。",
       "vi": "Tôi sẽ quay lại.",
       "py": "Wǒhuì huílái."
      },
      {
       "hz": "我一定在家。",
       "vi": "Tôi chắc chắn sẽ ở nhà.",
       "py": "Wǒ yídìng zàijiā."
      },
      {
       "hz": "今天中午以前，我都會在家。",
       "vi": "Trước trưa hôm nay tôi đều ở nhà.",
       "py": "Jīntiān zhōngwǔ yǐqián, wǒ dōu huì zàijiā."
      },
      {
       "hz": "如果你不能來，請你在這個禮拜三以前告訴我。",
       "vi": "Nếu bạn không đến được, xin hãy báo cho tôi trước thứ Tư tuần này.",
       "py": "Rúguǒ nǐ bùnéng lái, qǐng nǐ zài zhège lǐbàisān yǐqián gàosù wǒ."
      },
      {
       "hz": "銀行下午三點半休息，所以三點以前我一定要到銀行。",
       "vi": "Ngân hàng nghỉ lúc ba giờ rưỡi chiều, nên tôi nhất định phải đến ngân hàng trước ba giờ.",
       "py": "Yínháng xiàwǔ sāndiǎn bàn xiūxí, suǒyǐ sāndiǎn yǐqián wǒ yídìng yào dào yínháng."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "我們是兩年以前在日本認識的。",
       "vi": "Chúng tôi quen nhau ở Nhật từ hai năm trước.",
       "py": "Wǒmen shì liǎngnián yǐqián zài Rìběn rènshì de."
      },
      {
       "hz": "我希望一個禮拜以後，可以在英國跟他見面。",
       "vi": "Tôi hy vọng một tuần sau có thể gặp anh ấy ở Anh.",
       "py": "Wǒ xīwàng yígè lǐbài yǐhòu, kěyǐ zài Yīngguó gēn tā jiànmiàn."
      },
      {
       "hz": "我不會說中文。",
       "vi": "Tôi không biết nói tiếng Trung.",
       "py": "Wǒ búhuì shuō zhōngwén."
      },
      {
       "hz": "我要到法國去工作。",
       "vi": "Tôi sẽ sang Pháp làm việc.",
       "py": "Wǒ yào dào Fǎguó qù gōngzuò."
      },
      {
       "hz": "三天以前，我給他寄了一封信。",
       "vi": "Ba ngày trước tôi đã gửi cho anh ấy một bức thư.",
       "py": "Sāntiān yǐqián, wǒ gěi tā jì le yìfēngxìn."
      },
      {
       "hz": "A：你每天幾點吃晚飯？",
       "vi": "A: Hằng ngày bạn ăn tối lúc mấy giờ?",
       "py": "A: Nǐ měitiān jǐdiǎn chīwǎnfàn?"
      },
      {
       "hz": "A：你是什麼時候來台灣的？",
       "vi": "A: Bạn đến Đài Loan khi nào?",
       "py": "A: Nǐ shì shénme shíhòu lái Táiwān de?"
      },
      {
       "hz": "A：十點了，中明還沒來，他遲到了。",
       "vi": "A: Mười giờ rồi mà Trung Minh vẫn chưa đến, cậu ấy đến muộn rồi.",
       "py": "A: Shídiǎn le, Zhōngmíng hái méi lái, tā chídào le."
      },
      {
       "hz": "A：上班以前，你吃早飯嗎？",
       "vi": "A: Trước khi đi làm, bạn có ăn sáng không?",
       "py": "A: Shàngbān yǐqián, nǐ chī zǎofàn ma?"
      },
      {
       "hz": "B：不吃，我沒有時間吃。",
       "vi": "B: Không ăn, tôi không có thời gian ăn.",
       "py": "B: Bùchī, wǒ méiyǒu shíjiān chī."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：他來台灣上中文課以前，會說一點兒中文，你呢？",
       "vi": "A: Trước khi đến Đài Loan học tiếng Trung, anh ấy đã biết nói một chút tiếng Trung, còn bạn?",
       "py": "A: Tā lái Táiwān shàng zhōngwén kè yǐqián, huì shuō yìdiǎn'ér zhōngwén, nǐ ne?"
      },
      {
       "hz": "B：我也會說一點兒，可是說得不好。",
       "vi": "B: Tôi cũng biết nói một chút, nhưng nói không giỏi.",
       "py": "B: Wǒ yě huì shuō yìdiǎn'ér, kěshì shuō de bùhǎo."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "A：下班以後，妳有空嗎？",
       "vi": "A: Sau khi tan làm, chị có rảnh không?",
       "py": "A: Xiàbān yǐhòu, nǐyǒu kōng ma?"
      },
      {
       "hz": "B：對不起，下班以後我要去上課。",
       "vi": "B: Xin lỗi, sau khi tan làm tôi phải đi học.",
       "py": "B: Duìbùqǐ, xiàbān yǐhòu wǒ yào qù shàngkè."
      },
      {
       "hz": "要去買杯咖啡。",
       "vi": "Phải đi mua một cốc cà phê.",
       "py": "Yào qù mǎi bēi kāfēi."
      },
      {
       "hz": "常常覺得很餓。",
       "vi": "Thường thấy rất đói.",
       "py": "Chángcháng juéde hěn è."
      },
      {
       "hz": "國安為什麼覺得在麵包店工作不辛苦？",
       "vi": "Tại sao Quốc An thấy làm ở tiệm bánh mì không vất vả?",
       "py": "Guó'ān wèishénme juéde zài miànbāodiàn gōngzuò bù xīnkǔ?"
      },
      {
       "hz": "中明以前在哪裡上過班？為什麼現在不做了？",
       "vi": "Trước đây Trung Minh đã từng làm việc ở đâu? Tại sao bây giờ không làm nữa?",
       "py": "Zhōngmíng yǐqián zài nǎlǐ shàng guò bān? Wèishénme xiànzài bú zuò le?"
      },
      {
       "hz": "國安什麼時候上班？",
       "vi": "Quốc An đi làm lúc nào?",
       "py": "Guó'ān shénme shíhòu shàngbān?"
      },
      {
       "hz": "中明也會去麵包店工作嗎？",
       "vi": "Trung Minh cũng sẽ đến tiệm bánh mì làm việc à?",
       "py": "Zhōngmíng yě huì qù miànbāodiàn gōngzuò ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以前 / 以後 — trước kia / sau này",
   "giaiThich": "以前 chỉ thời gian trước đó; 以後 chỉ thời gian sau đó."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition , it indicates “to” or “for” and usually precedes a noun. Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duō hē shuǐ.”",
     "examples": [
      {
       "hz": "他常對我說：「我們應該要多運動、多喝水。」2.這件事我只對你說，你不要告訴別人。",
       "vi": "Anh ấy thường nói với tôi: “Chúng ta nên tập thể dục nhiều, uống nhiều nước.” Chuyện này tôi chỉ nói với bạn, bạn đừng kể với người khác.",
       "py": "Tā cháng duì wǒ shuō: “Wǒmen yīnggāi yào duō yùndòng, duōhēshuǐ.” 2. Zhèjiàn shì wǒ zhǐ duì nǐ shuō, nǐ búyào gàosù biérén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "常用手機對眼睛不好。",
       "vi": "Dùng điện thoại nhiều không tốt cho mắt.",
       "py": "Chángyòng shǒujī duì yǎnjīng bùhǎo."
      },
      {
       "hz": "這本書對我不難，我可以學學看。",
       "vi": "Quyển sách này đối với tôi không khó, tôi có thể học thử xem.",
       "py": "Zhè běnshū duì wǒ bùnán, wǒ kěyǐ xuéxuékàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun.",
     "examples": [
      {
       "hz": "他對我很好，常常幫我的忙。",
       "vi": "Anh ấy đối xử với tôi rất tốt, thường giúp đỡ tôi.",
       "py": "Tā duì wǒ hěn hǎo, chángcháng bāng wǒ de máng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "I. 對 as a preposition",
   "points": [
    {
     "label": null,
     "formula": "When 對 serves as a preposition, it indicates “to” or “for” and usually precedes a noun. Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐ jiànkāng. cāntīng / nà jiā / le /  tài yuǎn / ， / bù fāngbiàn / duì / wǒmen / dōu /. shuō le hěn duō huà / tā / duì wǒ / zuótiān /，/ wǒ bú tài dǒng / yǒu de / kěshì /. duì shēntǐ / yùndòng / hěn hǎo /，/ tài duō tiándiǎn / chī / bù hǎo / duì shēntǐ /. duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo/，/duō xiūxí/ chángcháng yào tā / yǐhòu / xiàbān /.",
     "examples": [
      {
       "hz": "A：老闆對你們怎麼樣？",
       "vi": "A: Ông chủ đối xử với các bạn thế nào?",
       "py": "A: Lǎobǎn duì nǐmen zěnmeyàng?"
      },
      {
       "hz": "B：他對我們很不錯，常常要我們注意身體健康。",
       "vi": "B: Ông ấy đối xử với chúng tôi rất tốt, thường nhắc chúng tôi chú ý giữ gìn sức khoẻ.",
       "py": "B: Tā duì wǒmen hěn búcuò, chángcháng yào wǒmen zhùyì shēntǐjiànkāng."
      },
      {
       "hz": "餐廳/那家/了/太遠/，/不方便/對/我們/都/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Cāntīng / nà jiā / le / tài yuǎn /, / bù fāngbiàn / duì / wǒmen / dōu /."
      },
      {
       "hz": "說了很多話/他/對我/昨天/，/我不太懂/有的/可是/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shuō le hěnduō huà / tā / duì wǒ / zuótiān /, / wǒ bú tài dǒng / yǒu de / kěshì /."
      },
      {
       "hz": "對/李先生/李太太/很好/，/多休息/常常要他/以後/下班/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì / Lǐ xiānshēng / Lǐ tàitai / hěn hǎo /, / duō xiūxí / chángcháng yào tā / yǐhòu / xiàbān /."
      },
      {
       "hz": "對身體/運動/很好/，/太多甜點/吃/不好/對身體/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Duì shēntǐ / yùndòng / hěn hǎo /, / tài duō tiándiǎn / chī / bùhǎo / duì shēntǐ /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對 làm giới từ",
   "giaiThich": "對 đứng trước danh từ chỉ người hoặc sự việc, nghĩa \"đối với, với\"."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. Hěn duō Táiwān rén qù guò Rìběn, yīnwèi cóng Táiwān dào Rìběn bù yuǎn .",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "很多台灣人去過日本，因為從台灣到日本不遠。",
       "vi": "Nhiều người Đài Loan đã từng đi Nhật, vì từ Đài Loan sang Nhật không xa.",
       "py": "Hěnduō táiwānrén qùguò Rìběn, yīnwèi cóng Táiwān dào Rìběn bùyuǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience.",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：他來過我們家嗎？",
       "vi": "A: Anh ấy đã từng đến nhà chúng ta chưa?",
       "py": "A: Tā lái guò wǒmen jiā ma?"
      },
      {
       "hz": "B：來過，那個時候你不在家。",
       "vi": "B: Đến rồi, lúc đó bạn không ở nhà.",
       "py": "B: Lái guò, nàge shíhòu nǐ bú zàijiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "II. Particle 過",
   "points": [
    {
     "label": null,
     "formula": "過 indicates completion of an action as an experience. yě xué le yìdiǎnr Rìwén gēn Yìnníwén, wǒ qù Yìdàlì, Déguó, Fǎguó Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěn duō guójiā wán. 1.Read the article below and answer the questions. dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yí ge yǒumíng de jìzhě. (國家 guójiā, country/nation; 義大利 Yìdàlì, Italy; 德國 Déguó, Germany; 法國 Fǎguó, France; 印尼文 Yìnníwén, Indonesian language; 的時候 de shíhòu, when)",
     "examples": [
      {
       "hz": "這部電影。",
       "vi": "Bộ phim này.",
       "py": "Zhèbù diànyǐng."
      },
      {
       "hz": "A：你吃過臭豆腐嗎？",
       "vi": "A: Bạn đã từng ăn đậu phụ thối chưa?",
       "py": "A: Nǐ chī guò chòudòufǔ ma?"
      },
      {
       "hz": "B：我還沒吃過，聽說很特別。",
       "vi": "B: Tôi chưa ăn bao giờ, nghe nói rất đặc biệt.",
       "py": "B: Wǒ hái méichīguò, tīngshuō hěn tèbié."
      },
      {
       "hz": "我很喜歡學習語言，也很想去很多國家玩。",
       "vi": "Tôi rất thích học ngoại ngữ, cũng rất muốn đi chơi nhiều nước.",
       "py": "Wǒ hěn xǐhuān xuéxí yǔyán, yě hěn xiǎng qù hěnduō guójiā wán."
      },
      {
       "hz": "我會說英文、中文、義大利文、德文跟法文，也學了一點兒日文跟印尼文，我去義大利、德國、法國的時候，會說他們的語言，所以很好玩。",
       "vi": "Tôi biết nói tiếng Anh, tiếng Trung, tiếng Ý, tiếng Đức và tiếng Pháp, cũng đã học một chút tiếng Nhật và tiếng Indonesia. Khi đi Ý, Đức, Pháp, tôi nói được tiếng của họ nên rất vui.",
       "py": "Wǒhuì shuō yīngwén, zhōngwén, yìdàlìwén, déwén gēn fǎwén, yě xué le yìdiǎn'ér rìwén gēn Yìnní wén, wǒ qù yìdàlì, Déguó, Fǎguó de shíhòu, huì shuō tāmen de yǔyán, suǒyǐ hěn hǎowán."
      },
      {
       "hz": "我想做一個可以用很多語言的工作，當記者很不錯，希望以後能當一個有名的記者。",
       "vi": "Tôi muốn làm một công việc dùng được nhiều ngoại ngữ, làm phóng viên rất hay, hy vọng sau này có thể trở thành một phóng viên nổi tiếng.",
       "py": "Wǒ xiǎng zuò yígè kěyǐ yòng hěnduō yǔyán de gōngzuò, dāng jìzhě hěn búcuò, xīwàng yǐhòu néng dāng yígè yǒumíng de jìzhě."
      },
      {
       "hz": "問題ㄧ：他去過法國嗎？",
       "vi": "Câu hỏi 1: Anh ấy đã từng đi Pháp chưa?",
       "py": "Wèntí ㄧ: Tā qùguò Fǎguó ma?"
      },
      {
       "hz": "問題二：他學過印尼文嗎？",
       "vi": "Câu hỏi 2: Anh ấy đã từng học tiếng Indonesia chưa?",
       "py": "Wèntí èr: Tā xué guò Yìnní wén ma?"
      },
      {
       "hz": "問題三：他當過記者嗎？",
       "vi": "Câu hỏi 3: Anh ấy đã từng làm phóng viên chưa?",
       "py": "Wèntí sān: Tā dāng guò jìzhě ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Trợ từ 過 — đã từng",
   "giaiThich": "過 đặt sau động từ để nói đã TỪNG trải qua việc gì đó."
  },
  {
   "title": "2. Complete the dialogues with V 過.",
   "points": [
    {
     "label": null,
     "formula": "Māma：Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bù néng zuò wǎnfàn le. 的時候 is used to express “when ” succeeding statements. 的時候 is used to express “when ” succeeding statements. Wǒ xīnqíng bù hǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān.",
     "examples": [
      {
       "hz": "B：還沒，我上的是晚上的課。",
       "vi": "B: Chưa, tôi học lớp buổi tối.",
       "py": "B: Hái méi, wǒ shàng de shì wǎnshàng de kè."
      },
      {
       "hz": "2) A：你很不舒服吧？要不要去看醫生？",
       "vi": "2) A: Bạn khó chịu lắm phải không? Có muốn đi khám bác sĩ không?",
       "py": "2) A: Nǐ hěn bù shūfú ba? Yào búyào qù kàn yīshēng?"
      },
      {
       "hz": "3) 媽媽：我今天晚上要跟朋友去吃飯，不能做晚飯了。",
       "vi": "3) Mẹ: Tối nay mẹ đi ăn với bạn, không nấu cơm tối được.",
       "py": "3) māma: Wǒ jīntiān wǎnshàng yào gēn péngyǒu qù chīfàn, bùnéng zuò wǎnfàn le."
      },
      {
       "hz": "我喜歡出去運動。",
       "vi": "Tôi thích ra ngoài tập thể dục.",
       "py": "Wǒ xǐhuān chūqù yùndòng."
      },
      {
       "hz": "在我們家，吃飯的時候，不可以用手機。",
       "vi": "Ở nhà chúng tôi, khi ăn cơm không được dùng điện thoại.",
       "py": "Zài wǒmen jiā, chīfàn de shíhòu, bù kěyǐ yòng shǒujī."
      },
      {
       "hz": "他玩電腦的時候，都不跟別人說話。",
       "vi": "Khi chơi máy tính, cậu ấy không nói chuyện với ai cả.",
       "py": "Tā wándiànnǎo de shíhòu, dōu bù gēn biérén shuōhuà."
      },
      {
       "hz": "我喜歡出去走走3.我心情不好的時候，都會聽音樂、跟朋友聊天。",
       "vi": "Tôi thích ra ngoài đi dạo. Khi tâm trạng không tốt, tôi thường nghe nhạc, nói chuyện với bạn bè.",
       "py": "Wǒ xǐhuān chūqù zǒuzǒu 3. Wǒ xīnqíng bùhǎo de shíhòu, dōu huì tīng yīnyuè, gēn péngyǒu liáotiān."
      },
      {
       "hz": "A：你什麼時候最開心？",
       "vi": "A: Khi nào bạn vui nhất?",
       "py": "A: Nǐ shénme shíhòu zuì kāixīn?"
      },
      {
       "hz": "A：你發燒的時候，會怎麼做？",
       "vi": "A: Khi bị sốt bạn sẽ làm gì?",
       "py": "A: Nǐ fāshāo de shíhòu, huì zěnme zuò?"
      },
      {
       "hz": "A：你不上課的時候，都在做什麼？",
       "vi": "A: Khi không phải đi học bạn thường làm gì?",
       "py": "A: Nǐ bú shàngkè de shíhòu, dōu zài zuò shénme?"
      },
      {
       "hz": "昨天他看了什麼電視節目？",
       "vi": "Hôm qua anh ấy đã xem chương trình tivi gì?",
       "py": "Zuótiān tā kàn le shénme diànshìjiémù?"
      },
      {
       "hz": "現在的年輕人覺得什麼比較重要？",
       "vi": "Giới trẻ bây giờ thấy điều gì quan trọng hơn?",
       "py": "Xiànzài de niánqīngrén juéde shénme bǐjiào zhòngyào?"
      },
      {
       "hz": "現在的年輕人喜歡哪種工作？",
       "vi": "Giới trẻ bây giờ thích loại công việc nào?",
       "py": "Xiànzài de niánqīngrén xǐhuān nǎ zhǒng gōngzuò?"
      },
      {
       "hz": "為什麼工人常常不夠？",
       "vi": "Tại sao công nhân thường bị thiếu?",
       "py": "Wèishénme gōngrén chángcháng búgòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với V 過 và 的時候",
   "giaiThich": "Phần luyện tập dùng \"động từ + 過\"; kèm mẫu 的時候 nghĩa \"khi, lúc\"."
  }
 ],
 "td1-13.1": [
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement.",
     "examples": [
      {
       "hz": "中國字應該從左往右寫，韓國字呢？",
       "vi": "Chữ Hán nên viết từ trái sang phải, còn chữ Hàn thì sao?",
       "py": "Zhōngguó zì yīnggāi cóngzuǒwǎngyòu xiě, Hánguó zì ne?"
      },
      {
       "hz": "從我房間的窗戶往外看，就可以看到漂亮的風景。",
       "vi": "Từ cửa sổ phòng tôi nhìn ra ngoài là có thể thấy phong cảnh đẹp.",
       "py": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng zhèlǐ wǎng zuì gāo de nà dòng fángzi zǒu, nǐ huì kàndào liǎng jiā bǎihuògōngsī. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement. Describe the following picture with “從……往……”.",
     "examples": [
      {
       "hz": "從這裡往最高的那棟房子走，你會看到兩家百貨公司。",
       "vi": "Từ đây đi về phía toà nhà cao nhất kia, bạn sẽ thấy hai trung tâm thương mại.",
       "py": "Cóng zhèlǐ wǎng zuìgāo de nàdòng fángzi zǒu, nǐ huì kàndào liǎngjiā bǎihuògōngsī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "III. Sentence with Adverb 就",
   "points": [
    {
     "label": null,
     "formula": "就 indicates that something happens earlier or takes place sooner than expected. 就 also indicates that something is easy to be completed or likely to happen. Jiǔ diǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bā diǎn bàn jiù dào gōngsī le. Nǐ wǎng qián zǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) Complete the following dialogues with 就. Complete the following dialogues with 就. Complete the following dialogues with 就.",
     "examples": [
      {
       "hz": "九點開始上班，可是我每天都八點半就到公司了。",
       "vi": "Chín giờ mới bắt đầu làm việc, nhưng ngày nào tôi cũng tám giờ rưỡi đã đến công ty rồi.",
       "py": "Jiǔdiǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bādiǎnbàn jiù dào gōngsī le."
      },
      {
       "hz": "我今天早上六點就起床了。（早）2.你往前走，就可以看到那家店了。（快、容易）3.你先跟老師請假，就沒問題了吧？（容易）",
       "vi": "Sáng nay sáu giờ tôi đã dậy rồi. (sớm) Bạn đi thẳng về phía trước là thấy cửa hàng đó ngay. (nhanh, dễ) Bạn xin phép thầy giáo trước là không có vấn đề gì nữa phải không? (dễ)",
       "py": "Wǒ jīntiān zǎoshàng liùdiǎn jiù qǐchuáng le. (zǎo) 2. Nǐ wǎngqiánzǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) 3. Nǐ xiān gēn lǎoshī qǐngjià, jiù méi wèntí le ba? (róngyì)"
      },
      {
       "hz": "A：我今天很早就到學校來了。",
       "vi": "A: Hôm nay tôi đã đến trường từ rất sớm.",
       "py": "A: Wǒ jīntiān hěn zǎojiù dào xuéxiào lái le."
      },
      {
       "hz": "B：你今天是幾點到的？",
       "vi": "B: Hôm nay bạn đến lúc mấy giờ?",
       "py": "B: Nǐ jīntiān shì jǐdiǎn dào de?"
      },
      {
       "hz": "A：我想去台北101，請問要怎麼走？",
       "vi": "A: Tôi muốn đến Taipei 101, cho hỏi đi đường nào?",
       "py": "A: Wǒ xiǎng qù Táiběi 101, qǐngwèn yào zěnme zǒu?"
      },
      {
       "hz": "A：那我知道了，真謝謝你！",
       "vi": "A: Vậy tôi biết rồi, cảm ơn bạn nhiều!",
       "py": "A: Nà wǒ zhīdào le, zhēn xièxie nǐ!"
      },
      {
       "hz": "A：我明天要跟同學介紹我的國家，所以想到圖書館去找書。",
       "vi": "A: Ngày mai tôi sẽ giới thiệu về đất nước mình với các bạn cùng lớp, nên muốn đến thư viện tìm sách.",
       "py": "A: Wǒ míngtiān yào gēn tóngxué jièshào wǒ de guójiā, suǒyǐ xiǎngdào túshūguǎn qù zhǎo shū."
      },
      {
       "hz": "他們今天打算在博物館參觀多久？",
       "vi": "Hôm nay họ định tham quan bảo tàng bao lâu?",
       "py": "Tāmen jīntiān dǎsuàn zài bówùguǎn cānguān duōjiǔ?"
      },
      {
       "hz": "家樂在網路上看了什麼？",
       "vi": "Gia Lạc đã xem gì trên mạng?",
       "py": "Jiālè zài wǎnglùshàng kàn le shénme?"
      },
      {
       "hz": "中明是什麼時候到的？",
       "vi": "Trung Minh đến lúc nào?",
       "py": "Zhōngmíng shì shénme shíhòu dào de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phó từ 就",
   "giaiThich": "就 cho biết việc xảy ra SỚM hơn dự tính, hoặc việc dễ dàng/dễ xảy ra."
  },
  {
   "title": "I. 就(要)⋯⋯了",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure indicates the action after 就(要) is going to happen in a very short time. There’s usually a time word before this structure. 就(要) means the action is happening soon; 了is used at the end of the sentence. Complete the following sentences with 就(要)……了.",
     "examples": [
      {
       "hz": "他的女朋友明天就要來了，他非常開心。",
       "vi": "Ngày mai bạn gái anh ấy sẽ đến rồi, anh ấy rất vui.",
       "py": "Tā de nǚpéngyǒu míngtiān jiùyào lái le, tā fēicháng kāixīn."
      },
      {
       "hz": "電影馬上就要開始了，他怎麼還沒來？",
       "vi": "Phim sắp bắt đầu rồi, sao anh ấy vẫn chưa đến?",
       "py": "Diànyǐng mǎshàng jiùyào kāishǐ le, tā zěnme hái méi lái?"
      },
      {
       "hz": "圖書館就要關了，你現在去也許太晚了。",
       "vi": "Thư viện sắp đóng cửa rồi, bây giờ bạn đi có lẽ đã muộn.",
       "py": "Túshūguǎn jiùyào guān le, nǐ xiànzài qù yěxǔ tàiwǎn le."
      },
      {
       "hz": "(十分鐘以後/火車來)(下星期二/回國)",
       "vi": "(mười phút sau / tàu hoả đến) (thứ Ba tuần sau / về nước)",
       "py": "(shífēnzhōng yǐhòu / huǒchē lái) (xià xīngqí'èr / huíguó)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就(要)……了 — sắp ngay",
   "giaiThich": "Diễn đạt việc sắp xảy ra trong thời gian rất ngắn; phía trước thường có từ chỉ thời gian, cuối câu có 了."
  },
  {
   "title": "II. Time-Duration",
   "points": [
    {
     "label": null,
     "formula": "Bùhǎoyìsi, qǐng nín zài děng liǎng fēnzhōng, Lǐ xiānshēng hěn kuài jiù lái le. Time-Duration pattern indicates an action lasts a period of time. In this pattern, the action always precedes Time-Duration. Wǒmen cóng xuéxiào zǒu shí fēnzhōng, jiù kěyǐ dào nà jiā yínháng le. Rearrange the following sentences. Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méi guānxi. Wǒ dìdi hěn ài wán shǒujī, měitiān chàbùduō wán wǔ ge xiǎoshí. Tīngshuō nà ge bówùguǎn bú tài yuǎn, zhǐ yào zuò wǔ fēnzhōng de jiéyùn. Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshí fēnzhōng de lù jiù dào le.",
     "examples": [
      {
       "hz": "爸爸每天早上運動三十分鐘。",
       "vi": "Sáng nào bố cũng tập thể dục ba mươi phút.",
       "py": "Bàba měitiān zǎoshàng yùndòng sānshífēnzhōng."
      },
      {
       "hz": "我們從學校走十分鐘，就可以到那家銀行了。",
       "vi": "Từ trường đi bộ mười phút là đến ngân hàng đó.",
       "py": "Wǒmen cóng xuéxiào zǒu shífēnzhōng, jiù kěyǐ dào nà jiā yínháng le."
      },
      {
       "hz": "不好意思，請您再等兩分鐘，李先生很快就來了。",
       "vi": "Xin lỗi, phiền ông đợi thêm hai phút, anh Lý sẽ đến ngay.",
       "py": "Bùhǎoyìsī, qǐng nín zài děng liǎngfēnzhōng, Lǐ xiānshēng hěnkuài jiù lái le."
      },
      {
       "hz": "八個小時。",
       "vi": "Tám tiếng.",
       "py": "Bāgè xiǎoshí."
      },
      {
       "hz": "跑/他/半個小時/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Pǎo / tā / bàngè xiǎoshí / měitiān /."
      },
      {
       "hz": "十分鐘/我/休息/需要。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shífēnzhōng / wǒ / xiūxí / xūyào."
      },
      {
       "hz": "太/我/累/了/現在，先/可以/十分鐘/睡/嗎/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Tài / wǒ / lèi / le / xiànzài, xiān / kěyǐ / shífēnzhōng / shuì / ma /?"
      },
      {
       "hz": "A：你每天做晚飯做兩個小時，不覺得累嗎？",
       "vi": "A: Ngày nào bạn cũng nấu bữa tối mất hai tiếng, không thấy mệt à?",
       "py": "A: Nǐ měitiān zuò wǎnfàn zuò liǎnggè xiǎoshí, bù juéde lèi ma?"
      },
      {
       "hz": "B：有時候覺得累，但是我喜歡吃自己做的，所以沒關係。",
       "vi": "B: Có lúc thấy mệt, nhưng tôi thích ăn đồ tự nấu nên không sao.",
       "py": "B: Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méiguānxì."
      },
      {
       "hz": "A：你每天都運動嗎？",
       "vi": "A: Ngày nào bạn cũng tập thể dục à?",
       "py": "A: Nǐ měitiān dōu yùndòng ma?"
      },
      {
       "hz": "B：對，我每天跑步跑三十分鐘。",
       "vi": "B: Đúng vậy, ngày nào tôi cũng chạy bộ ba mươi phút.",
       "py": "B: Duì, wǒ měitiān pǎobù pǎo sānshífēnzhōng."
      },
      {
       "hz": "A：我弟弟很愛玩手機，每天差不多玩五個小時。",
       "vi": "A: Em trai tôi rất mê chơi điện thoại, mỗi ngày chơi khoảng năm tiếng.",
       "py": "A: Wǒ dìdi hěn àiwán shǒujī, měitiān chàbuduō wán wǔgè xiǎoshí."
      },
      {
       "hz": "B：玩五個小時的手機！時間太長了！",
       "vi": "B: Chơi điện thoại năm tiếng! Lâu quá rồi!",
       "py": "B: Wán wǔgè xiǎoshí de shǒujī! Shíjiān tài zhǎng le!"
      },
      {
       "hz": "A：聽說那個博物館不太遠，只要坐五分鐘的捷運。",
       "vi": "A: Nghe nói bảo tàng đó không xa lắm, chỉ đi tàu điện ngầm năm phút.",
       "py": "A: Tīngshuō nàge bówùguǎn bú tài yuǎn, zhǐyào zuò wǔfēnzhōng de jiéyùn."
      },
      {
       "hz": "B：是啊，如果你想走路去也可以，走二十分鐘的路就到了。",
       "vi": "B: Đúng vậy, nếu bạn muốn đi bộ cũng được, đi bộ hai mươi phút là đến.",
       "py": "B: Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshífēnzhōng de lù jiù dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng (bao lâu)",
   "giaiThich": "Nêu hành động kéo dài bao lâu; cụm thời lượng đứng SAU động từ."
  },
  {
   "title": "1. Wǒ yí ge xīngqí yào shàngbān shàng wǔ tiān.",
   "points": [
    {
     "label": null,
     "formula": "Rewrite the following sentences with pattern A or B. Rearrange the following sentences.",
     "examples": [
      {
       "hz": "(1)他每天都走路走半個鐘頭。",
       "vi": "(1) Ngày nào anh ấy cũng đi bộ nửa tiếng.",
       "py": "(1) tā měitiān dōu zǒulù zǒu bàngè zhōngtóu."
      },
      {
       "hz": "(2)我一個星期要上班上五天。",
       "vi": "(2) Một tuần tôi phải đi làm năm ngày.",
       "py": "(2) wǒ yígè xīngqí yào shàngbān shàng wǔtiān."
      },
      {
       "hz": "例句：我每天學中文學三個小時。",
       "vi": "Câu mẫu: Mỗi ngày tôi học tiếng Trung ba tiếng.",
       "py": "Lìjù: Wǒ měitiān xué zhōng wénxué sāngè xiǎoshí."
      },
      {
       "hz": "我每天學三個小時的中文。",
       "vi": "Mỗi ngày tôi học ba tiếng tiếng Trung.",
       "py": "Wǒ měitiān xué sāngè xiǎoshí de zhōngwén."
      },
      {
       "hz": "(3)我想上兩個月的華語課。",
       "vi": "(3) Tôi muốn học lớp tiếng Hoa hai tháng.",
       "py": "(3) wǒ xiǎng shàng liǎnggè yuè de huáyǔ kè."
      },
      {
       "hz": "(4)我明天要坐十六個小時的飛機。",
       "vi": "(4) Ngày mai tôi phải đi máy bay mười sáu tiếng.",
       "py": "(4) wǒ míngtiān yào zuò shíliùgè xiǎoshí de fēijī."
      },
      {
       "hz": "(1)做/我/兩個小時/功課/做/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(1) zuò / wǒ / liǎnggè xiǎoshí / gōngkè / zuò / měitiān /."
      },
      {
       "hz": "(2)書法課/上/他/打算/的/一年/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(2) shūfǎkè / shàng / tā / dǎsuàn / de / yìnián /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập thời lượng",
   "giaiThich": "Phần luyện tập: viết lại câu theo mẫu A hoặc B, và sắp xếp lại trật tự câu."
  },
  {
   "title": "2. míngtiān/bàntiān/xūyào/de/zǒu/lù/wǒ/.",
   "points": [
    {
     "label": null,
     "formula": "Rúguǒ nǐ bù néng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wéishénme? Shuōhuà de nà ge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu,      zěnme zuò?",
     "examples": [
      {
       "hz": "(3)明天/半天/需要/的/走/路/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(3) míngtiān / bàntiān / xūyào / de / zǒu / lù / wǒ /."
      },
      {
       "hz": "(4)去日本/我/一年/日文/決定/的/學/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(4) qù Rìběn / wǒ / yìnián / rìwén / juédìng / de / xué /."
      },
      {
       "hz": "說話的那個人不知道科學展在哪裡的時候，怎麼做？",
       "vi": "Khi không biết triển lãm khoa học ở đâu, người nói đã làm gì?",
       "py": "Shuōhuà de nàge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu, zěnme zuò?"
      },
      {
       "hz": "你一天用幾個小時的手機？",
       "vi": "Một ngày bạn dùng điện thoại mấy tiếng?",
       "py": "Nǐ yìtiān yòng jǐgè xiǎoshí de shǒujī?"
      },
      {
       "hz": "你常用手機做什麼？",
       "vi": "Bạn thường dùng điện thoại làm gì?",
       "py": "Nǐ chángyòng shǒujī zuò shénme?"
      },
      {
       "hz": "如果你不能用手機，你的生活會比較好嗎？為什麼？",
       "vi": "Nếu không được dùng điện thoại, cuộc sống của bạn có tốt hơn không? Tại sao?",
       "py": "Rúguǒ nǐ bùnéng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu đúng."
  }
 ],
 "td1-13.2": [
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement.",
     "examples": [
      {
       "hz": "中國字應該從左往右寫，韓國字呢？",
       "vi": "Chữ Hán nên viết từ trái sang phải, còn chữ Hàn thì sao?",
       "py": "Zhōngguó zì yīnggāi cóngzuǒwǎngyòu xiě, Hánguó zì ne?"
      },
      {
       "hz": "從我房間的窗戶往外看，就可以看到漂亮的風景。",
       "vi": "Từ cửa sổ phòng tôi nhìn ra ngoài là có thể thấy phong cảnh đẹp.",
       "py": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng zhèlǐ wǎng zuì gāo de nà dòng fángzi zǒu, nǐ huì kàndào liǎng jiā bǎihuògōngsī. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement. Describe the following picture with “從……往……”.",
     "examples": [
      {
       "hz": "從這裡往最高的那棟房子走，你會看到兩家百貨公司。",
       "vi": "Từ đây đi về phía toà nhà cao nhất kia, bạn sẽ thấy hai trung tâm thương mại.",
       "py": "Cóng zhèlǐ wǎng zuìgāo de nàdòng fángzi zǒu, nǐ huì kàndào liǎngjiā bǎihuògōngsī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "III. Sentence with Adverb 就",
   "points": [
    {
     "label": null,
     "formula": "就 indicates that something happens earlier or takes place sooner than expected. 就 also indicates that something is easy to be completed or likely to happen. Jiǔ diǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bā diǎn bàn jiù dào gōngsī le. Nǐ wǎng qián zǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) Complete the following dialogues with 就. Complete the following dialogues with 就. Complete the following dialogues with 就.",
     "examples": [
      {
       "hz": "九點開始上班，可是我每天都八點半就到公司了。",
       "vi": "Chín giờ mới bắt đầu làm việc, nhưng ngày nào tôi cũng tám giờ rưỡi đã đến công ty rồi.",
       "py": "Jiǔdiǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bādiǎnbàn jiù dào gōngsī le."
      },
      {
       "hz": "我今天早上六點就起床了。（早）2.你往前走，就可以看到那家店了。（快、容易）3.你先跟老師請假，就沒問題了吧？（容易）",
       "vi": "Sáng nay sáu giờ tôi đã dậy rồi. (sớm) Bạn đi thẳng về phía trước là thấy cửa hàng đó ngay. (nhanh, dễ) Bạn xin phép thầy giáo trước là không có vấn đề gì nữa phải không? (dễ)",
       "py": "Wǒ jīntiān zǎoshàng liùdiǎn jiù qǐchuáng le. (zǎo) 2. Nǐ wǎngqiánzǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) 3. Nǐ xiān gēn lǎoshī qǐngjià, jiù méi wèntí le ba? (róngyì)"
      },
      {
       "hz": "A：我今天很早就到學校來了。",
       "vi": "A: Hôm nay tôi đã đến trường từ rất sớm.",
       "py": "A: Wǒ jīntiān hěn zǎojiù dào xuéxiào lái le."
      },
      {
       "hz": "B：你今天是幾點到的？",
       "vi": "B: Hôm nay bạn đến lúc mấy giờ?",
       "py": "B: Nǐ jīntiān shì jǐdiǎn dào de?"
      },
      {
       "hz": "A：我想去台北101，請問要怎麼走？",
       "vi": "A: Tôi muốn đến Taipei 101, cho hỏi đi đường nào?",
       "py": "A: Wǒ xiǎng qù Táiběi 101, qǐngwèn yào zěnme zǒu?"
      },
      {
       "hz": "A：那我知道了，真謝謝你！",
       "vi": "A: Vậy tôi biết rồi, cảm ơn bạn nhiều!",
       "py": "A: Nà wǒ zhīdào le, zhēn xièxie nǐ!"
      },
      {
       "hz": "A：我明天要跟同學介紹我的國家，所以想到圖書館去找書。",
       "vi": "A: Ngày mai tôi sẽ giới thiệu về đất nước mình với các bạn cùng lớp, nên muốn đến thư viện tìm sách.",
       "py": "A: Wǒ míngtiān yào gēn tóngxué jièshào wǒ de guójiā, suǒyǐ xiǎngdào túshūguǎn qù zhǎo shū."
      },
      {
       "hz": "他們今天打算在博物館參觀多久？",
       "vi": "Hôm nay họ định tham quan bảo tàng bao lâu?",
       "py": "Tāmen jīntiān dǎsuàn zài bówùguǎn cānguān duōjiǔ?"
      },
      {
       "hz": "家樂在網路上看了什麼？",
       "vi": "Gia Lạc đã xem gì trên mạng?",
       "py": "Jiālè zài wǎnglùshàng kàn le shénme?"
      },
      {
       "hz": "中明是什麼時候到的？",
       "vi": "Trung Minh đến lúc nào?",
       "py": "Zhōngmíng shì shénme shíhòu dào de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phó từ 就",
   "giaiThich": "就 cho biết việc xảy ra SỚM hơn dự tính, hoặc việc dễ dàng/dễ xảy ra."
  },
  {
   "title": "I. 就(要)⋯⋯了",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure indicates the action after 就(要) is going to happen in a very short time. There’s usually a time word before this structure. 就(要) means the action is happening soon; 了is used at the end of the sentence. Complete the following sentences with 就(要)……了.",
     "examples": [
      {
       "hz": "他的女朋友明天就要來了，他非常開心。",
       "vi": "Ngày mai bạn gái anh ấy sẽ đến rồi, anh ấy rất vui.",
       "py": "Tā de nǚpéngyǒu míngtiān jiùyào lái le, tā fēicháng kāixīn."
      },
      {
       "hz": "電影馬上就要開始了，他怎麼還沒來？",
       "vi": "Phim sắp bắt đầu rồi, sao anh ấy vẫn chưa đến?",
       "py": "Diànyǐng mǎshàng jiùyào kāishǐ le, tā zěnme hái méi lái?"
      },
      {
       "hz": "圖書館就要關了，你現在去也許太晚了。",
       "vi": "Thư viện sắp đóng cửa rồi, bây giờ bạn đi có lẽ đã muộn.",
       "py": "Túshūguǎn jiùyào guān le, nǐ xiànzài qù yěxǔ tàiwǎn le."
      },
      {
       "hz": "(十分鐘以後/火車來)(下星期二/回國)",
       "vi": "(mười phút sau / tàu hoả đến) (thứ Ba tuần sau / về nước)",
       "py": "(shífēnzhōng yǐhòu / huǒchē lái) (xià xīngqí'èr / huíguó)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就(要)……了 — sắp ngay",
   "giaiThich": "Diễn đạt việc sắp xảy ra trong thời gian rất ngắn; phía trước thường có từ chỉ thời gian, cuối câu có 了."
  },
  {
   "title": "II. Time-Duration",
   "points": [
    {
     "label": null,
     "formula": "Bùhǎoyìsi, qǐng nín zài děng liǎng fēnzhōng, Lǐ xiānshēng hěn kuài jiù lái le. Time-Duration pattern indicates an action lasts a period of time. In this pattern, the action always precedes Time-Duration. Wǒmen cóng xuéxiào zǒu shí fēnzhōng, jiù kěyǐ dào nà jiā yínháng le. Rearrange the following sentences. Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méi guānxi. Wǒ dìdi hěn ài wán shǒujī, měitiān chàbùduō wán wǔ ge xiǎoshí. Tīngshuō nà ge bówùguǎn bú tài yuǎn, zhǐ yào zuò wǔ fēnzhōng de jiéyùn. Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshí fēnzhōng de lù jiù dào le.",
     "examples": [
      {
       "hz": "爸爸每天早上運動三十分鐘。",
       "vi": "Sáng nào bố cũng tập thể dục ba mươi phút.",
       "py": "Bàba měitiān zǎoshàng yùndòng sānshífēnzhōng."
      },
      {
       "hz": "我們從學校走十分鐘，就可以到那家銀行了。",
       "vi": "Từ trường đi bộ mười phút là đến ngân hàng đó.",
       "py": "Wǒmen cóng xuéxiào zǒu shífēnzhōng, jiù kěyǐ dào nà jiā yínháng le."
      },
      {
       "hz": "不好意思，請您再等兩分鐘，李先生很快就來了。",
       "vi": "Xin lỗi, phiền ông đợi thêm hai phút, anh Lý sẽ đến ngay.",
       "py": "Bùhǎoyìsī, qǐng nín zài děng liǎngfēnzhōng, Lǐ xiānshēng hěnkuài jiù lái le."
      },
      {
       "hz": "八個小時。",
       "vi": "Tám tiếng.",
       "py": "Bāgè xiǎoshí."
      },
      {
       "hz": "跑/他/半個小時/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Pǎo / tā / bàngè xiǎoshí / měitiān /."
      },
      {
       "hz": "十分鐘/我/休息/需要。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shífēnzhōng / wǒ / xiūxí / xūyào."
      },
      {
       "hz": "太/我/累/了/現在，先/可以/十分鐘/睡/嗎/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Tài / wǒ / lèi / le / xiànzài, xiān / kěyǐ / shífēnzhōng / shuì / ma /?"
      },
      {
       "hz": "A：你每天做晚飯做兩個小時，不覺得累嗎？",
       "vi": "A: Ngày nào bạn cũng nấu bữa tối mất hai tiếng, không thấy mệt à?",
       "py": "A: Nǐ měitiān zuò wǎnfàn zuò liǎnggè xiǎoshí, bù juéde lèi ma?"
      },
      {
       "hz": "B：有時候覺得累，但是我喜歡吃自己做的，所以沒關係。",
       "vi": "B: Có lúc thấy mệt, nhưng tôi thích ăn đồ tự nấu nên không sao.",
       "py": "B: Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méiguānxì."
      },
      {
       "hz": "A：你每天都運動嗎？",
       "vi": "A: Ngày nào bạn cũng tập thể dục à?",
       "py": "A: Nǐ měitiān dōu yùndòng ma?"
      },
      {
       "hz": "B：對，我每天跑步跑三十分鐘。",
       "vi": "B: Đúng vậy, ngày nào tôi cũng chạy bộ ba mươi phút.",
       "py": "B: Duì, wǒ měitiān pǎobù pǎo sānshífēnzhōng."
      },
      {
       "hz": "A：我弟弟很愛玩手機，每天差不多玩五個小時。",
       "vi": "A: Em trai tôi rất mê chơi điện thoại, mỗi ngày chơi khoảng năm tiếng.",
       "py": "A: Wǒ dìdi hěn àiwán shǒujī, měitiān chàbuduō wán wǔgè xiǎoshí."
      },
      {
       "hz": "B：玩五個小時的手機！時間太長了！",
       "vi": "B: Chơi điện thoại năm tiếng! Lâu quá rồi!",
       "py": "B: Wán wǔgè xiǎoshí de shǒujī! Shíjiān tài zhǎng le!"
      },
      {
       "hz": "A：聽說那個博物館不太遠，只要坐五分鐘的捷運。",
       "vi": "A: Nghe nói bảo tàng đó không xa lắm, chỉ đi tàu điện ngầm năm phút.",
       "py": "A: Tīngshuō nàge bówùguǎn bú tài yuǎn, zhǐyào zuò wǔfēnzhōng de jiéyùn."
      },
      {
       "hz": "B：是啊，如果你想走路去也可以，走二十分鐘的路就到了。",
       "vi": "B: Đúng vậy, nếu bạn muốn đi bộ cũng được, đi bộ hai mươi phút là đến.",
       "py": "B: Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshífēnzhōng de lù jiù dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng (bao lâu)",
   "giaiThich": "Nêu hành động kéo dài bao lâu; cụm thời lượng đứng SAU động từ."
  },
  {
   "title": "1. Wǒ yí ge xīngqí yào shàngbān shàng wǔ tiān.",
   "points": [
    {
     "label": null,
     "formula": "Rewrite the following sentences with pattern A or B. Rearrange the following sentences.",
     "examples": [
      {
       "hz": "(1)他每天都走路走半個鐘頭。",
       "vi": "(1) Ngày nào anh ấy cũng đi bộ nửa tiếng.",
       "py": "(1) tā měitiān dōu zǒulù zǒu bàngè zhōngtóu."
      },
      {
       "hz": "(2)我一個星期要上班上五天。",
       "vi": "(2) Một tuần tôi phải đi làm năm ngày.",
       "py": "(2) wǒ yígè xīngqí yào shàngbān shàng wǔtiān."
      },
      {
       "hz": "例句：我每天學中文學三個小時。",
       "vi": "Câu mẫu: Mỗi ngày tôi học tiếng Trung ba tiếng.",
       "py": "Lìjù: Wǒ měitiān xué zhōng wénxué sāngè xiǎoshí."
      },
      {
       "hz": "我每天學三個小時的中文。",
       "vi": "Mỗi ngày tôi học ba tiếng tiếng Trung.",
       "py": "Wǒ měitiān xué sāngè xiǎoshí de zhōngwén."
      },
      {
       "hz": "(3)我想上兩個月的華語課。",
       "vi": "(3) Tôi muốn học lớp tiếng Hoa hai tháng.",
       "py": "(3) wǒ xiǎng shàng liǎnggè yuè de huáyǔ kè."
      },
      {
       "hz": "(4)我明天要坐十六個小時的飛機。",
       "vi": "(4) Ngày mai tôi phải đi máy bay mười sáu tiếng.",
       "py": "(4) wǒ míngtiān yào zuò shíliùgè xiǎoshí de fēijī."
      },
      {
       "hz": "(1)做/我/兩個小時/功課/做/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(1) zuò / wǒ / liǎnggè xiǎoshí / gōngkè / zuò / měitiān /."
      },
      {
       "hz": "(2)書法課/上/他/打算/的/一年/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(2) shūfǎkè / shàng / tā / dǎsuàn / de / yìnián /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập thời lượng",
   "giaiThich": "Phần luyện tập: viết lại câu theo mẫu A hoặc B, và sắp xếp lại trật tự câu."
  },
  {
   "title": "2. míngtiān/bàntiān/xūyào/de/zǒu/lù/wǒ/.",
   "points": [
    {
     "label": null,
     "formula": "Rúguǒ nǐ bù néng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wéishénme? Shuōhuà de nà ge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu,      zěnme zuò?",
     "examples": [
      {
       "hz": "(3)明天/半天/需要/的/走/路/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(3) míngtiān / bàntiān / xūyào / de / zǒu / lù / wǒ /."
      },
      {
       "hz": "(4)去日本/我/一年/日文/決定/的/學/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(4) qù Rìběn / wǒ / yìnián / rìwén / juédìng / de / xué /."
      },
      {
       "hz": "說話的那個人不知道科學展在哪裡的時候，怎麼做？",
       "vi": "Khi không biết triển lãm khoa học ở đâu, người nói đã làm gì?",
       "py": "Shuōhuà de nàge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu, zěnme zuò?"
      },
      {
       "hz": "你一天用幾個小時的手機？",
       "vi": "Một ngày bạn dùng điện thoại mấy tiếng?",
       "py": "Nǐ yìtiān yòng jǐgè xiǎoshí de shǒujī?"
      },
      {
       "hz": "你常用手機做什麼？",
       "vi": "Bạn thường dùng điện thoại làm gì?",
       "py": "Nǐ chángyòng shǒujī zuò shénme?"
      },
      {
       "hz": "如果你不能用手機，你的生活會比較好嗎？為什麼？",
       "vi": "Nếu không được dùng điện thoại, cuộc sống của bạn có tốt hơn không? Tại sao?",
       "py": "Rúguǒ nǐ bùnéng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu đúng."
  }
 ],
 "td1-13.3": [
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement.",
     "examples": [
      {
       "hz": "中國字應該從左往右寫，韓國字呢？",
       "vi": "Chữ Hán nên viết từ trái sang phải, còn chữ Hàn thì sao?",
       "py": "Zhōngguó zì yīnggāi cóngzuǒwǎngyòu xiě, Hánguó zì ne?"
      },
      {
       "hz": "從我房間的窗戶往外看，就可以看到漂亮的風景。",
       "vi": "Từ cửa sổ phòng tôi nhìn ra ngoài là có thể thấy phong cảnh đẹp.",
       "py": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng zhèlǐ wǎng zuì gāo de nà dòng fángzi zǒu, nǐ huì kàndào liǎng jiā bǎihuògōngsī. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement. Describe the following picture with “從……往……”.",
     "examples": [
      {
       "hz": "從這裡往最高的那棟房子走，你會看到兩家百貨公司。",
       "vi": "Từ đây đi về phía toà nhà cao nhất kia, bạn sẽ thấy hai trung tâm thương mại.",
       "py": "Cóng zhèlǐ wǎng zuìgāo de nàdòng fángzi zǒu, nǐ huì kàndào liǎngjiā bǎihuògōngsī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "III. Sentence with Adverb 就",
   "points": [
    {
     "label": null,
     "formula": "就 indicates that something happens earlier or takes place sooner than expected. 就 also indicates that something is easy to be completed or likely to happen. Jiǔ diǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bā diǎn bàn jiù dào gōngsī le. Nǐ wǎng qián zǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) Complete the following dialogues with 就. Complete the following dialogues with 就. Complete the following dialogues with 就.",
     "examples": [
      {
       "hz": "九點開始上班，可是我每天都八點半就到公司了。",
       "vi": "Chín giờ mới bắt đầu làm việc, nhưng ngày nào tôi cũng tám giờ rưỡi đã đến công ty rồi.",
       "py": "Jiǔdiǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bādiǎnbàn jiù dào gōngsī le."
      },
      {
       "hz": "我今天早上六點就起床了。（早）2.你往前走，就可以看到那家店了。（快、容易）3.你先跟老師請假，就沒問題了吧？（容易）",
       "vi": "Sáng nay sáu giờ tôi đã dậy rồi. (sớm) Bạn đi thẳng về phía trước là thấy cửa hàng đó ngay. (nhanh, dễ) Bạn xin phép thầy giáo trước là không có vấn đề gì nữa phải không? (dễ)",
       "py": "Wǒ jīntiān zǎoshàng liùdiǎn jiù qǐchuáng le. (zǎo) 2. Nǐ wǎngqiánzǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) 3. Nǐ xiān gēn lǎoshī qǐngjià, jiù méi wèntí le ba? (róngyì)"
      },
      {
       "hz": "A：我今天很早就到學校來了。",
       "vi": "A: Hôm nay tôi đã đến trường từ rất sớm.",
       "py": "A: Wǒ jīntiān hěn zǎojiù dào xuéxiào lái le."
      },
      {
       "hz": "B：你今天是幾點到的？",
       "vi": "B: Hôm nay bạn đến lúc mấy giờ?",
       "py": "B: Nǐ jīntiān shì jǐdiǎn dào de?"
      },
      {
       "hz": "A：我想去台北101，請問要怎麼走？",
       "vi": "A: Tôi muốn đến Taipei 101, cho hỏi đi đường nào?",
       "py": "A: Wǒ xiǎng qù Táiběi 101, qǐngwèn yào zěnme zǒu?"
      },
      {
       "hz": "A：那我知道了，真謝謝你！",
       "vi": "A: Vậy tôi biết rồi, cảm ơn bạn nhiều!",
       "py": "A: Nà wǒ zhīdào le, zhēn xièxie nǐ!"
      },
      {
       "hz": "A：我明天要跟同學介紹我的國家，所以想到圖書館去找書。",
       "vi": "A: Ngày mai tôi sẽ giới thiệu về đất nước mình với các bạn cùng lớp, nên muốn đến thư viện tìm sách.",
       "py": "A: Wǒ míngtiān yào gēn tóngxué jièshào wǒ de guójiā, suǒyǐ xiǎngdào túshūguǎn qù zhǎo shū."
      },
      {
       "hz": "他們今天打算在博物館參觀多久？",
       "vi": "Hôm nay họ định tham quan bảo tàng bao lâu?",
       "py": "Tāmen jīntiān dǎsuàn zài bówùguǎn cānguān duōjiǔ?"
      },
      {
       "hz": "家樂在網路上看了什麼？",
       "vi": "Gia Lạc đã xem gì trên mạng?",
       "py": "Jiālè zài wǎnglùshàng kàn le shénme?"
      },
      {
       "hz": "中明是什麼時候到的？",
       "vi": "Trung Minh đến lúc nào?",
       "py": "Zhōngmíng shì shénme shíhòu dào de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phó từ 就",
   "giaiThich": "就 cho biết việc xảy ra SỚM hơn dự tính, hoặc việc dễ dàng/dễ xảy ra."
  },
  {
   "title": "I. 就(要)⋯⋯了",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure indicates the action after 就(要) is going to happen in a very short time. There’s usually a time word before this structure. 就(要) means the action is happening soon; 了is used at the end of the sentence. Complete the following sentences with 就(要)……了.",
     "examples": [
      {
       "hz": "他的女朋友明天就要來了，他非常開心。",
       "vi": "Ngày mai bạn gái anh ấy sẽ đến rồi, anh ấy rất vui.",
       "py": "Tā de nǚpéngyǒu míngtiān jiùyào lái le, tā fēicháng kāixīn."
      },
      {
       "hz": "電影馬上就要開始了，他怎麼還沒來？",
       "vi": "Phim sắp bắt đầu rồi, sao anh ấy vẫn chưa đến?",
       "py": "Diànyǐng mǎshàng jiùyào kāishǐ le, tā zěnme hái méi lái?"
      },
      {
       "hz": "圖書館就要關了，你現在去也許太晚了。",
       "vi": "Thư viện sắp đóng cửa rồi, bây giờ bạn đi có lẽ đã muộn.",
       "py": "Túshūguǎn jiùyào guān le, nǐ xiànzài qù yěxǔ tàiwǎn le."
      },
      {
       "hz": "(十分鐘以後/火車來)(下星期二/回國)",
       "vi": "(mười phút sau / tàu hoả đến) (thứ Ba tuần sau / về nước)",
       "py": "(shífēnzhōng yǐhòu / huǒchē lái) (xià xīngqí'èr / huíguó)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就(要)……了 — sắp ngay",
   "giaiThich": "Diễn đạt việc sắp xảy ra trong thời gian rất ngắn; phía trước thường có từ chỉ thời gian, cuối câu có 了."
  },
  {
   "title": "II. Time-Duration",
   "points": [
    {
     "label": null,
     "formula": "Bùhǎoyìsi, qǐng nín zài děng liǎng fēnzhōng, Lǐ xiānshēng hěn kuài jiù lái le. Time-Duration pattern indicates an action lasts a period of time. In this pattern, the action always precedes Time-Duration. Wǒmen cóng xuéxiào zǒu shí fēnzhōng, jiù kěyǐ dào nà jiā yínháng le. Rearrange the following sentences. Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méi guānxi. Wǒ dìdi hěn ài wán shǒujī, měitiān chàbùduō wán wǔ ge xiǎoshí. Tīngshuō nà ge bówùguǎn bú tài yuǎn, zhǐ yào zuò wǔ fēnzhōng de jiéyùn. Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshí fēnzhōng de lù jiù dào le.",
     "examples": [
      {
       "hz": "爸爸每天早上運動三十分鐘。",
       "vi": "Sáng nào bố cũng tập thể dục ba mươi phút.",
       "py": "Bàba měitiān zǎoshàng yùndòng sānshífēnzhōng."
      },
      {
       "hz": "我們從學校走十分鐘，就可以到那家銀行了。",
       "vi": "Từ trường đi bộ mười phút là đến ngân hàng đó.",
       "py": "Wǒmen cóng xuéxiào zǒu shífēnzhōng, jiù kěyǐ dào nà jiā yínháng le."
      },
      {
       "hz": "不好意思，請您再等兩分鐘，李先生很快就來了。",
       "vi": "Xin lỗi, phiền ông đợi thêm hai phút, anh Lý sẽ đến ngay.",
       "py": "Bùhǎoyìsī, qǐng nín zài děng liǎngfēnzhōng, Lǐ xiānshēng hěnkuài jiù lái le."
      },
      {
       "hz": "八個小時。",
       "vi": "Tám tiếng.",
       "py": "Bāgè xiǎoshí."
      },
      {
       "hz": "跑/他/半個小時/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Pǎo / tā / bàngè xiǎoshí / měitiān /."
      },
      {
       "hz": "十分鐘/我/休息/需要。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shífēnzhōng / wǒ / xiūxí / xūyào."
      },
      {
       "hz": "太/我/累/了/現在，先/可以/十分鐘/睡/嗎/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Tài / wǒ / lèi / le / xiànzài, xiān / kěyǐ / shífēnzhōng / shuì / ma /?"
      },
      {
       "hz": "A：你每天做晚飯做兩個小時，不覺得累嗎？",
       "vi": "A: Ngày nào bạn cũng nấu bữa tối mất hai tiếng, không thấy mệt à?",
       "py": "A: Nǐ měitiān zuò wǎnfàn zuò liǎnggè xiǎoshí, bù juéde lèi ma?"
      },
      {
       "hz": "B：有時候覺得累，但是我喜歡吃自己做的，所以沒關係。",
       "vi": "B: Có lúc thấy mệt, nhưng tôi thích ăn đồ tự nấu nên không sao.",
       "py": "B: Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méiguānxì."
      },
      {
       "hz": "A：你每天都運動嗎？",
       "vi": "A: Ngày nào bạn cũng tập thể dục à?",
       "py": "A: Nǐ měitiān dōu yùndòng ma?"
      },
      {
       "hz": "B：對，我每天跑步跑三十分鐘。",
       "vi": "B: Đúng vậy, ngày nào tôi cũng chạy bộ ba mươi phút.",
       "py": "B: Duì, wǒ měitiān pǎobù pǎo sānshífēnzhōng."
      },
      {
       "hz": "A：我弟弟很愛玩手機，每天差不多玩五個小時。",
       "vi": "A: Em trai tôi rất mê chơi điện thoại, mỗi ngày chơi khoảng năm tiếng.",
       "py": "A: Wǒ dìdi hěn àiwán shǒujī, měitiān chàbuduō wán wǔgè xiǎoshí."
      },
      {
       "hz": "B：玩五個小時的手機！時間太長了！",
       "vi": "B: Chơi điện thoại năm tiếng! Lâu quá rồi!",
       "py": "B: Wán wǔgè xiǎoshí de shǒujī! Shíjiān tài zhǎng le!"
      },
      {
       "hz": "A：聽說那個博物館不太遠，只要坐五分鐘的捷運。",
       "vi": "A: Nghe nói bảo tàng đó không xa lắm, chỉ đi tàu điện ngầm năm phút.",
       "py": "A: Tīngshuō nàge bówùguǎn bú tài yuǎn, zhǐyào zuò wǔfēnzhōng de jiéyùn."
      },
      {
       "hz": "B：是啊，如果你想走路去也可以，走二十分鐘的路就到了。",
       "vi": "B: Đúng vậy, nếu bạn muốn đi bộ cũng được, đi bộ hai mươi phút là đến.",
       "py": "B: Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshífēnzhōng de lù jiù dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng (bao lâu)",
   "giaiThich": "Nêu hành động kéo dài bao lâu; cụm thời lượng đứng SAU động từ."
  },
  {
   "title": "1. Wǒ yí ge xīngqí yào shàngbān shàng wǔ tiān.",
   "points": [
    {
     "label": null,
     "formula": "Rewrite the following sentences with pattern A or B. Rearrange the following sentences.",
     "examples": [
      {
       "hz": "(1)他每天都走路走半個鐘頭。",
       "vi": "(1) Ngày nào anh ấy cũng đi bộ nửa tiếng.",
       "py": "(1) tā měitiān dōu zǒulù zǒu bàngè zhōngtóu."
      },
      {
       "hz": "(2)我一個星期要上班上五天。",
       "vi": "(2) Một tuần tôi phải đi làm năm ngày.",
       "py": "(2) wǒ yígè xīngqí yào shàngbān shàng wǔtiān."
      },
      {
       "hz": "例句：我每天學中文學三個小時。",
       "vi": "Câu mẫu: Mỗi ngày tôi học tiếng Trung ba tiếng.",
       "py": "Lìjù: Wǒ měitiān xué zhōng wénxué sāngè xiǎoshí."
      },
      {
       "hz": "我每天學三個小時的中文。",
       "vi": "Mỗi ngày tôi học ba tiếng tiếng Trung.",
       "py": "Wǒ měitiān xué sāngè xiǎoshí de zhōngwén."
      },
      {
       "hz": "(3)我想上兩個月的華語課。",
       "vi": "(3) Tôi muốn học lớp tiếng Hoa hai tháng.",
       "py": "(3) wǒ xiǎng shàng liǎnggè yuè de huáyǔ kè."
      },
      {
       "hz": "(4)我明天要坐十六個小時的飛機。",
       "vi": "(4) Ngày mai tôi phải đi máy bay mười sáu tiếng.",
       "py": "(4) wǒ míngtiān yào zuò shíliùgè xiǎoshí de fēijī."
      },
      {
       "hz": "(1)做/我/兩個小時/功課/做/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(1) zuò / wǒ / liǎnggè xiǎoshí / gōngkè / zuò / měitiān /."
      },
      {
       "hz": "(2)書法課/上/他/打算/的/一年/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(2) shūfǎkè / shàng / tā / dǎsuàn / de / yìnián /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập thời lượng",
   "giaiThich": "Phần luyện tập: viết lại câu theo mẫu A hoặc B, và sắp xếp lại trật tự câu."
  },
  {
   "title": "2. míngtiān/bàntiān/xūyào/de/zǒu/lù/wǒ/.",
   "points": [
    {
     "label": null,
     "formula": "Rúguǒ nǐ bù néng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wéishénme? Shuōhuà de nà ge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu,      zěnme zuò?",
     "examples": [
      {
       "hz": "(3)明天/半天/需要/的/走/路/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(3) míngtiān / bàntiān / xūyào / de / zǒu / lù / wǒ /."
      },
      {
       "hz": "(4)去日本/我/一年/日文/決定/的/學/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(4) qù Rìběn / wǒ / yìnián / rìwén / juédìng / de / xué /."
      },
      {
       "hz": "說話的那個人不知道科學展在哪裡的時候，怎麼做？",
       "vi": "Khi không biết triển lãm khoa học ở đâu, người nói đã làm gì?",
       "py": "Shuōhuà de nàge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu, zěnme zuò?"
      },
      {
       "hz": "你一天用幾個小時的手機？",
       "vi": "Một ngày bạn dùng điện thoại mấy tiếng?",
       "py": "Nǐ yìtiān yòng jǐgè xiǎoshí de shǒujī?"
      },
      {
       "hz": "你常用手機做什麼？",
       "vi": "Bạn thường dùng điện thoại làm gì?",
       "py": "Nǐ chángyòng shǒujī zuò shénme?"
      },
      {
       "hz": "如果你不能用手機，你的生活會比較好嗎？為什麼？",
       "vi": "Nếu không được dùng điện thoại, cuộc sống của bạn có tốt hơn không? Tại sao?",
       "py": "Rúguǒ nǐ bùnéng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu đúng."
  }
 ],
 "td1-13.4": [
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement.",
     "examples": [
      {
       "hz": "中國字應該從左往右寫，韓國字呢？",
       "vi": "Chữ Hán nên viết từ trái sang phải, còn chữ Hàn thì sao?",
       "py": "Zhōngguó zì yīnggāi cóngzuǒwǎngyòu xiě, Hánguó zì ne?"
      },
      {
       "hz": "從我房間的窗戶往外看，就可以看到漂亮的風景。",
       "vi": "Từ cửa sổ phòng tôi nhìn ra ngoài là có thể thấy phong cảnh đẹp.",
       "py": "Cóng wǒ fángjiān de chuānghù wǎng wài kàn, jiù kěyǐ kàndào piàoliàng de fēngjǐng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "II. 從……往…… from…to… (direction)",
   "points": [
    {
     "label": null,
     "formula": "Cóng zhèlǐ wǎng zuì gāo de nà dòng fángzi zǒu, nǐ huì kàndào liǎng jiā bǎihuògōngsī. This pattern expresses direction of movement. 從 marks the beginning point and 往 marks the end point of the movement. Describe the following picture with “從……往……”.",
     "examples": [
      {
       "hz": "從這裡往最高的那棟房子走，你會看到兩家百貨公司。",
       "vi": "Từ đây đi về phía toà nhà cao nhất kia, bạn sẽ thấy hai trung tâm thương mại.",
       "py": "Cóng zhèlǐ wǎng zuìgāo de nàdòng fángzi zǒu, nǐ huì kàndào liǎngjiā bǎihuògōngsī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "從……往…… (phương hướng)",
   "giaiThich": "從 đánh dấu điểm bắt đầu, 往 đánh dấu hướng đi — dùng để chỉ đường."
  },
  {
   "title": "III. Sentence with Adverb 就",
   "points": [
    {
     "label": null,
     "formula": "就 indicates that something happens earlier or takes place sooner than expected. 就 also indicates that something is easy to be completed or likely to happen. Jiǔ diǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bā diǎn bàn jiù dào gōngsī le. Nǐ wǎng qián zǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) Complete the following dialogues with 就. Complete the following dialogues with 就. Complete the following dialogues with 就.",
     "examples": [
      {
       "hz": "九點開始上班，可是我每天都八點半就到公司了。",
       "vi": "Chín giờ mới bắt đầu làm việc, nhưng ngày nào tôi cũng tám giờ rưỡi đã đến công ty rồi.",
       "py": "Jiǔdiǎn kāishǐ shàngbān, kěshì wǒ měitiān dōu bādiǎnbàn jiù dào gōngsī le."
      },
      {
       "hz": "我今天早上六點就起床了。（早）2.你往前走，就可以看到那家店了。（快、容易）3.你先跟老師請假，就沒問題了吧？（容易）",
       "vi": "Sáng nay sáu giờ tôi đã dậy rồi. (sớm) Bạn đi thẳng về phía trước là thấy cửa hàng đó ngay. (nhanh, dễ) Bạn xin phép thầy giáo trước là không có vấn đề gì nữa phải không? (dễ)",
       "py": "Wǒ jīntiān zǎoshàng liùdiǎn jiù qǐchuáng le. (zǎo) 2. Nǐ wǎngqiánzǒu, jiù kěyǐ kàndào nà jiā diàn le. (kuài, róngyì) 3. Nǐ xiān gēn lǎoshī qǐngjià, jiù méi wèntí le ba? (róngyì)"
      },
      {
       "hz": "A：我今天很早就到學校來了。",
       "vi": "A: Hôm nay tôi đã đến trường từ rất sớm.",
       "py": "A: Wǒ jīntiān hěn zǎojiù dào xuéxiào lái le."
      },
      {
       "hz": "B：你今天是幾點到的？",
       "vi": "B: Hôm nay bạn đến lúc mấy giờ?",
       "py": "B: Nǐ jīntiān shì jǐdiǎn dào de?"
      },
      {
       "hz": "A：我想去台北101，請問要怎麼走？",
       "vi": "A: Tôi muốn đến Taipei 101, cho hỏi đi đường nào?",
       "py": "A: Wǒ xiǎng qù Táiběi 101, qǐngwèn yào zěnme zǒu?"
      },
      {
       "hz": "A：那我知道了，真謝謝你！",
       "vi": "A: Vậy tôi biết rồi, cảm ơn bạn nhiều!",
       "py": "A: Nà wǒ zhīdào le, zhēn xièxie nǐ!"
      },
      {
       "hz": "A：我明天要跟同學介紹我的國家，所以想到圖書館去找書。",
       "vi": "A: Ngày mai tôi sẽ giới thiệu về đất nước mình với các bạn cùng lớp, nên muốn đến thư viện tìm sách.",
       "py": "A: Wǒ míngtiān yào gēn tóngxué jièshào wǒ de guójiā, suǒyǐ xiǎngdào túshūguǎn qù zhǎo shū."
      },
      {
       "hz": "他們今天打算在博物館參觀多久？",
       "vi": "Hôm nay họ định tham quan bảo tàng bao lâu?",
       "py": "Tāmen jīntiān dǎsuàn zài bówùguǎn cānguān duōjiǔ?"
      },
      {
       "hz": "家樂在網路上看了什麼？",
       "vi": "Gia Lạc đã xem gì trên mạng?",
       "py": "Jiālè zài wǎnglùshàng kàn le shénme?"
      },
      {
       "hz": "中明是什麼時候到的？",
       "vi": "Trung Minh đến lúc nào?",
       "py": "Zhōngmíng shì shénme shíhòu dào de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Phó từ 就",
   "giaiThich": "就 cho biết việc xảy ra SỚM hơn dự tính, hoặc việc dễ dàng/dễ xảy ra."
  },
  {
   "title": "I. 就(要)⋯⋯了",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure indicates the action after 就(要) is going to happen in a very short time. There’s usually a time word before this structure. 就(要) means the action is happening soon; 了is used at the end of the sentence. Complete the following sentences with 就(要)……了.",
     "examples": [
      {
       "hz": "他的女朋友明天就要來了，他非常開心。",
       "vi": "Ngày mai bạn gái anh ấy sẽ đến rồi, anh ấy rất vui.",
       "py": "Tā de nǚpéngyǒu míngtiān jiùyào lái le, tā fēicháng kāixīn."
      },
      {
       "hz": "電影馬上就要開始了，他怎麼還沒來？",
       "vi": "Phim sắp bắt đầu rồi, sao anh ấy vẫn chưa đến?",
       "py": "Diànyǐng mǎshàng jiùyào kāishǐ le, tā zěnme hái méi lái?"
      },
      {
       "hz": "圖書館就要關了，你現在去也許太晚了。",
       "vi": "Thư viện sắp đóng cửa rồi, bây giờ bạn đi có lẽ đã muộn.",
       "py": "Túshūguǎn jiùyào guān le, nǐ xiànzài qù yěxǔ tàiwǎn le."
      },
      {
       "hz": "(十分鐘以後/火車來)(下星期二/回國)",
       "vi": "(mười phút sau / tàu hoả đến) (thứ Ba tuần sau / về nước)",
       "py": "(shífēnzhōng yǐhòu / huǒchē lái) (xià xīngqí'èr / huíguó)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就(要)……了 — sắp ngay",
   "giaiThich": "Diễn đạt việc sắp xảy ra trong thời gian rất ngắn; phía trước thường có từ chỉ thời gian, cuối câu có 了."
  },
  {
   "title": "II. Time-Duration",
   "points": [
    {
     "label": null,
     "formula": "Bùhǎoyìsi, qǐng nín zài děng liǎng fēnzhōng, Lǐ xiānshēng hěn kuài jiù lái le. Time-Duration pattern indicates an action lasts a period of time. In this pattern, the action always precedes Time-Duration. Wǒmen cóng xuéxiào zǒu shí fēnzhōng, jiù kěyǐ dào nà jiā yínháng le. Rearrange the following sentences. Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méi guānxi. Wǒ dìdi hěn ài wán shǒujī, měitiān chàbùduō wán wǔ ge xiǎoshí. Tīngshuō nà ge bówùguǎn bú tài yuǎn, zhǐ yào zuò wǔ fēnzhōng de jiéyùn. Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshí fēnzhōng de lù jiù dào le.",
     "examples": [
      {
       "hz": "爸爸每天早上運動三十分鐘。",
       "vi": "Sáng nào bố cũng tập thể dục ba mươi phút.",
       "py": "Bàba měitiān zǎoshàng yùndòng sānshífēnzhōng."
      },
      {
       "hz": "我們從學校走十分鐘，就可以到那家銀行了。",
       "vi": "Từ trường đi bộ mười phút là đến ngân hàng đó.",
       "py": "Wǒmen cóng xuéxiào zǒu shífēnzhōng, jiù kěyǐ dào nà jiā yínháng le."
      },
      {
       "hz": "不好意思，請您再等兩分鐘，李先生很快就來了。",
       "vi": "Xin lỗi, phiền ông đợi thêm hai phút, anh Lý sẽ đến ngay.",
       "py": "Bùhǎoyìsī, qǐng nín zài děng liǎngfēnzhōng, Lǐ xiānshēng hěnkuài jiù lái le."
      },
      {
       "hz": "八個小時。",
       "vi": "Tám tiếng.",
       "py": "Bāgè xiǎoshí."
      },
      {
       "hz": "跑/他/半個小時/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Pǎo / tā / bàngè xiǎoshí / měitiān /."
      },
      {
       "hz": "十分鐘/我/休息/需要。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Shífēnzhōng / wǒ / xiūxí / xūyào."
      },
      {
       "hz": "太/我/累/了/現在，先/可以/十分鐘/睡/嗎/？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Tài / wǒ / lèi / le / xiànzài, xiān / kěyǐ / shífēnzhōng / shuì / ma /?"
      },
      {
       "hz": "A：你每天做晚飯做兩個小時，不覺得累嗎？",
       "vi": "A: Ngày nào bạn cũng nấu bữa tối mất hai tiếng, không thấy mệt à?",
       "py": "A: Nǐ měitiān zuò wǎnfàn zuò liǎnggè xiǎoshí, bù juéde lèi ma?"
      },
      {
       "hz": "B：有時候覺得累，但是我喜歡吃自己做的，所以沒關係。",
       "vi": "B: Có lúc thấy mệt, nhưng tôi thích ăn đồ tự nấu nên không sao.",
       "py": "B: Yǒushíhòu juéde lèi, dànshì wǒ xǐhuān chī zìjǐ zuò de, suǒyǐ méiguānxì."
      },
      {
       "hz": "A：你每天都運動嗎？",
       "vi": "A: Ngày nào bạn cũng tập thể dục à?",
       "py": "A: Nǐ měitiān dōu yùndòng ma?"
      },
      {
       "hz": "B：對，我每天跑步跑三十分鐘。",
       "vi": "B: Đúng vậy, ngày nào tôi cũng chạy bộ ba mươi phút.",
       "py": "B: Duì, wǒ měitiān pǎobù pǎo sānshífēnzhōng."
      },
      {
       "hz": "A：我弟弟很愛玩手機，每天差不多玩五個小時。",
       "vi": "A: Em trai tôi rất mê chơi điện thoại, mỗi ngày chơi khoảng năm tiếng.",
       "py": "A: Wǒ dìdi hěn àiwán shǒujī, měitiān chàbuduō wán wǔgè xiǎoshí."
      },
      {
       "hz": "B：玩五個小時的手機！時間太長了！",
       "vi": "B: Chơi điện thoại năm tiếng! Lâu quá rồi!",
       "py": "B: Wán wǔgè xiǎoshí de shǒujī! Shíjiān tài zhǎng le!"
      },
      {
       "hz": "A：聽說那個博物館不太遠，只要坐五分鐘的捷運。",
       "vi": "A: Nghe nói bảo tàng đó không xa lắm, chỉ đi tàu điện ngầm năm phút.",
       "py": "A: Tīngshuō nàge bówùguǎn bú tài yuǎn, zhǐyào zuò wǔfēnzhōng de jiéyùn."
      },
      {
       "hz": "B：是啊，如果你想走路去也可以，走二十分鐘的路就到了。",
       "vi": "B: Đúng vậy, nếu bạn muốn đi bộ cũng được, đi bộ hai mươi phút là đến.",
       "py": "B: Shì a, rúguǒ nǐ xiǎng zǒulù qù yě kěyǐ, zǒu èrshífēnzhōng de lù jiù dào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng (bao lâu)",
   "giaiThich": "Nêu hành động kéo dài bao lâu; cụm thời lượng đứng SAU động từ."
  },
  {
   "title": "1. Wǒ yí ge xīngqí yào shàngbān shàng wǔ tiān.",
   "points": [
    {
     "label": null,
     "formula": "Rewrite the following sentences with pattern A or B. Rearrange the following sentences.",
     "examples": [
      {
       "hz": "(1)他每天都走路走半個鐘頭。",
       "vi": "(1) Ngày nào anh ấy cũng đi bộ nửa tiếng.",
       "py": "(1) tā měitiān dōu zǒulù zǒu bàngè zhōngtóu."
      },
      {
       "hz": "(2)我一個星期要上班上五天。",
       "vi": "(2) Một tuần tôi phải đi làm năm ngày.",
       "py": "(2) wǒ yígè xīngqí yào shàngbān shàng wǔtiān."
      },
      {
       "hz": "例句：我每天學中文學三個小時。",
       "vi": "Câu mẫu: Mỗi ngày tôi học tiếng Trung ba tiếng.",
       "py": "Lìjù: Wǒ měitiān xué zhōng wénxué sāngè xiǎoshí."
      },
      {
       "hz": "我每天學三個小時的中文。",
       "vi": "Mỗi ngày tôi học ba tiếng tiếng Trung.",
       "py": "Wǒ měitiān xué sāngè xiǎoshí de zhōngwén."
      },
      {
       "hz": "(3)我想上兩個月的華語課。",
       "vi": "(3) Tôi muốn học lớp tiếng Hoa hai tháng.",
       "py": "(3) wǒ xiǎng shàng liǎnggè yuè de huáyǔ kè."
      },
      {
       "hz": "(4)我明天要坐十六個小時的飛機。",
       "vi": "(4) Ngày mai tôi phải đi máy bay mười sáu tiếng.",
       "py": "(4) wǒ míngtiān yào zuò shíliùgè xiǎoshí de fēijī."
      },
      {
       "hz": "(1)做/我/兩個小時/功課/做/每天/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(1) zuò / wǒ / liǎnggè xiǎoshí / gōngkè / zuò / měitiān /."
      },
      {
       "hz": "(2)書法課/上/他/打算/的/一年/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(2) shūfǎkè / shàng / tā / dǎsuàn / de / yìnián /."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập thời lượng",
   "giaiThich": "Phần luyện tập: viết lại câu theo mẫu A hoặc B, và sắp xếp lại trật tự câu."
  },
  {
   "title": "2. míngtiān/bàntiān/xūyào/de/zǒu/lù/wǒ/.",
   "points": [
    {
     "label": null,
     "formula": "Rúguǒ nǐ bù néng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wéishénme? Shuōhuà de nà ge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu,      zěnme zuò?",
     "examples": [
      {
       "hz": "(3)明天/半天/需要/的/走/路/我/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(3) míngtiān / bàntiān / xūyào / de / zǒu / lù / wǒ /."
      },
      {
       "hz": "(4)去日本/我/一年/日文/決定/的/學/。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "(4) qù Rìběn / wǒ / yìnián / rìwén / juédìng / de / xué /."
      },
      {
       "hz": "說話的那個人不知道科學展在哪裡的時候，怎麼做？",
       "vi": "Khi không biết triển lãm khoa học ở đâu, người nói đã làm gì?",
       "py": "Shuōhuà de nàge rén bù zhīdào kēxué zhǎn zài nǎlǐ de shíhòu, zěnme zuò?"
      },
      {
       "hz": "你一天用幾個小時的手機？",
       "vi": "Một ngày bạn dùng điện thoại mấy tiếng?",
       "py": "Nǐ yìtiān yòng jǐgè xiǎoshí de shǒujī?"
      },
      {
       "hz": "你常用手機做什麼？",
       "vi": "Bạn thường dùng điện thoại làm gì?",
       "py": "Nǐ chángyòng shǒujī zuò shénme?"
      },
      {
       "hz": "如果你不能用手機，你的生活會比較好嗎？為什麼？",
       "vi": "Nếu không được dùng điện thoại, cuộc sống của bạn có tốt hơn không? Tại sao?",
       "py": "Rúguǒ nǐ bùnéng yòng shǒujī, nǐ de shēnghuó huì bǐjiào hǎo ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu đúng."
  }
 ],
 "td1-14.1": [
  {
   "title": "II. Time-Duration with Double 了",
   "points": [
    {
     "label": null,
     "formula": "When using double 了, it indicates that the action has lasted so far. This structure indicates that an action continues from the past until now. It means that the action will probably continue. Tā xué Zhōngwén xué le liǎng nián le, kěshì shuō de bú tài hǎo. Using the pattern “SV O，V了+ Time-duration +了” to describe the pictures below. Rúguǒ xiànzài shì wǎnshàng jiǔ diǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le? Táiběi Yīlíngyī zhēn yuǎn, wǒmen yǐjīng zuò le yí ge xiǎoshí de gōngchē le, háiméi dào. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Rúguǒ kuànián de shíhòu bù xiǎng kàn yǎnchànghuì, hái yǒu shénme huódòng? Zài Yīngguó, kuànián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?",
     "examples": [
      {
       "hz": "我已經看書看了兩個小時了，想休息了。",
       "vi": "Tôi đã đọc sách được hai tiếng rồi, muốn nghỉ một lát.",
       "py": "Wǒ yǐjīng kànshū kàn le liǎnggè xiǎoshí le, xiǎng xiūxí le."
      },
      {
       "hz": "他學中文學了兩年了，可是說得不太好。",
       "vi": "Anh ấy đã học tiếng Trung được hai năm rồi, nhưng nói chưa giỏi lắm.",
       "py": "Tā xué zhōng wénxué le liǎngnián le, kěshì shuō de bútàihǎo."
      },
      {
       "hz": "媽媽和王太太聊天聊了一個小時了。",
       "vi": "Mẹ và bà Vương đã nói chuyện được một tiếng rồi.",
       "py": "Māma hàn Wáng tàitai liáotiān liáo le yígè xiǎoshí le."
      },
      {
       "hz": "如果現在是晚上九點，那麼他們做這些事做了多久了？",
       "vi": "Nếu bây giờ là chín giờ tối, thì họ đã làm những việc này được bao lâu rồi?",
       "py": "Rúguǒ xiànzài shì wǎnshàng jiǔdiǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le?"
      },
      {
       "hz": "台北101真遠，我們已經坐了一個小時的公車了，還沒到。",
       "vi": "Taipei 101 xa thật, chúng ta đã đi xe buýt được một tiếng rồi mà vẫn chưa đến.",
       "py": "Táiběi 101 zhēn yuǎn, wǒmen yǐjīng zuò le yígè xiǎoshí de gōngchē le, hái méi dào."
      },
      {
       "hz": "老師教了一天的書了，現在一定很累吧？",
       "vi": "Cô giáo đã dạy cả một ngày rồi, bây giờ chắc mệt lắm nhỉ?",
       "py": "Lǎoshī jiào le yìtiān de shū le, xiànzài yídìng hěn lèi ba?"
      },
      {
       "hz": "A：台北的冬天常常下雨。 2. A：你的中文字寫得真漂亮！",
       "vi": "A: Mùa đông ở Đài Bắc hay mưa. A: Bạn viết chữ Hán đẹp thật!",
       "py": "A: Táiběi de dōngtiān chángcháng xiàyǔ. 2. A: Nǐ de zhōng wénzì xiě de zhēn piàoliàng!"
      },
      {
       "hz": "A：你先回去吧，我還想在這裡看書。",
       "vi": "A: Bạn về trước đi, tôi còn muốn đọc sách ở đây.",
       "py": "A: Nǐ xiānhuíqù ba, wǒ hái xiǎng zài zhèlǐ kànshū."
      },
      {
       "hz": "宜文家附近的環境怎麼樣？",
       "vi": "Môi trường quanh nhà Nghi Văn thế nào?",
       "py": "Yíwén jiā fùjìn de huánjìng zěnmeyàng?"
      },
      {
       "hz": "國安跟友美準備了什麼東西？老師呢？",
       "vi": "Quốc An và Yumi đã chuẩn bị những gì? Còn thầy giáo thì sao?",
       "py": "Guó'ān gēn Yǒuměi zhǔnbèi le shénme dōngxī? Lǎoshī ne?"
      },
      {
       "hz": "如果跨年的時候不想看演唱會，還有什麼活動？",
       "vi": "Nếu lúc đón năm mới không muốn xem hoà nhạc thì còn hoạt động gì khác?",
       "py": "Rúguǒ kuà nián de shíhòu bùxiǎng kàn yǎnchànghuì, háiyǒu shénme huódòng?"
      },
      {
       "hz": "在英國，跨年的時候，大家做什麼？在日本呢？",
       "vi": "Ở Anh, lúc đón năm mới mọi người làm gì? Còn ở Nhật thì sao?",
       "py": "Zài Yīngguó, kuà nián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?"
      },
      {
       "hz": "為什麼國安覺得今年的跨年活動很特別？",
       "vi": "Tại sao Quốc An thấy hoạt động đón năm mới năm nay rất đặc biệt?",
       "py": "Wèishénme Guó'ān juéde jīnnián de kuà nián huódòng hěn tèbié?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng với hai chữ 了",
   "giaiThich": "Dùng hai 了 để nói hành động kéo dài TỪ TRƯỚC ĐẾN NAY và nhiều khả năng còn tiếp tục."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Answer the following questions. Answer the following questions.",
     "examples": [
      {
       "hz": "多了/得多。",
       "vi": "…hơn nhiều.",
       "py": "Duō le / de duō."
      },
      {
       "hz": "A：你哥哥比你高嗎？",
       "vi": "A: Anh trai bạn cao hơn bạn à?",
       "py": "A: Nǐ gēge bǐ nǐ gāo ma?"
      },
      {
       "hz": "B：不，我哥哥比我矮五公分。",
       "vi": "B: Không, anh trai tôi thấp hơn tôi năm phân.",
       "py": "B: Bù, wǒ gēge bǐ wǒ ǎi wǔ gōngfēn."
      },
      {
       "hz": "A：你覺得學中文難不難？",
       "vi": "A: Bạn thấy học tiếng Trung có khó không?",
       "py": "A: Nǐ juéde xué zhōngwén nán bùnán?"
      },
      {
       "hz": "B：我覺得學中文比學科學容易多了。",
       "vi": "B: Tôi thấy học tiếng Trung dễ hơn học khoa học nhiều.",
       "py": "B: Wǒ juéde xué zhōngwén bǐ xué kēxué róngyì duō le."
      },
      {
       "hz": "A：你為什麼不在學校的餐廳吃飯？",
       "vi": "A: Sao bạn không ăn ở căng tin trường?",
       "py": "A: Nǐ wèishénme bú zài xuéxiào de cāntīng chīfàn?"
      },
      {
       "hz": "B：我覺得外面的餐廳做的菜比學校的好吃。",
       "vi": "B: Tôi thấy đồ ăn nhà hàng bên ngoài nấu ngon hơn ở trường.",
       "py": "B: Wǒ juéde wàimiàn de cāntīng zuò de cài bǐ xuéxiào de hǎochī."
      },
      {
       "hz": "A：你喜歡喝咖啡還是茶？",
       "vi": "A: Bạn thích uống cà phê hay trà?",
       "py": "A: Nǐ xǐhuān hēkāfēi háishì chá?"
      },
      {
       "hz": "A：這個週末你想去打球，還是去看電影？",
       "vi": "A: Cuối tuần này bạn muốn đi chơi bóng hay đi xem phim?",
       "py": "A: Zhège zhōumò nǐ xiǎng qù dǎqiú, háishì qù kàn diànyǐng?"
      },
      {
       "hz": "A：為什麼你每天都做飯？",
       "vi": "A: Sao ngày nào bạn cũng nấu cơm?",
       "py": "A: Wèishénme nǐ měitiān dōu zuòfàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Wǒ yì fēnzhōng xiě èrshí ge Zhōngguó zì, dìdi yì fēnzhōng zhǐ xiě shí ge. Zhūròu jiǎozi yí ge wǔ kuài qián, niúròu jiǎozi yí ge bā kuài qián. Based on the information provided, use 比 to write complete sentences. Wǒ zuótiān wǎnshàng zhǐ chī le yì wǎn fàn, gēge chī le sān wǎn fàn. Based on the information provided, use 比 to write complete sentences. Yǒude rén bù xǐhuān rén duō de dìfāng, kuànián de shíhòu tāmen kěyǐ zuò shénme? Wéishénme tā juéde zài Táiběi kuànián shì zuì tèbié de jīngyàn?",
     "examples": [
      {
       "hz": "他比我高，可是跑得比我慢。",
       "vi": "Anh ấy cao hơn tôi, nhưng chạy chậm hơn tôi.",
       "py": "Tā bǐ wǒ gāo, kěshì pǎo de bǐ wǒ màn."
      },
      {
       "hz": "我弟弟說英文說得比我好。",
       "vi": "Em trai tôi nói tiếng Anh giỏi hơn tôi.",
       "py": "Wǒ dìdi shuō yīngwén shuō de bǐ wǒ hǎo."
      },
      {
       "hz": "我媽媽做菜比我爸爸做得好。",
       "vi": "Mẹ tôi nấu ăn ngon hơn bố tôi.",
       "py": "Wǒ māma zuòcài bǐ wǒ bàba zuòdehǎo."
      },
      {
       "hz": "我一分鐘寫二十個中國字，弟弟一分鐘只寫十個。",
       "vi": "Một phút tôi viết được hai mươi chữ Hán, em trai một phút chỉ viết được mười chữ.",
       "py": "Wǒ yìfēnzhōng xiě èrshígè Zhōngguó zì, dìdi yìfēnzhōng zhǐ xiě shígè."
      },
      {
       "hz": "豬肉餃子一個五塊錢，牛肉餃子一個八塊錢。",
       "vi": "Sủi cảo thịt lợn năm đồng một cái, sủi cảo thịt bò tám đồng một cái.",
       "py": "Zhūròu jiǎozi yígè wǔkuài qián, niúròu jiǎozi yígè bākuàiqián."
      },
      {
       "hz": "我昨天晚上只吃了一碗飯，哥哥吃了三碗飯。",
       "vi": "Tối qua tôi chỉ ăn một bát cơm, anh trai ăn ba bát.",
       "py": "Wǒ zuótiānwǎnshàng zhǐ chī le yìwǎn fàn, gēge chī le sānwǎn fàn."
      },
      {
       "hz": "每年的哪一天有跨年活動？",
       "vi": "Hoạt động đón năm mới diễn ra vào ngày nào mỗi năm?",
       "py": "Měinián de nǎyìtiān yǒu kuà nián huódòng?"
      },
      {
       "hz": "年輕人最喜歡參加什麼跨年活動？",
       "vi": "Giới trẻ thích tham gia hoạt động đón năm mới nào nhất?",
       "py": "Niánqīngrén zuì xǐhuān cānjiā shénme kuà nián huódòng?"
      },
      {
       "hz": "去跨年的人很多，交通的問題怎麼樣？",
       "vi": "Người đi đón năm mới rất đông, giao thông thế nào?",
       "py": "Qù kuà nián de rén hěnduō, jiāotōng de wèntí zěnmeyàng?"
      },
      {
       "hz": "有的人不喜歡人多的地方，跨年的時候他們可以做什麼？",
       "vi": "Có người không thích chỗ đông người, lúc đón năm mới họ có thể làm gì?",
       "py": "Yǒu de rén bù xǐhuān rén duō de dìfāng, kuà nián de shíhòu tāmen kěyǐ zuò shénme?"
      },
      {
       "hz": "為什麼他覺得在台北跨年是最特別的經驗？",
       "vi": "Tại sao anh ấy thấy đón năm mới ở Đài Bắc là trải nghiệm đặc biệt nhất?",
       "py": "Wèishénme tā juéde zài Táiběi kuà nián shì zuì tèbié de jīngyàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  }
 ],
 "td1-14.2": [
  {
   "title": "II. Time-Duration with Double 了",
   "points": [
    {
     "label": null,
     "formula": "When using double 了, it indicates that the action has lasted so far. This structure indicates that an action continues from the past until now. It means that the action will probably continue. Tā xué Zhōngwén xué le liǎng nián le, kěshì shuō de bú tài hǎo. Using the pattern “SV O，V了+ Time-duration +了” to describe the pictures below. Rúguǒ xiànzài shì wǎnshàng jiǔ diǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le? Táiběi Yīlíngyī zhēn yuǎn, wǒmen yǐjīng zuò le yí ge xiǎoshí de gōngchē le, háiméi dào. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Rúguǒ kuànián de shíhòu bù xiǎng kàn yǎnchànghuì, hái yǒu shénme huódòng? Zài Yīngguó, kuànián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?",
     "examples": [
      {
       "hz": "我已經看書看了兩個小時了，想休息了。",
       "vi": "Tôi đã đọc sách được hai tiếng rồi, muốn nghỉ một lát.",
       "py": "Wǒ yǐjīng kànshū kàn le liǎnggè xiǎoshí le, xiǎng xiūxí le."
      },
      {
       "hz": "他學中文學了兩年了，可是說得不太好。",
       "vi": "Anh ấy đã học tiếng Trung được hai năm rồi, nhưng nói chưa giỏi lắm.",
       "py": "Tā xué zhōng wénxué le liǎngnián le, kěshì shuō de bútàihǎo."
      },
      {
       "hz": "媽媽和王太太聊天聊了一個小時了。",
       "vi": "Mẹ và bà Vương đã nói chuyện được một tiếng rồi.",
       "py": "Māma hàn Wáng tàitai liáotiān liáo le yígè xiǎoshí le."
      },
      {
       "hz": "如果現在是晚上九點，那麼他們做這些事做了多久了？",
       "vi": "Nếu bây giờ là chín giờ tối, thì họ đã làm những việc này được bao lâu rồi?",
       "py": "Rúguǒ xiànzài shì wǎnshàng jiǔdiǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le?"
      },
      {
       "hz": "台北101真遠，我們已經坐了一個小時的公車了，還沒到。",
       "vi": "Taipei 101 xa thật, chúng ta đã đi xe buýt được một tiếng rồi mà vẫn chưa đến.",
       "py": "Táiběi 101 zhēn yuǎn, wǒmen yǐjīng zuò le yígè xiǎoshí de gōngchē le, hái méi dào."
      },
      {
       "hz": "老師教了一天的書了，現在一定很累吧？",
       "vi": "Cô giáo đã dạy cả một ngày rồi, bây giờ chắc mệt lắm nhỉ?",
       "py": "Lǎoshī jiào le yìtiān de shū le, xiànzài yídìng hěn lèi ba?"
      },
      {
       "hz": "A：台北的冬天常常下雨。 2. A：你的中文字寫得真漂亮！",
       "vi": "A: Mùa đông ở Đài Bắc hay mưa. A: Bạn viết chữ Hán đẹp thật!",
       "py": "A: Táiběi de dōngtiān chángcháng xiàyǔ. 2. A: Nǐ de zhōng wénzì xiě de zhēn piàoliàng!"
      },
      {
       "hz": "A：你先回去吧，我還想在這裡看書。",
       "vi": "A: Bạn về trước đi, tôi còn muốn đọc sách ở đây.",
       "py": "A: Nǐ xiānhuíqù ba, wǒ hái xiǎng zài zhèlǐ kànshū."
      },
      {
       "hz": "宜文家附近的環境怎麼樣？",
       "vi": "Môi trường quanh nhà Nghi Văn thế nào?",
       "py": "Yíwén jiā fùjìn de huánjìng zěnmeyàng?"
      },
      {
       "hz": "國安跟友美準備了什麼東西？老師呢？",
       "vi": "Quốc An và Yumi đã chuẩn bị những gì? Còn thầy giáo thì sao?",
       "py": "Guó'ān gēn Yǒuměi zhǔnbèi le shénme dōngxī? Lǎoshī ne?"
      },
      {
       "hz": "如果跨年的時候不想看演唱會，還有什麼活動？",
       "vi": "Nếu lúc đón năm mới không muốn xem hoà nhạc thì còn hoạt động gì khác?",
       "py": "Rúguǒ kuà nián de shíhòu bùxiǎng kàn yǎnchànghuì, háiyǒu shénme huódòng?"
      },
      {
       "hz": "在英國，跨年的時候，大家做什麼？在日本呢？",
       "vi": "Ở Anh, lúc đón năm mới mọi người làm gì? Còn ở Nhật thì sao?",
       "py": "Zài Yīngguó, kuà nián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?"
      },
      {
       "hz": "為什麼國安覺得今年的跨年活動很特別？",
       "vi": "Tại sao Quốc An thấy hoạt động đón năm mới năm nay rất đặc biệt?",
       "py": "Wèishénme Guó'ān juéde jīnnián de kuà nián huódòng hěn tèbié?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng với hai chữ 了",
   "giaiThich": "Dùng hai 了 để nói hành động kéo dài TỪ TRƯỚC ĐẾN NAY và nhiều khả năng còn tiếp tục."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Answer the following questions. Answer the following questions.",
     "examples": [
      {
       "hz": "多了/得多。",
       "vi": "…hơn nhiều.",
       "py": "Duō le / de duō."
      },
      {
       "hz": "A：你哥哥比你高嗎？",
       "vi": "A: Anh trai bạn cao hơn bạn à?",
       "py": "A: Nǐ gēge bǐ nǐ gāo ma?"
      },
      {
       "hz": "B：不，我哥哥比我矮五公分。",
       "vi": "B: Không, anh trai tôi thấp hơn tôi năm phân.",
       "py": "B: Bù, wǒ gēge bǐ wǒ ǎi wǔ gōngfēn."
      },
      {
       "hz": "A：你覺得學中文難不難？",
       "vi": "A: Bạn thấy học tiếng Trung có khó không?",
       "py": "A: Nǐ juéde xué zhōngwén nán bùnán?"
      },
      {
       "hz": "B：我覺得學中文比學科學容易多了。",
       "vi": "B: Tôi thấy học tiếng Trung dễ hơn học khoa học nhiều.",
       "py": "B: Wǒ juéde xué zhōngwén bǐ xué kēxué róngyì duō le."
      },
      {
       "hz": "A：你為什麼不在學校的餐廳吃飯？",
       "vi": "A: Sao bạn không ăn ở căng tin trường?",
       "py": "A: Nǐ wèishénme bú zài xuéxiào de cāntīng chīfàn?"
      },
      {
       "hz": "B：我覺得外面的餐廳做的菜比學校的好吃。",
       "vi": "B: Tôi thấy đồ ăn nhà hàng bên ngoài nấu ngon hơn ở trường.",
       "py": "B: Wǒ juéde wàimiàn de cāntīng zuò de cài bǐ xuéxiào de hǎochī."
      },
      {
       "hz": "A：你喜歡喝咖啡還是茶？",
       "vi": "A: Bạn thích uống cà phê hay trà?",
       "py": "A: Nǐ xǐhuān hēkāfēi háishì chá?"
      },
      {
       "hz": "A：這個週末你想去打球，還是去看電影？",
       "vi": "A: Cuối tuần này bạn muốn đi chơi bóng hay đi xem phim?",
       "py": "A: Zhège zhōumò nǐ xiǎng qù dǎqiú, háishì qù kàn diànyǐng?"
      },
      {
       "hz": "A：為什麼你每天都做飯？",
       "vi": "A: Sao ngày nào bạn cũng nấu cơm?",
       "py": "A: Wèishénme nǐ měitiān dōu zuòfàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Wǒ yì fēnzhōng xiě èrshí ge Zhōngguó zì, dìdi yì fēnzhōng zhǐ xiě shí ge. Zhūròu jiǎozi yí ge wǔ kuài qián, niúròu jiǎozi yí ge bā kuài qián. Based on the information provided, use 比 to write complete sentences. Wǒ zuótiān wǎnshàng zhǐ chī le yì wǎn fàn, gēge chī le sān wǎn fàn. Based on the information provided, use 比 to write complete sentences. Yǒude rén bù xǐhuān rén duō de dìfāng, kuànián de shíhòu tāmen kěyǐ zuò shénme? Wéishénme tā juéde zài Táiběi kuànián shì zuì tèbié de jīngyàn?",
     "examples": [
      {
       "hz": "他比我高，可是跑得比我慢。",
       "vi": "Anh ấy cao hơn tôi, nhưng chạy chậm hơn tôi.",
       "py": "Tā bǐ wǒ gāo, kěshì pǎo de bǐ wǒ màn."
      },
      {
       "hz": "我弟弟說英文說得比我好。",
       "vi": "Em trai tôi nói tiếng Anh giỏi hơn tôi.",
       "py": "Wǒ dìdi shuō yīngwén shuō de bǐ wǒ hǎo."
      },
      {
       "hz": "我媽媽做菜比我爸爸做得好。",
       "vi": "Mẹ tôi nấu ăn ngon hơn bố tôi.",
       "py": "Wǒ māma zuòcài bǐ wǒ bàba zuòdehǎo."
      },
      {
       "hz": "我一分鐘寫二十個中國字，弟弟一分鐘只寫十個。",
       "vi": "Một phút tôi viết được hai mươi chữ Hán, em trai một phút chỉ viết được mười chữ.",
       "py": "Wǒ yìfēnzhōng xiě èrshígè Zhōngguó zì, dìdi yìfēnzhōng zhǐ xiě shígè."
      },
      {
       "hz": "豬肉餃子一個五塊錢，牛肉餃子一個八塊錢。",
       "vi": "Sủi cảo thịt lợn năm đồng một cái, sủi cảo thịt bò tám đồng một cái.",
       "py": "Zhūròu jiǎozi yígè wǔkuài qián, niúròu jiǎozi yígè bākuàiqián."
      },
      {
       "hz": "我昨天晚上只吃了一碗飯，哥哥吃了三碗飯。",
       "vi": "Tối qua tôi chỉ ăn một bát cơm, anh trai ăn ba bát.",
       "py": "Wǒ zuótiānwǎnshàng zhǐ chī le yìwǎn fàn, gēge chī le sānwǎn fàn."
      },
      {
       "hz": "每年的哪一天有跨年活動？",
       "vi": "Hoạt động đón năm mới diễn ra vào ngày nào mỗi năm?",
       "py": "Měinián de nǎyìtiān yǒu kuà nián huódòng?"
      },
      {
       "hz": "年輕人最喜歡參加什麼跨年活動？",
       "vi": "Giới trẻ thích tham gia hoạt động đón năm mới nào nhất?",
       "py": "Niánqīngrén zuì xǐhuān cānjiā shénme kuà nián huódòng?"
      },
      {
       "hz": "去跨年的人很多，交通的問題怎麼樣？",
       "vi": "Người đi đón năm mới rất đông, giao thông thế nào?",
       "py": "Qù kuà nián de rén hěnduō, jiāotōng de wèntí zěnmeyàng?"
      },
      {
       "hz": "有的人不喜歡人多的地方，跨年的時候他們可以做什麼？",
       "vi": "Có người không thích chỗ đông người, lúc đón năm mới họ có thể làm gì?",
       "py": "Yǒu de rén bù xǐhuān rén duō de dìfāng, kuà nián de shíhòu tāmen kěyǐ zuò shénme?"
      },
      {
       "hz": "為什麼他覺得在台北跨年是最特別的經驗？",
       "vi": "Tại sao anh ấy thấy đón năm mới ở Đài Bắc là trải nghiệm đặc biệt nhất?",
       "py": "Wèishénme tā juéde zài Táiběi kuà nián shì zuì tèbié de jīngyàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  }
 ],
 "td1-14.3": [
  {
   "title": "II. Time-Duration with Double 了",
   "points": [
    {
     "label": null,
     "formula": "When using double 了, it indicates that the action has lasted so far. This structure indicates that an action continues from the past until now. It means that the action will probably continue. Tā xué Zhōngwén xué le liǎng nián le, kěshì shuō de bú tài hǎo. Using the pattern “SV O，V了+ Time-duration +了” to describe the pictures below. Rúguǒ xiànzài shì wǎnshàng jiǔ diǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le? Táiběi Yīlíngyī zhēn yuǎn, wǒmen yǐjīng zuò le yí ge xiǎoshí de gōngchē le, háiméi dào. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Rúguǒ kuànián de shíhòu bù xiǎng kàn yǎnchànghuì, hái yǒu shénme huódòng? Zài Yīngguó, kuànián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?",
     "examples": [
      {
       "hz": "我已經看書看了兩個小時了，想休息了。",
       "vi": "Tôi đã đọc sách được hai tiếng rồi, muốn nghỉ một lát.",
       "py": "Wǒ yǐjīng kànshū kàn le liǎnggè xiǎoshí le, xiǎng xiūxí le."
      },
      {
       "hz": "他學中文學了兩年了，可是說得不太好。",
       "vi": "Anh ấy đã học tiếng Trung được hai năm rồi, nhưng nói chưa giỏi lắm.",
       "py": "Tā xué zhōng wénxué le liǎngnián le, kěshì shuō de bútàihǎo."
      },
      {
       "hz": "媽媽和王太太聊天聊了一個小時了。",
       "vi": "Mẹ và bà Vương đã nói chuyện được một tiếng rồi.",
       "py": "Māma hàn Wáng tàitai liáotiān liáo le yígè xiǎoshí le."
      },
      {
       "hz": "如果現在是晚上九點，那麼他們做這些事做了多久了？",
       "vi": "Nếu bây giờ là chín giờ tối, thì họ đã làm những việc này được bao lâu rồi?",
       "py": "Rúguǒ xiànzài shì wǎnshàng jiǔdiǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le?"
      },
      {
       "hz": "台北101真遠，我們已經坐了一個小時的公車了，還沒到。",
       "vi": "Taipei 101 xa thật, chúng ta đã đi xe buýt được một tiếng rồi mà vẫn chưa đến.",
       "py": "Táiběi 101 zhēn yuǎn, wǒmen yǐjīng zuò le yígè xiǎoshí de gōngchē le, hái méi dào."
      },
      {
       "hz": "老師教了一天的書了，現在一定很累吧？",
       "vi": "Cô giáo đã dạy cả một ngày rồi, bây giờ chắc mệt lắm nhỉ?",
       "py": "Lǎoshī jiào le yìtiān de shū le, xiànzài yídìng hěn lèi ba?"
      },
      {
       "hz": "A：台北的冬天常常下雨。 2. A：你的中文字寫得真漂亮！",
       "vi": "A: Mùa đông ở Đài Bắc hay mưa. A: Bạn viết chữ Hán đẹp thật!",
       "py": "A: Táiběi de dōngtiān chángcháng xiàyǔ. 2. A: Nǐ de zhōng wénzì xiě de zhēn piàoliàng!"
      },
      {
       "hz": "A：你先回去吧，我還想在這裡看書。",
       "vi": "A: Bạn về trước đi, tôi còn muốn đọc sách ở đây.",
       "py": "A: Nǐ xiānhuíqù ba, wǒ hái xiǎng zài zhèlǐ kànshū."
      },
      {
       "hz": "宜文家附近的環境怎麼樣？",
       "vi": "Môi trường quanh nhà Nghi Văn thế nào?",
       "py": "Yíwén jiā fùjìn de huánjìng zěnmeyàng?"
      },
      {
       "hz": "國安跟友美準備了什麼東西？老師呢？",
       "vi": "Quốc An và Yumi đã chuẩn bị những gì? Còn thầy giáo thì sao?",
       "py": "Guó'ān gēn Yǒuměi zhǔnbèi le shénme dōngxī? Lǎoshī ne?"
      },
      {
       "hz": "如果跨年的時候不想看演唱會，還有什麼活動？",
       "vi": "Nếu lúc đón năm mới không muốn xem hoà nhạc thì còn hoạt động gì khác?",
       "py": "Rúguǒ kuà nián de shíhòu bùxiǎng kàn yǎnchànghuì, háiyǒu shénme huódòng?"
      },
      {
       "hz": "在英國，跨年的時候，大家做什麼？在日本呢？",
       "vi": "Ở Anh, lúc đón năm mới mọi người làm gì? Còn ở Nhật thì sao?",
       "py": "Zài Yīngguó, kuà nián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?"
      },
      {
       "hz": "為什麼國安覺得今年的跨年活動很特別？",
       "vi": "Tại sao Quốc An thấy hoạt động đón năm mới năm nay rất đặc biệt?",
       "py": "Wèishénme Guó'ān juéde jīnnián de kuà nián huódòng hěn tèbié?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng với hai chữ 了",
   "giaiThich": "Dùng hai 了 để nói hành động kéo dài TỪ TRƯỚC ĐẾN NAY và nhiều khả năng còn tiếp tục."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Answer the following questions. Answer the following questions.",
     "examples": [
      {
       "hz": "多了/得多。",
       "vi": "…hơn nhiều.",
       "py": "Duō le / de duō."
      },
      {
       "hz": "A：你哥哥比你高嗎？",
       "vi": "A: Anh trai bạn cao hơn bạn à?",
       "py": "A: Nǐ gēge bǐ nǐ gāo ma?"
      },
      {
       "hz": "B：不，我哥哥比我矮五公分。",
       "vi": "B: Không, anh trai tôi thấp hơn tôi năm phân.",
       "py": "B: Bù, wǒ gēge bǐ wǒ ǎi wǔ gōngfēn."
      },
      {
       "hz": "A：你覺得學中文難不難？",
       "vi": "A: Bạn thấy học tiếng Trung có khó không?",
       "py": "A: Nǐ juéde xué zhōngwén nán bùnán?"
      },
      {
       "hz": "B：我覺得學中文比學科學容易多了。",
       "vi": "B: Tôi thấy học tiếng Trung dễ hơn học khoa học nhiều.",
       "py": "B: Wǒ juéde xué zhōngwén bǐ xué kēxué róngyì duō le."
      },
      {
       "hz": "A：你為什麼不在學校的餐廳吃飯？",
       "vi": "A: Sao bạn không ăn ở căng tin trường?",
       "py": "A: Nǐ wèishénme bú zài xuéxiào de cāntīng chīfàn?"
      },
      {
       "hz": "B：我覺得外面的餐廳做的菜比學校的好吃。",
       "vi": "B: Tôi thấy đồ ăn nhà hàng bên ngoài nấu ngon hơn ở trường.",
       "py": "B: Wǒ juéde wàimiàn de cāntīng zuò de cài bǐ xuéxiào de hǎochī."
      },
      {
       "hz": "A：你喜歡喝咖啡還是茶？",
       "vi": "A: Bạn thích uống cà phê hay trà?",
       "py": "A: Nǐ xǐhuān hēkāfēi háishì chá?"
      },
      {
       "hz": "A：這個週末你想去打球，還是去看電影？",
       "vi": "A: Cuối tuần này bạn muốn đi chơi bóng hay đi xem phim?",
       "py": "A: Zhège zhōumò nǐ xiǎng qù dǎqiú, háishì qù kàn diànyǐng?"
      },
      {
       "hz": "A：為什麼你每天都做飯？",
       "vi": "A: Sao ngày nào bạn cũng nấu cơm?",
       "py": "A: Wèishénme nǐ měitiān dōu zuòfàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Wǒ yì fēnzhōng xiě èrshí ge Zhōngguó zì, dìdi yì fēnzhōng zhǐ xiě shí ge. Zhūròu jiǎozi yí ge wǔ kuài qián, niúròu jiǎozi yí ge bā kuài qián. Based on the information provided, use 比 to write complete sentences. Wǒ zuótiān wǎnshàng zhǐ chī le yì wǎn fàn, gēge chī le sān wǎn fàn. Based on the information provided, use 比 to write complete sentences. Yǒude rén bù xǐhuān rén duō de dìfāng, kuànián de shíhòu tāmen kěyǐ zuò shénme? Wéishénme tā juéde zài Táiběi kuànián shì zuì tèbié de jīngyàn?",
     "examples": [
      {
       "hz": "他比我高，可是跑得比我慢。",
       "vi": "Anh ấy cao hơn tôi, nhưng chạy chậm hơn tôi.",
       "py": "Tā bǐ wǒ gāo, kěshì pǎo de bǐ wǒ màn."
      },
      {
       "hz": "我弟弟說英文說得比我好。",
       "vi": "Em trai tôi nói tiếng Anh giỏi hơn tôi.",
       "py": "Wǒ dìdi shuō yīngwén shuō de bǐ wǒ hǎo."
      },
      {
       "hz": "我媽媽做菜比我爸爸做得好。",
       "vi": "Mẹ tôi nấu ăn ngon hơn bố tôi.",
       "py": "Wǒ māma zuòcài bǐ wǒ bàba zuòdehǎo."
      },
      {
       "hz": "我一分鐘寫二十個中國字，弟弟一分鐘只寫十個。",
       "vi": "Một phút tôi viết được hai mươi chữ Hán, em trai một phút chỉ viết được mười chữ.",
       "py": "Wǒ yìfēnzhōng xiě èrshígè Zhōngguó zì, dìdi yìfēnzhōng zhǐ xiě shígè."
      },
      {
       "hz": "豬肉餃子一個五塊錢，牛肉餃子一個八塊錢。",
       "vi": "Sủi cảo thịt lợn năm đồng một cái, sủi cảo thịt bò tám đồng một cái.",
       "py": "Zhūròu jiǎozi yígè wǔkuài qián, niúròu jiǎozi yígè bākuàiqián."
      },
      {
       "hz": "我昨天晚上只吃了一碗飯，哥哥吃了三碗飯。",
       "vi": "Tối qua tôi chỉ ăn một bát cơm, anh trai ăn ba bát.",
       "py": "Wǒ zuótiānwǎnshàng zhǐ chī le yìwǎn fàn, gēge chī le sānwǎn fàn."
      },
      {
       "hz": "每年的哪一天有跨年活動？",
       "vi": "Hoạt động đón năm mới diễn ra vào ngày nào mỗi năm?",
       "py": "Měinián de nǎyìtiān yǒu kuà nián huódòng?"
      },
      {
       "hz": "年輕人最喜歡參加什麼跨年活動？",
       "vi": "Giới trẻ thích tham gia hoạt động đón năm mới nào nhất?",
       "py": "Niánqīngrén zuì xǐhuān cānjiā shénme kuà nián huódòng?"
      },
      {
       "hz": "去跨年的人很多，交通的問題怎麼樣？",
       "vi": "Người đi đón năm mới rất đông, giao thông thế nào?",
       "py": "Qù kuà nián de rén hěnduō, jiāotōng de wèntí zěnmeyàng?"
      },
      {
       "hz": "有的人不喜歡人多的地方，跨年的時候他們可以做什麼？",
       "vi": "Có người không thích chỗ đông người, lúc đón năm mới họ có thể làm gì?",
       "py": "Yǒu de rén bù xǐhuān rén duō de dìfāng, kuà nián de shíhòu tāmen kěyǐ zuò shénme?"
      },
      {
       "hz": "為什麼他覺得在台北跨年是最特別的經驗？",
       "vi": "Tại sao anh ấy thấy đón năm mới ở Đài Bắc là trải nghiệm đặc biệt nhất?",
       "py": "Wèishénme tā juéde zài Táiběi kuà nián shì zuì tèbié de jīngyàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  }
 ],
 "td1-14.4": [
  {
   "title": "II. Time-Duration with Double 了",
   "points": [
    {
     "label": null,
     "formula": "When using double 了, it indicates that the action has lasted so far. This structure indicates that an action continues from the past until now. It means that the action will probably continue. Tā xué Zhōngwén xué le liǎng nián le, kěshì shuō de bú tài hǎo. Using the pattern “SV O，V了+ Time-duration +了” to describe the pictures below. Rúguǒ xiànzài shì wǎnshàng jiǔ diǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le? Táiběi Yīlíngyī zhēn yuǎn, wǒmen yǐjīng zuò le yí ge xiǎoshí de gōngchē le, háiméi dào. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Using the pattern “SV了+ Time-duration + 的 O了” to describe the pictures below. Rúguǒ kuànián de shíhòu bù xiǎng kàn yǎnchànghuì, hái yǒu shénme huódòng? Zài Yīngguó, kuànián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?",
     "examples": [
      {
       "hz": "我已經看書看了兩個小時了，想休息了。",
       "vi": "Tôi đã đọc sách được hai tiếng rồi, muốn nghỉ một lát.",
       "py": "Wǒ yǐjīng kànshū kàn le liǎnggè xiǎoshí le, xiǎng xiūxí le."
      },
      {
       "hz": "他學中文學了兩年了，可是說得不太好。",
       "vi": "Anh ấy đã học tiếng Trung được hai năm rồi, nhưng nói chưa giỏi lắm.",
       "py": "Tā xué zhōng wénxué le liǎngnián le, kěshì shuō de bútàihǎo."
      },
      {
       "hz": "媽媽和王太太聊天聊了一個小時了。",
       "vi": "Mẹ và bà Vương đã nói chuyện được một tiếng rồi.",
       "py": "Māma hàn Wáng tàitai liáotiān liáo le yígè xiǎoshí le."
      },
      {
       "hz": "如果現在是晚上九點，那麼他們做這些事做了多久了？",
       "vi": "Nếu bây giờ là chín giờ tối, thì họ đã làm những việc này được bao lâu rồi?",
       "py": "Rúguǒ xiànzài shì wǎnshàng jiǔdiǎn, nàme tāmen zuò zhèxiē shì zuò le duōjiǔ le?"
      },
      {
       "hz": "台北101真遠，我們已經坐了一個小時的公車了，還沒到。",
       "vi": "Taipei 101 xa thật, chúng ta đã đi xe buýt được một tiếng rồi mà vẫn chưa đến.",
       "py": "Táiběi 101 zhēn yuǎn, wǒmen yǐjīng zuò le yígè xiǎoshí de gōngchē le, hái méi dào."
      },
      {
       "hz": "老師教了一天的書了，現在一定很累吧？",
       "vi": "Cô giáo đã dạy cả một ngày rồi, bây giờ chắc mệt lắm nhỉ?",
       "py": "Lǎoshī jiào le yìtiān de shū le, xiànzài yídìng hěn lèi ba?"
      },
      {
       "hz": "A：台北的冬天常常下雨。 2. A：你的中文字寫得真漂亮！",
       "vi": "A: Mùa đông ở Đài Bắc hay mưa. A: Bạn viết chữ Hán đẹp thật!",
       "py": "A: Táiběi de dōngtiān chángcháng xiàyǔ. 2. A: Nǐ de zhōng wénzì xiě de zhēn piàoliàng!"
      },
      {
       "hz": "A：你先回去吧，我還想在這裡看書。",
       "vi": "A: Bạn về trước đi, tôi còn muốn đọc sách ở đây.",
       "py": "A: Nǐ xiānhuíqù ba, wǒ hái xiǎng zài zhèlǐ kànshū."
      },
      {
       "hz": "宜文家附近的環境怎麼樣？",
       "vi": "Môi trường quanh nhà Nghi Văn thế nào?",
       "py": "Yíwén jiā fùjìn de huánjìng zěnmeyàng?"
      },
      {
       "hz": "國安跟友美準備了什麼東西？老師呢？",
       "vi": "Quốc An và Yumi đã chuẩn bị những gì? Còn thầy giáo thì sao?",
       "py": "Guó'ān gēn Yǒuměi zhǔnbèi le shénme dōngxī? Lǎoshī ne?"
      },
      {
       "hz": "如果跨年的時候不想看演唱會，還有什麼活動？",
       "vi": "Nếu lúc đón năm mới không muốn xem hoà nhạc thì còn hoạt động gì khác?",
       "py": "Rúguǒ kuà nián de shíhòu bùxiǎng kàn yǎnchànghuì, háiyǒu shénme huódòng?"
      },
      {
       "hz": "在英國，跨年的時候，大家做什麼？在日本呢？",
       "vi": "Ở Anh, lúc đón năm mới mọi người làm gì? Còn ở Nhật thì sao?",
       "py": "Zài Yīngguó, kuà nián de shíhòu, dàjiā zuò shénme? Zài Rìběn ne?"
      },
      {
       "hz": "為什麼國安覺得今年的跨年活動很特別？",
       "vi": "Tại sao Quốc An thấy hoạt động đón năm mới năm nay rất đặc biệt?",
       "py": "Wèishénme Guó'ān juéde jīnnián de kuà nián huódòng hěn tèbié?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Thời lượng với hai chữ 了",
   "giaiThich": "Dùng hai 了 để nói hành động kéo dài TỪ TRƯỚC ĐẾN NAY và nhiều khả năng còn tiếp tục."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Answer the following questions. Answer the following questions.",
     "examples": [
      {
       "hz": "多了/得多。",
       "vi": "…hơn nhiều.",
       "py": "Duō le / de duō."
      },
      {
       "hz": "A：你哥哥比你高嗎？",
       "vi": "A: Anh trai bạn cao hơn bạn à?",
       "py": "A: Nǐ gēge bǐ nǐ gāo ma?"
      },
      {
       "hz": "B：不，我哥哥比我矮五公分。",
       "vi": "B: Không, anh trai tôi thấp hơn tôi năm phân.",
       "py": "B: Bù, wǒ gēge bǐ wǒ ǎi wǔ gōngfēn."
      },
      {
       "hz": "A：你覺得學中文難不難？",
       "vi": "A: Bạn thấy học tiếng Trung có khó không?",
       "py": "A: Nǐ juéde xué zhōngwén nán bùnán?"
      },
      {
       "hz": "B：我覺得學中文比學科學容易多了。",
       "vi": "B: Tôi thấy học tiếng Trung dễ hơn học khoa học nhiều.",
       "py": "B: Wǒ juéde xué zhōngwén bǐ xué kēxué róngyì duō le."
      },
      {
       "hz": "A：你為什麼不在學校的餐廳吃飯？",
       "vi": "A: Sao bạn không ăn ở căng tin trường?",
       "py": "A: Nǐ wèishénme bú zài xuéxiào de cāntīng chīfàn?"
      },
      {
       "hz": "B：我覺得外面的餐廳做的菜比學校的好吃。",
       "vi": "B: Tôi thấy đồ ăn nhà hàng bên ngoài nấu ngon hơn ở trường.",
       "py": "B: Wǒ juéde wàimiàn de cāntīng zuò de cài bǐ xuéxiào de hǎochī."
      },
      {
       "hz": "A：你喜歡喝咖啡還是茶？",
       "vi": "A: Bạn thích uống cà phê hay trà?",
       "py": "A: Nǐ xǐhuān hēkāfēi háishì chá?"
      },
      {
       "hz": "A：這個週末你想去打球，還是去看電影？",
       "vi": "A: Cuối tuần này bạn muốn đi chơi bóng hay đi xem phim?",
       "py": "A: Zhège zhōumò nǐ xiǎng qù dǎqiú, háishì qù kàn diànyǐng?"
      },
      {
       "hz": "A：為什麼你每天都做飯？",
       "vi": "A: Sao ngày nào bạn cũng nấu cơm?",
       "py": "A: Wèishénme nǐ měitiān dōu zuòfàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  },
  {
   "title": "I. 比 Serving as a Preposition",
   "points": [
    {
     "label": null,
     "formula": "This sentence structure is used to compare the differences between people, things or matters. A VS is needed after 比. The complement can also be an actual quantity and the differences.  得多 and 多 are used to emphasize the difference is big;  一點兒 is used to indicate that the differences is not significant. Wǒ yì fēnzhōng xiě èrshí ge Zhōngguó zì, dìdi yì fēnzhōng zhǐ xiě shí ge. Zhūròu jiǎozi yí ge wǔ kuài qián, niúròu jiǎozi yí ge bā kuài qián. Based on the information provided, use 比 to write complete sentences. Wǒ zuótiān wǎnshàng zhǐ chī le yì wǎn fàn, gēge chī le sān wǎn fàn. Based on the information provided, use 比 to write complete sentences. Yǒude rén bù xǐhuān rén duō de dìfāng, kuànián de shíhòu tāmen kěyǐ zuò shénme? Wéishénme tā juéde zài Táiběi kuànián shì zuì tèbié de jīngyàn?",
     "examples": [
      {
       "hz": "他比我高，可是跑得比我慢。",
       "vi": "Anh ấy cao hơn tôi, nhưng chạy chậm hơn tôi.",
       "py": "Tā bǐ wǒ gāo, kěshì pǎo de bǐ wǒ màn."
      },
      {
       "hz": "我弟弟說英文說得比我好。",
       "vi": "Em trai tôi nói tiếng Anh giỏi hơn tôi.",
       "py": "Wǒ dìdi shuō yīngwén shuō de bǐ wǒ hǎo."
      },
      {
       "hz": "我媽媽做菜比我爸爸做得好。",
       "vi": "Mẹ tôi nấu ăn ngon hơn bố tôi.",
       "py": "Wǒ māma zuòcài bǐ wǒ bàba zuòdehǎo."
      },
      {
       "hz": "我一分鐘寫二十個中國字，弟弟一分鐘只寫十個。",
       "vi": "Một phút tôi viết được hai mươi chữ Hán, em trai một phút chỉ viết được mười chữ.",
       "py": "Wǒ yìfēnzhōng xiě èrshígè Zhōngguó zì, dìdi yìfēnzhōng zhǐ xiě shígè."
      },
      {
       "hz": "豬肉餃子一個五塊錢，牛肉餃子一個八塊錢。",
       "vi": "Sủi cảo thịt lợn năm đồng một cái, sủi cảo thịt bò tám đồng một cái.",
       "py": "Zhūròu jiǎozi yígè wǔkuài qián, niúròu jiǎozi yígè bākuàiqián."
      },
      {
       "hz": "我昨天晚上只吃了一碗飯，哥哥吃了三碗飯。",
       "vi": "Tối qua tôi chỉ ăn một bát cơm, anh trai ăn ba bát.",
       "py": "Wǒ zuótiānwǎnshàng zhǐ chī le yìwǎn fàn, gēge chī le sānwǎn fàn."
      },
      {
       "hz": "每年的哪一天有跨年活動？",
       "vi": "Hoạt động đón năm mới diễn ra vào ngày nào mỗi năm?",
       "py": "Měinián de nǎyìtiān yǒu kuà nián huódòng?"
      },
      {
       "hz": "年輕人最喜歡參加什麼跨年活動？",
       "vi": "Giới trẻ thích tham gia hoạt động đón năm mới nào nhất?",
       "py": "Niánqīngrén zuì xǐhuān cānjiā shénme kuà nián huódòng?"
      },
      {
       "hz": "去跨年的人很多，交通的問題怎麼樣？",
       "vi": "Người đi đón năm mới rất đông, giao thông thế nào?",
       "py": "Qù kuà nián de rén hěnduō, jiāotōng de wèntí zěnmeyàng?"
      },
      {
       "hz": "有的人不喜歡人多的地方，跨年的時候他們可以做什麼？",
       "vi": "Có người không thích chỗ đông người, lúc đón năm mới họ có thể làm gì?",
       "py": "Yǒu de rén bù xǐhuān rén duō de dìfāng, kuà nián de shíhòu tāmen kěyǐ zuò shénme?"
      },
      {
       "hz": "為什麼他覺得在台北跨年是最特別的經驗？",
       "vi": "Tại sao anh ấy thấy đón năm mới ở Đài Bắc là trải nghiệm đặc biệt nhất?",
       "py": "Wèishénme tā juéde zài Táiběi kuà nián shì zuì tèbié de jīngyàn?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "比 làm giới từ (so sánh)",
   "giaiThich": "Mẫu A 比 B + tính từ để so sánh; sau 比 bắt buộc có tính từ. Có thể thêm số lượng cụ thể để nói hơn kém bao nhiêu; 得多 / 多 dùng để nhấn mạnh chênh lệch lớn."
  }
 ],
 "td1-15.1": [
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle 著 is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. Hěn duō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn.",
     "examples": [
      {
       "hz": "窗戶外面的風景。",
       "vi": "Phong cảnh bên ngoài cửa sổ.",
       "py": "Chuānghù wàimiàn de fēngjǐng."
      },
      {
       "hz": "他看著窗戶外面，想著他的女朋友。",
       "vi": "Anh ấy nhìn ra ngoài cửa sổ, nghĩ về bạn gái.",
       "py": "Tā kàn zhe chuānghù wàimiàn, xiǎng zhe tā de nǚpéngyǒu."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "很多人在那裡唱著歌，跳著舞，大家都很開心。",
       "vi": "Nhiều người ở đó vừa hát vừa nhảy, ai cũng rất vui.",
       "py": "Hěnduō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "還不想寫功課。",
       "vi": "Vẫn chưa muốn làm bài tập.",
       "py": "Hái bùxiǎng xiě gōngkè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. B. “V著” indicates a request to maintain a certain action. Nǐmen                                   wǒ yào shuō de shìqíng fēicháng zhòngyào.",
     "examples": [
      {
       "hz": "不要看書。",
       "vi": "Đừng đọc sách.",
       "py": "Búyào kànshū."
      },
      {
       "hz": "大家聽著，明天一定要準時到。",
       "vi": "Mọi người nghe này, ngày mai nhất định phải đến đúng giờ.",
       "py": "Dàjiā tīng zhe, míngtiān yídìng yào zhǔnshí dào."
      },
      {
       "hz": "你在這裡等著，他們馬上就來了。",
       "vi": "Bạn cứ đợi ở đây, họ sẽ đến ngay.",
       "py": "Nǐ zài zhèlǐ děng zhe, tāmen mǎshàng jiù lái le."
      },
      {
       "hz": "你看著我，剛才你說的是真的嗎？",
       "vi": "Bạn nhìn tôi này, điều bạn vừa nói là thật à?",
       "py": "Nǐ kàn zhe wǒ, gāngcái nǐ shuō de shì zhēnde ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. Describe the pictures with “V 著” or “V 著 (Nu-M-) N”.",
     "examples": [
      {
       "hz": "一件藍色的褲子。",
       "vi": "Một chiếc quần màu xanh lam.",
       "py": "Yījiàn lánsè de kùzi."
      },
      {
       "hz": "在公車上有的人坐著，有的人站著。",
       "vi": "Trên xe buýt, có người ngồi, có người đứng.",
       "py": "Zài gōngchēshàng yǒu de rén zuò zhe, yǒu de rén zhàn zhe."
      },
      {
       "hz": "他戴著媽媽送他的新錶。",
       "vi": "Anh ấy đang đeo chiếc đồng hồ mới mẹ tặng.",
       "py": "Tā dài zhe māma sòng tā de xīn biǎo."
      },
      {
       "hz": "桌上放(fàng)著好多甜點，是誰買的？",
       "vi": "Trên bàn bày rất nhiều bánh ngọt, ai mua vậy?",
       "py": "Zhuōshàng fàng zhe hǎoduō tiándiǎn, shì shéi mǎi de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. B. “V 著” is used before another verb to indicate its continuation while the second verb (the main action) is taking place. Tā yí jìn jiàoshì,        kàndào le shénme hěn yǒuqù de dōngxi? Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?",
     "examples": [
      {
       "hz": "我們關著門上課。",
       "vi": "Chúng tôi đóng cửa học.",
       "py": "Wǒmen guān zhe mén shàngkè."
      },
      {
       "hz": "他帶著太太跟孩子去看電影。",
       "vi": "Anh ấy dẫn vợ con đi xem phim.",
       "py": "Tā dài zhe tàitai gēn háizi qù kàn diànyǐng."
      },
      {
       "hz": "他們戴著眼鏡看書。",
       "vi": "Họ đeo kính đọc sách.",
       "py": "Tāmen dài zhe yǎnjìng kànshū."
      },
      {
       "hz": "A：你開著燈睡覺還是關著燈睡覺？",
       "vi": "A: Bạn bật đèn đi ngủ hay tắt đèn đi ngủ?",
       "py": "A: Nǐ kāi zhe dēng shuìjiào háishì guān zhe dēng shuìjiào?"
      },
      {
       "hz": "A：他們帶著花跟水果去哪裡？",
       "vi": "A: Họ mang hoa và trái cây đi đâu?",
       "py": "A: Tāmen dài zhe huā gēn shuǐguǒ qù nǎlǐ?"
      },
      {
       "hz": "A：他們都坐著看電視嗎？",
       "vi": "A: Họ đều ngồi xem tivi à?",
       "py": "A: Tāmen dōu zuò zhe kàndiànshì ma?"
      },
      {
       "hz": "他一進教室，看到了什麼很有趣的東西？",
       "vi": "Vừa vào lớp, anh ấy thấy thứ gì rất thú vị?",
       "py": "Tā yí jìn jiàoshì, kàndào le shénme hěn yǒuqù de dōngxī?"
      },
      {
       "hz": "請你說說十二生肖比賽。",
       "vi": "Bạn hãy kể về cuộc đua của mười hai con giáp.",
       "py": "Qǐng nǐ shuō shuō shí'èrshēngxiào bǐsài."
      },
      {
       "hz": "如果你想知道別人的生肖，你可以怎麼問？",
       "vi": "Nếu muốn biết người khác tuổi con gì, bạn có thể hỏi thế nào?",
       "py": "Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?"
      },
      {
       "hz": "元宵節的時候，什麼東西會很受歡迎？",
       "vi": "Vào dịp Tết Nguyên Tiêu, thứ gì sẽ rất được ưa chuộng?",
       "py": "Yuánxiāojié de shíhòu, shénme dōngxī huì hěn shòuhuānyíng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  }
 ],
 "td1-15.2": [
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle 著 is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. Hěn duō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn.",
     "examples": [
      {
       "hz": "窗戶外面的風景。",
       "vi": "Phong cảnh bên ngoài cửa sổ.",
       "py": "Chuānghù wàimiàn de fēngjǐng."
      },
      {
       "hz": "他看著窗戶外面，想著他的女朋友。",
       "vi": "Anh ấy nhìn ra ngoài cửa sổ, nghĩ về bạn gái.",
       "py": "Tā kàn zhe chuānghù wàimiàn, xiǎng zhe tā de nǚpéngyǒu."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "很多人在那裡唱著歌，跳著舞，大家都很開心。",
       "vi": "Nhiều người ở đó vừa hát vừa nhảy, ai cũng rất vui.",
       "py": "Hěnduō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "還不想寫功課。",
       "vi": "Vẫn chưa muốn làm bài tập.",
       "py": "Hái bùxiǎng xiě gōngkè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. B. “V著” indicates a request to maintain a certain action. Nǐmen                                   wǒ yào shuō de shìqíng fēicháng zhòngyào.",
     "examples": [
      {
       "hz": "不要看書。",
       "vi": "Đừng đọc sách.",
       "py": "Búyào kànshū."
      },
      {
       "hz": "大家聽著，明天一定要準時到。",
       "vi": "Mọi người nghe này, ngày mai nhất định phải đến đúng giờ.",
       "py": "Dàjiā tīng zhe, míngtiān yídìng yào zhǔnshí dào."
      },
      {
       "hz": "你在這裡等著，他們馬上就來了。",
       "vi": "Bạn cứ đợi ở đây, họ sẽ đến ngay.",
       "py": "Nǐ zài zhèlǐ děng zhe, tāmen mǎshàng jiù lái le."
      },
      {
       "hz": "你看著我，剛才你說的是真的嗎？",
       "vi": "Bạn nhìn tôi này, điều bạn vừa nói là thật à?",
       "py": "Nǐ kàn zhe wǒ, gāngcái nǐ shuō de shì zhēnde ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. Describe the pictures with “V 著” or “V 著 (Nu-M-) N”.",
     "examples": [
      {
       "hz": "一件藍色的褲子。",
       "vi": "Một chiếc quần màu xanh lam.",
       "py": "Yījiàn lánsè de kùzi."
      },
      {
       "hz": "在公車上有的人坐著，有的人站著。",
       "vi": "Trên xe buýt, có người ngồi, có người đứng.",
       "py": "Zài gōngchēshàng yǒu de rén zuò zhe, yǒu de rén zhàn zhe."
      },
      {
       "hz": "他戴著媽媽送他的新錶。",
       "vi": "Anh ấy đang đeo chiếc đồng hồ mới mẹ tặng.",
       "py": "Tā dài zhe māma sòng tā de xīn biǎo."
      },
      {
       "hz": "桌上放(fàng)著好多甜點，是誰買的？",
       "vi": "Trên bàn bày rất nhiều bánh ngọt, ai mua vậy?",
       "py": "Zhuōshàng fàng zhe hǎoduō tiándiǎn, shì shéi mǎi de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. B. “V 著” is used before another verb to indicate its continuation while the second verb (the main action) is taking place. Tā yí jìn jiàoshì,        kàndào le shénme hěn yǒuqù de dōngxi? Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?",
     "examples": [
      {
       "hz": "我們關著門上課。",
       "vi": "Chúng tôi đóng cửa học.",
       "py": "Wǒmen guān zhe mén shàngkè."
      },
      {
       "hz": "他帶著太太跟孩子去看電影。",
       "vi": "Anh ấy dẫn vợ con đi xem phim.",
       "py": "Tā dài zhe tàitai gēn háizi qù kàn diànyǐng."
      },
      {
       "hz": "他們戴著眼鏡看書。",
       "vi": "Họ đeo kính đọc sách.",
       "py": "Tāmen dài zhe yǎnjìng kànshū."
      },
      {
       "hz": "A：你開著燈睡覺還是關著燈睡覺？",
       "vi": "A: Bạn bật đèn đi ngủ hay tắt đèn đi ngủ?",
       "py": "A: Nǐ kāi zhe dēng shuìjiào háishì guān zhe dēng shuìjiào?"
      },
      {
       "hz": "A：他們帶著花跟水果去哪裡？",
       "vi": "A: Họ mang hoa và trái cây đi đâu?",
       "py": "A: Tāmen dài zhe huā gēn shuǐguǒ qù nǎlǐ?"
      },
      {
       "hz": "A：他們都坐著看電視嗎？",
       "vi": "A: Họ đều ngồi xem tivi à?",
       "py": "A: Tāmen dōu zuò zhe kàndiànshì ma?"
      },
      {
       "hz": "他一進教室，看到了什麼很有趣的東西？",
       "vi": "Vừa vào lớp, anh ấy thấy thứ gì rất thú vị?",
       "py": "Tā yí jìn jiàoshì, kàndào le shénme hěn yǒuqù de dōngxī?"
      },
      {
       "hz": "請你說說十二生肖比賽。",
       "vi": "Bạn hãy kể về cuộc đua của mười hai con giáp.",
       "py": "Qǐng nǐ shuō shuō shí'èrshēngxiào bǐsài."
      },
      {
       "hz": "如果你想知道別人的生肖，你可以怎麼問？",
       "vi": "Nếu muốn biết người khác tuổi con gì, bạn có thể hỏi thế nào?",
       "py": "Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?"
      },
      {
       "hz": "元宵節的時候，什麼東西會很受歡迎？",
       "vi": "Vào dịp Tết Nguyên Tiêu, thứ gì sẽ rất được ưa chuộng?",
       "py": "Yuánxiāojié de shíhòu, shénme dōngxī huì hěn shòuhuānyíng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  }
 ],
 "td1-15.3": [
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle 著 is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. Hěn duō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn.",
     "examples": [
      {
       "hz": "窗戶外面的風景。",
       "vi": "Phong cảnh bên ngoài cửa sổ.",
       "py": "Chuānghù wàimiàn de fēngjǐng."
      },
      {
       "hz": "他看著窗戶外面，想著他的女朋友。",
       "vi": "Anh ấy nhìn ra ngoài cửa sổ, nghĩ về bạn gái.",
       "py": "Tā kàn zhe chuānghù wàimiàn, xiǎng zhe tā de nǚpéngyǒu."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "很多人在那裡唱著歌，跳著舞，大家都很開心。",
       "vi": "Nhiều người ở đó vừa hát vừa nhảy, ai cũng rất vui.",
       "py": "Hěnduō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "還不想寫功課。",
       "vi": "Vẫn chưa muốn làm bài tập.",
       "py": "Hái bùxiǎng xiě gōngkè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. B. “V著” indicates a request to maintain a certain action. Nǐmen                                   wǒ yào shuō de shìqíng fēicháng zhòngyào.",
     "examples": [
      {
       "hz": "不要看書。",
       "vi": "Đừng đọc sách.",
       "py": "Búyào kànshū."
      },
      {
       "hz": "大家聽著，明天一定要準時到。",
       "vi": "Mọi người nghe này, ngày mai nhất định phải đến đúng giờ.",
       "py": "Dàjiā tīng zhe, míngtiān yídìng yào zhǔnshí dào."
      },
      {
       "hz": "你在這裡等著，他們馬上就來了。",
       "vi": "Bạn cứ đợi ở đây, họ sẽ đến ngay.",
       "py": "Nǐ zài zhèlǐ děng zhe, tāmen mǎshàng jiù lái le."
      },
      {
       "hz": "你看著我，剛才你說的是真的嗎？",
       "vi": "Bạn nhìn tôi này, điều bạn vừa nói là thật à?",
       "py": "Nǐ kàn zhe wǒ, gāngcái nǐ shuō de shì zhēnde ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. Describe the pictures with “V 著” or “V 著 (Nu-M-) N”.",
     "examples": [
      {
       "hz": "一件藍色的褲子。",
       "vi": "Một chiếc quần màu xanh lam.",
       "py": "Yījiàn lánsè de kùzi."
      },
      {
       "hz": "在公車上有的人坐著，有的人站著。",
       "vi": "Trên xe buýt, có người ngồi, có người đứng.",
       "py": "Zài gōngchēshàng yǒu de rén zuò zhe, yǒu de rén zhàn zhe."
      },
      {
       "hz": "他戴著媽媽送他的新錶。",
       "vi": "Anh ấy đang đeo chiếc đồng hồ mới mẹ tặng.",
       "py": "Tā dài zhe māma sòng tā de xīn biǎo."
      },
      {
       "hz": "桌上放(fàng)著好多甜點，是誰買的？",
       "vi": "Trên bàn bày rất nhiều bánh ngọt, ai mua vậy?",
       "py": "Zhuōshàng fàng zhe hǎoduō tiándiǎn, shì shéi mǎi de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. B. “V 著” is used before another verb to indicate its continuation while the second verb (the main action) is taking place. Tā yí jìn jiàoshì,        kàndào le shénme hěn yǒuqù de dōngxi? Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?",
     "examples": [
      {
       "hz": "我們關著門上課。",
       "vi": "Chúng tôi đóng cửa học.",
       "py": "Wǒmen guān zhe mén shàngkè."
      },
      {
       "hz": "他帶著太太跟孩子去看電影。",
       "vi": "Anh ấy dẫn vợ con đi xem phim.",
       "py": "Tā dài zhe tàitai gēn háizi qù kàn diànyǐng."
      },
      {
       "hz": "他們戴著眼鏡看書。",
       "vi": "Họ đeo kính đọc sách.",
       "py": "Tāmen dài zhe yǎnjìng kànshū."
      },
      {
       "hz": "A：你開著燈睡覺還是關著燈睡覺？",
       "vi": "A: Bạn bật đèn đi ngủ hay tắt đèn đi ngủ?",
       "py": "A: Nǐ kāi zhe dēng shuìjiào háishì guān zhe dēng shuìjiào?"
      },
      {
       "hz": "A：他們帶著花跟水果去哪裡？",
       "vi": "A: Họ mang hoa và trái cây đi đâu?",
       "py": "A: Tāmen dài zhe huā gēn shuǐguǒ qù nǎlǐ?"
      },
      {
       "hz": "A：他們都坐著看電視嗎？",
       "vi": "A: Họ đều ngồi xem tivi à?",
       "py": "A: Tāmen dōu zuò zhe kàndiànshì ma?"
      },
      {
       "hz": "他一進教室，看到了什麼很有趣的東西？",
       "vi": "Vừa vào lớp, anh ấy thấy thứ gì rất thú vị?",
       "py": "Tā yí jìn jiàoshì, kàndào le shénme hěn yǒuqù de dōngxī?"
      },
      {
       "hz": "請你說說十二生肖比賽。",
       "vi": "Bạn hãy kể về cuộc đua của mười hai con giáp.",
       "py": "Qǐng nǐ shuō shuō shí'èrshēngxiào bǐsài."
      },
      {
       "hz": "如果你想知道別人的生肖，你可以怎麼問？",
       "vi": "Nếu muốn biết người khác tuổi con gì, bạn có thể hỏi thế nào?",
       "py": "Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?"
      },
      {
       "hz": "元宵節的時候，什麼東西會很受歡迎？",
       "vi": "Vào dịp Tết Nguyên Tiêu, thứ gì sẽ rất được ưa chuộng?",
       "py": "Yuánxiāojié de shíhòu, shénme dōngxī huì hěn shòuhuānyíng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  }
 ],
 "td1-15.4": [
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle 著 is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. Hěn duō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn.",
     "examples": [
      {
       "hz": "窗戶外面的風景。",
       "vi": "Phong cảnh bên ngoài cửa sổ.",
       "py": "Chuānghù wàimiàn de fēngjǐng."
      },
      {
       "hz": "他看著窗戶外面，想著他的女朋友。",
       "vi": "Anh ấy nhìn ra ngoài cửa sổ, nghĩ về bạn gái.",
       "py": "Tā kàn zhe chuānghù wàimiàn, xiǎng zhe tā de nǚpéngyǒu."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "很多人在那裡唱著歌，跳著舞，大家都很開心。",
       "vi": "Nhiều người ở đó vừa hát vừa nhảy, ai cũng rất vui.",
       "py": "Hěnduō rén zài nàlǐ chàng zhe gē, tiào zhe wǔ, dàjiā dōu hěn kāixīn."
      },
      {
       "hz": "他在門口等著你，你快去找他吧。",
       "vi": "Anh ấy đang đợi bạn ở cửa, bạn mau ra gặp anh ấy đi.",
       "py": "Tā zài ménkǒu děng zhe nǐ, nǐ kuài qù zhǎo tā ba."
      },
      {
       "hz": "還不想寫功課。",
       "vi": "Vẫn chưa muốn làm bài tập.",
       "py": "Hái bùxiǎng xiě gōngkè."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. “V 著” indicates the continuation of an action. B. “V著” indicates a request to maintain a certain action. Nǐmen                                   wǒ yào shuō de shìqíng fēicháng zhòngyào.",
     "examples": [
      {
       "hz": "不要看書。",
       "vi": "Đừng đọc sách.",
       "py": "Búyào kànshū."
      },
      {
       "hz": "大家聽著，明天一定要準時到。",
       "vi": "Mọi người nghe này, ngày mai nhất định phải đến đúng giờ.",
       "py": "Dàjiā tīng zhe, míngtiān yídìng yào zhǔnshí dào."
      },
      {
       "hz": "你在這裡等著，他們馬上就來了。",
       "vi": "Bạn cứ đợi ở đây, họ sẽ đến ngay.",
       "py": "Nǐ zài zhèlǐ děng zhe, tāmen mǎshàng jiù lái le."
      },
      {
       "hz": "你看著我，剛才你說的是真的嗎？",
       "vi": "Bạn nhìn tôi này, điều bạn vừa nói là thật à?",
       "py": "Nǐ kàn zhe wǒ, gāngcái nǐ shuō de shì zhēnde ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. Describe the pictures with “V 著” or “V 著 (Nu-M-) N”.",
     "examples": [
      {
       "hz": "一件藍色的褲子。",
       "vi": "Một chiếc quần màu xanh lam.",
       "py": "Yījiàn lánsè de kùzi."
      },
      {
       "hz": "在公車上有的人坐著，有的人站著。",
       "vi": "Trên xe buýt, có người ngồi, có người đứng.",
       "py": "Zài gōngchēshàng yǒu de rén zuò zhe, yǒu de rén zhàn zhe."
      },
      {
       "hz": "他戴著媽媽送他的新錶。",
       "vi": "Anh ấy đang đeo chiếc đồng hồ mới mẹ tặng.",
       "py": "Tā dài zhe māma sòng tā de xīn biǎo."
      },
      {
       "hz": "桌上放(fàng)著好多甜點，是誰買的？",
       "vi": "Trên bàn bày rất nhiều bánh ngọt, ai mua vậy?",
       "py": "Zhuōshàng fàng zhe hǎoduō tiándiǎn, shì shéi mǎi de?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  },
  {
   "title": "I. V 著",
   "points": [
    {
     "label": null,
     "formula": "The particle “著” is placed directly after a verb to indicate the continuation of an action or a state. (2) “V 著” indicates the continuation of a state. B. “V 著” is used before another verb to indicate its continuation while the second verb (the main action) is taking place. Tā yí jìn jiàoshì,        kàndào le shénme hěn yǒuqù de dōngxi? Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?",
     "examples": [
      {
       "hz": "我們關著門上課。",
       "vi": "Chúng tôi đóng cửa học.",
       "py": "Wǒmen guān zhe mén shàngkè."
      },
      {
       "hz": "他帶著太太跟孩子去看電影。",
       "vi": "Anh ấy dẫn vợ con đi xem phim.",
       "py": "Tā dài zhe tàitai gēn háizi qù kàn diànyǐng."
      },
      {
       "hz": "他們戴著眼鏡看書。",
       "vi": "Họ đeo kính đọc sách.",
       "py": "Tāmen dài zhe yǎnjìng kànshū."
      },
      {
       "hz": "A：你開著燈睡覺還是關著燈睡覺？",
       "vi": "A: Bạn bật đèn đi ngủ hay tắt đèn đi ngủ?",
       "py": "A: Nǐ kāi zhe dēng shuìjiào háishì guān zhe dēng shuìjiào?"
      },
      {
       "hz": "A：他們帶著花跟水果去哪裡？",
       "vi": "A: Họ mang hoa và trái cây đi đâu?",
       "py": "A: Tāmen dài zhe huā gēn shuǐguǒ qù nǎlǐ?"
      },
      {
       "hz": "A：他們都坐著看電視嗎？",
       "vi": "A: Họ đều ngồi xem tivi à?",
       "py": "A: Tāmen dōu zuò zhe kàndiànshì ma?"
      },
      {
       "hz": "他一進教室，看到了什麼很有趣的東西？",
       "vi": "Vừa vào lớp, anh ấy thấy thứ gì rất thú vị?",
       "py": "Tā yí jìn jiàoshì, kàndào le shénme hěn yǒuqù de dōngxī?"
      },
      {
       "hz": "請你說說十二生肖比賽。",
       "vi": "Bạn hãy kể về cuộc đua của mười hai con giáp.",
       "py": "Qǐng nǐ shuō shuō shí'èrshēngxiào bǐsài."
      },
      {
       "hz": "如果你想知道別人的生肖，你可以怎麼問？",
       "vi": "Nếu muốn biết người khác tuổi con gì, bạn có thể hỏi thế nào?",
       "py": "Rúguǒ nǐ xiǎng zhīdào biérén de shēngxiào, nǐ kěyǐ zěnme wèn?"
      },
      {
       "hz": "元宵節的時候，什麼東西會很受歡迎？",
       "vi": "Vào dịp Tết Nguyên Tiêu, thứ gì sẽ rất được ưa chuộng?",
       "py": "Yuánxiāojié de shíhòu, shénme dōngxī huì hěn shòuhuānyíng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 著 — trạng thái tiếp diễn",
   "giaiThich": "著 đặt ngay sau động từ để chỉ hành động hoặc trạng thái đang duy trì."
  }
 ],
 "td1-16.1": [
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén le.",
     "examples": [
      {
       "hz": "就睡覺了。",
       "vi": "…là đi ngủ.",
       "py": "Jiù shuìjiào le."
      },
      {
       "hz": "a.媽媽昨天到了家，就去準備晚飯了。",
       "vi": "a. Hôm qua mẹ về đến nhà là đi chuẩn bị bữa tối.",
       "py": "A. Māma zuótiān dào le jiā, jiù qù zhǔnbèi wǎnfàn le."
      },
      {
       "hz": "a.他上個月放了假，就去旅行了。",
       "vi": "a. Tháng trước được nghỉ là anh ấy đi du lịch.",
       "py": "A. Tā shànggèyuè fàng le jiǎ, jiù qù lǚxíng le."
      },
      {
       "hz": "a.昨天我下了課，就跟語言交換的朋友練習說中文了。",
       "vi": "a. Hôm qua tan học xong là tôi luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "A. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Měi cì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén.",
     "examples": [
      {
       "hz": "b.媽媽每天到了家，就去準備晚飯。",
       "vi": "b. Ngày nào mẹ về đến nhà cũng đi chuẩn bị bữa tối.",
       "py": "B. Māma měitiān dào le jiā, jiù qù zhǔnbèi wǎnfàn."
      },
      {
       "hz": "b.他每次放了假，就去旅行。",
       "vi": "b. Lần nào được nghỉ anh ấy cũng đi du lịch.",
       "py": "B. Tā měicì fàng le jiǎ, jiù qù lǚxíng."
      },
      {
       "hz": "b.每次我下了課，就跟語言交換的朋友練習說中文。",
       "vi": "b. Lần nào tan học tôi cũng luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "B. Měicì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén. Completed the following sentences. Completed the following sentences. Táiwān cóng běi dào nán yǒu jǐ gōnglǐ? Bǐ nǎ ge guójiā xiǎo yìdiǎnr ？ Táiwān nǎ ge chéngshì zuì yǒumíng? Nà ge chéngshì de jiāotōng zěnmeyàng?",
     "examples": [
      {
       "hz": "就要睡覺。",
       "vi": "…là sẽ đi ngủ.",
       "py": "Jiùyào shuìjiào."
      },
      {
       "hz": "c.媽媽今天晚上到了家，就要準備晚飯。",
       "vi": "c. Tối nay mẹ về đến nhà là sẽ chuẩn bị bữa tối.",
       "py": "C. Māma jīntiān wǎnshàng dào le jiā, jiùyào zhǔnbèi wǎnfàn."
      },
      {
       "hz": "c.他下個月放了假，就要去旅行。",
       "vi": "c. Tháng sau được nghỉ là anh ấy sẽ đi du lịch.",
       "py": "C. Tā xiàgèyuè fàng le jiǎ, jiùyào qù lǚxíng."
      },
      {
       "hz": "c.明天我下了課，就要跟語言交換的朋友練習說中文。",
       "vi": "c. Ngày mai tan học xong là tôi sẽ luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "C. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      },
      {
       "hz": "台灣的四邊有什麼？西邊和南邊呢？",
       "vi": "Bốn phía Đài Loan có gì? Phía tây và phía nam thì sao?",
       "py": "Táiwān de sìbiān yǒu shénme? Xībiān hàn nánbiān ne?"
      },
      {
       "hz": "台灣從北到南有幾公里？比哪個國家小一點兒？",
       "vi": "Đài Loan từ bắc xuống nam dài bao nhiêu cây số? Nhỏ hơn nước nào một chút?",
       "py": "Táiwān cóng běi dào nán yǒu jǐgōnglǐ? Bǐ nǎge guójiā xiǎo yìdiǎn'ér?"
      },
      {
       "hz": "台灣哪個城市最有名？那個城市的交通怎麼樣？",
       "vi": "Thành phố nào của Đài Loan nổi tiếng nhất? Giao thông ở thành phố đó thế nào?",
       "py": "Táiwān nǎge chéngshì zuì yǒumíng? Nàge chéngshì de jiāotōng zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  }
 ],
 "td1-16.2": [
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén le.",
     "examples": [
      {
       "hz": "就睡覺了。",
       "vi": "…là đi ngủ.",
       "py": "Jiù shuìjiào le."
      },
      {
       "hz": "a.媽媽昨天到了家，就去準備晚飯了。",
       "vi": "a. Hôm qua mẹ về đến nhà là đi chuẩn bị bữa tối.",
       "py": "A. Māma zuótiān dào le jiā, jiù qù zhǔnbèi wǎnfàn le."
      },
      {
       "hz": "a.他上個月放了假，就去旅行了。",
       "vi": "a. Tháng trước được nghỉ là anh ấy đi du lịch.",
       "py": "A. Tā shànggèyuè fàng le jiǎ, jiù qù lǚxíng le."
      },
      {
       "hz": "a.昨天我下了課，就跟語言交換的朋友練習說中文了。",
       "vi": "a. Hôm qua tan học xong là tôi luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "A. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Měi cì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén.",
     "examples": [
      {
       "hz": "b.媽媽每天到了家，就去準備晚飯。",
       "vi": "b. Ngày nào mẹ về đến nhà cũng đi chuẩn bị bữa tối.",
       "py": "B. Māma měitiān dào le jiā, jiù qù zhǔnbèi wǎnfàn."
      },
      {
       "hz": "b.他每次放了假，就去旅行。",
       "vi": "b. Lần nào được nghỉ anh ấy cũng đi du lịch.",
       "py": "B. Tā měicì fàng le jiǎ, jiù qù lǚxíng."
      },
      {
       "hz": "b.每次我下了課，就跟語言交換的朋友練習說中文。",
       "vi": "b. Lần nào tan học tôi cũng luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "B. Měicì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén. Completed the following sentences. Completed the following sentences. Táiwān cóng běi dào nán yǒu jǐ gōnglǐ? Bǐ nǎ ge guójiā xiǎo yìdiǎnr ？ Táiwān nǎ ge chéngshì zuì yǒumíng? Nà ge chéngshì de jiāotōng zěnmeyàng?",
     "examples": [
      {
       "hz": "就要睡覺。",
       "vi": "…là sẽ đi ngủ.",
       "py": "Jiùyào shuìjiào."
      },
      {
       "hz": "c.媽媽今天晚上到了家，就要準備晚飯。",
       "vi": "c. Tối nay mẹ về đến nhà là sẽ chuẩn bị bữa tối.",
       "py": "C. Māma jīntiān wǎnshàng dào le jiā, jiùyào zhǔnbèi wǎnfàn."
      },
      {
       "hz": "c.他下個月放了假，就要去旅行。",
       "vi": "c. Tháng sau được nghỉ là anh ấy sẽ đi du lịch.",
       "py": "C. Tā xiàgèyuè fàng le jiǎ, jiùyào qù lǚxíng."
      },
      {
       "hz": "c.明天我下了課，就要跟語言交換的朋友練習說中文。",
       "vi": "c. Ngày mai tan học xong là tôi sẽ luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "C. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      },
      {
       "hz": "台灣的四邊有什麼？西邊和南邊呢？",
       "vi": "Bốn phía Đài Loan có gì? Phía tây và phía nam thì sao?",
       "py": "Táiwān de sìbiān yǒu shénme? Xībiān hàn nánbiān ne?"
      },
      {
       "hz": "台灣從北到南有幾公里？比哪個國家小一點兒？",
       "vi": "Đài Loan từ bắc xuống nam dài bao nhiêu cây số? Nhỏ hơn nước nào một chút?",
       "py": "Táiwān cóng běi dào nán yǒu jǐgōnglǐ? Bǐ nǎge guójiā xiǎo yìdiǎn'ér?"
      },
      {
       "hz": "台灣哪個城市最有名？那個城市的交通怎麼樣？",
       "vi": "Thành phố nào của Đài Loan nổi tiếng nhất? Giao thông ở thành phố đó thế nào?",
       "py": "Táiwān nǎge chéngshì zuì yǒumíng? Nàge chéngshì de jiāotōng zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  }
 ],
 "td1-16.3": [
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén le.",
     "examples": [
      {
       "hz": "就睡覺了。",
       "vi": "…là đi ngủ.",
       "py": "Jiù shuìjiào le."
      },
      {
       "hz": "a.媽媽昨天到了家，就去準備晚飯了。",
       "vi": "a. Hôm qua mẹ về đến nhà là đi chuẩn bị bữa tối.",
       "py": "A. Māma zuótiān dào le jiā, jiù qù zhǔnbèi wǎnfàn le."
      },
      {
       "hz": "a.他上個月放了假，就去旅行了。",
       "vi": "a. Tháng trước được nghỉ là anh ấy đi du lịch.",
       "py": "A. Tā shànggèyuè fàng le jiǎ, jiù qù lǚxíng le."
      },
      {
       "hz": "a.昨天我下了課，就跟語言交換的朋友練習說中文了。",
       "vi": "a. Hôm qua tan học xong là tôi luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "A. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Měi cì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén.",
     "examples": [
      {
       "hz": "b.媽媽每天到了家，就去準備晚飯。",
       "vi": "b. Ngày nào mẹ về đến nhà cũng đi chuẩn bị bữa tối.",
       "py": "B. Māma měitiān dào le jiā, jiù qù zhǔnbèi wǎnfàn."
      },
      {
       "hz": "b.他每次放了假，就去旅行。",
       "vi": "b. Lần nào được nghỉ anh ấy cũng đi du lịch.",
       "py": "B. Tā měicì fàng le jiǎ, jiù qù lǚxíng."
      },
      {
       "hz": "b.每次我下了課，就跟語言交換的朋友練習說中文。",
       "vi": "b. Lần nào tan học tôi cũng luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "B. Měicì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén. Completed the following sentences. Completed the following sentences. Táiwān cóng běi dào nán yǒu jǐ gōnglǐ? Bǐ nǎ ge guójiā xiǎo yìdiǎnr ？ Táiwān nǎ ge chéngshì zuì yǒumíng? Nà ge chéngshì de jiāotōng zěnmeyàng?",
     "examples": [
      {
       "hz": "就要睡覺。",
       "vi": "…là sẽ đi ngủ.",
       "py": "Jiùyào shuìjiào."
      },
      {
       "hz": "c.媽媽今天晚上到了家，就要準備晚飯。",
       "vi": "c. Tối nay mẹ về đến nhà là sẽ chuẩn bị bữa tối.",
       "py": "C. Māma jīntiān wǎnshàng dào le jiā, jiùyào zhǔnbèi wǎnfàn."
      },
      {
       "hz": "c.他下個月放了假，就要去旅行。",
       "vi": "c. Tháng sau được nghỉ là anh ấy sẽ đi du lịch.",
       "py": "C. Tā xiàgèyuè fàng le jiǎ, jiùyào qù lǚxíng."
      },
      {
       "hz": "c.明天我下了課，就要跟語言交換的朋友練習說中文。",
       "vi": "c. Ngày mai tan học xong là tôi sẽ luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "C. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      },
      {
       "hz": "台灣的四邊有什麼？西邊和南邊呢？",
       "vi": "Bốn phía Đài Loan có gì? Phía tây và phía nam thì sao?",
       "py": "Táiwān de sìbiān yǒu shénme? Xībiān hàn nánbiān ne?"
      },
      {
       "hz": "台灣從北到南有幾公里？比哪個國家小一點兒？",
       "vi": "Đài Loan từ bắc xuống nam dài bao nhiêu cây số? Nhỏ hơn nước nào một chút?",
       "py": "Táiwān cóng běi dào nán yǒu jǐgōnglǐ? Bǐ nǎge guójiā xiǎo yìdiǎn'ér?"
      },
      {
       "hz": "台灣哪個城市最有名？那個城市的交通怎麼樣？",
       "vi": "Thành phố nào của Đài Loan nổi tiếng nhất? Giao thông ở thành phố đó thế nào?",
       "py": "Táiwān nǎge chéngshì zuì yǒumíng? Nàge chéngshì de jiāotōng zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  }
 ],
 "td1-16.4": [
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén le.",
     "examples": [
      {
       "hz": "就睡覺了。",
       "vi": "…là đi ngủ.",
       "py": "Jiù shuìjiào le."
      },
      {
       "hz": "a.媽媽昨天到了家，就去準備晚飯了。",
       "vi": "a. Hôm qua mẹ về đến nhà là đi chuẩn bị bữa tối.",
       "py": "A. Māma zuótiān dào le jiā, jiù qù zhǔnbèi wǎnfàn le."
      },
      {
       "hz": "a.他上個月放了假，就去旅行了。",
       "vi": "a. Tháng trước được nghỉ là anh ấy đi du lịch.",
       "py": "A. Tā shànggèyuè fàng le jiǎ, jiù qù lǚxíng le."
      },
      {
       "hz": "a.昨天我下了課，就跟語言交換的朋友練習說中文了。",
       "vi": "a. Hôm qua tan học xong là tôi luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "A. Zuótiān wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Měi cì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén.",
     "examples": [
      {
       "hz": "b.媽媽每天到了家，就去準備晚飯。",
       "vi": "b. Ngày nào mẹ về đến nhà cũng đi chuẩn bị bữa tối.",
       "py": "B. Māma měitiān dào le jiā, jiù qù zhǔnbèi wǎnfàn."
      },
      {
       "hz": "b.他每次放了假，就去旅行。",
       "vi": "b. Lần nào được nghỉ anh ấy cũng đi du lịch.",
       "py": "B. Tā měicì fàng le jiǎ, jiù qù lǚxíng."
      },
      {
       "hz": "b.每次我下了課，就跟語言交換的朋友練習說中文。",
       "vi": "b. Lần nào tan học tôi cũng luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "B. Měicì wǒ xià le kè, jiù gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  },
  {
   "title": "III. “SV了O” as a Dependent Clause",
   "points": [
    {
     "label": null,
     "formula": "When the pattern SV 了 O appears, it generally means that the sentence is uncompleted. The sentence needs a main clause which follows SV 了 O. Such a main clause is usually started with 就. In this case, the initial action in the first clause is followed almost immediately by a second action. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō Zhōngwén. Completed the following sentences. Completed the following sentences. Táiwān cóng běi dào nán yǒu jǐ gōnglǐ? Bǐ nǎ ge guójiā xiǎo yìdiǎnr ？ Táiwān nǎ ge chéngshì zuì yǒumíng? Nà ge chéngshì de jiāotōng zěnmeyàng?",
     "examples": [
      {
       "hz": "就要睡覺。",
       "vi": "…là sẽ đi ngủ.",
       "py": "Jiùyào shuìjiào."
      },
      {
       "hz": "c.媽媽今天晚上到了家，就要準備晚飯。",
       "vi": "c. Tối nay mẹ về đến nhà là sẽ chuẩn bị bữa tối.",
       "py": "C. Māma jīntiān wǎnshàng dào le jiā, jiùyào zhǔnbèi wǎnfàn."
      },
      {
       "hz": "c.他下個月放了假，就要去旅行。",
       "vi": "c. Tháng sau được nghỉ là anh ấy sẽ đi du lịch.",
       "py": "C. Tā xiàgèyuè fàng le jiǎ, jiùyào qù lǚxíng."
      },
      {
       "hz": "c.明天我下了課，就要跟語言交換的朋友練習說中文。",
       "vi": "c. Ngày mai tan học xong là tôi sẽ luyện nói tiếng Trung với bạn trao đổi ngôn ngữ.",
       "py": "C. Míngtiān wǒ xià le kè, jiùyào gēn yǔyán jiāohuàn de péngyǒu liànxí shuō zhōngwén."
      },
      {
       "hz": "台灣的四邊有什麼？西邊和南邊呢？",
       "vi": "Bốn phía Đài Loan có gì? Phía tây và phía nam thì sao?",
       "py": "Táiwān de sìbiān yǒu shénme? Xībiān hàn nánbiān ne?"
      },
      {
       "hz": "台灣從北到南有幾公里？比哪個國家小一點兒？",
       "vi": "Đài Loan từ bắc xuống nam dài bao nhiêu cây số? Nhỏ hơn nước nào một chút?",
       "py": "Táiwān cóng běi dào nán yǒu jǐgōnglǐ? Bǐ nǎge guójiā xiǎo yìdiǎn'ér?"
      },
      {
       "hz": "台灣哪個城市最有名？那個城市的交通怎麼樣？",
       "vi": "Thành phố nào của Đài Loan nổi tiếng nhất? Giao thông ở thành phố đó thế nào?",
       "py": "Táiwān nǎge chéngshì zuì yǒumíng? Nàge chéngshì de jiāotōng zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "\"S V 了 O\" làm vế phụ",
   "giaiThich": "Khi câu có dạng S + V + 了 + O mà chưa trọn ý, nó là vế phụ; vế chính đứng sau, thường mở đầu bằng 就 — ý là làm xong việc trước rồi mới tới việc sau."
  }
 ]
};
