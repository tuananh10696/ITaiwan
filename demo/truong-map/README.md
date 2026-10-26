# Demo tĩnh: bản đồ trường đại học Đài Loan

Chạy: `cd demo/truong-map && python3 -m http.server 5300` rồi mở http://127.0.0.1:5300/

- Dữ liệu: `data.json` (136 trường, lấy từ Wikidata - CC0), logo/ảnh trong `logos/`, `anh/` (Wikimedia Commons, mỗi file một giấy phép).
- Thư viện đóng gói sẵn trong `vendor/` (Leaflet, markercluster, MapLibre GL) - không gọi CDN.
- Nền bản đồ: OpenFreeMap (vector, không cần khoá API). Chỉ là demo, KHÔNG nằm trong build / deploy của app.
