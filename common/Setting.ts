const EnvInfo = require("../next.config.js");

/* 本番環境と開発環境の分岐用のフラグ */
const isProd = process.env.NODE_ENV === "production";

const Setting = {
  IMG_ROOT_PATH: isProd ? EnvInfo.assetPrefix : "",
};

export { Setting, isProd };
