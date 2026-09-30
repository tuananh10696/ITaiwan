#!/usr/bin/env python3
"""
NGHE LẠI toàn bộ bản thu từ vựng — clip có đọc ĐÚNG từ ghi trên thẻ không (2026-09-30)

    scripts/.venv/bin/python scripts/kiem-noi-dung-audio.py                 # nghe + chấm
    ... --chi-cham                     # bỏ bước nghe, chấm lại từ kết quả đã có
    ... --model <ggml.bin> --nhom 10   # model whisper.cpp · số clip mỗi khung 30s
    ... --clip B1L01-1-17,B1L01-1-18   # chỉ nghe mấy clip này (kiểm nhanh)

VÌ SAO: `kiem-audio.mjs` chỉ bắt được file THIẾU / CÂM / CẮT HỤT. Clip cắt LỆCH MỐC — đọc nửa từ
("美國" chỉ còn "國") hoặc đọc sang từ bên cạnh — vẫn có tiếng, dài bình thường, phát "thành công":
không bộ kiểm nào dựa trên file bắt được. Phải NGHE. (Người dùng báo từ 17-18 bài 1.1 đọc sai,
2026-09-30: 美國 -> nghe ra "我", 英國 -> "或".)

CÁCH NGHE CHO NHANH: whisper luôn chạy bộ mã hoá trên khung 30 giây, nên nghe từng clip 1 giây là
tốn 30 lần. Ở đây ghép ~10 clip (cách nhau 1 giây lặng) vào một khung, nhận dạng một lần, rồi
GIÓNG HÀNG chuỗi âm tiết nghe được với chuỗi âm tiết mong đợi (Needleman–Wunsch, so âm tiết bỏ
dấu, chấm điểm gần đúng cho lẫn lộn n/ng, z/zh…). KHÔNG dựa vào mốc thời gian của whisper — ghép
nhiều clip thì mốc trôi cả giây và whisper hay bỏ chữ.

Ra: scripts/data-cache/asr/ket-qua.json   { clip: {han, py, nghe, diem, nghi} }
"""
import argparse, json, os, re, subprocess, sys, unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / 'public'
LAM = ROOT / 'scripts' / 'data-cache' / 'asr'
MODEL_MD = LAM / 'ggml-small.bin'
KQ = LAM / 'ket-qua.json'
HAN = re.compile(r'[㐀-鿿豈-﫿]')

from pypinyin import lazy_pinyin

# ------------------------------------------------------------------ âm tiết
def bo_dau(s):
    s = str(s or '')
    for a in 'üÜǖǘǚǜ':
        s = s.replace(a, 'v')
    s = unicodedata.normalize('NFD', s)
    return ''.join(c for c in s if unicodedata.category(c) != 'Mn').lower()

_AM = None
def am_hop_le():
    global _AM
    if _AM is None:
        out = subprocess.run(['node', '--input-type=module', '-e',
            "const m=await import('" + str(ROOT / 'src/data/pinyinChartData.js') + "');"
            "const s=new Set();for(const i of m.pinyinChartInitials)for(const c of Object.values(m.pinyinChart[i]||{}))if(c)s.add(c[0]);"
            "console.log(JSON.stringify([...s]))"], capture_output=True, text=True).stdout
        _AM = set(json.loads(out)) | {'r', 'er', 'n', 'ng', 'm', 'yo', 'lo', 'nei', 'shei', 'zhei', 'dei', 'gei', 'hei'}
    return _AM

def tach_py(py, so_chu):
    """Phiên âm của sách ('měiguó', 'nàlǐ / nàr') -> ['mei','guo'] đúng số chữ Hán nếu tách được."""
    for bien in re.split(r'[/／]', re.sub(r'[（(].*?[）)]', '', str(py or ''))):
        flat = re.sub(r'[^a-zv]', '', bo_dau(bien))
        if not flat:
            continue
        ra = []
        def duyet(i, acc):
            if ra: return
            if i == len(flat):
                if not so_chu or len(acc) == so_chu: ra.append(list(acc))
                return
            for l in range(min(6, len(flat) - i), 0, -1):
                a = flat[i:i + l]
                if a in am_hop_le():
                    acc.append(a); duyet(i + l, acc); acc.pop()
        duyet(0, [])
        if ra:
            return ra[0]
    return None

def am_mong_doi(han, py):
    chu = [c for c in re.sub(r'[（(].*?[）)]', '', han.split('/')[0]) if HAN.match(c)]
    a = tach_py(py, len(chu))
    if a: return a
    return [bo_dau(x) for x in lazy_pinyin(''.join(chu))] or None

