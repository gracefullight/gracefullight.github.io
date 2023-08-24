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

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img.width <= maxWidth && img.height <= maxHeight);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };
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
