
(() => {
  // Kerberos
  const d = document.getElementById("arws").getElementsByTagName("path");
  const info = document.getElementById("kerberos-info");
  function reset() {
    Array.from(d).forEach(e => {
      e.style.fill = "none";
      e.style.stroke = "none";
    });
    info.textContent = "";
  }
  reset();
  let x_lock = false;
  let now = 0;
  const message = [
    "クライアントがAS(認証サーバ)に対してTGT(チケット交付チケット)を要求します。",
    "AS(認証サーバ)はKDBに保存されている情報からクライアントを認証し、認証に成功したらTGT(チケット交付チケット)を発行します。",
    "TGT(チケット交付チケット)を受けたクライアントは各サービスへアクセスする度にTGT(チケット交付チケット)をTGS(チケット交付サーバ)に提示します。",
    "TGS(チケット交付サーバ)はTGT(チケット交付チケット)を持つクライアントに対して各サービスを利用するためのチケットを発行します。",
    "クライアントはTGS(チケット交付サーバ)から受け取ったチケットを使用してサーバに対してアクセス要求をします。",
    "サーバはチケットを持ったクライアントからのアクセス要求を受けてアクセスを許可します。",
  ];
  document.getElementById("kerberos-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      try {
        d[now - 1].style.fill = "none";
      } catch {}
      d[now].style.fill = "aqua";
      info.textContent = message[now];
      if (now !== message.length - 1) {
        setTimeout(() => {x_lock = false;}, 300);
      } else {
        setTimeout(() => {
          reset();
          x_lock = false;
          now = 0;
        }, 5000);
      }
      now++;
    }
  });
})();

(() => {
  // SSO
  const d = document.getElementById("arrows").getElementsByTagName("g");
  const info = document.getElementById("saml-info");
  function reset() {
    Array.from(d).forEach(e => {
      e.style.fill = "none";
      e.style.stroke = "none";
    });
    info.textContent = "";
  }
  reset();
  let x_lock = false;
  let now = 0;
  const message = [
    "クライアントがSP(Service Provider)に対してアクセス要求をします。",
    "SPはIdPにリダイレクトして、認証を要求します。(SAML Request)",
    "IdPはクライアントを認証します。",
    "IdPはクライアント認証に成功したら、アサーションを生成してSP(Service Provider)にリダイレクトします。(SAML Response)",
    "SPはクライアントに対してCookieを発行してサービスを提供します。",
  ];
  document.getElementById("saml-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      try {
        d[now - 1].style.stroke = "none";
      } catch {}
      d[now].style.stroke = "black";
      info.textContent = message[now];
      if (now !== message.length - 1) {
        setTimeout(() => {x_lock = false;}, 300);
      } else {
        setTimeout(() => {
          reset();
          x_lock = false;
          now = 0;
        }, 5000);
      }
      now++;
    }
  });
})();
