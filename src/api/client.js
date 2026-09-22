// API Client - Handles all communication with the Express backend
//
// Tiền tố API KHÔNG còn là hằng số '/api': trong app native, WebView chạy ở origin riêng của
// Capacitor nên đường dẫn tương đối trỏ vào chính WebView và luôn 404. `apiBase()` trả về
// '/api' trên web và URL tuyệt đối tới máy chủ thật khi ở trong app. Xem src/utils/env.js.
import { apiBase } from '../utils/env.js';
import { maThietBi } from '../utils/thiet-bi.js';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('tw_token') || null;
    this.user = JSON.parse(localStorage.getItem('tw_user') || 'null');
  }

  // --- Core HTTP methods ---
  async request(endpoint, options = {}) {
    const url = `${apiBase()}${endpoint}`;
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    try {
      const res = await fetch(url, { ...options, headers });
      const data = await res.json();
      if (!res.ok) {
        throw { status: res.status, message: data.error || 'Lỗi không xác định.', data };
      }
      return data;
    } catch (err) {
      if (err.status) throw err;
      console.error('API request failed:', err);
      throw { status: 0, message: 'Không thể kết nối server. Vui lòng thử lại.' };
    }
  }

  get(endpoint) { return this.request(endpoint); }
  post(endpoint, body) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) }); }
  put(endpoint, body) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }); }
  del(endpoint) { return this.request(endpoint, { method: 'DELETE' }); }

  // --- Auth ---
  get isLoggedIn() { return !!this.token && !!this.user; }

  async login(email, password) {
    // device_id: mã ngẫu nhiên cố định của máy này, để server đếm số thiết bị của một tài khoản
    // (giới hạn 2 — xem server/utils/thiet-bi.js). Không gửi thì server cho qua chứ không chặn.
    const data = await this.post('/auth/login', { email, password, device_id: maThietBi() });
    this.token = data.token;
    this.user = data.user;
    localStorage.setItem('tw_token', data.token);
    localStorage.setItem('tw_user', JSON.stringify(data.user));
    return data;
  }

  async register(name, email, password, phone) {
    const data = await this.post('/auth/register', { name, email, password, phone });
    this.token = data.token;
    this.user = data.user;
    localStorage.setItem('tw_token', data.token);
    localStorage.setItem('tw_user', JSON.stringify(data.user));
    return data;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('tw_token');
    localStorage.removeItem('tw_user');
  }

  async getMe() {
    const data = await this.get('/auth/me');
    this.user = data.user;
    localStorage.setItem('tw_user', JSON.stringify(data.user));
    return data.user;
  }

  // --- Vocabulary ---
  async getVocabulary(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.get(`/vocabulary${qs ? '?' + qs : ''}`);
  }

  async searchVocabulary(query) {
    return this.get(`/vocabulary/search?q=${encodeURIComponent(query)}`);
  }

  async getWord(id) {
    return this.get(`/vocabulary/${id}`);
  }

  // --- SRS ---
  async getDueCards(lesson = 'all', limit = 20) {
    return this.get(`/srs/due?lesson=${lesson}&limit=${limit}`);
  }

  async reviewCard(vocabularyId, rating) {
    return this.post('/srs/review', { vocabulary_id: vocabularyId, rating });
  }

  async getSrsStats() {
    return this.get('/srs/stats');
  }

  // --- Exam ---
  async getExamQuestions(type, level = 'Band A', limit = 10) {
    const params = new URLSearchParams({ level, limit });
    if (type) params.set('type', type);
    return this.get(`/exam/questions?${params}`);
  }

  async submitExam(answers, skill, timeSeconds) {
    return this.post('/exam/submit', { answers, skill, time_seconds: timeSeconds });
  }

  async getExamHistory() {
    return this.get('/exam/history');
  }

  async getExamResult(id) {
    return this.get(`/exam/result/${id}`);
  }

  // --- Dialogues ---
  async getDialogues() {
    return this.get('/dialogues');
  }

  async getDialogue(id) {
    return this.get(`/dialogues/${id}`);
  }

  // --- Saved Words ---
  async getSavedWords() {
    return this.get('/saved-words');
  }

  async toggleSaveWord(wordId) {
    return this.post(`/saved-words/${wordId}`);
  }

  async removeSavedWord(wordId) {
    return this.del(`/saved-words/${wordId}`);
  }

  // --- Sổ tay từ vựng (khoá theo CHỮ HÁN, thay cho /saved-words — xem CLAUDE.md 4.37) ---
  async getSoTay() {
    return this.get('/notebook');
  }

  async luuSoTay(tu) {
    return this.post('/notebook', tu);
  }

  async boSoTay(tu) {
    return this.del(`/notebook/${encodeURIComponent(tu)}`);
  }

  async ghiChuSoTay(tu, ghiChu) {
    return this.put(`/notebook/${encodeURIComponent(tu)}/ghi-chu`, { ghi_chu: ghiChu });
  }

  /** Gộp sổ tay đang ở localStorage vào tài khoản, trả về bản hợp nhất. */
  async dongBoSoTay(danhSach) {
    return this.post('/notebook/dong-bo', { tu: danhSach });
  }

  // --- Cộng đồng (4.39) ---
  async cdDanhSach(q) {
    return this.get('/cong-dong/bai?' + new URLSearchParams(q).toString());
  }
  async cdChiTiet(id) { return this.get(`/cong-dong/bai/${id}`); }
  async cdDangBai(bai) { return this.post('/cong-dong/bai', bai); }
  async cdSuaBai(id, bai) { return this.put(`/cong-dong/bai/${id}`, bai); }
  async cdXoaBai(id) { return this.del(`/cong-dong/bai/${id}`); }
  async cdThich(id) { return this.post(`/cong-dong/bai/${id}/thich`); }
  async cdBinhLuan(id, noiDung, parentId) {
    return this.post(`/cong-dong/bai/${id}/binh-luan`, { noi_dung: noiDung, parent_id: parentId || null });
  }
  async cdXoaBinhLuan(id) { return this.del(`/cong-dong/binh-luan/${id}`); }
  async cdBaoCao(o) { return this.post('/cong-dong/bao-cao', o); }
  async cdKiemDuyet() { return this.get('/cong-dong/kiem-duyet'); }
  async cdDuyetBai(id, o) { return this.put(`/cong-dong/kiem-duyet/bai/${id}`, o); }
  async cdDuyetBinhLuan(id, o) { return this.put(`/cong-dong/kiem-duyet/binh-luan/${id}`, o); }
  async cdHocBong() { return this.get('/cong-dong/hoc-bong'); }
  async cdLuuHocBong(id, hb) {
    return id ? this.put(`/cong-dong/hoc-bong/${id}`, hb) : this.post('/cong-dong/hoc-bong', hb);
  }
  async cdXoaHocBong(id) { return this.del(`/cong-dong/hoc-bong/${id}`); }

  // --- Leaderboard ---
  async getLeaderboard(limit = 50) {
    return this.get(`/leaderboard?limit=${limit}`);
  }

  // --- Profile ---
  async getProfileStats() {
    return this.get('/profile/stats');
  }

  async updateProfile(data) {
    return this.put('/profile/update', data);
  }

  async changePassword(currentPassword, newPassword) {
    return this.put('/profile/password', { current_password: currentPassword, new_password: newPassword });
  }

  async uploadAvatar(dataUrl) {
    return this.put('/profile/avatar', { avatar_url: dataUrl });
  }

  // --- Bài tập giáo viên giao ---
  // Trả về [{ id, lesson_id, title, due_date, note, class_name, submitted, best_score }]
  async getMyAssignments() {
    return this.get('/exercise/my-assignments');
  }

  // --- Nhận xét của giáo viên (chuông thông báo của học viên) ---
  // Trả về { notifications: [{ type, id, topic, teacher_review, review_read_at, created_at }] }
  async getNotifications() {
    return this.get('/exercise/notifications');
  }

  // type = 'exercise' | 'exam'
  async markNotificationRead(type, id) {
    return this.post(`/exercise/notifications/${type}/${id}/read`);
  }

  async markAllNotificationsRead() {
    return this.post('/exercise/notifications/read-all');
  }

  // Chi tiết 1 lần làm bài tập (kèm teacher_review) — dùng cho modal xem nhận xét
  async getExerciseResult(id) {
    return this.get(`/exercise/result/${id}`);
  }

  // --- Dịch Trung-Việt (tab "Dịch Trung-Việt" của Giáo trình Đương đại) ---
  async submitTranslate(lessonId, mode, answers) {
    return this.post('/exercise/translate/submit', { lesson_id: lessonId, mode, answers });
  }

  async getMyTranslate(lessonId, mode) {
    const params = new URLSearchParams({ lesson_id: lessonId });
    if (mode) params.set('mode', mode);
    return this.get(`/exercise/translate/my?${params}`);
  }

  // --- Lớp của học viên (widget "Khoá học của tôi" trên menu người dùng) ---
  async getMyClasses() {
    return this.get('/profile/my-classes');
  }

  /** Vào lớp bằng mã mời giáo viên phát (xem server/routes/profile.js). */
  async vaoLopBangMa(ma) {
    return this.post('/profile/vao-lop', { ma });
  }

  // --- Blog ---
  async getBlogPosts(category) {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    return this.get(`/blog${params}`);
  }

  async getBlogPost(id) {
    return this.get(`/blog/${id}`);
  }

  // --- Gói thành viên & thanh toán (2026-09-09) ---
  // Bảng giá và cấu hình nhận tiền KHÔNG cần đăng nhập: trang gói phải xem được trước khi mua.
  async getBangGia() { return this.get('/noi-dung/goi'); }
  async getQuyenCuaToi() { return this.get('/noi-dung/quyen'); }
  async getCauHinhThanhToan() { return this.get('/thanh-toan/cau-hinh'); }

  async getDonCuaToi() { return this.get('/thanh-toan/don'); }
  async taoDonMua(productMa) { return this.post('/thanh-toan/don', { product_ma: productMa }); }
  async guiBienLai(donId, anh) { return this.post(`/thanh-toan/don/${donId}/anh`, { anh }); }
  async getAnhBienLai(donId) { return this.get(`/thanh-toan/don/${donId}/anh`); }
  async huyDonMua(donId) { return this.del(`/thanh-toan/don/${donId}`); }

  // --- Hồ sơ du học phía HỌC SINH (2026-09-16) ---
  // Mọi endpoint tự lọc theo user đang đăng nhập; `hoSoDuHocCuaToi` trả `{ co: false }` cho
  // người KHÔNG phải học sinh du học — cố ý không phải 404, vì trang Thông tin cá nhân gọi nó
  // cho MỌI học viên để biết có hiện thẻ du học hay không.
  async hoSoDuHocCuaToi() { return this.get('/du-hoc/ho-so-cua-toi'); }
  async luuKhaiBaoDuHoc(data) { return this.put('/du-hoc/khai-bao', data); }
  async guiKhaiBaoDuHoc(data) { return this.post('/du-hoc/gui-khai-bao', data); }
  async guiYeuCauSuaDuHoc(thayDoi, lyDo) { return this.post('/du-hoc/yeu-cau-sua', { thay_doi: thayDoi, ly_do: lyDo }); }
  async docThongBaoDuHoc(id) { return this.post(`/du-hoc/thong-bao/${id}/doc`, {}); }
}

// Singleton instance
const api = new ApiClient();
export default api;