def am_nghe(text):
    """Chữ whisper nghe ra (giản thể, có thể lẫn Latin) -> âm tiết bỏ dấu."""
    ra = []
    for tok in lazy_pinyin(text, errors=lambda s: [s]):
        t = re.sub(r'[^a-z]', '', bo_dau(tok).replace('ü', 'v'))
        if t: ra.append(t)
    return ra

# gần đúng: phụ âm đầu dễ lẫn khi nghe giọng Đài Loan / giọng máy nhận dạng
DAU = ['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s','y','w']
def tach_dau(a):
    for d in DAU:
        if a.startswith(d): return d, a[len(d):]
    return '', a
GAN_DAU = [{'z','zh'},{'c','ch'},{'s','sh'},{'n','l'},{'l','r'},{'f','h'},{'y',''},{'w',''},{'j','q','x'},{'b','p'},{'d','t'},{'g','k'}]
# Cách đọc chuẩn ĐÀI LOAN (sách) và chuẩn ĐẠI LỤC (whisper hay nghe ra) của cùng một chữ — coi là khớp.
DONG_AM = {frozenset(x) for x in [('shei', 'shui'), ('han', 'he'), ('le', 'la'), ('se', 'ji'), ('xi', 'xie'),
    ('sao', 'sou'), ('yai', 'ya'), ('zou', 'zhou'), ('gua', 'wo'), ('yao', 'xiao'), ('si', 'ci'), ('bo', 'bao'),
    ('zhan', 'zan'), ('jie', 'zi'), ('shou', 'shu'), ('qi', 'qi')]}
def diem_am(a, b):
    if a == b or frozenset((a, b)) in DONG_AM: return 1.0
    da, va = tach_dau(a); db, vb = tach_dau(b)
    dd = 1.0 if da == db else (0.6 if any(da in s and db in s for s in GAN_DAU) else 0.0)
    va2, vb2 = va.rstrip('g'), vb.rstrip('g')      # in/ing, en/eng, an/ang
    if va == vb: dv = 1.0
    elif va2 == vb2: dv = 0.8
    elif va and vb and (va in vb or vb in va): dv = 0.5
    else: dv = 0.0
    return 0.4 * dd + 0.6 * dv

