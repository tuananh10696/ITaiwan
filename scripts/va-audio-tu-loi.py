#!/usr/bin/env python3
"""
VÁ những mp3 TỪ VỰNG bị cắt hỏng — 2026-09-10

    scripts/.venv/bin/python scripts/va-audio-tu-loi.py            # vá thật
    ... --xem                                                      # chỉ liệt kê, không đụng file

VÌ SAO CÓ SCRIPT NÀY: hai bộ cắt audio từ bản thu (`gen-thoidai-audio.py`, `gen-hsk-audio-tu.mjs`)
KHÔNG kiểm lại clip sau khi cắt. Mốc Whisper lệch một nhịp là `silenceremove` xoá gần hết tiếng,
để lại file 0,07s hoặc file mp3 hỏng hẳn — mà app phát "thành công" nên KHÔNG rơi xuống nguồn
dự phòng: học viên bấm loa, không nghe gì, không có lỗi nào hiện ra.
Quét 2026-09-10 tìm được 26 file như vậy (23 Thời Đại + 3 HSK).

CÁCH VÁ: chạy lại Whisper trên bản thu gốc -> khớp CHÍNH XÁC chữ Hán -> cắt lại bằng công thức
giữ nhiều hơn -> **Whisper nghe lại chính clip vừa cắt** và chỉ giữ khi đọc đúng chữ đó.
Bước xác minh cuối là thứ phân biệt script này với hai bộ cắt gốc: thà bỏ trống còn hơn để lại
một clip câm hoặc clip đọc nhầm từ khác.

Từ nào vá không được thì XOÁ file lỗi -> app tự rơi xuống mp3 giọng máy (`audioTts`).
"""
import argparse, json, os, re, subprocess, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TD_CACHE = ROOT / 'scripts' / 'data-cache' / 'thoidai'
TD_AUDIO_IN = TD_CACHE / 'audio'
TD_OUT = ROOT / 'public' / 'audio' / 'thoidai-tu'
HSK_MAP = ROOT / 'scripts' / 'data-cache' / 'hsk' / 'audio-tu-map.json'
HSK_AUDIO_IN = ROOT / 'public' / 'audio' / 'hsk'
HSK_OUT = ROOT / 'public' / 'audio' / 'hsk-tu'
MODEL = os.environ.get('WHISPER_MODEL', str(ROOT / 'scripts' / 'data-cache' / 'whisper' / 'medium.bin'))
MODEL_NHO = str(ROOT / 'scripts' / 'data-cache' / 'whisper' / 'small.bin')
NHAN_DANG_CACHE = ROOT / 'scripts' / 'data-cache' / 'va-audio-nhan-dang.json'
TMP = Path('/tmp') / 'va-audio-tu'

# Clip ngắn hơn ngưỡng này coi như cắt hụt. 0,30s là mức thấp nhất một âm tiết tiếng Trung đọc
# rõ có thể chiếm; dưới nữa thì chỉ còn đuôi âm hoặc tiếng gió.
NGAN_NHAT = 0.30

import opencc
from pypinyin import pinyin, Style

CC = opencc.OpenCC('s2twp')     # Whisper luôn trả giản thể; dữ liệu dự án là phồn thể
CC_S = opencc.OpenCC('t2s')     # để so hai chiều, tránh trượt vì biến thể chữ

SO_HAN = '一二三四五六七八九十'


def chuan(s):
    """Bỏ ngoặc chú thích, khoảng trắng, dấu câu — chỉ giữ phần chữ để so khớp."""
    s = re.sub(r'（.*?）|\(.*?\)', '', str(s or ''))
    return re.sub(r'[\s。，、？！,.?!·／/]', '', s)


def cung_chu(a, b):
    """So hai chuỗi Hán, chấp nhận lệch phồn/giản (Whisper trả giản thể)."""
    a, b = chuan(a), chuan(b)
    if not a or not b:
        return False
    return a == b or CC_S.convert(a) == CC_S.convert(b) or CC.convert(a) == CC.convert(b)


def am_co_the(s, thanh=True):
    """Tập hợp mọi cách đọc có thể của chuỗi Hán.

    Dùng `heteronym=True` vì rất nhiều chữ đa âm: 調 đọc cả diào lẫn tiáo, nên nếu chỉ lấy âm
    phổ biến nhất thì clip 條 tiáo bị Whisper nghe ra "調" sẽ trượt — đúng ca bỏ oan gặp ở lượt
    chạy 2026-09-10. Ghép các âm-tiết theo tích Descartes, giới hạn 4 âm tiết để khỏi bùng nổ.
    """
    c = chuan(s)
    if not c:
        return set()
    kieu = Style.TONE3 if thanh else Style.NORMAL
    tung_chu = pinyin(c, style=kieu, heteronym=True, errors='ignore')
    if not tung_chu or len(tung_chu) > 4:
        return set()
    ra = {''}
    for cac_am in tung_chu:
        ra = {t + a.lower() for t in ra for a in cac_am}
    return ra


