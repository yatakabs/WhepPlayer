module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        },
        {
            "env": {
                "jest": true
            },
            "files": [
                "**/__tests__/**/*.js"
            ],
            "extends": [
                "plugin:jest/recommended"
            ],
            "plugins": [
                "jest"
            ],
            "rules": {
                "jest/no-alias-methods": "error",
                "jest/no-disabled-tests": "error",
                "jest/no-focused-tests": "error",
                "jest/no-standalone-expect": "off",
                "jest/no-test-prefixes": "error",
                "jest/no-test-return-statement": "error",
                "jest/prefer-spy-on": "error",
                "jest/prefer-strict-equal": "off",
                "jest/valid-expect-in-promise": "error",
                "jest/valid-expect": "error",
                "jest/no-identical-title": "off",
            },
        },
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "warn",
            {
                "args": "none", // Ignore unused function arguments
                "vars": "local", // Ignore unused variables declared using var
                "varsIgnorePattern": "^_", // Ignore unused variables starting with an underscore
            }
        ],
        "no-undef": "off",
    },
    "ignorePatterns": [
        "node_modules/",
        "dist/",
        "coverage/"
    ],
};
