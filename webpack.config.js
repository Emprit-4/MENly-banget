const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const { merge } = require("webpack-merge");
const webpack = require("webpack");

const path = require("path");
const process = require("process");

const isProd = process.env.NODE_ENV === "production";

// Opsi build umum yang tidak env-specific
const common = {
    context: process.cwd(), // ngatur context ke root dir
    entry: "./index.js",
    cache: true,
    target: "node",
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "server.prod.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/test\.js$/], // mencegah berkas2 .test.js untuk dibundle
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".js"],
        symlinks: false, // symlink nggak dipake, jadi matiin aja
    },
};

// Opsi untuk plugin yang digunakan
const pluginsOptions = {
    nodeExternals: {
        allowlist: ["webpack/hot/poll?1000"],
    },
    obsfuscator: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.35,
        deadCodeInjection: true,
        debugProtection: true,
        debugProtectionInterval: 3000,
        numbersToExpressions: true,
        identifierNamesGenerator: "hexadecimal",
        selfDefending: true,
        simplify: true,
        rotateStringArray: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ["rc4"],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 5,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 5,
        stringArrayWrappersType: "function",
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
    },
};

// Ada 2 opsi build: untuk devel sama untuk prod
const options = {
    development: {
        mode: "development",
        devtool: "source-map",
        watch: true,
        externals: [nodeExternals(pluginsOptions.nodeExternals)],
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
    },
    production: {
        mode: "production",
        plugins: [
            new WebpackObfuscator(pluginsOptions.obsfuscator, []),
            new CleanWebpackPlugin(),
        ],
        externals: [nodeExternals()],
    },
};

module.exports = merge(
    common,
    isProd ? options.production : options.development
);
