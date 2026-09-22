#!/usr/bin/env python3
"""
RANH GIỚI BÀI CON của Giáo trình Thời Đại (時代華語) — 2026-09-05

    scripts/.venv/bin/python scripts/gen-thoidai-parts.py --quyen 1,2,3,4,5

VÌ SAO CẦN SCRIPT NÀY: mỗi bài của Thời Đại chia thành 2-3 PHẦN (quyển 1: 對話一 · 對話二 ·
短文; quyển 2-5: 對話 · 短文), và ta chia bài con theo đúng ranh giới đó (xem md/nguon-du-lieu-
thoi-dai.md mục 9). Nhưng PPT bài giảng xếp slide không thống nhất giữa các quyển nên KHÔNG
suy được ranh giới từ PPT.

Nguồn ranh giới đáng tin: BẢN THU 生詞. Mỗi phần có một file 生詞 riêng, và người đọc đọc
"生詞：一、<từ>… 二、<từ>…" — tức TỪ ĐẦU TIÊN của mỗi phần nghe được ngay trong 40 giây đầu.
Chỉ cần từ đầu của phần 2 (và phần 3) là cắt được danh sách từ vựng của cả bài.

Vì vậy chỉ nhận dạng 40 GIÂY ĐẦU mỗi file 生詞 — rẻ hơn nhận dạng cả file hàng trăm lần.

Đầu ra: scripts/data-cache/thoidai/ranh-gioi.json
    { "b2-l01": { "so_phan": 2, "mo_dau": [["起來",...], ["害羞",...]] } }
`mo_dau` = mấy chữ đầu nghe được của từng phần, để gen-thoidai-vocab.mjs dò vị trí cắt.
"""
import argparse, json, os, re, subprocess, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / 'scripts' / 'data-cache' / 'thoidai'
AUDIO = CACHE / 'audio'
MODEL = os.environ.get('WHISPER_MODEL', str(ROOT / 'scripts' / 'data-cache' / 'whisper' / 'medium.bin'))
TMP = Path(os.environ.get('TMPDIR', '/tmp')) / 'td-asr'

# Thư mục Drive công khai chứa audio từng quyển (trang 音檔 của sites.google.com/clc.tku.edu.tw/
# modernchinese-official). TÊN thư mục không ghi số quyển và thứ tự trên trang KHÔNG theo thứ tự
# quyển — bảng này đã đối chiếu bằng TÊN FILE bên trong (B3-*.mp3, B4-*.mp3...).
FOLDER = {
    1: '1CVddKzozDowy0q7GpTdtKibkrLn4EsV1',
    2: '1403LNSgSM32XSJn8-a-XmUyFEKGKH9AT',
    3: '1n0fdZ3K3sIYRyUXxvc87NnPmdaKyv4Fd',
    4: '1Ip69F_ra4zU-yBiMmTNmlnlvjLMuMdLi',
    5: '1p5WtReZuLor0aXWerhW_v0TFXFidN23G',
}
UA = {'User-Agent': 'Mozilla/5.0'}

try:
    import opencc
    CC = opencc.OpenCC('s2twp')       # Whisper luôn trả GIẢN THỂ; sách là phồn thể Đài Loan
except Exception:
    CC = None


def ls_drive(fid):
    """Liệt kê 1 thư mục Drive công khai -> [(id, tên, 'DIR'|'FILE')]."""
    u = f'https://drive.google.com/embeddedfolderview?id={fid}#list'
    h = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=90).read().decode('utf8', 'ignore')
    items = re.findall(r'id="entry-([\w-]{20,})".*?flip-entry-title">([^<]*)<', h, re.S)
    dirs = set(re.findall(r'drive/folders/([\w-]{20,})', h))
    return [(i, t.strip(), 'DIR' if i in dirs else 'FILE') for i, t in items]


def quet_mp3(fid, sau=0):
    """Duyệt đệ quy 1 thư mục, trả về {tên file mp3: id}. Bỏ qua nhánh bài nghe workbook."""
    ra = {}
    for i, t, k in ls_drive(fid):
        if k == 'FILE':
            if t.lower().endswith('.mp3'):
                ra[t] = i
        elif sau < 5 and not re.search(r'聽力測驗|Listening', t, re.I):
            ra.update(quet_mp3(i, sau + 1))
    return ra


def ban_do_audio(quyen, lam_moi=False):
    """{'B2-01-1-2.mp3': '<drive id>'} — lưu cache vì quét Drive khá chậm."""
    f = CACHE / f'audio-map-q{quyen}.json'
    if f.exists() and not lam_moi:
        return json.loads(f.read_text('utf8'))
    print(f'🔎 Quét thư mục audio quyển {quyen} trên Drive…', flush=True)
    m = quet_mp3(FOLDER[quyen])
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(json.dumps(m, ensure_ascii=False, indent=1), 'utf8')
    print(f'   {len(m)} file mp3', flush=True)
    return m


