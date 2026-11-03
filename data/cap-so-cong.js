// Bài 6. Cấp số cộng — dữ liệu bài tập
(function () {
const R = String.raw;

const PARTS = [
  { id: "A", title: "Nhận biết cấp số cộng",
    recap: R`<b>Nhắc lại:</b> $(u_n)$ là cấp số cộng $\Leftrightarrow u_{n+1} = u_n + d$ với mọi $n$, số $d$ không đổi gọi là <b>công sai</b>. Ba số $a, b, c$ (theo thứ tự) lập thành cấp số cộng $\Leftrightarrow a + c = 2b$.` },
  { id: "B", title: "Số hạng tổng quát",
    recap: R`<b>Nhắc lại:</b> $u_n = u_1 + (n - 1)d$. Muốn tìm $u_1$ và $d$, viết các số hạng đề cho theo $u_1$ và $d$ rồi giải hệ.` },
  { id: "C", title: "Tổng n số hạng đầu",
    recap: R`<b>Nhắc lại:</b> tổng $n$ số hạng đầu là $S_n = \dfrac{n(u_1 + u_n)}{2}$ hoặc $S_n = \dfrac{n\big[2u_1 + (n - 1)d\big]}{2}$.` },
  { id: "D", title: "Bài toán thực tế",
    recap: R`<b>Nhắc lại:</b> tìm xem đại lượng nào tăng (hoặc giảm) đều mỗi lần một lượng cố định. Đó là cấp số cộng: xác định $u_1$, $d$, rồi dùng công thức $u_n$ hoặc $S_n$.` }
];

const QS = [
  // ---------- A
  { id: "a1", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Dãy số nào sau đây là cấp số cộng?`,
    opts: [R`$1;\ -3;\ -7;\ -11;\ -15$`, R`$1;\ -3;\ -6;\ -9;\ -12$`, R`$1;\ -2;\ -4;\ -6;\ -8$`, R`$1;\ 2;\ 4;\ 8;\ 16$`],
    hint: R`Lấy số sau trừ số trước. Dãy nào có tất cả các hiệu bằng nhau?`,
    sol: [R`Dãy $1;\ -3;\ -7;\ -11;\ -15$: các hiệu đều bằng $-4$, nên là cấp số cộng với $d = -4$.`, R`Dãy $1;\ -3;\ -6;\dots$ có hiệu $-4$ rồi $-3$; dãy $1;\ -2;\ -4;\dots$ có hiệu $-3$ rồi $-2$; dãy $1;\ 2;\ 4;\dots$ có hiệu $1$ rồi $2$. Các dãy này không phải cấp số cộng.`] },
  { id: "a2", part: "A", lv: "de", type: "num", ans: 15,
    text: R`Cho cấp số cộng $(u_n)$ có $u_1 = 9$ và công sai $d = 2$. Tính $u_4$.`,
    hint: R`Mỗi số hạng bằng số hạng đứng trước cộng thêm $d = 2$.`,
    sol: [R`$u_2 = 9 + 2 = 11,\quad u_3 = 11 + 2 = 13,\quad u_4 = 13 + 2 = 15$.`, R`Hoặc dùng công thức: $u_4 = u_1 + 3d = 9 + 6 = 15$.`] },
  { id: "a3", part: "A", lv: "vua", type: "mc", correct: 1,
    text: R`Dãy số $(u_n)$ nào sau đây là cấp số cộng?`,
    opts: [R`$u_n = n^2$`, R`$u_n = 2n - 1$`, R`$u_n = (-1)^n + 2n$`, R`$u_n = 3^n$`],
    hint: R`Tính $u_{n+1} - u_n$ với từng dãy. Cấp số cộng thì hiệu này là một hằng số (không chứa $n$).`,
    sol: [R`Với $u_n = 2n - 1$: $u_{n+1} - u_n = \big[2(n+1) - 1\big] - (2n - 1) = 2$ không đổi, nên là cấp số cộng với $d = 2$.`, R`$u_n = n^2$: hiệu $= 2n + 1$ thay đổi theo $n$. $u_n = 3^n$: hiệu $= 2\cdot 3^n$ thay đổi. $u_n = (-1)^n + 2n$: $u_1 = 1,\ u_2 = 5,\ u_3 = 5$, hiệu lần lượt $4$ rồi $0$.`] },
  { id: "a4", part: "A", lv: "vua", type: "num", ans: 1, label: "$x =$",
    text: R`Tìm $x$ để ba số $2x,\ 3x + 2,\ 5x + 3$ (theo thứ tự đó) là ba số hạng liên tiếp của một cấp số cộng.`,
    hint: R`Dùng tính chất: $a, b, c$ lập thành cấp số cộng $\Leftrightarrow a + c = 2b$.`,
    sol: [R`$2x + (5x + 3) = 2(3x + 2)$`, R`$\Leftrightarrow 7x + 3 = 6x + 4 \Leftrightarrow x = 1$.`, R`Thử lại: ba số là $2;\ 5;\ 8$, đúng là cấp số cộng với $d = 3$.`] },
  // ---------- B
  { id: "b1", part: "B", lv: "de", type: "num", ans: 22,
    text: R`Cho cấp số cộng $(u_n)$ có $u_1 = -5$ và công sai $d = 3$. Tính $u_{10}$.`,
    hint: R`$u_{10} = u_1 + 9d$.`,
    sol: [R`$u_{10} = u_1 + 9d = -5 + 9\cdot 3 = -5 + 27 = 22$.`] },
  { id: "b2", part: "B", lv: "de", type: "mc", correct: 0,
    text: R`Cho cấp số cộng $3;\ 7;\ 11;\ 15;\ \dots$ Công thức số hạng tổng quát của cấp số cộng này là:`,
    opts: [R`$u_n = 4n - 1$`, R`$u_n = 4n + 3$`, R`$u_n = 3n + 4$`, R`$u_n = 3\cdot 4^{n-1}$`],
    hint: R`Tìm $u_1$ và $d$, rồi thay vào $u_n = u_1 + (n - 1)d$.`,
    sol: [R`$u_1 = 3$, $d = 7 - 3 = 4$.`, R`$u_n = 3 + (n - 1)\cdot 4 = 4n - 1$.`, R`Thử lại: $u_1 = 3,\ u_2 = 7,\ u_3 = 11$. Đúng.`] },
  { id: "b3", part: "B", lv: "vua", type: "num", ans: -11, label: "$u_1 =$",
    text: R`Cho cấp số cộng $(u_n)$ có $u_5 = -43$ và $u_{21} = -171$. Tìm số hạng đầu $u_1$.`,
    hint: R`Viết $u_5 = u_1 + 4d$ và $u_{21} = u_1 + 20d$. Trừ hai phương trình để tìm $d$ trước.`,
    sol: [R`$\begin{cases} u_1 + 4d = -43 \\ u_1 + 20d = -171 \end{cases}$`, R`Trừ vế theo vế: $16d = -128 \Rightarrow d = -8$.`, R`$u_1 = -43 - 4\cdot(-8) = -43 + 32 = -11$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 173, label: "Số hạng thứ",
    text: R`Cho cấp số cộng $(u_n)$ có $u_n = 7n - 3$. Số $1208$ là số hạng thứ bao nhiêu của cấp số cộng?`,
    hint: R`Giải phương trình $7n - 3 = 1208$.`,
    sol: [R`$7n - 3 = 1208 \Leftrightarrow 7n = 1211 \Leftrightarrow n = 173$.`, R`Vậy $1208$ là số hạng thứ $173$.`] },
  { id: "b5", part: "B", lv: "kho", type: "num", ans: 9, label: "$u_{30} =$",
    text: R`Số hạng thứ tám của một cấp số cộng là $75$ và số hạng thứ hai mươi là $39$. Tính $u_{30}$.`,
    hint: R`Từ $u_8 = u_1 + 7d$ và $u_{20} = u_1 + 19d$, tìm $d$ rồi $u_1$.`,
    sol: [R`$u_{20} - u_8 = 12d = 39 - 75 = -36 \Rightarrow d = -3$.`, R`$u_1 = u_8 - 7d = 75 + 21 = 96$.`, R`$u_{30} = u_1 + 29d = 96 - 87 = 9$.`] },
  // ---------- C
  { id: "c1", part: "C", lv: "de", type: "num", ans: 155, label: "$S_{10} =$",
    text: R`Cho cấp số cộng có $u_1 = 2$ và $d = 3$. Tính tổng $10$ số hạng đầu $S_{10}$.`,
    hint: R`$S_{10} = \dfrac{10\big[2u_1 + 9d\big]}{2}$.`,
    sol: [R`$S_{10} = \dfrac{10\,(2\cdot 2 + 9\cdot 3)}{2} = 5\cdot 31 = 155$.`] },
  { id: "c2", part: "C", lv: "vua", type: "num", ans: 4, label: "$u_1 =$",
    text: R`Tổng $20$ số hạng đầu của một cấp số cộng có công sai bằng $3$ là $650$. Tìm số hạng đầu của cấp số cộng.`,
    hint: R`Thay $n = 20$, $d = 3$ vào $S_n = \dfrac{n\big[2u_1 + (n-1)d\big]}{2}$ rồi giải tìm $u_1$.`,
    sol: [R`$650 = \dfrac{20\,(2u_1 + 19\cdot 3)}{2} = 10\,(2u_1 + 57)$.`, R`$\Rightarrow 2u_1 + 57 = 65 \Rightarrow u_1 = 4$.`] },
  { id: "c3", part: "C", lv: "vua", type: "num", ans: 6275, label: "$S_{50} =$",
    text: R`Cho cấp số cộng $(u_n)$ với $u_n = 5n - 2$. Tính $S_{50}$.`,
    hint: R`Tính $u_1$ và $u_{50}$, rồi dùng $S_{50} = \dfrac{50\,(u_1 + u_{50})}{2}$.`,
    sol: [R`$u_1 = 3$, $u_{50} = 5\cdot 50 - 2 = 248$.`, R`$S_{50} = \dfrac{50\,(3 + 248)}{2} = 25\cdot 251 = 6275$.`] },
  { id: "c4", part: "C", lv: "kho", type: "num", ans: 32, label: "$n =$",
    text: R`Cho cấp số cộng $(u_n)$ với $u_n = 5n - 2$. Biết $S_n = 2576$, tìm $n$.`,
    hint: R`$S_n = \dfrac{n(u_1 + u_n)}{2} = \dfrac{n(5n + 1)}{2}$. Giải phương trình bậc hai, nhớ $n$ nguyên dương.`,
    sol: [R`$S_n = \dfrac{n\,(3 + 5n - 2)}{2} = \dfrac{n(5n + 1)}{2}$.`, R`$\dfrac{n(5n+1)}{2} = 2576 \Leftrightarrow 5n^2 + n - 5152 = 0$.`, R`$\Delta = 1 + 4\cdot 5\cdot 5152 = 103041 = 321^2 \Rightarrow n = \dfrac{-1 + 321}{10} = 32$ (loại nghiệm âm).`] },
  // ---------- D
  { id: "d1", part: "D", lv: "de", type: "num", ans: 966.5, tol: 0.001, label: "Độ cao:", unit: "m", show: "966,5",
    text: R`Một ruộng bậc thang có thửa thấp nhất (bậc thứ nhất) ở độ cao $950$ m so với mực nước biển. Mỗi thửa cao hơn thửa ngay dưới nó $1{,}5$ m. Hỏi thửa ruộng ở bậc thứ $12$ có độ cao bao nhiêu mét?`,
    hint: R`Đây là cấp số cộng với $u_1 = 950$, $d = 1{,}5$. Cần tìm $u_{12}$.`,
    sol: [R`$u_{12} = u_1 + 11d = 950 + 11\cdot 1{,}5 = 950 + 16{,}5 = 966{,}5$ m.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 1647, label: "Số ghế:", unit: "ghế",
    text: R`Một hội trường có $35$ ghế ở hàng đầu tiên, $37$ ghế ở hàng thứ hai, $39$ ghế ở hàng thứ ba, cứ tiếp tục theo quy luật như vậy. Có tất cả $27$ hàng ghế. Hỏi hội trường có bao nhiêu ghế?`,
    hint: R`Số ghế mỗi hàng là cấp số cộng $u_1 = 35$, $d = 2$. Cần tính $S_{27}$.`,
    sol: [R`$S_{27} = \dfrac{27\,(2\cdot 35 + 26\cdot 2)}{2} = \dfrac{27\cdot 122}{2} = 27\cdot 61 = 1647$ ghế.`] },
  { id: "d3", part: "D", lv: "vua", type: "num", ans: 2130, label: "Số gạch:", unit: "viên",
    text: R`Một cầu thang bằng gạch có $30$ bậc. Bậc dưới cùng cần $100$ viên gạch, mỗi bậc tiếp theo cần ít hơn $2$ viên so với bậc ngay dưới nó. Cần tất cả bao nhiêu viên gạch để xây cầu thang?`,
    hint: R`Cấp số cộng $u_1 = 100$, $d = -2$, có $30$ số hạng.`,
    sol: [R`Bậc trên cùng: $u_{30} = 100 + 29\cdot(-2) = 42$ viên.`, R`Tổng: $S_{30} = \dfrac{30\,(100 + 42)}{2} = 15\cdot 142 = 2130$ viên.`] },
  { id: "d4", part: "D", lv: "kho", type: "num", ans: 30, label: "Số hàng:", unit: "hàng",
    text: R`Một góc khán đài có $2040$ chỗ ngồi. Hàng ghế đầu tiên có $10$ chỗ, mỗi hàng sau có thêm $4$ chỗ so với hàng ngay trước nó. Hỏi góc khán đài có bao nhiêu hàng ghế?`,
    hint: R`Gọi $n$ là số hàng: $S_n = \dfrac{n\big[2\cdot 10 + (n-1)\cdot 4\big]}{2} = 2040$. Giải tìm $n$ nguyên dương.`,
    sol: [R`$\dfrac{n\,(20 + 4n - 4)}{2} = 2040 \Leftrightarrow n(2n + 8) = 2040 \Leftrightarrow n^2 + 4n - 1020 = 0$.`, R`$\Delta' = 4 + 1020 = 1024 = 32^2 \Rightarrow n = -2 + 32 = 30$ (loại nghiệm âm).`, R`Vậy có $30$ hàng ghế.`] }
];

// ---------- LÝ THUYẾT
const { def, formula, note, ex } = window.T;

const THEORY = [
  { id: "dinh-nghia", title: "Cấp số cộng là gì?",
    html: def("Định nghĩa", R`<p><b>Cấp số cộng</b> là một dãy số (hữu hạn hoặc vô hạn) mà kể từ số hạng thứ hai, mỗi số hạng đều bằng số hạng đứng ngay trước nó <b>cộng với một số $d$ không đổi</b>.</p>`)
      + formula(R`u_{n+1} = u_n + d \quad (\forall n \ge 1)`)
      + R`<p>Số $d$ gọi là <b>công sai</b>. Muốn tìm công sai, lấy một số hạng trừ số hạng đứng ngay trước nó: $d = u_{n+1} - u_n$.</p>`
      + note(R`Muốn chứng minh $(u_n)$ là cấp số cộng, ta chứng minh hiệu $u_{n+1} - u_n$ là một hằng số (không phụ thuộc $n$).`)
      + ex(R`<b>Ví dụ 1.</b> Dãy nào là cấp số cộng? &nbsp;a) $1; -3; -7; -11; -15$ &nbsp;&nbsp;b) $1; -3; -6; -9; -12$`,
           R`<p>a) Các hiệu đều bằng $-4$: là cấp số cộng với $d = -4$.</p><p>b) $-3 - 1 = -4$ nhưng $-6 - (-3) = -3$: không phải cấp số cộng.</p>`)
      + ex(R`<b>Ví dụ 2.</b> Chứng minh dãy $u_n = 2n - 1$ là cấp số cộng.`,
           R`<p>$u_{n+1} - u_n = \big[2(n + 1) - 1\big] - (2n - 1)$ $= 2$ không đổi.</p><p>Vậy $(u_n)$ là cấp số cộng với $u_1 = 1$, $d = 2$.</p>`) },

  { id: "tinh-chat", title: "Tính chất ba số hạng liên tiếp",
    html: def("Định lí", R`<p>Trong một cấp số cộng, kể từ số hạng thứ hai, mỗi số hạng là <b>trung bình cộng</b> của hai số hạng đứng kề nó:</p>`)
      + formula(R`u_k = \frac{u_{k-1} + u_{k+1}}{2}`)
      + note(R`<b>Hệ quả:</b> ba số $a, b, c$ (theo thứ tự đó) lập thành cấp số cộng $\iff a + c = 2b$.`)
      + ex(R`<b>Ví dụ 3.</b> Tìm $x$ để $10 - 3x,\ 2x^2 + 3,\ 7 - 4x$ (theo thứ tự đó) lập thành cấp số cộng.`,
           R`<p>$(10 - 3x) + (7 - 4x) = 2(2x^2 + 3)$ $\iff 17 - 7x = 4x^2 + 6$ $\iff 4x^2 + 7x - 11 = 0$.</p><p>$\Delta = 49 + 176 = 225$, nên $x = 1$ hoặc $x = -\dfrac{11}{4}$.</p><p>Thử với $x = 1$: ba số là $7, 5, 3$ (công sai $-2$). Đúng.</p>`) },

  { id: "so-hang-tong-quat", title: "Số hạng tổng quát",
    html: def("Định lí", R`<p>Nếu cấp số cộng có số hạng đầu $u_1$ và công sai $d$ thì:</p>`)
      + formula(R`u_n = u_1 + (n - 1)\,d \qquad (n \ge 2)`)
      + note(R`Nếu đề cho hai số hạng bất kì (ví dụ $u_5$ và $u_{21}$), hãy viết cả hai theo $u_1$ và $d$ rồi giải hệ hai phương trình.`)
      + ex(R`<b>Ví dụ 4.</b> Cho cấp số cộng có $u_1 = 3$, $d = 4$. Tính $u_{20}$. Số $2025$ có phải là một số hạng của cấp số cộng không?`,
           R`<p>$u_{20} = 3 + 19\cdot 4 = 79$.</p><p>Giả sử $u_n = 2025$: $3 + (n - 1)\cdot 4 = 2025$ $\iff n - 1 = 505{,}5$.</p><p>$n$ không phải số nguyên dương, nên $2025$ <b>không</b> là số hạng của cấp số cộng.</p>`) },

  { id: "tong", title: "Tổng n số hạng đầu",
    html: def("Định lí", R`<p>Gọi $S_n = u_1 + u_2 + \dots + u_n$ là tổng $n$ số hạng đầu của cấp số cộng. Khi đó:</p>`)
      + formula(R`S_n = \frac{n\,(u_1 + u_n)}{2} = \frac{n\big[2u_1 + (n - 1)\,d\big]}{2}`)
      + note(R`Dùng công thức đầu khi đã biết số hạng cuối $u_n$; dùng công thức sau khi chỉ biết $u_1$ và $d$.`)
      + ex(R`<b>Ví dụ 5.</b> Tính tổng $1 + 2 + 3 + \dots + 100$.`,
           R`<p>Đây là cấp số cộng $u_1 = 1$, $u_{100} = 100$.</p><p>$S_{100} = \dfrac{100\,(1 + 100)}{2} = 5050$.</p>`)
      + ex(R`<b>Ví dụ 6.</b> Tính tổng $20$ số hạng đầu của cấp số cộng $5, 8, 11, \dots$`,
           R`<p>$u_1 = 5$, $d = 3$.</p><p>$S_{20} = \dfrac{20\,(2\cdot 5 + 19\cdot 3)}{2}$ $= 10\cdot 67 = 670$.</p>`) },

  { id: "thuc-te", title: "Vận dụng vào bài toán thực tế",
    html: R`<p>Khi một đại lượng <b>tăng (hoặc giảm) đều</b> mỗi lần một lượng cố định thì đó là cấp số cộng: lương tăng thêm mỗi năm một khoản, mỗi hàng ghế nhiều hơn hàng trước vài ghế, mỗi bậc thang cao hơn bậc dưới…</p>
      <ol><li>Xác định $u_1$ (giá trị ban đầu) và $d$ (lượng tăng mỗi lần, nếu giảm thì $d$ âm).</li>
      <li>Hỏi giá trị tại lần thứ $n$: dùng $u_n$. Hỏi tổng cộng: dùng $S_n$.</li></ol>`
      + ex(R`<b>Ví dụ 7.</b> Năm thứ nhất bác Tư nhận lương $240$ triệu đồng, từ năm thứ hai mỗi năm tăng thêm $12$ triệu. Tính lương năm thứ $11$.`,
           R`<p>Lương các năm là cấp số cộng $u_1 = 240$, $d = 12$.</p><p>$u_{11} = 240 + 10\cdot 12 = 360$ triệu đồng.</p>`) }
];

const SUMMARY = R`<ul>
  <li>Định nghĩa: $u_{n+1} = u_n + d$, công sai $d = u_{n+1} - u_n$.</li>
  <li>Số hạng tổng quát: $u_n = u_1 + (n - 1)d$.</li>
  <li>Ba số $a, b, c$ lập thành cấp số cộng $\iff a + c = 2b$.</li>
  <li>Tổng: $S_n = \dfrac{n(u_1 + u_n)}{2}$ $= \dfrac{n\big[2u_1 + (n-1)d\big]}{2}$.</li>
</ul>`;

// ---------- ĐỀ 2
const QS2 = [
  { id: "a1", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Dãy số nào sau đây là cấp số cộng?`,
    opts: [R`$2;\ 5;\ 8;\ 11;\ 14$`, R`$2;\ 4;\ 8;\ 16;\ 32$`, R`$1;\ 3;\ 6;\ 10;\ 15$`, R`$5;\ 3;\ 2;\ 0;\ -1$`],
    hint: R`Lấy số sau trừ số trước. Dãy nào có tất cả các hiệu bằng nhau?`,
    sol: [R`$2;\ 5;\ 8;\ 11;\ 14$ có các hiệu đều bằng $3$: là cấp số cộng.`, R`Các dãy còn lại có hiệu thay đổi: $2, 4, 8, 16$; $2, 3, 4, 5$; $-2, -1, -2, -1$.`] },
  { id: "a2", part: "A", lv: "de", type: "num", ans: 8,
    text: R`Cho cấp số cộng $(u_n)$ có $u_1 = -4$ và công sai $d = 3$. Tính $u_5$.`,
    hint: R`$u_5 = u_1 + 4d$.`,
    sol: [R`$u_5 = -4 + 4\cdot 3 = 8$.`] },
  { id: "a3", part: "A", lv: "vua", type: "mc", correct: 0,
    text: R`Dãy số $(u_n)$ nào sau đây là cấp số cộng?`,
    opts: [R`$u_n = 5 - 3n$`, R`$u_n = n^2 + 1$`, R`$u_n = 2^n$`, R`$u_n = \dfrac{1}{n}$`],
    hint: R`Tính $u_{n+1} - u_n$ cho từng dãy.`,
    sol: [R`$u_{n+1} - u_n = \big[5 - 3(n+1)\big] - (5 - 3n) = -3$ không đổi: là cấp số cộng với $d = -3$.`, R`$n^2 + 1$ có hiệu $2n + 1$; $2^n$ có hiệu $2^n$; $\dfrac{1}{n}$ có hiệu $-\dfrac{1}{n(n+1)}$. Các hiệu này thay đổi theo $n$.`] },
  { id: "a4", part: "A", lv: "vua", type: "num", ans: 4, label: "$x =$",
    text: R`Tìm $x$ để ba số $x - 1,\ 2x + 1,\ 4x - 1$ (theo thứ tự đó) lập thành một cấp số cộng.`,
    hint: R`$a, b, c$ lập thành cấp số cộng $\Leftrightarrow a + c = 2b$.`,
    sol: [R`$(x - 1) + (4x - 1) = 2(2x + 1)$ $\Leftrightarrow 5x - 2 = 4x + 2$ $\Leftrightarrow x = 4$.`, R`Thử lại: $3;\ 9;\ 15$, công sai $6$. Đúng.`] },
  { id: "b1", part: "B", lv: "de", type: "num", ans: -21,
    text: R`Cho cấp số cộng có $u_1 = 7$ và $d = -2$. Tính $u_{15}$.`,
    hint: R`$u_{15} = u_1 + 14d$.`,
    sol: [R`$u_{15} = 7 + 14\cdot(-2) = 7 - 28 = -21$.`] },
  { id: "b2", part: "B", lv: "de", type: "mc", correct: 0,
    text: R`Cho cấp số cộng $10;\ 7;\ 4;\ 1;\ \dots$ Công thức số hạng tổng quát là:`,
    opts: [R`$u_n = 13 - 3n$`, R`$u_n = 10 - 3n$`, R`$u_n = 3n + 7$`, R`$u_n = 10\cdot(-3)^{n-1}$`],
    hint: R`$u_1 = 10$, $d = -3$. Thay vào $u_n = u_1 + (n - 1)d$.`,
    sol: [R`$u_n = 10 + (n - 1)(-3) = 13 - 3n$.`, R`Thử lại: $u_1 = 10,\ u_2 = 7$. Đúng.`] },
  { id: "b3", part: "B", lv: "vua", type: "num", ans: -1, label: "$u_1 =$",
    text: R`Cho cấp số cộng có $u_3 = 7$ và $u_{10} = 35$. Tìm $u_1$.`,
    hint: R`$u_{10} - u_3 = 7d$.`,
    sol: [R`$7d = 35 - 7 = 28 \Rightarrow d = 4$.`, R`$u_1 = u_3 - 2d = 7 - 8 = -1$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 505, label: "Số hạng thứ",
    text: R`Cho cấp số cộng có $u_n = 4n + 5$. Số $2025$ là số hạng thứ bao nhiêu?`,
    hint: R`Giải $4n + 5 = 2025$.`,
    sol: [R`$4n + 5 = 2025 \Leftrightarrow 4n = 2020 \Leftrightarrow n = 505$.`] },
  { id: "b5", part: "B", lv: "kho", type: "num", ans: 59, label: "$u_{20} =$",
    text: R`Cho cấp số cộng có công sai dương, $u_2 + u_4 = 16$ và $u_1\cdot u_5 = 28$. Tính $u_{20}$.`,
    hint: R`$u_2 + u_4 = 2u_3$ nên $u_3 = 8$. Viết $u_1 = 8 - 2d$, $u_5 = 8 + 2d$.`,
    sol: [R`$u_3 = \dfrac{u_2 + u_4}{2} = 8$.`, R`$(8 - 2d)(8 + 2d) = 28 \Leftrightarrow 64 - 4d^2 = 28 \Leftrightarrow d^2 = 9$. Vì $d > 0$ nên $d = 3$.`, R`$u_1 = 8 - 6 = 2$, $u_{20} = 2 + 19\cdot 3 = 59$.`] },
  { id: "c1", part: "C", lv: "de", type: "num", ans: 190, label: "$S_{10} =$",
    text: R`Cho cấp số cộng có $u_1 = 1$, $d = 4$. Tính $S_{10}$.`,
    hint: R`$S_{10} = \dfrac{10\,(2u_1 + 9d)}{2}$.`,
    sol: [R`$S_{10} = \dfrac{10\,(2 + 36)}{2} = 5\cdot 38 = 190$.`] },
  { id: "c2", part: "C", lv: "vua", type: "num", ans: 9, label: "$u_1 =$",
    text: R`Tổng $15$ số hạng đầu của một cấp số cộng có công sai $2$ là $345$. Tìm số hạng đầu.`,
    hint: R`$345 = \dfrac{15\,(2u_1 + 14\cdot 2)}{2}$.`,
    sol: [R`$690 = 15\,(2u_1 + 28) \Rightarrow 2u_1 + 28 = 46 \Rightarrow u_1 = 9$.`] },
  { id: "c3", part: "C", lv: "vua", type: "num", ans: 610, label: "Tổng:",
    text: R`Tính tổng $S = 2 + 5 + 8 + \dots + 59$.`,
    hint: R`Đây là cấp số cộng $u_1 = 2$, $d = 3$, số hạng cuối $59$. Tìm số số hạng $n$ trước.`,
    sol: [R`$2 + (n - 1)\cdot 3 = 59 \Rightarrow n = 20$.`, R`$S = \dfrac{20\,(2 + 59)}{2} = 610$.`] },
  { id: "c4", part: "C", lv: "kho", type: "num", ans: 10, label: "$n =$",
    text: R`Cấp số cộng có $u_1 = 2$, $d = 3$. Tổng của bao nhiêu số hạng đầu bằng $155$?`,
    hint: R`$S_n = \dfrac{n\,[4 + 3(n - 1)]}{2} = \dfrac{n(3n + 1)}{2} = 155$.`,
    sol: [R`$n(3n + 1) = 310 \Leftrightarrow 3n^2 + n - 310 = 0$.`, R`$\Delta = 1 + 3720 = 3721 = 61^2$, $n = \dfrac{-1 + 61}{6} = 10$.`] },
  { id: "d1", part: "D", lv: "de", type: "num", ans: 39, label: "Số ghế:", unit: "ghế",
    text: R`Một rạp hát có $20$ hàng ghế. Hàng thứ nhất có $20$ ghế, mỗi hàng sau hơn hàng trước $1$ ghế. Hàng cuối cùng có bao nhiêu ghế?`,
    hint: R`Cấp số cộng $u_1 = 20$, $d = 1$. Tính $u_{20}$.`,
    sol: [R`$u_{20} = 20 + 19\cdot 1 = 39$ ghế.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 35.4, tol: 0.001, label: "Số tiền:", unit: "triệu đồng", show: "35,4",
    text: R`Rạp hát ở câu trên bán hết vé, mỗi vé $60$ nghìn đồng. Rạp thu được bao nhiêu triệu đồng?`,
    hint: R`Tính tổng số ghế $S_{20}$ rồi nhân với giá vé.`,
    sol: [R`$S_{20} = \dfrac{20\,(20 + 39)}{2} = 590$ ghế.`, R`Số tiền: $590\cdot 60 = 35\,400$ nghìn đồng $= 35{,}4$ triệu đồng.`] },
  { id: "d3", part: "D", lv: "kho", type: "num", ans: 8, label: "Số năm:", unit: "năm",
    text: R`Anh Nam nhận lương khởi điểm $35\,000$ đô la một năm, mỗi năm được tăng thêm $1\,400$ đô la. Sau bao nhiêu năm làm việc thì tổng lương anh nhận được là $319\,200$ đô la?`,
    hint: R`Lương các năm là cấp số cộng $u_1 = 35\,000$, $d = 1\,400$. Giải $S_n = 319\,200$.`,
    sol: [R`$\dfrac{n\,[70\,000 + 1\,400(n - 1)]}{2} = 319\,200$ $\Leftrightarrow n^2 + 49n - 456 = 0$ (chia hai vế cho $700$).`, R`$\Delta = 2401 + 1824 = 4225 = 65^2$, $n = \dfrac{-49 + 65}{2} = 8$ năm.`] }
];

// ---------- ĐỀ 3
const QS3 = [
  { id: "a1", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Cấp số cộng $3;\ 7;\ 11;\ 15;\ \dots$ có công sai là:`,
    opts: [R`$d = 4$`, R`$d = 3$`, R`$d = 7$`, R`$d = -4$`],
    hint: R`$d = u_2 - u_1$.`,
    sol: [R`$d = 7 - 3 = 4$.`] },
  { id: "a2", part: "A", lv: "de", type: "num", ans: 27,
    text: R`Cho cấp số cộng có $u_1 = 2$, $d = 5$. Tính $u_6$.`,
    hint: R`$u_6 = u_1 + 5d$.`,
    sol: [R`$u_6 = 2 + 5\cdot 5 = 27$.`] },
  { id: "a3", part: "A", lv: "vua", type: "mc", correct: 3,
    text: R`Dãy số nào sau đây <b>không</b> là cấp số cộng?`,
    opts: [R`$u_n = 3n + 1$`, R`$u_n = 7 - 2n$`, R`$u_n = \dfrac{n}{2}$`, R`$u_n = n^2 - n$`],
    hint: R`Dãy nào có hiệu $u_{n+1} - u_n$ phụ thuộc vào $n$?`,
    sol: [R`$u_n = n^2 - n$: $u_1 = 0,\ u_2 = 2,\ u_3 = 6$, hiệu $2$ rồi $4$, nên không là cấp số cộng.`, R`Ba dãy còn lại có hiệu lần lượt là $3$, $-2$, $\dfrac{1}{2}$ (không đổi).`] },
  { id: "a4", part: "A", lv: "vua", type: "num", ans: 2, label: "$x =$",
    text: R`Tìm $x$ để ba số $x + 2,\ 2x + 3,\ 5x$ (theo thứ tự đó) lập thành một cấp số cộng.`,
    hint: R`$a + c = 2b$.`,
    sol: [R`$(x + 2) + 5x = 2(2x + 3)$ $\Leftrightarrow 6x + 2 = 4x + 6$ $\Leftrightarrow x = 2$.`, R`Thử lại: $4;\ 7;\ 10$. Đúng.`] },
  { id: "b1", part: "B", lv: "de", type: "num", ans: 30,
    text: R`Cho cấp số cộng có $u_1 = 100$, $d = -7$. Tính $u_{11}$.`,
    hint: R`$u_{11} = u_1 + 10d$.`,
    sol: [R`$u_{11} = 100 + 10\cdot(-7) = 30$.`] },
  { id: "b2", part: "B", lv: "de", type: "mc", correct: 0,
    text: R`Cấp số cộng có $u_n = 5n - 2$. Số hạng đầu và công sai là:`,
    opts: [R`$u_1 = 3,\ d = 5$`, R`$u_1 = -2,\ d = 5$`, R`$u_1 = 5,\ d = -2$`, R`$u_1 = 3,\ d = -2$`],
    hint: R`Thay $n = 1$ để được $u_1$; $d = u_2 - u_1$.`,
    sol: [R`$u_1 = 5 - 2 = 3$, $u_2 = 8$, nên $d = 5$.`] },
  { id: "b3", part: "B", lv: "vua", type: "num", ans: 74, label: "$u_{20} =$",
    text: R`Cho cấp số cộng có $u_4 = 10$ và $u_9 = 30$. Tính $u_{20}$.`,
    hint: R`$u_9 - u_4 = 5d$.`,
    sol: [R`$5d = 20 \Rightarrow d = 4$; $u_1 = u_4 - 3d = -2$.`, R`$u_{20} = -2 + 19\cdot 4 = 74$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 26, label: "Số hạng thứ",
    text: R`Cho cấp số cộng có $u_1 = -3$, $d = 4$. Số $97$ là số hạng thứ bao nhiêu?`,
    hint: R`Giải $-3 + (n - 1)\cdot 4 = 97$.`,
    sol: [R`$(n - 1)\cdot 4 = 100 \Leftrightarrow n - 1 = 25 \Leftrightarrow n = 26$.`] },
  { id: "b5", part: "B", lv: "kho", type: "num", ans: -295, label: "$u_{100} =$",
    text: R`Cho cấp số cộng thỏa mãn $\begin{cases} u_5 + 3u_3 - u_2 = -21 \\ 3u_7 - 2u_4 = -34 \end{cases}$. Tính $u_{100}$.`,
    hint: R`Viết mọi số hạng theo $u_1$ và $d$, ví dụ $u_5 = u_1 + 4d$.`,
    sol: [R`Phương trình 1: $(u_1 + 4d) + 3(u_1 + 2d) - (u_1 + d) = 3u_1 + 9d = -21$, tức $u_1 + 3d = -7$.`, R`Phương trình 2: $3(u_1 + 6d) - 2(u_1 + 3d) = u_1 + 12d = -34$.`, R`Trừ vế: $9d = -27 \Rightarrow d = -3$, $u_1 = 2$.`, R`$u_{100} = 2 + 99\cdot(-3) = -295$.`] },
  { id: "c1", part: "C", lv: "de", type: "num", ans: 136, label: "$S_8 =$",
    text: R`Tính tổng $8$ số hạng đầu của cấp số cộng $3;\ 7;\ 11;\ \dots$`,
    hint: R`$u_1 = 3$, $d = 4$, $S_8 = \dfrac{8\,(2u_1 + 7d)}{2}$.`,
    sol: [R`$S_8 = \dfrac{8\,(6 + 28)}{2} = 4\cdot 34 = 136$.`] },
  { id: "c2", part: "C", lv: "vua", type: "num", ans: 1425, label: "$S_{30} =$",
    text: R`Cho cấp số cộng $u_n = 3n + 1$. Tính $S_{30}$.`,
    hint: R`Tính $u_1$ và $u_{30}$.`,
    sol: [R`$u_1 = 4$, $u_{30} = 91$.`, R`$S_{30} = \dfrac{30\,(4 + 91)}{2} = 15\cdot 95 = 1425$.`] },
  { id: "c3", part: "C", lv: "vua", type: "num", ans: 246, label: "$S_{12} =$",
    text: R`Cấp số cộng có $u_1 = 4$ và $u_{12} = 37$. Tính tổng $12$ số hạng đầu.`,
    hint: R`Đã biết số hạng đầu và cuối: $S_{12} = \dfrac{12\,(u_1 + u_{12})}{2}$.`,
    sol: [R`$S_{12} = \dfrac{12\,(4 + 37)}{2} = 6\cdot 41 = 246$.`] },
  { id: "c4", part: "C", lv: "kho", type: "num", ans: 41, label: "$u_{10} =$",
    text: R`Tổng $n$ số hạng đầu của một cấp số cộng là $S_n = 2n^2 + 3n$. Tính $u_{10}$.`,
    hint: R`$u_{10} = S_{10} - S_9$.`,
    sol: [R`$S_{10} = 200 + 30 = 230$, $S_9 = 162 + 27 = 189$.`, R`$u_{10} = 230 - 189 = 41$.`] },
  { id: "d1", part: "D", lv: "de", type: "num", ans: 48, label: "Số ghế:", unit: "ghế",
    text: R`Hàng ghế đầu của một hội trường có $15$ ghế, mỗi hàng sau nhiều hơn hàng trước $3$ ghế. Hàng thứ $12$ có bao nhiêu ghế?`,
    hint: R`Cấp số cộng $u_1 = 15$, $d = 3$. Tính $u_{12}$.`,
    sol: [R`$u_{12} = 15 + 11\cdot 3 = 48$ ghế.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 234, label: "Số viên gạch:", unit: "viên",
    text: R`Một bức tường trang trí hình thang rộng $2{,}4$ m ở đáy và $1{,}2$ m ở đỉnh, ốp bằng gạch vuông cạnh $10$ cm. Mỗi hàng phía trên ít hơn hàng ngay dưới $1$ viên. Cần bao nhiêu viên gạch?`,
    hint: R`Hàng đáy có $240 : 10 = 24$ viên, hàng đỉnh có $12$ viên. Có bao nhiêu hàng?`,
    sol: [R`Hàng đáy $24$ viên, hàng đỉnh $12$ viên, mỗi hàng giảm $1$ viên, nên có $24 - 12 + 1 = 13$ hàng.`, R`Tổng: $S_{13} = \dfrac{13\,(24 + 12)}{2} = 234$ viên.`] },
  { id: "d3", part: "D", lv: "kho", type: "num", ans: 89, label: "Số tiếng:", unit: "tiếng",
    text: R`Chuông đồng hồ đánh số tiếng đúng bằng số giờ khi đến giờ đúng, và cứ mỗi lúc $30$ phút (không phải giờ đúng) thì đánh $1$ tiếng. Từ lúc $1$ giờ đêm đến lúc $12$ giờ trưa (tính cả hai lúc đó), chuông đánh tất cả bao nhiêu tiếng?`,
    hint: R`Tách làm hai phần: các giờ đúng $1 + 2 + \dots + 12$, và các lúc $1$ giờ $30$, $2$ giờ $30$, …, $11$ giờ $30$.`,
    sol: [R`Giờ đúng: $1 + 2 + \dots + 12 = \dfrac{12\cdot 13}{2} = 78$ tiếng.`, R`Các lúc rưỡi từ $1$ giờ $30$ đến $11$ giờ $30$: $11$ lần, mỗi lần $1$ tiếng.`, R`Tổng: $78 + 11 = 89$ tiếng.`] }
];

// ---------- LUYỆN TẬP: sinh đề theo mã
function gen(G, r) {
  const { t, lin, par, list, mc } = G;
  const Q = [];
  const sgn = v => (v < 0 ? "- " + Math.abs(v) : "+ " + v);

  // A1. Nhận biết cấp số cộng
  { const a = r.int(-5, 9), d = r.pick([2, 3, 4, 5, -2, -3, -4]);
    const ap = [0, 1, 2, 3, 4].map(i => a + i * d);
    const bump = ap.slice(); bump[2] += r.pick([1, -1]);
    const s = r.pick([1, 2, 3]), geo = [1, 2, 4, 8, 16].map(x => x * s);
    const tri = [0, 1, 3, 6, 10].map(x => a + x);
    const m = mc(r, R`$${list(ap)}$`, [bump, geo, tri].map(l => R`$${list(l)}$`));
    Q.push(Object.assign({ part: "A", lv: "de", type: "mc",
      text: R`Dãy số nào sau đây là cấp số cộng?`,
      hint: R`Lấy số sau trừ số trước. Dãy nào có tất cả các hiệu bằng nhau?`,
      sol: [R`$${list(ap)}$ có các hiệu đều bằng $${d}$: là cấp số cộng với $d = ${d}$.`, R`Các dãy còn lại có hiệu thay đổi.`] }, m)); }

  // A2. Tính u_k
  { const a = r.int(-9, 9), d = r.nz(-6, 6), k = r.int(5, 15), v = a + (k - 1) * d;
    Q.push({ part: "A", lv: "de", type: "num", ans: v, label: R`$u_{${k}} =$`,
      text: R`Cho cấp số cộng có $u_1 = ${a}$ và $d = ${d}$. Tính $u_{${k}}$.`,
      hint: R`$u_{${k}} = u_1 + ${k - 1}d$.`,
      sol: [R`$u_{${k}} = ${a} + ${k - 1}\cdot ${par(d)} = ${v}$.`] }); }

  // A3. Tìm x để ba số lập thành cấp số cộng
  { let p1, p2, p3;
    do { p1 = r.int(1, 5); p2 = r.int(1, 5); p3 = r.int(1, 5); } while (p1 + p3 - 2 * p2 === 0);
    const x0 = r.int(-4, 6), A = r.int(-5, 8), d = r.nz(-5, 6);
    const v = [A, A + d, A + 2 * d], P = [p1, p2, p3], Qc = v.map((val, i) => val - P[i] * x0);
    const e = i => lin(P[i], Qc[i], "x");
    const L = P[0] + P[2] - 2 * P[1], Rr = 2 * Qc[1] - Qc[0] - Qc[2];
    Q.push({ part: "A", lv: "vua", type: "num", ans: x0, label: "$x =$",
      text: R`Tìm $x$ để ba số $${e(0)},\ ${e(1)},\ ${e(2)}$ (theo thứ tự đó) lập thành một cấp số cộng.`,
      hint: R`$a, b, c$ lập thành cấp số cộng $\Leftrightarrow a + c = 2b$.`,
      sol: [R`$(${e(0)}) + (${e(2)}) = 2(${e(1)})$`, R`$\Leftrightarrow ${lin(L, 0, "x")} = ${Rr} \Leftrightarrow x = ${x0}$.`, R`Thử lại: $${list(v)}$ có công sai $${d}$.`] }); }

  // B1. Công thức tổng quát từ dãy liệt kê
  { const a = r.nz(-5, 9), d = r.pick([2, 3, 4, 5, -2, -3, -4]);
    const right = lin(d, a - d);
    const w = [lin(d, a), lin(-d, a + d), lin(a === d ? a + 1 : a, d)];
    const m = mc(r, R`$u_n = ${right}$`, w.map(s => R`$u_n = ${s}$`));
    Q.push(Object.assign({ part: "B", lv: "de", type: "mc",
      text: R`Cho cấp số cộng $${list([a, a + d, a + 2 * d, a + 3 * d])};\ \dots$ Công thức số hạng tổng quát là:`,
      hint: R`Tìm $u_1$ và $d$, rồi thay vào $u_n = u_1 + (n - 1)d$.`,
      sol: [R`$u_1 = ${a}$, $d = ${d}$.`, R`$u_n = ${a} + (n - 1)\cdot ${par(d)} = ${right}$.`] }, m)); }

  // B2. Biết hai số hạng, tìm số hạng khác
  { const u1 = r.int(-10, 10), d = r.nz(-6, 6), i = r.int(2, 6), j = i + r.int(3, 9), k = r.int(15, 30);
    const u = n => u1 + (n - 1) * d;
    Q.push({ part: "B", lv: "vua", type: "num", ans: u(k), label: R`$u_{${k}} =$`,
      text: R`Cho cấp số cộng có $u_{${i}} = ${u(i)}$ và $u_{${j}} = ${u(j)}$. Tính $u_{${k}}$.`,
      hint: R`$u_{${j}} - u_{${i}} = ${j - i}d$.`,
      sol: [R`$${j - i}d = ${u(j)} - ${par(u(i))} = ${u(j) - u(i)} \Rightarrow d = ${d}$.`, R`$u_1 = u_{${i}} - ${i - 1}d = ${u1}$.`, R`$u_{${k}} = ${u1} + ${k - 1}\cdot ${par(d)} = ${u(k)}$.`] }); }

  // B3. Số đã cho là số hạng thứ mấy
  { const a = r.int(2, 9), b = r.int(-9, 9), k = r.int(20, 300), v = a * k + b;
    Q.push({ part: "B", lv: "vua", type: "num", ans: k, label: "Số hạng thứ",
      text: R`Cho cấp số cộng có $u_n = ${lin(a, b)}$. Số $${v}$ là số hạng thứ bao nhiêu?`,
      hint: R`Giải phương trình $${lin(a, b)} = ${v}$.`,
      sol: [R`$${a}n = ${v} ${sgn(-b)} = ${v - b} \Leftrightarrow n = ${k}$.`] }); }

  // C1. Tính S_n
  { const a = r.int(-5, 10), d = r.nz(-4, 6), n = r.int(8, 25), S = n * (2 * a + (n - 1) * d) / 2;
    Q.push({ part: "C", lv: "de", type: "num", ans: S, label: R`$S_{${n}} =$`,
      text: R`Cho cấp số cộng có $u_1 = ${a}$, $d = ${d}$. Tính tổng $${n}$ số hạng đầu.`,
      hint: R`$S_{${n}} = \dfrac{${n}\,(2u_1 + ${n - 1}d)}{2}$.`,
      sol: [R`$S_{${n}} = \dfrac{${n}\,(2\cdot ${par(a)} + ${n - 1}\cdot ${par(d)})}{2} = \dfrac{${n}\cdot ${par(2 * a + (n - 1) * d)}}{2} = ${S}$.`] }); }

  // C2. Tổng dãy liệt kê
  { const a = r.int(1, 9), d = r.int(2, 6), n = r.int(10, 30), L = a + (n - 1) * d, S = n * (a + L) / 2;
    Q.push({ part: "C", lv: "vua", type: "num", ans: S, label: "Tổng:",
      text: R`Tính tổng $S = ${a} + ${a + d} + ${a + 2 * d} + \dots + ${L}$.`,
      hint: R`Cấp số cộng $u_1 = ${a}$, $d = ${d}$. Tìm số số hạng $n$ từ $u_n = ${L}$.`,
      sol: [R`$${a} + (n - 1)\cdot ${d} = ${L} \Rightarrow n = ${n}$.`, R`$S = \dfrac{${n}\,(${a} + ${L})}{2} = ${S}$.`] }); }

  // C3. Tìm u1 từ S_n
  { const a = r.int(-5, 12), d = r.nz(-3, 5), n = r.int(10, 20), S = n * (2 * a + (n - 1) * d) / 2;
    Q.push({ part: "C", lv: "vua", type: "num", ans: a, label: "$u_1 =$",
      text: R`Tổng $${n}$ số hạng đầu của một cấp số cộng có công sai $${d}$ là $${S}$. Tìm số hạng đầu.`,
      hint: R`Thay vào $S_n = \dfrac{n\big[2u_1 + (n-1)d\big]}{2}$ rồi giải tìm $u_1$.`,
      sol: [R`$${S} = \dfrac{${n}\,(2u_1 + ${n - 1}\cdot ${par(d)})}{2}$ $\Rightarrow 2u_1 ${sgn((n - 1) * d)} = ${2 * S / n}$`, R`$\Rightarrow u_1 = ${a}$.`] }); }

  // C4. Tìm n từ S_n
  { const a = r.int(1, 9), d = r.int(1, 5), n = r.int(6, 20), S = n * (2 * a + (n - 1) * d) / 2;
    const B = 2 * a - d, D = B * B + 8 * d * S, sq = Math.round(Math.sqrt(D));
    Q.push({ part: "C", lv: "kho", type: "num", ans: n, label: "$n =$",
      text: R`Cấp số cộng có $u_1 = ${a}$, $d = ${d}$. Tổng của bao nhiêu số hạng đầu bằng $${S}$?`,
      hint: R`$S_n = \dfrac{n\big[${2 * a} + ${d}(n - 1)\big]}{2} = ${S}$. Giải phương trình bậc hai, chọn nghiệm nguyên dương.`,
      sol: [R`$n\big[${2 * a} + ${d}(n - 1)\big] = ${2 * S}$ $\Leftrightarrow ${d === 1 ? "" : d}n^2${B === 0 ? "" : (B > 0 ? " + " : " - ") + (Math.abs(B) === 1 ? "" : Math.abs(B)) + "n"} - ${2 * S} = 0$.`, R`$\Delta = ${par(B)}^2 + 4\cdot ${d}\cdot ${2 * S} = ${D} = ${sq}^2$.`, R`$n = \dfrac{${-B} + ${sq}}{${2 * d}} = ${n}$ (loại nghiệm âm).`] }); }

  // D1. Tổng số ghế
  { const a = r.int(10, 30), d = r.int(1, 4), n = r.int(10, 25), S = n * (2 * a + (n - 1) * d) / 2;
    Q.push({ part: "D", lv: "vua", type: "num", ans: S, label: "Số ghế:", unit: "ghế",
      text: R`Một hội trường có $${n}$ hàng ghế. Hàng đầu có $${a}$ ghế, mỗi hàng sau nhiều hơn hàng trước $${d}$ ghế. Hội trường có tất cả bao nhiêu ghế?`,
      hint: R`Số ghế các hàng là cấp số cộng $u_1 = ${a}$, $d = ${d}$. Tính $S_{${n}}$.`,
      sol: [R`$u_{${n}} = ${a} + ${n - 1}\cdot ${d} = ${a + (n - 1) * d}$.`, R`$S_{${n}} = \dfrac{${n}\,(${a} + ${a + (n - 1) * d})}{2} = ${S}$ ghế.`] }); }

  // D2. Lương tăng đều
  { const u1 = r.pick([120, 150, 180, 200, 240]), d = r.pick([6, 8, 10, 12, 15]), k = r.int(5, 12), v = u1 + (k - 1) * d;
    Q.push({ part: "D", lv: "de", type: "num", ans: v, label: "Lương:", unit: "triệu đồng",
      text: R`Năm đầu đi làm, một người nhận lương $${u1}$ triệu đồng. Từ năm thứ hai, mỗi năm lương tăng thêm $${d}$ triệu đồng. Tính lương năm thứ $${k}$.`,
      hint: R`Cấp số cộng $u_1 = ${u1}$, $d = ${d}$. Tính $u_{${k}}$.`,
      sol: [R`$u_{${k}} = ${u1} + ${k - 1}\cdot ${d} = ${v}$ triệu đồng.`] }); }

  return Q.map((q, i) => Object.assign({ id: "g" + (i + 1) }, q));
}

window.LESSON = { parts: PARTS, sets: [QS, QS2, QS3], gen, theory: THEORY, summary: SUMMARY };
})();
