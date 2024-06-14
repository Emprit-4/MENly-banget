const babelParser = require("@babel/eslint-parser");
const globals = require("globals");
const { FlatCompat } = require("@eslint/eslintrc");

// Configs (khusus yang berbentuk flat config)
const eslint = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");

// Ngubah eslintrc jadi flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  // opsi eslint
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs", 
      globals: globals.browser,

      parser: babelParser, // ngatur parser
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
        }
      },
    },
  },

  // confignya masuk di sini
  eslint.configs.recommended, // eslint:recommended
  ...compat.extends("eslint-config-airbnb-base"), // eslint-config-airbnb-base
  prettierConfig, // eslint-config-prettier

  // config custom
  {
    rules: {
      "camelcase": "warn",
      "qoutes": "off",
      "import/no-extraneous-dependencies": "warn",
      "import/no-dynamic-require": "warn",
      "global-require": "warn",
      "semi": "warn",
      "new-cap": "warn"
    }
  },
];