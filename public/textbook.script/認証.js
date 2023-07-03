/* SVGAnimation */

const SVGanimation = arg => {
	const tag = document.getElementById(arg).tagName.toLowerCase();
	if (tag === "path") {
		const obj = {
			"doc": document.getElementById(arg),
			"m": document.getElementById(arg).getAttribute("d"),
			"move": function(x, y, cb, speed = 100) {
				let count = 0;
				const dx = parseFloat(x) - this.x_b,
					dy = parseFloat(y) - this.y_b,
					interval_id = setInterval(() => {
						count++;
						const put = `m${(dx * count / speed + this.x_b) + "," + (dy * count / speed + this.y_b)} ${this.rest}`;
						this.doc.setAttribute("d", put);
						if (speed < count) {
							clearInterval(interval_id);
							if (typeof(cb) == "function") {
								cb();
							}
						}
					}, 10);
			}
		}
		obj["x_b"] = parseFloat(obj.m.match(/-?\d+\.*\d*(?=,)/));
		obj["y_b"] = parseFloat(obj.m.match(/,-?\d+\.*\d*/)[0].replace(",", ""));
		obj["rest"] = obj.m.replace(/m-?\d+\.?\d*,-?\d+\.?\d*/, "");
		return obj;
	} else if (tag === "circle" || tag === "ellipse") {
		const obj = {
			"doc": document.getElementById(arg),
			"x": document.getElementById(arg).getAttribute("x"),
		}
		return obj;
	} else if (tag === "rect") {
		const obj = {
			"doc": document.getElementById(arg),
			"x_b": document.getElementById(arg).getAttribute("x"),
			"y_b": document.getElementById(arg).getAttribute("y"),
			"move": function(x, y, cb, speed = 100) {
				let count = 0;
				const dx = parseFloat(x) - parseFloat(this.x_b),
					dy = parseFloat(y) - parseFloat(this.y_b),
					interval_id = setInterval(() => {
						count++;
						this.doc.setAttribute("x", (dx * count / speed + parseFloat(this.x_b)));
						this.doc.setAttribute("y", (dy * count / speed + parseFloat(this.y_b)));
						if (speed < count) {
							clearInterval(interval_id);
							if (typeof(cb) == "function") {
								cb();
							}
						}
					}, 10);
			}
		}
		return obj;
	} else if (tag === "g") {
		let xy;
		try {
			xy = document.getElementById(arg).getAttribute("transform").match(/-?\d+\.?\d*/g);
		} catch {
			xy = [0, 0];
		}
		const obj = {
			"doc": document.getElementById(arg),
			"x_b": xy[0],
			"y_b": xy[1],
			"move": function(x, y, cb, speed = 100) {
				let count = 0;
				const dx = parseFloat(x) - parseFloat(this.x_b),
					dy = parseFloat(y) - parseFloat(this.y_b),
					interval_id = setInterval(() => {
						count++;
						this.doc.setAttribute("transform", `translate(${dx * count / speed + parseFloat(this.x_b)}, ${dy * count / speed + parseFloat(this.y_b)})`)
						if (speed < count) {
							clearInterval(interval_id);
							if (typeof(cb) == "function") {
								cb();
							}
						}
					}, 10);
			}
		}
		return obj;
	}
};

