// Bài 7. Cấp số nhân — dữ liệu bài tập
(function () {
const R = String.raw;

const PARTS = [
  { id: "A", title: "Nhận biết cấp số nhân",
    recap: R`<b>Nhắc lại:</b> $(u_n)$ là cấp số nhân $\Leftrightarrow u_{n+1} = u_n \cdot q$ với mọi $n$, số $q$ không đổi gọi là <b>công bội</b>. Ba số khác $0$ là $a, b, c$ (theo thứ tự) lập thành cấp số nhân $\Leftrightarrow b^2 = a\cdot c$.` },
  { id: "B", title: "Số hạng tổng quát",
    recap: R`<b>Nhắc lại:</b> $u_n = u_1 \cdot q^{\,n-1}$. Muốn tìm $q$, thường lấy hai số hạng chia cho nhau để $u_1$ bị triệt tiêu.` },
  { id: "C", title: "Tổng n số hạng đầu",
    recap: R`<b>Nhắc lại:</b> với $q \ne 1$: tổng $n$ số hạng đầu là $S_n = u_1\cdot\dfrac{1 - q^n}{1 - q}$. Với $q = 1$: $S_n = n\,u_1$.` },
  { id: "D", title: "Bài toán thực tế",
    recap: R`<b>Nhắc lại:</b> đại lượng nào cứ sau mỗi kì lại <b>nhân</b> lên một số lần cố định (gấp đôi, tăng $5\%$, …) là cấp số nhân. Tăng $5\%$ nghĩa là nhân với $1{,}05$.` }
];

const QS = [
  // ---------- A
  { id: "a1", part: "A", lv: "de", type: "mc", correct: 2,
    text: R`Dãy số nào sau đây là cấp số nhân?`,
    opts: [R`$2;\ 4;\ 6;\ 8;\ 10$`, R`$1;\ 4;\ 9;\ 16;\ 25$`, R`$2;\ 6;\ 18;\ 54;\ 162$`, R`$3;\ 6;\ 12;\ 20;\ 30$`],
    hint: R`Lấy số sau <b>chia</b> cho số trước. Dãy nào có tất cả các thương bằng nhau?`,
    sol: [R`Dãy $2;\ 6;\ 18;\ 54;\ 162$: mỗi số gấp $3$ lần số trước, nên là cấp số nhân với $q = 3$.`, R`Dãy $2;\ 4;\ 6;\dots$ là cấp số <b>cộng</b> ($d = 2$), các thương $2;\ 1{,}5;\dots$ khác nhau. Hai dãy còn lại cũng có các thương khác nhau.`] },
  { id: "a2", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Cho cấp số nhân $(u_n)$ với $u_n = 3\cdot 4^n$. Số hạng đầu và công bội của nó là:`,
    opts: [R`$u_1 = 12,\ q = 4$`, R`$u_1 = 3,\ q = 4$`, R`$u_1 = 12,\ q = 3$`, R`$u_1 = 4,\ q = 3$`],
    hint: R`Thay $n = 1$ để được $u_1$. Công bội $q = \dfrac{u_{n+1}}{u_n}$.`,
    sol: [R`$u_1 = 3\cdot 4^1 = 12$.`, R`$\dfrac{u_{n+1}}{u_n} = \dfrac{3\cdot 4^{n+1}}{3\cdot 4^n} = 4$, nên $q = 4$.`, R`Chú ý: $u_1$ không phải là $3$, vì công thức có $4^n$ chứ không phải $4^{n-1}$.`] },
  { id: "a3", part: "A", lv: "vua", type: "num", ans: 2, label: "$x =$",
    text: R`Tìm $x$ để ba số $x - 1,\ x,\ x + 2$ (theo thứ tự đó) là ba số hạng liên tiếp của một cấp số nhân.`,
    hint: R`Dùng tính chất: $a, b, c$ lập thành cấp số nhân $\Leftrightarrow b^2 = a\cdot c$.`,
    sol: [R`$x^2 = (x - 1)(x + 2) = x^2 + x - 2$.`, R`$\Leftrightarrow 0 = x - 2 \Leftrightarrow x = 2$.`, R`Thử lại: ba số là $1;\ 2;\ 4$, là cấp số nhân với $q = 2$.`] },
  { id: "a4", part: "A", lv: "vua", type: "mc", correct: 1,
    text: R`Dãy số $(u_n)$ nào sau đây là cấp số nhân?`,
    opts: [R`$u_n = n + 3$`, R`$u_n = (-1)^n\cdot 3^{3n+1}$`, R`$u_n = n^2$`, R`$u_n = 2n$`],
    hint: R`Tính $\dfrac{u_{n+1}}{u_n}$ với từng dãy. Cấp số nhân thì thương này là một hằng số (không chứa $n$).`,
    sol: [R`Với $u_n = (-1)^n\cdot 3^{3n+1}$: $\dfrac{u_{n+1}}{u_n} = \dfrac{(-1)^{n+1}\cdot 3^{3n+4}}{(-1)^n\cdot 3^{3n+1}} = -1\cdot 3^3 = -27$ không đổi.`, R`Vậy đây là cấp số nhân với $q = -27$. Các dãy còn lại có thương thay đổi theo $n$, ví dụ $\dfrac{n+4}{n+3}$.`] },
  // ---------- B
  { id: "b1", part: "B", lv: "de", type: "num", ans: -1280, label: "$u_9 =$",
    text: R`Cho cấp số nhân $(u_n)$ có $u_1 = -5$ và công bội $q = 2$. Tính $u_9$.`,
    hint: R`$u_9 = u_1\cdot q^8$.`,
    sol: [R`$u_9 = -5\cdot 2^8 = -5\cdot 256 = -1280$.`] },
  { id: "b2", part: "B", lv: "vua", type: "num", ans: 7, label: "Số hạng thứ",
    text: R`Cho cấp số nhân $(u_n)$ có $u_1 = -5$ và $q = 2$. Số $-320$ là số hạng thứ mấy của cấp số nhân?`,
    hint: R`Giải phương trình $-5\cdot 2^{n-1} = -320$.`,
    sol: [R`$-5\cdot 2^{n-1} = -320 \Leftrightarrow 2^{n-1} = 64 = 2^6$.`, R`$\Rightarrow n - 1 = 6 \Rightarrow n = 7$.`] },
  { id: "b3", part: "B", lv: "vua", type: "num", ans: -0.125, label: "$u_{10} =$", show: "-1/8",
    text: R`Tìm số hạng thứ $10$ của cấp số nhân $64;\ -32;\ 16;\ -8;\ \dots$`,
    hint: R`$q = \dfrac{-32}{64}$. Chú ý dấu: lũy thừa bậc lẻ của số âm là số âm.`,
    sol: [R`$u_1 = 64$, $q = \dfrac{-32}{64} = -\dfrac{1}{2}$.`, R`$u_{10} = 64\cdot\left(-\dfrac{1}{2}\right)^9 = 64\cdot\left(-\dfrac{1}{512}\right) = -\dfrac{1}{8}$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 1536, label: "$u_{10} =$",
    text: R`Cho cấp số nhân $(u_n)$ có $u_1 + u_5 = 51$ và $u_2 + u_6 = 102$. Tính $u_{10}$.`,
    hint: R`Để ý $u_2 + u_6 = q\,(u_1 + u_5)$. Từ đó tìm $q$, rồi tìm $u_1$.`,
    sol: [R`$u_2 + u_6 = u_1 q + u_5 q = q\,(u_1 + u_5) \Rightarrow 102 = 51q \Rightarrow q = 2$.`, R`$u_1 + u_1 q^4 = 51 \Rightarrow u_1\,(1 + 16) = 51 \Rightarrow u_1 = 3$.`, R`$u_{10} = 3\cdot 2^9 = 3\cdot 512 = 1536$.`] },
  { id: "b5", part: "B", lv: "kho", type: "num", ans: 125 / 1024, label: "$u_{14} =$", show: "125/1024",
    text: R`Một cấp số nhân có tất cả các số hạng đều dương. Số hạng thứ $4$ là $125$ và số hạng thứ $10$ là $\dfrac{125}{64}$. Tìm số hạng thứ $14$. (Có thể nhập dạng phân số.)`,
    hint: R`$\dfrac{u_{10}}{u_4} = q^6$. Các số hạng dương nên $q > 0$.`,
    sol: [R`$q^6 = \dfrac{u_{10}}{u_4} = \dfrac{125/64}{125} = \dfrac{1}{64} \Rightarrow q = \dfrac{1}{2}$ (vì $q > 0$).`, R`$u_{14} = u_{10}\cdot q^4 = \dfrac{125}{64}\cdot\dfrac{1}{16} = \dfrac{125}{1024}$.`] },
  // ---------- C
  { id: "c1", part: "C", lv: "de", type: "num", ans: 242, label: "$S_5 =$",
    text: R`Cho cấp số nhân có $u_1 = 2$ và $q = 3$. Tính tổng $5$ số hạng đầu $S_5$.`,
    hint: R`$S_5 = u_1\cdot\dfrac{1 - q^5}{1 - q}$. Hoặc viết ra 5 số hạng rồi cộng.`,
    sol: [R`$S_5 = 2\cdot\dfrac{1 - 3^5}{1 - 3} = 2\cdot\dfrac{1 - 243}{-2} = 242$.`, R`Kiểm tra: $2 + 6 + 18 + 54 + 162 = 242$.`] },
  { id: "c2", part: "C", lv: "vua", type: "num", ans: 349525, label: "Tổng:",
    text: R`Tính tổng $S = 1 + 4 + 16 + 64 + \dots + 4^9$.`,
    hint: R`Đây là tổng cấp số nhân $u_1 = 1$, $q = 4$. Đếm xem có bao nhiêu số hạng (từ $4^0$ đến $4^9$).`,
    sol: [R`Có $10$ số hạng ($4^0, 4^1, \dots, 4^9$), $u_1 = 1$, $q = 4$.`, R`$S = 1\cdot\dfrac{1 - 4^{10}}{1 - 4} = \dfrac{4^{10} - 1}{3} = \dfrac{1048575}{3} = 349525$.`] },
  { id: "c3", part: "C", lv: "vua", type: "num", ans: 12285, label: "$S_{12} =$",
    text: R`Cho cấp số nhân $(u_n)$ có các số hạng đều không âm, $u_2 = 6$ và $u_4 = 24$. Tính tổng $12$ số hạng đầu.`,
    hint: R`$\dfrac{u_4}{u_2} = q^2$. Số hạng không âm nên chọn $q > 0$.`,
    sol: [R`$q^2 = \dfrac{24}{6} = 4 \Rightarrow q = 2$ (vì các số hạng không âm).`, R`$u_1 = \dfrac{u_2}{q} = 3$.`, R`$S_{12} = 3\cdot\dfrac{1 - 2^{12}}{1 - 2} = 3\,(4096 - 1) = 12285$.`] },
  { id: "c4", part: "C", lv: "kho", type: "num", ans: 8, label: "$n =$",
    text: R`Cho cấp số nhân có $u_1 = 3$ và $q = 2$. Tổng của bao nhiêu số hạng đầu sẽ bằng $765$?`,
    hint: R`$S_n = 3\,(2^n - 1) = 765$. Tìm $2^n$ rồi suy ra $n$.`,
    sol: [R`$S_n = 3\cdot\dfrac{1 - 2^n}{1 - 2} = 3\,(2^n - 1)$.`, R`$3\,(2^n - 1) = 765 \Leftrightarrow 2^n - 1 = 255 \Leftrightarrow 2^n = 256 = 2^8$.`, R`$\Rightarrow n = 8$.`] },
  // ---------- D
  { id: "d1", part: "D", lv: "de", type: "num", ans: 12800, label: "Số vi khuẩn:", unit: "con",
    text: R`Một loài vi khuẩn cứ $20$ phút lại phân đôi một lần. Ban đầu có $200$ vi khuẩn. Hỏi sau $2$ giờ có bao nhiêu vi khuẩn?`,
    hint: R`$2$ giờ có bao nhiêu lần phân đôi? Mỗi lần số vi khuẩn nhân $2$.`,
    sol: [R`$2$ giờ $= 120$ phút $= 6$ lần phân đôi.`, R`Số vi khuẩn: $200\cdot 2^6 = 200\cdot 64 = 12800$ con.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 229.7307, tol: 0.06, label: "Mức lương:", unit: "triệu đồng", show: "229,7",
    text: R`Một kĩ sư được thuê với mức lương năm đầu là $180$ triệu đồng, và mỗi năm lương tăng $5\%$ so với năm trước. Hỏi mức lương của kĩ sư khi bắt đầu năm thứ sáu là bao nhiêu triệu đồng? (Làm tròn đến hàng phần mười.)`,
    hint: R`Lương các năm là cấp số nhân $u_1 = 180$, $q = 1{,}05$. Năm thứ sáu ứng với $u_6$.`,
    sol: [R`$u_6 = 180\cdot 1{,}05^5$.`, R`$1{,}05^5 \approx 1{,}27628$, nên $u_6 \approx 229{,}73$.`, R`Làm tròn: khoảng $229{,}7$ triệu đồng.`] },
  { id: "d3", part: "D", lv: "kho", type: "num", ans: 1747625, label: "Tổng số người:", unit: "người",
    text: R`Trong tuần đầu tiên của một đợt dịch có $5$ người mắc bệnh. Mỗi người bệnh lây cho $4$ người mới vào tuần tiếp theo, nên số người mắc mới mỗi tuần gấp $4$ lần tuần trước. Tính đến hết tuần thứ $10$, tổng cộng có bao nhiêu người đã mắc bệnh?`,
    hint: R`Số người mắc mới mỗi tuần là cấp số nhân $u_1 = 5$, $q = 4$. Cần tính $S_{10}$.`,
    sol: [R`$S_{10} = 5\cdot\dfrac{1 - 4^{10}}{1 - 4} = 5\cdot\dfrac{4^{10} - 1}{3}$.`, R`$= 5\cdot\dfrac{1048575}{3} = 5\cdot 349525 = 1747625$ người.`] }
];

// ---------- LÝ THUYẾT
const { def, formula, note, ex } = window.T;

const THEORY = [
  { id: "dinh-nghia", title: "Cấp số nhân là gì?",
    html: def("Định nghĩa", R`<p><b>Cấp số nhân</b> là một dãy số (hữu hạn hoặc vô hạn) mà kể từ số hạng thứ hai, mỗi số hạng đều bằng số hạng đứng ngay trước nó <b>nhân với một số $q$ không đổi</b>.</p>`)
      + formula(R`u_{n+1} = u_n \cdot q \quad (\forall n \ge 1)`)
      + R`<p>Số $q$ gọi là <b>công bội</b>. Khi các số hạng khác $0$: $q = \dfrac{u_{n+1}}{u_n}$.</p>`
      + note(R`<b>Trường hợp đặc biệt:</b> $q = 0$ cho dãy $u_1, 0, 0, \dots$; $q = 1$ cho dãy không đổi $u_1, u_1, u_1, \dots$; $u_1 = 0$ cho dãy $0, 0, 0, \dots$`)
      + ex(R`<b>Ví dụ 1.</b> Tìm công bội của các cấp số nhân: &nbsp;a) $2; 6; 18; 54$ &nbsp;&nbsp;b) $1; -2; 4; -8$`,
           R`<p>a) $q = \dfrac{6}{2} = 3$. &nbsp;b) $q = \dfrac{-2}{1} = -2$ (công bội âm thì các số hạng đổi dấu liên tục).</p>`)
      + ex(R`<b>Ví dụ 2.</b> Chứng tỏ dãy $u_n = 3\cdot 4^n$ là cấp số nhân. Tìm số hạng đầu và công bội.`,
           R`<p>$\dfrac{u_{n+1}}{u_n} = \dfrac{3\cdot 4^{n+1}}{3\cdot 4^n} = 4$ không đổi, nên là cấp số nhân với $q = 4$.</p><p>$u_1 = 3\cdot 4 = 12$ (chú ý: không phải $3$).</p>`) },

  { id: "so-hang-tong-quat", title: "Số hạng tổng quát",
    html: def("Định lí", R`<p>Nếu cấp số nhân có số hạng đầu $u_1$ và công bội $q \ne 0$ thì:</p>`)
      + formula(R`u_n = u_1 \cdot q^{\,n-1} \qquad (n \ge 2)`)
      + note(R`Nếu đề cho hai số hạng (ví dụ $u_4$ và $u_{10}$), hãy <b>chia</b> chúng cho nhau để triệt tiêu $u_1$: $\dfrac{u_{10}}{u_4} = q^6$.`)
      + ex(R`<b>Ví dụ 3.</b> Cho cấp số nhân có $u_1 = 3$, $q = 2$. Tính $u_6$. Số $384$ là số hạng thứ mấy?`,
           R`<p>$u_6 = 3\cdot 2^5 = 96$.</p><p>$3\cdot 2^{n-1} = 384$ $\iff 2^{n-1} = 128 = 2^7$ $\iff n = 8$. Vậy $384$ là số hạng thứ $8$.</p>`) },

  { id: "tinh-chat", title: "Tính chất ba số hạng liên tiếp",
    html: def("Định lí", R`<p>Trong một cấp số nhân, kể từ số hạng thứ hai, <b>bình phương</b> mỗi số hạng bằng <b>tích</b> hai số hạng đứng kề nó:</p>`)
      + formula(R`u_k^2 = u_{k-1}\cdot u_{k+1}`)
      + note(R`<b>Hệ quả:</b> ba số khác $0$ là $a, b, c$ (theo thứ tự đó) lập thành cấp số nhân $\iff b^2 = a\cdot c$.`)
      + ex(R`<b>Ví dụ 4.</b> Tìm $x$ để $x,\ x + 2,\ x + 3$ là ba số hạng liên tiếp của một cấp số nhân.`,
           R`<p>$(x + 2)^2 = x(x + 3)$ $\iff x^2 + 4x + 4 = x^2 + 3x$ $\iff x = -4$.</p><p>Thử lại: ba số $-4, -2, -1$ có công bội $\dfrac{1}{2}$. Đúng.</p>`) },

  { id: "tong", title: "Tổng n số hạng đầu",
    html: def("Định lí", R`<p>Gọi $S_n = u_1 + u_2 + \dots + u_n$ là tổng $n$ số hạng đầu của cấp số nhân có công bội $q$. Khi đó:</p>`)
      + formula(R`S_n = u_1\cdot\frac{1 - q^n}{1 - q}\quad (q \ne 1), \qquad S_n = n\,u_1\quad (q = 1)`)
      + note(R`Đếm đúng số số hạng $n$. Ví dụ $1 + 2 + 2^2 + \dots + 2^9$ có $10$ số hạng (từ $2^0$ đến $2^9$), không phải $9$.`)
      + ex(R`<b>Ví dụ 5.</b> Tính tổng $1 + 2 + 4 + 8 + \dots + 2^9$.`,
           R`<p>Cấp số nhân $u_1 = 1$, $q = 2$, có $10$ số hạng.</p><p>$S_{10} = 1\cdot\dfrac{1 - 2^{10}}{1 - 2} = 2^{10} - 1 = 1023$.</p>`) },

  { id: "thuc-te", title: "Vận dụng vào bài toán thực tế",
    html: R`<p>Khi một đại lượng cứ sau mỗi kì lại <b>nhân lên một số lần cố định</b> thì đó là cấp số nhân: vi khuẩn phân đôi, tiền gửi có lãi kép, giá trị tài sản giảm theo phần trăm…</p>
      <ul><li>Tăng $p\%$ mỗi kì: nhân với $q = 1 + \dfrac{p}{100}$ (tăng $5\%$ thì $q = 1{,}05$).</li>
      <li>Giảm $p\%$ mỗi kì: nhân với $q = 1 - \dfrac{p}{100}$ (giảm $10\%$ thì $q = 0{,}9$).</li>
      <li>Phân đôi: $q = 2$. Chú ý đếm đúng số lần (2 giờ, cứ 20 phút phân đôi một lần, là $6$ lần).</li></ul>`
      + ex(R`<b>Ví dụ 6.</b> Gửi $100$ triệu đồng, lãi suất $6\%$ một năm, lãi nhập vào gốc (lãi kép). Sau $3$ năm có bao nhiêu tiền?`,
           R`<p>Mỗi năm số tiền nhân với $1{,}06$.</p><p>Sau 3 năm: $100\cdot 1{,}06^3 \approx 119{,}1$ triệu đồng.</p>`) },

  { id: "so-sanh", title: "So sánh cấp số cộng và cấp số nhân",
    html: R`<div class="tbl"><table>
      <thead><tr><th></th><th>Cấp số cộng</th><th>Cấp số nhân</th></tr></thead>
      <tbody>
        <tr><th>Quy luật</th><td>$u_{n+1} = u_n + d$</td><td>$u_{n+1} = u_n\cdot q$</td></tr>
        <tr><th>Số hạng tổng quát</th><td>$u_1 + (n-1)d$</td><td>$u_1\cdot q^{n-1}$</td></tr>
        <tr><th>Ba số $a, b, c$</th><td>$a + c = 2b$</td><td>$b^2 = ac$</td></tr>
        <tr><th>Tổng $S_n$</th><td>$\dfrac{n(u_1 + u_n)}{2}$</td><td>$u_1\dfrac{1 - q^n}{1 - q}$</td></tr>
        <tr><th>Thực tế</th><td>Tăng đều một lượng</td><td>Tăng theo phần trăm, gấp lên</td></tr>
      </tbody></table></div>` }
];

const SUMMARY = R`<ul>
  <li>Định nghĩa: $u_{n+1} = u_n\cdot q$, công bội $q = \dfrac{u_{n+1}}{u_n}$.</li>
  <li>Số hạng tổng quát: $u_n = u_1\cdot q^{n-1}$.</li>
  <li>Ba số khác $0$ là $a, b, c$ lập thành cấp số nhân $\iff b^2 = ac$.</li>
  <li>Tổng ($q \ne 1$): $S_n = u_1\cdot\dfrac{1 - q^n}{1 - q}$.</li>
</ul>`;

window.LESSON = { parts: PARTS, questions: QS, theory: THEORY, summary: SUMMARY };
})();
