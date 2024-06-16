const globals = require("globals");
const pluginJS = require("@eslint/js");

// Cuma yang essensial aja
module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: globals.node,
        },
    },

    {
        ignores: ["dist/"],
    },

    pluginJS.configs.recommended,

    {
        rules: {
            "object-shorthand": "warn",
            camelcase: "error",
            curly: "error",
            eqeqeq: "error",
            "no-console": "warn",
            "no-empty-function": "error",
            "no-eq-null": "error",
            "no-eval": "error",
            "no-plusplus": "error",
            "no-shadow": "error",
            "no-useless-rename": "error",
            "prefer-const": "error",
            "prefer-object-spread": "error",
        },
    },
];
