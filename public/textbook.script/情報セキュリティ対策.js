
(() => {
  const scroll = (doc, speed = 50, propotion = 4) => {
    const scrolled = window.scrollY;
    const height = window.innerHeight / propotion;
    const between = doc.getBoundingClientRect().top + window.pageYOffset - scrolled - height;
    let count = 0;
    const interval_id = setInterval(() => {
      count++;
      scrollTo(0, between * count / speed + scrolled);
      if (speed < count) {
        clearInterval(interval_id);
      }
    }, 5)
  };
  let last = -1;
  const s = document.getElementById("information-security_show");
  const h = Array.from(s.children);
  const l = Array.from(document.getElementsByClassName("information-security_list"));
  if (h.length !== l.length) return;
  for (let i = 0; i < h.length; i++) {
    h[i].classList.add("hidden");
    const e = document.createElement("div");
    e.classList.add("title");
    e.textContent = l[i].textContent;
    h[i].insertBefore(e, h[i].firstChild);
    l[i].addEventListener("click", function() {
      try {
        h[last].classList.add("hidden");
      } catch {}
      const n = l.indexOf(this);
      l[n].classList.add("visited");
      h[n].classList.add("explanation");
      h[n].classList.remove("hidden");
      last = n;
      scroll(s);
    });
  }
})();
