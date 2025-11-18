import type { Color } from "./image";

import { describe, expect, it } from "vitest";
import {
  buildColorMapFromImageData,
  buildColorToCentroidMap,
  calculateColorDistance,
  getUniqueColorsFromMap,
  parseHexToColor,
} from "./image";

describe("@parseHexToColor", () => {
  it("should parse hex color string to RGB object", () => {
    const result = parseHexToColor("#FF5733");
    expect(result).toEqual({ b: 51, g: 87, r: 255 });
  });

  it("should parse lowercase hex color", () => {
    const result = parseHexToColor("#ff5733");
    expect(result).toEqual({ b: 51, g: 87, r: 255 });
  });

  it("should parse black color", () => {
    const result = parseHexToColor("#000000");
    expect(result).toEqual({ b: 0, g: 0, r: 0 });
  });

  it("should parse white color", () => {
    const result = parseHexToColor("#FFFFFF");
    expect(result).toEqual({ b: 255, g: 255, r: 255 });
  });
});

describe("@buildColorMapFromImageData", () => {
  it("should build color histogram from ImageData", () => {
    const imageData = new ImageData(2, 2);
    // Pixel 1: red
    imageData.data[0] = 255;
    imageData.data[1] = 0;
    imageData.data[2] = 0;
    imageData.data[3] = 255;
    // Pixel 2: red (duplicate)
    imageData.data[4] = 255;
    imageData.data[5] = 0;
    imageData.data[6] = 0;
    imageData.data[7] = 255;
    // Pixel 3: blue
    imageData.data[8] = 0;
    imageData.data[9] = 0;
    imageData.data[10] = 255;
    imageData.data[11] = 255;
    // Pixel 4: green
    imageData.data[12] = 0;
    imageData.data[13] = 255;
    imageData.data[14] = 0;
    imageData.data[15] = 255;

    const colorMap = buildColorMapFromImageData(imageData);

    expect(colorMap.size).toBe(3);
    expect(colorMap.get("255,0,0")).toBe(2); // red appears twice
    expect(colorMap.get("0,0,255")).toBe(1); // blue once
    expect(colorMap.get("0,255,0")).toBe(1); // green once
  });

  it("should handle single color image", () => {
    const imageData = new ImageData(2, 2);
    // All pixels white
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255;
      imageData.data[i + 1] = 255;
      imageData.data[i + 2] = 255;
      imageData.data[i + 3] = 255;
    }

    const colorMap = buildColorMapFromImageData(imageData);

    expect(colorMap.size).toBe(1);
    expect(colorMap.get("255,255,255")).toBe(4);
  });
});

describe("@getUniqueColorsFromMap", () => {
  it("should extract unique colors as number arrays", () => {
    const colorMap = new Map<string, number>();
    colorMap.set("255,0,0", 2);
    colorMap.set("0,255,0", 1);
    colorMap.set("0,0,255", 3);

    const colors = getUniqueColorsFromMap(colorMap);

    expect(colors).toHaveLength(3);
    expect(colors).toContainEqual([255, 0, 0]);
    expect(colors).toContainEqual([0, 255, 0]);
    expect(colors).toContainEqual([0, 0, 255]);
  });

  it("should handle empty map", () => {
    const colorMap = new Map<string, number>();
    const colors = getUniqueColorsFromMap(colorMap);
    expect(colors).toHaveLength(0);
  });
});

describe("@buildColorToCentroidMap", () => {
  it("should map unique colors to their centroids", () => {
    const uniqueColors = [
      [255, 0, 0],
      [250, 5, 5],
      [0, 255, 0],
      [0, 0, 255],
    ];
    const clusters = [0, 0, 1, 2]; // First two colors in cluster 0
    const centroids = [
      { b: 2, g: 2, r: 252 }, // Centroid for cluster 0
      { b: 0, g: 255, r: 0 }, // Centroid for cluster 1
      { b: 255, g: 0, r: 0 }, // Centroid for cluster 2
    ];

    const map = buildColorToCentroidMap(uniqueColors, clusters, centroids);

    expect(map.size).toBe(4);
    expect(map.get("255,0,0")).toEqual({ b: 2, g: 2, r: 252 });
    expect(map.get("250,5,5")).toEqual({ b: 2, g: 2, r: 252 });
    expect(map.get("0,255,0")).toEqual({ b: 0, g: 255, r: 0 });
    expect(map.get("0,0,255")).toEqual({ b: 255, g: 0, r: 0 });
  });

  it("should handle single cluster", () => {
    const uniqueColors = [
      [255, 0, 0],
      [0, 255, 0],
    ];
    const clusters = [0, 0];
    const centroids = [{ b: 0, g: 127, r: 127 }];

    const map = buildColorToCentroidMap(uniqueColors, clusters, centroids);

    expect(map.size).toBe(2);
    expect(map.get("255,0,0")).toEqual({ b: 0, g: 127, r: 127 });
    expect(map.get("0,255,0")).toEqual({ b: 0, g: 127, r: 127 });
  });
});

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
