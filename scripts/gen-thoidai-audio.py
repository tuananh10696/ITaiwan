#!/usr/bin/env python3
"""
AUDIO GỐC CHO TỪNG TỪ VỰNG — Giáo trình Thời Đại (時代華語), 2026-09-06

    scripts/.venv/bin/python scripts/gen-thoidai-audio.py --quyen 1
    ... --quyen 1,2,3,4,5 --bai 3,7

Thay giọng máy (TTS) bằng BẢN THU THẬT của sách. Mỗi phần của mỗi bài có một file 生詞 riêng
(B2-05-1-2.mp3), người đọc đọc theo mẫu:  "生詞。一、<từ>。<câu ví dụ>。二、<từ>。…"

KHÁC ĐƯƠNG ĐẠI: bên đó có sẵn `audio.tsv` cho mốc thời gian từng từ (4.26f); ở đây KHÔNG có bảng
nào cả, phải tự dò. Cách làm:
  1. whisper.cpp với `-ml 10 -sow` -> tách rất nhỏ, mỗi từ thành MỘT segment riêng kèm mốc
     ("一" / "新" / "二" / "同學" / "他是新同學"). Đây là mấu chốt: chạy whisper mặc định thì cả
     mục dồn vào một segment dài, không cắt theo từ được.
  2. OpenCC s2twp: Whisper luôn trả giản thể, từ vựng trong sách là phồn thể.
  3. Khớp THEO THỨ TỰ với danh sách từ của đúng bài con đó (thoidaiVocab + thoidaiRange), mỗi từ
     lấy segment KHỚP ĐẦU TIÊN sau từ trước — không nhảy lung tung, không đoán.
  4. ffmpeg cắt + `silenceremove` bỏ khoảng lặng hai đầu (mốc của Whisper rộng hơn tiếng nói thật).

Từ nào không khớp thì BỎ QUA (không cắt) -> app tự rơi về TTS, đúng cơ chế `ddSpeakWord`.
Không đoán vị trí, vì cắt sai là học viên nghe một từ khác hẳn.

Ra:  public/audio/thoidai-tu/B<q>L<bài>-<phần>-<số thứ tự>.mp3
     scripts/data-cache/thoidai/audio-tu-co-san.json   (map "chữ Hán|bài con" -> tên file)
"""
import argparse, json, os, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / 'scripts' / 'data-cache' / 'thoidai'
AUDIO_IN = CACHE / 'audio'
AUDIO_OUT = ROOT / 'public' / 'audio' / 'thoidai-tu'
# Model mặc định là medium (chính xác nhất). Cả bộ 175 file mất nhiều giờ, nên khi cần nhanh
# có thể chạy `WHISPER_MODEL=…/small.bin` — chất lượng khớp thấp hơn, script sẽ tự bỏ những từ
# không khớp chắc chắn nên KHÔNG có chuyện cắt nhầm, chỉ là ít từ có audio hơn.
MODEL = os.environ.get('WHISPER_MODEL', str(ROOT / 'scripts' / 'data-cache' / 'whisper' / 'medium.bin'))
TMP = Path('/tmp') / 'td-tu'

import opencc
CC = opencc.OpenCC('s2twp')

SO_HAN = '一二三四五六七八九十'


def chuan(s):
    """Bỏ ngoặc chú thích + khoảng trắng + dấu câu để so khớp."""
    s = re.sub(r'（.*?）|\(.*?\)', '', str(s or ''))
    return re.sub(r'[\s。，、？！,.?!·／/]', '', s)


def doc_vocab(q):
    """{'td1-5.2': [chữ Hán, ...]} — đọc thẳng file dữ liệu đã sinh, không đoán lại phân bài."""
    f = ROOT / 'src' / 'data' / f'thoidaiVocab{q}.js'
    txt = f.read_text(encoding='utf-8')
    mv = re.search(r'thoidaiVocab%d\s*=\s*(\{[\s\S]*?\n\});' % q, txt)
    mr = re.search(r'thoidaiRange%d\s*=\s*(\{[\s\S]*?\n\});' % q, txt)
    vocab, rng = json.loads(mv.group(1)), json.loads(mr.group(1))
    ra = {}
    for key, r in rng.items():
        cha = key.split('.')[0]
        ds = vocab.get(cha, [])[r['from'] - 1: r['to']]
        ra[key] = [w.get('hanzi', '') for w in ds]
    return ra


