

const withCSS = require("@zeit/next-css");
//fix: prevents error when .css files are required by node
if (typeof require !== "undefined") {
  require.extensions[".css"] = () => {};
}
module.exports = withCSS();
