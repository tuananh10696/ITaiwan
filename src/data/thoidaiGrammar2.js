// =============================================================
// Ngữ pháp Giáo trình Thời Đại QUYỂN 2 — SINH TỰ ĐỘNG, đừng sửa tay.
//   node scripts/gen-thoidai-grammar.mjs --quyen 2
// Nguồn: PPT bài giảng chính thức của 淡江大學華語中心 (công khai).
// Ví dụ CHỈ CÓ tiếng Trung (nguồn không kèm bản dịch) -> `vi` rỗng.
// Ngữ pháp thuộc cả bài nên các bài con dùng chung một danh sách.
// =============================================================
export const thoidaiGrammar2 = {
 "td2-1.1": [
  {
   "title": "I. V 一下 (+ O) V a bit (+ O)",
   "points": [
    {
     "label": null,
     "formula": "This grammar indicates the action of the verb lasts for a short time or the amount of action is quite small.",
     "examples": [
      {
       "hz": "A：良介呢？他沒來嗎？ B：他去一下洗手間，馬上回來。",
       "vi": "A: Ryosuke đâu? Cậu ấy không đến à? B: Cậu ấy đi vệ sinh một chút, về ngay.",
       "py": "A: Liángjiè ne? Tā méi lái ma? B: Tā qù yíxià xǐshǒujiān, mǎshàng huílái."
      },
      {
       "hz": "A：你能介紹一下你自己嗎？ B：大家好，我叫山本良介。",
       "vi": "A: Bạn giới thiệu một chút về bản thân được không? B: Xin chào mọi người, tôi tên là Yamamoto Ryosuke.",
       "py": "A: Nǐ néng jièshào yíxià nǐ zìjǐ ma? B: Dàjiā hǎo, wǒ jiào shānběn Liángjiè."
      },
      {
       "hz": "A：我去旁邊的商店買麵包，你可以等一下嗎？ B：沒問題。",
       "vi": "A: Tôi ra cửa hàng bên cạnh mua bánh mì, bạn đợi một chút được không? B: Không vấn đề gì.",
       "py": "A: Wǒ qù pángbiān de shāngdiàn mǎi miànbāo, nǐ kěyǐ děng yíxià ma? B: Méi wèntí."
      },
      {
       "hz": "B：好的，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Hǎo de, méi wèntí."
      },
      {
       "hz": "B：好的，馬上去。",
       "vi": "B: Được, đi ngay đây.",
       "py": "B: Hǎo de, mǎshàng qù."
      },
      {
       "hz": "先生：晚上要吃什麼？",
       "vi": "Chồng: Tối nay ăn gì?",
       "py": "Xiānshēng: Wǎnshàng yào chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 一下 — làm một chút",
   "giaiThich": "Diễn đạt hành động diễn ra trong thời gian ngắn hoặc mức độ nhẹ nhàng (\"… một chút, một lát\")."
  },
  {
   "title": "II. 最好 + VP had better + VP",
   "points": [
    {
     "label": null,
     "formula": "This expression, often followed by a verb phrase, is used to give advice about what someone should do. The “不但……也……” pattern connects two phrases or clauses and indicates the two situations exist at the same time. If “不但” and “也” have the same topic , “不但” should come after the topic , connect with a phrase ,and“也” connect with another phrase. If related to different aspect , “ 也 ” should come after the second aspect. A：你為甚麼想學中文？ B：學中文不但很有意思，也比較容易找工作。",
     "examples": [
      {
       "hz": "A：我的頭好疼啊！ B：你最好去看醫生，聽聽醫生怎麼說。",
       "vi": "A: Đầu tôi đau quá! B: Tốt nhất bạn nên đi khám bác sĩ, nghe xem bác sĩ nói gì.",
       "py": "A: Wǒ de tóu hǎo téng a! B: Nǐ zuìhǎo qù kàn yīshēng, tīngtīng yīshēng zěnme shuō."
      },
      {
       "hz": "A：下個禮拜五就要考試了。 B：對啊！我們最好每天下了課就去圖書館念書。",
       "vi": "A: Thứ Sáu tuần sau là thi rồi. B: Đúng vậy! Tốt nhất ngày nào tan học chúng ta cũng đến thư viện học bài.",
       "py": "A: Xià gè lǐbàiwǔ jiùyào kǎoshì le. B: Duì a! Wǒmen zuìhǎo měitiān xià le kè jiù qù túshūguǎn niànshū."
      },
      {
       "hz": "妹妹：我昨天認識了一個男生，他說這個週末要跟我約會。姐姐：你最好不要一個人去。",
       "vi": "Em gái: Hôm qua em quen một bạn nam, anh ấy nói cuối tuần này muốn hẹn hò với em. Chị gái: Tốt nhất em đừng đi một mình.",
       "py": "Mèimei: Wǒ zuótiān rènshì le yígè nánshēng, tā shuō zhège zhōumò yào gēn wǒ yuēhuì. Jiějie: Nǐ zuìhǎo búyào yígè rén qù."
      },
      {
       "hz": "A：我覺得非常不舒服，好像發燒了。(在家休息)2.A：我今天上課遲到了，老師有一點兒不高興。",
       "vi": "A: Tôi thấy rất khó chịu, hình như bị sốt rồi. (ở nhà nghỉ ngơi) A: Hôm nay tôi đi học muộn, thầy giáo hơi không vui.",
       "py": "A: Wǒ juéde fēicháng bù shūfú, hǎoxiàng fāshāo le. (zàijiā xiūxí) 2. A: Wǒ jīntiān shàngkè chídào le, lǎoshī yǒu yìdiǎn'ér bù gāoxìng."
      },
      {
       "hz": "A：今年我想到台北101去跨年。",
       "vi": "A: Năm nay tôi muốn đến Taipei 101 đón năm mới.",
       "py": "A: Jīnnián wǒ xiǎngdào Táiběi 101 qù kuà nián."
      },
      {
       "hz": "A：這家餐廳的菜都很好吃，你想吃什麼？ B：我不但想吃小籠包，也想吃牛肉麵。",
       "vi": "A: Món ăn nhà hàng này đều rất ngon, bạn muốn ăn gì? B: Tôi không những muốn ăn bánh bao nhỏ mà còn muốn ăn mì bò.",
       "py": "A: Zhèjiā cāntīng de cài dōu hěn hǎochī, nǐ xiǎng chī shénme? B: Wǒ búdàn xiǎng chī xiǎolóngbāo, yě xiǎng chī niúròumiàn."
      },
      {
       "hz": "A：你為什麼來台灣旅行？ B：因為台灣不但風景美，交通也很方便。",
       "vi": "A: Sao bạn đến Đài Loan du lịch? B: Vì Đài Loan không những phong cảnh đẹp mà giao thông cũng rất tiện.",
       "py": "A: Nǐ wèishénme lái Táiwān lǚxíng? B: Yīnwèi Táiwān búdàn fēngjǐng měi, jiāotōng yě hěn fāngbiàn."
      },
      {
       "hz": "A：為什麼你最近這麼忙？",
       "vi": "A: Sao dạo này bạn bận thế?",
       "py": "A: Wèishénme nǐ zuìjìn zhème máng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "最好 + cụm động từ — tốt nhất là…",
   "giaiThich": "Dùng để khuyên ai đó nên làm gì (\"tốt nhất là…\"). Bài này cũng luyện mẫu 不但……也…… nối hai vế cùng đúng một lúc."
  },
  {
   "title": "IV. V 完 completion of action with V 完",
   "points": [
    {
     "label": null,
     "formula": "The expression indicates that an action is finished. The “完”,serving as a verb complement , means  \t“done” or “finished”.",
     "examples": [
      {
       "hz": "今天的作業不多，我很快就寫完了。2. 可欣：跨年演唱會的票賣完了嗎？美心：聽說上個星期就賣完了。3. 可欣：你上個禮拜買的那本書看完了嗎？美心：這個禮拜我很忙，還沒看完。",
       "vi": "Bài tập hôm nay không nhiều, tôi viết xong rất nhanh. Khả Hân: Vé hoà nhạc đón năm mới bán hết chưa? Mỹ Tâm: Nghe nói tuần trước đã bán hết rồi. Khả Hân: Quyển sách bạn mua tuần trước đọc xong chưa? Mỹ Tâm: Tuần này tôi bận lắm, vẫn chưa đọc xong.",
       "py": "Jīntiān de zuòyè bù duō, wǒ hěnkuài jiù xiě wán le. 2. Kěxīn: Kuà nián yǎnchànghuì de piào màiwán le ma? Měixīn: Tīngshuō shànggèxīngqí jiù màiwán le. 3. Kěxīn: Nǐ shàng gè lǐbài mǎi de nàběnshū kàn wán le ma? Měixīn: Zhège lǐbài wǒ hěn máng, hái méi kàn wán."
      },
      {
       "hz": "先生：我現在要去超級市場買東西，要買牛奶嗎?",
       "vi": "Chồng: Bây giờ anh đi siêu thị mua đồ, có cần mua sữa không?",
       "py": "Xiānshēng: Wǒ xiànzài yào qù chāojíshìchǎng mǎi dōngxī, yào mǎi niúnǎi ma?"
      },
      {
       "hz": "良介在日本的時候，是一個怎麼樣的人？來台灣以後呢？",
       "vi": "Hồi ở Nhật, Ryosuke là người thế nào? Sau khi đến Đài Loan thì sao?",
       "py": "Liángjiè zài Rìběn de shíhòu, shì yígè zěnmeyàng de rén? Lái Táiwān yǐhòu ne?"
      },
      {
       "hz": "良介覺得在台灣生活怎麼樣，為什麼？",
       "vi": "Ryosuke thấy cuộc sống ở Đài Loan thế nào, tại sao?",
       "py": "Liángjiè juéde zài Táiwān shēnghuó zěnmeyàng, wèishénme?"
      },
      {
       "hz": "那個女生為什麼不敢跟良介見面？",
       "vi": "Tại sao cô gái đó không dám gặp Ryosuke?",
       "py": "Nàge nǚshēng wèishénme bùgǎn gēn Liángjiè jiànmiàn?"
      },
      {
       "hz": "良介後來怎麼跟這個女生見面？良介的心為什麼跳得很快？",
       "vi": "Sau đó Ryosuke gặp cô gái này bằng cách nào? Tại sao tim Ryosuke đập nhanh?",
       "py": "Liángjiè hòulái zěnme gēn zhège nǚshēng jiànmiàn? Liángjiè de xīn wèishénme tiào de hěnkuài?"
      },
      {
       "hz": "良介為什麼很想再跟她約會？他們做了什麼事？",
       "vi": "Tại sao Ryosuke rất muốn hẹn hò với cô ấy lần nữa? Họ đã làm những gì?",
       "py": "Liángjiè wèishénme hěn xiǎng zài gēn tā yuēhuì? Tāmen zuò le shénme shì?"
      },
      {
       "hz": "良介拉了那個女生的手嗎？為什麼？",
       "vi": "Ryosuke có nắm tay cô gái đó không? Tại sao?",
       "py": "Liángjiè lā le nàge nǚshēng de shǒu ma? Wèishénme?"
      },
      {
       "hz": "良介雖然是外國人，可是那個女生覺得良介怎麼樣？",
       "vi": "Dù Ryosuke là người nước ngoài, cô gái đó thấy Ryosuke thế nào?",
       "py": "Liángjiè suīrán shì wàiguórén, kěshì nàge nǚshēng juéde Liángjiè zěnmeyàng?"
      },
      {
       "hz": "良介後來還跟那個女生在一起嗎？你怎麼知道？",
       "vi": "Sau này Ryosuke còn ở bên cô gái đó không? Làm sao bạn biết?",
       "py": "Liángjiè hòulái hái gēn nàge nǚshēng zài yìqǐ ma? Nǐ zěnme zhīdào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 完 — làm xong",
   "giaiThich": "完 làm bổ ngữ đứng sau động từ, chỉ hành động đã kết thúc, đã xong."
  },
  {
   "title": "I. V在 resultant location with V 在",
   "points": [
    {
     "label": null,
     "formula": "The structure of the pattern is ”V在+Location” .The verbs often placed before “在” include “住(live)” , “坐(sit)”  and  “站(stand)”. “給”functions as a preposition that comes after a verb,shows the direction,and marks the recipient of an action. The “(一)邊……(，)(一)邊……”pattern implies that the two actions coming after each “一邊”happen at the same time or at the same place. This pattern is mostly used in modifying concrete action verbs and it can be used in sentences with only one subject or in complex sentences with two subjects,eg.”他一邊唱，我一邊跳。If “一”is omitted,there should be only one subject in the sentence,eg. “他邊唱邊跳。” 1. 可欣：中文不太容易學，你為甚麼想學?   良介：雖然不容易，可是我覺得很有意思。2. A：他很聰明，為什麼考試常常考得不好?   B：雖然他很聰明，可是不喜歡讀書，所以考得不好。3. A：你生病了，今天還要去上班嗎?   B：雖然不舒服，可是今天公司有很重要的事，一定要去。 This pattern implies that the speaker agrees to the information coming after”雖然” but the information coming after This particle “呢”,often placed at the end of a sentence , is used to emphasize that the foregoing action or fact is based on the speaker’s personal opinion. It shows a tone of politeness . The”呢”used here is different from that used in an interrogative sentence. 畫一個你喜歡的人的樣子，然後用你學過的中文去介紹這個人的樣子和這個人的個性。最後，全班選出誰介紹的畫最有意思。",
     "examples": [
      {
       "hz": "爸爸忘了他的手機放在哪裡了。",
       "vi": "Bố quên mất đã để điện thoại ở đâu.",
       "py": "Bàba wàng le tā de shǒujī fàngzài nǎlǐ le."
      },
      {
       "hz": "你不要站在那麼高的地方，很危險!",
       "vi": "Đừng đứng ở chỗ cao như vậy, nguy hiểm lắm!",
       "py": "Nǐ búyào zhàn zài nàme gāo de dìfāng, hěn wéixiǎn!"
      },
      {
       "hz": "我住在捷運站附近，走路五分鐘就到了",
       "vi": "Tôi sống gần ga tàu điện ngầm, đi bộ năm phút là đến.",
       "py": "Wǒ zhù zài jiéyùn zhàn fùjìn, zǒulù wǔfēnzhōng jiù dào le"
      },
      {
       "hz": "那些書，我送給朋友了。",
       "vi": "Những quyển sách đó tôi đã tặng cho bạn rồi.",
       "py": "Nàxiē shū, wǒ sònggěi péngyǒu le."
      },
      {
       "hz": "王先生的舊車賣給張小姐了。",
       "vi": "Chiếc xe cũ của anh Vương đã bán cho cô Trương rồi.",
       "py": "Wáng xiānshēng de jiùchē mài gěi Zhāng xiǎojiě le."
      },
      {
       "hz": "我拿著電話，可是忘了要打給誰了。",
       "vi": "Tôi cầm điện thoại, nhưng quên mất định gọi cho ai.",
       "py": "Wǒ ná zhe diànhuà, kěshì wàng le yào dǎ gěi shéi le."
      },
      {
       "hz": "桌上的水果，你拿給誰吃了?",
       "vi": "Trái cây trên bàn, bạn mang cho ai ăn rồi?",
       "py": "Zhuōshàng de shuǐguǒ, nǐ nágěi shéi chī le?"
      },
      {
       "hz": "我沒聽過十二生肖的故事，你可以說給我聽嗎?",
       "vi": "Tôi chưa từng nghe chuyện mười hai con giáp, bạn kể cho tôi nghe được không?",
       "py": "Wǒ méi tīng guò shí'èrshēngxiào de gùshì, nǐ kěyǐ shuō gěi wǒ tīng ma?"
      },
      {
       "hz": "·送給 ·賣給 ·寫給 ·拿給 ·帶給 ·寄給",
       "vi": "· tặng cho · bán cho · viết cho · đưa cho · mang cho · gửi cho",
       "py": "· sònggěi · mài gěi · xiěgěi · nágěi · dàigěi · jìgěi"
      },
      {
       "hz": "有人(一)邊走路(一)邊玩手機，真危險。",
       "vi": "Có người vừa đi bộ vừa chơi điện thoại, thật nguy hiểm.",
       "py": "Yǒurén (yì) biān zǒulù (yì) biānwán shǒujī, zhēn wéixiǎn."
      },
      {
       "hz": "很多學生喜歡(一)邊聽音樂，(一)邊念書。",
       "vi": "Nhiều học sinh thích vừa nghe nhạc vừa học bài.",
       "py": "Hěnduō xuéshēng xǐhuān (yì) biān tīng yīnyuè, (yì) biān niànshū."
      },
      {
       "hz": "上課的時候，老師一邊說，學生一邊寫。",
       "vi": "Trong giờ học, thầy giáo vừa nói, học sinh vừa ghi.",
       "py": "Shàngkè de shíhòu, lǎoshī yìbiān shuō, xuéshēng yìbiān xiě."
      },
      {
       "hz": "A：那件裙子非常貴，你還要買嗎?",
       "vi": "A: Chiếc váy đó cực kỳ đắt, bạn vẫn muốn mua à?",
       "py": "A: Nà jiàn qúnzi fēicháng guì, nǐ háiyào mǎi ma?"
      },
      {
       "hz": "A：你為什麼住在這麼小的房子?",
       "vi": "A: Sao bạn lại sống trong căn nhà nhỏ thế này?",
       "py": "A: Nǐ wèishénme zhù zài zhème xiǎo de fángzi?"
      },
      {
       "hz": "A：你玩遊戲常常輸，為什麼還要玩?",
       "vi": "A: Bạn chơi game hay thua, sao vẫn muốn chơi?",
       "py": "A: Nǐ wányóuxì chángcháng shū, wèishénme háiyào wán?"
      },
      {
       "hz": "A：他家離你家很遠嗎? B：不，他家離我家很近呢!2. A：我覺得那個電影很難看。 B：可是我覺得很好看，想再看一次呢!3. 爸爸：孩子又出去玩了嗎? 媽媽：他沒出去玩，他一直在房間讀書呢!",
       "vi": "A: Nhà anh ấy cách nhà bạn xa lắm à? B: Không, nhà anh ấy gần nhà tôi lắm! A: Tôi thấy bộ phim đó dở lắm. B: Nhưng tôi thấy hay lắm, còn muốn xem lại lần nữa! Bố: Con lại ra ngoài chơi rồi à? Mẹ: Con không đi chơi, nó ở trong phòng học bài suốt đấy!",
       "py": "A: Tājiā lí nǐjiā hěn yuǎn ma? B: Bù, tājiā lí wǒjiā hěn jìn ne! 2. A: Wǒ juéde nàge diànyǐng hěn nánkàn. B: Kěshì wǒ juéde hěn hǎokàn, xiǎng zài kàn yícì ne! 3. Bàba: Háizi yòu chūqùwán le ma? Māma: Tā méi chūqùwán, tā yìzhí zài fángjiān dúshū ne!"
      },
      {
       "hz": "A：良介在做什麼?我有事情想問他。",
       "vi": "A: Ryosuke đang làm gì vậy? Tôi có việc muốn hỏi cậu ấy.",
       "py": "A: Liángjiè zài zuò shénme? Wǒ yǒu shìqíng xiǎng wèn tā."
      },
      {
       "hz": "妹妹：這個週末妳要不要跟我去博物館?",
       "vi": "Em gái: Cuối tuần này chị có muốn đi bảo tàng với em không?",
       "py": "Mèimei: Zhège zhōumò nǐ yào búyào gēn wǒ qù bówùguǎn?"
      },
      {
       "hz": "A：為什麼你每天都喝珍珠奶茶?",
       "vi": "A: Sao ngày nào bạn cũng uống trà sữa trân châu?",
       "py": "A: Wèishénme nǐ měitiān dōu hē zhēnzhūnǎichá?"
      },
      {
       "hz": "把卡片的正、反面寫好以後，放在一起，然後老師拿一張，念卡片前面的內容，請學生想這張卡片是誰的。",
       "vi": "Viết xong mặt trước và mặt sau của tấm thẻ thì gom lại, sau đó thầy giáo rút một tấm, đọc nội dung mặt trước, cho học sinh đoán tấm thẻ đó của ai.",
       "py": "Bǎ kǎpiàn de zhèng, fǎnmiàn xiě hǎo yǐhòu, fàngzài yìqǐ, ránhòu lǎoshī ná yìzhāng, niàn kǎpiàn qiánmiàn de nèiróng, qǐng xuéshēng xiǎng zhè zhāng kǎpiàn shì shéi de."
      },
      {
       "hz": "不喜歡做什麼",
       "vi": "Không thích làm gì",
       "py": "Bù xǐhuān zuò shénme"
      },
      {
       "hz": "你喜歡怎麼樣的人？",
       "vi": "Bạn thích người như thế nào?",
       "py": "Nǐ xǐhuān zěnmeyàng de rén?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 在 — vị trí sau hành động",
   "giaiThich": "Mẫu \"động từ + 在 + nơi chốn\" cho biết kết quả của hành động ở đâu. Động từ hay dùng: 住 (ở), 坐 (ngồi), 站 (đứng). Bài cũng có 給 làm giới từ đứng sau động từ, chỉ người nhận."
  }
 ],
 "td2-1.2": [
  {
   "title": "I. V 一下 (+ O) V a bit (+ O)",
   "points": [
    {
     "label": null,
     "formula": "This grammar indicates the action of the verb lasts for a short time or the amount of action is quite small.",
     "examples": [
      {
       "hz": "A：良介呢？他沒來嗎？ B：他去一下洗手間，馬上回來。",
       "vi": "A: Ryosuke đâu? Cậu ấy không đến à? B: Cậu ấy đi vệ sinh một chút, về ngay.",
       "py": "A: Liángjiè ne? Tā méi lái ma? B: Tā qù yíxià xǐshǒujiān, mǎshàng huílái."
      },
      {
       "hz": "A：你能介紹一下你自己嗎？ B：大家好，我叫山本良介。",
       "vi": "A: Bạn giới thiệu một chút về bản thân được không? B: Xin chào mọi người, tôi tên là Yamamoto Ryosuke.",
       "py": "A: Nǐ néng jièshào yíxià nǐ zìjǐ ma? B: Dàjiā hǎo, wǒ jiào shānběn Liángjiè."
      },
      {
       "hz": "A：我去旁邊的商店買麵包，你可以等一下嗎？ B：沒問題。",
       "vi": "A: Tôi ra cửa hàng bên cạnh mua bánh mì, bạn đợi một chút được không? B: Không vấn đề gì.",
       "py": "A: Wǒ qù pángbiān de shāngdiàn mǎi miànbāo, nǐ kěyǐ děng yíxià ma? B: Méi wèntí."
      },
      {
       "hz": "B：好的，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Hǎo de, méi wèntí."
      },
      {
       "hz": "B：好的，馬上去。",
       "vi": "B: Được, đi ngay đây.",
       "py": "B: Hǎo de, mǎshàng qù."
      },
      {
       "hz": "先生：晚上要吃什麼？",
       "vi": "Chồng: Tối nay ăn gì?",
       "py": "Xiānshēng: Wǎnshàng yào chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 一下 — làm một chút",
   "giaiThich": "Diễn đạt hành động diễn ra trong thời gian ngắn hoặc mức độ nhẹ nhàng (\"… một chút, một lát\")."
  },
  {
   "title": "II. 最好 + VP had better + VP",
   "points": [
    {
     "label": null,
     "formula": "This expression, often followed by a verb phrase, is used to give advice about what someone should do. The “不但……也……” pattern connects two phrases or clauses and indicates the two situations exist at the same time. If “不但” and “也” have the same topic , “不但” should come after the topic , connect with a phrase ,and“也” connect with another phrase. If related to different aspect , “ 也 ” should come after the second aspect. A：你為甚麼想學中文？ B：學中文不但很有意思，也比較容易找工作。",
     "examples": [
      {
       "hz": "A：我的頭好疼啊！ B：你最好去看醫生，聽聽醫生怎麼說。",
       "vi": "A: Đầu tôi đau quá! B: Tốt nhất bạn nên đi khám bác sĩ, nghe xem bác sĩ nói gì.",
       "py": "A: Wǒ de tóu hǎo téng a! B: Nǐ zuìhǎo qù kàn yīshēng, tīngtīng yīshēng zěnme shuō."
      },
      {
       "hz": "A：下個禮拜五就要考試了。 B：對啊！我們最好每天下了課就去圖書館念書。",
       "vi": "A: Thứ Sáu tuần sau là thi rồi. B: Đúng vậy! Tốt nhất ngày nào tan học chúng ta cũng đến thư viện học bài.",
       "py": "A: Xià gè lǐbàiwǔ jiùyào kǎoshì le. B: Duì a! Wǒmen zuìhǎo měitiān xià le kè jiù qù túshūguǎn niànshū."
      },
      {
       "hz": "妹妹：我昨天認識了一個男生，他說這個週末要跟我約會。姐姐：你最好不要一個人去。",
       "vi": "Em gái: Hôm qua em quen một bạn nam, anh ấy nói cuối tuần này muốn hẹn hò với em. Chị gái: Tốt nhất em đừng đi một mình.",
       "py": "Mèimei: Wǒ zuótiān rènshì le yígè nánshēng, tā shuō zhège zhōumò yào gēn wǒ yuēhuì. Jiějie: Nǐ zuìhǎo búyào yígè rén qù."
      },
      {
       "hz": "A：我覺得非常不舒服，好像發燒了。(在家休息)2.A：我今天上課遲到了，老師有一點兒不高興。",
       "vi": "A: Tôi thấy rất khó chịu, hình như bị sốt rồi. (ở nhà nghỉ ngơi) A: Hôm nay tôi đi học muộn, thầy giáo hơi không vui.",
       "py": "A: Wǒ juéde fēicháng bù shūfú, hǎoxiàng fāshāo le. (zàijiā xiūxí) 2. A: Wǒ jīntiān shàngkè chídào le, lǎoshī yǒu yìdiǎn'ér bù gāoxìng."
      },
      {
       "hz": "A：今年我想到台北101去跨年。",
       "vi": "A: Năm nay tôi muốn đến Taipei 101 đón năm mới.",
       "py": "A: Jīnnián wǒ xiǎngdào Táiběi 101 qù kuà nián."
      },
      {
       "hz": "A：這家餐廳的菜都很好吃，你想吃什麼？ B：我不但想吃小籠包，也想吃牛肉麵。",
       "vi": "A: Món ăn nhà hàng này đều rất ngon, bạn muốn ăn gì? B: Tôi không những muốn ăn bánh bao nhỏ mà còn muốn ăn mì bò.",
       "py": "A: Zhèjiā cāntīng de cài dōu hěn hǎochī, nǐ xiǎng chī shénme? B: Wǒ búdàn xiǎng chī xiǎolóngbāo, yě xiǎng chī niúròumiàn."
      },
      {
       "hz": "A：你為什麼來台灣旅行？ B：因為台灣不但風景美，交通也很方便。",
       "vi": "A: Sao bạn đến Đài Loan du lịch? B: Vì Đài Loan không những phong cảnh đẹp mà giao thông cũng rất tiện.",
       "py": "A: Nǐ wèishénme lái Táiwān lǚxíng? B: Yīnwèi Táiwān búdàn fēngjǐng měi, jiāotōng yě hěn fāngbiàn."
      },
      {
       "hz": "A：為什麼你最近這麼忙？",
       "vi": "A: Sao dạo này bạn bận thế?",
       "py": "A: Wèishénme nǐ zuìjìn zhème máng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "最好 + cụm động từ — tốt nhất là…",
   "giaiThich": "Dùng để khuyên ai đó nên làm gì (\"tốt nhất là…\"). Bài này cũng luyện mẫu 不但……也…… nối hai vế cùng đúng một lúc."
  },
  {
   "title": "IV. V 完 completion of action with V 完",
   "points": [
    {
     "label": null,
     "formula": "The expression indicates that an action is finished. The “完”,serving as a verb complement , means  \t“done” or “finished”.",
     "examples": [
      {
       "hz": "今天的作業不多，我很快就寫完了。2. 可欣：跨年演唱會的票賣完了嗎？美心：聽說上個星期就賣完了。3. 可欣：你上個禮拜買的那本書看完了嗎？美心：這個禮拜我很忙，還沒看完。",
       "vi": "Bài tập hôm nay không nhiều, tôi viết xong rất nhanh. Khả Hân: Vé hoà nhạc đón năm mới bán hết chưa? Mỹ Tâm: Nghe nói tuần trước đã bán hết rồi. Khả Hân: Quyển sách bạn mua tuần trước đọc xong chưa? Mỹ Tâm: Tuần này tôi bận lắm, vẫn chưa đọc xong.",
       "py": "Jīntiān de zuòyè bù duō, wǒ hěnkuài jiù xiě wán le. 2. Kěxīn: Kuà nián yǎnchànghuì de piào màiwán le ma? Měixīn: Tīngshuō shànggèxīngqí jiù màiwán le. 3. Kěxīn: Nǐ shàng gè lǐbài mǎi de nàběnshū kàn wán le ma? Měixīn: Zhège lǐbài wǒ hěn máng, hái méi kàn wán."
      },
      {
       "hz": "先生：我現在要去超級市場買東西，要買牛奶嗎?",
       "vi": "Chồng: Bây giờ anh đi siêu thị mua đồ, có cần mua sữa không?",
       "py": "Xiānshēng: Wǒ xiànzài yào qù chāojíshìchǎng mǎi dōngxī, yào mǎi niúnǎi ma?"
      },
      {
       "hz": "良介在日本的時候，是一個怎麼樣的人？來台灣以後呢？",
       "vi": "Hồi ở Nhật, Ryosuke là người thế nào? Sau khi đến Đài Loan thì sao?",
       "py": "Liángjiè zài Rìběn de shíhòu, shì yígè zěnmeyàng de rén? Lái Táiwān yǐhòu ne?"
      },
      {
       "hz": "良介覺得在台灣生活怎麼樣，為什麼？",
       "vi": "Ryosuke thấy cuộc sống ở Đài Loan thế nào, tại sao?",
       "py": "Liángjiè juéde zài Táiwān shēnghuó zěnmeyàng, wèishénme?"
      },
      {
       "hz": "那個女生為什麼不敢跟良介見面？",
       "vi": "Tại sao cô gái đó không dám gặp Ryosuke?",
       "py": "Nàge nǚshēng wèishénme bùgǎn gēn Liángjiè jiànmiàn?"
      },
      {
       "hz": "良介後來怎麼跟這個女生見面？良介的心為什麼跳得很快？",
       "vi": "Sau đó Ryosuke gặp cô gái này bằng cách nào? Tại sao tim Ryosuke đập nhanh?",
       "py": "Liángjiè hòulái zěnme gēn zhège nǚshēng jiànmiàn? Liángjiè de xīn wèishénme tiào de hěnkuài?"
      },
      {
       "hz": "良介為什麼很想再跟她約會？他們做了什麼事？",
       "vi": "Tại sao Ryosuke rất muốn hẹn hò với cô ấy lần nữa? Họ đã làm những gì?",
       "py": "Liángjiè wèishénme hěn xiǎng zài gēn tā yuēhuì? Tāmen zuò le shénme shì?"
      },
      {
       "hz": "良介拉了那個女生的手嗎？為什麼？",
       "vi": "Ryosuke có nắm tay cô gái đó không? Tại sao?",
       "py": "Liángjiè lā le nàge nǚshēng de shǒu ma? Wèishénme?"
      },
      {
       "hz": "良介雖然是外國人，可是那個女生覺得良介怎麼樣？",
       "vi": "Dù Ryosuke là người nước ngoài, cô gái đó thấy Ryosuke thế nào?",
       "py": "Liángjiè suīrán shì wàiguórén, kěshì nàge nǚshēng juéde Liángjiè zěnmeyàng?"
      },
      {
       "hz": "良介後來還跟那個女生在一起嗎？你怎麼知道？",
       "vi": "Sau này Ryosuke còn ở bên cô gái đó không? Làm sao bạn biết?",
       "py": "Liángjiè hòulái hái gēn nàge nǚshēng zài yìqǐ ma? Nǐ zěnme zhīdào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 完 — làm xong",
   "giaiThich": "完 làm bổ ngữ đứng sau động từ, chỉ hành động đã kết thúc, đã xong."
  },
  {
   "title": "I. V在 resultant location with V 在",
   "points": [
    {
     "label": null,
     "formula": "The structure of the pattern is ”V在+Location” .The verbs often placed before “在” include “住(live)” , “坐(sit)”  and  “站(stand)”. “給”functions as a preposition that comes after a verb,shows the direction,and marks the recipient of an action. The “(一)邊……(，)(一)邊……”pattern implies that the two actions coming after each “一邊”happen at the same time or at the same place. This pattern is mostly used in modifying concrete action verbs and it can be used in sentences with only one subject or in complex sentences with two subjects,eg.”他一邊唱，我一邊跳。If “一”is omitted,there should be only one subject in the sentence,eg. “他邊唱邊跳。” 1. 可欣：中文不太容易學，你為甚麼想學?   良介：雖然不容易，可是我覺得很有意思。2. A：他很聰明，為什麼考試常常考得不好?   B：雖然他很聰明，可是不喜歡讀書，所以考得不好。3. A：你生病了，今天還要去上班嗎?   B：雖然不舒服，可是今天公司有很重要的事，一定要去。 This pattern implies that the speaker agrees to the information coming after”雖然” but the information coming after This particle “呢”,often placed at the end of a sentence , is used to emphasize that the foregoing action or fact is based on the speaker’s personal opinion. It shows a tone of politeness . The”呢”used here is different from that used in an interrogative sentence. 畫一個你喜歡的人的樣子，然後用你學過的中文去介紹這個人的樣子和這個人的個性。最後，全班選出誰介紹的畫最有意思。",
     "examples": [
      {
       "hz": "爸爸忘了他的手機放在哪裡了。",
       "vi": "Bố quên mất đã để điện thoại ở đâu.",
       "py": "Bàba wàng le tā de shǒujī fàngzài nǎlǐ le."
      },
      {
       "hz": "你不要站在那麼高的地方，很危險!",
       "vi": "Đừng đứng ở chỗ cao như vậy, nguy hiểm lắm!",
       "py": "Nǐ búyào zhàn zài nàme gāo de dìfāng, hěn wéixiǎn!"
      },
      {
       "hz": "我住在捷運站附近，走路五分鐘就到了",
       "vi": "Tôi sống gần ga tàu điện ngầm, đi bộ năm phút là đến.",
       "py": "Wǒ zhù zài jiéyùn zhàn fùjìn, zǒulù wǔfēnzhōng jiù dào le"
      },
      {
       "hz": "那些書，我送給朋友了。",
       "vi": "Những quyển sách đó tôi đã tặng cho bạn rồi.",
       "py": "Nàxiē shū, wǒ sònggěi péngyǒu le."
      },
      {
       "hz": "王先生的舊車賣給張小姐了。",
       "vi": "Chiếc xe cũ của anh Vương đã bán cho cô Trương rồi.",
       "py": "Wáng xiānshēng de jiùchē mài gěi Zhāng xiǎojiě le."
      },
      {
       "hz": "我拿著電話，可是忘了要打給誰了。",
       "vi": "Tôi cầm điện thoại, nhưng quên mất định gọi cho ai.",
       "py": "Wǒ ná zhe diànhuà, kěshì wàng le yào dǎ gěi shéi le."
      },
      {
       "hz": "桌上的水果，你拿給誰吃了?",
       "vi": "Trái cây trên bàn, bạn mang cho ai ăn rồi?",
       "py": "Zhuōshàng de shuǐguǒ, nǐ nágěi shéi chī le?"
      },
      {
       "hz": "我沒聽過十二生肖的故事，你可以說給我聽嗎?",
       "vi": "Tôi chưa từng nghe chuyện mười hai con giáp, bạn kể cho tôi nghe được không?",
       "py": "Wǒ méi tīng guò shí'èrshēngxiào de gùshì, nǐ kěyǐ shuō gěi wǒ tīng ma?"
      },
      {
       "hz": "·送給 ·賣給 ·寫給 ·拿給 ·帶給 ·寄給",
       "vi": "· tặng cho · bán cho · viết cho · đưa cho · mang cho · gửi cho",
       "py": "· sònggěi · mài gěi · xiěgěi · nágěi · dàigěi · jìgěi"
      },
      {
       "hz": "有人(一)邊走路(一)邊玩手機，真危險。",
       "vi": "Có người vừa đi bộ vừa chơi điện thoại, thật nguy hiểm.",
       "py": "Yǒurén (yì) biān zǒulù (yì) biānwán shǒujī, zhēn wéixiǎn."
      },
      {
       "hz": "很多學生喜歡(一)邊聽音樂，(一)邊念書。",
       "vi": "Nhiều học sinh thích vừa nghe nhạc vừa học bài.",
       "py": "Hěnduō xuéshēng xǐhuān (yì) biān tīng yīnyuè, (yì) biān niànshū."
      },
      {
       "hz": "上課的時候，老師一邊說，學生一邊寫。",
       "vi": "Trong giờ học, thầy giáo vừa nói, học sinh vừa ghi.",
       "py": "Shàngkè de shíhòu, lǎoshī yìbiān shuō, xuéshēng yìbiān xiě."
      },
      {
       "hz": "A：那件裙子非常貴，你還要買嗎?",
       "vi": "A: Chiếc váy đó cực kỳ đắt, bạn vẫn muốn mua à?",
       "py": "A: Nà jiàn qúnzi fēicháng guì, nǐ háiyào mǎi ma?"
      },
      {
       "hz": "A：你為什麼住在這麼小的房子?",
       "vi": "A: Sao bạn lại sống trong căn nhà nhỏ thế này?",
       "py": "A: Nǐ wèishénme zhù zài zhème xiǎo de fángzi?"
      },
      {
       "hz": "A：你玩遊戲常常輸，為什麼還要玩?",
       "vi": "A: Bạn chơi game hay thua, sao vẫn muốn chơi?",
       "py": "A: Nǐ wányóuxì chángcháng shū, wèishénme háiyào wán?"
      },
      {
       "hz": "A：他家離你家很遠嗎? B：不，他家離我家很近呢!2. A：我覺得那個電影很難看。 B：可是我覺得很好看，想再看一次呢!3. 爸爸：孩子又出去玩了嗎? 媽媽：他沒出去玩，他一直在房間讀書呢!",
       "vi": "A: Nhà anh ấy cách nhà bạn xa lắm à? B: Không, nhà anh ấy gần nhà tôi lắm! A: Tôi thấy bộ phim đó dở lắm. B: Nhưng tôi thấy hay lắm, còn muốn xem lại lần nữa! Bố: Con lại ra ngoài chơi rồi à? Mẹ: Con không đi chơi, nó ở trong phòng học bài suốt đấy!",
       "py": "A: Tājiā lí nǐjiā hěn yuǎn ma? B: Bù, tājiā lí wǒjiā hěn jìn ne! 2. A: Wǒ juéde nàge diànyǐng hěn nánkàn. B: Kěshì wǒ juéde hěn hǎokàn, xiǎng zài kàn yícì ne! 3. Bàba: Háizi yòu chūqùwán le ma? Māma: Tā méi chūqùwán, tā yìzhí zài fángjiān dúshū ne!"
      },
      {
       "hz": "A：良介在做什麼?我有事情想問他。",
       "vi": "A: Ryosuke đang làm gì vậy? Tôi có việc muốn hỏi cậu ấy.",
       "py": "A: Liángjiè zài zuò shénme? Wǒ yǒu shìqíng xiǎng wèn tā."
      },
      {
       "hz": "妹妹：這個週末妳要不要跟我去博物館?",
       "vi": "Em gái: Cuối tuần này chị có muốn đi bảo tàng với em không?",
       "py": "Mèimei: Zhège zhōumò nǐ yào búyào gēn wǒ qù bówùguǎn?"
      },
      {
       "hz": "A：為什麼你每天都喝珍珠奶茶?",
       "vi": "A: Sao ngày nào bạn cũng uống trà sữa trân châu?",
       "py": "A: Wèishénme nǐ měitiān dōu hē zhēnzhūnǎichá?"
      },
      {
       "hz": "把卡片的正、反面寫好以後，放在一起，然後老師拿一張，念卡片前面的內容，請學生想這張卡片是誰的。",
       "vi": "Viết xong mặt trước và mặt sau của tấm thẻ thì gom lại, sau đó thầy giáo rút một tấm, đọc nội dung mặt trước, cho học sinh đoán tấm thẻ đó của ai.",
       "py": "Bǎ kǎpiàn de zhèng, fǎnmiàn xiě hǎo yǐhòu, fàngzài yìqǐ, ránhòu lǎoshī ná yìzhāng, niàn kǎpiàn qiánmiàn de nèiróng, qǐng xuéshēng xiǎng zhè zhāng kǎpiàn shì shéi de."
      },
      {
       "hz": "不喜歡做什麼",
       "vi": "Không thích làm gì",
       "py": "Bù xǐhuān zuò shénme"
      },
      {
       "hz": "你喜歡怎麼樣的人？",
       "vi": "Bạn thích người như thế nào?",
       "py": "Nǐ xǐhuān zěnmeyàng de rén?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 在 — vị trí sau hành động",
   "giaiThich": "Mẫu \"động từ + 在 + nơi chốn\" cho biết kết quả của hành động ở đâu. Động từ hay dùng: 住 (ở), 坐 (ngồi), 站 (đứng). Bài cũng có 給 làm giới từ đứng sau động từ, chỉ người nhận."
  }
 ],
 "td2-1.3": [
  {
   "title": "I. V 一下 (+ O) V a bit (+ O)",
   "points": [
    {
     "label": null,
     "formula": "This grammar indicates the action of the verb lasts for a short time or the amount of action is quite small.",
     "examples": [
      {
       "hz": "A：良介呢？他沒來嗎？ B：他去一下洗手間，馬上回來。",
       "vi": "A: Ryosuke đâu? Cậu ấy không đến à? B: Cậu ấy đi vệ sinh một chút, về ngay.",
       "py": "A: Liángjiè ne? Tā méi lái ma? B: Tā qù yíxià xǐshǒujiān, mǎshàng huílái."
      },
      {
       "hz": "A：你能介紹一下你自己嗎？ B：大家好，我叫山本良介。",
       "vi": "A: Bạn giới thiệu một chút về bản thân được không? B: Xin chào mọi người, tôi tên là Yamamoto Ryosuke.",
       "py": "A: Nǐ néng jièshào yíxià nǐ zìjǐ ma? B: Dàjiā hǎo, wǒ jiào shānběn Liángjiè."
      },
      {
       "hz": "A：我去旁邊的商店買麵包，你可以等一下嗎？ B：沒問題。",
       "vi": "A: Tôi ra cửa hàng bên cạnh mua bánh mì, bạn đợi một chút được không? B: Không vấn đề gì.",
       "py": "A: Wǒ qù pángbiān de shāngdiàn mǎi miànbāo, nǐ kěyǐ děng yíxià ma? B: Méi wèntí."
      },
      {
       "hz": "B：好的，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Hǎo de, méi wèntí."
      },
      {
       "hz": "B：好的，馬上去。",
       "vi": "B: Được, đi ngay đây.",
       "py": "B: Hǎo de, mǎshàng qù."
      },
      {
       "hz": "先生：晚上要吃什麼？",
       "vi": "Chồng: Tối nay ăn gì?",
       "py": "Xiānshēng: Wǎnshàng yào chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 一下 — làm một chút",
   "giaiThich": "Diễn đạt hành động diễn ra trong thời gian ngắn hoặc mức độ nhẹ nhàng (\"… một chút, một lát\")."
  },
  {
   "title": "II. 最好 + VP had better + VP",
   "points": [
    {
     "label": null,
     "formula": "This expression, often followed by a verb phrase, is used to give advice about what someone should do. The “不但……也……” pattern connects two phrases or clauses and indicates the two situations exist at the same time. If “不但” and “也” have the same topic , “不但” should come after the topic , connect with a phrase ,and“也” connect with another phrase. If related to different aspect , “ 也 ” should come after the second aspect. A：你為甚麼想學中文？ B：學中文不但很有意思，也比較容易找工作。",
     "examples": [
      {
       "hz": "A：我的頭好疼啊！ B：你最好去看醫生，聽聽醫生怎麼說。",
       "vi": "A: Đầu tôi đau quá! B: Tốt nhất bạn nên đi khám bác sĩ, nghe xem bác sĩ nói gì.",
       "py": "A: Wǒ de tóu hǎo téng a! B: Nǐ zuìhǎo qù kàn yīshēng, tīngtīng yīshēng zěnme shuō."
      },
      {
       "hz": "A：下個禮拜五就要考試了。 B：對啊！我們最好每天下了課就去圖書館念書。",
       "vi": "A: Thứ Sáu tuần sau là thi rồi. B: Đúng vậy! Tốt nhất ngày nào tan học chúng ta cũng đến thư viện học bài.",
       "py": "A: Xià gè lǐbàiwǔ jiùyào kǎoshì le. B: Duì a! Wǒmen zuìhǎo měitiān xià le kè jiù qù túshūguǎn niànshū."
      },
      {
       "hz": "妹妹：我昨天認識了一個男生，他說這個週末要跟我約會。姐姐：你最好不要一個人去。",
       "vi": "Em gái: Hôm qua em quen một bạn nam, anh ấy nói cuối tuần này muốn hẹn hò với em. Chị gái: Tốt nhất em đừng đi một mình.",
       "py": "Mèimei: Wǒ zuótiān rènshì le yígè nánshēng, tā shuō zhège zhōumò yào gēn wǒ yuēhuì. Jiějie: Nǐ zuìhǎo búyào yígè rén qù."
      },
      {
       "hz": "A：我覺得非常不舒服，好像發燒了。(在家休息)2.A：我今天上課遲到了，老師有一點兒不高興。",
       "vi": "A: Tôi thấy rất khó chịu, hình như bị sốt rồi. (ở nhà nghỉ ngơi) A: Hôm nay tôi đi học muộn, thầy giáo hơi không vui.",
       "py": "A: Wǒ juéde fēicháng bù shūfú, hǎoxiàng fāshāo le. (zàijiā xiūxí) 2. A: Wǒ jīntiān shàngkè chídào le, lǎoshī yǒu yìdiǎn'ér bù gāoxìng."
      },
      {
       "hz": "A：今年我想到台北101去跨年。",
       "vi": "A: Năm nay tôi muốn đến Taipei 101 đón năm mới.",
       "py": "A: Jīnnián wǒ xiǎngdào Táiběi 101 qù kuà nián."
      },
      {
       "hz": "A：這家餐廳的菜都很好吃，你想吃什麼？ B：我不但想吃小籠包，也想吃牛肉麵。",
       "vi": "A: Món ăn nhà hàng này đều rất ngon, bạn muốn ăn gì? B: Tôi không những muốn ăn bánh bao nhỏ mà còn muốn ăn mì bò.",
       "py": "A: Zhèjiā cāntīng de cài dōu hěn hǎochī, nǐ xiǎng chī shénme? B: Wǒ búdàn xiǎng chī xiǎolóngbāo, yě xiǎng chī niúròumiàn."
      },
      {
       "hz": "A：你為什麼來台灣旅行？ B：因為台灣不但風景美，交通也很方便。",
       "vi": "A: Sao bạn đến Đài Loan du lịch? B: Vì Đài Loan không những phong cảnh đẹp mà giao thông cũng rất tiện.",
       "py": "A: Nǐ wèishénme lái Táiwān lǚxíng? B: Yīnwèi Táiwān búdàn fēngjǐng měi, jiāotōng yě hěn fāngbiàn."
      },
      {
       "hz": "A：為什麼你最近這麼忙？",
       "vi": "A: Sao dạo này bạn bận thế?",
       "py": "A: Wèishénme nǐ zuìjìn zhème máng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "最好 + cụm động từ — tốt nhất là…",
   "giaiThich": "Dùng để khuyên ai đó nên làm gì (\"tốt nhất là…\"). Bài này cũng luyện mẫu 不但……也…… nối hai vế cùng đúng một lúc."
  },
  {
   "title": "IV. V 完 completion of action with V 完",
   "points": [
    {
     "label": null,
     "formula": "The expression indicates that an action is finished. The “完”,serving as a verb complement , means  \t“done” or “finished”.",
     "examples": [
      {
       "hz": "今天的作業不多，我很快就寫完了。2. 可欣：跨年演唱會的票賣完了嗎？美心：聽說上個星期就賣完了。3. 可欣：你上個禮拜買的那本書看完了嗎？美心：這個禮拜我很忙，還沒看完。",
       "vi": "Bài tập hôm nay không nhiều, tôi viết xong rất nhanh. Khả Hân: Vé hoà nhạc đón năm mới bán hết chưa? Mỹ Tâm: Nghe nói tuần trước đã bán hết rồi. Khả Hân: Quyển sách bạn mua tuần trước đọc xong chưa? Mỹ Tâm: Tuần này tôi bận lắm, vẫn chưa đọc xong.",
       "py": "Jīntiān de zuòyè bù duō, wǒ hěnkuài jiù xiě wán le. 2. Kěxīn: Kuà nián yǎnchànghuì de piào màiwán le ma? Měixīn: Tīngshuō shànggèxīngqí jiù màiwán le. 3. Kěxīn: Nǐ shàng gè lǐbài mǎi de nàběnshū kàn wán le ma? Měixīn: Zhège lǐbài wǒ hěn máng, hái méi kàn wán."
      },
      {
       "hz": "先生：我現在要去超級市場買東西，要買牛奶嗎?",
       "vi": "Chồng: Bây giờ anh đi siêu thị mua đồ, có cần mua sữa không?",
       "py": "Xiānshēng: Wǒ xiànzài yào qù chāojíshìchǎng mǎi dōngxī, yào mǎi niúnǎi ma?"
      },
      {
       "hz": "良介在日本的時候，是一個怎麼樣的人？來台灣以後呢？",
       "vi": "Hồi ở Nhật, Ryosuke là người thế nào? Sau khi đến Đài Loan thì sao?",
       "py": "Liángjiè zài Rìběn de shíhòu, shì yígè zěnmeyàng de rén? Lái Táiwān yǐhòu ne?"
      },
      {
       "hz": "良介覺得在台灣生活怎麼樣，為什麼？",
       "vi": "Ryosuke thấy cuộc sống ở Đài Loan thế nào, tại sao?",
       "py": "Liángjiè juéde zài Táiwān shēnghuó zěnmeyàng, wèishénme?"
      },
      {
       "hz": "那個女生為什麼不敢跟良介見面？",
       "vi": "Tại sao cô gái đó không dám gặp Ryosuke?",
       "py": "Nàge nǚshēng wèishénme bùgǎn gēn Liángjiè jiànmiàn?"
      },
      {
       "hz": "良介後來怎麼跟這個女生見面？良介的心為什麼跳得很快？",
       "vi": "Sau đó Ryosuke gặp cô gái này bằng cách nào? Tại sao tim Ryosuke đập nhanh?",
       "py": "Liángjiè hòulái zěnme gēn zhège nǚshēng jiànmiàn? Liángjiè de xīn wèishénme tiào de hěnkuài?"
      },
      {
       "hz": "良介為什麼很想再跟她約會？他們做了什麼事？",
       "vi": "Tại sao Ryosuke rất muốn hẹn hò với cô ấy lần nữa? Họ đã làm những gì?",
       "py": "Liángjiè wèishénme hěn xiǎng zài gēn tā yuēhuì? Tāmen zuò le shénme shì?"
      },
      {
       "hz": "良介拉了那個女生的手嗎？為什麼？",
       "vi": "Ryosuke có nắm tay cô gái đó không? Tại sao?",
       "py": "Liángjiè lā le nàge nǚshēng de shǒu ma? Wèishénme?"
      },
      {
       "hz": "良介雖然是外國人，可是那個女生覺得良介怎麼樣？",
       "vi": "Dù Ryosuke là người nước ngoài, cô gái đó thấy Ryosuke thế nào?",
       "py": "Liángjiè suīrán shì wàiguórén, kěshì nàge nǚshēng juéde Liángjiè zěnmeyàng?"
      },
      {
       "hz": "良介後來還跟那個女生在一起嗎？你怎麼知道？",
       "vi": "Sau này Ryosuke còn ở bên cô gái đó không? Làm sao bạn biết?",
       "py": "Liángjiè hòulái hái gēn nàge nǚshēng zài yìqǐ ma? Nǐ zěnme zhīdào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 完 — làm xong",
   "giaiThich": "完 làm bổ ngữ đứng sau động từ, chỉ hành động đã kết thúc, đã xong."
  },
  {
   "title": "I. V在 resultant location with V 在",
   "points": [
    {
     "label": null,
     "formula": "The structure of the pattern is ”V在+Location” .The verbs often placed before “在” include “住(live)” , “坐(sit)”  and  “站(stand)”. “給”functions as a preposition that comes after a verb,shows the direction,and marks the recipient of an action. The “(一)邊……(，)(一)邊……”pattern implies that the two actions coming after each “一邊”happen at the same time or at the same place. This pattern is mostly used in modifying concrete action verbs and it can be used in sentences with only one subject or in complex sentences with two subjects,eg.”他一邊唱，我一邊跳。If “一”is omitted,there should be only one subject in the sentence,eg. “他邊唱邊跳。” 1. 可欣：中文不太容易學，你為甚麼想學?   良介：雖然不容易，可是我覺得很有意思。2. A：他很聰明，為什麼考試常常考得不好?   B：雖然他很聰明，可是不喜歡讀書，所以考得不好。3. A：你生病了，今天還要去上班嗎?   B：雖然不舒服，可是今天公司有很重要的事，一定要去。 This pattern implies that the speaker agrees to the information coming after”雖然” but the information coming after This particle “呢”,often placed at the end of a sentence , is used to emphasize that the foregoing action or fact is based on the speaker’s personal opinion. It shows a tone of politeness . The”呢”used here is different from that used in an interrogative sentence. 畫一個你喜歡的人的樣子，然後用你學過的中文去介紹這個人的樣子和這個人的個性。最後，全班選出誰介紹的畫最有意思。",
     "examples": [
      {
       "hz": "爸爸忘了他的手機放在哪裡了。",
       "vi": "Bố quên mất đã để điện thoại ở đâu.",
       "py": "Bàba wàng le tā de shǒujī fàngzài nǎlǐ le."
      },
      {
       "hz": "你不要站在那麼高的地方，很危險!",
       "vi": "Đừng đứng ở chỗ cao như vậy, nguy hiểm lắm!",
       "py": "Nǐ búyào zhàn zài nàme gāo de dìfāng, hěn wéixiǎn!"
      },
      {
       "hz": "我住在捷運站附近，走路五分鐘就到了",
       "vi": "Tôi sống gần ga tàu điện ngầm, đi bộ năm phút là đến.",
       "py": "Wǒ zhù zài jiéyùn zhàn fùjìn, zǒulù wǔfēnzhōng jiù dào le"
      },
      {
       "hz": "那些書，我送給朋友了。",
       "vi": "Những quyển sách đó tôi đã tặng cho bạn rồi.",
       "py": "Nàxiē shū, wǒ sònggěi péngyǒu le."
      },
      {
       "hz": "王先生的舊車賣給張小姐了。",
       "vi": "Chiếc xe cũ của anh Vương đã bán cho cô Trương rồi.",
       "py": "Wáng xiānshēng de jiùchē mài gěi Zhāng xiǎojiě le."
      },
      {
       "hz": "我拿著電話，可是忘了要打給誰了。",
       "vi": "Tôi cầm điện thoại, nhưng quên mất định gọi cho ai.",
       "py": "Wǒ ná zhe diànhuà, kěshì wàng le yào dǎ gěi shéi le."
      },
      {
       "hz": "桌上的水果，你拿給誰吃了?",
       "vi": "Trái cây trên bàn, bạn mang cho ai ăn rồi?",
       "py": "Zhuōshàng de shuǐguǒ, nǐ nágěi shéi chī le?"
      },
      {
       "hz": "我沒聽過十二生肖的故事，你可以說給我聽嗎?",
       "vi": "Tôi chưa từng nghe chuyện mười hai con giáp, bạn kể cho tôi nghe được không?",
       "py": "Wǒ méi tīng guò shí'èrshēngxiào de gùshì, nǐ kěyǐ shuō gěi wǒ tīng ma?"
      },
      {
       "hz": "·送給 ·賣給 ·寫給 ·拿給 ·帶給 ·寄給",
       "vi": "· tặng cho · bán cho · viết cho · đưa cho · mang cho · gửi cho",
       "py": "· sònggěi · mài gěi · xiěgěi · nágěi · dàigěi · jìgěi"
      },
      {
       "hz": "有人(一)邊走路(一)邊玩手機，真危險。",
       "vi": "Có người vừa đi bộ vừa chơi điện thoại, thật nguy hiểm.",
       "py": "Yǒurén (yì) biān zǒulù (yì) biānwán shǒujī, zhēn wéixiǎn."
      },
      {
       "hz": "很多學生喜歡(一)邊聽音樂，(一)邊念書。",
       "vi": "Nhiều học sinh thích vừa nghe nhạc vừa học bài.",
       "py": "Hěnduō xuéshēng xǐhuān (yì) biān tīng yīnyuè, (yì) biān niànshū."
      },
      {
       "hz": "上課的時候，老師一邊說，學生一邊寫。",
       "vi": "Trong giờ học, thầy giáo vừa nói, học sinh vừa ghi.",
       "py": "Shàngkè de shíhòu, lǎoshī yìbiān shuō, xuéshēng yìbiān xiě."
      },
      {
       "hz": "A：那件裙子非常貴，你還要買嗎?",
       "vi": "A: Chiếc váy đó cực kỳ đắt, bạn vẫn muốn mua à?",
       "py": "A: Nà jiàn qúnzi fēicháng guì, nǐ háiyào mǎi ma?"
      },
      {
       "hz": "A：你為什麼住在這麼小的房子?",
       "vi": "A: Sao bạn lại sống trong căn nhà nhỏ thế này?",
       "py": "A: Nǐ wèishénme zhù zài zhème xiǎo de fángzi?"
      },
      {
       "hz": "A：你玩遊戲常常輸，為什麼還要玩?",
       "vi": "A: Bạn chơi game hay thua, sao vẫn muốn chơi?",
       "py": "A: Nǐ wányóuxì chángcháng shū, wèishénme háiyào wán?"
      },
      {
       "hz": "A：他家離你家很遠嗎? B：不，他家離我家很近呢!2. A：我覺得那個電影很難看。 B：可是我覺得很好看，想再看一次呢!3. 爸爸：孩子又出去玩了嗎? 媽媽：他沒出去玩，他一直在房間讀書呢!",
       "vi": "A: Nhà anh ấy cách nhà bạn xa lắm à? B: Không, nhà anh ấy gần nhà tôi lắm! A: Tôi thấy bộ phim đó dở lắm. B: Nhưng tôi thấy hay lắm, còn muốn xem lại lần nữa! Bố: Con lại ra ngoài chơi rồi à? Mẹ: Con không đi chơi, nó ở trong phòng học bài suốt đấy!",
       "py": "A: Tājiā lí nǐjiā hěn yuǎn ma? B: Bù, tājiā lí wǒjiā hěn jìn ne! 2. A: Wǒ juéde nàge diànyǐng hěn nánkàn. B: Kěshì wǒ juéde hěn hǎokàn, xiǎng zài kàn yícì ne! 3. Bàba: Háizi yòu chūqùwán le ma? Māma: Tā méi chūqùwán, tā yìzhí zài fángjiān dúshū ne!"
      },
      {
       "hz": "A：良介在做什麼?我有事情想問他。",
       "vi": "A: Ryosuke đang làm gì vậy? Tôi có việc muốn hỏi cậu ấy.",
       "py": "A: Liángjiè zài zuò shénme? Wǒ yǒu shìqíng xiǎng wèn tā."
      },
      {
       "hz": "妹妹：這個週末妳要不要跟我去博物館?",
       "vi": "Em gái: Cuối tuần này chị có muốn đi bảo tàng với em không?",
       "py": "Mèimei: Zhège zhōumò nǐ yào búyào gēn wǒ qù bówùguǎn?"
      },
      {
       "hz": "A：為什麼你每天都喝珍珠奶茶?",
       "vi": "A: Sao ngày nào bạn cũng uống trà sữa trân châu?",
       "py": "A: Wèishénme nǐ měitiān dōu hē zhēnzhūnǎichá?"
      },
      {
       "hz": "把卡片的正、反面寫好以後，放在一起，然後老師拿一張，念卡片前面的內容，請學生想這張卡片是誰的。",
       "vi": "Viết xong mặt trước và mặt sau của tấm thẻ thì gom lại, sau đó thầy giáo rút một tấm, đọc nội dung mặt trước, cho học sinh đoán tấm thẻ đó của ai.",
       "py": "Bǎ kǎpiàn de zhèng, fǎnmiàn xiě hǎo yǐhòu, fàngzài yìqǐ, ránhòu lǎoshī ná yìzhāng, niàn kǎpiàn qiánmiàn de nèiróng, qǐng xuéshēng xiǎng zhè zhāng kǎpiàn shì shéi de."
      },
      {
       "hz": "不喜歡做什麼",
       "vi": "Không thích làm gì",
       "py": "Bù xǐhuān zuò shénme"
      },
      {
       "hz": "你喜歡怎麼樣的人？",
       "vi": "Bạn thích người như thế nào?",
       "py": "Nǐ xǐhuān zěnmeyàng de rén?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 在 — vị trí sau hành động",
   "giaiThich": "Mẫu \"động từ + 在 + nơi chốn\" cho biết kết quả của hành động ở đâu. Động từ hay dùng: 住 (ở), 坐 (ngồi), 站 (đứng). Bài cũng có 給 làm giới từ đứng sau động từ, chỉ người nhận."
  }
 ],
 "td2-1.4": [
  {
   "title": "I. V 一下 (+ O) V a bit (+ O)",
   "points": [
    {
     "label": null,
     "formula": "This grammar indicates the action of the verb lasts for a short time or the amount of action is quite small.",
     "examples": [
      {
       "hz": "A：良介呢？他沒來嗎？ B：他去一下洗手間，馬上回來。",
       "vi": "A: Ryosuke đâu? Cậu ấy không đến à? B: Cậu ấy đi vệ sinh một chút, về ngay.",
       "py": "A: Liángjiè ne? Tā méi lái ma? B: Tā qù yíxià xǐshǒujiān, mǎshàng huílái."
      },
      {
       "hz": "A：你能介紹一下你自己嗎？ B：大家好，我叫山本良介。",
       "vi": "A: Bạn giới thiệu một chút về bản thân được không? B: Xin chào mọi người, tôi tên là Yamamoto Ryosuke.",
       "py": "A: Nǐ néng jièshào yíxià nǐ zìjǐ ma? B: Dàjiā hǎo, wǒ jiào shānběn Liángjiè."
      },
      {
       "hz": "A：我去旁邊的商店買麵包，你可以等一下嗎？ B：沒問題。",
       "vi": "A: Tôi ra cửa hàng bên cạnh mua bánh mì, bạn đợi một chút được không? B: Không vấn đề gì.",
       "py": "A: Wǒ qù pángbiān de shāngdiàn mǎi miànbāo, nǐ kěyǐ děng yíxià ma? B: Méi wèntí."
      },
      {
       "hz": "B：好的，沒問題。",
       "vi": "B: Được, không vấn đề gì.",
       "py": "B: Hǎo de, méi wèntí."
      },
      {
       "hz": "B：好的，馬上去。",
       "vi": "B: Được, đi ngay đây.",
       "py": "B: Hǎo de, mǎshàng qù."
      },
      {
       "hz": "先生：晚上要吃什麼？",
       "vi": "Chồng: Tối nay ăn gì?",
       "py": "Xiānshēng: Wǎnshàng yào chī shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 一下 — làm một chút",
   "giaiThich": "Diễn đạt hành động diễn ra trong thời gian ngắn hoặc mức độ nhẹ nhàng (\"… một chút, một lát\")."
  },
  {
   "title": "II. 最好 + VP had better + VP",
   "points": [
    {
     "label": null,
     "formula": "This expression, often followed by a verb phrase, is used to give advice about what someone should do. The “不但……也……” pattern connects two phrases or clauses and indicates the two situations exist at the same time. If “不但” and “也” have the same topic , “不但” should come after the topic , connect with a phrase ,and“也” connect with another phrase. If related to different aspect , “ 也 ” should come after the second aspect. A：你為甚麼想學中文？ B：學中文不但很有意思，也比較容易找工作。",
     "examples": [
      {
       "hz": "A：我的頭好疼啊！ B：你最好去看醫生，聽聽醫生怎麼說。",
       "vi": "A: Đầu tôi đau quá! B: Tốt nhất bạn nên đi khám bác sĩ, nghe xem bác sĩ nói gì.",
       "py": "A: Wǒ de tóu hǎo téng a! B: Nǐ zuìhǎo qù kàn yīshēng, tīngtīng yīshēng zěnme shuō."
      },
      {
       "hz": "A：下個禮拜五就要考試了。 B：對啊！我們最好每天下了課就去圖書館念書。",
       "vi": "A: Thứ Sáu tuần sau là thi rồi. B: Đúng vậy! Tốt nhất ngày nào tan học chúng ta cũng đến thư viện học bài.",
       "py": "A: Xià gè lǐbàiwǔ jiùyào kǎoshì le. B: Duì a! Wǒmen zuìhǎo měitiān xià le kè jiù qù túshūguǎn niànshū."
      },
      {
       "hz": "妹妹：我昨天認識了一個男生，他說這個週末要跟我約會。姐姐：你最好不要一個人去。",
       "vi": "Em gái: Hôm qua em quen một bạn nam, anh ấy nói cuối tuần này muốn hẹn hò với em. Chị gái: Tốt nhất em đừng đi một mình.",
       "py": "Mèimei: Wǒ zuótiān rènshì le yígè nánshēng, tā shuō zhège zhōumò yào gēn wǒ yuēhuì. Jiějie: Nǐ zuìhǎo búyào yígè rén qù."
      },
      {
       "hz": "A：我覺得非常不舒服，好像發燒了。(在家休息)2.A：我今天上課遲到了，老師有一點兒不高興。",
       "vi": "A: Tôi thấy rất khó chịu, hình như bị sốt rồi. (ở nhà nghỉ ngơi) A: Hôm nay tôi đi học muộn, thầy giáo hơi không vui.",
       "py": "A: Wǒ juéde fēicháng bù shūfú, hǎoxiàng fāshāo le. (zàijiā xiūxí) 2. A: Wǒ jīntiān shàngkè chídào le, lǎoshī yǒu yìdiǎn'ér bù gāoxìng."
      },
      {
       "hz": "A：今年我想到台北101去跨年。",
       "vi": "A: Năm nay tôi muốn đến Taipei 101 đón năm mới.",
       "py": "A: Jīnnián wǒ xiǎngdào Táiběi 101 qù kuà nián."
      },
      {
       "hz": "A：這家餐廳的菜都很好吃，你想吃什麼？ B：我不但想吃小籠包，也想吃牛肉麵。",
       "vi": "A: Món ăn nhà hàng này đều rất ngon, bạn muốn ăn gì? B: Tôi không những muốn ăn bánh bao nhỏ mà còn muốn ăn mì bò.",
       "py": "A: Zhèjiā cāntīng de cài dōu hěn hǎochī, nǐ xiǎng chī shénme? B: Wǒ búdàn xiǎng chī xiǎolóngbāo, yě xiǎng chī niúròumiàn."
      },
      {
       "hz": "A：你為什麼來台灣旅行？ B：因為台灣不但風景美，交通也很方便。",
       "vi": "A: Sao bạn đến Đài Loan du lịch? B: Vì Đài Loan không những phong cảnh đẹp mà giao thông cũng rất tiện.",
       "py": "A: Nǐ wèishénme lái Táiwān lǚxíng? B: Yīnwèi Táiwān búdàn fēngjǐng měi, jiāotōng yě hěn fāngbiàn."
      },
      {
       "hz": "A：為什麼你最近這麼忙？",
       "vi": "A: Sao dạo này bạn bận thế?",
       "py": "A: Wèishénme nǐ zuìjìn zhème máng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "最好 + cụm động từ — tốt nhất là…",
   "giaiThich": "Dùng để khuyên ai đó nên làm gì (\"tốt nhất là…\"). Bài này cũng luyện mẫu 不但……也…… nối hai vế cùng đúng một lúc."
  },
  {
   "title": "IV. V 完 completion of action with V 完",
   "points": [
    {
     "label": null,
     "formula": "The expression indicates that an action is finished. The “完”,serving as a verb complement , means  \t“done” or “finished”.",
     "examples": [
      {
       "hz": "今天的作業不多，我很快就寫完了。2. 可欣：跨年演唱會的票賣完了嗎？美心：聽說上個星期就賣完了。3. 可欣：你上個禮拜買的那本書看完了嗎？美心：這個禮拜我很忙，還沒看完。",
       "vi": "Bài tập hôm nay không nhiều, tôi viết xong rất nhanh. Khả Hân: Vé hoà nhạc đón năm mới bán hết chưa? Mỹ Tâm: Nghe nói tuần trước đã bán hết rồi. Khả Hân: Quyển sách bạn mua tuần trước đọc xong chưa? Mỹ Tâm: Tuần này tôi bận lắm, vẫn chưa đọc xong.",
       "py": "Jīntiān de zuòyè bù duō, wǒ hěnkuài jiù xiě wán le. 2. Kěxīn: Kuà nián yǎnchànghuì de piào màiwán le ma? Měixīn: Tīngshuō shànggèxīngqí jiù màiwán le. 3. Kěxīn: Nǐ shàng gè lǐbài mǎi de nàběnshū kàn wán le ma? Měixīn: Zhège lǐbài wǒ hěn máng, hái méi kàn wán."
      },
      {
       "hz": "先生：我現在要去超級市場買東西，要買牛奶嗎?",
       "vi": "Chồng: Bây giờ anh đi siêu thị mua đồ, có cần mua sữa không?",
       "py": "Xiānshēng: Wǒ xiànzài yào qù chāojíshìchǎng mǎi dōngxī, yào mǎi niúnǎi ma?"
      },
      {
       "hz": "良介在日本的時候，是一個怎麼樣的人？來台灣以後呢？",
       "vi": "Hồi ở Nhật, Ryosuke là người thế nào? Sau khi đến Đài Loan thì sao?",
       "py": "Liángjiè zài Rìběn de shíhòu, shì yígè zěnmeyàng de rén? Lái Táiwān yǐhòu ne?"
      },
      {
       "hz": "良介覺得在台灣生活怎麼樣，為什麼？",
       "vi": "Ryosuke thấy cuộc sống ở Đài Loan thế nào, tại sao?",
       "py": "Liángjiè juéde zài Táiwān shēnghuó zěnmeyàng, wèishénme?"
      },
      {
       "hz": "那個女生為什麼不敢跟良介見面？",
       "vi": "Tại sao cô gái đó không dám gặp Ryosuke?",
       "py": "Nàge nǚshēng wèishénme bùgǎn gēn Liángjiè jiànmiàn?"
      },
      {
       "hz": "良介後來怎麼跟這個女生見面？良介的心為什麼跳得很快？",
       "vi": "Sau đó Ryosuke gặp cô gái này bằng cách nào? Tại sao tim Ryosuke đập nhanh?",
       "py": "Liángjiè hòulái zěnme gēn zhège nǚshēng jiànmiàn? Liángjiè de xīn wèishénme tiào de hěnkuài?"
      },
      {
       "hz": "良介為什麼很想再跟她約會？他們做了什麼事？",
       "vi": "Tại sao Ryosuke rất muốn hẹn hò với cô ấy lần nữa? Họ đã làm những gì?",
       "py": "Liángjiè wèishénme hěn xiǎng zài gēn tā yuēhuì? Tāmen zuò le shénme shì?"
      },
      {
       "hz": "良介拉了那個女生的手嗎？為什麼？",
       "vi": "Ryosuke có nắm tay cô gái đó không? Tại sao?",
       "py": "Liángjiè lā le nàge nǚshēng de shǒu ma? Wèishénme?"
      },
      {
       "hz": "良介雖然是外國人，可是那個女生覺得良介怎麼樣？",
       "vi": "Dù Ryosuke là người nước ngoài, cô gái đó thấy Ryosuke thế nào?",
       "py": "Liángjiè suīrán shì wàiguórén, kěshì nàge nǚshēng juéde Liángjiè zěnmeyàng?"
      },
      {
       "hz": "良介後來還跟那個女生在一起嗎？你怎麼知道？",
       "vi": "Sau này Ryosuke còn ở bên cô gái đó không? Làm sao bạn biết?",
       "py": "Liángjiè hòulái hái gēn nàge nǚshēng zài yìqǐ ma? Nǐ zěnme zhīdào?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 完 — làm xong",
   "giaiThich": "完 làm bổ ngữ đứng sau động từ, chỉ hành động đã kết thúc, đã xong."
  },
  {
   "title": "I. V在 resultant location with V 在",
   "points": [
    {
     "label": null,
     "formula": "The structure of the pattern is ”V在+Location” .The verbs often placed before “在” include “住(live)” , “坐(sit)”  and  “站(stand)”. “給”functions as a preposition that comes after a verb,shows the direction,and marks the recipient of an action. The “(一)邊……(，)(一)邊……”pattern implies that the two actions coming after each “一邊”happen at the same time or at the same place. This pattern is mostly used in modifying concrete action verbs and it can be used in sentences with only one subject or in complex sentences with two subjects,eg.”他一邊唱，我一邊跳。If “一”is omitted,there should be only one subject in the sentence,eg. “他邊唱邊跳。” 1. 可欣：中文不太容易學，你為甚麼想學?   良介：雖然不容易，可是我覺得很有意思。2. A：他很聰明，為什麼考試常常考得不好?   B：雖然他很聰明，可是不喜歡讀書，所以考得不好。3. A：你生病了，今天還要去上班嗎?   B：雖然不舒服，可是今天公司有很重要的事，一定要去。 This pattern implies that the speaker agrees to the information coming after”雖然” but the information coming after This particle “呢”,often placed at the end of a sentence , is used to emphasize that the foregoing action or fact is based on the speaker’s personal opinion. It shows a tone of politeness . The”呢”used here is different from that used in an interrogative sentence. 畫一個你喜歡的人的樣子，然後用你學過的中文去介紹這個人的樣子和這個人的個性。最後，全班選出誰介紹的畫最有意思。",
     "examples": [
      {
       "hz": "爸爸忘了他的手機放在哪裡了。",
       "vi": "Bố quên mất đã để điện thoại ở đâu.",
       "py": "Bàba wàng le tā de shǒujī fàngzài nǎlǐ le."
      },
      {
       "hz": "你不要站在那麼高的地方，很危險!",
       "vi": "Đừng đứng ở chỗ cao như vậy, nguy hiểm lắm!",
       "py": "Nǐ búyào zhàn zài nàme gāo de dìfāng, hěn wéixiǎn!"
      },
      {
       "hz": "我住在捷運站附近，走路五分鐘就到了",
       "vi": "Tôi sống gần ga tàu điện ngầm, đi bộ năm phút là đến.",
       "py": "Wǒ zhù zài jiéyùn zhàn fùjìn, zǒulù wǔfēnzhōng jiù dào le"
      },
      {
       "hz": "那些書，我送給朋友了。",
       "vi": "Những quyển sách đó tôi đã tặng cho bạn rồi.",
       "py": "Nàxiē shū, wǒ sònggěi péngyǒu le."
      },
      {
       "hz": "王先生的舊車賣給張小姐了。",
       "vi": "Chiếc xe cũ của anh Vương đã bán cho cô Trương rồi.",
       "py": "Wáng xiānshēng de jiùchē mài gěi Zhāng xiǎojiě le."
      },
      {
       "hz": "我拿著電話，可是忘了要打給誰了。",
       "vi": "Tôi cầm điện thoại, nhưng quên mất định gọi cho ai.",
       "py": "Wǒ ná zhe diànhuà, kěshì wàng le yào dǎ gěi shéi le."
      },
      {
       "hz": "桌上的水果，你拿給誰吃了?",
       "vi": "Trái cây trên bàn, bạn mang cho ai ăn rồi?",
       "py": "Zhuōshàng de shuǐguǒ, nǐ nágěi shéi chī le?"
      },
      {
       "hz": "我沒聽過十二生肖的故事，你可以說給我聽嗎?",
       "vi": "Tôi chưa từng nghe chuyện mười hai con giáp, bạn kể cho tôi nghe được không?",
       "py": "Wǒ méi tīng guò shí'èrshēngxiào de gùshì, nǐ kěyǐ shuō gěi wǒ tīng ma?"
      },
      {
       "hz": "·送給 ·賣給 ·寫給 ·拿給 ·帶給 ·寄給",
       "vi": "· tặng cho · bán cho · viết cho · đưa cho · mang cho · gửi cho",
       "py": "· sònggěi · mài gěi · xiěgěi · nágěi · dàigěi · jìgěi"
      },
      {
       "hz": "有人(一)邊走路(一)邊玩手機，真危險。",
       "vi": "Có người vừa đi bộ vừa chơi điện thoại, thật nguy hiểm.",
       "py": "Yǒurén (yì) biān zǒulù (yì) biānwán shǒujī, zhēn wéixiǎn."
      },
      {
       "hz": "很多學生喜歡(一)邊聽音樂，(一)邊念書。",
       "vi": "Nhiều học sinh thích vừa nghe nhạc vừa học bài.",
       "py": "Hěnduō xuéshēng xǐhuān (yì) biān tīng yīnyuè, (yì) biān niànshū."
      },
      {
       "hz": "上課的時候，老師一邊說，學生一邊寫。",
       "vi": "Trong giờ học, thầy giáo vừa nói, học sinh vừa ghi.",
       "py": "Shàngkè de shíhòu, lǎoshī yìbiān shuō, xuéshēng yìbiān xiě."
      },
      {
       "hz": "A：那件裙子非常貴，你還要買嗎?",
       "vi": "A: Chiếc váy đó cực kỳ đắt, bạn vẫn muốn mua à?",
       "py": "A: Nà jiàn qúnzi fēicháng guì, nǐ háiyào mǎi ma?"
      },
      {
       "hz": "A：你為什麼住在這麼小的房子?",
       "vi": "A: Sao bạn lại sống trong căn nhà nhỏ thế này?",
       "py": "A: Nǐ wèishénme zhù zài zhème xiǎo de fángzi?"
      },
      {
       "hz": "A：你玩遊戲常常輸，為什麼還要玩?",
       "vi": "A: Bạn chơi game hay thua, sao vẫn muốn chơi?",
       "py": "A: Nǐ wányóuxì chángcháng shū, wèishénme háiyào wán?"
      },
      {
       "hz": "A：他家離你家很遠嗎? B：不，他家離我家很近呢!2. A：我覺得那個電影很難看。 B：可是我覺得很好看，想再看一次呢!3. 爸爸：孩子又出去玩了嗎? 媽媽：他沒出去玩，他一直在房間讀書呢!",
       "vi": "A: Nhà anh ấy cách nhà bạn xa lắm à? B: Không, nhà anh ấy gần nhà tôi lắm! A: Tôi thấy bộ phim đó dở lắm. B: Nhưng tôi thấy hay lắm, còn muốn xem lại lần nữa! Bố: Con lại ra ngoài chơi rồi à? Mẹ: Con không đi chơi, nó ở trong phòng học bài suốt đấy!",
       "py": "A: Tājiā lí nǐjiā hěn yuǎn ma? B: Bù, tājiā lí wǒjiā hěn jìn ne! 2. A: Wǒ juéde nàge diànyǐng hěn nánkàn. B: Kěshì wǒ juéde hěn hǎokàn, xiǎng zài kàn yícì ne! 3. Bàba: Háizi yòu chūqùwán le ma? Māma: Tā méi chūqùwán, tā yìzhí zài fángjiān dúshū ne!"
      },
      {
       "hz": "A：良介在做什麼?我有事情想問他。",
       "vi": "A: Ryosuke đang làm gì vậy? Tôi có việc muốn hỏi cậu ấy.",
       "py": "A: Liángjiè zài zuò shénme? Wǒ yǒu shìqíng xiǎng wèn tā."
      },
      {
       "hz": "妹妹：這個週末妳要不要跟我去博物館?",
       "vi": "Em gái: Cuối tuần này chị có muốn đi bảo tàng với em không?",
       "py": "Mèimei: Zhège zhōumò nǐ yào búyào gēn wǒ qù bówùguǎn?"
      },
      {
       "hz": "A：為什麼你每天都喝珍珠奶茶?",
       "vi": "A: Sao ngày nào bạn cũng uống trà sữa trân châu?",
       "py": "A: Wèishénme nǐ měitiān dōu hē zhēnzhūnǎichá?"
      },
      {
       "hz": "把卡片的正、反面寫好以後，放在一起，然後老師拿一張，念卡片前面的內容，請學生想這張卡片是誰的。",
       "vi": "Viết xong mặt trước và mặt sau của tấm thẻ thì gom lại, sau đó thầy giáo rút một tấm, đọc nội dung mặt trước, cho học sinh đoán tấm thẻ đó của ai.",
       "py": "Bǎ kǎpiàn de zhèng, fǎnmiàn xiě hǎo yǐhòu, fàngzài yìqǐ, ránhòu lǎoshī ná yìzhāng, niàn kǎpiàn qiánmiàn de nèiróng, qǐng xuéshēng xiǎng zhè zhāng kǎpiàn shì shéi de."
      },
      {
       "hz": "不喜歡做什麼",
       "vi": "Không thích làm gì",
       "py": "Bù xǐhuān zuò shénme"
      },
      {
       "hz": "你喜歡怎麼樣的人？",
       "vi": "Bạn thích người như thế nào?",
       "py": "Nǐ xǐhuān zěnmeyàng de rén?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 在 — vị trí sau hành động",
   "giaiThich": "Mẫu \"động từ + 在 + nơi chốn\" cho biết kết quả của hành động ở đâu. Động từ hay dùng: 住 (ở), 坐 (ngồi), 站 (đứng). Bài cũng có 給 làm giới từ đứng sau động từ, chỉ người nhận."
  }
 ],
 "td2-2.1": [
  {
   "title": "2. 我買的/把/誰/吃了/蛋糕",
   "points": [
    {
     "label": null,
     "formula": "This grammar denotes that the action of the verb is over. The “完” after the verb, used as the V complement, means to end or to finish. Pay attention to the usage of “完”.This lesson uses the complement structure to describe the end of the action instead ofusing the word “完” alone. For example, the meaning of “我完了。(I’m finished.) ”is completely different from the V 完 pattern. disposal construction 把 with resultative complement 完 請用提示完成對話。Complete the dialogues with the given words. The “V 一 V” pattern softens the tone and makes an action simple and clear. When used together with “把 construction”, it gives requests or orders in a gentler tone. However, the verb used in this pattern has to be monosyllabic. disposal construction 把 with verb reduplication 請用提示完成句子。Complete the sentences with the given words. “給” is a preposition that indicates the direction of action and marks the recipient of the Direct Object. It can collocate with verbs “拿 (to take) ”, “送 (to give) ”, “賣 (to sell) ”, “寄 (to send) ”, “踢 (to kick) ”, etc. It can also be used in 把 construction, such disposal construction 把 with preposition 給 This pattern contains “Question Word 多+Vs (as predicate)” to inquire the degree achieved. In this pattern, “有” is frequently omitted. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "把/電腦/我/舊的/賣了3. 把/小說/不要的/丟了/我/昨天",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diànnǎo / wǒ / jiù de / mài le 3. Bǎ / xiǎoshuō / búyào de / diū le / wǒ / zuótiān"
      },
      {
       "hz": "媽媽把家事做完以後，就休息了。2. 因為你沒把工作做完，所以老闆不太高興。3. 請你先聽我把話說完，你再說，好嗎?",
       "vi": "Mẹ làm xong việc nhà là nghỉ ngơi. Vì bạn chưa làm xong công việc nên ông chủ không vui lắm. Bạn hãy nghe tôi nói hết đã rồi hãy nói, được không?",
       "py": "Māma bǎ jiāshì zuò wán yǐhòu, jiù xiūxí le. 2. Yīnwèi nǐ méi bǎ gōngzuò zuò wán, suǒyǐ lǎobǎn bú tàigāoxìng. 3. Qǐng nǐ xiān tīng wǒ bǎ huà shuōwán, nǐ zàishuō, hǎo ma?"
      },
      {
       "hz": "A:你什麼時候來我家？ (書法)2. 太太:碗筷、刀叉,你都洗了嗎？ (報紙)孩子:可是我現在就想看！",
       "vi": "A: Khi nào bạn đến nhà tôi? (thư pháp) Vợ: Bát đũa, dao nĩa, con rửa hết chưa? (báo) Con: Nhưng con muốn xem ngay bây giờ!",
       "py": "A: Nǐ shénme shíhòu lái wǒjiā? (shūfǎ) 2. Tàitai: Wǎnkuài, dāochā, nǐ dōu xǐ le ma? (bàozhǐ) háizi: Kěshì wǒ xiànzài jiù xiǎng kàn!"
      },
      {
       "hz": "你沒把蘋果洗一洗就吃了，如果肚子疼怎麼辦？\t2.下課以後，我先把教室裡的桌子、椅子排一排再回家。\t3. 太太:我覺得頭很疼，你可以幫我做家事嗎？先生:沒問題！我先把地掃一掃，等孩子回來以後，再把他們的髒衣服洗一洗。",
       "vi": "Bạn chưa rửa táo đã ăn, nếu đau bụng thì làm sao? Tan học xong, tôi sắp xếp lại bàn ghế trong lớp rồi mới về nhà. Vợ: Em thấy đau đầu quá, anh làm việc nhà giúp em được không? Chồng: Không vấn đề gì! Anh quét nhà trước, đợi bọn trẻ về rồi giặt quần áo bẩn cho chúng.",
       "py": "Nǐ méi bǎ píngguǒ xǐ yì xǐ jiù chī le, rúguǒ dùziténg zěnmebàn? 2. Xiàkè yǐhòu, wǒ xiān bǎ jiàoshì lǐ de zhuōzi, yǐzi pái yìpái zài huíjiā. 3. Tàitai: Wǒ juéde tóu hěn téng, nǐ kěyǐ bāng wǒ zuò jiāshì ma? Xiānshēng: Méi wèntí! Wǒ xiān bǎ dì sǎo yì sǎo, děng háizi huílái yǐhòu, zài bǎ tāmen de zàng yīfú xǐ yì xǐ."
      },
      {
       "hz": "孩子:我晚一點兒再擦,現在要跟朋友去看球賽呢!",
       "vi": "Con: Lát nữa con lau, bây giờ con đi xem đá bóng với bạn!",
       "py": "Háizi: Wǒ wǎn yìdiǎn'ér zài cā, xiànzài yào gēn péngyǒu qù kànqiúsài ne!"
      },
      {
       "hz": "我昨天把那些小說送給朋友了。2. 王先生為什麼不想把舊車賣給你?3. A:你昨天為什麼沒把感冒藥拿給孩子吃? B:醫生說那個藥是給大人吃的,不可以給小孩吃。",
       "vi": "Hôm qua tôi đã tặng những quyển tiểu thuyết đó cho bạn. Tại sao anh Vương không muốn bán xe cũ cho bạn? A: Sao hôm qua bạn không đưa thuốc cảm cho con uống? B: Bác sĩ nói thuốc đó dành cho người lớn, không được cho trẻ con uống.",
       "py": "Wǒ zuótiān bǎ nàxiē xiǎoshuō sònggěi péngyǒu le. 2. Wáng xiānshēng wèishénme bùxiǎng bǎ jiùchē mài gěi nǐ? 3. A: Nǐ zuótiān wèishénme méi bǎ gǎnmàoyào nágěi háizi chī? B: Yīshēng shuō nàge yào shì gěi dàrén chī de, bù kěyǐ gěi xiǎohái chī."
      },
      {
       "hz": "as “我把你做的蛋糕送給朋友了。”.",
       "vi": "Ví dụ: “Tôi đã tặng bánh kem bạn làm cho bạn tôi rồi.”",
       "py": "As “wǒ bǎ nǐ zuò de dàngāo sònggěi péngyǒu le.”."
      },
      {
       "hz": "我/把/就/禮物/昨天/送給/了/張小姐。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Wǒ / bǎ / jiù / lǐwù / zuótiān / sònggěi / le / Zhāng xiǎojiě."
      },
      {
       "hz": "把/沒/哥哥/媽媽/寄給/是不是/生日卡片？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / méi / gēge / māma / jìgěi / shìbúshì / shēngrì kǎpiàn?"
      },
      {
       "hz": "你/把/我/聽/嗎/可以/那首/唱給/中文歌？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Nǐ / bǎ / wǒ / tīng / ma / kěyǐ / nà shǒu / chàng gěi / zhōngwén gē?"
      },
      {
       "hz": "A:你家離學校(有)多遠？ B:我家離學校很遠,走路差不多要五十分鐘。2. A:那張桌子(有)多長？ B:那張桌子(有)八十公分。3. A:你知道合歡山(有)多高嗎？ B:差不多三千五百公尺。",
       "vi": "A: Nhà bạn cách trường bao xa? B: Nhà tôi cách trường rất xa, đi bộ mất khoảng năm mươi phút. A: Cái bàn đó dài bao nhiêu? B: Cái bàn đó dài tám mươi phân. A: Bạn có biết núi Hợp Hoan cao bao nhiêu không? B: Khoảng ba nghìn năm trăm mét.",
       "py": "A: Nǐjiā lí xuéxiào (yǒu) duō yuǎn? B: Wǒjiā lí xuéxiào hěn yuǎn, zǒulù chàbuduō yào wǔshífēnzhōng. 2. A: Nà zhāng zhuōzi (yǒu) duōzhǎng? B: Nà zhāng zhuōzi (yǒu) bā shígōngfēn. 3. A: Nǐ zhīdào héhuānshān (yǒu) duō gāo ma? B: Chàbuduō sānqiānwǔbǎi gōngchǐ."
      },
      {
       "hz": "B：我妹妹今年十八歲。",
       "vi": "B: Năm nay em gái tôi mười tám tuổi.",
       "py": "B: Wǒ mèimei jīnnián shíbāsuì."
      },
      {
       "hz": "B：一張(要)八千元。",
       "vi": "B: Một vé tám nghìn đồng.",
       "py": "B: Yīzhāng (yào) bāqiānyuán."
      },
      {
       "hz": "B：我現在七十五公斤了。",
       "vi": "B: Bây giờ tôi nặng bảy mươi lăm cân rồi.",
       "py": "B: Wǒ xiànzài qīshíwǔ gōngjīn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 把 và V 完",
   "giaiThich": "Phần luyện tập: sắp xếp câu có 把; chú ý bổ ngữ 完 (làm xong) đứng sau động từ."
  },
  {
   "title": "III. Time-duration 沒V(O)了/time-duration 不V(O)",
   "points": [
    {
     "label": null,
     "formula": "Didn’t do something for a period of time This pattern, always including a negation word “不” or “沒,” indicates the time duration of a certain situation in which an action has yet to happen.",
     "examples": [
      {
       "hz": "我已經兩天沒睡覺了,真累!2. 你想，如果山本良介半年不說中文，他還記得怎麼說嗎?3. A:他的房間有老鼠！ B:真的嗎？他多久沒打掃了？",
       "vi": "Tôi đã hai ngày không ngủ rồi, mệt thật! Bạn thử nghĩ xem, nếu Yamamoto Ryosuke nửa năm không nói tiếng Trung, cậu ấy còn nhớ cách nói không? A: Phòng anh ấy có chuột! B: Thật à? Bao lâu rồi anh ấy không dọn dẹp?",
       "py": "Wǒ yǐjīng liǎngtiān méi shuìjiào le, zhēnlèi! 2. Nǐ xiǎng, rúguǒ shānběn Liángjiè bànnián bù shuō zhōngwén, tā hái jìde zěnme shuō ma? 3. A: Tā de fángjiān yǒu lǎoshǔ! B: Zhēnde ma? Tā duōjiǔ méi dǎsǎo le?"
      },
      {
       "hz": "A：林先生非常不喜歡說話。",
       "vi": "A: Anh Lâm rất không thích nói chuyện.",
       "py": "A: Lín xiānshēng fēicháng bù xǐhuān shuōhuà."
      },
      {
       "hz": "A：為什麼你今天一定要去運動？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi tập thể dục?",
       "py": "A: Wèishénme nǐ jīntiān yídìng yào qù yùndòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bao lâu rồi không làm gì",
   "giaiThich": "Mẫu có 不 hoặc 沒, nêu khoảng thời gian một việc CHƯA xảy ra (\"bao lâu rồi chưa…\")."
  },
  {
   "title": "IV. QW+都/也 all-inclusive with question words+都/也",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, question words may co-occur with “都”or “也”in declarative sentences to indicate entirety. That is, in affirmative sentences, this pattern indicates total inclusion, while in negative ones, it indicates total exclusion.",
     "examples": [
      {
       "hz": "錢先生哪國語言都會說。2. 我不舒服,什麼都不想吃。3. 我剛剛到台灣,誰也不認識。4. 中國菜很有名,哪裡都有中國餐廳。5. 這個字很難,我怎麼寫都不對。",
       "vi": "Anh Tiền nói được tiếng của nước nào cũng được. Tôi khó chịu, không muốn ăn gì cả. Tôi mới đến Đài Loan, không quen ai cả. Món ăn Trung Hoa rất nổi tiếng, ở đâu cũng có nhà hàng Trung Hoa. Chữ này khó quá, tôi viết thế nào cũng sai.",
       "py": "Qián xiānshēng nǎ guó yǔyán dōu huì shuō. 2. Wǒ bù shūfú, shénme dōu bùxiǎng chī. 3. Wǒ gānggāng dào Táiwān, shéi yě bú rènshì. 4. Zhōngguó cài hěn yǒumíng, nǎlǐ dōu yǒu Zhōngguó cāntīng. 5. Zhège zì hěn nán, wǒ zěnme xiě dōu bú duì."
      },
      {
       "hz": "A：我們什麼時候去看電影？",
       "vi": "A: Khi nào chúng ta đi xem phim?",
       "py": "A: Wǒmen shénme shíhòu qù kàn diànyǐng?"
      },
      {
       "hz": "A：你覺得我穿哪一件衣服好看？",
       "vi": "A: Bạn thấy tôi mặc bộ nào đẹp?",
       "py": "A: Nǐ juéde wǒ chuān nǎ yíjiàn yīfú hǎokàn?"
      },
      {
       "hz": "A：放暑假的時候，你想去哪裡玩？",
       "vi": "A: Nghỉ hè bạn muốn đi chơi đâu?",
       "py": "A: Fàngshǔjià de shíhòu, nǐ xiǎng qù nǎlǐ wán?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi + 都 / 也 — bao gồm tất cả",
   "giaiThich": "Từ để hỏi (誰, 什麼, 哪裡…) đi với 都 hoặc 也 trong câu trần thuật mang nghĩa \"ai/gì/đâu cũng…\"; câu phủ định thì thành \"chẳng ai/gì/đâu…\"."
  },
  {
   "title": "V. 又 again",
   "points": [
    {
     "label": null,
     "formula": "“又” means the repetition of the same action or the reappearance of similar situation.“再” and “又” both mean repetition. However, “再” emphasizes the intention to repeat certain actions, so it can be used in imperative sentences and placed after modal verbs, e.g., “請再說一次” (Please say it again.) and “我想再喝一杯”. (I’d  like to have another drink.) “又” is used after certain actions or showing the intention of performing the action. “又” mostly collocates with “了” or “沒” and is placed before the modal verbs. e.g., “我又說了一次” (I said that again.) and “我又想喝了”(I wanted to drink again.)",
     "examples": [
      {
       "hz": "他剛剛吃了一碗牛肉麵和三個包子，現在又餓了。2. 金先生上個月買的書都看完了，今天又要去買書了。3. 他去美國旅行了兩個星期以後，又去越南玩了五天。",
       "vi": "Anh ấy vừa ăn một bát mì bò và ba cái bánh bao, bây giờ lại đói rồi. Sách anh Kim mua tháng trước đã đọc hết, hôm nay lại muốn đi mua sách nữa. Sau khi đi Mỹ du lịch hai tuần, anh ấy lại sang Việt Nam chơi năm ngày.",
       "py": "Tā gānggāng chī le yìwǎn niúròumiàn hàn sāngè bāozi, xiànzài yòu è le. 2. Jīn xiānshēng shànggèyuè mǎi de shū dōu kàn wán le, jīntiān yòu yào qù mǎi shū le. 3. Tā qù Měiguó lǚxíng le liǎnggè xīngqí yǐhòu, yòu qù Yuènán wán le wǔtiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "又 — lại (lần nữa)",
   "giaiThich": "又 chỉ việc lặp lại đã XẢY RA. Phân biệt với 再: 再 nói về ý định lặp lại trong tương lai."
  },
  {
   "title": "VI. Time + 才 +V longer/later than expected with 才",
   "points": [
    {
     "label": null,
     "formula": "“才” implies that an action happened or will happen later than expected. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "我昨天太累了，所以今天早上十一點才起來。2. A：你是上個月從英國到台灣的嗎？ B：不是，我是昨天才到的。3. A：我們什麼時候要考試？我還沒準備，怎麼辦？ B：我們下個禮拜才考，你還有時間準備。",
       "vi": "Hôm qua tôi mệt quá, nên sáng nay mười một giờ mới dậy. A: Bạn từ Anh sang Đài Loan hồi tháng trước à? B: Không, hôm qua tôi mới đến. A: Khi nào chúng ta thi? Tôi vẫn chưa ôn, làm sao đây? B: Tuần sau chúng ta mới thi, bạn vẫn còn thời gian ôn.",
       "py": "Wǒ zuótiān tài lèi le, suǒyǐ jīntiān zǎoshàng shíyìdiǎn cái qǐlái. 2. A: Nǐ shì shànggèyuè cóng Yīngguó dào Táiwān de ma? B: Búshì, wǒ shì zuótiān cái dào de. 3. A: Wǒmen shénme shíhòu yào kǎoshì? Wǒ hái méi zhǔnbèi, zěnmebàn? B: Wǒmen xià gè lǐbài cái kǎo, nǐ háiyǒu shíjiān zhǔnbèi."
      },
      {
       "hz": "A：聽說你這個週末要去日本？(下個週末)2. A：趕快起來！你早上八點有中文課！(早上十點)3. A：你明天晚上要不要跟我一起去看籃球比賽？(後天)",
       "vi": "A: Nghe nói cuối tuần này bạn đi Nhật à? (cuối tuần sau) A: Mau dậy đi! Tám giờ sáng con có tiết tiếng Trung! (mười giờ sáng) A: Tối mai bạn có muốn đi xem bóng rổ với tôi không? (ngày kia)",
       "py": "A: Tīngshuō nǐ zhège zhōumò yào qù Rìběn? (xià gè zhōumò) 2. A: Gǎnkuài qǐlái! Nǐ zǎoshàng bādiǎn yǒu zhōngwén kè! (zǎoshàng shídiǎn) 3. A: Nǐ míngtiān wǎnshàng yào búyào gēn wǒ yìqǐ qù kàn lánqiúbǐsài? (hòutiān)"
      },
      {
       "hz": "良介在哪些地方看見垃圾？",
       "vi": "Ryosuke thấy rác ở những chỗ nào?",
       "py": "Liángjiè zài nǎxiēdìfāng kànjiàn lèsè?"
      },
      {
       "hz": "良介為什麼沒把垃圾丟了？",
       "vi": "Tại sao Ryosuke không vứt rác đi?",
       "py": "Liángjiè wèishénme méi bǎ lèsè diū le?"
      },
      {
       "hz": "為什麼宿舍的空氣不好？",
       "vi": "Tại sao không khí trong ký túc xá không tốt?",
       "py": "Wèishénme sùshè de kōngqì bùhǎo?"
      },
      {
       "hz": "在良介家，良介應該做哪些家事？為什麼？",
       "vi": "Ở nhà Ryosuke, Ryosuke nên làm những việc nhà nào? Tại sao?",
       "py": "Zài Liángjiè jiā, Liángjiè yīnggāi zuò nǎxiē jiāshì? Wèishénme?"
      },
      {
       "hz": "良介覺得打掃是誰的事？為什麼？",
       "vi": "Ryosuke nghĩ dọn dẹp là việc của ai? Tại sao?",
       "py": "Liángjiè juéde dǎsǎo shì shéi de shì? Wèishénme?"
      },
      {
       "hz": "你覺得那個地方以後會怎麼樣？為什麼？",
       "vi": "Bạn nghĩ sau này nơi đó sẽ thế nào? Tại sao?",
       "py": "Nǐ juéde nàge dìfāng yǐhòu huì zěnmeyàng? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mãi mới, muộn hơn dự tính",
   "giaiThich": "才 cho biết việc xảy ra MUỘN hơn mong đợi (\"mãi tới… mới…\")."
  },
  {
   "title": "I. S (+Neg)+把+N+V在/V到…",
   "points": [
    {
     "label": null,
     "formula": "disposal construction 把 with V 在 and V 到 patterns This pattern is the combination of “S (+Neg)+把+ N+ V+ Complement” (see the first grammar after the dialogue in this lesson) and “V在” (see the first grammar after the text in Lesson One) and “V到”. It indicates the location or place of the Object after 請用提示完成對話。Complete the dialogues with given words. II. …，才… condition and consequence with 才 In this pattern, the adverb “才”in the second clause is used to show consequences when the conditions and causes in the first clause are fulfilled. Thus,”得(have to)”, “要(need to )”, “為了(In order to )”,and “因為” (because)” are often used in the first clause of this pattern. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "孩子把髒衣服丟在浴室裡。2. 你怎麼沒把地址寫在信封上呢?3. 我覺得把錢放在銀行比放在家裡安全得多。4. 媽媽把蛋糕拿到廚房的桌子上。5. 你不可以把球踢到馬路上,太危險了。6. 李小姐把生日卡片寄到男朋友家。",
       "vi": "Đứa bé vứt quần áo bẩn trong phòng tắm. Sao bạn không viết địa chỉ lên phong bì? Tôi thấy để tiền trong ngân hàng an toàn hơn để ở nhà nhiều. Mẹ mang bánh kem đến bàn trong bếp. Bạn không được đá bóng ra đường, nguy hiểm lắm. Cô Lý gửi thiệp sinh nhật đến nhà bạn trai.",
       "py": "Háizi bǎ zàng yīfú diū zài yùshì lǐ. 2. Nǐ zěnme méi bǎ dìzhǐ xiě zài xìnfēng shàng ne? 3. Wǒ juéde bǎ qián fàngzài yínháng bǐ fàngzài jiālǐ ānquán de duō. 4. Māma bǎ dàngāo nádào chúfáng de zhuōzi shàng. 5. Nǐ bù kěyǐ bǎ qiú tī dào mǎlùshàng, tài wéixiǎn le. 6. Lǐ xiǎojiě bǎ shēngrì kǎpiàn jì dào nánpéngyǒu jiā."
      },
      {
       "hz": "他昨天是因為生病才沒來上課的。2. 你最好再穿一件衣服，才不會覺得冷。3. 你得每天練習寫字，字才能寫得好看。",
       "vi": "Hôm qua anh ấy nghỉ học là vì bị ốm. Tốt nhất bạn nên mặc thêm một chiếc áo thì mới không thấy lạnh. Bạn phải luyện viết chữ mỗi ngày thì chữ mới đẹp được.",
       "py": "Tā zuótiān shìyīnwèi shēngbìng cái méi lái shàngkè de. 2. Nǐ zuìhǎo zài chuān yíjiàn yīfú, cái búhuì juéde lěng. 3. Nǐ děi měitiān liànxí xiězì, zì cáinéng xiě de hǎokàn."
      },
      {
       "hz": "誰做家事？",
       "vi": "Ai làm việc nhà?",
       "py": "Shéi zuò jiāshì?"
      },
      {
       "hz": "在你家，誰做這些家事？什麼時候做？(你也可以問同學)",
       "vi": "Ở nhà bạn, ai làm những việc nhà này? Làm vào lúc nào? (bạn cũng có thể hỏi bạn cùng lớp)",
       "py": "Zài nǐjiā, shéi zuò zhèxiē jiāshì? Shénme shíhòu zuò? (nǐ yě kěyǐ wèn tóngxué)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 kết hợp V 在 / V 到",
   "giaiThich": "Kết hợp mẫu 把 (xử lý đối tượng) với 在/到 để nói đưa vật gì tới đâu, đặt ở đâu."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "角色扮演：一個學生是爸爸/媽媽，一個是自己，利用提示的語法討論下面的問題，並完成對話。",
       "vi": "Đóng vai: một học sinh đóng vai bố/mẹ, một học sinh là chính mình, dùng ngữ pháp gợi ý để thảo luận các câu hỏi dưới đây và hoàn thành hội thoại.",
       "py": "Juésèbànyǎn: Yígè xuéshēng shì bàba / māma, yígè shì zìjǐ, lìyòng tíshì de yǔfǎ tǎolùn xiàmiàn de wèntí, bìng wánchéng duìhuà."
      },
      {
       "hz": "你多久打掃一次？為什麼？",
       "vi": "Bao lâu bạn dọn dẹp một lần? Tại sao?",
       "py": "Nǐ duōjiǔ dǎsǎo yícì? Wèishénme?"
      },
      {
       "hz": "你最不喜歡做什麼家事？為什麼？",
       "vi": "Bạn ghét làm việc nhà nào nhất? Tại sao?",
       "py": "Nǐ zuì bù xǐhuān zuò shénme jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得誰應該做家事？為什麼？",
       "vi": "Bạn nghĩ ai nên làm việc nhà? Tại sao?",
       "py": "Nǐ juéde shéi yīnggāi zuò jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得做家事以後，父母應該給孩子錢嗎？為什麼？",
       "vi": "Bạn có nghĩ sau khi con làm việc nhà, bố mẹ nên cho tiền không? Tại sao?",
       "py": "Nǐ juéde zuò jiāshì yǐhòu, fùmǔ yīnggāi gěi háizi qián ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "爸爸/媽媽：你的房間為什麼這麼髒?你多久沒打掃了？",
       "vi": "Bố/mẹ: Sao phòng con bẩn thế này? Bao lâu rồi con không dọn?",
       "py": "Bàba / māma: Nǐ de fángjiān wèishénme zhème zàng? Nǐ duōjiǔ méi dǎsǎo le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  }
 ],
 "td2-2.2": [
  {
   "title": "2. 我買的/把/誰/吃了/蛋糕",
   "points": [
    {
     "label": null,
     "formula": "This grammar denotes that the action of the verb is over. The “完” after the verb, used as the V complement, means to end or to finish. Pay attention to the usage of “完”.This lesson uses the complement structure to describe the end of the action instead ofusing the word “完” alone. For example, the meaning of “我完了。(I’m finished.) ”is completely different from the V 完 pattern. disposal construction 把 with resultative complement 完 請用提示完成對話。Complete the dialogues with the given words. The “V 一 V” pattern softens the tone and makes an action simple and clear. When used together with “把 construction”, it gives requests or orders in a gentler tone. However, the verb used in this pattern has to be monosyllabic. disposal construction 把 with verb reduplication 請用提示完成句子。Complete the sentences with the given words. “給” is a preposition that indicates the direction of action and marks the recipient of the Direct Object. It can collocate with verbs “拿 (to take) ”, “送 (to give) ”, “賣 (to sell) ”, “寄 (to send) ”, “踢 (to kick) ”, etc. It can also be used in 把 construction, such disposal construction 把 with preposition 給 This pattern contains “Question Word 多+Vs (as predicate)” to inquire the degree achieved. In this pattern, “有” is frequently omitted. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "把/電腦/我/舊的/賣了3. 把/小說/不要的/丟了/我/昨天",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diànnǎo / wǒ / jiù de / mài le 3. Bǎ / xiǎoshuō / búyào de / diū le / wǒ / zuótiān"
      },
      {
       "hz": "媽媽把家事做完以後，就休息了。2. 因為你沒把工作做完，所以老闆不太高興。3. 請你先聽我把話說完，你再說，好嗎?",
       "vi": "Mẹ làm xong việc nhà là nghỉ ngơi. Vì bạn chưa làm xong công việc nên ông chủ không vui lắm. Bạn hãy nghe tôi nói hết đã rồi hãy nói, được không?",
       "py": "Māma bǎ jiāshì zuò wán yǐhòu, jiù xiūxí le. 2. Yīnwèi nǐ méi bǎ gōngzuò zuò wán, suǒyǐ lǎobǎn bú tàigāoxìng. 3. Qǐng nǐ xiān tīng wǒ bǎ huà shuōwán, nǐ zàishuō, hǎo ma?"
      },
      {
       "hz": "A:你什麼時候來我家？ (書法)2. 太太:碗筷、刀叉,你都洗了嗎？ (報紙)孩子:可是我現在就想看！",
       "vi": "A: Khi nào bạn đến nhà tôi? (thư pháp) Vợ: Bát đũa, dao nĩa, con rửa hết chưa? (báo) Con: Nhưng con muốn xem ngay bây giờ!",
       "py": "A: Nǐ shénme shíhòu lái wǒjiā? (shūfǎ) 2. Tàitai: Wǎnkuài, dāochā, nǐ dōu xǐ le ma? (bàozhǐ) háizi: Kěshì wǒ xiànzài jiù xiǎng kàn!"
      },
      {
       "hz": "你沒把蘋果洗一洗就吃了，如果肚子疼怎麼辦？\t2.下課以後，我先把教室裡的桌子、椅子排一排再回家。\t3. 太太:我覺得頭很疼，你可以幫我做家事嗎？先生:沒問題！我先把地掃一掃，等孩子回來以後，再把他們的髒衣服洗一洗。",
       "vi": "Bạn chưa rửa táo đã ăn, nếu đau bụng thì làm sao? Tan học xong, tôi sắp xếp lại bàn ghế trong lớp rồi mới về nhà. Vợ: Em thấy đau đầu quá, anh làm việc nhà giúp em được không? Chồng: Không vấn đề gì! Anh quét nhà trước, đợi bọn trẻ về rồi giặt quần áo bẩn cho chúng.",
       "py": "Nǐ méi bǎ píngguǒ xǐ yì xǐ jiù chī le, rúguǒ dùziténg zěnmebàn? 2. Xiàkè yǐhòu, wǒ xiān bǎ jiàoshì lǐ de zhuōzi, yǐzi pái yìpái zài huíjiā. 3. Tàitai: Wǒ juéde tóu hěn téng, nǐ kěyǐ bāng wǒ zuò jiāshì ma? Xiānshēng: Méi wèntí! Wǒ xiān bǎ dì sǎo yì sǎo, děng háizi huílái yǐhòu, zài bǎ tāmen de zàng yīfú xǐ yì xǐ."
      },
      {
       "hz": "孩子:我晚一點兒再擦,現在要跟朋友去看球賽呢!",
       "vi": "Con: Lát nữa con lau, bây giờ con đi xem đá bóng với bạn!",
       "py": "Háizi: Wǒ wǎn yìdiǎn'ér zài cā, xiànzài yào gēn péngyǒu qù kànqiúsài ne!"
      },
      {
       "hz": "我昨天把那些小說送給朋友了。2. 王先生為什麼不想把舊車賣給你?3. A:你昨天為什麼沒把感冒藥拿給孩子吃? B:醫生說那個藥是給大人吃的,不可以給小孩吃。",
       "vi": "Hôm qua tôi đã tặng những quyển tiểu thuyết đó cho bạn. Tại sao anh Vương không muốn bán xe cũ cho bạn? A: Sao hôm qua bạn không đưa thuốc cảm cho con uống? B: Bác sĩ nói thuốc đó dành cho người lớn, không được cho trẻ con uống.",
       "py": "Wǒ zuótiān bǎ nàxiē xiǎoshuō sònggěi péngyǒu le. 2. Wáng xiānshēng wèishénme bùxiǎng bǎ jiùchē mài gěi nǐ? 3. A: Nǐ zuótiān wèishénme méi bǎ gǎnmàoyào nágěi háizi chī? B: Yīshēng shuō nàge yào shì gěi dàrén chī de, bù kěyǐ gěi xiǎohái chī."
      },
      {
       "hz": "as “我把你做的蛋糕送給朋友了。”.",
       "vi": "Ví dụ: “Tôi đã tặng bánh kem bạn làm cho bạn tôi rồi.”",
       "py": "As “wǒ bǎ nǐ zuò de dàngāo sònggěi péngyǒu le.”."
      },
      {
       "hz": "我/把/就/禮物/昨天/送給/了/張小姐。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Wǒ / bǎ / jiù / lǐwù / zuótiān / sònggěi / le / Zhāng xiǎojiě."
      },
      {
       "hz": "把/沒/哥哥/媽媽/寄給/是不是/生日卡片？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / méi / gēge / māma / jìgěi / shìbúshì / shēngrì kǎpiàn?"
      },
      {
       "hz": "你/把/我/聽/嗎/可以/那首/唱給/中文歌？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Nǐ / bǎ / wǒ / tīng / ma / kěyǐ / nà shǒu / chàng gěi / zhōngwén gē?"
      },
      {
       "hz": "A:你家離學校(有)多遠？ B:我家離學校很遠,走路差不多要五十分鐘。2. A:那張桌子(有)多長？ B:那張桌子(有)八十公分。3. A:你知道合歡山(有)多高嗎？ B:差不多三千五百公尺。",
       "vi": "A: Nhà bạn cách trường bao xa? B: Nhà tôi cách trường rất xa, đi bộ mất khoảng năm mươi phút. A: Cái bàn đó dài bao nhiêu? B: Cái bàn đó dài tám mươi phân. A: Bạn có biết núi Hợp Hoan cao bao nhiêu không? B: Khoảng ba nghìn năm trăm mét.",
       "py": "A: Nǐjiā lí xuéxiào (yǒu) duō yuǎn? B: Wǒjiā lí xuéxiào hěn yuǎn, zǒulù chàbuduō yào wǔshífēnzhōng. 2. A: Nà zhāng zhuōzi (yǒu) duōzhǎng? B: Nà zhāng zhuōzi (yǒu) bā shígōngfēn. 3. A: Nǐ zhīdào héhuānshān (yǒu) duō gāo ma? B: Chàbuduō sānqiānwǔbǎi gōngchǐ."
      },
      {
       "hz": "B：我妹妹今年十八歲。",
       "vi": "B: Năm nay em gái tôi mười tám tuổi.",
       "py": "B: Wǒ mèimei jīnnián shíbāsuì."
      },
      {
       "hz": "B：一張(要)八千元。",
       "vi": "B: Một vé tám nghìn đồng.",
       "py": "B: Yīzhāng (yào) bāqiānyuán."
      },
      {
       "hz": "B：我現在七十五公斤了。",
       "vi": "B: Bây giờ tôi nặng bảy mươi lăm cân rồi.",
       "py": "B: Wǒ xiànzài qīshíwǔ gōngjīn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 把 và V 完",
   "giaiThich": "Phần luyện tập: sắp xếp câu có 把; chú ý bổ ngữ 完 (làm xong) đứng sau động từ."
  },
  {
   "title": "III. Time-duration 沒V(O)了/time-duration 不V(O)",
   "points": [
    {
     "label": null,
     "formula": "Didn’t do something for a period of time This pattern, always including a negation word “不” or “沒,” indicates the time duration of a certain situation in which an action has yet to happen.",
     "examples": [
      {
       "hz": "我已經兩天沒睡覺了,真累!2. 你想，如果山本良介半年不說中文，他還記得怎麼說嗎?3. A:他的房間有老鼠！ B:真的嗎？他多久沒打掃了？",
       "vi": "Tôi đã hai ngày không ngủ rồi, mệt thật! Bạn thử nghĩ xem, nếu Yamamoto Ryosuke nửa năm không nói tiếng Trung, cậu ấy còn nhớ cách nói không? A: Phòng anh ấy có chuột! B: Thật à? Bao lâu rồi anh ấy không dọn dẹp?",
       "py": "Wǒ yǐjīng liǎngtiān méi shuìjiào le, zhēnlèi! 2. Nǐ xiǎng, rúguǒ shānběn Liángjiè bànnián bù shuō zhōngwén, tā hái jìde zěnme shuō ma? 3. A: Tā de fángjiān yǒu lǎoshǔ! B: Zhēnde ma? Tā duōjiǔ méi dǎsǎo le?"
      },
      {
       "hz": "A：林先生非常不喜歡說話。",
       "vi": "A: Anh Lâm rất không thích nói chuyện.",
       "py": "A: Lín xiānshēng fēicháng bù xǐhuān shuōhuà."
      },
      {
       "hz": "A：為什麼你今天一定要去運動？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi tập thể dục?",
       "py": "A: Wèishénme nǐ jīntiān yídìng yào qù yùndòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bao lâu rồi không làm gì",
   "giaiThich": "Mẫu có 不 hoặc 沒, nêu khoảng thời gian một việc CHƯA xảy ra (\"bao lâu rồi chưa…\")."
  },
  {
   "title": "IV. QW+都/也 all-inclusive with question words+都/也",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, question words may co-occur with “都”or “也”in declarative sentences to indicate entirety. That is, in affirmative sentences, this pattern indicates total inclusion, while in negative ones, it indicates total exclusion.",
     "examples": [
      {
       "hz": "錢先生哪國語言都會說。2. 我不舒服,什麼都不想吃。3. 我剛剛到台灣,誰也不認識。4. 中國菜很有名,哪裡都有中國餐廳。5. 這個字很難,我怎麼寫都不對。",
       "vi": "Anh Tiền nói được tiếng của nước nào cũng được. Tôi khó chịu, không muốn ăn gì cả. Tôi mới đến Đài Loan, không quen ai cả. Món ăn Trung Hoa rất nổi tiếng, ở đâu cũng có nhà hàng Trung Hoa. Chữ này khó quá, tôi viết thế nào cũng sai.",
       "py": "Qián xiānshēng nǎ guó yǔyán dōu huì shuō. 2. Wǒ bù shūfú, shénme dōu bùxiǎng chī. 3. Wǒ gānggāng dào Táiwān, shéi yě bú rènshì. 4. Zhōngguó cài hěn yǒumíng, nǎlǐ dōu yǒu Zhōngguó cāntīng. 5. Zhège zì hěn nán, wǒ zěnme xiě dōu bú duì."
      },
      {
       "hz": "A：我們什麼時候去看電影？",
       "vi": "A: Khi nào chúng ta đi xem phim?",
       "py": "A: Wǒmen shénme shíhòu qù kàn diànyǐng?"
      },
      {
       "hz": "A：你覺得我穿哪一件衣服好看？",
       "vi": "A: Bạn thấy tôi mặc bộ nào đẹp?",
       "py": "A: Nǐ juéde wǒ chuān nǎ yíjiàn yīfú hǎokàn?"
      },
      {
       "hz": "A：放暑假的時候，你想去哪裡玩？",
       "vi": "A: Nghỉ hè bạn muốn đi chơi đâu?",
       "py": "A: Fàngshǔjià de shíhòu, nǐ xiǎng qù nǎlǐ wán?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi + 都 / 也 — bao gồm tất cả",
   "giaiThich": "Từ để hỏi (誰, 什麼, 哪裡…) đi với 都 hoặc 也 trong câu trần thuật mang nghĩa \"ai/gì/đâu cũng…\"; câu phủ định thì thành \"chẳng ai/gì/đâu…\"."
  },
  {
   "title": "V. 又 again",
   "points": [
    {
     "label": null,
     "formula": "“又” means the repetition of the same action or the reappearance of similar situation.“再” and “又” both mean repetition. However, “再” emphasizes the intention to repeat certain actions, so it can be used in imperative sentences and placed after modal verbs, e.g., “請再說一次” (Please say it again.) and “我想再喝一杯”. (I’d  like to have another drink.) “又” is used after certain actions or showing the intention of performing the action. “又” mostly collocates with “了” or “沒” and is placed before the modal verbs. e.g., “我又說了一次” (I said that again.) and “我又想喝了”(I wanted to drink again.)",
     "examples": [
      {
       "hz": "他剛剛吃了一碗牛肉麵和三個包子，現在又餓了。2. 金先生上個月買的書都看完了，今天又要去買書了。3. 他去美國旅行了兩個星期以後，又去越南玩了五天。",
       "vi": "Anh ấy vừa ăn một bát mì bò và ba cái bánh bao, bây giờ lại đói rồi. Sách anh Kim mua tháng trước đã đọc hết, hôm nay lại muốn đi mua sách nữa. Sau khi đi Mỹ du lịch hai tuần, anh ấy lại sang Việt Nam chơi năm ngày.",
       "py": "Tā gānggāng chī le yìwǎn niúròumiàn hàn sāngè bāozi, xiànzài yòu è le. 2. Jīn xiānshēng shànggèyuè mǎi de shū dōu kàn wán le, jīntiān yòu yào qù mǎi shū le. 3. Tā qù Měiguó lǚxíng le liǎnggè xīngqí yǐhòu, yòu qù Yuènán wán le wǔtiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "又 — lại (lần nữa)",
   "giaiThich": "又 chỉ việc lặp lại đã XẢY RA. Phân biệt với 再: 再 nói về ý định lặp lại trong tương lai."
  },
  {
   "title": "VI. Time + 才 +V longer/later than expected with 才",
   "points": [
    {
     "label": null,
     "formula": "“才” implies that an action happened or will happen later than expected. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "我昨天太累了，所以今天早上十一點才起來。2. A：你是上個月從英國到台灣的嗎？ B：不是，我是昨天才到的。3. A：我們什麼時候要考試？我還沒準備，怎麼辦？ B：我們下個禮拜才考，你還有時間準備。",
       "vi": "Hôm qua tôi mệt quá, nên sáng nay mười một giờ mới dậy. A: Bạn từ Anh sang Đài Loan hồi tháng trước à? B: Không, hôm qua tôi mới đến. A: Khi nào chúng ta thi? Tôi vẫn chưa ôn, làm sao đây? B: Tuần sau chúng ta mới thi, bạn vẫn còn thời gian ôn.",
       "py": "Wǒ zuótiān tài lèi le, suǒyǐ jīntiān zǎoshàng shíyìdiǎn cái qǐlái. 2. A: Nǐ shì shànggèyuè cóng Yīngguó dào Táiwān de ma? B: Búshì, wǒ shì zuótiān cái dào de. 3. A: Wǒmen shénme shíhòu yào kǎoshì? Wǒ hái méi zhǔnbèi, zěnmebàn? B: Wǒmen xià gè lǐbài cái kǎo, nǐ háiyǒu shíjiān zhǔnbèi."
      },
      {
       "hz": "A：聽說你這個週末要去日本？(下個週末)2. A：趕快起來！你早上八點有中文課！(早上十點)3. A：你明天晚上要不要跟我一起去看籃球比賽？(後天)",
       "vi": "A: Nghe nói cuối tuần này bạn đi Nhật à? (cuối tuần sau) A: Mau dậy đi! Tám giờ sáng con có tiết tiếng Trung! (mười giờ sáng) A: Tối mai bạn có muốn đi xem bóng rổ với tôi không? (ngày kia)",
       "py": "A: Tīngshuō nǐ zhège zhōumò yào qù Rìběn? (xià gè zhōumò) 2. A: Gǎnkuài qǐlái! Nǐ zǎoshàng bādiǎn yǒu zhōngwén kè! (zǎoshàng shídiǎn) 3. A: Nǐ míngtiān wǎnshàng yào búyào gēn wǒ yìqǐ qù kàn lánqiúbǐsài? (hòutiān)"
      },
      {
       "hz": "良介在哪些地方看見垃圾？",
       "vi": "Ryosuke thấy rác ở những chỗ nào?",
       "py": "Liángjiè zài nǎxiēdìfāng kànjiàn lèsè?"
      },
      {
       "hz": "良介為什麼沒把垃圾丟了？",
       "vi": "Tại sao Ryosuke không vứt rác đi?",
       "py": "Liángjiè wèishénme méi bǎ lèsè diū le?"
      },
      {
       "hz": "為什麼宿舍的空氣不好？",
       "vi": "Tại sao không khí trong ký túc xá không tốt?",
       "py": "Wèishénme sùshè de kōngqì bùhǎo?"
      },
      {
       "hz": "在良介家，良介應該做哪些家事？為什麼？",
       "vi": "Ở nhà Ryosuke, Ryosuke nên làm những việc nhà nào? Tại sao?",
       "py": "Zài Liángjiè jiā, Liángjiè yīnggāi zuò nǎxiē jiāshì? Wèishénme?"
      },
      {
       "hz": "良介覺得打掃是誰的事？為什麼？",
       "vi": "Ryosuke nghĩ dọn dẹp là việc của ai? Tại sao?",
       "py": "Liángjiè juéde dǎsǎo shì shéi de shì? Wèishénme?"
      },
      {
       "hz": "你覺得那個地方以後會怎麼樣？為什麼？",
       "vi": "Bạn nghĩ sau này nơi đó sẽ thế nào? Tại sao?",
       "py": "Nǐ juéde nàge dìfāng yǐhòu huì zěnmeyàng? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mãi mới, muộn hơn dự tính",
   "giaiThich": "才 cho biết việc xảy ra MUỘN hơn mong đợi (\"mãi tới… mới…\")."
  },
  {
   "title": "I. S (+Neg)+把+N+V在/V到…",
   "points": [
    {
     "label": null,
     "formula": "disposal construction 把 with V 在 and V 到 patterns This pattern is the combination of “S (+Neg)+把+ N+ V+ Complement” (see the first grammar after the dialogue in this lesson) and “V在” (see the first grammar after the text in Lesson One) and “V到”. It indicates the location or place of the Object after 請用提示完成對話。Complete the dialogues with given words. II. …，才… condition and consequence with 才 In this pattern, the adverb “才”in the second clause is used to show consequences when the conditions and causes in the first clause are fulfilled. Thus,”得(have to)”, “要(need to )”, “為了(In order to )”,and “因為” (because)” are often used in the first clause of this pattern. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "孩子把髒衣服丟在浴室裡。2. 你怎麼沒把地址寫在信封上呢?3. 我覺得把錢放在銀行比放在家裡安全得多。4. 媽媽把蛋糕拿到廚房的桌子上。5. 你不可以把球踢到馬路上,太危險了。6. 李小姐把生日卡片寄到男朋友家。",
       "vi": "Đứa bé vứt quần áo bẩn trong phòng tắm. Sao bạn không viết địa chỉ lên phong bì? Tôi thấy để tiền trong ngân hàng an toàn hơn để ở nhà nhiều. Mẹ mang bánh kem đến bàn trong bếp. Bạn không được đá bóng ra đường, nguy hiểm lắm. Cô Lý gửi thiệp sinh nhật đến nhà bạn trai.",
       "py": "Háizi bǎ zàng yīfú diū zài yùshì lǐ. 2. Nǐ zěnme méi bǎ dìzhǐ xiě zài xìnfēng shàng ne? 3. Wǒ juéde bǎ qián fàngzài yínháng bǐ fàngzài jiālǐ ānquán de duō. 4. Māma bǎ dàngāo nádào chúfáng de zhuōzi shàng. 5. Nǐ bù kěyǐ bǎ qiú tī dào mǎlùshàng, tài wéixiǎn le. 6. Lǐ xiǎojiě bǎ shēngrì kǎpiàn jì dào nánpéngyǒu jiā."
      },
      {
       "hz": "他昨天是因為生病才沒來上課的。2. 你最好再穿一件衣服，才不會覺得冷。3. 你得每天練習寫字，字才能寫得好看。",
       "vi": "Hôm qua anh ấy nghỉ học là vì bị ốm. Tốt nhất bạn nên mặc thêm một chiếc áo thì mới không thấy lạnh. Bạn phải luyện viết chữ mỗi ngày thì chữ mới đẹp được.",
       "py": "Tā zuótiān shìyīnwèi shēngbìng cái méi lái shàngkè de. 2. Nǐ zuìhǎo zài chuān yíjiàn yīfú, cái búhuì juéde lěng. 3. Nǐ děi měitiān liànxí xiězì, zì cáinéng xiě de hǎokàn."
      },
      {
       "hz": "誰做家事？",
       "vi": "Ai làm việc nhà?",
       "py": "Shéi zuò jiāshì?"
      },
      {
       "hz": "在你家，誰做這些家事？什麼時候做？(你也可以問同學)",
       "vi": "Ở nhà bạn, ai làm những việc nhà này? Làm vào lúc nào? (bạn cũng có thể hỏi bạn cùng lớp)",
       "py": "Zài nǐjiā, shéi zuò zhèxiē jiāshì? Shénme shíhòu zuò? (nǐ yě kěyǐ wèn tóngxué)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 kết hợp V 在 / V 到",
   "giaiThich": "Kết hợp mẫu 把 (xử lý đối tượng) với 在/到 để nói đưa vật gì tới đâu, đặt ở đâu."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "角色扮演：一個學生是爸爸/媽媽，一個是自己，利用提示的語法討論下面的問題，並完成對話。",
       "vi": "Đóng vai: một học sinh đóng vai bố/mẹ, một học sinh là chính mình, dùng ngữ pháp gợi ý để thảo luận các câu hỏi dưới đây và hoàn thành hội thoại.",
       "py": "Juésèbànyǎn: Yígè xuéshēng shì bàba / māma, yígè shì zìjǐ, lìyòng tíshì de yǔfǎ tǎolùn xiàmiàn de wèntí, bìng wánchéng duìhuà."
      },
      {
       "hz": "你多久打掃一次？為什麼？",
       "vi": "Bao lâu bạn dọn dẹp một lần? Tại sao?",
       "py": "Nǐ duōjiǔ dǎsǎo yícì? Wèishénme?"
      },
      {
       "hz": "你最不喜歡做什麼家事？為什麼？",
       "vi": "Bạn ghét làm việc nhà nào nhất? Tại sao?",
       "py": "Nǐ zuì bù xǐhuān zuò shénme jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得誰應該做家事？為什麼？",
       "vi": "Bạn nghĩ ai nên làm việc nhà? Tại sao?",
       "py": "Nǐ juéde shéi yīnggāi zuò jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得做家事以後，父母應該給孩子錢嗎？為什麼？",
       "vi": "Bạn có nghĩ sau khi con làm việc nhà, bố mẹ nên cho tiền không? Tại sao?",
       "py": "Nǐ juéde zuò jiāshì yǐhòu, fùmǔ yīnggāi gěi háizi qián ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "爸爸/媽媽：你的房間為什麼這麼髒?你多久沒打掃了？",
       "vi": "Bố/mẹ: Sao phòng con bẩn thế này? Bao lâu rồi con không dọn?",
       "py": "Bàba / māma: Nǐ de fángjiān wèishénme zhème zàng? Nǐ duōjiǔ méi dǎsǎo le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  }
 ],
 "td2-2.3": [
  {
   "title": "2. 我買的/把/誰/吃了/蛋糕",
   "points": [
    {
     "label": null,
     "formula": "This grammar denotes that the action of the verb is over. The “完” after the verb, used as the V complement, means to end or to finish. Pay attention to the usage of “完”.This lesson uses the complement structure to describe the end of the action instead ofusing the word “完” alone. For example, the meaning of “我完了。(I’m finished.) ”is completely different from the V 完 pattern. disposal construction 把 with resultative complement 完 請用提示完成對話。Complete the dialogues with the given words. The “V 一 V” pattern softens the tone and makes an action simple and clear. When used together with “把 construction”, it gives requests or orders in a gentler tone. However, the verb used in this pattern has to be monosyllabic. disposal construction 把 with verb reduplication 請用提示完成句子。Complete the sentences with the given words. “給” is a preposition that indicates the direction of action and marks the recipient of the Direct Object. It can collocate with verbs “拿 (to take) ”, “送 (to give) ”, “賣 (to sell) ”, “寄 (to send) ”, “踢 (to kick) ”, etc. It can also be used in 把 construction, such disposal construction 把 with preposition 給 This pattern contains “Question Word 多+Vs (as predicate)” to inquire the degree achieved. In this pattern, “有” is frequently omitted. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "把/電腦/我/舊的/賣了3. 把/小說/不要的/丟了/我/昨天",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diànnǎo / wǒ / jiù de / mài le 3. Bǎ / xiǎoshuō / búyào de / diū le / wǒ / zuótiān"
      },
      {
       "hz": "媽媽把家事做完以後，就休息了。2. 因為你沒把工作做完，所以老闆不太高興。3. 請你先聽我把話說完，你再說，好嗎?",
       "vi": "Mẹ làm xong việc nhà là nghỉ ngơi. Vì bạn chưa làm xong công việc nên ông chủ không vui lắm. Bạn hãy nghe tôi nói hết đã rồi hãy nói, được không?",
       "py": "Māma bǎ jiāshì zuò wán yǐhòu, jiù xiūxí le. 2. Yīnwèi nǐ méi bǎ gōngzuò zuò wán, suǒyǐ lǎobǎn bú tàigāoxìng. 3. Qǐng nǐ xiān tīng wǒ bǎ huà shuōwán, nǐ zàishuō, hǎo ma?"
      },
      {
       "hz": "A:你什麼時候來我家？ (書法)2. 太太:碗筷、刀叉,你都洗了嗎？ (報紙)孩子:可是我現在就想看！",
       "vi": "A: Khi nào bạn đến nhà tôi? (thư pháp) Vợ: Bát đũa, dao nĩa, con rửa hết chưa? (báo) Con: Nhưng con muốn xem ngay bây giờ!",
       "py": "A: Nǐ shénme shíhòu lái wǒjiā? (shūfǎ) 2. Tàitai: Wǎnkuài, dāochā, nǐ dōu xǐ le ma? (bàozhǐ) háizi: Kěshì wǒ xiànzài jiù xiǎng kàn!"
      },
      {
       "hz": "你沒把蘋果洗一洗就吃了，如果肚子疼怎麼辦？\t2.下課以後，我先把教室裡的桌子、椅子排一排再回家。\t3. 太太:我覺得頭很疼，你可以幫我做家事嗎？先生:沒問題！我先把地掃一掃，等孩子回來以後，再把他們的髒衣服洗一洗。",
       "vi": "Bạn chưa rửa táo đã ăn, nếu đau bụng thì làm sao? Tan học xong, tôi sắp xếp lại bàn ghế trong lớp rồi mới về nhà. Vợ: Em thấy đau đầu quá, anh làm việc nhà giúp em được không? Chồng: Không vấn đề gì! Anh quét nhà trước, đợi bọn trẻ về rồi giặt quần áo bẩn cho chúng.",
       "py": "Nǐ méi bǎ píngguǒ xǐ yì xǐ jiù chī le, rúguǒ dùziténg zěnmebàn? 2. Xiàkè yǐhòu, wǒ xiān bǎ jiàoshì lǐ de zhuōzi, yǐzi pái yìpái zài huíjiā. 3. Tàitai: Wǒ juéde tóu hěn téng, nǐ kěyǐ bāng wǒ zuò jiāshì ma? Xiānshēng: Méi wèntí! Wǒ xiān bǎ dì sǎo yì sǎo, děng háizi huílái yǐhòu, zài bǎ tāmen de zàng yīfú xǐ yì xǐ."
      },
      {
       "hz": "孩子:我晚一點兒再擦,現在要跟朋友去看球賽呢!",
       "vi": "Con: Lát nữa con lau, bây giờ con đi xem đá bóng với bạn!",
       "py": "Háizi: Wǒ wǎn yìdiǎn'ér zài cā, xiànzài yào gēn péngyǒu qù kànqiúsài ne!"
      },
      {
       "hz": "我昨天把那些小說送給朋友了。2. 王先生為什麼不想把舊車賣給你?3. A:你昨天為什麼沒把感冒藥拿給孩子吃? B:醫生說那個藥是給大人吃的,不可以給小孩吃。",
       "vi": "Hôm qua tôi đã tặng những quyển tiểu thuyết đó cho bạn. Tại sao anh Vương không muốn bán xe cũ cho bạn? A: Sao hôm qua bạn không đưa thuốc cảm cho con uống? B: Bác sĩ nói thuốc đó dành cho người lớn, không được cho trẻ con uống.",
       "py": "Wǒ zuótiān bǎ nàxiē xiǎoshuō sònggěi péngyǒu le. 2. Wáng xiānshēng wèishénme bùxiǎng bǎ jiùchē mài gěi nǐ? 3. A: Nǐ zuótiān wèishénme méi bǎ gǎnmàoyào nágěi háizi chī? B: Yīshēng shuō nàge yào shì gěi dàrén chī de, bù kěyǐ gěi xiǎohái chī."
      },
      {
       "hz": "as “我把你做的蛋糕送給朋友了。”.",
       "vi": "Ví dụ: “Tôi đã tặng bánh kem bạn làm cho bạn tôi rồi.”",
       "py": "As “wǒ bǎ nǐ zuò de dàngāo sònggěi péngyǒu le.”."
      },
      {
       "hz": "我/把/就/禮物/昨天/送給/了/張小姐。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Wǒ / bǎ / jiù / lǐwù / zuótiān / sònggěi / le / Zhāng xiǎojiě."
      },
      {
       "hz": "把/沒/哥哥/媽媽/寄給/是不是/生日卡片？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / méi / gēge / māma / jìgěi / shìbúshì / shēngrì kǎpiàn?"
      },
      {
       "hz": "你/把/我/聽/嗎/可以/那首/唱給/中文歌？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Nǐ / bǎ / wǒ / tīng / ma / kěyǐ / nà shǒu / chàng gěi / zhōngwén gē?"
      },
      {
       "hz": "A:你家離學校(有)多遠？ B:我家離學校很遠,走路差不多要五十分鐘。2. A:那張桌子(有)多長？ B:那張桌子(有)八十公分。3. A:你知道合歡山(有)多高嗎？ B:差不多三千五百公尺。",
       "vi": "A: Nhà bạn cách trường bao xa? B: Nhà tôi cách trường rất xa, đi bộ mất khoảng năm mươi phút. A: Cái bàn đó dài bao nhiêu? B: Cái bàn đó dài tám mươi phân. A: Bạn có biết núi Hợp Hoan cao bao nhiêu không? B: Khoảng ba nghìn năm trăm mét.",
       "py": "A: Nǐjiā lí xuéxiào (yǒu) duō yuǎn? B: Wǒjiā lí xuéxiào hěn yuǎn, zǒulù chàbuduō yào wǔshífēnzhōng. 2. A: Nà zhāng zhuōzi (yǒu) duōzhǎng? B: Nà zhāng zhuōzi (yǒu) bā shígōngfēn. 3. A: Nǐ zhīdào héhuānshān (yǒu) duō gāo ma? B: Chàbuduō sānqiānwǔbǎi gōngchǐ."
      },
      {
       "hz": "B：我妹妹今年十八歲。",
       "vi": "B: Năm nay em gái tôi mười tám tuổi.",
       "py": "B: Wǒ mèimei jīnnián shíbāsuì."
      },
      {
       "hz": "B：一張(要)八千元。",
       "vi": "B: Một vé tám nghìn đồng.",
       "py": "B: Yīzhāng (yào) bāqiānyuán."
      },
      {
       "hz": "B：我現在七十五公斤了。",
       "vi": "B: Bây giờ tôi nặng bảy mươi lăm cân rồi.",
       "py": "B: Wǒ xiànzài qīshíwǔ gōngjīn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 把 và V 完",
   "giaiThich": "Phần luyện tập: sắp xếp câu có 把; chú ý bổ ngữ 完 (làm xong) đứng sau động từ."
  },
  {
   "title": "III. Time-duration 沒V(O)了/time-duration 不V(O)",
   "points": [
    {
     "label": null,
     "formula": "Didn’t do something for a period of time This pattern, always including a negation word “不” or “沒,” indicates the time duration of a certain situation in which an action has yet to happen.",
     "examples": [
      {
       "hz": "我已經兩天沒睡覺了,真累!2. 你想，如果山本良介半年不說中文，他還記得怎麼說嗎?3. A:他的房間有老鼠！ B:真的嗎？他多久沒打掃了？",
       "vi": "Tôi đã hai ngày không ngủ rồi, mệt thật! Bạn thử nghĩ xem, nếu Yamamoto Ryosuke nửa năm không nói tiếng Trung, cậu ấy còn nhớ cách nói không? A: Phòng anh ấy có chuột! B: Thật à? Bao lâu rồi anh ấy không dọn dẹp?",
       "py": "Wǒ yǐjīng liǎngtiān méi shuìjiào le, zhēnlèi! 2. Nǐ xiǎng, rúguǒ shānběn Liángjiè bànnián bù shuō zhōngwén, tā hái jìde zěnme shuō ma? 3. A: Tā de fángjiān yǒu lǎoshǔ! B: Zhēnde ma? Tā duōjiǔ méi dǎsǎo le?"
      },
      {
       "hz": "A：林先生非常不喜歡說話。",
       "vi": "A: Anh Lâm rất không thích nói chuyện.",
       "py": "A: Lín xiānshēng fēicháng bù xǐhuān shuōhuà."
      },
      {
       "hz": "A：為什麼你今天一定要去運動？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi tập thể dục?",
       "py": "A: Wèishénme nǐ jīntiān yídìng yào qù yùndòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bao lâu rồi không làm gì",
   "giaiThich": "Mẫu có 不 hoặc 沒, nêu khoảng thời gian một việc CHƯA xảy ra (\"bao lâu rồi chưa…\")."
  },
  {
   "title": "IV. QW+都/也 all-inclusive with question words+都/也",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, question words may co-occur with “都”or “也”in declarative sentences to indicate entirety. That is, in affirmative sentences, this pattern indicates total inclusion, while in negative ones, it indicates total exclusion.",
     "examples": [
      {
       "hz": "錢先生哪國語言都會說。2. 我不舒服,什麼都不想吃。3. 我剛剛到台灣,誰也不認識。4. 中國菜很有名,哪裡都有中國餐廳。5. 這個字很難,我怎麼寫都不對。",
       "vi": "Anh Tiền nói được tiếng của nước nào cũng được. Tôi khó chịu, không muốn ăn gì cả. Tôi mới đến Đài Loan, không quen ai cả. Món ăn Trung Hoa rất nổi tiếng, ở đâu cũng có nhà hàng Trung Hoa. Chữ này khó quá, tôi viết thế nào cũng sai.",
       "py": "Qián xiānshēng nǎ guó yǔyán dōu huì shuō. 2. Wǒ bù shūfú, shénme dōu bùxiǎng chī. 3. Wǒ gānggāng dào Táiwān, shéi yě bú rènshì. 4. Zhōngguó cài hěn yǒumíng, nǎlǐ dōu yǒu Zhōngguó cāntīng. 5. Zhège zì hěn nán, wǒ zěnme xiě dōu bú duì."
      },
      {
       "hz": "A：我們什麼時候去看電影？",
       "vi": "A: Khi nào chúng ta đi xem phim?",
       "py": "A: Wǒmen shénme shíhòu qù kàn diànyǐng?"
      },
      {
       "hz": "A：你覺得我穿哪一件衣服好看？",
       "vi": "A: Bạn thấy tôi mặc bộ nào đẹp?",
       "py": "A: Nǐ juéde wǒ chuān nǎ yíjiàn yīfú hǎokàn?"
      },
      {
       "hz": "A：放暑假的時候，你想去哪裡玩？",
       "vi": "A: Nghỉ hè bạn muốn đi chơi đâu?",
       "py": "A: Fàngshǔjià de shíhòu, nǐ xiǎng qù nǎlǐ wán?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi + 都 / 也 — bao gồm tất cả",
   "giaiThich": "Từ để hỏi (誰, 什麼, 哪裡…) đi với 都 hoặc 也 trong câu trần thuật mang nghĩa \"ai/gì/đâu cũng…\"; câu phủ định thì thành \"chẳng ai/gì/đâu…\"."
  },
  {
   "title": "V. 又 again",
   "points": [
    {
     "label": null,
     "formula": "“又” means the repetition of the same action or the reappearance of similar situation.“再” and “又” both mean repetition. However, “再” emphasizes the intention to repeat certain actions, so it can be used in imperative sentences and placed after modal verbs, e.g., “請再說一次” (Please say it again.) and “我想再喝一杯”. (I’d  like to have another drink.) “又” is used after certain actions or showing the intention of performing the action. “又” mostly collocates with “了” or “沒” and is placed before the modal verbs. e.g., “我又說了一次” (I said that again.) and “我又想喝了”(I wanted to drink again.)",
     "examples": [
      {
       "hz": "他剛剛吃了一碗牛肉麵和三個包子，現在又餓了。2. 金先生上個月買的書都看完了，今天又要去買書了。3. 他去美國旅行了兩個星期以後，又去越南玩了五天。",
       "vi": "Anh ấy vừa ăn một bát mì bò và ba cái bánh bao, bây giờ lại đói rồi. Sách anh Kim mua tháng trước đã đọc hết, hôm nay lại muốn đi mua sách nữa. Sau khi đi Mỹ du lịch hai tuần, anh ấy lại sang Việt Nam chơi năm ngày.",
       "py": "Tā gānggāng chī le yìwǎn niúròumiàn hàn sāngè bāozi, xiànzài yòu è le. 2. Jīn xiānshēng shànggèyuè mǎi de shū dōu kàn wán le, jīntiān yòu yào qù mǎi shū le. 3. Tā qù Měiguó lǚxíng le liǎnggè xīngqí yǐhòu, yòu qù Yuènán wán le wǔtiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "又 — lại (lần nữa)",
   "giaiThich": "又 chỉ việc lặp lại đã XẢY RA. Phân biệt với 再: 再 nói về ý định lặp lại trong tương lai."
  },
  {
   "title": "VI. Time + 才 +V longer/later than expected with 才",
   "points": [
    {
     "label": null,
     "formula": "“才” implies that an action happened or will happen later than expected. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "我昨天太累了，所以今天早上十一點才起來。2. A：你是上個月從英國到台灣的嗎？ B：不是，我是昨天才到的。3. A：我們什麼時候要考試？我還沒準備，怎麼辦？ B：我們下個禮拜才考，你還有時間準備。",
       "vi": "Hôm qua tôi mệt quá, nên sáng nay mười một giờ mới dậy. A: Bạn từ Anh sang Đài Loan hồi tháng trước à? B: Không, hôm qua tôi mới đến. A: Khi nào chúng ta thi? Tôi vẫn chưa ôn, làm sao đây? B: Tuần sau chúng ta mới thi, bạn vẫn còn thời gian ôn.",
       "py": "Wǒ zuótiān tài lèi le, suǒyǐ jīntiān zǎoshàng shíyìdiǎn cái qǐlái. 2. A: Nǐ shì shànggèyuè cóng Yīngguó dào Táiwān de ma? B: Búshì, wǒ shì zuótiān cái dào de. 3. A: Wǒmen shénme shíhòu yào kǎoshì? Wǒ hái méi zhǔnbèi, zěnmebàn? B: Wǒmen xià gè lǐbài cái kǎo, nǐ háiyǒu shíjiān zhǔnbèi."
      },
      {
       "hz": "A：聽說你這個週末要去日本？(下個週末)2. A：趕快起來！你早上八點有中文課！(早上十點)3. A：你明天晚上要不要跟我一起去看籃球比賽？(後天)",
       "vi": "A: Nghe nói cuối tuần này bạn đi Nhật à? (cuối tuần sau) A: Mau dậy đi! Tám giờ sáng con có tiết tiếng Trung! (mười giờ sáng) A: Tối mai bạn có muốn đi xem bóng rổ với tôi không? (ngày kia)",
       "py": "A: Tīngshuō nǐ zhège zhōumò yào qù Rìběn? (xià gè zhōumò) 2. A: Gǎnkuài qǐlái! Nǐ zǎoshàng bādiǎn yǒu zhōngwén kè! (zǎoshàng shídiǎn) 3. A: Nǐ míngtiān wǎnshàng yào búyào gēn wǒ yìqǐ qù kàn lánqiúbǐsài? (hòutiān)"
      },
      {
       "hz": "良介在哪些地方看見垃圾？",
       "vi": "Ryosuke thấy rác ở những chỗ nào?",
       "py": "Liángjiè zài nǎxiēdìfāng kànjiàn lèsè?"
      },
      {
       "hz": "良介為什麼沒把垃圾丟了？",
       "vi": "Tại sao Ryosuke không vứt rác đi?",
       "py": "Liángjiè wèishénme méi bǎ lèsè diū le?"
      },
      {
       "hz": "為什麼宿舍的空氣不好？",
       "vi": "Tại sao không khí trong ký túc xá không tốt?",
       "py": "Wèishénme sùshè de kōngqì bùhǎo?"
      },
      {
       "hz": "在良介家，良介應該做哪些家事？為什麼？",
       "vi": "Ở nhà Ryosuke, Ryosuke nên làm những việc nhà nào? Tại sao?",
       "py": "Zài Liángjiè jiā, Liángjiè yīnggāi zuò nǎxiē jiāshì? Wèishénme?"
      },
      {
       "hz": "良介覺得打掃是誰的事？為什麼？",
       "vi": "Ryosuke nghĩ dọn dẹp là việc của ai? Tại sao?",
       "py": "Liángjiè juéde dǎsǎo shì shéi de shì? Wèishénme?"
      },
      {
       "hz": "你覺得那個地方以後會怎麼樣？為什麼？",
       "vi": "Bạn nghĩ sau này nơi đó sẽ thế nào? Tại sao?",
       "py": "Nǐ juéde nàge dìfāng yǐhòu huì zěnmeyàng? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mãi mới, muộn hơn dự tính",
   "giaiThich": "才 cho biết việc xảy ra MUỘN hơn mong đợi (\"mãi tới… mới…\")."
  },
  {
   "title": "I. S (+Neg)+把+N+V在/V到…",
   "points": [
    {
     "label": null,
     "formula": "disposal construction 把 with V 在 and V 到 patterns This pattern is the combination of “S (+Neg)+把+ N+ V+ Complement” (see the first grammar after the dialogue in this lesson) and “V在” (see the first grammar after the text in Lesson One) and “V到”. It indicates the location or place of the Object after 請用提示完成對話。Complete the dialogues with given words. II. …，才… condition and consequence with 才 In this pattern, the adverb “才”in the second clause is used to show consequences when the conditions and causes in the first clause are fulfilled. Thus,”得(have to)”, “要(need to )”, “為了(In order to )”,and “因為” (because)” are often used in the first clause of this pattern. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "孩子把髒衣服丟在浴室裡。2. 你怎麼沒把地址寫在信封上呢?3. 我覺得把錢放在銀行比放在家裡安全得多。4. 媽媽把蛋糕拿到廚房的桌子上。5. 你不可以把球踢到馬路上,太危險了。6. 李小姐把生日卡片寄到男朋友家。",
       "vi": "Đứa bé vứt quần áo bẩn trong phòng tắm. Sao bạn không viết địa chỉ lên phong bì? Tôi thấy để tiền trong ngân hàng an toàn hơn để ở nhà nhiều. Mẹ mang bánh kem đến bàn trong bếp. Bạn không được đá bóng ra đường, nguy hiểm lắm. Cô Lý gửi thiệp sinh nhật đến nhà bạn trai.",
       "py": "Háizi bǎ zàng yīfú diū zài yùshì lǐ. 2. Nǐ zěnme méi bǎ dìzhǐ xiě zài xìnfēng shàng ne? 3. Wǒ juéde bǎ qián fàngzài yínháng bǐ fàngzài jiālǐ ānquán de duō. 4. Māma bǎ dàngāo nádào chúfáng de zhuōzi shàng. 5. Nǐ bù kěyǐ bǎ qiú tī dào mǎlùshàng, tài wéixiǎn le. 6. Lǐ xiǎojiě bǎ shēngrì kǎpiàn jì dào nánpéngyǒu jiā."
      },
      {
       "hz": "他昨天是因為生病才沒來上課的。2. 你最好再穿一件衣服，才不會覺得冷。3. 你得每天練習寫字，字才能寫得好看。",
       "vi": "Hôm qua anh ấy nghỉ học là vì bị ốm. Tốt nhất bạn nên mặc thêm một chiếc áo thì mới không thấy lạnh. Bạn phải luyện viết chữ mỗi ngày thì chữ mới đẹp được.",
       "py": "Tā zuótiān shìyīnwèi shēngbìng cái méi lái shàngkè de. 2. Nǐ zuìhǎo zài chuān yíjiàn yīfú, cái búhuì juéde lěng. 3. Nǐ děi měitiān liànxí xiězì, zì cáinéng xiě de hǎokàn."
      },
      {
       "hz": "誰做家事？",
       "vi": "Ai làm việc nhà?",
       "py": "Shéi zuò jiāshì?"
      },
      {
       "hz": "在你家，誰做這些家事？什麼時候做？(你也可以問同學)",
       "vi": "Ở nhà bạn, ai làm những việc nhà này? Làm vào lúc nào? (bạn cũng có thể hỏi bạn cùng lớp)",
       "py": "Zài nǐjiā, shéi zuò zhèxiē jiāshì? Shénme shíhòu zuò? (nǐ yě kěyǐ wèn tóngxué)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 kết hợp V 在 / V 到",
   "giaiThich": "Kết hợp mẫu 把 (xử lý đối tượng) với 在/到 để nói đưa vật gì tới đâu, đặt ở đâu."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "角色扮演：一個學生是爸爸/媽媽，一個是自己，利用提示的語法討論下面的問題，並完成對話。",
       "vi": "Đóng vai: một học sinh đóng vai bố/mẹ, một học sinh là chính mình, dùng ngữ pháp gợi ý để thảo luận các câu hỏi dưới đây và hoàn thành hội thoại.",
       "py": "Juésèbànyǎn: Yígè xuéshēng shì bàba / māma, yígè shì zìjǐ, lìyòng tíshì de yǔfǎ tǎolùn xiàmiàn de wèntí, bìng wánchéng duìhuà."
      },
      {
       "hz": "你多久打掃一次？為什麼？",
       "vi": "Bao lâu bạn dọn dẹp một lần? Tại sao?",
       "py": "Nǐ duōjiǔ dǎsǎo yícì? Wèishénme?"
      },
      {
       "hz": "你最不喜歡做什麼家事？為什麼？",
       "vi": "Bạn ghét làm việc nhà nào nhất? Tại sao?",
       "py": "Nǐ zuì bù xǐhuān zuò shénme jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得誰應該做家事？為什麼？",
       "vi": "Bạn nghĩ ai nên làm việc nhà? Tại sao?",
       "py": "Nǐ juéde shéi yīnggāi zuò jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得做家事以後，父母應該給孩子錢嗎？為什麼？",
       "vi": "Bạn có nghĩ sau khi con làm việc nhà, bố mẹ nên cho tiền không? Tại sao?",
       "py": "Nǐ juéde zuò jiāshì yǐhòu, fùmǔ yīnggāi gěi háizi qián ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "爸爸/媽媽：你的房間為什麼這麼髒?你多久沒打掃了？",
       "vi": "Bố/mẹ: Sao phòng con bẩn thế này? Bao lâu rồi con không dọn?",
       "py": "Bàba / māma: Nǐ de fángjiān wèishénme zhème zàng? Nǐ duōjiǔ méi dǎsǎo le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  }
 ],
 "td2-2.4": [
  {
   "title": "2. 我買的/把/誰/吃了/蛋糕",
   "points": [
    {
     "label": null,
     "formula": "This grammar denotes that the action of the verb is over. The “完” after the verb, used as the V complement, means to end or to finish. Pay attention to the usage of “完”.This lesson uses the complement structure to describe the end of the action instead ofusing the word “完” alone. For example, the meaning of “我完了。(I’m finished.) ”is completely different from the V 完 pattern. disposal construction 把 with resultative complement 完 請用提示完成對話。Complete the dialogues with the given words. The “V 一 V” pattern softens the tone and makes an action simple and clear. When used together with “把 construction”, it gives requests or orders in a gentler tone. However, the verb used in this pattern has to be monosyllabic. disposal construction 把 with verb reduplication 請用提示完成句子。Complete the sentences with the given words. “給” is a preposition that indicates the direction of action and marks the recipient of the Direct Object. It can collocate with verbs “拿 (to take) ”, “送 (to give) ”, “賣 (to sell) ”, “寄 (to send) ”, “踢 (to kick) ”, etc. It can also be used in 把 construction, such disposal construction 把 with preposition 給 This pattern contains “Question Word 多+Vs (as predicate)” to inquire the degree achieved. In this pattern, “有” is frequently omitted. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "把/電腦/我/舊的/賣了3. 把/小說/不要的/丟了/我/昨天",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diànnǎo / wǒ / jiù de / mài le 3. Bǎ / xiǎoshuō / búyào de / diū le / wǒ / zuótiān"
      },
      {
       "hz": "媽媽把家事做完以後，就休息了。2. 因為你沒把工作做完，所以老闆不太高興。3. 請你先聽我把話說完，你再說，好嗎?",
       "vi": "Mẹ làm xong việc nhà là nghỉ ngơi. Vì bạn chưa làm xong công việc nên ông chủ không vui lắm. Bạn hãy nghe tôi nói hết đã rồi hãy nói, được không?",
       "py": "Māma bǎ jiāshì zuò wán yǐhòu, jiù xiūxí le. 2. Yīnwèi nǐ méi bǎ gōngzuò zuò wán, suǒyǐ lǎobǎn bú tàigāoxìng. 3. Qǐng nǐ xiān tīng wǒ bǎ huà shuōwán, nǐ zàishuō, hǎo ma?"
      },
      {
       "hz": "A:你什麼時候來我家？ (書法)2. 太太:碗筷、刀叉,你都洗了嗎？ (報紙)孩子:可是我現在就想看！",
       "vi": "A: Khi nào bạn đến nhà tôi? (thư pháp) Vợ: Bát đũa, dao nĩa, con rửa hết chưa? (báo) Con: Nhưng con muốn xem ngay bây giờ!",
       "py": "A: Nǐ shénme shíhòu lái wǒjiā? (shūfǎ) 2. Tàitai: Wǎnkuài, dāochā, nǐ dōu xǐ le ma? (bàozhǐ) háizi: Kěshì wǒ xiànzài jiù xiǎng kàn!"
      },
      {
       "hz": "你沒把蘋果洗一洗就吃了，如果肚子疼怎麼辦？\t2.下課以後，我先把教室裡的桌子、椅子排一排再回家。\t3. 太太:我覺得頭很疼，你可以幫我做家事嗎？先生:沒問題！我先把地掃一掃，等孩子回來以後，再把他們的髒衣服洗一洗。",
       "vi": "Bạn chưa rửa táo đã ăn, nếu đau bụng thì làm sao? Tan học xong, tôi sắp xếp lại bàn ghế trong lớp rồi mới về nhà. Vợ: Em thấy đau đầu quá, anh làm việc nhà giúp em được không? Chồng: Không vấn đề gì! Anh quét nhà trước, đợi bọn trẻ về rồi giặt quần áo bẩn cho chúng.",
       "py": "Nǐ méi bǎ píngguǒ xǐ yì xǐ jiù chī le, rúguǒ dùziténg zěnmebàn? 2. Xiàkè yǐhòu, wǒ xiān bǎ jiàoshì lǐ de zhuōzi, yǐzi pái yìpái zài huíjiā. 3. Tàitai: Wǒ juéde tóu hěn téng, nǐ kěyǐ bāng wǒ zuò jiāshì ma? Xiānshēng: Méi wèntí! Wǒ xiān bǎ dì sǎo yì sǎo, děng háizi huílái yǐhòu, zài bǎ tāmen de zàng yīfú xǐ yì xǐ."
      },
      {
       "hz": "孩子:我晚一點兒再擦,現在要跟朋友去看球賽呢!",
       "vi": "Con: Lát nữa con lau, bây giờ con đi xem đá bóng với bạn!",
       "py": "Háizi: Wǒ wǎn yìdiǎn'ér zài cā, xiànzài yào gēn péngyǒu qù kànqiúsài ne!"
      },
      {
       "hz": "我昨天把那些小說送給朋友了。2. 王先生為什麼不想把舊車賣給你?3. A:你昨天為什麼沒把感冒藥拿給孩子吃? B:醫生說那個藥是給大人吃的,不可以給小孩吃。",
       "vi": "Hôm qua tôi đã tặng những quyển tiểu thuyết đó cho bạn. Tại sao anh Vương không muốn bán xe cũ cho bạn? A: Sao hôm qua bạn không đưa thuốc cảm cho con uống? B: Bác sĩ nói thuốc đó dành cho người lớn, không được cho trẻ con uống.",
       "py": "Wǒ zuótiān bǎ nàxiē xiǎoshuō sònggěi péngyǒu le. 2. Wáng xiānshēng wèishénme bùxiǎng bǎ jiùchē mài gěi nǐ? 3. A: Nǐ zuótiān wèishénme méi bǎ gǎnmàoyào nágěi háizi chī? B: Yīshēng shuō nàge yào shì gěi dàrén chī de, bù kěyǐ gěi xiǎohái chī."
      },
      {
       "hz": "as “我把你做的蛋糕送給朋友了。”.",
       "vi": "Ví dụ: “Tôi đã tặng bánh kem bạn làm cho bạn tôi rồi.”",
       "py": "As “wǒ bǎ nǐ zuò de dàngāo sònggěi péngyǒu le.”."
      },
      {
       "hz": "我/把/就/禮物/昨天/送給/了/張小姐。",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Wǒ / bǎ / jiù / lǐwù / zuótiān / sònggěi / le / Zhāng xiǎojiě."
      },
      {
       "hz": "把/沒/哥哥/媽媽/寄給/是不是/生日卡片？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / méi / gēge / māma / jìgěi / shìbúshì / shēngrì kǎpiàn?"
      },
      {
       "hz": "你/把/我/聽/嗎/可以/那首/唱給/中文歌？",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Nǐ / bǎ / wǒ / tīng / ma / kěyǐ / nà shǒu / chàng gěi / zhōngwén gē?"
      },
      {
       "hz": "A:你家離學校(有)多遠？ B:我家離學校很遠,走路差不多要五十分鐘。2. A:那張桌子(有)多長？ B:那張桌子(有)八十公分。3. A:你知道合歡山(有)多高嗎？ B:差不多三千五百公尺。",
       "vi": "A: Nhà bạn cách trường bao xa? B: Nhà tôi cách trường rất xa, đi bộ mất khoảng năm mươi phút. A: Cái bàn đó dài bao nhiêu? B: Cái bàn đó dài tám mươi phân. A: Bạn có biết núi Hợp Hoan cao bao nhiêu không? B: Khoảng ba nghìn năm trăm mét.",
       "py": "A: Nǐjiā lí xuéxiào (yǒu) duō yuǎn? B: Wǒjiā lí xuéxiào hěn yuǎn, zǒulù chàbuduō yào wǔshífēnzhōng. 2. A: Nà zhāng zhuōzi (yǒu) duōzhǎng? B: Nà zhāng zhuōzi (yǒu) bā shígōngfēn. 3. A: Nǐ zhīdào héhuānshān (yǒu) duō gāo ma? B: Chàbuduō sānqiānwǔbǎi gōngchǐ."
      },
      {
       "hz": "B：我妹妹今年十八歲。",
       "vi": "B: Năm nay em gái tôi mười tám tuổi.",
       "py": "B: Wǒ mèimei jīnnián shíbāsuì."
      },
      {
       "hz": "B：一張(要)八千元。",
       "vi": "B: Một vé tám nghìn đồng.",
       "py": "B: Yīzhāng (yào) bāqiānyuán."
      },
      {
       "hz": "B：我現在七十五公斤了。",
       "vi": "B: Bây giờ tôi nặng bảy mươi lăm cân rồi.",
       "py": "B: Wǒ xiànzài qīshíwǔ gōngjīn le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 把 và V 完",
   "giaiThich": "Phần luyện tập: sắp xếp câu có 把; chú ý bổ ngữ 完 (làm xong) đứng sau động từ."
  },
  {
   "title": "III. Time-duration 沒V(O)了/time-duration 不V(O)",
   "points": [
    {
     "label": null,
     "formula": "Didn’t do something for a period of time This pattern, always including a negation word “不” or “沒,” indicates the time duration of a certain situation in which an action has yet to happen.",
     "examples": [
      {
       "hz": "我已經兩天沒睡覺了,真累!2. 你想，如果山本良介半年不說中文，他還記得怎麼說嗎?3. A:他的房間有老鼠！ B:真的嗎？他多久沒打掃了？",
       "vi": "Tôi đã hai ngày không ngủ rồi, mệt thật! Bạn thử nghĩ xem, nếu Yamamoto Ryosuke nửa năm không nói tiếng Trung, cậu ấy còn nhớ cách nói không? A: Phòng anh ấy có chuột! B: Thật à? Bao lâu rồi anh ấy không dọn dẹp?",
       "py": "Wǒ yǐjīng liǎngtiān méi shuìjiào le, zhēnlèi! 2. Nǐ xiǎng, rúguǒ shānběn Liángjiè bànnián bù shuō zhōngwén, tā hái jìde zěnme shuō ma? 3. A: Tā de fángjiān yǒu lǎoshǔ! B: Zhēnde ma? Tā duōjiǔ méi dǎsǎo le?"
      },
      {
       "hz": "A：林先生非常不喜歡說話。",
       "vi": "A: Anh Lâm rất không thích nói chuyện.",
       "py": "A: Lín xiānshēng fēicháng bù xǐhuān shuōhuà."
      },
      {
       "hz": "A：為什麼你今天一定要去運動？",
       "vi": "A: Sao hôm nay bạn nhất định phải đi tập thể dục?",
       "py": "A: Wèishénme nǐ jīntiān yídìng yào qù yùndòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bao lâu rồi không làm gì",
   "giaiThich": "Mẫu có 不 hoặc 沒, nêu khoảng thời gian một việc CHƯA xảy ra (\"bao lâu rồi chưa…\")."
  },
  {
   "title": "IV. QW+都/也 all-inclusive with question words+都/也",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, question words may co-occur with “都”or “也”in declarative sentences to indicate entirety. That is, in affirmative sentences, this pattern indicates total inclusion, while in negative ones, it indicates total exclusion.",
     "examples": [
      {
       "hz": "錢先生哪國語言都會說。2. 我不舒服,什麼都不想吃。3. 我剛剛到台灣,誰也不認識。4. 中國菜很有名,哪裡都有中國餐廳。5. 這個字很難,我怎麼寫都不對。",
       "vi": "Anh Tiền nói được tiếng của nước nào cũng được. Tôi khó chịu, không muốn ăn gì cả. Tôi mới đến Đài Loan, không quen ai cả. Món ăn Trung Hoa rất nổi tiếng, ở đâu cũng có nhà hàng Trung Hoa. Chữ này khó quá, tôi viết thế nào cũng sai.",
       "py": "Qián xiānshēng nǎ guó yǔyán dōu huì shuō. 2. Wǒ bù shūfú, shénme dōu bùxiǎng chī. 3. Wǒ gānggāng dào Táiwān, shéi yě bú rènshì. 4. Zhōngguó cài hěn yǒumíng, nǎlǐ dōu yǒu Zhōngguó cāntīng. 5. Zhège zì hěn nán, wǒ zěnme xiě dōu bú duì."
      },
      {
       "hz": "A：我們什麼時候去看電影？",
       "vi": "A: Khi nào chúng ta đi xem phim?",
       "py": "A: Wǒmen shénme shíhòu qù kàn diànyǐng?"
      },
      {
       "hz": "A：你覺得我穿哪一件衣服好看？",
       "vi": "A: Bạn thấy tôi mặc bộ nào đẹp?",
       "py": "A: Nǐ juéde wǒ chuān nǎ yíjiàn yīfú hǎokàn?"
      },
      {
       "hz": "A：放暑假的時候，你想去哪裡玩？",
       "vi": "A: Nghỉ hè bạn muốn đi chơi đâu?",
       "py": "A: Fàngshǔjià de shíhòu, nǐ xiǎng qù nǎlǐ wán?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi + 都 / 也 — bao gồm tất cả",
   "giaiThich": "Từ để hỏi (誰, 什麼, 哪裡…) đi với 都 hoặc 也 trong câu trần thuật mang nghĩa \"ai/gì/đâu cũng…\"; câu phủ định thì thành \"chẳng ai/gì/đâu…\"."
  },
  {
   "title": "V. 又 again",
   "points": [
    {
     "label": null,
     "formula": "“又” means the repetition of the same action or the reappearance of similar situation.“再” and “又” both mean repetition. However, “再” emphasizes the intention to repeat certain actions, so it can be used in imperative sentences and placed after modal verbs, e.g., “請再說一次” (Please say it again.) and “我想再喝一杯”. (I’d  like to have another drink.) “又” is used after certain actions or showing the intention of performing the action. “又” mostly collocates with “了” or “沒” and is placed before the modal verbs. e.g., “我又說了一次” (I said that again.) and “我又想喝了”(I wanted to drink again.)",
     "examples": [
      {
       "hz": "他剛剛吃了一碗牛肉麵和三個包子，現在又餓了。2. 金先生上個月買的書都看完了，今天又要去買書了。3. 他去美國旅行了兩個星期以後，又去越南玩了五天。",
       "vi": "Anh ấy vừa ăn một bát mì bò và ba cái bánh bao, bây giờ lại đói rồi. Sách anh Kim mua tháng trước đã đọc hết, hôm nay lại muốn đi mua sách nữa. Sau khi đi Mỹ du lịch hai tuần, anh ấy lại sang Việt Nam chơi năm ngày.",
       "py": "Tā gānggāng chī le yìwǎn niúròumiàn hàn sāngè bāozi, xiànzài yòu è le. 2. Jīn xiānshēng shànggèyuè mǎi de shū dōu kàn wán le, jīntiān yòu yào qù mǎi shū le. 3. Tā qù Měiguó lǚxíng le liǎnggè xīngqí yǐhòu, yòu qù Yuènán wán le wǔtiān."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "又 — lại (lần nữa)",
   "giaiThich": "又 chỉ việc lặp lại đã XẢY RA. Phân biệt với 再: 再 nói về ý định lặp lại trong tương lai."
  },
  {
   "title": "VI. Time + 才 +V longer/later than expected with 才",
   "points": [
    {
     "label": null,
     "formula": "“才” implies that an action happened or will happen later than expected. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "我昨天太累了，所以今天早上十一點才起來。2. A：你是上個月從英國到台灣的嗎？ B：不是，我是昨天才到的。3. A：我們什麼時候要考試？我還沒準備，怎麼辦？ B：我們下個禮拜才考，你還有時間準備。",
       "vi": "Hôm qua tôi mệt quá, nên sáng nay mười một giờ mới dậy. A: Bạn từ Anh sang Đài Loan hồi tháng trước à? B: Không, hôm qua tôi mới đến. A: Khi nào chúng ta thi? Tôi vẫn chưa ôn, làm sao đây? B: Tuần sau chúng ta mới thi, bạn vẫn còn thời gian ôn.",
       "py": "Wǒ zuótiān tài lèi le, suǒyǐ jīntiān zǎoshàng shíyìdiǎn cái qǐlái. 2. A: Nǐ shì shànggèyuè cóng Yīngguó dào Táiwān de ma? B: Búshì, wǒ shì zuótiān cái dào de. 3. A: Wǒmen shénme shíhòu yào kǎoshì? Wǒ hái méi zhǔnbèi, zěnmebàn? B: Wǒmen xià gè lǐbài cái kǎo, nǐ háiyǒu shíjiān zhǔnbèi."
      },
      {
       "hz": "A：聽說你這個週末要去日本？(下個週末)2. A：趕快起來！你早上八點有中文課！(早上十點)3. A：你明天晚上要不要跟我一起去看籃球比賽？(後天)",
       "vi": "A: Nghe nói cuối tuần này bạn đi Nhật à? (cuối tuần sau) A: Mau dậy đi! Tám giờ sáng con có tiết tiếng Trung! (mười giờ sáng) A: Tối mai bạn có muốn đi xem bóng rổ với tôi không? (ngày kia)",
       "py": "A: Tīngshuō nǐ zhège zhōumò yào qù Rìběn? (xià gè zhōumò) 2. A: Gǎnkuài qǐlái! Nǐ zǎoshàng bādiǎn yǒu zhōngwén kè! (zǎoshàng shídiǎn) 3. A: Nǐ míngtiān wǎnshàng yào búyào gēn wǒ yìqǐ qù kàn lánqiúbǐsài? (hòutiān)"
      },
      {
       "hz": "良介在哪些地方看見垃圾？",
       "vi": "Ryosuke thấy rác ở những chỗ nào?",
       "py": "Liángjiè zài nǎxiēdìfāng kànjiàn lèsè?"
      },
      {
       "hz": "良介為什麼沒把垃圾丟了？",
       "vi": "Tại sao Ryosuke không vứt rác đi?",
       "py": "Liángjiè wèishénme méi bǎ lèsè diū le?"
      },
      {
       "hz": "為什麼宿舍的空氣不好？",
       "vi": "Tại sao không khí trong ký túc xá không tốt?",
       "py": "Wèishénme sùshè de kōngqì bùhǎo?"
      },
      {
       "hz": "在良介家，良介應該做哪些家事？為什麼？",
       "vi": "Ở nhà Ryosuke, Ryosuke nên làm những việc nhà nào? Tại sao?",
       "py": "Zài Liángjiè jiā, Liángjiè yīnggāi zuò nǎxiē jiāshì? Wèishénme?"
      },
      {
       "hz": "良介覺得打掃是誰的事？為什麼？",
       "vi": "Ryosuke nghĩ dọn dẹp là việc của ai? Tại sao?",
       "py": "Liángjiè juéde dǎsǎo shì shéi de shì? Wèishénme?"
      },
      {
       "hz": "你覺得那個地方以後會怎麼樣？為什麼？",
       "vi": "Bạn nghĩ sau này nơi đó sẽ thế nào? Tại sao?",
       "py": "Nǐ juéde nàge dìfāng yǐhòu huì zěnmeyàng? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — mãi mới, muộn hơn dự tính",
   "giaiThich": "才 cho biết việc xảy ra MUỘN hơn mong đợi (\"mãi tới… mới…\")."
  },
  {
   "title": "I. S (+Neg)+把+N+V在/V到…",
   "points": [
    {
     "label": null,
     "formula": "disposal construction 把 with V 在 and V 到 patterns This pattern is the combination of “S (+Neg)+把+ N+ V+ Complement” (see the first grammar after the dialogue in this lesson) and “V在” (see the first grammar after the text in Lesson One) and “V到”. It indicates the location or place of the Object after 請用提示完成對話。Complete the dialogues with given words. II. …，才… condition and consequence with 才 In this pattern, the adverb “才”in the second clause is used to show consequences when the conditions and causes in the first clause are fulfilled. Thus,”得(have to)”, “要(need to )”, “為了(In order to )”,and “因為” (because)” are often used in the first clause of this pattern. 請用提示完成對話。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "孩子把髒衣服丟在浴室裡。2. 你怎麼沒把地址寫在信封上呢?3. 我覺得把錢放在銀行比放在家裡安全得多。4. 媽媽把蛋糕拿到廚房的桌子上。5. 你不可以把球踢到馬路上,太危險了。6. 李小姐把生日卡片寄到男朋友家。",
       "vi": "Đứa bé vứt quần áo bẩn trong phòng tắm. Sao bạn không viết địa chỉ lên phong bì? Tôi thấy để tiền trong ngân hàng an toàn hơn để ở nhà nhiều. Mẹ mang bánh kem đến bàn trong bếp. Bạn không được đá bóng ra đường, nguy hiểm lắm. Cô Lý gửi thiệp sinh nhật đến nhà bạn trai.",
       "py": "Háizi bǎ zàng yīfú diū zài yùshì lǐ. 2. Nǐ zěnme méi bǎ dìzhǐ xiě zài xìnfēng shàng ne? 3. Wǒ juéde bǎ qián fàngzài yínháng bǐ fàngzài jiālǐ ānquán de duō. 4. Māma bǎ dàngāo nádào chúfáng de zhuōzi shàng. 5. Nǐ bù kěyǐ bǎ qiú tī dào mǎlùshàng, tài wéixiǎn le. 6. Lǐ xiǎojiě bǎ shēngrì kǎpiàn jì dào nánpéngyǒu jiā."
      },
      {
       "hz": "他昨天是因為生病才沒來上課的。2. 你最好再穿一件衣服，才不會覺得冷。3. 你得每天練習寫字，字才能寫得好看。",
       "vi": "Hôm qua anh ấy nghỉ học là vì bị ốm. Tốt nhất bạn nên mặc thêm một chiếc áo thì mới không thấy lạnh. Bạn phải luyện viết chữ mỗi ngày thì chữ mới đẹp được.",
       "py": "Tā zuótiān shìyīnwèi shēngbìng cái méi lái shàngkè de. 2. Nǐ zuìhǎo zài chuān yíjiàn yīfú, cái búhuì juéde lěng. 3. Nǐ děi měitiān liànxí xiězì, zì cáinéng xiě de hǎokàn."
      },
      {
       "hz": "誰做家事？",
       "vi": "Ai làm việc nhà?",
       "py": "Shéi zuò jiāshì?"
      },
      {
       "hz": "在你家，誰做這些家事？什麼時候做？(你也可以問同學)",
       "vi": "Ở nhà bạn, ai làm những việc nhà này? Làm vào lúc nào? (bạn cũng có thể hỏi bạn cùng lớp)",
       "py": "Zài nǐjiā, shéi zuò zhèxiē jiāshì? Shénme shíhòu zuò? (nǐ yě kěyǐ wèn tóngxué)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "把 kết hợp V 在 / V 到",
   "giaiThich": "Kết hợp mẫu 把 (xử lý đối tượng) với 在/到 để nói đưa vật gì tới đâu, đặt ở đâu."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "角色扮演：一個學生是爸爸/媽媽，一個是自己，利用提示的語法討論下面的問題，並完成對話。",
       "vi": "Đóng vai: một học sinh đóng vai bố/mẹ, một học sinh là chính mình, dùng ngữ pháp gợi ý để thảo luận các câu hỏi dưới đây và hoàn thành hội thoại.",
       "py": "Juésèbànyǎn: Yígè xuéshēng shì bàba / māma, yígè shì zìjǐ, lìyòng tíshì de yǔfǎ tǎolùn xiàmiàn de wèntí, bìng wánchéng duìhuà."
      },
      {
       "hz": "你多久打掃一次？為什麼？",
       "vi": "Bao lâu bạn dọn dẹp một lần? Tại sao?",
       "py": "Nǐ duōjiǔ dǎsǎo yícì? Wèishénme?"
      },
      {
       "hz": "你最不喜歡做什麼家事？為什麼？",
       "vi": "Bạn ghét làm việc nhà nào nhất? Tại sao?",
       "py": "Nǐ zuì bù xǐhuān zuò shénme jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得誰應該做家事？為什麼？",
       "vi": "Bạn nghĩ ai nên làm việc nhà? Tại sao?",
       "py": "Nǐ juéde shéi yīnggāi zuò jiāshì? Wèishénme?"
      },
      {
       "hz": "你覺得做家事以後，父母應該給孩子錢嗎？為什麼？",
       "vi": "Bạn có nghĩ sau khi con làm việc nhà, bố mẹ nên cho tiền không? Tại sao?",
       "py": "Nǐ juéde zuò jiāshì yǐhòu, fùmǔ yīnggāi gěi háizi qián ma? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  },
  {
   "title": "2. 大家一起做家事",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "爸爸/媽媽：你的房間為什麼這麼髒?你多久沒打掃了？",
       "vi": "Bố/mẹ: Sao phòng con bẩn thế này? Bao lâu rồi con không dọn?",
       "py": "Bàba / māma: Nǐ de fángjiān wèishénme zhème zàng? Nǐ duōjiǔ méi dǎsǎo le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: cùng nhau làm việc nhà",
   "giaiThich": "Phần luyện tập hội thoại theo chủ đề việc nhà."
  }
 ],
 "td2-3.1": [
  {
   "title": "1. 老師很滿意大家這次期中考的",
   "points": [
    {
     "label": null,
     "formula": "A directional compound describes the direction of the action. The structures include:(1) directional verb +來/去, (2)motion verb + directional verb + 來/去,  (3) motion verb + direction verb + location +來/去,(4) combined with 把 construction to indicate the Subject moves the Object to another location：S +把+ O+ motion verb + directional verb + ( location)+來/去. (三) motion verb + directional verb + location + 來/去 (四) combined with 「把」：把+ object+ motion verb +",
     "examples": [
      {
       "hz": "這次期中考，大家都考得很好，老師覺得很滿意。",
       "vi": "Kỳ thi giữa kỳ lần này mọi người đều làm bài rất tốt, thầy giáo rất hài lòng.",
       "py": "Zhècì qízhōngkǎo, dàjiā dōu kǎo de hěn hǎo, lǎoshī juéde hěn mǎnyì."
      },
      {
       "hz": "趨向補語 V+DV+來/去 — bổ ngữ chỉ hướng",
       "vi": "Bổ ngữ xu hướng: động từ + bổ ngữ chỉ hướng + 來/去",
       "py": "Qūxiàng bǔyǔ V + DV + lái / qù— b ổ ng ữ ch ỉ h ư ớ ng"
      },
      {
       "hz": "我的房間在二樓，請上來。",
       "vi": "Phòng tôi ở tầng hai, mời lên đây.",
       "py": "Wǒ de fángjiān zài èrlóu, qǐngshànglái."
      },
      {
       "hz": "爸爸有事找你，你趕快過去。",
       "vi": "Bố có việc tìm con, con mau qua đó đi.",
       "py": "Bàba yǒushì zhǎo nǐ, nǐ gǎnkuài guòqù."
      },
      {
       "hz": "他出去一會兒，五分鐘以後就回來。",
       "vi": "Anh ấy ra ngoài một lát, năm phút nữa sẽ về.",
       "py": "Tā chūqù yíhuì'er, wǔfēnzhōng yǐhòu jiù huílái."
      },
      {
       "hz": "那些髒衣服不要放進衣櫃裡去。",
       "vi": "Đừng cất những quần áo bẩn đó vào tủ.",
       "py": "Nàxiē zàng yīfú búyào fàngjìn yīguì lǐ qù."
      },
      {
       "hz": "這些中文書，山本良介都要帶回日本去。",
       "vi": "Những quyển sách tiếng Trung này, Yamamoto Ryosuke đều muốn mang về Nhật.",
       "py": "Zhèxiē zhōng wénshū, shānběn Liángjiè dōu yào dàihuí Rìběn qù."
      },
      {
       "hz": "路上的車很多，那個人從對面跑過街來，真危險!",
       "vi": "Trên đường rất nhiều xe, người kia chạy băng qua đường từ phía đối diện, nguy hiểm thật!",
       "py": "Lùshàng de chē hěnduō, nàge rén cóng duìmiàn pǎo guò jiē lái, zhēn wéixiǎn!"
      },
      {
       "hz": "請你把那張書桌搬過來。",
       "vi": "Bạn hãy bê cái bàn học đó qua đây.",
       "py": "Qǐng nǐ bǎ nà zhāng shūzhuō bān guòlái."
      },
      {
       "hz": "姐姐把她的衣服拿上樓去了。",
       "vi": "Chị đã mang quần áo của chị lên lầu rồi.",
       "py": "Jiějie bǎ tā de yīfú ná shànglóuqù le."
      },
      {
       "hz": "我還沒把褲子從洗衣機裡拿出來。",
       "vi": "Tôi vẫn chưa lấy quần ra khỏi máy giặt.",
       "py": "Wǒ hái méi bǎ kùzi cóng xǐyījī lǐ ná chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ xu hướng (đi lại)",
   "giaiThich": "Bổ ngữ xu hướng chỉ hướng của hành động: (1) động từ xu hướng + 來/去, (2) động từ chuyển động + động từ xu hướng + 來/去, (3) động từ chuyển động + động từ xu hướng + nơi chốn + 來/去."
  },
  {
   "title": "1. 把/家/我/沒/書/昨天/帶/回/去",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "把/丟/孩子/垃圾/進/去/袋子裡3. 桌子/我/擦/要，拿/請/杯子/來/把/起/你",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diū / háizi / lèsè / jìn / qù / dàizi lǐ 3. Zhuōzi / wǒ / cā / yào, ná / qǐng / bēizi / lái / bǎ / qǐ / nǐ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu có 把",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu dùng 把."
  },
  {
   "title": "II. reduplication of verbs XY→XYXY",
   "points": [
    {
     "label": null,
     "formula": "The reduplication of disyllabic verb, with the structure XYXY, creates a casual tone and implies the Subject is going to do something and the action is not going to take long. Note that this pattern cannot be used along with “一下 (in a while)” and “一點 (a little bit)”. e.g., “討論討論一下” is considered to be a wrong usage.",
     "examples": [
      {
       "hz": "他們都是我的同學，我給你介紹介紹。2. 我還沒決定要不要去留學，我要和父母討論討論。3. 弟弟的房間有一點兒髒，這個週末他要打掃打掃。",
       "vi": "Họ đều là bạn học của tôi, để tôi giới thiệu cho bạn. Tôi vẫn chưa quyết định có đi du học không, tôi phải bàn bạc với bố mẹ. Phòng em trai hơi bẩn, cuối tuần này em phải dọn dẹp một chút.",
       "py": "Tāmen dōu shì wǒ de tóngxué, wǒ gěi nǐ jièshào jièshào. 2. Wǒ hái méi juédìng yào búyào qù liúxué, wǒ yào hàn fùmǔ tǎolùn tǎolùn. 3. Dìdi de fángjiān yǒu yìdiǎn'ér zàng, zhège zhōumò tā yào dǎsǎo dǎsǎo."
      },
      {
       "hz": "‧歡迎 ‧慶祝 ‧認識 ‧休息 ‧練習",
       "vi": "‧ chào đón ‧ chúc mừng ‧ quen biết ‧ nghỉ ngơi ‧ luyện tập",
       "py": "‧ huānyíng ‧ qìngzhù ‧ rènshì ‧ xiūxí ‧ liànxí"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lặp động từ hai âm tiết XYXY",
   "giaiThich": "Lặp động từ hai âm tiết (XYXY) tạo giọng nhẹ nhàng, ý là làm một chút, làm nhanh thôi."
  },
  {
   "title": "III. judgemental-V 起來 It’s my assessment that…",
   "points": [
    {
     "label": null,
     "formula": "The pattern is used to make comments on someone or something. The verb placed before ”起來” is \toften  a monosyllabic sensory verb or action verb, such as “看(look)”, ”聽(sound)”, ”吃(taste)”, ”喝\t(drink)”, ”穿(wear)”, etc. ”起來” is followed by comments; thus , the structure is “V 起來+ (Adv) +Vs”. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "A：王小姐看起來很害羞。 B：是啊！她不敢跟不熟的男生說話。2. A：明天放假，我們去動物園吧！ B：聽起來不錯，我們幾點去呢？3. A：這件裙子是今年最流行的。 B：看起來不錯，你穿起來應該很好看。",
       "vi": "A: Cô Vương trông rất nhút nhát. B: Đúng vậy! Cô ấy không dám nói chuyện với con trai lạ. A: Mai được nghỉ, chúng ta đi sở thú nhé! B: Nghe hay đấy, mấy giờ chúng ta đi? A: Chiếc váy này thịnh hành nhất năm nay. B: Trông đẹp đấy, bạn mặc vào chắc sẽ rất đẹp.",
       "py": "A: Wáng xiǎojiě kànqǐlái hěn hàixiū. B: Shì a! Tā bùgǎn gēn bù shú de nánshēng shuōhuà. 2. A: Míngtiān fàngjià, wǒmen qù dòngwùyuán ba! B: Tīng qǐlái búcuò, wǒmen jǐdiǎn qù ne? 3. A: Zhèjiàn qúnzi shì jīnnián zuì liúxíng de. B: Kànqǐlái búcuò, nǐ chuān qǐlái yīnggāi hěn hǎokàn."
      },
      {
       "hz": "哥哥 : 媽媽今天做的雞湯看起來很好喝。(喝)2. A：離這裡最近的捷運站，走路要二十分鐘。(聽)3. 先生：我覺得這個房子不錯，交通也很方便。(住)",
       "vi": "Anh trai: Canh gà mẹ nấu hôm nay trông ngon quá. (uống) A: Ga tàu điện ngầm gần đây nhất đi bộ mất hai mươi phút. (nghe) Chồng: Anh thấy căn nhà này được đấy, giao thông cũng rất tiện. (ở)",
       "py": "Gēge: Māma jīntiān zuò de jītāng kànqǐlái hěn hǎohē. (hē) 2. A: Lí zhèlǐ zuìjìn de jiéyùn zhàn, zǒulù yào èrshífēnzhōng. (tīng) 3. Xiānshēng: Wǒ juéde zhège fángzi búcuò, jiāotōng yě hěn fāngbiàn. (zhù)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 起來 — nhận xét, cảm thấy",
   "giaiThich": "Dùng để nhận xét về người hoặc vật. Trước 起來 thường là động từ tri giác đơn âm: 看 (nhìn), 聽 (nghe), 吃 (ăn), 喝 (uống)…"
  },
  {
   "title": "IV. 替 for, on behalf of",
   "points": [
    {
     "label": null,
     "formula": "“替” is used in the situation when a person cannot do something for something for some reason and finds someone else to do it for him. The pattern indicates there are different situations coming after “ 除了” and “還 ”, with the latter one being even more important than the former. “除了”can be followed by nouns, verbs, intransitive state verbs (Vs) or phrases. If the Subjects of the two clauses are different, the second Subject should be placed before “還 ”, as in example 2. II. \tS+把+O+V得+Adv+Vs     to dispose of something with 把 In this pattern, “把” is followed by the Object that receives the action of a verb, while “V 得” is followed by the outcome after the action.",
     "examples": [
      {
       "hz": "你可以替我裝網路嗎？費用我自己付。2. 昨天王老師不舒服，所以林老師替他上課。3. 孩子應該自己打掃房間，父母不要常常替他們做。",
       "vi": "Bạn lắp mạng giúp tôi được không? Chi phí tôi tự trả. Hôm qua thầy Vương không khoẻ, nên thầy Lâm dạy thay. Con cái nên tự dọn phòng, bố mẹ đừng thường xuyên làm thay.",
       "py": "Nǐ kěyǐ tì wǒ zhuāng wǎnglù ma? Fèiyòng wǒ zìjǐ fù. 2. Zuótiān Wáng lǎoshī bù shūfú, suǒyǐ Lín lǎoshī tì tā shàngkè. 3. Háizi yīnggāi zìjǐ dǎsǎo fángjiān, fùmǔ búyào chángcháng tì tāmen zuò."
      },
      {
       "hz": "A : 我忘了帶錢包,怎麼辦？",
       "vi": "A: Tôi quên mang ví, làm sao đây?",
       "py": "A: Wǒ wàng le dài qiánbāo, zěnmebàn?"
      },
      {
       "hz": "A：明天我有事不能去上班，你可以幫我嗎？",
       "vi": "A: Ngày mai tôi có việc không đi làm được, bạn giúp tôi được không?",
       "py": "A: Míngtiān wǒ yǒushì bùnéng qù shàngbān, nǐ kěyǐ bāng wǒ ma?"
      },
      {
       "hz": "弟弟：我不知道怎麼寫這個作業，你可以替我寫嗎？",
       "vi": "Em trai: Em không biết làm bài tập này, anh làm giúp em được không?",
       "py": "Dìdi: Wǒ bù zhīdào zěnme xiě zhège zuòyè, nǐ kěyǐ tì wǒ xiě ma?"
      },
      {
       "hz": "良介為什麼想搬家？",
       "vi": "Tại sao Ryosuke muốn chuyển nhà?",
       "py": "Liángjiè wèishénme xiǎng bānjiā?"
      },
      {
       "hz": "良介找房子的時候有什麼問題？",
       "vi": "Khi tìm nhà Ryosuke gặp vấn đề gì?",
       "py": "Liángjiè zhǎo fángzi de shíhòu yǒu shénme wèntí?"
      },
      {
       "hz": "房東為什麼收良介比較便宜的房租？",
       "vi": "Tại sao chủ nhà lấy tiền thuê của Ryosuke rẻ hơn?",
       "py": "Fángdōng wèishénme shōu Liángjiè bǐjiào piányi de fángzū?"
      },
      {
       "hz": "如果你是良介，你會搬出去住嗎？為什麼？",
       "vi": "Nếu bạn là Ryosuke, bạn có dọn ra ngoài ở không? Tại sao?",
       "py": "Rúguǒ nǐ shì Liángjiè, nǐ huì bānchūqù zhù ma? Wèishénme?"
      },
      {
       "hz": "你現在住的地方環境怎麼樣？你想搬家嗎？為什麼？",
       "vi": "Môi trường chỗ bạn đang ở thế nào? Bạn có muốn chuyển nhà không? Tại sao?",
       "py": "Nǐ xiànzài zhù de dìfāng huánjìng zěnmeyàng? Nǐ xiǎng bānjiā ma? Wèishénme?"
      },
      {
       "hz": "如果你是房東，你願意把房子租給外國人嗎？為什麼？",
       "vi": "Nếu bạn là chủ nhà, bạn có muốn cho người nước ngoài thuê nhà không? Tại sao?",
       "py": "Rúguǒ nǐ shì fángdōng, nǐ yuànyì bǎ fángzi zūgěi wàiguórén ma? Wèishénme?"
      },
      {
       "hz": "我除了喜歡吃蘋果，還喜歡吃香蕉。2. 很多人喜歡來這裡旅行，除了風景很好，交通還很方便。3. A : 白小姐生日的時候，男朋友送給她一個很貴的皮包。 B : 除了皮包，還送給她一輛車呢!",
       "vi": "Ngoài táo ra, tôi còn thích ăn chuối. Nhiều người thích đến đây du lịch, ngoài phong cảnh đẹp, giao thông còn rất tiện. A: Sinh nhật cô Bạch, bạn trai tặng cô ấy một chiếc túi xách rất đắt. B: Ngoài túi xách, còn tặng cô ấy một chiếc xe hơi nữa đấy!",
       "py": "Wǒ chúle xǐhuān chī píngguǒ, hái xǐhuān chī xiāngjiāo. 2. Hěnduō rén xǐhuān lái zhèlǐ lǚxíng, chúle fēngjǐng hěn hǎo, jiāotōng hái hěn fāngbiàn. 3. A: Bái xiǎojiě shēngrì de shíhòu, nánpéngyǒu sònggěi tā yígè hěn guì de píbāo. B: Chúle píbāo, hái sònggěi tā yíliàngchē ne!"
      },
      {
       "hz": "A : 學校外面有沒有便利商店？",
       "vi": "A: Bên ngoài trường có cửa hàng tiện lợi không?",
       "py": "A: Xuéxiào wàimiàn yǒuméiyǒu biànlìshāngdiàn?"
      },
      {
       "hz": "A : 那棟公寓看起來不錯，你為什麼不租？",
       "vi": "A: Căn hộ đó trông được đấy, sao bạn không thuê?",
       "py": "A: Nàdòng gōngyù kànqǐlái búcuò, nǐ wèishénme bù zū?"
      },
      {
       "hz": "A : 你為什麼要搬出去？宿舍不好嗎？",
       "vi": "A: Sao bạn lại muốn dọn ra ngoài? Ký túc xá không tốt à?",
       "py": "A: Nǐ wèishénme yào bānchūqù? Sùshè bùhǎo ma?"
      },
      {
       "hz": "所以我要搬家。",
       "vi": "Nên tôi muốn chuyển nhà.",
       "py": "Suǒyǐ wǒ yào bānjiā."
      },
      {
       "hz": "弟弟把足球踢得很遠。2. 他把那隻兔子畫得很可愛。3.姐姐：你怎麼把我的書桌弄得這麼髒！妹妹：對不起，我馬上擦乾淨。",
       "vi": "Em trai đá quả bóng đi rất xa. Anh ấy vẽ con thỏ đó rất dễ thương. Chị: Sao em làm bàn học của chị bẩn thế này! Em: Em xin lỗi, em lau sạch ngay.",
       "py": "Dìdi bǎ zúqiú tī de hěn yuǎn. 2. Tā bǎ nà zhī tùzi huà de hěn kě'ài. 3. Jiějie: Nǐ zěnme bǎ wǒ de shūzhuō nòng de zhème zàng! Mèimei: Duìbùqǐ, wǒ mǎshàng cā gānjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "替 — thay cho, giúp cho",
   "giaiThich": "替 dùng khi một người vì lý do nào đó không làm được, nhờ người khác làm thay."
  },
  {
   "title": "1. 妹妹 / 臥室 / 很乾淨 / 得 / 把 / 打掃 / 昨天",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "名字 / 得 / 那麼 / 你 / 把 / 自己的 / 寫 / 為什麼 / 難看 / ?",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Míngzì / de / nàme / nǐ / bǎ / zìjǐ de / xiě / wèishénme / nánkàn /?"
      },
      {
       "hz": "林小姐 / 客廳 / 弄 / 很漂亮 / 新家 / 的 / 得 / 把",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Lín xiǎojiě / kètīng / nòng / hěnpiàoliàng / xīn jiā / de / de / bǎ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập câu 把 với bổ ngữ",
   "giaiThich": "Phần luyện tập: sắp xếp thành câu có 把 kèm bổ ngữ mức độ (得)."
  },
  {
   "title": "1. 租屋網站",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "新北市北區大學路8巷36號4樓有網路/第四台：不包括電費、水費最短租期：一年床/桌子/椅子/衣櫃/沙發/電視/冰箱/冷氣/洗衣機/熱水器近便利商店、百貨公司、學校、公園",
       "vi": "Tầng 4, số 36, hẻm 8, đường Đại Học, khu Bắc, thành phố Tân Bắc. Có mạng internet / truyền hình cáp; không bao gồm tiền điện, tiền nước; thời hạn thuê tối thiểu: một năm. Giường / bàn / ghế / tủ quần áo / sofa / tivi / tủ lạnh / điều hoà / máy giặt / bình nóng lạnh. Gần cửa hàng tiện lợi, trung tâm thương mại, trường học, công viên.",
       "py": "Xīn běi shìběiqū dàxué lù 8 xiàng 36 hào 4 lóu yǒu wǎnglù / dìsì tái: Bù bāokuò diànfèi, shuǐfèi zuì duǎn zūqí: Yìnián chuáng / zhuōzi / yǐzi / yīguì / shāfā / diànshì / bīngxiāng / lěngqì / xǐyījī / rèshuǐqì jìn biànlìshāngdiàn, bǎihuògōngsī, xuéxiào, gōngyuán"
      },
      {
       "hz": "請回答下面的問題：房租包括哪些費用？",
       "vi": "Hãy trả lời các câu hỏi dưới đây: Tiền thuê nhà bao gồm những khoản nào?",
       "py": "Qǐng huídá xiàmiàn de wèntí: Fángzū bāokuò nǎxiē fèiyòng?"
      },
      {
       "hz": "這個套房在公寓的幾樓？",
       "vi": "Căn hộ khép kín này ở tầng mấy của toà nhà?",
       "py": "Zhège tàofáng zài gōngyù de jǐlóu?"
      },
      {
       "hz": "要給多少押金？最短要租多久？",
       "vi": "Phải đặt cọc bao nhiêu? Thuê tối thiểu bao lâu?",
       "py": "Yào gěi duōshǎo yājīn? Zuì duǎn yào zū duōjiǔ?"
      },
      {
       "hz": "在這個套房裡可以做飯嗎？",
       "vi": "Trong căn hộ này có được nấu ăn không?",
       "py": "Zài zhège tàofáng lǐ kěyǐ zuòfàn ma?"
      },
      {
       "hz": "房東提供什麼家具？",
       "vi": "Chủ nhà cung cấp những đồ nội thất gì?",
       "py": "Fángdōng tígōng shénme jiājù?"
      },
      {
       "hz": "家具應該放在哪裡？",
       "vi": "Đồ nội thất nên đặt ở đâu?",
       "py": "Jiājù yīnggāi fàngzài nǎlǐ?"
      },
      {
       "hz": "你和家人搬到一個新公寓，你們買了很多新家具，請使用下面的語法討論家具應該放在哪裡。",
       "vi": "Bạn và gia đình chuyển đến một căn hộ mới, mua rất nhiều đồ nội thất mới, hãy dùng ngữ pháp dưới đây để thảo luận nên đặt đồ nội thất ở đâu.",
       "py": "Nǐ hàn jiārén bān dào yígè xīn gōngyù, nǐmen mǎi le hěnduō xīnjiājù, qǐng shǐyòng xiàmiàn de yǔfǎ tǎolùn jiājù yīnggāi fàngzài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: thuê nhà",
   "giaiThich": "Phần luyện tập theo chủ đề tìm nhà, thuê nhà."
  }
 ],
 "td2-3.2": [
  {
   "title": "1. 老師很滿意大家這次期中考的",
   "points": [
    {
     "label": null,
     "formula": "A directional compound describes the direction of the action. The structures include:(1) directional verb +來/去, (2)motion verb + directional verb + 來/去,  (3) motion verb + direction verb + location +來/去,(4) combined with 把 construction to indicate the Subject moves the Object to another location：S +把+ O+ motion verb + directional verb + ( location)+來/去. (三) motion verb + directional verb + location + 來/去 (四) combined with 「把」：把+ object+ motion verb +",
     "examples": [
      {
       "hz": "這次期中考，大家都考得很好，老師覺得很滿意。",
       "vi": "Kỳ thi giữa kỳ lần này mọi người đều làm bài rất tốt, thầy giáo rất hài lòng.",
       "py": "Zhècì qízhōngkǎo, dàjiā dōu kǎo de hěn hǎo, lǎoshī juéde hěn mǎnyì."
      },
      {
       "hz": "趨向補語 V+DV+來/去 — bổ ngữ chỉ hướng",
       "vi": "Bổ ngữ xu hướng: động từ + bổ ngữ chỉ hướng + 來/去",
       "py": "Qūxiàng bǔyǔ V + DV + lái / qù— b ổ ng ữ ch ỉ h ư ớ ng"
      },
      {
       "hz": "我的房間在二樓，請上來。",
       "vi": "Phòng tôi ở tầng hai, mời lên đây.",
       "py": "Wǒ de fángjiān zài èrlóu, qǐngshànglái."
      },
      {
       "hz": "爸爸有事找你，你趕快過去。",
       "vi": "Bố có việc tìm con, con mau qua đó đi.",
       "py": "Bàba yǒushì zhǎo nǐ, nǐ gǎnkuài guòqù."
      },
      {
       "hz": "他出去一會兒，五分鐘以後就回來。",
       "vi": "Anh ấy ra ngoài một lát, năm phút nữa sẽ về.",
       "py": "Tā chūqù yíhuì'er, wǔfēnzhōng yǐhòu jiù huílái."
      },
      {
       "hz": "那些髒衣服不要放進衣櫃裡去。",
       "vi": "Đừng cất những quần áo bẩn đó vào tủ.",
       "py": "Nàxiē zàng yīfú búyào fàngjìn yīguì lǐ qù."
      },
      {
       "hz": "這些中文書，山本良介都要帶回日本去。",
       "vi": "Những quyển sách tiếng Trung này, Yamamoto Ryosuke đều muốn mang về Nhật.",
       "py": "Zhèxiē zhōng wénshū, shānběn Liángjiè dōu yào dàihuí Rìběn qù."
      },
      {
       "hz": "路上的車很多，那個人從對面跑過街來，真危險!",
       "vi": "Trên đường rất nhiều xe, người kia chạy băng qua đường từ phía đối diện, nguy hiểm thật!",
       "py": "Lùshàng de chē hěnduō, nàge rén cóng duìmiàn pǎo guò jiē lái, zhēn wéixiǎn!"
      },
      {
       "hz": "請你把那張書桌搬過來。",
       "vi": "Bạn hãy bê cái bàn học đó qua đây.",
       "py": "Qǐng nǐ bǎ nà zhāng shūzhuō bān guòlái."
      },
      {
       "hz": "姐姐把她的衣服拿上樓去了。",
       "vi": "Chị đã mang quần áo của chị lên lầu rồi.",
       "py": "Jiějie bǎ tā de yīfú ná shànglóuqù le."
      },
      {
       "hz": "我還沒把褲子從洗衣機裡拿出來。",
       "vi": "Tôi vẫn chưa lấy quần ra khỏi máy giặt.",
       "py": "Wǒ hái méi bǎ kùzi cóng xǐyījī lǐ ná chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ xu hướng (đi lại)",
   "giaiThich": "Bổ ngữ xu hướng chỉ hướng của hành động: (1) động từ xu hướng + 來/去, (2) động từ chuyển động + động từ xu hướng + 來/去, (3) động từ chuyển động + động từ xu hướng + nơi chốn + 來/去."
  },
  {
   "title": "1. 把/家/我/沒/書/昨天/帶/回/去",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "把/丟/孩子/垃圾/進/去/袋子裡3. 桌子/我/擦/要，拿/請/杯子/來/把/起/你",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diū / háizi / lèsè / jìn / qù / dàizi lǐ 3. Zhuōzi / wǒ / cā / yào, ná / qǐng / bēizi / lái / bǎ / qǐ / nǐ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu có 把",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu dùng 把."
  },
  {
   "title": "II. reduplication of verbs XY→XYXY",
   "points": [
    {
     "label": null,
     "formula": "The reduplication of disyllabic verb, with the structure XYXY, creates a casual tone and implies the Subject is going to do something and the action is not going to take long. Note that this pattern cannot be used along with “一下 (in a while)” and “一點 (a little bit)”. e.g., “討論討論一下” is considered to be a wrong usage.",
     "examples": [
      {
       "hz": "他們都是我的同學，我給你介紹介紹。2. 我還沒決定要不要去留學，我要和父母討論討論。3. 弟弟的房間有一點兒髒，這個週末他要打掃打掃。",
       "vi": "Họ đều là bạn học của tôi, để tôi giới thiệu cho bạn. Tôi vẫn chưa quyết định có đi du học không, tôi phải bàn bạc với bố mẹ. Phòng em trai hơi bẩn, cuối tuần này em phải dọn dẹp một chút.",
       "py": "Tāmen dōu shì wǒ de tóngxué, wǒ gěi nǐ jièshào jièshào. 2. Wǒ hái méi juédìng yào búyào qù liúxué, wǒ yào hàn fùmǔ tǎolùn tǎolùn. 3. Dìdi de fángjiān yǒu yìdiǎn'ér zàng, zhège zhōumò tā yào dǎsǎo dǎsǎo."
      },
      {
       "hz": "‧歡迎 ‧慶祝 ‧認識 ‧休息 ‧練習",
       "vi": "‧ chào đón ‧ chúc mừng ‧ quen biết ‧ nghỉ ngơi ‧ luyện tập",
       "py": "‧ huānyíng ‧ qìngzhù ‧ rènshì ‧ xiūxí ‧ liànxí"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lặp động từ hai âm tiết XYXY",
   "giaiThich": "Lặp động từ hai âm tiết (XYXY) tạo giọng nhẹ nhàng, ý là làm một chút, làm nhanh thôi."
  },
  {
   "title": "III. judgemental-V 起來 It’s my assessment that…",
   "points": [
    {
     "label": null,
     "formula": "The pattern is used to make comments on someone or something. The verb placed before ”起來” is \toften  a monosyllabic sensory verb or action verb, such as “看(look)”, ”聽(sound)”, ”吃(taste)”, ”喝\t(drink)”, ”穿(wear)”, etc. ”起來” is followed by comments; thus , the structure is “V 起來+ (Adv) +Vs”. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "A：王小姐看起來很害羞。 B：是啊！她不敢跟不熟的男生說話。2. A：明天放假，我們去動物園吧！ B：聽起來不錯，我們幾點去呢？3. A：這件裙子是今年最流行的。 B：看起來不錯，你穿起來應該很好看。",
       "vi": "A: Cô Vương trông rất nhút nhát. B: Đúng vậy! Cô ấy không dám nói chuyện với con trai lạ. A: Mai được nghỉ, chúng ta đi sở thú nhé! B: Nghe hay đấy, mấy giờ chúng ta đi? A: Chiếc váy này thịnh hành nhất năm nay. B: Trông đẹp đấy, bạn mặc vào chắc sẽ rất đẹp.",
       "py": "A: Wáng xiǎojiě kànqǐlái hěn hàixiū. B: Shì a! Tā bùgǎn gēn bù shú de nánshēng shuōhuà. 2. A: Míngtiān fàngjià, wǒmen qù dòngwùyuán ba! B: Tīng qǐlái búcuò, wǒmen jǐdiǎn qù ne? 3. A: Zhèjiàn qúnzi shì jīnnián zuì liúxíng de. B: Kànqǐlái búcuò, nǐ chuān qǐlái yīnggāi hěn hǎokàn."
      },
      {
       "hz": "哥哥 : 媽媽今天做的雞湯看起來很好喝。(喝)2. A：離這裡最近的捷運站，走路要二十分鐘。(聽)3. 先生：我覺得這個房子不錯，交通也很方便。(住)",
       "vi": "Anh trai: Canh gà mẹ nấu hôm nay trông ngon quá. (uống) A: Ga tàu điện ngầm gần đây nhất đi bộ mất hai mươi phút. (nghe) Chồng: Anh thấy căn nhà này được đấy, giao thông cũng rất tiện. (ở)",
       "py": "Gēge: Māma jīntiān zuò de jītāng kànqǐlái hěn hǎohē. (hē) 2. A: Lí zhèlǐ zuìjìn de jiéyùn zhàn, zǒulù yào èrshífēnzhōng. (tīng) 3. Xiānshēng: Wǒ juéde zhège fángzi búcuò, jiāotōng yě hěn fāngbiàn. (zhù)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 起來 — nhận xét, cảm thấy",
   "giaiThich": "Dùng để nhận xét về người hoặc vật. Trước 起來 thường là động từ tri giác đơn âm: 看 (nhìn), 聽 (nghe), 吃 (ăn), 喝 (uống)…"
  },
  {
   "title": "IV. 替 for, on behalf of",
   "points": [
    {
     "label": null,
     "formula": "“替” is used in the situation when a person cannot do something for something for some reason and finds someone else to do it for him. The pattern indicates there are different situations coming after “ 除了” and “還 ”, with the latter one being even more important than the former. “除了”can be followed by nouns, verbs, intransitive state verbs (Vs) or phrases. If the Subjects of the two clauses are different, the second Subject should be placed before “還 ”, as in example 2. II. \tS+把+O+V得+Adv+Vs     to dispose of something with 把 In this pattern, “把” is followed by the Object that receives the action of a verb, while “V 得” is followed by the outcome after the action.",
     "examples": [
      {
       "hz": "你可以替我裝網路嗎？費用我自己付。2. 昨天王老師不舒服，所以林老師替他上課。3. 孩子應該自己打掃房間，父母不要常常替他們做。",
       "vi": "Bạn lắp mạng giúp tôi được không? Chi phí tôi tự trả. Hôm qua thầy Vương không khoẻ, nên thầy Lâm dạy thay. Con cái nên tự dọn phòng, bố mẹ đừng thường xuyên làm thay.",
       "py": "Nǐ kěyǐ tì wǒ zhuāng wǎnglù ma? Fèiyòng wǒ zìjǐ fù. 2. Zuótiān Wáng lǎoshī bù shūfú, suǒyǐ Lín lǎoshī tì tā shàngkè. 3. Háizi yīnggāi zìjǐ dǎsǎo fángjiān, fùmǔ búyào chángcháng tì tāmen zuò."
      },
      {
       "hz": "A : 我忘了帶錢包,怎麼辦？",
       "vi": "A: Tôi quên mang ví, làm sao đây?",
       "py": "A: Wǒ wàng le dài qiánbāo, zěnmebàn?"
      },
      {
       "hz": "A：明天我有事不能去上班，你可以幫我嗎？",
       "vi": "A: Ngày mai tôi có việc không đi làm được, bạn giúp tôi được không?",
       "py": "A: Míngtiān wǒ yǒushì bùnéng qù shàngbān, nǐ kěyǐ bāng wǒ ma?"
      },
      {
       "hz": "弟弟：我不知道怎麼寫這個作業，你可以替我寫嗎？",
       "vi": "Em trai: Em không biết làm bài tập này, anh làm giúp em được không?",
       "py": "Dìdi: Wǒ bù zhīdào zěnme xiě zhège zuòyè, nǐ kěyǐ tì wǒ xiě ma?"
      },
      {
       "hz": "良介為什麼想搬家？",
       "vi": "Tại sao Ryosuke muốn chuyển nhà?",
       "py": "Liángjiè wèishénme xiǎng bānjiā?"
      },
      {
       "hz": "良介找房子的時候有什麼問題？",
       "vi": "Khi tìm nhà Ryosuke gặp vấn đề gì?",
       "py": "Liángjiè zhǎo fángzi de shíhòu yǒu shénme wèntí?"
      },
      {
       "hz": "房東為什麼收良介比較便宜的房租？",
       "vi": "Tại sao chủ nhà lấy tiền thuê của Ryosuke rẻ hơn?",
       "py": "Fángdōng wèishénme shōu Liángjiè bǐjiào piányi de fángzū?"
      },
      {
       "hz": "如果你是良介，你會搬出去住嗎？為什麼？",
       "vi": "Nếu bạn là Ryosuke, bạn có dọn ra ngoài ở không? Tại sao?",
       "py": "Rúguǒ nǐ shì Liángjiè, nǐ huì bānchūqù zhù ma? Wèishénme?"
      },
      {
       "hz": "你現在住的地方環境怎麼樣？你想搬家嗎？為什麼？",
       "vi": "Môi trường chỗ bạn đang ở thế nào? Bạn có muốn chuyển nhà không? Tại sao?",
       "py": "Nǐ xiànzài zhù de dìfāng huánjìng zěnmeyàng? Nǐ xiǎng bānjiā ma? Wèishénme?"
      },
      {
       "hz": "如果你是房東，你願意把房子租給外國人嗎？為什麼？",
       "vi": "Nếu bạn là chủ nhà, bạn có muốn cho người nước ngoài thuê nhà không? Tại sao?",
       "py": "Rúguǒ nǐ shì fángdōng, nǐ yuànyì bǎ fángzi zūgěi wàiguórén ma? Wèishénme?"
      },
      {
       "hz": "我除了喜歡吃蘋果，還喜歡吃香蕉。2. 很多人喜歡來這裡旅行，除了風景很好，交通還很方便。3. A : 白小姐生日的時候，男朋友送給她一個很貴的皮包。 B : 除了皮包，還送給她一輛車呢!",
       "vi": "Ngoài táo ra, tôi còn thích ăn chuối. Nhiều người thích đến đây du lịch, ngoài phong cảnh đẹp, giao thông còn rất tiện. A: Sinh nhật cô Bạch, bạn trai tặng cô ấy một chiếc túi xách rất đắt. B: Ngoài túi xách, còn tặng cô ấy một chiếc xe hơi nữa đấy!",
       "py": "Wǒ chúle xǐhuān chī píngguǒ, hái xǐhuān chī xiāngjiāo. 2. Hěnduō rén xǐhuān lái zhèlǐ lǚxíng, chúle fēngjǐng hěn hǎo, jiāotōng hái hěn fāngbiàn. 3. A: Bái xiǎojiě shēngrì de shíhòu, nánpéngyǒu sònggěi tā yígè hěn guì de píbāo. B: Chúle píbāo, hái sònggěi tā yíliàngchē ne!"
      },
      {
       "hz": "A : 學校外面有沒有便利商店？",
       "vi": "A: Bên ngoài trường có cửa hàng tiện lợi không?",
       "py": "A: Xuéxiào wàimiàn yǒuméiyǒu biànlìshāngdiàn?"
      },
      {
       "hz": "A : 那棟公寓看起來不錯，你為什麼不租？",
       "vi": "A: Căn hộ đó trông được đấy, sao bạn không thuê?",
       "py": "A: Nàdòng gōngyù kànqǐlái búcuò, nǐ wèishénme bù zū?"
      },
      {
       "hz": "A : 你為什麼要搬出去？宿舍不好嗎？",
       "vi": "A: Sao bạn lại muốn dọn ra ngoài? Ký túc xá không tốt à?",
       "py": "A: Nǐ wèishénme yào bānchūqù? Sùshè bùhǎo ma?"
      },
      {
       "hz": "所以我要搬家。",
       "vi": "Nên tôi muốn chuyển nhà.",
       "py": "Suǒyǐ wǒ yào bānjiā."
      },
      {
       "hz": "弟弟把足球踢得很遠。2. 他把那隻兔子畫得很可愛。3.姐姐：你怎麼把我的書桌弄得這麼髒！妹妹：對不起，我馬上擦乾淨。",
       "vi": "Em trai đá quả bóng đi rất xa. Anh ấy vẽ con thỏ đó rất dễ thương. Chị: Sao em làm bàn học của chị bẩn thế này! Em: Em xin lỗi, em lau sạch ngay.",
       "py": "Dìdi bǎ zúqiú tī de hěn yuǎn. 2. Tā bǎ nà zhī tùzi huà de hěn kě'ài. 3. Jiějie: Nǐ zěnme bǎ wǒ de shūzhuō nòng de zhème zàng! Mèimei: Duìbùqǐ, wǒ mǎshàng cā gānjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "替 — thay cho, giúp cho",
   "giaiThich": "替 dùng khi một người vì lý do nào đó không làm được, nhờ người khác làm thay."
  },
  {
   "title": "1. 妹妹 / 臥室 / 很乾淨 / 得 / 把 / 打掃 / 昨天",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "名字 / 得 / 那麼 / 你 / 把 / 自己的 / 寫 / 為什麼 / 難看 / ?",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Míngzì / de / nàme / nǐ / bǎ / zìjǐ de / xiě / wèishénme / nánkàn /?"
      },
      {
       "hz": "林小姐 / 客廳 / 弄 / 很漂亮 / 新家 / 的 / 得 / 把",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Lín xiǎojiě / kètīng / nòng / hěnpiàoliàng / xīn jiā / de / de / bǎ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập câu 把 với bổ ngữ",
   "giaiThich": "Phần luyện tập: sắp xếp thành câu có 把 kèm bổ ngữ mức độ (得)."
  },
  {
   "title": "1. 租屋網站",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "新北市北區大學路8巷36號4樓有網路/第四台：不包括電費、水費最短租期：一年床/桌子/椅子/衣櫃/沙發/電視/冰箱/冷氣/洗衣機/熱水器近便利商店、百貨公司、學校、公園",
       "vi": "Tầng 4, số 36, hẻm 8, đường Đại Học, khu Bắc, thành phố Tân Bắc. Có mạng internet / truyền hình cáp; không bao gồm tiền điện, tiền nước; thời hạn thuê tối thiểu: một năm. Giường / bàn / ghế / tủ quần áo / sofa / tivi / tủ lạnh / điều hoà / máy giặt / bình nóng lạnh. Gần cửa hàng tiện lợi, trung tâm thương mại, trường học, công viên.",
       "py": "Xīn běi shìběiqū dàxué lù 8 xiàng 36 hào 4 lóu yǒu wǎnglù / dìsì tái: Bù bāokuò diànfèi, shuǐfèi zuì duǎn zūqí: Yìnián chuáng / zhuōzi / yǐzi / yīguì / shāfā / diànshì / bīngxiāng / lěngqì / xǐyījī / rèshuǐqì jìn biànlìshāngdiàn, bǎihuògōngsī, xuéxiào, gōngyuán"
      },
      {
       "hz": "請回答下面的問題：房租包括哪些費用？",
       "vi": "Hãy trả lời các câu hỏi dưới đây: Tiền thuê nhà bao gồm những khoản nào?",
       "py": "Qǐng huídá xiàmiàn de wèntí: Fángzū bāokuò nǎxiē fèiyòng?"
      },
      {
       "hz": "這個套房在公寓的幾樓？",
       "vi": "Căn hộ khép kín này ở tầng mấy của toà nhà?",
       "py": "Zhège tàofáng zài gōngyù de jǐlóu?"
      },
      {
       "hz": "要給多少押金？最短要租多久？",
       "vi": "Phải đặt cọc bao nhiêu? Thuê tối thiểu bao lâu?",
       "py": "Yào gěi duōshǎo yājīn? Zuì duǎn yào zū duōjiǔ?"
      },
      {
       "hz": "在這個套房裡可以做飯嗎？",
       "vi": "Trong căn hộ này có được nấu ăn không?",
       "py": "Zài zhège tàofáng lǐ kěyǐ zuòfàn ma?"
      },
      {
       "hz": "房東提供什麼家具？",
       "vi": "Chủ nhà cung cấp những đồ nội thất gì?",
       "py": "Fángdōng tígōng shénme jiājù?"
      },
      {
       "hz": "家具應該放在哪裡？",
       "vi": "Đồ nội thất nên đặt ở đâu?",
       "py": "Jiājù yīnggāi fàngzài nǎlǐ?"
      },
      {
       "hz": "你和家人搬到一個新公寓，你們買了很多新家具，請使用下面的語法討論家具應該放在哪裡。",
       "vi": "Bạn và gia đình chuyển đến một căn hộ mới, mua rất nhiều đồ nội thất mới, hãy dùng ngữ pháp dưới đây để thảo luận nên đặt đồ nội thất ở đâu.",
       "py": "Nǐ hàn jiārén bān dào yígè xīn gōngyù, nǐmen mǎi le hěnduō xīnjiājù, qǐng shǐyòng xiàmiàn de yǔfǎ tǎolùn jiājù yīnggāi fàngzài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: thuê nhà",
   "giaiThich": "Phần luyện tập theo chủ đề tìm nhà, thuê nhà."
  }
 ],
 "td2-3.3": [
  {
   "title": "1. 老師很滿意大家這次期中考的",
   "points": [
    {
     "label": null,
     "formula": "A directional compound describes the direction of the action. The structures include:(1) directional verb +來/去, (2)motion verb + directional verb + 來/去,  (3) motion verb + direction verb + location +來/去,(4) combined with 把 construction to indicate the Subject moves the Object to another location：S +把+ O+ motion verb + directional verb + ( location)+來/去. (三) motion verb + directional verb + location + 來/去 (四) combined with 「把」：把+ object+ motion verb +",
     "examples": [
      {
       "hz": "這次期中考，大家都考得很好，老師覺得很滿意。",
       "vi": "Kỳ thi giữa kỳ lần này mọi người đều làm bài rất tốt, thầy giáo rất hài lòng.",
       "py": "Zhècì qízhōngkǎo, dàjiā dōu kǎo de hěn hǎo, lǎoshī juéde hěn mǎnyì."
      },
      {
       "hz": "趨向補語 V+DV+來/去 — bổ ngữ chỉ hướng",
       "vi": "Bổ ngữ xu hướng: động từ + bổ ngữ chỉ hướng + 來/去",
       "py": "Qūxiàng bǔyǔ V + DV + lái / qù— b ổ ng ữ ch ỉ h ư ớ ng"
      },
      {
       "hz": "我的房間在二樓，請上來。",
       "vi": "Phòng tôi ở tầng hai, mời lên đây.",
       "py": "Wǒ de fángjiān zài èrlóu, qǐngshànglái."
      },
      {
       "hz": "爸爸有事找你，你趕快過去。",
       "vi": "Bố có việc tìm con, con mau qua đó đi.",
       "py": "Bàba yǒushì zhǎo nǐ, nǐ gǎnkuài guòqù."
      },
      {
       "hz": "他出去一會兒，五分鐘以後就回來。",
       "vi": "Anh ấy ra ngoài một lát, năm phút nữa sẽ về.",
       "py": "Tā chūqù yíhuì'er, wǔfēnzhōng yǐhòu jiù huílái."
      },
      {
       "hz": "那些髒衣服不要放進衣櫃裡去。",
       "vi": "Đừng cất những quần áo bẩn đó vào tủ.",
       "py": "Nàxiē zàng yīfú búyào fàngjìn yīguì lǐ qù."
      },
      {
       "hz": "這些中文書，山本良介都要帶回日本去。",
       "vi": "Những quyển sách tiếng Trung này, Yamamoto Ryosuke đều muốn mang về Nhật.",
       "py": "Zhèxiē zhōng wénshū, shānběn Liángjiè dōu yào dàihuí Rìběn qù."
      },
      {
       "hz": "路上的車很多，那個人從對面跑過街來，真危險!",
       "vi": "Trên đường rất nhiều xe, người kia chạy băng qua đường từ phía đối diện, nguy hiểm thật!",
       "py": "Lùshàng de chē hěnduō, nàge rén cóng duìmiàn pǎo guò jiē lái, zhēn wéixiǎn!"
      },
      {
       "hz": "請你把那張書桌搬過來。",
       "vi": "Bạn hãy bê cái bàn học đó qua đây.",
       "py": "Qǐng nǐ bǎ nà zhāng shūzhuō bān guòlái."
      },
      {
       "hz": "姐姐把她的衣服拿上樓去了。",
       "vi": "Chị đã mang quần áo của chị lên lầu rồi.",
       "py": "Jiějie bǎ tā de yīfú ná shànglóuqù le."
      },
      {
       "hz": "我還沒把褲子從洗衣機裡拿出來。",
       "vi": "Tôi vẫn chưa lấy quần ra khỏi máy giặt.",
       "py": "Wǒ hái méi bǎ kùzi cóng xǐyījī lǐ ná chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ xu hướng (đi lại)",
   "giaiThich": "Bổ ngữ xu hướng chỉ hướng của hành động: (1) động từ xu hướng + 來/去, (2) động từ chuyển động + động từ xu hướng + 來/去, (3) động từ chuyển động + động từ xu hướng + nơi chốn + 來/去."
  },
  {
   "title": "1. 把/家/我/沒/書/昨天/帶/回/去",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "把/丟/孩子/垃圾/進/去/袋子裡3. 桌子/我/擦/要，拿/請/杯子/來/把/起/你",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diū / háizi / lèsè / jìn / qù / dàizi lǐ 3. Zhuōzi / wǒ / cā / yào, ná / qǐng / bēizi / lái / bǎ / qǐ / nǐ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu có 把",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu dùng 把."
  },
  {
   "title": "II. reduplication of verbs XY→XYXY",
   "points": [
    {
     "label": null,
     "formula": "The reduplication of disyllabic verb, with the structure XYXY, creates a casual tone and implies the Subject is going to do something and the action is not going to take long. Note that this pattern cannot be used along with “一下 (in a while)” and “一點 (a little bit)”. e.g., “討論討論一下” is considered to be a wrong usage.",
     "examples": [
      {
       "hz": "他們都是我的同學，我給你介紹介紹。2. 我還沒決定要不要去留學，我要和父母討論討論。3. 弟弟的房間有一點兒髒，這個週末他要打掃打掃。",
       "vi": "Họ đều là bạn học của tôi, để tôi giới thiệu cho bạn. Tôi vẫn chưa quyết định có đi du học không, tôi phải bàn bạc với bố mẹ. Phòng em trai hơi bẩn, cuối tuần này em phải dọn dẹp một chút.",
       "py": "Tāmen dōu shì wǒ de tóngxué, wǒ gěi nǐ jièshào jièshào. 2. Wǒ hái méi juédìng yào búyào qù liúxué, wǒ yào hàn fùmǔ tǎolùn tǎolùn. 3. Dìdi de fángjiān yǒu yìdiǎn'ér zàng, zhège zhōumò tā yào dǎsǎo dǎsǎo."
      },
      {
       "hz": "‧歡迎 ‧慶祝 ‧認識 ‧休息 ‧練習",
       "vi": "‧ chào đón ‧ chúc mừng ‧ quen biết ‧ nghỉ ngơi ‧ luyện tập",
       "py": "‧ huānyíng ‧ qìngzhù ‧ rènshì ‧ xiūxí ‧ liànxí"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lặp động từ hai âm tiết XYXY",
   "giaiThich": "Lặp động từ hai âm tiết (XYXY) tạo giọng nhẹ nhàng, ý là làm một chút, làm nhanh thôi."
  },
  {
   "title": "III. judgemental-V 起來 It’s my assessment that…",
   "points": [
    {
     "label": null,
     "formula": "The pattern is used to make comments on someone or something. The verb placed before ”起來” is \toften  a monosyllabic sensory verb or action verb, such as “看(look)”, ”聽(sound)”, ”吃(taste)”, ”喝\t(drink)”, ”穿(wear)”, etc. ”起來” is followed by comments; thus , the structure is “V 起來+ (Adv) +Vs”. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "A：王小姐看起來很害羞。 B：是啊！她不敢跟不熟的男生說話。2. A：明天放假，我們去動物園吧！ B：聽起來不錯，我們幾點去呢？3. A：這件裙子是今年最流行的。 B：看起來不錯，你穿起來應該很好看。",
       "vi": "A: Cô Vương trông rất nhút nhát. B: Đúng vậy! Cô ấy không dám nói chuyện với con trai lạ. A: Mai được nghỉ, chúng ta đi sở thú nhé! B: Nghe hay đấy, mấy giờ chúng ta đi? A: Chiếc váy này thịnh hành nhất năm nay. B: Trông đẹp đấy, bạn mặc vào chắc sẽ rất đẹp.",
       "py": "A: Wáng xiǎojiě kànqǐlái hěn hàixiū. B: Shì a! Tā bùgǎn gēn bù shú de nánshēng shuōhuà. 2. A: Míngtiān fàngjià, wǒmen qù dòngwùyuán ba! B: Tīng qǐlái búcuò, wǒmen jǐdiǎn qù ne? 3. A: Zhèjiàn qúnzi shì jīnnián zuì liúxíng de. B: Kànqǐlái búcuò, nǐ chuān qǐlái yīnggāi hěn hǎokàn."
      },
      {
       "hz": "哥哥 : 媽媽今天做的雞湯看起來很好喝。(喝)2. A：離這裡最近的捷運站，走路要二十分鐘。(聽)3. 先生：我覺得這個房子不錯，交通也很方便。(住)",
       "vi": "Anh trai: Canh gà mẹ nấu hôm nay trông ngon quá. (uống) A: Ga tàu điện ngầm gần đây nhất đi bộ mất hai mươi phút. (nghe) Chồng: Anh thấy căn nhà này được đấy, giao thông cũng rất tiện. (ở)",
       "py": "Gēge: Māma jīntiān zuò de jītāng kànqǐlái hěn hǎohē. (hē) 2. A: Lí zhèlǐ zuìjìn de jiéyùn zhàn, zǒulù yào èrshífēnzhōng. (tīng) 3. Xiānshēng: Wǒ juéde zhège fángzi búcuò, jiāotōng yě hěn fāngbiàn. (zhù)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 起來 — nhận xét, cảm thấy",
   "giaiThich": "Dùng để nhận xét về người hoặc vật. Trước 起來 thường là động từ tri giác đơn âm: 看 (nhìn), 聽 (nghe), 吃 (ăn), 喝 (uống)…"
  },
  {
   "title": "IV. 替 for, on behalf of",
   "points": [
    {
     "label": null,
     "formula": "“替” is used in the situation when a person cannot do something for something for some reason and finds someone else to do it for him. The pattern indicates there are different situations coming after “ 除了” and “還 ”, with the latter one being even more important than the former. “除了”can be followed by nouns, verbs, intransitive state verbs (Vs) or phrases. If the Subjects of the two clauses are different, the second Subject should be placed before “還 ”, as in example 2. II. \tS+把+O+V得+Adv+Vs     to dispose of something with 把 In this pattern, “把” is followed by the Object that receives the action of a verb, while “V 得” is followed by the outcome after the action.",
     "examples": [
      {
       "hz": "你可以替我裝網路嗎？費用我自己付。2. 昨天王老師不舒服，所以林老師替他上課。3. 孩子應該自己打掃房間，父母不要常常替他們做。",
       "vi": "Bạn lắp mạng giúp tôi được không? Chi phí tôi tự trả. Hôm qua thầy Vương không khoẻ, nên thầy Lâm dạy thay. Con cái nên tự dọn phòng, bố mẹ đừng thường xuyên làm thay.",
       "py": "Nǐ kěyǐ tì wǒ zhuāng wǎnglù ma? Fèiyòng wǒ zìjǐ fù. 2. Zuótiān Wáng lǎoshī bù shūfú, suǒyǐ Lín lǎoshī tì tā shàngkè. 3. Háizi yīnggāi zìjǐ dǎsǎo fángjiān, fùmǔ búyào chángcháng tì tāmen zuò."
      },
      {
       "hz": "A : 我忘了帶錢包,怎麼辦？",
       "vi": "A: Tôi quên mang ví, làm sao đây?",
       "py": "A: Wǒ wàng le dài qiánbāo, zěnmebàn?"
      },
      {
       "hz": "A：明天我有事不能去上班，你可以幫我嗎？",
       "vi": "A: Ngày mai tôi có việc không đi làm được, bạn giúp tôi được không?",
       "py": "A: Míngtiān wǒ yǒushì bùnéng qù shàngbān, nǐ kěyǐ bāng wǒ ma?"
      },
      {
       "hz": "弟弟：我不知道怎麼寫這個作業，你可以替我寫嗎？",
       "vi": "Em trai: Em không biết làm bài tập này, anh làm giúp em được không?",
       "py": "Dìdi: Wǒ bù zhīdào zěnme xiě zhège zuòyè, nǐ kěyǐ tì wǒ xiě ma?"
      },
      {
       "hz": "良介為什麼想搬家？",
       "vi": "Tại sao Ryosuke muốn chuyển nhà?",
       "py": "Liángjiè wèishénme xiǎng bānjiā?"
      },
      {
       "hz": "良介找房子的時候有什麼問題？",
       "vi": "Khi tìm nhà Ryosuke gặp vấn đề gì?",
       "py": "Liángjiè zhǎo fángzi de shíhòu yǒu shénme wèntí?"
      },
      {
       "hz": "房東為什麼收良介比較便宜的房租？",
       "vi": "Tại sao chủ nhà lấy tiền thuê của Ryosuke rẻ hơn?",
       "py": "Fángdōng wèishénme shōu Liángjiè bǐjiào piányi de fángzū?"
      },
      {
       "hz": "如果你是良介，你會搬出去住嗎？為什麼？",
       "vi": "Nếu bạn là Ryosuke, bạn có dọn ra ngoài ở không? Tại sao?",
       "py": "Rúguǒ nǐ shì Liángjiè, nǐ huì bānchūqù zhù ma? Wèishénme?"
      },
      {
       "hz": "你現在住的地方環境怎麼樣？你想搬家嗎？為什麼？",
       "vi": "Môi trường chỗ bạn đang ở thế nào? Bạn có muốn chuyển nhà không? Tại sao?",
       "py": "Nǐ xiànzài zhù de dìfāng huánjìng zěnmeyàng? Nǐ xiǎng bānjiā ma? Wèishénme?"
      },
      {
       "hz": "如果你是房東，你願意把房子租給外國人嗎？為什麼？",
       "vi": "Nếu bạn là chủ nhà, bạn có muốn cho người nước ngoài thuê nhà không? Tại sao?",
       "py": "Rúguǒ nǐ shì fángdōng, nǐ yuànyì bǎ fángzi zūgěi wàiguórén ma? Wèishénme?"
      },
      {
       "hz": "我除了喜歡吃蘋果，還喜歡吃香蕉。2. 很多人喜歡來這裡旅行，除了風景很好，交通還很方便。3. A : 白小姐生日的時候，男朋友送給她一個很貴的皮包。 B : 除了皮包，還送給她一輛車呢!",
       "vi": "Ngoài táo ra, tôi còn thích ăn chuối. Nhiều người thích đến đây du lịch, ngoài phong cảnh đẹp, giao thông còn rất tiện. A: Sinh nhật cô Bạch, bạn trai tặng cô ấy một chiếc túi xách rất đắt. B: Ngoài túi xách, còn tặng cô ấy một chiếc xe hơi nữa đấy!",
       "py": "Wǒ chúle xǐhuān chī píngguǒ, hái xǐhuān chī xiāngjiāo. 2. Hěnduō rén xǐhuān lái zhèlǐ lǚxíng, chúle fēngjǐng hěn hǎo, jiāotōng hái hěn fāngbiàn. 3. A: Bái xiǎojiě shēngrì de shíhòu, nánpéngyǒu sònggěi tā yígè hěn guì de píbāo. B: Chúle píbāo, hái sònggěi tā yíliàngchē ne!"
      },
      {
       "hz": "A : 學校外面有沒有便利商店？",
       "vi": "A: Bên ngoài trường có cửa hàng tiện lợi không?",
       "py": "A: Xuéxiào wàimiàn yǒuméiyǒu biànlìshāngdiàn?"
      },
      {
       "hz": "A : 那棟公寓看起來不錯，你為什麼不租？",
       "vi": "A: Căn hộ đó trông được đấy, sao bạn không thuê?",
       "py": "A: Nàdòng gōngyù kànqǐlái búcuò, nǐ wèishénme bù zū?"
      },
      {
       "hz": "A : 你為什麼要搬出去？宿舍不好嗎？",
       "vi": "A: Sao bạn lại muốn dọn ra ngoài? Ký túc xá không tốt à?",
       "py": "A: Nǐ wèishénme yào bānchūqù? Sùshè bùhǎo ma?"
      },
      {
       "hz": "所以我要搬家。",
       "vi": "Nên tôi muốn chuyển nhà.",
       "py": "Suǒyǐ wǒ yào bānjiā."
      },
      {
       "hz": "弟弟把足球踢得很遠。2. 他把那隻兔子畫得很可愛。3.姐姐：你怎麼把我的書桌弄得這麼髒！妹妹：對不起，我馬上擦乾淨。",
       "vi": "Em trai đá quả bóng đi rất xa. Anh ấy vẽ con thỏ đó rất dễ thương. Chị: Sao em làm bàn học của chị bẩn thế này! Em: Em xin lỗi, em lau sạch ngay.",
       "py": "Dìdi bǎ zúqiú tī de hěn yuǎn. 2. Tā bǎ nà zhī tùzi huà de hěn kě'ài. 3. Jiějie: Nǐ zěnme bǎ wǒ de shūzhuō nòng de zhème zàng! Mèimei: Duìbùqǐ, wǒ mǎshàng cā gānjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "替 — thay cho, giúp cho",
   "giaiThich": "替 dùng khi một người vì lý do nào đó không làm được, nhờ người khác làm thay."
  },
  {
   "title": "1. 妹妹 / 臥室 / 很乾淨 / 得 / 把 / 打掃 / 昨天",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "名字 / 得 / 那麼 / 你 / 把 / 自己的 / 寫 / 為什麼 / 難看 / ?",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Míngzì / de / nàme / nǐ / bǎ / zìjǐ de / xiě / wèishénme / nánkàn /?"
      },
      {
       "hz": "林小姐 / 客廳 / 弄 / 很漂亮 / 新家 / 的 / 得 / 把",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Lín xiǎojiě / kètīng / nòng / hěnpiàoliàng / xīn jiā / de / de / bǎ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập câu 把 với bổ ngữ",
   "giaiThich": "Phần luyện tập: sắp xếp thành câu có 把 kèm bổ ngữ mức độ (得)."
  },
  {
   "title": "1. 租屋網站",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "新北市北區大學路8巷36號4樓有網路/第四台：不包括電費、水費最短租期：一年床/桌子/椅子/衣櫃/沙發/電視/冰箱/冷氣/洗衣機/熱水器近便利商店、百貨公司、學校、公園",
       "vi": "Tầng 4, số 36, hẻm 8, đường Đại Học, khu Bắc, thành phố Tân Bắc. Có mạng internet / truyền hình cáp; không bao gồm tiền điện, tiền nước; thời hạn thuê tối thiểu: một năm. Giường / bàn / ghế / tủ quần áo / sofa / tivi / tủ lạnh / điều hoà / máy giặt / bình nóng lạnh. Gần cửa hàng tiện lợi, trung tâm thương mại, trường học, công viên.",
       "py": "Xīn běi shìběiqū dàxué lù 8 xiàng 36 hào 4 lóu yǒu wǎnglù / dìsì tái: Bù bāokuò diànfèi, shuǐfèi zuì duǎn zūqí: Yìnián chuáng / zhuōzi / yǐzi / yīguì / shāfā / diànshì / bīngxiāng / lěngqì / xǐyījī / rèshuǐqì jìn biànlìshāngdiàn, bǎihuògōngsī, xuéxiào, gōngyuán"
      },
      {
       "hz": "請回答下面的問題：房租包括哪些費用？",
       "vi": "Hãy trả lời các câu hỏi dưới đây: Tiền thuê nhà bao gồm những khoản nào?",
       "py": "Qǐng huídá xiàmiàn de wèntí: Fángzū bāokuò nǎxiē fèiyòng?"
      },
      {
       "hz": "這個套房在公寓的幾樓？",
       "vi": "Căn hộ khép kín này ở tầng mấy của toà nhà?",
       "py": "Zhège tàofáng zài gōngyù de jǐlóu?"
      },
      {
       "hz": "要給多少押金？最短要租多久？",
       "vi": "Phải đặt cọc bao nhiêu? Thuê tối thiểu bao lâu?",
       "py": "Yào gěi duōshǎo yājīn? Zuì duǎn yào zū duōjiǔ?"
      },
      {
       "hz": "在這個套房裡可以做飯嗎？",
       "vi": "Trong căn hộ này có được nấu ăn không?",
       "py": "Zài zhège tàofáng lǐ kěyǐ zuòfàn ma?"
      },
      {
       "hz": "房東提供什麼家具？",
       "vi": "Chủ nhà cung cấp những đồ nội thất gì?",
       "py": "Fángdōng tígōng shénme jiājù?"
      },
      {
       "hz": "家具應該放在哪裡？",
       "vi": "Đồ nội thất nên đặt ở đâu?",
       "py": "Jiājù yīnggāi fàngzài nǎlǐ?"
      },
      {
       "hz": "你和家人搬到一個新公寓，你們買了很多新家具，請使用下面的語法討論家具應該放在哪裡。",
       "vi": "Bạn và gia đình chuyển đến một căn hộ mới, mua rất nhiều đồ nội thất mới, hãy dùng ngữ pháp dưới đây để thảo luận nên đặt đồ nội thất ở đâu.",
       "py": "Nǐ hàn jiārén bān dào yígè xīn gōngyù, nǐmen mǎi le hěnduō xīnjiājù, qǐng shǐyòng xiàmiàn de yǔfǎ tǎolùn jiājù yīnggāi fàngzài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: thuê nhà",
   "giaiThich": "Phần luyện tập theo chủ đề tìm nhà, thuê nhà."
  }
 ],
 "td2-3.4": [
  {
   "title": "1. 老師很滿意大家這次期中考的",
   "points": [
    {
     "label": null,
     "formula": "A directional compound describes the direction of the action. The structures include:(1) directional verb +來/去, (2)motion verb + directional verb + 來/去,  (3) motion verb + direction verb + location +來/去,(4) combined with 把 construction to indicate the Subject moves the Object to another location：S +把+ O+ motion verb + directional verb + ( location)+來/去. (三) motion verb + directional verb + location + 來/去 (四) combined with 「把」：把+ object+ motion verb +",
     "examples": [
      {
       "hz": "這次期中考，大家都考得很好，老師覺得很滿意。",
       "vi": "Kỳ thi giữa kỳ lần này mọi người đều làm bài rất tốt, thầy giáo rất hài lòng.",
       "py": "Zhècì qízhōngkǎo, dàjiā dōu kǎo de hěn hǎo, lǎoshī juéde hěn mǎnyì."
      },
      {
       "hz": "趨向補語 V+DV+來/去 — bổ ngữ chỉ hướng",
       "vi": "Bổ ngữ xu hướng: động từ + bổ ngữ chỉ hướng + 來/去",
       "py": "Qūxiàng bǔyǔ V + DV + lái / qù— b ổ ng ữ ch ỉ h ư ớ ng"
      },
      {
       "hz": "我的房間在二樓，請上來。",
       "vi": "Phòng tôi ở tầng hai, mời lên đây.",
       "py": "Wǒ de fángjiān zài èrlóu, qǐngshànglái."
      },
      {
       "hz": "爸爸有事找你，你趕快過去。",
       "vi": "Bố có việc tìm con, con mau qua đó đi.",
       "py": "Bàba yǒushì zhǎo nǐ, nǐ gǎnkuài guòqù."
      },
      {
       "hz": "他出去一會兒，五分鐘以後就回來。",
       "vi": "Anh ấy ra ngoài một lát, năm phút nữa sẽ về.",
       "py": "Tā chūqù yíhuì'er, wǔfēnzhōng yǐhòu jiù huílái."
      },
      {
       "hz": "那些髒衣服不要放進衣櫃裡去。",
       "vi": "Đừng cất những quần áo bẩn đó vào tủ.",
       "py": "Nàxiē zàng yīfú búyào fàngjìn yīguì lǐ qù."
      },
      {
       "hz": "這些中文書，山本良介都要帶回日本去。",
       "vi": "Những quyển sách tiếng Trung này, Yamamoto Ryosuke đều muốn mang về Nhật.",
       "py": "Zhèxiē zhōng wénshū, shānběn Liángjiè dōu yào dàihuí Rìběn qù."
      },
      {
       "hz": "路上的車很多，那個人從對面跑過街來，真危險!",
       "vi": "Trên đường rất nhiều xe, người kia chạy băng qua đường từ phía đối diện, nguy hiểm thật!",
       "py": "Lùshàng de chē hěnduō, nàge rén cóng duìmiàn pǎo guò jiē lái, zhēn wéixiǎn!"
      },
      {
       "hz": "請你把那張書桌搬過來。",
       "vi": "Bạn hãy bê cái bàn học đó qua đây.",
       "py": "Qǐng nǐ bǎ nà zhāng shūzhuō bān guòlái."
      },
      {
       "hz": "姐姐把她的衣服拿上樓去了。",
       "vi": "Chị đã mang quần áo của chị lên lầu rồi.",
       "py": "Jiějie bǎ tā de yīfú ná shànglóuqù le."
      },
      {
       "hz": "我還沒把褲子從洗衣機裡拿出來。",
       "vi": "Tôi vẫn chưa lấy quần ra khỏi máy giặt.",
       "py": "Wǒ hái méi bǎ kùzi cóng xǐyījī lǐ ná chūlái."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ xu hướng (đi lại)",
   "giaiThich": "Bổ ngữ xu hướng chỉ hướng của hành động: (1) động từ xu hướng + 來/去, (2) động từ chuyển động + động từ xu hướng + 來/去, (3) động từ chuyển động + động từ xu hướng + nơi chốn + 來/去."
  },
  {
   "title": "1. 把/家/我/沒/書/昨天/帶/回/去",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "把/丟/孩子/垃圾/進/去/袋子裡3. 桌子/我/擦/要，拿/請/杯子/來/把/起/你",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Bǎ / diū / háizi / lèsè / jìn / qù / dàizi lǐ 3. Zhuōzi / wǒ / cā / yào, ná / qǐng / bēizi / lái / bǎ / qǐ / nǐ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập sắp xếp câu có 把",
   "giaiThich": "Phần luyện tập: sắp xếp các từ cho sẵn thành câu dùng 把."
  },
  {
   "title": "II. reduplication of verbs XY→XYXY",
   "points": [
    {
     "label": null,
     "formula": "The reduplication of disyllabic verb, with the structure XYXY, creates a casual tone and implies the Subject is going to do something and the action is not going to take long. Note that this pattern cannot be used along with “一下 (in a while)” and “一點 (a little bit)”. e.g., “討論討論一下” is considered to be a wrong usage.",
     "examples": [
      {
       "hz": "他們都是我的同學，我給你介紹介紹。2. 我還沒決定要不要去留學，我要和父母討論討論。3. 弟弟的房間有一點兒髒，這個週末他要打掃打掃。",
       "vi": "Họ đều là bạn học của tôi, để tôi giới thiệu cho bạn. Tôi vẫn chưa quyết định có đi du học không, tôi phải bàn bạc với bố mẹ. Phòng em trai hơi bẩn, cuối tuần này em phải dọn dẹp một chút.",
       "py": "Tāmen dōu shì wǒ de tóngxué, wǒ gěi nǐ jièshào jièshào. 2. Wǒ hái méi juédìng yào búyào qù liúxué, wǒ yào hàn fùmǔ tǎolùn tǎolùn. 3. Dìdi de fángjiān yǒu yìdiǎn'ér zàng, zhège zhōumò tā yào dǎsǎo dǎsǎo."
      },
      {
       "hz": "‧歡迎 ‧慶祝 ‧認識 ‧休息 ‧練習",
       "vi": "‧ chào đón ‧ chúc mừng ‧ quen biết ‧ nghỉ ngơi ‧ luyện tập",
       "py": "‧ huānyíng ‧ qìngzhù ‧ rènshì ‧ xiūxí ‧ liànxí"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Lặp động từ hai âm tiết XYXY",
   "giaiThich": "Lặp động từ hai âm tiết (XYXY) tạo giọng nhẹ nhàng, ý là làm một chút, làm nhanh thôi."
  },
  {
   "title": "III. judgemental-V 起來 It’s my assessment that…",
   "points": [
    {
     "label": null,
     "formula": "The pattern is used to make comments on someone or something. The verb placed before ”起來” is \toften  a monosyllabic sensory verb or action verb, such as “看(look)”, ”聽(sound)”, ”吃(taste)”, ”喝\t(drink)”, ”穿(wear)”, etc. ”起來” is followed by comments; thus , the structure is “V 起來+ (Adv) +Vs”. 請用提示完成對話。Complete the dialogues with the given words.",
     "examples": [
      {
       "hz": "A：王小姐看起來很害羞。 B：是啊！她不敢跟不熟的男生說話。2. A：明天放假，我們去動物園吧！ B：聽起來不錯，我們幾點去呢？3. A：這件裙子是今年最流行的。 B：看起來不錯，你穿起來應該很好看。",
       "vi": "A: Cô Vương trông rất nhút nhát. B: Đúng vậy! Cô ấy không dám nói chuyện với con trai lạ. A: Mai được nghỉ, chúng ta đi sở thú nhé! B: Nghe hay đấy, mấy giờ chúng ta đi? A: Chiếc váy này thịnh hành nhất năm nay. B: Trông đẹp đấy, bạn mặc vào chắc sẽ rất đẹp.",
       "py": "A: Wáng xiǎojiě kànqǐlái hěn hàixiū. B: Shì a! Tā bùgǎn gēn bù shú de nánshēng shuōhuà. 2. A: Míngtiān fàngjià, wǒmen qù dòngwùyuán ba! B: Tīng qǐlái búcuò, wǒmen jǐdiǎn qù ne? 3. A: Zhèjiàn qúnzi shì jīnnián zuì liúxíng de. B: Kànqǐlái búcuò, nǐ chuān qǐlái yīnggāi hěn hǎokàn."
      },
      {
       "hz": "哥哥 : 媽媽今天做的雞湯看起來很好喝。(喝)2. A：離這裡最近的捷運站，走路要二十分鐘。(聽)3. 先生：我覺得這個房子不錯，交通也很方便。(住)",
       "vi": "Anh trai: Canh gà mẹ nấu hôm nay trông ngon quá. (uống) A: Ga tàu điện ngầm gần đây nhất đi bộ mất hai mươi phút. (nghe) Chồng: Anh thấy căn nhà này được đấy, giao thông cũng rất tiện. (ở)",
       "py": "Gēge: Māma jīntiān zuò de jītāng kànqǐlái hěn hǎohē. (hē) 2. A: Lí zhèlǐ zuìjìn de jiéyùn zhàn, zǒulù yào èrshífēnzhōng. (tīng) 3. Xiānshēng: Wǒ juéde zhège fángzi búcuò, jiāotōng yě hěn fāngbiàn. (zhù)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 起來 — nhận xét, cảm thấy",
   "giaiThich": "Dùng để nhận xét về người hoặc vật. Trước 起來 thường là động từ tri giác đơn âm: 看 (nhìn), 聽 (nghe), 吃 (ăn), 喝 (uống)…"
  },
  {
   "title": "IV. 替 for, on behalf of",
   "points": [
    {
     "label": null,
     "formula": "“替” is used in the situation when a person cannot do something for something for some reason and finds someone else to do it for him. The pattern indicates there are different situations coming after “ 除了” and “還 ”, with the latter one being even more important than the former. “除了”can be followed by nouns, verbs, intransitive state verbs (Vs) or phrases. If the Subjects of the two clauses are different, the second Subject should be placed before “還 ”, as in example 2. II. \tS+把+O+V得+Adv+Vs     to dispose of something with 把 In this pattern, “把” is followed by the Object that receives the action of a verb, while “V 得” is followed by the outcome after the action.",
     "examples": [
      {
       "hz": "你可以替我裝網路嗎？費用我自己付。2. 昨天王老師不舒服，所以林老師替他上課。3. 孩子應該自己打掃房間，父母不要常常替他們做。",
       "vi": "Bạn lắp mạng giúp tôi được không? Chi phí tôi tự trả. Hôm qua thầy Vương không khoẻ, nên thầy Lâm dạy thay. Con cái nên tự dọn phòng, bố mẹ đừng thường xuyên làm thay.",
       "py": "Nǐ kěyǐ tì wǒ zhuāng wǎnglù ma? Fèiyòng wǒ zìjǐ fù. 2. Zuótiān Wáng lǎoshī bù shūfú, suǒyǐ Lín lǎoshī tì tā shàngkè. 3. Háizi yīnggāi zìjǐ dǎsǎo fángjiān, fùmǔ búyào chángcháng tì tāmen zuò."
      },
      {
       "hz": "A : 我忘了帶錢包,怎麼辦？",
       "vi": "A: Tôi quên mang ví, làm sao đây?",
       "py": "A: Wǒ wàng le dài qiánbāo, zěnmebàn?"
      },
      {
       "hz": "A：明天我有事不能去上班，你可以幫我嗎？",
       "vi": "A: Ngày mai tôi có việc không đi làm được, bạn giúp tôi được không?",
       "py": "A: Míngtiān wǒ yǒushì bùnéng qù shàngbān, nǐ kěyǐ bāng wǒ ma?"
      },
      {
       "hz": "弟弟：我不知道怎麼寫這個作業，你可以替我寫嗎？",
       "vi": "Em trai: Em không biết làm bài tập này, anh làm giúp em được không?",
       "py": "Dìdi: Wǒ bù zhīdào zěnme xiě zhège zuòyè, nǐ kěyǐ tì wǒ xiě ma?"
      },
      {
       "hz": "良介為什麼想搬家？",
       "vi": "Tại sao Ryosuke muốn chuyển nhà?",
       "py": "Liángjiè wèishénme xiǎng bānjiā?"
      },
      {
       "hz": "良介找房子的時候有什麼問題？",
       "vi": "Khi tìm nhà Ryosuke gặp vấn đề gì?",
       "py": "Liángjiè zhǎo fángzi de shíhòu yǒu shénme wèntí?"
      },
      {
       "hz": "房東為什麼收良介比較便宜的房租？",
       "vi": "Tại sao chủ nhà lấy tiền thuê của Ryosuke rẻ hơn?",
       "py": "Fángdōng wèishénme shōu Liángjiè bǐjiào piányi de fángzū?"
      },
      {
       "hz": "如果你是良介，你會搬出去住嗎？為什麼？",
       "vi": "Nếu bạn là Ryosuke, bạn có dọn ra ngoài ở không? Tại sao?",
       "py": "Rúguǒ nǐ shì Liángjiè, nǐ huì bānchūqù zhù ma? Wèishénme?"
      },
      {
       "hz": "你現在住的地方環境怎麼樣？你想搬家嗎？為什麼？",
       "vi": "Môi trường chỗ bạn đang ở thế nào? Bạn có muốn chuyển nhà không? Tại sao?",
       "py": "Nǐ xiànzài zhù de dìfāng huánjìng zěnmeyàng? Nǐ xiǎng bānjiā ma? Wèishénme?"
      },
      {
       "hz": "如果你是房東，你願意把房子租給外國人嗎？為什麼？",
       "vi": "Nếu bạn là chủ nhà, bạn có muốn cho người nước ngoài thuê nhà không? Tại sao?",
       "py": "Rúguǒ nǐ shì fángdōng, nǐ yuànyì bǎ fángzi zūgěi wàiguórén ma? Wèishénme?"
      },
      {
       "hz": "我除了喜歡吃蘋果，還喜歡吃香蕉。2. 很多人喜歡來這裡旅行，除了風景很好，交通還很方便。3. A : 白小姐生日的時候，男朋友送給她一個很貴的皮包。 B : 除了皮包，還送給她一輛車呢!",
       "vi": "Ngoài táo ra, tôi còn thích ăn chuối. Nhiều người thích đến đây du lịch, ngoài phong cảnh đẹp, giao thông còn rất tiện. A: Sinh nhật cô Bạch, bạn trai tặng cô ấy một chiếc túi xách rất đắt. B: Ngoài túi xách, còn tặng cô ấy một chiếc xe hơi nữa đấy!",
       "py": "Wǒ chúle xǐhuān chī píngguǒ, hái xǐhuān chī xiāngjiāo. 2. Hěnduō rén xǐhuān lái zhèlǐ lǚxíng, chúle fēngjǐng hěn hǎo, jiāotōng hái hěn fāngbiàn. 3. A: Bái xiǎojiě shēngrì de shíhòu, nánpéngyǒu sònggěi tā yígè hěn guì de píbāo. B: Chúle píbāo, hái sònggěi tā yíliàngchē ne!"
      },
      {
       "hz": "A : 學校外面有沒有便利商店？",
       "vi": "A: Bên ngoài trường có cửa hàng tiện lợi không?",
       "py": "A: Xuéxiào wàimiàn yǒuméiyǒu biànlìshāngdiàn?"
      },
      {
       "hz": "A : 那棟公寓看起來不錯，你為什麼不租？",
       "vi": "A: Căn hộ đó trông được đấy, sao bạn không thuê?",
       "py": "A: Nàdòng gōngyù kànqǐlái búcuò, nǐ wèishénme bù zū?"
      },
      {
       "hz": "A : 你為什麼要搬出去？宿舍不好嗎？",
       "vi": "A: Sao bạn lại muốn dọn ra ngoài? Ký túc xá không tốt à?",
       "py": "A: Nǐ wèishénme yào bānchūqù? Sùshè bùhǎo ma?"
      },
      {
       "hz": "所以我要搬家。",
       "vi": "Nên tôi muốn chuyển nhà.",
       "py": "Suǒyǐ wǒ yào bānjiā."
      },
      {
       "hz": "弟弟把足球踢得很遠。2. 他把那隻兔子畫得很可愛。3.姐姐：你怎麼把我的書桌弄得這麼髒！妹妹：對不起，我馬上擦乾淨。",
       "vi": "Em trai đá quả bóng đi rất xa. Anh ấy vẽ con thỏ đó rất dễ thương. Chị: Sao em làm bàn học của chị bẩn thế này! Em: Em xin lỗi, em lau sạch ngay.",
       "py": "Dìdi bǎ zúqiú tī de hěn yuǎn. 2. Tā bǎ nà zhī tùzi huà de hěn kě'ài. 3. Jiějie: Nǐ zěnme bǎ wǒ de shūzhuō nòng de zhème zàng! Mèimei: Duìbùqǐ, wǒ mǎshàng cā gānjìng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "替 — thay cho, giúp cho",
   "giaiThich": "替 dùng khi một người vì lý do nào đó không làm được, nhờ người khác làm thay."
  },
  {
   "title": "1. 妹妹 / 臥室 / 很乾淨 / 得 / 把 / 打掃 / 昨天",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "名字 / 得 / 那麼 / 你 / 把 / 自己的 / 寫 / 為什麼 / 難看 / ?",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Míngzì / de / nàme / nǐ / bǎ / zìjǐ de / xiě / wèishénme / nánkàn /?"
      },
      {
       "hz": "林小姐 / 客廳 / 弄 / 很漂亮 / 新家 / 的 / 得 / 把",
       "vi": "Sắp xếp lại thành câu hoàn chỉnh.",
       "py": "Lín xiǎojiě / kètīng / nòng / hěnpiàoliàng / xīn jiā / de / de / bǎ"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập câu 把 với bổ ngữ",
   "giaiThich": "Phần luyện tập: sắp xếp thành câu có 把 kèm bổ ngữ mức độ (得)."
  },
  {
   "title": "1. 租屋網站",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "新北市北區大學路8巷36號4樓有網路/第四台：不包括電費、水費最短租期：一年床/桌子/椅子/衣櫃/沙發/電視/冰箱/冷氣/洗衣機/熱水器近便利商店、百貨公司、學校、公園",
       "vi": "Tầng 4, số 36, hẻm 8, đường Đại Học, khu Bắc, thành phố Tân Bắc. Có mạng internet / truyền hình cáp; không bao gồm tiền điện, tiền nước; thời hạn thuê tối thiểu: một năm. Giường / bàn / ghế / tủ quần áo / sofa / tivi / tủ lạnh / điều hoà / máy giặt / bình nóng lạnh. Gần cửa hàng tiện lợi, trung tâm thương mại, trường học, công viên.",
       "py": "Xīn běi shìběiqū dàxué lù 8 xiàng 36 hào 4 lóu yǒu wǎnglù / dìsì tái: Bù bāokuò diànfèi, shuǐfèi zuì duǎn zūqí: Yìnián chuáng / zhuōzi / yǐzi / yīguì / shāfā / diànshì / bīngxiāng / lěngqì / xǐyījī / rèshuǐqì jìn biànlìshāngdiàn, bǎihuògōngsī, xuéxiào, gōngyuán"
      },
      {
       "hz": "請回答下面的問題：房租包括哪些費用？",
       "vi": "Hãy trả lời các câu hỏi dưới đây: Tiền thuê nhà bao gồm những khoản nào?",
       "py": "Qǐng huídá xiàmiàn de wèntí: Fángzū bāokuò nǎxiē fèiyòng?"
      },
      {
       "hz": "這個套房在公寓的幾樓？",
       "vi": "Căn hộ khép kín này ở tầng mấy của toà nhà?",
       "py": "Zhège tàofáng zài gōngyù de jǐlóu?"
      },
      {
       "hz": "要給多少押金？最短要租多久？",
       "vi": "Phải đặt cọc bao nhiêu? Thuê tối thiểu bao lâu?",
       "py": "Yào gěi duōshǎo yājīn? Zuì duǎn yào zū duōjiǔ?"
      },
      {
       "hz": "在這個套房裡可以做飯嗎？",
       "vi": "Trong căn hộ này có được nấu ăn không?",
       "py": "Zài zhège tàofáng lǐ kěyǐ zuòfàn ma?"
      },
      {
       "hz": "房東提供什麼家具？",
       "vi": "Chủ nhà cung cấp những đồ nội thất gì?",
       "py": "Fángdōng tígōng shénme jiājù?"
      },
      {
       "hz": "家具應該放在哪裡？",
       "vi": "Đồ nội thất nên đặt ở đâu?",
       "py": "Jiājù yīnggāi fàngzài nǎlǐ?"
      },
      {
       "hz": "你和家人搬到一個新公寓，你們買了很多新家具，請使用下面的語法討論家具應該放在哪裡。",
       "vi": "Bạn và gia đình chuyển đến một căn hộ mới, mua rất nhiều đồ nội thất mới, hãy dùng ngữ pháp dưới đây để thảo luận nên đặt đồ nội thất ở đâu.",
       "py": "Nǐ hàn jiārén bān dào yígè xīn gōngyù, nǐmen mǎi le hěnduō xīnjiājù, qǐng shǐyòng xiàmiàn de yǔfǎ tǎolùn jiājù yīnggāi fàngzài nǎlǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: thuê nhà",
   "giaiThich": "Phần luyện tập theo chủ đề tìm nhà, thuê nhà."
  }
 ],
 "td2-4.1": [
  {
   "title": "2. 雖然我排隊排了一個小時才買到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這本小說很有意思，值得推薦。",
       "vi": "Quyển tiểu thuyết này rất thú vị, đáng để giới thiệu.",
       "py": "Zhèběn xiǎoshuō hěn yǒuyìsi, zhíde tuījiàn."
      },
      {
       "hz": "跨年演唱會的票，可是很值得。",
       "vi": "Vé hoà nhạc đón năm mới…, nhưng rất đáng.",
       "py": "Kuà nián yǎnchànghuì de piào, kěshì hěn zhíde."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 雖然… và 才",
   "giaiThich": "Phần luyện tập hoàn thành câu có 雖然 (tuy) và 才 (mãi mới)."
  },
  {
   "title": "I. Vs得不得了/Vs極了/ extremely, terribly",
   "points": [
    {
     "label": null,
     "formula": "The “Vs 得不得了” pattern implies a very great degree. The complement “得+不得了” should come after Vs to add intensity. When this pattern is used, degree adverbs such as”很” and “非常” should not be placed before Vs at the same time. The “Vs極了” pattern also implies a very great degree. The complement “極了” should come after Vs to add intensity . When this pattern is used, adverbs of degree such as “很” and “非常” should not be placed before Vs at the same time.",
     "examples": [
      {
       "hz": "台北101高得不得了！",
       "vi": "Taipei 101 cao cực kỳ!",
       "py": "Táiběi 101 gāo de bùdéle!"
      },
      {
       "hz": "我媽媽考的蛋糕好吃得不得了！",
       "vi": "Bánh kem mẹ tôi nướng ngon cực kỳ!",
       "py": "Wǒ māma kǎo de dàngāo hǎochī de bùdéle!"
      },
      {
       "hz": "他累得不得了，一回家就睡了。",
       "vi": "Anh ấy mệt cực kỳ, vừa về đến nhà là ngủ luôn.",
       "py": "Tā lèi de bùdéle, yì huíjiā jiù shuì le."
      },
      {
       "hz": "A：今天的天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiān de tiānqì zěnmeyàng?"
      },
      {
       "hz": "A：這雙鞋貴不貴？",
       "vi": "A: Đôi giày này có đắt không?",
       "py": "A: Zhè shuāng xié guì bú guì?"
      },
      {
       "hz": "A：你買的那杯飲料好喝嗎？",
       "vi": "A: Cốc đồ uống bạn mua có ngon không?",
       "py": "A: Nǐ mǎi de nà bēi yǐnliào hǎohē ma?"
      },
      {
       "hz": "Vs得不得了/Vs極了/ 週末的時候,夜市熱鬧極了!",
       "vi": "Vs 得不得了 / Vs 極了: cực kỳ, vô cùng. Cuối tuần chợ đêm náo nhiệt vô cùng!",
       "py": "Vs de bùdéle / Vs jíle / zhōumò de shíhòu, yèshì rènào jíle!"
      },
      {
       "hz": "這杯咖啡沒加糖，喝起來苦極了。",
       "vi": "Cốc cà phê này không cho đường, uống đắng cực kỳ.",
       "py": "Zhè bēi kāfēi méi jiātáng, hē qǐlái kǔ jíle."
      },
      {
       "hz": "她快結婚了,所以最近心情好極了!",
       "vi": "Cô ấy sắp kết hôn, nên dạo này tâm trạng tốt vô cùng!",
       "py": "Tā kuài jiéhūn le, suǒyǐ zuìjìn xīnqíng hǎojíle!"
      },
      {
       "hz": "A：她唱歌好聽嗎？",
       "vi": "A: Cô ấy hát có hay không?",
       "py": "A: Tā chànggē hǎotīng ma?"
      },
      {
       "hz": "A：他們覺得這個電影怎麼樣？",
       "vi": "A: Họ thấy bộ phim này thế nào?",
       "py": "A: Tāmen juéde zhège diànyǐng zěnmeyàng?"
      },
      {
       "hz": "A：他打籃球打得怎麼樣？",
       "vi": "A: Anh ấy chơi bóng rổ thế nào?",
       "py": "A: Tā dǎlánqiú dǎ de zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得不得了 / Vs 極了 — cực kỳ",
   "giaiThich": "Nhấn mạnh mức độ rất cao. Bổ ngữ 得不得了 đứng sau tính từ. Đã dùng mẫu này thì KHÔNG thêm 很, 非常 phía trước nữa."
  },
  {
   "title": "II. 越來越… more and more",
   "points": [
    {
     "label": null,
     "formula": "The “越來越⋯⋯” pattern is used to express the level of changes or the amountincreasing or decreasing with time. It also includes “S+越來越+Vs / Vst+O /Vaux+V+O.” In this pattern, change of state “了” is frequently used in sentence final position. The verb complement “起” implies one’s ability to afford something. Thus, only a few verbs, such as “吃 (eat)”, “喝 (drink)”, “念 (study)”, “買 (buy)”, “住 (live)”, “付(pay)”, “租 (rent)”, “穿(wear)” and “用 (use)”, can be used along with “起”. The common patterns include “V得起” and “V不起”, but patterns like “V 起了” or “沒V 起”are not acceptable in Chinese. III. V起：V得起/V不起 to be able to afford or not The resultative complement “飽” implies that the subject feels fully satisfied or enough. Thus, “飽” often comes after “吃(eat)” and “睡(sleep)”.The “V得/不飽” pattern indicate whether something is potentially enough to satisfy the subject, while the “沒V飽” and “V飽了” patterns indicates whether the subject feels fully satisfied at last or not. resultative complement 飽 for being full or enough",
     "examples": [
      {
       "hz": "我跟室友越來越熟了。",
       "vi": "Tôi và bạn cùng phòng ngày càng thân.",
       "py": "Wǒ gēn shìyǒu yuèláiyuè shú le."
      },
      {
       "hz": "這個地方的大樓越來越多了。",
       "vi": "Nhà cao tầng ở khu này ngày càng nhiều.",
       "py": "Zhège dìfāng de dàlóu yuèláiyuè duō le."
      },
      {
       "hz": "那個人很不客氣，所以朋友越來越少了。",
       "vi": "Người đó rất bất lịch sự, nên bạn bè ngày càng ít.",
       "py": "Nàge rén hěn bú kèqì, suǒyǐ péngyǒu yuèláiyuèshǎo le."
      },
      {
       "hz": "冬天到了，今天比昨天更冷了。",
       "vi": "Mùa đông đến rồi, hôm nay còn lạnh hơn hôm qua.",
       "py": "Dōngtiān dào le, jīntiān bǐ zuótiān gèng lěng le."
      },
      {
       "hz": "第二課的中國字比第一課難寫；第三課的中國字比第二課的更難寫…改寫句子 Viết lại câu bằng mẫu 越來越.",
       "vi": "Chữ Hán bài 2 khó viết hơn bài 1; chữ Hán bài 3 còn khó viết hơn bài 2… Viết lại câu bằng mẫu 越來越.",
       "py": "Dì'èrkè de Zhōngguó zì bǐ dìyīkè nán xiě; dìsānkè de Zhōngguó zì bǐ dì'èrkè de gèng nán xiě… gǎixiě jùzi Vi ế t l ạ i c â u b ằ ng m ẫ u yuèláiyuè."
      },
      {
       "hz": "那件衣服太貴了，我怎麼買得起？",
       "vi": "Bộ quần áo đó đắt quá, tôi làm sao mua nổi?",
       "py": "Nà jiàn yīfú tàiguì le, wǒ zěnme mǎideqǐ?"
      },
      {
       "hz": "台灣小吃的價錢很便宜，誰都吃得起。",
       "vi": "Giá đồ ăn vặt Đài Loan rất rẻ, ai cũng ăn được.",
       "py": "Táiwān xiǎochī de jiàqián hěn piányi, shéi dōu chīdeqǐ."
      },
      {
       "hz": "他非常有錢,當然喝得起一杯一千塊的酒。",
       "vi": "Anh ấy rất giàu, đương nhiên uống nổi một ly rượu một nghìn đồng.",
       "py": "Tā fēicháng yǒuqián, dāngrán hē de qǐ yìbēi yìqiānkuài de jiǔ."
      },
      {
       "hz": "在這裡看醫生貴得不得了,沒錢的人看不起。",
       "vi": "Khám bệnh ở đây đắt cực kỳ, người không có tiền không khám nổi.",
       "py": "Zài zhèlǐ kàn yīshēng guì de bùdéle, méi qián de rén kànbùqǐ."
      },
      {
       "hz": "A：這個公寓一個月的房租五萬塊錢，你要租嗎？",
       "vi": "A: Căn hộ này tiền thuê một tháng năm vạn đồng, bạn có thuê không?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū wǔwànkuài qián, nǐ yào zū ma?"
      },
      {
       "hz": "IV. V飽：沒V飽/V飽了/V得飽/V不飽你只吃了半碗飯，怎麼吃得飽呢？",
       "vi": "IV. V飽: chưa V no / V no rồi / V được no / V không no. Bạn mới ăn nửa bát cơm, sao no được?",
       "py": "IV. V bǎo: Méi V bǎo / V bǎo le / V de bǎo / V bù bǎo nǐ zhǐ chī le bànwǎn fàn, zěnme chīdebǎo ne?"
      },
      {
       "hz": "我昨天只睡了三個鐘頭的覺，當然沒睡飽！",
       "vi": "Hôm qua tôi chỉ ngủ ba tiếng, đương nhiên ngủ chưa đủ!",
       "py": "Wǒ zuótiān zhǐ shuì le sāngè zhōngtóu de jué, dāngrán méi shuìbǎo!"
      },
      {
       "hz": "今天的舞會我們準備了很多好吃的食物，大家一定吃得飽。",
       "vi": "Buổi tiệc nhảy hôm nay chúng tôi chuẩn bị rất nhiều đồ ăn ngon, mọi người chắc chắn sẽ ăn no.",
       "py": "Jīntiān de wǔhuì wǒmen zhǔnbèi le hěnduō hǎochī de shíwù, dàjiā yídìng chīdebǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越來越… — ngày càng…",
   "giaiThich": "Diễn đạt mức độ tăng hoặc giảm dần theo thời gian; cuối câu thường có 了 chỉ sự thay đổi."
  },
  {
   "title": "V. S+對NP/VP(+Adv)+有/沒(有)興趣",
   "points": [
    {
     "label": null,
     "formula": "“興趣” is used when the subject is passionate about doing something or doessomething very often. Make sentences with the given phrases or grammar patterns.",
     "examples": [
      {
       "hz": "台灣人不都對吃臭豆腐有興趣。",
       "vi": "Không phải người Đài Loan nào cũng hứng thú với món đậu phụ thối.",
       "py": "Táiwānrén bù dōu duì chī chòudòufǔ yǒu xìngqù."
      },
      {
       "hz": "弟弟只對數學有興趣,其他的都沒興趣。",
       "vi": "Em trai chỉ hứng thú với môn toán, các môn khác đều không hứng thú.",
       "py": "Dìdi zhǐ duì shùxué yǒu xìngqù, qítā de dōu méi xìngqù."
      },
      {
       "hz": "陳小姐對逛百貨公司很有興趣,每個週末都去。",
       "vi": "Cô Trần rất hứng thú với việc đi dạo trung tâm thương mại, cuối tuần nào cũng đi.",
       "py": "Chén xiǎojiě duì guàng bǎihuògōngsī hěn yǒu xìngqù, měigè zhōumò dōu qù."
      },
      {
       "hz": "‧有一點兒 ‧QW+都/也 ‧不但⋯⋯,也⋯⋯ ‧越來越⋯⋯請選用下面的句型和「S+對NP/VP+有/沒(有)興趣」完成句子。",
       "vi": "‧ hơi… ‧ từ để hỏi + 都/也 ‧ không những… mà còn… ‧ ngày càng… Hãy chọn các mẫu câu dưới đây và mẫu “S + 對 NP/VP (+ phó từ) + 有/沒(有)興趣” để hoàn thành câu.",
       "py": "‧ yǒu yìdiǎn'ér ‧ QW + dōu / yě ‧ búdàn……, yě…… ‧ yuèláiyuè…… qǐng xuǎnyòng xiàmiàn de jùxíng hàn “S + duì NP / VP + yǒu / méi (yǒu) xìngqù” wánchéng jùzi."
      },
      {
       "hz": "(陳先生、做家事)2. (山本良介、學中文)3. (白小姐、逛夜市)4. (那個學生、歷史/科學)",
       "vi": "(anh Trần, làm việc nhà) (Yamamoto Ryosuke, học tiếng Trung) (cô Bạch, dạo chợ đêm) (cậu học sinh đó, lịch sử/khoa học)",
       "py": "(Chén xiānshēng, zuò jiāshì) 2. (shānběn Liángjiè, xué zhōngwén) 3. (Bái xiǎojiě, guàng yèshì) 4. (nàge xuéshēng, lìshǐ / kēxué)"
      },
      {
       "hz": "你喜歡什麼小吃？",
       "vi": "Bạn thích món ăn vặt nào?",
       "py": "Nǐ xǐhuān shénme xiǎochī?"
      },
      {
       "hz": "你逛過台灣的夜市嗎？你吃過哪些台灣小吃？請你找時間到夜市走一走、看一看，找幾種你想吃的小吃，吃吃看。請你照相，再給同學介紹那些小吃。比如說：味道怎麼樣？多少錢？你推不推薦？為什麼？",
       "vi": "Bạn đã từng dạo chợ đêm ở Đài Loan chưa? Bạn đã ăn những món ăn vặt Đài Loan nào? Hãy dành thời gian đến chợ đêm dạo một vòng, tìm vài món bạn muốn ăn và ăn thử. Hãy chụp ảnh rồi giới thiệu những món đó với các bạn cùng lớp. Ví dụ: vị thế nào? Bao nhiêu tiền? Bạn có giới thiệu không? Tại sao?",
       "py": "Nǐ guàngguò Táiwān de yèshì ma? Nǐ chī guò nǎxiē Táiwān xiǎochī? Qǐng nǐ zhǎo shíjiān dào yèshì zǒu yì zǒu, kànyíkàn, zhǎo jǐzhǒng nǐ xiǎng chī de xiǎochī, chī chī kàn. Qǐng nǐ zhàoxiàng, zài gěi tóngxué jièshào nàxiē xiǎochī. Bǐrúshuō: Wèidào zěnmeyàng? Duōshǎo qián? Nǐ tuī bù tuījiàn? Wèishénme?"
      },
      {
       "hz": "你的國家有什麼特別的菜？",
       "vi": "Nước bạn có món ăn gì đặc biệt?",
       "py": "Nǐ de guójiā yǒu shénme tèbié de cài?"
      },
      {
       "hz": "請你問一問同學，他們國家有哪些特別的菜？也請準備一張照片介紹你國家的菜。上課的時候給同學介紹這個菜的味道、作法。聽了大家的介紹以後，請你說一說你最想吃哪一個菜？為什麼？",
       "vi": "Hãy hỏi các bạn cùng lớp xem nước họ có những món ăn đặc biệt nào? Bạn cũng hãy chuẩn bị một tấm ảnh để giới thiệu món ăn của nước mình. Trong giờ học, giới thiệu với các bạn về hương vị và cách làm món đó. Nghe mọi người giới thiệu xong, hãy nói xem bạn muốn ăn món nào nhất? Tại sao?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, tāmen guójiā yǒu nǎxiē tèbié de cài? Yě qǐng zhǔnbèi yìzhāng zhàopiān jièshào nǐ guójiā de cài. Shàngkè de shíhòu gěi tóngxué jièshào zhège cài de wèidào, zuòfǎ. Tīng le dàjiā de jièshào yǐhòu, qǐng nǐ shuōyìshuō nǐ zuì xiǎng chī nǎ yígè cài? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有興趣 — có / không có hứng thú",
   "giaiThich": "Dùng khi nói ai đó thích hay không thích, hay làm hoặc không hay làm việc gì."
  }
 ],
 "td2-4.2": [
  {
   "title": "2. 雖然我排隊排了一個小時才買到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這本小說很有意思，值得推薦。",
       "vi": "Quyển tiểu thuyết này rất thú vị, đáng để giới thiệu.",
       "py": "Zhèběn xiǎoshuō hěn yǒuyìsi, zhíde tuījiàn."
      },
      {
       "hz": "跨年演唱會的票，可是很值得。",
       "vi": "Vé hoà nhạc đón năm mới…, nhưng rất đáng.",
       "py": "Kuà nián yǎnchànghuì de piào, kěshì hěn zhíde."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 雖然… và 才",
   "giaiThich": "Phần luyện tập hoàn thành câu có 雖然 (tuy) và 才 (mãi mới)."
  },
  {
   "title": "I. Vs得不得了/Vs極了/ extremely, terribly",
   "points": [
    {
     "label": null,
     "formula": "The “Vs 得不得了” pattern implies a very great degree. The complement “得+不得了” should come after Vs to add intensity. When this pattern is used, degree adverbs such as”很” and “非常” should not be placed before Vs at the same time. The “Vs極了” pattern also implies a very great degree. The complement “極了” should come after Vs to add intensity . When this pattern is used, adverbs of degree such as “很” and “非常” should not be placed before Vs at the same time.",
     "examples": [
      {
       "hz": "台北101高得不得了！",
       "vi": "Taipei 101 cao cực kỳ!",
       "py": "Táiběi 101 gāo de bùdéle!"
      },
      {
       "hz": "我媽媽考的蛋糕好吃得不得了！",
       "vi": "Bánh kem mẹ tôi nướng ngon cực kỳ!",
       "py": "Wǒ māma kǎo de dàngāo hǎochī de bùdéle!"
      },
      {
       "hz": "他累得不得了，一回家就睡了。",
       "vi": "Anh ấy mệt cực kỳ, vừa về đến nhà là ngủ luôn.",
       "py": "Tā lèi de bùdéle, yì huíjiā jiù shuì le."
      },
      {
       "hz": "A：今天的天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiān de tiānqì zěnmeyàng?"
      },
      {
       "hz": "A：這雙鞋貴不貴？",
       "vi": "A: Đôi giày này có đắt không?",
       "py": "A: Zhè shuāng xié guì bú guì?"
      },
      {
       "hz": "A：你買的那杯飲料好喝嗎？",
       "vi": "A: Cốc đồ uống bạn mua có ngon không?",
       "py": "A: Nǐ mǎi de nà bēi yǐnliào hǎohē ma?"
      },
      {
       "hz": "Vs得不得了/Vs極了/ 週末的時候,夜市熱鬧極了!",
       "vi": "Vs 得不得了 / Vs 極了: cực kỳ, vô cùng. Cuối tuần chợ đêm náo nhiệt vô cùng!",
       "py": "Vs de bùdéle / Vs jíle / zhōumò de shíhòu, yèshì rènào jíle!"
      },
      {
       "hz": "這杯咖啡沒加糖，喝起來苦極了。",
       "vi": "Cốc cà phê này không cho đường, uống đắng cực kỳ.",
       "py": "Zhè bēi kāfēi méi jiātáng, hē qǐlái kǔ jíle."
      },
      {
       "hz": "她快結婚了,所以最近心情好極了!",
       "vi": "Cô ấy sắp kết hôn, nên dạo này tâm trạng tốt vô cùng!",
       "py": "Tā kuài jiéhūn le, suǒyǐ zuìjìn xīnqíng hǎojíle!"
      },
      {
       "hz": "A：她唱歌好聽嗎？",
       "vi": "A: Cô ấy hát có hay không?",
       "py": "A: Tā chànggē hǎotīng ma?"
      },
      {
       "hz": "A：他們覺得這個電影怎麼樣？",
       "vi": "A: Họ thấy bộ phim này thế nào?",
       "py": "A: Tāmen juéde zhège diànyǐng zěnmeyàng?"
      },
      {
       "hz": "A：他打籃球打得怎麼樣？",
       "vi": "A: Anh ấy chơi bóng rổ thế nào?",
       "py": "A: Tā dǎlánqiú dǎ de zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得不得了 / Vs 極了 — cực kỳ",
   "giaiThich": "Nhấn mạnh mức độ rất cao. Bổ ngữ 得不得了 đứng sau tính từ. Đã dùng mẫu này thì KHÔNG thêm 很, 非常 phía trước nữa."
  },
  {
   "title": "II. 越來越… more and more",
   "points": [
    {
     "label": null,
     "formula": "The “越來越⋯⋯” pattern is used to express the level of changes or the amountincreasing or decreasing with time. It also includes “S+越來越+Vs / Vst+O /Vaux+V+O.” In this pattern, change of state “了” is frequently used in sentence final position. The verb complement “起” implies one’s ability to afford something. Thus, only a few verbs, such as “吃 (eat)”, “喝 (drink)”, “念 (study)”, “買 (buy)”, “住 (live)”, “付(pay)”, “租 (rent)”, “穿(wear)” and “用 (use)”, can be used along with “起”. The common patterns include “V得起” and “V不起”, but patterns like “V 起了” or “沒V 起”are not acceptable in Chinese. III. V起：V得起/V不起 to be able to afford or not The resultative complement “飽” implies that the subject feels fully satisfied or enough. Thus, “飽” often comes after “吃(eat)” and “睡(sleep)”.The “V得/不飽” pattern indicate whether something is potentially enough to satisfy the subject, while the “沒V飽” and “V飽了” patterns indicates whether the subject feels fully satisfied at last or not. resultative complement 飽 for being full or enough",
     "examples": [
      {
       "hz": "我跟室友越來越熟了。",
       "vi": "Tôi và bạn cùng phòng ngày càng thân.",
       "py": "Wǒ gēn shìyǒu yuèláiyuè shú le."
      },
      {
       "hz": "這個地方的大樓越來越多了。",
       "vi": "Nhà cao tầng ở khu này ngày càng nhiều.",
       "py": "Zhège dìfāng de dàlóu yuèláiyuè duō le."
      },
      {
       "hz": "那個人很不客氣，所以朋友越來越少了。",
       "vi": "Người đó rất bất lịch sự, nên bạn bè ngày càng ít.",
       "py": "Nàge rén hěn bú kèqì, suǒyǐ péngyǒu yuèláiyuèshǎo le."
      },
      {
       "hz": "冬天到了，今天比昨天更冷了。",
       "vi": "Mùa đông đến rồi, hôm nay còn lạnh hơn hôm qua.",
       "py": "Dōngtiān dào le, jīntiān bǐ zuótiān gèng lěng le."
      },
      {
       "hz": "第二課的中國字比第一課難寫；第三課的中國字比第二課的更難寫…改寫句子 Viết lại câu bằng mẫu 越來越.",
       "vi": "Chữ Hán bài 2 khó viết hơn bài 1; chữ Hán bài 3 còn khó viết hơn bài 2… Viết lại câu bằng mẫu 越來越.",
       "py": "Dì'èrkè de Zhōngguó zì bǐ dìyīkè nán xiě; dìsānkè de Zhōngguó zì bǐ dì'èrkè de gèng nán xiě… gǎixiě jùzi Vi ế t l ạ i c â u b ằ ng m ẫ u yuèláiyuè."
      },
      {
       "hz": "那件衣服太貴了，我怎麼買得起？",
       "vi": "Bộ quần áo đó đắt quá, tôi làm sao mua nổi?",
       "py": "Nà jiàn yīfú tàiguì le, wǒ zěnme mǎideqǐ?"
      },
      {
       "hz": "台灣小吃的價錢很便宜，誰都吃得起。",
       "vi": "Giá đồ ăn vặt Đài Loan rất rẻ, ai cũng ăn được.",
       "py": "Táiwān xiǎochī de jiàqián hěn piányi, shéi dōu chīdeqǐ."
      },
      {
       "hz": "他非常有錢,當然喝得起一杯一千塊的酒。",
       "vi": "Anh ấy rất giàu, đương nhiên uống nổi một ly rượu một nghìn đồng.",
       "py": "Tā fēicháng yǒuqián, dāngrán hē de qǐ yìbēi yìqiānkuài de jiǔ."
      },
      {
       "hz": "在這裡看醫生貴得不得了,沒錢的人看不起。",
       "vi": "Khám bệnh ở đây đắt cực kỳ, người không có tiền không khám nổi.",
       "py": "Zài zhèlǐ kàn yīshēng guì de bùdéle, méi qián de rén kànbùqǐ."
      },
      {
       "hz": "A：這個公寓一個月的房租五萬塊錢，你要租嗎？",
       "vi": "A: Căn hộ này tiền thuê một tháng năm vạn đồng, bạn có thuê không?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū wǔwànkuài qián, nǐ yào zū ma?"
      },
      {
       "hz": "IV. V飽：沒V飽/V飽了/V得飽/V不飽你只吃了半碗飯，怎麼吃得飽呢？",
       "vi": "IV. V飽: chưa V no / V no rồi / V được no / V không no. Bạn mới ăn nửa bát cơm, sao no được?",
       "py": "IV. V bǎo: Méi V bǎo / V bǎo le / V de bǎo / V bù bǎo nǐ zhǐ chī le bànwǎn fàn, zěnme chīdebǎo ne?"
      },
      {
       "hz": "我昨天只睡了三個鐘頭的覺，當然沒睡飽！",
       "vi": "Hôm qua tôi chỉ ngủ ba tiếng, đương nhiên ngủ chưa đủ!",
       "py": "Wǒ zuótiān zhǐ shuì le sāngè zhōngtóu de jué, dāngrán méi shuìbǎo!"
      },
      {
       "hz": "今天的舞會我們準備了很多好吃的食物，大家一定吃得飽。",
       "vi": "Buổi tiệc nhảy hôm nay chúng tôi chuẩn bị rất nhiều đồ ăn ngon, mọi người chắc chắn sẽ ăn no.",
       "py": "Jīntiān de wǔhuì wǒmen zhǔnbèi le hěnduō hǎochī de shíwù, dàjiā yídìng chīdebǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越來越… — ngày càng…",
   "giaiThich": "Diễn đạt mức độ tăng hoặc giảm dần theo thời gian; cuối câu thường có 了 chỉ sự thay đổi."
  },
  {
   "title": "V. S+對NP/VP(+Adv)+有/沒(有)興趣",
   "points": [
    {
     "label": null,
     "formula": "“興趣” is used when the subject is passionate about doing something or doessomething very often. Make sentences with the given phrases or grammar patterns.",
     "examples": [
      {
       "hz": "台灣人不都對吃臭豆腐有興趣。",
       "vi": "Không phải người Đài Loan nào cũng hứng thú với món đậu phụ thối.",
       "py": "Táiwānrén bù dōu duì chī chòudòufǔ yǒu xìngqù."
      },
      {
       "hz": "弟弟只對數學有興趣,其他的都沒興趣。",
       "vi": "Em trai chỉ hứng thú với môn toán, các môn khác đều không hứng thú.",
       "py": "Dìdi zhǐ duì shùxué yǒu xìngqù, qítā de dōu méi xìngqù."
      },
      {
       "hz": "陳小姐對逛百貨公司很有興趣,每個週末都去。",
       "vi": "Cô Trần rất hứng thú với việc đi dạo trung tâm thương mại, cuối tuần nào cũng đi.",
       "py": "Chén xiǎojiě duì guàng bǎihuògōngsī hěn yǒu xìngqù, měigè zhōumò dōu qù."
      },
      {
       "hz": "‧有一點兒 ‧QW+都/也 ‧不但⋯⋯,也⋯⋯ ‧越來越⋯⋯請選用下面的句型和「S+對NP/VP+有/沒(有)興趣」完成句子。",
       "vi": "‧ hơi… ‧ từ để hỏi + 都/也 ‧ không những… mà còn… ‧ ngày càng… Hãy chọn các mẫu câu dưới đây và mẫu “S + 對 NP/VP (+ phó từ) + 有/沒(有)興趣” để hoàn thành câu.",
       "py": "‧ yǒu yìdiǎn'ér ‧ QW + dōu / yě ‧ búdàn……, yě…… ‧ yuèláiyuè…… qǐng xuǎnyòng xiàmiàn de jùxíng hàn “S + duì NP / VP + yǒu / méi (yǒu) xìngqù” wánchéng jùzi."
      },
      {
       "hz": "(陳先生、做家事)2. (山本良介、學中文)3. (白小姐、逛夜市)4. (那個學生、歷史/科學)",
       "vi": "(anh Trần, làm việc nhà) (Yamamoto Ryosuke, học tiếng Trung) (cô Bạch, dạo chợ đêm) (cậu học sinh đó, lịch sử/khoa học)",
       "py": "(Chén xiānshēng, zuò jiāshì) 2. (shānběn Liángjiè, xué zhōngwén) 3. (Bái xiǎojiě, guàng yèshì) 4. (nàge xuéshēng, lìshǐ / kēxué)"
      },
      {
       "hz": "你喜歡什麼小吃？",
       "vi": "Bạn thích món ăn vặt nào?",
       "py": "Nǐ xǐhuān shénme xiǎochī?"
      },
      {
       "hz": "你逛過台灣的夜市嗎？你吃過哪些台灣小吃？請你找時間到夜市走一走、看一看，找幾種你想吃的小吃，吃吃看。請你照相，再給同學介紹那些小吃。比如說：味道怎麼樣？多少錢？你推不推薦？為什麼？",
       "vi": "Bạn đã từng dạo chợ đêm ở Đài Loan chưa? Bạn đã ăn những món ăn vặt Đài Loan nào? Hãy dành thời gian đến chợ đêm dạo một vòng, tìm vài món bạn muốn ăn và ăn thử. Hãy chụp ảnh rồi giới thiệu những món đó với các bạn cùng lớp. Ví dụ: vị thế nào? Bao nhiêu tiền? Bạn có giới thiệu không? Tại sao?",
       "py": "Nǐ guàngguò Táiwān de yèshì ma? Nǐ chī guò nǎxiē Táiwān xiǎochī? Qǐng nǐ zhǎo shíjiān dào yèshì zǒu yì zǒu, kànyíkàn, zhǎo jǐzhǒng nǐ xiǎng chī de xiǎochī, chī chī kàn. Qǐng nǐ zhàoxiàng, zài gěi tóngxué jièshào nàxiē xiǎochī. Bǐrúshuō: Wèidào zěnmeyàng? Duōshǎo qián? Nǐ tuī bù tuījiàn? Wèishénme?"
      },
      {
       "hz": "你的國家有什麼特別的菜？",
       "vi": "Nước bạn có món ăn gì đặc biệt?",
       "py": "Nǐ de guójiā yǒu shénme tèbié de cài?"
      },
      {
       "hz": "請你問一問同學，他們國家有哪些特別的菜？也請準備一張照片介紹你國家的菜。上課的時候給同學介紹這個菜的味道、作法。聽了大家的介紹以後，請你說一說你最想吃哪一個菜？為什麼？",
       "vi": "Hãy hỏi các bạn cùng lớp xem nước họ có những món ăn đặc biệt nào? Bạn cũng hãy chuẩn bị một tấm ảnh để giới thiệu món ăn của nước mình. Trong giờ học, giới thiệu với các bạn về hương vị và cách làm món đó. Nghe mọi người giới thiệu xong, hãy nói xem bạn muốn ăn món nào nhất? Tại sao?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, tāmen guójiā yǒu nǎxiē tèbié de cài? Yě qǐng zhǔnbèi yìzhāng zhàopiān jièshào nǐ guójiā de cài. Shàngkè de shíhòu gěi tóngxué jièshào zhège cài de wèidào, zuòfǎ. Tīng le dàjiā de jièshào yǐhòu, qǐng nǐ shuōyìshuō nǐ zuì xiǎng chī nǎ yígè cài? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有興趣 — có / không có hứng thú",
   "giaiThich": "Dùng khi nói ai đó thích hay không thích, hay làm hoặc không hay làm việc gì."
  }
 ],
 "td2-4.3": [
  {
   "title": "2. 雖然我排隊排了一個小時才買到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這本小說很有意思，值得推薦。",
       "vi": "Quyển tiểu thuyết này rất thú vị, đáng để giới thiệu.",
       "py": "Zhèběn xiǎoshuō hěn yǒuyìsi, zhíde tuījiàn."
      },
      {
       "hz": "跨年演唱會的票，可是很值得。",
       "vi": "Vé hoà nhạc đón năm mới…, nhưng rất đáng.",
       "py": "Kuà nián yǎnchànghuì de piào, kěshì hěn zhíde."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 雖然… và 才",
   "giaiThich": "Phần luyện tập hoàn thành câu có 雖然 (tuy) và 才 (mãi mới)."
  },
  {
   "title": "I. Vs得不得了/Vs極了/ extremely, terribly",
   "points": [
    {
     "label": null,
     "formula": "The “Vs 得不得了” pattern implies a very great degree. The complement “得+不得了” should come after Vs to add intensity. When this pattern is used, degree adverbs such as”很” and “非常” should not be placed before Vs at the same time. The “Vs極了” pattern also implies a very great degree. The complement “極了” should come after Vs to add intensity . When this pattern is used, adverbs of degree such as “很” and “非常” should not be placed before Vs at the same time.",
     "examples": [
      {
       "hz": "台北101高得不得了！",
       "vi": "Taipei 101 cao cực kỳ!",
       "py": "Táiběi 101 gāo de bùdéle!"
      },
      {
       "hz": "我媽媽考的蛋糕好吃得不得了！",
       "vi": "Bánh kem mẹ tôi nướng ngon cực kỳ!",
       "py": "Wǒ māma kǎo de dàngāo hǎochī de bùdéle!"
      },
      {
       "hz": "他累得不得了，一回家就睡了。",
       "vi": "Anh ấy mệt cực kỳ, vừa về đến nhà là ngủ luôn.",
       "py": "Tā lèi de bùdéle, yì huíjiā jiù shuì le."
      },
      {
       "hz": "A：今天的天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiān de tiānqì zěnmeyàng?"
      },
      {
       "hz": "A：這雙鞋貴不貴？",
       "vi": "A: Đôi giày này có đắt không?",
       "py": "A: Zhè shuāng xié guì bú guì?"
      },
      {
       "hz": "A：你買的那杯飲料好喝嗎？",
       "vi": "A: Cốc đồ uống bạn mua có ngon không?",
       "py": "A: Nǐ mǎi de nà bēi yǐnliào hǎohē ma?"
      },
      {
       "hz": "Vs得不得了/Vs極了/ 週末的時候,夜市熱鬧極了!",
       "vi": "Vs 得不得了 / Vs 極了: cực kỳ, vô cùng. Cuối tuần chợ đêm náo nhiệt vô cùng!",
       "py": "Vs de bùdéle / Vs jíle / zhōumò de shíhòu, yèshì rènào jíle!"
      },
      {
       "hz": "這杯咖啡沒加糖，喝起來苦極了。",
       "vi": "Cốc cà phê này không cho đường, uống đắng cực kỳ.",
       "py": "Zhè bēi kāfēi méi jiātáng, hē qǐlái kǔ jíle."
      },
      {
       "hz": "她快結婚了,所以最近心情好極了!",
       "vi": "Cô ấy sắp kết hôn, nên dạo này tâm trạng tốt vô cùng!",
       "py": "Tā kuài jiéhūn le, suǒyǐ zuìjìn xīnqíng hǎojíle!"
      },
      {
       "hz": "A：她唱歌好聽嗎？",
       "vi": "A: Cô ấy hát có hay không?",
       "py": "A: Tā chànggē hǎotīng ma?"
      },
      {
       "hz": "A：他們覺得這個電影怎麼樣？",
       "vi": "A: Họ thấy bộ phim này thế nào?",
       "py": "A: Tāmen juéde zhège diànyǐng zěnmeyàng?"
      },
      {
       "hz": "A：他打籃球打得怎麼樣？",
       "vi": "A: Anh ấy chơi bóng rổ thế nào?",
       "py": "A: Tā dǎlánqiú dǎ de zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得不得了 / Vs 極了 — cực kỳ",
   "giaiThich": "Nhấn mạnh mức độ rất cao. Bổ ngữ 得不得了 đứng sau tính từ. Đã dùng mẫu này thì KHÔNG thêm 很, 非常 phía trước nữa."
  },
  {
   "title": "II. 越來越… more and more",
   "points": [
    {
     "label": null,
     "formula": "The “越來越⋯⋯” pattern is used to express the level of changes or the amountincreasing or decreasing with time. It also includes “S+越來越+Vs / Vst+O /Vaux+V+O.” In this pattern, change of state “了” is frequently used in sentence final position. The verb complement “起” implies one’s ability to afford something. Thus, only a few verbs, such as “吃 (eat)”, “喝 (drink)”, “念 (study)”, “買 (buy)”, “住 (live)”, “付(pay)”, “租 (rent)”, “穿(wear)” and “用 (use)”, can be used along with “起”. The common patterns include “V得起” and “V不起”, but patterns like “V 起了” or “沒V 起”are not acceptable in Chinese. III. V起：V得起/V不起 to be able to afford or not The resultative complement “飽” implies that the subject feels fully satisfied or enough. Thus, “飽” often comes after “吃(eat)” and “睡(sleep)”.The “V得/不飽” pattern indicate whether something is potentially enough to satisfy the subject, while the “沒V飽” and “V飽了” patterns indicates whether the subject feels fully satisfied at last or not. resultative complement 飽 for being full or enough",
     "examples": [
      {
       "hz": "我跟室友越來越熟了。",
       "vi": "Tôi và bạn cùng phòng ngày càng thân.",
       "py": "Wǒ gēn shìyǒu yuèláiyuè shú le."
      },
      {
       "hz": "這個地方的大樓越來越多了。",
       "vi": "Nhà cao tầng ở khu này ngày càng nhiều.",
       "py": "Zhège dìfāng de dàlóu yuèláiyuè duō le."
      },
      {
       "hz": "那個人很不客氣，所以朋友越來越少了。",
       "vi": "Người đó rất bất lịch sự, nên bạn bè ngày càng ít.",
       "py": "Nàge rén hěn bú kèqì, suǒyǐ péngyǒu yuèláiyuèshǎo le."
      },
      {
       "hz": "冬天到了，今天比昨天更冷了。",
       "vi": "Mùa đông đến rồi, hôm nay còn lạnh hơn hôm qua.",
       "py": "Dōngtiān dào le, jīntiān bǐ zuótiān gèng lěng le."
      },
      {
       "hz": "第二課的中國字比第一課難寫；第三課的中國字比第二課的更難寫…改寫句子 Viết lại câu bằng mẫu 越來越.",
       "vi": "Chữ Hán bài 2 khó viết hơn bài 1; chữ Hán bài 3 còn khó viết hơn bài 2… Viết lại câu bằng mẫu 越來越.",
       "py": "Dì'èrkè de Zhōngguó zì bǐ dìyīkè nán xiě; dìsānkè de Zhōngguó zì bǐ dì'èrkè de gèng nán xiě… gǎixiě jùzi Vi ế t l ạ i c â u b ằ ng m ẫ u yuèláiyuè."
      },
      {
       "hz": "那件衣服太貴了，我怎麼買得起？",
       "vi": "Bộ quần áo đó đắt quá, tôi làm sao mua nổi?",
       "py": "Nà jiàn yīfú tàiguì le, wǒ zěnme mǎideqǐ?"
      },
      {
       "hz": "台灣小吃的價錢很便宜，誰都吃得起。",
       "vi": "Giá đồ ăn vặt Đài Loan rất rẻ, ai cũng ăn được.",
       "py": "Táiwān xiǎochī de jiàqián hěn piányi, shéi dōu chīdeqǐ."
      },
      {
       "hz": "他非常有錢,當然喝得起一杯一千塊的酒。",
       "vi": "Anh ấy rất giàu, đương nhiên uống nổi một ly rượu một nghìn đồng.",
       "py": "Tā fēicháng yǒuqián, dāngrán hē de qǐ yìbēi yìqiānkuài de jiǔ."
      },
      {
       "hz": "在這裡看醫生貴得不得了,沒錢的人看不起。",
       "vi": "Khám bệnh ở đây đắt cực kỳ, người không có tiền không khám nổi.",
       "py": "Zài zhèlǐ kàn yīshēng guì de bùdéle, méi qián de rén kànbùqǐ."
      },
      {
       "hz": "A：這個公寓一個月的房租五萬塊錢，你要租嗎？",
       "vi": "A: Căn hộ này tiền thuê một tháng năm vạn đồng, bạn có thuê không?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū wǔwànkuài qián, nǐ yào zū ma?"
      },
      {
       "hz": "IV. V飽：沒V飽/V飽了/V得飽/V不飽你只吃了半碗飯，怎麼吃得飽呢？",
       "vi": "IV. V飽: chưa V no / V no rồi / V được no / V không no. Bạn mới ăn nửa bát cơm, sao no được?",
       "py": "IV. V bǎo: Méi V bǎo / V bǎo le / V de bǎo / V bù bǎo nǐ zhǐ chī le bànwǎn fàn, zěnme chīdebǎo ne?"
      },
      {
       "hz": "我昨天只睡了三個鐘頭的覺，當然沒睡飽！",
       "vi": "Hôm qua tôi chỉ ngủ ba tiếng, đương nhiên ngủ chưa đủ!",
       "py": "Wǒ zuótiān zhǐ shuì le sāngè zhōngtóu de jué, dāngrán méi shuìbǎo!"
      },
      {
       "hz": "今天的舞會我們準備了很多好吃的食物，大家一定吃得飽。",
       "vi": "Buổi tiệc nhảy hôm nay chúng tôi chuẩn bị rất nhiều đồ ăn ngon, mọi người chắc chắn sẽ ăn no.",
       "py": "Jīntiān de wǔhuì wǒmen zhǔnbèi le hěnduō hǎochī de shíwù, dàjiā yídìng chīdebǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越來越… — ngày càng…",
   "giaiThich": "Diễn đạt mức độ tăng hoặc giảm dần theo thời gian; cuối câu thường có 了 chỉ sự thay đổi."
  },
  {
   "title": "V. S+對NP/VP(+Adv)+有/沒(有)興趣",
   "points": [
    {
     "label": null,
     "formula": "“興趣” is used when the subject is passionate about doing something or doessomething very often. Make sentences with the given phrases or grammar patterns.",
     "examples": [
      {
       "hz": "台灣人不都對吃臭豆腐有興趣。",
       "vi": "Không phải người Đài Loan nào cũng hứng thú với món đậu phụ thối.",
       "py": "Táiwānrén bù dōu duì chī chòudòufǔ yǒu xìngqù."
      },
      {
       "hz": "弟弟只對數學有興趣,其他的都沒興趣。",
       "vi": "Em trai chỉ hứng thú với môn toán, các môn khác đều không hứng thú.",
       "py": "Dìdi zhǐ duì shùxué yǒu xìngqù, qítā de dōu méi xìngqù."
      },
      {
       "hz": "陳小姐對逛百貨公司很有興趣,每個週末都去。",
       "vi": "Cô Trần rất hứng thú với việc đi dạo trung tâm thương mại, cuối tuần nào cũng đi.",
       "py": "Chén xiǎojiě duì guàng bǎihuògōngsī hěn yǒu xìngqù, měigè zhōumò dōu qù."
      },
      {
       "hz": "‧有一點兒 ‧QW+都/也 ‧不但⋯⋯,也⋯⋯ ‧越來越⋯⋯請選用下面的句型和「S+對NP/VP+有/沒(有)興趣」完成句子。",
       "vi": "‧ hơi… ‧ từ để hỏi + 都/也 ‧ không những… mà còn… ‧ ngày càng… Hãy chọn các mẫu câu dưới đây và mẫu “S + 對 NP/VP (+ phó từ) + 有/沒(有)興趣” để hoàn thành câu.",
       "py": "‧ yǒu yìdiǎn'ér ‧ QW + dōu / yě ‧ búdàn……, yě…… ‧ yuèláiyuè…… qǐng xuǎnyòng xiàmiàn de jùxíng hàn “S + duì NP / VP + yǒu / méi (yǒu) xìngqù” wánchéng jùzi."
      },
      {
       "hz": "(陳先生、做家事)2. (山本良介、學中文)3. (白小姐、逛夜市)4. (那個學生、歷史/科學)",
       "vi": "(anh Trần, làm việc nhà) (Yamamoto Ryosuke, học tiếng Trung) (cô Bạch, dạo chợ đêm) (cậu học sinh đó, lịch sử/khoa học)",
       "py": "(Chén xiānshēng, zuò jiāshì) 2. (shānběn Liángjiè, xué zhōngwén) 3. (Bái xiǎojiě, guàng yèshì) 4. (nàge xuéshēng, lìshǐ / kēxué)"
      },
      {
       "hz": "你喜歡什麼小吃？",
       "vi": "Bạn thích món ăn vặt nào?",
       "py": "Nǐ xǐhuān shénme xiǎochī?"
      },
      {
       "hz": "你逛過台灣的夜市嗎？你吃過哪些台灣小吃？請你找時間到夜市走一走、看一看，找幾種你想吃的小吃，吃吃看。請你照相，再給同學介紹那些小吃。比如說：味道怎麼樣？多少錢？你推不推薦？為什麼？",
       "vi": "Bạn đã từng dạo chợ đêm ở Đài Loan chưa? Bạn đã ăn những món ăn vặt Đài Loan nào? Hãy dành thời gian đến chợ đêm dạo một vòng, tìm vài món bạn muốn ăn và ăn thử. Hãy chụp ảnh rồi giới thiệu những món đó với các bạn cùng lớp. Ví dụ: vị thế nào? Bao nhiêu tiền? Bạn có giới thiệu không? Tại sao?",
       "py": "Nǐ guàngguò Táiwān de yèshì ma? Nǐ chī guò nǎxiē Táiwān xiǎochī? Qǐng nǐ zhǎo shíjiān dào yèshì zǒu yì zǒu, kànyíkàn, zhǎo jǐzhǒng nǐ xiǎng chī de xiǎochī, chī chī kàn. Qǐng nǐ zhàoxiàng, zài gěi tóngxué jièshào nàxiē xiǎochī. Bǐrúshuō: Wèidào zěnmeyàng? Duōshǎo qián? Nǐ tuī bù tuījiàn? Wèishénme?"
      },
      {
       "hz": "你的國家有什麼特別的菜？",
       "vi": "Nước bạn có món ăn gì đặc biệt?",
       "py": "Nǐ de guójiā yǒu shénme tèbié de cài?"
      },
      {
       "hz": "請你問一問同學，他們國家有哪些特別的菜？也請準備一張照片介紹你國家的菜。上課的時候給同學介紹這個菜的味道、作法。聽了大家的介紹以後，請你說一說你最想吃哪一個菜？為什麼？",
       "vi": "Hãy hỏi các bạn cùng lớp xem nước họ có những món ăn đặc biệt nào? Bạn cũng hãy chuẩn bị một tấm ảnh để giới thiệu món ăn của nước mình. Trong giờ học, giới thiệu với các bạn về hương vị và cách làm món đó. Nghe mọi người giới thiệu xong, hãy nói xem bạn muốn ăn món nào nhất? Tại sao?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, tāmen guójiā yǒu nǎxiē tèbié de cài? Yě qǐng zhǔnbèi yìzhāng zhàopiān jièshào nǐ guójiā de cài. Shàngkè de shíhòu gěi tóngxué jièshào zhège cài de wèidào, zuòfǎ. Tīng le dàjiā de jièshào yǐhòu, qǐng nǐ shuōyìshuō nǐ zuì xiǎng chī nǎ yígè cài? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有興趣 — có / không có hứng thú",
   "giaiThich": "Dùng khi nói ai đó thích hay không thích, hay làm hoặc không hay làm việc gì."
  }
 ],
 "td2-4.4": [
  {
   "title": "2. 雖然我排隊排了一個小時才買到",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這本小說很有意思，值得推薦。",
       "vi": "Quyển tiểu thuyết này rất thú vị, đáng để giới thiệu.",
       "py": "Zhèběn xiǎoshuō hěn yǒuyìsi, zhíde tuījiàn."
      },
      {
       "hz": "跨年演唱會的票，可是很值得。",
       "vi": "Vé hoà nhạc đón năm mới…, nhưng rất đáng.",
       "py": "Kuà nián yǎnchànghuì de piào, kěshì hěn zhíde."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 雖然… và 才",
   "giaiThich": "Phần luyện tập hoàn thành câu có 雖然 (tuy) và 才 (mãi mới)."
  },
  {
   "title": "I. Vs得不得了/Vs極了/ extremely, terribly",
   "points": [
    {
     "label": null,
     "formula": "The “Vs 得不得了” pattern implies a very great degree. The complement “得+不得了” should come after Vs to add intensity. When this pattern is used, degree adverbs such as”很” and “非常” should not be placed before Vs at the same time. The “Vs極了” pattern also implies a very great degree. The complement “極了” should come after Vs to add intensity . When this pattern is used, adverbs of degree such as “很” and “非常” should not be placed before Vs at the same time.",
     "examples": [
      {
       "hz": "台北101高得不得了！",
       "vi": "Taipei 101 cao cực kỳ!",
       "py": "Táiběi 101 gāo de bùdéle!"
      },
      {
       "hz": "我媽媽考的蛋糕好吃得不得了！",
       "vi": "Bánh kem mẹ tôi nướng ngon cực kỳ!",
       "py": "Wǒ māma kǎo de dàngāo hǎochī de bùdéle!"
      },
      {
       "hz": "他累得不得了，一回家就睡了。",
       "vi": "Anh ấy mệt cực kỳ, vừa về đến nhà là ngủ luôn.",
       "py": "Tā lèi de bùdéle, yì huíjiā jiù shuì le."
      },
      {
       "hz": "A：今天的天氣怎麼樣？",
       "vi": "A: Hôm nay thời tiết thế nào?",
       "py": "A: Jīntiān de tiānqì zěnmeyàng?"
      },
      {
       "hz": "A：這雙鞋貴不貴？",
       "vi": "A: Đôi giày này có đắt không?",
       "py": "A: Zhè shuāng xié guì bú guì?"
      },
      {
       "hz": "A：你買的那杯飲料好喝嗎？",
       "vi": "A: Cốc đồ uống bạn mua có ngon không?",
       "py": "A: Nǐ mǎi de nà bēi yǐnliào hǎohē ma?"
      },
      {
       "hz": "Vs得不得了/Vs極了/ 週末的時候,夜市熱鬧極了!",
       "vi": "Vs 得不得了 / Vs 極了: cực kỳ, vô cùng. Cuối tuần chợ đêm náo nhiệt vô cùng!",
       "py": "Vs de bùdéle / Vs jíle / zhōumò de shíhòu, yèshì rènào jíle!"
      },
      {
       "hz": "這杯咖啡沒加糖，喝起來苦極了。",
       "vi": "Cốc cà phê này không cho đường, uống đắng cực kỳ.",
       "py": "Zhè bēi kāfēi méi jiātáng, hē qǐlái kǔ jíle."
      },
      {
       "hz": "她快結婚了,所以最近心情好極了!",
       "vi": "Cô ấy sắp kết hôn, nên dạo này tâm trạng tốt vô cùng!",
       "py": "Tā kuài jiéhūn le, suǒyǐ zuìjìn xīnqíng hǎojíle!"
      },
      {
       "hz": "A：她唱歌好聽嗎？",
       "vi": "A: Cô ấy hát có hay không?",
       "py": "A: Tā chànggē hǎotīng ma?"
      },
      {
       "hz": "A：他們覺得這個電影怎麼樣？",
       "vi": "A: Họ thấy bộ phim này thế nào?",
       "py": "A: Tāmen juéde zhège diànyǐng zěnmeyàng?"
      },
      {
       "hz": "A：他打籃球打得怎麼樣？",
       "vi": "A: Anh ấy chơi bóng rổ thế nào?",
       "py": "A: Tā dǎlánqiú dǎ de zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 得不得了 / Vs 極了 — cực kỳ",
   "giaiThich": "Nhấn mạnh mức độ rất cao. Bổ ngữ 得不得了 đứng sau tính từ. Đã dùng mẫu này thì KHÔNG thêm 很, 非常 phía trước nữa."
  },
  {
   "title": "II. 越來越… more and more",
   "points": [
    {
     "label": null,
     "formula": "The “越來越⋯⋯” pattern is used to express the level of changes or the amountincreasing or decreasing with time. It also includes “S+越來越+Vs / Vst+O /Vaux+V+O.” In this pattern, change of state “了” is frequently used in sentence final position. The verb complement “起” implies one’s ability to afford something. Thus, only a few verbs, such as “吃 (eat)”, “喝 (drink)”, “念 (study)”, “買 (buy)”, “住 (live)”, “付(pay)”, “租 (rent)”, “穿(wear)” and “用 (use)”, can be used along with “起”. The common patterns include “V得起” and “V不起”, but patterns like “V 起了” or “沒V 起”are not acceptable in Chinese. III. V起：V得起/V不起 to be able to afford or not The resultative complement “飽” implies that the subject feels fully satisfied or enough. Thus, “飽” often comes after “吃(eat)” and “睡(sleep)”.The “V得/不飽” pattern indicate whether something is potentially enough to satisfy the subject, while the “沒V飽” and “V飽了” patterns indicates whether the subject feels fully satisfied at last or not. resultative complement 飽 for being full or enough",
     "examples": [
      {
       "hz": "我跟室友越來越熟了。",
       "vi": "Tôi và bạn cùng phòng ngày càng thân.",
       "py": "Wǒ gēn shìyǒu yuèláiyuè shú le."
      },
      {
       "hz": "這個地方的大樓越來越多了。",
       "vi": "Nhà cao tầng ở khu này ngày càng nhiều.",
       "py": "Zhège dìfāng de dàlóu yuèláiyuè duō le."
      },
      {
       "hz": "那個人很不客氣，所以朋友越來越少了。",
       "vi": "Người đó rất bất lịch sự, nên bạn bè ngày càng ít.",
       "py": "Nàge rén hěn bú kèqì, suǒyǐ péngyǒu yuèláiyuèshǎo le."
      },
      {
       "hz": "冬天到了，今天比昨天更冷了。",
       "vi": "Mùa đông đến rồi, hôm nay còn lạnh hơn hôm qua.",
       "py": "Dōngtiān dào le, jīntiān bǐ zuótiān gèng lěng le."
      },
      {
       "hz": "第二課的中國字比第一課難寫；第三課的中國字比第二課的更難寫…改寫句子 Viết lại câu bằng mẫu 越來越.",
       "vi": "Chữ Hán bài 2 khó viết hơn bài 1; chữ Hán bài 3 còn khó viết hơn bài 2… Viết lại câu bằng mẫu 越來越.",
       "py": "Dì'èrkè de Zhōngguó zì bǐ dìyīkè nán xiě; dìsānkè de Zhōngguó zì bǐ dì'èrkè de gèng nán xiě… gǎixiě jùzi Vi ế t l ạ i c â u b ằ ng m ẫ u yuèláiyuè."
      },
      {
       "hz": "那件衣服太貴了，我怎麼買得起？",
       "vi": "Bộ quần áo đó đắt quá, tôi làm sao mua nổi?",
       "py": "Nà jiàn yīfú tàiguì le, wǒ zěnme mǎideqǐ?"
      },
      {
       "hz": "台灣小吃的價錢很便宜，誰都吃得起。",
       "vi": "Giá đồ ăn vặt Đài Loan rất rẻ, ai cũng ăn được.",
       "py": "Táiwān xiǎochī de jiàqián hěn piányi, shéi dōu chīdeqǐ."
      },
      {
       "hz": "他非常有錢,當然喝得起一杯一千塊的酒。",
       "vi": "Anh ấy rất giàu, đương nhiên uống nổi một ly rượu một nghìn đồng.",
       "py": "Tā fēicháng yǒuqián, dāngrán hē de qǐ yìbēi yìqiānkuài de jiǔ."
      },
      {
       "hz": "在這裡看醫生貴得不得了,沒錢的人看不起。",
       "vi": "Khám bệnh ở đây đắt cực kỳ, người không có tiền không khám nổi.",
       "py": "Zài zhèlǐ kàn yīshēng guì de bùdéle, méi qián de rén kànbùqǐ."
      },
      {
       "hz": "A：這個公寓一個月的房租五萬塊錢，你要租嗎？",
       "vi": "A: Căn hộ này tiền thuê một tháng năm vạn đồng, bạn có thuê không?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū wǔwànkuài qián, nǐ yào zū ma?"
      },
      {
       "hz": "IV. V飽：沒V飽/V飽了/V得飽/V不飽你只吃了半碗飯，怎麼吃得飽呢？",
       "vi": "IV. V飽: chưa V no / V no rồi / V được no / V không no. Bạn mới ăn nửa bát cơm, sao no được?",
       "py": "IV. V bǎo: Méi V bǎo / V bǎo le / V de bǎo / V bù bǎo nǐ zhǐ chī le bànwǎn fàn, zěnme chīdebǎo ne?"
      },
      {
       "hz": "我昨天只睡了三個鐘頭的覺，當然沒睡飽！",
       "vi": "Hôm qua tôi chỉ ngủ ba tiếng, đương nhiên ngủ chưa đủ!",
       "py": "Wǒ zuótiān zhǐ shuì le sāngè zhōngtóu de jué, dāngrán méi shuìbǎo!"
      },
      {
       "hz": "今天的舞會我們準備了很多好吃的食物，大家一定吃得飽。",
       "vi": "Buổi tiệc nhảy hôm nay chúng tôi chuẩn bị rất nhiều đồ ăn ngon, mọi người chắc chắn sẽ ăn no.",
       "py": "Jīntiān de wǔhuì wǒmen zhǔnbèi le hěnduō hǎochī de shíwù, dàjiā yídìng chīdebǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越來越… — ngày càng…",
   "giaiThich": "Diễn đạt mức độ tăng hoặc giảm dần theo thời gian; cuối câu thường có 了 chỉ sự thay đổi."
  },
  {
   "title": "V. S+對NP/VP(+Adv)+有/沒(有)興趣",
   "points": [
    {
     "label": null,
     "formula": "“興趣” is used when the subject is passionate about doing something or doessomething very often. Make sentences with the given phrases or grammar patterns.",
     "examples": [
      {
       "hz": "台灣人不都對吃臭豆腐有興趣。",
       "vi": "Không phải người Đài Loan nào cũng hứng thú với món đậu phụ thối.",
       "py": "Táiwānrén bù dōu duì chī chòudòufǔ yǒu xìngqù."
      },
      {
       "hz": "弟弟只對數學有興趣,其他的都沒興趣。",
       "vi": "Em trai chỉ hứng thú với môn toán, các môn khác đều không hứng thú.",
       "py": "Dìdi zhǐ duì shùxué yǒu xìngqù, qítā de dōu méi xìngqù."
      },
      {
       "hz": "陳小姐對逛百貨公司很有興趣,每個週末都去。",
       "vi": "Cô Trần rất hứng thú với việc đi dạo trung tâm thương mại, cuối tuần nào cũng đi.",
       "py": "Chén xiǎojiě duì guàng bǎihuògōngsī hěn yǒu xìngqù, měigè zhōumò dōu qù."
      },
      {
       "hz": "‧有一點兒 ‧QW+都/也 ‧不但⋯⋯,也⋯⋯ ‧越來越⋯⋯請選用下面的句型和「S+對NP/VP+有/沒(有)興趣」完成句子。",
       "vi": "‧ hơi… ‧ từ để hỏi + 都/也 ‧ không những… mà còn… ‧ ngày càng… Hãy chọn các mẫu câu dưới đây và mẫu “S + 對 NP/VP (+ phó từ) + 有/沒(有)興趣” để hoàn thành câu.",
       "py": "‧ yǒu yìdiǎn'ér ‧ QW + dōu / yě ‧ búdàn……, yě…… ‧ yuèláiyuè…… qǐng xuǎnyòng xiàmiàn de jùxíng hàn “S + duì NP / VP + yǒu / méi (yǒu) xìngqù” wánchéng jùzi."
      },
      {
       "hz": "(陳先生、做家事)2. (山本良介、學中文)3. (白小姐、逛夜市)4. (那個學生、歷史/科學)",
       "vi": "(anh Trần, làm việc nhà) (Yamamoto Ryosuke, học tiếng Trung) (cô Bạch, dạo chợ đêm) (cậu học sinh đó, lịch sử/khoa học)",
       "py": "(Chén xiānshēng, zuò jiāshì) 2. (shānběn Liángjiè, xué zhōngwén) 3. (Bái xiǎojiě, guàng yèshì) 4. (nàge xuéshēng, lìshǐ / kēxué)"
      },
      {
       "hz": "你喜歡什麼小吃？",
       "vi": "Bạn thích món ăn vặt nào?",
       "py": "Nǐ xǐhuān shénme xiǎochī?"
      },
      {
       "hz": "你逛過台灣的夜市嗎？你吃過哪些台灣小吃？請你找時間到夜市走一走、看一看，找幾種你想吃的小吃，吃吃看。請你照相，再給同學介紹那些小吃。比如說：味道怎麼樣？多少錢？你推不推薦？為什麼？",
       "vi": "Bạn đã từng dạo chợ đêm ở Đài Loan chưa? Bạn đã ăn những món ăn vặt Đài Loan nào? Hãy dành thời gian đến chợ đêm dạo một vòng, tìm vài món bạn muốn ăn và ăn thử. Hãy chụp ảnh rồi giới thiệu những món đó với các bạn cùng lớp. Ví dụ: vị thế nào? Bao nhiêu tiền? Bạn có giới thiệu không? Tại sao?",
       "py": "Nǐ guàngguò Táiwān de yèshì ma? Nǐ chī guò nǎxiē Táiwān xiǎochī? Qǐng nǐ zhǎo shíjiān dào yèshì zǒu yì zǒu, kànyíkàn, zhǎo jǐzhǒng nǐ xiǎng chī de xiǎochī, chī chī kàn. Qǐng nǐ zhàoxiàng, zài gěi tóngxué jièshào nàxiē xiǎochī. Bǐrúshuō: Wèidào zěnmeyàng? Duōshǎo qián? Nǐ tuī bù tuījiàn? Wèishénme?"
      },
      {
       "hz": "你的國家有什麼特別的菜？",
       "vi": "Nước bạn có món ăn gì đặc biệt?",
       "py": "Nǐ de guójiā yǒu shénme tèbié de cài?"
      },
      {
       "hz": "請你問一問同學，他們國家有哪些特別的菜？也請準備一張照片介紹你國家的菜。上課的時候給同學介紹這個菜的味道、作法。聽了大家的介紹以後，請你說一說你最想吃哪一個菜？為什麼？",
       "vi": "Hãy hỏi các bạn cùng lớp xem nước họ có những món ăn đặc biệt nào? Bạn cũng hãy chuẩn bị một tấm ảnh để giới thiệu món ăn của nước mình. Trong giờ học, giới thiệu với các bạn về hương vị và cách làm món đó. Nghe mọi người giới thiệu xong, hãy nói xem bạn muốn ăn món nào nhất? Tại sao?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, tāmen guójiā yǒu nǎxiē tèbié de cài? Yě qǐng zhǔnbèi yìzhāng zhàopiān jièshào nǐ guójiā de cài. Shàngkè de shíhòu gěi tóngxué jièshào zhège cài de wèidào, zuòfǎ. Tīng le dàjiā de jièshào yǐhòu, qǐng nǐ shuōyìshuō nǐ zuì xiǎng chī nǎ yígè cài? Wèishénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有興趣 — có / không có hứng thú",
   "giaiThich": "Dùng khi nói ai đó thích hay không thích, hay làm hoặc không hay làm việc gì."
  }
 ],
 "td2-5.1": [
  {
   "title": "I. N1 (+ Neg) + 被 (+N2) + V + C",
   "points": [
    {
     "label": null,
     "formula": "This pattern is one type of passive sentences. “N1” is the patient of the verb, while “N2” which sometimes would be omitted, is the agent. Another common pattern is “N1被(N2) V C”, where C is the complement denoting the result of the verb or how an action is accomplished. The negation word “沒” must be placed before “被”. If there are two subjects (S1, S2), S2 should be placed in front of “就”, “S1+ V著V著, 改寫句子。Rewrite the sentences with the grammar.",
     "examples": [
      {
       "hz": "他家的門被小偷打開了。2. 他亂丟垃圾的時候，被鄰居發現了。3. 同事昨天送給我的甜點怎麼被吃了？我記得放在冰箱裡啊！",
       "vi": "Cửa nhà anh ấy bị trộm mở ra. Lúc anh ấy vứt rác bừa bãi thì bị hàng xóm phát hiện. Món tráng miệng đồng nghiệp tặng tôi hôm qua sao lại bị ăn mất rồi? Tôi nhớ là để trong tủ lạnh mà!",
       "py": "Tājiā de mén bèi xiǎotōu dǎkāi le. 2. Tā luàndiūlèsè de shíhòu, bèi línjū fāxiàn le. 3. Tóngshì zuótiān sònggěi wǒ de tiándiǎn zěnme bèi chī le? Wǒ jìde fàngzài bīngxiāng lǐ a!"
      },
      {
       "hz": "室友把我的果汁喝了。",
       "vi": "Bạn cùng phòng uống mất nước ép của tôi rồi.",
       "py": "Shìyǒu bǎ wǒ de guǒzhī hē le."
      },
      {
       "hz": "媽媽看見弟弟不寫功課，在玩遊戲。",
       "vi": "Mẹ thấy em trai không làm bài tập mà đang chơi game.",
       "py": "Māma kànjiàn dìdi bù xiě gōngkè, zài wányóuxì."
      },
      {
       "hz": "小狗弄髒了我剛洗乾淨的鞋子。",
       "vi": "Con chó nhỏ làm bẩn đôi giày tôi vừa giặt sạch.",
       "py": "Xiǎogǒu nòngzāngle wǒ gāng xǐ gānjìng de xiézi."
      },
      {
       "hz": "那張桌子在一樓，沒被搬上二樓去。2. 你的東西不要亂放，才不會被媽媽丟了。3. 你那件漂亮的衣服沒被姊姊穿去參加舞會，還掛在衣櫃裡呢！",
       "vi": "Cái bàn đó ở tầng một, chưa bị khiêng lên tầng hai. Bạn đừng để đồ bừa bãi thì mới không bị mẹ vứt đi. Bộ quần áo đẹp của bạn không bị chị mặc đi dự tiệc, vẫn treo trong tủ đấy!",
       "py": "Nà zhāng zhuōzi zài yìlóu, méi bèi bān shàng èrlóu qù. 2. Nǐ de dōngxī búyào luànfàng, cái búhuì bèi māma diū le. 3. Nǐ nà jiàn piàoliàng de yīfú méi bèi jiějie chuān qù cānjiā wǔhuì, hái guà zài yīguì lǐ ne!"
      },
      {
       "hz": "先生：我找不到我的車，我要去找警察。",
       "vi": "Chồng: Anh không tìm thấy xe, anh phải đi báo cảnh sát.",
       "py": "Xiānshēng: Wǒ zhǎo búdào wǒ de chē, wǒ yào qù zhǎo jǐngchá."
      },
      {
       "hz": "他跟我聊天的時候，聊著聊著就笑了。2. 孩子在公園裡玩著玩著，就忘了回家的時間了。3. 我用這枝筆寫字，寫著寫著，不知道為什麼，筆就壞了。",
       "vi": "Lúc nói chuyện với tôi, nói một hồi anh ấy bật cười. Bọn trẻ chơi trong công viên, chơi mãi rồi quên cả giờ về nhà. Tôi dùng cây bút này viết, viết một hồi thì không hiểu sao bút hỏng mất.",
       "py": "Tā gēn wǒ liáotiān de shíhòu, liáo zhe liáo zhe jiù xiào le. 2. Háizi zài gōngyuán lǐ wán zhe wán zhe, jiù wàng le huíjiā de shíjiān le. 3. Wǒ yòng zhè zhī bǐ xiězì, xiě zhe xiě zhe, bù zhīdào wèishénme, bǐ jiù huài le."
      },
      {
       "hz": "妹妹在公車上聽音樂，然後就到家了。",
       "vi": "Em gái nghe nhạc trên xe buýt, rồi về đến nhà.",
       "py": "Mèimei zài gōngchēshàng tīng yīnyuè, ránhòu jiù dào jiā le."
      },
      {
       "hz": "他走路去圖書館，後來就下雨了。",
       "vi": "Anh ấy đi bộ đến thư viện, sau đó trời mưa.",
       "py": "Tā zǒulù qù túshūguǎn, hòulái jiù xiàyǔ le."
      },
      {
       "hz": "媽媽說故事給孩子聽，後來孩子睡著了。",
       "vi": "Mẹ kể chuyện cho con nghe, sau đó con ngủ thiếp đi.",
       "py": "Māma shuō gùshì gěi háizi tīng, hòulái háizi shuì zhe le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu bị động với 被",
   "giaiThich": "N1 là đối tượng chịu tác động, N2 là người gây ra (có thể lược bỏ). Sau động từ thường có bổ ngữ chỉ kết quả."
  },
  {
   "title": "III. 只要...就... as long as...",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates an easy solution to a problem. If the condition coming after “只要” is fulfilled, the problem can be solved. 請用提示完成對話。Complete the dialogues with given phrases. The frequency adverb \"sometimes\" in this pattern indicates the frequency of two actions(it can be same action with different objects.) 請用提示完成句子。Complete the sentences with given phrases. The pattern \" V起(O)來\" indicates an action or a status begins and lasts. Sometimes, it would be placed at the end of a sentence to show results. If \" V起(O)來\" is placed in the former part of a sentence, the latter part is used to modify the former one. If an object exists, it should be placed between \"起\" and \"來\", e.g., \"下起雨來\", \"說起話來\", etc. This pattern indicates the situation described after \"還好\", otherwise, a negative result after",
     "examples": [
      {
       "hz": "A：請問，我要怎麼參加學校的網球比賽？",
       "vi": "A: Cho hỏi, làm sao để tham gia giải quần vợt của trường?",
       "py": "A: Qǐngwèn, wǒ yào zěnme cānjiā xuéxiào de wǎngqiú bǐsài?"
      },
      {
       "hz": "B：很簡單，只要跟老師說就可以了。",
       "vi": "B: Đơn giản lắm, chỉ cần báo với thầy giáo là được.",
       "py": "B: Hěn jiǎndān, zhǐyào gēn lǎoshī shuō jiù kěyǐ le."
      },
      {
       "hz": "A：喂，我到你家大樓門口了，要怎麼進去呢？",
       "vi": "A: Alo, tôi đến cửa toà nhà của bạn rồi, vào bằng cách nào?",
       "py": "A: Wèi, wǒ dào nǐjiā dàlóu ménkǒu le, yào zěnme jìnqù ne?"
      },
      {
       "hz": "B：你只要跟門口的人說你的名字，就可以進來了。",
       "vi": "B: Bạn chỉ cần báo tên với người ở cửa là vào được.",
       "py": "B: Nǐ zhǐyào gēn ménkǒu de rén shuō nǐ de míngzì, jiù kěyǐ jìnlái le."
      },
      {
       "hz": "錢先生：我什麼時候能搬進去？",
       "vi": "Anh Tiền: Khi nào tôi dọn vào được?",
       "py": "Qián xiānshēng: Wǒ shénme shíhòu néng bānjìn qù?"
      },
      {
       "hz": "王太太：只要付完押金和房租，我就會把鑰匙給你。",
       "vi": "Bà Vương: Chỉ cần trả xong tiền cọc và tiền thuê, tôi sẽ đưa chìa khoá cho anh.",
       "py": "Wáng tàitai: Zhǐyào fù wán yājīn hàn fángzū, wǒ jiù huì bǎ yàoshi gěi nǐ."
      },
      {
       "hz": "A：我的中文字寫得不好看，怎麼辦？ (多練習)2. A：應該怎麼做，我的身體才會比較健康？(少吃甜點/多運動)3. 孩子：我可以躺在公園的草地上嗎？(垃圾/蟲子)",
       "vi": "A: Chữ Hán tôi viết không đẹp, làm sao đây? (luyện nhiều) A: Phải làm thế nào thì sức khoẻ tôi mới tốt hơn? (ăn ít đồ ngọt / tập thể dục nhiều) Con: Con nằm trên bãi cỏ trong công viên được không? (rác / côn trùng)",
       "py": "A: Wǒ de zhōng wénzì xiě de bù hǎokàn, zěnmebàn? (duō liànxí) 2. A: Yīnggāi zěnme zuò, wǒ de shēntǐ cái huì bǐjiào jiànkāng? (shǎo chī tiándiǎn / duō yùndòng) 3. Háizi: Wǒ kěyǐ tǎng zài gōngyuán de cǎodì shàng ma? (lèsè / chóngzi)"
      },
      {
       "hz": "A：你去夜市的時候，常常吃雞排嗎？ B：不一定，有時候吃雞排，有時候吃烤魷魚。",
       "vi": "A: Khi đi chợ đêm, bạn có hay ăn gà rán miếng không? B: Không nhất định, có lúc ăn gà rán, có lúc ăn mực nướng.",
       "py": "A: Nǐ qù yèshì de shíhòu, chángcháng chī jī pái ma? B: Bù yídìng, yǒushíhòu chī jī pái, yǒushíhòu chī kǎo yóuyú."
      },
      {
       "hz": "IV. 有時候...，有時候... 2. A：放假的時候我喜歡去露營，你呢？",
       "vi": "IV. 有時候…，有時候…: có lúc…, có lúc… A: Kỳ nghỉ tôi thích đi cắm trại, còn bạn?",
       "py": "IV. Yǒushíhòu..., yǒushíhòu... 2. A: Fàngjià de shíhòu wǒ xǐhuān qù lùyíng, nǐ ne?"
      },
      {
       "hz": "B：我有時候去旅行，有時候在家休息。",
       "vi": "B: Tôi có lúc đi du lịch, có lúc ở nhà nghỉ ngơi.",
       "py": "B: Wǒ yǒushíhòu qù lǚxíng, yǒushíhòu zàijiā xiūxí."
      },
      {
       "hz": "A：每天下課以後，你都去哪裡？",
       "vi": "A: Hằng ngày tan học xong bạn đều đi đâu?",
       "py": "A: Měitiān xiàkè yǐhòu, nǐ dōu qù nǎlǐ?"
      },
      {
       "hz": "B：有時候去圖書館，有時候回家寫功課。",
       "vi": "B: Có lúc đến thư viện, có lúc về nhà làm bài tập.",
       "py": "B: Yǒushíhòu qù túshūguǎn, yǒushíhòu huíjiā xiě gōngkè."
      },
      {
       "hz": "A：你每天下班以後，都在家做什麼？(看電視、做家事)2. A：你姐姐喜歡買什麼顏色的衣服？",
       "vi": "A: Hằng ngày tan làm bạn thường làm gì ở nhà? (xem tivi, làm việc nhà) A: Chị bạn thích mua quần áo màu gì?",
       "py": "A: Nǐ měitiān xiàbān yǐhòu, dōu zàijiā zuò shénme? (kàndiànshì, zuò jiāshì) 2. A: Nǐ jiějie xǐhuān mǎi shénme yánsè de yīfú?"
      },
      {
       "hz": "可欣：這個社區的人，有空的時候會做什麼？",
       "vi": "Khả Hân: Người trong khu dân cư này lúc rảnh thường làm gì?",
       "py": "Kěxīn: Zhège shèqū de rén, yǒukòng de shíhòu huì zuò shénme?"
      },
      {
       "hz": "幸福社區在什麼地方？",
       "vi": "Khu dân cư Hạnh Phúc ở đâu?",
       "py": "Xìngfú shèqū zài shénme dìfāng?"
      },
      {
       "hz": "幸福社區在山上，每次要出門怎麼辦？",
       "vi": "Khu dân cư Hạnh Phúc ở trên núi, mỗi lần ra ngoài thì làm thế nào?",
       "py": "Xìngfú shèqū zài shānshàng, měicì yào chūmén zěnmebàn?"
      },
      {
       "hz": "坐社區的小巴士很麻煩嗎？",
       "vi": "Đi xe buýt nhỏ của khu dân cư có phiền không?",
       "py": "Zuò shèqū de xiǎo bāshì hěn máfán ma?"
      },
      {
       "hz": "幸福社區為什麼很安全？",
       "vi": "Tại sao khu dân cư Hạnh Phúc rất an toàn?",
       "py": "Xìngfú shèqū wèishénme hěn ānquán?"
      },
      {
       "hz": "客人到幸福社區來，為什麼會覺得很輕鬆、很舒服？",
       "vi": "Tại sao khách đến khu dân cư Hạnh Phúc lại thấy rất thư thái, dễ chịu?",
       "py": "Kèrén dào xìngfú shèqū lái, wèishénme huì juéde hěn qīngsōng, hěn shūfú?"
      },
      {
       "hz": "每年中秋節，社區的人為什麼都覺得很開心？",
       "vi": "Tại sao Tết Trung thu năm nào người trong khu cũng thấy rất vui?",
       "py": "Měinián zhōngqiūjié, shèqū de rén wèishénme dōu juéde hěn kāixīn?"
      },
      {
       "hz": "你想住在幸福社區嗎？為什麼？",
       "vi": "Bạn có muốn sống ở khu dân cư Hạnh Phúc không? Tại sao?",
       "py": "Nǐ xiǎng zhù zài xìngfú shèqū ma? Wèishénme?"
      },
      {
       "hz": "到了下午四、五點,夜市就熱鬧起來了。2. 那個孩子一聽到音樂,就跳起舞來了。3. 現在在上課,你怎麼玩起手機來了?",
       "vi": "Đến bốn, năm giờ chiều là chợ đêm bắt đầu náo nhiệt. Đứa bé đó vừa nghe nhạc là nhảy múa ngay. Bây giờ đang trong giờ học, sao bạn lại chơi điện thoại?",
       "py": "Dào le xiàwǔ sì, wǔdiǎn, yèshì jiù rènào qǐlái le. 2. Nàge háizi yì tīngdào yīnyuè, jiù tiào qǐwǔ lái le. 3. Xiànzài zài shàngkè, nǐ zěnme wán qǐ shǒujī lái le?"
      },
      {
       "hz": "B：我早上很忙，沒時間吃東西。",
       "vi": "B: Buổi sáng tôi rất bận, không có thời gian ăn.",
       "py": "B: Wǒ zǎoshàng hěn máng, méi shíjiān chī dōngxī."
      },
      {
       "hz": "A：今天的天氣真奇怪！",
       "vi": "A: Thời tiết hôm nay lạ thật!",
       "py": "A: Jīntiān de tiānqì zhēn qíguài!"
      },
      {
       "hz": "還好今天沒下雨，要不然就不能去露營了。2. 還好我帶了錢，要不然什麼東西都不能買了。3. 還好我的期中考成績不錯,要不然就得再考一次了。",
       "vi": "May mà hôm nay không mưa, nếu không thì không đi cắm trại được. May mà tôi mang tiền, nếu không thì chẳng mua được gì. May mà điểm thi giữa kỳ của tôi khá, nếu không thì phải thi lại.",
       "py": "Háihǎo jīntiān méi xiàyǔ, yàobùrán jiù bùnéng qù lùyíng le. 2. Háihǎo wǒ dài le qián, yàobùrán shénme dōngxī dōu bùnéng mǎi le. 3. Háihǎo wǒ de qízhōngkǎo chéngjì búcuò, yàobùrán jiù děi zài kǎo yícì le."
      },
      {
       "hz": "A：你看，今天排隊買電影票的人真多！",
       "vi": "A: Bạn xem, hôm nay người xếp hàng mua vé xem phim đông thật!",
       "py": "A: Nǐ kàn, jīntiān páiduì mǎi diànyǐngpiào de rén zhēn duō!"
      },
      {
       "hz": "A：這個社區安全嗎？",
       "vi": "A: Khu dân cư này có an toàn không?",
       "py": "A: Zhège shèqū ānquán ma?"
      },
      {
       "hz": "A：你的獎學金一個月兩萬塊，夠嗎？",
       "vi": "A: Học bổng của bạn mỗi tháng hai vạn đồng, có đủ không?",
       "py": "A: Nǐ de jiǎngxuéjīn yígèyuè liǎngwànkuài, gòu ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只要… 就… — chỉ cần… là…",
   "giaiThich": "Nêu một điều kiện dễ đạt: chỉ cần làm được vế trước thì vế sau xảy ra."
  },
  {
   "title": "III. 每＋Nu＋M1 (＋就) ＋V＋一＋M2 (＋N)",
   "points": [
    {
     "label": null,
     "formula": "frequency with 每＋time expressionThis pattern indicates the frequency of an action. \"就\" can be added to emphasize that the action occurs more frequently.",
     "examples": [
      {
       "hz": "我們的中文課每四課考一次(試)。2. 山本良介每半年就回日本一次。3. 我朋友很喜歡牛肉，每三天就吃一次牛排。",
       "vi": "Lớp tiếng Trung của chúng tôi cứ bốn bài thi một lần. Yamamoto Ryosuke cứ nửa năm lại về Nhật một lần. Bạn tôi rất thích thịt bò, cứ ba ngày lại ăn bít tết một lần.",
       "py": "Wǒmen de zhōngwén kè měi sìkè kǎo yícì (shì). 2. Shānběn Liángjiè měibànnián jiù huí Rìběn yícì. 3. Wǒ péngyǒu hěn xǐhuān niúròu, měi sāntiān jiù chī yícì niúpái."
      },
      {
       "hz": "張先生一個禮拜打一次網球。",
       "vi": "Anh Trương một tuần chơi quần vợt một lần.",
       "py": "Zhāng xiānshēng yígè lǐbài dǎ yícì wǎngqiú."
      },
      {
       "hz": "他家的浴室很乾淨，因為星期二、四、六都要打掃。",
       "vi": "Phòng tắm nhà anh ấy rất sạch, vì thứ Ba, thứ Năm, thứ Bảy đều dọn dẹp.",
       "py": "Tājiā de yùshì hěn gānjìng, yīnwèi xīngqí'èr, sì, liù dōu yào dǎsǎo."
      },
      {
       "hz": "醫生說，看三十分鐘的書，就要休息十分鐘。",
       "vi": "Bác sĩ nói cứ đọc sách ba mươi phút thì phải nghỉ mười phút.",
       "py": "Yīshēng shuō, kàn sānshífēnzhōng de shū, jiùyào xiūxí shífēnzhōng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "每 + số + lượng từ — tần suất",
   "giaiThich": "Diễn đạt mức độ thường xuyên của hành động; thêm 就 để nhấn mạnh việc xảy ra khá dày."
  },
  {
   "title": "IV. A 像B一樣 (+Vs) A is just like B",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates two things or situations having something similar. If further explanation of the similarity is needed, it should come after “一樣”. A and B in this pattern can be NPs, VPs or clauses.",
     "examples": [
      {
       "hz": "我住的公寓像金先生住的社區一樣安全。2. 那個孩子的臉像蘋果一樣紅,真可愛!3. 哥哥愛吃牛肉麵,就像爸爸愛吃牛排一樣。4. 弟弟覺得逛百貨公司像參觀博物館一樣無聊,所以他不要去。",
       "vi": "Căn hộ tôi ở an toàn giống như khu dân cư anh Kim ở. Mặt đứa bé đó đỏ như quả táo, dễ thương quá! Anh trai thích ăn mì bò, giống như bố thích ăn bít tết vậy. Em trai thấy đi dạo trung tâm thương mại chán như đi tham quan bảo tàng, nên cậu ấy không muốn đi.",
       "py": "Wǒ zhù de gōngyù xiàng Jīn xiānshēng zhù de shèqū yíyàng ānquán. 2. Nàge háizi de liǎn xiàng píngguǒ yíyàng hóng, zhēn kě'ài! 3. Gēge ài chī niúròumiàn, jiù xiàng bàba ài chī niúpái yíyàng. 4. Dìdi juéde guàng bǎihuògōngsī xiàng cānguān bówùguǎn yíyàng wúliáo, suǒyǐ tā búyào qù."
      },
      {
       "hz": "請說說林明生的社區？在短文裡，林明生住的社區是個什麼樣的社區？請你把那個社區畫出來，然後用下面的問題，跟同學介紹一下那個社區。",
       "vi": "Hãy nói về khu dân cư của Lâm Minh Sinh. Trong bài văn, khu dân cư nơi Lâm Minh Sinh ở là khu như thế nào? Hãy vẽ khu dân cư đó ra, rồi dùng các câu hỏi dưới đây để giới thiệu với các bạn cùng lớp.",
       "py": "Qǐng shuō shuō lín míng shēng de shèqū? Zài duǎnwén lǐ, lín míng shēng zhù de shèqū shì gè shénmeyàng de shèqū? Qǐng nǐ bǎ nàge shèqū huà chūlái, ránhòu yòng xiàmiàn de wèntí, gēn tóngxué jièshào yíxià nàge shèqū."
      },
      {
       "hz": "這個社區在哪裡？",
       "vi": "Khu dân cư này ở đâu?",
       "py": "Zhège shèqū zài nǎlǐ?"
      },
      {
       "hz": "這個社區叫什麼名字？",
       "vi": "Khu dân cư này tên là gì?",
       "py": "Zhège shèqū jiào shénme míngzì?"
      },
      {
       "hz": "這個社區除了房子還有什麼？",
       "vi": "Khu dân cư này ngoài nhà ở ra còn có gì?",
       "py": "Zhège shèqū chúle fángzi háiyǒu shénme?"
      },
      {
       "hz": "你覺得林明生喜歡住在這個社區嗎？",
       "vi": "Bạn nghĩ Lâm Minh Sinh có thích sống ở khu dân cư này không?",
       "py": "Nǐ juéde lín míng shēng xǐhuān zhù zài zhège shèqū ma?"
      },
      {
       "hz": "你覺得一個好的社區，除了房子，還應該有什麼？",
       "vi": "Bạn nghĩ một khu dân cư tốt, ngoài nhà ở ra còn nên có gì?",
       "py": "Nǐ juéde yígè hǎo de shèqū, chúle fángzi, hái yīnggāi yǒu shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "A 像 B 一樣 — A giống như B",
   "giaiThich": "So sánh hai người/vật/tình huống giống nhau; muốn nói rõ giống ở điểm nào thì đặt sau 一樣."
  }
 ],
 "td2-5.2": [
  {
   "title": "I. N1 (+ Neg) + 被 (+N2) + V + C",
   "points": [
    {
     "label": null,
     "formula": "This pattern is one type of passive sentences. “N1” is the patient of the verb, while “N2” which sometimes would be omitted, is the agent. Another common pattern is “N1被(N2) V C”, where C is the complement denoting the result of the verb or how an action is accomplished. The negation word “沒” must be placed before “被”. If there are two subjects (S1, S2), S2 should be placed in front of “就”, “S1+ V著V著, 改寫句子。Rewrite the sentences with the grammar.",
     "examples": [
      {
       "hz": "他家的門被小偷打開了。2. 他亂丟垃圾的時候，被鄰居發現了。3. 同事昨天送給我的甜點怎麼被吃了？我記得放在冰箱裡啊！",
       "vi": "Cửa nhà anh ấy bị trộm mở ra. Lúc anh ấy vứt rác bừa bãi thì bị hàng xóm phát hiện. Món tráng miệng đồng nghiệp tặng tôi hôm qua sao lại bị ăn mất rồi? Tôi nhớ là để trong tủ lạnh mà!",
       "py": "Tājiā de mén bèi xiǎotōu dǎkāi le. 2. Tā luàndiūlèsè de shíhòu, bèi línjū fāxiàn le. 3. Tóngshì zuótiān sònggěi wǒ de tiándiǎn zěnme bèi chī le? Wǒ jìde fàngzài bīngxiāng lǐ a!"
      },
      {
       "hz": "室友把我的果汁喝了。",
       "vi": "Bạn cùng phòng uống mất nước ép của tôi rồi.",
       "py": "Shìyǒu bǎ wǒ de guǒzhī hē le."
      },
      {
       "hz": "媽媽看見弟弟不寫功課，在玩遊戲。",
       "vi": "Mẹ thấy em trai không làm bài tập mà đang chơi game.",
       "py": "Māma kànjiàn dìdi bù xiě gōngkè, zài wányóuxì."
      },
      {
       "hz": "小狗弄髒了我剛洗乾淨的鞋子。",
       "vi": "Con chó nhỏ làm bẩn đôi giày tôi vừa giặt sạch.",
       "py": "Xiǎogǒu nòngzāngle wǒ gāng xǐ gānjìng de xiézi."
      },
      {
       "hz": "那張桌子在一樓，沒被搬上二樓去。2. 你的東西不要亂放，才不會被媽媽丟了。3. 你那件漂亮的衣服沒被姊姊穿去參加舞會，還掛在衣櫃裡呢！",
       "vi": "Cái bàn đó ở tầng một, chưa bị khiêng lên tầng hai. Bạn đừng để đồ bừa bãi thì mới không bị mẹ vứt đi. Bộ quần áo đẹp của bạn không bị chị mặc đi dự tiệc, vẫn treo trong tủ đấy!",
       "py": "Nà zhāng zhuōzi zài yìlóu, méi bèi bān shàng èrlóu qù. 2. Nǐ de dōngxī búyào luànfàng, cái búhuì bèi māma diū le. 3. Nǐ nà jiàn piàoliàng de yīfú méi bèi jiějie chuān qù cānjiā wǔhuì, hái guà zài yīguì lǐ ne!"
      },
      {
       "hz": "先生：我找不到我的車，我要去找警察。",
       "vi": "Chồng: Anh không tìm thấy xe, anh phải đi báo cảnh sát.",
       "py": "Xiānshēng: Wǒ zhǎo búdào wǒ de chē, wǒ yào qù zhǎo jǐngchá."
      },
      {
       "hz": "他跟我聊天的時候，聊著聊著就笑了。2. 孩子在公園裡玩著玩著，就忘了回家的時間了。3. 我用這枝筆寫字，寫著寫著，不知道為什麼，筆就壞了。",
       "vi": "Lúc nói chuyện với tôi, nói một hồi anh ấy bật cười. Bọn trẻ chơi trong công viên, chơi mãi rồi quên cả giờ về nhà. Tôi dùng cây bút này viết, viết một hồi thì không hiểu sao bút hỏng mất.",
       "py": "Tā gēn wǒ liáotiān de shíhòu, liáo zhe liáo zhe jiù xiào le. 2. Háizi zài gōngyuán lǐ wán zhe wán zhe, jiù wàng le huíjiā de shíjiān le. 3. Wǒ yòng zhè zhī bǐ xiězì, xiě zhe xiě zhe, bù zhīdào wèishénme, bǐ jiù huài le."
      },
      {
       "hz": "妹妹在公車上聽音樂，然後就到家了。",
       "vi": "Em gái nghe nhạc trên xe buýt, rồi về đến nhà.",
       "py": "Mèimei zài gōngchēshàng tīng yīnyuè, ránhòu jiù dào jiā le."
      },
      {
       "hz": "他走路去圖書館，後來就下雨了。",
       "vi": "Anh ấy đi bộ đến thư viện, sau đó trời mưa.",
       "py": "Tā zǒulù qù túshūguǎn, hòulái jiù xiàyǔ le."
      },
      {
       "hz": "媽媽說故事給孩子聽，後來孩子睡著了。",
       "vi": "Mẹ kể chuyện cho con nghe, sau đó con ngủ thiếp đi.",
       "py": "Māma shuō gùshì gěi háizi tīng, hòulái háizi shuì zhe le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu bị động với 被",
   "giaiThich": "N1 là đối tượng chịu tác động, N2 là người gây ra (có thể lược bỏ). Sau động từ thường có bổ ngữ chỉ kết quả."
  },
  {
   "title": "III. 只要...就... as long as...",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates an easy solution to a problem. If the condition coming after “只要” is fulfilled, the problem can be solved. 請用提示完成對話。Complete the dialogues with given phrases. The frequency adverb \"sometimes\" in this pattern indicates the frequency of two actions(it can be same action with different objects.) 請用提示完成句子。Complete the sentences with given phrases. The pattern \" V起(O)來\" indicates an action or a status begins and lasts. Sometimes, it would be placed at the end of a sentence to show results. If \" V起(O)來\" is placed in the former part of a sentence, the latter part is used to modify the former one. If an object exists, it should be placed between \"起\" and \"來\", e.g., \"下起雨來\", \"說起話來\", etc. This pattern indicates the situation described after \"還好\", otherwise, a negative result after",
     "examples": [
      {
       "hz": "A：請問，我要怎麼參加學校的網球比賽？",
       "vi": "A: Cho hỏi, làm sao để tham gia giải quần vợt của trường?",
       "py": "A: Qǐngwèn, wǒ yào zěnme cānjiā xuéxiào de wǎngqiú bǐsài?"
      },
      {
       "hz": "B：很簡單，只要跟老師說就可以了。",
       "vi": "B: Đơn giản lắm, chỉ cần báo với thầy giáo là được.",
       "py": "B: Hěn jiǎndān, zhǐyào gēn lǎoshī shuō jiù kěyǐ le."
      },
      {
       "hz": "A：喂，我到你家大樓門口了，要怎麼進去呢？",
       "vi": "A: Alo, tôi đến cửa toà nhà của bạn rồi, vào bằng cách nào?",
       "py": "A: Wèi, wǒ dào nǐjiā dàlóu ménkǒu le, yào zěnme jìnqù ne?"
      },
      {
       "hz": "B：你只要跟門口的人說你的名字，就可以進來了。",
       "vi": "B: Bạn chỉ cần báo tên với người ở cửa là vào được.",
       "py": "B: Nǐ zhǐyào gēn ménkǒu de rén shuō nǐ de míngzì, jiù kěyǐ jìnlái le."
      },
      {
       "hz": "錢先生：我什麼時候能搬進去？",
       "vi": "Anh Tiền: Khi nào tôi dọn vào được?",
       "py": "Qián xiānshēng: Wǒ shénme shíhòu néng bānjìn qù?"
      },
      {
       "hz": "王太太：只要付完押金和房租，我就會把鑰匙給你。",
       "vi": "Bà Vương: Chỉ cần trả xong tiền cọc và tiền thuê, tôi sẽ đưa chìa khoá cho anh.",
       "py": "Wáng tàitai: Zhǐyào fù wán yājīn hàn fángzū, wǒ jiù huì bǎ yàoshi gěi nǐ."
      },
      {
       "hz": "A：我的中文字寫得不好看，怎麼辦？ (多練習)2. A：應該怎麼做，我的身體才會比較健康？(少吃甜點/多運動)3. 孩子：我可以躺在公園的草地上嗎？(垃圾/蟲子)",
       "vi": "A: Chữ Hán tôi viết không đẹp, làm sao đây? (luyện nhiều) A: Phải làm thế nào thì sức khoẻ tôi mới tốt hơn? (ăn ít đồ ngọt / tập thể dục nhiều) Con: Con nằm trên bãi cỏ trong công viên được không? (rác / côn trùng)",
       "py": "A: Wǒ de zhōng wénzì xiě de bù hǎokàn, zěnmebàn? (duō liànxí) 2. A: Yīnggāi zěnme zuò, wǒ de shēntǐ cái huì bǐjiào jiànkāng? (shǎo chī tiándiǎn / duō yùndòng) 3. Háizi: Wǒ kěyǐ tǎng zài gōngyuán de cǎodì shàng ma? (lèsè / chóngzi)"
      },
      {
       "hz": "A：你去夜市的時候，常常吃雞排嗎？ B：不一定，有時候吃雞排，有時候吃烤魷魚。",
       "vi": "A: Khi đi chợ đêm, bạn có hay ăn gà rán miếng không? B: Không nhất định, có lúc ăn gà rán, có lúc ăn mực nướng.",
       "py": "A: Nǐ qù yèshì de shíhòu, chángcháng chī jī pái ma? B: Bù yídìng, yǒushíhòu chī jī pái, yǒushíhòu chī kǎo yóuyú."
      },
      {
       "hz": "IV. 有時候...，有時候... 2. A：放假的時候我喜歡去露營，你呢？",
       "vi": "IV. 有時候…，有時候…: có lúc…, có lúc… A: Kỳ nghỉ tôi thích đi cắm trại, còn bạn?",
       "py": "IV. Yǒushíhòu..., yǒushíhòu... 2. A: Fàngjià de shíhòu wǒ xǐhuān qù lùyíng, nǐ ne?"
      },
      {
       "hz": "B：我有時候去旅行，有時候在家休息。",
       "vi": "B: Tôi có lúc đi du lịch, có lúc ở nhà nghỉ ngơi.",
       "py": "B: Wǒ yǒushíhòu qù lǚxíng, yǒushíhòu zàijiā xiūxí."
      },
      {
       "hz": "A：每天下課以後，你都去哪裡？",
       "vi": "A: Hằng ngày tan học xong bạn đều đi đâu?",
       "py": "A: Měitiān xiàkè yǐhòu, nǐ dōu qù nǎlǐ?"
      },
      {
       "hz": "B：有時候去圖書館，有時候回家寫功課。",
       "vi": "B: Có lúc đến thư viện, có lúc về nhà làm bài tập.",
       "py": "B: Yǒushíhòu qù túshūguǎn, yǒushíhòu huíjiā xiě gōngkè."
      },
      {
       "hz": "A：你每天下班以後，都在家做什麼？(看電視、做家事)2. A：你姐姐喜歡買什麼顏色的衣服？",
       "vi": "A: Hằng ngày tan làm bạn thường làm gì ở nhà? (xem tivi, làm việc nhà) A: Chị bạn thích mua quần áo màu gì?",
       "py": "A: Nǐ měitiān xiàbān yǐhòu, dōu zàijiā zuò shénme? (kàndiànshì, zuò jiāshì) 2. A: Nǐ jiějie xǐhuān mǎi shénme yánsè de yīfú?"
      },
      {
       "hz": "可欣：這個社區的人，有空的時候會做什麼？",
       "vi": "Khả Hân: Người trong khu dân cư này lúc rảnh thường làm gì?",
       "py": "Kěxīn: Zhège shèqū de rén, yǒukòng de shíhòu huì zuò shénme?"
      },
      {
       "hz": "幸福社區在什麼地方？",
       "vi": "Khu dân cư Hạnh Phúc ở đâu?",
       "py": "Xìngfú shèqū zài shénme dìfāng?"
      },
      {
       "hz": "幸福社區在山上，每次要出門怎麼辦？",
       "vi": "Khu dân cư Hạnh Phúc ở trên núi, mỗi lần ra ngoài thì làm thế nào?",
       "py": "Xìngfú shèqū zài shānshàng, měicì yào chūmén zěnmebàn?"
      },
      {
       "hz": "坐社區的小巴士很麻煩嗎？",
       "vi": "Đi xe buýt nhỏ của khu dân cư có phiền không?",
       "py": "Zuò shèqū de xiǎo bāshì hěn máfán ma?"
      },
      {
       "hz": "幸福社區為什麼很安全？",
       "vi": "Tại sao khu dân cư Hạnh Phúc rất an toàn?",
       "py": "Xìngfú shèqū wèishénme hěn ānquán?"
      },
      {
       "hz": "客人到幸福社區來，為什麼會覺得很輕鬆、很舒服？",
       "vi": "Tại sao khách đến khu dân cư Hạnh Phúc lại thấy rất thư thái, dễ chịu?",
       "py": "Kèrén dào xìngfú shèqū lái, wèishénme huì juéde hěn qīngsōng, hěn shūfú?"
      },
      {
       "hz": "每年中秋節，社區的人為什麼都覺得很開心？",
       "vi": "Tại sao Tết Trung thu năm nào người trong khu cũng thấy rất vui?",
       "py": "Měinián zhōngqiūjié, shèqū de rén wèishénme dōu juéde hěn kāixīn?"
      },
      {
       "hz": "你想住在幸福社區嗎？為什麼？",
       "vi": "Bạn có muốn sống ở khu dân cư Hạnh Phúc không? Tại sao?",
       "py": "Nǐ xiǎng zhù zài xìngfú shèqū ma? Wèishénme?"
      },
      {
       "hz": "到了下午四、五點,夜市就熱鬧起來了。2. 那個孩子一聽到音樂,就跳起舞來了。3. 現在在上課,你怎麼玩起手機來了?",
       "vi": "Đến bốn, năm giờ chiều là chợ đêm bắt đầu náo nhiệt. Đứa bé đó vừa nghe nhạc là nhảy múa ngay. Bây giờ đang trong giờ học, sao bạn lại chơi điện thoại?",
       "py": "Dào le xiàwǔ sì, wǔdiǎn, yèshì jiù rènào qǐlái le. 2. Nàge háizi yì tīngdào yīnyuè, jiù tiào qǐwǔ lái le. 3. Xiànzài zài shàngkè, nǐ zěnme wán qǐ shǒujī lái le?"
      },
      {
       "hz": "B：我早上很忙，沒時間吃東西。",
       "vi": "B: Buổi sáng tôi rất bận, không có thời gian ăn.",
       "py": "B: Wǒ zǎoshàng hěn máng, méi shíjiān chī dōngxī."
      },
      {
       "hz": "A：今天的天氣真奇怪！",
       "vi": "A: Thời tiết hôm nay lạ thật!",
       "py": "A: Jīntiān de tiānqì zhēn qíguài!"
      },
      {
       "hz": "還好今天沒下雨，要不然就不能去露營了。2. 還好我帶了錢，要不然什麼東西都不能買了。3. 還好我的期中考成績不錯,要不然就得再考一次了。",
       "vi": "May mà hôm nay không mưa, nếu không thì không đi cắm trại được. May mà tôi mang tiền, nếu không thì chẳng mua được gì. May mà điểm thi giữa kỳ của tôi khá, nếu không thì phải thi lại.",
       "py": "Háihǎo jīntiān méi xiàyǔ, yàobùrán jiù bùnéng qù lùyíng le. 2. Háihǎo wǒ dài le qián, yàobùrán shénme dōngxī dōu bùnéng mǎi le. 3. Háihǎo wǒ de qízhōngkǎo chéngjì búcuò, yàobùrán jiù děi zài kǎo yícì le."
      },
      {
       "hz": "A：你看，今天排隊買電影票的人真多！",
       "vi": "A: Bạn xem, hôm nay người xếp hàng mua vé xem phim đông thật!",
       "py": "A: Nǐ kàn, jīntiān páiduì mǎi diànyǐngpiào de rén zhēn duō!"
      },
      {
       "hz": "A：這個社區安全嗎？",
       "vi": "A: Khu dân cư này có an toàn không?",
       "py": "A: Zhège shèqū ānquán ma?"
      },
      {
       "hz": "A：你的獎學金一個月兩萬塊，夠嗎？",
       "vi": "A: Học bổng của bạn mỗi tháng hai vạn đồng, có đủ không?",
       "py": "A: Nǐ de jiǎngxuéjīn yígèyuè liǎngwànkuài, gòu ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只要… 就… — chỉ cần… là…",
   "giaiThich": "Nêu một điều kiện dễ đạt: chỉ cần làm được vế trước thì vế sau xảy ra."
  },
  {
   "title": "III. 每＋Nu＋M1 (＋就) ＋V＋一＋M2 (＋N)",
   "points": [
    {
     "label": null,
     "formula": "frequency with 每＋time expressionThis pattern indicates the frequency of an action. \"就\" can be added to emphasize that the action occurs more frequently.",
     "examples": [
      {
       "hz": "我們的中文課每四課考一次(試)。2. 山本良介每半年就回日本一次。3. 我朋友很喜歡牛肉，每三天就吃一次牛排。",
       "vi": "Lớp tiếng Trung của chúng tôi cứ bốn bài thi một lần. Yamamoto Ryosuke cứ nửa năm lại về Nhật một lần. Bạn tôi rất thích thịt bò, cứ ba ngày lại ăn bít tết một lần.",
       "py": "Wǒmen de zhōngwén kè měi sìkè kǎo yícì (shì). 2. Shānběn Liángjiè měibànnián jiù huí Rìběn yícì. 3. Wǒ péngyǒu hěn xǐhuān niúròu, měi sāntiān jiù chī yícì niúpái."
      },
      {
       "hz": "張先生一個禮拜打一次網球。",
       "vi": "Anh Trương một tuần chơi quần vợt một lần.",
       "py": "Zhāng xiānshēng yígè lǐbài dǎ yícì wǎngqiú."
      },
      {
       "hz": "他家的浴室很乾淨，因為星期二、四、六都要打掃。",
       "vi": "Phòng tắm nhà anh ấy rất sạch, vì thứ Ba, thứ Năm, thứ Bảy đều dọn dẹp.",
       "py": "Tājiā de yùshì hěn gānjìng, yīnwèi xīngqí'èr, sì, liù dōu yào dǎsǎo."
      },
      {
       "hz": "醫生說，看三十分鐘的書，就要休息十分鐘。",
       "vi": "Bác sĩ nói cứ đọc sách ba mươi phút thì phải nghỉ mười phút.",
       "py": "Yīshēng shuō, kàn sānshífēnzhōng de shū, jiùyào xiūxí shífēnzhōng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "每 + số + lượng từ — tần suất",
   "giaiThich": "Diễn đạt mức độ thường xuyên của hành động; thêm 就 để nhấn mạnh việc xảy ra khá dày."
  },
  {
   "title": "IV. A 像B一樣 (+Vs) A is just like B",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates two things or situations having something similar. If further explanation of the similarity is needed, it should come after “一樣”. A and B in this pattern can be NPs, VPs or clauses.",
     "examples": [
      {
       "hz": "我住的公寓像金先生住的社區一樣安全。2. 那個孩子的臉像蘋果一樣紅,真可愛!3. 哥哥愛吃牛肉麵,就像爸爸愛吃牛排一樣。4. 弟弟覺得逛百貨公司像參觀博物館一樣無聊,所以他不要去。",
       "vi": "Căn hộ tôi ở an toàn giống như khu dân cư anh Kim ở. Mặt đứa bé đó đỏ như quả táo, dễ thương quá! Anh trai thích ăn mì bò, giống như bố thích ăn bít tết vậy. Em trai thấy đi dạo trung tâm thương mại chán như đi tham quan bảo tàng, nên cậu ấy không muốn đi.",
       "py": "Wǒ zhù de gōngyù xiàng Jīn xiānshēng zhù de shèqū yíyàng ānquán. 2. Nàge háizi de liǎn xiàng píngguǒ yíyàng hóng, zhēn kě'ài! 3. Gēge ài chī niúròumiàn, jiù xiàng bàba ài chī niúpái yíyàng. 4. Dìdi juéde guàng bǎihuògōngsī xiàng cānguān bówùguǎn yíyàng wúliáo, suǒyǐ tā búyào qù."
      },
      {
       "hz": "請說說林明生的社區？在短文裡，林明生住的社區是個什麼樣的社區？請你把那個社區畫出來，然後用下面的問題，跟同學介紹一下那個社區。",
       "vi": "Hãy nói về khu dân cư của Lâm Minh Sinh. Trong bài văn, khu dân cư nơi Lâm Minh Sinh ở là khu như thế nào? Hãy vẽ khu dân cư đó ra, rồi dùng các câu hỏi dưới đây để giới thiệu với các bạn cùng lớp.",
       "py": "Qǐng shuō shuō lín míng shēng de shèqū? Zài duǎnwén lǐ, lín míng shēng zhù de shèqū shì gè shénmeyàng de shèqū? Qǐng nǐ bǎ nàge shèqū huà chūlái, ránhòu yòng xiàmiàn de wèntí, gēn tóngxué jièshào yíxià nàge shèqū."
      },
      {
       "hz": "這個社區在哪裡？",
       "vi": "Khu dân cư này ở đâu?",
       "py": "Zhège shèqū zài nǎlǐ?"
      },
      {
       "hz": "這個社區叫什麼名字？",
       "vi": "Khu dân cư này tên là gì?",
       "py": "Zhège shèqū jiào shénme míngzì?"
      },
      {
       "hz": "這個社區除了房子還有什麼？",
       "vi": "Khu dân cư này ngoài nhà ở ra còn có gì?",
       "py": "Zhège shèqū chúle fángzi háiyǒu shénme?"
      },
      {
       "hz": "你覺得林明生喜歡住在這個社區嗎？",
       "vi": "Bạn nghĩ Lâm Minh Sinh có thích sống ở khu dân cư này không?",
       "py": "Nǐ juéde lín míng shēng xǐhuān zhù zài zhège shèqū ma?"
      },
      {
       "hz": "你覺得一個好的社區，除了房子，還應該有什麼？",
       "vi": "Bạn nghĩ một khu dân cư tốt, ngoài nhà ở ra còn nên có gì?",
       "py": "Nǐ juéde yígè hǎo de shèqū, chúle fángzi, hái yīnggāi yǒu shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "A 像 B 一樣 — A giống như B",
   "giaiThich": "So sánh hai người/vật/tình huống giống nhau; muốn nói rõ giống ở điểm nào thì đặt sau 一樣."
  }
 ],
 "td2-5.3": [
  {
   "title": "I. N1 (+ Neg) + 被 (+N2) + V + C",
   "points": [
    {
     "label": null,
     "formula": "This pattern is one type of passive sentences. “N1” is the patient of the verb, while “N2” which sometimes would be omitted, is the agent. Another common pattern is “N1被(N2) V C”, where C is the complement denoting the result of the verb or how an action is accomplished. The negation word “沒” must be placed before “被”. If there are two subjects (S1, S2), S2 should be placed in front of “就”, “S1+ V著V著, 改寫句子。Rewrite the sentences with the grammar.",
     "examples": [
      {
       "hz": "他家的門被小偷打開了。2. 他亂丟垃圾的時候，被鄰居發現了。3. 同事昨天送給我的甜點怎麼被吃了？我記得放在冰箱裡啊！",
       "vi": "Cửa nhà anh ấy bị trộm mở ra. Lúc anh ấy vứt rác bừa bãi thì bị hàng xóm phát hiện. Món tráng miệng đồng nghiệp tặng tôi hôm qua sao lại bị ăn mất rồi? Tôi nhớ là để trong tủ lạnh mà!",
       "py": "Tājiā de mén bèi xiǎotōu dǎkāi le. 2. Tā luàndiūlèsè de shíhòu, bèi línjū fāxiàn le. 3. Tóngshì zuótiān sònggěi wǒ de tiándiǎn zěnme bèi chī le? Wǒ jìde fàngzài bīngxiāng lǐ a!"
      },
      {
       "hz": "室友把我的果汁喝了。",
       "vi": "Bạn cùng phòng uống mất nước ép của tôi rồi.",
       "py": "Shìyǒu bǎ wǒ de guǒzhī hē le."
      },
      {
       "hz": "媽媽看見弟弟不寫功課，在玩遊戲。",
       "vi": "Mẹ thấy em trai không làm bài tập mà đang chơi game.",
       "py": "Māma kànjiàn dìdi bù xiě gōngkè, zài wányóuxì."
      },
      {
       "hz": "小狗弄髒了我剛洗乾淨的鞋子。",
       "vi": "Con chó nhỏ làm bẩn đôi giày tôi vừa giặt sạch.",
       "py": "Xiǎogǒu nòngzāngle wǒ gāng xǐ gānjìng de xiézi."
      },
      {
       "hz": "那張桌子在一樓，沒被搬上二樓去。2. 你的東西不要亂放，才不會被媽媽丟了。3. 你那件漂亮的衣服沒被姊姊穿去參加舞會，還掛在衣櫃裡呢！",
       "vi": "Cái bàn đó ở tầng một, chưa bị khiêng lên tầng hai. Bạn đừng để đồ bừa bãi thì mới không bị mẹ vứt đi. Bộ quần áo đẹp của bạn không bị chị mặc đi dự tiệc, vẫn treo trong tủ đấy!",
       "py": "Nà zhāng zhuōzi zài yìlóu, méi bèi bān shàng èrlóu qù. 2. Nǐ de dōngxī búyào luànfàng, cái búhuì bèi māma diū le. 3. Nǐ nà jiàn piàoliàng de yīfú méi bèi jiějie chuān qù cānjiā wǔhuì, hái guà zài yīguì lǐ ne!"
      },
      {
       "hz": "先生：我找不到我的車，我要去找警察。",
       "vi": "Chồng: Anh không tìm thấy xe, anh phải đi báo cảnh sát.",
       "py": "Xiānshēng: Wǒ zhǎo búdào wǒ de chē, wǒ yào qù zhǎo jǐngchá."
      },
      {
       "hz": "他跟我聊天的時候，聊著聊著就笑了。2. 孩子在公園裡玩著玩著，就忘了回家的時間了。3. 我用這枝筆寫字，寫著寫著，不知道為什麼，筆就壞了。",
       "vi": "Lúc nói chuyện với tôi, nói một hồi anh ấy bật cười. Bọn trẻ chơi trong công viên, chơi mãi rồi quên cả giờ về nhà. Tôi dùng cây bút này viết, viết một hồi thì không hiểu sao bút hỏng mất.",
       "py": "Tā gēn wǒ liáotiān de shíhòu, liáo zhe liáo zhe jiù xiào le. 2. Háizi zài gōngyuán lǐ wán zhe wán zhe, jiù wàng le huíjiā de shíjiān le. 3. Wǒ yòng zhè zhī bǐ xiězì, xiě zhe xiě zhe, bù zhīdào wèishénme, bǐ jiù huài le."
      },
      {
       "hz": "妹妹在公車上聽音樂，然後就到家了。",
       "vi": "Em gái nghe nhạc trên xe buýt, rồi về đến nhà.",
       "py": "Mèimei zài gōngchēshàng tīng yīnyuè, ránhòu jiù dào jiā le."
      },
      {
       "hz": "他走路去圖書館，後來就下雨了。",
       "vi": "Anh ấy đi bộ đến thư viện, sau đó trời mưa.",
       "py": "Tā zǒulù qù túshūguǎn, hòulái jiù xiàyǔ le."
      },
      {
       "hz": "媽媽說故事給孩子聽，後來孩子睡著了。",
       "vi": "Mẹ kể chuyện cho con nghe, sau đó con ngủ thiếp đi.",
       "py": "Māma shuō gùshì gěi háizi tīng, hòulái háizi shuì zhe le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu bị động với 被",
   "giaiThich": "N1 là đối tượng chịu tác động, N2 là người gây ra (có thể lược bỏ). Sau động từ thường có bổ ngữ chỉ kết quả."
  },
  {
   "title": "III. 只要...就... as long as...",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates an easy solution to a problem. If the condition coming after “只要” is fulfilled, the problem can be solved. 請用提示完成對話。Complete the dialogues with given phrases. The frequency adverb \"sometimes\" in this pattern indicates the frequency of two actions(it can be same action with different objects.) 請用提示完成句子。Complete the sentences with given phrases. The pattern \" V起(O)來\" indicates an action or a status begins and lasts. Sometimes, it would be placed at the end of a sentence to show results. If \" V起(O)來\" is placed in the former part of a sentence, the latter part is used to modify the former one. If an object exists, it should be placed between \"起\" and \"來\", e.g., \"下起雨來\", \"說起話來\", etc. This pattern indicates the situation described after \"還好\", otherwise, a negative result after",
     "examples": [
      {
       "hz": "A：請問，我要怎麼參加學校的網球比賽？",
       "vi": "A: Cho hỏi, làm sao để tham gia giải quần vợt của trường?",
       "py": "A: Qǐngwèn, wǒ yào zěnme cānjiā xuéxiào de wǎngqiú bǐsài?"
      },
      {
       "hz": "B：很簡單，只要跟老師說就可以了。",
       "vi": "B: Đơn giản lắm, chỉ cần báo với thầy giáo là được.",
       "py": "B: Hěn jiǎndān, zhǐyào gēn lǎoshī shuō jiù kěyǐ le."
      },
      {
       "hz": "A：喂，我到你家大樓門口了，要怎麼進去呢？",
       "vi": "A: Alo, tôi đến cửa toà nhà của bạn rồi, vào bằng cách nào?",
       "py": "A: Wèi, wǒ dào nǐjiā dàlóu ménkǒu le, yào zěnme jìnqù ne?"
      },
      {
       "hz": "B：你只要跟門口的人說你的名字，就可以進來了。",
       "vi": "B: Bạn chỉ cần báo tên với người ở cửa là vào được.",
       "py": "B: Nǐ zhǐyào gēn ménkǒu de rén shuō nǐ de míngzì, jiù kěyǐ jìnlái le."
      },
      {
       "hz": "錢先生：我什麼時候能搬進去？",
       "vi": "Anh Tiền: Khi nào tôi dọn vào được?",
       "py": "Qián xiānshēng: Wǒ shénme shíhòu néng bānjìn qù?"
      },
      {
       "hz": "王太太：只要付完押金和房租，我就會把鑰匙給你。",
       "vi": "Bà Vương: Chỉ cần trả xong tiền cọc và tiền thuê, tôi sẽ đưa chìa khoá cho anh.",
       "py": "Wáng tàitai: Zhǐyào fù wán yājīn hàn fángzū, wǒ jiù huì bǎ yàoshi gěi nǐ."
      },
      {
       "hz": "A：我的中文字寫得不好看，怎麼辦？ (多練習)2. A：應該怎麼做，我的身體才會比較健康？(少吃甜點/多運動)3. 孩子：我可以躺在公園的草地上嗎？(垃圾/蟲子)",
       "vi": "A: Chữ Hán tôi viết không đẹp, làm sao đây? (luyện nhiều) A: Phải làm thế nào thì sức khoẻ tôi mới tốt hơn? (ăn ít đồ ngọt / tập thể dục nhiều) Con: Con nằm trên bãi cỏ trong công viên được không? (rác / côn trùng)",
       "py": "A: Wǒ de zhōng wénzì xiě de bù hǎokàn, zěnmebàn? (duō liànxí) 2. A: Yīnggāi zěnme zuò, wǒ de shēntǐ cái huì bǐjiào jiànkāng? (shǎo chī tiándiǎn / duō yùndòng) 3. Háizi: Wǒ kěyǐ tǎng zài gōngyuán de cǎodì shàng ma? (lèsè / chóngzi)"
      },
      {
       "hz": "A：你去夜市的時候，常常吃雞排嗎？ B：不一定，有時候吃雞排，有時候吃烤魷魚。",
       "vi": "A: Khi đi chợ đêm, bạn có hay ăn gà rán miếng không? B: Không nhất định, có lúc ăn gà rán, có lúc ăn mực nướng.",
       "py": "A: Nǐ qù yèshì de shíhòu, chángcháng chī jī pái ma? B: Bù yídìng, yǒushíhòu chī jī pái, yǒushíhòu chī kǎo yóuyú."
      },
      {
       "hz": "IV. 有時候...，有時候... 2. A：放假的時候我喜歡去露營，你呢？",
       "vi": "IV. 有時候…，有時候…: có lúc…, có lúc… A: Kỳ nghỉ tôi thích đi cắm trại, còn bạn?",
       "py": "IV. Yǒushíhòu..., yǒushíhòu... 2. A: Fàngjià de shíhòu wǒ xǐhuān qù lùyíng, nǐ ne?"
      },
      {
       "hz": "B：我有時候去旅行，有時候在家休息。",
       "vi": "B: Tôi có lúc đi du lịch, có lúc ở nhà nghỉ ngơi.",
       "py": "B: Wǒ yǒushíhòu qù lǚxíng, yǒushíhòu zàijiā xiūxí."
      },
      {
       "hz": "A：每天下課以後，你都去哪裡？",
       "vi": "A: Hằng ngày tan học xong bạn đều đi đâu?",
       "py": "A: Měitiān xiàkè yǐhòu, nǐ dōu qù nǎlǐ?"
      },
      {
       "hz": "B：有時候去圖書館，有時候回家寫功課。",
       "vi": "B: Có lúc đến thư viện, có lúc về nhà làm bài tập.",
       "py": "B: Yǒushíhòu qù túshūguǎn, yǒushíhòu huíjiā xiě gōngkè."
      },
      {
       "hz": "A：你每天下班以後，都在家做什麼？(看電視、做家事)2. A：你姐姐喜歡買什麼顏色的衣服？",
       "vi": "A: Hằng ngày tan làm bạn thường làm gì ở nhà? (xem tivi, làm việc nhà) A: Chị bạn thích mua quần áo màu gì?",
       "py": "A: Nǐ měitiān xiàbān yǐhòu, dōu zàijiā zuò shénme? (kàndiànshì, zuò jiāshì) 2. A: Nǐ jiějie xǐhuān mǎi shénme yánsè de yīfú?"
      },
      {
       "hz": "可欣：這個社區的人，有空的時候會做什麼？",
       "vi": "Khả Hân: Người trong khu dân cư này lúc rảnh thường làm gì?",
       "py": "Kěxīn: Zhège shèqū de rén, yǒukòng de shíhòu huì zuò shénme?"
      },
      {
       "hz": "幸福社區在什麼地方？",
       "vi": "Khu dân cư Hạnh Phúc ở đâu?",
       "py": "Xìngfú shèqū zài shénme dìfāng?"
      },
      {
       "hz": "幸福社區在山上，每次要出門怎麼辦？",
       "vi": "Khu dân cư Hạnh Phúc ở trên núi, mỗi lần ra ngoài thì làm thế nào?",
       "py": "Xìngfú shèqū zài shānshàng, měicì yào chūmén zěnmebàn?"
      },
      {
       "hz": "坐社區的小巴士很麻煩嗎？",
       "vi": "Đi xe buýt nhỏ của khu dân cư có phiền không?",
       "py": "Zuò shèqū de xiǎo bāshì hěn máfán ma?"
      },
      {
       "hz": "幸福社區為什麼很安全？",
       "vi": "Tại sao khu dân cư Hạnh Phúc rất an toàn?",
       "py": "Xìngfú shèqū wèishénme hěn ānquán?"
      },
      {
       "hz": "客人到幸福社區來，為什麼會覺得很輕鬆、很舒服？",
       "vi": "Tại sao khách đến khu dân cư Hạnh Phúc lại thấy rất thư thái, dễ chịu?",
       "py": "Kèrén dào xìngfú shèqū lái, wèishénme huì juéde hěn qīngsōng, hěn shūfú?"
      },
      {
       "hz": "每年中秋節，社區的人為什麼都覺得很開心？",
       "vi": "Tại sao Tết Trung thu năm nào người trong khu cũng thấy rất vui?",
       "py": "Měinián zhōngqiūjié, shèqū de rén wèishénme dōu juéde hěn kāixīn?"
      },
      {
       "hz": "你想住在幸福社區嗎？為什麼？",
       "vi": "Bạn có muốn sống ở khu dân cư Hạnh Phúc không? Tại sao?",
       "py": "Nǐ xiǎng zhù zài xìngfú shèqū ma? Wèishénme?"
      },
      {
       "hz": "到了下午四、五點,夜市就熱鬧起來了。2. 那個孩子一聽到音樂,就跳起舞來了。3. 現在在上課,你怎麼玩起手機來了?",
       "vi": "Đến bốn, năm giờ chiều là chợ đêm bắt đầu náo nhiệt. Đứa bé đó vừa nghe nhạc là nhảy múa ngay. Bây giờ đang trong giờ học, sao bạn lại chơi điện thoại?",
       "py": "Dào le xiàwǔ sì, wǔdiǎn, yèshì jiù rènào qǐlái le. 2. Nàge háizi yì tīngdào yīnyuè, jiù tiào qǐwǔ lái le. 3. Xiànzài zài shàngkè, nǐ zěnme wán qǐ shǒujī lái le?"
      },
      {
       "hz": "B：我早上很忙，沒時間吃東西。",
       "vi": "B: Buổi sáng tôi rất bận, không có thời gian ăn.",
       "py": "B: Wǒ zǎoshàng hěn máng, méi shíjiān chī dōngxī."
      },
      {
       "hz": "A：今天的天氣真奇怪！",
       "vi": "A: Thời tiết hôm nay lạ thật!",
       "py": "A: Jīntiān de tiānqì zhēn qíguài!"
      },
      {
       "hz": "還好今天沒下雨，要不然就不能去露營了。2. 還好我帶了錢，要不然什麼東西都不能買了。3. 還好我的期中考成績不錯,要不然就得再考一次了。",
       "vi": "May mà hôm nay không mưa, nếu không thì không đi cắm trại được. May mà tôi mang tiền, nếu không thì chẳng mua được gì. May mà điểm thi giữa kỳ của tôi khá, nếu không thì phải thi lại.",
       "py": "Háihǎo jīntiān méi xiàyǔ, yàobùrán jiù bùnéng qù lùyíng le. 2. Háihǎo wǒ dài le qián, yàobùrán shénme dōngxī dōu bùnéng mǎi le. 3. Háihǎo wǒ de qízhōngkǎo chéngjì búcuò, yàobùrán jiù děi zài kǎo yícì le."
      },
      {
       "hz": "A：你看，今天排隊買電影票的人真多！",
       "vi": "A: Bạn xem, hôm nay người xếp hàng mua vé xem phim đông thật!",
       "py": "A: Nǐ kàn, jīntiān páiduì mǎi diànyǐngpiào de rén zhēn duō!"
      },
      {
       "hz": "A：這個社區安全嗎？",
       "vi": "A: Khu dân cư này có an toàn không?",
       "py": "A: Zhège shèqū ānquán ma?"
      },
      {
       "hz": "A：你的獎學金一個月兩萬塊，夠嗎？",
       "vi": "A: Học bổng của bạn mỗi tháng hai vạn đồng, có đủ không?",
       "py": "A: Nǐ de jiǎngxuéjīn yígèyuè liǎngwànkuài, gòu ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只要… 就… — chỉ cần… là…",
   "giaiThich": "Nêu một điều kiện dễ đạt: chỉ cần làm được vế trước thì vế sau xảy ra."
  },
  {
   "title": "III. 每＋Nu＋M1 (＋就) ＋V＋一＋M2 (＋N)",
   "points": [
    {
     "label": null,
     "formula": "frequency with 每＋time expressionThis pattern indicates the frequency of an action. \"就\" can be added to emphasize that the action occurs more frequently.",
     "examples": [
      {
       "hz": "我們的中文課每四課考一次(試)。2. 山本良介每半年就回日本一次。3. 我朋友很喜歡牛肉，每三天就吃一次牛排。",
       "vi": "Lớp tiếng Trung của chúng tôi cứ bốn bài thi một lần. Yamamoto Ryosuke cứ nửa năm lại về Nhật một lần. Bạn tôi rất thích thịt bò, cứ ba ngày lại ăn bít tết một lần.",
       "py": "Wǒmen de zhōngwén kè měi sìkè kǎo yícì (shì). 2. Shānběn Liángjiè měibànnián jiù huí Rìběn yícì. 3. Wǒ péngyǒu hěn xǐhuān niúròu, měi sāntiān jiù chī yícì niúpái."
      },
      {
       "hz": "張先生一個禮拜打一次網球。",
       "vi": "Anh Trương một tuần chơi quần vợt một lần.",
       "py": "Zhāng xiānshēng yígè lǐbài dǎ yícì wǎngqiú."
      },
      {
       "hz": "他家的浴室很乾淨，因為星期二、四、六都要打掃。",
       "vi": "Phòng tắm nhà anh ấy rất sạch, vì thứ Ba, thứ Năm, thứ Bảy đều dọn dẹp.",
       "py": "Tājiā de yùshì hěn gānjìng, yīnwèi xīngqí'èr, sì, liù dōu yào dǎsǎo."
      },
      {
       "hz": "醫生說，看三十分鐘的書，就要休息十分鐘。",
       "vi": "Bác sĩ nói cứ đọc sách ba mươi phút thì phải nghỉ mười phút.",
       "py": "Yīshēng shuō, kàn sānshífēnzhōng de shū, jiùyào xiūxí shífēnzhōng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "每 + số + lượng từ — tần suất",
   "giaiThich": "Diễn đạt mức độ thường xuyên của hành động; thêm 就 để nhấn mạnh việc xảy ra khá dày."
  },
  {
   "title": "IV. A 像B一樣 (+Vs) A is just like B",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates two things or situations having something similar. If further explanation of the similarity is needed, it should come after “一樣”. A and B in this pattern can be NPs, VPs or clauses.",
     "examples": [
      {
       "hz": "我住的公寓像金先生住的社區一樣安全。2. 那個孩子的臉像蘋果一樣紅,真可愛!3. 哥哥愛吃牛肉麵,就像爸爸愛吃牛排一樣。4. 弟弟覺得逛百貨公司像參觀博物館一樣無聊,所以他不要去。",
       "vi": "Căn hộ tôi ở an toàn giống như khu dân cư anh Kim ở. Mặt đứa bé đó đỏ như quả táo, dễ thương quá! Anh trai thích ăn mì bò, giống như bố thích ăn bít tết vậy. Em trai thấy đi dạo trung tâm thương mại chán như đi tham quan bảo tàng, nên cậu ấy không muốn đi.",
       "py": "Wǒ zhù de gōngyù xiàng Jīn xiānshēng zhù de shèqū yíyàng ānquán. 2. Nàge háizi de liǎn xiàng píngguǒ yíyàng hóng, zhēn kě'ài! 3. Gēge ài chī niúròumiàn, jiù xiàng bàba ài chī niúpái yíyàng. 4. Dìdi juéde guàng bǎihuògōngsī xiàng cānguān bówùguǎn yíyàng wúliáo, suǒyǐ tā búyào qù."
      },
      {
       "hz": "請說說林明生的社區？在短文裡，林明生住的社區是個什麼樣的社區？請你把那個社區畫出來，然後用下面的問題，跟同學介紹一下那個社區。",
       "vi": "Hãy nói về khu dân cư của Lâm Minh Sinh. Trong bài văn, khu dân cư nơi Lâm Minh Sinh ở là khu như thế nào? Hãy vẽ khu dân cư đó ra, rồi dùng các câu hỏi dưới đây để giới thiệu với các bạn cùng lớp.",
       "py": "Qǐng shuō shuō lín míng shēng de shèqū? Zài duǎnwén lǐ, lín míng shēng zhù de shèqū shì gè shénmeyàng de shèqū? Qǐng nǐ bǎ nàge shèqū huà chūlái, ránhòu yòng xiàmiàn de wèntí, gēn tóngxué jièshào yíxià nàge shèqū."
      },
      {
       "hz": "這個社區在哪裡？",
       "vi": "Khu dân cư này ở đâu?",
       "py": "Zhège shèqū zài nǎlǐ?"
      },
      {
       "hz": "這個社區叫什麼名字？",
       "vi": "Khu dân cư này tên là gì?",
       "py": "Zhège shèqū jiào shénme míngzì?"
      },
      {
       "hz": "這個社區除了房子還有什麼？",
       "vi": "Khu dân cư này ngoài nhà ở ra còn có gì?",
       "py": "Zhège shèqū chúle fángzi háiyǒu shénme?"
      },
      {
       "hz": "你覺得林明生喜歡住在這個社區嗎？",
       "vi": "Bạn nghĩ Lâm Minh Sinh có thích sống ở khu dân cư này không?",
       "py": "Nǐ juéde lín míng shēng xǐhuān zhù zài zhège shèqū ma?"
      },
      {
       "hz": "你覺得一個好的社區，除了房子，還應該有什麼？",
       "vi": "Bạn nghĩ một khu dân cư tốt, ngoài nhà ở ra còn nên có gì?",
       "py": "Nǐ juéde yígè hǎo de shèqū, chúle fángzi, hái yīnggāi yǒu shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "A 像 B 一樣 — A giống như B",
   "giaiThich": "So sánh hai người/vật/tình huống giống nhau; muốn nói rõ giống ở điểm nào thì đặt sau 一樣."
  }
 ],
 "td2-5.4": [
  {
   "title": "I. N1 (+ Neg) + 被 (+N2) + V + C",
   "points": [
    {
     "label": null,
     "formula": "This pattern is one type of passive sentences. “N1” is the patient of the verb, while “N2” which sometimes would be omitted, is the agent. Another common pattern is “N1被(N2) V C”, where C is the complement denoting the result of the verb or how an action is accomplished. The negation word “沒” must be placed before “被”. If there are two subjects (S1, S2), S2 should be placed in front of “就”, “S1+ V著V著, 改寫句子。Rewrite the sentences with the grammar.",
     "examples": [
      {
       "hz": "他家的門被小偷打開了。2. 他亂丟垃圾的時候，被鄰居發現了。3. 同事昨天送給我的甜點怎麼被吃了？我記得放在冰箱裡啊！",
       "vi": "Cửa nhà anh ấy bị trộm mở ra. Lúc anh ấy vứt rác bừa bãi thì bị hàng xóm phát hiện. Món tráng miệng đồng nghiệp tặng tôi hôm qua sao lại bị ăn mất rồi? Tôi nhớ là để trong tủ lạnh mà!",
       "py": "Tājiā de mén bèi xiǎotōu dǎkāi le. 2. Tā luàndiūlèsè de shíhòu, bèi línjū fāxiàn le. 3. Tóngshì zuótiān sònggěi wǒ de tiándiǎn zěnme bèi chī le? Wǒ jìde fàngzài bīngxiāng lǐ a!"
      },
      {
       "hz": "室友把我的果汁喝了。",
       "vi": "Bạn cùng phòng uống mất nước ép của tôi rồi.",
       "py": "Shìyǒu bǎ wǒ de guǒzhī hē le."
      },
      {
       "hz": "媽媽看見弟弟不寫功課，在玩遊戲。",
       "vi": "Mẹ thấy em trai không làm bài tập mà đang chơi game.",
       "py": "Māma kànjiàn dìdi bù xiě gōngkè, zài wányóuxì."
      },
      {
       "hz": "小狗弄髒了我剛洗乾淨的鞋子。",
       "vi": "Con chó nhỏ làm bẩn đôi giày tôi vừa giặt sạch.",
       "py": "Xiǎogǒu nòngzāngle wǒ gāng xǐ gānjìng de xiézi."
      },
      {
       "hz": "那張桌子在一樓，沒被搬上二樓去。2. 你的東西不要亂放，才不會被媽媽丟了。3. 你那件漂亮的衣服沒被姊姊穿去參加舞會，還掛在衣櫃裡呢！",
       "vi": "Cái bàn đó ở tầng một, chưa bị khiêng lên tầng hai. Bạn đừng để đồ bừa bãi thì mới không bị mẹ vứt đi. Bộ quần áo đẹp của bạn không bị chị mặc đi dự tiệc, vẫn treo trong tủ đấy!",
       "py": "Nà zhāng zhuōzi zài yìlóu, méi bèi bān shàng èrlóu qù. 2. Nǐ de dōngxī búyào luànfàng, cái búhuì bèi māma diū le. 3. Nǐ nà jiàn piàoliàng de yīfú méi bèi jiějie chuān qù cānjiā wǔhuì, hái guà zài yīguì lǐ ne!"
      },
      {
       "hz": "先生：我找不到我的車，我要去找警察。",
       "vi": "Chồng: Anh không tìm thấy xe, anh phải đi báo cảnh sát.",
       "py": "Xiānshēng: Wǒ zhǎo búdào wǒ de chē, wǒ yào qù zhǎo jǐngchá."
      },
      {
       "hz": "他跟我聊天的時候，聊著聊著就笑了。2. 孩子在公園裡玩著玩著，就忘了回家的時間了。3. 我用這枝筆寫字，寫著寫著，不知道為什麼，筆就壞了。",
       "vi": "Lúc nói chuyện với tôi, nói một hồi anh ấy bật cười. Bọn trẻ chơi trong công viên, chơi mãi rồi quên cả giờ về nhà. Tôi dùng cây bút này viết, viết một hồi thì không hiểu sao bút hỏng mất.",
       "py": "Tā gēn wǒ liáotiān de shíhòu, liáo zhe liáo zhe jiù xiào le. 2. Háizi zài gōngyuán lǐ wán zhe wán zhe, jiù wàng le huíjiā de shíjiān le. 3. Wǒ yòng zhè zhī bǐ xiězì, xiě zhe xiě zhe, bù zhīdào wèishénme, bǐ jiù huài le."
      },
      {
       "hz": "妹妹在公車上聽音樂，然後就到家了。",
       "vi": "Em gái nghe nhạc trên xe buýt, rồi về đến nhà.",
       "py": "Mèimei zài gōngchēshàng tīng yīnyuè, ránhòu jiù dào jiā le."
      },
      {
       "hz": "他走路去圖書館，後來就下雨了。",
       "vi": "Anh ấy đi bộ đến thư viện, sau đó trời mưa.",
       "py": "Tā zǒulù qù túshūguǎn, hòulái jiù xiàyǔ le."
      },
      {
       "hz": "媽媽說故事給孩子聽，後來孩子睡著了。",
       "vi": "Mẹ kể chuyện cho con nghe, sau đó con ngủ thiếp đi.",
       "py": "Māma shuō gùshì gěi háizi tīng, hòulái háizi shuì zhe le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Câu bị động với 被",
   "giaiThich": "N1 là đối tượng chịu tác động, N2 là người gây ra (có thể lược bỏ). Sau động từ thường có bổ ngữ chỉ kết quả."
  },
  {
   "title": "III. 只要...就... as long as...",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates an easy solution to a problem. If the condition coming after “只要” is fulfilled, the problem can be solved. 請用提示完成對話。Complete the dialogues with given phrases. The frequency adverb \"sometimes\" in this pattern indicates the frequency of two actions(it can be same action with different objects.) 請用提示完成句子。Complete the sentences with given phrases. The pattern \" V起(O)來\" indicates an action or a status begins and lasts. Sometimes, it would be placed at the end of a sentence to show results. If \" V起(O)來\" is placed in the former part of a sentence, the latter part is used to modify the former one. If an object exists, it should be placed between \"起\" and \"來\", e.g., \"下起雨來\", \"說起話來\", etc. This pattern indicates the situation described after \"還好\", otherwise, a negative result after",
     "examples": [
      {
       "hz": "A：請問，我要怎麼參加學校的網球比賽？",
       "vi": "A: Cho hỏi, làm sao để tham gia giải quần vợt của trường?",
       "py": "A: Qǐngwèn, wǒ yào zěnme cānjiā xuéxiào de wǎngqiú bǐsài?"
      },
      {
       "hz": "B：很簡單，只要跟老師說就可以了。",
       "vi": "B: Đơn giản lắm, chỉ cần báo với thầy giáo là được.",
       "py": "B: Hěn jiǎndān, zhǐyào gēn lǎoshī shuō jiù kěyǐ le."
      },
      {
       "hz": "A：喂，我到你家大樓門口了，要怎麼進去呢？",
       "vi": "A: Alo, tôi đến cửa toà nhà của bạn rồi, vào bằng cách nào?",
       "py": "A: Wèi, wǒ dào nǐjiā dàlóu ménkǒu le, yào zěnme jìnqù ne?"
      },
      {
       "hz": "B：你只要跟門口的人說你的名字，就可以進來了。",
       "vi": "B: Bạn chỉ cần báo tên với người ở cửa là vào được.",
       "py": "B: Nǐ zhǐyào gēn ménkǒu de rén shuō nǐ de míngzì, jiù kěyǐ jìnlái le."
      },
      {
       "hz": "錢先生：我什麼時候能搬進去？",
       "vi": "Anh Tiền: Khi nào tôi dọn vào được?",
       "py": "Qián xiānshēng: Wǒ shénme shíhòu néng bānjìn qù?"
      },
      {
       "hz": "王太太：只要付完押金和房租，我就會把鑰匙給你。",
       "vi": "Bà Vương: Chỉ cần trả xong tiền cọc và tiền thuê, tôi sẽ đưa chìa khoá cho anh.",
       "py": "Wáng tàitai: Zhǐyào fù wán yājīn hàn fángzū, wǒ jiù huì bǎ yàoshi gěi nǐ."
      },
      {
       "hz": "A：我的中文字寫得不好看，怎麼辦？ (多練習)2. A：應該怎麼做，我的身體才會比較健康？(少吃甜點/多運動)3. 孩子：我可以躺在公園的草地上嗎？(垃圾/蟲子)",
       "vi": "A: Chữ Hán tôi viết không đẹp, làm sao đây? (luyện nhiều) A: Phải làm thế nào thì sức khoẻ tôi mới tốt hơn? (ăn ít đồ ngọt / tập thể dục nhiều) Con: Con nằm trên bãi cỏ trong công viên được không? (rác / côn trùng)",
       "py": "A: Wǒ de zhōng wénzì xiě de bù hǎokàn, zěnmebàn? (duō liànxí) 2. A: Yīnggāi zěnme zuò, wǒ de shēntǐ cái huì bǐjiào jiànkāng? (shǎo chī tiándiǎn / duō yùndòng) 3. Háizi: Wǒ kěyǐ tǎng zài gōngyuán de cǎodì shàng ma? (lèsè / chóngzi)"
      },
      {
       "hz": "A：你去夜市的時候，常常吃雞排嗎？ B：不一定，有時候吃雞排，有時候吃烤魷魚。",
       "vi": "A: Khi đi chợ đêm, bạn có hay ăn gà rán miếng không? B: Không nhất định, có lúc ăn gà rán, có lúc ăn mực nướng.",
       "py": "A: Nǐ qù yèshì de shíhòu, chángcháng chī jī pái ma? B: Bù yídìng, yǒushíhòu chī jī pái, yǒushíhòu chī kǎo yóuyú."
      },
      {
       "hz": "IV. 有時候...，有時候... 2. A：放假的時候我喜歡去露營，你呢？",
       "vi": "IV. 有時候…，有時候…: có lúc…, có lúc… A: Kỳ nghỉ tôi thích đi cắm trại, còn bạn?",
       "py": "IV. Yǒushíhòu..., yǒushíhòu... 2. A: Fàngjià de shíhòu wǒ xǐhuān qù lùyíng, nǐ ne?"
      },
      {
       "hz": "B：我有時候去旅行，有時候在家休息。",
       "vi": "B: Tôi có lúc đi du lịch, có lúc ở nhà nghỉ ngơi.",
       "py": "B: Wǒ yǒushíhòu qù lǚxíng, yǒushíhòu zàijiā xiūxí."
      },
      {
       "hz": "A：每天下課以後，你都去哪裡？",
       "vi": "A: Hằng ngày tan học xong bạn đều đi đâu?",
       "py": "A: Měitiān xiàkè yǐhòu, nǐ dōu qù nǎlǐ?"
      },
      {
       "hz": "B：有時候去圖書館，有時候回家寫功課。",
       "vi": "B: Có lúc đến thư viện, có lúc về nhà làm bài tập.",
       "py": "B: Yǒushíhòu qù túshūguǎn, yǒushíhòu huíjiā xiě gōngkè."
      },
      {
       "hz": "A：你每天下班以後，都在家做什麼？(看電視、做家事)2. A：你姐姐喜歡買什麼顏色的衣服？",
       "vi": "A: Hằng ngày tan làm bạn thường làm gì ở nhà? (xem tivi, làm việc nhà) A: Chị bạn thích mua quần áo màu gì?",
       "py": "A: Nǐ měitiān xiàbān yǐhòu, dōu zàijiā zuò shénme? (kàndiànshì, zuò jiāshì) 2. A: Nǐ jiějie xǐhuān mǎi shénme yánsè de yīfú?"
      },
      {
       "hz": "可欣：這個社區的人，有空的時候會做什麼？",
       "vi": "Khả Hân: Người trong khu dân cư này lúc rảnh thường làm gì?",
       "py": "Kěxīn: Zhège shèqū de rén, yǒukòng de shíhòu huì zuò shénme?"
      },
      {
       "hz": "幸福社區在什麼地方？",
       "vi": "Khu dân cư Hạnh Phúc ở đâu?",
       "py": "Xìngfú shèqū zài shénme dìfāng?"
      },
      {
       "hz": "幸福社區在山上，每次要出門怎麼辦？",
       "vi": "Khu dân cư Hạnh Phúc ở trên núi, mỗi lần ra ngoài thì làm thế nào?",
       "py": "Xìngfú shèqū zài shānshàng, měicì yào chūmén zěnmebàn?"
      },
      {
       "hz": "坐社區的小巴士很麻煩嗎？",
       "vi": "Đi xe buýt nhỏ của khu dân cư có phiền không?",
       "py": "Zuò shèqū de xiǎo bāshì hěn máfán ma?"
      },
      {
       "hz": "幸福社區為什麼很安全？",
       "vi": "Tại sao khu dân cư Hạnh Phúc rất an toàn?",
       "py": "Xìngfú shèqū wèishénme hěn ānquán?"
      },
      {
       "hz": "客人到幸福社區來，為什麼會覺得很輕鬆、很舒服？",
       "vi": "Tại sao khách đến khu dân cư Hạnh Phúc lại thấy rất thư thái, dễ chịu?",
       "py": "Kèrén dào xìngfú shèqū lái, wèishénme huì juéde hěn qīngsōng, hěn shūfú?"
      },
      {
       "hz": "每年中秋節，社區的人為什麼都覺得很開心？",
       "vi": "Tại sao Tết Trung thu năm nào người trong khu cũng thấy rất vui?",
       "py": "Měinián zhōngqiūjié, shèqū de rén wèishénme dōu juéde hěn kāixīn?"
      },
      {
       "hz": "你想住在幸福社區嗎？為什麼？",
       "vi": "Bạn có muốn sống ở khu dân cư Hạnh Phúc không? Tại sao?",
       "py": "Nǐ xiǎng zhù zài xìngfú shèqū ma? Wèishénme?"
      },
      {
       "hz": "到了下午四、五點,夜市就熱鬧起來了。2. 那個孩子一聽到音樂,就跳起舞來了。3. 現在在上課,你怎麼玩起手機來了?",
       "vi": "Đến bốn, năm giờ chiều là chợ đêm bắt đầu náo nhiệt. Đứa bé đó vừa nghe nhạc là nhảy múa ngay. Bây giờ đang trong giờ học, sao bạn lại chơi điện thoại?",
       "py": "Dào le xiàwǔ sì, wǔdiǎn, yèshì jiù rènào qǐlái le. 2. Nàge háizi yì tīngdào yīnyuè, jiù tiào qǐwǔ lái le. 3. Xiànzài zài shàngkè, nǐ zěnme wán qǐ shǒujī lái le?"
      },
      {
       "hz": "B：我早上很忙，沒時間吃東西。",
       "vi": "B: Buổi sáng tôi rất bận, không có thời gian ăn.",
       "py": "B: Wǒ zǎoshàng hěn máng, méi shíjiān chī dōngxī."
      },
      {
       "hz": "A：今天的天氣真奇怪！",
       "vi": "A: Thời tiết hôm nay lạ thật!",
       "py": "A: Jīntiān de tiānqì zhēn qíguài!"
      },
      {
       "hz": "還好今天沒下雨，要不然就不能去露營了。2. 還好我帶了錢，要不然什麼東西都不能買了。3. 還好我的期中考成績不錯,要不然就得再考一次了。",
       "vi": "May mà hôm nay không mưa, nếu không thì không đi cắm trại được. May mà tôi mang tiền, nếu không thì chẳng mua được gì. May mà điểm thi giữa kỳ của tôi khá, nếu không thì phải thi lại.",
       "py": "Háihǎo jīntiān méi xiàyǔ, yàobùrán jiù bùnéng qù lùyíng le. 2. Háihǎo wǒ dài le qián, yàobùrán shénme dōngxī dōu bùnéng mǎi le. 3. Háihǎo wǒ de qízhōngkǎo chéngjì búcuò, yàobùrán jiù děi zài kǎo yícì le."
      },
      {
       "hz": "A：你看，今天排隊買電影票的人真多！",
       "vi": "A: Bạn xem, hôm nay người xếp hàng mua vé xem phim đông thật!",
       "py": "A: Nǐ kàn, jīntiān páiduì mǎi diànyǐngpiào de rén zhēn duō!"
      },
      {
       "hz": "A：這個社區安全嗎？",
       "vi": "A: Khu dân cư này có an toàn không?",
       "py": "A: Zhège shèqū ānquán ma?"
      },
      {
       "hz": "A：你的獎學金一個月兩萬塊，夠嗎？",
       "vi": "A: Học bổng của bạn mỗi tháng hai vạn đồng, có đủ không?",
       "py": "A: Nǐ de jiǎngxuéjīn yígèyuè liǎngwànkuài, gòu ma?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只要… 就… — chỉ cần… là…",
   "giaiThich": "Nêu một điều kiện dễ đạt: chỉ cần làm được vế trước thì vế sau xảy ra."
  },
  {
   "title": "III. 每＋Nu＋M1 (＋就) ＋V＋一＋M2 (＋N)",
   "points": [
    {
     "label": null,
     "formula": "frequency with 每＋time expressionThis pattern indicates the frequency of an action. \"就\" can be added to emphasize that the action occurs more frequently.",
     "examples": [
      {
       "hz": "我們的中文課每四課考一次(試)。2. 山本良介每半年就回日本一次。3. 我朋友很喜歡牛肉，每三天就吃一次牛排。",
       "vi": "Lớp tiếng Trung của chúng tôi cứ bốn bài thi một lần. Yamamoto Ryosuke cứ nửa năm lại về Nhật một lần. Bạn tôi rất thích thịt bò, cứ ba ngày lại ăn bít tết một lần.",
       "py": "Wǒmen de zhōngwén kè měi sìkè kǎo yícì (shì). 2. Shānběn Liángjiè měibànnián jiù huí Rìběn yícì. 3. Wǒ péngyǒu hěn xǐhuān niúròu, měi sāntiān jiù chī yícì niúpái."
      },
      {
       "hz": "張先生一個禮拜打一次網球。",
       "vi": "Anh Trương một tuần chơi quần vợt một lần.",
       "py": "Zhāng xiānshēng yígè lǐbài dǎ yícì wǎngqiú."
      },
      {
       "hz": "他家的浴室很乾淨，因為星期二、四、六都要打掃。",
       "vi": "Phòng tắm nhà anh ấy rất sạch, vì thứ Ba, thứ Năm, thứ Bảy đều dọn dẹp.",
       "py": "Tājiā de yùshì hěn gānjìng, yīnwèi xīngqí'èr, sì, liù dōu yào dǎsǎo."
      },
      {
       "hz": "醫生說，看三十分鐘的書，就要休息十分鐘。",
       "vi": "Bác sĩ nói cứ đọc sách ba mươi phút thì phải nghỉ mười phút.",
       "py": "Yīshēng shuō, kàn sānshífēnzhōng de shū, jiùyào xiūxí shífēnzhōng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "每 + số + lượng từ — tần suất",
   "giaiThich": "Diễn đạt mức độ thường xuyên của hành động; thêm 就 để nhấn mạnh việc xảy ra khá dày."
  },
  {
   "title": "IV. A 像B一樣 (+Vs) A is just like B",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates two things or situations having something similar. If further explanation of the similarity is needed, it should come after “一樣”. A and B in this pattern can be NPs, VPs or clauses.",
     "examples": [
      {
       "hz": "我住的公寓像金先生住的社區一樣安全。2. 那個孩子的臉像蘋果一樣紅,真可愛!3. 哥哥愛吃牛肉麵,就像爸爸愛吃牛排一樣。4. 弟弟覺得逛百貨公司像參觀博物館一樣無聊,所以他不要去。",
       "vi": "Căn hộ tôi ở an toàn giống như khu dân cư anh Kim ở. Mặt đứa bé đó đỏ như quả táo, dễ thương quá! Anh trai thích ăn mì bò, giống như bố thích ăn bít tết vậy. Em trai thấy đi dạo trung tâm thương mại chán như đi tham quan bảo tàng, nên cậu ấy không muốn đi.",
       "py": "Wǒ zhù de gōngyù xiàng Jīn xiānshēng zhù de shèqū yíyàng ānquán. 2. Nàge háizi de liǎn xiàng píngguǒ yíyàng hóng, zhēn kě'ài! 3. Gēge ài chī niúròumiàn, jiù xiàng bàba ài chī niúpái yíyàng. 4. Dìdi juéde guàng bǎihuògōngsī xiàng cānguān bówùguǎn yíyàng wúliáo, suǒyǐ tā búyào qù."
      },
      {
       "hz": "請說說林明生的社區？在短文裡，林明生住的社區是個什麼樣的社區？請你把那個社區畫出來，然後用下面的問題，跟同學介紹一下那個社區。",
       "vi": "Hãy nói về khu dân cư của Lâm Minh Sinh. Trong bài văn, khu dân cư nơi Lâm Minh Sinh ở là khu như thế nào? Hãy vẽ khu dân cư đó ra, rồi dùng các câu hỏi dưới đây để giới thiệu với các bạn cùng lớp.",
       "py": "Qǐng shuō shuō lín míng shēng de shèqū? Zài duǎnwén lǐ, lín míng shēng zhù de shèqū shì gè shénmeyàng de shèqū? Qǐng nǐ bǎ nàge shèqū huà chūlái, ránhòu yòng xiàmiàn de wèntí, gēn tóngxué jièshào yíxià nàge shèqū."
      },
      {
       "hz": "這個社區在哪裡？",
       "vi": "Khu dân cư này ở đâu?",
       "py": "Zhège shèqū zài nǎlǐ?"
      },
      {
       "hz": "這個社區叫什麼名字？",
       "vi": "Khu dân cư này tên là gì?",
       "py": "Zhège shèqū jiào shénme míngzì?"
      },
      {
       "hz": "這個社區除了房子還有什麼？",
       "vi": "Khu dân cư này ngoài nhà ở ra còn có gì?",
       "py": "Zhège shèqū chúle fángzi háiyǒu shénme?"
      },
      {
       "hz": "你覺得林明生喜歡住在這個社區嗎？",
       "vi": "Bạn nghĩ Lâm Minh Sinh có thích sống ở khu dân cư này không?",
       "py": "Nǐ juéde lín míng shēng xǐhuān zhù zài zhège shèqū ma?"
      },
      {
       "hz": "你覺得一個好的社區，除了房子，還應該有什麼？",
       "vi": "Bạn nghĩ một khu dân cư tốt, ngoài nhà ở ra còn nên có gì?",
       "py": "Nǐ juéde yígè hǎo de shèqū, chúle fángzi, hái yīnggāi yǒu shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "A 像 B 一樣 — A giống như B",
   "giaiThich": "So sánh hai người/vật/tình huống giống nhau; muốn nói rõ giống ở điểm nào thì đặt sau 一樣."
  }
 ],
 "td2-6.1": [
  {
   "title": "2. 我覺得「害怕」跟「可怕」的意思",
   "points": [
    {
     "label": null,
     "formula": "(Vp) make a mistake; misunderstand all set and ready with V complement 好 “好” is placed after the verb and acts as a verb complement. When used together with a verb, “好” serves as a verb complement denoting the action is finished with an idea result. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do something wrong “錯” is placed after the verb, serving as the verb complement. V錯 indicates that the subject did something wrong. The result of the action is a mistake. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do somethingwrong When used together with a verb, “會” serves as a resultative complement. The verbs used in this pattern include “學(learn)” and “教(teach)”, which indicate someone acquires certain techniques through learning or teaching. There are two patterns, including (1) V會了/沒V會 and (2) V得會/V不會。 IV. ...QW...就...QW...\twhatever; whoever; wherever... The two question words, which show a tone of randomness, represent the same thing and indicate there is no other special requirement or limitation as long as the requirement going before “就” is fulfilled. If the two question words are “誰(who)”, the second one can be placed before “就”, e.g. “這個巧克力，誰想吃誰就吃。\"",
     "examples": [
      {
       "hz": "林小姐弄錯了約會的時間，所以遲到了半個小時。",
       "vi": "Cô Lâm nhầm giờ hẹn, nên đến muộn nửa tiếng.",
       "py": "Lín xiǎojiě nòngcuò le yuēhuì de shíjiān, suǒyǐ chídào le bàngè xiǎoshí."
      },
      {
       "hz": "差不多，所以常弄錯。",
       "vi": "…gần giống nhau, nên hay bị nhầm.",
       "py": "Chàbuduō, suǒyǐ cháng nòngcuò."
      },
      {
       "hz": "媽媽把明天要去野餐的東西都準備好了。2. 你還沒把功課寫好，不能出去踢足球。3. 學新的語言,要是你不常練習，當然學不好。4. 這份工作不簡單，你覺得他做得好做不好?",
       "vi": "Mẹ đã chuẩn bị xong hết đồ cho buổi dã ngoại ngày mai. Con chưa làm xong bài tập, không được ra ngoài đá bóng. Học ngôn ngữ mới mà không thường xuyên luyện tập thì đương nhiên học không tốt được. Công việc này không đơn giản, bạn nghĩ anh ấy có làm tốt được không?",
       "py": "Māma bǎ míngtiān yào qù yěcān de dōngxī dōu zhǔnbèi hǎo le. 2. Nǐ hái méi bǎ gōngkè xiě hǎo, bùnéng chūqù tīzúqiú. 3. Xué xīn de yǔyán, yàoshì nǐ bù cháng liànxí, dāngrán xué bùhǎo. 4. Zhèfèn gōngzuò bù jiǎndān, nǐ juéde tā zuòdehǎo zuò bùhǎo?"
      },
      {
       "hz": "V好：V 好了 / 沒 V 好 / V 得好 / V 不好",
       "vi": "V好: V xong rồi / chưa V xong / V được tốt / V không tốt",
       "py": "V hǎo: V hǎo le / méi V hǎo / V de hǎo / V bùhǎo"
      },
      {
       "hz": "(一)⋯⋯+V錯(+O)了\t1. 他是黃先生不是王先生,你聽錯了。2. 今天早上我坐錯車了,所以上班遲到了。3. A：我們要去看的演唱會是下個星期六不是這個星期六。 B：真的嗎?我記錯時間了嗎?",
       "vi": "(1) … + V錯 (+ O) 了: làm sai. Anh ấy là ông Hoàng chứ không phải ông Vương, bạn nghe nhầm rồi. Sáng nay tôi đi nhầm xe, nên đi làm muộn. A: Buổi hoà nhạc chúng ta định xem là thứ Bảy tuần sau chứ không phải thứ Bảy này. B: Thật à? Tôi nhớ nhầm ngày à?",
       "py": "(yī)…… + V cuò (+ O) le 1. Tā shì Huáng xiānshēng búshì Wáng xiānshēng, nǐ tīngcuò le. 2. Jīntiān zǎoshàng wǒ zuò cuòchē le, suǒyǐ shàngbān chídào le. 3. A: Wǒmen yào qù kàn de yǎnchànghuì shì xià gè xīngqíliù búshì zhège xīngqíliù. B: Zhēnde ma? Wǒ jìcuò shíjiān le ma?"
      },
      {
       "hz": "(二)…沒+V錯(+O)1. 孩子沒做錯事，你為什麼要打他？2. A：你吃了什麼？為什麼肚子疼呢？ B：醫生說我沒吃錯東西，可能是飲料不新鮮。3. A：你沒聽錯，李小姐真的明天要結婚了。 B：可是她說她沒有男朋友啊!",
       "vi": "(2) … 沒 + V錯 (+ O): không làm sai. Đứa bé không làm gì sai, sao anh lại đánh nó? A: Bạn đã ăn gì? Sao lại đau bụng? B: Bác sĩ nói tôi không ăn nhầm gì cả, có lẽ đồ uống không tươi. A: Bạn không nghe nhầm đâu, ngày mai cô Lý kết hôn thật đấy. B: Nhưng cô ấy nói cô ấy không có bạn trai mà!",
       "py": "(èr)… méi + V cuò (+ O) 1. Háizi méi zuòcuòshì, nǐ wèishénme yào dǎ tā? 2. A: Nǐ chī le shénme? Wèishénme dùziténg ne? B: Yīshēng shuō wǒ méi chī cuò dōngxī, kěnéng shì yǐnliào bù xīnxiān. 3. A: Nǐ méi tīngcuò, Lǐ xiǎojiě zhēnde míngtiān yào jiéhūn le. B: Kěshì tā shuō tā méiyǒu nánpéngyǒu a!"
      },
      {
       "hz": "太太；你怎麼站在門口，不進去呢？",
       "vi": "Vợ: Sao anh đứng ở cửa mà không vào?",
       "py": "Tàitai; nǐ zěnme zhàn zài ménkǒu, bú jìnqù ne?"
      },
      {
       "hz": "A：我們去KTV唱歌吧！",
       "vi": "A: Chúng ta đi hát karaoke đi!",
       "py": "A: Wǒmen qù KTV chànggē ba!"
      },
      {
       "hz": "B：我早上出門的時候覺得有一點兒冷，沒想到現在這麼熱。",
       "vi": "B: Sáng nay lúc ra khỏi nhà tôi thấy hơi lạnh, không ngờ bây giờ nóng thế này.",
       "py": "B: Wǒ zǎoshàng chūmén de shíhòu juéde yǒu yìdiǎn'ér lěng, méixiǎngdào xiànzài zhème rè."
      },
      {
       "hz": "我學游泳,學了一個月就學會了。2. 那個外國人還沒學會用筷子吃飯。3. 這首中文歌很容易,誰都學得會。4. 那個孩子那麼小,爸爸教得會教不會他怎麼騎腳踏車?",
       "vi": "Tôi học bơi, học một tháng là biết bơi. Người nước ngoài đó vẫn chưa học được cách ăn bằng đũa. Bài hát tiếng Trung này rất dễ, ai cũng học được. Đứa bé đó còn nhỏ như vậy, bố có dạy nó đạp xe được không?",
       "py": "Wǒ xué yóuyǒng, xué le yígèyuè jiù xuéhuì le. 2. Nàge wàiguórén hái méi xuéhuì yòng kuàizi chīfàn. 3. Zhè shǒu zhōngwén gē hěn róngyì, shéi dōu xué de huì. 4. Nàge háizi nàme xiǎo, bàba jiào de huì jiào búhuì tā zěnme qí jiǎotàchē?"
      },
      {
       "hz": "III. V 會：V會了 / 沒V會 / V得會 / V不會",
       "vi": "III. V會: V được rồi / chưa V được / V có thể được / V không được",
       "py": "III. V huì: V huì le / méi V huì / V de huì / V búhuì"
      },
      {
       "hz": "他很有錢，想買什麼就買什麼。 2. 媽媽今天做了很多包子,你想吃幾個就吃幾個。3. A：你想去哪裡跨年？ B：哪裡熱鬧就去哪裡。 4. A：我們要怎麼去合歡山？ B：怎麼去比較方便就怎麼去。",
       "vi": "Anh ấy rất giàu, muốn mua gì thì mua nấy. Hôm nay mẹ làm rất nhiều bánh bao, con muốn ăn mấy cái thì ăn bấy nhiêu. A: Bạn muốn đón năm mới ở đâu? B: Chỗ nào náo nhiệt thì đi chỗ đó. A: Chúng ta đi núi Hợp Hoan bằng cách nào? B: Đi cách nào tiện hơn thì đi cách đó.",
       "py": "Tā hěn yǒuqián, xiǎng mǎi shénme jiù mǎi shénme. 2. Māma jīntiān zuò le hěnduō bāozi, nǐ xiǎng chī jǐgè jiù chī jǐgè. 3. A: Nǐ xiǎng qù nǎlǐ kuà nián? B: Nǎlǐ rènào jiù qù nǎlǐ. 4. A: Wǒmen yào zěnme qù héhuānshān? B: Zěnme qù bǐjiào fāngbiàn jiù zěnme qù."
      },
      {
       "hz": "A：這些飲料都很好喝，你要喝哪一種？(好喝)3. A：那家商店賣很多不同顏色的燈籠，你想買哪一個？",
       "vi": "A: Những đồ uống này đều rất ngon, bạn muốn uống loại nào? (ngon) A: Cửa hàng đó bán nhiều đèn lồng màu khác nhau, bạn muốn mua cái nào?",
       "py": "A: Zhèxiē yǐnliào dōu hěn hǎohē, nǐ yào hē nǎ yìzhǒng? (hǎohē) 3. A: Nà jiā shāngdiàn mài hěnduō bùtóng yánsè de dēnglóng, nǐ xiǎng mǎi nǎ yígè?"
      },
      {
       "hz": "A：這塊雞肉要怎麼做？烤還是炸？",
       "vi": "A: Miếng thịt gà này làm thế nào? Nướng hay chiên?",
       "py": "A: Zhèkuài jīròu yào zěnme zuò? Kǎo háishì zhà?"
      },
      {
       "hz": "A：週末從台灣飛往美國的飛機一共有八班，你要搭哪(一)班？",
       "vi": "A: Cuối tuần từ Đài Loan bay sang Mỹ tổng cộng có tám chuyến, bạn đi chuyến nào?",
       "py": "A: Zhōumò cóng Táiwān fēiwǎng Měiguó de fēijī yígòng yǒu bābān, nǐ yào dā nǎ (yì) bān?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ 好 — xong xuôi, sẵn sàng",
   "giaiThich": "好 đứng sau động từ làm bổ ngữ, chỉ việc đã làm xong và sẵn sàng (準備好, 寫好). Bài cũng phân biệt 害怕 và 可怕."
  },
  {
   "title": "V. 會......的 to offer assurance with 會......的",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the speaker believes the situation after “會” is quite likely to happen. “的” in this pattern is added to show affirmation with a more softened tone. VI. 等......就......\tWhen something happens, then S... This pattern indicates when something happens, someone will perform an action. Negation words “不” and “沒” should be placed before “等”. 請用提示完成句子。Complete the dialogues with given phrases.",
     "examples": [
      {
       "hz": "李小姐的成績很好，畢業後一定會找到好工作的。",
       "vi": "Thành tích của cô Lý rất tốt, tốt nghiệp xong chắc chắn sẽ tìm được việc tốt.",
       "py": "Lǐ xiǎojiě de chéngjì hěn hǎo, bìyè hòu yídìng huì zhǎodào hǎo gōngzuò de."
      },
      {
       "hz": "醫生說，多休息、多喝水，我的感冒很快就會好的。",
       "vi": "Bác sĩ nói nghỉ ngơi nhiều, uống nhiều nước thì bệnh cảm của tôi sẽ sớm khỏi thôi.",
       "py": "Yīshēng shuō, duō xiūxí, duōhēshuǐ, wǒ de gǎnmào hěnkuài jiù huì hǎo de."
      },
      {
       "hz": "A：我很想去法國留學，可是怕父母不同意。",
       "vi": "A: Tôi rất muốn sang Pháp du học, nhưng sợ bố mẹ không đồng ý.",
       "py": "A: Wǒ hěn xiǎng qù Fǎguó liúxué, kěshì pà fùmǔ bù tóngyì."
      },
      {
       "hz": "B：只要好好地跟他們說，他們不會不同意的。",
       "vi": "B: Chỉ cần bạn nói chuyện đàng hoàng với bố mẹ, họ sẽ không phản đối đâu.",
       "py": "B: Zhǐyào hǎohǎo dì gēn tāmen shuō, tāmen búhuì bù tóngyì de."
      },
      {
       "hz": "A：週末我想去山上野餐，不知道會不會下雨?",
       "vi": "A: Cuối tuần tôi muốn lên núi dã ngoại, không biết có mưa không?",
       "py": "A: Zhōumò wǒ xiǎng qù shānshàng yěcān, bù zhīdào huì búhuì xiàyǔ?"
      },
      {
       "hz": "哥哥：我買了一瓶香水要送給女朋友，不知道她喜歡不喜歡？",
       "vi": "Anh trai: Anh mua một lọ nước hoa định tặng bạn gái, không biết cô ấy có thích không?",
       "py": "Gēge: Wǒ mǎi le yìpíng xiāngshuǐ yào sònggěi nǚpéngyǒu, bù zhīdào tā xǐhuān bù xǐhuān?"
      },
      {
       "hz": "有很多人沒等舞會結束，就先走了。",
       "vi": "Có nhiều người chưa đợi buổi tiệc kết thúc đã về trước.",
       "py": "Yǒu hěnduō rén méi děng wǔhuì jiéshù, jiù xiān zǒu le."
      },
      {
       "hz": "等這個學期結束，我就不要住在宿舍裡了。",
       "vi": "Đợi học kỳ này kết thúc, tôi sẽ không ở ký túc xá nữa.",
       "py": "Děng zhège xuéqíjiéshù, wǒ jiù búyào zhù zài sùshè lǐ le."
      },
      {
       "hz": "等夏天來了,我們就可以去海邊曬太陽、游泳了。",
       "vi": "Đợi mùa hè đến, chúng ta có thể đi biển tắm nắng, bơi lội.",
       "py": "Děng xiàtiān lái le, wǒmen jiù kěyǐ qù hǎibiān shàitàiyáng, yóuyǒng le."
      },
      {
       "hz": "A：請問，學校什麼時候給我們獎學金呢？(考完試)",
       "vi": "A: Cho hỏi, khi nào trường phát học bổng cho chúng em? (thi xong)",
       "py": "A: Qǐngwèn, xuéxiào shénme shíhòu gěi wǒmen jiǎngxuéjīn ne? (kǎowánshì)"
      },
      {
       "hz": "台灣的KTV有什麼特色？",
       "vi": "Karaoke ở Đài Loan có đặc điểm gì?",
       "py": "Táiwān de KTV yǒu shénme tèsè?"
      },
      {
       "hz": "要是想省錢，什麼時候去KTV唱歌最便宜？",
       "vi": "Nếu muốn tiết kiệm, đi hát karaoke lúc nào rẻ nhất?",
       "py": "Yàoshì xiǎng shěngqián, shénme shíhòu qù KTV chànggē zuì piányi?"
      },
      {
       "hz": "為什麼有人生氣或是傷心的時候要去KTV唱歌？",
       "vi": "Tại sao có người lúc tức giận hoặc buồn lại đi hát karaoke?",
       "py": "Wèishénme yǒurén shēngqì huòshì shāngxīn de shíhòu yào qù KTV chànggē?"
      },
      {
       "hz": "你心情不好的時候，怎麼辦？",
       "vi": "Khi tâm trạng không tốt, bạn làm gì?",
       "py": "Nǐ xīnqíng bùhǎo de shíhòu, zěnmebàn?"
      },
      {
       "hz": "在你的國家，去KTV唱歌是很流行的活動嗎？",
       "vi": "Ở nước bạn, đi hát karaoke có phải là hoạt động rất phổ biến không?",
       "py": "Zài nǐ de guójiā, qù KTV chànggē shì hěn liúxíng de huódòng ma?"
      },
      {
       "hz": "你喜歡去KTV唱歌嗎？為什麼？",
       "vi": "Bạn có thích đi hát karaoke không? Tại sao?",
       "py": "Nǐ xǐhuān qù KTV chànggē ma? Wèishénme?"
      },
      {
       "hz": "除了去KTV唱歌，還可以在KTV辦什麼活動？",
       "vi": "Ngoài hát, còn có thể tổ chức hoạt động gì ở quán karaoke?",
       "py": "Chúle qù KTV chànggē, hái kěyǐ zài KTV bàn shénme huódòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會……的 — chắc chắn sẽ…",
   "giaiThich": "Người nói tin việc sau 會 rất có khả năng xảy ra; 的 ở cuối làm giọng điệu mềm và khẳng định hơn. Kèm mẫu 等……就…… (đợi… thì…)."
  },
  {
   "title": "I. 才 merely, only",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the number is fewer than the speaker's expectation, different from the usage of \"才\" in Lesson Two. Both \"才\" and \"只\" imply a small number. However, \"才\" emphasizes the small number is the speaker's subjective opinion. Also, \"才\" can be followed directly with number words; \"只\" is placed before the verb and cannot be followed with number words. e.g. \"這件衣服只一百塊錢\"",
     "examples": [
      {
       "hz": "今天咖啡館裡才三個人，客人真少。2. 我今天中午才吃了一個麵包，現在好餓。3. A：那個孩子籃球打得很好，他學了很久吧？ B：老師說他很聰明，才教了半個月就教會(他)了。",
       "vi": "Hôm nay quán cà phê chỉ có ba người, khách ít thật. Trưa nay tôi chỉ ăn một cái bánh mì, bây giờ đói quá. A: Đứa bé đó chơi bóng rổ giỏi lắm, chắc học lâu rồi nhỉ? B: Thầy giáo nói cậu bé rất thông minh, mới dạy nửa tháng đã biết chơi rồi.",
       "py": "Jīntiān kāfēiguǎn lǐ cái sāngè rén, kèrén zhēn shǎo. 2. Wǒ jīntiān zhōngwǔ cái chī le yígè miànbāo, xiànzài hǎo è. 3. A: Nàge háizi lánqiú dǎ de hěn hǎo, tā xué le hěn jiǔ ba? B: Lǎoshī shuō tā hěn cōngmíng, cái jiào le bàngè yuè jiù jiàohuì (tā) le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — chỉ mới, ít ỏi",
   "giaiThich": "Ở đây 才 nói số lượng ÍT hơn người nói mong đợi (khác nghĩa \"mãi mới\" ở bài 2). 才 và 只 đều chỉ số ít, nhưng 才 nhấn mạnh cảm giác ít."
  },
  {
   "title": "II. 讓 to make someone feel...",
   "points": [
    {
     "label": null,
     "formula": "In the pattern \"A讓B+Vs\", A is the cause that makes B have certain feelings.",
     "examples": [
      {
       "hz": "朋友送了我一個生日蛋糕，讓我很開心。 2. 爸爸開了五個小時的車，讓他累的不得了。 3. 昨天吃了不乾淨的東西，讓我的肚子不太舒服。",
       "vi": "Bạn tặng tôi một chiếc bánh sinh nhật, khiến tôi rất vui. Bố lái xe năm tiếng, khiến bố mệt vô cùng. Hôm qua ăn phải đồ không sạch, khiến bụng tôi không được thoải mái lắm.",
       "py": "Péngyǒu sòng le wǒ yígè shēngrìdàngāo, ràng wǒ hěn kāixīn. 2. Bàba kāi le wǔgè xiǎoshí de chē, ràng tā lèi de bùdéle. 3. Zuótiān chī le bù gānjìng de dōngxī, ràng wǒ de dùzi bú tài shūfú."
      },
      {
       "hz": "用「讓」改寫下面句子。Viết lại câu bằng 讓. 1. 我已經兩個星期沒倒垃圾了，所以媽媽很生氣。",
       "vi": "Dùng 讓 viết lại các câu dưới đây. 1. Đã hai tuần tôi không đổ rác, nên mẹ rất tức giận.",
       "py": "Yòng “ràng” gǎixiě xiàmiàn jùzi. Vi ế t l ạ i c â u b ằ ng ràng. 1. Wǒ yǐjīng liǎnggè xīngqí méi dào lèsè le, suǒyǐ māma hěn shēngqì."
      },
      {
       "hz": "我一想到明天要去旅行，就很興奮，所以睡不著。",
       "vi": "Cứ nghĩ đến ngày mai được đi du lịch là tôi háo hức, nên không ngủ được.",
       "py": "Wǒ yì xiǎngdào míngtiān yào qù lǚxíng, jiù hěn xīngfèn, suǒyǐ shuì bù zhe."
      },
      {
       "hz": "我不喜歡坐飛機，一聽到坐飛機就緊張得不得了。",
       "vi": "Tôi không thích đi máy bay, cứ nghe đến đi máy bay là căng thẳng vô cùng.",
       "py": "Wǒ bù xǐhuān zuòfēijī, yì tīngdào zuòfēijī jiù jǐnzhāng de bùdéle."
      },
      {
       "hz": "你會唱中文歌嗎？",
       "vi": "Bạn có biết hát bài hát tiếng Trung không?",
       "py": "Nǐ huì chàng zhōngwén gē ma?"
      },
      {
       "hz": "請找一首中文歌曲，說說看那首歌的歌詞是什麼意思。",
       "vi": "Hãy tìm một bài hát tiếng Trung, rồi nói xem lời bài hát có nghĩa là gì.",
       "py": "Qǐng zhǎo yìshǒu zhōngwéngēqǔ, shuōshuōkàn nàshǒugē de gēcí shì shénme yìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — làm cho ai đó cảm thấy…",
   "giaiThich": "Mẫu \"A 讓 B + tính từ\": A là nguyên nhân khiến B có cảm giác nào đó."
  },
  {
   "title": "2. 請比較台灣的KTV和你的國家的KTV",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請使用下面的語法有沒有吃到飽",
       "vi": "Hãy dùng ngữ pháp dưới đây… có ăn thoả thích (buffet) không",
       "py": "Qǐng shǐyòng xiàmiàn de yǔfǎ yǒuméiyǒu chī dào bǎo"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: so sánh KTV",
   "giaiThich": "Phần luyện nói: so sánh KTV ở Đài Loan với ở nước bạn."
  }
 ],
 "td2-6.2": [
  {
   "title": "2. 我覺得「害怕」跟「可怕」的意思",
   "points": [
    {
     "label": null,
     "formula": "(Vp) make a mistake; misunderstand all set and ready with V complement 好 “好” is placed after the verb and acts as a verb complement. When used together with a verb, “好” serves as a verb complement denoting the action is finished with an idea result. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do something wrong “錯” is placed after the verb, serving as the verb complement. V錯 indicates that the subject did something wrong. The result of the action is a mistake. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do somethingwrong When used together with a verb, “會” serves as a resultative complement. The verbs used in this pattern include “學(learn)” and “教(teach)”, which indicate someone acquires certain techniques through learning or teaching. There are two patterns, including (1) V會了/沒V會 and (2) V得會/V不會。 IV. ...QW...就...QW...\twhatever; whoever; wherever... The two question words, which show a tone of randomness, represent the same thing and indicate there is no other special requirement or limitation as long as the requirement going before “就” is fulfilled. If the two question words are “誰(who)”, the second one can be placed before “就”, e.g. “這個巧克力，誰想吃誰就吃。\"",
     "examples": [
      {
       "hz": "林小姐弄錯了約會的時間，所以遲到了半個小時。",
       "vi": "Cô Lâm nhầm giờ hẹn, nên đến muộn nửa tiếng.",
       "py": "Lín xiǎojiě nòngcuò le yuēhuì de shíjiān, suǒyǐ chídào le bàngè xiǎoshí."
      },
      {
       "hz": "差不多，所以常弄錯。",
       "vi": "…gần giống nhau, nên hay bị nhầm.",
       "py": "Chàbuduō, suǒyǐ cháng nòngcuò."
      },
      {
       "hz": "媽媽把明天要去野餐的東西都準備好了。2. 你還沒把功課寫好，不能出去踢足球。3. 學新的語言,要是你不常練習，當然學不好。4. 這份工作不簡單，你覺得他做得好做不好?",
       "vi": "Mẹ đã chuẩn bị xong hết đồ cho buổi dã ngoại ngày mai. Con chưa làm xong bài tập, không được ra ngoài đá bóng. Học ngôn ngữ mới mà không thường xuyên luyện tập thì đương nhiên học không tốt được. Công việc này không đơn giản, bạn nghĩ anh ấy có làm tốt được không?",
       "py": "Māma bǎ míngtiān yào qù yěcān de dōngxī dōu zhǔnbèi hǎo le. 2. Nǐ hái méi bǎ gōngkè xiě hǎo, bùnéng chūqù tīzúqiú. 3. Xué xīn de yǔyán, yàoshì nǐ bù cháng liànxí, dāngrán xué bùhǎo. 4. Zhèfèn gōngzuò bù jiǎndān, nǐ juéde tā zuòdehǎo zuò bùhǎo?"
      },
      {
       "hz": "V好：V 好了 / 沒 V 好 / V 得好 / V 不好",
       "vi": "V好: V xong rồi / chưa V xong / V được tốt / V không tốt",
       "py": "V hǎo: V hǎo le / méi V hǎo / V de hǎo / V bùhǎo"
      },
      {
       "hz": "(一)⋯⋯+V錯(+O)了\t1. 他是黃先生不是王先生,你聽錯了。2. 今天早上我坐錯車了,所以上班遲到了。3. A：我們要去看的演唱會是下個星期六不是這個星期六。 B：真的嗎?我記錯時間了嗎?",
       "vi": "(1) … + V錯 (+ O) 了: làm sai. Anh ấy là ông Hoàng chứ không phải ông Vương, bạn nghe nhầm rồi. Sáng nay tôi đi nhầm xe, nên đi làm muộn. A: Buổi hoà nhạc chúng ta định xem là thứ Bảy tuần sau chứ không phải thứ Bảy này. B: Thật à? Tôi nhớ nhầm ngày à?",
       "py": "(yī)…… + V cuò (+ O) le 1. Tā shì Huáng xiānshēng búshì Wáng xiānshēng, nǐ tīngcuò le. 2. Jīntiān zǎoshàng wǒ zuò cuòchē le, suǒyǐ shàngbān chídào le. 3. A: Wǒmen yào qù kàn de yǎnchànghuì shì xià gè xīngqíliù búshì zhège xīngqíliù. B: Zhēnde ma? Wǒ jìcuò shíjiān le ma?"
      },
      {
       "hz": "(二)…沒+V錯(+O)1. 孩子沒做錯事，你為什麼要打他？2. A：你吃了什麼？為什麼肚子疼呢？ B：醫生說我沒吃錯東西，可能是飲料不新鮮。3. A：你沒聽錯，李小姐真的明天要結婚了。 B：可是她說她沒有男朋友啊!",
       "vi": "(2) … 沒 + V錯 (+ O): không làm sai. Đứa bé không làm gì sai, sao anh lại đánh nó? A: Bạn đã ăn gì? Sao lại đau bụng? B: Bác sĩ nói tôi không ăn nhầm gì cả, có lẽ đồ uống không tươi. A: Bạn không nghe nhầm đâu, ngày mai cô Lý kết hôn thật đấy. B: Nhưng cô ấy nói cô ấy không có bạn trai mà!",
       "py": "(èr)… méi + V cuò (+ O) 1. Háizi méi zuòcuòshì, nǐ wèishénme yào dǎ tā? 2. A: Nǐ chī le shénme? Wèishénme dùziténg ne? B: Yīshēng shuō wǒ méi chī cuò dōngxī, kěnéng shì yǐnliào bù xīnxiān. 3. A: Nǐ méi tīngcuò, Lǐ xiǎojiě zhēnde míngtiān yào jiéhūn le. B: Kěshì tā shuō tā méiyǒu nánpéngyǒu a!"
      },
      {
       "hz": "太太；你怎麼站在門口，不進去呢？",
       "vi": "Vợ: Sao anh đứng ở cửa mà không vào?",
       "py": "Tàitai; nǐ zěnme zhàn zài ménkǒu, bú jìnqù ne?"
      },
      {
       "hz": "A：我們去KTV唱歌吧！",
       "vi": "A: Chúng ta đi hát karaoke đi!",
       "py": "A: Wǒmen qù KTV chànggē ba!"
      },
      {
       "hz": "B：我早上出門的時候覺得有一點兒冷，沒想到現在這麼熱。",
       "vi": "B: Sáng nay lúc ra khỏi nhà tôi thấy hơi lạnh, không ngờ bây giờ nóng thế này.",
       "py": "B: Wǒ zǎoshàng chūmén de shíhòu juéde yǒu yìdiǎn'ér lěng, méixiǎngdào xiànzài zhème rè."
      },
      {
       "hz": "我學游泳,學了一個月就學會了。2. 那個外國人還沒學會用筷子吃飯。3. 這首中文歌很容易,誰都學得會。4. 那個孩子那麼小,爸爸教得會教不會他怎麼騎腳踏車?",
       "vi": "Tôi học bơi, học một tháng là biết bơi. Người nước ngoài đó vẫn chưa học được cách ăn bằng đũa. Bài hát tiếng Trung này rất dễ, ai cũng học được. Đứa bé đó còn nhỏ như vậy, bố có dạy nó đạp xe được không?",
       "py": "Wǒ xué yóuyǒng, xué le yígèyuè jiù xuéhuì le. 2. Nàge wàiguórén hái méi xuéhuì yòng kuàizi chīfàn. 3. Zhè shǒu zhōngwén gē hěn róngyì, shéi dōu xué de huì. 4. Nàge háizi nàme xiǎo, bàba jiào de huì jiào búhuì tā zěnme qí jiǎotàchē?"
      },
      {
       "hz": "III. V 會：V會了 / 沒V會 / V得會 / V不會",
       "vi": "III. V會: V được rồi / chưa V được / V có thể được / V không được",
       "py": "III. V huì: V huì le / méi V huì / V de huì / V búhuì"
      },
      {
       "hz": "他很有錢，想買什麼就買什麼。 2. 媽媽今天做了很多包子,你想吃幾個就吃幾個。3. A：你想去哪裡跨年？ B：哪裡熱鬧就去哪裡。 4. A：我們要怎麼去合歡山？ B：怎麼去比較方便就怎麼去。",
       "vi": "Anh ấy rất giàu, muốn mua gì thì mua nấy. Hôm nay mẹ làm rất nhiều bánh bao, con muốn ăn mấy cái thì ăn bấy nhiêu. A: Bạn muốn đón năm mới ở đâu? B: Chỗ nào náo nhiệt thì đi chỗ đó. A: Chúng ta đi núi Hợp Hoan bằng cách nào? B: Đi cách nào tiện hơn thì đi cách đó.",
       "py": "Tā hěn yǒuqián, xiǎng mǎi shénme jiù mǎi shénme. 2. Māma jīntiān zuò le hěnduō bāozi, nǐ xiǎng chī jǐgè jiù chī jǐgè. 3. A: Nǐ xiǎng qù nǎlǐ kuà nián? B: Nǎlǐ rènào jiù qù nǎlǐ. 4. A: Wǒmen yào zěnme qù héhuānshān? B: Zěnme qù bǐjiào fāngbiàn jiù zěnme qù."
      },
      {
       "hz": "A：這些飲料都很好喝，你要喝哪一種？(好喝)3. A：那家商店賣很多不同顏色的燈籠，你想買哪一個？",
       "vi": "A: Những đồ uống này đều rất ngon, bạn muốn uống loại nào? (ngon) A: Cửa hàng đó bán nhiều đèn lồng màu khác nhau, bạn muốn mua cái nào?",
       "py": "A: Zhèxiē yǐnliào dōu hěn hǎohē, nǐ yào hē nǎ yìzhǒng? (hǎohē) 3. A: Nà jiā shāngdiàn mài hěnduō bùtóng yánsè de dēnglóng, nǐ xiǎng mǎi nǎ yígè?"
      },
      {
       "hz": "A：這塊雞肉要怎麼做？烤還是炸？",
       "vi": "A: Miếng thịt gà này làm thế nào? Nướng hay chiên?",
       "py": "A: Zhèkuài jīròu yào zěnme zuò? Kǎo háishì zhà?"
      },
      {
       "hz": "A：週末從台灣飛往美國的飛機一共有八班，你要搭哪(一)班？",
       "vi": "A: Cuối tuần từ Đài Loan bay sang Mỹ tổng cộng có tám chuyến, bạn đi chuyến nào?",
       "py": "A: Zhōumò cóng Táiwān fēiwǎng Měiguó de fēijī yígòng yǒu bābān, nǐ yào dā nǎ (yì) bān?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ 好 — xong xuôi, sẵn sàng",
   "giaiThich": "好 đứng sau động từ làm bổ ngữ, chỉ việc đã làm xong và sẵn sàng (準備好, 寫好). Bài cũng phân biệt 害怕 và 可怕."
  },
  {
   "title": "V. 會......的 to offer assurance with 會......的",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the speaker believes the situation after “會” is quite likely to happen. “的” in this pattern is added to show affirmation with a more softened tone. VI. 等......就......\tWhen something happens, then S... This pattern indicates when something happens, someone will perform an action. Negation words “不” and “沒” should be placed before “等”. 請用提示完成句子。Complete the dialogues with given phrases.",
     "examples": [
      {
       "hz": "李小姐的成績很好，畢業後一定會找到好工作的。",
       "vi": "Thành tích của cô Lý rất tốt, tốt nghiệp xong chắc chắn sẽ tìm được việc tốt.",
       "py": "Lǐ xiǎojiě de chéngjì hěn hǎo, bìyè hòu yídìng huì zhǎodào hǎo gōngzuò de."
      },
      {
       "hz": "醫生說，多休息、多喝水，我的感冒很快就會好的。",
       "vi": "Bác sĩ nói nghỉ ngơi nhiều, uống nhiều nước thì bệnh cảm của tôi sẽ sớm khỏi thôi.",
       "py": "Yīshēng shuō, duō xiūxí, duōhēshuǐ, wǒ de gǎnmào hěnkuài jiù huì hǎo de."
      },
      {
       "hz": "A：我很想去法國留學，可是怕父母不同意。",
       "vi": "A: Tôi rất muốn sang Pháp du học, nhưng sợ bố mẹ không đồng ý.",
       "py": "A: Wǒ hěn xiǎng qù Fǎguó liúxué, kěshì pà fùmǔ bù tóngyì."
      },
      {
       "hz": "B：只要好好地跟他們說，他們不會不同意的。",
       "vi": "B: Chỉ cần bạn nói chuyện đàng hoàng với bố mẹ, họ sẽ không phản đối đâu.",
       "py": "B: Zhǐyào hǎohǎo dì gēn tāmen shuō, tāmen búhuì bù tóngyì de."
      },
      {
       "hz": "A：週末我想去山上野餐，不知道會不會下雨?",
       "vi": "A: Cuối tuần tôi muốn lên núi dã ngoại, không biết có mưa không?",
       "py": "A: Zhōumò wǒ xiǎng qù shānshàng yěcān, bù zhīdào huì búhuì xiàyǔ?"
      },
      {
       "hz": "哥哥：我買了一瓶香水要送給女朋友，不知道她喜歡不喜歡？",
       "vi": "Anh trai: Anh mua một lọ nước hoa định tặng bạn gái, không biết cô ấy có thích không?",
       "py": "Gēge: Wǒ mǎi le yìpíng xiāngshuǐ yào sònggěi nǚpéngyǒu, bù zhīdào tā xǐhuān bù xǐhuān?"
      },
      {
       "hz": "有很多人沒等舞會結束，就先走了。",
       "vi": "Có nhiều người chưa đợi buổi tiệc kết thúc đã về trước.",
       "py": "Yǒu hěnduō rén méi děng wǔhuì jiéshù, jiù xiān zǒu le."
      },
      {
       "hz": "等這個學期結束，我就不要住在宿舍裡了。",
       "vi": "Đợi học kỳ này kết thúc, tôi sẽ không ở ký túc xá nữa.",
       "py": "Děng zhège xuéqíjiéshù, wǒ jiù búyào zhù zài sùshè lǐ le."
      },
      {
       "hz": "等夏天來了,我們就可以去海邊曬太陽、游泳了。",
       "vi": "Đợi mùa hè đến, chúng ta có thể đi biển tắm nắng, bơi lội.",
       "py": "Děng xiàtiān lái le, wǒmen jiù kěyǐ qù hǎibiān shàitàiyáng, yóuyǒng le."
      },
      {
       "hz": "A：請問，學校什麼時候給我們獎學金呢？(考完試)",
       "vi": "A: Cho hỏi, khi nào trường phát học bổng cho chúng em? (thi xong)",
       "py": "A: Qǐngwèn, xuéxiào shénme shíhòu gěi wǒmen jiǎngxuéjīn ne? (kǎowánshì)"
      },
      {
       "hz": "台灣的KTV有什麼特色？",
       "vi": "Karaoke ở Đài Loan có đặc điểm gì?",
       "py": "Táiwān de KTV yǒu shénme tèsè?"
      },
      {
       "hz": "要是想省錢，什麼時候去KTV唱歌最便宜？",
       "vi": "Nếu muốn tiết kiệm, đi hát karaoke lúc nào rẻ nhất?",
       "py": "Yàoshì xiǎng shěngqián, shénme shíhòu qù KTV chànggē zuì piányi?"
      },
      {
       "hz": "為什麼有人生氣或是傷心的時候要去KTV唱歌？",
       "vi": "Tại sao có người lúc tức giận hoặc buồn lại đi hát karaoke?",
       "py": "Wèishénme yǒurén shēngqì huòshì shāngxīn de shíhòu yào qù KTV chànggē?"
      },
      {
       "hz": "你心情不好的時候，怎麼辦？",
       "vi": "Khi tâm trạng không tốt, bạn làm gì?",
       "py": "Nǐ xīnqíng bùhǎo de shíhòu, zěnmebàn?"
      },
      {
       "hz": "在你的國家，去KTV唱歌是很流行的活動嗎？",
       "vi": "Ở nước bạn, đi hát karaoke có phải là hoạt động rất phổ biến không?",
       "py": "Zài nǐ de guójiā, qù KTV chànggē shì hěn liúxíng de huódòng ma?"
      },
      {
       "hz": "你喜歡去KTV唱歌嗎？為什麼？",
       "vi": "Bạn có thích đi hát karaoke không? Tại sao?",
       "py": "Nǐ xǐhuān qù KTV chànggē ma? Wèishénme?"
      },
      {
       "hz": "除了去KTV唱歌，還可以在KTV辦什麼活動？",
       "vi": "Ngoài hát, còn có thể tổ chức hoạt động gì ở quán karaoke?",
       "py": "Chúle qù KTV chànggē, hái kěyǐ zài KTV bàn shénme huódòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會……的 — chắc chắn sẽ…",
   "giaiThich": "Người nói tin việc sau 會 rất có khả năng xảy ra; 的 ở cuối làm giọng điệu mềm và khẳng định hơn. Kèm mẫu 等……就…… (đợi… thì…)."
  },
  {
   "title": "I. 才 merely, only",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the number is fewer than the speaker's expectation, different from the usage of \"才\" in Lesson Two. Both \"才\" and \"只\" imply a small number. However, \"才\" emphasizes the small number is the speaker's subjective opinion. Also, \"才\" can be followed directly with number words; \"只\" is placed before the verb and cannot be followed with number words. e.g. \"這件衣服只一百塊錢\"",
     "examples": [
      {
       "hz": "今天咖啡館裡才三個人，客人真少。2. 我今天中午才吃了一個麵包，現在好餓。3. A：那個孩子籃球打得很好，他學了很久吧？ B：老師說他很聰明，才教了半個月就教會(他)了。",
       "vi": "Hôm nay quán cà phê chỉ có ba người, khách ít thật. Trưa nay tôi chỉ ăn một cái bánh mì, bây giờ đói quá. A: Đứa bé đó chơi bóng rổ giỏi lắm, chắc học lâu rồi nhỉ? B: Thầy giáo nói cậu bé rất thông minh, mới dạy nửa tháng đã biết chơi rồi.",
       "py": "Jīntiān kāfēiguǎn lǐ cái sāngè rén, kèrén zhēn shǎo. 2. Wǒ jīntiān zhōngwǔ cái chī le yígè miànbāo, xiànzài hǎo è. 3. A: Nàge háizi lánqiú dǎ de hěn hǎo, tā xué le hěn jiǔ ba? B: Lǎoshī shuō tā hěn cōngmíng, cái jiào le bàngè yuè jiù jiàohuì (tā) le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — chỉ mới, ít ỏi",
   "giaiThich": "Ở đây 才 nói số lượng ÍT hơn người nói mong đợi (khác nghĩa \"mãi mới\" ở bài 2). 才 và 只 đều chỉ số ít, nhưng 才 nhấn mạnh cảm giác ít."
  },
  {
   "title": "II. 讓 to make someone feel...",
   "points": [
    {
     "label": null,
     "formula": "In the pattern \"A讓B+Vs\", A is the cause that makes B have certain feelings.",
     "examples": [
      {
       "hz": "朋友送了我一個生日蛋糕，讓我很開心。 2. 爸爸開了五個小時的車，讓他累的不得了。 3. 昨天吃了不乾淨的東西，讓我的肚子不太舒服。",
       "vi": "Bạn tặng tôi một chiếc bánh sinh nhật, khiến tôi rất vui. Bố lái xe năm tiếng, khiến bố mệt vô cùng. Hôm qua ăn phải đồ không sạch, khiến bụng tôi không được thoải mái lắm.",
       "py": "Péngyǒu sòng le wǒ yígè shēngrìdàngāo, ràng wǒ hěn kāixīn. 2. Bàba kāi le wǔgè xiǎoshí de chē, ràng tā lèi de bùdéle. 3. Zuótiān chī le bù gānjìng de dōngxī, ràng wǒ de dùzi bú tài shūfú."
      },
      {
       "hz": "用「讓」改寫下面句子。Viết lại câu bằng 讓. 1. 我已經兩個星期沒倒垃圾了，所以媽媽很生氣。",
       "vi": "Dùng 讓 viết lại các câu dưới đây. 1. Đã hai tuần tôi không đổ rác, nên mẹ rất tức giận.",
       "py": "Yòng “ràng” gǎixiě xiàmiàn jùzi. Vi ế t l ạ i c â u b ằ ng ràng. 1. Wǒ yǐjīng liǎnggè xīngqí méi dào lèsè le, suǒyǐ māma hěn shēngqì."
      },
      {
       "hz": "我一想到明天要去旅行，就很興奮，所以睡不著。",
       "vi": "Cứ nghĩ đến ngày mai được đi du lịch là tôi háo hức, nên không ngủ được.",
       "py": "Wǒ yì xiǎngdào míngtiān yào qù lǚxíng, jiù hěn xīngfèn, suǒyǐ shuì bù zhe."
      },
      {
       "hz": "我不喜歡坐飛機，一聽到坐飛機就緊張得不得了。",
       "vi": "Tôi không thích đi máy bay, cứ nghe đến đi máy bay là căng thẳng vô cùng.",
       "py": "Wǒ bù xǐhuān zuòfēijī, yì tīngdào zuòfēijī jiù jǐnzhāng de bùdéle."
      },
      {
       "hz": "你會唱中文歌嗎？",
       "vi": "Bạn có biết hát bài hát tiếng Trung không?",
       "py": "Nǐ huì chàng zhōngwén gē ma?"
      },
      {
       "hz": "請找一首中文歌曲，說說看那首歌的歌詞是什麼意思。",
       "vi": "Hãy tìm một bài hát tiếng Trung, rồi nói xem lời bài hát có nghĩa là gì.",
       "py": "Qǐng zhǎo yìshǒu zhōngwéngēqǔ, shuōshuōkàn nàshǒugē de gēcí shì shénme yìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — làm cho ai đó cảm thấy…",
   "giaiThich": "Mẫu \"A 讓 B + tính từ\": A là nguyên nhân khiến B có cảm giác nào đó."
  },
  {
   "title": "2. 請比較台灣的KTV和你的國家的KTV",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請使用下面的語法有沒有吃到飽",
       "vi": "Hãy dùng ngữ pháp dưới đây… có ăn thoả thích (buffet) không",
       "py": "Qǐng shǐyòng xiàmiàn de yǔfǎ yǒuméiyǒu chī dào bǎo"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: so sánh KTV",
   "giaiThich": "Phần luyện nói: so sánh KTV ở Đài Loan với ở nước bạn."
  }
 ],
 "td2-6.3": [
  {
   "title": "2. 我覺得「害怕」跟「可怕」的意思",
   "points": [
    {
     "label": null,
     "formula": "(Vp) make a mistake; misunderstand all set and ready with V complement 好 “好” is placed after the verb and acts as a verb complement. When used together with a verb, “好” serves as a verb complement denoting the action is finished with an idea result. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do something wrong “錯” is placed after the verb, serving as the verb complement. V錯 indicates that the subject did something wrong. The result of the action is a mistake. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do somethingwrong When used together with a verb, “會” serves as a resultative complement. The verbs used in this pattern include “學(learn)” and “教(teach)”, which indicate someone acquires certain techniques through learning or teaching. There are two patterns, including (1) V會了/沒V會 and (2) V得會/V不會。 IV. ...QW...就...QW...\twhatever; whoever; wherever... The two question words, which show a tone of randomness, represent the same thing and indicate there is no other special requirement or limitation as long as the requirement going before “就” is fulfilled. If the two question words are “誰(who)”, the second one can be placed before “就”, e.g. “這個巧克力，誰想吃誰就吃。\"",
     "examples": [
      {
       "hz": "林小姐弄錯了約會的時間，所以遲到了半個小時。",
       "vi": "Cô Lâm nhầm giờ hẹn, nên đến muộn nửa tiếng.",
       "py": "Lín xiǎojiě nòngcuò le yuēhuì de shíjiān, suǒyǐ chídào le bàngè xiǎoshí."
      },
      {
       "hz": "差不多，所以常弄錯。",
       "vi": "…gần giống nhau, nên hay bị nhầm.",
       "py": "Chàbuduō, suǒyǐ cháng nòngcuò."
      },
      {
       "hz": "媽媽把明天要去野餐的東西都準備好了。2. 你還沒把功課寫好，不能出去踢足球。3. 學新的語言,要是你不常練習，當然學不好。4. 這份工作不簡單，你覺得他做得好做不好?",
       "vi": "Mẹ đã chuẩn bị xong hết đồ cho buổi dã ngoại ngày mai. Con chưa làm xong bài tập, không được ra ngoài đá bóng. Học ngôn ngữ mới mà không thường xuyên luyện tập thì đương nhiên học không tốt được. Công việc này không đơn giản, bạn nghĩ anh ấy có làm tốt được không?",
       "py": "Māma bǎ míngtiān yào qù yěcān de dōngxī dōu zhǔnbèi hǎo le. 2. Nǐ hái méi bǎ gōngkè xiě hǎo, bùnéng chūqù tīzúqiú. 3. Xué xīn de yǔyán, yàoshì nǐ bù cháng liànxí, dāngrán xué bùhǎo. 4. Zhèfèn gōngzuò bù jiǎndān, nǐ juéde tā zuòdehǎo zuò bùhǎo?"
      },
      {
       "hz": "V好：V 好了 / 沒 V 好 / V 得好 / V 不好",
       "vi": "V好: V xong rồi / chưa V xong / V được tốt / V không tốt",
       "py": "V hǎo: V hǎo le / méi V hǎo / V de hǎo / V bùhǎo"
      },
      {
       "hz": "(一)⋯⋯+V錯(+O)了\t1. 他是黃先生不是王先生,你聽錯了。2. 今天早上我坐錯車了,所以上班遲到了。3. A：我們要去看的演唱會是下個星期六不是這個星期六。 B：真的嗎?我記錯時間了嗎?",
       "vi": "(1) … + V錯 (+ O) 了: làm sai. Anh ấy là ông Hoàng chứ không phải ông Vương, bạn nghe nhầm rồi. Sáng nay tôi đi nhầm xe, nên đi làm muộn. A: Buổi hoà nhạc chúng ta định xem là thứ Bảy tuần sau chứ không phải thứ Bảy này. B: Thật à? Tôi nhớ nhầm ngày à?",
       "py": "(yī)…… + V cuò (+ O) le 1. Tā shì Huáng xiānshēng búshì Wáng xiānshēng, nǐ tīngcuò le. 2. Jīntiān zǎoshàng wǒ zuò cuòchē le, suǒyǐ shàngbān chídào le. 3. A: Wǒmen yào qù kàn de yǎnchànghuì shì xià gè xīngqíliù búshì zhège xīngqíliù. B: Zhēnde ma? Wǒ jìcuò shíjiān le ma?"
      },
      {
       "hz": "(二)…沒+V錯(+O)1. 孩子沒做錯事，你為什麼要打他？2. A：你吃了什麼？為什麼肚子疼呢？ B：醫生說我沒吃錯東西，可能是飲料不新鮮。3. A：你沒聽錯，李小姐真的明天要結婚了。 B：可是她說她沒有男朋友啊!",
       "vi": "(2) … 沒 + V錯 (+ O): không làm sai. Đứa bé không làm gì sai, sao anh lại đánh nó? A: Bạn đã ăn gì? Sao lại đau bụng? B: Bác sĩ nói tôi không ăn nhầm gì cả, có lẽ đồ uống không tươi. A: Bạn không nghe nhầm đâu, ngày mai cô Lý kết hôn thật đấy. B: Nhưng cô ấy nói cô ấy không có bạn trai mà!",
       "py": "(èr)… méi + V cuò (+ O) 1. Háizi méi zuòcuòshì, nǐ wèishénme yào dǎ tā? 2. A: Nǐ chī le shénme? Wèishénme dùziténg ne? B: Yīshēng shuō wǒ méi chī cuò dōngxī, kěnéng shì yǐnliào bù xīnxiān. 3. A: Nǐ méi tīngcuò, Lǐ xiǎojiě zhēnde míngtiān yào jiéhūn le. B: Kěshì tā shuō tā méiyǒu nánpéngyǒu a!"
      },
      {
       "hz": "太太；你怎麼站在門口，不進去呢？",
       "vi": "Vợ: Sao anh đứng ở cửa mà không vào?",
       "py": "Tàitai; nǐ zěnme zhàn zài ménkǒu, bú jìnqù ne?"
      },
      {
       "hz": "A：我們去KTV唱歌吧！",
       "vi": "A: Chúng ta đi hát karaoke đi!",
       "py": "A: Wǒmen qù KTV chànggē ba!"
      },
      {
       "hz": "B：我早上出門的時候覺得有一點兒冷，沒想到現在這麼熱。",
       "vi": "B: Sáng nay lúc ra khỏi nhà tôi thấy hơi lạnh, không ngờ bây giờ nóng thế này.",
       "py": "B: Wǒ zǎoshàng chūmén de shíhòu juéde yǒu yìdiǎn'ér lěng, méixiǎngdào xiànzài zhème rè."
      },
      {
       "hz": "我學游泳,學了一個月就學會了。2. 那個外國人還沒學會用筷子吃飯。3. 這首中文歌很容易,誰都學得會。4. 那個孩子那麼小,爸爸教得會教不會他怎麼騎腳踏車?",
       "vi": "Tôi học bơi, học một tháng là biết bơi. Người nước ngoài đó vẫn chưa học được cách ăn bằng đũa. Bài hát tiếng Trung này rất dễ, ai cũng học được. Đứa bé đó còn nhỏ như vậy, bố có dạy nó đạp xe được không?",
       "py": "Wǒ xué yóuyǒng, xué le yígèyuè jiù xuéhuì le. 2. Nàge wàiguórén hái méi xuéhuì yòng kuàizi chīfàn. 3. Zhè shǒu zhōngwén gē hěn róngyì, shéi dōu xué de huì. 4. Nàge háizi nàme xiǎo, bàba jiào de huì jiào búhuì tā zěnme qí jiǎotàchē?"
      },
      {
       "hz": "III. V 會：V會了 / 沒V會 / V得會 / V不會",
       "vi": "III. V會: V được rồi / chưa V được / V có thể được / V không được",
       "py": "III. V huì: V huì le / méi V huì / V de huì / V búhuì"
      },
      {
       "hz": "他很有錢，想買什麼就買什麼。 2. 媽媽今天做了很多包子,你想吃幾個就吃幾個。3. A：你想去哪裡跨年？ B：哪裡熱鬧就去哪裡。 4. A：我們要怎麼去合歡山？ B：怎麼去比較方便就怎麼去。",
       "vi": "Anh ấy rất giàu, muốn mua gì thì mua nấy. Hôm nay mẹ làm rất nhiều bánh bao, con muốn ăn mấy cái thì ăn bấy nhiêu. A: Bạn muốn đón năm mới ở đâu? B: Chỗ nào náo nhiệt thì đi chỗ đó. A: Chúng ta đi núi Hợp Hoan bằng cách nào? B: Đi cách nào tiện hơn thì đi cách đó.",
       "py": "Tā hěn yǒuqián, xiǎng mǎi shénme jiù mǎi shénme. 2. Māma jīntiān zuò le hěnduō bāozi, nǐ xiǎng chī jǐgè jiù chī jǐgè. 3. A: Nǐ xiǎng qù nǎlǐ kuà nián? B: Nǎlǐ rènào jiù qù nǎlǐ. 4. A: Wǒmen yào zěnme qù héhuānshān? B: Zěnme qù bǐjiào fāngbiàn jiù zěnme qù."
      },
      {
       "hz": "A：這些飲料都很好喝，你要喝哪一種？(好喝)3. A：那家商店賣很多不同顏色的燈籠，你想買哪一個？",
       "vi": "A: Những đồ uống này đều rất ngon, bạn muốn uống loại nào? (ngon) A: Cửa hàng đó bán nhiều đèn lồng màu khác nhau, bạn muốn mua cái nào?",
       "py": "A: Zhèxiē yǐnliào dōu hěn hǎohē, nǐ yào hē nǎ yìzhǒng? (hǎohē) 3. A: Nà jiā shāngdiàn mài hěnduō bùtóng yánsè de dēnglóng, nǐ xiǎng mǎi nǎ yígè?"
      },
      {
       "hz": "A：這塊雞肉要怎麼做？烤還是炸？",
       "vi": "A: Miếng thịt gà này làm thế nào? Nướng hay chiên?",
       "py": "A: Zhèkuài jīròu yào zěnme zuò? Kǎo háishì zhà?"
      },
      {
       "hz": "A：週末從台灣飛往美國的飛機一共有八班，你要搭哪(一)班？",
       "vi": "A: Cuối tuần từ Đài Loan bay sang Mỹ tổng cộng có tám chuyến, bạn đi chuyến nào?",
       "py": "A: Zhōumò cóng Táiwān fēiwǎng Měiguó de fēijī yígòng yǒu bābān, nǐ yào dā nǎ (yì) bān?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ 好 — xong xuôi, sẵn sàng",
   "giaiThich": "好 đứng sau động từ làm bổ ngữ, chỉ việc đã làm xong và sẵn sàng (準備好, 寫好). Bài cũng phân biệt 害怕 và 可怕."
  },
  {
   "title": "V. 會......的 to offer assurance with 會......的",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the speaker believes the situation after “會” is quite likely to happen. “的” in this pattern is added to show affirmation with a more softened tone. VI. 等......就......\tWhen something happens, then S... This pattern indicates when something happens, someone will perform an action. Negation words “不” and “沒” should be placed before “等”. 請用提示完成句子。Complete the dialogues with given phrases.",
     "examples": [
      {
       "hz": "李小姐的成績很好，畢業後一定會找到好工作的。",
       "vi": "Thành tích của cô Lý rất tốt, tốt nghiệp xong chắc chắn sẽ tìm được việc tốt.",
       "py": "Lǐ xiǎojiě de chéngjì hěn hǎo, bìyè hòu yídìng huì zhǎodào hǎo gōngzuò de."
      },
      {
       "hz": "醫生說，多休息、多喝水，我的感冒很快就會好的。",
       "vi": "Bác sĩ nói nghỉ ngơi nhiều, uống nhiều nước thì bệnh cảm của tôi sẽ sớm khỏi thôi.",
       "py": "Yīshēng shuō, duō xiūxí, duōhēshuǐ, wǒ de gǎnmào hěnkuài jiù huì hǎo de."
      },
      {
       "hz": "A：我很想去法國留學，可是怕父母不同意。",
       "vi": "A: Tôi rất muốn sang Pháp du học, nhưng sợ bố mẹ không đồng ý.",
       "py": "A: Wǒ hěn xiǎng qù Fǎguó liúxué, kěshì pà fùmǔ bù tóngyì."
      },
      {
       "hz": "B：只要好好地跟他們說，他們不會不同意的。",
       "vi": "B: Chỉ cần bạn nói chuyện đàng hoàng với bố mẹ, họ sẽ không phản đối đâu.",
       "py": "B: Zhǐyào hǎohǎo dì gēn tāmen shuō, tāmen búhuì bù tóngyì de."
      },
      {
       "hz": "A：週末我想去山上野餐，不知道會不會下雨?",
       "vi": "A: Cuối tuần tôi muốn lên núi dã ngoại, không biết có mưa không?",
       "py": "A: Zhōumò wǒ xiǎng qù shānshàng yěcān, bù zhīdào huì búhuì xiàyǔ?"
      },
      {
       "hz": "哥哥：我買了一瓶香水要送給女朋友，不知道她喜歡不喜歡？",
       "vi": "Anh trai: Anh mua một lọ nước hoa định tặng bạn gái, không biết cô ấy có thích không?",
       "py": "Gēge: Wǒ mǎi le yìpíng xiāngshuǐ yào sònggěi nǚpéngyǒu, bù zhīdào tā xǐhuān bù xǐhuān?"
      },
      {
       "hz": "有很多人沒等舞會結束，就先走了。",
       "vi": "Có nhiều người chưa đợi buổi tiệc kết thúc đã về trước.",
       "py": "Yǒu hěnduō rén méi děng wǔhuì jiéshù, jiù xiān zǒu le."
      },
      {
       "hz": "等這個學期結束，我就不要住在宿舍裡了。",
       "vi": "Đợi học kỳ này kết thúc, tôi sẽ không ở ký túc xá nữa.",
       "py": "Děng zhège xuéqíjiéshù, wǒ jiù búyào zhù zài sùshè lǐ le."
      },
      {
       "hz": "等夏天來了,我們就可以去海邊曬太陽、游泳了。",
       "vi": "Đợi mùa hè đến, chúng ta có thể đi biển tắm nắng, bơi lội.",
       "py": "Děng xiàtiān lái le, wǒmen jiù kěyǐ qù hǎibiān shàitàiyáng, yóuyǒng le."
      },
      {
       "hz": "A：請問，學校什麼時候給我們獎學金呢？(考完試)",
       "vi": "A: Cho hỏi, khi nào trường phát học bổng cho chúng em? (thi xong)",
       "py": "A: Qǐngwèn, xuéxiào shénme shíhòu gěi wǒmen jiǎngxuéjīn ne? (kǎowánshì)"
      },
      {
       "hz": "台灣的KTV有什麼特色？",
       "vi": "Karaoke ở Đài Loan có đặc điểm gì?",
       "py": "Táiwān de KTV yǒu shénme tèsè?"
      },
      {
       "hz": "要是想省錢，什麼時候去KTV唱歌最便宜？",
       "vi": "Nếu muốn tiết kiệm, đi hát karaoke lúc nào rẻ nhất?",
       "py": "Yàoshì xiǎng shěngqián, shénme shíhòu qù KTV chànggē zuì piányi?"
      },
      {
       "hz": "為什麼有人生氣或是傷心的時候要去KTV唱歌？",
       "vi": "Tại sao có người lúc tức giận hoặc buồn lại đi hát karaoke?",
       "py": "Wèishénme yǒurén shēngqì huòshì shāngxīn de shíhòu yào qù KTV chànggē?"
      },
      {
       "hz": "你心情不好的時候，怎麼辦？",
       "vi": "Khi tâm trạng không tốt, bạn làm gì?",
       "py": "Nǐ xīnqíng bùhǎo de shíhòu, zěnmebàn?"
      },
      {
       "hz": "在你的國家，去KTV唱歌是很流行的活動嗎？",
       "vi": "Ở nước bạn, đi hát karaoke có phải là hoạt động rất phổ biến không?",
       "py": "Zài nǐ de guójiā, qù KTV chànggē shì hěn liúxíng de huódòng ma?"
      },
      {
       "hz": "你喜歡去KTV唱歌嗎？為什麼？",
       "vi": "Bạn có thích đi hát karaoke không? Tại sao?",
       "py": "Nǐ xǐhuān qù KTV chànggē ma? Wèishénme?"
      },
      {
       "hz": "除了去KTV唱歌，還可以在KTV辦什麼活動？",
       "vi": "Ngoài hát, còn có thể tổ chức hoạt động gì ở quán karaoke?",
       "py": "Chúle qù KTV chànggē, hái kěyǐ zài KTV bàn shénme huódòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會……的 — chắc chắn sẽ…",
   "giaiThich": "Người nói tin việc sau 會 rất có khả năng xảy ra; 的 ở cuối làm giọng điệu mềm và khẳng định hơn. Kèm mẫu 等……就…… (đợi… thì…)."
  },
  {
   "title": "I. 才 merely, only",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the number is fewer than the speaker's expectation, different from the usage of \"才\" in Lesson Two. Both \"才\" and \"只\" imply a small number. However, \"才\" emphasizes the small number is the speaker's subjective opinion. Also, \"才\" can be followed directly with number words; \"只\" is placed before the verb and cannot be followed with number words. e.g. \"這件衣服只一百塊錢\"",
     "examples": [
      {
       "hz": "今天咖啡館裡才三個人，客人真少。2. 我今天中午才吃了一個麵包，現在好餓。3. A：那個孩子籃球打得很好，他學了很久吧？ B：老師說他很聰明，才教了半個月就教會(他)了。",
       "vi": "Hôm nay quán cà phê chỉ có ba người, khách ít thật. Trưa nay tôi chỉ ăn một cái bánh mì, bây giờ đói quá. A: Đứa bé đó chơi bóng rổ giỏi lắm, chắc học lâu rồi nhỉ? B: Thầy giáo nói cậu bé rất thông minh, mới dạy nửa tháng đã biết chơi rồi.",
       "py": "Jīntiān kāfēiguǎn lǐ cái sāngè rén, kèrén zhēn shǎo. 2. Wǒ jīntiān zhōngwǔ cái chī le yígè miànbāo, xiànzài hǎo è. 3. A: Nàge háizi lánqiú dǎ de hěn hǎo, tā xué le hěn jiǔ ba? B: Lǎoshī shuō tā hěn cōngmíng, cái jiào le bàngè yuè jiù jiàohuì (tā) le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — chỉ mới, ít ỏi",
   "giaiThich": "Ở đây 才 nói số lượng ÍT hơn người nói mong đợi (khác nghĩa \"mãi mới\" ở bài 2). 才 và 只 đều chỉ số ít, nhưng 才 nhấn mạnh cảm giác ít."
  },
  {
   "title": "II. 讓 to make someone feel...",
   "points": [
    {
     "label": null,
     "formula": "In the pattern \"A讓B+Vs\", A is the cause that makes B have certain feelings.",
     "examples": [
      {
       "hz": "朋友送了我一個生日蛋糕，讓我很開心。 2. 爸爸開了五個小時的車，讓他累的不得了。 3. 昨天吃了不乾淨的東西，讓我的肚子不太舒服。",
       "vi": "Bạn tặng tôi một chiếc bánh sinh nhật, khiến tôi rất vui. Bố lái xe năm tiếng, khiến bố mệt vô cùng. Hôm qua ăn phải đồ không sạch, khiến bụng tôi không được thoải mái lắm.",
       "py": "Péngyǒu sòng le wǒ yígè shēngrìdàngāo, ràng wǒ hěn kāixīn. 2. Bàba kāi le wǔgè xiǎoshí de chē, ràng tā lèi de bùdéle. 3. Zuótiān chī le bù gānjìng de dōngxī, ràng wǒ de dùzi bú tài shūfú."
      },
      {
       "hz": "用「讓」改寫下面句子。Viết lại câu bằng 讓. 1. 我已經兩個星期沒倒垃圾了，所以媽媽很生氣。",
       "vi": "Dùng 讓 viết lại các câu dưới đây. 1. Đã hai tuần tôi không đổ rác, nên mẹ rất tức giận.",
       "py": "Yòng “ràng” gǎixiě xiàmiàn jùzi. Vi ế t l ạ i c â u b ằ ng ràng. 1. Wǒ yǐjīng liǎnggè xīngqí méi dào lèsè le, suǒyǐ māma hěn shēngqì."
      },
      {
       "hz": "我一想到明天要去旅行，就很興奮，所以睡不著。",
       "vi": "Cứ nghĩ đến ngày mai được đi du lịch là tôi háo hức, nên không ngủ được.",
       "py": "Wǒ yì xiǎngdào míngtiān yào qù lǚxíng, jiù hěn xīngfèn, suǒyǐ shuì bù zhe."
      },
      {
       "hz": "我不喜歡坐飛機，一聽到坐飛機就緊張得不得了。",
       "vi": "Tôi không thích đi máy bay, cứ nghe đến đi máy bay là căng thẳng vô cùng.",
       "py": "Wǒ bù xǐhuān zuòfēijī, yì tīngdào zuòfēijī jiù jǐnzhāng de bùdéle."
      },
      {
       "hz": "你會唱中文歌嗎？",
       "vi": "Bạn có biết hát bài hát tiếng Trung không?",
       "py": "Nǐ huì chàng zhōngwén gē ma?"
      },
      {
       "hz": "請找一首中文歌曲，說說看那首歌的歌詞是什麼意思。",
       "vi": "Hãy tìm một bài hát tiếng Trung, rồi nói xem lời bài hát có nghĩa là gì.",
       "py": "Qǐng zhǎo yìshǒu zhōngwéngēqǔ, shuōshuōkàn nàshǒugē de gēcí shì shénme yìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — làm cho ai đó cảm thấy…",
   "giaiThich": "Mẫu \"A 讓 B + tính từ\": A là nguyên nhân khiến B có cảm giác nào đó."
  },
  {
   "title": "2. 請比較台灣的KTV和你的國家的KTV",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請使用下面的語法有沒有吃到飽",
       "vi": "Hãy dùng ngữ pháp dưới đây… có ăn thoả thích (buffet) không",
       "py": "Qǐng shǐyòng xiàmiàn de yǔfǎ yǒuméiyǒu chī dào bǎo"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: so sánh KTV",
   "giaiThich": "Phần luyện nói: so sánh KTV ở Đài Loan với ở nước bạn."
  }
 ],
 "td2-6.4": [
  {
   "title": "2. 我覺得「害怕」跟「可怕」的意思",
   "points": [
    {
     "label": null,
     "formula": "(Vp) make a mistake; misunderstand all set and ready with V complement 好 “好” is placed after the verb and acts as a verb complement. When used together with a verb, “好” serves as a verb complement denoting the action is finished with an idea result. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do something wrong “錯” is placed after the verb, serving as the verb complement. V錯 indicates that the subject did something wrong. The result of the action is a mistake. resultative complement 錯 for doing something wrong： V 錯了 did something wrong / 沒 V 錯 didn’t do somethingwrong When used together with a verb, “會” serves as a resultative complement. The verbs used in this pattern include “學(learn)” and “教(teach)”, which indicate someone acquires certain techniques through learning or teaching. There are two patterns, including (1) V會了/沒V會 and (2) V得會/V不會。 IV. ...QW...就...QW...\twhatever; whoever; wherever... The two question words, which show a tone of randomness, represent the same thing and indicate there is no other special requirement or limitation as long as the requirement going before “就” is fulfilled. If the two question words are “誰(who)”, the second one can be placed before “就”, e.g. “這個巧克力，誰想吃誰就吃。\"",
     "examples": [
      {
       "hz": "林小姐弄錯了約會的時間，所以遲到了半個小時。",
       "vi": "Cô Lâm nhầm giờ hẹn, nên đến muộn nửa tiếng.",
       "py": "Lín xiǎojiě nòngcuò le yuēhuì de shíjiān, suǒyǐ chídào le bàngè xiǎoshí."
      },
      {
       "hz": "差不多，所以常弄錯。",
       "vi": "…gần giống nhau, nên hay bị nhầm.",
       "py": "Chàbuduō, suǒyǐ cháng nòngcuò."
      },
      {
       "hz": "媽媽把明天要去野餐的東西都準備好了。2. 你還沒把功課寫好，不能出去踢足球。3. 學新的語言,要是你不常練習，當然學不好。4. 這份工作不簡單，你覺得他做得好做不好?",
       "vi": "Mẹ đã chuẩn bị xong hết đồ cho buổi dã ngoại ngày mai. Con chưa làm xong bài tập, không được ra ngoài đá bóng. Học ngôn ngữ mới mà không thường xuyên luyện tập thì đương nhiên học không tốt được. Công việc này không đơn giản, bạn nghĩ anh ấy có làm tốt được không?",
       "py": "Māma bǎ míngtiān yào qù yěcān de dōngxī dōu zhǔnbèi hǎo le. 2. Nǐ hái méi bǎ gōngkè xiě hǎo, bùnéng chūqù tīzúqiú. 3. Xué xīn de yǔyán, yàoshì nǐ bù cháng liànxí, dāngrán xué bùhǎo. 4. Zhèfèn gōngzuò bù jiǎndān, nǐ juéde tā zuòdehǎo zuò bùhǎo?"
      },
      {
       "hz": "V好：V 好了 / 沒 V 好 / V 得好 / V 不好",
       "vi": "V好: V xong rồi / chưa V xong / V được tốt / V không tốt",
       "py": "V hǎo: V hǎo le / méi V hǎo / V de hǎo / V bùhǎo"
      },
      {
       "hz": "(一)⋯⋯+V錯(+O)了\t1. 他是黃先生不是王先生,你聽錯了。2. 今天早上我坐錯車了,所以上班遲到了。3. A：我們要去看的演唱會是下個星期六不是這個星期六。 B：真的嗎?我記錯時間了嗎?",
       "vi": "(1) … + V錯 (+ O) 了: làm sai. Anh ấy là ông Hoàng chứ không phải ông Vương, bạn nghe nhầm rồi. Sáng nay tôi đi nhầm xe, nên đi làm muộn. A: Buổi hoà nhạc chúng ta định xem là thứ Bảy tuần sau chứ không phải thứ Bảy này. B: Thật à? Tôi nhớ nhầm ngày à?",
       "py": "(yī)…… + V cuò (+ O) le 1. Tā shì Huáng xiānshēng búshì Wáng xiānshēng, nǐ tīngcuò le. 2. Jīntiān zǎoshàng wǒ zuò cuòchē le, suǒyǐ shàngbān chídào le. 3. A: Wǒmen yào qù kàn de yǎnchànghuì shì xià gè xīngqíliù búshì zhège xīngqíliù. B: Zhēnde ma? Wǒ jìcuò shíjiān le ma?"
      },
      {
       "hz": "(二)…沒+V錯(+O)1. 孩子沒做錯事，你為什麼要打他？2. A：你吃了什麼？為什麼肚子疼呢？ B：醫生說我沒吃錯東西，可能是飲料不新鮮。3. A：你沒聽錯，李小姐真的明天要結婚了。 B：可是她說她沒有男朋友啊!",
       "vi": "(2) … 沒 + V錯 (+ O): không làm sai. Đứa bé không làm gì sai, sao anh lại đánh nó? A: Bạn đã ăn gì? Sao lại đau bụng? B: Bác sĩ nói tôi không ăn nhầm gì cả, có lẽ đồ uống không tươi. A: Bạn không nghe nhầm đâu, ngày mai cô Lý kết hôn thật đấy. B: Nhưng cô ấy nói cô ấy không có bạn trai mà!",
       "py": "(èr)… méi + V cuò (+ O) 1. Háizi méi zuòcuòshì, nǐ wèishénme yào dǎ tā? 2. A: Nǐ chī le shénme? Wèishénme dùziténg ne? B: Yīshēng shuō wǒ méi chī cuò dōngxī, kěnéng shì yǐnliào bù xīnxiān. 3. A: Nǐ méi tīngcuò, Lǐ xiǎojiě zhēnde míngtiān yào jiéhūn le. B: Kěshì tā shuō tā méiyǒu nánpéngyǒu a!"
      },
      {
       "hz": "太太；你怎麼站在門口，不進去呢？",
       "vi": "Vợ: Sao anh đứng ở cửa mà không vào?",
       "py": "Tàitai; nǐ zěnme zhàn zài ménkǒu, bú jìnqù ne?"
      },
      {
       "hz": "A：我們去KTV唱歌吧！",
       "vi": "A: Chúng ta đi hát karaoke đi!",
       "py": "A: Wǒmen qù KTV chànggē ba!"
      },
      {
       "hz": "B：我早上出門的時候覺得有一點兒冷，沒想到現在這麼熱。",
       "vi": "B: Sáng nay lúc ra khỏi nhà tôi thấy hơi lạnh, không ngờ bây giờ nóng thế này.",
       "py": "B: Wǒ zǎoshàng chūmén de shíhòu juéde yǒu yìdiǎn'ér lěng, méixiǎngdào xiànzài zhème rè."
      },
      {
       "hz": "我學游泳,學了一個月就學會了。2. 那個外國人還沒學會用筷子吃飯。3. 這首中文歌很容易,誰都學得會。4. 那個孩子那麼小,爸爸教得會教不會他怎麼騎腳踏車?",
       "vi": "Tôi học bơi, học một tháng là biết bơi. Người nước ngoài đó vẫn chưa học được cách ăn bằng đũa. Bài hát tiếng Trung này rất dễ, ai cũng học được. Đứa bé đó còn nhỏ như vậy, bố có dạy nó đạp xe được không?",
       "py": "Wǒ xué yóuyǒng, xué le yígèyuè jiù xuéhuì le. 2. Nàge wàiguórén hái méi xuéhuì yòng kuàizi chīfàn. 3. Zhè shǒu zhōngwén gē hěn róngyì, shéi dōu xué de huì. 4. Nàge háizi nàme xiǎo, bàba jiào de huì jiào búhuì tā zěnme qí jiǎotàchē?"
      },
      {
       "hz": "III. V 會：V會了 / 沒V會 / V得會 / V不會",
       "vi": "III. V會: V được rồi / chưa V được / V có thể được / V không được",
       "py": "III. V huì: V huì le / méi V huì / V de huì / V búhuì"
      },
      {
       "hz": "他很有錢，想買什麼就買什麼。 2. 媽媽今天做了很多包子,你想吃幾個就吃幾個。3. A：你想去哪裡跨年？ B：哪裡熱鬧就去哪裡。 4. A：我們要怎麼去合歡山？ B：怎麼去比較方便就怎麼去。",
       "vi": "Anh ấy rất giàu, muốn mua gì thì mua nấy. Hôm nay mẹ làm rất nhiều bánh bao, con muốn ăn mấy cái thì ăn bấy nhiêu. A: Bạn muốn đón năm mới ở đâu? B: Chỗ nào náo nhiệt thì đi chỗ đó. A: Chúng ta đi núi Hợp Hoan bằng cách nào? B: Đi cách nào tiện hơn thì đi cách đó.",
       "py": "Tā hěn yǒuqián, xiǎng mǎi shénme jiù mǎi shénme. 2. Māma jīntiān zuò le hěnduō bāozi, nǐ xiǎng chī jǐgè jiù chī jǐgè. 3. A: Nǐ xiǎng qù nǎlǐ kuà nián? B: Nǎlǐ rènào jiù qù nǎlǐ. 4. A: Wǒmen yào zěnme qù héhuānshān? B: Zěnme qù bǐjiào fāngbiàn jiù zěnme qù."
      },
      {
       "hz": "A：這些飲料都很好喝，你要喝哪一種？(好喝)3. A：那家商店賣很多不同顏色的燈籠，你想買哪一個？",
       "vi": "A: Những đồ uống này đều rất ngon, bạn muốn uống loại nào? (ngon) A: Cửa hàng đó bán nhiều đèn lồng màu khác nhau, bạn muốn mua cái nào?",
       "py": "A: Zhèxiē yǐnliào dōu hěn hǎohē, nǐ yào hē nǎ yìzhǒng? (hǎohē) 3. A: Nà jiā shāngdiàn mài hěnduō bùtóng yánsè de dēnglóng, nǐ xiǎng mǎi nǎ yígè?"
      },
      {
       "hz": "A：這塊雞肉要怎麼做？烤還是炸？",
       "vi": "A: Miếng thịt gà này làm thế nào? Nướng hay chiên?",
       "py": "A: Zhèkuài jīròu yào zěnme zuò? Kǎo háishì zhà?"
      },
      {
       "hz": "A：週末從台灣飛往美國的飛機一共有八班，你要搭哪(一)班？",
       "vi": "A: Cuối tuần từ Đài Loan bay sang Mỹ tổng cộng có tám chuyến, bạn đi chuyến nào?",
       "py": "A: Zhōumò cóng Táiwān fēiwǎng Měiguó de fēijī yígòng yǒu bābān, nǐ yào dā nǎ (yì) bān?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Bổ ngữ 好 — xong xuôi, sẵn sàng",
   "giaiThich": "好 đứng sau động từ làm bổ ngữ, chỉ việc đã làm xong và sẵn sàng (準備好, 寫好). Bài cũng phân biệt 害怕 và 可怕."
  },
  {
   "title": "V. 會......的 to offer assurance with 會......的",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the speaker believes the situation after “會” is quite likely to happen. “的” in this pattern is added to show affirmation with a more softened tone. VI. 等......就......\tWhen something happens, then S... This pattern indicates when something happens, someone will perform an action. Negation words “不” and “沒” should be placed before “等”. 請用提示完成句子。Complete the dialogues with given phrases.",
     "examples": [
      {
       "hz": "李小姐的成績很好，畢業後一定會找到好工作的。",
       "vi": "Thành tích của cô Lý rất tốt, tốt nghiệp xong chắc chắn sẽ tìm được việc tốt.",
       "py": "Lǐ xiǎojiě de chéngjì hěn hǎo, bìyè hòu yídìng huì zhǎodào hǎo gōngzuò de."
      },
      {
       "hz": "醫生說，多休息、多喝水，我的感冒很快就會好的。",
       "vi": "Bác sĩ nói nghỉ ngơi nhiều, uống nhiều nước thì bệnh cảm của tôi sẽ sớm khỏi thôi.",
       "py": "Yīshēng shuō, duō xiūxí, duōhēshuǐ, wǒ de gǎnmào hěnkuài jiù huì hǎo de."
      },
      {
       "hz": "A：我很想去法國留學，可是怕父母不同意。",
       "vi": "A: Tôi rất muốn sang Pháp du học, nhưng sợ bố mẹ không đồng ý.",
       "py": "A: Wǒ hěn xiǎng qù Fǎguó liúxué, kěshì pà fùmǔ bù tóngyì."
      },
      {
       "hz": "B：只要好好地跟他們說，他們不會不同意的。",
       "vi": "B: Chỉ cần bạn nói chuyện đàng hoàng với bố mẹ, họ sẽ không phản đối đâu.",
       "py": "B: Zhǐyào hǎohǎo dì gēn tāmen shuō, tāmen búhuì bù tóngyì de."
      },
      {
       "hz": "A：週末我想去山上野餐，不知道會不會下雨?",
       "vi": "A: Cuối tuần tôi muốn lên núi dã ngoại, không biết có mưa không?",
       "py": "A: Zhōumò wǒ xiǎng qù shānshàng yěcān, bù zhīdào huì búhuì xiàyǔ?"
      },
      {
       "hz": "哥哥：我買了一瓶香水要送給女朋友，不知道她喜歡不喜歡？",
       "vi": "Anh trai: Anh mua một lọ nước hoa định tặng bạn gái, không biết cô ấy có thích không?",
       "py": "Gēge: Wǒ mǎi le yìpíng xiāngshuǐ yào sònggěi nǚpéngyǒu, bù zhīdào tā xǐhuān bù xǐhuān?"
      },
      {
       "hz": "有很多人沒等舞會結束，就先走了。",
       "vi": "Có nhiều người chưa đợi buổi tiệc kết thúc đã về trước.",
       "py": "Yǒu hěnduō rén méi děng wǔhuì jiéshù, jiù xiān zǒu le."
      },
      {
       "hz": "等這個學期結束，我就不要住在宿舍裡了。",
       "vi": "Đợi học kỳ này kết thúc, tôi sẽ không ở ký túc xá nữa.",
       "py": "Děng zhège xuéqíjiéshù, wǒ jiù búyào zhù zài sùshè lǐ le."
      },
      {
       "hz": "等夏天來了,我們就可以去海邊曬太陽、游泳了。",
       "vi": "Đợi mùa hè đến, chúng ta có thể đi biển tắm nắng, bơi lội.",
       "py": "Děng xiàtiān lái le, wǒmen jiù kěyǐ qù hǎibiān shàitàiyáng, yóuyǒng le."
      },
      {
       "hz": "A：請問，學校什麼時候給我們獎學金呢？(考完試)",
       "vi": "A: Cho hỏi, khi nào trường phát học bổng cho chúng em? (thi xong)",
       "py": "A: Qǐngwèn, xuéxiào shénme shíhòu gěi wǒmen jiǎngxuéjīn ne? (kǎowánshì)"
      },
      {
       "hz": "台灣的KTV有什麼特色？",
       "vi": "Karaoke ở Đài Loan có đặc điểm gì?",
       "py": "Táiwān de KTV yǒu shénme tèsè?"
      },
      {
       "hz": "要是想省錢，什麼時候去KTV唱歌最便宜？",
       "vi": "Nếu muốn tiết kiệm, đi hát karaoke lúc nào rẻ nhất?",
       "py": "Yàoshì xiǎng shěngqián, shénme shíhòu qù KTV chànggē zuì piányi?"
      },
      {
       "hz": "為什麼有人生氣或是傷心的時候要去KTV唱歌？",
       "vi": "Tại sao có người lúc tức giận hoặc buồn lại đi hát karaoke?",
       "py": "Wèishénme yǒurén shēngqì huòshì shāngxīn de shíhòu yào qù KTV chànggē?"
      },
      {
       "hz": "你心情不好的時候，怎麼辦？",
       "vi": "Khi tâm trạng không tốt, bạn làm gì?",
       "py": "Nǐ xīnqíng bùhǎo de shíhòu, zěnmebàn?"
      },
      {
       "hz": "在你的國家，去KTV唱歌是很流行的活動嗎？",
       "vi": "Ở nước bạn, đi hát karaoke có phải là hoạt động rất phổ biến không?",
       "py": "Zài nǐ de guójiā, qù KTV chànggē shì hěn liúxíng de huódòng ma?"
      },
      {
       "hz": "你喜歡去KTV唱歌嗎？為什麼？",
       "vi": "Bạn có thích đi hát karaoke không? Tại sao?",
       "py": "Nǐ xǐhuān qù KTV chànggē ma? Wèishénme?"
      },
      {
       "hz": "除了去KTV唱歌，還可以在KTV辦什麼活動？",
       "vi": "Ngoài hát, còn có thể tổ chức hoạt động gì ở quán karaoke?",
       "py": "Chúle qù KTV chànggē, hái kěyǐ zài KTV bàn shénme huódòng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "會……的 — chắc chắn sẽ…",
   "giaiThich": "Người nói tin việc sau 會 rất có khả năng xảy ra; 的 ở cuối làm giọng điệu mềm và khẳng định hơn. Kèm mẫu 等……就…… (đợi… thì…)."
  },
  {
   "title": "I. 才 merely, only",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates the number is fewer than the speaker's expectation, different from the usage of \"才\" in Lesson Two. Both \"才\" and \"只\" imply a small number. However, \"才\" emphasizes the small number is the speaker's subjective opinion. Also, \"才\" can be followed directly with number words; \"只\" is placed before the verb and cannot be followed with number words. e.g. \"這件衣服只一百塊錢\"",
     "examples": [
      {
       "hz": "今天咖啡館裡才三個人，客人真少。2. 我今天中午才吃了一個麵包，現在好餓。3. A：那個孩子籃球打得很好，他學了很久吧？ B：老師說他很聰明，才教了半個月就教會(他)了。",
       "vi": "Hôm nay quán cà phê chỉ có ba người, khách ít thật. Trưa nay tôi chỉ ăn một cái bánh mì, bây giờ đói quá. A: Đứa bé đó chơi bóng rổ giỏi lắm, chắc học lâu rồi nhỉ? B: Thầy giáo nói cậu bé rất thông minh, mới dạy nửa tháng đã biết chơi rồi.",
       "py": "Jīntiān kāfēiguǎn lǐ cái sāngè rén, kèrén zhēn shǎo. 2. Wǒ jīntiān zhōngwǔ cái chī le yígè miànbāo, xiànzài hǎo è. 3. A: Nàge háizi lánqiú dǎ de hěn hǎo, tā xué le hěn jiǔ ba? B: Lǎoshī shuō tā hěn cōngmíng, cái jiào le bàngè yuè jiù jiàohuì (tā) le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "才 — chỉ mới, ít ỏi",
   "giaiThich": "Ở đây 才 nói số lượng ÍT hơn người nói mong đợi (khác nghĩa \"mãi mới\" ở bài 2). 才 và 只 đều chỉ số ít, nhưng 才 nhấn mạnh cảm giác ít."
  },
  {
   "title": "II. 讓 to make someone feel...",
   "points": [
    {
     "label": null,
     "formula": "In the pattern \"A讓B+Vs\", A is the cause that makes B have certain feelings.",
     "examples": [
      {
       "hz": "朋友送了我一個生日蛋糕，讓我很開心。 2. 爸爸開了五個小時的車，讓他累的不得了。 3. 昨天吃了不乾淨的東西，讓我的肚子不太舒服。",
       "vi": "Bạn tặng tôi một chiếc bánh sinh nhật, khiến tôi rất vui. Bố lái xe năm tiếng, khiến bố mệt vô cùng. Hôm qua ăn phải đồ không sạch, khiến bụng tôi không được thoải mái lắm.",
       "py": "Péngyǒu sòng le wǒ yígè shēngrìdàngāo, ràng wǒ hěn kāixīn. 2. Bàba kāi le wǔgè xiǎoshí de chē, ràng tā lèi de bùdéle. 3. Zuótiān chī le bù gānjìng de dōngxī, ràng wǒ de dùzi bú tài shūfú."
      },
      {
       "hz": "用「讓」改寫下面句子。Viết lại câu bằng 讓. 1. 我已經兩個星期沒倒垃圾了，所以媽媽很生氣。",
       "vi": "Dùng 讓 viết lại các câu dưới đây. 1. Đã hai tuần tôi không đổ rác, nên mẹ rất tức giận.",
       "py": "Yòng “ràng” gǎixiě xiàmiàn jùzi. Vi ế t l ạ i c â u b ằ ng ràng. 1. Wǒ yǐjīng liǎnggè xīngqí méi dào lèsè le, suǒyǐ māma hěn shēngqì."
      },
      {
       "hz": "我一想到明天要去旅行，就很興奮，所以睡不著。",
       "vi": "Cứ nghĩ đến ngày mai được đi du lịch là tôi háo hức, nên không ngủ được.",
       "py": "Wǒ yì xiǎngdào míngtiān yào qù lǚxíng, jiù hěn xīngfèn, suǒyǐ shuì bù zhe."
      },
      {
       "hz": "我不喜歡坐飛機，一聽到坐飛機就緊張得不得了。",
       "vi": "Tôi không thích đi máy bay, cứ nghe đến đi máy bay là căng thẳng vô cùng.",
       "py": "Wǒ bù xǐhuān zuòfēijī, yì tīngdào zuòfēijī jiù jǐnzhāng de bùdéle."
      },
      {
       "hz": "你會唱中文歌嗎？",
       "vi": "Bạn có biết hát bài hát tiếng Trung không?",
       "py": "Nǐ huì chàng zhōngwén gē ma?"
      },
      {
       "hz": "請找一首中文歌曲，說說看那首歌的歌詞是什麼意思。",
       "vi": "Hãy tìm một bài hát tiếng Trung, rồi nói xem lời bài hát có nghĩa là gì.",
       "py": "Qǐng zhǎo yìshǒu zhōngwéngēqǔ, shuōshuōkàn nàshǒugē de gēcí shì shénme yìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — làm cho ai đó cảm thấy…",
   "giaiThich": "Mẫu \"A 讓 B + tính từ\": A là nguyên nhân khiến B có cảm giác nào đó."
  },
  {
   "title": "2. 請比較台灣的KTV和你的國家的KTV",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請使用下面的語法有沒有吃到飽",
       "vi": "Hãy dùng ngữ pháp dưới đây… có ăn thoả thích (buffet) không",
       "py": "Qǐng shǐyòng xiàmiàn de yǔfǎ yǒuméiyǒu chī dào bǎo"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: so sánh KTV",
   "giaiThich": "Phần luyện nói: so sánh KTV ở Đài Loan với ở nước bạn."
  }
 ],
 "td2-7.1": [
  {
   "title": "I. 不但...還... not only...but also...",
   "points": [
    {
     "label": null,
     "formula": "In addition to the situation after \"不但\", the speaker lays more stress on the situation after \"還\". In this pattern, the first subject should be consistent with the second one.",
     "examples": [
      {
       "hz": "我去夜市，不但要吃雞排，還要吃蚵仔煎。 2. 那個印尼學生不但會說中文，還會寫很多中國字。 3. 這家民宿不但有免費的無線網路，還有游泳池呢！",
       "vi": "Tôi đi chợ đêm, không những muốn ăn gà rán miếng mà còn muốn ăn trứng chiên hàu. Cậu học sinh Indonesia đó không những biết nói tiếng Trung mà còn biết viết rất nhiều chữ Hán. Nhà nghỉ này không những có wifi miễn phí mà còn có cả bể bơi nữa!",
       "py": "Wǒ qù yèshì, búdàn yào chī jī pái, háiyào chī hé zǎi jiān. 2. Nàge Yìnní xuéshēng búdàn huì shuō zhōngwén, hái huì xiě hěnduō Zhōngguó zì. 3. Zhèjiā mínsù búdàn yǒu miǎnfèi de wúxiànwǎng lù, háiyǒu yóuyǒngchí ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不但… 還… — không những… mà còn…",
   "giaiThich": "Ý nhấn mạnh nằm ở vế sau 還. Hai vế phải cùng một chủ ngữ."
  },
  {
   "title": "II. 一＋M (＋N)＋都/也＋Neg (+Vaux)＋V",
   "points": [
    {
     "label": null,
     "formula": "emphatic negation with一＋M(＋N)＋都/也＋Neg(+Vaux)＋V The pattern \"一M都/也 不(沒)\" indicates \"there is not any...\" or \"don't want any...\" , and shows a strange and unexpected situation with a bit of exaggeration.",
     "examples": [
      {
       "hz": "我等了一個小時，一班車都沒來。 2. 我忘了帶錢包，現在一毛(錢)都沒有。 3. 這裡一家醫院也沒有，要是生病了就很麻煩。4. 那個學生不愛上課，一個字都不願意寫，所以老師很生氣。",
       "vi": "Tôi đợi một tiếng mà không có chuyến xe nào đến. Tôi quên mang ví, bây giờ một xu cũng không có. Ở đây một bệnh viện cũng không có, lỡ bị ốm thì rất phiền. Cậu học sinh đó không thích đi học, một chữ cũng không chịu viết, nên thầy giáo rất tức giận.",
       "py": "Wǒ děng le yígè xiǎoshí, yì bānchē dōu méi lái. 2. Wǒ wàng le dài qiánbāo, xiànzài yì máo (qián) dōu méiyǒu. 3. Zhèlǐ yìjiā yīyuàn yě méiyǒu, yàoshì shēngbìng le jiù hěn máfán. 4. Nàge xuéshēng bú ài shàngkè, yígè zì dōu bú yuànyì xiě, suǒyǐ lǎoshī hěn shēngqì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一 + lượng từ + 都/也 + phủ định — một… cũng không",
   "giaiThich": "Nhấn mạnh phủ định tuyệt đối: \"một… cũng không\", mang chút cường điệu, thể hiện tình huống bất ngờ."
  },
  {
   "title": "III. 讓 (客氣地) to make, to let; to allow, to permit",
   "points": [
    {
     "label": null,
     "formula": "(1) This “讓” functions as a verb. There are different usages of 讓, such as “to make” and “to let”, ie： “有的KTV還有好玩的樂器,讓客人唱得更開心。(to make) (L6)” and the dialogue in this lesson, “讓美心請客吧。” (to let). The “讓(to let)” is more polite than “叫” or “要”, ie：“老師叫你去辦公室找他” is an order while “老師讓你去辦公室找他” is a polite expression. (2) “讓” also indicates to permit and to allow somebody to do something, ie：“父母讓我一個人在學校附近租房子。” and “我不舒服,老闆讓我回家休息。”",
     "examples": [
      {
       "hz": "他上班常遲到,工作也做不好，所以老闆讓/叫/要他明天別來上班了。",
       "vi": "Anh ấy hay đi làm muộn, làm việc cũng không tốt, nên ông chủ bảo anh ấy ngày mai đừng đến làm nữa.",
       "py": "Tā shàngbān cháng chídào, gōngzuò yě zuò bùhǎo, suǒyǐ lǎobǎn ràng / jiào / yào tā míngtiān bié lái shàngbān le."
      },
      {
       "hz": "陳小姐讓/叫/要男朋友在樓下等一下，因為她還沒選好要穿哪件衣服。",
       "vi": "Cô Trần bảo bạn trai đợi dưới nhà một chút, vì cô ấy vẫn chưa chọn xong nên mặc bộ nào.",
       "py": "Chén xiǎojiě ràng / jiào / yào nánpéngyǒu zài lóuxià děng yíxià, yīnwèi tā hái méi xuǎn hǎo yào chuān nǎ jiàn yīfú."
      },
      {
       "hz": "A：今天我忘了帶錢,讓你請吃午餐,可以嗎?",
       "vi": "A: Hôm nay tôi quên mang tiền, để bạn mời bữa trưa được không?",
       "py": "A: Jīntiān wǒ wàng le dài qián, ràng nǐ qǐngchī wǔcān, kěyǐ ma?"
      },
      {
       "hz": "B：沒問題，你想吃什麼？我讓餐廳老闆送過來。",
       "vi": "B: Không vấn đề gì, bạn muốn ăn gì? Tôi bảo chủ nhà hàng mang qua.",
       "py": "B: Méi wèntí, nǐ xiǎng chī shénme? Wǒ ràng cāntīng lǎobǎn sòngguòlái."
      },
      {
       "hz": "客人：這些菜吃不完，可不可以讓我帶回家?",
       "vi": "Khách: Những món này ăn không hết, cho tôi mang về được không?",
       "py": "Kèrén: Zhèxiē cài chībùwán, kěbùkěyǐ ràng wǒ dàihuíjiā?"
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "先生：這個週末我們一起去阿里山露營，好嗎？",
       "vi": "Chồng: Cuối tuần này mình cùng đi cắm trại ở A Lý Sơn nhé?",
       "py": "Xiānshēng: Zhège zhōumò wǒmen yìqǐ qù ālǐshān lùyíng, hǎo ma?"
      },
      {
       "hz": "爸爸：大學畢業以後，你最好出國留學。",
       "vi": "Bố: Tốt nghiệp đại học xong, tốt nhất con nên ra nước ngoài du học.",
       "py": "Bàba: Dàxuébìyè yǐhòu, nǐ zuìhǎo chūguó liúxué."
      },
      {
       "hz": "病人：我的頭不疼了，為什麼不讓我回家呢？",
       "vi": "Bệnh nhân: Đầu tôi hết đau rồi, sao không cho tôi về nhà?",
       "py": "Bìngrén: Wǒ de tóu bù téng le, wèishénme búràng wǒ huíjiā ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — để cho, nhường (lịch sự)",
   "giaiThich": "讓 làm động từ với nhiều nghĩa: \"khiến cho\" và \"để cho, nhường\" (ví dụ 讓美心請客吧 — để Mỹ Tâm mời nhé)."
  },
  {
   "title": "IV. 是…... (＋Adv)＋Vs It is indeed true that...",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, intransitive state verbs, such as \"美\"、\"漂亮\"、\"年輕\", etc., do not have to come after \"是\". However, \"是\" can added when the speaker wants to confirm or emphasize the degree of Vs.",
     "examples": [
      {
       "hz": "A：我覺得王小姐比以前漂亮多了。",
       "vi": "A: Tôi thấy cô Vương xinh hơn trước nhiều.",
       "py": "A: Wǒ juéde Wáng xiǎojiě bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "B：她是比以前漂亮多了。",
       "vi": "B: Cô ấy đúng là xinh hơn trước nhiều.",
       "py": "B: Tā shì bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "A：外國人都覺得中國字很難寫，你覺得呢？",
       "vi": "A: Người nước ngoài đều thấy chữ Hán rất khó viết, bạn thấy sao?",
       "py": "A: Wàiguórén dōu juéde Zhōngguó zì hěn nán xiě, nǐ juéde ne?"
      },
      {
       "hz": "B：是有點兒難寫，可是多練習幾次就好了。",
       "vi": "B: Đúng là hơi khó viết, nhưng luyện vài lần là được.",
       "py": "B: Shì yǒudiǎn'ér nán xiě, kěshì duō liànxí jǐcì jiù hǎo le."
      },
      {
       "hz": "良介：聽說蘇花公路的風景很美，是真的嗎？",
       "vi": "Ryosuke: Nghe nói phong cảnh đường Tô Hoa rất đẹp, có thật không?",
       "py": "Liángjiè: Tīngshuō sūhuāgōnglù de fēngjǐng hěn měi, shì zhēnde ma?"
      },
      {
       "hz": "美心：是真的，可是下大雨的時候，那條路比較危險。",
       "vi": "Mỹ Tâm: Thật đấy, nhưng lúc mưa to thì con đường đó khá nguy hiểm.",
       "py": "Měixīn: Shì zhēnde, kěshì xià dàyǔ de shíhòu, nàtiáo lù bǐjiào wéixiǎn."
      },
      {
       "hz": "A：你忙了一天，累了吧？",
       "vi": "A: Bạn bận cả ngày rồi, mệt rồi nhỉ?",
       "py": "A: Nǐ máng le yìtiān, lèi le ba?"
      },
      {
       "hz": "A：中文很重要，把中文學好了，比較容易找工作。",
       "vi": "A: Tiếng Trung rất quan trọng, học giỏi tiếng Trung thì dễ tìm việc hơn.",
       "py": "A: Zhōngwén hěn zhòngyào, bǎ zhōng wénxué hǎo le, bǐjiào róngyì zhǎo gōngzuò."
      },
      {
       "hz": "A：這支手機買五萬塊，太貴了吧？",
       "vi": "A: Chiếc điện thoại này mua năm vạn đồng, đắt quá nhỉ?",
       "py": "A: Zhè zhī shǒujī mǎi wǔwànkuài, tàiguì le ba?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "是 + tính từ — đúng là…",
   "giaiThich": "Tính từ (美, 漂亮, 年輕…) vốn không cần 是, nhưng thêm 是 khi người nói muốn xác nhận hoặc nhấn mạnh."
  },
  {
   "title": "V. V光(了) nothing left, used up",
   "points": [
    {
     "label": null,
     "formula": "The “光” here serves as a verb complement denoting “running out” or ”nothing left.”, and sometimes it suggests a sense of regret and disappointment. It often collocates with “把”, ie: “把錢用光了”and",
     "examples": [
      {
       "hz": "弟弟把我的巧克力都吃光了，讓我很生氣。2. 時間很晚了，咖啡館的客人差不多都走光了。3. 要是你一下子就把獎學金用光，下個月就沒錢付房租了。",
       "vi": "Em trai ăn hết sạch sô-cô-la của tôi, khiến tôi rất tức giận. Muộn rồi, khách ở quán cà phê gần như về hết cả. Nếu bạn tiêu hết sạch học bổng ngay một lúc thì tháng sau sẽ không có tiền trả tiền thuê nhà.",
       "py": "Dìdi bǎ wǒ de qiǎokèlì dōu chīguāng le, ràng wǒ hěn shēngqì. 2. Shíjiān hěn wǎn le, kāfēiguǎn de kèrén chàbuduō dōu zǒu guāng le. 3. Yàoshì nǐ yíxiàzi jiù bǎ jiǎngxuéjīn yòngguāng, xiàgèyuè jiù méi qián fù fángzū le."
      },
      {
       "hz": "「弟弟把糖吃光了」✔　「我把功課寫光了」✘",
       "vi": "Có thể nói “弟弟把糖吃光了” (em trai ăn hết sạch kẹo), nhưng không thể nói “我把功課寫光了”.",
       "py": "“Dìdi bǎ táng chīguāng le” ✔ “wǒ bǎ gōngkè xiě guāng le” ✘"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 光(了) — hết sạch",
   "giaiThich": "光 làm bổ ngữ, nghĩa \"hết sạch, không còn gì\", đôi khi kèm sắc thái tiếc nuối. Hay đi với 把 (把錢用光了 — tiêu sạch tiền)."
  },
  {
   "title": "VI. 一點兒＋都/也＋Neg＋Vs",
   "points": [
    {
     "label": null,
     "formula": "The expression“一點兒都/也不\" shows strong negation, often followed by verbs or state verbs to emphasize the subject is not in a certain status at all.",
     "examples": [
      {
       "hz": "這杯珍珠奶茶是無糖的，一點兒都不甜。2. 網路訂票一點兒也不難，你可以自己上網試試看。 3. 我跟他一點兒都不熟，為什麼要一起去KTV唱歌呢？",
       "vi": "Cốc trà sữa trân châu này không đường, không ngọt chút nào. Đặt vé qua mạng không khó chút nào, bạn có thể tự lên mạng thử xem. Tôi với anh ấy không thân chút nào, sao phải cùng đi hát karaoke chứ?",
       "py": "Zhè bēi zhēnzhūnǎichá shì wú táng de, yìdiǎn'ér dōu bù tián. 2. Wǎnglù dìngpiào yìdiǎn'ér yě bùnán, nǐ kěyǐ zìjǐ shàngwǎng shìshìkàn. 3. Wǒ gēn tā yìdiǎn'ér dōu bù shú, wèishénme yào yìqǐ qù KTV chànggē ne?"
      },
      {
       "hz": "王太太：你兒子在美國留學，你擔心嗎？",
       "vi": "Bà Vương: Con trai chị du học ở Mỹ, chị có lo không?",
       "py": "Wáng tàitai: Nǐ érzi zài Měiguó liúxué, nǐ dānxīn ma?"
      },
      {
       "hz": "台灣人：日本菜辣嗎？我不喜歡吃辣的東西。",
       "vi": "Người Đài Loan: Món Nhật có cay không? Tôi không thích ăn cay.",
       "py": "Táiwānrén: Rìběn cài là ma? Wǒ bù xǐhuān chī là de dōngxī."
      },
      {
       "hz": "A：你為什麼只吃菜，不喝湯？",
       "vi": "A: Sao bạn chỉ ăn rau mà không uống canh?",
       "py": "A: Nǐ wèishénme zhǐ chī cài, bù hētāng?"
      },
      {
       "hz": "文章裡的人計畫春假的時候做什麼？為什麼？",
       "vi": "Người trong bài định làm gì vào kỳ nghỉ xuân? Tại sao?",
       "py": "Wénzhāng lǐ de rén jìhuà chūnjià de shíhòu zuò shénme? Wèishénme?"
      },
      {
       "hz": "他的行李裡面裝了哪些東西？你去旅行的時候，會帶哪些東西？",
       "vi": "Trong hành lý của anh ấy có những gì? Khi đi du lịch bạn sẽ mang theo những gì?",
       "py": "Tā de xínglǐ lǐmiàn zhuāng le nǎxiē dōngxī? Nǐ qù lǚxíng de shíhòu, huì dài nǎxiē dōngxī?"
      },
      {
       "hz": "為什麼他的室友不想參加團體旅遊？",
       "vi": "Tại sao bạn cùng phòng của anh ấy không muốn tham gia tour du lịch theo đoàn?",
       "py": "Wèishénme tā de shìyǒu bùxiǎng cānjiā tuántǐ lǚyóu?"
      },
      {
       "hz": "他上網訂車票都很順利嗎？為什麼？",
       "vi": "Anh ấy đặt vé xe trên mạng có suôn sẻ không? Tại sao?",
       "py": "Tā shàngwǎng dìng chēpiào dōu hěn shùnlì ma? Wèishénme?"
      },
      {
       "hz": "從台北去阿里山，可以怎麼去？",
       "vi": "Từ Đài Bắc đi A Lý Sơn có thể đi bằng cách nào?",
       "py": "Cóng Táiběi qù ālǐshān, kěyǐ zěnme qù?"
      },
      {
       "hz": "他們為什麼要住在嘉義市？那裡有什麼特別的食物？",
       "vi": "Tại sao họ phải ở thành phố Gia Nghĩa? Ở đó có món ăn gì đặc biệt?",
       "py": "Tāmen wèishénme yào zhù zài jiāyìshì? Nàlǐ yǒu shénme tèbié de shíwù?"
      },
      {
       "hz": "為什麼他的室友忽然大叫？",
       "vi": "Tại sao bạn cùng phòng của anh ấy đột nhiên hét lên?",
       "py": "Wèishénme tā de shìyǒu hūrán dàjiào?"
      },
      {
       "hz": "李小姐趁出國時，在機場買了一瓶有名的香水。",
       "vi": "Cô Lý tranh thủ lúc ra nước ngoài, mua một lọ nước hoa nổi tiếng ở sân bay.",
       "py": "Lǐ xiǎojiě chèn chūguóshí, zài jīchǎng mǎi le yìpíng yǒumíng de xiāngshuǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一點兒 + 都/也 + phủ định — một chút cũng không",
   "giaiThich": "Phủ định mạnh: \"hoàn toàn không…\", nhấn mạnh chủ thể không hề ở trạng thái đó."
  },
  {
   "title": "2. 這次社區的中秋節活動辦得",
   "points": [
    {
     "label": null,
     "formula": "(Vs) to succeed, to make it; to be successful",
     "examples": [
      {
       "hz": "到東部的火車票很難訂，我訂了好幾次才成功。",
       "vi": "Vé tàu đi miền đông rất khó đặt, tôi đặt mấy lần mới được.",
       "py": "Dào dōngbù de huǒchēpiào hěn nán dìng, wǒ dìng le hǎo jǐcì cái chénggōng."
      },
      {
       "hz": "很成功，大家都玩得很開心。",
       "vi": "…rất thành công, mọi người đều chơi rất vui.",
       "py": "Hěn chénggōng, dàjiā dōu wán de hěn kāixīn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 成功 và bổ ngữ",
   "giaiThich": "Phần luyện tập nhận xét về mức độ thành công của hoạt động (辦得…)."
  },
  {
   "title": "I. 剛...就... after V1, V2 happened immediately",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates when the situation after “剛” happens, another situation or action occurs right away. It emphasizes the close connection between two situations or actions. If the two clauses has different subjects, the subject of the latter clause should be placed before “就”. 請用提示完成句子。Complete the sentences with given phrases.",
     "examples": [
      {
       "hz": "那個蛋糕剛烤好就被孩子吃光了。 2. 他剛搬進宿舍，無線網路就壞了。3. 他剛畢業就找到了一份好工作，真是太幸運了！",
       "vi": "Cái bánh kem đó vừa nướng xong đã bị bọn trẻ ăn hết sạch. Anh ấy vừa dọn vào ký túc xá thì wifi hỏng. Anh ấy vừa tốt nghiệp đã tìm được một công việc tốt, thật là may mắn!",
       "py": "Nàge dàngāo gāng kǎo hǎo jiù bèi háizi chīguāng le. 2. Tā gāng bānjìn sùshè, wúxiànwǎng lù jiù huài le. 3. Tā gāng bìyè jiù zhǎodào le yífèn hǎo gōngzuò, zhēnshìtài xìngyùn le!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "剛… 就… — vừa mới… đã…",
   "giaiThich": "Việc sau 剛 vừa xảy ra thì việc sau 就 đến ngay, nhấn mạnh hai việc nối nhau rất sát."
  },
  {
   "title": "II. 趁(著) seize the moment, take advantage of...",
   "points": [
    {
     "label": null,
     "formula": "The expression \"趁著\" means taking advantage of a certain chance or time to do something beneficial to oneself. \"趁\" can be followed by nouns, verb phrases, and intransitive state verbs, etc.",
     "examples": [
      {
       "hz": "媽媽趁(著)好天氣，把髒衣服都洗了。2. 張先生趁著到花蓮旅行時，買了一些當地的名產。3. 他趁著去法國留學的時候,參觀了有名的博物館。",
       "vi": "Mẹ tranh thủ trời đẹp giặt hết quần áo bẩn. Anh Trương nhân dịp đi du lịch Hoa Liên đã mua một ít đặc sản địa phương. Anh ấy tranh thủ lúc du học ở Pháp để tham quan các bảo tàng nổi tiếng.",
       "py": "Māma chèn (zhe) hǎo tiānqì, bǎ zàng yīfú dōu xǐ le. 2. Zhāng xiānshēng chèn zhe dào Huālián lǚxíng shí, mǎi le yìxiē dāngdì de míngchǎn. 3. Tā chèn zhe qù Fǎguó liúxué de shíhòu, cānguān le yǒumíng de bówùguǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "趁(著) — nhân lúc, tranh thủ",
   "giaiThich": "Nghĩa \"nhân lúc, tranh thủ cơ hội\" để làm việc có lợi. Sau 趁 có thể là danh từ, cụm động từ hoặc tính từ."
  },
  {
   "title": "1. 做一個旅遊計畫",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這個計畫應該包含：(1)出發日期、去的地方、費用、交通工具、住的地方...(2)畫一張旅行的地圖，從哪裡到哪裡？",
       "vi": "Kế hoạch này cần có: (1) ngày khởi hành, nơi đến, chi phí, phương tiện đi lại, chỗ ở… (2) vẽ một bản đồ chuyến đi: từ đâu đến đâu?",
       "py": "Zhège jìhuà yīnggāi bāohán: (1) chūfā rìqí, qù de dìfāng, fèiyòng, jiāotōnggōngjù, zhù de dìfāng... (2) huà yìzhāng lǚxíng de dìtú, cóng nǎlǐ dào nǎlǐ?"
      },
      {
       "hz": "怎麼去？為什麼值得去？",
       "vi": "Đi bằng cách nào? Tại sao đáng để đi?",
       "py": "Zěnme qù? Wèishénme zhíde qù?"
      },
      {
       "hz": "跟大家做一個口頭報告。",
       "vi": "Thuyết trình trước cả lớp.",
       "py": "Gēn dàjiā zuò yígè kǒutóubàogào."
      },
      {
       "hz": "風景區的名字費用(車票、旅館...)特別的食物/風景...",
       "vi": "Tên khu danh thắng · Chi phí (vé xe, khách sạn…) · Món ăn / phong cảnh đặc biệt…",
       "py": "Fēngjǐngqū de míngzì fèiyòng (chēpiào, lǚguǎn...) tèbié de shíwù / fēngjǐng..."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: lập kế hoạch du lịch",
   "giaiThich": "Phần luyện nói/viết theo chủ đề lên kế hoạch đi chơi."
  },
  {
   "title": "2. 練習上網訂票",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請老師找一個主題，例如要去花蓮的民宿住兩天，或是要買去台南的火車票，讓學生用自己的手機上網訂位、訂票，完成老師指定的任務。",
       "vi": "Thầy cô chọn một chủ đề, ví dụ đặt phòng nhà nghỉ ở Hoa Liên hai đêm, hoặc mua vé tàu đi Đài Nam, để học sinh dùng điện thoại của mình lên mạng đặt chỗ, đặt vé, hoàn thành nhiệm vụ thầy cô giao.",
       "py": "Qǐng lǎoshī zhǎo yígè zhǔtí, lìrú yào qù Huālián de mínsù zhù liǎngtiān, huòshì yào mǎi qù Táinán de huǒchēpiào, ràng xuéshēng yòng zìjǐ de shǒujī shàngwǎng dìngwèi, dìngpiào, wánchéng lǎoshī zhǐdìng de rènwù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: đặt vé trên mạng",
   "giaiThich": "Phần luyện tập thao tác đặt vé qua mạng."
  }
 ],
 "td2-7.2": [
  {
   "title": "I. 不但...還... not only...but also...",
   "points": [
    {
     "label": null,
     "formula": "In addition to the situation after \"不但\", the speaker lays more stress on the situation after \"還\". In this pattern, the first subject should be consistent with the second one.",
     "examples": [
      {
       "hz": "我去夜市，不但要吃雞排，還要吃蚵仔煎。 2. 那個印尼學生不但會說中文，還會寫很多中國字。 3. 這家民宿不但有免費的無線網路，還有游泳池呢！",
       "vi": "Tôi đi chợ đêm, không những muốn ăn gà rán miếng mà còn muốn ăn trứng chiên hàu. Cậu học sinh Indonesia đó không những biết nói tiếng Trung mà còn biết viết rất nhiều chữ Hán. Nhà nghỉ này không những có wifi miễn phí mà còn có cả bể bơi nữa!",
       "py": "Wǒ qù yèshì, búdàn yào chī jī pái, háiyào chī hé zǎi jiān. 2. Nàge Yìnní xuéshēng búdàn huì shuō zhōngwén, hái huì xiě hěnduō Zhōngguó zì. 3. Zhèjiā mínsù búdàn yǒu miǎnfèi de wúxiànwǎng lù, háiyǒu yóuyǒngchí ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不但… 還… — không những… mà còn…",
   "giaiThich": "Ý nhấn mạnh nằm ở vế sau 還. Hai vế phải cùng một chủ ngữ."
  },
  {
   "title": "II. 一＋M (＋N)＋都/也＋Neg (+Vaux)＋V",
   "points": [
    {
     "label": null,
     "formula": "emphatic negation with一＋M(＋N)＋都/也＋Neg(+Vaux)＋V The pattern \"一M都/也 不(沒)\" indicates \"there is not any...\" or \"don't want any...\" , and shows a strange and unexpected situation with a bit of exaggeration.",
     "examples": [
      {
       "hz": "我等了一個小時，一班車都沒來。 2. 我忘了帶錢包，現在一毛(錢)都沒有。 3. 這裡一家醫院也沒有，要是生病了就很麻煩。4. 那個學生不愛上課，一個字都不願意寫，所以老師很生氣。",
       "vi": "Tôi đợi một tiếng mà không có chuyến xe nào đến. Tôi quên mang ví, bây giờ một xu cũng không có. Ở đây một bệnh viện cũng không có, lỡ bị ốm thì rất phiền. Cậu học sinh đó không thích đi học, một chữ cũng không chịu viết, nên thầy giáo rất tức giận.",
       "py": "Wǒ děng le yígè xiǎoshí, yì bānchē dōu méi lái. 2. Wǒ wàng le dài qiánbāo, xiànzài yì máo (qián) dōu méiyǒu. 3. Zhèlǐ yìjiā yīyuàn yě méiyǒu, yàoshì shēngbìng le jiù hěn máfán. 4. Nàge xuéshēng bú ài shàngkè, yígè zì dōu bú yuànyì xiě, suǒyǐ lǎoshī hěn shēngqì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一 + lượng từ + 都/也 + phủ định — một… cũng không",
   "giaiThich": "Nhấn mạnh phủ định tuyệt đối: \"một… cũng không\", mang chút cường điệu, thể hiện tình huống bất ngờ."
  },
  {
   "title": "III. 讓 (客氣地) to make, to let; to allow, to permit",
   "points": [
    {
     "label": null,
     "formula": "(1) This “讓” functions as a verb. There are different usages of 讓, such as “to make” and “to let”, ie： “有的KTV還有好玩的樂器,讓客人唱得更開心。(to make) (L6)” and the dialogue in this lesson, “讓美心請客吧。” (to let). The “讓(to let)” is more polite than “叫” or “要”, ie：“老師叫你去辦公室找他” is an order while “老師讓你去辦公室找他” is a polite expression. (2) “讓” also indicates to permit and to allow somebody to do something, ie：“父母讓我一個人在學校附近租房子。” and “我不舒服,老闆讓我回家休息。”",
     "examples": [
      {
       "hz": "他上班常遲到,工作也做不好，所以老闆讓/叫/要他明天別來上班了。",
       "vi": "Anh ấy hay đi làm muộn, làm việc cũng không tốt, nên ông chủ bảo anh ấy ngày mai đừng đến làm nữa.",
       "py": "Tā shàngbān cháng chídào, gōngzuò yě zuò bùhǎo, suǒyǐ lǎobǎn ràng / jiào / yào tā míngtiān bié lái shàngbān le."
      },
      {
       "hz": "陳小姐讓/叫/要男朋友在樓下等一下，因為她還沒選好要穿哪件衣服。",
       "vi": "Cô Trần bảo bạn trai đợi dưới nhà một chút, vì cô ấy vẫn chưa chọn xong nên mặc bộ nào.",
       "py": "Chén xiǎojiě ràng / jiào / yào nánpéngyǒu zài lóuxià děng yíxià, yīnwèi tā hái méi xuǎn hǎo yào chuān nǎ jiàn yīfú."
      },
      {
       "hz": "A：今天我忘了帶錢,讓你請吃午餐,可以嗎?",
       "vi": "A: Hôm nay tôi quên mang tiền, để bạn mời bữa trưa được không?",
       "py": "A: Jīntiān wǒ wàng le dài qián, ràng nǐ qǐngchī wǔcān, kěyǐ ma?"
      },
      {
       "hz": "B：沒問題，你想吃什麼？我讓餐廳老闆送過來。",
       "vi": "B: Không vấn đề gì, bạn muốn ăn gì? Tôi bảo chủ nhà hàng mang qua.",
       "py": "B: Méi wèntí, nǐ xiǎng chī shénme? Wǒ ràng cāntīng lǎobǎn sòngguòlái."
      },
      {
       "hz": "客人：這些菜吃不完，可不可以讓我帶回家?",
       "vi": "Khách: Những món này ăn không hết, cho tôi mang về được không?",
       "py": "Kèrén: Zhèxiē cài chībùwán, kěbùkěyǐ ràng wǒ dàihuíjiā?"
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "先生：這個週末我們一起去阿里山露營，好嗎？",
       "vi": "Chồng: Cuối tuần này mình cùng đi cắm trại ở A Lý Sơn nhé?",
       "py": "Xiānshēng: Zhège zhōumò wǒmen yìqǐ qù ālǐshān lùyíng, hǎo ma?"
      },
      {
       "hz": "爸爸：大學畢業以後，你最好出國留學。",
       "vi": "Bố: Tốt nghiệp đại học xong, tốt nhất con nên ra nước ngoài du học.",
       "py": "Bàba: Dàxuébìyè yǐhòu, nǐ zuìhǎo chūguó liúxué."
      },
      {
       "hz": "病人：我的頭不疼了，為什麼不讓我回家呢？",
       "vi": "Bệnh nhân: Đầu tôi hết đau rồi, sao không cho tôi về nhà?",
       "py": "Bìngrén: Wǒ de tóu bù téng le, wèishénme búràng wǒ huíjiā ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — để cho, nhường (lịch sự)",
   "giaiThich": "讓 làm động từ với nhiều nghĩa: \"khiến cho\" và \"để cho, nhường\" (ví dụ 讓美心請客吧 — để Mỹ Tâm mời nhé)."
  },
  {
   "title": "IV. 是…... (＋Adv)＋Vs It is indeed true that...",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, intransitive state verbs, such as \"美\"、\"漂亮\"、\"年輕\", etc., do not have to come after \"是\". However, \"是\" can added when the speaker wants to confirm or emphasize the degree of Vs.",
     "examples": [
      {
       "hz": "A：我覺得王小姐比以前漂亮多了。",
       "vi": "A: Tôi thấy cô Vương xinh hơn trước nhiều.",
       "py": "A: Wǒ juéde Wáng xiǎojiě bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "B：她是比以前漂亮多了。",
       "vi": "B: Cô ấy đúng là xinh hơn trước nhiều.",
       "py": "B: Tā shì bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "A：外國人都覺得中國字很難寫，你覺得呢？",
       "vi": "A: Người nước ngoài đều thấy chữ Hán rất khó viết, bạn thấy sao?",
       "py": "A: Wàiguórén dōu juéde Zhōngguó zì hěn nán xiě, nǐ juéde ne?"
      },
      {
       "hz": "B：是有點兒難寫，可是多練習幾次就好了。",
       "vi": "B: Đúng là hơi khó viết, nhưng luyện vài lần là được.",
       "py": "B: Shì yǒudiǎn'ér nán xiě, kěshì duō liànxí jǐcì jiù hǎo le."
      },
      {
       "hz": "良介：聽說蘇花公路的風景很美，是真的嗎？",
       "vi": "Ryosuke: Nghe nói phong cảnh đường Tô Hoa rất đẹp, có thật không?",
       "py": "Liángjiè: Tīngshuō sūhuāgōnglù de fēngjǐng hěn měi, shì zhēnde ma?"
      },
      {
       "hz": "美心：是真的，可是下大雨的時候，那條路比較危險。",
       "vi": "Mỹ Tâm: Thật đấy, nhưng lúc mưa to thì con đường đó khá nguy hiểm.",
       "py": "Měixīn: Shì zhēnde, kěshì xià dàyǔ de shíhòu, nàtiáo lù bǐjiào wéixiǎn."
      },
      {
       "hz": "A：你忙了一天，累了吧？",
       "vi": "A: Bạn bận cả ngày rồi, mệt rồi nhỉ?",
       "py": "A: Nǐ máng le yìtiān, lèi le ba?"
      },
      {
       "hz": "A：中文很重要，把中文學好了，比較容易找工作。",
       "vi": "A: Tiếng Trung rất quan trọng, học giỏi tiếng Trung thì dễ tìm việc hơn.",
       "py": "A: Zhōngwén hěn zhòngyào, bǎ zhōng wénxué hǎo le, bǐjiào róngyì zhǎo gōngzuò."
      },
      {
       "hz": "A：這支手機買五萬塊，太貴了吧？",
       "vi": "A: Chiếc điện thoại này mua năm vạn đồng, đắt quá nhỉ?",
       "py": "A: Zhè zhī shǒujī mǎi wǔwànkuài, tàiguì le ba?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "是 + tính từ — đúng là…",
   "giaiThich": "Tính từ (美, 漂亮, 年輕…) vốn không cần 是, nhưng thêm 是 khi người nói muốn xác nhận hoặc nhấn mạnh."
  },
  {
   "title": "V. V光(了) nothing left, used up",
   "points": [
    {
     "label": null,
     "formula": "The “光” here serves as a verb complement denoting “running out” or ”nothing left.”, and sometimes it suggests a sense of regret and disappointment. It often collocates with “把”, ie: “把錢用光了”and",
     "examples": [
      {
       "hz": "弟弟把我的巧克力都吃光了，讓我很生氣。2. 時間很晚了，咖啡館的客人差不多都走光了。3. 要是你一下子就把獎學金用光，下個月就沒錢付房租了。",
       "vi": "Em trai ăn hết sạch sô-cô-la của tôi, khiến tôi rất tức giận. Muộn rồi, khách ở quán cà phê gần như về hết cả. Nếu bạn tiêu hết sạch học bổng ngay một lúc thì tháng sau sẽ không có tiền trả tiền thuê nhà.",
       "py": "Dìdi bǎ wǒ de qiǎokèlì dōu chīguāng le, ràng wǒ hěn shēngqì. 2. Shíjiān hěn wǎn le, kāfēiguǎn de kèrén chàbuduō dōu zǒu guāng le. 3. Yàoshì nǐ yíxiàzi jiù bǎ jiǎngxuéjīn yòngguāng, xiàgèyuè jiù méi qián fù fángzū le."
      },
      {
       "hz": "「弟弟把糖吃光了」✔　「我把功課寫光了」✘",
       "vi": "Có thể nói “弟弟把糖吃光了” (em trai ăn hết sạch kẹo), nhưng không thể nói “我把功課寫光了”.",
       "py": "“Dìdi bǎ táng chīguāng le” ✔ “wǒ bǎ gōngkè xiě guāng le” ✘"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 光(了) — hết sạch",
   "giaiThich": "光 làm bổ ngữ, nghĩa \"hết sạch, không còn gì\", đôi khi kèm sắc thái tiếc nuối. Hay đi với 把 (把錢用光了 — tiêu sạch tiền)."
  },
  {
   "title": "VI. 一點兒＋都/也＋Neg＋Vs",
   "points": [
    {
     "label": null,
     "formula": "The expression“一點兒都/也不\" shows strong negation, often followed by verbs or state verbs to emphasize the subject is not in a certain status at all.",
     "examples": [
      {
       "hz": "這杯珍珠奶茶是無糖的，一點兒都不甜。2. 網路訂票一點兒也不難，你可以自己上網試試看。 3. 我跟他一點兒都不熟，為什麼要一起去KTV唱歌呢？",
       "vi": "Cốc trà sữa trân châu này không đường, không ngọt chút nào. Đặt vé qua mạng không khó chút nào, bạn có thể tự lên mạng thử xem. Tôi với anh ấy không thân chút nào, sao phải cùng đi hát karaoke chứ?",
       "py": "Zhè bēi zhēnzhūnǎichá shì wú táng de, yìdiǎn'ér dōu bù tián. 2. Wǎnglù dìngpiào yìdiǎn'ér yě bùnán, nǐ kěyǐ zìjǐ shàngwǎng shìshìkàn. 3. Wǒ gēn tā yìdiǎn'ér dōu bù shú, wèishénme yào yìqǐ qù KTV chànggē ne?"
      },
      {
       "hz": "王太太：你兒子在美國留學，你擔心嗎？",
       "vi": "Bà Vương: Con trai chị du học ở Mỹ, chị có lo không?",
       "py": "Wáng tàitai: Nǐ érzi zài Měiguó liúxué, nǐ dānxīn ma?"
      },
      {
       "hz": "台灣人：日本菜辣嗎？我不喜歡吃辣的東西。",
       "vi": "Người Đài Loan: Món Nhật có cay không? Tôi không thích ăn cay.",
       "py": "Táiwānrén: Rìběn cài là ma? Wǒ bù xǐhuān chī là de dōngxī."
      },
      {
       "hz": "A：你為什麼只吃菜，不喝湯？",
       "vi": "A: Sao bạn chỉ ăn rau mà không uống canh?",
       "py": "A: Nǐ wèishénme zhǐ chī cài, bù hētāng?"
      },
      {
       "hz": "文章裡的人計畫春假的時候做什麼？為什麼？",
       "vi": "Người trong bài định làm gì vào kỳ nghỉ xuân? Tại sao?",
       "py": "Wénzhāng lǐ de rén jìhuà chūnjià de shíhòu zuò shénme? Wèishénme?"
      },
      {
       "hz": "他的行李裡面裝了哪些東西？你去旅行的時候，會帶哪些東西？",
       "vi": "Trong hành lý của anh ấy có những gì? Khi đi du lịch bạn sẽ mang theo những gì?",
       "py": "Tā de xínglǐ lǐmiàn zhuāng le nǎxiē dōngxī? Nǐ qù lǚxíng de shíhòu, huì dài nǎxiē dōngxī?"
      },
      {
       "hz": "為什麼他的室友不想參加團體旅遊？",
       "vi": "Tại sao bạn cùng phòng của anh ấy không muốn tham gia tour du lịch theo đoàn?",
       "py": "Wèishénme tā de shìyǒu bùxiǎng cānjiā tuántǐ lǚyóu?"
      },
      {
       "hz": "他上網訂車票都很順利嗎？為什麼？",
       "vi": "Anh ấy đặt vé xe trên mạng có suôn sẻ không? Tại sao?",
       "py": "Tā shàngwǎng dìng chēpiào dōu hěn shùnlì ma? Wèishénme?"
      },
      {
       "hz": "從台北去阿里山，可以怎麼去？",
       "vi": "Từ Đài Bắc đi A Lý Sơn có thể đi bằng cách nào?",
       "py": "Cóng Táiběi qù ālǐshān, kěyǐ zěnme qù?"
      },
      {
       "hz": "他們為什麼要住在嘉義市？那裡有什麼特別的食物？",
       "vi": "Tại sao họ phải ở thành phố Gia Nghĩa? Ở đó có món ăn gì đặc biệt?",
       "py": "Tāmen wèishénme yào zhù zài jiāyìshì? Nàlǐ yǒu shénme tèbié de shíwù?"
      },
      {
       "hz": "為什麼他的室友忽然大叫？",
       "vi": "Tại sao bạn cùng phòng của anh ấy đột nhiên hét lên?",
       "py": "Wèishénme tā de shìyǒu hūrán dàjiào?"
      },
      {
       "hz": "李小姐趁出國時，在機場買了一瓶有名的香水。",
       "vi": "Cô Lý tranh thủ lúc ra nước ngoài, mua một lọ nước hoa nổi tiếng ở sân bay.",
       "py": "Lǐ xiǎojiě chèn chūguóshí, zài jīchǎng mǎi le yìpíng yǒumíng de xiāngshuǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一點兒 + 都/也 + phủ định — một chút cũng không",
   "giaiThich": "Phủ định mạnh: \"hoàn toàn không…\", nhấn mạnh chủ thể không hề ở trạng thái đó."
  },
  {
   "title": "2. 這次社區的中秋節活動辦得",
   "points": [
    {
     "label": null,
     "formula": "(Vs) to succeed, to make it; to be successful",
     "examples": [
      {
       "hz": "到東部的火車票很難訂，我訂了好幾次才成功。",
       "vi": "Vé tàu đi miền đông rất khó đặt, tôi đặt mấy lần mới được.",
       "py": "Dào dōngbù de huǒchēpiào hěn nán dìng, wǒ dìng le hǎo jǐcì cái chénggōng."
      },
      {
       "hz": "很成功，大家都玩得很開心。",
       "vi": "…rất thành công, mọi người đều chơi rất vui.",
       "py": "Hěn chénggōng, dàjiā dōu wán de hěn kāixīn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 成功 và bổ ngữ",
   "giaiThich": "Phần luyện tập nhận xét về mức độ thành công của hoạt động (辦得…)."
  },
  {
   "title": "I. 剛...就... after V1, V2 happened immediately",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates when the situation after “剛” happens, another situation or action occurs right away. It emphasizes the close connection between two situations or actions. If the two clauses has different subjects, the subject of the latter clause should be placed before “就”. 請用提示完成句子。Complete the sentences with given phrases.",
     "examples": [
      {
       "hz": "那個蛋糕剛烤好就被孩子吃光了。 2. 他剛搬進宿舍，無線網路就壞了。3. 他剛畢業就找到了一份好工作，真是太幸運了！",
       "vi": "Cái bánh kem đó vừa nướng xong đã bị bọn trẻ ăn hết sạch. Anh ấy vừa dọn vào ký túc xá thì wifi hỏng. Anh ấy vừa tốt nghiệp đã tìm được một công việc tốt, thật là may mắn!",
       "py": "Nàge dàngāo gāng kǎo hǎo jiù bèi háizi chīguāng le. 2. Tā gāng bānjìn sùshè, wúxiànwǎng lù jiù huài le. 3. Tā gāng bìyè jiù zhǎodào le yífèn hǎo gōngzuò, zhēnshìtài xìngyùn le!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "剛… 就… — vừa mới… đã…",
   "giaiThich": "Việc sau 剛 vừa xảy ra thì việc sau 就 đến ngay, nhấn mạnh hai việc nối nhau rất sát."
  },
  {
   "title": "II. 趁(著) seize the moment, take advantage of...",
   "points": [
    {
     "label": null,
     "formula": "The expression \"趁著\" means taking advantage of a certain chance or time to do something beneficial to oneself. \"趁\" can be followed by nouns, verb phrases, and intransitive state verbs, etc.",
     "examples": [
      {
       "hz": "媽媽趁(著)好天氣，把髒衣服都洗了。2. 張先生趁著到花蓮旅行時，買了一些當地的名產。3. 他趁著去法國留學的時候,參觀了有名的博物館。",
       "vi": "Mẹ tranh thủ trời đẹp giặt hết quần áo bẩn. Anh Trương nhân dịp đi du lịch Hoa Liên đã mua một ít đặc sản địa phương. Anh ấy tranh thủ lúc du học ở Pháp để tham quan các bảo tàng nổi tiếng.",
       "py": "Māma chèn (zhe) hǎo tiānqì, bǎ zàng yīfú dōu xǐ le. 2. Zhāng xiānshēng chèn zhe dào Huālián lǚxíng shí, mǎi le yìxiē dāngdì de míngchǎn. 3. Tā chèn zhe qù Fǎguó liúxué de shíhòu, cānguān le yǒumíng de bówùguǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "趁(著) — nhân lúc, tranh thủ",
   "giaiThich": "Nghĩa \"nhân lúc, tranh thủ cơ hội\" để làm việc có lợi. Sau 趁 có thể là danh từ, cụm động từ hoặc tính từ."
  },
  {
   "title": "1. 做一個旅遊計畫",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這個計畫應該包含：(1)出發日期、去的地方、費用、交通工具、住的地方...(2)畫一張旅行的地圖，從哪裡到哪裡？",
       "vi": "Kế hoạch này cần có: (1) ngày khởi hành, nơi đến, chi phí, phương tiện đi lại, chỗ ở… (2) vẽ một bản đồ chuyến đi: từ đâu đến đâu?",
       "py": "Zhège jìhuà yīnggāi bāohán: (1) chūfā rìqí, qù de dìfāng, fèiyòng, jiāotōnggōngjù, zhù de dìfāng... (2) huà yìzhāng lǚxíng de dìtú, cóng nǎlǐ dào nǎlǐ?"
      },
      {
       "hz": "怎麼去？為什麼值得去？",
       "vi": "Đi bằng cách nào? Tại sao đáng để đi?",
       "py": "Zěnme qù? Wèishénme zhíde qù?"
      },
      {
       "hz": "跟大家做一個口頭報告。",
       "vi": "Thuyết trình trước cả lớp.",
       "py": "Gēn dàjiā zuò yígè kǒutóubàogào."
      },
      {
       "hz": "風景區的名字費用(車票、旅館...)特別的食物/風景...",
       "vi": "Tên khu danh thắng · Chi phí (vé xe, khách sạn…) · Món ăn / phong cảnh đặc biệt…",
       "py": "Fēngjǐngqū de míngzì fèiyòng (chēpiào, lǚguǎn...) tèbié de shíwù / fēngjǐng..."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: lập kế hoạch du lịch",
   "giaiThich": "Phần luyện nói/viết theo chủ đề lên kế hoạch đi chơi."
  },
  {
   "title": "2. 練習上網訂票",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請老師找一個主題，例如要去花蓮的民宿住兩天，或是要買去台南的火車票，讓學生用自己的手機上網訂位、訂票，完成老師指定的任務。",
       "vi": "Thầy cô chọn một chủ đề, ví dụ đặt phòng nhà nghỉ ở Hoa Liên hai đêm, hoặc mua vé tàu đi Đài Nam, để học sinh dùng điện thoại của mình lên mạng đặt chỗ, đặt vé, hoàn thành nhiệm vụ thầy cô giao.",
       "py": "Qǐng lǎoshī zhǎo yígè zhǔtí, lìrú yào qù Huālián de mínsù zhù liǎngtiān, huòshì yào mǎi qù Táinán de huǒchēpiào, ràng xuéshēng yòng zìjǐ de shǒujī shàngwǎng dìngwèi, dìngpiào, wánchéng lǎoshī zhǐdìng de rènwù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: đặt vé trên mạng",
   "giaiThich": "Phần luyện tập thao tác đặt vé qua mạng."
  }
 ],
 "td2-7.3": [
  {
   "title": "I. 不但...還... not only...but also...",
   "points": [
    {
     "label": null,
     "formula": "In addition to the situation after \"不但\", the speaker lays more stress on the situation after \"還\". In this pattern, the first subject should be consistent with the second one.",
     "examples": [
      {
       "hz": "我去夜市，不但要吃雞排，還要吃蚵仔煎。 2. 那個印尼學生不但會說中文，還會寫很多中國字。 3. 這家民宿不但有免費的無線網路，還有游泳池呢！",
       "vi": "Tôi đi chợ đêm, không những muốn ăn gà rán miếng mà còn muốn ăn trứng chiên hàu. Cậu học sinh Indonesia đó không những biết nói tiếng Trung mà còn biết viết rất nhiều chữ Hán. Nhà nghỉ này không những có wifi miễn phí mà còn có cả bể bơi nữa!",
       "py": "Wǒ qù yèshì, búdàn yào chī jī pái, háiyào chī hé zǎi jiān. 2. Nàge Yìnní xuéshēng búdàn huì shuō zhōngwén, hái huì xiě hěnduō Zhōngguó zì. 3. Zhèjiā mínsù búdàn yǒu miǎnfèi de wúxiànwǎng lù, háiyǒu yóuyǒngchí ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不但… 還… — không những… mà còn…",
   "giaiThich": "Ý nhấn mạnh nằm ở vế sau 還. Hai vế phải cùng một chủ ngữ."
  },
  {
   "title": "II. 一＋M (＋N)＋都/也＋Neg (+Vaux)＋V",
   "points": [
    {
     "label": null,
     "formula": "emphatic negation with一＋M(＋N)＋都/也＋Neg(+Vaux)＋V The pattern \"一M都/也 不(沒)\" indicates \"there is not any...\" or \"don't want any...\" , and shows a strange and unexpected situation with a bit of exaggeration.",
     "examples": [
      {
       "hz": "我等了一個小時，一班車都沒來。 2. 我忘了帶錢包，現在一毛(錢)都沒有。 3. 這裡一家醫院也沒有，要是生病了就很麻煩。4. 那個學生不愛上課，一個字都不願意寫，所以老師很生氣。",
       "vi": "Tôi đợi một tiếng mà không có chuyến xe nào đến. Tôi quên mang ví, bây giờ một xu cũng không có. Ở đây một bệnh viện cũng không có, lỡ bị ốm thì rất phiền. Cậu học sinh đó không thích đi học, một chữ cũng không chịu viết, nên thầy giáo rất tức giận.",
       "py": "Wǒ děng le yígè xiǎoshí, yì bānchē dōu méi lái. 2. Wǒ wàng le dài qiánbāo, xiànzài yì máo (qián) dōu méiyǒu. 3. Zhèlǐ yìjiā yīyuàn yě méiyǒu, yàoshì shēngbìng le jiù hěn máfán. 4. Nàge xuéshēng bú ài shàngkè, yígè zì dōu bú yuànyì xiě, suǒyǐ lǎoshī hěn shēngqì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一 + lượng từ + 都/也 + phủ định — một… cũng không",
   "giaiThich": "Nhấn mạnh phủ định tuyệt đối: \"một… cũng không\", mang chút cường điệu, thể hiện tình huống bất ngờ."
  },
  {
   "title": "III. 讓 (客氣地) to make, to let; to allow, to permit",
   "points": [
    {
     "label": null,
     "formula": "(1) This “讓” functions as a verb. There are different usages of 讓, such as “to make” and “to let”, ie： “有的KTV還有好玩的樂器,讓客人唱得更開心。(to make) (L6)” and the dialogue in this lesson, “讓美心請客吧。” (to let). The “讓(to let)” is more polite than “叫” or “要”, ie：“老師叫你去辦公室找他” is an order while “老師讓你去辦公室找他” is a polite expression. (2) “讓” also indicates to permit and to allow somebody to do something, ie：“父母讓我一個人在學校附近租房子。” and “我不舒服,老闆讓我回家休息。”",
     "examples": [
      {
       "hz": "他上班常遲到,工作也做不好，所以老闆讓/叫/要他明天別來上班了。",
       "vi": "Anh ấy hay đi làm muộn, làm việc cũng không tốt, nên ông chủ bảo anh ấy ngày mai đừng đến làm nữa.",
       "py": "Tā shàngbān cháng chídào, gōngzuò yě zuò bùhǎo, suǒyǐ lǎobǎn ràng / jiào / yào tā míngtiān bié lái shàngbān le."
      },
      {
       "hz": "陳小姐讓/叫/要男朋友在樓下等一下，因為她還沒選好要穿哪件衣服。",
       "vi": "Cô Trần bảo bạn trai đợi dưới nhà một chút, vì cô ấy vẫn chưa chọn xong nên mặc bộ nào.",
       "py": "Chén xiǎojiě ràng / jiào / yào nánpéngyǒu zài lóuxià děng yíxià, yīnwèi tā hái méi xuǎn hǎo yào chuān nǎ jiàn yīfú."
      },
      {
       "hz": "A：今天我忘了帶錢,讓你請吃午餐,可以嗎?",
       "vi": "A: Hôm nay tôi quên mang tiền, để bạn mời bữa trưa được không?",
       "py": "A: Jīntiān wǒ wàng le dài qián, ràng nǐ qǐngchī wǔcān, kěyǐ ma?"
      },
      {
       "hz": "B：沒問題，你想吃什麼？我讓餐廳老闆送過來。",
       "vi": "B: Không vấn đề gì, bạn muốn ăn gì? Tôi bảo chủ nhà hàng mang qua.",
       "py": "B: Méi wèntí, nǐ xiǎng chī shénme? Wǒ ràng cāntīng lǎobǎn sòngguòlái."
      },
      {
       "hz": "客人：這些菜吃不完，可不可以讓我帶回家?",
       "vi": "Khách: Những món này ăn không hết, cho tôi mang về được không?",
       "py": "Kèrén: Zhèxiē cài chībùwán, kěbùkěyǐ ràng wǒ dàihuíjiā?"
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "先生：這個週末我們一起去阿里山露營，好嗎？",
       "vi": "Chồng: Cuối tuần này mình cùng đi cắm trại ở A Lý Sơn nhé?",
       "py": "Xiānshēng: Zhège zhōumò wǒmen yìqǐ qù ālǐshān lùyíng, hǎo ma?"
      },
      {
       "hz": "爸爸：大學畢業以後，你最好出國留學。",
       "vi": "Bố: Tốt nghiệp đại học xong, tốt nhất con nên ra nước ngoài du học.",
       "py": "Bàba: Dàxuébìyè yǐhòu, nǐ zuìhǎo chūguó liúxué."
      },
      {
       "hz": "病人：我的頭不疼了，為什麼不讓我回家呢？",
       "vi": "Bệnh nhân: Đầu tôi hết đau rồi, sao không cho tôi về nhà?",
       "py": "Bìngrén: Wǒ de tóu bù téng le, wèishénme búràng wǒ huíjiā ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — để cho, nhường (lịch sự)",
   "giaiThich": "讓 làm động từ với nhiều nghĩa: \"khiến cho\" và \"để cho, nhường\" (ví dụ 讓美心請客吧 — để Mỹ Tâm mời nhé)."
  },
  {
   "title": "IV. 是…... (＋Adv)＋Vs It is indeed true that...",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, intransitive state verbs, such as \"美\"、\"漂亮\"、\"年輕\", etc., do not have to come after \"是\". However, \"是\" can added when the speaker wants to confirm or emphasize the degree of Vs.",
     "examples": [
      {
       "hz": "A：我覺得王小姐比以前漂亮多了。",
       "vi": "A: Tôi thấy cô Vương xinh hơn trước nhiều.",
       "py": "A: Wǒ juéde Wáng xiǎojiě bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "B：她是比以前漂亮多了。",
       "vi": "B: Cô ấy đúng là xinh hơn trước nhiều.",
       "py": "B: Tā shì bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "A：外國人都覺得中國字很難寫，你覺得呢？",
       "vi": "A: Người nước ngoài đều thấy chữ Hán rất khó viết, bạn thấy sao?",
       "py": "A: Wàiguórén dōu juéde Zhōngguó zì hěn nán xiě, nǐ juéde ne?"
      },
      {
       "hz": "B：是有點兒難寫，可是多練習幾次就好了。",
       "vi": "B: Đúng là hơi khó viết, nhưng luyện vài lần là được.",
       "py": "B: Shì yǒudiǎn'ér nán xiě, kěshì duō liànxí jǐcì jiù hǎo le."
      },
      {
       "hz": "良介：聽說蘇花公路的風景很美，是真的嗎？",
       "vi": "Ryosuke: Nghe nói phong cảnh đường Tô Hoa rất đẹp, có thật không?",
       "py": "Liángjiè: Tīngshuō sūhuāgōnglù de fēngjǐng hěn měi, shì zhēnde ma?"
      },
      {
       "hz": "美心：是真的，可是下大雨的時候，那條路比較危險。",
       "vi": "Mỹ Tâm: Thật đấy, nhưng lúc mưa to thì con đường đó khá nguy hiểm.",
       "py": "Měixīn: Shì zhēnde, kěshì xià dàyǔ de shíhòu, nàtiáo lù bǐjiào wéixiǎn."
      },
      {
       "hz": "A：你忙了一天，累了吧？",
       "vi": "A: Bạn bận cả ngày rồi, mệt rồi nhỉ?",
       "py": "A: Nǐ máng le yìtiān, lèi le ba?"
      },
      {
       "hz": "A：中文很重要，把中文學好了，比較容易找工作。",
       "vi": "A: Tiếng Trung rất quan trọng, học giỏi tiếng Trung thì dễ tìm việc hơn.",
       "py": "A: Zhōngwén hěn zhòngyào, bǎ zhōng wénxué hǎo le, bǐjiào róngyì zhǎo gōngzuò."
      },
      {
       "hz": "A：這支手機買五萬塊，太貴了吧？",
       "vi": "A: Chiếc điện thoại này mua năm vạn đồng, đắt quá nhỉ?",
       "py": "A: Zhè zhī shǒujī mǎi wǔwànkuài, tàiguì le ba?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "是 + tính từ — đúng là…",
   "giaiThich": "Tính từ (美, 漂亮, 年輕…) vốn không cần 是, nhưng thêm 是 khi người nói muốn xác nhận hoặc nhấn mạnh."
  },
  {
   "title": "V. V光(了) nothing left, used up",
   "points": [
    {
     "label": null,
     "formula": "The “光” here serves as a verb complement denoting “running out” or ”nothing left.”, and sometimes it suggests a sense of regret and disappointment. It often collocates with “把”, ie: “把錢用光了”and",
     "examples": [
      {
       "hz": "弟弟把我的巧克力都吃光了，讓我很生氣。2. 時間很晚了，咖啡館的客人差不多都走光了。3. 要是你一下子就把獎學金用光，下個月就沒錢付房租了。",
       "vi": "Em trai ăn hết sạch sô-cô-la của tôi, khiến tôi rất tức giận. Muộn rồi, khách ở quán cà phê gần như về hết cả. Nếu bạn tiêu hết sạch học bổng ngay một lúc thì tháng sau sẽ không có tiền trả tiền thuê nhà.",
       "py": "Dìdi bǎ wǒ de qiǎokèlì dōu chīguāng le, ràng wǒ hěn shēngqì. 2. Shíjiān hěn wǎn le, kāfēiguǎn de kèrén chàbuduō dōu zǒu guāng le. 3. Yàoshì nǐ yíxiàzi jiù bǎ jiǎngxuéjīn yòngguāng, xiàgèyuè jiù méi qián fù fángzū le."
      },
      {
       "hz": "「弟弟把糖吃光了」✔　「我把功課寫光了」✘",
       "vi": "Có thể nói “弟弟把糖吃光了” (em trai ăn hết sạch kẹo), nhưng không thể nói “我把功課寫光了”.",
       "py": "“Dìdi bǎ táng chīguāng le” ✔ “wǒ bǎ gōngkè xiě guāng le” ✘"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 光(了) — hết sạch",
   "giaiThich": "光 làm bổ ngữ, nghĩa \"hết sạch, không còn gì\", đôi khi kèm sắc thái tiếc nuối. Hay đi với 把 (把錢用光了 — tiêu sạch tiền)."
  },
  {
   "title": "VI. 一點兒＋都/也＋Neg＋Vs",
   "points": [
    {
     "label": null,
     "formula": "The expression“一點兒都/也不\" shows strong negation, often followed by verbs or state verbs to emphasize the subject is not in a certain status at all.",
     "examples": [
      {
       "hz": "這杯珍珠奶茶是無糖的，一點兒都不甜。2. 網路訂票一點兒也不難，你可以自己上網試試看。 3. 我跟他一點兒都不熟，為什麼要一起去KTV唱歌呢？",
       "vi": "Cốc trà sữa trân châu này không đường, không ngọt chút nào. Đặt vé qua mạng không khó chút nào, bạn có thể tự lên mạng thử xem. Tôi với anh ấy không thân chút nào, sao phải cùng đi hát karaoke chứ?",
       "py": "Zhè bēi zhēnzhūnǎichá shì wú táng de, yìdiǎn'ér dōu bù tián. 2. Wǎnglù dìngpiào yìdiǎn'ér yě bùnán, nǐ kěyǐ zìjǐ shàngwǎng shìshìkàn. 3. Wǒ gēn tā yìdiǎn'ér dōu bù shú, wèishénme yào yìqǐ qù KTV chànggē ne?"
      },
      {
       "hz": "王太太：你兒子在美國留學，你擔心嗎？",
       "vi": "Bà Vương: Con trai chị du học ở Mỹ, chị có lo không?",
       "py": "Wáng tàitai: Nǐ érzi zài Měiguó liúxué, nǐ dānxīn ma?"
      },
      {
       "hz": "台灣人：日本菜辣嗎？我不喜歡吃辣的東西。",
       "vi": "Người Đài Loan: Món Nhật có cay không? Tôi không thích ăn cay.",
       "py": "Táiwānrén: Rìběn cài là ma? Wǒ bù xǐhuān chī là de dōngxī."
      },
      {
       "hz": "A：你為什麼只吃菜，不喝湯？",
       "vi": "A: Sao bạn chỉ ăn rau mà không uống canh?",
       "py": "A: Nǐ wèishénme zhǐ chī cài, bù hētāng?"
      },
      {
       "hz": "文章裡的人計畫春假的時候做什麼？為什麼？",
       "vi": "Người trong bài định làm gì vào kỳ nghỉ xuân? Tại sao?",
       "py": "Wénzhāng lǐ de rén jìhuà chūnjià de shíhòu zuò shénme? Wèishénme?"
      },
      {
       "hz": "他的行李裡面裝了哪些東西？你去旅行的時候，會帶哪些東西？",
       "vi": "Trong hành lý của anh ấy có những gì? Khi đi du lịch bạn sẽ mang theo những gì?",
       "py": "Tā de xínglǐ lǐmiàn zhuāng le nǎxiē dōngxī? Nǐ qù lǚxíng de shíhòu, huì dài nǎxiē dōngxī?"
      },
      {
       "hz": "為什麼他的室友不想參加團體旅遊？",
       "vi": "Tại sao bạn cùng phòng của anh ấy không muốn tham gia tour du lịch theo đoàn?",
       "py": "Wèishénme tā de shìyǒu bùxiǎng cānjiā tuántǐ lǚyóu?"
      },
      {
       "hz": "他上網訂車票都很順利嗎？為什麼？",
       "vi": "Anh ấy đặt vé xe trên mạng có suôn sẻ không? Tại sao?",
       "py": "Tā shàngwǎng dìng chēpiào dōu hěn shùnlì ma? Wèishénme?"
      },
      {
       "hz": "從台北去阿里山，可以怎麼去？",
       "vi": "Từ Đài Bắc đi A Lý Sơn có thể đi bằng cách nào?",
       "py": "Cóng Táiběi qù ālǐshān, kěyǐ zěnme qù?"
      },
      {
       "hz": "他們為什麼要住在嘉義市？那裡有什麼特別的食物？",
       "vi": "Tại sao họ phải ở thành phố Gia Nghĩa? Ở đó có món ăn gì đặc biệt?",
       "py": "Tāmen wèishénme yào zhù zài jiāyìshì? Nàlǐ yǒu shénme tèbié de shíwù?"
      },
      {
       "hz": "為什麼他的室友忽然大叫？",
       "vi": "Tại sao bạn cùng phòng của anh ấy đột nhiên hét lên?",
       "py": "Wèishénme tā de shìyǒu hūrán dàjiào?"
      },
      {
       "hz": "李小姐趁出國時，在機場買了一瓶有名的香水。",
       "vi": "Cô Lý tranh thủ lúc ra nước ngoài, mua một lọ nước hoa nổi tiếng ở sân bay.",
       "py": "Lǐ xiǎojiě chèn chūguóshí, zài jīchǎng mǎi le yìpíng yǒumíng de xiāngshuǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一點兒 + 都/也 + phủ định — một chút cũng không",
   "giaiThich": "Phủ định mạnh: \"hoàn toàn không…\", nhấn mạnh chủ thể không hề ở trạng thái đó."
  },
  {
   "title": "2. 這次社區的中秋節活動辦得",
   "points": [
    {
     "label": null,
     "formula": "(Vs) to succeed, to make it; to be successful",
     "examples": [
      {
       "hz": "到東部的火車票很難訂，我訂了好幾次才成功。",
       "vi": "Vé tàu đi miền đông rất khó đặt, tôi đặt mấy lần mới được.",
       "py": "Dào dōngbù de huǒchēpiào hěn nán dìng, wǒ dìng le hǎo jǐcì cái chénggōng."
      },
      {
       "hz": "很成功，大家都玩得很開心。",
       "vi": "…rất thành công, mọi người đều chơi rất vui.",
       "py": "Hěn chénggōng, dàjiā dōu wán de hěn kāixīn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 成功 và bổ ngữ",
   "giaiThich": "Phần luyện tập nhận xét về mức độ thành công của hoạt động (辦得…)."
  },
  {
   "title": "I. 剛...就... after V1, V2 happened immediately",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates when the situation after “剛” happens, another situation or action occurs right away. It emphasizes the close connection between two situations or actions. If the two clauses has different subjects, the subject of the latter clause should be placed before “就”. 請用提示完成句子。Complete the sentences with given phrases.",
     "examples": [
      {
       "hz": "那個蛋糕剛烤好就被孩子吃光了。 2. 他剛搬進宿舍，無線網路就壞了。3. 他剛畢業就找到了一份好工作，真是太幸運了！",
       "vi": "Cái bánh kem đó vừa nướng xong đã bị bọn trẻ ăn hết sạch. Anh ấy vừa dọn vào ký túc xá thì wifi hỏng. Anh ấy vừa tốt nghiệp đã tìm được một công việc tốt, thật là may mắn!",
       "py": "Nàge dàngāo gāng kǎo hǎo jiù bèi háizi chīguāng le. 2. Tā gāng bānjìn sùshè, wúxiànwǎng lù jiù huài le. 3. Tā gāng bìyè jiù zhǎodào le yífèn hǎo gōngzuò, zhēnshìtài xìngyùn le!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "剛… 就… — vừa mới… đã…",
   "giaiThich": "Việc sau 剛 vừa xảy ra thì việc sau 就 đến ngay, nhấn mạnh hai việc nối nhau rất sát."
  },
  {
   "title": "II. 趁(著) seize the moment, take advantage of...",
   "points": [
    {
     "label": null,
     "formula": "The expression \"趁著\" means taking advantage of a certain chance or time to do something beneficial to oneself. \"趁\" can be followed by nouns, verb phrases, and intransitive state verbs, etc.",
     "examples": [
      {
       "hz": "媽媽趁(著)好天氣，把髒衣服都洗了。2. 張先生趁著到花蓮旅行時，買了一些當地的名產。3. 他趁著去法國留學的時候,參觀了有名的博物館。",
       "vi": "Mẹ tranh thủ trời đẹp giặt hết quần áo bẩn. Anh Trương nhân dịp đi du lịch Hoa Liên đã mua một ít đặc sản địa phương. Anh ấy tranh thủ lúc du học ở Pháp để tham quan các bảo tàng nổi tiếng.",
       "py": "Māma chèn (zhe) hǎo tiānqì, bǎ zàng yīfú dōu xǐ le. 2. Zhāng xiānshēng chèn zhe dào Huālián lǚxíng shí, mǎi le yìxiē dāngdì de míngchǎn. 3. Tā chèn zhe qù Fǎguó liúxué de shíhòu, cānguān le yǒumíng de bówùguǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "趁(著) — nhân lúc, tranh thủ",
   "giaiThich": "Nghĩa \"nhân lúc, tranh thủ cơ hội\" để làm việc có lợi. Sau 趁 có thể là danh từ, cụm động từ hoặc tính từ."
  },
  {
   "title": "1. 做一個旅遊計畫",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這個計畫應該包含：(1)出發日期、去的地方、費用、交通工具、住的地方...(2)畫一張旅行的地圖，從哪裡到哪裡？",
       "vi": "Kế hoạch này cần có: (1) ngày khởi hành, nơi đến, chi phí, phương tiện đi lại, chỗ ở… (2) vẽ một bản đồ chuyến đi: từ đâu đến đâu?",
       "py": "Zhège jìhuà yīnggāi bāohán: (1) chūfā rìqí, qù de dìfāng, fèiyòng, jiāotōnggōngjù, zhù de dìfāng... (2) huà yìzhāng lǚxíng de dìtú, cóng nǎlǐ dào nǎlǐ?"
      },
      {
       "hz": "怎麼去？為什麼值得去？",
       "vi": "Đi bằng cách nào? Tại sao đáng để đi?",
       "py": "Zěnme qù? Wèishénme zhíde qù?"
      },
      {
       "hz": "跟大家做一個口頭報告。",
       "vi": "Thuyết trình trước cả lớp.",
       "py": "Gēn dàjiā zuò yígè kǒutóubàogào."
      },
      {
       "hz": "風景區的名字費用(車票、旅館...)特別的食物/風景...",
       "vi": "Tên khu danh thắng · Chi phí (vé xe, khách sạn…) · Món ăn / phong cảnh đặc biệt…",
       "py": "Fēngjǐngqū de míngzì fèiyòng (chēpiào, lǚguǎn...) tèbié de shíwù / fēngjǐng..."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: lập kế hoạch du lịch",
   "giaiThich": "Phần luyện nói/viết theo chủ đề lên kế hoạch đi chơi."
  },
  {
   "title": "2. 練習上網訂票",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請老師找一個主題，例如要去花蓮的民宿住兩天，或是要買去台南的火車票，讓學生用自己的手機上網訂位、訂票，完成老師指定的任務。",
       "vi": "Thầy cô chọn một chủ đề, ví dụ đặt phòng nhà nghỉ ở Hoa Liên hai đêm, hoặc mua vé tàu đi Đài Nam, để học sinh dùng điện thoại của mình lên mạng đặt chỗ, đặt vé, hoàn thành nhiệm vụ thầy cô giao.",
       "py": "Qǐng lǎoshī zhǎo yígè zhǔtí, lìrú yào qù Huālián de mínsù zhù liǎngtiān, huòshì yào mǎi qù Táinán de huǒchēpiào, ràng xuéshēng yòng zìjǐ de shǒujī shàngwǎng dìngwèi, dìngpiào, wánchéng lǎoshī zhǐdìng de rènwù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: đặt vé trên mạng",
   "giaiThich": "Phần luyện tập thao tác đặt vé qua mạng."
  }
 ],
 "td2-7.4": [
  {
   "title": "I. 不但...還... not only...but also...",
   "points": [
    {
     "label": null,
     "formula": "In addition to the situation after \"不但\", the speaker lays more stress on the situation after \"還\". In this pattern, the first subject should be consistent with the second one.",
     "examples": [
      {
       "hz": "我去夜市，不但要吃雞排，還要吃蚵仔煎。 2. 那個印尼學生不但會說中文，還會寫很多中國字。 3. 這家民宿不但有免費的無線網路，還有游泳池呢！",
       "vi": "Tôi đi chợ đêm, không những muốn ăn gà rán miếng mà còn muốn ăn trứng chiên hàu. Cậu học sinh Indonesia đó không những biết nói tiếng Trung mà còn biết viết rất nhiều chữ Hán. Nhà nghỉ này không những có wifi miễn phí mà còn có cả bể bơi nữa!",
       "py": "Wǒ qù yèshì, búdàn yào chī jī pái, háiyào chī hé zǎi jiān. 2. Nàge Yìnní xuéshēng búdàn huì shuō zhōngwén, hái huì xiě hěnduō Zhōngguó zì. 3. Zhèjiā mínsù búdàn yǒu miǎnfèi de wúxiànwǎng lù, háiyǒu yóuyǒngchí ne!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "不但… 還… — không những… mà còn…",
   "giaiThich": "Ý nhấn mạnh nằm ở vế sau 還. Hai vế phải cùng một chủ ngữ."
  },
  {
   "title": "II. 一＋M (＋N)＋都/也＋Neg (+Vaux)＋V",
   "points": [
    {
     "label": null,
     "formula": "emphatic negation with一＋M(＋N)＋都/也＋Neg(+Vaux)＋V The pattern \"一M都/也 不(沒)\" indicates \"there is not any...\" or \"don't want any...\" , and shows a strange and unexpected situation with a bit of exaggeration.",
     "examples": [
      {
       "hz": "我等了一個小時，一班車都沒來。 2. 我忘了帶錢包，現在一毛(錢)都沒有。 3. 這裡一家醫院也沒有，要是生病了就很麻煩。4. 那個學生不愛上課，一個字都不願意寫，所以老師很生氣。",
       "vi": "Tôi đợi một tiếng mà không có chuyến xe nào đến. Tôi quên mang ví, bây giờ một xu cũng không có. Ở đây một bệnh viện cũng không có, lỡ bị ốm thì rất phiền. Cậu học sinh đó không thích đi học, một chữ cũng không chịu viết, nên thầy giáo rất tức giận.",
       "py": "Wǒ děng le yígè xiǎoshí, yì bānchē dōu méi lái. 2. Wǒ wàng le dài qiánbāo, xiànzài yì máo (qián) dōu méiyǒu. 3. Zhèlǐ yìjiā yīyuàn yě méiyǒu, yàoshì shēngbìng le jiù hěn máfán. 4. Nàge xuéshēng bú ài shàngkè, yígè zì dōu bú yuànyì xiě, suǒyǐ lǎoshī hěn shēngqì."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一 + lượng từ + 都/也 + phủ định — một… cũng không",
   "giaiThich": "Nhấn mạnh phủ định tuyệt đối: \"một… cũng không\", mang chút cường điệu, thể hiện tình huống bất ngờ."
  },
  {
   "title": "III. 讓 (客氣地) to make, to let; to allow, to permit",
   "points": [
    {
     "label": null,
     "formula": "(1) This “讓” functions as a verb. There are different usages of 讓, such as “to make” and “to let”, ie： “有的KTV還有好玩的樂器,讓客人唱得更開心。(to make) (L6)” and the dialogue in this lesson, “讓美心請客吧。” (to let). The “讓(to let)” is more polite than “叫” or “要”, ie：“老師叫你去辦公室找他” is an order while “老師讓你去辦公室找他” is a polite expression. (2) “讓” also indicates to permit and to allow somebody to do something, ie：“父母讓我一個人在學校附近租房子。” and “我不舒服,老闆讓我回家休息。”",
     "examples": [
      {
       "hz": "他上班常遲到,工作也做不好，所以老闆讓/叫/要他明天別來上班了。",
       "vi": "Anh ấy hay đi làm muộn, làm việc cũng không tốt, nên ông chủ bảo anh ấy ngày mai đừng đến làm nữa.",
       "py": "Tā shàngbān cháng chídào, gōngzuò yě zuò bùhǎo, suǒyǐ lǎobǎn ràng / jiào / yào tā míngtiān bié lái shàngbān le."
      },
      {
       "hz": "陳小姐讓/叫/要男朋友在樓下等一下，因為她還沒選好要穿哪件衣服。",
       "vi": "Cô Trần bảo bạn trai đợi dưới nhà một chút, vì cô ấy vẫn chưa chọn xong nên mặc bộ nào.",
       "py": "Chén xiǎojiě ràng / jiào / yào nánpéngyǒu zài lóuxià děng yíxià, yīnwèi tā hái méi xuǎn hǎo yào chuān nǎ jiàn yīfú."
      },
      {
       "hz": "A：今天我忘了帶錢,讓你請吃午餐,可以嗎?",
       "vi": "A: Hôm nay tôi quên mang tiền, để bạn mời bữa trưa được không?",
       "py": "A: Jīntiān wǒ wàng le dài qián, ràng nǐ qǐngchī wǔcān, kěyǐ ma?"
      },
      {
       "hz": "B：沒問題，你想吃什麼？我讓餐廳老闆送過來。",
       "vi": "B: Không vấn đề gì, bạn muốn ăn gì? Tôi bảo chủ nhà hàng mang qua.",
       "py": "B: Méi wèntí, nǐ xiǎng chī shénme? Wǒ ràng cāntīng lǎobǎn sòngguòlái."
      },
      {
       "hz": "客人：這些菜吃不完，可不可以讓我帶回家?",
       "vi": "Khách: Những món này ăn không hết, cho tôi mang về được không?",
       "py": "Kèrén: Zhèxiē cài chībùwán, kěbùkěyǐ ràng wǒ dàihuíjiā?"
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "先生：這個週末我們一起去阿里山露營，好嗎？",
       "vi": "Chồng: Cuối tuần này mình cùng đi cắm trại ở A Lý Sơn nhé?",
       "py": "Xiānshēng: Zhège zhōumò wǒmen yìqǐ qù ālǐshān lùyíng, hǎo ma?"
      },
      {
       "hz": "爸爸：大學畢業以後，你最好出國留學。",
       "vi": "Bố: Tốt nghiệp đại học xong, tốt nhất con nên ra nước ngoài du học.",
       "py": "Bàba: Dàxuébìyè yǐhòu, nǐ zuìhǎo chūguó liúxué."
      },
      {
       "hz": "病人：我的頭不疼了，為什麼不讓我回家呢？",
       "vi": "Bệnh nhân: Đầu tôi hết đau rồi, sao không cho tôi về nhà?",
       "py": "Bìngrén: Wǒ de tóu bù téng le, wèishénme búràng wǒ huíjiā ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 — để cho, nhường (lịch sự)",
   "giaiThich": "讓 làm động từ với nhiều nghĩa: \"khiến cho\" và \"để cho, nhường\" (ví dụ 讓美心請客吧 — để Mỹ Tâm mời nhé)."
  },
  {
   "title": "IV. 是…... (＋Adv)＋Vs It is indeed true that...",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, intransitive state verbs, such as \"美\"、\"漂亮\"、\"年輕\", etc., do not have to come after \"是\". However, \"是\" can added when the speaker wants to confirm or emphasize the degree of Vs.",
     "examples": [
      {
       "hz": "A：我覺得王小姐比以前漂亮多了。",
       "vi": "A: Tôi thấy cô Vương xinh hơn trước nhiều.",
       "py": "A: Wǒ juéde Wáng xiǎojiě bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "B：她是比以前漂亮多了。",
       "vi": "B: Cô ấy đúng là xinh hơn trước nhiều.",
       "py": "B: Tā shì bǐ yǐqián piàoliàng duō le."
      },
      {
       "hz": "A：外國人都覺得中國字很難寫，你覺得呢？",
       "vi": "A: Người nước ngoài đều thấy chữ Hán rất khó viết, bạn thấy sao?",
       "py": "A: Wàiguórén dōu juéde Zhōngguó zì hěn nán xiě, nǐ juéde ne?"
      },
      {
       "hz": "B：是有點兒難寫，可是多練習幾次就好了。",
       "vi": "B: Đúng là hơi khó viết, nhưng luyện vài lần là được.",
       "py": "B: Shì yǒudiǎn'ér nán xiě, kěshì duō liànxí jǐcì jiù hǎo le."
      },
      {
       "hz": "良介：聽說蘇花公路的風景很美，是真的嗎？",
       "vi": "Ryosuke: Nghe nói phong cảnh đường Tô Hoa rất đẹp, có thật không?",
       "py": "Liángjiè: Tīngshuō sūhuāgōnglù de fēngjǐng hěn měi, shì zhēnde ma?"
      },
      {
       "hz": "美心：是真的，可是下大雨的時候，那條路比較危險。",
       "vi": "Mỹ Tâm: Thật đấy, nhưng lúc mưa to thì con đường đó khá nguy hiểm.",
       "py": "Měixīn: Shì zhēnde, kěshì xià dàyǔ de shíhòu, nàtiáo lù bǐjiào wéixiǎn."
      },
      {
       "hz": "A：你忙了一天，累了吧？",
       "vi": "A: Bạn bận cả ngày rồi, mệt rồi nhỉ?",
       "py": "A: Nǐ máng le yìtiān, lèi le ba?"
      },
      {
       "hz": "A：中文很重要，把中文學好了，比較容易找工作。",
       "vi": "A: Tiếng Trung rất quan trọng, học giỏi tiếng Trung thì dễ tìm việc hơn.",
       "py": "A: Zhōngwén hěn zhòngyào, bǎ zhōng wénxué hǎo le, bǐjiào róngyì zhǎo gōngzuò."
      },
      {
       "hz": "A：這支手機買五萬塊，太貴了吧？",
       "vi": "A: Chiếc điện thoại này mua năm vạn đồng, đắt quá nhỉ?",
       "py": "A: Zhè zhī shǒujī mǎi wǔwànkuài, tàiguì le ba?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "是 + tính từ — đúng là…",
   "giaiThich": "Tính từ (美, 漂亮, 年輕…) vốn không cần 是, nhưng thêm 是 khi người nói muốn xác nhận hoặc nhấn mạnh."
  },
  {
   "title": "V. V光(了) nothing left, used up",
   "points": [
    {
     "label": null,
     "formula": "The “光” here serves as a verb complement denoting “running out” or ”nothing left.”, and sometimes it suggests a sense of regret and disappointment. It often collocates with “把”, ie: “把錢用光了”and",
     "examples": [
      {
       "hz": "弟弟把我的巧克力都吃光了，讓我很生氣。2. 時間很晚了，咖啡館的客人差不多都走光了。3. 要是你一下子就把獎學金用光，下個月就沒錢付房租了。",
       "vi": "Em trai ăn hết sạch sô-cô-la của tôi, khiến tôi rất tức giận. Muộn rồi, khách ở quán cà phê gần như về hết cả. Nếu bạn tiêu hết sạch học bổng ngay một lúc thì tháng sau sẽ không có tiền trả tiền thuê nhà.",
       "py": "Dìdi bǎ wǒ de qiǎokèlì dōu chīguāng le, ràng wǒ hěn shēngqì. 2. Shíjiān hěn wǎn le, kāfēiguǎn de kèrén chàbuduō dōu zǒu guāng le. 3. Yàoshì nǐ yíxiàzi jiù bǎ jiǎngxuéjīn yòngguāng, xiàgèyuè jiù méi qián fù fángzū le."
      },
      {
       "hz": "「弟弟把糖吃光了」✔　「我把功課寫光了」✘",
       "vi": "Có thể nói “弟弟把糖吃光了” (em trai ăn hết sạch kẹo), nhưng không thể nói “我把功課寫光了”.",
       "py": "“Dìdi bǎ táng chīguāng le” ✔ “wǒ bǎ gōngkè xiě guāng le” ✘"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 光(了) — hết sạch",
   "giaiThich": "光 làm bổ ngữ, nghĩa \"hết sạch, không còn gì\", đôi khi kèm sắc thái tiếc nuối. Hay đi với 把 (把錢用光了 — tiêu sạch tiền)."
  },
  {
   "title": "VI. 一點兒＋都/也＋Neg＋Vs",
   "points": [
    {
     "label": null,
     "formula": "The expression“一點兒都/也不\" shows strong negation, often followed by verbs or state verbs to emphasize the subject is not in a certain status at all.",
     "examples": [
      {
       "hz": "這杯珍珠奶茶是無糖的，一點兒都不甜。2. 網路訂票一點兒也不難，你可以自己上網試試看。 3. 我跟他一點兒都不熟，為什麼要一起去KTV唱歌呢？",
       "vi": "Cốc trà sữa trân châu này không đường, không ngọt chút nào. Đặt vé qua mạng không khó chút nào, bạn có thể tự lên mạng thử xem. Tôi với anh ấy không thân chút nào, sao phải cùng đi hát karaoke chứ?",
       "py": "Zhè bēi zhēnzhūnǎichá shì wú táng de, yìdiǎn'ér dōu bù tián. 2. Wǎnglù dìngpiào yìdiǎn'ér yě bùnán, nǐ kěyǐ zìjǐ shàngwǎng shìshìkàn. 3. Wǒ gēn tā yìdiǎn'ér dōu bù shú, wèishénme yào yìqǐ qù KTV chànggē ne?"
      },
      {
       "hz": "王太太：你兒子在美國留學，你擔心嗎？",
       "vi": "Bà Vương: Con trai chị du học ở Mỹ, chị có lo không?",
       "py": "Wáng tàitai: Nǐ érzi zài Měiguó liúxué, nǐ dānxīn ma?"
      },
      {
       "hz": "台灣人：日本菜辣嗎？我不喜歡吃辣的東西。",
       "vi": "Người Đài Loan: Món Nhật có cay không? Tôi không thích ăn cay.",
       "py": "Táiwānrén: Rìběn cài là ma? Wǒ bù xǐhuān chī là de dōngxī."
      },
      {
       "hz": "A：你為什麼只吃菜，不喝湯？",
       "vi": "A: Sao bạn chỉ ăn rau mà không uống canh?",
       "py": "A: Nǐ wèishénme zhǐ chī cài, bù hētāng?"
      },
      {
       "hz": "文章裡的人計畫春假的時候做什麼？為什麼？",
       "vi": "Người trong bài định làm gì vào kỳ nghỉ xuân? Tại sao?",
       "py": "Wénzhāng lǐ de rén jìhuà chūnjià de shíhòu zuò shénme? Wèishénme?"
      },
      {
       "hz": "他的行李裡面裝了哪些東西？你去旅行的時候，會帶哪些東西？",
       "vi": "Trong hành lý của anh ấy có những gì? Khi đi du lịch bạn sẽ mang theo những gì?",
       "py": "Tā de xínglǐ lǐmiàn zhuāng le nǎxiē dōngxī? Nǐ qù lǚxíng de shíhòu, huì dài nǎxiē dōngxī?"
      },
      {
       "hz": "為什麼他的室友不想參加團體旅遊？",
       "vi": "Tại sao bạn cùng phòng của anh ấy không muốn tham gia tour du lịch theo đoàn?",
       "py": "Wèishénme tā de shìyǒu bùxiǎng cānjiā tuántǐ lǚyóu?"
      },
      {
       "hz": "他上網訂車票都很順利嗎？為什麼？",
       "vi": "Anh ấy đặt vé xe trên mạng có suôn sẻ không? Tại sao?",
       "py": "Tā shàngwǎng dìng chēpiào dōu hěn shùnlì ma? Wèishénme?"
      },
      {
       "hz": "從台北去阿里山，可以怎麼去？",
       "vi": "Từ Đài Bắc đi A Lý Sơn có thể đi bằng cách nào?",
       "py": "Cóng Táiběi qù ālǐshān, kěyǐ zěnme qù?"
      },
      {
       "hz": "他們為什麼要住在嘉義市？那裡有什麼特別的食物？",
       "vi": "Tại sao họ phải ở thành phố Gia Nghĩa? Ở đó có món ăn gì đặc biệt?",
       "py": "Tāmen wèishénme yào zhù zài jiāyìshì? Nàlǐ yǒu shénme tèbié de shíwù?"
      },
      {
       "hz": "為什麼他的室友忽然大叫？",
       "vi": "Tại sao bạn cùng phòng của anh ấy đột nhiên hét lên?",
       "py": "Wèishénme tā de shìyǒu hūrán dàjiào?"
      },
      {
       "hz": "李小姐趁出國時，在機場買了一瓶有名的香水。",
       "vi": "Cô Lý tranh thủ lúc ra nước ngoài, mua một lọ nước hoa nổi tiếng ở sân bay.",
       "py": "Lǐ xiǎojiě chèn chūguóshí, zài jīchǎng mǎi le yìpíng yǒumíng de xiāngshuǐ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "一點兒 + 都/也 + phủ định — một chút cũng không",
   "giaiThich": "Phủ định mạnh: \"hoàn toàn không…\", nhấn mạnh chủ thể không hề ở trạng thái đó."
  },
  {
   "title": "2. 這次社區的中秋節活動辦得",
   "points": [
    {
     "label": null,
     "formula": "(Vs) to succeed, to make it; to be successful",
     "examples": [
      {
       "hz": "到東部的火車票很難訂，我訂了好幾次才成功。",
       "vi": "Vé tàu đi miền đông rất khó đặt, tôi đặt mấy lần mới được.",
       "py": "Dào dōngbù de huǒchēpiào hěn nán dìng, wǒ dìng le hǎo jǐcì cái chénggōng."
      },
      {
       "hz": "很成功，大家都玩得很開心。",
       "vi": "…rất thành công, mọi người đều chơi rất vui.",
       "py": "Hěn chénggōng, dàjiā dōu wán de hěn kāixīn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập với 成功 và bổ ngữ",
   "giaiThich": "Phần luyện tập nhận xét về mức độ thành công của hoạt động (辦得…)."
  },
  {
   "title": "I. 剛...就... after V1, V2 happened immediately",
   "points": [
    {
     "label": null,
     "formula": "This pattern indicates when the situation after “剛” happens, another situation or action occurs right away. It emphasizes the close connection between two situations or actions. If the two clauses has different subjects, the subject of the latter clause should be placed before “就”. 請用提示完成句子。Complete the sentences with given phrases.",
     "examples": [
      {
       "hz": "那個蛋糕剛烤好就被孩子吃光了。 2. 他剛搬進宿舍，無線網路就壞了。3. 他剛畢業就找到了一份好工作，真是太幸運了！",
       "vi": "Cái bánh kem đó vừa nướng xong đã bị bọn trẻ ăn hết sạch. Anh ấy vừa dọn vào ký túc xá thì wifi hỏng. Anh ấy vừa tốt nghiệp đã tìm được một công việc tốt, thật là may mắn!",
       "py": "Nàge dàngāo gāng kǎo hǎo jiù bèi háizi chīguāng le. 2. Tā gāng bānjìn sùshè, wúxiànwǎng lù jiù huài le. 3. Tā gāng bìyè jiù zhǎodào le yífèn hǎo gōngzuò, zhēnshìtài xìngyùn le!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "剛… 就… — vừa mới… đã…",
   "giaiThich": "Việc sau 剛 vừa xảy ra thì việc sau 就 đến ngay, nhấn mạnh hai việc nối nhau rất sát."
  },
  {
   "title": "II. 趁(著) seize the moment, take advantage of...",
   "points": [
    {
     "label": null,
     "formula": "The expression \"趁著\" means taking advantage of a certain chance or time to do something beneficial to oneself. \"趁\" can be followed by nouns, verb phrases, and intransitive state verbs, etc.",
     "examples": [
      {
       "hz": "媽媽趁(著)好天氣，把髒衣服都洗了。2. 張先生趁著到花蓮旅行時，買了一些當地的名產。3. 他趁著去法國留學的時候,參觀了有名的博物館。",
       "vi": "Mẹ tranh thủ trời đẹp giặt hết quần áo bẩn. Anh Trương nhân dịp đi du lịch Hoa Liên đã mua một ít đặc sản địa phương. Anh ấy tranh thủ lúc du học ở Pháp để tham quan các bảo tàng nổi tiếng.",
       "py": "Māma chèn (zhe) hǎo tiānqì, bǎ zàng yīfú dōu xǐ le. 2. Zhāng xiānshēng chèn zhe dào Huālián lǚxíng shí, mǎi le yìxiē dāngdì de míngchǎn. 3. Tā chèn zhe qù Fǎguó liúxué de shíhòu, cānguān le yǒumíng de bówùguǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "趁(著) — nhân lúc, tranh thủ",
   "giaiThich": "Nghĩa \"nhân lúc, tranh thủ cơ hội\" để làm việc có lợi. Sau 趁 có thể là danh từ, cụm động từ hoặc tính từ."
  },
  {
   "title": "1. 做一個旅遊計畫",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "這個計畫應該包含：(1)出發日期、去的地方、費用、交通工具、住的地方...(2)畫一張旅行的地圖，從哪裡到哪裡？",
       "vi": "Kế hoạch này cần có: (1) ngày khởi hành, nơi đến, chi phí, phương tiện đi lại, chỗ ở… (2) vẽ một bản đồ chuyến đi: từ đâu đến đâu?",
       "py": "Zhège jìhuà yīnggāi bāohán: (1) chūfā rìqí, qù de dìfāng, fèiyòng, jiāotōnggōngjù, zhù de dìfāng... (2) huà yìzhāng lǚxíng de dìtú, cóng nǎlǐ dào nǎlǐ?"
      },
      {
       "hz": "怎麼去？為什麼值得去？",
       "vi": "Đi bằng cách nào? Tại sao đáng để đi?",
       "py": "Zěnme qù? Wèishénme zhíde qù?"
      },
      {
       "hz": "跟大家做一個口頭報告。",
       "vi": "Thuyết trình trước cả lớp.",
       "py": "Gēn dàjiā zuò yígè kǒutóubàogào."
      },
      {
       "hz": "風景區的名字費用(車票、旅館...)特別的食物/風景...",
       "vi": "Tên khu danh thắng · Chi phí (vé xe, khách sạn…) · Món ăn / phong cảnh đặc biệt…",
       "py": "Fēngjǐngqū de míngzì fèiyòng (chēpiào, lǚguǎn...) tèbié de shíwù / fēngjǐng..."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: lập kế hoạch du lịch",
   "giaiThich": "Phần luyện nói/viết theo chủ đề lên kế hoạch đi chơi."
  },
  {
   "title": "2. 練習上網訂票",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "請老師找一個主題，例如要去花蓮的民宿住兩天，或是要買去台南的火車票，讓學生用自己的手機上網訂位、訂票，完成老師指定的任務。",
       "vi": "Thầy cô chọn một chủ đề, ví dụ đặt phòng nhà nghỉ ở Hoa Liên hai đêm, hoặc mua vé tàu đi Đài Nam, để học sinh dùng điện thoại của mình lên mạng đặt chỗ, đặt vé, hoàn thành nhiệm vụ thầy cô giao.",
       "py": "Qǐng lǎoshī zhǎo yígè zhǔtí, lìrú yào qù Huālián de mínsù zhù liǎngtiān, huòshì yào mǎi qù Táinán de huǒchēpiào, ràng xuéshēng yòng zìjǐ de shǒujī shàngwǎng dìngwèi, dìngpiào, wánchéng lǎoshī zhǐdìng de rènwù."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: đặt vé trên mạng",
   "giaiThich": "Phần luyện tập thao tác đặt vé qua mạng."
  }
 ],
 "td2-8.1": [
  {
   "title": "I. 滿＋Nu＋M＋(N) to reach or fully attain Nu＋M＋(N)",
   "points": [
    {
     "label": null,
     "formula": "“滿” is followed by a number. This pattern means reaching a certain amount or number.",
     "examples": [
      {
       "hz": "在那家店訂飲料，滿十杯就可以替客人送過去。2. 在這家商店，買東西滿兩千塊(錢)，就送一盒巧克力。3. 在台灣，便利商店不可以賣酒給還沒滿十八歲的人。",
       "vi": "Đặt đồ uống ở quán đó, đủ mười cốc là được giao tận nơi cho khách. Ở cửa hàng này, mua đủ hai nghìn đồng là được tặng một hộp sô-cô-la. Ở Đài Loan, cửa hàng tiện lợi không được bán rượu cho người chưa đủ mười tám tuổi.",
       "py": "Zài nà jiā diàn dìng yǐnliào, mǎn shíbēi jiù kěyǐ tì kèrén sòng guòqù. 2. Zài zhèjiā shāngdiàn, mǎi dōngxī mǎn liǎngqiānkuài (qián), jiù sòng yìhé qiǎokèlì. 3. Zài Táiwān, biànlìshāngdiàn bù kěyǐ mài jiǔ gěi hái méi mǎn shíbāsuì de rén."
      },
      {
       "hz": "A：在你的國家，幾歲可以開車？",
       "vi": "A: Ở nước bạn, mấy tuổi thì được lái xe?",
       "py": "A: Zài nǐ de guójiā, jǐsuì kěyǐ kāichē?"
      },
      {
       "hz": "A：老闆，這些名產我多買幾包，可以便宜一點兒嗎？",
       "vi": "A: Ông chủ ơi, những đặc sản này tôi mua thêm mấy gói, bớt cho tôi một chút được không?",
       "py": "A: Lǎobǎn, zhèxiē míngchǎn wǒ duō mǎi jǐbāo, kěyǐ piányi yìdiǎn'ér ma?"
      },
      {
       "hz": "A：你父母結婚多久了？",
       "vi": "A: Bố mẹ bạn kết hôn bao lâu rồi?",
       "py": "A: Nǐ fùmǔ jiéhūn duōjiǔ le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "滿 + số + lượng từ — tròn, đủ",
   "giaiThich": "滿 đứng trước số, nghĩa \"tròn, đủ\" một số lượng nào đó (滿一個月 — tròn một tháng)."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree.",
     "examples": [
      {
       "hz": "我最近很忙，連睡覺的時間都沒有。2. 他做的東西真不好吃，連他家的狗都不吃。3. 那家民宿很便宜，不但有免費的網路，連早餐、午餐也可以吃到飽。4. 這個孩子真討厭念書，連媽媽打他，他都不怕。",
       "vi": "Dạo này tôi rất bận, đến thời gian ngủ cũng không có. Đồ anh ấy nấu dở thật, đến chó nhà anh ấy cũng không ăn. Nhà nghỉ đó rất rẻ, không những có internet miễn phí mà ngay cả bữa sáng, bữa trưa cũng được ăn thoả thích. Đứa bé này thật ghét học, đến mẹ đánh nó cũng không sợ.",
       "py": "Wǒ zuìjìn hěn máng, lián shuìjiào de shíjiān dōu méiyǒu. 2. Tā zuò de dōngxī zhēn bù hǎochī, lián tājiā de gǒu dōu bùchī. 3. Nà jiā mínsù hěn piányi, búdàn yǒu miǎnfèi de wǎnglù, lián zǎocān, wǔcān yě kěyǐ chī dào bǎo. 4. Zhège háizi zhēn tǎoyàn niànshū, Lián māma dǎ tā, tā dōu búpà."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree. 請用提示完成句子。Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他沒學過中文，連一句中文都不會說。2. 他的錢都花光了，連一顆糖也買不起。3. 張先生剛來台灣的時候，連一個朋友都沒有。",
       "vi": "Anh ấy chưa từng học tiếng Trung, đến một câu tiếng Trung cũng không biết nói. Anh ấy tiêu hết sạch tiền rồi, đến một viên kẹo cũng không mua nổi. Hồi anh Trương mới đến Đài Loan, đến một người bạn cũng không có.",
       "py": "Tā méi xué guò zhōngwén, lián yíjù zhōngwén dōu búhuì shuō. 2. Tā de qián dōu huā guāng le, lián yìkē táng yě mǎibùqǐ. 3. Zhāng xiānshēng gāng lái Táiwān de shíhòu, lián yígè péngyǒu dōu méiyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "III. 像...這樣/那樣(+......)的＋N ...like...(similar to )",
   "points": [
    {
     "label": null,
     "formula": "The pattern “像...這樣/那樣...的＋N” shows the features of the ewample coming after “ 像”.",
     "examples": [
      {
       "hz": "我想住在像藍小姐家那樣安全的社區。2. 很多外國遊客喜歡去像夜市那樣熱鬧的地方玩。3. 像洗碗筷這樣的家事，父母可以讓小孩自己做。",
       "vi": "Tôi muốn sống ở một khu dân cư an toàn như khu nhà cô Lam. Nhiều du khách nước ngoài thích đến những nơi náo nhiệt như chợ đêm. Những việc nhà như rửa bát đũa, bố mẹ có thể để con tự làm.",
       "py": "Wǒ xiǎng zhù zài xiàng Lán xiǎojiě jiā nàyàng ānquán de shèqū. 2. Hěnduō wàiguóyóukè xǐhuān qù xiàng yèshì nàyàng rènào de dìfāng wán. 3. Xiàng xǐ wǎnkuài zhèyàng de jiāshì, fùmǔ kěyǐ ràng xiǎohái zìjǐ zuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "像… 這樣/那樣 …的 + danh từ",
   "giaiThich": "Nêu đặc điểm bằng cách lấy ví dụ sau 像: \"kiểu như…, giống như…\"."
  },
  {
   "title": "IV. 只好 have no choice but to",
   "points": [
    {
     "label": null,
     "formula": "“只好” is used in the situation where the subject has no alternative but to do something. 如果發生這些事，你會怎麼說？ What do you say if these things happen?",
     "examples": [
      {
       "hz": "因為訂不到去花蓮的火車票，我們只好坐飛機去。",
       "vi": "Vì không đặt được vé tàu đi Hoa Liên, chúng tôi đành phải đi máy bay.",
       "py": "Yīnwèi dìng búdào qù Huālián de huǒchēpiào, wǒmen zhǐhǎo zuòfēijī qù."
      },
      {
       "hz": "妹妹想跟同學去看電影，可是明天有考試，只好在家看書。",
       "vi": "Em gái muốn đi xem phim với bạn, nhưng ngày mai có bài kiểm tra nên đành ở nhà học bài.",
       "py": "Mèimei xiǎng gēn tóngxué qù kàn diànyǐng, kěshì míngtiān yǒu kǎoshì, zhǐhǎo zàijiā kànshū."
      },
      {
       "hz": "這個月我買了太多衣服，現在錢包裡只剩下三百塊錢，只好每天吃麵包了。",
       "vi": "Tháng này tôi mua quá nhiều quần áo, bây giờ trong ví chỉ còn ba trăm đồng, đành ngày nào cũng ăn bánh mì.",
       "py": "Zhège yuè wǒ mǎi le tài duō yīfú, xiànzài qiánbāo lǐ zhǐ shèngxià sānbǎikuài qián, zhǐhǎo měitiān chī miànbāo le."
      },
      {
       "hz": "你本來說要去公園野餐，可是出門的時候，開始下大雨了。",
       "vi": "Bạn vốn định đi dã ngoại ở công viên, nhưng lúc ra khỏi nhà thì trời bắt đầu mưa to.",
       "py": "Nǐ běnlái shuō yào qù gōngyuán yěcān, kěshì chūmén de shíhòu, kāishǐ xià dàyǔ le."
      },
      {
       "hz": "你們去餐廳吃飯，可是到的時候才發現已經沒有位子了。",
       "vi": "Các bạn đi ăn nhà hàng, nhưng đến nơi mới biết đã hết chỗ.",
       "py": "Nǐmen qù cāntīng chīfàn, kěshì dào de shíhòu cái fāxiàn yǐjīng méiyǒu wèizi le."
      },
      {
       "hz": "你要出門的時候，發現腳踏車壞了。",
       "vi": "Lúc định ra ngoài, bạn phát hiện xe đạp bị hỏng.",
       "py": "Nǐ yào chūmén de shíhòu, fāxiàn jiǎotàchē huài le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只好 — đành phải",
   "giaiThich": "Dùng khi không còn lựa chọn nào khác, đành làm việc gì đó."
  },
  {
   "title": "V. 為了 for the purpose of, in order to",
   "points": [
    {
     "label": null,
     "formula": "“為了” is followed by the purpose of an action or a behavior. verb complement 上：coming into contact The verb complement “上” has three meanings: (A) add something to another thing, e.g., “穿上” and “加上”. (C) a certain status occurs, e.g., “愛上” and “看上”.",
     "examples": [
      {
       "hz": "為了明天的約會，李小姐今天晚上要好好地保養。2. 為了把英文學好，我決定下個學期去英國留學。3. 為了租到比較便宜的公寓，我同學已經找了好幾個地方了。",
       "vi": "Vì buổi hẹn ngày mai, tối nay cô Lý phải chăm sóc da thật kỹ. Để học giỏi tiếng Anh, tôi quyết định học kỳ sau sang Anh du học. Để thuê được căn hộ rẻ hơn, bạn học của tôi đã tìm mấy chỗ rồi.",
       "py": "Wèile míngtiān de yuēhuì, Lǐ xiǎojiě jīntiān wǎnshàng yào hǎohǎo dì bǎoyǎng. 2. Wèile bǎ yīngwén xuéhǎo, wǒ juédìng xià gè xuéqí qù Yīngguó liúxué. 3. Wèile zū dào bǐjiào piányi de gōngyù, wǒ tóngxué yǐjīng zhǎo le hǎojǐgè dìfāng le."
      },
      {
       "hz": "靜文跟以前有什麼不一樣？",
       "vi": "Tịnh Văn có gì khác so với trước đây?",
       "py": "Jìngwén gēn yǐqián yǒu shénme bù yíyàng?"
      },
      {
       "hz": "靜文為什麼有這些改變？",
       "vi": "Tại sao Tịnh Văn có những thay đổi này?",
       "py": "Jìngwén wèishénme yǒu zhèxiē gǎibiàn?"
      },
      {
       "hz": "如果有人為了看韓劇，沒時間寫作業，你覺得好不好？為什麼？",
       "vi": "Nếu có người vì xem phim Hàn mà không có thời gian làm bài tập, bạn thấy có tốt không? Tại sao?",
       "py": "Rúguǒ yǒurén wèile kàn hánjù, méi shíjiān xiě zuòyè, nǐ juéde hǎobùhǎo? Wèishénme?"
      },
      {
       "hz": "靜文喜歡上韓劇以後，他的生活，像吃、穿、用、學......有哪些改變？",
       "vi": "Từ khi mê phim Hàn, cuộc sống của Tịnh Văn như ăn, mặc, dùng, học… đã thay đổi những gì?",
       "py": "Jìngwén xǐhuān shàng hánjù yǐhòu, tā de shēnghuó, xiàng chī, chuān, yòng, xué...... Yǒu nǎxiē gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你知道現在台灣流行什麼嗎？以後呢？你覺得以後台灣會流行什麼？",
       "vi": "Đọc xong bài văn, bạn có biết hiện nay Đài Loan đang thịnh hành gì không? Còn sau này? Bạn nghĩ sau này Đài Loan sẽ thịnh hành gì?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ zhīdào xiànzài Táiwān liúxíng shénme ma? Yǐhòu ne? Nǐ juéde yǐhòu Táiwān huì liúxíng shénme?"
      },
      {
       "hz": "請說說在你的國家，你見過像靜文這樣的人嗎？他們有什麼跟靜文一樣或是不一樣的地方？",
       "vi": "Hãy kể xem ở nước bạn, bạn đã từng gặp người như Tịnh Văn chưa? Họ có điểm gì giống hoặc khác Tịnh Văn?",
       "py": "Qǐng shuō shuō zài nǐ de guójiā, nǐ jiàn guò xiàng Jìngwén zhèyàng de rén ma? Tāmen yǒu shénme gēn Jìngwén yíyàng huòshì bù yíyàng de dìfāng?"
      },
      {
       "hz": "要是你的朋友跟靜文一樣，你會對她說什麼？",
       "vi": "Nếu bạn của bạn giống như Tịnh Văn, bạn sẽ nói gì với cô ấy?",
       "py": "Yàoshì nǐ de péngyǒu gēn Jìngwén yíyàng, nǐ huì duì tā shuō shénme?"
      },
      {
       "hz": "天氣冷了，快把外套穿上吧！2. 便利商店的門貼上了「買咖啡送貼紙」的海報。3. 我要早點兒出門，才趕得上公車。4. 爸爸走得太快，我跟不上。5. 莫以凡一到台灣就喜歡上了台灣文化。6. 那瓶香水很便宜，味道也不好，李小姐一定看不上。",
       "vi": "Trời lạnh rồi, mau mặc áo khoác vào đi! Cửa hàng tiện lợi đã dán tấm áp phích “Mua cà phê tặng nhãn dán” lên cửa. Tôi phải ra khỏi nhà sớm một chút mới kịp xe buýt. Bố đi nhanh quá, tôi theo không kịp. Mạc Dĩ Phàm vừa đến Đài Loan đã thích ngay văn hoá Đài Loan. Lọ nước hoa đó rất rẻ, mùi cũng không thơm, cô Lý chắc chắn không ưng.",
       "py": "Tiānqì lěng le, kuài bǎ wàitào chuān shàng ba! 2. Biànlìshāngdiàn de mén tiē shàng le “mǎi kāfēi sòng tiēzhǐ” de hǎibào. 3. Wǒ yào zǎodiǎn'ér chūmén, cái gǎndeshàng gōngchē. 4. Bàba zǒu de tài kuài, wǒ gēnbúshàng. 5. Mòyǐfán yí dào Táiwān jiù xǐhuān shàng le Táiwān wénhuà. 6. Nà píng xiāngshuǐ hěn piányi, wèidào yě bùhǎo, Lǐ xiǎojiě yídìng kànbúshàng."
      },
      {
       "hz": "V 上：V 上了 / 沒 V 上 / V 得上 / V 不上",
       "vi": "V上: V được rồi / chưa V được / V được / V không được",
       "py": "V shàng: V shàng le / méi V shàng / V de shàng / V bú shàng"
      },
      {
       "hz": "A：你一個月的房租要多少錢？",
       "vi": "A: Tiền thuê nhà một tháng của bạn là bao nhiêu?",
       "py": "A: Nǐ yígèyuè de fángzū yào duōshǎo qián?"
      },
      {
       "hz": "A：為什麼最近李先生常常約張小姐一起吃飯？",
       "vi": "A: Tại sao dạo này anh Lý hay hẹn cô Trương đi ăn?",
       "py": "A: Wèishénme zuìjìn Lǐ xiānshēng chángcháng yuē Zhāng xiǎojiě yìqǐ chīfàn?"
      },
      {
       "hz": "A：請問，這份資料我要寫些什麼？",
       "vi": "A: Cho hỏi, phiếu thông tin này tôi phải điền những gì?",
       "py": "A: Qǐngwèn, zhèfèn zīliào wǒ yào xiě xiē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "為了 — để, vì mục đích",
   "giaiThich": "為了 nêu mục đích của hành động. Bài cũng có bổ ngữ 上: (A) thêm/khoác lên (穿上), (B) tiếp xúc, (C) đạt tới."
  },
  {
   "title": "II. 因為......的關係 due to...",
   "points": [
    {
     "label": null,
     "formula": "The pattern  “因為......的關係 ” is used when the speaker would like to state a brief cause rather than going into details. Thus, in this pattern, “因為” is followed only by nouns or phrases. 請用提示完成句子。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "因為工作的關係，他決定搬到公司附近去住。2. 因為放春假的關係，去高雄的高鐵票都賣完了。3. 因為沒時間化妝的關係，金小姐不想去參加舞會。4. 她到韓國留學是因為男朋友的關係。",
       "vi": "Do công việc, anh ấy quyết định chuyển đến sống gần công ty. Do nghỉ xuân, vé tàu cao tốc đi Cao Hùng đã bán hết. Do không có thời gian trang điểm, cô Kim không muốn đi dự tiệc. Cô ấy sang Hàn Quốc du học là vì bạn trai.",
       "py": "Yīnwèi gōngzuò de guānxì, tā juédìng bān dào gōngsī fùjìn qù zhù. 2. Yīnwèi fàng chūnjià de guānxì, qù Gāoxióng de gāotiě piào dōu màiwán le. 3. Yīnwèi méi shíjiān huàzhuāng de guānxì, Jīn xiǎojiě bùxiǎng qù cānjiā wǔhuì. 4. Tā dào Hánguó liúxué shìyīnwèi nánpéngyǒu de guānxì."
      },
      {
       "hz": "A：你為什麼來台灣學中文？",
       "vi": "A: Tại sao bạn đến Đài Loan học tiếng Trung?",
       "py": "A: Nǐ wèishénme lái Táiwān xué zhōngwén?"
      },
      {
       "hz": "A：你們為什麼常常去那家餐廳吃飯？",
       "vi": "A: Tại sao các bạn hay đến nhà hàng đó ăn?",
       "py": "A: Nǐmen wèishénme chángcháng qù nà jiā cāntīng chīfàn?"
      },
      {
       "hz": "這個社區環境很好，你趕快跟房東簽約吧！",
       "vi": "Môi trường khu dân cư này rất tốt, bạn mau ký hợp đồng với chủ nhà đi!",
       "py": "Zhège shèqū huánjìng hěn hǎo, nǐ gǎnkuài gēn fángdōng qiānyuē ba!"
      },
      {
       "hz": "如果你是老闆，你要怎麼做？",
       "vi": "Nếu bạn là chủ cửa hàng, bạn sẽ làm thế nào?",
       "py": "Rúguǒ nǐ shì lǎobǎn, nǐ yào zěnme zuò?"
      },
      {
       "hz": "情況：你是一家商店(或餐廳)的老闆，最近你的店生意不太好。請你用下面的詞彙，先說說生意的情況，再說說怎麼做可以改變這個情況，讓你的生意變好？",
       "vi": "Tình huống: Bạn là chủ một cửa hàng (hoặc nhà hàng), dạo này cửa hàng buôn bán không tốt lắm. Hãy dùng các từ vựng dưới đây, nói về tình hình kinh doanh trước, rồi nói xem làm thế nào để thay đổi tình hình, giúp việc kinh doanh tốt lên?",
       "py": "Qíngkuàng: Nǐ shì yìjiā shāngdiàn (huò cāntīng) de lǎobǎn, zuìjìn nǐ de diàn shēngyì bútàihǎo. Qǐng nǐ yòng xiàmiàn de cíhuì, xiān shuō shuō shēngyì de qíngkuàng, zàishuō shuō zěnme zuò kěyǐ gǎibiàn zhège qíngkuàng, ràng nǐ de shēngyì biàn hǎo?"
      },
      {
       "hz": "請使用下面的生詞、語法：",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây:",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ:"
      },
      {
       "hz": "你的國家最近流行什麼？",
       "vi": "Gần đây nước bạn đang thịnh hành gì?",
       "py": "Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "說明：請你訪問一個台灣人和三個不同國家的同學，問他們下面的問題：1.你的國家最近流行什麼？",
       "vi": "Hướng dẫn: Hãy phỏng vấn một người Đài Loan và ba bạn học đến từ ba nước khác nhau, hỏi họ các câu sau: 1. Gần đây nước bạn đang thịnh hành gì?",
       "py": "Shuōmíng: Qǐng nǐ fǎngwèn yígè táiwānrén hàn sāngè bùtóng guójiā de tóngxué, wèn tāmen xiàmiàn de wèntí: 1. Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "哪些人喜歡這些流行的東西？他們會做什麼跟這些流行有關的事？",
       "vi": "Những ai thích những thứ đang thịnh hành này? Họ làm những gì liên quan đến trào lưu này?",
       "py": "Nǎxiē rén xǐhuān zhèxiē liúxíng de dōngxī? Tāmen huì zuò shénme gēn zhèxiē liúxíng yǒuguān de shì?"
      },
      {
       "hz": "這些流行讓他們的生活有了什麼改變？",
       "vi": "Những trào lưu này đã làm cuộc sống của họ thay đổi thế nào?",
       "py": "Zhèxiē liúxíng ràng tāmen de shēnghuó yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "請你跟大家報告訪問的結果，也把對這些流行的看法說一說。",
       "vi": "Hãy báo cáo kết quả phỏng vấn với cả lớp, và nói cả suy nghĩ của bạn về những trào lưu này.",
       "py": "Qǐng nǐ gēn dàjiā bàogào fǎngwèn de jiéguǒ, yě bǎ duì zhèxiē liúxíng de kànfǎ shuōyìshuō."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "因為……的關係 — do, vì",
   "giaiThich": "Nêu nguyên nhân ngắn gọn, không đi vào chi tiết; sau 因為 chỉ đặt danh từ hoặc cụm danh từ."
  }
 ],
 "td2-8.2": [
  {
   "title": "I. 滿＋Nu＋M＋(N) to reach or fully attain Nu＋M＋(N)",
   "points": [
    {
     "label": null,
     "formula": "“滿” is followed by a number. This pattern means reaching a certain amount or number.",
     "examples": [
      {
       "hz": "在那家店訂飲料，滿十杯就可以替客人送過去。2. 在這家商店，買東西滿兩千塊(錢)，就送一盒巧克力。3. 在台灣，便利商店不可以賣酒給還沒滿十八歲的人。",
       "vi": "Đặt đồ uống ở quán đó, đủ mười cốc là được giao tận nơi cho khách. Ở cửa hàng này, mua đủ hai nghìn đồng là được tặng một hộp sô-cô-la. Ở Đài Loan, cửa hàng tiện lợi không được bán rượu cho người chưa đủ mười tám tuổi.",
       "py": "Zài nà jiā diàn dìng yǐnliào, mǎn shíbēi jiù kěyǐ tì kèrén sòng guòqù. 2. Zài zhèjiā shāngdiàn, mǎi dōngxī mǎn liǎngqiānkuài (qián), jiù sòng yìhé qiǎokèlì. 3. Zài Táiwān, biànlìshāngdiàn bù kěyǐ mài jiǔ gěi hái méi mǎn shíbāsuì de rén."
      },
      {
       "hz": "A：在你的國家，幾歲可以開車？",
       "vi": "A: Ở nước bạn, mấy tuổi thì được lái xe?",
       "py": "A: Zài nǐ de guójiā, jǐsuì kěyǐ kāichē?"
      },
      {
       "hz": "A：老闆，這些名產我多買幾包，可以便宜一點兒嗎？",
       "vi": "A: Ông chủ ơi, những đặc sản này tôi mua thêm mấy gói, bớt cho tôi một chút được không?",
       "py": "A: Lǎobǎn, zhèxiē míngchǎn wǒ duō mǎi jǐbāo, kěyǐ piányi yìdiǎn'ér ma?"
      },
      {
       "hz": "A：你父母結婚多久了？",
       "vi": "A: Bố mẹ bạn kết hôn bao lâu rồi?",
       "py": "A: Nǐ fùmǔ jiéhūn duōjiǔ le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "滿 + số + lượng từ — tròn, đủ",
   "giaiThich": "滿 đứng trước số, nghĩa \"tròn, đủ\" một số lượng nào đó (滿一個月 — tròn một tháng)."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree.",
     "examples": [
      {
       "hz": "我最近很忙，連睡覺的時間都沒有。2. 他做的東西真不好吃，連他家的狗都不吃。3. 那家民宿很便宜，不但有免費的網路，連早餐、午餐也可以吃到飽。4. 這個孩子真討厭念書，連媽媽打他，他都不怕。",
       "vi": "Dạo này tôi rất bận, đến thời gian ngủ cũng không có. Đồ anh ấy nấu dở thật, đến chó nhà anh ấy cũng không ăn. Nhà nghỉ đó rất rẻ, không những có internet miễn phí mà ngay cả bữa sáng, bữa trưa cũng được ăn thoả thích. Đứa bé này thật ghét học, đến mẹ đánh nó cũng không sợ.",
       "py": "Wǒ zuìjìn hěn máng, lián shuìjiào de shíjiān dōu méiyǒu. 2. Tā zuò de dōngxī zhēn bù hǎochī, lián tājiā de gǒu dōu bùchī. 3. Nà jiā mínsù hěn piányi, búdàn yǒu miǎnfèi de wǎnglù, lián zǎocān, wǔcān yě kěyǐ chī dào bǎo. 4. Zhège háizi zhēn tǎoyàn niànshū, Lián māma dǎ tā, tā dōu búpà."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree. 請用提示完成句子。Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他沒學過中文，連一句中文都不會說。2. 他的錢都花光了，連一顆糖也買不起。3. 張先生剛來台灣的時候，連一個朋友都沒有。",
       "vi": "Anh ấy chưa từng học tiếng Trung, đến một câu tiếng Trung cũng không biết nói. Anh ấy tiêu hết sạch tiền rồi, đến một viên kẹo cũng không mua nổi. Hồi anh Trương mới đến Đài Loan, đến một người bạn cũng không có.",
       "py": "Tā méi xué guò zhōngwén, lián yíjù zhōngwén dōu búhuì shuō. 2. Tā de qián dōu huā guāng le, lián yìkē táng yě mǎibùqǐ. 3. Zhāng xiānshēng gāng lái Táiwān de shíhòu, lián yígè péngyǒu dōu méiyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "III. 像...這樣/那樣(+......)的＋N ...like...(similar to )",
   "points": [
    {
     "label": null,
     "formula": "The pattern “像...這樣/那樣...的＋N” shows the features of the ewample coming after “ 像”.",
     "examples": [
      {
       "hz": "我想住在像藍小姐家那樣安全的社區。2. 很多外國遊客喜歡去像夜市那樣熱鬧的地方玩。3. 像洗碗筷這樣的家事，父母可以讓小孩自己做。",
       "vi": "Tôi muốn sống ở một khu dân cư an toàn như khu nhà cô Lam. Nhiều du khách nước ngoài thích đến những nơi náo nhiệt như chợ đêm. Những việc nhà như rửa bát đũa, bố mẹ có thể để con tự làm.",
       "py": "Wǒ xiǎng zhù zài xiàng Lán xiǎojiě jiā nàyàng ānquán de shèqū. 2. Hěnduō wàiguóyóukè xǐhuān qù xiàng yèshì nàyàng rènào de dìfāng wán. 3. Xiàng xǐ wǎnkuài zhèyàng de jiāshì, fùmǔ kěyǐ ràng xiǎohái zìjǐ zuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "像… 這樣/那樣 …的 + danh từ",
   "giaiThich": "Nêu đặc điểm bằng cách lấy ví dụ sau 像: \"kiểu như…, giống như…\"."
  },
  {
   "title": "IV. 只好 have no choice but to",
   "points": [
    {
     "label": null,
     "formula": "“只好” is used in the situation where the subject has no alternative but to do something. 如果發生這些事，你會怎麼說？ What do you say if these things happen?",
     "examples": [
      {
       "hz": "因為訂不到去花蓮的火車票，我們只好坐飛機去。",
       "vi": "Vì không đặt được vé tàu đi Hoa Liên, chúng tôi đành phải đi máy bay.",
       "py": "Yīnwèi dìng búdào qù Huālián de huǒchēpiào, wǒmen zhǐhǎo zuòfēijī qù."
      },
      {
       "hz": "妹妹想跟同學去看電影，可是明天有考試，只好在家看書。",
       "vi": "Em gái muốn đi xem phim với bạn, nhưng ngày mai có bài kiểm tra nên đành ở nhà học bài.",
       "py": "Mèimei xiǎng gēn tóngxué qù kàn diànyǐng, kěshì míngtiān yǒu kǎoshì, zhǐhǎo zàijiā kànshū."
      },
      {
       "hz": "這個月我買了太多衣服，現在錢包裡只剩下三百塊錢，只好每天吃麵包了。",
       "vi": "Tháng này tôi mua quá nhiều quần áo, bây giờ trong ví chỉ còn ba trăm đồng, đành ngày nào cũng ăn bánh mì.",
       "py": "Zhège yuè wǒ mǎi le tài duō yīfú, xiànzài qiánbāo lǐ zhǐ shèngxià sānbǎikuài qián, zhǐhǎo měitiān chī miànbāo le."
      },
      {
       "hz": "你本來說要去公園野餐，可是出門的時候，開始下大雨了。",
       "vi": "Bạn vốn định đi dã ngoại ở công viên, nhưng lúc ra khỏi nhà thì trời bắt đầu mưa to.",
       "py": "Nǐ běnlái shuō yào qù gōngyuán yěcān, kěshì chūmén de shíhòu, kāishǐ xià dàyǔ le."
      },
      {
       "hz": "你們去餐廳吃飯，可是到的時候才發現已經沒有位子了。",
       "vi": "Các bạn đi ăn nhà hàng, nhưng đến nơi mới biết đã hết chỗ.",
       "py": "Nǐmen qù cāntīng chīfàn, kěshì dào de shíhòu cái fāxiàn yǐjīng méiyǒu wèizi le."
      },
      {
       "hz": "你要出門的時候，發現腳踏車壞了。",
       "vi": "Lúc định ra ngoài, bạn phát hiện xe đạp bị hỏng.",
       "py": "Nǐ yào chūmén de shíhòu, fāxiàn jiǎotàchē huài le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只好 — đành phải",
   "giaiThich": "Dùng khi không còn lựa chọn nào khác, đành làm việc gì đó."
  },
  {
   "title": "V. 為了 for the purpose of, in order to",
   "points": [
    {
     "label": null,
     "formula": "“為了” is followed by the purpose of an action or a behavior. verb complement 上：coming into contact The verb complement “上” has three meanings: (A) add something to another thing, e.g., “穿上” and “加上”. (C) a certain status occurs, e.g., “愛上” and “看上”.",
     "examples": [
      {
       "hz": "為了明天的約會，李小姐今天晚上要好好地保養。2. 為了把英文學好，我決定下個學期去英國留學。3. 為了租到比較便宜的公寓，我同學已經找了好幾個地方了。",
       "vi": "Vì buổi hẹn ngày mai, tối nay cô Lý phải chăm sóc da thật kỹ. Để học giỏi tiếng Anh, tôi quyết định học kỳ sau sang Anh du học. Để thuê được căn hộ rẻ hơn, bạn học của tôi đã tìm mấy chỗ rồi.",
       "py": "Wèile míngtiān de yuēhuì, Lǐ xiǎojiě jīntiān wǎnshàng yào hǎohǎo dì bǎoyǎng. 2. Wèile bǎ yīngwén xuéhǎo, wǒ juédìng xià gè xuéqí qù Yīngguó liúxué. 3. Wèile zū dào bǐjiào piányi de gōngyù, wǒ tóngxué yǐjīng zhǎo le hǎojǐgè dìfāng le."
      },
      {
       "hz": "靜文跟以前有什麼不一樣？",
       "vi": "Tịnh Văn có gì khác so với trước đây?",
       "py": "Jìngwén gēn yǐqián yǒu shénme bù yíyàng?"
      },
      {
       "hz": "靜文為什麼有這些改變？",
       "vi": "Tại sao Tịnh Văn có những thay đổi này?",
       "py": "Jìngwén wèishénme yǒu zhèxiē gǎibiàn?"
      },
      {
       "hz": "如果有人為了看韓劇，沒時間寫作業，你覺得好不好？為什麼？",
       "vi": "Nếu có người vì xem phim Hàn mà không có thời gian làm bài tập, bạn thấy có tốt không? Tại sao?",
       "py": "Rúguǒ yǒurén wèile kàn hánjù, méi shíjiān xiě zuòyè, nǐ juéde hǎobùhǎo? Wèishénme?"
      },
      {
       "hz": "靜文喜歡上韓劇以後，他的生活，像吃、穿、用、學......有哪些改變？",
       "vi": "Từ khi mê phim Hàn, cuộc sống của Tịnh Văn như ăn, mặc, dùng, học… đã thay đổi những gì?",
       "py": "Jìngwén xǐhuān shàng hánjù yǐhòu, tā de shēnghuó, xiàng chī, chuān, yòng, xué...... Yǒu nǎxiē gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你知道現在台灣流行什麼嗎？以後呢？你覺得以後台灣會流行什麼？",
       "vi": "Đọc xong bài văn, bạn có biết hiện nay Đài Loan đang thịnh hành gì không? Còn sau này? Bạn nghĩ sau này Đài Loan sẽ thịnh hành gì?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ zhīdào xiànzài Táiwān liúxíng shénme ma? Yǐhòu ne? Nǐ juéde yǐhòu Táiwān huì liúxíng shénme?"
      },
      {
       "hz": "請說說在你的國家，你見過像靜文這樣的人嗎？他們有什麼跟靜文一樣或是不一樣的地方？",
       "vi": "Hãy kể xem ở nước bạn, bạn đã từng gặp người như Tịnh Văn chưa? Họ có điểm gì giống hoặc khác Tịnh Văn?",
       "py": "Qǐng shuō shuō zài nǐ de guójiā, nǐ jiàn guò xiàng Jìngwén zhèyàng de rén ma? Tāmen yǒu shénme gēn Jìngwén yíyàng huòshì bù yíyàng de dìfāng?"
      },
      {
       "hz": "要是你的朋友跟靜文一樣，你會對她說什麼？",
       "vi": "Nếu bạn của bạn giống như Tịnh Văn, bạn sẽ nói gì với cô ấy?",
       "py": "Yàoshì nǐ de péngyǒu gēn Jìngwén yíyàng, nǐ huì duì tā shuō shénme?"
      },
      {
       "hz": "天氣冷了，快把外套穿上吧！2. 便利商店的門貼上了「買咖啡送貼紙」的海報。3. 我要早點兒出門，才趕得上公車。4. 爸爸走得太快，我跟不上。5. 莫以凡一到台灣就喜歡上了台灣文化。6. 那瓶香水很便宜，味道也不好，李小姐一定看不上。",
       "vi": "Trời lạnh rồi, mau mặc áo khoác vào đi! Cửa hàng tiện lợi đã dán tấm áp phích “Mua cà phê tặng nhãn dán” lên cửa. Tôi phải ra khỏi nhà sớm một chút mới kịp xe buýt. Bố đi nhanh quá, tôi theo không kịp. Mạc Dĩ Phàm vừa đến Đài Loan đã thích ngay văn hoá Đài Loan. Lọ nước hoa đó rất rẻ, mùi cũng không thơm, cô Lý chắc chắn không ưng.",
       "py": "Tiānqì lěng le, kuài bǎ wàitào chuān shàng ba! 2. Biànlìshāngdiàn de mén tiē shàng le “mǎi kāfēi sòng tiēzhǐ” de hǎibào. 3. Wǒ yào zǎodiǎn'ér chūmén, cái gǎndeshàng gōngchē. 4. Bàba zǒu de tài kuài, wǒ gēnbúshàng. 5. Mòyǐfán yí dào Táiwān jiù xǐhuān shàng le Táiwān wénhuà. 6. Nà píng xiāngshuǐ hěn piányi, wèidào yě bùhǎo, Lǐ xiǎojiě yídìng kànbúshàng."
      },
      {
       "hz": "V 上：V 上了 / 沒 V 上 / V 得上 / V 不上",
       "vi": "V上: V được rồi / chưa V được / V được / V không được",
       "py": "V shàng: V shàng le / méi V shàng / V de shàng / V bú shàng"
      },
      {
       "hz": "A：你一個月的房租要多少錢？",
       "vi": "A: Tiền thuê nhà một tháng của bạn là bao nhiêu?",
       "py": "A: Nǐ yígèyuè de fángzū yào duōshǎo qián?"
      },
      {
       "hz": "A：為什麼最近李先生常常約張小姐一起吃飯？",
       "vi": "A: Tại sao dạo này anh Lý hay hẹn cô Trương đi ăn?",
       "py": "A: Wèishénme zuìjìn Lǐ xiānshēng chángcháng yuē Zhāng xiǎojiě yìqǐ chīfàn?"
      },
      {
       "hz": "A：請問，這份資料我要寫些什麼？",
       "vi": "A: Cho hỏi, phiếu thông tin này tôi phải điền những gì?",
       "py": "A: Qǐngwèn, zhèfèn zīliào wǒ yào xiě xiē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "為了 — để, vì mục đích",
   "giaiThich": "為了 nêu mục đích của hành động. Bài cũng có bổ ngữ 上: (A) thêm/khoác lên (穿上), (B) tiếp xúc, (C) đạt tới."
  },
  {
   "title": "II. 因為......的關係 due to...",
   "points": [
    {
     "label": null,
     "formula": "The pattern  “因為......的關係 ” is used when the speaker would like to state a brief cause rather than going into details. Thus, in this pattern, “因為” is followed only by nouns or phrases. 請用提示完成句子。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "因為工作的關係，他決定搬到公司附近去住。2. 因為放春假的關係，去高雄的高鐵票都賣完了。3. 因為沒時間化妝的關係，金小姐不想去參加舞會。4. 她到韓國留學是因為男朋友的關係。",
       "vi": "Do công việc, anh ấy quyết định chuyển đến sống gần công ty. Do nghỉ xuân, vé tàu cao tốc đi Cao Hùng đã bán hết. Do không có thời gian trang điểm, cô Kim không muốn đi dự tiệc. Cô ấy sang Hàn Quốc du học là vì bạn trai.",
       "py": "Yīnwèi gōngzuò de guānxì, tā juédìng bān dào gōngsī fùjìn qù zhù. 2. Yīnwèi fàng chūnjià de guānxì, qù Gāoxióng de gāotiě piào dōu màiwán le. 3. Yīnwèi méi shíjiān huàzhuāng de guānxì, Jīn xiǎojiě bùxiǎng qù cānjiā wǔhuì. 4. Tā dào Hánguó liúxué shìyīnwèi nánpéngyǒu de guānxì."
      },
      {
       "hz": "A：你為什麼來台灣學中文？",
       "vi": "A: Tại sao bạn đến Đài Loan học tiếng Trung?",
       "py": "A: Nǐ wèishénme lái Táiwān xué zhōngwén?"
      },
      {
       "hz": "A：你們為什麼常常去那家餐廳吃飯？",
       "vi": "A: Tại sao các bạn hay đến nhà hàng đó ăn?",
       "py": "A: Nǐmen wèishénme chángcháng qù nà jiā cāntīng chīfàn?"
      },
      {
       "hz": "這個社區環境很好，你趕快跟房東簽約吧！",
       "vi": "Môi trường khu dân cư này rất tốt, bạn mau ký hợp đồng với chủ nhà đi!",
       "py": "Zhège shèqū huánjìng hěn hǎo, nǐ gǎnkuài gēn fángdōng qiānyuē ba!"
      },
      {
       "hz": "如果你是老闆，你要怎麼做？",
       "vi": "Nếu bạn là chủ cửa hàng, bạn sẽ làm thế nào?",
       "py": "Rúguǒ nǐ shì lǎobǎn, nǐ yào zěnme zuò?"
      },
      {
       "hz": "情況：你是一家商店(或餐廳)的老闆，最近你的店生意不太好。請你用下面的詞彙，先說說生意的情況，再說說怎麼做可以改變這個情況，讓你的生意變好？",
       "vi": "Tình huống: Bạn là chủ một cửa hàng (hoặc nhà hàng), dạo này cửa hàng buôn bán không tốt lắm. Hãy dùng các từ vựng dưới đây, nói về tình hình kinh doanh trước, rồi nói xem làm thế nào để thay đổi tình hình, giúp việc kinh doanh tốt lên?",
       "py": "Qíngkuàng: Nǐ shì yìjiā shāngdiàn (huò cāntīng) de lǎobǎn, zuìjìn nǐ de diàn shēngyì bútàihǎo. Qǐng nǐ yòng xiàmiàn de cíhuì, xiān shuō shuō shēngyì de qíngkuàng, zàishuō shuō zěnme zuò kěyǐ gǎibiàn zhège qíngkuàng, ràng nǐ de shēngyì biàn hǎo?"
      },
      {
       "hz": "請使用下面的生詞、語法：",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây:",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ:"
      },
      {
       "hz": "你的國家最近流行什麼？",
       "vi": "Gần đây nước bạn đang thịnh hành gì?",
       "py": "Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "說明：請你訪問一個台灣人和三個不同國家的同學，問他們下面的問題：1.你的國家最近流行什麼？",
       "vi": "Hướng dẫn: Hãy phỏng vấn một người Đài Loan và ba bạn học đến từ ba nước khác nhau, hỏi họ các câu sau: 1. Gần đây nước bạn đang thịnh hành gì?",
       "py": "Shuōmíng: Qǐng nǐ fǎngwèn yígè táiwānrén hàn sāngè bùtóng guójiā de tóngxué, wèn tāmen xiàmiàn de wèntí: 1. Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "哪些人喜歡這些流行的東西？他們會做什麼跟這些流行有關的事？",
       "vi": "Những ai thích những thứ đang thịnh hành này? Họ làm những gì liên quan đến trào lưu này?",
       "py": "Nǎxiē rén xǐhuān zhèxiē liúxíng de dōngxī? Tāmen huì zuò shénme gēn zhèxiē liúxíng yǒuguān de shì?"
      },
      {
       "hz": "這些流行讓他們的生活有了什麼改變？",
       "vi": "Những trào lưu này đã làm cuộc sống của họ thay đổi thế nào?",
       "py": "Zhèxiē liúxíng ràng tāmen de shēnghuó yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "請你跟大家報告訪問的結果，也把對這些流行的看法說一說。",
       "vi": "Hãy báo cáo kết quả phỏng vấn với cả lớp, và nói cả suy nghĩ của bạn về những trào lưu này.",
       "py": "Qǐng nǐ gēn dàjiā bàogào fǎngwèn de jiéguǒ, yě bǎ duì zhèxiē liúxíng de kànfǎ shuōyìshuō."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "因為……的關係 — do, vì",
   "giaiThich": "Nêu nguyên nhân ngắn gọn, không đi vào chi tiết; sau 因為 chỉ đặt danh từ hoặc cụm danh từ."
  }
 ],
 "td2-8.3": [
  {
   "title": "I. 滿＋Nu＋M＋(N) to reach or fully attain Nu＋M＋(N)",
   "points": [
    {
     "label": null,
     "formula": "“滿” is followed by a number. This pattern means reaching a certain amount or number.",
     "examples": [
      {
       "hz": "在那家店訂飲料，滿十杯就可以替客人送過去。2. 在這家商店，買東西滿兩千塊(錢)，就送一盒巧克力。3. 在台灣，便利商店不可以賣酒給還沒滿十八歲的人。",
       "vi": "Đặt đồ uống ở quán đó, đủ mười cốc là được giao tận nơi cho khách. Ở cửa hàng này, mua đủ hai nghìn đồng là được tặng một hộp sô-cô-la. Ở Đài Loan, cửa hàng tiện lợi không được bán rượu cho người chưa đủ mười tám tuổi.",
       "py": "Zài nà jiā diàn dìng yǐnliào, mǎn shíbēi jiù kěyǐ tì kèrén sòng guòqù. 2. Zài zhèjiā shāngdiàn, mǎi dōngxī mǎn liǎngqiānkuài (qián), jiù sòng yìhé qiǎokèlì. 3. Zài Táiwān, biànlìshāngdiàn bù kěyǐ mài jiǔ gěi hái méi mǎn shíbāsuì de rén."
      },
      {
       "hz": "A：在你的國家，幾歲可以開車？",
       "vi": "A: Ở nước bạn, mấy tuổi thì được lái xe?",
       "py": "A: Zài nǐ de guójiā, jǐsuì kěyǐ kāichē?"
      },
      {
       "hz": "A：老闆，這些名產我多買幾包，可以便宜一點兒嗎？",
       "vi": "A: Ông chủ ơi, những đặc sản này tôi mua thêm mấy gói, bớt cho tôi một chút được không?",
       "py": "A: Lǎobǎn, zhèxiē míngchǎn wǒ duō mǎi jǐbāo, kěyǐ piányi yìdiǎn'ér ma?"
      },
      {
       "hz": "A：你父母結婚多久了？",
       "vi": "A: Bố mẹ bạn kết hôn bao lâu rồi?",
       "py": "A: Nǐ fùmǔ jiéhūn duōjiǔ le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "滿 + số + lượng từ — tròn, đủ",
   "giaiThich": "滿 đứng trước số, nghĩa \"tròn, đủ\" một số lượng nào đó (滿一個月 — tròn một tháng)."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree.",
     "examples": [
      {
       "hz": "我最近很忙，連睡覺的時間都沒有。2. 他做的東西真不好吃，連他家的狗都不吃。3. 那家民宿很便宜，不但有免費的網路，連早餐、午餐也可以吃到飽。4. 這個孩子真討厭念書，連媽媽打他，他都不怕。",
       "vi": "Dạo này tôi rất bận, đến thời gian ngủ cũng không có. Đồ anh ấy nấu dở thật, đến chó nhà anh ấy cũng không ăn. Nhà nghỉ đó rất rẻ, không những có internet miễn phí mà ngay cả bữa sáng, bữa trưa cũng được ăn thoả thích. Đứa bé này thật ghét học, đến mẹ đánh nó cũng không sợ.",
       "py": "Wǒ zuìjìn hěn máng, lián shuìjiào de shíjiān dōu méiyǒu. 2. Tā zuò de dōngxī zhēn bù hǎochī, lián tājiā de gǒu dōu bùchī. 3. Nà jiā mínsù hěn piányi, búdàn yǒu miǎnfèi de wǎnglù, lián zǎocān, wǔcān yě kěyǐ chī dào bǎo. 4. Zhège háizi zhēn tǎoyàn niànshū, Lián māma dǎ tā, tā dōu búpà."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree. 請用提示完成句子。Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他沒學過中文，連一句中文都不會說。2. 他的錢都花光了，連一顆糖也買不起。3. 張先生剛來台灣的時候，連一個朋友都沒有。",
       "vi": "Anh ấy chưa từng học tiếng Trung, đến một câu tiếng Trung cũng không biết nói. Anh ấy tiêu hết sạch tiền rồi, đến một viên kẹo cũng không mua nổi. Hồi anh Trương mới đến Đài Loan, đến một người bạn cũng không có.",
       "py": "Tā méi xué guò zhōngwén, lián yíjù zhōngwén dōu búhuì shuō. 2. Tā de qián dōu huā guāng le, lián yìkē táng yě mǎibùqǐ. 3. Zhāng xiānshēng gāng lái Táiwān de shíhòu, lián yígè péngyǒu dōu méiyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "III. 像...這樣/那樣(+......)的＋N ...like...(similar to )",
   "points": [
    {
     "label": null,
     "formula": "The pattern “像...這樣/那樣...的＋N” shows the features of the ewample coming after “ 像”.",
     "examples": [
      {
       "hz": "我想住在像藍小姐家那樣安全的社區。2. 很多外國遊客喜歡去像夜市那樣熱鬧的地方玩。3. 像洗碗筷這樣的家事，父母可以讓小孩自己做。",
       "vi": "Tôi muốn sống ở một khu dân cư an toàn như khu nhà cô Lam. Nhiều du khách nước ngoài thích đến những nơi náo nhiệt như chợ đêm. Những việc nhà như rửa bát đũa, bố mẹ có thể để con tự làm.",
       "py": "Wǒ xiǎng zhù zài xiàng Lán xiǎojiě jiā nàyàng ānquán de shèqū. 2. Hěnduō wàiguóyóukè xǐhuān qù xiàng yèshì nàyàng rènào de dìfāng wán. 3. Xiàng xǐ wǎnkuài zhèyàng de jiāshì, fùmǔ kěyǐ ràng xiǎohái zìjǐ zuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "像… 這樣/那樣 …的 + danh từ",
   "giaiThich": "Nêu đặc điểm bằng cách lấy ví dụ sau 像: \"kiểu như…, giống như…\"."
  },
  {
   "title": "IV. 只好 have no choice but to",
   "points": [
    {
     "label": null,
     "formula": "“只好” is used in the situation where the subject has no alternative but to do something. 如果發生這些事，你會怎麼說？ What do you say if these things happen?",
     "examples": [
      {
       "hz": "因為訂不到去花蓮的火車票，我們只好坐飛機去。",
       "vi": "Vì không đặt được vé tàu đi Hoa Liên, chúng tôi đành phải đi máy bay.",
       "py": "Yīnwèi dìng búdào qù Huālián de huǒchēpiào, wǒmen zhǐhǎo zuòfēijī qù."
      },
      {
       "hz": "妹妹想跟同學去看電影，可是明天有考試，只好在家看書。",
       "vi": "Em gái muốn đi xem phim với bạn, nhưng ngày mai có bài kiểm tra nên đành ở nhà học bài.",
       "py": "Mèimei xiǎng gēn tóngxué qù kàn diànyǐng, kěshì míngtiān yǒu kǎoshì, zhǐhǎo zàijiā kànshū."
      },
      {
       "hz": "這個月我買了太多衣服，現在錢包裡只剩下三百塊錢，只好每天吃麵包了。",
       "vi": "Tháng này tôi mua quá nhiều quần áo, bây giờ trong ví chỉ còn ba trăm đồng, đành ngày nào cũng ăn bánh mì.",
       "py": "Zhège yuè wǒ mǎi le tài duō yīfú, xiànzài qiánbāo lǐ zhǐ shèngxià sānbǎikuài qián, zhǐhǎo měitiān chī miànbāo le."
      },
      {
       "hz": "你本來說要去公園野餐，可是出門的時候，開始下大雨了。",
       "vi": "Bạn vốn định đi dã ngoại ở công viên, nhưng lúc ra khỏi nhà thì trời bắt đầu mưa to.",
       "py": "Nǐ běnlái shuō yào qù gōngyuán yěcān, kěshì chūmén de shíhòu, kāishǐ xià dàyǔ le."
      },
      {
       "hz": "你們去餐廳吃飯，可是到的時候才發現已經沒有位子了。",
       "vi": "Các bạn đi ăn nhà hàng, nhưng đến nơi mới biết đã hết chỗ.",
       "py": "Nǐmen qù cāntīng chīfàn, kěshì dào de shíhòu cái fāxiàn yǐjīng méiyǒu wèizi le."
      },
      {
       "hz": "你要出門的時候，發現腳踏車壞了。",
       "vi": "Lúc định ra ngoài, bạn phát hiện xe đạp bị hỏng.",
       "py": "Nǐ yào chūmén de shíhòu, fāxiàn jiǎotàchē huài le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只好 — đành phải",
   "giaiThich": "Dùng khi không còn lựa chọn nào khác, đành làm việc gì đó."
  },
  {
   "title": "V. 為了 for the purpose of, in order to",
   "points": [
    {
     "label": null,
     "formula": "“為了” is followed by the purpose of an action or a behavior. verb complement 上：coming into contact The verb complement “上” has three meanings: (A) add something to another thing, e.g., “穿上” and “加上”. (C) a certain status occurs, e.g., “愛上” and “看上”.",
     "examples": [
      {
       "hz": "為了明天的約會，李小姐今天晚上要好好地保養。2. 為了把英文學好，我決定下個學期去英國留學。3. 為了租到比較便宜的公寓，我同學已經找了好幾個地方了。",
       "vi": "Vì buổi hẹn ngày mai, tối nay cô Lý phải chăm sóc da thật kỹ. Để học giỏi tiếng Anh, tôi quyết định học kỳ sau sang Anh du học. Để thuê được căn hộ rẻ hơn, bạn học của tôi đã tìm mấy chỗ rồi.",
       "py": "Wèile míngtiān de yuēhuì, Lǐ xiǎojiě jīntiān wǎnshàng yào hǎohǎo dì bǎoyǎng. 2. Wèile bǎ yīngwén xuéhǎo, wǒ juédìng xià gè xuéqí qù Yīngguó liúxué. 3. Wèile zū dào bǐjiào piányi de gōngyù, wǒ tóngxué yǐjīng zhǎo le hǎojǐgè dìfāng le."
      },
      {
       "hz": "靜文跟以前有什麼不一樣？",
       "vi": "Tịnh Văn có gì khác so với trước đây?",
       "py": "Jìngwén gēn yǐqián yǒu shénme bù yíyàng?"
      },
      {
       "hz": "靜文為什麼有這些改變？",
       "vi": "Tại sao Tịnh Văn có những thay đổi này?",
       "py": "Jìngwén wèishénme yǒu zhèxiē gǎibiàn?"
      },
      {
       "hz": "如果有人為了看韓劇，沒時間寫作業，你覺得好不好？為什麼？",
       "vi": "Nếu có người vì xem phim Hàn mà không có thời gian làm bài tập, bạn thấy có tốt không? Tại sao?",
       "py": "Rúguǒ yǒurén wèile kàn hánjù, méi shíjiān xiě zuòyè, nǐ juéde hǎobùhǎo? Wèishénme?"
      },
      {
       "hz": "靜文喜歡上韓劇以後，他的生活，像吃、穿、用、學......有哪些改變？",
       "vi": "Từ khi mê phim Hàn, cuộc sống của Tịnh Văn như ăn, mặc, dùng, học… đã thay đổi những gì?",
       "py": "Jìngwén xǐhuān shàng hánjù yǐhòu, tā de shēnghuó, xiàng chī, chuān, yòng, xué...... Yǒu nǎxiē gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你知道現在台灣流行什麼嗎？以後呢？你覺得以後台灣會流行什麼？",
       "vi": "Đọc xong bài văn, bạn có biết hiện nay Đài Loan đang thịnh hành gì không? Còn sau này? Bạn nghĩ sau này Đài Loan sẽ thịnh hành gì?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ zhīdào xiànzài Táiwān liúxíng shénme ma? Yǐhòu ne? Nǐ juéde yǐhòu Táiwān huì liúxíng shénme?"
      },
      {
       "hz": "請說說在你的國家，你見過像靜文這樣的人嗎？他們有什麼跟靜文一樣或是不一樣的地方？",
       "vi": "Hãy kể xem ở nước bạn, bạn đã từng gặp người như Tịnh Văn chưa? Họ có điểm gì giống hoặc khác Tịnh Văn?",
       "py": "Qǐng shuō shuō zài nǐ de guójiā, nǐ jiàn guò xiàng Jìngwén zhèyàng de rén ma? Tāmen yǒu shénme gēn Jìngwén yíyàng huòshì bù yíyàng de dìfāng?"
      },
      {
       "hz": "要是你的朋友跟靜文一樣，你會對她說什麼？",
       "vi": "Nếu bạn của bạn giống như Tịnh Văn, bạn sẽ nói gì với cô ấy?",
       "py": "Yàoshì nǐ de péngyǒu gēn Jìngwén yíyàng, nǐ huì duì tā shuō shénme?"
      },
      {
       "hz": "天氣冷了，快把外套穿上吧！2. 便利商店的門貼上了「買咖啡送貼紙」的海報。3. 我要早點兒出門，才趕得上公車。4. 爸爸走得太快，我跟不上。5. 莫以凡一到台灣就喜歡上了台灣文化。6. 那瓶香水很便宜，味道也不好，李小姐一定看不上。",
       "vi": "Trời lạnh rồi, mau mặc áo khoác vào đi! Cửa hàng tiện lợi đã dán tấm áp phích “Mua cà phê tặng nhãn dán” lên cửa. Tôi phải ra khỏi nhà sớm một chút mới kịp xe buýt. Bố đi nhanh quá, tôi theo không kịp. Mạc Dĩ Phàm vừa đến Đài Loan đã thích ngay văn hoá Đài Loan. Lọ nước hoa đó rất rẻ, mùi cũng không thơm, cô Lý chắc chắn không ưng.",
       "py": "Tiānqì lěng le, kuài bǎ wàitào chuān shàng ba! 2. Biànlìshāngdiàn de mén tiē shàng le “mǎi kāfēi sòng tiēzhǐ” de hǎibào. 3. Wǒ yào zǎodiǎn'ér chūmén, cái gǎndeshàng gōngchē. 4. Bàba zǒu de tài kuài, wǒ gēnbúshàng. 5. Mòyǐfán yí dào Táiwān jiù xǐhuān shàng le Táiwān wénhuà. 6. Nà píng xiāngshuǐ hěn piányi, wèidào yě bùhǎo, Lǐ xiǎojiě yídìng kànbúshàng."
      },
      {
       "hz": "V 上：V 上了 / 沒 V 上 / V 得上 / V 不上",
       "vi": "V上: V được rồi / chưa V được / V được / V không được",
       "py": "V shàng: V shàng le / méi V shàng / V de shàng / V bú shàng"
      },
      {
       "hz": "A：你一個月的房租要多少錢？",
       "vi": "A: Tiền thuê nhà một tháng của bạn là bao nhiêu?",
       "py": "A: Nǐ yígèyuè de fángzū yào duōshǎo qián?"
      },
      {
       "hz": "A：為什麼最近李先生常常約張小姐一起吃飯？",
       "vi": "A: Tại sao dạo này anh Lý hay hẹn cô Trương đi ăn?",
       "py": "A: Wèishénme zuìjìn Lǐ xiānshēng chángcháng yuē Zhāng xiǎojiě yìqǐ chīfàn?"
      },
      {
       "hz": "A：請問，這份資料我要寫些什麼？",
       "vi": "A: Cho hỏi, phiếu thông tin này tôi phải điền những gì?",
       "py": "A: Qǐngwèn, zhèfèn zīliào wǒ yào xiě xiē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "為了 — để, vì mục đích",
   "giaiThich": "為了 nêu mục đích của hành động. Bài cũng có bổ ngữ 上: (A) thêm/khoác lên (穿上), (B) tiếp xúc, (C) đạt tới."
  },
  {
   "title": "II. 因為......的關係 due to...",
   "points": [
    {
     "label": null,
     "formula": "The pattern  “因為......的關係 ” is used when the speaker would like to state a brief cause rather than going into details. Thus, in this pattern, “因為” is followed only by nouns or phrases. 請用提示完成句子。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "因為工作的關係，他決定搬到公司附近去住。2. 因為放春假的關係，去高雄的高鐵票都賣完了。3. 因為沒時間化妝的關係，金小姐不想去參加舞會。4. 她到韓國留學是因為男朋友的關係。",
       "vi": "Do công việc, anh ấy quyết định chuyển đến sống gần công ty. Do nghỉ xuân, vé tàu cao tốc đi Cao Hùng đã bán hết. Do không có thời gian trang điểm, cô Kim không muốn đi dự tiệc. Cô ấy sang Hàn Quốc du học là vì bạn trai.",
       "py": "Yīnwèi gōngzuò de guānxì, tā juédìng bān dào gōngsī fùjìn qù zhù. 2. Yīnwèi fàng chūnjià de guānxì, qù Gāoxióng de gāotiě piào dōu màiwán le. 3. Yīnwèi méi shíjiān huàzhuāng de guānxì, Jīn xiǎojiě bùxiǎng qù cānjiā wǔhuì. 4. Tā dào Hánguó liúxué shìyīnwèi nánpéngyǒu de guānxì."
      },
      {
       "hz": "A：你為什麼來台灣學中文？",
       "vi": "A: Tại sao bạn đến Đài Loan học tiếng Trung?",
       "py": "A: Nǐ wèishénme lái Táiwān xué zhōngwén?"
      },
      {
       "hz": "A：你們為什麼常常去那家餐廳吃飯？",
       "vi": "A: Tại sao các bạn hay đến nhà hàng đó ăn?",
       "py": "A: Nǐmen wèishénme chángcháng qù nà jiā cāntīng chīfàn?"
      },
      {
       "hz": "這個社區環境很好，你趕快跟房東簽約吧！",
       "vi": "Môi trường khu dân cư này rất tốt, bạn mau ký hợp đồng với chủ nhà đi!",
       "py": "Zhège shèqū huánjìng hěn hǎo, nǐ gǎnkuài gēn fángdōng qiānyuē ba!"
      },
      {
       "hz": "如果你是老闆，你要怎麼做？",
       "vi": "Nếu bạn là chủ cửa hàng, bạn sẽ làm thế nào?",
       "py": "Rúguǒ nǐ shì lǎobǎn, nǐ yào zěnme zuò?"
      },
      {
       "hz": "情況：你是一家商店(或餐廳)的老闆，最近你的店生意不太好。請你用下面的詞彙，先說說生意的情況，再說說怎麼做可以改變這個情況，讓你的生意變好？",
       "vi": "Tình huống: Bạn là chủ một cửa hàng (hoặc nhà hàng), dạo này cửa hàng buôn bán không tốt lắm. Hãy dùng các từ vựng dưới đây, nói về tình hình kinh doanh trước, rồi nói xem làm thế nào để thay đổi tình hình, giúp việc kinh doanh tốt lên?",
       "py": "Qíngkuàng: Nǐ shì yìjiā shāngdiàn (huò cāntīng) de lǎobǎn, zuìjìn nǐ de diàn shēngyì bútàihǎo. Qǐng nǐ yòng xiàmiàn de cíhuì, xiān shuō shuō shēngyì de qíngkuàng, zàishuō shuō zěnme zuò kěyǐ gǎibiàn zhège qíngkuàng, ràng nǐ de shēngyì biàn hǎo?"
      },
      {
       "hz": "請使用下面的生詞、語法：",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây:",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ:"
      },
      {
       "hz": "你的國家最近流行什麼？",
       "vi": "Gần đây nước bạn đang thịnh hành gì?",
       "py": "Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "說明：請你訪問一個台灣人和三個不同國家的同學，問他們下面的問題：1.你的國家最近流行什麼？",
       "vi": "Hướng dẫn: Hãy phỏng vấn một người Đài Loan và ba bạn học đến từ ba nước khác nhau, hỏi họ các câu sau: 1. Gần đây nước bạn đang thịnh hành gì?",
       "py": "Shuōmíng: Qǐng nǐ fǎngwèn yígè táiwānrén hàn sāngè bùtóng guójiā de tóngxué, wèn tāmen xiàmiàn de wèntí: 1. Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "哪些人喜歡這些流行的東西？他們會做什麼跟這些流行有關的事？",
       "vi": "Những ai thích những thứ đang thịnh hành này? Họ làm những gì liên quan đến trào lưu này?",
       "py": "Nǎxiē rén xǐhuān zhèxiē liúxíng de dōngxī? Tāmen huì zuò shénme gēn zhèxiē liúxíng yǒuguān de shì?"
      },
      {
       "hz": "這些流行讓他們的生活有了什麼改變？",
       "vi": "Những trào lưu này đã làm cuộc sống của họ thay đổi thế nào?",
       "py": "Zhèxiē liúxíng ràng tāmen de shēnghuó yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "請你跟大家報告訪問的結果，也把對這些流行的看法說一說。",
       "vi": "Hãy báo cáo kết quả phỏng vấn với cả lớp, và nói cả suy nghĩ của bạn về những trào lưu này.",
       "py": "Qǐng nǐ gēn dàjiā bàogào fǎngwèn de jiéguǒ, yě bǎ duì zhèxiē liúxíng de kànfǎ shuōyìshuō."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "因為……的關係 — do, vì",
   "giaiThich": "Nêu nguyên nhân ngắn gọn, không đi vào chi tiết; sau 因為 chỉ đặt danh từ hoặc cụm danh từ."
  }
 ],
 "td2-8.4": [
  {
   "title": "I. 滿＋Nu＋M＋(N) to reach or fully attain Nu＋M＋(N)",
   "points": [
    {
     "label": null,
     "formula": "“滿” is followed by a number. This pattern means reaching a certain amount or number.",
     "examples": [
      {
       "hz": "在那家店訂飲料，滿十杯就可以替客人送過去。2. 在這家商店，買東西滿兩千塊(錢)，就送一盒巧克力。3. 在台灣，便利商店不可以賣酒給還沒滿十八歲的人。",
       "vi": "Đặt đồ uống ở quán đó, đủ mười cốc là được giao tận nơi cho khách. Ở cửa hàng này, mua đủ hai nghìn đồng là được tặng một hộp sô-cô-la. Ở Đài Loan, cửa hàng tiện lợi không được bán rượu cho người chưa đủ mười tám tuổi.",
       "py": "Zài nà jiā diàn dìng yǐnliào, mǎn shíbēi jiù kěyǐ tì kèrén sòng guòqù. 2. Zài zhèjiā shāngdiàn, mǎi dōngxī mǎn liǎngqiānkuài (qián), jiù sòng yìhé qiǎokèlì. 3. Zài Táiwān, biànlìshāngdiàn bù kěyǐ mài jiǔ gěi hái méi mǎn shíbāsuì de rén."
      },
      {
       "hz": "A：在你的國家，幾歲可以開車？",
       "vi": "A: Ở nước bạn, mấy tuổi thì được lái xe?",
       "py": "A: Zài nǐ de guójiā, jǐsuì kěyǐ kāichē?"
      },
      {
       "hz": "A：老闆，這些名產我多買幾包，可以便宜一點兒嗎？",
       "vi": "A: Ông chủ ơi, những đặc sản này tôi mua thêm mấy gói, bớt cho tôi một chút được không?",
       "py": "A: Lǎobǎn, zhèxiē míngchǎn wǒ duō mǎi jǐbāo, kěyǐ piányi yìdiǎn'ér ma?"
      },
      {
       "hz": "A：你父母結婚多久了？",
       "vi": "A: Bố mẹ bạn kết hôn bao lâu rồi?",
       "py": "A: Nǐ fùmǔ jiéhūn duōjiǔ le?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "滿 + số + lượng từ — tròn, đủ",
   "giaiThich": "滿 đứng trước số, nghĩa \"tròn, đủ\" một số lượng nào đó (滿一個月 — tròn một tháng)."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree.",
     "examples": [
      {
       "hz": "我最近很忙，連睡覺的時間都沒有。2. 他做的東西真不好吃，連他家的狗都不吃。3. 那家民宿很便宜，不但有免費的網路，連早餐、午餐也可以吃到飽。4. 這個孩子真討厭念書，連媽媽打他，他都不怕。",
       "vi": "Dạo này tôi rất bận, đến thời gian ngủ cũng không có. Đồ anh ấy nấu dở thật, đến chó nhà anh ấy cũng không ăn. Nhà nghỉ đó rất rẻ, không những có internet miễn phí mà ngay cả bữa sáng, bữa trưa cũng được ăn thoả thích. Đứa bé này thật ghét học, đến mẹ đánh nó cũng không sợ.",
       "py": "Wǒ zuìjìn hěn máng, lián shuìjiào de shíjiān dōu méiyǒu. 2. Tā zuò de dōngxī zhēn bù hǎochī, lián tājiā de gǒu dōu bùchī. 3. Nà jiā mínsù hěn piányi, búdàn yǒu miǎnfèi de wǎnglù, lián zǎocān, wǔcān yě kěyǐ chī dào bǎo. 4. Zhège háizi zhēn tǎoyàn niànshū, Lián māma dǎ tā, tā dōu búpà."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "II. 連 even",
   "points": [
    {
     "label": null,
     "formula": "The pattern “連......也/都......” is used to emphasize a situation that is more special, abnormal, exaggerated, or with higher degree. 請用提示完成句子。Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他沒學過中文，連一句中文都不會說。2. 他的錢都花光了，連一顆糖也買不起。3. 張先生剛來台灣的時候，連一個朋友都沒有。",
       "vi": "Anh ấy chưa từng học tiếng Trung, đến một câu tiếng Trung cũng không biết nói. Anh ấy tiêu hết sạch tiền rồi, đến một viên kẹo cũng không mua nổi. Hồi anh Trương mới đến Đài Loan, đến một người bạn cũng không có.",
       "py": "Tā méi xué guò zhōngwén, lián yíjù zhōngwén dōu búhuì shuō. 2. Tā de qián dōu huā guāng le, lián yìkē táng yě mǎibùqǐ. 3. Zhāng xiānshēng gāng lái Táiwān de shíhòu, lián yígè péngyǒu dōu méiyǒu."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "連… 也/都… — đến cả… cũng…",
   "giaiThich": "Nhấn mạnh một tình huống đặc biệt, bất thường hoặc mức độ cao (\"đến cả… cũng…\")."
  },
  {
   "title": "III. 像...這樣/那樣(+......)的＋N ...like...(similar to )",
   "points": [
    {
     "label": null,
     "formula": "The pattern “像...這樣/那樣...的＋N” shows the features of the ewample coming after “ 像”.",
     "examples": [
      {
       "hz": "我想住在像藍小姐家那樣安全的社區。2. 很多外國遊客喜歡去像夜市那樣熱鬧的地方玩。3. 像洗碗筷這樣的家事，父母可以讓小孩自己做。",
       "vi": "Tôi muốn sống ở một khu dân cư an toàn như khu nhà cô Lam. Nhiều du khách nước ngoài thích đến những nơi náo nhiệt như chợ đêm. Những việc nhà như rửa bát đũa, bố mẹ có thể để con tự làm.",
       "py": "Wǒ xiǎng zhù zài xiàng Lán xiǎojiě jiā nàyàng ānquán de shèqū. 2. Hěnduō wàiguóyóukè xǐhuān qù xiàng yèshì nàyàng rènào de dìfāng wán. 3. Xiàng xǐ wǎnkuài zhèyàng de jiāshì, fùmǔ kěyǐ ràng xiǎohái zìjǐ zuò."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "像… 這樣/那樣 …的 + danh từ",
   "giaiThich": "Nêu đặc điểm bằng cách lấy ví dụ sau 像: \"kiểu như…, giống như…\"."
  },
  {
   "title": "IV. 只好 have no choice but to",
   "points": [
    {
     "label": null,
     "formula": "“只好” is used in the situation where the subject has no alternative but to do something. 如果發生這些事，你會怎麼說？ What do you say if these things happen?",
     "examples": [
      {
       "hz": "因為訂不到去花蓮的火車票，我們只好坐飛機去。",
       "vi": "Vì không đặt được vé tàu đi Hoa Liên, chúng tôi đành phải đi máy bay.",
       "py": "Yīnwèi dìng búdào qù Huālián de huǒchēpiào, wǒmen zhǐhǎo zuòfēijī qù."
      },
      {
       "hz": "妹妹想跟同學去看電影，可是明天有考試，只好在家看書。",
       "vi": "Em gái muốn đi xem phim với bạn, nhưng ngày mai có bài kiểm tra nên đành ở nhà học bài.",
       "py": "Mèimei xiǎng gēn tóngxué qù kàn diànyǐng, kěshì míngtiān yǒu kǎoshì, zhǐhǎo zàijiā kànshū."
      },
      {
       "hz": "這個月我買了太多衣服，現在錢包裡只剩下三百塊錢，只好每天吃麵包了。",
       "vi": "Tháng này tôi mua quá nhiều quần áo, bây giờ trong ví chỉ còn ba trăm đồng, đành ngày nào cũng ăn bánh mì.",
       "py": "Zhège yuè wǒ mǎi le tài duō yīfú, xiànzài qiánbāo lǐ zhǐ shèngxià sānbǎikuài qián, zhǐhǎo měitiān chī miànbāo le."
      },
      {
       "hz": "你本來說要去公園野餐，可是出門的時候，開始下大雨了。",
       "vi": "Bạn vốn định đi dã ngoại ở công viên, nhưng lúc ra khỏi nhà thì trời bắt đầu mưa to.",
       "py": "Nǐ běnlái shuō yào qù gōngyuán yěcān, kěshì chūmén de shíhòu, kāishǐ xià dàyǔ le."
      },
      {
       "hz": "你們去餐廳吃飯，可是到的時候才發現已經沒有位子了。",
       "vi": "Các bạn đi ăn nhà hàng, nhưng đến nơi mới biết đã hết chỗ.",
       "py": "Nǐmen qù cāntīng chīfàn, kěshì dào de shíhòu cái fāxiàn yǐjīng méiyǒu wèizi le."
      },
      {
       "hz": "你要出門的時候，發現腳踏車壞了。",
       "vi": "Lúc định ra ngoài, bạn phát hiện xe đạp bị hỏng.",
       "py": "Nǐ yào chūmén de shíhòu, fāxiàn jiǎotàchē huài le."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只好 — đành phải",
   "giaiThich": "Dùng khi không còn lựa chọn nào khác, đành làm việc gì đó."
  },
  {
   "title": "V. 為了 for the purpose of, in order to",
   "points": [
    {
     "label": null,
     "formula": "“為了” is followed by the purpose of an action or a behavior. verb complement 上：coming into contact The verb complement “上” has three meanings: (A) add something to another thing, e.g., “穿上” and “加上”. (C) a certain status occurs, e.g., “愛上” and “看上”.",
     "examples": [
      {
       "hz": "為了明天的約會，李小姐今天晚上要好好地保養。2. 為了把英文學好，我決定下個學期去英國留學。3. 為了租到比較便宜的公寓，我同學已經找了好幾個地方了。",
       "vi": "Vì buổi hẹn ngày mai, tối nay cô Lý phải chăm sóc da thật kỹ. Để học giỏi tiếng Anh, tôi quyết định học kỳ sau sang Anh du học. Để thuê được căn hộ rẻ hơn, bạn học của tôi đã tìm mấy chỗ rồi.",
       "py": "Wèile míngtiān de yuēhuì, Lǐ xiǎojiě jīntiān wǎnshàng yào hǎohǎo dì bǎoyǎng. 2. Wèile bǎ yīngwén xuéhǎo, wǒ juédìng xià gè xuéqí qù Yīngguó liúxué. 3. Wèile zū dào bǐjiào piányi de gōngyù, wǒ tóngxué yǐjīng zhǎo le hǎojǐgè dìfāng le."
      },
      {
       "hz": "靜文跟以前有什麼不一樣？",
       "vi": "Tịnh Văn có gì khác so với trước đây?",
       "py": "Jìngwén gēn yǐqián yǒu shénme bù yíyàng?"
      },
      {
       "hz": "靜文為什麼有這些改變？",
       "vi": "Tại sao Tịnh Văn có những thay đổi này?",
       "py": "Jìngwén wèishénme yǒu zhèxiē gǎibiàn?"
      },
      {
       "hz": "如果有人為了看韓劇，沒時間寫作業，你覺得好不好？為什麼？",
       "vi": "Nếu có người vì xem phim Hàn mà không có thời gian làm bài tập, bạn thấy có tốt không? Tại sao?",
       "py": "Rúguǒ yǒurén wèile kàn hánjù, méi shíjiān xiě zuòyè, nǐ juéde hǎobùhǎo? Wèishénme?"
      },
      {
       "hz": "靜文喜歡上韓劇以後，他的生活，像吃、穿、用、學......有哪些改變？",
       "vi": "Từ khi mê phim Hàn, cuộc sống của Tịnh Văn như ăn, mặc, dùng, học… đã thay đổi những gì?",
       "py": "Jìngwén xǐhuān shàng hánjù yǐhòu, tā de shēnghuó, xiàng chī, chuān, yòng, xué...... Yǒu nǎxiē gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你知道現在台灣流行什麼嗎？以後呢？你覺得以後台灣會流行什麼？",
       "vi": "Đọc xong bài văn, bạn có biết hiện nay Đài Loan đang thịnh hành gì không? Còn sau này? Bạn nghĩ sau này Đài Loan sẽ thịnh hành gì?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ zhīdào xiànzài Táiwān liúxíng shénme ma? Yǐhòu ne? Nǐ juéde yǐhòu Táiwān huì liúxíng shénme?"
      },
      {
       "hz": "請說說在你的國家，你見過像靜文這樣的人嗎？他們有什麼跟靜文一樣或是不一樣的地方？",
       "vi": "Hãy kể xem ở nước bạn, bạn đã từng gặp người như Tịnh Văn chưa? Họ có điểm gì giống hoặc khác Tịnh Văn?",
       "py": "Qǐng shuō shuō zài nǐ de guójiā, nǐ jiàn guò xiàng Jìngwén zhèyàng de rén ma? Tāmen yǒu shénme gēn Jìngwén yíyàng huòshì bù yíyàng de dìfāng?"
      },
      {
       "hz": "要是你的朋友跟靜文一樣，你會對她說什麼？",
       "vi": "Nếu bạn của bạn giống như Tịnh Văn, bạn sẽ nói gì với cô ấy?",
       "py": "Yàoshì nǐ de péngyǒu gēn Jìngwén yíyàng, nǐ huì duì tā shuō shénme?"
      },
      {
       "hz": "天氣冷了，快把外套穿上吧！2. 便利商店的門貼上了「買咖啡送貼紙」的海報。3. 我要早點兒出門，才趕得上公車。4. 爸爸走得太快，我跟不上。5. 莫以凡一到台灣就喜歡上了台灣文化。6. 那瓶香水很便宜，味道也不好，李小姐一定看不上。",
       "vi": "Trời lạnh rồi, mau mặc áo khoác vào đi! Cửa hàng tiện lợi đã dán tấm áp phích “Mua cà phê tặng nhãn dán” lên cửa. Tôi phải ra khỏi nhà sớm một chút mới kịp xe buýt. Bố đi nhanh quá, tôi theo không kịp. Mạc Dĩ Phàm vừa đến Đài Loan đã thích ngay văn hoá Đài Loan. Lọ nước hoa đó rất rẻ, mùi cũng không thơm, cô Lý chắc chắn không ưng.",
       "py": "Tiānqì lěng le, kuài bǎ wàitào chuān shàng ba! 2. Biànlìshāngdiàn de mén tiē shàng le “mǎi kāfēi sòng tiēzhǐ” de hǎibào. 3. Wǒ yào zǎodiǎn'ér chūmén, cái gǎndeshàng gōngchē. 4. Bàba zǒu de tài kuài, wǒ gēnbúshàng. 5. Mòyǐfán yí dào Táiwān jiù xǐhuān shàng le Táiwān wénhuà. 6. Nà píng xiāngshuǐ hěn piányi, wèidào yě bùhǎo, Lǐ xiǎojiě yídìng kànbúshàng."
      },
      {
       "hz": "V 上：V 上了 / 沒 V 上 / V 得上 / V 不上",
       "vi": "V上: V được rồi / chưa V được / V được / V không được",
       "py": "V shàng: V shàng le / méi V shàng / V de shàng / V bú shàng"
      },
      {
       "hz": "A：你一個月的房租要多少錢？",
       "vi": "A: Tiền thuê nhà một tháng của bạn là bao nhiêu?",
       "py": "A: Nǐ yígèyuè de fángzū yào duōshǎo qián?"
      },
      {
       "hz": "A：為什麼最近李先生常常約張小姐一起吃飯？",
       "vi": "A: Tại sao dạo này anh Lý hay hẹn cô Trương đi ăn?",
       "py": "A: Wèishénme zuìjìn Lǐ xiānshēng chángcháng yuē Zhāng xiǎojiě yìqǐ chīfàn?"
      },
      {
       "hz": "A：請問，這份資料我要寫些什麼？",
       "vi": "A: Cho hỏi, phiếu thông tin này tôi phải điền những gì?",
       "py": "A: Qǐngwèn, zhèfèn zīliào wǒ yào xiě xiē shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "為了 — để, vì mục đích",
   "giaiThich": "為了 nêu mục đích của hành động. Bài cũng có bổ ngữ 上: (A) thêm/khoác lên (穿上), (B) tiếp xúc, (C) đạt tới."
  },
  {
   "title": "II. 因為......的關係 due to...",
   "points": [
    {
     "label": null,
     "formula": "The pattern  “因為......的關係 ” is used when the speaker would like to state a brief cause rather than going into details. Thus, in this pattern, “因為” is followed only by nouns or phrases. 請用提示完成句子。Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "因為工作的關係，他決定搬到公司附近去住。2. 因為放春假的關係，去高雄的高鐵票都賣完了。3. 因為沒時間化妝的關係，金小姐不想去參加舞會。4. 她到韓國留學是因為男朋友的關係。",
       "vi": "Do công việc, anh ấy quyết định chuyển đến sống gần công ty. Do nghỉ xuân, vé tàu cao tốc đi Cao Hùng đã bán hết. Do không có thời gian trang điểm, cô Kim không muốn đi dự tiệc. Cô ấy sang Hàn Quốc du học là vì bạn trai.",
       "py": "Yīnwèi gōngzuò de guānxì, tā juédìng bān dào gōngsī fùjìn qù zhù. 2. Yīnwèi fàng chūnjià de guānxì, qù Gāoxióng de gāotiě piào dōu màiwán le. 3. Yīnwèi méi shíjiān huàzhuāng de guānxì, Jīn xiǎojiě bùxiǎng qù cānjiā wǔhuì. 4. Tā dào Hánguó liúxué shìyīnwèi nánpéngyǒu de guānxì."
      },
      {
       "hz": "A：你為什麼來台灣學中文？",
       "vi": "A: Tại sao bạn đến Đài Loan học tiếng Trung?",
       "py": "A: Nǐ wèishénme lái Táiwān xué zhōngwén?"
      },
      {
       "hz": "A：你們為什麼常常去那家餐廳吃飯？",
       "vi": "A: Tại sao các bạn hay đến nhà hàng đó ăn?",
       "py": "A: Nǐmen wèishénme chángcháng qù nà jiā cāntīng chīfàn?"
      },
      {
       "hz": "這個社區環境很好，你趕快跟房東簽約吧！",
       "vi": "Môi trường khu dân cư này rất tốt, bạn mau ký hợp đồng với chủ nhà đi!",
       "py": "Zhège shèqū huánjìng hěn hǎo, nǐ gǎnkuài gēn fángdōng qiānyuē ba!"
      },
      {
       "hz": "如果你是老闆，你要怎麼做？",
       "vi": "Nếu bạn là chủ cửa hàng, bạn sẽ làm thế nào?",
       "py": "Rúguǒ nǐ shì lǎobǎn, nǐ yào zěnme zuò?"
      },
      {
       "hz": "情況：你是一家商店(或餐廳)的老闆，最近你的店生意不太好。請你用下面的詞彙，先說說生意的情況，再說說怎麼做可以改變這個情況，讓你的生意變好？",
       "vi": "Tình huống: Bạn là chủ một cửa hàng (hoặc nhà hàng), dạo này cửa hàng buôn bán không tốt lắm. Hãy dùng các từ vựng dưới đây, nói về tình hình kinh doanh trước, rồi nói xem làm thế nào để thay đổi tình hình, giúp việc kinh doanh tốt lên?",
       "py": "Qíngkuàng: Nǐ shì yìjiā shāngdiàn (huò cāntīng) de lǎobǎn, zuìjìn nǐ de diàn shēngyì bútàihǎo. Qǐng nǐ yòng xiàmiàn de cíhuì, xiān shuō shuō shēngyì de qíngkuàng, zàishuō shuō zěnme zuò kěyǐ gǎibiàn zhège qíngkuàng, ràng nǐ de shēngyì biàn hǎo?"
      },
      {
       "hz": "請使用下面的生詞、語法：",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây:",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ:"
      },
      {
       "hz": "你的國家最近流行什麼？",
       "vi": "Gần đây nước bạn đang thịnh hành gì?",
       "py": "Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "說明：請你訪問一個台灣人和三個不同國家的同學，問他們下面的問題：1.你的國家最近流行什麼？",
       "vi": "Hướng dẫn: Hãy phỏng vấn một người Đài Loan và ba bạn học đến từ ba nước khác nhau, hỏi họ các câu sau: 1. Gần đây nước bạn đang thịnh hành gì?",
       "py": "Shuōmíng: Qǐng nǐ fǎngwèn yígè táiwānrén hàn sāngè bùtóng guójiā de tóngxué, wèn tāmen xiàmiàn de wèntí: 1. Nǐ de guójiā zuìjìn liúxíng shénme?"
      },
      {
       "hz": "哪些人喜歡這些流行的東西？他們會做什麼跟這些流行有關的事？",
       "vi": "Những ai thích những thứ đang thịnh hành này? Họ làm những gì liên quan đến trào lưu này?",
       "py": "Nǎxiē rén xǐhuān zhèxiē liúxíng de dōngxī? Tāmen huì zuò shénme gēn zhèxiē liúxíng yǒuguān de shì?"
      },
      {
       "hz": "這些流行讓他們的生活有了什麼改變？",
       "vi": "Những trào lưu này đã làm cuộc sống của họ thay đổi thế nào?",
       "py": "Zhèxiē liúxíng ràng tāmen de shēnghuó yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "請你跟大家報告訪問的結果，也把對這些流行的看法說一說。",
       "vi": "Hãy báo cáo kết quả phỏng vấn với cả lớp, và nói cả suy nghĩ của bạn về những trào lưu này.",
       "py": "Qǐng nǐ gēn dàjiā bàogào fǎngwèn de jiéguǒ, yě bǎ duì zhèxiē liúxíng de kànfǎ shuōyìshuō."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "因為……的關係 — do, vì",
   "giaiThich": "Nêu nguyên nhân ngắn gọn, không đi vào chi tiết; sau 因為 chỉ đặt danh từ hoặc cụm danh từ."
  }
 ],
 "td2-9.1": [
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "這張書桌，我想搬到房間去。",
       "vi": "Cái bàn học này, tôi muốn chuyển vào phòng.",
       "py": "Zhè zhāng shūzhuō, wǒ xiǎng bān dào fángjiān qù."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：我的中文書，你拿到哪裡去了？B：我拿到客廳去了。",
       "vi": "A: Sách tiếng Trung của tôi, bạn mang đi đâu rồi? B: Tôi mang ra phòng khách rồi.",
       "py": "A: Wǒ de zhōng wénshū, nǐ nádào nǎlǐ qù le? B: Wǒ nádào kètīng qù le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：請問從這裡走到台北101去要多久？B：不太遠，大概十分鐘就走到了。",
       "vi": "A: Cho hỏi từ đây đi bộ đến Taipei 101 mất bao lâu? B: Không xa lắm, khoảng mười phút là đến.",
       "py": "A: Qǐngwèn cóng zhèlǐ zǒu dào Táiběi 101 qù yào duōjiǔ? B: Bú tài yuǎn, dàgài shífēnzhōng jiù zǒu dào le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "爸爸昨天工作到晚上九點才回家。2.我們今天要去逛街，打算逛到晚上十點。",
       "vi": "Hôm qua bố làm việc đến chín giờ tối mới về nhà. Hôm nay chúng tôi đi dạo phố, định dạo đến mười giờ tối.",
       "py": "Bàba zuótiān gōngzuò dào wǎnshàng jiǔdiǎn cái huíjiā. 2. Wǒmen jīntiān yào qù guàngjiē, dǎsuàn guàng dào wǎnshàng shídiǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：你昨天寫功課寫到幾點？B：寫到半夜兩點才寫完。",
       "vi": "A: Hôm qua bạn làm bài tập đến mấy giờ? B: Làm đến hai giờ sáng mới xong.",
       "py": "A: Nǐ zuótiān xiě gōngkè xiě dào jǐdiǎn? B: Xiě dào bànyè liǎngdiǎn cái xiě wán."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "昨天的歷史課，老師教到第一百六十頁了。2.到那個博物館參觀的遊客,今年增加到三百多萬人了。",
       "vi": "Tiết lịch sử hôm qua, thầy giáo dạy đến trang một trăm sáu mươi. Du khách đến tham quan bảo tàng đó năm nay đã tăng lên hơn ba triệu người.",
       "py": "Zuótiān de lìshǐkè, lǎoshī jiào dào dì yìbǎiliùshí yè le. 2. Dào nàge bówùguǎn cānguān de yóukè, jīnnián zēngjiā dào sānbǎiduōwàn rén le."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number. Use the pattern “ V+到 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "A：下星期一要考試，你念到第幾課了？B：我念到第三課了，還有兩課沒念。",
       "vi": "A: Thứ Hai tuần sau thi rồi, bạn học đến bài mấy rồi? B: Tôi học đến bài ba rồi, còn hai bài chưa học.",
       "py": "A: Xià xīngqíyí yào kǎoshì, nǐ niàn dào dìjǐkè le? B: Wǒ niàn dào dìsānkè le, háiyǒu liǎng kè méi niàn."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      },
      {
       "hz": "A：我要去那家百貨公司，請問搭捷運要搭到哪裡？",
       "vi": "A: Tôi muốn đến trung tâm thương mại đó, cho hỏi đi tàu điện ngầm đến ga nào?",
       "py": "A: Wǒ yào qù nà jiā bǎihuògōngsī, qǐngwèn dā jiéyùn yào dā dào nǎlǐ?"
      },
      {
       "hz": "B：你可以搭藍線，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Bạn có thể đi tuyến Xanh lam, ….",
       "py": "B: Nǐ kěyǐ dā lánxiàn, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這些家具，你打算搬到哪裡去？",
       "vi": "A: Những đồ nội thất này, bạn định chuyển đi đâu?",
       "py": "A: Zhèxiē jiājù, nǐ dǎsuàn bān dào nǎlǐ qù?"
      },
      {
       "hz": "A：這間公寓，你打算租到什麼時候？",
       "vi": "A: Căn hộ này, bạn định thuê đến khi nào?",
       "py": "A: Zhè jiān gōngyù, nǐ dǎsuàn zū dào shénme shíhòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "暑假時，學生都不必去上課，所以學校裡沒幾個人。2. 王先生不怎麼願意做家事，讓太太不怎麼高興。3. 我昨天下午沒去哪裡/什麼地方，都在家休息。",
       "vi": "Nghỉ hè học sinh không phải đi học, nên trong trường chẳng có mấy người. Anh Vương không mấy khi chịu làm việc nhà, khiến vợ chẳng vui lắm. Chiều hôm qua tôi không đi đâu cả, chỉ ở nhà nghỉ ngơi.",
       "py": "Shǔjià shí, xuéshēng dōu búbì qù shàngkè, suǒyǐ xuéxiào lǐ méi jǐgè rén. 2. Wáng xiānshēng bùzěnme yuànyì zuò jiāshì, ràng tàitai bùzěnme gāoxìng. 3. Wǒ zuótiānxiàwǔ méi qù nǎlǐ / shénme dìfāng, dōu zàijiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你昨天吃了那麼多小吃，花了多少錢？B：沒花多少錢，因為價錢都不貴。",
       "vi": "A: Hôm qua bạn ăn bao nhiêu là đồ ăn vặt, tốn bao nhiêu tiền? B: Chẳng tốn bao nhiêu, vì giá đều không đắt.",
       "py": "A: Nǐ zuótiān chī le nàme duō xiǎochī, huā le duōshǎo qián? B: Méi huā duōshǎo qián, yīnwèi jiàqián dōu bú guì."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你想去便利商店買什麼？B：我不想買什麼，只想看看新活動的海報。",
       "vi": "A: Bạn muốn đến cửa hàng tiện lợi mua gì? B: Tôi chẳng định mua gì, chỉ muốn xem áp phích khuyến mãi mới.",
       "py": "A: Nǐ xiǎng qù biànlìshāngdiàn mǎi shénme? B: Wǒ bùxiǎng mǎi shénme, zhǐ xiǎng kànkàn xīn huódòng de hǎibào."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”. Use the pattern ”怎麼這麼 + Vs？ ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "女朋友：你昨天跟誰去KTV唱歌了？快點兒說！男朋友：不要激動！我沒跟誰去，我是一個人去的！",
       "vi": "Bạn gái: Hôm qua anh đi hát karaoke với ai? Nói mau! Bạn trai: Đừng kích động! Anh chẳng đi với ai cả, anh đi một mình!",
       "py": "Nǚpéngyǒu: Nǐ zuótiān gēn shéi qù KTV chànggē le? Kuàidiǎn'ér shuō! Nánpéngyǒu: Búyào jīdòng! Wǒ méi gēn shéi qù, wǒ shì yígè rén qù de!"
      },
      {
       "hz": "A：那塊雞排看起來很辣，你怎麼敢吃？",
       "vi": "A: Miếng gà rán đó trông rất cay, sao bạn dám ăn?",
       "py": "A: Nà kuài jī pái kànqǐlái hěn là, nǐ zěnme gǎn chī?"
      },
      {
       "hz": "B：看起來好像很辣，其實ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Trông có vẻ rất cay, thật ra thì ….",
       "py": "B: Kànqǐlái hǎoxiàng hěn là, qíshí ˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個週末你打算去哪裡？",
       "vi": "A: Cuối tuần này bạn định đi đâu?",
       "py": "A: Zhège zhōumò nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "B：快要期末考了,我ˍˍˍˍˍˍˍˍ，要在家用功讀書。",
       "vi": "B: Sắp thi cuối kỳ rồi, tôi …, phải ở nhà chăm chỉ học bài.",
       "py": "B: Kuàiyào qímòkǎo le, wǒ ˍˍˍˍˍˍˍˍ, yào zàijiā yònggōngdúshū."
      },
      {
       "hz": "A：你剛買的這個皮包多少錢？",
       "vi": "A: Chiếc túi xách bạn vừa mua bao nhiêu tiền?",
       "py": "A: Nǐ gāng mǎi de zhège píbāo duōshǎo qián?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，才一百塊。",
       "vi": "B: …, chỉ một trăm đồng thôi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, cái yìbǎikuài."
      },
      {
       "hz": "A：你有幾個外國朋友？",
       "vi": "A: Bạn có mấy người bạn nước ngoài?",
       "py": "A: Nǐ yǒu jǐgè wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，只有兩個人。",
       "vi": "B: …, chỉ có hai người.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu liǎnggè rén."
      },
      {
       "hz": "A：春假的時候,你是跟誰一起去花蓮的？",
       "vi": "A: Kỳ nghỉ xuân bạn đi Hoa Liên với ai?",
       "py": "A: Chūnjià de shíhòu, nǐ shì gēn shéi yìqǐ qù Huālián de?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，我是一個人去的。",
       "vi": "B: …, tôi đi một mình.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ shì yígè rén qù de."
      },
      {
       "hz": "B：因為他常常運動啊！",
       "vi": "B: Vì anh ấy hay tập thể dục mà!",
       "py": "B: Yīnwèi tā chángcháng yùndòng a!"
      },
      {
       "hz": "B：對啊，我也覺得這篇很難翻。",
       "vi": "B: Đúng vậy, tôi cũng thấy bài này rất khó dịch.",
       "py": "B: Duì a, wǒ yě juéde zhè piān hěn nán fān."
      },
      {
       "hz": "A：珍珠奶茶ˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "A: Trà sữa trân châu …?",
       "py": "A: Zhēnzhūnǎichá ˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "B：如果你覺得太甜，下次可以選無糖或是半糖的。",
       "vi": "B: Nếu bạn thấy quá ngọt, lần sau có thể chọn không đường hoặc nửa đường.",
       "py": "B: Rúguǒ nǐ juéde tài tián, xiàcì kěyǐ xuǎn wú táng huòshì bàn táng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "VI. V 得/不下 enough space to accommodate",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, ”下”is a resultative complement indicating whether or not the subject has enough space to accommodate the object. Sometimes, the situation results from the subject’s mental or physical factors. This resultative complement has only potential structure. Use the pattern ” V 得/不下？ ” to rewrite the sentences. Center of Chinese Language and Culture The pattern of reduplication of state verb is “ Vs Vs 的/地 ”. Reduplication of Vs can be divided into monosyllabic Vs reduplication and disyllabic Vs reduplication. The structure of monosyllabic Vs reduplication is simple; for example, “香香的” and “慢慢地”. On the other hand, the structure of disyllabic Vs (XY) reduplication is “XXYY 的/地”; for example, “漂漂亮亮的” and “舒舒服服地”. This pattern cannot be used together with degree adverb ( “非常”and “很”) because reduplication of Vs already implies a high degree. When reduplication of Vs serves as a predicate, “的” is necessary to be added, e.g.”他的眼睛大大的” and “他房間乾乾淨淨的”. When reduplication of Vs serves as a complement, “的” can be omitted, e.g., “他們玩得開開心心(的)”. However, not every state verb can be used in this pattern. For example, “貴(expensive)”, “忙(busy)”, “新(new)”, “好吃(good to eat)”, “好喝(good to drink)”, “可愛(cute)”, “可怕(terrible)”, “不錯(not bad)” are inappropriate in this pattern.",
     "examples": [
      {
       "hz": "這個盒子裝得下幾塊蛋糕？2. 這間公寓很大，住得下六個人。3. 我剛剛吃了好幾個包子，現在吃不下了。",
       "vi": "Hộp này đựng được mấy miếng bánh kem? Căn hộ này rất rộng, ở được sáu người. Tôi vừa ăn mấy cái bánh bao, bây giờ không ăn nổi nữa.",
       "py": "Zhège hézi zhuāng de xià jǐkuài dàngāo? 2. Zhè jiān gōngyù hěndà, zhù de xià liùgè rén. 3. Wǒ gānggāng chī le hǎojǐgè bāozi, xiànzài chībúxià le."
      },
      {
       "hz": "A：我多買了一碗滷肉飯，你要不要吃？",
       "vi": "A: Tôi mua dư một bát cơm thịt kho, bạn có ăn không?",
       "py": "A: Wǒ duō mǎi le yìwǎn lǔròufàn, nǐ yào búyào chī?"
      },
      {
       "hz": "B：謝謝，我剛吃了半隻烤雞，現在 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Cảm ơn, tôi vừa ăn nửa con gà nướng, bây giờ ….",
       "py": "B: Xièxie, wǒ gāng chī le bànzhī kǎojī, xiànzài ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我們五個要去阿里山，可以坐你的車去嗎？",
       "vi": "A: Năm người chúng tôi định đi A Lý Sơn, đi xe của bạn được không?",
       "py": "A: Wǒmen wǔgè yào qù ālǐshān, kěyǐ zuò nǐ de chē qù ma?"
      },
      {
       "hz": "B：我的車很小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xe của tôi rất nhỏ, ….",
       "py": "B: Wǒ de chē hěnxiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你可以把你去旅遊的心情寫在明信片上，寄給我嗎？",
       "vi": "A: Bạn viết cảm nghĩ về chuyến du lịch lên bưu thiếp rồi gửi cho tôi được không?",
       "py": "A: Nǐ kěyǐ bǎ nǐ qù lǚyóu de xīnqíng xiě zài míngxìnpiàn shàng, jìgěi wǒ ma?"
      },
      {
       "hz": "B：明信片那麼小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "B: Bưu thiếp nhỏ như vậy, …?",
       "py": "B: Míngxìnpiàn nàme xiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "良介覺得學中文難不難？為什麼？你呢？為什麼？",
       "vi": "Ryosuke thấy học tiếng Trung có khó không? Tại sao? Còn bạn? Tại sao?",
       "py": "Liángjiè juéde xué zhōngwén nán bùnán? Wèishénme? Nǐ ne? Wèishénme?"
      },
      {
       "hz": "良介上中文課的時候，要做什麼？你上中文課的時候，也做這些練習嗎？",
       "vi": "Trong giờ học tiếng Trung, Ryosuke phải làm gì? Khi học tiếng Trung, bạn cũng làm những bài luyện tập này chứ?",
       "py": "Liángjiè shàng zhōngwén kè de shíhòu, yào zuò shénme? Nǐ shàng zhōngwén kè de shíhòu, yě zuò zhèxiē liànxí ma?"
      },
      {
       "hz": "良介中文課的期末考要考什麼？要怎麼做，成績才會比較好？",
       "vi": "Bài thi cuối kỳ môn tiếng Trung của Ryosuke thi những gì? Làm thế nào để điểm cao hơn?",
       "py": "Liángjiè zhōngwén kè de qímòkǎo yào kǎo shénme? Yào zěnme zuò, chéngjì cái huì bǐjiào hǎo?"
      },
      {
       "hz": "良介平常怎麼練習中文？你呢？",
       "vi": "Bình thường Ryosuke luyện tiếng Trung thế nào? Còn bạn?",
       "py": "Liángjiè píngcháng zěnme liànxí zhōngwén? Nǐ ne?"
      },
      {
       "hz": "如果不小心迷路了，良介有辦法回家嗎？你在台灣迷過路嗎？",
       "vi": "Nếu không cẩn thận bị lạc đường, Ryosuke có cách nào về nhà không? Bạn đã từng bị lạc ở Đài Loan chưa?",
       "py": "Rúguǒ bù xiǎoxīn mílù le, Liángjiè yǒu bànfǎ huíjiā ma? Nǐ zài Táiwān mí guòlù ma?"
      },
      {
       "hz": "什麼事讓良介很煩惱？你會給他什麼建議？",
       "vi": "Chuyện gì khiến Ryosuke rất phiền não? Bạn sẽ khuyên cậu ấy thế nào?",
       "py": "Shénme shì ràng Liángjiè hěn fánnǎo? Nǐ huì gěi tā shénme jiànyì?"
      },
      {
       "hz": "你的手 ˍˍˍˍˍˍˍˍˍˍ，快去洗一洗。",
       "vi": "Tay bạn …, mau đi rửa đi.",
       "py": "Nǐ de shǒu ˍˍˍˍˍˍˍˍˍˍ, kuài qù xǐ yì xǐ."
      },
      {
       "hz": "那件 ˍˍˍˍˍˍˍˍ 毛衣，大家都覺得很好看。",
       "vi": "Chiếc áo len … đó, mọi người đều thấy rất đẹp.",
       "py": "Nà jiàn ˍˍˍˍˍˍˍˍ máoyī, dàjiā dōu juéde hěn hǎokàn."
      },
      {
       "hz": "這間公寓又大又乾淨，我跟室友住得 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Căn hộ này vừa rộng vừa sạch, tôi và bạn cùng phòng ở ….",
       "py": "Zhè jiān gōngyù yòu dà yòu gānjìng, wǒ gēn shìyǒu zhù de ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我們 ˍˍˍˍˍˍˍˍˍˍˍ 慶祝他的生日。",
       "vi": "Chúng tôi … mừng sinh nhật anh ấy.",
       "py": "Wǒmen ˍˍˍˍˍˍˍˍˍˍˍ qìngzhù tā de shēngrì."
      },
      {
       "hz": "為了讓你的中文進步，你可以怎麼做？請使用下面的生詞、語法說一說。",
       "vi": "Để tiếng Trung tiến bộ, bạn có thể làm gì? Hãy dùng các từ mới và ngữ pháp dưới đây để nói.",
       "py": "Wèile ràng nǐ de zhōngwén jìnbù, nǐ kěyǐ zěnme zuò? Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ shuōyìshuō."
      },
      {
       "hz": "你想在哪裡讀書？",
       "vi": "Bạn muốn học ở đâu?",
       "py": "Nǐ xiǎng zài nǎlǐ dúshū?"
      },
      {
       "hz": "你覺得在國內讀書還是出國留學比較好？請跟同學討論討論。",
       "vi": "Bạn thấy học trong nước hay ra nước ngoài du học tốt hơn? Hãy thảo luận với các bạn cùng lớp.",
       "py": "Nǐ juéde zài guónèi dúshū háishì chūguó liúxué bǐjiào hǎo? Qǐng gēn tóngxué tǎolùn tǎolùn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得下 / V 不下 — chứa được / không chứa nổi",
   "giaiThich": "下 là bổ ngữ kết quả, cho biết có đủ chỗ chứa hay không; đôi khi chỉ khả năng chấp nhận về mặt tâm lý (吃不下 — không nuốt nổi)."
  }
 ],
 "td2-9.2": [
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "這張書桌，我想搬到房間去。",
       "vi": "Cái bàn học này, tôi muốn chuyển vào phòng.",
       "py": "Zhè zhāng shūzhuō, wǒ xiǎng bān dào fángjiān qù."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：我的中文書，你拿到哪裡去了？B：我拿到客廳去了。",
       "vi": "A: Sách tiếng Trung của tôi, bạn mang đi đâu rồi? B: Tôi mang ra phòng khách rồi.",
       "py": "A: Wǒ de zhōng wénshū, nǐ nádào nǎlǐ qù le? B: Wǒ nádào kètīng qù le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：請問從這裡走到台北101去要多久？B：不太遠，大概十分鐘就走到了。",
       "vi": "A: Cho hỏi từ đây đi bộ đến Taipei 101 mất bao lâu? B: Không xa lắm, khoảng mười phút là đến.",
       "py": "A: Qǐngwèn cóng zhèlǐ zǒu dào Táiběi 101 qù yào duōjiǔ? B: Bú tài yuǎn, dàgài shífēnzhōng jiù zǒu dào le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "爸爸昨天工作到晚上九點才回家。2.我們今天要去逛街，打算逛到晚上十點。",
       "vi": "Hôm qua bố làm việc đến chín giờ tối mới về nhà. Hôm nay chúng tôi đi dạo phố, định dạo đến mười giờ tối.",
       "py": "Bàba zuótiān gōngzuò dào wǎnshàng jiǔdiǎn cái huíjiā. 2. Wǒmen jīntiān yào qù guàngjiē, dǎsuàn guàng dào wǎnshàng shídiǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：你昨天寫功課寫到幾點？B：寫到半夜兩點才寫完。",
       "vi": "A: Hôm qua bạn làm bài tập đến mấy giờ? B: Làm đến hai giờ sáng mới xong.",
       "py": "A: Nǐ zuótiān xiě gōngkè xiě dào jǐdiǎn? B: Xiě dào bànyè liǎngdiǎn cái xiě wán."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "昨天的歷史課，老師教到第一百六十頁了。2.到那個博物館參觀的遊客,今年增加到三百多萬人了。",
       "vi": "Tiết lịch sử hôm qua, thầy giáo dạy đến trang một trăm sáu mươi. Du khách đến tham quan bảo tàng đó năm nay đã tăng lên hơn ba triệu người.",
       "py": "Zuótiān de lìshǐkè, lǎoshī jiào dào dì yìbǎiliùshí yè le. 2. Dào nàge bówùguǎn cānguān de yóukè, jīnnián zēngjiā dào sānbǎiduōwàn rén le."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number. Use the pattern “ V+到 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "A：下星期一要考試，你念到第幾課了？B：我念到第三課了，還有兩課沒念。",
       "vi": "A: Thứ Hai tuần sau thi rồi, bạn học đến bài mấy rồi? B: Tôi học đến bài ba rồi, còn hai bài chưa học.",
       "py": "A: Xià xīngqíyí yào kǎoshì, nǐ niàn dào dìjǐkè le? B: Wǒ niàn dào dìsānkè le, háiyǒu liǎng kè méi niàn."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      },
      {
       "hz": "A：我要去那家百貨公司，請問搭捷運要搭到哪裡？",
       "vi": "A: Tôi muốn đến trung tâm thương mại đó, cho hỏi đi tàu điện ngầm đến ga nào?",
       "py": "A: Wǒ yào qù nà jiā bǎihuògōngsī, qǐngwèn dā jiéyùn yào dā dào nǎlǐ?"
      },
      {
       "hz": "B：你可以搭藍線，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Bạn có thể đi tuyến Xanh lam, ….",
       "py": "B: Nǐ kěyǐ dā lánxiàn, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這些家具，你打算搬到哪裡去？",
       "vi": "A: Những đồ nội thất này, bạn định chuyển đi đâu?",
       "py": "A: Zhèxiē jiājù, nǐ dǎsuàn bān dào nǎlǐ qù?"
      },
      {
       "hz": "A：這間公寓，你打算租到什麼時候？",
       "vi": "A: Căn hộ này, bạn định thuê đến khi nào?",
       "py": "A: Zhè jiān gōngyù, nǐ dǎsuàn zū dào shénme shíhòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "暑假時，學生都不必去上課，所以學校裡沒幾個人。2. 王先生不怎麼願意做家事，讓太太不怎麼高興。3. 我昨天下午沒去哪裡/什麼地方，都在家休息。",
       "vi": "Nghỉ hè học sinh không phải đi học, nên trong trường chẳng có mấy người. Anh Vương không mấy khi chịu làm việc nhà, khiến vợ chẳng vui lắm. Chiều hôm qua tôi không đi đâu cả, chỉ ở nhà nghỉ ngơi.",
       "py": "Shǔjià shí, xuéshēng dōu búbì qù shàngkè, suǒyǐ xuéxiào lǐ méi jǐgè rén. 2. Wáng xiānshēng bùzěnme yuànyì zuò jiāshì, ràng tàitai bùzěnme gāoxìng. 3. Wǒ zuótiānxiàwǔ méi qù nǎlǐ / shénme dìfāng, dōu zàijiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你昨天吃了那麼多小吃，花了多少錢？B：沒花多少錢，因為價錢都不貴。",
       "vi": "A: Hôm qua bạn ăn bao nhiêu là đồ ăn vặt, tốn bao nhiêu tiền? B: Chẳng tốn bao nhiêu, vì giá đều không đắt.",
       "py": "A: Nǐ zuótiān chī le nàme duō xiǎochī, huā le duōshǎo qián? B: Méi huā duōshǎo qián, yīnwèi jiàqián dōu bú guì."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你想去便利商店買什麼？B：我不想買什麼，只想看看新活動的海報。",
       "vi": "A: Bạn muốn đến cửa hàng tiện lợi mua gì? B: Tôi chẳng định mua gì, chỉ muốn xem áp phích khuyến mãi mới.",
       "py": "A: Nǐ xiǎng qù biànlìshāngdiàn mǎi shénme? B: Wǒ bùxiǎng mǎi shénme, zhǐ xiǎng kànkàn xīn huódòng de hǎibào."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”. Use the pattern ”怎麼這麼 + Vs？ ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "女朋友：你昨天跟誰去KTV唱歌了？快點兒說！男朋友：不要激動！我沒跟誰去，我是一個人去的！",
       "vi": "Bạn gái: Hôm qua anh đi hát karaoke với ai? Nói mau! Bạn trai: Đừng kích động! Anh chẳng đi với ai cả, anh đi một mình!",
       "py": "Nǚpéngyǒu: Nǐ zuótiān gēn shéi qù KTV chànggē le? Kuàidiǎn'ér shuō! Nánpéngyǒu: Búyào jīdòng! Wǒ méi gēn shéi qù, wǒ shì yígè rén qù de!"
      },
      {
       "hz": "A：那塊雞排看起來很辣，你怎麼敢吃？",
       "vi": "A: Miếng gà rán đó trông rất cay, sao bạn dám ăn?",
       "py": "A: Nà kuài jī pái kànqǐlái hěn là, nǐ zěnme gǎn chī?"
      },
      {
       "hz": "B：看起來好像很辣，其實ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Trông có vẻ rất cay, thật ra thì ….",
       "py": "B: Kànqǐlái hǎoxiàng hěn là, qíshí ˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個週末你打算去哪裡？",
       "vi": "A: Cuối tuần này bạn định đi đâu?",
       "py": "A: Zhège zhōumò nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "B：快要期末考了,我ˍˍˍˍˍˍˍˍ，要在家用功讀書。",
       "vi": "B: Sắp thi cuối kỳ rồi, tôi …, phải ở nhà chăm chỉ học bài.",
       "py": "B: Kuàiyào qímòkǎo le, wǒ ˍˍˍˍˍˍˍˍ, yào zàijiā yònggōngdúshū."
      },
      {
       "hz": "A：你剛買的這個皮包多少錢？",
       "vi": "A: Chiếc túi xách bạn vừa mua bao nhiêu tiền?",
       "py": "A: Nǐ gāng mǎi de zhège píbāo duōshǎo qián?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，才一百塊。",
       "vi": "B: …, chỉ một trăm đồng thôi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, cái yìbǎikuài."
      },
      {
       "hz": "A：你有幾個外國朋友？",
       "vi": "A: Bạn có mấy người bạn nước ngoài?",
       "py": "A: Nǐ yǒu jǐgè wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，只有兩個人。",
       "vi": "B: …, chỉ có hai người.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu liǎnggè rén."
      },
      {
       "hz": "A：春假的時候,你是跟誰一起去花蓮的？",
       "vi": "A: Kỳ nghỉ xuân bạn đi Hoa Liên với ai?",
       "py": "A: Chūnjià de shíhòu, nǐ shì gēn shéi yìqǐ qù Huālián de?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，我是一個人去的。",
       "vi": "B: …, tôi đi một mình.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ shì yígè rén qù de."
      },
      {
       "hz": "B：因為他常常運動啊！",
       "vi": "B: Vì anh ấy hay tập thể dục mà!",
       "py": "B: Yīnwèi tā chángcháng yùndòng a!"
      },
      {
       "hz": "B：對啊，我也覺得這篇很難翻。",
       "vi": "B: Đúng vậy, tôi cũng thấy bài này rất khó dịch.",
       "py": "B: Duì a, wǒ yě juéde zhè piān hěn nán fān."
      },
      {
       "hz": "A：珍珠奶茶ˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "A: Trà sữa trân châu …?",
       "py": "A: Zhēnzhūnǎichá ˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "B：如果你覺得太甜，下次可以選無糖或是半糖的。",
       "vi": "B: Nếu bạn thấy quá ngọt, lần sau có thể chọn không đường hoặc nửa đường.",
       "py": "B: Rúguǒ nǐ juéde tài tián, xiàcì kěyǐ xuǎn wú táng huòshì bàn táng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "VI. V 得/不下 enough space to accommodate",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, ”下”is a resultative complement indicating whether or not the subject has enough space to accommodate the object. Sometimes, the situation results from the subject’s mental or physical factors. This resultative complement has only potential structure. Use the pattern ” V 得/不下？ ” to rewrite the sentences. Center of Chinese Language and Culture The pattern of reduplication of state verb is “ Vs Vs 的/地 ”. Reduplication of Vs can be divided into monosyllabic Vs reduplication and disyllabic Vs reduplication. The structure of monosyllabic Vs reduplication is simple; for example, “香香的” and “慢慢地”. On the other hand, the structure of disyllabic Vs (XY) reduplication is “XXYY 的/地”; for example, “漂漂亮亮的” and “舒舒服服地”. This pattern cannot be used together with degree adverb ( “非常”and “很”) because reduplication of Vs already implies a high degree. When reduplication of Vs serves as a predicate, “的” is necessary to be added, e.g.”他的眼睛大大的” and “他房間乾乾淨淨的”. When reduplication of Vs serves as a complement, “的” can be omitted, e.g., “他們玩得開開心心(的)”. However, not every state verb can be used in this pattern. For example, “貴(expensive)”, “忙(busy)”, “新(new)”, “好吃(good to eat)”, “好喝(good to drink)”, “可愛(cute)”, “可怕(terrible)”, “不錯(not bad)” are inappropriate in this pattern.",
     "examples": [
      {
       "hz": "這個盒子裝得下幾塊蛋糕？2. 這間公寓很大，住得下六個人。3. 我剛剛吃了好幾個包子，現在吃不下了。",
       "vi": "Hộp này đựng được mấy miếng bánh kem? Căn hộ này rất rộng, ở được sáu người. Tôi vừa ăn mấy cái bánh bao, bây giờ không ăn nổi nữa.",
       "py": "Zhège hézi zhuāng de xià jǐkuài dàngāo? 2. Zhè jiān gōngyù hěndà, zhù de xià liùgè rén. 3. Wǒ gānggāng chī le hǎojǐgè bāozi, xiànzài chībúxià le."
      },
      {
       "hz": "A：我多買了一碗滷肉飯，你要不要吃？",
       "vi": "A: Tôi mua dư một bát cơm thịt kho, bạn có ăn không?",
       "py": "A: Wǒ duō mǎi le yìwǎn lǔròufàn, nǐ yào búyào chī?"
      },
      {
       "hz": "B：謝謝，我剛吃了半隻烤雞，現在 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Cảm ơn, tôi vừa ăn nửa con gà nướng, bây giờ ….",
       "py": "B: Xièxie, wǒ gāng chī le bànzhī kǎojī, xiànzài ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我們五個要去阿里山，可以坐你的車去嗎？",
       "vi": "A: Năm người chúng tôi định đi A Lý Sơn, đi xe của bạn được không?",
       "py": "A: Wǒmen wǔgè yào qù ālǐshān, kěyǐ zuò nǐ de chē qù ma?"
      },
      {
       "hz": "B：我的車很小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xe của tôi rất nhỏ, ….",
       "py": "B: Wǒ de chē hěnxiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你可以把你去旅遊的心情寫在明信片上，寄給我嗎？",
       "vi": "A: Bạn viết cảm nghĩ về chuyến du lịch lên bưu thiếp rồi gửi cho tôi được không?",
       "py": "A: Nǐ kěyǐ bǎ nǐ qù lǚyóu de xīnqíng xiě zài míngxìnpiàn shàng, jìgěi wǒ ma?"
      },
      {
       "hz": "B：明信片那麼小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "B: Bưu thiếp nhỏ như vậy, …?",
       "py": "B: Míngxìnpiàn nàme xiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "良介覺得學中文難不難？為什麼？你呢？為什麼？",
       "vi": "Ryosuke thấy học tiếng Trung có khó không? Tại sao? Còn bạn? Tại sao?",
       "py": "Liángjiè juéde xué zhōngwén nán bùnán? Wèishénme? Nǐ ne? Wèishénme?"
      },
      {
       "hz": "良介上中文課的時候，要做什麼？你上中文課的時候，也做這些練習嗎？",
       "vi": "Trong giờ học tiếng Trung, Ryosuke phải làm gì? Khi học tiếng Trung, bạn cũng làm những bài luyện tập này chứ?",
       "py": "Liángjiè shàng zhōngwén kè de shíhòu, yào zuò shénme? Nǐ shàng zhōngwén kè de shíhòu, yě zuò zhèxiē liànxí ma?"
      },
      {
       "hz": "良介中文課的期末考要考什麼？要怎麼做，成績才會比較好？",
       "vi": "Bài thi cuối kỳ môn tiếng Trung của Ryosuke thi những gì? Làm thế nào để điểm cao hơn?",
       "py": "Liángjiè zhōngwén kè de qímòkǎo yào kǎo shénme? Yào zěnme zuò, chéngjì cái huì bǐjiào hǎo?"
      },
      {
       "hz": "良介平常怎麼練習中文？你呢？",
       "vi": "Bình thường Ryosuke luyện tiếng Trung thế nào? Còn bạn?",
       "py": "Liángjiè píngcháng zěnme liànxí zhōngwén? Nǐ ne?"
      },
      {
       "hz": "如果不小心迷路了，良介有辦法回家嗎？你在台灣迷過路嗎？",
       "vi": "Nếu không cẩn thận bị lạc đường, Ryosuke có cách nào về nhà không? Bạn đã từng bị lạc ở Đài Loan chưa?",
       "py": "Rúguǒ bù xiǎoxīn mílù le, Liángjiè yǒu bànfǎ huíjiā ma? Nǐ zài Táiwān mí guòlù ma?"
      },
      {
       "hz": "什麼事讓良介很煩惱？你會給他什麼建議？",
       "vi": "Chuyện gì khiến Ryosuke rất phiền não? Bạn sẽ khuyên cậu ấy thế nào?",
       "py": "Shénme shì ràng Liángjiè hěn fánnǎo? Nǐ huì gěi tā shénme jiànyì?"
      },
      {
       "hz": "你的手 ˍˍˍˍˍˍˍˍˍˍ，快去洗一洗。",
       "vi": "Tay bạn …, mau đi rửa đi.",
       "py": "Nǐ de shǒu ˍˍˍˍˍˍˍˍˍˍ, kuài qù xǐ yì xǐ."
      },
      {
       "hz": "那件 ˍˍˍˍˍˍˍˍ 毛衣，大家都覺得很好看。",
       "vi": "Chiếc áo len … đó, mọi người đều thấy rất đẹp.",
       "py": "Nà jiàn ˍˍˍˍˍˍˍˍ máoyī, dàjiā dōu juéde hěn hǎokàn."
      },
      {
       "hz": "這間公寓又大又乾淨，我跟室友住得 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Căn hộ này vừa rộng vừa sạch, tôi và bạn cùng phòng ở ….",
       "py": "Zhè jiān gōngyù yòu dà yòu gānjìng, wǒ gēn shìyǒu zhù de ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我們 ˍˍˍˍˍˍˍˍˍˍˍ 慶祝他的生日。",
       "vi": "Chúng tôi … mừng sinh nhật anh ấy.",
       "py": "Wǒmen ˍˍˍˍˍˍˍˍˍˍˍ qìngzhù tā de shēngrì."
      },
      {
       "hz": "為了讓你的中文進步，你可以怎麼做？請使用下面的生詞、語法說一說。",
       "vi": "Để tiếng Trung tiến bộ, bạn có thể làm gì? Hãy dùng các từ mới và ngữ pháp dưới đây để nói.",
       "py": "Wèile ràng nǐ de zhōngwén jìnbù, nǐ kěyǐ zěnme zuò? Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ shuōyìshuō."
      },
      {
       "hz": "你想在哪裡讀書？",
       "vi": "Bạn muốn học ở đâu?",
       "py": "Nǐ xiǎng zài nǎlǐ dúshū?"
      },
      {
       "hz": "你覺得在國內讀書還是出國留學比較好？請跟同學討論討論。",
       "vi": "Bạn thấy học trong nước hay ra nước ngoài du học tốt hơn? Hãy thảo luận với các bạn cùng lớp.",
       "py": "Nǐ juéde zài guónèi dúshū háishì chūguó liúxué bǐjiào hǎo? Qǐng gēn tóngxué tǎolùn tǎolùn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得下 / V 不下 — chứa được / không chứa nổi",
   "giaiThich": "下 là bổ ngữ kết quả, cho biết có đủ chỗ chứa hay không; đôi khi chỉ khả năng chấp nhận về mặt tâm lý (吃不下 — không nuốt nổi)."
  }
 ],
 "td2-9.3": [
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "這張書桌，我想搬到房間去。",
       "vi": "Cái bàn học này, tôi muốn chuyển vào phòng.",
       "py": "Zhè zhāng shūzhuō, wǒ xiǎng bān dào fángjiān qù."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：我的中文書，你拿到哪裡去了？B：我拿到客廳去了。",
       "vi": "A: Sách tiếng Trung của tôi, bạn mang đi đâu rồi? B: Tôi mang ra phòng khách rồi.",
       "py": "A: Wǒ de zhōng wénshū, nǐ nádào nǎlǐ qù le? B: Wǒ nádào kètīng qù le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：請問從這裡走到台北101去要多久？B：不太遠，大概十分鐘就走到了。",
       "vi": "A: Cho hỏi từ đây đi bộ đến Taipei 101 mất bao lâu? B: Không xa lắm, khoảng mười phút là đến.",
       "py": "A: Qǐngwèn cóng zhèlǐ zǒu dào Táiběi 101 qù yào duōjiǔ? B: Bú tài yuǎn, dàgài shífēnzhōng jiù zǒu dào le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "爸爸昨天工作到晚上九點才回家。2.我們今天要去逛街，打算逛到晚上十點。",
       "vi": "Hôm qua bố làm việc đến chín giờ tối mới về nhà. Hôm nay chúng tôi đi dạo phố, định dạo đến mười giờ tối.",
       "py": "Bàba zuótiān gōngzuò dào wǎnshàng jiǔdiǎn cái huíjiā. 2. Wǒmen jīntiān yào qù guàngjiē, dǎsuàn guàng dào wǎnshàng shídiǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：你昨天寫功課寫到幾點？B：寫到半夜兩點才寫完。",
       "vi": "A: Hôm qua bạn làm bài tập đến mấy giờ? B: Làm đến hai giờ sáng mới xong.",
       "py": "A: Nǐ zuótiān xiě gōngkè xiě dào jǐdiǎn? B: Xiě dào bànyè liǎngdiǎn cái xiě wán."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "昨天的歷史課，老師教到第一百六十頁了。2.到那個博物館參觀的遊客,今年增加到三百多萬人了。",
       "vi": "Tiết lịch sử hôm qua, thầy giáo dạy đến trang một trăm sáu mươi. Du khách đến tham quan bảo tàng đó năm nay đã tăng lên hơn ba triệu người.",
       "py": "Zuótiān de lìshǐkè, lǎoshī jiào dào dì yìbǎiliùshí yè le. 2. Dào nàge bówùguǎn cānguān de yóukè, jīnnián zēngjiā dào sānbǎiduōwàn rén le."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number. Use the pattern “ V+到 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "A：下星期一要考試，你念到第幾課了？B：我念到第三課了，還有兩課沒念。",
       "vi": "A: Thứ Hai tuần sau thi rồi, bạn học đến bài mấy rồi? B: Tôi học đến bài ba rồi, còn hai bài chưa học.",
       "py": "A: Xià xīngqíyí yào kǎoshì, nǐ niàn dào dìjǐkè le? B: Wǒ niàn dào dìsānkè le, háiyǒu liǎng kè méi niàn."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      },
      {
       "hz": "A：我要去那家百貨公司，請問搭捷運要搭到哪裡？",
       "vi": "A: Tôi muốn đến trung tâm thương mại đó, cho hỏi đi tàu điện ngầm đến ga nào?",
       "py": "A: Wǒ yào qù nà jiā bǎihuògōngsī, qǐngwèn dā jiéyùn yào dā dào nǎlǐ?"
      },
      {
       "hz": "B：你可以搭藍線，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Bạn có thể đi tuyến Xanh lam, ….",
       "py": "B: Nǐ kěyǐ dā lánxiàn, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這些家具，你打算搬到哪裡去？",
       "vi": "A: Những đồ nội thất này, bạn định chuyển đi đâu?",
       "py": "A: Zhèxiē jiājù, nǐ dǎsuàn bān dào nǎlǐ qù?"
      },
      {
       "hz": "A：這間公寓，你打算租到什麼時候？",
       "vi": "A: Căn hộ này, bạn định thuê đến khi nào?",
       "py": "A: Zhè jiān gōngyù, nǐ dǎsuàn zū dào shénme shíhòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "暑假時，學生都不必去上課，所以學校裡沒幾個人。2. 王先生不怎麼願意做家事，讓太太不怎麼高興。3. 我昨天下午沒去哪裡/什麼地方，都在家休息。",
       "vi": "Nghỉ hè học sinh không phải đi học, nên trong trường chẳng có mấy người. Anh Vương không mấy khi chịu làm việc nhà, khiến vợ chẳng vui lắm. Chiều hôm qua tôi không đi đâu cả, chỉ ở nhà nghỉ ngơi.",
       "py": "Shǔjià shí, xuéshēng dōu búbì qù shàngkè, suǒyǐ xuéxiào lǐ méi jǐgè rén. 2. Wáng xiānshēng bùzěnme yuànyì zuò jiāshì, ràng tàitai bùzěnme gāoxìng. 3. Wǒ zuótiānxiàwǔ méi qù nǎlǐ / shénme dìfāng, dōu zàijiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你昨天吃了那麼多小吃，花了多少錢？B：沒花多少錢，因為價錢都不貴。",
       "vi": "A: Hôm qua bạn ăn bao nhiêu là đồ ăn vặt, tốn bao nhiêu tiền? B: Chẳng tốn bao nhiêu, vì giá đều không đắt.",
       "py": "A: Nǐ zuótiān chī le nàme duō xiǎochī, huā le duōshǎo qián? B: Méi huā duōshǎo qián, yīnwèi jiàqián dōu bú guì."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你想去便利商店買什麼？B：我不想買什麼，只想看看新活動的海報。",
       "vi": "A: Bạn muốn đến cửa hàng tiện lợi mua gì? B: Tôi chẳng định mua gì, chỉ muốn xem áp phích khuyến mãi mới.",
       "py": "A: Nǐ xiǎng qù biànlìshāngdiàn mǎi shénme? B: Wǒ bùxiǎng mǎi shénme, zhǐ xiǎng kànkàn xīn huódòng de hǎibào."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”. Use the pattern ”怎麼這麼 + Vs？ ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "女朋友：你昨天跟誰去KTV唱歌了？快點兒說！男朋友：不要激動！我沒跟誰去，我是一個人去的！",
       "vi": "Bạn gái: Hôm qua anh đi hát karaoke với ai? Nói mau! Bạn trai: Đừng kích động! Anh chẳng đi với ai cả, anh đi một mình!",
       "py": "Nǚpéngyǒu: Nǐ zuótiān gēn shéi qù KTV chànggē le? Kuàidiǎn'ér shuō! Nánpéngyǒu: Búyào jīdòng! Wǒ méi gēn shéi qù, wǒ shì yígè rén qù de!"
      },
      {
       "hz": "A：那塊雞排看起來很辣，你怎麼敢吃？",
       "vi": "A: Miếng gà rán đó trông rất cay, sao bạn dám ăn?",
       "py": "A: Nà kuài jī pái kànqǐlái hěn là, nǐ zěnme gǎn chī?"
      },
      {
       "hz": "B：看起來好像很辣，其實ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Trông có vẻ rất cay, thật ra thì ….",
       "py": "B: Kànqǐlái hǎoxiàng hěn là, qíshí ˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個週末你打算去哪裡？",
       "vi": "A: Cuối tuần này bạn định đi đâu?",
       "py": "A: Zhège zhōumò nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "B：快要期末考了,我ˍˍˍˍˍˍˍˍ，要在家用功讀書。",
       "vi": "B: Sắp thi cuối kỳ rồi, tôi …, phải ở nhà chăm chỉ học bài.",
       "py": "B: Kuàiyào qímòkǎo le, wǒ ˍˍˍˍˍˍˍˍ, yào zàijiā yònggōngdúshū."
      },
      {
       "hz": "A：你剛買的這個皮包多少錢？",
       "vi": "A: Chiếc túi xách bạn vừa mua bao nhiêu tiền?",
       "py": "A: Nǐ gāng mǎi de zhège píbāo duōshǎo qián?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，才一百塊。",
       "vi": "B: …, chỉ một trăm đồng thôi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, cái yìbǎikuài."
      },
      {
       "hz": "A：你有幾個外國朋友？",
       "vi": "A: Bạn có mấy người bạn nước ngoài?",
       "py": "A: Nǐ yǒu jǐgè wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，只有兩個人。",
       "vi": "B: …, chỉ có hai người.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu liǎnggè rén."
      },
      {
       "hz": "A：春假的時候,你是跟誰一起去花蓮的？",
       "vi": "A: Kỳ nghỉ xuân bạn đi Hoa Liên với ai?",
       "py": "A: Chūnjià de shíhòu, nǐ shì gēn shéi yìqǐ qù Huālián de?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，我是一個人去的。",
       "vi": "B: …, tôi đi một mình.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ shì yígè rén qù de."
      },
      {
       "hz": "B：因為他常常運動啊！",
       "vi": "B: Vì anh ấy hay tập thể dục mà!",
       "py": "B: Yīnwèi tā chángcháng yùndòng a!"
      },
      {
       "hz": "B：對啊，我也覺得這篇很難翻。",
       "vi": "B: Đúng vậy, tôi cũng thấy bài này rất khó dịch.",
       "py": "B: Duì a, wǒ yě juéde zhè piān hěn nán fān."
      },
      {
       "hz": "A：珍珠奶茶ˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "A: Trà sữa trân châu …?",
       "py": "A: Zhēnzhūnǎichá ˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "B：如果你覺得太甜，下次可以選無糖或是半糖的。",
       "vi": "B: Nếu bạn thấy quá ngọt, lần sau có thể chọn không đường hoặc nửa đường.",
       "py": "B: Rúguǒ nǐ juéde tài tián, xiàcì kěyǐ xuǎn wú táng huòshì bàn táng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "VI. V 得/不下 enough space to accommodate",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, ”下”is a resultative complement indicating whether or not the subject has enough space to accommodate the object. Sometimes, the situation results from the subject’s mental or physical factors. This resultative complement has only potential structure. Use the pattern ” V 得/不下？ ” to rewrite the sentences. Center of Chinese Language and Culture The pattern of reduplication of state verb is “ Vs Vs 的/地 ”. Reduplication of Vs can be divided into monosyllabic Vs reduplication and disyllabic Vs reduplication. The structure of monosyllabic Vs reduplication is simple; for example, “香香的” and “慢慢地”. On the other hand, the structure of disyllabic Vs (XY) reduplication is “XXYY 的/地”; for example, “漂漂亮亮的” and “舒舒服服地”. This pattern cannot be used together with degree adverb ( “非常”and “很”) because reduplication of Vs already implies a high degree. When reduplication of Vs serves as a predicate, “的” is necessary to be added, e.g.”他的眼睛大大的” and “他房間乾乾淨淨的”. When reduplication of Vs serves as a complement, “的” can be omitted, e.g., “他們玩得開開心心(的)”. However, not every state verb can be used in this pattern. For example, “貴(expensive)”, “忙(busy)”, “新(new)”, “好吃(good to eat)”, “好喝(good to drink)”, “可愛(cute)”, “可怕(terrible)”, “不錯(not bad)” are inappropriate in this pattern.",
     "examples": [
      {
       "hz": "這個盒子裝得下幾塊蛋糕？2. 這間公寓很大，住得下六個人。3. 我剛剛吃了好幾個包子，現在吃不下了。",
       "vi": "Hộp này đựng được mấy miếng bánh kem? Căn hộ này rất rộng, ở được sáu người. Tôi vừa ăn mấy cái bánh bao, bây giờ không ăn nổi nữa.",
       "py": "Zhège hézi zhuāng de xià jǐkuài dàngāo? 2. Zhè jiān gōngyù hěndà, zhù de xià liùgè rén. 3. Wǒ gānggāng chī le hǎojǐgè bāozi, xiànzài chībúxià le."
      },
      {
       "hz": "A：我多買了一碗滷肉飯，你要不要吃？",
       "vi": "A: Tôi mua dư một bát cơm thịt kho, bạn có ăn không?",
       "py": "A: Wǒ duō mǎi le yìwǎn lǔròufàn, nǐ yào búyào chī?"
      },
      {
       "hz": "B：謝謝，我剛吃了半隻烤雞，現在 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Cảm ơn, tôi vừa ăn nửa con gà nướng, bây giờ ….",
       "py": "B: Xièxie, wǒ gāng chī le bànzhī kǎojī, xiànzài ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我們五個要去阿里山，可以坐你的車去嗎？",
       "vi": "A: Năm người chúng tôi định đi A Lý Sơn, đi xe của bạn được không?",
       "py": "A: Wǒmen wǔgè yào qù ālǐshān, kěyǐ zuò nǐ de chē qù ma?"
      },
      {
       "hz": "B：我的車很小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xe của tôi rất nhỏ, ….",
       "py": "B: Wǒ de chē hěnxiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你可以把你去旅遊的心情寫在明信片上，寄給我嗎？",
       "vi": "A: Bạn viết cảm nghĩ về chuyến du lịch lên bưu thiếp rồi gửi cho tôi được không?",
       "py": "A: Nǐ kěyǐ bǎ nǐ qù lǚyóu de xīnqíng xiě zài míngxìnpiàn shàng, jìgěi wǒ ma?"
      },
      {
       "hz": "B：明信片那麼小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "B: Bưu thiếp nhỏ như vậy, …?",
       "py": "B: Míngxìnpiàn nàme xiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "良介覺得學中文難不難？為什麼？你呢？為什麼？",
       "vi": "Ryosuke thấy học tiếng Trung có khó không? Tại sao? Còn bạn? Tại sao?",
       "py": "Liángjiè juéde xué zhōngwén nán bùnán? Wèishénme? Nǐ ne? Wèishénme?"
      },
      {
       "hz": "良介上中文課的時候，要做什麼？你上中文課的時候，也做這些練習嗎？",
       "vi": "Trong giờ học tiếng Trung, Ryosuke phải làm gì? Khi học tiếng Trung, bạn cũng làm những bài luyện tập này chứ?",
       "py": "Liángjiè shàng zhōngwén kè de shíhòu, yào zuò shénme? Nǐ shàng zhōngwén kè de shíhòu, yě zuò zhèxiē liànxí ma?"
      },
      {
       "hz": "良介中文課的期末考要考什麼？要怎麼做，成績才會比較好？",
       "vi": "Bài thi cuối kỳ môn tiếng Trung của Ryosuke thi những gì? Làm thế nào để điểm cao hơn?",
       "py": "Liángjiè zhōngwén kè de qímòkǎo yào kǎo shénme? Yào zěnme zuò, chéngjì cái huì bǐjiào hǎo?"
      },
      {
       "hz": "良介平常怎麼練習中文？你呢？",
       "vi": "Bình thường Ryosuke luyện tiếng Trung thế nào? Còn bạn?",
       "py": "Liángjiè píngcháng zěnme liànxí zhōngwén? Nǐ ne?"
      },
      {
       "hz": "如果不小心迷路了，良介有辦法回家嗎？你在台灣迷過路嗎？",
       "vi": "Nếu không cẩn thận bị lạc đường, Ryosuke có cách nào về nhà không? Bạn đã từng bị lạc ở Đài Loan chưa?",
       "py": "Rúguǒ bù xiǎoxīn mílù le, Liángjiè yǒu bànfǎ huíjiā ma? Nǐ zài Táiwān mí guòlù ma?"
      },
      {
       "hz": "什麼事讓良介很煩惱？你會給他什麼建議？",
       "vi": "Chuyện gì khiến Ryosuke rất phiền não? Bạn sẽ khuyên cậu ấy thế nào?",
       "py": "Shénme shì ràng Liángjiè hěn fánnǎo? Nǐ huì gěi tā shénme jiànyì?"
      },
      {
       "hz": "你的手 ˍˍˍˍˍˍˍˍˍˍ，快去洗一洗。",
       "vi": "Tay bạn …, mau đi rửa đi.",
       "py": "Nǐ de shǒu ˍˍˍˍˍˍˍˍˍˍ, kuài qù xǐ yì xǐ."
      },
      {
       "hz": "那件 ˍˍˍˍˍˍˍˍ 毛衣，大家都覺得很好看。",
       "vi": "Chiếc áo len … đó, mọi người đều thấy rất đẹp.",
       "py": "Nà jiàn ˍˍˍˍˍˍˍˍ máoyī, dàjiā dōu juéde hěn hǎokàn."
      },
      {
       "hz": "這間公寓又大又乾淨，我跟室友住得 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Căn hộ này vừa rộng vừa sạch, tôi và bạn cùng phòng ở ….",
       "py": "Zhè jiān gōngyù yòu dà yòu gānjìng, wǒ gēn shìyǒu zhù de ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我們 ˍˍˍˍˍˍˍˍˍˍˍ 慶祝他的生日。",
       "vi": "Chúng tôi … mừng sinh nhật anh ấy.",
       "py": "Wǒmen ˍˍˍˍˍˍˍˍˍˍˍ qìngzhù tā de shēngrì."
      },
      {
       "hz": "為了讓你的中文進步，你可以怎麼做？請使用下面的生詞、語法說一說。",
       "vi": "Để tiếng Trung tiến bộ, bạn có thể làm gì? Hãy dùng các từ mới và ngữ pháp dưới đây để nói.",
       "py": "Wèile ràng nǐ de zhōngwén jìnbù, nǐ kěyǐ zěnme zuò? Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ shuōyìshuō."
      },
      {
       "hz": "你想在哪裡讀書？",
       "vi": "Bạn muốn học ở đâu?",
       "py": "Nǐ xiǎng zài nǎlǐ dúshū?"
      },
      {
       "hz": "你覺得在國內讀書還是出國留學比較好？請跟同學討論討論。",
       "vi": "Bạn thấy học trong nước hay ra nước ngoài du học tốt hơn? Hãy thảo luận với các bạn cùng lớp.",
       "py": "Nǐ juéde zài guónèi dúshū háishì chūguó liúxué bǐjiào hǎo? Qǐng gēn tóngxué tǎolùn tǎolùn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得下 / V 不下 — chứa được / không chứa nổi",
   "giaiThich": "下 là bổ ngữ kết quả, cho biết có đủ chỗ chứa hay không; đôi khi chỉ khả năng chấp nhận về mặt tâm lý (吃不下 — không nuốt nổi)."
  }
 ],
 "td2-9.4": [
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "這張書桌，我想搬到房間去。",
       "vi": "Cái bàn học này, tôi muốn chuyển vào phòng.",
       "py": "Zhè zhāng shūzhuō, wǒ xiǎng bān dào fángjiān qù."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：我的中文書，你拿到哪裡去了？B：我拿到客廳去了。",
       "vi": "A: Sách tiếng Trung của tôi, bạn mang đi đâu rồi? B: Tôi mang ra phòng khách rồi.",
       "py": "A: Wǒ de zhōng wénshū, nǐ nádào nǎlǐ qù le? B: Wǒ nádào kètīng qù le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到” is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：請問從這裡走到台北101去要多久？B：不太遠，大概十分鐘就走到了。",
       "vi": "A: Cho hỏi từ đây đi bộ đến Taipei 101 mất bao lâu? B: Không xa lắm, khoảng mười phút là đến.",
       "py": "A: Qǐngwèn cóng zhèlǐ zǒu dào Táiběi 101 qù yào duōjiǔ? B: Bú tài yuǎn, dàgài shífēnzhōng jiù zǒu dào le."
      },
      {
       "hz": "(一) V+到+地方+來/去",
       "vi": "(1) V + 到 + nơi chốn + 來/去",
       "py": "(yī) V + dào + dìfāng + lái / qù"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "爸爸昨天工作到晚上九點才回家。2.我們今天要去逛街，打算逛到晚上十點。",
       "vi": "Hôm qua bố làm việc đến chín giờ tối mới về nhà. Hôm nay chúng tôi đi dạo phố, định dạo đến mười giờ tối.",
       "py": "Bàba zuótiān gōngzuò dào wǎnshàng jiǔdiǎn cái huíjiā. 2. Wǒmen jīntiān yào qù guàngjiē, dǎsuàn guàng dào wǎnshàng shídiǎn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "A：你昨天寫功課寫到幾點？B：寫到半夜兩點才寫完。",
       "vi": "A: Hôm qua bạn làm bài tập đến mấy giờ? B: Làm đến hai giờ sáng mới xong.",
       "py": "A: Nǐ zuótiān xiě gōngkè xiě dào jǐdiǎn? B: Xiě dào bànyè liǎngdiǎn cái xiě wán."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number.",
     "examples": [
      {
       "hz": "昨天的歷史課，老師教到第一百六十頁了。2.到那個博物館參觀的遊客,今年增加到三百多萬人了。",
       "vi": "Tiết lịch sử hôm qua, thầy giáo dạy đến trang một trăm sáu mươi. Du khách đến tham quan bảo tàng đó năm nay đã tăng lên hơn ba triệu người.",
       "py": "Zuótiān de lìshǐkè, lǎoshī jiào dào dì yìbǎiliùshí yè le. 2. Dào nàge bówùguǎn cānguān de yóukè, jīnnián zēngjiā dào sānbǎiduōwàn rén le."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "III. V+到 destination marker 到",
   "points": [
    {
     "label": null,
     "formula": "The pattern “V 到”is followed by a destination to which the subject does an action. The destination can be a place, a point of time, a range or a number. Use the pattern “ V+到 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "A：下星期一要考試，你念到第幾課了？B：我念到第三課了，還有兩課沒念。",
       "vi": "A: Thứ Hai tuần sau thi rồi, bạn học đến bài mấy rồi? B: Tôi học đến bài ba rồi, còn hai bài chưa học.",
       "py": "A: Xià xīngqíyí yào kǎoshì, nǐ niàn dào dìjǐkè le? B: Wǒ niàn dào dìsānkè le, háiyǒu liǎng kè méi niàn."
      },
      {
       "hz": "(三) V+到+範圍/數量",
       "vi": "(3) V + 到 + phạm vi / số lượng",
       "py": "(sān) V + dào + fànwéi / shùliàng"
      },
      {
       "hz": "A：我要去那家百貨公司，請問搭捷運要搭到哪裡？",
       "vi": "A: Tôi muốn đến trung tâm thương mại đó, cho hỏi đi tàu điện ngầm đến ga nào?",
       "py": "A: Wǒ yào qù nà jiā bǎihuògōngsī, qǐngwèn dā jiéyùn yào dā dào nǎlǐ?"
      },
      {
       "hz": "B：你可以搭藍線，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Bạn có thể đi tuyến Xanh lam, ….",
       "py": "B: Nǐ kěyǐ dā lánxiàn, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這些家具，你打算搬到哪裡去？",
       "vi": "A: Những đồ nội thất này, bạn định chuyển đi đâu?",
       "py": "A: Zhèxiē jiājù, nǐ dǎsuàn bān dào nǎlǐ qù?"
      },
      {
       "hz": "A：這間公寓，你打算租到什麼時候？",
       "vi": "A: Căn hộ này, bạn định thuê đến khi nào?",
       "py": "A: Zhè jiān gōngyù, nǐ dǎsuàn zū dào shénme shíhòu?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V + 到 — tới đâu, tới mức nào",
   "giaiThich": "到 sau động từ chỉ đích đến: có thể là nơi chốn, mốc thời gian, phạm vi hoặc con số."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "暑假時，學生都不必去上課，所以學校裡沒幾個人。2. 王先生不怎麼願意做家事，讓太太不怎麼高興。3. 我昨天下午沒去哪裡/什麼地方，都在家休息。",
       "vi": "Nghỉ hè học sinh không phải đi học, nên trong trường chẳng có mấy người. Anh Vương không mấy khi chịu làm việc nhà, khiến vợ chẳng vui lắm. Chiều hôm qua tôi không đi đâu cả, chỉ ở nhà nghỉ ngơi.",
       "py": "Shǔjià shí, xuéshēng dōu búbì qù shàngkè, suǒyǐ xuéxiào lǐ méi jǐgè rén. 2. Wáng xiānshēng bùzěnme yuànyì zuò jiāshì, ràng tàitai bùzěnme gāoxìng. 3. Wǒ zuótiānxiàwǔ méi qù nǎlǐ / shénme dìfāng, dōu zàijiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你昨天吃了那麼多小吃，花了多少錢？B：沒花多少錢，因為價錢都不貴。",
       "vi": "A: Hôm qua bạn ăn bao nhiêu là đồ ăn vặt, tốn bao nhiêu tiền? B: Chẳng tốn bao nhiêu, vì giá đều không đắt.",
       "py": "A: Nǐ zuótiān chī le nàme duō xiǎochī, huā le duōshǎo qián? B: Méi huā duōshǎo qián, yīnwèi jiàqián dōu bú guì."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”.",
     "examples": [
      {
       "hz": "A：你想去便利商店買什麼？B：我不想買什麼，只想看看新活動的海報。",
       "vi": "A: Bạn muốn đến cửa hàng tiện lợi mua gì? B: Tôi chẳng định mua gì, chỉ muốn xem áp phích khuyến mãi mới.",
       "py": "A: Nǐ xiǎng qù biànlìshāngdiàn mǎi shénme? B: Wǒ bùxiǎng mǎi shénme, zhǐ xiǎng kànkàn xīn huódòng de hǎibào."
      },
      {
       "hz": "多少/幾M/什麼/哪裡/什麼地方",
       "vi": "bao nhiêu / mấy + lượng từ / gì / đâu / chỗ nào",
       "py": "Duōshǎo / jǐ M / shénme / nǎlǐ / shénme dìfāng"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "IV. non-committal stance with question words",
   "points": [
    {
     "label": null,
     "formula": "This pattern is used when the subject is unwilling to show his/her attitude and avoids giving an explicit response. This pattern is always a negative sentence collocating with question words, such as “什麼”,“多少”,“幾”,“誰”,“哪裡” and “什麼地方”. The structure is ” S+不/沒+V+多少/幾 M/什麼/哪裡/什麼地方+(O) ” or “ S+不/沒+跟+誰+V+(O) ”, “S+不+怎麼+Vs” or “S+不+怎麼+ Vaux+V(+O)”. Use the pattern ”怎麼這麼 + Vs？ ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "女朋友：你昨天跟誰去KTV唱歌了？快點兒說！男朋友：不要激動！我沒跟誰去，我是一個人去的！",
       "vi": "Bạn gái: Hôm qua anh đi hát karaoke với ai? Nói mau! Bạn trai: Đừng kích động! Anh chẳng đi với ai cả, anh đi một mình!",
       "py": "Nǚpéngyǒu: Nǐ zuótiān gēn shéi qù KTV chànggē le? Kuàidiǎn'ér shuō! Nánpéngyǒu: Búyào jīdòng! Wǒ méi gēn shéi qù, wǒ shì yígè rén qù de!"
      },
      {
       "hz": "A：那塊雞排看起來很辣，你怎麼敢吃？",
       "vi": "A: Miếng gà rán đó trông rất cay, sao bạn dám ăn?",
       "py": "A: Nà kuài jī pái kànqǐlái hěn là, nǐ zěnme gǎn chī?"
      },
      {
       "hz": "B：看起來好像很辣，其實ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Trông có vẻ rất cay, thật ra thì ….",
       "py": "B: Kànqǐlái hǎoxiàng hěn là, qíshí ˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個週末你打算去哪裡？",
       "vi": "A: Cuối tuần này bạn định đi đâu?",
       "py": "A: Zhège zhōumò nǐ dǎsuàn qù nǎlǐ?"
      },
      {
       "hz": "B：快要期末考了,我ˍˍˍˍˍˍˍˍ，要在家用功讀書。",
       "vi": "B: Sắp thi cuối kỳ rồi, tôi …, phải ở nhà chăm chỉ học bài.",
       "py": "B: Kuàiyào qímòkǎo le, wǒ ˍˍˍˍˍˍˍˍ, yào zàijiā yònggōngdúshū."
      },
      {
       "hz": "A：你剛買的這個皮包多少錢？",
       "vi": "A: Chiếc túi xách bạn vừa mua bao nhiêu tiền?",
       "py": "A: Nǐ gāng mǎi de zhège píbāo duōshǎo qián?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，才一百塊。",
       "vi": "B: …, chỉ một trăm đồng thôi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, cái yìbǎikuài."
      },
      {
       "hz": "A：你有幾個外國朋友？",
       "vi": "A: Bạn có mấy người bạn nước ngoài?",
       "py": "A: Nǐ yǒu jǐgè wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，只有兩個人。",
       "vi": "B: …, chỉ có hai người.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu liǎnggè rén."
      },
      {
       "hz": "A：春假的時候,你是跟誰一起去花蓮的？",
       "vi": "A: Kỳ nghỉ xuân bạn đi Hoa Liên với ai?",
       "py": "A: Chūnjià de shíhòu, nǐ shì gēn shéi yìqǐ qù Huālián de?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ，我是一個人去的。",
       "vi": "B: …, tôi đi một mình.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ shì yígè rén qù de."
      },
      {
       "hz": "B：因為他常常運動啊！",
       "vi": "B: Vì anh ấy hay tập thể dục mà!",
       "py": "B: Yīnwèi tā chángcháng yùndòng a!"
      },
      {
       "hz": "B：對啊，我也覺得這篇很難翻。",
       "vi": "B: Đúng vậy, tôi cũng thấy bài này rất khó dịch.",
       "py": "B: Duì a, wǒ yě juéde zhè piān hěn nán fān."
      },
      {
       "hz": "A：珍珠奶茶ˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "A: Trà sữa trân châu …?",
       "py": "A: Zhēnzhūnǎichá ˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "B：如果你覺得太甜，下次可以選無糖或是半糖的。",
       "vi": "B: Nếu bạn thấy quá ngọt, lần sau có thể chọn không đường hoặc nửa đường.",
       "py": "B: Rúguǒ nǐ juéde tài tián, xiàcì kěyǐ xuǎn wú táng huòshì bàn táng de."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Từ để hỏi diễn đạt thái độ lấp lửng",
   "giaiThich": "Dùng từ để hỏi trong câu phủ định khi người nói không muốn nêu rõ quan điểm (\"cũng chẳng… gì mấy\")."
  },
  {
   "title": "VI. V 得/不下 enough space to accommodate",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, ”下”is a resultative complement indicating whether or not the subject has enough space to accommodate the object. Sometimes, the situation results from the subject’s mental or physical factors. This resultative complement has only potential structure. Use the pattern ” V 得/不下？ ” to rewrite the sentences. Center of Chinese Language and Culture The pattern of reduplication of state verb is “ Vs Vs 的/地 ”. Reduplication of Vs can be divided into monosyllabic Vs reduplication and disyllabic Vs reduplication. The structure of monosyllabic Vs reduplication is simple; for example, “香香的” and “慢慢地”. On the other hand, the structure of disyllabic Vs (XY) reduplication is “XXYY 的/地”; for example, “漂漂亮亮的” and “舒舒服服地”. This pattern cannot be used together with degree adverb ( “非常”and “很”) because reduplication of Vs already implies a high degree. When reduplication of Vs serves as a predicate, “的” is necessary to be added, e.g.”他的眼睛大大的” and “他房間乾乾淨淨的”. When reduplication of Vs serves as a complement, “的” can be omitted, e.g., “他們玩得開開心心(的)”. However, not every state verb can be used in this pattern. For example, “貴(expensive)”, “忙(busy)”, “新(new)”, “好吃(good to eat)”, “好喝(good to drink)”, “可愛(cute)”, “可怕(terrible)”, “不錯(not bad)” are inappropriate in this pattern.",
     "examples": [
      {
       "hz": "這個盒子裝得下幾塊蛋糕？2. 這間公寓很大，住得下六個人。3. 我剛剛吃了好幾個包子，現在吃不下了。",
       "vi": "Hộp này đựng được mấy miếng bánh kem? Căn hộ này rất rộng, ở được sáu người. Tôi vừa ăn mấy cái bánh bao, bây giờ không ăn nổi nữa.",
       "py": "Zhège hézi zhuāng de xià jǐkuài dàngāo? 2. Zhè jiān gōngyù hěndà, zhù de xià liùgè rén. 3. Wǒ gānggāng chī le hǎojǐgè bāozi, xiànzài chībúxià le."
      },
      {
       "hz": "A：我多買了一碗滷肉飯，你要不要吃？",
       "vi": "A: Tôi mua dư một bát cơm thịt kho, bạn có ăn không?",
       "py": "A: Wǒ duō mǎi le yìwǎn lǔròufàn, nǐ yào búyào chī?"
      },
      {
       "hz": "B：謝謝，我剛吃了半隻烤雞，現在 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Cảm ơn, tôi vừa ăn nửa con gà nướng, bây giờ ….",
       "py": "B: Xièxie, wǒ gāng chī le bànzhī kǎojī, xiànzài ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我們五個要去阿里山，可以坐你的車去嗎？",
       "vi": "A: Năm người chúng tôi định đi A Lý Sơn, đi xe của bạn được không?",
       "py": "A: Wǒmen wǔgè yào qù ālǐshān, kěyǐ zuò nǐ de chē qù ma?"
      },
      {
       "hz": "B：我的車很小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xe của tôi rất nhỏ, ….",
       "py": "B: Wǒ de chē hěnxiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你可以把你去旅遊的心情寫在明信片上，寄給我嗎？",
       "vi": "A: Bạn viết cảm nghĩ về chuyến du lịch lên bưu thiếp rồi gửi cho tôi được không?",
       "py": "A: Nǐ kěyǐ bǎ nǐ qù lǚyóu de xīnqíng xiě zài míngxìnpiàn shàng, jìgěi wǒ ma?"
      },
      {
       "hz": "B：明信片那麼小，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ？",
       "vi": "B: Bưu thiếp nhỏ như vậy, …?",
       "py": "B: Míngxìnpiàn nàme xiǎo, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ?"
      },
      {
       "hz": "良介覺得學中文難不難？為什麼？你呢？為什麼？",
       "vi": "Ryosuke thấy học tiếng Trung có khó không? Tại sao? Còn bạn? Tại sao?",
       "py": "Liángjiè juéde xué zhōngwén nán bùnán? Wèishénme? Nǐ ne? Wèishénme?"
      },
      {
       "hz": "良介上中文課的時候，要做什麼？你上中文課的時候，也做這些練習嗎？",
       "vi": "Trong giờ học tiếng Trung, Ryosuke phải làm gì? Khi học tiếng Trung, bạn cũng làm những bài luyện tập này chứ?",
       "py": "Liángjiè shàng zhōngwén kè de shíhòu, yào zuò shénme? Nǐ shàng zhōngwén kè de shíhòu, yě zuò zhèxiē liànxí ma?"
      },
      {
       "hz": "良介中文課的期末考要考什麼？要怎麼做，成績才會比較好？",
       "vi": "Bài thi cuối kỳ môn tiếng Trung của Ryosuke thi những gì? Làm thế nào để điểm cao hơn?",
       "py": "Liángjiè zhōngwén kè de qímòkǎo yào kǎo shénme? Yào zěnme zuò, chéngjì cái huì bǐjiào hǎo?"
      },
      {
       "hz": "良介平常怎麼練習中文？你呢？",
       "vi": "Bình thường Ryosuke luyện tiếng Trung thế nào? Còn bạn?",
       "py": "Liángjiè píngcháng zěnme liànxí zhōngwén? Nǐ ne?"
      },
      {
       "hz": "如果不小心迷路了，良介有辦法回家嗎？你在台灣迷過路嗎？",
       "vi": "Nếu không cẩn thận bị lạc đường, Ryosuke có cách nào về nhà không? Bạn đã từng bị lạc ở Đài Loan chưa?",
       "py": "Rúguǒ bù xiǎoxīn mílù le, Liángjiè yǒu bànfǎ huíjiā ma? Nǐ zài Táiwān mí guòlù ma?"
      },
      {
       "hz": "什麼事讓良介很煩惱？你會給他什麼建議？",
       "vi": "Chuyện gì khiến Ryosuke rất phiền não? Bạn sẽ khuyên cậu ấy thế nào?",
       "py": "Shénme shì ràng Liángjiè hěn fánnǎo? Nǐ huì gěi tā shénme jiànyì?"
      },
      {
       "hz": "你的手 ˍˍˍˍˍˍˍˍˍˍ，快去洗一洗。",
       "vi": "Tay bạn …, mau đi rửa đi.",
       "py": "Nǐ de shǒu ˍˍˍˍˍˍˍˍˍˍ, kuài qù xǐ yì xǐ."
      },
      {
       "hz": "那件 ˍˍˍˍˍˍˍˍ 毛衣，大家都覺得很好看。",
       "vi": "Chiếc áo len … đó, mọi người đều thấy rất đẹp.",
       "py": "Nà jiàn ˍˍˍˍˍˍˍˍ máoyī, dàjiā dōu juéde hěn hǎokàn."
      },
      {
       "hz": "這間公寓又大又乾淨，我跟室友住得 ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Căn hộ này vừa rộng vừa sạch, tôi và bạn cùng phòng ở ….",
       "py": "Zhè jiān gōngyù yòu dà yòu gānjìng, wǒ gēn shìyǒu zhù de ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我們 ˍˍˍˍˍˍˍˍˍˍˍ 慶祝他的生日。",
       "vi": "Chúng tôi … mừng sinh nhật anh ấy.",
       "py": "Wǒmen ˍˍˍˍˍˍˍˍˍˍˍ qìngzhù tā de shēngrì."
      },
      {
       "hz": "為了讓你的中文進步，你可以怎麼做？請使用下面的生詞、語法說一說。",
       "vi": "Để tiếng Trung tiến bộ, bạn có thể làm gì? Hãy dùng các từ mới và ngữ pháp dưới đây để nói.",
       "py": "Wèile ràng nǐ de zhōngwén jìnbù, nǐ kěyǐ zěnme zuò? Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ shuōyìshuō."
      },
      {
       "hz": "你想在哪裡讀書？",
       "vi": "Bạn muốn học ở đâu?",
       "py": "Nǐ xiǎng zài nǎlǐ dúshū?"
      },
      {
       "hz": "你覺得在國內讀書還是出國留學比較好？請跟同學討論討論。",
       "vi": "Bạn thấy học trong nước hay ra nước ngoài du học tốt hơn? Hãy thảo luận với các bạn cùng lớp.",
       "py": "Nǐ juéde zài guónèi dúshū háishì chūguó liúxué bǐjiào hǎo? Qǐng gēn tóngxué tǎolùn tǎolùn."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得下 / V 不下 — chứa được / không chứa nổi",
   "giaiThich": "下 là bổ ngữ kết quả, cho biết có đủ chỗ chứa hay không; đôi khi chỉ khả năng chấp nhận về mặt tâm lý (吃不下 — không nuốt nổi)."
  }
 ],
 "td2-10.1": [
  {
   "title": "III. 越……越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”.",
     "examples": [
      {
       "hz": "山本良介的中文越說越好了。2. 中文的語法不容易，老師越說，我越不懂。",
       "vi": "Tiếng Trung của Yamamoto Ryosuke càng nói càng giỏi. Ngữ pháp tiếng Trung không dễ, thầy giáo càng giảng tôi càng không hiểu.",
       "py": "Shānběn Liángjiè de zhōngwén yuè shuō yuè hǎo le. 2. Zhōngwén de yǔfǎ bù róngyì, lǎoshī yuè shuō, wǒ yuè bù dǒng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越… 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "III. 越 V 越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”. Use the pattern ”越 V 越......  ” to rewrite the sentences. Use the pattern ”越 V 越......  ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "房子離捷運站越近，房租越貴。4. 李先生很喜歡工作，事情越多，他越高興。",
       "vi": "Nhà càng gần ga tàu điện ngầm thì tiền thuê càng đắt. Anh Lý rất thích làm việc, việc càng nhiều anh ấy càng vui.",
       "py": "Fángzi lí jiéyùn zhàn yuè jìn, fángzū yuè guì. 4. Lǐ xiānshēng hěn xǐhuān gōngzuò, shìqíng yuè duō, tā yuè gāoxìng."
      },
      {
       "hz": "A：王先生學了三個月的法文，為什麼現在不學了。",
       "vi": "A: Anh Vương học tiếng Pháp ba tháng, sao bây giờ không học nữa?",
       "py": "A: Wáng xiānshēng xué le sāngè yuè de fǎwén, wèishénme xiànzài bù xué le."
      },
      {
       "hz": "B：因為ˍˍˍˍˍˍˍˍˍˍˍˍ，所以不想學了。",
       "vi": "B: Vì …, nên không muốn học nữa.",
       "py": "B: Yīnwèi ˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ bùxiǎng xué le."
      },
      {
       "hz": "A：這首歌，我們已經會唱了，為什麼還要一直練習。",
       "vi": "A: Bài hát này chúng ta đã biết hát rồi, sao còn phải luyện mãi?",
       "py": "A: Zhè shǒugē, wǒmen yǐjīng huì chàng le, wèishénme háiyào yìzhí liànxí."
      },
      {
       "hz": "A：最近我胖了很多，要去健身了。",
       "vi": "A: Dạo này tôi béo lên nhiều, phải đi tập gym thôi.",
       "py": "A: Zuìjìn wǒ pàng le hěnduō, yào qù jiànshēn le."
      },
      {
       "hz": "B：你常常吃炸雞、薯條，當然會 ˍˍˍˍˍˍˍˍˍˍˍ啊！",
       "vi": "B: Bạn hay ăn gà rán, khoai tây chiên, đương nhiên sẽ … rồi!",
       "py": "B: Nǐ chángcháng chī zhàjī, shǔtiáo, dāngrán huì ˍˍˍˍˍˍˍˍˍˍˍ a!"
      },
      {
       "hz": "太太：以前你很喜歡吃蛋糕，現在怎麼不吃了？",
       "vi": "Vợ: Trước đây anh rất thích ăn bánh kem, sao bây giờ không ăn nữa?",
       "py": "Tàitai: Yǐqián nǐ hěn xǐhuān chī dàngāo, xiànzài zěnme bùchī le?"
      },
      {
       "hz": "先生：蛋糕太甜了！為了健康，ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Bánh kem ngọt quá! Vì sức khoẻ, ….",
       "py": "Xiānshēng: Dàngāo tài tián le! Wèile jiànkāng, ˍˍˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越 V 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "VI. 到底 What on earth...",
   "points": [
    {
     "label": null,
     "formula": "“到底” is an adverb which is used in disjunctive questions except for those with final “嗎”, e.g., “到底要不要?” and “到底去不去?”It shows the emotion that the speaker is eager to know the answer. It can be placed before or after the Subject, but when the Subject is a question word, “到底” can only be placed in front of the Subject and used as an adverbial, e.g., “到底是誰偷了我的車?” Use the pattern “ 到底” to rewrite the sentences. The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a",
     "examples": [
      {
       "hz": "我要訂位了，你明天到底要不要跟我們去 KTV？2. 到底要用幾張貼紙才換得到便利商店的禮物呢？3. 我不知道林老師到底住在學校前面還是後面的社區。",
       "vi": "Tôi sắp đặt chỗ rồi, rốt cuộc ngày mai bạn có đi karaoke với chúng tôi không? Rốt cuộc phải dùng bao nhiêu nhãn dán mới đổi được quà của cửa hàng tiện lợi? Tôi không biết rốt cuộc thầy Lâm sống ở khu dân cư phía trước hay phía sau trường.",
       "py": "Wǒ yào dìngwèi le, nǐ míngtiān dàodǐ yào búyào gēn wǒmen qù KTV? 2. Dàodǐ yào yòng jǐzhāng tiēzhǐ cái huàn dédào biànlìshāngdiàn de lǐwù ne? 3. Wǒ bù zhīdào Lín lǎoshī dàodǐ zhù zài xuéxiào qiánmiàn háishì hòumiàn de shèqū."
      },
      {
       "hz": "聽說高小姐歌唱得很好，可是誰都沒聽過，我們都不知道張爸爸想住在地鐵站附近，張媽媽想找附近有公園的公寓，3. 你一下想上作文課，一下要修文法課，",
       "vi": "Nghe nói cô Cao hát rất hay, nhưng chưa ai từng nghe, chúng tôi đều không biết… Bố Trương muốn sống gần ga tàu điện, mẹ Trương muốn tìm căn hộ gần công viên… Bạn lúc thì muốn học lớp viết văn, lúc lại muốn học lớp ngữ pháp…",
       "py": "Tīngshuō Gāo xiǎojiě gēchàng de hěn hǎo, kěshì shéi dōu méi tīng guò, wǒmen dōu bù zhīdào Zhāng bàba xiǎng zhù zài dìtiězhàn fùjìn, Zhāng māma xiǎng zhǎo fùjìn yǒu gōngyuán de gōngyù, 3. Nǐ yíxià xiǎng shàng zuòwénkè, yíxià yào xiū wénfǎ kè,"
      },
      {
       "hz": "你覺得運動對身體有什麼好處？",
       "vi": "Bạn thấy tập thể dục có lợi gì cho sức khoẻ?",
       "py": "Nǐ juéde yùndòng duì shēntǐ yǒu shénme hǎochù?"
      },
      {
       "hz": "運動可以讓人和人的關係更好嗎？為什麼？",
       "vi": "Tập thể dục có giúp quan hệ giữa người với người tốt hơn không? Tại sao?",
       "py": "Yùndòng kěyǐ ràng rén hàn rén de guānxì gènghǎo ma? Wèishénme?"
      },
      {
       "hz": "你覺得學生需要運動嗎？為什麼？",
       "vi": "Bạn thấy học sinh có cần tập thể dục không? Tại sao?",
       "py": "Nǐ juéde xuéshēng xūyào yùndòng ma? Wèishénme?"
      },
      {
       "hz": "醫生為什麼建議病人多運動？",
       "vi": "Tại sao bác sĩ khuyên bệnh nhân tập thể dục nhiều?",
       "py": "Yīshēng wèishénme jiànyì bìngrén duō yùndòng?"
      },
      {
       "hz": "要是你心情不好，有什麼辦法能讓你的心情變好？",
       "vi": "Nếu tâm trạng không tốt, bạn có cách gì để tâm trạng tốt hơn?",
       "py": "Yàoshì nǐ xīnqíng bùhǎo, yǒu shénme bànfǎ néng ràng nǐ de xīnqíng biàn hǎo?"
      },
      {
       "hz": "你覺得運動還有什麼別的好處？",
       "vi": "Bạn thấy tập thể dục còn có lợi ích gì khác?",
       "py": "Nǐ juéde yùndòng háiyǒu shénme biéde hǎochù?"
      },
      {
       "hz": "對老師來說，日本學生的漢字很少寫錯，可是聲調常說錯。",
       "vi": "Đối với thầy giáo, học sinh Nhật ít khi viết sai chữ Hán, nhưng hay nói sai thanh điệu.",
       "py": "Duì lǎoshī láishuō, Rìběn xuéshēng de hànzì hěnshǎo xiěcuò, kěshì shēngdiào cháng shuōcuò."
      },
      {
       "hz": "對遊客來說，參觀當地的美術館或博物館，都是不錯的選擇。",
       "vi": "Đối với du khách, tham quan bảo tàng mỹ thuật hoặc bảo tàng địa phương đều là lựa chọn không tồi.",
       "py": "Duì yóukè láishuō, cānguān dāngdì de měishùguǎn huò bówùguǎn, dōu shì búcuò de xuǎnzé."
      },
      {
       "hz": "A:那個牌子很有名，一件外套一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B:對你這個有錢人來說是不貴，可是對一般人來說貴得不得了。",
       "vi": "B: Đối với người giàu như bạn thì không đắt, nhưng đối với người bình thường thì đắt vô cùng.",
       "py": "B: Duì nǐ zhège yǒuqiánrén láishuō shì bú guì, kěshì duì yìbān rén láishuō guì de bùdéle."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊錢，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài qián, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "到底 — rốt cuộc",
   "giaiThich": "Phó từ dùng trong câu hỏi lựa chọn (到底要不要?), KHÔNG dùng với câu hỏi có 嗎. Thể hiện người nói rất sốt ruột muốn biết câu trả lời."
  },
  {
   "title": "II. …...的話 if , supposing…",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, “的話” has the same function as “如果” and “要是” to form conditional sentences. However, “如果” and “要是“should be placed at the beginning of a sentence while “的話” should be placed at the end. In some cases, using “要是” gives a stronger or even threatening tone than using “如果”. Both “如果” and “要是” can collocate with “的話” , and either one can be left out. “的話” is a less formal expression. Use the pattern “的話 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "要是你明天不來(的話)，記得要先告訴我！",
       "vi": "Nếu ngày mai bạn không đến thì nhớ báo trước cho tôi nhé!",
       "py": "Yàoshì nǐ míngtiān bù lái (dehuà), jìde yào xiān gàosù wǒ!"
      },
      {
       "hz": "(如是)你常運動的話，心情一定會比較好。",
       "vi": "Nếu bạn thường xuyên tập thể dục thì tâm trạng chắc chắn sẽ tốt hơn.",
       "py": "(rúshì) nǐ cháng yùndòng dehuà, xīnqíng yídìng huì bǐjiào hǎo."
      },
      {
       "hz": "(要是)你不保養那輛汽車的話，可能會有問題的！",
       "vi": "Nếu bạn không bảo dưỡng chiếc ô tô đó thì có thể sẽ hỏng đấy!",
       "py": "(yàoshì) nǐ bù bǎoyǎng nà liàng qìchē dehuà, kěnéng huì yǒu wèntí de!"
      },
      {
       "hz": "A：我討厭運動，運動讓我覺得太累了！",
       "vi": "A: Tôi ghét tập thể dục, tập thể dục khiến tôi thấy mệt quá!",
       "py": "A: Wǒ tǎoyàn yùndòng, yùndòng ràng wǒ juéde tài lèi le!"
      },
      {
       "hz": "B： ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，就會越來越胖喔！",
       "vi": "B: …, thì sẽ ngày càng béo đấy!",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, jiù huì yuèláiyuè pàng ō!"
      },
      {
       "hz": "A：你想不想搬出去，到學校外面租房子？",
       "vi": "A: Bạn có muốn dọn ra ngoài, thuê nhà bên ngoài trường không?",
       "py": "A: Nǐ xiǎng bùxiǎng bānchūqù, dào xuéxiào wàimiàn zūfángzi?"
      },
      {
       "hz": "A：時間很晚了，你怎麼不睡覺，還在念書？",
       "vi": "A: Muộn rồi, sao bạn không ngủ mà vẫn còn học bài?",
       "py": "A: Shíjiān hěn wǎn le, nǐ zěnme bú shuìjiào, hái zài niànshū?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "……的話 — nếu…",
   "giaiThich": "Cùng chức năng với 如果 / 要是 để nêu giả thiết, nhưng 的話 đặt ở CUỐI vế điều kiện, còn 如果/要是 đặt ở đầu."
  },
  {
   "title": "III. 對⋯⋯有/沒(有)幫助;有/沒(有)影響;有/沒(有)好處",
   "points": [
    {
     "label": null,
     "formula": "to be helpful to /  to have influence on / to be beneficial to This pattern, in which “對” is followed by someone or something , indicates the subject , often a thing , has influence on someone or something. Use the pattern “對...有幫助 / 興趣 / 影響 / 好處 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "健身教練說，經常運動，對健康很有幫助。2. 父母說的話，對我有很大的影響。3. 每天吃喝玩樂對你的將來沒有好處，你應該好好地利用時間。",
       "vi": "Huấn luyện viên thể hình nói thường xuyên tập thể dục rất có ích cho sức khoẻ. Lời bố mẹ nói có ảnh hưởng rất lớn đến tôi. Ngày nào cũng ăn chơi không có lợi gì cho tương lai của bạn, bạn nên tận dụng thời gian cho tốt.",
       "py": "Jiànshēn jiàoliàn shuō, jīngcháng yùndòng, duì jiànkāng hěn yǒu bāngzhù. 2. Fùmǔ shuō dehuà, duì wǒ yǒu hěndà de yǐngxiǎng. 3. Měitiān chīhēwánlè duì nǐ de jiānglái méiyǒu hǎochù, nǐ yīnggāi hǎohǎo dì lìyòng shíjiān."
      },
      {
       "hz": "幫助 / 興趣 / 影響 / 好處",
       "vi": "giúp ích / hứng thú / ảnh hưởng / lợi ích",
       "py": "Bāngzhù / xìngqù / yǐngxiǎng / hǎochù"
      },
      {
       "hz": "A：你為什麼想認識外國朋友？",
       "vi": "A: Tại sao bạn muốn làm quen với bạn nước ngoài?",
       "py": "A: Nǐ wèishénme xiǎng rènshì wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍ，所以我想認識外國朋友。",
       "vi": "B: …, nên tôi muốn làm quen với bạn nước ngoài.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ wǒ xiǎng rènshì wàiguó péngyǒu."
      },
      {
       "hz": "A：我要去世界旅行半年,一起去吧!",
       "vi": "A: Tôi sắp đi du lịch vòng quanh thế giới nửa năm, đi cùng nhé!",
       "py": "A: Wǒ yào qù shìjiè lǚxíng bànnián, yìqǐ qù ba!"
      },
      {
       "hz": "B：不好意思 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xin lỗi, ….",
       "py": "B: Bùhǎoyìsī ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "孩子：媽媽，我可以再吃一塊炸雞、一包薯條嗎?",
       "vi": "Con: Mẹ ơi, con ăn thêm một miếng gà rán, một gói khoai tây chiên được không?",
       "py": "Háizi: Māma, wǒ kěyǐ zài chī yíkuài zhàjī, yìbāo shǔtiáo ma?"
      },
      {
       "hz": "媽媽：不可以，吃太多 ˍˍˍˍˍˍˍˍˍˍ，只有壞處。",
       "vi": "Mẹ: Không được, ăn nhiều quá …, chỉ có hại thôi.",
       "py": "Māma: Bù kěyǐ, chī tài duō ˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu huàichù."
      },
      {
       "hz": "你運動嗎？",
       "vi": "Bạn có tập thể dục không?",
       "py": "Nǐ yùndòng ma?"
      },
      {
       "hz": "請你問問你的同學、朋友，問他們平常運動嗎？為什麼？",
       "vi": "Hãy hỏi các bạn học, bạn bè xem bình thường họ có tập thể dục không? Tại sao?",
       "py": "Qǐng nǐ wènwèn nǐ de tóngxué, péngyǒu, wèn tāmen píngcháng yùndòng ma? Wèishénme?"
      },
      {
       "hz": "有運動習慣的人沒有運動習慣的人你經常做什麼運動？",
       "vi": "Người có thói quen tập thể dục · Người không có thói quen tập thể dục · Bạn thường tập môn gì?",
       "py": "Yǒu yùndòng xíguàn de rén méiyǒu yùndòng xíguàn de rén nǐ jīngcháng zuò shénme yùndòng?"
      },
      {
       "hz": "你去什麼地方做運動？",
       "vi": "Bạn tập thể dục ở đâu?",
       "py": "Nǐ qù shénme dìfāng zuò yùndòng?"
      },
      {
       "hz": "你什麼時候想運動？",
       "vi": "Khi nào bạn muốn tập thể dục?",
       "py": "Nǐ shénme shíhòu xiǎng yùndòng?"
      },
      {
       "hz": "你覺得運動的好處是什麼？",
       "vi": "Bạn thấy lợi ích của tập thể dục là gì?",
       "py": "Nǐ juéde yùndòng de hǎochù shì shénme?"
      },
      {
       "hz": "你覺得，運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde, yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "如果你的朋友不喜歡運動，你想對他說什麼？",
       "vi": "Nếu bạn của bạn không thích tập thể dục, bạn muốn nói gì với họ?",
       "py": "Rúguǒ nǐ de péngyǒu bù xǐhuān yùndòng, nǐ xiǎng duì tā shuō shénme?"
      },
      {
       "hz": "你做過什麼運動？",
       "vi": "Bạn đã từng tập môn thể thao nào?",
       "py": "Nǐ zuò guò shénme yùndòng?"
      },
      {
       "hz": "你覺得運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "你覺得你的身體怎麼樣？",
       "vi": "Bạn thấy sức khoẻ của mình thế nào?",
       "py": "Nǐ juéde nǐ de shēntǐ zěnmeyàng?"
      },
      {
       "hz": "你的朋友經常運動嗎？",
       "vi": "Bạn của bạn có thường xuyên tập thể dục không?",
       "py": "Nǐ de péngyǒu jīngcháng yùndòng ma?"
      },
      {
       "hz": "你覺得每天需要運動多少時間？",
       "vi": "Bạn thấy mỗi ngày cần tập thể dục bao lâu?",
       "py": "Nǐ juéde měitiān xūyào yùndòng duōshǎo shíjiān?"
      },
      {
       "hz": "為什麼你不常運動？",
       "vi": "Tại sao bạn không hay tập thể dục?",
       "py": "Wèishénme nǐ bù cháng yùndòng?"
      },
      {
       "hz": "請使用下面的生詞、語法",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ"
      },
      {
       "hz": "「我是你的話，我就......」請想一想，為什麼有些人不運動?如果你是他們的話，你會怎麼做？請一些學生當不運動的人，說說為什麼不運動，說完以後，請別的同學給建議。",
       "vi": "“Nếu tôi là bạn, tôi sẽ…” Hãy nghĩ xem tại sao có người không tập thể dục? Nếu bạn là họ, bạn sẽ làm thế nào? Mời vài học sinh đóng vai người không tập thể dục, nói xem vì sao không tập, nói xong thì các bạn khác đưa ra lời khuyên.",
       "py": "“Wǒ shì nǐ dehuà, wǒ jiù......” qǐng xiǎngyìxiǎng, wèishénme yǒuxiē rén bú yùndòng? Rúguǒ nǐ shì tāmen dehuà, nǐ huì zěnme zuò? Qǐng yìxiē xuéshēng dāng bú yùndòng de rén, shuō shuō wèishénme bú yùndòng, shuōwán yǐhòu, qǐng biéde tóngxué gěi jiànyì."
      },
      {
       "hz": "為什麼不運動？",
       "vi": "Tại sao không tập thể dục?",
       "py": "Wèishénme bú yùndòng?"
      },
      {
       "hz": "為什麼要運動？",
       "vi": "Tại sao phải tập thể dục?",
       "py": "Wèishénme yào yùndòng?"
      },
      {
       "hz": "每天開夜車準備考試，沒有時間......我是你的話，我就先運動，再看書。因為運動對精神和體力都有幫助，讓你可以學得更好。",
       "vi": "Ngày nào cũng thức khuya ôn thi, không có thời gian… Nếu tôi là bạn, tôi sẽ tập thể dục trước rồi mới đọc sách. Vì tập thể dục có ích cho cả tinh thần lẫn thể lực, giúp bạn học tốt hơn.",
       "py": "Měitiān kāiyèchē zhǔnbèi kǎoshì, méiyǒu shíjiān...... Wǒ shì nǐ dehuà, wǒ jiù xiān yùndòng, zài kànshū. Yīnwèi yùndòng duì jīngshén hàn tǐlì dōu yǒu bāngzhù, ràng nǐ kěyǐ xué de gènghǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有 幫助 · 影響 · 好處",
   "giaiThich": "Nói việc gì đó có ích, có ảnh hưởng hay có lợi cho ai/cái gì (hoặc không)."
  }
 ],
 "td2-10.2": [
  {
   "title": "III. 越……越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”.",
     "examples": [
      {
       "hz": "山本良介的中文越說越好了。2. 中文的語法不容易，老師越說，我越不懂。",
       "vi": "Tiếng Trung của Yamamoto Ryosuke càng nói càng giỏi. Ngữ pháp tiếng Trung không dễ, thầy giáo càng giảng tôi càng không hiểu.",
       "py": "Shānběn Liángjiè de zhōngwén yuè shuō yuè hǎo le. 2. Zhōngwén de yǔfǎ bù róngyì, lǎoshī yuè shuō, wǒ yuè bù dǒng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越… 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "III. 越 V 越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”. Use the pattern ”越 V 越......  ” to rewrite the sentences. Use the pattern ”越 V 越......  ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "房子離捷運站越近，房租越貴。4. 李先生很喜歡工作，事情越多，他越高興。",
       "vi": "Nhà càng gần ga tàu điện ngầm thì tiền thuê càng đắt. Anh Lý rất thích làm việc, việc càng nhiều anh ấy càng vui.",
       "py": "Fángzi lí jiéyùn zhàn yuè jìn, fángzū yuè guì. 4. Lǐ xiānshēng hěn xǐhuān gōngzuò, shìqíng yuè duō, tā yuè gāoxìng."
      },
      {
       "hz": "A：王先生學了三個月的法文，為什麼現在不學了。",
       "vi": "A: Anh Vương học tiếng Pháp ba tháng, sao bây giờ không học nữa?",
       "py": "A: Wáng xiānshēng xué le sāngè yuè de fǎwén, wèishénme xiànzài bù xué le."
      },
      {
       "hz": "B：因為ˍˍˍˍˍˍˍˍˍˍˍˍ，所以不想學了。",
       "vi": "B: Vì …, nên không muốn học nữa.",
       "py": "B: Yīnwèi ˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ bùxiǎng xué le."
      },
      {
       "hz": "A：這首歌，我們已經會唱了，為什麼還要一直練習。",
       "vi": "A: Bài hát này chúng ta đã biết hát rồi, sao còn phải luyện mãi?",
       "py": "A: Zhè shǒugē, wǒmen yǐjīng huì chàng le, wèishénme háiyào yìzhí liànxí."
      },
      {
       "hz": "A：最近我胖了很多，要去健身了。",
       "vi": "A: Dạo này tôi béo lên nhiều, phải đi tập gym thôi.",
       "py": "A: Zuìjìn wǒ pàng le hěnduō, yào qù jiànshēn le."
      },
      {
       "hz": "B：你常常吃炸雞、薯條，當然會 ˍˍˍˍˍˍˍˍˍˍˍ啊！",
       "vi": "B: Bạn hay ăn gà rán, khoai tây chiên, đương nhiên sẽ … rồi!",
       "py": "B: Nǐ chángcháng chī zhàjī, shǔtiáo, dāngrán huì ˍˍˍˍˍˍˍˍˍˍˍ a!"
      },
      {
       "hz": "太太：以前你很喜歡吃蛋糕，現在怎麼不吃了？",
       "vi": "Vợ: Trước đây anh rất thích ăn bánh kem, sao bây giờ không ăn nữa?",
       "py": "Tàitai: Yǐqián nǐ hěn xǐhuān chī dàngāo, xiànzài zěnme bùchī le?"
      },
      {
       "hz": "先生：蛋糕太甜了！為了健康，ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Bánh kem ngọt quá! Vì sức khoẻ, ….",
       "py": "Xiānshēng: Dàngāo tài tián le! Wèile jiànkāng, ˍˍˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越 V 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "VI. 到底 What on earth...",
   "points": [
    {
     "label": null,
     "formula": "“到底” is an adverb which is used in disjunctive questions except for those with final “嗎”, e.g., “到底要不要?” and “到底去不去?”It shows the emotion that the speaker is eager to know the answer. It can be placed before or after the Subject, but when the Subject is a question word, “到底” can only be placed in front of the Subject and used as an adverbial, e.g., “到底是誰偷了我的車?” Use the pattern “ 到底” to rewrite the sentences. The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a",
     "examples": [
      {
       "hz": "我要訂位了，你明天到底要不要跟我們去 KTV？2. 到底要用幾張貼紙才換得到便利商店的禮物呢？3. 我不知道林老師到底住在學校前面還是後面的社區。",
       "vi": "Tôi sắp đặt chỗ rồi, rốt cuộc ngày mai bạn có đi karaoke với chúng tôi không? Rốt cuộc phải dùng bao nhiêu nhãn dán mới đổi được quà của cửa hàng tiện lợi? Tôi không biết rốt cuộc thầy Lâm sống ở khu dân cư phía trước hay phía sau trường.",
       "py": "Wǒ yào dìngwèi le, nǐ míngtiān dàodǐ yào búyào gēn wǒmen qù KTV? 2. Dàodǐ yào yòng jǐzhāng tiēzhǐ cái huàn dédào biànlìshāngdiàn de lǐwù ne? 3. Wǒ bù zhīdào Lín lǎoshī dàodǐ zhù zài xuéxiào qiánmiàn háishì hòumiàn de shèqū."
      },
      {
       "hz": "聽說高小姐歌唱得很好，可是誰都沒聽過，我們都不知道張爸爸想住在地鐵站附近，張媽媽想找附近有公園的公寓，3. 你一下想上作文課，一下要修文法課，",
       "vi": "Nghe nói cô Cao hát rất hay, nhưng chưa ai từng nghe, chúng tôi đều không biết… Bố Trương muốn sống gần ga tàu điện, mẹ Trương muốn tìm căn hộ gần công viên… Bạn lúc thì muốn học lớp viết văn, lúc lại muốn học lớp ngữ pháp…",
       "py": "Tīngshuō Gāo xiǎojiě gēchàng de hěn hǎo, kěshì shéi dōu méi tīng guò, wǒmen dōu bù zhīdào Zhāng bàba xiǎng zhù zài dìtiězhàn fùjìn, Zhāng māma xiǎng zhǎo fùjìn yǒu gōngyuán de gōngyù, 3. Nǐ yíxià xiǎng shàng zuòwénkè, yíxià yào xiū wénfǎ kè,"
      },
      {
       "hz": "你覺得運動對身體有什麼好處？",
       "vi": "Bạn thấy tập thể dục có lợi gì cho sức khoẻ?",
       "py": "Nǐ juéde yùndòng duì shēntǐ yǒu shénme hǎochù?"
      },
      {
       "hz": "運動可以讓人和人的關係更好嗎？為什麼？",
       "vi": "Tập thể dục có giúp quan hệ giữa người với người tốt hơn không? Tại sao?",
       "py": "Yùndòng kěyǐ ràng rén hàn rén de guānxì gènghǎo ma? Wèishénme?"
      },
      {
       "hz": "你覺得學生需要運動嗎？為什麼？",
       "vi": "Bạn thấy học sinh có cần tập thể dục không? Tại sao?",
       "py": "Nǐ juéde xuéshēng xūyào yùndòng ma? Wèishénme?"
      },
      {
       "hz": "醫生為什麼建議病人多運動？",
       "vi": "Tại sao bác sĩ khuyên bệnh nhân tập thể dục nhiều?",
       "py": "Yīshēng wèishénme jiànyì bìngrén duō yùndòng?"
      },
      {
       "hz": "要是你心情不好，有什麼辦法能讓你的心情變好？",
       "vi": "Nếu tâm trạng không tốt, bạn có cách gì để tâm trạng tốt hơn?",
       "py": "Yàoshì nǐ xīnqíng bùhǎo, yǒu shénme bànfǎ néng ràng nǐ de xīnqíng biàn hǎo?"
      },
      {
       "hz": "你覺得運動還有什麼別的好處？",
       "vi": "Bạn thấy tập thể dục còn có lợi ích gì khác?",
       "py": "Nǐ juéde yùndòng háiyǒu shénme biéde hǎochù?"
      },
      {
       "hz": "對老師來說，日本學生的漢字很少寫錯，可是聲調常說錯。",
       "vi": "Đối với thầy giáo, học sinh Nhật ít khi viết sai chữ Hán, nhưng hay nói sai thanh điệu.",
       "py": "Duì lǎoshī láishuō, Rìběn xuéshēng de hànzì hěnshǎo xiěcuò, kěshì shēngdiào cháng shuōcuò."
      },
      {
       "hz": "對遊客來說，參觀當地的美術館或博物館，都是不錯的選擇。",
       "vi": "Đối với du khách, tham quan bảo tàng mỹ thuật hoặc bảo tàng địa phương đều là lựa chọn không tồi.",
       "py": "Duì yóukè láishuō, cānguān dāngdì de měishùguǎn huò bówùguǎn, dōu shì búcuò de xuǎnzé."
      },
      {
       "hz": "A:那個牌子很有名，一件外套一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B:對你這個有錢人來說是不貴，可是對一般人來說貴得不得了。",
       "vi": "B: Đối với người giàu như bạn thì không đắt, nhưng đối với người bình thường thì đắt vô cùng.",
       "py": "B: Duì nǐ zhège yǒuqiánrén láishuō shì bú guì, kěshì duì yìbān rén láishuō guì de bùdéle."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊錢，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài qián, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "到底 — rốt cuộc",
   "giaiThich": "Phó từ dùng trong câu hỏi lựa chọn (到底要不要?), KHÔNG dùng với câu hỏi có 嗎. Thể hiện người nói rất sốt ruột muốn biết câu trả lời."
  },
  {
   "title": "II. …...的話 if , supposing…",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, “的話” has the same function as “如果” and “要是” to form conditional sentences. However, “如果” and “要是“should be placed at the beginning of a sentence while “的話” should be placed at the end. In some cases, using “要是” gives a stronger or even threatening tone than using “如果”. Both “如果” and “要是” can collocate with “的話” , and either one can be left out. “的話” is a less formal expression. Use the pattern “的話 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "要是你明天不來(的話)，記得要先告訴我！",
       "vi": "Nếu ngày mai bạn không đến thì nhớ báo trước cho tôi nhé!",
       "py": "Yàoshì nǐ míngtiān bù lái (dehuà), jìde yào xiān gàosù wǒ!"
      },
      {
       "hz": "(如是)你常運動的話，心情一定會比較好。",
       "vi": "Nếu bạn thường xuyên tập thể dục thì tâm trạng chắc chắn sẽ tốt hơn.",
       "py": "(rúshì) nǐ cháng yùndòng dehuà, xīnqíng yídìng huì bǐjiào hǎo."
      },
      {
       "hz": "(要是)你不保養那輛汽車的話，可能會有問題的！",
       "vi": "Nếu bạn không bảo dưỡng chiếc ô tô đó thì có thể sẽ hỏng đấy!",
       "py": "(yàoshì) nǐ bù bǎoyǎng nà liàng qìchē dehuà, kěnéng huì yǒu wèntí de!"
      },
      {
       "hz": "A：我討厭運動，運動讓我覺得太累了！",
       "vi": "A: Tôi ghét tập thể dục, tập thể dục khiến tôi thấy mệt quá!",
       "py": "A: Wǒ tǎoyàn yùndòng, yùndòng ràng wǒ juéde tài lèi le!"
      },
      {
       "hz": "B： ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，就會越來越胖喔！",
       "vi": "B: …, thì sẽ ngày càng béo đấy!",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, jiù huì yuèláiyuè pàng ō!"
      },
      {
       "hz": "A：你想不想搬出去，到學校外面租房子？",
       "vi": "A: Bạn có muốn dọn ra ngoài, thuê nhà bên ngoài trường không?",
       "py": "A: Nǐ xiǎng bùxiǎng bānchūqù, dào xuéxiào wàimiàn zūfángzi?"
      },
      {
       "hz": "A：時間很晚了，你怎麼不睡覺，還在念書？",
       "vi": "A: Muộn rồi, sao bạn không ngủ mà vẫn còn học bài?",
       "py": "A: Shíjiān hěn wǎn le, nǐ zěnme bú shuìjiào, hái zài niànshū?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "……的話 — nếu…",
   "giaiThich": "Cùng chức năng với 如果 / 要是 để nêu giả thiết, nhưng 的話 đặt ở CUỐI vế điều kiện, còn 如果/要是 đặt ở đầu."
  },
  {
   "title": "III. 對⋯⋯有/沒(有)幫助;有/沒(有)影響;有/沒(有)好處",
   "points": [
    {
     "label": null,
     "formula": "to be helpful to /  to have influence on / to be beneficial to This pattern, in which “對” is followed by someone or something , indicates the subject , often a thing , has influence on someone or something. Use the pattern “對...有幫助 / 興趣 / 影響 / 好處 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "健身教練說，經常運動，對健康很有幫助。2. 父母說的話，對我有很大的影響。3. 每天吃喝玩樂對你的將來沒有好處，你應該好好地利用時間。",
       "vi": "Huấn luyện viên thể hình nói thường xuyên tập thể dục rất có ích cho sức khoẻ. Lời bố mẹ nói có ảnh hưởng rất lớn đến tôi. Ngày nào cũng ăn chơi không có lợi gì cho tương lai của bạn, bạn nên tận dụng thời gian cho tốt.",
       "py": "Jiànshēn jiàoliàn shuō, jīngcháng yùndòng, duì jiànkāng hěn yǒu bāngzhù. 2. Fùmǔ shuō dehuà, duì wǒ yǒu hěndà de yǐngxiǎng. 3. Měitiān chīhēwánlè duì nǐ de jiānglái méiyǒu hǎochù, nǐ yīnggāi hǎohǎo dì lìyòng shíjiān."
      },
      {
       "hz": "幫助 / 興趣 / 影響 / 好處",
       "vi": "giúp ích / hứng thú / ảnh hưởng / lợi ích",
       "py": "Bāngzhù / xìngqù / yǐngxiǎng / hǎochù"
      },
      {
       "hz": "A：你為什麼想認識外國朋友？",
       "vi": "A: Tại sao bạn muốn làm quen với bạn nước ngoài?",
       "py": "A: Nǐ wèishénme xiǎng rènshì wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍ，所以我想認識外國朋友。",
       "vi": "B: …, nên tôi muốn làm quen với bạn nước ngoài.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ wǒ xiǎng rènshì wàiguó péngyǒu."
      },
      {
       "hz": "A：我要去世界旅行半年,一起去吧!",
       "vi": "A: Tôi sắp đi du lịch vòng quanh thế giới nửa năm, đi cùng nhé!",
       "py": "A: Wǒ yào qù shìjiè lǚxíng bànnián, yìqǐ qù ba!"
      },
      {
       "hz": "B：不好意思 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xin lỗi, ….",
       "py": "B: Bùhǎoyìsī ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "孩子：媽媽，我可以再吃一塊炸雞、一包薯條嗎?",
       "vi": "Con: Mẹ ơi, con ăn thêm một miếng gà rán, một gói khoai tây chiên được không?",
       "py": "Háizi: Māma, wǒ kěyǐ zài chī yíkuài zhàjī, yìbāo shǔtiáo ma?"
      },
      {
       "hz": "媽媽：不可以，吃太多 ˍˍˍˍˍˍˍˍˍˍ，只有壞處。",
       "vi": "Mẹ: Không được, ăn nhiều quá …, chỉ có hại thôi.",
       "py": "Māma: Bù kěyǐ, chī tài duō ˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu huàichù."
      },
      {
       "hz": "你運動嗎？",
       "vi": "Bạn có tập thể dục không?",
       "py": "Nǐ yùndòng ma?"
      },
      {
       "hz": "請你問問你的同學、朋友，問他們平常運動嗎？為什麼？",
       "vi": "Hãy hỏi các bạn học, bạn bè xem bình thường họ có tập thể dục không? Tại sao?",
       "py": "Qǐng nǐ wènwèn nǐ de tóngxué, péngyǒu, wèn tāmen píngcháng yùndòng ma? Wèishénme?"
      },
      {
       "hz": "有運動習慣的人沒有運動習慣的人你經常做什麼運動？",
       "vi": "Người có thói quen tập thể dục · Người không có thói quen tập thể dục · Bạn thường tập môn gì?",
       "py": "Yǒu yùndòng xíguàn de rén méiyǒu yùndòng xíguàn de rén nǐ jīngcháng zuò shénme yùndòng?"
      },
      {
       "hz": "你去什麼地方做運動？",
       "vi": "Bạn tập thể dục ở đâu?",
       "py": "Nǐ qù shénme dìfāng zuò yùndòng?"
      },
      {
       "hz": "你什麼時候想運動？",
       "vi": "Khi nào bạn muốn tập thể dục?",
       "py": "Nǐ shénme shíhòu xiǎng yùndòng?"
      },
      {
       "hz": "你覺得運動的好處是什麼？",
       "vi": "Bạn thấy lợi ích của tập thể dục là gì?",
       "py": "Nǐ juéde yùndòng de hǎochù shì shénme?"
      },
      {
       "hz": "你覺得，運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde, yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "如果你的朋友不喜歡運動，你想對他說什麼？",
       "vi": "Nếu bạn của bạn không thích tập thể dục, bạn muốn nói gì với họ?",
       "py": "Rúguǒ nǐ de péngyǒu bù xǐhuān yùndòng, nǐ xiǎng duì tā shuō shénme?"
      },
      {
       "hz": "你做過什麼運動？",
       "vi": "Bạn đã từng tập môn thể thao nào?",
       "py": "Nǐ zuò guò shénme yùndòng?"
      },
      {
       "hz": "你覺得運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "你覺得你的身體怎麼樣？",
       "vi": "Bạn thấy sức khoẻ của mình thế nào?",
       "py": "Nǐ juéde nǐ de shēntǐ zěnmeyàng?"
      },
      {
       "hz": "你的朋友經常運動嗎？",
       "vi": "Bạn của bạn có thường xuyên tập thể dục không?",
       "py": "Nǐ de péngyǒu jīngcháng yùndòng ma?"
      },
      {
       "hz": "你覺得每天需要運動多少時間？",
       "vi": "Bạn thấy mỗi ngày cần tập thể dục bao lâu?",
       "py": "Nǐ juéde měitiān xūyào yùndòng duōshǎo shíjiān?"
      },
      {
       "hz": "為什麼你不常運動？",
       "vi": "Tại sao bạn không hay tập thể dục?",
       "py": "Wèishénme nǐ bù cháng yùndòng?"
      },
      {
       "hz": "請使用下面的生詞、語法",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ"
      },
      {
       "hz": "「我是你的話，我就......」請想一想，為什麼有些人不運動?如果你是他們的話，你會怎麼做？請一些學生當不運動的人，說說為什麼不運動，說完以後，請別的同學給建議。",
       "vi": "“Nếu tôi là bạn, tôi sẽ…” Hãy nghĩ xem tại sao có người không tập thể dục? Nếu bạn là họ, bạn sẽ làm thế nào? Mời vài học sinh đóng vai người không tập thể dục, nói xem vì sao không tập, nói xong thì các bạn khác đưa ra lời khuyên.",
       "py": "“Wǒ shì nǐ dehuà, wǒ jiù......” qǐng xiǎngyìxiǎng, wèishénme yǒuxiē rén bú yùndòng? Rúguǒ nǐ shì tāmen dehuà, nǐ huì zěnme zuò? Qǐng yìxiē xuéshēng dāng bú yùndòng de rén, shuō shuō wèishénme bú yùndòng, shuōwán yǐhòu, qǐng biéde tóngxué gěi jiànyì."
      },
      {
       "hz": "為什麼不運動？",
       "vi": "Tại sao không tập thể dục?",
       "py": "Wèishénme bú yùndòng?"
      },
      {
       "hz": "為什麼要運動？",
       "vi": "Tại sao phải tập thể dục?",
       "py": "Wèishénme yào yùndòng?"
      },
      {
       "hz": "每天開夜車準備考試，沒有時間......我是你的話，我就先運動，再看書。因為運動對精神和體力都有幫助，讓你可以學得更好。",
       "vi": "Ngày nào cũng thức khuya ôn thi, không có thời gian… Nếu tôi là bạn, tôi sẽ tập thể dục trước rồi mới đọc sách. Vì tập thể dục có ích cho cả tinh thần lẫn thể lực, giúp bạn học tốt hơn.",
       "py": "Měitiān kāiyèchē zhǔnbèi kǎoshì, méiyǒu shíjiān...... Wǒ shì nǐ dehuà, wǒ jiù xiān yùndòng, zài kànshū. Yīnwèi yùndòng duì jīngshén hàn tǐlì dōu yǒu bāngzhù, ràng nǐ kěyǐ xué de gènghǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有 幫助 · 影響 · 好處",
   "giaiThich": "Nói việc gì đó có ích, có ảnh hưởng hay có lợi cho ai/cái gì (hoặc không)."
  }
 ],
 "td2-10.3": [
  {
   "title": "III. 越……越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”.",
     "examples": [
      {
       "hz": "山本良介的中文越說越好了。2. 中文的語法不容易，老師越說，我越不懂。",
       "vi": "Tiếng Trung của Yamamoto Ryosuke càng nói càng giỏi. Ngữ pháp tiếng Trung không dễ, thầy giáo càng giảng tôi càng không hiểu.",
       "py": "Shānběn Liángjiè de zhōngwén yuè shuō yuè hǎo le. 2. Zhōngwén de yǔfǎ bù róngyì, lǎoshī yuè shuō, wǒ yuè bù dǒng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越… 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "III. 越 V 越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”. Use the pattern ”越 V 越......  ” to rewrite the sentences. Use the pattern ”越 V 越......  ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "房子離捷運站越近，房租越貴。4. 李先生很喜歡工作，事情越多，他越高興。",
       "vi": "Nhà càng gần ga tàu điện ngầm thì tiền thuê càng đắt. Anh Lý rất thích làm việc, việc càng nhiều anh ấy càng vui.",
       "py": "Fángzi lí jiéyùn zhàn yuè jìn, fángzū yuè guì. 4. Lǐ xiānshēng hěn xǐhuān gōngzuò, shìqíng yuè duō, tā yuè gāoxìng."
      },
      {
       "hz": "A：王先生學了三個月的法文，為什麼現在不學了。",
       "vi": "A: Anh Vương học tiếng Pháp ba tháng, sao bây giờ không học nữa?",
       "py": "A: Wáng xiānshēng xué le sāngè yuè de fǎwén, wèishénme xiànzài bù xué le."
      },
      {
       "hz": "B：因為ˍˍˍˍˍˍˍˍˍˍˍˍ，所以不想學了。",
       "vi": "B: Vì …, nên không muốn học nữa.",
       "py": "B: Yīnwèi ˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ bùxiǎng xué le."
      },
      {
       "hz": "A：這首歌，我們已經會唱了，為什麼還要一直練習。",
       "vi": "A: Bài hát này chúng ta đã biết hát rồi, sao còn phải luyện mãi?",
       "py": "A: Zhè shǒugē, wǒmen yǐjīng huì chàng le, wèishénme háiyào yìzhí liànxí."
      },
      {
       "hz": "A：最近我胖了很多，要去健身了。",
       "vi": "A: Dạo này tôi béo lên nhiều, phải đi tập gym thôi.",
       "py": "A: Zuìjìn wǒ pàng le hěnduō, yào qù jiànshēn le."
      },
      {
       "hz": "B：你常常吃炸雞、薯條，當然會 ˍˍˍˍˍˍˍˍˍˍˍ啊！",
       "vi": "B: Bạn hay ăn gà rán, khoai tây chiên, đương nhiên sẽ … rồi!",
       "py": "B: Nǐ chángcháng chī zhàjī, shǔtiáo, dāngrán huì ˍˍˍˍˍˍˍˍˍˍˍ a!"
      },
      {
       "hz": "太太：以前你很喜歡吃蛋糕，現在怎麼不吃了？",
       "vi": "Vợ: Trước đây anh rất thích ăn bánh kem, sao bây giờ không ăn nữa?",
       "py": "Tàitai: Yǐqián nǐ hěn xǐhuān chī dàngāo, xiànzài zěnme bùchī le?"
      },
      {
       "hz": "先生：蛋糕太甜了！為了健康，ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Bánh kem ngọt quá! Vì sức khoẻ, ….",
       "py": "Xiānshēng: Dàngāo tài tián le! Wèile jiànkāng, ˍˍˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越 V 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "VI. 到底 What on earth...",
   "points": [
    {
     "label": null,
     "formula": "“到底” is an adverb which is used in disjunctive questions except for those with final “嗎”, e.g., “到底要不要?” and “到底去不去?”It shows the emotion that the speaker is eager to know the answer. It can be placed before or after the Subject, but when the Subject is a question word, “到底” can only be placed in front of the Subject and used as an adverbial, e.g., “到底是誰偷了我的車?” Use the pattern “ 到底” to rewrite the sentences. The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a",
     "examples": [
      {
       "hz": "我要訂位了，你明天到底要不要跟我們去 KTV？2. 到底要用幾張貼紙才換得到便利商店的禮物呢？3. 我不知道林老師到底住在學校前面還是後面的社區。",
       "vi": "Tôi sắp đặt chỗ rồi, rốt cuộc ngày mai bạn có đi karaoke với chúng tôi không? Rốt cuộc phải dùng bao nhiêu nhãn dán mới đổi được quà của cửa hàng tiện lợi? Tôi không biết rốt cuộc thầy Lâm sống ở khu dân cư phía trước hay phía sau trường.",
       "py": "Wǒ yào dìngwèi le, nǐ míngtiān dàodǐ yào búyào gēn wǒmen qù KTV? 2. Dàodǐ yào yòng jǐzhāng tiēzhǐ cái huàn dédào biànlìshāngdiàn de lǐwù ne? 3. Wǒ bù zhīdào Lín lǎoshī dàodǐ zhù zài xuéxiào qiánmiàn háishì hòumiàn de shèqū."
      },
      {
       "hz": "聽說高小姐歌唱得很好，可是誰都沒聽過，我們都不知道張爸爸想住在地鐵站附近，張媽媽想找附近有公園的公寓，3. 你一下想上作文課，一下要修文法課，",
       "vi": "Nghe nói cô Cao hát rất hay, nhưng chưa ai từng nghe, chúng tôi đều không biết… Bố Trương muốn sống gần ga tàu điện, mẹ Trương muốn tìm căn hộ gần công viên… Bạn lúc thì muốn học lớp viết văn, lúc lại muốn học lớp ngữ pháp…",
       "py": "Tīngshuō Gāo xiǎojiě gēchàng de hěn hǎo, kěshì shéi dōu méi tīng guò, wǒmen dōu bù zhīdào Zhāng bàba xiǎng zhù zài dìtiězhàn fùjìn, Zhāng māma xiǎng zhǎo fùjìn yǒu gōngyuán de gōngyù, 3. Nǐ yíxià xiǎng shàng zuòwénkè, yíxià yào xiū wénfǎ kè,"
      },
      {
       "hz": "你覺得運動對身體有什麼好處？",
       "vi": "Bạn thấy tập thể dục có lợi gì cho sức khoẻ?",
       "py": "Nǐ juéde yùndòng duì shēntǐ yǒu shénme hǎochù?"
      },
      {
       "hz": "運動可以讓人和人的關係更好嗎？為什麼？",
       "vi": "Tập thể dục có giúp quan hệ giữa người với người tốt hơn không? Tại sao?",
       "py": "Yùndòng kěyǐ ràng rén hàn rén de guānxì gènghǎo ma? Wèishénme?"
      },
      {
       "hz": "你覺得學生需要運動嗎？為什麼？",
       "vi": "Bạn thấy học sinh có cần tập thể dục không? Tại sao?",
       "py": "Nǐ juéde xuéshēng xūyào yùndòng ma? Wèishénme?"
      },
      {
       "hz": "醫生為什麼建議病人多運動？",
       "vi": "Tại sao bác sĩ khuyên bệnh nhân tập thể dục nhiều?",
       "py": "Yīshēng wèishénme jiànyì bìngrén duō yùndòng?"
      },
      {
       "hz": "要是你心情不好，有什麼辦法能讓你的心情變好？",
       "vi": "Nếu tâm trạng không tốt, bạn có cách gì để tâm trạng tốt hơn?",
       "py": "Yàoshì nǐ xīnqíng bùhǎo, yǒu shénme bànfǎ néng ràng nǐ de xīnqíng biàn hǎo?"
      },
      {
       "hz": "你覺得運動還有什麼別的好處？",
       "vi": "Bạn thấy tập thể dục còn có lợi ích gì khác?",
       "py": "Nǐ juéde yùndòng háiyǒu shénme biéde hǎochù?"
      },
      {
       "hz": "對老師來說，日本學生的漢字很少寫錯，可是聲調常說錯。",
       "vi": "Đối với thầy giáo, học sinh Nhật ít khi viết sai chữ Hán, nhưng hay nói sai thanh điệu.",
       "py": "Duì lǎoshī láishuō, Rìběn xuéshēng de hànzì hěnshǎo xiěcuò, kěshì shēngdiào cháng shuōcuò."
      },
      {
       "hz": "對遊客來說，參觀當地的美術館或博物館，都是不錯的選擇。",
       "vi": "Đối với du khách, tham quan bảo tàng mỹ thuật hoặc bảo tàng địa phương đều là lựa chọn không tồi.",
       "py": "Duì yóukè láishuō, cānguān dāngdì de měishùguǎn huò bówùguǎn, dōu shì búcuò de xuǎnzé."
      },
      {
       "hz": "A:那個牌子很有名，一件外套一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B:對你這個有錢人來說是不貴，可是對一般人來說貴得不得了。",
       "vi": "B: Đối với người giàu như bạn thì không đắt, nhưng đối với người bình thường thì đắt vô cùng.",
       "py": "B: Duì nǐ zhège yǒuqiánrén láishuō shì bú guì, kěshì duì yìbān rén láishuō guì de bùdéle."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊錢，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài qián, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "到底 — rốt cuộc",
   "giaiThich": "Phó từ dùng trong câu hỏi lựa chọn (到底要不要?), KHÔNG dùng với câu hỏi có 嗎. Thể hiện người nói rất sốt ruột muốn biết câu trả lời."
  },
  {
   "title": "II. …...的話 if , supposing…",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, “的話” has the same function as “如果” and “要是” to form conditional sentences. However, “如果” and “要是“should be placed at the beginning of a sentence while “的話” should be placed at the end. In some cases, using “要是” gives a stronger or even threatening tone than using “如果”. Both “如果” and “要是” can collocate with “的話” , and either one can be left out. “的話” is a less formal expression. Use the pattern “的話 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "要是你明天不來(的話)，記得要先告訴我！",
       "vi": "Nếu ngày mai bạn không đến thì nhớ báo trước cho tôi nhé!",
       "py": "Yàoshì nǐ míngtiān bù lái (dehuà), jìde yào xiān gàosù wǒ!"
      },
      {
       "hz": "(如是)你常運動的話，心情一定會比較好。",
       "vi": "Nếu bạn thường xuyên tập thể dục thì tâm trạng chắc chắn sẽ tốt hơn.",
       "py": "(rúshì) nǐ cháng yùndòng dehuà, xīnqíng yídìng huì bǐjiào hǎo."
      },
      {
       "hz": "(要是)你不保養那輛汽車的話，可能會有問題的！",
       "vi": "Nếu bạn không bảo dưỡng chiếc ô tô đó thì có thể sẽ hỏng đấy!",
       "py": "(yàoshì) nǐ bù bǎoyǎng nà liàng qìchē dehuà, kěnéng huì yǒu wèntí de!"
      },
      {
       "hz": "A：我討厭運動，運動讓我覺得太累了！",
       "vi": "A: Tôi ghét tập thể dục, tập thể dục khiến tôi thấy mệt quá!",
       "py": "A: Wǒ tǎoyàn yùndòng, yùndòng ràng wǒ juéde tài lèi le!"
      },
      {
       "hz": "B： ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，就會越來越胖喔！",
       "vi": "B: …, thì sẽ ngày càng béo đấy!",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, jiù huì yuèláiyuè pàng ō!"
      },
      {
       "hz": "A：你想不想搬出去，到學校外面租房子？",
       "vi": "A: Bạn có muốn dọn ra ngoài, thuê nhà bên ngoài trường không?",
       "py": "A: Nǐ xiǎng bùxiǎng bānchūqù, dào xuéxiào wàimiàn zūfángzi?"
      },
      {
       "hz": "A：時間很晚了，你怎麼不睡覺，還在念書？",
       "vi": "A: Muộn rồi, sao bạn không ngủ mà vẫn còn học bài?",
       "py": "A: Shíjiān hěn wǎn le, nǐ zěnme bú shuìjiào, hái zài niànshū?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "……的話 — nếu…",
   "giaiThich": "Cùng chức năng với 如果 / 要是 để nêu giả thiết, nhưng 的話 đặt ở CUỐI vế điều kiện, còn 如果/要是 đặt ở đầu."
  },
  {
   "title": "III. 對⋯⋯有/沒(有)幫助;有/沒(有)影響;有/沒(有)好處",
   "points": [
    {
     "label": null,
     "formula": "to be helpful to /  to have influence on / to be beneficial to This pattern, in which “對” is followed by someone or something , indicates the subject , often a thing , has influence on someone or something. Use the pattern “對...有幫助 / 興趣 / 影響 / 好處 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "健身教練說，經常運動，對健康很有幫助。2. 父母說的話，對我有很大的影響。3. 每天吃喝玩樂對你的將來沒有好處，你應該好好地利用時間。",
       "vi": "Huấn luyện viên thể hình nói thường xuyên tập thể dục rất có ích cho sức khoẻ. Lời bố mẹ nói có ảnh hưởng rất lớn đến tôi. Ngày nào cũng ăn chơi không có lợi gì cho tương lai của bạn, bạn nên tận dụng thời gian cho tốt.",
       "py": "Jiànshēn jiàoliàn shuō, jīngcháng yùndòng, duì jiànkāng hěn yǒu bāngzhù. 2. Fùmǔ shuō dehuà, duì wǒ yǒu hěndà de yǐngxiǎng. 3. Měitiān chīhēwánlè duì nǐ de jiānglái méiyǒu hǎochù, nǐ yīnggāi hǎohǎo dì lìyòng shíjiān."
      },
      {
       "hz": "幫助 / 興趣 / 影響 / 好處",
       "vi": "giúp ích / hứng thú / ảnh hưởng / lợi ích",
       "py": "Bāngzhù / xìngqù / yǐngxiǎng / hǎochù"
      },
      {
       "hz": "A：你為什麼想認識外國朋友？",
       "vi": "A: Tại sao bạn muốn làm quen với bạn nước ngoài?",
       "py": "A: Nǐ wèishénme xiǎng rènshì wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍ，所以我想認識外國朋友。",
       "vi": "B: …, nên tôi muốn làm quen với bạn nước ngoài.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ wǒ xiǎng rènshì wàiguó péngyǒu."
      },
      {
       "hz": "A：我要去世界旅行半年,一起去吧!",
       "vi": "A: Tôi sắp đi du lịch vòng quanh thế giới nửa năm, đi cùng nhé!",
       "py": "A: Wǒ yào qù shìjiè lǚxíng bànnián, yìqǐ qù ba!"
      },
      {
       "hz": "B：不好意思 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xin lỗi, ….",
       "py": "B: Bùhǎoyìsī ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "孩子：媽媽，我可以再吃一塊炸雞、一包薯條嗎?",
       "vi": "Con: Mẹ ơi, con ăn thêm một miếng gà rán, một gói khoai tây chiên được không?",
       "py": "Háizi: Māma, wǒ kěyǐ zài chī yíkuài zhàjī, yìbāo shǔtiáo ma?"
      },
      {
       "hz": "媽媽：不可以，吃太多 ˍˍˍˍˍˍˍˍˍˍ，只有壞處。",
       "vi": "Mẹ: Không được, ăn nhiều quá …, chỉ có hại thôi.",
       "py": "Māma: Bù kěyǐ, chī tài duō ˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu huàichù."
      },
      {
       "hz": "你運動嗎？",
       "vi": "Bạn có tập thể dục không?",
       "py": "Nǐ yùndòng ma?"
      },
      {
       "hz": "請你問問你的同學、朋友，問他們平常運動嗎？為什麼？",
       "vi": "Hãy hỏi các bạn học, bạn bè xem bình thường họ có tập thể dục không? Tại sao?",
       "py": "Qǐng nǐ wènwèn nǐ de tóngxué, péngyǒu, wèn tāmen píngcháng yùndòng ma? Wèishénme?"
      },
      {
       "hz": "有運動習慣的人沒有運動習慣的人你經常做什麼運動？",
       "vi": "Người có thói quen tập thể dục · Người không có thói quen tập thể dục · Bạn thường tập môn gì?",
       "py": "Yǒu yùndòng xíguàn de rén méiyǒu yùndòng xíguàn de rén nǐ jīngcháng zuò shénme yùndòng?"
      },
      {
       "hz": "你去什麼地方做運動？",
       "vi": "Bạn tập thể dục ở đâu?",
       "py": "Nǐ qù shénme dìfāng zuò yùndòng?"
      },
      {
       "hz": "你什麼時候想運動？",
       "vi": "Khi nào bạn muốn tập thể dục?",
       "py": "Nǐ shénme shíhòu xiǎng yùndòng?"
      },
      {
       "hz": "你覺得運動的好處是什麼？",
       "vi": "Bạn thấy lợi ích của tập thể dục là gì?",
       "py": "Nǐ juéde yùndòng de hǎochù shì shénme?"
      },
      {
       "hz": "你覺得，運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde, yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "如果你的朋友不喜歡運動，你想對他說什麼？",
       "vi": "Nếu bạn của bạn không thích tập thể dục, bạn muốn nói gì với họ?",
       "py": "Rúguǒ nǐ de péngyǒu bù xǐhuān yùndòng, nǐ xiǎng duì tā shuō shénme?"
      },
      {
       "hz": "你做過什麼運動？",
       "vi": "Bạn đã từng tập môn thể thao nào?",
       "py": "Nǐ zuò guò shénme yùndòng?"
      },
      {
       "hz": "你覺得運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "你覺得你的身體怎麼樣？",
       "vi": "Bạn thấy sức khoẻ của mình thế nào?",
       "py": "Nǐ juéde nǐ de shēntǐ zěnmeyàng?"
      },
      {
       "hz": "你的朋友經常運動嗎？",
       "vi": "Bạn của bạn có thường xuyên tập thể dục không?",
       "py": "Nǐ de péngyǒu jīngcháng yùndòng ma?"
      },
      {
       "hz": "你覺得每天需要運動多少時間？",
       "vi": "Bạn thấy mỗi ngày cần tập thể dục bao lâu?",
       "py": "Nǐ juéde měitiān xūyào yùndòng duōshǎo shíjiān?"
      },
      {
       "hz": "為什麼你不常運動？",
       "vi": "Tại sao bạn không hay tập thể dục?",
       "py": "Wèishénme nǐ bù cháng yùndòng?"
      },
      {
       "hz": "請使用下面的生詞、語法",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ"
      },
      {
       "hz": "「我是你的話，我就......」請想一想，為什麼有些人不運動?如果你是他們的話，你會怎麼做？請一些學生當不運動的人，說說為什麼不運動，說完以後，請別的同學給建議。",
       "vi": "“Nếu tôi là bạn, tôi sẽ…” Hãy nghĩ xem tại sao có người không tập thể dục? Nếu bạn là họ, bạn sẽ làm thế nào? Mời vài học sinh đóng vai người không tập thể dục, nói xem vì sao không tập, nói xong thì các bạn khác đưa ra lời khuyên.",
       "py": "“Wǒ shì nǐ dehuà, wǒ jiù......” qǐng xiǎngyìxiǎng, wèishénme yǒuxiē rén bú yùndòng? Rúguǒ nǐ shì tāmen dehuà, nǐ huì zěnme zuò? Qǐng yìxiē xuéshēng dāng bú yùndòng de rén, shuō shuō wèishénme bú yùndòng, shuōwán yǐhòu, qǐng biéde tóngxué gěi jiànyì."
      },
      {
       "hz": "為什麼不運動？",
       "vi": "Tại sao không tập thể dục?",
       "py": "Wèishénme bú yùndòng?"
      },
      {
       "hz": "為什麼要運動？",
       "vi": "Tại sao phải tập thể dục?",
       "py": "Wèishénme yào yùndòng?"
      },
      {
       "hz": "每天開夜車準備考試，沒有時間......我是你的話，我就先運動，再看書。因為運動對精神和體力都有幫助，讓你可以學得更好。",
       "vi": "Ngày nào cũng thức khuya ôn thi, không có thời gian… Nếu tôi là bạn, tôi sẽ tập thể dục trước rồi mới đọc sách. Vì tập thể dục có ích cho cả tinh thần lẫn thể lực, giúp bạn học tốt hơn.",
       "py": "Měitiān kāiyèchē zhǔnbèi kǎoshì, méiyǒu shíjiān...... Wǒ shì nǐ dehuà, wǒ jiù xiān yùndòng, zài kànshū. Yīnwèi yùndòng duì jīngshén hàn tǐlì dōu yǒu bāngzhù, ràng nǐ kěyǐ xué de gènghǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有 幫助 · 影響 · 好處",
   "giaiThich": "Nói việc gì đó có ích, có ảnh hưởng hay có lợi cho ai/cái gì (hoặc không)."
  }
 ],
 "td2-10.4": [
  {
   "title": "III. 越……越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”.",
     "examples": [
      {
       "hz": "山本良介的中文越說越好了。2. 中文的語法不容易，老師越說，我越不懂。",
       "vi": "Tiếng Trung của Yamamoto Ryosuke càng nói càng giỏi. Ngữ pháp tiếng Trung không dễ, thầy giáo càng giảng tôi càng không hiểu.",
       "py": "Shānběn Liángjiè de zhōngwén yuè shuō yuè hǎo le. 2. Zhōngwén de yǔfǎ bù róngyì, lǎoshī yuè shuō, wǒ yuè bù dǒng."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越… 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "III. 越 V 越...... the more… , the more…",
   "points": [
    {
     "label": null,
     "formula": "When the subject does the first action, the situation changes accordingly with the increase or decrease in the degree or number. The structure is “ S 越 V1/Vs1 越 V2/Vs2 ”. Besides, this pattern can have a second subject. When the first subject does something more frequently, the state of the second subject will change accordingly. The pattern is “ S1 越 V1 / Vs1，S2 越 V2 / Vs2 ”. Use the pattern ”越 V 越......  ” to rewrite the sentences. Use the pattern ”越 V 越......  ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "房子離捷運站越近，房租越貴。4. 李先生很喜歡工作，事情越多，他越高興。",
       "vi": "Nhà càng gần ga tàu điện ngầm thì tiền thuê càng đắt. Anh Lý rất thích làm việc, việc càng nhiều anh ấy càng vui.",
       "py": "Fángzi lí jiéyùn zhàn yuè jìn, fángzū yuè guì. 4. Lǐ xiānshēng hěn xǐhuān gōngzuò, shìqíng yuè duō, tā yuè gāoxìng."
      },
      {
       "hz": "A：王先生學了三個月的法文，為什麼現在不學了。",
       "vi": "A: Anh Vương học tiếng Pháp ba tháng, sao bây giờ không học nữa?",
       "py": "A: Wáng xiānshēng xué le sāngè yuè de fǎwén, wèishénme xiànzài bù xué le."
      },
      {
       "hz": "B：因為ˍˍˍˍˍˍˍˍˍˍˍˍ，所以不想學了。",
       "vi": "B: Vì …, nên không muốn học nữa.",
       "py": "B: Yīnwèi ˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ bùxiǎng xué le."
      },
      {
       "hz": "A：這首歌，我們已經會唱了，為什麼還要一直練習。",
       "vi": "A: Bài hát này chúng ta đã biết hát rồi, sao còn phải luyện mãi?",
       "py": "A: Zhè shǒugē, wǒmen yǐjīng huì chàng le, wèishénme háiyào yìzhí liànxí."
      },
      {
       "hz": "A：最近我胖了很多，要去健身了。",
       "vi": "A: Dạo này tôi béo lên nhiều, phải đi tập gym thôi.",
       "py": "A: Zuìjìn wǒ pàng le hěnduō, yào qù jiànshēn le."
      },
      {
       "hz": "B：你常常吃炸雞、薯條，當然會 ˍˍˍˍˍˍˍˍˍˍˍ啊！",
       "vi": "B: Bạn hay ăn gà rán, khoai tây chiên, đương nhiên sẽ … rồi!",
       "py": "B: Nǐ chángcháng chī zhàjī, shǔtiáo, dāngrán huì ˍˍˍˍˍˍˍˍˍˍˍ a!"
      },
      {
       "hz": "太太：以前你很喜歡吃蛋糕，現在怎麼不吃了？",
       "vi": "Vợ: Trước đây anh rất thích ăn bánh kem, sao bây giờ không ăn nữa?",
       "py": "Tàitai: Yǐqián nǐ hěn xǐhuān chī dàngāo, xiànzài zěnme bùchī le?"
      },
      {
       "hz": "先生：蛋糕太甜了！為了健康，ˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Bánh kem ngọt quá! Vì sức khoẻ, ….",
       "py": "Xiānshēng: Dàngāo tài tián le! Wèile jiànkāng, ˍˍˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "越 V 越… — càng… càng…",
   "giaiThich": "Cấu trúc \"S 越 V1 越 V2\": làm việc trước tới đâu thì mức độ việc sau thay đổi theo tới đó."
  },
  {
   "title": "VI. 到底 What on earth...",
   "points": [
    {
     "label": null,
     "formula": "“到底” is an adverb which is used in disjunctive questions except for those with final “嗎”, e.g., “到底要不要?” and “到底去不去?”It shows the emotion that the speaker is eager to know the answer. It can be placed before or after the Subject, but when the Subject is a question word, “到底” can only be placed in front of the Subject and used as an adverbial, e.g., “到底是誰偷了我的車?” Use the pattern “ 到底” to rewrite the sentences. The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a",
     "examples": [
      {
       "hz": "我要訂位了，你明天到底要不要跟我們去 KTV？2. 到底要用幾張貼紙才換得到便利商店的禮物呢？3. 我不知道林老師到底住在學校前面還是後面的社區。",
       "vi": "Tôi sắp đặt chỗ rồi, rốt cuộc ngày mai bạn có đi karaoke với chúng tôi không? Rốt cuộc phải dùng bao nhiêu nhãn dán mới đổi được quà của cửa hàng tiện lợi? Tôi không biết rốt cuộc thầy Lâm sống ở khu dân cư phía trước hay phía sau trường.",
       "py": "Wǒ yào dìngwèi le, nǐ míngtiān dàodǐ yào búyào gēn wǒmen qù KTV? 2. Dàodǐ yào yòng jǐzhāng tiēzhǐ cái huàn dédào biànlìshāngdiàn de lǐwù ne? 3. Wǒ bù zhīdào Lín lǎoshī dàodǐ zhù zài xuéxiào qiánmiàn háishì hòumiàn de shèqū."
      },
      {
       "hz": "聽說高小姐歌唱得很好，可是誰都沒聽過，我們都不知道張爸爸想住在地鐵站附近，張媽媽想找附近有公園的公寓，3. 你一下想上作文課，一下要修文法課，",
       "vi": "Nghe nói cô Cao hát rất hay, nhưng chưa ai từng nghe, chúng tôi đều không biết… Bố Trương muốn sống gần ga tàu điện, mẹ Trương muốn tìm căn hộ gần công viên… Bạn lúc thì muốn học lớp viết văn, lúc lại muốn học lớp ngữ pháp…",
       "py": "Tīngshuō Gāo xiǎojiě gēchàng de hěn hǎo, kěshì shéi dōu méi tīng guò, wǒmen dōu bù zhīdào Zhāng bàba xiǎng zhù zài dìtiězhàn fùjìn, Zhāng māma xiǎng zhǎo fùjìn yǒu gōngyuán de gōngyù, 3. Nǐ yíxià xiǎng shàng zuòwénkè, yíxià yào xiū wénfǎ kè,"
      },
      {
       "hz": "你覺得運動對身體有什麼好處？",
       "vi": "Bạn thấy tập thể dục có lợi gì cho sức khoẻ?",
       "py": "Nǐ juéde yùndòng duì shēntǐ yǒu shénme hǎochù?"
      },
      {
       "hz": "運動可以讓人和人的關係更好嗎？為什麼？",
       "vi": "Tập thể dục có giúp quan hệ giữa người với người tốt hơn không? Tại sao?",
       "py": "Yùndòng kěyǐ ràng rén hàn rén de guānxì gènghǎo ma? Wèishénme?"
      },
      {
       "hz": "你覺得學生需要運動嗎？為什麼？",
       "vi": "Bạn thấy học sinh có cần tập thể dục không? Tại sao?",
       "py": "Nǐ juéde xuéshēng xūyào yùndòng ma? Wèishénme?"
      },
      {
       "hz": "醫生為什麼建議病人多運動？",
       "vi": "Tại sao bác sĩ khuyên bệnh nhân tập thể dục nhiều?",
       "py": "Yīshēng wèishénme jiànyì bìngrén duō yùndòng?"
      },
      {
       "hz": "要是你心情不好，有什麼辦法能讓你的心情變好？",
       "vi": "Nếu tâm trạng không tốt, bạn có cách gì để tâm trạng tốt hơn?",
       "py": "Yàoshì nǐ xīnqíng bùhǎo, yǒu shénme bànfǎ néng ràng nǐ de xīnqíng biàn hǎo?"
      },
      {
       "hz": "你覺得運動還有什麼別的好處？",
       "vi": "Bạn thấy tập thể dục còn có lợi ích gì khác?",
       "py": "Nǐ juéde yùndòng háiyǒu shénme biéde hǎochù?"
      },
      {
       "hz": "對老師來說，日本學生的漢字很少寫錯，可是聲調常說錯。",
       "vi": "Đối với thầy giáo, học sinh Nhật ít khi viết sai chữ Hán, nhưng hay nói sai thanh điệu.",
       "py": "Duì lǎoshī láishuō, Rìběn xuéshēng de hànzì hěnshǎo xiěcuò, kěshì shēngdiào cháng shuōcuò."
      },
      {
       "hz": "對遊客來說，參觀當地的美術館或博物館，都是不錯的選擇。",
       "vi": "Đối với du khách, tham quan bảo tàng mỹ thuật hoặc bảo tàng địa phương đều là lựa chọn không tồi.",
       "py": "Duì yóukè láishuō, cānguān dāngdì de měishùguǎn huò bówùguǎn, dōu shì búcuò de xuǎnzé."
      },
      {
       "hz": "A:那個牌子很有名，一件外套一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B:對你這個有錢人來說是不貴，可是對一般人來說貴得不得了。",
       "vi": "B: Đối với người giàu như bạn thì không đắt, nhưng đối với người bình thường thì đắt vô cùng.",
       "py": "B: Duì nǐ zhège yǒuqiánrén láishuō shì bú guì, kěshì duì yìbān rén láishuō guì de bùdéle."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊錢，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài qián, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "到底 — rốt cuộc",
   "giaiThich": "Phó từ dùng trong câu hỏi lựa chọn (到底要不要?), KHÔNG dùng với câu hỏi có 嗎. Thể hiện người nói rất sốt ruột muốn biết câu trả lời."
  },
  {
   "title": "II. …...的話 if , supposing…",
   "points": [
    {
     "label": null,
     "formula": "In Chinese, “的話” has the same function as “如果” and “要是” to form conditional sentences. However, “如果” and “要是“should be placed at the beginning of a sentence while “的話” should be placed at the end. In some cases, using “要是” gives a stronger or even threatening tone than using “如果”. Both “如果” and “要是” can collocate with “的話” , and either one can be left out. “的話” is a less formal expression. Use the pattern “的話 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "要是你明天不來(的話)，記得要先告訴我！",
       "vi": "Nếu ngày mai bạn không đến thì nhớ báo trước cho tôi nhé!",
       "py": "Yàoshì nǐ míngtiān bù lái (dehuà), jìde yào xiān gàosù wǒ!"
      },
      {
       "hz": "(如是)你常運動的話，心情一定會比較好。",
       "vi": "Nếu bạn thường xuyên tập thể dục thì tâm trạng chắc chắn sẽ tốt hơn.",
       "py": "(rúshì) nǐ cháng yùndòng dehuà, xīnqíng yídìng huì bǐjiào hǎo."
      },
      {
       "hz": "(要是)你不保養那輛汽車的話，可能會有問題的！",
       "vi": "Nếu bạn không bảo dưỡng chiếc ô tô đó thì có thể sẽ hỏng đấy!",
       "py": "(yàoshì) nǐ bù bǎoyǎng nà liàng qìchē dehuà, kěnéng huì yǒu wèntí de!"
      },
      {
       "hz": "A：我討厭運動，運動讓我覺得太累了！",
       "vi": "A: Tôi ghét tập thể dục, tập thể dục khiến tôi thấy mệt quá!",
       "py": "A: Wǒ tǎoyàn yùndòng, yùndòng ràng wǒ juéde tài lèi le!"
      },
      {
       "hz": "B： ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，就會越來越胖喔！",
       "vi": "B: …, thì sẽ ngày càng béo đấy!",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, jiù huì yuèláiyuè pàng ō!"
      },
      {
       "hz": "A：你想不想搬出去，到學校外面租房子？",
       "vi": "A: Bạn có muốn dọn ra ngoài, thuê nhà bên ngoài trường không?",
       "py": "A: Nǐ xiǎng bùxiǎng bānchūqù, dào xuéxiào wàimiàn zūfángzi?"
      },
      {
       "hz": "A：時間很晚了，你怎麼不睡覺，還在念書？",
       "vi": "A: Muộn rồi, sao bạn không ngủ mà vẫn còn học bài?",
       "py": "A: Shíjiān hěn wǎn le, nǐ zěnme bú shuìjiào, hái zài niànshū?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "……的話 — nếu…",
   "giaiThich": "Cùng chức năng với 如果 / 要是 để nêu giả thiết, nhưng 的話 đặt ở CUỐI vế điều kiện, còn 如果/要是 đặt ở đầu."
  },
  {
   "title": "III. 對⋯⋯有/沒(有)幫助;有/沒(有)影響;有/沒(有)好處",
   "points": [
    {
     "label": null,
     "formula": "to be helpful to /  to have influence on / to be beneficial to This pattern, in which “對” is followed by someone or something , indicates the subject , often a thing , has influence on someone or something. Use the pattern “對...有幫助 / 興趣 / 影響 / 好處 ” to rewrite the sentences.",
     "examples": [
      {
       "hz": "健身教練說，經常運動，對健康很有幫助。2. 父母說的話，對我有很大的影響。3. 每天吃喝玩樂對你的將來沒有好處，你應該好好地利用時間。",
       "vi": "Huấn luyện viên thể hình nói thường xuyên tập thể dục rất có ích cho sức khoẻ. Lời bố mẹ nói có ảnh hưởng rất lớn đến tôi. Ngày nào cũng ăn chơi không có lợi gì cho tương lai của bạn, bạn nên tận dụng thời gian cho tốt.",
       "py": "Jiànshēn jiàoliàn shuō, jīngcháng yùndòng, duì jiànkāng hěn yǒu bāngzhù. 2. Fùmǔ shuō dehuà, duì wǒ yǒu hěndà de yǐngxiǎng. 3. Měitiān chīhēwánlè duì nǐ de jiānglái méiyǒu hǎochù, nǐ yīnggāi hǎohǎo dì lìyòng shíjiān."
      },
      {
       "hz": "幫助 / 興趣 / 影響 / 好處",
       "vi": "giúp ích / hứng thú / ảnh hưởng / lợi ích",
       "py": "Bāngzhù / xìngqù / yǐngxiǎng / hǎochù"
      },
      {
       "hz": "A：你為什麼想認識外國朋友？",
       "vi": "A: Tại sao bạn muốn làm quen với bạn nước ngoài?",
       "py": "A: Nǐ wèishénme xiǎng rènshì wàiguó péngyǒu?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍ，所以我想認識外國朋友。",
       "vi": "B: …, nên tôi muốn làm quen với bạn nước ngoài.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍ, suǒyǐ wǒ xiǎng rènshì wàiguó péngyǒu."
      },
      {
       "hz": "A：我要去世界旅行半年,一起去吧!",
       "vi": "A: Tôi sắp đi du lịch vòng quanh thế giới nửa năm, đi cùng nhé!",
       "py": "A: Wǒ yào qù shìjiè lǚxíng bànnián, yìqǐ qù ba!"
      },
      {
       "hz": "B：不好意思 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Xin lỗi, ….",
       "py": "B: Bùhǎoyìsī ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "孩子：媽媽，我可以再吃一塊炸雞、一包薯條嗎?",
       "vi": "Con: Mẹ ơi, con ăn thêm một miếng gà rán, một gói khoai tây chiên được không?",
       "py": "Háizi: Māma, wǒ kěyǐ zài chī yíkuài zhàjī, yìbāo shǔtiáo ma?"
      },
      {
       "hz": "媽媽：不可以，吃太多 ˍˍˍˍˍˍˍˍˍˍ，只有壞處。",
       "vi": "Mẹ: Không được, ăn nhiều quá …, chỉ có hại thôi.",
       "py": "Māma: Bù kěyǐ, chī tài duō ˍˍˍˍˍˍˍˍˍˍ, zhǐyǒu huàichù."
      },
      {
       "hz": "你運動嗎？",
       "vi": "Bạn có tập thể dục không?",
       "py": "Nǐ yùndòng ma?"
      },
      {
       "hz": "請你問問你的同學、朋友，問他們平常運動嗎？為什麼？",
       "vi": "Hãy hỏi các bạn học, bạn bè xem bình thường họ có tập thể dục không? Tại sao?",
       "py": "Qǐng nǐ wènwèn nǐ de tóngxué, péngyǒu, wèn tāmen píngcháng yùndòng ma? Wèishénme?"
      },
      {
       "hz": "有運動習慣的人沒有運動習慣的人你經常做什麼運動？",
       "vi": "Người có thói quen tập thể dục · Người không có thói quen tập thể dục · Bạn thường tập môn gì?",
       "py": "Yǒu yùndòng xíguàn de rén méiyǒu yùndòng xíguàn de rén nǐ jīngcháng zuò shénme yùndòng?"
      },
      {
       "hz": "你去什麼地方做運動？",
       "vi": "Bạn tập thể dục ở đâu?",
       "py": "Nǐ qù shénme dìfāng zuò yùndòng?"
      },
      {
       "hz": "你什麼時候想運動？",
       "vi": "Khi nào bạn muốn tập thể dục?",
       "py": "Nǐ shénme shíhòu xiǎng yùndòng?"
      },
      {
       "hz": "你覺得運動的好處是什麼？",
       "vi": "Bạn thấy lợi ích của tập thể dục là gì?",
       "py": "Nǐ juéde yùndòng de hǎochù shì shénme?"
      },
      {
       "hz": "你覺得，運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde, yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "如果你的朋友不喜歡運動，你想對他說什麼？",
       "vi": "Nếu bạn của bạn không thích tập thể dục, bạn muốn nói gì với họ?",
       "py": "Rúguǒ nǐ de péngyǒu bù xǐhuān yùndòng, nǐ xiǎng duì tā shuō shénme?"
      },
      {
       "hz": "你做過什麼運動？",
       "vi": "Bạn đã từng tập môn thể thao nào?",
       "py": "Nǐ zuò guò shénme yùndòng?"
      },
      {
       "hz": "你覺得運動對你有什麼影響？",
       "vi": "Bạn thấy tập thể dục có ảnh hưởng gì đến bạn?",
       "py": "Nǐ juéde yùndòng duì nǐ yǒu shénme yǐngxiǎng?"
      },
      {
       "hz": "你覺得你的身體怎麼樣？",
       "vi": "Bạn thấy sức khoẻ của mình thế nào?",
       "py": "Nǐ juéde nǐ de shēntǐ zěnmeyàng?"
      },
      {
       "hz": "你的朋友經常運動嗎？",
       "vi": "Bạn của bạn có thường xuyên tập thể dục không?",
       "py": "Nǐ de péngyǒu jīngcháng yùndòng ma?"
      },
      {
       "hz": "你覺得每天需要運動多少時間？",
       "vi": "Bạn thấy mỗi ngày cần tập thể dục bao lâu?",
       "py": "Nǐ juéde měitiān xūyào yùndòng duōshǎo shíjiān?"
      },
      {
       "hz": "為什麼你不常運動？",
       "vi": "Tại sao bạn không hay tập thể dục?",
       "py": "Wèishénme nǐ bù cháng yùndòng?"
      },
      {
       "hz": "請使用下面的生詞、語法",
       "vi": "Hãy dùng các từ mới và ngữ pháp dưới đây",
       "py": "Qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ"
      },
      {
       "hz": "「我是你的話，我就......」請想一想，為什麼有些人不運動?如果你是他們的話，你會怎麼做？請一些學生當不運動的人，說說為什麼不運動，說完以後，請別的同學給建議。",
       "vi": "“Nếu tôi là bạn, tôi sẽ…” Hãy nghĩ xem tại sao có người không tập thể dục? Nếu bạn là họ, bạn sẽ làm thế nào? Mời vài học sinh đóng vai người không tập thể dục, nói xem vì sao không tập, nói xong thì các bạn khác đưa ra lời khuyên.",
       "py": "“Wǒ shì nǐ dehuà, wǒ jiù......” qǐng xiǎngyìxiǎng, wèishénme yǒuxiē rén bú yùndòng? Rúguǒ nǐ shì tāmen dehuà, nǐ huì zěnme zuò? Qǐng yìxiē xuéshēng dāng bú yùndòng de rén, shuō shuō wèishénme bú yùndòng, shuōwán yǐhòu, qǐng biéde tóngxué gěi jiànyì."
      },
      {
       "hz": "為什麼不運動？",
       "vi": "Tại sao không tập thể dục?",
       "py": "Wèishénme bú yùndòng?"
      },
      {
       "hz": "為什麼要運動？",
       "vi": "Tại sao phải tập thể dục?",
       "py": "Wèishénme yào yùndòng?"
      },
      {
       "hz": "每天開夜車準備考試，沒有時間......我是你的話，我就先運動，再看書。因為運動對精神和體力都有幫助，讓你可以學得更好。",
       "vi": "Ngày nào cũng thức khuya ôn thi, không có thời gian… Nếu tôi là bạn, tôi sẽ tập thể dục trước rồi mới đọc sách. Vì tập thể dục có ích cho cả tinh thần lẫn thể lực, giúp bạn học tốt hơn.",
       "py": "Měitiān kāiyèchē zhǔnbèi kǎoshì, méiyǒu shíjiān...... Wǒ shì nǐ dehuà, wǒ jiù xiān yùndòng, zài kànshū. Yīnwèi yùndòng duì jīngshén hàn tǐlì dōu yǒu bāngzhù, ràng nǐ kěyǐ xué de gènghǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 有/沒有 幫助 · 影響 · 好處",
   "giaiThich": "Nói việc gì đó có ích, có ảnh hưởng hay có lợi cho ai/cái gì (hoặc không)."
  }
 ],
 "td2-11.1": [
  {
   "title": "II. 對······(不)感興趣 to be interested in…",
   "points": [
    {
     "label": null,
     "formula": "“感興趣” is used to show the subject’s interests and willingness to have further Are you interested in the following activities? Why? Please answer the question with “ 對······(不) 感興趣 ”. The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來” means to come up with (an idea). The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來”means to come up with (an idea). Use the pattern “V 出來 ( V不出來 / V出得來 / 沒 V 出來 / V出來了 )” to rewrite the sentences. “ 嘛 ” is used to take a pause in a sentence when the speaker is thinking about what to say next about the topic mentioned . Use ”嘛 ”to finish the conversations. The pattern “ 同+一+M ” is used to describe different subjects having the same situation, and this can be the same object, time and location, etc…. In Chinese, the word “等”has two functions. Firstly, it can be placed before a number that marks the total of items mentioned, or before a word that is the hypernym (category) for the items mentioned. On the other hand, it can be used at the end of a list to show there are still a lot of examples of the same kind. 從......中      ( to get / benefit / understand… )  from… In this pattern, “中” means “inside” instead of “middle”. The pattern “從⋯⋯中” indicates someone learns about a situation, deals with something, or gets benefits",
     "examples": [
      {
       "hz": "白小姐很愛化妝，對現在最流行的化妝品很感興趣。2. 我喜歡幫助別人，所以對去醫院服務的事非常感興趣。3. 林先生很喜歡張小姐，可是張小姐對他一點兒都不感興趣。",
       "vi": "Cô Bạch rất thích trang điểm, rất hứng thú với các loại mỹ phẩm thịnh hành nhất hiện nay. Tôi thích giúp đỡ người khác, nên rất hứng thú với việc làm tình nguyện ở bệnh viện. Anh Lâm rất thích cô Trương, nhưng cô Trương chẳng hứng thú gì với anh ấy cả.",
       "py": "Bái xiǎojiě hěn ài huàzhuāng, duì xiànzài zuì liúxíng de huàzhuāngpǐn hěngǎnxìngqù. 2. Wǒ xǐhuān bāngzhù biérén, suǒyǐ duì qù yīyuàn fúwù de shì fēicháng gǎnxìngqù. 3. Lín xiānshēng hěn xǐhuān Zhāng xiǎojiě, kěshì Zhāng xiǎojiě duì tā yìdiǎn'ér dōu bùgǎnxìngqù."
      },
      {
       "hz": "你對下面這些事感興趣嗎？為什麼？請用「對······感興趣」或「對······不感興趣」回答。",
       "vi": "Bạn có hứng thú với những việc dưới đây không? Tại sao? Hãy trả lời bằng “對……感興趣” hoặc “對……不感興趣”.",
       "py": "Nǐ duì xiàmiàn zhèxiē shì gǎnxìngqù ma? Wèishénme? Qǐng yòng “duì · · · · · · gǎnxìngqù” huò “duì · · · · · · bùgǎnxìngqù” huídá."
      },
      {
       "hz": "中國功夫電影便利商店辦的新活動最流行的手機APP坐火車到花蓮去旅行參加聖誕舞會到很多地方吃喝玩樂學怎麼做臭豆腐到健身房健身",
       "vi": "Phim kung fu Trung Quốc · Hoạt động mới của cửa hàng tiện lợi · Ứng dụng điện thoại thịnh hành nhất · Đi tàu hoả đến Hoa Liên du lịch · Dự tiệc nhảy Giáng sinh · Đi ăn chơi ở nhiều nơi · Học làm đậu phụ thối · Đến phòng gym tập luyện",
       "py": "Zhōngguó gōngfu diànyǐng biànlìshāngdiàn bàn de xīn huódòng zuì liúxíng de shǒujī APP zuòhuǒchē dào Huālián qù lǚxíng cānjiā shèngdàn wǔhuì dào hěnduō dìfāng chīhēwánlè xué zěnme zuò chòudòufǔ dào jiànshēnfáng jiànshēn"
      },
      {
       "hz": "到底是誰打電話給我的？他的聲音，你聽不出來嗎？2. 他上班又遲到了，讓老闆很生氣，大家都看得出來。",
       "vi": "Rốt cuộc ai đã gọi điện cho tôi? Giọng người đó bạn không nghe ra à? Anh ấy lại đi làm muộn, khiến ông chủ rất tức giận, ai cũng nhận ra.",
       "py": "Dàodǐ shì shéi dǎdiànhuà gěi wǒ de? Tā de shēngyīn, nǐ tīngbùchūlái ma? 2. Tā shàngbān yòu chídào le, ràng lǎobǎn hěn shēngqì, dàjiā dōu kàndechūlái."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：這是什麼茶，你們喝得出來喝不出來？ B：我一喝就喝出來了！這是紅茶。 C：真厲害！我還是喝不出來。4. 這句義大利文的中文翻譯很難，我想了很久，才想出來怎麼翻譯。",
       "vi": "A: Đây là trà gì, các bạn có uống ra không? B: Tôi vừa uống là nhận ra ngay! Đây là hồng trà. C: Giỏi thật! Tôi vẫn không nhận ra. Câu tiếng Ý này dịch sang tiếng Trung rất khó, tôi nghĩ rất lâu mới nghĩ ra cách dịch.",
       "py": "A: Zhè shì shénme chá, nǐmen hē de chūlái hē bù chūlái? B: Wǒ yì hē jiù hē chūlái le! Zhè shì hóngchá. C: Zhēn lìhài! Wǒ háishì hē bù chūlái. 4. Zhè jù yìdàlìwén de zhōngwénfānyì hěn nán, wǒ xiǎng le hěn jiǔ, cái xiǎng chūlái zěnme fānyì."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：你看那位小姐，你知道她幾歲嗎？",
       "vi": "A: Bạn nhìn cô gái kia xem, bạn biết cô ấy bao nhiêu tuổi không?",
       "py": "A: Nǐ kàn nàwèi xiǎojiě, nǐ zhīdào tā jǐsuì ma?"
      },
      {
       "hz": "A：這是義大利菜，裡面放了一點兒酒。",
       "vi": "A: Đây là món Ý, bên trong có cho một chút rượu.",
       "py": "A: Zhè shì yìdàlì cài, lǐmiàn fàng le yìdiǎn'ér jiǔ."
      },
      {
       "hz": "B：真的嗎？我 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Thật à? Tôi ….",
       "py": "B: Zhēnde ma? Wǒ ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這瓶香水是什麼味道？你聞聞看。",
       "vi": "A: Lọ nước hoa này mùi gì? Bạn ngửi thử xem.",
       "py": "A: Zhè píng xiāngshuǐ shì shénme wèidào? Nǐ wénwénkàn."
      },
      {
       "hz": "A：昨天教授問我們的那個數學問題，我覺得好難喔!",
       "vi": "A: Bài toán giáo sư hỏi chúng ta hôm qua, tôi thấy khó quá!",
       "py": "A: Zuótiān jiàoshòu wèn wǒmen de nàge shùxué wèntí, wǒ juéde hǎo nán ō!"
      },
      {
       "hz": "B：是真的很難，我想了很久，還是ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Đúng là rất khó, tôi nghĩ rất lâu mà vẫn ….",
       "py": "B: Shì zhēnde hěn nán, wǒ xiǎng le hěn jiǔ, háishì ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你喜歡看什麼電視節目？影集還是連續劇？ B：我喜歡看影集，連續劇嘛······我真的不感興趣。2. A：要不要一起去夜市？我想試試臭豆腐。 B：我也想去夜市，可是臭豆腐嘛······你自己吃就好。3. A：美國歷史這門課的考試，你考得怎麼樣？ B：筆試考得不錯，口試嘛······我聽不懂問題，所以說得不好。",
       "vi": "A: Bạn thích xem chương trình tivi gì? Phim bộ ngắn tập hay phim truyền hình dài tập? B: Tôi thích xem phim bộ ngắn tập, còn phim dài tập thì… tôi thật sự không hứng thú. A: Có muốn đi chợ đêm cùng không? Tôi muốn thử đậu phụ thối. B: Tôi cũng muốn đi chợ đêm, nhưng đậu phụ thối thì… bạn tự ăn là được rồi. A: Bài thi môn Lịch sử Mỹ, bạn làm thế nào? B: Thi viết thì khá, còn thi nói thì… tôi nghe không hiểu câu hỏi nên nói không tốt.",
       "py": "A: Nǐ xǐhuān kàn shénme diànshìjiémù? Yǐngjí háishì liánxùjù? B: Wǒ xǐhuān kàn yǐngjí, liánxùjù ma · · · · · · wǒ zhēnde bùgǎnxìngqù. 2. A: Yào búyào yìqǐ qù yèshì? Wǒ xiǎng shìshì chòudòufǔ. B: Wǒ yě xiǎng qù yèshì, kěshì chòudòufǔ ma · · · · · · nǐ zìjǐ chī jiù hǎo. 3. A: Měiguó lìshǐ zhè mén kè de kǎoshì, nǐ kǎo de zěnmeyàng? B: Bǐshì kǎo de búcuò, kǒushì ma · · · · · · wǒ tīngbùdǒng wèntí, suǒyǐ shuō de bùhǎo."
      },
      {
       "hz": "美心：你在台灣的生活都習慣了嗎？",
       "vi": "Mỹ Tâm: Bạn đã quen với cuộc sống ở Đài Loan chưa?",
       "py": "Měixīn: Nǐ zài Táiwān de shēnghuó dōu xíguàn le ma?"
      },
      {
       "hz": "良介：大部分都習慣了，ˍˍˍˍˍˍ嘛······ˍˍˍˍˍ。",
       "vi": "Ryosuke: Phần lớn đã quen rồi, … thì… ….",
       "py": "Liángjiè: Dàbùfèn dōu xíguàn le, ˍˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：運動和藝術活動，你喜歡哪一種？",
       "vi": "A: Thể thao và nghệ thuật, bạn thích loại nào?",
       "py": "A: Yùndòng hàn yìshù huódòng, nǐ xǐhuān nǎ yìzhǒng?"
      },
      {
       "hz": "B：我喜歡 ˍˍˍˍˍ， ˍˍˍˍˍ嘛······ ˍˍˍˍˍ 。",
       "vi": "B: Tôi thích …, … thì… ….",
       "py": "B: Wǒ xǐhuān ˍˍˍˍˍ, ˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：這個學期，你想參加哪一類的社團？",
       "vi": "A: Học kỳ này bạn muốn tham gia câu lạc bộ loại nào?",
       "py": "A: Zhège xuéqí, nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "我跟妹妹都喜歡喝同一種飲料。2. 他們兩個人是鄰居，住在同一棟公寓。3. 這個學期，我弟弟跟良介在同一班上英文作文課。",
       "vi": "Tôi và em gái đều thích uống cùng một loại đồ uống. Hai người họ là hàng xóm, sống cùng một toà chung cư. Học kỳ này em trai tôi và Ryosuke học cùng một lớp viết văn tiếng Anh.",
       "py": "Wǒ gēn mèimei dōu xǐhuān hē tóng yìzhǒng yǐnliào. 2. Tāmen liǎnggè rén shì línjū, zhù zài tóng yídòng gōngyù. 3. Zhège xuéqí, wǒ dìdi gēn Liángjiè zài tóngyì bānshàng yīngwén zuòwénkè."
      },
      {
       "hz": "我們的衣服都是在一樣的服裝店買的。",
       "vi": "Quần áo của chúng tôi đều mua ở cùng một cửa hàng thời trang.",
       "py": "Wǒmen de yīfú dōu shì zài yíyàng de fúzhuāngdiàn mǎi de."
      },
      {
       "hz": "我的中文老師是林老師。莫以凡的中文老師也是林老師。",
       "vi": "Cô giáo tiếng Trung của tôi là cô Lâm. Cô giáo tiếng Trung của Mạc Dĩ Phàm cũng là cô Lâm.",
       "py": "Wǒ de zhōngwén lǎoshī shì Lín lǎoshī. Mòyǐfán de zhōngwén lǎoshī yě shì Lín lǎoshī."
      },
      {
       "hz": "我妹妹的生日是3月8日，我的好朋友也是3月8日出生的。",
       "vi": "Sinh nhật em gái tôi là ngày 8 tháng 3, bạn thân của tôi cũng sinh ngày 8 tháng 3.",
       "py": "Wǒ mèimei de shēngrì shì 3 yuè 8 rì, wǒ de hǎo péngyǒu yě shì 3 yuè 8 rì chūshēng de."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 同 + 一 + M (+N).",
       "vi": "Viết lại câu bằng mẫu 同 + 一 + lượng từ (+ danh từ).",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u tóng + yī + M (+ N)."
      },
      {
       "hz": "愛心服務社多久做一次愛心服務？他們什麼時候做？",
       "vi": "Câu lạc bộ Thiện Nguyện bao lâu làm từ thiện một lần? Họ làm vào lúc nào?",
       "py": "Àixīn fúwùshè duōjiǔ zuò yícì àixīn fúwù? Tāmen shénme shíhòu zuò?"
      },
      {
       "hz": "在老人安養院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở viện dưỡng lão có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài lǎorén ānyǎngyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在育幼院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở trại trẻ mồ côi có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yùyòuyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在醫院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở bệnh viện có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yīyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "良介覺得愛心服務的經驗怎麼樣？",
       "vi": "Ryosuke thấy trải nghiệm làm thiện nguyện thế nào?",
       "py": "Liángjiè juéde àixīn fúwù de jīngyàn zěnmeyàng?"
      },
      {
       "hz": "參加愛心服務社以前，良介是個怎麼樣的人？",
       "vi": "Trước khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke là người thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐqián, Liángjiè shì gè zěnmeyàng de rén?"
      },
      {
       "hz": "參加愛心服務社以後，良介有了什麼改變？",
       "vi": "Sau khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke đã thay đổi thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐhòu, Liángjiè yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你同意良介的想法嗎？為什麼？",
       "vi": "Đọc xong bài văn, bạn có đồng ý với suy nghĩ của Ryosuke không? Tại sao?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ tóngyì Liángjiè de xiǎngfǎ ma? Wèishénme?"
      },
      {
       "hz": "請在這裡寫下你的姓名、國家、出生日期等資料。2. 我哥哥喜愛旅遊，他去過日本、英國、法國等三個國家。3. 學校的社團像鋼琴社、吉他社、書法社等，都有很多社員。",
       "vi": "Hãy ghi họ tên, quốc tịch, ngày sinh v.v. của bạn vào đây. Anh trai tôi rất thích du lịch, đã đi Nhật, Anh, Pháp — ba nước. Các câu lạc bộ trong trường như câu lạc bộ piano, guitar, thư pháp v.v. đều có rất nhiều thành viên.",
       "py": "Qǐng zài zhèlǐ xiěxià nǐ de xìngmíng, guójiā, chūshēngrìqí děng zīliào. 2. Wǒ gēge xǐ'ài lǚyóu, tā qùguò Rìběn, Yīngguó, Fǎguó děng sāngè guójiā. 3. Xuéxiào de shètuán xiàng gāngqín shè, jítāshè, shūfǎ shè děng, dōu yǒu hěnduō shèyuán."
      },
      {
       "hz": "A：你吃過哪些台灣小吃？",
       "vi": "A: Bạn đã ăn những món ăn vặt Đài Loan nào?",
       "py": "A: Nǐ chī guò nǎxiē Táiwān xiǎochī?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，我都吃過。",
       "vi": "B: …, tôi đều ăn rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ dōu chī guò."
      },
      {
       "hz": "A：你有哪些國家的朋友？",
       "vi": "A: Bạn có bạn bè ở những nước nào?",
       "py": "A: Nǐ yǒu nǎxiē guójiā de péngyǒu?"
      },
      {
       "hz": "A：我們週末要去阿里山爬山，要準備哪些東西呢？",
       "vi": "A: Cuối tuần chúng ta đi leo núi A Lý Sơn, cần chuẩn bị những gì?",
       "py": "A: Wǒmen zhōumò yào qù ālǐshān páshān, yào zhǔnbèi nǎxiē dōngxī ne?"
      },
      {
       "hz": "醫生從檢查報告中了解病人的情況。2. 我們可以從生活中得到不少寶貴的經驗。3. 從他說的這些話中，我聽不出來他是高興還是難過。",
       "vi": "Bác sĩ nắm được tình trạng bệnh nhân qua kết quả xét nghiệm. Chúng ta có thể học được nhiều kinh nghiệm quý báu từ cuộc sống. Qua những lời anh ấy nói, tôi không nghe ra anh ấy vui hay buồn.",
       "py": "Yīshēng cóng jiǎnchábàogào zhōng liǎojiě bìngrén de qíngkuàng. 2. Wǒmen kěyǐ cóng shēnghuó zhōng dédào bùshǎo bǎoguì de jīngyàn. 3. Cóng tā shuō de zhèxiē huà zhōng, wǒ tīngbùchūlái tā shì gāoxìng háishì nánguò."
      },
      {
       "hz": "考試的成績可以讓老師知道學生學得怎麼樣。",
       "vi": "Kết quả thi giúp thầy giáo biết học sinh học thế nào.",
       "py": "Kǎoshì de chéngjì kěyǐ ràng lǎoshī zhīdào xuéshēng xué de zěnmeyàng."
      },
      {
       "hz": "我從參加社團的經驗裡，學到了不少處理事情的方法。",
       "vi": "Từ kinh nghiệm tham gia câu lạc bộ, tôi đã học được nhiều cách xử lý công việc.",
       "py": "Wǒ cóng cānjiā shètuán de jīngyàn lǐ, xuédào le bùshǎo chǔlǐ shìqíng de fāngfǎ."
      },
      {
       "hz": "老師選了幾個華語中心的學生，去參加用中文說故事的比賽。",
       "vi": "Thầy giáo chọn vài học sinh của Trung tâm Hoa ngữ đi thi kể chuyện bằng tiếng Trung.",
       "py": "Lǎoshī xuǎn le jǐgè huáyǔ zhōngxīn de xuéshēng, qù cānjiā yòng zhōngwén shuō gùshì de bǐsài."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 從…中.",
       "vi": "Viết lại câu bằng mẫu 從…中.",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u cóng… zhōng."
      },
      {
       "hz": "上面的社團，你想參加哪一個？為什麼？",
       "vi": "Trong các câu lạc bộ trên, bạn muốn tham gia câu lạc bộ nào? Tại sao?",
       "py": "Shàngmiàn de shètuán, nǐ xiǎng cānjiā nǎ yígè? Wèishénme?"
      },
      {
       "hz": "如果沒有你想參加的社團，你想參加什麼社團，為什麼？",
       "vi": "Nếu không có câu lạc bộ bạn muốn tham gia, bạn muốn tham gia câu lạc bộ gì, tại sao?",
       "py": "Rúguǒ méiyǒu nǐ xiǎng cānjiā de shètuán, nǐ xiǎng cānjiā shénme shètuán, wèishénme?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "說明：請學生說一說參加社團的經驗、有什麼收穫。",
       "vi": "Hướng dẫn: Mời học sinh kể về kinh nghiệm tham gia câu lạc bộ và những điều thu hoạch được.",
       "py": "Shuōmíng: Qǐng xuéshēng shuōyìshuō cānjiā shètuán de jīngyàn, yǒu shénme shōuhuò."
      },
      {
       "hz": "參加社團好不好？",
       "vi": "Tham gia câu lạc bộ có tốt không?",
       "py": "Cānjiā shètuán hǎobùhǎo?"
      },
      {
       "hz": "你參加過什麼社團？參加這個社團讓你有收穫嗎？",
       "vi": "Bạn đã tham gia câu lạc bộ nào? Tham gia câu lạc bộ đó có giúp bạn thu hoạch được gì không?",
       "py": "Nǐ cānjiā guò shénme shètuán? Cānjiā zhège shètuán ràng nǐ yǒu shōuhuò ma?"
      },
      {
       "hz": "你覺得學生應該參加社團嗎？為什麼？",
       "vi": "Bạn thấy học sinh có nên tham gia câu lạc bộ không? Tại sao?",
       "py": "Nǐ juéde xuéshēng yīnggāi cānjiā shètuán ma? Wèishénme?"
      },
      {
       "hz": "你想學生可以花多少時間參加社團？為什麼？",
       "vi": "Bạn nghĩ học sinh có thể dành bao nhiêu thời gian cho câu lạc bộ? Tại sao?",
       "py": "Nǐ xiǎng xuéshēng kěyǐ huā duōshǎo shíjiān cānjiā shètuán? Wèishénme?"
      },
      {
       "hz": "請你問一問同學，參加社團有哪些好處？有沒有壞處？",
       "vi": "Hãy hỏi các bạn cùng lớp xem tham gia câu lạc bộ có những lợi ích gì? Có tác hại gì không?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, cānjiā shètuán yǒu nǎxiē hǎochù? Yǒuméiyǒu huàichù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… (不)感興趣 — (không) thấy hứng thú",
   "giaiThich": "Dùng để nói mình quan tâm, muốn tìm hiểu thêm về điều gì đó — hoặc ngược lại."
  }
 ],
 "td2-11.2": [
  {
   "title": "II. 對······(不)感興趣 to be interested in…",
   "points": [
    {
     "label": null,
     "formula": "“感興趣” is used to show the subject’s interests and willingness to have further Are you interested in the following activities? Why? Please answer the question with “ 對······(不) 感興趣 ”. The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來” means to come up with (an idea). The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來”means to come up with (an idea). Use the pattern “V 出來 ( V不出來 / V出得來 / 沒 V 出來 / V出來了 )” to rewrite the sentences. “ 嘛 ” is used to take a pause in a sentence when the speaker is thinking about what to say next about the topic mentioned . Use ”嘛 ”to finish the conversations. The pattern “ 同+一+M ” is used to describe different subjects having the same situation, and this can be the same object, time and location, etc…. In Chinese, the word “等”has two functions. Firstly, it can be placed before a number that marks the total of items mentioned, or before a word that is the hypernym (category) for the items mentioned. On the other hand, it can be used at the end of a list to show there are still a lot of examples of the same kind. 從......中      ( to get / benefit / understand… )  from… In this pattern, “中” means “inside” instead of “middle”. The pattern “從⋯⋯中” indicates someone learns about a situation, deals with something, or gets benefits",
     "examples": [
      {
       "hz": "白小姐很愛化妝，對現在最流行的化妝品很感興趣。2. 我喜歡幫助別人，所以對去醫院服務的事非常感興趣。3. 林先生很喜歡張小姐，可是張小姐對他一點兒都不感興趣。",
       "vi": "Cô Bạch rất thích trang điểm, rất hứng thú với các loại mỹ phẩm thịnh hành nhất hiện nay. Tôi thích giúp đỡ người khác, nên rất hứng thú với việc làm tình nguyện ở bệnh viện. Anh Lâm rất thích cô Trương, nhưng cô Trương chẳng hứng thú gì với anh ấy cả.",
       "py": "Bái xiǎojiě hěn ài huàzhuāng, duì xiànzài zuì liúxíng de huàzhuāngpǐn hěngǎnxìngqù. 2. Wǒ xǐhuān bāngzhù biérén, suǒyǐ duì qù yīyuàn fúwù de shì fēicháng gǎnxìngqù. 3. Lín xiānshēng hěn xǐhuān Zhāng xiǎojiě, kěshì Zhāng xiǎojiě duì tā yìdiǎn'ér dōu bùgǎnxìngqù."
      },
      {
       "hz": "你對下面這些事感興趣嗎？為什麼？請用「對······感興趣」或「對······不感興趣」回答。",
       "vi": "Bạn có hứng thú với những việc dưới đây không? Tại sao? Hãy trả lời bằng “對……感興趣” hoặc “對……不感興趣”.",
       "py": "Nǐ duì xiàmiàn zhèxiē shì gǎnxìngqù ma? Wèishénme? Qǐng yòng “duì · · · · · · gǎnxìngqù” huò “duì · · · · · · bùgǎnxìngqù” huídá."
      },
      {
       "hz": "中國功夫電影便利商店辦的新活動最流行的手機APP坐火車到花蓮去旅行參加聖誕舞會到很多地方吃喝玩樂學怎麼做臭豆腐到健身房健身",
       "vi": "Phim kung fu Trung Quốc · Hoạt động mới của cửa hàng tiện lợi · Ứng dụng điện thoại thịnh hành nhất · Đi tàu hoả đến Hoa Liên du lịch · Dự tiệc nhảy Giáng sinh · Đi ăn chơi ở nhiều nơi · Học làm đậu phụ thối · Đến phòng gym tập luyện",
       "py": "Zhōngguó gōngfu diànyǐng biànlìshāngdiàn bàn de xīn huódòng zuì liúxíng de shǒujī APP zuòhuǒchē dào Huālián qù lǚxíng cānjiā shèngdàn wǔhuì dào hěnduō dìfāng chīhēwánlè xué zěnme zuò chòudòufǔ dào jiànshēnfáng jiànshēn"
      },
      {
       "hz": "到底是誰打電話給我的？他的聲音，你聽不出來嗎？2. 他上班又遲到了，讓老闆很生氣，大家都看得出來。",
       "vi": "Rốt cuộc ai đã gọi điện cho tôi? Giọng người đó bạn không nghe ra à? Anh ấy lại đi làm muộn, khiến ông chủ rất tức giận, ai cũng nhận ra.",
       "py": "Dàodǐ shì shéi dǎdiànhuà gěi wǒ de? Tā de shēngyīn, nǐ tīngbùchūlái ma? 2. Tā shàngbān yòu chídào le, ràng lǎobǎn hěn shēngqì, dàjiā dōu kàndechūlái."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：這是什麼茶，你們喝得出來喝不出來？ B：我一喝就喝出來了！這是紅茶。 C：真厲害！我還是喝不出來。4. 這句義大利文的中文翻譯很難，我想了很久，才想出來怎麼翻譯。",
       "vi": "A: Đây là trà gì, các bạn có uống ra không? B: Tôi vừa uống là nhận ra ngay! Đây là hồng trà. C: Giỏi thật! Tôi vẫn không nhận ra. Câu tiếng Ý này dịch sang tiếng Trung rất khó, tôi nghĩ rất lâu mới nghĩ ra cách dịch.",
       "py": "A: Zhè shì shénme chá, nǐmen hē de chūlái hē bù chūlái? B: Wǒ yì hē jiù hē chūlái le! Zhè shì hóngchá. C: Zhēn lìhài! Wǒ háishì hē bù chūlái. 4. Zhè jù yìdàlìwén de zhōngwénfānyì hěn nán, wǒ xiǎng le hěn jiǔ, cái xiǎng chūlái zěnme fānyì."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：你看那位小姐，你知道她幾歲嗎？",
       "vi": "A: Bạn nhìn cô gái kia xem, bạn biết cô ấy bao nhiêu tuổi không?",
       "py": "A: Nǐ kàn nàwèi xiǎojiě, nǐ zhīdào tā jǐsuì ma?"
      },
      {
       "hz": "A：這是義大利菜，裡面放了一點兒酒。",
       "vi": "A: Đây là món Ý, bên trong có cho một chút rượu.",
       "py": "A: Zhè shì yìdàlì cài, lǐmiàn fàng le yìdiǎn'ér jiǔ."
      },
      {
       "hz": "B：真的嗎？我 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Thật à? Tôi ….",
       "py": "B: Zhēnde ma? Wǒ ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這瓶香水是什麼味道？你聞聞看。",
       "vi": "A: Lọ nước hoa này mùi gì? Bạn ngửi thử xem.",
       "py": "A: Zhè píng xiāngshuǐ shì shénme wèidào? Nǐ wénwénkàn."
      },
      {
       "hz": "A：昨天教授問我們的那個數學問題，我覺得好難喔!",
       "vi": "A: Bài toán giáo sư hỏi chúng ta hôm qua, tôi thấy khó quá!",
       "py": "A: Zuótiān jiàoshòu wèn wǒmen de nàge shùxué wèntí, wǒ juéde hǎo nán ō!"
      },
      {
       "hz": "B：是真的很難，我想了很久，還是ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Đúng là rất khó, tôi nghĩ rất lâu mà vẫn ….",
       "py": "B: Shì zhēnde hěn nán, wǒ xiǎng le hěn jiǔ, háishì ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你喜歡看什麼電視節目？影集還是連續劇？ B：我喜歡看影集，連續劇嘛······我真的不感興趣。2. A：要不要一起去夜市？我想試試臭豆腐。 B：我也想去夜市，可是臭豆腐嘛······你自己吃就好。3. A：美國歷史這門課的考試，你考得怎麼樣？ B：筆試考得不錯，口試嘛······我聽不懂問題，所以說得不好。",
       "vi": "A: Bạn thích xem chương trình tivi gì? Phim bộ ngắn tập hay phim truyền hình dài tập? B: Tôi thích xem phim bộ ngắn tập, còn phim dài tập thì… tôi thật sự không hứng thú. A: Có muốn đi chợ đêm cùng không? Tôi muốn thử đậu phụ thối. B: Tôi cũng muốn đi chợ đêm, nhưng đậu phụ thối thì… bạn tự ăn là được rồi. A: Bài thi môn Lịch sử Mỹ, bạn làm thế nào? B: Thi viết thì khá, còn thi nói thì… tôi nghe không hiểu câu hỏi nên nói không tốt.",
       "py": "A: Nǐ xǐhuān kàn shénme diànshìjiémù? Yǐngjí háishì liánxùjù? B: Wǒ xǐhuān kàn yǐngjí, liánxùjù ma · · · · · · wǒ zhēnde bùgǎnxìngqù. 2. A: Yào búyào yìqǐ qù yèshì? Wǒ xiǎng shìshì chòudòufǔ. B: Wǒ yě xiǎng qù yèshì, kěshì chòudòufǔ ma · · · · · · nǐ zìjǐ chī jiù hǎo. 3. A: Měiguó lìshǐ zhè mén kè de kǎoshì, nǐ kǎo de zěnmeyàng? B: Bǐshì kǎo de búcuò, kǒushì ma · · · · · · wǒ tīngbùdǒng wèntí, suǒyǐ shuō de bùhǎo."
      },
      {
       "hz": "美心：你在台灣的生活都習慣了嗎？",
       "vi": "Mỹ Tâm: Bạn đã quen với cuộc sống ở Đài Loan chưa?",
       "py": "Měixīn: Nǐ zài Táiwān de shēnghuó dōu xíguàn le ma?"
      },
      {
       "hz": "良介：大部分都習慣了，ˍˍˍˍˍˍ嘛······ˍˍˍˍˍ。",
       "vi": "Ryosuke: Phần lớn đã quen rồi, … thì… ….",
       "py": "Liángjiè: Dàbùfèn dōu xíguàn le, ˍˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：運動和藝術活動，你喜歡哪一種？",
       "vi": "A: Thể thao và nghệ thuật, bạn thích loại nào?",
       "py": "A: Yùndòng hàn yìshù huódòng, nǐ xǐhuān nǎ yìzhǒng?"
      },
      {
       "hz": "B：我喜歡 ˍˍˍˍˍ， ˍˍˍˍˍ嘛······ ˍˍˍˍˍ 。",
       "vi": "B: Tôi thích …, … thì… ….",
       "py": "B: Wǒ xǐhuān ˍˍˍˍˍ, ˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：這個學期，你想參加哪一類的社團？",
       "vi": "A: Học kỳ này bạn muốn tham gia câu lạc bộ loại nào?",
       "py": "A: Zhège xuéqí, nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "我跟妹妹都喜歡喝同一種飲料。2. 他們兩個人是鄰居，住在同一棟公寓。3. 這個學期，我弟弟跟良介在同一班上英文作文課。",
       "vi": "Tôi và em gái đều thích uống cùng một loại đồ uống. Hai người họ là hàng xóm, sống cùng một toà chung cư. Học kỳ này em trai tôi và Ryosuke học cùng một lớp viết văn tiếng Anh.",
       "py": "Wǒ gēn mèimei dōu xǐhuān hē tóng yìzhǒng yǐnliào. 2. Tāmen liǎnggè rén shì línjū, zhù zài tóng yídòng gōngyù. 3. Zhège xuéqí, wǒ dìdi gēn Liángjiè zài tóngyì bānshàng yīngwén zuòwénkè."
      },
      {
       "hz": "我們的衣服都是在一樣的服裝店買的。",
       "vi": "Quần áo của chúng tôi đều mua ở cùng một cửa hàng thời trang.",
       "py": "Wǒmen de yīfú dōu shì zài yíyàng de fúzhuāngdiàn mǎi de."
      },
      {
       "hz": "我的中文老師是林老師。莫以凡的中文老師也是林老師。",
       "vi": "Cô giáo tiếng Trung của tôi là cô Lâm. Cô giáo tiếng Trung của Mạc Dĩ Phàm cũng là cô Lâm.",
       "py": "Wǒ de zhōngwén lǎoshī shì Lín lǎoshī. Mòyǐfán de zhōngwén lǎoshī yě shì Lín lǎoshī."
      },
      {
       "hz": "我妹妹的生日是3月8日，我的好朋友也是3月8日出生的。",
       "vi": "Sinh nhật em gái tôi là ngày 8 tháng 3, bạn thân của tôi cũng sinh ngày 8 tháng 3.",
       "py": "Wǒ mèimei de shēngrì shì 3 yuè 8 rì, wǒ de hǎo péngyǒu yě shì 3 yuè 8 rì chūshēng de."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 同 + 一 + M (+N).",
       "vi": "Viết lại câu bằng mẫu 同 + 一 + lượng từ (+ danh từ).",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u tóng + yī + M (+ N)."
      },
      {
       "hz": "愛心服務社多久做一次愛心服務？他們什麼時候做？",
       "vi": "Câu lạc bộ Thiện Nguyện bao lâu làm từ thiện một lần? Họ làm vào lúc nào?",
       "py": "Àixīn fúwùshè duōjiǔ zuò yícì àixīn fúwù? Tāmen shénme shíhòu zuò?"
      },
      {
       "hz": "在老人安養院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở viện dưỡng lão có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài lǎorén ānyǎngyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在育幼院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở trại trẻ mồ côi có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yùyòuyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在醫院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở bệnh viện có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yīyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "良介覺得愛心服務的經驗怎麼樣？",
       "vi": "Ryosuke thấy trải nghiệm làm thiện nguyện thế nào?",
       "py": "Liángjiè juéde àixīn fúwù de jīngyàn zěnmeyàng?"
      },
      {
       "hz": "參加愛心服務社以前，良介是個怎麼樣的人？",
       "vi": "Trước khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke là người thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐqián, Liángjiè shì gè zěnmeyàng de rén?"
      },
      {
       "hz": "參加愛心服務社以後，良介有了什麼改變？",
       "vi": "Sau khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke đã thay đổi thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐhòu, Liángjiè yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你同意良介的想法嗎？為什麼？",
       "vi": "Đọc xong bài văn, bạn có đồng ý với suy nghĩ của Ryosuke không? Tại sao?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ tóngyì Liángjiè de xiǎngfǎ ma? Wèishénme?"
      },
      {
       "hz": "請在這裡寫下你的姓名、國家、出生日期等資料。2. 我哥哥喜愛旅遊，他去過日本、英國、法國等三個國家。3. 學校的社團像鋼琴社、吉他社、書法社等，都有很多社員。",
       "vi": "Hãy ghi họ tên, quốc tịch, ngày sinh v.v. của bạn vào đây. Anh trai tôi rất thích du lịch, đã đi Nhật, Anh, Pháp — ba nước. Các câu lạc bộ trong trường như câu lạc bộ piano, guitar, thư pháp v.v. đều có rất nhiều thành viên.",
       "py": "Qǐng zài zhèlǐ xiěxià nǐ de xìngmíng, guójiā, chūshēngrìqí děng zīliào. 2. Wǒ gēge xǐ'ài lǚyóu, tā qùguò Rìběn, Yīngguó, Fǎguó děng sāngè guójiā. 3. Xuéxiào de shètuán xiàng gāngqín shè, jítāshè, shūfǎ shè děng, dōu yǒu hěnduō shèyuán."
      },
      {
       "hz": "A：你吃過哪些台灣小吃？",
       "vi": "A: Bạn đã ăn những món ăn vặt Đài Loan nào?",
       "py": "A: Nǐ chī guò nǎxiē Táiwān xiǎochī?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，我都吃過。",
       "vi": "B: …, tôi đều ăn rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ dōu chī guò."
      },
      {
       "hz": "A：你有哪些國家的朋友？",
       "vi": "A: Bạn có bạn bè ở những nước nào?",
       "py": "A: Nǐ yǒu nǎxiē guójiā de péngyǒu?"
      },
      {
       "hz": "A：我們週末要去阿里山爬山，要準備哪些東西呢？",
       "vi": "A: Cuối tuần chúng ta đi leo núi A Lý Sơn, cần chuẩn bị những gì?",
       "py": "A: Wǒmen zhōumò yào qù ālǐshān páshān, yào zhǔnbèi nǎxiē dōngxī ne?"
      },
      {
       "hz": "醫生從檢查報告中了解病人的情況。2. 我們可以從生活中得到不少寶貴的經驗。3. 從他說的這些話中，我聽不出來他是高興還是難過。",
       "vi": "Bác sĩ nắm được tình trạng bệnh nhân qua kết quả xét nghiệm. Chúng ta có thể học được nhiều kinh nghiệm quý báu từ cuộc sống. Qua những lời anh ấy nói, tôi không nghe ra anh ấy vui hay buồn.",
       "py": "Yīshēng cóng jiǎnchábàogào zhōng liǎojiě bìngrén de qíngkuàng. 2. Wǒmen kěyǐ cóng shēnghuó zhōng dédào bùshǎo bǎoguì de jīngyàn. 3. Cóng tā shuō de zhèxiē huà zhōng, wǒ tīngbùchūlái tā shì gāoxìng háishì nánguò."
      },
      {
       "hz": "考試的成績可以讓老師知道學生學得怎麼樣。",
       "vi": "Kết quả thi giúp thầy giáo biết học sinh học thế nào.",
       "py": "Kǎoshì de chéngjì kěyǐ ràng lǎoshī zhīdào xuéshēng xué de zěnmeyàng."
      },
      {
       "hz": "我從參加社團的經驗裡，學到了不少處理事情的方法。",
       "vi": "Từ kinh nghiệm tham gia câu lạc bộ, tôi đã học được nhiều cách xử lý công việc.",
       "py": "Wǒ cóng cānjiā shètuán de jīngyàn lǐ, xuédào le bùshǎo chǔlǐ shìqíng de fāngfǎ."
      },
      {
       "hz": "老師選了幾個華語中心的學生，去參加用中文說故事的比賽。",
       "vi": "Thầy giáo chọn vài học sinh của Trung tâm Hoa ngữ đi thi kể chuyện bằng tiếng Trung.",
       "py": "Lǎoshī xuǎn le jǐgè huáyǔ zhōngxīn de xuéshēng, qù cānjiā yòng zhōngwén shuō gùshì de bǐsài."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 從…中.",
       "vi": "Viết lại câu bằng mẫu 從…中.",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u cóng… zhōng."
      },
      {
       "hz": "上面的社團，你想參加哪一個？為什麼？",
       "vi": "Trong các câu lạc bộ trên, bạn muốn tham gia câu lạc bộ nào? Tại sao?",
       "py": "Shàngmiàn de shètuán, nǐ xiǎng cānjiā nǎ yígè? Wèishénme?"
      },
      {
       "hz": "如果沒有你想參加的社團，你想參加什麼社團，為什麼？",
       "vi": "Nếu không có câu lạc bộ bạn muốn tham gia, bạn muốn tham gia câu lạc bộ gì, tại sao?",
       "py": "Rúguǒ méiyǒu nǐ xiǎng cānjiā de shètuán, nǐ xiǎng cānjiā shénme shètuán, wèishénme?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "說明：請學生說一說參加社團的經驗、有什麼收穫。",
       "vi": "Hướng dẫn: Mời học sinh kể về kinh nghiệm tham gia câu lạc bộ và những điều thu hoạch được.",
       "py": "Shuōmíng: Qǐng xuéshēng shuōyìshuō cānjiā shètuán de jīngyàn, yǒu shénme shōuhuò."
      },
      {
       "hz": "參加社團好不好？",
       "vi": "Tham gia câu lạc bộ có tốt không?",
       "py": "Cānjiā shètuán hǎobùhǎo?"
      },
      {
       "hz": "你參加過什麼社團？參加這個社團讓你有收穫嗎？",
       "vi": "Bạn đã tham gia câu lạc bộ nào? Tham gia câu lạc bộ đó có giúp bạn thu hoạch được gì không?",
       "py": "Nǐ cānjiā guò shénme shètuán? Cānjiā zhège shètuán ràng nǐ yǒu shōuhuò ma?"
      },
      {
       "hz": "你覺得學生應該參加社團嗎？為什麼？",
       "vi": "Bạn thấy học sinh có nên tham gia câu lạc bộ không? Tại sao?",
       "py": "Nǐ juéde xuéshēng yīnggāi cānjiā shètuán ma? Wèishénme?"
      },
      {
       "hz": "你想學生可以花多少時間參加社團？為什麼？",
       "vi": "Bạn nghĩ học sinh có thể dành bao nhiêu thời gian cho câu lạc bộ? Tại sao?",
       "py": "Nǐ xiǎng xuéshēng kěyǐ huā duōshǎo shíjiān cānjiā shètuán? Wèishénme?"
      },
      {
       "hz": "請你問一問同學，參加社團有哪些好處？有沒有壞處？",
       "vi": "Hãy hỏi các bạn cùng lớp xem tham gia câu lạc bộ có những lợi ích gì? Có tác hại gì không?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, cānjiā shètuán yǒu nǎxiē hǎochù? Yǒuméiyǒu huàichù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… (不)感興趣 — (không) thấy hứng thú",
   "giaiThich": "Dùng để nói mình quan tâm, muốn tìm hiểu thêm về điều gì đó — hoặc ngược lại."
  }
 ],
 "td2-11.3": [
  {
   "title": "II. 對······(不)感興趣 to be interested in…",
   "points": [
    {
     "label": null,
     "formula": "“感興趣” is used to show the subject’s interests and willingness to have further Are you interested in the following activities? Why? Please answer the question with “ 對······(不) 感興趣 ”. The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來” means to come up with (an idea). The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來”means to come up with (an idea). Use the pattern “V 出來 ( V不出來 / V出得來 / 沒 V 出來 / V出來了 )” to rewrite the sentences. “ 嘛 ” is used to take a pause in a sentence when the speaker is thinking about what to say next about the topic mentioned . Use ”嘛 ”to finish the conversations. The pattern “ 同+一+M ” is used to describe different subjects having the same situation, and this can be the same object, time and location, etc…. In Chinese, the word “等”has two functions. Firstly, it can be placed before a number that marks the total of items mentioned, or before a word that is the hypernym (category) for the items mentioned. On the other hand, it can be used at the end of a list to show there are still a lot of examples of the same kind. 從......中      ( to get / benefit / understand… )  from… In this pattern, “中” means “inside” instead of “middle”. The pattern “從⋯⋯中” indicates someone learns about a situation, deals with something, or gets benefits",
     "examples": [
      {
       "hz": "白小姐很愛化妝，對現在最流行的化妝品很感興趣。2. 我喜歡幫助別人，所以對去醫院服務的事非常感興趣。3. 林先生很喜歡張小姐，可是張小姐對他一點兒都不感興趣。",
       "vi": "Cô Bạch rất thích trang điểm, rất hứng thú với các loại mỹ phẩm thịnh hành nhất hiện nay. Tôi thích giúp đỡ người khác, nên rất hứng thú với việc làm tình nguyện ở bệnh viện. Anh Lâm rất thích cô Trương, nhưng cô Trương chẳng hứng thú gì với anh ấy cả.",
       "py": "Bái xiǎojiě hěn ài huàzhuāng, duì xiànzài zuì liúxíng de huàzhuāngpǐn hěngǎnxìngqù. 2. Wǒ xǐhuān bāngzhù biérén, suǒyǐ duì qù yīyuàn fúwù de shì fēicháng gǎnxìngqù. 3. Lín xiānshēng hěn xǐhuān Zhāng xiǎojiě, kěshì Zhāng xiǎojiě duì tā yìdiǎn'ér dōu bùgǎnxìngqù."
      },
      {
       "hz": "你對下面這些事感興趣嗎？為什麼？請用「對······感興趣」或「對······不感興趣」回答。",
       "vi": "Bạn có hứng thú với những việc dưới đây không? Tại sao? Hãy trả lời bằng “對……感興趣” hoặc “對……不感興趣”.",
       "py": "Nǐ duì xiàmiàn zhèxiē shì gǎnxìngqù ma? Wèishénme? Qǐng yòng “duì · · · · · · gǎnxìngqù” huò “duì · · · · · · bùgǎnxìngqù” huídá."
      },
      {
       "hz": "中國功夫電影便利商店辦的新活動最流行的手機APP坐火車到花蓮去旅行參加聖誕舞會到很多地方吃喝玩樂學怎麼做臭豆腐到健身房健身",
       "vi": "Phim kung fu Trung Quốc · Hoạt động mới của cửa hàng tiện lợi · Ứng dụng điện thoại thịnh hành nhất · Đi tàu hoả đến Hoa Liên du lịch · Dự tiệc nhảy Giáng sinh · Đi ăn chơi ở nhiều nơi · Học làm đậu phụ thối · Đến phòng gym tập luyện",
       "py": "Zhōngguó gōngfu diànyǐng biànlìshāngdiàn bàn de xīn huódòng zuì liúxíng de shǒujī APP zuòhuǒchē dào Huālián qù lǚxíng cānjiā shèngdàn wǔhuì dào hěnduō dìfāng chīhēwánlè xué zěnme zuò chòudòufǔ dào jiànshēnfáng jiànshēn"
      },
      {
       "hz": "到底是誰打電話給我的？他的聲音，你聽不出來嗎？2. 他上班又遲到了，讓老闆很生氣，大家都看得出來。",
       "vi": "Rốt cuộc ai đã gọi điện cho tôi? Giọng người đó bạn không nghe ra à? Anh ấy lại đi làm muộn, khiến ông chủ rất tức giận, ai cũng nhận ra.",
       "py": "Dàodǐ shì shéi dǎdiànhuà gěi wǒ de? Tā de shēngyīn, nǐ tīngbùchūlái ma? 2. Tā shàngbān yòu chídào le, ràng lǎobǎn hěn shēngqì, dàjiā dōu kàndechūlái."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：這是什麼茶，你們喝得出來喝不出來？ B：我一喝就喝出來了！這是紅茶。 C：真厲害！我還是喝不出來。4. 這句義大利文的中文翻譯很難，我想了很久，才想出來怎麼翻譯。",
       "vi": "A: Đây là trà gì, các bạn có uống ra không? B: Tôi vừa uống là nhận ra ngay! Đây là hồng trà. C: Giỏi thật! Tôi vẫn không nhận ra. Câu tiếng Ý này dịch sang tiếng Trung rất khó, tôi nghĩ rất lâu mới nghĩ ra cách dịch.",
       "py": "A: Zhè shì shénme chá, nǐmen hē de chūlái hē bù chūlái? B: Wǒ yì hē jiù hē chūlái le! Zhè shì hóngchá. C: Zhēn lìhài! Wǒ háishì hē bù chūlái. 4. Zhè jù yìdàlìwén de zhōngwénfānyì hěn nán, wǒ xiǎng le hěn jiǔ, cái xiǎng chūlái zěnme fānyì."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：你看那位小姐，你知道她幾歲嗎？",
       "vi": "A: Bạn nhìn cô gái kia xem, bạn biết cô ấy bao nhiêu tuổi không?",
       "py": "A: Nǐ kàn nàwèi xiǎojiě, nǐ zhīdào tā jǐsuì ma?"
      },
      {
       "hz": "A：這是義大利菜，裡面放了一點兒酒。",
       "vi": "A: Đây là món Ý, bên trong có cho một chút rượu.",
       "py": "A: Zhè shì yìdàlì cài, lǐmiàn fàng le yìdiǎn'ér jiǔ."
      },
      {
       "hz": "B：真的嗎？我 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Thật à? Tôi ….",
       "py": "B: Zhēnde ma? Wǒ ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這瓶香水是什麼味道？你聞聞看。",
       "vi": "A: Lọ nước hoa này mùi gì? Bạn ngửi thử xem.",
       "py": "A: Zhè píng xiāngshuǐ shì shénme wèidào? Nǐ wénwénkàn."
      },
      {
       "hz": "A：昨天教授問我們的那個數學問題，我覺得好難喔!",
       "vi": "A: Bài toán giáo sư hỏi chúng ta hôm qua, tôi thấy khó quá!",
       "py": "A: Zuótiān jiàoshòu wèn wǒmen de nàge shùxué wèntí, wǒ juéde hǎo nán ō!"
      },
      {
       "hz": "B：是真的很難，我想了很久，還是ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Đúng là rất khó, tôi nghĩ rất lâu mà vẫn ….",
       "py": "B: Shì zhēnde hěn nán, wǒ xiǎng le hěn jiǔ, háishì ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你喜歡看什麼電視節目？影集還是連續劇？ B：我喜歡看影集，連續劇嘛······我真的不感興趣。2. A：要不要一起去夜市？我想試試臭豆腐。 B：我也想去夜市，可是臭豆腐嘛······你自己吃就好。3. A：美國歷史這門課的考試，你考得怎麼樣？ B：筆試考得不錯，口試嘛······我聽不懂問題，所以說得不好。",
       "vi": "A: Bạn thích xem chương trình tivi gì? Phim bộ ngắn tập hay phim truyền hình dài tập? B: Tôi thích xem phim bộ ngắn tập, còn phim dài tập thì… tôi thật sự không hứng thú. A: Có muốn đi chợ đêm cùng không? Tôi muốn thử đậu phụ thối. B: Tôi cũng muốn đi chợ đêm, nhưng đậu phụ thối thì… bạn tự ăn là được rồi. A: Bài thi môn Lịch sử Mỹ, bạn làm thế nào? B: Thi viết thì khá, còn thi nói thì… tôi nghe không hiểu câu hỏi nên nói không tốt.",
       "py": "A: Nǐ xǐhuān kàn shénme diànshìjiémù? Yǐngjí háishì liánxùjù? B: Wǒ xǐhuān kàn yǐngjí, liánxùjù ma · · · · · · wǒ zhēnde bùgǎnxìngqù. 2. A: Yào búyào yìqǐ qù yèshì? Wǒ xiǎng shìshì chòudòufǔ. B: Wǒ yě xiǎng qù yèshì, kěshì chòudòufǔ ma · · · · · · nǐ zìjǐ chī jiù hǎo. 3. A: Měiguó lìshǐ zhè mén kè de kǎoshì, nǐ kǎo de zěnmeyàng? B: Bǐshì kǎo de búcuò, kǒushì ma · · · · · · wǒ tīngbùdǒng wèntí, suǒyǐ shuō de bùhǎo."
      },
      {
       "hz": "美心：你在台灣的生活都習慣了嗎？",
       "vi": "Mỹ Tâm: Bạn đã quen với cuộc sống ở Đài Loan chưa?",
       "py": "Měixīn: Nǐ zài Táiwān de shēnghuó dōu xíguàn le ma?"
      },
      {
       "hz": "良介：大部分都習慣了，ˍˍˍˍˍˍ嘛······ˍˍˍˍˍ。",
       "vi": "Ryosuke: Phần lớn đã quen rồi, … thì… ….",
       "py": "Liángjiè: Dàbùfèn dōu xíguàn le, ˍˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：運動和藝術活動，你喜歡哪一種？",
       "vi": "A: Thể thao và nghệ thuật, bạn thích loại nào?",
       "py": "A: Yùndòng hàn yìshù huódòng, nǐ xǐhuān nǎ yìzhǒng?"
      },
      {
       "hz": "B：我喜歡 ˍˍˍˍˍ， ˍˍˍˍˍ嘛······ ˍˍˍˍˍ 。",
       "vi": "B: Tôi thích …, … thì… ….",
       "py": "B: Wǒ xǐhuān ˍˍˍˍˍ, ˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：這個學期，你想參加哪一類的社團？",
       "vi": "A: Học kỳ này bạn muốn tham gia câu lạc bộ loại nào?",
       "py": "A: Zhège xuéqí, nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "我跟妹妹都喜歡喝同一種飲料。2. 他們兩個人是鄰居，住在同一棟公寓。3. 這個學期，我弟弟跟良介在同一班上英文作文課。",
       "vi": "Tôi và em gái đều thích uống cùng một loại đồ uống. Hai người họ là hàng xóm, sống cùng một toà chung cư. Học kỳ này em trai tôi và Ryosuke học cùng một lớp viết văn tiếng Anh.",
       "py": "Wǒ gēn mèimei dōu xǐhuān hē tóng yìzhǒng yǐnliào. 2. Tāmen liǎnggè rén shì línjū, zhù zài tóng yídòng gōngyù. 3. Zhège xuéqí, wǒ dìdi gēn Liángjiè zài tóngyì bānshàng yīngwén zuòwénkè."
      },
      {
       "hz": "我們的衣服都是在一樣的服裝店買的。",
       "vi": "Quần áo của chúng tôi đều mua ở cùng một cửa hàng thời trang.",
       "py": "Wǒmen de yīfú dōu shì zài yíyàng de fúzhuāngdiàn mǎi de."
      },
      {
       "hz": "我的中文老師是林老師。莫以凡的中文老師也是林老師。",
       "vi": "Cô giáo tiếng Trung của tôi là cô Lâm. Cô giáo tiếng Trung của Mạc Dĩ Phàm cũng là cô Lâm.",
       "py": "Wǒ de zhōngwén lǎoshī shì Lín lǎoshī. Mòyǐfán de zhōngwén lǎoshī yě shì Lín lǎoshī."
      },
      {
       "hz": "我妹妹的生日是3月8日，我的好朋友也是3月8日出生的。",
       "vi": "Sinh nhật em gái tôi là ngày 8 tháng 3, bạn thân của tôi cũng sinh ngày 8 tháng 3.",
       "py": "Wǒ mèimei de shēngrì shì 3 yuè 8 rì, wǒ de hǎo péngyǒu yě shì 3 yuè 8 rì chūshēng de."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 同 + 一 + M (+N).",
       "vi": "Viết lại câu bằng mẫu 同 + 一 + lượng từ (+ danh từ).",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u tóng + yī + M (+ N)."
      },
      {
       "hz": "愛心服務社多久做一次愛心服務？他們什麼時候做？",
       "vi": "Câu lạc bộ Thiện Nguyện bao lâu làm từ thiện một lần? Họ làm vào lúc nào?",
       "py": "Àixīn fúwùshè duōjiǔ zuò yícì àixīn fúwù? Tāmen shénme shíhòu zuò?"
      },
      {
       "hz": "在老人安養院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở viện dưỡng lão có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài lǎorén ānyǎngyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在育幼院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở trại trẻ mồ côi có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yùyòuyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在醫院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở bệnh viện có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yīyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "良介覺得愛心服務的經驗怎麼樣？",
       "vi": "Ryosuke thấy trải nghiệm làm thiện nguyện thế nào?",
       "py": "Liángjiè juéde àixīn fúwù de jīngyàn zěnmeyàng?"
      },
      {
       "hz": "參加愛心服務社以前，良介是個怎麼樣的人？",
       "vi": "Trước khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke là người thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐqián, Liángjiè shì gè zěnmeyàng de rén?"
      },
      {
       "hz": "參加愛心服務社以後，良介有了什麼改變？",
       "vi": "Sau khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke đã thay đổi thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐhòu, Liángjiè yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你同意良介的想法嗎？為什麼？",
       "vi": "Đọc xong bài văn, bạn có đồng ý với suy nghĩ của Ryosuke không? Tại sao?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ tóngyì Liángjiè de xiǎngfǎ ma? Wèishénme?"
      },
      {
       "hz": "請在這裡寫下你的姓名、國家、出生日期等資料。2. 我哥哥喜愛旅遊，他去過日本、英國、法國等三個國家。3. 學校的社團像鋼琴社、吉他社、書法社等，都有很多社員。",
       "vi": "Hãy ghi họ tên, quốc tịch, ngày sinh v.v. của bạn vào đây. Anh trai tôi rất thích du lịch, đã đi Nhật, Anh, Pháp — ba nước. Các câu lạc bộ trong trường như câu lạc bộ piano, guitar, thư pháp v.v. đều có rất nhiều thành viên.",
       "py": "Qǐng zài zhèlǐ xiěxià nǐ de xìngmíng, guójiā, chūshēngrìqí děng zīliào. 2. Wǒ gēge xǐ'ài lǚyóu, tā qùguò Rìběn, Yīngguó, Fǎguó děng sāngè guójiā. 3. Xuéxiào de shètuán xiàng gāngqín shè, jítāshè, shūfǎ shè děng, dōu yǒu hěnduō shèyuán."
      },
      {
       "hz": "A：你吃過哪些台灣小吃？",
       "vi": "A: Bạn đã ăn những món ăn vặt Đài Loan nào?",
       "py": "A: Nǐ chī guò nǎxiē Táiwān xiǎochī?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，我都吃過。",
       "vi": "B: …, tôi đều ăn rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ dōu chī guò."
      },
      {
       "hz": "A：你有哪些國家的朋友？",
       "vi": "A: Bạn có bạn bè ở những nước nào?",
       "py": "A: Nǐ yǒu nǎxiē guójiā de péngyǒu?"
      },
      {
       "hz": "A：我們週末要去阿里山爬山，要準備哪些東西呢？",
       "vi": "A: Cuối tuần chúng ta đi leo núi A Lý Sơn, cần chuẩn bị những gì?",
       "py": "A: Wǒmen zhōumò yào qù ālǐshān páshān, yào zhǔnbèi nǎxiē dōngxī ne?"
      },
      {
       "hz": "醫生從檢查報告中了解病人的情況。2. 我們可以從生活中得到不少寶貴的經驗。3. 從他說的這些話中，我聽不出來他是高興還是難過。",
       "vi": "Bác sĩ nắm được tình trạng bệnh nhân qua kết quả xét nghiệm. Chúng ta có thể học được nhiều kinh nghiệm quý báu từ cuộc sống. Qua những lời anh ấy nói, tôi không nghe ra anh ấy vui hay buồn.",
       "py": "Yīshēng cóng jiǎnchábàogào zhōng liǎojiě bìngrén de qíngkuàng. 2. Wǒmen kěyǐ cóng shēnghuó zhōng dédào bùshǎo bǎoguì de jīngyàn. 3. Cóng tā shuō de zhèxiē huà zhōng, wǒ tīngbùchūlái tā shì gāoxìng háishì nánguò."
      },
      {
       "hz": "考試的成績可以讓老師知道學生學得怎麼樣。",
       "vi": "Kết quả thi giúp thầy giáo biết học sinh học thế nào.",
       "py": "Kǎoshì de chéngjì kěyǐ ràng lǎoshī zhīdào xuéshēng xué de zěnmeyàng."
      },
      {
       "hz": "我從參加社團的經驗裡，學到了不少處理事情的方法。",
       "vi": "Từ kinh nghiệm tham gia câu lạc bộ, tôi đã học được nhiều cách xử lý công việc.",
       "py": "Wǒ cóng cānjiā shètuán de jīngyàn lǐ, xuédào le bùshǎo chǔlǐ shìqíng de fāngfǎ."
      },
      {
       "hz": "老師選了幾個華語中心的學生，去參加用中文說故事的比賽。",
       "vi": "Thầy giáo chọn vài học sinh của Trung tâm Hoa ngữ đi thi kể chuyện bằng tiếng Trung.",
       "py": "Lǎoshī xuǎn le jǐgè huáyǔ zhōngxīn de xuéshēng, qù cānjiā yòng zhōngwén shuō gùshì de bǐsài."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 從…中.",
       "vi": "Viết lại câu bằng mẫu 從…中.",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u cóng… zhōng."
      },
      {
       "hz": "上面的社團，你想參加哪一個？為什麼？",
       "vi": "Trong các câu lạc bộ trên, bạn muốn tham gia câu lạc bộ nào? Tại sao?",
       "py": "Shàngmiàn de shètuán, nǐ xiǎng cānjiā nǎ yígè? Wèishénme?"
      },
      {
       "hz": "如果沒有你想參加的社團，你想參加什麼社團，為什麼？",
       "vi": "Nếu không có câu lạc bộ bạn muốn tham gia, bạn muốn tham gia câu lạc bộ gì, tại sao?",
       "py": "Rúguǒ méiyǒu nǐ xiǎng cānjiā de shètuán, nǐ xiǎng cānjiā shénme shètuán, wèishénme?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "說明：請學生說一說參加社團的經驗、有什麼收穫。",
       "vi": "Hướng dẫn: Mời học sinh kể về kinh nghiệm tham gia câu lạc bộ và những điều thu hoạch được.",
       "py": "Shuōmíng: Qǐng xuéshēng shuōyìshuō cānjiā shètuán de jīngyàn, yǒu shénme shōuhuò."
      },
      {
       "hz": "參加社團好不好？",
       "vi": "Tham gia câu lạc bộ có tốt không?",
       "py": "Cānjiā shètuán hǎobùhǎo?"
      },
      {
       "hz": "你參加過什麼社團？參加這個社團讓你有收穫嗎？",
       "vi": "Bạn đã tham gia câu lạc bộ nào? Tham gia câu lạc bộ đó có giúp bạn thu hoạch được gì không?",
       "py": "Nǐ cānjiā guò shénme shètuán? Cānjiā zhège shètuán ràng nǐ yǒu shōuhuò ma?"
      },
      {
       "hz": "你覺得學生應該參加社團嗎？為什麼？",
       "vi": "Bạn thấy học sinh có nên tham gia câu lạc bộ không? Tại sao?",
       "py": "Nǐ juéde xuéshēng yīnggāi cānjiā shètuán ma? Wèishénme?"
      },
      {
       "hz": "你想學生可以花多少時間參加社團？為什麼？",
       "vi": "Bạn nghĩ học sinh có thể dành bao nhiêu thời gian cho câu lạc bộ? Tại sao?",
       "py": "Nǐ xiǎng xuéshēng kěyǐ huā duōshǎo shíjiān cānjiā shètuán? Wèishénme?"
      },
      {
       "hz": "請你問一問同學，參加社團有哪些好處？有沒有壞處？",
       "vi": "Hãy hỏi các bạn cùng lớp xem tham gia câu lạc bộ có những lợi ích gì? Có tác hại gì không?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, cānjiā shètuán yǒu nǎxiē hǎochù? Yǒuméiyǒu huàichù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… (不)感興趣 — (không) thấy hứng thú",
   "giaiThich": "Dùng để nói mình quan tâm, muốn tìm hiểu thêm về điều gì đó — hoặc ngược lại."
  }
 ],
 "td2-11.4": [
  {
   "title": "II. 對······(不)感興趣 to be interested in…",
   "points": [
    {
     "label": null,
     "formula": "“感興趣” is used to show the subject’s interests and willingness to have further Are you interested in the following activities? Why? Please answer the question with “ 對······(不) 感興趣 ”. The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來” means to come up with (an idea). The pattern “V出來” , when V is a sensory verb, such as “看”, “聽”, “吃”, “喝”, means to make out by seeing, hearing, eating and drinking, etc. It suggests whether one can realize or distinguish something by performing a certain sensory action. When the verb is “想” or executive verb, this pattern indicates a development from nothing. “想出來”means to come up with (an idea). Use the pattern “V 出來 ( V不出來 / V出得來 / 沒 V 出來 / V出來了 )” to rewrite the sentences. “ 嘛 ” is used to take a pause in a sentence when the speaker is thinking about what to say next about the topic mentioned . Use ”嘛 ”to finish the conversations. The pattern “ 同+一+M ” is used to describe different subjects having the same situation, and this can be the same object, time and location, etc…. In Chinese, the word “等”has two functions. Firstly, it can be placed before a number that marks the total of items mentioned, or before a word that is the hypernym (category) for the items mentioned. On the other hand, it can be used at the end of a list to show there are still a lot of examples of the same kind. 從......中      ( to get / benefit / understand… )  from… In this pattern, “中” means “inside” instead of “middle”. The pattern “從⋯⋯中” indicates someone learns about a situation, deals with something, or gets benefits",
     "examples": [
      {
       "hz": "白小姐很愛化妝，對現在最流行的化妝品很感興趣。2. 我喜歡幫助別人，所以對去醫院服務的事非常感興趣。3. 林先生很喜歡張小姐，可是張小姐對他一點兒都不感興趣。",
       "vi": "Cô Bạch rất thích trang điểm, rất hứng thú với các loại mỹ phẩm thịnh hành nhất hiện nay. Tôi thích giúp đỡ người khác, nên rất hứng thú với việc làm tình nguyện ở bệnh viện. Anh Lâm rất thích cô Trương, nhưng cô Trương chẳng hứng thú gì với anh ấy cả.",
       "py": "Bái xiǎojiě hěn ài huàzhuāng, duì xiànzài zuì liúxíng de huàzhuāngpǐn hěngǎnxìngqù. 2. Wǒ xǐhuān bāngzhù biérén, suǒyǐ duì qù yīyuàn fúwù de shì fēicháng gǎnxìngqù. 3. Lín xiānshēng hěn xǐhuān Zhāng xiǎojiě, kěshì Zhāng xiǎojiě duì tā yìdiǎn'ér dōu bùgǎnxìngqù."
      },
      {
       "hz": "你對下面這些事感興趣嗎？為什麼？請用「對······感興趣」或「對······不感興趣」回答。",
       "vi": "Bạn có hứng thú với những việc dưới đây không? Tại sao? Hãy trả lời bằng “對……感興趣” hoặc “對……不感興趣”.",
       "py": "Nǐ duì xiàmiàn zhèxiē shì gǎnxìngqù ma? Wèishénme? Qǐng yòng “duì · · · · · · gǎnxìngqù” huò “duì · · · · · · bùgǎnxìngqù” huídá."
      },
      {
       "hz": "中國功夫電影便利商店辦的新活動最流行的手機APP坐火車到花蓮去旅行參加聖誕舞會到很多地方吃喝玩樂學怎麼做臭豆腐到健身房健身",
       "vi": "Phim kung fu Trung Quốc · Hoạt động mới của cửa hàng tiện lợi · Ứng dụng điện thoại thịnh hành nhất · Đi tàu hoả đến Hoa Liên du lịch · Dự tiệc nhảy Giáng sinh · Đi ăn chơi ở nhiều nơi · Học làm đậu phụ thối · Đến phòng gym tập luyện",
       "py": "Zhōngguó gōngfu diànyǐng biànlìshāngdiàn bàn de xīn huódòng zuì liúxíng de shǒujī APP zuòhuǒchē dào Huālián qù lǚxíng cānjiā shèngdàn wǔhuì dào hěnduō dìfāng chīhēwánlè xué zěnme zuò chòudòufǔ dào jiànshēnfáng jiànshēn"
      },
      {
       "hz": "到底是誰打電話給我的？他的聲音，你聽不出來嗎？2. 他上班又遲到了，讓老闆很生氣，大家都看得出來。",
       "vi": "Rốt cuộc ai đã gọi điện cho tôi? Giọng người đó bạn không nghe ra à? Anh ấy lại đi làm muộn, khiến ông chủ rất tức giận, ai cũng nhận ra.",
       "py": "Dàodǐ shì shéi dǎdiànhuà gěi wǒ de? Tā de shēngyīn, nǐ tīngbùchūlái ma? 2. Tā shàngbān yòu chídào le, ràng lǎobǎn hěn shēngqì, dàjiā dōu kàndechūlái."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：這是什麼茶，你們喝得出來喝不出來？ B：我一喝就喝出來了！這是紅茶。 C：真厲害！我還是喝不出來。4. 這句義大利文的中文翻譯很難，我想了很久，才想出來怎麼翻譯。",
       "vi": "A: Đây là trà gì, các bạn có uống ra không? B: Tôi vừa uống là nhận ra ngay! Đây là hồng trà. C: Giỏi thật! Tôi vẫn không nhận ra. Câu tiếng Ý này dịch sang tiếng Trung rất khó, tôi nghĩ rất lâu mới nghĩ ra cách dịch.",
       "py": "A: Zhè shì shénme chá, nǐmen hē de chūlái hē bù chūlái? B: Wǒ yì hē jiù hē chūlái le! Zhè shì hóngchá. C: Zhēn lìhài! Wǒ háishì hē bù chūlái. 4. Zhè jù yìdàlìwén de zhōngwénfānyì hěn nán, wǒ xiǎng le hěn jiǔ, cái xiǎng chūlái zěnme fānyì."
      },
      {
       "hz": "III. V 出來: V出來了 / 沒 V 出來 / V得出來 / V不出來 — nghĩ ra, nhận ra được",
       "vi": "III. V 出來: V ra rồi / chưa V ra / V ra được / V không ra — nghĩ ra, nhận ra được",
       "py": "III. V chūlái: V chūlái le / méi V chūlái / V de chūlái / V bù chūlái— ngh ĩ ra, nh ậ n ra đ ư ợ c"
      },
      {
       "hz": "A：你看那位小姐，你知道她幾歲嗎？",
       "vi": "A: Bạn nhìn cô gái kia xem, bạn biết cô ấy bao nhiêu tuổi không?",
       "py": "A: Nǐ kàn nàwèi xiǎojiě, nǐ zhīdào tā jǐsuì ma?"
      },
      {
       "hz": "A：這是義大利菜，裡面放了一點兒酒。",
       "vi": "A: Đây là món Ý, bên trong có cho một chút rượu.",
       "py": "A: Zhè shì yìdàlì cài, lǐmiàn fàng le yìdiǎn'ér jiǔ."
      },
      {
       "hz": "B：真的嗎？我 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Thật à? Tôi ….",
       "py": "B: Zhēnde ma? Wǒ ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這瓶香水是什麼味道？你聞聞看。",
       "vi": "A: Lọ nước hoa này mùi gì? Bạn ngửi thử xem.",
       "py": "A: Zhè píng xiāngshuǐ shì shénme wèidào? Nǐ wénwénkàn."
      },
      {
       "hz": "A：昨天教授問我們的那個數學問題，我覺得好難喔!",
       "vi": "A: Bài toán giáo sư hỏi chúng ta hôm qua, tôi thấy khó quá!",
       "py": "A: Zuótiān jiàoshòu wèn wǒmen de nàge shùxué wèntí, wǒ juéde hǎo nán ō!"
      },
      {
       "hz": "B：是真的很難，我想了很久，還是ˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Đúng là rất khó, tôi nghĩ rất lâu mà vẫn ….",
       "py": "B: Shì zhēnde hěn nán, wǒ xiǎng le hěn jiǔ, háishì ˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：你喜歡看什麼電視節目？影集還是連續劇？ B：我喜歡看影集，連續劇嘛······我真的不感興趣。2. A：要不要一起去夜市？我想試試臭豆腐。 B：我也想去夜市，可是臭豆腐嘛······你自己吃就好。3. A：美國歷史這門課的考試，你考得怎麼樣？ B：筆試考得不錯，口試嘛······我聽不懂問題，所以說得不好。",
       "vi": "A: Bạn thích xem chương trình tivi gì? Phim bộ ngắn tập hay phim truyền hình dài tập? B: Tôi thích xem phim bộ ngắn tập, còn phim dài tập thì… tôi thật sự không hứng thú. A: Có muốn đi chợ đêm cùng không? Tôi muốn thử đậu phụ thối. B: Tôi cũng muốn đi chợ đêm, nhưng đậu phụ thối thì… bạn tự ăn là được rồi. A: Bài thi môn Lịch sử Mỹ, bạn làm thế nào? B: Thi viết thì khá, còn thi nói thì… tôi nghe không hiểu câu hỏi nên nói không tốt.",
       "py": "A: Nǐ xǐhuān kàn shénme diànshìjiémù? Yǐngjí háishì liánxùjù? B: Wǒ xǐhuān kàn yǐngjí, liánxùjù ma · · · · · · wǒ zhēnde bùgǎnxìngqù. 2. A: Yào búyào yìqǐ qù yèshì? Wǒ xiǎng shìshì chòudòufǔ. B: Wǒ yě xiǎng qù yèshì, kěshì chòudòufǔ ma · · · · · · nǐ zìjǐ chī jiù hǎo. 3. A: Měiguó lìshǐ zhè mén kè de kǎoshì, nǐ kǎo de zěnmeyàng? B: Bǐshì kǎo de búcuò, kǒushì ma · · · · · · wǒ tīngbùdǒng wèntí, suǒyǐ shuō de bùhǎo."
      },
      {
       "hz": "美心：你在台灣的生活都習慣了嗎？",
       "vi": "Mỹ Tâm: Bạn đã quen với cuộc sống ở Đài Loan chưa?",
       "py": "Měixīn: Nǐ zài Táiwān de shēnghuó dōu xíguàn le ma?"
      },
      {
       "hz": "良介：大部分都習慣了，ˍˍˍˍˍˍ嘛······ˍˍˍˍˍ。",
       "vi": "Ryosuke: Phần lớn đã quen rồi, … thì… ….",
       "py": "Liángjiè: Dàbùfèn dōu xíguàn le, ˍˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：運動和藝術活動，你喜歡哪一種？",
       "vi": "A: Thể thao và nghệ thuật, bạn thích loại nào?",
       "py": "A: Yùndòng hàn yìshù huódòng, nǐ xǐhuān nǎ yìzhǒng?"
      },
      {
       "hz": "B：我喜歡 ˍˍˍˍˍ， ˍˍˍˍˍ嘛······ ˍˍˍˍˍ 。",
       "vi": "B: Tôi thích …, … thì… ….",
       "py": "B: Wǒ xǐhuān ˍˍˍˍˍ, ˍˍˍˍˍ ma · · · · · · ˍˍˍˍˍ."
      },
      {
       "hz": "A：這個學期，你想參加哪一類的社團？",
       "vi": "A: Học kỳ này bạn muốn tham gia câu lạc bộ loại nào?",
       "py": "A: Zhège xuéqí, nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "我跟妹妹都喜歡喝同一種飲料。2. 他們兩個人是鄰居，住在同一棟公寓。3. 這個學期，我弟弟跟良介在同一班上英文作文課。",
       "vi": "Tôi và em gái đều thích uống cùng một loại đồ uống. Hai người họ là hàng xóm, sống cùng một toà chung cư. Học kỳ này em trai tôi và Ryosuke học cùng một lớp viết văn tiếng Anh.",
       "py": "Wǒ gēn mèimei dōu xǐhuān hē tóng yìzhǒng yǐnliào. 2. Tāmen liǎnggè rén shì línjū, zhù zài tóng yídòng gōngyù. 3. Zhège xuéqí, wǒ dìdi gēn Liángjiè zài tóngyì bānshàng yīngwén zuòwénkè."
      },
      {
       "hz": "我們的衣服都是在一樣的服裝店買的。",
       "vi": "Quần áo của chúng tôi đều mua ở cùng một cửa hàng thời trang.",
       "py": "Wǒmen de yīfú dōu shì zài yíyàng de fúzhuāngdiàn mǎi de."
      },
      {
       "hz": "我的中文老師是林老師。莫以凡的中文老師也是林老師。",
       "vi": "Cô giáo tiếng Trung của tôi là cô Lâm. Cô giáo tiếng Trung của Mạc Dĩ Phàm cũng là cô Lâm.",
       "py": "Wǒ de zhōngwén lǎoshī shì Lín lǎoshī. Mòyǐfán de zhōngwén lǎoshī yě shì Lín lǎoshī."
      },
      {
       "hz": "我妹妹的生日是3月8日，我的好朋友也是3月8日出生的。",
       "vi": "Sinh nhật em gái tôi là ngày 8 tháng 3, bạn thân của tôi cũng sinh ngày 8 tháng 3.",
       "py": "Wǒ mèimei de shēngrì shì 3 yuè 8 rì, wǒ de hǎo péngyǒu yě shì 3 yuè 8 rì chūshēng de."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 同 + 一 + M (+N).",
       "vi": "Viết lại câu bằng mẫu 同 + 一 + lượng từ (+ danh từ).",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u tóng + yī + M (+ N)."
      },
      {
       "hz": "愛心服務社多久做一次愛心服務？他們什麼時候做？",
       "vi": "Câu lạc bộ Thiện Nguyện bao lâu làm từ thiện một lần? Họ làm vào lúc nào?",
       "py": "Àixīn fúwùshè duōjiǔ zuò yícì àixīn fúwù? Tāmen shénme shíhòu zuò?"
      },
      {
       "hz": "在老人安養院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở viện dưỡng lão có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài lǎorén ānyǎngyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在育幼院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở trại trẻ mồ côi có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yùyòuyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "在醫院可以做什麼愛心服務？還有什麼服務是短文中沒說到的？",
       "vi": "Ở bệnh viện có thể làm những việc thiện nguyện gì? Còn việc gì khác mà bài văn chưa nhắc đến?",
       "py": "Zài yīyuàn kěyǐ zuò shénme àixīn fúwù? Háiyǒu shénme fúwù shì duǎnwén zhōng méishuōdào de?"
      },
      {
       "hz": "良介覺得愛心服務的經驗怎麼樣？",
       "vi": "Ryosuke thấy trải nghiệm làm thiện nguyện thế nào?",
       "py": "Liángjiè juéde àixīn fúwù de jīngyàn zěnmeyàng?"
      },
      {
       "hz": "參加愛心服務社以前，良介是個怎麼樣的人？",
       "vi": "Trước khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke là người thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐqián, Liángjiè shì gè zěnmeyàng de rén?"
      },
      {
       "hz": "參加愛心服務社以後，良介有了什麼改變？",
       "vi": "Sau khi tham gia câu lạc bộ Thiện Nguyện, Ryosuke đã thay đổi thế nào?",
       "py": "Cānjiā àixīn fúwùshè yǐhòu, Liángjiè yǒu le shénme gǎibiàn?"
      },
      {
       "hz": "念了短文以後，你同意良介的想法嗎？為什麼？",
       "vi": "Đọc xong bài văn, bạn có đồng ý với suy nghĩ của Ryosuke không? Tại sao?",
       "py": "Niàn le duǎnwén yǐhòu, nǐ tóngyì Liángjiè de xiǎngfǎ ma? Wèishénme?"
      },
      {
       "hz": "請在這裡寫下你的姓名、國家、出生日期等資料。2. 我哥哥喜愛旅遊，他去過日本、英國、法國等三個國家。3. 學校的社團像鋼琴社、吉他社、書法社等，都有很多社員。",
       "vi": "Hãy ghi họ tên, quốc tịch, ngày sinh v.v. của bạn vào đây. Anh trai tôi rất thích du lịch, đã đi Nhật, Anh, Pháp — ba nước. Các câu lạc bộ trong trường như câu lạc bộ piano, guitar, thư pháp v.v. đều có rất nhiều thành viên.",
       "py": "Qǐng zài zhèlǐ xiěxià nǐ de xìngmíng, guójiā, chūshēngrìqí děng zīliào. 2. Wǒ gēge xǐ'ài lǚyóu, tā qùguò Rìběn, Yīngguó, Fǎguó děng sāngè guójiā. 3. Xuéxiào de shètuán xiàng gāngqín shè, jítāshè, shūfǎ shè děng, dōu yǒu hěnduō shèyuán."
      },
      {
       "hz": "A：你吃過哪些台灣小吃？",
       "vi": "A: Bạn đã ăn những món ăn vặt Đài Loan nào?",
       "py": "A: Nǐ chī guò nǎxiē Táiwān xiǎochī?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，我都吃過。",
       "vi": "B: …, tôi đều ăn rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, wǒ dōu chī guò."
      },
      {
       "hz": "A：你有哪些國家的朋友？",
       "vi": "A: Bạn có bạn bè ở những nước nào?",
       "py": "A: Nǐ yǒu nǎxiē guójiā de péngyǒu?"
      },
      {
       "hz": "A：我們週末要去阿里山爬山，要準備哪些東西呢？",
       "vi": "A: Cuối tuần chúng ta đi leo núi A Lý Sơn, cần chuẩn bị những gì?",
       "py": "A: Wǒmen zhōumò yào qù ālǐshān páshān, yào zhǔnbèi nǎxiē dōngxī ne?"
      },
      {
       "hz": "醫生從檢查報告中了解病人的情況。2. 我們可以從生活中得到不少寶貴的經驗。3. 從他說的這些話中，我聽不出來他是高興還是難過。",
       "vi": "Bác sĩ nắm được tình trạng bệnh nhân qua kết quả xét nghiệm. Chúng ta có thể học được nhiều kinh nghiệm quý báu từ cuộc sống. Qua những lời anh ấy nói, tôi không nghe ra anh ấy vui hay buồn.",
       "py": "Yīshēng cóng jiǎnchábàogào zhōng liǎojiě bìngrén de qíngkuàng. 2. Wǒmen kěyǐ cóng shēnghuó zhōng dédào bùshǎo bǎoguì de jīngyàn. 3. Cóng tā shuō de zhèxiē huà zhōng, wǒ tīngbùchūlái tā shì gāoxìng háishì nánguò."
      },
      {
       "hz": "考試的成績可以讓老師知道學生學得怎麼樣。",
       "vi": "Kết quả thi giúp thầy giáo biết học sinh học thế nào.",
       "py": "Kǎoshì de chéngjì kěyǐ ràng lǎoshī zhīdào xuéshēng xué de zěnmeyàng."
      },
      {
       "hz": "我從參加社團的經驗裡，學到了不少處理事情的方法。",
       "vi": "Từ kinh nghiệm tham gia câu lạc bộ, tôi đã học được nhiều cách xử lý công việc.",
       "py": "Wǒ cóng cānjiā shètuán de jīngyàn lǐ, xuédào le bùshǎo chǔlǐ shìqíng de fāngfǎ."
      },
      {
       "hz": "老師選了幾個華語中心的學生，去參加用中文說故事的比賽。",
       "vi": "Thầy giáo chọn vài học sinh của Trung tâm Hoa ngữ đi thi kể chuyện bằng tiếng Trung.",
       "py": "Lǎoshī xuǎn le jǐgè huáyǔ zhōngxīn de xuéshēng, qù cānjiā yòng zhōngwén shuō gùshì de bǐsài."
      },
      {
       "hz": "改寫句子。 Viết lại câu bằng mẫu 從…中.",
       "vi": "Viết lại câu bằng mẫu 從…中.",
       "py": "Gǎixiě jùzi. Vi ế t l ạ i c â u b ằ ng m ẫ u cóng… zhōng."
      },
      {
       "hz": "上面的社團，你想參加哪一個？為什麼？",
       "vi": "Trong các câu lạc bộ trên, bạn muốn tham gia câu lạc bộ nào? Tại sao?",
       "py": "Shàngmiàn de shètuán, nǐ xiǎng cānjiā nǎ yígè? Wèishénme?"
      },
      {
       "hz": "如果沒有你想參加的社團，你想參加什麼社團，為什麼？",
       "vi": "Nếu không có câu lạc bộ bạn muốn tham gia, bạn muốn tham gia câu lạc bộ gì, tại sao?",
       "py": "Rúguǒ méiyǒu nǐ xiǎng cānjiā de shètuán, nǐ xiǎng cānjiā shénme shètuán, wèishénme?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "你想參加哪一類的社團？",
       "vi": "Bạn muốn tham gia loại câu lạc bộ nào?",
       "py": "Nǐ xiǎng cānjiā nǎ yílèi de shètuán?"
      },
      {
       "hz": "說明：請學生說一說參加社團的經驗、有什麼收穫。",
       "vi": "Hướng dẫn: Mời học sinh kể về kinh nghiệm tham gia câu lạc bộ và những điều thu hoạch được.",
       "py": "Shuōmíng: Qǐng xuéshēng shuōyìshuō cānjiā shètuán de jīngyàn, yǒu shénme shōuhuò."
      },
      {
       "hz": "參加社團好不好？",
       "vi": "Tham gia câu lạc bộ có tốt không?",
       "py": "Cānjiā shètuán hǎobùhǎo?"
      },
      {
       "hz": "你參加過什麼社團？參加這個社團讓你有收穫嗎？",
       "vi": "Bạn đã tham gia câu lạc bộ nào? Tham gia câu lạc bộ đó có giúp bạn thu hoạch được gì không?",
       "py": "Nǐ cānjiā guò shénme shètuán? Cānjiā zhège shètuán ràng nǐ yǒu shōuhuò ma?"
      },
      {
       "hz": "你覺得學生應該參加社團嗎？為什麼？",
       "vi": "Bạn thấy học sinh có nên tham gia câu lạc bộ không? Tại sao?",
       "py": "Nǐ juéde xuéshēng yīnggāi cānjiā shètuán ma? Wèishénme?"
      },
      {
       "hz": "你想學生可以花多少時間參加社團？為什麼？",
       "vi": "Bạn nghĩ học sinh có thể dành bao nhiêu thời gian cho câu lạc bộ? Tại sao?",
       "py": "Nǐ xiǎng xuéshēng kěyǐ huā duōshǎo shíjiān cānjiā shètuán? Wèishénme?"
      },
      {
       "hz": "請你問一問同學，參加社團有哪些好處？有沒有壞處？",
       "vi": "Hãy hỏi các bạn cùng lớp xem tham gia câu lạc bộ có những lợi ích gì? Có tác hại gì không?",
       "py": "Qǐng nǐ wènyíwèn tóngxué, cānjiā shètuán yǒu nǎxiē hǎochù? Yǒuméiyǒu huàichù?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… (不)感興趣 — (không) thấy hứng thú",
   "giaiThich": "Dùng để nói mình quan tâm, muốn tìm hiểu thêm về điều gì đó — hoặc ngược lại."
  }
 ],
 "td2-12.1": [
  {
   "title": "V. ...難怪... no wonder…",
   "points": [
    {
     "label": null,
     "formula": "Before “難怪”, there is usually an existing fact stated and unlikely to change, so no need to feel surprised. “難怪” is often followed by verb phrases. Sometimes when used in a conversation, the listener will be a little surprised after understanding a stated fact or reason.",
     "examples": [
      {
       "hz": "這個會開了五個小時還沒結束，難怪大家都累死了。\t2. 那個美國人在中國住了五年，難怪中文說得那麼好。3. 同事 A：經理說他感冒了，昨天晚上不但發燒，還一直咳嗽。同事 B：難怪他今天上班的時候，一直戴著口罩。",
       "vi": "Cuộc họp này kéo dài năm tiếng vẫn chưa kết thúc, thảo nào ai cũng mệt rã rời. Người Mỹ đó sống ở Trung Quốc năm năm, thảo nào nói tiếng Trung giỏi như vậy. Đồng nghiệp A: Giám đốc nói ông ấy bị cảm, tối qua không những sốt mà còn ho suốt. Đồng nghiệp B: Thảo nào hôm nay đi làm ông ấy cứ đeo khẩu trang.",
       "py": "Zhège huì kāi le wǔgè xiǎoshí hái méi jiéshù, nánguài dàjiā dōu lèisǐ le. 2. Nàge Měiguó rén zài Zhōngguó zhù le wǔnián, nánguài zhōngwén shuō de nàme hǎo. 3. Tóngshì A: Jīnglǐ shuō tā gǎnmào le, zuótiānwǎnshàng búdàn fāshāo, hái yìzhí késòu. Tóngshì B: Nánguài tā jīntiān shàngbān de shíhòu, yìzhí dài zhe kǒuzhào."
      },
      {
       "hz": "他昨天晚上拉肚子，難怪 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Tối qua anh ấy bị tiêu chảy, thảo nào ….",
       "py": "Tā zuótiānwǎnshàng lādùzi, nánguài ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：下個星期我有很重要的球賽，一定要贏。",
       "vi": "A: Tuần sau tôi có trận đấu rất quan trọng, nhất định phải thắng.",
       "py": "A: Xiàgèxīngqí wǒ yǒu hěn zhòngyào de qiúsài, yídìng yào yíng."
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，週末也不休息。",
       "vi": "B: …, cuối tuần cũng không nghỉ.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhōumò yě bù xiūxí."
      },
      {
       "hz": "A：張教授不但知識豐富,他教的專業課程也都很有意思。",
       "vi": "A: Giáo sư Trương không những kiến thức phong phú, các môn chuyên ngành thầy dạy cũng rất thú vị.",
       "py": "A: Zhāng jiàoshòu búdàn zhīshì fēngfù, tā jiào de zhuānyèkèchéng yě dōu hěn yǒuyìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "難怪 — thảo nào",
   "giaiThich": "Phía trước 難怪 là sự thật đã biết; vì thế điều nói sau không có gì đáng ngạc nhiên. Sau 難怪 thường là cụm động từ."
  },
  {
   "title": "VI. V 得了/ V不 了 capability complement 了",
   "points": [
    {
     "label": null,
     "formula": "The pattern “ V+得了” shows one’s ability to achieve something or cause a certain result. Its negative from is “ V不了”. The verbs used in this pattern are often monosyllabic, such as “吃(eat) ”, “忘(forget) ” “拿(take) ”, “做(do) ”, “到(reach) ”,“管(manage) ”,etc. This pattern is different from“ V 了”. The former shows likelihood, while the latter implies that something has been done e.g.,“吃了” and“做了”. Respectfully Yours, honorific, used when writing to an elder family member or VIP instead of a friend or a person of equal position In this pattern, “個” serves as a particle showing that an action only lasts for a short time or something is done in a relaxing and easy manner. Verb-object separable words are often used in this pattern, such as “喝個茶”, “唱個歌”, “跳個舞”, etc.",
     "examples": [
      {
       "hz": "你買了這麼多東西，一個人拿得了嗎？2.我們只有三個人，吃不了這麼多菜。3.媽媽一個人做不了那麼多家事，所以我的房間自己打掃。",
       "vi": "Bạn mua nhiều đồ thế này, một mình mang nổi không? Chúng tôi chỉ có ba người, ăn không hết nhiều món thế này. Mẹ một mình làm không xuể nhiều việc nhà như vậy, nên phòng tôi tôi tự dọn.",
       "py": "Nǐ mǎi le zhème duō dōngxī, yígè rén ná de le ma? 2. Wǒmen zhǐyǒu sāngè rén, chī bùliǎo zhème duō cài. 3. Māma yígè rén zuòbùliǎo nàme duōjiā shì, suǒyǐ wǒ de fángjiān zìjǐ dǎsǎo."
      },
      {
       "hz": "你不運動，三餐又吃得那麼多，體重當然ˍˍˍˍˍˍˍˍ。",
       "vi": "Bạn không tập thể dục, ba bữa lại ăn nhiều như vậy, cân nặng đương nhiên ….",
       "py": "Nǐ bú yùndòng, sāncān yòu chī de nàme duō, tǐzhòng dāngrán ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "從台灣坐飛機到越南去，兩個小時 ˍˍˍˍˍˍˍˍˍ嗎？",
       "vi": "Từ Đài Loan đi máy bay sang Việt Nam, hai tiếng có … không?",
       "py": "Cóng Táiwān zuòfēijī dào Yuènán qù, liǎnggè xiǎoshí ˍˍˍˍˍˍˍˍˍ ma?"
      },
      {
       "hz": "王先生 ˍˍˍˍˍˍˍˍˍˍ第一次跟女朋友約會的經驗。",
       "vi": "Anh Vương … trải nghiệm lần đầu hẹn hò với bạn gái.",
       "py": "Wáng xiānshēng ˍˍˍˍˍˍˍˍˍˍ dìyīcì gēn nǚpéngyǒu yuēhuì de jīngyàn."
      },
      {
       "hz": "可欣寫信給誰？為什麼這封信是「自我推薦」？",
       "vi": "Khả Hân viết thư cho ai? Tại sao bức thư này là thư “tự giới thiệu”?",
       "py": "Kěxīn xiěxìngěi shéi? Wèishénme zhè fēngxìn shì “zìwǒ tuījiàn”?"
      },
      {
       "hz": "請你介紹一下可欣的家人。",
       "vi": "Hãy giới thiệu về gia đình của Khả Hân.",
       "py": "Qǐng nǐ jièshào yíxià Kěxīn de jiārén."
      },
      {
       "hz": "這個暑假，可欣想要去哪裡打工？為什麼？",
       "vi": "Kỳ nghỉ hè này Khả Hân muốn đi làm thêm ở đâu? Tại sao?",
       "py": "Zhège shǔjià, Kěxīn xiǎngyào qù nǎlǐ dǎgōng? Wèishénme?"
      },
      {
       "hz": "可欣覺得打工的收穫是什麼？",
       "vi": "Khả Hân thấy làm thêm thu hoạch được gì?",
       "py": "Kěxīn juéde dǎgōng de shōuhuò shì shénme?"
      },
      {
       "hz": "可欣打過什麼工？你呢？",
       "vi": "Khả Hân đã từng làm thêm những việc gì? Còn bạn?",
       "py": "Kěxīn dǎ guò shénme gōng? Nǐ ne?"
      },
      {
       "hz": "如果你是李老闆，你願意給可欣打工的機會嗎？為什麼？",
       "vi": "Nếu bạn là ông chủ Lý, bạn có muốn cho Khả Hân cơ hội làm thêm không? Tại sao?",
       "py": "Rúguǒ nǐ shì Lǐ lǎobǎn, nǐ yuànyì gěi Kěxīn dǎgōng de jīhuì ma? Wèishénme?"
      },
      {
       "hz": "有打工的經驗，對你將來的職業有幫助嗎？為什麼？",
       "vi": "Kinh nghiệm làm thêm có giúp ích cho nghề nghiệp sau này của bạn không? Tại sao?",
       "py": "Yǒu dǎgōng de jīngyàn, duì nǐ jiānglái de zhíyè yǒu bāngzhù ma? Wèishénme?"
      },
      {
       "hz": "弟弟昨天夜裡兩點才睡覺，難怪早上起不來。",
       "vi": "Tối qua hai giờ sáng em trai mới đi ngủ, thảo nào sáng nay không dậy nổi.",
       "py": "Dìdi zuótiānyèlǐ liǎngdiǎn cái shuìjiào, nánguài zǎoshàng qǐbùlái."
      },
      {
       "hz": "我覺得洗個碗、倒個垃圾都是很簡單的家事。2. 爸爸每天下班回家，都先看個電視再吃晚飯。3. 這個週末我想先去KTV唱個歌，再去看個電影，輕鬆一下。",
       "vi": "Tôi thấy rửa bát, đổ rác đều là những việc nhà rất đơn giản. Ngày nào bố đi làm về cũng xem tivi một lát rồi mới ăn tối. Cuối tuần này tôi muốn đi hát karaoke một chút, rồi xem một bộ phim, thư giãn một chút.",
       "py": "Wǒ juéde xǐ gè wǎn, dào gè lèsè dōu shì hěn jiǎndān de jiāshì. 2. Bàba měitiān xiàbān huíjiā, dōu xiān kàn gè diànshì zài chīwǎnfàn. 3. Zhège zhōumò wǒ xiǎng xiān qù KTV chàng gè gē, zài qù kàn gè diànyǐng, qīngsōng yíxià."
      },
      {
       "hz": "今天天氣很好，妳會跟先生說什麼？",
       "vi": "Hôm nay trời rất đẹp, chị sẽ nói gì với chồng?",
       "py": "Jīntiāntiānqì hěn hǎo, nǐhuì gēn xiānshēng shuō shénme?"
      },
      {
       "hz": "室友覺得頭很痛，可是他想去上課，你會跟他說什麼？",
       "vi": "Bạn cùng phòng thấy rất đau đầu nhưng vẫn muốn đi học, bạn sẽ nói gì với cậu ấy?",
       "py": "Shìyǒu juéde tóu hěn tòng, kěshì tā xiǎng qù shàngkè, nǐ huì gēn tā shuō shénme?"
      },
      {
       "hz": "朋友去你家，他要走的時候已經晚上六點了，你會跟他說什麼？",
       "vi": "Bạn đến nhà bạn chơi, lúc về thì đã sáu giờ tối rồi, bạn sẽ nói gì với họ?",
       "py": "Péngyǒu qù nǐjiā, tā yào zǒu de shíhòu yǐjīng wǎnshàng liùdiǎn le, nǐ huì gēn tā shuō shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得了 / V 不了 — làm nổi / không nổi",
   "giaiThich": "Chỉ khả năng làm được hay không làm được việc gì; động từ dùng thường là đơn âm (吃, 走, 做…)."
  },
  {
   "title": "II. N/NP + 來(+V) let N/NP do something",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, “來” refers to an omitted verb and is often used when there is a specific action, e.g., “我來做” and “我來幫忙”. If the dialogue responds with “自己來”, it indicates that the speaker doesn’t want to bother the other person. It is a polite statement.",
     "examples": [
      {
       "hz": "我做了很多菜，你想吃什麼，自己來，別客氣。2. 上網訂票、找資料、寫報告，這些事情李老闆都讓助理來。3. A:像洗碗、打掃房間這樣的事，那個孩子都做不好。 B:他才五歲，這些事最好讓父母來(做)。",
       "vi": "Tôi nấu nhiều món lắm, bạn muốn ăn gì thì tự lấy nhé, đừng khách sáo. Đặt vé qua mạng, tìm tài liệu, viết báo cáo — những việc này ông chủ Lý đều để trợ lý làm. A: Những việc như rửa bát, dọn phòng, đứa bé đó đều làm không tốt. B: Cháu mới năm tuổi, những việc này tốt nhất để bố mẹ làm.",
       "py": "Wǒ zuò le hěnduō cài, nǐ xiǎng chī shénme, zìjǐ lái, bié kèqì. 2. Shàngwǎng dìngpiào, zhǎo zīliào, xiě bàogào, zhèxiē shìqíng Lǐ lǎobǎn dōu ràng zhùlǐ lái. 3. A: Xiàng xǐwǎn, dǎsǎo fángjiān zhèyàng de shì, nàge háizi dōu zuò bùhǎo. B: Tā cái wǔsuì, zhèxiē shì zuìhǎo ràng fùmǔ lái (zuò)."
      },
      {
       "hz": "太太：我要做晚飯了，你想吃什麼？",
       "vi": "Vợ: Em chuẩn bị nấu cơm tối đây, anh muốn ăn gì?",
       "py": "Tàitai: Wǒ yào zuò wǎnfàn le, nǐ xiǎng chī shénme?"
      },
      {
       "hz": "先生：你不舒服，快去休息吧。晚餐 ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Em không khoẻ, mau đi nghỉ đi. Bữa tối ….",
       "py": "Xiānshēng: Nǐ bù shūfú, kuài qù xiūxí ba. Wǎncān ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你看到朋友手裡拿了很多東西，沒辦法開門，你會說什麼？",
       "vi": "Bạn thấy bạn mình tay cầm nhiều đồ, không mở được cửa, bạn sẽ nói gì?",
       "py": "Nǐ kàndào péngyǒu shǒulǐ ná le hěnduō dōngxī, méi bànfǎ kāimén, nǐ huì shuō shénme?"
      },
      {
       "hz": "服務生很忙，沒幫客人倒水，如果你是客人，你會說什麼？ → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Nhân viên phục vụ rất bận, không rót nước cho khách, nếu bạn là khách, bạn sẽ nói gì? → ….",
       "py": "Fúwùshēng hěn máng, méi bāng kèrén dàoshuǐ, rúguǒ nǐ shì kèrén, nǐ huì shuō shénme? → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你喜歡哪種職業？",
       "vi": "Bạn thích nghề nào?",
       "py": "Nǐ xǐhuān nǎ zhǒng zhíyè?"
      },
      {
       "hz": "請寫出五種職業，這些職業的工作是什麼？為什麼你喜歡/不喜歡這個職業？",
       "vi": "Hãy viết ra năm nghề nghiệp, công việc của những nghề này là gì? Tại sao bạn thích / không thích nghề này?",
       "py": "Qǐng xiěchū wǔzhǒng zhíyè, zhèxiē zhíyè de gōngzuò shì shénme? Wèishénme nǐ xǐhuān / bù xǐhuān zhège zhíyè?"
      },
      {
       "hz": "做哪些事？",
       "vi": "Làm những việc gì?",
       "py": "Zuò nǎxiē shì?"
      },
      {
       "hz": "喜歡這個職業的原因看病、給病人藥、做研究......",
       "vi": "Lý do thích nghề này · Khám bệnh, kê thuốc cho bệnh nhân, làm nghiên cứu…",
       "py": "Xǐhuān zhège zhíyè de yuányīn kànbìng, gěi bìngrén yào, zuò yánjiù......"
      },
      {
       "hz": "求職的角色扮演兩個人一組，一個是公司老闆，一個是來找工作的人(可欣)。兩個人對工作內容、能力、上班時間等對話。",
       "vi": "Đóng vai xin việc: hai người một nhóm, một người là ông chủ công ty, một người là người đi xin việc (Khả Hân). Hai người trao đổi về nội dung công việc, năng lực, thời gian làm việc v.v.",
       "py": "Qiúzhí de juésèbànyǎn liǎnggè rén yìzǔ, yígè shì gōngsī lǎobǎn, yígè shì lái zhǎo gōngzuò de rén (Kěxīn). Liǎnggè rén duì gōngzuò nèiróng, nénglì, shàngbānshíjiān děng duìhuà."
      },
      {
       "hz": "可欣：請問這裡是OO貿易公司嗎？",
       "vi": "Khả Hân: Cho hỏi đây có phải công ty thương mại OO không ạ?",
       "py": "Kěxīn: Qǐngwèn zhèlǐ shì OO màoyì gōngsī ma?"
      },
      {
       "hz": "老闆：是啊！",
       "vi": "Ông chủ: Đúng rồi!",
       "py": "Lǎobǎn: Shì a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "N + 來 (+ V) — để tôi/ai đó làm",
   "giaiThich": "來 thay cho động từ đã rõ trong ngữ cảnh, thường khi xung phong làm gì (我來做, 我來幫忙). Trả lời 自己來 nghĩa là \"để tôi tự làm\"."
  }
 ],
 "td2-12.2": [
  {
   "title": "V. ...難怪... no wonder…",
   "points": [
    {
     "label": null,
     "formula": "Before “難怪”, there is usually an existing fact stated and unlikely to change, so no need to feel surprised. “難怪” is often followed by verb phrases. Sometimes when used in a conversation, the listener will be a little surprised after understanding a stated fact or reason.",
     "examples": [
      {
       "hz": "這個會開了五個小時還沒結束，難怪大家都累死了。\t2. 那個美國人在中國住了五年，難怪中文說得那麼好。3. 同事 A：經理說他感冒了，昨天晚上不但發燒，還一直咳嗽。同事 B：難怪他今天上班的時候，一直戴著口罩。",
       "vi": "Cuộc họp này kéo dài năm tiếng vẫn chưa kết thúc, thảo nào ai cũng mệt rã rời. Người Mỹ đó sống ở Trung Quốc năm năm, thảo nào nói tiếng Trung giỏi như vậy. Đồng nghiệp A: Giám đốc nói ông ấy bị cảm, tối qua không những sốt mà còn ho suốt. Đồng nghiệp B: Thảo nào hôm nay đi làm ông ấy cứ đeo khẩu trang.",
       "py": "Zhège huì kāi le wǔgè xiǎoshí hái méi jiéshù, nánguài dàjiā dōu lèisǐ le. 2. Nàge Měiguó rén zài Zhōngguó zhù le wǔnián, nánguài zhōngwén shuō de nàme hǎo. 3. Tóngshì A: Jīnglǐ shuō tā gǎnmào le, zuótiānwǎnshàng búdàn fāshāo, hái yìzhí késòu. Tóngshì B: Nánguài tā jīntiān shàngbān de shíhòu, yìzhí dài zhe kǒuzhào."
      },
      {
       "hz": "他昨天晚上拉肚子，難怪 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Tối qua anh ấy bị tiêu chảy, thảo nào ….",
       "py": "Tā zuótiānwǎnshàng lādùzi, nánguài ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：下個星期我有很重要的球賽，一定要贏。",
       "vi": "A: Tuần sau tôi có trận đấu rất quan trọng, nhất định phải thắng.",
       "py": "A: Xiàgèxīngqí wǒ yǒu hěn zhòngyào de qiúsài, yídìng yào yíng."
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，週末也不休息。",
       "vi": "B: …, cuối tuần cũng không nghỉ.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhōumò yě bù xiūxí."
      },
      {
       "hz": "A：張教授不但知識豐富,他教的專業課程也都很有意思。",
       "vi": "A: Giáo sư Trương không những kiến thức phong phú, các môn chuyên ngành thầy dạy cũng rất thú vị.",
       "py": "A: Zhāng jiàoshòu búdàn zhīshì fēngfù, tā jiào de zhuānyèkèchéng yě dōu hěn yǒuyìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "難怪 — thảo nào",
   "giaiThich": "Phía trước 難怪 là sự thật đã biết; vì thế điều nói sau không có gì đáng ngạc nhiên. Sau 難怪 thường là cụm động từ."
  },
  {
   "title": "VI. V 得了/ V不 了 capability complement 了",
   "points": [
    {
     "label": null,
     "formula": "The pattern “ V+得了” shows one’s ability to achieve something or cause a certain result. Its negative from is “ V不了”. The verbs used in this pattern are often monosyllabic, such as “吃(eat) ”, “忘(forget) ” “拿(take) ”, “做(do) ”, “到(reach) ”,“管(manage) ”,etc. This pattern is different from“ V 了”. The former shows likelihood, while the latter implies that something has been done e.g.,“吃了” and“做了”. Respectfully Yours, honorific, used when writing to an elder family member or VIP instead of a friend or a person of equal position In this pattern, “個” serves as a particle showing that an action only lasts for a short time or something is done in a relaxing and easy manner. Verb-object separable words are often used in this pattern, such as “喝個茶”, “唱個歌”, “跳個舞”, etc.",
     "examples": [
      {
       "hz": "你買了這麼多東西，一個人拿得了嗎？2.我們只有三個人，吃不了這麼多菜。3.媽媽一個人做不了那麼多家事，所以我的房間自己打掃。",
       "vi": "Bạn mua nhiều đồ thế này, một mình mang nổi không? Chúng tôi chỉ có ba người, ăn không hết nhiều món thế này. Mẹ một mình làm không xuể nhiều việc nhà như vậy, nên phòng tôi tôi tự dọn.",
       "py": "Nǐ mǎi le zhème duō dōngxī, yígè rén ná de le ma? 2. Wǒmen zhǐyǒu sāngè rén, chī bùliǎo zhème duō cài. 3. Māma yígè rén zuòbùliǎo nàme duōjiā shì, suǒyǐ wǒ de fángjiān zìjǐ dǎsǎo."
      },
      {
       "hz": "你不運動，三餐又吃得那麼多，體重當然ˍˍˍˍˍˍˍˍ。",
       "vi": "Bạn không tập thể dục, ba bữa lại ăn nhiều như vậy, cân nặng đương nhiên ….",
       "py": "Nǐ bú yùndòng, sāncān yòu chī de nàme duō, tǐzhòng dāngrán ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "從台灣坐飛機到越南去，兩個小時 ˍˍˍˍˍˍˍˍˍ嗎？",
       "vi": "Từ Đài Loan đi máy bay sang Việt Nam, hai tiếng có … không?",
       "py": "Cóng Táiwān zuòfēijī dào Yuènán qù, liǎnggè xiǎoshí ˍˍˍˍˍˍˍˍˍ ma?"
      },
      {
       "hz": "王先生 ˍˍˍˍˍˍˍˍˍˍ第一次跟女朋友約會的經驗。",
       "vi": "Anh Vương … trải nghiệm lần đầu hẹn hò với bạn gái.",
       "py": "Wáng xiānshēng ˍˍˍˍˍˍˍˍˍˍ dìyīcì gēn nǚpéngyǒu yuēhuì de jīngyàn."
      },
      {
       "hz": "可欣寫信給誰？為什麼這封信是「自我推薦」？",
       "vi": "Khả Hân viết thư cho ai? Tại sao bức thư này là thư “tự giới thiệu”?",
       "py": "Kěxīn xiěxìngěi shéi? Wèishénme zhè fēngxìn shì “zìwǒ tuījiàn”?"
      },
      {
       "hz": "請你介紹一下可欣的家人。",
       "vi": "Hãy giới thiệu về gia đình của Khả Hân.",
       "py": "Qǐng nǐ jièshào yíxià Kěxīn de jiārén."
      },
      {
       "hz": "這個暑假，可欣想要去哪裡打工？為什麼？",
       "vi": "Kỳ nghỉ hè này Khả Hân muốn đi làm thêm ở đâu? Tại sao?",
       "py": "Zhège shǔjià, Kěxīn xiǎngyào qù nǎlǐ dǎgōng? Wèishénme?"
      },
      {
       "hz": "可欣覺得打工的收穫是什麼？",
       "vi": "Khả Hân thấy làm thêm thu hoạch được gì?",
       "py": "Kěxīn juéde dǎgōng de shōuhuò shì shénme?"
      },
      {
       "hz": "可欣打過什麼工？你呢？",
       "vi": "Khả Hân đã từng làm thêm những việc gì? Còn bạn?",
       "py": "Kěxīn dǎ guò shénme gōng? Nǐ ne?"
      },
      {
       "hz": "如果你是李老闆，你願意給可欣打工的機會嗎？為什麼？",
       "vi": "Nếu bạn là ông chủ Lý, bạn có muốn cho Khả Hân cơ hội làm thêm không? Tại sao?",
       "py": "Rúguǒ nǐ shì Lǐ lǎobǎn, nǐ yuànyì gěi Kěxīn dǎgōng de jīhuì ma? Wèishénme?"
      },
      {
       "hz": "有打工的經驗，對你將來的職業有幫助嗎？為什麼？",
       "vi": "Kinh nghiệm làm thêm có giúp ích cho nghề nghiệp sau này của bạn không? Tại sao?",
       "py": "Yǒu dǎgōng de jīngyàn, duì nǐ jiānglái de zhíyè yǒu bāngzhù ma? Wèishénme?"
      },
      {
       "hz": "弟弟昨天夜裡兩點才睡覺，難怪早上起不來。",
       "vi": "Tối qua hai giờ sáng em trai mới đi ngủ, thảo nào sáng nay không dậy nổi.",
       "py": "Dìdi zuótiānyèlǐ liǎngdiǎn cái shuìjiào, nánguài zǎoshàng qǐbùlái."
      },
      {
       "hz": "我覺得洗個碗、倒個垃圾都是很簡單的家事。2. 爸爸每天下班回家，都先看個電視再吃晚飯。3. 這個週末我想先去KTV唱個歌，再去看個電影，輕鬆一下。",
       "vi": "Tôi thấy rửa bát, đổ rác đều là những việc nhà rất đơn giản. Ngày nào bố đi làm về cũng xem tivi một lát rồi mới ăn tối. Cuối tuần này tôi muốn đi hát karaoke một chút, rồi xem một bộ phim, thư giãn một chút.",
       "py": "Wǒ juéde xǐ gè wǎn, dào gè lèsè dōu shì hěn jiǎndān de jiāshì. 2. Bàba měitiān xiàbān huíjiā, dōu xiān kàn gè diànshì zài chīwǎnfàn. 3. Zhège zhōumò wǒ xiǎng xiān qù KTV chàng gè gē, zài qù kàn gè diànyǐng, qīngsōng yíxià."
      },
      {
       "hz": "今天天氣很好，妳會跟先生說什麼？",
       "vi": "Hôm nay trời rất đẹp, chị sẽ nói gì với chồng?",
       "py": "Jīntiāntiānqì hěn hǎo, nǐhuì gēn xiānshēng shuō shénme?"
      },
      {
       "hz": "室友覺得頭很痛，可是他想去上課，你會跟他說什麼？",
       "vi": "Bạn cùng phòng thấy rất đau đầu nhưng vẫn muốn đi học, bạn sẽ nói gì với cậu ấy?",
       "py": "Shìyǒu juéde tóu hěn tòng, kěshì tā xiǎng qù shàngkè, nǐ huì gēn tā shuō shénme?"
      },
      {
       "hz": "朋友去你家，他要走的時候已經晚上六點了，你會跟他說什麼？",
       "vi": "Bạn đến nhà bạn chơi, lúc về thì đã sáu giờ tối rồi, bạn sẽ nói gì với họ?",
       "py": "Péngyǒu qù nǐjiā, tā yào zǒu de shíhòu yǐjīng wǎnshàng liùdiǎn le, nǐ huì gēn tā shuō shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得了 / V 不了 — làm nổi / không nổi",
   "giaiThich": "Chỉ khả năng làm được hay không làm được việc gì; động từ dùng thường là đơn âm (吃, 走, 做…)."
  },
  {
   "title": "II. N/NP + 來(+V) let N/NP do something",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, “來” refers to an omitted verb and is often used when there is a specific action, e.g., “我來做” and “我來幫忙”. If the dialogue responds with “自己來”, it indicates that the speaker doesn’t want to bother the other person. It is a polite statement.",
     "examples": [
      {
       "hz": "我做了很多菜，你想吃什麼，自己來，別客氣。2. 上網訂票、找資料、寫報告，這些事情李老闆都讓助理來。3. A:像洗碗、打掃房間這樣的事，那個孩子都做不好。 B:他才五歲，這些事最好讓父母來(做)。",
       "vi": "Tôi nấu nhiều món lắm, bạn muốn ăn gì thì tự lấy nhé, đừng khách sáo. Đặt vé qua mạng, tìm tài liệu, viết báo cáo — những việc này ông chủ Lý đều để trợ lý làm. A: Những việc như rửa bát, dọn phòng, đứa bé đó đều làm không tốt. B: Cháu mới năm tuổi, những việc này tốt nhất để bố mẹ làm.",
       "py": "Wǒ zuò le hěnduō cài, nǐ xiǎng chī shénme, zìjǐ lái, bié kèqì. 2. Shàngwǎng dìngpiào, zhǎo zīliào, xiě bàogào, zhèxiē shìqíng Lǐ lǎobǎn dōu ràng zhùlǐ lái. 3. A: Xiàng xǐwǎn, dǎsǎo fángjiān zhèyàng de shì, nàge háizi dōu zuò bùhǎo. B: Tā cái wǔsuì, zhèxiē shì zuìhǎo ràng fùmǔ lái (zuò)."
      },
      {
       "hz": "太太：我要做晚飯了，你想吃什麼？",
       "vi": "Vợ: Em chuẩn bị nấu cơm tối đây, anh muốn ăn gì?",
       "py": "Tàitai: Wǒ yào zuò wǎnfàn le, nǐ xiǎng chī shénme?"
      },
      {
       "hz": "先生：你不舒服，快去休息吧。晚餐 ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Em không khoẻ, mau đi nghỉ đi. Bữa tối ….",
       "py": "Xiānshēng: Nǐ bù shūfú, kuài qù xiūxí ba. Wǎncān ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你看到朋友手裡拿了很多東西，沒辦法開門，你會說什麼？",
       "vi": "Bạn thấy bạn mình tay cầm nhiều đồ, không mở được cửa, bạn sẽ nói gì?",
       "py": "Nǐ kàndào péngyǒu shǒulǐ ná le hěnduō dōngxī, méi bànfǎ kāimén, nǐ huì shuō shénme?"
      },
      {
       "hz": "服務生很忙，沒幫客人倒水，如果你是客人，你會說什麼？ → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Nhân viên phục vụ rất bận, không rót nước cho khách, nếu bạn là khách, bạn sẽ nói gì? → ….",
       "py": "Fúwùshēng hěn máng, méi bāng kèrén dàoshuǐ, rúguǒ nǐ shì kèrén, nǐ huì shuō shénme? → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你喜歡哪種職業？",
       "vi": "Bạn thích nghề nào?",
       "py": "Nǐ xǐhuān nǎ zhǒng zhíyè?"
      },
      {
       "hz": "請寫出五種職業，這些職業的工作是什麼？為什麼你喜歡/不喜歡這個職業？",
       "vi": "Hãy viết ra năm nghề nghiệp, công việc của những nghề này là gì? Tại sao bạn thích / không thích nghề này?",
       "py": "Qǐng xiěchū wǔzhǒng zhíyè, zhèxiē zhíyè de gōngzuò shì shénme? Wèishénme nǐ xǐhuān / bù xǐhuān zhège zhíyè?"
      },
      {
       "hz": "做哪些事？",
       "vi": "Làm những việc gì?",
       "py": "Zuò nǎxiē shì?"
      },
      {
       "hz": "喜歡這個職業的原因看病、給病人藥、做研究......",
       "vi": "Lý do thích nghề này · Khám bệnh, kê thuốc cho bệnh nhân, làm nghiên cứu…",
       "py": "Xǐhuān zhège zhíyè de yuányīn kànbìng, gěi bìngrén yào, zuò yánjiù......"
      },
      {
       "hz": "求職的角色扮演兩個人一組，一個是公司老闆，一個是來找工作的人(可欣)。兩個人對工作內容、能力、上班時間等對話。",
       "vi": "Đóng vai xin việc: hai người một nhóm, một người là ông chủ công ty, một người là người đi xin việc (Khả Hân). Hai người trao đổi về nội dung công việc, năng lực, thời gian làm việc v.v.",
       "py": "Qiúzhí de juésèbànyǎn liǎnggè rén yìzǔ, yígè shì gōngsī lǎobǎn, yígè shì lái zhǎo gōngzuò de rén (Kěxīn). Liǎnggè rén duì gōngzuò nèiróng, nénglì, shàngbānshíjiān děng duìhuà."
      },
      {
       "hz": "可欣：請問這裡是OO貿易公司嗎？",
       "vi": "Khả Hân: Cho hỏi đây có phải công ty thương mại OO không ạ?",
       "py": "Kěxīn: Qǐngwèn zhèlǐ shì OO màoyì gōngsī ma?"
      },
      {
       "hz": "老闆：是啊！",
       "vi": "Ông chủ: Đúng rồi!",
       "py": "Lǎobǎn: Shì a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "N + 來 (+ V) — để tôi/ai đó làm",
   "giaiThich": "來 thay cho động từ đã rõ trong ngữ cảnh, thường khi xung phong làm gì (我來做, 我來幫忙). Trả lời 自己來 nghĩa là \"để tôi tự làm\"."
  }
 ],
 "td2-12.3": [
  {
   "title": "V. ...難怪... no wonder…",
   "points": [
    {
     "label": null,
     "formula": "Before “難怪”, there is usually an existing fact stated and unlikely to change, so no need to feel surprised. “難怪” is often followed by verb phrases. Sometimes when used in a conversation, the listener will be a little surprised after understanding a stated fact or reason.",
     "examples": [
      {
       "hz": "這個會開了五個小時還沒結束，難怪大家都累死了。\t2. 那個美國人在中國住了五年，難怪中文說得那麼好。3. 同事 A：經理說他感冒了，昨天晚上不但發燒，還一直咳嗽。同事 B：難怪他今天上班的時候，一直戴著口罩。",
       "vi": "Cuộc họp này kéo dài năm tiếng vẫn chưa kết thúc, thảo nào ai cũng mệt rã rời. Người Mỹ đó sống ở Trung Quốc năm năm, thảo nào nói tiếng Trung giỏi như vậy. Đồng nghiệp A: Giám đốc nói ông ấy bị cảm, tối qua không những sốt mà còn ho suốt. Đồng nghiệp B: Thảo nào hôm nay đi làm ông ấy cứ đeo khẩu trang.",
       "py": "Zhège huì kāi le wǔgè xiǎoshí hái méi jiéshù, nánguài dàjiā dōu lèisǐ le. 2. Nàge Měiguó rén zài Zhōngguó zhù le wǔnián, nánguài zhōngwén shuō de nàme hǎo. 3. Tóngshì A: Jīnglǐ shuō tā gǎnmào le, zuótiānwǎnshàng búdàn fāshāo, hái yìzhí késòu. Tóngshì B: Nánguài tā jīntiān shàngbān de shíhòu, yìzhí dài zhe kǒuzhào."
      },
      {
       "hz": "他昨天晚上拉肚子，難怪 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Tối qua anh ấy bị tiêu chảy, thảo nào ….",
       "py": "Tā zuótiānwǎnshàng lādùzi, nánguài ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：下個星期我有很重要的球賽，一定要贏。",
       "vi": "A: Tuần sau tôi có trận đấu rất quan trọng, nhất định phải thắng.",
       "py": "A: Xiàgèxīngqí wǒ yǒu hěn zhòngyào de qiúsài, yídìng yào yíng."
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，週末也不休息。",
       "vi": "B: …, cuối tuần cũng không nghỉ.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhōumò yě bù xiūxí."
      },
      {
       "hz": "A：張教授不但知識豐富,他教的專業課程也都很有意思。",
       "vi": "A: Giáo sư Trương không những kiến thức phong phú, các môn chuyên ngành thầy dạy cũng rất thú vị.",
       "py": "A: Zhāng jiàoshòu búdàn zhīshì fēngfù, tā jiào de zhuānyèkèchéng yě dōu hěn yǒuyìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "難怪 — thảo nào",
   "giaiThich": "Phía trước 難怪 là sự thật đã biết; vì thế điều nói sau không có gì đáng ngạc nhiên. Sau 難怪 thường là cụm động từ."
  },
  {
   "title": "VI. V 得了/ V不 了 capability complement 了",
   "points": [
    {
     "label": null,
     "formula": "The pattern “ V+得了” shows one’s ability to achieve something or cause a certain result. Its negative from is “ V不了”. The verbs used in this pattern are often monosyllabic, such as “吃(eat) ”, “忘(forget) ” “拿(take) ”, “做(do) ”, “到(reach) ”,“管(manage) ”,etc. This pattern is different from“ V 了”. The former shows likelihood, while the latter implies that something has been done e.g.,“吃了” and“做了”. Respectfully Yours, honorific, used when writing to an elder family member or VIP instead of a friend or a person of equal position In this pattern, “個” serves as a particle showing that an action only lasts for a short time or something is done in a relaxing and easy manner. Verb-object separable words are often used in this pattern, such as “喝個茶”, “唱個歌”, “跳個舞”, etc.",
     "examples": [
      {
       "hz": "你買了這麼多東西，一個人拿得了嗎？2.我們只有三個人，吃不了這麼多菜。3.媽媽一個人做不了那麼多家事，所以我的房間自己打掃。",
       "vi": "Bạn mua nhiều đồ thế này, một mình mang nổi không? Chúng tôi chỉ có ba người, ăn không hết nhiều món thế này. Mẹ một mình làm không xuể nhiều việc nhà như vậy, nên phòng tôi tôi tự dọn.",
       "py": "Nǐ mǎi le zhème duō dōngxī, yígè rén ná de le ma? 2. Wǒmen zhǐyǒu sāngè rén, chī bùliǎo zhème duō cài. 3. Māma yígè rén zuòbùliǎo nàme duōjiā shì, suǒyǐ wǒ de fángjiān zìjǐ dǎsǎo."
      },
      {
       "hz": "你不運動，三餐又吃得那麼多，體重當然ˍˍˍˍˍˍˍˍ。",
       "vi": "Bạn không tập thể dục, ba bữa lại ăn nhiều như vậy, cân nặng đương nhiên ….",
       "py": "Nǐ bú yùndòng, sāncān yòu chī de nàme duō, tǐzhòng dāngrán ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "從台灣坐飛機到越南去，兩個小時 ˍˍˍˍˍˍˍˍˍ嗎？",
       "vi": "Từ Đài Loan đi máy bay sang Việt Nam, hai tiếng có … không?",
       "py": "Cóng Táiwān zuòfēijī dào Yuènán qù, liǎnggè xiǎoshí ˍˍˍˍˍˍˍˍˍ ma?"
      },
      {
       "hz": "王先生 ˍˍˍˍˍˍˍˍˍˍ第一次跟女朋友約會的經驗。",
       "vi": "Anh Vương … trải nghiệm lần đầu hẹn hò với bạn gái.",
       "py": "Wáng xiānshēng ˍˍˍˍˍˍˍˍˍˍ dìyīcì gēn nǚpéngyǒu yuēhuì de jīngyàn."
      },
      {
       "hz": "可欣寫信給誰？為什麼這封信是「自我推薦」？",
       "vi": "Khả Hân viết thư cho ai? Tại sao bức thư này là thư “tự giới thiệu”?",
       "py": "Kěxīn xiěxìngěi shéi? Wèishénme zhè fēngxìn shì “zìwǒ tuījiàn”?"
      },
      {
       "hz": "請你介紹一下可欣的家人。",
       "vi": "Hãy giới thiệu về gia đình của Khả Hân.",
       "py": "Qǐng nǐ jièshào yíxià Kěxīn de jiārén."
      },
      {
       "hz": "這個暑假，可欣想要去哪裡打工？為什麼？",
       "vi": "Kỳ nghỉ hè này Khả Hân muốn đi làm thêm ở đâu? Tại sao?",
       "py": "Zhège shǔjià, Kěxīn xiǎngyào qù nǎlǐ dǎgōng? Wèishénme?"
      },
      {
       "hz": "可欣覺得打工的收穫是什麼？",
       "vi": "Khả Hân thấy làm thêm thu hoạch được gì?",
       "py": "Kěxīn juéde dǎgōng de shōuhuò shì shénme?"
      },
      {
       "hz": "可欣打過什麼工？你呢？",
       "vi": "Khả Hân đã từng làm thêm những việc gì? Còn bạn?",
       "py": "Kěxīn dǎ guò shénme gōng? Nǐ ne?"
      },
      {
       "hz": "如果你是李老闆，你願意給可欣打工的機會嗎？為什麼？",
       "vi": "Nếu bạn là ông chủ Lý, bạn có muốn cho Khả Hân cơ hội làm thêm không? Tại sao?",
       "py": "Rúguǒ nǐ shì Lǐ lǎobǎn, nǐ yuànyì gěi Kěxīn dǎgōng de jīhuì ma? Wèishénme?"
      },
      {
       "hz": "有打工的經驗，對你將來的職業有幫助嗎？為什麼？",
       "vi": "Kinh nghiệm làm thêm có giúp ích cho nghề nghiệp sau này của bạn không? Tại sao?",
       "py": "Yǒu dǎgōng de jīngyàn, duì nǐ jiānglái de zhíyè yǒu bāngzhù ma? Wèishénme?"
      },
      {
       "hz": "弟弟昨天夜裡兩點才睡覺，難怪早上起不來。",
       "vi": "Tối qua hai giờ sáng em trai mới đi ngủ, thảo nào sáng nay không dậy nổi.",
       "py": "Dìdi zuótiānyèlǐ liǎngdiǎn cái shuìjiào, nánguài zǎoshàng qǐbùlái."
      },
      {
       "hz": "我覺得洗個碗、倒個垃圾都是很簡單的家事。2. 爸爸每天下班回家，都先看個電視再吃晚飯。3. 這個週末我想先去KTV唱個歌，再去看個電影，輕鬆一下。",
       "vi": "Tôi thấy rửa bát, đổ rác đều là những việc nhà rất đơn giản. Ngày nào bố đi làm về cũng xem tivi một lát rồi mới ăn tối. Cuối tuần này tôi muốn đi hát karaoke một chút, rồi xem một bộ phim, thư giãn một chút.",
       "py": "Wǒ juéde xǐ gè wǎn, dào gè lèsè dōu shì hěn jiǎndān de jiāshì. 2. Bàba měitiān xiàbān huíjiā, dōu xiān kàn gè diànshì zài chīwǎnfàn. 3. Zhège zhōumò wǒ xiǎng xiān qù KTV chàng gè gē, zài qù kàn gè diànyǐng, qīngsōng yíxià."
      },
      {
       "hz": "今天天氣很好，妳會跟先生說什麼？",
       "vi": "Hôm nay trời rất đẹp, chị sẽ nói gì với chồng?",
       "py": "Jīntiāntiānqì hěn hǎo, nǐhuì gēn xiānshēng shuō shénme?"
      },
      {
       "hz": "室友覺得頭很痛，可是他想去上課，你會跟他說什麼？",
       "vi": "Bạn cùng phòng thấy rất đau đầu nhưng vẫn muốn đi học, bạn sẽ nói gì với cậu ấy?",
       "py": "Shìyǒu juéde tóu hěn tòng, kěshì tā xiǎng qù shàngkè, nǐ huì gēn tā shuō shénme?"
      },
      {
       "hz": "朋友去你家，他要走的時候已經晚上六點了，你會跟他說什麼？",
       "vi": "Bạn đến nhà bạn chơi, lúc về thì đã sáu giờ tối rồi, bạn sẽ nói gì với họ?",
       "py": "Péngyǒu qù nǐjiā, tā yào zǒu de shíhòu yǐjīng wǎnshàng liùdiǎn le, nǐ huì gēn tā shuō shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得了 / V 不了 — làm nổi / không nổi",
   "giaiThich": "Chỉ khả năng làm được hay không làm được việc gì; động từ dùng thường là đơn âm (吃, 走, 做…)."
  },
  {
   "title": "II. N/NP + 來(+V) let N/NP do something",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, “來” refers to an omitted verb and is often used when there is a specific action, e.g., “我來做” and “我來幫忙”. If the dialogue responds with “自己來”, it indicates that the speaker doesn’t want to bother the other person. It is a polite statement.",
     "examples": [
      {
       "hz": "我做了很多菜，你想吃什麼，自己來，別客氣。2. 上網訂票、找資料、寫報告，這些事情李老闆都讓助理來。3. A:像洗碗、打掃房間這樣的事，那個孩子都做不好。 B:他才五歲，這些事最好讓父母來(做)。",
       "vi": "Tôi nấu nhiều món lắm, bạn muốn ăn gì thì tự lấy nhé, đừng khách sáo. Đặt vé qua mạng, tìm tài liệu, viết báo cáo — những việc này ông chủ Lý đều để trợ lý làm. A: Những việc như rửa bát, dọn phòng, đứa bé đó đều làm không tốt. B: Cháu mới năm tuổi, những việc này tốt nhất để bố mẹ làm.",
       "py": "Wǒ zuò le hěnduō cài, nǐ xiǎng chī shénme, zìjǐ lái, bié kèqì. 2. Shàngwǎng dìngpiào, zhǎo zīliào, xiě bàogào, zhèxiē shìqíng Lǐ lǎobǎn dōu ràng zhùlǐ lái. 3. A: Xiàng xǐwǎn, dǎsǎo fángjiān zhèyàng de shì, nàge háizi dōu zuò bùhǎo. B: Tā cái wǔsuì, zhèxiē shì zuìhǎo ràng fùmǔ lái (zuò)."
      },
      {
       "hz": "太太：我要做晚飯了，你想吃什麼？",
       "vi": "Vợ: Em chuẩn bị nấu cơm tối đây, anh muốn ăn gì?",
       "py": "Tàitai: Wǒ yào zuò wǎnfàn le, nǐ xiǎng chī shénme?"
      },
      {
       "hz": "先生：你不舒服，快去休息吧。晚餐 ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Em không khoẻ, mau đi nghỉ đi. Bữa tối ….",
       "py": "Xiānshēng: Nǐ bù shūfú, kuài qù xiūxí ba. Wǎncān ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你看到朋友手裡拿了很多東西，沒辦法開門，你會說什麼？",
       "vi": "Bạn thấy bạn mình tay cầm nhiều đồ, không mở được cửa, bạn sẽ nói gì?",
       "py": "Nǐ kàndào péngyǒu shǒulǐ ná le hěnduō dōngxī, méi bànfǎ kāimén, nǐ huì shuō shénme?"
      },
      {
       "hz": "服務生很忙，沒幫客人倒水，如果你是客人，你會說什麼？ → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Nhân viên phục vụ rất bận, không rót nước cho khách, nếu bạn là khách, bạn sẽ nói gì? → ….",
       "py": "Fúwùshēng hěn máng, méi bāng kèrén dàoshuǐ, rúguǒ nǐ shì kèrén, nǐ huì shuō shénme? → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你喜歡哪種職業？",
       "vi": "Bạn thích nghề nào?",
       "py": "Nǐ xǐhuān nǎ zhǒng zhíyè?"
      },
      {
       "hz": "請寫出五種職業，這些職業的工作是什麼？為什麼你喜歡/不喜歡這個職業？",
       "vi": "Hãy viết ra năm nghề nghiệp, công việc của những nghề này là gì? Tại sao bạn thích / không thích nghề này?",
       "py": "Qǐng xiěchū wǔzhǒng zhíyè, zhèxiē zhíyè de gōngzuò shì shénme? Wèishénme nǐ xǐhuān / bù xǐhuān zhège zhíyè?"
      },
      {
       "hz": "做哪些事？",
       "vi": "Làm những việc gì?",
       "py": "Zuò nǎxiē shì?"
      },
      {
       "hz": "喜歡這個職業的原因看病、給病人藥、做研究......",
       "vi": "Lý do thích nghề này · Khám bệnh, kê thuốc cho bệnh nhân, làm nghiên cứu…",
       "py": "Xǐhuān zhège zhíyè de yuányīn kànbìng, gěi bìngrén yào, zuò yánjiù......"
      },
      {
       "hz": "求職的角色扮演兩個人一組，一個是公司老闆，一個是來找工作的人(可欣)。兩個人對工作內容、能力、上班時間等對話。",
       "vi": "Đóng vai xin việc: hai người một nhóm, một người là ông chủ công ty, một người là người đi xin việc (Khả Hân). Hai người trao đổi về nội dung công việc, năng lực, thời gian làm việc v.v.",
       "py": "Qiúzhí de juésèbànyǎn liǎnggè rén yìzǔ, yígè shì gōngsī lǎobǎn, yígè shì lái zhǎo gōngzuò de rén (Kěxīn). Liǎnggè rén duì gōngzuò nèiróng, nénglì, shàngbānshíjiān děng duìhuà."
      },
      {
       "hz": "可欣：請問這裡是OO貿易公司嗎？",
       "vi": "Khả Hân: Cho hỏi đây có phải công ty thương mại OO không ạ?",
       "py": "Kěxīn: Qǐngwèn zhèlǐ shì OO màoyì gōngsī ma?"
      },
      {
       "hz": "老闆：是啊！",
       "vi": "Ông chủ: Đúng rồi!",
       "py": "Lǎobǎn: Shì a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "N + 來 (+ V) — để tôi/ai đó làm",
   "giaiThich": "來 thay cho động từ đã rõ trong ngữ cảnh, thường khi xung phong làm gì (我來做, 我來幫忙). Trả lời 自己來 nghĩa là \"để tôi tự làm\"."
  }
 ],
 "td2-12.4": [
  {
   "title": "V. ...難怪... no wonder…",
   "points": [
    {
     "label": null,
     "formula": "Before “難怪”, there is usually an existing fact stated and unlikely to change, so no need to feel surprised. “難怪” is often followed by verb phrases. Sometimes when used in a conversation, the listener will be a little surprised after understanding a stated fact or reason.",
     "examples": [
      {
       "hz": "這個會開了五個小時還沒結束，難怪大家都累死了。\t2. 那個美國人在中國住了五年，難怪中文說得那麼好。3. 同事 A：經理說他感冒了，昨天晚上不但發燒，還一直咳嗽。同事 B：難怪他今天上班的時候，一直戴著口罩。",
       "vi": "Cuộc họp này kéo dài năm tiếng vẫn chưa kết thúc, thảo nào ai cũng mệt rã rời. Người Mỹ đó sống ở Trung Quốc năm năm, thảo nào nói tiếng Trung giỏi như vậy. Đồng nghiệp A: Giám đốc nói ông ấy bị cảm, tối qua không những sốt mà còn ho suốt. Đồng nghiệp B: Thảo nào hôm nay đi làm ông ấy cứ đeo khẩu trang.",
       "py": "Zhège huì kāi le wǔgè xiǎoshí hái méi jiéshù, nánguài dàjiā dōu lèisǐ le. 2. Nàge Měiguó rén zài Zhōngguó zhù le wǔnián, nánguài zhōngwén shuō de nàme hǎo. 3. Tóngshì A: Jīnglǐ shuō tā gǎnmào le, zuótiānwǎnshàng búdàn fāshāo, hái yìzhí késòu. Tóngshì B: Nánguài tā jīntiān shàngbān de shíhòu, yìzhí dài zhe kǒuzhào."
      },
      {
       "hz": "他昨天晚上拉肚子，難怪 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Tối qua anh ấy bị tiêu chảy, thảo nào ….",
       "py": "Tā zuótiānwǎnshàng lādùzi, nánguài ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：下個星期我有很重要的球賽，一定要贏。",
       "vi": "A: Tuần sau tôi có trận đấu rất quan trọng, nhất định phải thắng.",
       "py": "A: Xiàgèxīngqí wǒ yǒu hěn zhòngyào de qiúsài, yídìng yào yíng."
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ，週末也不休息。",
       "vi": "B: …, cuối tuần cũng không nghỉ.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhōumò yě bù xiūxí."
      },
      {
       "hz": "A：張教授不但知識豐富,他教的專業課程也都很有意思。",
       "vi": "A: Giáo sư Trương không những kiến thức phong phú, các môn chuyên ngành thầy dạy cũng rất thú vị.",
       "py": "A: Zhāng jiàoshòu búdàn zhīshì fēngfù, tā jiào de zhuānyèkèchéng yě dōu hěn yǒuyìsi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "難怪 — thảo nào",
   "giaiThich": "Phía trước 難怪 là sự thật đã biết; vì thế điều nói sau không có gì đáng ngạc nhiên. Sau 難怪 thường là cụm động từ."
  },
  {
   "title": "VI. V 得了/ V不 了 capability complement 了",
   "points": [
    {
     "label": null,
     "formula": "The pattern “ V+得了” shows one’s ability to achieve something or cause a certain result. Its negative from is “ V不了”. The verbs used in this pattern are often monosyllabic, such as “吃(eat) ”, “忘(forget) ” “拿(take) ”, “做(do) ”, “到(reach) ”,“管(manage) ”,etc. This pattern is different from“ V 了”. The former shows likelihood, while the latter implies that something has been done e.g.,“吃了” and“做了”. Respectfully Yours, honorific, used when writing to an elder family member or VIP instead of a friend or a person of equal position In this pattern, “個” serves as a particle showing that an action only lasts for a short time or something is done in a relaxing and easy manner. Verb-object separable words are often used in this pattern, such as “喝個茶”, “唱個歌”, “跳個舞”, etc.",
     "examples": [
      {
       "hz": "你買了這麼多東西，一個人拿得了嗎？2.我們只有三個人，吃不了這麼多菜。3.媽媽一個人做不了那麼多家事，所以我的房間自己打掃。",
       "vi": "Bạn mua nhiều đồ thế này, một mình mang nổi không? Chúng tôi chỉ có ba người, ăn không hết nhiều món thế này. Mẹ một mình làm không xuể nhiều việc nhà như vậy, nên phòng tôi tôi tự dọn.",
       "py": "Nǐ mǎi le zhème duō dōngxī, yígè rén ná de le ma? 2. Wǒmen zhǐyǒu sāngè rén, chī bùliǎo zhème duō cài. 3. Māma yígè rén zuòbùliǎo nàme duōjiā shì, suǒyǐ wǒ de fángjiān zìjǐ dǎsǎo."
      },
      {
       "hz": "你不運動，三餐又吃得那麼多，體重當然ˍˍˍˍˍˍˍˍ。",
       "vi": "Bạn không tập thể dục, ba bữa lại ăn nhiều như vậy, cân nặng đương nhiên ….",
       "py": "Nǐ bú yùndòng, sāncān yòu chī de nàme duō, tǐzhòng dāngrán ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "從台灣坐飛機到越南去，兩個小時 ˍˍˍˍˍˍˍˍˍ嗎？",
       "vi": "Từ Đài Loan đi máy bay sang Việt Nam, hai tiếng có … không?",
       "py": "Cóng Táiwān zuòfēijī dào Yuènán qù, liǎnggè xiǎoshí ˍˍˍˍˍˍˍˍˍ ma?"
      },
      {
       "hz": "王先生 ˍˍˍˍˍˍˍˍˍˍ第一次跟女朋友約會的經驗。",
       "vi": "Anh Vương … trải nghiệm lần đầu hẹn hò với bạn gái.",
       "py": "Wáng xiānshēng ˍˍˍˍˍˍˍˍˍˍ dìyīcì gēn nǚpéngyǒu yuēhuì de jīngyàn."
      },
      {
       "hz": "可欣寫信給誰？為什麼這封信是「自我推薦」？",
       "vi": "Khả Hân viết thư cho ai? Tại sao bức thư này là thư “tự giới thiệu”?",
       "py": "Kěxīn xiěxìngěi shéi? Wèishénme zhè fēngxìn shì “zìwǒ tuījiàn”?"
      },
      {
       "hz": "請你介紹一下可欣的家人。",
       "vi": "Hãy giới thiệu về gia đình của Khả Hân.",
       "py": "Qǐng nǐ jièshào yíxià Kěxīn de jiārén."
      },
      {
       "hz": "這個暑假，可欣想要去哪裡打工？為什麼？",
       "vi": "Kỳ nghỉ hè này Khả Hân muốn đi làm thêm ở đâu? Tại sao?",
       "py": "Zhège shǔjià, Kěxīn xiǎngyào qù nǎlǐ dǎgōng? Wèishénme?"
      },
      {
       "hz": "可欣覺得打工的收穫是什麼？",
       "vi": "Khả Hân thấy làm thêm thu hoạch được gì?",
       "py": "Kěxīn juéde dǎgōng de shōuhuò shì shénme?"
      },
      {
       "hz": "可欣打過什麼工？你呢？",
       "vi": "Khả Hân đã từng làm thêm những việc gì? Còn bạn?",
       "py": "Kěxīn dǎ guò shénme gōng? Nǐ ne?"
      },
      {
       "hz": "如果你是李老闆，你願意給可欣打工的機會嗎？為什麼？",
       "vi": "Nếu bạn là ông chủ Lý, bạn có muốn cho Khả Hân cơ hội làm thêm không? Tại sao?",
       "py": "Rúguǒ nǐ shì Lǐ lǎobǎn, nǐ yuànyì gěi Kěxīn dǎgōng de jīhuì ma? Wèishénme?"
      },
      {
       "hz": "有打工的經驗，對你將來的職業有幫助嗎？為什麼？",
       "vi": "Kinh nghiệm làm thêm có giúp ích cho nghề nghiệp sau này của bạn không? Tại sao?",
       "py": "Yǒu dǎgōng de jīngyàn, duì nǐ jiānglái de zhíyè yǒu bāngzhù ma? Wèishénme?"
      },
      {
       "hz": "弟弟昨天夜裡兩點才睡覺，難怪早上起不來。",
       "vi": "Tối qua hai giờ sáng em trai mới đi ngủ, thảo nào sáng nay không dậy nổi.",
       "py": "Dìdi zuótiānyèlǐ liǎngdiǎn cái shuìjiào, nánguài zǎoshàng qǐbùlái."
      },
      {
       "hz": "我覺得洗個碗、倒個垃圾都是很簡單的家事。2. 爸爸每天下班回家，都先看個電視再吃晚飯。3. 這個週末我想先去KTV唱個歌，再去看個電影，輕鬆一下。",
       "vi": "Tôi thấy rửa bát, đổ rác đều là những việc nhà rất đơn giản. Ngày nào bố đi làm về cũng xem tivi một lát rồi mới ăn tối. Cuối tuần này tôi muốn đi hát karaoke một chút, rồi xem một bộ phim, thư giãn một chút.",
       "py": "Wǒ juéde xǐ gè wǎn, dào gè lèsè dōu shì hěn jiǎndān de jiāshì. 2. Bàba měitiān xiàbān huíjiā, dōu xiān kàn gè diànshì zài chīwǎnfàn. 3. Zhège zhōumò wǒ xiǎng xiān qù KTV chàng gè gē, zài qù kàn gè diànyǐng, qīngsōng yíxià."
      },
      {
       "hz": "今天天氣很好，妳會跟先生說什麼？",
       "vi": "Hôm nay trời rất đẹp, chị sẽ nói gì với chồng?",
       "py": "Jīntiāntiānqì hěn hǎo, nǐhuì gēn xiānshēng shuō shénme?"
      },
      {
       "hz": "室友覺得頭很痛，可是他想去上課，你會跟他說什麼？",
       "vi": "Bạn cùng phòng thấy rất đau đầu nhưng vẫn muốn đi học, bạn sẽ nói gì với cậu ấy?",
       "py": "Shìyǒu juéde tóu hěn tòng, kěshì tā xiǎng qù shàngkè, nǐ huì gēn tā shuō shénme?"
      },
      {
       "hz": "朋友去你家，他要走的時候已經晚上六點了，你會跟他說什麼？",
       "vi": "Bạn đến nhà bạn chơi, lúc về thì đã sáu giờ tối rồi, bạn sẽ nói gì với họ?",
       "py": "Péngyǒu qù nǐjiā, tā yào zǒu de shíhòu yǐjīng wǎnshàng liùdiǎn le, nǐ huì gēn tā shuō shénme?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "V 得了 / V 不了 — làm nổi / không nổi",
   "giaiThich": "Chỉ khả năng làm được hay không làm được việc gì; động từ dùng thường là đơn âm (吃, 走, 做…)."
  },
  {
   "title": "II. N/NP + 來(+V) let N/NP do something",
   "points": [
    {
     "label": null,
     "formula": "In this pattern, “來” refers to an omitted verb and is often used when there is a specific action, e.g., “我來做” and “我來幫忙”. If the dialogue responds with “自己來”, it indicates that the speaker doesn’t want to bother the other person. It is a polite statement.",
     "examples": [
      {
       "hz": "我做了很多菜，你想吃什麼，自己來，別客氣。2. 上網訂票、找資料、寫報告，這些事情李老闆都讓助理來。3. A:像洗碗、打掃房間這樣的事，那個孩子都做不好。 B:他才五歲，這些事最好讓父母來(做)。",
       "vi": "Tôi nấu nhiều món lắm, bạn muốn ăn gì thì tự lấy nhé, đừng khách sáo. Đặt vé qua mạng, tìm tài liệu, viết báo cáo — những việc này ông chủ Lý đều để trợ lý làm. A: Những việc như rửa bát, dọn phòng, đứa bé đó đều làm không tốt. B: Cháu mới năm tuổi, những việc này tốt nhất để bố mẹ làm.",
       "py": "Wǒ zuò le hěnduō cài, nǐ xiǎng chī shénme, zìjǐ lái, bié kèqì. 2. Shàngwǎng dìngpiào, zhǎo zīliào, xiě bàogào, zhèxiē shìqíng Lǐ lǎobǎn dōu ràng zhùlǐ lái. 3. A: Xiàng xǐwǎn, dǎsǎo fángjiān zhèyàng de shì, nàge háizi dōu zuò bùhǎo. B: Tā cái wǔsuì, zhèxiē shì zuìhǎo ràng fùmǔ lái (zuò)."
      },
      {
       "hz": "太太：我要做晚飯了，你想吃什麼？",
       "vi": "Vợ: Em chuẩn bị nấu cơm tối đây, anh muốn ăn gì?",
       "py": "Tàitai: Wǒ yào zuò wǎnfàn le, nǐ xiǎng chī shénme?"
      },
      {
       "hz": "先生：你不舒服，快去休息吧。晚餐 ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Chồng: Em không khoẻ, mau đi nghỉ đi. Bữa tối ….",
       "py": "Xiānshēng: Nǐ bù shūfú, kuài qù xiūxí ba. Wǎncān ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你看到朋友手裡拿了很多東西，沒辦法開門，你會說什麼？",
       "vi": "Bạn thấy bạn mình tay cầm nhiều đồ, không mở được cửa, bạn sẽ nói gì?",
       "py": "Nǐ kàndào péngyǒu shǒulǐ ná le hěnduō dōngxī, méi bànfǎ kāimén, nǐ huì shuō shénme?"
      },
      {
       "hz": "服務生很忙，沒幫客人倒水，如果你是客人，你會說什麼？ → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Nhân viên phục vụ rất bận, không rót nước cho khách, nếu bạn là khách, bạn sẽ nói gì? → ….",
       "py": "Fúwùshēng hěn máng, méi bāng kèrén dàoshuǐ, rúguǒ nǐ shì kèrén, nǐ huì shuō shénme? → ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "你喜歡哪種職業？",
       "vi": "Bạn thích nghề nào?",
       "py": "Nǐ xǐhuān nǎ zhǒng zhíyè?"
      },
      {
       "hz": "請寫出五種職業，這些職業的工作是什麼？為什麼你喜歡/不喜歡這個職業？",
       "vi": "Hãy viết ra năm nghề nghiệp, công việc của những nghề này là gì? Tại sao bạn thích / không thích nghề này?",
       "py": "Qǐng xiěchū wǔzhǒng zhíyè, zhèxiē zhíyè de gōngzuò shì shénme? Wèishénme nǐ xǐhuān / bù xǐhuān zhège zhíyè?"
      },
      {
       "hz": "做哪些事？",
       "vi": "Làm những việc gì?",
       "py": "Zuò nǎxiē shì?"
      },
      {
       "hz": "喜歡這個職業的原因看病、給病人藥、做研究......",
       "vi": "Lý do thích nghề này · Khám bệnh, kê thuốc cho bệnh nhân, làm nghiên cứu…",
       "py": "Xǐhuān zhège zhíyè de yuányīn kànbìng, gěi bìngrén yào, zuò yánjiù......"
      },
      {
       "hz": "求職的角色扮演兩個人一組，一個是公司老闆，一個是來找工作的人(可欣)。兩個人對工作內容、能力、上班時間等對話。",
       "vi": "Đóng vai xin việc: hai người một nhóm, một người là ông chủ công ty, một người là người đi xin việc (Khả Hân). Hai người trao đổi về nội dung công việc, năng lực, thời gian làm việc v.v.",
       "py": "Qiúzhí de juésèbànyǎn liǎnggè rén yìzǔ, yígè shì gōngsī lǎobǎn, yígè shì lái zhǎo gōngzuò de rén (Kěxīn). Liǎnggè rén duì gōngzuò nèiróng, nénglì, shàngbānshíjiān děng duìhuà."
      },
      {
       "hz": "可欣：請問這裡是OO貿易公司嗎？",
       "vi": "Khả Hân: Cho hỏi đây có phải công ty thương mại OO không ạ?",
       "py": "Kěxīn: Qǐngwèn zhèlǐ shì OO màoyì gōngsī ma?"
      },
      {
       "hz": "老闆：是啊！",
       "vi": "Ông chủ: Đúng rồi!",
       "py": "Lǎobǎn: Shì a!"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "N + 來 (+ V) — để tôi/ai đó làm",
   "giaiThich": "來 thay cho động từ đã rõ trong ngữ cảnh, thường khi xung phong làm gì (我來做, 我來幫忙). Trả lời 自己來 nghĩa là \"để tôi tự làm\"."
  }
 ],
 "td2-13.1": [
  {
   "title": "III. Vs 了 (一)點兒 a little bit Vs …",
   "points": [
    {
     "label": null,
     "formula": "1. 這堂美術課很有意思，可是學生多了一點兒。2. 健身雖然對身體有很多好處，但是健身房的費用高了一點兒。3.  A：聽說你趁這次春假去了日月潭，那裡的風景怎麼樣？     B：日月潭很美，花也都開了。可惜人太多，擠了點兒。 This pattern is used when the speaker wants to show a situation is not as good as expected, but there is not much difference. Usually, it implies minor weaknesses or complaints. For example, “這支手機不錯，可是貴了一點兒(This cell phone is not bad, but it is a little bit expensive.)” In the example the speaker thinks the cell phone is more expensive than he expects, but it is not a big issue. 請用提示完成句子。 Complete sentences with given words. 3C (Computers, Communication, Consumer-Electronic) product \"比\" is a preposition that indicates the status of the subject when a comparison is  made. “比” is followed by the compared object, e.g., “我比你高” and “公車比火車便宜” , equivalent to “than” in English. “比較” is an adverb that indicates a higher or lower degree, e.g., “台灣比較熱” and “坐公車比較便宜”, equivalent to “more” in English The subject is placed before “比較”, while the stative verb is placed after it. “比起來” is a phrase that shows the remark about one thing as compared to another. The common pattern is “(A/B)跟B/A比起來，A/B比較......” , e.g., “(你)跟他比起來，你比較漂亮” and “(我)跟你比起來，我沒有你那麼漂亮。” “差一點” is usually followed by verbs or verb phrases. This pattern is usually used in a situation when something which the speaker did not wish almost happened. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他的中文說得不錯，可是 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Anh ấy nói tiếng Trung khá giỏi, nhưng ….",
       "py": "Tā de zhōngwén shuō de búcuò, kěshì ˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "做愛心服務雖然 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Làm thiện nguyện tuy …",
       "py": "Zuò àixīn fúwù suīrán ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "在外國生活 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Sống ở nước ngoài ….",
       "py": "Zài wàiguó shēnghuó ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "良介買電腦以前，怎麼準備？",
       "vi": "Trước khi mua máy tính, Ryosuke đã chuẩn bị thế nào?",
       "py": "Liángjiè mǎi diànnǎo yǐqián, zěnme zhǔnbèi?"
      },
      {
       "hz": "那家3C產品店的店員好嗎？為什麼？",
       "vi": "Nhân viên cửa hàng đồ điện tử đó có tốt không? Tại sao?",
       "py": "Nà jiā 3C chǎnpǐn diàn de diànyuán hǎo ma? Wèishénme?"
      },
      {
       "hz": "良介覺得店員建議他買的電腦怎麼樣？",
       "vi": "Ryosuke thấy chiếc máy tính nhân viên gợi ý thế nào?",
       "py": "Liángjiè juéde diànyuán jiànyì tā mǎi de diànnǎo zěnmeyàng?"
      },
      {
       "hz": "為什麼後來良介買得起那部電腦了？",
       "vi": "Tại sao sau đó Ryosuke lại mua nổi chiếc máy tính đó?",
       "py": "Wèishénme hòulái Liángjiè mǎideqǐ nà bù diànnǎo le?"
      },
      {
       "hz": "為什麼良介說自己很糊塗？",
       "vi": "Tại sao Ryosuke nói mình rất đãng trí?",
       "py": "Wèishénme Liángjiè shuō zìjǐ hěn hútú?"
      },
      {
       "hz": "良介這次買電腦的經驗怎麼樣？省了什麼麻煩？",
       "vi": "Lần mua máy tính này của Ryosuke thế nào? Đã tránh được phiền phức gì?",
       "py": "Liángjiè zhècì mǎi diànnǎo de jīngyàn zěnmeyàng? Shěng le shénme máfán?"
      },
      {
       "hz": "你買過科技產品嗎？你覺得那些產品有什麼好處？",
       "vi": "Bạn đã từng mua sản phẩm công nghệ chưa? Bạn thấy những sản phẩm đó có lợi ích gì?",
       "py": "Nǐ mǎi guò kējì chǎnpǐn ma? Nǐ juéde nàxiē chǎnpǐn yǒu shénme hǎochù?"
      },
      {
       "hz": "你覺得電腦的功能、價格，電腦輕或重，重要嗎？為什麼？",
       "vi": "Bạn thấy chức năng, giá cả, máy tính nhẹ hay nặng có quan trọng không? Tại sao?",
       "py": "Nǐ juéde diànnǎo de gōngnéng, jiàgé, diànnǎo qīng huò zhòng, zhòngyào ma? Wèishénme?"
      },
      {
       "hz": "他上禮拜去買電腦，差點兒就忘了自己的手機，真糊塗！",
       "vi": "Tuần trước anh ấy đi mua máy tính, suýt nữa quên cả điện thoại của mình, đãng trí thật!",
       "py": "Tā shàng lǐbài qù mǎi diànnǎo, chàdiǎn'ér jiù wàng le zìjǐ de shǒujī, zhēn hútú!"
      },
      {
       "hz": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來。平板比筆電便宜，所以我比較想買平板。",
       "vi": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來. Máy tính bảng rẻ hơn laptop, nên tôi muốn mua máy tính bảng hơn.",
       "py": "Bǐ, bǐjiào, bǐ qǐlái— c â u so s á nh v ớ i bǐ, bǐjiào v à bǐ qǐlái. Píngbǎn bǐ bǐ diàn piányi, suǒyǐ wǒ bǐjiào xiǎng mǎi píngbǎn."
      },
      {
       "hz": "跟國外旅遊比起來，大部分的國內旅遊便宜一點兒。",
       "vi": "So với du lịch nước ngoài, phần lớn du lịch trong nước rẻ hơn một chút.",
       "py": "Gēn guówài lǚyóu bǐ qǐlái, dàbùfèn de guónèi lǚyóu piányi yìdiǎn'ér."
      },
      {
       "hz": "雖然筆電的功能比平板好，可是跟平板比起來，筆電比較重。",
       "vi": "Tuy laptop có chức năng tốt hơn máy tính bảng, nhưng so với máy tính bảng thì laptop nặng hơn.",
       "py": "Suīrán bǐ diàn de gōngnéng bǐ píngbǎn hǎo, kěshì gēn píngbǎn bǐ qǐlái, bǐ diàn bǐjiào zhòng."
      },
      {
       "hz": "跟他做的菜 ˍˍˍˍˍˍˍ ，我做的 ˍˍˍˍˍˍˍ 好吃。",
       "vi": "So với món anh ấy nấu …, món tôi nấu … ngon hơn.",
       "py": "Gēn tā zuò de cài ˍˍˍˍˍˍˍ, wǒ zuò de ˍˍˍˍˍˍˍ hǎochī."
      },
      {
       "hz": "跟台灣 ˍˍˍˍˍˍ ，我的國家 ˍˍˍˍˍˍ 台灣熱多了。",
       "vi": "So với Đài Loan …, nước tôi … nóng hơn Đài Loan nhiều.",
       "py": "Gēn Táiwān ˍˍˍˍˍˍ, wǒ de guójiā ˍˍˍˍˍˍ Táiwān rè duō le."
      },
      {
       "hz": "跟中文 ˍˍˍˍˍ ，英文 ˍˍˍˍˍ 有用，可是在台灣，說中文的人 ˍˍˍˍˍ 說英文的多得多，所以我 ˍˍˍˍˍ 想學中文。",
       "vi": "So với tiếng Trung …, tiếng Anh … có ích hơn, nhưng ở Đài Loan người nói tiếng Trung … nhiều hơn người nói tiếng Anh rất nhiều, nên tôi … muốn học tiếng Trung hơn.",
       "py": "Gēn zhōngwén ˍˍˍˍˍ, yīngwén ˍˍˍˍˍ yǒuyòng, kěshì zài Táiwān, shuō zhōngwén de rén ˍˍˍˍˍ shuō yīngwén de duōdeduō, suǒyǐ wǒ ˍˍˍˍˍ xiǎng xué zhōngwén."
      },
      {
       "hz": "請用「比/比較/比起來」完成句子。",
       "vi": "Hoàn thành câu bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng jùzi."
      },
      {
       "hz": "A：有人說吃青菜比吃肉健康，你覺得呢？",
       "vi": "A: Có người nói ăn rau tốt cho sức khoẻ hơn ăn thịt, bạn thấy sao?",
       "py": "A: Yǒurén shuō chī qīngcài bǐ chī ròu jiànkāng, nǐ juéde ne?"
      },
      {
       "hz": "A：中文的發音跟漢字，你覺得哪個難？",
       "vi": "A: Phát âm và chữ Hán của tiếng Trung, bạn thấy cái nào khó hơn?",
       "py": "A: Zhōngwén de fāyīn gēn hànzì, nǐ juéde nǎge nán?"
      },
      {
       "hz": "A：如果一定要選一個社團，你想參加鋼琴社還是吉他社？",
       "vi": "A: Nếu bắt buộc phải chọn một câu lạc bộ, bạn muốn tham gia câu lạc bộ piano hay guitar?",
       "py": "A: Rúguǒ yídìng yào xuǎn yígè shètuán, nǐ xiǎng cānjiā gāngqín shè háishì jítāshè?"
      },
      {
       "hz": "請用「比/比較/比起來」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng duìhuà."
      },
      {
       "hz": "我以為我的手機不見了，差一點就要去買新的。2. 他吃了不新鮮的食物，拉了三天的肚子，差一點就死了。3. 我差點忘了今天要考試，還好你告訴我，要不然這門課我一定會被當。",
       "vi": "Tôi tưởng điện thoại mất rồi, suýt nữa thì đi mua cái mới. Anh ấy ăn phải đồ không tươi, bị tiêu chảy ba ngày, suýt nữa thì chết. Tôi suýt quên hôm nay có bài thi, may mà bạn nhắc, nếu không môn này chắc chắn tôi bị trượt.",
       "py": "Wǒ yǐwéi wǒ de shǒujī bújiàn le, chàyìdiǎn jiùyào qù mǎi xīn de. 2. Tā chī le bù xīnxiān de shíwù, lā le sāntiān de dùzi, chàyìdiǎn jiù sǐ le. 3. Wǒ chàdiǎn wàng le jīntiān yào kǎoshì, háihǎo nǐ gàosù wǒ, yàobùrán zhè mén kè wǒ yídìng huì bèi dāng."
      },
      {
       "hz": "我以為你放在地上的那些東西是垃圾，ˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Tôi tưởng những thứ bạn để trên sàn là rác, ….",
       "py": "Wǒ yǐwéi nǐ fàngzài dìshàng de nàxiē dōngxī shì lèsè, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "公司大樓十一點關門，我忙到十點五十九分才下班， ˍˍˍˍˍˍˍˍ。",
       "vi": "Toà nhà công ty đóng cửa lúc mười một giờ, tôi bận đến mười giờ năm mươi chín mới tan làm, ….",
       "py": "Gōngsī dàlóu shíyìdiǎn guānmén, wǒ máng dào shídiǎnwǔ shíjiǔfēn cái xiàbān, ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我剛剛給朋友打電話時，因為號碼跟老師的差不多， ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Lúc nãy tôi gọi điện cho bạn, vì số điện thoại gần giống số của thầy giáo, ….",
       "py": "Wǒ gānggāng gěi péngyǒu dǎdiànhuà shí, yīnwèi hàomǎ gēn lǎoshī de chàbuduō, ˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 了 (一)點兒 — hơi… một chút",
   "giaiThich": "Dùng khi người nói thấy tình huống chưa được như ý: \"hơi đông một chút\", \"hơi đắt một chút\"."
  },
  {
   "title": "III. 白 + V in vain, for nothing",
   "points": [
    {
     "label": null,
     "formula": "“白” should be followed by a verb, often a monosyllabic verb. It indicates an action is carried out with no effects it should have. Note when collocating with some verbs such as “吃(eat)”, “喝(drink)” and “住(live)” , it means “unwilling to pay money or make effort”, e.g., ”他常常來我家白吃白喝”. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "我說了這麼多次，你還是沒聽懂，真是白說了。2. 那家餐廳很遠，你先打電話問他們今天做不做生意，別白跑了！",
       "vi": "Tôi nói bao nhiêu lần rồi mà bạn vẫn không hiểu, đúng là nói uổng công. Nhà hàng đó rất xa, bạn gọi điện hỏi trước xem hôm nay họ có mở cửa không, kẻo đi uổng công!",
       "py": "Wǒ shuō le zhème duōcì, nǐ háishì méi tīngdǒng, zhēnshì bái shuō le. 2. Nà jiā cāntīng hěn yuǎn, nǐ xiān dǎdiànhuà wèn tāmen jīntiān zuò bú zuòshēngyì, bié báipǎo le!"
      },
      {
       "hz": "我把野餐要吃的三明治都準備好了，可是朋友忽然說不去了，我白準備了。",
       "vi": "Tôi đã chuẩn bị xong bánh mì kẹp cho buổi dã ngoại, nhưng bạn tôi đột nhiên nói không đi nữa, tôi chuẩn bị uổng công.",
       "py": "Wǒ bǎ yěcān yào chī de sānmíngzhì dōu zhǔnbèi hǎo le, kěshì péngyǒu hūrán shuō bú qù le, wǒ bái zhǔnbèi le."
      },
      {
       "hz": "我用電腦寫報告，電腦忽然壞了， ˍˍˍˍˍˍˍˍˍ 。(寫)2. 我買了一盒豆漿給他，可是他不喝， ˍˍˍˍˍˍˍˍ 。(買)3. 先生：朋友剛剛請我到餐廳去吃飯，現在一點兒也不餓。",
       "vi": "Tôi dùng máy tính viết báo cáo, máy tính đột nhiên hỏng, …. (viết) Tôi mua cho anh ấy một hộp sữa đậu nành, nhưng anh ấy không uống, …. (mua) Chồng: Vừa nãy bạn mời anh đi ăn nhà hàng, bây giờ anh chẳng đói chút nào.",
       "py": "Wǒ yòng diànnǎo xiě bàogào, diànnǎo hūrán huài le, ˍˍˍˍˍˍˍˍˍ. (xiě) 2. Wǒ mǎi le yìhé dòujiāng gěi tā, kěshì tā bù hē, ˍˍˍˍˍˍˍˍ. (mǎi) 3. Xiānshēng: Péngyǒu gānggāng qǐng wǒ dào cāntīng qù chīfàn, xiànzài yìdiǎn'ér yě bú è."
      },
      {
       "hz": "太太：我做了好吃的晚餐， ˍˍˍˍˍˍˍˍˍˍˍ 。(做)",
       "vi": "Vợ: Em nấu bữa tối ngon như vậy, …. (nấu)",
       "py": "Tàitai: Wǒ zuò le hǎochī de wǎncān, ˍˍˍˍˍˍˍˍˍˍˍ. (zuò)"
      },
      {
       "hz": "請你問三個同學，他們買 3C 產品的時候，覺得什麼最重要？為什麼？",
       "vi": "Hãy hỏi ba bạn học xem khi mua sản phẩm điện tử, họ thấy điều gì quan trọng nhất? Tại sao?",
       "py": "Qǐng nǐ wèn sāngè tóngxué, tāmen mǎi 3C chǎnpǐn de shíhòu, juéde shénme zuì zhòngyào? Wèishénme?"
      },
      {
       "hz": "在前一個活動，你問了同學們的想法，現在請你報告：你跟同學的想法哪裡不一樣？",
       "vi": "Ở hoạt động trước bạn đã hỏi ý kiến các bạn, bây giờ hãy báo cáo: suy nghĩ của bạn và các bạn khác nhau ở chỗ nào?",
       "py": "Zài qián yígè huódòng, nǐ wèn le tóngxuémen de xiǎngfǎ, xiànzài qǐng nǐ bàogào: Nǐ gēn tóngxué de xiǎngfǎ nǎlǐ bù yíyàng?"
      },
      {
       "hz": "為什麼不一樣？(請你使用下面的語法說明。)",
       "vi": "Tại sao lại khác nhau? (Hãy dùng ngữ pháp dưới đây để giải thích.)",
       "py": "Wèishénme bù yíyàng? (qǐng nǐ shǐyòng xiàmiàn de yǔfǎ shuōmíng.)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "白 + động từ — làm uổng công",
   "giaiThich": "白 đứng trước động từ (thường đơn âm), nghĩa việc đã làm mà không có kết quả gì (白跑一趟 — đi uổng công)."
  }
 ],
 "td2-13.2": [
  {
   "title": "III. Vs 了 (一)點兒 a little bit Vs …",
   "points": [
    {
     "label": null,
     "formula": "1. 這堂美術課很有意思，可是學生多了一點兒。2. 健身雖然對身體有很多好處，但是健身房的費用高了一點兒。3.  A：聽說你趁這次春假去了日月潭，那裡的風景怎麼樣？     B：日月潭很美，花也都開了。可惜人太多，擠了點兒。 This pattern is used when the speaker wants to show a situation is not as good as expected, but there is not much difference. Usually, it implies minor weaknesses or complaints. For example, “這支手機不錯，可是貴了一點兒(This cell phone is not bad, but it is a little bit expensive.)” In the example the speaker thinks the cell phone is more expensive than he expects, but it is not a big issue. 請用提示完成句子。 Complete sentences with given words. 3C (Computers, Communication, Consumer-Electronic) product \"比\" is a preposition that indicates the status of the subject when a comparison is  made. “比” is followed by the compared object, e.g., “我比你高” and “公車比火車便宜” , equivalent to “than” in English. “比較” is an adverb that indicates a higher or lower degree, e.g., “台灣比較熱” and “坐公車比較便宜”, equivalent to “more” in English The subject is placed before “比較”, while the stative verb is placed after it. “比起來” is a phrase that shows the remark about one thing as compared to another. The common pattern is “(A/B)跟B/A比起來，A/B比較......” , e.g., “(你)跟他比起來，你比較漂亮” and “(我)跟你比起來，我沒有你那麼漂亮。” “差一點” is usually followed by verbs or verb phrases. This pattern is usually used in a situation when something which the speaker did not wish almost happened. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他的中文說得不錯，可是 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Anh ấy nói tiếng Trung khá giỏi, nhưng ….",
       "py": "Tā de zhōngwén shuō de búcuò, kěshì ˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "做愛心服務雖然 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Làm thiện nguyện tuy …",
       "py": "Zuò àixīn fúwù suīrán ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "在外國生活 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Sống ở nước ngoài ….",
       "py": "Zài wàiguó shēnghuó ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "良介買電腦以前，怎麼準備？",
       "vi": "Trước khi mua máy tính, Ryosuke đã chuẩn bị thế nào?",
       "py": "Liángjiè mǎi diànnǎo yǐqián, zěnme zhǔnbèi?"
      },
      {
       "hz": "那家3C產品店的店員好嗎？為什麼？",
       "vi": "Nhân viên cửa hàng đồ điện tử đó có tốt không? Tại sao?",
       "py": "Nà jiā 3C chǎnpǐn diàn de diànyuán hǎo ma? Wèishénme?"
      },
      {
       "hz": "良介覺得店員建議他買的電腦怎麼樣？",
       "vi": "Ryosuke thấy chiếc máy tính nhân viên gợi ý thế nào?",
       "py": "Liángjiè juéde diànyuán jiànyì tā mǎi de diànnǎo zěnmeyàng?"
      },
      {
       "hz": "為什麼後來良介買得起那部電腦了？",
       "vi": "Tại sao sau đó Ryosuke lại mua nổi chiếc máy tính đó?",
       "py": "Wèishénme hòulái Liángjiè mǎideqǐ nà bù diànnǎo le?"
      },
      {
       "hz": "為什麼良介說自己很糊塗？",
       "vi": "Tại sao Ryosuke nói mình rất đãng trí?",
       "py": "Wèishénme Liángjiè shuō zìjǐ hěn hútú?"
      },
      {
       "hz": "良介這次買電腦的經驗怎麼樣？省了什麼麻煩？",
       "vi": "Lần mua máy tính này của Ryosuke thế nào? Đã tránh được phiền phức gì?",
       "py": "Liángjiè zhècì mǎi diànnǎo de jīngyàn zěnmeyàng? Shěng le shénme máfán?"
      },
      {
       "hz": "你買過科技產品嗎？你覺得那些產品有什麼好處？",
       "vi": "Bạn đã từng mua sản phẩm công nghệ chưa? Bạn thấy những sản phẩm đó có lợi ích gì?",
       "py": "Nǐ mǎi guò kējì chǎnpǐn ma? Nǐ juéde nàxiē chǎnpǐn yǒu shénme hǎochù?"
      },
      {
       "hz": "你覺得電腦的功能、價格，電腦輕或重，重要嗎？為什麼？",
       "vi": "Bạn thấy chức năng, giá cả, máy tính nhẹ hay nặng có quan trọng không? Tại sao?",
       "py": "Nǐ juéde diànnǎo de gōngnéng, jiàgé, diànnǎo qīng huò zhòng, zhòngyào ma? Wèishénme?"
      },
      {
       "hz": "他上禮拜去買電腦，差點兒就忘了自己的手機，真糊塗！",
       "vi": "Tuần trước anh ấy đi mua máy tính, suýt nữa quên cả điện thoại của mình, đãng trí thật!",
       "py": "Tā shàng lǐbài qù mǎi diànnǎo, chàdiǎn'ér jiù wàng le zìjǐ de shǒujī, zhēn hútú!"
      },
      {
       "hz": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來。平板比筆電便宜，所以我比較想買平板。",
       "vi": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來. Máy tính bảng rẻ hơn laptop, nên tôi muốn mua máy tính bảng hơn.",
       "py": "Bǐ, bǐjiào, bǐ qǐlái— c â u so s á nh v ớ i bǐ, bǐjiào v à bǐ qǐlái. Píngbǎn bǐ bǐ diàn piányi, suǒyǐ wǒ bǐjiào xiǎng mǎi píngbǎn."
      },
      {
       "hz": "跟國外旅遊比起來，大部分的國內旅遊便宜一點兒。",
       "vi": "So với du lịch nước ngoài, phần lớn du lịch trong nước rẻ hơn một chút.",
       "py": "Gēn guówài lǚyóu bǐ qǐlái, dàbùfèn de guónèi lǚyóu piányi yìdiǎn'ér."
      },
      {
       "hz": "雖然筆電的功能比平板好，可是跟平板比起來，筆電比較重。",
       "vi": "Tuy laptop có chức năng tốt hơn máy tính bảng, nhưng so với máy tính bảng thì laptop nặng hơn.",
       "py": "Suīrán bǐ diàn de gōngnéng bǐ píngbǎn hǎo, kěshì gēn píngbǎn bǐ qǐlái, bǐ diàn bǐjiào zhòng."
      },
      {
       "hz": "跟他做的菜 ˍˍˍˍˍˍˍ ，我做的 ˍˍˍˍˍˍˍ 好吃。",
       "vi": "So với món anh ấy nấu …, món tôi nấu … ngon hơn.",
       "py": "Gēn tā zuò de cài ˍˍˍˍˍˍˍ, wǒ zuò de ˍˍˍˍˍˍˍ hǎochī."
      },
      {
       "hz": "跟台灣 ˍˍˍˍˍˍ ，我的國家 ˍˍˍˍˍˍ 台灣熱多了。",
       "vi": "So với Đài Loan …, nước tôi … nóng hơn Đài Loan nhiều.",
       "py": "Gēn Táiwān ˍˍˍˍˍˍ, wǒ de guójiā ˍˍˍˍˍˍ Táiwān rè duō le."
      },
      {
       "hz": "跟中文 ˍˍˍˍˍ ，英文 ˍˍˍˍˍ 有用，可是在台灣，說中文的人 ˍˍˍˍˍ 說英文的多得多，所以我 ˍˍˍˍˍ 想學中文。",
       "vi": "So với tiếng Trung …, tiếng Anh … có ích hơn, nhưng ở Đài Loan người nói tiếng Trung … nhiều hơn người nói tiếng Anh rất nhiều, nên tôi … muốn học tiếng Trung hơn.",
       "py": "Gēn zhōngwén ˍˍˍˍˍ, yīngwén ˍˍˍˍˍ yǒuyòng, kěshì zài Táiwān, shuō zhōngwén de rén ˍˍˍˍˍ shuō yīngwén de duōdeduō, suǒyǐ wǒ ˍˍˍˍˍ xiǎng xué zhōngwén."
      },
      {
       "hz": "請用「比/比較/比起來」完成句子。",
       "vi": "Hoàn thành câu bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng jùzi."
      },
      {
       "hz": "A：有人說吃青菜比吃肉健康，你覺得呢？",
       "vi": "A: Có người nói ăn rau tốt cho sức khoẻ hơn ăn thịt, bạn thấy sao?",
       "py": "A: Yǒurén shuō chī qīngcài bǐ chī ròu jiànkāng, nǐ juéde ne?"
      },
      {
       "hz": "A：中文的發音跟漢字，你覺得哪個難？",
       "vi": "A: Phát âm và chữ Hán của tiếng Trung, bạn thấy cái nào khó hơn?",
       "py": "A: Zhōngwén de fāyīn gēn hànzì, nǐ juéde nǎge nán?"
      },
      {
       "hz": "A：如果一定要選一個社團，你想參加鋼琴社還是吉他社？",
       "vi": "A: Nếu bắt buộc phải chọn một câu lạc bộ, bạn muốn tham gia câu lạc bộ piano hay guitar?",
       "py": "A: Rúguǒ yídìng yào xuǎn yígè shètuán, nǐ xiǎng cānjiā gāngqín shè háishì jítāshè?"
      },
      {
       "hz": "請用「比/比較/比起來」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng duìhuà."
      },
      {
       "hz": "我以為我的手機不見了，差一點就要去買新的。2. 他吃了不新鮮的食物，拉了三天的肚子，差一點就死了。3. 我差點忘了今天要考試，還好你告訴我，要不然這門課我一定會被當。",
       "vi": "Tôi tưởng điện thoại mất rồi, suýt nữa thì đi mua cái mới. Anh ấy ăn phải đồ không tươi, bị tiêu chảy ba ngày, suýt nữa thì chết. Tôi suýt quên hôm nay có bài thi, may mà bạn nhắc, nếu không môn này chắc chắn tôi bị trượt.",
       "py": "Wǒ yǐwéi wǒ de shǒujī bújiàn le, chàyìdiǎn jiùyào qù mǎi xīn de. 2. Tā chī le bù xīnxiān de shíwù, lā le sāntiān de dùzi, chàyìdiǎn jiù sǐ le. 3. Wǒ chàdiǎn wàng le jīntiān yào kǎoshì, háihǎo nǐ gàosù wǒ, yàobùrán zhè mén kè wǒ yídìng huì bèi dāng."
      },
      {
       "hz": "我以為你放在地上的那些東西是垃圾，ˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Tôi tưởng những thứ bạn để trên sàn là rác, ….",
       "py": "Wǒ yǐwéi nǐ fàngzài dìshàng de nàxiē dōngxī shì lèsè, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "公司大樓十一點關門，我忙到十點五十九分才下班， ˍˍˍˍˍˍˍˍ。",
       "vi": "Toà nhà công ty đóng cửa lúc mười một giờ, tôi bận đến mười giờ năm mươi chín mới tan làm, ….",
       "py": "Gōngsī dàlóu shíyìdiǎn guānmén, wǒ máng dào shídiǎnwǔ shíjiǔfēn cái xiàbān, ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我剛剛給朋友打電話時，因為號碼跟老師的差不多， ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Lúc nãy tôi gọi điện cho bạn, vì số điện thoại gần giống số của thầy giáo, ….",
       "py": "Wǒ gānggāng gěi péngyǒu dǎdiànhuà shí, yīnwèi hàomǎ gēn lǎoshī de chàbuduō, ˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 了 (一)點兒 — hơi… một chút",
   "giaiThich": "Dùng khi người nói thấy tình huống chưa được như ý: \"hơi đông một chút\", \"hơi đắt một chút\"."
  },
  {
   "title": "III. 白 + V in vain, for nothing",
   "points": [
    {
     "label": null,
     "formula": "“白” should be followed by a verb, often a monosyllabic verb. It indicates an action is carried out with no effects it should have. Note when collocating with some verbs such as “吃(eat)”, “喝(drink)” and “住(live)” , it means “unwilling to pay money or make effort”, e.g., ”他常常來我家白吃白喝”. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "我說了這麼多次，你還是沒聽懂，真是白說了。2. 那家餐廳很遠，你先打電話問他們今天做不做生意，別白跑了！",
       "vi": "Tôi nói bao nhiêu lần rồi mà bạn vẫn không hiểu, đúng là nói uổng công. Nhà hàng đó rất xa, bạn gọi điện hỏi trước xem hôm nay họ có mở cửa không, kẻo đi uổng công!",
       "py": "Wǒ shuō le zhème duōcì, nǐ háishì méi tīngdǒng, zhēnshì bái shuō le. 2. Nà jiā cāntīng hěn yuǎn, nǐ xiān dǎdiànhuà wèn tāmen jīntiān zuò bú zuòshēngyì, bié báipǎo le!"
      },
      {
       "hz": "我把野餐要吃的三明治都準備好了，可是朋友忽然說不去了，我白準備了。",
       "vi": "Tôi đã chuẩn bị xong bánh mì kẹp cho buổi dã ngoại, nhưng bạn tôi đột nhiên nói không đi nữa, tôi chuẩn bị uổng công.",
       "py": "Wǒ bǎ yěcān yào chī de sānmíngzhì dōu zhǔnbèi hǎo le, kěshì péngyǒu hūrán shuō bú qù le, wǒ bái zhǔnbèi le."
      },
      {
       "hz": "我用電腦寫報告，電腦忽然壞了， ˍˍˍˍˍˍˍˍˍ 。(寫)2. 我買了一盒豆漿給他，可是他不喝， ˍˍˍˍˍˍˍˍ 。(買)3. 先生：朋友剛剛請我到餐廳去吃飯，現在一點兒也不餓。",
       "vi": "Tôi dùng máy tính viết báo cáo, máy tính đột nhiên hỏng, …. (viết) Tôi mua cho anh ấy một hộp sữa đậu nành, nhưng anh ấy không uống, …. (mua) Chồng: Vừa nãy bạn mời anh đi ăn nhà hàng, bây giờ anh chẳng đói chút nào.",
       "py": "Wǒ yòng diànnǎo xiě bàogào, diànnǎo hūrán huài le, ˍˍˍˍˍˍˍˍˍ. (xiě) 2. Wǒ mǎi le yìhé dòujiāng gěi tā, kěshì tā bù hē, ˍˍˍˍˍˍˍˍ. (mǎi) 3. Xiānshēng: Péngyǒu gānggāng qǐng wǒ dào cāntīng qù chīfàn, xiànzài yìdiǎn'ér yě bú è."
      },
      {
       "hz": "太太：我做了好吃的晚餐， ˍˍˍˍˍˍˍˍˍˍˍ 。(做)",
       "vi": "Vợ: Em nấu bữa tối ngon như vậy, …. (nấu)",
       "py": "Tàitai: Wǒ zuò le hǎochī de wǎncān, ˍˍˍˍˍˍˍˍˍˍˍ. (zuò)"
      },
      {
       "hz": "請你問三個同學，他們買 3C 產品的時候，覺得什麼最重要？為什麼？",
       "vi": "Hãy hỏi ba bạn học xem khi mua sản phẩm điện tử, họ thấy điều gì quan trọng nhất? Tại sao?",
       "py": "Qǐng nǐ wèn sāngè tóngxué, tāmen mǎi 3C chǎnpǐn de shíhòu, juéde shénme zuì zhòngyào? Wèishénme?"
      },
      {
       "hz": "在前一個活動，你問了同學們的想法，現在請你報告：你跟同學的想法哪裡不一樣？",
       "vi": "Ở hoạt động trước bạn đã hỏi ý kiến các bạn, bây giờ hãy báo cáo: suy nghĩ của bạn và các bạn khác nhau ở chỗ nào?",
       "py": "Zài qián yígè huódòng, nǐ wèn le tóngxuémen de xiǎngfǎ, xiànzài qǐng nǐ bàogào: Nǐ gēn tóngxué de xiǎngfǎ nǎlǐ bù yíyàng?"
      },
      {
       "hz": "為什麼不一樣？(請你使用下面的語法說明。)",
       "vi": "Tại sao lại khác nhau? (Hãy dùng ngữ pháp dưới đây để giải thích.)",
       "py": "Wèishénme bù yíyàng? (qǐng nǐ shǐyòng xiàmiàn de yǔfǎ shuōmíng.)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "白 + động từ — làm uổng công",
   "giaiThich": "白 đứng trước động từ (thường đơn âm), nghĩa việc đã làm mà không có kết quả gì (白跑一趟 — đi uổng công)."
  }
 ],
 "td2-13.3": [
  {
   "title": "III. Vs 了 (一)點兒 a little bit Vs …",
   "points": [
    {
     "label": null,
     "formula": "1. 這堂美術課很有意思，可是學生多了一點兒。2. 健身雖然對身體有很多好處，但是健身房的費用高了一點兒。3.  A：聽說你趁這次春假去了日月潭，那裡的風景怎麼樣？     B：日月潭很美，花也都開了。可惜人太多，擠了點兒。 This pattern is used when the speaker wants to show a situation is not as good as expected, but there is not much difference. Usually, it implies minor weaknesses or complaints. For example, “這支手機不錯，可是貴了一點兒(This cell phone is not bad, but it is a little bit expensive.)” In the example the speaker thinks the cell phone is more expensive than he expects, but it is not a big issue. 請用提示完成句子。 Complete sentences with given words. 3C (Computers, Communication, Consumer-Electronic) product \"比\" is a preposition that indicates the status of the subject when a comparison is  made. “比” is followed by the compared object, e.g., “我比你高” and “公車比火車便宜” , equivalent to “than” in English. “比較” is an adverb that indicates a higher or lower degree, e.g., “台灣比較熱” and “坐公車比較便宜”, equivalent to “more” in English The subject is placed before “比較”, while the stative verb is placed after it. “比起來” is a phrase that shows the remark about one thing as compared to another. The common pattern is “(A/B)跟B/A比起來，A/B比較......” , e.g., “(你)跟他比起來，你比較漂亮” and “(我)跟你比起來，我沒有你那麼漂亮。” “差一點” is usually followed by verbs or verb phrases. This pattern is usually used in a situation when something which the speaker did not wish almost happened. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他的中文說得不錯，可是 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Anh ấy nói tiếng Trung khá giỏi, nhưng ….",
       "py": "Tā de zhōngwén shuō de búcuò, kěshì ˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "做愛心服務雖然 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Làm thiện nguyện tuy …",
       "py": "Zuò àixīn fúwù suīrán ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "在外國生活 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Sống ở nước ngoài ….",
       "py": "Zài wàiguó shēnghuó ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "良介買電腦以前，怎麼準備？",
       "vi": "Trước khi mua máy tính, Ryosuke đã chuẩn bị thế nào?",
       "py": "Liángjiè mǎi diànnǎo yǐqián, zěnme zhǔnbèi?"
      },
      {
       "hz": "那家3C產品店的店員好嗎？為什麼？",
       "vi": "Nhân viên cửa hàng đồ điện tử đó có tốt không? Tại sao?",
       "py": "Nà jiā 3C chǎnpǐn diàn de diànyuán hǎo ma? Wèishénme?"
      },
      {
       "hz": "良介覺得店員建議他買的電腦怎麼樣？",
       "vi": "Ryosuke thấy chiếc máy tính nhân viên gợi ý thế nào?",
       "py": "Liángjiè juéde diànyuán jiànyì tā mǎi de diànnǎo zěnmeyàng?"
      },
      {
       "hz": "為什麼後來良介買得起那部電腦了？",
       "vi": "Tại sao sau đó Ryosuke lại mua nổi chiếc máy tính đó?",
       "py": "Wèishénme hòulái Liángjiè mǎideqǐ nà bù diànnǎo le?"
      },
      {
       "hz": "為什麼良介說自己很糊塗？",
       "vi": "Tại sao Ryosuke nói mình rất đãng trí?",
       "py": "Wèishénme Liángjiè shuō zìjǐ hěn hútú?"
      },
      {
       "hz": "良介這次買電腦的經驗怎麼樣？省了什麼麻煩？",
       "vi": "Lần mua máy tính này của Ryosuke thế nào? Đã tránh được phiền phức gì?",
       "py": "Liángjiè zhècì mǎi diànnǎo de jīngyàn zěnmeyàng? Shěng le shénme máfán?"
      },
      {
       "hz": "你買過科技產品嗎？你覺得那些產品有什麼好處？",
       "vi": "Bạn đã từng mua sản phẩm công nghệ chưa? Bạn thấy những sản phẩm đó có lợi ích gì?",
       "py": "Nǐ mǎi guò kējì chǎnpǐn ma? Nǐ juéde nàxiē chǎnpǐn yǒu shénme hǎochù?"
      },
      {
       "hz": "你覺得電腦的功能、價格，電腦輕或重，重要嗎？為什麼？",
       "vi": "Bạn thấy chức năng, giá cả, máy tính nhẹ hay nặng có quan trọng không? Tại sao?",
       "py": "Nǐ juéde diànnǎo de gōngnéng, jiàgé, diànnǎo qīng huò zhòng, zhòngyào ma? Wèishénme?"
      },
      {
       "hz": "他上禮拜去買電腦，差點兒就忘了自己的手機，真糊塗！",
       "vi": "Tuần trước anh ấy đi mua máy tính, suýt nữa quên cả điện thoại của mình, đãng trí thật!",
       "py": "Tā shàng lǐbài qù mǎi diànnǎo, chàdiǎn'ér jiù wàng le zìjǐ de shǒujī, zhēn hútú!"
      },
      {
       "hz": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來。平板比筆電便宜，所以我比較想買平板。",
       "vi": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來. Máy tính bảng rẻ hơn laptop, nên tôi muốn mua máy tính bảng hơn.",
       "py": "Bǐ, bǐjiào, bǐ qǐlái— c â u so s á nh v ớ i bǐ, bǐjiào v à bǐ qǐlái. Píngbǎn bǐ bǐ diàn piányi, suǒyǐ wǒ bǐjiào xiǎng mǎi píngbǎn."
      },
      {
       "hz": "跟國外旅遊比起來，大部分的國內旅遊便宜一點兒。",
       "vi": "So với du lịch nước ngoài, phần lớn du lịch trong nước rẻ hơn một chút.",
       "py": "Gēn guówài lǚyóu bǐ qǐlái, dàbùfèn de guónèi lǚyóu piányi yìdiǎn'ér."
      },
      {
       "hz": "雖然筆電的功能比平板好，可是跟平板比起來，筆電比較重。",
       "vi": "Tuy laptop có chức năng tốt hơn máy tính bảng, nhưng so với máy tính bảng thì laptop nặng hơn.",
       "py": "Suīrán bǐ diàn de gōngnéng bǐ píngbǎn hǎo, kěshì gēn píngbǎn bǐ qǐlái, bǐ diàn bǐjiào zhòng."
      },
      {
       "hz": "跟他做的菜 ˍˍˍˍˍˍˍ ，我做的 ˍˍˍˍˍˍˍ 好吃。",
       "vi": "So với món anh ấy nấu …, món tôi nấu … ngon hơn.",
       "py": "Gēn tā zuò de cài ˍˍˍˍˍˍˍ, wǒ zuò de ˍˍˍˍˍˍˍ hǎochī."
      },
      {
       "hz": "跟台灣 ˍˍˍˍˍˍ ，我的國家 ˍˍˍˍˍˍ 台灣熱多了。",
       "vi": "So với Đài Loan …, nước tôi … nóng hơn Đài Loan nhiều.",
       "py": "Gēn Táiwān ˍˍˍˍˍˍ, wǒ de guójiā ˍˍˍˍˍˍ Táiwān rè duō le."
      },
      {
       "hz": "跟中文 ˍˍˍˍˍ ，英文 ˍˍˍˍˍ 有用，可是在台灣，說中文的人 ˍˍˍˍˍ 說英文的多得多，所以我 ˍˍˍˍˍ 想學中文。",
       "vi": "So với tiếng Trung …, tiếng Anh … có ích hơn, nhưng ở Đài Loan người nói tiếng Trung … nhiều hơn người nói tiếng Anh rất nhiều, nên tôi … muốn học tiếng Trung hơn.",
       "py": "Gēn zhōngwén ˍˍˍˍˍ, yīngwén ˍˍˍˍˍ yǒuyòng, kěshì zài Táiwān, shuō zhōngwén de rén ˍˍˍˍˍ shuō yīngwén de duōdeduō, suǒyǐ wǒ ˍˍˍˍˍ xiǎng xué zhōngwén."
      },
      {
       "hz": "請用「比/比較/比起來」完成句子。",
       "vi": "Hoàn thành câu bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng jùzi."
      },
      {
       "hz": "A：有人說吃青菜比吃肉健康，你覺得呢？",
       "vi": "A: Có người nói ăn rau tốt cho sức khoẻ hơn ăn thịt, bạn thấy sao?",
       "py": "A: Yǒurén shuō chī qīngcài bǐ chī ròu jiànkāng, nǐ juéde ne?"
      },
      {
       "hz": "A：中文的發音跟漢字，你覺得哪個難？",
       "vi": "A: Phát âm và chữ Hán của tiếng Trung, bạn thấy cái nào khó hơn?",
       "py": "A: Zhōngwén de fāyīn gēn hànzì, nǐ juéde nǎge nán?"
      },
      {
       "hz": "A：如果一定要選一個社團，你想參加鋼琴社還是吉他社？",
       "vi": "A: Nếu bắt buộc phải chọn một câu lạc bộ, bạn muốn tham gia câu lạc bộ piano hay guitar?",
       "py": "A: Rúguǒ yídìng yào xuǎn yígè shètuán, nǐ xiǎng cānjiā gāngqín shè háishì jítāshè?"
      },
      {
       "hz": "請用「比/比較/比起來」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng duìhuà."
      },
      {
       "hz": "我以為我的手機不見了，差一點就要去買新的。2. 他吃了不新鮮的食物，拉了三天的肚子，差一點就死了。3. 我差點忘了今天要考試，還好你告訴我，要不然這門課我一定會被當。",
       "vi": "Tôi tưởng điện thoại mất rồi, suýt nữa thì đi mua cái mới. Anh ấy ăn phải đồ không tươi, bị tiêu chảy ba ngày, suýt nữa thì chết. Tôi suýt quên hôm nay có bài thi, may mà bạn nhắc, nếu không môn này chắc chắn tôi bị trượt.",
       "py": "Wǒ yǐwéi wǒ de shǒujī bújiàn le, chàyìdiǎn jiùyào qù mǎi xīn de. 2. Tā chī le bù xīnxiān de shíwù, lā le sāntiān de dùzi, chàyìdiǎn jiù sǐ le. 3. Wǒ chàdiǎn wàng le jīntiān yào kǎoshì, háihǎo nǐ gàosù wǒ, yàobùrán zhè mén kè wǒ yídìng huì bèi dāng."
      },
      {
       "hz": "我以為你放在地上的那些東西是垃圾，ˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Tôi tưởng những thứ bạn để trên sàn là rác, ….",
       "py": "Wǒ yǐwéi nǐ fàngzài dìshàng de nàxiē dōngxī shì lèsè, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "公司大樓十一點關門，我忙到十點五十九分才下班， ˍˍˍˍˍˍˍˍ。",
       "vi": "Toà nhà công ty đóng cửa lúc mười một giờ, tôi bận đến mười giờ năm mươi chín mới tan làm, ….",
       "py": "Gōngsī dàlóu shíyìdiǎn guānmén, wǒ máng dào shídiǎnwǔ shíjiǔfēn cái xiàbān, ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我剛剛給朋友打電話時，因為號碼跟老師的差不多， ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Lúc nãy tôi gọi điện cho bạn, vì số điện thoại gần giống số của thầy giáo, ….",
       "py": "Wǒ gānggāng gěi péngyǒu dǎdiànhuà shí, yīnwèi hàomǎ gēn lǎoshī de chàbuduō, ˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 了 (一)點兒 — hơi… một chút",
   "giaiThich": "Dùng khi người nói thấy tình huống chưa được như ý: \"hơi đông một chút\", \"hơi đắt một chút\"."
  },
  {
   "title": "III. 白 + V in vain, for nothing",
   "points": [
    {
     "label": null,
     "formula": "“白” should be followed by a verb, often a monosyllabic verb. It indicates an action is carried out with no effects it should have. Note when collocating with some verbs such as “吃(eat)”, “喝(drink)” and “住(live)” , it means “unwilling to pay money or make effort”, e.g., ”他常常來我家白吃白喝”. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "我說了這麼多次，你還是沒聽懂，真是白說了。2. 那家餐廳很遠，你先打電話問他們今天做不做生意，別白跑了！",
       "vi": "Tôi nói bao nhiêu lần rồi mà bạn vẫn không hiểu, đúng là nói uổng công. Nhà hàng đó rất xa, bạn gọi điện hỏi trước xem hôm nay họ có mở cửa không, kẻo đi uổng công!",
       "py": "Wǒ shuō le zhème duōcì, nǐ háishì méi tīngdǒng, zhēnshì bái shuō le. 2. Nà jiā cāntīng hěn yuǎn, nǐ xiān dǎdiànhuà wèn tāmen jīntiān zuò bú zuòshēngyì, bié báipǎo le!"
      },
      {
       "hz": "我把野餐要吃的三明治都準備好了，可是朋友忽然說不去了，我白準備了。",
       "vi": "Tôi đã chuẩn bị xong bánh mì kẹp cho buổi dã ngoại, nhưng bạn tôi đột nhiên nói không đi nữa, tôi chuẩn bị uổng công.",
       "py": "Wǒ bǎ yěcān yào chī de sānmíngzhì dōu zhǔnbèi hǎo le, kěshì péngyǒu hūrán shuō bú qù le, wǒ bái zhǔnbèi le."
      },
      {
       "hz": "我用電腦寫報告，電腦忽然壞了， ˍˍˍˍˍˍˍˍˍ 。(寫)2. 我買了一盒豆漿給他，可是他不喝， ˍˍˍˍˍˍˍˍ 。(買)3. 先生：朋友剛剛請我到餐廳去吃飯，現在一點兒也不餓。",
       "vi": "Tôi dùng máy tính viết báo cáo, máy tính đột nhiên hỏng, …. (viết) Tôi mua cho anh ấy một hộp sữa đậu nành, nhưng anh ấy không uống, …. (mua) Chồng: Vừa nãy bạn mời anh đi ăn nhà hàng, bây giờ anh chẳng đói chút nào.",
       "py": "Wǒ yòng diànnǎo xiě bàogào, diànnǎo hūrán huài le, ˍˍˍˍˍˍˍˍˍ. (xiě) 2. Wǒ mǎi le yìhé dòujiāng gěi tā, kěshì tā bù hē, ˍˍˍˍˍˍˍˍ. (mǎi) 3. Xiānshēng: Péngyǒu gānggāng qǐng wǒ dào cāntīng qù chīfàn, xiànzài yìdiǎn'ér yě bú è."
      },
      {
       "hz": "太太：我做了好吃的晚餐， ˍˍˍˍˍˍˍˍˍˍˍ 。(做)",
       "vi": "Vợ: Em nấu bữa tối ngon như vậy, …. (nấu)",
       "py": "Tàitai: Wǒ zuò le hǎochī de wǎncān, ˍˍˍˍˍˍˍˍˍˍˍ. (zuò)"
      },
      {
       "hz": "請你問三個同學，他們買 3C 產品的時候，覺得什麼最重要？為什麼？",
       "vi": "Hãy hỏi ba bạn học xem khi mua sản phẩm điện tử, họ thấy điều gì quan trọng nhất? Tại sao?",
       "py": "Qǐng nǐ wèn sāngè tóngxué, tāmen mǎi 3C chǎnpǐn de shíhòu, juéde shénme zuì zhòngyào? Wèishénme?"
      },
      {
       "hz": "在前一個活動，你問了同學們的想法，現在請你報告：你跟同學的想法哪裡不一樣？",
       "vi": "Ở hoạt động trước bạn đã hỏi ý kiến các bạn, bây giờ hãy báo cáo: suy nghĩ của bạn và các bạn khác nhau ở chỗ nào?",
       "py": "Zài qián yígè huódòng, nǐ wèn le tóngxuémen de xiǎngfǎ, xiànzài qǐng nǐ bàogào: Nǐ gēn tóngxué de xiǎngfǎ nǎlǐ bù yíyàng?"
      },
      {
       "hz": "為什麼不一樣？(請你使用下面的語法說明。)",
       "vi": "Tại sao lại khác nhau? (Hãy dùng ngữ pháp dưới đây để giải thích.)",
       "py": "Wèishénme bù yíyàng? (qǐng nǐ shǐyòng xiàmiàn de yǔfǎ shuōmíng.)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "白 + động từ — làm uổng công",
   "giaiThich": "白 đứng trước động từ (thường đơn âm), nghĩa việc đã làm mà không có kết quả gì (白跑一趟 — đi uổng công)."
  }
 ],
 "td2-13.4": [
  {
   "title": "III. Vs 了 (一)點兒 a little bit Vs …",
   "points": [
    {
     "label": null,
     "formula": "1. 這堂美術課很有意思，可是學生多了一點兒。2. 健身雖然對身體有很多好處，但是健身房的費用高了一點兒。3.  A：聽說你趁這次春假去了日月潭，那裡的風景怎麼樣？     B：日月潭很美，花也都開了。可惜人太多，擠了點兒。 This pattern is used when the speaker wants to show a situation is not as good as expected, but there is not much difference. Usually, it implies minor weaknesses or complaints. For example, “這支手機不錯，可是貴了一點兒(This cell phone is not bad, but it is a little bit expensive.)” In the example the speaker thinks the cell phone is more expensive than he expects, but it is not a big issue. 請用提示完成句子。 Complete sentences with given words. 3C (Computers, Communication, Consumer-Electronic) product \"比\" is a preposition that indicates the status of the subject when a comparison is  made. “比” is followed by the compared object, e.g., “我比你高” and “公車比火車便宜” , equivalent to “than” in English. “比較” is an adverb that indicates a higher or lower degree, e.g., “台灣比較熱” and “坐公車比較便宜”, equivalent to “more” in English The subject is placed before “比較”, while the stative verb is placed after it. “比起來” is a phrase that shows the remark about one thing as compared to another. The common pattern is “(A/B)跟B/A比起來，A/B比較......” , e.g., “(你)跟他比起來，你比較漂亮” and “(我)跟你比起來，我沒有你那麼漂亮。” “差一點” is usually followed by verbs or verb phrases. This pattern is usually used in a situation when something which the speaker did not wish almost happened. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "他的中文說得不錯，可是 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Anh ấy nói tiếng Trung khá giỏi, nhưng ….",
       "py": "Tā de zhōngwén shuō de búcuò, kěshì ˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "做愛心服務雖然 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Làm thiện nguyện tuy …",
       "py": "Zuò àixīn fúwù suīrán ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "在外國生活 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Sống ở nước ngoài ….",
       "py": "Zài wàiguó shēnghuó ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "良介買電腦以前，怎麼準備？",
       "vi": "Trước khi mua máy tính, Ryosuke đã chuẩn bị thế nào?",
       "py": "Liángjiè mǎi diànnǎo yǐqián, zěnme zhǔnbèi?"
      },
      {
       "hz": "那家3C產品店的店員好嗎？為什麼？",
       "vi": "Nhân viên cửa hàng đồ điện tử đó có tốt không? Tại sao?",
       "py": "Nà jiā 3C chǎnpǐn diàn de diànyuán hǎo ma? Wèishénme?"
      },
      {
       "hz": "良介覺得店員建議他買的電腦怎麼樣？",
       "vi": "Ryosuke thấy chiếc máy tính nhân viên gợi ý thế nào?",
       "py": "Liángjiè juéde diànyuán jiànyì tā mǎi de diànnǎo zěnmeyàng?"
      },
      {
       "hz": "為什麼後來良介買得起那部電腦了？",
       "vi": "Tại sao sau đó Ryosuke lại mua nổi chiếc máy tính đó?",
       "py": "Wèishénme hòulái Liángjiè mǎideqǐ nà bù diànnǎo le?"
      },
      {
       "hz": "為什麼良介說自己很糊塗？",
       "vi": "Tại sao Ryosuke nói mình rất đãng trí?",
       "py": "Wèishénme Liángjiè shuō zìjǐ hěn hútú?"
      },
      {
       "hz": "良介這次買電腦的經驗怎麼樣？省了什麼麻煩？",
       "vi": "Lần mua máy tính này của Ryosuke thế nào? Đã tránh được phiền phức gì?",
       "py": "Liángjiè zhècì mǎi diànnǎo de jīngyàn zěnmeyàng? Shěng le shénme máfán?"
      },
      {
       "hz": "你買過科技產品嗎？你覺得那些產品有什麼好處？",
       "vi": "Bạn đã từng mua sản phẩm công nghệ chưa? Bạn thấy những sản phẩm đó có lợi ích gì?",
       "py": "Nǐ mǎi guò kējì chǎnpǐn ma? Nǐ juéde nàxiē chǎnpǐn yǒu shénme hǎochù?"
      },
      {
       "hz": "你覺得電腦的功能、價格，電腦輕或重，重要嗎？為什麼？",
       "vi": "Bạn thấy chức năng, giá cả, máy tính nhẹ hay nặng có quan trọng không? Tại sao?",
       "py": "Nǐ juéde diànnǎo de gōngnéng, jiàgé, diànnǎo qīng huò zhòng, zhòngyào ma? Wèishénme?"
      },
      {
       "hz": "他上禮拜去買電腦，差點兒就忘了自己的手機，真糊塗！",
       "vi": "Tuần trước anh ấy đi mua máy tính, suýt nữa quên cả điện thoại của mình, đãng trí thật!",
       "py": "Tā shàng lǐbài qù mǎi diànnǎo, chàdiǎn'ér jiù wàng le zìjǐ de shǒujī, zhēn hútú!"
      },
      {
       "hz": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來。平板比筆電便宜，所以我比較想買平板。",
       "vi": "比、比較、比起來 — câu so sánh với 比, 比較 và 比起來. Máy tính bảng rẻ hơn laptop, nên tôi muốn mua máy tính bảng hơn.",
       "py": "Bǐ, bǐjiào, bǐ qǐlái— c â u so s á nh v ớ i bǐ, bǐjiào v à bǐ qǐlái. Píngbǎn bǐ bǐ diàn piányi, suǒyǐ wǒ bǐjiào xiǎng mǎi píngbǎn."
      },
      {
       "hz": "跟國外旅遊比起來，大部分的國內旅遊便宜一點兒。",
       "vi": "So với du lịch nước ngoài, phần lớn du lịch trong nước rẻ hơn một chút.",
       "py": "Gēn guówài lǚyóu bǐ qǐlái, dàbùfèn de guónèi lǚyóu piányi yìdiǎn'ér."
      },
      {
       "hz": "雖然筆電的功能比平板好，可是跟平板比起來，筆電比較重。",
       "vi": "Tuy laptop có chức năng tốt hơn máy tính bảng, nhưng so với máy tính bảng thì laptop nặng hơn.",
       "py": "Suīrán bǐ diàn de gōngnéng bǐ píngbǎn hǎo, kěshì gēn píngbǎn bǐ qǐlái, bǐ diàn bǐjiào zhòng."
      },
      {
       "hz": "跟他做的菜 ˍˍˍˍˍˍˍ ，我做的 ˍˍˍˍˍˍˍ 好吃。",
       "vi": "So với món anh ấy nấu …, món tôi nấu … ngon hơn.",
       "py": "Gēn tā zuò de cài ˍˍˍˍˍˍˍ, wǒ zuò de ˍˍˍˍˍˍˍ hǎochī."
      },
      {
       "hz": "跟台灣 ˍˍˍˍˍˍ ，我的國家 ˍˍˍˍˍˍ 台灣熱多了。",
       "vi": "So với Đài Loan …, nước tôi … nóng hơn Đài Loan nhiều.",
       "py": "Gēn Táiwān ˍˍˍˍˍˍ, wǒ de guójiā ˍˍˍˍˍˍ Táiwān rè duō le."
      },
      {
       "hz": "跟中文 ˍˍˍˍˍ ，英文 ˍˍˍˍˍ 有用，可是在台灣，說中文的人 ˍˍˍˍˍ 說英文的多得多，所以我 ˍˍˍˍˍ 想學中文。",
       "vi": "So với tiếng Trung …, tiếng Anh … có ích hơn, nhưng ở Đài Loan người nói tiếng Trung … nhiều hơn người nói tiếng Anh rất nhiều, nên tôi … muốn học tiếng Trung hơn.",
       "py": "Gēn zhōngwén ˍˍˍˍˍ, yīngwén ˍˍˍˍˍ yǒuyòng, kěshì zài Táiwān, shuō zhōngwén de rén ˍˍˍˍˍ shuō yīngwén de duōdeduō, suǒyǐ wǒ ˍˍˍˍˍ xiǎng xué zhōngwén."
      },
      {
       "hz": "請用「比/比較/比起來」完成句子。",
       "vi": "Hoàn thành câu bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng jùzi."
      },
      {
       "hz": "A：有人說吃青菜比吃肉健康，你覺得呢？",
       "vi": "A: Có người nói ăn rau tốt cho sức khoẻ hơn ăn thịt, bạn thấy sao?",
       "py": "A: Yǒurén shuō chī qīngcài bǐ chī ròu jiànkāng, nǐ juéde ne?"
      },
      {
       "hz": "A：中文的發音跟漢字，你覺得哪個難？",
       "vi": "A: Phát âm và chữ Hán của tiếng Trung, bạn thấy cái nào khó hơn?",
       "py": "A: Zhōngwén de fāyīn gēn hànzì, nǐ juéde nǎge nán?"
      },
      {
       "hz": "A：如果一定要選一個社團，你想參加鋼琴社還是吉他社？",
       "vi": "A: Nếu bắt buộc phải chọn một câu lạc bộ, bạn muốn tham gia câu lạc bộ piano hay guitar?",
       "py": "A: Rúguǒ yídìng yào xuǎn yígè shètuán, nǐ xiǎng cānjiā gāngqín shè háishì jítāshè?"
      },
      {
       "hz": "請用「比/比較/比起來」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 比/比較/比起來.",
       "py": "Qǐng yòng “bǐ / bǐjiào / bǐ qǐlái” wánchéng duìhuà."
      },
      {
       "hz": "我以為我的手機不見了，差一點就要去買新的。2. 他吃了不新鮮的食物，拉了三天的肚子，差一點就死了。3. 我差點忘了今天要考試，還好你告訴我，要不然這門課我一定會被當。",
       "vi": "Tôi tưởng điện thoại mất rồi, suýt nữa thì đi mua cái mới. Anh ấy ăn phải đồ không tươi, bị tiêu chảy ba ngày, suýt nữa thì chết. Tôi suýt quên hôm nay có bài thi, may mà bạn nhắc, nếu không môn này chắc chắn tôi bị trượt.",
       "py": "Wǒ yǐwéi wǒ de shǒujī bújiàn le, chàyìdiǎn jiùyào qù mǎi xīn de. 2. Tā chī le bù xīnxiān de shíwù, lā le sāntiān de dùzi, chàyìdiǎn jiù sǐ le. 3. Wǒ chàdiǎn wàng le jīntiān yào kǎoshì, háihǎo nǐ gàosù wǒ, yàobùrán zhè mén kè wǒ yídìng huì bèi dāng."
      },
      {
       "hz": "我以為你放在地上的那些東西是垃圾，ˍˍˍˍˍˍˍˍˍˍˍ 。",
       "vi": "Tôi tưởng những thứ bạn để trên sàn là rác, ….",
       "py": "Wǒ yǐwéi nǐ fàngzài dìshàng de nàxiē dōngxī shì lèsè, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "公司大樓十一點關門，我忙到十點五十九分才下班， ˍˍˍˍˍˍˍˍ。",
       "vi": "Toà nhà công ty đóng cửa lúc mười một giờ, tôi bận đến mười giờ năm mươi chín mới tan làm, ….",
       "py": "Gōngsī dàlóu shíyìdiǎn guānmén, wǒ máng dào shídiǎnwǔ shíjiǔfēn cái xiàbān, ˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "我剛剛給朋友打電話時，因為號碼跟老師的差不多， ˍˍˍˍˍˍˍˍˍ。",
       "vi": "Lúc nãy tôi gọi điện cho bạn, vì số điện thoại gần giống số của thầy giáo, ….",
       "py": "Wǒ gānggāng gěi péngyǒu dǎdiànhuà shí, yīnwèi hàomǎ gēn lǎoshī de chàbuduō, ˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Vs 了 (一)點兒 — hơi… một chút",
   "giaiThich": "Dùng khi người nói thấy tình huống chưa được như ý: \"hơi đông một chút\", \"hơi đắt một chút\"."
  },
  {
   "title": "III. 白 + V in vain, for nothing",
   "points": [
    {
     "label": null,
     "formula": "“白” should be followed by a verb, often a monosyllabic verb. It indicates an action is carried out with no effects it should have. Note when collocating with some verbs such as “吃(eat)”, “喝(drink)” and “住(live)” , it means “unwilling to pay money or make effort”, e.g., ”他常常來我家白吃白喝”. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "我說了這麼多次，你還是沒聽懂，真是白說了。2. 那家餐廳很遠，你先打電話問他們今天做不做生意，別白跑了！",
       "vi": "Tôi nói bao nhiêu lần rồi mà bạn vẫn không hiểu, đúng là nói uổng công. Nhà hàng đó rất xa, bạn gọi điện hỏi trước xem hôm nay họ có mở cửa không, kẻo đi uổng công!",
       "py": "Wǒ shuō le zhème duōcì, nǐ háishì méi tīngdǒng, zhēnshì bái shuō le. 2. Nà jiā cāntīng hěn yuǎn, nǐ xiān dǎdiànhuà wèn tāmen jīntiān zuò bú zuòshēngyì, bié báipǎo le!"
      },
      {
       "hz": "我把野餐要吃的三明治都準備好了，可是朋友忽然說不去了，我白準備了。",
       "vi": "Tôi đã chuẩn bị xong bánh mì kẹp cho buổi dã ngoại, nhưng bạn tôi đột nhiên nói không đi nữa, tôi chuẩn bị uổng công.",
       "py": "Wǒ bǎ yěcān yào chī de sānmíngzhì dōu zhǔnbèi hǎo le, kěshì péngyǒu hūrán shuō bú qù le, wǒ bái zhǔnbèi le."
      },
      {
       "hz": "我用電腦寫報告，電腦忽然壞了， ˍˍˍˍˍˍˍˍˍ 。(寫)2. 我買了一盒豆漿給他，可是他不喝， ˍˍˍˍˍˍˍˍ 。(買)3. 先生：朋友剛剛請我到餐廳去吃飯，現在一點兒也不餓。",
       "vi": "Tôi dùng máy tính viết báo cáo, máy tính đột nhiên hỏng, …. (viết) Tôi mua cho anh ấy một hộp sữa đậu nành, nhưng anh ấy không uống, …. (mua) Chồng: Vừa nãy bạn mời anh đi ăn nhà hàng, bây giờ anh chẳng đói chút nào.",
       "py": "Wǒ yòng diànnǎo xiě bàogào, diànnǎo hūrán huài le, ˍˍˍˍˍˍˍˍˍ. (xiě) 2. Wǒ mǎi le yìhé dòujiāng gěi tā, kěshì tā bù hē, ˍˍˍˍˍˍˍˍ. (mǎi) 3. Xiānshēng: Péngyǒu gānggāng qǐng wǒ dào cāntīng qù chīfàn, xiànzài yìdiǎn'ér yě bú è."
      },
      {
       "hz": "太太：我做了好吃的晚餐， ˍˍˍˍˍˍˍˍˍˍˍ 。(做)",
       "vi": "Vợ: Em nấu bữa tối ngon như vậy, …. (nấu)",
       "py": "Tàitai: Wǒ zuò le hǎochī de wǎncān, ˍˍˍˍˍˍˍˍˍˍˍ. (zuò)"
      },
      {
       "hz": "請你問三個同學，他們買 3C 產品的時候，覺得什麼最重要？為什麼？",
       "vi": "Hãy hỏi ba bạn học xem khi mua sản phẩm điện tử, họ thấy điều gì quan trọng nhất? Tại sao?",
       "py": "Qǐng nǐ wèn sāngè tóngxué, tāmen mǎi 3C chǎnpǐn de shíhòu, juéde shénme zuì zhòngyào? Wèishénme?"
      },
      {
       "hz": "在前一個活動，你問了同學們的想法，現在請你報告：你跟同學的想法哪裡不一樣？",
       "vi": "Ở hoạt động trước bạn đã hỏi ý kiến các bạn, bây giờ hãy báo cáo: suy nghĩ của bạn và các bạn khác nhau ở chỗ nào?",
       "py": "Zài qián yígè huódòng, nǐ wèn le tóngxuémen de xiǎngfǎ, xiànzài qǐng nǐ bàogào: Nǐ gēn tóngxué de xiǎngfǎ nǎlǐ bù yíyàng?"
      },
      {
       "hz": "為什麼不一樣？(請你使用下面的語法說明。)",
       "vi": "Tại sao lại khác nhau? (Hãy dùng ngữ pháp dưới đây để giải thích.)",
       "py": "Wèishénme bù yíyàng? (qǐng nǐ shǐyòng xiàmiàn de yǔfǎ shuōmíng.)"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "白 + động từ — làm uổng công",
   "giaiThich": "白 đứng trước động từ (thường đơn âm), nghĩa việc đã làm mà không có kết quả gì (白跑一趟 — đi uổng công)."
  }
 ],
 "td2-14.1": [
  {
   "title": "III. 例子 + 等等 example… + and so on",
   "points": [
    {
     "label": null,
     "formula": "Similar to “等”, “等等” is used to show there are still more items of the same kind that are not entirely listed. Normally, “等等” should not be placed after proper nouns. This pattern indicates when a situation occurs, another situation ensues right away. In this pattern, \"當\" is often followed by \"...(的)時(候)\". 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "便利商店的貼紙，可以換尺、牙刷、卡通娃娃等等。2. 為了身體健康，薯條、漢堡、餅乾等等，最好少吃。 3. 去鄉下爺爺奶奶家的時候，我會幫他們種花、剪草等等。",
       "vi": "Nhãn dán của cửa hàng tiện lợi có thể đổi thước kẻ, bàn chải đánh răng, búp bê hoạt hình v.v. Để khoẻ mạnh, khoai tây chiên, hamburger, bánh quy v.v. tốt nhất nên ăn ít. Khi về quê nhà ông bà, tôi giúp ông bà trồng hoa, cắt cỏ v.v.",
       "py": "Biànlìshāngdiàn de tiēzhǐ, kěyǐ huàn chǐ, yáshuā, kǎtōng wáwá děngděng. 2. Wèile shēntǐjiànkāng, shǔtiáo, hànbǎo, bǐnggān děngděng, zuìhǎo shǎo chī. 3. Qù xiāngxià yéyenǎinai jiā de shíhòu, wǒhuì bāng tāmen zhònghuā, jiǎncǎo děngděng."
      },
      {
       "hz": "A：平常你在家會做哪些家事呢？",
       "vi": "A: Bình thường ở nhà bạn làm những việc nhà nào?",
       "py": "A: Píngcháng nǐ zàijiā huì zuò nǎxiē jiāshì ne?"
      },
      {
       "hz": "A：台灣有哪些好吃的水果？請你給我介紹介紹吧！",
       "vi": "A: Đài Loan có những loại trái cây ngon nào? Bạn giới thiệu cho tôi với!",
       "py": "A: Táiwān yǒu nǎxiē hǎochī de shuǐguǒ? Qǐng nǐ gěi wǒ jièshào jièshào ba!"
      },
      {
       "hz": "房客：請問，您要出租的公寓有家具嗎？",
       "vi": "Người thuê nhà: Cho hỏi căn hộ ông cho thuê có đồ nội thất không?",
       "py": "Fángkè: Qǐngwèn, nín yào chūzū de gōngyù yǒu jiājù ma?"
      },
      {
       "hz": "請用「等等」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 等等.",
       "py": "Qǐng yòng “děngděng” wánchéng duìhuà."
      },
      {
       "hz": "老師說，學中文的時候，聲調、語法、漢字ˍˍˍˍˍ ，都要學。",
       "vi": "Thầy giáo nói khi học tiếng Trung, thanh điệu, ngữ pháp, chữ Hán … đều phải học.",
       "py": "Lǎoshī shuō, xué zhōngwén de shíhòu, shēngdiào, yǔfǎ, hànzì ˍˍˍˍˍ, dōu yào xué."
      },
      {
       "hz": "良介參加了鋼琴社、吉他社、愛心服務社 ˍˍˍˍˍ 三個社團。",
       "vi": "Ryosuke tham gia câu lạc bộ piano, guitar, thiện nguyện … ba câu lạc bộ.",
       "py": "Liángjiè cānjiā le gāngqín shè, jítāshè, àixīn fúwùshè ˍˍˍˍˍ sāngè shètuán."
      },
      {
       "hz": "美國、中國、加拿大 ˍˍˍˍˍˍ國的風景都很美。",
       "vi": "Phong cảnh các nước Mỹ, Trung Quốc, Canada … đều rất đẹp.",
       "py": "Měiguó, Zhōngguó, jiānádà ˍˍˍˍˍˍ guó de fēngjǐng dōu hěn měi."
      },
      {
       "hz": "現在流行的韓國商品不少，有毛衣、帽子、化妝品 ˍˍˍˍˍ 。",
       "vi": "Hàng Hàn Quốc đang thịnh hành không ít, có áo len, mũ, mỹ phẩm ….",
       "py": "Xiànzài liúxíng de Hánguó shāngpǐn bùshǎo, yǒu máoyī, màozi, huàzhuāngpǐn ˍˍˍˍˍ."
      },
      {
       "hz": "請填「等」、「等等」。Điền 等 hoặc 等等 vào chỗ trống.",
       "vi": "Điền 等 hoặc 等等 vào chỗ trống.",
       "py": "Qǐng tián “děng”, “děngděng”. Đ i ề n děng ho ặ c děngděng v à o ch ỗ tr ố ng."
      },
      {
       "hz": "從前，有一隻住在海裡的怪獸，名字叫「年」。從一月到十二月，「年」都在睡覺，什麼東西都不吃。到了除夕，當天一黑，「年」就會出來找東西吃。雞、鴨、人等動物，「年」都吃，讓大家非常害怕，不能好好地過日子，只好帶著一些食物，趕快跑到山上去。",
       "vi": "Ngày xưa, có một con quái thú sống dưới biển tên là “Niên”. Từ tháng Một đến tháng Mười Hai, “Niên” chỉ ngủ, không ăn gì cả. Đến đêm Giao thừa, trời vừa tối là “Niên” ra ngoài tìm đồ ăn. Gà, vịt, người và các động vật khác, “Niên” đều ăn, khiến mọi người vô cùng sợ hãi, không thể sống yên ổn, đành phải mang theo ít đồ ăn, vội vàng chạy lên núi.",
       "py": "Cóngqián, yǒu yìzhī zhù zài hǎilǐ de guàishòu, míngzì jiào “nián”. Cóng yíyuè dào shí'èryuè, “nián” dōu zài shuìjiào, shénme dōngxī dōu bùchī. Dào le chúxì, dàngtiān yì hēi, “nián” jiù huì chūlái zhǎo dōngxī chī. Jī, yā, rén děng dòngwù, “nián” dōu chī, ràng dàjiā fēicháng hàipà, bùnéng hǎohǎo dì guòrìzi, zhǐhǎo dài zhe yìxiē shíwù, gǎnkuài pǎo dào shānshàng qù."
      },
      {
       "hz": "有一年除夕，一個老太太和她先生不願意離開家。他們家很窮，只有一點米，什麼食物都沒有。而且老太太覺得他們家只有兩口人，年紀都大了，讓怪獸給吃了也無所謂。",
       "vi": "Có một năm vào đêm Giao thừa, một bà cụ và chồng không chịu rời nhà. Nhà họ rất nghèo, chỉ có một ít gạo, không có đồ ăn gì cả. Hơn nữa, bà cụ thấy nhà chỉ có hai người, lại đều đã già, có bị quái thú ăn thịt cũng chẳng sao.",
       "py": "Yǒu yìnián chúxì, yígè lǎotàitai hàn tā xiānshēng bú yuànyì líkāi jiā. Tāmen jiā hěnqióng, zhǐyǒu yìdiǎn mǐ, shénme shíwù dōu méiyǒu. Érqiě lǎotàitai juéde tāmen jiā zhǐyǒu liǎngkǒu rén, niánjì dōu dà le, ràng guàishòu gěi chī le yě wúsuǒwèi."
      },
      {
       "hz": "那天下午，老太太的家門口忽然出現了一個老人，他請老太太分一點東西給他吃。老太太覺得他很可憐，就煮了一點兒飯請他吃。老人一邊吃，一邊跟老太太說：「你不用怕『年』，只要準備幾張紅紙、一些竹子，就可以把『年』趕走了。",
       "vi": "Chiều hôm đó, trước cửa nhà bà cụ đột nhiên xuất hiện một ông lão, ông xin bà cụ chia cho ít đồ ăn. Bà cụ thấy ông đáng thương nên nấu một ít cơm mời ông ăn. Ông lão vừa ăn vừa nói với bà cụ: “Bà không cần sợ ‘Niên’, chỉ cần chuẩn bị mấy tờ giấy đỏ và một ít tre là có thể đuổi ‘Niên’ đi.”",
       "py": "Nàtiān xiàwǔ, lǎotàitai de jiāménkǒu hūrán chūxiàn le yígè lǎorén, tā qǐng lǎotàitai fēn yìdiǎn dōngxī gěi tā chī. Lǎotàitai juéde tā hěn kělián, jiù zhǔ le yìdiǎn'ér fàn qǐng tā chī. Lǎorén yìbiān chī, yìbiān gēn lǎotàitai shuō: “Nǐ búyòng pà “nián”, zhǐyào zhǔnbèi jǐzhāng hóngzhǐ, yìxiē zhúzi, jiù kěyǐ bǎ “nián” gǎnzǒu le."
      },
      {
       "hz": "天剛黑，「年」就真的來了。「年」看見了門上的紅紙、地上燒竹子的火，又聽見燒竹子的時候大大的聲音，就嚇得跑走了。原來，「年」怕的就是：紅色、亮亮的東西和很大的聲音。",
       "vi": "Trời vừa tối, “Niên” quả nhiên đến. “Niên” thấy giấy đỏ trên cửa, lửa đốt tre dưới đất, lại nghe tiếng nổ lớn khi tre cháy, liền sợ hãi bỏ chạy. Hoá ra thứ “Niên” sợ chính là: màu đỏ, đồ sáng rực và tiếng động lớn.",
       "py": "Tiān gāng hēi, “nián” jiù zhēnde lái le. “Nián” kànjiàn le ménshàng de hóngzhǐ, dìshàng shāo zhúzi de huǒ, yòu tīngjiàn shāo zhúzi de shíhòu dàdàde shēngyīn, jiù xià de pǎo zǒu le. Yuánlái, “nián” pà de jiùshì: Hóngsè, liàngliàngde dōngxī hàn hěndà de shēngyīn."
      },
      {
       "hz": "第二天，大家從山上回來時，發現老太太和她先生沒被「年」吃了，都覺得很奇怪。老太太說，要不是老人告訴她把「年」嚇走的方法，他們就被吃了。",
       "vi": "Ngày hôm sau, khi mọi người từ trên núi trở về, thấy bà cụ và chồng không bị “Niên” ăn thịt thì đều rất ngạc nhiên. Bà cụ nói, nếu không nhờ ông lão chỉ cho cách doạ “Niên” đi thì hai ông bà đã bị ăn thịt rồi.",
       "py": "Dì'èrtiān, dàjiā cóng shānshàng huílái shí, fāxiàn lǎotàitai hàn tā xiānshēng méi bèi “nián” chī le, dōu juéde hěn qíguài. Lǎotàitai shuō, yàobúshì lǎorén gàosù tā bǎ “nián” xià zǒu de fāngfǎ, tāmen jiù bèi chī le."
      },
      {
       "hz": "從那個時候起，每年的除夕，大家都會在門口貼紅紙、燒竹子。這就是為什麼中國人在過年的時候，要貼春聯、放鞭炮了。",
       "vi": "Từ đó về sau, đêm Giao thừa năm nào mọi người cũng dán giấy đỏ trước cửa, đốt tre. Đó chính là lý do người Hoa dán câu đối xuân, đốt pháo khi đón Tết.",
       "py": "Cóng nàge shíhòu qǐ, měinián de chúxì, dàjiā dōu huì zài ménkǒu tiē hóngzhǐ, shāo zhúzi. Zhè jiùshì wèishénme Zhōngguó rén zài guònián de shíhòu, yào tiē chūnlián, fàngbiānpào le."
      },
      {
       "hz": "「年」到底是什麼？住在哪裡？「年」從一月到十二月都在做什麼？吃什麼？",
       "vi": "Rốt cuộc “Niên” là gì? Sống ở đâu? Từ tháng Một đến tháng Mười Hai “Niên” làm gì? Ăn gì?",
       "py": "“Nián” dàodǐ shì shénme? Zhù zài nǎlǐ? “Nián” cóng yíyuè dào shí'èryuè dōu zài zuò shénme? Chī shénme?"
      },
      {
       "hz": "「年」哪一天會出來？「年」出來以後，會找什麼東西吃？",
       "vi": "“Niên” ra ngoài vào ngày nào? Sau khi ra ngoài, “Niên” tìm gì để ăn?",
       "py": "“Nián” nǎyìtiān huì chūlái? “Nián” chūlái yǐhòu, huì zhǎo shénme dōngxī chī?"
      },
      {
       "hz": "大家怕「年」嗎？「年」要出來以前，大家會做什麼？",
       "vi": "Mọi người có sợ “Niên” không? Trước khi “Niên” xuất hiện, mọi người làm gì?",
       "py": "Dàjiā pà “nián” ma? “Nián” yào chūlái yǐqián, dàjiā huì zuò shénme?"
      },
      {
       "hz": "老太太怕「年」把她和她先生吃了嗎？為什麼？",
       "vi": "Bà cụ có sợ “Niên” ăn thịt bà và chồng không? Tại sao?",
       "py": "Lǎotàitai pà “nián” bǎ tā hàn tā xiānshēng chī le ma? Wèishénme?"
      },
      {
       "hz": "老太太和她先生被「年」吃了嗎？為什麼？",
       "vi": "Bà cụ và chồng có bị “Niên” ăn thịt không? Tại sao?",
       "py": "Lǎotàitai hàn tā xiānshēng bèi “nián” chī le ma? Wèishénme?"
      },
      {
       "hz": "「年」被什麼東西嚇走了？「年」怕什麼？",
       "vi": "“Niên” bị thứ gì doạ chạy? “Niên” sợ gì?",
       "py": "“Nián” bèi shénme dōngxī xià zǒu le? “Nián” pà shénme?"
      },
      {
       "hz": "每年到了除夕，中國人都要做什麼？",
       "vi": "Mỗi năm đến đêm Giao thừa, người Hoa đều làm gì?",
       "py": "Měinián dào le chúxì, Zhōngguó rén dōu yào zuò shénme?"
      },
      {
       "hz": "你覺得老人是什麼人？為什麼他知道怎麼把「年」趕走？",
       "vi": "Bạn nghĩ ông lão là ai? Tại sao ông biết cách đuổi “Niên” đi?",
       "py": "Nǐ juéde lǎorén shì shénme rén? Wèishénme tā zhīdào zěnme bǎ “nián” gǎnzǒu?"
      },
      {
       "hz": "今年的年夜飯有很多菜，雞鴨魚肉什麼都有。",
       "vi": "Bữa cơm tất niên năm nay có rất nhiều món, gà, vịt, cá, thịt gì cũng có.",
       "py": "Jīnnián de niányèfàn yǒu hěnduō cài, jīyāyúròu shénme dōu yǒu."
      },
      {
       "hz": "當警察一出現，小偷就趕快跑了。",
       "vi": "Cảnh sát vừa xuất hiện, tên trộm liền chạy mất.",
       "py": "Dāng jǐngchá yì chūxiàn, xiǎotōu jiù gǎnkuài pǎo le."
      },
      {
       "hz": "當你覺得難過、生氣的時候，就應該去操場運動一下。",
       "vi": "Khi bạn thấy buồn, tức giận thì nên ra sân vận động tập thể dục một chút.",
       "py": "Dāng nǐ juéde nánguò, shēngqì de shíhòu, jiù yīnggāi qù cāochǎng yùndòng yíxià."
      },
      {
       "hz": "當莫以凡第一天參加功夫社的時，就愛上了中國功夫。",
       "vi": "Ngày đầu tiên tham gia câu lạc bộ kung fu, Mạc Dĩ Phàm đã mê ngay kung fu Trung Quốc.",
       "py": "Dāng Mòyǐfán dìyītiān cānjiā gōngfu shè de shí, jiù ài shàng le Zhōngguó gōngfu."
      },
      {
       "hz": "A：你什麼時候要去健身？",
       "vi": "A: Khi nào bạn đi tập gym?",
       "py": "A: Nǐ shénme shíhòu yào qù jiànshēn?"
      },
      {
       "hz": "A：什麼事情會讓你很傷心？",
       "vi": "A: Chuyện gì khiến bạn rất buồn?",
       "py": "A: Shénme shìqíng huì ràng nǐ hěn shāngxīn?"
      },
      {
       "hz": "A：怎麼樣才可以換到便利商店那個可愛的史努比娃娃？",
       "vi": "A: Làm thế nào mới đổi được con búp bê Snoopy dễ thương ở cửa hàng tiện lợi?",
       "py": "A: Zěnmeyàng cái kěyǐ huàn dào biànlìshāngdiàn nàge kě'ài de shǐnǔbǐ wáwá?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 等等 — vân vân",
   "giaiThich": "Giống 等, dùng sau vài ví dụ để nói còn nhiều thứ cùng loại chưa kể hết. Thường không đặt sau danh từ riêng."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic.",
     "examples": [
      {
       "hz": "李先生剛買的照相機讓同事(給)弄壞了。",
       "vi": "Chiếc máy ảnh anh Lý vừa mua bị đồng nghiệp làm hỏng.",
       "py": "Lǐ xiānshēng gāng mǎi de zhàoxiàngjī ràng tóngshì (gěi) nònghuàile."
      },
      {
       "hz": "每次跟朋友去KTV唱歌，都讓他非常開心。",
       "vi": "Lần nào đi hát karaoke với bạn bè cũng khiến anh ấy rất vui.",
       "py": "Měicì gēn péngyǒu qù KTV chànggē, dōu ràng tā fēicháng kāixīn."
      },
      {
       "hz": "我不舒服，老師讓我早一點兒回家休息。",
       "vi": "Tôi không khoẻ, thầy giáo cho tôi về nhà nghỉ sớm một chút.",
       "py": "Wǒ bù shūfú, lǎoshī ràng wǒ zǎo yìdiǎn'ér huíjiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic. 請用提示完成對話。 Complete the dialogues with given words. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "媽媽讓孩子把臥室打掃好了以後，才能玩遊戲。",
       "vi": "Mẹ bắt con dọn xong phòng ngủ rồi mới được chơi game.",
       "py": "Māma ràng háizi bǎ wòshì dǎsǎo hǎo le yǐhòu, cáinéng wányóuxì."
      },
      {
       "hz": "老闆讓我留下來把筆電修好，才讓我下班。這件事讓我很生氣。",
       "vi": "Ông chủ bắt tôi ở lại sửa xong laptop mới cho tôi tan làm. Chuyện này khiến tôi rất tức giận.",
       "py": "Lǎobǎn ràng wǒ liúxiàlái bǎ bǐ diàn xiūhǎo, cái ràng wǒ xiàbān. Zhèjiàn shì ràng wǒ hěn shēngqì."
      },
      {
       "hz": "怪獸「年」讓燒竹子的聲音給嚇跑了。",
       "vi": "Quái thú “Niên” bị tiếng tre cháy doạ chạy mất.",
       "py": "Guàishòu “nián” ràng shāo zhúzi de shēngyīn gěi xiàpǎo le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "III. 無所謂 it doesn't matter …",
   "points": [
    {
     "label": null,
     "formula": "This pattern is often placed after the things the speaker feels indifferent to or does not care about. It can also be used independently . 請用提示完成句子。 Complete the sentences with given words. In this pattern, V can be action verbs, such as “搬(move)”,“拿(take)”,“帶(bring)”,“跑(run)”, “趕(drive)”, “嚇(scare)”, etc. “走” means “to go” or “to leave”. The “走” after the verb, used as post verb complement, means to leave or to disappear. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "父母覺得孩子胖或是瘦都無所謂，只要健康就好了。2. 太太：這個週末我們要去哪裡玩？先生：妳決定吧！我無所謂。3. 老闆：歡迎你來我的餐廳打工，可是錢不多，你願意嗎？學生：錢多不多無所謂，只要能得到寶貴的經驗就好了。",
       "vi": "Bố mẹ thấy con béo hay gầy cũng không sao, chỉ cần khoẻ mạnh là được. Vợ: Cuối tuần này mình đi chơi đâu? Chồng: Em quyết đi! Anh sao cũng được. Ông chủ: Chào mừng em đến nhà hàng tôi làm thêm, nhưng lương không nhiều, em có đồng ý không? Học sinh: Lương nhiều hay ít không quan trọng, chỉ cần có được kinh nghiệm quý báu là được.",
       "py": "Fùmǔ juéde háizi pàng huòshì shòu dōu wúsuǒwèi, zhǐyào jiànkāng jiù hǎo le. 2. Tàitai: Zhège zhōumò wǒmen yào qù nǎlǐ wán? Xiānshēng: Nǐ juédìng ba! Wǒ wúsuǒwèi. 3. Lǎobǎn: Huānyíng nǐ lái wǒ de cāntīng dǎgōng, kěshì qián bù duō, nǐ yuànyì ma? Xuéshēng: Qián duōbùduō wúsuǒwèi, zhǐyào néng dédào bǎoguì de jīngyàn jiù hǎo le."
      },
      {
       "hz": "A：中秋節你想去哪裡看月亮？",
       "vi": "A: Tết Trung thu bạn muốn đi đâu ngắm trăng?",
       "py": "A: Zhōngqiūjié nǐ xiǎng qù nǎlǐ kàn yuèliàng?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ ，只要有月餅可以吃就好了。",
       "vi": "B: …, chỉ cần có bánh trung thu ăn là được.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyào yǒu yuèbǐng kěyǐ chī jiù hǎo le."
      },
      {
       "hz": "A：馬小姐的男朋友離開了她，她怎麼一點兒都不傷心呢？",
       "vi": "A: Bạn trai cô Mã bỏ cô ấy rồi, sao cô ấy chẳng buồn chút nào?",
       "py": "A: Mǎ xiǎojiě de nánpéngyǒu líkāi le tā, tā zěnme yìdiǎn'ér dōu bù shāngxīn ne?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ ，因為她已經有新的男朋友了。",
       "vi": "B: …, vì cô ấy đã có bạn trai mới rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, yīnwèi tā yǐjīng yǒu xīn de nánpéngyǒu le."
      },
      {
       "hz": "A：你明天去光華商場，要去哪一家店買筆電？",
       "vi": "A: Ngày mai bạn đi Quang Hoa Thương Trường, định mua laptop ở cửa hàng nào?",
       "py": "A: Nǐ míngtiān qù guānghuá shāngchǎng, yào qù nǎ yìjiā diàn mǎi bǐ diàn?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍ 。只要有保證書、可以免費修理，我就去那家。",
       "vi": "B: …. Chỉ cần có giấy bảo hành, được sửa miễn phí là tôi mua ở cửa hàng đó.",
       "py": "B: ˍˍˍˍˍˍ. Zhǐyào yǒu bǎozhèngshū, kěyǐ miǎnfèi xiūlǐ, wǒ jiù qù nà jiā."
      },
      {
       "hz": "你們說話的聲音太大了，把孩子們都嚇走了。2. 良介上個學期末就搬走了，現在已經不住在宿舍了。\t3. 這些小說是她要送給同學的，所以回國的時候沒帶走。4. 把錢存在銀行很安全，誰偷得走呢？5. 有一隻蟲子飛進我的房間裡，怎麼趕都趕不走。",
       "vi": "Các bạn nói to quá, làm bọn trẻ sợ chạy mất rồi. Cuối học kỳ trước Ryosuke đã chuyển đi, bây giờ không ở ký túc xá nữa. Những quyển tiểu thuyết này cô ấy định tặng bạn học, nên lúc về nước không mang theo. Gửi tiền trong ngân hàng rất an toàn, ai lấy trộm được? Có một con côn trùng bay vào phòng tôi, đuổi thế nào cũng không đi.",
       "py": "Nǐmen shuōhuà de shēngyīn tài dà le, bǎ háizi men dōu xià zǒu le. 2. Liángjiè shàng gè xuéqímò jiù bānzǒu le, xiànzài yǐjīng búzhù zài sùshè le. 3. Zhèxiē xiǎoshuō shì tā yào sònggěi tóngxué de, suǒyǐ huíguó de shíhòu méi dàizǒu. 4. Bǎ qián cúnzài yínháng hěn ānquán, shéi tōu de zǒu ne? 5. Yǒu yìzhī chóngzi fēi jìn wǒ de fángjiān lǐ, zěnme gǎn dōu gǎn bù zǒu."
      },
      {
       "hz": "IV. V 走：V走了 / 沒V走 / V得走 / V不走",
       "vi": "IV. V走: V đi rồi / chưa V đi / V đi được / V không đi được — làm cho rời đi",
       "py": "IV. V zǒu: V zǒu le / méi V zǒu / V de zǒu / V bù zǒu"
      },
      {
       "hz": "A：這是誰的筆電？",
       "vi": "A: Đây là laptop của ai?",
       "py": "A: Zhè shì shéi de bǐ diàn?"
      },
      {
       "hz": "B：早上開會的時候經理帶來的，ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Sáng nay lúc họp giám đốc mang đến, ….",
       "py": "B: Zǎoshàng kāihuì de shíhòu jīnglǐ dàilái de, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我剛剛放在這裡的飲料跟點心怎麼不見了？",
       "vi": "A: Đồ uống và điểm tâm tôi vừa để ở đây sao lại biến mất rồi?",
       "py": "A: Wǒ gānggāng fàngzài zhèlǐ de yǐnliào gēn diǎnxīn zěnme bújiàn le?"
      },
      {
       "hz": "兒子：媽媽，為什麼「年」不再去人住的地方了？",
       "vi": "Con trai: Mẹ ơi, tại sao “Niên” không đến chỗ người ở nữa?",
       "py": "Érzi: Māma, wèishénme “nián” búzài qù rén zhù de dìfāng le?"
      },
      {
       "hz": "媽媽：因為有一個老人用了幾個方法以後，「年」就4. A：我將來想當大老闆，有很多錢、住在很大的房子、開最貴的B：你的想像力太豐富了。人死了，ˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Mẹ: Vì có một ông lão dùng mấy cách, thế là “Niên” liền… A: Sau này tôi muốn làm ông chủ lớn, có nhiều tiền, ở nhà thật to, lái chiếc xe đắt nhất… B: Trí tưởng tượng của bạn phong phú quá. Người chết rồi thì ….",
       "py": "Māma: Yīnwèi yǒu yígè lǎorén yòng le jǐgè fāngfǎ yǐhòu, “nián” jiù 4. A: Wǒ jiānglái xiǎng dāng dà lǎobǎn, yǒu hěnduō qián, zhù zài hěndà de fángzi, kāi zuì guì de B: Nǐ de xiǎngxiànglì tài fēngfù le. Rén sǐ le, ˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "無所謂 — sao cũng được",
   "giaiThich": "Đặt sau điều mà người nói không bận tâm; cũng dùng đứng riêng một mình để trả lời."
  },
  {
   "title": "V. 要不是 if were not for…",
   "points": [
    {
     "label": null,
     "formula": "\"要不是\" is followed by an accomplished fact. Without the fact, a following situation would occur. That is, the following situation did not really occur. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "要不是春假去了阿里山，我就看不到那麼美麗的日出了。2. 要不是去同學家過年，莫以凡一個人在宿舍一定會很無聊的。3. A：山本良介的中文怎麼說得那麼流利？ B：要不是他每天複習、用功讀書，大概就沒辦法說得那麼好。",
       "vi": "Nếu không phải kỳ nghỉ xuân đi A Lý Sơn thì tôi đã không được ngắm cảnh bình minh đẹp như vậy. Nếu không phải đến nhà bạn học ăn Tết thì Mạc Dĩ Phàm một mình ở ký túc xá chắc chắn sẽ rất buồn chán. A: Sao Yamamoto Ryosuke nói tiếng Trung lưu loát thế? B: Nếu không phải ngày nào cậu ấy cũng ôn bài, chăm chỉ học thì có lẽ đã không nói giỏi được như vậy.",
       "py": "Yàobúshì chūnjià qù le ālǐshān, wǒ jiù kànbúdào nàme měilì de rìchū le. 2. Yàobúshì qù tóngxué jiā guònián, Mòyǐfán yígè rén zài sùshè yídìng huì hěn wúliáo de. 3. A: Shānběn Liángjiè de zhōngwén zěnme shuō de nàme liúlì? B: Yàobúshì tā měitiān fùxí, yònggōngdúshū, dàgài jiù méi bànfǎ shuō de nàme hǎo."
      },
      {
       "hz": "A：這棟公寓離捷運站有點兒遠，你怎麼願意租？",
       "vi": "A: Căn hộ này hơi xa ga tàu điện ngầm, sao bạn lại chịu thuê?",
       "py": "A: Zhèdòng gōngyù lí jiéyùn zhàn yǒudiǎn'ér yuǎn, nǐ zěnme yuànyì zū?"
      },
      {
       "hz": "A：上個週末，為什麼你去了老人安養院？",
       "vi": "A: Cuối tuần trước sao bạn lại đến viện dưỡng lão?",
       "py": "A: Shàng gè zhōumò, wèishénme nǐ qù le lǎorén ānyǎngyuàn?"
      },
      {
       "hz": "A：機票那麼貴，你為什麼不搭火車去高雄呢？",
       "vi": "A: Vé máy bay đắt như vậy, sao bạn không đi tàu hoả đến Cao Hùng?",
       "py": "A: Jīpiào nàme guì, nǐ wèishénme bù dā huǒchē qù Gāoxióng ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "要不是 — nếu không phải vì…",
   "giaiThich": "Sau 要不是 là một sự thật đã xảy ra; nhờ (hoặc tại) sự thật đó mà điều nói sau ĐÃ KHÔNG xảy ra."
  },
  {
   "title": "2. 牛郎織女",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "下面是幾個中國重要的節日，哪幾個是你知道的？請說說看這些節日的時間。在這些節日裡，人們會做什麼、吃什麼？有什麼跟這個節日有關係的故事？",
       "vi": "Dưới đây là một số ngày lễ quan trọng của người Hoa, bạn biết những ngày lễ nào? Hãy nói thời gian của các ngày lễ này. Vào những ngày lễ này, mọi người làm gì, ăn gì? Có câu chuyện nào liên quan đến ngày lễ đó?",
       "py": "Xiàmiàn shì jǐgè Zhōngguó zhòngyào de jiérì, nǎjǐgè shì nǐ zhīdào de? Qǐng shuōshuōkàn zhèxiē jiérì de shíjiān. Zài zhèxiē jiérì lǐ, rénmen huì zuò shénme, chī shénme? Yǒu shénme gēn zhège jiérì yǒu guānxì de gùshì?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: chuyện Ngưu Lang – Chức Nữ",
   "giaiThich": "Phần đọc hiểu/luyện nói theo truyện Ngưu Lang – Chức Nữ."
  },
  {
   "title": "1. 屈原Qūyuán",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "什麼時候？",
       "vi": "Khi nào?",
       "py": "Shénme shíhòu?"
      },
      {
       "hz": "我的國家的重要節日請介紹一個你國家的重要節日。告訴大家，在這個節日裡，你們會做什麼、吃什麼；也說一說跟這個節日有關係的故事，請寫在下表的左邊。",
       "vi": "Ngày lễ quan trọng của nước tôi: Hãy giới thiệu một ngày lễ quan trọng của nước bạn. Kể cho mọi người nghe vào ngày lễ này các bạn làm gì, ăn gì; kể cả câu chuyện liên quan đến ngày lễ đó, hãy viết vào cột bên trái của bảng dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì qǐng jièshào yígè nǐ guójiā de zhòngyào jiérì. Gàosù dàjiā, zài zhège jiérì lǐ, nǐmen huì zuò shénme, chī shénme; yě shuōyìshuō gēn zhège jiérì yǒu guānxì de gùshì, qǐng xiě zài xià biǎo de zuǒbiān."
      },
      {
       "hz": "我的國家的重要節日(2) 你覺得哪一個同學介紹的節日最有趣？請寫在下表的右邊，也請使用下面的生詞、語法。",
       "vi": "Ngày lễ quan trọng của nước tôi (2): Bạn thấy ngày lễ do bạn nào giới thiệu thú vị nhất? Hãy viết vào cột bên phải của bảng, và dùng các từ mới, ngữ pháp dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì (2) nǐ juéde nǎ yígè tóngxué jièshào de jiérì zuì yǒuqù? Qǐng xiě zài xià biǎo de yòubiān, yě qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ."
      },
      {
       "hz": "我國家的節日我覺得有趣的節日",
       "vi": "Ngày lễ của nước tôi · Ngày lễ tôi thấy thú vị",
       "py": "Wǒ guójiā de jiérì wǒ juéde yǒuqù de jiérì"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: Khuất Nguyên",
   "giaiThich": "Phần đọc hiểu/luyện nói theo tích Khuất Nguyên (Tết Đoan Ngọ)."
  }
 ],
 "td2-14.2": [
  {
   "title": "III. 例子 + 等等 example… + and so on",
   "points": [
    {
     "label": null,
     "formula": "Similar to “等”, “等等” is used to show there are still more items of the same kind that are not entirely listed. Normally, “等等” should not be placed after proper nouns. This pattern indicates when a situation occurs, another situation ensues right away. In this pattern, \"當\" is often followed by \"...(的)時(候)\". 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "便利商店的貼紙，可以換尺、牙刷、卡通娃娃等等。2. 為了身體健康，薯條、漢堡、餅乾等等，最好少吃。 3. 去鄉下爺爺奶奶家的時候，我會幫他們種花、剪草等等。",
       "vi": "Nhãn dán của cửa hàng tiện lợi có thể đổi thước kẻ, bàn chải đánh răng, búp bê hoạt hình v.v. Để khoẻ mạnh, khoai tây chiên, hamburger, bánh quy v.v. tốt nhất nên ăn ít. Khi về quê nhà ông bà, tôi giúp ông bà trồng hoa, cắt cỏ v.v.",
       "py": "Biànlìshāngdiàn de tiēzhǐ, kěyǐ huàn chǐ, yáshuā, kǎtōng wáwá děngděng. 2. Wèile shēntǐjiànkāng, shǔtiáo, hànbǎo, bǐnggān děngděng, zuìhǎo shǎo chī. 3. Qù xiāngxià yéyenǎinai jiā de shíhòu, wǒhuì bāng tāmen zhònghuā, jiǎncǎo děngděng."
      },
      {
       "hz": "A：平常你在家會做哪些家事呢？",
       "vi": "A: Bình thường ở nhà bạn làm những việc nhà nào?",
       "py": "A: Píngcháng nǐ zàijiā huì zuò nǎxiē jiāshì ne?"
      },
      {
       "hz": "A：台灣有哪些好吃的水果？請你給我介紹介紹吧！",
       "vi": "A: Đài Loan có những loại trái cây ngon nào? Bạn giới thiệu cho tôi với!",
       "py": "A: Táiwān yǒu nǎxiē hǎochī de shuǐguǒ? Qǐng nǐ gěi wǒ jièshào jièshào ba!"
      },
      {
       "hz": "房客：請問，您要出租的公寓有家具嗎？",
       "vi": "Người thuê nhà: Cho hỏi căn hộ ông cho thuê có đồ nội thất không?",
       "py": "Fángkè: Qǐngwèn, nín yào chūzū de gōngyù yǒu jiājù ma?"
      },
      {
       "hz": "請用「等等」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 等等.",
       "py": "Qǐng yòng “děngděng” wánchéng duìhuà."
      },
      {
       "hz": "老師說，學中文的時候，聲調、語法、漢字ˍˍˍˍˍ ，都要學。",
       "vi": "Thầy giáo nói khi học tiếng Trung, thanh điệu, ngữ pháp, chữ Hán … đều phải học.",
       "py": "Lǎoshī shuō, xué zhōngwén de shíhòu, shēngdiào, yǔfǎ, hànzì ˍˍˍˍˍ, dōu yào xué."
      },
      {
       "hz": "良介參加了鋼琴社、吉他社、愛心服務社 ˍˍˍˍˍ 三個社團。",
       "vi": "Ryosuke tham gia câu lạc bộ piano, guitar, thiện nguyện … ba câu lạc bộ.",
       "py": "Liángjiè cānjiā le gāngqín shè, jítāshè, àixīn fúwùshè ˍˍˍˍˍ sāngè shètuán."
      },
      {
       "hz": "美國、中國、加拿大 ˍˍˍˍˍˍ國的風景都很美。",
       "vi": "Phong cảnh các nước Mỹ, Trung Quốc, Canada … đều rất đẹp.",
       "py": "Měiguó, Zhōngguó, jiānádà ˍˍˍˍˍˍ guó de fēngjǐng dōu hěn měi."
      },
      {
       "hz": "現在流行的韓國商品不少，有毛衣、帽子、化妝品 ˍˍˍˍˍ 。",
       "vi": "Hàng Hàn Quốc đang thịnh hành không ít, có áo len, mũ, mỹ phẩm ….",
       "py": "Xiànzài liúxíng de Hánguó shāngpǐn bùshǎo, yǒu máoyī, màozi, huàzhuāngpǐn ˍˍˍˍˍ."
      },
      {
       "hz": "請填「等」、「等等」。Điền 等 hoặc 等等 vào chỗ trống.",
       "vi": "Điền 等 hoặc 等等 vào chỗ trống.",
       "py": "Qǐng tián “děng”, “děngděng”. Đ i ề n děng ho ặ c děngděng v à o ch ỗ tr ố ng."
      },
      {
       "hz": "從前，有一隻住在海裡的怪獸，名字叫「年」。從一月到十二月，「年」都在睡覺，什麼東西都不吃。到了除夕，當天一黑，「年」就會出來找東西吃。雞、鴨、人等動物，「年」都吃，讓大家非常害怕，不能好好地過日子，只好帶著一些食物，趕快跑到山上去。",
       "vi": "Ngày xưa, có một con quái thú sống dưới biển tên là “Niên”. Từ tháng Một đến tháng Mười Hai, “Niên” chỉ ngủ, không ăn gì cả. Đến đêm Giao thừa, trời vừa tối là “Niên” ra ngoài tìm đồ ăn. Gà, vịt, người và các động vật khác, “Niên” đều ăn, khiến mọi người vô cùng sợ hãi, không thể sống yên ổn, đành phải mang theo ít đồ ăn, vội vàng chạy lên núi.",
       "py": "Cóngqián, yǒu yìzhī zhù zài hǎilǐ de guàishòu, míngzì jiào “nián”. Cóng yíyuè dào shí'èryuè, “nián” dōu zài shuìjiào, shénme dōngxī dōu bùchī. Dào le chúxì, dàngtiān yì hēi, “nián” jiù huì chūlái zhǎo dōngxī chī. Jī, yā, rén děng dòngwù, “nián” dōu chī, ràng dàjiā fēicháng hàipà, bùnéng hǎohǎo dì guòrìzi, zhǐhǎo dài zhe yìxiē shíwù, gǎnkuài pǎo dào shānshàng qù."
      },
      {
       "hz": "有一年除夕，一個老太太和她先生不願意離開家。他們家很窮，只有一點米，什麼食物都沒有。而且老太太覺得他們家只有兩口人，年紀都大了，讓怪獸給吃了也無所謂。",
       "vi": "Có một năm vào đêm Giao thừa, một bà cụ và chồng không chịu rời nhà. Nhà họ rất nghèo, chỉ có một ít gạo, không có đồ ăn gì cả. Hơn nữa, bà cụ thấy nhà chỉ có hai người, lại đều đã già, có bị quái thú ăn thịt cũng chẳng sao.",
       "py": "Yǒu yìnián chúxì, yígè lǎotàitai hàn tā xiānshēng bú yuànyì líkāi jiā. Tāmen jiā hěnqióng, zhǐyǒu yìdiǎn mǐ, shénme shíwù dōu méiyǒu. Érqiě lǎotàitai juéde tāmen jiā zhǐyǒu liǎngkǒu rén, niánjì dōu dà le, ràng guàishòu gěi chī le yě wúsuǒwèi."
      },
      {
       "hz": "那天下午，老太太的家門口忽然出現了一個老人，他請老太太分一點東西給他吃。老太太覺得他很可憐，就煮了一點兒飯請他吃。老人一邊吃，一邊跟老太太說：「你不用怕『年』，只要準備幾張紅紙、一些竹子，就可以把『年』趕走了。",
       "vi": "Chiều hôm đó, trước cửa nhà bà cụ đột nhiên xuất hiện một ông lão, ông xin bà cụ chia cho ít đồ ăn. Bà cụ thấy ông đáng thương nên nấu một ít cơm mời ông ăn. Ông lão vừa ăn vừa nói với bà cụ: “Bà không cần sợ ‘Niên’, chỉ cần chuẩn bị mấy tờ giấy đỏ và một ít tre là có thể đuổi ‘Niên’ đi.”",
       "py": "Nàtiān xiàwǔ, lǎotàitai de jiāménkǒu hūrán chūxiàn le yígè lǎorén, tā qǐng lǎotàitai fēn yìdiǎn dōngxī gěi tā chī. Lǎotàitai juéde tā hěn kělián, jiù zhǔ le yìdiǎn'ér fàn qǐng tā chī. Lǎorén yìbiān chī, yìbiān gēn lǎotàitai shuō: “Nǐ búyòng pà “nián”, zhǐyào zhǔnbèi jǐzhāng hóngzhǐ, yìxiē zhúzi, jiù kěyǐ bǎ “nián” gǎnzǒu le."
      },
      {
       "hz": "天剛黑，「年」就真的來了。「年」看見了門上的紅紙、地上燒竹子的火，又聽見燒竹子的時候大大的聲音，就嚇得跑走了。原來，「年」怕的就是：紅色、亮亮的東西和很大的聲音。",
       "vi": "Trời vừa tối, “Niên” quả nhiên đến. “Niên” thấy giấy đỏ trên cửa, lửa đốt tre dưới đất, lại nghe tiếng nổ lớn khi tre cháy, liền sợ hãi bỏ chạy. Hoá ra thứ “Niên” sợ chính là: màu đỏ, đồ sáng rực và tiếng động lớn.",
       "py": "Tiān gāng hēi, “nián” jiù zhēnde lái le. “Nián” kànjiàn le ménshàng de hóngzhǐ, dìshàng shāo zhúzi de huǒ, yòu tīngjiàn shāo zhúzi de shíhòu dàdàde shēngyīn, jiù xià de pǎo zǒu le. Yuánlái, “nián” pà de jiùshì: Hóngsè, liàngliàngde dōngxī hàn hěndà de shēngyīn."
      },
      {
       "hz": "第二天，大家從山上回來時，發現老太太和她先生沒被「年」吃了，都覺得很奇怪。老太太說，要不是老人告訴她把「年」嚇走的方法，他們就被吃了。",
       "vi": "Ngày hôm sau, khi mọi người từ trên núi trở về, thấy bà cụ và chồng không bị “Niên” ăn thịt thì đều rất ngạc nhiên. Bà cụ nói, nếu không nhờ ông lão chỉ cho cách doạ “Niên” đi thì hai ông bà đã bị ăn thịt rồi.",
       "py": "Dì'èrtiān, dàjiā cóng shānshàng huílái shí, fāxiàn lǎotàitai hàn tā xiānshēng méi bèi “nián” chī le, dōu juéde hěn qíguài. Lǎotàitai shuō, yàobúshì lǎorén gàosù tā bǎ “nián” xià zǒu de fāngfǎ, tāmen jiù bèi chī le."
      },
      {
       "hz": "從那個時候起，每年的除夕，大家都會在門口貼紅紙、燒竹子。這就是為什麼中國人在過年的時候，要貼春聯、放鞭炮了。",
       "vi": "Từ đó về sau, đêm Giao thừa năm nào mọi người cũng dán giấy đỏ trước cửa, đốt tre. Đó chính là lý do người Hoa dán câu đối xuân, đốt pháo khi đón Tết.",
       "py": "Cóng nàge shíhòu qǐ, měinián de chúxì, dàjiā dōu huì zài ménkǒu tiē hóngzhǐ, shāo zhúzi. Zhè jiùshì wèishénme Zhōngguó rén zài guònián de shíhòu, yào tiē chūnlián, fàngbiānpào le."
      },
      {
       "hz": "「年」到底是什麼？住在哪裡？「年」從一月到十二月都在做什麼？吃什麼？",
       "vi": "Rốt cuộc “Niên” là gì? Sống ở đâu? Từ tháng Một đến tháng Mười Hai “Niên” làm gì? Ăn gì?",
       "py": "“Nián” dàodǐ shì shénme? Zhù zài nǎlǐ? “Nián” cóng yíyuè dào shí'èryuè dōu zài zuò shénme? Chī shénme?"
      },
      {
       "hz": "「年」哪一天會出來？「年」出來以後，會找什麼東西吃？",
       "vi": "“Niên” ra ngoài vào ngày nào? Sau khi ra ngoài, “Niên” tìm gì để ăn?",
       "py": "“Nián” nǎyìtiān huì chūlái? “Nián” chūlái yǐhòu, huì zhǎo shénme dōngxī chī?"
      },
      {
       "hz": "大家怕「年」嗎？「年」要出來以前，大家會做什麼？",
       "vi": "Mọi người có sợ “Niên” không? Trước khi “Niên” xuất hiện, mọi người làm gì?",
       "py": "Dàjiā pà “nián” ma? “Nián” yào chūlái yǐqián, dàjiā huì zuò shénme?"
      },
      {
       "hz": "老太太怕「年」把她和她先生吃了嗎？為什麼？",
       "vi": "Bà cụ có sợ “Niên” ăn thịt bà và chồng không? Tại sao?",
       "py": "Lǎotàitai pà “nián” bǎ tā hàn tā xiānshēng chī le ma? Wèishénme?"
      },
      {
       "hz": "老太太和她先生被「年」吃了嗎？為什麼？",
       "vi": "Bà cụ và chồng có bị “Niên” ăn thịt không? Tại sao?",
       "py": "Lǎotàitai hàn tā xiānshēng bèi “nián” chī le ma? Wèishénme?"
      },
      {
       "hz": "「年」被什麼東西嚇走了？「年」怕什麼？",
       "vi": "“Niên” bị thứ gì doạ chạy? “Niên” sợ gì?",
       "py": "“Nián” bèi shénme dōngxī xià zǒu le? “Nián” pà shénme?"
      },
      {
       "hz": "每年到了除夕，中國人都要做什麼？",
       "vi": "Mỗi năm đến đêm Giao thừa, người Hoa đều làm gì?",
       "py": "Měinián dào le chúxì, Zhōngguó rén dōu yào zuò shénme?"
      },
      {
       "hz": "你覺得老人是什麼人？為什麼他知道怎麼把「年」趕走？",
       "vi": "Bạn nghĩ ông lão là ai? Tại sao ông biết cách đuổi “Niên” đi?",
       "py": "Nǐ juéde lǎorén shì shénme rén? Wèishénme tā zhīdào zěnme bǎ “nián” gǎnzǒu?"
      },
      {
       "hz": "今年的年夜飯有很多菜，雞鴨魚肉什麼都有。",
       "vi": "Bữa cơm tất niên năm nay có rất nhiều món, gà, vịt, cá, thịt gì cũng có.",
       "py": "Jīnnián de niányèfàn yǒu hěnduō cài, jīyāyúròu shénme dōu yǒu."
      },
      {
       "hz": "當警察一出現，小偷就趕快跑了。",
       "vi": "Cảnh sát vừa xuất hiện, tên trộm liền chạy mất.",
       "py": "Dāng jǐngchá yì chūxiàn, xiǎotōu jiù gǎnkuài pǎo le."
      },
      {
       "hz": "當你覺得難過、生氣的時候，就應該去操場運動一下。",
       "vi": "Khi bạn thấy buồn, tức giận thì nên ra sân vận động tập thể dục một chút.",
       "py": "Dāng nǐ juéde nánguò, shēngqì de shíhòu, jiù yīnggāi qù cāochǎng yùndòng yíxià."
      },
      {
       "hz": "當莫以凡第一天參加功夫社的時，就愛上了中國功夫。",
       "vi": "Ngày đầu tiên tham gia câu lạc bộ kung fu, Mạc Dĩ Phàm đã mê ngay kung fu Trung Quốc.",
       "py": "Dāng Mòyǐfán dìyītiān cānjiā gōngfu shè de shí, jiù ài shàng le Zhōngguó gōngfu."
      },
      {
       "hz": "A：你什麼時候要去健身？",
       "vi": "A: Khi nào bạn đi tập gym?",
       "py": "A: Nǐ shénme shíhòu yào qù jiànshēn?"
      },
      {
       "hz": "A：什麼事情會讓你很傷心？",
       "vi": "A: Chuyện gì khiến bạn rất buồn?",
       "py": "A: Shénme shìqíng huì ràng nǐ hěn shāngxīn?"
      },
      {
       "hz": "A：怎麼樣才可以換到便利商店那個可愛的史努比娃娃？",
       "vi": "A: Làm thế nào mới đổi được con búp bê Snoopy dễ thương ở cửa hàng tiện lợi?",
       "py": "A: Zěnmeyàng cái kěyǐ huàn dào biànlìshāngdiàn nàge kě'ài de shǐnǔbǐ wáwá?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 等等 — vân vân",
   "giaiThich": "Giống 等, dùng sau vài ví dụ để nói còn nhiều thứ cùng loại chưa kể hết. Thường không đặt sau danh từ riêng."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic.",
     "examples": [
      {
       "hz": "李先生剛買的照相機讓同事(給)弄壞了。",
       "vi": "Chiếc máy ảnh anh Lý vừa mua bị đồng nghiệp làm hỏng.",
       "py": "Lǐ xiānshēng gāng mǎi de zhàoxiàngjī ràng tóngshì (gěi) nònghuàile."
      },
      {
       "hz": "每次跟朋友去KTV唱歌，都讓他非常開心。",
       "vi": "Lần nào đi hát karaoke với bạn bè cũng khiến anh ấy rất vui.",
       "py": "Měicì gēn péngyǒu qù KTV chànggē, dōu ràng tā fēicháng kāixīn."
      },
      {
       "hz": "我不舒服，老師讓我早一點兒回家休息。",
       "vi": "Tôi không khoẻ, thầy giáo cho tôi về nhà nghỉ sớm một chút.",
       "py": "Wǒ bù shūfú, lǎoshī ràng wǒ zǎo yìdiǎn'ér huíjiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic. 請用提示完成對話。 Complete the dialogues with given words. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "媽媽讓孩子把臥室打掃好了以後，才能玩遊戲。",
       "vi": "Mẹ bắt con dọn xong phòng ngủ rồi mới được chơi game.",
       "py": "Māma ràng háizi bǎ wòshì dǎsǎo hǎo le yǐhòu, cáinéng wányóuxì."
      },
      {
       "hz": "老闆讓我留下來把筆電修好，才讓我下班。這件事讓我很生氣。",
       "vi": "Ông chủ bắt tôi ở lại sửa xong laptop mới cho tôi tan làm. Chuyện này khiến tôi rất tức giận.",
       "py": "Lǎobǎn ràng wǒ liúxiàlái bǎ bǐ diàn xiūhǎo, cái ràng wǒ xiàbān. Zhèjiàn shì ràng wǒ hěn shēngqì."
      },
      {
       "hz": "怪獸「年」讓燒竹子的聲音給嚇跑了。",
       "vi": "Quái thú “Niên” bị tiếng tre cháy doạ chạy mất.",
       "py": "Guàishòu “nián” ràng shāo zhúzi de shēngyīn gěi xiàpǎo le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "III. 無所謂 it doesn't matter …",
   "points": [
    {
     "label": null,
     "formula": "This pattern is often placed after the things the speaker feels indifferent to or does not care about. It can also be used independently . 請用提示完成句子。 Complete the sentences with given words. In this pattern, V can be action verbs, such as “搬(move)”,“拿(take)”,“帶(bring)”,“跑(run)”, “趕(drive)”, “嚇(scare)”, etc. “走” means “to go” or “to leave”. The “走” after the verb, used as post verb complement, means to leave or to disappear. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "父母覺得孩子胖或是瘦都無所謂，只要健康就好了。2. 太太：這個週末我們要去哪裡玩？先生：妳決定吧！我無所謂。3. 老闆：歡迎你來我的餐廳打工，可是錢不多，你願意嗎？學生：錢多不多無所謂，只要能得到寶貴的經驗就好了。",
       "vi": "Bố mẹ thấy con béo hay gầy cũng không sao, chỉ cần khoẻ mạnh là được. Vợ: Cuối tuần này mình đi chơi đâu? Chồng: Em quyết đi! Anh sao cũng được. Ông chủ: Chào mừng em đến nhà hàng tôi làm thêm, nhưng lương không nhiều, em có đồng ý không? Học sinh: Lương nhiều hay ít không quan trọng, chỉ cần có được kinh nghiệm quý báu là được.",
       "py": "Fùmǔ juéde háizi pàng huòshì shòu dōu wúsuǒwèi, zhǐyào jiànkāng jiù hǎo le. 2. Tàitai: Zhège zhōumò wǒmen yào qù nǎlǐ wán? Xiānshēng: Nǐ juédìng ba! Wǒ wúsuǒwèi. 3. Lǎobǎn: Huānyíng nǐ lái wǒ de cāntīng dǎgōng, kěshì qián bù duō, nǐ yuànyì ma? Xuéshēng: Qián duōbùduō wúsuǒwèi, zhǐyào néng dédào bǎoguì de jīngyàn jiù hǎo le."
      },
      {
       "hz": "A：中秋節你想去哪裡看月亮？",
       "vi": "A: Tết Trung thu bạn muốn đi đâu ngắm trăng?",
       "py": "A: Zhōngqiūjié nǐ xiǎng qù nǎlǐ kàn yuèliàng?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ ，只要有月餅可以吃就好了。",
       "vi": "B: …, chỉ cần có bánh trung thu ăn là được.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyào yǒu yuèbǐng kěyǐ chī jiù hǎo le."
      },
      {
       "hz": "A：馬小姐的男朋友離開了她，她怎麼一點兒都不傷心呢？",
       "vi": "A: Bạn trai cô Mã bỏ cô ấy rồi, sao cô ấy chẳng buồn chút nào?",
       "py": "A: Mǎ xiǎojiě de nánpéngyǒu líkāi le tā, tā zěnme yìdiǎn'ér dōu bù shāngxīn ne?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ ，因為她已經有新的男朋友了。",
       "vi": "B: …, vì cô ấy đã có bạn trai mới rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, yīnwèi tā yǐjīng yǒu xīn de nánpéngyǒu le."
      },
      {
       "hz": "A：你明天去光華商場，要去哪一家店買筆電？",
       "vi": "A: Ngày mai bạn đi Quang Hoa Thương Trường, định mua laptop ở cửa hàng nào?",
       "py": "A: Nǐ míngtiān qù guānghuá shāngchǎng, yào qù nǎ yìjiā diàn mǎi bǐ diàn?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍ 。只要有保證書、可以免費修理，我就去那家。",
       "vi": "B: …. Chỉ cần có giấy bảo hành, được sửa miễn phí là tôi mua ở cửa hàng đó.",
       "py": "B: ˍˍˍˍˍˍ. Zhǐyào yǒu bǎozhèngshū, kěyǐ miǎnfèi xiūlǐ, wǒ jiù qù nà jiā."
      },
      {
       "hz": "你們說話的聲音太大了，把孩子們都嚇走了。2. 良介上個學期末就搬走了，現在已經不住在宿舍了。\t3. 這些小說是她要送給同學的，所以回國的時候沒帶走。4. 把錢存在銀行很安全，誰偷得走呢？5. 有一隻蟲子飛進我的房間裡，怎麼趕都趕不走。",
       "vi": "Các bạn nói to quá, làm bọn trẻ sợ chạy mất rồi. Cuối học kỳ trước Ryosuke đã chuyển đi, bây giờ không ở ký túc xá nữa. Những quyển tiểu thuyết này cô ấy định tặng bạn học, nên lúc về nước không mang theo. Gửi tiền trong ngân hàng rất an toàn, ai lấy trộm được? Có một con côn trùng bay vào phòng tôi, đuổi thế nào cũng không đi.",
       "py": "Nǐmen shuōhuà de shēngyīn tài dà le, bǎ háizi men dōu xià zǒu le. 2. Liángjiè shàng gè xuéqímò jiù bānzǒu le, xiànzài yǐjīng búzhù zài sùshè le. 3. Zhèxiē xiǎoshuō shì tā yào sònggěi tóngxué de, suǒyǐ huíguó de shíhòu méi dàizǒu. 4. Bǎ qián cúnzài yínháng hěn ānquán, shéi tōu de zǒu ne? 5. Yǒu yìzhī chóngzi fēi jìn wǒ de fángjiān lǐ, zěnme gǎn dōu gǎn bù zǒu."
      },
      {
       "hz": "IV. V 走：V走了 / 沒V走 / V得走 / V不走",
       "vi": "IV. V走: V đi rồi / chưa V đi / V đi được / V không đi được — làm cho rời đi",
       "py": "IV. V zǒu: V zǒu le / méi V zǒu / V de zǒu / V bù zǒu"
      },
      {
       "hz": "A：這是誰的筆電？",
       "vi": "A: Đây là laptop của ai?",
       "py": "A: Zhè shì shéi de bǐ diàn?"
      },
      {
       "hz": "B：早上開會的時候經理帶來的，ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Sáng nay lúc họp giám đốc mang đến, ….",
       "py": "B: Zǎoshàng kāihuì de shíhòu jīnglǐ dàilái de, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我剛剛放在這裡的飲料跟點心怎麼不見了？",
       "vi": "A: Đồ uống và điểm tâm tôi vừa để ở đây sao lại biến mất rồi?",
       "py": "A: Wǒ gānggāng fàngzài zhèlǐ de yǐnliào gēn diǎnxīn zěnme bújiàn le?"
      },
      {
       "hz": "兒子：媽媽，為什麼「年」不再去人住的地方了？",
       "vi": "Con trai: Mẹ ơi, tại sao “Niên” không đến chỗ người ở nữa?",
       "py": "Érzi: Māma, wèishénme “nián” búzài qù rén zhù de dìfāng le?"
      },
      {
       "hz": "媽媽：因為有一個老人用了幾個方法以後，「年」就4. A：我將來想當大老闆，有很多錢、住在很大的房子、開最貴的B：你的想像力太豐富了。人死了，ˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Mẹ: Vì có một ông lão dùng mấy cách, thế là “Niên” liền… A: Sau này tôi muốn làm ông chủ lớn, có nhiều tiền, ở nhà thật to, lái chiếc xe đắt nhất… B: Trí tưởng tượng của bạn phong phú quá. Người chết rồi thì ….",
       "py": "Māma: Yīnwèi yǒu yígè lǎorén yòng le jǐgè fāngfǎ yǐhòu, “nián” jiù 4. A: Wǒ jiānglái xiǎng dāng dà lǎobǎn, yǒu hěnduō qián, zhù zài hěndà de fángzi, kāi zuì guì de B: Nǐ de xiǎngxiànglì tài fēngfù le. Rén sǐ le, ˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "無所謂 — sao cũng được",
   "giaiThich": "Đặt sau điều mà người nói không bận tâm; cũng dùng đứng riêng một mình để trả lời."
  },
  {
   "title": "V. 要不是 if were not for…",
   "points": [
    {
     "label": null,
     "formula": "\"要不是\" is followed by an accomplished fact. Without the fact, a following situation would occur. That is, the following situation did not really occur. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "要不是春假去了阿里山，我就看不到那麼美麗的日出了。2. 要不是去同學家過年，莫以凡一個人在宿舍一定會很無聊的。3. A：山本良介的中文怎麼說得那麼流利？ B：要不是他每天複習、用功讀書，大概就沒辦法說得那麼好。",
       "vi": "Nếu không phải kỳ nghỉ xuân đi A Lý Sơn thì tôi đã không được ngắm cảnh bình minh đẹp như vậy. Nếu không phải đến nhà bạn học ăn Tết thì Mạc Dĩ Phàm một mình ở ký túc xá chắc chắn sẽ rất buồn chán. A: Sao Yamamoto Ryosuke nói tiếng Trung lưu loát thế? B: Nếu không phải ngày nào cậu ấy cũng ôn bài, chăm chỉ học thì có lẽ đã không nói giỏi được như vậy.",
       "py": "Yàobúshì chūnjià qù le ālǐshān, wǒ jiù kànbúdào nàme měilì de rìchū le. 2. Yàobúshì qù tóngxué jiā guònián, Mòyǐfán yígè rén zài sùshè yídìng huì hěn wúliáo de. 3. A: Shānběn Liángjiè de zhōngwén zěnme shuō de nàme liúlì? B: Yàobúshì tā měitiān fùxí, yònggōngdúshū, dàgài jiù méi bànfǎ shuō de nàme hǎo."
      },
      {
       "hz": "A：這棟公寓離捷運站有點兒遠，你怎麼願意租？",
       "vi": "A: Căn hộ này hơi xa ga tàu điện ngầm, sao bạn lại chịu thuê?",
       "py": "A: Zhèdòng gōngyù lí jiéyùn zhàn yǒudiǎn'ér yuǎn, nǐ zěnme yuànyì zū?"
      },
      {
       "hz": "A：上個週末，為什麼你去了老人安養院？",
       "vi": "A: Cuối tuần trước sao bạn lại đến viện dưỡng lão?",
       "py": "A: Shàng gè zhōumò, wèishénme nǐ qù le lǎorén ānyǎngyuàn?"
      },
      {
       "hz": "A：機票那麼貴，你為什麼不搭火車去高雄呢？",
       "vi": "A: Vé máy bay đắt như vậy, sao bạn không đi tàu hoả đến Cao Hùng?",
       "py": "A: Jīpiào nàme guì, nǐ wèishénme bù dā huǒchē qù Gāoxióng ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "要不是 — nếu không phải vì…",
   "giaiThich": "Sau 要不是 là một sự thật đã xảy ra; nhờ (hoặc tại) sự thật đó mà điều nói sau ĐÃ KHÔNG xảy ra."
  },
  {
   "title": "2. 牛郎織女",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "下面是幾個中國重要的節日，哪幾個是你知道的？請說說看這些節日的時間。在這些節日裡，人們會做什麼、吃什麼？有什麼跟這個節日有關係的故事？",
       "vi": "Dưới đây là một số ngày lễ quan trọng của người Hoa, bạn biết những ngày lễ nào? Hãy nói thời gian của các ngày lễ này. Vào những ngày lễ này, mọi người làm gì, ăn gì? Có câu chuyện nào liên quan đến ngày lễ đó?",
       "py": "Xiàmiàn shì jǐgè Zhōngguó zhòngyào de jiérì, nǎjǐgè shì nǐ zhīdào de? Qǐng shuōshuōkàn zhèxiē jiérì de shíjiān. Zài zhèxiē jiérì lǐ, rénmen huì zuò shénme, chī shénme? Yǒu shénme gēn zhège jiérì yǒu guānxì de gùshì?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: chuyện Ngưu Lang – Chức Nữ",
   "giaiThich": "Phần đọc hiểu/luyện nói theo truyện Ngưu Lang – Chức Nữ."
  },
  {
   "title": "1. 屈原Qūyuán",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "什麼時候？",
       "vi": "Khi nào?",
       "py": "Shénme shíhòu?"
      },
      {
       "hz": "我的國家的重要節日請介紹一個你國家的重要節日。告訴大家，在這個節日裡，你們會做什麼、吃什麼；也說一說跟這個節日有關係的故事，請寫在下表的左邊。",
       "vi": "Ngày lễ quan trọng của nước tôi: Hãy giới thiệu một ngày lễ quan trọng của nước bạn. Kể cho mọi người nghe vào ngày lễ này các bạn làm gì, ăn gì; kể cả câu chuyện liên quan đến ngày lễ đó, hãy viết vào cột bên trái của bảng dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì qǐng jièshào yígè nǐ guójiā de zhòngyào jiérì. Gàosù dàjiā, zài zhège jiérì lǐ, nǐmen huì zuò shénme, chī shénme; yě shuōyìshuō gēn zhège jiérì yǒu guānxì de gùshì, qǐng xiě zài xià biǎo de zuǒbiān."
      },
      {
       "hz": "我的國家的重要節日(2) 你覺得哪一個同學介紹的節日最有趣？請寫在下表的右邊，也請使用下面的生詞、語法。",
       "vi": "Ngày lễ quan trọng của nước tôi (2): Bạn thấy ngày lễ do bạn nào giới thiệu thú vị nhất? Hãy viết vào cột bên phải của bảng, và dùng các từ mới, ngữ pháp dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì (2) nǐ juéde nǎ yígè tóngxué jièshào de jiérì zuì yǒuqù? Qǐng xiě zài xià biǎo de yòubiān, yě qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ."
      },
      {
       "hz": "我國家的節日我覺得有趣的節日",
       "vi": "Ngày lễ của nước tôi · Ngày lễ tôi thấy thú vị",
       "py": "Wǒ guójiā de jiérì wǒ juéde yǒuqù de jiérì"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: Khuất Nguyên",
   "giaiThich": "Phần đọc hiểu/luyện nói theo tích Khuất Nguyên (Tết Đoan Ngọ)."
  }
 ],
 "td2-14.3": [
  {
   "title": "III. 例子 + 等等 example… + and so on",
   "points": [
    {
     "label": null,
     "formula": "Similar to “等”, “等等” is used to show there are still more items of the same kind that are not entirely listed. Normally, “等等” should not be placed after proper nouns. This pattern indicates when a situation occurs, another situation ensues right away. In this pattern, \"當\" is often followed by \"...(的)時(候)\". 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "便利商店的貼紙，可以換尺、牙刷、卡通娃娃等等。2. 為了身體健康，薯條、漢堡、餅乾等等，最好少吃。 3. 去鄉下爺爺奶奶家的時候，我會幫他們種花、剪草等等。",
       "vi": "Nhãn dán của cửa hàng tiện lợi có thể đổi thước kẻ, bàn chải đánh răng, búp bê hoạt hình v.v. Để khoẻ mạnh, khoai tây chiên, hamburger, bánh quy v.v. tốt nhất nên ăn ít. Khi về quê nhà ông bà, tôi giúp ông bà trồng hoa, cắt cỏ v.v.",
       "py": "Biànlìshāngdiàn de tiēzhǐ, kěyǐ huàn chǐ, yáshuā, kǎtōng wáwá děngděng. 2. Wèile shēntǐjiànkāng, shǔtiáo, hànbǎo, bǐnggān děngděng, zuìhǎo shǎo chī. 3. Qù xiāngxià yéyenǎinai jiā de shíhòu, wǒhuì bāng tāmen zhònghuā, jiǎncǎo děngděng."
      },
      {
       "hz": "A：平常你在家會做哪些家事呢？",
       "vi": "A: Bình thường ở nhà bạn làm những việc nhà nào?",
       "py": "A: Píngcháng nǐ zàijiā huì zuò nǎxiē jiāshì ne?"
      },
      {
       "hz": "A：台灣有哪些好吃的水果？請你給我介紹介紹吧！",
       "vi": "A: Đài Loan có những loại trái cây ngon nào? Bạn giới thiệu cho tôi với!",
       "py": "A: Táiwān yǒu nǎxiē hǎochī de shuǐguǒ? Qǐng nǐ gěi wǒ jièshào jièshào ba!"
      },
      {
       "hz": "房客：請問，您要出租的公寓有家具嗎？",
       "vi": "Người thuê nhà: Cho hỏi căn hộ ông cho thuê có đồ nội thất không?",
       "py": "Fángkè: Qǐngwèn, nín yào chūzū de gōngyù yǒu jiājù ma?"
      },
      {
       "hz": "請用「等等」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 等等.",
       "py": "Qǐng yòng “děngděng” wánchéng duìhuà."
      },
      {
       "hz": "老師說，學中文的時候，聲調、語法、漢字ˍˍˍˍˍ ，都要學。",
       "vi": "Thầy giáo nói khi học tiếng Trung, thanh điệu, ngữ pháp, chữ Hán … đều phải học.",
       "py": "Lǎoshī shuō, xué zhōngwén de shíhòu, shēngdiào, yǔfǎ, hànzì ˍˍˍˍˍ, dōu yào xué."
      },
      {
       "hz": "良介參加了鋼琴社、吉他社、愛心服務社 ˍˍˍˍˍ 三個社團。",
       "vi": "Ryosuke tham gia câu lạc bộ piano, guitar, thiện nguyện … ba câu lạc bộ.",
       "py": "Liángjiè cānjiā le gāngqín shè, jítāshè, àixīn fúwùshè ˍˍˍˍˍ sāngè shètuán."
      },
      {
       "hz": "美國、中國、加拿大 ˍˍˍˍˍˍ國的風景都很美。",
       "vi": "Phong cảnh các nước Mỹ, Trung Quốc, Canada … đều rất đẹp.",
       "py": "Měiguó, Zhōngguó, jiānádà ˍˍˍˍˍˍ guó de fēngjǐng dōu hěn měi."
      },
      {
       "hz": "現在流行的韓國商品不少，有毛衣、帽子、化妝品 ˍˍˍˍˍ 。",
       "vi": "Hàng Hàn Quốc đang thịnh hành không ít, có áo len, mũ, mỹ phẩm ….",
       "py": "Xiànzài liúxíng de Hánguó shāngpǐn bùshǎo, yǒu máoyī, màozi, huàzhuāngpǐn ˍˍˍˍˍ."
      },
      {
       "hz": "請填「等」、「等等」。Điền 等 hoặc 等等 vào chỗ trống.",
       "vi": "Điền 等 hoặc 等等 vào chỗ trống.",
       "py": "Qǐng tián “děng”, “děngděng”. Đ i ề n děng ho ặ c děngděng v à o ch ỗ tr ố ng."
      },
      {
       "hz": "從前，有一隻住在海裡的怪獸，名字叫「年」。從一月到十二月，「年」都在睡覺，什麼東西都不吃。到了除夕，當天一黑，「年」就會出來找東西吃。雞、鴨、人等動物，「年」都吃，讓大家非常害怕，不能好好地過日子，只好帶著一些食物，趕快跑到山上去。",
       "vi": "Ngày xưa, có một con quái thú sống dưới biển tên là “Niên”. Từ tháng Một đến tháng Mười Hai, “Niên” chỉ ngủ, không ăn gì cả. Đến đêm Giao thừa, trời vừa tối là “Niên” ra ngoài tìm đồ ăn. Gà, vịt, người và các động vật khác, “Niên” đều ăn, khiến mọi người vô cùng sợ hãi, không thể sống yên ổn, đành phải mang theo ít đồ ăn, vội vàng chạy lên núi.",
       "py": "Cóngqián, yǒu yìzhī zhù zài hǎilǐ de guàishòu, míngzì jiào “nián”. Cóng yíyuè dào shí'èryuè, “nián” dōu zài shuìjiào, shénme dōngxī dōu bùchī. Dào le chúxì, dàngtiān yì hēi, “nián” jiù huì chūlái zhǎo dōngxī chī. Jī, yā, rén děng dòngwù, “nián” dōu chī, ràng dàjiā fēicháng hàipà, bùnéng hǎohǎo dì guòrìzi, zhǐhǎo dài zhe yìxiē shíwù, gǎnkuài pǎo dào shānshàng qù."
      },
      {
       "hz": "有一年除夕，一個老太太和她先生不願意離開家。他們家很窮，只有一點米，什麼食物都沒有。而且老太太覺得他們家只有兩口人，年紀都大了，讓怪獸給吃了也無所謂。",
       "vi": "Có một năm vào đêm Giao thừa, một bà cụ và chồng không chịu rời nhà. Nhà họ rất nghèo, chỉ có một ít gạo, không có đồ ăn gì cả. Hơn nữa, bà cụ thấy nhà chỉ có hai người, lại đều đã già, có bị quái thú ăn thịt cũng chẳng sao.",
       "py": "Yǒu yìnián chúxì, yígè lǎotàitai hàn tā xiānshēng bú yuànyì líkāi jiā. Tāmen jiā hěnqióng, zhǐyǒu yìdiǎn mǐ, shénme shíwù dōu méiyǒu. Érqiě lǎotàitai juéde tāmen jiā zhǐyǒu liǎngkǒu rén, niánjì dōu dà le, ràng guàishòu gěi chī le yě wúsuǒwèi."
      },
      {
       "hz": "那天下午，老太太的家門口忽然出現了一個老人，他請老太太分一點東西給他吃。老太太覺得他很可憐，就煮了一點兒飯請他吃。老人一邊吃，一邊跟老太太說：「你不用怕『年』，只要準備幾張紅紙、一些竹子，就可以把『年』趕走了。",
       "vi": "Chiều hôm đó, trước cửa nhà bà cụ đột nhiên xuất hiện một ông lão, ông xin bà cụ chia cho ít đồ ăn. Bà cụ thấy ông đáng thương nên nấu một ít cơm mời ông ăn. Ông lão vừa ăn vừa nói với bà cụ: “Bà không cần sợ ‘Niên’, chỉ cần chuẩn bị mấy tờ giấy đỏ và một ít tre là có thể đuổi ‘Niên’ đi.”",
       "py": "Nàtiān xiàwǔ, lǎotàitai de jiāménkǒu hūrán chūxiàn le yígè lǎorén, tā qǐng lǎotàitai fēn yìdiǎn dōngxī gěi tā chī. Lǎotàitai juéde tā hěn kělián, jiù zhǔ le yìdiǎn'ér fàn qǐng tā chī. Lǎorén yìbiān chī, yìbiān gēn lǎotàitai shuō: “Nǐ búyòng pà “nián”, zhǐyào zhǔnbèi jǐzhāng hóngzhǐ, yìxiē zhúzi, jiù kěyǐ bǎ “nián” gǎnzǒu le."
      },
      {
       "hz": "天剛黑，「年」就真的來了。「年」看見了門上的紅紙、地上燒竹子的火，又聽見燒竹子的時候大大的聲音，就嚇得跑走了。原來，「年」怕的就是：紅色、亮亮的東西和很大的聲音。",
       "vi": "Trời vừa tối, “Niên” quả nhiên đến. “Niên” thấy giấy đỏ trên cửa, lửa đốt tre dưới đất, lại nghe tiếng nổ lớn khi tre cháy, liền sợ hãi bỏ chạy. Hoá ra thứ “Niên” sợ chính là: màu đỏ, đồ sáng rực và tiếng động lớn.",
       "py": "Tiān gāng hēi, “nián” jiù zhēnde lái le. “Nián” kànjiàn le ménshàng de hóngzhǐ, dìshàng shāo zhúzi de huǒ, yòu tīngjiàn shāo zhúzi de shíhòu dàdàde shēngyīn, jiù xià de pǎo zǒu le. Yuánlái, “nián” pà de jiùshì: Hóngsè, liàngliàngde dōngxī hàn hěndà de shēngyīn."
      },
      {
       "hz": "第二天，大家從山上回來時，發現老太太和她先生沒被「年」吃了，都覺得很奇怪。老太太說，要不是老人告訴她把「年」嚇走的方法，他們就被吃了。",
       "vi": "Ngày hôm sau, khi mọi người từ trên núi trở về, thấy bà cụ và chồng không bị “Niên” ăn thịt thì đều rất ngạc nhiên. Bà cụ nói, nếu không nhờ ông lão chỉ cho cách doạ “Niên” đi thì hai ông bà đã bị ăn thịt rồi.",
       "py": "Dì'èrtiān, dàjiā cóng shānshàng huílái shí, fāxiàn lǎotàitai hàn tā xiānshēng méi bèi “nián” chī le, dōu juéde hěn qíguài. Lǎotàitai shuō, yàobúshì lǎorén gàosù tā bǎ “nián” xià zǒu de fāngfǎ, tāmen jiù bèi chī le."
      },
      {
       "hz": "從那個時候起，每年的除夕，大家都會在門口貼紅紙、燒竹子。這就是為什麼中國人在過年的時候，要貼春聯、放鞭炮了。",
       "vi": "Từ đó về sau, đêm Giao thừa năm nào mọi người cũng dán giấy đỏ trước cửa, đốt tre. Đó chính là lý do người Hoa dán câu đối xuân, đốt pháo khi đón Tết.",
       "py": "Cóng nàge shíhòu qǐ, měinián de chúxì, dàjiā dōu huì zài ménkǒu tiē hóngzhǐ, shāo zhúzi. Zhè jiùshì wèishénme Zhōngguó rén zài guònián de shíhòu, yào tiē chūnlián, fàngbiānpào le."
      },
      {
       "hz": "「年」到底是什麼？住在哪裡？「年」從一月到十二月都在做什麼？吃什麼？",
       "vi": "Rốt cuộc “Niên” là gì? Sống ở đâu? Từ tháng Một đến tháng Mười Hai “Niên” làm gì? Ăn gì?",
       "py": "“Nián” dàodǐ shì shénme? Zhù zài nǎlǐ? “Nián” cóng yíyuè dào shí'èryuè dōu zài zuò shénme? Chī shénme?"
      },
      {
       "hz": "「年」哪一天會出來？「年」出來以後，會找什麼東西吃？",
       "vi": "“Niên” ra ngoài vào ngày nào? Sau khi ra ngoài, “Niên” tìm gì để ăn?",
       "py": "“Nián” nǎyìtiān huì chūlái? “Nián” chūlái yǐhòu, huì zhǎo shénme dōngxī chī?"
      },
      {
       "hz": "大家怕「年」嗎？「年」要出來以前，大家會做什麼？",
       "vi": "Mọi người có sợ “Niên” không? Trước khi “Niên” xuất hiện, mọi người làm gì?",
       "py": "Dàjiā pà “nián” ma? “Nián” yào chūlái yǐqián, dàjiā huì zuò shénme?"
      },
      {
       "hz": "老太太怕「年」把她和她先生吃了嗎？為什麼？",
       "vi": "Bà cụ có sợ “Niên” ăn thịt bà và chồng không? Tại sao?",
       "py": "Lǎotàitai pà “nián” bǎ tā hàn tā xiānshēng chī le ma? Wèishénme?"
      },
      {
       "hz": "老太太和她先生被「年」吃了嗎？為什麼？",
       "vi": "Bà cụ và chồng có bị “Niên” ăn thịt không? Tại sao?",
       "py": "Lǎotàitai hàn tā xiānshēng bèi “nián” chī le ma? Wèishénme?"
      },
      {
       "hz": "「年」被什麼東西嚇走了？「年」怕什麼？",
       "vi": "“Niên” bị thứ gì doạ chạy? “Niên” sợ gì?",
       "py": "“Nián” bèi shénme dōngxī xià zǒu le? “Nián” pà shénme?"
      },
      {
       "hz": "每年到了除夕，中國人都要做什麼？",
       "vi": "Mỗi năm đến đêm Giao thừa, người Hoa đều làm gì?",
       "py": "Měinián dào le chúxì, Zhōngguó rén dōu yào zuò shénme?"
      },
      {
       "hz": "你覺得老人是什麼人？為什麼他知道怎麼把「年」趕走？",
       "vi": "Bạn nghĩ ông lão là ai? Tại sao ông biết cách đuổi “Niên” đi?",
       "py": "Nǐ juéde lǎorén shì shénme rén? Wèishénme tā zhīdào zěnme bǎ “nián” gǎnzǒu?"
      },
      {
       "hz": "今年的年夜飯有很多菜，雞鴨魚肉什麼都有。",
       "vi": "Bữa cơm tất niên năm nay có rất nhiều món, gà, vịt, cá, thịt gì cũng có.",
       "py": "Jīnnián de niányèfàn yǒu hěnduō cài, jīyāyúròu shénme dōu yǒu."
      },
      {
       "hz": "當警察一出現，小偷就趕快跑了。",
       "vi": "Cảnh sát vừa xuất hiện, tên trộm liền chạy mất.",
       "py": "Dāng jǐngchá yì chūxiàn, xiǎotōu jiù gǎnkuài pǎo le."
      },
      {
       "hz": "當你覺得難過、生氣的時候，就應該去操場運動一下。",
       "vi": "Khi bạn thấy buồn, tức giận thì nên ra sân vận động tập thể dục một chút.",
       "py": "Dāng nǐ juéde nánguò, shēngqì de shíhòu, jiù yīnggāi qù cāochǎng yùndòng yíxià."
      },
      {
       "hz": "當莫以凡第一天參加功夫社的時，就愛上了中國功夫。",
       "vi": "Ngày đầu tiên tham gia câu lạc bộ kung fu, Mạc Dĩ Phàm đã mê ngay kung fu Trung Quốc.",
       "py": "Dāng Mòyǐfán dìyītiān cānjiā gōngfu shè de shí, jiù ài shàng le Zhōngguó gōngfu."
      },
      {
       "hz": "A：你什麼時候要去健身？",
       "vi": "A: Khi nào bạn đi tập gym?",
       "py": "A: Nǐ shénme shíhòu yào qù jiànshēn?"
      },
      {
       "hz": "A：什麼事情會讓你很傷心？",
       "vi": "A: Chuyện gì khiến bạn rất buồn?",
       "py": "A: Shénme shìqíng huì ràng nǐ hěn shāngxīn?"
      },
      {
       "hz": "A：怎麼樣才可以換到便利商店那個可愛的史努比娃娃？",
       "vi": "A: Làm thế nào mới đổi được con búp bê Snoopy dễ thương ở cửa hàng tiện lợi?",
       "py": "A: Zěnmeyàng cái kěyǐ huàn dào biànlìshāngdiàn nàge kě'ài de shǐnǔbǐ wáwá?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 等等 — vân vân",
   "giaiThich": "Giống 等, dùng sau vài ví dụ để nói còn nhiều thứ cùng loại chưa kể hết. Thường không đặt sau danh từ riêng."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic.",
     "examples": [
      {
       "hz": "李先生剛買的照相機讓同事(給)弄壞了。",
       "vi": "Chiếc máy ảnh anh Lý vừa mua bị đồng nghiệp làm hỏng.",
       "py": "Lǐ xiānshēng gāng mǎi de zhàoxiàngjī ràng tóngshì (gěi) nònghuàile."
      },
      {
       "hz": "每次跟朋友去KTV唱歌，都讓他非常開心。",
       "vi": "Lần nào đi hát karaoke với bạn bè cũng khiến anh ấy rất vui.",
       "py": "Měicì gēn péngyǒu qù KTV chànggē, dōu ràng tā fēicháng kāixīn."
      },
      {
       "hz": "我不舒服，老師讓我早一點兒回家休息。",
       "vi": "Tôi không khoẻ, thầy giáo cho tôi về nhà nghỉ sớm một chút.",
       "py": "Wǒ bù shūfú, lǎoshī ràng wǒ zǎo yìdiǎn'ér huíjiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic. 請用提示完成對話。 Complete the dialogues with given words. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "媽媽讓孩子把臥室打掃好了以後，才能玩遊戲。",
       "vi": "Mẹ bắt con dọn xong phòng ngủ rồi mới được chơi game.",
       "py": "Māma ràng háizi bǎ wòshì dǎsǎo hǎo le yǐhòu, cáinéng wányóuxì."
      },
      {
       "hz": "老闆讓我留下來把筆電修好，才讓我下班。這件事讓我很生氣。",
       "vi": "Ông chủ bắt tôi ở lại sửa xong laptop mới cho tôi tan làm. Chuyện này khiến tôi rất tức giận.",
       "py": "Lǎobǎn ràng wǒ liúxiàlái bǎ bǐ diàn xiūhǎo, cái ràng wǒ xiàbān. Zhèjiàn shì ràng wǒ hěn shēngqì."
      },
      {
       "hz": "怪獸「年」讓燒竹子的聲音給嚇跑了。",
       "vi": "Quái thú “Niên” bị tiếng tre cháy doạ chạy mất.",
       "py": "Guàishòu “nián” ràng shāo zhúzi de shēngyīn gěi xiàpǎo le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "III. 無所謂 it doesn't matter …",
   "points": [
    {
     "label": null,
     "formula": "This pattern is often placed after the things the speaker feels indifferent to or does not care about. It can also be used independently . 請用提示完成句子。 Complete the sentences with given words. In this pattern, V can be action verbs, such as “搬(move)”,“拿(take)”,“帶(bring)”,“跑(run)”, “趕(drive)”, “嚇(scare)”, etc. “走” means “to go” or “to leave”. The “走” after the verb, used as post verb complement, means to leave or to disappear. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "父母覺得孩子胖或是瘦都無所謂，只要健康就好了。2. 太太：這個週末我們要去哪裡玩？先生：妳決定吧！我無所謂。3. 老闆：歡迎你來我的餐廳打工，可是錢不多，你願意嗎？學生：錢多不多無所謂，只要能得到寶貴的經驗就好了。",
       "vi": "Bố mẹ thấy con béo hay gầy cũng không sao, chỉ cần khoẻ mạnh là được. Vợ: Cuối tuần này mình đi chơi đâu? Chồng: Em quyết đi! Anh sao cũng được. Ông chủ: Chào mừng em đến nhà hàng tôi làm thêm, nhưng lương không nhiều, em có đồng ý không? Học sinh: Lương nhiều hay ít không quan trọng, chỉ cần có được kinh nghiệm quý báu là được.",
       "py": "Fùmǔ juéde háizi pàng huòshì shòu dōu wúsuǒwèi, zhǐyào jiànkāng jiù hǎo le. 2. Tàitai: Zhège zhōumò wǒmen yào qù nǎlǐ wán? Xiānshēng: Nǐ juédìng ba! Wǒ wúsuǒwèi. 3. Lǎobǎn: Huānyíng nǐ lái wǒ de cāntīng dǎgōng, kěshì qián bù duō, nǐ yuànyì ma? Xuéshēng: Qián duōbùduō wúsuǒwèi, zhǐyào néng dédào bǎoguì de jīngyàn jiù hǎo le."
      },
      {
       "hz": "A：中秋節你想去哪裡看月亮？",
       "vi": "A: Tết Trung thu bạn muốn đi đâu ngắm trăng?",
       "py": "A: Zhōngqiūjié nǐ xiǎng qù nǎlǐ kàn yuèliàng?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ ，只要有月餅可以吃就好了。",
       "vi": "B: …, chỉ cần có bánh trung thu ăn là được.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyào yǒu yuèbǐng kěyǐ chī jiù hǎo le."
      },
      {
       "hz": "A：馬小姐的男朋友離開了她，她怎麼一點兒都不傷心呢？",
       "vi": "A: Bạn trai cô Mã bỏ cô ấy rồi, sao cô ấy chẳng buồn chút nào?",
       "py": "A: Mǎ xiǎojiě de nánpéngyǒu líkāi le tā, tā zěnme yìdiǎn'ér dōu bù shāngxīn ne?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ ，因為她已經有新的男朋友了。",
       "vi": "B: …, vì cô ấy đã có bạn trai mới rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, yīnwèi tā yǐjīng yǒu xīn de nánpéngyǒu le."
      },
      {
       "hz": "A：你明天去光華商場，要去哪一家店買筆電？",
       "vi": "A: Ngày mai bạn đi Quang Hoa Thương Trường, định mua laptop ở cửa hàng nào?",
       "py": "A: Nǐ míngtiān qù guānghuá shāngchǎng, yào qù nǎ yìjiā diàn mǎi bǐ diàn?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍ 。只要有保證書、可以免費修理，我就去那家。",
       "vi": "B: …. Chỉ cần có giấy bảo hành, được sửa miễn phí là tôi mua ở cửa hàng đó.",
       "py": "B: ˍˍˍˍˍˍ. Zhǐyào yǒu bǎozhèngshū, kěyǐ miǎnfèi xiūlǐ, wǒ jiù qù nà jiā."
      },
      {
       "hz": "你們說話的聲音太大了，把孩子們都嚇走了。2. 良介上個學期末就搬走了，現在已經不住在宿舍了。\t3. 這些小說是她要送給同學的，所以回國的時候沒帶走。4. 把錢存在銀行很安全，誰偷得走呢？5. 有一隻蟲子飛進我的房間裡，怎麼趕都趕不走。",
       "vi": "Các bạn nói to quá, làm bọn trẻ sợ chạy mất rồi. Cuối học kỳ trước Ryosuke đã chuyển đi, bây giờ không ở ký túc xá nữa. Những quyển tiểu thuyết này cô ấy định tặng bạn học, nên lúc về nước không mang theo. Gửi tiền trong ngân hàng rất an toàn, ai lấy trộm được? Có một con côn trùng bay vào phòng tôi, đuổi thế nào cũng không đi.",
       "py": "Nǐmen shuōhuà de shēngyīn tài dà le, bǎ háizi men dōu xià zǒu le. 2. Liángjiè shàng gè xuéqímò jiù bānzǒu le, xiànzài yǐjīng búzhù zài sùshè le. 3. Zhèxiē xiǎoshuō shì tā yào sònggěi tóngxué de, suǒyǐ huíguó de shíhòu méi dàizǒu. 4. Bǎ qián cúnzài yínháng hěn ānquán, shéi tōu de zǒu ne? 5. Yǒu yìzhī chóngzi fēi jìn wǒ de fángjiān lǐ, zěnme gǎn dōu gǎn bù zǒu."
      },
      {
       "hz": "IV. V 走：V走了 / 沒V走 / V得走 / V不走",
       "vi": "IV. V走: V đi rồi / chưa V đi / V đi được / V không đi được — làm cho rời đi",
       "py": "IV. V zǒu: V zǒu le / méi V zǒu / V de zǒu / V bù zǒu"
      },
      {
       "hz": "A：這是誰的筆電？",
       "vi": "A: Đây là laptop của ai?",
       "py": "A: Zhè shì shéi de bǐ diàn?"
      },
      {
       "hz": "B：早上開會的時候經理帶來的，ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Sáng nay lúc họp giám đốc mang đến, ….",
       "py": "B: Zǎoshàng kāihuì de shíhòu jīnglǐ dàilái de, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我剛剛放在這裡的飲料跟點心怎麼不見了？",
       "vi": "A: Đồ uống và điểm tâm tôi vừa để ở đây sao lại biến mất rồi?",
       "py": "A: Wǒ gānggāng fàngzài zhèlǐ de yǐnliào gēn diǎnxīn zěnme bújiàn le?"
      },
      {
       "hz": "兒子：媽媽，為什麼「年」不再去人住的地方了？",
       "vi": "Con trai: Mẹ ơi, tại sao “Niên” không đến chỗ người ở nữa?",
       "py": "Érzi: Māma, wèishénme “nián” búzài qù rén zhù de dìfāng le?"
      },
      {
       "hz": "媽媽：因為有一個老人用了幾個方法以後，「年」就4. A：我將來想當大老闆，有很多錢、住在很大的房子、開最貴的B：你的想像力太豐富了。人死了，ˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Mẹ: Vì có một ông lão dùng mấy cách, thế là “Niên” liền… A: Sau này tôi muốn làm ông chủ lớn, có nhiều tiền, ở nhà thật to, lái chiếc xe đắt nhất… B: Trí tưởng tượng của bạn phong phú quá. Người chết rồi thì ….",
       "py": "Māma: Yīnwèi yǒu yígè lǎorén yòng le jǐgè fāngfǎ yǐhòu, “nián” jiù 4. A: Wǒ jiānglái xiǎng dāng dà lǎobǎn, yǒu hěnduō qián, zhù zài hěndà de fángzi, kāi zuì guì de B: Nǐ de xiǎngxiànglì tài fēngfù le. Rén sǐ le, ˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "無所謂 — sao cũng được",
   "giaiThich": "Đặt sau điều mà người nói không bận tâm; cũng dùng đứng riêng một mình để trả lời."
  },
  {
   "title": "V. 要不是 if were not for…",
   "points": [
    {
     "label": null,
     "formula": "\"要不是\" is followed by an accomplished fact. Without the fact, a following situation would occur. That is, the following situation did not really occur. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "要不是春假去了阿里山，我就看不到那麼美麗的日出了。2. 要不是去同學家過年，莫以凡一個人在宿舍一定會很無聊的。3. A：山本良介的中文怎麼說得那麼流利？ B：要不是他每天複習、用功讀書，大概就沒辦法說得那麼好。",
       "vi": "Nếu không phải kỳ nghỉ xuân đi A Lý Sơn thì tôi đã không được ngắm cảnh bình minh đẹp như vậy. Nếu không phải đến nhà bạn học ăn Tết thì Mạc Dĩ Phàm một mình ở ký túc xá chắc chắn sẽ rất buồn chán. A: Sao Yamamoto Ryosuke nói tiếng Trung lưu loát thế? B: Nếu không phải ngày nào cậu ấy cũng ôn bài, chăm chỉ học thì có lẽ đã không nói giỏi được như vậy.",
       "py": "Yàobúshì chūnjià qù le ālǐshān, wǒ jiù kànbúdào nàme měilì de rìchū le. 2. Yàobúshì qù tóngxué jiā guònián, Mòyǐfán yígè rén zài sùshè yídìng huì hěn wúliáo de. 3. A: Shānběn Liángjiè de zhōngwén zěnme shuō de nàme liúlì? B: Yàobúshì tā měitiān fùxí, yònggōngdúshū, dàgài jiù méi bànfǎ shuō de nàme hǎo."
      },
      {
       "hz": "A：這棟公寓離捷運站有點兒遠，你怎麼願意租？",
       "vi": "A: Căn hộ này hơi xa ga tàu điện ngầm, sao bạn lại chịu thuê?",
       "py": "A: Zhèdòng gōngyù lí jiéyùn zhàn yǒudiǎn'ér yuǎn, nǐ zěnme yuànyì zū?"
      },
      {
       "hz": "A：上個週末，為什麼你去了老人安養院？",
       "vi": "A: Cuối tuần trước sao bạn lại đến viện dưỡng lão?",
       "py": "A: Shàng gè zhōumò, wèishénme nǐ qù le lǎorén ānyǎngyuàn?"
      },
      {
       "hz": "A：機票那麼貴，你為什麼不搭火車去高雄呢？",
       "vi": "A: Vé máy bay đắt như vậy, sao bạn không đi tàu hoả đến Cao Hùng?",
       "py": "A: Jīpiào nàme guì, nǐ wèishénme bù dā huǒchē qù Gāoxióng ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "要不是 — nếu không phải vì…",
   "giaiThich": "Sau 要不是 là một sự thật đã xảy ra; nhờ (hoặc tại) sự thật đó mà điều nói sau ĐÃ KHÔNG xảy ra."
  },
  {
   "title": "2. 牛郎織女",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "下面是幾個中國重要的節日，哪幾個是你知道的？請說說看這些節日的時間。在這些節日裡，人們會做什麼、吃什麼？有什麼跟這個節日有關係的故事？",
       "vi": "Dưới đây là một số ngày lễ quan trọng của người Hoa, bạn biết những ngày lễ nào? Hãy nói thời gian của các ngày lễ này. Vào những ngày lễ này, mọi người làm gì, ăn gì? Có câu chuyện nào liên quan đến ngày lễ đó?",
       "py": "Xiàmiàn shì jǐgè Zhōngguó zhòngyào de jiérì, nǎjǐgè shì nǐ zhīdào de? Qǐng shuōshuōkàn zhèxiē jiérì de shíjiān. Zài zhèxiē jiérì lǐ, rénmen huì zuò shénme, chī shénme? Yǒu shénme gēn zhège jiérì yǒu guānxì de gùshì?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: chuyện Ngưu Lang – Chức Nữ",
   "giaiThich": "Phần đọc hiểu/luyện nói theo truyện Ngưu Lang – Chức Nữ."
  },
  {
   "title": "1. 屈原Qūyuán",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "什麼時候？",
       "vi": "Khi nào?",
       "py": "Shénme shíhòu?"
      },
      {
       "hz": "我的國家的重要節日請介紹一個你國家的重要節日。告訴大家，在這個節日裡，你們會做什麼、吃什麼；也說一說跟這個節日有關係的故事，請寫在下表的左邊。",
       "vi": "Ngày lễ quan trọng của nước tôi: Hãy giới thiệu một ngày lễ quan trọng của nước bạn. Kể cho mọi người nghe vào ngày lễ này các bạn làm gì, ăn gì; kể cả câu chuyện liên quan đến ngày lễ đó, hãy viết vào cột bên trái của bảng dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì qǐng jièshào yígè nǐ guójiā de zhòngyào jiérì. Gàosù dàjiā, zài zhège jiérì lǐ, nǐmen huì zuò shénme, chī shénme; yě shuōyìshuō gēn zhège jiérì yǒu guānxì de gùshì, qǐng xiě zài xià biǎo de zuǒbiān."
      },
      {
       "hz": "我的國家的重要節日(2) 你覺得哪一個同學介紹的節日最有趣？請寫在下表的右邊，也請使用下面的生詞、語法。",
       "vi": "Ngày lễ quan trọng của nước tôi (2): Bạn thấy ngày lễ do bạn nào giới thiệu thú vị nhất? Hãy viết vào cột bên phải của bảng, và dùng các từ mới, ngữ pháp dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì (2) nǐ juéde nǎ yígè tóngxué jièshào de jiérì zuì yǒuqù? Qǐng xiě zài xià biǎo de yòubiān, yě qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ."
      },
      {
       "hz": "我國家的節日我覺得有趣的節日",
       "vi": "Ngày lễ của nước tôi · Ngày lễ tôi thấy thú vị",
       "py": "Wǒ guójiā de jiérì wǒ juéde yǒuqù de jiérì"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: Khuất Nguyên",
   "giaiThich": "Phần đọc hiểu/luyện nói theo tích Khuất Nguyên (Tết Đoan Ngọ)."
  }
 ],
 "td2-14.4": [
  {
   "title": "III. 例子 + 等等 example… + and so on",
   "points": [
    {
     "label": null,
     "formula": "Similar to “等”, “等等” is used to show there are still more items of the same kind that are not entirely listed. Normally, “等等” should not be placed after proper nouns. This pattern indicates when a situation occurs, another situation ensues right away. In this pattern, \"當\" is often followed by \"...(的)時(候)\". 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "便利商店的貼紙，可以換尺、牙刷、卡通娃娃等等。2. 為了身體健康，薯條、漢堡、餅乾等等，最好少吃。 3. 去鄉下爺爺奶奶家的時候，我會幫他們種花、剪草等等。",
       "vi": "Nhãn dán của cửa hàng tiện lợi có thể đổi thước kẻ, bàn chải đánh răng, búp bê hoạt hình v.v. Để khoẻ mạnh, khoai tây chiên, hamburger, bánh quy v.v. tốt nhất nên ăn ít. Khi về quê nhà ông bà, tôi giúp ông bà trồng hoa, cắt cỏ v.v.",
       "py": "Biànlìshāngdiàn de tiēzhǐ, kěyǐ huàn chǐ, yáshuā, kǎtōng wáwá děngděng. 2. Wèile shēntǐjiànkāng, shǔtiáo, hànbǎo, bǐnggān děngděng, zuìhǎo shǎo chī. 3. Qù xiāngxià yéyenǎinai jiā de shíhòu, wǒhuì bāng tāmen zhònghuā, jiǎncǎo děngděng."
      },
      {
       "hz": "A：平常你在家會做哪些家事呢？",
       "vi": "A: Bình thường ở nhà bạn làm những việc nhà nào?",
       "py": "A: Píngcháng nǐ zàijiā huì zuò nǎxiē jiāshì ne?"
      },
      {
       "hz": "A：台灣有哪些好吃的水果？請你給我介紹介紹吧！",
       "vi": "A: Đài Loan có những loại trái cây ngon nào? Bạn giới thiệu cho tôi với!",
       "py": "A: Táiwān yǒu nǎxiē hǎochī de shuǐguǒ? Qǐng nǐ gěi wǒ jièshào jièshào ba!"
      },
      {
       "hz": "房客：請問，您要出租的公寓有家具嗎？",
       "vi": "Người thuê nhà: Cho hỏi căn hộ ông cho thuê có đồ nội thất không?",
       "py": "Fángkè: Qǐngwèn, nín yào chūzū de gōngyù yǒu jiājù ma?"
      },
      {
       "hz": "請用「等等」完成對話。",
       "vi": "Hoàn thành đoạn hội thoại bằng 等等.",
       "py": "Qǐng yòng “děngděng” wánchéng duìhuà."
      },
      {
       "hz": "老師說，學中文的時候，聲調、語法、漢字ˍˍˍˍˍ ，都要學。",
       "vi": "Thầy giáo nói khi học tiếng Trung, thanh điệu, ngữ pháp, chữ Hán … đều phải học.",
       "py": "Lǎoshī shuō, xué zhōngwén de shíhòu, shēngdiào, yǔfǎ, hànzì ˍˍˍˍˍ, dōu yào xué."
      },
      {
       "hz": "良介參加了鋼琴社、吉他社、愛心服務社 ˍˍˍˍˍ 三個社團。",
       "vi": "Ryosuke tham gia câu lạc bộ piano, guitar, thiện nguyện … ba câu lạc bộ.",
       "py": "Liángjiè cānjiā le gāngqín shè, jítāshè, àixīn fúwùshè ˍˍˍˍˍ sāngè shètuán."
      },
      {
       "hz": "美國、中國、加拿大 ˍˍˍˍˍˍ國的風景都很美。",
       "vi": "Phong cảnh các nước Mỹ, Trung Quốc, Canada … đều rất đẹp.",
       "py": "Měiguó, Zhōngguó, jiānádà ˍˍˍˍˍˍ guó de fēngjǐng dōu hěn měi."
      },
      {
       "hz": "現在流行的韓國商品不少，有毛衣、帽子、化妝品 ˍˍˍˍˍ 。",
       "vi": "Hàng Hàn Quốc đang thịnh hành không ít, có áo len, mũ, mỹ phẩm ….",
       "py": "Xiànzài liúxíng de Hánguó shāngpǐn bùshǎo, yǒu máoyī, màozi, huàzhuāngpǐn ˍˍˍˍˍ."
      },
      {
       "hz": "請填「等」、「等等」。Điền 等 hoặc 等等 vào chỗ trống.",
       "vi": "Điền 等 hoặc 等等 vào chỗ trống.",
       "py": "Qǐng tián “děng”, “děngděng”. Đ i ề n děng ho ặ c děngděng v à o ch ỗ tr ố ng."
      },
      {
       "hz": "從前，有一隻住在海裡的怪獸，名字叫「年」。從一月到十二月，「年」都在睡覺，什麼東西都不吃。到了除夕，當天一黑，「年」就會出來找東西吃。雞、鴨、人等動物，「年」都吃，讓大家非常害怕，不能好好地過日子，只好帶著一些食物，趕快跑到山上去。",
       "vi": "Ngày xưa, có một con quái thú sống dưới biển tên là “Niên”. Từ tháng Một đến tháng Mười Hai, “Niên” chỉ ngủ, không ăn gì cả. Đến đêm Giao thừa, trời vừa tối là “Niên” ra ngoài tìm đồ ăn. Gà, vịt, người và các động vật khác, “Niên” đều ăn, khiến mọi người vô cùng sợ hãi, không thể sống yên ổn, đành phải mang theo ít đồ ăn, vội vàng chạy lên núi.",
       "py": "Cóngqián, yǒu yìzhī zhù zài hǎilǐ de guàishòu, míngzì jiào “nián”. Cóng yíyuè dào shí'èryuè, “nián” dōu zài shuìjiào, shénme dōngxī dōu bùchī. Dào le chúxì, dàngtiān yì hēi, “nián” jiù huì chūlái zhǎo dōngxī chī. Jī, yā, rén děng dòngwù, “nián” dōu chī, ràng dàjiā fēicháng hàipà, bùnéng hǎohǎo dì guòrìzi, zhǐhǎo dài zhe yìxiē shíwù, gǎnkuài pǎo dào shānshàng qù."
      },
      {
       "hz": "有一年除夕，一個老太太和她先生不願意離開家。他們家很窮，只有一點米，什麼食物都沒有。而且老太太覺得他們家只有兩口人，年紀都大了，讓怪獸給吃了也無所謂。",
       "vi": "Có một năm vào đêm Giao thừa, một bà cụ và chồng không chịu rời nhà. Nhà họ rất nghèo, chỉ có một ít gạo, không có đồ ăn gì cả. Hơn nữa, bà cụ thấy nhà chỉ có hai người, lại đều đã già, có bị quái thú ăn thịt cũng chẳng sao.",
       "py": "Yǒu yìnián chúxì, yígè lǎotàitai hàn tā xiānshēng bú yuànyì líkāi jiā. Tāmen jiā hěnqióng, zhǐyǒu yìdiǎn mǐ, shénme shíwù dōu méiyǒu. Érqiě lǎotàitai juéde tāmen jiā zhǐyǒu liǎngkǒu rén, niánjì dōu dà le, ràng guàishòu gěi chī le yě wúsuǒwèi."
      },
      {
       "hz": "那天下午，老太太的家門口忽然出現了一個老人，他請老太太分一點東西給他吃。老太太覺得他很可憐，就煮了一點兒飯請他吃。老人一邊吃，一邊跟老太太說：「你不用怕『年』，只要準備幾張紅紙、一些竹子，就可以把『年』趕走了。",
       "vi": "Chiều hôm đó, trước cửa nhà bà cụ đột nhiên xuất hiện một ông lão, ông xin bà cụ chia cho ít đồ ăn. Bà cụ thấy ông đáng thương nên nấu một ít cơm mời ông ăn. Ông lão vừa ăn vừa nói với bà cụ: “Bà không cần sợ ‘Niên’, chỉ cần chuẩn bị mấy tờ giấy đỏ và một ít tre là có thể đuổi ‘Niên’ đi.”",
       "py": "Nàtiān xiàwǔ, lǎotàitai de jiāménkǒu hūrán chūxiàn le yígè lǎorén, tā qǐng lǎotàitai fēn yìdiǎn dōngxī gěi tā chī. Lǎotàitai juéde tā hěn kělián, jiù zhǔ le yìdiǎn'ér fàn qǐng tā chī. Lǎorén yìbiān chī, yìbiān gēn lǎotàitai shuō: “Nǐ búyòng pà “nián”, zhǐyào zhǔnbèi jǐzhāng hóngzhǐ, yìxiē zhúzi, jiù kěyǐ bǎ “nián” gǎnzǒu le."
      },
      {
       "hz": "天剛黑，「年」就真的來了。「年」看見了門上的紅紙、地上燒竹子的火，又聽見燒竹子的時候大大的聲音，就嚇得跑走了。原來，「年」怕的就是：紅色、亮亮的東西和很大的聲音。",
       "vi": "Trời vừa tối, “Niên” quả nhiên đến. “Niên” thấy giấy đỏ trên cửa, lửa đốt tre dưới đất, lại nghe tiếng nổ lớn khi tre cháy, liền sợ hãi bỏ chạy. Hoá ra thứ “Niên” sợ chính là: màu đỏ, đồ sáng rực và tiếng động lớn.",
       "py": "Tiān gāng hēi, “nián” jiù zhēnde lái le. “Nián” kànjiàn le ménshàng de hóngzhǐ, dìshàng shāo zhúzi de huǒ, yòu tīngjiàn shāo zhúzi de shíhòu dàdàde shēngyīn, jiù xià de pǎo zǒu le. Yuánlái, “nián” pà de jiùshì: Hóngsè, liàngliàngde dōngxī hàn hěndà de shēngyīn."
      },
      {
       "hz": "第二天，大家從山上回來時，發現老太太和她先生沒被「年」吃了，都覺得很奇怪。老太太說，要不是老人告訴她把「年」嚇走的方法，他們就被吃了。",
       "vi": "Ngày hôm sau, khi mọi người từ trên núi trở về, thấy bà cụ và chồng không bị “Niên” ăn thịt thì đều rất ngạc nhiên. Bà cụ nói, nếu không nhờ ông lão chỉ cho cách doạ “Niên” đi thì hai ông bà đã bị ăn thịt rồi.",
       "py": "Dì'èrtiān, dàjiā cóng shānshàng huílái shí, fāxiàn lǎotàitai hàn tā xiānshēng méi bèi “nián” chī le, dōu juéde hěn qíguài. Lǎotàitai shuō, yàobúshì lǎorén gàosù tā bǎ “nián” xià zǒu de fāngfǎ, tāmen jiù bèi chī le."
      },
      {
       "hz": "從那個時候起，每年的除夕，大家都會在門口貼紅紙、燒竹子。這就是為什麼中國人在過年的時候，要貼春聯、放鞭炮了。",
       "vi": "Từ đó về sau, đêm Giao thừa năm nào mọi người cũng dán giấy đỏ trước cửa, đốt tre. Đó chính là lý do người Hoa dán câu đối xuân, đốt pháo khi đón Tết.",
       "py": "Cóng nàge shíhòu qǐ, měinián de chúxì, dàjiā dōu huì zài ménkǒu tiē hóngzhǐ, shāo zhúzi. Zhè jiùshì wèishénme Zhōngguó rén zài guònián de shíhòu, yào tiē chūnlián, fàngbiānpào le."
      },
      {
       "hz": "「年」到底是什麼？住在哪裡？「年」從一月到十二月都在做什麼？吃什麼？",
       "vi": "Rốt cuộc “Niên” là gì? Sống ở đâu? Từ tháng Một đến tháng Mười Hai “Niên” làm gì? Ăn gì?",
       "py": "“Nián” dàodǐ shì shénme? Zhù zài nǎlǐ? “Nián” cóng yíyuè dào shí'èryuè dōu zài zuò shénme? Chī shénme?"
      },
      {
       "hz": "「年」哪一天會出來？「年」出來以後，會找什麼東西吃？",
       "vi": "“Niên” ra ngoài vào ngày nào? Sau khi ra ngoài, “Niên” tìm gì để ăn?",
       "py": "“Nián” nǎyìtiān huì chūlái? “Nián” chūlái yǐhòu, huì zhǎo shénme dōngxī chī?"
      },
      {
       "hz": "大家怕「年」嗎？「年」要出來以前，大家會做什麼？",
       "vi": "Mọi người có sợ “Niên” không? Trước khi “Niên” xuất hiện, mọi người làm gì?",
       "py": "Dàjiā pà “nián” ma? “Nián” yào chūlái yǐqián, dàjiā huì zuò shénme?"
      },
      {
       "hz": "老太太怕「年」把她和她先生吃了嗎？為什麼？",
       "vi": "Bà cụ có sợ “Niên” ăn thịt bà và chồng không? Tại sao?",
       "py": "Lǎotàitai pà “nián” bǎ tā hàn tā xiānshēng chī le ma? Wèishénme?"
      },
      {
       "hz": "老太太和她先生被「年」吃了嗎？為什麼？",
       "vi": "Bà cụ và chồng có bị “Niên” ăn thịt không? Tại sao?",
       "py": "Lǎotàitai hàn tā xiānshēng bèi “nián” chī le ma? Wèishénme?"
      },
      {
       "hz": "「年」被什麼東西嚇走了？「年」怕什麼？",
       "vi": "“Niên” bị thứ gì doạ chạy? “Niên” sợ gì?",
       "py": "“Nián” bèi shénme dōngxī xià zǒu le? “Nián” pà shénme?"
      },
      {
       "hz": "每年到了除夕，中國人都要做什麼？",
       "vi": "Mỗi năm đến đêm Giao thừa, người Hoa đều làm gì?",
       "py": "Měinián dào le chúxì, Zhōngguó rén dōu yào zuò shénme?"
      },
      {
       "hz": "你覺得老人是什麼人？為什麼他知道怎麼把「年」趕走？",
       "vi": "Bạn nghĩ ông lão là ai? Tại sao ông biết cách đuổi “Niên” đi?",
       "py": "Nǐ juéde lǎorén shì shénme rén? Wèishénme tā zhīdào zěnme bǎ “nián” gǎnzǒu?"
      },
      {
       "hz": "今年的年夜飯有很多菜，雞鴨魚肉什麼都有。",
       "vi": "Bữa cơm tất niên năm nay có rất nhiều món, gà, vịt, cá, thịt gì cũng có.",
       "py": "Jīnnián de niányèfàn yǒu hěnduō cài, jīyāyúròu shénme dōu yǒu."
      },
      {
       "hz": "當警察一出現，小偷就趕快跑了。",
       "vi": "Cảnh sát vừa xuất hiện, tên trộm liền chạy mất.",
       "py": "Dāng jǐngchá yì chūxiàn, xiǎotōu jiù gǎnkuài pǎo le."
      },
      {
       "hz": "當你覺得難過、生氣的時候，就應該去操場運動一下。",
       "vi": "Khi bạn thấy buồn, tức giận thì nên ra sân vận động tập thể dục một chút.",
       "py": "Dāng nǐ juéde nánguò, shēngqì de shíhòu, jiù yīnggāi qù cāochǎng yùndòng yíxià."
      },
      {
       "hz": "當莫以凡第一天參加功夫社的時，就愛上了中國功夫。",
       "vi": "Ngày đầu tiên tham gia câu lạc bộ kung fu, Mạc Dĩ Phàm đã mê ngay kung fu Trung Quốc.",
       "py": "Dāng Mòyǐfán dìyītiān cānjiā gōngfu shè de shí, jiù ài shàng le Zhōngguó gōngfu."
      },
      {
       "hz": "A：你什麼時候要去健身？",
       "vi": "A: Khi nào bạn đi tập gym?",
       "py": "A: Nǐ shénme shíhòu yào qù jiànshēn?"
      },
      {
       "hz": "A：什麼事情會讓你很傷心？",
       "vi": "A: Chuyện gì khiến bạn rất buồn?",
       "py": "A: Shénme shìqíng huì ràng nǐ hěn shāngxīn?"
      },
      {
       "hz": "A：怎麼樣才可以換到便利商店那個可愛的史努比娃娃？",
       "vi": "A: Làm thế nào mới đổi được con búp bê Snoopy dễ thương ở cửa hàng tiện lợi?",
       "py": "A: Zěnmeyàng cái kěyǐ huàn dào biànlìshāngdiàn nàge kě'ài de shǐnǔbǐ wáwá?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "… 等等 — vân vân",
   "giaiThich": "Giống 等, dùng sau vài ví dụ để nói còn nhiều thứ cùng loại chưa kể hết. Thường không đặt sau danh từ riêng."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic.",
     "examples": [
      {
       "hz": "李先生剛買的照相機讓同事(給)弄壞了。",
       "vi": "Chiếc máy ảnh anh Lý vừa mua bị đồng nghiệp làm hỏng.",
       "py": "Lǐ xiānshēng gāng mǎi de zhàoxiàngjī ràng tóngshì (gěi) nònghuàile."
      },
      {
       "hz": "每次跟朋友去KTV唱歌，都讓他非常開心。",
       "vi": "Lần nào đi hát karaoke với bạn bè cũng khiến anh ấy rất vui.",
       "py": "Měicì gēn péngyǒu qù KTV chànggē, dōu ràng tā fēicháng kāixīn."
      },
      {
       "hz": "我不舒服，老師讓我早一點兒回家休息。",
       "vi": "Tôi không khoẻ, thầy giáo cho tôi về nhà nghỉ sớm một chút.",
       "py": "Wǒ bù shūfú, lǎoshī ràng wǒ zǎo yìdiǎn'ér huíjiā xiūxí."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "2. Used as Verb:",
   "points": [
    {
     "label": null,
     "formula": "This pattern functions as the passive voice expression. The usage of “讓” here is similar to “被”; however, the  Agent after “被” can be omitted while after “讓” cannot be. (1) to make someone…, to cause something to happen (2) to allow, to permit someone to do something (3) to let someone do something or to have someone do something: This usage of imperative “讓” is more polite and euphemistic. 請用提示完成對話。 Complete the dialogues with given words. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "媽媽讓孩子把臥室打掃好了以後，才能玩遊戲。",
       "vi": "Mẹ bắt con dọn xong phòng ngủ rồi mới được chơi game.",
       "py": "Māma ràng háizi bǎ wòshì dǎsǎo hǎo le yǐhòu, cáinéng wányóuxì."
      },
      {
       "hz": "老闆讓我留下來把筆電修好，才讓我下班。這件事讓我很生氣。",
       "vi": "Ông chủ bắt tôi ở lại sửa xong laptop mới cho tôi tan làm. Chuyện này khiến tôi rất tức giận.",
       "py": "Lǎobǎn ràng wǒ liúxiàlái bǎ bǐ diàn xiūhǎo, cái ràng wǒ xiàbān. Zhèjiàn shì ràng wǒ hěn shēngqì."
      },
      {
       "hz": "怪獸「年」讓燒竹子的聲音給嚇跑了。",
       "vi": "Quái thú “Niên” bị tiếng tre cháy doạ chạy mất.",
       "py": "Guàishòu “nián” ràng shāo zhúzi de shēngyīn gěi xiàpǎo le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      },
      {
       "hz": "老闆：不可以喔！帶回去就不新鮮了。",
       "vi": "Chủ quán: Không được đâu! Mang về sẽ không còn tươi nữa.",
       "py": "Lǎobǎn: Bù kěyǐ ō! Dàihuíqù jiù bù xīnxiān le."
      },
      {
       "hz": "請用「讓」完成句子。",
       "vi": "Hoàn thành câu bằng 讓.",
       "py": "Qǐng yòng “ràng” wánchéng jùzi."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "讓 trong câu bị động",
   "giaiThich": "讓 ở đây gần nghĩa 被 (bị/được). Khác nhau: sau 被 có thể lược người gây ra, còn sau 讓 thì KHÔNG được lược."
  },
  {
   "title": "III. 無所謂 it doesn't matter …",
   "points": [
    {
     "label": null,
     "formula": "This pattern is often placed after the things the speaker feels indifferent to or does not care about. It can also be used independently . 請用提示完成句子。 Complete the sentences with given words. In this pattern, V can be action verbs, such as “搬(move)”,“拿(take)”,“帶(bring)”,“跑(run)”, “趕(drive)”, “嚇(scare)”, etc. “走” means “to go” or “to leave”. The “走” after the verb, used as post verb complement, means to leave or to disappear. 請用提示完成句子。 Complete the sentences with given words.",
     "examples": [
      {
       "hz": "父母覺得孩子胖或是瘦都無所謂，只要健康就好了。2. 太太：這個週末我們要去哪裡玩？先生：妳決定吧！我無所謂。3. 老闆：歡迎你來我的餐廳打工，可是錢不多，你願意嗎？學生：錢多不多無所謂，只要能得到寶貴的經驗就好了。",
       "vi": "Bố mẹ thấy con béo hay gầy cũng không sao, chỉ cần khoẻ mạnh là được. Vợ: Cuối tuần này mình đi chơi đâu? Chồng: Em quyết đi! Anh sao cũng được. Ông chủ: Chào mừng em đến nhà hàng tôi làm thêm, nhưng lương không nhiều, em có đồng ý không? Học sinh: Lương nhiều hay ít không quan trọng, chỉ cần có được kinh nghiệm quý báu là được.",
       "py": "Fùmǔ juéde háizi pàng huòshì shòu dōu wúsuǒwèi, zhǐyào jiànkāng jiù hǎo le. 2. Tàitai: Zhège zhōumò wǒmen yào qù nǎlǐ wán? Xiānshēng: Nǐ juédìng ba! Wǒ wúsuǒwèi. 3. Lǎobǎn: Huānyíng nǐ lái wǒ de cāntīng dǎgōng, kěshì qián bù duō, nǐ yuànyì ma? Xuéshēng: Qián duōbùduō wúsuǒwèi, zhǐyào néng dédào bǎoguì de jīngyàn jiù hǎo le."
      },
      {
       "hz": "A：中秋節你想去哪裡看月亮？",
       "vi": "A: Tết Trung thu bạn muốn đi đâu ngắm trăng?",
       "py": "A: Zhōngqiūjié nǐ xiǎng qù nǎlǐ kàn yuèliàng?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ ，只要有月餅可以吃就好了。",
       "vi": "B: …, chỉ cần có bánh trung thu ăn là được.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍˍˍ, zhǐyào yǒu yuèbǐng kěyǐ chī jiù hǎo le."
      },
      {
       "hz": "A：馬小姐的男朋友離開了她，她怎麼一點兒都不傷心呢？",
       "vi": "A: Bạn trai cô Mã bỏ cô ấy rồi, sao cô ấy chẳng buồn chút nào?",
       "py": "A: Mǎ xiǎojiě de nánpéngyǒu líkāi le tā, tā zěnme yìdiǎn'ér dōu bù shāngxīn ne?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍˍˍˍˍˍˍ ，因為她已經有新的男朋友了。",
       "vi": "B: …, vì cô ấy đã có bạn trai mới rồi.",
       "py": "B: ˍˍˍˍˍˍˍˍˍˍˍˍ, yīnwèi tā yǐjīng yǒu xīn de nánpéngyǒu le."
      },
      {
       "hz": "A：你明天去光華商場，要去哪一家店買筆電？",
       "vi": "A: Ngày mai bạn đi Quang Hoa Thương Trường, định mua laptop ở cửa hàng nào?",
       "py": "A: Nǐ míngtiān qù guānghuá shāngchǎng, yào qù nǎ yìjiā diàn mǎi bǐ diàn?"
      },
      {
       "hz": "B：ˍˍˍˍˍˍ 。只要有保證書、可以免費修理，我就去那家。",
       "vi": "B: …. Chỉ cần có giấy bảo hành, được sửa miễn phí là tôi mua ở cửa hàng đó.",
       "py": "B: ˍˍˍˍˍˍ. Zhǐyào yǒu bǎozhèngshū, kěyǐ miǎnfèi xiūlǐ, wǒ jiù qù nà jiā."
      },
      {
       "hz": "你們說話的聲音太大了，把孩子們都嚇走了。2. 良介上個學期末就搬走了，現在已經不住在宿舍了。\t3. 這些小說是她要送給同學的，所以回國的時候沒帶走。4. 把錢存在銀行很安全，誰偷得走呢？5. 有一隻蟲子飛進我的房間裡，怎麼趕都趕不走。",
       "vi": "Các bạn nói to quá, làm bọn trẻ sợ chạy mất rồi. Cuối học kỳ trước Ryosuke đã chuyển đi, bây giờ không ở ký túc xá nữa. Những quyển tiểu thuyết này cô ấy định tặng bạn học, nên lúc về nước không mang theo. Gửi tiền trong ngân hàng rất an toàn, ai lấy trộm được? Có một con côn trùng bay vào phòng tôi, đuổi thế nào cũng không đi.",
       "py": "Nǐmen shuōhuà de shēngyīn tài dà le, bǎ háizi men dōu xià zǒu le. 2. Liángjiè shàng gè xuéqímò jiù bānzǒu le, xiànzài yǐjīng búzhù zài sùshè le. 3. Zhèxiē xiǎoshuō shì tā yào sònggěi tóngxué de, suǒyǐ huíguó de shíhòu méi dàizǒu. 4. Bǎ qián cúnzài yínháng hěn ānquán, shéi tōu de zǒu ne? 5. Yǒu yìzhī chóngzi fēi jìn wǒ de fángjiān lǐ, zěnme gǎn dōu gǎn bù zǒu."
      },
      {
       "hz": "IV. V 走：V走了 / 沒V走 / V得走 / V不走",
       "vi": "IV. V走: V đi rồi / chưa V đi / V đi được / V không đi được — làm cho rời đi",
       "py": "IV. V zǒu: V zǒu le / méi V zǒu / V de zǒu / V bù zǒu"
      },
      {
       "hz": "A：這是誰的筆電？",
       "vi": "A: Đây là laptop của ai?",
       "py": "A: Zhè shì shéi de bǐ diàn?"
      },
      {
       "hz": "B：早上開會的時候經理帶來的，ˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "B: Sáng nay lúc họp giám đốc mang đến, ….",
       "py": "B: Zǎoshàng kāihuì de shíhòu jīnglǐ dàilái de, ˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我剛剛放在這裡的飲料跟點心怎麼不見了？",
       "vi": "A: Đồ uống và điểm tâm tôi vừa để ở đây sao lại biến mất rồi?",
       "py": "A: Wǒ gānggāng fàngzài zhèlǐ de yǐnliào gēn diǎnxīn zěnme bújiàn le?"
      },
      {
       "hz": "兒子：媽媽，為什麼「年」不再去人住的地方了？",
       "vi": "Con trai: Mẹ ơi, tại sao “Niên” không đến chỗ người ở nữa?",
       "py": "Érzi: Māma, wèishénme “nián” búzài qù rén zhù de dìfāng le?"
      },
      {
       "hz": "媽媽：因為有一個老人用了幾個方法以後，「年」就4. A：我將來想當大老闆，有很多錢、住在很大的房子、開最貴的B：你的想像力太豐富了。人死了，ˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Mẹ: Vì có một ông lão dùng mấy cách, thế là “Niên” liền… A: Sau này tôi muốn làm ông chủ lớn, có nhiều tiền, ở nhà thật to, lái chiếc xe đắt nhất… B: Trí tưởng tượng của bạn phong phú quá. Người chết rồi thì ….",
       "py": "Māma: Yīnwèi yǒu yígè lǎorén yòng le jǐgè fāngfǎ yǐhòu, “nián” jiù 4. A: Wǒ jiānglái xiǎng dāng dà lǎobǎn, yǒu hěnduō qián, zhù zài hěndà de fángzi, kāi zuì guì de B: Nǐ de xiǎngxiànglì tài fēngfù le. Rén sǐ le, ˍˍˍˍˍˍˍˍˍˍ."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "無所謂 — sao cũng được",
   "giaiThich": "Đặt sau điều mà người nói không bận tâm; cũng dùng đứng riêng một mình để trả lời."
  },
  {
   "title": "V. 要不是 if were not for…",
   "points": [
    {
     "label": null,
     "formula": "\"要不是\" is followed by an accomplished fact. Without the fact, a following situation would occur. That is, the following situation did not really occur. 請用提示完成對話。 Complete the dialogues with given words.",
     "examples": [
      {
       "hz": "要不是春假去了阿里山，我就看不到那麼美麗的日出了。2. 要不是去同學家過年，莫以凡一個人在宿舍一定會很無聊的。3. A：山本良介的中文怎麼說得那麼流利？ B：要不是他每天複習、用功讀書，大概就沒辦法說得那麼好。",
       "vi": "Nếu không phải kỳ nghỉ xuân đi A Lý Sơn thì tôi đã không được ngắm cảnh bình minh đẹp như vậy. Nếu không phải đến nhà bạn học ăn Tết thì Mạc Dĩ Phàm một mình ở ký túc xá chắc chắn sẽ rất buồn chán. A: Sao Yamamoto Ryosuke nói tiếng Trung lưu loát thế? B: Nếu không phải ngày nào cậu ấy cũng ôn bài, chăm chỉ học thì có lẽ đã không nói giỏi được như vậy.",
       "py": "Yàobúshì chūnjià qù le ālǐshān, wǒ jiù kànbúdào nàme měilì de rìchū le. 2. Yàobúshì qù tóngxué jiā guònián, Mòyǐfán yígè rén zài sùshè yídìng huì hěn wúliáo de. 3. A: Shānběn Liángjiè de zhōngwén zěnme shuō de nàme liúlì? B: Yàobúshì tā měitiān fùxí, yònggōngdúshū, dàgài jiù méi bànfǎ shuō de nàme hǎo."
      },
      {
       "hz": "A：這棟公寓離捷運站有點兒遠，你怎麼願意租？",
       "vi": "A: Căn hộ này hơi xa ga tàu điện ngầm, sao bạn lại chịu thuê?",
       "py": "A: Zhèdòng gōngyù lí jiéyùn zhàn yǒudiǎn'ér yuǎn, nǐ zěnme yuànyì zū?"
      },
      {
       "hz": "A：上個週末，為什麼你去了老人安養院？",
       "vi": "A: Cuối tuần trước sao bạn lại đến viện dưỡng lão?",
       "py": "A: Shàng gè zhōumò, wèishénme nǐ qù le lǎorén ānyǎngyuàn?"
      },
      {
       "hz": "A：機票那麼貴，你為什麼不搭火車去高雄呢？",
       "vi": "A: Vé máy bay đắt như vậy, sao bạn không đi tàu hoả đến Cao Hùng?",
       "py": "A: Jīpiào nàme guì, nǐ wèishénme bù dā huǒchē qù Gāoxióng ne?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "要不是 — nếu không phải vì…",
   "giaiThich": "Sau 要不是 là một sự thật đã xảy ra; nhờ (hoặc tại) sự thật đó mà điều nói sau ĐÃ KHÔNG xảy ra."
  },
  {
   "title": "2. 牛郎織女",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "下面是幾個中國重要的節日，哪幾個是你知道的？請說說看這些節日的時間。在這些節日裡，人們會做什麼、吃什麼？有什麼跟這個節日有關係的故事？",
       "vi": "Dưới đây là một số ngày lễ quan trọng của người Hoa, bạn biết những ngày lễ nào? Hãy nói thời gian của các ngày lễ này. Vào những ngày lễ này, mọi người làm gì, ăn gì? Có câu chuyện nào liên quan đến ngày lễ đó?",
       "py": "Xiàmiàn shì jǐgè Zhōngguó zhòngyào de jiérì, nǎjǐgè shì nǐ zhīdào de? Qǐng shuōshuōkàn zhèxiē jiérì de shíjiān. Zài zhèxiē jiérì lǐ, rénmen huì zuò shénme, chī shénme? Yǒu shénme gēn zhège jiérì yǒu guānxì de gùshì?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: chuyện Ngưu Lang – Chức Nữ",
   "giaiThich": "Phần đọc hiểu/luyện nói theo truyện Ngưu Lang – Chức Nữ."
  },
  {
   "title": "1. 屈原Qūyuán",
   "points": [
    {
     "label": null,
     "formula": null,
     "examples": [
      {
       "hz": "什麼時候？",
       "vi": "Khi nào?",
       "py": "Shénme shíhòu?"
      },
      {
       "hz": "我的國家的重要節日請介紹一個你國家的重要節日。告訴大家，在這個節日裡，你們會做什麼、吃什麼；也說一說跟這個節日有關係的故事，請寫在下表的左邊。",
       "vi": "Ngày lễ quan trọng của nước tôi: Hãy giới thiệu một ngày lễ quan trọng của nước bạn. Kể cho mọi người nghe vào ngày lễ này các bạn làm gì, ăn gì; kể cả câu chuyện liên quan đến ngày lễ đó, hãy viết vào cột bên trái của bảng dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì qǐng jièshào yígè nǐ guójiā de zhòngyào jiérì. Gàosù dàjiā, zài zhège jiérì lǐ, nǐmen huì zuò shénme, chī shénme; yě shuōyìshuō gēn zhège jiérì yǒu guānxì de gùshì, qǐng xiě zài xià biǎo de zuǒbiān."
      },
      {
       "hz": "我的國家的重要節日(2) 你覺得哪一個同學介紹的節日最有趣？請寫在下表的右邊，也請使用下面的生詞、語法。",
       "vi": "Ngày lễ quan trọng của nước tôi (2): Bạn thấy ngày lễ do bạn nào giới thiệu thú vị nhất? Hãy viết vào cột bên phải của bảng, và dùng các từ mới, ngữ pháp dưới đây.",
       "py": "Wǒ de guójiā de zhòngyào jiérì (2) nǐ juéde nǎ yígè tóngxué jièshào de jiérì zuì yǒuqù? Qǐng xiě zài xià biǎo de yòubiān, yě qǐng shǐyòng xiàmiàn de shēngcí, yǔfǎ."
      },
      {
       "hz": "我國家的節日我覺得有趣的節日",
       "vi": "Ngày lễ của nước tôi · Ngày lễ tôi thấy thú vị",
       "py": "Wǒ guójiā de jiérì wǒ juéde yǒuqù de jiérì"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "Luyện tập: Khuất Nguyên",
   "giaiThich": "Phần đọc hiểu/luyện nói theo tích Khuất Nguyên (Tết Đoan Ngọ)."
  }
 ],
 "td2-16.1": [
  {
   "title": "II. 對NP來說 as far as NP is concerned",
   "points": [
    {
     "label": null,
     "formula": "The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a specific event.",
     "examples": [
      {
       "hz": "對孔子來說，有教無類、因材施教是他的理想。",
       "vi": "Đối với Khổng Tử, dạy học không phân biệt và dạy theo năng lực người học là lý tưởng của ông.",
       "py": "Duì Kǒngzi láishuō, yǒujiàowúlèi, yīncáishījiào shì tā de lǐxiǎng."
      },
      {
       "hz": "對交換學生來說，來台灣留學可以接觸到更多的台灣文化。",
       "vi": "Đối với sinh viên trao đổi, sang Đài Loan du học có thể tiếp xúc nhiều hơn với văn hoá Đài Loan.",
       "py": "Duì jiāohuàn xuéshēng láishuō, lái Táiwān liúxué kěyǐ jiēchù dào gèng duō de Táiwān wénhuà."
      },
      {
       "hz": "A：那個牌子很有名，一件外套賣一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác bán một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào mài yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B：你很有錢，對你來說是不貴，可是對學生來說，應該不便宜。",
       "vi": "B: Bạn rất giàu, đối với bạn thì không đắt, nhưng đối với sinh viên thì chắc chắn không rẻ.",
       "py": "B: Nǐ hěn yǒuqián, duì nǐ láishuō shì bú guì, kěshì duì xuéshēng láishuō, yīnggāi bù piányi."
      },
      {
       "hz": "對 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 來說，納豆是很特別的食物。",
       "vi": "Đối với … mà nói, natto là một món ăn rất đặc biệt.",
       "py": "Duì ˍˍˍˍˍˍˍˍˍˍˍˍˍ láishuō, nà dòu shì hěn tèbié de shíwù."
      },
      {
       "hz": "對外國人來說，夜市是 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Đối với người nước ngoài, chợ đêm là ….",
       "py": "Duì wàiguórén láishuō, yèshì shì ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 來說 — đối với… mà nói",
   "giaiThich": "Nêu quan điểm, thái độ của một người đối với sự việc cụ thể."
  },
  {
   "title": "III. 只有......才...... only…; only if…",
   "points": [
    {
     "label": null,
     "formula": "“只有” is followed by the necessary condition. This pattern emphasizes that only by fulfilling the condition can the result after “才” be achieved. 請用提示完成對話。 Complete the dialogues with given pharses.",
     "examples": [
      {
       "hz": "只有用功念書，期末考得考好才不會被當。",
       "vi": "Chỉ có chăm chỉ học bài, thi cuối kỳ đạt điểm tốt mới không bị trượt.",
       "py": "Zhǐyǒu yònggōng niànshū, qímòkǎo děi kǎo hǎo cái búhuì bèi dāng."
      },
      {
       "hz": "只有買東西滿一百塊錢，才能得到一張好貼紙。",
       "vi": "Chỉ khi mua hàng đủ một trăm đồng mới được một nhãn dán đẹp.",
       "py": "Zhǐyǒu mǎi dōngxī mǎn yìbǎikuài qián, cáinéng dédào yìzhāng hǎo tiēzhǐ."
      },
      {
       "hz": "只有報名的學生，才可以參加這個文化日的活動。",
       "vi": "Chỉ những học sinh đã đăng ký mới được tham gia hoạt động Ngày Văn hoá này.",
       "py": "Zhǐyǒu bàomíng de xuéshēng, cái kěyǐ cānjiā zhège wénhuà rì de huódòng."
      },
      {
       "hz": "A：你什麼時候回去爺爺奶奶家拜祖先？(除夕)B：平常不去，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "A: Khi nào bạn về nhà ông bà cúng tổ tiên? (đêm Giao thừa) B: Bình thường không về, ….",
       "py": "A: Nǐ shénme shíhòu huíqù yéyenǎinai jiā bài zǔxiān? (chúxì) B: Píngcháng bú qù, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我計畫將來的職業是當大學教授。(研究所)3. A：在台灣，哪裡買得到中美洲的咖啡呢？(大一點兒的超市)",
       "vi": "A: Nghề nghiệp tôi dự định sau này là làm giáo sư đại học. (cao học) A: Ở Đài Loan mua cà phê Trung Mỹ ở đâu được? (siêu thị lớn một chút)",
       "py": "A: Wǒ jìhuà jiānglái de zhíyè shì dāng dàxuéjiàoshòu. (yánjiūsuǒ) 3. A: Zài Táiwān, nǎlǐ mǎi dédào zhōngměizhōu de kāfēi ne? (dà yìdiǎn'ér de chāoshì)"
      },
      {
       "hz": "你的同學是從哪些國家來的？你覺得他們的國家有什麼特色？寫完以後，請你看看其他同學跟你寫的一樣嗎？你覺得為什麼不一樣？",
       "vi": "Các bạn cùng lớp của bạn đến từ những nước nào? Bạn thấy đất nước họ có đặc điểm gì? Viết xong, hãy xem các bạn khác viết có giống bạn không? Bạn nghĩ tại sao lại khác?",
       "py": "Nǐ de tóngxué shìcóng nǎxiē guójiā lái de? Nǐ juéde tāmen de guójiā yǒu shénme tèsè? Xiě wán yǐhòu, qǐng nǐ kànkàn qítātóngxué gēn nǐ xiě de yíyàng ma? Nǐ juéde wèishénme bù yíyàng?"
      },
      {
       "hz": "一樣？不一樣？",
       "vi": "Giống nhau? Khác nhau?",
       "py": "Yīyàng? Bù yíyàng?"
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只有… 才… — chỉ có… mới…",
   "giaiThich": "只有 nêu điều kiện BẮT BUỘC; chỉ khi thoả điều kiện đó thì kết quả sau 才 mới đạt được."
  }
 ],
 "td2-16.2": [
  {
   "title": "II. 對NP來說 as far as NP is concerned",
   "points": [
    {
     "label": null,
     "formula": "The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a specific event.",
     "examples": [
      {
       "hz": "對孔子來說，有教無類、因材施教是他的理想。",
       "vi": "Đối với Khổng Tử, dạy học không phân biệt và dạy theo năng lực người học là lý tưởng của ông.",
       "py": "Duì Kǒngzi láishuō, yǒujiàowúlèi, yīncáishījiào shì tā de lǐxiǎng."
      },
      {
       "hz": "對交換學生來說，來台灣留學可以接觸到更多的台灣文化。",
       "vi": "Đối với sinh viên trao đổi, sang Đài Loan du học có thể tiếp xúc nhiều hơn với văn hoá Đài Loan.",
       "py": "Duì jiāohuàn xuéshēng láishuō, lái Táiwān liúxué kěyǐ jiēchù dào gèng duō de Táiwān wénhuà."
      },
      {
       "hz": "A：那個牌子很有名，一件外套賣一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác bán một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào mài yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B：你很有錢，對你來說是不貴，可是對學生來說，應該不便宜。",
       "vi": "B: Bạn rất giàu, đối với bạn thì không đắt, nhưng đối với sinh viên thì chắc chắn không rẻ.",
       "py": "B: Nǐ hěn yǒuqián, duì nǐ láishuō shì bú guì, kěshì duì xuéshēng láishuō, yīnggāi bù piányi."
      },
      {
       "hz": "對 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 來說，納豆是很特別的食物。",
       "vi": "Đối với … mà nói, natto là một món ăn rất đặc biệt.",
       "py": "Duì ˍˍˍˍˍˍˍˍˍˍˍˍˍ láishuō, nà dòu shì hěn tèbié de shíwù."
      },
      {
       "hz": "對外國人來說，夜市是 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Đối với người nước ngoài, chợ đêm là ….",
       "py": "Duì wàiguórén láishuō, yèshì shì ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 來說 — đối với… mà nói",
   "giaiThich": "Nêu quan điểm, thái độ của một người đối với sự việc cụ thể."
  },
  {
   "title": "III. 只有......才...... only…; only if…",
   "points": [
    {
     "label": null,
     "formula": "“只有” is followed by the necessary condition. This pattern emphasizes that only by fulfilling the condition can the result after “才” be achieved. 請用提示完成對話。 Complete the dialogues with given pharses.",
     "examples": [
      {
       "hz": "只有用功念書，期末考得考好才不會被當。",
       "vi": "Chỉ có chăm chỉ học bài, thi cuối kỳ đạt điểm tốt mới không bị trượt.",
       "py": "Zhǐyǒu yònggōng niànshū, qímòkǎo děi kǎo hǎo cái búhuì bèi dāng."
      },
      {
       "hz": "只有買東西滿一百塊錢，才能得到一張好貼紙。",
       "vi": "Chỉ khi mua hàng đủ một trăm đồng mới được một nhãn dán đẹp.",
       "py": "Zhǐyǒu mǎi dōngxī mǎn yìbǎikuài qián, cáinéng dédào yìzhāng hǎo tiēzhǐ."
      },
      {
       "hz": "只有報名的學生，才可以參加這個文化日的活動。",
       "vi": "Chỉ những học sinh đã đăng ký mới được tham gia hoạt động Ngày Văn hoá này.",
       "py": "Zhǐyǒu bàomíng de xuéshēng, cái kěyǐ cānjiā zhège wénhuà rì de huódòng."
      },
      {
       "hz": "A：你什麼時候回去爺爺奶奶家拜祖先？(除夕)B：平常不去，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "A: Khi nào bạn về nhà ông bà cúng tổ tiên? (đêm Giao thừa) B: Bình thường không về, ….",
       "py": "A: Nǐ shénme shíhòu huíqù yéyenǎinai jiā bài zǔxiān? (chúxì) B: Píngcháng bú qù, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我計畫將來的職業是當大學教授。(研究所)3. A：在台灣，哪裡買得到中美洲的咖啡呢？(大一點兒的超市)",
       "vi": "A: Nghề nghiệp tôi dự định sau này là làm giáo sư đại học. (cao học) A: Ở Đài Loan mua cà phê Trung Mỹ ở đâu được? (siêu thị lớn một chút)",
       "py": "A: Wǒ jìhuà jiānglái de zhíyè shì dāng dàxuéjiàoshòu. (yánjiūsuǒ) 3. A: Zài Táiwān, nǎlǐ mǎi dédào zhōngměizhōu de kāfēi ne? (dà yìdiǎn'ér de chāoshì)"
      },
      {
       "hz": "你的同學是從哪些國家來的？你覺得他們的國家有什麼特色？寫完以後，請你看看其他同學跟你寫的一樣嗎？你覺得為什麼不一樣？",
       "vi": "Các bạn cùng lớp của bạn đến từ những nước nào? Bạn thấy đất nước họ có đặc điểm gì? Viết xong, hãy xem các bạn khác viết có giống bạn không? Bạn nghĩ tại sao lại khác?",
       "py": "Nǐ de tóngxué shìcóng nǎxiē guójiā lái de? Nǐ juéde tāmen de guójiā yǒu shénme tèsè? Xiě wán yǐhòu, qǐng nǐ kànkàn qítātóngxué gēn nǐ xiě de yíyàng ma? Nǐ juéde wèishénme bù yíyàng?"
      },
      {
       "hz": "一樣？不一樣？",
       "vi": "Giống nhau? Khác nhau?",
       "py": "Yīyàng? Bù yíyàng?"
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只有… 才… — chỉ có… mới…",
   "giaiThich": "只有 nêu điều kiện BẮT BUỘC; chỉ khi thoả điều kiện đó thì kết quả sau 才 mới đạt được."
  }
 ],
 "td2-16.3": [
  {
   "title": "II. 對NP來說 as far as NP is concerned",
   "points": [
    {
     "label": null,
     "formula": "The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a specific event.",
     "examples": [
      {
       "hz": "對孔子來說，有教無類、因材施教是他的理想。",
       "vi": "Đối với Khổng Tử, dạy học không phân biệt và dạy theo năng lực người học là lý tưởng của ông.",
       "py": "Duì Kǒngzi láishuō, yǒujiàowúlèi, yīncáishījiào shì tā de lǐxiǎng."
      },
      {
       "hz": "對交換學生來說，來台灣留學可以接觸到更多的台灣文化。",
       "vi": "Đối với sinh viên trao đổi, sang Đài Loan du học có thể tiếp xúc nhiều hơn với văn hoá Đài Loan.",
       "py": "Duì jiāohuàn xuéshēng láishuō, lái Táiwān liúxué kěyǐ jiēchù dào gèng duō de Táiwān wénhuà."
      },
      {
       "hz": "A：那個牌子很有名，一件外套賣一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác bán một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào mài yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B：你很有錢，對你來說是不貴，可是對學生來說，應該不便宜。",
       "vi": "B: Bạn rất giàu, đối với bạn thì không đắt, nhưng đối với sinh viên thì chắc chắn không rẻ.",
       "py": "B: Nǐ hěn yǒuqián, duì nǐ láishuō shì bú guì, kěshì duì xuéshēng láishuō, yīnggāi bù piányi."
      },
      {
       "hz": "對 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 來說，納豆是很特別的食物。",
       "vi": "Đối với … mà nói, natto là một món ăn rất đặc biệt.",
       "py": "Duì ˍˍˍˍˍˍˍˍˍˍˍˍˍ láishuō, nà dòu shì hěn tèbié de shíwù."
      },
      {
       "hz": "對外國人來說，夜市是 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Đối với người nước ngoài, chợ đêm là ….",
       "py": "Duì wàiguórén láishuō, yèshì shì ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 來說 — đối với… mà nói",
   "giaiThich": "Nêu quan điểm, thái độ của một người đối với sự việc cụ thể."
  },
  {
   "title": "III. 只有......才...... only…; only if…",
   "points": [
    {
     "label": null,
     "formula": "“只有” is followed by the necessary condition. This pattern emphasizes that only by fulfilling the condition can the result after “才” be achieved. 請用提示完成對話。 Complete the dialogues with given pharses.",
     "examples": [
      {
       "hz": "只有用功念書，期末考得考好才不會被當。",
       "vi": "Chỉ có chăm chỉ học bài, thi cuối kỳ đạt điểm tốt mới không bị trượt.",
       "py": "Zhǐyǒu yònggōng niànshū, qímòkǎo děi kǎo hǎo cái búhuì bèi dāng."
      },
      {
       "hz": "只有買東西滿一百塊錢，才能得到一張好貼紙。",
       "vi": "Chỉ khi mua hàng đủ một trăm đồng mới được một nhãn dán đẹp.",
       "py": "Zhǐyǒu mǎi dōngxī mǎn yìbǎikuài qián, cáinéng dédào yìzhāng hǎo tiēzhǐ."
      },
      {
       "hz": "只有報名的學生，才可以參加這個文化日的活動。",
       "vi": "Chỉ những học sinh đã đăng ký mới được tham gia hoạt động Ngày Văn hoá này.",
       "py": "Zhǐyǒu bàomíng de xuéshēng, cái kěyǐ cānjiā zhège wénhuà rì de huódòng."
      },
      {
       "hz": "A：你什麼時候回去爺爺奶奶家拜祖先？(除夕)B：平常不去，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "A: Khi nào bạn về nhà ông bà cúng tổ tiên? (đêm Giao thừa) B: Bình thường không về, ….",
       "py": "A: Nǐ shénme shíhòu huíqù yéyenǎinai jiā bài zǔxiān? (chúxì) B: Píngcháng bú qù, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我計畫將來的職業是當大學教授。(研究所)3. A：在台灣，哪裡買得到中美洲的咖啡呢？(大一點兒的超市)",
       "vi": "A: Nghề nghiệp tôi dự định sau này là làm giáo sư đại học. (cao học) A: Ở Đài Loan mua cà phê Trung Mỹ ở đâu được? (siêu thị lớn một chút)",
       "py": "A: Wǒ jìhuà jiānglái de zhíyè shì dāng dàxuéjiàoshòu. (yánjiūsuǒ) 3. A: Zài Táiwān, nǎlǐ mǎi dédào zhōngměizhōu de kāfēi ne? (dà yìdiǎn'ér de chāoshì)"
      },
      {
       "hz": "你的同學是從哪些國家來的？你覺得他們的國家有什麼特色？寫完以後，請你看看其他同學跟你寫的一樣嗎？你覺得為什麼不一樣？",
       "vi": "Các bạn cùng lớp của bạn đến từ những nước nào? Bạn thấy đất nước họ có đặc điểm gì? Viết xong, hãy xem các bạn khác viết có giống bạn không? Bạn nghĩ tại sao lại khác?",
       "py": "Nǐ de tóngxué shìcóng nǎxiē guójiā lái de? Nǐ juéde tāmen de guójiā yǒu shénme tèsè? Xiě wán yǐhòu, qǐng nǐ kànkàn qítātóngxué gēn nǐ xiě de yíyàng ma? Nǐ juéde wèishénme bù yíyàng?"
      },
      {
       "hz": "一樣？不一樣？",
       "vi": "Giống nhau? Khác nhau?",
       "py": "Yīyàng? Bù yíyàng?"
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只有… 才… — chỉ có… mới…",
   "giaiThich": "只有 nêu điều kiện BẮT BUỘC; chỉ khi thoả điều kiện đó thì kết quả sau 才 mới đạt được."
  }
 ],
 "td2-16.4": [
  {
   "title": "II. 對NP來說 as far as NP is concerned",
   "points": [
    {
     "label": null,
     "formula": "The pattern “對 NP 來說” is used to show someone’s opinion or attitude toward a specific event.",
     "examples": [
      {
       "hz": "對孔子來說，有教無類、因材施教是他的理想。",
       "vi": "Đối với Khổng Tử, dạy học không phân biệt và dạy theo năng lực người học là lý tưởng của ông.",
       "py": "Duì Kǒngzi láishuō, yǒujiàowúlèi, yīncáishījiào shì tā de lǐxiǎng."
      },
      {
       "hz": "對交換學生來說，來台灣留學可以接觸到更多的台灣文化。",
       "vi": "Đối với sinh viên trao đổi, sang Đài Loan du học có thể tiếp xúc nhiều hơn với văn hoá Đài Loan.",
       "py": "Duì jiāohuàn xuéshēng láishuō, lái Táiwān liúxué kěyǐ jiēchù dào gèng duō de Táiwān wénhuà."
      },
      {
       "hz": "A：那個牌子很有名，一件外套賣一萬元，我覺得不貴。",
       "vi": "A: Nhãn hiệu đó rất nổi tiếng, một chiếc áo khoác bán một vạn đồng, tôi thấy không đắt.",
       "py": "A: Nàge páizi hěn yǒumíng, yíjiàn wàitào mài yíwànyuán, wǒ juéde bú guì."
      },
      {
       "hz": "B：你很有錢，對你來說是不貴，可是對學生來說，應該不便宜。",
       "vi": "B: Bạn rất giàu, đối với bạn thì không đắt, nhưng đối với sinh viên thì chắc chắn không rẻ.",
       "py": "B: Nǐ hěn yǒuqián, duì nǐ láishuō shì bú guì, kěshì duì xuéshēng láishuō, yīnggāi bù piányi."
      },
      {
       "hz": "對 ˍˍˍˍˍˍˍˍˍˍˍˍˍ 來說，納豆是很特別的食物。",
       "vi": "Đối với … mà nói, natto là một món ăn rất đặc biệt.",
       "py": "Duì ˍˍˍˍˍˍˍˍˍˍˍˍˍ láishuō, nà dòu shì hěn tèbié de shíwù."
      },
      {
       "hz": "對外國人來說，夜市是 ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "Đối với người nước ngoài, chợ đêm là ….",
       "py": "Duì wàiguórén láishuō, yèshì shì ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：這個公寓一個月的房租要兩萬塊，你覺得怎麼樣？",
       "vi": "A: Căn hộ này tiền thuê một tháng hai vạn đồng, bạn thấy sao?",
       "py": "A: Zhège gōngyù yígèyuè de fángzū yào liǎngwànkuài, nǐ juéde zěnmeyàng?"
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "對… 來說 — đối với… mà nói",
   "giaiThich": "Nêu quan điểm, thái độ của một người đối với sự việc cụ thể."
  },
  {
   "title": "III. 只有......才...... only…; only if…",
   "points": [
    {
     "label": null,
     "formula": "“只有” is followed by the necessary condition. This pattern emphasizes that only by fulfilling the condition can the result after “才” be achieved. 請用提示完成對話。 Complete the dialogues with given pharses.",
     "examples": [
      {
       "hz": "只有用功念書，期末考得考好才不會被當。",
       "vi": "Chỉ có chăm chỉ học bài, thi cuối kỳ đạt điểm tốt mới không bị trượt.",
       "py": "Zhǐyǒu yònggōng niànshū, qímòkǎo děi kǎo hǎo cái búhuì bèi dāng."
      },
      {
       "hz": "只有買東西滿一百塊錢，才能得到一張好貼紙。",
       "vi": "Chỉ khi mua hàng đủ một trăm đồng mới được một nhãn dán đẹp.",
       "py": "Zhǐyǒu mǎi dōngxī mǎn yìbǎikuài qián, cáinéng dédào yìzhāng hǎo tiēzhǐ."
      },
      {
       "hz": "只有報名的學生，才可以參加這個文化日的活動。",
       "vi": "Chỉ những học sinh đã đăng ký mới được tham gia hoạt động Ngày Văn hoá này.",
       "py": "Zhǐyǒu bàomíng de xuéshēng, cái kěyǐ cānjiā zhège wénhuà rì de huódòng."
      },
      {
       "hz": "A：你什麼時候回去爺爺奶奶家拜祖先？(除夕)B：平常不去，ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ。",
       "vi": "A: Khi nào bạn về nhà ông bà cúng tổ tiên? (đêm Giao thừa) B: Bình thường không về, ….",
       "py": "A: Nǐ shénme shíhòu huíqù yéyenǎinai jiā bài zǔxiān? (chúxì) B: Píngcháng bú qù, ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ."
      },
      {
       "hz": "A：我計畫將來的職業是當大學教授。(研究所)3. A：在台灣，哪裡買得到中美洲的咖啡呢？(大一點兒的超市)",
       "vi": "A: Nghề nghiệp tôi dự định sau này là làm giáo sư đại học. (cao học) A: Ở Đài Loan mua cà phê Trung Mỹ ở đâu được? (siêu thị lớn một chút)",
       "py": "A: Wǒ jìhuà jiānglái de zhíyè shì dāng dàxuéjiàoshòu. (yánjiūsuǒ) 3. A: Zài Táiwān, nǎlǐ mǎi dédào zhōngměizhōu de kāfēi ne? (dà yìdiǎn'ér de chāoshì)"
      },
      {
       "hz": "你的同學是從哪些國家來的？你覺得他們的國家有什麼特色？寫完以後，請你看看其他同學跟你寫的一樣嗎？你覺得為什麼不一樣？",
       "vi": "Các bạn cùng lớp của bạn đến từ những nước nào? Bạn thấy đất nước họ có đặc điểm gì? Viết xong, hãy xem các bạn khác viết có giống bạn không? Bạn nghĩ tại sao lại khác?",
       "py": "Nǐ de tóngxué shìcóng nǎxiē guójiā lái de? Nǐ juéde tāmen de guójiā yǒu shénme tèsè? Xiě wán yǐhòu, qǐng nǐ kànkàn qítātóngxué gēn nǐ xiě de yíyàng ma? Nǐ juéde wèishénme bù yíyàng?"
      },
      {
       "hz": "一樣？不一樣？",
       "vi": "Giống nhau? Khác nhau?",
       "py": "Yīyàng? Bù yíyàng?"
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      },
      {
       "hz": "介紹你的國家請你跟你的同學一起計畫世界文化日，想一想你們能用什麼方式介紹你們國家的特色，讓其他國家的人能好好地了解你們的國家。再請你們畫一張節目表。",
       "vi": "Giới thiệu đất nước bạn: Hãy cùng các bạn lên kế hoạch cho Ngày Văn hoá Thế giới, nghĩ xem có thể dùng cách nào để giới thiệu đặc điểm đất nước mình, giúp người nước khác hiểu rõ về đất nước các bạn. Sau đó hãy vẽ một bảng chương trình.",
       "py": "Jièshào nǐ de guójiā qǐng nǐ gēn nǐ de tóngxué yìqǐ jìhuà shìjiè wénhuà rì, xiǎngyìxiǎng nǐmen néng yòng shénme fāngshì jièshào nǐmen guójiā de tèsè, ràng qítā guójiā de rén néng hǎohǎo dì liǎojiě nǐmen de guójiā. Zài qǐng nǐmen huà yìzhāng jiémùbiǎo."
      }
     ],
     "answer": null
    }
   ],
   "titleVi": "只有… 才… — chỉ có… mới…",
   "giaiThich": "只有 nêu điều kiện BẮT BUỘC; chỉ khi thoả điều kiện đó thì kết quả sau 才 mới đạt được."
  }
 ]
};
