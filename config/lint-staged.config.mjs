export default {
  "**/*.{ts,tsx,js,mjs,mts}": "oxlint --fix",
  "**/*.{js,jsx,mjs,cjs,ts,tsx,yml,json,html,md}": [
    "biome format --write --no-errors-on-unmatched",
  ],
  "package.json": "sort-package-json",
};
