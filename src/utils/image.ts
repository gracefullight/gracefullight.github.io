interface ValidateImageSizeProps {
  file: File;
  maxWidth: number;
  maxHeight: number;
}

export function validateImageSize({
  file,
  maxWidth,
  maxHeight,
}: ValidateImageSizeProps): Promise<boolean> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    img.addEventListener("load", () => {
      URL.revokeObjectURL(url);
      resolve(img.width <= maxWidth && img.height <= maxHeight);
    });

    img.addEventListener("error", () => {
      URL.revokeObjectURL(url);
      resolve(false);
    });
  });
}

interface DownloadImageProps {
  href: string;
  name: string;
}

export function downloadImage({ href, name }: DownloadImageProps): void {
  const link = document.createElement("a");
  link.download = name;
  link.href = href;
  link.click();
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export function calculateColorDistance(color1: Color, color2: Color) {
  return Math.sqrt(
    (color1.r - color2.r) ** 2 +
      (color1.g - color2.g) ** 2 +
      (color1.b - color2.b) ** 2,
  );
}

/**
 * HEX 색상 문자열을 Color 객체로 변환
 */
export function parseHexToColor(hex: string): Color {
  return {
    b: Number.parseInt(hex.slice(5, 7), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    r: Number.parseInt(hex.slice(1, 3), 16),
  };
}

/**
 * ImageData에서 색상 히스토그램 생성
 */
export function buildColorMapFromImageData(
  imageData: ImageData,
): Map<string, number> {
  const { data } = imageData;
  const colorMap = new Map<string, number>();
  for (let i = 0; i < data.length; i += 4) {
    const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
  return colorMap;
}

/**
 * 색상 맵에서 고유 색상 배열 추출
 */
export function getUniqueColorsFromMap(
  colorMap: Map<string, number>,
): number[][] {
  return Array.from(colorMap.keys()).map((key) => {
    const [r, g, b] = key.split(",").map(Number);
    return [r, g, b];
  });
}

/**
 * k-means 클러스터링 결과를 색상 맵으로 변환
 */
export function buildColorToCentroidMap(
  uniqueColors: number[][],
  clusters: number[],
  centroids: Color[],
): Map<string, Color> {
  const map = new Map<string, Color>();
  for (let i = 0; i < uniqueColors.length; i++) {
    const key = `${uniqueColors[i][0]},${uniqueColors[i][1]},${uniqueColors[i][2]}`;
    map.set(key, centroids[clusters[i]]);
  }
  return map;
}
