import type { Color } from "@site/src/utils";
import type { ChangeEvent } from "react";

import {
  addMetadataChunks,
  calculateColorDistance,
  downloadImage,
  removeTEXtChunks,
  validateImageSize,
} from "@site/src/utils";
import Layout from "@theme/Layout";
import { useMemoizedFn } from "ahooks";
import { DateTime } from "luxon";
import { kmeans } from "ml-kmeans";
import { useEffect, useId, useRef, useState } from "react";

// Theme colors for the drawing generator
const THEME = {
  background: "#242526", // Dark gray
  defaultColor: "#F58D16", // Default drawing color
  primary: "#f49f3f", // Orange
  primaryDark: "#f28913", // Dark orange
  textMuted: "#7f8c8d", // Gray
} as const;

export default function DrawingGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [authId, setAuthId] = useState("-1379962171");
  const [author, setAuthor] = useState("Eargasm");
  const [isUseColorWeight, setIsUseColorWeight] = useState<boolean>(false);
  const [colorWeight, setColorWeight] = useState<number>(0.2);
  const [selectedColor, setSelectedColor] = useState<string>(
    THEME.defaultColor,
  );

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

  const applyColorWeight = useMemoizedFn(
    (centroids: Color[], userColor: Color) => {
      if (!isUseColorWeight) return;

      let closestCentroidIndex = 0;
      let minDistance = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < centroids.length; i++) {
        const centroid = centroids[i];
        const distance = calculateColorDistance(userColor, centroid);

        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = i;
        }
      }

      const closestCentroid = centroids[closestCentroidIndex];
      closestCentroid.r =
        closestCentroid.r * (1 - colorWeight) + userColor.r * colorWeight;
      closestCentroid.g =
        closestCentroid.g * (1 - colorWeight) + userColor.g * colorWeight;
      closestCentroid.b =
        closestCentroid.b * (1 - colorWeight) + userColor.b * colorWeight;
    },
  );

  const reduceToFourColors = useMemoizedFn(
    (ctx: CanvasRenderingContext2D, userHexColor: string) => {
      const userColor: Color = {
        b: Number.parseInt(userHexColor.slice(5, 7), 16),
        g: Number.parseInt(userHexColor.slice(3, 5), 16),
        r: Number.parseInt(userHexColor.slice(1, 3), 16),
      };

      const imageData = ctx.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height,
      );
      const data = imageData.data;

      // Build color histogram to reduce memory usage and improve performance
      const colorMap = new Map<string, number>();
      for (let i = 0; i < data.length; i += 4) {
        const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }

      // If image already has 4 or fewer colors, no need for k-means
      if (colorMap.size <= 4) {
        const uniqueColors = Array.from(colorMap.keys()).map((key) => {
          const [r, g, b] = key.split(",").map(Number);
          return { b, g, r };
        });

        // Just use the first color (could be improved to map correctly)
        const first = uniqueColors[0];
        for (let i = 0; i < data.length; i += 4) {
          data[i] = first.r;
          data[i + 1] = first.g;
          data[i + 2] = first.b;
        }

        ctx.putImageData(imageData, 0, 0);
        return;
      }

      // Use unique colors for k-means to reduce computation
      const colors = Array.from(colorMap.keys()).map((key) => {
        const [r, g, b] = key.split(",").map(Number);
        return [r, g, b];
      });

      // Use k-means++ initialization for better consistency
      const result = kmeans(colors, 4, { initialization: "kmeans++" });
      const centroids = result.centroids.map((centroid) => ({
        b: centroid[2],
        g: centroid[1],
        r: centroid[0],
      }));

      // Apply color weight to closest centroid
      applyColorWeight(centroids, userColor);

      for (let i = 0; i < data.length; i += 4) {
        const clusterIndex = result.clusters[Math.floor(i / 4)];
        const centroid = centroids[clusterIndex];

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
      if (!file || file.type !== "image/png") {
        alert("PNG 파일만 업로드 가능합니다.");
        return;
      }

      const isValidSize = await validateImageSize({
        file,
        maxHeight: 96,
        maxWidth: 256,
      });

      if (!isValidSize) {
        alert("이미지 크기가 256x96 이하여야 합니다.");
        setPreviewSrc(null);
        return;
      }

      const arrayBuffer = await file.arrayBuffer();

      const blob = new Blob([arrayBuffer], { type: "image/png" });
      setPreviewSrc(URL.createObjectURL(blob));
    },
  );

  const saveCanvasAsPNG = useMemoizedFn(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("캔버스를 찾을 수 없습니다.");
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
          color: THEME.primary,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: THEME.primary, margin: "2rem 0" }}>
          그림대화 생성기
        </h1>
        <div
          style={{
            background: THEME.background,
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
                    border: `1px solid ${THEME.primary}`,
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
                    border: `1px solid ${THEME.primary}`,
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
                  border: `1px solid ${THEME.primary}`,
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
                  border: `1px solid ${THEME.primary}`,
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
                title="Upload Image"
                type="file"
              />
              <small style={{ color: THEME.textMuted }}>
                최대 256x96px, PNG 파일만 가능
              </small>
            </div>
            {previewSrc && (
              <button
                onClick={saveCanvasAsPNG}
                style={{
                  backgroundColor: THEME.primaryDark,
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
