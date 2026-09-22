#!/usr/bin/env python3
# =============================================================
# Sinh bảng chuyển PHỒN THỂ -> GIẢN THỂ cho `src/data/gian-the.js`.
#
#   /tmp/pdfenv/bin/python scripts/gen-gian-the.py
#
# Cần gói `opencc-python-reimplemented` (pip install opencc-python-reimplemented).
# Chỉ chạy khi muốn dựng lại bảng — kết quả đã commit nên app không phụ thuộc Python.
#
# ⚠️ Dùng cấu hình **tw2s** (phồn thể Đài Loan -> giản thể đại lục), KHÔNG dùng `tw2sp`:
#    tw2sp đổi cả TỪ VỰNG theo thói quen đại lục (計程車 -> 出租车, 腳踏車 -> 自行车). Học viên
#    đang học từ vựng Đài Loan — đổi vậy là đổi nội dung bài học chứ không phải đổi hệ chữ.
# =============================================================
import json, pathlib, re, sys

try:
    import opencc
except ImportError:
    sys.exit('Thiếu opencc: /tmp/pdfenv/bin/pip install opencc-python-reimplemented')

cc = opencc.OpenCC('tw2s')
GOC = pathlib.Path(__file__).resolve().parent.parent

# ---- 1. Bảng CHỮ ĐƠN ------------------------------------------------------
# CHỈ khối CJK cơ bản (U+4E00..U+9FFF). Khối mở rộng A/B chứa chữ cổ mà không phông người dùng
# nào vẽ được, và quan trọng hơn: chữ ngoài BMP chiếm HAI code unit trong JS, làm lệch nhịp đọc
# chuỗi cặp. Đã dính đúng lỗi đó một lần — bảng vẫn "chạy" nhưng hỏng từ chữ lệch đầu tiên trở đi.
chu = {}
for cp in range(0x4E00, 0x9FFF + 1):
    c = chr(cp)
    g = cc.convert(c)
    if g != c and len(g) == 1 and ord(g) <= 0xFFFF:
        chu[c] = g
chu['妳'] = '你'      # OpenCC giữ nguyên 妳; giản thể đại lục không dùng chữ này

# ---- 2. Bảng CỤM ngoại lệ -------------------------------------------------
# Cụm mà chuyển theo từng chữ ra kết quả KHÁC chuyển theo cụm. Gom bằng cách quét toàn bộ đoạn
# Hán trong dữ liệu app rồi rút về cụm tối thiểu.
HAN = re.compile(r'[一-鿿]+')

def gom(o, out):
    if isinstance(o, str):
        out.append(o)
    elif isinstance(o, list):
        for x in o: gom(x, out)
    elif isinstance(o, dict):
        for x in o.values(): gom(x, out)

texts = []
for thu_muc in ('giaotrinh', 'luyentap', 'dich'):
    for p in (GOC / 'public/data' / thu_muc).glob('*.json'):
        try: gom(json.loads(p.read_text(encoding='utf-8')), texts)
        except Exception: pass

doan = {m for t in texts for m in HAN.findall(t)}
theo_chu = lambda s: ''.join(chu.get(c, c) for c in s)
chuan = lambda s: s.replace('妳', '你')     # ngoại lệ cố ý của ta, xem chú thích ở lưới kiểm

cum_tho = {}
for d in doan:
    if chuan(theo_chu(d)) == chuan(cc.convert(d)):
        continue
    for n in (2, 3, 4):
        for i in range(len(d) - n + 1):
            s = d[i:i + n]
            if chuan(theo_chu(s)) != chuan(cc.convert(s)):
                cum_tho[s] = chuan(cc.convert(s))

cum = {}
for k in sorted(cum_tho, key=len):          # giữ cụm TỐI THIỂU
    if not any(nho in k for nho in cum):
        cum[k] = cum_tho[k]

# ---- 3. Kiểm chéo trước khi ghi ------------------------------------------
def chuyen(s):
    giu = []
    ra = s
    for k in sorted(cum, key=len, reverse=True):
        while k in ra:
            ra = ra.replace(k, f'{len(giu)}', 1)
            giu.append(cum[k])
    ra = theo_chu(ra)
    for i, v in enumerate(giu):
        ra = ra.replace(f'{i}', v)
    return ra

# 妳 -> 你 là ngoại lệ CỐ Ý của ta (OpenCC giữ nguyên 妳), nên chuẩn hoá cả hai vế trước khi so,
# nếu không lưới kiểm chéo sẽ báo lỗi cho chính quy tắc mình vừa đặt ra.
lech = [d for d in doan if chuan(chuyen(d)) != chuan(cc.convert(d))]
print(f'{len(chu)} cặp chữ · {len(cum)} cụm · đối chiếu {len(doan)} đoạn Hán: lệch {len(lech)}')
if lech:
    print('  ', ' | '.join(f'{d}: ta={chuyen(d)} occ={cc.convert(d)}' for d in lech[:6]))
    sys.exit('LỆCH — không ghi file. Sửa bộ gom cụm rồi chạy lại.')

