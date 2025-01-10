import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      semi: "warn",
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-types": "warn",
      "simple-import-sort/exports": "warn",
      "unicorn/no-array-callback-reference": "warn",
      "unicorn/no-array-for-each": "warn",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "simple-import-sort/imports": "off",
      "unicorn/prefer-module": "warn",
      "unicorn/no-negated-condition": "off",
      "unicorn/no-useless-undefined": "warn",
      "unicorn/no-document-cookie": "warn",
      "unicorn/prefer-global-this": "off",
      "unicorn/explicit-length-check": "warn",
      "unicorn/prefer-string-replace-all": "off",
      "react/display-name": "warn",
      "vars-on-top": "warn",
      "react/no-children-prop": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "unicorn/no-empty-file": "warn",
      "no-unused-vars": "off",
      "no-undef": "off",
      "prettier/prettier": "off",
      "unicorn/no-for-loop": "warn",
      "unicorn/prevent-abbreviations": [
        "warn",
        {
          "allowList": {
            "e2e": true
          },
          "replacements": {
            "props": false,
            "ref": false,
            "params": false
          }
        }
      ],
    },
  },
  {
    files: ["./typings/**/*.ts"], // Apply only to typings folder
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Example: Disable a rule in typings
    },
  },
];
