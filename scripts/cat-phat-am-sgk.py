#!/usr/bin/env python3
"""
CẮT ÂM THANH THẬT CHO TRANG "HỌC PHÁT ÂM" từ bài 中文基礎 (phát âm) của giáo trình Thời Đại quyển 1 — 2026-10-01

    scripts/.venv/bin/python scripts/cat-phat-am-sgk.py            # tải (nếu thiếu) -> cắt -> ghi
    scripts/.venv/bin/python scripts/cat-phat-am-sgk.py --xem      # chỉ in bảng nhãn, không ghi file

Nguồn: thư mục audio chính thức (Drive công khai của 淡江大學華語中心), "Textbook1 > 中文基礎",
18 file B1-00-1.mp3 … B1-00-18.mp3. Một giọng đọc chuẩn Đài Loan cho toàn bộ thanh mẫu / vận mẫu /
bộ 4 thanh — thay cho các âm trước đây lấy từ nhiều nguồn khác nhau hoặc đọc bằng giọng máy.

Cách cắt: mỗi file là chuỗi âm đọc cách nhau bởi khoảng lặng ~1,5-2s -> tách theo khoảng lặng
(ffmpeg silencedetect -35dB, lặng >= 0,25s), đoạn thứ k của file n có nhãn trong bảng NHAN bên dưới.
Bảng nhãn dựng bằng: nhận dạng giọng nói từng đoạn (whisper) + đo đường cao độ (thanh 1/2/3/4) +
thứ tự chuẩn của sách (bộ 4 thanh luôn đọc 1-2-3-4, vần đứng riêng rồi mới tới âm có thanh mẫu).
Đoạn nào nhận dạng không khớp thì KHÔNG đưa vào bảng (thà thiếu còn hơn gán nhầm âm).

Ra:
  public/audio/pron/sgk/<tên>.mp3       (mono 44,1 kHz, chuẩn hoá đỉnh -1 dB, đệm 0,1 s hai đầu)
  scripts/du-lieu/phat-am-sgk.json      { "<tên>": {"loai", "hz", "py", "file"} }  -> gen-pron-sgk.mjs đọc
"""
import json, re, subprocess, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NGUON = ROOT / 'scripts/data-cache/thoidai/phat-am'
RA = ROOT / 'public/audio/pron/sgk'
BANG = ROOT / 'scripts/du-lieu/phat-am-sgk.json'
THU_MUC_DRIVE = '1lIHhM3tCi60Ug1yG9fw0K8kAdrhvB2yj'      # Textbook1 > 中文基礎
UA = {'User-Agent': 'Mozilla/5.0'}
XEM = '--xem' in sys.argv

THANH_MAU = 'b p m f d t n l g k h j q x zh ch sh r z c s'.split()
# vận mẫu đọc đứng riêng, đúng thứ tự trong file 2 (khoá = cách viết vận mẫu trên trang phát âm)
VAN_MAU = ['a', 'o', 'e', 'ê', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er',
           'i', 'ia', 'ie', 'yai', 'iao', 'iu', 'ian', 'in', 'iang', 'ing',
           'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ueng',
           'ü', 'üe', 'üan', 'ün', 'iong']
DAU = {'a': 'āáǎà', 'o': 'ōóǒò', 'e': 'ēéěè', 'i': 'īíǐì', 'u': 'ūúǔù', 'ü': 'ǖǘǚǜ'}


def them_dau(am, thanh):
    """'lü', 3 -> 'lǚ' (quy tắc đặt dấu: a/e trước, rồi o, rồi nguyên âm sau cùng)."""
    for nguyen_am in ('a', 'e'):
        if nguyen_am in am:
            return am.replace(nguyen_am, DAU[nguyen_am][thanh - 1], 1)
    if 'ou' in am:
        return am.replace('o', DAU['o'][thanh - 1], 1)
    for k in range(len(am) - 1, -1, -1):
        if am[k] in DAU:
            return am[:k] + DAU[am[k]][thanh - 1] + am[k + 1:]
    return am


