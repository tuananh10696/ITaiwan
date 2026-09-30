#!/usr/bin/env python3
"""
PHIÊN ÂM CHO CÂU chữ Hán (phồn thể) theo cách viết của giáo trình Thời Đại — 2026-10-01

    scripts/.venv/bin/python scripts/gen-pinyin-cau.py <vào.json> <ra.json>
      vào: ["他是新同學。", ...]  hoặc  [{"hz": ...}, ...]
      ra : {"他是新同學。": "Tā shì xīn tóngxué.", ...}

Cách viết bám đúng câu ví dụ của phần Từ vựng trong sách ("Tā shì wǒmen de xīn tóngxué."):
  · liền trong một TỪ, cách nhau giữa các từ (tách từ bằng jieba trên bản giản thể)
  · biến điệu của 一 / 不 GHI THEO CÁCH ĐỌC (yí ge, bú shì) — đúng quy ước của sách;
    biến điệu 3-3 thì KHÔNG ghi (nǐ hǎo), cũng đúng quy ước sách
  · cách đọc chuẩn ĐÀI LOAN cho những chữ pypinyin (chuẩn đại lục) đọc khác
  · chữ Latin/pinyin có sẵn trong ngoặc của câu gốc ("王(Wáng)先生") thì bỏ ngoặc đó đi
  · viết hoa chữ cái đầu câu, dấu câu Trung đổi sang dấu Latin
"""
import json, re, sys
import jieba, jieba.posseg as pseg, opencc
from pypinyin import pinyin, Style, load_phrases_dict

jieba.setLogLevel(60)
T2S = opencc.OpenCC('t2s')
HAN = re.compile(r'[㐀-鿿豈-﫿]')

# Cách đọc chuẩn Đài Loan (教育部) khác pypinyin — theo TỪ để không đụng chữ đa âm ở từ khác.
load_phrases_dict({
    '星期': [['xīng'], ['qí']], '日期': [['rì'], ['qí']], '期間': [['qí'], ['jiān']], '學期': [['xué'], ['qí']],
    '期中': [['qí'], ['zhōng']], '期末': [['qí'], ['mò']], '時期': [['shí'], ['qí']], '期待': [['qí'], ['dài']],
    '垃圾': [['lè'], ['sè']], '危險': [['wéi'], ['xiǎn']], '危機': [['wéi'], ['jī']], '微笑': [['wéi'], ['xiào']],
    '暫時': [['zhàn'], ['shí']], '企業': [['qì'], ['yè']], '品質': [['pǐn'], ['zhí']], '認識': [['rèn'], ['shì']],
    '知識': [['zhī'], ['shì']], '攜帶': [['xī'], ['dài']], '研究': [['yán'], ['jiù']], '擁有': [['yǒng'], ['yǒu']],
    '擁擠': [['yǒng'], ['jǐ']], '血液': [['xiě'], ['yì']], '液體': [['yì'], ['tǐ']], '癌症': [['ái'], ['zhèng']],
    '誰': [['shéi']], '和': [['hàn']],
})
# Từ lặp chỉ người thân + 謝謝/太太: âm tiết sau đọc nhẹ (sách ghi bàba, māma, xièxie)
load_phrases_dict({
    '爸爸': [['bà'], ['ba']], '妈妈': [['mā'], ['ma']], '哥哥': [['gē'], ['ge']], '弟弟': [['dì'], ['di']],
    '妹妹': [['mèi'], ['mei']], '姐姐': [['jiě'], ['jie']], '爷爷': [['yé'], ['ye']], '奶奶': [['nǎi'], ['nai']],
    '伯伯': [['bó'], ['bo']], '叔叔': [['shú'], ['shu']], '谢谢': [['xiè'], ['xie']], '太太': [['tài'], ['tai']],
})
# Bảng trên viết phồn thể; câu được tra trên bản giản thể nên nạp thêm khoá giản thể.
load_phrases_dict({T2S.convert(k): v for k, v in {
    '星期': [['xīng'], ['qí']], '日期': [['rì'], ['qí']], '期間': [['qí'], ['jiān']], '學期': [['xué'], ['qí']],
    '期中': [['qí'], ['zhōng']], '期末': [['qí'], ['mò']], '時期': [['shí'], ['qí']], '期待': [['qí'], ['dài']],
    '垃圾': [['lè'], ['sè']], '危險': [['wéi'], ['xiǎn']], '危機': [['wéi'], ['jī']], '微笑': [['wéi'], ['xiào']],
    '暫時': [['zhàn'], ['shí']], '企業': [['qì'], ['yè']], '品質': [['pǐn'], ['zhí']], '認識': [['rèn'], ['shì']],
    '知識': [['zhī'], ['shì']], '攜帶': [['xī'], ['dài']], '研究': [['yán'], ['jiù']], '擁有': [['yǒng'], ['yǒu']],
    '擁擠': [['yǒng'], ['jǐ']], '血液': [['xiě'], ['yì']], '液體': [['yì'], ['tǐ']], '癌症': [['ái'], ['zhèng']],
}.items()})
TW_CHU = {'誰': 'shéi', '期': 'qí', '危': 'wéi', '微': 'wéi', '暫': 'zhàn', '企': 'qì', '擁': 'yǒng', '攜': 'xī',
          # 姊 đọc jiě (姊姊 jiějie); 息/夕/誼/綜/髮/播/酵/寂/跡: cách đọc 教育部 Đài Loan
          '姊': 'jiě', '息': 'xí', '夕': 'xì', '誼': 'yí', '綜': 'zòng', '髮': 'fǎ', '播': 'bò', '酵': 'xiào',
          '寂': 'jí', '跡': 'jī',
          # chữ phồn thể gộp vào một chữ giản thể đa âm: 隻/只, 乾/干, 幹/干
          '隻': 'zhī', '乾': 'gān', '幹': 'gàn'}
