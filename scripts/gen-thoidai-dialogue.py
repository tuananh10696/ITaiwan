#!/usr/bin/env python3
"""
HỘI THOẠI + ĐOẠN VĂN của Giáo trình Thời Đại (時代華語) — 2026-09-05

    scripts/.venv/bin/python scripts/gen-thoidai-dialogue.py --quyen 1,2,3,4,5
    ... --bai 1,2        (chỉ vài bài)

VÌ SAO PHẢI NHẬN DẠNG GIỌNG NÓI: phần CHỮ của bài khoá chỉ có trong sách in — không nguồn công
khai nào có (đã dò kỹ, xem md/nguon-du-lieu-thoi-dai.md mục 6). Nhưng BẢN THU thì công khai trên
Drive của 淡江大學華語中心, nên lấy ngược chữ từ tiếng nói. Cùng cách đã dùng cho Đương đại
(scripts/gen-duongdai-dialogue.py).

CHỌN ĐÚNG FILE — ở đây dễ hơn Đương đại vì tên file đã nói rõ bài/phần:
    B2-05-1-1.mp3 = quyển 2, bài 5, phần 1, mục 1
    mục 1 = 對話 (quyển 1: 對話一/對話二) hoặc 短文 (phần cuối) · mục 2 = 生詞 · mục 3 = 語法
Ta chỉ lấy MỤC 1 của mỗi phần (bài khoá), bỏ 生詞/語法.

Ba bước như bên Đương đại: whisper.cpp (medium) -> OpenCC s2twp (Whisper trả giản thể, sách là
phồn thể Đài Loan) -> pypinyin. `vi` để RỖNG — script không tự dịch.
"""
import argparse, json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / 'scripts' / 'data-cache' / 'thoidai'
AUDIO_IN = CACHE / 'audio'
AUDIO_OUT = ROOT / 'public' / 'audio' / 'thoidai'
MODEL = str(ROOT / 'scripts' / 'data-cache' / 'whisper' / 'medium.bin')
TMP = Path('/tmp') / 'td-asr'

import opencc, pypinyin
CC = opencc.OpenCC('s2twp')

# gen-thoidai-parts.py có gạch ngang trong tên nên không import thẳng được — nạp bằng đường dẫn.
import importlib.util
_spec = importlib.util.spec_from_file_location('td_parts', Path(__file__).with_name('gen-thoidai-parts.py'))
TDP = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(TDP)