(() => {
  // ディジタル署名
  const d = document.getElementsByClassName("d");
  const info = document.getElementById("d_sign-info");
  function reset() {
    Array.from(d).forEach(e => {
      e.style.fill = "none";
      e.style.stroke = "none";
    });
    (() => {
      const orgn = [
        ["box1", 155, 186],
        ["box2", 50, 195],
        ["box3", 400, 230],
        ["s_key", 144.4, 32.4],
        ["p_key", 198, 32.4],
        ["ico_hash", 232.5, 62.5],
        ["ico_hash0", 232.5, 62.5],
        ["doc", 50, 102]
      ];
      orgn.forEach(e => {
        const n = e[0],
          x = e[1],
          y = e[2],
          obj = document.getElementById(n),
          t = obj.tagName.toLowerCase();
        if (t === "path") {
          let d = obj.getAttribute("d");
          d = d.replace(/\d+\.*\d*(?=,)/, x);
          d = d.replace(/,\d+\.*\d*/, "," + y);
          obj.setAttribute("d", d);
        } else if (t === "rect") {
          obj.setAttribute("x", x);
          obj.setAttribute("y", y);
        }
      });
      info.textContent = "";
    })();
  }
  reset();
  let x_lock = false;
  let now = 0;
  document.getElementById("d_sign-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      switch (now) {
        case 0:
          document.getElementById("arw0").style.fill = "#00FF00";
          document.getElementById("box1").style.fill = "#FFFF00";
          document.getElementById("box1").style.stroke = "#000000";
          SVGanimation("ico_hash").move(165, 215, function() {x_lock = false;});
          info.textContent = "送信者はハッシュ関数を用いて送信する文書のメッセージダイジェスト(MD)を作成します。";
          break;
        case 1:
          document.getElementById("arw0").style.fill = "none";
          SVGanimation("box1").move(155, 255);
          SVGanimation("ico_hash").move(165, 285, function() {
            document.getElementById("arw1").style.fill = "#00FF00";
            SVGanimation("s_key").move(182, 255, function() {
              document.getElementById("box1").style.fill = "#9966FF";
              x_lock = false;
            })
          });
          info.textContent = "MDを送信者の秘密鍵で暗号化してディジタル署名を作成します。";
          break;
        case 2:
          document.getElementById("arw1").style.fill = "none";
          document.getElementById("arw2").style.fill = "#00FF00";
          document.getElementById("arw3").style.fill = "#00FF00";
          SVGanimation("ico_hash").move(60, 195);
          SVGanimation("s_key").move(77, 168);
          SVGanimation("box1").move(50, 168, function() {
            document.getElementById("box2").style.stroke = "#000000";
            document.getElementById("box2").style.fill = "#FF00FF";
            SVGanimation("p_key").move(80, 195, function() {
              document.getElementById("arw2").style.fill = "none";
              document.getElementById("arw3").style.fill = "none";
              x_lock = false;
            });
          });
          info.textContent = "文書(平文)・ディジタル署名(暗号化されたMD)・ディジタル証明書(送信者の公開鍵)の3つをまとめます。";
          break;
        case 3:
          document.getElementById("arw4").style.fill = "#00FF00";
          SVGanimation("doc").move(455, 102);
          SVGanimation("box1").move(455, 168);
          SVGanimation("box2").move(455, 196);
          SVGanimation("ico_hash").move(465, 195);
          SVGanimation("s_key").move(485, 168);
          SVGanimation("p_key").move(482, 195, function() {
            document.getElementById("arw4").style.fill = "none";
            x_lock = false;
          });
          info.textContent = "文書(平文)・ディジタル署名(暗号化されたMD)・ディジタル証明書(送信者の公開鍵)の三点セットを送信します。";
          break;
        case 4:
          SVGanimation("doc").move(400, 102);
          SVGanimation("box1").move(478, 108);
          SVGanimation("box2").move(478, 138);
          SVGanimation("ico_hash").move(490, 136);
          SVGanimation("s_key").move(505, 108);
          SVGanimation("p_key").move(508, 135, function() {
            x_lock = false;
          });
          info.textContent = "ディジタル署名(暗号化されたMD)・ディジタル証明書(送信者の公開鍵)から文書(平文)の正当性を検証する準備をします。";
          break;
        case 5:
          document.getElementById("arw5").style.fill = "#00FF00";
          document.getElementById("box3").style.fill = "#ffff00";
          document.getElementById("box3").style.stroke = "#000000";
          SVGanimation("ico_hash0").move(415, 258, function() {
            x_lock = false;
          });
          info.textContent = "受信者は受信データから文書(平文)を取り出してハッシュ関数を用いてメッセージダイジェストを作成します。";
          break;
        case 6:
          document.getElementById("arw6").style.fill = "#00ff00";
          SVGanimation("box1").move(478, 230);
          SVGanimation("ico_hash").move(490, 260);
          SVGanimation("s_key").move(505, 232, function() {
            x_lock = false;
          });
          info.textContent = "受信されたデータのうち、ディジタル署名(暗号化されたMD)を取り出します。";
          break;
        case 7:
          SVGanimation("box2").move(310, 75, false, 200);
          SVGanimation("p_key").move(340, 72, function() {
            SVGanimation("box2").move(658, 382);
            SVGanimation("p_key").move(688, 378);
            setTimeout(function() {
              SVGanimation("s_key").move(275, 415, false, 50);
              document.getElementById("box1").style.fill = "#ffff00";
              document.getElementById("arw5").style.fill = "none";
              document.getElementById("arw6").style.fill = "none";
              setTimeout(() => {
                reset();
                x_lock = false;
              }, 5000);
            }, 600)
          }, 200);
          info.textContent = "ディジタル署名を復号して、受信者がハッシュ関数で生成したMDと一致するかを検証します。";
          break;
      }
      now++;
    }
  });
})();

