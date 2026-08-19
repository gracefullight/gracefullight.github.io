import { remark } from "remark";
import { expect, test } from "vitest";
import config from "../.remarkrc.mjs";

async function format(markdown: string) {
  const processor = remark().data("settings", config.settings);

  for (const plugin of config.plugins) {
    if (typeof plugin === "string") {
      processor.use((await import(plugin)).default);
    } else {
      processor.use(plugin);
    }
  }

  return String(await processor.process(markdown));
}

test("keeps nested list-item math as inline dollars", async () => {
  const markdown = [
    "- For RGB:",
    "  - $L_R(x, y, z, \\theta, \\phi)$",
    "",
  ].join("\n");

  await expect(format(markdown)).resolves.toBe(markdown);
});

test("rewrites list-item display fences back to inline dollars", async () => {
  const input = [
    "- For RGB:",
    "  - $$L_R(x, y, z, \\theta, \\phi,)$$",
    "",
  ].join("\n");
  const expected = [
    "- For RGB:",
    "  - $L_R(x, y, z, \\theta, \\phi,)$",
    "",
  ].join("\n");

  await expect(format(input)).resolves.toBe(expected);
});

test("keeps standalone display math as double dollars", async () => {
  const markdown = "$$L(x, y, z, \\theta, \\phi, \\lambda, t)$$\n";

  await expect(format(markdown)).resolves.toBe(markdown);
});