def bo_thanh(file_so, dau, cac_am):
    """Bộ 4 thanh liên tiếp bắt đầu từ đoạn `dau`: {k: ('am', 'dā')}."""
    ra = {}
    for i, am in enumerate(cac_am):
        for t in range(4):
            ra[(file_so, dau + i * 4 + t)] = ('am', None, them_dau(am, t + 1))
    return ra


NHAN = {}
NHAN.update({(1, 5 + i): ('thanh-mau', None, x) for i, x in enumerate(THANH_MAU)})
NHAN.update({(2, 1 + i): ('van-mau', None, x) for i, x in enumerate(VAN_MAU)})
# file 3: vần đứng riêng rồi ghép thanh mẫu — a/da, e/te, yi/ni, wu/lu
NHAN.update(bo_thanh(3, 1, ['a', 'da', 'e', 'te', 'yi', 'ni', 'wu', 'lu']))
NHAN.update({(3, 33): ('tu', '一', 'yī'), (3, 34): ('tu', '五', 'wǔ'), (3, 35): ('tu', '八', 'bā'),
             (3, 36): ('tu', '二', 'èr'),        # đoạn 37-38 (你, 他) trùng file 13 -> dùng bản file 13
             (3, 39): ('tu', '爸爸', 'bàba'), (3, 40): ('tu', '弟弟', 'dìdi')})
# file 6: er — bộ 4 thanh rồi từ 兒子 (đoạn 4 "兒" và 6 "耳朵" nhận dạng không chắc -> bỏ)
NHAN.update(bo_thanh(6, 0, ['er']))
NHAN[(6, 5)] = ('tu', '兒子', 'érzi')
# file 12: đếm số — chỉ lấy các số chưa có ở file 3 (一 五 八 二 dùng bản file 3)
NHAN.update({(12, 4): ('tu', '三', 'sān'), (12, 5): ('tu', '四', 'sì'), (12, 7): ('tu', '六', 'liù'),
             (12, 8): ('tu', '七', 'qī'), (12, 10): ('tu', '九', 'jiǔ'), (12, 11): ('tu', '十', 'shí')})
# file 5: vần kép / vần mũi, mỗi vần đi kèm một âm có thanh mẫu
NHAN.update(bo_thanh(5, 0, ['ai', 'bai', 'ei', 'pei', 'ao', 'mao', 'ou', 'fou', 'an', 'zan', 'ang', 'chang',
                            'en', 'shen', 'eng', 'reng', 'bao', 'pan', 'mei', 'fei', 'zhang', 'chai', 'shao',
                            'ren', 'zou', 'cai']))
# file 8: nhóm i-
NHAN.update(bo_thanh(8, 0, ['ya', 'jia', 'ye', 'qie', 'yao', 'xiao', 'you', 'qiu', 'yan', 'xian', 'yin', 'qin',
                            'yang', 'jiang', 'ying', 'xing']))
NHAN.update({(8, 64): ('tu', '家', 'jiā'), (8, 65): ('tu', '球', 'qiú'), (8, 66): ('tu', '像', 'xiàng'),
             (8, 68): ('tu', '油', 'yóu'), (8, 69): ('tu', '瞧', 'qiáo'), (8, 70): ('tu', '餃子', 'jiǎozi')})
# file 9: nhóm u-
NHAN.update(bo_thanh(9, 0, ['wo', 'huo', 'wa', 'gua', 'wai', 'guai', 'wei', 'hui', 'wan', 'kuan', 'wen', 'kun',
                            'wang', 'guang', 'weng', 'hong']))
NHAN.update({(9, 64): ('tu', '花', 'huā')})
# file 10: nhóm ü-
NHAN.update(bo_thanh(10, 0, ['yu', 'lü', 'nü', 'ju', 'qu', 'xu', 'yue', 'lüe', 'nüe', 'jue', 'que', 'xue',
                             'yuan', 'juan', 'quan', 'xuan', 'yun', 'jun', 'qun', 'xun', 'yong', 'jiong',
                             'qiong', 'xiong']))
NHAN.update({(10, 96): ('tu', '女', 'nǚ'), (10, 97): ('tu', '綠', 'lǜ'), (10, 98): ('tu', '群', 'qún'),
             (10, 99): ('tu', '熊', 'xióng'), (10, 101): ('tu', '雨', 'yǔ'), (10, 102): ('tu', '月', 'yuè'),
             (10, 104): ('tu', '雲', 'yún'), (10, 105): ('tu', '用', 'yòng')})
