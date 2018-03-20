module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ["vue", "html"],
  settings: {
    "html/html-extensions": [".html"]
  },
  extends: ["eslint:recommended", "plugin:vue/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      arrowFunctions: true,
      binaryLiterals: true,
      blockBindings: true,
      classes: true
    }
  },
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": 0,
    "comma-dangle": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
        mode: "strict"
      }
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false
      }
    ],
    "prefer-arrow-callback": ["warn", { allowNamedFunctions: false }]
  }
};
