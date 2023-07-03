
(() => {
  // 科目一覧に色付け
  const parent = document.getElementById("subjectIndexContainer");
  const items = parent.getElementsByClassName("subjectsBox");
  for (let i = 0; i < items.length; i++) {
    items[i].style.backgroundColor = `hsla(${i * 360 / items.length}, 100%, 50%, 0.2)`;
  }
})();
