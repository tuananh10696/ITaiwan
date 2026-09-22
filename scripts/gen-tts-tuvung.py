#!/usr/bin/env python3
"""
GIỌNG TTS CHẤT LƯỢNG CAO cho những từ CHƯA có bản thu gốc của sách — 2026-09-06

    scripts/.venv/bin/python scripts/gen-tts-tuvung.py --bo thoidai
    ... --bo duongdai --quyen 2,3        (mặc định: mọi quyển của bộ đã chọn)
    ... --bo hsk                         (đọc public/data/hsk/, giọng ĐẠI LỤC zh-CN)

VÌ SAO CÓ SCRIPT NÀY: cắt từ bản thu gốc (gen-thoidai-audio.py) mới phủ ~78% số từ; phần còn lại
whisper nghe không chắc nên script cố ý bỏ qua, và app rơi về Web Speech API — giọng máy của
trình duyệt, mỗi máy một kiểu, nhiều máy nghe rất tệ (xem CLAUDE.md 4.12).

Ở đây sinh sẵn mp3 bằng **Edge TTS, giọng zh-TW-HsiaoChenNeural** (nữ, Đài Loan). Đây ĐÚNG là
thứ mà zh.taiwandiary.vn dùng cho nút loa của họ (chính chú thích trong mã trang ghi vậy) — nên
thay vì tải file của trang đó, ta tự sinh: phủ được 100% số từ chứ không phụ thuộc kho của họ.
Đã đo: trong 40 từ Thời Đại còn thiếu, KHÔNG từ nào có sẵn mp3 bên đó (trang trả HTML 1,2 MB kèm
mã 200 cho file không tồn tại — đừng tin mã 200, phải xét content-type).

⚠️ Đây là GIỌNG MÁY chất lượng cao, KHÔNG phải giọng thu của sách. Thứ tự ưu tiên khi phát:
   bản thu gốc (`audio`) -> mp3 Edge TTS (`audioTts`) -> Web Speech API.
Muốn tăng tỉ lệ giọng thật thì chạy lại gen-thoidai-audio.py bằng model medium để vét thêm.

Ra:  public/audio/tts-vi/<md5 8 ký tự>.mp3   (tên băm để tránh rắc rối tên file chữ Hán trên URL)
     scripts/data-cache/tts-tuvung-map.json  ("<chữ Hán>" -> tên file)
"""
import argparse, asyncio, hashlib, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'audio' / 'tts-vi'
MAP = ROOT / 'scripts' / 'data-cache' / 'tts-tuvung-map.json'
# Giọng nữ mặc định theo bộ. HSK là chuẩn ĐẠI LỤC nên phải dùng giọng zh-CN — phát giọng Đài
# Loan cho đề thi HSK là dạy sai trọng âm/từ vựng vùng miền cho học viên đang luyện thi.
GIONG_THEO_BO = {
    'thoidai': 'zh-TW-HsiaoChenNeural',
    'duongdai': 'zh-TW-HsiaoChenNeural',
    'hsk': 'zh-CN-XiaoxiaoNeural',
    # TOCFL là kỳ thi của Đài Loan -> giọng zh-TW, giống hai bộ giáo trình phồn thể.
    'tocfl': 'zh-TW-HsiaoChenNeural',
}
# Bản đồ riêng cho từng bộ giọng. Dùng chung một file map là hai giọng ghi đè nhau mà không
# báo gì (cùng chữ Hán -> cùng mã băm), đúng cái bẫy "mỗi quyển một file map" đã ghi ở 4.27.
# Bộ tocfl tuy CÙNG giọng zh-TW (nên dùng chung được file mp3 đã sinh, tiết kiệm hẳn vài trăm
# file) nhưng vẫn giữ map RIÊNG, để chạy lại bộ này không đụng map của hai bộ giáo trình.
MAP_THEO_BO = {
    'hsk': ROOT / 'scripts' / 'data-cache' / 'hsk' / 'tts-map.json',
    'tocfl': ROOT / 'scripts' / 'data-cache' / 'tocfl' / 'tts-map.json',
}

# TỐC ĐỘ ĐỌC. Trước 2026-09-10 script KHÔNG truyền `rate` nên Edge TTS đọc ở nhịp hội thoại
# mặc định — đo trên 60 từ 2 âm tiết có CẢ bản thu thật lẫn mp3 máy: phần tiếng nói thuần (đã
# bỏ khoảng lặng hai đầu) là 0,56s giọng máy so với 0,99s bản thu thật, tức máy đọc NHANH HƠN
# 44%. Người học từ mới nghe không kịp — chủ dự án báo lỗi này 2026-09-10.
#
# -35% đưa từ 2 âm tiết về ~0,88s, chỉ còn nhanh hơn bản thu thật 11% — sát nhịp người đọc thật
# nhất trong bốn mức đã dựng mẫu (+0% / -15% / -25% / -35%) mà vẫn chưa lê thê.
# ⚠️ Đổi giá trị này là đổi luôn TÊN FILE (xem `ten_file`), nên phải sinh lại cả bộ VÀ cập nhật
# trường `audioTts` trong dữ liệu. Đừng đổi chỉ để thử một từ.
TOC_DO = '-35%'

