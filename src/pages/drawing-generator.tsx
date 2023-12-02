import {
  addMetadataChunks,
  downloadImage,
  removeTEXtChunks,
  validateImageSize,
} from "@site/src/utils";
import Layout from "@theme/Layout";
import { DateTime } from "luxon";
import { kmeans } from "ml-kmeans";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

export default function DrawingGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [authId, setAuthId] = useState("-1379962171");
  const [author, setAuthor] = useState("Eargasm");
  const [isUseColorWeight, setIsUseColorWeight] = useState<boolean>(false);
  const [colorWeight, setColorWeight] = useState<number>(0.2);
  const [selectedColor, setSelectedColor] = useState<string>("#F58D16");

  useEffect(() => {
    if (previewSrc) {
      const img = new Image();
      img.src = previewSrc;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          modifyWhitePixels(ctx);
          reduceToFourColors(ctx, selectedColor);
        }
      };
    }

    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  const modifyWhitePixels = (ctx: CanvasRenderingContext2D) => {
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
  };

  const reduceToFourColors = (
    ctx: CanvasRenderingContext2D,
    userHexColor: string,
  ) => {
    const userColor = {
      r: parseInt(userHexColor.slice(1, 3), 16),
      g: parseInt(userHexColor.slice(3, 5), 16),
      b: parseInt(userHexColor.slice(5, 7), 16),
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
      r: centroid[0],
      g: centroid[1],
      b: centroid[2],
    }));

    // 가장 가까운 중심에 가중치를 부여하여 유저 색상과의 가중평균 계산
    if (isUseColorWeight) {
      let closestCentroidIndex = 0;
      let minDistance = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < centroids.length; i++) {
        const centroid = centroids[i];
        const distance = Math.sqrt(
          Math.pow(userColor.r - centroid.r, 2) +
            Math.pow(userColor.g - centroid.g, 2) +
            Math.pow(userColor.b - centroid.b, 2),
        );

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
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file || file.type !== "image/png") {
      alert("PNG 파일만 업로드 가능합니다.");
      return;
    }

    const isValidSize = await validateImageSize({
      file,
      maxWidth: 256,
      maxHeight: 96,
    });

    if (!isValidSize) {
      alert("이미지 크기가 256x96 이하여야 합니다.");
      setPreviewSrc(null);
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const cleanedBuffer = removeTEXtChunks(arrayBuffer);
    const bufferWithMetadata = addMetadataChunks(cleanedBuffer, authId, author);

    const blob = new Blob([bufferWithMetadata], { type: "image/png" });
    setPreviewSrc(URL.createObjectURL(blob));
  };

  const saveCanvasAsWebP = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const formattedDate = DateTime.now().toFormat("yyyyMMdd_HHmmss");
      const name = `chat_${formattedDate}_${customName || "그림대화"}.png`;
      const href = canvas.toDataURL("image/png");

      downloadImage({
        href,
        name,
      });
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#f49f3f",
        }}
      >
        <h1 style={{ margin: "2rem 0", color: "#f49f3f" }}>그림대화 생성기</h1>
        <div
          style={{
            width: "400px",
            background: "#242526",
            padding: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <label>고유아이디</label>
                <input
                  type="text"
                  value={authId}
                  onChange={(e) => setAuthId(e.target.value)}
                  placeholder="AuthID"
                  style={{
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #f49f3f",
                  }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <label>제작자</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author"
                  style={{
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #f49f3f",
                  }}
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
              <label>구분할 파일명</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Custom File Name"
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #f49f3f",
                }}
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
                  type="checkbox"
                  checked={isUseColorWeight}
                  onChange={(e) => setIsUseColorWeight(e.target.checked)}
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
                  <label>가중치 설정 (0.2 ~ 0.5)</label>
                  <input
                    type="range"
                    min="0.2"
                    max="0.5"
                    step="0.01"
                    value={colorWeight}
                    onChange={(e) => setColorWeight(parseFloat(e.target.value))}
                    title="가중치 설정"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                  }}
                >
                  <label>가중치 색상 선택</label>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    title="가중치 색상"
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
              <label>이미지 추가 *</label>
              <input
                type="file"
                accept="image/png"
                onChange={handleImageChange}
                title="Upload Image"
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #f49f3f",
                  cursor: "pointer",
                }}
              />
              <small style={{ color: "#7f8c8d" }}>
                최대 256x96px, PNG 파일만 가능
              </small>
            </div>
            {previewSrc && (
              <button
                type="button"
                onClick={saveCanvasAsWebP}
                style={{
                  backgroundColor: "#f28913",
                  color: "white",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                이미지 다운로드
              </button>
            )}
          </form>
        </div>
        {previewSrc && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            <h3>미리보기</h3>
            <canvas ref={canvasRef}></canvas>
          </div>
        )}
      </div>
    </Layout>
  );
}
