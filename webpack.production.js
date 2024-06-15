const nodeExternals = require("webpack-node-externals");
const WebpackObfuscator = require("webpack-obfuscator");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");

const options = {
    obsfuscator: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.35,
        deadCodeInjection: true,
        debugProtection: true,
        debugProtectionInterval: 3000,
        numbersToExpressions: true,
        identifierNamesGenerator: 'hexadecimal',
        selfDefending: true,
        simplify: true,
        rotateStringArray: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 5,
        stringArrayWrappersChainedCalls: true,    
        stringArrayWrappersParametersMaxCount: 5,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
    },
};

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new WebpackObfuscator (options.obsfuscator, []),
        
    ],
    externals: [nodeExternals()],
});