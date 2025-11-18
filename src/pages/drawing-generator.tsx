import type { Color } from "@site/src/utils";
import type { ChangeEvent } from "react";

import {
  addMetadataChunks,
  downloadImage,
  removeTEXtChunks,
  validateImageSize,
} from "@site/src/utils";
import Layout from "@theme/Layout";
import { useMemoizedFn } from "ahooks";
import { DateTime } from "luxon";
import { kmeans } from "ml-kmeans";
import { useEffect, useId, useRef, useState } from "react";
import { z } from "zod";

const DEFAULT_COLOR = "#F58D16" as const;

// Helpers
function parseHexToColor(hex: string): Color {
  return {
    b: Number.parseInt(hex.slice(5, 7), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    r: Number.parseInt(hex.slice(1, 3), 16),
  };
}

function buildColorMapFromImageData(imageData: ImageData): Map<string, number> {
  const { data } = imageData;
  const colorMap = new Map<string, number>();
  for (let i = 0; i < data.length; i += 4) {
    const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
  return colorMap;
}

function getUniqueColorsFromMap(colorMap: Map<string, number>): number[][] {
  return Array.from(colorMap.keys()).map((key) => {
    const [r, g, b] = key.split(",").map(Number);
    return [r, g, b];
  });
}

function tryFastPathIfFewColors(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  colorMap: Map<string, number>,
): boolean {
  if (colorMap.size > 4) return false;

  const { data } = imageData;
  const uniqueColors = Array.from(colorMap.keys()).map((key) => {
    const [r, g, b] = key.split(",").map(Number);
    return { b, g, r } as Color;
  });

  const first = uniqueColors[0];
  for (let i = 0; i < data.length; i += 4) {
    data[i] = first.r;
    data[i + 1] = first.g;
    data[i + 2] = first.b;
  }

  ctx.putImageData(imageData, 0, 0);
  return true;
}

function buildColorToCentroidMap(
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

// Zod Schemas
const hexColorSchema = z
  .string()
  .regex(/^#([0-9a-fA-F]{6})$/, "6자리 HEX 색상이어야 합니다.");

const formSchema = z.object({
  authId: z.string().regex(/^-?\d+$/, "숫자 문자열이어야 합니다."),
  author: z.string().min(1, "제작자를 입력하세요.").max(50),
  colorWeight: z.number().min(0.2).max(0.5),
  customName: z.string().max(100).optional().or(z.literal("")),
  isUseColorWeight: z.boolean(),
  selectedColor: hexColorSchema,
});

const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.type === "image/png", "PNG 파일만 업로드 가능합니다.")
  .refine(
    async (file) => validateImageSize({ file, maxHeight: 96, maxWidth: 256 }),
    {
      message: "이미지 크기가 256x96 이하여야 합니다.",
    },
  );

export default function DrawingGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [authId, setAuthId] = useState("-1379962171");
  const [author, setAuthor] = useState("Eargasm");
  const [isUseColorWeight, setIsUseColorWeight] = useState<boolean>(false);
  const [colorWeight, setColorWeight] = useState<number>(0.2);
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);

  const formId = useId();

  const modifyWhitePixels = useMemoizedFn((ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
        data[i + 2] = 254;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  });

  const reduceToFourColors = useMemoizedFn(
    (ctx: CanvasRenderingContext2D, userHexColor: string) => {
      const userColor = parseHexToColor(userHexColor);

      const imageData = ctx.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height,
      );
      const data = imageData.data;

      // Build color histogram to reduce memory usage and improve performance
      const colorMap = buildColorMapFromImageData(imageData);

      // Fast path: <= 4 colors
      if (tryFastPathIfFewColors(ctx, imageData, colorMap)) return;

      // Extract unique colors for k-means to reduce computation
      const uniqueColors = getUniqueColorsFromMap(colorMap);

      // Weighting: duplicate the selected color to bias clustering
      const colors = uniqueColors.slice();
      if (isUseColorWeight) {
        const influenceCount = Math.max(
          1,
          Math.round(uniqueColors.length * colorWeight),
        );
        for (let i = 0; i < influenceCount; i++) {
          colors.push([userColor.r, userColor.g, userColor.b]);
        }
      }

      // Use k-means++ initialization for better consistency
      const result = kmeans(colors, 4, { initialization: "kmeans++" });
      const centroids = result.centroids.map((centroid) => ({
        b: centroid[2],
        g: centroid[1],
        r: centroid[0],
      }));

      // Map each unique color to its assigned centroid
      const colorToCentroid = buildColorToCentroidMap(
        uniqueColors,
        result.clusters,
        centroids,
      );

      for (let i = 0; i < data.length; i += 4) {
        const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
        const centroid = colorToCentroid.get(key);
        if (!centroid) continue;

        data[i] = centroid.r;
        data[i + 1] = centroid.g;
        data[i + 2] = centroid.b;
      }

      ctx.putImageData(imageData, 0, 0);
    },
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: useMemoizedFn은 안정적인 참조 보장
  useEffect(() => {
    if (!previewSrc) return;

    const img = new Image();
    let isMounted = true;

    const handleLoad = () => {
      if (!isMounted) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        modifyWhitePixels(ctx);
        reduceToFourColors(ctx, selectedColor);
      }
    };

    const handleError = () => {
      if (!isMounted) return;
      console.error("Failed to load image");
      alert("이미지 로드에 실패했습니다.");
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
    img.src = previewSrc;

    return () => {
      isMounted = false;
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
      URL.revokeObjectURL(previewSrc);
    };
  }, [previewSrc, selectedColor]);

  const handleImageChange = useMemoizedFn(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        setPreviewSrc(null);
        return;
      }
      try {
        await imageFileSchema.parseAsync(file);
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: "image/png" });
        setPreviewSrc(URL.createObjectURL(blob));
      } catch (err) {
        const message =
          err instanceof z.ZodError
            ? err.issues[0]?.message
            : "알 수 없는 오류";
        alert(message);
        setPreviewSrc(null);
      }
    },
  );

  const saveCanvasAsPNG = useMemoizedFn(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("캔버스를 찾을 수 없습니다.");
      return;
    }

    try {
      formSchema.parse({
        authId,
        author,
        colorWeight,
        customName,
        isUseColorWeight,
        selectedColor,
      });
    } catch (err) {
      const message =
        err instanceof z.ZodError ? err.issues[0]?.message : "알 수 없는 오류";
      alert(message);
      return;
    }

    const formattedDate = DateTime.now().toFormat("yyyyMMdd_HHmmss");
    const name = `chat_${formattedDate}_${customName || "그림대화"}.png`;

    canvas.toBlob((blob) => {
      if (!blob) {
        alert("이미지 생성에 실패했습니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          const cleanedBuffer = removeTEXtChunks(arrayBuffer);
          const bufferWithMetadata = addMetadataChunks(
            cleanedBuffer,
            authId,
            author,
          );
          const newBlob = new Blob([bufferWithMetadata], {
            type: "image/png",
          });
          const href = URL.createObjectURL(newBlob);

          downloadImage({
            href,
            name,
          });
          URL.revokeObjectURL(href);
        } catch (error) {
          console.error("PNG 메타데이터 추가 실패:", error);
          alert(
            `이미지 처리 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
          );
        }
      };
      reader.onerror = () => {
        alert("파일 읽기에 실패했습니다.");
      };
      reader.readAsArrayBuffer(blob);
    }, "image/png");
  });

  return (
    <Layout>
      <div
        style={{
          alignItems: "center",
          color: "var(--ifm-color-primary)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "var(--ifm-color-primary)", margin: "2rem 0" }}>
          그림대화 생성기
        </h1>
        <div
          style={{
            background: "var(--ifm-background-color)",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            width: "400px",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <label htmlFor={`${formId}-auth-id`}>고유아이디</label>
                <input
                  id={`${formId}-auth-id`}
                  onChange={(e) => setAuthId(e.target.value)}
                  placeholder="AuthID"
                  style={{
                    border: "1px solid var(--ifm-color-primary)",
                    borderRadius: "0.25rem",
                    padding: "0.5rem",
                  }}
                  type="text"
                  value={authId}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <label htmlFor={`${formId}-author`}>제작자</label>
                <input
                  id={`${formId}-author`}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author"
                  style={{
                    border: "1px solid var(--ifm-color-primary)",
                    borderRadius: "0.25rem",
                    padding: "0.5rem",
                  }}
                  type="text"
                  value={author}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <label htmlFor={`${formId}-custom-name`}>구분할 파일명</label>
              <input
                id={`${formId}-custom-name`}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Custom File Name"
                style={{
                  border: "1px solid var(--ifm-color-primary)",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                }}
                type="text"
                value={customName}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <label>
                <input
                  checked={isUseColorWeight}
                  onChange={(e) => setIsUseColorWeight(e.target.checked)}
                  type="checkbox"
                />
                색상 가중치 사용하기
              </label>
            </div>
            {isUseColorWeight && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                  }}
                >
                  <label htmlFor={`${formId}-color-weight`}>
                    가중치 설정 (0.2 ~ 0.5)
                  </label>
                  <input
                    id={`${formId}-color-weight`}
                    max="0.5"
                    min="0.2"
                    onChange={(e) =>
                      setColorWeight(Number.parseFloat(e.target.value))
                    }
                    step="0.01"
                    title="가중치 설정"
                    type="range"
                    value={colorWeight}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                  }}
                >
                  <label htmlFor={`${formId}-selected-color`}>
                    가중치 색상 선택
                  </label>
                  <input
                    id={`${formId}-selected-color`}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    title="가중치 색상"
                    type="color"
                    value={selectedColor}
                  />
                </div>
              </>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <label htmlFor={`${formId}-image-upload`}>이미지 추가 *</label>
              <input
                accept="image/png"
                id={`${formId}-image-upload`}
                onChange={handleImageChange}
                style={{
                  border: "1px solid var(--ifm-color-primary)",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
                title="Upload Image"
                type="file"
              />
              <small style={{ color: "var(--ifm-color-emphasis-600)" }}>
                최대 256x96px, PNG 파일만 가능
              </small>
            </div>
            {previewSrc && (
              <button
                onClick={saveCanvasAsPNG}
                style={{
                  backgroundColor: "var(--ifm-color-primary-dark)",
                  borderRadius: "0.25rem",
                  color: "white",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
                type="button"
              >
                이미지 다운로드
              </button>
            )}
          </form>
        </div>
        {previewSrc && (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            <h3>미리보기</h3>
            <canvas ref={canvasRef} />
          </div>
        )}
      </div>
    </Layout>
  );
}
