// ============================================================
// BẢNG PHIÊN ÂM TIẾNG TRUNG (thanh 1) — dữ liệu thuần frontend
// Sinh bởi scripts/gen-pinyin-chart (chạy 1 lần), sửa tay được.
//
// pinyinChart[<thanh mẫu>][<vận mẫu>] = [ <pinyin không dấu>, <chữ Hán thanh 1 | null> ]
// Ô nào chữ Hán = null  ->  âm tiết đó không có chữ thanh 1 thông dụng (cen: 岑 đọc cén, thanh 2
// — đừng điền lại), vẫn hiện trong bảng và vẫn nghe được nếu `pinyinChartAudio` có bản thu.
// '∅' = không có thanh mẫu (âm tiết chỉ có vận mẫu).
// '-i' = vận mẫu "i câm" trong zhi/chi/shi/ri/zi/ci/si.
// ============================================================

export const pinyinChartGroups = [
  {
    "key": "kai",
    "label": "Nhóm gốc",
    "labelCn": "開口呼",
    "color": "violet",
    "finals": [
      "-i",
      "a",
      "o",
      "e",
      "ai",
      "ei",
      "ao",
      "ou",
      "an",
      "en",
      "ang",
      "eng",
      "ong",
      "er"
    ]
  },
  {
    "key": "qi",
    "label": "Nhóm i-",
    "labelCn": "齊齒呼",
    "color": "amber",
    "finals": [
      "i",
      "ia",
      "ie",
      "iao",
      "iu",
      "ian",
      "in",
      "iang",
      "ing",
      "iong"
    ]
  },
  {
    "key": "he",
    "label": "Nhóm u-",
    "labelCn": "合口呼",
    "color": "coral",
    "finals": [
      "u",
      "ua",
      "uo",
      "uai",
      "ui",
      "uan",
      "un",
      "uang",
      "ueng"
    ]
  },
  {
    "key": "cuo",
    "label": "Nhóm ü-",
    "labelCn": "撮口呼",
    "color": "green",
    "finals": [
      "ü",
      "üe",
      "üan",
      "ün"
    ]
  }
];

export const pinyinChartInitials = ["∅","b","p","m","f","d","t","n","l","g","k","h","j","q","x","zh","ch","sh","r","z","c","s"];

