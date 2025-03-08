interface ValidateImageSizeProps {
  file: File;
  maxWidth: number;
  maxHeight: number;
}

export async function validateImageSize({
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
