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
import { DateTime } from "luxon";
import { kmeans } from "ml-kmeans";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export default function DrawingGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [authId, setAuthId] = useState("-1379962171");
  const [author, setAuthor] = useState("Eargasm");
  const [isUseColorWeight, setIsUseColorWeight] = useState<boolean>(false);
  const [colorWeight, setColorWeight] = useState<number>(0.2);
  const [selectedColor, setSelectedColor] = useState<string>("#F58D16");

  const authIdId = useId();
  const authorId = useId();
  const customNameId = useId();
  const colorWeightId = useId();
  const selectedColorId = useId();
  const imageUploadId = useId();

  const modifyWhitePixels = useCallback((ctx: CanvasRenderingContext2D) => {
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
  }, []);

  const reduceToFourColors = useCallback(
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

      const colors = [];
      for (let i = 0; i < data.length; i += 4) {
        colors.push([data[i], data[i + 1], data[i + 2]]);
      }

      const result = kmeans(colors, 4, {});
      const centroids = result.centroids.map((centroid) => ({
        b: centroid[2],
        g: centroid[1],
        r: centroid[0],
      }));

      // 가장 가까운 중심에 가중치를 부여하여 유저 색상과의 가중평균 계산
      if (isUseColorWeight) {
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
      }

      for (let i = 0; i < data.length; i += 4) {
        const clusterIndex = result.clusters[Math.floor(i / 4)];
        const centroid = centroids[clusterIndex];

        data[i] = centroid.r;
        data[i + 1] = centroid.g;
        data[i + 2] = centroid.b;
      }

      ctx.putImageData(imageData, 0, 0);
    },
    [isUseColorWeight, colorWeight],
  );

  useEffect(() => {
    if (previewSrc) {
      const img = new Image();
      img.src = previewSrc;
      img.addEventListener("load", () => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            modifyWhitePixels(ctx);
            reduceToFourColors(ctx, selectedColor);
          }
        }
      });
    }

    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc, selectedColor, modifyWhitePixels, reduceToFourColors]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  const saveCanvasAsPNG = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const formattedDate = DateTime.now().toFormat("yyyyMMdd_HHmmss");
      const name = `chat_${formattedDate}_${customName || "그림대화"}.png`;

      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
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
          };
          reader.readAsArrayBuffer(blob);
        }
      }, "image/png");
    }
  };

  return (
    <Layout>
      <div
        style={{
          alignItems: "center",
          color: "#f49f3f",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "#f49f3f", margin: "2rem 0" }}>그림대화 생성기</h1>
        <div
          style={{
            background: "#242526",
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
                <label htmlFor={authIdId}>고유아이디</label>
                <input
                  id={authIdId}
                  onChange={(e) => setAuthId(e.target.value)}
                  placeholder="AuthID"
                  style={{
                    border: "1px solid #f49f3f",
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
                <label htmlFor={authorId}>제작자</label>
                <input
                  id={authorId}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author"
                  style={{
                    border: "1px solid #f49f3f",
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
              <label htmlFor={customNameId}>구분할 파일명</label>
              <input
                id={customNameId}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Custom File Name"
                style={{
                  border: "1px solid #f49f3f",
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
                  <label htmlFor={colorWeightId}>가중치 설정 (0.2 ~ 0.5)</label>
                  <input
                    id={colorWeightId}
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
                  <label htmlFor={selectedColorId}>가중치 색상 선택</label>
                  <input
                    id={selectedColorId}
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
              <label htmlFor={imageUploadId}>이미지 추가 *</label>
              <input
                accept="image/png"
                id={imageUploadId}
                onChange={handleImageChange}
                style={{
                  border: "1px solid #f49f3f",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
                title="Upload Image"
                type="file"
              />
              <small style={{ color: "#7f8c8d" }}>
                최대 256x96px, PNG 파일만 가능
              </small>
            </div>
            {previewSrc && (
              <button
                onClick={saveCanvasAsPNG}
                style={{
                  backgroundColor: "#f28913",
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
