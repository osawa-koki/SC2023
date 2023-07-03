
(() => {
  const x_from = 50;
  const x_upto = 550;
  const x_diff = x_upto - x_from;
  const y_from = 50;
  const y_upto = 350;
  const y_diff = y_upto - y_from;
  const x_from_ = 0;
  const x_upto_ = 30;
  const x_diff_ = x_upto_ - x_from_;
  const y_from_ = 0;
  const y_upto_ = 80;
  const y_diff_ = y_upto_ - y_from_;
  (() => {
    const k = document.getElementById("p_key-curve");
    let pts = "";
    for (let i = x_from_; i <= x_upto_; i++) {
      pts += (i * x_diff / x_diff_ + x_from).toString() + ", ";
      pts += (y_upto - (i * 2) * y_diff / y_diff_).toString() + " ";
    }
    k.setAttribute("points", pts);
  })();
  (() => {
    const k = document.getElementById("c_key-curve");
    let pts = "";
    for (let i = x_from_; i <= x_upto_; i++) {
      pts += (i * x_diff / x_diff_ + x_from).toString() + ", ";
      pts += (y_upto - (i * (i - 1) / 2) * y_diff / y_diff_).toString() + " ";
    }
    k.setAttribute("points", pts);
  })();
})();
