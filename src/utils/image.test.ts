import type { Color } from "./image";

import { describe, expect, it } from "vitest";
import { calculateColorDistance } from "./image";

describe("@calculateColorDistance", () => {
  it("should return 0 for the same color", () => {
    const color1: Color = { b: 255, g: 255, r: 255 };
    const color2: Color = { b: 255, g: 255, r: 255 };
    const distance = calculateColorDistance(color1, color2);
    expect(distance).toBe(0);
  });

  it("should return the correct distance for different colors", () => {
    const color1: Color = { b: 0, g: 0, r: 255 };
    const color2: Color = { b: 0, g: 255, r: 0 };
    const distance = calculateColorDistance(color1, color2);
    expect(distance).toBeCloseTo(360.624, 3);
  });

  it("should handle colors with minimum and maximum values", () => {
    const color1: Color = { b: 0, g: 0, r: 0 };
    const color2: Color = { b: 255, g: 255, r: 255 };
    const distance = calculateColorDistance(color1, color2);
    expect(distance).toBeCloseTo(441.673, 3);
  });
});
