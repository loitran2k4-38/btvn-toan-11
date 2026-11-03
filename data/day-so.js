// Bài 5. Dãy số — dữ liệu bài tập
(function () {
const R = String.raw;

function hinhVuong() {
  const u = 9, gap = 8, rows = 3, labelW = 58;
  let y = 6, out = "";
  const widths = [];
  for (let n = 1; n <= rows; n++) {
    const side = n * u;
    let x = labelW;
    out += `<text x="0" y="${y + side / 2 + 4}">Hàng ${n}</text>`;
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++)
        out += `<rect class="cell" x="${x + i * u}" y="${y + j * u}" width="${u}" height="${u}"/>`;
      x += side + gap;
    }
    widths.push(x);
    y += side + 12;
  }
  const W = Math.max(...widths) + 4;
  return `<svg width="${W}" height="${y}" viewBox="0 0 ${W} ${y}" role="img" aria-label="Hàng 1 có 1 hình vuông 1 ô; hàng 2 có 2 hình vuông, mỗi hình 4 ô; hàng 3 có 3 hình vuông, mỗi hình 9 ô">${out}</svg>`;
}


const PARTS = [
  { id: "A", title: "Tính số hạng của dãy số",
    recap: R`<b>Nhắc lại:</b> muốn tính $u_k$ thì thay $n = k$ vào công thức. Với dãy cho bởi <b>hệ thức truy hồi</b>, tính lần lượt $u_2, u_3, \dots$ từ các số hạng đứng trước.` },
  { id: "B", title: "Dự đoán công thức số hạng tổng quát",
    recap: R`<b>Nhắc lại:</b> viết ra vài số hạng đầu, tìm quy luật giữa giá trị $u_n$ và vị trí $n$, rồi thử lại với $n = 1, 2, 3$.` },
  { id: "C", title: "Dãy số tăng, giảm, bị chặn",
    recap: R`<b>Nhắc lại:</b> xét hiệu $u_{n+1} - u_n$. Luôn dương thì dãy <b>tăng</b>, luôn âm thì dãy <b>giảm</b>. Dãy <b>bị chặn</b> khi có hai số $m, M$ sao cho $m \le u_n \le M$ với mọi $n$.` },
  { id: "D", title: "Bài toán thực tế",
    recap: R`<b>Nhắc lại:</b> đọc kỹ đề để viết công thức $u_n$ hoặc hệ thức truy hồi, sau đó thay số để tính.` }
];

