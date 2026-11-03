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
assets/quiz.js      Nạp bài, chọn mã đề, chấm điểm, thanh chuyển câu, bài trước/sau
assets/gen.js       Công cụ cho bộ sinh đề Luyện tập
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

## Mã đề

Mỗi bài có nhiều đề soạn sẵn và một chế độ Luyện tập sinh số liệu theo mã:

| Link | Đề |
|---|---|
| `bai.html?b=day-so` hoặc `&de=1` | Đề 1 |
| `bai.html?b=day-so&de=2` | Đề 2 (tương tự `de=3`, …) |
| `bai.html?b=day-so&de=lt1234` | Luyện tập, mã 1234 (cùng mã luôn ra cùng đề) |

Thêm `#bai-tap` hoặc `#ly-thuyet` vào cuối link để mở thẳng tab. Trên trang bài có nút “Sao chép link đề này”.
Tiến độ từng đề lưu riêng (`btvn-<slug>`, `btvn-<slug>-de2`, `btvn-<slug>-lt1234`); kết quả gửi thầy ghi rõ mã đề.

Trong `data/<slug>.js`:

```js
const QS = [...], QS2 = [...], QS3 = [...];      // các đề soạn sẵn, cùng PARTS
function gen(G, r) { ...; return [...]; }        // bộ sinh đề Luyện tập (không bắt buộc)
window.LESSON = { parts: PARTS, sets: [QS, QS2, QS3], gen, theory: THEORY, summary: SUMMARY };
```

Nhớ cập nhật `de: <số đề>` cho bài trong `data/catalog.js` để trang chủ hiện đủ trạng thái từng đề.

Bộ sinh đề nhận `G` (công cụ trong `assets/gen.js`: `G.lin`, `G.poly2`, `G.fr`, `G.list`, `G.mc`, `G.show`, …)
và `r` (bộ số ngẫu nhiên theo mã: `r.int(a, b)`, `r.nz(a, b)`, `r.pick(arr)`, `r.shuffle(arr)`).
Mỗi câu sinh ra có cùng định dạng với câu soạn tay; trắc nghiệm dùng `G.mc(r, đúng, [sai...])` để xáo phương án.

## Lý thuyết của bài (không bắt buộc)

Trong `data/<slug>.js`, khai báo `THEORY` và `SUMMARY` rồi đưa vào `window.LESSON`:

```js
const { def, formula, note, ex } = window.T;
const THEORY = [
  { id: "dinh-nghia", title: "Cấp số cộng là gì?",
    html: def("Định nghĩa", R`<p>...</p>`)        // khung định nghĩa/định lí
        + formula(R`u_n = u_1 + (n-1)d`)            // công thức lớn, ở giữa
        + note(R`...`)                              // khung "Chú ý" (bắt đầu bằng <b>..</b> để tự đặt nhãn)
        + ex(R`<b>Ví dụ 1.</b> Đề...`, R`<p>Lời giải...</p>`) }   // lời giải bấm mới mở
];
const SUMMARY = R`<ul><li>...</li></ul>`;          // khung "Ghi nhớ" cuối phần lý thuyết
window.LESSON = { parts: PARTS, questions: QS, theory: THEORY, summary: SUMMARY };
```

Bài có lý thuyết sẽ có 2 tab: Lý thuyết (`#ly-thuyet`) và Bài tập (`#bai-tap`). Học sinh chưa làm câu nào thì mở tab Lý thuyết trước.
Công thức nằm trong dòng không tự xuống dòng, nên chuỗi biến đổi dài hãy tách thành nhiều `$...$` (ví dụ `$A = B$ $\iff C = D$`).

## Định dạng câu hỏi

- Trắc nghiệm: `{ type: "mc", opts: [...], correct: <chỉ số 0-based>, oneCol: true? }`
- Điền số: `{ type: "num", ans: <số>, tol: <sai số cho phép>, show: "<đáp số hiển thị>", label, unit }`
- Chung: `id`, `part`, `lv` (`de` | `vua` | `kho`), `text`, `hint`, `sol` (mảng các bước), tuỳ chọn `fig` (hàm trả về SVG).
- Công thức viết LaTeX trong `$...$`, dùng `` R`...` `` (String.raw) để không phải gõ `\\`.
- Ô điền số nhận: `12`, `-4`, `47,2`, `47.2`, `8/15`, `1.747.625`.

Bài làm của học sinh lưu trong localStorage (khoá `btvn-<slug>`), nên đổi `slug` của bài đã giao sẽ làm mất tiến độ.
