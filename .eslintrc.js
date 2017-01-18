module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
        "after": true,
        "before": true,
        "describe": true,
        "it": true,
        "printgic": true,
    },
    "rules": {
        "indent": [2, 4, {
            "SwitchCase": 1
        }],
        "prefer-const": [1, {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "quotes": [1, "single", {
            "avoidEscape": true
        }],
        "eqeqeq": 2,
        "brace-style": "error",
        "semi": [2, "always"],
        "comma-dangle": [1, "never"],
        "dot-notation": 2,
        "object-shorthand": 1,
        "no-console": 2,
        "no-unused-vars": 1,
        "no-new-object": 2,
        "no-array-constructor": 2,
        "no-case-declarations": 2
    }
};