def giong_hang(mong, nghe):
    """mong: [(clip, [am])]; nghe: [am]. Trả {clip: điểm 0..1 = trung bình điểm các âm của clip}."""
    seq = [(ci, a) for ci, (_, ams) in enumerate(mong) for a in ams]
    n, m = len(seq), len(nghe)
    GAP = -0.4
    S = [[0.0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1): S[i][0] = S[i - 1][0] + GAP
    for j in range(1, m + 1): S[0][j] = S[0][j - 1] + GAP
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            s = diem_am(seq[i - 1][1], nghe[j - 1])
            S[i][j] = max(S[i - 1][j - 1] + (s * 2 - 0.6), S[i - 1][j] + GAP, S[i][j - 1] + GAP)
    i, j = n, m
    diem = [0.0] * n
    ghep = [None] * n
    while i > 0 and j > 0:
        s = diem_am(seq[i - 1][1], nghe[j - 1])
        if abs(S[i][j] - (S[i - 1][j - 1] + (s * 2 - 0.6))) < 1e-9:
            diem[i - 1] = s; ghep[i - 1] = nghe[j - 1]; i -= 1; j -= 1
        elif abs(S[i][j] - (S[i - 1][j] + GAP)) < 1e-9:
            i -= 1
        else:
            j -= 1
    theo_clip = {}
    for k, (ci, a) in enumerate(seq):
        theo_clip.setdefault(ci, []).append((a, ghep[k], diem[k]))
    return theo_clip

# ------------------------------------------------------------------ danh sách clip
def nap_clip():
    ra = {}
    for f in sorted((PUB / 'data' / 'giaotrinh').glob('*.json')):
        for w in json.loads(f.read_text(encoding='utf-8')).get('v', []):
            a = w.get('audio') or ''
            if 'thoidai-tu' in a and a not in ra:
                ra[a] = {'han': w['hanzi'], 'py': w.get('pinyin', '')}
    for f in sorted((PUB / 'data' / 'tocfl').glob('cap-*.json')):
        for w in json.loads(f.read_text(encoding='utf-8')).get('tu', []):
            a = w.get('audio') or ''
            if 'thoidai-tu' in a and a not in ra:
                ra[a] = {'han': w['hanzi'], 'py': w.get('pinyin', '')}
    return ra

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', default=str(MODEL_MD))
    ap.add_argument('--nhom', type=int, default=10)
    ap.add_argument('--luong', type=int, default=2, help='số tiến trình whisper chạy song song')
    ap.add_argument('--clip', default='')
    ap.add_argument('--chi-cham', action='store_true', dest='chi_cham')
    ap.add_argument('--rieng', action='store_true',
                    help='nghe TỪNG clip một (khung 30s đầy đủ) — chậm ~15s/clip nhưng không bị lỗi cả '
                         'khung như khi ghép; dùng để KẾT LUẬN cho tập clip đã bị nghi')
    ap.add_argument('--ra', default=str(KQ))
    a = ap.parse_args()
    WAV = LAM / 'wav'; NHOM = LAM / 'nhom'
    WAV.mkdir(parents=True, exist_ok=True); NHOM.mkdir(parents=True, exist_ok=True)

    clips = nap_clip()
    if a.clip:
        muon = set(x.strip() for x in a.clip.split(','))
        clips = {k: v for k, v in clips.items() if Path(k).stem in muon}
    ds = sorted(clips)
    print(f'{len(ds)} clip bản thu cần nghe lại', flush=True)

    # 1) mp3 -> wav 16k mono
    lang = LAM / 'lang.wav'
    if not lang.exists():
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-t', '1.0', '-i', 'anullsrc=r=16000:cl=mono', str(lang)], check=True)
    def doi(k):
        o = WAV / (Path(k).stem + '.wav')
        if not o.exists():
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(PUB / k.lstrip('/')), '-ar', '16000', '-ac', '1', str(o)], check=True)
        d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(o)], capture_output=True, text=True).stdout or 0)
        return k, d
    with ThreadPoolExecutor(12) as ex:
        dai = dict(ex.map(doi, ds))

    if a.rieng:
        return nghe_rieng(a, ds, clips, dai)

    # 2) ghép nhóm: ≤ nhom clip và ≤ 27s (một khung 30s của whisper)
    nhom, cur, t = [], [], 0.0
    for k in ds:
        d = dai[k] + 1.0
        if cur and (len(cur) >= a.nhom or t + d > 27.0):
            nhom.append(cur); cur, t = [], 0.0
        cur.append(k); t += d
    if cur: nhom.append(cur)
    tag = Path(a.model).stem
    viec = []
    for gi, g in enumerate(nhom):
        ten = NHOM / f'{tag}-{gi:04d}-{abs(hash(tuple(g))) % 10**8}'
        if not Path(str(ten) + '.json').exists():
            lst = Path(str(ten) + '.txt')
            lst.write_text(''.join(f"file '{WAV / (Path(k).stem + '.wav')}'\nfile '{lang}'\n" for k in g))
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-ar', '16000', '-ac', '1', str(ten) + '.wav'], check=True)
            viec.append(str(ten) + '.wav')
        nhom[gi] = (g, str(ten))

    # 3) nghe — mỗi tiến trình nạp model MỘT lần rồi chạy cả loạt file
    if viec and not a.chi_cham:
        print(f'nghe {len(viec)} khung bằng {tag} · {a.luong} luồng', flush=True)
        phan = [viec[i::a.luong] for i in range(a.luong)]
        def chay(ds_file):
            if not ds_file: return
            cmd = ['whisper-cli', '-m', a.model, '-l', 'zh', '-np', '-nt', '-t', str(max(1, 10 // a.luong)), '-mc', '0', '-oj']
            for i in range(0, len(ds_file), 40):     # 40 file/lượt: lỗi giữa chừng không mất cả loạt
                subprocess.run(cmd + ds_file[i:i + 40], capture_output=True)
                print(f'   … {min(i + 40, len(ds_file))}/{len(ds_file)}', flush=True)
        with ThreadPoolExecutor(a.luong) as ex:
            list(ex.map(chay, phan))

    # 4) chấm
    kq = json.loads(Path(a.ra).read_text(encoding='utf-8')) if Path(a.ra).exists() and not a.clip else {}
    for g, ten in nhom:
        jf = Path(ten + '.wav.json')
        if not jf.exists():
            continue
        text = ''.join(s['text'] for s in json.loads(jf.read_text(encoding='utf-8'))['transcription'])
        mong = [(k, am_mong_doi(clips[k]['han'], clips[k]['py']) or ['?']) for k in g]
        tc = giong_hang(mong, am_nghe(text))
        for ci, (k, ams) in enumerate(mong):
            ct = tc.get(ci, [])
            diem = sum(x[2] for x in ct) / max(1, len(ct))
            kq[k] = {'han': clips[k]['han'], 'py': clips[k]['py'], 'mong': ams,
                     'nghe': [x[1] for x in ct], 'diem': round(diem, 2), 'dai': round(dai[k], 2),
                     'khung': text.strip()[:120], 'model': tag}
    Path(a.ra).write_text(json.dumps(kq, ensure_ascii=False, indent=0), encoding='utf-8')
    nghi = sorted((v['diem'], k) for k, v in kq.items() if v['diem'] < 0.7)
    print(f'\nĐã chấm {len(kq)} clip · nghi đọc sai (điểm < 0,7): {len(nghi)}')
    for d, k in nghi[:40]:
        v = kq[k]
        print(f"   {d:.2f}  {Path(k).stem:16} {v['han']:8} mong={' '.join(v['mong'])}  nghe={' '.join(x or '_' for x in v['nghe'])}")

def nghe_rieng(a, ds, clips, dai):
    """Mỗi clip một lần nhận dạng. Whisper nghe một từ đứng riêng kém hơn nghe trong câu, nhưng
    không bao giờ hỏng dây chuyền cả khung như khi ghép (đo 2026-09-30: model lớn + ghép 10 clip có
    khung chỉ ra đúng MỘT chữ cho cả 10 clip)."""
    RI = LAM / 'rieng'; RI.mkdir(parents=True, exist_ok=True)
    tag = Path(a.model).stem
    def chuan_bi(k):
        o = RI / (Path(k).stem + '.wav')
        if not o.exists():
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(PUB / k.lstrip('/')), '-af', 'apad=pad_dur=1',
                            '-ar', '16000', '-ac', '1', str(o)], check=True)
        return str(o)
    with ThreadPoolExecutor(12) as ex:
        files = dict(zip(ds, ex.map(chuan_bi, ds)))
    can = [files[k] for k in ds if not Path(files[k] + f'.{tag}.json').exists()]
    if can and not a.chi_cham:
        print(f'nghe riêng {len(can)} clip bằng {tag} · {a.luong} luồng', flush=True)
        phan = [can[i::a.luong] for i in range(a.luong)]
        def chay(ds_file):
            for i in range(0, len(ds_file), 20):
                lo = ds_file[i:i + 20]
                subprocess.run(['whisper-cli', '-m', a.model, '-l', 'zh', '-np', '-nt', '-t', str(max(1, 10 // a.luong)),
                                '-oj'] + lo, capture_output=True)
                for f in lo:                       # đổi tên theo model để lượt model khác không đè lên
                    j = Path(f + '.json')
                    if j.exists(): j.replace(f + f'.{tag}.json')
                print(f'   … {min(i + 20, len(ds_file))}/{len(ds_file)}', flush=True)
        with ThreadPoolExecutor(a.luong) as ex:
            list(ex.map(chay, phan))
    kq = {}
    for k in ds:
        j = Path(files[k] + f'.{tag}.json')
        if not j.exists():
            continue
        text = ''.join(x['text'] for x in json.loads(j.read_text(encoding='utf-8'))['transcription']).strip()
        ams = am_mong_doi(clips[k]['han'], clips[k]['py']) or ['?']
        nghe = am_nghe(text)
        ct = giong_hang([(k, ams)], nghe).get(0, [])
        diem = sum(x[2] for x in ct) / max(1, len(ct))
        # THỪA: sách đọc cả SỐ THỨ TỰ trước từ ("四十九、燦爛") và bộ cắt cũ có chỗ ôm luôn phần đó.
        # Điểm khớp vẫn cao (từ đúng có mặt) nên phải đếm riêng số âm tiết nghe dư.
        thua = max(0, len(nghe) - len(ams))
        kq[k] = {'han': clips[k]['han'], 'py': clips[k]['py'], 'mong': ams, 'nghe': [x[1] for x in ct],
                 'diem': round(diem, 2), 'thua': thua, 'dai': round(dai[k], 2), 'khung': text[:80],
                 'model': tag + '-rieng'}
    Path(a.ra).write_text(json.dumps(kq, ensure_ascii=False, indent=0), encoding='utf-8')
    nghi = sorted((v['diem'], k) for k, v in kq.items() if v['diem'] < 0.7 or v['thua'] >= 2)
    print(f'\nNghe riêng {len(kq)} clip · đọc sai (điểm < 0,7) hoặc thừa ≥ 2 âm tiết: {len(nghi)}')
    for d, k in nghi:
        v = kq[k]
        print(f"   {d:.2f} +{v['thua']}  {Path(k).stem:16} {v['han']:8} mong={' '.join(v['mong'])}  nghe=«{v['khung']}»")


if __name__ == '__main__':
    main()
