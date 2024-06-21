const swc = require("@rollup/plugin-swc");
const commonJS = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");

const pluginOptions = {
    swc: {
        swc: {
            minify: true,
            jsc: { minify: { mangle: true, compress: true } },
        },
    },
};

module.exports = {
    input: "./src/index.js",
    external: [/node_modules/],
    output: {
        file: "./dist/server.prod.js",
        format: "cjs",
        compact: true,
    },
    preserveSymlinks: true,
    treeshake: "smallest",
    plugins: [commonJS(), nodeResolve(), swc(pluginOptions.swc)],
};
