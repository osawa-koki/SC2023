
(() => {
  const arws = document.getElementById("ssl_tls-arws").children;
  const info = document.getElementById("ssl_tls-info");
  const message = [
    "クライアントが利用可能な暗号化アルゴリズムの一覧をサーバに送信します。",
    "サーバはクライアントから送られた利用可能なアルゴリズム一覧から実際に利用する暗号化アルゴリズムを決定して、クライアントに通知します。",
    "サーバのディジタル証明書(公開鍵証明書)をルート証明書までの証明書のリスト(証明書チェーン)を含めてクライアントに送信します。<br />(オプション)",
    "ひとつ前にサーバがディジタル証明書をクライアントに送信しなかった場合は、一時的に鍵を生成してクライアントに送信します。<br />(オプション)",
    "サーバがクライアントに対して認証を行う場合は、クライアントにディジタル証明書の送付を要求します。",
    "サーバがクライアントに対して、一連のメッセージ送信が完了したことを通知します。",
    "クライアント認証を行う場合は、クライアントのディジタル証明書をルートCAまでの証明書のリスト(証明書チェーン)を含めてサーバに送信します。<br />(オプション)",
    "クライアントはプリマスタシークレットを生成して、受信したサーバのディジタル証明書に含まれる公開鍵で暗号化して送信します。",
    "クライアント認証を行う場合は、直前までの通信内容のハッシュダイジェストに自身の秘密鍵を用いてディジタル署名を付してサーバに送信します。<br />これを受信したサーバはディジタル証明書に含まれる公開鍵を用いてディジタル署名を検証します。<br />(オプション)",
    "クライアントは生成したプリマスタシークレットとクライアントとサーバが生成した乱数からマスタシークレットを生成します。(Handshakeプロトコル)<br />続いて、MAC鍵・暗号鍵・IV(CBC暗号用)を生成します。(Recordプロトコル)<br />最後にSSL通信の準備が整ったことをサーバに通知します。(Change Cipher Specプロトコル)",
    "クライアントは鍵交換と認証処理が成功したことをサーバに通知した後に、生成した鍵でメッセージを暗号化して送信します。",
    "サーバはクライアントから受信したプリマスタシークレット(暗号化済)を自身の秘密鍵で復号して乱数を用いてマスターシークレットを生成します。(Handshakeプロトコル)<br />次にマスターシークレットからMAC鍵・暗号鍵・IV(CBC暗号用)を生成します。(Recordプロトコル)<br />最後にSSL暗号化通信の準備が整ったことをクライアントに通知します。(Change Cipher Specプロトコル)",
    "サーバは鍵交換と認証処理が成功したことをクライアントに通知します。<br />(終了!)",
  ];
  function reset() {
    Array.from(arws).forEach(e => {
      const p = e.getElementsByTagName("path")[0],
        t = e.getElementsByTagName("text")[0];
      p.style.fill = "none";
      p.style.stroke = "none";
      t.style.fill = "none";
      t.style.stroke = "none";
    });
    info.innerHTML = "";
  }
  let now = 0;
  let x_lock = false;
  reset();
  document.getElementById("ssl_tls-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      const p = arws[now].getElementsByTagName("path")[0];
      const t = arws[now].getElementsByTagName("text")[0];
      p.style.fill = ([0, 6, 7, 8, 9, 10].includes(now)) ? "aqua" : "lime";
      t.style.fill = "black";
      info.innerHTML = message[now];
      if (now !== arws.length - 1) {
        setTimeout(() => {x_lock = false;}, 300);
      } else {
        setTimeout(() => {
          reset();
          now = 0;
          x_lock = false;
        }, 5000);
      }
      now++;
    }
  });
})();
