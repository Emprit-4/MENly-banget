const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild
    .build({
        platform: "node",
        entryPoints: ["src/index.js"],
        outfile: "./dist/server.prod.js",
        define: {
            "process.env.NODE_ENV": '"production"',
        },
        bundle: true,
        treeShaking: true,
        minify: true,
        sourcemap: true,
        plugins: [nodeExternalsPlugin()],
    })
    .catch(() => process.exit(1));