import edge_tts


def ten_file(tu: str, giong: str, toc_do: str = TOC_DO) -> str:
    """Tên băm md5, có TỐC ĐỘ nằm trong khoá băm.

    Vì sao tốc độ phải vào tên file: `vercel.json` cho `/audio/*` cache 30 ngày, nên ghi đè file
    CÙNG TÊN thì người đã mở app vẫn nghe bản cũ (nhanh) suốt một tháng — sửa xong mà người dùng
    không thấy gì đổi. Tên mới là cách cache-bust chắc chắn duy nhất ở đây.

    `+0%` giữ NGUYÊN cách băm cũ (chỉ theo từ, hoặc giọng|từ) để tra được mọi tên file sinh
    trước 2026-09-10 — cần cho bước dò và dọn file mồ côi."""
    goc = tu if giong == 'zh-TW-HsiaoChenNeural' else f'{giong}|{tu}'
    khoa = goc if toc_do in ('+0%', '', None) else f'{goc}|{toc_do}'
    return hashlib.md5(khoa.encode('utf-8')).hexdigest()[:10] + '.mp3'


def doc_tu_hsk(tat_ca=False):
    """Từ vựng HSK chưa có bản thu gốc. Đọc thẳng public/data/hsk/ — bộ này không có file
    src/data/<bo>Vocab<N>.js như hai bộ giáo trình kia (11.092 từ nên tách JSON theo bài, 4.32).

    ⚠️ Mỗi file là object `{v, g, d, w}` (từ vựng / ngữ pháp / hội thoại / luyện viết), KHÔNG
    phải mảng từ. Bản trước duyệt thẳng `json.loads(...)` nên lặp qua các KHOÁ của object và
    chết ở `'str' object has no attribute 'get'` — tức `--bo hsk` đã hỏng từ lúc dữ liệu HSK
    được tách theo bài (4.32), phát hiện 2026-09-10.
    """
    ra = []
    for f in sorted((ROOT / 'public' / 'data' / 'hsk').glob('hsk*-*.json')):
        for w in json.loads(f.read_text(encoding='utf-8')).get('v', []):
            h = (w.get('hanzi') or '').strip()
            # `tat_ca`: sinh cho MỌI từ đã có trường `audioTts` trong dữ liệu, kể cả từ đã có bản
            # thu thật. Cần khi ĐỔI tốc độ (tức đổi tên file): 501 từ HSK mang cả `audio` lẫn
            # `audioTts`, bỏ qua chúng là `audioTts` của chúng trỏ vào mp3 cũ — mà mp3 cũ sẽ bị
            # dọn đi, thành 404 và app rơi xuống giọng trình duyệt.
            if h and (not w.get('audio') or (tat_ca and w.get('audioTts'))):
                ra.append(h)
    thay = set()
    return [x for x in ra if not (x in thay or thay.add(x))]


def doc_tu_tocfl():
    """Từ vựng TOCFL (華語八千詞) chưa có bản thu gốc. Đọc public/data/tocfl/cap-*.json —
    mỗi file là object {cap, nhan, ..., tu: [...]}, danh sách từ nằm ở khoá 'tu'."""
    ra = []
    for f in sorted((ROOT / 'public' / 'data' / 'tocfl').glob('cap-*.json')):
        for w in json.loads(f.read_text(encoding='utf-8')).get('tu', []):
            h = (w.get('hanzi') or '').strip()
            if h and not w.get('audio'):
                ra.append(h)
    thay = set()
    return [x for x in ra if not (x in thay or thay.add(x))]