DAU = {'，': ',', '。': '.', '？': '?', '！': '!', '：': ':', '；': ';', '、': ',', '「': '“', '」': '”',
       '『': '“', '』': '”', '（': '(', '）': ')', '…': '…', '⋯': '…', '—': '—', '～': '~', '《': '«', '》': '»'}
THANH4 = set('àèìòùǜ')
NGUYEN_AM_DAU = set('aāáǎàoōóǒòeēéěè')
TEN_RIENG = {'臺灣', '台灣', '日本', '中國', '美國', '英國', '法國', '德國', '韓國', '越南', '泰國', '印尼', '台北', '臺北',
             '高雄', '台南', '臺南', '花蓮', '台中', '臺中', '菲律賓', '馬來西亞', '新加坡', '香港', '東京', '北京', '上海'}
for _t in TEN_RIENG:
    jieba.add_word(T2S.convert(_t), tag='ns')

# Tên nhân vật / người có trong sách (viết hoa). Danh xưng đứng sau họ.
TEN_NGUOI = {'友美', '中明', '宜文', '國安', '良介', '家樂', '元真', '可欣', '美心', '靜文', '以凡', '莫以凡', '朋子',
             '尚恩', '小林', '牛郎', '織女', '孔子', '李安', '孔明', '諸葛孔明', '關聖帝君', '雅文', '明正'}
DANH_XUNG = {'先生', '小姐', '太太', '老師', '老闆', '教授', '經理', '同學', '伯伯', '阿姨', '爺爺', '奶奶', '醫生',
             '主任', '律師', '記者', '媽媽', '爸爸', '大哥', '大姊', '大姐', '小姐們', '總統', '市長', '導演', '教練'}
HO = set('王李張陳林黃吳劉蔡楊許鄭謝郭洪曾邱廖賴周徐蘇葉莊呂江何蕭羅高潘簡朱鍾游彭詹胡施沈余趙盧梁顏柯孫魏翁'
         '戴范宋方鄧杜傅侯曹薛丁卓阮馬董溫唐藍蔣石古紀姚連馮歐程湯田康姜白汪鄒尤巫鐘黎龔嚴韓袁金童陸夏柳邵錢'
         '伍倪于譚駱熊任秦顧毛章史萬俞雷饒崔孔孟聶畢包文牛')
# 著 giữ zhù/zháo/zhuó trong các từ này, còn lại là trợ từ "zhe"
TU_CO_ZHU = {'著名', '著作', '顯著', '名著', '原著', '著急', '著涼', '著火', '睡著', '找著', '著想', '著手', '著重',
             '著迷', '執著', '沉著', '衣著', '著陸', '土著', '著實', '著眼'}

for _t in TEN_NGUOI:
    jieba.add_word(T2S.convert(_t), tag='nr')

DE_THAT = {'獲得', '取得', '難得', '心得', '贏得', '得到', '得意', '得分', '不得', '得獎', '得罪', '得知', '得失', '得勝',
           '所得', '得體', '得以', '得力', '懂得', '捨得', '免得', '省得', '使得', '懶得', '顯得', '記得', '覺得', '值得'}
