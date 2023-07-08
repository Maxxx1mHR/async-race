module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "airbnb-typescript/base",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
         "project": "./tsconfig.json",
    },
    "plugins": [
        "prettier",
        "@typescript-eslint"
    ],
    "rules": {
        "prettier/prettier": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/array-type": [
          "error",
          {
            "default": "array",
          },
        ],
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          {
            "accessibility": "explicit",
            "overrides": {
              "accessors": "explicit",
              "constructors": "off",
              "methods": "explicit",
              "properties": "explicit",
              "parameterProperties": "explicit",
            },
          },
        ],
        // "max-lines-per-function": ["error", 40],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
