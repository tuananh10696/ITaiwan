# MULTI-AGENT ARCHITECTURE & WORKFLOW — ITAIWAN

Dự án ITaiwan áp dụng mô hình phối hợp 3 Agent chuyên biệt: **Agent-PM**, **Agent-TechLead**, và **Agent-QC**. Khi nhận các yêu cầu phát triển, kiểm thử, refactor hoặc rà soát lỗi từ người dùng, hệ thống sẽ tự động phối hợp qua 3 vai trò này.

---

## 1. TỔNG QUAN 3 VAI TRÒ (AGENT ROLES)

| Vai trò | Định danh | Trọng tâm chính | Đầu ra chủ yếu |
|---|---|---|---|
| **Project Manager** | `Agent-PM` | Nghiệp vụ, phạm vi (Scope), độ ưu tiên (P0-P3), tiêu chí nghiệm thu (DoD), lộ trình & tiến độ. | Báo cáo kiểm thử tổng thể, DoD Sign-off, Backlog rủi ro. |
| **Technical Lead** | `Agent-TechLead` | Kiến trúc hệ thống, an ninh (RBAC, JWT, SQL Injection), mã nguồn sạch, database & pipelines dữ liệu/audio. | Root Cause Analysis (RCA), Architecture Review, Security & Fix Plan. |
| **Quality Control** | `Agent-QC` | Chiến lược test, ma trận test cases, thực thi automation test suites, săn lùng lỗi ngầm (silent bugs, audio, routing). | Bug Reports chuẩn mực, Test Matrix, Automation Verification. |

---

## 2. QUY TẮC ĐẶC THÙ HỆ THỐNG ITAIWAN CẦN GHI NHỚ

1. **Điều hướng SPA**: Mọi route trong `src/main.js` và `src/admin.js` phải có `case` rõ ràng trong hàm `navigate()`. Nếu thiếu case sẽ bị rơi vào `default: renderDashboard()` trong im lặng (URL đổi nhưng nội dung trùng).
2. **Âm thanh (Audio)**:
   - Khi chuyển trang hoặc đổi bài, bắt buộc gọi `dungMoiAmThanh()` để tắt 5 bộ audio player độc lập.
   - Luôn kiểm tra 5 kiểu lỗi âm thanh: file thiếu, clip hụt (<0.24s/âm tiết), URL HTTP mixed content, URL tương đối, link trỏ ra ngoài.
   - Chạy `npm run audio:kiem` để rà soát.
3. **Cơ sở dữ liệu & SQL**:
   - Schema chuẩn nằm trong `server/config/init-db.js`.
   - Tuyệt đối không dùng dấu backtick trong comment SQL nằm trong template literal JS.
   - JWT token phải ký bằng khoá `id` (ví dụ `jwt.sign({ id: 1, ... })`), không dùng `userId`.
4. **Phân quyền (RBAC)**:
   - `admin`: Toàn quyền.
   - `teacher`: Chỉ được xem và thao tác trên lớp mình được phân công (`teacher_id`).
   - `student`: Chỉ xem được thông tin cá nhân và lớp của mình sau khi đã được duyệt (`is_approved = 1`).
   - KHÔNG còn giới hạn số thiết bị đăng nhập (đã bỏ 2026-10-05).

---

## 3. CÁC SKILLS TƯƠNG ỨNG
- [Agent-PM Skill](file:///Users/lt00838/DATA/TA/ITaiwan/.agents/skills/agent-pm/SKILL.md)
- [Agent-TechLead Skill](file:///Users/lt00838/DATA/TA/ITaiwan/.agents/skills/agent-techlead/SKILL.md)
- [Agent-QC Skill](file:///Users/lt00838/DATA/TA/ITaiwan/.agents/skills/agent-qc/SKILL.md)
- [Multi-Agent Framework](file:///Users/lt00838/DATA/TA/ITaiwan/.agents/rules/multi-agent-framework.md)
