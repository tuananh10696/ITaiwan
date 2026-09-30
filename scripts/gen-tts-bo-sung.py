#!/usr/bin/env python3
"""
SINH mp3 giọng máy cho DANH SÁCH chữ Hán do `va-audio-thieu.mjs` liệt kê — 2026-09-30

    scripts/.venv/bin/python scripts/gen-tts-bo-sung.py
    ... --danh-sach <file.json>      # mặc định scripts/data-cache/audio-can-tts.json

VÌ SAO KHÔNG DÙNG `gen-tts-tuvung.py`: script đó chỉ chọn những từ KHÔNG có trường `audio`.
Các từ cần vá ở đây thì CÓ `audio` — chỉ là trỏ vào file không tồn tại hoặc vào một clip bị cắt
hụt, nên nó bỏ qua sạch. Ở đây nhận thẳng danh sách chữ Hán.

Giọng, tốc độ và CÁCH BĂM TÊN FILE phải giống `gen-tts-tuvung.py`, nếu không cùng một chữ lại ra
hai file khác tên — và `va-audio-thieu.mjs` tính đường dẫn theo đúng công thức đó nên sẽ trỏ vào
file không có thật.
"""
import argparse, asyncio, hashlib, json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'audio' / 'tts-vi'
MAC_DINH = ROOT / 'scripts' / 'data-cache' / 'audio-can-tts.json'
GIONG = 'zh-TW-HsiaoChenNeural'
TOC_DO = '-35%'

import edge_tts


def ten_file(tu: str) -> str:
    return hashlib.md5(f'{tu}|{TOC_DO}'.encode('utf-8')).hexdigest()[:10] + '.mp3'


async def sinh(tu, sem, dem):
    dich = OUT / ten_file(tu)
    if dich.exists() and dich.stat().st_size > 1000:
        dem['co_san'] += 1
        return
    async with sem:
        for lan in range(3):
            try:
                await edge_tts.Communicate(tu, GIONG, rate=TOC_DO).save(str(dich))
                if dich.stat().st_size > 1000:
                    dem['moi'] += 1
                    return
            except Exception:
                await asyncio.sleep(1.5 * (lan + 1))
    dem['loi'] += 1
    dem['ds_loi'].append(tu)


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--danh-sach', default=str(MAC_DINH), dest='danh_sach')
    a = ap.parse_args()
    f = Path(a.danh_sach)
    if not f.exists():
        sys.exit(f'Không thấy {f} — chạy `node scripts/va-audio-thieu.mjs` trước.')
    ds = json.loads(f.read_text(encoding='utf-8'))
    OUT.mkdir(parents=True, exist_ok=True)
    print(f'📖 {len(ds)} chữ · giọng {GIONG} · tốc độ {TOC_DO}')
    sem = asyncio.Semaphore(8)
    dem = {'moi': 0, 'co_san': 0, 'loi': 0, 'ds_loi': []}
    lot = 60
    for i in range(0, len(ds), lot):
        await asyncio.gather(*[sinh(t, sem, dem) for t in ds[i:i + lot]])
        print(f'   {min(i + lot, len(ds))}/{len(ds)} · mới {dem["moi"]} · có sẵn {dem["co_san"]} · lỗi {dem["loi"]}', flush=True)
    print(f'\n✅ mới {dem["moi"]} · có sẵn {dem["co_san"]} · lỗi {dem["loi"]}')
    if dem['ds_loi']:
        print('   ⚠️  sinh hỏng:', ' '.join(dem['ds_loi'][:30]))
        print('   Chạy lại script là làm tiếp, chữ đã có sẽ bỏ qua.')


asyncio.run(main())
