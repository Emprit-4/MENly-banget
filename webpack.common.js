const path = require("path");
const process = require("process");

module.exports = {
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
