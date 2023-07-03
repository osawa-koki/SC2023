
(() => {
  // 名前解決
  const arws = Array.from(document.getElementById("dns-arrows").children);
  const info = document.getElementById("dns-info");
  function reset() {
    arws.forEach(e => {
      e.style.fill = "none";
      e.style.stroke = "none";
    });
    info.textContent = "";
  }
  reset();
  const message = [
    "リゾルバがキャッシュサーバに対して名前解決要求を出します。",
    "名前解決要求を受けたキャッシュサーバは自ドメインに関する問い合わせならそのまま応答を返し、他のドメインに関する問い合わせならルートドメインに問い合わせます。",
    "キャッシュサーバからの名前解決要求を受けたルートドメインはトップレベルドメイン(TLD / .jp .com .net)を管理するDNSサーバの情報を返します。",
    "トップレベルドメイン(.jp .com .net)を管理するDNSサーバの情報を受け取ったキャッシュサーバはトップレベルドメイン(.jp .com .net)を管理するDNSサーバに対して名前解決要求を行います。",
    "トップレベルドメイン(.jp .com .net)を管理するDNSサーバはさらに下の第二レベルドメイン(SLD / .co .ac .go)を管理するDNSサーバに関する情報を返します。",
    "第二レベルドメイン(.co .ac .go)を管理するDNSサーバに関する情報を受け取ったキャッシュサーバは第二レベルドメイン(.co .ac .go)を管理するDNSサーバに対してさらに名前解決要求を出します。",
    "第二レベルドメイン(.co .ac .go)を管理するDNSサーバはこれに対して第三レベルドメインを管理するDNSサーバに関する情報を返します。",
    "キャッシュサーバは最終的な名前解決の結果をリゾルバに返します。"
  ];
  let count = 0;
  let x_lock = false;
  document.getElementById("dns-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      try {
        arws[count - 1].style.fill = "none";
      } catch {}
      arws[count].style.fill = "aqua";
      info.textContent = message[count];
      if (count !== arws.length - 1) {
        setTimeout(() => {x_lock = false;}, 300);
      } else {
        setTimeout(() => {
          reset();
          count = 0;
          x_lock = false;
        }, 5000);
      }
      count++;
    }
  });
})();

(() => {
  // URIの構造
  const s = Array.from(document.getElementById("fqdn").children);
  const info = document.getElementById("fqdn-info");
  const title = [
    "スキーム名",
    "スキーム識別子",
    "サブドメイン名",
    "ホスト名",
    "ポート番号",
    "パス名",
    "ファイル名",
    "アンカー",
    "URLパラメータ"
  ];
  const message = [
      "通信の手段(プロトコル)を指定します。<br />例) http https ftp",
    "スキームを識別するための文字列です。",
    "ホストを小さな単位へ分割した際のその名前です。",
    "インターネット上のホストを指定します。",
    "使用するポート番号(サービス)を指定します。",
    "指定する資源までの道のり(パス)を指定します。",
    "指定する資源の名前を指定します。<br />パスと合わせてファイル名とすることもあります。",
    "ページ内の要素へのリンク(ページ内リンク)を意味します。",
    "「?」以降はサーバへ送信するデータを指定します。<br />キーとバリューを「=」でつないでセットにして扱い、複数ある場合は「&amp;」で区切って表します。"
  ];
  let last;
  s.forEach(e => {
    e.addEventListener("click", function() {
      try {
        last.style.color = "black";
      } catch {}
      this.style.color = "fuchsia";
      last = this;
      const n = s.indexOf(this),
        d = document.createElement("div");
      d.classList.add("title");
      d.textContent = title[n];
      info.innerHTML = message[n];
      info.insertBefore(d, info.firstChild);
    });
  });
})();