# file 11: thanh nhẹ, 3+3, biến điệu 一 / 不
for k, hz, py in [(1, '三個', 'sān ge'), (2, '十個', 'shí ge'), (3, '九個', 'jiǔ ge'), (4, '六個', 'liù ge'),
                  (5, '桌子', 'zhuōzi'), (6, '什麼', 'shénme'), (7, '椅子', 'yǐzi'), (8, '辣的', 'là de'),
                  (9, '你好', 'nǐ hǎo'), (10, '老闆', 'lǎobǎn'), (11, '美女', 'měinǚ'),
                  (13, '一杯', 'yì bēi'), (14, '一條', 'yì tiáo'), (15, '一本', 'yì běn'), (16, '一樣', 'yíyàng'),
                  (17, '一個', 'yí ge'), (19, '不知', 'bù zhī'), (20, '不能', 'bù néng'), (21, '不好', 'bù hǎo'),
                  (22, '不要', 'bú yào'), (23, '不是', 'bú shì')]:
    NHAN[(11, k)] = ('tu', hz, py)
# file 13: từ đầu tiên của sách (đoạn chẵn là số thứ tự đọc xen vào -> bỏ)
for k, hz, py in [(1, '老師', 'lǎoshī'), (3, '學生', 'xuéshēng'), (5, '你', 'nǐ'), (7, '我', 'wǒ'), (9, '他', 'tā'),
                  (11, '是', 'shì'), (12, '我是老師。', 'Wǒ shì lǎoshī.'), (13, '他是學生。', 'Tā shì xuéshēng.'),
                  (15, '你們', 'nǐmen'), (17, '我們', 'wǒmen'), (19, '他們', 'tāmen'),
                  (25, '他不是日本人。', 'Tā bú shì Rìběn rén.'), (26, '他是台灣人。', 'Tā shì Táiwān rén.'),
                  (28, '先生', 'xiānshēng'), (30, '小姐', 'xiǎojiě'), (32, '太太', 'tàitai')]:
    NHAN[(13, k)] = ('tu', hz, py)
for k, (hz, py) in enumerate([('台灣', 'Táiwān'), ('中國', 'Zhōngguó'), ('韓國', 'Hánguó'), ('日本', 'Rìběn'),
                              ('越南', 'Yuènán'), ('印尼', 'Yìnní'), ('泰國', 'Tàiguó'), ('菲律賓', 'Fēilǜbīn'),
                              ('加拿大', 'Jiānádà'), ('美國', 'Měiguó'), ('墨西哥', 'Mòxīgē'), ('巴西', 'Bāxī'),
                              ('英國', 'Yīngguó'), ('法國', 'Fàguó'), ('德國', 'Déguó'), ('西班牙', 'Xībānyá')]):
    NHAN[(15, k)] = ('tu', hz, py)
for k, hz, py in [(1, '你好', 'nǐ hǎo'), (3, '再見', 'zàijiàn'), (5, '謝謝', 'xièxie'), (7, '不客氣', 'bú kèqi'),
                  (9, '對不起', 'duìbùqǐ'), (11, '沒關係', 'méi guānxi')]:
    NHAN[(17, k)] = ('tu', hz, py)
# 你好 có ở cả file 11 và 17: file 17 (hội thoại chào hỏi) đọc tự nhiên hơn -> dùng file 17
NHAN.pop((11, 9))


def ten_file(loai, hz, py):
    if loai == 'thanh-mau':
        return f'tm-{py}'
    if loai == 'van-mau':
        return 'vm-' + py.replace('ü', 'v').replace('ê', 'eh')
    if loai == 'am':
        # dā -> da1 ; lǚ -> lv3
        so = next((str(i + 1) for c in py for d in DAU.values() for i, x in enumerate(d) if x == c), '')
        tron = py
        for g, d in DAU.items():
            for x in d:
                tron = tron.replace(x, g)
        return tron.replace('ü', 'v') + so
    # từ: pinyin kèm số thanh sau mỗi nguyên âm mang dấu (是 shi4 / 十 shi2 không trùng tên)
    ra = ''
    for c in py.lower():
        so = next((str(i + 1) for g, d in DAU.items() for i, x in enumerate(d) if x == c), None)
        ra += next(g for g, d in DAU.items() if c in d) + so if so else c
    return 'tu-' + re.sub(r'[^a-zü0-9]', '', ra).replace('ü', 'v')