def _bo_dau_latin(s):
    """'Líng' / 'lǐng' -> 'ling'. Whisper thỉnh thoảng trả thẳng pinyin thay vì chữ Hán."""
    s = unicodedata.normalize('NFD', str(s or '').lower())
    s = ''.join(ch for ch in s if not unicodedata.combining(ch))
    return re.sub(r'[^a-z]', '', s)


def khop_khi_nghe_lai(doc, tu):
    """Clip vừa cắt có đọc đúng từ đó không?

    ⚠️ So theo ÂM, KHÔNG so cứng theo chữ. Bước này chạy model NHỎ trên một clip dài đúng một
    từ — không có ngữ cảnh nào để model chọn đúng mặt chữ giữa đám đồng âm, nên 零 líng nghe ra
    "靈", 條 tiáo nghe ra "調", 馬 mǎ nghe ra "嗎", và đôi khi model trả thẳng pinyin Latin
    ("Ling") thay vì chữ Hán. So cứng chữ thì bỏ oan chính những clip đã cắt đúng — lượt chạy
    đầu 2026-09-10 loại cả 零 lẫn 條 vì lý do này.

    Nới tới mức bỏ cả thanh điệu là có chủ ý: MỐC đã do model medium khớp CHÍNH XÁC chữ Hán ở
    bước trước, nên ở đây ta chỉ đang hỏi "clip có ra tiếng, và có phải tiếng ấy không", chứ
    không phải chọn mặt chữ. Rủi ro nhận nhầm còn lại rất nhỏ, đổi lại không vứt oan clip tốt.
    """
    if cung_chu(doc, tu):
        return True
    if am_co_the(doc) & am_co_the(tu):                    # trùng một cách đọc, kể cả thanh
        return True
    if am_co_the(doc, False) & am_co_the(tu, False):      # trùng âm, bỏ qua thanh
        return True
    lat = _bo_dau_latin(doc)                              # model trả pinyin Latin
    return bool(lat) and lat in am_co_the(tu, False)


def do_dai(f: Path):
    """Thời lượng clip. Trả None khi file hỏng — đó cũng là một dạng lỗi cần vá."""
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                        '-of', 'csv=p=0', str(f)], capture_output=True, text=True)
    try:
        return float(r.stdout.strip())
    except ValueError:
        return None


def muc_am(f: Path):
    """Âm lượng trung bình (dB). None khi không đọc được."""
    r = subprocess.run(['ffmpeg', '-nostdin', '-hide_banner', '-nostats', '-i', str(f),
                        '-af', 'volumedetect', '-f', 'null', '-'],
                       capture_output=True, text=True)
    m = re.search(r'mean_volume:\s*(-?[\d.]+) dB', r.stderr)
    return float(m.group(1)) if m else None


def nhan_dang(mp3: Path, model=MODEL):
    """Whisper -> [(chữ, start, end)]. Kết quả CÓ CACHE: bản thu 生詞 dài 3 phút, chạy lại
    model medium mất ~7 phút mỗi file — không cache thì vá vài từ cùng một bài là chạy lại
    từng ấy lần."""
    khoa = f'{mp3.name}|{Path(model).stem}'
    cache = json.loads(NHAN_DANG_CACHE.read_text('utf8')) if NHAN_DANG_CACHE.exists() else {}
    if khoa in cache:
        return [tuple(x) for x in cache[khoa]]
    TMP.mkdir(parents=True, exist_ok=True)
    wav, ra = TMP / f'{mp3.stem}.wav', TMP / mp3.stem
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(mp3),
                    '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', str(wav)], check=True)
    subprocess.run(['whisper-cli', '-m', model, '-l', 'zh', '-t', '4', '-ml', '10', '-sow',
                    '-oj', '-of', str(ra), str(wav)], check=True, capture_output=True)
    j = json.loads((ra.with_suffix('.json')).read_text('utf8'))
    segs = [(CC.convert(s['text'].strip()), s['offsets']['from'] / 1000, s['offsets']['to'] / 1000)
            for s in j.get('transcription', [])]
    for f in (wav, ra.with_suffix('.json')):
        f.unlink(missing_ok=True)
    cache[khoa] = [list(x) for x in segs]
    NHAN_DANG_CACHE.write_text(json.dumps(cache, ensure_ascii=False), 'utf8')
    return segs


