// Trang bài dùng chung: bai.html?b=<slug>
// 1) Tìm bài trong window.CATALOG  2) nạp data/<slug>.js  3) dựng trang và chấm bài.
(function () {
  const C = window.CATALOG;
  const LV = { de: ["Dễ", "lv-de"], vua: ["Vừa", "lv-vua"], kho: ["Khó", "lv-kho"] };
  const LETTERS = ["A", "B", "C", "D", "E"];
  const $ = id => document.getElementById(id);

  // ---------- Mẫu HTML cho phần lý thuyết (dùng trong data/<slug>.js)
  window.T = {
    def: (label, html) => `<div class="def"><div class="lbl">${label}</div>${html}</div>`,
    formula: tex => `<div class="formula">\\[${tex}\\]</div>`,
    note: html => `<div class="note">${html.startsWith("<b>") ? "" : "<b>Chú ý:</b> "}${html}</div>`,
    ex: (q, sol) => `<div class="ex"><div class="ex-q">${q}</div><details class="ex-d"><summary>Xem lời giải</summary><div class="ex-sol">${sol}</div></details></div>`
  };

  // ---------- Danh sách phẳng để tìm bài trước / sau
  const flat = [];
  C.chapters.forEach(ch => ch.lessons.forEach(l => flat.push(Object.assign({ chapter: ch }, l))));
  const slug = new URLSearchParams(location.search).get("b") || "";
  const idx = flat.findIndex(l => l.slug === slug && !l.soon);

  function notFound() {
    document.title = "Không tìm thấy bài · " + C.title;
    $("app").hidden = true;
    $("missing").hidden = false;
  }
  if (idx < 0) { notFound(); return; }

  const meta = flat[idx];
  const script = document.createElement("script");
  script.src = "data/" + meta.slug + ".js";
  script.onload = () => window.LESSON ? start(window.LESSON) : notFound();
  script.onerror = notFound;
  document.body.append(script);

  // ---------- MathJax: nạp bất đồng bộ nên phải chờ cả hai phía sẵn sàng
  let rendered = false;
  window.__onMathJaxReady = () => { if (rendered) MathJax.typesetPromise().catch(() => {}); };
  function typeset(el) {
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise(el ? [el] : undefined).catch(() => {});
  }

  function parseNum(raw) {
    let s = String(raw).trim().replace(/\s+/g, "").replace(/[−–]/g, "-");
    if (!s) return NaN;
    if (s.includes("/")) {
      const p = s.split("/");
      if (p.length !== 2) return NaN;
      const a = parseNum(p[0]), b = parseNum(p[1]);
      return b ? a / b : NaN;
    }
    // 1.747.625 hoặc 1,747,625 (từ hai nhóm nghìn trở lên) -> bỏ dấu phân cách
    if (/^-?\d{1,3}([.,]\d{3}){2,}$/.test(s)) s = s.replace(/[.,]/g, "");
    s = s.replace(",", ".");
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
    return parseFloat(s);
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function start(L) {
    const QS = L.questions, PARTS = L.parts;
    const KEY = "btvn-" + meta.slug;

    let state = { ans: {} };
    try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.ans) state = s; } catch (e) {}
    function save() {
      try {
        state.total = QS.length;
        state.updated = Date.now();
        localStorage.setItem(KEY, JSON.stringify(state));
      } catch (e) {}
    }

    // ---------- Đầu trang
    document.title = meta.title + " · Bài tập " + C.title;
    $("crumbHome").textContent = C.title;
    $("crumbChapter").textContent = meta.chapter.so;
    $("crumbLesson").textContent = meta.so;
    $("eyebrow").textContent = `${C.title} · ${meta.chapter.so} · ${meta.so}`;
    $("lessonTitle").innerHTML = meta.title + (meta.formula ? ` <span class="un">${meta.formula}</span>` : "");
    const hasTheory = Array.isArray(L.theory) && L.theory.length > 0;
    $("intro").innerHTML = hasTheory
      ? `Gồm phần <b>Lý thuyết</b> và <b>${QS.length} câu bài tập</b> (khoảng ${meta.minutes || 45} phút). ` +
        `Em đọc lý thuyết, tự làm các ví dụ ra nháp rồi mới mở lời giải, sau đó chuyển sang làm bài tập.`
      : `${QS.length} câu bài tập, chia ${PARTS.length} phần từ dễ đến khó, khoảng ${meta.minutes || 45} phút.`;
    $("tabCount").textContent = QS.length + " câu";
    $("rOf").textContent = `/ ${QS.length} câu đúng`;

    // ---------- Bài trước / sau
    const prev = flat.slice(0, idx).reverse().find(l => !l.soon);
    const next = flat.slice(idx + 1).find(l => !l.soon);
    function navLink(l, dir) {
      const a = el("a", "pn " + dir);
      a.href = "bai.html?b=" + encodeURIComponent(l.slug);
      a.innerHTML = `<span class="pn-dir"></span><span class="pn-title"></span>`;
      a.querySelector(".pn-dir").textContent = dir === "prev" ? "← Bài trước" : "Bài sau →";
      a.querySelector(".pn-title").textContent = `${l.so}. ${l.title}`;
      return a;
    }
    const pn = $("prevNext");
    pn.innerHTML = "";
    if (prev) pn.append(navLink(prev, "prev")); else pn.append(el("span"));
    if (next) pn.append(navLink(next, "next"));

    // ---------- Thanh số câu
    const qnav = $("qnav");
    const qnavBtns = {};

    const cards = {};
    function buildCard(q, num) {
      const card = el("article", "q");
      card.id = "q-" + q.id;
      const head = el("div", "q-head");
      head.append(el("span", "q-num", "Câu " + num));
      head.append(el("span", "chip " + LV[q.lv][1], LV[q.lv][0]));
      const status = el("span", "q-status");
      head.append(status);
      card.append(head);

      card.append(el("div", "q-text", q.text.startsWith("<p>") ? q.text : "<p>" + q.text + "</p>"));
      if (typeof q.fig === "function") card.append(el("div", "fig", q.fig()));

      let getVal, optBtns = [], input;
      const checkBtn = el("button", "btn primary", "Kiểm tra");
      checkBtn.type = "button"; checkBtn.disabled = true;

      if (q.type === "mc") {
        const wrap = el("div", "opts" + (q.oneCol ? " one-col" : ""));
        wrap.setAttribute("role", "radiogroup");
        wrap.setAttribute("aria-label", "Câu " + num);
        q.opts.forEach((o, i) => {
          const b = el("button", "opt", `<span class="letter">${LETTERS[i]}</span><span>${o}</span>`);
          b.type = "button";
          b.setAttribute("role", "radio");
          b.setAttribute("aria-checked", "false");
          b.addEventListener("click", () => {
            optBtns.forEach(x => { x.classList.remove("sel"); x.setAttribute("aria-checked", "false"); });
            b.classList.add("sel"); b.setAttribute("aria-checked", "true");
            checkBtn.disabled = false;
          });
          optBtns.push(b); wrap.append(b);
        });
        card.append(wrap);
        getVal = () => optBtns.findIndex(b => b.classList.contains("sel"));
      } else {
        const row = el("div", "num-row");
        const lab = el("label", null, q.label || "Đáp số:");
        input = document.createElement("input");
        input.type = "text"; input.id = "in-" + q.id; input.inputMode = "decimal"; input.autocomplete = "off";
        input.placeholder = "Nhập số";
        lab.htmlFor = input.id;
        row.append(lab, input);
        if (q.unit) row.append(el("span", "unit", q.unit));
        card.append(row);
        card.append(el("div", "num-hint", "Nhập số nguyên, số thập phân (dấu phẩy hoặc chấm) hoặc phân số như 8/15. Số lớn viết liền, ví dụ 12800."));
        input.addEventListener("input", () => { checkBtn.disabled = !input.value.trim(); });
        input.addEventListener("keydown", e => { if (e.key === "Enter" && !checkBtn.disabled) checkBtn.click(); });
        getVal = () => input.value.trim();
      }

      const actions = el("div", "actions");
      const hintBtn = el("button", "btn ghost", "Gợi ý"); hintBtn.type = "button";
      const solBtn = el("button", "btn", "Xem lời giải"); solBtn.type = "button"; solBtn.hidden = true;
      actions.append(hintBtn, checkBtn, solBtn);
      card.append(actions);

      const hintBox = el("div", "box hint"); hintBox.hidden = true;
      const fbBox = el("div", "box"); fbBox.hidden = true;
      const solBox = el("div", "box sol"); solBox.hidden = true;
      card.append(hintBox, fbBox, solBox);

      function showHint() {
        if (!hintBox.innerHTML) { hintBox.innerHTML = "<b>Gợi ý:</b> " + q.hint; typeset(hintBox); }
        hintBox.hidden = false; hintBtn.disabled = true;
      }
      function toggleSol() {
        if (!solBox.innerHTML) {
          solBox.innerHTML = "<h4>Lời giải</h4><ol>" + q.sol.map(s => "<li>" + s + "</li>").join("") + "</ol>";
          typeset(solBox);
        }
        solBox.hidden = !solBox.hidden;
        solBtn.textContent = solBox.hidden ? "Xem lời giải" : "Ẩn lời giải";
      }

      function lock(rec) {
        card.classList.add(rec.ok ? "is-ok" : "is-bad");
        status.textContent = rec.ok ? "✓ Đúng" : "✗ Sai";
        status.className = "q-status " + (rec.ok ? "ok" : "bad");
        checkBtn.hidden = true;
        solBtn.hidden = false;
        if (q.type === "mc") {
          optBtns.forEach((b, i) => {
            b.disabled = true;
            b.classList.remove("sel");
            if (i === q.correct) b.classList.add("right");
            if (i === rec.v && !rec.ok) b.classList.add("wrong");
          });
        } else {
          input.value = rec.v; input.disabled = true;
        }
        fbBox.hidden = false;
        fbBox.className = "box " + (rec.ok ? "fb-ok" : "fb-bad");
        if (rec.ok) fbBox.textContent = "Chính xác! Em có thể xem lời giải để đối chiếu cách làm.";
        else if (q.type === "mc") fbBox.textContent = `Chưa đúng. Đáp án đúng là ${LETTERS[q.correct]}. Xem lời giải để biết em sai ở bước nào.`;
        else fbBox.textContent = `Chưa đúng. Đáp số đúng là ${q.show || String(q.ans).replace(".", ",")}. Xem lời giải để biết em sai ở bước nào.`;
      }

      hintBtn.addEventListener("click", () => {
        showHint();
        const rec = state.ans[q.id] || {};
        if (!("v" in rec)) { state.ans[q.id] = Object.assign(rec, { hint: true }); save(); updateProgress(); }
      });
      solBtn.addEventListener("click", toggleSol);
      checkBtn.addEventListener("click", () => {
        const v = getVal();
        let ok;
        if (q.type === "mc") { if (v < 0) return; ok = v === q.correct; }
        else {
          const x = parseNum(v);
          if (Number.isNaN(x)) {
            fbBox.hidden = false; fbBox.className = "box fb-bad";
            fbBox.textContent = "Em nhập chưa đúng dạng số. Ví dụ: 12, -4, 47,2 hoặc 8/15.";
            return;
          }
          const tol = q.tol != null ? q.tol : 1e-9;
          ok = Math.abs(x - q.ans) <= tol + 1e-12;
        }
        const prevRec = state.ans[q.id] || {};
        const rec = { v, ok, hint: !!prevRec.hint };
        state.ans[q.id] = rec; save();
        lock(rec);
        updateProgress();
      });

      const rec = state.ans[q.id];
      if (rec && rec.hint) showHint();
      if (rec && "v" in rec) lock(rec);
      cards[q.id] = card;
      return card;
    }

    function render() {
      const host = $("parts");
      host.innerHTML = "";
      qnav.innerHTML = "";
      let num = 0;
      PARTS.forEach(p => {
        const sec = el("section", "part");
        sec.id = "phan-" + p.id;
        const h = el("div", "part-head");
        h.append(el("h2", null, `<span class="tag">PHẦN ${p.id}</span>${p.title}`));
        if (p.recap) h.append(el("div", "recap", p.recap));
        sec.append(h);
        QS.filter(q => q.part === p.id).forEach(q => {
          num++; q.num = num;
          sec.append(buildCard(q, num));
          const b = el("button", "qdot", String(num));
          b.type = "button";
          b.title = "Câu " + num;
          b.addEventListener("click", () => {
            const c = cards[q.id];
            c.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
            const f = c.querySelector("input:not(:disabled), .opt:not(:disabled), .btn:not(:disabled)");
            if (f) setTimeout(() => f.focus({ preventScroll: true }), 350);
          });
          qnavBtns[q.id] = b;
          qnav.append(b);
        });
        host.append(sec);
      });
      $("pTotal").textContent = QS.length;
      updateProgress();
    }

    function updateProgress() {
      const total = QS.length;
      const done = QS.filter(q => state.ans[q.id] && "v" in state.ans[q.id]);
      const ok = done.filter(q => state.ans[q.id].ok);
      const bad = done.filter(q => !state.ans[q.id].ok);
      $("pDone").textContent = done.length;
      $("pOk").textContent = ok.length;
      $("pBad").textContent = bad.length;
      $("barOk").style.width = (ok.length / total * 100) + "%";
      $("barBad").style.width = (bad.length / total * 100) + "%";
      QS.forEach(q => {
        const r = state.ans[q.id], b = qnavBtns[q.id];
        if (!b) return;
        b.className = "qdot" + (r && "v" in r ? (r.ok ? " ok" : " bad") : "");
        b.setAttribute("aria-label", `Câu ${q.num}: ` + (r && "v" in r ? (r.ok ? "đúng" : "sai") : "chưa làm"));
      });

      $("rScore").textContent = ok.length;
      const left = total - done.length;
      $("rNote").textContent = left
        ? `Em còn ${left} câu chưa làm. Làm hết rồi gửi kết quả cho thầy nhé.`
        : (ok.length === total ? "Xuất sắc, em làm đúng tất cả!" : "Em đã làm xong. Hãy xem lại lời giải những câu sai rồi gửi kết quả cho thầy.");

      const nums = arr => arr.length ? arr.map(q => q.num).join(", ") : "không có";
      const hinted = QS.filter(q => state.ans[q.id] && state.ans[q.id].hint);
      const notDone = QS.filter(q => !(state.ans[q.id] && "v" in state.ans[q.id]));
      const lines = [
        `BÀI TẬP VỀ NHÀ: ${meta.so.toUpperCase()}. ${meta.title.toUpperCase()}`,
        `Điểm: ${ok.length}/${total} câu đúng`,
        "Câu sai: " + nums(bad),
        "Câu dùng gợi ý: " + nums(hinted)
      ];
      if (notDone.length) lines.push("Chưa làm: " + nums(notDone));
      lines.push("Thời điểm: " + new Date().toLocaleString("vi-VN"));
      $("report").textContent = lines.join("\n");
    }


    $("copyBtn").addEventListener("click", () => {
      const txt = $("report").textContent;
      const msg = $("copyMsg");
      const fallback = () => {
        const r = document.createRange(); r.selectNodeContents($("report"));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        msg.textContent = "Đã bôi đen kết quả. Em giữ ngón tay (hoặc bấm Ctrl+C) để sao chép rồi gửi cho thầy.";
      };
      try {
        navigator.clipboard.writeText(txt).then(
          () => { msg.textContent = "Đã sao chép. Dán vào tin nhắn gửi cho thầy nhé."; },
          fallback
        );
      } catch (e) { fallback(); }
    });

    const resetBtn = $("resetBtn");
    let armed = false, timer;
    resetBtn.addEventListener("click", () => {
      if (!armed) {
        armed = true;
        resetBtn.textContent = "Bấm lần nữa để xoá hết bài làm";
        timer = setTimeout(() => { armed = false; resetBtn.textContent = "Làm lại từ đầu"; }, 4000);
        return;
      }
      clearTimeout(timer); armed = false; resetBtn.textContent = "Làm lại từ đầu";
      state = { ans: {} }; save();
      render(); typeset($("parts"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    render();

    // ---------- Lý thuyết + chuyển tab
    if (hasTheory) {
      const tv = $("theoryView");
      const toc = el("nav", "toc");
      toc.setAttribute("aria-label", "Mục lục lý thuyết");
      toc.append(el("div", "toc-h", "Nội dung"));
      const tocList = el("ol");
      toc.append(tocList);
      tv.append(toc);
      L.theory.forEach((sec, i) => {
        const id = "lt-" + sec.id;
        const box = el("section", "th-sec");
        box.id = id;
        box.append(el("h2", null, `<span class="th-n">${i + 1}</span><span></span>`));
        box.querySelector("h2 span:last-child").textContent = sec.title;
        box.append(el("div", "th-body", sec.html));
        tv.append(box);
        const li = el("li");
        const b = el("button", "toc-link");
        b.type = "button"; b.textContent = sec.title;
        b.addEventListener("click", () => box.scrollIntoView({ behavior: "smooth", block: "start" }));
        li.append(b); tocList.append(li);
      });
      if (L.summary) {
        const sum = el("section", "th-summary");
        sum.append(el("h2", null, "Ghi nhớ"));
        sum.append(el("div", "th-body", L.summary));
        tv.append(sum);
      }
      const cta = el("button", "btn primary cta", `Làm bài tập (${QS.length} câu) →`);
      cta.type = "button";
      cta.addEventListener("click", () => { go("bai-tap"); $("tabs").scrollIntoView({ block: "start" }); });
      tv.append(cta);
      $("tabs").hidden = false;
    }

    function show(view) {
      const th = hasTheory && view === "ly-thuyet";
      $("theoryView").hidden = !th;
      $("exView").hidden = th;
      $("tab-lt").setAttribute("aria-selected", String(th));
      $("tab-bt").setAttribute("aria-selected", String(!th));
      $("tab-lt").tabIndex = th ? 0 : -1;
      $("tab-bt").tabIndex = th ? -1 : 0;
    }
    function go(view) {
      try { history.replaceState(null, "", "#" + view); } catch (e) {}
      show(view);
    }
    $("tab-lt").addEventListener("click", () => go("ly-thuyet"));
    $("tab-bt").addEventListener("click", () => go("bai-tap"));
    $("tabs").addEventListener("keydown", e => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const toTheory = $("tab-bt").getAttribute("aria-selected") === "true";
      go(toTheory ? "ly-thuyet" : "bai-tap");
      $(toTheory ? "tab-lt" : "tab-bt").focus();
    });
    window.addEventListener("hashchange", () => show(location.hash.slice(1)));
    const started = QS.some(q => state.ans[q.id] && ("v" in state.ans[q.id] || state.ans[q.id].hint));
    const h = location.hash.slice(1);
    show(h === "ly-thuyet" || h === "bai-tap" ? h : (hasTheory && !started ? "ly-thuyet" : "bai-tap"));

    $("app").hidden = false;
    rendered = true;
    typeset();
  }
})();
