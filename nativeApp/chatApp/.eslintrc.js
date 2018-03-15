module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        'eslint:recommended',
        'plugin:vue/essential'
    ],

    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0,
        "comma-dangle": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "key-spacing": ["error",{
            "beforeColon": false,
            "afterColon": true,
            "mode": "strict",
        }],
    }
};