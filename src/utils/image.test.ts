import { describe, expect, it } from "vitest";

import type { Color } from "./image.ts";
import { calculateColorDistance } from "./image.ts";

describe("@calculateColorDistance", () => {
  it("should return 0 for the same color", () => {
    const color1: Color = { r: 255, g: 255, b: 255 };
    const color2: Color = { r: 255, g: 255, b: 255 };
    const distance = calculateColorDistance(color1, color2);
    expect(distance).toBe(0);
  });

  it("should return the correct distance for different colors", () => {
    const color1: Color = { r: 255, g: 0, b: 0 };
    const color2: Color = { r: 0, g: 255, b: 0 };
    const distance = calculateColorDistance(color1, color2);
    expect(distance).toBeCloseTo(360.624, 3);
  });

  it("should handle colors with minimum and maximum values", () => {
    const color1: Color = { r: 0, g: 0, b: 0 };
    const color2: Color = { r: 255, g: 255, b: 255 };
    const distance = calculateColorDistance(color1, color2);
    expect(distance).toBeCloseTo(441.673, 3);
  });
});
