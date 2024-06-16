const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const webpack = require("webpack");

const common = require("./webpack.common");

const options = {
    nodeExternals: {
        allowlist: ["webpack/hot/poll?1000"],
    },
};

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    watch: true,
    externals: [nodeExternals(options.nodeExternals)],
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
