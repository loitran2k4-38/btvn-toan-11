// Bộ chấm bài dùng chung cho mọi bài tập.
// Mỗi bài khai báo window.LESSON trong data/<slug>.js trước khi nạp file này.
(function () {
  const L = window.LESSON;
  const QS = L.questions;
  const PARTS = L.parts;
  const LV = { de: ["Dễ", "lv-de"], vua: ["Vừa", "lv-vua"], kho: ["Khó", "lv-kho"] };
  const LETTERS = ["A", "B", "C", "D", "E"];
  const KEY = "btvn-" + L.slug;
  const NAME_KEY = "btvn-ten-hoc-sinh";

  let state = { name: "", ans: {} };
  try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.ans) state = s; } catch (e) {}
  try { if (!state.name) state.name = localStorage.getItem(NAME_KEY) || ""; } catch (e) {}
  function save() {
    try {
      state.total = QS.length;
      localStorage.setItem(KEY, JSON.stringify(state));
      if (state.name) localStorage.setItem(NAME_KEY, state.name);
    } catch (e) {}
  }

  function typeset(el) {
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([el]).catch(() => {});
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

  // ---------- Header
  document.title = "Bài tập " + L.plainTitle;
  document.getElementById("eyebrow").textContent = L.eyebrow;
  document.getElementById("lessonTitle").innerHTML = L.title;
  document.getElementById("intro").innerHTML =
    `Bài tập về nhà gồm ${QS.length} câu, chia ${PARTS.length} phần từ dễ đến khó, làm trong khoảng ${L.minutes} phút. ` +
    `Mỗi câu chỉ được bấm <b>Kiểm tra</b> một lần, nên em hãy tính ra nháp trước. Nếu bí, bấm <b>Gợi ý</b>. ` +
    `Làm xong, kéo xuống cuối trang để gửi kết quả cho thầy.`;
  document.getElementById("rOf").textContent = `/ ${QS.length} câu đúng`;

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
      card.append(el("div", "num-hint", "Có thể nhập số nguyên, số thập phân (dùng dấu phẩy hoặc chấm) hoặc phân số dạng 8/15."));
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
      const prev = state.ans[q.id] || {};
      const rec = { v, ok, hint: !!prev.hint };
      state.ans[q.id] = rec; save();
      lock(rec);
      updateProgress();
    });

    const rec = state.ans[q.id];
    if (rec && rec.hint) showHint();
    if (rec && "v" in rec) lock(rec);
    return card;
  }

  function render() {
    const host = document.getElementById("parts");
    host.innerHTML = "";
    let num = 0;
    PARTS.forEach(p => {
      const sec = el("section", "part");
      const h = el("div", "part-head");
      h.append(el("h2", null, `<span class="tag">PHẦN ${p.id}</span>${p.title}`));
      if (p.recap) h.append(el("div", "recap", p.recap));
      sec.append(h);
      QS.filter(q => q.part === p.id).forEach(q => { num++; q.num = num; sec.append(buildCard(q, num)); });
      host.append(sec);
    });
    document.getElementById("pTotal").textContent = QS.length;
    updateProgress();
  }

  function updateProgress() {
    const total = QS.length;
    const done = QS.filter(q => state.ans[q.id] && "v" in state.ans[q.id]);
    const ok = done.filter(q => state.ans[q.id].ok);
    const bad = done.filter(q => !state.ans[q.id].ok);
    document.getElementById("pDone").textContent = done.length;
    document.getElementById("pOk").textContent = ok.length;
    document.getElementById("pBad").textContent = bad.length;
    document.getElementById("barOk").style.width = (ok.length / total * 100) + "%";
    document.getElementById("barBad").style.width = (bad.length / total * 100) + "%";

    document.getElementById("rScore").textContent = ok.length;
    const left = total - done.length;
    document.getElementById("rNote").textContent = left
      ? `Em còn ${left} câu chưa làm. Làm hết rồi gửi kết quả cho thầy nhé.`
      : (ok.length === total ? "Xuất sắc, em làm đúng tất cả!" : "Em đã làm xong. Hãy xem lại lời giải những câu sai rồi gửi kết quả cho thầy.");

    const nums = arr => arr.length ? arr.map(q => q.num).join(", ") : "không có";
    const hinted = QS.filter(q => state.ans[q.id] && state.ans[q.id].hint);
    const notDone = QS.filter(q => !(state.ans[q.id] && "v" in state.ans[q.id]));
    const lines = [
      "BÀI TẬP VỀ NHÀ: " + L.plainTitle.toUpperCase(),
      "Học sinh: " + (state.name || "(chưa nhập tên)"),
      `Điểm: ${ok.length}/${total} câu đúng`,
      "Câu sai: " + nums(bad),
      "Câu dùng gợi ý: " + nums(hinted)
    ];
    if (notDone.length) lines.push("Chưa làm: " + nums(notDone));
    lines.push("Thời điểm: " + new Date().toLocaleString("vi-VN"));
    document.getElementById("report").textContent = lines.join("\n");
  }

  const nameInput = document.getElementById("studentName");
  nameInput.value = state.name || "";
  nameInput.addEventListener("input", () => { state.name = nameInput.value.trim(); save(); updateProgress(); });

  document.getElementById("copyBtn").addEventListener("click", () => {
    const txt = document.getElementById("report").textContent;
    const msg = document.getElementById("copyMsg");
    const fallback = () => {
      const r = document.createRange(); r.selectNodeContents(document.getElementById("report"));
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

  const resetBtn = document.getElementById("resetBtn");
  let armed = false, timer;
  resetBtn.addEventListener("click", () => {
    if (!armed) {
      armed = true;
      resetBtn.textContent = "Bấm lần nữa để xoá hết bài làm";
      timer = setTimeout(() => { armed = false; resetBtn.textContent = "Làm lại từ đầu"; }, 4000);
      return;
    }
    clearTimeout(timer); armed = false; resetBtn.textContent = "Làm lại từ đầu";
    state = { name: state.name, ans: {} }; save();
    render(); typeset(document.getElementById("parts"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  render();
})();
