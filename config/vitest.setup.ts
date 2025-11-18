import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";

// Mock Canvas API for image processing tests
beforeAll(() => {
  // Mock ImageData constructor
  if (typeof global.ImageData === "undefined") {
    global.ImageData = class ImageData {
      data: Uint8ClampedArray;
      width: number;
      height: number;

      constructor(width: number, height: number);
      constructor(data: Uint8ClampedArray, width: number, height?: number);
      constructor(
        dataOrWidth: Uint8ClampedArray | number,
        widthOrHeight: number,
        height?: number,
      ) {
        if (typeof dataOrWidth === "number") {
          this.width = dataOrWidth;
          this.height = widthOrHeight;
          this.data = new Uint8ClampedArray(dataOrWidth * widthOrHeight * 4);
        } else {
          this.data = dataOrWidth;
          this.width = widthOrHeight;
          this.height = height ?? dataOrWidth.length / (widthOrHeight * 4);
        }
      }
    } as unknown as typeof ImageData;
  }
});

afterEach(() => {
  cleanup();
});
