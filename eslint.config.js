const globals = require("globals");
const { FlatCompat } = require("@eslint/eslintrc");

// Configs (khusus yang berbentuk flat config)
const eslint = require("@eslint/js");
const prettier_config = require("eslint-config-prettier");

// Ngubah eslintrc jadi flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  
  // confignya masuk di sini
  eslint.configs.recommended, // eslint:recommended
  ...compat.extends("eslint-config-airbnb-base"), // eslint-config-airbnb-base
  prettier_config, // eslint-config-prettier

  // config custom
  {
    rules: {
      "camelcase": "off",
      "qoutes": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-dynamic-require": "off",
      "global-require": "off",
    }
  }
];