export const pinyinChart = {
 "∅": {
  "a": [
   "a",
   "啊"
  ],
  "o": [
   "o",
   "喔"
  ],
  "e": [
   "e",
   "婀"
  ],
  "ai": [
   "ai",
   "哀"
  ],
  "ei": [
   "ei",
   null
  ],
  "ao": [
   "ao",
   "凹"
  ],
  "ou": [
   "ou",
   "歐"
  ],
  "an": [
   "an",
   "安"
  ],
  "en": [
   "en",
   "恩"
  ],
  "ang": [
   "ang",
   "骯"
  ],
  "eng": [
   "eng",
   null
  ],
  "er": [
   "er",
   null
  ],
  "i": [
   "yi",
   "一"
  ],
  "ia": [
   "ya",
   "呀"
  ],
  "ie": [
   "ye",
   "耶"
  ],
  "iao": [
   "yao",
   "腰"
  ],
  "iu": [
   "you",
   "優"
  ],
  "ian": [
   "yan",
   "煙"
  ],
  "in": [
   "yin",
   "音"
  ],
  "iang": [
   "yang",
   "央"
  ],
  "ing": [
   "ying",
   "英"
  ],
  "iong": [
   "yong",
   "傭"
  ],
  "u": [
   "wu",
   "屋"
  ],
  "ua": [
   "wa",
   "挖"
  ],
  "uo": [
   "wo",
   "窩"
  ],
  "uai": [
   "wai",
   "歪"
  ],
  "ui": [
   "wei",
   "威"
  ],
  "uan": [
   "wan",
   "彎"
  ],
  "un": [
   "wen",
   "溫"
  ],
  "uang": [
   "wang",
   "汪"
  ],
  "ueng": [
   "weng",
   "翁"
  ],
  "ü": [
   "yu",
   "迂"
  ],
  "üe": [
   "yue",
   "約"
  ],
  "üan": [
   "yuan",
   "冤"
  ],
  "ün": [
   "yun",
   "暈"
  ]
 },
 "b": {
  "a": [
   "ba",
   "巴"
  ],
  "o": [
   "bo",
   "波"
  ],
  "ai": [
   "bai",
   "掰"
  ],
  "ei": [
   "bei",
   "杯"
  ],
  "ao": [
   "bao",
   "包"
  ],
  "an": [
   "ban",
   "班"
  ],
  "en": [
   "ben",
   "奔"
  ],
  "ang": [
   "bang",
   "幫"
  ],
  "eng": [
   "beng",
   "崩"
  ],
  "i": [
   "bi",
   "逼"
  ],
  "ie": [
   "bie",
   "憋"
  ],
  "iao": [
   "biao",
   "標"
  ],
  "ian": [
   "bian",
   "邊"
  ],
  "in": [
   "bin",
   "賓"
  ],
  "ing": [
   "bing",
   "冰"
  ],
  "u": [
   "bu",
   null
  ]
 },
 "p": {
  "a": [
   "pa",
   "趴"
  ],
  "o": [
   "po",
   "坡"
  ],
  "ai": [
   "pai",
   "拍"
  ],
  "ei": [
   "pei",
   "呸"
  ],
  "ao": [
   "pao",
   "拋"
  ],
  "ou": [
   "pou",
   "剖"
  ],
  "an": [
   "pan",
   "潘"
  ],
  "en": [
   "pen",
   "噴"
  ],
  "ang": [
   "pang",
   "乓"
  ],
  "eng": [
   "peng",
   "烹"
  ],
  "i": [
   "pi",
   "批"
  ],
  "ie": [
   "pie",
   "撇"
  ],
  "iao": [
   "piao",
   "飄"
  ],
  "ian": [
   "pian",
   "偏"
  ],
  "in": [
   "pin",
   "拼"
  ],
  "ing": [
   "ping",
   "乒"
  ],
  "u": [
   "pu",
   "撲"
  ]
 },
 "m": {
  "a": [
   "ma",
   "媽"
  ],
  "o": [
   "mo",
   "摸"
  ],
  "e": [
   "me",
   null
  ],
  "ai": [
   "mai",
   null
  ],
  "ei": [
   "mei",
   null
  ],
  "ao": [
   "mao",
   "貓"
  ],
  "ou": [
   "mou",
   null
  ],
  "an": [
   "man",
   null
  ],
  "en": [
   "men",
   "悶"
  ],
  "ang": [
   "mang",
   null
  ],
  "eng": [
   "meng",
   "矇"
  ],
  "i": [
   "mi",
   "咪"
  ],
  "ie": [
   "mie",
   "咩"
  ],
  "iao": [
   "miao",
   "喵"
  ],
  "iu": [
   "miu",
   null
  ],
  "ian": [
   "mian",
   null
  ],
  "in": [
   "min",
   null
  ],
  "ing": [
   "ming",
   null
  ],
  "u": [
   "mu",
   null
  ]
 },
 "f": {
  "a": [
   "fa",
   "發"
  ],
  "o": [
   "fo",
   null
  ],
  "ei": [
   "fei",
   "飛"
  ],
  "ou": [
   "fou",
   null
  ],
  "an": [
   "fan",
   "翻"
  ],
  "en": [
   "fen",
   "分"
  ],
  "ang": [
   "fang",
   "方"
  ],
  "eng": [
   "feng",
   "風"
  ],
  "u": [
   "fu",
   "夫"
  ]
 },
 "d": {
  "a": [
   "da",
   "搭"
  ],
  "e": [
   "de",
   null
  ],
  "ai": [
   "dai",
   "呆"
  ],
  "ei": [
   "dei",
   null
  ],
  "ao": [
   "dao",
   "刀"
  ],
  "ou": [
   "dou",
   "兜"
  ],
  "an": [
   "dan",
   "單"
  ],
  "en": [
   "den",
   null
  ],
  "ang": [
   "dang",
   "當"
  ],
  "eng": [
   "deng",
   "燈"
  ],
  "ong": [
   "dong",
   "東"
  ],
  "i": [
   "di",
   "低"
  ],
  "ie": [
   "die",
   "爹"
  ],
  "iao": [
   "diao",
   "刁"
  ],
  "iu": [
   "diu",
   "丟"
  ],
  "ian": [
   "dian",
   "顛"
  ],
  "ing": [
   "ding",
   "丁"
  ],
  "u": [
   "du",
   "督"
  ],
  "uo": [
   "duo",
   "多"
  ],
  "ui": [
   "dui",
   "堆"
  ],
  "uan": [
   "duan",
   "端"
  ],
  "un": [
   "dun",
   "蹲"
  ]
 },
 "t": {
  "a": [
   "ta",
   "他"
  ],
  "e": [
   "te",
   null
  ],
  "ai": [
   "tai",
   "胎"
  ],
  "ao": [
   "tao",
   "掏"
  ],
  "ou": [
   "tou",
   "偷"
  ],
  "an": [
   "tan",
   "貪"
  ],
  "ang": [
   "tang",
   "湯"
  ],
  "eng": [
   "teng",
   null
  ],
  "ong": [
   "tong",
   "通"
  ],
  "i": [
   "ti",
   "梯"
  ],
  "ie": [
   "tie",
   "貼"
  ],
  "iao": [
   "tiao",
   "挑"
  ],
  "ian": [
   "tian",
   "天"
  ],
  "ing": [
   "ting",
   "聽"
  ],
  "u": [
   "tu",
   "突"
  ],
  "uo": [
   "tuo",
   "拖"
  ],
  "ui": [
   "tui",
   "推"
  ],
  "uan": [
   "tuan",
   "湍"
  ],
  "un": [
   "tun",
   "吞"
  ]
 },
 "n": {
  "a": [
   "na",
   null
  ],
  "e": [
   "ne",
   null
  ],
  "ai": [
   "nai",
   null
  ],
  "ei": [
   "nei",
   null
  ],
  "ao": [
   "nao",
   "孬"
  ],
  "ou": [
   "nou",
   null
  ],
  "an": [
   "nan",
   "囡"
  ],
  "en": [
   "nen",
   null
  ],
  "ang": [
   "nang",
   "囔"
  ],
  "eng": [
   "neng",
   null
  ],
  "ong": [
   "nong",
   null
  ],
  "i": [
   "ni",
   "妮"
  ],
  "ie": [
   "nie",
   "捏"
  ],
  "iao": [
   "niao",
   null
  ],
  "iu": [
   "niu",
   "妞"
  ],
  "ian": [
   "nian",
   "拈"
  ],
  "in": [
   "nin",
   null
  ],
  "iang": [
   "niang",
   null
  ],
  "ing": [
   "ning",
   null
  ],
  "u": [
   "nu",
   null
  ],
  "uo": [
   "nuo",
   null
  ],
  "uan": [
   "nuan",
   null
  ],
  "ü": [
   "nü",
   null
  ],
  "üe": [
   "nüe",
   null
  ]
 },
 "l": {
  "a": [
   "la",
   "拉"
  ],
  "e": [
   "le",
   null
  ],
  "ai": [
   "lai",
   null
  ],
  "ei": [
   "lei",
   "勒"
  ],
  "ao": [
   "lao",
   "撈"
  ],
  "ou": [
   "lou",
   "摟"
  ],
  "an": [
   "lan",
   null
  ],
  "ang": [
   "lang",
   null
  ],
  "eng": [
   "leng",
   null
  ],
  "ong": [
   "long",
   null
  ],
  "i": [
   "li",
   null
  ],
  "ia": [
   "lia",
   null
  ],
  "ie": [
   "lie",
   null
  ],
  "iao": [
   "liao",
   "撩"
  ],
  "iu": [
   "liu",
   "溜"
  ],
  "ian": [
   "lian",
   null
  ],
  "in": [
   "lin",
   null
  ],
  "iang": [
   "liang",
   null
  ],
  "ing": [
   "ling",
   null
  ],
  "u": [
   "lu",
   "嚕"
  ],
  "uo": [
   "luo",
   "囉"
  ],
  "uan": [
   "luan",
   null
  ],
  "un": [
   "lun",
   "掄"
  ],
  "ü": [
   "lü",
   null
  ],
  "üe": [
   "lüe",
   null
  ]
 },
 "g": {
  "a": [
   "ga",
   "嘎"
  ],
  "e": [
   "ge",
   "哥"
  ],
  "ai": [
   "gai",
   "該"
  ],
  "ei": [
   "gei",
   null
  ],
  "ao": [
   "gao",
   "高"
  ],
  "ou": [
   "gou",
   "溝"
  ],
  "an": [
   "gan",
   "干"
  ],
  "en": [
   "gen",
   "根"
  ],
  "ang": [
   "gang",
   "剛"
  ],
  "eng": [
   "geng",
   "耕"
  ],
  "ong": [
   "gong",
   "工"
  ],
  "u": [
   "gu",
   "姑"
  ],
  "ua": [
   "gua",
   "瓜"
  ],
  "uo": [
   "guo",
   "鍋"
  ],
  "uai": [
   "guai",
   "乖"
  ],
  "ui": [
   "gui",
   "規"
  ],
  "uan": [
   "guan",
   "關"
  ],
  "un": [
   "gun",
   null
  ],
  "uang": [
   "guang",
   "光"
  ]
 },
 "k": {
  "a": [
   "ka",
   "咖"
  ],
  "e": [
   "ke",
   "科"
  ],
  "ai": [
   "kai",
   "開"
  ],
  "ei": [
   "kei",
   null
  ],
  "ao": [
   "kao",
   null
  ],
  "ou": [
   "kou",
   "摳"
  ],
  "an": [
   "kan",
   "刊"
  ],
  "en": [
   "ken",
   null
  ],
  "ang": [
   "kang",
   "康"
  ],
  "eng": [
   "keng",
   "坑"
  ],
  "ong": [
   "kong",
   "空"
  ],
  "u": [
   "ku",
   "哭"
  ],
  "ua": [
   "kua",
   "誇"
  ],
  "uo": [
   "kuo",
   null
  ],
  "uai": [
   "kuai",
   null
  ],
  "ui": [
   "kui",
   "虧"
  ],
  "uan": [
   "kuan",
   "寬"
  ],
  "un": [
   "kun",
   "昆"
  ],
  "uang": [
   "kuang",
   "筐"
  ]
 },
 "h": {
  "a": [
   "ha",
   "哈"
  ],
  "e": [
   "he",
   "喝"
  ],
  "ai": [
   "hai",
   "嗨"
  ],
  "ei": [
   "hei",
   "黑"
  ],
  "ao": [
   "hao",
   "蒿"
  ],
  "ou": [
   "hou",
   null
  ],
  "an": [
   "han",
   "憨"
  ],
  "en": [
   "hen",
   null
  ],
  "ang": [
   "hang",
   null
  ],
  "eng": [
   "heng",
   "哼"
  ],
  "ong": [
   "hong",
   "轟"
  ],
  "u": [
   "hu",
   "呼"
  ],
  "ua": [
   "hua",
   "花"
  ],
  "uo": [
   "huo",
   "豁"
  ],
  "uai": [
   "huai",
   null
  ],
  "ui": [
   "hui",
   "灰"
  ],
  "uan": [
   "huan",
   "歡"
  ],
  "un": [
   "hun",
   "昏"
  ],
  "uang": [
   "huang",
   "荒"
  ]
 },
 "j": {
  "i": [
   "ji",
   "雞"
  ],
  "ia": [
   "jia",
   "家"
  ],
  "ie": [
   "jie",
   "街"
  ],
  "iao": [
   "jiao",
   "交"
  ],
  "iu": [
   "jiu",
   "究"
  ],
  "ian": [
   "jian",
   "尖"
  ],
  "in": [
   "jin",
   "今"
  ],
  "iang": [
   "jiang",
   "江"
  ],
  "ing": [
   "jing",
   "京"
  ],
  "iong": [
   "jiong",
   null
  ],
  "ü": [
   "ju",
   "居"
  ],
  "üe": [
   "jue",
   null
  ],
  "üan": [
   "juan",
   "捐"
  ],
  "ün": [
   "jun",
   "軍"
  ]
 },
 "q": {
  "i": [
   "qi",
   "七"
  ],
  "ia": [
   "qia",
   "掐"
  ],
  "ie": [
   "qie",
   "切"
  ],
  "iao": [
   "qiao",
   "敲"
  ],
  "iu": [
   "qiu",
   "秋"
  ],
  "ian": [
   "qian",
   "千"
  ],
  "in": [
   "qin",
   "親"
  ],
  "iang": [
   "qiang",
   "槍"
  ],
  "ing": [
   "qing",
   "清"
  ],
  "iong": [
   "qiong",
   null
  ],
  "ü": [
   "qu",
   "區"
  ],
  "üe": [
   "que",
   "缺"
  ],
  "üan": [
   "quan",
   "圈"
  ],
  "ün": [
   "qun",
   null
  ]
 },
 "x": {
  "i": [
   "xi",
   "西"
  ],
  "ia": [
   "xia",
   "蝦"
  ],
  "ie": [
   "xie",
   "些"
  ],
  "iao": [
   "xiao",
   "消"
  ],
  "iu": [
   "xiu",
   "休"
  ],
  "ian": [
   "xian",
   "先"
  ],
  "in": [
   "xin",
   "新"
  ],
  "iang": [
   "xiang",
   "香"
  ],
  "ing": [
   "xing",
   "星"
  ],
  "iong": [
   "xiong",
   "兇"
  ],
  "ü": [
   "xu",
   "需"
  ],
  "üe": [
   "xue",
   "靴"
  ],
  "üan": [
   "xuan",
   "宣"
  ],
  "ün": [
   "xun",
   "熏"
  ]
 },
 "zh": {
  "-i": [
   "zhi",
   "之"
  ],
  "a": [
   "zha",
   "渣"
  ],
  "e": [
   "zhe",
   "遮"
  ],
  "ai": [
   "zhai",
   "摘"
  ],
  "ei": [
   "zhei",
   null
  ],
  "ao": [
   "zhao",
   "招"
  ],
  "ou": [
   "zhou",
   "周"
  ],
  "an": [
   "zhan",
   "沾"
  ],
  "en": [
   "zhen",
   "真"
  ],
  "ang": [
   "zhang",
   "張"
  ],
  "eng": [
   "zheng",
   "爭"
  ],
  "ong": [
   "zhong",
   "中"
  ],
  "u": [
   "zhu",
   "豬"
  ],
  "ua": [
   "zhua",
   "抓"
  ],
  "uo": [
   "zhuo",
   "桌"
  ],
  "uai": [
   "zhuai",
   null
  ],
  "ui": [
   "zhui",
   "追"
  ],
  "uan": [
   "zhuan",
   "專"
  ],
  "un": [
   "zhun",
   null
  ],
  "uang": [
   "zhuang",
   "裝"
  ]
 },
 "ch": {
  "-i": [
   "chi",
   "吃"
  ],
  "a": [
   "cha",
   "差"
  ],
  "e": [
   "che",
   "車"
  ],
  "ai": [
   "chai",
   "拆"
  ],
  "ao": [
   "chao",
   "超"
  ],
  "ou": [
   "chou",
   "抽"
  ],
  "an": [
   "chan",
   "攙"
  ],
  "en": [
   "chen",
   "琛"
  ],
  "ang": [
   "chang",
   "昌"
  ],
  "eng": [
   "cheng",
   "稱"
  ],
  "ong": [
   "chong",
   "沖"
  ],
  "u": [
   "chu",
   "出"
  ],
  "ua": [
   "chua",
   null
  ],
  "uo": [
   "chuo",
   "戳"
  ],
  "uai": [
   "chuai",
   "揣"
  ],
  "ui": [
   "chui",
   "吹"
  ],
  "uan": [
   "chuan",
   "穿"
  ],
  "un": [
   "chun",
   "春"
  ],
  "uang": [
   "chuang",
   "窗"
  ]
 },
 "sh": {
  "-i": [
   "shi",
   "濕"
  ],
  "a": [
   "sha",
   "沙"
  ],
  "e": [
   "she",
   "奢"
  ],
  "ai": [
   "shai",
   "篩"
  ],
  "ei": [
   "shei",
   null
  ],
  "ao": [
   "shao",
   "燒"
  ],
  "ou": [
   "shou",
   "收"
  ],
  "an": [
   "shan",
   "山"
  ],
  "en": [
   "shen",
   "深"
  ],
  "ang": [
   "shang",
   "商"
  ],
  "eng": [
   "sheng",
   "生"
  ],
  "u": [
   "shu",
   "書"
  ],
  "ua": [
   "shua",
   "刷"
  ],
  "uo": [
   "shuo",
   "說"
  ],
  "uai": [
   "shuai",
   "摔"
  ],
  "ui": [
   "shui",
   null
  ],
  "uan": [
   "shuan",
   "拴"
  ],
  "un": [
   "shun",
   null
  ],
  "uang": [
   "shuang",
   "雙"
  ]
 },
 "r": {
  "-i": [
   "ri",
   null
  ],
  "e": [
   "re",
   null
  ],
  "ao": [
   "rao",
   null
  ],
  "ou": [
   "rou",
   null
  ],
  "an": [
   "ran",
   null
  ],
  "en": [
   "ren",
   null
  ],
  "ang": [
   "rang",
   "嚷"
  ],
  "eng": [
   "reng",
   "扔"
  ],
  "ong": [
   "rong",
   null
  ],
  "u": [
   "ru",
   null
  ],
  "ua": [
   "rua",
   null
  ],
  "uo": [
   "ruo",
   null
  ],
  "ui": [
   "rui",
   null
  ],
  "uan": [
   "ruan",
   null
  ],
  "un": [
   "run",
   null
  ]
 },
 "z": {
  "-i": [
   "zi",
   "資"
  ],
  "a": [
   "za",
   "匝"
  ],
  "e": [
   "ze",
   null
  ],
  "ai": [
   "zai",
   "栽"
  ],
  "ei": [
   "zei",
   null
  ],
  "ao": [
   "zao",
   "遭"
  ],
  "ou": [
   "zou",
   "鄒"
  ],
  "an": [
   "zan",
   "簪"
  ],
  "en": [
   "zen",
   null
  ],
  "ang": [
   "zang",
   "髒"
  ],
  "eng": [
   "zeng",
   "增"
  ],
  "ong": [
   "zong",
   "宗"
  ],
  "u": [
   "zu",
   "租"
  ],
  "uo": [
   "zuo",
   "作"
  ],
  "ui": [
   "zui",
   null
  ],
  "uan": [
   "zuan",
   "鑽"
  ],
  "un": [
   "zun",
   "尊"
  ]
 },
 "c": {
  "-i": [
   "ci",
   "疵"
  ],
  "a": [
   "ca",
   "擦"
  ],
  "e": [
   "ce",
   null
  ],
  "ai": [
   "cai",
   "猜"
  ],
  "ao": [
   "cao",
   "操"
  ],
  "ou": [
   "cou",
   null
  ],
  "an": [
   "can",
   "參"
  ],
  "en": [
   "cen",
   null
  ],
  "ang": [
   "cang",
   "倉"
  ],
  "eng": [
   "ceng",
   null
  ],
  "ong": [
   "cong",
   "聰"
  ],
  "u": [
   "cu",
   "粗"
  ],
  "uo": [
   "cuo",
   "搓"
  ],
  "ui": [
   "cui",
   "催"
  ],
  "uan": [
   "cuan",
   "躥"
  ],
  "un": [
   "cun",
   "村"
  ]
 },
 "s": {
  "-i": [
   "si",
   "私"
  ],
  "a": [
   "sa",
   "撒"
  ],
  "e": [
   "se",
   null
  ],
  "ai": [
   "sai",
   "塞"
  ],
  "ao": [
   "sao",
   "騷"
  ],
  "ou": [
   "sou",
   "搜"
  ],
  "an": [
   "san",
   "三"
  ],
  "en": [
   "sen",
   "森"
  ],
  "ang": [
   "sang",
   "桑"
  ],
  "eng": [
   "seng",
   "僧"
  ],
  "ong": [
   "song",
   "鬆"
  ],
  "u": [
   "su",
   "蘇"
  ],
  "uo": [
   "suo",
   "縮"
  ],
  "ui": [
   "sui",
   "雖"
  ],
  "uan": [
   "suan",
   "酸"
  ],
  "un": [
   "sun",
   "孫"
  ]
 }
};

