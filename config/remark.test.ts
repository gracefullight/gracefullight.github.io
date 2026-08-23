import { remark } from "remark";
import { expect, test } from "vitest";
import config, { normalizeMathFences } from "../.remarkrc.mjs";

async function format(markdown: string) {
  const processor = remark().data("settings", config.settings as never);

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

test("normalizeMathFences splits glued display fences", () => {
  const input = [
    "$$\\begin{bmatrix} v(s_1) \\\\ v(s_2) \\end{bmatrix}",
    "=",
    "\\begin{bmatrix} 6.2 \\\\ -0.4 \\end{bmatrix}$$",
    "",
  ].join("\n");
  const expected = [
    "$$",
    "\\begin{bmatrix} v(s_1) \\\\ v(s_2) \\end{bmatrix}",
    "=",
    "\\begin{bmatrix} 6.2 \\\\ -0.4 \\end{bmatrix}",
    "$$",
    "",
  ].join("\n");

  expect(normalizeMathFences(input)).toBe(expected);
});

test("normalizeMathFences leaves code fences untouched", () => {
  const markdown = [
    "```md",
    "$$\\begin{bmatrix} a \\\\ b \\end{bmatrix}",
    "c$$",
    "```",
    "",
  ].join("\n");

  expect(normalizeMathFences(markdown)).toBe(markdown);
});

test("format preserves glued multiline matrix backslashes", async () => {
  const input = [
    "$$\\begin{bmatrix} v(s_1) \\\\ v(s_2) \\\\ v(s_3) \\\\ v(s_4) \\\\ v(s_5) \\end{bmatrix}",
    "=",
    "\\left(",
    "\\mathbf{I} - \\gamma",
    "\\begin{bmatrix}",
    "0 & 0.1 & 0.5 & 0.1 & 0 \\\\",
    "0.4 & 0.1 & 0.5 & 0 & 0 \\\\",
    "0 & 0.5 & 0.5 & 0 & 0 \\\\",
    "0.5 & 0 & 0 & 0.2 & 0.3 \\\\",
    "0.7 & 0 & 0 & 0 & 0.3",
    "\\end{bmatrix}",
    "\\right)^{-1}",
    "\\begin{bmatrix} 6.2 \\\\ -0.4 \\\\ 0 \\\\ 0 \\\\ -1.4 \\end{bmatrix}$$",
    "",
  ].join("\n");
  const expected = [
    "$$",
    "\\begin{bmatrix} v(s_1) \\\\ v(s_2) \\\\ v(s_3) \\\\ v(s_4) \\\\ v(s_5) \\end{bmatrix}",
    "=",
    "\\left(",
    "\\mathbf{I} - \\gamma",
    "\\begin{bmatrix}",
    "0 & 0.1 & 0.5 & 0.1 & 0 \\\\",
    "0.4 & 0.1 & 0.5 & 0 & 0 \\\\",
    "0 & 0.5 & 0.5 & 0 & 0 \\\\",
    "0.5 & 0 & 0 & 0.2 & 0.3 \\\\",
    "0.7 & 0 & 0 & 0 & 0.3",
    "\\end{bmatrix}",
    "\\right)^{-1}",
    "\\begin{bmatrix} 6.2 \\\\ -0.4 \\\\ 0 \\\\ 0 \\\\ -1.4 \\end{bmatrix}",
    "$$",
    "",
  ].join("\n");

  await expect(format(input)).resolves.toBe(expected);
});
