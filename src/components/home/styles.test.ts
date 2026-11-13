import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

const css = readFileSync(
  new URL("./styles.module.css", import.meta.url),
  "utf8",
);

// Infima dark: page ground and body text.
const DARK_GROUND = "#1b1b1d";
const DARK_BODY = "#e3e3e3";

function darkToken(name: string) {
  const block = css.match(
    /:global\(\[data-theme="dark"\]\) \.home \{([\s\S]*?)\}/,
  )?.[1];
  const value = block?.match(
    new RegExp(`${name}:\\s*(#[\\da-f]{6})`, "i"),
  )?.[1];
  if (!value) throw new Error(`Missing dark token: ${name}`);
  return value;
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

it("keeps dark muted text readable on the ground and the posts band", () => {
  const muted = darkToken("--home-muted");
  expect(contrast(muted, DARK_GROUND)).toBeGreaterThanOrEqual(4.5);
  expect(contrast(muted, darkToken("--home-soft"))).toBeGreaterThanOrEqual(4.5);
});

it("keeps dark muted text quieter than body text", () => {
  expect(luminance(darkToken("--home-muted"))).toBeLessThan(
    luminance(DARK_BODY),
  );
});

it("lifts the dark posts band visibly off the ground", () => {
  expect(
    contrast(darkToken("--home-soft"), DARK_GROUND),
  ).toBeGreaterThanOrEqual(1.15);
});
