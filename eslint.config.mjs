// @ts-check

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import * as mdx from "eslint-plugin-mdx";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ...mdx.flat,
    // optional, if you want to lint code blocks at the same
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: {},
    }),
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
      // if you want to override some rules for code blocks
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    ignores: [".docusaurus", "build", "*.config.js", "src/plugins/*.js"],
  },
);
