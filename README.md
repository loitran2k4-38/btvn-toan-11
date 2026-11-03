# BTVN Toán 11

Trang bài tập về nhà (Dãy số, Cấp số cộng, Cấp số nhân), chạy tĩnh trên GitHub Pages, không cần build.

## Cấu trúc

```
index.html          Trang chủ: danh sách bài (đọc từ data/lessons.js)
assets/style.css    Giao diện dùng chung
assets/quiz.js      Bộ chấm bài dùng chung: gợi ý, kiểm tra, lời giải, kết quả
data/lessons.js     Danh sách bài ở trang chủ
data/<slug>.js      Câu hỏi của từng bài (window.LESSON)
bai/<slug>.html     Trang của từng bài (vỏ HTML, nạp data/<slug>.js)
```

## Thêm một bài mới

1. Tạo `data/<slug>.js` theo mẫu `data/day-so.js` (phần, câu hỏi, gợi ý, lời giải).
2. Copy `bai/day-so.html` thành `bai/<slug>.html`, đổi dòng `../data/day-so.js` thành `../data/<slug>.js`.
3. Trong `data/lessons.js`, đổi `status` của bài thành `"open"`.
4. Commit và push lên `main`. GitHub Pages tự cập nhật sau khoảng 1 phút.

## Định dạng câu hỏi

- Trắc nghiệm: `{ type: "mc", opts: [...], correct: <chỉ số 0-based> }`
- Điền số: `{ type: "num", ans: <số>, tol: <sai số cho phép>, show: "<đáp số hiển thị>" }`
- Chung: `id`, `part`, `lv` (`de` | `vua` | `kho`), `text`, `hint`, `sol` (mảng các bước), tuỳ chọn `fig` (hàm trả về SVG).
- Công thức viết bằng LaTeX trong `$...$`, dùng `String.raw` (`R\`...\``) để không phải gõ `\\`.

Bài làm của học sinh lưu trong localStorage của trình duyệt (khoá `btvn-<slug>`).