def tai(fid, dich: Path):
    if dich.exists() and dich.stat().st_size > 20000:
        return dich
    dich.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(['curl', '-sL', '--max-time', '600', '-A', 'Mozilla/5.0',
                    f'https://drive.google.com/uc?export=download&id={fid}&confirm=t',
                    '-o', str(dich)], check=False)
    return dich


def nhan_dang(mp3: Path, giay=14, bs='1'):
    """Nhận dạng `giay` giây đầu -> chuỗi chữ Hán phồn thể (đã bỏ dấu câu)."""
    TMP.mkdir(parents=True, exist_ok=True)
    wav = TMP / (mp3.stem + '.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-i', str(mp3), '-t', str(giay),
                    '-ar', '16000', '-ac', '1', str(wav), '-y'], check=False)
    if not wav.exists():
        return ''
    # -bs 1 (beam search 1) nhanh gấp ~2 lần mà vẫn nghe đúng mấy chữ đầu — ta chỉ cần TỪ ĐẦU
    # của mỗi phần, không cần bản ghi chính xác cả file.
    r = subprocess.run(['whisper-cli', '-m', MODEL, '-f', str(wav), '-l', 'zh', '-nt', '-bs', str(bs)],
                       capture_output=True, text=True)
    wav.unlink(missing_ok=True)
    txt = re.sub(r'\s+', '', r.stdout)
    if CC:
        txt = CC.convert(txt)
    return txt


# Người đọc đánh số từ vựng bằng chữ Hán: 一、二、三… Cắt lấy đoạn NGAY SAU số "一" đầu tiên,
# đó là chỗ chứa từ đầu tiên của phần (kèm luôn câu ví dụ phía sau — không sao, bên mjs chỉ
# dò tiền tố).
def mo_dau_tu(txt):
    # Whisper nghe "生詞" ra đủ kiểu (聲詞/生辭/生词) và số thứ tự khi thì "一、" khi thì "1." —
    # nên chỉ cắt phần đầu rồi trả về NGUYÊN đoạn chữ Hán, để bên mjs tự dò từ nào khớp.
    t = re.sub(r'^.*?(生詞|生辭|生词|聲詞|聲辭|新詞)', '', txt) or txt
    t = re.sub(r'^[^一-鿿]+', '', t)
    t = re.sub(r'^[一二三四五六七八九十]{1,2}[、,，.。]', '', t)
    return t[:26].strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--quyen', default='1,2,3,4,5')
    ap.add_argument('--bai', default='')
    ap.add_argument('--lam-moi-map', action='store_true')
    # Bài nào dò không ra ranh giới thì quét lại với --giay 25 --bs 5 (chậm hơn, nghe kỹ hơn).
    ap.add_argument('--giay', type=int, default=14)
    ap.add_argument('--bs', default='1')
    ap.add_argument('--lam-lai', action='store_true', help='quét lại cả bài đã có')
    a = ap.parse_args()
    quyens = [int(x) for x in a.quyen.split(',') if x.strip()]
    chi_bai = {int(x) for x in a.bai.split(',') if x.strip()} if a.bai else None

    for q in quyens:
        f_out = CACHE / f'ranh-gioi-q{q}.json'
        ra = json.loads(f_out.read_text('utf8')) if f_out.exists() else {}
        m = ban_do_audio(q, a.lam_moi_map)
        # gom theo bài: 'B2-01-1-2.mp3' -> bài 1, phần 1, mục 2 (mục 2 = 生詞)
        theo_bai = {}
        for ten, fid in m.items():
            g = re.match(r'B(\d)-(\d+)-(\d+)-(\d+)\.mp3$', ten)
            if not g or int(g.group(1)) != q:
                continue
            bai, phan, muc = int(g.group(2)), int(g.group(3)), int(g.group(4))
            if muc != 2:            # chỉ lấy bản thu 生詞
                continue
            theo_bai.setdefault(bai, []).append((phan, ten, fid))
        for bai in sorted(theo_bai):
            if chi_bai and bai not in chi_bai:
                continue
            key = f'b{q}-l{bai:02d}'
            phans = sorted(theo_bai[bai])
            if not a.lam_lai and ra.get(key, {}).get('so_phan') == len(phans) and len(ra[key].get('mo_dau', [])) == len(phans):
                continue                                   # đã có, bỏ qua (chạy lại được)
            mo = []
            for phan, ten, fid in phans:
                p = tai(fid, AUDIO / f'q{q}' / ten)
                txt = nhan_dang(p, a.giay, a.bs)
                mo.append(mo_dau_tu(txt))
                print(f'   {key} phần {phan}: {mo[-1][:20]}', flush=True)
            ra[key] = {'so_phan': len(phans), 'mo_dau': mo}
            f_out.write_text(json.dumps(ra, ensure_ascii=False, indent=1), 'utf8')   # ghi sau MỖI bài
        print(f'✅ Quyển {q}: {len(ra)} bài có ranh giới -> {f_out.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