def doc_tu(bo: str, quyens, tat_ca=False):
    """Các từ CHƯA có bản thu gốc (`audio`) của bộ giáo trình được chọn.

    Đọc `public/data/giaotrinh/*.json` — dữ liệu RUNTIME mà app thật sự tải (4.32), đã là JSON
    hợp lệ. Bản trước bóc `src/data/<bo>Vocab<N>.js` bằng regex rồi `json.loads`: file JS viết
    key KHÔNG có nháy (`hanzi:`) và dùng nháy đơn, nên với bộ duongdai nó ném JSONDecodeError
    ngay từ quyển 1 — tức `--bo duongdai` CHƯA BAO GIỜ chạy được (phát hiện 2026-09-10). Bộ
    thoidai thoát nạn chỉ vì file đó do script tự sinh, tình cờ hợp lệ JSON.

    Tên file theo bộ: duongdai là `<bài>.json` (quyển 1) và `<quyển>-<bài>.json` (quyển 2-6);
    thoidai là `td<quyển>-<bài>.json`.
    """
    thu_muc = ROOT / 'public' / 'data' / 'giaotrinh'
    ra = []
    for f in sorted(thu_muc.glob('*.json')):
        ten = f.stem
        if bo == 'thoidai':
            g = re.match(r'^td(\d+)-\d+$', ten)
            if not g or int(g.group(1)) not in quyens:
                continue
        else:
            if ten.startswith('td') or ten.startswith('hsk'):
                continue
            g = re.match(r'^(\d+)-\d+$', ten)
            quyen = int(g.group(1)) if g else 1        # không có tiền tố = quyển 1
            if quyen not in quyens:
                continue
        for w in json.loads(f.read_text(encoding='utf-8')).get('v', []):
            h = (w.get('hanzi') or '').strip()
            # `tat_ca`: sinh cho MỌI từ đã có trường `audioTts` trong dữ liệu, kể cả từ đã có bản
            # thu thật. Cần khi ĐỔI tốc độ (tức đổi tên file): 501 từ HSK mang cả `audio` lẫn
            # `audioTts`, bỏ qua chúng là `audioTts` của chúng trỏ vào mp3 cũ — mà mp3 cũ sẽ bị
            # dọn đi, thành 404 và app rơi xuống giọng trình duyệt.
            if h and (not w.get('audio') or (tat_ca and w.get('audioTts'))):
                ra.append(h)
    # bỏ trùng, giữ thứ tự
    thay = set()
    return [x for x in ra if not (x in thay or thay.add(x))]


async def sinh(tu, sem, co_san, giong, toc_do=TOC_DO):
    ten = ten_file(tu, giong, toc_do)
    dich = OUT / ten
    if dich.exists() and dich.stat().st_size > 1000:
        co_san[tu] = ten
        return 'skip'
    async with sem:
        for lan in range(3):
            try:
                await edge_tts.Communicate(tu, giong, rate=toc_do).save(str(dich))
                if dich.stat().st_size > 1000:
                    co_san[tu] = ten
                    return 'ok'
            except Exception:
                await asyncio.sleep(1.5 * (lan + 1))
    return 'loi'


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--bo', default='thoidai', choices=['thoidai', 'duongdai', 'hsk', 'tocfl'])
    ap.add_argument('--giong', default=None, help='ghi đè giọng mặc định của bộ')
    ap.add_argument('--quyen', default='1,2,3,4,5,6')
    ap.add_argument('--tat-ca', action='store_true', dest='tat_ca',
                    help='sinh cho MỌI từ có audioTts, kể cả từ đã có bản thu thật '
                         '(dùng khi đổi tốc độ, vì tên file đổi theo)')
    ap.add_argument('--toc-do', default=TOC_DO, dest='toc_do',
                    help='tốc độ đọc Edge TTS, vd -25%% (mặc định '
                         + TOC_DO.replace('%', '%%') + ')')
    a = ap.parse_args()
    quyens = [int(x) for x in a.quyen.split(',') if x.strip()]
    giong = a.giong or GIONG_THEO_BO[a.bo]
    map_file = MAP_THEO_BO.get(a.bo, MAP)
    OUT.mkdir(parents=True, exist_ok=True)
    map_file.parent.mkdir(parents=True, exist_ok=True)
    co_san = json.loads(map_file.read_text('utf8')) if map_file.exists() else {}

    if a.bo == 'hsk':
        ds = doc_tu_hsk(a.tat_ca)
    elif a.bo == 'tocfl':
        ds = doc_tu_tocfl()
    else:
        ds = doc_tu(a.bo, quyens, a.tat_ca)
    print(f'📖 {a.bo}: {len(ds)} từ chưa có bản thu gốc · giọng {giong} · tốc độ {a.toc_do}')
    sem = asyncio.Semaphore(8)          # 8 kết nối song song là đủ nhanh mà không bị chặn
    dem = {'ok': 0, 'skip': 0, 'loi': 0}
    lot = 60
    for i in range(0, len(ds), lot):
        phan = ds[i:i + lot]
        kq = await asyncio.gather(*[sinh(t, sem, co_san, giong, a.toc_do) for t in phan])
        for k in kq:
            dem[k] += 1
        map_file.write_text(json.dumps(co_san, ensure_ascii=False, indent=1), 'utf8')   # ghi sau MỖI lô
        print(f'   {min(i + lot, len(ds))}/{len(ds)} · mới {dem["ok"]} · có sẵn {dem["skip"]} · lỗi {dem["loi"]}', flush=True)
    print(f'\n✅ {len(co_san)} từ có mp3 TTS -> {OUT.relative_to(ROOT)} · map: {map_file.relative_to(ROOT)}')
    if dem['loi']:
        print(f'   ⚠️  {dem["loi"]} từ sinh hỏng (mạng?) — chạy lại script là làm tiếp, từ đã có sẽ bỏ qua.')


asyncio.run(main())
