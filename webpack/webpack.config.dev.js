const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.config.base.js");

const debugCSP = { extension_pages: "script-src 'self' http://localhost:8097; object-src 'self';" };

module.exports = (env) => {
    return webpackMerge.merge(baseConfig, {
        mode: "development",
        devtool: "inline-source-map",
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
                dev: env.devtools,
                minify: {
                    collapseWhitespace: true
                }
            })
        ]
    });
}