const QS = [
  // ---------- A
  { id: "a1", part: "A", lv: "de", type: "num", ans: 11,
    text: R`Cho dãy số $(u_n)$ với $u_n = 2n^2 - 3n + 2$. Tính $u_3$.`,
    hint: R`Thay $n = 3$ vào công thức.`,
    sol: [R`$u_3 = 2\cdot 3^2 - 3\cdot 3 + 2$`, R`$= 18 - 9 + 2 = 11$.`] },
  { id: "a2", part: "A", lv: "de", type: "mc", correct: 2,
    text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{n + (-1)^n}{2n + 1}$. Ba số hạng đầu của dãy là:`,
    opts: [R`$\dfrac{2}{3};\ \dfrac{1}{5};\ \dfrac{4}{7}$`, R`$0;\ \dfrac{1}{5};\ \dfrac{2}{7}$`, R`$0;\ \dfrac{3}{5};\ \dfrac{2}{7}$`, R`$\dfrac{1}{3};\ \dfrac{3}{5};\ \dfrac{2}{7}$`],
    hint: R`Nhớ rằng $(-1)^1 = -1$, $(-1)^2 = 1$, $(-1)^3 = -1$.`,
    sol: [R`$u_1 = \dfrac{1 + (-1)}{3} = 0$`, R`$u_2 = \dfrac{2 + 1}{5} = \dfrac{3}{5}$`, R`$u_3 = \dfrac{3 + (-1)}{7} = \dfrac{2}{7}$`] },
  { id: "a3", part: "A", lv: "vua", type: "num", ans: 41,
    text: R`Cho dãy số $(u_n)$ xác định bởi $\begin{cases} u_1 = 2 \\ u_{n+1} = 3u_n - 1 \end{cases}$. Tính $u_4$.`,
    hint: R`Tính lần lượt: $u_2 = 3u_1 - 1$, rồi $u_3 = 3u_2 - 1$, rồi $u_4$.`,
    sol: [R`$u_2 = 3\cdot 2 - 1 = 5$`, R`$u_3 = 3\cdot 5 - 1 = 14$`, R`$u_4 = 3\cdot 14 - 1 = 41$`] },
  { id: "a4", part: "A", lv: "vua", type: "num", ans: 8,
    text: R`Cho dãy số $(u_n)$ xác định bởi $\begin{cases} u_1 = 1,\ u_2 = -2 \\ u_{n+2} = u_{n+1} - 2u_n \end{cases}$. Tính $u_5$.`,
    hint: R`Cho $n = 1$ ta được $u_3 = u_2 - 2u_1$. Cho $n = 2$ ta được $u_4 = u_3 - 2u_2$. Cứ thế tính tiếp.`,
    sol: [R`$u_3 = u_2 - 2u_1 = -2 - 2\cdot 1 = -4$`, R`$u_4 = u_3 - 2u_2 = -4 - 2\cdot(-2) = 0$`, R`$u_5 = u_4 - 2u_3 = 0 - 2\cdot(-4) = 8$`] },
  { id: "a5", part: "A", lv: "vua", type: "num", ans: 7, label: "Số hạng thứ",
    text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{n + 1}{2n + 1}$. Số $\dfrac{8}{15}$ là số hạng thứ mấy của dãy?`,
    hint: R`Giải phương trình $\dfrac{n+1}{2n+1} = \dfrac{8}{15}$ với $n$ là số nguyên dương.`,
    sol: [R`$\dfrac{n+1}{2n+1} = \dfrac{8}{15} \Leftrightarrow 15(n+1) = 8(2n+1)$`, R`$\Leftrightarrow 15n + 15 = 16n + 8 \Leftrightarrow n = 7$.`, R`Thử lại: $u_7 = \dfrac{8}{15}$. Vậy $\dfrac{8}{15}$ là số hạng thứ 7.`] },
  // ---------- B
  { id: "b1", part: "B", lv: "de", type: "mc", correct: 1,
    text: R`Dãy số $(u_n)$ có năm số hạng đầu là $-1;\ 1;\ -1;\ 1;\ -1$. Công thức số hạng tổng quát phù hợp là:`,
    opts: [R`$u_n = (-1)^{n+1}$`, R`$u_n = (-1)^n$`, R`$u_n = -n$`, R`$u_n = (-1)^{2n}$`],
    hint: R`Thử thay $n = 1$ và $n = 2$ vào từng đáp án, xem đáp án nào cho $-1$ rồi $1$.`,
    sol: [R`Với $u_n = (-1)^n$: $u_1 = -1,\ u_2 = 1,\ u_3 = -1, \dots$ đúng với dãy đã cho.`, R`$(-1)^{n+1}$ cho $u_1 = 1$ (sai dấu); $(-1)^{2n}$ luôn bằng $1$; $-n$ cho $u_2 = -2$.`] },
  { id: "b2", part: "B", lv: "de", type: "mc", correct: 1,
    text: R`Cho dãy số $\begin{cases} u_1 = 3 \\ u_{n+1} = u_n + 2 \end{cases}$. Công thức số hạng tổng quát của dãy là:`,
    opts: [R`$u_n = 3 + 2n$`, R`$u_n = 2n + 1$`, R`$u_n = n + 2$`, R`$u_n = 3\cdot 2^{n-1}$`],
    hint: R`Viết 5 số hạng đầu: $3, 5, 7, \dots$ rồi thử từng đáp án với $n = 1$ và $n = 2$.`,
    sol: [R`Năm số hạng đầu: $3,\ 5,\ 7,\ 9,\ 11$. Mỗi số hạng hơn số trước $2$ đơn vị.`, R`$u_n = 2n + 1$ cho $u_1 = 3,\ u_2 = 5,\ u_3 = 7$: khớp.`, R`$3 + 2n$ cho $u_1 = 5$ (sai); $n + 2$ cho $u_2 = 4$ (sai); $3\cdot 2^{n-1}$ cho $u_2 = 6$ (sai).`] },
  { id: "b3", part: "B", lv: "vua", type: "mc", correct: 2,
    text: R`Cho dãy số $\begin{cases} u_1 = 2 \\ u_{n+1} = 2u_n \end{cases}$. Công thức số hạng tổng quát của dãy là:`,
    opts: [R`$u_n = 2n$`, R`$u_n = 2^{n-1}$`, R`$u_n = 2^n$`, R`$u_n = n^2 + 1$`],
    hint: R`Mỗi số hạng gấp đôi số hạng trước. Viết ra $u_1, u_2, u_3, u_4$.`,
    sol: [R`$u_1 = 2,\ u_2 = 4,\ u_3 = 8,\ u_4 = 16,\ u_5 = 32$`, R`Đó là $2^1, 2^2, 2^3, 2^4, 2^5$, nên $u_n = 2^n$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 125, fig: hinhVuong, label: "$u_5 =$", unit: "đơn vị diện tích",
    text: R`<p>Hàng thứ $n$ gồm $n$ hình vuông, mỗi hình vuông được ghép từ $n \times n$ ô nhỏ (mỗi ô là 1 đơn vị diện tích). Gọi $u_n$ là tổng diện tích các hình vuông ở hàng thứ $n$.</p><p>Hãy tìm quy luật rồi tính $u_5$.</p>`,
    hint: R`Đếm từ hình: hàng 1 có $1$ ô, hàng 2 có $2$ hình, mỗi hình $4$ ô. Hàng 3 thì sao?`,
    sol: [R`$u_1 = 1\cdot 1 = 1,\quad u_2 = 2\cdot 4 = 8,\quad u_3 = 3\cdot 9 = 27,\quad u_4 = 4\cdot 16 = 64$`, R`Hàng thứ $n$ có $n$ hình, mỗi hình $n^2$ ô, nên $u_n = n\cdot n^2 = n^3$.`, R`$u_5 = 5^3 = 125$.`] },
  // ---------- C
  { id: "c1", part: "C", lv: "de", type: "mc", correct: 1, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = -2n + 5$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tính $u_{n+1} = -2(n+1) + 5$ rồi lấy $u_{n+1} - u_n$.`,
    sol: [R`$u_{n+1} - u_n = \big[-2(n+1) + 5\big] - \big[-2n + 5\big] = -2$.`, R`$-2 < 0$ với mọi $n$, nên dãy giảm.`] },
  { id: "c2", part: "C", lv: "vua", type: "mc", correct: 1, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = \dfrac{2n + 5}{n + 2}$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tách: $\dfrac{2n+5}{n+2} = \dfrac{2(n+2) + 1}{n+2} = 2 + \dfrac{1}{n+2}$.`,
    sol: [R`$u_n = 2 + \dfrac{1}{n+2}$.`, R`Khi $n$ tăng thì $n + 2$ tăng, nên $\dfrac{1}{n+2}$ giảm, do đó $u_n$ giảm.`, R`Cách khác: $u_{n+1} - u_n = \dfrac{1}{n+3} - \dfrac{1}{n+2} = \dfrac{-1}{(n+2)(n+3)} < 0$.`] },
  { id: "c3", part: "C", lv: "vua", type: "mc", correct: 2, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = \dfrac{(-1)^{n-1}}{n^2 + 1}$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tính thử $u_1, u_2, u_3$ và để ý dấu của chúng.`,
    sol: [R`$u_1 = \dfrac{1}{2},\quad u_2 = -\dfrac{1}{5},\quad u_3 = \dfrac{1}{10}$.`, R`$u_1 > u_2$ nhưng $u_2 < u_3$: dãy đổi dấu liên tục (dãy đan dấu).`, R`Vậy dãy không tăng cũng không giảm.`] },
  { id: "c4", part: "C", lv: "vua", type: "mc", correct: 2,
    text: R`Dãy số nào sau đây <b>bị chặn</b>?`,
    opts: [R`$u_n = n^2$`, R`$u_n = 2^n$`, R`$u_n = \dfrac{n - 1}{n}$`, R`$u_n = -3n$`],
    hint: R`Viết $\dfrac{n-1}{n} = 1 - \dfrac{1}{n}$. Các dãy còn lại có thể lớn (hoặc nhỏ) tùy ý không?`,
    sol: [R`$u_n = \dfrac{n-1}{n} = 1 - \dfrac{1}{n}$. Vì $0 < \dfrac{1}{n} \le 1$ nên $0 \le u_n < 1$: dãy bị chặn.`, R`$n^2$ và $2^n$ lớn tùy ý (không bị chặn trên); $-3n$ nhỏ tùy ý (không bị chặn dưới).`] },
  { id: "c5", part: "C", lv: "kho", type: "mc", correct: 0,
    text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{an + 2}{n + 1}$, $a$ là số thực. Tìm $a$ để dãy số tăng.`,
    opts: [R`$a > 2$`, R`$a < 2$`, R`$a = 2$`, R`$a > 0$`],
    hint: R`Tách: $\dfrac{an+2}{n+1} = \dfrac{a(n+1) + 2 - a}{n+1} = a + \dfrac{2 - a}{n+1}$. Phân số $\dfrac{1}{n+1}$ giảm khi $n$ tăng.`,
    sol: [R`$u_n = a + \dfrac{2 - a}{n + 1}$.`, R`$u_{n+1} - u_n = (2 - a)\left(\dfrac{1}{n+2} - \dfrac{1}{n+1}\right) = \dfrac{a - 2}{(n+1)(n+2)}$.`, R`Dãy tăng $\Leftrightarrow a - 2 > 0 \Leftrightarrow a > 2$.`] },
  // ---------- D
  { id: "d1", part: "D", lv: "de", type: "num", ans: 512, tol: 0, label: "Số vi khuẩn:", unit: "con",
    text: R`Vi khuẩn E. coli cứ sau 20 phút lại phân đôi một lần. Ban đầu có 1 vi khuẩn. Hỏi sau 3 giờ có bao nhiêu vi khuẩn?`,
    hint: R`3 giờ = 180 phút, tức là có bao nhiêu lần phân đôi? Sau mỗi lần, số vi khuẩn gấp đôi.`,
    sol: [R`3 giờ $= 180$ phút $= 9$ lần phân đôi.`, R`Sau $n$ lần phân đôi có $u_n = 2^n$ vi khuẩn.`, R`$u_9 = 2^9 = 512$ vi khuẩn.`] },
  { id: "d2", show: "47,2", part: "D", lv: "vua", type: "num", ans: 47.2392, tol: 0.06, label: "Giá trị:", unit: "triệu đồng",
    text: R`Một chiếc xe có giá ban đầu 80 triệu đồng. Sau mỗi năm, giá trị xe giảm 10% so với năm trước đó. Hỏi sau 5 năm giá trị xe còn bao nhiêu triệu đồng? (Làm tròn đến hàng phần mười.)`,
    hint: R`Giảm 10% nghĩa là còn lại 90%, tức là nhân với $0{,}9$ mỗi năm.`,
    sol: [R`Sau mỗi năm giá trị còn $90\%$, nên sau $n$ năm: $u_n = 80\cdot 0{,}9^n$.`, R`$u_5 = 80\cdot 0{,}9^5 = 80\cdot 0{,}59049 = 47{,}2392$.`, R`Làm tròn: khoảng $47{,}2$ triệu đồng.`] },
  { id: "d3", show: "10,37", part: "D", lv: "kho", type: "num", ans: 10.3654, tol: 0.005, label: "Số dư:", unit: "triệu đồng",
    text: R`Bác Hưng gửi 10 triệu đồng vào ngân hàng. Cuối mỗi năm, ngân hàng trả lãi 3% vào tài khoản, sau đó trừ phí duy trì 120 nghìn đồng. Hỏi sau 2 năm, số dư trong tài khoản là bao nhiêu triệu đồng? (Làm tròn đến hàng phần trăm.)`,
    hint: R`Gọi $A_n$ là số dư sau $n$ năm (triệu đồng). Ta có $A_0 = 10$ và $A_n = 1{,}03\cdot A_{n-1} - 0{,}12$.`,
    sol: [R`Hệ thức truy hồi: $A_0 = 10,\ A_n = 1{,}03\, A_{n-1} - 0{,}12$ (vì 120 nghìn $= 0{,}12$ triệu).`, R`$A_1 = 1{,}03\cdot 10 - 0{,}12 = 10{,}18$.`, R`$A_2 = 1{,}03\cdot 10{,}18 - 0{,}12 = 10{,}4854 - 0{,}12 = 10{,}3654 \approx 10{,}37$ triệu đồng.`] }
];

// ---------- LÝ THUYẾT
const { def, formula, note, ex } = window.T;

const THEORY = [
  { id: "dinh-nghia", title: "Dãy số là gì?",
    html: def("Định nghĩa", R`<p>Một hàm số $u$ xác định trên tập số nguyên dương $\mathbb{N}^*$ được gọi là một <b>dãy số vô hạn</b> (gọi tắt là <b>dãy số</b>):</p>`)
      + formula(R`u:\ \mathbb{N}^* \to \mathbb{R},\qquad n \mapsto u(n)`)
      + R`<ul>
        <li>Thay vì viết $u(1), u(2), u(3), \dots$ ta viết $u_1, u_2, u_3, \dots$ Mỗi giá trị gọi là một <b>số hạng</b>; $u_1$ là <b>số hạng đầu</b>.</li>
        <li>Dãy số được kí hiệu là $(u_n)$, và $u_n$ gọi là <b>số hạng tổng quát</b> (số hạng thứ $n$).</li>
        <li>Viết dạng khai triển: $u_1, u_2, \dots, u_n, \dots$</li>
      </ul>`
      + note(R`Dãy chỉ có $m$ số hạng $u_1, u_2, \dots, u_m$ gọi là <b>dãy số hữu hạn</b>: $u_1$ là số hạng đầu, $u_m$ là <b>số hạng cuối</b>.`)
      + ex(R`<b>Ví dụ 1.</b> Xác định số hạng đầu và số hạng tổng quát của dãy các số tự nhiên lẻ $1, 3, 5, 7, \dots$`,
           R`<p>Số hạng đầu $u_1 = 1$. Các số lẻ có dạng $2n - 1$ nên $u_n = 2n - 1$.</p><p>Thử lại: $u_1 = 1,\ u_2 = 3,\ u_3 = 5$. Đúng.</p>`)
      + ex(R`<b>Ví dụ 2.</b> Dãy hữu hạn gồm các số tự nhiên lẻ nhỏ hơn $20$, xếp từ bé đến lớn. Liệt kê các số hạng, tìm số hạng đầu và số hạng cuối.`,
           R`<p>$1, 3, 5, 7, 9, 11, 13, 15, 17, 19$ (có $10$ số hạng).</p><p>Số hạng đầu $u_1 = 1$, số hạng cuối $u_{10} = 19$.</p>`) },

  { id: "cach-cho", title: "Các cách cho một dãy số",
    html: R`<p>Có 3 cách thường dùng:</p>`
      + def("Cách 1. Cho bằng công thức số hạng tổng quát", R`<p>Cho $u_n$ theo $n$. Muốn tính số hạng thứ $k$, chỉ cần <b>thay $n = k$</b>.</p>`)
      + ex(R`<b>Ví dụ 3.</b> Cho $u_n = 2n^2 - 3n + 2$. Tính $u_1, u_2, u_3$.`,
           R`<p>$u_1 = 2 - 3 + 2 = 1$</p><p>$u_2 = 8 - 6 + 2 = 4$</p><p>$u_3 = 18 - 9 + 2 = 11$</p>`)
      + def("Cách 2. Cho bằng hệ thức truy hồi", R`<p>Cho số hạng đầu $u_1$ (hoặc vài số hạng đầu) và một công thức tính $u_{n+1}$ theo số hạng đứng trước nó. Muốn tính $u_k$ thì phải <b>tính lần lượt</b> $u_2, u_3, \dots$</p>`)
      + formula(R`\begin{cases} u_1 = a \\ u_{n+1} = f(u_n) \end{cases}`)
      + ex(R`<b>Ví dụ 4.</b> Cho $u_1 = 1$ và $u_{n+1} = u_n + (n + 1)$. Viết năm số hạng đầu (các <b>số tam giác</b>).`,
           R`<p>$u_2 = u_1 + 2 = 3$, $u_3 = u_2 + 3 = 6$, $u_4 = u_3 + 4 = 10$, $u_5 = u_4 + 5 = 15$.</p><p>Năm số hạng đầu: $1, 3, 6, 10, 15$.</p>`)
      + def("Cách 3. Mô tả bằng lời", R`<p>Nói rõ cách xác định từng số hạng, ví dụ: “dãy các số nguyên dương chia hết cho $5$” là $5, 10, 15, 20, \dots$ (khi đó $u_n = 5n$).</p>`)
      + note(R`Muốn <b>dự đoán công thức tổng quát</b>: viết vài số hạng đầu, tìm quy luật giữa $u_n$ và vị trí $n$, rồi thử lại với $n = 1, 2, 3$.`) },

  { id: "tang-giam", title: "Dãy số tăng, dãy số giảm",
    html: def("Định nghĩa", R`<ul>
        <li>$(u_n)$ là <b>dãy tăng</b> nếu $u_{n+1} > u_n$ với mọi $n \in \mathbb{N}^*$.</li>
        <li>$(u_n)$ là <b>dãy giảm</b> nếu $u_{n+1} < u_n$ với mọi $n \in \mathbb{N}^*$.</li>
      </ul><p>Dãy tăng và dãy giảm gọi chung là <b>dãy đơn điệu</b>.</p>`)
      + R`<p><b>Cách xét:</b></p><ul>
        <li><b>Xét hiệu</b> $u_{n+1} - u_n$: luôn dương thì tăng, luôn âm thì giảm. Dùng cho dãy dạng đa thức, phân thức.</li>
        <li><b>Xét tỉ số</b> $\dfrac{u_{n+1}}{u_n}$ khi biết $u_n > 0$: lớn hơn $1$ thì tăng, nhỏ hơn $1$ thì giảm. Dùng cho dãy có lũy thừa dạng $a^n$.</li>
      </ul>`
      + ex(R`<b>Ví dụ 5.</b> Xét tính tăng, giảm của dãy $u_n = n^2 + n + 1$.`,
           R`<p>$u_{n+1} - u_n$ $= \big[(n+1)^2 + (n+1) + 1\big] - \big[n^2 + n + 1\big]$ $= 2n + 2 > 0$ với mọi $n$.</p><p>Vậy dãy tăng.</p>`)
      + ex(R`<b>Ví dụ 6.</b> Xét tính tăng, giảm của dãy $u_n = \dfrac{3^n}{2^{n+1}}$.`,
           R`<p>$u_n > 0$ với mọi $n$, nên xét tỉ số: $\dfrac{u_{n+1}}{u_n} = \dfrac{3^{n+1}}{2^{n+2}}\cdot\dfrac{2^{n+1}}{3^n} = \dfrac{3}{2} > 1$.</p><p>Vậy dãy tăng.</p>`)
      + note(R`Có dãy <b>không tăng cũng không giảm</b>, ví dụ dãy đổi dấu liên tục $u_n = (-1)^n$: $-1, 1, -1, 1, \dots$ Để chứng tỏ điều này, chỉ cần chỉ ra $u_1 > u_2$ nhưng $u_2 < u_3$.`) },

  { id: "bi-chan", title: "Dãy số bị chặn",
    html: def("Định nghĩa", R`<ul>
        <li>$(u_n)$ <b>bị chặn trên</b> nếu có số $M$ sao cho $u_n \le M$ với mọi $n$.</li>
        <li>$(u_n)$ <b>bị chặn dưới</b> nếu có số $m$ sao cho $u_n \ge m$ với mọi $n$.</li>
        <li>$(u_n)$ <b>bị chặn</b> nếu vừa bị chặn trên vừa bị chặn dưới: $m \le u_n \le M$ với mọi $n$.</li>
      </ul>`)
      + ex(R`<b>Ví dụ 7.</b> Chứng minh dãy $u_n = \dfrac{2n + 1}{n + 2}$ bị chặn.`,
           R`<p>Tách: $u_n = \dfrac{2(n + 2) - 3}{n + 2} = 2 - \dfrac{3}{n + 2}$.</p><p>Vì $\dfrac{3}{n+2} > 0$ nên $u_n < 2$. Vì $n \ge 1$ nên $\dfrac{3}{n+2} \le 1$, suy ra $u_n \ge 1$.</p><p>Vậy $1 \le u_n < 2$: dãy bị chặn.</p>`)
      + note(R`Mẹo với phân thức $\dfrac{an + b}{cn + d}$: <b>tách phần nguyên</b> như ví dụ trên. Khi đó vừa thấy được dãy tăng hay giảm, vừa tìm được số chặn trên, chặn dưới.`) }
];

const SUMMARY = R`<ul>
  <li>Số hạng tổng quát $u_n$: thay $n = k$ để được $u_k$.</li>
  <li>Hệ thức truy hồi: tính lần lượt từ $u_1$.</li>
  <li>Tăng: $u_{n+1} - u_n > 0$. Giảm: $u_{n+1} - u_n < 0$. Khi $u_n > 0$ có thể xét $\dfrac{u_{n+1}}{u_n}$ so với $1$.</li>
  <li>Bị chặn: $m \le u_n \le M$ với mọi $n$.</li>
</ul>`;

// ---------- HÌNH MINH HOẠ ĐỀ 2, ĐỀ 3
function queDiem() {
  const s = 26, gap = 22, lab = 58; let x0 = lab, out = "", y = 8;
  for (let n = 1; n <= 3; n++) {
    out += `<text x="0" y="${y + s / 2 + 4}">Hình ${n}</text>`;
    for (let k = 0; k <= n; k++) out += `<line class="stick" x1="${x0 + k * s}" y1="${y}" x2="${x0 + k * s}" y2="${y + s}"/>`;
    for (let k = 0; k < n; k++) out += `<line class="stick" x1="${x0 + k * s}" y1="${y}" x2="${x0 + (k + 1) * s}" y2="${y}"/><line class="stick" x1="${x0 + k * s}" y1="${y + s}" x2="${x0 + (k + 1) * s}" y2="${y + s}"/>`;
    y += s + gap;
  }
  const W = lab + 3 * s + 6;
  return `<svg width="${W}" height="${y - gap + 8}" viewBox="0 0 ${W} ${y - gap + 8}" role="img" aria-label="Hình 1 có 1 ô vuông, hình 2 có 2 ô vuông, hình 3 có 3 ô vuông xếp thành hàng ngang bằng que diêm">${out}</svg>`;
}
function bacThang() {
  const u = 12, gap = 26; let x = 0, out = "", H = 4 * u;
  for (let n = 1; n <= 4; n++) {
    for (let c = 0; c < n; c++) for (let r = 0; r <= c; r++)
      out += `<rect class="cell" x="${x + c * u}" y="${H - (r + 1) * u}" width="${u}" height="${u}"/>`;
    out += `<text x="${x}" y="${H + 16}">Hình ${n}</text>`;
    x += Math.max(n * u, 44) + gap;
  }
  return `<svg width="${x}" height="${H + 22}" viewBox="0 0 ${x} ${H + 22}" role="img" aria-label="Các hình bậc thang 1, 2, 3, 4 bậc ghép từ ô vuông">${out}</svg>`;
}

// ---------- ĐỀ 2
const QS2 = [
  { id: "a1", part: "A", lv: "de", type: "num", ans: 41,
    text: R`Cho dãy số $(u_n)$ với $u_n = 3n^2 - 2n + 1$. Tính $u_4$.`,
    hint: R`Thay $n = 4$ vào công thức.`,
    sol: [R`$u_4 = 3\cdot 4^2 - 2\cdot 4 + 1 = 48 - 8 + 1 = 41$.`] },
  { id: "a2", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{n - (-1)^n}{n + 1}$. Ba số hạng đầu của dãy là:`,
    opts: [R`$1;\ \dfrac{1}{3};\ 1$`, R`$0;\ 1;\ \dfrac{1}{2}$`, R`$1;\ 1;\ 1$`, R`$0;\ \dfrac{1}{3};\ \dfrac{1}{2}$`],
    hint: R`Chú ý dấu trừ đứng trước $(-1)^n$: với $n = 1$ ta có $1 - (-1) = 2$.`,
    sol: [R`$u_1 = \dfrac{1 - (-1)}{2} = 1$`, R`$u_2 = \dfrac{2 - 1}{3} = \dfrac{1}{3}$`, R`$u_3 = \dfrac{3 - (-1)}{4} = 1$`] },
  { id: "a3", part: "A", lv: "vua", type: "num", ans: 31,
    text: R`Cho dãy số $\begin{cases} u_1 = 3 \\ u_{n+1} = 2u_n + 1 \end{cases}$. Tính $u_4$.`,
    hint: R`Tính lần lượt $u_2 = 2u_1 + 1$, rồi $u_3$, rồi $u_4$.`,
    sol: [R`$u_2 = 2\cdot 3 + 1 = 7$`, R`$u_3 = 2\cdot 7 + 1 = 15$`, R`$u_4 = 2\cdot 15 + 1 = 31$`] },
  { id: "a4", part: "A", lv: "vua", type: "num", ans: 47,
    text: R`Cho dãy số $\begin{cases} u_1 = 2,\ u_2 = 5 \\ u_{n+2} = 3u_{n+1} - 2u_n \end{cases}$. Tính $u_5$.`,
    hint: R`Cho $n = 1$: $u_3 = 3u_2 - 2u_1$. Cho $n = 2$: $u_4 = 3u_3 - 2u_2$. Tiếp tục.`,
    sol: [R`$u_3 = 3\cdot 5 - 2\cdot 2 = 11$`, R`$u_4 = 3\cdot 11 - 2\cdot 5 = 23$`, R`$u_5 = 3\cdot 23 - 2\cdot 11 = 47$`] },
  { id: "a5", part: "A", lv: "vua", type: "num", ans: 8, label: "Số hạng thứ",
    text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{n + 2}{2n + 1}$. Số $\dfrac{10}{17}$ là số hạng thứ mấy của dãy?`,
    hint: R`Giải phương trình $\dfrac{n+2}{2n+1} = \dfrac{10}{17}$ với $n$ nguyên dương.`,
    sol: [R`$17(n + 2) = 10(2n + 1)$ $\Leftrightarrow 17n + 34 = 20n + 10$ $\Leftrightarrow 3n = 24 \Leftrightarrow n = 8$.`, R`Vậy $\dfrac{10}{17}$ là số hạng thứ $8$.`] },
  { id: "b1", part: "B", lv: "de", type: "mc", correct: 2,
    text: R`Dãy số $(u_n)$ có năm số hạng đầu là $2;\ 4;\ 6;\ 8;\ 10$. Công thức số hạng tổng quát phù hợp là:`,
    opts: [R`$u_n = 2^n$`, R`$u_n = n + 1$`, R`$u_n = 2n$`, R`$u_n = 2n + 2$`],
    hint: R`Thử từng đáp án với $n = 1, 2, 3$.`,
    sol: [R`$u_n = 2n$ cho $2, 4, 6, 8, 10$: khớp.`, R`$2^n$ cho $u_3 = 8$; $n + 1$ cho $u_2 = 3$; $2n + 2$ cho $u_1 = 4$. Đều sai.`] },
  { id: "b2", part: "B", lv: "de", type: "mc", correct: 1,
    text: R`Cho dãy số $\begin{cases} u_1 = 5 \\ u_{n+1} = u_n - 3 \end{cases}$. Công thức số hạng tổng quát là:`,
    opts: [R`$u_n = 5 - 3n$`, R`$u_n = 8 - 3n$`, R`$u_n = 3n + 2$`, R`$u_n = 5\cdot(-3)^{n-1}$`],
    hint: R`Viết vài số hạng đầu: $5, 2, -1, \dots$ rồi thử từng đáp án.`,
    sol: [R`Các số hạng đầu: $5,\ 2,\ -1,\ -4$. Mỗi số hạng kém số trước $3$.`, R`$u_n = 8 - 3n$ cho $u_1 = 5,\ u_2 = 2,\ u_3 = -1$: khớp.`, R`$5 - 3n$ cho $u_1 = 2$ (sai).`] },
  { id: "b3", part: "B", lv: "vua", type: "mc", correct: 2,
    text: R`Cho dãy số $\begin{cases} u_1 = 3 \\ u_{n+1} = 3u_n \end{cases}$. Công thức số hạng tổng quát là:`,
    opts: [R`$u_n = 3n$`, R`$u_n = 3^{n-1}$`, R`$u_n = 3^n$`, R`$u_n = n^2 + 2$`],
    hint: R`Mỗi số hạng gấp $3$ lần số trước. Viết $u_1, u_2, u_3, u_4$.`,
    sol: [R`$u_1 = 3,\ u_2 = 9,\ u_3 = 27,\ u_4 = 81$, tức là $3^1, 3^2, 3^3, 3^4$.`, R`Vậy $u_n = 3^n$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 31, fig: queDiem, label: "$u_{10} =$", unit: "que",
    text: R`<p>Xếp que diêm thành các ô vuông nằm thành một hàng, hai ô cạnh nhau dùng chung một que. Hình thứ $n$ có $n$ ô vuông. Gọi $u_n$ là số que diêm của hình thứ $n$.</p><p>Tìm quy luật rồi tính $u_{10}$.</p>`,
    hint: R`Đếm: $u_1 = 4$, $u_2 = 7$. Mỗi khi thêm một ô vuông thì cần thêm mấy que?`,
    sol: [R`$u_1 = 4,\ u_2 = 7,\ u_3 = 10$: mỗi ô mới cần thêm $3$ que.`, R`Nên $u_n = 3n + 1$.`, R`$u_{10} = 3\cdot 10 + 1 = 31$ que.`] },
  { id: "c1", part: "C", lv: "de", type: "mc", correct: 0, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = 3n - 7$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tính $u_{n+1} - u_n$.`,
    sol: [R`$u_{n+1} - u_n = \big[3(n+1) - 7\big] - (3n - 7) = 3 > 0$.`, R`Vậy dãy tăng.`] },
  { id: "c2", part: "C", lv: "vua", type: "mc", correct: 1, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = \dfrac{n + 3}{n + 1}$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tách: $\dfrac{n+3}{n+1} = 1 + \dfrac{2}{n+1}$.`,
    sol: [R`$u_n = 1 + \dfrac{2}{n+1}$.`, R`Khi $n$ tăng thì $\dfrac{2}{n+1}$ giảm, nên $u_n$ giảm.`] },
  { id: "c3", part: "C", lv: "vua", type: "mc", correct: 2,
    text: R`Dãy số nào sau đây <b>bị chặn</b>?`,
    opts: [R`$u_n = 2n + 1$`, R`$u_n = n^3$`, R`$u_n = \dfrac{1}{n^2 + 1}$`, R`$u_n = -n^2$`],
    hint: R`Dãy nào có các số hạng luôn nằm giữa hai số cố định?`,
    sol: [R`$n^2 + 1 \ge 2$ nên $0 < \dfrac{1}{n^2+1} \le \dfrac{1}{2}$: dãy bị chặn.`, R`$2n + 1$ và $n^3$ lớn tùy ý; $-n^2$ nhỏ tùy ý. Các dãy đó không bị chặn.`] },
  { id: "c4", part: "C", lv: "kho", type: "mc", correct: 0,
    text: R`Cho dãy số $u_n = \dfrac{an - 1}{n + 2}$, $a$ là số thực. Tìm $a$ để dãy số tăng.`,
    opts: [R`$a > -\dfrac{1}{2}$`, R`$a < -\dfrac{1}{2}$`, R`$a > \dfrac{1}{2}$`, R`$a > 0$`],
    hint: R`Tách: $\dfrac{an - 1}{n+2} = \dfrac{a(n+2) - 2a - 1}{n+2} = a - \dfrac{2a + 1}{n + 2}$.`,
    sol: [R`$u_n = a - \dfrac{2a+1}{n+2}$.`, R`$u_{n+1} - u_n = (2a+1)\left(\dfrac{1}{n+2} - \dfrac{1}{n+3}\right) = \dfrac{2a + 1}{(n+2)(n+3)}$.`, R`Dãy tăng $\Leftrightarrow 2a + 1 > 0 \Leftrightarrow a > -\dfrac{1}{2}$.`] },
  { id: "d1", part: "D", lv: "de", type: "num", ans: 256, label: "Số vi khuẩn:", unit: "con",
    text: R`Một loại vi khuẩn cứ $30$ phút lại phân đôi một lần. Ban đầu có $1$ vi khuẩn. Hỏi sau $4$ giờ có bao nhiêu vi khuẩn?`,
    hint: R`$4$ giờ có bao nhiêu lần phân đôi?`,
    sol: [R`$4$ giờ $= 240$ phút $= 8$ lần phân đôi.`, R`Số vi khuẩn: $2^8 = 256$ con.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 21.09375, tol: 0.06, label: "Giá trị:", unit: "triệu đồng", show: "21,1",
    text: R`Một máy photocopy mới mua giá $50$ triệu đồng. Sau mỗi năm, giá trị máy chỉ còn $75\%$ giá trị năm trước. Hỏi sau $3$ năm máy còn giá trị bao nhiêu triệu đồng? (Làm tròn đến hàng phần mười.)`,
    hint: R`Mỗi năm giá trị nhân với $0{,}75$.`,
    sol: [R`Sau $n$ năm: $u_n = 50\cdot 0{,}75^n$.`, R`$u_3 = 50\cdot 0{,}421875 = 21{,}09375 \approx 21{,}1$ triệu đồng.`] },
  { id: "d3", part: "D", lv: "kho", type: "num", ans: 20.82, tol: 0.005, label: "Số dư:", unit: "triệu đồng", show: "20,82",
    text: R`Chị Lan gửi $20$ triệu đồng vào ngân hàng. Cuối mỗi năm ngân hàng trả lãi $5\%$ vào tài khoản, sau đó chị rút ra $600$ nghìn đồng. Hỏi sau $2$ năm số dư còn bao nhiêu triệu đồng?`,
    hint: R`Gọi $A_n$ là số dư sau $n$ năm: $A_0 = 20$, $A_n = 1{,}05\, A_{n-1} - 0{,}6$.`,
    sol: [R`$A_1 = 1{,}05\cdot 20 - 0{,}6 = 20{,}4$.`, R`$A_2 = 1{,}05\cdot 20{,}4 - 0{,}6 = 21{,}42 - 0{,}6 = 20{,}82$ triệu đồng.`] }
];

// ---------- ĐỀ 3
const QS3 = [
  { id: "a1", part: "A", lv: "de", type: "num", ans: 30,
    text: R`Cho dãy số $(u_n)$ với $u_n = n^2 + 2n - 5$. Tính $u_5$.`,
    hint: R`Thay $n = 5$ vào công thức.`,
    sol: [R`$u_5 = 25 + 10 - 5 = 30$.`] },
  { id: "a2", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{(-1)^n\, n}{n + 1}$. Ba số hạng đầu của dãy là:`,
    opts: [R`$-\dfrac{1}{2};\ \dfrac{2}{3};\ -\dfrac{3}{4}$`, R`$\dfrac{1}{2};\ -\dfrac{2}{3};\ \dfrac{3}{4}$`, R`$-\dfrac{1}{2};\ -\dfrac{2}{3};\ -\dfrac{3}{4}$`, R`$\dfrac{1}{2};\ \dfrac{2}{3};\ \dfrac{3}{4}$`],
    hint: R`$(-1)^n$ bằng $-1$ khi $n$ lẻ và bằng $1$ khi $n$ chẵn.`,
    sol: [R`$u_1 = \dfrac{-1}{2},\quad u_2 = \dfrac{2}{3},\quad u_3 = \dfrac{-3}{4}$.`] },
  { id: "a3", part: "A", lv: "vua", type: "num", ans: 26,
    text: R`Cho dãy số $\begin{cases} u_1 = -1 \\ u_{n+1} = u_n^2 + 1 \end{cases}$. Tính $u_4$.`,
    hint: R`Chú ý $(-1)^2 = 1$.`,
    sol: [R`$u_2 = (-1)^2 + 1 = 2$`, R`$u_3 = 2^2 + 1 = 5$`, R`$u_4 = 5^2 + 1 = 26$`] },
  { id: "a4", part: "A", lv: "vua", type: "num", ans: 13,
    text: R`Cho dãy số $\begin{cases} u_1 = 1,\ u_2 = 2 \\ u_{n+2} = u_{n+1} + u_n \end{cases}$. Tính $u_6$.`,
    hint: R`Mỗi số hạng bằng tổng hai số hạng đứng ngay trước nó.`,
    sol: [R`$u_3 = 2 + 1 = 3,\ u_4 = 3 + 2 = 5,\ u_5 = 5 + 3 = 8,\ u_6 = 8 + 5 = 13$.`] },
  { id: "a5", part: "A", lv: "vua", type: "num", ans: 12, label: "Số hạng thứ",
    text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{3n - 1}{n + 2}$. Số $\dfrac{5}{2}$ là số hạng thứ mấy của dãy?`,
    hint: R`Giải phương trình $\dfrac{3n - 1}{n + 2} = \dfrac{5}{2}$.`,
    sol: [R`$2(3n - 1) = 5(n + 2)$ $\Leftrightarrow 6n - 2 = 5n + 10$ $\Leftrightarrow n = 12$.`, R`Thử lại: $u_{12} = \dfrac{35}{14} = \dfrac{5}{2}$. Đúng.`] },
  { id: "b1", part: "B", lv: "de", type: "mc", correct: 1,
    text: R`Dãy số $(u_n)$ có năm số hạng đầu là $1;\ 4;\ 9;\ 16;\ 25$. Công thức số hạng tổng quát phù hợp là:`,
    opts: [R`$u_n = 3n - 2$`, R`$u_n = n^2$`, R`$u_n = 2n - 1$`, R`$u_n = n^2 + 1$`],
    hint: R`Các số $1, 4, 9, 16, 25$ là bình phương của số nào?`,
    sol: [R`$1 = 1^2,\ 4 = 2^2,\ 9 = 3^2, \dots$ nên $u_n = n^2$.`, R`$3n - 2$ cho $u_3 = 7$; $2n - 1$ cho $u_2 = 3$; $n^2 + 1$ cho $u_1 = 2$. Đều sai.`] },
  { id: "b2", part: "B", lv: "de", type: "mc", correct: 1,
    text: R`Cho dãy số $\begin{cases} u_1 = 10 \\ u_{n+1} = u_n + 5 \end{cases}$. Công thức số hạng tổng quát là:`,
    opts: [R`$u_n = 10 + 5n$`, R`$u_n = 5n + 5$`, R`$u_n = 5n$`, R`$u_n = 10\cdot 5^{n-1}$`],
    hint: R`Viết vài số hạng: $10, 15, 20, \dots$ rồi thử từng đáp án.`,
    sol: [R`Các số hạng: $10,\ 15,\ 20,\ 25$.`, R`$u_n = 5n + 5$ cho $u_1 = 10,\ u_2 = 15$: khớp. $10 + 5n$ cho $u_1 = 15$ (sai).`] },
  { id: "b3", part: "B", lv: "vua", type: "mc", correct: 1,
    text: R`Cho dãy số $\begin{cases} u_1 = \dfrac{1}{2} \\ u_{n+1} = \dfrac{u_n}{2} \end{cases}$. Công thức số hạng tổng quát là:`,
    opts: [R`$u_n = \dfrac{1}{2n}$`, R`$u_n = \dfrac{1}{2^n}$`, R`$u_n = \dfrac{1}{2^{n-1}}$`, R`$u_n = \dfrac{n}{2}$`],
    hint: R`Viết $u_1, u_2, u_3$: mỗi số bằng một nửa số trước.`,
    sol: [R`$u_1 = \dfrac{1}{2},\ u_2 = \dfrac{1}{4},\ u_3 = \dfrac{1}{8}$, tức là $\dfrac{1}{2^1}, \dfrac{1}{2^2}, \dfrac{1}{2^3}$.`, R`Vậy $u_n = \dfrac{1}{2^n}$. Đáp án $\dfrac{1}{2n}$ cho $u_3 = \dfrac{1}{6}$ (sai).`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 55, fig: bacThang, label: "$u_{10} =$", unit: "ô",
    text: R`<p>Hình thứ $n$ là một cầu thang $n$ bậc ghép từ các ô vuông (bậc thấp nhất 1 ô, bậc tiếp theo 2 ô, …). Gọi $u_n$ là số ô vuông của hình thứ $n$.</p><p>Tính $u_{10}$.</p>`,
    hint: R`$u_n = 1 + 2 + \dots + n$. Có thể dùng $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$.`,
    sol: [R`$u_1 = 1,\ u_2 = 3,\ u_3 = 6,\ u_4 = 10$: hình thứ $n$ có $1 + 2 + \dots + n$ ô.`, R`$u_n = \dfrac{n(n+1)}{2}$, nên $u_{10} = \dfrac{10\cdot 11}{2} = 55$.`] },
  { id: "c1", part: "C", lv: "de", type: "mc", correct: 1, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = 10 - n^2$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tính $u_{n+1} - u_n$.`,
    sol: [R`$u_{n+1} - u_n = \big[10 - (n+1)^2\big] - (10 - n^2) = -2n - 1 < 0$.`, R`Vậy dãy giảm.`] },
  { id: "c2", part: "C", lv: "vua", type: "mc", correct: 0, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = \dfrac{n}{n + 1}$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tách: $\dfrac{n}{n+1} = 1 - \dfrac{1}{n+1}$.`,
    sol: [R`$u_n = 1 - \dfrac{1}{n+1}$. Khi $n$ tăng, $\dfrac{1}{n+1}$ giảm nên $u_n$ tăng.`] },
  { id: "c3", part: "C", lv: "vua", type: "mc", correct: 2, oneCol: true,
    text: R`Xét tính tăng, giảm của dãy số $(u_n)$ với $u_n = \dfrac{(-1)^n}{2n + 1}$.`,
    opts: [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`],
    hint: R`Tính $u_1, u_2, u_3$ và để ý dấu.`,
    sol: [R`$u_1 = -\dfrac{1}{3},\ u_2 = \dfrac{1}{5},\ u_3 = -\dfrac{1}{7}$.`, R`$u_1 < u_2$ nhưng $u_2 > u_3$, nên dãy không tăng cũng không giảm.`] },
  { id: "c4", part: "C", lv: "vua", type: "mc", correct: 3,
    text: R`Dãy số nào sau đây <b>không bị chặn</b>?`,
    opts: [R`$u_n = \sin n$`, R`$u_n = \dfrac{1}{n}$`, R`$u_n = \dfrac{2n + 1}{n}$`, R`$u_n = \sqrt{n}$`],
    hint: R`Dãy nào có thể lớn hơn mọi số cho trước khi $n$ đủ lớn?`,
    sol: [R`$\sqrt{n}$ lớn tùy ý (ví dụ $n = 10^6$ thì $\sqrt n = 1000$), nên không bị chặn trên.`, R`$-1 \le \sin n \le 1$; $0 < \dfrac{1}{n} \le 1$; $\dfrac{2n+1}{n} = 2 + \dfrac{1}{n}$ nằm trong $(2;\ 3]$. Ba dãy này đều bị chặn.`] },
  { id: "d1", part: "D", lv: "de", type: "num", ans: 3, tol: 0.001, label: "Chiều cao:", unit: "m", show: "3",
    text: R`Một cây non cao $1{,}2$ m, mỗi năm cây cao thêm $0{,}3$ m. Hỏi sau $6$ năm cây cao bao nhiêu mét?`,
    hint: R`Sau $n$ năm, chiều cao là $u_n = 1{,}2 + 0{,}3n$.`,
    sol: [R`$u_6 = 1{,}2 + 0{,}3\cdot 6 = 1{,}2 + 1{,}8 = 3$ m.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 2.96922, tol: 0.005, label: "Giá:", unit: "tỉ đồng", show: "2,97",
    text: R`Giá trung bình một căn hộ hiện nay là $2{,}5$ tỉ đồng. Nếu mỗi năm giá tăng $3{,}5\%$ thì sau $n$ năm giá là $A_n = 2{,}5\cdot 1{,}035^n$ (tỉ đồng). Tính giá căn hộ sau $5$ năm. (Làm tròn đến hàng phần trăm.)`,
    hint: R`Thay $n = 5$ và bấm máy tính.`,
    sol: [R`$A_5 = 2{,}5\cdot 1{,}035^5 \approx 2{,}5\cdot 1{,}18769 \approx 2{,}969$.`, R`Làm tròn: khoảng $2{,}97$ tỉ đồng.`] },
  { id: "d3", part: "D", lv: "kho", type: "num", ans: 437.5, tol: 0.001, label: "Số vi khuẩn:", unit: "triệu con", show: "437,5",
    text: R`Một thí nghiệm bắt đầu với $1000$ triệu vi khuẩn. Cứ mỗi lần dùng thuốc thì tiêu diệt được $400$ triệu vi khuẩn; giữa hai lần dùng thuốc, số vi khuẩn tăng thêm $25\%$. Gọi $B_n$ là số vi khuẩn ngay trước lần dùng thuốc thứ $n$ ($B_1 = 1000$). Tính $B_3$ (triệu con).`,
    hint: R`Hệ thức truy hồi: $B_{n+1} = 1{,}25\,(B_n - 400)$.`,
    sol: [R`$B_{n+1} = 1{,}25\,(B_n - 400)$.`, R`$B_2 = 1{,}25\cdot(1000 - 400) = 750$.`, R`$B_3 = 1{,}25\cdot(750 - 400) = 437{,}5$ triệu con.`] }
];

// ---------- LUYỆN TẬP: sinh đề theo mã
function gen(G, r) {
  const { t, fr, lin, poly2, par, list, mc, show } = G;
  const Q = [];
  const ORDER3 = [R`Dãy số tăng`, R`Dãy số giảm`, R`Dãy số không tăng cũng không giảm`];

  // A1. Tính số hạng từ công thức
  { const a = r.int(1, 3), b = r.int(-5, 5), c = r.nz(-6, 6), k = r.int(2, 5);
    const v = a * k * k + b * k + c;
    Q.push({ part: "A", lv: "de", type: "num", ans: v,
      text: R`Cho dãy số $(u_n)$ với $u_n = ${poly2(a, b, c)}$. Tính $u_${k}$.`,
      hint: R`Thay $n = ${k}$ vào công thức.`,
      sol: [R`$u_${k} = ${a === 1 ? "" : a + "\\cdot "}${k}^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)}\cdot ${k} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${v}$.`] }); }

  // A2. Hệ thức truy hồi
  { const p = r.int(1, 4), m = r.pick([2, 3]), c = r.pick([-2, -1, 1, 2]);
    const u = [p]; for (let i = 0; i < 3; i++) u.push(m * u[i] + c);
    Q.push({ part: "A", lv: "vua", type: "num", ans: u[3],
      text: R`Cho dãy số $\begin{cases} u_1 = ${p} \\ u_{n+1} = ${m}u_n ${c > 0 ? "+" : "-"} ${Math.abs(c)} \end{cases}$. Tính $u_4$.`,
      hint: R`Tính lần lượt $u_2$, $u_3$ rồi $u_4$.`,
      sol: [1, 2, 3].map(i => R`$u_${i + 1} = ${m}\cdot ${par(u[i - 1])} ${c > 0 ? "+" : "-"} ${Math.abs(c)} = ${u[i]}$`) }); }

  // A3. Số đã cho là số hạng thứ mấy
  { let a, b, c;
    do { a = r.int(1, 4); b = r.pick([2, 3]); c = r.int(1, 3); } while (c === a * b);
    const k = r.int(4, 12), g = G.gcd(k + a, b * k + c), P = (k + a) / g, Qd = (b * k + c) / g;
    Q.push({ part: "A", lv: "vua", type: "num", ans: k, label: "Số hạng thứ",
      text: R`Cho dãy số $(u_n)$ với $u_n = \dfrac{n + ${a}}{${b}n + ${c}}$. Số $\dfrac{${P}}{${Qd}}$ là số hạng thứ mấy của dãy?`,
      hint: R`Giải phương trình $\dfrac{n + ${a}}{${b}n + ${c}} = \dfrac{${P}}{${Qd}}$ với $n$ nguyên dương.`,
      sol: [R`$${Qd}(n + ${a}) = ${P}(${b}n + ${c})$ $\Leftrightarrow ${Qd}n + ${Qd * a} = ${P * b}n + ${P * c}$`,
            R`$\Leftrightarrow ${lin(Qd - P * b, 0)} = ${P * c - Qd * a} \Leftrightarrow n = ${k}$.`] }); }

  // B1. Công thức tổng quát của dãy cộng thêm d
  { const p = r.nz(-3, 9), d = r.pick([2, 3, 4, 5, -2, -3]);
    const right = lin(d, p - d), w = [lin(d, p), lin(-d, p + d), lin(p === d || p === 0 ? p + 1 : p, d)];
    const m = mc(r, R`$u_n = ${right}$`, w.map(s => R`$u_n = ${s}$`));
    Q.push(Object.assign({ part: "B", lv: "de", type: "mc",
      text: R`Cho dãy số $\begin{cases} u_1 = ${p} \\ u_{n+1} = u_n ${d > 0 ? "+" : "-"} ${Math.abs(d)} \end{cases}$. Công thức số hạng tổng quát là:`,
      hint: R`Viết $u_1, u_2, u_3$ rồi thử từng đáp án với $n = 1, 2$.`,
      sol: [R`$u_1 = ${p},\ u_2 = ${p + d},\ u_3 = ${p + 2 * d}$.`, R`$u_n = ${right}$ cho đúng các giá trị trên.`] }, m)); }

  // B2. Công thức tổng quát của dãy nhân với q
  { const q = r.pick([2, 3]), p = r.pick([2, 3, 5].filter(x => x !== 1));
    let right, w;
    if (p === q) { right = R`${q}^n`; w = [R`${q}^{n-1}`, R`${q}n`, R`${q}^{n+1}`]; }
    else { right = R`${p}\cdot ${q}^{n-1}`; w = [R`${p}\cdot ${q}^{n}`, R`${q}^n`, R`${p} + ${q}(n - 1)`]; }
    const m = mc(r, R`$u_n = ${right}$`, w.map(s => R`$u_n = ${s}$`));
    Q.push(Object.assign({ part: "B", lv: "vua", type: "mc",
      text: R`Cho dãy số $\begin{cases} u_1 = ${p} \\ u_{n+1} = ${q}u_n \end{cases}$. Công thức số hạng tổng quát là:`,
      hint: R`Mỗi số hạng gấp ${q} lần số trước. Viết $u_1, u_2, u_3$.`,
      sol: [R`$u_1 = ${p},\ u_2 = ${p * q},\ u_3 = ${p * q * q}$.`, R`Vậy $u_n = ${right}$.`] }, m)); }

  // B3. Que diêm
  { const sh = r.pick([["tam giác", 2, "hai tam giác cạnh nhau dùng chung một que", 3], ["ô vuông", 3, "hai ô cạnh nhau dùng chung một que", 4], ["lục giác", 5, "hai lục giác cạnh nhau dùng chung một que", 6]]);
    const k = r.int(6, 15), v = sh[1] * k + 1;
    Q.push({ part: "B", lv: "vua", type: "num", ans: v, label: R`$u_{${k}} =$`, unit: "que",
      text: R`Xếp que diêm thành một hàng các hình ${sh[0]} đều, ${sh[2]}. Hình thứ $n$ có $n$ hình ${sh[0]}. Gọi $u_n$ là số que diêm của hình thứ $n$. Tính $u_{${k}}$.`,
      hint: R`Hình thứ nhất cần ${sh[3]} que. Mỗi khi thêm một hình ${sh[0]} thì cần thêm mấy que?`,
      sol: [R`$u_1 = ${sh[3]}$, mỗi hình thêm vào cần ${sh[1]} que, nên $u_n = ${sh[1]}n + 1$.`, R`$u_{${k}} = ${sh[1]}\cdot ${k} + 1 = ${v}$ que.`] }); }

  // C1. Tăng giảm dãy bậc nhất
  { const a = r.nz(-5, 5), b = r.int(-9, 9);
    Q.push({ part: "C", lv: "de", type: "mc", correct: a > 0 ? 0 : 1, opts: ORDER3, oneCol: true,
      text: R`Xét tính tăng, giảm của dãy số $u_n = ${lin(a, b)}$.`,
      hint: R`Tính $u_{n+1} - u_n$.`,
      sol: [R`$u_{n+1} - u_n = ${a}$ ${a > 0 ? "> 0" : "< 0"}.`, R`Vậy dãy ${a > 0 ? "tăng" : "giảm"}.`] }); }

  // C2. Tăng giảm dãy phân thức
  { const a = r.int(1, 3), c = r.int(1, 3), s = r.pick([-5, -3, -2, -1, 1, 2, 3, 5]), b = a * c + s;
    const dec = s > 0;
    Q.push({ part: "C", lv: "vua", type: "mc", correct: dec ? 1 : 0, opts: ORDER3, oneCol: true,
      text: R`Xét tính tăng, giảm của dãy số $u_n = \dfrac{${lin(a, b)}}{n + ${c}}$.`,
      hint: R`Tách phần nguyên: $\dfrac{${lin(a, b)}}{n + ${c}} = ${a} ${s > 0 ? "+" : "-"} \dfrac{${Math.abs(s)}}{n + ${c}}$.`,
      sol: [R`$u_n = ${a} ${s > 0 ? "+" : "-"} \dfrac{${Math.abs(s)}}{n + ${c}}$.`, R`Khi $n$ tăng, $\dfrac{${Math.abs(s)}}{n + ${c}}$ giảm, nên $u_n$ ${dec ? "giảm" : "tăng"}.`] }); }

  // C3. Đan dấu / lũy thừa
  { const kind = r.pick(["alt", "up", "down"]), k = r.int(1, 5), q = r.pick([2, 3]), c = r.int(1, 4);
    const data = {
      alt: [R`u_n = \dfrac{(-1)^n}{n + ${c}}`, 2, [R`$u_1 = -\dfrac{1}{${1 + c}},\ u_2 = \dfrac{1}{${2 + c}},\ u_3 = -\dfrac{1}{${3 + c}}$.`, R`$u_1 < u_2$ nhưng $u_2 > u_3$, nên dãy không tăng cũng không giảm.`]],
      up: [R`u_n = ${k === 1 ? "" : k + "\\cdot "}${q}^n`, 0, [R`$u_n > 0$, xét $\dfrac{u_{n+1}}{u_n} = ${q} > 1$.`, R`Vậy dãy tăng.`]],
      down: [R`u_n = \dfrac{${k}}{${q}^n}`, 1, [R`$u_n > 0$, xét $\dfrac{u_{n+1}}{u_n} = \dfrac{1}{${q}} < 1$.`, R`Vậy dãy giảm.`]]
    }[kind];
    Q.push({ part: "C", lv: "vua", type: "mc", correct: data[1], opts: ORDER3, oneCol: true,
      text: R`Xét tính tăng, giảm của dãy số $${data[0]}$.`,
      hint: kind === "alt" ? R`Tính $u_1, u_2, u_3$ và để ý dấu.` : R`Các số hạng đều dương, hãy xét tỉ số $\dfrac{u_{n+1}}{u_n}$.`,
      sol: data[2] }); }

  // C4. Dãy bị chặn
  { const good = r.pick([
      [R`u_n = \dfrac{n - 1}{n}`, R`$u_n = 1 - \dfrac{1}{n}$ nên $0 \le u_n < 1$.`],
      [R`u_n = \dfrac{1}{n^2 + 1}`, R`$n^2 + 1 \ge 2$ nên $0 < u_n \le \dfrac{1}{2}$.`],
      [R`u_n = \dfrac{2n + 1}{n + 1}`, R`$u_n = 2 - \dfrac{1}{n + 1}$ nên $\dfrac{3}{2} \le u_n < 2$.`],
      [R`u_n = \sin n`, R`$-1 \le \sin n \le 1$.`],
      [R`u_n = \dfrac{(-1)^n}{n}`, R`$-1 \le u_n \le \dfrac{1}{2}$.`]]);
    const bad = r.shuffle([R`u_n = n^2`, R`u_n = 2^n`, R`u_n = -3n`, R`u_n = \sqrt{n}`, R`u_n = n^3 - 1`, R`u_n = 3n + 1`, R`u_n = -n^2`]).slice(0, 3);
    const m = mc(r, R`$${good[0]}$`, bad.map(s => R`$${s}$`));
    Q.push(Object.assign({ part: "C", lv: "vua", type: "mc",
      text: R`Dãy số nào sau đây <b>bị chặn</b>?`,
      hint: R`Dãy nào có các số hạng luôn nằm giữa hai số cố định?`,
      sol: [R`$${good[0]}$: ${good[1]} Dãy bị chặn.`, R`Các dãy còn lại lớn (hoặc nhỏ) tùy ý khi $n$ lớn, nên không bị chặn.`] }, m)); }

  // D1. Vi khuẩn phân đôi
  { const N0 = r.pick([1, 50, 100, 200]), per = r.pick([10, 15, 20, 30]);
    const times = Array.from({ length: 6 }, (_, i) => i + 3).filter(k => (k * per) % 60 === 0);
    const k = r.pick(times.length ? times : [6]), mins = k * per, v = N0 * Math.pow(2, k);
    const hrs = mins / 60;
    Q.push({ part: "D", lv: "de", type: "num", ans: v, label: "Số vi khuẩn:", unit: "con",
      text: R`Một loại vi khuẩn cứ $${per}$ phút lại phân đôi một lần. Ban đầu có $${N0}$ vi khuẩn. Hỏi sau $${t(hrs)}$ giờ có bao nhiêu vi khuẩn?`,
      hint: R`$${t(hrs)}$ giờ có bao nhiêu lần phân đôi?`,
      sol: [R`$${t(hrs)}$ giờ $= ${mins}$ phút $= ${k}$ lần phân đôi.`, R`Số vi khuẩn: $${N0 === 1 ? "" : N0 + "\\cdot "}2^{${k}} = ${v}$ con.`] }); }

  // D2. Tăng/giảm theo phần trăm
  { const up = r.next() < 0.5, V = r.pick([50, 80, 100, 120, 200]), p = up ? r.pick([3, 5, 6, 8]) : r.pick([10, 15, 20, 25]), n = r.int(2, 5);
    const f = up ? 1 + p / 100 : 1 - p / 100, v = V * Math.pow(f, n);
    Q.push({ part: "D", lv: "vua", type: "num", ans: v, tol: 0.06, label: "Giá trị:", unit: "triệu đồng", show: show(v, 1),
      text: up
        ? R`Một khoản tiền $${V}$ triệu đồng được gửi với lãi suất $${p}\%$ một năm, lãi nhập vào gốc. Sau $${n}$ năm có bao nhiêu triệu đồng? (Làm tròn đến hàng phần mười.)`
        : R`Một thiết bị mua mới giá $${V}$ triệu đồng, mỗi năm giá trị giảm $${p}\%$ so với năm trước. Sau $${n}$ năm còn bao nhiêu triệu đồng? (Làm tròn đến hàng phần mười.)`,
      hint: R`Mỗi năm giá trị nhân với $${t(f)}$.`,
      sol: [R`Sau $n$ năm: $u_n = ${V}\cdot ${t(f)}^n$.`, R`$u_${n} = ${V}\cdot ${t(f)}^${n} \approx ${t(+v.toFixed(4))} \approx ${show(v, 1).replace(",", "{,}")}$ triệu đồng.`] }); }

  return Q.map((q, i) => Object.assign({ id: "g" + (i + 1) }, q));
}

window.LESSON = { parts: PARTS, sets: [QS, QS2, QS3], gen, theory: THEORY, summary: SUMMARY };
})();
