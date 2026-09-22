// ============================================================
// BẢNG PHIÊN ÂM TIẾNG TRUNG (thanh 1) — dữ liệu thuần frontend
// Sinh bởi scripts/gen-pinyin-chart (chạy 1 lần), sửa tay được.
//
// pinyinChart[<thanh mẫu>][<vận mẫu>] = [ <pinyin không dấu>, <chữ Hán thanh 1 | null> ]
// Ô nào chữ Hán = null  ->  âm tiết đó không có chữ thanh 1 thông dụng,
// vẫn hiện trong bảng để đọc nhưng không có nút nghe.
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
   "岑"
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
// Audio URLs from tiengtrungthaoan.edu.vn (388 syllables)
// Maps pinyin syllable (no tone) -> external mp3 URL.
// Used by renderPinyinChart to play real recordings instead of TTS.
// ============================================================
export const pinyinChartAudio = {
  "ba": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ba.mp3",
  "bo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bo.mp3",
  "bi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bi-1.mp3",
  "bu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bu.mp3",
  "bai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bai.mp3",
  "bei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bei.mp3",
  "bao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bao.mp3",
  "pa": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pa.mp3",
  "po": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-po.mp3",
  "pi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pi-1.mp3",
  "pu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pu.mp3",
  "pai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pai.mp3",
  "pei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pei.mp3",
  "pao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pao.mp3",
  "pou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pou.mp3",
  "ma": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ma.mp3",
  "mo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mo.mp3",
  "me": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-me.mp3",
  "mi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mi-1.mp3",
  "mu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mu.mp3",
  "mai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mai.mp3",
  "mei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mei.mp3",
  "mao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mao.mp3",
  "mou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mou.mp3",
  "fa": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-fa.mp3",
  "fo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-fo.mp3",
  "fu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-fu.mp3",
  "fei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-feii.mp3",
  "fou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-fou.mp3",
  "da": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-da.mp3",
  "de": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-de.mp3",
  "di": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-di-1.mp3",
  "du": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-du-1.mp3",
  "dai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dai.mp3",
  "dei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dei.mp3",
  "dao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dao.mp3",
  "dou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dou.mp3",
  "ta": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ta.mp3",
  "te": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-te.mp3",
  "ti": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ti-1.mp3",
  "tu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tu.mp3",
  "tai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tai.mp3",
  "tao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tao.mp3",
  "tou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tou.mp3",
  "na": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-na.mp3",
  "ne": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ne.mp3",
  "ni": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ni-1.mp3",
  "nu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nu.mp3",
  "nü": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nu-2-cham-1.mp3",
  "nai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nai.mp3",
  "nei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nei.mp3",
  "nao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nao.mp3",
  "nou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nou.mp3",
  "la": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-la.mp3",
  "le": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-le.mp3",
  "li": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-li-1.mp3",
  "lu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lu.mp3",
  "lü": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lu-2-cham-1.mp3",
  "lai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lai.mp3",
  "lei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lei.mp3",
  "lao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lao.mp3",
  "lou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lou.mp3",
  "ga": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ga.mp3",
  "ge": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ge.mp3",
  "gu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gu-1.mp3",
  "gai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gai.mp3",
  "gei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gei.mp3",
  "gao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gao.mp3",
  "gou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gou.mp3",
  "ka": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ka.mp3",
  "ke": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ke.mp3",
  "ku": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ku.mp3",
  "kai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kai.mp3",
  "kei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kei.mp3",
  "kao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kao.mp3",
  "kou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kou.mp3",
  "ha": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ha.mp3",
  "he": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-he.mp3",
  "hu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hu.mp3",
  "hai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hai.mp3",
  "hei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hei.mp3",
  "hao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hao.mp3",
  "hou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hou.mp3",
  "za": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-za.mp3",
  "ze": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ze.mp3",
  "zi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/zi.mp3",
  "zai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/0227.mp3",
  "zei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zei.mp3",
  "zao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zao.mp3",
  "zou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/zou.mp3",
  "ca": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ca.mp3",
  "ce": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ce.mp3",
  "ci": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ci.mp3",
  "cai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cai.mp3",
  "cao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cao.mp3",
  "cou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cou.mp3",
  "sa": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-sa.mp3",
  "se": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-se.mp3",
  "si": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-si.mp3",
  "sai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-sai.mp3",
  "sao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-sao.mp3",
  "sou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-sou.mp3",
  "zha": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zha.mp3",
  "zhe": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhe.mp3",
  "zhi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhi.mp3",
  "zhai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhai.mp3",
  "zhei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhei.mp3",
  "zhao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhao.mp3",
  "zhou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhou.mp3",
  "cha": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cha.mp3",
  "che": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cche.mp3",
  "chi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chi.mp3",
  "chai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chai.mp3",
  "chao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chao.mp3",
  "chou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chou.mp3",
  "sha": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-sha.mp3",
  "she": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-she.mp3",
  "shi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shi.mp3",
  "shai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shai.mp3",
  "shei": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shei.mp3",
  "shao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shao.mp3",
  "shou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shou.mp3",
  "re": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/re.mp3",
  "ri": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/ri.mp3",
  "rao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/rao.mp3",
  "rou": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/rou.mp3",
  "ya": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/ya.mp3",
  "ye": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/ye.mp3",
  "yao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/yao.mp3",
  "you": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/you.mp3",
  "wa": "o.mp3",
  "wo": "o.mp3",
  "wai": "o.mp3",
  "wei": "o.mp3",
  "ban": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ban.mp3",
  "ben": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ben.mp3",
  "bang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bang.mp3",
  "beng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-beng.mp3",
  "pan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pan.mp3",
  "pen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pen.mp3",
  "pang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pang.mp3",
  "peng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-peng.mp3",
  "man": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-man.mp3",
  "men": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-men.mp3",
  "mang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mang.mp3",
  "meng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-meng.mp3",
  "fan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-fan.mp3",
  "fen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-fen.mp3",
  "fang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-fang.mp3",
  "feng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-feng.mp3",
  "dan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dan.mp3",
  "den": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-den.mp3",
  "dang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dang.mp3",
  "deng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-deng.mp3",
  "dong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dong.mp3",
  "tan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tan.mp3",
  "tang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tang.mp3",
  "teng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-teng.mp3",
  "tong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tong.mp3",
  "nan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nan.mp3",
  "nen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nen.mp3",
  "nang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nang.mp3",
  "neng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-neng.mp3",
  "nong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nong.mp3",
  "nüe": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nue.mp3",
  "lan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lan.mp3",
  "lang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lang.mp3",
  "leng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-leng.mp3",
  "long": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-long.mp3",
  "lüe": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lue.mp3",
  "gan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gan.mp3",
  "gen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gen.mp3",
  "gang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gang.mp3",
  "geng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-geng.mp3",
  "gong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gong.mp3",
  "kan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kan.mp3",
  "ken": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ken.mp3",
  "kang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kang.mp3",
  "keng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-keng.mp3",
  "kong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kong.mp3",
  "han": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-han.mp3",
  "hen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hen.mp3",
  "hang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hang.mp3",
  "heng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-heng.mp3",
  "hong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hong.mp3",
  "ju": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ju.mp3",
  "jue": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/jue.mp3",
  "juan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/juan.mp3",
  "jun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jun.mp3",
  "qu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qu.mp3",
  "que": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-que.mp3",
  "quan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-quan.mp3",
  "qun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qun.mp3",
  "xu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xu.mp3",
  "xue": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xue.mp3",
  "xuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xuan.mp3",
  "xun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xun.mp3",
  "zan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zan.mp3",
  "zen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zen.mp3",
  "zang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zang.mp3",
  "zeng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zeng.mp3",
  "zong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zong.mp3",
  "can": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-can.mp3",
  "cen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cen.mp3",
  "cang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cang.mp3",
  "ceng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ceng.mp3",
  "cong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-cong.mp3",
  "san": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-san.mp3",
  "sen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-sen.mp3",
  "sang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-sang.mp3",
  "seng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-seng.mp3",
  "song": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-song.mp3",
  "zhan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhan.mp3",
  "zhen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhen.mp3",
  "zhang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhang.mp3",
  "zheng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zheng.mp3",
  "zhong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhong.mp3",
  "chan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-chan.mp3",
  "chen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-chen.mp3",
  "chang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-chang.mp3",
  "cheng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-cheng.mp3",
  "chong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-chong.mp3",
  "shan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-shan.mp3",
  "shen": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-shen.mp3",
  "shang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-shang.mp3",
  "sheng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-sheng.mp3",
  "ran": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-ran.mp3",
  "ren": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-ren.mp3",
  "rang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-rang.mp3",
  "reng": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-reng.mp3",
  "rong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/freecompress-rong.mp3",
  "yu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-yu.mp3",
  "yue": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-yue.mp3",
  "yuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-yuan.mp3",
  "yun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-yun.mp3",
  "biao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-biao.mp3",
  "bie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bie.mp3",
  "bian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bian.mp3",
  "bin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bin.mp3",
  "bing": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-bing.mp3",
  "piao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-piao.mp3",
  "pie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pie.mp3",
  "pian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pian.mp3",
  "pin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-pin.mp3",
  "ping": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ping.mp3",
  "miao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-miao.mp3",
  "mie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mie.mp3",
  "miu": "o.mp3",
  "mian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-mian.mp3",
  "min": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-min.mp3",
  "ming": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ming.mp3",
  "diao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-diao.mp3",
  "die": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-die.mp3",
  "diu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-diu.mp3",
  "dian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dian.mp3",
  "ding": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ding.mp3",
  "tiao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tiao.mp3",
  "tie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tie.mp3",
  "tian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tian.mp3",
  "ting": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ting.mp3",
  "niao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-niao.mp3",
  "nie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nie.mp3",
  "niu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/niu.mp3",
  "nian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nian.mp3",
  "nin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nin.mp3",
  "niang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-niang.mp3",
  "ning": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ning.mp3",
  "lia": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lia.mp3",
  "liao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-liao.mp3",
  "lie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lie.mp3",
  "liu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-liu.mp3",
  "lian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lian.mp3",
  "lin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-lin.mp3",
  "liang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-liang.mp3",
  "ling": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ling.mp3",
  "ji": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ji.mp3",
  "jia": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jia.mp3",
  "jiao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jiao.mp3",
  "jie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jie.mp3",
  "jiu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jiu.mp3",
  "jian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jian.mp3",
  "jin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jin.mp3",
  "jiang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jiang.mp3",
  "jing": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jing.mp3",
  "jiong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-jiong.mp3",
  "qi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qi.mp3",
  "qia": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qia.mp3",
  "qiao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qiao.mp3",
  "qie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qie.mp3",
  "qiu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qiu.mp3",
  "qian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qian.mp3",
  "qin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qin.mp3",
  "qiang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qiang.mp3",
  "qing": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qing.mp3",
  "qiong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-qiong.mp3",
  "xi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xi.mp3",
  "xia": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xia.mp3",
  "xiao": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xiao.mp3",
  "xie": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xie.mp3",
  "xiu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/xiu.mp3",
  "xian": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xian.mp3",
  "xin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xin.mp3",
  "xiang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xiang.mp3",
  "xing": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xing.mp3",
  "xiong": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-xiong.mp3",
  "yi": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/yi.mp3",
  "yin": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-yin.mp3",
  "ying": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ying.mp3",
  "duo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-duo.mp3",
  "dui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dui.mp3",
  "duan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-duan.mp3",
  "dun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-dun.mp3",
  "tuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tuo.mp3",
  "tui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tui.mp3",
  "tuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tuan.mp3",
  "tun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-tun.mp3",
  "nuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nuo.mp3",
  "nuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-nuan.mp3",
  "luo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/luo.mp3",
  "luan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/luan.mp3",
  "lun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/lun.mp3",
  "gua": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gua.mp3",
  "guo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-guo.mp3",
  "guai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-guai.mp3",
  "gui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gui.mp3",
  "guan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-guan.mp3",
  "gun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-gun.mp3",
  "guang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-guang.mp3",
  "kua": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kua.mp3",
  "kuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kuo.mp3",
  "kuai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kuai.mp3",
  "kui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kui.mp3",
  "kuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kuan.mp3",
  "kun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kun.mp3",
  "kuang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-kuang.mp3",
  "hua": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hua.mp3",
  "huo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-huo.mp3",
  "huai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-huai.mp3",
  "hui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hui.mp3",
  "huan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-huan.mp3",
  "hun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-hun.mp3",
  "huang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-huang.mp3",
  "zu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/zu.mp3",
  "zuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/zuo.mp3",
  "zui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/zui.mp3",
  "zuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/zuan.mp3",
  "zun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/zun.mp3",
  "cu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/cu.mp3",
  "cuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/cuo.mp3",
  "cui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/cui.mp3",
  "cuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/cuan.mp3",
  "cun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/cun.mp3",
  "su": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/su.mp3",
  "suo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/suo.mp3",
  "sui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/sui.mp3",
  "suan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/suan.mp3",
  "sun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/sun.mp3",
  "zhu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/zhu.mp3",
  "zhua": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhua.mp3",
  "zhuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhuo.mp3",
  "zhuai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhuai.mp3",
  "zhui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhui.mp3",
  "zhuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhuan.mp3",
  "zhun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/zhun.mp3",
  "zhuang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-zhuang.mp3",
  "chu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/chu.mp3",
  "chua": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chua-1.mp3",
  "chuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chuo.mp3",
  "chuai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chuai.mp3",
  "chui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chui.mp3",
  "chuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chuan.mp3",
  "chun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chun.mp3",
  "chuang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-chuang.mp3",
  "shu": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/shu.mp3",
  "shua": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shua.mp3",
  "shuo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shuo.mp3",
  "shuai": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shuai.mp3",
  "shui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shui.mp3",
  "shuan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shuan.mp3",
  "shun": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shun.mp3",
  "shuang": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-shuang.mp3",
  "ru": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/03/ru.mp3",
  "rua": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-rua.mp3",
  "ruo": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ruo.mp3",
  "rui": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-rui.mp3",
  "ruan": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-ruan.mp3",
  "run": "https://tiengtrungthaoan.edu.vn/wp-content/uploads/2024/02/freecompress-run.mp3",
  "wu": "o.mp3"
};
