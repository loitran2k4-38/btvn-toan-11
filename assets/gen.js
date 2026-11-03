// Công cụ dùng chung cho các bộ sinh đề Luyện tập (data/<slug>.js -> gen(G, r)).
// Cùng một mã (seed) luôn sinh ra cùng một đề.
(function () {
  function rng(seed) {
    let a = (seed >>> 0) || 1;
    const next = () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const int = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
    const pick = arr => arr[Math.floor(next() * arr.length)];
    const shuffle = arr => {
      const b = arr.slice();
      for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
      return b;
    };
    const nz = (lo, hi) => { let v = 0; while (v === 0) v = int(lo, hi); return v; };
    return { next, int, pick, shuffle, nz };
  }

  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };

  // Số -> TeX (dấu phẩy thập phân kiểu Việt Nam)
  const t = x => {
    if (Number.isInteger(x)) return String(x);
    const s = String(+x.toFixed(10));
    return s.replace(".", "{,}");
  };
  // Số -> chuỗi hiển thị đáp số (làm tròn k chữ số thập phân)
  const show = (x, k) => {
    const p = Math.pow(10, k || 0);
    const v = Math.round((x + Math.sign(x) * 1e-9) * p) / p;
    return String(v).replace(".", ",");
  };
  // Phân số tối giản p/q -> TeX
  const fr = (p, q) => {
    if (q < 0) { p = -p; q = -q; }
    const g = gcd(p, q); p /= g; q /= g;
    if (q === 1) return String(p);
    return (p < 0 ? "-" : "") + `\\dfrac{${Math.abs(p)}}{${q}}`;
  };
  const frText = (p, q) => {
    if (q < 0) { p = -p; q = -q; }
    const g = gcd(p, q); p /= g; q /= g;
    return q === 1 ? String(p) : `${p}/${q}`;
  };
  // a*v + b
  const lin = (a, b, v) => {
    v = v || "n";
    let s = a === 0 ? "" : a === 1 ? v : a === -1 ? "-" + v : a + v;
    if (b !== 0) s += s ? (b > 0 ? " + " + b : " - " + Math.abs(b)) : String(b);
    return s || "0";
  };
  // a n^2 + b n + c
  const poly2 = (a, b, c) => {
    let s = a === 1 ? "n^2" : a === -1 ? "-n^2" : a + "n^2";
    if (b) s += (b > 0 ? " + " : " - ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "n";
    if (c) s += (c > 0 ? " + " : " - ") + Math.abs(c);
    return s;
  };
  const par = x => (x < 0 ? `(${t(x)})` : t(x));
  const list = arr => arr.map(t).join(";\\ ");
  // Trắc nghiệm: xáo các phương án, trả về { opts, correct }
  const mc = (r, right, wrongs) => {
    const all = [right].concat(wrongs);
    const order = r.shuffle(all.map((_, i) => i));
    return { opts: order.map(i => all[i]), correct: order.indexOf(0) };
  };

  window.G = { rng, gcd, t, show, fr, frText, lin, poly2, par, list, mc };
})();
