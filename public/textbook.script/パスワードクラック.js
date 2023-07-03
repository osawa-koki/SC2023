
(() => {
  // 辞書攻撃
  const words = ["iloveyou", "temp", "sys", "admin", "pw", "pass", "password", "tmp"];
  const txt = document.getElementById("dict-attack").getElementsByTagName("text");
  setInterval(() => {
    Array.from(txt).forEach(e => {
      const dv = 3,
        tms = 30,
        r = parseInt(Math.random() * dv);
      let n = parseInt(e.getAttribute("x"));
      n += r + tms;
      if (450 < n) {
        n = 150;
        e.textContent = words[parseInt(Math.random() * words.length)]
      }
      e.setAttribute("x", n);
    });
  }, 300);
})();

(() => {
  // ブルートフォース攻撃
  function zero_padding(num) {
    return ("000" + num).slice(-4);
  }
  const txt = document.getElementById("brute-attack").getElementsByClassName("text");
  setInterval(() => {
    Array.from(txt).forEach(e => {
      const dv = 3;
      const tms = 30;
      const r = parseInt(Math.random() * dv);
      let n = parseInt(e.getAttribute("x"));
      n += r + tms;
      if (450 < n) {
        n = 150;
        let nm = parseInt(e.textContent);
        nm++;
        e.textContent = zero_padding(nm);
      }
      e.setAttribute("x", n);
    });
  }, 300);
})();

(() => {
  // リバースブルートフォース攻撃
  function zero_padding(num) {
    return ("000" + num).slice(-4);
  }
  const txt = document.getElementById("rbrute-attack").getElementsByClassName("text");
  setInterval(() => {
    Array.from(txt).forEach(e => {
      const dv = 3;
      const tms = 30;
      const r = parseInt(Math.random() * dv);
      let n = parseInt(e.getAttribute("x"));
      n += r + tms;
      if (450 < n) {
        n = 150;
        let nm = parseInt(e.textContent.match(/\d+/));
        nm++;
        e.textContent = "DY" + zero_padding(nm);
      }
      e.setAttribute("x", n);
    });
  }, 300);
})();
