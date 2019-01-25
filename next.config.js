

const withCSS = require("@zeit/next-css");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const webpack = require("webpack");
const path = require("path");
//fix: prevents error when .css files are required by node
if (typeof require !== "undefined") {
  require.extensions[".css"] = () => {};
}
module.exports = withCSS({
  onDemandEntries: {
    // Make sure entries are not getting disposed.
    maxInactiveAge: 1000 * 60 * 60
  },
  serverRuntimeConfig: {
    mySecret: "secret"
  },
  publicRuntimeConfig: {
    staticFolder: "/static"
  },
  webpack(config, {buildId}) {
    withBundleAnalyzer({
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../bundles/server.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "../bundles/client.html"
        }
      }
    });
    const nextLocation = path.join(require.resolve("next/package.json"), "../");
    const nextCssNodeModulesLocation = path.join(
      require.resolve("@zeit/next-css"),
      "../../../node_modules"
    );

    if (nextCssNodeModulesLocation.indexOf(nextLocation) === -1) {
      config.resolveLoader.modules.push(nextCssNodeModulesLocation);
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.CONFIG_BUILD_ID": JSON.stringify(buildId)
      })
    );
    return config;
  }
});
