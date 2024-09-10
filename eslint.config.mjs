import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["config.mjs", "config.js"],
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
  },
  {
    files: ["*.config.js", "postcss.config.js", "tailwind.config.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {},
  },
];
