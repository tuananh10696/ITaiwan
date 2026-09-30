// =============================================================
// Ngữ pháp Giáo trình Thời Đại QUYỂN 3 — SINH TỰ ĐỘNG, đừng sửa tay.
//   node scripts/gen-thoidai-grammar.mjs --quyen 3
// Nguồn: PPT bài giảng chính thức của 淡江大學華語中心 (công khai).
// Ví dụ CHỈ CÓ tiếng Trung (nguồn không kèm bản dịch) -> `vi` rỗng.
// Ngữ pháp thuộc cả bài nên các bài con dùng chung một danh sách.
// =============================================================
export const thoidaiGrammar3 = {
 "td3-1.1": [
  {
   "title": "1. 可以說是",
   "points": [
    {
     "label": null,
     "formula": "用來進一步說明前面的說話內容。「可以說是」和「可說是」的意思一樣。 表示感嘆的意思，說明事情比本來想的程度高。表達時帶有誇張的語氣，「麼」可以省略，結尾以「啊」結束。",
     "examples": [
      {
       "hz": "你演的戲，我都看了，我可以說是你的戲迷喔，快幫我簽個名吧！",
       "vi": "Phim anh đóng tôi đều xem hết, có thể nói tôi là fan của anh đấy, mau ký tặng tôi đi!",
       "py": "Nǐ yǎn de xì, wǒ dōu kàn le, wǒ kěyǐ shuō shì nǐ de xìmí ō, kuài bāng wǒ qiān gè míng ba!"
      },
      {
       "hz": "他下個月就滿十八歲了，可以說是一個大人了。",
       "vi": "Tháng sau cậu ấy tròn mười tám tuổi rồi, có thể nói là người lớn rồi.",
       "py": "Tā xiàgèyuè jiù mǎn shíbāsuì le, kěyǐ shuō shì yígè dàrén le."
      },
      {
       "hz": "我在高雄住了十年了，這裡可說是我第二個家。",
       "vi": "Tôi sống ở Cao Hùng mười năm rồi, nơi đây có thể nói là ngôi nhà thứ hai của tôi.",
       "py": "Wǒ zài Gāoxióng zhù le shínián le, zhèlǐ kěshuōshì wǒ dì'èrgè jiā."
      },
      {
       "hz": "你長得這麼好看，身高也夠高⋯⋯不當演員多麼可惜啊！",
       "vi": "Bạn đẹp như vậy, chiều cao cũng đủ… không làm diễn viên thì thật đáng tiếc biết bao!",
       "py": "Nǐ zhǎng de zhème hǎokàn, shēngāo yě gòu gāo…… búdàng yǎnyuán duōme kěxī a!"
      },
      {
       "hz": "那隻狗的眼睛大大的，耳朵長長的，多可愛啊！",
       "vi": "Con chó đó mắt to tròn, tai dài, dễ thương biết bao!",
       "py": "Nà zhī gǒu de yǎnjīng dàdàde, ěrduǒ chángchángde, duō kě'ài a!"
      },
      {
       "hz": "外面熱死了，我在家邊看電視邊吃芒果冰，多舒服啊！",
       "vi": "Bên ngoài nóng chết đi được, tôi ở nhà vừa xem tivi vừa ăn đá bào xoài, dễ chịu biết bao!",
       "py": "Wàimiàn rè sǐ le, wǒ zàijiā biān kàndiànshì biān chī mángguǒ bīng, duō shūfú a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "可以說是 — có thể nói là",
   "giaiThich": "Dùng để nói rõ thêm, đánh giá lại điều vừa nêu. 「可以說是」và「可說是」nghĩa như nhau."
  },
  {
   "title": "3. 再說",
   "points": [
    {
     "label": null,
     "formula": "「再說」當連詞。「再說」後面的句子是對前面句子所說的內容，補充、說明或提供進一步的解釋。 「而」當連詞，「因為」的後面是事情的原因，「而」的後面是事情的結果。常用在書面或正式場合。「因為⋯⋯（，）而⋯⋯」有「因為⋯⋯所以⋯⋯」的意思。",
     "examples": [
      {
       "hz": "你長得這麼好看⋯⋯不當演員多麼可惜啊！再說，觀眾也都很肯定你的表現。",
       "vi": "Bạn đẹp như vậy… không làm diễn viên thì thật đáng tiếc biết bao! Hơn nữa, khán giả cũng rất công nhận màn thể hiện của bạn.",
       "py": "Nǐ zhǎng de zhème hǎokàn…… búdàng yǎnyuán duōme kěxī a! Zàishuō, guānzhòng yě dōu hěn kěndìng nǐ de biǎoxiàn."
      },
      {
       "hz": "最近得交兩個報告，再說，快期末考了，下星期的旅遊我3.參加社團活動能交到不少朋友，再說，還能讓我們更了解自己，你為什麼不參加呢？",
       "vi": "Dạo này phải nộp hai bài báo cáo, hơn nữa sắp thi cuối kỳ rồi, chuyến du lịch tuần sau tôi… Tham gia hoạt động câu lạc bộ có thể kết bạn được nhiều, hơn nữa còn giúp chúng ta hiểu bản thân hơn, sao bạn không tham gia?",
       "py": "Zuìjìn děi jiāo liǎnggè bàogào, zàishuō, kuài qímòkǎo le, xiàxīngqí de lǚyóu wǒ 3. Cānjiā shètuánhuódòng néng jiāodào bùshǎo péngyǒu, zàishuō, hái néng ràng wǒmen gèng liǎojiě zìjǐ, nǐ wèishénme bù cānjiā ne?"
      },
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他因為不適應都市緊張的生活，而搬到了鄉下，過著自由簡單的日子。",
       "vi": "Vì không thích nghi được với cuộc sống căng thẳng ở thành phố, anh ấy chuyển về quê, sống những ngày tự do giản dị.",
       "py": "Tā yīnwèi bú shìyìng dūshì jǐnzhāng de shēnghuó, ér bān dào le xiāngxià, guò zhe zìyóu jiǎndān de rìzi."
      },
      {
       "hz": "大家約他吃飯喝酒，慶祝他找到工作，沒想到他因為喝酒開車而丟了工作。",
       "vi": "Mọi người hẹn anh ấy đi ăn uống để mừng anh ấy tìm được việc, không ngờ anh ấy vì uống rượu lái xe mà mất việc.",
       "py": "Dàjiā yuē tā chīfàn hējiǔ, qìngzhù tā zhǎodào gōngzuò, méixiǎngdào tā yīnwèi hējiǔ kāichē ér diū le gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再說 — hơn nữa, vả lại",
   "giaiThich": "Liên từ. Vế sau 再說 bổ sung, giải thích thêm cho điều vừa nói ở vế trước."
  },
  {
   "title": "2. V 出O",
   "points": [
    {
     "label": null,
     "formula": "動詞後面加「出」可表示動作從裡到外的方向，例如：我從書包裡拿出鉛筆。本課動詞後面加「出」，表示動作完成後，產生新事物。常用的動詞有：想、做、說、穿、拍、寫、找、算、研究等等。 「就算」當連詞，後面是一個假設，表示不會因為這個假設的情況，而改變原來的事實或決定。例如：",
     "examples": [
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他花了三年的時間，最後寫出了一本大家都非常喜愛的3.我學做蛋糕學了很久，還是做不出讓自己滿意的蛋糕。",
       "vi": "Anh ấy mất ba năm, cuối cùng viết ra được một quyển … mà ai cũng rất yêu thích. Tôi học làm bánh kem rất lâu rồi, vẫn không làm ra được chiếc bánh khiến mình hài lòng.",
       "py": "Tā huā le sānnián de shíjiān, zuìhòu xiěchū le yìběn dàjiā dōu fēicháng xǐ'ài de 3. Wǒ xué zuò dàngāo xué le hěn jiǔ, háishì zuò bù chūràng zìjǐ mǎnyì de dàngāo."
      },
      {
       "hz": "A：今天下雨，我不去學校了。",
       "vi": "A: Hôm nay trời mưa, tôi không đến trường nữa.",
       "py": "A: Jīntiān xiàyǔ, wǒ bú qù xuéxiào le."
      },
      {
       "hz": "B：不行，就算下雪，也得去學校。",
       "vi": "B: Không được, dù có tuyết rơi cũng phải đến trường.",
       "py": "B: Bùxíng, jiùsuàn xiàxuě, yě děi qù xuéxiào."
      },
      {
       "hz": "這種為了夢想⋯⋯，就算累得不得了，東賢也覺得很開心、2.方小姐想多存一點兒錢，就算一天工作十二個小時也沒3.我覺得那個地區房子的價格都太高了，就算二十年不吃不喝也買不起。",
       "vi": "Vì ước mơ như thế này…, dù mệt vô cùng, Đông Hiền cũng thấy rất vui… Cô Phương muốn tiết kiệm thêm chút tiền, dù một ngày làm mười hai tiếng cũng không… Tôi thấy giá nhà ở khu đó đều quá cao, dù hai mươi năm không ăn không uống cũng không mua nổi.",
       "py": "Zhèzhǒng wèile mèngxiǎng……, jiùsuàn lèi de bùdéle, dōng xián yě juéde hěn kāixīn, 2. Fāng xiǎojiě xiǎng duō cún yìdiǎn'ér qián, jiùsuàn yìtiān gōngzuò shí'èrgè xiǎoshí yě méi 3. Wǒ juéde nàge dìqū fángzi de jiàgé dōu tài gāo le, jiùsuàn èrshínián bùchībùhē yě mǎibùqǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 出 + tân ngữ — làm ra, nghĩ ra",
   "giaiThich": "出 sau động từ vốn chỉ hướng từ trong ra ngoài (拿出). Ở bài này 出 chỉ kết quả: sau hành động thì SINH RA cái mới. Động từ hay dùng: 想, 做, 說, 穿, 拍, 寫, 找, 算, 研究."
  }
 ],
 "td3-1.2": [
  {
   "title": "1. 可以說是",
   "points": [
    {
     "label": null,
     "formula": "用來進一步說明前面的說話內容。「可以說是」和「可說是」的意思一樣。 表示感嘆的意思，說明事情比本來想的程度高。表達時帶有誇張的語氣，「麼」可以省略，結尾以「啊」結束。",
     "examples": [
      {
       "hz": "你演的戲，我都看了，我可以說是你的戲迷喔，快幫我簽個名吧！",
       "vi": "Phim anh đóng tôi đều xem hết, có thể nói tôi là fan của anh đấy, mau ký tặng tôi đi!",
       "py": "Nǐ yǎn de xì, wǒ dōu kàn le, wǒ kěyǐ shuō shì nǐ de xìmí ō, kuài bāng wǒ qiān gè míng ba!"
      },
      {
       "hz": "他下個月就滿十八歲了，可以說是一個大人了。",
       "vi": "Tháng sau cậu ấy tròn mười tám tuổi rồi, có thể nói là người lớn rồi.",
       "py": "Tā xiàgèyuè jiù mǎn shíbāsuì le, kěyǐ shuō shì yígè dàrén le."
      },
      {
       "hz": "我在高雄住了十年了，這裡可說是我第二個家。",
       "vi": "Tôi sống ở Cao Hùng mười năm rồi, nơi đây có thể nói là ngôi nhà thứ hai của tôi.",
       "py": "Wǒ zài Gāoxióng zhù le shínián le, zhèlǐ kěshuōshì wǒ dì'èrgè jiā."
      },
      {
       "hz": "你長得這麼好看，身高也夠高⋯⋯不當演員多麼可惜啊！",
       "vi": "Bạn đẹp như vậy, chiều cao cũng đủ… không làm diễn viên thì thật đáng tiếc biết bao!",
       "py": "Nǐ zhǎng de zhème hǎokàn, shēngāo yě gòu gāo…… búdàng yǎnyuán duōme kěxī a!"
      },
      {
       "hz": "那隻狗的眼睛大大的，耳朵長長的，多可愛啊！",
       "vi": "Con chó đó mắt to tròn, tai dài, dễ thương biết bao!",
       "py": "Nà zhī gǒu de yǎnjīng dàdàde, ěrduǒ chángchángde, duō kě'ài a!"
      },
      {
       "hz": "外面熱死了，我在家邊看電視邊吃芒果冰，多舒服啊！",
       "vi": "Bên ngoài nóng chết đi được, tôi ở nhà vừa xem tivi vừa ăn đá bào xoài, dễ chịu biết bao!",
       "py": "Wàimiàn rè sǐ le, wǒ zàijiā biān kàndiànshì biān chī mángguǒ bīng, duō shūfú a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "可以說是 — có thể nói là",
   "giaiThich": "Dùng để nói rõ thêm, đánh giá lại điều vừa nêu. 「可以說是」và「可說是」nghĩa như nhau."
  },
  {
   "title": "3. 再說",
   "points": [
    {
     "label": null,
     "formula": "「再說」當連詞。「再說」後面的句子是對前面句子所說的內容，補充、說明或提供進一步的解釋。 「而」當連詞，「因為」的後面是事情的原因，「而」的後面是事情的結果。常用在書面或正式場合。「因為⋯⋯（，）而⋯⋯」有「因為⋯⋯所以⋯⋯」的意思。",
     "examples": [
      {
       "hz": "你長得這麼好看⋯⋯不當演員多麼可惜啊！再說，觀眾也都很肯定你的表現。",
       "vi": "Bạn đẹp như vậy… không làm diễn viên thì thật đáng tiếc biết bao! Hơn nữa, khán giả cũng rất công nhận màn thể hiện của bạn.",
       "py": "Nǐ zhǎng de zhème hǎokàn…… búdàng yǎnyuán duōme kěxī a! Zàishuō, guānzhòng yě dōu hěn kěndìng nǐ de biǎoxiàn."
      },
      {
       "hz": "最近得交兩個報告，再說，快期末考了，下星期的旅遊我3.參加社團活動能交到不少朋友，再說，還能讓我們更了解自己，你為什麼不參加呢？",
       "vi": "Dạo này phải nộp hai bài báo cáo, hơn nữa sắp thi cuối kỳ rồi, chuyến du lịch tuần sau tôi… Tham gia hoạt động câu lạc bộ có thể kết bạn được nhiều, hơn nữa còn giúp chúng ta hiểu bản thân hơn, sao bạn không tham gia?",
       "py": "Zuìjìn děi jiāo liǎnggè bàogào, zàishuō, kuài qímòkǎo le, xiàxīngqí de lǚyóu wǒ 3. Cānjiā shètuánhuódòng néng jiāodào bùshǎo péngyǒu, zàishuō, hái néng ràng wǒmen gèng liǎojiě zìjǐ, nǐ wèishénme bù cānjiā ne?"
      },
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他因為不適應都市緊張的生活，而搬到了鄉下，過著自由簡單的日子。",
       "vi": "Vì không thích nghi được với cuộc sống căng thẳng ở thành phố, anh ấy chuyển về quê, sống những ngày tự do giản dị.",
       "py": "Tā yīnwèi bú shìyìng dūshì jǐnzhāng de shēnghuó, ér bān dào le xiāngxià, guò zhe zìyóu jiǎndān de rìzi."
      },
      {
       "hz": "大家約他吃飯喝酒，慶祝他找到工作，沒想到他因為喝酒開車而丟了工作。",
       "vi": "Mọi người hẹn anh ấy đi ăn uống để mừng anh ấy tìm được việc, không ngờ anh ấy vì uống rượu lái xe mà mất việc.",
       "py": "Dàjiā yuē tā chīfàn hējiǔ, qìngzhù tā zhǎodào gōngzuò, méixiǎngdào tā yīnwèi hējiǔ kāichē ér diū le gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再說 — hơn nữa, vả lại",
   "giaiThich": "Liên từ. Vế sau 再說 bổ sung, giải thích thêm cho điều vừa nói ở vế trước."
  },
  {
   "title": "2. V 出O",
   "points": [
    {
     "label": null,
     "formula": "動詞後面加「出」可表示動作從裡到外的方向，例如：我從書包裡拿出鉛筆。本課動詞後面加「出」，表示動作完成後，產生新事物。常用的動詞有：想、做、說、穿、拍、寫、找、算、研究等等。 「就算」當連詞，後面是一個假設，表示不會因為這個假設的情況，而改變原來的事實或決定。例如：",
     "examples": [
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他花了三年的時間，最後寫出了一本大家都非常喜愛的3.我學做蛋糕學了很久，還是做不出讓自己滿意的蛋糕。",
       "vi": "Anh ấy mất ba năm, cuối cùng viết ra được một quyển … mà ai cũng rất yêu thích. Tôi học làm bánh kem rất lâu rồi, vẫn không làm ra được chiếc bánh khiến mình hài lòng.",
       "py": "Tā huā le sānnián de shíjiān, zuìhòu xiěchū le yìběn dàjiā dōu fēicháng xǐ'ài de 3. Wǒ xué zuò dàngāo xué le hěn jiǔ, háishì zuò bù chūràng zìjǐ mǎnyì de dàngāo."
      },
      {
       "hz": "A：今天下雨，我不去學校了。",
       "vi": "A: Hôm nay trời mưa, tôi không đến trường nữa.",
       "py": "A: Jīntiān xiàyǔ, wǒ bú qù xuéxiào le."
      },
      {
       "hz": "B：不行，就算下雪，也得去學校。",
       "vi": "B: Không được, dù có tuyết rơi cũng phải đến trường.",
       "py": "B: Bùxíng, jiùsuàn xiàxuě, yě děi qù xuéxiào."
      },
      {
       "hz": "這種為了夢想⋯⋯，就算累得不得了，東賢也覺得很開心、2.方小姐想多存一點兒錢，就算一天工作十二個小時也沒3.我覺得那個地區房子的價格都太高了，就算二十年不吃不喝也買不起。",
       "vi": "Vì ước mơ như thế này…, dù mệt vô cùng, Đông Hiền cũng thấy rất vui… Cô Phương muốn tiết kiệm thêm chút tiền, dù một ngày làm mười hai tiếng cũng không… Tôi thấy giá nhà ở khu đó đều quá cao, dù hai mươi năm không ăn không uống cũng không mua nổi.",
       "py": "Zhèzhǒng wèile mèngxiǎng……, jiùsuàn lèi de bùdéle, dōng xián yě juéde hěn kāixīn, 2. Fāng xiǎojiě xiǎng duō cún yìdiǎn'ér qián, jiùsuàn yìtiān gōngzuò shí'èrgè xiǎoshí yě méi 3. Wǒ juéde nàge dìqū fángzi de jiàgé dōu tài gāo le, jiùsuàn èrshínián bùchībùhē yě mǎibùqǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 出 + tân ngữ — làm ra, nghĩ ra",
   "giaiThich": "出 sau động từ vốn chỉ hướng từ trong ra ngoài (拿出). Ở bài này 出 chỉ kết quả: sau hành động thì SINH RA cái mới. Động từ hay dùng: 想, 做, 說, 穿, 拍, 寫, 找, 算, 研究."
  }
 ],
 "td3-1.3": [
  {
   "title": "1. 可以說是",
   "points": [
    {
     "label": null,
     "formula": "用來進一步說明前面的說話內容。「可以說是」和「可說是」的意思一樣。 表示感嘆的意思，說明事情比本來想的程度高。表達時帶有誇張的語氣，「麼」可以省略，結尾以「啊」結束。",
     "examples": [
      {
       "hz": "你演的戲，我都看了，我可以說是你的戲迷喔，快幫我簽個名吧！",
       "vi": "Phim anh đóng tôi đều xem hết, có thể nói tôi là fan của anh đấy, mau ký tặng tôi đi!",
       "py": "Nǐ yǎn de xì, wǒ dōu kàn le, wǒ kěyǐ shuō shì nǐ de xìmí ō, kuài bāng wǒ qiān gè míng ba!"
      },
      {
       "hz": "他下個月就滿十八歲了，可以說是一個大人了。",
       "vi": "Tháng sau cậu ấy tròn mười tám tuổi rồi, có thể nói là người lớn rồi.",
       "py": "Tā xiàgèyuè jiù mǎn shíbāsuì le, kěyǐ shuō shì yígè dàrén le."
      },
      {
       "hz": "我在高雄住了十年了，這裡可說是我第二個家。",
       "vi": "Tôi sống ở Cao Hùng mười năm rồi, nơi đây có thể nói là ngôi nhà thứ hai của tôi.",
       "py": "Wǒ zài Gāoxióng zhù le shínián le, zhèlǐ kěshuōshì wǒ dì'èrgè jiā."
      },
      {
       "hz": "你長得這麼好看，身高也夠高⋯⋯不當演員多麼可惜啊！",
       "vi": "Bạn đẹp như vậy, chiều cao cũng đủ… không làm diễn viên thì thật đáng tiếc biết bao!",
       "py": "Nǐ zhǎng de zhème hǎokàn, shēngāo yě gòu gāo…… búdàng yǎnyuán duōme kěxī a!"
      },
      {
       "hz": "那隻狗的眼睛大大的，耳朵長長的，多可愛啊！",
       "vi": "Con chó đó mắt to tròn, tai dài, dễ thương biết bao!",
       "py": "Nà zhī gǒu de yǎnjīng dàdàde, ěrduǒ chángchángde, duō kě'ài a!"
      },
      {
       "hz": "外面熱死了，我在家邊看電視邊吃芒果冰，多舒服啊！",
       "vi": "Bên ngoài nóng chết đi được, tôi ở nhà vừa xem tivi vừa ăn đá bào xoài, dễ chịu biết bao!",
       "py": "Wàimiàn rè sǐ le, wǒ zàijiā biān kàndiànshì biān chī mángguǒ bīng, duō shūfú a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "可以說是 — có thể nói là",
   "giaiThich": "Dùng để nói rõ thêm, đánh giá lại điều vừa nêu. 「可以說是」và「可說是」nghĩa như nhau."
  },
  {
   "title": "3. 再說",
   "points": [
    {
     "label": null,
     "formula": "「再說」當連詞。「再說」後面的句子是對前面句子所說的內容，補充、說明或提供進一步的解釋。 「而」當連詞，「因為」的後面是事情的原因，「而」的後面是事情的結果。常用在書面或正式場合。「因為⋯⋯（，）而⋯⋯」有「因為⋯⋯所以⋯⋯」的意思。",
     "examples": [
      {
       "hz": "你長得這麼好看⋯⋯不當演員多麼可惜啊！再說，觀眾也都很肯定你的表現。",
       "vi": "Bạn đẹp như vậy… không làm diễn viên thì thật đáng tiếc biết bao! Hơn nữa, khán giả cũng rất công nhận màn thể hiện của bạn.",
       "py": "Nǐ zhǎng de zhème hǎokàn…… búdàng yǎnyuán duōme kěxī a! Zàishuō, guānzhòng yě dōu hěn kěndìng nǐ de biǎoxiàn."
      },
      {
       "hz": "最近得交兩個報告，再說，快期末考了，下星期的旅遊我3.參加社團活動能交到不少朋友，再說，還能讓我們更了解自己，你為什麼不參加呢？",
       "vi": "Dạo này phải nộp hai bài báo cáo, hơn nữa sắp thi cuối kỳ rồi, chuyến du lịch tuần sau tôi… Tham gia hoạt động câu lạc bộ có thể kết bạn được nhiều, hơn nữa còn giúp chúng ta hiểu bản thân hơn, sao bạn không tham gia?",
       "py": "Zuìjìn děi jiāo liǎnggè bàogào, zàishuō, kuài qímòkǎo le, xiàxīngqí de lǚyóu wǒ 3. Cānjiā shètuánhuódòng néng jiāodào bùshǎo péngyǒu, zàishuō, hái néng ràng wǒmen gèng liǎojiě zìjǐ, nǐ wèishénme bù cānjiā ne?"
      },
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他因為不適應都市緊張的生活，而搬到了鄉下，過著自由簡單的日子。",
       "vi": "Vì không thích nghi được với cuộc sống căng thẳng ở thành phố, anh ấy chuyển về quê, sống những ngày tự do giản dị.",
       "py": "Tā yīnwèi bú shìyìng dūshì jǐnzhāng de shēnghuó, ér bān dào le xiāngxià, guò zhe zìyóu jiǎndān de rìzi."
      },
      {
       "hz": "大家約他吃飯喝酒，慶祝他找到工作，沒想到他因為喝酒開車而丟了工作。",
       "vi": "Mọi người hẹn anh ấy đi ăn uống để mừng anh ấy tìm được việc, không ngờ anh ấy vì uống rượu lái xe mà mất việc.",
       "py": "Dàjiā yuē tā chīfàn hējiǔ, qìngzhù tā zhǎodào gōngzuò, méixiǎngdào tā yīnwèi hējiǔ kāichē ér diū le gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再說 — hơn nữa, vả lại",
   "giaiThich": "Liên từ. Vế sau 再說 bổ sung, giải thích thêm cho điều vừa nói ở vế trước."
  },
  {
   "title": "2. V 出O",
   "points": [
    {
     "label": null,
     "formula": "動詞後面加「出」可表示動作從裡到外的方向，例如：我從書包裡拿出鉛筆。本課動詞後面加「出」，表示動作完成後，產生新事物。常用的動詞有：想、做、說、穿、拍、寫、找、算、研究等等。 「就算」當連詞，後面是一個假設，表示不會因為這個假設的情況，而改變原來的事實或決定。例如：",
     "examples": [
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他花了三年的時間，最後寫出了一本大家都非常喜愛的3.我學做蛋糕學了很久，還是做不出讓自己滿意的蛋糕。",
       "vi": "Anh ấy mất ba năm, cuối cùng viết ra được một quyển … mà ai cũng rất yêu thích. Tôi học làm bánh kem rất lâu rồi, vẫn không làm ra được chiếc bánh khiến mình hài lòng.",
       "py": "Tā huā le sānnián de shíjiān, zuìhòu xiěchū le yìběn dàjiā dōu fēicháng xǐ'ài de 3. Wǒ xué zuò dàngāo xué le hěn jiǔ, háishì zuò bù chūràng zìjǐ mǎnyì de dàngāo."
      },
      {
       "hz": "A：今天下雨，我不去學校了。",
       "vi": "A: Hôm nay trời mưa, tôi không đến trường nữa.",
       "py": "A: Jīntiān xiàyǔ, wǒ bú qù xuéxiào le."
      },
      {
       "hz": "B：不行，就算下雪，也得去學校。",
       "vi": "B: Không được, dù có tuyết rơi cũng phải đến trường.",
       "py": "B: Bùxíng, jiùsuàn xiàxuě, yě děi qù xuéxiào."
      },
      {
       "hz": "這種為了夢想⋯⋯，就算累得不得了，東賢也覺得很開心、2.方小姐想多存一點兒錢，就算一天工作十二個小時也沒3.我覺得那個地區房子的價格都太高了，就算二十年不吃不喝也買不起。",
       "vi": "Vì ước mơ như thế này…, dù mệt vô cùng, Đông Hiền cũng thấy rất vui… Cô Phương muốn tiết kiệm thêm chút tiền, dù một ngày làm mười hai tiếng cũng không… Tôi thấy giá nhà ở khu đó đều quá cao, dù hai mươi năm không ăn không uống cũng không mua nổi.",
       "py": "Zhèzhǒng wèile mèngxiǎng……, jiùsuàn lèi de bùdéle, dōng xián yě juéde hěn kāixīn, 2. Fāng xiǎojiě xiǎng duō cún yìdiǎn'ér qián, jiùsuàn yìtiān gōngzuò shí'èrgè xiǎoshí yě méi 3. Wǒ juéde nàge dìqū fángzi de jiàgé dōu tài gāo le, jiùsuàn èrshínián bùchībùhē yě mǎibùqǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 出 + tân ngữ — làm ra, nghĩ ra",
   "giaiThich": "出 sau động từ vốn chỉ hướng từ trong ra ngoài (拿出). Ở bài này 出 chỉ kết quả: sau hành động thì SINH RA cái mới. Động từ hay dùng: 想, 做, 說, 穿, 拍, 寫, 找, 算, 研究."
  }
 ],
 "td3-1.4": [
  {
   "title": "1. 可以說是",
   "points": [
    {
     "label": null,
     "formula": "用來進一步說明前面的說話內容。「可以說是」和「可說是」的意思一樣。 表示感嘆的意思，說明事情比本來想的程度高。表達時帶有誇張的語氣，「麼」可以省略，結尾以「啊」結束。",
     "examples": [
      {
       "hz": "你演的戲，我都看了，我可以說是你的戲迷喔，快幫我簽個名吧！",
       "vi": "Phim anh đóng tôi đều xem hết, có thể nói tôi là fan của anh đấy, mau ký tặng tôi đi!",
       "py": "Nǐ yǎn de xì, wǒ dōu kàn le, wǒ kěyǐ shuō shì nǐ de xìmí ō, kuài bāng wǒ qiān gè míng ba!"
      },
      {
       "hz": "他下個月就滿十八歲了，可以說是一個大人了。",
       "vi": "Tháng sau cậu ấy tròn mười tám tuổi rồi, có thể nói là người lớn rồi.",
       "py": "Tā xiàgèyuè jiù mǎn shíbāsuì le, kěyǐ shuō shì yígè dàrén le."
      },
      {
       "hz": "我在高雄住了十年了，這裡可說是我第二個家。",
       "vi": "Tôi sống ở Cao Hùng mười năm rồi, nơi đây có thể nói là ngôi nhà thứ hai của tôi.",
       "py": "Wǒ zài Gāoxióng zhù le shínián le, zhèlǐ kěshuōshì wǒ dì'èrgè jiā."
      },
      {
       "hz": "你長得這麼好看，身高也夠高⋯⋯不當演員多麼可惜啊！",
       "vi": "Bạn đẹp như vậy, chiều cao cũng đủ… không làm diễn viên thì thật đáng tiếc biết bao!",
       "py": "Nǐ zhǎng de zhème hǎokàn, shēngāo yě gòu gāo…… búdàng yǎnyuán duōme kěxī a!"
      },
      {
       "hz": "那隻狗的眼睛大大的，耳朵長長的，多可愛啊！",
       "vi": "Con chó đó mắt to tròn, tai dài, dễ thương biết bao!",
       "py": "Nà zhī gǒu de yǎnjīng dàdàde, ěrduǒ chángchángde, duō kě'ài a!"
      },
      {
       "hz": "外面熱死了，我在家邊看電視邊吃芒果冰，多舒服啊！",
       "vi": "Bên ngoài nóng chết đi được, tôi ở nhà vừa xem tivi vừa ăn đá bào xoài, dễ chịu biết bao!",
       "py": "Wàimiàn rè sǐ le, wǒ zàijiā biān kàndiànshì biān chī mángguǒ bīng, duō shūfú a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "可以說是 — có thể nói là",
   "giaiThich": "Dùng để nói rõ thêm, đánh giá lại điều vừa nêu. 「可以說是」và「可說是」nghĩa như nhau."
  },
  {
   "title": "3. 再說",
   "points": [
    {
     "label": null,
     "formula": "「再說」當連詞。「再說」後面的句子是對前面句子所說的內容，補充、說明或提供進一步的解釋。 「而」當連詞，「因為」的後面是事情的原因，「而」的後面是事情的結果。常用在書面或正式場合。「因為⋯⋯（，）而⋯⋯」有「因為⋯⋯所以⋯⋯」的意思。",
     "examples": [
      {
       "hz": "你長得這麼好看⋯⋯不當演員多麼可惜啊！再說，觀眾也都很肯定你的表現。",
       "vi": "Bạn đẹp như vậy… không làm diễn viên thì thật đáng tiếc biết bao! Hơn nữa, khán giả cũng rất công nhận màn thể hiện của bạn.",
       "py": "Nǐ zhǎng de zhème hǎokàn…… búdàng yǎnyuán duōme kěxī a! Zàishuō, guānzhòng yě dōu hěn kěndìng nǐ de biǎoxiàn."
      },
      {
       "hz": "最近得交兩個報告，再說，快期末考了，下星期的旅遊我3.參加社團活動能交到不少朋友，再說，還能讓我們更了解自己，你為什麼不參加呢？",
       "vi": "Dạo này phải nộp hai bài báo cáo, hơn nữa sắp thi cuối kỳ rồi, chuyến du lịch tuần sau tôi… Tham gia hoạt động câu lạc bộ có thể kết bạn được nhiều, hơn nữa còn giúp chúng ta hiểu bản thân hơn, sao bạn không tham gia?",
       "py": "Zuìjìn děi jiāo liǎnggè bàogào, zàishuō, kuài qímòkǎo le, xiàxīngqí de lǚyóu wǒ 3. Cānjiā shètuánhuódòng néng jiāodào bùshǎo péngyǒu, zàishuō, hái néng ràng wǒmen gèng liǎojiě zìjǐ, nǐ wèishénme bù cānjiā ne?"
      },
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他因為不適應都市緊張的生活，而搬到了鄉下，過著自由簡單的日子。",
       "vi": "Vì không thích nghi được với cuộc sống căng thẳng ở thành phố, anh ấy chuyển về quê, sống những ngày tự do giản dị.",
       "py": "Tā yīnwèi bú shìyìng dūshì jǐnzhāng de shēnghuó, ér bān dào le xiāngxià, guò zhe zìyóu jiǎndān de rìzi."
      },
      {
       "hz": "大家約他吃飯喝酒，慶祝他找到工作，沒想到他因為喝酒開車而丟了工作。",
       "vi": "Mọi người hẹn anh ấy đi ăn uống để mừng anh ấy tìm được việc, không ngờ anh ấy vì uống rượu lái xe mà mất việc.",
       "py": "Dàjiā yuē tā chīfàn hējiǔ, qìngzhù tā zhǎodào gōngzuò, méixiǎngdào tā yīnwèi hējiǔ kāichē ér diū le gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再說 — hơn nữa, vả lại",
   "giaiThich": "Liên từ. Vế sau 再說 bổ sung, giải thích thêm cho điều vừa nói ở vế trước."
  },
  {
   "title": "2. V 出O",
   "points": [
    {
     "label": null,
     "formula": "動詞後面加「出」可表示動作從裡到外的方向，例如：我從書包裡拿出鉛筆。本課動詞後面加「出」，表示動作完成後，產生新事物。常用的動詞有：想、做、說、穿、拍、寫、找、算、研究等等。 「就算」當連詞，後面是一個假設，表示不會因為這個假設的情況，而改變原來的事實或決定。例如：",
     "examples": [
      {
       "hz": "⋯⋯還有一些導演因為拍出了好電影而變得很有名。",
       "vi": "…còn có một số đạo diễn nhờ làm ra phim hay mà trở nên nổi tiếng.",
       "py": "…… háiyǒu yìxiē dǎoyǎn yīnwèi pāi chū le hǎo diànyǐng ér biànde hěn yǒumíng."
      },
      {
       "hz": "他花了三年的時間，最後寫出了一本大家都非常喜愛的3.我學做蛋糕學了很久，還是做不出讓自己滿意的蛋糕。",
       "vi": "Anh ấy mất ba năm, cuối cùng viết ra được một quyển … mà ai cũng rất yêu thích. Tôi học làm bánh kem rất lâu rồi, vẫn không làm ra được chiếc bánh khiến mình hài lòng.",
       "py": "Tā huā le sānnián de shíjiān, zuìhòu xiěchū le yìběn dàjiā dōu fēicháng xǐ'ài de 3. Wǒ xué zuò dàngāo xué le hěn jiǔ, háishì zuò bù chūràng zìjǐ mǎnyì de dàngāo."
      },
      {
       "hz": "A：今天下雨，我不去學校了。",
       "vi": "A: Hôm nay trời mưa, tôi không đến trường nữa.",
       "py": "A: Jīntiān xiàyǔ, wǒ bú qù xuéxiào le."
      },
      {
       "hz": "B：不行，就算下雪，也得去學校。",
       "vi": "B: Không được, dù có tuyết rơi cũng phải đến trường.",
       "py": "B: Bùxíng, jiùsuàn xiàxuě, yě děi qù xuéxiào."
      },
      {
       "hz": "這種為了夢想⋯⋯，就算累得不得了，東賢也覺得很開心、2.方小姐想多存一點兒錢，就算一天工作十二個小時也沒3.我覺得那個地區房子的價格都太高了，就算二十年不吃不喝也買不起。",
       "vi": "Vì ước mơ như thế này…, dù mệt vô cùng, Đông Hiền cũng thấy rất vui… Cô Phương muốn tiết kiệm thêm chút tiền, dù một ngày làm mười hai tiếng cũng không… Tôi thấy giá nhà ở khu đó đều quá cao, dù hai mươi năm không ăn không uống cũng không mua nổi.",
       "py": "Zhèzhǒng wèile mèngxiǎng……, jiùsuàn lèi de bùdéle, dōng xián yě juéde hěn kāixīn, 2. Fāng xiǎojiě xiǎng duō cún yìdiǎn'ér qián, jiùsuàn yìtiān gōngzuò shí'èrgè xiǎoshí yě méi 3. Wǒ juéde nàge dìqū fángzi de jiàgé dōu tài gāo le, jiùsuàn èrshínián bùchībùhē yě mǎibùqǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 出 + tân ngữ — làm ra, nghĩ ra",
   "giaiThich": "出 sau động từ vốn chỉ hướng từ trong ra ngoài (拿出). Ở bài này 出 chỉ kết quả: sau hành động thì SINH RA cái mới. Động từ hay dùng: 想, 做, 說, 穿, 拍, 寫, 找, 算, 研究."
  }
 ],
 "td3-2.1": [
  {
   "title": "1. 早就……了",
   "points": [
    {
     "label": null,
     "formula": "使用「早就⋯⋯了」表示說話的人感覺「很久以前已經⋯⋯了」。比如：「我早就知道他不能來了。」、「蛋糕早就被吃光了。」。",
     "examples": [
      {
       "hz": "朋子：臺灣的便利商店有送洗衣服的服務，我怎麼不知道？",
       "vi": "Tomoko: Cửa hàng tiện lợi ở Đài Loan có dịch vụ nhận giặt quần áo, sao tôi không biết nhỉ?",
       "py": "Péngzi: Táiwān de biànlìshāngdiàn yǒu sòng xǐyīfú de fúwù, wǒ zěnme bù zhīdào?"
      },
      {
       "hz": "尚恩：早就有了，挺方便的。",
       "vi": "Sean: Có từ lâu rồi, tiện lắm.",
       "py": "Shàng'ēn: Zǎojiù yǒu le, tǐng fāngbiàn de."
      },
      {
       "hz": "A：我剛才聽說小張為了照顧生病的奶奶，下個月就要離開公司了。",
       "vi": "A: Tôi vừa nghe nói Tiểu Trương vì chăm bà nội bị ốm nên tháng sau sẽ nghỉ việc ở công ty.",
       "py": "A: Wǒ gāngcái tīngshuō xiǎozhāng wèile zhàogù shēngbìng de nǎinai, xiàgèyuè jiùyào líkāi gōngsī le."
      },
      {
       "hz": "B：這件事大家早就知道了，你怎麼現在才知道？",
       "vi": "B: Chuyện này mọi người biết từ lâu rồi, sao bây giờ bạn mới biết?",
       "py": "B: Zhèjiàn shì dàjiā zǎojiù zhīdào le, nǐ zěnme xiànzài cái zhīdào?"
      },
      {
       "hz": "你不是早就計畫好要出國了嗎？怎麼出國前兩天才跟老闆",
       "vi": "Chẳng phải bạn đã lên kế hoạch ra nước ngoài từ lâu rồi sao? Sao đến hai ngày trước khi đi mới báo với ông chủ…",
       "py": "Nǐ búshì zǎojiù jìhuà hǎo yào chūguó le ma? Zěnme chūguóqián liǎngtiān cái gēn lǎobǎn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "早就……了 — sớm đã…",
   "giaiThich": "Người nói cảm thấy việc đó đã xảy ra từ lâu rồi (我早就知道他不能來了 — tôi biết từ lâu là anh ấy không đến được)."
  },
  {
   "title": "2. 順便",
   "points": [
    {
     "label": null,
     "formula": "表示趁著做某件事情時，同時做第二件事，但不會增加太多麻煩或花太多時間。一般用在拜託某人做某件事，例如：朋友要去郵局寄信，我請他順便買個信封。 「一會兒」作副詞，「一會兒⋯⋯，一會兒⋯⋯」表示兩種或多種情況先後或交替發生。說話的人覺得情況在很短的時間內改變，語氣有時有一點誇張。例如：「這幾天的天氣一會兒冷，一會兒熱，容易讓人感冒。」",
     "examples": [
      {
       "hz": "如果餓了，就順便買個泡麵，還能免費使用熱水，真方便。",
       "vi": "Nếu đói thì tiện thể mua gói mì ăn liền, còn được dùng nước nóng miễn phí, tiện thật.",
       "py": "Rúguǒ è le, jiù shùnbiàn mǎi gè pàomiàn, hái néng miǎnfèi shǐyòng rèshuǐ, zhēn fāngbiàn."
      },
      {
       "hz": "紀先生下班經過朋友家時，順便把幫朋友買的筆電送去了。",
       "vi": "Anh Kỷ tan làm đi ngang nhà bạn, tiện thể mang chiếc laptop mua giúp bạn qua luôn.",
       "py": "Jì xiānshēng xiàbān jīngguò péngyǒujiā shí, shùnbiàn bǎ bāng péngyǒu mǎi de bǐ diàn sòng qù le."
      },
      {
       "hz": "小龍跟顧客介紹新產品的時候，都會順便說說他自己使用",
       "vi": "Khi giới thiệu sản phẩm mới cho khách, Tiểu Long thường tiện thể kể về trải nghiệm tự dùng của mình…",
       "py": "Xiǎolóng gēn gùkè jièshào xīn chǎnpǐn de shíhòu, dōu huì shùnbiàn shuō shuō tā zìjǐ shǐyòng"
      },
      {
       "hz": "一會兒⋯⋯，一會兒⋯⋯",
       "vi": "lúc thì…, lúc thì…",
       "py": "Yīhuì'er……, yíhuì'er……"
      },
      {
       "hz": "臺灣便利商店的店員一會兒煮咖啡，一會兒擦桌子，太辛苦2. 今天整天下雨，風一會兒大，一會兒小，這樣的天氣出門真3. 最近來看房子的人多了起來，大家一會兒幫客人倒茶，一會兒帶客人參觀房子，所有的人都忙死了。",
       "vi": "Nhân viên cửa hàng tiện lợi ở Đài Loan lúc thì pha cà phê, lúc thì lau bàn, vất vả quá. Hôm nay mưa cả ngày, gió lúc mạnh lúc nhẹ, thời tiết thế này mà ra ngoài thật… Dạo này người đến xem nhà đông hẳn lên, mọi người lúc thì rót trà cho khách, lúc thì dẫn khách xem nhà, ai cũng bận tối mắt.",
       "py": "Táiwān biànlìshāngdiàn de diànyuán yíhuì'er zhǔ kāfēi, yíhuì'er cā zhuōzi, tài xīnkǔ 2. Jīntiān zhěngtiān xiàyǔ, fēng yíhuì'er dà, yíhuì'er xiǎo, zhèyàng de tiānqì chūmén zhēn 3. Zuìjìn láikàn fángzi de rén duō le qǐlái, dàjiā yíhuì'er bāng kèrén dào chá, yíhuì'er dài kèrén cānguān fángzi, suǒyǒu de rén dōu máng sǐ le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "順便 — tiện thể",
   "giaiThich": "Nhân lúc làm việc này thì làm luôn việc thứ hai, không tốn thêm mấy công sức. Hay dùng khi nhờ vả ai đó."
  },
  {
   "title": "4. 算了",
   "points": [
    {
     "label": null,
     "formula": "「算了」用於口語，表示說話的人對某個事物的情況不滿意，但是也不想再花時間、用太麻煩的辦法處理。「算了」可以單獨成句，也可以放在替代情況之後。例如，A：「對不起，我下個月很忙，不能跟你去旅行了。」B：「算了。」或「我找別人跟我去算了。」",
     "examples": [
      {
       "hz": "朋子：⋯⋯你可以去那裡領。",
       "vi": "Tomoko: …bạn có thể đến đó nhận.",
       "py": "Péngzi:…… nǐ kěyǐ qù nàlǐ lǐng."
      },
      {
       "hz": "尚恩：⋯⋯我在便利商店領算了。",
       "vi": "Sean: …thôi tôi nhận ở cửa hàng tiện lợi vậy.",
       "py": "Shàng'ēn:…… wǒ zài biànlìshāngdiàn lǐng suànle."
      },
      {
       "hz": "這幾天工作忙死了，晚上不想煮飯，我想就去便利商店買算3. A：我的手機不小心掉到馬桶裡了，怎麼辦？不知道修理費B：算了，我看別修理了，換支新的吧。",
       "vi": "Mấy hôm nay bận chết đi được, tối không muốn nấu cơm, thôi tôi ra cửa hàng tiện lợi mua vậy. A: Điện thoại của tôi không cẩn thận rơi vào bồn cầu rồi, làm sao đây? Không biết phí sửa… B: Thôi, tôi thấy đừng sửa nữa, mua cái mới đi.",
       "py": "Zhè jǐtiān gōngzuò máng sǐ le, wǎnshàng bùxiǎng zhǔfàn, wǒ xiǎng jiù qù biànlìshāngdiàn mǎi suàn 3. A: Wǒ de shǒujī bù xiǎoxīn diào dào mǎtǒng lǐ le, zěnmebàn? Bù zhīdào xiūlǐfèi B: Suànle, wǒ kàn bié xiūlǐ le, huànzhī xīn de ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "算了 — thôi vậy, bỏ đi",
   "giaiThich": "Khẩu ngữ: người nói không hài lòng nhưng cũng không muốn mất thêm thời gian hay xử lý rắc rối. Dùng đứng riêng một câu hoặc đặt sau phương án thay thế."
  },
  {
   "title": "1. V 開",
   "points": [
    {
     "label": null,
     "formula": "「開」當結果補語，有「本來在一起的東西分離」的意思，例如：打「開」、拉「開」。「開」也有「人或物離開本來的地方」的意思，例如：走「開」、離「開」、拿「開」等。也可以在結果補語「開」的前面加上可能補語「得」或「不」，例如：打「得」開、打「不」開、走「得」開、走「不」開等。",
     "examples": [
      {
       "hz": "在臺灣，許多人的生活離不開超商，⋯⋯2. A：這個門我開了半天就是打不開，你過來看看。",
       "vi": "Ở Đài Loan, cuộc sống của nhiều người không thể tách rời cửa hàng tiện lợi… A: Cái cửa này tôi mở mãi mà không mở ra được, bạn lại xem thử.",
       "py": "Zài Táiwān, xǔduō rén de shēnghuó líbùkāi chāo shāng,…… 2. A: Zhège mén wǒ kāi le bàntiān jiùshì dǎbùkāi, nǐ guòlái kànkàn."
      },
      {
       "hz": "B：你拿錯鑰匙了，怎麼打得開呢？",
       "vi": "B: Bạn cầm nhầm chìa khoá rồi, làm sao mở được?",
       "py": "B: Nǐ ná cuò yàoshi le, zěnme dǎ de kāi ne?"
      },
      {
       "hz": "A：媽媽，舅舅打電話給妳。",
       "vi": "A: Mẹ ơi, cậu gọi điện cho mẹ.",
       "py": "A: Māma, jiùjiù dǎdiànhuà gěi nǐ."
      },
      {
       "hz": "B：我在煎魚呢，走不開，跟他說我十分鐘後打過去。",
       "vi": "B: Mẹ đang rán cá, không đi ra được, bảo cậu mười phút nữa mẹ gọi lại.",
       "py": "B: Wǒ zài jiānyú ne, zǒubùkāi, gēn tā shuō wǒ shífēnzhōng hòu dǎ guòqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 開 — tách ra, rời ra",
   "giaiThich": "開 làm bổ ngữ kết quả: (1) vật vốn dính nhau nay tách ra (打開, 拉開), (2) người/vật rời khỏi chỗ cũ (走開, 離開, 拿開). Có thể thêm 得/不 thành khả năng: 打得開, 打不開."
  },
  {
   "title": "2. 經過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「經過」後面可接過去的一段時間，例如：他寫字寫得很慢，經過了兩個小時才把功課寫完。「經過」還可以接事情進行的過程，例如：我的電腦經過李老闆修理，好用多了。",
       "vi": "Sau “經過” có thể là một khoảng thời gian đã qua, ví dụ: Anh ấy viết chữ rất chậm, mất hai tiếng mới làm xong bài tập. “經過” còn có thể đi với quá trình diễn ra sự việc, ví dụ: Máy tính của tôi qua tay ông chủ Lý sửa, dùng tốt hơn nhiều.",
       "py": "“Jīngguò” hòumiàn kě jiēguò qù de yíduànshíjiān, lìrú: Tā xiězì xiě de hěn màn, jīngguò le liǎnggè xiǎoshí cái bǎ gōngkè xiě wán. “Jīngguò” hái kěyǐ jiē shìqíng jìnxíng de guòchéng, lìrú: Wǒ de diànnǎo jīngguò Lǐ lǎobǎn xiūlǐ, hǎo yòng duō le."
      },
      {
       "hz": "有一些超商每經過一段時間，就會舉辦活動⋯⋯2. 他以前一句中文都不會說，才經過三個月，現在不但朋友多了，買東西還會講價呢！",
       "vi": "Một số cửa hàng tiện lợi cứ sau một thời gian lại tổ chức hoạt động… Trước đây một câu tiếng Trung anh ấy cũng không biết nói, mới trải qua ba tháng, bây giờ không những có nhiều bạn mà mua đồ còn biết mặc cả nữa!",
       "py": "Yǒu yìxiē chāo shāng měi jīngguò yíduànshíjiān, jiù huì jǔbànhuódòng…… 2. Tā yǐqián yíjù zhōngwén dōu búhuì shuō, cái jīngguò sāngè yuè, xiànzài búdàn péngyǒu duō le, mǎi dōngxī hái huì jiǎngjià ne!"
      },
      {
       "hz": "我們社區的健身用品不夠，經過開會討論，決定下個月增加兩輛健身腳踏車。",
       "vi": "Dụng cụ tập thể dục ở khu dân cư chúng tôi không đủ, qua cuộc họp thảo luận, đã quyết định tháng sau bổ sung hai chiếc xe đạp tập.",
       "py": "Wǒmen shèqū de jiànshēn yòngpǐn búgòu, jīngguò kāihuìtǎolùn, juédìng xiàgèyuè zēngjiā liǎngliàng jiànshēn jiǎotàchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "經過 — trải qua, đi ngang qua",
   "giaiThich": "Dùng cho việc đi ngang qua một nơi, hoặc trải qua một quá trình rồi mới có kết quả."
  },
  {
   "title": "3. 用 NP（來）V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「用」有使用的意思。「用 NP（來）V」表示使用某種方法或手段做某一件事。這裡的「來」可以省略，句子的意思不變。例如：「老師用很多例子來說明語法」和「老師用很多例子說明語法」意思是一樣的。",
       "vi": "“用” có nghĩa là sử dụng. “用 NP (來) V” nghĩa là dùng một phương pháp hay phương tiện nào đó để làm một việc. Chữ “來” ở đây có thể lược bỏ mà nghĩa câu không đổi. Ví dụ: “Thầy giáo dùng nhiều ví dụ để giải thích ngữ pháp” — có hay không có “來” thì nghĩa đều như nhau.",
       "py": "“Yòng” yǒu shǐyòng de yìsi. “Yòng NP (lái) V” biǎoshì shǐyòng mǒuzhǒng fāngfǎ huò shǒuduàn zuò mǒu yíjiàn shì. Zhèlǐ de “lái” kěyǐ shěnglüè, jùzi de yìsi búbiàn. Lìrú: “Lǎoshī yòng hěnduō lìzi lái shuōmíng yǔfǎ” hàn “lǎoshī yòng hěnduō lìzi shuōmíng yǔfǎ” yìsi shì yíyàng de."
      },
      {
       "hz": "有一些超商⋯⋯用送神祕小禮物的方式來吸引顧客。",
       "vi": "Một số cửa hàng tiện lợi… dùng cách tặng quà bí mật nhỏ để thu hút khách hàng.",
       "py": "Yǒu yìxiē chāo shāng…… yòng sòng shénmì xiǎo lǐwù de fāngshì lái xīyǐn gùkè."
      },
      {
       "hz": "現在手機的功能很強，很多人都用手機來處理事情。",
       "vi": "Bây giờ điện thoại có chức năng rất mạnh, nhiều người dùng điện thoại để giải quyết công việc.",
       "py": "Xiànzài shǒujī de gōngnéng hěn qiáng, hěnduō rén dōu yòng shǒujī lái chǔlǐ shìqíng."
      },
      {
       "hz": "孔子常用講故事的方式來告訴學生做人做事的道理。",
       "vi": "Khổng Tử thường dùng cách kể chuyện để dạy học trò đạo lý làm người, làm việc.",
       "py": "Kǒngzi chángyòng jiǎnggùshì de fāngshì lái gàosù xuéshēng zuòrén zuòshì de dàolǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 + danh từ (來) + động từ — dùng… để…",
   "giaiThich": "Nêu công cụ, cách thức thực hiện hành động."
  }
 ],
 "td3-2.2": [
  {
   "title": "1. 早就……了",
   "points": [
    {
     "label": null,
     "formula": "使用「早就⋯⋯了」表示說話的人感覺「很久以前已經⋯⋯了」。比如：「我早就知道他不能來了。」、「蛋糕早就被吃光了。」。",
     "examples": [
      {
       "hz": "朋子：臺灣的便利商店有送洗衣服的服務，我怎麼不知道？",
       "vi": "Tomoko: Cửa hàng tiện lợi ở Đài Loan có dịch vụ nhận giặt quần áo, sao tôi không biết nhỉ?",
       "py": "Péngzi: Táiwān de biànlìshāngdiàn yǒu sòng xǐyīfú de fúwù, wǒ zěnme bù zhīdào?"
      },
      {
       "hz": "尚恩：早就有了，挺方便的。",
       "vi": "Sean: Có từ lâu rồi, tiện lắm.",
       "py": "Shàng'ēn: Zǎojiù yǒu le, tǐng fāngbiàn de."
      },
      {
       "hz": "A：我剛才聽說小張為了照顧生病的奶奶，下個月就要離開公司了。",
       "vi": "A: Tôi vừa nghe nói Tiểu Trương vì chăm bà nội bị ốm nên tháng sau sẽ nghỉ việc ở công ty.",
       "py": "A: Wǒ gāngcái tīngshuō xiǎozhāng wèile zhàogù shēngbìng de nǎinai, xiàgèyuè jiùyào líkāi gōngsī le."
      },
      {
       "hz": "B：這件事大家早就知道了，你怎麼現在才知道？",
       "vi": "B: Chuyện này mọi người biết từ lâu rồi, sao bây giờ bạn mới biết?",
       "py": "B: Zhèjiàn shì dàjiā zǎojiù zhīdào le, nǐ zěnme xiànzài cái zhīdào?"
      },
      {
       "hz": "你不是早就計畫好要出國了嗎？怎麼出國前兩天才跟老闆",
       "vi": "Chẳng phải bạn đã lên kế hoạch ra nước ngoài từ lâu rồi sao? Sao đến hai ngày trước khi đi mới báo với ông chủ…",
       "py": "Nǐ búshì zǎojiù jìhuà hǎo yào chūguó le ma? Zěnme chūguóqián liǎngtiān cái gēn lǎobǎn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "早就……了 — sớm đã…",
   "giaiThich": "Người nói cảm thấy việc đó đã xảy ra từ lâu rồi (我早就知道他不能來了 — tôi biết từ lâu là anh ấy không đến được)."
  },
  {
   "title": "2. 順便",
   "points": [
    {
     "label": null,
     "formula": "表示趁著做某件事情時，同時做第二件事，但不會增加太多麻煩或花太多時間。一般用在拜託某人做某件事，例如：朋友要去郵局寄信，我請他順便買個信封。 「一會兒」作副詞，「一會兒⋯⋯，一會兒⋯⋯」表示兩種或多種情況先後或交替發生。說話的人覺得情況在很短的時間內改變，語氣有時有一點誇張。例如：「這幾天的天氣一會兒冷，一會兒熱，容易讓人感冒。」",
     "examples": [
      {
       "hz": "如果餓了，就順便買個泡麵，還能免費使用熱水，真方便。",
       "vi": "Nếu đói thì tiện thể mua gói mì ăn liền, còn được dùng nước nóng miễn phí, tiện thật.",
       "py": "Rúguǒ è le, jiù shùnbiàn mǎi gè pàomiàn, hái néng miǎnfèi shǐyòng rèshuǐ, zhēn fāngbiàn."
      },
      {
       "hz": "紀先生下班經過朋友家時，順便把幫朋友買的筆電送去了。",
       "vi": "Anh Kỷ tan làm đi ngang nhà bạn, tiện thể mang chiếc laptop mua giúp bạn qua luôn.",
       "py": "Jì xiānshēng xiàbān jīngguò péngyǒujiā shí, shùnbiàn bǎ bāng péngyǒu mǎi de bǐ diàn sòng qù le."
      },
      {
       "hz": "小龍跟顧客介紹新產品的時候，都會順便說說他自己使用",
       "vi": "Khi giới thiệu sản phẩm mới cho khách, Tiểu Long thường tiện thể kể về trải nghiệm tự dùng của mình…",
       "py": "Xiǎolóng gēn gùkè jièshào xīn chǎnpǐn de shíhòu, dōu huì shùnbiàn shuō shuō tā zìjǐ shǐyòng"
      },
      {
       "hz": "一會兒⋯⋯，一會兒⋯⋯",
       "vi": "lúc thì…, lúc thì…",
       "py": "Yīhuì'er……, yíhuì'er……"
      },
      {
       "hz": "臺灣便利商店的店員一會兒煮咖啡，一會兒擦桌子，太辛苦2. 今天整天下雨，風一會兒大，一會兒小，這樣的天氣出門真3. 最近來看房子的人多了起來，大家一會兒幫客人倒茶，一會兒帶客人參觀房子，所有的人都忙死了。",
       "vi": "Nhân viên cửa hàng tiện lợi ở Đài Loan lúc thì pha cà phê, lúc thì lau bàn, vất vả quá. Hôm nay mưa cả ngày, gió lúc mạnh lúc nhẹ, thời tiết thế này mà ra ngoài thật… Dạo này người đến xem nhà đông hẳn lên, mọi người lúc thì rót trà cho khách, lúc thì dẫn khách xem nhà, ai cũng bận tối mắt.",
       "py": "Táiwān biànlìshāngdiàn de diànyuán yíhuì'er zhǔ kāfēi, yíhuì'er cā zhuōzi, tài xīnkǔ 2. Jīntiān zhěngtiān xiàyǔ, fēng yíhuì'er dà, yíhuì'er xiǎo, zhèyàng de tiānqì chūmén zhēn 3. Zuìjìn láikàn fángzi de rén duō le qǐlái, dàjiā yíhuì'er bāng kèrén dào chá, yíhuì'er dài kèrén cānguān fángzi, suǒyǒu de rén dōu máng sǐ le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "順便 — tiện thể",
   "giaiThich": "Nhân lúc làm việc này thì làm luôn việc thứ hai, không tốn thêm mấy công sức. Hay dùng khi nhờ vả ai đó."
  },
  {
   "title": "4. 算了",
   "points": [
    {
     "label": null,
     "formula": "「算了」用於口語，表示說話的人對某個事物的情況不滿意，但是也不想再花時間、用太麻煩的辦法處理。「算了」可以單獨成句，也可以放在替代情況之後。例如，A：「對不起，我下個月很忙，不能跟你去旅行了。」B：「算了。」或「我找別人跟我去算了。」",
     "examples": [
      {
       "hz": "朋子：⋯⋯你可以去那裡領。",
       "vi": "Tomoko: …bạn có thể đến đó nhận.",
       "py": "Péngzi:…… nǐ kěyǐ qù nàlǐ lǐng."
      },
      {
       "hz": "尚恩：⋯⋯我在便利商店領算了。",
       "vi": "Sean: …thôi tôi nhận ở cửa hàng tiện lợi vậy.",
       "py": "Shàng'ēn:…… wǒ zài biànlìshāngdiàn lǐng suànle."
      },
      {
       "hz": "這幾天工作忙死了，晚上不想煮飯，我想就去便利商店買算3. A：我的手機不小心掉到馬桶裡了，怎麼辦？不知道修理費B：算了，我看別修理了，換支新的吧。",
       "vi": "Mấy hôm nay bận chết đi được, tối không muốn nấu cơm, thôi tôi ra cửa hàng tiện lợi mua vậy. A: Điện thoại của tôi không cẩn thận rơi vào bồn cầu rồi, làm sao đây? Không biết phí sửa… B: Thôi, tôi thấy đừng sửa nữa, mua cái mới đi.",
       "py": "Zhè jǐtiān gōngzuò máng sǐ le, wǎnshàng bùxiǎng zhǔfàn, wǒ xiǎng jiù qù biànlìshāngdiàn mǎi suàn 3. A: Wǒ de shǒujī bù xiǎoxīn diào dào mǎtǒng lǐ le, zěnmebàn? Bù zhīdào xiūlǐfèi B: Suànle, wǒ kàn bié xiūlǐ le, huànzhī xīn de ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "算了 — thôi vậy, bỏ đi",
   "giaiThich": "Khẩu ngữ: người nói không hài lòng nhưng cũng không muốn mất thêm thời gian hay xử lý rắc rối. Dùng đứng riêng một câu hoặc đặt sau phương án thay thế."
  },
  {
   "title": "1. V 開",
   "points": [
    {
     "label": null,
     "formula": "「開」當結果補語，有「本來在一起的東西分離」的意思，例如：打「開」、拉「開」。「開」也有「人或物離開本來的地方」的意思，例如：走「開」、離「開」、拿「開」等。也可以在結果補語「開」的前面加上可能補語「得」或「不」，例如：打「得」開、打「不」開、走「得」開、走「不」開等。",
     "examples": [
      {
       "hz": "在臺灣，許多人的生活離不開超商，⋯⋯2. A：這個門我開了半天就是打不開，你過來看看。",
       "vi": "Ở Đài Loan, cuộc sống của nhiều người không thể tách rời cửa hàng tiện lợi… A: Cái cửa này tôi mở mãi mà không mở ra được, bạn lại xem thử.",
       "py": "Zài Táiwān, xǔduō rén de shēnghuó líbùkāi chāo shāng,…… 2. A: Zhège mén wǒ kāi le bàntiān jiùshì dǎbùkāi, nǐ guòlái kànkàn."
      },
      {
       "hz": "B：你拿錯鑰匙了，怎麼打得開呢？",
       "vi": "B: Bạn cầm nhầm chìa khoá rồi, làm sao mở được?",
       "py": "B: Nǐ ná cuò yàoshi le, zěnme dǎ de kāi ne?"
      },
      {
       "hz": "A：媽媽，舅舅打電話給妳。",
       "vi": "A: Mẹ ơi, cậu gọi điện cho mẹ.",
       "py": "A: Māma, jiùjiù dǎdiànhuà gěi nǐ."
      },
      {
       "hz": "B：我在煎魚呢，走不開，跟他說我十分鐘後打過去。",
       "vi": "B: Mẹ đang rán cá, không đi ra được, bảo cậu mười phút nữa mẹ gọi lại.",
       "py": "B: Wǒ zài jiānyú ne, zǒubùkāi, gēn tā shuō wǒ shífēnzhōng hòu dǎ guòqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 開 — tách ra, rời ra",
   "giaiThich": "開 làm bổ ngữ kết quả: (1) vật vốn dính nhau nay tách ra (打開, 拉開), (2) người/vật rời khỏi chỗ cũ (走開, 離開, 拿開). Có thể thêm 得/不 thành khả năng: 打得開, 打不開."
  },
  {
   "title": "2. 經過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「經過」後面可接過去的一段時間，例如：他寫字寫得很慢，經過了兩個小時才把功課寫完。「經過」還可以接事情進行的過程，例如：我的電腦經過李老闆修理，好用多了。",
       "vi": "Sau “經過” có thể là một khoảng thời gian đã qua, ví dụ: Anh ấy viết chữ rất chậm, mất hai tiếng mới làm xong bài tập. “經過” còn có thể đi với quá trình diễn ra sự việc, ví dụ: Máy tính của tôi qua tay ông chủ Lý sửa, dùng tốt hơn nhiều.",
       "py": "“Jīngguò” hòumiàn kě jiēguò qù de yíduànshíjiān, lìrú: Tā xiězì xiě de hěn màn, jīngguò le liǎnggè xiǎoshí cái bǎ gōngkè xiě wán. “Jīngguò” hái kěyǐ jiē shìqíng jìnxíng de guòchéng, lìrú: Wǒ de diànnǎo jīngguò Lǐ lǎobǎn xiūlǐ, hǎo yòng duō le."
      },
      {
       "hz": "有一些超商每經過一段時間，就會舉辦活動⋯⋯2. 他以前一句中文都不會說，才經過三個月，現在不但朋友多了，買東西還會講價呢！",
       "vi": "Một số cửa hàng tiện lợi cứ sau một thời gian lại tổ chức hoạt động… Trước đây một câu tiếng Trung anh ấy cũng không biết nói, mới trải qua ba tháng, bây giờ không những có nhiều bạn mà mua đồ còn biết mặc cả nữa!",
       "py": "Yǒu yìxiē chāo shāng měi jīngguò yíduànshíjiān, jiù huì jǔbànhuódòng…… 2. Tā yǐqián yíjù zhōngwén dōu búhuì shuō, cái jīngguò sāngè yuè, xiànzài búdàn péngyǒu duō le, mǎi dōngxī hái huì jiǎngjià ne!"
      },
      {
       "hz": "我們社區的健身用品不夠，經過開會討論，決定下個月增加兩輛健身腳踏車。",
       "vi": "Dụng cụ tập thể dục ở khu dân cư chúng tôi không đủ, qua cuộc họp thảo luận, đã quyết định tháng sau bổ sung hai chiếc xe đạp tập.",
       "py": "Wǒmen shèqū de jiànshēn yòngpǐn búgòu, jīngguò kāihuìtǎolùn, juédìng xiàgèyuè zēngjiā liǎngliàng jiànshēn jiǎotàchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "經過 — trải qua, đi ngang qua",
   "giaiThich": "Dùng cho việc đi ngang qua một nơi, hoặc trải qua một quá trình rồi mới có kết quả."
  },
  {
   "title": "3. 用 NP（來）V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「用」有使用的意思。「用 NP（來）V」表示使用某種方法或手段做某一件事。這裡的「來」可以省略，句子的意思不變。例如：「老師用很多例子來說明語法」和「老師用很多例子說明語法」意思是一樣的。",
       "vi": "“用” có nghĩa là sử dụng. “用 NP (來) V” nghĩa là dùng một phương pháp hay phương tiện nào đó để làm một việc. Chữ “來” ở đây có thể lược bỏ mà nghĩa câu không đổi. Ví dụ: “Thầy giáo dùng nhiều ví dụ để giải thích ngữ pháp” — có hay không có “來” thì nghĩa đều như nhau.",
       "py": "“Yòng” yǒu shǐyòng de yìsi. “Yòng NP (lái) V” biǎoshì shǐyòng mǒuzhǒng fāngfǎ huò shǒuduàn zuò mǒu yíjiàn shì. Zhèlǐ de “lái” kěyǐ shěnglüè, jùzi de yìsi búbiàn. Lìrú: “Lǎoshī yòng hěnduō lìzi lái shuōmíng yǔfǎ” hàn “lǎoshī yòng hěnduō lìzi shuōmíng yǔfǎ” yìsi shì yíyàng de."
      },
      {
       "hz": "有一些超商⋯⋯用送神祕小禮物的方式來吸引顧客。",
       "vi": "Một số cửa hàng tiện lợi… dùng cách tặng quà bí mật nhỏ để thu hút khách hàng.",
       "py": "Yǒu yìxiē chāo shāng…… yòng sòng shénmì xiǎo lǐwù de fāngshì lái xīyǐn gùkè."
      },
      {
       "hz": "現在手機的功能很強，很多人都用手機來處理事情。",
       "vi": "Bây giờ điện thoại có chức năng rất mạnh, nhiều người dùng điện thoại để giải quyết công việc.",
       "py": "Xiànzài shǒujī de gōngnéng hěn qiáng, hěnduō rén dōu yòng shǒujī lái chǔlǐ shìqíng."
      },
      {
       "hz": "孔子常用講故事的方式來告訴學生做人做事的道理。",
       "vi": "Khổng Tử thường dùng cách kể chuyện để dạy học trò đạo lý làm người, làm việc.",
       "py": "Kǒngzi chángyòng jiǎnggùshì de fāngshì lái gàosù xuéshēng zuòrén zuòshì de dàolǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 + danh từ (來) + động từ — dùng… để…",
   "giaiThich": "Nêu công cụ, cách thức thực hiện hành động."
  }
 ],
 "td3-2.3": [
  {
   "title": "1. 早就……了",
   "points": [
    {
     "label": null,
     "formula": "使用「早就⋯⋯了」表示說話的人感覺「很久以前已經⋯⋯了」。比如：「我早就知道他不能來了。」、「蛋糕早就被吃光了。」。",
     "examples": [
      {
       "hz": "朋子：臺灣的便利商店有送洗衣服的服務，我怎麼不知道？",
       "vi": "Tomoko: Cửa hàng tiện lợi ở Đài Loan có dịch vụ nhận giặt quần áo, sao tôi không biết nhỉ?",
       "py": "Péngzi: Táiwān de biànlìshāngdiàn yǒu sòng xǐyīfú de fúwù, wǒ zěnme bù zhīdào?"
      },
      {
       "hz": "尚恩：早就有了，挺方便的。",
       "vi": "Sean: Có từ lâu rồi, tiện lắm.",
       "py": "Shàng'ēn: Zǎojiù yǒu le, tǐng fāngbiàn de."
      },
      {
       "hz": "A：我剛才聽說小張為了照顧生病的奶奶，下個月就要離開公司了。",
       "vi": "A: Tôi vừa nghe nói Tiểu Trương vì chăm bà nội bị ốm nên tháng sau sẽ nghỉ việc ở công ty.",
       "py": "A: Wǒ gāngcái tīngshuō xiǎozhāng wèile zhàogù shēngbìng de nǎinai, xiàgèyuè jiùyào líkāi gōngsī le."
      },
      {
       "hz": "B：這件事大家早就知道了，你怎麼現在才知道？",
       "vi": "B: Chuyện này mọi người biết từ lâu rồi, sao bây giờ bạn mới biết?",
       "py": "B: Zhèjiàn shì dàjiā zǎojiù zhīdào le, nǐ zěnme xiànzài cái zhīdào?"
      },
      {
       "hz": "你不是早就計畫好要出國了嗎？怎麼出國前兩天才跟老闆",
       "vi": "Chẳng phải bạn đã lên kế hoạch ra nước ngoài từ lâu rồi sao? Sao đến hai ngày trước khi đi mới báo với ông chủ…",
       "py": "Nǐ búshì zǎojiù jìhuà hǎo yào chūguó le ma? Zěnme chūguóqián liǎngtiān cái gēn lǎobǎn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "早就……了 — sớm đã…",
   "giaiThich": "Người nói cảm thấy việc đó đã xảy ra từ lâu rồi (我早就知道他不能來了 — tôi biết từ lâu là anh ấy không đến được)."
  },
  {
   "title": "2. 順便",
   "points": [
    {
     "label": null,
     "formula": "表示趁著做某件事情時，同時做第二件事，但不會增加太多麻煩或花太多時間。一般用在拜託某人做某件事，例如：朋友要去郵局寄信，我請他順便買個信封。 「一會兒」作副詞，「一會兒⋯⋯，一會兒⋯⋯」表示兩種或多種情況先後或交替發生。說話的人覺得情況在很短的時間內改變，語氣有時有一點誇張。例如：「這幾天的天氣一會兒冷，一會兒熱，容易讓人感冒。」",
     "examples": [
      {
       "hz": "如果餓了，就順便買個泡麵，還能免費使用熱水，真方便。",
       "vi": "Nếu đói thì tiện thể mua gói mì ăn liền, còn được dùng nước nóng miễn phí, tiện thật.",
       "py": "Rúguǒ è le, jiù shùnbiàn mǎi gè pàomiàn, hái néng miǎnfèi shǐyòng rèshuǐ, zhēn fāngbiàn."
      },
      {
       "hz": "紀先生下班經過朋友家時，順便把幫朋友買的筆電送去了。",
       "vi": "Anh Kỷ tan làm đi ngang nhà bạn, tiện thể mang chiếc laptop mua giúp bạn qua luôn.",
       "py": "Jì xiānshēng xiàbān jīngguò péngyǒujiā shí, shùnbiàn bǎ bāng péngyǒu mǎi de bǐ diàn sòng qù le."
      },
      {
       "hz": "小龍跟顧客介紹新產品的時候，都會順便說說他自己使用",
       "vi": "Khi giới thiệu sản phẩm mới cho khách, Tiểu Long thường tiện thể kể về trải nghiệm tự dùng của mình…",
       "py": "Xiǎolóng gēn gùkè jièshào xīn chǎnpǐn de shíhòu, dōu huì shùnbiàn shuō shuō tā zìjǐ shǐyòng"
      },
      {
       "hz": "一會兒⋯⋯，一會兒⋯⋯",
       "vi": "lúc thì…, lúc thì…",
       "py": "Yīhuì'er……, yíhuì'er……"
      },
      {
       "hz": "臺灣便利商店的店員一會兒煮咖啡，一會兒擦桌子，太辛苦2. 今天整天下雨，風一會兒大，一會兒小，這樣的天氣出門真3. 最近來看房子的人多了起來，大家一會兒幫客人倒茶，一會兒帶客人參觀房子，所有的人都忙死了。",
       "vi": "Nhân viên cửa hàng tiện lợi ở Đài Loan lúc thì pha cà phê, lúc thì lau bàn, vất vả quá. Hôm nay mưa cả ngày, gió lúc mạnh lúc nhẹ, thời tiết thế này mà ra ngoài thật… Dạo này người đến xem nhà đông hẳn lên, mọi người lúc thì rót trà cho khách, lúc thì dẫn khách xem nhà, ai cũng bận tối mắt.",
       "py": "Táiwān biànlìshāngdiàn de diànyuán yíhuì'er zhǔ kāfēi, yíhuì'er cā zhuōzi, tài xīnkǔ 2. Jīntiān zhěngtiān xiàyǔ, fēng yíhuì'er dà, yíhuì'er xiǎo, zhèyàng de tiānqì chūmén zhēn 3. Zuìjìn láikàn fángzi de rén duō le qǐlái, dàjiā yíhuì'er bāng kèrén dào chá, yíhuì'er dài kèrén cānguān fángzi, suǒyǒu de rén dōu máng sǐ le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "順便 — tiện thể",
   "giaiThich": "Nhân lúc làm việc này thì làm luôn việc thứ hai, không tốn thêm mấy công sức. Hay dùng khi nhờ vả ai đó."
  },
  {
   "title": "4. 算了",
   "points": [
    {
     "label": null,
     "formula": "「算了」用於口語，表示說話的人對某個事物的情況不滿意，但是也不想再花時間、用太麻煩的辦法處理。「算了」可以單獨成句，也可以放在替代情況之後。例如，A：「對不起，我下個月很忙，不能跟你去旅行了。」B：「算了。」或「我找別人跟我去算了。」",
     "examples": [
      {
       "hz": "朋子：⋯⋯你可以去那裡領。",
       "vi": "Tomoko: …bạn có thể đến đó nhận.",
       "py": "Péngzi:…… nǐ kěyǐ qù nàlǐ lǐng."
      },
      {
       "hz": "尚恩：⋯⋯我在便利商店領算了。",
       "vi": "Sean: …thôi tôi nhận ở cửa hàng tiện lợi vậy.",
       "py": "Shàng'ēn:…… wǒ zài biànlìshāngdiàn lǐng suànle."
      },
      {
       "hz": "這幾天工作忙死了，晚上不想煮飯，我想就去便利商店買算3. A：我的手機不小心掉到馬桶裡了，怎麼辦？不知道修理費B：算了，我看別修理了，換支新的吧。",
       "vi": "Mấy hôm nay bận chết đi được, tối không muốn nấu cơm, thôi tôi ra cửa hàng tiện lợi mua vậy. A: Điện thoại của tôi không cẩn thận rơi vào bồn cầu rồi, làm sao đây? Không biết phí sửa… B: Thôi, tôi thấy đừng sửa nữa, mua cái mới đi.",
       "py": "Zhè jǐtiān gōngzuò máng sǐ le, wǎnshàng bùxiǎng zhǔfàn, wǒ xiǎng jiù qù biànlìshāngdiàn mǎi suàn 3. A: Wǒ de shǒujī bù xiǎoxīn diào dào mǎtǒng lǐ le, zěnmebàn? Bù zhīdào xiūlǐfèi B: Suànle, wǒ kàn bié xiūlǐ le, huànzhī xīn de ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "算了 — thôi vậy, bỏ đi",
   "giaiThich": "Khẩu ngữ: người nói không hài lòng nhưng cũng không muốn mất thêm thời gian hay xử lý rắc rối. Dùng đứng riêng một câu hoặc đặt sau phương án thay thế."
  },
  {
   "title": "1. V 開",
   "points": [
    {
     "label": null,
     "formula": "「開」當結果補語，有「本來在一起的東西分離」的意思，例如：打「開」、拉「開」。「開」也有「人或物離開本來的地方」的意思，例如：走「開」、離「開」、拿「開」等。也可以在結果補語「開」的前面加上可能補語「得」或「不」，例如：打「得」開、打「不」開、走「得」開、走「不」開等。",
     "examples": [
      {
       "hz": "在臺灣，許多人的生活離不開超商，⋯⋯2. A：這個門我開了半天就是打不開，你過來看看。",
       "vi": "Ở Đài Loan, cuộc sống của nhiều người không thể tách rời cửa hàng tiện lợi… A: Cái cửa này tôi mở mãi mà không mở ra được, bạn lại xem thử.",
       "py": "Zài Táiwān, xǔduō rén de shēnghuó líbùkāi chāo shāng,…… 2. A: Zhège mén wǒ kāi le bàntiān jiùshì dǎbùkāi, nǐ guòlái kànkàn."
      },
      {
       "hz": "B：你拿錯鑰匙了，怎麼打得開呢？",
       "vi": "B: Bạn cầm nhầm chìa khoá rồi, làm sao mở được?",
       "py": "B: Nǐ ná cuò yàoshi le, zěnme dǎ de kāi ne?"
      },
      {
       "hz": "A：媽媽，舅舅打電話給妳。",
       "vi": "A: Mẹ ơi, cậu gọi điện cho mẹ.",
       "py": "A: Māma, jiùjiù dǎdiànhuà gěi nǐ."
      },
      {
       "hz": "B：我在煎魚呢，走不開，跟他說我十分鐘後打過去。",
       "vi": "B: Mẹ đang rán cá, không đi ra được, bảo cậu mười phút nữa mẹ gọi lại.",
       "py": "B: Wǒ zài jiānyú ne, zǒubùkāi, gēn tā shuō wǒ shífēnzhōng hòu dǎ guòqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 開 — tách ra, rời ra",
   "giaiThich": "開 làm bổ ngữ kết quả: (1) vật vốn dính nhau nay tách ra (打開, 拉開), (2) người/vật rời khỏi chỗ cũ (走開, 離開, 拿開). Có thể thêm 得/不 thành khả năng: 打得開, 打不開."
  },
  {
   "title": "2. 經過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「經過」後面可接過去的一段時間，例如：他寫字寫得很慢，經過了兩個小時才把功課寫完。「經過」還可以接事情進行的過程，例如：我的電腦經過李老闆修理，好用多了。",
       "vi": "Sau “經過” có thể là một khoảng thời gian đã qua, ví dụ: Anh ấy viết chữ rất chậm, mất hai tiếng mới làm xong bài tập. “經過” còn có thể đi với quá trình diễn ra sự việc, ví dụ: Máy tính của tôi qua tay ông chủ Lý sửa, dùng tốt hơn nhiều.",
       "py": "“Jīngguò” hòumiàn kě jiēguò qù de yíduànshíjiān, lìrú: Tā xiězì xiě de hěn màn, jīngguò le liǎnggè xiǎoshí cái bǎ gōngkè xiě wán. “Jīngguò” hái kěyǐ jiē shìqíng jìnxíng de guòchéng, lìrú: Wǒ de diànnǎo jīngguò Lǐ lǎobǎn xiūlǐ, hǎo yòng duō le."
      },
      {
       "hz": "有一些超商每經過一段時間，就會舉辦活動⋯⋯2. 他以前一句中文都不會說，才經過三個月，現在不但朋友多了，買東西還會講價呢！",
       "vi": "Một số cửa hàng tiện lợi cứ sau một thời gian lại tổ chức hoạt động… Trước đây một câu tiếng Trung anh ấy cũng không biết nói, mới trải qua ba tháng, bây giờ không những có nhiều bạn mà mua đồ còn biết mặc cả nữa!",
       "py": "Yǒu yìxiē chāo shāng měi jīngguò yíduànshíjiān, jiù huì jǔbànhuódòng…… 2. Tā yǐqián yíjù zhōngwén dōu búhuì shuō, cái jīngguò sāngè yuè, xiànzài búdàn péngyǒu duō le, mǎi dōngxī hái huì jiǎngjià ne!"
      },
      {
       "hz": "我們社區的健身用品不夠，經過開會討論，決定下個月增加兩輛健身腳踏車。",
       "vi": "Dụng cụ tập thể dục ở khu dân cư chúng tôi không đủ, qua cuộc họp thảo luận, đã quyết định tháng sau bổ sung hai chiếc xe đạp tập.",
       "py": "Wǒmen shèqū de jiànshēn yòngpǐn búgòu, jīngguò kāihuìtǎolùn, juédìng xiàgèyuè zēngjiā liǎngliàng jiànshēn jiǎotàchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "經過 — trải qua, đi ngang qua",
   "giaiThich": "Dùng cho việc đi ngang qua một nơi, hoặc trải qua một quá trình rồi mới có kết quả."
  },
  {
   "title": "3. 用 NP（來）V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「用」有使用的意思。「用 NP（來）V」表示使用某種方法或手段做某一件事。這裡的「來」可以省略，句子的意思不變。例如：「老師用很多例子來說明語法」和「老師用很多例子說明語法」意思是一樣的。",
       "vi": "“用” có nghĩa là sử dụng. “用 NP (來) V” nghĩa là dùng một phương pháp hay phương tiện nào đó để làm một việc. Chữ “來” ở đây có thể lược bỏ mà nghĩa câu không đổi. Ví dụ: “Thầy giáo dùng nhiều ví dụ để giải thích ngữ pháp” — có hay không có “來” thì nghĩa đều như nhau.",
       "py": "“Yòng” yǒu shǐyòng de yìsi. “Yòng NP (lái) V” biǎoshì shǐyòng mǒuzhǒng fāngfǎ huò shǒuduàn zuò mǒu yíjiàn shì. Zhèlǐ de “lái” kěyǐ shěnglüè, jùzi de yìsi búbiàn. Lìrú: “Lǎoshī yòng hěnduō lìzi lái shuōmíng yǔfǎ” hàn “lǎoshī yòng hěnduō lìzi shuōmíng yǔfǎ” yìsi shì yíyàng de."
      },
      {
       "hz": "有一些超商⋯⋯用送神祕小禮物的方式來吸引顧客。",
       "vi": "Một số cửa hàng tiện lợi… dùng cách tặng quà bí mật nhỏ để thu hút khách hàng.",
       "py": "Yǒu yìxiē chāo shāng…… yòng sòng shénmì xiǎo lǐwù de fāngshì lái xīyǐn gùkè."
      },
      {
       "hz": "現在手機的功能很強，很多人都用手機來處理事情。",
       "vi": "Bây giờ điện thoại có chức năng rất mạnh, nhiều người dùng điện thoại để giải quyết công việc.",
       "py": "Xiànzài shǒujī de gōngnéng hěn qiáng, hěnduō rén dōu yòng shǒujī lái chǔlǐ shìqíng."
      },
      {
       "hz": "孔子常用講故事的方式來告訴學生做人做事的道理。",
       "vi": "Khổng Tử thường dùng cách kể chuyện để dạy học trò đạo lý làm người, làm việc.",
       "py": "Kǒngzi chángyòng jiǎnggùshì de fāngshì lái gàosù xuéshēng zuòrén zuòshì de dàolǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 + danh từ (來) + động từ — dùng… để…",
   "giaiThich": "Nêu công cụ, cách thức thực hiện hành động."
  }
 ],
 "td3-2.4": [
  {
   "title": "1. 早就……了",
   "points": [
    {
     "label": null,
     "formula": "使用「早就⋯⋯了」表示說話的人感覺「很久以前已經⋯⋯了」。比如：「我早就知道他不能來了。」、「蛋糕早就被吃光了。」。",
     "examples": [
      {
       "hz": "朋子：臺灣的便利商店有送洗衣服的服務，我怎麼不知道？",
       "vi": "Tomoko: Cửa hàng tiện lợi ở Đài Loan có dịch vụ nhận giặt quần áo, sao tôi không biết nhỉ?",
       "py": "Péngzi: Táiwān de biànlìshāngdiàn yǒu sòng xǐyīfú de fúwù, wǒ zěnme bù zhīdào?"
      },
      {
       "hz": "尚恩：早就有了，挺方便的。",
       "vi": "Sean: Có từ lâu rồi, tiện lắm.",
       "py": "Shàng'ēn: Zǎojiù yǒu le, tǐng fāngbiàn de."
      },
      {
       "hz": "A：我剛才聽說小張為了照顧生病的奶奶，下個月就要離開公司了。",
       "vi": "A: Tôi vừa nghe nói Tiểu Trương vì chăm bà nội bị ốm nên tháng sau sẽ nghỉ việc ở công ty.",
       "py": "A: Wǒ gāngcái tīngshuō xiǎozhāng wèile zhàogù shēngbìng de nǎinai, xiàgèyuè jiùyào líkāi gōngsī le."
      },
      {
       "hz": "B：這件事大家早就知道了，你怎麼現在才知道？",
       "vi": "B: Chuyện này mọi người biết từ lâu rồi, sao bây giờ bạn mới biết?",
       "py": "B: Zhèjiàn shì dàjiā zǎojiù zhīdào le, nǐ zěnme xiànzài cái zhīdào?"
      },
      {
       "hz": "你不是早就計畫好要出國了嗎？怎麼出國前兩天才跟老闆",
       "vi": "Chẳng phải bạn đã lên kế hoạch ra nước ngoài từ lâu rồi sao? Sao đến hai ngày trước khi đi mới báo với ông chủ…",
       "py": "Nǐ búshì zǎojiù jìhuà hǎo yào chūguó le ma? Zěnme chūguóqián liǎngtiān cái gēn lǎobǎn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "早就……了 — sớm đã…",
   "giaiThich": "Người nói cảm thấy việc đó đã xảy ra từ lâu rồi (我早就知道他不能來了 — tôi biết từ lâu là anh ấy không đến được)."
  },
  {
   "title": "2. 順便",
   "points": [
    {
     "label": null,
     "formula": "表示趁著做某件事情時，同時做第二件事，但不會增加太多麻煩或花太多時間。一般用在拜託某人做某件事，例如：朋友要去郵局寄信，我請他順便買個信封。 「一會兒」作副詞，「一會兒⋯⋯，一會兒⋯⋯」表示兩種或多種情況先後或交替發生。說話的人覺得情況在很短的時間內改變，語氣有時有一點誇張。例如：「這幾天的天氣一會兒冷，一會兒熱，容易讓人感冒。」",
     "examples": [
      {
       "hz": "如果餓了，就順便買個泡麵，還能免費使用熱水，真方便。",
       "vi": "Nếu đói thì tiện thể mua gói mì ăn liền, còn được dùng nước nóng miễn phí, tiện thật.",
       "py": "Rúguǒ è le, jiù shùnbiàn mǎi gè pàomiàn, hái néng miǎnfèi shǐyòng rèshuǐ, zhēn fāngbiàn."
      },
      {
       "hz": "紀先生下班經過朋友家時，順便把幫朋友買的筆電送去了。",
       "vi": "Anh Kỷ tan làm đi ngang nhà bạn, tiện thể mang chiếc laptop mua giúp bạn qua luôn.",
       "py": "Jì xiānshēng xiàbān jīngguò péngyǒujiā shí, shùnbiàn bǎ bāng péngyǒu mǎi de bǐ diàn sòng qù le."
      },
      {
       "hz": "小龍跟顧客介紹新產品的時候，都會順便說說他自己使用",
       "vi": "Khi giới thiệu sản phẩm mới cho khách, Tiểu Long thường tiện thể kể về trải nghiệm tự dùng của mình…",
       "py": "Xiǎolóng gēn gùkè jièshào xīn chǎnpǐn de shíhòu, dōu huì shùnbiàn shuō shuō tā zìjǐ shǐyòng"
      },
      {
       "hz": "一會兒⋯⋯，一會兒⋯⋯",
       "vi": "lúc thì…, lúc thì…",
       "py": "Yīhuì'er……, yíhuì'er……"
      },
      {
       "hz": "臺灣便利商店的店員一會兒煮咖啡，一會兒擦桌子，太辛苦2. 今天整天下雨，風一會兒大，一會兒小，這樣的天氣出門真3. 最近來看房子的人多了起來，大家一會兒幫客人倒茶，一會兒帶客人參觀房子，所有的人都忙死了。",
       "vi": "Nhân viên cửa hàng tiện lợi ở Đài Loan lúc thì pha cà phê, lúc thì lau bàn, vất vả quá. Hôm nay mưa cả ngày, gió lúc mạnh lúc nhẹ, thời tiết thế này mà ra ngoài thật… Dạo này người đến xem nhà đông hẳn lên, mọi người lúc thì rót trà cho khách, lúc thì dẫn khách xem nhà, ai cũng bận tối mắt.",
       "py": "Táiwān biànlìshāngdiàn de diànyuán yíhuì'er zhǔ kāfēi, yíhuì'er cā zhuōzi, tài xīnkǔ 2. Jīntiān zhěngtiān xiàyǔ, fēng yíhuì'er dà, yíhuì'er xiǎo, zhèyàng de tiānqì chūmén zhēn 3. Zuìjìn láikàn fángzi de rén duō le qǐlái, dàjiā yíhuì'er bāng kèrén dào chá, yíhuì'er dài kèrén cānguān fángzi, suǒyǒu de rén dōu máng sǐ le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "順便 — tiện thể",
   "giaiThich": "Nhân lúc làm việc này thì làm luôn việc thứ hai, không tốn thêm mấy công sức. Hay dùng khi nhờ vả ai đó."
  },
  {
   "title": "4. 算了",
   "points": [
    {
     "label": null,
     "formula": "「算了」用於口語，表示說話的人對某個事物的情況不滿意，但是也不想再花時間、用太麻煩的辦法處理。「算了」可以單獨成句，也可以放在替代情況之後。例如，A：「對不起，我下個月很忙，不能跟你去旅行了。」B：「算了。」或「我找別人跟我去算了。」",
     "examples": [
      {
       "hz": "朋子：⋯⋯你可以去那裡領。",
       "vi": "Tomoko: …bạn có thể đến đó nhận.",
       "py": "Péngzi:…… nǐ kěyǐ qù nàlǐ lǐng."
      },
      {
       "hz": "尚恩：⋯⋯我在便利商店領算了。",
       "vi": "Sean: …thôi tôi nhận ở cửa hàng tiện lợi vậy.",
       "py": "Shàng'ēn:…… wǒ zài biànlìshāngdiàn lǐng suànle."
      },
      {
       "hz": "這幾天工作忙死了，晚上不想煮飯，我想就去便利商店買算3. A：我的手機不小心掉到馬桶裡了，怎麼辦？不知道修理費B：算了，我看別修理了，換支新的吧。",
       "vi": "Mấy hôm nay bận chết đi được, tối không muốn nấu cơm, thôi tôi ra cửa hàng tiện lợi mua vậy. A: Điện thoại của tôi không cẩn thận rơi vào bồn cầu rồi, làm sao đây? Không biết phí sửa… B: Thôi, tôi thấy đừng sửa nữa, mua cái mới đi.",
       "py": "Zhè jǐtiān gōngzuò máng sǐ le, wǎnshàng bùxiǎng zhǔfàn, wǒ xiǎng jiù qù biànlìshāngdiàn mǎi suàn 3. A: Wǒ de shǒujī bù xiǎoxīn diào dào mǎtǒng lǐ le, zěnmebàn? Bù zhīdào xiūlǐfèi B: Suànle, wǒ kàn bié xiūlǐ le, huànzhī xīn de ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "算了 — thôi vậy, bỏ đi",
   "giaiThich": "Khẩu ngữ: người nói không hài lòng nhưng cũng không muốn mất thêm thời gian hay xử lý rắc rối. Dùng đứng riêng một câu hoặc đặt sau phương án thay thế."
  },
  {
   "title": "1. V 開",
   "points": [
    {
     "label": null,
     "formula": "「開」當結果補語，有「本來在一起的東西分離」的意思，例如：打「開」、拉「開」。「開」也有「人或物離開本來的地方」的意思，例如：走「開」、離「開」、拿「開」等。也可以在結果補語「開」的前面加上可能補語「得」或「不」，例如：打「得」開、打「不」開、走「得」開、走「不」開等。",
     "examples": [
      {
       "hz": "在臺灣，許多人的生活離不開超商，⋯⋯2. A：這個門我開了半天就是打不開，你過來看看。",
       "vi": "Ở Đài Loan, cuộc sống của nhiều người không thể tách rời cửa hàng tiện lợi… A: Cái cửa này tôi mở mãi mà không mở ra được, bạn lại xem thử.",
       "py": "Zài Táiwān, xǔduō rén de shēnghuó líbùkāi chāo shāng,…… 2. A: Zhège mén wǒ kāi le bàntiān jiùshì dǎbùkāi, nǐ guòlái kànkàn."
      },
      {
       "hz": "B：你拿錯鑰匙了，怎麼打得開呢？",
       "vi": "B: Bạn cầm nhầm chìa khoá rồi, làm sao mở được?",
       "py": "B: Nǐ ná cuò yàoshi le, zěnme dǎ de kāi ne?"
      },
      {
       "hz": "A：媽媽，舅舅打電話給妳。",
       "vi": "A: Mẹ ơi, cậu gọi điện cho mẹ.",
       "py": "A: Māma, jiùjiù dǎdiànhuà gěi nǐ."
      },
      {
       "hz": "B：我在煎魚呢，走不開，跟他說我十分鐘後打過去。",
       "vi": "B: Mẹ đang rán cá, không đi ra được, bảo cậu mười phút nữa mẹ gọi lại.",
       "py": "B: Wǒ zài jiānyú ne, zǒubùkāi, gēn tā shuō wǒ shífēnzhōng hòu dǎ guòqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 開 — tách ra, rời ra",
   "giaiThich": "開 làm bổ ngữ kết quả: (1) vật vốn dính nhau nay tách ra (打開, 拉開), (2) người/vật rời khỏi chỗ cũ (走開, 離開, 拿開). Có thể thêm 得/不 thành khả năng: 打得開, 打不開."
  },
  {
   "title": "2. 經過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「經過」後面可接過去的一段時間，例如：他寫字寫得很慢，經過了兩個小時才把功課寫完。「經過」還可以接事情進行的過程，例如：我的電腦經過李老闆修理，好用多了。",
       "vi": "Sau “經過” có thể là một khoảng thời gian đã qua, ví dụ: Anh ấy viết chữ rất chậm, mất hai tiếng mới làm xong bài tập. “經過” còn có thể đi với quá trình diễn ra sự việc, ví dụ: Máy tính của tôi qua tay ông chủ Lý sửa, dùng tốt hơn nhiều.",
       "py": "“Jīngguò” hòumiàn kě jiēguò qù de yíduànshíjiān, lìrú: Tā xiězì xiě de hěn màn, jīngguò le liǎnggè xiǎoshí cái bǎ gōngkè xiě wán. “Jīngguò” hái kěyǐ jiē shìqíng jìnxíng de guòchéng, lìrú: Wǒ de diànnǎo jīngguò Lǐ lǎobǎn xiūlǐ, hǎo yòng duō le."
      },
      {
       "hz": "有一些超商每經過一段時間，就會舉辦活動⋯⋯2. 他以前一句中文都不會說，才經過三個月，現在不但朋友多了，買東西還會講價呢！",
       "vi": "Một số cửa hàng tiện lợi cứ sau một thời gian lại tổ chức hoạt động… Trước đây một câu tiếng Trung anh ấy cũng không biết nói, mới trải qua ba tháng, bây giờ không những có nhiều bạn mà mua đồ còn biết mặc cả nữa!",
       "py": "Yǒu yìxiē chāo shāng měi jīngguò yíduànshíjiān, jiù huì jǔbànhuódòng…… 2. Tā yǐqián yíjù zhōngwén dōu búhuì shuō, cái jīngguò sāngè yuè, xiànzài búdàn péngyǒu duō le, mǎi dōngxī hái huì jiǎngjià ne!"
      },
      {
       "hz": "我們社區的健身用品不夠，經過開會討論，決定下個月增加兩輛健身腳踏車。",
       "vi": "Dụng cụ tập thể dục ở khu dân cư chúng tôi không đủ, qua cuộc họp thảo luận, đã quyết định tháng sau bổ sung hai chiếc xe đạp tập.",
       "py": "Wǒmen shèqū de jiànshēn yòngpǐn búgòu, jīngguò kāihuìtǎolùn, juédìng xiàgèyuè zēngjiā liǎngliàng jiànshēn jiǎotàchē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "經過 — trải qua, đi ngang qua",
   "giaiThich": "Dùng cho việc đi ngang qua một nơi, hoặc trải qua một quá trình rồi mới có kết quả."
  },
  {
   "title": "3. 用 NP（來）V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「用」有使用的意思。「用 NP（來）V」表示使用某種方法或手段做某一件事。這裡的「來」可以省略，句子的意思不變。例如：「老師用很多例子來說明語法」和「老師用很多例子說明語法」意思是一樣的。",
       "vi": "“用” có nghĩa là sử dụng. “用 NP (來) V” nghĩa là dùng một phương pháp hay phương tiện nào đó để làm một việc. Chữ “來” ở đây có thể lược bỏ mà nghĩa câu không đổi. Ví dụ: “Thầy giáo dùng nhiều ví dụ để giải thích ngữ pháp” — có hay không có “來” thì nghĩa đều như nhau.",
       "py": "“Yòng” yǒu shǐyòng de yìsi. “Yòng NP (lái) V” biǎoshì shǐyòng mǒuzhǒng fāngfǎ huò shǒuduàn zuò mǒu yíjiàn shì. Zhèlǐ de “lái” kěyǐ shěnglüè, jùzi de yìsi búbiàn. Lìrú: “Lǎoshī yòng hěnduō lìzi lái shuōmíng yǔfǎ” hàn “lǎoshī yòng hěnduō lìzi shuōmíng yǔfǎ” yìsi shì yíyàng de."
      },
      {
       "hz": "有一些超商⋯⋯用送神祕小禮物的方式來吸引顧客。",
       "vi": "Một số cửa hàng tiện lợi… dùng cách tặng quà bí mật nhỏ để thu hút khách hàng.",
       "py": "Yǒu yìxiē chāo shāng…… yòng sòng shénmì xiǎo lǐwù de fāngshì lái xīyǐn gùkè."
      },
      {
       "hz": "現在手機的功能很強，很多人都用手機來處理事情。",
       "vi": "Bây giờ điện thoại có chức năng rất mạnh, nhiều người dùng điện thoại để giải quyết công việc.",
       "py": "Xiànzài shǒujī de gōngnéng hěn qiáng, hěnduō rén dōu yòng shǒujī lái chǔlǐ shìqíng."
      },
      {
       "hz": "孔子常用講故事的方式來告訴學生做人做事的道理。",
       "vi": "Khổng Tử thường dùng cách kể chuyện để dạy học trò đạo lý làm người, làm việc.",
       "py": "Kǒngzi chángyòng jiǎnggùshì de fāngshì lái gàosù xuéshēng zuòrén zuòshì de dàolǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "用 + danh từ (來) + động từ — dùng… để…",
   "giaiThich": "Nêu công cụ, cách thức thực hiện hành động."
  }
 ],
 "td3-3.1": [
  {
   "title": "1. 試V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "決定購買或使用某物品以前，先試試看是不是真的喜歡、真的合適。這個「V」常是單音節的動詞，例如：吃、穿、用、喝、開等。",
       "vi": "Trước khi quyết định mua hoặc dùng một món đồ, hãy thử trước xem có thật sự thích, thật sự hợp không. “V” ở đây thường là động từ đơn âm tiết, ví dụ: ăn, mặc, dùng, uống, lái v.v.",
       "py": "Juédìng gòumǎi huò shǐyòng mǒu wùpǐn yǐqián, xiān shìshìkàn shìbúshì zhēnde xǐhuān, zhēnde héshì. Zhège “V” cháng shì dānyīnjié de dòngcí, lìrú: Chī, chuān, yòng, hē, kāi děng."
      },
      {
       "hz": "這套淺色的也很好看，妳都試穿一下吧！",
       "vi": "Bộ màu nhạt này cũng rất đẹp, chị mặc thử cả hai bộ đi!",
       "py": "Zhè tào qiǎnsè de yě hěn hǎokàn, nǐ dōu shìchuān yíxià ba!"
      },
      {
       "hz": "買床的時候一定要試躺，覺得舒服再買。",
       "vi": "Khi mua giường nhất định phải nằm thử, thấy thoải mái rồi hãy mua.",
       "py": "Mǎi chuáng de shíhòu yídìng yào shì tǎng, juéde shūfú zài mǎi."
      },
      {
       "hz": "那家超商提供新口味的飲料給客人免費試喝，喝過的人都說好喝。",
       "vi": "Cửa hàng tiện lợi đó mời khách uống thử miễn phí đồ uống vị mới, ai uống rồi cũng khen ngon.",
       "py": "Nà jiā chāo shāng tígōng xīn kǒuwèi de yǐnliào gěi kèrén miǎnfèi shì hē, hē guò de rén dōu shuō hǎohē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "試 + động từ — thử làm",
   "giaiThich": "Đặt 試 trước động từ để nói làm thử xem sao."
  },
  {
   "title": "2. V掉",
   "points": [
    {
     "label": null,
     "formula": "「掉」是補語，用在及物動詞的後面，有去除或出現不好的結果的意思，例如：吃掉、扔掉、賣掉、拿掉等。如果「掉」用在不及物動詞的後面，表示離開的意思，例如：走掉、飛掉、跑掉、壞掉等。 「什麼（……）都……」表示「全部、任何」，例如：「他什麼忙 都幫」表示他任何忙都會幫， 「我什麼東西都吃」表示任何東西我都吃。而「就是」的後面是唯一的選擇或不同的情況。例如：他什麼茶都喝，就是不喝紅茶。",
     "examples": [
      {
       "hz": "……沒穿幾次就破了，最後只好扔掉。",
       "vi": "…mặc chưa được mấy lần đã rách, cuối cùng đành vứt đi.",
       "py": "…… méi chuān jǐcì jiù pò le, zuìhòu zhǐhǎo rēngdiào."
      },
      {
       "hz": "A ：你那輛車不常開又舊得很，不如賣掉吧！",
       "vi": "A: Chiếc xe đó bạn ít khi lái lại cũ lắm rồi, chi bằng bán đi!",
       "py": "A: Nǐ nàliàngchē bù cháng kāi yòu jiù de hěn, bùrú màidiào ba!"
      },
      {
       "hz": "B ：它還能開，賣掉太可惜了。",
       "vi": "B: Nó vẫn chạy được, bán đi thì tiếc quá.",
       "py": "B: Tā hái néng kāi, màidiào tài kěxī le."
      },
      {
       "hz": "A ：我擔心送皮鞋給男朋友，他會跑掉。",
       "vi": "A: Tôi lo nếu tặng giày da cho bạn trai thì anh ấy sẽ chạy mất.",
       "py": "A: Wǒ dānxīn sòng píxié gěi nánpéngyǒu, tā huì pǎodiào."
      },
      {
       "hz": "B ：那就送他皮帶好了，這樣他就跑不掉了。",
       "vi": "B: Vậy tặng anh ấy thắt lưng đi, như thế anh ấy không chạy đi đâu được.",
       "py": "B: Nà jiù sòng tā pídài hǎo le, zhèyàng tā jiù pǎobúdiào le."
      },
      {
       "hz": "我覺得這個專櫃什麼都好，就是價格高了很多。",
       "vi": "Tôi thấy quầy hàng này cái gì cũng tốt, chỉ có điều giá cao hơn nhiều.",
       "py": "Wǒ juéde zhège zhuānguì shénme dōu hǎo, jiùshì jiàgé gāo le hěnduō."
      },
      {
       "hz": "我剛大學畢業，什麼工作都願意做，就是不能接受老闆要我每天加班。",
       "vi": "Tôi mới tốt nghiệp đại học, việc gì cũng sẵn sàng làm, chỉ không chấp nhận việc ông chủ bắt ngày nào cũng tăng ca.",
       "py": "Wǒ gāng dàxuébìyè, shénme gōngzuò dōu yuànyì zuò, jiùshì bùnéng jiēshòu lǎobǎn yào wǒ měitiān jiābān."
      },
      {
       "hz": "文小姐從設計學校畢業後，什麼服裝都設計過，就是沒設計過帽子。",
       "vi": "Cô Văn sau khi tốt nghiệp trường thiết kế, loại trang phục nào cũng đã từng thiết kế, chỉ chưa từng thiết kế mũ.",
       "py": "Wén xiǎojiě cóng shèjì xuéxiào bìyè hòu, shénme fúzhuāng dōu shèjì guò, jiùshì méi shèjì guò màozi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 掉 — mất đi, bỏ đi",
   "giaiThich": "掉 là bổ ngữ. Sau ngoại động từ: bỏ đi, mất đi, thường là kết quả không mong muốn (吃掉, 扔掉, 賣掉). Sau nội động từ: rời đi (走掉, 飛掉, 跑掉, 壞掉)."
  },
  {
   "title": "4. 別再……了/不再……了",
   "points": [
    {
     "label": null,
     "formula": "「別再……了」的意思是，說話的人建議或提醒對方不要再做某件事情了，例如：別再讓父母擔心了。如果說話的人要提醒自己或敘述別 人不再做某件事情了，就使用「不再……了」，例如：我不再喝酒了。 in disorderly fashion; act stupidly [foolishly]; muddle-headed; mixed up 「不僅」當連接詞，有「不但」的意思，多用在書面，後面的分句 句首用「還、也、而且」。",
     "examples": [
      {
       "hz": "……別再買了，妳還要去看球鞋呢！",
       "vi": "…đừng mua nữa, chị còn phải đi xem giày thể thao đấy!",
       "py": "…… bié zài mǎi le, nǐ háiyào qù kàn qiúxié ne!"
      },
      {
       "hz": "孩子：你別再幫我洗衣服了！我自己會洗。",
       "vi": "Con: Mẹ đừng giặt quần áo giúp con nữa! Con tự giặt được.",
       "py": "Háizi: Nǐ bié zài bāng wǒ xǐyīfú le! Wǒ zìjǐ huì xǐ."
      },
      {
       "hz": "媽媽：我怕你洗不乾淨，如果洗得乾淨，我就不再幫你洗太太：你的腳受傷了，別再踢足球了。",
       "vi": "Mẹ: Mẹ sợ con giặt không sạch, nếu con giặt sạch được thì mẹ sẽ không giặt giúp con nữa. Vợ: Chân anh bị thương rồi, đừng đá bóng nữa.",
       "py": "Māma: Wǒ pà nǐ xǐ bù gānjìng, rúguǒ xǐ de gānjìng, wǒ jiù búzài bāng nǐ xǐ tàitai: Nǐ de jiǎo shòushāng le, bié zài tīzúqiú le."
      },
      {
       "hz": "先生：要是這次比賽輸了，我就不再踢了。",
       "vi": "Chồng: Nếu trận này thua thì anh sẽ không đá nữa.",
       "py": "Xiānshēng: Yàoshì zhècì bǐsài shū le, wǒ jiù búzài tī le."
      },
      {
       "hz": "小藍看起來糊里糊塗的，其實做起事來仔細得很。",
       "vi": "Tiểu Lam trông có vẻ hồ đồ, thật ra làm việc cẩn thận lắm.",
       "py": "Xiǎo lán kànqǐlái húlǐhútú de, qíshí zuòqǐ shì lái zǐxì de hěn."
      },
      {
       "hz": "不僅……，還/也/而且……",
       "vi": "không những…, mà còn / cũng / hơn nữa…",
       "py": "Bùjǐn……, hái / yě / érqiě……"
      },
      {
       "hz": "購物時要多看幾家店，不僅要比一比價格，還要比一比品質。",
       "vi": "Khi mua sắm nên xem nhiều cửa hàng, không những phải so giá mà còn phải so chất lượng.",
       "py": "Gòuwù shí yào duō kàn jǐjiā diàn, bùjǐn yào bǐyìbǐ jiàgé, háiyào bǐyìbǐ pǐnzhí."
      },
      {
       "hz": "謝先生不僅性格開朗，工作也很認真、負責，所以同事都很喜歡他。",
       "vi": "Anh Tạ không những tính cách cởi mở mà làm việc cũng rất chăm chỉ, có trách nhiệm, nên đồng nghiệp ai cũng quý anh ấy.",
       "py": "Xiè xiānshēng bùjǐn xìnggékāilǎng, gōngzuò yě hěn rènzhēn, fùzé, suǒyǐ tóngshì dōu hěn xǐhuān tā."
      },
      {
       "hz": "照華人的傳統，除夕當天不僅要打掃、貼春聯，而且家人要在一起吃年夜飯。",
       "vi": "Theo truyền thống của người Hoa, ngày Giao thừa không những phải dọn dẹp, dán câu đối xuân, mà cả nhà còn phải cùng ăn bữa cơm tất niên.",
       "py": "Zhào huárén de chuántǒng, chúxì dàngtiān bùjǐn yào dǎsǎo, tiē chūnlián, érqiě jiārén yào zài yìqǐ chī niányèfàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "別再……了 / 不再……了 — đừng… nữa / không… nữa",
   "giaiThich": "別再……了 dùng khuyên người khác đừng làm gì nữa (別再讓父母擔心了). Còn 不再……了 dùng khi tự nhắc mình hoặc kể về người khác không làm việc đó nữa (我不再喝酒了)."
  },
  {
   "title": "2. NP一M比一M + Vs（了）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "說明事物或情況的程度逐漸變化。例如：天氣一天比一天熱了。",
       "vi": "Diễn tả mức độ của sự vật hay tình huống thay đổi dần dần. Ví dụ: Trời mỗi ngày một nóng hơn.",
       "py": "Shuōmíng shìwù huò qíngkuàng de chéngdù zhújiàn biànhuà. Lìrú: Tiānqì yìtiān bǐ yìtiān rè le."
      },
      {
       "hz": "那裡的商品常常是一樣比一樣便宜。",
       "vi": "Hàng hoá ở đó thường món sau rẻ hơn món trước.",
       "py": "Nàlǐ de shāngpǐn chángcháng shì yíyàng bǐ yíyàng piányi."
      },
      {
       "hz": "這個學期王小明很用功，考試的成績也一次比一次進步了。",
       "vi": "Học kỳ này Vương Tiểu Minh rất chăm chỉ, điểm thi cũng lần sau tiến bộ hơn lần trước.",
       "py": "Zhège xuéqí wángxiǎomíng hěn yònggōng, kǎoshì de chéngjì yě yícì bǐ yícì jìnbù le."
      },
      {
       "hz": "這個地區因為工廠越來越多的關係，空氣一年比一年差了。",
       "vi": "Do nhà máy ở khu vực này ngày càng nhiều, không khí mỗi năm một tệ hơn.",
       "py": "Zhège dìqū yīnwèi gōngchǎng yuèláiyuè duō de guānxì, kōngqì yìnián bǐ yìnián chà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "NP 一 + lượng từ + 比 + 一 + lượng từ + Vs",
   "giaiThich": "Diễn đạt mức độ tăng dần theo từng đơn vị: \"cái sau hơn cái trước\" (一天比一天冷 — mỗi ngày một lạnh hơn)."
  }
 ],
 "td3-3.2": [
  {
   "title": "1. 試V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "決定購買或使用某物品以前，先試試看是不是真的喜歡、真的合適。這個「V」常是單音節的動詞，例如：吃、穿、用、喝、開等。",
       "vi": "Trước khi quyết định mua hoặc dùng một món đồ, hãy thử trước xem có thật sự thích, thật sự hợp không. “V” ở đây thường là động từ đơn âm tiết, ví dụ: ăn, mặc, dùng, uống, lái v.v.",
       "py": "Juédìng gòumǎi huò shǐyòng mǒu wùpǐn yǐqián, xiān shìshìkàn shìbúshì zhēnde xǐhuān, zhēnde héshì. Zhège “V” cháng shì dānyīnjié de dòngcí, lìrú: Chī, chuān, yòng, hē, kāi děng."
      },
      {
       "hz": "這套淺色的也很好看，妳都試穿一下吧！",
       "vi": "Bộ màu nhạt này cũng rất đẹp, chị mặc thử cả hai bộ đi!",
       "py": "Zhè tào qiǎnsè de yě hěn hǎokàn, nǐ dōu shìchuān yíxià ba!"
      },
      {
       "hz": "買床的時候一定要試躺，覺得舒服再買。",
       "vi": "Khi mua giường nhất định phải nằm thử, thấy thoải mái rồi hãy mua.",
       "py": "Mǎi chuáng de shíhòu yídìng yào shì tǎng, juéde shūfú zài mǎi."
      },
      {
       "hz": "那家超商提供新口味的飲料給客人免費試喝，喝過的人都說好喝。",
       "vi": "Cửa hàng tiện lợi đó mời khách uống thử miễn phí đồ uống vị mới, ai uống rồi cũng khen ngon.",
       "py": "Nà jiā chāo shāng tígōng xīn kǒuwèi de yǐnliào gěi kèrén miǎnfèi shì hē, hē guò de rén dōu shuō hǎohē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "試 + động từ — thử làm",
   "giaiThich": "Đặt 試 trước động từ để nói làm thử xem sao."
  },
  {
   "title": "2. V掉",
   "points": [
    {
     "label": null,
     "formula": "「掉」是補語，用在及物動詞的後面，有去除或出現不好的結果的意思，例如：吃掉、扔掉、賣掉、拿掉等。如果「掉」用在不及物動詞的後面，表示離開的意思，例如：走掉、飛掉、跑掉、壞掉等。 「什麼（……）都……」表示「全部、任何」，例如：「他什麼忙 都幫」表示他任何忙都會幫， 「我什麼東西都吃」表示任何東西我都吃。而「就是」的後面是唯一的選擇或不同的情況。例如：他什麼茶都喝，就是不喝紅茶。",
     "examples": [
      {
       "hz": "……沒穿幾次就破了，最後只好扔掉。",
       "vi": "…mặc chưa được mấy lần đã rách, cuối cùng đành vứt đi.",
       "py": "…… méi chuān jǐcì jiù pò le, zuìhòu zhǐhǎo rēngdiào."
      },
      {
       "hz": "A ：你那輛車不常開又舊得很，不如賣掉吧！",
       "vi": "A: Chiếc xe đó bạn ít khi lái lại cũ lắm rồi, chi bằng bán đi!",
       "py": "A: Nǐ nàliàngchē bù cháng kāi yòu jiù de hěn, bùrú màidiào ba!"
      },
      {
       "hz": "B ：它還能開，賣掉太可惜了。",
       "vi": "B: Nó vẫn chạy được, bán đi thì tiếc quá.",
       "py": "B: Tā hái néng kāi, màidiào tài kěxī le."
      },
      {
       "hz": "A ：我擔心送皮鞋給男朋友，他會跑掉。",
       "vi": "A: Tôi lo nếu tặng giày da cho bạn trai thì anh ấy sẽ chạy mất.",
       "py": "A: Wǒ dānxīn sòng píxié gěi nánpéngyǒu, tā huì pǎodiào."
      },
      {
       "hz": "B ：那就送他皮帶好了，這樣他就跑不掉了。",
       "vi": "B: Vậy tặng anh ấy thắt lưng đi, như thế anh ấy không chạy đi đâu được.",
       "py": "B: Nà jiù sòng tā pídài hǎo le, zhèyàng tā jiù pǎobúdiào le."
      },
      {
       "hz": "我覺得這個專櫃什麼都好，就是價格高了很多。",
       "vi": "Tôi thấy quầy hàng này cái gì cũng tốt, chỉ có điều giá cao hơn nhiều.",
       "py": "Wǒ juéde zhège zhuānguì shénme dōu hǎo, jiùshì jiàgé gāo le hěnduō."
      },
      {
       "hz": "我剛大學畢業，什麼工作都願意做，就是不能接受老闆要我每天加班。",
       "vi": "Tôi mới tốt nghiệp đại học, việc gì cũng sẵn sàng làm, chỉ không chấp nhận việc ông chủ bắt ngày nào cũng tăng ca.",
       "py": "Wǒ gāng dàxuébìyè, shénme gōngzuò dōu yuànyì zuò, jiùshì bùnéng jiēshòu lǎobǎn yào wǒ měitiān jiābān."
      },
      {
       "hz": "文小姐從設計學校畢業後，什麼服裝都設計過，就是沒設計過帽子。",
       "vi": "Cô Văn sau khi tốt nghiệp trường thiết kế, loại trang phục nào cũng đã từng thiết kế, chỉ chưa từng thiết kế mũ.",
       "py": "Wén xiǎojiě cóng shèjì xuéxiào bìyè hòu, shénme fúzhuāng dōu shèjì guò, jiùshì méi shèjì guò màozi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 掉 — mất đi, bỏ đi",
   "giaiThich": "掉 là bổ ngữ. Sau ngoại động từ: bỏ đi, mất đi, thường là kết quả không mong muốn (吃掉, 扔掉, 賣掉). Sau nội động từ: rời đi (走掉, 飛掉, 跑掉, 壞掉)."
  },
  {
   "title": "4. 別再……了/不再……了",
   "points": [
    {
     "label": null,
     "formula": "「別再……了」的意思是，說話的人建議或提醒對方不要再做某件事情了，例如：別再讓父母擔心了。如果說話的人要提醒自己或敘述別 人不再做某件事情了，就使用「不再……了」，例如：我不再喝酒了。 in disorderly fashion; act stupidly [foolishly]; muddle-headed; mixed up 「不僅」當連接詞，有「不但」的意思，多用在書面，後面的分句 句首用「還、也、而且」。",
     "examples": [
      {
       "hz": "……別再買了，妳還要去看球鞋呢！",
       "vi": "…đừng mua nữa, chị còn phải đi xem giày thể thao đấy!",
       "py": "…… bié zài mǎi le, nǐ háiyào qù kàn qiúxié ne!"
      },
      {
       "hz": "孩子：你別再幫我洗衣服了！我自己會洗。",
       "vi": "Con: Mẹ đừng giặt quần áo giúp con nữa! Con tự giặt được.",
       "py": "Háizi: Nǐ bié zài bāng wǒ xǐyīfú le! Wǒ zìjǐ huì xǐ."
      },
      {
       "hz": "媽媽：我怕你洗不乾淨，如果洗得乾淨，我就不再幫你洗太太：你的腳受傷了，別再踢足球了。",
       "vi": "Mẹ: Mẹ sợ con giặt không sạch, nếu con giặt sạch được thì mẹ sẽ không giặt giúp con nữa. Vợ: Chân anh bị thương rồi, đừng đá bóng nữa.",
       "py": "Māma: Wǒ pà nǐ xǐ bù gānjìng, rúguǒ xǐ de gānjìng, wǒ jiù búzài bāng nǐ xǐ tàitai: Nǐ de jiǎo shòushāng le, bié zài tīzúqiú le."
      },
      {
       "hz": "先生：要是這次比賽輸了，我就不再踢了。",
       "vi": "Chồng: Nếu trận này thua thì anh sẽ không đá nữa.",
       "py": "Xiānshēng: Yàoshì zhècì bǐsài shū le, wǒ jiù búzài tī le."
      },
      {
       "hz": "小藍看起來糊里糊塗的，其實做起事來仔細得很。",
       "vi": "Tiểu Lam trông có vẻ hồ đồ, thật ra làm việc cẩn thận lắm.",
       "py": "Xiǎo lán kànqǐlái húlǐhútú de, qíshí zuòqǐ shì lái zǐxì de hěn."
      },
      {
       "hz": "不僅……，還/也/而且……",
       "vi": "không những…, mà còn / cũng / hơn nữa…",
       "py": "Bùjǐn……, hái / yě / érqiě……"
      },
      {
       "hz": "購物時要多看幾家店，不僅要比一比價格，還要比一比品質。",
       "vi": "Khi mua sắm nên xem nhiều cửa hàng, không những phải so giá mà còn phải so chất lượng.",
       "py": "Gòuwù shí yào duō kàn jǐjiā diàn, bùjǐn yào bǐyìbǐ jiàgé, háiyào bǐyìbǐ pǐnzhí."
      },
      {
       "hz": "謝先生不僅性格開朗，工作也很認真、負責，所以同事都很喜歡他。",
       "vi": "Anh Tạ không những tính cách cởi mở mà làm việc cũng rất chăm chỉ, có trách nhiệm, nên đồng nghiệp ai cũng quý anh ấy.",
       "py": "Xiè xiānshēng bùjǐn xìnggékāilǎng, gōngzuò yě hěn rènzhēn, fùzé, suǒyǐ tóngshì dōu hěn xǐhuān tā."
      },
      {
       "hz": "照華人的傳統，除夕當天不僅要打掃、貼春聯，而且家人要在一起吃年夜飯。",
       "vi": "Theo truyền thống của người Hoa, ngày Giao thừa không những phải dọn dẹp, dán câu đối xuân, mà cả nhà còn phải cùng ăn bữa cơm tất niên.",
       "py": "Zhào huárén de chuántǒng, chúxì dàngtiān bùjǐn yào dǎsǎo, tiē chūnlián, érqiě jiārén yào zài yìqǐ chī niányèfàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "別再……了 / 不再……了 — đừng… nữa / không… nữa",
   "giaiThich": "別再……了 dùng khuyên người khác đừng làm gì nữa (別再讓父母擔心了). Còn 不再……了 dùng khi tự nhắc mình hoặc kể về người khác không làm việc đó nữa (我不再喝酒了)."
  },
  {
   "title": "2. NP一M比一M + Vs（了）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "說明事物或情況的程度逐漸變化。例如：天氣一天比一天熱了。",
       "vi": "Diễn tả mức độ của sự vật hay tình huống thay đổi dần dần. Ví dụ: Trời mỗi ngày một nóng hơn.",
       "py": "Shuōmíng shìwù huò qíngkuàng de chéngdù zhújiàn biànhuà. Lìrú: Tiānqì yìtiān bǐ yìtiān rè le."
      },
      {
       "hz": "那裡的商品常常是一樣比一樣便宜。",
       "vi": "Hàng hoá ở đó thường món sau rẻ hơn món trước.",
       "py": "Nàlǐ de shāngpǐn chángcháng shì yíyàng bǐ yíyàng piányi."
      },
      {
       "hz": "這個學期王小明很用功，考試的成績也一次比一次進步了。",
       "vi": "Học kỳ này Vương Tiểu Minh rất chăm chỉ, điểm thi cũng lần sau tiến bộ hơn lần trước.",
       "py": "Zhège xuéqí wángxiǎomíng hěn yònggōng, kǎoshì de chéngjì yě yícì bǐ yícì jìnbù le."
      },
      {
       "hz": "這個地區因為工廠越來越多的關係，空氣一年比一年差了。",
       "vi": "Do nhà máy ở khu vực này ngày càng nhiều, không khí mỗi năm một tệ hơn.",
       "py": "Zhège dìqū yīnwèi gōngchǎng yuèláiyuè duō de guānxì, kōngqì yìnián bǐ yìnián chà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "NP 一 + lượng từ + 比 + 一 + lượng từ + Vs",
   "giaiThich": "Diễn đạt mức độ tăng dần theo từng đơn vị: \"cái sau hơn cái trước\" (一天比一天冷 — mỗi ngày một lạnh hơn)."
  }
 ],
 "td3-3.3": [
  {
   "title": "1. 試V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "決定購買或使用某物品以前，先試試看是不是真的喜歡、真的合適。這個「V」常是單音節的動詞，例如：吃、穿、用、喝、開等。",
       "vi": "Trước khi quyết định mua hoặc dùng một món đồ, hãy thử trước xem có thật sự thích, thật sự hợp không. “V” ở đây thường là động từ đơn âm tiết, ví dụ: ăn, mặc, dùng, uống, lái v.v.",
       "py": "Juédìng gòumǎi huò shǐyòng mǒu wùpǐn yǐqián, xiān shìshìkàn shìbúshì zhēnde xǐhuān, zhēnde héshì. Zhège “V” cháng shì dānyīnjié de dòngcí, lìrú: Chī, chuān, yòng, hē, kāi děng."
      },
      {
       "hz": "這套淺色的也很好看，妳都試穿一下吧！",
       "vi": "Bộ màu nhạt này cũng rất đẹp, chị mặc thử cả hai bộ đi!",
       "py": "Zhè tào qiǎnsè de yě hěn hǎokàn, nǐ dōu shìchuān yíxià ba!"
      },
      {
       "hz": "買床的時候一定要試躺，覺得舒服再買。",
       "vi": "Khi mua giường nhất định phải nằm thử, thấy thoải mái rồi hãy mua.",
       "py": "Mǎi chuáng de shíhòu yídìng yào shì tǎng, juéde shūfú zài mǎi."
      },
      {
       "hz": "那家超商提供新口味的飲料給客人免費試喝，喝過的人都說好喝。",
       "vi": "Cửa hàng tiện lợi đó mời khách uống thử miễn phí đồ uống vị mới, ai uống rồi cũng khen ngon.",
       "py": "Nà jiā chāo shāng tígōng xīn kǒuwèi de yǐnliào gěi kèrén miǎnfèi shì hē, hē guò de rén dōu shuō hǎohē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "試 + động từ — thử làm",
   "giaiThich": "Đặt 試 trước động từ để nói làm thử xem sao."
  },
  {
   "title": "2. V掉",
   "points": [
    {
     "label": null,
     "formula": "「掉」是補語，用在及物動詞的後面，有去除或出現不好的結果的意思，例如：吃掉、扔掉、賣掉、拿掉等。如果「掉」用在不及物動詞的後面，表示離開的意思，例如：走掉、飛掉、跑掉、壞掉等。 「什麼（……）都……」表示「全部、任何」，例如：「他什麼忙 都幫」表示他任何忙都會幫， 「我什麼東西都吃」表示任何東西我都吃。而「就是」的後面是唯一的選擇或不同的情況。例如：他什麼茶都喝，就是不喝紅茶。",
     "examples": [
      {
       "hz": "……沒穿幾次就破了，最後只好扔掉。",
       "vi": "…mặc chưa được mấy lần đã rách, cuối cùng đành vứt đi.",
       "py": "…… méi chuān jǐcì jiù pò le, zuìhòu zhǐhǎo rēngdiào."
      },
      {
       "hz": "A ：你那輛車不常開又舊得很，不如賣掉吧！",
       "vi": "A: Chiếc xe đó bạn ít khi lái lại cũ lắm rồi, chi bằng bán đi!",
       "py": "A: Nǐ nàliàngchē bù cháng kāi yòu jiù de hěn, bùrú màidiào ba!"
      },
      {
       "hz": "B ：它還能開，賣掉太可惜了。",
       "vi": "B: Nó vẫn chạy được, bán đi thì tiếc quá.",
       "py": "B: Tā hái néng kāi, màidiào tài kěxī le."
      },
      {
       "hz": "A ：我擔心送皮鞋給男朋友，他會跑掉。",
       "vi": "A: Tôi lo nếu tặng giày da cho bạn trai thì anh ấy sẽ chạy mất.",
       "py": "A: Wǒ dānxīn sòng píxié gěi nánpéngyǒu, tā huì pǎodiào."
      },
      {
       "hz": "B ：那就送他皮帶好了，這樣他就跑不掉了。",
       "vi": "B: Vậy tặng anh ấy thắt lưng đi, như thế anh ấy không chạy đi đâu được.",
       "py": "B: Nà jiù sòng tā pídài hǎo le, zhèyàng tā jiù pǎobúdiào le."
      },
      {
       "hz": "我覺得這個專櫃什麼都好，就是價格高了很多。",
       "vi": "Tôi thấy quầy hàng này cái gì cũng tốt, chỉ có điều giá cao hơn nhiều.",
       "py": "Wǒ juéde zhège zhuānguì shénme dōu hǎo, jiùshì jiàgé gāo le hěnduō."
      },
      {
       "hz": "我剛大學畢業，什麼工作都願意做，就是不能接受老闆要我每天加班。",
       "vi": "Tôi mới tốt nghiệp đại học, việc gì cũng sẵn sàng làm, chỉ không chấp nhận việc ông chủ bắt ngày nào cũng tăng ca.",
       "py": "Wǒ gāng dàxuébìyè, shénme gōngzuò dōu yuànyì zuò, jiùshì bùnéng jiēshòu lǎobǎn yào wǒ měitiān jiābān."
      },
      {
       "hz": "文小姐從設計學校畢業後，什麼服裝都設計過，就是沒設計過帽子。",
       "vi": "Cô Văn sau khi tốt nghiệp trường thiết kế, loại trang phục nào cũng đã từng thiết kế, chỉ chưa từng thiết kế mũ.",
       "py": "Wén xiǎojiě cóng shèjì xuéxiào bìyè hòu, shénme fúzhuāng dōu shèjì guò, jiùshì méi shèjì guò màozi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 掉 — mất đi, bỏ đi",
   "giaiThich": "掉 là bổ ngữ. Sau ngoại động từ: bỏ đi, mất đi, thường là kết quả không mong muốn (吃掉, 扔掉, 賣掉). Sau nội động từ: rời đi (走掉, 飛掉, 跑掉, 壞掉)."
  },
  {
   "title": "4. 別再……了/不再……了",
   "points": [
    {
     "label": null,
     "formula": "「別再……了」的意思是，說話的人建議或提醒對方不要再做某件事情了，例如：別再讓父母擔心了。如果說話的人要提醒自己或敘述別 人不再做某件事情了，就使用「不再……了」，例如：我不再喝酒了。 in disorderly fashion; act stupidly [foolishly]; muddle-headed; mixed up 「不僅」當連接詞，有「不但」的意思，多用在書面，後面的分句 句首用「還、也、而且」。",
     "examples": [
      {
       "hz": "……別再買了，妳還要去看球鞋呢！",
       "vi": "…đừng mua nữa, chị còn phải đi xem giày thể thao đấy!",
       "py": "…… bié zài mǎi le, nǐ háiyào qù kàn qiúxié ne!"
      },
      {
       "hz": "孩子：你別再幫我洗衣服了！我自己會洗。",
       "vi": "Con: Mẹ đừng giặt quần áo giúp con nữa! Con tự giặt được.",
       "py": "Háizi: Nǐ bié zài bāng wǒ xǐyīfú le! Wǒ zìjǐ huì xǐ."
      },
      {
       "hz": "媽媽：我怕你洗不乾淨，如果洗得乾淨，我就不再幫你洗太太：你的腳受傷了，別再踢足球了。",
       "vi": "Mẹ: Mẹ sợ con giặt không sạch, nếu con giặt sạch được thì mẹ sẽ không giặt giúp con nữa. Vợ: Chân anh bị thương rồi, đừng đá bóng nữa.",
       "py": "Māma: Wǒ pà nǐ xǐ bù gānjìng, rúguǒ xǐ de gānjìng, wǒ jiù búzài bāng nǐ xǐ tàitai: Nǐ de jiǎo shòushāng le, bié zài tīzúqiú le."
      },
      {
       "hz": "先生：要是這次比賽輸了，我就不再踢了。",
       "vi": "Chồng: Nếu trận này thua thì anh sẽ không đá nữa.",
       "py": "Xiānshēng: Yàoshì zhècì bǐsài shū le, wǒ jiù búzài tī le."
      },
      {
       "hz": "小藍看起來糊里糊塗的，其實做起事來仔細得很。",
       "vi": "Tiểu Lam trông có vẻ hồ đồ, thật ra làm việc cẩn thận lắm.",
       "py": "Xiǎo lán kànqǐlái húlǐhútú de, qíshí zuòqǐ shì lái zǐxì de hěn."
      },
      {
       "hz": "不僅……，還/也/而且……",
       "vi": "không những…, mà còn / cũng / hơn nữa…",
       "py": "Bùjǐn……, hái / yě / érqiě……"
      },
      {
       "hz": "購物時要多看幾家店，不僅要比一比價格，還要比一比品質。",
       "vi": "Khi mua sắm nên xem nhiều cửa hàng, không những phải so giá mà còn phải so chất lượng.",
       "py": "Gòuwù shí yào duō kàn jǐjiā diàn, bùjǐn yào bǐyìbǐ jiàgé, háiyào bǐyìbǐ pǐnzhí."
      },
      {
       "hz": "謝先生不僅性格開朗，工作也很認真、負責，所以同事都很喜歡他。",
       "vi": "Anh Tạ không những tính cách cởi mở mà làm việc cũng rất chăm chỉ, có trách nhiệm, nên đồng nghiệp ai cũng quý anh ấy.",
       "py": "Xiè xiānshēng bùjǐn xìnggékāilǎng, gōngzuò yě hěn rènzhēn, fùzé, suǒyǐ tóngshì dōu hěn xǐhuān tā."
      },
      {
       "hz": "照華人的傳統，除夕當天不僅要打掃、貼春聯，而且家人要在一起吃年夜飯。",
       "vi": "Theo truyền thống của người Hoa, ngày Giao thừa không những phải dọn dẹp, dán câu đối xuân, mà cả nhà còn phải cùng ăn bữa cơm tất niên.",
       "py": "Zhào huárén de chuántǒng, chúxì dàngtiān bùjǐn yào dǎsǎo, tiē chūnlián, érqiě jiārén yào zài yìqǐ chī niányèfàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "別再……了 / 不再……了 — đừng… nữa / không… nữa",
   "giaiThich": "別再……了 dùng khuyên người khác đừng làm gì nữa (別再讓父母擔心了). Còn 不再……了 dùng khi tự nhắc mình hoặc kể về người khác không làm việc đó nữa (我不再喝酒了)."
  },
  {
   "title": "2. NP一M比一M + Vs（了）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "說明事物或情況的程度逐漸變化。例如：天氣一天比一天熱了。",
       "vi": "Diễn tả mức độ của sự vật hay tình huống thay đổi dần dần. Ví dụ: Trời mỗi ngày một nóng hơn.",
       "py": "Shuōmíng shìwù huò qíngkuàng de chéngdù zhújiàn biànhuà. Lìrú: Tiānqì yìtiān bǐ yìtiān rè le."
      },
      {
       "hz": "那裡的商品常常是一樣比一樣便宜。",
       "vi": "Hàng hoá ở đó thường món sau rẻ hơn món trước.",
       "py": "Nàlǐ de shāngpǐn chángcháng shì yíyàng bǐ yíyàng piányi."
      },
      {
       "hz": "這個學期王小明很用功，考試的成績也一次比一次進步了。",
       "vi": "Học kỳ này Vương Tiểu Minh rất chăm chỉ, điểm thi cũng lần sau tiến bộ hơn lần trước.",
       "py": "Zhège xuéqí wángxiǎomíng hěn yònggōng, kǎoshì de chéngjì yě yícì bǐ yícì jìnbù le."
      },
      {
       "hz": "這個地區因為工廠越來越多的關係，空氣一年比一年差了。",
       "vi": "Do nhà máy ở khu vực này ngày càng nhiều, không khí mỗi năm một tệ hơn.",
       "py": "Zhège dìqū yīnwèi gōngchǎng yuèláiyuè duō de guānxì, kōngqì yìnián bǐ yìnián chà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "NP 一 + lượng từ + 比 + 一 + lượng từ + Vs",
   "giaiThich": "Diễn đạt mức độ tăng dần theo từng đơn vị: \"cái sau hơn cái trước\" (一天比一天冷 — mỗi ngày một lạnh hơn)."
  }
 ],
 "td3-3.4": [
  {
   "title": "1. 試V",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "決定購買或使用某物品以前，先試試看是不是真的喜歡、真的合適。這個「V」常是單音節的動詞，例如：吃、穿、用、喝、開等。",
       "vi": "Trước khi quyết định mua hoặc dùng một món đồ, hãy thử trước xem có thật sự thích, thật sự hợp không. “V” ở đây thường là động từ đơn âm tiết, ví dụ: ăn, mặc, dùng, uống, lái v.v.",
       "py": "Juédìng gòumǎi huò shǐyòng mǒu wùpǐn yǐqián, xiān shìshìkàn shìbúshì zhēnde xǐhuān, zhēnde héshì. Zhège “V” cháng shì dānyīnjié de dòngcí, lìrú: Chī, chuān, yòng, hē, kāi děng."
      },
      {
       "hz": "這套淺色的也很好看，妳都試穿一下吧！",
       "vi": "Bộ màu nhạt này cũng rất đẹp, chị mặc thử cả hai bộ đi!",
       "py": "Zhè tào qiǎnsè de yě hěn hǎokàn, nǐ dōu shìchuān yíxià ba!"
      },
      {
       "hz": "買床的時候一定要試躺，覺得舒服再買。",
       "vi": "Khi mua giường nhất định phải nằm thử, thấy thoải mái rồi hãy mua.",
       "py": "Mǎi chuáng de shíhòu yídìng yào shì tǎng, juéde shūfú zài mǎi."
      },
      {
       "hz": "那家超商提供新口味的飲料給客人免費試喝，喝過的人都說好喝。",
       "vi": "Cửa hàng tiện lợi đó mời khách uống thử miễn phí đồ uống vị mới, ai uống rồi cũng khen ngon.",
       "py": "Nà jiā chāo shāng tígōng xīn kǒuwèi de yǐnliào gěi kèrén miǎnfèi shì hē, hē guò de rén dōu shuō hǎohē."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "試 + động từ — thử làm",
   "giaiThich": "Đặt 試 trước động từ để nói làm thử xem sao."
  },
  {
   "title": "2. V掉",
   "points": [
    {
     "label": null,
     "formula": "「掉」是補語，用在及物動詞的後面，有去除或出現不好的結果的意思，例如：吃掉、扔掉、賣掉、拿掉等。如果「掉」用在不及物動詞的後面，表示離開的意思，例如：走掉、飛掉、跑掉、壞掉等。 「什麼（……）都……」表示「全部、任何」，例如：「他什麼忙 都幫」表示他任何忙都會幫， 「我什麼東西都吃」表示任何東西我都吃。而「就是」的後面是唯一的選擇或不同的情況。例如：他什麼茶都喝，就是不喝紅茶。",
     "examples": [
      {
       "hz": "……沒穿幾次就破了，最後只好扔掉。",
       "vi": "…mặc chưa được mấy lần đã rách, cuối cùng đành vứt đi.",
       "py": "…… méi chuān jǐcì jiù pò le, zuìhòu zhǐhǎo rēngdiào."
      },
      {
       "hz": "A ：你那輛車不常開又舊得很，不如賣掉吧！",
       "vi": "A: Chiếc xe đó bạn ít khi lái lại cũ lắm rồi, chi bằng bán đi!",
       "py": "A: Nǐ nàliàngchē bù cháng kāi yòu jiù de hěn, bùrú màidiào ba!"
      },
      {
       "hz": "B ：它還能開，賣掉太可惜了。",
       "vi": "B: Nó vẫn chạy được, bán đi thì tiếc quá.",
       "py": "B: Tā hái néng kāi, màidiào tài kěxī le."
      },
      {
       "hz": "A ：我擔心送皮鞋給男朋友，他會跑掉。",
       "vi": "A: Tôi lo nếu tặng giày da cho bạn trai thì anh ấy sẽ chạy mất.",
       "py": "A: Wǒ dānxīn sòng píxié gěi nánpéngyǒu, tā huì pǎodiào."
      },
      {
       "hz": "B ：那就送他皮帶好了，這樣他就跑不掉了。",
       "vi": "B: Vậy tặng anh ấy thắt lưng đi, như thế anh ấy không chạy đi đâu được.",
       "py": "B: Nà jiù sòng tā pídài hǎo le, zhèyàng tā jiù pǎobúdiào le."
      },
      {
       "hz": "我覺得這個專櫃什麼都好，就是價格高了很多。",
       "vi": "Tôi thấy quầy hàng này cái gì cũng tốt, chỉ có điều giá cao hơn nhiều.",
       "py": "Wǒ juéde zhège zhuānguì shénme dōu hǎo, jiùshì jiàgé gāo le hěnduō."
      },
      {
       "hz": "我剛大學畢業，什麼工作都願意做，就是不能接受老闆要我每天加班。",
       "vi": "Tôi mới tốt nghiệp đại học, việc gì cũng sẵn sàng làm, chỉ không chấp nhận việc ông chủ bắt ngày nào cũng tăng ca.",
       "py": "Wǒ gāng dàxuébìyè, shénme gōngzuò dōu yuànyì zuò, jiùshì bùnéng jiēshòu lǎobǎn yào wǒ měitiān jiābān."
      },
      {
       "hz": "文小姐從設計學校畢業後，什麼服裝都設計過，就是沒設計過帽子。",
       "vi": "Cô Văn sau khi tốt nghiệp trường thiết kế, loại trang phục nào cũng đã từng thiết kế, chỉ chưa từng thiết kế mũ.",
       "py": "Wén xiǎojiě cóng shèjì xuéxiào bìyè hòu, shénme fúzhuāng dōu shèjì guò, jiùshì méi shèjì guò màozi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 掉 — mất đi, bỏ đi",
   "giaiThich": "掉 là bổ ngữ. Sau ngoại động từ: bỏ đi, mất đi, thường là kết quả không mong muốn (吃掉, 扔掉, 賣掉). Sau nội động từ: rời đi (走掉, 飛掉, 跑掉, 壞掉)."
  },
  {
   "title": "4. 別再……了/不再……了",
   "points": [
    {
     "label": null,
     "formula": "「別再……了」的意思是，說話的人建議或提醒對方不要再做某件事情了，例如：別再讓父母擔心了。如果說話的人要提醒自己或敘述別 人不再做某件事情了，就使用「不再……了」，例如：我不再喝酒了。 in disorderly fashion; act stupidly [foolishly]; muddle-headed; mixed up 「不僅」當連接詞，有「不但」的意思，多用在書面，後面的分句 句首用「還、也、而且」。",
     "examples": [
      {
       "hz": "……別再買了，妳還要去看球鞋呢！",
       "vi": "…đừng mua nữa, chị còn phải đi xem giày thể thao đấy!",
       "py": "…… bié zài mǎi le, nǐ háiyào qù kàn qiúxié ne!"
      },
      {
       "hz": "孩子：你別再幫我洗衣服了！我自己會洗。",
       "vi": "Con: Mẹ đừng giặt quần áo giúp con nữa! Con tự giặt được.",
       "py": "Háizi: Nǐ bié zài bāng wǒ xǐyīfú le! Wǒ zìjǐ huì xǐ."
      },
      {
       "hz": "媽媽：我怕你洗不乾淨，如果洗得乾淨，我就不再幫你洗太太：你的腳受傷了，別再踢足球了。",
       "vi": "Mẹ: Mẹ sợ con giặt không sạch, nếu con giặt sạch được thì mẹ sẽ không giặt giúp con nữa. Vợ: Chân anh bị thương rồi, đừng đá bóng nữa.",
       "py": "Māma: Wǒ pà nǐ xǐ bù gānjìng, rúguǒ xǐ de gānjìng, wǒ jiù búzài bāng nǐ xǐ tàitai: Nǐ de jiǎo shòushāng le, bié zài tīzúqiú le."
      },
      {
       "hz": "先生：要是這次比賽輸了，我就不再踢了。",
       "vi": "Chồng: Nếu trận này thua thì anh sẽ không đá nữa.",
       "py": "Xiānshēng: Yàoshì zhècì bǐsài shū le, wǒ jiù búzài tī le."
      },
      {
       "hz": "小藍看起來糊里糊塗的，其實做起事來仔細得很。",
       "vi": "Tiểu Lam trông có vẻ hồ đồ, thật ra làm việc cẩn thận lắm.",
       "py": "Xiǎo lán kànqǐlái húlǐhútú de, qíshí zuòqǐ shì lái zǐxì de hěn."
      },
      {
       "hz": "不僅……，還/也/而且……",
       "vi": "không những…, mà còn / cũng / hơn nữa…",
       "py": "Bùjǐn……, hái / yě / érqiě……"
      },
      {
       "hz": "購物時要多看幾家店，不僅要比一比價格，還要比一比品質。",
       "vi": "Khi mua sắm nên xem nhiều cửa hàng, không những phải so giá mà còn phải so chất lượng.",
       "py": "Gòuwù shí yào duō kàn jǐjiā diàn, bùjǐn yào bǐyìbǐ jiàgé, háiyào bǐyìbǐ pǐnzhí."
      },
      {
       "hz": "謝先生不僅性格開朗，工作也很認真、負責，所以同事都很喜歡他。",
       "vi": "Anh Tạ không những tính cách cởi mở mà làm việc cũng rất chăm chỉ, có trách nhiệm, nên đồng nghiệp ai cũng quý anh ấy.",
       "py": "Xiè xiānshēng bùjǐn xìnggékāilǎng, gōngzuò yě hěn rènzhēn, fùzé, suǒyǐ tóngshì dōu hěn xǐhuān tā."
      },
      {
       "hz": "照華人的傳統，除夕當天不僅要打掃、貼春聯，而且家人要在一起吃年夜飯。",
       "vi": "Theo truyền thống của người Hoa, ngày Giao thừa không những phải dọn dẹp, dán câu đối xuân, mà cả nhà còn phải cùng ăn bữa cơm tất niên.",
       "py": "Zhào huárén de chuántǒng, chúxì dàngtiān bùjǐn yào dǎsǎo, tiē chūnlián, érqiě jiārén yào zài yìqǐ chī niányèfàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "別再……了 / 不再……了 — đừng… nữa / không… nữa",
   "giaiThich": "別再……了 dùng khuyên người khác đừng làm gì nữa (別再讓父母擔心了). Còn 不再……了 dùng khi tự nhắc mình hoặc kể về người khác không làm việc đó nữa (我不再喝酒了)."
  },
  {
   "title": "2. NP一M比一M + Vs（了）",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "說明事物或情況的程度逐漸變化。例如：天氣一天比一天熱了。",
       "vi": "Diễn tả mức độ của sự vật hay tình huống thay đổi dần dần. Ví dụ: Trời mỗi ngày một nóng hơn.",
       "py": "Shuōmíng shìwù huò qíngkuàng de chéngdù zhújiàn biànhuà. Lìrú: Tiānqì yìtiān bǐ yìtiān rè le."
      },
      {
       "hz": "那裡的商品常常是一樣比一樣便宜。",
       "vi": "Hàng hoá ở đó thường món sau rẻ hơn món trước.",
       "py": "Nàlǐ de shāngpǐn chángcháng shì yíyàng bǐ yíyàng piányi."
      },
      {
       "hz": "這個學期王小明很用功，考試的成績也一次比一次進步了。",
       "vi": "Học kỳ này Vương Tiểu Minh rất chăm chỉ, điểm thi cũng lần sau tiến bộ hơn lần trước.",
       "py": "Zhège xuéqí wángxiǎomíng hěn yònggōng, kǎoshì de chéngjì yě yícì bǐ yícì jìnbù le."
      },
      {
       "hz": "這個地區因為工廠越來越多的關係，空氣一年比一年差了。",
       "vi": "Do nhà máy ở khu vực này ngày càng nhiều, không khí mỗi năm một tệ hơn.",
       "py": "Zhège dìqū yīnwèi gōngchǎng yuèláiyuè duō de guānxì, kōngqì yìnián bǐ yìnián chà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "NP 一 + lượng từ + 比 + 一 + lượng từ + Vs",
   "giaiThich": "Diễn đạt mức độ tăng dần theo từng đơn vị: \"cái sau hơn cái trước\" (一天比一天冷 — mỗi ngày một lạnh hơn)."
  }
 ],
 "td3-4.1": [
  {
   "title": "3. 終於",
   "points": [
    {
     "label": null,
     "formula": "「終於」是副詞。表示經過一個很長的過程，最後好不容易達到希望、期待或預期的結果。「終於」的前面是主語，後面可以接動詞或不 及物狀態動詞（Vs）。句尾加「了」表示狀態的變化。 I look forward to hearing the patter of tiny feet.",
     "examples": [
      {
       "hz": "……現在我終於比較了解了。",
       "vi": "…bây giờ cuối cùng tôi cũng hiểu hơn rồi.",
       "py": "…… xiànzài wǒ zhōngyú bǐjiào liǎojiě le."
      },
      {
       "hz": "我家附近上個星期終於有一家設備新、空間大的健身房了。",
       "vi": "Tuần trước gần nhà tôi cuối cùng cũng có một phòng gym thiết bị mới, không gian rộng.",
       "py": "Wǒjiā fùjìn shànggèxīngqí zhōngyú yǒu yìjiā shèbèi xīn, kōngjiān dà de jiànshēnfáng le."
      },
      {
       "hz": "媽媽到了機場才發現護照不見了，找來找去，終於在她的口袋裡找到了，真糊塗啊！",
       "vi": "Mẹ đến sân bay mới phát hiện hộ chiếu không thấy đâu, tìm tới tìm lui, cuối cùng tìm thấy trong túi áo của mẹ, đúng là đãng trí!",
       "py": "Māma dào le jīchǎng cái fāxiàn hùzhào bújiàn le, zhǎoláizhǎoqù, zhōngyú zài tā de kǒudài lǐ zhǎodào le, zhēn hútú a!"
      },
      {
       "hz": "我去參加朋友的婚禮，除了送紅包，還祝福他們事事如意、早生貴子、永遠幸福。",
       "vi": "Tôi đi dự đám cưới của bạn, ngoài mừng phong bì đỏ, còn chúc họ vạn sự như ý, sớm sinh quý tử, hạnh phúc mãi mãi.",
       "py": "Wǒ qù cānjiā péngyǒu de hūnlǐ, chúle sòng hóngbāo, hái zhùfú tāmen shìshìrúyì, zǎoshēngguìzi, yǒngyuǎn xìngfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "終於 — cuối cùng thì…",
   "giaiThich": "Phó từ. Sau một quá trình dài mới đạt được kết quả mong đợi. Đứng sau chủ ngữ, trước động từ hoặc tính từ; cuối câu thường thêm 了."
  },
  {
   "title": "1. V個不停/ V個沒完",
   "points": [
    {
     "label": null,
     "formula": "「V 個不停」強調同樣的動作在短時間內不斷地重複，例如：這幾天雨下個不停。而「V 個沒完」強調做某動作時，不想或是沒辦法停止，例如：昨天剛考完試，今天又考了，每天考試考個沒完。「V 個沒完」一般用在說話的人對這樣的情況覺得不好或感到不耐煩。",
     "examples": [
      {
       "hz": "開心時，會笑個不停；傷心時，會哭個不停。",
       "vi": "Khi vui thì cười không ngớt; khi buồn thì khóc mãi không thôi.",
       "py": "Kāixīn shí, huì xiào gè bùtíng; shāngxīn shí, huì kū gè bùtíng."
      },
      {
       "hz": "最近工作很多，我們每天開會開個不停，電話也接個不停，累死了。",
       "vi": "Dạo này nhiều việc, ngày nào chúng tôi cũng họp liên miên, điện thoại cũng nghe không ngớt, mệt chết đi được.",
       "py": "Zuìjìn gōngzuò hěnduō, wǒmen měitiān kāihuì kāi gè bùtíng, diànhuà yě jiē gè bùtíng, lèisǐ le."
      },
      {
       "hz": "我的雙胞胎兒子整天吵個沒完、哭個沒完，真不知道怎麼辦才好。",
       "vi": "Hai cậu con trai sinh đôi của tôi suốt ngày cãi nhau không dứt, khóc mãi không thôi, tôi thật không biết phải làm sao.",
       "py": "Wǒ de shuāngbāotāi érzi zhěngtiān chǎo gè méiwán, kū gè méiwán, zhēnbùzhīdào zěnmebàn cái hǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 個不停 / V 個沒完 — … không ngừng",
   "giaiThich": "V 個不停 nhấn mạnh hành động lặp đi lặp lại liên tục trong thời gian ngắn (雨下個不停). V 個沒完 nhấn mạnh không muốn hoặc không thể dừng, thường kèm sự sốt ruột, khó chịu của người nói."
  },
  {
   "title": "2. 不 Vs₁ 不 Vs₂",
   "points": [
    {
     "label": null,
     "formula": "「不 Vs₁ 不 Vs₂」說明介於「Vs₁」和「Vs₂」兩者之間的程度，表示說話的人覺得適中、適宜、舒服的，數量或程度正好。例如：不大不小、不多不少、不高不矮、不新不舊等。兩個Vs都必須是單音詞，而且意思相反，如：大小、多少、高矮、新舊、遠近、快慢、好壞、冷熱等。 「不是……，就是……」為選擇複句，表示「不是」後面的人事物和「就是」後面的人事物，兩個當中一定有一個發生或成立，沒有其他的情況或選擇。例如：教室裡的書包不是小美的，就是小麗的。",
     "examples": [
      {
       "hz": "女人生了孩子以後得休息一個月，不多不少，就是三十天。",
       "vi": "Phụ nữ sau khi sinh con phải nghỉ một tháng, không nhiều không ít, đúng ba mươi ngày.",
       "py": "Nǚrén shēng le háizi yǐhòu de xiūxí yígèyuè, bùduōbùshǎo, jiùshì sānshítiān."
      },
      {
       "hz": "這種不冷不熱的天氣舒服極了，不但適合野餐、露營，還很適合爬山。",
       "vi": "Thời tiết không nóng không lạnh thế này dễ chịu vô cùng, không những hợp để dã ngoại, cắm trại mà còn rất hợp để leo núi.",
       "py": "Zhèzhǒng bùlěngbúrè de tiānqì shūfú jíle, búdàn shìhé yěcān, lùyíng, hái hěn shìhé páshān."
      },
      {
       "hz": "林老師說話的速度不快不慢，例子的說明也很清楚，學生很容易就明白了。",
       "vi": "Cô Lâm nói không nhanh không chậm, giải thích ví dụ cũng rất rõ ràng, học sinh rất dễ hiểu.",
       "py": "Lín lǎoshī shuōhuà de sùdù búkuàibúmàn, lìzi de shuōmíng yě hěn qīngchǔ, xuéshēng hěn róngyì jiù míngbái le."
      },
      {
       "hz": "這個語法強調如果「除了」後面的人事物排除，就只有「就是」後面的人事物。「以外」可以省略。例如：「我來臺灣除了學中文以外，就是工作」、「他週末除了爬山，就是在家打掃」。",
       "vi": "Mẫu ngữ pháp này nhấn mạnh: nếu loại trừ người/việc/vật đứng sau “除了” thì chỉ còn người/việc/vật đứng sau “就是”. “以外” có thể lược bỏ. Ví dụ: “Tôi đến Đài Loan ngoài học tiếng Trung ra thì chỉ có làm việc”, “Cuối tuần ngoài leo núi ra thì anh ấy chỉ ở nhà dọn dẹp”.",
       "py": "Zhège yǔfǎ qiángdiào rúguǒ “chúle” hòumiàn de rén shìwù páichú, jiù zhǐyǒu “jiùshì” hòumiàn de rén shìwù. “Yǐwài” kěyǐ shěnglüè. Lìrú: “Wǒ lái Táiwān chúle xué zhōngwén yǐwài, jiùshì gōngzuò”, “tā zhōumò chúle páshān, jiùshì zàijiā dǎsǎo”."
      },
      {
       "hz": "……我每天除了吃飯、睡覺以外，就是抱著小孩餵他喝奶……小李在咖啡館打工，每天除了煮咖啡以外，就是擦桌子、倒垃圾，他覺得很輕鬆。",
       "vi": "…mỗi ngày ngoài ăn và ngủ ra, tôi chỉ bế con cho con bú… Tiểu Lý làm thêm ở quán cà phê, mỗi ngày ngoài pha cà phê ra thì chỉ lau bàn, đổ rác, cậu ấy thấy rất nhàn.",
       "py": "…… wǒ měitiān chúle chīfàn, shuìjiào yǐwài, jiùshì bào zhe xiǎohái wèi tā hē nǎi…… xiǎo lǐ zài kāfēiguǎn dǎgōng, měitiān chúle zhǔ kāfēi yǐwài, jiùshì cā zhuōzi, dào lèsè, tā juéde hěn qīngsōng."
      },
      {
       "hz": "我家冰箱裡的東西不多，除了啤酒，就是一些水餃和雞蛋。",
       "vi": "Tủ lạnh nhà tôi không có nhiều đồ, ngoài bia ra thì chỉ có ít sủi cảo và trứng gà.",
       "py": "Wǒjiā bīngxiāng lǐ de dōngxī bù duō, chúle píjiǔ, jiùshì yìxiē shuǐjiǎo hàn jīdàn."
      },
      {
       "hz": "婆婆每天不是煮魚湯、雞湯給我喝，就是幫我買菜、做家事……小華很會利用放假的時間，不是去健身，就是參加各種社團活動。",
       "vi": "Ngày nào mẹ chồng cũng không nấu canh cá, canh gà cho tôi thì cũng đi chợ, làm việc nhà giúp tôi… Tiểu Hoa rất biết tận dụng kỳ nghỉ, không đi tập gym thì cũng tham gia đủ loại hoạt động câu lạc bộ.",
       "py": "Pópo měitiān búshì zhǔ yútāng, jītāng gěi wǒ hē, jiùshì bāng wǒ mǎicài, zuò jiāshì…… xiǎo huá hěn huì lìyòng fàngjià de shíjiān, búshì qù jiànshēn, jiùshì cānjiā gèzhǒng shètuánhuódòng."
      },
      {
       "hz": "每年華語中心的春節活動，不是唱歌，就是跳舞，今年我們來設計一些不同的活動吧！",
       "vi": "Hoạt động mừng Xuân hằng năm của Trung tâm Hoa ngữ không hát thì cũng múa, năm nay chúng ta thiết kế vài hoạt động khác đi!",
       "py": "Měinián huáyǔ zhōngxīn de chūnjié huódòng, búshì chànggē, jiùshì tiàowǔ, jīnnián wǒmen lái shèjì yìxiē bùtóng de huódòng ba!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不 Vs₁ 不 Vs₂ — vừa phải, không… không…",
   "giaiThich": "Chỉ mức độ nằm giữa hai thái cực, ý là vừa vặn, dễ chịu: 不大不小, 不多不少, 不高不矮. Hai tính từ phải là ĐƠN ÂM và trái nghĩa nhau."
  }
 ],
 "td3-4.2": [
  {
   "title": "3. 終於",
   "points": [
    {
     "label": null,
     "formula": "「終於」是副詞。表示經過一個很長的過程，最後好不容易達到希望、期待或預期的結果。「終於」的前面是主語，後面可以接動詞或不 及物狀態動詞（Vs）。句尾加「了」表示狀態的變化。 I look forward to hearing the patter of tiny feet.",
     "examples": [
      {
       "hz": "……現在我終於比較了解了。",
       "vi": "…bây giờ cuối cùng tôi cũng hiểu hơn rồi.",
       "py": "…… xiànzài wǒ zhōngyú bǐjiào liǎojiě le."
      },
      {
       "hz": "我家附近上個星期終於有一家設備新、空間大的健身房了。",
       "vi": "Tuần trước gần nhà tôi cuối cùng cũng có một phòng gym thiết bị mới, không gian rộng.",
       "py": "Wǒjiā fùjìn shànggèxīngqí zhōngyú yǒu yìjiā shèbèi xīn, kōngjiān dà de jiànshēnfáng le."
      },
      {
       "hz": "媽媽到了機場才發現護照不見了，找來找去，終於在她的口袋裡找到了，真糊塗啊！",
       "vi": "Mẹ đến sân bay mới phát hiện hộ chiếu không thấy đâu, tìm tới tìm lui, cuối cùng tìm thấy trong túi áo của mẹ, đúng là đãng trí!",
       "py": "Māma dào le jīchǎng cái fāxiàn hùzhào bújiàn le, zhǎoláizhǎoqù, zhōngyú zài tā de kǒudài lǐ zhǎodào le, zhēn hútú a!"
      },
      {
       "hz": "我去參加朋友的婚禮，除了送紅包，還祝福他們事事如意、早生貴子、永遠幸福。",
       "vi": "Tôi đi dự đám cưới của bạn, ngoài mừng phong bì đỏ, còn chúc họ vạn sự như ý, sớm sinh quý tử, hạnh phúc mãi mãi.",
       "py": "Wǒ qù cānjiā péngyǒu de hūnlǐ, chúle sòng hóngbāo, hái zhùfú tāmen shìshìrúyì, zǎoshēngguìzi, yǒngyuǎn xìngfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "終於 — cuối cùng thì…",
   "giaiThich": "Phó từ. Sau một quá trình dài mới đạt được kết quả mong đợi. Đứng sau chủ ngữ, trước động từ hoặc tính từ; cuối câu thường thêm 了."
  },
  {
   "title": "1. V個不停/ V個沒完",
   "points": [
    {
     "label": null,
     "formula": "「V 個不停」強調同樣的動作在短時間內不斷地重複，例如：這幾天雨下個不停。而「V 個沒完」強調做某動作時，不想或是沒辦法停止，例如：昨天剛考完試，今天又考了，每天考試考個沒完。「V 個沒完」一般用在說話的人對這樣的情況覺得不好或感到不耐煩。",
     "examples": [
      {
       "hz": "開心時，會笑個不停；傷心時，會哭個不停。",
       "vi": "Khi vui thì cười không ngớt; khi buồn thì khóc mãi không thôi.",
       "py": "Kāixīn shí, huì xiào gè bùtíng; shāngxīn shí, huì kū gè bùtíng."
      },
      {
       "hz": "最近工作很多，我們每天開會開個不停，電話也接個不停，累死了。",
       "vi": "Dạo này nhiều việc, ngày nào chúng tôi cũng họp liên miên, điện thoại cũng nghe không ngớt, mệt chết đi được.",
       "py": "Zuìjìn gōngzuò hěnduō, wǒmen měitiān kāihuì kāi gè bùtíng, diànhuà yě jiē gè bùtíng, lèisǐ le."
      },
      {
       "hz": "我的雙胞胎兒子整天吵個沒完、哭個沒完，真不知道怎麼辦才好。",
       "vi": "Hai cậu con trai sinh đôi của tôi suốt ngày cãi nhau không dứt, khóc mãi không thôi, tôi thật không biết phải làm sao.",
       "py": "Wǒ de shuāngbāotāi érzi zhěngtiān chǎo gè méiwán, kū gè méiwán, zhēnbùzhīdào zěnmebàn cái hǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 個不停 / V 個沒完 — … không ngừng",
   "giaiThich": "V 個不停 nhấn mạnh hành động lặp đi lặp lại liên tục trong thời gian ngắn (雨下個不停). V 個沒完 nhấn mạnh không muốn hoặc không thể dừng, thường kèm sự sốt ruột, khó chịu của người nói."
  },
  {
   "title": "2. 不 Vs₁ 不 Vs₂",
   "points": [
    {
     "label": null,
     "formula": "「不 Vs₁ 不 Vs₂」說明介於「Vs₁」和「Vs₂」兩者之間的程度，表示說話的人覺得適中、適宜、舒服的，數量或程度正好。例如：不大不小、不多不少、不高不矮、不新不舊等。兩個Vs都必須是單音詞，而且意思相反，如：大小、多少、高矮、新舊、遠近、快慢、好壞、冷熱等。 「不是……，就是……」為選擇複句，表示「不是」後面的人事物和「就是」後面的人事物，兩個當中一定有一個發生或成立，沒有其他的情況或選擇。例如：教室裡的書包不是小美的，就是小麗的。",
     "examples": [
      {
       "hz": "女人生了孩子以後得休息一個月，不多不少，就是三十天。",
       "vi": "Phụ nữ sau khi sinh con phải nghỉ một tháng, không nhiều không ít, đúng ba mươi ngày.",
       "py": "Nǚrén shēng le háizi yǐhòu de xiūxí yígèyuè, bùduōbùshǎo, jiùshì sānshítiān."
      },
      {
       "hz": "這種不冷不熱的天氣舒服極了，不但適合野餐、露營，還很適合爬山。",
       "vi": "Thời tiết không nóng không lạnh thế này dễ chịu vô cùng, không những hợp để dã ngoại, cắm trại mà còn rất hợp để leo núi.",
       "py": "Zhèzhǒng bùlěngbúrè de tiānqì shūfú jíle, búdàn shìhé yěcān, lùyíng, hái hěn shìhé páshān."
      },
      {
       "hz": "林老師說話的速度不快不慢，例子的說明也很清楚，學生很容易就明白了。",
       "vi": "Cô Lâm nói không nhanh không chậm, giải thích ví dụ cũng rất rõ ràng, học sinh rất dễ hiểu.",
       "py": "Lín lǎoshī shuōhuà de sùdù búkuàibúmàn, lìzi de shuōmíng yě hěn qīngchǔ, xuéshēng hěn róngyì jiù míngbái le."
      },
      {
       "hz": "這個語法強調如果「除了」後面的人事物排除，就只有「就是」後面的人事物。「以外」可以省略。例如：「我來臺灣除了學中文以外，就是工作」、「他週末除了爬山，就是在家打掃」。",
       "vi": "Mẫu ngữ pháp này nhấn mạnh: nếu loại trừ người/việc/vật đứng sau “除了” thì chỉ còn người/việc/vật đứng sau “就是”. “以外” có thể lược bỏ. Ví dụ: “Tôi đến Đài Loan ngoài học tiếng Trung ra thì chỉ có làm việc”, “Cuối tuần ngoài leo núi ra thì anh ấy chỉ ở nhà dọn dẹp”.",
       "py": "Zhège yǔfǎ qiángdiào rúguǒ “chúle” hòumiàn de rén shìwù páichú, jiù zhǐyǒu “jiùshì” hòumiàn de rén shìwù. “Yǐwài” kěyǐ shěnglüè. Lìrú: “Wǒ lái Táiwān chúle xué zhōngwén yǐwài, jiùshì gōngzuò”, “tā zhōumò chúle páshān, jiùshì zàijiā dǎsǎo”."
      },
      {
       "hz": "……我每天除了吃飯、睡覺以外，就是抱著小孩餵他喝奶……小李在咖啡館打工，每天除了煮咖啡以外，就是擦桌子、倒垃圾，他覺得很輕鬆。",
       "vi": "…mỗi ngày ngoài ăn và ngủ ra, tôi chỉ bế con cho con bú… Tiểu Lý làm thêm ở quán cà phê, mỗi ngày ngoài pha cà phê ra thì chỉ lau bàn, đổ rác, cậu ấy thấy rất nhàn.",
       "py": "…… wǒ měitiān chúle chīfàn, shuìjiào yǐwài, jiùshì bào zhe xiǎohái wèi tā hē nǎi…… xiǎo lǐ zài kāfēiguǎn dǎgōng, měitiān chúle zhǔ kāfēi yǐwài, jiùshì cā zhuōzi, dào lèsè, tā juéde hěn qīngsōng."
      },
      {
       "hz": "我家冰箱裡的東西不多，除了啤酒，就是一些水餃和雞蛋。",
       "vi": "Tủ lạnh nhà tôi không có nhiều đồ, ngoài bia ra thì chỉ có ít sủi cảo và trứng gà.",
       "py": "Wǒjiā bīngxiāng lǐ de dōngxī bù duō, chúle píjiǔ, jiùshì yìxiē shuǐjiǎo hàn jīdàn."
      },
      {
       "hz": "婆婆每天不是煮魚湯、雞湯給我喝，就是幫我買菜、做家事……小華很會利用放假的時間，不是去健身，就是參加各種社團活動。",
       "vi": "Ngày nào mẹ chồng cũng không nấu canh cá, canh gà cho tôi thì cũng đi chợ, làm việc nhà giúp tôi… Tiểu Hoa rất biết tận dụng kỳ nghỉ, không đi tập gym thì cũng tham gia đủ loại hoạt động câu lạc bộ.",
       "py": "Pópo měitiān búshì zhǔ yútāng, jītāng gěi wǒ hē, jiùshì bāng wǒ mǎicài, zuò jiāshì…… xiǎo huá hěn huì lìyòng fàngjià de shíjiān, búshì qù jiànshēn, jiùshì cānjiā gèzhǒng shètuánhuódòng."
      },
      {
       "hz": "每年華語中心的春節活動，不是唱歌，就是跳舞，今年我們來設計一些不同的活動吧！",
       "vi": "Hoạt động mừng Xuân hằng năm của Trung tâm Hoa ngữ không hát thì cũng múa, năm nay chúng ta thiết kế vài hoạt động khác đi!",
       "py": "Měinián huáyǔ zhōngxīn de chūnjié huódòng, búshì chànggē, jiùshì tiàowǔ, jīnnián wǒmen lái shèjì yìxiē bùtóng de huódòng ba!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不 Vs₁ 不 Vs₂ — vừa phải, không… không…",
   "giaiThich": "Chỉ mức độ nằm giữa hai thái cực, ý là vừa vặn, dễ chịu: 不大不小, 不多不少, 不高不矮. Hai tính từ phải là ĐƠN ÂM và trái nghĩa nhau."
  }
 ],
 "td3-4.3": [
  {
   "title": "3. 終於",
   "points": [
    {
     "label": null,
     "formula": "「終於」是副詞。表示經過一個很長的過程，最後好不容易達到希望、期待或預期的結果。「終於」的前面是主語，後面可以接動詞或不 及物狀態動詞（Vs）。句尾加「了」表示狀態的變化。 I look forward to hearing the patter of tiny feet.",
     "examples": [
      {
       "hz": "……現在我終於比較了解了。",
       "vi": "…bây giờ cuối cùng tôi cũng hiểu hơn rồi.",
       "py": "…… xiànzài wǒ zhōngyú bǐjiào liǎojiě le."
      },
      {
       "hz": "我家附近上個星期終於有一家設備新、空間大的健身房了。",
       "vi": "Tuần trước gần nhà tôi cuối cùng cũng có một phòng gym thiết bị mới, không gian rộng.",
       "py": "Wǒjiā fùjìn shànggèxīngqí zhōngyú yǒu yìjiā shèbèi xīn, kōngjiān dà de jiànshēnfáng le."
      },
      {
       "hz": "媽媽到了機場才發現護照不見了，找來找去，終於在她的口袋裡找到了，真糊塗啊！",
       "vi": "Mẹ đến sân bay mới phát hiện hộ chiếu không thấy đâu, tìm tới tìm lui, cuối cùng tìm thấy trong túi áo của mẹ, đúng là đãng trí!",
       "py": "Māma dào le jīchǎng cái fāxiàn hùzhào bújiàn le, zhǎoláizhǎoqù, zhōngyú zài tā de kǒudài lǐ zhǎodào le, zhēn hútú a!"
      },
      {
       "hz": "我去參加朋友的婚禮，除了送紅包，還祝福他們事事如意、早生貴子、永遠幸福。",
       "vi": "Tôi đi dự đám cưới của bạn, ngoài mừng phong bì đỏ, còn chúc họ vạn sự như ý, sớm sinh quý tử, hạnh phúc mãi mãi.",
       "py": "Wǒ qù cānjiā péngyǒu de hūnlǐ, chúle sòng hóngbāo, hái zhùfú tāmen shìshìrúyì, zǎoshēngguìzi, yǒngyuǎn xìngfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "終於 — cuối cùng thì…",
   "giaiThich": "Phó từ. Sau một quá trình dài mới đạt được kết quả mong đợi. Đứng sau chủ ngữ, trước động từ hoặc tính từ; cuối câu thường thêm 了."
  },
  {
   "title": "1. V個不停/ V個沒完",
   "points": [
    {
     "label": null,
     "formula": "「V 個不停」強調同樣的動作在短時間內不斷地重複，例如：這幾天雨下個不停。而「V 個沒完」強調做某動作時，不想或是沒辦法停止，例如：昨天剛考完試，今天又考了，每天考試考個沒完。「V 個沒完」一般用在說話的人對這樣的情況覺得不好或感到不耐煩。",
     "examples": [
      {
       "hz": "開心時，會笑個不停；傷心時，會哭個不停。",
       "vi": "Khi vui thì cười không ngớt; khi buồn thì khóc mãi không thôi.",
       "py": "Kāixīn shí, huì xiào gè bùtíng; shāngxīn shí, huì kū gè bùtíng."
      },
      {
       "hz": "最近工作很多，我們每天開會開個不停，電話也接個不停，累死了。",
       "vi": "Dạo này nhiều việc, ngày nào chúng tôi cũng họp liên miên, điện thoại cũng nghe không ngớt, mệt chết đi được.",
       "py": "Zuìjìn gōngzuò hěnduō, wǒmen měitiān kāihuì kāi gè bùtíng, diànhuà yě jiē gè bùtíng, lèisǐ le."
      },
      {
       "hz": "我的雙胞胎兒子整天吵個沒完、哭個沒完，真不知道怎麼辦才好。",
       "vi": "Hai cậu con trai sinh đôi của tôi suốt ngày cãi nhau không dứt, khóc mãi không thôi, tôi thật không biết phải làm sao.",
       "py": "Wǒ de shuāngbāotāi érzi zhěngtiān chǎo gè méiwán, kū gè méiwán, zhēnbùzhīdào zěnmebàn cái hǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 個不停 / V 個沒完 — … không ngừng",
   "giaiThich": "V 個不停 nhấn mạnh hành động lặp đi lặp lại liên tục trong thời gian ngắn (雨下個不停). V 個沒完 nhấn mạnh không muốn hoặc không thể dừng, thường kèm sự sốt ruột, khó chịu của người nói."
  },
  {
   "title": "2. 不 Vs₁ 不 Vs₂",
   "points": [
    {
     "label": null,
     "formula": "「不 Vs₁ 不 Vs₂」說明介於「Vs₁」和「Vs₂」兩者之間的程度，表示說話的人覺得適中、適宜、舒服的，數量或程度正好。例如：不大不小、不多不少、不高不矮、不新不舊等。兩個Vs都必須是單音詞，而且意思相反，如：大小、多少、高矮、新舊、遠近、快慢、好壞、冷熱等。 「不是……，就是……」為選擇複句，表示「不是」後面的人事物和「就是」後面的人事物，兩個當中一定有一個發生或成立，沒有其他的情況或選擇。例如：教室裡的書包不是小美的，就是小麗的。",
     "examples": [
      {
       "hz": "女人生了孩子以後得休息一個月，不多不少，就是三十天。",
       "vi": "Phụ nữ sau khi sinh con phải nghỉ một tháng, không nhiều không ít, đúng ba mươi ngày.",
       "py": "Nǚrén shēng le háizi yǐhòu de xiūxí yígèyuè, bùduōbùshǎo, jiùshì sānshítiān."
      },
      {
       "hz": "這種不冷不熱的天氣舒服極了，不但適合野餐、露營，還很適合爬山。",
       "vi": "Thời tiết không nóng không lạnh thế này dễ chịu vô cùng, không những hợp để dã ngoại, cắm trại mà còn rất hợp để leo núi.",
       "py": "Zhèzhǒng bùlěngbúrè de tiānqì shūfú jíle, búdàn shìhé yěcān, lùyíng, hái hěn shìhé páshān."
      },
      {
       "hz": "林老師說話的速度不快不慢，例子的說明也很清楚，學生很容易就明白了。",
       "vi": "Cô Lâm nói không nhanh không chậm, giải thích ví dụ cũng rất rõ ràng, học sinh rất dễ hiểu.",
       "py": "Lín lǎoshī shuōhuà de sùdù búkuàibúmàn, lìzi de shuōmíng yě hěn qīngchǔ, xuéshēng hěn róngyì jiù míngbái le."
      },
      {
       "hz": "這個語法強調如果「除了」後面的人事物排除，就只有「就是」後面的人事物。「以外」可以省略。例如：「我來臺灣除了學中文以外，就是工作」、「他週末除了爬山，就是在家打掃」。",
       "vi": "Mẫu ngữ pháp này nhấn mạnh: nếu loại trừ người/việc/vật đứng sau “除了” thì chỉ còn người/việc/vật đứng sau “就是”. “以外” có thể lược bỏ. Ví dụ: “Tôi đến Đài Loan ngoài học tiếng Trung ra thì chỉ có làm việc”, “Cuối tuần ngoài leo núi ra thì anh ấy chỉ ở nhà dọn dẹp”.",
       "py": "Zhège yǔfǎ qiángdiào rúguǒ “chúle” hòumiàn de rén shìwù páichú, jiù zhǐyǒu “jiùshì” hòumiàn de rén shìwù. “Yǐwài” kěyǐ shěnglüè. Lìrú: “Wǒ lái Táiwān chúle xué zhōngwén yǐwài, jiùshì gōngzuò”, “tā zhōumò chúle páshān, jiùshì zàijiā dǎsǎo”."
      },
      {
       "hz": "……我每天除了吃飯、睡覺以外，就是抱著小孩餵他喝奶……小李在咖啡館打工，每天除了煮咖啡以外，就是擦桌子、倒垃圾，他覺得很輕鬆。",
       "vi": "…mỗi ngày ngoài ăn và ngủ ra, tôi chỉ bế con cho con bú… Tiểu Lý làm thêm ở quán cà phê, mỗi ngày ngoài pha cà phê ra thì chỉ lau bàn, đổ rác, cậu ấy thấy rất nhàn.",
       "py": "…… wǒ měitiān chúle chīfàn, shuìjiào yǐwài, jiùshì bào zhe xiǎohái wèi tā hē nǎi…… xiǎo lǐ zài kāfēiguǎn dǎgōng, měitiān chúle zhǔ kāfēi yǐwài, jiùshì cā zhuōzi, dào lèsè, tā juéde hěn qīngsōng."
      },
      {
       "hz": "我家冰箱裡的東西不多，除了啤酒，就是一些水餃和雞蛋。",
       "vi": "Tủ lạnh nhà tôi không có nhiều đồ, ngoài bia ra thì chỉ có ít sủi cảo và trứng gà.",
       "py": "Wǒjiā bīngxiāng lǐ de dōngxī bù duō, chúle píjiǔ, jiùshì yìxiē shuǐjiǎo hàn jīdàn."
      },
      {
       "hz": "婆婆每天不是煮魚湯、雞湯給我喝，就是幫我買菜、做家事……小華很會利用放假的時間，不是去健身，就是參加各種社團活動。",
       "vi": "Ngày nào mẹ chồng cũng không nấu canh cá, canh gà cho tôi thì cũng đi chợ, làm việc nhà giúp tôi… Tiểu Hoa rất biết tận dụng kỳ nghỉ, không đi tập gym thì cũng tham gia đủ loại hoạt động câu lạc bộ.",
       "py": "Pópo měitiān búshì zhǔ yútāng, jītāng gěi wǒ hē, jiùshì bāng wǒ mǎicài, zuò jiāshì…… xiǎo huá hěn huì lìyòng fàngjià de shíjiān, búshì qù jiànshēn, jiùshì cānjiā gèzhǒng shètuánhuódòng."
      },
      {
       "hz": "每年華語中心的春節活動，不是唱歌，就是跳舞，今年我們來設計一些不同的活動吧！",
       "vi": "Hoạt động mừng Xuân hằng năm của Trung tâm Hoa ngữ không hát thì cũng múa, năm nay chúng ta thiết kế vài hoạt động khác đi!",
       "py": "Měinián huáyǔ zhōngxīn de chūnjié huódòng, búshì chànggē, jiùshì tiàowǔ, jīnnián wǒmen lái shèjì yìxiē bùtóng de huódòng ba!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不 Vs₁ 不 Vs₂ — vừa phải, không… không…",
   "giaiThich": "Chỉ mức độ nằm giữa hai thái cực, ý là vừa vặn, dễ chịu: 不大不小, 不多不少, 不高不矮. Hai tính từ phải là ĐƠN ÂM và trái nghĩa nhau."
  }
 ],
 "td3-4.4": [
  {
   "title": "3. 終於",
   "points": [
    {
     "label": null,
     "formula": "「終於」是副詞。表示經過一個很長的過程，最後好不容易達到希望、期待或預期的結果。「終於」的前面是主語，後面可以接動詞或不 及物狀態動詞（Vs）。句尾加「了」表示狀態的變化。 I look forward to hearing the patter of tiny feet.",
     "examples": [
      {
       "hz": "……現在我終於比較了解了。",
       "vi": "…bây giờ cuối cùng tôi cũng hiểu hơn rồi.",
       "py": "…… xiànzài wǒ zhōngyú bǐjiào liǎojiě le."
      },
      {
       "hz": "我家附近上個星期終於有一家設備新、空間大的健身房了。",
       "vi": "Tuần trước gần nhà tôi cuối cùng cũng có một phòng gym thiết bị mới, không gian rộng.",
       "py": "Wǒjiā fùjìn shànggèxīngqí zhōngyú yǒu yìjiā shèbèi xīn, kōngjiān dà de jiànshēnfáng le."
      },
      {
       "hz": "媽媽到了機場才發現護照不見了，找來找去，終於在她的口袋裡找到了，真糊塗啊！",
       "vi": "Mẹ đến sân bay mới phát hiện hộ chiếu không thấy đâu, tìm tới tìm lui, cuối cùng tìm thấy trong túi áo của mẹ, đúng là đãng trí!",
       "py": "Māma dào le jīchǎng cái fāxiàn hùzhào bújiàn le, zhǎoláizhǎoqù, zhōngyú zài tā de kǒudài lǐ zhǎodào le, zhēn hútú a!"
      },
      {
       "hz": "我去參加朋友的婚禮，除了送紅包，還祝福他們事事如意、早生貴子、永遠幸福。",
       "vi": "Tôi đi dự đám cưới của bạn, ngoài mừng phong bì đỏ, còn chúc họ vạn sự như ý, sớm sinh quý tử, hạnh phúc mãi mãi.",
       "py": "Wǒ qù cānjiā péngyǒu de hūnlǐ, chúle sòng hóngbāo, hái zhùfú tāmen shìshìrúyì, zǎoshēngguìzi, yǒngyuǎn xìngfú."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "終於 — cuối cùng thì…",
   "giaiThich": "Phó từ. Sau một quá trình dài mới đạt được kết quả mong đợi. Đứng sau chủ ngữ, trước động từ hoặc tính từ; cuối câu thường thêm 了."
  },
  {
   "title": "1. V個不停/ V個沒完",
   "points": [
    {
     "label": null,
     "formula": "「V 個不停」強調同樣的動作在短時間內不斷地重複，例如：這幾天雨下個不停。而「V 個沒完」強調做某動作時，不想或是沒辦法停止，例如：昨天剛考完試，今天又考了，每天考試考個沒完。「V 個沒完」一般用在說話的人對這樣的情況覺得不好或感到不耐煩。",
     "examples": [
      {
       "hz": "開心時，會笑個不停；傷心時，會哭個不停。",
       "vi": "Khi vui thì cười không ngớt; khi buồn thì khóc mãi không thôi.",
       "py": "Kāixīn shí, huì xiào gè bùtíng; shāngxīn shí, huì kū gè bùtíng."
      },
      {
       "hz": "最近工作很多，我們每天開會開個不停，電話也接個不停，累死了。",
       "vi": "Dạo này nhiều việc, ngày nào chúng tôi cũng họp liên miên, điện thoại cũng nghe không ngớt, mệt chết đi được.",
       "py": "Zuìjìn gōngzuò hěnduō, wǒmen měitiān kāihuì kāi gè bùtíng, diànhuà yě jiē gè bùtíng, lèisǐ le."
      },
      {
       "hz": "我的雙胞胎兒子整天吵個沒完、哭個沒完，真不知道怎麼辦才好。",
       "vi": "Hai cậu con trai sinh đôi của tôi suốt ngày cãi nhau không dứt, khóc mãi không thôi, tôi thật không biết phải làm sao.",
       "py": "Wǒ de shuāngbāotāi érzi zhěngtiān chǎo gè méiwán, kū gè méiwán, zhēnbùzhīdào zěnmebàn cái hǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 個不停 / V 個沒完 — … không ngừng",
   "giaiThich": "V 個不停 nhấn mạnh hành động lặp đi lặp lại liên tục trong thời gian ngắn (雨下個不停). V 個沒完 nhấn mạnh không muốn hoặc không thể dừng, thường kèm sự sốt ruột, khó chịu của người nói."
  },
  {
   "title": "2. 不 Vs₁ 不 Vs₂",
   "points": [
    {
     "label": null,
     "formula": "「不 Vs₁ 不 Vs₂」說明介於「Vs₁」和「Vs₂」兩者之間的程度，表示說話的人覺得適中、適宜、舒服的，數量或程度正好。例如：不大不小、不多不少、不高不矮、不新不舊等。兩個Vs都必須是單音詞，而且意思相反，如：大小、多少、高矮、新舊、遠近、快慢、好壞、冷熱等。 「不是……，就是……」為選擇複句，表示「不是」後面的人事物和「就是」後面的人事物，兩個當中一定有一個發生或成立，沒有其他的情況或選擇。例如：教室裡的書包不是小美的，就是小麗的。",
     "examples": [
      {
       "hz": "女人生了孩子以後得休息一個月，不多不少，就是三十天。",
       "vi": "Phụ nữ sau khi sinh con phải nghỉ một tháng, không nhiều không ít, đúng ba mươi ngày.",
       "py": "Nǚrén shēng le háizi yǐhòu de xiūxí yígèyuè, bùduōbùshǎo, jiùshì sānshítiān."
      },
      {
       "hz": "這種不冷不熱的天氣舒服極了，不但適合野餐、露營，還很適合爬山。",
       "vi": "Thời tiết không nóng không lạnh thế này dễ chịu vô cùng, không những hợp để dã ngoại, cắm trại mà còn rất hợp để leo núi.",
       "py": "Zhèzhǒng bùlěngbúrè de tiānqì shūfú jíle, búdàn shìhé yěcān, lùyíng, hái hěn shìhé páshān."
      },
      {
       "hz": "林老師說話的速度不快不慢，例子的說明也很清楚，學生很容易就明白了。",
       "vi": "Cô Lâm nói không nhanh không chậm, giải thích ví dụ cũng rất rõ ràng, học sinh rất dễ hiểu.",
       "py": "Lín lǎoshī shuōhuà de sùdù búkuàibúmàn, lìzi de shuōmíng yě hěn qīngchǔ, xuéshēng hěn róngyì jiù míngbái le."
      },
      {
       "hz": "這個語法強調如果「除了」後面的人事物排除，就只有「就是」後面的人事物。「以外」可以省略。例如：「我來臺灣除了學中文以外，就是工作」、「他週末除了爬山，就是在家打掃」。",
       "vi": "Mẫu ngữ pháp này nhấn mạnh: nếu loại trừ người/việc/vật đứng sau “除了” thì chỉ còn người/việc/vật đứng sau “就是”. “以外” có thể lược bỏ. Ví dụ: “Tôi đến Đài Loan ngoài học tiếng Trung ra thì chỉ có làm việc”, “Cuối tuần ngoài leo núi ra thì anh ấy chỉ ở nhà dọn dẹp”.",
       "py": "Zhège yǔfǎ qiángdiào rúguǒ “chúle” hòumiàn de rén shìwù páichú, jiù zhǐyǒu “jiùshì” hòumiàn de rén shìwù. “Yǐwài” kěyǐ shěnglüè. Lìrú: “Wǒ lái Táiwān chúle xué zhōngwén yǐwài, jiùshì gōngzuò”, “tā zhōumò chúle páshān, jiùshì zàijiā dǎsǎo”."
      },
      {
       "hz": "……我每天除了吃飯、睡覺以外，就是抱著小孩餵他喝奶……小李在咖啡館打工，每天除了煮咖啡以外，就是擦桌子、倒垃圾，他覺得很輕鬆。",
       "vi": "…mỗi ngày ngoài ăn và ngủ ra, tôi chỉ bế con cho con bú… Tiểu Lý làm thêm ở quán cà phê, mỗi ngày ngoài pha cà phê ra thì chỉ lau bàn, đổ rác, cậu ấy thấy rất nhàn.",
       "py": "…… wǒ měitiān chúle chīfàn, shuìjiào yǐwài, jiùshì bào zhe xiǎohái wèi tā hē nǎi…… xiǎo lǐ zài kāfēiguǎn dǎgōng, měitiān chúle zhǔ kāfēi yǐwài, jiùshì cā zhuōzi, dào lèsè, tā juéde hěn qīngsōng."
      },
      {
       "hz": "我家冰箱裡的東西不多，除了啤酒，就是一些水餃和雞蛋。",
       "vi": "Tủ lạnh nhà tôi không có nhiều đồ, ngoài bia ra thì chỉ có ít sủi cảo và trứng gà.",
       "py": "Wǒjiā bīngxiāng lǐ de dōngxī bù duō, chúle píjiǔ, jiùshì yìxiē shuǐjiǎo hàn jīdàn."
      },
      {
       "hz": "婆婆每天不是煮魚湯、雞湯給我喝，就是幫我買菜、做家事……小華很會利用放假的時間，不是去健身，就是參加各種社團活動。",
       "vi": "Ngày nào mẹ chồng cũng không nấu canh cá, canh gà cho tôi thì cũng đi chợ, làm việc nhà giúp tôi… Tiểu Hoa rất biết tận dụng kỳ nghỉ, không đi tập gym thì cũng tham gia đủ loại hoạt động câu lạc bộ.",
       "py": "Pópo měitiān búshì zhǔ yútāng, jītāng gěi wǒ hē, jiùshì bāng wǒ mǎicài, zuò jiāshì…… xiǎo huá hěn huì lìyòng fàngjià de shíjiān, búshì qù jiànshēn, jiùshì cānjiā gèzhǒng shètuánhuódòng."
      },
      {
       "hz": "每年華語中心的春節活動，不是唱歌，就是跳舞，今年我們來設計一些不同的活動吧！",
       "vi": "Hoạt động mừng Xuân hằng năm của Trung tâm Hoa ngữ không hát thì cũng múa, năm nay chúng ta thiết kế vài hoạt động khác đi!",
       "py": "Měinián huáyǔ zhōngxīn de chūnjié huódòng, búshì chànggē, jiùshì tiàowǔ, jīnnián wǒmen lái shèjì yìxiē bùtóng de huódòng ba!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不 Vs₁ 不 Vs₂ — vừa phải, không… không…",
   "giaiThich": "Chỉ mức độ nằm giữa hai thái cực, ý là vừa vặn, dễ chịu: 不大不小, 不多不少, 不高不矮. Hai tính từ phải là ĐƠN ÂM và trái nghĩa nhau."
  }
 ],
 "td3-5.1": [
  {
   "title": "1. 萬一",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「萬一」後面是可能性很小的假設，大多是不好的事情。",
       "vi": "Sau “萬一” là một giả định có khả năng xảy ra rất thấp, phần lớn là chuyện không hay.",
       "py": "“Wànyí” hòumiàn shì kěnéngxìng hěnxiǎo de jiǎshè, dàduō shì bùhǎo de shìqíng."
      },
      {
       "hz": "⋯⋯要注意門窗有沒有問題，萬一被颱風吹壞，造成意外就麻煩了。",
       "vi": "…phải chú ý xem cửa ra vào, cửa sổ có vấn đề gì không, lỡ bị bão làm hỏng, gây ra tai nạn thì phiền lắm.",
       "py": "…… yào zhùyì ménchuāng yǒuméiyǒu wèntí, wànyí bèi táifēng chuī huài, zàochéng yìwài jiù máfán le."
      },
      {
       "hz": "出國旅遊前最好先買個旅遊平安保險，萬一發生什麼意外，就不必擔心了。",
       "vi": "Trước khi đi du lịch nước ngoài, tốt nhất nên mua bảo hiểm du lịch, lỡ có xảy ra chuyện gì thì cũng không phải lo.",
       "py": "Chūguó lǚyóu qián zuìhǎo xiānmǎi gè lǚyóu píng'ānbǎoxiǎn, wànyì fāshēng shénme yìwài, jiù búbì dānxīn le."
      },
      {
       "hz": "我家裡平時都準備了一些蠟燭、電池什麼的，萬一停電了，才不會不方便。",
       "vi": "Nhà tôi bình thường luôn chuẩn bị sẵn nến, pin, v.v., nhỡ mất điện thì mới không bất tiện.",
       "py": "Wǒ jiālǐ píngshí dōu zhǔnbèi le yìxiē làzhú, diànchí shénme de, wànyì tíngdiàn le, cái búhuì bù fāngbiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "萬一 — lỡ như, nhỡ mà",
   "giaiThich": "Nêu giả thiết về điều không mong muốn, xác suất thấp nhưng cần đề phòng."
  },
  {
   "title": "2. 一連",
   "points": [
    {
     "label": null,
     "formula": "「一連」表示同一個動作或情況連續發生，後面接動詞或數量詞。例如：「他一連吃了五個包子」、「一連三天我都在家休息」。而否定詞「不」或「沒」只能用在數量詞後面的動詞，例如：「一連三天都沒下雨」。",
     "examples": [
      {
       "hz": "⋯⋯有一次來了個大颱風，一連下了好幾天的大雨。",
       "vi": "…có một lần có trận bão lớn, mưa to liên tiếp mấy ngày liền.",
       "py": "…… yǒu yícì lái le gè dà táifēng, yìlián xià le hǎo jǐtiān de dàyǔ."
      },
      {
       "hz": "他一連說了好幾個我聽不懂的句子，他說的到底是哪國話3.我最近窮死了，已經一連兩個星期都吃泡麵了。",
       "vi": "Anh ấy nói liền mấy câu tôi nghe không hiểu, rốt cuộc anh ấy nói tiếng nước nào vậy… Dạo này tôi nghèo chết đi được, đã ăn mì gói liền hai tuần rồi.",
       "py": "Tā yìlián shuō le hǎojǐgè wǒ tīngbùdǒng de jùzi, tā shuō de dàodǐ shì nǎ guó huà 3. Wǒ zuìjìn qióngsǐ le, yǐjīng yìlián liǎnggè xīngqí dōu chī pàomiàn le."
      },
      {
       "hz": "他最近為了工作忙個不停，已經一連三天沒睡好覺了，精神很不好。",
       "vi": "Dạo này anh ấy bận không ngơi vì công việc, đã liên tiếp ba ngày không ngủ ngon, tinh thần rất kém.",
       "py": "Tā zuìjìn wèile gōngzuò máng gè bùtíng, yǐjīng yìlián sāntiān méi shuì hǎo jué le, jīngshén hěn bùhǎo."
      },
      {
       "hz": "「以為」後面是說話者原本的想法，但和後面發生的事實不同。「沒想到」的後面是發生的事實，但發生前說話的人沒想過。",
       "vi": "Sau “以為” là suy nghĩ ban đầu của người nói, nhưng khác với sự thật xảy ra sau đó. Sau “沒想到” là sự thật đã xảy ra, nhưng trước khi xảy ra người nói chưa từng nghĩ tới.",
       "py": "“Yǐwéi” hòumiàn shì shuōhuà zhě yuánběn de xiǎngfǎ, dàn hàn hòumiàn fāshēng de shìshí bùtóng. “Méixiǎngdào” de hòumiàn shì fāshēng de shìshí, dàn fāshēng qián shuōhuà de rén méi xiǎng guò."
      },
      {
       "hz": "我以為隨時去超市都買得到新鮮的蔬菜，沒想到新聞一說2.我以為我不會看上那件深紅色的洋裝，沒想到看來看去，最後還是買了。",
       "vi": "Tôi tưởng lúc nào đi siêu thị cũng mua được rau tươi, không ngờ tin tức vừa nói… Tôi tưởng mình sẽ không ưng chiếc váy màu đỏ sẫm đó, không ngờ xem tới xem lui, cuối cùng vẫn mua.",
       "py": "Wǒ yǐwéi suíshí qù chāoshì dōu mǎi dédào xīnxiān de shūcài, méixiǎngdào xīnwén yì shuō 2. Wǒ yǐwéi wǒ búhuì kàn shàng nà jiàn shēnhóngsè de yángzhuāng, méixiǎngdào kànláikànqù, zuìhòu háishì mǎi le."
      },
      {
       "hz": "王媽媽以為這道菜孩子們一定會搶著吃，沒想到他們連嚐都不肯嚐。",
       "vi": "Mẹ Vương tưởng bọn trẻ nhất định sẽ tranh nhau ăn món này, không ngờ chúng nếm cũng không chịu nếm.",
       "py": "Wáng māma yǐwéi zhè dàocài háizi men yídìng huì qiǎng zhe chī, méixiǎngdào tāmen lián cháng dōu bùkěn cháng."
      },
      {
       "hz": "說話的人比較了不同情況以後，做出結論或提出建議。「還是」後面是提出的建議。",
       "vi": "Người nói so sánh các tình huống khác nhau rồi đưa ra kết luận hoặc lời khuyên. Sau “還是” là lời khuyên được đưa ra.",
       "py": "Shuōhuà de rén bǐjiào le bùtóng qíngkuàng yǐhòu, zuòchū jiélùn huò tíchū jiànyì. “Háishì” hòumiàn shì tíchū de jiànyì."
      },
      {
       "hz": "⋯⋯，你還是先買收音機，再去超市吧。",
       "vi": "…, tốt hơn hết là bạn mua radio trước rồi hãy đi siêu thị.",
       "py": "……, nǐ háishì xiānmǎi shōuyīnjī, zài qù chāoshì ba."
      },
      {
       "hz": "A：我想安排時間去日本旅行，你想什麼時候去最好？",
       "vi": "A: Tôi muốn sắp xếp thời gian đi du lịch Nhật, bạn thấy đi lúc nào là tốt nhất?",
       "py": "A: Wǒ xiǎng ānpái shíjiān qù Rìběn lǚxíng, nǐ xiǎng shénme shíhòu qù zuìhǎo?"
      },
      {
       "hz": "B：日本春夏秋冬都美，任何時候去都好，你還是以自己方便的時間去吧。",
       "vi": "B: Nhật Bản xuân hạ thu đông đều đẹp, đi lúc nào cũng được, tốt hơn hết là bạn chọn lúc nào tiện cho mình thì đi.",
       "py": "B: Rìběn chūnxiàqiūdōng dōu měi, rènhé shíhòu qù dōu hǎo, nǐ háishì yǐ zìjǐ fāngbiàn de shíjiān qù ba."
      },
      {
       "hz": "兒子：中秋節快到了，我可以找朋友來我們社區烤肉嗎？",
       "vi": "Con trai: Sắp đến Trung thu rồi, con rủ bạn đến khu nhà mình nướng thịt được không?",
       "py": "Érzi: Zhōngqiūjié kuài dào le, wǒ kěyǐ zhǎo péngyǒu lái wǒmen shèqū kǎoròu ma?"
      },
      {
       "hz": "爸爸：我擔心會影響鄰居的生活，你們還是去別的地方吧。",
       "vi": "Bố: Bố sợ ảnh hưởng đến cuộc sống của hàng xóm, tốt hơn hết các con đi chỗ khác đi.",
       "py": "Bàba: Wǒ dānxīn huì yǐngxiǎng línjū de shēnghuó, nǐmen háishì qù biéde dìfāng ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一連 — liên tiếp",
   "giaiThich": "Cùng một hành động hoặc tình huống xảy ra liên tiếp; sau 一連 là động từ hoặc cụm số lượng (他一連吃了五個包子). Từ phủ định 不/沒 chỉ đặt ở động từ SAU cụm số lượng (一連三天都沒下雨)."
  },
  {
   "title": "1. 結果",
   "points": [
    {
     "label": null,
     "formula": "「結果」作連詞，表示事情發生後，最後的情況。「結果」後面接的句子是這件事情最後的情況。",
     "examples": [
      {
       "hz": "⋯⋯又發生了規模六點七的地震，結果造成了非常嚴重的2.昨天我在夜市看上了一件上衣，沒試穿就買了，結果回家後穿上才發現太小了。",
       "vi": "…lại xảy ra trận động đất cường độ 6,7, kết quả gây ra thiệt hại vô cùng nghiêm trọng… Hôm qua tôi ưng một chiếc áo ở chợ đêm, chưa thử đã mua, kết quả về nhà mặc vào mới thấy quá nhỏ.",
       "py": "…… yòu fāshēng le guīmó liùdiǎn qī de dìzhèn, jiéguǒ zàochéng le fēicháng yánzhòng de 2. Zuótiān wǒ zài yèshì kàn shàng le yíjiàn shàngyī, méi shìchuān jiù mǎi le, jiéguǒ huíjiā hòu chuān shàng cái fāxiàn tàixiǎo le."
      },
      {
       "hz": "這幾個月很多人因為感冒而住院了，我和家人出門都會戴上口罩，結果妹妹還是感冒了。",
       "vi": "Mấy tháng nay nhiều người phải nhập viện vì cảm cúm, tôi và gia đình ra ngoài đều đeo khẩu trang, kết quả em gái vẫn bị cảm.",
       "py": "Zhè jǐgè yuè hěnduō rén yīnwèi gǎnmào ér zhùyuàn le, wǒ hàn jiārén chūmén dōu huì dài shàng kǒuzhào, jiéguǒ mèimei háishì gǎnmào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "結果 — kết quả là",
   "giaiThich": "Liên từ, nêu tình huống cuối cùng sau khi sự việc diễn ra."
  },
  {
   "title": "2. 甚至",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「甚至」後面是說話的人要強調的人、事或物。有時和「不但/不僅」或「連⋯⋯都/也⋯⋯」一起使用，例如：我姊姊不但會唱歌，也會寫歌，甚至辦過個人演唱會。",
       "vi": "Sau “甚至” là người, việc hoặc vật mà người nói muốn nhấn mạnh. Đôi khi dùng cùng “不但/不僅” hoặc “連……都/也……”, ví dụ: Chị tôi không những biết hát mà còn biết sáng tác, thậm chí đã từng tổ chức liveshow riêng.",
       "py": "“Shènzhì” hòumiàn shì shuōhuà de rén yào qiángdiào de rén, shì huò wù. Yǒushí hàn “búdàn / bùjǐn” huò “lián…… dōu / yě……” yìqǐ shǐyòng, lìrú: Wǒ jiějie búdàn huì chànggē, yě huì xiěgē, shènzhì bàn guò gèrén yǎnchànghuì."
      },
      {
       "hz": "⋯⋯不但路不通，甚至還有人被困在塌下來的屋子或石頭2.張小姐什麼動物都不怕，就是怕蛇，甚至連蛇的圖片也怕。",
       "vi": "…không những đường bị tắc, thậm chí còn có người bị kẹt dưới nhà sập hay đá… Cô Trương con vật gì cũng không sợ, chỉ sợ rắn, thậm chí đến ảnh con rắn cũng sợ.",
       "py": "…… búdàn lù bùtōng, shènzhì háiyǒu rén bèikùn zài tāxiàlái de wūzi huò shítou 2. Zhāng xiǎojiě shénme dòngwù dōu búpà, jiùshì pà shé, shènzhì lián shé de túpiàn yě pà."
      },
      {
       "hz": "馬老闆一忙起來，不但沒空吃飯，甚至連上廁所的時間都",
       "vi": "Ông chủ Mã mà bận lên là không những không có thời gian ăn cơm, thậm chí đến thời gian đi vệ sinh cũng…",
       "py": "Mǎ lǎobǎn yì máng qǐlái, búdàn méikòng chīfàn, shènzhì lián shàng cèsuǒ de shíjiān dōu"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "甚至 — thậm chí",
   "giaiThich": "Nêu trường hợp cực đoan nhất để nhấn mạnh mức độ."
  },
  {
   "title": "3. 以＋方向（東西南北）",
   "points": [
    {
     "label": null,
     "formula": "「以」表示方位的界限。「以」的前面放地區或是地名，例如：「臺中以北」意思是「臺中」為界限的北方。",
     "examples": [
      {
       "hz": "地震過後沒多久，人們發現中部以北和以南的地方也有不2.車站以北的地區比其他地區熱鬧，如果你想逛街購物，那裡真是個好地方。",
       "vi": "Không lâu sau trận động đất, người ta phát hiện các vùng phía bắc và phía nam miền Trung cũng có không ít… Khu vực phía bắc nhà ga náo nhiệt hơn các khu khác, nếu bạn muốn dạo phố mua sắm thì đó đúng là chỗ lý tưởng.",
       "py": "Dìzhèn guòhòu méiduōjiǔ, rénmen fāxiàn zhōngbù yǐběi hàn yǐnán de dìfāng yě yǒu bù 2. Chēzhàn yǐběi de dìqū bǐ qítā dìqū rènào, rúguǒ nǐ xiǎng guàngjiē gòuwù, nàlǐ zhēnshì gè hǎo dìfāng."
      },
      {
       "hz": "我覺得花蓮市以南到臺東這一段路的風景最美，值得推薦給喜歡旅遊的人。",
       "vi": "Tôi thấy đoạn đường từ phía nam thành phố Hoa Liên đến Đài Đông có phong cảnh đẹp nhất, đáng để giới thiệu cho người thích du lịch.",
       "py": "Wǒ juéde huāliánshì yǐnán dào táidōng zhè yíduànlù de fēngjǐng zuìměi, zhíde tuījiàn gěi xǐhuān lǚyóu de rén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以 + phương hướng — lấy… làm ranh giới",
   "giaiThich": "以 đánh dấu ranh giới địa lý: trước 以 là địa danh (臺中以北 nghĩa là phía bắc, lấy Đài Trung làm mốc)."
  }
 ],
 "td3-5.2": [
  {
   "title": "1. 萬一",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「萬一」後面是可能性很小的假設，大多是不好的事情。",
       "vi": "Sau “萬一” là một giả định có khả năng xảy ra rất thấp, phần lớn là chuyện không hay.",
       "py": "“Wànyí” hòumiàn shì kěnéngxìng hěnxiǎo de jiǎshè, dàduō shì bùhǎo de shìqíng."
      },
      {
       "hz": "⋯⋯要注意門窗有沒有問題，萬一被颱風吹壞，造成意外就麻煩了。",
       "vi": "…phải chú ý xem cửa ra vào, cửa sổ có vấn đề gì không, lỡ bị bão làm hỏng, gây ra tai nạn thì phiền lắm.",
       "py": "…… yào zhùyì ménchuāng yǒuméiyǒu wèntí, wànyí bèi táifēng chuī huài, zàochéng yìwài jiù máfán le."
      },
      {
       "hz": "出國旅遊前最好先買個旅遊平安保險，萬一發生什麼意外，就不必擔心了。",
       "vi": "Trước khi đi du lịch nước ngoài, tốt nhất nên mua bảo hiểm du lịch, lỡ có xảy ra chuyện gì thì cũng không phải lo.",
       "py": "Chūguó lǚyóu qián zuìhǎo xiānmǎi gè lǚyóu píng'ānbǎoxiǎn, wànyì fāshēng shénme yìwài, jiù búbì dānxīn le."
      },
      {
       "hz": "我家裡平時都準備了一些蠟燭、電池什麼的，萬一停電了，才不會不方便。",
       "vi": "Nhà tôi bình thường luôn chuẩn bị sẵn nến, pin, v.v., nhỡ mất điện thì mới không bất tiện.",
       "py": "Wǒ jiālǐ píngshí dōu zhǔnbèi le yìxiē làzhú, diànchí shénme de, wànyì tíngdiàn le, cái búhuì bù fāngbiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "萬一 — lỡ như, nhỡ mà",
   "giaiThich": "Nêu giả thiết về điều không mong muốn, xác suất thấp nhưng cần đề phòng."
  },
  {
   "title": "2. 一連",
   "points": [
    {
     "label": null,
     "formula": "「一連」表示同一個動作或情況連續發生，後面接動詞或數量詞。例如：「他一連吃了五個包子」、「一連三天我都在家休息」。而否定詞「不」或「沒」只能用在數量詞後面的動詞，例如：「一連三天都沒下雨」。",
     "examples": [
      {
       "hz": "⋯⋯有一次來了個大颱風，一連下了好幾天的大雨。",
       "vi": "…có một lần có trận bão lớn, mưa to liên tiếp mấy ngày liền.",
       "py": "…… yǒu yícì lái le gè dà táifēng, yìlián xià le hǎo jǐtiān de dàyǔ."
      },
      {
       "hz": "他一連說了好幾個我聽不懂的句子，他說的到底是哪國話3.我最近窮死了，已經一連兩個星期都吃泡麵了。",
       "vi": "Anh ấy nói liền mấy câu tôi nghe không hiểu, rốt cuộc anh ấy nói tiếng nước nào vậy… Dạo này tôi nghèo chết đi được, đã ăn mì gói liền hai tuần rồi.",
       "py": "Tā yìlián shuō le hǎojǐgè wǒ tīngbùdǒng de jùzi, tā shuō de dàodǐ shì nǎ guó huà 3. Wǒ zuìjìn qióngsǐ le, yǐjīng yìlián liǎnggè xīngqí dōu chī pàomiàn le."
      },
      {
       "hz": "他最近為了工作忙個不停，已經一連三天沒睡好覺了，精神很不好。",
       "vi": "Dạo này anh ấy bận không ngơi vì công việc, đã liên tiếp ba ngày không ngủ ngon, tinh thần rất kém.",
       "py": "Tā zuìjìn wèile gōngzuò máng gè bùtíng, yǐjīng yìlián sāntiān méi shuì hǎo jué le, jīngshén hěn bùhǎo."
      },
      {
       "hz": "「以為」後面是說話者原本的想法，但和後面發生的事實不同。「沒想到」的後面是發生的事實，但發生前說話的人沒想過。",
       "vi": "Sau “以為” là suy nghĩ ban đầu của người nói, nhưng khác với sự thật xảy ra sau đó. Sau “沒想到” là sự thật đã xảy ra, nhưng trước khi xảy ra người nói chưa từng nghĩ tới.",
       "py": "“Yǐwéi” hòumiàn shì shuōhuà zhě yuánběn de xiǎngfǎ, dàn hàn hòumiàn fāshēng de shìshí bùtóng. “Méixiǎngdào” de hòumiàn shì fāshēng de shìshí, dàn fāshēng qián shuōhuà de rén méi xiǎng guò."
      },
      {
       "hz": "我以為隨時去超市都買得到新鮮的蔬菜，沒想到新聞一說2.我以為我不會看上那件深紅色的洋裝，沒想到看來看去，最後還是買了。",
       "vi": "Tôi tưởng lúc nào đi siêu thị cũng mua được rau tươi, không ngờ tin tức vừa nói… Tôi tưởng mình sẽ không ưng chiếc váy màu đỏ sẫm đó, không ngờ xem tới xem lui, cuối cùng vẫn mua.",
       "py": "Wǒ yǐwéi suíshí qù chāoshì dōu mǎi dédào xīnxiān de shūcài, méixiǎngdào xīnwén yì shuō 2. Wǒ yǐwéi wǒ búhuì kàn shàng nà jiàn shēnhóngsè de yángzhuāng, méixiǎngdào kànláikànqù, zuìhòu háishì mǎi le."
      },
      {
       "hz": "王媽媽以為這道菜孩子們一定會搶著吃，沒想到他們連嚐都不肯嚐。",
       "vi": "Mẹ Vương tưởng bọn trẻ nhất định sẽ tranh nhau ăn món này, không ngờ chúng nếm cũng không chịu nếm.",
       "py": "Wáng māma yǐwéi zhè dàocài háizi men yídìng huì qiǎng zhe chī, méixiǎngdào tāmen lián cháng dōu bùkěn cháng."
      },
      {
       "hz": "說話的人比較了不同情況以後，做出結論或提出建議。「還是」後面是提出的建議。",
       "vi": "Người nói so sánh các tình huống khác nhau rồi đưa ra kết luận hoặc lời khuyên. Sau “還是” là lời khuyên được đưa ra.",
       "py": "Shuōhuà de rén bǐjiào le bùtóng qíngkuàng yǐhòu, zuòchū jiélùn huò tíchū jiànyì. “Háishì” hòumiàn shì tíchū de jiànyì."
      },
      {
       "hz": "⋯⋯，你還是先買收音機，再去超市吧。",
       "vi": "…, tốt hơn hết là bạn mua radio trước rồi hãy đi siêu thị.",
       "py": "……, nǐ háishì xiānmǎi shōuyīnjī, zài qù chāoshì ba."
      },
      {
       "hz": "A：我想安排時間去日本旅行，你想什麼時候去最好？",
       "vi": "A: Tôi muốn sắp xếp thời gian đi du lịch Nhật, bạn thấy đi lúc nào là tốt nhất?",
       "py": "A: Wǒ xiǎng ānpái shíjiān qù Rìběn lǚxíng, nǐ xiǎng shénme shíhòu qù zuìhǎo?"
      },
      {
       "hz": "B：日本春夏秋冬都美，任何時候去都好，你還是以自己方便的時間去吧。",
       "vi": "B: Nhật Bản xuân hạ thu đông đều đẹp, đi lúc nào cũng được, tốt hơn hết là bạn chọn lúc nào tiện cho mình thì đi.",
       "py": "B: Rìběn chūnxiàqiūdōng dōu měi, rènhé shíhòu qù dōu hǎo, nǐ háishì yǐ zìjǐ fāngbiàn de shíjiān qù ba."
      },
      {
       "hz": "兒子：中秋節快到了，我可以找朋友來我們社區烤肉嗎？",
       "vi": "Con trai: Sắp đến Trung thu rồi, con rủ bạn đến khu nhà mình nướng thịt được không?",
       "py": "Érzi: Zhōngqiūjié kuài dào le, wǒ kěyǐ zhǎo péngyǒu lái wǒmen shèqū kǎoròu ma?"
      },
      {
       "hz": "爸爸：我擔心會影響鄰居的生活，你們還是去別的地方吧。",
       "vi": "Bố: Bố sợ ảnh hưởng đến cuộc sống của hàng xóm, tốt hơn hết các con đi chỗ khác đi.",
       "py": "Bàba: Wǒ dānxīn huì yǐngxiǎng línjū de shēnghuó, nǐmen háishì qù biéde dìfāng ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一連 — liên tiếp",
   "giaiThich": "Cùng một hành động hoặc tình huống xảy ra liên tiếp; sau 一連 là động từ hoặc cụm số lượng (他一連吃了五個包子). Từ phủ định 不/沒 chỉ đặt ở động từ SAU cụm số lượng (一連三天都沒下雨)."
  },
  {
   "title": "1. 結果",
   "points": [
    {
     "label": null,
     "formula": "「結果」作連詞，表示事情發生後，最後的情況。「結果」後面接的句子是這件事情最後的情況。",
     "examples": [
      {
       "hz": "⋯⋯又發生了規模六點七的地震，結果造成了非常嚴重的2.昨天我在夜市看上了一件上衣，沒試穿就買了，結果回家後穿上才發現太小了。",
       "vi": "…lại xảy ra trận động đất cường độ 6,7, kết quả gây ra thiệt hại vô cùng nghiêm trọng… Hôm qua tôi ưng một chiếc áo ở chợ đêm, chưa thử đã mua, kết quả về nhà mặc vào mới thấy quá nhỏ.",
       "py": "…… yòu fāshēng le guīmó liùdiǎn qī de dìzhèn, jiéguǒ zàochéng le fēicháng yánzhòng de 2. Zuótiān wǒ zài yèshì kàn shàng le yíjiàn shàngyī, méi shìchuān jiù mǎi le, jiéguǒ huíjiā hòu chuān shàng cái fāxiàn tàixiǎo le."
      },
      {
       "hz": "這幾個月很多人因為感冒而住院了，我和家人出門都會戴上口罩，結果妹妹還是感冒了。",
       "vi": "Mấy tháng nay nhiều người phải nhập viện vì cảm cúm, tôi và gia đình ra ngoài đều đeo khẩu trang, kết quả em gái vẫn bị cảm.",
       "py": "Zhè jǐgè yuè hěnduō rén yīnwèi gǎnmào ér zhùyuàn le, wǒ hàn jiārén chūmén dōu huì dài shàng kǒuzhào, jiéguǒ mèimei háishì gǎnmào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "結果 — kết quả là",
   "giaiThich": "Liên từ, nêu tình huống cuối cùng sau khi sự việc diễn ra."
  },
  {
   "title": "2. 甚至",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「甚至」後面是說話的人要強調的人、事或物。有時和「不但/不僅」或「連⋯⋯都/也⋯⋯」一起使用，例如：我姊姊不但會唱歌，也會寫歌，甚至辦過個人演唱會。",
       "vi": "Sau “甚至” là người, việc hoặc vật mà người nói muốn nhấn mạnh. Đôi khi dùng cùng “不但/不僅” hoặc “連……都/也……”, ví dụ: Chị tôi không những biết hát mà còn biết sáng tác, thậm chí đã từng tổ chức liveshow riêng.",
       "py": "“Shènzhì” hòumiàn shì shuōhuà de rén yào qiángdiào de rén, shì huò wù. Yǒushí hàn “búdàn / bùjǐn” huò “lián…… dōu / yě……” yìqǐ shǐyòng, lìrú: Wǒ jiějie búdàn huì chànggē, yě huì xiěgē, shènzhì bàn guò gèrén yǎnchànghuì."
      },
      {
       "hz": "⋯⋯不但路不通，甚至還有人被困在塌下來的屋子或石頭2.張小姐什麼動物都不怕，就是怕蛇，甚至連蛇的圖片也怕。",
       "vi": "…không những đường bị tắc, thậm chí còn có người bị kẹt dưới nhà sập hay đá… Cô Trương con vật gì cũng không sợ, chỉ sợ rắn, thậm chí đến ảnh con rắn cũng sợ.",
       "py": "…… búdàn lù bùtōng, shènzhì háiyǒu rén bèikùn zài tāxiàlái de wūzi huò shítou 2. Zhāng xiǎojiě shénme dòngwù dōu búpà, jiùshì pà shé, shènzhì lián shé de túpiàn yě pà."
      },
      {
       "hz": "馬老闆一忙起來，不但沒空吃飯，甚至連上廁所的時間都",
       "vi": "Ông chủ Mã mà bận lên là không những không có thời gian ăn cơm, thậm chí đến thời gian đi vệ sinh cũng…",
       "py": "Mǎ lǎobǎn yì máng qǐlái, búdàn méikòng chīfàn, shènzhì lián shàng cèsuǒ de shíjiān dōu"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "甚至 — thậm chí",
   "giaiThich": "Nêu trường hợp cực đoan nhất để nhấn mạnh mức độ."
  },
  {
   "title": "3. 以＋方向（東西南北）",
   "points": [
    {
     "label": null,
     "formula": "「以」表示方位的界限。「以」的前面放地區或是地名，例如：「臺中以北」意思是「臺中」為界限的北方。",
     "examples": [
      {
       "hz": "地震過後沒多久，人們發現中部以北和以南的地方也有不2.車站以北的地區比其他地區熱鬧，如果你想逛街購物，那裡真是個好地方。",
       "vi": "Không lâu sau trận động đất, người ta phát hiện các vùng phía bắc và phía nam miền Trung cũng có không ít… Khu vực phía bắc nhà ga náo nhiệt hơn các khu khác, nếu bạn muốn dạo phố mua sắm thì đó đúng là chỗ lý tưởng.",
       "py": "Dìzhèn guòhòu méiduōjiǔ, rénmen fāxiàn zhōngbù yǐběi hàn yǐnán de dìfāng yě yǒu bù 2. Chēzhàn yǐběi de dìqū bǐ qítā dìqū rènào, rúguǒ nǐ xiǎng guàngjiē gòuwù, nàlǐ zhēnshì gè hǎo dìfāng."
      },
      {
       "hz": "我覺得花蓮市以南到臺東這一段路的風景最美，值得推薦給喜歡旅遊的人。",
       "vi": "Tôi thấy đoạn đường từ phía nam thành phố Hoa Liên đến Đài Đông có phong cảnh đẹp nhất, đáng để giới thiệu cho người thích du lịch.",
       "py": "Wǒ juéde huāliánshì yǐnán dào táidōng zhè yíduànlù de fēngjǐng zuìměi, zhíde tuījiàn gěi xǐhuān lǚyóu de rén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以 + phương hướng — lấy… làm ranh giới",
   "giaiThich": "以 đánh dấu ranh giới địa lý: trước 以 là địa danh (臺中以北 nghĩa là phía bắc, lấy Đài Trung làm mốc)."
  }
 ],
 "td3-5.3": [
  {
   "title": "1. 萬一",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「萬一」後面是可能性很小的假設，大多是不好的事情。",
       "vi": "Sau “萬一” là một giả định có khả năng xảy ra rất thấp, phần lớn là chuyện không hay.",
       "py": "“Wànyí” hòumiàn shì kěnéngxìng hěnxiǎo de jiǎshè, dàduō shì bùhǎo de shìqíng."
      },
      {
       "hz": "⋯⋯要注意門窗有沒有問題，萬一被颱風吹壞，造成意外就麻煩了。",
       "vi": "…phải chú ý xem cửa ra vào, cửa sổ có vấn đề gì không, lỡ bị bão làm hỏng, gây ra tai nạn thì phiền lắm.",
       "py": "…… yào zhùyì ménchuāng yǒuméiyǒu wèntí, wànyí bèi táifēng chuī huài, zàochéng yìwài jiù máfán le."
      },
      {
       "hz": "出國旅遊前最好先買個旅遊平安保險，萬一發生什麼意外，就不必擔心了。",
       "vi": "Trước khi đi du lịch nước ngoài, tốt nhất nên mua bảo hiểm du lịch, lỡ có xảy ra chuyện gì thì cũng không phải lo.",
       "py": "Chūguó lǚyóu qián zuìhǎo xiānmǎi gè lǚyóu píng'ānbǎoxiǎn, wànyì fāshēng shénme yìwài, jiù búbì dānxīn le."
      },
      {
       "hz": "我家裡平時都準備了一些蠟燭、電池什麼的，萬一停電了，才不會不方便。",
       "vi": "Nhà tôi bình thường luôn chuẩn bị sẵn nến, pin, v.v., nhỡ mất điện thì mới không bất tiện.",
       "py": "Wǒ jiālǐ píngshí dōu zhǔnbèi le yìxiē làzhú, diànchí shénme de, wànyì tíngdiàn le, cái búhuì bù fāngbiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "萬一 — lỡ như, nhỡ mà",
   "giaiThich": "Nêu giả thiết về điều không mong muốn, xác suất thấp nhưng cần đề phòng."
  },
  {
   "title": "2. 一連",
   "points": [
    {
     "label": null,
     "formula": "「一連」表示同一個動作或情況連續發生，後面接動詞或數量詞。例如：「他一連吃了五個包子」、「一連三天我都在家休息」。而否定詞「不」或「沒」只能用在數量詞後面的動詞，例如：「一連三天都沒下雨」。",
     "examples": [
      {
       "hz": "⋯⋯有一次來了個大颱風，一連下了好幾天的大雨。",
       "vi": "…có một lần có trận bão lớn, mưa to liên tiếp mấy ngày liền.",
       "py": "…… yǒu yícì lái le gè dà táifēng, yìlián xià le hǎo jǐtiān de dàyǔ."
      },
      {
       "hz": "他一連說了好幾個我聽不懂的句子，他說的到底是哪國話3.我最近窮死了，已經一連兩個星期都吃泡麵了。",
       "vi": "Anh ấy nói liền mấy câu tôi nghe không hiểu, rốt cuộc anh ấy nói tiếng nước nào vậy… Dạo này tôi nghèo chết đi được, đã ăn mì gói liền hai tuần rồi.",
       "py": "Tā yìlián shuō le hǎojǐgè wǒ tīngbùdǒng de jùzi, tā shuō de dàodǐ shì nǎ guó huà 3. Wǒ zuìjìn qióngsǐ le, yǐjīng yìlián liǎnggè xīngqí dōu chī pàomiàn le."
      },
      {
       "hz": "他最近為了工作忙個不停，已經一連三天沒睡好覺了，精神很不好。",
       "vi": "Dạo này anh ấy bận không ngơi vì công việc, đã liên tiếp ba ngày không ngủ ngon, tinh thần rất kém.",
       "py": "Tā zuìjìn wèile gōngzuò máng gè bùtíng, yǐjīng yìlián sāntiān méi shuì hǎo jué le, jīngshén hěn bùhǎo."
      },
      {
       "hz": "「以為」後面是說話者原本的想法，但和後面發生的事實不同。「沒想到」的後面是發生的事實，但發生前說話的人沒想過。",
       "vi": "Sau “以為” là suy nghĩ ban đầu của người nói, nhưng khác với sự thật xảy ra sau đó. Sau “沒想到” là sự thật đã xảy ra, nhưng trước khi xảy ra người nói chưa từng nghĩ tới.",
       "py": "“Yǐwéi” hòumiàn shì shuōhuà zhě yuánběn de xiǎngfǎ, dàn hàn hòumiàn fāshēng de shìshí bùtóng. “Méixiǎngdào” de hòumiàn shì fāshēng de shìshí, dàn fāshēng qián shuōhuà de rén méi xiǎng guò."
      },
      {
       "hz": "我以為隨時去超市都買得到新鮮的蔬菜，沒想到新聞一說2.我以為我不會看上那件深紅色的洋裝，沒想到看來看去，最後還是買了。",
       "vi": "Tôi tưởng lúc nào đi siêu thị cũng mua được rau tươi, không ngờ tin tức vừa nói… Tôi tưởng mình sẽ không ưng chiếc váy màu đỏ sẫm đó, không ngờ xem tới xem lui, cuối cùng vẫn mua.",
       "py": "Wǒ yǐwéi suíshí qù chāoshì dōu mǎi dédào xīnxiān de shūcài, méixiǎngdào xīnwén yì shuō 2. Wǒ yǐwéi wǒ búhuì kàn shàng nà jiàn shēnhóngsè de yángzhuāng, méixiǎngdào kànláikànqù, zuìhòu háishì mǎi le."
      },
      {
       "hz": "王媽媽以為這道菜孩子們一定會搶著吃，沒想到他們連嚐都不肯嚐。",
       "vi": "Mẹ Vương tưởng bọn trẻ nhất định sẽ tranh nhau ăn món này, không ngờ chúng nếm cũng không chịu nếm.",
       "py": "Wáng māma yǐwéi zhè dàocài háizi men yídìng huì qiǎng zhe chī, méixiǎngdào tāmen lián cháng dōu bùkěn cháng."
      },
      {
       "hz": "說話的人比較了不同情況以後，做出結論或提出建議。「還是」後面是提出的建議。",
       "vi": "Người nói so sánh các tình huống khác nhau rồi đưa ra kết luận hoặc lời khuyên. Sau “還是” là lời khuyên được đưa ra.",
       "py": "Shuōhuà de rén bǐjiào le bùtóng qíngkuàng yǐhòu, zuòchū jiélùn huò tíchū jiànyì. “Háishì” hòumiàn shì tíchū de jiànyì."
      },
      {
       "hz": "⋯⋯，你還是先買收音機，再去超市吧。",
       "vi": "…, tốt hơn hết là bạn mua radio trước rồi hãy đi siêu thị.",
       "py": "……, nǐ háishì xiānmǎi shōuyīnjī, zài qù chāoshì ba."
      },
      {
       "hz": "A：我想安排時間去日本旅行，你想什麼時候去最好？",
       "vi": "A: Tôi muốn sắp xếp thời gian đi du lịch Nhật, bạn thấy đi lúc nào là tốt nhất?",
       "py": "A: Wǒ xiǎng ānpái shíjiān qù Rìběn lǚxíng, nǐ xiǎng shénme shíhòu qù zuìhǎo?"
      },
      {
       "hz": "B：日本春夏秋冬都美，任何時候去都好，你還是以自己方便的時間去吧。",
       "vi": "B: Nhật Bản xuân hạ thu đông đều đẹp, đi lúc nào cũng được, tốt hơn hết là bạn chọn lúc nào tiện cho mình thì đi.",
       "py": "B: Rìběn chūnxiàqiūdōng dōu měi, rènhé shíhòu qù dōu hǎo, nǐ háishì yǐ zìjǐ fāngbiàn de shíjiān qù ba."
      },
      {
       "hz": "兒子：中秋節快到了，我可以找朋友來我們社區烤肉嗎？",
       "vi": "Con trai: Sắp đến Trung thu rồi, con rủ bạn đến khu nhà mình nướng thịt được không?",
       "py": "Érzi: Zhōngqiūjié kuài dào le, wǒ kěyǐ zhǎo péngyǒu lái wǒmen shèqū kǎoròu ma?"
      },
      {
       "hz": "爸爸：我擔心會影響鄰居的生活，你們還是去別的地方吧。",
       "vi": "Bố: Bố sợ ảnh hưởng đến cuộc sống của hàng xóm, tốt hơn hết các con đi chỗ khác đi.",
       "py": "Bàba: Wǒ dānxīn huì yǐngxiǎng línjū de shēnghuó, nǐmen háishì qù biéde dìfāng ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一連 — liên tiếp",
   "giaiThich": "Cùng một hành động hoặc tình huống xảy ra liên tiếp; sau 一連 là động từ hoặc cụm số lượng (他一連吃了五個包子). Từ phủ định 不/沒 chỉ đặt ở động từ SAU cụm số lượng (一連三天都沒下雨)."
  },
  {
   "title": "1. 結果",
   "points": [
    {
     "label": null,
     "formula": "「結果」作連詞，表示事情發生後，最後的情況。「結果」後面接的句子是這件事情最後的情況。",
     "examples": [
      {
       "hz": "⋯⋯又發生了規模六點七的地震，結果造成了非常嚴重的2.昨天我在夜市看上了一件上衣，沒試穿就買了，結果回家後穿上才發現太小了。",
       "vi": "…lại xảy ra trận động đất cường độ 6,7, kết quả gây ra thiệt hại vô cùng nghiêm trọng… Hôm qua tôi ưng một chiếc áo ở chợ đêm, chưa thử đã mua, kết quả về nhà mặc vào mới thấy quá nhỏ.",
       "py": "…… yòu fāshēng le guīmó liùdiǎn qī de dìzhèn, jiéguǒ zàochéng le fēicháng yánzhòng de 2. Zuótiān wǒ zài yèshì kàn shàng le yíjiàn shàngyī, méi shìchuān jiù mǎi le, jiéguǒ huíjiā hòu chuān shàng cái fāxiàn tàixiǎo le."
      },
      {
       "hz": "這幾個月很多人因為感冒而住院了，我和家人出門都會戴上口罩，結果妹妹還是感冒了。",
       "vi": "Mấy tháng nay nhiều người phải nhập viện vì cảm cúm, tôi và gia đình ra ngoài đều đeo khẩu trang, kết quả em gái vẫn bị cảm.",
       "py": "Zhè jǐgè yuè hěnduō rén yīnwèi gǎnmào ér zhùyuàn le, wǒ hàn jiārén chūmén dōu huì dài shàng kǒuzhào, jiéguǒ mèimei háishì gǎnmào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "結果 — kết quả là",
   "giaiThich": "Liên từ, nêu tình huống cuối cùng sau khi sự việc diễn ra."
  },
  {
   "title": "2. 甚至",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「甚至」後面是說話的人要強調的人、事或物。有時和「不但/不僅」或「連⋯⋯都/也⋯⋯」一起使用，例如：我姊姊不但會唱歌，也會寫歌，甚至辦過個人演唱會。",
       "vi": "Sau “甚至” là người, việc hoặc vật mà người nói muốn nhấn mạnh. Đôi khi dùng cùng “不但/不僅” hoặc “連……都/也……”, ví dụ: Chị tôi không những biết hát mà còn biết sáng tác, thậm chí đã từng tổ chức liveshow riêng.",
       "py": "“Shènzhì” hòumiàn shì shuōhuà de rén yào qiángdiào de rén, shì huò wù. Yǒushí hàn “búdàn / bùjǐn” huò “lián…… dōu / yě……” yìqǐ shǐyòng, lìrú: Wǒ jiějie búdàn huì chànggē, yě huì xiěgē, shènzhì bàn guò gèrén yǎnchànghuì."
      },
      {
       "hz": "⋯⋯不但路不通，甚至還有人被困在塌下來的屋子或石頭2.張小姐什麼動物都不怕，就是怕蛇，甚至連蛇的圖片也怕。",
       "vi": "…không những đường bị tắc, thậm chí còn có người bị kẹt dưới nhà sập hay đá… Cô Trương con vật gì cũng không sợ, chỉ sợ rắn, thậm chí đến ảnh con rắn cũng sợ.",
       "py": "…… búdàn lù bùtōng, shènzhì háiyǒu rén bèikùn zài tāxiàlái de wūzi huò shítou 2. Zhāng xiǎojiě shénme dòngwù dōu búpà, jiùshì pà shé, shènzhì lián shé de túpiàn yě pà."
      },
      {
       "hz": "馬老闆一忙起來，不但沒空吃飯，甚至連上廁所的時間都",
       "vi": "Ông chủ Mã mà bận lên là không những không có thời gian ăn cơm, thậm chí đến thời gian đi vệ sinh cũng…",
       "py": "Mǎ lǎobǎn yì máng qǐlái, búdàn méikòng chīfàn, shènzhì lián shàng cèsuǒ de shíjiān dōu"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "甚至 — thậm chí",
   "giaiThich": "Nêu trường hợp cực đoan nhất để nhấn mạnh mức độ."
  },
  {
   "title": "3. 以＋方向（東西南北）",
   "points": [
    {
     "label": null,
     "formula": "「以」表示方位的界限。「以」的前面放地區或是地名，例如：「臺中以北」意思是「臺中」為界限的北方。",
     "examples": [
      {
       "hz": "地震過後沒多久，人們發現中部以北和以南的地方也有不2.車站以北的地區比其他地區熱鬧，如果你想逛街購物，那裡真是個好地方。",
       "vi": "Không lâu sau trận động đất, người ta phát hiện các vùng phía bắc và phía nam miền Trung cũng có không ít… Khu vực phía bắc nhà ga náo nhiệt hơn các khu khác, nếu bạn muốn dạo phố mua sắm thì đó đúng là chỗ lý tưởng.",
       "py": "Dìzhèn guòhòu méiduōjiǔ, rénmen fāxiàn zhōngbù yǐběi hàn yǐnán de dìfāng yě yǒu bù 2. Chēzhàn yǐběi de dìqū bǐ qítā dìqū rènào, rúguǒ nǐ xiǎng guàngjiē gòuwù, nàlǐ zhēnshì gè hǎo dìfāng."
      },
      {
       "hz": "我覺得花蓮市以南到臺東這一段路的風景最美，值得推薦給喜歡旅遊的人。",
       "vi": "Tôi thấy đoạn đường từ phía nam thành phố Hoa Liên đến Đài Đông có phong cảnh đẹp nhất, đáng để giới thiệu cho người thích du lịch.",
       "py": "Wǒ juéde huāliánshì yǐnán dào táidōng zhè yíduànlù de fēngjǐng zuìměi, zhíde tuījiàn gěi xǐhuān lǚyóu de rén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以 + phương hướng — lấy… làm ranh giới",
   "giaiThich": "以 đánh dấu ranh giới địa lý: trước 以 là địa danh (臺中以北 nghĩa là phía bắc, lấy Đài Trung làm mốc)."
  }
 ],
 "td3-5.4": [
  {
   "title": "1. 萬一",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「萬一」後面是可能性很小的假設，大多是不好的事情。",
       "vi": "Sau “萬一” là một giả định có khả năng xảy ra rất thấp, phần lớn là chuyện không hay.",
       "py": "“Wànyí” hòumiàn shì kěnéngxìng hěnxiǎo de jiǎshè, dàduō shì bùhǎo de shìqíng."
      },
      {
       "hz": "⋯⋯要注意門窗有沒有問題，萬一被颱風吹壞，造成意外就麻煩了。",
       "vi": "…phải chú ý xem cửa ra vào, cửa sổ có vấn đề gì không, lỡ bị bão làm hỏng, gây ra tai nạn thì phiền lắm.",
       "py": "…… yào zhùyì ménchuāng yǒuméiyǒu wèntí, wànyí bèi táifēng chuī huài, zàochéng yìwài jiù máfán le."
      },
      {
       "hz": "出國旅遊前最好先買個旅遊平安保險，萬一發生什麼意外，就不必擔心了。",
       "vi": "Trước khi đi du lịch nước ngoài, tốt nhất nên mua bảo hiểm du lịch, lỡ có xảy ra chuyện gì thì cũng không phải lo.",
       "py": "Chūguó lǚyóu qián zuìhǎo xiānmǎi gè lǚyóu píng'ānbǎoxiǎn, wànyì fāshēng shénme yìwài, jiù búbì dānxīn le."
      },
      {
       "hz": "我家裡平時都準備了一些蠟燭、電池什麼的，萬一停電了，才不會不方便。",
       "vi": "Nhà tôi bình thường luôn chuẩn bị sẵn nến, pin, v.v., nhỡ mất điện thì mới không bất tiện.",
       "py": "Wǒ jiālǐ píngshí dōu zhǔnbèi le yìxiē làzhú, diànchí shénme de, wànyì tíngdiàn le, cái búhuì bù fāngbiàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "萬一 — lỡ như, nhỡ mà",
   "giaiThich": "Nêu giả thiết về điều không mong muốn, xác suất thấp nhưng cần đề phòng."
  },
  {
   "title": "2. 一連",
   "points": [
    {
     "label": null,
     "formula": "「一連」表示同一個動作或情況連續發生，後面接動詞或數量詞。例如：「他一連吃了五個包子」、「一連三天我都在家休息」。而否定詞「不」或「沒」只能用在數量詞後面的動詞，例如：「一連三天都沒下雨」。",
     "examples": [
      {
       "hz": "⋯⋯有一次來了個大颱風，一連下了好幾天的大雨。",
       "vi": "…có một lần có trận bão lớn, mưa to liên tiếp mấy ngày liền.",
       "py": "…… yǒu yícì lái le gè dà táifēng, yìlián xià le hǎo jǐtiān de dàyǔ."
      },
      {
       "hz": "他一連說了好幾個我聽不懂的句子，他說的到底是哪國話3.我最近窮死了，已經一連兩個星期都吃泡麵了。",
       "vi": "Anh ấy nói liền mấy câu tôi nghe không hiểu, rốt cuộc anh ấy nói tiếng nước nào vậy… Dạo này tôi nghèo chết đi được, đã ăn mì gói liền hai tuần rồi.",
       "py": "Tā yìlián shuō le hǎojǐgè wǒ tīngbùdǒng de jùzi, tā shuō de dàodǐ shì nǎ guó huà 3. Wǒ zuìjìn qióngsǐ le, yǐjīng yìlián liǎnggè xīngqí dōu chī pàomiàn le."
      },
      {
       "hz": "他最近為了工作忙個不停，已經一連三天沒睡好覺了，精神很不好。",
       "vi": "Dạo này anh ấy bận không ngơi vì công việc, đã liên tiếp ba ngày không ngủ ngon, tinh thần rất kém.",
       "py": "Tā zuìjìn wèile gōngzuò máng gè bùtíng, yǐjīng yìlián sāntiān méi shuì hǎo jué le, jīngshén hěn bùhǎo."
      },
      {
       "hz": "「以為」後面是說話者原本的想法，但和後面發生的事實不同。「沒想到」的後面是發生的事實，但發生前說話的人沒想過。",
       "vi": "Sau “以為” là suy nghĩ ban đầu của người nói, nhưng khác với sự thật xảy ra sau đó. Sau “沒想到” là sự thật đã xảy ra, nhưng trước khi xảy ra người nói chưa từng nghĩ tới.",
       "py": "“Yǐwéi” hòumiàn shì shuōhuà zhě yuánběn de xiǎngfǎ, dàn hàn hòumiàn fāshēng de shìshí bùtóng. “Méixiǎngdào” de hòumiàn shì fāshēng de shìshí, dàn fāshēng qián shuōhuà de rén méi xiǎng guò."
      },
      {
       "hz": "我以為隨時去超市都買得到新鮮的蔬菜，沒想到新聞一說2.我以為我不會看上那件深紅色的洋裝，沒想到看來看去，最後還是買了。",
       "vi": "Tôi tưởng lúc nào đi siêu thị cũng mua được rau tươi, không ngờ tin tức vừa nói… Tôi tưởng mình sẽ không ưng chiếc váy màu đỏ sẫm đó, không ngờ xem tới xem lui, cuối cùng vẫn mua.",
       "py": "Wǒ yǐwéi suíshí qù chāoshì dōu mǎi dédào xīnxiān de shūcài, méixiǎngdào xīnwén yì shuō 2. Wǒ yǐwéi wǒ búhuì kàn shàng nà jiàn shēnhóngsè de yángzhuāng, méixiǎngdào kànláikànqù, zuìhòu háishì mǎi le."
      },
      {
       "hz": "王媽媽以為這道菜孩子們一定會搶著吃，沒想到他們連嚐都不肯嚐。",
       "vi": "Mẹ Vương tưởng bọn trẻ nhất định sẽ tranh nhau ăn món này, không ngờ chúng nếm cũng không chịu nếm.",
       "py": "Wáng māma yǐwéi zhè dàocài háizi men yídìng huì qiǎng zhe chī, méixiǎngdào tāmen lián cháng dōu bùkěn cháng."
      },
      {
       "hz": "說話的人比較了不同情況以後，做出結論或提出建議。「還是」後面是提出的建議。",
       "vi": "Người nói so sánh các tình huống khác nhau rồi đưa ra kết luận hoặc lời khuyên. Sau “還是” là lời khuyên được đưa ra.",
       "py": "Shuōhuà de rén bǐjiào le bùtóng qíngkuàng yǐhòu, zuòchū jiélùn huò tíchū jiànyì. “Háishì” hòumiàn shì tíchū de jiànyì."
      },
      {
       "hz": "⋯⋯，你還是先買收音機，再去超市吧。",
       "vi": "…, tốt hơn hết là bạn mua radio trước rồi hãy đi siêu thị.",
       "py": "……, nǐ háishì xiānmǎi shōuyīnjī, zài qù chāoshì ba."
      },
      {
       "hz": "A：我想安排時間去日本旅行，你想什麼時候去最好？",
       "vi": "A: Tôi muốn sắp xếp thời gian đi du lịch Nhật, bạn thấy đi lúc nào là tốt nhất?",
       "py": "A: Wǒ xiǎng ānpái shíjiān qù Rìběn lǚxíng, nǐ xiǎng shénme shíhòu qù zuìhǎo?"
      },
      {
       "hz": "B：日本春夏秋冬都美，任何時候去都好，你還是以自己方便的時間去吧。",
       "vi": "B: Nhật Bản xuân hạ thu đông đều đẹp, đi lúc nào cũng được, tốt hơn hết là bạn chọn lúc nào tiện cho mình thì đi.",
       "py": "B: Rìběn chūnxiàqiūdōng dōu měi, rènhé shíhòu qù dōu hǎo, nǐ háishì yǐ zìjǐ fāngbiàn de shíjiān qù ba."
      },
      {
       "hz": "兒子：中秋節快到了，我可以找朋友來我們社區烤肉嗎？",
       "vi": "Con trai: Sắp đến Trung thu rồi, con rủ bạn đến khu nhà mình nướng thịt được không?",
       "py": "Érzi: Zhōngqiūjié kuài dào le, wǒ kěyǐ zhǎo péngyǒu lái wǒmen shèqū kǎoròu ma?"
      },
      {
       "hz": "爸爸：我擔心會影響鄰居的生活，你們還是去別的地方吧。",
       "vi": "Bố: Bố sợ ảnh hưởng đến cuộc sống của hàng xóm, tốt hơn hết các con đi chỗ khác đi.",
       "py": "Bàba: Wǒ dānxīn huì yǐngxiǎng línjū de shēnghuó, nǐmen háishì qù biéde dìfāng ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一連 — liên tiếp",
   "giaiThich": "Cùng một hành động hoặc tình huống xảy ra liên tiếp; sau 一連 là động từ hoặc cụm số lượng (他一連吃了五個包子). Từ phủ định 不/沒 chỉ đặt ở động từ SAU cụm số lượng (一連三天都沒下雨)."
  },
  {
   "title": "1. 結果",
   "points": [
    {
     "label": null,
     "formula": "「結果」作連詞，表示事情發生後，最後的情況。「結果」後面接的句子是這件事情最後的情況。",
     "examples": [
      {
       "hz": "⋯⋯又發生了規模六點七的地震，結果造成了非常嚴重的2.昨天我在夜市看上了一件上衣，沒試穿就買了，結果回家後穿上才發現太小了。",
       "vi": "…lại xảy ra trận động đất cường độ 6,7, kết quả gây ra thiệt hại vô cùng nghiêm trọng… Hôm qua tôi ưng một chiếc áo ở chợ đêm, chưa thử đã mua, kết quả về nhà mặc vào mới thấy quá nhỏ.",
       "py": "…… yòu fāshēng le guīmó liùdiǎn qī de dìzhèn, jiéguǒ zàochéng le fēicháng yánzhòng de 2. Zuótiān wǒ zài yèshì kàn shàng le yíjiàn shàngyī, méi shìchuān jiù mǎi le, jiéguǒ huíjiā hòu chuān shàng cái fāxiàn tàixiǎo le."
      },
      {
       "hz": "這幾個月很多人因為感冒而住院了，我和家人出門都會戴上口罩，結果妹妹還是感冒了。",
       "vi": "Mấy tháng nay nhiều người phải nhập viện vì cảm cúm, tôi và gia đình ra ngoài đều đeo khẩu trang, kết quả em gái vẫn bị cảm.",
       "py": "Zhè jǐgè yuè hěnduō rén yīnwèi gǎnmào ér zhùyuàn le, wǒ hàn jiārén chūmén dōu huì dài shàng kǒuzhào, jiéguǒ mèimei háishì gǎnmào le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "結果 — kết quả là",
   "giaiThich": "Liên từ, nêu tình huống cuối cùng sau khi sự việc diễn ra."
  },
  {
   "title": "2. 甚至",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「甚至」後面是說話的人要強調的人、事或物。有時和「不但/不僅」或「連⋯⋯都/也⋯⋯」一起使用，例如：我姊姊不但會唱歌，也會寫歌，甚至辦過個人演唱會。",
       "vi": "Sau “甚至” là người, việc hoặc vật mà người nói muốn nhấn mạnh. Đôi khi dùng cùng “不但/不僅” hoặc “連……都/也……”, ví dụ: Chị tôi không những biết hát mà còn biết sáng tác, thậm chí đã từng tổ chức liveshow riêng.",
       "py": "“Shènzhì” hòumiàn shì shuōhuà de rén yào qiángdiào de rén, shì huò wù. Yǒushí hàn “búdàn / bùjǐn” huò “lián…… dōu / yě……” yìqǐ shǐyòng, lìrú: Wǒ jiějie búdàn huì chànggē, yě huì xiěgē, shènzhì bàn guò gèrén yǎnchànghuì."
      },
      {
       "hz": "⋯⋯不但路不通，甚至還有人被困在塌下來的屋子或石頭2.張小姐什麼動物都不怕，就是怕蛇，甚至連蛇的圖片也怕。",
       "vi": "…không những đường bị tắc, thậm chí còn có người bị kẹt dưới nhà sập hay đá… Cô Trương con vật gì cũng không sợ, chỉ sợ rắn, thậm chí đến ảnh con rắn cũng sợ.",
       "py": "…… búdàn lù bùtōng, shènzhì háiyǒu rén bèikùn zài tāxiàlái de wūzi huò shítou 2. Zhāng xiǎojiě shénme dòngwù dōu búpà, jiùshì pà shé, shènzhì lián shé de túpiàn yě pà."
      },
      {
       "hz": "馬老闆一忙起來，不但沒空吃飯，甚至連上廁所的時間都",
       "vi": "Ông chủ Mã mà bận lên là không những không có thời gian ăn cơm, thậm chí đến thời gian đi vệ sinh cũng…",
       "py": "Mǎ lǎobǎn yì máng qǐlái, búdàn méikòng chīfàn, shènzhì lián shàng cèsuǒ de shíjiān dōu"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "甚至 — thậm chí",
   "giaiThich": "Nêu trường hợp cực đoan nhất để nhấn mạnh mức độ."
  },
  {
   "title": "3. 以＋方向（東西南北）",
   "points": [
    {
     "label": null,
     "formula": "「以」表示方位的界限。「以」的前面放地區或是地名，例如：「臺中以北」意思是「臺中」為界限的北方。",
     "examples": [
      {
       "hz": "地震過後沒多久，人們發現中部以北和以南的地方也有不2.車站以北的地區比其他地區熱鬧，如果你想逛街購物，那裡真是個好地方。",
       "vi": "Không lâu sau trận động đất, người ta phát hiện các vùng phía bắc và phía nam miền Trung cũng có không ít… Khu vực phía bắc nhà ga náo nhiệt hơn các khu khác, nếu bạn muốn dạo phố mua sắm thì đó đúng là chỗ lý tưởng.",
       "py": "Dìzhèn guòhòu méiduōjiǔ, rénmen fāxiàn zhōngbù yǐběi hàn yǐnán de dìfāng yě yǒu bù 2. Chēzhàn yǐběi de dìqū bǐ qítā dìqū rènào, rúguǒ nǐ xiǎng guàngjiē gòuwù, nàlǐ zhēnshì gè hǎo dìfāng."
      },
      {
       "hz": "我覺得花蓮市以南到臺東這一段路的風景最美，值得推薦給喜歡旅遊的人。",
       "vi": "Tôi thấy đoạn đường từ phía nam thành phố Hoa Liên đến Đài Đông có phong cảnh đẹp nhất, đáng để giới thiệu cho người thích du lịch.",
       "py": "Wǒ juéde huāliánshì yǐnán dào táidōng zhè yíduànlù de fēngjǐng zuìměi, zhíde tuījiàn gěi xǐhuān lǚyóu de rén."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以 + phương hướng — lấy… làm ranh giới",
   "giaiThich": "以 đánh dấu ranh giới địa lý: trước 以 là địa danh (臺中以北 nghĩa là phía bắc, lấy Đài Trung làm mốc)."
  }
 ],
 "td3-6.1": [
  {
   "title": "2. X分之Y",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "X代表整體，Y代表部分，說明某事物的數量在整體中的比例。例如：「2/3」的中文是「三分之二」、「5%」的中文是「百分之五」",
       "vi": "X là toàn thể, Y là phần, diễn tả tỉ lệ của một sự vật trong tổng thể. Ví dụ: “2/3” tiếng Trung là “三分之二”, “5%” tiếng Trung là “百分之五”.",
       "py": "X dàibiǎo zhěngtǐ, Y dàibiǎo bùfèn, shuōmíng mǒu shìwù de shùliàng zài zhěngtǐ zhōng de bǐlì. Lìrú: “2 / 3” de zhōngwén shì “sānfēnzhī'èr”, “5 %” de zhōngwén shì “bǎifēnzhīwǔ”"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "X 分之 Y — phân số",
   "giaiThich": "Cách đọc phân số: mẫu số đứng trước, tử số đứng sau (五分之四 = bốn phần năm)."
  },
  {
   "title": "1. 最近有人調查⋯⋯發現其中有五分之四的人最常去的休閒",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "場所是「家裡」。",
       "vi": "Địa điểm là “ở nhà”.",
       "py": "Chǎngsuǒ shì “jiālǐ”."
      },
      {
       "hz": "在這座海島上，有百分之九十的人會游泳，百分之五十的人會衝浪。",
       "vi": "Trên hòn đảo này, chín mươi phần trăm người biết bơi, năm mươi phần trăm người biết lướt sóng.",
       "py": "Zài zhè zuò hǎidǎo shàng, yǒu bǎifēnzhījiǔshí de rén huì yóuyǒng, bǎifēnzhīwǔshí de rén huì chōnglàng."
      },
      {
       "hz": "為了當一名成功的足球員，他每天用三分之二的時間來練體力和踢球技巧。",
       "vi": "Để trở thành một cầu thủ bóng đá thành công, mỗi ngày anh ấy dành hai phần ba thời gian để luyện thể lực và kỹ thuật đá bóng.",
       "py": "Wèile dāng yìmíng chénggōng de zú qiúyuán, tā měitiān yòng sānfēnzhī'èr de shíjiān lái liàn tǐlì hàn tīqiú jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với phân số và số liệu",
   "giaiThich": "Phần luyện tập đọc số liệu khảo sát, dùng cách nói phân số."
  },
  {
   "title": "3. 總算",
   "points": [
    {
     "label": null,
     "formula": "「總算」當副詞，表示經過一段時間的等待或努力後，期待的事情實現了。常用在口語。 「既然」當連詞，是前句的句首，接已經發生或確定的事實。「就」放在後句，接說話者對前面事實表示的主觀意見、建議或結論。例如：既然你不要這本書了，就給我吧。 Every minute and every second (is precious)",
     "examples": [
      {
       "hz": "⋯⋯有一段時間不敢衝浪。還好，最後總算克服了。",
       "vi": "…có một thời gian không dám lướt sóng. May mà cuối cùng cũng vượt qua được.",
       "py": "…… yǒu yíduànshíjiān bùgǎn chōnglàng. Háihǎo, zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "今年的冬天一連半個月溫度都在十度以下，今天總算暖和3.王媽媽的四個孩子都長大了，她總算能回到結婚前自由自在的生活了。",
       "vi": "Mùa đông năm nay liền nửa tháng nhiệt độ đều dưới mười độ, hôm nay rốt cuộc cũng ấm lên… Bốn đứa con của mẹ Vương đều đã lớn, rốt cuộc bà cũng được trở lại cuộc sống tự do tự tại như trước khi lấy chồng.",
       "py": "Jīnnián de dōngtiān yìlián bàngè yuè wēndù dōu zài shídù yǐxià, jīntiān zǒngsuàn nuǎnhuo 3. Wáng māma de sìgè háizi dōu zhǎngdà le, tā zǒngsuàn néng huídào jiéhūn qián zìyóuzìzài de shēnghuó le."
      },
      {
       "hz": "尚恩：⋯⋯最後總算克服了。",
       "vi": "Sean: …cuối cùng cũng vượt qua được.",
       "py": "Shàng'ēn:…… zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "明哲：既然你這樣說，下個週末我就跟你去參加海灘球賽2. A：去逛夜市好事好，可是剛才做了那麼多刺激的活動，我現在累死了。",
       "vi": "Minh Triết: Bạn đã nói vậy thì cuối tuần sau tôi sẽ đi thi đấu bóng chuyền bãi biển với bạn. A: Đi dạo chợ đêm thì hay đấy, nhưng vừa nãy chơi nhiều trò cảm giác mạnh quá, bây giờ tôi mệt chết đi được.",
       "py": "Míngzhé: Jìrán nǐ zhèyàng shuō, xià gè zhōumò wǒ jiù gēn nǐ qù cānjiā hǎitān qiúsài 2. A: Qùguàng yèshì hǎoshì hǎo, kěshì gāngcái zuò le nàme duō cìjī de huódòng, wǒ xiànzài lèisǐ le."
      },
      {
       "hz": "B：既然這樣，我們就先回家休息，晚一點再去好了。",
       "vi": "B: Đã vậy thì chúng ta về nhà nghỉ trước, lát nữa hãy đi.",
       "py": "B: Jìrán zhèyàng, wǒmen jiù xiān huíjiā xiūxí, wǎnyìdiǎn zài qù hǎo le."
      },
      {
       "hz": "既然你覺得這份工作不能讓你發揮實力，就換個工作吧。",
       "vi": "Nếu bạn đã thấy công việc này không giúp bạn phát huy năng lực thì đổi việc khác đi.",
       "py": "Jìrán nǐ juéde zhèfèn gōngzuò bùnéng ràng nǐ fāhuī shílì, jiù huàn gè gōngzuò ba."
      },
      {
       "hz": "地震後救災人員把握分分秒秒，努力把被困在房子底下的民眾救出來。",
       "vi": "Sau động đất, nhân viên cứu hộ tranh thủ từng giây từng phút, nỗ lực cứu những người dân bị kẹt dưới nhà ra.",
       "py": "Dìzhèn hòu jiùzāi rényuán bǎwò fēnfēnmiǎomiǎo, nǔlì bǎ bèikùn zài fángzi dǐxià de mínzhòng jiù chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "總算 — rốt cuộc cũng…",
   "giaiThich": "Phó từ khẩu ngữ: sau một thời gian chờ đợi hoặc cố gắng, điều mong đợi cuối cùng cũng thành. Bài cũng có 既然……就…… (đã… thì…)."
  },
  {
   "title": "1. 在⋯⋯中",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "用來表示在某個情況或範圍裡，「在」的後面可以是名詞短語。",
       "vi": "Dùng để diễn tả ở trong một tình huống hoặc phạm vi nào đó, sau “在” có thể là cụm danh từ.",
       "py": "Yònglái biǎoshì zài mǒugè qíngkuàng huò fànwéi lǐ, “zài” de hòumiàn kěyǐ shì míngcí duǎnyǔ."
      },
      {
       "hz": "張文華在老闆的眼中，是個認真又有能力的好員工⋯⋯2. A: 我發現你好像從不加班，為什麼？",
       "vi": "Trong mắt ông chủ, Trương Văn Hoa là một nhân viên tốt, chăm chỉ và có năng lực… A: Tôi thấy hình như bạn chưa bao giờ tăng ca, tại sao vậy?",
       "py": "Zhāng wénhuá zài lǎobǎn de yǎnzhōng, shì gè rènzhēn yòu yǒu nénglì de hǎo yuángōng…… 2. A: Wǒ fāxiàn nǐ hǎoxiàng cóngbù jiābān, wèishénme?"
      },
      {
       "hz": "B: 我每天都要回家跟家人吃飯，因為在我心中，家人比什麼都重要。",
       "vi": "B: Ngày nào tôi cũng phải về nhà ăn cơm với gia đình, vì trong lòng tôi, gia đình quan trọng hơn tất cả.",
       "py": "B: Wǒ měitiān dōu yào huíjiā gēn jiārén chīfàn, yīnwèi zàiwǒxīnzhōng, jiārén bǐ shénme dōu zhòngyào."
      },
      {
       "hz": "A: 你剛才在會議中，提到一份商品調查的資料，請問哪裡查得到？",
       "vi": "A: Vừa rồi trong cuộc họp bạn có nhắc đến một tài liệu khảo sát sản phẩm, cho hỏi tra ở đâu được?",
       "py": "A: Nǐ gāngcái zài huìyì zhōng, tídào yífèn shāngpǐn diàochá de zīliào, qǐngwèn nǎlǐ chá dédào?"
      },
      {
       "hz": "B: 就在會議報告中的第十頁，你翻一下應該就看得到。",
       "vi": "B: Ở ngay trang mười trong báo cáo cuộc họp, bạn lật ra chắc sẽ thấy.",
       "py": "B: Jiù zài huìyì bàogào zhōng de dìshí yè, nǐ fān yíxià yīnggāi jiù kàn dédào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在……中 — trong…",
   "giaiThich": "Dùng để giới hạn phạm vi: trong quá trình nào đó, trong nhóm nào đó."
  },
  {
   "title": "2. 不能不/不得不",
   "points": [
    {
     "label": null,
     "formula": "表示當事人的心裡不願意做某件事，因為沒辦法只好做了，有無奈的感覺，語氣比「不能不」強。",
     "examples": [
      {
       "hz": "「不能不」有應該、必須、一定要負責某件事，不做不行的意思。",
       "vi": "“不能不” có nghĩa là nên, phải, nhất định phải chịu trách nhiệm một việc nào đó, không làm không được.",
       "py": "“Bùnéngbù” yǒu yīnggāi, bìxū, yídìng yào fùzé mǒujiànshì, bú zuò bùxíng de yìsi."
      },
      {
       "hz": "雖然他覺得那裡的音樂聽起來像噪音，但是為了工作不能2. 牛先生為了讓每個孩子都有自己的房間，不能不換大一點3. 今天晚上爸媽要參加朋友的婚禮，讓我照顧弟弟妹妹，我不能不早一點回家。",
       "vi": "Tuy anh ấy thấy nhạc ở đó nghe như tiếng ồn, nhưng vì công việc nên không thể không… Ông Ngưu để đứa con nào cũng có phòng riêng nên không thể không đổi sang nhà rộng hơn… Tối nay bố mẹ đi dự đám cưới của bạn, bảo tôi trông em trai em gái, tôi không thể không về nhà sớm.",
       "py": "Suīrán tā juéde nàlǐ de yīnyuè tīng qǐlái xiàng zàoyīn, dànshì wèile gōngzuò bùnéng 2. Niú xiānshēng wèile ràng měigè háizi dōu yǒu zìjǐ de fángjiān, bùnéngbú huàn dà yìdiǎn 3. Jīntiān wǎnshàng bàmā yào cānjiā péngyǒu de hūnlǐ, ràng wǒ zhàogù dìdi mèimei, wǒ bùnéngbù zǎo yìdiǎn huíjiā."
      },
      {
       "hz": "就算百貨公司，也可能賣品質不佳的商品，所以不管在哪裡購物都不能不檢查。",
       "vi": "Ngay cả trung tâm thương mại cũng có thể bán hàng kém chất lượng, nên mua sắm ở đâu cũng không thể không kiểm tra.",
       "py": "Jiùsuàn bǎihuògōngsī, yě kěnéng mài pǐnzhí bù jiā de shāngpǐn, suǒyǐ bùguǎn zài nǎlǐ gòuwù dōu bùnéngbù jiǎnchá."
      },
      {
       "hz": "我叔叔才五十歲，最近因為生病的關係，不得不早一點退這個地區發生了嚴重的森林火災，許多人的房子被燒掉了，不得不離開，到安全的地方去。",
       "vi": "Chú tôi mới năm mươi tuổi, dạo này vì bệnh nên đành phải nghỉ hưu sớm. Khu vực này xảy ra cháy rừng nghiêm trọng, nhà của nhiều người bị thiêu rụi, đành phải rời đi đến nơi an toàn.",
       "py": "Wǒ shúshu cái wǔshísuì, zuìjìn yīnwèi shēngbìng de guānxì, bùdébù zǎo yìdiǎn tuì zhège dìqū fāshēng le yánzhòng de sēnlín huǒzāi, xǔduō rén de fángzi bèi shāodiào le, bùdébù líkāi, dào ānquán de dìfāng qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不能不 / 不得不 — không thể không, đành phải",
   "giaiThich": "Người trong cuộc không muốn làm nhưng không còn cách nào khác, mang cảm giác bất đắc dĩ. 不得不 giọng mạnh hơn 不能不."
  },
  {
   "title": "3. 正＋V",
   "points": [
    {
     "label": null,
     "formula": "「正」當副詞，有剛好、巧合的意思。「正」後面的第一件事剛開始做或剛好準備要做時，第二件事也很巧合的發生了，例如：「我正打開門時，就看見爸爸回來了」、「我正要回家，就下起雨來了」。「正」後面常接「要、想、打算、準備」等動詞。",
     "examples": [
      {
       "hz": "有一天張文華正準備出門上班時，他看到電視上播著新聞2. 我正想打電話給小紀時，就接到他打來的電話。",
       "vi": "Một hôm, đúng lúc Trương Văn Hoa đang chuẩn bị ra ngoài đi làm thì thấy trên tivi đang phát tin tức… Tôi vừa định gọi điện cho Tiểu Kỷ thì nhận được điện thoại của cậu ấy gọi tới.",
       "py": "Yǒu yìtiān zhāng wénhuá zhèng zhǔnbèi chūmén shàngbān shí, tā kàndào diànshì shàng bò zhe xīnwén 2. Wǒ zhèng xiǎng dǎdiànhuà gěi xiǎo jìshí, jiù jiēdào tā dǎ lái de diànhuà."
      },
      {
       "hz": "我正要進電梯時，突然發生地震，還好我沒進去。",
       "vi": "Tôi vừa định bước vào thang máy thì đột nhiên xảy ra động đất, may mà tôi chưa vào.",
       "py": "Wǒ zhèngyào jìn diàntī shí, tūrán fāshēng dìzhèn, háihǎo wǒ méi jìnqù."
      },
      {
       "hz": "我正用手機回朋友的信時，他突然出現在我面前，嚇了我",
       "vi": "Tôi đang dùng điện thoại trả lời tin nhắn của bạn thì cậu ấy đột nhiên xuất hiện trước mặt, làm tôi giật mình.",
       "py": "Wǒ zhèng yòng shǒujī huí péngyǒu de xìn shí, tā tūrán chūxiàn zài wǒ miànqián, xià le wǒ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "正 + động từ — vừa đúng lúc đang…",
   "giaiThich": "正 là phó từ, nghĩa \"vừa đúng lúc\". Việc thứ nhất vừa bắt đầu hoặc sắp làm thì việc thứ hai xảy ra rất tình cờ (我正打開門時，就看見爸爸回來了). Sau 正 hay đi với 要, 想, 打算, 準備."
  }
 ],
 "td3-6.2": [
  {
   "title": "2. X分之Y",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "X代表整體，Y代表部分，說明某事物的數量在整體中的比例。例如：「2/3」的中文是「三分之二」、「5%」的中文是「百分之五」",
       "vi": "X là toàn thể, Y là phần, diễn tả tỉ lệ của một sự vật trong tổng thể. Ví dụ: “2/3” tiếng Trung là “三分之二”, “5%” tiếng Trung là “百分之五”.",
       "py": "X dàibiǎo zhěngtǐ, Y dàibiǎo bùfèn, shuōmíng mǒu shìwù de shùliàng zài zhěngtǐ zhōng de bǐlì. Lìrú: “2 / 3” de zhōngwén shì “sānfēnzhī'èr”, “5 %” de zhōngwén shì “bǎifēnzhīwǔ”"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "X 分之 Y — phân số",
   "giaiThich": "Cách đọc phân số: mẫu số đứng trước, tử số đứng sau (五分之四 = bốn phần năm)."
  },
  {
   "title": "1. 最近有人調查⋯⋯發現其中有五分之四的人最常去的休閒",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "場所是「家裡」。",
       "vi": "Địa điểm là “ở nhà”.",
       "py": "Chǎngsuǒ shì “jiālǐ”."
      },
      {
       "hz": "在這座海島上，有百分之九十的人會游泳，百分之五十的人會衝浪。",
       "vi": "Trên hòn đảo này, chín mươi phần trăm người biết bơi, năm mươi phần trăm người biết lướt sóng.",
       "py": "Zài zhè zuò hǎidǎo shàng, yǒu bǎifēnzhījiǔshí de rén huì yóuyǒng, bǎifēnzhīwǔshí de rén huì chōnglàng."
      },
      {
       "hz": "為了當一名成功的足球員，他每天用三分之二的時間來練體力和踢球技巧。",
       "vi": "Để trở thành một cầu thủ bóng đá thành công, mỗi ngày anh ấy dành hai phần ba thời gian để luyện thể lực và kỹ thuật đá bóng.",
       "py": "Wèile dāng yìmíng chénggōng de zú qiúyuán, tā měitiān yòng sānfēnzhī'èr de shíjiān lái liàn tǐlì hàn tīqiú jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với phân số và số liệu",
   "giaiThich": "Phần luyện tập đọc số liệu khảo sát, dùng cách nói phân số."
  },
  {
   "title": "3. 總算",
   "points": [
    {
     "label": null,
     "formula": "「總算」當副詞，表示經過一段時間的等待或努力後，期待的事情實現了。常用在口語。 「既然」當連詞，是前句的句首，接已經發生或確定的事實。「就」放在後句，接說話者對前面事實表示的主觀意見、建議或結論。例如：既然你不要這本書了，就給我吧。 Every minute and every second (is precious)",
     "examples": [
      {
       "hz": "⋯⋯有一段時間不敢衝浪。還好，最後總算克服了。",
       "vi": "…có một thời gian không dám lướt sóng. May mà cuối cùng cũng vượt qua được.",
       "py": "…… yǒu yíduànshíjiān bùgǎn chōnglàng. Háihǎo, zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "今年的冬天一連半個月溫度都在十度以下，今天總算暖和3.王媽媽的四個孩子都長大了，她總算能回到結婚前自由自在的生活了。",
       "vi": "Mùa đông năm nay liền nửa tháng nhiệt độ đều dưới mười độ, hôm nay rốt cuộc cũng ấm lên… Bốn đứa con của mẹ Vương đều đã lớn, rốt cuộc bà cũng được trở lại cuộc sống tự do tự tại như trước khi lấy chồng.",
       "py": "Jīnnián de dōngtiān yìlián bàngè yuè wēndù dōu zài shídù yǐxià, jīntiān zǒngsuàn nuǎnhuo 3. Wáng māma de sìgè háizi dōu zhǎngdà le, tā zǒngsuàn néng huídào jiéhūn qián zìyóuzìzài de shēnghuó le."
      },
      {
       "hz": "尚恩：⋯⋯最後總算克服了。",
       "vi": "Sean: …cuối cùng cũng vượt qua được.",
       "py": "Shàng'ēn:…… zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "明哲：既然你這樣說，下個週末我就跟你去參加海灘球賽2. A：去逛夜市好事好，可是剛才做了那麼多刺激的活動，我現在累死了。",
       "vi": "Minh Triết: Bạn đã nói vậy thì cuối tuần sau tôi sẽ đi thi đấu bóng chuyền bãi biển với bạn. A: Đi dạo chợ đêm thì hay đấy, nhưng vừa nãy chơi nhiều trò cảm giác mạnh quá, bây giờ tôi mệt chết đi được.",
       "py": "Míngzhé: Jìrán nǐ zhèyàng shuō, xià gè zhōumò wǒ jiù gēn nǐ qù cānjiā hǎitān qiúsài 2. A: Qùguàng yèshì hǎoshì hǎo, kěshì gāngcái zuò le nàme duō cìjī de huódòng, wǒ xiànzài lèisǐ le."
      },
      {
       "hz": "B：既然這樣，我們就先回家休息，晚一點再去好了。",
       "vi": "B: Đã vậy thì chúng ta về nhà nghỉ trước, lát nữa hãy đi.",
       "py": "B: Jìrán zhèyàng, wǒmen jiù xiān huíjiā xiūxí, wǎnyìdiǎn zài qù hǎo le."
      },
      {
       "hz": "既然你覺得這份工作不能讓你發揮實力，就換個工作吧。",
       "vi": "Nếu bạn đã thấy công việc này không giúp bạn phát huy năng lực thì đổi việc khác đi.",
       "py": "Jìrán nǐ juéde zhèfèn gōngzuò bùnéng ràng nǐ fāhuī shílì, jiù huàn gè gōngzuò ba."
      },
      {
       "hz": "地震後救災人員把握分分秒秒，努力把被困在房子底下的民眾救出來。",
       "vi": "Sau động đất, nhân viên cứu hộ tranh thủ từng giây từng phút, nỗ lực cứu những người dân bị kẹt dưới nhà ra.",
       "py": "Dìzhèn hòu jiùzāi rényuán bǎwò fēnfēnmiǎomiǎo, nǔlì bǎ bèikùn zài fángzi dǐxià de mínzhòng jiù chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "總算 — rốt cuộc cũng…",
   "giaiThich": "Phó từ khẩu ngữ: sau một thời gian chờ đợi hoặc cố gắng, điều mong đợi cuối cùng cũng thành. Bài cũng có 既然……就…… (đã… thì…)."
  },
  {
   "title": "1. 在⋯⋯中",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "用來表示在某個情況或範圍裡，「在」的後面可以是名詞短語。",
       "vi": "Dùng để diễn tả ở trong một tình huống hoặc phạm vi nào đó, sau “在” có thể là cụm danh từ.",
       "py": "Yònglái biǎoshì zài mǒugè qíngkuàng huò fànwéi lǐ, “zài” de hòumiàn kěyǐ shì míngcí duǎnyǔ."
      },
      {
       "hz": "張文華在老闆的眼中，是個認真又有能力的好員工⋯⋯2. A: 我發現你好像從不加班，為什麼？",
       "vi": "Trong mắt ông chủ, Trương Văn Hoa là một nhân viên tốt, chăm chỉ và có năng lực… A: Tôi thấy hình như bạn chưa bao giờ tăng ca, tại sao vậy?",
       "py": "Zhāng wénhuá zài lǎobǎn de yǎnzhōng, shì gè rènzhēn yòu yǒu nénglì de hǎo yuángōng…… 2. A: Wǒ fāxiàn nǐ hǎoxiàng cóngbù jiābān, wèishénme?"
      },
      {
       "hz": "B: 我每天都要回家跟家人吃飯，因為在我心中，家人比什麼都重要。",
       "vi": "B: Ngày nào tôi cũng phải về nhà ăn cơm với gia đình, vì trong lòng tôi, gia đình quan trọng hơn tất cả.",
       "py": "B: Wǒ měitiān dōu yào huíjiā gēn jiārén chīfàn, yīnwèi zàiwǒxīnzhōng, jiārén bǐ shénme dōu zhòngyào."
      },
      {
       "hz": "A: 你剛才在會議中，提到一份商品調查的資料，請問哪裡查得到？",
       "vi": "A: Vừa rồi trong cuộc họp bạn có nhắc đến một tài liệu khảo sát sản phẩm, cho hỏi tra ở đâu được?",
       "py": "A: Nǐ gāngcái zài huìyì zhōng, tídào yífèn shāngpǐn diàochá de zīliào, qǐngwèn nǎlǐ chá dédào?"
      },
      {
       "hz": "B: 就在會議報告中的第十頁，你翻一下應該就看得到。",
       "vi": "B: Ở ngay trang mười trong báo cáo cuộc họp, bạn lật ra chắc sẽ thấy.",
       "py": "B: Jiù zài huìyì bàogào zhōng de dìshí yè, nǐ fān yíxià yīnggāi jiù kàn dédào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在……中 — trong…",
   "giaiThich": "Dùng để giới hạn phạm vi: trong quá trình nào đó, trong nhóm nào đó."
  },
  {
   "title": "2. 不能不/不得不",
   "points": [
    {
     "label": null,
     "formula": "表示當事人的心裡不願意做某件事，因為沒辦法只好做了，有無奈的感覺，語氣比「不能不」強。",
     "examples": [
      {
       "hz": "「不能不」有應該、必須、一定要負責某件事，不做不行的意思。",
       "vi": "“不能不” có nghĩa là nên, phải, nhất định phải chịu trách nhiệm một việc nào đó, không làm không được.",
       "py": "“Bùnéngbù” yǒu yīnggāi, bìxū, yídìng yào fùzé mǒujiànshì, bú zuò bùxíng de yìsi."
      },
      {
       "hz": "雖然他覺得那裡的音樂聽起來像噪音，但是為了工作不能2. 牛先生為了讓每個孩子都有自己的房間，不能不換大一點3. 今天晚上爸媽要參加朋友的婚禮，讓我照顧弟弟妹妹，我不能不早一點回家。",
       "vi": "Tuy anh ấy thấy nhạc ở đó nghe như tiếng ồn, nhưng vì công việc nên không thể không… Ông Ngưu để đứa con nào cũng có phòng riêng nên không thể không đổi sang nhà rộng hơn… Tối nay bố mẹ đi dự đám cưới của bạn, bảo tôi trông em trai em gái, tôi không thể không về nhà sớm.",
       "py": "Suīrán tā juéde nàlǐ de yīnyuè tīng qǐlái xiàng zàoyīn, dànshì wèile gōngzuò bùnéng 2. Niú xiānshēng wèile ràng měigè háizi dōu yǒu zìjǐ de fángjiān, bùnéngbú huàn dà yìdiǎn 3. Jīntiān wǎnshàng bàmā yào cānjiā péngyǒu de hūnlǐ, ràng wǒ zhàogù dìdi mèimei, wǒ bùnéngbù zǎo yìdiǎn huíjiā."
      },
      {
       "hz": "就算百貨公司，也可能賣品質不佳的商品，所以不管在哪裡購物都不能不檢查。",
       "vi": "Ngay cả trung tâm thương mại cũng có thể bán hàng kém chất lượng, nên mua sắm ở đâu cũng không thể không kiểm tra.",
       "py": "Jiùsuàn bǎihuògōngsī, yě kěnéng mài pǐnzhí bù jiā de shāngpǐn, suǒyǐ bùguǎn zài nǎlǐ gòuwù dōu bùnéngbù jiǎnchá."
      },
      {
       "hz": "我叔叔才五十歲，最近因為生病的關係，不得不早一點退這個地區發生了嚴重的森林火災，許多人的房子被燒掉了，不得不離開，到安全的地方去。",
       "vi": "Chú tôi mới năm mươi tuổi, dạo này vì bệnh nên đành phải nghỉ hưu sớm. Khu vực này xảy ra cháy rừng nghiêm trọng, nhà của nhiều người bị thiêu rụi, đành phải rời đi đến nơi an toàn.",
       "py": "Wǒ shúshu cái wǔshísuì, zuìjìn yīnwèi shēngbìng de guānxì, bùdébù zǎo yìdiǎn tuì zhège dìqū fāshēng le yánzhòng de sēnlín huǒzāi, xǔduō rén de fángzi bèi shāodiào le, bùdébù líkāi, dào ānquán de dìfāng qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不能不 / 不得不 — không thể không, đành phải",
   "giaiThich": "Người trong cuộc không muốn làm nhưng không còn cách nào khác, mang cảm giác bất đắc dĩ. 不得不 giọng mạnh hơn 不能不."
  },
  {
   "title": "3. 正＋V",
   "points": [
    {
     "label": null,
     "formula": "「正」當副詞，有剛好、巧合的意思。「正」後面的第一件事剛開始做或剛好準備要做時，第二件事也很巧合的發生了，例如：「我正打開門時，就看見爸爸回來了」、「我正要回家，就下起雨來了」。「正」後面常接「要、想、打算、準備」等動詞。",
     "examples": [
      {
       "hz": "有一天張文華正準備出門上班時，他看到電視上播著新聞2. 我正想打電話給小紀時，就接到他打來的電話。",
       "vi": "Một hôm, đúng lúc Trương Văn Hoa đang chuẩn bị ra ngoài đi làm thì thấy trên tivi đang phát tin tức… Tôi vừa định gọi điện cho Tiểu Kỷ thì nhận được điện thoại của cậu ấy gọi tới.",
       "py": "Yǒu yìtiān zhāng wénhuá zhèng zhǔnbèi chūmén shàngbān shí, tā kàndào diànshì shàng bò zhe xīnwén 2. Wǒ zhèng xiǎng dǎdiànhuà gěi xiǎo jìshí, jiù jiēdào tā dǎ lái de diànhuà."
      },
      {
       "hz": "我正要進電梯時，突然發生地震，還好我沒進去。",
       "vi": "Tôi vừa định bước vào thang máy thì đột nhiên xảy ra động đất, may mà tôi chưa vào.",
       "py": "Wǒ zhèngyào jìn diàntī shí, tūrán fāshēng dìzhèn, háihǎo wǒ méi jìnqù."
      },
      {
       "hz": "我正用手機回朋友的信時，他突然出現在我面前，嚇了我",
       "vi": "Tôi đang dùng điện thoại trả lời tin nhắn của bạn thì cậu ấy đột nhiên xuất hiện trước mặt, làm tôi giật mình.",
       "py": "Wǒ zhèng yòng shǒujī huí péngyǒu de xìn shí, tā tūrán chūxiàn zài wǒ miànqián, xià le wǒ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "正 + động từ — vừa đúng lúc đang…",
   "giaiThich": "正 là phó từ, nghĩa \"vừa đúng lúc\". Việc thứ nhất vừa bắt đầu hoặc sắp làm thì việc thứ hai xảy ra rất tình cờ (我正打開門時，就看見爸爸回來了). Sau 正 hay đi với 要, 想, 打算, 準備."
  }
 ],
 "td3-6.3": [
  {
   "title": "2. X分之Y",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "X代表整體，Y代表部分，說明某事物的數量在整體中的比例。例如：「2/3」的中文是「三分之二」、「5%」的中文是「百分之五」",
       "vi": "X là toàn thể, Y là phần, diễn tả tỉ lệ của một sự vật trong tổng thể. Ví dụ: “2/3” tiếng Trung là “三分之二”, “5%” tiếng Trung là “百分之五”.",
       "py": "X dàibiǎo zhěngtǐ, Y dàibiǎo bùfèn, shuōmíng mǒu shìwù de shùliàng zài zhěngtǐ zhōng de bǐlì. Lìrú: “2 / 3” de zhōngwén shì “sānfēnzhī'èr”, “5 %” de zhōngwén shì “bǎifēnzhīwǔ”"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "X 分之 Y — phân số",
   "giaiThich": "Cách đọc phân số: mẫu số đứng trước, tử số đứng sau (五分之四 = bốn phần năm)."
  },
  {
   "title": "1. 最近有人調查⋯⋯發現其中有五分之四的人最常去的休閒",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "場所是「家裡」。",
       "vi": "Địa điểm là “ở nhà”.",
       "py": "Chǎngsuǒ shì “jiālǐ”."
      },
      {
       "hz": "在這座海島上，有百分之九十的人會游泳，百分之五十的人會衝浪。",
       "vi": "Trên hòn đảo này, chín mươi phần trăm người biết bơi, năm mươi phần trăm người biết lướt sóng.",
       "py": "Zài zhè zuò hǎidǎo shàng, yǒu bǎifēnzhījiǔshí de rén huì yóuyǒng, bǎifēnzhīwǔshí de rén huì chōnglàng."
      },
      {
       "hz": "為了當一名成功的足球員，他每天用三分之二的時間來練體力和踢球技巧。",
       "vi": "Để trở thành một cầu thủ bóng đá thành công, mỗi ngày anh ấy dành hai phần ba thời gian để luyện thể lực và kỹ thuật đá bóng.",
       "py": "Wèile dāng yìmíng chénggōng de zú qiúyuán, tā měitiān yòng sānfēnzhī'èr de shíjiān lái liàn tǐlì hàn tīqiú jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với phân số và số liệu",
   "giaiThich": "Phần luyện tập đọc số liệu khảo sát, dùng cách nói phân số."
  },
  {
   "title": "3. 總算",
   "points": [
    {
     "label": null,
     "formula": "「總算」當副詞，表示經過一段時間的等待或努力後，期待的事情實現了。常用在口語。 「既然」當連詞，是前句的句首，接已經發生或確定的事實。「就」放在後句，接說話者對前面事實表示的主觀意見、建議或結論。例如：既然你不要這本書了，就給我吧。 Every minute and every second (is precious)",
     "examples": [
      {
       "hz": "⋯⋯有一段時間不敢衝浪。還好，最後總算克服了。",
       "vi": "…có một thời gian không dám lướt sóng. May mà cuối cùng cũng vượt qua được.",
       "py": "…… yǒu yíduànshíjiān bùgǎn chōnglàng. Háihǎo, zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "今年的冬天一連半個月溫度都在十度以下，今天總算暖和3.王媽媽的四個孩子都長大了，她總算能回到結婚前自由自在的生活了。",
       "vi": "Mùa đông năm nay liền nửa tháng nhiệt độ đều dưới mười độ, hôm nay rốt cuộc cũng ấm lên… Bốn đứa con của mẹ Vương đều đã lớn, rốt cuộc bà cũng được trở lại cuộc sống tự do tự tại như trước khi lấy chồng.",
       "py": "Jīnnián de dōngtiān yìlián bàngè yuè wēndù dōu zài shídù yǐxià, jīntiān zǒngsuàn nuǎnhuo 3. Wáng māma de sìgè háizi dōu zhǎngdà le, tā zǒngsuàn néng huídào jiéhūn qián zìyóuzìzài de shēnghuó le."
      },
      {
       "hz": "尚恩：⋯⋯最後總算克服了。",
       "vi": "Sean: …cuối cùng cũng vượt qua được.",
       "py": "Shàng'ēn:…… zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "明哲：既然你這樣說，下個週末我就跟你去參加海灘球賽2. A：去逛夜市好事好，可是剛才做了那麼多刺激的活動，我現在累死了。",
       "vi": "Minh Triết: Bạn đã nói vậy thì cuối tuần sau tôi sẽ đi thi đấu bóng chuyền bãi biển với bạn. A: Đi dạo chợ đêm thì hay đấy, nhưng vừa nãy chơi nhiều trò cảm giác mạnh quá, bây giờ tôi mệt chết đi được.",
       "py": "Míngzhé: Jìrán nǐ zhèyàng shuō, xià gè zhōumò wǒ jiù gēn nǐ qù cānjiā hǎitān qiúsài 2. A: Qùguàng yèshì hǎoshì hǎo, kěshì gāngcái zuò le nàme duō cìjī de huódòng, wǒ xiànzài lèisǐ le."
      },
      {
       "hz": "B：既然這樣，我們就先回家休息，晚一點再去好了。",
       "vi": "B: Đã vậy thì chúng ta về nhà nghỉ trước, lát nữa hãy đi.",
       "py": "B: Jìrán zhèyàng, wǒmen jiù xiān huíjiā xiūxí, wǎnyìdiǎn zài qù hǎo le."
      },
      {
       "hz": "既然你覺得這份工作不能讓你發揮實力，就換個工作吧。",
       "vi": "Nếu bạn đã thấy công việc này không giúp bạn phát huy năng lực thì đổi việc khác đi.",
       "py": "Jìrán nǐ juéde zhèfèn gōngzuò bùnéng ràng nǐ fāhuī shílì, jiù huàn gè gōngzuò ba."
      },
      {
       "hz": "地震後救災人員把握分分秒秒，努力把被困在房子底下的民眾救出來。",
       "vi": "Sau động đất, nhân viên cứu hộ tranh thủ từng giây từng phút, nỗ lực cứu những người dân bị kẹt dưới nhà ra.",
       "py": "Dìzhèn hòu jiùzāi rényuán bǎwò fēnfēnmiǎomiǎo, nǔlì bǎ bèikùn zài fángzi dǐxià de mínzhòng jiù chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "總算 — rốt cuộc cũng…",
   "giaiThich": "Phó từ khẩu ngữ: sau một thời gian chờ đợi hoặc cố gắng, điều mong đợi cuối cùng cũng thành. Bài cũng có 既然……就…… (đã… thì…)."
  },
  {
   "title": "1. 在⋯⋯中",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "用來表示在某個情況或範圍裡，「在」的後面可以是名詞短語。",
       "vi": "Dùng để diễn tả ở trong một tình huống hoặc phạm vi nào đó, sau “在” có thể là cụm danh từ.",
       "py": "Yònglái biǎoshì zài mǒugè qíngkuàng huò fànwéi lǐ, “zài” de hòumiàn kěyǐ shì míngcí duǎnyǔ."
      },
      {
       "hz": "張文華在老闆的眼中，是個認真又有能力的好員工⋯⋯2. A: 我發現你好像從不加班，為什麼？",
       "vi": "Trong mắt ông chủ, Trương Văn Hoa là một nhân viên tốt, chăm chỉ và có năng lực… A: Tôi thấy hình như bạn chưa bao giờ tăng ca, tại sao vậy?",
       "py": "Zhāng wénhuá zài lǎobǎn de yǎnzhōng, shì gè rènzhēn yòu yǒu nénglì de hǎo yuángōng…… 2. A: Wǒ fāxiàn nǐ hǎoxiàng cóngbù jiābān, wèishénme?"
      },
      {
       "hz": "B: 我每天都要回家跟家人吃飯，因為在我心中，家人比什麼都重要。",
       "vi": "B: Ngày nào tôi cũng phải về nhà ăn cơm với gia đình, vì trong lòng tôi, gia đình quan trọng hơn tất cả.",
       "py": "B: Wǒ měitiān dōu yào huíjiā gēn jiārén chīfàn, yīnwèi zàiwǒxīnzhōng, jiārén bǐ shénme dōu zhòngyào."
      },
      {
       "hz": "A: 你剛才在會議中，提到一份商品調查的資料，請問哪裡查得到？",
       "vi": "A: Vừa rồi trong cuộc họp bạn có nhắc đến một tài liệu khảo sát sản phẩm, cho hỏi tra ở đâu được?",
       "py": "A: Nǐ gāngcái zài huìyì zhōng, tídào yífèn shāngpǐn diàochá de zīliào, qǐngwèn nǎlǐ chá dédào?"
      },
      {
       "hz": "B: 就在會議報告中的第十頁，你翻一下應該就看得到。",
       "vi": "B: Ở ngay trang mười trong báo cáo cuộc họp, bạn lật ra chắc sẽ thấy.",
       "py": "B: Jiù zài huìyì bàogào zhōng de dìshí yè, nǐ fān yíxià yīnggāi jiù kàn dédào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在……中 — trong…",
   "giaiThich": "Dùng để giới hạn phạm vi: trong quá trình nào đó, trong nhóm nào đó."
  },
  {
   "title": "2. 不能不/不得不",
   "points": [
    {
     "label": null,
     "formula": "表示當事人的心裡不願意做某件事，因為沒辦法只好做了，有無奈的感覺，語氣比「不能不」強。",
     "examples": [
      {
       "hz": "「不能不」有應該、必須、一定要負責某件事，不做不行的意思。",
       "vi": "“不能不” có nghĩa là nên, phải, nhất định phải chịu trách nhiệm một việc nào đó, không làm không được.",
       "py": "“Bùnéngbù” yǒu yīnggāi, bìxū, yídìng yào fùzé mǒujiànshì, bú zuò bùxíng de yìsi."
      },
      {
       "hz": "雖然他覺得那裡的音樂聽起來像噪音，但是為了工作不能2. 牛先生為了讓每個孩子都有自己的房間，不能不換大一點3. 今天晚上爸媽要參加朋友的婚禮，讓我照顧弟弟妹妹，我不能不早一點回家。",
       "vi": "Tuy anh ấy thấy nhạc ở đó nghe như tiếng ồn, nhưng vì công việc nên không thể không… Ông Ngưu để đứa con nào cũng có phòng riêng nên không thể không đổi sang nhà rộng hơn… Tối nay bố mẹ đi dự đám cưới của bạn, bảo tôi trông em trai em gái, tôi không thể không về nhà sớm.",
       "py": "Suīrán tā juéde nàlǐ de yīnyuè tīng qǐlái xiàng zàoyīn, dànshì wèile gōngzuò bùnéng 2. Niú xiānshēng wèile ràng měigè háizi dōu yǒu zìjǐ de fángjiān, bùnéngbú huàn dà yìdiǎn 3. Jīntiān wǎnshàng bàmā yào cānjiā péngyǒu de hūnlǐ, ràng wǒ zhàogù dìdi mèimei, wǒ bùnéngbù zǎo yìdiǎn huíjiā."
      },
      {
       "hz": "就算百貨公司，也可能賣品質不佳的商品，所以不管在哪裡購物都不能不檢查。",
       "vi": "Ngay cả trung tâm thương mại cũng có thể bán hàng kém chất lượng, nên mua sắm ở đâu cũng không thể không kiểm tra.",
       "py": "Jiùsuàn bǎihuògōngsī, yě kěnéng mài pǐnzhí bù jiā de shāngpǐn, suǒyǐ bùguǎn zài nǎlǐ gòuwù dōu bùnéngbù jiǎnchá."
      },
      {
       "hz": "我叔叔才五十歲，最近因為生病的關係，不得不早一點退這個地區發生了嚴重的森林火災，許多人的房子被燒掉了，不得不離開，到安全的地方去。",
       "vi": "Chú tôi mới năm mươi tuổi, dạo này vì bệnh nên đành phải nghỉ hưu sớm. Khu vực này xảy ra cháy rừng nghiêm trọng, nhà của nhiều người bị thiêu rụi, đành phải rời đi đến nơi an toàn.",
       "py": "Wǒ shúshu cái wǔshísuì, zuìjìn yīnwèi shēngbìng de guānxì, bùdébù zǎo yìdiǎn tuì zhège dìqū fāshēng le yánzhòng de sēnlín huǒzāi, xǔduō rén de fángzi bèi shāodiào le, bùdébù líkāi, dào ānquán de dìfāng qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不能不 / 不得不 — không thể không, đành phải",
   "giaiThich": "Người trong cuộc không muốn làm nhưng không còn cách nào khác, mang cảm giác bất đắc dĩ. 不得不 giọng mạnh hơn 不能不."
  },
  {
   "title": "3. 正＋V",
   "points": [
    {
     "label": null,
     "formula": "「正」當副詞，有剛好、巧合的意思。「正」後面的第一件事剛開始做或剛好準備要做時，第二件事也很巧合的發生了，例如：「我正打開門時，就看見爸爸回來了」、「我正要回家，就下起雨來了」。「正」後面常接「要、想、打算、準備」等動詞。",
     "examples": [
      {
       "hz": "有一天張文華正準備出門上班時，他看到電視上播著新聞2. 我正想打電話給小紀時，就接到他打來的電話。",
       "vi": "Một hôm, đúng lúc Trương Văn Hoa đang chuẩn bị ra ngoài đi làm thì thấy trên tivi đang phát tin tức… Tôi vừa định gọi điện cho Tiểu Kỷ thì nhận được điện thoại của cậu ấy gọi tới.",
       "py": "Yǒu yìtiān zhāng wénhuá zhèng zhǔnbèi chūmén shàngbān shí, tā kàndào diànshì shàng bò zhe xīnwén 2. Wǒ zhèng xiǎng dǎdiànhuà gěi xiǎo jìshí, jiù jiēdào tā dǎ lái de diànhuà."
      },
      {
       "hz": "我正要進電梯時，突然發生地震，還好我沒進去。",
       "vi": "Tôi vừa định bước vào thang máy thì đột nhiên xảy ra động đất, may mà tôi chưa vào.",
       "py": "Wǒ zhèngyào jìn diàntī shí, tūrán fāshēng dìzhèn, háihǎo wǒ méi jìnqù."
      },
      {
       "hz": "我正用手機回朋友的信時，他突然出現在我面前，嚇了我",
       "vi": "Tôi đang dùng điện thoại trả lời tin nhắn của bạn thì cậu ấy đột nhiên xuất hiện trước mặt, làm tôi giật mình.",
       "py": "Wǒ zhèng yòng shǒujī huí péngyǒu de xìn shí, tā tūrán chūxiàn zài wǒ miànqián, xià le wǒ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "正 + động từ — vừa đúng lúc đang…",
   "giaiThich": "正 là phó từ, nghĩa \"vừa đúng lúc\". Việc thứ nhất vừa bắt đầu hoặc sắp làm thì việc thứ hai xảy ra rất tình cờ (我正打開門時，就看見爸爸回來了). Sau 正 hay đi với 要, 想, 打算, 準備."
  }
 ],
 "td3-6.4": [
  {
   "title": "2. X分之Y",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "X代表整體，Y代表部分，說明某事物的數量在整體中的比例。例如：「2/3」的中文是「三分之二」、「5%」的中文是「百分之五」",
       "vi": "X là toàn thể, Y là phần, diễn tả tỉ lệ của một sự vật trong tổng thể. Ví dụ: “2/3” tiếng Trung là “三分之二”, “5%” tiếng Trung là “百分之五”.",
       "py": "X dàibiǎo zhěngtǐ, Y dàibiǎo bùfèn, shuōmíng mǒu shìwù de shùliàng zài zhěngtǐ zhōng de bǐlì. Lìrú: “2 / 3” de zhōngwén shì “sānfēnzhī'èr”, “5 %” de zhōngwén shì “bǎifēnzhīwǔ”"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "X 分之 Y — phân số",
   "giaiThich": "Cách đọc phân số: mẫu số đứng trước, tử số đứng sau (五分之四 = bốn phần năm)."
  },
  {
   "title": "1. 最近有人調查⋯⋯發現其中有五分之四的人最常去的休閒",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "場所是「家裡」。",
       "vi": "Địa điểm là “ở nhà”.",
       "py": "Chǎngsuǒ shì “jiālǐ”."
      },
      {
       "hz": "在這座海島上，有百分之九十的人會游泳，百分之五十的人會衝浪。",
       "vi": "Trên hòn đảo này, chín mươi phần trăm người biết bơi, năm mươi phần trăm người biết lướt sóng.",
       "py": "Zài zhè zuò hǎidǎo shàng, yǒu bǎifēnzhījiǔshí de rén huì yóuyǒng, bǎifēnzhīwǔshí de rén huì chōnglàng."
      },
      {
       "hz": "為了當一名成功的足球員，他每天用三分之二的時間來練體力和踢球技巧。",
       "vi": "Để trở thành một cầu thủ bóng đá thành công, mỗi ngày anh ấy dành hai phần ba thời gian để luyện thể lực và kỹ thuật đá bóng.",
       "py": "Wèile dāng yìmíng chénggōng de zú qiúyuán, tā měitiān yòng sānfēnzhī'èr de shíjiān lái liàn tǐlì hàn tīqiú jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với phân số và số liệu",
   "giaiThich": "Phần luyện tập đọc số liệu khảo sát, dùng cách nói phân số."
  },
  {
   "title": "3. 總算",
   "points": [
    {
     "label": null,
     "formula": "「總算」當副詞，表示經過一段時間的等待或努力後，期待的事情實現了。常用在口語。 「既然」當連詞，是前句的句首，接已經發生或確定的事實。「就」放在後句，接說話者對前面事實表示的主觀意見、建議或結論。例如：既然你不要這本書了，就給我吧。 Every minute and every second (is precious)",
     "examples": [
      {
       "hz": "⋯⋯有一段時間不敢衝浪。還好，最後總算克服了。",
       "vi": "…có một thời gian không dám lướt sóng. May mà cuối cùng cũng vượt qua được.",
       "py": "…… yǒu yíduànshíjiān bùgǎn chōnglàng. Háihǎo, zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "今年的冬天一連半個月溫度都在十度以下，今天總算暖和3.王媽媽的四個孩子都長大了，她總算能回到結婚前自由自在的生活了。",
       "vi": "Mùa đông năm nay liền nửa tháng nhiệt độ đều dưới mười độ, hôm nay rốt cuộc cũng ấm lên… Bốn đứa con của mẹ Vương đều đã lớn, rốt cuộc bà cũng được trở lại cuộc sống tự do tự tại như trước khi lấy chồng.",
       "py": "Jīnnián de dōngtiān yìlián bàngè yuè wēndù dōu zài shídù yǐxià, jīntiān zǒngsuàn nuǎnhuo 3. Wáng māma de sìgè háizi dōu zhǎngdà le, tā zǒngsuàn néng huídào jiéhūn qián zìyóuzìzài de shēnghuó le."
      },
      {
       "hz": "尚恩：⋯⋯最後總算克服了。",
       "vi": "Sean: …cuối cùng cũng vượt qua được.",
       "py": "Shàng'ēn:…… zuìhòu zǒngsuàn kèfú le."
      },
      {
       "hz": "明哲：既然你這樣說，下個週末我就跟你去參加海灘球賽2. A：去逛夜市好事好，可是剛才做了那麼多刺激的活動，我現在累死了。",
       "vi": "Minh Triết: Bạn đã nói vậy thì cuối tuần sau tôi sẽ đi thi đấu bóng chuyền bãi biển với bạn. A: Đi dạo chợ đêm thì hay đấy, nhưng vừa nãy chơi nhiều trò cảm giác mạnh quá, bây giờ tôi mệt chết đi được.",
       "py": "Míngzhé: Jìrán nǐ zhèyàng shuō, xià gè zhōumò wǒ jiù gēn nǐ qù cānjiā hǎitān qiúsài 2. A: Qùguàng yèshì hǎoshì hǎo, kěshì gāngcái zuò le nàme duō cìjī de huódòng, wǒ xiànzài lèisǐ le."
      },
      {
       "hz": "B：既然這樣，我們就先回家休息，晚一點再去好了。",
       "vi": "B: Đã vậy thì chúng ta về nhà nghỉ trước, lát nữa hãy đi.",
       "py": "B: Jìrán zhèyàng, wǒmen jiù xiān huíjiā xiūxí, wǎnyìdiǎn zài qù hǎo le."
      },
      {
       "hz": "既然你覺得這份工作不能讓你發揮實力，就換個工作吧。",
       "vi": "Nếu bạn đã thấy công việc này không giúp bạn phát huy năng lực thì đổi việc khác đi.",
       "py": "Jìrán nǐ juéde zhèfèn gōngzuò bùnéng ràng nǐ fāhuī shílì, jiù huàn gè gōngzuò ba."
      },
      {
       "hz": "地震後救災人員把握分分秒秒，努力把被困在房子底下的民眾救出來。",
       "vi": "Sau động đất, nhân viên cứu hộ tranh thủ từng giây từng phút, nỗ lực cứu những người dân bị kẹt dưới nhà ra.",
       "py": "Dìzhèn hòu jiùzāi rényuán bǎwò fēnfēnmiǎomiǎo, nǔlì bǎ bèikùn zài fángzi dǐxià de mínzhòng jiù chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "總算 — rốt cuộc cũng…",
   "giaiThich": "Phó từ khẩu ngữ: sau một thời gian chờ đợi hoặc cố gắng, điều mong đợi cuối cùng cũng thành. Bài cũng có 既然……就…… (đã… thì…)."
  },
  {
   "title": "1. 在⋯⋯中",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "用來表示在某個情況或範圍裡，「在」的後面可以是名詞短語。",
       "vi": "Dùng để diễn tả ở trong một tình huống hoặc phạm vi nào đó, sau “在” có thể là cụm danh từ.",
       "py": "Yònglái biǎoshì zài mǒugè qíngkuàng huò fànwéi lǐ, “zài” de hòumiàn kěyǐ shì míngcí duǎnyǔ."
      },
      {
       "hz": "張文華在老闆的眼中，是個認真又有能力的好員工⋯⋯2. A: 我發現你好像從不加班，為什麼？",
       "vi": "Trong mắt ông chủ, Trương Văn Hoa là một nhân viên tốt, chăm chỉ và có năng lực… A: Tôi thấy hình như bạn chưa bao giờ tăng ca, tại sao vậy?",
       "py": "Zhāng wénhuá zài lǎobǎn de yǎnzhōng, shì gè rènzhēn yòu yǒu nénglì de hǎo yuángōng…… 2. A: Wǒ fāxiàn nǐ hǎoxiàng cóngbù jiābān, wèishénme?"
      },
      {
       "hz": "B: 我每天都要回家跟家人吃飯，因為在我心中，家人比什麼都重要。",
       "vi": "B: Ngày nào tôi cũng phải về nhà ăn cơm với gia đình, vì trong lòng tôi, gia đình quan trọng hơn tất cả.",
       "py": "B: Wǒ měitiān dōu yào huíjiā gēn jiārén chīfàn, yīnwèi zàiwǒxīnzhōng, jiārén bǐ shénme dōu zhòngyào."
      },
      {
       "hz": "A: 你剛才在會議中，提到一份商品調查的資料，請問哪裡查得到？",
       "vi": "A: Vừa rồi trong cuộc họp bạn có nhắc đến một tài liệu khảo sát sản phẩm, cho hỏi tra ở đâu được?",
       "py": "A: Nǐ gāngcái zài huìyì zhōng, tídào yífèn shāngpǐn diàochá de zīliào, qǐngwèn nǎlǐ chá dédào?"
      },
      {
       "hz": "B: 就在會議報告中的第十頁，你翻一下應該就看得到。",
       "vi": "B: Ở ngay trang mười trong báo cáo cuộc họp, bạn lật ra chắc sẽ thấy.",
       "py": "B: Jiù zài huìyì bàogào zhōng de dìshí yè, nǐ fān yíxià yīnggāi jiù kàn dédào."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "在……中 — trong…",
   "giaiThich": "Dùng để giới hạn phạm vi: trong quá trình nào đó, trong nhóm nào đó."
  },
  {
   "title": "2. 不能不/不得不",
   "points": [
    {
     "label": null,
     "formula": "表示當事人的心裡不願意做某件事，因為沒辦法只好做了，有無奈的感覺，語氣比「不能不」強。",
     "examples": [
      {
       "hz": "「不能不」有應該、必須、一定要負責某件事，不做不行的意思。",
       "vi": "“不能不” có nghĩa là nên, phải, nhất định phải chịu trách nhiệm một việc nào đó, không làm không được.",
       "py": "“Bùnéngbù” yǒu yīnggāi, bìxū, yídìng yào fùzé mǒujiànshì, bú zuò bùxíng de yìsi."
      },
      {
       "hz": "雖然他覺得那裡的音樂聽起來像噪音，但是為了工作不能2. 牛先生為了讓每個孩子都有自己的房間，不能不換大一點3. 今天晚上爸媽要參加朋友的婚禮，讓我照顧弟弟妹妹，我不能不早一點回家。",
       "vi": "Tuy anh ấy thấy nhạc ở đó nghe như tiếng ồn, nhưng vì công việc nên không thể không… Ông Ngưu để đứa con nào cũng có phòng riêng nên không thể không đổi sang nhà rộng hơn… Tối nay bố mẹ đi dự đám cưới của bạn, bảo tôi trông em trai em gái, tôi không thể không về nhà sớm.",
       "py": "Suīrán tā juéde nàlǐ de yīnyuè tīng qǐlái xiàng zàoyīn, dànshì wèile gōngzuò bùnéng 2. Niú xiānshēng wèile ràng měigè háizi dōu yǒu zìjǐ de fángjiān, bùnéngbú huàn dà yìdiǎn 3. Jīntiān wǎnshàng bàmā yào cānjiā péngyǒu de hūnlǐ, ràng wǒ zhàogù dìdi mèimei, wǒ bùnéngbù zǎo yìdiǎn huíjiā."
      },
      {
       "hz": "就算百貨公司，也可能賣品質不佳的商品，所以不管在哪裡購物都不能不檢查。",
       "vi": "Ngay cả trung tâm thương mại cũng có thể bán hàng kém chất lượng, nên mua sắm ở đâu cũng không thể không kiểm tra.",
       "py": "Jiùsuàn bǎihuògōngsī, yě kěnéng mài pǐnzhí bù jiā de shāngpǐn, suǒyǐ bùguǎn zài nǎlǐ gòuwù dōu bùnéngbù jiǎnchá."
      },
      {
       "hz": "我叔叔才五十歲，最近因為生病的關係，不得不早一點退這個地區發生了嚴重的森林火災，許多人的房子被燒掉了，不得不離開，到安全的地方去。",
       "vi": "Chú tôi mới năm mươi tuổi, dạo này vì bệnh nên đành phải nghỉ hưu sớm. Khu vực này xảy ra cháy rừng nghiêm trọng, nhà của nhiều người bị thiêu rụi, đành phải rời đi đến nơi an toàn.",
       "py": "Wǒ shúshu cái wǔshísuì, zuìjìn yīnwèi shēngbìng de guānxì, bùdébù zǎo yìdiǎn tuì zhège dìqū fāshēng le yánzhòng de sēnlín huǒzāi, xǔduō rén de fángzi bèi shāodiào le, bùdébù líkāi, dào ānquán de dìfāng qù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不能不 / 不得不 — không thể không, đành phải",
   "giaiThich": "Người trong cuộc không muốn làm nhưng không còn cách nào khác, mang cảm giác bất đắc dĩ. 不得不 giọng mạnh hơn 不能不."
  },
  {
   "title": "3. 正＋V",
   "points": [
    {
     "label": null,
     "formula": "「正」當副詞，有剛好、巧合的意思。「正」後面的第一件事剛開始做或剛好準備要做時，第二件事也很巧合的發生了，例如：「我正打開門時，就看見爸爸回來了」、「我正要回家，就下起雨來了」。「正」後面常接「要、想、打算、準備」等動詞。",
     "examples": [
      {
       "hz": "有一天張文華正準備出門上班時，他看到電視上播著新聞2. 我正想打電話給小紀時，就接到他打來的電話。",
       "vi": "Một hôm, đúng lúc Trương Văn Hoa đang chuẩn bị ra ngoài đi làm thì thấy trên tivi đang phát tin tức… Tôi vừa định gọi điện cho Tiểu Kỷ thì nhận được điện thoại của cậu ấy gọi tới.",
       "py": "Yǒu yìtiān zhāng wénhuá zhèng zhǔnbèi chūmén shàngbān shí, tā kàndào diànshì shàng bò zhe xīnwén 2. Wǒ zhèng xiǎng dǎdiànhuà gěi xiǎo jìshí, jiù jiēdào tā dǎ lái de diànhuà."
      },
      {
       "hz": "我正要進電梯時，突然發生地震，還好我沒進去。",
       "vi": "Tôi vừa định bước vào thang máy thì đột nhiên xảy ra động đất, may mà tôi chưa vào.",
       "py": "Wǒ zhèngyào jìn diàntī shí, tūrán fāshēng dìzhèn, háihǎo wǒ méi jìnqù."
      },
      {
       "hz": "我正用手機回朋友的信時，他突然出現在我面前，嚇了我",
       "vi": "Tôi đang dùng điện thoại trả lời tin nhắn của bạn thì cậu ấy đột nhiên xuất hiện trước mặt, làm tôi giật mình.",
       "py": "Wǒ zhèng yòng shǒujī huí péngyǒu de xìn shí, tā tūrán chūxiàn zài wǒ miànqián, xià le wǒ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "正 + động từ — vừa đúng lúc đang…",
   "giaiThich": "正 là phó từ, nghĩa \"vừa đúng lúc\". Việc thứ nhất vừa bắt đầu hoặc sắp làm thì việc thứ hai xảy ra rất tình cờ (我正打開門時，就看見爸爸回來了). Sau 正 hay đi với 要, 想, 打算, 準備."
  }
 ],
 "td3-7.1": [
  {
   "title": "4. V成",
   "points": [
    {
     "label": null,
     "formula": "「成」是結果補語，有成功、完成、實現的意思。「V成」表示動作已經完成、實現了；「沒V成」表示沒有完成、實現，用在已經發生的情況；「V得成」、「V不成」表示有或沒有完成、實現的可能性。",
     "examples": [
      {
       "hz": "⋯⋯不管她想去哪裡，沒有去不成的？",
       "vi": "…dù cô ấy muốn đi đâu thì có nơi nào mà không đi được?",
       "py": "…… bùguǎn tā xiǎng qù nǎlǐ, méiyǒu qùbùchéng de?"
      },
      {
       "hz": "氣象預報說明天下雨的機會是百分之九十，明天的跨年活動恐怕辦不成了。",
       "vi": "Dự báo thời tiết nói khả năng ngày mai mưa là chín mươi phần trăm, hoạt động đón năm mới ngày mai e là không tổ chức được rồi.",
       "py": "Qìxiàngyùbào shuō míngtiān xiàyǔ de jīhuì shì bǎifēnzhījiǔshí, míngtiān de kuà nián huódòng kǒngpà bànbùchéng le."
      },
      {
       "hz": "我們跟那家大公司的生意，今天終於談成了，老闆要請大家吃大餐，慶祝一下。",
       "vi": "Thương vụ của chúng tôi với công ty lớn đó hôm nay cuối cùng cũng đàm phán thành công, ông chủ sẽ mời mọi người ăn một bữa thịnh soạn để ăn mừng.",
       "py": "Wǒmen gēn nà jiā dà gōngsī de shēngyì, jīntiān zhōngyú tán chéng le, lǎobǎn yào qǐng dàjiā chī dàcān, qìngzhù yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 成 — làm thành, đạt được",
   "giaiThich": "成 là bổ ngữ kết quả: thành công, hoàn thành. V成 = đã làm được; 沒V成 = đã không làm được; V得成 / V不成 = có/không có khả năng làm được."
  },
  {
   "title": "1. 就⋯⋯來說",
   "points": [
    {
     "label": null,
     "formula": "「就……來說」常用在書面，「就」有針對的意思。主要針對某個對象或某個範圍來敘述或分析。",
     "examples": [
      {
       "hz": "就選舉文化來說，臺灣和法國很不同⋯⋯2. 就購物的方式來說，使用網路不僅方便，比價也容易多了。",
       "vi": "Xét về văn hoá bầu cử, Đài Loan và Pháp rất khác nhau… Xét về cách mua sắm, dùng mạng internet không những tiện mà so giá cũng dễ hơn nhiều.",
       "py": "Jiù xuǎnjǔ wénhuà láishuō, Táiwān hàn Fǎguó hěn bùtóng…… 2. Jiù gòuwù de fāngshì láishuō, shǐyòng wǎnglù bùjǐn fāngbiàn, bǐjià yě róngyì duō le."
      },
      {
       "hz": "就我們中文系的課程來說，不僅一學期比一學期難，報告也越來越多了。",
       "vi": "Xét về chương trình học của khoa tiếng Trung chúng tôi, không những học kỳ sau khó hơn học kỳ trước mà báo cáo cũng ngày càng nhiều.",
       "py": "Jiù wǒmen zhōngwénxì de kèchéng láishuō, bùjǐn yì xuéqí bǐ yì xuéqí nán, bàogào yě yuèláiyuè duō le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就……來說 — xét về…",
   "giaiThich": "Văn viết. Nêu một đối tượng hoặc phạm vi cụ thể để bàn luận, phân tích."
  },
  {
   "title": "2. V/Vs得⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「得」的後面是補語，說明「得」前面的動作(V)，或是前面的狀態(Vs)達到什麼樣的程度。「得」後面表示結果，可以使用誇張的詞語或短句加以說明。",
     "examples": [
      {
       "hz": "⋯⋯讓他開心得把工作的問題都忘了。",
       "vi": "…khiến anh ấy vui đến mức quên hết những rắc rối trong công việc.",
       "py": "…… ràng tā kāixīn de bǎ gōngzuò de wèntí dōu wàng le."
      },
      {
       "hz": "我在那家吃到飽餐廳一連吃了四個小時，吃得我都站不起來了。",
       "vi": "Ở nhà hàng buffet đó tôi ăn liền bốn tiếng, ăn đến mức không đứng dậy nổi.",
       "py": "Wǒ zài nà jiā chī dào bǎo cāntīng yìlián chī le sìgè xiǎoshí, chī de wǒ dōu zhànbùqǐlái le."
      },
      {
       "hz": "那家包子店的生意好得不得了，店員忙得沒時間吃飯、",
       "vi": "Tiệm bánh bao đó buôn bán đắt khách vô cùng, nhân viên bận đến mức không có thời gian ăn cơm…",
       "py": "Nà jiā bāozi diàn de shēngyì hǎo de bùdéle, diànyuán máng de méi shíjiān chīfàn,"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V/Vs 得… — bổ ngữ mức độ",
   "giaiThich": "Sau 得 là bổ ngữ, cho biết hành động (V) hoặc trạng thái (Vs) phía trước đạt tới mức nào. Phần sau 得 có thể dùng lối nói cường điệu để miêu tả."
  }
 ],
 "td3-7.2": [
  {
   "title": "4. V成",
   "points": [
    {
     "label": null,
     "formula": "「成」是結果補語，有成功、完成、實現的意思。「V成」表示動作已經完成、實現了；「沒V成」表示沒有完成、實現，用在已經發生的情況；「V得成」、「V不成」表示有或沒有完成、實現的可能性。",
     "examples": [
      {
       "hz": "⋯⋯不管她想去哪裡，沒有去不成的？",
       "vi": "…dù cô ấy muốn đi đâu thì có nơi nào mà không đi được?",
       "py": "…… bùguǎn tā xiǎng qù nǎlǐ, méiyǒu qùbùchéng de?"
      },
      {
       "hz": "氣象預報說明天下雨的機會是百分之九十，明天的跨年活動恐怕辦不成了。",
       "vi": "Dự báo thời tiết nói khả năng ngày mai mưa là chín mươi phần trăm, hoạt động đón năm mới ngày mai e là không tổ chức được rồi.",
       "py": "Qìxiàngyùbào shuō míngtiān xiàyǔ de jīhuì shì bǎifēnzhījiǔshí, míngtiān de kuà nián huódòng kǒngpà bànbùchéng le."
      },
      {
       "hz": "我們跟那家大公司的生意，今天終於談成了，老闆要請大家吃大餐，慶祝一下。",
       "vi": "Thương vụ của chúng tôi với công ty lớn đó hôm nay cuối cùng cũng đàm phán thành công, ông chủ sẽ mời mọi người ăn một bữa thịnh soạn để ăn mừng.",
       "py": "Wǒmen gēn nà jiā dà gōngsī de shēngyì, jīntiān zhōngyú tán chéng le, lǎobǎn yào qǐng dàjiā chī dàcān, qìngzhù yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 成 — làm thành, đạt được",
   "giaiThich": "成 là bổ ngữ kết quả: thành công, hoàn thành. V成 = đã làm được; 沒V成 = đã không làm được; V得成 / V不成 = có/không có khả năng làm được."
  },
  {
   "title": "1. 就⋯⋯來說",
   "points": [
    {
     "label": null,
     "formula": "「就……來說」常用在書面，「就」有針對的意思。主要針對某個對象或某個範圍來敘述或分析。",
     "examples": [
      {
       "hz": "就選舉文化來說，臺灣和法國很不同⋯⋯2. 就購物的方式來說，使用網路不僅方便，比價也容易多了。",
       "vi": "Xét về văn hoá bầu cử, Đài Loan và Pháp rất khác nhau… Xét về cách mua sắm, dùng mạng internet không những tiện mà so giá cũng dễ hơn nhiều.",
       "py": "Jiù xuǎnjǔ wénhuà láishuō, Táiwān hàn Fǎguó hěn bùtóng…… 2. Jiù gòuwù de fāngshì láishuō, shǐyòng wǎnglù bùjǐn fāngbiàn, bǐjià yě róngyì duō le."
      },
      {
       "hz": "就我們中文系的課程來說，不僅一學期比一學期難，報告也越來越多了。",
       "vi": "Xét về chương trình học của khoa tiếng Trung chúng tôi, không những học kỳ sau khó hơn học kỳ trước mà báo cáo cũng ngày càng nhiều.",
       "py": "Jiù wǒmen zhōngwénxì de kèchéng láishuō, bùjǐn yì xuéqí bǐ yì xuéqí nán, bàogào yě yuèláiyuè duō le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就……來說 — xét về…",
   "giaiThich": "Văn viết. Nêu một đối tượng hoặc phạm vi cụ thể để bàn luận, phân tích."
  },
  {
   "title": "2. V/Vs得⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「得」的後面是補語，說明「得」前面的動作(V)，或是前面的狀態(Vs)達到什麼樣的程度。「得」後面表示結果，可以使用誇張的詞語或短句加以說明。",
     "examples": [
      {
       "hz": "⋯⋯讓他開心得把工作的問題都忘了。",
       "vi": "…khiến anh ấy vui đến mức quên hết những rắc rối trong công việc.",
       "py": "…… ràng tā kāixīn de bǎ gōngzuò de wèntí dōu wàng le."
      },
      {
       "hz": "我在那家吃到飽餐廳一連吃了四個小時，吃得我都站不起來了。",
       "vi": "Ở nhà hàng buffet đó tôi ăn liền bốn tiếng, ăn đến mức không đứng dậy nổi.",
       "py": "Wǒ zài nà jiā chī dào bǎo cāntīng yìlián chī le sìgè xiǎoshí, chī de wǒ dōu zhànbùqǐlái le."
      },
      {
       "hz": "那家包子店的生意好得不得了，店員忙得沒時間吃飯、",
       "vi": "Tiệm bánh bao đó buôn bán đắt khách vô cùng, nhân viên bận đến mức không có thời gian ăn cơm…",
       "py": "Nà jiā bāozi diàn de shēngyì hǎo de bùdéle, diànyuán máng de méi shíjiān chīfàn,"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V/Vs 得… — bổ ngữ mức độ",
   "giaiThich": "Sau 得 là bổ ngữ, cho biết hành động (V) hoặc trạng thái (Vs) phía trước đạt tới mức nào. Phần sau 得 có thể dùng lối nói cường điệu để miêu tả."
  }
 ],
 "td3-7.3": [
  {
   "title": "4. V成",
   "points": [
    {
     "label": null,
     "formula": "「成」是結果補語，有成功、完成、實現的意思。「V成」表示動作已經完成、實現了；「沒V成」表示沒有完成、實現，用在已經發生的情況；「V得成」、「V不成」表示有或沒有完成、實現的可能性。",
     "examples": [
      {
       "hz": "⋯⋯不管她想去哪裡，沒有去不成的？",
       "vi": "…dù cô ấy muốn đi đâu thì có nơi nào mà không đi được?",
       "py": "…… bùguǎn tā xiǎng qù nǎlǐ, méiyǒu qùbùchéng de?"
      },
      {
       "hz": "氣象預報說明天下雨的機會是百分之九十，明天的跨年活動恐怕辦不成了。",
       "vi": "Dự báo thời tiết nói khả năng ngày mai mưa là chín mươi phần trăm, hoạt động đón năm mới ngày mai e là không tổ chức được rồi.",
       "py": "Qìxiàngyùbào shuō míngtiān xiàyǔ de jīhuì shì bǎifēnzhījiǔshí, míngtiān de kuà nián huódòng kǒngpà bànbùchéng le."
      },
      {
       "hz": "我們跟那家大公司的生意，今天終於談成了，老闆要請大家吃大餐，慶祝一下。",
       "vi": "Thương vụ của chúng tôi với công ty lớn đó hôm nay cuối cùng cũng đàm phán thành công, ông chủ sẽ mời mọi người ăn một bữa thịnh soạn để ăn mừng.",
       "py": "Wǒmen gēn nà jiā dà gōngsī de shēngyì, jīntiān zhōngyú tán chéng le, lǎobǎn yào qǐng dàjiā chī dàcān, qìngzhù yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 成 — làm thành, đạt được",
   "giaiThich": "成 là bổ ngữ kết quả: thành công, hoàn thành. V成 = đã làm được; 沒V成 = đã không làm được; V得成 / V不成 = có/không có khả năng làm được."
  },
  {
   "title": "1. 就⋯⋯來說",
   "points": [
    {
     "label": null,
     "formula": "「就……來說」常用在書面，「就」有針對的意思。主要針對某個對象或某個範圍來敘述或分析。",
     "examples": [
      {
       "hz": "就選舉文化來說，臺灣和法國很不同⋯⋯2. 就購物的方式來說，使用網路不僅方便，比價也容易多了。",
       "vi": "Xét về văn hoá bầu cử, Đài Loan và Pháp rất khác nhau… Xét về cách mua sắm, dùng mạng internet không những tiện mà so giá cũng dễ hơn nhiều.",
       "py": "Jiù xuǎnjǔ wénhuà láishuō, Táiwān hàn Fǎguó hěn bùtóng…… 2. Jiù gòuwù de fāngshì láishuō, shǐyòng wǎnglù bùjǐn fāngbiàn, bǐjià yě róngyì duō le."
      },
      {
       "hz": "就我們中文系的課程來說，不僅一學期比一學期難，報告也越來越多了。",
       "vi": "Xét về chương trình học của khoa tiếng Trung chúng tôi, không những học kỳ sau khó hơn học kỳ trước mà báo cáo cũng ngày càng nhiều.",
       "py": "Jiù wǒmen zhōngwénxì de kèchéng láishuō, bùjǐn yì xuéqí bǐ yì xuéqí nán, bàogào yě yuèláiyuè duō le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就……來說 — xét về…",
   "giaiThich": "Văn viết. Nêu một đối tượng hoặc phạm vi cụ thể để bàn luận, phân tích."
  },
  {
   "title": "2. V/Vs得⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「得」的後面是補語，說明「得」前面的動作(V)，或是前面的狀態(Vs)達到什麼樣的程度。「得」後面表示結果，可以使用誇張的詞語或短句加以說明。",
     "examples": [
      {
       "hz": "⋯⋯讓他開心得把工作的問題都忘了。",
       "vi": "…khiến anh ấy vui đến mức quên hết những rắc rối trong công việc.",
       "py": "…… ràng tā kāixīn de bǎ gōngzuò de wèntí dōu wàng le."
      },
      {
       "hz": "我在那家吃到飽餐廳一連吃了四個小時，吃得我都站不起來了。",
       "vi": "Ở nhà hàng buffet đó tôi ăn liền bốn tiếng, ăn đến mức không đứng dậy nổi.",
       "py": "Wǒ zài nà jiā chī dào bǎo cāntīng yìlián chī le sìgè xiǎoshí, chī de wǒ dōu zhànbùqǐlái le."
      },
      {
       "hz": "那家包子店的生意好得不得了，店員忙得沒時間吃飯、",
       "vi": "Tiệm bánh bao đó buôn bán đắt khách vô cùng, nhân viên bận đến mức không có thời gian ăn cơm…",
       "py": "Nà jiā bāozi diàn de shēngyì hǎo de bùdéle, diànyuán máng de méi shíjiān chīfàn,"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V/Vs 得… — bổ ngữ mức độ",
   "giaiThich": "Sau 得 là bổ ngữ, cho biết hành động (V) hoặc trạng thái (Vs) phía trước đạt tới mức nào. Phần sau 得 có thể dùng lối nói cường điệu để miêu tả."
  }
 ],
 "td3-7.4": [
  {
   "title": "4. V成",
   "points": [
    {
     "label": null,
     "formula": "「成」是結果補語，有成功、完成、實現的意思。「V成」表示動作已經完成、實現了；「沒V成」表示沒有完成、實現，用在已經發生的情況；「V得成」、「V不成」表示有或沒有完成、實現的可能性。",
     "examples": [
      {
       "hz": "⋯⋯不管她想去哪裡，沒有去不成的？",
       "vi": "…dù cô ấy muốn đi đâu thì có nơi nào mà không đi được?",
       "py": "…… bùguǎn tā xiǎng qù nǎlǐ, méiyǒu qùbùchéng de?"
      },
      {
       "hz": "氣象預報說明天下雨的機會是百分之九十，明天的跨年活動恐怕辦不成了。",
       "vi": "Dự báo thời tiết nói khả năng ngày mai mưa là chín mươi phần trăm, hoạt động đón năm mới ngày mai e là không tổ chức được rồi.",
       "py": "Qìxiàngyùbào shuō míngtiān xiàyǔ de jīhuì shì bǎifēnzhījiǔshí, míngtiān de kuà nián huódòng kǒngpà bànbùchéng le."
      },
      {
       "hz": "我們跟那家大公司的生意，今天終於談成了，老闆要請大家吃大餐，慶祝一下。",
       "vi": "Thương vụ của chúng tôi với công ty lớn đó hôm nay cuối cùng cũng đàm phán thành công, ông chủ sẽ mời mọi người ăn một bữa thịnh soạn để ăn mừng.",
       "py": "Wǒmen gēn nà jiā dà gōngsī de shēngyì, jīntiān zhōngyú tán chéng le, lǎobǎn yào qǐng dàjiā chī dàcān, qìngzhù yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 成 — làm thành, đạt được",
   "giaiThich": "成 là bổ ngữ kết quả: thành công, hoàn thành. V成 = đã làm được; 沒V成 = đã không làm được; V得成 / V不成 = có/không có khả năng làm được."
  },
  {
   "title": "1. 就⋯⋯來說",
   "points": [
    {
     "label": null,
     "formula": "「就……來說」常用在書面，「就」有針對的意思。主要針對某個對象或某個範圍來敘述或分析。",
     "examples": [
      {
       "hz": "就選舉文化來說，臺灣和法國很不同⋯⋯2. 就購物的方式來說，使用網路不僅方便，比價也容易多了。",
       "vi": "Xét về văn hoá bầu cử, Đài Loan và Pháp rất khác nhau… Xét về cách mua sắm, dùng mạng internet không những tiện mà so giá cũng dễ hơn nhiều.",
       "py": "Jiù xuǎnjǔ wénhuà láishuō, Táiwān hàn Fǎguó hěn bùtóng…… 2. Jiù gòuwù de fāngshì láishuō, shǐyòng wǎnglù bùjǐn fāngbiàn, bǐjià yě róngyì duō le."
      },
      {
       "hz": "就我們中文系的課程來說，不僅一學期比一學期難，報告也越來越多了。",
       "vi": "Xét về chương trình học của khoa tiếng Trung chúng tôi, không những học kỳ sau khó hơn học kỳ trước mà báo cáo cũng ngày càng nhiều.",
       "py": "Jiù wǒmen zhōngwénxì de kèchéng láishuō, bùjǐn yì xuéqí bǐ yì xuéqí nán, bàogào yě yuèláiyuè duō le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "就……來說 — xét về…",
   "giaiThich": "Văn viết. Nêu một đối tượng hoặc phạm vi cụ thể để bàn luận, phân tích."
  },
  {
   "title": "2. V/Vs得⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「得」的後面是補語，說明「得」前面的動作(V)，或是前面的狀態(Vs)達到什麼樣的程度。「得」後面表示結果，可以使用誇張的詞語或短句加以說明。",
     "examples": [
      {
       "hz": "⋯⋯讓他開心得把工作的問題都忘了。",
       "vi": "…khiến anh ấy vui đến mức quên hết những rắc rối trong công việc.",
       "py": "…… ràng tā kāixīn de bǎ gōngzuò de wèntí dōu wàng le."
      },
      {
       "hz": "我在那家吃到飽餐廳一連吃了四個小時，吃得我都站不起來了。",
       "vi": "Ở nhà hàng buffet đó tôi ăn liền bốn tiếng, ăn đến mức không đứng dậy nổi.",
       "py": "Wǒ zài nà jiā chī dào bǎo cāntīng yìlián chī le sìgè xiǎoshí, chī de wǒ dōu zhànbùqǐlái le."
      },
      {
       "hz": "那家包子店的生意好得不得了，店員忙得沒時間吃飯、",
       "vi": "Tiệm bánh bao đó buôn bán đắt khách vô cùng, nhân viên bận đến mức không có thời gian ăn cơm…",
       "py": "Nà jiā bāozi diàn de shēngyì hǎo de bùdéle, diànyuán máng de méi shíjiān chīfàn,"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V/Vs 得… — bổ ngữ mức độ",
   "giaiThich": "Sau 得 là bổ ngữ, cho biết hành động (V) hoặc trạng thái (Vs) phía trước đạt tới mức nào. Phần sau 得 có thể dùng lối nói cường điệu để miêu tả."
  }
 ],
 "td3-8.1": [
  {
   "title": "1. S 把 NP1 + V 成 NP2",
   "points": [
    {
     "label": null,
     "formula": "「成」有「成為」 、 「變成」的意思。表示某人經由某個動作，讓NP1成為或變成NP2。如果動詞是「看、聽、說、寫、念」 ，有時有「弄錯了」的意思。",
     "examples": [
      {
       "hz": "……我還是不希望大家把我看成只愛買名牌的人。",
       "vi": "…tôi vẫn không mong mọi người coi tôi là người chỉ thích mua hàng hiệu.",
       "py": "…… wǒ háishì bù xīwàng dàjiā bǎ wǒ kànchéng zhǐ ài mǎi míngpái de rén."
      },
      {
       "hz": "那本有名的英國小說，十年前就有人把它翻成了二十種語言，而且還拍成了電影。",
       "vi": "Quyển tiểu thuyết nổi tiếng của Anh đó, mười năm trước đã có người dịch ra hai mươi thứ tiếng, còn được dựng thành phim nữa.",
       "py": "Nà běn yǒumíng de Yīngguó xiǎoshuō, shínián qián jiù yǒurén bǎ tā fān chéng le èrshízhǒng yǔyán, érqiě hái pāi chéng le diànyǐng."
      },
      {
       "hz": "阿姨把穿不下的舊衣服，修改成非常流行的帽子和袋子。",
       "vi": "Dì sửa những bộ quần áo cũ không mặc vừa nữa thành mũ và túi rất hợp mốt.",
       "py": "Āyí bǎ chuānbúxià de jiùyīfú, xiūgǎi chéng fēicháng liúxíng de màozi hàn dàizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 NP1 + V 成 NP2 — biến A thành B",
   "giaiThich": "成 nghĩa \"trở thành, biến thành\": qua một hành động, ai đó làm NP1 thành NP2. Nếu động từ là 看, 聽, 說, 寫, 念 thì đôi khi mang nghĩa \"nhầm\" (nghe nhầm, nhìn nhầm)."
  },
  {
   "title": "2. 再……也/都……",
   "points": [
    {
     "label": null,
     "formula": "「再......也/都......」使用再假設的情況，有「就算......，也......」的意思。「再」後面的句子是把情況說到最高或最低、最好或最壞的程度，而「也」或「都」後面的結果、決定或是想法不會改變；有時候表示說話的人覺得應該而且值得這樣做。",
     "examples": [
      {
       "hz": "……再英俊、再漂亮的人也應該找到自己的風格。",
       "vi": "…người dù có đẹp trai, xinh đẹp đến đâu cũng nên tìm ra phong cách riêng của mình.",
       "py": "…… zài yīngjùn, zài piàoliàng de rén yě yīnggāi zhǎodào zìjǐ de fēnggé."
      },
      {
       "hz": "孩子需要父母照顧，父母再忙都應該陪陪他們，了解他們的想法。",
       "vi": "Con cái cần bố mẹ chăm sóc, bố mẹ dù bận đến đâu cũng nên dành thời gian ở bên, hiểu suy nghĩ của con.",
       "py": "Háizi xūyào fùmǔ zhàogù, fùmǔ zài máng dōu yīnggāi péipéi tāmen, liǎojiě tāmen de xiǎngfǎ."
      },
      {
       "hz": "為了得到更多經驗，也為了美好的未來，再討厭的工作也得忍耐。",
       "vi": "Để có thêm kinh nghiệm, cũng vì một tương lai tốt đẹp, công việc dù đáng ghét đến đâu cũng phải chịu đựng.",
       "py": "Wèile dédào gèng duō jīngyàn, yě wèile měihǎo de wèilái, zài tǎoyàn de gōngzuò yě děi rěnnài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再… 也/都… — dù có… thì cũng…",
   "giaiThich": "Nêu giả thiết đẩy tình huống tới mức cao nhất hoặc thấp nhất, nhưng kết quả, quyết định sau 也/都 vẫn không đổi. Gần nghĩa 就算……也……"
  },
  {
   "title": "3. V慣",
   "points": [
    {
     "label": null,
     "formula": "「動詞+慣」的「慣」有習慣的意思，是結果補語，表示前面動作的結果。例如：他用慣了筷子，連吃西餐也用筷子。如果「慣」的前面加上「得/不」，表示前面的動作能或不能習慣，例如： 「這個房間很小，你住得慣嗎？」 「我吃不管別人做的菜，每天都自己做」。",
     "examples": [
      {
       "hz": "對我來說，只要穿得慣、穿得自在，把自己當衣服的主人……2.很多部落格都推薦那家餐廳，不過他們的菜鹹了點，我吃不慣。",
       "vi": "Đối với tôi, chỉ cần mặc quen, mặc thoải mái, coi mình là chủ của bộ quần áo… Nhiều blog giới thiệu nhà hàng đó, nhưng món ăn của họ hơi mặn, tôi ăn không quen.",
       "py": "Duì wǒ láishuō, zhǐyào chuān de guàn, chuān de zì zài, bǎ zìjǐ dāng yīfú de zhǔrén…… 2. Hěnduō bùluò gé dōu tuījiàn nà jiā cāntīng, búguò tāmen de cài xián le diǎn, wǒ chī bú guàn."
      },
      {
       "hz": "A：老闆要你去英國出差，還可以順便旅遊，為什麼你不太想去？",
       "vi": "A: Ông chủ cử bạn đi công tác ở Anh, còn tiện thể được du lịch, sao bạn lại không muốn đi lắm?",
       "py": "A: Lǎobǎn yào nǐ qù Yīngguó chūchāi, hái kěyǐ shùnbiàn lǚyóu, wèishénme nǐ bútàixiǎng qù?"
      },
      {
       "hz": "B：我睡慣了家裡的床，旅館的睡不慣。",
       "vi": "B: Tôi quen ngủ giường ở nhà rồi, giường khách sạn ngủ không quen.",
       "py": "B: Wǒ shuì guàn le jiālǐ de chuáng, lǚguǎn de shuì bú guàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 慣 — quen làm gì",
   "giaiThich": "慣 là bổ ngữ kết quả, nghĩa \"đã quen\" (他用慣了筷子). Thêm 得/不 để nói có quen được hay không: 住得慣, 吃不慣."
  },
  {
   "title": "1. 況且",
   "points": [
    {
     "label": null,
     "formula": "「況且」當連詞，表示更進一層的語氣，用來補充說明，讓理由更完整。常和「也、還、又」配合使用。",
     "examples": [
      {
       "hz": "……不再為了趕流行亂買衣服。況且把舊衣服修改一下……。",
       "vi": "…không còn chạy theo mốt mà mua quần áo bừa bãi nữa. Hơn nữa, sửa lại quần áo cũ một chút…",
       "py": "…… búzài wèile gǎn liúxíng luàn mǎi yīfú. Kuàngqiě bǎ jiùyīfú xiūgǎi yíxià……."
      },
      {
       "hz": "爸爸要我將來管理他的公司，可是我沒興趣，況且我還有自己的夢想，所以不想去。",
       "vi": "Bố muốn sau này tôi quản lý công ty của bố, nhưng tôi không có hứng thú, hơn nữa tôi còn có ước mơ riêng, nên không muốn làm.",
       "py": "Bàba yào wǒ jiānglái guǎnlǐ tā de gōngsī, kěshì wǒ méi xìngqù, kuàngqiě wǒ háiyǒu zìjǐ de mèngxiǎng, suǒyǐ bùxiǎng qù."
      },
      {
       "hz": "兒子：我畢業後想當導演，拍出好電影來讓大家欣賞。",
       "vi": "Con trai: Tốt nghiệp xong con muốn làm đạo diễn, làm ra những bộ phim hay cho mọi người thưởng thức.",
       "py": "Érzi: Wǒ bìyè hòu xiǎng dāng dǎoyǎn, pāi chū hǎo diànyǐng lái ràng dàjiā xīnshǎng."
      },
      {
       "hz": "爸爸：你是學電影藝術的，況且也寫過劇本、當過演員，可以嘗試一下。",
       "vi": "Bố: Con học nghệ thuật điện ảnh, hơn nữa cũng đã từng viết kịch bản, làm diễn viên, có thể thử xem.",
       "py": "Bàba: Nǐ shì xué diànyǐng yìshù de, kuàngqiě yě xiě guò jùběn, dāng guò yǎnyuán, kěyǐ chángshì yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "況且 — hơn nữa",
   "giaiThich": "Liên từ, thêm một lý do nữa cho đầy đủ, giọng tăng tiến. Hay đi cùng 也, 還, 又."
  },
  {
   "title": "2. 非……不可",
   "points": [
    {
     "label": null,
     "formula": "「非」是「不」的意思， 「非……不可」表示一定得做某件事，沒有其他選擇。 「非」的後面加動詞或動詞短語。",
     "examples": [
      {
       "hz": "……在東賢心中，沒有什麼是非買不可的。",
       "vi": "…trong lòng Đông Hiền, chẳng có thứ gì là nhất định phải mua cả.",
       "py": "…… zài dōng xián xīnzhōng, méiyǒu shénme shì fēimǎibùkě de."
      },
      {
       "hz": "他在衝浪時，牙齒被衝浪板打到了，血流個不停，非去看醫生不可。",
       "vi": "Lúc lướt sóng, răng anh ấy bị ván lướt đập vào, máu chảy không ngừng, nhất định phải đi khám bác sĩ.",
       "py": "Tā zài chōnglàng shí, yáchǐ bèi chōnglàngbǎn dǎ dào le, xuèliú gè bùtíng, fēi qù kàn yīshēng bùkě."
      },
      {
       "hz": "舅舅不小心把明天結婚要穿的衣服弄髒了，非立刻送洗不可。",
       "vi": "Cậu không cẩn thận làm bẩn bộ quần áo định mặc trong đám cưới ngày mai, nhất định phải mang đi giặt ngay.",
       "py": "Jiùjiù bù xiǎoxīn bǎ míngtiān jiéhūn yào chuān de yīfú nòngzāngle, fēi lìkè sòngxǐ bùkě."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "非… 不可 — nhất định phải…",
   "giaiThich": "非 ở đây nghĩa là \"không\"; cả cấu trúc nghĩa \"nhất định phải làm, không còn lựa chọn nào khác\". Sau 非 là động từ hoặc cụm động từ."
  },
  {
   "title": "3. 畢竟",
   "points": [
    {
     "label": null,
     "formula": "「畢竟」後面的句子是經過思考分析後的結論，用來說明事情的關鍵，目的是提醒或說服對方。例如：雖然中文不太好學，不過，那畢竟是我自己的選擇。",
     "examples": [
      {
       "hz": "……沒有什麼是非買不可的。畢竟「快時尚」只是一時的流行……2.你要女兒學鋼琴，又要學跳舞，對她的要求太高了，畢竟她才三歲。",
       "vi": "…chẳng có thứ gì là nhất định phải mua cả. Dù sao “thời trang nhanh” cũng chỉ là mốt nhất thời… Bạn bắt con gái vừa học piano vừa học múa, yêu cầu với cháu cao quá rồi, dù sao cháu mới ba tuổi.",
       "py": "…… méiyǒu shénme shì fēimǎibùkě de. Bìjìng “kuài shíshàng” zhǐshì yìshí de liúxíng…… 2. Nǐ yào nǚ'ér xué gāngqín, yòu yào xué tiàowǔ, duì tā de yāoqiú tài gāo le, bìjìng tā cái sānsuì."
      },
      {
       "hz": "先生：這個星期好忙，週末也得加班，沒辦法陪妳去逛街了。",
       "vi": "Chồng: Tuần này bận quá, cuối tuần cũng phải tăng ca, không đi dạo phố với em được rồi.",
       "py": "Xiānshēng: Zhège xīngqí hǎo máng, zhōumò yě děi jiābān, méi bànfǎ péi nǐ qù guàngjiē le."
      },
      {
       "hz": "太太：你最好別再加班了，畢竟人不是機器，要是忙得沒時間休息一定會生病的。",
       "vi": "Vợ: Tốt nhất anh đừng tăng ca nữa, dù sao con người cũng không phải cái máy, nếu bận đến mức không có thời gian nghỉ thì chắc chắn sẽ ốm.",
       "py": "Tàitai: Nǐ zuìhǎo bié zài jiābān le, bìjìng rén búshì jīqì, yàoshì máng de méi shíjiān xiūxí yídìng huì shēngbìng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "畢竟 — dù sao thì…",
   "giaiThich": "Vế sau 畢竟 là kết luận rút ra sau khi cân nhắc, nêu điểm mấu chốt để nhắc nhở hoặc thuyết phục người nghe."
  }
 ],
 "td3-8.2": [
  {
   "title": "1. S 把 NP1 + V 成 NP2",
   "points": [
    {
     "label": null,
     "formula": "「成」有「成為」 、 「變成」的意思。表示某人經由某個動作，讓NP1成為或變成NP2。如果動詞是「看、聽、說、寫、念」 ，有時有「弄錯了」的意思。",
     "examples": [
      {
       "hz": "……我還是不希望大家把我看成只愛買名牌的人。",
       "vi": "…tôi vẫn không mong mọi người coi tôi là người chỉ thích mua hàng hiệu.",
       "py": "…… wǒ háishì bù xīwàng dàjiā bǎ wǒ kànchéng zhǐ ài mǎi míngpái de rén."
      },
      {
       "hz": "那本有名的英國小說，十年前就有人把它翻成了二十種語言，而且還拍成了電影。",
       "vi": "Quyển tiểu thuyết nổi tiếng của Anh đó, mười năm trước đã có người dịch ra hai mươi thứ tiếng, còn được dựng thành phim nữa.",
       "py": "Nà běn yǒumíng de Yīngguó xiǎoshuō, shínián qián jiù yǒurén bǎ tā fān chéng le èrshízhǒng yǔyán, érqiě hái pāi chéng le diànyǐng."
      },
      {
       "hz": "阿姨把穿不下的舊衣服，修改成非常流行的帽子和袋子。",
       "vi": "Dì sửa những bộ quần áo cũ không mặc vừa nữa thành mũ và túi rất hợp mốt.",
       "py": "Āyí bǎ chuānbúxià de jiùyīfú, xiūgǎi chéng fēicháng liúxíng de màozi hàn dàizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 NP1 + V 成 NP2 — biến A thành B",
   "giaiThich": "成 nghĩa \"trở thành, biến thành\": qua một hành động, ai đó làm NP1 thành NP2. Nếu động từ là 看, 聽, 說, 寫, 念 thì đôi khi mang nghĩa \"nhầm\" (nghe nhầm, nhìn nhầm)."
  },
  {
   "title": "2. 再……也/都……",
   "points": [
    {
     "label": null,
     "formula": "「再......也/都......」使用再假設的情況，有「就算......，也......」的意思。「再」後面的句子是把情況說到最高或最低、最好或最壞的程度，而「也」或「都」後面的結果、決定或是想法不會改變；有時候表示說話的人覺得應該而且值得這樣做。",
     "examples": [
      {
       "hz": "……再英俊、再漂亮的人也應該找到自己的風格。",
       "vi": "…người dù có đẹp trai, xinh đẹp đến đâu cũng nên tìm ra phong cách riêng của mình.",
       "py": "…… zài yīngjùn, zài piàoliàng de rén yě yīnggāi zhǎodào zìjǐ de fēnggé."
      },
      {
       "hz": "孩子需要父母照顧，父母再忙都應該陪陪他們，了解他們的想法。",
       "vi": "Con cái cần bố mẹ chăm sóc, bố mẹ dù bận đến đâu cũng nên dành thời gian ở bên, hiểu suy nghĩ của con.",
       "py": "Háizi xūyào fùmǔ zhàogù, fùmǔ zài máng dōu yīnggāi péipéi tāmen, liǎojiě tāmen de xiǎngfǎ."
      },
      {
       "hz": "為了得到更多經驗，也為了美好的未來，再討厭的工作也得忍耐。",
       "vi": "Để có thêm kinh nghiệm, cũng vì một tương lai tốt đẹp, công việc dù đáng ghét đến đâu cũng phải chịu đựng.",
       "py": "Wèile dédào gèng duō jīngyàn, yě wèile měihǎo de wèilái, zài tǎoyàn de gōngzuò yě děi rěnnài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再… 也/都… — dù có… thì cũng…",
   "giaiThich": "Nêu giả thiết đẩy tình huống tới mức cao nhất hoặc thấp nhất, nhưng kết quả, quyết định sau 也/都 vẫn không đổi. Gần nghĩa 就算……也……"
  },
  {
   "title": "3. V慣",
   "points": [
    {
     "label": null,
     "formula": "「動詞+慣」的「慣」有習慣的意思，是結果補語，表示前面動作的結果。例如：他用慣了筷子，連吃西餐也用筷子。如果「慣」的前面加上「得/不」，表示前面的動作能或不能習慣，例如： 「這個房間很小，你住得慣嗎？」 「我吃不管別人做的菜，每天都自己做」。",
     "examples": [
      {
       "hz": "對我來說，只要穿得慣、穿得自在，把自己當衣服的主人……2.很多部落格都推薦那家餐廳，不過他們的菜鹹了點，我吃不慣。",
       "vi": "Đối với tôi, chỉ cần mặc quen, mặc thoải mái, coi mình là chủ của bộ quần áo… Nhiều blog giới thiệu nhà hàng đó, nhưng món ăn của họ hơi mặn, tôi ăn không quen.",
       "py": "Duì wǒ láishuō, zhǐyào chuān de guàn, chuān de zì zài, bǎ zìjǐ dāng yīfú de zhǔrén…… 2. Hěnduō bùluò gé dōu tuījiàn nà jiā cāntīng, búguò tāmen de cài xián le diǎn, wǒ chī bú guàn."
      },
      {
       "hz": "A：老闆要你去英國出差，還可以順便旅遊，為什麼你不太想去？",
       "vi": "A: Ông chủ cử bạn đi công tác ở Anh, còn tiện thể được du lịch, sao bạn lại không muốn đi lắm?",
       "py": "A: Lǎobǎn yào nǐ qù Yīngguó chūchāi, hái kěyǐ shùnbiàn lǚyóu, wèishénme nǐ bútàixiǎng qù?"
      },
      {
       "hz": "B：我睡慣了家裡的床，旅館的睡不慣。",
       "vi": "B: Tôi quen ngủ giường ở nhà rồi, giường khách sạn ngủ không quen.",
       "py": "B: Wǒ shuì guàn le jiālǐ de chuáng, lǚguǎn de shuì bú guàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 慣 — quen làm gì",
   "giaiThich": "慣 là bổ ngữ kết quả, nghĩa \"đã quen\" (他用慣了筷子). Thêm 得/不 để nói có quen được hay không: 住得慣, 吃不慣."
  },
  {
   "title": "1. 況且",
   "points": [
    {
     "label": null,
     "formula": "「況且」當連詞，表示更進一層的語氣，用來補充說明，讓理由更完整。常和「也、還、又」配合使用。",
     "examples": [
      {
       "hz": "……不再為了趕流行亂買衣服。況且把舊衣服修改一下……。",
       "vi": "…không còn chạy theo mốt mà mua quần áo bừa bãi nữa. Hơn nữa, sửa lại quần áo cũ một chút…",
       "py": "…… búzài wèile gǎn liúxíng luàn mǎi yīfú. Kuàngqiě bǎ jiùyīfú xiūgǎi yíxià……."
      },
      {
       "hz": "爸爸要我將來管理他的公司，可是我沒興趣，況且我還有自己的夢想，所以不想去。",
       "vi": "Bố muốn sau này tôi quản lý công ty của bố, nhưng tôi không có hứng thú, hơn nữa tôi còn có ước mơ riêng, nên không muốn làm.",
       "py": "Bàba yào wǒ jiānglái guǎnlǐ tā de gōngsī, kěshì wǒ méi xìngqù, kuàngqiě wǒ háiyǒu zìjǐ de mèngxiǎng, suǒyǐ bùxiǎng qù."
      },
      {
       "hz": "兒子：我畢業後想當導演，拍出好電影來讓大家欣賞。",
       "vi": "Con trai: Tốt nghiệp xong con muốn làm đạo diễn, làm ra những bộ phim hay cho mọi người thưởng thức.",
       "py": "Érzi: Wǒ bìyè hòu xiǎng dāng dǎoyǎn, pāi chū hǎo diànyǐng lái ràng dàjiā xīnshǎng."
      },
      {
       "hz": "爸爸：你是學電影藝術的，況且也寫過劇本、當過演員，可以嘗試一下。",
       "vi": "Bố: Con học nghệ thuật điện ảnh, hơn nữa cũng đã từng viết kịch bản, làm diễn viên, có thể thử xem.",
       "py": "Bàba: Nǐ shì xué diànyǐng yìshù de, kuàngqiě yě xiě guò jùběn, dāng guò yǎnyuán, kěyǐ chángshì yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "況且 — hơn nữa",
   "giaiThich": "Liên từ, thêm một lý do nữa cho đầy đủ, giọng tăng tiến. Hay đi cùng 也, 還, 又."
  },
  {
   "title": "2. 非……不可",
   "points": [
    {
     "label": null,
     "formula": "「非」是「不」的意思， 「非……不可」表示一定得做某件事，沒有其他選擇。 「非」的後面加動詞或動詞短語。",
     "examples": [
      {
       "hz": "……在東賢心中，沒有什麼是非買不可的。",
       "vi": "…trong lòng Đông Hiền, chẳng có thứ gì là nhất định phải mua cả.",
       "py": "…… zài dōng xián xīnzhōng, méiyǒu shénme shì fēimǎibùkě de."
      },
      {
       "hz": "他在衝浪時，牙齒被衝浪板打到了，血流個不停，非去看醫生不可。",
       "vi": "Lúc lướt sóng, răng anh ấy bị ván lướt đập vào, máu chảy không ngừng, nhất định phải đi khám bác sĩ.",
       "py": "Tā zài chōnglàng shí, yáchǐ bèi chōnglàngbǎn dǎ dào le, xuèliú gè bùtíng, fēi qù kàn yīshēng bùkě."
      },
      {
       "hz": "舅舅不小心把明天結婚要穿的衣服弄髒了，非立刻送洗不可。",
       "vi": "Cậu không cẩn thận làm bẩn bộ quần áo định mặc trong đám cưới ngày mai, nhất định phải mang đi giặt ngay.",
       "py": "Jiùjiù bù xiǎoxīn bǎ míngtiān jiéhūn yào chuān de yīfú nòngzāngle, fēi lìkè sòngxǐ bùkě."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "非… 不可 — nhất định phải…",
   "giaiThich": "非 ở đây nghĩa là \"không\"; cả cấu trúc nghĩa \"nhất định phải làm, không còn lựa chọn nào khác\". Sau 非 là động từ hoặc cụm động từ."
  },
  {
   "title": "3. 畢竟",
   "points": [
    {
     "label": null,
     "formula": "「畢竟」後面的句子是經過思考分析後的結論，用來說明事情的關鍵，目的是提醒或說服對方。例如：雖然中文不太好學，不過，那畢竟是我自己的選擇。",
     "examples": [
      {
       "hz": "……沒有什麼是非買不可的。畢竟「快時尚」只是一時的流行……2.你要女兒學鋼琴，又要學跳舞，對她的要求太高了，畢竟她才三歲。",
       "vi": "…chẳng có thứ gì là nhất định phải mua cả. Dù sao “thời trang nhanh” cũng chỉ là mốt nhất thời… Bạn bắt con gái vừa học piano vừa học múa, yêu cầu với cháu cao quá rồi, dù sao cháu mới ba tuổi.",
       "py": "…… méiyǒu shénme shì fēimǎibùkě de. Bìjìng “kuài shíshàng” zhǐshì yìshí de liúxíng…… 2. Nǐ yào nǚ'ér xué gāngqín, yòu yào xué tiàowǔ, duì tā de yāoqiú tài gāo le, bìjìng tā cái sānsuì."
      },
      {
       "hz": "先生：這個星期好忙，週末也得加班，沒辦法陪妳去逛街了。",
       "vi": "Chồng: Tuần này bận quá, cuối tuần cũng phải tăng ca, không đi dạo phố với em được rồi.",
       "py": "Xiānshēng: Zhège xīngqí hǎo máng, zhōumò yě děi jiābān, méi bànfǎ péi nǐ qù guàngjiē le."
      },
      {
       "hz": "太太：你最好別再加班了，畢竟人不是機器，要是忙得沒時間休息一定會生病的。",
       "vi": "Vợ: Tốt nhất anh đừng tăng ca nữa, dù sao con người cũng không phải cái máy, nếu bận đến mức không có thời gian nghỉ thì chắc chắn sẽ ốm.",
       "py": "Tàitai: Nǐ zuìhǎo bié zài jiābān le, bìjìng rén búshì jīqì, yàoshì máng de méi shíjiān xiūxí yídìng huì shēngbìng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "畢竟 — dù sao thì…",
   "giaiThich": "Vế sau 畢竟 là kết luận rút ra sau khi cân nhắc, nêu điểm mấu chốt để nhắc nhở hoặc thuyết phục người nghe."
  }
 ],
 "td3-8.3": [
  {
   "title": "1. S 把 NP1 + V 成 NP2",
   "points": [
    {
     "label": null,
     "formula": "「成」有「成為」 、 「變成」的意思。表示某人經由某個動作，讓NP1成為或變成NP2。如果動詞是「看、聽、說、寫、念」 ，有時有「弄錯了」的意思。",
     "examples": [
      {
       "hz": "……我還是不希望大家把我看成只愛買名牌的人。",
       "vi": "…tôi vẫn không mong mọi người coi tôi là người chỉ thích mua hàng hiệu.",
       "py": "…… wǒ háishì bù xīwàng dàjiā bǎ wǒ kànchéng zhǐ ài mǎi míngpái de rén."
      },
      {
       "hz": "那本有名的英國小說，十年前就有人把它翻成了二十種語言，而且還拍成了電影。",
       "vi": "Quyển tiểu thuyết nổi tiếng của Anh đó, mười năm trước đã có người dịch ra hai mươi thứ tiếng, còn được dựng thành phim nữa.",
       "py": "Nà běn yǒumíng de Yīngguó xiǎoshuō, shínián qián jiù yǒurén bǎ tā fān chéng le èrshízhǒng yǔyán, érqiě hái pāi chéng le diànyǐng."
      },
      {
       "hz": "阿姨把穿不下的舊衣服，修改成非常流行的帽子和袋子。",
       "vi": "Dì sửa những bộ quần áo cũ không mặc vừa nữa thành mũ và túi rất hợp mốt.",
       "py": "Āyí bǎ chuānbúxià de jiùyīfú, xiūgǎi chéng fēicháng liúxíng de màozi hàn dàizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 NP1 + V 成 NP2 — biến A thành B",
   "giaiThich": "成 nghĩa \"trở thành, biến thành\": qua một hành động, ai đó làm NP1 thành NP2. Nếu động từ là 看, 聽, 說, 寫, 念 thì đôi khi mang nghĩa \"nhầm\" (nghe nhầm, nhìn nhầm)."
  },
  {
   "title": "2. 再……也/都……",
   "points": [
    {
     "label": null,
     "formula": "「再......也/都......」使用再假設的情況，有「就算......，也......」的意思。「再」後面的句子是把情況說到最高或最低、最好或最壞的程度，而「也」或「都」後面的結果、決定或是想法不會改變；有時候表示說話的人覺得應該而且值得這樣做。",
     "examples": [
      {
       "hz": "……再英俊、再漂亮的人也應該找到自己的風格。",
       "vi": "…người dù có đẹp trai, xinh đẹp đến đâu cũng nên tìm ra phong cách riêng của mình.",
       "py": "…… zài yīngjùn, zài piàoliàng de rén yě yīnggāi zhǎodào zìjǐ de fēnggé."
      },
      {
       "hz": "孩子需要父母照顧，父母再忙都應該陪陪他們，了解他們的想法。",
       "vi": "Con cái cần bố mẹ chăm sóc, bố mẹ dù bận đến đâu cũng nên dành thời gian ở bên, hiểu suy nghĩ của con.",
       "py": "Háizi xūyào fùmǔ zhàogù, fùmǔ zài máng dōu yīnggāi péipéi tāmen, liǎojiě tāmen de xiǎngfǎ."
      },
      {
       "hz": "為了得到更多經驗，也為了美好的未來，再討厭的工作也得忍耐。",
       "vi": "Để có thêm kinh nghiệm, cũng vì một tương lai tốt đẹp, công việc dù đáng ghét đến đâu cũng phải chịu đựng.",
       "py": "Wèile dédào gèng duō jīngyàn, yě wèile měihǎo de wèilái, zài tǎoyàn de gōngzuò yě děi rěnnài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再… 也/都… — dù có… thì cũng…",
   "giaiThich": "Nêu giả thiết đẩy tình huống tới mức cao nhất hoặc thấp nhất, nhưng kết quả, quyết định sau 也/都 vẫn không đổi. Gần nghĩa 就算……也……"
  },
  {
   "title": "3. V慣",
   "points": [
    {
     "label": null,
     "formula": "「動詞+慣」的「慣」有習慣的意思，是結果補語，表示前面動作的結果。例如：他用慣了筷子，連吃西餐也用筷子。如果「慣」的前面加上「得/不」，表示前面的動作能或不能習慣，例如： 「這個房間很小，你住得慣嗎？」 「我吃不管別人做的菜，每天都自己做」。",
     "examples": [
      {
       "hz": "對我來說，只要穿得慣、穿得自在，把自己當衣服的主人……2.很多部落格都推薦那家餐廳，不過他們的菜鹹了點，我吃不慣。",
       "vi": "Đối với tôi, chỉ cần mặc quen, mặc thoải mái, coi mình là chủ của bộ quần áo… Nhiều blog giới thiệu nhà hàng đó, nhưng món ăn của họ hơi mặn, tôi ăn không quen.",
       "py": "Duì wǒ láishuō, zhǐyào chuān de guàn, chuān de zì zài, bǎ zìjǐ dāng yīfú de zhǔrén…… 2. Hěnduō bùluò gé dōu tuījiàn nà jiā cāntīng, búguò tāmen de cài xián le diǎn, wǒ chī bú guàn."
      },
      {
       "hz": "A：老闆要你去英國出差，還可以順便旅遊，為什麼你不太想去？",
       "vi": "A: Ông chủ cử bạn đi công tác ở Anh, còn tiện thể được du lịch, sao bạn lại không muốn đi lắm?",
       "py": "A: Lǎobǎn yào nǐ qù Yīngguó chūchāi, hái kěyǐ shùnbiàn lǚyóu, wèishénme nǐ bútàixiǎng qù?"
      },
      {
       "hz": "B：我睡慣了家裡的床，旅館的睡不慣。",
       "vi": "B: Tôi quen ngủ giường ở nhà rồi, giường khách sạn ngủ không quen.",
       "py": "B: Wǒ shuì guàn le jiālǐ de chuáng, lǚguǎn de shuì bú guàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 慣 — quen làm gì",
   "giaiThich": "慣 là bổ ngữ kết quả, nghĩa \"đã quen\" (他用慣了筷子). Thêm 得/不 để nói có quen được hay không: 住得慣, 吃不慣."
  },
  {
   "title": "1. 況且",
   "points": [
    {
     "label": null,
     "formula": "「況且」當連詞，表示更進一層的語氣，用來補充說明，讓理由更完整。常和「也、還、又」配合使用。",
     "examples": [
      {
       "hz": "……不再為了趕流行亂買衣服。況且把舊衣服修改一下……。",
       "vi": "…không còn chạy theo mốt mà mua quần áo bừa bãi nữa. Hơn nữa, sửa lại quần áo cũ một chút…",
       "py": "…… búzài wèile gǎn liúxíng luàn mǎi yīfú. Kuàngqiě bǎ jiùyīfú xiūgǎi yíxià……."
      },
      {
       "hz": "爸爸要我將來管理他的公司，可是我沒興趣，況且我還有自己的夢想，所以不想去。",
       "vi": "Bố muốn sau này tôi quản lý công ty của bố, nhưng tôi không có hứng thú, hơn nữa tôi còn có ước mơ riêng, nên không muốn làm.",
       "py": "Bàba yào wǒ jiānglái guǎnlǐ tā de gōngsī, kěshì wǒ méi xìngqù, kuàngqiě wǒ háiyǒu zìjǐ de mèngxiǎng, suǒyǐ bùxiǎng qù."
      },
      {
       "hz": "兒子：我畢業後想當導演，拍出好電影來讓大家欣賞。",
       "vi": "Con trai: Tốt nghiệp xong con muốn làm đạo diễn, làm ra những bộ phim hay cho mọi người thưởng thức.",
       "py": "Érzi: Wǒ bìyè hòu xiǎng dāng dǎoyǎn, pāi chū hǎo diànyǐng lái ràng dàjiā xīnshǎng."
      },
      {
       "hz": "爸爸：你是學電影藝術的，況且也寫過劇本、當過演員，可以嘗試一下。",
       "vi": "Bố: Con học nghệ thuật điện ảnh, hơn nữa cũng đã từng viết kịch bản, làm diễn viên, có thể thử xem.",
       "py": "Bàba: Nǐ shì xué diànyǐng yìshù de, kuàngqiě yě xiě guò jùběn, dāng guò yǎnyuán, kěyǐ chángshì yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "況且 — hơn nữa",
   "giaiThich": "Liên từ, thêm một lý do nữa cho đầy đủ, giọng tăng tiến. Hay đi cùng 也, 還, 又."
  },
  {
   "title": "2. 非……不可",
   "points": [
    {
     "label": null,
     "formula": "「非」是「不」的意思， 「非……不可」表示一定得做某件事，沒有其他選擇。 「非」的後面加動詞或動詞短語。",
     "examples": [
      {
       "hz": "……在東賢心中，沒有什麼是非買不可的。",
       "vi": "…trong lòng Đông Hiền, chẳng có thứ gì là nhất định phải mua cả.",
       "py": "…… zài dōng xián xīnzhōng, méiyǒu shénme shì fēimǎibùkě de."
      },
      {
       "hz": "他在衝浪時，牙齒被衝浪板打到了，血流個不停，非去看醫生不可。",
       "vi": "Lúc lướt sóng, răng anh ấy bị ván lướt đập vào, máu chảy không ngừng, nhất định phải đi khám bác sĩ.",
       "py": "Tā zài chōnglàng shí, yáchǐ bèi chōnglàngbǎn dǎ dào le, xuèliú gè bùtíng, fēi qù kàn yīshēng bùkě."
      },
      {
       "hz": "舅舅不小心把明天結婚要穿的衣服弄髒了，非立刻送洗不可。",
       "vi": "Cậu không cẩn thận làm bẩn bộ quần áo định mặc trong đám cưới ngày mai, nhất định phải mang đi giặt ngay.",
       "py": "Jiùjiù bù xiǎoxīn bǎ míngtiān jiéhūn yào chuān de yīfú nòngzāngle, fēi lìkè sòngxǐ bùkě."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "非… 不可 — nhất định phải…",
   "giaiThich": "非 ở đây nghĩa là \"không\"; cả cấu trúc nghĩa \"nhất định phải làm, không còn lựa chọn nào khác\". Sau 非 là động từ hoặc cụm động từ."
  },
  {
   "title": "3. 畢竟",
   "points": [
    {
     "label": null,
     "formula": "「畢竟」後面的句子是經過思考分析後的結論，用來說明事情的關鍵，目的是提醒或說服對方。例如：雖然中文不太好學，不過，那畢竟是我自己的選擇。",
     "examples": [
      {
       "hz": "……沒有什麼是非買不可的。畢竟「快時尚」只是一時的流行……2.你要女兒學鋼琴，又要學跳舞，對她的要求太高了，畢竟她才三歲。",
       "vi": "…chẳng có thứ gì là nhất định phải mua cả. Dù sao “thời trang nhanh” cũng chỉ là mốt nhất thời… Bạn bắt con gái vừa học piano vừa học múa, yêu cầu với cháu cao quá rồi, dù sao cháu mới ba tuổi.",
       "py": "…… méiyǒu shénme shì fēimǎibùkě de. Bìjìng “kuài shíshàng” zhǐshì yìshí de liúxíng…… 2. Nǐ yào nǚ'ér xué gāngqín, yòu yào xué tiàowǔ, duì tā de yāoqiú tài gāo le, bìjìng tā cái sānsuì."
      },
      {
       "hz": "先生：這個星期好忙，週末也得加班，沒辦法陪妳去逛街了。",
       "vi": "Chồng: Tuần này bận quá, cuối tuần cũng phải tăng ca, không đi dạo phố với em được rồi.",
       "py": "Xiānshēng: Zhège xīngqí hǎo máng, zhōumò yě děi jiābān, méi bànfǎ péi nǐ qù guàngjiē le."
      },
      {
       "hz": "太太：你最好別再加班了，畢竟人不是機器，要是忙得沒時間休息一定會生病的。",
       "vi": "Vợ: Tốt nhất anh đừng tăng ca nữa, dù sao con người cũng không phải cái máy, nếu bận đến mức không có thời gian nghỉ thì chắc chắn sẽ ốm.",
       "py": "Tàitai: Nǐ zuìhǎo bié zài jiābān le, bìjìng rén búshì jīqì, yàoshì máng de méi shíjiān xiūxí yídìng huì shēngbìng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "畢竟 — dù sao thì…",
   "giaiThich": "Vế sau 畢竟 là kết luận rút ra sau khi cân nhắc, nêu điểm mấu chốt để nhắc nhở hoặc thuyết phục người nghe."
  }
 ],
 "td3-8.4": [
  {
   "title": "1. S 把 NP1 + V 成 NP2",
   "points": [
    {
     "label": null,
     "formula": "「成」有「成為」 、 「變成」的意思。表示某人經由某個動作，讓NP1成為或變成NP2。如果動詞是「看、聽、說、寫、念」 ，有時有「弄錯了」的意思。",
     "examples": [
      {
       "hz": "……我還是不希望大家把我看成只愛買名牌的人。",
       "vi": "…tôi vẫn không mong mọi người coi tôi là người chỉ thích mua hàng hiệu.",
       "py": "…… wǒ háishì bù xīwàng dàjiā bǎ wǒ kànchéng zhǐ ài mǎi míngpái de rén."
      },
      {
       "hz": "那本有名的英國小說，十年前就有人把它翻成了二十種語言，而且還拍成了電影。",
       "vi": "Quyển tiểu thuyết nổi tiếng của Anh đó, mười năm trước đã có người dịch ra hai mươi thứ tiếng, còn được dựng thành phim nữa.",
       "py": "Nà běn yǒumíng de Yīngguó xiǎoshuō, shínián qián jiù yǒurén bǎ tā fān chéng le èrshízhǒng yǔyán, érqiě hái pāi chéng le diànyǐng."
      },
      {
       "hz": "阿姨把穿不下的舊衣服，修改成非常流行的帽子和袋子。",
       "vi": "Dì sửa những bộ quần áo cũ không mặc vừa nữa thành mũ và túi rất hợp mốt.",
       "py": "Āyí bǎ chuānbúxià de jiùyīfú, xiūgǎi chéng fēicháng liúxíng de màozi hàn dàizi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 NP1 + V 成 NP2 — biến A thành B",
   "giaiThich": "成 nghĩa \"trở thành, biến thành\": qua một hành động, ai đó làm NP1 thành NP2. Nếu động từ là 看, 聽, 說, 寫, 念 thì đôi khi mang nghĩa \"nhầm\" (nghe nhầm, nhìn nhầm)."
  },
  {
   "title": "2. 再……也/都……",
   "points": [
    {
     "label": null,
     "formula": "「再......也/都......」使用再假設的情況，有「就算......，也......」的意思。「再」後面的句子是把情況說到最高或最低、最好或最壞的程度，而「也」或「都」後面的結果、決定或是想法不會改變；有時候表示說話的人覺得應該而且值得這樣做。",
     "examples": [
      {
       "hz": "……再英俊、再漂亮的人也應該找到自己的風格。",
       "vi": "…người dù có đẹp trai, xinh đẹp đến đâu cũng nên tìm ra phong cách riêng của mình.",
       "py": "…… zài yīngjùn, zài piàoliàng de rén yě yīnggāi zhǎodào zìjǐ de fēnggé."
      },
      {
       "hz": "孩子需要父母照顧，父母再忙都應該陪陪他們，了解他們的想法。",
       "vi": "Con cái cần bố mẹ chăm sóc, bố mẹ dù bận đến đâu cũng nên dành thời gian ở bên, hiểu suy nghĩ của con.",
       "py": "Háizi xūyào fùmǔ zhàogù, fùmǔ zài máng dōu yīnggāi péipéi tāmen, liǎojiě tāmen de xiǎngfǎ."
      },
      {
       "hz": "為了得到更多經驗，也為了美好的未來，再討厭的工作也得忍耐。",
       "vi": "Để có thêm kinh nghiệm, cũng vì một tương lai tốt đẹp, công việc dù đáng ghét đến đâu cũng phải chịu đựng.",
       "py": "Wèile dédào gèng duō jīngyàn, yě wèile měihǎo de wèilái, zài tǎoyàn de gōngzuò yě děi rěnnài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "再… 也/都… — dù có… thì cũng…",
   "giaiThich": "Nêu giả thiết đẩy tình huống tới mức cao nhất hoặc thấp nhất, nhưng kết quả, quyết định sau 也/都 vẫn không đổi. Gần nghĩa 就算……也……"
  },
  {
   "title": "3. V慣",
   "points": [
    {
     "label": null,
     "formula": "「動詞+慣」的「慣」有習慣的意思，是結果補語，表示前面動作的結果。例如：他用慣了筷子，連吃西餐也用筷子。如果「慣」的前面加上「得/不」，表示前面的動作能或不能習慣，例如： 「這個房間很小，你住得慣嗎？」 「我吃不管別人做的菜，每天都自己做」。",
     "examples": [
      {
       "hz": "對我來說，只要穿得慣、穿得自在，把自己當衣服的主人……2.很多部落格都推薦那家餐廳，不過他們的菜鹹了點，我吃不慣。",
       "vi": "Đối với tôi, chỉ cần mặc quen, mặc thoải mái, coi mình là chủ của bộ quần áo… Nhiều blog giới thiệu nhà hàng đó, nhưng món ăn của họ hơi mặn, tôi ăn không quen.",
       "py": "Duì wǒ láishuō, zhǐyào chuān de guàn, chuān de zì zài, bǎ zìjǐ dāng yīfú de zhǔrén…… 2. Hěnduō bùluò gé dōu tuījiàn nà jiā cāntīng, búguò tāmen de cài xián le diǎn, wǒ chī bú guàn."
      },
      {
       "hz": "A：老闆要你去英國出差，還可以順便旅遊，為什麼你不太想去？",
       "vi": "A: Ông chủ cử bạn đi công tác ở Anh, còn tiện thể được du lịch, sao bạn lại không muốn đi lắm?",
       "py": "A: Lǎobǎn yào nǐ qù Yīngguó chūchāi, hái kěyǐ shùnbiàn lǚyóu, wèishénme nǐ bútàixiǎng qù?"
      },
      {
       "hz": "B：我睡慣了家裡的床，旅館的睡不慣。",
       "vi": "B: Tôi quen ngủ giường ở nhà rồi, giường khách sạn ngủ không quen.",
       "py": "B: Wǒ shuì guàn le jiālǐ de chuáng, lǚguǎn de shuì bú guàn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 慣 — quen làm gì",
   "giaiThich": "慣 là bổ ngữ kết quả, nghĩa \"đã quen\" (他用慣了筷子). Thêm 得/不 để nói có quen được hay không: 住得慣, 吃不慣."
  },
  {
   "title": "1. 況且",
   "points": [
    {
     "label": null,
     "formula": "「況且」當連詞，表示更進一層的語氣，用來補充說明，讓理由更完整。常和「也、還、又」配合使用。",
     "examples": [
      {
       "hz": "……不再為了趕流行亂買衣服。況且把舊衣服修改一下……。",
       "vi": "…không còn chạy theo mốt mà mua quần áo bừa bãi nữa. Hơn nữa, sửa lại quần áo cũ một chút…",
       "py": "…… búzài wèile gǎn liúxíng luàn mǎi yīfú. Kuàngqiě bǎ jiùyīfú xiūgǎi yíxià……."
      },
      {
       "hz": "爸爸要我將來管理他的公司，可是我沒興趣，況且我還有自己的夢想，所以不想去。",
       "vi": "Bố muốn sau này tôi quản lý công ty của bố, nhưng tôi không có hứng thú, hơn nữa tôi còn có ước mơ riêng, nên không muốn làm.",
       "py": "Bàba yào wǒ jiānglái guǎnlǐ tā de gōngsī, kěshì wǒ méi xìngqù, kuàngqiě wǒ háiyǒu zìjǐ de mèngxiǎng, suǒyǐ bùxiǎng qù."
      },
      {
       "hz": "兒子：我畢業後想當導演，拍出好電影來讓大家欣賞。",
       "vi": "Con trai: Tốt nghiệp xong con muốn làm đạo diễn, làm ra những bộ phim hay cho mọi người thưởng thức.",
       "py": "Érzi: Wǒ bìyè hòu xiǎng dāng dǎoyǎn, pāi chū hǎo diànyǐng lái ràng dàjiā xīnshǎng."
      },
      {
       "hz": "爸爸：你是學電影藝術的，況且也寫過劇本、當過演員，可以嘗試一下。",
       "vi": "Bố: Con học nghệ thuật điện ảnh, hơn nữa cũng đã từng viết kịch bản, làm diễn viên, có thể thử xem.",
       "py": "Bàba: Nǐ shì xué diànyǐng yìshù de, kuàngqiě yě xiě guò jùběn, dāng guò yǎnyuán, kěyǐ chángshì yíxià."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "況且 — hơn nữa",
   "giaiThich": "Liên từ, thêm một lý do nữa cho đầy đủ, giọng tăng tiến. Hay đi cùng 也, 還, 又."
  },
  {
   "title": "2. 非……不可",
   "points": [
    {
     "label": null,
     "formula": "「非」是「不」的意思， 「非……不可」表示一定得做某件事，沒有其他選擇。 「非」的後面加動詞或動詞短語。",
     "examples": [
      {
       "hz": "……在東賢心中，沒有什麼是非買不可的。",
       "vi": "…trong lòng Đông Hiền, chẳng có thứ gì là nhất định phải mua cả.",
       "py": "…… zài dōng xián xīnzhōng, méiyǒu shénme shì fēimǎibùkě de."
      },
      {
       "hz": "他在衝浪時，牙齒被衝浪板打到了，血流個不停，非去看醫生不可。",
       "vi": "Lúc lướt sóng, răng anh ấy bị ván lướt đập vào, máu chảy không ngừng, nhất định phải đi khám bác sĩ.",
       "py": "Tā zài chōnglàng shí, yáchǐ bèi chōnglàngbǎn dǎ dào le, xuèliú gè bùtíng, fēi qù kàn yīshēng bùkě."
      },
      {
       "hz": "舅舅不小心把明天結婚要穿的衣服弄髒了，非立刻送洗不可。",
       "vi": "Cậu không cẩn thận làm bẩn bộ quần áo định mặc trong đám cưới ngày mai, nhất định phải mang đi giặt ngay.",
       "py": "Jiùjiù bù xiǎoxīn bǎ míngtiān jiéhūn yào chuān de yīfú nòngzāngle, fēi lìkè sòngxǐ bùkě."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "非… 不可 — nhất định phải…",
   "giaiThich": "非 ở đây nghĩa là \"không\"; cả cấu trúc nghĩa \"nhất định phải làm, không còn lựa chọn nào khác\". Sau 非 là động từ hoặc cụm động từ."
  },
  {
   "title": "3. 畢竟",
   "points": [
    {
     "label": null,
     "formula": "「畢竟」後面的句子是經過思考分析後的結論，用來說明事情的關鍵，目的是提醒或說服對方。例如：雖然中文不太好學，不過，那畢竟是我自己的選擇。",
     "examples": [
      {
       "hz": "……沒有什麼是非買不可的。畢竟「快時尚」只是一時的流行……2.你要女兒學鋼琴，又要學跳舞，對她的要求太高了，畢竟她才三歲。",
       "vi": "…chẳng có thứ gì là nhất định phải mua cả. Dù sao “thời trang nhanh” cũng chỉ là mốt nhất thời… Bạn bắt con gái vừa học piano vừa học múa, yêu cầu với cháu cao quá rồi, dù sao cháu mới ba tuổi.",
       "py": "…… méiyǒu shénme shì fēimǎibùkě de. Bìjìng “kuài shíshàng” zhǐshì yìshí de liúxíng…… 2. Nǐ yào nǚ'ér xué gāngqín, yòu yào xué tiàowǔ, duì tā de yāoqiú tài gāo le, bìjìng tā cái sānsuì."
      },
      {
       "hz": "先生：這個星期好忙，週末也得加班，沒辦法陪妳去逛街了。",
       "vi": "Chồng: Tuần này bận quá, cuối tuần cũng phải tăng ca, không đi dạo phố với em được rồi.",
       "py": "Xiānshēng: Zhège xīngqí hǎo máng, zhōumò yě děi jiābān, méi bànfǎ péi nǐ qù guàngjiē le."
      },
      {
       "hz": "太太：你最好別再加班了，畢竟人不是機器，要是忙得沒時間休息一定會生病的。",
       "vi": "Vợ: Tốt nhất anh đừng tăng ca nữa, dù sao con người cũng không phải cái máy, nếu bận đến mức không có thời gian nghỉ thì chắc chắn sẽ ốm.",
       "py": "Tàitai: Nǐ zuìhǎo bié zài jiābān le, bìjìng rén búshì jīqì, yàoshì máng de méi shíjiān xiūxí yídìng huì shēngbìng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "畢竟 — dù sao thì…",
   "giaiThich": "Vế sau 畢竟 là kết luận rút ra sau khi cân nhắc, nêu điểm mấu chốt để nhắc nhở hoặc thuyết phục người nghe."
  }
 ],
 "td3-9.1": [
  {
   "title": "1. V 過來",
   "points": [
    {
     "label": null,
     "formula": "「動詞＋過來」的「過來」是趨向補語，例如：請你把書拿過來。 另外，「過來」還有回到或恢復到原來狀態的意思，大多表示正常的或是較好的狀態。例如：醒過來、改過來、明白過來。相反的，「過去」 是從正常的狀態到另一種不好的狀態，它比「過來」使用得少，例如：暈過去(fainted)、昏過去(fainted)。 「怎麼不⋯⋯呢？」是「為什麼不⋯⋯呢？」的意思，表示說話的人對某種情況提出疑問，句尾常跟著「呢」。「怎麼不」後面是說話的人認為應該要做的事或建議；「反而」是連詞，後面是不應該做的或代表說話者的疑問。",
     "examples": [
      {
       "hz": "……總是睡得不太安心，半夜會突然醒過來。",
       "vi": "…lúc nào cũng ngủ không yên, nửa đêm đột nhiên tỉnh giấc.",
       "py": "…… zǒngshì shuì de bú tài ānxīn, bànyè huì tūrán xǐngguòlái."
      },
      {
       "hz": "被媽媽罵了好幾次以後，弟弟終於把亂丟髒衣服的壞習慣改過來了。",
       "vi": "Sau mấy lần bị mẹ mắng, em trai cuối cùng đã sửa được thói xấu vứt quần áo bẩn bừa bãi.",
       "py": "Bèi māma mà le hǎo jǐcì yǐhòu, dìdi zhōngyú bǎ luàn diū zàng yīfú de huàixíguàn gǎiguòlái le."
      },
      {
       "hz": "早上上班時，發現大家都對著我笑，過了一會兒我才明白過來，原來我穿著睡褲出門。",
       "vi": "Sáng đi làm, thấy mọi người cứ nhìn tôi cười, một lúc sau tôi mới hiểu ra, hoá ra tôi mặc quần ngủ ra đường.",
       "py": "Zǎoshàng shàngbān shí, fāxiàn dàjiā dōu duì zhe wǒ xiào, guò le yíhuì'er wǒ cái míngbái guòlái, yuánlái wǒ chuānzhe shuìkù chūmén."
      },
      {
       "hz": "怎麼不/不但不⋯⋯，反而⋯⋯",
       "vi": "sao không… / không những không…, ngược lại…",
       "py": "Zěnme bú / búdàn bù……, fǎn'ér……"
      },
      {
       "hz": "（一）怎麼不……，反而……呢？",
       "vi": "(1) Sao không…, ngược lại lại…?",
       "py": "(yī) zěnme bù……, fǎn'ér…… ne?"
      },
      {
       "hz": "快考試了，怎麼不在家念書，反而想出去玩？",
       "vi": "Sắp thi rồi, sao không ở nhà học bài mà lại muốn ra ngoài chơi?",
       "py": "Kuài kǎoshì le, zěnme bú zàijiā niànshū, fǎn'ér xiǎng chūqùwán?"
      },
      {
       "hz": "你聽不懂老師上課說的，怎麼不舉手請教老師，反而玩起手機來了？",
       "vi": "Bạn không hiểu thầy giáo giảng, sao không giơ tay hỏi thầy mà lại chơi điện thoại?",
       "py": "Nǐ tīngbùdǒng lǎoshīshàngkè shuō de, zěnme bù jǔshǒu qǐngjiào lǎoshī, fǎn'ér wán qǐ shǒujī lái le?"
      },
      {
       "hz": "爸爸：孩子每次把衣服脫了就亂丟，每次都得幫他整理。",
       "vi": "Bố: Lần nào con cũng cởi quần áo ra là vứt bừa bãi, lần nào cũng phải dọn giúp nó.",
       "py": "Bàba: Háizi měicì bǎ yīfú tuō le jiù luàn diū, měicì dōu děi bāng tā zhěnglǐ."
      },
      {
       "hz": "媽媽：你怎麼不跟他說，反而老是幫他整理呢？",
       "vi": "Mẹ: Sao anh không nói với con mà cứ dọn giúp nó mãi thế?",
       "py": "Māma: Nǐ zěnme bù gēn tā shuō, fǎn'ér lǎo shì bāng tā zhěnglǐ ne?"
      },
      {
       "hz": "（二）不但不……，反而……「不但不」、「不但沒」後面接的是與說話的人預料相反的情況；「反而」的後面是出乎預料的情況或說話的人認為不應該發生的。有時候「不但」、可以省略，例如：颱風快來了，他(不但)沒留在家裡，反而去衝浪，真是太危險了。",
       "vi": "(2) Không những không…, ngược lại… Sau “不但不”, “不但沒” là tình huống trái với dự đoán của người nói; sau “反而” là tình huống ngoài dự đoán hoặc người nói cho rằng không nên xảy ra. Đôi khi có thể lược bỏ “不但”, ví dụ: Bão sắp đến rồi, anh ấy không những không ở nhà mà còn đi lướt sóng, thật quá nguy hiểm.",
       "py": "(èr) búdàn bù……, fǎn'ér…… “búdàn bú”, “búdàn méi” hòumiàn jiē de shì yǔ shuōhuà de rén yùliào xiāngfǎn de qíngkuàng; “fǎn'ér” de hòumiàn shì chūhūyùliào de qíngkuàng huò shuōhuà de rén rènwéi bù yīnggāi fāshēng de. Yǒushíhòu “búdàn”, kěyǐ shěnglüè, lìrú: Táifēng kuài lái le, tā (búdàn) méi liúzài jiālǐ, fǎn'ér qù chōnglàng, zhēnshìtài wéixiǎn le."
      },
      {
       "hz": "我有一個高中同學沒考上大學，他父母不但沒生氣，反而讓他去義大利遊學。",
       "vi": "Tôi có một bạn học cấp ba thi trượt đại học, bố mẹ bạn ấy không những không tức giận mà còn cho bạn ấy sang Ý du học ngắn hạn.",
       "py": "Wǒ yǒu yígè gāozhōngtóngxué méikǎoshàng dàxué, tā fùmǔ búdàn méishēngqì, fǎn'ér ràng tā qù yìdàlì yóuxué."
      },
      {
       "hz": "我們公司不但沒給男女員工同樣的工作機會，反而對女員工有許多不合理的要求。",
       "vi": "Công ty chúng tôi không những không cho nhân viên nam nữ cơ hội làm việc như nhau mà còn có nhiều yêu cầu vô lý với nhân viên nữ.",
       "py": "Wǒmen gōngsī búdàn méi gěi nánnǚ yuángōng tóngyàng de gōngzuò jīhuì, fǎn'ér duì nǚ yuángōng yǒu xǔduō bùhélǐ de yāoqiú."
      },
      {
       "hz": "小金最近胖了很多，體力也變差了，可是他不但不運動，反而天天約朋友去吃大餐。",
       "vi": "Dạo này Tiểu Kim béo lên nhiều, thể lực cũng kém đi, nhưng cậu ấy không những không tập thể dục mà ngày nào cũng hẹn bạn đi ăn tiệc.",
       "py": "Xiǎojīn zuìjìn pàng le hěnduō, tǐlì yě biànchà le, kěshì tā búdàn bú yùndòng, fǎn'ér tiāntiān yuē péngyǒu qù chī dàcān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 過來 — lại đây, trở lại bình thường",
   "giaiThich": "過來 là bổ ngữ xu hướng (拿過來 — mang lại đây). Ngoài ra còn nghĩa hồi phục về trạng thái bình thường: 醒過來, 明白過來. Ngược lại 過去 là chuyển sang trạng thái xấu: 暈過去, 昏過去."
  },
  {
   "title": "3. 才",
   "points": [
    {
     "label": null,
     "formula": "這一課的「才」是強調「才」後面所說的話，常用在反駁的時候，句尾常跟「呢」一起使用，例如：「你說那家餐廳的菜好吃，可是我覺得你煮的才好吃呢！」、「小明說我借了他的書，我才沒借呢！」",
     "examples": [
      {
       "hz": "尚恩：可是，生命中有很多事情比考試還要重要啊！……家豪：我爸媽才不這麼想。 ……2. A：博物館不遠，我們走路去吧？",
       "vi": "Sean: Nhưng trong cuộc sống có nhiều chuyện còn quan trọng hơn thi cử mà! … Gia Hào: Bố mẹ tôi mới không nghĩ vậy đâu. … A: Bảo tàng không xa, chúng ta đi bộ đi?",
       "py": "Shàng'ēn: Kěshì, shēngmìng zhōng yǒu hěnduō shìqíng bǐ kǎoshì háiyào zhòngyào a!…… jiā háo: Wǒ bàmā cái bú zhème xiǎng.…… 2. A: Bówùguǎn bùyuǎn, wǒmen zǒulù qù ba?"
      },
      {
       "hz": "B：我才不要呢！搭公車比較快。",
       "vi": "B: Tôi mới không thèm đi bộ! Đi xe buýt nhanh hơn.",
       "py": "B: Wǒ cái búyào ne! Dāgōngchē bǐjiào kuài."
      },
      {
       "hz": "A：王導演拍的那部戲非常好，今年的最佳導演一定是他。",
       "vi": "A: Bộ phim đạo diễn Vương làm rất hay, đạo diễn xuất sắc nhất năm nay chắc chắn là ông ấy.",
       "py": "A: Wáng dǎoyǎn pāi de nà bù xì fēicháng hǎo, jīnnián de zuìjiā dǎoyǎn yídìng shì tā."
      },
      {
       "hz": "B：不一定吧，我認為李導演拍的才好呢！",
       "vi": "B: Chưa chắc đâu, tôi thấy phim của đạo diễn Lý mới hay chứ!",
       "py": "B: Bù yídìng ba, wǒ rènwéi Lǐ dǎoyǎn pāi de cái hǎo ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mới đúng là (phản bác)",
   "giaiThich": "Ở bài này 才 nhấn mạnh điều nói SAU nó, thường dùng khi phản bác, cuối câu hay có 呢 (我覺得你煮的才好吃呢！)."
  },
  {
   "title": "1. 尤其是",
   "points": [
    {
     "label": null,
     "formula": "「尤其」是副詞，有「特別」的意思，表示和其他事物比起來更特別。一般放在後面的句子。「尤其」＋「是」有強調的意思。 2. 這個學期我選了五門課，每門課都很有意思，尤其是英文會話課，不僅教授的教法活潑，說話也很幽默。",
     "examples": [
      {
       "hz": "台灣社會一直都很重視學生的學習表現，尤其是考試的成績。",
       "vi": "Xã hội Đài Loan luôn rất coi trọng kết quả học tập của học sinh, nhất là điểm thi.",
       "py": "Táiwān shèhuì yìzhí dōu hěn zhòngshì xuéshēng de xuéxí biǎoxiàn, yóuqí shì kǎoshì de chéngjì."
      },
      {
       "hz": "每種工作都有它的困難或問題，尤其是當警察的，經常會碰到麻煩或危險的事情。",
       "vi": "Công việc nào cũng có khó khăn hay vấn đề của nó, nhất là làm cảnh sát, thường xuyên gặp phải chuyện phiền phức hoặc nguy hiểm.",
       "py": "Měizhǒng gōngzuò dōu yǒu tā de kùnnán huò wèntí, yóuqí shì dāng jǐngchá de, jīngcháng huì pèngdào máfán huò wéixiǎn de shìqíng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "尤其是 — nhất là",
   "giaiThich": "尤其 là phó từ, nghĩa \"đặc biệt\", so với những cái khác thì nổi bật hơn. Thường đặt ở vế sau; thêm 是 để nhấn mạnh."
  },
  {
   "title": "2. V得著",
   "points": [
    {
     "label": null,
     "formula": "表示做某個動作，但達不到某種目的或結果。「著(zháo)」前面的動詞具有一定的目標性，動作有「接觸或達到」的意思，常用的有「拿、看、打、猜、用、找」等。 「著」在此語法作為結構補語，說明前面動詞的結果。例如：鑰匙找著了/沒找著。",
     "examples": [
      {
       "hz": "……把重點寫在便條上，以為孩子複習時用得著，這樣考試的成績就會更好。",
       "vi": "…ghi những ý chính lên giấy nhớ, tưởng con ôn bài sẽ dùng đến, như vậy điểm thi sẽ cao hơn.",
       "py": "…… bǎ zhòngdiǎn xiě zài biàntiáo shàng, yǐwéi háizi fùxí shí yòng de zhe, zhèyàng kǎoshì de chéngjì jiù huì gènghǎo."
      },
      {
       "hz": "那個專櫃裡放著好多漂亮的名牌皮包，可惜我沒錢買，看得著、摸不著。",
       "vi": "Trong quầy hàng đó bày rất nhiều túi xách hàng hiệu đẹp, tiếc là tôi không có tiền mua, chỉ nhìn được mà không sờ được.",
       "py": "Nàge zhuānguì lǐ fàng zhe hǎoduō piàoliàng de míngpái píbāo, kěxī wǒ méiqiánmǎi, kàn de zhe, mō bù zhe."
      },
      {
       "hz": "A：游小姐的男朋友看起來很年輕，你猜他幾歲？",
       "vi": "A: Bạn trai cô Du trông rất trẻ, bạn đoán anh ấy bao nhiêu tuổi?",
       "py": "A: Yóu xiǎojiě de nánpéngyǒu kànqǐlái hěn niánqīng, nǐ cāi tā jǐsuì?"
      },
      {
       "hz": "B：我跟他不熟，哪裡猜得著。",
       "vi": "B: Tôi không thân với anh ấy, đoán sao được.",
       "py": "B: Wǒ gēn tā bù shú, nǎlǐ cāi de zhe."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得著 / V 不著 — có đạt được hay không",
   "giaiThich": "Nói hành động có chạm tới, đạt tới mục tiêu hay không. Động từ thường dùng: 拿, 看, 打, 猜, 用, 找 (鑰匙找著了 / 沒找著)."
  },
  {
   "title": "3. 以……代替……",
   "points": [
    {
     "label": null,
     "formula": "「以」有「用」的意思，「以……代替……」意思是用某種東西或某個行動來替換原本的東西或行動。",
     "examples": [
      {
       "hz": "因此，有意義的學習是讓孩子以思考代替記答案……2. 媽媽很重視家人的健康，常以蔬菜水果做成的點心代替一般的甜點。",
       "vi": "Vì vậy, học tập có ý nghĩa là giúp trẻ lấy việc tư duy thay cho việc học thuộc đáp án… Mẹ rất coi trọng sức khoẻ của gia đình, thường dùng món điểm tâm làm từ rau củ và trái cây thay cho đồ ngọt thông thường.",
       "py": "Yīncǐ, yǒu yìyì de xuéxí shì ràng háizi yǐ sīkǎo dàitì jì dá'àn…… 2. Māma hěn zhòngshì jiārén de jiànkāng, cháng yǐ shūcàishuǐguǒ zuòchéng de diǎnxīn dàitì yìbān de tiándiǎn."
      },
      {
       "hz": "如果大家都能以搭公車、騎自行車代替開車，這樣空氣就不會那麼髒了。",
       "vi": "Nếu mọi người đều đi xe buýt, đạp xe thay cho lái ô tô thì không khí sẽ không ô nhiễm như vậy.",
       "py": "Rúguǒ dàjiā dōu néng yǐ dāgōngchē, qí zìxíngchē dàitì kāichē, zhèyàng kōngqì jiù búhuì nàme zàng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以… 代替… — dùng… thay cho…",
   "giaiThich": "以 nghĩa \"dùng\"; cả cấu trúc nghĩa lấy cái này thay cho cái kia."
  }
 ],
 "td3-9.2": [
  {
   "title": "1. V 過來",
   "points": [
    {
     "label": null,
     "formula": "「動詞＋過來」的「過來」是趨向補語，例如：請你把書拿過來。 另外，「過來」還有回到或恢復到原來狀態的意思，大多表示正常的或是較好的狀態。例如：醒過來、改過來、明白過來。相反的，「過去」 是從正常的狀態到另一種不好的狀態，它比「過來」使用得少，例如：暈過去(fainted)、昏過去(fainted)。 「怎麼不⋯⋯呢？」是「為什麼不⋯⋯呢？」的意思，表示說話的人對某種情況提出疑問，句尾常跟著「呢」。「怎麼不」後面是說話的人認為應該要做的事或建議；「反而」是連詞，後面是不應該做的或代表說話者的疑問。",
     "examples": [
      {
       "hz": "……總是睡得不太安心，半夜會突然醒過來。",
       "vi": "…lúc nào cũng ngủ không yên, nửa đêm đột nhiên tỉnh giấc.",
       "py": "…… zǒngshì shuì de bú tài ānxīn, bànyè huì tūrán xǐngguòlái."
      },
      {
       "hz": "被媽媽罵了好幾次以後，弟弟終於把亂丟髒衣服的壞習慣改過來了。",
       "vi": "Sau mấy lần bị mẹ mắng, em trai cuối cùng đã sửa được thói xấu vứt quần áo bẩn bừa bãi.",
       "py": "Bèi māma mà le hǎo jǐcì yǐhòu, dìdi zhōngyú bǎ luàn diū zàng yīfú de huàixíguàn gǎiguòlái le."
      },
      {
       "hz": "早上上班時，發現大家都對著我笑，過了一會兒我才明白過來，原來我穿著睡褲出門。",
       "vi": "Sáng đi làm, thấy mọi người cứ nhìn tôi cười, một lúc sau tôi mới hiểu ra, hoá ra tôi mặc quần ngủ ra đường.",
       "py": "Zǎoshàng shàngbān shí, fāxiàn dàjiā dōu duì zhe wǒ xiào, guò le yíhuì'er wǒ cái míngbái guòlái, yuánlái wǒ chuānzhe shuìkù chūmén."
      },
      {
       "hz": "怎麼不/不但不⋯⋯，反而⋯⋯",
       "vi": "sao không… / không những không…, ngược lại…",
       "py": "Zěnme bú / búdàn bù……, fǎn'ér……"
      },
      {
       "hz": "（一）怎麼不……，反而……呢？",
       "vi": "(1) Sao không…, ngược lại lại…?",
       "py": "(yī) zěnme bù……, fǎn'ér…… ne?"
      },
      {
       "hz": "快考試了，怎麼不在家念書，反而想出去玩？",
       "vi": "Sắp thi rồi, sao không ở nhà học bài mà lại muốn ra ngoài chơi?",
       "py": "Kuài kǎoshì le, zěnme bú zàijiā niànshū, fǎn'ér xiǎng chūqùwán?"
      },
      {
       "hz": "你聽不懂老師上課說的，怎麼不舉手請教老師，反而玩起手機來了？",
       "vi": "Bạn không hiểu thầy giáo giảng, sao không giơ tay hỏi thầy mà lại chơi điện thoại?",
       "py": "Nǐ tīngbùdǒng lǎoshīshàngkè shuō de, zěnme bù jǔshǒu qǐngjiào lǎoshī, fǎn'ér wán qǐ shǒujī lái le?"
      },
      {
       "hz": "爸爸：孩子每次把衣服脫了就亂丟，每次都得幫他整理。",
       "vi": "Bố: Lần nào con cũng cởi quần áo ra là vứt bừa bãi, lần nào cũng phải dọn giúp nó.",
       "py": "Bàba: Háizi měicì bǎ yīfú tuō le jiù luàn diū, měicì dōu děi bāng tā zhěnglǐ."
      },
      {
       "hz": "媽媽：你怎麼不跟他說，反而老是幫他整理呢？",
       "vi": "Mẹ: Sao anh không nói với con mà cứ dọn giúp nó mãi thế?",
       "py": "Māma: Nǐ zěnme bù gēn tā shuō, fǎn'ér lǎo shì bāng tā zhěnglǐ ne?"
      },
      {
       "hz": "（二）不但不……，反而……「不但不」、「不但沒」後面接的是與說話的人預料相反的情況；「反而」的後面是出乎預料的情況或說話的人認為不應該發生的。有時候「不但」、可以省略，例如：颱風快來了，他(不但)沒留在家裡，反而去衝浪，真是太危險了。",
       "vi": "(2) Không những không…, ngược lại… Sau “不但不”, “不但沒” là tình huống trái với dự đoán của người nói; sau “反而” là tình huống ngoài dự đoán hoặc người nói cho rằng không nên xảy ra. Đôi khi có thể lược bỏ “不但”, ví dụ: Bão sắp đến rồi, anh ấy không những không ở nhà mà còn đi lướt sóng, thật quá nguy hiểm.",
       "py": "(èr) búdàn bù……, fǎn'ér…… “búdàn bú”, “búdàn méi” hòumiàn jiē de shì yǔ shuōhuà de rén yùliào xiāngfǎn de qíngkuàng; “fǎn'ér” de hòumiàn shì chūhūyùliào de qíngkuàng huò shuōhuà de rén rènwéi bù yīnggāi fāshēng de. Yǒushíhòu “búdàn”, kěyǐ shěnglüè, lìrú: Táifēng kuài lái le, tā (búdàn) méi liúzài jiālǐ, fǎn'ér qù chōnglàng, zhēnshìtài wéixiǎn le."
      },
      {
       "hz": "我有一個高中同學沒考上大學，他父母不但沒生氣，反而讓他去義大利遊學。",
       "vi": "Tôi có một bạn học cấp ba thi trượt đại học, bố mẹ bạn ấy không những không tức giận mà còn cho bạn ấy sang Ý du học ngắn hạn.",
       "py": "Wǒ yǒu yígè gāozhōngtóngxué méikǎoshàng dàxué, tā fùmǔ búdàn méishēngqì, fǎn'ér ràng tā qù yìdàlì yóuxué."
      },
      {
       "hz": "我們公司不但沒給男女員工同樣的工作機會，反而對女員工有許多不合理的要求。",
       "vi": "Công ty chúng tôi không những không cho nhân viên nam nữ cơ hội làm việc như nhau mà còn có nhiều yêu cầu vô lý với nhân viên nữ.",
       "py": "Wǒmen gōngsī búdàn méi gěi nánnǚ yuángōng tóngyàng de gōngzuò jīhuì, fǎn'ér duì nǚ yuángōng yǒu xǔduō bùhélǐ de yāoqiú."
      },
      {
       "hz": "小金最近胖了很多，體力也變差了，可是他不但不運動，反而天天約朋友去吃大餐。",
       "vi": "Dạo này Tiểu Kim béo lên nhiều, thể lực cũng kém đi, nhưng cậu ấy không những không tập thể dục mà ngày nào cũng hẹn bạn đi ăn tiệc.",
       "py": "Xiǎojīn zuìjìn pàng le hěnduō, tǐlì yě biànchà le, kěshì tā búdàn bú yùndòng, fǎn'ér tiāntiān yuē péngyǒu qù chī dàcān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 過來 — lại đây, trở lại bình thường",
   "giaiThich": "過來 là bổ ngữ xu hướng (拿過來 — mang lại đây). Ngoài ra còn nghĩa hồi phục về trạng thái bình thường: 醒過來, 明白過來. Ngược lại 過去 là chuyển sang trạng thái xấu: 暈過去, 昏過去."
  },
  {
   "title": "3. 才",
   "points": [
    {
     "label": null,
     "formula": "這一課的「才」是強調「才」後面所說的話，常用在反駁的時候，句尾常跟「呢」一起使用，例如：「你說那家餐廳的菜好吃，可是我覺得你煮的才好吃呢！」、「小明說我借了他的書，我才沒借呢！」",
     "examples": [
      {
       "hz": "尚恩：可是，生命中有很多事情比考試還要重要啊！……家豪：我爸媽才不這麼想。 ……2. A：博物館不遠，我們走路去吧？",
       "vi": "Sean: Nhưng trong cuộc sống có nhiều chuyện còn quan trọng hơn thi cử mà! … Gia Hào: Bố mẹ tôi mới không nghĩ vậy đâu. … A: Bảo tàng không xa, chúng ta đi bộ đi?",
       "py": "Shàng'ēn: Kěshì, shēngmìng zhōng yǒu hěnduō shìqíng bǐ kǎoshì háiyào zhòngyào a!…… jiā háo: Wǒ bàmā cái bú zhème xiǎng.…… 2. A: Bówùguǎn bùyuǎn, wǒmen zǒulù qù ba?"
      },
      {
       "hz": "B：我才不要呢！搭公車比較快。",
       "vi": "B: Tôi mới không thèm đi bộ! Đi xe buýt nhanh hơn.",
       "py": "B: Wǒ cái búyào ne! Dāgōngchē bǐjiào kuài."
      },
      {
       "hz": "A：王導演拍的那部戲非常好，今年的最佳導演一定是他。",
       "vi": "A: Bộ phim đạo diễn Vương làm rất hay, đạo diễn xuất sắc nhất năm nay chắc chắn là ông ấy.",
       "py": "A: Wáng dǎoyǎn pāi de nà bù xì fēicháng hǎo, jīnnián de zuìjiā dǎoyǎn yídìng shì tā."
      },
      {
       "hz": "B：不一定吧，我認為李導演拍的才好呢！",
       "vi": "B: Chưa chắc đâu, tôi thấy phim của đạo diễn Lý mới hay chứ!",
       "py": "B: Bù yídìng ba, wǒ rènwéi Lǐ dǎoyǎn pāi de cái hǎo ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mới đúng là (phản bác)",
   "giaiThich": "Ở bài này 才 nhấn mạnh điều nói SAU nó, thường dùng khi phản bác, cuối câu hay có 呢 (我覺得你煮的才好吃呢！)."
  },
  {
   "title": "1. 尤其是",
   "points": [
    {
     "label": null,
     "formula": "「尤其」是副詞，有「特別」的意思，表示和其他事物比起來更特別。一般放在後面的句子。「尤其」＋「是」有強調的意思。 2. 這個學期我選了五門課，每門課都很有意思，尤其是英文會話課，不僅教授的教法活潑，說話也很幽默。",
     "examples": [
      {
       "hz": "台灣社會一直都很重視學生的學習表現，尤其是考試的成績。",
       "vi": "Xã hội Đài Loan luôn rất coi trọng kết quả học tập của học sinh, nhất là điểm thi.",
       "py": "Táiwān shèhuì yìzhí dōu hěn zhòngshì xuéshēng de xuéxí biǎoxiàn, yóuqí shì kǎoshì de chéngjì."
      },
      {
       "hz": "每種工作都有它的困難或問題，尤其是當警察的，經常會碰到麻煩或危險的事情。",
       "vi": "Công việc nào cũng có khó khăn hay vấn đề của nó, nhất là làm cảnh sát, thường xuyên gặp phải chuyện phiền phức hoặc nguy hiểm.",
       "py": "Měizhǒng gōngzuò dōu yǒu tā de kùnnán huò wèntí, yóuqí shì dāng jǐngchá de, jīngcháng huì pèngdào máfán huò wéixiǎn de shìqíng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "尤其是 — nhất là",
   "giaiThich": "尤其 là phó từ, nghĩa \"đặc biệt\", so với những cái khác thì nổi bật hơn. Thường đặt ở vế sau; thêm 是 để nhấn mạnh."
  },
  {
   "title": "2. V得著",
   "points": [
    {
     "label": null,
     "formula": "表示做某個動作，但達不到某種目的或結果。「著(zháo)」前面的動詞具有一定的目標性，動作有「接觸或達到」的意思，常用的有「拿、看、打、猜、用、找」等。 「著」在此語法作為結構補語，說明前面動詞的結果。例如：鑰匙找著了/沒找著。",
     "examples": [
      {
       "hz": "……把重點寫在便條上，以為孩子複習時用得著，這樣考試的成績就會更好。",
       "vi": "…ghi những ý chính lên giấy nhớ, tưởng con ôn bài sẽ dùng đến, như vậy điểm thi sẽ cao hơn.",
       "py": "…… bǎ zhòngdiǎn xiě zài biàntiáo shàng, yǐwéi háizi fùxí shí yòng de zhe, zhèyàng kǎoshì de chéngjì jiù huì gènghǎo."
      },
      {
       "hz": "那個專櫃裡放著好多漂亮的名牌皮包，可惜我沒錢買，看得著、摸不著。",
       "vi": "Trong quầy hàng đó bày rất nhiều túi xách hàng hiệu đẹp, tiếc là tôi không có tiền mua, chỉ nhìn được mà không sờ được.",
       "py": "Nàge zhuānguì lǐ fàng zhe hǎoduō piàoliàng de míngpái píbāo, kěxī wǒ méiqiánmǎi, kàn de zhe, mō bù zhe."
      },
      {
       "hz": "A：游小姐的男朋友看起來很年輕，你猜他幾歲？",
       "vi": "A: Bạn trai cô Du trông rất trẻ, bạn đoán anh ấy bao nhiêu tuổi?",
       "py": "A: Yóu xiǎojiě de nánpéngyǒu kànqǐlái hěn niánqīng, nǐ cāi tā jǐsuì?"
      },
      {
       "hz": "B：我跟他不熟，哪裡猜得著。",
       "vi": "B: Tôi không thân với anh ấy, đoán sao được.",
       "py": "B: Wǒ gēn tā bù shú, nǎlǐ cāi de zhe."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得著 / V 不著 — có đạt được hay không",
   "giaiThich": "Nói hành động có chạm tới, đạt tới mục tiêu hay không. Động từ thường dùng: 拿, 看, 打, 猜, 用, 找 (鑰匙找著了 / 沒找著)."
  },
  {
   "title": "3. 以……代替……",
   "points": [
    {
     "label": null,
     "formula": "「以」有「用」的意思，「以……代替……」意思是用某種東西或某個行動來替換原本的東西或行動。",
     "examples": [
      {
       "hz": "因此，有意義的學習是讓孩子以思考代替記答案……2. 媽媽很重視家人的健康，常以蔬菜水果做成的點心代替一般的甜點。",
       "vi": "Vì vậy, học tập có ý nghĩa là giúp trẻ lấy việc tư duy thay cho việc học thuộc đáp án… Mẹ rất coi trọng sức khoẻ của gia đình, thường dùng món điểm tâm làm từ rau củ và trái cây thay cho đồ ngọt thông thường.",
       "py": "Yīncǐ, yǒu yìyì de xuéxí shì ràng háizi yǐ sīkǎo dàitì jì dá'àn…… 2. Māma hěn zhòngshì jiārén de jiànkāng, cháng yǐ shūcàishuǐguǒ zuòchéng de diǎnxīn dàitì yìbān de tiándiǎn."
      },
      {
       "hz": "如果大家都能以搭公車、騎自行車代替開車，這樣空氣就不會那麼髒了。",
       "vi": "Nếu mọi người đều đi xe buýt, đạp xe thay cho lái ô tô thì không khí sẽ không ô nhiễm như vậy.",
       "py": "Rúguǒ dàjiā dōu néng yǐ dāgōngchē, qí zìxíngchē dàitì kāichē, zhèyàng kōngqì jiù búhuì nàme zàng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以… 代替… — dùng… thay cho…",
   "giaiThich": "以 nghĩa \"dùng\"; cả cấu trúc nghĩa lấy cái này thay cho cái kia."
  }
 ],
 "td3-9.3": [
  {
   "title": "1. V 過來",
   "points": [
    {
     "label": null,
     "formula": "「動詞＋過來」的「過來」是趨向補語，例如：請你把書拿過來。 另外，「過來」還有回到或恢復到原來狀態的意思，大多表示正常的或是較好的狀態。例如：醒過來、改過來、明白過來。相反的，「過去」 是從正常的狀態到另一種不好的狀態，它比「過來」使用得少，例如：暈過去(fainted)、昏過去(fainted)。 「怎麼不⋯⋯呢？」是「為什麼不⋯⋯呢？」的意思，表示說話的人對某種情況提出疑問，句尾常跟著「呢」。「怎麼不」後面是說話的人認為應該要做的事或建議；「反而」是連詞，後面是不應該做的或代表說話者的疑問。",
     "examples": [
      {
       "hz": "……總是睡得不太安心，半夜會突然醒過來。",
       "vi": "…lúc nào cũng ngủ không yên, nửa đêm đột nhiên tỉnh giấc.",
       "py": "…… zǒngshì shuì de bú tài ānxīn, bànyè huì tūrán xǐngguòlái."
      },
      {
       "hz": "被媽媽罵了好幾次以後，弟弟終於把亂丟髒衣服的壞習慣改過來了。",
       "vi": "Sau mấy lần bị mẹ mắng, em trai cuối cùng đã sửa được thói xấu vứt quần áo bẩn bừa bãi.",
       "py": "Bèi māma mà le hǎo jǐcì yǐhòu, dìdi zhōngyú bǎ luàn diū zàng yīfú de huàixíguàn gǎiguòlái le."
      },
      {
       "hz": "早上上班時，發現大家都對著我笑，過了一會兒我才明白過來，原來我穿著睡褲出門。",
       "vi": "Sáng đi làm, thấy mọi người cứ nhìn tôi cười, một lúc sau tôi mới hiểu ra, hoá ra tôi mặc quần ngủ ra đường.",
       "py": "Zǎoshàng shàngbān shí, fāxiàn dàjiā dōu duì zhe wǒ xiào, guò le yíhuì'er wǒ cái míngbái guòlái, yuánlái wǒ chuānzhe shuìkù chūmén."
      },
      {
       "hz": "怎麼不/不但不⋯⋯，反而⋯⋯",
       "vi": "sao không… / không những không…, ngược lại…",
       "py": "Zěnme bú / búdàn bù……, fǎn'ér……"
      },
      {
       "hz": "（一）怎麼不……，反而……呢？",
       "vi": "(1) Sao không…, ngược lại lại…?",
       "py": "(yī) zěnme bù……, fǎn'ér…… ne?"
      },
      {
       "hz": "快考試了，怎麼不在家念書，反而想出去玩？",
       "vi": "Sắp thi rồi, sao không ở nhà học bài mà lại muốn ra ngoài chơi?",
       "py": "Kuài kǎoshì le, zěnme bú zàijiā niànshū, fǎn'ér xiǎng chūqùwán?"
      },
      {
       "hz": "你聽不懂老師上課說的，怎麼不舉手請教老師，反而玩起手機來了？",
       "vi": "Bạn không hiểu thầy giáo giảng, sao không giơ tay hỏi thầy mà lại chơi điện thoại?",
       "py": "Nǐ tīngbùdǒng lǎoshīshàngkè shuō de, zěnme bù jǔshǒu qǐngjiào lǎoshī, fǎn'ér wán qǐ shǒujī lái le?"
      },
      {
       "hz": "爸爸：孩子每次把衣服脫了就亂丟，每次都得幫他整理。",
       "vi": "Bố: Lần nào con cũng cởi quần áo ra là vứt bừa bãi, lần nào cũng phải dọn giúp nó.",
       "py": "Bàba: Háizi měicì bǎ yīfú tuō le jiù luàn diū, měicì dōu děi bāng tā zhěnglǐ."
      },
      {
       "hz": "媽媽：你怎麼不跟他說，反而老是幫他整理呢？",
       "vi": "Mẹ: Sao anh không nói với con mà cứ dọn giúp nó mãi thế?",
       "py": "Māma: Nǐ zěnme bù gēn tā shuō, fǎn'ér lǎo shì bāng tā zhěnglǐ ne?"
      },
      {
       "hz": "（二）不但不……，反而……「不但不」、「不但沒」後面接的是與說話的人預料相反的情況；「反而」的後面是出乎預料的情況或說話的人認為不應該發生的。有時候「不但」、可以省略，例如：颱風快來了，他(不但)沒留在家裡，反而去衝浪，真是太危險了。",
       "vi": "(2) Không những không…, ngược lại… Sau “不但不”, “不但沒” là tình huống trái với dự đoán của người nói; sau “反而” là tình huống ngoài dự đoán hoặc người nói cho rằng không nên xảy ra. Đôi khi có thể lược bỏ “不但”, ví dụ: Bão sắp đến rồi, anh ấy không những không ở nhà mà còn đi lướt sóng, thật quá nguy hiểm.",
       "py": "(èr) búdàn bù……, fǎn'ér…… “búdàn bú”, “búdàn méi” hòumiàn jiē de shì yǔ shuōhuà de rén yùliào xiāngfǎn de qíngkuàng; “fǎn'ér” de hòumiàn shì chūhūyùliào de qíngkuàng huò shuōhuà de rén rènwéi bù yīnggāi fāshēng de. Yǒushíhòu “búdàn”, kěyǐ shěnglüè, lìrú: Táifēng kuài lái le, tā (búdàn) méi liúzài jiālǐ, fǎn'ér qù chōnglàng, zhēnshìtài wéixiǎn le."
      },
      {
       "hz": "我有一個高中同學沒考上大學，他父母不但沒生氣，反而讓他去義大利遊學。",
       "vi": "Tôi có một bạn học cấp ba thi trượt đại học, bố mẹ bạn ấy không những không tức giận mà còn cho bạn ấy sang Ý du học ngắn hạn.",
       "py": "Wǒ yǒu yígè gāozhōngtóngxué méikǎoshàng dàxué, tā fùmǔ búdàn méishēngqì, fǎn'ér ràng tā qù yìdàlì yóuxué."
      },
      {
       "hz": "我們公司不但沒給男女員工同樣的工作機會，反而對女員工有許多不合理的要求。",
       "vi": "Công ty chúng tôi không những không cho nhân viên nam nữ cơ hội làm việc như nhau mà còn có nhiều yêu cầu vô lý với nhân viên nữ.",
       "py": "Wǒmen gōngsī búdàn méi gěi nánnǚ yuángōng tóngyàng de gōngzuò jīhuì, fǎn'ér duì nǚ yuángōng yǒu xǔduō bùhélǐ de yāoqiú."
      },
      {
       "hz": "小金最近胖了很多，體力也變差了，可是他不但不運動，反而天天約朋友去吃大餐。",
       "vi": "Dạo này Tiểu Kim béo lên nhiều, thể lực cũng kém đi, nhưng cậu ấy không những không tập thể dục mà ngày nào cũng hẹn bạn đi ăn tiệc.",
       "py": "Xiǎojīn zuìjìn pàng le hěnduō, tǐlì yě biànchà le, kěshì tā búdàn bú yùndòng, fǎn'ér tiāntiān yuē péngyǒu qù chī dàcān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 過來 — lại đây, trở lại bình thường",
   "giaiThich": "過來 là bổ ngữ xu hướng (拿過來 — mang lại đây). Ngoài ra còn nghĩa hồi phục về trạng thái bình thường: 醒過來, 明白過來. Ngược lại 過去 là chuyển sang trạng thái xấu: 暈過去, 昏過去."
  },
  {
   "title": "3. 才",
   "points": [
    {
     "label": null,
     "formula": "這一課的「才」是強調「才」後面所說的話，常用在反駁的時候，句尾常跟「呢」一起使用，例如：「你說那家餐廳的菜好吃，可是我覺得你煮的才好吃呢！」、「小明說我借了他的書，我才沒借呢！」",
     "examples": [
      {
       "hz": "尚恩：可是，生命中有很多事情比考試還要重要啊！……家豪：我爸媽才不這麼想。 ……2. A：博物館不遠，我們走路去吧？",
       "vi": "Sean: Nhưng trong cuộc sống có nhiều chuyện còn quan trọng hơn thi cử mà! … Gia Hào: Bố mẹ tôi mới không nghĩ vậy đâu. … A: Bảo tàng không xa, chúng ta đi bộ đi?",
       "py": "Shàng'ēn: Kěshì, shēngmìng zhōng yǒu hěnduō shìqíng bǐ kǎoshì háiyào zhòngyào a!…… jiā háo: Wǒ bàmā cái bú zhème xiǎng.…… 2. A: Bówùguǎn bùyuǎn, wǒmen zǒulù qù ba?"
      },
      {
       "hz": "B：我才不要呢！搭公車比較快。",
       "vi": "B: Tôi mới không thèm đi bộ! Đi xe buýt nhanh hơn.",
       "py": "B: Wǒ cái búyào ne! Dāgōngchē bǐjiào kuài."
      },
      {
       "hz": "A：王導演拍的那部戲非常好，今年的最佳導演一定是他。",
       "vi": "A: Bộ phim đạo diễn Vương làm rất hay, đạo diễn xuất sắc nhất năm nay chắc chắn là ông ấy.",
       "py": "A: Wáng dǎoyǎn pāi de nà bù xì fēicháng hǎo, jīnnián de zuìjiā dǎoyǎn yídìng shì tā."
      },
      {
       "hz": "B：不一定吧，我認為李導演拍的才好呢！",
       "vi": "B: Chưa chắc đâu, tôi thấy phim của đạo diễn Lý mới hay chứ!",
       "py": "B: Bù yídìng ba, wǒ rènwéi Lǐ dǎoyǎn pāi de cái hǎo ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mới đúng là (phản bác)",
   "giaiThich": "Ở bài này 才 nhấn mạnh điều nói SAU nó, thường dùng khi phản bác, cuối câu hay có 呢 (我覺得你煮的才好吃呢！)."
  },
  {
   "title": "1. 尤其是",
   "points": [
    {
     "label": null,
     "formula": "「尤其」是副詞，有「特別」的意思，表示和其他事物比起來更特別。一般放在後面的句子。「尤其」＋「是」有強調的意思。 2. 這個學期我選了五門課，每門課都很有意思，尤其是英文會話課，不僅教授的教法活潑，說話也很幽默。",
     "examples": [
      {
       "hz": "台灣社會一直都很重視學生的學習表現，尤其是考試的成績。",
       "vi": "Xã hội Đài Loan luôn rất coi trọng kết quả học tập của học sinh, nhất là điểm thi.",
       "py": "Táiwān shèhuì yìzhí dōu hěn zhòngshì xuéshēng de xuéxí biǎoxiàn, yóuqí shì kǎoshì de chéngjì."
      },
      {
       "hz": "每種工作都有它的困難或問題，尤其是當警察的，經常會碰到麻煩或危險的事情。",
       "vi": "Công việc nào cũng có khó khăn hay vấn đề của nó, nhất là làm cảnh sát, thường xuyên gặp phải chuyện phiền phức hoặc nguy hiểm.",
       "py": "Měizhǒng gōngzuò dōu yǒu tā de kùnnán huò wèntí, yóuqí shì dāng jǐngchá de, jīngcháng huì pèngdào máfán huò wéixiǎn de shìqíng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "尤其是 — nhất là",
   "giaiThich": "尤其 là phó từ, nghĩa \"đặc biệt\", so với những cái khác thì nổi bật hơn. Thường đặt ở vế sau; thêm 是 để nhấn mạnh."
  },
  {
   "title": "2. V得著",
   "points": [
    {
     "label": null,
     "formula": "表示做某個動作，但達不到某種目的或結果。「著(zháo)」前面的動詞具有一定的目標性，動作有「接觸或達到」的意思，常用的有「拿、看、打、猜、用、找」等。 「著」在此語法作為結構補語，說明前面動詞的結果。例如：鑰匙找著了/沒找著。",
     "examples": [
      {
       "hz": "……把重點寫在便條上，以為孩子複習時用得著，這樣考試的成績就會更好。",
       "vi": "…ghi những ý chính lên giấy nhớ, tưởng con ôn bài sẽ dùng đến, như vậy điểm thi sẽ cao hơn.",
       "py": "…… bǎ zhòngdiǎn xiě zài biàntiáo shàng, yǐwéi háizi fùxí shí yòng de zhe, zhèyàng kǎoshì de chéngjì jiù huì gènghǎo."
      },
      {
       "hz": "那個專櫃裡放著好多漂亮的名牌皮包，可惜我沒錢買，看得著、摸不著。",
       "vi": "Trong quầy hàng đó bày rất nhiều túi xách hàng hiệu đẹp, tiếc là tôi không có tiền mua, chỉ nhìn được mà không sờ được.",
       "py": "Nàge zhuānguì lǐ fàng zhe hǎoduō piàoliàng de míngpái píbāo, kěxī wǒ méiqiánmǎi, kàn de zhe, mō bù zhe."
      },
      {
       "hz": "A：游小姐的男朋友看起來很年輕，你猜他幾歲？",
       "vi": "A: Bạn trai cô Du trông rất trẻ, bạn đoán anh ấy bao nhiêu tuổi?",
       "py": "A: Yóu xiǎojiě de nánpéngyǒu kànqǐlái hěn niánqīng, nǐ cāi tā jǐsuì?"
      },
      {
       "hz": "B：我跟他不熟，哪裡猜得著。",
       "vi": "B: Tôi không thân với anh ấy, đoán sao được.",
       "py": "B: Wǒ gēn tā bù shú, nǎlǐ cāi de zhe."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得著 / V 不著 — có đạt được hay không",
   "giaiThich": "Nói hành động có chạm tới, đạt tới mục tiêu hay không. Động từ thường dùng: 拿, 看, 打, 猜, 用, 找 (鑰匙找著了 / 沒找著)."
  },
  {
   "title": "3. 以……代替……",
   "points": [
    {
     "label": null,
     "formula": "「以」有「用」的意思，「以……代替……」意思是用某種東西或某個行動來替換原本的東西或行動。",
     "examples": [
      {
       "hz": "因此，有意義的學習是讓孩子以思考代替記答案……2. 媽媽很重視家人的健康，常以蔬菜水果做成的點心代替一般的甜點。",
       "vi": "Vì vậy, học tập có ý nghĩa là giúp trẻ lấy việc tư duy thay cho việc học thuộc đáp án… Mẹ rất coi trọng sức khoẻ của gia đình, thường dùng món điểm tâm làm từ rau củ và trái cây thay cho đồ ngọt thông thường.",
       "py": "Yīncǐ, yǒu yìyì de xuéxí shì ràng háizi yǐ sīkǎo dàitì jì dá'àn…… 2. Māma hěn zhòngshì jiārén de jiànkāng, cháng yǐ shūcàishuǐguǒ zuòchéng de diǎnxīn dàitì yìbān de tiándiǎn."
      },
      {
       "hz": "如果大家都能以搭公車、騎自行車代替開車，這樣空氣就不會那麼髒了。",
       "vi": "Nếu mọi người đều đi xe buýt, đạp xe thay cho lái ô tô thì không khí sẽ không ô nhiễm như vậy.",
       "py": "Rúguǒ dàjiā dōu néng yǐ dāgōngchē, qí zìxíngchē dàitì kāichē, zhèyàng kōngqì jiù búhuì nàme zàng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以… 代替… — dùng… thay cho…",
   "giaiThich": "以 nghĩa \"dùng\"; cả cấu trúc nghĩa lấy cái này thay cho cái kia."
  }
 ],
 "td3-9.4": [
  {
   "title": "1. V 過來",
   "points": [
    {
     "label": null,
     "formula": "「動詞＋過來」的「過來」是趨向補語，例如：請你把書拿過來。 另外，「過來」還有回到或恢復到原來狀態的意思，大多表示正常的或是較好的狀態。例如：醒過來、改過來、明白過來。相反的，「過去」 是從正常的狀態到另一種不好的狀態，它比「過來」使用得少，例如：暈過去(fainted)、昏過去(fainted)。 「怎麼不⋯⋯呢？」是「為什麼不⋯⋯呢？」的意思，表示說話的人對某種情況提出疑問，句尾常跟著「呢」。「怎麼不」後面是說話的人認為應該要做的事或建議；「反而」是連詞，後面是不應該做的或代表說話者的疑問。",
     "examples": [
      {
       "hz": "……總是睡得不太安心，半夜會突然醒過來。",
       "vi": "…lúc nào cũng ngủ không yên, nửa đêm đột nhiên tỉnh giấc.",
       "py": "…… zǒngshì shuì de bú tài ānxīn, bànyè huì tūrán xǐngguòlái."
      },
      {
       "hz": "被媽媽罵了好幾次以後，弟弟終於把亂丟髒衣服的壞習慣改過來了。",
       "vi": "Sau mấy lần bị mẹ mắng, em trai cuối cùng đã sửa được thói xấu vứt quần áo bẩn bừa bãi.",
       "py": "Bèi māma mà le hǎo jǐcì yǐhòu, dìdi zhōngyú bǎ luàn diū zàng yīfú de huàixíguàn gǎiguòlái le."
      },
      {
       "hz": "早上上班時，發現大家都對著我笑，過了一會兒我才明白過來，原來我穿著睡褲出門。",
       "vi": "Sáng đi làm, thấy mọi người cứ nhìn tôi cười, một lúc sau tôi mới hiểu ra, hoá ra tôi mặc quần ngủ ra đường.",
       "py": "Zǎoshàng shàngbān shí, fāxiàn dàjiā dōu duì zhe wǒ xiào, guò le yíhuì'er wǒ cái míngbái guòlái, yuánlái wǒ chuānzhe shuìkù chūmén."
      },
      {
       "hz": "怎麼不/不但不⋯⋯，反而⋯⋯",
       "vi": "sao không… / không những không…, ngược lại…",
       "py": "Zěnme bú / búdàn bù……, fǎn'ér……"
      },
      {
       "hz": "（一）怎麼不……，反而……呢？",
       "vi": "(1) Sao không…, ngược lại lại…?",
       "py": "(yī) zěnme bù……, fǎn'ér…… ne?"
      },
      {
       "hz": "快考試了，怎麼不在家念書，反而想出去玩？",
       "vi": "Sắp thi rồi, sao không ở nhà học bài mà lại muốn ra ngoài chơi?",
       "py": "Kuài kǎoshì le, zěnme bú zàijiā niànshū, fǎn'ér xiǎng chūqùwán?"
      },
      {
       "hz": "你聽不懂老師上課說的，怎麼不舉手請教老師，反而玩起手機來了？",
       "vi": "Bạn không hiểu thầy giáo giảng, sao không giơ tay hỏi thầy mà lại chơi điện thoại?",
       "py": "Nǐ tīngbùdǒng lǎoshīshàngkè shuō de, zěnme bù jǔshǒu qǐngjiào lǎoshī, fǎn'ér wán qǐ shǒujī lái le?"
      },
      {
       "hz": "爸爸：孩子每次把衣服脫了就亂丟，每次都得幫他整理。",
       "vi": "Bố: Lần nào con cũng cởi quần áo ra là vứt bừa bãi, lần nào cũng phải dọn giúp nó.",
       "py": "Bàba: Háizi měicì bǎ yīfú tuō le jiù luàn diū, měicì dōu děi bāng tā zhěnglǐ."
      },
      {
       "hz": "媽媽：你怎麼不跟他說，反而老是幫他整理呢？",
       "vi": "Mẹ: Sao anh không nói với con mà cứ dọn giúp nó mãi thế?",
       "py": "Māma: Nǐ zěnme bù gēn tā shuō, fǎn'ér lǎo shì bāng tā zhěnglǐ ne?"
      },
      {
       "hz": "（二）不但不……，反而……「不但不」、「不但沒」後面接的是與說話的人預料相反的情況；「反而」的後面是出乎預料的情況或說話的人認為不應該發生的。有時候「不但」、可以省略，例如：颱風快來了，他(不但)沒留在家裡，反而去衝浪，真是太危險了。",
       "vi": "(2) Không những không…, ngược lại… Sau “不但不”, “不但沒” là tình huống trái với dự đoán của người nói; sau “反而” là tình huống ngoài dự đoán hoặc người nói cho rằng không nên xảy ra. Đôi khi có thể lược bỏ “不但”, ví dụ: Bão sắp đến rồi, anh ấy không những không ở nhà mà còn đi lướt sóng, thật quá nguy hiểm.",
       "py": "(èr) búdàn bù……, fǎn'ér…… “búdàn bú”, “búdàn méi” hòumiàn jiē de shì yǔ shuōhuà de rén yùliào xiāngfǎn de qíngkuàng; “fǎn'ér” de hòumiàn shì chūhūyùliào de qíngkuàng huò shuōhuà de rén rènwéi bù yīnggāi fāshēng de. Yǒushíhòu “búdàn”, kěyǐ shěnglüè, lìrú: Táifēng kuài lái le, tā (búdàn) méi liúzài jiālǐ, fǎn'ér qù chōnglàng, zhēnshìtài wéixiǎn le."
      },
      {
       "hz": "我有一個高中同學沒考上大學，他父母不但沒生氣，反而讓他去義大利遊學。",
       "vi": "Tôi có một bạn học cấp ba thi trượt đại học, bố mẹ bạn ấy không những không tức giận mà còn cho bạn ấy sang Ý du học ngắn hạn.",
       "py": "Wǒ yǒu yígè gāozhōngtóngxué méikǎoshàng dàxué, tā fùmǔ búdàn méishēngqì, fǎn'ér ràng tā qù yìdàlì yóuxué."
      },
      {
       "hz": "我們公司不但沒給男女員工同樣的工作機會，反而對女員工有許多不合理的要求。",
       "vi": "Công ty chúng tôi không những không cho nhân viên nam nữ cơ hội làm việc như nhau mà còn có nhiều yêu cầu vô lý với nhân viên nữ.",
       "py": "Wǒmen gōngsī búdàn méi gěi nánnǚ yuángōng tóngyàng de gōngzuò jīhuì, fǎn'ér duì nǚ yuángōng yǒu xǔduō bùhélǐ de yāoqiú."
      },
      {
       "hz": "小金最近胖了很多，體力也變差了，可是他不但不運動，反而天天約朋友去吃大餐。",
       "vi": "Dạo này Tiểu Kim béo lên nhiều, thể lực cũng kém đi, nhưng cậu ấy không những không tập thể dục mà ngày nào cũng hẹn bạn đi ăn tiệc.",
       "py": "Xiǎojīn zuìjìn pàng le hěnduō, tǐlì yě biànchà le, kěshì tā búdàn bú yùndòng, fǎn'ér tiāntiān yuē péngyǒu qù chī dàcān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 過來 — lại đây, trở lại bình thường",
   "giaiThich": "過來 là bổ ngữ xu hướng (拿過來 — mang lại đây). Ngoài ra còn nghĩa hồi phục về trạng thái bình thường: 醒過來, 明白過來. Ngược lại 過去 là chuyển sang trạng thái xấu: 暈過去, 昏過去."
  },
  {
   "title": "3. 才",
   "points": [
    {
     "label": null,
     "formula": "這一課的「才」是強調「才」後面所說的話，常用在反駁的時候，句尾常跟「呢」一起使用，例如：「你說那家餐廳的菜好吃，可是我覺得你煮的才好吃呢！」、「小明說我借了他的書，我才沒借呢！」",
     "examples": [
      {
       "hz": "尚恩：可是，生命中有很多事情比考試還要重要啊！……家豪：我爸媽才不這麼想。 ……2. A：博物館不遠，我們走路去吧？",
       "vi": "Sean: Nhưng trong cuộc sống có nhiều chuyện còn quan trọng hơn thi cử mà! … Gia Hào: Bố mẹ tôi mới không nghĩ vậy đâu. … A: Bảo tàng không xa, chúng ta đi bộ đi?",
       "py": "Shàng'ēn: Kěshì, shēngmìng zhōng yǒu hěnduō shìqíng bǐ kǎoshì háiyào zhòngyào a!…… jiā háo: Wǒ bàmā cái bú zhème xiǎng.…… 2. A: Bówùguǎn bùyuǎn, wǒmen zǒulù qù ba?"
      },
      {
       "hz": "B：我才不要呢！搭公車比較快。",
       "vi": "B: Tôi mới không thèm đi bộ! Đi xe buýt nhanh hơn.",
       "py": "B: Wǒ cái búyào ne! Dāgōngchē bǐjiào kuài."
      },
      {
       "hz": "A：王導演拍的那部戲非常好，今年的最佳導演一定是他。",
       "vi": "A: Bộ phim đạo diễn Vương làm rất hay, đạo diễn xuất sắc nhất năm nay chắc chắn là ông ấy.",
       "py": "A: Wáng dǎoyǎn pāi de nà bù xì fēicháng hǎo, jīnnián de zuìjiā dǎoyǎn yídìng shì tā."
      },
      {
       "hz": "B：不一定吧，我認為李導演拍的才好呢！",
       "vi": "B: Chưa chắc đâu, tôi thấy phim của đạo diễn Lý mới hay chứ!",
       "py": "B: Bù yídìng ba, wǒ rènwéi Lǐ dǎoyǎn pāi de cái hǎo ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mới đúng là (phản bác)",
   "giaiThich": "Ở bài này 才 nhấn mạnh điều nói SAU nó, thường dùng khi phản bác, cuối câu hay có 呢 (我覺得你煮的才好吃呢！)."
  },
  {
   "title": "1. 尤其是",
   "points": [
    {
     "label": null,
     "formula": "「尤其」是副詞，有「特別」的意思，表示和其他事物比起來更特別。一般放在後面的句子。「尤其」＋「是」有強調的意思。 2. 這個學期我選了五門課，每門課都很有意思，尤其是英文會話課，不僅教授的教法活潑，說話也很幽默。",
     "examples": [
      {
       "hz": "台灣社會一直都很重視學生的學習表現，尤其是考試的成績。",
       "vi": "Xã hội Đài Loan luôn rất coi trọng kết quả học tập của học sinh, nhất là điểm thi.",
       "py": "Táiwān shèhuì yìzhí dōu hěn zhòngshì xuéshēng de xuéxí biǎoxiàn, yóuqí shì kǎoshì de chéngjì."
      },
      {
       "hz": "每種工作都有它的困難或問題，尤其是當警察的，經常會碰到麻煩或危險的事情。",
       "vi": "Công việc nào cũng có khó khăn hay vấn đề của nó, nhất là làm cảnh sát, thường xuyên gặp phải chuyện phiền phức hoặc nguy hiểm.",
       "py": "Měizhǒng gōngzuò dōu yǒu tā de kùnnán huò wèntí, yóuqí shì dāng jǐngchá de, jīngcháng huì pèngdào máfán huò wéixiǎn de shìqíng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "尤其是 — nhất là",
   "giaiThich": "尤其 là phó từ, nghĩa \"đặc biệt\", so với những cái khác thì nổi bật hơn. Thường đặt ở vế sau; thêm 是 để nhấn mạnh."
  },
  {
   "title": "2. V得著",
   "points": [
    {
     "label": null,
     "formula": "表示做某個動作，但達不到某種目的或結果。「著(zháo)」前面的動詞具有一定的目標性，動作有「接觸或達到」的意思，常用的有「拿、看、打、猜、用、找」等。 「著」在此語法作為結構補語，說明前面動詞的結果。例如：鑰匙找著了/沒找著。",
     "examples": [
      {
       "hz": "……把重點寫在便條上，以為孩子複習時用得著，這樣考試的成績就會更好。",
       "vi": "…ghi những ý chính lên giấy nhớ, tưởng con ôn bài sẽ dùng đến, như vậy điểm thi sẽ cao hơn.",
       "py": "…… bǎ zhòngdiǎn xiě zài biàntiáo shàng, yǐwéi háizi fùxí shí yòng de zhe, zhèyàng kǎoshì de chéngjì jiù huì gènghǎo."
      },
      {
       "hz": "那個專櫃裡放著好多漂亮的名牌皮包，可惜我沒錢買，看得著、摸不著。",
       "vi": "Trong quầy hàng đó bày rất nhiều túi xách hàng hiệu đẹp, tiếc là tôi không có tiền mua, chỉ nhìn được mà không sờ được.",
       "py": "Nàge zhuānguì lǐ fàng zhe hǎoduō piàoliàng de míngpái píbāo, kěxī wǒ méiqiánmǎi, kàn de zhe, mō bù zhe."
      },
      {
       "hz": "A：游小姐的男朋友看起來很年輕，你猜他幾歲？",
       "vi": "A: Bạn trai cô Du trông rất trẻ, bạn đoán anh ấy bao nhiêu tuổi?",
       "py": "A: Yóu xiǎojiě de nánpéngyǒu kànqǐlái hěn niánqīng, nǐ cāi tā jǐsuì?"
      },
      {
       "hz": "B：我跟他不熟，哪裡猜得著。",
       "vi": "B: Tôi không thân với anh ấy, đoán sao được.",
       "py": "B: Wǒ gēn tā bù shú, nǎlǐ cāi de zhe."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得著 / V 不著 — có đạt được hay không",
   "giaiThich": "Nói hành động có chạm tới, đạt tới mục tiêu hay không. Động từ thường dùng: 拿, 看, 打, 猜, 用, 找 (鑰匙找著了 / 沒找著)."
  },
  {
   "title": "3. 以……代替……",
   "points": [
    {
     "label": null,
     "formula": "「以」有「用」的意思，「以……代替……」意思是用某種東西或某個行動來替換原本的東西或行動。",
     "examples": [
      {
       "hz": "因此，有意義的學習是讓孩子以思考代替記答案……2. 媽媽很重視家人的健康，常以蔬菜水果做成的點心代替一般的甜點。",
       "vi": "Vì vậy, học tập có ý nghĩa là giúp trẻ lấy việc tư duy thay cho việc học thuộc đáp án… Mẹ rất coi trọng sức khoẻ của gia đình, thường dùng món điểm tâm làm từ rau củ và trái cây thay cho đồ ngọt thông thường.",
       "py": "Yīncǐ, yǒu yìyì de xuéxí shì ràng háizi yǐ sīkǎo dàitì jì dá'àn…… 2. Māma hěn zhòngshì jiārén de jiànkāng, cháng yǐ shūcàishuǐguǒ zuòchéng de diǎnxīn dàitì yìbān de tiándiǎn."
      },
      {
       "hz": "如果大家都能以搭公車、騎自行車代替開車，這樣空氣就不會那麼髒了。",
       "vi": "Nếu mọi người đều đi xe buýt, đạp xe thay cho lái ô tô thì không khí sẽ không ô nhiễm như vậy.",
       "py": "Rúguǒ dàjiā dōu néng yǐ dāgōngchē, qí zìxíngchē dàitì kāichē, zhèyàng kōngqì jiù búhuì nàme zàng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以… 代替… — dùng… thay cho…",
   "giaiThich": "以 nghĩa \"dùng\"; cả cấu trúc nghĩa lấy cái này thay cho cái kia."
  }
 ],
 "td3-10.1": [
  {
   "title": "2. 只不過",
   "points": [
    {
     "label": null,
     "formula": "「只不過」是「只是」的意思，用來補充說明某件事，讓聽者更了解事情的情況。「只不過」的後面接要補充說明的內容。",
     "examples": [
      {
       "hz": "我早就想帶父母去做了，只不過他們覺得做健檢除了得花時間⋯⋯我很喜歡這輛英國車，只不過價格太高了，我得多存一點錢才買得起。",
       "vi": "Tôi đã muốn đưa bố mẹ đi khám từ lâu rồi, chẳng qua bố mẹ thấy đi khám sức khoẻ ngoài tốn thời gian ra… Tôi rất thích chiếc xe Anh này, chẳng qua giá cao quá, tôi phải tiết kiệm thêm mới mua nổi.",
       "py": "Wǒ zǎojiù xiǎng dài fùmǔ qù zuò le, zhǐbúguò tāmen juéde zuò jiàn jiǎn chúle děi huā shíjiān…… wǒ hěn xǐhuān zhèliàng Yīngguó chē, zhǐbúguò jiàgé tài gāo le, wǒ děi duō cún yìdiǎn qián cái mǎideqǐ."
      },
      {
       "hz": "他很想當背包客去非洲旅行，只不過公司的事情太多，實在走不開。",
       "vi": "Anh ấy rất muốn làm dân du lịch ba lô sang châu Phi, chẳng qua việc ở công ty nhiều quá, thật sự không đi được.",
       "py": "Tā hěn xiǎng dāng bēibāokè qù fēizhōu lǚxíng, zhǐbúguò gōngsī de shìqíng tài duō, shízài zǒubùkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只不過 — chẳng qua chỉ là",
   "giaiThich": "Nghĩa như 只是, dùng để nói thêm cho người nghe hiểu rõ tình hình; nội dung bổ sung đặt sau 只不過."
  },
  {
   "title": "3. 害",
   "points": [
    {
     "label": null,
     "formula": "這個「害」有「讓」或「使」的意思，語氣比較強烈。「害」的後面接負面的結果。",
     "examples": [
      {
       "hz": "⋯⋯他死也不肯去，害我擔心得不得了。",
       "vi": "…ông ấy chết cũng không chịu đi, khiến tôi lo lắng vô cùng.",
       "py": "…… tā sǐ yě bùkěn qù, hài wǒ dānxīn de bùdéle."
      },
      {
       "hz": "周先生爬山時迷了路，山上很偏僻，手機的訊號很弱，害他沒辦法跟家人聯絡。",
       "vi": "Anh Chu leo núi bị lạc đường, trên núi rất hẻo lánh, sóng điện thoại yếu, khiến anh không liên lạc được với gia đình.",
       "py": "Zhōu xiānshēng páshān shí mílelù, shānshàng hěn piānpì, shǒujī de xùnhào hěn ruò, hài tā méi bànfǎ gēn jiārén liánluò."
      },
      {
       "hz": "要是老師每天要求學生寫很多測驗題目，不僅對學習沒好處，也會害他們更討厭讀書。",
       "vi": "Nếu thầy giáo ngày nào cũng bắt học sinh làm nhiều bài trắc nghiệm, không những không có lợi cho việc học mà còn khiến các em càng ghét học hơn.",
       "py": "Yàoshì lǎoshī měitiān yāoqiú xuéshēng xiě hěnduō cèyàn tímù, bùjǐn duì xuéxí méi hǎochù, yě huì hài tāmen gèng tǎoyàn dúshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "害 — làm cho (điều xấu)",
   "giaiThich": "Nghĩa như 讓/使 nhưng giọng mạnh hơn, và phía sau LUÔN là kết quả tiêu cực."
  },
  {
   "title": "1. V到底",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "強調某件事做到最後，或堅持、努力到最後。",
       "vi": "Nhấn mạnh một việc được làm đến cùng, hoặc kiên trì, nỗ lực đến cuối cùng.",
       "py": "Qiángdiào mǒujiànshì zuòdào zuìhòu, huò jiānchí, nǔlì dào zuìhòu."
      },
      {
       "hz": "⋯⋯他都努力克服、堅持到底，終於擁有了今天的成就。",
       "vi": "…ông đều nỗ lực vượt qua, kiên trì đến cùng, cuối cùng đã có được thành tựu như hôm nay.",
       "py": "…… tā dōu nǔlì kèfú, jiānchídàodǐ, zhōngyú yǒngyǒu le jīntiān de chéngjiù."
      },
      {
       "hz": "既然我答應要幫你，就一定會幫到底的，請放心。",
       "vi": "Tôi đã hứa giúp bạn thì nhất định sẽ giúp đến cùng, bạn cứ yên tâm.",
       "py": "Jìrán wǒ dāyìng yào bāng nǐ, jiù yídìng huì bāng dàodǐ de, qǐng fàngxīn."
      },
      {
       "hz": "這個工作是你自己決定要做的，必須負責到底，不可以碰到麻煩就不做了。",
       "vi": "Công việc này là do bạn tự quyết định làm, phải chịu trách nhiệm đến cùng, không được gặp chuyện phiền phức là bỏ.",
       "py": "Zhège gōngzuò shì nǐ zìjǐ juédìng yào zuò de, bìxū fùzé dàodǐ, bù kěyǐ pèngdào máfán jiù bú zuò le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 到底 — làm tới cùng",
   "giaiThich": "Diễn đạt làm việc gì đó đến tận cùng, không bỏ dở."
  },
  {
   "title": "2. 一再",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示某個動作或事情一次又一次地發生。",
       "vi": "Diễn tả một hành động hay sự việc xảy ra hết lần này đến lần khác.",
       "py": "Biǎoshì mǒugè dòngzuò huò shìqíng yícì yòu yícì dì fāshēng."
      },
      {
       "hz": "他也一再警告林伯伯，別拿生命開玩笑⋯⋯李先生上班一再遲到，直到老闆叫他明天起別來了，他才知道事情有多麼嚴重。",
       "vi": "Ông ấy cũng nhiều lần cảnh báo bác Lâm đừng đem tính mạng ra đùa… Anh Lý đi làm muộn hết lần này đến lần khác, đến khi ông chủ bảo từ mai đừng đến nữa, anh ấy mới biết chuyện nghiêm trọng thế nào.",
       "py": "Tā yě yízài jǐnggào Lín bóbo, bié ná shēngmìng kāiwánxiào…… Lǐ xiānshēng shàngbān yízài chídào, zhídào lǎobǎn jiào tā míngtiān qǐ bié lái le, tā cái zhīdào shìqíng yǒu duōme yánzhòng."
      },
      {
       "hz": "選舉時市長一再向民眾強調，當選後一定會好好改善交通情況，但沒想到現在反而更嚴重了。",
       "vi": "Lúc tranh cử, thị trưởng nhiều lần khẳng định với người dân rằng đắc cử xong nhất định sẽ cải thiện tình hình giao thông, không ngờ bây giờ lại càng tệ hơn.",
       "py": "Xuǎnjǔ shí shìzhǎng yízài xiàng mínzhòng qiángdiào, dāngxuǎn hòu yídìng huì hǎohǎo gǎishàn jiāotōng qíngkuàng, dàn méixiǎngdào xiànzài fǎn'ér gèng yánzhòng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一再 — hết lần này tới lần khác",
   "giaiThich": "Phó từ, chỉ việc lặp đi lặp lại nhiều lần."
  },
  {
   "title": "3. 假如",
   "points": [
    {
     "label": null,
     "formula": "「假如」跟「如果」、「要是」一樣，用來假設某個條件或情況，常和「就」搭配使用，表示在假設條件或情況下發生的結果。「如果」可用在主語前後，可用於書面、口語；「要是」也可用在主語前後，但僅用於口語；「假如」用在主語前，多用於書面。",
     "examples": [
      {
       "hz": "⋯⋯假如不改變過去的生活方式，恐怕連上帝也救不了了。",
       "vi": "…nếu không thay đổi lối sống trước đây thì e là đến Thượng Đế cũng không cứu nổi.",
       "py": "…… jiǎrú bù gǎibiàn guòqù de shēnghuó fāngshì, kǒngpà lián shàngdì yě jiù bùliǎo le."
      },
      {
       "hz": "假如你對自己的穿著品味沒有信心，可以多看服裝雜誌或聽聽專櫃小姐的意見。",
       "vi": "Nếu bạn không tự tin vào gu ăn mặc của mình, có thể xem nhiều tạp chí thời trang hoặc nghe ý kiến của nhân viên quầy hàng.",
       "py": "Jiǎrú nǐ duì zìjǐ de chuānzhuó pǐnwèi méiyǒu xìnxīn, kěyǐ duō kàn fúzhuāng zázhì huò tīngtīng zhuānguìxiǎojiě de yìjiàn."
      },
      {
       "hz": "他是個有耐心、做事認真的人，假如讓他負責推銷新產品，應該會有不錯的成果。",
       "vi": "Anh ấy là người kiên nhẫn, làm việc chăm chỉ, nếu giao cho anh ấy phụ trách quảng bá sản phẩm mới thì chắc sẽ có kết quả tốt.",
       "py": "Tā shì gè yǒu nàixīn, zuòshì rènzhēn de rén, jiǎrú ràng tā fùzé tuīxiāo xīn chǎnpǐn, yīnggāi huì yǒu búcuò de chéngguǒ."
      },
      {
       "hz": "「為了」之後的短語說明要達到的目標，「而」後面的短語說明為了達到目標所做的事情。",
       "vi": "Cụm từ sau “為了” nêu mục tiêu cần đạt; cụm từ sau “而” nêu việc làm để đạt mục tiêu đó.",
       "py": "“Wèile” zhīhòu de duǎnyǔ shuōmíng yào dádào de mùbiāo, “ér” hòumiàn de duǎnyǔ shuōmíng wèile dádàomùbiāo suǒ zuò de shìqíng."
      },
      {
       "hz": "就在林伯伯為了健康而努力時，他的一位老朋友因為工作太累⋯⋯他為了挑戰臺灣最高的高山，而每天慢跑一小時，訓練自己的體力。",
       "vi": "Đúng lúc bác Lâm đang nỗ lực vì sức khoẻ thì một người bạn cũ của bác vì làm việc quá sức… Để chinh phục ngọn núi cao nhất Đài Loan, ngày nào anh ấy cũng chạy chậm một tiếng để rèn thể lực.",
       "py": "Jiù zài Lín bóbo wèile jiànkāng ér nǔlì shí, tā de yíwèi lǎopéngyǒu yīnwèi gōngzuò tài lèi…… tā wèile tiǎozhàn Táiwān zuìgāo de gāoshān, ér měitiān mànpǎo yì xiǎoshí, xùnliàn zìjǐ de tǐlì."
      },
      {
       "hz": "他為了讓生病的母親快點兒好起來，而學習做一些對身體健康有好處的菜。",
       "vi": "Để người mẹ đang ốm mau khoẻ lại, anh ấy học nấu những món tốt cho sức khoẻ.",
       "py": "Tā wèile ràng shēngbìng de mǔqīn kuàidiǎn'ér hǎo qǐlái, ér xuéxí zuò yìxiē duì shēntǐjiànkāng yǒu hǎochù de cài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "假如 — giả sử, nếu như",
   "giaiThich": "Giống 如果, 要是 dùng nêu giả thiết, thường đi với 就. Khác biệt: 如果 dùng được cả văn nói lẫn văn viết, đặt trước hoặc sau chủ ngữ; 要是 chỉ dùng văn nói; 假如 đặt TRƯỚC chủ ngữ và thiên về văn viết."
  }
 ],
 "td3-10.2": [
  {
   "title": "2. 只不過",
   "points": [
    {
     "label": null,
     "formula": "「只不過」是「只是」的意思，用來補充說明某件事，讓聽者更了解事情的情況。「只不過」的後面接要補充說明的內容。",
     "examples": [
      {
       "hz": "我早就想帶父母去做了，只不過他們覺得做健檢除了得花時間⋯⋯我很喜歡這輛英國車，只不過價格太高了，我得多存一點錢才買得起。",
       "vi": "Tôi đã muốn đưa bố mẹ đi khám từ lâu rồi, chẳng qua bố mẹ thấy đi khám sức khoẻ ngoài tốn thời gian ra… Tôi rất thích chiếc xe Anh này, chẳng qua giá cao quá, tôi phải tiết kiệm thêm mới mua nổi.",
       "py": "Wǒ zǎojiù xiǎng dài fùmǔ qù zuò le, zhǐbúguò tāmen juéde zuò jiàn jiǎn chúle děi huā shíjiān…… wǒ hěn xǐhuān zhèliàng Yīngguó chē, zhǐbúguò jiàgé tài gāo le, wǒ děi duō cún yìdiǎn qián cái mǎideqǐ."
      },
      {
       "hz": "他很想當背包客去非洲旅行，只不過公司的事情太多，實在走不開。",
       "vi": "Anh ấy rất muốn làm dân du lịch ba lô sang châu Phi, chẳng qua việc ở công ty nhiều quá, thật sự không đi được.",
       "py": "Tā hěn xiǎng dāng bēibāokè qù fēizhōu lǚxíng, zhǐbúguò gōngsī de shìqíng tài duō, shízài zǒubùkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只不過 — chẳng qua chỉ là",
   "giaiThich": "Nghĩa như 只是, dùng để nói thêm cho người nghe hiểu rõ tình hình; nội dung bổ sung đặt sau 只不過."
  },
  {
   "title": "3. 害",
   "points": [
    {
     "label": null,
     "formula": "這個「害」有「讓」或「使」的意思，語氣比較強烈。「害」的後面接負面的結果。",
     "examples": [
      {
       "hz": "⋯⋯他死也不肯去，害我擔心得不得了。",
       "vi": "…ông ấy chết cũng không chịu đi, khiến tôi lo lắng vô cùng.",
       "py": "…… tā sǐ yě bùkěn qù, hài wǒ dānxīn de bùdéle."
      },
      {
       "hz": "周先生爬山時迷了路，山上很偏僻，手機的訊號很弱，害他沒辦法跟家人聯絡。",
       "vi": "Anh Chu leo núi bị lạc đường, trên núi rất hẻo lánh, sóng điện thoại yếu, khiến anh không liên lạc được với gia đình.",
       "py": "Zhōu xiānshēng páshān shí mílelù, shānshàng hěn piānpì, shǒujī de xùnhào hěn ruò, hài tā méi bànfǎ gēn jiārén liánluò."
      },
      {
       "hz": "要是老師每天要求學生寫很多測驗題目，不僅對學習沒好處，也會害他們更討厭讀書。",
       "vi": "Nếu thầy giáo ngày nào cũng bắt học sinh làm nhiều bài trắc nghiệm, không những không có lợi cho việc học mà còn khiến các em càng ghét học hơn.",
       "py": "Yàoshì lǎoshī měitiān yāoqiú xuéshēng xiě hěnduō cèyàn tímù, bùjǐn duì xuéxí méi hǎochù, yě huì hài tāmen gèng tǎoyàn dúshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "害 — làm cho (điều xấu)",
   "giaiThich": "Nghĩa như 讓/使 nhưng giọng mạnh hơn, và phía sau LUÔN là kết quả tiêu cực."
  },
  {
   "title": "1. V到底",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "強調某件事做到最後，或堅持、努力到最後。",
       "vi": "Nhấn mạnh một việc được làm đến cùng, hoặc kiên trì, nỗ lực đến cuối cùng.",
       "py": "Qiángdiào mǒujiànshì zuòdào zuìhòu, huò jiānchí, nǔlì dào zuìhòu."
      },
      {
       "hz": "⋯⋯他都努力克服、堅持到底，終於擁有了今天的成就。",
       "vi": "…ông đều nỗ lực vượt qua, kiên trì đến cùng, cuối cùng đã có được thành tựu như hôm nay.",
       "py": "…… tā dōu nǔlì kèfú, jiānchídàodǐ, zhōngyú yǒngyǒu le jīntiān de chéngjiù."
      },
      {
       "hz": "既然我答應要幫你，就一定會幫到底的，請放心。",
       "vi": "Tôi đã hứa giúp bạn thì nhất định sẽ giúp đến cùng, bạn cứ yên tâm.",
       "py": "Jìrán wǒ dāyìng yào bāng nǐ, jiù yídìng huì bāng dàodǐ de, qǐng fàngxīn."
      },
      {
       "hz": "這個工作是你自己決定要做的，必須負責到底，不可以碰到麻煩就不做了。",
       "vi": "Công việc này là do bạn tự quyết định làm, phải chịu trách nhiệm đến cùng, không được gặp chuyện phiền phức là bỏ.",
       "py": "Zhège gōngzuò shì nǐ zìjǐ juédìng yào zuò de, bìxū fùzé dàodǐ, bù kěyǐ pèngdào máfán jiù bú zuò le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 到底 — làm tới cùng",
   "giaiThich": "Diễn đạt làm việc gì đó đến tận cùng, không bỏ dở."
  },
  {
   "title": "2. 一再",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示某個動作或事情一次又一次地發生。",
       "vi": "Diễn tả một hành động hay sự việc xảy ra hết lần này đến lần khác.",
       "py": "Biǎoshì mǒugè dòngzuò huò shìqíng yícì yòu yícì dì fāshēng."
      },
      {
       "hz": "他也一再警告林伯伯，別拿生命開玩笑⋯⋯李先生上班一再遲到，直到老闆叫他明天起別來了，他才知道事情有多麼嚴重。",
       "vi": "Ông ấy cũng nhiều lần cảnh báo bác Lâm đừng đem tính mạng ra đùa… Anh Lý đi làm muộn hết lần này đến lần khác, đến khi ông chủ bảo từ mai đừng đến nữa, anh ấy mới biết chuyện nghiêm trọng thế nào.",
       "py": "Tā yě yízài jǐnggào Lín bóbo, bié ná shēngmìng kāiwánxiào…… Lǐ xiānshēng shàngbān yízài chídào, zhídào lǎobǎn jiào tā míngtiān qǐ bié lái le, tā cái zhīdào shìqíng yǒu duōme yánzhòng."
      },
      {
       "hz": "選舉時市長一再向民眾強調，當選後一定會好好改善交通情況，但沒想到現在反而更嚴重了。",
       "vi": "Lúc tranh cử, thị trưởng nhiều lần khẳng định với người dân rằng đắc cử xong nhất định sẽ cải thiện tình hình giao thông, không ngờ bây giờ lại càng tệ hơn.",
       "py": "Xuǎnjǔ shí shìzhǎng yízài xiàng mínzhòng qiángdiào, dāngxuǎn hòu yídìng huì hǎohǎo gǎishàn jiāotōng qíngkuàng, dàn méixiǎngdào xiànzài fǎn'ér gèng yánzhòng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一再 — hết lần này tới lần khác",
   "giaiThich": "Phó từ, chỉ việc lặp đi lặp lại nhiều lần."
  },
  {
   "title": "3. 假如",
   "points": [
    {
     "label": null,
     "formula": "「假如」跟「如果」、「要是」一樣，用來假設某個條件或情況，常和「就」搭配使用，表示在假設條件或情況下發生的結果。「如果」可用在主語前後，可用於書面、口語；「要是」也可用在主語前後，但僅用於口語；「假如」用在主語前，多用於書面。",
     "examples": [
      {
       "hz": "⋯⋯假如不改變過去的生活方式，恐怕連上帝也救不了了。",
       "vi": "…nếu không thay đổi lối sống trước đây thì e là đến Thượng Đế cũng không cứu nổi.",
       "py": "…… jiǎrú bù gǎibiàn guòqù de shēnghuó fāngshì, kǒngpà lián shàngdì yě jiù bùliǎo le."
      },
      {
       "hz": "假如你對自己的穿著品味沒有信心，可以多看服裝雜誌或聽聽專櫃小姐的意見。",
       "vi": "Nếu bạn không tự tin vào gu ăn mặc của mình, có thể xem nhiều tạp chí thời trang hoặc nghe ý kiến của nhân viên quầy hàng.",
       "py": "Jiǎrú nǐ duì zìjǐ de chuānzhuó pǐnwèi méiyǒu xìnxīn, kěyǐ duō kàn fúzhuāng zázhì huò tīngtīng zhuānguìxiǎojiě de yìjiàn."
      },
      {
       "hz": "他是個有耐心、做事認真的人，假如讓他負責推銷新產品，應該會有不錯的成果。",
       "vi": "Anh ấy là người kiên nhẫn, làm việc chăm chỉ, nếu giao cho anh ấy phụ trách quảng bá sản phẩm mới thì chắc sẽ có kết quả tốt.",
       "py": "Tā shì gè yǒu nàixīn, zuòshì rènzhēn de rén, jiǎrú ràng tā fùzé tuīxiāo xīn chǎnpǐn, yīnggāi huì yǒu búcuò de chéngguǒ."
      },
      {
       "hz": "「為了」之後的短語說明要達到的目標，「而」後面的短語說明為了達到目標所做的事情。",
       "vi": "Cụm từ sau “為了” nêu mục tiêu cần đạt; cụm từ sau “而” nêu việc làm để đạt mục tiêu đó.",
       "py": "“Wèile” zhīhòu de duǎnyǔ shuōmíng yào dádào de mùbiāo, “ér” hòumiàn de duǎnyǔ shuōmíng wèile dádàomùbiāo suǒ zuò de shìqíng."
      },
      {
       "hz": "就在林伯伯為了健康而努力時，他的一位老朋友因為工作太累⋯⋯他為了挑戰臺灣最高的高山，而每天慢跑一小時，訓練自己的體力。",
       "vi": "Đúng lúc bác Lâm đang nỗ lực vì sức khoẻ thì một người bạn cũ của bác vì làm việc quá sức… Để chinh phục ngọn núi cao nhất Đài Loan, ngày nào anh ấy cũng chạy chậm một tiếng để rèn thể lực.",
       "py": "Jiù zài Lín bóbo wèile jiànkāng ér nǔlì shí, tā de yíwèi lǎopéngyǒu yīnwèi gōngzuò tài lèi…… tā wèile tiǎozhàn Táiwān zuìgāo de gāoshān, ér měitiān mànpǎo yì xiǎoshí, xùnliàn zìjǐ de tǐlì."
      },
      {
       "hz": "他為了讓生病的母親快點兒好起來，而學習做一些對身體健康有好處的菜。",
       "vi": "Để người mẹ đang ốm mau khoẻ lại, anh ấy học nấu những món tốt cho sức khoẻ.",
       "py": "Tā wèile ràng shēngbìng de mǔqīn kuàidiǎn'ér hǎo qǐlái, ér xuéxí zuò yìxiē duì shēntǐjiànkāng yǒu hǎochù de cài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "假如 — giả sử, nếu như",
   "giaiThich": "Giống 如果, 要是 dùng nêu giả thiết, thường đi với 就. Khác biệt: 如果 dùng được cả văn nói lẫn văn viết, đặt trước hoặc sau chủ ngữ; 要是 chỉ dùng văn nói; 假如 đặt TRƯỚC chủ ngữ và thiên về văn viết."
  }
 ],
 "td3-10.3": [
  {
   "title": "2. 只不過",
   "points": [
    {
     "label": null,
     "formula": "「只不過」是「只是」的意思，用來補充說明某件事，讓聽者更了解事情的情況。「只不過」的後面接要補充說明的內容。",
     "examples": [
      {
       "hz": "我早就想帶父母去做了，只不過他們覺得做健檢除了得花時間⋯⋯我很喜歡這輛英國車，只不過價格太高了，我得多存一點錢才買得起。",
       "vi": "Tôi đã muốn đưa bố mẹ đi khám từ lâu rồi, chẳng qua bố mẹ thấy đi khám sức khoẻ ngoài tốn thời gian ra… Tôi rất thích chiếc xe Anh này, chẳng qua giá cao quá, tôi phải tiết kiệm thêm mới mua nổi.",
       "py": "Wǒ zǎojiù xiǎng dài fùmǔ qù zuò le, zhǐbúguò tāmen juéde zuò jiàn jiǎn chúle děi huā shíjiān…… wǒ hěn xǐhuān zhèliàng Yīngguó chē, zhǐbúguò jiàgé tài gāo le, wǒ děi duō cún yìdiǎn qián cái mǎideqǐ."
      },
      {
       "hz": "他很想當背包客去非洲旅行，只不過公司的事情太多，實在走不開。",
       "vi": "Anh ấy rất muốn làm dân du lịch ba lô sang châu Phi, chẳng qua việc ở công ty nhiều quá, thật sự không đi được.",
       "py": "Tā hěn xiǎng dāng bēibāokè qù fēizhōu lǚxíng, zhǐbúguò gōngsī de shìqíng tài duō, shízài zǒubùkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只不過 — chẳng qua chỉ là",
   "giaiThich": "Nghĩa như 只是, dùng để nói thêm cho người nghe hiểu rõ tình hình; nội dung bổ sung đặt sau 只不過."
  },
  {
   "title": "3. 害",
   "points": [
    {
     "label": null,
     "formula": "這個「害」有「讓」或「使」的意思，語氣比較強烈。「害」的後面接負面的結果。",
     "examples": [
      {
       "hz": "⋯⋯他死也不肯去，害我擔心得不得了。",
       "vi": "…ông ấy chết cũng không chịu đi, khiến tôi lo lắng vô cùng.",
       "py": "…… tā sǐ yě bùkěn qù, hài wǒ dānxīn de bùdéle."
      },
      {
       "hz": "周先生爬山時迷了路，山上很偏僻，手機的訊號很弱，害他沒辦法跟家人聯絡。",
       "vi": "Anh Chu leo núi bị lạc đường, trên núi rất hẻo lánh, sóng điện thoại yếu, khiến anh không liên lạc được với gia đình.",
       "py": "Zhōu xiānshēng páshān shí mílelù, shānshàng hěn piānpì, shǒujī de xùnhào hěn ruò, hài tā méi bànfǎ gēn jiārén liánluò."
      },
      {
       "hz": "要是老師每天要求學生寫很多測驗題目，不僅對學習沒好處，也會害他們更討厭讀書。",
       "vi": "Nếu thầy giáo ngày nào cũng bắt học sinh làm nhiều bài trắc nghiệm, không những không có lợi cho việc học mà còn khiến các em càng ghét học hơn.",
       "py": "Yàoshì lǎoshī měitiān yāoqiú xuéshēng xiě hěnduō cèyàn tímù, bùjǐn duì xuéxí méi hǎochù, yě huì hài tāmen gèng tǎoyàn dúshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "害 — làm cho (điều xấu)",
   "giaiThich": "Nghĩa như 讓/使 nhưng giọng mạnh hơn, và phía sau LUÔN là kết quả tiêu cực."
  },
  {
   "title": "1. V到底",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "強調某件事做到最後，或堅持、努力到最後。",
       "vi": "Nhấn mạnh một việc được làm đến cùng, hoặc kiên trì, nỗ lực đến cuối cùng.",
       "py": "Qiángdiào mǒujiànshì zuòdào zuìhòu, huò jiānchí, nǔlì dào zuìhòu."
      },
      {
       "hz": "⋯⋯他都努力克服、堅持到底，終於擁有了今天的成就。",
       "vi": "…ông đều nỗ lực vượt qua, kiên trì đến cùng, cuối cùng đã có được thành tựu như hôm nay.",
       "py": "…… tā dōu nǔlì kèfú, jiānchídàodǐ, zhōngyú yǒngyǒu le jīntiān de chéngjiù."
      },
      {
       "hz": "既然我答應要幫你，就一定會幫到底的，請放心。",
       "vi": "Tôi đã hứa giúp bạn thì nhất định sẽ giúp đến cùng, bạn cứ yên tâm.",
       "py": "Jìrán wǒ dāyìng yào bāng nǐ, jiù yídìng huì bāng dàodǐ de, qǐng fàngxīn."
      },
      {
       "hz": "這個工作是你自己決定要做的，必須負責到底，不可以碰到麻煩就不做了。",
       "vi": "Công việc này là do bạn tự quyết định làm, phải chịu trách nhiệm đến cùng, không được gặp chuyện phiền phức là bỏ.",
       "py": "Zhège gōngzuò shì nǐ zìjǐ juédìng yào zuò de, bìxū fùzé dàodǐ, bù kěyǐ pèngdào máfán jiù bú zuò le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 到底 — làm tới cùng",
   "giaiThich": "Diễn đạt làm việc gì đó đến tận cùng, không bỏ dở."
  },
  {
   "title": "2. 一再",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示某個動作或事情一次又一次地發生。",
       "vi": "Diễn tả một hành động hay sự việc xảy ra hết lần này đến lần khác.",
       "py": "Biǎoshì mǒugè dòngzuò huò shìqíng yícì yòu yícì dì fāshēng."
      },
      {
       "hz": "他也一再警告林伯伯，別拿生命開玩笑⋯⋯李先生上班一再遲到，直到老闆叫他明天起別來了，他才知道事情有多麼嚴重。",
       "vi": "Ông ấy cũng nhiều lần cảnh báo bác Lâm đừng đem tính mạng ra đùa… Anh Lý đi làm muộn hết lần này đến lần khác, đến khi ông chủ bảo từ mai đừng đến nữa, anh ấy mới biết chuyện nghiêm trọng thế nào.",
       "py": "Tā yě yízài jǐnggào Lín bóbo, bié ná shēngmìng kāiwánxiào…… Lǐ xiānshēng shàngbān yízài chídào, zhídào lǎobǎn jiào tā míngtiān qǐ bié lái le, tā cái zhīdào shìqíng yǒu duōme yánzhòng."
      },
      {
       "hz": "選舉時市長一再向民眾強調，當選後一定會好好改善交通情況，但沒想到現在反而更嚴重了。",
       "vi": "Lúc tranh cử, thị trưởng nhiều lần khẳng định với người dân rằng đắc cử xong nhất định sẽ cải thiện tình hình giao thông, không ngờ bây giờ lại càng tệ hơn.",
       "py": "Xuǎnjǔ shí shìzhǎng yízài xiàng mínzhòng qiángdiào, dāngxuǎn hòu yídìng huì hǎohǎo gǎishàn jiāotōng qíngkuàng, dàn méixiǎngdào xiànzài fǎn'ér gèng yánzhòng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一再 — hết lần này tới lần khác",
   "giaiThich": "Phó từ, chỉ việc lặp đi lặp lại nhiều lần."
  },
  {
   "title": "3. 假如",
   "points": [
    {
     "label": null,
     "formula": "「假如」跟「如果」、「要是」一樣，用來假設某個條件或情況，常和「就」搭配使用，表示在假設條件或情況下發生的結果。「如果」可用在主語前後，可用於書面、口語；「要是」也可用在主語前後，但僅用於口語；「假如」用在主語前，多用於書面。",
     "examples": [
      {
       "hz": "⋯⋯假如不改變過去的生活方式，恐怕連上帝也救不了了。",
       "vi": "…nếu không thay đổi lối sống trước đây thì e là đến Thượng Đế cũng không cứu nổi.",
       "py": "…… jiǎrú bù gǎibiàn guòqù de shēnghuó fāngshì, kǒngpà lián shàngdì yě jiù bùliǎo le."
      },
      {
       "hz": "假如你對自己的穿著品味沒有信心，可以多看服裝雜誌或聽聽專櫃小姐的意見。",
       "vi": "Nếu bạn không tự tin vào gu ăn mặc của mình, có thể xem nhiều tạp chí thời trang hoặc nghe ý kiến của nhân viên quầy hàng.",
       "py": "Jiǎrú nǐ duì zìjǐ de chuānzhuó pǐnwèi méiyǒu xìnxīn, kěyǐ duō kàn fúzhuāng zázhì huò tīngtīng zhuānguìxiǎojiě de yìjiàn."
      },
      {
       "hz": "他是個有耐心、做事認真的人，假如讓他負責推銷新產品，應該會有不錯的成果。",
       "vi": "Anh ấy là người kiên nhẫn, làm việc chăm chỉ, nếu giao cho anh ấy phụ trách quảng bá sản phẩm mới thì chắc sẽ có kết quả tốt.",
       "py": "Tā shì gè yǒu nàixīn, zuòshì rènzhēn de rén, jiǎrú ràng tā fùzé tuīxiāo xīn chǎnpǐn, yīnggāi huì yǒu búcuò de chéngguǒ."
      },
      {
       "hz": "「為了」之後的短語說明要達到的目標，「而」後面的短語說明為了達到目標所做的事情。",
       "vi": "Cụm từ sau “為了” nêu mục tiêu cần đạt; cụm từ sau “而” nêu việc làm để đạt mục tiêu đó.",
       "py": "“Wèile” zhīhòu de duǎnyǔ shuōmíng yào dádào de mùbiāo, “ér” hòumiàn de duǎnyǔ shuōmíng wèile dádàomùbiāo suǒ zuò de shìqíng."
      },
      {
       "hz": "就在林伯伯為了健康而努力時，他的一位老朋友因為工作太累⋯⋯他為了挑戰臺灣最高的高山，而每天慢跑一小時，訓練自己的體力。",
       "vi": "Đúng lúc bác Lâm đang nỗ lực vì sức khoẻ thì một người bạn cũ của bác vì làm việc quá sức… Để chinh phục ngọn núi cao nhất Đài Loan, ngày nào anh ấy cũng chạy chậm một tiếng để rèn thể lực.",
       "py": "Jiù zài Lín bóbo wèile jiànkāng ér nǔlì shí, tā de yíwèi lǎopéngyǒu yīnwèi gōngzuò tài lèi…… tā wèile tiǎozhàn Táiwān zuìgāo de gāoshān, ér měitiān mànpǎo yì xiǎoshí, xùnliàn zìjǐ de tǐlì."
      },
      {
       "hz": "他為了讓生病的母親快點兒好起來，而學習做一些對身體健康有好處的菜。",
       "vi": "Để người mẹ đang ốm mau khoẻ lại, anh ấy học nấu những món tốt cho sức khoẻ.",
       "py": "Tā wèile ràng shēngbìng de mǔqīn kuàidiǎn'ér hǎo qǐlái, ér xuéxí zuò yìxiē duì shēntǐjiànkāng yǒu hǎochù de cài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "假如 — giả sử, nếu như",
   "giaiThich": "Giống 如果, 要是 dùng nêu giả thiết, thường đi với 就. Khác biệt: 如果 dùng được cả văn nói lẫn văn viết, đặt trước hoặc sau chủ ngữ; 要是 chỉ dùng văn nói; 假如 đặt TRƯỚC chủ ngữ và thiên về văn viết."
  }
 ],
 "td3-10.4": [
  {
   "title": "2. 只不過",
   "points": [
    {
     "label": null,
     "formula": "「只不過」是「只是」的意思，用來補充說明某件事，讓聽者更了解事情的情況。「只不過」的後面接要補充說明的內容。",
     "examples": [
      {
       "hz": "我早就想帶父母去做了，只不過他們覺得做健檢除了得花時間⋯⋯我很喜歡這輛英國車，只不過價格太高了，我得多存一點錢才買得起。",
       "vi": "Tôi đã muốn đưa bố mẹ đi khám từ lâu rồi, chẳng qua bố mẹ thấy đi khám sức khoẻ ngoài tốn thời gian ra… Tôi rất thích chiếc xe Anh này, chẳng qua giá cao quá, tôi phải tiết kiệm thêm mới mua nổi.",
       "py": "Wǒ zǎojiù xiǎng dài fùmǔ qù zuò le, zhǐbúguò tāmen juéde zuò jiàn jiǎn chúle děi huā shíjiān…… wǒ hěn xǐhuān zhèliàng Yīngguó chē, zhǐbúguò jiàgé tài gāo le, wǒ děi duō cún yìdiǎn qián cái mǎideqǐ."
      },
      {
       "hz": "他很想當背包客去非洲旅行，只不過公司的事情太多，實在走不開。",
       "vi": "Anh ấy rất muốn làm dân du lịch ba lô sang châu Phi, chẳng qua việc ở công ty nhiều quá, thật sự không đi được.",
       "py": "Tā hěn xiǎng dāng bēibāokè qù fēizhōu lǚxíng, zhǐbúguò gōngsī de shìqíng tài duō, shízài zǒubùkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只不過 — chẳng qua chỉ là",
   "giaiThich": "Nghĩa như 只是, dùng để nói thêm cho người nghe hiểu rõ tình hình; nội dung bổ sung đặt sau 只不過."
  },
  {
   "title": "3. 害",
   "points": [
    {
     "label": null,
     "formula": "這個「害」有「讓」或「使」的意思，語氣比較強烈。「害」的後面接負面的結果。",
     "examples": [
      {
       "hz": "⋯⋯他死也不肯去，害我擔心得不得了。",
       "vi": "…ông ấy chết cũng không chịu đi, khiến tôi lo lắng vô cùng.",
       "py": "…… tā sǐ yě bùkěn qù, hài wǒ dānxīn de bùdéle."
      },
      {
       "hz": "周先生爬山時迷了路，山上很偏僻，手機的訊號很弱，害他沒辦法跟家人聯絡。",
       "vi": "Anh Chu leo núi bị lạc đường, trên núi rất hẻo lánh, sóng điện thoại yếu, khiến anh không liên lạc được với gia đình.",
       "py": "Zhōu xiānshēng páshān shí mílelù, shānshàng hěn piānpì, shǒujī de xùnhào hěn ruò, hài tā méi bànfǎ gēn jiārén liánluò."
      },
      {
       "hz": "要是老師每天要求學生寫很多測驗題目，不僅對學習沒好處，也會害他們更討厭讀書。",
       "vi": "Nếu thầy giáo ngày nào cũng bắt học sinh làm nhiều bài trắc nghiệm, không những không có lợi cho việc học mà còn khiến các em càng ghét học hơn.",
       "py": "Yàoshì lǎoshī měitiān yāoqiú xuéshēng xiě hěnduō cèyàn tímù, bùjǐn duì xuéxí méi hǎochù, yě huì hài tāmen gèng tǎoyàn dúshū."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "害 — làm cho (điều xấu)",
   "giaiThich": "Nghĩa như 讓/使 nhưng giọng mạnh hơn, và phía sau LUÔN là kết quả tiêu cực."
  },
  {
   "title": "1. V到底",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "強調某件事做到最後，或堅持、努力到最後。",
       "vi": "Nhấn mạnh một việc được làm đến cùng, hoặc kiên trì, nỗ lực đến cuối cùng.",
       "py": "Qiángdiào mǒujiànshì zuòdào zuìhòu, huò jiānchí, nǔlì dào zuìhòu."
      },
      {
       "hz": "⋯⋯他都努力克服、堅持到底，終於擁有了今天的成就。",
       "vi": "…ông đều nỗ lực vượt qua, kiên trì đến cùng, cuối cùng đã có được thành tựu như hôm nay.",
       "py": "…… tā dōu nǔlì kèfú, jiānchídàodǐ, zhōngyú yǒngyǒu le jīntiān de chéngjiù."
      },
      {
       "hz": "既然我答應要幫你，就一定會幫到底的，請放心。",
       "vi": "Tôi đã hứa giúp bạn thì nhất định sẽ giúp đến cùng, bạn cứ yên tâm.",
       "py": "Jìrán wǒ dāyìng yào bāng nǐ, jiù yídìng huì bāng dàodǐ de, qǐng fàngxīn."
      },
      {
       "hz": "這個工作是你自己決定要做的，必須負責到底，不可以碰到麻煩就不做了。",
       "vi": "Công việc này là do bạn tự quyết định làm, phải chịu trách nhiệm đến cùng, không được gặp chuyện phiền phức là bỏ.",
       "py": "Zhège gōngzuò shì nǐ zìjǐ juédìng yào zuò de, bìxū fùzé dàodǐ, bù kěyǐ pèngdào máfán jiù bú zuò le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 到底 — làm tới cùng",
   "giaiThich": "Diễn đạt làm việc gì đó đến tận cùng, không bỏ dở."
  },
  {
   "title": "2. 一再",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示某個動作或事情一次又一次地發生。",
       "vi": "Diễn tả một hành động hay sự việc xảy ra hết lần này đến lần khác.",
       "py": "Biǎoshì mǒugè dòngzuò huò shìqíng yícì yòu yícì dì fāshēng."
      },
      {
       "hz": "他也一再警告林伯伯，別拿生命開玩笑⋯⋯李先生上班一再遲到，直到老闆叫他明天起別來了，他才知道事情有多麼嚴重。",
       "vi": "Ông ấy cũng nhiều lần cảnh báo bác Lâm đừng đem tính mạng ra đùa… Anh Lý đi làm muộn hết lần này đến lần khác, đến khi ông chủ bảo từ mai đừng đến nữa, anh ấy mới biết chuyện nghiêm trọng thế nào.",
       "py": "Tā yě yízài jǐnggào Lín bóbo, bié ná shēngmìng kāiwánxiào…… Lǐ xiānshēng shàngbān yízài chídào, zhídào lǎobǎn jiào tā míngtiān qǐ bié lái le, tā cái zhīdào shìqíng yǒu duōme yánzhòng."
      },
      {
       "hz": "選舉時市長一再向民眾強調，當選後一定會好好改善交通情況，但沒想到現在反而更嚴重了。",
       "vi": "Lúc tranh cử, thị trưởng nhiều lần khẳng định với người dân rằng đắc cử xong nhất định sẽ cải thiện tình hình giao thông, không ngờ bây giờ lại càng tệ hơn.",
       "py": "Xuǎnjǔ shí shìzhǎng yízài xiàng mínzhòng qiángdiào, dāngxuǎn hòu yídìng huì hǎohǎo gǎishàn jiāotōng qíngkuàng, dàn méixiǎngdào xiànzài fǎn'ér gèng yánzhòng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一再 — hết lần này tới lần khác",
   "giaiThich": "Phó từ, chỉ việc lặp đi lặp lại nhiều lần."
  },
  {
   "title": "3. 假如",
   "points": [
    {
     "label": null,
     "formula": "「假如」跟「如果」、「要是」一樣，用來假設某個條件或情況，常和「就」搭配使用，表示在假設條件或情況下發生的結果。「如果」可用在主語前後，可用於書面、口語；「要是」也可用在主語前後，但僅用於口語；「假如」用在主語前，多用於書面。",
     "examples": [
      {
       "hz": "⋯⋯假如不改變過去的生活方式，恐怕連上帝也救不了了。",
       "vi": "…nếu không thay đổi lối sống trước đây thì e là đến Thượng Đế cũng không cứu nổi.",
       "py": "…… jiǎrú bù gǎibiàn guòqù de shēnghuó fāngshì, kǒngpà lián shàngdì yě jiù bùliǎo le."
      },
      {
       "hz": "假如你對自己的穿著品味沒有信心，可以多看服裝雜誌或聽聽專櫃小姐的意見。",
       "vi": "Nếu bạn không tự tin vào gu ăn mặc của mình, có thể xem nhiều tạp chí thời trang hoặc nghe ý kiến của nhân viên quầy hàng.",
       "py": "Jiǎrú nǐ duì zìjǐ de chuānzhuó pǐnwèi méiyǒu xìnxīn, kěyǐ duō kàn fúzhuāng zázhì huò tīngtīng zhuānguìxiǎojiě de yìjiàn."
      },
      {
       "hz": "他是個有耐心、做事認真的人，假如讓他負責推銷新產品，應該會有不錯的成果。",
       "vi": "Anh ấy là người kiên nhẫn, làm việc chăm chỉ, nếu giao cho anh ấy phụ trách quảng bá sản phẩm mới thì chắc sẽ có kết quả tốt.",
       "py": "Tā shì gè yǒu nàixīn, zuòshì rènzhēn de rén, jiǎrú ràng tā fùzé tuīxiāo xīn chǎnpǐn, yīnggāi huì yǒu búcuò de chéngguǒ."
      },
      {
       "hz": "「為了」之後的短語說明要達到的目標，「而」後面的短語說明為了達到目標所做的事情。",
       "vi": "Cụm từ sau “為了” nêu mục tiêu cần đạt; cụm từ sau “而” nêu việc làm để đạt mục tiêu đó.",
       "py": "“Wèile” zhīhòu de duǎnyǔ shuōmíng yào dádào de mùbiāo, “ér” hòumiàn de duǎnyǔ shuōmíng wèile dádàomùbiāo suǒ zuò de shìqíng."
      },
      {
       "hz": "就在林伯伯為了健康而努力時，他的一位老朋友因為工作太累⋯⋯他為了挑戰臺灣最高的高山，而每天慢跑一小時，訓練自己的體力。",
       "vi": "Đúng lúc bác Lâm đang nỗ lực vì sức khoẻ thì một người bạn cũ của bác vì làm việc quá sức… Để chinh phục ngọn núi cao nhất Đài Loan, ngày nào anh ấy cũng chạy chậm một tiếng để rèn thể lực.",
       "py": "Jiù zài Lín bóbo wèile jiànkāng ér nǔlì shí, tā de yíwèi lǎopéngyǒu yīnwèi gōngzuò tài lèi…… tā wèile tiǎozhàn Táiwān zuìgāo de gāoshān, ér měitiān mànpǎo yì xiǎoshí, xùnliàn zìjǐ de tǐlì."
      },
      {
       "hz": "他為了讓生病的母親快點兒好起來，而學習做一些對身體健康有好處的菜。",
       "vi": "Để người mẹ đang ốm mau khoẻ lại, anh ấy học nấu những món tốt cho sức khoẻ.",
       "py": "Tā wèile ràng shēngbìng de mǔqīn kuàidiǎn'ér hǎo qǐlái, ér xuéxí zuò yìxiē duì shēntǐjiànkāng yǒu hǎochù de cài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "假如 — giả sử, nếu như",
   "giaiThich": "Giống 如果, 要是 dùng nêu giả thiết, thường đi với 就. Khác biệt: 如果 dùng được cả văn nói lẫn văn viết, đặt trước hoặc sau chủ ngữ; 要是 chỉ dùng văn nói; 假如 đặt TRƯỚC chủ ngữ và thiên về văn viết."
  }
 ],
 "td3-11.1": [
  {
   "title": "1. 透過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示經過某人、事物或某種行為，達到某種目的或結果。",
       "vi": "Diễn tả việc đạt được một mục đích hay kết quả nào đó thông qua một người, sự vật hoặc hành động nào đó.",
       "py": "Biǎoshì jīngguò mǒurén, shìwù huò mǒuzhǒng xíngwéi, dádào mǒuzhǒng mùdì huò jiéguǒ."
      },
      {
       "hz": "⋯⋯有個博士透過社群網站，認識了一個女網友⋯⋯人們習慣透過眼睛確認實際的情況，總是認為眼睛看到的就是對的。",
       "vi": "…có một tiến sĩ thông qua mạng xã hội quen một cô gái trên mạng… Người ta quen xác nhận tình hình thực tế thông qua đôi mắt, luôn cho rằng những gì mắt thấy là đúng.",
       "py": "…… yǒu gè bóshì tòuguò shèqún wǎngzhàn, rènshì le yígè nǚwǎngyǒu…… rénmen xíguàn tòuguò yǎnjīng quèrèn shíjì de qíngkuàng, zǒngshì rènwéi yǎnjīng kàndào de jiùshì duì de."
      },
      {
       "hz": "康教授認為透過團體活動的方式，能讓學生學習到溝通的技巧。",
       "vi": "Giáo sư Khang cho rằng thông qua hoạt động nhóm có thể giúp học sinh học được kỹ năng giao tiếp.",
       "py": "Kāng jiàoshòu rènwéi tòuguò tuántǐhuódòng de fāngshì, néng ràng xuéshēng xuéxí dào gōutōng de jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "透過 — thông qua",
   "giaiThich": "Nêu phương tiện, con đường để đạt mục đích (thông qua ai/cái gì mà làm được việc gì)."
  },
  {
   "title": "2. 以上 / 以下",
   "points": [
    {
     "label": null,
     "formula": "「以上」表示「超過」或「高於」某一點，同時也包含「某一點」，例如：「六十分以上及格」包括「六十分」。「以下」表示「低於」或「未達到」某一點。「以」與方位詞一起使用時，例如：以內、以外、以北、以南等，表示在某個一定的範圍。",
     "examples": [
      {
       "hz": "如果是兩萬塊以下，我可能願意借，十萬塊就太多了。",
       "vi": "Nếu từ hai vạn đồng trở xuống thì có thể tôi sẽ cho vay, mười vạn thì nhiều quá.",
       "py": "Rúguǒ shì liǎngwànkuài yǐxià, wǒ kěnéng yuànyì jiè, shíwànkuài jiù tài duō le."
      },
      {
       "hz": "教授說成績八十分以上的學生才能得到獎學金，我剛好八十分，太好了。",
       "vi": "Giáo sư nói học sinh đạt từ tám mươi điểm trở lên mới được học bổng, tôi vừa đúng tám mươi điểm, tuyệt quá.",
       "py": "Jiàoshòu shuō chéngjì bā shífēn yǐshàng de xuéshēng cáinéng dédào jiǎngxuéjīn, wǒ gānghǎo bā shífēn, tàihǎole."
      },
      {
       "hz": "那家網路商店為了吸引客人，只要購物一千元以上，就可以免費把商品送到家。",
       "vi": "Cửa hàng trực tuyến đó để thu hút khách, chỉ cần mua từ một nghìn đồng trở lên là được giao hàng tận nhà miễn phí.",
       "py": "Nà jiā wǎnglù shāngdiàn wèile xīyǐn kèrén, zhǐyào gòuwù yìqiānyuán yǐshàng, jiù kěyǐ miǎnfèi bǎ shāngpǐn sòngdào jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以上 / 以下 — trở lên / trở xuống",
   "giaiThich": "以上 là vượt quá hoặc cao hơn một mốc và BAO GỒM mốc đó (六十分以上及格 — từ 60 điểm là đậu). 以下 là thấp hơn, chưa tới mốc. 以 ghép với từ chỉ phương vị (以內, 以外, 以北, 以南) để giới hạn phạm vi."
  },
  {
   "title": "3. 看得起 / 看不起",
   "points": [
    {
     "label": null,
     "formula": "「看得起、看不起」表示對人的重視程度。「看得起」表示認為對方很重要；「看不起」有輕視對方的意思。第二冊第四課的語法「V 得起/V不起」表示一個人的經濟能力能否負擔。",
     "examples": [
      {
       "hz": "看得起 / 看不起",
       "vi": "coi trọng / coi thường",
       "py": "Kàndeqǐ / kànbùqǐ"
      },
      {
       "hz": "雖然我也看不起這種人，但網路交友的方式還是不錯的⋯⋯你不可以看不起窮人，因為我們每個人都是一樣的，不能以地位、成就的高低來決定對人的態度。",
       "vi": "Tuy tôi cũng coi thường loại người này, nhưng kết bạn qua mạng vẫn là một cách không tồi… Bạn không được coi thường người nghèo, vì ai trong chúng ta cũng như nhau, không thể dựa vào địa vị, thành tựu cao thấp để quyết định thái độ với người khác.",
       "py": "Suīrán wǒ yě kànbùqǐ zhèzhǒng rén, dàn wǎnglù jiāoyǒu de fāngshì háishì búcuò de…… nǐ bù kěyǐ kànbùqǐ qióngrén, yīnwèi wǒmen měigè rén dōu shì yíyàng de, bùnéng yǐ dìwèi, chéngjiù de gāodī lái juédìng duì rén de tàidù."
      },
      {
       "hz": "主管看得起你，才把管理工廠工人的工作交給你，你要把握這個機會好好地表現。",
       "vi": "Cấp trên coi trọng bạn nên mới giao cho bạn việc quản lý công nhân nhà máy, bạn phải nắm lấy cơ hội này để thể hiện thật tốt.",
       "py": "Zhǔguǎn kàndeqǐ nǐ, cái bǎ guǎnlǐ gōngchǎng gōngrén de gōngzuò jiāogěi nǐ, nǐ yào bǎwò zhège jīhuì hǎohǎo dì biǎoxiàn."
      },
      {
       "hz": "有了無線網路，就可以隨時隨地上網查資料、看影片，或是玩遊戲。",
       "vi": "Có wifi rồi thì lúc nào, ở đâu cũng có thể lên mạng tra tài liệu, xem video hoặc chơi game.",
       "py": "Yǒu le wúxiànwǎng lù, jiù kěyǐ suíshísuídì shàngwǎng cházīliào, kàn yǐngpiàn, huòshì wányóuxì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "看得起 / 看不起 — coi trọng / coi thường",
   "giaiThich": "Nói mức độ coi trọng một người: 看得起 là xem người đó quan trọng, 看不起 là khinh thường. Đừng nhầm với V得起/V不起 ở quyển 2 bài 4 — mẫu đó nói về khả năng CHI TRẢ."
  },
  {
   "title": "1. 卻",
   "points": [
    {
     "label": null,
     "formula": "「卻」作副詞，表示和事實或期望相反，放在主語後面、動詞前面，用來表示轉折。例如：他跟我約好在學校見面，等了半天，他卻沒來。",
     "examples": [
      {
       "hz": "某人已經五十歲了，在網路上卻說自己才二十歲⋯⋯小馬是我的網友，我對他不陌生，可是面對面接觸時，我們卻聊不到幾句話。",
       "vi": "Có người đã năm mươi tuổi, thế mà trên mạng lại nói mình mới hai mươi… Tiểu Mã là bạn trên mạng của tôi, tôi không thấy xa lạ với cậu ấy, vậy mà khi gặp mặt trực tiếp chúng tôi lại chẳng nói được mấy câu.",
       "py": "Mǒurén yǐjīng wǔshísuì le, zài wǎnglùshàng quèshuō zìjǐ cái èrshísuì…… xiǎomǎ shì wǒ de wǎngyǒu, wǒ duì tā bú mòshēng, kěshì miànduìmiàn jiēchù shí, wǒmen què liáo búdào jǐjùhuà."
      },
      {
       "hz": "警察通知我室友，他家人發生了車禍，我以為他會很緊張，沒想到卻很冷靜。",
       "vi": "Cảnh sát báo cho bạn cùng phòng tôi rằng người nhà cậu ấy gặp tai nạn giao thông, tôi tưởng cậu ấy sẽ rất hoảng, không ngờ lại rất bình tĩnh.",
       "py": "Jǐngchá tōngzhī wǒ shìyǒu, tā jiārén fāshēng le chēhuò, wǒ yǐwéi tā huì hěn jǐnzhāng, méixiǎngdào què hěn lěngjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "卻 — thế mà, nhưng lại",
   "giaiThich": "Phó từ chỉ sự trái ngược với thực tế hoặc mong đợi; đặt SAU chủ ngữ, TRƯỚC động từ."
  },
  {
   "title": "2. 對得起 / 對不起",
   "points": [
    {
     "label": null,
     "formula": "「對得起」表示沒做不好或不應該的事，沒讓對方失望、生氣、丟臉。「對不起」的意思跟「對得起」相反。「對得起/對不起」後面可接事情的對象，例如：對得起老闆、對得起自己、對不起朋友、對不起社會。",
     "examples": [
      {
       "hz": "對得起 / 對不起",
       "vi": "xứng đáng với / có lỗi với",
       "py": "Duìdeqǐ / duìbùqǐ"
      },
      {
       "hz": "⋯⋯那些騙子不僅可惡，還對不起社會。",
       "vi": "…những kẻ lừa đảo đó không những đáng ghét mà còn có lỗi với xã hội.",
       "py": "…… nàxiē piànzi bùjǐn kěwù, hái duìbùqǐ shèhuì."
      },
      {
       "hz": "李大華覺得父母工作很辛苦，要是他不好好讀書，怎麼對得起父母呢？",
       "vi": "Lý Đại Hoa thấy bố mẹ làm việc rất vất vả, nếu cậu ấy không chăm chỉ học thì sao xứng đáng với bố mẹ?",
       "py": "Lǐ dàhuá juéde fùmǔ gōngzuò hěn xīnkǔ, yàoshì tā bù hǎohǎo dúshū, zěnme duìdeqǐ fùmǔ ne?"
      },
      {
       "hz": "小陸常利用出差的機會，去夜店跟漂亮小姐約會，卻一點都不覺得對不起太太。",
       "vi": "Tiểu Lục hay tranh thủ đi công tác để đến hộp đêm hẹn hò với các cô gái xinh đẹp, thế mà chẳng thấy có lỗi gì với vợ.",
       "py": "Xiǎolù cháng lìyòng chūchāi de jīhuì, qù yè diàn gēn piàoliàng xiǎojiě yuēhuì, què yìdiǎn dōu bù juéde duìbùqǐ tàitai."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對得起 / 對不起 — xứng đáng với / có lỗi với",
   "giaiThich": "對得起 nghĩa không làm điều sai trái, không khiến người ta thất vọng; 對不起 thì ngược lại. Sau đó nêu đối tượng: 對得起自己, 對不起朋友."
  },
  {
   "title": "3. 至於",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「至於」當句子之間的轉折語，引出另一個與原來主題相關的話題或觀點。",
       "vi": "“至於” dùng làm từ chuyển ý giữa các câu, dẫn ra một chủ đề hoặc quan điểm khác liên quan đến chủ đề ban đầu.",
       "py": "“Zhìyú” dāng jùzi zhījiān de zhuǎnzhé yǔ, yǐnchū lìng yígè yǔ yuánlái zhǔtí xiāngguān de huàtí huò guāndiǎn."
      },
      {
       "hz": "網路只是提供一種更便利的交友方式給大家，至於要不要以網路交友⋯⋯那對情侶有結婚的打算，至於什麼時候舉行婚禮，還要問家長的意見。",
       "vi": "Mạng internet chỉ cung cấp cho mọi người một cách kết bạn tiện lợi hơn, còn có kết bạn qua mạng hay không thì… Đôi tình nhân đó có dự định kết hôn, còn khi nào tổ chức đám cưới thì phải hỏi ý kiến gia đình.",
       "py": "Wǎnglù zhǐshì tígōng yìzhǒng gèng biànlì de jiāoyǒu fāngshì gěi dàjiā, zhìyú yào búyào yǐ wǎnglù jiāoyǒu…… nà duì qínglǚ yǒu jiéhūn de dǎsuàn, zhìyú shénme shíhòu jǔxíng hūnlǐ, háiyào wèn jiāzhǎng de yìjiàn."
      },
      {
       "hz": "我只知道教育制度的改善計畫是夏教授帶領的，至於詳細內容就得問他本人了。",
       "vi": "Tôi chỉ biết kế hoạch cải thiện chế độ giáo dục do giáo sư Hạ dẫn dắt, còn nội dung chi tiết thì phải hỏi chính ông ấy.",
       "py": "Wǒ zhǐ zhīdào jiàoyù zhìdù de gǎishàn jìhuà shì Xià jiàoshòu dàilǐng de, zhìyú xiángxì nèiróng jiù děi wèn tā běnrén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至於 — còn về, đến như",
   "giaiThich": "Chuyển sang nói về một khía cạnh hoặc đối tượng khác vừa được nhắc tới."
  }
 ],
 "td3-11.2": [
  {
   "title": "1. 透過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示經過某人、事物或某種行為，達到某種目的或結果。",
       "vi": "Diễn tả việc đạt được một mục đích hay kết quả nào đó thông qua một người, sự vật hoặc hành động nào đó.",
       "py": "Biǎoshì jīngguò mǒurén, shìwù huò mǒuzhǒng xíngwéi, dádào mǒuzhǒng mùdì huò jiéguǒ."
      },
      {
       "hz": "⋯⋯有個博士透過社群網站，認識了一個女網友⋯⋯人們習慣透過眼睛確認實際的情況，總是認為眼睛看到的就是對的。",
       "vi": "…có một tiến sĩ thông qua mạng xã hội quen một cô gái trên mạng… Người ta quen xác nhận tình hình thực tế thông qua đôi mắt, luôn cho rằng những gì mắt thấy là đúng.",
       "py": "…… yǒu gè bóshì tòuguò shèqún wǎngzhàn, rènshì le yígè nǚwǎngyǒu…… rénmen xíguàn tòuguò yǎnjīng quèrèn shíjì de qíngkuàng, zǒngshì rènwéi yǎnjīng kàndào de jiùshì duì de."
      },
      {
       "hz": "康教授認為透過團體活動的方式，能讓學生學習到溝通的技巧。",
       "vi": "Giáo sư Khang cho rằng thông qua hoạt động nhóm có thể giúp học sinh học được kỹ năng giao tiếp.",
       "py": "Kāng jiàoshòu rènwéi tòuguò tuántǐhuódòng de fāngshì, néng ràng xuéshēng xuéxí dào gōutōng de jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "透過 — thông qua",
   "giaiThich": "Nêu phương tiện, con đường để đạt mục đích (thông qua ai/cái gì mà làm được việc gì)."
  },
  {
   "title": "2. 以上 / 以下",
   "points": [
    {
     "label": null,
     "formula": "「以上」表示「超過」或「高於」某一點，同時也包含「某一點」，例如：「六十分以上及格」包括「六十分」。「以下」表示「低於」或「未達到」某一點。「以」與方位詞一起使用時，例如：以內、以外、以北、以南等，表示在某個一定的範圍。",
     "examples": [
      {
       "hz": "如果是兩萬塊以下，我可能願意借，十萬塊就太多了。",
       "vi": "Nếu từ hai vạn đồng trở xuống thì có thể tôi sẽ cho vay, mười vạn thì nhiều quá.",
       "py": "Rúguǒ shì liǎngwànkuài yǐxià, wǒ kěnéng yuànyì jiè, shíwànkuài jiù tài duō le."
      },
      {
       "hz": "教授說成績八十分以上的學生才能得到獎學金，我剛好八十分，太好了。",
       "vi": "Giáo sư nói học sinh đạt từ tám mươi điểm trở lên mới được học bổng, tôi vừa đúng tám mươi điểm, tuyệt quá.",
       "py": "Jiàoshòu shuō chéngjì bā shífēn yǐshàng de xuéshēng cáinéng dédào jiǎngxuéjīn, wǒ gānghǎo bā shífēn, tàihǎole."
      },
      {
       "hz": "那家網路商店為了吸引客人，只要購物一千元以上，就可以免費把商品送到家。",
       "vi": "Cửa hàng trực tuyến đó để thu hút khách, chỉ cần mua từ một nghìn đồng trở lên là được giao hàng tận nhà miễn phí.",
       "py": "Nà jiā wǎnglù shāngdiàn wèile xīyǐn kèrén, zhǐyào gòuwù yìqiānyuán yǐshàng, jiù kěyǐ miǎnfèi bǎ shāngpǐn sòngdào jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以上 / 以下 — trở lên / trở xuống",
   "giaiThich": "以上 là vượt quá hoặc cao hơn một mốc và BAO GỒM mốc đó (六十分以上及格 — từ 60 điểm là đậu). 以下 là thấp hơn, chưa tới mốc. 以 ghép với từ chỉ phương vị (以內, 以外, 以北, 以南) để giới hạn phạm vi."
  },
  {
   "title": "3. 看得起 / 看不起",
   "points": [
    {
     "label": null,
     "formula": "「看得起、看不起」表示對人的重視程度。「看得起」表示認為對方很重要；「看不起」有輕視對方的意思。第二冊第四課的語法「V 得起/V不起」表示一個人的經濟能力能否負擔。",
     "examples": [
      {
       "hz": "看得起 / 看不起",
       "vi": "coi trọng / coi thường",
       "py": "Kàndeqǐ / kànbùqǐ"
      },
      {
       "hz": "雖然我也看不起這種人，但網路交友的方式還是不錯的⋯⋯你不可以看不起窮人，因為我們每個人都是一樣的，不能以地位、成就的高低來決定對人的態度。",
       "vi": "Tuy tôi cũng coi thường loại người này, nhưng kết bạn qua mạng vẫn là một cách không tồi… Bạn không được coi thường người nghèo, vì ai trong chúng ta cũng như nhau, không thể dựa vào địa vị, thành tựu cao thấp để quyết định thái độ với người khác.",
       "py": "Suīrán wǒ yě kànbùqǐ zhèzhǒng rén, dàn wǎnglù jiāoyǒu de fāngshì háishì búcuò de…… nǐ bù kěyǐ kànbùqǐ qióngrén, yīnwèi wǒmen měigè rén dōu shì yíyàng de, bùnéng yǐ dìwèi, chéngjiù de gāodī lái juédìng duì rén de tàidù."
      },
      {
       "hz": "主管看得起你，才把管理工廠工人的工作交給你，你要把握這個機會好好地表現。",
       "vi": "Cấp trên coi trọng bạn nên mới giao cho bạn việc quản lý công nhân nhà máy, bạn phải nắm lấy cơ hội này để thể hiện thật tốt.",
       "py": "Zhǔguǎn kàndeqǐ nǐ, cái bǎ guǎnlǐ gōngchǎng gōngrén de gōngzuò jiāogěi nǐ, nǐ yào bǎwò zhège jīhuì hǎohǎo dì biǎoxiàn."
      },
      {
       "hz": "有了無線網路，就可以隨時隨地上網查資料、看影片，或是玩遊戲。",
       "vi": "Có wifi rồi thì lúc nào, ở đâu cũng có thể lên mạng tra tài liệu, xem video hoặc chơi game.",
       "py": "Yǒu le wúxiànwǎng lù, jiù kěyǐ suíshísuídì shàngwǎng cházīliào, kàn yǐngpiàn, huòshì wányóuxì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "看得起 / 看不起 — coi trọng / coi thường",
   "giaiThich": "Nói mức độ coi trọng một người: 看得起 là xem người đó quan trọng, 看不起 là khinh thường. Đừng nhầm với V得起/V不起 ở quyển 2 bài 4 — mẫu đó nói về khả năng CHI TRẢ."
  },
  {
   "title": "1. 卻",
   "points": [
    {
     "label": null,
     "formula": "「卻」作副詞，表示和事實或期望相反，放在主語後面、動詞前面，用來表示轉折。例如：他跟我約好在學校見面，等了半天，他卻沒來。",
     "examples": [
      {
       "hz": "某人已經五十歲了，在網路上卻說自己才二十歲⋯⋯小馬是我的網友，我對他不陌生，可是面對面接觸時，我們卻聊不到幾句話。",
       "vi": "Có người đã năm mươi tuổi, thế mà trên mạng lại nói mình mới hai mươi… Tiểu Mã là bạn trên mạng của tôi, tôi không thấy xa lạ với cậu ấy, vậy mà khi gặp mặt trực tiếp chúng tôi lại chẳng nói được mấy câu.",
       "py": "Mǒurén yǐjīng wǔshísuì le, zài wǎnglùshàng quèshuō zìjǐ cái èrshísuì…… xiǎomǎ shì wǒ de wǎngyǒu, wǒ duì tā bú mòshēng, kěshì miànduìmiàn jiēchù shí, wǒmen què liáo búdào jǐjùhuà."
      },
      {
       "hz": "警察通知我室友，他家人發生了車禍，我以為他會很緊張，沒想到卻很冷靜。",
       "vi": "Cảnh sát báo cho bạn cùng phòng tôi rằng người nhà cậu ấy gặp tai nạn giao thông, tôi tưởng cậu ấy sẽ rất hoảng, không ngờ lại rất bình tĩnh.",
       "py": "Jǐngchá tōngzhī wǒ shìyǒu, tā jiārén fāshēng le chēhuò, wǒ yǐwéi tā huì hěn jǐnzhāng, méixiǎngdào què hěn lěngjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "卻 — thế mà, nhưng lại",
   "giaiThich": "Phó từ chỉ sự trái ngược với thực tế hoặc mong đợi; đặt SAU chủ ngữ, TRƯỚC động từ."
  },
  {
   "title": "2. 對得起 / 對不起",
   "points": [
    {
     "label": null,
     "formula": "「對得起」表示沒做不好或不應該的事，沒讓對方失望、生氣、丟臉。「對不起」的意思跟「對得起」相反。「對得起/對不起」後面可接事情的對象，例如：對得起老闆、對得起自己、對不起朋友、對不起社會。",
     "examples": [
      {
       "hz": "對得起 / 對不起",
       "vi": "xứng đáng với / có lỗi với",
       "py": "Duìdeqǐ / duìbùqǐ"
      },
      {
       "hz": "⋯⋯那些騙子不僅可惡，還對不起社會。",
       "vi": "…những kẻ lừa đảo đó không những đáng ghét mà còn có lỗi với xã hội.",
       "py": "…… nàxiē piànzi bùjǐn kěwù, hái duìbùqǐ shèhuì."
      },
      {
       "hz": "李大華覺得父母工作很辛苦，要是他不好好讀書，怎麼對得起父母呢？",
       "vi": "Lý Đại Hoa thấy bố mẹ làm việc rất vất vả, nếu cậu ấy không chăm chỉ học thì sao xứng đáng với bố mẹ?",
       "py": "Lǐ dàhuá juéde fùmǔ gōngzuò hěn xīnkǔ, yàoshì tā bù hǎohǎo dúshū, zěnme duìdeqǐ fùmǔ ne?"
      },
      {
       "hz": "小陸常利用出差的機會，去夜店跟漂亮小姐約會，卻一點都不覺得對不起太太。",
       "vi": "Tiểu Lục hay tranh thủ đi công tác để đến hộp đêm hẹn hò với các cô gái xinh đẹp, thế mà chẳng thấy có lỗi gì với vợ.",
       "py": "Xiǎolù cháng lìyòng chūchāi de jīhuì, qù yè diàn gēn piàoliàng xiǎojiě yuēhuì, què yìdiǎn dōu bù juéde duìbùqǐ tàitai."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對得起 / 對不起 — xứng đáng với / có lỗi với",
   "giaiThich": "對得起 nghĩa không làm điều sai trái, không khiến người ta thất vọng; 對不起 thì ngược lại. Sau đó nêu đối tượng: 對得起自己, 對不起朋友."
  },
  {
   "title": "3. 至於",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「至於」當句子之間的轉折語，引出另一個與原來主題相關的話題或觀點。",
       "vi": "“至於” dùng làm từ chuyển ý giữa các câu, dẫn ra một chủ đề hoặc quan điểm khác liên quan đến chủ đề ban đầu.",
       "py": "“Zhìyú” dāng jùzi zhījiān de zhuǎnzhé yǔ, yǐnchū lìng yígè yǔ yuánlái zhǔtí xiāngguān de huàtí huò guāndiǎn."
      },
      {
       "hz": "網路只是提供一種更便利的交友方式給大家，至於要不要以網路交友⋯⋯那對情侶有結婚的打算，至於什麼時候舉行婚禮，還要問家長的意見。",
       "vi": "Mạng internet chỉ cung cấp cho mọi người một cách kết bạn tiện lợi hơn, còn có kết bạn qua mạng hay không thì… Đôi tình nhân đó có dự định kết hôn, còn khi nào tổ chức đám cưới thì phải hỏi ý kiến gia đình.",
       "py": "Wǎnglù zhǐshì tígōng yìzhǒng gèng biànlì de jiāoyǒu fāngshì gěi dàjiā, zhìyú yào búyào yǐ wǎnglù jiāoyǒu…… nà duì qínglǚ yǒu jiéhūn de dǎsuàn, zhìyú shénme shíhòu jǔxíng hūnlǐ, háiyào wèn jiāzhǎng de yìjiàn."
      },
      {
       "hz": "我只知道教育制度的改善計畫是夏教授帶領的，至於詳細內容就得問他本人了。",
       "vi": "Tôi chỉ biết kế hoạch cải thiện chế độ giáo dục do giáo sư Hạ dẫn dắt, còn nội dung chi tiết thì phải hỏi chính ông ấy.",
       "py": "Wǒ zhǐ zhīdào jiàoyù zhìdù de gǎishàn jìhuà shì Xià jiàoshòu dàilǐng de, zhìyú xiángxì nèiróng jiù děi wèn tā běnrén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至於 — còn về, đến như",
   "giaiThich": "Chuyển sang nói về một khía cạnh hoặc đối tượng khác vừa được nhắc tới."
  }
 ],
 "td3-11.3": [
  {
   "title": "1. 透過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示經過某人、事物或某種行為，達到某種目的或結果。",
       "vi": "Diễn tả việc đạt được một mục đích hay kết quả nào đó thông qua một người, sự vật hoặc hành động nào đó.",
       "py": "Biǎoshì jīngguò mǒurén, shìwù huò mǒuzhǒng xíngwéi, dádào mǒuzhǒng mùdì huò jiéguǒ."
      },
      {
       "hz": "⋯⋯有個博士透過社群網站，認識了一個女網友⋯⋯人們習慣透過眼睛確認實際的情況，總是認為眼睛看到的就是對的。",
       "vi": "…có một tiến sĩ thông qua mạng xã hội quen một cô gái trên mạng… Người ta quen xác nhận tình hình thực tế thông qua đôi mắt, luôn cho rằng những gì mắt thấy là đúng.",
       "py": "…… yǒu gè bóshì tòuguò shèqún wǎngzhàn, rènshì le yígè nǚwǎngyǒu…… rénmen xíguàn tòuguò yǎnjīng quèrèn shíjì de qíngkuàng, zǒngshì rènwéi yǎnjīng kàndào de jiùshì duì de."
      },
      {
       "hz": "康教授認為透過團體活動的方式，能讓學生學習到溝通的技巧。",
       "vi": "Giáo sư Khang cho rằng thông qua hoạt động nhóm có thể giúp học sinh học được kỹ năng giao tiếp.",
       "py": "Kāng jiàoshòu rènwéi tòuguò tuántǐhuódòng de fāngshì, néng ràng xuéshēng xuéxí dào gōutōng de jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "透過 — thông qua",
   "giaiThich": "Nêu phương tiện, con đường để đạt mục đích (thông qua ai/cái gì mà làm được việc gì)."
  },
  {
   "title": "2. 以上 / 以下",
   "points": [
    {
     "label": null,
     "formula": "「以上」表示「超過」或「高於」某一點，同時也包含「某一點」，例如：「六十分以上及格」包括「六十分」。「以下」表示「低於」或「未達到」某一點。「以」與方位詞一起使用時，例如：以內、以外、以北、以南等，表示在某個一定的範圍。",
     "examples": [
      {
       "hz": "如果是兩萬塊以下，我可能願意借，十萬塊就太多了。",
       "vi": "Nếu từ hai vạn đồng trở xuống thì có thể tôi sẽ cho vay, mười vạn thì nhiều quá.",
       "py": "Rúguǒ shì liǎngwànkuài yǐxià, wǒ kěnéng yuànyì jiè, shíwànkuài jiù tài duō le."
      },
      {
       "hz": "教授說成績八十分以上的學生才能得到獎學金，我剛好八十分，太好了。",
       "vi": "Giáo sư nói học sinh đạt từ tám mươi điểm trở lên mới được học bổng, tôi vừa đúng tám mươi điểm, tuyệt quá.",
       "py": "Jiàoshòu shuō chéngjì bā shífēn yǐshàng de xuéshēng cáinéng dédào jiǎngxuéjīn, wǒ gānghǎo bā shífēn, tàihǎole."
      },
      {
       "hz": "那家網路商店為了吸引客人，只要購物一千元以上，就可以免費把商品送到家。",
       "vi": "Cửa hàng trực tuyến đó để thu hút khách, chỉ cần mua từ một nghìn đồng trở lên là được giao hàng tận nhà miễn phí.",
       "py": "Nà jiā wǎnglù shāngdiàn wèile xīyǐn kèrén, zhǐyào gòuwù yìqiānyuán yǐshàng, jiù kěyǐ miǎnfèi bǎ shāngpǐn sòngdào jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以上 / 以下 — trở lên / trở xuống",
   "giaiThich": "以上 là vượt quá hoặc cao hơn một mốc và BAO GỒM mốc đó (六十分以上及格 — từ 60 điểm là đậu). 以下 là thấp hơn, chưa tới mốc. 以 ghép với từ chỉ phương vị (以內, 以外, 以北, 以南) để giới hạn phạm vi."
  },
  {
   "title": "3. 看得起 / 看不起",
   "points": [
    {
     "label": null,
     "formula": "「看得起、看不起」表示對人的重視程度。「看得起」表示認為對方很重要；「看不起」有輕視對方的意思。第二冊第四課的語法「V 得起/V不起」表示一個人的經濟能力能否負擔。",
     "examples": [
      {
       "hz": "看得起 / 看不起",
       "vi": "coi trọng / coi thường",
       "py": "Kàndeqǐ / kànbùqǐ"
      },
      {
       "hz": "雖然我也看不起這種人，但網路交友的方式還是不錯的⋯⋯你不可以看不起窮人，因為我們每個人都是一樣的，不能以地位、成就的高低來決定對人的態度。",
       "vi": "Tuy tôi cũng coi thường loại người này, nhưng kết bạn qua mạng vẫn là một cách không tồi… Bạn không được coi thường người nghèo, vì ai trong chúng ta cũng như nhau, không thể dựa vào địa vị, thành tựu cao thấp để quyết định thái độ với người khác.",
       "py": "Suīrán wǒ yě kànbùqǐ zhèzhǒng rén, dàn wǎnglù jiāoyǒu de fāngshì háishì búcuò de…… nǐ bù kěyǐ kànbùqǐ qióngrén, yīnwèi wǒmen měigè rén dōu shì yíyàng de, bùnéng yǐ dìwèi, chéngjiù de gāodī lái juédìng duì rén de tàidù."
      },
      {
       "hz": "主管看得起你，才把管理工廠工人的工作交給你，你要把握這個機會好好地表現。",
       "vi": "Cấp trên coi trọng bạn nên mới giao cho bạn việc quản lý công nhân nhà máy, bạn phải nắm lấy cơ hội này để thể hiện thật tốt.",
       "py": "Zhǔguǎn kàndeqǐ nǐ, cái bǎ guǎnlǐ gōngchǎng gōngrén de gōngzuò jiāogěi nǐ, nǐ yào bǎwò zhège jīhuì hǎohǎo dì biǎoxiàn."
      },
      {
       "hz": "有了無線網路，就可以隨時隨地上網查資料、看影片，或是玩遊戲。",
       "vi": "Có wifi rồi thì lúc nào, ở đâu cũng có thể lên mạng tra tài liệu, xem video hoặc chơi game.",
       "py": "Yǒu le wúxiànwǎng lù, jiù kěyǐ suíshísuídì shàngwǎng cházīliào, kàn yǐngpiàn, huòshì wányóuxì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "看得起 / 看不起 — coi trọng / coi thường",
   "giaiThich": "Nói mức độ coi trọng một người: 看得起 là xem người đó quan trọng, 看不起 là khinh thường. Đừng nhầm với V得起/V不起 ở quyển 2 bài 4 — mẫu đó nói về khả năng CHI TRẢ."
  },
  {
   "title": "1. 卻",
   "points": [
    {
     "label": null,
     "formula": "「卻」作副詞，表示和事實或期望相反，放在主語後面、動詞前面，用來表示轉折。例如：他跟我約好在學校見面，等了半天，他卻沒來。",
     "examples": [
      {
       "hz": "某人已經五十歲了，在網路上卻說自己才二十歲⋯⋯小馬是我的網友，我對他不陌生，可是面對面接觸時，我們卻聊不到幾句話。",
       "vi": "Có người đã năm mươi tuổi, thế mà trên mạng lại nói mình mới hai mươi… Tiểu Mã là bạn trên mạng của tôi, tôi không thấy xa lạ với cậu ấy, vậy mà khi gặp mặt trực tiếp chúng tôi lại chẳng nói được mấy câu.",
       "py": "Mǒurén yǐjīng wǔshísuì le, zài wǎnglùshàng quèshuō zìjǐ cái èrshísuì…… xiǎomǎ shì wǒ de wǎngyǒu, wǒ duì tā bú mòshēng, kěshì miànduìmiàn jiēchù shí, wǒmen què liáo búdào jǐjùhuà."
      },
      {
       "hz": "警察通知我室友，他家人發生了車禍，我以為他會很緊張，沒想到卻很冷靜。",
       "vi": "Cảnh sát báo cho bạn cùng phòng tôi rằng người nhà cậu ấy gặp tai nạn giao thông, tôi tưởng cậu ấy sẽ rất hoảng, không ngờ lại rất bình tĩnh.",
       "py": "Jǐngchá tōngzhī wǒ shìyǒu, tā jiārén fāshēng le chēhuò, wǒ yǐwéi tā huì hěn jǐnzhāng, méixiǎngdào què hěn lěngjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "卻 — thế mà, nhưng lại",
   "giaiThich": "Phó từ chỉ sự trái ngược với thực tế hoặc mong đợi; đặt SAU chủ ngữ, TRƯỚC động từ."
  },
  {
   "title": "2. 對得起 / 對不起",
   "points": [
    {
     "label": null,
     "formula": "「對得起」表示沒做不好或不應該的事，沒讓對方失望、生氣、丟臉。「對不起」的意思跟「對得起」相反。「對得起/對不起」後面可接事情的對象，例如：對得起老闆、對得起自己、對不起朋友、對不起社會。",
     "examples": [
      {
       "hz": "對得起 / 對不起",
       "vi": "xứng đáng với / có lỗi với",
       "py": "Duìdeqǐ / duìbùqǐ"
      },
      {
       "hz": "⋯⋯那些騙子不僅可惡，還對不起社會。",
       "vi": "…những kẻ lừa đảo đó không những đáng ghét mà còn có lỗi với xã hội.",
       "py": "…… nàxiē piànzi bùjǐn kěwù, hái duìbùqǐ shèhuì."
      },
      {
       "hz": "李大華覺得父母工作很辛苦，要是他不好好讀書，怎麼對得起父母呢？",
       "vi": "Lý Đại Hoa thấy bố mẹ làm việc rất vất vả, nếu cậu ấy không chăm chỉ học thì sao xứng đáng với bố mẹ?",
       "py": "Lǐ dàhuá juéde fùmǔ gōngzuò hěn xīnkǔ, yàoshì tā bù hǎohǎo dúshū, zěnme duìdeqǐ fùmǔ ne?"
      },
      {
       "hz": "小陸常利用出差的機會，去夜店跟漂亮小姐約會，卻一點都不覺得對不起太太。",
       "vi": "Tiểu Lục hay tranh thủ đi công tác để đến hộp đêm hẹn hò với các cô gái xinh đẹp, thế mà chẳng thấy có lỗi gì với vợ.",
       "py": "Xiǎolù cháng lìyòng chūchāi de jīhuì, qù yè diàn gēn piàoliàng xiǎojiě yuēhuì, què yìdiǎn dōu bù juéde duìbùqǐ tàitai."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對得起 / 對不起 — xứng đáng với / có lỗi với",
   "giaiThich": "對得起 nghĩa không làm điều sai trái, không khiến người ta thất vọng; 對不起 thì ngược lại. Sau đó nêu đối tượng: 對得起自己, 對不起朋友."
  },
  {
   "title": "3. 至於",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「至於」當句子之間的轉折語，引出另一個與原來主題相關的話題或觀點。",
       "vi": "“至於” dùng làm từ chuyển ý giữa các câu, dẫn ra một chủ đề hoặc quan điểm khác liên quan đến chủ đề ban đầu.",
       "py": "“Zhìyú” dāng jùzi zhījiān de zhuǎnzhé yǔ, yǐnchū lìng yígè yǔ yuánlái zhǔtí xiāngguān de huàtí huò guāndiǎn."
      },
      {
       "hz": "網路只是提供一種更便利的交友方式給大家，至於要不要以網路交友⋯⋯那對情侶有結婚的打算，至於什麼時候舉行婚禮，還要問家長的意見。",
       "vi": "Mạng internet chỉ cung cấp cho mọi người một cách kết bạn tiện lợi hơn, còn có kết bạn qua mạng hay không thì… Đôi tình nhân đó có dự định kết hôn, còn khi nào tổ chức đám cưới thì phải hỏi ý kiến gia đình.",
       "py": "Wǎnglù zhǐshì tígōng yìzhǒng gèng biànlì de jiāoyǒu fāngshì gěi dàjiā, zhìyú yào búyào yǐ wǎnglù jiāoyǒu…… nà duì qínglǚ yǒu jiéhūn de dǎsuàn, zhìyú shénme shíhòu jǔxíng hūnlǐ, háiyào wèn jiāzhǎng de yìjiàn."
      },
      {
       "hz": "我只知道教育制度的改善計畫是夏教授帶領的，至於詳細內容就得問他本人了。",
       "vi": "Tôi chỉ biết kế hoạch cải thiện chế độ giáo dục do giáo sư Hạ dẫn dắt, còn nội dung chi tiết thì phải hỏi chính ông ấy.",
       "py": "Wǒ zhǐ zhīdào jiàoyù zhìdù de gǎishàn jìhuà shì Xià jiàoshòu dàilǐng de, zhìyú xiángxì nèiróng jiù děi wèn tā běnrén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至於 — còn về, đến như",
   "giaiThich": "Chuyển sang nói về một khía cạnh hoặc đối tượng khác vừa được nhắc tới."
  }
 ],
 "td3-11.4": [
  {
   "title": "1. 透過",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "表示經過某人、事物或某種行為，達到某種目的或結果。",
       "vi": "Diễn tả việc đạt được một mục đích hay kết quả nào đó thông qua một người, sự vật hoặc hành động nào đó.",
       "py": "Biǎoshì jīngguò mǒurén, shìwù huò mǒuzhǒng xíngwéi, dádào mǒuzhǒng mùdì huò jiéguǒ."
      },
      {
       "hz": "⋯⋯有個博士透過社群網站，認識了一個女網友⋯⋯人們習慣透過眼睛確認實際的情況，總是認為眼睛看到的就是對的。",
       "vi": "…có một tiến sĩ thông qua mạng xã hội quen một cô gái trên mạng… Người ta quen xác nhận tình hình thực tế thông qua đôi mắt, luôn cho rằng những gì mắt thấy là đúng.",
       "py": "…… yǒu gè bóshì tòuguò shèqún wǎngzhàn, rènshì le yígè nǚwǎngyǒu…… rénmen xíguàn tòuguò yǎnjīng quèrèn shíjì de qíngkuàng, zǒngshì rènwéi yǎnjīng kàndào de jiùshì duì de."
      },
      {
       "hz": "康教授認為透過團體活動的方式，能讓學生學習到溝通的技巧。",
       "vi": "Giáo sư Khang cho rằng thông qua hoạt động nhóm có thể giúp học sinh học được kỹ năng giao tiếp.",
       "py": "Kāng jiàoshòu rènwéi tòuguò tuántǐhuódòng de fāngshì, néng ràng xuéshēng xuéxí dào gōutōng de jìqiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "透過 — thông qua",
   "giaiThich": "Nêu phương tiện, con đường để đạt mục đích (thông qua ai/cái gì mà làm được việc gì)."
  },
  {
   "title": "2. 以上 / 以下",
   "points": [
    {
     "label": null,
     "formula": "「以上」表示「超過」或「高於」某一點，同時也包含「某一點」，例如：「六十分以上及格」包括「六十分」。「以下」表示「低於」或「未達到」某一點。「以」與方位詞一起使用時，例如：以內、以外、以北、以南等，表示在某個一定的範圍。",
     "examples": [
      {
       "hz": "如果是兩萬塊以下，我可能願意借，十萬塊就太多了。",
       "vi": "Nếu từ hai vạn đồng trở xuống thì có thể tôi sẽ cho vay, mười vạn thì nhiều quá.",
       "py": "Rúguǒ shì liǎngwànkuài yǐxià, wǒ kěnéng yuànyì jiè, shíwànkuài jiù tài duō le."
      },
      {
       "hz": "教授說成績八十分以上的學生才能得到獎學金，我剛好八十分，太好了。",
       "vi": "Giáo sư nói học sinh đạt từ tám mươi điểm trở lên mới được học bổng, tôi vừa đúng tám mươi điểm, tuyệt quá.",
       "py": "Jiàoshòu shuō chéngjì bā shífēn yǐshàng de xuéshēng cáinéng dédào jiǎngxuéjīn, wǒ gānghǎo bā shífēn, tàihǎole."
      },
      {
       "hz": "那家網路商店為了吸引客人，只要購物一千元以上，就可以免費把商品送到家。",
       "vi": "Cửa hàng trực tuyến đó để thu hút khách, chỉ cần mua từ một nghìn đồng trở lên là được giao hàng tận nhà miễn phí.",
       "py": "Nà jiā wǎnglù shāngdiàn wèile xīyǐn kèrén, zhǐyào gòuwù yìqiānyuán yǐshàng, jiù kěyǐ miǎnfèi bǎ shāngpǐn sòngdào jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "以上 / 以下 — trở lên / trở xuống",
   "giaiThich": "以上 là vượt quá hoặc cao hơn một mốc và BAO GỒM mốc đó (六十分以上及格 — từ 60 điểm là đậu). 以下 là thấp hơn, chưa tới mốc. 以 ghép với từ chỉ phương vị (以內, 以外, 以北, 以南) để giới hạn phạm vi."
  },
  {
   "title": "3. 看得起 / 看不起",
   "points": [
    {
     "label": null,
     "formula": "「看得起、看不起」表示對人的重視程度。「看得起」表示認為對方很重要；「看不起」有輕視對方的意思。第二冊第四課的語法「V 得起/V不起」表示一個人的經濟能力能否負擔。",
     "examples": [
      {
       "hz": "看得起 / 看不起",
       "vi": "coi trọng / coi thường",
       "py": "Kàndeqǐ / kànbùqǐ"
      },
      {
       "hz": "雖然我也看不起這種人，但網路交友的方式還是不錯的⋯⋯你不可以看不起窮人，因為我們每個人都是一樣的，不能以地位、成就的高低來決定對人的態度。",
       "vi": "Tuy tôi cũng coi thường loại người này, nhưng kết bạn qua mạng vẫn là một cách không tồi… Bạn không được coi thường người nghèo, vì ai trong chúng ta cũng như nhau, không thể dựa vào địa vị, thành tựu cao thấp để quyết định thái độ với người khác.",
       "py": "Suīrán wǒ yě kànbùqǐ zhèzhǒng rén, dàn wǎnglù jiāoyǒu de fāngshì háishì búcuò de…… nǐ bù kěyǐ kànbùqǐ qióngrén, yīnwèi wǒmen měigè rén dōu shì yíyàng de, bùnéng yǐ dìwèi, chéngjiù de gāodī lái juédìng duì rén de tàidù."
      },
      {
       "hz": "主管看得起你，才把管理工廠工人的工作交給你，你要把握這個機會好好地表現。",
       "vi": "Cấp trên coi trọng bạn nên mới giao cho bạn việc quản lý công nhân nhà máy, bạn phải nắm lấy cơ hội này để thể hiện thật tốt.",
       "py": "Zhǔguǎn kàndeqǐ nǐ, cái bǎ guǎnlǐ gōngchǎng gōngrén de gōngzuò jiāogěi nǐ, nǐ yào bǎwò zhège jīhuì hǎohǎo dì biǎoxiàn."
      },
      {
       "hz": "有了無線網路，就可以隨時隨地上網查資料、看影片，或是玩遊戲。",
       "vi": "Có wifi rồi thì lúc nào, ở đâu cũng có thể lên mạng tra tài liệu, xem video hoặc chơi game.",
       "py": "Yǒu le wúxiànwǎng lù, jiù kěyǐ suíshísuídì shàngwǎng cházīliào, kàn yǐngpiàn, huòshì wányóuxì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "看得起 / 看不起 — coi trọng / coi thường",
   "giaiThich": "Nói mức độ coi trọng một người: 看得起 là xem người đó quan trọng, 看不起 là khinh thường. Đừng nhầm với V得起/V不起 ở quyển 2 bài 4 — mẫu đó nói về khả năng CHI TRẢ."
  },
  {
   "title": "1. 卻",
   "points": [
    {
     "label": null,
     "formula": "「卻」作副詞，表示和事實或期望相反，放在主語後面、動詞前面，用來表示轉折。例如：他跟我約好在學校見面，等了半天，他卻沒來。",
     "examples": [
      {
       "hz": "某人已經五十歲了，在網路上卻說自己才二十歲⋯⋯小馬是我的網友，我對他不陌生，可是面對面接觸時，我們卻聊不到幾句話。",
       "vi": "Có người đã năm mươi tuổi, thế mà trên mạng lại nói mình mới hai mươi… Tiểu Mã là bạn trên mạng của tôi, tôi không thấy xa lạ với cậu ấy, vậy mà khi gặp mặt trực tiếp chúng tôi lại chẳng nói được mấy câu.",
       "py": "Mǒurén yǐjīng wǔshísuì le, zài wǎnglùshàng quèshuō zìjǐ cái èrshísuì…… xiǎomǎ shì wǒ de wǎngyǒu, wǒ duì tā bú mòshēng, kěshì miànduìmiàn jiēchù shí, wǒmen què liáo búdào jǐjùhuà."
      },
      {
       "hz": "警察通知我室友，他家人發生了車禍，我以為他會很緊張，沒想到卻很冷靜。",
       "vi": "Cảnh sát báo cho bạn cùng phòng tôi rằng người nhà cậu ấy gặp tai nạn giao thông, tôi tưởng cậu ấy sẽ rất hoảng, không ngờ lại rất bình tĩnh.",
       "py": "Jǐngchá tōngzhī wǒ shìyǒu, tā jiārén fāshēng le chēhuò, wǒ yǐwéi tā huì hěn jǐnzhāng, méixiǎngdào què hěn lěngjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "卻 — thế mà, nhưng lại",
   "giaiThich": "Phó từ chỉ sự trái ngược với thực tế hoặc mong đợi; đặt SAU chủ ngữ, TRƯỚC động từ."
  },
  {
   "title": "2. 對得起 / 對不起",
   "points": [
    {
     "label": null,
     "formula": "「對得起」表示沒做不好或不應該的事，沒讓對方失望、生氣、丟臉。「對不起」的意思跟「對得起」相反。「對得起/對不起」後面可接事情的對象，例如：對得起老闆、對得起自己、對不起朋友、對不起社會。",
     "examples": [
      {
       "hz": "對得起 / 對不起",
       "vi": "xứng đáng với / có lỗi với",
       "py": "Duìdeqǐ / duìbùqǐ"
      },
      {
       "hz": "⋯⋯那些騙子不僅可惡，還對不起社會。",
       "vi": "…những kẻ lừa đảo đó không những đáng ghét mà còn có lỗi với xã hội.",
       "py": "…… nàxiē piànzi bùjǐn kěwù, hái duìbùqǐ shèhuì."
      },
      {
       "hz": "李大華覺得父母工作很辛苦，要是他不好好讀書，怎麼對得起父母呢？",
       "vi": "Lý Đại Hoa thấy bố mẹ làm việc rất vất vả, nếu cậu ấy không chăm chỉ học thì sao xứng đáng với bố mẹ?",
       "py": "Lǐ dàhuá juéde fùmǔ gōngzuò hěn xīnkǔ, yàoshì tā bù hǎohǎo dúshū, zěnme duìdeqǐ fùmǔ ne?"
      },
      {
       "hz": "小陸常利用出差的機會，去夜店跟漂亮小姐約會，卻一點都不覺得對不起太太。",
       "vi": "Tiểu Lục hay tranh thủ đi công tác để đến hộp đêm hẹn hò với các cô gái xinh đẹp, thế mà chẳng thấy có lỗi gì với vợ.",
       "py": "Xiǎolù cháng lìyòng chūchāi de jīhuì, qù yè diàn gēn piàoliàng xiǎojiě yuēhuì, què yìdiǎn dōu bù juéde duìbùqǐ tàitai."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對得起 / 對不起 — xứng đáng với / có lỗi với",
   "giaiThich": "對得起 nghĩa không làm điều sai trái, không khiến người ta thất vọng; 對不起 thì ngược lại. Sau đó nêu đối tượng: 對得起自己, 對不起朋友."
  },
  {
   "title": "3. 至於",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「至於」當句子之間的轉折語，引出另一個與原來主題相關的話題或觀點。",
       "vi": "“至於” dùng làm từ chuyển ý giữa các câu, dẫn ra một chủ đề hoặc quan điểm khác liên quan đến chủ đề ban đầu.",
       "py": "“Zhìyú” dāng jùzi zhījiān de zhuǎnzhé yǔ, yǐnchū lìng yígè yǔ yuánlái zhǔtí xiāngguān de huàtí huò guāndiǎn."
      },
      {
       "hz": "網路只是提供一種更便利的交友方式給大家，至於要不要以網路交友⋯⋯那對情侶有結婚的打算，至於什麼時候舉行婚禮，還要問家長的意見。",
       "vi": "Mạng internet chỉ cung cấp cho mọi người một cách kết bạn tiện lợi hơn, còn có kết bạn qua mạng hay không thì… Đôi tình nhân đó có dự định kết hôn, còn khi nào tổ chức đám cưới thì phải hỏi ý kiến gia đình.",
       "py": "Wǎnglù zhǐshì tígōng yìzhǒng gèng biànlì de jiāoyǒu fāngshì gěi dàjiā, zhìyú yào búyào yǐ wǎnglù jiāoyǒu…… nà duì qínglǚ yǒu jiéhūn de dǎsuàn, zhìyú shénme shíhòu jǔxíng hūnlǐ, háiyào wèn jiāzhǎng de yìjiàn."
      },
      {
       "hz": "我只知道教育制度的改善計畫是夏教授帶領的，至於詳細內容就得問他本人了。",
       "vi": "Tôi chỉ biết kế hoạch cải thiện chế độ giáo dục do giáo sư Hạ dẫn dắt, còn nội dung chi tiết thì phải hỏi chính ông ấy.",
       "py": "Wǒ zhǐ zhīdào jiàoyù zhìdù de gǎishàn jìhuà shì Xià jiàoshòu dàilǐng de, zhìyú xiángxì nèiróng jiù děi wèn tā běnrén le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至於 — còn về, đến như",
   "giaiThich": "Chuyển sang nói về một khía cạnh hoặc đối tượng khác vừa được nhắc tới."
  }
 ],
 "td3-12.1": [
  {
   "title": "1. 這就⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「這」是「現在」的意思，「就」表示馬上，「這就」的後面接動詞或動詞短語，用來表示現在馬上做某事。 用來說明在某個範圍或某個情況下的情形。「在」和「方面」中間是該範圍或情況，後面的句子表示產生什麼樣的情形或進一步的說明。",
     "examples": [
      {
       "hz": "請坐一下，我這就通知經理。",
       "vi": "Mời ngồi một chút, tôi báo giám đốc ngay đây.",
       "py": "Qǐng zuò yíxià, wǒ zhè jiù tōngzhī jīnglǐ."
      },
      {
       "hz": "A：服務生，我點的是熱紅茶，不是冰咖啡。",
       "vi": "A: Phục vụ ơi, tôi gọi hồng trà nóng, không phải cà phê đá.",
       "py": "A: Fúwùshēng, wǒ diǎn de shì rè hóngchá, búshì bīng kāfēi."
      },
      {
       "hz": "B：對不起，我這就幫您換。",
       "vi": "B: Xin lỗi, tôi đổi cho anh ngay đây.",
       "py": "B: Duìbùqǐ, wǒ zhè jiù bāng nín huàn."
      },
      {
       "hz": "A：經理，孔老闆快到公司了。",
       "vi": "A: Giám đốc ơi, ông chủ Khổng sắp đến công ty rồi.",
       "py": "A: Jīnglǐ, Kǒng lǎobǎn kuài dào gōngsī le."
      },
      {
       "hz": "B：好，我這就到門口去歡迎他。",
       "vi": "B: Được, tôi ra cửa đón ông ấy ngay đây.",
       "py": "B: Hǎo, wǒ zhè jiù dào ménkǒu qù huānyíng tā."
      },
      {
       "hz": "這次我們要找的是銷售人員，你在這方面有經驗嗎？",
       "vi": "Lần này chúng tôi tìm nhân viên bán hàng, bạn có kinh nghiệm về mảng này không?",
       "py": "Zhècì wǒmen yào zhǎo de shì xiāoshòu rényuán, nǐ zài zhèfāngmiàn yǒu jīngyàn ma?"
      },
      {
       "hz": "在穿著方面，白小姐很有品味，身上穿的或手上戴的也都有個人的風格。",
       "vi": "Về mặt ăn mặc, cô Bạch rất có gu, đồ mặc trên người hay đeo trên tay đều mang phong cách riêng.",
       "py": "Zài chuānzhuó fāngmiàn, Bái xiǎojiě hěn yǒu pǐnwèi, shēnshàng chuān de huò shǒushàng dài de yě dōu yǒu gèrén de fēnggé."
      },
      {
       "hz": "小藍從小在網球方面就表現得非常好，長大之後一定能代表國家參加比賽。",
       "vi": "Tiểu Lam từ nhỏ đã thể hiện rất xuất sắc ở môn quần vợt, lớn lên nhất định sẽ được đại diện quốc gia đi thi đấu.",
       "py": "Xiǎo lán cóngxiǎo zài wǎngqiú fāngmiàn jiù biǎoxiàn de fēicháng hǎo, zhǎngdà zhīhòu yídìng néng dàibiǎo guójiā cānjiā bǐsài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這就… — bây giờ … ngay",
   "giaiThich": "這 nghĩa \"bây giờ\", 就 nghĩa \"ngay lập tức\"; sau đó là động từ, ý làm ngay tức thì. Bài cũng có 在……方面 (về mặt…)."
  },
  {
   "title": "3. 往往",
   "points": [
    {
     "label": null,
     "formula": "「往往」和「常常」都表示某種情況多次出現，但「往往」的用法限制較多： (1) 表示在一定的條件下，從過去到現在經常發生的經驗或情況，不能用在未發生的事情，而且有一定的規律。例如：過去十年，每到週末，只要天氣好，歐先生往往起床後就去慢跑。 (2) 「往往」用於一般的看法或事實，不能用在個人主觀的意願，例如：家庭教育非常重要，因為孩子做人做事的態度往往是被父母影響的。",
     "examples": [
      {
       "hz": "(3) 「往往」不能單用「往」一個字，而且前面不能加否定詞。例如不能說：＊湯先生不往往週末去打球。",
       "vi": "(3) “往往” không thể dùng riêng một chữ “往”, và phía trước không được thêm từ phủ định. Ví dụ không thể nói: *湯先生不往往週末去打球.",
       "py": "(3) “wǎngwǎng” bùnéng dān yòng “wǎng” yígè zì, érqiě qiánmiàn bùnéng jiā fǒudìngcí. Lìrú bùnéng shuō: ＊ Tāng xiānshēng bù wǎngwǎng zhōumò qù dǎqiú."
      },
      {
       "hz": "透過良好的溝通，往往能解決不必要的麻煩。",
       "vi": "Thông qua giao tiếp tốt, thường có thể giải quyết những phiền phức không cần thiết.",
       "py": "Tòuguò liánghǎo de gōutōng, wǎngwǎng néng jiějué búbìyào de máfán."
      },
      {
       "hz": "許多家長都會逼孩子念書，要不要去補習往往不是孩子能夠決定的。",
       "vi": "Nhiều phụ huynh ép con học, có đi học thêm hay không thường không phải do con quyết định.",
       "py": "Xǔduō jiāzhǎng dōu huì bī háizi niànshū, yào búyào qù bǔxí wǎngwǎng búshì háizi nénggòu juédìng de."
      },
      {
       "hz": "一般來說，夢想與真實生活往往有一段距離，不可能每次都夢想成真。",
       "vi": "Nói chung, ước mơ và cuộc sống thực thường có một khoảng cách, không thể lần nào ước mơ cũng thành hiện thực.",
       "py": "Yìbānláishuō, mèngxiǎng yǔ zhēnshí shēnghuó wǎngwǎng yǒu yíduànjùlí, bù kěnéng měicì dōu mèngxiǎngchéngzhēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "往往 — thường hay (theo quy luật)",
   "giaiThich": "往往 và 常常 đều chỉ việc xảy ra nhiều lần, nhưng 往往 chặt hơn: (1) chỉ kinh nghiệm/tình huống lặp lại có quy luật TỪ QUÁ KHỨ tới nay, không dùng cho việc chưa xảy ra; (2) dùng cho nhận định chung, không dùng cho ý muốn chủ quan của cá nhân."
  },
  {
   "title": "4. 有關⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「有關」常放在句首，連接事物或情況，後面的句子表示進一步地說明或建議。",
     "examples": [
      {
       "hz": "有關這方面的問題，會有相關人員來跟你詳細說明。",
       "vi": "Về vấn đề liên quan đến mảng này, sẽ có nhân viên phụ trách giải thích chi tiết cho bạn.",
       "py": "Yǒuguān zhèfāngmiàn de wèntí, huì yǒu xiāngguān rényuán lái gēn nǐ xiángxì shuōmíng."
      },
      {
       "hz": "有關那個明星吸毒的新聞，還要經過詳細地調查，才能確定是真是假。",
       "vi": "Tin tức về việc ngôi sao đó sử dụng ma tuý còn phải điều tra kỹ mới xác định được thật hay giả.",
       "py": "Yǒuguān nàge míngxīng xīdú de xīnwén, háiyào jīngguò xiángxì dì diàochá, cáinéng quèdìng shì zhēnshìjiǎ."
      },
      {
       "hz": "有關法律方面的問題，你最好請教專業律師，不要隨便相信網路上的說法。",
       "vi": "Về các vấn đề liên quan đến pháp luật, tốt nhất bạn nên hỏi luật sư chuyên nghiệp, đừng tuỳ tiện tin những gì nói trên mạng.",
       "py": "Yǒuguān fǎlǜ fāngmiàn de wèntí, nǐ zuìhǎo qǐngjiào zhuānyè lǜshī, búyào suíbiàn xiāngxìn wǎnglùshàng de shuōfǎ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有關… — về việc…, liên quan tới…",
   "giaiThich": "Thường đặt ở đầu câu, nêu chủ đề; vế sau đưa ra giải thích hoặc đề xuất."
  },
  {
   "title": "1. 儘管",
   "points": [
    {
     "label": null,
     "formula": "「儘管」是連詞，用在第一個句子的句首，主要用來描述事實或某件事的結論，與「雖然」的意思相近；後面的分句常用「可是、但是、還是、卻」，表示與前句的結果相反。",
     "examples": [
      {
       "hz": "儘管我不是第一次參加面試，但還是擔心表現不佳⋯⋯儘管他平時測驗的成績都不理想，卻不影響他對中文的興趣。",
       "vi": "Mặc dù không phải lần đầu đi phỏng vấn nhưng tôi vẫn lo thể hiện không tốt… Mặc dù điểm kiểm tra thường ngày của cậu ấy đều không lý tưởng, nhưng không ảnh hưởng đến hứng thú của cậu ấy với tiếng Trung.",
       "py": "Jǐnguǎn wǒ búshì dìyīcì cānjiā miànshì, dàn háishì dānxīn biǎoxiàn bù jiā…… jǐnguǎn tā píngshí cèyàn de chéngjì dōu bù lǐxiǎng, què bù yǐngxiǎng tā duì zhōngwén de xìngqù."
      },
      {
       "hz": "儘管已經下課了，張老師還是留在教室裡改作業，直到晚餐時間才離開。",
       "vi": "Mặc dù đã hết giờ học, thầy Trương vẫn ở lại lớp chấm bài, đến giờ ăn tối mới về.",
       "py": "Jǐnguǎn yǐjīng xiàkè le, Zhāng lǎoshī háishì liúzài jiàoshì lǐ gǎi zuòyè, zhídào wǎncān shíjiān cái líkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "儘管 — mặc dù",
   "giaiThich": "Liên từ đặt đầu vế thứ nhất, nêu sự thật hoặc kết luận, nghĩa gần 雖然; vế sau thường có 可是, 但是, 還是, 卻 để nêu điều trái ngược."
  },
  {
   "title": "2. 不論……都……",
   "points": [
    {
     "label": null,
     "formula": "用來表示雖然情況不同，但是最後的結果不因情況而受影響。「不論」的後面可搭配疑問詞、反義複合詞（例如：高低、大小、上下、左右、胖瘦、生死、長短、快慢等等）或 A not A 句，表示各種情況；「都」後面則是一定會出現的結果或事實。",
     "examples": [
      {
       "hz": "我認為不論主管有什麼要求，只要是合理的，員工都應該配合。",
       "vi": "Tôi cho rằng bất kể cấp trên yêu cầu gì, chỉ cần hợp lý thì nhân viên đều nên phối hợp.",
       "py": "Wǒ rènwéi búlùn zhǔguǎn yǒu shénme yāoqiú, zhǐyào shì hélǐ de, yuángōng dōu yīnggāi pèihé."
      },
      {
       "hz": "包老闆很堅持自己的想法，不論你說什麼，他都不會改變。",
       "vi": "Ông chủ Bao rất cố chấp với suy nghĩ của mình, bất kể bạn nói gì ông ấy cũng không thay đổi.",
       "py": "Bāo lǎobǎn hěn jiānchí zìjǐ de xiǎngfǎ, búlùn nǐ shuō shénme, tā dōu búhuì gǎibiàn."
      },
      {
       "hz": "不論你有升學或工作方面的問題，都可以請教紀伯伯，他一定能給你寶貴的意見。",
       "vi": "Bất kể bạn có vấn đề gì về học lên cao hay công việc đều có thể hỏi bác Kỷ, bác ấy chắc chắn sẽ cho bạn lời khuyên quý báu.",
       "py": "Búlùn nǐ yǒu shēngxué huò gōngzuò fāngmiàn de wèntí, dōu kěyǐ qǐngjiào Jì bóbo, tā yídìng néng gěi nǐ bǎoguì de yìjiàn."
      },
      {
       "hz": "我為了這次的比賽準備了很久，不論教練去不去，我都要參加。",
       "vi": "Tôi đã chuẩn bị cho cuộc thi này rất lâu, bất kể huấn luyện viên có đi hay không, tôi cũng sẽ tham gia.",
       "py": "Wǒ wèile zhècì de bǐsài zhǔnbèi le hěn jiǔ, búlùn jiàoliàn qùbúqù, wǒ dōu yào cānjiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不論… 都… — bất kể… đều…",
   "giaiThich": "Dù tình huống khác nhau thế nào thì kết quả vẫn không đổi. Sau 不論 có thể là từ để hỏi, cặp từ trái nghĩa (高低, 大小, 胖瘦…) hoặc dạng A-không-A; sau 都 là kết quả chắc chắn."
  }
 ],
 "td3-12.2": [
  {
   "title": "1. 這就⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「這」是「現在」的意思，「就」表示馬上，「這就」的後面接動詞或動詞短語，用來表示現在馬上做某事。 用來說明在某個範圍或某個情況下的情形。「在」和「方面」中間是該範圍或情況，後面的句子表示產生什麼樣的情形或進一步的說明。",
     "examples": [
      {
       "hz": "請坐一下，我這就通知經理。",
       "vi": "Mời ngồi một chút, tôi báo giám đốc ngay đây.",
       "py": "Qǐng zuò yíxià, wǒ zhè jiù tōngzhī jīnglǐ."
      },
      {
       "hz": "A：服務生，我點的是熱紅茶，不是冰咖啡。",
       "vi": "A: Phục vụ ơi, tôi gọi hồng trà nóng, không phải cà phê đá.",
       "py": "A: Fúwùshēng, wǒ diǎn de shì rè hóngchá, búshì bīng kāfēi."
      },
      {
       "hz": "B：對不起，我這就幫您換。",
       "vi": "B: Xin lỗi, tôi đổi cho anh ngay đây.",
       "py": "B: Duìbùqǐ, wǒ zhè jiù bāng nín huàn."
      },
      {
       "hz": "A：經理，孔老闆快到公司了。",
       "vi": "A: Giám đốc ơi, ông chủ Khổng sắp đến công ty rồi.",
       "py": "A: Jīnglǐ, Kǒng lǎobǎn kuài dào gōngsī le."
      },
      {
       "hz": "B：好，我這就到門口去歡迎他。",
       "vi": "B: Được, tôi ra cửa đón ông ấy ngay đây.",
       "py": "B: Hǎo, wǒ zhè jiù dào ménkǒu qù huānyíng tā."
      },
      {
       "hz": "這次我們要找的是銷售人員，你在這方面有經驗嗎？",
       "vi": "Lần này chúng tôi tìm nhân viên bán hàng, bạn có kinh nghiệm về mảng này không?",
       "py": "Zhècì wǒmen yào zhǎo de shì xiāoshòu rényuán, nǐ zài zhèfāngmiàn yǒu jīngyàn ma?"
      },
      {
       "hz": "在穿著方面，白小姐很有品味，身上穿的或手上戴的也都有個人的風格。",
       "vi": "Về mặt ăn mặc, cô Bạch rất có gu, đồ mặc trên người hay đeo trên tay đều mang phong cách riêng.",
       "py": "Zài chuānzhuó fāngmiàn, Bái xiǎojiě hěn yǒu pǐnwèi, shēnshàng chuān de huò shǒushàng dài de yě dōu yǒu gèrén de fēnggé."
      },
      {
       "hz": "小藍從小在網球方面就表現得非常好，長大之後一定能代表國家參加比賽。",
       "vi": "Tiểu Lam từ nhỏ đã thể hiện rất xuất sắc ở môn quần vợt, lớn lên nhất định sẽ được đại diện quốc gia đi thi đấu.",
       "py": "Xiǎo lán cóngxiǎo zài wǎngqiú fāngmiàn jiù biǎoxiàn de fēicháng hǎo, zhǎngdà zhīhòu yídìng néng dàibiǎo guójiā cānjiā bǐsài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這就… — bây giờ … ngay",
   "giaiThich": "這 nghĩa \"bây giờ\", 就 nghĩa \"ngay lập tức\"; sau đó là động từ, ý làm ngay tức thì. Bài cũng có 在……方面 (về mặt…)."
  },
  {
   "title": "3. 往往",
   "points": [
    {
     "label": null,
     "formula": "「往往」和「常常」都表示某種情況多次出現，但「往往」的用法限制較多： (1) 表示在一定的條件下，從過去到現在經常發生的經驗或情況，不能用在未發生的事情，而且有一定的規律。例如：過去十年，每到週末，只要天氣好，歐先生往往起床後就去慢跑。 (2) 「往往」用於一般的看法或事實，不能用在個人主觀的意願，例如：家庭教育非常重要，因為孩子做人做事的態度往往是被父母影響的。",
     "examples": [
      {
       "hz": "(3) 「往往」不能單用「往」一個字，而且前面不能加否定詞。例如不能說：＊湯先生不往往週末去打球。",
       "vi": "(3) “往往” không thể dùng riêng một chữ “往”, và phía trước không được thêm từ phủ định. Ví dụ không thể nói: *湯先生不往往週末去打球.",
       "py": "(3) “wǎngwǎng” bùnéng dān yòng “wǎng” yígè zì, érqiě qiánmiàn bùnéng jiā fǒudìngcí. Lìrú bùnéng shuō: ＊ Tāng xiānshēng bù wǎngwǎng zhōumò qù dǎqiú."
      },
      {
       "hz": "透過良好的溝通，往往能解決不必要的麻煩。",
       "vi": "Thông qua giao tiếp tốt, thường có thể giải quyết những phiền phức không cần thiết.",
       "py": "Tòuguò liánghǎo de gōutōng, wǎngwǎng néng jiějué búbìyào de máfán."
      },
      {
       "hz": "許多家長都會逼孩子念書，要不要去補習往往不是孩子能夠決定的。",
       "vi": "Nhiều phụ huynh ép con học, có đi học thêm hay không thường không phải do con quyết định.",
       "py": "Xǔduō jiāzhǎng dōu huì bī háizi niànshū, yào búyào qù bǔxí wǎngwǎng búshì háizi nénggòu juédìng de."
      },
      {
       "hz": "一般來說，夢想與真實生活往往有一段距離，不可能每次都夢想成真。",
       "vi": "Nói chung, ước mơ và cuộc sống thực thường có một khoảng cách, không thể lần nào ước mơ cũng thành hiện thực.",
       "py": "Yìbānláishuō, mèngxiǎng yǔ zhēnshí shēnghuó wǎngwǎng yǒu yíduànjùlí, bù kěnéng měicì dōu mèngxiǎngchéngzhēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "往往 — thường hay (theo quy luật)",
   "giaiThich": "往往 và 常常 đều chỉ việc xảy ra nhiều lần, nhưng 往往 chặt hơn: (1) chỉ kinh nghiệm/tình huống lặp lại có quy luật TỪ QUÁ KHỨ tới nay, không dùng cho việc chưa xảy ra; (2) dùng cho nhận định chung, không dùng cho ý muốn chủ quan của cá nhân."
  },
  {
   "title": "4. 有關⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「有關」常放在句首，連接事物或情況，後面的句子表示進一步地說明或建議。",
     "examples": [
      {
       "hz": "有關這方面的問題，會有相關人員來跟你詳細說明。",
       "vi": "Về vấn đề liên quan đến mảng này, sẽ có nhân viên phụ trách giải thích chi tiết cho bạn.",
       "py": "Yǒuguān zhèfāngmiàn de wèntí, huì yǒu xiāngguān rényuán lái gēn nǐ xiángxì shuōmíng."
      },
      {
       "hz": "有關那個明星吸毒的新聞，還要經過詳細地調查，才能確定是真是假。",
       "vi": "Tin tức về việc ngôi sao đó sử dụng ma tuý còn phải điều tra kỹ mới xác định được thật hay giả.",
       "py": "Yǒuguān nàge míngxīng xīdú de xīnwén, háiyào jīngguò xiángxì dì diàochá, cáinéng quèdìng shì zhēnshìjiǎ."
      },
      {
       "hz": "有關法律方面的問題，你最好請教專業律師，不要隨便相信網路上的說法。",
       "vi": "Về các vấn đề liên quan đến pháp luật, tốt nhất bạn nên hỏi luật sư chuyên nghiệp, đừng tuỳ tiện tin những gì nói trên mạng.",
       "py": "Yǒuguān fǎlǜ fāngmiàn de wèntí, nǐ zuìhǎo qǐngjiào zhuānyè lǜshī, búyào suíbiàn xiāngxìn wǎnglùshàng de shuōfǎ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有關… — về việc…, liên quan tới…",
   "giaiThich": "Thường đặt ở đầu câu, nêu chủ đề; vế sau đưa ra giải thích hoặc đề xuất."
  },
  {
   "title": "1. 儘管",
   "points": [
    {
     "label": null,
     "formula": "「儘管」是連詞，用在第一個句子的句首，主要用來描述事實或某件事的結論，與「雖然」的意思相近；後面的分句常用「可是、但是、還是、卻」，表示與前句的結果相反。",
     "examples": [
      {
       "hz": "儘管我不是第一次參加面試，但還是擔心表現不佳⋯⋯儘管他平時測驗的成績都不理想，卻不影響他對中文的興趣。",
       "vi": "Mặc dù không phải lần đầu đi phỏng vấn nhưng tôi vẫn lo thể hiện không tốt… Mặc dù điểm kiểm tra thường ngày của cậu ấy đều không lý tưởng, nhưng không ảnh hưởng đến hứng thú của cậu ấy với tiếng Trung.",
       "py": "Jǐnguǎn wǒ búshì dìyīcì cānjiā miànshì, dàn háishì dānxīn biǎoxiàn bù jiā…… jǐnguǎn tā píngshí cèyàn de chéngjì dōu bù lǐxiǎng, què bù yǐngxiǎng tā duì zhōngwén de xìngqù."
      },
      {
       "hz": "儘管已經下課了，張老師還是留在教室裡改作業，直到晚餐時間才離開。",
       "vi": "Mặc dù đã hết giờ học, thầy Trương vẫn ở lại lớp chấm bài, đến giờ ăn tối mới về.",
       "py": "Jǐnguǎn yǐjīng xiàkè le, Zhāng lǎoshī háishì liúzài jiàoshì lǐ gǎi zuòyè, zhídào wǎncān shíjiān cái líkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "儘管 — mặc dù",
   "giaiThich": "Liên từ đặt đầu vế thứ nhất, nêu sự thật hoặc kết luận, nghĩa gần 雖然; vế sau thường có 可是, 但是, 還是, 卻 để nêu điều trái ngược."
  },
  {
   "title": "2. 不論……都……",
   "points": [
    {
     "label": null,
     "formula": "用來表示雖然情況不同，但是最後的結果不因情況而受影響。「不論」的後面可搭配疑問詞、反義複合詞（例如：高低、大小、上下、左右、胖瘦、生死、長短、快慢等等）或 A not A 句，表示各種情況；「都」後面則是一定會出現的結果或事實。",
     "examples": [
      {
       "hz": "我認為不論主管有什麼要求，只要是合理的，員工都應該配合。",
       "vi": "Tôi cho rằng bất kể cấp trên yêu cầu gì, chỉ cần hợp lý thì nhân viên đều nên phối hợp.",
       "py": "Wǒ rènwéi búlùn zhǔguǎn yǒu shénme yāoqiú, zhǐyào shì hélǐ de, yuángōng dōu yīnggāi pèihé."
      },
      {
       "hz": "包老闆很堅持自己的想法，不論你說什麼，他都不會改變。",
       "vi": "Ông chủ Bao rất cố chấp với suy nghĩ của mình, bất kể bạn nói gì ông ấy cũng không thay đổi.",
       "py": "Bāo lǎobǎn hěn jiānchí zìjǐ de xiǎngfǎ, búlùn nǐ shuō shénme, tā dōu búhuì gǎibiàn."
      },
      {
       "hz": "不論你有升學或工作方面的問題，都可以請教紀伯伯，他一定能給你寶貴的意見。",
       "vi": "Bất kể bạn có vấn đề gì về học lên cao hay công việc đều có thể hỏi bác Kỷ, bác ấy chắc chắn sẽ cho bạn lời khuyên quý báu.",
       "py": "Búlùn nǐ yǒu shēngxué huò gōngzuò fāngmiàn de wèntí, dōu kěyǐ qǐngjiào Jì bóbo, tā yídìng néng gěi nǐ bǎoguì de yìjiàn."
      },
      {
       "hz": "我為了這次的比賽準備了很久，不論教練去不去，我都要參加。",
       "vi": "Tôi đã chuẩn bị cho cuộc thi này rất lâu, bất kể huấn luyện viên có đi hay không, tôi cũng sẽ tham gia.",
       "py": "Wǒ wèile zhècì de bǐsài zhǔnbèi le hěn jiǔ, búlùn jiàoliàn qùbúqù, wǒ dōu yào cānjiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不論… 都… — bất kể… đều…",
   "giaiThich": "Dù tình huống khác nhau thế nào thì kết quả vẫn không đổi. Sau 不論 có thể là từ để hỏi, cặp từ trái nghĩa (高低, 大小, 胖瘦…) hoặc dạng A-không-A; sau 都 là kết quả chắc chắn."
  }
 ],
 "td3-12.3": [
  {
   "title": "1. 這就⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「這」是「現在」的意思，「就」表示馬上，「這就」的後面接動詞或動詞短語，用來表示現在馬上做某事。 用來說明在某個範圍或某個情況下的情形。「在」和「方面」中間是該範圍或情況，後面的句子表示產生什麼樣的情形或進一步的說明。",
     "examples": [
      {
       "hz": "請坐一下，我這就通知經理。",
       "vi": "Mời ngồi một chút, tôi báo giám đốc ngay đây.",
       "py": "Qǐng zuò yíxià, wǒ zhè jiù tōngzhī jīnglǐ."
      },
      {
       "hz": "A：服務生，我點的是熱紅茶，不是冰咖啡。",
       "vi": "A: Phục vụ ơi, tôi gọi hồng trà nóng, không phải cà phê đá.",
       "py": "A: Fúwùshēng, wǒ diǎn de shì rè hóngchá, búshì bīng kāfēi."
      },
      {
       "hz": "B：對不起，我這就幫您換。",
       "vi": "B: Xin lỗi, tôi đổi cho anh ngay đây.",
       "py": "B: Duìbùqǐ, wǒ zhè jiù bāng nín huàn."
      },
      {
       "hz": "A：經理，孔老闆快到公司了。",
       "vi": "A: Giám đốc ơi, ông chủ Khổng sắp đến công ty rồi.",
       "py": "A: Jīnglǐ, Kǒng lǎobǎn kuài dào gōngsī le."
      },
      {
       "hz": "B：好，我這就到門口去歡迎他。",
       "vi": "B: Được, tôi ra cửa đón ông ấy ngay đây.",
       "py": "B: Hǎo, wǒ zhè jiù dào ménkǒu qù huānyíng tā."
      },
      {
       "hz": "這次我們要找的是銷售人員，你在這方面有經驗嗎？",
       "vi": "Lần này chúng tôi tìm nhân viên bán hàng, bạn có kinh nghiệm về mảng này không?",
       "py": "Zhècì wǒmen yào zhǎo de shì xiāoshòu rényuán, nǐ zài zhèfāngmiàn yǒu jīngyàn ma?"
      },
      {
       "hz": "在穿著方面，白小姐很有品味，身上穿的或手上戴的也都有個人的風格。",
       "vi": "Về mặt ăn mặc, cô Bạch rất có gu, đồ mặc trên người hay đeo trên tay đều mang phong cách riêng.",
       "py": "Zài chuānzhuó fāngmiàn, Bái xiǎojiě hěn yǒu pǐnwèi, shēnshàng chuān de huò shǒushàng dài de yě dōu yǒu gèrén de fēnggé."
      },
      {
       "hz": "小藍從小在網球方面就表現得非常好，長大之後一定能代表國家參加比賽。",
       "vi": "Tiểu Lam từ nhỏ đã thể hiện rất xuất sắc ở môn quần vợt, lớn lên nhất định sẽ được đại diện quốc gia đi thi đấu.",
       "py": "Xiǎo lán cóngxiǎo zài wǎngqiú fāngmiàn jiù biǎoxiàn de fēicháng hǎo, zhǎngdà zhīhòu yídìng néng dàibiǎo guójiā cānjiā bǐsài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這就… — bây giờ … ngay",
   "giaiThich": "這 nghĩa \"bây giờ\", 就 nghĩa \"ngay lập tức\"; sau đó là động từ, ý làm ngay tức thì. Bài cũng có 在……方面 (về mặt…)."
  },
  {
   "title": "3. 往往",
   "points": [
    {
     "label": null,
     "formula": "「往往」和「常常」都表示某種情況多次出現，但「往往」的用法限制較多： (1) 表示在一定的條件下，從過去到現在經常發生的經驗或情況，不能用在未發生的事情，而且有一定的規律。例如：過去十年，每到週末，只要天氣好，歐先生往往起床後就去慢跑。 (2) 「往往」用於一般的看法或事實，不能用在個人主觀的意願，例如：家庭教育非常重要，因為孩子做人做事的態度往往是被父母影響的。",
     "examples": [
      {
       "hz": "(3) 「往往」不能單用「往」一個字，而且前面不能加否定詞。例如不能說：＊湯先生不往往週末去打球。",
       "vi": "(3) “往往” không thể dùng riêng một chữ “往”, và phía trước không được thêm từ phủ định. Ví dụ không thể nói: *湯先生不往往週末去打球.",
       "py": "(3) “wǎngwǎng” bùnéng dān yòng “wǎng” yígè zì, érqiě qiánmiàn bùnéng jiā fǒudìngcí. Lìrú bùnéng shuō: ＊ Tāng xiānshēng bù wǎngwǎng zhōumò qù dǎqiú."
      },
      {
       "hz": "透過良好的溝通，往往能解決不必要的麻煩。",
       "vi": "Thông qua giao tiếp tốt, thường có thể giải quyết những phiền phức không cần thiết.",
       "py": "Tòuguò liánghǎo de gōutōng, wǎngwǎng néng jiějué búbìyào de máfán."
      },
      {
       "hz": "許多家長都會逼孩子念書，要不要去補習往往不是孩子能夠決定的。",
       "vi": "Nhiều phụ huynh ép con học, có đi học thêm hay không thường không phải do con quyết định.",
       "py": "Xǔduō jiāzhǎng dōu huì bī háizi niànshū, yào búyào qù bǔxí wǎngwǎng búshì háizi nénggòu juédìng de."
      },
      {
       "hz": "一般來說，夢想與真實生活往往有一段距離，不可能每次都夢想成真。",
       "vi": "Nói chung, ước mơ và cuộc sống thực thường có một khoảng cách, không thể lần nào ước mơ cũng thành hiện thực.",
       "py": "Yìbānláishuō, mèngxiǎng yǔ zhēnshí shēnghuó wǎngwǎng yǒu yíduànjùlí, bù kěnéng měicì dōu mèngxiǎngchéngzhēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "往往 — thường hay (theo quy luật)",
   "giaiThich": "往往 và 常常 đều chỉ việc xảy ra nhiều lần, nhưng 往往 chặt hơn: (1) chỉ kinh nghiệm/tình huống lặp lại có quy luật TỪ QUÁ KHỨ tới nay, không dùng cho việc chưa xảy ra; (2) dùng cho nhận định chung, không dùng cho ý muốn chủ quan của cá nhân."
  },
  {
   "title": "4. 有關⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「有關」常放在句首，連接事物或情況，後面的句子表示進一步地說明或建議。",
     "examples": [
      {
       "hz": "有關這方面的問題，會有相關人員來跟你詳細說明。",
       "vi": "Về vấn đề liên quan đến mảng này, sẽ có nhân viên phụ trách giải thích chi tiết cho bạn.",
       "py": "Yǒuguān zhèfāngmiàn de wèntí, huì yǒu xiāngguān rényuán lái gēn nǐ xiángxì shuōmíng."
      },
      {
       "hz": "有關那個明星吸毒的新聞，還要經過詳細地調查，才能確定是真是假。",
       "vi": "Tin tức về việc ngôi sao đó sử dụng ma tuý còn phải điều tra kỹ mới xác định được thật hay giả.",
       "py": "Yǒuguān nàge míngxīng xīdú de xīnwén, háiyào jīngguò xiángxì dì diàochá, cáinéng quèdìng shì zhēnshìjiǎ."
      },
      {
       "hz": "有關法律方面的問題，你最好請教專業律師，不要隨便相信網路上的說法。",
       "vi": "Về các vấn đề liên quan đến pháp luật, tốt nhất bạn nên hỏi luật sư chuyên nghiệp, đừng tuỳ tiện tin những gì nói trên mạng.",
       "py": "Yǒuguān fǎlǜ fāngmiàn de wèntí, nǐ zuìhǎo qǐngjiào zhuānyè lǜshī, búyào suíbiàn xiāngxìn wǎnglùshàng de shuōfǎ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有關… — về việc…, liên quan tới…",
   "giaiThich": "Thường đặt ở đầu câu, nêu chủ đề; vế sau đưa ra giải thích hoặc đề xuất."
  },
  {
   "title": "1. 儘管",
   "points": [
    {
     "label": null,
     "formula": "「儘管」是連詞，用在第一個句子的句首，主要用來描述事實或某件事的結論，與「雖然」的意思相近；後面的分句常用「可是、但是、還是、卻」，表示與前句的結果相反。",
     "examples": [
      {
       "hz": "儘管我不是第一次參加面試，但還是擔心表現不佳⋯⋯儘管他平時測驗的成績都不理想，卻不影響他對中文的興趣。",
       "vi": "Mặc dù không phải lần đầu đi phỏng vấn nhưng tôi vẫn lo thể hiện không tốt… Mặc dù điểm kiểm tra thường ngày của cậu ấy đều không lý tưởng, nhưng không ảnh hưởng đến hứng thú của cậu ấy với tiếng Trung.",
       "py": "Jǐnguǎn wǒ búshì dìyīcì cānjiā miànshì, dàn háishì dānxīn biǎoxiàn bù jiā…… jǐnguǎn tā píngshí cèyàn de chéngjì dōu bù lǐxiǎng, què bù yǐngxiǎng tā duì zhōngwén de xìngqù."
      },
      {
       "hz": "儘管已經下課了，張老師還是留在教室裡改作業，直到晚餐時間才離開。",
       "vi": "Mặc dù đã hết giờ học, thầy Trương vẫn ở lại lớp chấm bài, đến giờ ăn tối mới về.",
       "py": "Jǐnguǎn yǐjīng xiàkè le, Zhāng lǎoshī háishì liúzài jiàoshì lǐ gǎi zuòyè, zhídào wǎncān shíjiān cái líkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "儘管 — mặc dù",
   "giaiThich": "Liên từ đặt đầu vế thứ nhất, nêu sự thật hoặc kết luận, nghĩa gần 雖然; vế sau thường có 可是, 但是, 還是, 卻 để nêu điều trái ngược."
  },
  {
   "title": "2. 不論……都……",
   "points": [
    {
     "label": null,
     "formula": "用來表示雖然情況不同，但是最後的結果不因情況而受影響。「不論」的後面可搭配疑問詞、反義複合詞（例如：高低、大小、上下、左右、胖瘦、生死、長短、快慢等等）或 A not A 句，表示各種情況；「都」後面則是一定會出現的結果或事實。",
     "examples": [
      {
       "hz": "我認為不論主管有什麼要求，只要是合理的，員工都應該配合。",
       "vi": "Tôi cho rằng bất kể cấp trên yêu cầu gì, chỉ cần hợp lý thì nhân viên đều nên phối hợp.",
       "py": "Wǒ rènwéi búlùn zhǔguǎn yǒu shénme yāoqiú, zhǐyào shì hélǐ de, yuángōng dōu yīnggāi pèihé."
      },
      {
       "hz": "包老闆很堅持自己的想法，不論你說什麼，他都不會改變。",
       "vi": "Ông chủ Bao rất cố chấp với suy nghĩ của mình, bất kể bạn nói gì ông ấy cũng không thay đổi.",
       "py": "Bāo lǎobǎn hěn jiānchí zìjǐ de xiǎngfǎ, búlùn nǐ shuō shénme, tā dōu búhuì gǎibiàn."
      },
      {
       "hz": "不論你有升學或工作方面的問題，都可以請教紀伯伯，他一定能給你寶貴的意見。",
       "vi": "Bất kể bạn có vấn đề gì về học lên cao hay công việc đều có thể hỏi bác Kỷ, bác ấy chắc chắn sẽ cho bạn lời khuyên quý báu.",
       "py": "Búlùn nǐ yǒu shēngxué huò gōngzuò fāngmiàn de wèntí, dōu kěyǐ qǐngjiào Jì bóbo, tā yídìng néng gěi nǐ bǎoguì de yìjiàn."
      },
      {
       "hz": "我為了這次的比賽準備了很久，不論教練去不去，我都要參加。",
       "vi": "Tôi đã chuẩn bị cho cuộc thi này rất lâu, bất kể huấn luyện viên có đi hay không, tôi cũng sẽ tham gia.",
       "py": "Wǒ wèile zhècì de bǐsài zhǔnbèi le hěn jiǔ, búlùn jiàoliàn qùbúqù, wǒ dōu yào cānjiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不論… 都… — bất kể… đều…",
   "giaiThich": "Dù tình huống khác nhau thế nào thì kết quả vẫn không đổi. Sau 不論 có thể là từ để hỏi, cặp từ trái nghĩa (高低, 大小, 胖瘦…) hoặc dạng A-không-A; sau 都 là kết quả chắc chắn."
  }
 ],
 "td3-12.4": [
  {
   "title": "1. 這就⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「這」是「現在」的意思，「就」表示馬上，「這就」的後面接動詞或動詞短語，用來表示現在馬上做某事。 用來說明在某個範圍或某個情況下的情形。「在」和「方面」中間是該範圍或情況，後面的句子表示產生什麼樣的情形或進一步的說明。",
     "examples": [
      {
       "hz": "請坐一下，我這就通知經理。",
       "vi": "Mời ngồi một chút, tôi báo giám đốc ngay đây.",
       "py": "Qǐng zuò yíxià, wǒ zhè jiù tōngzhī jīnglǐ."
      },
      {
       "hz": "A：服務生，我點的是熱紅茶，不是冰咖啡。",
       "vi": "A: Phục vụ ơi, tôi gọi hồng trà nóng, không phải cà phê đá.",
       "py": "A: Fúwùshēng, wǒ diǎn de shì rè hóngchá, búshì bīng kāfēi."
      },
      {
       "hz": "B：對不起，我這就幫您換。",
       "vi": "B: Xin lỗi, tôi đổi cho anh ngay đây.",
       "py": "B: Duìbùqǐ, wǒ zhè jiù bāng nín huàn."
      },
      {
       "hz": "A：經理，孔老闆快到公司了。",
       "vi": "A: Giám đốc ơi, ông chủ Khổng sắp đến công ty rồi.",
       "py": "A: Jīnglǐ, Kǒng lǎobǎn kuài dào gōngsī le."
      },
      {
       "hz": "B：好，我這就到門口去歡迎他。",
       "vi": "B: Được, tôi ra cửa đón ông ấy ngay đây.",
       "py": "B: Hǎo, wǒ zhè jiù dào ménkǒu qù huānyíng tā."
      },
      {
       "hz": "這次我們要找的是銷售人員，你在這方面有經驗嗎？",
       "vi": "Lần này chúng tôi tìm nhân viên bán hàng, bạn có kinh nghiệm về mảng này không?",
       "py": "Zhècì wǒmen yào zhǎo de shì xiāoshòu rényuán, nǐ zài zhèfāngmiàn yǒu jīngyàn ma?"
      },
      {
       "hz": "在穿著方面，白小姐很有品味，身上穿的或手上戴的也都有個人的風格。",
       "vi": "Về mặt ăn mặc, cô Bạch rất có gu, đồ mặc trên người hay đeo trên tay đều mang phong cách riêng.",
       "py": "Zài chuānzhuó fāngmiàn, Bái xiǎojiě hěn yǒu pǐnwèi, shēnshàng chuān de huò shǒushàng dài de yě dōu yǒu gèrén de fēnggé."
      },
      {
       "hz": "小藍從小在網球方面就表現得非常好，長大之後一定能代表國家參加比賽。",
       "vi": "Tiểu Lam từ nhỏ đã thể hiện rất xuất sắc ở môn quần vợt, lớn lên nhất định sẽ được đại diện quốc gia đi thi đấu.",
       "py": "Xiǎo lán cóngxiǎo zài wǎngqiú fāngmiàn jiù biǎoxiàn de fēicháng hǎo, zhǎngdà zhīhòu yídìng néng dàibiǎo guójiā cānjiā bǐsài."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這就… — bây giờ … ngay",
   "giaiThich": "這 nghĩa \"bây giờ\", 就 nghĩa \"ngay lập tức\"; sau đó là động từ, ý làm ngay tức thì. Bài cũng có 在……方面 (về mặt…)."
  },
  {
   "title": "3. 往往",
   "points": [
    {
     "label": null,
     "formula": "「往往」和「常常」都表示某種情況多次出現，但「往往」的用法限制較多： (1) 表示在一定的條件下，從過去到現在經常發生的經驗或情況，不能用在未發生的事情，而且有一定的規律。例如：過去十年，每到週末，只要天氣好，歐先生往往起床後就去慢跑。 (2) 「往往」用於一般的看法或事實，不能用在個人主觀的意願，例如：家庭教育非常重要，因為孩子做人做事的態度往往是被父母影響的。",
     "examples": [
      {
       "hz": "(3) 「往往」不能單用「往」一個字，而且前面不能加否定詞。例如不能說：＊湯先生不往往週末去打球。",
       "vi": "(3) “往往” không thể dùng riêng một chữ “往”, và phía trước không được thêm từ phủ định. Ví dụ không thể nói: *湯先生不往往週末去打球.",
       "py": "(3) “wǎngwǎng” bùnéng dān yòng “wǎng” yígè zì, érqiě qiánmiàn bùnéng jiā fǒudìngcí. Lìrú bùnéng shuō: ＊ Tāng xiānshēng bù wǎngwǎng zhōumò qù dǎqiú."
      },
      {
       "hz": "透過良好的溝通，往往能解決不必要的麻煩。",
       "vi": "Thông qua giao tiếp tốt, thường có thể giải quyết những phiền phức không cần thiết.",
       "py": "Tòuguò liánghǎo de gōutōng, wǎngwǎng néng jiějué búbìyào de máfán."
      },
      {
       "hz": "許多家長都會逼孩子念書，要不要去補習往往不是孩子能夠決定的。",
       "vi": "Nhiều phụ huynh ép con học, có đi học thêm hay không thường không phải do con quyết định.",
       "py": "Xǔduō jiāzhǎng dōu huì bī háizi niànshū, yào búyào qù bǔxí wǎngwǎng búshì háizi nénggòu juédìng de."
      },
      {
       "hz": "一般來說，夢想與真實生活往往有一段距離，不可能每次都夢想成真。",
       "vi": "Nói chung, ước mơ và cuộc sống thực thường có một khoảng cách, không thể lần nào ước mơ cũng thành hiện thực.",
       "py": "Yìbānláishuō, mèngxiǎng yǔ zhēnshí shēnghuó wǎngwǎng yǒu yíduànjùlí, bù kěnéng měicì dōu mèngxiǎngchéngzhēn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "往往 — thường hay (theo quy luật)",
   "giaiThich": "往往 và 常常 đều chỉ việc xảy ra nhiều lần, nhưng 往往 chặt hơn: (1) chỉ kinh nghiệm/tình huống lặp lại có quy luật TỪ QUÁ KHỨ tới nay, không dùng cho việc chưa xảy ra; (2) dùng cho nhận định chung, không dùng cho ý muốn chủ quan của cá nhân."
  },
  {
   "title": "4. 有關⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「有關」常放在句首，連接事物或情況，後面的句子表示進一步地說明或建議。",
     "examples": [
      {
       "hz": "有關這方面的問題，會有相關人員來跟你詳細說明。",
       "vi": "Về vấn đề liên quan đến mảng này, sẽ có nhân viên phụ trách giải thích chi tiết cho bạn.",
       "py": "Yǒuguān zhèfāngmiàn de wèntí, huì yǒu xiāngguān rényuán lái gēn nǐ xiángxì shuōmíng."
      },
      {
       "hz": "有關那個明星吸毒的新聞，還要經過詳細地調查，才能確定是真是假。",
       "vi": "Tin tức về việc ngôi sao đó sử dụng ma tuý còn phải điều tra kỹ mới xác định được thật hay giả.",
       "py": "Yǒuguān nàge míngxīng xīdú de xīnwén, háiyào jīngguò xiángxì dì diàochá, cáinéng quèdìng shì zhēnshìjiǎ."
      },
      {
       "hz": "有關法律方面的問題，你最好請教專業律師，不要隨便相信網路上的說法。",
       "vi": "Về các vấn đề liên quan đến pháp luật, tốt nhất bạn nên hỏi luật sư chuyên nghiệp, đừng tuỳ tiện tin những gì nói trên mạng.",
       "py": "Yǒuguān fǎlǜ fāngmiàn de wèntí, nǐ zuìhǎo qǐngjiào zhuānyè lǜshī, búyào suíbiàn xiāngxìn wǎnglùshàng de shuōfǎ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "有關… — về việc…, liên quan tới…",
   "giaiThich": "Thường đặt ở đầu câu, nêu chủ đề; vế sau đưa ra giải thích hoặc đề xuất."
  },
  {
   "title": "1. 儘管",
   "points": [
    {
     "label": null,
     "formula": "「儘管」是連詞，用在第一個句子的句首，主要用來描述事實或某件事的結論，與「雖然」的意思相近；後面的分句常用「可是、但是、還是、卻」，表示與前句的結果相反。",
     "examples": [
      {
       "hz": "儘管我不是第一次參加面試，但還是擔心表現不佳⋯⋯儘管他平時測驗的成績都不理想，卻不影響他對中文的興趣。",
       "vi": "Mặc dù không phải lần đầu đi phỏng vấn nhưng tôi vẫn lo thể hiện không tốt… Mặc dù điểm kiểm tra thường ngày của cậu ấy đều không lý tưởng, nhưng không ảnh hưởng đến hứng thú của cậu ấy với tiếng Trung.",
       "py": "Jǐnguǎn wǒ búshì dìyīcì cānjiā miànshì, dàn háishì dānxīn biǎoxiàn bù jiā…… jǐnguǎn tā píngshí cèyàn de chéngjì dōu bù lǐxiǎng, què bù yǐngxiǎng tā duì zhōngwén de xìngqù."
      },
      {
       "hz": "儘管已經下課了，張老師還是留在教室裡改作業，直到晚餐時間才離開。",
       "vi": "Mặc dù đã hết giờ học, thầy Trương vẫn ở lại lớp chấm bài, đến giờ ăn tối mới về.",
       "py": "Jǐnguǎn yǐjīng xiàkè le, Zhāng lǎoshī háishì liúzài jiàoshì lǐ gǎi zuòyè, zhídào wǎncān shíjiān cái líkāi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "儘管 — mặc dù",
   "giaiThich": "Liên từ đặt đầu vế thứ nhất, nêu sự thật hoặc kết luận, nghĩa gần 雖然; vế sau thường có 可是, 但是, 還是, 卻 để nêu điều trái ngược."
  },
  {
   "title": "2. 不論……都……",
   "points": [
    {
     "label": null,
     "formula": "用來表示雖然情況不同，但是最後的結果不因情況而受影響。「不論」的後面可搭配疑問詞、反義複合詞（例如：高低、大小、上下、左右、胖瘦、生死、長短、快慢等等）或 A not A 句，表示各種情況；「都」後面則是一定會出現的結果或事實。",
     "examples": [
      {
       "hz": "我認為不論主管有什麼要求，只要是合理的，員工都應該配合。",
       "vi": "Tôi cho rằng bất kể cấp trên yêu cầu gì, chỉ cần hợp lý thì nhân viên đều nên phối hợp.",
       "py": "Wǒ rènwéi búlùn zhǔguǎn yǒu shénme yāoqiú, zhǐyào shì hélǐ de, yuángōng dōu yīnggāi pèihé."
      },
      {
       "hz": "包老闆很堅持自己的想法，不論你說什麼，他都不會改變。",
       "vi": "Ông chủ Bao rất cố chấp với suy nghĩ của mình, bất kể bạn nói gì ông ấy cũng không thay đổi.",
       "py": "Bāo lǎobǎn hěn jiānchí zìjǐ de xiǎngfǎ, búlùn nǐ shuō shénme, tā dōu búhuì gǎibiàn."
      },
      {
       "hz": "不論你有升學或工作方面的問題，都可以請教紀伯伯，他一定能給你寶貴的意見。",
       "vi": "Bất kể bạn có vấn đề gì về học lên cao hay công việc đều có thể hỏi bác Kỷ, bác ấy chắc chắn sẽ cho bạn lời khuyên quý báu.",
       "py": "Búlùn nǐ yǒu shēngxué huò gōngzuò fāngmiàn de wèntí, dōu kěyǐ qǐngjiào Jì bóbo, tā yídìng néng gěi nǐ bǎoguì de yìjiàn."
      },
      {
       "hz": "我為了這次的比賽準備了很久，不論教練去不去，我都要參加。",
       "vi": "Tôi đã chuẩn bị cho cuộc thi này rất lâu, bất kể huấn luyện viên có đi hay không, tôi cũng sẽ tham gia.",
       "py": "Wǒ wèile zhècì de bǐsài zhǔnbèi le hěn jiǔ, búlùn jiàoliàn qùbúqù, wǒ dōu yào cānjiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不論… 都… — bất kể… đều…",
   "giaiThich": "Dù tình huống khác nhau thế nào thì kết quả vẫn không đổi. Sau 不論 có thể là từ để hỏi, cặp từ trái nghĩa (高低, 大小, 胖瘦…) hoặc dạng A-không-A; sau 都 là kết quả chắc chắn."
  }
 ],
 "td3-13.1": [
  {
   "title": "1. 這下子",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在對話中說到某件事情或情況，說話的人表達自己的看法，也可以是自己面對突然發生的情況，當下做出的反應。",
       "vi": "Trong hội thoại, khi nói đến một việc hay tình huống, người nói bày tỏ suy nghĩ của mình, cũng có thể là phản ứng tức thời khi gặp tình huống bất ngờ.",
       "py": "Zài duìhuà zhōng shuō dào mǒujiànshì qíng huò qíngkuàng, shuōhuà de rén biǎodá zìjǐ de kànfǎ, yě kěyǐ shì zìjǐ miànduì tūrán fāshēng de qíngkuàng, dāngxià zuòchū de fǎnyìng."
      },
      {
       "hz": "我那時候想，這下子沒辦法報告了，還好同學說雲端上也有一份⋯⋯A：唉，我們工廠早上突然停電了，到現在還沒恢復，什麼都做不了。",
       "vi": "Lúc đó tôi nghĩ, phen này không báo cáo được rồi, may mà bạn học nói trên cloud cũng có một bản… A: Haiz, sáng nay nhà máy chúng tôi đột nhiên mất điện, đến giờ vẫn chưa có lại, chẳng làm được gì cả.",
       "py": "Wǒ nà shíhòu xiǎng, zhèxiàzi méi bànfǎ bàogào le, háihǎo tóngxué shuō yúnduān shàng yě yǒu yífèn…… A: Āi, wǒmen gōngchǎng zǎoshàng tūrán tíngdiàn le, dào xiànzài hái méi huīfù, shénme dōu zuòbùliǎo."
      },
      {
       "hz": "B：真的？這下子你們的貨趕得出來嗎？",
       "vi": "B: Thật à? Phen này các anh có kịp làm xong hàng không?",
       "py": "B: Zhēnde? Zhèxiàzi nǐmen de huò gǎndechū lái ma?"
      },
      {
       "hz": "A：沒想到小顧計畫要去旅遊的國家，昨天發生了嚴重的大地震。",
       "vi": "A: Không ngờ đất nước Tiểu Cố định đi du lịch hôm qua lại xảy ra trận động đất lớn nghiêm trọng.",
       "py": "A: Méixiǎngdào xiǎo gù jìhuà yào qù lǚyóu de guójiā, zuótiān fāshēng le yánzhòng de dà dìzhèn."
      },
      {
       "hz": "B：是啊。這下子他得改變計畫了。",
       "vi": "B: Đúng vậy. Phen này cậu ấy phải đổi kế hoạch rồi.",
       "py": "B: Shì a. Zhèxiàzi tā děi gǎibiàn jìhuà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這下子 — phen này, lần này thì…",
   "giaiThich": "Khẩu ngữ, nhấn mạnh hậu quả xảy ra ngay sau tình huống vừa nêu."
  },
  {
   "title": "2. 既⋯⋯又⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "表示同一個主語具有兩種狀態或情況。「既」跟「又」後面常接形容詞、動詞或動詞短語，形容詞前面不可以加副詞，動詞前面可加能願動詞「會、要、能、願意」等。所連接的兩個狀態或情況，必須同樣是正面的或負面的。而「又」後面狀態或情況的程度，比「既」來得更高一些。「既⋯⋯又⋯⋯」比「又⋯⋯又⋯⋯」書面。",
     "examples": [
      {
       "hz": "⋯⋯不同地區的人也能在網路上一起開會，既省時間又方便⋯⋯陳教授既是我的好老師，又是我的老朋友，我很重視我們的友誼。",
       "vi": "…người ở các khu vực khác nhau cũng có thể họp cùng nhau trên mạng, vừa tiết kiệm thời gian lại vừa tiện… Giáo sư Trần vừa là người thầy tốt, lại vừa là bạn cũ của tôi, tôi rất trân trọng tình bạn của chúng tôi.",
       "py": "…… bùtóng dìqū de rén yě néng zài wǎnglùshàng yìqǐ kāihuì, jì shěng shíjiān yòu fāngbiàn…… Chén jiàoshòu jì shì wǒ de hǎo lǎoshī, yòu shì wǒ de lǎopéngyǒu, wǒ hěn zhòngshì wǒmen de yǒuyí."
      },
      {
       "hz": "阮小姐對穿著很講究，她對衣服的要求是既要品質好，又要設計佳。",
       "vi": "Cô Nguyễn rất cầu kỳ trong ăn mặc, yêu cầu của cô với quần áo là vừa phải chất lượng tốt, lại vừa phải thiết kế đẹp.",
       "py": "Ruǎn xiǎojiě duì chuānzhuó hěn jiǎngjiū, tā duì yīfú de yāoqiú shì jì yào pǐnzhí hǎo, yòu yào shèjì jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "既… 又… — vừa… lại vừa…",
   "giaiThich": "Cùng một chủ ngữ mang hai tính chất. Sau 既 và 又 là tính từ hoặc động từ; trước tính từ KHÔNG thêm phó từ. Hai tính chất phải cùng tích cực hoặc cùng tiêu cực; phần sau 又 mức độ cao hơn. Văn viết hơn 又…又…"
  },
  {
   "title": "3. 更別說",
   "points": [
    {
     "label": null,
     "formula": "「更別說」的意思是「不必說」、「不需要說」，因為「更別說」後面所表達的情況是非常清楚的，不需要再多說。",
     "examples": [
      {
       "hz": "⋯⋯既省時間又方便，更別說提供個人下載資料、傳訊息等基本服務了。",
       "vi": "…vừa tiết kiệm thời gian lại vừa tiện, chưa nói đến việc cung cấp các dịch vụ cơ bản như tải tài liệu cá nhân, gửi tin nhắn.",
       "py": "…… jì shěng shíjiān yòu fāngbiàn, gèng biéshuō tígōng gèrén xiàzài zīliào, chuán xùnxí děng jīběn fúwù le."
      },
      {
       "hz": "我奶奶連怎麼上傳資料都不會，更別說建立自己的網站了。",
       "vi": "Bà tôi đến cách tải tài liệu lên còn không biết, nói gì đến việc lập trang web riêng.",
       "py": "Wǒ nǎinai lián zěnme shàngchuán zīliào dōu búhuì, gèng biéshuō jiànlì zìjǐ de wǎngzhàn le."
      },
      {
       "hz": "溫先生一見到陌生人，就害羞得說不出話來，更別說要他演講了。",
       "vi": "Ông Ôn hễ gặp người lạ là ngượng đến mức không nói nên lời, nói gì đến chuyện bảo ông ấy diễn thuyết.",
       "py": "Wēn xiānshēng yí jiàndào mòshēngrén, jiù hàixiū de shuōbùchū huà lái, gèng biéshuō yào tā yǎnjiǎng le."
      },
      {
       "hz": "「就是」的後面是假設的情況，就算發生這些情況，「也」後面的結果也不會因為這樣而改變。",
       "vi": "Sau “就是” là tình huống giả định; dù những tình huống đó xảy ra thì kết quả sau “也” cũng không vì thế mà thay đổi.",
       "py": "“Jiùshì” de hòumiàn shì jiǎshè de qíngkuàng, jiùsuàn fāshēng zhèxiē qíngkuàng, “yě” hòumiàn de jiéguǒ yě búhuì yīnwèi zhèyàng ér gǎibiàn."
      },
      {
       "hz": "⋯⋯人們就是不出門，也可透過網路滿足相關的需求。",
       "vi": "…mọi người dù không ra khỏi nhà cũng có thể đáp ứng các nhu cầu liên quan thông qua mạng internet.",
       "py": "…… rénmen jiùshì bù chūmén, yě kě tòuguò wǎnglù mǎnzú xiāngguān de xūqiú."
      },
      {
       "hz": "為了追求夢想，就是吃再多苦，我也要堅持到底。",
       "vi": "Để theo đuổi ước mơ, dù có chịu khổ đến đâu tôi cũng sẽ kiên trì đến cùng.",
       "py": "Wèile zhuīqiú mèngxiǎng, jiùshì chī zài duō kǔ, wǒ yě yào jiānchídàodǐ."
      },
      {
       "hz": "林老闆既然做了決定就不會改變，就是總統來跟他說也沒用。",
       "vi": "Ông chủ Lâm đã quyết định thì sẽ không thay đổi, dù tổng thống đến nói cũng vô ích.",
       "py": "Lín lǎobǎn jìrán zuò le juédìng jiù búhuì gǎibiàn, jiùshì zǒngtǒng lái gēn tā shuō yě méiyòng."
      },
      {
       "hz": "一方面⋯⋯，一方面⋯⋯",
       "vi": "một mặt…, mặt khác…",
       "py": "Yìfāngmiàn……, yìfāngmiàn……"
      },
      {
       "hz": "使用「一方面⋯⋯，一方面⋯⋯」的句式說明一件事情兩個方面的原因、結果或目的等，前後兩句沒有重要程度的差別。",
       "vi": "Dùng mẫu “一方面……，一方面……” để nói về nguyên nhân, kết quả hoặc mục đích của một sự việc ở hai phương diện, hai vế không có sự khác biệt về mức độ quan trọng.",
       "py": "Shǐyòng “yìfāngmiàn……, yìfāngmiàn……” de jùshì shuōmíng yíjiàn shìqíng liǎnggè fāngmiàn de yuányīn, jiéguǒ huò mùdì děng, qiánhòu liǎngjù méiyǒu zhòngyào chéngdù de chābié."
      },
      {
       "hz": "⋯⋯一方面帶給人們更便利的生活，一方面也帶給企業更良好的管理方式⋯⋯錢老闆每天從早忙到晚，一方面要照顧生意，一方面要訓練員工，連陪家人的時間都沒有。",
       "vi": "…một mặt mang lại cho con người cuộc sống tiện lợi hơn, mặt khác cũng mang lại cho doanh nghiệp cách quản lý tốt hơn… Ông chủ Tiền ngày nào cũng bận từ sáng đến tối, một mặt phải lo việc kinh doanh, mặt khác phải đào tạo nhân viên, đến thời gian ở bên gia đình cũng không có.",
       "py": "…… yìfāngmiàn dàigěi rénmen gèng biànlì de shēnghuó, yìfāngmiàn yě dàigěi qìyè gèng liánghǎo de guǎnlǐ fāngshì…… Qián lǎobǎn měitiān cóng zǎo máng dào wǎn, yìfāngmiàn yào zhàogù shēngyì, yìfāngmiàn yào xùnliàn yuángōng, lián péi jiārén de shíjiān dōu méiyǒu."
      },
      {
       "hz": "店員建議我買這部筆電，一方面打了折之後便宜得多，一方面筆電該有的功能它都有。",
       "vi": "Nhân viên cửa hàng khuyên tôi mua chiếc laptop này, một mặt giảm giá rồi nên rẻ hơn nhiều, mặt khác các chức năng cần có của laptop nó đều có.",
       "py": "Diànyuán jiànyì wǒ mǎi zhèbù bǐ diàn, yìfāngmiàn dǎ le zhé zhīhòu piányi de duō, yìfāngmiàn bǐ diàn gāi yǒu de gōngnéng tā dōu yǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "更別說 — nói gì đến…",
   "giaiThich": "Nghĩa \"khỏi phải nói\": điều nêu sau 更別說 quá rõ ràng, không cần bàn thêm."
  }
 ],
 "td3-13.2": [
  {
   "title": "1. 這下子",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在對話中說到某件事情或情況，說話的人表達自己的看法，也可以是自己面對突然發生的情況，當下做出的反應。",
       "vi": "Trong hội thoại, khi nói đến một việc hay tình huống, người nói bày tỏ suy nghĩ của mình, cũng có thể là phản ứng tức thời khi gặp tình huống bất ngờ.",
       "py": "Zài duìhuà zhōng shuō dào mǒujiànshì qíng huò qíngkuàng, shuōhuà de rén biǎodá zìjǐ de kànfǎ, yě kěyǐ shì zìjǐ miànduì tūrán fāshēng de qíngkuàng, dāngxià zuòchū de fǎnyìng."
      },
      {
       "hz": "我那時候想，這下子沒辦法報告了，還好同學說雲端上也有一份⋯⋯A：唉，我們工廠早上突然停電了，到現在還沒恢復，什麼都做不了。",
       "vi": "Lúc đó tôi nghĩ, phen này không báo cáo được rồi, may mà bạn học nói trên cloud cũng có một bản… A: Haiz, sáng nay nhà máy chúng tôi đột nhiên mất điện, đến giờ vẫn chưa có lại, chẳng làm được gì cả.",
       "py": "Wǒ nà shíhòu xiǎng, zhèxiàzi méi bànfǎ bàogào le, háihǎo tóngxué shuō yúnduān shàng yě yǒu yífèn…… A: Āi, wǒmen gōngchǎng zǎoshàng tūrán tíngdiàn le, dào xiànzài hái méi huīfù, shénme dōu zuòbùliǎo."
      },
      {
       "hz": "B：真的？這下子你們的貨趕得出來嗎？",
       "vi": "B: Thật à? Phen này các anh có kịp làm xong hàng không?",
       "py": "B: Zhēnde? Zhèxiàzi nǐmen de huò gǎndechū lái ma?"
      },
      {
       "hz": "A：沒想到小顧計畫要去旅遊的國家，昨天發生了嚴重的大地震。",
       "vi": "A: Không ngờ đất nước Tiểu Cố định đi du lịch hôm qua lại xảy ra trận động đất lớn nghiêm trọng.",
       "py": "A: Méixiǎngdào xiǎo gù jìhuà yào qù lǚyóu de guójiā, zuótiān fāshēng le yánzhòng de dà dìzhèn."
      },
      {
       "hz": "B：是啊。這下子他得改變計畫了。",
       "vi": "B: Đúng vậy. Phen này cậu ấy phải đổi kế hoạch rồi.",
       "py": "B: Shì a. Zhèxiàzi tā děi gǎibiàn jìhuà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這下子 — phen này, lần này thì…",
   "giaiThich": "Khẩu ngữ, nhấn mạnh hậu quả xảy ra ngay sau tình huống vừa nêu."
  },
  {
   "title": "2. 既⋯⋯又⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "表示同一個主語具有兩種狀態或情況。「既」跟「又」後面常接形容詞、動詞或動詞短語，形容詞前面不可以加副詞，動詞前面可加能願動詞「會、要、能、願意」等。所連接的兩個狀態或情況，必須同樣是正面的或負面的。而「又」後面狀態或情況的程度，比「既」來得更高一些。「既⋯⋯又⋯⋯」比「又⋯⋯又⋯⋯」書面。",
     "examples": [
      {
       "hz": "⋯⋯不同地區的人也能在網路上一起開會，既省時間又方便⋯⋯陳教授既是我的好老師，又是我的老朋友，我很重視我們的友誼。",
       "vi": "…người ở các khu vực khác nhau cũng có thể họp cùng nhau trên mạng, vừa tiết kiệm thời gian lại vừa tiện… Giáo sư Trần vừa là người thầy tốt, lại vừa là bạn cũ của tôi, tôi rất trân trọng tình bạn của chúng tôi.",
       "py": "…… bùtóng dìqū de rén yě néng zài wǎnglùshàng yìqǐ kāihuì, jì shěng shíjiān yòu fāngbiàn…… Chén jiàoshòu jì shì wǒ de hǎo lǎoshī, yòu shì wǒ de lǎopéngyǒu, wǒ hěn zhòngshì wǒmen de yǒuyí."
      },
      {
       "hz": "阮小姐對穿著很講究，她對衣服的要求是既要品質好，又要設計佳。",
       "vi": "Cô Nguyễn rất cầu kỳ trong ăn mặc, yêu cầu của cô với quần áo là vừa phải chất lượng tốt, lại vừa phải thiết kế đẹp.",
       "py": "Ruǎn xiǎojiě duì chuānzhuó hěn jiǎngjiū, tā duì yīfú de yāoqiú shì jì yào pǐnzhí hǎo, yòu yào shèjì jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "既… 又… — vừa… lại vừa…",
   "giaiThich": "Cùng một chủ ngữ mang hai tính chất. Sau 既 và 又 là tính từ hoặc động từ; trước tính từ KHÔNG thêm phó từ. Hai tính chất phải cùng tích cực hoặc cùng tiêu cực; phần sau 又 mức độ cao hơn. Văn viết hơn 又…又…"
  },
  {
   "title": "3. 更別說",
   "points": [
    {
     "label": null,
     "formula": "「更別說」的意思是「不必說」、「不需要說」，因為「更別說」後面所表達的情況是非常清楚的，不需要再多說。",
     "examples": [
      {
       "hz": "⋯⋯既省時間又方便，更別說提供個人下載資料、傳訊息等基本服務了。",
       "vi": "…vừa tiết kiệm thời gian lại vừa tiện, chưa nói đến việc cung cấp các dịch vụ cơ bản như tải tài liệu cá nhân, gửi tin nhắn.",
       "py": "…… jì shěng shíjiān yòu fāngbiàn, gèng biéshuō tígōng gèrén xiàzài zīliào, chuán xùnxí děng jīběn fúwù le."
      },
      {
       "hz": "我奶奶連怎麼上傳資料都不會，更別說建立自己的網站了。",
       "vi": "Bà tôi đến cách tải tài liệu lên còn không biết, nói gì đến việc lập trang web riêng.",
       "py": "Wǒ nǎinai lián zěnme shàngchuán zīliào dōu búhuì, gèng biéshuō jiànlì zìjǐ de wǎngzhàn le."
      },
      {
       "hz": "溫先生一見到陌生人，就害羞得說不出話來，更別說要他演講了。",
       "vi": "Ông Ôn hễ gặp người lạ là ngượng đến mức không nói nên lời, nói gì đến chuyện bảo ông ấy diễn thuyết.",
       "py": "Wēn xiānshēng yí jiàndào mòshēngrén, jiù hàixiū de shuōbùchū huà lái, gèng biéshuō yào tā yǎnjiǎng le."
      },
      {
       "hz": "「就是」的後面是假設的情況，就算發生這些情況，「也」後面的結果也不會因為這樣而改變。",
       "vi": "Sau “就是” là tình huống giả định; dù những tình huống đó xảy ra thì kết quả sau “也” cũng không vì thế mà thay đổi.",
       "py": "“Jiùshì” de hòumiàn shì jiǎshè de qíngkuàng, jiùsuàn fāshēng zhèxiē qíngkuàng, “yě” hòumiàn de jiéguǒ yě búhuì yīnwèi zhèyàng ér gǎibiàn."
      },
      {
       "hz": "⋯⋯人們就是不出門，也可透過網路滿足相關的需求。",
       "vi": "…mọi người dù không ra khỏi nhà cũng có thể đáp ứng các nhu cầu liên quan thông qua mạng internet.",
       "py": "…… rénmen jiùshì bù chūmén, yě kě tòuguò wǎnglù mǎnzú xiāngguān de xūqiú."
      },
      {
       "hz": "為了追求夢想，就是吃再多苦，我也要堅持到底。",
       "vi": "Để theo đuổi ước mơ, dù có chịu khổ đến đâu tôi cũng sẽ kiên trì đến cùng.",
       "py": "Wèile zhuīqiú mèngxiǎng, jiùshì chī zài duō kǔ, wǒ yě yào jiānchídàodǐ."
      },
      {
       "hz": "林老闆既然做了決定就不會改變，就是總統來跟他說也沒用。",
       "vi": "Ông chủ Lâm đã quyết định thì sẽ không thay đổi, dù tổng thống đến nói cũng vô ích.",
       "py": "Lín lǎobǎn jìrán zuò le juédìng jiù búhuì gǎibiàn, jiùshì zǒngtǒng lái gēn tā shuō yě méiyòng."
      },
      {
       "hz": "一方面⋯⋯，一方面⋯⋯",
       "vi": "một mặt…, mặt khác…",
       "py": "Yìfāngmiàn……, yìfāngmiàn……"
      },
      {
       "hz": "使用「一方面⋯⋯，一方面⋯⋯」的句式說明一件事情兩個方面的原因、結果或目的等，前後兩句沒有重要程度的差別。",
       "vi": "Dùng mẫu “一方面……，一方面……” để nói về nguyên nhân, kết quả hoặc mục đích của một sự việc ở hai phương diện, hai vế không có sự khác biệt về mức độ quan trọng.",
       "py": "Shǐyòng “yìfāngmiàn……, yìfāngmiàn……” de jùshì shuōmíng yíjiàn shìqíng liǎnggè fāngmiàn de yuányīn, jiéguǒ huò mùdì děng, qiánhòu liǎngjù méiyǒu zhòngyào chéngdù de chābié."
      },
      {
       "hz": "⋯⋯一方面帶給人們更便利的生活，一方面也帶給企業更良好的管理方式⋯⋯錢老闆每天從早忙到晚，一方面要照顧生意，一方面要訓練員工，連陪家人的時間都沒有。",
       "vi": "…một mặt mang lại cho con người cuộc sống tiện lợi hơn, mặt khác cũng mang lại cho doanh nghiệp cách quản lý tốt hơn… Ông chủ Tiền ngày nào cũng bận từ sáng đến tối, một mặt phải lo việc kinh doanh, mặt khác phải đào tạo nhân viên, đến thời gian ở bên gia đình cũng không có.",
       "py": "…… yìfāngmiàn dàigěi rénmen gèng biànlì de shēnghuó, yìfāngmiàn yě dàigěi qìyè gèng liánghǎo de guǎnlǐ fāngshì…… Qián lǎobǎn měitiān cóng zǎo máng dào wǎn, yìfāngmiàn yào zhàogù shēngyì, yìfāngmiàn yào xùnliàn yuángōng, lián péi jiārén de shíjiān dōu méiyǒu."
      },
      {
       "hz": "店員建議我買這部筆電，一方面打了折之後便宜得多，一方面筆電該有的功能它都有。",
       "vi": "Nhân viên cửa hàng khuyên tôi mua chiếc laptop này, một mặt giảm giá rồi nên rẻ hơn nhiều, mặt khác các chức năng cần có của laptop nó đều có.",
       "py": "Diànyuán jiànyì wǒ mǎi zhèbù bǐ diàn, yìfāngmiàn dǎ le zhé zhīhòu piányi de duō, yìfāngmiàn bǐ diàn gāi yǒu de gōngnéng tā dōu yǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "更別說 — nói gì đến…",
   "giaiThich": "Nghĩa \"khỏi phải nói\": điều nêu sau 更別說 quá rõ ràng, không cần bàn thêm."
  }
 ],
 "td3-13.3": [
  {
   "title": "1. 這下子",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在對話中說到某件事情或情況，說話的人表達自己的看法，也可以是自己面對突然發生的情況，當下做出的反應。",
       "vi": "Trong hội thoại, khi nói đến một việc hay tình huống, người nói bày tỏ suy nghĩ của mình, cũng có thể là phản ứng tức thời khi gặp tình huống bất ngờ.",
       "py": "Zài duìhuà zhōng shuō dào mǒujiànshì qíng huò qíngkuàng, shuōhuà de rén biǎodá zìjǐ de kànfǎ, yě kěyǐ shì zìjǐ miànduì tūrán fāshēng de qíngkuàng, dāngxià zuòchū de fǎnyìng."
      },
      {
       "hz": "我那時候想，這下子沒辦法報告了，還好同學說雲端上也有一份⋯⋯A：唉，我們工廠早上突然停電了，到現在還沒恢復，什麼都做不了。",
       "vi": "Lúc đó tôi nghĩ, phen này không báo cáo được rồi, may mà bạn học nói trên cloud cũng có một bản… A: Haiz, sáng nay nhà máy chúng tôi đột nhiên mất điện, đến giờ vẫn chưa có lại, chẳng làm được gì cả.",
       "py": "Wǒ nà shíhòu xiǎng, zhèxiàzi méi bànfǎ bàogào le, háihǎo tóngxué shuō yúnduān shàng yě yǒu yífèn…… A: Āi, wǒmen gōngchǎng zǎoshàng tūrán tíngdiàn le, dào xiànzài hái méi huīfù, shénme dōu zuòbùliǎo."
      },
      {
       "hz": "B：真的？這下子你們的貨趕得出來嗎？",
       "vi": "B: Thật à? Phen này các anh có kịp làm xong hàng không?",
       "py": "B: Zhēnde? Zhèxiàzi nǐmen de huò gǎndechū lái ma?"
      },
      {
       "hz": "A：沒想到小顧計畫要去旅遊的國家，昨天發生了嚴重的大地震。",
       "vi": "A: Không ngờ đất nước Tiểu Cố định đi du lịch hôm qua lại xảy ra trận động đất lớn nghiêm trọng.",
       "py": "A: Méixiǎngdào xiǎo gù jìhuà yào qù lǚyóu de guójiā, zuótiān fāshēng le yánzhòng de dà dìzhèn."
      },
      {
       "hz": "B：是啊。這下子他得改變計畫了。",
       "vi": "B: Đúng vậy. Phen này cậu ấy phải đổi kế hoạch rồi.",
       "py": "B: Shì a. Zhèxiàzi tā děi gǎibiàn jìhuà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這下子 — phen này, lần này thì…",
   "giaiThich": "Khẩu ngữ, nhấn mạnh hậu quả xảy ra ngay sau tình huống vừa nêu."
  },
  {
   "title": "2. 既⋯⋯又⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "表示同一個主語具有兩種狀態或情況。「既」跟「又」後面常接形容詞、動詞或動詞短語，形容詞前面不可以加副詞，動詞前面可加能願動詞「會、要、能、願意」等。所連接的兩個狀態或情況，必須同樣是正面的或負面的。而「又」後面狀態或情況的程度，比「既」來得更高一些。「既⋯⋯又⋯⋯」比「又⋯⋯又⋯⋯」書面。",
     "examples": [
      {
       "hz": "⋯⋯不同地區的人也能在網路上一起開會，既省時間又方便⋯⋯陳教授既是我的好老師，又是我的老朋友，我很重視我們的友誼。",
       "vi": "…người ở các khu vực khác nhau cũng có thể họp cùng nhau trên mạng, vừa tiết kiệm thời gian lại vừa tiện… Giáo sư Trần vừa là người thầy tốt, lại vừa là bạn cũ của tôi, tôi rất trân trọng tình bạn của chúng tôi.",
       "py": "…… bùtóng dìqū de rén yě néng zài wǎnglùshàng yìqǐ kāihuì, jì shěng shíjiān yòu fāngbiàn…… Chén jiàoshòu jì shì wǒ de hǎo lǎoshī, yòu shì wǒ de lǎopéngyǒu, wǒ hěn zhòngshì wǒmen de yǒuyí."
      },
      {
       "hz": "阮小姐對穿著很講究，她對衣服的要求是既要品質好，又要設計佳。",
       "vi": "Cô Nguyễn rất cầu kỳ trong ăn mặc, yêu cầu của cô với quần áo là vừa phải chất lượng tốt, lại vừa phải thiết kế đẹp.",
       "py": "Ruǎn xiǎojiě duì chuānzhuó hěn jiǎngjiū, tā duì yīfú de yāoqiú shì jì yào pǐnzhí hǎo, yòu yào shèjì jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "既… 又… — vừa… lại vừa…",
   "giaiThich": "Cùng một chủ ngữ mang hai tính chất. Sau 既 và 又 là tính từ hoặc động từ; trước tính từ KHÔNG thêm phó từ. Hai tính chất phải cùng tích cực hoặc cùng tiêu cực; phần sau 又 mức độ cao hơn. Văn viết hơn 又…又…"
  },
  {
   "title": "3. 更別說",
   "points": [
    {
     "label": null,
     "formula": "「更別說」的意思是「不必說」、「不需要說」，因為「更別說」後面所表達的情況是非常清楚的，不需要再多說。",
     "examples": [
      {
       "hz": "⋯⋯既省時間又方便，更別說提供個人下載資料、傳訊息等基本服務了。",
       "vi": "…vừa tiết kiệm thời gian lại vừa tiện, chưa nói đến việc cung cấp các dịch vụ cơ bản như tải tài liệu cá nhân, gửi tin nhắn.",
       "py": "…… jì shěng shíjiān yòu fāngbiàn, gèng biéshuō tígōng gèrén xiàzài zīliào, chuán xùnxí děng jīběn fúwù le."
      },
      {
       "hz": "我奶奶連怎麼上傳資料都不會，更別說建立自己的網站了。",
       "vi": "Bà tôi đến cách tải tài liệu lên còn không biết, nói gì đến việc lập trang web riêng.",
       "py": "Wǒ nǎinai lián zěnme shàngchuán zīliào dōu búhuì, gèng biéshuō jiànlì zìjǐ de wǎngzhàn le."
      },
      {
       "hz": "溫先生一見到陌生人，就害羞得說不出話來，更別說要他演講了。",
       "vi": "Ông Ôn hễ gặp người lạ là ngượng đến mức không nói nên lời, nói gì đến chuyện bảo ông ấy diễn thuyết.",
       "py": "Wēn xiānshēng yí jiàndào mòshēngrén, jiù hàixiū de shuōbùchū huà lái, gèng biéshuō yào tā yǎnjiǎng le."
      },
      {
       "hz": "「就是」的後面是假設的情況，就算發生這些情況，「也」後面的結果也不會因為這樣而改變。",
       "vi": "Sau “就是” là tình huống giả định; dù những tình huống đó xảy ra thì kết quả sau “也” cũng không vì thế mà thay đổi.",
       "py": "“Jiùshì” de hòumiàn shì jiǎshè de qíngkuàng, jiùsuàn fāshēng zhèxiē qíngkuàng, “yě” hòumiàn de jiéguǒ yě búhuì yīnwèi zhèyàng ér gǎibiàn."
      },
      {
       "hz": "⋯⋯人們就是不出門，也可透過網路滿足相關的需求。",
       "vi": "…mọi người dù không ra khỏi nhà cũng có thể đáp ứng các nhu cầu liên quan thông qua mạng internet.",
       "py": "…… rénmen jiùshì bù chūmén, yě kě tòuguò wǎnglù mǎnzú xiāngguān de xūqiú."
      },
      {
       "hz": "為了追求夢想，就是吃再多苦，我也要堅持到底。",
       "vi": "Để theo đuổi ước mơ, dù có chịu khổ đến đâu tôi cũng sẽ kiên trì đến cùng.",
       "py": "Wèile zhuīqiú mèngxiǎng, jiùshì chī zài duō kǔ, wǒ yě yào jiānchídàodǐ."
      },
      {
       "hz": "林老闆既然做了決定就不會改變，就是總統來跟他說也沒用。",
       "vi": "Ông chủ Lâm đã quyết định thì sẽ không thay đổi, dù tổng thống đến nói cũng vô ích.",
       "py": "Lín lǎobǎn jìrán zuò le juédìng jiù búhuì gǎibiàn, jiùshì zǒngtǒng lái gēn tā shuō yě méiyòng."
      },
      {
       "hz": "一方面⋯⋯，一方面⋯⋯",
       "vi": "một mặt…, mặt khác…",
       "py": "Yìfāngmiàn……, yìfāngmiàn……"
      },
      {
       "hz": "使用「一方面⋯⋯，一方面⋯⋯」的句式說明一件事情兩個方面的原因、結果或目的等，前後兩句沒有重要程度的差別。",
       "vi": "Dùng mẫu “一方面……，一方面……” để nói về nguyên nhân, kết quả hoặc mục đích của một sự việc ở hai phương diện, hai vế không có sự khác biệt về mức độ quan trọng.",
       "py": "Shǐyòng “yìfāngmiàn……, yìfāngmiàn……” de jùshì shuōmíng yíjiàn shìqíng liǎnggè fāngmiàn de yuányīn, jiéguǒ huò mùdì děng, qiánhòu liǎngjù méiyǒu zhòngyào chéngdù de chābié."
      },
      {
       "hz": "⋯⋯一方面帶給人們更便利的生活，一方面也帶給企業更良好的管理方式⋯⋯錢老闆每天從早忙到晚，一方面要照顧生意，一方面要訓練員工，連陪家人的時間都沒有。",
       "vi": "…một mặt mang lại cho con người cuộc sống tiện lợi hơn, mặt khác cũng mang lại cho doanh nghiệp cách quản lý tốt hơn… Ông chủ Tiền ngày nào cũng bận từ sáng đến tối, một mặt phải lo việc kinh doanh, mặt khác phải đào tạo nhân viên, đến thời gian ở bên gia đình cũng không có.",
       "py": "…… yìfāngmiàn dàigěi rénmen gèng biànlì de shēnghuó, yìfāngmiàn yě dàigěi qìyè gèng liánghǎo de guǎnlǐ fāngshì…… Qián lǎobǎn měitiān cóng zǎo máng dào wǎn, yìfāngmiàn yào zhàogù shēngyì, yìfāngmiàn yào xùnliàn yuángōng, lián péi jiārén de shíjiān dōu méiyǒu."
      },
      {
       "hz": "店員建議我買這部筆電，一方面打了折之後便宜得多，一方面筆電該有的功能它都有。",
       "vi": "Nhân viên cửa hàng khuyên tôi mua chiếc laptop này, một mặt giảm giá rồi nên rẻ hơn nhiều, mặt khác các chức năng cần có của laptop nó đều có.",
       "py": "Diànyuán jiànyì wǒ mǎi zhèbù bǐ diàn, yìfāngmiàn dǎ le zhé zhīhòu piányi de duō, yìfāngmiàn bǐ diàn gāi yǒu de gōngnéng tā dōu yǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "更別說 — nói gì đến…",
   "giaiThich": "Nghĩa \"khỏi phải nói\": điều nêu sau 更別說 quá rõ ràng, không cần bàn thêm."
  }
 ],
 "td3-13.4": [
  {
   "title": "1. 這下子",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "在對話中說到某件事情或情況，說話的人表達自己的看法，也可以是自己面對突然發生的情況，當下做出的反應。",
       "vi": "Trong hội thoại, khi nói đến một việc hay tình huống, người nói bày tỏ suy nghĩ của mình, cũng có thể là phản ứng tức thời khi gặp tình huống bất ngờ.",
       "py": "Zài duìhuà zhōng shuō dào mǒujiànshì qíng huò qíngkuàng, shuōhuà de rén biǎodá zìjǐ de kànfǎ, yě kěyǐ shì zìjǐ miànduì tūrán fāshēng de qíngkuàng, dāngxià zuòchū de fǎnyìng."
      },
      {
       "hz": "我那時候想，這下子沒辦法報告了，還好同學說雲端上也有一份⋯⋯A：唉，我們工廠早上突然停電了，到現在還沒恢復，什麼都做不了。",
       "vi": "Lúc đó tôi nghĩ, phen này không báo cáo được rồi, may mà bạn học nói trên cloud cũng có một bản… A: Haiz, sáng nay nhà máy chúng tôi đột nhiên mất điện, đến giờ vẫn chưa có lại, chẳng làm được gì cả.",
       "py": "Wǒ nà shíhòu xiǎng, zhèxiàzi méi bànfǎ bàogào le, háihǎo tóngxué shuō yúnduān shàng yě yǒu yífèn…… A: Āi, wǒmen gōngchǎng zǎoshàng tūrán tíngdiàn le, dào xiànzài hái méi huīfù, shénme dōu zuòbùliǎo."
      },
      {
       "hz": "B：真的？這下子你們的貨趕得出來嗎？",
       "vi": "B: Thật à? Phen này các anh có kịp làm xong hàng không?",
       "py": "B: Zhēnde? Zhèxiàzi nǐmen de huò gǎndechū lái ma?"
      },
      {
       "hz": "A：沒想到小顧計畫要去旅遊的國家，昨天發生了嚴重的大地震。",
       "vi": "A: Không ngờ đất nước Tiểu Cố định đi du lịch hôm qua lại xảy ra trận động đất lớn nghiêm trọng.",
       "py": "A: Méixiǎngdào xiǎo gù jìhuà yào qù lǚyóu de guójiā, zuótiān fāshēng le yánzhòng de dà dìzhèn."
      },
      {
       "hz": "B：是啊。這下子他得改變計畫了。",
       "vi": "B: Đúng vậy. Phen này cậu ấy phải đổi kế hoạch rồi.",
       "py": "B: Shì a. Zhèxiàzi tā děi gǎibiàn jìhuà le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "這下子 — phen này, lần này thì…",
   "giaiThich": "Khẩu ngữ, nhấn mạnh hậu quả xảy ra ngay sau tình huống vừa nêu."
  },
  {
   "title": "2. 既⋯⋯又⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "表示同一個主語具有兩種狀態或情況。「既」跟「又」後面常接形容詞、動詞或動詞短語，形容詞前面不可以加副詞，動詞前面可加能願動詞「會、要、能、願意」等。所連接的兩個狀態或情況，必須同樣是正面的或負面的。而「又」後面狀態或情況的程度，比「既」來得更高一些。「既⋯⋯又⋯⋯」比「又⋯⋯又⋯⋯」書面。",
     "examples": [
      {
       "hz": "⋯⋯不同地區的人也能在網路上一起開會，既省時間又方便⋯⋯陳教授既是我的好老師，又是我的老朋友，我很重視我們的友誼。",
       "vi": "…người ở các khu vực khác nhau cũng có thể họp cùng nhau trên mạng, vừa tiết kiệm thời gian lại vừa tiện… Giáo sư Trần vừa là người thầy tốt, lại vừa là bạn cũ của tôi, tôi rất trân trọng tình bạn của chúng tôi.",
       "py": "…… bùtóng dìqū de rén yě néng zài wǎnglùshàng yìqǐ kāihuì, jì shěng shíjiān yòu fāngbiàn…… Chén jiàoshòu jì shì wǒ de hǎo lǎoshī, yòu shì wǒ de lǎopéngyǒu, wǒ hěn zhòngshì wǒmen de yǒuyí."
      },
      {
       "hz": "阮小姐對穿著很講究，她對衣服的要求是既要品質好，又要設計佳。",
       "vi": "Cô Nguyễn rất cầu kỳ trong ăn mặc, yêu cầu của cô với quần áo là vừa phải chất lượng tốt, lại vừa phải thiết kế đẹp.",
       "py": "Ruǎn xiǎojiě duì chuānzhuó hěn jiǎngjiū, tā duì yīfú de yāoqiú shì jì yào pǐnzhí hǎo, yòu yào shèjì jiā."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "既… 又… — vừa… lại vừa…",
   "giaiThich": "Cùng một chủ ngữ mang hai tính chất. Sau 既 và 又 là tính từ hoặc động từ; trước tính từ KHÔNG thêm phó từ. Hai tính chất phải cùng tích cực hoặc cùng tiêu cực; phần sau 又 mức độ cao hơn. Văn viết hơn 又…又…"
  },
  {
   "title": "3. 更別說",
   "points": [
    {
     "label": null,
     "formula": "「更別說」的意思是「不必說」、「不需要說」，因為「更別說」後面所表達的情況是非常清楚的，不需要再多說。",
     "examples": [
      {
       "hz": "⋯⋯既省時間又方便，更別說提供個人下載資料、傳訊息等基本服務了。",
       "vi": "…vừa tiết kiệm thời gian lại vừa tiện, chưa nói đến việc cung cấp các dịch vụ cơ bản như tải tài liệu cá nhân, gửi tin nhắn.",
       "py": "…… jì shěng shíjiān yòu fāngbiàn, gèng biéshuō tígōng gèrén xiàzài zīliào, chuán xùnxí děng jīběn fúwù le."
      },
      {
       "hz": "我奶奶連怎麼上傳資料都不會，更別說建立自己的網站了。",
       "vi": "Bà tôi đến cách tải tài liệu lên còn không biết, nói gì đến việc lập trang web riêng.",
       "py": "Wǒ nǎinai lián zěnme shàngchuán zīliào dōu búhuì, gèng biéshuō jiànlì zìjǐ de wǎngzhàn le."
      },
      {
       "hz": "溫先生一見到陌生人，就害羞得說不出話來，更別說要他演講了。",
       "vi": "Ông Ôn hễ gặp người lạ là ngượng đến mức không nói nên lời, nói gì đến chuyện bảo ông ấy diễn thuyết.",
       "py": "Wēn xiānshēng yí jiàndào mòshēngrén, jiù hàixiū de shuōbùchū huà lái, gèng biéshuō yào tā yǎnjiǎng le."
      },
      {
       "hz": "「就是」的後面是假設的情況，就算發生這些情況，「也」後面的結果也不會因為這樣而改變。",
       "vi": "Sau “就是” là tình huống giả định; dù những tình huống đó xảy ra thì kết quả sau “也” cũng không vì thế mà thay đổi.",
       "py": "“Jiùshì” de hòumiàn shì jiǎshè de qíngkuàng, jiùsuàn fāshēng zhèxiē qíngkuàng, “yě” hòumiàn de jiéguǒ yě búhuì yīnwèi zhèyàng ér gǎibiàn."
      },
      {
       "hz": "⋯⋯人們就是不出門，也可透過網路滿足相關的需求。",
       "vi": "…mọi người dù không ra khỏi nhà cũng có thể đáp ứng các nhu cầu liên quan thông qua mạng internet.",
       "py": "…… rénmen jiùshì bù chūmén, yě kě tòuguò wǎnglù mǎnzú xiāngguān de xūqiú."
      },
      {
       "hz": "為了追求夢想，就是吃再多苦，我也要堅持到底。",
       "vi": "Để theo đuổi ước mơ, dù có chịu khổ đến đâu tôi cũng sẽ kiên trì đến cùng.",
       "py": "Wèile zhuīqiú mèngxiǎng, jiùshì chī zài duō kǔ, wǒ yě yào jiānchídàodǐ."
      },
      {
       "hz": "林老闆既然做了決定就不會改變，就是總統來跟他說也沒用。",
       "vi": "Ông chủ Lâm đã quyết định thì sẽ không thay đổi, dù tổng thống đến nói cũng vô ích.",
       "py": "Lín lǎobǎn jìrán zuò le juédìng jiù búhuì gǎibiàn, jiùshì zǒngtǒng lái gēn tā shuō yě méiyòng."
      },
      {
       "hz": "一方面⋯⋯，一方面⋯⋯",
       "vi": "một mặt…, mặt khác…",
       "py": "Yìfāngmiàn……, yìfāngmiàn……"
      },
      {
       "hz": "使用「一方面⋯⋯，一方面⋯⋯」的句式說明一件事情兩個方面的原因、結果或目的等，前後兩句沒有重要程度的差別。",
       "vi": "Dùng mẫu “一方面……，一方面……” để nói về nguyên nhân, kết quả hoặc mục đích của một sự việc ở hai phương diện, hai vế không có sự khác biệt về mức độ quan trọng.",
       "py": "Shǐyòng “yìfāngmiàn……, yìfāngmiàn……” de jùshì shuōmíng yíjiàn shìqíng liǎnggè fāngmiàn de yuányīn, jiéguǒ huò mùdì děng, qiánhòu liǎngjù méiyǒu zhòngyào chéngdù de chābié."
      },
      {
       "hz": "⋯⋯一方面帶給人們更便利的生活，一方面也帶給企業更良好的管理方式⋯⋯錢老闆每天從早忙到晚，一方面要照顧生意，一方面要訓練員工，連陪家人的時間都沒有。",
       "vi": "…một mặt mang lại cho con người cuộc sống tiện lợi hơn, mặt khác cũng mang lại cho doanh nghiệp cách quản lý tốt hơn… Ông chủ Tiền ngày nào cũng bận từ sáng đến tối, một mặt phải lo việc kinh doanh, mặt khác phải đào tạo nhân viên, đến thời gian ở bên gia đình cũng không có.",
       "py": "…… yìfāngmiàn dàigěi rénmen gèng biànlì de shēnghuó, yìfāngmiàn yě dàigěi qìyè gèng liánghǎo de guǎnlǐ fāngshì…… Qián lǎobǎn měitiān cóng zǎo máng dào wǎn, yìfāngmiàn yào zhàogù shēngyì, yìfāngmiàn yào xùnliàn yuángōng, lián péi jiārén de shíjiān dōu méiyǒu."
      },
      {
       "hz": "店員建議我買這部筆電，一方面打了折之後便宜得多，一方面筆電該有的功能它都有。",
       "vi": "Nhân viên cửa hàng khuyên tôi mua chiếc laptop này, một mặt giảm giá rồi nên rẻ hơn nhiều, mặt khác các chức năng cần có của laptop nó đều có.",
       "py": "Diànyuán jiànyì wǒ mǎi zhèbù bǐ diàn, yìfāngmiàn dǎ le zhé zhīhòu piányi de duō, yìfāngmiàn bǐ diàn gāi yǒu de gōngnéng tā dōu yǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "更別說 — nói gì đến…",
   "giaiThich": "Nghĩa \"khỏi phải nói\": điều nêu sau 更別說 quá rõ ràng, không cần bàn thêm."
  }
 ],
 "td3-14.1": [
  {
   "title": "1. （這）就要從……說起了",
   "points": [
    {
     "label": null,
     "formula": "本課對話中使用「（這）就要從……說起了」，表示說話者提到的某件事，沒辦法簡單說清楚，得從某個角度、部分或時間開始說，才能讓聽者明白。這個「說」可換成「看、做、寫、找、談、講、聊」等單音節動詞，表示開始做那件事。假如前句已提到主題，就不需用「這/那」。",
     "examples": [
      {
       "hz": "（這）就要從……說起了",
       "vi": "(Chuyện này) phải kể từ… trở đi",
       "py": "(zhè) jiùyào cóng…… shuōqǐ le"
      },
      {
       "hz": "這就要從牛郎、織女說起了。……這個計畫一再地調整內容，想找到舊資料的話，就要從兩年前的找起了。",
       "vi": "Chuyện này phải kể từ Ngưu Lang, Chức Nữ… Kế hoạch này đã điều chỉnh nội dung hết lần này đến lần khác, nếu muốn tìm tài liệu cũ thì phải tìm từ hai năm trước.",
       "py": "Zhè jiùyào cóng Niúláng, Zhīnǚ shuōqǐ le.…… zhège jìhuà yízài dì tiáozhěng nèiróng, xiǎng zhǎodào jiù zīliào dehuà, jiùyào cóng liǎngnián qián de zhǎo qǐ le."
      },
      {
       "hz": "A：我花了很多錢去健身房運動，怎麼過了三個月還沒變瘦？",
       "vi": "A: Tôi tốn rất nhiều tiền đi tập gym, sao ba tháng rồi vẫn chưa gầy đi?",
       "py": "A: Wǒ huā le hěnduō qián qù jiànshēnfáng yùndòng, zěnme guò le sāngè yuè hái méi biàn shòu?"
      },
      {
       "hz": "B：這就要從你的飲食習慣說起了。要是你不改掉愛吃零食的壞習慣，怎麼瘦得下來呢？",
       "vi": "B: Chuyện này phải bắt đầu từ thói quen ăn uống của bạn. Nếu bạn không bỏ thói quen xấu ăn vặt thì làm sao gầy được?",
       "py": "B: Zhè jiùyào cóng nǐ de yǐnshíxíguàn shuōqǐ le. Yàoshì nǐ bù gǎidiào ài chīlíngshí de huàixíguàn, zěnme shòu de xiàlái ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "（這）就要從……說起了 — chuyện này phải kể từ…",
   "giaiThich": "Dùng khi việc gì đó không nói gọn được, phải bắt đầu từ một mốc hoặc khía cạnh nào đó. 說 thay được bằng 看, 做, 寫, 找, 談, 講, 聊. Nếu chủ đề đã nêu ở câu trước thì bỏ 這/那."
  },
  {
   "title": "2. V下去",
   "points": [
    {
     "label": null,
     "formula": "「下去」放在動詞之後，當作補語，表示某個動作繼續進行，「V下去」後面不可加賓語。",
     "examples": [
      {
       "hz": "織女不能跟牛郎聚在一起，也不能在人間住下去，真可憐。",
       "vi": "Chức Nữ không được đoàn tụ với Ngưu Lang, cũng không được sống tiếp ở trần gian, thật đáng thương.",
       "py": "Zhīnǚ bùnéng gēn Niúláng jùzàiyìqǐ, yě bùnéng zài rénjiān zhù xiàqù, zhēnkělián."
      },
      {
       "hz": "這部電影很無聊，演員的演戲技巧也不好，我實在看不下去了。",
       "vi": "Bộ phim này rất nhàm chán, kỹ năng diễn xuất của diễn viên cũng kém, tôi thật sự không xem tiếp nổi.",
       "py": "Zhèbù diànyǐng hěn wúliáo, yǎnyuán de yǎnxì jìqiǎo yě bùhǎo, wǒ shízài kànbúxiàqù le."
      },
      {
       "hz": "A：總統給你們的任務很危險，你們能堅持下去嗎？",
       "vi": "A: Nhiệm vụ tổng thống giao cho các anh rất nguy hiểm, các anh có kiên trì tiếp được không?",
       "py": "A: Zǒngtǒng gěi nǐmen de rènwù hěn wéixiǎn, nǐmen néng jiānchíxiàqù ma?"
      },
      {
       "hz": "B：我們是軍人，為了國家，就算犧牲生命也必須完成。",
       "vi": "B: Chúng tôi là quân nhân, vì đất nước, dù có hy sinh tính mạng cũng phải hoàn thành.",
       "py": "B: Wǒmen shì jūnrén, wèile guójiā, jiùsuàn xīshēngshēngmìng yě bìxū wánchéng."
      },
      {
       "hz": "「幸虧」是副詞，後面敘述某個因為很幸運而發生的事件，要是沒有這個事件，「要不然」後面不好的、擔心的情況就會出現。",
       "vi": "“幸虧” là phó từ, phía sau kể một sự việc xảy ra nhờ may mắn; nếu không có sự việc đó thì tình huống xấu, đáng lo sau “要不然” đã xảy ra.",
       "py": "“Xìngkuī” shì fùcí, hòumiàn xùshù mǒugè yīnwèi hěn xìngyùn ér fāshēng de shìjiàn, yàoshì méiyǒu zhège shìjiàn, “yàobùrán” hòumiàn bùhǎo de, dānxīn de qíngkuàng jiù huì chūxiàn."
      },
      {
       "hz": "幸虧有姊姊們的幫助，要不然他們一生都不能團圓了。",
       "vi": "May mà có các chị giúp đỡ, nếu không cả đời họ cũng không được đoàn tụ.",
       "py": "Xìngkuī yǒu jiějie men de bāngzhù, yàobùrán tāmen yìshēng dōu bùnéng tuányuán le."
      },
      {
       "hz": "奶奶天天去拜拜的那座寺廟前天忽然塌了，幸虧她那天沒去，要不然就糟了。",
       "vi": "Ngôi chùa bà nội ngày nào cũng đến lễ hôm kia đột nhiên sập, may mà hôm đó bà không đi, nếu không thì nguy rồi.",
       "py": "Nǎinai tiāntiān qù bàibài de nà zuò sìmiào qiántiān hūrán tā le, xìngkuī tā nàtiān méi qù, yàobùrán jiù zāo le."
      },
      {
       "hz": "錢先生發生嚴重車禍時，幸虧警察就在路邊，趕快把他送到了醫院，要不然他的命就沒了。",
       "vi": "Khi ông Tiền gặp tai nạn giao thông nghiêm trọng, may mà cảnh sát ở ngay bên đường, kịp đưa ông vào bệnh viện, nếu không thì ông đã mất mạng.",
       "py": "Qián xiānshēng fāshēng yánzhòng chēhuò shí, xìngkuī jǐngchá jiù zài lùbiān, gǎnkuài bǎ tā sòngdào le yīyuàn, yàobùrán tā de mìng jiù méi le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 下去 — tiếp tục làm",
   "giaiThich": "下去 làm bổ ngữ sau động từ, chỉ hành động tiếp diễn. Lưu ý: sau V下去 KHÔNG được thêm tân ngữ."
  },
  {
   "title": "1. 根據",
   "points": [
    {
     "label": null,
     "formula": "「根據」是介詞，意思是用某個行為、情況、資料、研究結果等當作基礎，做出判斷、行動或結論。「根據」的後面接名詞短語，常使用的名詞如：報告、調查、經驗、法律、規定、情況、了解、看法、結果、說明等等。",
     "examples": [
      {
       "hz": "根據中國古代的說法，農曆七月初七是所謂的「七夕」。",
       "vi": "Theo cách nói thời Trung Hoa cổ đại, ngày mùng bảy tháng bảy âm lịch là cái gọi là “Thất Tịch”.",
       "py": "Gēnjù Zhōngguó gǔdài de shuōfǎ, nónglì qīyuè chūqī shì suǒwèi de “qīxì”."
      },
      {
       "hz": "根據我國的法律，十八歲以上才可以喝酒。",
       "vi": "Theo luật pháp nước ta, từ mười tám tuổi trở lên mới được uống rượu.",
       "py": "Gēnjù wǒguó de fǎlǜ, shíbāsuì yǐshàng cái kěyǐ hējiǔ."
      },
      {
       "hz": "根據氣象調查的資料，全球溫度比以前高了兩度，也因此造成了一些環境問題。",
       "vi": "Căn cứ vào số liệu khảo sát khí tượng, nhiệt độ toàn cầu đã cao hơn trước hai độ, cũng vì thế mà gây ra một số vấn đề môi trường.",
       "py": "Gēnjù qìxiàng diàochá de zīliào, quánqiú wēndù bǐ yǐqián gāo le liǎngdù, yě yīncǐ zàochéng le yìxiē huánjìng wèntí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "根據 — căn cứ vào",
   "giaiThich": "Giới từ, lấy hành vi/tình huống/số liệu/kết quả nghiên cứu làm cơ sở để phán đoán hay kết luận. Sau 根據 là cụm danh từ: 報告, 調查, 經驗, 法律, 規定, 結果…"
  },
  {
   "title": "2. 按照/按/照 NP + V",
   "points": [
    {
     "label": null,
     "formula": "「按照」是介詞，意思是以某種方法、要求、規定、計畫、決定、標準等來做事情。「按照」主要強調「怎麼做」，例如：咖啡的價錢是按照杯子大小算的、薪水是按照在公司地位的高低決定的。「按照」可以只用「按」或「照」；「根據」則強調「為什麼這麼說、這麼做；為什麼有這樣的結論」，例如：根據臺灣的升學制度，想進好大學就得通過大學考試。「根據」也可以當名詞，例如：網路上有很多訊息是沒有根據的，不能完全相信。",
     "examples": [
      {
       "hz": "按照過去的習俗，姑娘會在七夕把親手做的小東西送給朋友……A：怎麼辦？奶奶忽然生病住院了。",
       "vi": "Theo phong tục ngày xưa, các cô gái sẽ tặng bạn bè những món đồ nhỏ tự tay làm vào ngày Thất Tịch… A: Làm sao đây? Bà nội đột nhiên bị ốm phải nhập viện.",
       "py": "Ànzhào guòqù de xísú, gūniáng huì zài qīxì bǎ qīnshǒuzuò de xiǎodōngxī sònggěi péngyǒu…… A: Zěnmebàn? Nǎinai hūrán shēngbìng zhùyuàn le."
      },
      {
       "hz": "B：別擔心，只要按照醫生的話去做，應該可以很快出院的。",
       "vi": "B: Đừng lo, chỉ cần làm theo lời bác sĩ thì chắc sẽ sớm ra viện thôi.",
       "py": "B: Bié dānxīn, zhǐyào ànzhào yīshēng dehuà qù zuò, yīnggāi kěyǐ hěnkuài chūyuàn de."
      },
      {
       "hz": "助理：下個月的員工訓練，要怎麼做呢？",
       "vi": "Trợ lý: Buổi đào tạo nhân viên tháng sau sẽ tổ chức thế nào ạ?",
       "py": "Zhùlǐ: Xiàgèyuè de yuángōng xùnliàn, yào zěnme zuò ne?"
      },
      {
       "hz": "老闆：昨天已經開過主管會議了，就按會議的決定做吧。",
       "vi": "Ông chủ: Hôm qua đã họp các trưởng bộ phận rồi, cứ làm theo quyết định của cuộc họp.",
       "py": "Lǎobǎn: Zuótiān yǐjīng kāi guò zhǔguǎn huìyì le, jiù àn huìyì de juédìng zuò ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "按照 / 按 / 照 + danh từ — theo, dựa theo",
   "giaiThich": "Giới từ chỉ cách làm theo phương pháp, quy định, kế hoạch, tiêu chuẩn — nhấn mạnh LÀM NHƯ THẾ NÀO. Khác 根據 (nhấn mạnh vì sao kết luận như vậy)."
  }
 ],
 "td3-14.2": [
  {
   "title": "1. （這）就要從……說起了",
   "points": [
    {
     "label": null,
     "formula": "本課對話中使用「（這）就要從……說起了」，表示說話者提到的某件事，沒辦法簡單說清楚，得從某個角度、部分或時間開始說，才能讓聽者明白。這個「說」可換成「看、做、寫、找、談、講、聊」等單音節動詞，表示開始做那件事。假如前句已提到主題，就不需用「這/那」。",
     "examples": [
      {
       "hz": "（這）就要從……說起了",
       "vi": "(Chuyện này) phải kể từ… trở đi",
       "py": "(zhè) jiùyào cóng…… shuōqǐ le"
      },
      {
       "hz": "這就要從牛郎、織女說起了。……這個計畫一再地調整內容，想找到舊資料的話，就要從兩年前的找起了。",
       "vi": "Chuyện này phải kể từ Ngưu Lang, Chức Nữ… Kế hoạch này đã điều chỉnh nội dung hết lần này đến lần khác, nếu muốn tìm tài liệu cũ thì phải tìm từ hai năm trước.",
       "py": "Zhè jiùyào cóng Niúláng, Zhīnǚ shuōqǐ le.…… zhège jìhuà yízài dì tiáozhěng nèiróng, xiǎng zhǎodào jiù zīliào dehuà, jiùyào cóng liǎngnián qián de zhǎo qǐ le."
      },
      {
       "hz": "A：我花了很多錢去健身房運動，怎麼過了三個月還沒變瘦？",
       "vi": "A: Tôi tốn rất nhiều tiền đi tập gym, sao ba tháng rồi vẫn chưa gầy đi?",
       "py": "A: Wǒ huā le hěnduō qián qù jiànshēnfáng yùndòng, zěnme guò le sāngè yuè hái méi biàn shòu?"
      },
      {
       "hz": "B：這就要從你的飲食習慣說起了。要是你不改掉愛吃零食的壞習慣，怎麼瘦得下來呢？",
       "vi": "B: Chuyện này phải bắt đầu từ thói quen ăn uống của bạn. Nếu bạn không bỏ thói quen xấu ăn vặt thì làm sao gầy được?",
       "py": "B: Zhè jiùyào cóng nǐ de yǐnshíxíguàn shuōqǐ le. Yàoshì nǐ bù gǎidiào ài chīlíngshí de huàixíguàn, zěnme shòu de xiàlái ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "（這）就要從……說起了 — chuyện này phải kể từ…",
   "giaiThich": "Dùng khi việc gì đó không nói gọn được, phải bắt đầu từ một mốc hoặc khía cạnh nào đó. 說 thay được bằng 看, 做, 寫, 找, 談, 講, 聊. Nếu chủ đề đã nêu ở câu trước thì bỏ 這/那."
  },
  {
   "title": "2. V下去",
   "points": [
    {
     "label": null,
     "formula": "「下去」放在動詞之後，當作補語，表示某個動作繼續進行，「V下去」後面不可加賓語。",
     "examples": [
      {
       "hz": "織女不能跟牛郎聚在一起，也不能在人間住下去，真可憐。",
       "vi": "Chức Nữ không được đoàn tụ với Ngưu Lang, cũng không được sống tiếp ở trần gian, thật đáng thương.",
       "py": "Zhīnǚ bùnéng gēn Niúláng jùzàiyìqǐ, yě bùnéng zài rénjiān zhù xiàqù, zhēnkělián."
      },
      {
       "hz": "這部電影很無聊，演員的演戲技巧也不好，我實在看不下去了。",
       "vi": "Bộ phim này rất nhàm chán, kỹ năng diễn xuất của diễn viên cũng kém, tôi thật sự không xem tiếp nổi.",
       "py": "Zhèbù diànyǐng hěn wúliáo, yǎnyuán de yǎnxì jìqiǎo yě bùhǎo, wǒ shízài kànbúxiàqù le."
      },
      {
       "hz": "A：總統給你們的任務很危險，你們能堅持下去嗎？",
       "vi": "A: Nhiệm vụ tổng thống giao cho các anh rất nguy hiểm, các anh có kiên trì tiếp được không?",
       "py": "A: Zǒngtǒng gěi nǐmen de rènwù hěn wéixiǎn, nǐmen néng jiānchíxiàqù ma?"
      },
      {
       "hz": "B：我們是軍人，為了國家，就算犧牲生命也必須完成。",
       "vi": "B: Chúng tôi là quân nhân, vì đất nước, dù có hy sinh tính mạng cũng phải hoàn thành.",
       "py": "B: Wǒmen shì jūnrén, wèile guójiā, jiùsuàn xīshēngshēngmìng yě bìxū wánchéng."
      },
      {
       "hz": "「幸虧」是副詞，後面敘述某個因為很幸運而發生的事件，要是沒有這個事件，「要不然」後面不好的、擔心的情況就會出現。",
       "vi": "“幸虧” là phó từ, phía sau kể một sự việc xảy ra nhờ may mắn; nếu không có sự việc đó thì tình huống xấu, đáng lo sau “要不然” đã xảy ra.",
       "py": "“Xìngkuī” shì fùcí, hòumiàn xùshù mǒugè yīnwèi hěn xìngyùn ér fāshēng de shìjiàn, yàoshì méiyǒu zhège shìjiàn, “yàobùrán” hòumiàn bùhǎo de, dānxīn de qíngkuàng jiù huì chūxiàn."
      },
      {
       "hz": "幸虧有姊姊們的幫助，要不然他們一生都不能團圓了。",
       "vi": "May mà có các chị giúp đỡ, nếu không cả đời họ cũng không được đoàn tụ.",
       "py": "Xìngkuī yǒu jiějie men de bāngzhù, yàobùrán tāmen yìshēng dōu bùnéng tuányuán le."
      },
      {
       "hz": "奶奶天天去拜拜的那座寺廟前天忽然塌了，幸虧她那天沒去，要不然就糟了。",
       "vi": "Ngôi chùa bà nội ngày nào cũng đến lễ hôm kia đột nhiên sập, may mà hôm đó bà không đi, nếu không thì nguy rồi.",
       "py": "Nǎinai tiāntiān qù bàibài de nà zuò sìmiào qiántiān hūrán tā le, xìngkuī tā nàtiān méi qù, yàobùrán jiù zāo le."
      },
      {
       "hz": "錢先生發生嚴重車禍時，幸虧警察就在路邊，趕快把他送到了醫院，要不然他的命就沒了。",
       "vi": "Khi ông Tiền gặp tai nạn giao thông nghiêm trọng, may mà cảnh sát ở ngay bên đường, kịp đưa ông vào bệnh viện, nếu không thì ông đã mất mạng.",
       "py": "Qián xiānshēng fāshēng yánzhòng chēhuò shí, xìngkuī jǐngchá jiù zài lùbiān, gǎnkuài bǎ tā sòngdào le yīyuàn, yàobùrán tā de mìng jiù méi le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 下去 — tiếp tục làm",
   "giaiThich": "下去 làm bổ ngữ sau động từ, chỉ hành động tiếp diễn. Lưu ý: sau V下去 KHÔNG được thêm tân ngữ."
  },
  {
   "title": "1. 根據",
   "points": [
    {
     "label": null,
     "formula": "「根據」是介詞，意思是用某個行為、情況、資料、研究結果等當作基礎，做出判斷、行動或結論。「根據」的後面接名詞短語，常使用的名詞如：報告、調查、經驗、法律、規定、情況、了解、看法、結果、說明等等。",
     "examples": [
      {
       "hz": "根據中國古代的說法，農曆七月初七是所謂的「七夕」。",
       "vi": "Theo cách nói thời Trung Hoa cổ đại, ngày mùng bảy tháng bảy âm lịch là cái gọi là “Thất Tịch”.",
       "py": "Gēnjù Zhōngguó gǔdài de shuōfǎ, nónglì qīyuè chūqī shì suǒwèi de “qīxì”."
      },
      {
       "hz": "根據我國的法律，十八歲以上才可以喝酒。",
       "vi": "Theo luật pháp nước ta, từ mười tám tuổi trở lên mới được uống rượu.",
       "py": "Gēnjù wǒguó de fǎlǜ, shíbāsuì yǐshàng cái kěyǐ hējiǔ."
      },
      {
       "hz": "根據氣象調查的資料，全球溫度比以前高了兩度，也因此造成了一些環境問題。",
       "vi": "Căn cứ vào số liệu khảo sát khí tượng, nhiệt độ toàn cầu đã cao hơn trước hai độ, cũng vì thế mà gây ra một số vấn đề môi trường.",
       "py": "Gēnjù qìxiàng diàochá de zīliào, quánqiú wēndù bǐ yǐqián gāo le liǎngdù, yě yīncǐ zàochéng le yìxiē huánjìng wèntí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "根據 — căn cứ vào",
   "giaiThich": "Giới từ, lấy hành vi/tình huống/số liệu/kết quả nghiên cứu làm cơ sở để phán đoán hay kết luận. Sau 根據 là cụm danh từ: 報告, 調查, 經驗, 法律, 規定, 結果…"
  },
  {
   "title": "2. 按照/按/照 NP + V",
   "points": [
    {
     "label": null,
     "formula": "「按照」是介詞，意思是以某種方法、要求、規定、計畫、決定、標準等來做事情。「按照」主要強調「怎麼做」，例如：咖啡的價錢是按照杯子大小算的、薪水是按照在公司地位的高低決定的。「按照」可以只用「按」或「照」；「根據」則強調「為什麼這麼說、這麼做；為什麼有這樣的結論」，例如：根據臺灣的升學制度，想進好大學就得通過大學考試。「根據」也可以當名詞，例如：網路上有很多訊息是沒有根據的，不能完全相信。",
     "examples": [
      {
       "hz": "按照過去的習俗，姑娘會在七夕把親手做的小東西送給朋友……A：怎麼辦？奶奶忽然生病住院了。",
       "vi": "Theo phong tục ngày xưa, các cô gái sẽ tặng bạn bè những món đồ nhỏ tự tay làm vào ngày Thất Tịch… A: Làm sao đây? Bà nội đột nhiên bị ốm phải nhập viện.",
       "py": "Ànzhào guòqù de xísú, gūniáng huì zài qīxì bǎ qīnshǒuzuò de xiǎodōngxī sònggěi péngyǒu…… A: Zěnmebàn? Nǎinai hūrán shēngbìng zhùyuàn le."
      },
      {
       "hz": "B：別擔心，只要按照醫生的話去做，應該可以很快出院的。",
       "vi": "B: Đừng lo, chỉ cần làm theo lời bác sĩ thì chắc sẽ sớm ra viện thôi.",
       "py": "B: Bié dānxīn, zhǐyào ànzhào yīshēng dehuà qù zuò, yīnggāi kěyǐ hěnkuài chūyuàn de."
      },
      {
       "hz": "助理：下個月的員工訓練，要怎麼做呢？",
       "vi": "Trợ lý: Buổi đào tạo nhân viên tháng sau sẽ tổ chức thế nào ạ?",
       "py": "Zhùlǐ: Xiàgèyuè de yuángōng xùnliàn, yào zěnme zuò ne?"
      },
      {
       "hz": "老闆：昨天已經開過主管會議了，就按會議的決定做吧。",
       "vi": "Ông chủ: Hôm qua đã họp các trưởng bộ phận rồi, cứ làm theo quyết định của cuộc họp.",
       "py": "Lǎobǎn: Zuótiān yǐjīng kāi guò zhǔguǎn huìyì le, jiù àn huìyì de juédìng zuò ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "按照 / 按 / 照 + danh từ — theo, dựa theo",
   "giaiThich": "Giới từ chỉ cách làm theo phương pháp, quy định, kế hoạch, tiêu chuẩn — nhấn mạnh LÀM NHƯ THẾ NÀO. Khác 根據 (nhấn mạnh vì sao kết luận như vậy)."
  }
 ],
 "td3-14.3": [
  {
   "title": "1. （這）就要從……說起了",
   "points": [
    {
     "label": null,
     "formula": "本課對話中使用「（這）就要從……說起了」，表示說話者提到的某件事，沒辦法簡單說清楚，得從某個角度、部分或時間開始說，才能讓聽者明白。這個「說」可換成「看、做、寫、找、談、講、聊」等單音節動詞，表示開始做那件事。假如前句已提到主題，就不需用「這/那」。",
     "examples": [
      {
       "hz": "（這）就要從……說起了",
       "vi": "(Chuyện này) phải kể từ… trở đi",
       "py": "(zhè) jiùyào cóng…… shuōqǐ le"
      },
      {
       "hz": "這就要從牛郎、織女說起了。……這個計畫一再地調整內容，想找到舊資料的話，就要從兩年前的找起了。",
       "vi": "Chuyện này phải kể từ Ngưu Lang, Chức Nữ… Kế hoạch này đã điều chỉnh nội dung hết lần này đến lần khác, nếu muốn tìm tài liệu cũ thì phải tìm từ hai năm trước.",
       "py": "Zhè jiùyào cóng Niúláng, Zhīnǚ shuōqǐ le.…… zhège jìhuà yízài dì tiáozhěng nèiróng, xiǎng zhǎodào jiù zīliào dehuà, jiùyào cóng liǎngnián qián de zhǎo qǐ le."
      },
      {
       "hz": "A：我花了很多錢去健身房運動，怎麼過了三個月還沒變瘦？",
       "vi": "A: Tôi tốn rất nhiều tiền đi tập gym, sao ba tháng rồi vẫn chưa gầy đi?",
       "py": "A: Wǒ huā le hěnduō qián qù jiànshēnfáng yùndòng, zěnme guò le sāngè yuè hái méi biàn shòu?"
      },
      {
       "hz": "B：這就要從你的飲食習慣說起了。要是你不改掉愛吃零食的壞習慣，怎麼瘦得下來呢？",
       "vi": "B: Chuyện này phải bắt đầu từ thói quen ăn uống của bạn. Nếu bạn không bỏ thói quen xấu ăn vặt thì làm sao gầy được?",
       "py": "B: Zhè jiùyào cóng nǐ de yǐnshíxíguàn shuōqǐ le. Yàoshì nǐ bù gǎidiào ài chīlíngshí de huàixíguàn, zěnme shòu de xiàlái ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "（這）就要從……說起了 — chuyện này phải kể từ…",
   "giaiThich": "Dùng khi việc gì đó không nói gọn được, phải bắt đầu từ một mốc hoặc khía cạnh nào đó. 說 thay được bằng 看, 做, 寫, 找, 談, 講, 聊. Nếu chủ đề đã nêu ở câu trước thì bỏ 這/那."
  },
  {
   "title": "2. V下去",
   "points": [
    {
     "label": null,
     "formula": "「下去」放在動詞之後，當作補語，表示某個動作繼續進行，「V下去」後面不可加賓語。",
     "examples": [
      {
       "hz": "織女不能跟牛郎聚在一起，也不能在人間住下去，真可憐。",
       "vi": "Chức Nữ không được đoàn tụ với Ngưu Lang, cũng không được sống tiếp ở trần gian, thật đáng thương.",
       "py": "Zhīnǚ bùnéng gēn Niúláng jùzàiyìqǐ, yě bùnéng zài rénjiān zhù xiàqù, zhēnkělián."
      },
      {
       "hz": "這部電影很無聊，演員的演戲技巧也不好，我實在看不下去了。",
       "vi": "Bộ phim này rất nhàm chán, kỹ năng diễn xuất của diễn viên cũng kém, tôi thật sự không xem tiếp nổi.",
       "py": "Zhèbù diànyǐng hěn wúliáo, yǎnyuán de yǎnxì jìqiǎo yě bùhǎo, wǒ shízài kànbúxiàqù le."
      },
      {
       "hz": "A：總統給你們的任務很危險，你們能堅持下去嗎？",
       "vi": "A: Nhiệm vụ tổng thống giao cho các anh rất nguy hiểm, các anh có kiên trì tiếp được không?",
       "py": "A: Zǒngtǒng gěi nǐmen de rènwù hěn wéixiǎn, nǐmen néng jiānchíxiàqù ma?"
      },
      {
       "hz": "B：我們是軍人，為了國家，就算犧牲生命也必須完成。",
       "vi": "B: Chúng tôi là quân nhân, vì đất nước, dù có hy sinh tính mạng cũng phải hoàn thành.",
       "py": "B: Wǒmen shì jūnrén, wèile guójiā, jiùsuàn xīshēngshēngmìng yě bìxū wánchéng."
      },
      {
       "hz": "「幸虧」是副詞，後面敘述某個因為很幸運而發生的事件，要是沒有這個事件，「要不然」後面不好的、擔心的情況就會出現。",
       "vi": "“幸虧” là phó từ, phía sau kể một sự việc xảy ra nhờ may mắn; nếu không có sự việc đó thì tình huống xấu, đáng lo sau “要不然” đã xảy ra.",
       "py": "“Xìngkuī” shì fùcí, hòumiàn xùshù mǒugè yīnwèi hěn xìngyùn ér fāshēng de shìjiàn, yàoshì méiyǒu zhège shìjiàn, “yàobùrán” hòumiàn bùhǎo de, dānxīn de qíngkuàng jiù huì chūxiàn."
      },
      {
       "hz": "幸虧有姊姊們的幫助，要不然他們一生都不能團圓了。",
       "vi": "May mà có các chị giúp đỡ, nếu không cả đời họ cũng không được đoàn tụ.",
       "py": "Xìngkuī yǒu jiějie men de bāngzhù, yàobùrán tāmen yìshēng dōu bùnéng tuányuán le."
      },
      {
       "hz": "奶奶天天去拜拜的那座寺廟前天忽然塌了，幸虧她那天沒去，要不然就糟了。",
       "vi": "Ngôi chùa bà nội ngày nào cũng đến lễ hôm kia đột nhiên sập, may mà hôm đó bà không đi, nếu không thì nguy rồi.",
       "py": "Nǎinai tiāntiān qù bàibài de nà zuò sìmiào qiántiān hūrán tā le, xìngkuī tā nàtiān méi qù, yàobùrán jiù zāo le."
      },
      {
       "hz": "錢先生發生嚴重車禍時，幸虧警察就在路邊，趕快把他送到了醫院，要不然他的命就沒了。",
       "vi": "Khi ông Tiền gặp tai nạn giao thông nghiêm trọng, may mà cảnh sát ở ngay bên đường, kịp đưa ông vào bệnh viện, nếu không thì ông đã mất mạng.",
       "py": "Qián xiānshēng fāshēng yánzhòng chēhuò shí, xìngkuī jǐngchá jiù zài lùbiān, gǎnkuài bǎ tā sòngdào le yīyuàn, yàobùrán tā de mìng jiù méi le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 下去 — tiếp tục làm",
   "giaiThich": "下去 làm bổ ngữ sau động từ, chỉ hành động tiếp diễn. Lưu ý: sau V下去 KHÔNG được thêm tân ngữ."
  },
  {
   "title": "1. 根據",
   "points": [
    {
     "label": null,
     "formula": "「根據」是介詞，意思是用某個行為、情況、資料、研究結果等當作基礎，做出判斷、行動或結論。「根據」的後面接名詞短語，常使用的名詞如：報告、調查、經驗、法律、規定、情況、了解、看法、結果、說明等等。",
     "examples": [
      {
       "hz": "根據中國古代的說法，農曆七月初七是所謂的「七夕」。",
       "vi": "Theo cách nói thời Trung Hoa cổ đại, ngày mùng bảy tháng bảy âm lịch là cái gọi là “Thất Tịch”.",
       "py": "Gēnjù Zhōngguó gǔdài de shuōfǎ, nónglì qīyuè chūqī shì suǒwèi de “qīxì”."
      },
      {
       "hz": "根據我國的法律，十八歲以上才可以喝酒。",
       "vi": "Theo luật pháp nước ta, từ mười tám tuổi trở lên mới được uống rượu.",
       "py": "Gēnjù wǒguó de fǎlǜ, shíbāsuì yǐshàng cái kěyǐ hējiǔ."
      },
      {
       "hz": "根據氣象調查的資料，全球溫度比以前高了兩度，也因此造成了一些環境問題。",
       "vi": "Căn cứ vào số liệu khảo sát khí tượng, nhiệt độ toàn cầu đã cao hơn trước hai độ, cũng vì thế mà gây ra một số vấn đề môi trường.",
       "py": "Gēnjù qìxiàng diàochá de zīliào, quánqiú wēndù bǐ yǐqián gāo le liǎngdù, yě yīncǐ zàochéng le yìxiē huánjìng wèntí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "根據 — căn cứ vào",
   "giaiThich": "Giới từ, lấy hành vi/tình huống/số liệu/kết quả nghiên cứu làm cơ sở để phán đoán hay kết luận. Sau 根據 là cụm danh từ: 報告, 調查, 經驗, 法律, 規定, 結果…"
  },
  {
   "title": "2. 按照/按/照 NP + V",
   "points": [
    {
     "label": null,
     "formula": "「按照」是介詞，意思是以某種方法、要求、規定、計畫、決定、標準等來做事情。「按照」主要強調「怎麼做」，例如：咖啡的價錢是按照杯子大小算的、薪水是按照在公司地位的高低決定的。「按照」可以只用「按」或「照」；「根據」則強調「為什麼這麼說、這麼做；為什麼有這樣的結論」，例如：根據臺灣的升學制度，想進好大學就得通過大學考試。「根據」也可以當名詞，例如：網路上有很多訊息是沒有根據的，不能完全相信。",
     "examples": [
      {
       "hz": "按照過去的習俗，姑娘會在七夕把親手做的小東西送給朋友……A：怎麼辦？奶奶忽然生病住院了。",
       "vi": "Theo phong tục ngày xưa, các cô gái sẽ tặng bạn bè những món đồ nhỏ tự tay làm vào ngày Thất Tịch… A: Làm sao đây? Bà nội đột nhiên bị ốm phải nhập viện.",
       "py": "Ànzhào guòqù de xísú, gūniáng huì zài qīxì bǎ qīnshǒuzuò de xiǎodōngxī sònggěi péngyǒu…… A: Zěnmebàn? Nǎinai hūrán shēngbìng zhùyuàn le."
      },
      {
       "hz": "B：別擔心，只要按照醫生的話去做，應該可以很快出院的。",
       "vi": "B: Đừng lo, chỉ cần làm theo lời bác sĩ thì chắc sẽ sớm ra viện thôi.",
       "py": "B: Bié dānxīn, zhǐyào ànzhào yīshēng dehuà qù zuò, yīnggāi kěyǐ hěnkuài chūyuàn de."
      },
      {
       "hz": "助理：下個月的員工訓練，要怎麼做呢？",
       "vi": "Trợ lý: Buổi đào tạo nhân viên tháng sau sẽ tổ chức thế nào ạ?",
       "py": "Zhùlǐ: Xiàgèyuè de yuángōng xùnliàn, yào zěnme zuò ne?"
      },
      {
       "hz": "老闆：昨天已經開過主管會議了，就按會議的決定做吧。",
       "vi": "Ông chủ: Hôm qua đã họp các trưởng bộ phận rồi, cứ làm theo quyết định của cuộc họp.",
       "py": "Lǎobǎn: Zuótiān yǐjīng kāi guò zhǔguǎn huìyì le, jiù àn huìyì de juédìng zuò ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "按照 / 按 / 照 + danh từ — theo, dựa theo",
   "giaiThich": "Giới từ chỉ cách làm theo phương pháp, quy định, kế hoạch, tiêu chuẩn — nhấn mạnh LÀM NHƯ THẾ NÀO. Khác 根據 (nhấn mạnh vì sao kết luận như vậy)."
  }
 ],
 "td3-14.4": [
  {
   "title": "1. （這）就要從……說起了",
   "points": [
    {
     "label": null,
     "formula": "本課對話中使用「（這）就要從……說起了」，表示說話者提到的某件事，沒辦法簡單說清楚，得從某個角度、部分或時間開始說，才能讓聽者明白。這個「說」可換成「看、做、寫、找、談、講、聊」等單音節動詞，表示開始做那件事。假如前句已提到主題，就不需用「這/那」。",
     "examples": [
      {
       "hz": "（這）就要從……說起了",
       "vi": "(Chuyện này) phải kể từ… trở đi",
       "py": "(zhè) jiùyào cóng…… shuōqǐ le"
      },
      {
       "hz": "這就要從牛郎、織女說起了。……這個計畫一再地調整內容，想找到舊資料的話，就要從兩年前的找起了。",
       "vi": "Chuyện này phải kể từ Ngưu Lang, Chức Nữ… Kế hoạch này đã điều chỉnh nội dung hết lần này đến lần khác, nếu muốn tìm tài liệu cũ thì phải tìm từ hai năm trước.",
       "py": "Zhè jiùyào cóng Niúláng, Zhīnǚ shuōqǐ le.…… zhège jìhuà yízài dì tiáozhěng nèiróng, xiǎng zhǎodào jiù zīliào dehuà, jiùyào cóng liǎngnián qián de zhǎo qǐ le."
      },
      {
       "hz": "A：我花了很多錢去健身房運動，怎麼過了三個月還沒變瘦？",
       "vi": "A: Tôi tốn rất nhiều tiền đi tập gym, sao ba tháng rồi vẫn chưa gầy đi?",
       "py": "A: Wǒ huā le hěnduō qián qù jiànshēnfáng yùndòng, zěnme guò le sāngè yuè hái méi biàn shòu?"
      },
      {
       "hz": "B：這就要從你的飲食習慣說起了。要是你不改掉愛吃零食的壞習慣，怎麼瘦得下來呢？",
       "vi": "B: Chuyện này phải bắt đầu từ thói quen ăn uống của bạn. Nếu bạn không bỏ thói quen xấu ăn vặt thì làm sao gầy được?",
       "py": "B: Zhè jiùyào cóng nǐ de yǐnshíxíguàn shuōqǐ le. Yàoshì nǐ bù gǎidiào ài chīlíngshí de huàixíguàn, zěnme shòu de xiàlái ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "（這）就要從……說起了 — chuyện này phải kể từ…",
   "giaiThich": "Dùng khi việc gì đó không nói gọn được, phải bắt đầu từ một mốc hoặc khía cạnh nào đó. 說 thay được bằng 看, 做, 寫, 找, 談, 講, 聊. Nếu chủ đề đã nêu ở câu trước thì bỏ 這/那."
  },
  {
   "title": "2. V下去",
   "points": [
    {
     "label": null,
     "formula": "「下去」放在動詞之後，當作補語，表示某個動作繼續進行，「V下去」後面不可加賓語。",
     "examples": [
      {
       "hz": "織女不能跟牛郎聚在一起，也不能在人間住下去，真可憐。",
       "vi": "Chức Nữ không được đoàn tụ với Ngưu Lang, cũng không được sống tiếp ở trần gian, thật đáng thương.",
       "py": "Zhīnǚ bùnéng gēn Niúláng jùzàiyìqǐ, yě bùnéng zài rénjiān zhù xiàqù, zhēnkělián."
      },
      {
       "hz": "這部電影很無聊，演員的演戲技巧也不好，我實在看不下去了。",
       "vi": "Bộ phim này rất nhàm chán, kỹ năng diễn xuất của diễn viên cũng kém, tôi thật sự không xem tiếp nổi.",
       "py": "Zhèbù diànyǐng hěn wúliáo, yǎnyuán de yǎnxì jìqiǎo yě bùhǎo, wǒ shízài kànbúxiàqù le."
      },
      {
       "hz": "A：總統給你們的任務很危險，你們能堅持下去嗎？",
       "vi": "A: Nhiệm vụ tổng thống giao cho các anh rất nguy hiểm, các anh có kiên trì tiếp được không?",
       "py": "A: Zǒngtǒng gěi nǐmen de rènwù hěn wéixiǎn, nǐmen néng jiānchíxiàqù ma?"
      },
      {
       "hz": "B：我們是軍人，為了國家，就算犧牲生命也必須完成。",
       "vi": "B: Chúng tôi là quân nhân, vì đất nước, dù có hy sinh tính mạng cũng phải hoàn thành.",
       "py": "B: Wǒmen shì jūnrén, wèile guójiā, jiùsuàn xīshēngshēngmìng yě bìxū wánchéng."
      },
      {
       "hz": "「幸虧」是副詞，後面敘述某個因為很幸運而發生的事件，要是沒有這個事件，「要不然」後面不好的、擔心的情況就會出現。",
       "vi": "“幸虧” là phó từ, phía sau kể một sự việc xảy ra nhờ may mắn; nếu không có sự việc đó thì tình huống xấu, đáng lo sau “要不然” đã xảy ra.",
       "py": "“Xìngkuī” shì fùcí, hòumiàn xùshù mǒugè yīnwèi hěn xìngyùn ér fāshēng de shìjiàn, yàoshì méiyǒu zhège shìjiàn, “yàobùrán” hòumiàn bùhǎo de, dānxīn de qíngkuàng jiù huì chūxiàn."
      },
      {
       "hz": "幸虧有姊姊們的幫助，要不然他們一生都不能團圓了。",
       "vi": "May mà có các chị giúp đỡ, nếu không cả đời họ cũng không được đoàn tụ.",
       "py": "Xìngkuī yǒu jiějie men de bāngzhù, yàobùrán tāmen yìshēng dōu bùnéng tuányuán le."
      },
      {
       "hz": "奶奶天天去拜拜的那座寺廟前天忽然塌了，幸虧她那天沒去，要不然就糟了。",
       "vi": "Ngôi chùa bà nội ngày nào cũng đến lễ hôm kia đột nhiên sập, may mà hôm đó bà không đi, nếu không thì nguy rồi.",
       "py": "Nǎinai tiāntiān qù bàibài de nà zuò sìmiào qiántiān hūrán tā le, xìngkuī tā nàtiān méi qù, yàobùrán jiù zāo le."
      },
      {
       "hz": "錢先生發生嚴重車禍時，幸虧警察就在路邊，趕快把他送到了醫院，要不然他的命就沒了。",
       "vi": "Khi ông Tiền gặp tai nạn giao thông nghiêm trọng, may mà cảnh sát ở ngay bên đường, kịp đưa ông vào bệnh viện, nếu không thì ông đã mất mạng.",
       "py": "Qián xiānshēng fāshēng yánzhòng chēhuò shí, xìngkuī jǐngchá jiù zài lùbiān, gǎnkuài bǎ tā sòngdào le yīyuàn, yàobùrán tā de mìng jiù méi le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 下去 — tiếp tục làm",
   "giaiThich": "下去 làm bổ ngữ sau động từ, chỉ hành động tiếp diễn. Lưu ý: sau V下去 KHÔNG được thêm tân ngữ."
  },
  {
   "title": "1. 根據",
   "points": [
    {
     "label": null,
     "formula": "「根據」是介詞，意思是用某個行為、情況、資料、研究結果等當作基礎，做出判斷、行動或結論。「根據」的後面接名詞短語，常使用的名詞如：報告、調查、經驗、法律、規定、情況、了解、看法、結果、說明等等。",
     "examples": [
      {
       "hz": "根據中國古代的說法，農曆七月初七是所謂的「七夕」。",
       "vi": "Theo cách nói thời Trung Hoa cổ đại, ngày mùng bảy tháng bảy âm lịch là cái gọi là “Thất Tịch”.",
       "py": "Gēnjù Zhōngguó gǔdài de shuōfǎ, nónglì qīyuè chūqī shì suǒwèi de “qīxì”."
      },
      {
       "hz": "根據我國的法律，十八歲以上才可以喝酒。",
       "vi": "Theo luật pháp nước ta, từ mười tám tuổi trở lên mới được uống rượu.",
       "py": "Gēnjù wǒguó de fǎlǜ, shíbāsuì yǐshàng cái kěyǐ hējiǔ."
      },
      {
       "hz": "根據氣象調查的資料，全球溫度比以前高了兩度，也因此造成了一些環境問題。",
       "vi": "Căn cứ vào số liệu khảo sát khí tượng, nhiệt độ toàn cầu đã cao hơn trước hai độ, cũng vì thế mà gây ra một số vấn đề môi trường.",
       "py": "Gēnjù qìxiàng diàochá de zīliào, quánqiú wēndù bǐ yǐqián gāo le liǎngdù, yě yīncǐ zàochéng le yìxiē huánjìng wèntí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "根據 — căn cứ vào",
   "giaiThich": "Giới từ, lấy hành vi/tình huống/số liệu/kết quả nghiên cứu làm cơ sở để phán đoán hay kết luận. Sau 根據 là cụm danh từ: 報告, 調查, 經驗, 法律, 規定, 結果…"
  },
  {
   "title": "2. 按照/按/照 NP + V",
   "points": [
    {
     "label": null,
     "formula": "「按照」是介詞，意思是以某種方法、要求、規定、計畫、決定、標準等來做事情。「按照」主要強調「怎麼做」，例如：咖啡的價錢是按照杯子大小算的、薪水是按照在公司地位的高低決定的。「按照」可以只用「按」或「照」；「根據」則強調「為什麼這麼說、這麼做；為什麼有這樣的結論」，例如：根據臺灣的升學制度，想進好大學就得通過大學考試。「根據」也可以當名詞，例如：網路上有很多訊息是沒有根據的，不能完全相信。",
     "examples": [
      {
       "hz": "按照過去的習俗，姑娘會在七夕把親手做的小東西送給朋友……A：怎麼辦？奶奶忽然生病住院了。",
       "vi": "Theo phong tục ngày xưa, các cô gái sẽ tặng bạn bè những món đồ nhỏ tự tay làm vào ngày Thất Tịch… A: Làm sao đây? Bà nội đột nhiên bị ốm phải nhập viện.",
       "py": "Ànzhào guòqù de xísú, gūniáng huì zài qīxì bǎ qīnshǒuzuò de xiǎodōngxī sònggěi péngyǒu…… A: Zěnmebàn? Nǎinai hūrán shēngbìng zhùyuàn le."
      },
      {
       "hz": "B：別擔心，只要按照醫生的話去做，應該可以很快出院的。",
       "vi": "B: Đừng lo, chỉ cần làm theo lời bác sĩ thì chắc sẽ sớm ra viện thôi.",
       "py": "B: Bié dānxīn, zhǐyào ànzhào yīshēng dehuà qù zuò, yīnggāi kěyǐ hěnkuài chūyuàn de."
      },
      {
       "hz": "助理：下個月的員工訓練，要怎麼做呢？",
       "vi": "Trợ lý: Buổi đào tạo nhân viên tháng sau sẽ tổ chức thế nào ạ?",
       "py": "Zhùlǐ: Xiàgèyuè de yuángōng xùnliàn, yào zěnme zuò ne?"
      },
      {
       "hz": "老闆：昨天已經開過主管會議了，就按會議的決定做吧。",
       "vi": "Ông chủ: Hôm qua đã họp các trưởng bộ phận rồi, cứ làm theo quyết định của cuộc họp.",
       "py": "Lǎobǎn: Zuótiān yǐjīng kāi guò zhǔguǎn huìyì le, jiù àn huìyì de juédìng zuò ba."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "按照 / 按 / 照 + danh từ — theo, dựa theo",
   "giaiThich": "Giới từ chỉ cách làm theo phương pháp, quy định, kế hoạch, tiêu chuẩn — nhấn mạnh LÀM NHƯ THẾ NÀO. Khác 根據 (nhấn mạnh vì sao kết luận như vậy)."
  }
 ],
 "td3-15.1": [
  {
   "title": "1. 簡直",
   "points": [
    {
     "label": null,
     "formula": "「簡直」是副詞，後面可連接「像、就像、是、就是」等。表示說話者用較誇張、生動的方式，來形容差不多達到某個情況或程度。",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "簡直 — đơn giản là, y như",
   "giaiThich": "Phó từ, sau nó hay có 像, 就像, 是, 就是. Người nói dùng lối cường điệu, sinh động để tả mức độ gần như đạt tới."
  },
  {
   "title": "1. ⋯⋯看過的人都說那幾條龍簡直快飛起來了⋯⋯",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "方小姐長得很漂亮，皮膚也很好，簡直像個仙女一樣。",
       "vi": "Cô Phương rất xinh, da cũng đẹp, quả thực như tiên nữ vậy.",
       "py": "Fāng xiǎojiě zhǎng de hěnpiàoliàng, pífū yě hěn hǎo, jiǎnzhí xiàng gè xiānnǚ yíyàng."
      },
      {
       "hz": "在工作上，畢經理總是做得又快又好，也從來沒犯過什麼錯，簡直就像機器一樣。",
       "vi": "Trong công việc, giám đốc Tất lúc nào cũng làm vừa nhanh vừa tốt, cũng chưa từng mắc lỗi gì, quả thực giống hệt cái máy.",
       "py": "Zài gōngzuò shàng, Bì jīnglǐ zǒngshì zuò de yòukuàiyòuhǎo, yě cónglái méi fàn guò shénme cuò, jiǎnzhí jiù xiàng jīqì yíyàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 簡直",
   "giaiThich": "Phần luyện tập đặt câu cường điệu với 簡直."
  },
  {
   "title": "2. Vs 得沒話說",
   "points": [
    {
     "label": null,
     "formula": "這個語法表示說話者對某件事情、某個情況，找不出更合適、更好的語詞來形容或說明。多用於正面語氣。",
     "examples": [
      {
       "hz": "⋯⋯大家都說那裡的夕陽美得沒話說呢！",
       "vi": "…ai cũng nói hoàng hôn ở đó đẹp hết chỗ chê!",
       "py": "…… dàjiā dōu shuō nàlǐ de xìyáng měi de méihuàshuō ne!"
      },
      {
       "hz": "這台電腦處理資料的速度快得話說，上傳和下載影片只要幾秒就完成了。",
       "vi": "Chiếc máy tính này xử lý dữ liệu nhanh hết chỗ chê, tải video lên hay tải xuống chỉ mất vài giây.",
       "py": "Zhè tái diànnǎo chǔlǐ zīliào de sùdùkuài de huà shuō, shàngchuán hàn xiàzài yǐngpiàn zhǐyào jǐmiǎo jiù wánchéng le."
      },
      {
       "hz": "方同學不僅用功讀書、尊敬老師、關心同學，假日還去育幼院服務，簡直是優秀得沒話說。",
       "vi": "Bạn Phương không những chăm chỉ học tập, kính trọng thầy cô, quan tâm bạn bè, ngày nghỉ còn đến trại trẻ mồ côi làm tình nguyện, quả thực xuất sắc hết chỗ chê.",
       "py": "Fāng tóngxué bùjǐn yònggōngdúshū, zūnjìnglǎoshī, guānxīn tóngxué, jiàrì hái qù yùyòuyuàn fúwù, jiǎnzhí shì yōuxiù de méihuàshuō."
      },
      {
       "hz": "這本小說介紹了許多中國的古人古事，內容既豐富又有趣。",
       "vi": "Quyển tiểu thuyết này giới thiệu nhiều nhân vật và câu chuyện cổ của Trung Hoa, nội dung vừa phong phú vừa thú vị.",
       "py": "Zhèběn xiǎoshuō jièshào le xǔduō Zhōngguó de gǔrén gǔ shì, nèiróng jì fēngfù yòu yǒuqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得沒話說 — … hết chỗ chê",
   "giaiThich": "Người nói không tìm được từ nào hay hơn để tả; phần lớn dùng với ý khen."
  },
  {
   "title": "1. 同時",
   "points": [
    {
     "label": null,
     "formula": "「同時」當名詞或副詞使用時，如例句 1、2，表示動作、事件在相同的時間或時段發生。在複句中的功能是連詞，連接兩個對等的句子，",
     "examples": [
      {
       "hz": "表示進一層的關係，如例句 3。",
       "vi": "Diễn tả quan hệ tăng tiến, như câu ví dụ 3.",
       "py": "Biǎoshì jìn yìcéng de guānxì, rú lìjù 3."
      },
      {
       "hz": "人類每天都在記錄歷史，同時也在創造歷史。",
       "vi": "Loài người mỗi ngày đều đang ghi lại lịch sử, đồng thời cũng đang tạo ra lịch sử.",
       "py": "Rénlèi měitiān dōu zài jìlù lìshǐ, tóngshí yě zài chuàngzào lìshǐ."
      },
      {
       "hz": "我和姊姊比賽看誰先把房間打掃乾淨，沒想到最後我們同時完成了。",
       "vi": "Tôi và chị thi xem ai dọn phòng sạch trước, không ngờ cuối cùng chúng tôi xong cùng lúc.",
       "py": "Wǒ hàn jiějie bǐsài kàn shéi xiān bǎ fángjiān dǎsǎo gānjìng, méixiǎngdào zuìhòu wǒmen tóngshí wánchéng le."
      },
      {
       "hz": "在中國歷史上，孔子是哲學方面的代表人物，同時也是華人最尊敬的老師。",
       "vi": "Trong lịch sử Trung Hoa, Khổng Tử là nhân vật tiêu biểu về triết học, đồng thời cũng là người thầy được người Hoa kính trọng nhất.",
       "py": "Zài Zhōngguó lìshǐ shàng, Kǒngzi shì zhéxué fāngmiàn de dàibiǎo rénwù, tóngshí yě shì huárén zuì zūnjìng de lǎoshī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "同時 — đồng thời",
   "giaiThich": "Làm danh từ hoặc phó từ khi chỉ hai việc xảy ra cùng lúc; trong câu ghép thì làm liên từ nối hai vế ngang nhau."
  },
  {
   "title": "2. ⋯⋯及⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「及」是連詞，意思和「和」、「跟」一樣，不過用法較正式，多用於書面。「及」的前後",
     "examples": [
      {
       "hz": "常是名詞、名詞短語，例如：中文及法文；培養好的習慣及生活作息。如果用來連接三個以上的名詞或名詞短語，「及」則用在最後兩個之間，例如：英國、美國及德國。",
       "vi": "Thường nối danh từ, cụm danh từ, ví dụ: tiếng Trung và tiếng Pháp; rèn luyện thói quen tốt và nếp sinh hoạt. Nếu dùng để nối từ ba danh từ hay cụm danh từ trở lên thì “及” đặt giữa hai thành phần cuối, ví dụ: Anh, Mỹ và Đức.",
       "py": "Cháng shì míngcí, míngcí duǎnyǔ, lìrú: Zhōngwén jí fǎwén; péiyǎng hǎo de xíguàn jí shēnghuó zuòxí. Rúguǒ yònglái liánjiē sāngè yǐshàng de míngcí huò míngcí duǎnyǔ, “jí” zé yòng zài zuìhòu liǎnggè zhījiān, lìrú: Yīngguó, Měiguó jí Déguó."
      },
      {
       "hz": "⋯⋯只要它具有歷史意義及紀念價值，就該被重視和保留。",
       "vi": "…chỉ cần nó có ý nghĩa lịch sử và giá trị kỷ niệm thì nên được coi trọng và bảo tồn.",
       "py": "…… zhǐyào tā jùyǒu lìshǐ yìyì jí jìniàn jiàzhí, jiù gāi bèi zhòngshì hàn bǎoliú."
      },
      {
       "hz": "手機、筆電及平板都是現代人常用的3C產品。",
       "vi": "Điện thoại, laptop và máy tính bảng đều là những sản phẩm điện tử người hiện đại thường dùng.",
       "py": "Shǒujī, bǐ diàn jí píngbǎn dōu shì xiàndàirén chángyòng de 3C chǎnpǐn."
      },
      {
       "hz": "老闆希望公司可以提高產品的品質及更好的服務。",
       "vi": "Ông chủ hy vọng công ty có thể nâng cao chất lượng sản phẩm và phục vụ tốt hơn.",
       "py": "Lǎobǎn xīwàng gōngsī kěyǐ tígāo chǎnpǐn de pǐnzhí jí gènghǎo de fúwù."
      },
      {
       "hz": "總而言之，⋯⋯ / 總之，⋯⋯",
       "vi": "Tóm lại, … / Nói tóm lại, …",
       "py": "Zǒng'éryánzhī,…… / zǒngzhī,……"
      },
      {
       "hz": "「總而言之」也可以簡單說成「總之」。「總而言之」是將前面的內容或情況做個簡單的結論，不用說得太詳細。",
       "vi": "“總而言之” cũng có thể nói gọn là “總之”. “總而言之” dùng để đưa ra kết luận ngắn gọn cho nội dung hay tình huống phía trước, không cần nói quá chi tiết.",
       "py": "“Zǒng'éryánzhī” yě kěyǐ jiǎndān shuō chéng “zǒngzhī”. “Zǒng'éryánzhī” shì jiāng qiánmiàn de nèiróng huò qíngkuàng zuò gè jiǎndān de jiélùn, búyòngshuō de tài xiángxì."
      },
      {
       "hz": "總而言之，古蹟就像歷史拼圖中的一片⋯⋯2.這個產品的品質有問題，不完全是小張的錯，檢查人員也有責任。總而言之，大家應該要一起解決這個問題。",
       "vi": "Tóm lại, di tích giống như một mảnh ghép trong bức tranh lịch sử… Chất lượng sản phẩm này có vấn đề, không hoàn toàn là lỗi của Tiểu Trương, nhân viên kiểm tra cũng có trách nhiệm. Tóm lại, mọi người nên cùng nhau giải quyết vấn đề này.",
       "py": "Zǒng'éryánzhī, gǔjì jiù xiàng lìshǐ pīntú zhōng de yípiàn…… 2. Zhège chǎnpǐn de pǐnzhí yǒu wèntí, bù wánquán shì xiǎozhāng de cuò, jiǎnchárényuán yě yǒu zérèn. Zǒng'éryánzhī, dàjiā yīnggāi yào yìqǐ jiějué zhège wèntí."
      },
      {
       "hz": "A：我理想的結婚對象，得有房子、車子，當然還得長得帥、聰明、體貼等等。總之，各方面都得一百分才行。",
       "vi": "A: Đối tượng kết hôn lý tưởng của tôi phải có nhà, có xe, đương nhiên còn phải đẹp trai, thông minh, chu đáo v.v. Tóm lại, mặt nào cũng phải đạt điểm tuyệt đối.",
       "py": "A: Wǒ lǐxiǎng de jiéhūn duìxiàng, de yǒu fángzi, chēzi, dāngrán hái děi zhǎngdeshuài, cōngmíng, tǐtiē děngděng. Zǒngzhī, gè fāngmiàn dōu děi yìbǎifēn cái xíng."
      },
      {
       "hz": "B：你別做夢了。",
       "vi": "B: Bạn đừng mơ nữa.",
       "py": "B: Nǐ bié zuòmèng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 及 … — và",
   "giaiThich": "Liên từ nghĩa như 和, 跟 nhưng trang trọng hơn, chủ yếu dùng trong văn viết."
  }
 ],
 "td3-15.2": [
  {
   "title": "1. 簡直",
   "points": [
    {
     "label": null,
     "formula": "「簡直」是副詞，後面可連接「像、就像、是、就是」等。表示說話者用較誇張、生動的方式，來形容差不多達到某個情況或程度。",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "簡直 — đơn giản là, y như",
   "giaiThich": "Phó từ, sau nó hay có 像, 就像, 是, 就是. Người nói dùng lối cường điệu, sinh động để tả mức độ gần như đạt tới."
  },
  {
   "title": "1. ⋯⋯看過的人都說那幾條龍簡直快飛起來了⋯⋯",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "方小姐長得很漂亮，皮膚也很好，簡直像個仙女一樣。",
       "vi": "Cô Phương rất xinh, da cũng đẹp, quả thực như tiên nữ vậy.",
       "py": "Fāng xiǎojiě zhǎng de hěnpiàoliàng, pífū yě hěn hǎo, jiǎnzhí xiàng gè xiānnǚ yíyàng."
      },
      {
       "hz": "在工作上，畢經理總是做得又快又好，也從來沒犯過什麼錯，簡直就像機器一樣。",
       "vi": "Trong công việc, giám đốc Tất lúc nào cũng làm vừa nhanh vừa tốt, cũng chưa từng mắc lỗi gì, quả thực giống hệt cái máy.",
       "py": "Zài gōngzuò shàng, Bì jīnglǐ zǒngshì zuò de yòukuàiyòuhǎo, yě cónglái méi fàn guò shénme cuò, jiǎnzhí jiù xiàng jīqì yíyàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 簡直",
   "giaiThich": "Phần luyện tập đặt câu cường điệu với 簡直."
  },
  {
   "title": "2. Vs 得沒話說",
   "points": [
    {
     "label": null,
     "formula": "這個語法表示說話者對某件事情、某個情況，找不出更合適、更好的語詞來形容或說明。多用於正面語氣。",
     "examples": [
      {
       "hz": "⋯⋯大家都說那裡的夕陽美得沒話說呢！",
       "vi": "…ai cũng nói hoàng hôn ở đó đẹp hết chỗ chê!",
       "py": "…… dàjiā dōu shuō nàlǐ de xìyáng měi de méihuàshuō ne!"
      },
      {
       "hz": "這台電腦處理資料的速度快得話說，上傳和下載影片只要幾秒就完成了。",
       "vi": "Chiếc máy tính này xử lý dữ liệu nhanh hết chỗ chê, tải video lên hay tải xuống chỉ mất vài giây.",
       "py": "Zhè tái diànnǎo chǔlǐ zīliào de sùdùkuài de huà shuō, shàngchuán hàn xiàzài yǐngpiàn zhǐyào jǐmiǎo jiù wánchéng le."
      },
      {
       "hz": "方同學不僅用功讀書、尊敬老師、關心同學，假日還去育幼院服務，簡直是優秀得沒話說。",
       "vi": "Bạn Phương không những chăm chỉ học tập, kính trọng thầy cô, quan tâm bạn bè, ngày nghỉ còn đến trại trẻ mồ côi làm tình nguyện, quả thực xuất sắc hết chỗ chê.",
       "py": "Fāng tóngxué bùjǐn yònggōngdúshū, zūnjìnglǎoshī, guānxīn tóngxué, jiàrì hái qù yùyòuyuàn fúwù, jiǎnzhí shì yōuxiù de méihuàshuō."
      },
      {
       "hz": "這本小說介紹了許多中國的古人古事，內容既豐富又有趣。",
       "vi": "Quyển tiểu thuyết này giới thiệu nhiều nhân vật và câu chuyện cổ của Trung Hoa, nội dung vừa phong phú vừa thú vị.",
       "py": "Zhèběn xiǎoshuō jièshào le xǔduō Zhōngguó de gǔrén gǔ shì, nèiróng jì fēngfù yòu yǒuqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得沒話說 — … hết chỗ chê",
   "giaiThich": "Người nói không tìm được từ nào hay hơn để tả; phần lớn dùng với ý khen."
  },
  {
   "title": "1. 同時",
   "points": [
    {
     "label": null,
     "formula": "「同時」當名詞或副詞使用時，如例句 1、2，表示動作、事件在相同的時間或時段發生。在複句中的功能是連詞，連接兩個對等的句子，",
     "examples": [
      {
       "hz": "表示進一層的關係，如例句 3。",
       "vi": "Diễn tả quan hệ tăng tiến, như câu ví dụ 3.",
       "py": "Biǎoshì jìn yìcéng de guānxì, rú lìjù 3."
      },
      {
       "hz": "人類每天都在記錄歷史，同時也在創造歷史。",
       "vi": "Loài người mỗi ngày đều đang ghi lại lịch sử, đồng thời cũng đang tạo ra lịch sử.",
       "py": "Rénlèi měitiān dōu zài jìlù lìshǐ, tóngshí yě zài chuàngzào lìshǐ."
      },
      {
       "hz": "我和姊姊比賽看誰先把房間打掃乾淨，沒想到最後我們同時完成了。",
       "vi": "Tôi và chị thi xem ai dọn phòng sạch trước, không ngờ cuối cùng chúng tôi xong cùng lúc.",
       "py": "Wǒ hàn jiějie bǐsài kàn shéi xiān bǎ fángjiān dǎsǎo gānjìng, méixiǎngdào zuìhòu wǒmen tóngshí wánchéng le."
      },
      {
       "hz": "在中國歷史上，孔子是哲學方面的代表人物，同時也是華人最尊敬的老師。",
       "vi": "Trong lịch sử Trung Hoa, Khổng Tử là nhân vật tiêu biểu về triết học, đồng thời cũng là người thầy được người Hoa kính trọng nhất.",
       "py": "Zài Zhōngguó lìshǐ shàng, Kǒngzi shì zhéxué fāngmiàn de dàibiǎo rénwù, tóngshí yě shì huárén zuì zūnjìng de lǎoshī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "同時 — đồng thời",
   "giaiThich": "Làm danh từ hoặc phó từ khi chỉ hai việc xảy ra cùng lúc; trong câu ghép thì làm liên từ nối hai vế ngang nhau."
  },
  {
   "title": "2. ⋯⋯及⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「及」是連詞，意思和「和」、「跟」一樣，不過用法較正式，多用於書面。「及」的前後",
     "examples": [
      {
       "hz": "常是名詞、名詞短語，例如：中文及法文；培養好的習慣及生活作息。如果用來連接三個以上的名詞或名詞短語，「及」則用在最後兩個之間，例如：英國、美國及德國。",
       "vi": "Thường nối danh từ, cụm danh từ, ví dụ: tiếng Trung và tiếng Pháp; rèn luyện thói quen tốt và nếp sinh hoạt. Nếu dùng để nối từ ba danh từ hay cụm danh từ trở lên thì “及” đặt giữa hai thành phần cuối, ví dụ: Anh, Mỹ và Đức.",
       "py": "Cháng shì míngcí, míngcí duǎnyǔ, lìrú: Zhōngwén jí fǎwén; péiyǎng hǎo de xíguàn jí shēnghuó zuòxí. Rúguǒ yònglái liánjiē sāngè yǐshàng de míngcí huò míngcí duǎnyǔ, “jí” zé yòng zài zuìhòu liǎnggè zhījiān, lìrú: Yīngguó, Měiguó jí Déguó."
      },
      {
       "hz": "⋯⋯只要它具有歷史意義及紀念價值，就該被重視和保留。",
       "vi": "…chỉ cần nó có ý nghĩa lịch sử và giá trị kỷ niệm thì nên được coi trọng và bảo tồn.",
       "py": "…… zhǐyào tā jùyǒu lìshǐ yìyì jí jìniàn jiàzhí, jiù gāi bèi zhòngshì hàn bǎoliú."
      },
      {
       "hz": "手機、筆電及平板都是現代人常用的3C產品。",
       "vi": "Điện thoại, laptop và máy tính bảng đều là những sản phẩm điện tử người hiện đại thường dùng.",
       "py": "Shǒujī, bǐ diàn jí píngbǎn dōu shì xiàndàirén chángyòng de 3C chǎnpǐn."
      },
      {
       "hz": "老闆希望公司可以提高產品的品質及更好的服務。",
       "vi": "Ông chủ hy vọng công ty có thể nâng cao chất lượng sản phẩm và phục vụ tốt hơn.",
       "py": "Lǎobǎn xīwàng gōngsī kěyǐ tígāo chǎnpǐn de pǐnzhí jí gènghǎo de fúwù."
      },
      {
       "hz": "總而言之，⋯⋯ / 總之，⋯⋯",
       "vi": "Tóm lại, … / Nói tóm lại, …",
       "py": "Zǒng'éryánzhī,…… / zǒngzhī,……"
      },
      {
       "hz": "「總而言之」也可以簡單說成「總之」。「總而言之」是將前面的內容或情況做個簡單的結論，不用說得太詳細。",
       "vi": "“總而言之” cũng có thể nói gọn là “總之”. “總而言之” dùng để đưa ra kết luận ngắn gọn cho nội dung hay tình huống phía trước, không cần nói quá chi tiết.",
       "py": "“Zǒng'éryánzhī” yě kěyǐ jiǎndān shuō chéng “zǒngzhī”. “Zǒng'éryánzhī” shì jiāng qiánmiàn de nèiróng huò qíngkuàng zuò gè jiǎndān de jiélùn, búyòngshuō de tài xiángxì."
      },
      {
       "hz": "總而言之，古蹟就像歷史拼圖中的一片⋯⋯2.這個產品的品質有問題，不完全是小張的錯，檢查人員也有責任。總而言之，大家應該要一起解決這個問題。",
       "vi": "Tóm lại, di tích giống như một mảnh ghép trong bức tranh lịch sử… Chất lượng sản phẩm này có vấn đề, không hoàn toàn là lỗi của Tiểu Trương, nhân viên kiểm tra cũng có trách nhiệm. Tóm lại, mọi người nên cùng nhau giải quyết vấn đề này.",
       "py": "Zǒng'éryánzhī, gǔjì jiù xiàng lìshǐ pīntú zhōng de yípiàn…… 2. Zhège chǎnpǐn de pǐnzhí yǒu wèntí, bù wánquán shì xiǎozhāng de cuò, jiǎnchárényuán yě yǒu zérèn. Zǒng'éryánzhī, dàjiā yīnggāi yào yìqǐ jiějué zhège wèntí."
      },
      {
       "hz": "A：我理想的結婚對象，得有房子、車子，當然還得長得帥、聰明、體貼等等。總之，各方面都得一百分才行。",
       "vi": "A: Đối tượng kết hôn lý tưởng của tôi phải có nhà, có xe, đương nhiên còn phải đẹp trai, thông minh, chu đáo v.v. Tóm lại, mặt nào cũng phải đạt điểm tuyệt đối.",
       "py": "A: Wǒ lǐxiǎng de jiéhūn duìxiàng, de yǒu fángzi, chēzi, dāngrán hái děi zhǎngdeshuài, cōngmíng, tǐtiē děngděng. Zǒngzhī, gè fāngmiàn dōu děi yìbǎifēn cái xíng."
      },
      {
       "hz": "B：你別做夢了。",
       "vi": "B: Bạn đừng mơ nữa.",
       "py": "B: Nǐ bié zuòmèng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 及 … — và",
   "giaiThich": "Liên từ nghĩa như 和, 跟 nhưng trang trọng hơn, chủ yếu dùng trong văn viết."
  }
 ],
 "td3-15.3": [
  {
   "title": "1. 簡直",
   "points": [
    {
     "label": null,
     "formula": "「簡直」是副詞，後面可連接「像、就像、是、就是」等。表示說話者用較誇張、生動的方式，來形容差不多達到某個情況或程度。",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "簡直 — đơn giản là, y như",
   "giaiThich": "Phó từ, sau nó hay có 像, 就像, 是, 就是. Người nói dùng lối cường điệu, sinh động để tả mức độ gần như đạt tới."
  },
  {
   "title": "1. ⋯⋯看過的人都說那幾條龍簡直快飛起來了⋯⋯",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "方小姐長得很漂亮，皮膚也很好，簡直像個仙女一樣。",
       "vi": "Cô Phương rất xinh, da cũng đẹp, quả thực như tiên nữ vậy.",
       "py": "Fāng xiǎojiě zhǎng de hěnpiàoliàng, pífū yě hěn hǎo, jiǎnzhí xiàng gè xiānnǚ yíyàng."
      },
      {
       "hz": "在工作上，畢經理總是做得又快又好，也從來沒犯過什麼錯，簡直就像機器一樣。",
       "vi": "Trong công việc, giám đốc Tất lúc nào cũng làm vừa nhanh vừa tốt, cũng chưa từng mắc lỗi gì, quả thực giống hệt cái máy.",
       "py": "Zài gōngzuò shàng, Bì jīnglǐ zǒngshì zuò de yòukuàiyòuhǎo, yě cónglái méi fàn guò shénme cuò, jiǎnzhí jiù xiàng jīqì yíyàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 簡直",
   "giaiThich": "Phần luyện tập đặt câu cường điệu với 簡直."
  },
  {
   "title": "2. Vs 得沒話說",
   "points": [
    {
     "label": null,
     "formula": "這個語法表示說話者對某件事情、某個情況，找不出更合適、更好的語詞來形容或說明。多用於正面語氣。",
     "examples": [
      {
       "hz": "⋯⋯大家都說那裡的夕陽美得沒話說呢！",
       "vi": "…ai cũng nói hoàng hôn ở đó đẹp hết chỗ chê!",
       "py": "…… dàjiā dōu shuō nàlǐ de xìyáng měi de méihuàshuō ne!"
      },
      {
       "hz": "這台電腦處理資料的速度快得話說，上傳和下載影片只要幾秒就完成了。",
       "vi": "Chiếc máy tính này xử lý dữ liệu nhanh hết chỗ chê, tải video lên hay tải xuống chỉ mất vài giây.",
       "py": "Zhè tái diànnǎo chǔlǐ zīliào de sùdùkuài de huà shuō, shàngchuán hàn xiàzài yǐngpiàn zhǐyào jǐmiǎo jiù wánchéng le."
      },
      {
       "hz": "方同學不僅用功讀書、尊敬老師、關心同學，假日還去育幼院服務，簡直是優秀得沒話說。",
       "vi": "Bạn Phương không những chăm chỉ học tập, kính trọng thầy cô, quan tâm bạn bè, ngày nghỉ còn đến trại trẻ mồ côi làm tình nguyện, quả thực xuất sắc hết chỗ chê.",
       "py": "Fāng tóngxué bùjǐn yònggōngdúshū, zūnjìnglǎoshī, guānxīn tóngxué, jiàrì hái qù yùyòuyuàn fúwù, jiǎnzhí shì yōuxiù de méihuàshuō."
      },
      {
       "hz": "這本小說介紹了許多中國的古人古事，內容既豐富又有趣。",
       "vi": "Quyển tiểu thuyết này giới thiệu nhiều nhân vật và câu chuyện cổ của Trung Hoa, nội dung vừa phong phú vừa thú vị.",
       "py": "Zhèběn xiǎoshuō jièshào le xǔduō Zhōngguó de gǔrén gǔ shì, nèiróng jì fēngfù yòu yǒuqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得沒話說 — … hết chỗ chê",
   "giaiThich": "Người nói không tìm được từ nào hay hơn để tả; phần lớn dùng với ý khen."
  },
  {
   "title": "1. 同時",
   "points": [
    {
     "label": null,
     "formula": "「同時」當名詞或副詞使用時，如例句 1、2，表示動作、事件在相同的時間或時段發生。在複句中的功能是連詞，連接兩個對等的句子，",
     "examples": [
      {
       "hz": "表示進一層的關係，如例句 3。",
       "vi": "Diễn tả quan hệ tăng tiến, như câu ví dụ 3.",
       "py": "Biǎoshì jìn yìcéng de guānxì, rú lìjù 3."
      },
      {
       "hz": "人類每天都在記錄歷史，同時也在創造歷史。",
       "vi": "Loài người mỗi ngày đều đang ghi lại lịch sử, đồng thời cũng đang tạo ra lịch sử.",
       "py": "Rénlèi měitiān dōu zài jìlù lìshǐ, tóngshí yě zài chuàngzào lìshǐ."
      },
      {
       "hz": "我和姊姊比賽看誰先把房間打掃乾淨，沒想到最後我們同時完成了。",
       "vi": "Tôi và chị thi xem ai dọn phòng sạch trước, không ngờ cuối cùng chúng tôi xong cùng lúc.",
       "py": "Wǒ hàn jiějie bǐsài kàn shéi xiān bǎ fángjiān dǎsǎo gānjìng, méixiǎngdào zuìhòu wǒmen tóngshí wánchéng le."
      },
      {
       "hz": "在中國歷史上，孔子是哲學方面的代表人物，同時也是華人最尊敬的老師。",
       "vi": "Trong lịch sử Trung Hoa, Khổng Tử là nhân vật tiêu biểu về triết học, đồng thời cũng là người thầy được người Hoa kính trọng nhất.",
       "py": "Zài Zhōngguó lìshǐ shàng, Kǒngzi shì zhéxué fāngmiàn de dàibiǎo rénwù, tóngshí yě shì huárén zuì zūnjìng de lǎoshī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "同時 — đồng thời",
   "giaiThich": "Làm danh từ hoặc phó từ khi chỉ hai việc xảy ra cùng lúc; trong câu ghép thì làm liên từ nối hai vế ngang nhau."
  },
  {
   "title": "2. ⋯⋯及⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「及」是連詞，意思和「和」、「跟」一樣，不過用法較正式，多用於書面。「及」的前後",
     "examples": [
      {
       "hz": "常是名詞、名詞短語，例如：中文及法文；培養好的習慣及生活作息。如果用來連接三個以上的名詞或名詞短語，「及」則用在最後兩個之間，例如：英國、美國及德國。",
       "vi": "Thường nối danh từ, cụm danh từ, ví dụ: tiếng Trung và tiếng Pháp; rèn luyện thói quen tốt và nếp sinh hoạt. Nếu dùng để nối từ ba danh từ hay cụm danh từ trở lên thì “及” đặt giữa hai thành phần cuối, ví dụ: Anh, Mỹ và Đức.",
       "py": "Cháng shì míngcí, míngcí duǎnyǔ, lìrú: Zhōngwén jí fǎwén; péiyǎng hǎo de xíguàn jí shēnghuó zuòxí. Rúguǒ yònglái liánjiē sāngè yǐshàng de míngcí huò míngcí duǎnyǔ, “jí” zé yòng zài zuìhòu liǎnggè zhījiān, lìrú: Yīngguó, Měiguó jí Déguó."
      },
      {
       "hz": "⋯⋯只要它具有歷史意義及紀念價值，就該被重視和保留。",
       "vi": "…chỉ cần nó có ý nghĩa lịch sử và giá trị kỷ niệm thì nên được coi trọng và bảo tồn.",
       "py": "…… zhǐyào tā jùyǒu lìshǐ yìyì jí jìniàn jiàzhí, jiù gāi bèi zhòngshì hàn bǎoliú."
      },
      {
       "hz": "手機、筆電及平板都是現代人常用的3C產品。",
       "vi": "Điện thoại, laptop và máy tính bảng đều là những sản phẩm điện tử người hiện đại thường dùng.",
       "py": "Shǒujī, bǐ diàn jí píngbǎn dōu shì xiàndàirén chángyòng de 3C chǎnpǐn."
      },
      {
       "hz": "老闆希望公司可以提高產品的品質及更好的服務。",
       "vi": "Ông chủ hy vọng công ty có thể nâng cao chất lượng sản phẩm và phục vụ tốt hơn.",
       "py": "Lǎobǎn xīwàng gōngsī kěyǐ tígāo chǎnpǐn de pǐnzhí jí gènghǎo de fúwù."
      },
      {
       "hz": "總而言之，⋯⋯ / 總之，⋯⋯",
       "vi": "Tóm lại, … / Nói tóm lại, …",
       "py": "Zǒng'éryánzhī,…… / zǒngzhī,……"
      },
      {
       "hz": "「總而言之」也可以簡單說成「總之」。「總而言之」是將前面的內容或情況做個簡單的結論，不用說得太詳細。",
       "vi": "“總而言之” cũng có thể nói gọn là “總之”. “總而言之” dùng để đưa ra kết luận ngắn gọn cho nội dung hay tình huống phía trước, không cần nói quá chi tiết.",
       "py": "“Zǒng'éryánzhī” yě kěyǐ jiǎndān shuō chéng “zǒngzhī”. “Zǒng'éryánzhī” shì jiāng qiánmiàn de nèiróng huò qíngkuàng zuò gè jiǎndān de jiélùn, búyòngshuō de tài xiángxì."
      },
      {
       "hz": "總而言之，古蹟就像歷史拼圖中的一片⋯⋯2.這個產品的品質有問題，不完全是小張的錯，檢查人員也有責任。總而言之，大家應該要一起解決這個問題。",
       "vi": "Tóm lại, di tích giống như một mảnh ghép trong bức tranh lịch sử… Chất lượng sản phẩm này có vấn đề, không hoàn toàn là lỗi của Tiểu Trương, nhân viên kiểm tra cũng có trách nhiệm. Tóm lại, mọi người nên cùng nhau giải quyết vấn đề này.",
       "py": "Zǒng'éryánzhī, gǔjì jiù xiàng lìshǐ pīntú zhōng de yípiàn…… 2. Zhège chǎnpǐn de pǐnzhí yǒu wèntí, bù wánquán shì xiǎozhāng de cuò, jiǎnchárényuán yě yǒu zérèn. Zǒng'éryánzhī, dàjiā yīnggāi yào yìqǐ jiějué zhège wèntí."
      },
      {
       "hz": "A：我理想的結婚對象，得有房子、車子，當然還得長得帥、聰明、體貼等等。總之，各方面都得一百分才行。",
       "vi": "A: Đối tượng kết hôn lý tưởng của tôi phải có nhà, có xe, đương nhiên còn phải đẹp trai, thông minh, chu đáo v.v. Tóm lại, mặt nào cũng phải đạt điểm tuyệt đối.",
       "py": "A: Wǒ lǐxiǎng de jiéhūn duìxiàng, de yǒu fángzi, chēzi, dāngrán hái děi zhǎngdeshuài, cōngmíng, tǐtiē děngděng. Zǒngzhī, gè fāngmiàn dōu děi yìbǎifēn cái xíng."
      },
      {
       "hz": "B：你別做夢了。",
       "vi": "B: Bạn đừng mơ nữa.",
       "py": "B: Nǐ bié zuòmèng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 及 … — và",
   "giaiThich": "Liên từ nghĩa như 和, 跟 nhưng trang trọng hơn, chủ yếu dùng trong văn viết."
  }
 ],
 "td3-15.4": [
  {
   "title": "1. 簡直",
   "points": [
    {
     "label": null,
     "formula": "「簡直」是副詞，後面可連接「像、就像、是、就是」等。表示說話者用較誇張、生動的方式，來形容差不多達到某個情況或程度。",
     "examples": [],
     "answer": null
    }
   ],
   "titleVi": "簡直 — đơn giản là, y như",
   "giaiThich": "Phó từ, sau nó hay có 像, 就像, 是, 就是. Người nói dùng lối cường điệu, sinh động để tả mức độ gần như đạt tới."
  },
  {
   "title": "1. ⋯⋯看過的人都說那幾條龍簡直快飛起來了⋯⋯",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "方小姐長得很漂亮，皮膚也很好，簡直像個仙女一樣。",
       "vi": "Cô Phương rất xinh, da cũng đẹp, quả thực như tiên nữ vậy.",
       "py": "Fāng xiǎojiě zhǎng de hěnpiàoliàng, pífū yě hěn hǎo, jiǎnzhí xiàng gè xiānnǚ yíyàng."
      },
      {
       "hz": "在工作上，畢經理總是做得又快又好，也從來沒犯過什麼錯，簡直就像機器一樣。",
       "vi": "Trong công việc, giám đốc Tất lúc nào cũng làm vừa nhanh vừa tốt, cũng chưa từng mắc lỗi gì, quả thực giống hệt cái máy.",
       "py": "Zài gōngzuò shàng, Bì jīnglǐ zǒngshì zuò de yòukuàiyòuhǎo, yě cónglái méi fàn guò shénme cuò, jiǎnzhí jiù xiàng jīqì yíyàng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 簡直",
   "giaiThich": "Phần luyện tập đặt câu cường điệu với 簡直."
  },
  {
   "title": "2. Vs 得沒話說",
   "points": [
    {
     "label": null,
     "formula": "這個語法表示說話者對某件事情、某個情況，找不出更合適、更好的語詞來形容或說明。多用於正面語氣。",
     "examples": [
      {
       "hz": "⋯⋯大家都說那裡的夕陽美得沒話說呢！",
       "vi": "…ai cũng nói hoàng hôn ở đó đẹp hết chỗ chê!",
       "py": "…… dàjiā dōu shuō nàlǐ de xìyáng měi de méihuàshuō ne!"
      },
      {
       "hz": "這台電腦處理資料的速度快得話說，上傳和下載影片只要幾秒就完成了。",
       "vi": "Chiếc máy tính này xử lý dữ liệu nhanh hết chỗ chê, tải video lên hay tải xuống chỉ mất vài giây.",
       "py": "Zhè tái diànnǎo chǔlǐ zīliào de sùdùkuài de huà shuō, shàngchuán hàn xiàzài yǐngpiàn zhǐyào jǐmiǎo jiù wánchéng le."
      },
      {
       "hz": "方同學不僅用功讀書、尊敬老師、關心同學，假日還去育幼院服務，簡直是優秀得沒話說。",
       "vi": "Bạn Phương không những chăm chỉ học tập, kính trọng thầy cô, quan tâm bạn bè, ngày nghỉ còn đến trại trẻ mồ côi làm tình nguyện, quả thực xuất sắc hết chỗ chê.",
       "py": "Fāng tóngxué bùjǐn yònggōngdúshū, zūnjìnglǎoshī, guānxīn tóngxué, jiàrì hái qù yùyòuyuàn fúwù, jiǎnzhí shì yōuxiù de méihuàshuō."
      },
      {
       "hz": "這本小說介紹了許多中國的古人古事，內容既豐富又有趣。",
       "vi": "Quyển tiểu thuyết này giới thiệu nhiều nhân vật và câu chuyện cổ của Trung Hoa, nội dung vừa phong phú vừa thú vị.",
       "py": "Zhèběn xiǎoshuō jièshào le xǔduō Zhōngguó de gǔrén gǔ shì, nèiróng jì fēngfù yòu yǒuqù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得沒話說 — … hết chỗ chê",
   "giaiThich": "Người nói không tìm được từ nào hay hơn để tả; phần lớn dùng với ý khen."
  },
  {
   "title": "1. 同時",
   "points": [
    {
     "label": null,
     "formula": "「同時」當名詞或副詞使用時，如例句 1、2，表示動作、事件在相同的時間或時段發生。在複句中的功能是連詞，連接兩個對等的句子，",
     "examples": [
      {
       "hz": "表示進一層的關係，如例句 3。",
       "vi": "Diễn tả quan hệ tăng tiến, như câu ví dụ 3.",
       "py": "Biǎoshì jìn yìcéng de guānxì, rú lìjù 3."
      },
      {
       "hz": "人類每天都在記錄歷史，同時也在創造歷史。",
       "vi": "Loài người mỗi ngày đều đang ghi lại lịch sử, đồng thời cũng đang tạo ra lịch sử.",
       "py": "Rénlèi měitiān dōu zài jìlù lìshǐ, tóngshí yě zài chuàngzào lìshǐ."
      },
      {
       "hz": "我和姊姊比賽看誰先把房間打掃乾淨，沒想到最後我們同時完成了。",
       "vi": "Tôi và chị thi xem ai dọn phòng sạch trước, không ngờ cuối cùng chúng tôi xong cùng lúc.",
       "py": "Wǒ hàn jiějie bǐsài kàn shéi xiān bǎ fángjiān dǎsǎo gānjìng, méixiǎngdào zuìhòu wǒmen tóngshí wánchéng le."
      },
      {
       "hz": "在中國歷史上，孔子是哲學方面的代表人物，同時也是華人最尊敬的老師。",
       "vi": "Trong lịch sử Trung Hoa, Khổng Tử là nhân vật tiêu biểu về triết học, đồng thời cũng là người thầy được người Hoa kính trọng nhất.",
       "py": "Zài Zhōngguó lìshǐ shàng, Kǒngzi shì zhéxué fāngmiàn de dàibiǎo rénwù, tóngshí yě shì huárén zuì zūnjìng de lǎoshī."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "同時 — đồng thời",
   "giaiThich": "Làm danh từ hoặc phó từ khi chỉ hai việc xảy ra cùng lúc; trong câu ghép thì làm liên từ nối hai vế ngang nhau."
  },
  {
   "title": "2. ⋯⋯及⋯⋯",
   "points": [
    {
     "label": null,
     "formula": "「及」是連詞，意思和「和」、「跟」一樣，不過用法較正式，多用於書面。「及」的前後",
     "examples": [
      {
       "hz": "常是名詞、名詞短語，例如：中文及法文；培養好的習慣及生活作息。如果用來連接三個以上的名詞或名詞短語，「及」則用在最後兩個之間，例如：英國、美國及德國。",
       "vi": "Thường nối danh từ, cụm danh từ, ví dụ: tiếng Trung và tiếng Pháp; rèn luyện thói quen tốt và nếp sinh hoạt. Nếu dùng để nối từ ba danh từ hay cụm danh từ trở lên thì “及” đặt giữa hai thành phần cuối, ví dụ: Anh, Mỹ và Đức.",
       "py": "Cháng shì míngcí, míngcí duǎnyǔ, lìrú: Zhōngwén jí fǎwén; péiyǎng hǎo de xíguàn jí shēnghuó zuòxí. Rúguǒ yònglái liánjiē sāngè yǐshàng de míngcí huò míngcí duǎnyǔ, “jí” zé yòng zài zuìhòu liǎnggè zhījiān, lìrú: Yīngguó, Měiguó jí Déguó."
      },
      {
       "hz": "⋯⋯只要它具有歷史意義及紀念價值，就該被重視和保留。",
       "vi": "…chỉ cần nó có ý nghĩa lịch sử và giá trị kỷ niệm thì nên được coi trọng và bảo tồn.",
       "py": "…… zhǐyào tā jùyǒu lìshǐ yìyì jí jìniàn jiàzhí, jiù gāi bèi zhòngshì hàn bǎoliú."
      },
      {
       "hz": "手機、筆電及平板都是現代人常用的3C產品。",
       "vi": "Điện thoại, laptop và máy tính bảng đều là những sản phẩm điện tử người hiện đại thường dùng.",
       "py": "Shǒujī, bǐ diàn jí píngbǎn dōu shì xiàndàirén chángyòng de 3C chǎnpǐn."
      },
      {
       "hz": "老闆希望公司可以提高產品的品質及更好的服務。",
       "vi": "Ông chủ hy vọng công ty có thể nâng cao chất lượng sản phẩm và phục vụ tốt hơn.",
       "py": "Lǎobǎn xīwàng gōngsī kěyǐ tígāo chǎnpǐn de pǐnzhí jí gènghǎo de fúwù."
      },
      {
       "hz": "總而言之，⋯⋯ / 總之，⋯⋯",
       "vi": "Tóm lại, … / Nói tóm lại, …",
       "py": "Zǒng'éryánzhī,…… / zǒngzhī,……"
      },
      {
       "hz": "「總而言之」也可以簡單說成「總之」。「總而言之」是將前面的內容或情況做個簡單的結論，不用說得太詳細。",
       "vi": "“總而言之” cũng có thể nói gọn là “總之”. “總而言之” dùng để đưa ra kết luận ngắn gọn cho nội dung hay tình huống phía trước, không cần nói quá chi tiết.",
       "py": "“Zǒng'éryánzhī” yě kěyǐ jiǎndān shuō chéng “zǒngzhī”. “Zǒng'éryánzhī” shì jiāng qiánmiàn de nèiróng huò qíngkuàng zuò gè jiǎndān de jiélùn, búyòngshuō de tài xiángxì."
      },
      {
       "hz": "總而言之，古蹟就像歷史拼圖中的一片⋯⋯2.這個產品的品質有問題，不完全是小張的錯，檢查人員也有責任。總而言之，大家應該要一起解決這個問題。",
       "vi": "Tóm lại, di tích giống như một mảnh ghép trong bức tranh lịch sử… Chất lượng sản phẩm này có vấn đề, không hoàn toàn là lỗi của Tiểu Trương, nhân viên kiểm tra cũng có trách nhiệm. Tóm lại, mọi người nên cùng nhau giải quyết vấn đề này.",
       "py": "Zǒng'éryánzhī, gǔjì jiù xiàng lìshǐ pīntú zhōng de yípiàn…… 2. Zhège chǎnpǐn de pǐnzhí yǒu wèntí, bù wánquán shì xiǎozhāng de cuò, jiǎnchárényuán yě yǒu zérèn. Zǒng'éryánzhī, dàjiā yīnggāi yào yìqǐ jiějué zhège wèntí."
      },
      {
       "hz": "A：我理想的結婚對象，得有房子、車子，當然還得長得帥、聰明、體貼等等。總之，各方面都得一百分才行。",
       "vi": "A: Đối tượng kết hôn lý tưởng của tôi phải có nhà, có xe, đương nhiên còn phải đẹp trai, thông minh, chu đáo v.v. Tóm lại, mặt nào cũng phải đạt điểm tuyệt đối.",
       "py": "A: Wǒ lǐxiǎng de jiéhūn duìxiàng, de yǒu fángzi, chēzi, dāngrán hái děi zhǎngdeshuài, cōngmíng, tǐtiē děngděng. Zǒngzhī, gè fāngmiàn dōu děi yìbǎifēn cái xíng."
      },
      {
       "hz": "B：你別做夢了。",
       "vi": "B: Bạn đừng mơ nữa.",
       "py": "B: Nǐ bié zuòmèng le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 及 … — và",
   "giaiThich": "Liên từ nghĩa như 和, 跟 nhưng trang trọng hơn, chủ yếu dùng trong văn viết."
  }
 ],
 "td3-16.1": [
  {
   "title": "1. 當作/當做",
   "points": [
    {
     "label": null,
     "formula": "「當作」是狀態動詞，有兩種用法：(1) 把前後描述的對象或事情認定是相同的。例如：「他常常加班，已經把公司當作自己的家了。」、「老師常把我們當作是自己的孩子，非常關心我們。」、「我很討厭小方，就算他從我旁邊經過，我也當作沒看見。」(2) 表示對前後描述對象或事情的判斷。例如：「張阿姨已經四十多歲了，看起來卻很年輕，常被人當作是學生。」、「我把這次的感冒當作是一般的感冒，所以沒去看醫生。」",
     "examples": [
      {
       "hz": "你說的沒錯，還能吃的食物就不該被當作垃圾丟掉。",
       "vi": "Bạn nói đúng, đồ ăn còn ăn được thì không nên coi là rác mà vứt đi.",
       "py": "Nǐ shuō de méicuò, hái néng chī de shíwù jiù bùgāi bèi dàngzuò lèsè diūdiào."
      },
      {
       "hz": "如果沒人舉手問問題，老師就當作你們都懂了。",
       "vi": "Nếu không ai giơ tay hỏi, thầy giáo sẽ coi như các em đều hiểu rồi.",
       "py": "Rúguǒ méi rén jǔshǒu wèn wèntí, lǎoshī jiù dàngzuò nǐmen dōu dǒng le."
      },
      {
       "hz": "弟弟運動後口很渴，把冰箱裡的水果酒當作果汁喝了，真",
       "vi": "Em trai tập thể dục xong rất khát, uống nhầm rượu trái cây trong tủ lạnh vì tưởng là nước ép, thật là…",
       "py": "Dìdi yùndòng hòu kǒu hěnkě, bǎ bīngxiāng lǐ de shuǐguǒ jiǔ dàngzuò guǒzhī hē le, zhēn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "當作 / 當做 — coi như, xem như",
   "giaiThich": "Hai cách dùng: (1) coi hai đối tượng như nhau (把公司當作自己的家); (2) đưa ra phán đoán về đối tượng."
  },
  {
   "title": "2. 至少",
   "points": [
    {
     "label": null,
     "formula": "「至少」當作副詞，後面接數量詞或短句，用來表示最低範圍或程度。 「由於」的後面表示原因或理由，「因此」的後面表示結果。比「因為⋯⋯，所以⋯⋯」的用法正式。「因為」可以放在前句或後句的句首；「由於」多放在前句的句首，若要放在後句要寫「⋯⋯，是由於⋯⋯」。例如：這座城市的空氣品質越來越差，是由於工廠越來越多。",
     "examples": [
      {
       "hz": "臺灣雖然面積小，生活空間不大，但至少不必擔心食物不夠，實在太幸福了。",
       "vi": "Đài Loan tuy diện tích nhỏ, không gian sống không rộng, nhưng ít nhất không phải lo thiếu đồ ăn, thật là hạnh phúc.",
       "py": "Táiwān suīrán miànjī xiǎo, shēnghuókōngjiān bú dà, dàn zhìshǎo búbì dānxīn shíwù búgòu, shízài tài xìngfú le."
      },
      {
       "hz": "這次的車禍，他受了很嚴重的傷，至少兩個月才能完全恢3.小英：昨天看了介紹中美洲的旅遊節目，很吸引人，我打算下個月就去當個背包客。",
       "vi": "Trong vụ tai nạn lần này anh ấy bị thương rất nặng, ít nhất hai tháng mới hồi phục hoàn toàn. Tiểu Anh: Hôm qua xem chương trình du lịch giới thiệu về Trung Mỹ, hấp dẫn lắm, tôi định tháng sau đi du lịch bụi.",
       "py": "Zhècì de chēhuò, tā shòu le hěn yánzhòng de shāng, zhìshǎo liǎnggè yuè cáinéng wánquán huī 3. Xiǎo yīng: Zuótiān kàn le jièshào zhōngměizhōu de lǚyóu jiémù, hěn xīyǐn rén, wǒ dǎsuàn xiàgèyuè jiù qù dāng gè bēibāokè."
      },
      {
       "hz": "小華：你太急了吧！至少得先聽聽其他人的意見，再看自己適合不適合。",
       "vi": "Tiểu Hoa: Bạn vội quá rồi! Ít nhất cũng phải nghe ý kiến người khác trước, rồi xem mình có hợp không đã.",
       "py": "Xiǎo huá: Nǐ tài jí le ba! Zhìshǎo děi xiān tīngtīng qítārén de yìjiàn, zài kàn zìjǐ shìhé bú shìhé."
      },
      {
       "hz": "由於新菜仍然無法吸引更多顧客上門，因此每天總是有一些還能吃的食物被丟進垃圾箱。",
       "vi": "Vì món mới vẫn không thu hút được thêm khách đến, nên ngày nào cũng có một ít đồ ăn còn ăn được bị vứt vào thùng rác.",
       "py": "Yóuyú xīn cài réngrán wúfǎ xīyǐn gèng duō gùkè shàngmén, yīncǐ měitiān zǒngshì yǒu yìxiē hái néng chī de shíwù bèi diū jìn lèsèxiāng."
      },
      {
       "hz": "由於這個都市規劃得不理想，（因此）商業活動增加後，交通就變得又擠又亂。",
       "vi": "Do thành phố này quy hoạch không hợp lý, (nên) khi hoạt động thương mại tăng lên thì giao thông trở nên vừa đông vừa loạn.",
       "py": "Yóuyú zhège dūshì guīhuà de bù lǐxiǎng, (yīncǐ) shāngyèhuódòng zēngjiā hòu, jiāotōng jiù biànde yòu jǐ yòu luàn."
      },
      {
       "hz": "由於人口不斷增加，居住土地的需求也越來越大，（因此）農業生產的土地就變少了。",
       "vi": "Do dân số không ngừng tăng, nhu cầu đất ở cũng ngày càng lớn, (nên) đất sản xuất nông nghiệp ngày càng ít đi.",
       "py": "Yóuyú rénkǒu búduàn zēngjiā, jūzhù tǔdì de xūqiú yě yuèláiyuè dà, (yīncǐ) nóngyè shēngchǎn de tǔdì jiù biàn shǎo le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至少 — ít nhất",
   "giaiThich": "Phó từ, sau nó là số lượng hoặc mệnh đề ngắn, nêu mức thấp nhất. Bài cũng có 由於……因此…… (do… nên…), trang trọng hơn 因為……所以……"
  },
  {
   "title": "2. 使得",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「使得」是及物狀態動詞。「使得」的前句是導致某個事件發生的原因，後句是前句導致或引起的結果，與「使（V）」的用法相似，但「使得」的用法較正式。已發生的事實常用「使得」；假設的情況常用「使」。例如：「由於這次強烈颱風帶來了大風大雨，使得很多地區都淹水了。」、「古代寺廟如能好好保留下來，就能使民眾更了解宗教的歷史意義。」",
       "vi": "“使得” là động từ trạng thái cập vật. Vế trước của “使得” là nguyên nhân dẫn đến sự việc, vế sau là kết quả do vế trước gây ra; cách dùng giống “使” nhưng trang trọng hơn. Sự việc đã xảy ra thường dùng “使得”, tình huống giả định thường dùng “使”. Ví dụ: “Do cơn bão mạnh lần này mang đến mưa to gió lớn, khiến nhiều khu vực bị ngập.”, “Nếu các ngôi chùa cổ được bảo tồn tốt thì có thể giúp người dân hiểu rõ hơn ý nghĩa lịch sử của tôn giáo.”",
       "py": "“Shǐde” shì jí wù zhuàngtài dòngcí. “Shǐde” de qián jù shì dǎozhì mǒugè shìjiàn fāshēng de yuányīn, hòu jù shì qián jù dǎozhì huò yǐnqǐ de jiéguǒ, yǔ “shǐ” de yòngfǎ xiāngsì, dàn “shǐde” de yòngfǎ jiào zhèngshì. Yǐ fāshēng de shìshí chángyòng “shǐde”; jiǎshè de qíngkuàng chángyòng “shǐ”. Lìrú: “Yóuyú zhècì qiángliè táifēng dàilái le dàfēng dàyǔ, shǐde hěnduō dìqū dōu yānshuǐ le.”, “gǔdài sìmiào rú néng hǎohǎo bǎoliú xiàlái, jiù néng shǐ mínzhòng gèng liǎojiě zōngjiào de lìshǐ yìyì.”"
      },
      {
       "hz": "⋯⋯每次想到這點都使得他夜裡睡不好。",
       "vi": "…mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ.",
       "py": "…… měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo."
      },
      {
       "hz": "九二一大地震的規模很大，使得許多房屋跟馬路都塌了。",
       "vi": "Trận động đất 21/9 có cường độ rất lớn, khiến nhiều nhà cửa và đường sá bị sập.",
       "py": "Jiǔ'èr yídà dìzhèn de guīmó hěndà, shǐde xǔduō fángwū gēn mǎlù dōu tā le."
      },
      {
       "hz": "由於紅毛城古蹟維持得很好，使得參觀的民眾一年比一年",
       "vi": "Do di tích Hồng Mao Thành được giữ gìn rất tốt, khiến người dân đến tham quan mỗi năm một…",
       "py": "Yóuyú hóngmáochéng gǔjì wéichí de hěn hǎo, shǐde cānguān de mínzhòng yìnián bǐ yìnián"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "使得 — khiến cho",
   "giaiThich": "Nêu kết quả do một nguyên nhân gây ra, thường dùng văn viết."
  },
  {
   "title": "3. 於是",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「於是」是連詞，連接前後兩個句子，後句是因為前句的情況而採取的行動。但自然現象不可使用「於是」，例如：「*天很黑，於是下雨了。」、「*強烈颱風來了，於是很多地區淹水了。」",
       "vi": "“於是” là liên từ, nối hai câu trước và sau, vế sau là hành động được thực hiện vì tình huống ở vế trước. Nhưng hiện tượng tự nhiên thì không dùng “於是”, ví dụ: “*Trời rất tối, thế là mưa rồi.”, “*Bão mạnh đến, thế là nhiều khu vực bị ngập.”",
       "py": "“Yúshì” shì liáncí, liánjiē qiánhòu liǎnggè jùzi, hòu jù shìyīnwèi qián jù de qíngkuàng ér cǎiqǔ de xíngdòng. Dàn zìrán xiànxiàng bùkě shǐyòng “yúshì”, lìrú: “* tiān hěn hēi, yúshì xiàyǔ le.”, “* qiángliè táifēng lái le, yúshì hěnduō dìqū yānshuǐ le.”"
      },
      {
       "hz": "每次想到這點都使得他夜裡睡不好。於是，他在餐廳門外放了一台冰箱⋯⋯2.現代人為了擁有更舒適的生活，於是發明了許多既好用、功能又多的生活用品。",
       "vi": "Mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ. Thế là ông đặt một chiếc tủ lạnh ngoài cửa nhà hàng… Con người hiện đại, để có cuộc sống thoải mái hơn, đã phát minh ra nhiều đồ dùng vừa dễ dùng vừa nhiều chức năng.",
       "py": "Měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo. Yúshì, tā zài cāntīng ménwài fàng le yìtái bīngxiāng…… 2. Xiàndàirén wèile yǒngyǒu gèng shūshì de shēnghuó, yúshì fāmíng le xǔduō jì hǎo yòng, gōngnéng yòu duō de shēnghuóyòngpǐn."
      },
      {
       "hz": "戴先生為公司付出很多，卻沒得到相對的肯定與合理的薪水，於是決定換工作。",
       "vi": "Anh Đới cống hiến rất nhiều cho công ty nhưng không được công nhận tương xứng và lương hợp lý, thế là quyết định đổi việc.",
       "py": "Dài xiānshēng wèi gōngsī fùchū hěnduō, què méi dédào xiāngduì de kěndìng yǔ hélǐ de xīnshuǐ, yúshì juédìng huàn gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "於是 — thế là",
   "giaiThich": "Liên từ nối tiếp: vì tình huống trước nên dẫn tới hành động, kết quả sau."
  }
 ],
 "td3-16.2": [
  {
   "title": "1. 當作/當做",
   "points": [
    {
     "label": null,
     "formula": "「當作」是狀態動詞，有兩種用法：(1) 把前後描述的對象或事情認定是相同的。例如：「他常常加班，已經把公司當作自己的家了。」、「老師常把我們當作是自己的孩子，非常關心我們。」、「我很討厭小方，就算他從我旁邊經過，我也當作沒看見。」(2) 表示對前後描述對象或事情的判斷。例如：「張阿姨已經四十多歲了，看起來卻很年輕，常被人當作是學生。」、「我把這次的感冒當作是一般的感冒，所以沒去看醫生。」",
     "examples": [
      {
       "hz": "你說的沒錯，還能吃的食物就不該被當作垃圾丟掉。",
       "vi": "Bạn nói đúng, đồ ăn còn ăn được thì không nên coi là rác mà vứt đi.",
       "py": "Nǐ shuō de méicuò, hái néng chī de shíwù jiù bùgāi bèi dàngzuò lèsè diūdiào."
      },
      {
       "hz": "如果沒人舉手問問題，老師就當作你們都懂了。",
       "vi": "Nếu không ai giơ tay hỏi, thầy giáo sẽ coi như các em đều hiểu rồi.",
       "py": "Rúguǒ méi rén jǔshǒu wèn wèntí, lǎoshī jiù dàngzuò nǐmen dōu dǒng le."
      },
      {
       "hz": "弟弟運動後口很渴，把冰箱裡的水果酒當作果汁喝了，真",
       "vi": "Em trai tập thể dục xong rất khát, uống nhầm rượu trái cây trong tủ lạnh vì tưởng là nước ép, thật là…",
       "py": "Dìdi yùndòng hòu kǒu hěnkě, bǎ bīngxiāng lǐ de shuǐguǒ jiǔ dàngzuò guǒzhī hē le, zhēn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "當作 / 當做 — coi như, xem như",
   "giaiThich": "Hai cách dùng: (1) coi hai đối tượng như nhau (把公司當作自己的家); (2) đưa ra phán đoán về đối tượng."
  },
  {
   "title": "2. 至少",
   "points": [
    {
     "label": null,
     "formula": "「至少」當作副詞，後面接數量詞或短句，用來表示最低範圍或程度。 「由於」的後面表示原因或理由，「因此」的後面表示結果。比「因為⋯⋯，所以⋯⋯」的用法正式。「因為」可以放在前句或後句的句首；「由於」多放在前句的句首，若要放在後句要寫「⋯⋯，是由於⋯⋯」。例如：這座城市的空氣品質越來越差，是由於工廠越來越多。",
     "examples": [
      {
       "hz": "臺灣雖然面積小，生活空間不大，但至少不必擔心食物不夠，實在太幸福了。",
       "vi": "Đài Loan tuy diện tích nhỏ, không gian sống không rộng, nhưng ít nhất không phải lo thiếu đồ ăn, thật là hạnh phúc.",
       "py": "Táiwān suīrán miànjī xiǎo, shēnghuókōngjiān bú dà, dàn zhìshǎo búbì dānxīn shíwù búgòu, shízài tài xìngfú le."
      },
      {
       "hz": "這次的車禍，他受了很嚴重的傷，至少兩個月才能完全恢3.小英：昨天看了介紹中美洲的旅遊節目，很吸引人，我打算下個月就去當個背包客。",
       "vi": "Trong vụ tai nạn lần này anh ấy bị thương rất nặng, ít nhất hai tháng mới hồi phục hoàn toàn. Tiểu Anh: Hôm qua xem chương trình du lịch giới thiệu về Trung Mỹ, hấp dẫn lắm, tôi định tháng sau đi du lịch bụi.",
       "py": "Zhècì de chēhuò, tā shòu le hěn yánzhòng de shāng, zhìshǎo liǎnggè yuè cáinéng wánquán huī 3. Xiǎo yīng: Zuótiān kàn le jièshào zhōngměizhōu de lǚyóu jiémù, hěn xīyǐn rén, wǒ dǎsuàn xiàgèyuè jiù qù dāng gè bēibāokè."
      },
      {
       "hz": "小華：你太急了吧！至少得先聽聽其他人的意見，再看自己適合不適合。",
       "vi": "Tiểu Hoa: Bạn vội quá rồi! Ít nhất cũng phải nghe ý kiến người khác trước, rồi xem mình có hợp không đã.",
       "py": "Xiǎo huá: Nǐ tài jí le ba! Zhìshǎo děi xiān tīngtīng qítārén de yìjiàn, zài kàn zìjǐ shìhé bú shìhé."
      },
      {
       "hz": "由於新菜仍然無法吸引更多顧客上門，因此每天總是有一些還能吃的食物被丟進垃圾箱。",
       "vi": "Vì món mới vẫn không thu hút được thêm khách đến, nên ngày nào cũng có một ít đồ ăn còn ăn được bị vứt vào thùng rác.",
       "py": "Yóuyú xīn cài réngrán wúfǎ xīyǐn gèng duō gùkè shàngmén, yīncǐ měitiān zǒngshì yǒu yìxiē hái néng chī de shíwù bèi diū jìn lèsèxiāng."
      },
      {
       "hz": "由於這個都市規劃得不理想，（因此）商業活動增加後，交通就變得又擠又亂。",
       "vi": "Do thành phố này quy hoạch không hợp lý, (nên) khi hoạt động thương mại tăng lên thì giao thông trở nên vừa đông vừa loạn.",
       "py": "Yóuyú zhège dūshì guīhuà de bù lǐxiǎng, (yīncǐ) shāngyèhuódòng zēngjiā hòu, jiāotōng jiù biànde yòu jǐ yòu luàn."
      },
      {
       "hz": "由於人口不斷增加，居住土地的需求也越來越大，（因此）農業生產的土地就變少了。",
       "vi": "Do dân số không ngừng tăng, nhu cầu đất ở cũng ngày càng lớn, (nên) đất sản xuất nông nghiệp ngày càng ít đi.",
       "py": "Yóuyú rénkǒu búduàn zēngjiā, jūzhù tǔdì de xūqiú yě yuèláiyuè dà, (yīncǐ) nóngyè shēngchǎn de tǔdì jiù biàn shǎo le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至少 — ít nhất",
   "giaiThich": "Phó từ, sau nó là số lượng hoặc mệnh đề ngắn, nêu mức thấp nhất. Bài cũng có 由於……因此…… (do… nên…), trang trọng hơn 因為……所以……"
  },
  {
   "title": "2. 使得",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「使得」是及物狀態動詞。「使得」的前句是導致某個事件發生的原因，後句是前句導致或引起的結果，與「使（V）」的用法相似，但「使得」的用法較正式。已發生的事實常用「使得」；假設的情況常用「使」。例如：「由於這次強烈颱風帶來了大風大雨，使得很多地區都淹水了。」、「古代寺廟如能好好保留下來，就能使民眾更了解宗教的歷史意義。」",
       "vi": "“使得” là động từ trạng thái cập vật. Vế trước của “使得” là nguyên nhân dẫn đến sự việc, vế sau là kết quả do vế trước gây ra; cách dùng giống “使” nhưng trang trọng hơn. Sự việc đã xảy ra thường dùng “使得”, tình huống giả định thường dùng “使”. Ví dụ: “Do cơn bão mạnh lần này mang đến mưa to gió lớn, khiến nhiều khu vực bị ngập.”, “Nếu các ngôi chùa cổ được bảo tồn tốt thì có thể giúp người dân hiểu rõ hơn ý nghĩa lịch sử của tôn giáo.”",
       "py": "“Shǐde” shì jí wù zhuàngtài dòngcí. “Shǐde” de qián jù shì dǎozhì mǒugè shìjiàn fāshēng de yuányīn, hòu jù shì qián jù dǎozhì huò yǐnqǐ de jiéguǒ, yǔ “shǐ” de yòngfǎ xiāngsì, dàn “shǐde” de yòngfǎ jiào zhèngshì. Yǐ fāshēng de shìshí chángyòng “shǐde”; jiǎshè de qíngkuàng chángyòng “shǐ”. Lìrú: “Yóuyú zhècì qiángliè táifēng dàilái le dàfēng dàyǔ, shǐde hěnduō dìqū dōu yānshuǐ le.”, “gǔdài sìmiào rú néng hǎohǎo bǎoliú xiàlái, jiù néng shǐ mínzhòng gèng liǎojiě zōngjiào de lìshǐ yìyì.”"
      },
      {
       "hz": "⋯⋯每次想到這點都使得他夜裡睡不好。",
       "vi": "…mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ.",
       "py": "…… měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo."
      },
      {
       "hz": "九二一大地震的規模很大，使得許多房屋跟馬路都塌了。",
       "vi": "Trận động đất 21/9 có cường độ rất lớn, khiến nhiều nhà cửa và đường sá bị sập.",
       "py": "Jiǔ'èr yídà dìzhèn de guīmó hěndà, shǐde xǔduō fángwū gēn mǎlù dōu tā le."
      },
      {
       "hz": "由於紅毛城古蹟維持得很好，使得參觀的民眾一年比一年",
       "vi": "Do di tích Hồng Mao Thành được giữ gìn rất tốt, khiến người dân đến tham quan mỗi năm một…",
       "py": "Yóuyú hóngmáochéng gǔjì wéichí de hěn hǎo, shǐde cānguān de mínzhòng yìnián bǐ yìnián"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "使得 — khiến cho",
   "giaiThich": "Nêu kết quả do một nguyên nhân gây ra, thường dùng văn viết."
  },
  {
   "title": "3. 於是",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「於是」是連詞，連接前後兩個句子，後句是因為前句的情況而採取的行動。但自然現象不可使用「於是」，例如：「*天很黑，於是下雨了。」、「*強烈颱風來了，於是很多地區淹水了。」",
       "vi": "“於是” là liên từ, nối hai câu trước và sau, vế sau là hành động được thực hiện vì tình huống ở vế trước. Nhưng hiện tượng tự nhiên thì không dùng “於是”, ví dụ: “*Trời rất tối, thế là mưa rồi.”, “*Bão mạnh đến, thế là nhiều khu vực bị ngập.”",
       "py": "“Yúshì” shì liáncí, liánjiē qiánhòu liǎnggè jùzi, hòu jù shìyīnwèi qián jù de qíngkuàng ér cǎiqǔ de xíngdòng. Dàn zìrán xiànxiàng bùkě shǐyòng “yúshì”, lìrú: “* tiān hěn hēi, yúshì xiàyǔ le.”, “* qiángliè táifēng lái le, yúshì hěnduō dìqū yānshuǐ le.”"
      },
      {
       "hz": "每次想到這點都使得他夜裡睡不好。於是，他在餐廳門外放了一台冰箱⋯⋯2.現代人為了擁有更舒適的生活，於是發明了許多既好用、功能又多的生活用品。",
       "vi": "Mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ. Thế là ông đặt một chiếc tủ lạnh ngoài cửa nhà hàng… Con người hiện đại, để có cuộc sống thoải mái hơn, đã phát minh ra nhiều đồ dùng vừa dễ dùng vừa nhiều chức năng.",
       "py": "Měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo. Yúshì, tā zài cāntīng ménwài fàng le yìtái bīngxiāng…… 2. Xiàndàirén wèile yǒngyǒu gèng shūshì de shēnghuó, yúshì fāmíng le xǔduō jì hǎo yòng, gōngnéng yòu duō de shēnghuóyòngpǐn."
      },
      {
       "hz": "戴先生為公司付出很多，卻沒得到相對的肯定與合理的薪水，於是決定換工作。",
       "vi": "Anh Đới cống hiến rất nhiều cho công ty nhưng không được công nhận tương xứng và lương hợp lý, thế là quyết định đổi việc.",
       "py": "Dài xiānshēng wèi gōngsī fùchū hěnduō, què méi dédào xiāngduì de kěndìng yǔ hélǐ de xīnshuǐ, yúshì juédìng huàn gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "於是 — thế là",
   "giaiThich": "Liên từ nối tiếp: vì tình huống trước nên dẫn tới hành động, kết quả sau."
  }
 ],
 "td3-16.3": [
  {
   "title": "1. 當作/當做",
   "points": [
    {
     "label": null,
     "formula": "「當作」是狀態動詞，有兩種用法：(1) 把前後描述的對象或事情認定是相同的。例如：「他常常加班，已經把公司當作自己的家了。」、「老師常把我們當作是自己的孩子，非常關心我們。」、「我很討厭小方，就算他從我旁邊經過，我也當作沒看見。」(2) 表示對前後描述對象或事情的判斷。例如：「張阿姨已經四十多歲了，看起來卻很年輕，常被人當作是學生。」、「我把這次的感冒當作是一般的感冒，所以沒去看醫生。」",
     "examples": [
      {
       "hz": "你說的沒錯，還能吃的食物就不該被當作垃圾丟掉。",
       "vi": "Bạn nói đúng, đồ ăn còn ăn được thì không nên coi là rác mà vứt đi.",
       "py": "Nǐ shuō de méicuò, hái néng chī de shíwù jiù bùgāi bèi dàngzuò lèsè diūdiào."
      },
      {
       "hz": "如果沒人舉手問問題，老師就當作你們都懂了。",
       "vi": "Nếu không ai giơ tay hỏi, thầy giáo sẽ coi như các em đều hiểu rồi.",
       "py": "Rúguǒ méi rén jǔshǒu wèn wèntí, lǎoshī jiù dàngzuò nǐmen dōu dǒng le."
      },
      {
       "hz": "弟弟運動後口很渴，把冰箱裡的水果酒當作果汁喝了，真",
       "vi": "Em trai tập thể dục xong rất khát, uống nhầm rượu trái cây trong tủ lạnh vì tưởng là nước ép, thật là…",
       "py": "Dìdi yùndòng hòu kǒu hěnkě, bǎ bīngxiāng lǐ de shuǐguǒ jiǔ dàngzuò guǒzhī hē le, zhēn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "當作 / 當做 — coi như, xem như",
   "giaiThich": "Hai cách dùng: (1) coi hai đối tượng như nhau (把公司當作自己的家); (2) đưa ra phán đoán về đối tượng."
  },
  {
   "title": "2. 至少",
   "points": [
    {
     "label": null,
     "formula": "「至少」當作副詞，後面接數量詞或短句，用來表示最低範圍或程度。 「由於」的後面表示原因或理由，「因此」的後面表示結果。比「因為⋯⋯，所以⋯⋯」的用法正式。「因為」可以放在前句或後句的句首；「由於」多放在前句的句首，若要放在後句要寫「⋯⋯，是由於⋯⋯」。例如：這座城市的空氣品質越來越差，是由於工廠越來越多。",
     "examples": [
      {
       "hz": "臺灣雖然面積小，生活空間不大，但至少不必擔心食物不夠，實在太幸福了。",
       "vi": "Đài Loan tuy diện tích nhỏ, không gian sống không rộng, nhưng ít nhất không phải lo thiếu đồ ăn, thật là hạnh phúc.",
       "py": "Táiwān suīrán miànjī xiǎo, shēnghuókōngjiān bú dà, dàn zhìshǎo búbì dānxīn shíwù búgòu, shízài tài xìngfú le."
      },
      {
       "hz": "這次的車禍，他受了很嚴重的傷，至少兩個月才能完全恢3.小英：昨天看了介紹中美洲的旅遊節目，很吸引人，我打算下個月就去當個背包客。",
       "vi": "Trong vụ tai nạn lần này anh ấy bị thương rất nặng, ít nhất hai tháng mới hồi phục hoàn toàn. Tiểu Anh: Hôm qua xem chương trình du lịch giới thiệu về Trung Mỹ, hấp dẫn lắm, tôi định tháng sau đi du lịch bụi.",
       "py": "Zhècì de chēhuò, tā shòu le hěn yánzhòng de shāng, zhìshǎo liǎnggè yuè cáinéng wánquán huī 3. Xiǎo yīng: Zuótiān kàn le jièshào zhōngměizhōu de lǚyóu jiémù, hěn xīyǐn rén, wǒ dǎsuàn xiàgèyuè jiù qù dāng gè bēibāokè."
      },
      {
       "hz": "小華：你太急了吧！至少得先聽聽其他人的意見，再看自己適合不適合。",
       "vi": "Tiểu Hoa: Bạn vội quá rồi! Ít nhất cũng phải nghe ý kiến người khác trước, rồi xem mình có hợp không đã.",
       "py": "Xiǎo huá: Nǐ tài jí le ba! Zhìshǎo děi xiān tīngtīng qítārén de yìjiàn, zài kàn zìjǐ shìhé bú shìhé."
      },
      {
       "hz": "由於新菜仍然無法吸引更多顧客上門，因此每天總是有一些還能吃的食物被丟進垃圾箱。",
       "vi": "Vì món mới vẫn không thu hút được thêm khách đến, nên ngày nào cũng có một ít đồ ăn còn ăn được bị vứt vào thùng rác.",
       "py": "Yóuyú xīn cài réngrán wúfǎ xīyǐn gèng duō gùkè shàngmén, yīncǐ měitiān zǒngshì yǒu yìxiē hái néng chī de shíwù bèi diū jìn lèsèxiāng."
      },
      {
       "hz": "由於這個都市規劃得不理想，（因此）商業活動增加後，交通就變得又擠又亂。",
       "vi": "Do thành phố này quy hoạch không hợp lý, (nên) khi hoạt động thương mại tăng lên thì giao thông trở nên vừa đông vừa loạn.",
       "py": "Yóuyú zhège dūshì guīhuà de bù lǐxiǎng, (yīncǐ) shāngyèhuódòng zēngjiā hòu, jiāotōng jiù biànde yòu jǐ yòu luàn."
      },
      {
       "hz": "由於人口不斷增加，居住土地的需求也越來越大，（因此）農業生產的土地就變少了。",
       "vi": "Do dân số không ngừng tăng, nhu cầu đất ở cũng ngày càng lớn, (nên) đất sản xuất nông nghiệp ngày càng ít đi.",
       "py": "Yóuyú rénkǒu búduàn zēngjiā, jūzhù tǔdì de xūqiú yě yuèláiyuè dà, (yīncǐ) nóngyè shēngchǎn de tǔdì jiù biàn shǎo le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至少 — ít nhất",
   "giaiThich": "Phó từ, sau nó là số lượng hoặc mệnh đề ngắn, nêu mức thấp nhất. Bài cũng có 由於……因此…… (do… nên…), trang trọng hơn 因為……所以……"
  },
  {
   "title": "2. 使得",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「使得」是及物狀態動詞。「使得」的前句是導致某個事件發生的原因，後句是前句導致或引起的結果，與「使（V）」的用法相似，但「使得」的用法較正式。已發生的事實常用「使得」；假設的情況常用「使」。例如：「由於這次強烈颱風帶來了大風大雨，使得很多地區都淹水了。」、「古代寺廟如能好好保留下來，就能使民眾更了解宗教的歷史意義。」",
       "vi": "“使得” là động từ trạng thái cập vật. Vế trước của “使得” là nguyên nhân dẫn đến sự việc, vế sau là kết quả do vế trước gây ra; cách dùng giống “使” nhưng trang trọng hơn. Sự việc đã xảy ra thường dùng “使得”, tình huống giả định thường dùng “使”. Ví dụ: “Do cơn bão mạnh lần này mang đến mưa to gió lớn, khiến nhiều khu vực bị ngập.”, “Nếu các ngôi chùa cổ được bảo tồn tốt thì có thể giúp người dân hiểu rõ hơn ý nghĩa lịch sử của tôn giáo.”",
       "py": "“Shǐde” shì jí wù zhuàngtài dòngcí. “Shǐde” de qián jù shì dǎozhì mǒugè shìjiàn fāshēng de yuányīn, hòu jù shì qián jù dǎozhì huò yǐnqǐ de jiéguǒ, yǔ “shǐ” de yòngfǎ xiāngsì, dàn “shǐde” de yòngfǎ jiào zhèngshì. Yǐ fāshēng de shìshí chángyòng “shǐde”; jiǎshè de qíngkuàng chángyòng “shǐ”. Lìrú: “Yóuyú zhècì qiángliè táifēng dàilái le dàfēng dàyǔ, shǐde hěnduō dìqū dōu yānshuǐ le.”, “gǔdài sìmiào rú néng hǎohǎo bǎoliú xiàlái, jiù néng shǐ mínzhòng gèng liǎojiě zōngjiào de lìshǐ yìyì.”"
      },
      {
       "hz": "⋯⋯每次想到這點都使得他夜裡睡不好。",
       "vi": "…mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ.",
       "py": "…… měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo."
      },
      {
       "hz": "九二一大地震的規模很大，使得許多房屋跟馬路都塌了。",
       "vi": "Trận động đất 21/9 có cường độ rất lớn, khiến nhiều nhà cửa và đường sá bị sập.",
       "py": "Jiǔ'èr yídà dìzhèn de guīmó hěndà, shǐde xǔduō fángwū gēn mǎlù dōu tā le."
      },
      {
       "hz": "由於紅毛城古蹟維持得很好，使得參觀的民眾一年比一年",
       "vi": "Do di tích Hồng Mao Thành được giữ gìn rất tốt, khiến người dân đến tham quan mỗi năm một…",
       "py": "Yóuyú hóngmáochéng gǔjì wéichí de hěn hǎo, shǐde cānguān de mínzhòng yìnián bǐ yìnián"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "使得 — khiến cho",
   "giaiThich": "Nêu kết quả do một nguyên nhân gây ra, thường dùng văn viết."
  },
  {
   "title": "3. 於是",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「於是」是連詞，連接前後兩個句子，後句是因為前句的情況而採取的行動。但自然現象不可使用「於是」，例如：「*天很黑，於是下雨了。」、「*強烈颱風來了，於是很多地區淹水了。」",
       "vi": "“於是” là liên từ, nối hai câu trước và sau, vế sau là hành động được thực hiện vì tình huống ở vế trước. Nhưng hiện tượng tự nhiên thì không dùng “於是”, ví dụ: “*Trời rất tối, thế là mưa rồi.”, “*Bão mạnh đến, thế là nhiều khu vực bị ngập.”",
       "py": "“Yúshì” shì liáncí, liánjiē qiánhòu liǎnggè jùzi, hòu jù shìyīnwèi qián jù de qíngkuàng ér cǎiqǔ de xíngdòng. Dàn zìrán xiànxiàng bùkě shǐyòng “yúshì”, lìrú: “* tiān hěn hēi, yúshì xiàyǔ le.”, “* qiángliè táifēng lái le, yúshì hěnduō dìqū yānshuǐ le.”"
      },
      {
       "hz": "每次想到這點都使得他夜裡睡不好。於是，他在餐廳門外放了一台冰箱⋯⋯2.現代人為了擁有更舒適的生活，於是發明了許多既好用、功能又多的生活用品。",
       "vi": "Mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ. Thế là ông đặt một chiếc tủ lạnh ngoài cửa nhà hàng… Con người hiện đại, để có cuộc sống thoải mái hơn, đã phát minh ra nhiều đồ dùng vừa dễ dùng vừa nhiều chức năng.",
       "py": "Měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo. Yúshì, tā zài cāntīng ménwài fàng le yìtái bīngxiāng…… 2. Xiàndàirén wèile yǒngyǒu gèng shūshì de shēnghuó, yúshì fāmíng le xǔduō jì hǎo yòng, gōngnéng yòu duō de shēnghuóyòngpǐn."
      },
      {
       "hz": "戴先生為公司付出很多，卻沒得到相對的肯定與合理的薪水，於是決定換工作。",
       "vi": "Anh Đới cống hiến rất nhiều cho công ty nhưng không được công nhận tương xứng và lương hợp lý, thế là quyết định đổi việc.",
       "py": "Dài xiānshēng wèi gōngsī fùchū hěnduō, què méi dédào xiāngduì de kěndìng yǔ hélǐ de xīnshuǐ, yúshì juédìng huàn gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "於是 — thế là",
   "giaiThich": "Liên từ nối tiếp: vì tình huống trước nên dẫn tới hành động, kết quả sau."
  }
 ],
 "td3-16.4": [
  {
   "title": "1. 當作/當做",
   "points": [
    {
     "label": null,
     "formula": "「當作」是狀態動詞，有兩種用法：(1) 把前後描述的對象或事情認定是相同的。例如：「他常常加班，已經把公司當作自己的家了。」、「老師常把我們當作是自己的孩子，非常關心我們。」、「我很討厭小方，就算他從我旁邊經過，我也當作沒看見。」(2) 表示對前後描述對象或事情的判斷。例如：「張阿姨已經四十多歲了，看起來卻很年輕，常被人當作是學生。」、「我把這次的感冒當作是一般的感冒，所以沒去看醫生。」",
     "examples": [
      {
       "hz": "你說的沒錯，還能吃的食物就不該被當作垃圾丟掉。",
       "vi": "Bạn nói đúng, đồ ăn còn ăn được thì không nên coi là rác mà vứt đi.",
       "py": "Nǐ shuō de méicuò, hái néng chī de shíwù jiù bùgāi bèi dàngzuò lèsè diūdiào."
      },
      {
       "hz": "如果沒人舉手問問題，老師就當作你們都懂了。",
       "vi": "Nếu không ai giơ tay hỏi, thầy giáo sẽ coi như các em đều hiểu rồi.",
       "py": "Rúguǒ méi rén jǔshǒu wèn wèntí, lǎoshī jiù dàngzuò nǐmen dōu dǒng le."
      },
      {
       "hz": "弟弟運動後口很渴，把冰箱裡的水果酒當作果汁喝了，真",
       "vi": "Em trai tập thể dục xong rất khát, uống nhầm rượu trái cây trong tủ lạnh vì tưởng là nước ép, thật là…",
       "py": "Dìdi yùndòng hòu kǒu hěnkě, bǎ bīngxiāng lǐ de shuǐguǒ jiǔ dàngzuò guǒzhī hē le, zhēn"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "當作 / 當做 — coi như, xem như",
   "giaiThich": "Hai cách dùng: (1) coi hai đối tượng như nhau (把公司當作自己的家); (2) đưa ra phán đoán về đối tượng."
  },
  {
   "title": "2. 至少",
   "points": [
    {
     "label": null,
     "formula": "「至少」當作副詞，後面接數量詞或短句，用來表示最低範圍或程度。 「由於」的後面表示原因或理由，「因此」的後面表示結果。比「因為⋯⋯，所以⋯⋯」的用法正式。「因為」可以放在前句或後句的句首；「由於」多放在前句的句首，若要放在後句要寫「⋯⋯，是由於⋯⋯」。例如：這座城市的空氣品質越來越差，是由於工廠越來越多。",
     "examples": [
      {
       "hz": "臺灣雖然面積小，生活空間不大，但至少不必擔心食物不夠，實在太幸福了。",
       "vi": "Đài Loan tuy diện tích nhỏ, không gian sống không rộng, nhưng ít nhất không phải lo thiếu đồ ăn, thật là hạnh phúc.",
       "py": "Táiwān suīrán miànjī xiǎo, shēnghuókōngjiān bú dà, dàn zhìshǎo búbì dānxīn shíwù búgòu, shízài tài xìngfú le."
      },
      {
       "hz": "這次的車禍，他受了很嚴重的傷，至少兩個月才能完全恢3.小英：昨天看了介紹中美洲的旅遊節目，很吸引人，我打算下個月就去當個背包客。",
       "vi": "Trong vụ tai nạn lần này anh ấy bị thương rất nặng, ít nhất hai tháng mới hồi phục hoàn toàn. Tiểu Anh: Hôm qua xem chương trình du lịch giới thiệu về Trung Mỹ, hấp dẫn lắm, tôi định tháng sau đi du lịch bụi.",
       "py": "Zhècì de chēhuò, tā shòu le hěn yánzhòng de shāng, zhìshǎo liǎnggè yuè cáinéng wánquán huī 3. Xiǎo yīng: Zuótiān kàn le jièshào zhōngměizhōu de lǚyóu jiémù, hěn xīyǐn rén, wǒ dǎsuàn xiàgèyuè jiù qù dāng gè bēibāokè."
      },
      {
       "hz": "小華：你太急了吧！至少得先聽聽其他人的意見，再看自己適合不適合。",
       "vi": "Tiểu Hoa: Bạn vội quá rồi! Ít nhất cũng phải nghe ý kiến người khác trước, rồi xem mình có hợp không đã.",
       "py": "Xiǎo huá: Nǐ tài jí le ba! Zhìshǎo děi xiān tīngtīng qítārén de yìjiàn, zài kàn zìjǐ shìhé bú shìhé."
      },
      {
       "hz": "由於新菜仍然無法吸引更多顧客上門，因此每天總是有一些還能吃的食物被丟進垃圾箱。",
       "vi": "Vì món mới vẫn không thu hút được thêm khách đến, nên ngày nào cũng có một ít đồ ăn còn ăn được bị vứt vào thùng rác.",
       "py": "Yóuyú xīn cài réngrán wúfǎ xīyǐn gèng duō gùkè shàngmén, yīncǐ měitiān zǒngshì yǒu yìxiē hái néng chī de shíwù bèi diū jìn lèsèxiāng."
      },
      {
       "hz": "由於這個都市規劃得不理想，（因此）商業活動增加後，交通就變得又擠又亂。",
       "vi": "Do thành phố này quy hoạch không hợp lý, (nên) khi hoạt động thương mại tăng lên thì giao thông trở nên vừa đông vừa loạn.",
       "py": "Yóuyú zhège dūshì guīhuà de bù lǐxiǎng, (yīncǐ) shāngyèhuódòng zēngjiā hòu, jiāotōng jiù biànde yòu jǐ yòu luàn."
      },
      {
       "hz": "由於人口不斷增加，居住土地的需求也越來越大，（因此）農業生產的土地就變少了。",
       "vi": "Do dân số không ngừng tăng, nhu cầu đất ở cũng ngày càng lớn, (nên) đất sản xuất nông nghiệp ngày càng ít đi.",
       "py": "Yóuyú rénkǒu búduàn zēngjiā, jūzhù tǔdì de xūqiú yě yuèláiyuè dà, (yīncǐ) nóngyè shēngchǎn de tǔdì jiù biàn shǎo le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "至少 — ít nhất",
   "giaiThich": "Phó từ, sau nó là số lượng hoặc mệnh đề ngắn, nêu mức thấp nhất. Bài cũng có 由於……因此…… (do… nên…), trang trọng hơn 因為……所以……"
  },
  {
   "title": "2. 使得",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「使得」是及物狀態動詞。「使得」的前句是導致某個事件發生的原因，後句是前句導致或引起的結果，與「使（V）」的用法相似，但「使得」的用法較正式。已發生的事實常用「使得」；假設的情況常用「使」。例如：「由於這次強烈颱風帶來了大風大雨，使得很多地區都淹水了。」、「古代寺廟如能好好保留下來，就能使民眾更了解宗教的歷史意義。」",
       "vi": "“使得” là động từ trạng thái cập vật. Vế trước của “使得” là nguyên nhân dẫn đến sự việc, vế sau là kết quả do vế trước gây ra; cách dùng giống “使” nhưng trang trọng hơn. Sự việc đã xảy ra thường dùng “使得”, tình huống giả định thường dùng “使”. Ví dụ: “Do cơn bão mạnh lần này mang đến mưa to gió lớn, khiến nhiều khu vực bị ngập.”, “Nếu các ngôi chùa cổ được bảo tồn tốt thì có thể giúp người dân hiểu rõ hơn ý nghĩa lịch sử của tôn giáo.”",
       "py": "“Shǐde” shì jí wù zhuàngtài dòngcí. “Shǐde” de qián jù shì dǎozhì mǒugè shìjiàn fāshēng de yuányīn, hòu jù shì qián jù dǎozhì huò yǐnqǐ de jiéguǒ, yǔ “shǐ” de yòngfǎ xiāngsì, dàn “shǐde” de yòngfǎ jiào zhèngshì. Yǐ fāshēng de shìshí chángyòng “shǐde”; jiǎshè de qíngkuàng chángyòng “shǐ”. Lìrú: “Yóuyú zhècì qiángliè táifēng dàilái le dàfēng dàyǔ, shǐde hěnduō dìqū dōu yānshuǐ le.”, “gǔdài sìmiào rú néng hǎohǎo bǎoliú xiàlái, jiù néng shǐ mínzhòng gèng liǎojiě zōngjiào de lìshǐ yìyì.”"
      },
      {
       "hz": "⋯⋯每次想到這點都使得他夜裡睡不好。",
       "vi": "…mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ.",
       "py": "…… měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo."
      },
      {
       "hz": "九二一大地震的規模很大，使得許多房屋跟馬路都塌了。",
       "vi": "Trận động đất 21/9 có cường độ rất lớn, khiến nhiều nhà cửa và đường sá bị sập.",
       "py": "Jiǔ'èr yídà dìzhèn de guīmó hěndà, shǐde xǔduō fángwū gēn mǎlù dōu tā le."
      },
      {
       "hz": "由於紅毛城古蹟維持得很好，使得參觀的民眾一年比一年",
       "vi": "Do di tích Hồng Mao Thành được giữ gìn rất tốt, khiến người dân đến tham quan mỗi năm một…",
       "py": "Yóuyú hóngmáochéng gǔjì wéichí de hěn hǎo, shǐde cānguān de mínzhòng yìnián bǐ yìnián"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "使得 — khiến cho",
   "giaiThich": "Nêu kết quả do một nguyên nhân gây ra, thường dùng văn viết."
  },
  {
   "title": "3. 於是",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "「於是」是連詞，連接前後兩個句子，後句是因為前句的情況而採取的行動。但自然現象不可使用「於是」，例如：「*天很黑，於是下雨了。」、「*強烈颱風來了，於是很多地區淹水了。」",
       "vi": "“於是” là liên từ, nối hai câu trước và sau, vế sau là hành động được thực hiện vì tình huống ở vế trước. Nhưng hiện tượng tự nhiên thì không dùng “於是”, ví dụ: “*Trời rất tối, thế là mưa rồi.”, “*Bão mạnh đến, thế là nhiều khu vực bị ngập.”",
       "py": "“Yúshì” shì liáncí, liánjiē qiánhòu liǎnggè jùzi, hòu jù shìyīnwèi qián jù de qíngkuàng ér cǎiqǔ de xíngdòng. Dàn zìrán xiànxiàng bùkě shǐyòng “yúshì”, lìrú: “* tiān hěn hēi, yúshì xiàyǔ le.”, “* qiángliè táifēng lái le, yúshì hěnduō dìqū yānshuǐ le.”"
      },
      {
       "hz": "每次想到這點都使得他夜裡睡不好。於是，他在餐廳門外放了一台冰箱⋯⋯2.現代人為了擁有更舒適的生活，於是發明了許多既好用、功能又多的生活用品。",
       "vi": "Mỗi lần nghĩ đến điều này đều khiến ông ấy mất ngủ. Thế là ông đặt một chiếc tủ lạnh ngoài cửa nhà hàng… Con người hiện đại, để có cuộc sống thoải mái hơn, đã phát minh ra nhiều đồ dùng vừa dễ dùng vừa nhiều chức năng.",
       "py": "Měicì xiǎngdào zhèdiǎn dōu shǐde tā yèlǐ shuì bùhǎo. Yúshì, tā zài cāntīng ménwài fàng le yìtái bīngxiāng…… 2. Xiàndàirén wèile yǒngyǒu gèng shūshì de shēnghuó, yúshì fāmíng le xǔduō jì hǎo yòng, gōngnéng yòu duō de shēnghuóyòngpǐn."
      },
      {
       "hz": "戴先生為公司付出很多，卻沒得到相對的肯定與合理的薪水，於是決定換工作。",
       "vi": "Anh Đới cống hiến rất nhiều cho công ty nhưng không được công nhận tương xứng và lương hợp lý, thế là quyết định đổi việc.",
       "py": "Dài xiānshēng wèi gōngsī fùchū hěnduō, què méi dédào xiāngduì de kěndìng yǔ hélǐ de xīnshuǐ, yúshì juédìng huàn gōngzuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "於是 — thế là",
   "giaiThich": "Liên từ nối tiếp: vì tình huống trước nên dẫn tới hành động, kết quả sau."
  }
 ]
};