def nhan_dang(mp3: Path):
    """[(text phồn thể, start giây, end giây)] — segment rất ngắn nhờ -ml 10 -sow."""
    TMP.mkdir(parents=True, exist_ok=True)
    wav = TMP / (mp3.stem + '.wav')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(mp3),
                    '-ar', '16000', '-ac', '1', str(wav)], check=True)
    out = TMP / mp3.stem
    subprocess.run(['whisper-cli', '-m', MODEL, '-f', str(wav), '-l', 'zh', '-bs', '1',
                    '-t', '10', '-ml', '10', '-sow', '--output-json', '--output-file', str(out)],
                   check=True, capture_output=True)
    data = json.loads(out.with_suffix('.json').read_text(encoding='utf-8'))
    segs = []
    for s in data.get('transcription', []):
        t = CC.convert(s.get('text', '').strip())
        o = s.get('offsets', {})
        if t:
            segs.append((t, o.get('from', 0) / 1000, o.get('to', 0) / 1000))
    for f in (wav, out.with_suffix('.json')):
        f.unlink(missing_ok=True)
    return segs


def khop(tu_list, segs):
    """Khớp từng từ với segment theo ĐÚNG THỨ TỰ đọc. -> {chỉ số từ: (start, end)}"""
    ra, i = {}, 0
    for k, tu in enumerate(tu_list):
        c = chuan(tu)
        if not c:
            continue
        for j in range(i, len(segs)):
            t = chuan(segs[j][0])
            if not t or t in SO_HAN:            # segment chỉ là số thứ tự
                continue
            # Khớp khi segment CHÍNH LÀ từ đó (cho phép segment dính số thứ tự phía trước).
            if t == c:
                ra[k] = (segs[j][1], segs[j][2])
                i = j + 1
                break
            # Segment đôi khi DÍNH số thứ tự phía trước ("一大家" / "1.大家") — vẫn dùng được,
            # nhưng phải bỏ phần đọc số ra khỏi clip, nếu không học viên nghe "một, đại gia".
            # Cắt theo tỉ lệ ký tự: thô nhưng đủ (người đọc đều nhịp), và chỉ áp cho phần thừa.
            du = t.lstrip(SO_HAN + '0123456789.、,， ')
            if du == c and len(t) > len(c):
                s0, e0 = segs[j][1], segs[j][2]
                bo = (len(t) - len(du)) / max(1, len(t))
                ra[k] = (s0 + (e0 - s0) * bo, e0)
                i = j + 1
                break
    return ra


# Clip ngắn hơn ngưỡng này coi như cắt hụt: 0,30s là mức thấp nhất một âm tiết tiếng Trung đọc
# rõ có thể chiếm; dưới nữa chỉ còn đuôi âm hoặc tiếng gió.
NGAN_NHAT = 0.30


def do_dai(f: Path):
    """Thời lượng clip; None khi file hỏng."""
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                        '-of', 'csv=p=0', str(f)], capture_output=True, text=True)
    try:
        return float(r.stdout.strip())
    except ValueError:
        return None


def _cat_mot_lan(src: Path, start, end, dich: Path, nguong, lang):
    dur = max(0.35, min(end - start, 8.0))
    af = (f'silenceremove=start_periods=1:start_silence={lang}:start_threshold={nguong}:'
          f'detection=peak,areverse,silenceremove=start_periods=1:start_silence={lang}:'
          f'start_threshold={nguong}:detection=peak,areverse')
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{max(0, start - 0.12):.2f}',
        '-t', f'{dur + 0.25:.2f}', '-i', str(src), '-af', af,
        '-ac', '1', '-ar', '22050', '-b:a', '32k', str(dich)], check=True)


