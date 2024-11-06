import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: "warn",
      "prefer-const": "error",
      '@typescript-eslint/no-explicit-any': "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-types": "warn",
    }
  }
];