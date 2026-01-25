export default {
  "**/*.{js,jsx,mjs,cjs,ts,tsx,yml,json,html,md}": [
    "biome format --write --no-errors-on-unmatched",
  ],
  "**/*.{ts,tsx,js,mjs,mts}": "bun lint",
};
