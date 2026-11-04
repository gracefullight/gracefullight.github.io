import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

const css = readFileSync(new URL("./custom.css", import.meta.url), "utf8");

function palette(selector: string) {
  const block = css.match(new RegExp(`${selector} \\{([\\s\\S]*?)\\n\\}`))?.[1];
  if (!block) throw new Error(`Missing theme: ${selector}`);
  return new Map(
    [...block.matchAll(/(--ifm-color-primary[\w-]*):\s*(#[\da-f]{6})/gi)].map(
      ([, name, value]) => [name, value],
    ),
  );
}

function luminance(hex: string) {
  const rgb = hex
    .slice(1)
    .match(/../g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.040_45
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  if (!rgb) throw new Error(`Invalid color: ${hex}`);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

function contrast(first: string, second: string) {
  const values = [luminance(first), luminance(second)].sort((a, b) => a - b);
  return (values[1] + 0.05) / (values[0] + 0.05);
}

it.each([
  [":root", "#ffffff"],
  ['\\[data-theme="dark"\\]', "#1b1b1d"],
])(
  "keeps every %s primary interaction color readable",
  (selector, background) => {
    const colors = palette(selector);
    const shades = [...colors].filter(([name]) => !name.includes("contrast-"));
    expect(shades).toHaveLength(7);
    for (const [name, color] of shades) {
      expect(contrast(color, background), name).toBeGreaterThanOrEqual(4.5);
    }
    const primary = colors.get("--ifm-color-primary");
    expect(primary).toBeDefined();
    expect(contrast(primary ?? "", background)).toBeGreaterThanOrEqual(7);
  },
);

it.each([":root", '\\[data-theme="dark"\\]'])(
  "keeps the %s tinted primary surface readable",
  (selector) => {
    const colors = palette(selector);
    const foreground = colors.get("--ifm-color-primary-contrast-foreground");
    const background = colors.get("--ifm-color-primary-contrast-background");
    expect(foreground).toBeDefined();
    expect(background).toBeDefined();
    expect(contrast(foreground ?? "", background ?? "")).toBeGreaterThanOrEqual(
      4.5,
    );
  },
);
