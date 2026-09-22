#!/usr/bin/env python3
# =============================================================
# Chọn CÂU VÍ DỤ cho từng từ vựng và sinh phiên âm.
#
#   scripts/.venv/bin/python scripts/gen-vi-du.py            # sinh
#   scripts/.venv/bin/python scripts/gen-vi-du.py --kiem     # chỉ thống kê
#
# Cần `pypinyin` (đã có sẵn trong scripts/.venv).
#
# Vì sao: 10.009/10.562 từ của hai bộ giáo trình chưa có ví dụ dùng được — Đương đại Q2–Q6 không
# có câu nào, còn 4.695 câu của Thời Đại thì có chữ Hán nhưng phiên âm và bản dịch đều RỖNG.
#
# Nguyên tắc chọn câu, theo thứ tự — câu THẬT của sách luôn hơn câu tự soạn:
#   1. câu ví dụ NGỮ PHÁP của chính bài đó, đã kèm bản dịch tiếng Việt  -> dùng luôn, khỏi dịch
#   2. câu ví dụ sẵn có trong dữ liệu từ vựng (Thời Đại)                -> chỉ thiếu dịch
#   3. câu ngữ pháp / hội thoại của bài có chứa từ                      -> chỉ thiếu dịch
#   4. không tìm được                                                   -> ghi ra để soạn tay
#
# Phiên âm sinh bằng pypinyin (xử lý được chữ đa âm theo ngữ cảnh) — KHÔNG ghép tay từ bảng âm
# tiết, vì 的/得/地, 長/长, 行 đọc khác nhau tuỳ câu.
# =============================================================
import json, pathlib, re, sys, unicodedata

try:
    from pypinyin import pinyin, Style
except ImportError:
    sys.exit('Thiếu pypinyin: scripts/.venv/bin/pip install pypinyin')

GOC = pathlib.Path(__file__).resolve().parent.parent
DIR = GOC / 'public/data/giaotrinh'
BOSUNG = GOC / 'scripts/data-cache/bosung'
KIEM = '--kiem' in sys.argv
HAN = re.compile(r'[一-鿿]')

def so_chu(s):
    return len(HAN.findall(s))

def sach(s):
    """Bỏ rác của bộ bóc PPT: ký tự vùng dùng riêng, chú thích trong ngoặc, khoảng trắng thừa."""
    s = ''.join(c for c in str(s or '') if unicodedata.category(c) != 'Co')
    s = re.sub(r'[(（][^)）]{0,40}[)）]', '', s)
    return re.sub(r'\s+', ' ', s).strip()

# Vốn từ để PHÂN TỪ: gộp từ vựng của chính giáo trình với kho tra cứu 10.927 từ (4.37).
# Không có bộ phân từ nào cài sẵn, mà ghép pinyin theo từng CHỮ thì ra "Kě yǐ qǐng nǐ bāng wǒ"
# — dữ liệu gốc của sách viết liền theo TỪ ("Kěyǐ qǐng nǐ bāng wǒ"), lệch hẳn cách trình bày.
def _nap_tu_dien():
    tu = set()
    kho = GOC / 'public/data/tudien/kho.json'
    if kho.exists():
        for r in json.loads(kho.read_text(encoding='utf-8')):
            if r and r[0]:
                tu.add(str(r[0]))
                if r[1]:
                    tu.add(str(r[1]))
    for f in DIR.glob('*.json'):
        for w in (json.loads(f.read_text(encoding='utf-8')).get('v') or []):
            for x in str(w.get('hanzi') or '').split('/'):
                if x.strip():
                    tu.add(x.strip())
    return {t for t in tu if 2 <= len(t) <= 6 and HAN.fullmatch(t[0])}

TU_DIEN = _nap_tu_dien()
DAI_NHAT = 6

def _tach_tu(doan):
    """Khớp DÀI NHẤT từ trái sang — đủ tốt cho việc ghép phiên âm, không cần bộ phân từ thật."""
    ra, i = [], 0
    while i < len(doan):
        for n in range(min(DAI_NHAT, len(doan) - i), 1, -1):
            if doan[i:i + n] in TU_DIEN:
                ra.append(doan[i:i + n]); i += n; break
        else:
            ra.append(doan[i]); i += 1
    return ra

