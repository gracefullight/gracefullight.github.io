/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: [
        "blog/**/*.{md,mdx}",
        "i18n/*/docusaurus-plugin-content-blog/**/*.{md,mdx}",
      ],
      extends: ["plugin:mdx/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