def cat(src: Path, start, end, dich: Path):
    """Cắt + bỏ khoảng lặng hai đầu (mốc Whisper rộng hơn tiếng nói thật) + nén nhẹ.

    ⚠️ LƯỚI AN TOÀN, thêm 2026-09-10 — đừng bỏ. Bản trước cắt một lần rồi tin luôn kết quả:
    mốc Whisper lệch một nhịp là `silenceremove` xoá gần hết tiếng, để lại clip 0,07s hoặc file
    mp3 HỎNG HẲN. Mà app phát file câm "thành công" nên KHÔNG rơi xuống nguồn dự phòng — học
    viên bấm loa, không nghe gì, không lỗi nào hiện ra. Quét 2026-09-10 tìm được 32 clip như vậy
    (27 Thời Đại + 5 HSK), gồm cả những từ rất cơ bản: 魚 · 馬 · 龍 · 個 · 零.

    Nay thử ba mức lần lượt, giữ phương án ĐẦU TIÊN đủ dài: ngưỡng thấp (giữ được âm mở đầu nhẹ
    như thanh 3 馬 mǎ hay phụ âm hơi 撥 bō) -> ngưỡng cũ -> cắt thô không dọn khoảng lặng.
    Cả ba đều hụt thì trả False để nơi gọi BỎ QUA từ đó: thà thiếu audio (app tự rơi về giọng
    máy) còn hơn để lại một clip câm.
    """
    for nguong, lang in (('-55dB', '0.08'), ('-45dB', '0.05'), (None, None)):
        try:
            if nguong is None:
                dur = max(0.35, min(end - start, 8.0))
                subprocess.run([
                    'ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{max(0, start - 0.12):.2f}',
                    '-t', f'{dur + 0.25:.2f}', '-i', str(src),
                    '-ac', '1', '-ar', '22050', '-b:a', '32k', str(dich)], check=True)
            else:
                _cat_mot_lan(src, start, end, dich, nguong, lang)
        except subprocess.CalledProcessError:
            continue
        d = do_dai(dich)
        if d is not None and d >= NGAN_NHAT:
            return True
    dich.unlink(missing_ok=True)
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--quyen', default='1')
    ap.add_argument('--bai', default='')
    a = ap.parse_args()
    quyens = [int(x) for x in a.quyen.split(',') if x.strip()]
    loc = {int(x) for x in a.bai.split(',') if x.strip()} or None
    AUDIO_OUT.mkdir(parents=True, exist_ok=True)

    # MỖI QUYỂN MỘT FILE MAP. Trước đây dùng chung một file, chạy 5 tiến trình song song là mỗi
    # tiến trình ghi đè map của tiến trình khác — mất trắng hơn nửa số từ đã cắt mà không báo lỗi.
    for q in quyens:
        f_map = CACHE / f'audio-tu-q{q}.json'
        co_san = json.loads(f_map.read_text('utf8')) if f_map.exists() else {}
        vocab = doc_vocab(q)
        for f in sorted((AUDIO_IN / f'q{q}').glob(f'B{q}-*-*-2.mp3')):
            g = re.match(rf'B{q}-(\d+)-(\d+)-2\.mp3$', f.name)
            if not g:
                continue
            bai, phan = int(g.group(1)), int(g.group(2))
            if loc and bai not in loc:
                continue
            key = f'td{q}-{bai}.{phan}'
            tu_list = vocab.get(key) or []
            if not tu_list:
                continue
            # Đã cắt gần đủ thì bỏ qua (chạy lại được). Ngưỡng 0.95 chứ không phải 0.8: chạy
            # lần đầu bằng model nhỏ cho nhanh, sau đó chạy lại bằng model medium để VÉT nốt
            # những từ model nhỏ nghe không ra — ngưỡng thấp quá thì lần vét không làm gì cả.
            if sum(1 for k in co_san if k.endswith('|' + key)) >= len(tu_list) * 0.95:
                continue
            try:
                segs = nhan_dang(f)
            except subprocess.CalledProcessError as e:
                print(f'   ✗ {key}: whisper lỗi ({e})', flush=True)
                continue
            m = khop(tu_list, segs)
            # `cat` trả False khi mọi cách cắt đều ra clip hụt -> KHÔNG ghi vào map. Ghi vào là
            # dữ liệu trỏ tới một file câm và app không bao giờ rơi xuống giọng máy (2026-09-10).
            xong = 0
            for k, (s, e) in m.items():
                ten = f'B{q}L{bai:02d}-{phan}-{k + 1:02d}.mp3'
                try:
                    if not cat(f, s, e, AUDIO_OUT / ten):
                        print(f'   · bỏ {tu_list[k]}: cắt ra clip hụt', flush=True)
                        continue
                except subprocess.CalledProcessError:
                    continue
                co_san[f'{tu_list[k]}|{key}'] = ten
                xong += 1
            print(f'   ✓ {key}: {xong}/{len(tu_list)} từ có audio thật', flush=True)
            f_map.write_text(json.dumps(co_san, ensure_ascii=False, indent=1), 'utf8')   # ghi sau MỖI mục
        print(f'✅ Quyển {q}: {len(co_san)} từ có audio gốc -> {f_map.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
