/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["plugin:markdown/recommended", "plugin:prettier/recommended"],
};
