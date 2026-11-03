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

// ---------- ĐỀ 2
const QS2 = [
  { id: "a1", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Dãy số nào sau đây là cấp số nhân?`,
    opts: [R`$3;\ 6;\ 12;\ 24;\ 48$`, R`$3;\ 6;\ 9;\ 12;\ 15$`, R`$1;\ 2;\ 3;\ 5;\ 8$`, R`$2;\ 4;\ 12;\ 48;\ 240$`],
    hint: R`Lấy số sau chia số trước. Dãy nào có các thương bằng nhau?`,
    sol: [R`$3;\ 6;\ 12;\ 24;\ 48$: mỗi số gấp đôi số trước, $q = 2$.`, R`$3; 6; 9; \dots$ là cấp số cộng. Hai dãy còn lại có thương thay đổi ($2, 3, 4, 5$ ở dãy cuối).`] },
  { id: "a2", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Cho cấp số nhân $u_n = 5\cdot 2^n$. Số hạng đầu và công bội là:`,
    opts: [R`$u_1 = 10,\ q = 2$`, R`$u_1 = 5,\ q = 2$`, R`$u_1 = 10,\ q = 5$`, R`$u_1 = 2,\ q = 5$`],
    hint: R`Thay $n = 1$; $q = \dfrac{u_{n+1}}{u_n}$.`,
    sol: [R`$u_1 = 5\cdot 2 = 10$, $\dfrac{u_{n+1}}{u_n} = 2$.`] },
  { id: "a3", part: "A", lv: "vua", type: "num", ans: 3, label: "$x =$",
    text: R`Tìm $x$ để $x,\ x + 3,\ x + 9$ (theo thứ tự đó) lập thành một cấp số nhân.`,
    hint: R`$b^2 = a\cdot c$.`,
    sol: [R`$(x + 3)^2 = x(x + 9)$ $\Leftrightarrow x^2 + 6x + 9 = x^2 + 9x$ $\Leftrightarrow x = 3$.`, R`Thử lại: $3;\ 6;\ 12$, $q = 2$. Đúng.`] },
  { id: "a4", part: "A", lv: "vua", type: "mc", correct: 1,
    text: R`Dãy số $(u_n)$ nào sau đây là cấp số nhân?`,
    opts: [R`$u_n = 2^n + 1$`, R`$u_n = 3\cdot(-2)^n$`, R`$u_n = 3n$`, R`$u_n = n\cdot 2^n$`],
    hint: R`Tính $\dfrac{u_{n+1}}{u_n}$, xem dãy nào cho hằng số.`,
    sol: [R`$\dfrac{3\cdot(-2)^{n+1}}{3\cdot(-2)^n} = -2$ không đổi: cấp số nhân với $q = -2$.`, R`$2^n + 1$: $3, 5, 9$ (thương thay đổi); $3n$ là cấp số cộng; $n\cdot 2^n$: $2, 8, 24$ (thương $4$ rồi $3$).`] },
  { id: "b1", part: "B", lv: "de", type: "num", ans: -96, label: "$u_6 =$",
    text: R`Cho cấp số nhân có $u_1 = 3$, $q = -2$. Tính $u_6$.`,
    hint: R`$u_6 = u_1\cdot q^5$. Lũy thừa bậc lẻ của số âm là số âm.`,
    sol: [R`$u_6 = 3\cdot(-2)^5 = 3\cdot(-32) = -96$.`] },
  { id: "b2", part: "B", lv: "vua", type: "num", ans: 6, label: "Số hạng thứ",
    text: R`Cho cấp số nhân có $u_1 = 2$, $q = 3$. Số $486$ là số hạng thứ mấy?`,
    hint: R`Giải $2\cdot 3^{n-1} = 486$.`,
    sol: [R`$3^{n-1} = 243 = 3^5 \Rightarrow n = 6$.`] },
  { id: "b3", part: "B", lv: "vua", type: "num", ans: 1 / 9, label: "$u_7 =$", show: "1/9",
    text: R`Tìm số hạng thứ $7$ của cấp số nhân $81;\ 27;\ 9;\ \dots$ (Có thể nhập dạng phân số.)`,
    hint: R`$q = \dfrac{27}{81} = \dfrac{1}{3}$.`,
    sol: [R`$u_7 = 81\cdot\left(\dfrac{1}{3}\right)^6 = \dfrac{81}{729} = \dfrac{1}{9}$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 9, label: "$u_1 =$",
    text: R`Cho cấp số nhân có $u_4 - u_2 = 54$ và $u_5 - u_3 = 108$. Tìm $u_1$.`,
    hint: R`$u_5 - u_3 = q\,(u_4 - u_2)$.`,
    sol: [R`$108 = 54q \Rightarrow q = 2$.`, R`$u_4 - u_2 = u_1(q^3 - q) = 6u_1 = 54 \Rightarrow u_1 = 9$.`] },
  { id: "b5", part: "B", lv: "kho", type: "num", ans: 768, label: "$u_9 =$",
    text: R`Cấp số nhân có các số hạng đều dương, $u_3 = 12$ và $u_7 = 192$. Tính $u_9$.`,
    hint: R`$\dfrac{u_7}{u_3} = q^4$.`,
    sol: [R`$q^4 = 16 \Rightarrow q = 2$ (vì $q > 0$).`, R`$u_9 = u_7\cdot q^2 = 192\cdot 4 = 768$.`] },
  { id: "c1", part: "C", lv: "de", type: "num", ans: 255, label: "$S_8 =$",
    text: R`Cho cấp số nhân có $u_1 = 1$, $q = 2$. Tính $S_8$.`,
    hint: R`$S_8 = \dfrac{1 - 2^8}{1 - 2}$.`,
    sol: [R`$S_8 = \dfrac{1 - 256}{-1} = 255$.`] },
  { id: "c2", part: "C", lv: "vua", type: "num", ans: 765, label: "Tổng:",
    text: R`Tính tổng $S = 3 + 6 + 12 + \dots + 384$.`,
    hint: R`$u_1 = 3$, $q = 2$. Tìm số số hạng: $3\cdot 2^{n-1} = 384$.`,
    sol: [R`$2^{n-1} = 128 \Rightarrow n = 8$.`, R`$S_8 = 3\cdot\dfrac{1 - 2^8}{1 - 2} = 3\cdot 255 = 765$.`] },
  { id: "c3", part: "C", lv: "vua", type: "num", ans: 59048, label: "$S_{10} =$",
    text: R`Cấp số nhân có $u_1 = 2$, $u_3 = 18$ và công bội dương. Tính tổng $10$ số hạng đầu.`,
    hint: R`$q^2 = \dfrac{u_3}{u_1} = 9$.`,
    sol: [R`$q = 3$.`, R`$S_{10} = 2\cdot\dfrac{1 - 3^{10}}{1 - 3} = 3^{10} - 1 = 59048$.`] },
  { id: "c4", part: "C", lv: "kho", type: "num", ans: 126, label: "$S_6 =$",
    text: R`Cấp số nhân có $q = 2$ và $u_1 + u_2 + u_3 = 14$. Tính $S_6$.`,
    hint: R`$u_1 + u_2 + u_3 = u_1(1 + 2 + 4)$.`,
    sol: [R`$7u_1 = 14 \Rightarrow u_1 = 2$.`, R`$S_6 = 2\cdot(2^6 - 1) = 126$.`] },
  { id: "d1", part: "D", lv: "de", type: "num", ans: 0.625, tol: 0.0001, label: "Độ cao:", unit: "m", show: "0,625",
    text: R`Thả một quả bóng từ độ cao $10$ m. Mỗi lần chạm đất, bóng nảy lên bằng một nửa độ cao lần rơi trước. Hỏi ở lần nảy thứ $4$, bóng lên cao bao nhiêu mét?`,
    hint: R`Độ cao các lần nảy là cấp số nhân $u_1 = 5$, $q = \dfrac{1}{2}$.`,
    sol: [R`Lần nảy thứ nhất cao $5$ m, mỗi lần sau bằng một nửa lần trước.`, R`$u_4 = 5\cdot\left(\dfrac{1}{2}\right)^3 = 0{,}625$ m.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 238.2032, tol: 0.06, label: "Lương:", unit: "triệu đồng", show: "238,2",
    text: R`Lương năm đầu của một người là $200$ triệu đồng, mỗi năm tăng $6\%$ so với năm trước. Tính lương năm thứ $4$. (Làm tròn đến hàng phần mười.)`,
    hint: R`$u_4 = 200\cdot 1{,}06^3$.`,
    sol: [R`$u_4 = 200\cdot 1{,}06^3 = 200\cdot 1{,}191016 \approx 238{,}2$ triệu đồng.`] },
  { id: "d3", part: "D", lv: "kho", type: "num", ans: 9840, label: "Tổng số người:", unit: "người",
    text: R`Tuần đầu tiên của một đợt dịch có $3$ người mắc. Mỗi tuần, số người mắc mới gấp $3$ lần tuần trước. Tính đến hết tuần thứ $8$ có tổng cộng bao nhiêu người mắc bệnh?`,
    hint: R`Tổng $8$ số hạng của cấp số nhân $u_1 = 3$, $q = 3$.`,
    sol: [R`$S_8 = 3\cdot\dfrac{3^8 - 1}{3 - 1} = 3\cdot\dfrac{6560}{2} = 9840$ người.`] }
];

// ---------- ĐỀ 3
const QS3 = [
  { id: "a1", part: "A", lv: "de", type: "mc", correct: 0,
    text: R`Cấp số nhân $2;\ -6;\ 18;\ -54;\ \dots$ có công bội là:`,
    opts: [R`$q = -3$`, R`$q = 3$`, R`$q = -2$`, R`$q = \dfrac{1}{3}$`],
    hint: R`$q = \dfrac{u_2}{u_1}$.`,
    sol: [R`$q = \dfrac{-6}{2} = -3$.`] },
  { id: "a2", part: "A", lv: "de", type: "num", ans: 324, label: "$u_5 =$",
    text: R`Cho cấp số nhân có $u_1 = 4$, $q = 3$. Tính $u_5$.`,
    hint: R`$u_5 = u_1\cdot q^4$.`,
    sol: [R`$u_5 = 4\cdot 3^4 = 4\cdot 81 = 324$.`] },
  { id: "a3", part: "A", lv: "vua", type: "num", ans: 5, label: "$x =$",
    text: R`Tìm $x$ để $x - 2,\ x + 1,\ x + 7$ (theo thứ tự đó) lập thành một cấp số nhân.`,
    hint: R`$(x + 1)^2 = (x - 2)(x + 7)$.`,
    sol: [R`$x^2 + 2x + 1 = x^2 + 5x - 14$ $\Leftrightarrow 3x = 15 \Leftrightarrow x = 5$.`, R`Thử lại: $3;\ 6;\ 12$. Đúng.`] },
  { id: "a4", part: "A", lv: "vua", type: "mc", correct: 3,
    text: R`Dãy số nào sau đây <b>không</b> là cấp số nhân?`,
    opts: [R`$u_n = 7\cdot 3^n$`, R`$u_n = (-2)^n$`, R`$u_n = \dfrac{1}{2^n}$`, R`$u_n = 2n + 1$`],
    hint: R`Dãy nào có $\dfrac{u_{n+1}}{u_n}$ phụ thuộc vào $n$?`,
    sol: [R`$u_n = 2n + 1$: $3, 5, 7$, thương $\dfrac{5}{3}$ rồi $\dfrac{7}{5}$, nên không là cấp số nhân (đây là cấp số cộng).`, R`Ba dãy còn lại có công bội $3$, $-2$, $\dfrac{1}{2}$.`] },
  { id: "b1", part: "B", lv: "de", type: "num", ans: -162, label: "$u_5 =$",
    text: R`Cho cấp số nhân có $u_1 = -2$, $q = 3$. Tính $u_5$.`,
    hint: R`$u_5 = u_1\cdot q^4$.`,
    sol: [R`$u_5 = -2\cdot 81 = -162$.`] },
  { id: "b2", part: "B", lv: "vua", type: "num", ans: 8, label: "Số hạng thứ",
    text: R`Cho cấp số nhân có $u_1 = 5$, $q = 2$. Số $640$ là số hạng thứ mấy?`,
    hint: R`Giải $5\cdot 2^{n-1} = 640$.`,
    sol: [R`$2^{n-1} = 128 = 2^7 \Rightarrow n = 8$.`] },
  { id: "b3", part: "B", lv: "vua", type: "num", ans: 729, label: "$u_7 =$",
    text: R`Tìm số hạng thứ $7$ của cấp số nhân $1;\ -3;\ 9;\ -27;\ \dots$`,
    hint: R`$q = -3$; lũy thừa bậc chẵn của số âm là số dương.`,
    sol: [R`$u_7 = 1\cdot(-3)^6 = 729$.`] },
  { id: "b4", part: "B", lv: "vua", type: "num", ans: 256, label: "$u_8 =$",
    text: R`Cho cấp số nhân có $u_1 + u_5 = 34$ và $u_2 + u_6 = 68$. Tính $u_8$.`,
    hint: R`$u_2 + u_6 = q\,(u_1 + u_5)$.`,
    sol: [R`$q = \dfrac{68}{34} = 2$.`, R`$u_1(1 + 2^4) = 34 \Rightarrow u_1 = 2$.`, R`$u_8 = 2\cdot 2^7 = 256$.`] },
  { id: "b5", part: "B", lv: "kho", type: "num", ans: 54, label: "$u_4 =$",
    text: R`Cấp số nhân có các số hạng đều dương, $u_2 = 6$ và $u_6 = 486$. Tính $u_4$.`,
    hint: R`$\dfrac{u_6}{u_2} = q^4$. Hoặc dùng tính chất $u_4^2 = u_2\cdot u_6$.`,
    sol: [R`$q^4 = 81 \Rightarrow q = 3$.`, R`$u_4 = u_2\cdot q^2 = 6\cdot 9 = 54$. (Kiểm tra: $54^2 = 2916 = 6\cdot 486$.)`] },
  { id: "c1", part: "C", lv: "de", type: "num", ans: 120, label: "$S_4 =$",
    text: R`Cho cấp số nhân có $u_1 = 3$, $q = 3$. Tính tổng $4$ số hạng đầu.`,
    hint: R`Viết ra 4 số hạng rồi cộng, hoặc dùng công thức $S_n$.`,
    sol: [R`$3 + 9 + 27 + 81 = 120$.`, R`Hoặc $S_4 = 3\cdot\dfrac{3^4 - 1}{3 - 1} = 3\cdot 40 = 120$.`] },
  { id: "c2", part: "C", lv: "vua", type: "num", ans: 3280, label: "Tổng:",
    text: R`Tính tổng $S = 1 + 3 + 9 + \dots + 3^7$.`,
    hint: R`Có $8$ số hạng (từ $3^0$ đến $3^7$), $q = 3$.`,
    sol: [R`$S = \dfrac{3^8 - 1}{3 - 1} = \dfrac{6560}{2} = 3280$.`] },
  { id: "c3", part: "C", lv: "vua", type: "num", ans: 508, label: "$S_7 =$",
    text: R`Cấp số nhân có $u_2 = 8$ và $u_5 = 64$. Tính $S_7$.`,
    hint: R`$\dfrac{u_5}{u_2} = q^3$.`,
    sol: [R`$q^3 = 8 \Rightarrow q = 2$, $u_1 = 4$.`, R`$S_7 = 4\cdot(2^7 - 1) = 4\cdot 127 = 508$.`] },
  { id: "c4", part: "C", lv: "kho", type: "num", ans: 7, label: "$n =$",
    text: R`Cấp số nhân có $u_1 = 1$, $q = 3$. Tổng của bao nhiêu số hạng đầu bằng $1093$?`,
    hint: R`$S_n = \dfrac{3^n - 1}{2} = 1093$.`,
    sol: [R`$3^n - 1 = 2186 \Rightarrow 3^n = 2187 = 3^7 \Rightarrow n = 7$.`] },
  { id: "d1", part: "D", lv: "de", type: "num", ans: 1600, label: "Số vi khuẩn:", unit: "con",
    text: R`Ban đầu có $100$ vi khuẩn, cứ $15$ phút lại phân đôi một lần. Hỏi sau $1$ giờ có bao nhiêu vi khuẩn?`,
    hint: R`$1$ giờ có $4$ lần phân đôi.`,
    sol: [R`Sau $4$ lần phân đôi: $100\cdot 2^4 = 1600$ con.`] },
  { id: "d2", part: "D", lv: "vua", type: "num", ans: 368.475, tol: 0.06, label: "Giá trị:", unit: "triệu đồng", show: "368,5",
    text: R`Một chiếc ô tô mua mới giá $600$ triệu đồng, mỗi năm giá trị giảm $15\%$ so với năm trước. Sau $3$ năm xe còn giá trị bao nhiêu triệu đồng? (Làm tròn đến hàng phần mười.)`,
    hint: R`Giảm $15\%$ nghĩa là nhân với $0{,}85$ mỗi năm.`,
    sol: [R`$600\cdot 0{,}85^3 = 600\cdot 0{,}614125 = 368{,}475 \approx 368{,}5$ triệu đồng.`] },
  { id: "d3", part: "D", lv: "kho", type: "num", ans: 6, label: "Số năm:", unit: "năm",
    text: R`Gửi $100$ triệu đồng, lãi suất $8\%$ một năm, lãi nhập vào gốc. Sau ít nhất bao nhiêu năm thì số tiền vượt $150$ triệu đồng?`,
    hint: R`Tìm $n$ nhỏ nhất để $100\cdot 1{,}08^n > 150$. Thử lần lượt $n = 5, 6, \dots$`,
    sol: [R`Cần $1{,}08^n > 1{,}5$.`, R`$1{,}08^5 \approx 1{,}469 < 1{,}5$, còn $1{,}08^6 \approx 1{,}587 > 1{,}5$.`, R`Vậy sau ít nhất $6$ năm.`] }
];

// ---------- LUYỆN TẬP: sinh đề theo mã
function gen(G, r) {
  const { t, fr, frText, lin, par, list, mc, show } = G;
  const Q = [];
  const pw = (b, e) => Math.pow(b, e);

  // A1. Nhận biết cấp số nhân
  { const a = r.pick([1, 2, 3, -1, -2]), q = r.pick([2, 3, -2]);
    const gp = [0, 1, 2, 3, 4].map(i => a * pw(q, i));
    const ap = [1, 2, 3, 4, 5].map(i => a * i);
    const bump = gp.slice(); bump[4] += a > 0 ? 1 : -1;
    const fib = [1, 2, 3, 5, 8].map(x => x * Math.abs(a));
    const m = mc(r, R`$${list(gp)}$`, [ap, bump, fib].map(l => R`$${list(l)}$`));
    Q.push(Object.assign({ part: "A", lv: "de", type: "mc",
      text: R`Dãy số nào sau đây là cấp số nhân?`,
      hint: R`Lấy số sau chia số trước. Dãy nào có tất cả các thương bằng nhau?`,
      sol: [R`$${list(gp)}$: mỗi số bằng số trước nhân $${q}$, nên là cấp số nhân với $q = ${q}$.`, R`Các dãy còn lại có thương thay đổi.`] }, m)); }

  // A2. Tính u_k
  { const a = r.pick([1, 2, 3, 5, -1, -2, -3]), q = r.pick([2, 3, -2, -3]), k = r.int(4, 7), v = a * pw(q, k - 1);
    Q.push({ part: "A", lv: "de", type: "num", ans: v, label: R`$u_${k} =$`,
      text: R`Cho cấp số nhân có $u_1 = ${a}$, $q = ${q}$. Tính $u_${k}$.`,
      hint: R`$u_${k} = u_1\cdot q^${k - 1}$.${q < 0 ? " Chú ý dấu của lũy thừa số âm." : ""}`,
      sol: [R`$u_${k} = ${a}\cdot ${par(q)}^${k - 1} = ${a}\cdot ${par(pw(q, k - 1))} = ${v}$.`] }); }

  // A3. Tìm x để ba số lập thành cấp số nhân
  { const a = r.pick([1, 2, 3, -1, -2]), q = r.pick([2, 3, -2]), x0 = r.int(-5, 6);
    const v = [a, a * q, a * q * q], c = v.map(val => val - x0);
    const e = i => lin(1, c[i], "x");
    const L = 2 * c[1] - c[0] - c[2], Rr = c[0] * c[2] - c[1] * c[1];
    Q.push({ part: "A", lv: "vua", type: "num", ans: x0, label: "$x =$",
      text: R`Tìm $x$ để $${e(0)},\ ${e(1)},\ ${e(2)}$ (theo thứ tự đó) lập thành một cấp số nhân.`,
      hint: R`$a, b, c$ lập thành cấp số nhân $\Leftrightarrow b^2 = a\cdot c$.`,
      sol: [R`$(${e(1)})^2 = (${e(0)})(${e(2)})$`, R`Khai triển, $x^2$ hai vế triệt tiêu: $${lin(L, 0, "x")} = ${Rr} \Leftrightarrow x = ${x0}$.`, R`Thử lại: $${list(v)}$, công bội $${q}$.`] }); }

  // B1. Số đã cho là số hạng thứ mấy
  { const a = r.pick([1, 2, 3, 5]), q = r.pick([2, 3]), k = r.int(5, 9), v = a * pw(q, k - 1);
    Q.push({ part: "B", lv: "vua", type: "num", ans: k, label: "Số hạng thứ",
      text: R`Cho cấp số nhân có $u_1 = ${a}$, $q = ${q}$. Số $${v}$ là số hạng thứ mấy?`,
      hint: R`Giải $${a === 1 ? "" : a + "\\cdot "}${q}^{n-1} = ${v}$.`,
      sol: [R`$${q}^{n-1} = ${pw(q, k - 1)} = ${q}^{${k - 1}} \Rightarrow n = ${k}$.`] }); }

  // B2. Số hạng là phân số
  { const D = r.pick([2, 3]), s = r.pick([1, 3, 5].filter(x => x % D !== 0)), sign = r.pick([1, -1]), k = r.int(7, 9);
    const u1 = s * pw(D, 5), num = s * pw(sign, k - 1), den = pw(D, k - 6);
    const qTex = (sign < 0 ? "-" : "") + R`\dfrac{1}{${D}}`;
    const terms = [0, 1, 2].map(i => fr(u1 * pw(sign, i), pw(D, i)));
    Q.push({ part: "B", lv: "vua", type: "num", ans: num / den, show: frText(num, den), label: R`$u_${k} =$`,
      text: R`Tìm số hạng thứ $${k}$ của cấp số nhân $${terms.join(";\\ ")};\ \dots$ (Có thể nhập dạng phân số.)`,
      hint: R`$q = \dfrac{u_2}{u_1} = ${qTex}$.`,
      sol: [R`$u_1 = ${u1}$, $q = ${qTex}$.`, R`$u_${k} = ${u1}\cdot\left(${qTex}\right)^${k - 1} = ${fr(num, den)}$.`] }); }

  // B3. Biết tổng hai cặp số hạng
  { const a = r.int(1, 5), q = r.pick([2, 3, -2]), A = a * (1 + q * q), B = q * A, k = r.int(5, 7), v = a * pw(q, k - 1);
    Q.push({ part: "B", lv: "kho", type: "num", ans: v, label: R`$u_${k} =$`,
      text: R`Cho cấp số nhân có $u_1 + u_3 = ${A}$ và $u_2 + u_4 = ${B}$. Tính $u_${k}$.`,
      hint: R`$u_2 + u_4 = q\,(u_1 + u_3)$.`,
      sol: [R`$q = \dfrac{${B}}{${A}} = ${q}$.`, R`$u_1(1 + q^2) = ${A} \Rightarrow u_1 = \dfrac{${A}}{${1 + q * q}} = ${a}$.`, R`$u_${k} = ${a}\cdot ${par(q)}^${k - 1} = ${v}$.`] }); }

  // C1. Tính S_n
  { const a = r.int(1, 5), q = r.pick([2, 3]), n = r.int(5, 9), S = a * (pw(q, n) - 1) / (q - 1);
    Q.push({ part: "C", lv: "de", type: "num", ans: S, label: R`$S_${n} =$`,
      text: R`Cho cấp số nhân có $u_1 = ${a}$, $q = ${q}$. Tính tổng $${n}$ số hạng đầu.`,
      hint: R`$S_${n} = u_1\cdot\dfrac{1 - q^${n}}{1 - q}$.`,
      sol: [R`$S_${n} = ${a}\cdot\dfrac{1 - ${q}^${n}}{1 - ${q}} = ${a}\cdot\dfrac{${pw(q, n) - 1}}{${q - 1}} = ${S}$.`] }); }

  // C2. Tổng lũy thừa
  { const q = r.pick([2, 3, 4, 5]), m = r.int(4, q > 3 ? 6 : 8), S = (pw(q, m + 1) - 1) / (q - 1);
    Q.push({ part: "C", lv: "vua", type: "num", ans: S, label: "Tổng:",
      text: R`Tính tổng $S = 1 + ${q} + ${q * q} + \dots + ${q}^${m}$.`,
      hint: R`Cấp số nhân $u_1 = 1$, $q = ${q}$, có $${m + 1}$ số hạng (từ $${q}^0$ đến $${q}^${m}$).`,
      sol: [R`$S = \dfrac{${q}^{${m + 1}} - 1}{${q} - 1} = \dfrac{${pw(q, m + 1) - 1}}{${q - 1}} = ${S}$.`] }); }

  // C3. Từ u2, u4 tính S_n
  { const a = r.int(1, 5), q = r.pick([2, 3]), n = r.int(5, 8), S = a * (pw(q, n) - 1) / (q - 1);
    Q.push({ part: "C", lv: "vua", type: "num", ans: S, label: R`$S_${n} =$`,
      text: R`Cấp số nhân có các số hạng đều dương, $u_2 = ${a * q}$ và $u_4 = ${a * q * q * q}$. Tính tổng $${n}$ số hạng đầu.`,
      hint: R`$\dfrac{u_4}{u_2} = q^2$, chọn $q > 0$.`,
      sol: [R`$q^2 = ${q * q} \Rightarrow q = ${q}$, $u_1 = \dfrac{${a * q}}{${q}} = ${a}$.`, R`$S_${n} = ${a}\cdot\dfrac{${q}^${n} - 1}{${q} - 1} = ${S}$.`] }); }

  // C4. Tìm n từ S_n
  { const a = r.int(1, 5), q = r.pick([2, 3]), n = r.int(4, 9), S = a * (pw(q, n) - 1) / (q - 1);
    Q.push({ part: "C", lv: "kho", type: "num", ans: n, label: "$n =$",
      text: R`Cấp số nhân có $u_1 = ${a}$, $q = ${q}$. Tổng của bao nhiêu số hạng đầu bằng $${S}$?`,
      hint: R`$S_n = ${a === 1 ? "" : a + "\\cdot"}\dfrac{${q}^n - 1}{${q - 1}} = ${S}$. Tìm $${q}^n$.`,
      sol: [R`$${q}^n - 1 = \dfrac{${S}\cdot ${q - 1}}{${a}} = ${pw(q, n) - 1}$ $\Rightarrow ${q}^n = ${pw(q, n)} = ${q}^${n}$.`, R`Vậy $n = ${n}$.`] }); }

  // D1. Bóng nảy
  { const h = r.pick([8, 12, 16, 20, 24]), k = r.int(2, 5), v = h / pw(2, k);
    Q.push({ part: "D", lv: "de", type: "num", ans: v, tol: 0.0001, label: "Độ cao:", unit: "m", show: show(v, 4),
      text: R`Thả một quả bóng từ độ cao $${h}$ m. Mỗi lần chạm đất, bóng nảy lên bằng một nửa độ cao lần rơi trước. Ở lần nảy thứ $${k}$, bóng lên cao bao nhiêu mét?`,
      hint: R`Độ cao các lần nảy là cấp số nhân $u_1 = ${t(h / 2)}$, $q = \dfrac{1}{2}$.`,
      sol: [R`$u_${k} = ${t(h / 2)}\cdot\left(\dfrac{1}{2}\right)^${k - 1} = ${t(v)}$ m.`] }); }

  // D2. Tăng/giảm phần trăm
  { const up = r.next() < 0.5, V = r.pick([100, 150, 200, 250]), p = up ? r.pick([4, 5, 6, 8]) : r.pick([10, 15, 20]), n = r.int(2, 5);
    const f = up ? 1 + p / 100 : 1 - p / 100, v = V * pw(f, n);
    Q.push({ part: "D", lv: "vua", type: "num", ans: v, tol: 0.06, label: "Giá trị:", unit: "triệu đồng", show: show(v, 1),
      text: up
        ? R`Lương năm đầu của một người là $${V}$ triệu đồng, mỗi năm tăng $${p}\%$ so với năm trước. Tính lương năm thứ $${n + 1}$. (Làm tròn đến hàng phần mười.)`
        : R`Một chiếc xe mua mới giá $${V}$ triệu đồng, mỗi năm giá trị giảm $${p}\%$. Sau $${n}$ năm xe còn bao nhiêu triệu đồng? (Làm tròn đến hàng phần mười.)`,
      hint: R`Mỗi năm nhân với $q = ${t(f)}$.`,
      sol: [R`$${V}\cdot ${t(f)}^${n} \approx ${t(+v.toFixed(4))} \approx ${show(v, 1).replace(",", "{,}")}$ triệu đồng.`] }); }

  return Q.map((q, i) => Object.assign({ id: "g" + (i + 1) }, q));
}

window.LESSON = { parts: PARTS, sets: [QS, QS2, QS3], gen, theory: THEORY, summary: SUMMARY };
})();
