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

window.LESSON = {
  slug: "day-so",
  eyebrow: "Toán 11 · Chương II · Bài 5",
  title: R`Dãy số <span class="un">(u<sub>n</sub>)</span>`,
  plainTitle: "Dãy số",
  minutes: 45,
  parts: PARTS,
  questions: QS
};
})();