def ls_drive(fid):
    u = f'https://drive.google.com/embeddedfolderview?id={fid}#list'
    h = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=90).read().decode('utf8', 'ignore')
    return re.findall(r'id="entry-([\w-]{20,})".*?flip-entry-title">([^<]*)<', h, re.S)


def tai_nguon():
    can = [NGUON / f'B1-00-{n}.mp3' for n in range(1, 19)]
    if all(f.exists() and f.stat().st_size > 20000 for f in can):
        return
    NGUON.mkdir(parents=True, exist_ok=True)
    for fid, ten in ls_drive(THU_MUC_DRIVE):
        ten = ten.strip()
        if re.fullmatch(r'B1-00-\d+\.mp3', ten) and not (NGUON / ten).exists():
            print('  tải', ten, flush=True)
            subprocess.run(['curl', '-sL', '--max-time', '600', '-A', 'Mozilla/5.0', '-o', str(NGUON / ten),
                            f'https://drive.google.com/uc?export=download&id={fid}&confirm=t'], check=False)


def doan_am(mp3):
    """Các đoạn có tiếng [(đầu, cuối)] — cùng tham số đã dùng khi dựng bảng NHAN."""
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(mp3), '-af',
                        'silencedetect=noise=-35dB:d=0.25', '-f', 'null', '-'], capture_output=True, text=True).stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', r)]
    se = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', r)]
    m = re.search(r'Duration: (\d+):(\d+):([0-9.]+)', r)
    dai = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    ra, p = [], 0.0
    for i, a in enumerate(ss):
        if a - p > 0.08:
            ra.append((p, a))
        p = se[i] if i < len(se) else dai
    if dai - p > 0.08:
        ra.append((p, dai))
    return ra


def cat(mp3, a, b, dich):
    a0, b0 = max(0.0, a - 0.10), b + 0.10
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-ss', f'{a0:.3f}', '-to', f'{b0:.3f}', '-i', str(mp3),
                        '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = re.search(r'max_volume: (-?[0-9.]+) dB', r)
    tang = max(0.0, -1.0 - float(m.group(1))) if m else 0.0
    mo = min(0.03, (b0 - a0) / 4)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{a0:.3f}', '-to', f'{b0:.3f}', '-i', str(mp3),
                    '-af', f'volume={tang:.2f}dB,afade=t=in:d={mo:.3f},areverse,afade=t=in:d={mo:.3f},areverse',
                    '-ac', '1', '-ar', '44100', '-b:a', '64k', str(dich)], check=True)


def main():
    if XEM:
        for (n, k), (loai, hz, py) in sorted(NHAN.items()):
            print(n, k, loai, hz or '', py, ten_file(loai, hz, py))
        return
    tai_nguon()
    RA.mkdir(parents=True, exist_ok=True)
    bang = {}
    for n in sorted({n for n, _ in NHAN}):
        mp3 = NGUON / f'B1-00-{n}.mp3'
        ds = doan_am(mp3)
        for (fn, k), (loai, hz, py) in NHAN.items():
            if fn != n:
                continue
            if k >= len(ds):
                print(f'⚠️  file {n} chỉ có {len(ds)} đoạn, thiếu đoạn {k} ({py})')
                continue
            ten = ten_file(loai, hz, py)
            cat(mp3, *ds[k], RA / f'{ten}.mp3')
            bang[ten] = {'loai': loai, 'hz': hz, 'py': py, 'file': f'/audio/pron/sgk/{ten}.mp3', 'nguon': f'{n}:{k}'}
        print(f'file {n}: {len(ds)} đoạn', flush=True)
    BANG.parent.mkdir(parents=True, exist_ok=True)
    BANG.write_text(json.dumps(bang, ensure_ascii=False, indent=1), 'utf8')
    print(f'xong: {len(bang)} file -> {RA.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
