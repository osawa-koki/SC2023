
(() => {
  // メール中継攻撃
  const xy = [
    [0, 0],
    [5, -105],
    [90, -140],
    [220, -145],
    [225, -120],
    [210, 0.5]
  ];
  const mail = document.getElementById("mail");
  const arws = document.getElementById("arrows").getElementsByTagName("path");
  const ers = () => {
      Array.from(arws).forEach(e => {
        e.style.fill = "yellow";
      });
    },
    comment = [
      "MSAがMUAに対して識別・認証を行います。(ここで用いられる認証がSMTP-AUTHです)<br />この通信の際に用いられるプロトコルはSMTPです。",
      "MSAが認証に成功したMUAから受け取ったメールをMTAに送信します。<br />セキュリティの観点から、MTAは「MSAからメールを受け取る用のMTA」と「送信先にメールを送信する用のMTA」に分かれる場合が多いです。<br />この通信の際に用いられるプロトコルはSMTPです。",
      "送信元のMTAは最初に送信先のMTAにメールを送信します。",
      "送信先のMTAは受け取ったメールをMDAに渡して、メールをメールBOXに格納します。<br />この通信の際に用いられるプロトコルはSMTPです。",
      "実際にはMDAとMRAは直接やり取りはせず、MDAがメールをメールBOXに預けて、MRAはそれを取り出します。",
      "MRAは受信者(MUA)からの要求を受けると、受信者の識別・認証を完成させた後にメールBOXからメールを取り出してMUAに送信します。<br />この通信の際に用いられるプロトコルはPOP・IMAPです。"
    ],
    from_to = [
      "MUA(送信側)", "MSA(送信側)", "MTA(送信側)", "MTA(受信側)", "MDA(受信側)", "MRA(受信側)", "MUA(受信側)"
    ],
    td_from = document.getElementById("mail-from"),
    td_to = document.getElementById("mail-to"),
    td_comment = document.getElementById("mail-comment"),
    reset = now => {
      arws[now].style.fill = "red";
      x_lock = false;
      td_from.innerHTML = from_to[now];
      td_to.innerHTML = from_to[now + 1];
      td_comment.innerHTML = comment[now];
    };
  (() => {
    const first = 0;
    td_from.innerHTML = from_to[first];
    td_to.innerHTML = from_to[first + 1];
    td_comment.innerHTML = comment[first];
  })();
  let now = 0;
  let x_lock = false;
  document.getElementById("mail-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      ers();
      if (now !== xy.length - 1) {
        let count = 0;
        const upto = 30;
        const dx = xy[now + 1][0] - xy[now][0];
        const dy = xy[now + 1][1] - xy[now][1];
        const interval_id = setInterval(() => {
          count++;
          mail.setAttribute("transform", `translate(${count / upto * dx + xy[now][0]}, ${count / upto * dy + xy[now][1]})`);
          if (upto <= count) {
            clearInterval(interval_id);
            now++;
            reset(now);
          }
        }, 30);
      } else {
        mail.setAttribute("transform", "translate(0, 0)");
        now = 0;
        reset(now);
      }
    }
  });
})();

(() => {
  // DNSキャッシュポイズニング攻撃
  const input = document.querySelectorAll("input[name=dns]");
  const arws = document.getElementById("dns-arrows").getElementsByTagName("path");
  const ers = () => {
    Array.from(arws).forEach(e => {
      e.style.fill = "white";
      info.innerHTML = "";
    });
  };
  const info = document.getElementById("dns-info");
  let count = 0;
  let na = true;
  Array.from(input).forEach(e => {
    e.addEventListener("change", () => {
      na = input[0].checked;
      ers();
      count = 0;
    });
  });
  const st_n = [
    [0, "スタブリゾルバがフルサービスリゾルバ(キャッシュサーバ)に対して名前解決要求(再帰問合せ)をします。"],
    [1, "スタブリゾルバからの名前解決要求を受けたフルサービスリゾルバ(キャッシュサーバ)は、上位の権威DNSサーバ(コンテンツサーバ/ゾーンサーバ)に対して名前解決要求(非再帰問合せ)をします。"],
    [2, "フルサービスリゾルバ(キャッシュサーバ)からの名前解決要求を受けた権威DNSサーバ(コンテンツサーバ/ゾーンサーバ)はより下位のDNSサーバへ問い合わせるように伝えます。"],
    [3, "フルサービスリゾルバ(キャッシュサーバ)は、より下位のDNSサーバへの名前解決要求を送信します。"],
    [4, "フルサービスリゾルバ(キャッシュサーバ)からの名前解決要求を受けた権威DNSサーバ(コンテンツサーバ/ゾーンサーバ)はより下位のDNSサーバへ問い合わせるように伝えます。"],
    [5, "フルサービスリゾルバ(キャッシュサーバ)は、より下位のDNSサーバへの名前解決要求を送信します。"],
    [6, "自身が管理しているエリアの名前解決要求であれば、DNSサーバは名前解決要求に対する応答を返します。"],
    [8, "フルサービスリゾルバ(キャッシュサーバ)はスタブリゾルバに対して名前解決要求の最終的な応答を返します。"],
    [9, ""]
  ],
    st_a = [
    [0, "スタブリゾルバがフルサービスリゾルバ(キャッシュサーバ)に対して名前解決要求(再帰問合せ)をします。"],
    [1, "スタブリゾルバからの名前解決要求を受けたフルサービスリゾルバ(キャッシュサーバ)は、上位の権威DNSサーバ(コンテンツサーバ/ゾーンサーバ)に対して名前解決要求(非再帰問合せ)をします。"],
    [7, "攻撃者は名前解決要求に対する正当な応答が返されるよりも前に偽の応答を返します。"],
    [8, "偽の応答を受け取ったフルサービスリゾルバ(キャッシュサーバ)がそのデータをスタブリゾルバに返します。<br />また、フルサービスリゾルバ(キャッシュサーバ)は一定期間そのデータを保持するためしばらくの間は不正な名前解決要求に対する応答を返します。"],
    [9, ""]
  ];
  let x_lock = false;
  document.getElementById("dns-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      ers();
      const data = (na) ? st_n : st_a;
      const n = data[count][0];
      const comment = data[count][1];
      arws[n].style.fill = (!na && (n === 7 || n === 8)) ? "purple" : "red";
      info.innerHTML = comment;
      count = (count !== data.length - 1) ? count + 1 : 0;
      setTimeout(() => {
        x_lock = false;
      }, 500);
    }
  });
})();