cap = ''.join(k + v for k, v in sorted(chu.items()))
assert len(cap) == len(chu) * 2, 'chuỗi cặp phải chẵn — có chữ ngoài BMP lọt vào'

cum_js = ',\n  '.join(f"'{k}': '{v}'" for k, v in sorted(cum.items()))
noi_dung = f'''// =============================================================
// BẢNG CHUYỂN PHỒN THỂ -> GIẢN THỂ — SINH TỰ ĐỘNG, đừng sửa tay.
//   /tmp/pdfenv/bin/python scripts/gen-gian-the.py
//
// Vì sao cần: nút 繁/简 trên thanh tiêu đề đổi `state.charMode`, nhưng phần lớn dữ liệu KHÔNG
// kèm sẵn dạng giản thể — 6.200/10.562 từ vựng thiếu trường `simplified`, còn câu ví dụ, hội
// thoại, ngữ pháp, đề luyện tập thì chưa bao giờ có. Các renderer `dd*` lại in thẳng
// `w.hanzi` nên bấm 繁/简 gần như không đổi được gì.
//
// Nay `getDisplayText()` rơi về bảng này khi không có sẵn dạng giản, nên MỌI chữ Hán trong app
// đều chuyển được — không phải vá 6.200 bản ghi và không mất khi sinh lại dữ liệu.
//
// Nguồn: OpenCC cấu hình **tw2s**. ⚠️ KHÔNG dùng `tw2sp` — nó đổi cả TỪ VỰNG sang thói quen
// đại lục (計程車 -> 出租车), tức đổi nội dung bài học chứ không phải đổi hệ chữ.
// =============================================================

/**
 * {len(chu)} cặp chữ, ghép liền từng đôi (phồn, giản).
 * ⚠️ Chỉ chứa chữ trong khối CJK cơ bản. Chữ ngoài BMP chiếm HAI code unit trong JS nên sẽ làm
 * lệch nhịp đọc chuỗi này — đã dính một lần, bảng vẫn chạy nhưng hỏng từ chỗ lệch trở đi.
 */
const CAP_CHU = '{cap}';

/**
 * Cụm phải đổi theo TỪ, không theo từng chữ ({len(cum)} cụm — gom bằng cách so chuyển-theo-chữ
 * với chuyển-theo-cụm của OpenCC trên toàn bộ {len(doan):,} đoạn Hán trong dữ liệu app).
 * Có hai loại, cùng nằm ở đây: cụm ĐỔI khác (計畫 -> 计划, không phải 计画) và cụm phải GIỮ
 * NGUYÊN (著名 giữ 著, không thành 着) — loại thứ hai chính là lý do phải tách cụm ra xử lý
 * trước rồi khoá lại, nếu không vòng chữ phía sau vẫn đổi mất.
 */
const CUM = {{
  {cum_js},
}};

const _chu = new Map();
for (let i = 0; i < CAP_CHU.length; i += 2) _chu.set(CAP_CHU[i], CAP_CHU[i + 1]);

const _cumKeys = Object.keys(CUM).sort((a, b) => b.length - a.length);   // dài trước

/**
 * Chuyển một đoạn văn bản phồn thể sang giản thể.
 *
 * Cụm được thay bằng ký tự giữ chỗ (vùng dùng riêng U+E000) TRƯỚC khi chạy vòng chữ, rồi trả
 * lại sau — có vậy cụm phải giữ nguyên (著名) mới không bị vòng chữ đổi mất.
 *
 * Chuỗi không có gì phải đổi thì trả về CHÍNH nó, không tạo chuỗi mới: hàm này chạy trên mọi
 * lần render nên đường đi nhanh phải rẻ.
 */
export function sangGianThe(text) {{
  const s = String(text == null ? '' : text);
  if (!s) return s;

  let ra = s;
  const giu = [];
  for (const k of _cumKeys) {{
    while (ra.includes(k)) {{
      ra = ra.replace(k, `\\uE000${{giu.length}}\\uE001`);
      giu.push(CUM[k]);
    }}
  }}

  let doi = false;
  let out = '';
  for (const c of ra) {{
    const g = _chu.get(c);
    if (g) {{ out += g; doi = true; }} else out += c;
  }}

  for (let i = 0; i < giu.length; i++) out = out.replace(`\\uE000${{i}}\\uE001`, giu[i]);
  return doi || giu.length ? out : s;
}}
'''
(GOC / 'src/data/gian-the.js').write_text(noi_dung, encoding='utf-8')
print(f'đã ghi src/data/gian-the.js ({len(noi_dung):,} byte)')