def cat(src: Path, start, end, dich: Path, giu_nhieu=False):
    """Cắt clip. `giu_nhieu` hạ ngưỡng silenceremove để không xoá mất âm mở đầu nhẹ
    (thanh 3 như 馬 mǎ, phụ âm hơi như 撥 bō) — chính chỗ bộ cắt cũ làm rỗng file."""
    dur = max(0.35, min(end - start, 8.0))
    nguong, lang = ('-55dB', '0.08') if giu_nhieu else ('-45dB', '0.05')
    af = (f'silenceremove=start_periods=1:start_silence={lang}:start_threshold={nguong}:'
          f'detection=peak,areverse,silenceremove=start_periods=1:start_silence={lang}:'
          f'start_threshold={nguong}:detection=peak,areverse')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{max(0, start - 0.12):.2f}',
                    '-t', f'{dur + 0.25:.2f}', '-i', str(src), '-af', af,
                    '-ac', '1', '-ar', '22050', '-b:a', '32k', str(dich)], check=True)


def nghe_lai(clip: Path):
    """Whisper nghe lại chính clip vừa cắt. Model NHỎ là đủ và nhanh (clip dưới 2 giây):
    ta chỉ cần biết nó có đọc đúng chữ đó không, không cần phiên âm cả câu."""
    TMP.mkdir(parents=True, exist_ok=True)
    wav = TMP / f'kiem-{clip.stem}.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(clip),
                    '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', str(wav)], check=True)
    r = subprocess.run(['whisper-cli', '-m', MODEL_NHO, '-l', 'zh', '-t', '4', '-nt', str(wav)],
                       capture_output=True, text=True)
    wav.unlink(missing_ok=True)
    return CC.convert(re.sub(r'\s+', '', r.stdout))


def tim_moc(segs, tu):
    """Mốc của `tu` trong danh sách segment. Bỏ segment chỉ là số thứ tự người đọc xướng lên."""
    for t, a, b in segs:
        if chuan(t) in SO_HAN:
            continue
        if cung_chu(t, tu):
            return a, b
        # segment dính số thứ tự phía trước ("一大家") — bỏ phần đọc số theo tỉ lệ ký tự
        du = chuan(t).lstrip(SO_HAN + '0123456789.、,， ')
        if du and cung_chu(du, tu) and len(chuan(t)) > len(du):
            bo = (len(chuan(t)) - len(du)) / max(1, len(chuan(t)))
            return a + (b - a) * bo, b
    return None