(() => {
  // タイムスタンプ
  const d = document.getElementsByClassName("hd");
  const info = document.getElementById("timestamp-info");
  function reset() {
    Array.from(d).forEach(e => {
      e.style.fill = "none";
      e.style.stroke = "none";
    });
    info.textContent = "";
    document.getElementById("dcmt").removeAttribute("transform");
    document.getElementById("clock").removeAttribute("transform");
    document.getElementById("dcmt").getElementsByTagName("path")[0].style.fill = "white";
  }
  reset();
  let count = 0;
  let x_lock = false;
  document.getElementById("timestamp-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      switch (count) {
      case 0:
        SVGanimation("dcmt").move(0, 100, () => {
          document.getElementById("dcmt").getElementsByTagName("path")[0].style.fill = "yellow";
          x_lock = false;
        });
        document.getElementById("arrow0").style.fill = "aqua";
        info.textContent = "文書をハッシュ化してハッシュ値を算出します。";
        break;
      case 1:
        document.getElementById("arrow0").style.fill = "none";
        SVGanimation("dcmt").move(225, 35, () => {x_lock = false;});
        document.getElementById("arrow1").style.fill = "aqua";
        info.textContent = "ハッシュ値を時刻認証局(TSA)に送信します。";
        break;
      case 2:
        document.getElementById("arrow1").style.fill = "none";
        SVGanimation("clock").move(-220, 20, () => {x_lock = false;});
        document.getElementById("clock").style.fill = "";
        document.getElementById("clock").style.stroke = "";
        document.getElementById("arrow2").style.fill = "aqua";
        info.textContent = "時刻認証局(TSA)は時刻配信局(TA)から現在時刻を受け取ります。";
        break;
      case 3:
        document.getElementById("arrow2").style.fill = "none";
        SVGanimation("dcmt").move(228, 175);
        SVGanimation("clock").move(-218, 157, () => {x_lock = false;});
        document.getElementById("arrow3").style.fill = "aqua";
        info.textContent = "「ディジタル署名」「リンキング」「アーカイビング」などの改竄防止処理をします。";
        break;
      case 4:
        document.getElementById("arrow3").style.fill = "none";
        SVGanimation("dcmt").move(0, 175);
        SVGanimation("clock").move(-445, 157, () => {
          setTimeout(() => {
            x_lock = false;
            count = 0;
            reset();
          }, 5000);
        });
        document.getElementById("arrow4").style.fill = "aqua";
        info.textContent = "時刻認証局(TSA)は処理したデータをタイムスタンプ取得要求者に返します。";
        break;
      }
    count++;
    }
  });
})();

(() => {
  // チャレンジレスポンス認証
  const d = document.getElementsByClassName("tp");
  const info = document.getElementById("cr-info");
  function reset() {
    Array.from(d).forEach(e => {
      e.style.fill = "none";
      e.style.stroke = "none";
    });
    (() => {
      document.getElementById("challenge-cr0").removeAttribute("transform");
      document.getElementById("challenge-cr1").removeAttribute("transform");
      document.getElementById("response-cr0").removeAttribute("transform");
      document.getElementById("response-cr1").setAttribute("transform", "translate(400, 0)");
    })();
    info.textContent = "";
  }
  reset();
  let count = 0;
  let x_lock = false;
  document.getElementById("cr-button").addEventListener("click", () => {
    if (!x_lock) {
      x_lock = true;
      switch (count) {
        case 0:
          document.getElementById("arr0").style.fill = "aqua";
          info.textContent = "クライアントがサーバにログイン要求をします。";
          x_lock = false;
          break;
        case 1:
          document.getElementById("arr0").style.fill = "none";
          document.getElementById("challenge-cr0").style.fill = "";
          document.getElementById("challenge-cr1").style.fill = "";
          SVGanimation("challenge-cr1").move(-250, 0, () => {x_lock = false;});
          info.textContent = "サーバはクライアントの要求に対してチャレンジと呼ばれる疑似乱数文字列を生成してクライアントに送信します。";
          document.getElementById("arr1").style.fill = "aqua";
          break;
        case 2:
          document.getElementById("arr1").style.fill = "none";
          info.textContent = "サーバは先ほど生成したチャレンジと、保存してあるパスワード(Seed)からハッシュ値を生成します。";
          document.getElementById("response-cr1").style.fill = "";
          document.getElementById("arr2").style.fill = "aqua";
          x_lock = false;
          break;
        case 3:
          document.getElementById("arr2").style.fill = "none";
          info.textContent = "クライアントはサーバから受け取ったチャレンジと、記憶しているパスワード(Seed)からハッシュ値(レスポンス)を生成します。";
          document.getElementById("response-cr0").style.fill = "";
          document.getElementById("arr3").style.fill = "aqua";
          x_lock = false;
          break;
        case 4:
          document.getElementById("arr3").style.fill = "none";
          info.textContent = "クライアントは生成したレスポンスをサーバへ送信します。";
          SVGanimation("response-cr0").move(400, 0, () => {
            document.getElementById("response-cr0").style.fill = "none";
            document.getElementById("response-cr1").style.fill = "red";
            x_lock = false;
          });
          document.getElementById("arr4").style.fill = "aqua";
          break;
        case 5:
          document.getElementById("arr4").style.fill = "none";
          info.textContent = "サーバはクライアントから受け取ったレスポンスと自身で生成したレスポンスを比較します。";
          document.getElementById("arr5").style.fill = "aqua";
          x_lock = false;
          break;
        case 6:
          document.getElementById("arr5").style.fill = "none";
          info.textContent = "サーバはレスポンスの比較結果が正しければ認証を許可します。";
          document.getElementById("arr6").style.fill = "red";
          setTimeout(() => {
            reset();
            count = 0;
            x_lock = false;
          }, 5000);
          break;
      }
    count++;
    }
  });
})();
