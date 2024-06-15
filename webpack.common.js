const path = require("path");

module.exports = {
    entry: "./index.js",
    cache: true,
    target: "node",
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "server.prod.js",
    },
    resolve: { 
        extensions: [".js"],
        symlinks: false,
    },
};