def gom_loi():
    """Dò mọi clip hỏng hoặc cắt hụt, kèm chữ Hán mong đợi + bản thu gốc."""
    ra = []
    # --- Thời Đại ---
    for q in range(1, 6):
        f_map = TD_CACHE / f'audio-tu-q{q}.json'
        if not f_map.exists():
            continue
        for khoa, ten in json.loads(f_map.read_text('utf8')).items():
            clip = TD_OUT / ten
            if not clip.exists():
                continue
            d = do_dai(clip)
            if d is not None and d >= NGAN_NHAT:
                continue
            tu, baicon = khoa.split('|', 1)
            g = re.match(r'td(\d+)-(\d+)\.(\d+)$', baicon)
            if not g:
                continue
            src = TD_AUDIO_IN / f'q{q}' / f'B{q}-{int(g.group(2)):02d}-{g.group(3)}-2.mp3'
            ra.append(dict(bo='thoidai', tu=tu, clip=clip, src=src, map=f_map, khoa=khoa,
                           dai=d, meta=baicon))
    # --- HSK ---
    if HSK_MAP.exists():
        for tu, ten in json.loads(HSK_MAP.read_text('utf8')).items():
            clip = HSK_OUT / ten
            if not clip.exists():
                continue
            d = do_dai(clip)
            if d is not None and d >= NGAN_NHAT:
                continue
            track = re.sub(r'-\d+\.mp3$', '.mp3', ten)
            ra.append(dict(bo='hsk', tu=tu, clip=clip, src=HSK_AUDIO_IN / track,
                           map=HSK_MAP, khoa=tu, dai=d, meta=track))
    return ra


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--xem', action='store_true', help='chỉ liệt kê, không đụng file')
    a = ap.parse_args()

    loi = gom_loi()
    print(f'Tìm thấy {len(loi)} clip hỏng / cắt hụt (< {NGAN_NHAT}s)\n')
    for x in loi:
        d = 'HỎNG' if x['dai'] is None else f"{x['dai']:.2f}s"
        print(f"  {x['clip'].name:26s} {d:>7s}  {x['tu']:6s}  <- {x['src'].name}"
              f"{'' if x['src'].exists() else '   ⚠ KHÔNG có bản thu gốc'}")
    if a.xem:
        return

    va_duoc, that_bai, can_ra = [], [], []
    for i, x in enumerate(loi, 1):
        print(f"\n[{i}/{len(loi)}] {x['tu']} ({x['clip'].name})", flush=True)
        if not x['src'].exists():
            print('   ✗ không có bản thu gốc'); that_bai.append(x); continue
        try:
            segs = nhan_dang(x['src'])
        except subprocess.CalledProcessError as e:
            print(f'   ✗ whisper lỗi: {e}'); that_bai.append(x); continue
        moc = tim_moc(segs, x['tu'])
        if not moc:
            print('   ✗ không tìm thấy từ trong bản thu'); that_bai.append(x); continue
        s, e = moc
        print(f'   mốc {s:.2f}-{e:.2f}s', flush=True)
        # Thử lần lượt: giữ nhiều -> công thức cũ. Lấy phương án ĐẦU TIÊN vừa đủ dài
        # vừa được Whisper xác nhận đọc đúng chữ.
        xong = False
        for giu in (True, False):
            tam = TMP / f'thu-{x["clip"].stem}.mp3'
            TMP.mkdir(parents=True, exist_ok=True)
            try:
                cat(x['src'], s, e, tam, giu_nhieu=giu)
            except subprocess.CalledProcessError:
                continue
            d = do_dai(tam)
            if d is None or d < NGAN_NHAT:
                print(f'   · cắt ra {"hỏng" if d is None else f"{d:.2f}s"} — thử cách khác')
                continue
            doc = nghe_lai(tam)
            if khop_khi_nghe_lai(doc, x['tu']):
                tam.replace(x['clip'])
                print(f'   ✓ vá xong: {d:.2f}s, nghe lại đúng "{doc}"')
                va_duoc.append(x); xong = True
                break
            # Nghe lại KHÔNG khớp nhưng clip đủ dài và đủ to thì VẪN NHẬN, chỉ ghi cảnh báo.
            # Lý do: model nghe một clip đơn âm dài dưới một giây, không có ngữ cảnh, sai là
            # chuyện thường — clip 魚 yú của B1L14-2-12 cho ra "嗯?" ở CẢ small lẫn medium, dù
            # nghe cửa sổ 3 giây quanh nó thì medium đọc đúng "鱼" và mức âm đo được -8,9 dB
            # (tiếng rất rõ). Loại những ca này là vứt đúng bản thu thật ta đang cố cứu.
            # MỐC đã do medium khớp CHÍNH XÁC chữ Hán ở bước trước, nên rủi ro gán nhầm thấp;
            # thứ ta thật sự phải chặn — clip câm — đã bị hai phép đo dưới đây loại rồi.
            am = muc_am(tam)
            if am is not None and am > -35:
                tam.replace(x['clip'])
                print(f'   ⚠ nhận: {d:.2f}s, {am:.1f} dB — nhưng nghe lại ra "{doc}" ≠ "{x["tu"]}"'
                      ' (clip có tiếng rõ; rà tay nếu cần)')
                va_duoc.append(x); can_ra.append(x); xong = True
                break
            print(f'   · nghe lại ra "{doc}" ≠ "{x["tu"]}" và chỉ {am if am is None else round(am, 1)} dB — bỏ')
            continue
        if not xong:
            that_bai.append(x)

    # Clip không vá được thì XOÁ, và gỡ khỏi map — để app rơi xuống mp3 giọng máy.
    # Giữ lại một file câm là giữ lại đúng cái lỗi ban đầu: bấm loa mà không nghe gì.
    for x in that_bai:
        x['clip'].unlink(missing_ok=True)
        m = json.loads(x['map'].read_text('utf8'))
        m.pop(x['khoa'], None)
        x['map'].write_text(json.dumps(m, ensure_ascii=False, indent=1), 'utf8')

    print(f'\n{"="*60}\n✅ Vá được audio thật: {len(va_duoc)}/{len(loi)}')
    if can_ra:
        print(f'⚠️  {len(can_ra)} clip nhận theo mức âm (nghe lại không khớp chữ) — '
              + ', '.join(x['tu'] for x in can_ra))
    if that_bai:
        print(f'🗑  Xoá (rơi về giọng máy): {len(that_bai)} — {", ".join(x["tu"] for x in that_bai)}')
        print('   Chạy `npm run tts:tuvung` cho bộ tương ứng để chắc chắn có mp3 dự phòng.')


if __name__ == '__main__':
    main()
