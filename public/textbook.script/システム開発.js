
(() => {
  // V字モデル開発
  const bx = Array.from(document.getElementById("v-boxes").children);
  const info = document.getElementById("v-model-info");
  const arws = Array.from(document.getElementById("arws").children);
  function reset() {
    bx.forEach(e => {
      e.getElementsByTagName("rect")[0].style.stroke = "aqua";
      e.getElementsByTagName("text")[0].style.fill = "black";
    });
    arws.forEach(e => {
      e.style.fill = "lime";
    });
    info.innerHTML = "";
  }
  reset();
  let count = 0;
  let x_lock = false;
  const message = [
    "システム全体が実現すべき要件を確認します♪",
    "システム要件定義を満たすための設計を最上位レベル(ハードウェア・ソフトウェアレベル)で決定します♪",
    "ソフトウェアに必要な機能・セキュリティ・外部インターフェースを決定します♪",
    "ソフトウェア要件を達成する手段を「方式」まで分解します♪<br />(ソフトウェア構造やデータベース構造を明確に!)",
    "ソフトウェアを小さな部品(モジュール)まで分解していきます♪",
    "実際にソースコードを入力していきます♪",
    "ソフトウェア単体(モジュール)が動くかどうかチェックします♪<br />(ソフトウェア詳細設計通りかどうかチェック)",
    "モジュールの組み合わせ(結合されたソフトウェア)が動くかどうかチェックします♪<br />(ソフトウェア方式設計通りかどうかチェック)",
    "モジュールの組み合わせ(結合されたソフトウェア)が動くかどうかチェックします♪<br />(ソフトウェア要件定義を満たしているかどうかチェック)",
    "モジュールの組み合わせ(結合されたソフトウェア)をさらに組み合わせてシステムを完成させます♪<br />(システム方式設計を満たしているかどうかチェック)",
    "システム全体が想定通りに動くかどうかチェック♪<br />(システム要件定義を満たしているかどうかチェック)"
  ];
  document.getElementById("v-model-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      const r = bx[count].getElementsByTagName("rect")[0];
      const t = bx[count].getElementsByTagName("text")[0];
      try {
        bx[count - 1].getElementsByTagName("rect")[0].style.stroke = "aqua";
        bx[count - 1].getElementsByTagName("text")[0].style.fill = "black";
      } catch {}
      r.style.stroke = "blue";
      t.style.fill = "red";
      if (6 <= count) {
        try {
          arws[count - 7].style.fill = "lime";
        } catch {}
        arws[count - 6].style.fill = "red";
      }
      if (count !== bx.length - 1) {
        setTimeout(() => {x_lock = false;}, 300);
      } else {
        setTimeout(() => {
          reset();
          count = 0;
          x_lock = false;
        }, 5000);
      }
      info.innerHTML = message[count];
      count++;
    }
  });
})();
