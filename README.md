# BTVN Toán 11

Trang bài tập về nhà theo từng chương: có gợi ý, chấm ngay, lời giải từng bước và kết quả để học sinh gửi lại cho thầy.
Website tĩnh chạy trên GitHub Pages, không cần build.

## Cấu trúc

```
index.html          Trang chủ: các chương (thu gọn được), tìm kiếm, lọc trạng thái, nút "Làm tiếp"
bai.html            Trang bài dùng chung cho mọi bài: bai.html?b=<slug>
data/catalog.js     DANH MỤC chương và bài (sửa file này khi thêm bài/chương)
data/<slug>.js      Câu hỏi của từng bài
assets/style.css    Giao diện
assets/quiz.js      Nạp bài, chấm điểm, thanh chuyển câu, bài trước/sau
bai/*.html          Chỉ để chuyển hướng các link cũ, không cần tạo thêm
```

## Thêm một bài mới (2 bước)

1. Tạo `data/<slug>.js` theo mẫu `data/day-so.js`, kết thúc bằng
   `window.LESSON = { parts: PARTS, questions: QS };`
2. Thêm một dòng vào chương tương ứng trong `data/catalog.js`:
   ```js
   { slug: "gioi-han-day-so", so: "Bài 9", title: "Giới hạn của dãy số",
     formula: "lim u<sub>n</sub>", desc: "Mô tả ngắn.", minutes: 45 }
   ```
   `formula` không bắt buộc. Thêm `soon: true` để bài hiện "Sắp có" khi chưa soạn xong.

Push lên `main`, khoảng 1 phút sau Pages tự cập nhật. Link bài: `.../bai.html?b=<slug>`.

## Thêm một chương

Thêm một khối vào `chapters` trong `data/catalog.js` theo đúng thứ tự trong sách:

```js
{ id: "c3", so: "Chương III", title: "Giới hạn. Hàm số liên tục", lessons: [ ... ] }
```

## Định dạng câu hỏi

- Trắc nghiệm: `{ type: "mc", opts: [...], correct: <chỉ số 0-based>, oneCol: true? }`
- Điền số: `{ type: "num", ans: <số>, tol: <sai số cho phép>, show: "<đáp số hiển thị>", label, unit }`
- Chung: `id`, `part`, `lv` (`de` | `vua` | `kho`), `text`, `hint`, `sol` (mảng các bước), tuỳ chọn `fig` (hàm trả về SVG).
- Công thức viết LaTeX trong `$...$`, dùng `` R`...` `` (String.raw) để không phải gõ `\\`.
- Ô điền số nhận: `12`, `-4`, `47,2`, `47.2`, `8/15`, `1.747.625`.

Bài làm của học sinh lưu trong localStorage (khoá `btvn-<slug>`, tên ở `btvn-ten-hoc-sinh`), nên đổi `slug` của bài đã giao sẽ làm mất tiến độ.