// ============================================================
// Âm thanh từng ô của bảng phiên âm — LƯU TRÊN SERVER MÌNH (scripts/tai-am-bang-phien-am.mjs).
// Bản thu gốc của tiengtrungthaoan.edu.vn (một giọng cho cả bảng), tải về 2026-10-01; ô nguồn đó
// không có (wa, wo, wai, wei, wu) dùng vận mẫu đọc đứng riêng của sách. null = không có bản thu.
// ============================================================
export const pinyinChartAudio = {
  "ba": "/audio/pron/bang/ba.mp3",
  "bo": "/audio/pron/bang/bo.mp3",
  "bi": "/audio/pron/bang/bi.mp3",
  "bu": "/audio/pron/bang/bu.mp3",
  "bai": "/audio/pron/bang/bai.mp3",
  "bei": "/audio/pron/bang/bei.mp3",
  "bao": "/audio/pron/bang/bao.mp3",
  "pa": "/audio/pron/bang/pa.mp3",
  "po": "/audio/pron/bang/po.mp3",
  "pi": "/audio/pron/bang/pi.mp3",
  "pu": "/audio/pron/bang/pu.mp3",
  "pai": "/audio/pron/bang/pai.mp3",
  "pei": "/audio/pron/bang/pei.mp3",
  "pao": "/audio/pron/bang/pao.mp3",
  "pou": "/audio/pron/bang/pou.mp3",
  "ma": "/audio/pron/bang/ma.mp3",
  "mo": "/audio/pron/bang/mo.mp3",
  "me": "/audio/pron/bang/me.mp3",
  "mi": "/audio/pron/bang/mi.mp3",
  "mu": "/audio/pron/bang/mu.mp3",
  "mai": "/audio/pron/bang/mai.mp3",
  "mei": "/audio/pron/bang/mei.mp3",
  "mao": "/audio/pron/bang/mao.mp3",
  "mou": "/audio/pron/bang/mou.mp3",
  "fa": "/audio/pron/bang/fa.mp3",
  "fo": "/audio/pron/bang/fo.mp3",
  "fu": "/audio/pron/bang/fu.mp3",
  "fei": "/audio/pron/bang/fei.mp3",
  "fou": "/audio/pron/bang/fou.mp3",
  "da": "/audio/pron/bang/da.mp3",
  "de": "/audio/pron/bang/de.mp3",
  "di": "/audio/pron/bang/di.mp3",
  "du": "/audio/pron/bang/du.mp3",
  "dai": "/audio/pron/bang/dai.mp3",
  "dei": "/audio/pron/bang/dei.mp3",
  "dao": "/audio/pron/bang/dao.mp3",
  "dou": "/audio/pron/bang/dou.mp3",
  "ta": "/audio/pron/bang/ta.mp3",
  "te": "/audio/pron/bang/te.mp3",
  "ti": "/audio/pron/bang/ti.mp3",
  "tu": "/audio/pron/bang/tu.mp3",
  "tai": "/audio/pron/bang/tai.mp3",
  "tao": "/audio/pron/bang/tao.mp3",
  "tou": "/audio/pron/bang/tou.mp3",
  "na": "/audio/pron/bang/na.mp3",
  "ne": "/audio/pron/bang/ne.mp3",
  "ni": "/audio/pron/bang/ni.mp3",
  "nu": "/audio/pron/bang/nu.mp3",
  "nü": "/audio/pron/bang/nv.mp3",
  "nai": "/audio/pron/bang/nai.mp3",
  "nei": "/audio/pron/bang/nei.mp3",
  "nao": "/audio/pron/bang/nao.mp3",
  "nou": "/audio/pron/bang/nou.mp3",
  "la": "/audio/pron/bang/la.mp3",
  "le": "/audio/pron/bang/le.mp3",
  "li": "/audio/pron/bang/li.mp3",
  "lu": "/audio/pron/bang/lu.mp3",
  "lü": "/audio/pron/bang/lv.mp3",
  "lai": "/audio/pron/bang/lai.mp3",
  "lei": "/audio/pron/bang/lei.mp3",
  "lao": "/audio/pron/bang/lao.mp3",
  "lou": "/audio/pron/bang/lou.mp3",
  "ga": "/audio/pron/bang/ga.mp3",
  "ge": "/audio/pron/bang/ge.mp3",
  "gu": "/audio/pron/bang/gu.mp3",
  "gai": "/audio/pron/bang/gai.mp3",
  "gei": "/audio/pron/bang/gei.mp3",
  "gao": "/audio/pron/bang/gao.mp3",
  "gou": "/audio/pron/bang/gou.mp3",
  "ka": "/audio/pron/bang/ka.mp3",
  "ke": "/audio/pron/bang/ke.mp3",
  "ku": "/audio/pron/bang/ku.mp3",
  "kai": "/audio/pron/bang/kai.mp3",
  "kei": "/audio/pron/bang/kei.mp3",
  "kao": "/audio/pron/bang/kao.mp3",
  "kou": "/audio/pron/bang/kou.mp3",
  "ha": "/audio/pron/bang/ha.mp3",
  "he": "/audio/pron/bang/he.mp3",
  "hu": "/audio/pron/bang/hu.mp3",
  "hai": "/audio/pron/bang/hai.mp3",
  "hei": "/audio/pron/bang/hei.mp3",
  "hao": "/audio/pron/bang/hao.mp3",
  "hou": "/audio/pron/bang/hou.mp3",
  "za": "/audio/pron/bang/za.mp3",
  "ze": "/audio/pron/bang/ze.mp3",
  "zi": "/audio/pron/bang/zi.mp3",
  "zai": "/audio/pron/bang/zai.mp3",
  "zei": "/audio/pron/bang/zei.mp3",
  "zao": "/audio/pron/bang/zao.mp3",
  "zou": "/audio/pron/bang/zou.mp3",
  "ca": "/audio/pron/bang/ca.mp3",
  "ce": "/audio/pron/bang/ce.mp3",
  "ci": "/audio/pron/bang/ci.mp3",
  "cai": "/audio/pron/bang/cai.mp3",
  "cao": "/audio/pron/bang/cao.mp3",
  "cou": "/audio/pron/bang/cou.mp3",
  "sa": "/audio/pron/bang/sa.mp3",
  "se": "/audio/pron/bang/se.mp3",
  "si": "/audio/pron/bang/si.mp3",
  "sai": "/audio/pron/bang/sai.mp3",
  "sao": "/audio/pron/bang/sao.mp3",
  "sou": "/audio/pron/bang/sou.mp3",
  "zha": "/audio/pron/bang/zha.mp3",
  "zhe": "/audio/pron/bang/zhe.mp3",
  "zhi": "/audio/pron/bang/zhi.mp3",
  "zhai": "/audio/pron/bang/zhai.mp3",
  "zhei": "/audio/pron/bang/zhei.mp3",
  "zhao": "/audio/pron/bang/zhao.mp3",
  "zhou": "/audio/pron/bang/zhou.mp3",
  "cha": "/audio/pron/bang/cha.mp3",
  "che": "/audio/pron/bang/che.mp3",
  "chi": "/audio/pron/bang/chi.mp3",
  "chai": "/audio/pron/bang/chai.mp3",
  "chao": "/audio/pron/bang/chao.mp3",
  "chou": "/audio/pron/bang/chou.mp3",
  "sha": "/audio/pron/bang/sha.mp3",
  "she": "/audio/pron/bang/she.mp3",
  "shi": "/audio/pron/bang/shi.mp3",
  "shai": "/audio/pron/bang/shai.mp3",
  "shei": "/audio/pron/bang/shei.mp3",
  "shao": "/audio/pron/bang/shao.mp3",
  "shou": "/audio/pron/bang/shou.mp3",
  "re": "/audio/pron/bang/re.mp3",
  "ri": "/audio/pron/bang/ri.mp3",
  "rao": "/audio/pron/bang/rao.mp3",
  "rou": "/audio/pron/bang/rou.mp3",
  "ya": "/audio/pron/bang/ya.mp3",
  "ye": "/audio/pron/bang/ye.mp3",
  "yao": "/audio/pron/bang/yao.mp3",
  "you": "/audio/pron/bang/you.mp3",
  "wa": "/audio/pron/sgk/vm-ua.mp3",
  "wo": "/audio/pron/sgk/vm-uo.mp3",
  "wai": "/audio/pron/sgk/vm-uai.mp3",
  "wei": "/audio/pron/sgk/vm-ui.mp3",
  "ban": "/audio/pron/bang/ban.mp3",
  "ben": "/audio/pron/bang/ben.mp3",
  "bang": "/audio/pron/bang/bang.mp3",
  "beng": "/audio/pron/bang/beng.mp3",
  "pan": "/audio/pron/bang/pan.mp3",
  "pen": "/audio/pron/bang/pen.mp3",
  "pang": "/audio/pron/bang/pang.mp3",
  "peng": "/audio/pron/bang/peng.mp3",
  "man": "/audio/pron/bang/man.mp3",
  "men": "/audio/pron/bang/men.mp3",
  "mang": "/audio/pron/bang/mang.mp3",
  "meng": "/audio/pron/bang/meng.mp3",
  "fan": "/audio/pron/bang/fan.mp3",
  "fen": "/audio/pron/bang/fen.mp3",
  "fang": "/audio/pron/bang/fang.mp3",
  "feng": "/audio/pron/bang/feng.mp3",
  "dan": "/audio/pron/bang/dan.mp3",
  "den": "/audio/pron/bang/den.mp3",
  "dang": "/audio/pron/bang/dang.mp3",
  "deng": "/audio/pron/bang/deng.mp3",
  "dong": "/audio/pron/bang/dong.mp3",
  "tan": "/audio/pron/bang/tan.mp3",
  "tang": "/audio/pron/bang/tang.mp3",
  "teng": "/audio/pron/bang/teng.mp3",
  "tong": "/audio/pron/bang/tong.mp3",
  "nan": "/audio/pron/bang/nan.mp3",
  "nen": "/audio/pron/bang/nen.mp3",
  "nang": "/audio/pron/bang/nang.mp3",
  "neng": "/audio/pron/bang/neng.mp3",
  "nong": "/audio/pron/bang/nong.mp3",
  "nüe": "/audio/pron/bang/nve.mp3",
  "lan": "/audio/pron/bang/lan.mp3",
  "lang": "/audio/pron/bang/lang.mp3",
  "leng": "/audio/pron/bang/leng.mp3",
  "long": "/audio/pron/bang/long.mp3",
  "lüe": "/audio/pron/bang/lve.mp3",
  "gan": "/audio/pron/bang/gan.mp3",
  "gen": "/audio/pron/bang/gen.mp3",
  "gang": "/audio/pron/bang/gang.mp3",
  "geng": "/audio/pron/bang/geng.mp3",
  "gong": "/audio/pron/bang/gong.mp3",
  "kan": "/audio/pron/bang/kan.mp3",
  "ken": "/audio/pron/bang/ken.mp3",
  "kang": "/audio/pron/bang/kang.mp3",
  "keng": "/audio/pron/bang/keng.mp3",
  "kong": "/audio/pron/bang/kong.mp3",
  "han": "/audio/pron/bang/han.mp3",
  "hen": "/audio/pron/bang/hen.mp3",
  "hang": "/audio/pron/bang/hang.mp3",
  "heng": "/audio/pron/bang/heng.mp3",
  "hong": "/audio/pron/bang/hong.mp3",
  "ju": "/audio/pron/bang/ju.mp3",
  "jue": "/audio/pron/bang/jue.mp3",
  "juan": "/audio/pron/bang/juan.mp3",
  "jun": "/audio/pron/bang/jun.mp3",
  "qu": "/audio/pron/bang/qu.mp3",
  "que": "/audio/pron/bang/que.mp3",
  "quan": "/audio/pron/bang/quan.mp3",
  "qun": "/audio/pron/bang/qun.mp3",
  "xu": "/audio/pron/bang/xu.mp3",
  "xue": "/audio/pron/bang/xue.mp3",
  "xuan": "/audio/pron/bang/xuan.mp3",
  "xun": "/audio/pron/bang/xun.mp3",
  "zan": "/audio/pron/bang/zan.mp3",
  "zen": "/audio/pron/bang/zen.mp3",
  "zang": "/audio/pron/bang/zang.mp3",
  "zeng": "/audio/pron/bang/zeng.mp3",
  "zong": "/audio/pron/bang/zong.mp3",
  "can": "/audio/pron/bang/can.mp3",
  "cen": "/audio/pron/bang/cen.mp3",
  "cang": "/audio/pron/bang/cang.mp3",
  "ceng": "/audio/pron/bang/ceng.mp3",
  "cong": "/audio/pron/bang/cong.mp3",
  "san": "/audio/pron/bang/san.mp3",
  "sen": "/audio/pron/bang/sen.mp3",
  "sang": "/audio/pron/bang/sang.mp3",
  "seng": "/audio/pron/bang/seng.mp3",
  "song": "/audio/pron/bang/song.mp3",
  "zhan": "/audio/pron/bang/zhan.mp3",
  "zhen": "/audio/pron/bang/zhen.mp3",
  "zhang": "/audio/pron/bang/zhang.mp3",
  "zheng": "/audio/pron/bang/zheng.mp3",
  "zhong": "/audio/pron/bang/zhong.mp3",
  "chan": "/audio/pron/bang/chan.mp3",
  "chen": "/audio/pron/bang/chen.mp3",
  "chang": "/audio/pron/bang/chang.mp3",
  "cheng": "/audio/pron/bang/cheng.mp3",
  "chong": "/audio/pron/bang/chong.mp3",
  "shan": "/audio/pron/bang/shan.mp3",
  "shen": "/audio/pron/bang/shen.mp3",
  "shang": "/audio/pron/bang/shang.mp3",
  "sheng": "/audio/pron/bang/sheng.mp3",
  "ran": "/audio/pron/bang/ran.mp3",
  "ren": "/audio/pron/bang/ren.mp3",
  "rang": "/audio/pron/bang/rang.mp3",
  "reng": "/audio/pron/bang/reng.mp3",
  "rong": "/audio/pron/bang/rong.mp3",
  "yu": "/audio/pron/bang/yu.mp3",
  "yue": "/audio/pron/bang/yue.mp3",
  "yuan": "/audio/pron/bang/yuan.mp3",
  "yun": "/audio/pron/bang/yun.mp3",
  "biao": "/audio/pron/bang/biao.mp3",
  "bie": "/audio/pron/bang/bie.mp3",
  "bian": "/audio/pron/bang/bian.mp3",
  "bin": "/audio/pron/bang/bin.mp3",
  "bing": "/audio/pron/bang/bing.mp3",
  "piao": "/audio/pron/bang/piao.mp3",
  "pie": "/audio/pron/bang/pie.mp3",
  "pian": "/audio/pron/bang/pian.mp3",
  "pin": "/audio/pron/bang/pin.mp3",
  "ping": "/audio/pron/bang/ping.mp3",
  "miao": "/audio/pron/bang/miao.mp3",
  "mie": "/audio/pron/bang/mie.mp3",
  "miu": null,
  "mian": "/audio/pron/bang/mian.mp3",
  "min": "/audio/pron/bang/min.mp3",
  "ming": "/audio/pron/bang/ming.mp3",
  "diao": "/audio/pron/bang/diao.mp3",
  "die": "/audio/pron/bang/die.mp3",
  "diu": "/audio/pron/bang/diu.mp3",
  "dian": "/audio/pron/bang/dian.mp3",
  "ding": "/audio/pron/bang/ding.mp3",
  "tiao": "/audio/pron/bang/tiao.mp3",
  "tie": "/audio/pron/bang/tie.mp3",
  "tian": "/audio/pron/bang/tian.mp3",
  "ting": "/audio/pron/bang/ting.mp3",
  "niao": "/audio/pron/bang/niao.mp3",
  "nie": "/audio/pron/bang/nie.mp3",
  "niu": "/audio/pron/bang/niu.mp3",
  "nian": "/audio/pron/bang/nian.mp3",
  "nin": "/audio/pron/bang/nin.mp3",
  "niang": "/audio/pron/bang/niang.mp3",
  "ning": "/audio/pron/bang/ning.mp3",
  "lia": "/audio/pron/bang/lia.mp3",
  "liao": "/audio/pron/bang/liao.mp3",
  "lie": "/audio/pron/bang/lie.mp3",
  "liu": "/audio/pron/bang/liu.mp3",
  "lian": "/audio/pron/bang/lian.mp3",
  "lin": "/audio/pron/bang/lin.mp3",
  "liang": "/audio/pron/bang/liang.mp3",
  "ling": "/audio/pron/bang/ling.mp3",
  "ji": "/audio/pron/bang/ji.mp3",
  "jia": "/audio/pron/bang/jia.mp3",
  "jiao": "/audio/pron/bang/jiao.mp3",
  "jie": "/audio/pron/bang/jie.mp3",
  "jiu": "/audio/pron/bang/jiu.mp3",
  "jian": "/audio/pron/bang/jian.mp3",
  "jin": "/audio/pron/bang/jin.mp3",
  "jiang": "/audio/pron/bang/jiang.mp3",
  "jing": "/audio/pron/bang/jing.mp3",
  "jiong": "/audio/pron/bang/jiong.mp3",
  "qi": "/audio/pron/bang/qi.mp3",
  "qia": "/audio/pron/bang/qia.mp3",
  "qiao": "/audio/pron/bang/qiao.mp3",
  "qie": "/audio/pron/bang/qie.mp3",
  "qiu": "/audio/pron/bang/qiu.mp3",
  "qian": "/audio/pron/bang/qian.mp3",
  "qin": "/audio/pron/bang/qin.mp3",
  "qiang": "/audio/pron/bang/qiang.mp3",
  "qing": "/audio/pron/bang/qing.mp3",
  "qiong": "/audio/pron/bang/qiong.mp3",
  "xi": "/audio/pron/bang/xi.mp3",
  "xia": "/audio/pron/bang/xia.mp3",
  "xiao": "/audio/pron/bang/xiao.mp3",
  "xie": "/audio/pron/bang/xie.mp3",
  "xiu": "/audio/pron/bang/xiu.mp3",
  "xian": "/audio/pron/bang/xian.mp3",
  "xin": "/audio/pron/bang/xin.mp3",
  "xiang": "/audio/pron/bang/xiang.mp3",
  "xing": "/audio/pron/bang/xing.mp3",
  "xiong": "/audio/pron/bang/xiong.mp3",
  "yi": "/audio/pron/bang/yi.mp3",
  "yin": "/audio/pron/bang/yin.mp3",
  "ying": "/audio/pron/bang/ying.mp3",
  "duo": "/audio/pron/bang/duo.mp3",
  "dui": "/audio/pron/bang/dui.mp3",
  "duan": "/audio/pron/bang/duan.mp3",
  "dun": "/audio/pron/bang/dun.mp3",
  "tuo": "/audio/pron/bang/tuo.mp3",
  "tui": "/audio/pron/bang/tui.mp3",
  "tuan": "/audio/pron/bang/tuan.mp3",
  "tun": "/audio/pron/bang/tun.mp3",
  "nuo": "/audio/pron/bang/nuo.mp3",
  "nuan": "/audio/pron/bang/nuan.mp3",
  "luo": "/audio/pron/bang/luo.mp3",
  "luan": "/audio/pron/bang/luan.mp3",
  "lun": "/audio/pron/bang/lun.mp3",
  "gua": "/audio/pron/bang/gua.mp3",
  "guo": "/audio/pron/bang/guo.mp3",
  "guai": "/audio/pron/bang/guai.mp3",
  "gui": "/audio/pron/bang/gui.mp3",
  "guan": "/audio/pron/bang/guan.mp3",
  "gun": "/audio/pron/bang/gun.mp3",
  "guang": "/audio/pron/bang/guang.mp3",
  "kua": "/audio/pron/bang/kua.mp3",
  "kuo": "/audio/pron/bang/kuo.mp3",
  "kuai": "/audio/pron/bang/kuai.mp3",
  "kui": "/audio/pron/bang/kui.mp3",
  "kuan": "/audio/pron/bang/kuan.mp3",
  "kun": "/audio/pron/bang/kun.mp3",
  "kuang": "/audio/pron/bang/kuang.mp3",
  "hua": "/audio/pron/bang/hua.mp3",
  "huo": "/audio/pron/bang/huo.mp3",
  "huai": "/audio/pron/bang/huai.mp3",
  "hui": "/audio/pron/bang/hui.mp3",
  "huan": "/audio/pron/bang/huan.mp3",
  "hun": "/audio/pron/bang/hun.mp3",
  "huang": "/audio/pron/bang/huang.mp3",
  "zu": "/audio/pron/bang/zu.mp3",
  "zuo": "/audio/pron/bang/zuo.mp3",
  "zui": "/audio/pron/bang/zui.mp3",
  "zuan": "/audio/pron/bang/zuan.mp3",
  "zun": "/audio/pron/bang/zun.mp3",
  "cu": "/audio/pron/bang/cu.mp3",
  "cuo": "/audio/pron/bang/cuo.mp3",
  "cui": "/audio/pron/bang/cui.mp3",
  "cuan": "/audio/pron/bang/cuan.mp3",
  "cun": "/audio/pron/bang/cun.mp3",
  "su": "/audio/pron/bang/su.mp3",
  "suo": "/audio/pron/bang/suo.mp3",
  "sui": "/audio/pron/bang/sui.mp3",
  "suan": "/audio/pron/bang/suan.mp3",
  "sun": "/audio/pron/bang/sun.mp3",
  "zhu": "/audio/pron/bang/zhu.mp3",
  "zhua": "/audio/pron/bang/zhua.mp3",
  "zhuo": "/audio/pron/bang/zhuo.mp3",
  "zhuai": "/audio/pron/bang/zhuai.mp3",
  "zhui": "/audio/pron/bang/zhui.mp3",
  "zhuan": "/audio/pron/bang/zhuan.mp3",
  "zhun": "/audio/pron/bang/zhun.mp3",
  "zhuang": "/audio/pron/bang/zhuang.mp3",
  "chu": "/audio/pron/bang/chu.mp3",
  "chua": "/audio/pron/bang/chua.mp3",
  "chuo": "/audio/pron/bang/chuo.mp3",
  "chuai": "/audio/pron/bang/chuai.mp3",
  "chui": "/audio/pron/bang/chui.mp3",
  "chuan": "/audio/pron/bang/chuan.mp3",
  "chun": "/audio/pron/bang/chun.mp3",
  "chuang": "/audio/pron/bang/chuang.mp3",
  "shu": "/audio/pron/bang/shu.mp3",
  "shua": "/audio/pron/bang/shua.mp3",
  "shuo": "/audio/pron/bang/shuo.mp3",
  "shuai": "/audio/pron/bang/shuai.mp3",
  "shui": "/audio/pron/bang/shui.mp3",
  "shuan": "/audio/pron/bang/shuan.mp3",
  "shun": "/audio/pron/bang/shun.mp3",
  "shuang": "/audio/pron/bang/shuang.mp3",
  "ru": "/audio/pron/bang/ru.mp3",
  "rua": "/audio/pron/bang/rua.mp3",
  "ruo": "/audio/pron/bang/ruo.mp3",
  "rui": "/audio/pron/bang/rui.mp3",
  "ruan": "/audio/pron/bang/ruan.mp3",
  "run": "/audio/pron/bang/run.mp3",
  "wu": "/audio/pron/sgk/vm-u.mp3"
};