DEI_SAU = set('把先趕花做要準交用寫請等跟找搬付注負考加幫忍再')   # KHÔNG có 走上來去回: V得走/V得上 là bổ ngữ khả năng (de)
load_phrases_dict({'肚子': [['dù'], ['zi']], '肚子疼': [['dù'], ['zi'], ['téng']]})

def am_chu(c, cau, i):
    if c in TW_CHU:
        return TW_CHU[c]
    return None

def phien(cau):
    goc = str(cau)
    s = re.sub(r'[(（][A-Za-zÀ-ɏ\s\-’\']+[)）]', '', goc)          # bỏ pinyin có sẵn trong ngoặc
    gian = T2S.convert(s)
    # HMM=False: bật HMM là jieba ghép bừa chữ lạ thành từ mới ("很累" -> một từ, "中明姓" -> một từ).
    tu = [(x.word, x.flag) for x in pseg.cut(gian, HMM=False)]
    ra, vt = [], 0
    for w, loai in tu:
        doan = s[vt:vt + len(w)]; vt += len(w)
        if not HAN.search(doan):
            # chữ Latin / số giữ nguyên cả cụm ("101~199", "KTV"), chỉ dấu câu mới tách riêng
            cum = ''
            for ch in doan:
                if ch in DAU or ch.isspace() or ch in '()[]':
                    if cum: ra.append(('w', cum)); cum = ''
                    if not ch.isspace(): ra.append(('x', DAU.get(ch, ch)))
                else:
                    cum += ch
            if cum: ra.append(('w', cum))
            continue
        # Tra trên bản GIẢN THỂ: từ điển cụm từ của pypinyin khoá bằng giản thể, tra phồn thể là rơi về
        # cách đọc từng chữ -> 銀行 ra "yínxíng", 妹妹 ra "mèimèi". Bản giản thể cùng độ dài với bản gốc.
        ams = [x[0] for x in pinyin(w if len(w) == len(doan) else doan, style=Style.TONE, heteronym=False,
                                    errors=lambda t: list(t))]
        am_tu = []
        for k, ch in enumerate(doan):
            if HAN.match(ch):
                am_tu.append(TW_CHU.get(ch) or ams[k])
            else:
                ra.append(('w', ''.join(am_tu))); am_tu = []
                ra.append(('x', DAU.get(ch, ch)))
        if am_tu:
            # 著 trợ từ (有著, 靠著, 看著) đọc zhe; chỉ giữ zhù/zháo/zhuó trong các từ có nghĩa riêng
            truoc = s[vt - len(w) - 1] if vt - len(w) >= 1 else ''
            if doan == '得':
                # 得 đứng riêng: "phải" (děi) khi đứng sau chủ ngữ/phó từ hoặc trước động từ hành động
                # (我得走了, 前得把, 還得先); còn lại là trợ từ bổ ngữ (踢得很遠, 洗得乾淨) đọc de
                sau_ = s[vt] if vt < len(s) else ''
                sau2 = s[vt:vt + 3]
                bo_ngu = sau2.startswith(('要命', '不得了', '很', '非常', '太')) or truoc in '心痛累忙餓渴冷熱氣急怕高興'
                am_tu[0] = 'děi' if not bo_ngu and (truoc in '我你他她們就還都也總又才得' or sau_ in DEI_SAU) else 'de'
            else:
                # 得 nằm trong cụm jieba ghép (長得帥, 跑得快): pypinyin đọc dé; chỉ giữ dé ở các từ có nghĩa "được"
                for k, ch in enumerate(doan):
                    if ch == '得' and k > 0 and k < len(am_tu) and am_tu[k] == 'dé' and \
                            doan[k - 1:k + 1] not in DE_THAT and doan[k:k + 2] not in DE_THAT:
                        am_tu[k] = 'de'
            for k, ch in enumerate(doan):
                if ch != '著' or k >= len(am_tu):
                    continue
                if doan == '穿著':
                    # danh từ "cách ăn mặc" (對穿著很講究, 在穿著方面, 的穿著) đọc zhuó; động từ + trợ từ đọc zhe
                    am_tu[k] = 'zhuó' if truoc in '對在的' else 'zhe'
                elif doan not in TU_CO_ZHU:
                    am_tu[k] = 'zhe'
            ra.append(['w', am_tu, doan, doan in TEN_RIENG or doan in TEN_NGUOI])
    # Họ + danh xưng (王先生, 李小姐) -> "Wáng xiānshēng": họ viết hoa, tách khỏi danh xưng.
    # KHÔNG dựa vào nhãn từ loại của jieba: nó gắn nhãn tên riêng cho cả 東西, 小姐, 哥哥...
    ra2 = []
    for i, r in enumerate(ra):
        if r[0] == 'w' and isinstance(r[1], list):
            d = r[2]
            if len(d) >= 2 and d[0] in HO and d[1:] in DANH_XUNG:
                ra2.append(['w', r[1][:1], d[0], True]); ra2.append(['w', r[1][1:], d[1:], False]); continue
            if len(d) == 1 and d in HO:
                sau = next((x for x in ra[i + 1:i + 2] if x[0] == 'w' and isinstance(x[1], list)), None)
                if sau and sau[2] in DANH_XUNG:
                    r[3] = True
        ra2.append(r)
    ra = ra2
    # biến điệu 一 / 不 (ghi theo cách đọc, như sách)
    phang = []   # [(chữ, âm)] theo thứ tự để nhìn âm kế tiếp
    for r in ra:
        if r[0] == 'w' and isinstance(r[1], list):
            for ch, a in zip([c for c in r[2] if HAN.match(c)], r[1]):
                phang.append([ch, a])
    for i, (ch, a) in enumerate(phang):
        sau = phang[i + 1][1] if i + 1 < len(phang) else ''
        if ch == '不' and sau and any(c in THANH4 for c in sau):
            phang[i][1] = 'bú'
        if ch == '一' and sau:
            truoc = phang[i - 1][0] if i > 0 else ''
            if truoc in '第' or sau[:1].isdigit():
                continue
            phang[i][1] = 'yí' if any(c in THANH4 for c in sau) else 'yì'
    # ghép lại
    it = iter(phang)
    out = []
    for r in ra:
        if r[0] == 'w' and isinstance(r[1], list):
            ams = [next(it)[1] for _ in r[1]]
            # dấu cách âm: âm tiết bắt đầu bằng a/o/e đứng sau âm tiết khác trong cùng từ (kě'ài)
            tu_py = ams[0] + ''.join(("'" + a) if a[:1].lower() in NGUYEN_AM_DAU else a for a in ams[1:])
            if r[3]:
                tu_py = tu_py[:1].upper() + tu_py[1:]
            out.append(tu_py)
        elif r[0] == 'w':
            out.append(r[1])
        else:
            out.append(r[1])
    # khoảng trắng: giữa các từ; dấu câu dính vào từ trước
    s2 = ''
    for tok in out:
        if not tok:
            continue
        if re.fullmatch(r'[,.?!:;…”»)\]~—]+', tok):
            s2 = s2.rstrip() + tok + ' '
        elif re.fullmatch(r'[“«(\[]+', tok):
            s2 += tok
        else:
            s2 += tok + ' '
    s2 = re.sub(r'\s+', ' ', s2).strip()
    # viết hoa chữ cái đầu câu (và sau . ? !)
    # (ngoặc kép giữa câu là tên mẫu ngữ pháp như “甚至” -> KHÔNG viết hoa; chỉ viết hoa khi mở đầu câu/lời thoại)
    s2 = re.sub(r'(^[“«]?|[.?!]\s+[“«]?|:\s[“«]?)([a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ])', lambda m: m.group(1) + m.group(2).upper(), s2)
    # 姊姊: âm tiết sau đọc nhẹ, như sách ghi (jiějie)
    s2 = s2.replace('jiějiě', 'jiějie').replace('Jiějiě', 'Jiějie')
    # ô trống "ˍˍˍ" viết liền một cụm
    s2 = re.sub(r'ˍ(?:\s*ˍ)+', lambda m: m.group(0).replace(' ', ''), s2)
    # số: "101~199", "60,001" viết liền
    s2 = re.sub(r'(\d)\s*([~,])\s*(\d)', r'\1\2\3', s2)
    return s2

if __name__ == '__main__':
    vao, ra = sys.argv[1], sys.argv[2]
    ds = json.load(open(vao, encoding='utf-8'))
    ds = [d['hz'] if isinstance(d, dict) else d for d in ds]
    kq = {c: phien(c) for c in ds}
    json.dump(kq, open(ra, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    for c in ds[:12]:
        print(c, '→', kq[c])