def tu_vung_bai(q, bai):
    """Danh sách từ vựng + vài câu ví dụ của bài — dùng làm mồi (--prompt) cho Whisper.

    ⚠️ ĐÃ THỬ VÀ TẮT MẶC ĐỊNH (2026-09-05). Mồi có sửa được vài tên riêng (宜文 thay vì 疑問)
    nhưng KHÔNG ổn định giữa các lần chạy, và tệ hơn: model bắt chước luôn dấu câu của mồi,
    làm mọi câu nhận dạng dính đuôi '，' hoặc '？。'. Giữ hàm lại để thử nghiệm, muốn bật thì
    truyền vào nhan_dang(); mặc định chạy KHÔNG mồi cho kết quả sạch và đoán trước được.
    """
    f = ROOT / 'src' / 'data' / f'thoidaiVocab{q}.js'
    if not f.exists():
        return ''
    m = re.search(r'thoidaiVocab%d\s*=\s*(\{[\s\S]*?\n\});' % q, f.read_text(encoding='utf-8'))
    if not m:
        return ''
    try:
        data = json.loads(m.group(1))
    except Exception:
        return ''
    ds = data.get(f'td{q}-{bai}', [])
    tu = [w.get('hanzi', '') for w in ds if w.get('hanzi')][:40]
    # Kèm vài CÂU VÍ DỤ: tên nhân vật (王宜文, 小林友美…) không nằm trong danh sách từ vựng nhưng
    # lại xuất hiện đầy trong bản thu — không mồi thì Whisper nghe ra 疑問 / 尤美.
    tatca = [e.get('h', '') for w in ds for e in (w.get('ex') or []) if e.get('h')]
    # Rải đều cả bài: tên nhân vật của phần 2/3 (小林友美…) chỉ xuất hiện ở ví dụ cuối danh sách,
    # lấy 6 ví dụ ĐẦU là mồi thiếu đúng những tên đó.
    buoc = max(1, len(tatca) // 8)
    vd = tatca[::buoc][:8]
    moi = '、'.join(tu) + ('，' + '，'.join(vd) if vd else '')
    # KHÔNG kết thúc mồi bằng dấu câu: model bắt chước dấu của mồi, kết quả dính '﹖。' vào cuối
    # mỗi câu nhận dạng.
    return moi[:220].rstrip('。，、')


def cau_pinyin(s):
    chu = re.sub(r'[^一-鿿]', '', s)
    return ' '.join(x[0] for x in pypinyin.pinyin(chu, style=pypinyin.Style.TONE)) if chu else ''


def nhan_dang(mp3: Path, moi=''):
    TMP.mkdir(parents=True, exist_ok=True)
    wav = TMP / (mp3.stem + '.wav')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(mp3),
                    '-ar', '16000', '-ac', '1', str(wav)], check=True)
    out = TMP / mp3.stem
    # -bs 1 + dùng nhiều luồng: mỗi file bài khoá dài 2-3 phút, model medium mất ~3 phút/file
    # khi CPU rảnh. Cả 5 quyển (~200 file) là việc chạy HÀNG GIỜ — chạy nền, script ghi file sau
    # MỖI bài nên ngắt giữa chừng vẫn giữ được phần đã làm và chạy lại là đi tiếp.
    lenh = ['whisper-cli', '-m', MODEL, '-f', str(wav), '-l', 'zh', '-bs', '1',
            '--output-json', '--output-file', str(out), '-t', '10']
    if moi:
        lenh += ['--prompt', moi]
    subprocess.run(lenh, check=True, capture_output=True)
    data = json.loads(out.with_suffix('.json').read_text(encoding='utf-8'))
    cues, tieu_de = [], []
    for seg in data.get('transcription', []):
        txt = CC.convert(seg.get('text', '').strip())
        # Whisper đôi khi trả dấu câu dạng biến thể (﹖﹗) hoặc chồng dấu ('？。') — dọn trước khi
        # so tiêu đề, nếu không "對話一﹖" không khớp bộ lọc tiêu đề và lọt vào lời thoại.
        txt = (txt.replace('﹖', '？').replace('﹗', '！').replace('﹐', '，')
                  .replace('？。', '？').replace('！。', '！').replace('。。', '。').strip())
        txt = re.sub(r'[，、]+$', '', txt).strip()
        if not txt or not re.search(r'[一-鿿]', txt):
            continue
        goc = re.sub(r'[\s。，、？！?!,.]', '', txt)
        # Bản thu đọc nhãn mục trước khi vào bài -> tiêu đề, không phải câu thoại.
        if re.fullmatch(r'(對話[一二]?|短文|課文[一二]?|生詞[一二]?)', goc) or re.match(r'^第[一二三四五六七八九十]+課', goc):
            tieu_de.append(txt)
            continue
        off = seg.get('offsets', {})
        cues.append({'text': txt, 'start': round(off.get('from', 0) / 1000, 2),
                     'end': round(off.get('to', 0) / 1000, 2), 'pinyin': cau_pinyin(txt), 'vi': ''})
    for f in (wav, out.with_suffix('.json')):
        f.unlink(missing_ok=True)
    return cues, tieu_de


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--quyen', default='1,2,3,4,5')
    ap.add_argument('--bai', default='')
    a = ap.parse_args()
    quyens = [int(x) for x in a.quyen.split(',') if x.strip()]
    loc_bai = {int(x) for x in a.bai.split(',') if x.strip()} or None
    AUDIO_OUT.mkdir(parents=True, exist_ok=True)

    for q in quyens:
        ban_do = TDP.ban_do_audio(q)          # {'B2-01-1-1.mp3': '<drive id>'}
        out_file = ROOT / 'src' / 'data' / f'thoidaiDialogues{q}.js'
        ra = {}
        if out_file.exists():
            m = re.search(r'=\s*(\{[\s\S]*\});?\s*$', out_file.read_text(encoding='utf-8'))
            if m:
                try: ra = json.loads(m.group(1))
                except Exception: ra = {}

        # gom mục 1 (bài khoá) của từng phần
        theo_bai = {}
        for ten, fid in ban_do.items():
            # ⚠️ Đuôi file trên Drive KHÔNG đồng nhất: đa số là `.mp3` nhưng có vài file `.MP3`
            # viết HOA (B4-07-1-1.MP3). Regex chữ thường bỏ sót đúng những file đó — bài td4-7.1
            # thiếu hẳn khỏi dữ liệu mà không có lỗi nào hiện ra (script chỉ lặp trên bản đồ).
            g = re.match(r'B(\d)-(\d+)-(\d+)-(\d+)\.mp3$', ten, re.IGNORECASE)
            if not g or int(g.group(1)) != q or int(g.group(4)) != 1:
                continue
            theo_bai.setdefault(int(g.group(2)), []).append((int(g.group(3)), ten, fid))

        for bai in sorted(theo_bai):
            if loc_bai and bai not in loc_bai:
                continue
            for phan, ten, fid in sorted(theo_bai[bai]):
                key = f'td{q}-{bai}.{phan}'
                if ra.get(key, {}).get('cues'):
                    continue                                   # đã làm rồi -> chạy lại được
                mp3 = TDP.tai(fid, AUDIO_IN / f'q{q}' / ten)
                dich = AUDIO_OUT / f'B{q}L{bai:02d}-{phan}.mp3'
                if not dich.exists():
                    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(mp3),
                                    '-ac', '1', '-ar', '22050', '-b:a', '32k', str(dich)], check=True)
                try:
                    cues, tieu_de = nhan_dang(mp3)
                except subprocess.CalledProcessError as e:
                    print(f'   ✗ {key}: whisper lỗi ({e})', flush=True)
                    continue
                ten_bai = next((re.sub(r'^第[一二三四五六七八九十]+課\s*', '', t) for t in tieu_de
                                if re.match(r'^第[一二三四五六七八九十]+課', t)), '')
                ra[key] = {'title': ten_bai or (cues[0]['text'] if cues else ''),
                           'audio': f'/audio/thoidai/{dich.name}', 'cues': cues}
                print(f'   ✓ {key}: {len(cues)} câu  ({ten_bai})', flush=True)
                out_file.write_text(
                    f'// Hội thoại + đoạn văn Thời Đại quyển {q} — SINH TỰ ĐỘNG, đừng sửa tay.\n'
                    f'//   scripts/gen-thoidai-dialogue.py --quyen {q}\n'
                    f'// Chữ nhận dạng từ BẢN THU CHÍNH THỨC (淡江大學華語中心) bằng whisper.cpp,\n'
                    f'// đổi phồn thể bằng OpenCC s2twp, pinyin bằng pypinyin. `vi` do người soạn.\n'
                    f'export const thoidaiDialogues{q} = ' + json.dumps(ra, ensure_ascii=False, indent=1) + ';\n',
                    encoding='utf-8')
        print(f'✅ Quyển {q}: {len(ra)} bài con -> {out_file.relative_to(ROOT)}', flush=True)


if __name__ == '__main__':
    main()