def phien_am(cau):
    """Phiên âm có dấu, ghép theo TỪ. Dấu câu bám sát chữ đứng trước như trong sách."""
    ra = []
    for khuc in re.findall(r'[一-鿿]+|[^一-鿿]+', cau):
        if HAN.match(khuc):
            for t in _tach_tu(khuc):
                am = [x[0] for x in pinyin(t, style=Style.TONE)]
                ra.append(''.join(am))
        else:
            ra.append(khuc.strip())
    s = ' '.join(x for x in ra if x)
    s = re.sub(r'\s+([，。！？、；：,.!?;:）】」』])', r'\1', s)
    s = re.sub(r'([（【「『(])\s+', r'\1', s)
    s = re.sub(r'([，。！？、；：,.!?;:])(?=[^\s])', r'\1 ', s)
    # Phiên âm là chữ LATIN nên dấu câu cũng phải Latin — giữ nguyên dấu toàn hình của câu chữ
    # Hán thì ra "Tā shì xīn tóngxué。", lệch với 553 ví dụ soạn tay của Đương đại quyển 1.
    s = s.translate(str.maketrans({'，': ',', '。': '.', '！': '!', '？': '?', '、': ',',
                                   '；': ';', '：': ':', '「': '"', '」': '"', '『': '"',
                                   '』': '"', '（': '(', '）': ')', '【': '[', '】': ']'}))
    s = re.sub(r'\s+([,.!?;:)\]])', r'\1', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s[:1].upper() + s[1:] if s else s

# ------------------------------------------------------------------ gom câu của từng bài
def cau_cua_bai(d):
    """Trả về [(câu, bản dịch hoặc '')] — mọi câu tiếng Hán có trong bài."""
    ra = []
    for ds in (d.get('g') or {}).values():
        for g in (ds or []):
            ex = list(g.get('examples') or [])
            for p in (g.get('points') or []):
                ex += list(p.get('examples') or [])
            for e in ex:
                if e and e.get('hz'):
                    ra.append((sach(e['hz']), sach(e.get('vi'))))
    for ds in (d.get('d') or {}).values():
        for dlg in (ds if isinstance(ds, list) else [ds]):
            for c in ((dlg or {}).get('cues') or []):
                if c and c.get('text'):
                    ra.append((sach(c['text']), sach(c.get('vi'))))
    return ra

# Câu cụt do bộ bóc PPT cắt nhầm: kết thúc bằng dấu hai chấm / dấu phẩy, mở ngoặc không đóng,
# hoặc dính nhãn vai ("A:", "男：").
RAC = re.compile(
    r'[：:，,、]\s*$'                 # cụt ở dấu phẩy / hai chấm
    r'|^[A-Za-z男女甲乙]\s*[：:]'      # dính nhãn vai thoại
    r'|[（(【「][^）)】」]*$'            # mở ngoặc không đóng
    r'|^\s*[0-9a-z]\s*[.、)]'         # dính số thứ tự của đề bài: "1." "a."
    r'|第\s*\d+\s*課'                # dòng tiêu đề bài
    r'|^課文'
)

def hop_le(cau, tu):
    """Câu dùng làm ví dụ được không? Phải chứa từ, đủ dài để thành câu, không quá dài."""
    n = so_chu(cau)
    if RAC.search(cau):
        return False
    return tu in cau and 4 <= n <= 30 and cau != tu

ra_du, can_dich, khong_co = {}, {}, []
dem = {'ngu_phap_co_dich': 0, 'san_co': 0, 'trich': 0, 'khong': 0}

for f in sorted(DIR.glob('*.json')):
    d = json.loads(f.read_text(encoding='utf-8'))
    cau_bai = cau_cua_bai(d)
    for w in (d.get('v') or []):
        han = str(w.get('hanzi') or '')
        if not han:
            continue
        tu = han.split('/')[0].strip()
        # đã có ví dụ ĐỦ bản dịch thì thôi
        ex = w.get('ex') or []
        if ex and all(e and str(e.get('t') or '').strip() for e in ex):
            continue

        # 1. câu ngữ pháp đã có bản dịch
        ung = [(c, v) for c, v in cau_bai if v and hop_le(c, tu)]
        if ung:
            c, v = min(ung, key=lambda x: so_chu(x[0]))
            ra_du[han] = [{'h': c, 'p': phien_am(c), 't': v}]
            dem['ngu_phap_co_dich'] += 1
            continue

        # 2. câu sẵn có trong chính mục từ (Thời Đại)
        c = next((sach(e['h']) for e in ex
                  if e and e.get('h') and hop_le(sach(e['h']), tu)), '')
        nguon = 'san_co'
        # 3. câu của bài có chứa từ
        if not c:
            ung = [c2 for c2, _ in cau_bai if hop_le(c2, tu)]
            if ung:
                c = min(ung, key=so_chu)
                nguon = 'trich'
        if c:
            can_dich[han] = {'h': c, 'p': phien_am(c)}
            dem[nguon] += 1
        else:
            khong_co.append({'hanzi': han, 'pinyin': w.get('pinyin', ''), 'def': w.get('def', '')})
            dem['khong'] += 1

print(f"đã đủ sẵn (bỏ qua)        : {sum(1 for _ in [])}")
print(f"1. câu ngữ pháp CÓ bản dịch : {dem['ngu_phap_co_dich']}  -> dùng ngay, không phải dịch")
print(f"2. câu sẵn trong mục từ     : {dem['san_co']}  -> cần dịch")
print(f"3. trích từ bài             : {dem['trich']}  -> cần dịch")
print(f"4. không tìm được câu       : {dem['khong']}  -> phải soạn tay")
print(f"   TỔNG cần dịch            : {len(can_dich)}")

if KIEM:
    sys.exit(0)

BOSUNG.mkdir(parents=True, exist_ok=True)
# gộp vào vi-du.json đang có (nếu đã dịch lô nào rồi thì giữ nguyên)
f_vd = BOSUNG / 'vi-du.json'
cu = json.loads(f_vd.read_text(encoding='utf-8')) if f_vd.exists() else {}
cu.update({k: v for k, v in ra_du.items() if k not in cu})
f_vd.write_text(json.dumps(cu, ensure_ascii=False), encoding='utf-8')
(BOSUNG / 'vi-du-can-dich.json').write_text(json.dumps(can_dich, ensure_ascii=False, indent=0), encoding='utf-8')
(BOSUNG / 'vi-du-khong-co.json').write_text(json.dumps(khong_co, ensure_ascii=False, indent=1), encoding='utf-8')
print(f"\nđã ghi vi-du.json ({len(cu)}) · vi-du-can-dich.json ({len(can_dich)}) · vi-du-khong-co.json ({len(khong_co)})")
