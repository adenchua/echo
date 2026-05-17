import { defineConfig } from "eslint/config";
import eslintReact from "@eslint-react/eslint-plugin";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintReact.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "no-console": 2,
      "@typescript-eslint/explicit-function-return-type": 2,
      curly: [2, "all"],
      "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
      complexity: [1, 20],
    },
  },
]);
