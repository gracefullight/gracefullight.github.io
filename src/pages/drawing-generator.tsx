import type {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import {
  addMetadataChunks,
  buildColorMapFromImageData,
  buildColorToCentroidMap,
  downloadImage,
  getUniqueColorsFromMap,
  parseHexToColor,
  removeTEXtChunks,
} from "@site/src/utils";
import Layout from "@theme/Layout";
import { useEventListener, useMemoizedFn, useSize } from "ahooks";
import { DateTime } from "luxon";
import { kmeans } from "ml-kmeans";
import { useEffect, useId, useRef, useState } from "react";
import { z } from "zod";

const DEFAULT_COLOR = "#F58D16" as const;
const TARGET_WIDTH = 256 as const;
const TARGET_HEIGHT = 96 as const;

// Zod Schemas
const hexColorSchema = z
  .string()
  .regex(/^#([0-9a-fA-F]{6})$/, "6자리 HEX 색상이어야 합니다.");

const formSchema = z.object({
  authId: z.string().regex(/^-?\d+$/, "숫자 문자열이어야 합니다."),
  author: z.string().min(1, "제작자를 입력하세요.").max(50),
  colorWeight: z.number().min(0.2).max(2.0),
  customName: z.string().max(100).optional().or(z.literal("")),
  isUseColorWeight: z.boolean(),
  selectedColor: hexColorSchema,
});

const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.type === "image/png", "PNG 파일만 업로드 가능합니다.");

export default function DrawingGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [imgNaturalSize, setImgNaturalSize] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  // kept in ref for move calculations
  const [cropPos, setCropPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cropPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cropInitRef = useRef<boolean>(false);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const lastUrlRef = useRef<string | null>(null);
  const containerRectRef = useRef<DOMRect | null>(null);
  const [customName, setCustomName] = useState<string>("");
  const [authId, setAuthId] = useState("-1379962171");
  const [author, setAuthor] = useState("Eargasm");
  const [isUseColorWeight, setIsUseColorWeight] = useState<boolean>(false);
  const [colorWeight, setColorWeight] = useState<number>(0.2);
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);

  const formId = useId();

  const tryFastPathIfFewColors = useMemoizedFn(
    (
      ctx: CanvasRenderingContext2D,
      imageData: ImageData,
      colorMap: Map<string, number>,
    ): boolean => {
      if (colorMap.size > 4) return false;

      const { data } = imageData;
      const uniqueColors = Array.from(colorMap.keys()).map((key) => {
        const [r, g, b] = key.split(",").map(Number);
        return { b, g, r };
      });

      const first = uniqueColors[0];
      for (let i = 0; i < data.length; i += 4) {
        data[i] = first.r;
        data[i + 1] = first.g;
        data[i + 2] = first.b;
      }

      ctx.putImageData(imageData, 0, 0);
      return true;
    },
  );

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
        // Stronger weighting: quadratic + offset
        const influenceCount = Math.max(
          1,
          Math.round(uniqueColors.length * colorWeight ** 2 + 10 * colorWeight),
        );
        for (let i = 0; i < influenceCount; i++) {
          colors.push([userColor.r, userColor.g, userColor.b]);
        }
      }

      // Use k-means++ initialization for better consistency
      const result = kmeans(colors, 4, {
        initialization: "kmeans++",
        seed: 42,
      });
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

  // Track displayed image size to compute crop scale
  const _imgSize = useSize(previewImgRef);
  const displaySize = _imgSize
    ? { h: _imgSize.height, w: _imgSize.width }
    : null;

  const needsCrop =
    !!imgNaturalSize &&
    !(imgNaturalSize.w === TARGET_WIDTH && imgNaturalSize.h === TARGET_HEIGHT);

  // Initialize crop position centered when sizes known
  useEffect(() => {
    if (!needsCrop) return;
    if (!displaySize) return;
    if (cropInitRef.current) return;
    const scale = imgNaturalSize ? displaySize.w / imgNaturalSize.w : 1;
    const cropW = TARGET_WIDTH * scale;
    const cropH = TARGET_HEIGHT * scale;
    const pos = {
      x: Math.max(0, (displaySize.w - cropW) / 2),
      y: Math.max(0, (displaySize.h - cropH) / 2),
    };
    // Avoid update loops by only setting when position actually changes
    const dx = Math.abs((cropPosRef.current?.x ?? -1) - pos.x);
    const dy = Math.abs((cropPosRef.current?.y ?? -1) - pos.y);
    if (dx > 0.5 || dy > 0.5) {
      cropPosRef.current = pos;
      setCropPos(pos);
      cropInitRef.current = true;
    }
  }, [needsCrop, displaySize, imgNaturalSize]);

  // Keep ref in sync with state for move calculations
  useEffect(() => {
    cropPosRef.current = cropPos;
  }, [cropPos]);

  const processSelection = useMemoizedFn(() => {
    const img = loadedImageRef.current;
    if (!img) return;
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("캔버스를 찾을 수 없습니다.");
      return;
    }

    // If exact size, process whole image
    if (!needsCrop) {
      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(
        img,
        0,
        0,
        TARGET_WIDTH,
        TARGET_HEIGHT,
        0,
        0,
        TARGET_WIDTH,
        TARGET_HEIGHT,
      );
      modifyWhitePixels(ctx);
      reduceToFourColors(ctx, selectedColor);
      setIsProcessed(true);
      return;
    }

    if (!displaySize) return;
    if (!imgNaturalSize) return;
    const scale = displaySize.w / imgNaturalSize.w;
    const sx = Math.round(cropPos.x / scale);
    const sy = Math.round(cropPos.y / scale);

    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
    ctx.drawImage(
      img,
      sx,
      sy,
      TARGET_WIDTH,
      TARGET_HEIGHT,
      0,
      0,
      TARGET_WIDTH,
      TARGET_HEIGHT,
    );
    modifyWhitePixels(ctx);
    reduceToFourColors(ctx, selectedColor);
    setIsProcessed(true);
  });

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
        const url = URL.createObjectURL(blob);
        // Revoke previous URL if exists
        if (lastUrlRef.current) URL.revokeObjectURL(lastUrlRef.current);
        lastUrlRef.current = url;

        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (img.width < TARGET_WIDTH || img.height < TARGET_HEIGHT) {
            alert(
              `이미지의 최소 크기는 ${TARGET_WIDTH}x${TARGET_HEIGHT} 입니다. 더 큰 이미지를 선택하세요.`,
            );
            URL.revokeObjectURL(url);
            lastUrlRef.current = null;
            setPreviewSrc(null);
            setImgNaturalSize(null);
            loadedImageRef.current = null;
            return;
          }
          loadedImageRef.current = img;
          cropInitRef.current = false;
          setImgNaturalSize({ h: img.height, w: img.width });
          setPreviewSrc(url);
          setIsProcessed(false);
          if (img.width === TARGET_WIDTH && img.height === TARGET_HEIGHT) {
            // Auto process when exact size
            requestAnimationFrame(() => {
              processSelection();
            });
          }
        };
        img.onerror = () => {
          alert("이미지 로드에 실패했습니다.");
          URL.revokeObjectURL(url);
          lastUrlRef.current = null;
          setPreviewSrc(null);
        };
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

  useEffect(() => {
    return () => {
      if (lastUrlRef.current) URL.revokeObjectURL(lastUrlRef.current);
    };
  }, []);

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

  const onCropMouseDown = useMemoizedFn((e: ReactMouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!displaySize) return;
    if (!imgNaturalSize) return;
    const rect = (
      previewWrapRef.current as HTMLDivElement
    ).getBoundingClientRect();
    containerRectRef.current = rect;
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    const offset = {
      x: startX - cropPosRef.current.x,
      y: startY - cropPosRef.current.y,
    };
    dragOffsetRef.current = offset;
    isDraggingRef.current = true;
    setIsDragging(true);
  });

  const onCropPointerDown = useMemoizedFn(
    (e: ReactPointerEvent<HTMLElement>) => {
      e.preventDefault();
      if (!displaySize) return;
      if (!imgNaturalSize) return;
      const rect = (
        previewWrapRef.current as HTMLDivElement
      ).getBoundingClientRect();
      containerRectRef.current = rect;
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;
      const offset = {
        x: startX - cropPosRef.current.x,
        y: startY - cropPosRef.current.y,
      };
      dragOffsetRef.current = offset;
      isDraggingRef.current = true;
      setIsDragging(true);
    },
  );

  // Drag handling via ahooks
  useEventListener("mousemove", (me: MouseEvent) => {
    if (!isDraggingRef.current) return;
    if (!displaySize) return;
    if (!imgNaturalSize) return;
    const rect = containerRectRef.current;
    if (!rect) return;
    const scale = displaySize.w / imgNaturalSize.w;
    const cropW = TARGET_WIDTH * scale;
    const cropH = TARGET_HEIGHT * scale;
    const nx = me.clientX - rect.left - dragOffsetRef.current.x;
    const ny = me.clientY - rect.top - dragOffsetRef.current.y;
    const clampedX = Math.min(
      Math.max(0, nx),
      Math.max(0, displaySize.w - cropW),
    );
    const clampedY = Math.min(
      Math.max(0, ny),
      Math.max(0, displaySize.h - cropH),
    );
    if (
      clampedX !== cropPosRef.current.x ||
      clampedY !== cropPosRef.current.y
    ) {
      const newPos = { x: clampedX, y: clampedY };
      cropPosRef.current = newPos;
      setCropPos(newPos);
    }
  });

  useEventListener("mouseup", () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    // 드래그 종료 시 자동으로 미리보기 처리
    if (needsCrop && loadedImageRef.current) {
      processSelection();
    }
  });

  // Pointer events for broader device support (touch/pen)
  useEventListener("pointermove", (pe: PointerEvent) => {
    if (!isDraggingRef.current) return;
    if (!displaySize) return;
    if (!imgNaturalSize) return;
    const rect = containerRectRef.current;
    if (!rect) return;
    const scale = displaySize.w / imgNaturalSize.w;
    const cropW = TARGET_WIDTH * scale;
    const cropH = TARGET_HEIGHT * scale;
    const nx = pe.clientX - rect.left - dragOffsetRef.current.x;
    const ny = pe.clientY - rect.top - dragOffsetRef.current.y;
    const clampedX = Math.min(
      Math.max(0, nx),
      Math.max(0, displaySize.w - cropW),
    );
    const clampedY = Math.min(
      Math.max(0, ny),
      Math.max(0, displaySize.h - cropH),
    );
    if (
      clampedX !== cropPosRef.current.x ||
      clampedY !== cropPosRef.current.y
    ) {
      const newPos = { x: clampedX, y: clampedY };
      cropPosRef.current = newPos;
      setCropPos(newPos);
    }
  });

  useEventListener("pointerup", () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    // 드래그 종료 시 자동으로 미리보기 처리
    if (needsCrop && loadedImageRef.current) {
      processSelection();
    }
  });

  // Re-process if user changes selectedColor after processing
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-process only by selectedColor
  useEffect(() => {
    if (!isProcessed) return;
    // Re-run processing with the same selection
    processSelection();
  }, [selectedColor]);

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
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* 왼쪽: 컨트롤 패널 */}
          <div
            style={{
              background: "var(--ifm-background-color)",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              minWidth: "320px",
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
                      가중치 설정 (0.2 ~ 2.0)
                    </label>
                    <input
                      id={`${formId}-color-weight`}
                      max="2.0"
                      min="0.2"
                      onChange={(e) =>
                        setColorWeight(Number.parseFloat(e.target.value))
                      }
                      step="0.01"
                      title="가중치 설정"
                      type="range"
                      value={colorWeight}
                    />
                    <small style={{ color: "var(--ifm-color-emphasis-600)" }}>
                      값이 높을수록 선택한 색상이 더 강하게 반영됩니다.
                    </small>
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
                  PNG만 가능. 최소 {TARGET_WIDTH}×{TARGET_HEIGHT}px. 다른 크기면
                  영역을 선택해 크롭하세요.
                  <br />
                  색상 가중치가 높을수록 선택한 색상이 결과에 더 강하게
                  반영됩니다.
                </small>
              </div>
              {previewSrc && isProcessed && (
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
          {/* 오른쪽: 미리보기 패널 */}
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flex: 1,
              flexDirection: "column",
              maxWidth: "700px",
              minWidth: "320px",
              textAlign: "center",
            }}
          >
            <h3>미리보기</h3>
            {previewSrc ? (
              <>
                {needsCrop ? (
                  <div
                    ref={previewWrapRef}
                    style={{
                      border: "1px solid var(--ifm-color-emphasis-300)",
                      maxWidth: "min(800px, 100%)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      alt="업로드 미리보기"
                      ref={previewImgRef}
                      src={previewSrc ?? undefined}
                      style={{
                        display: "block",
                        height: "auto",
                        width: "100%",
                      }}
                    />
                    {/* Darken overlay */}
                    {displaySize && imgNaturalSize && (
                      <div
                        style={{
                          boxSizing: "border-box",
                          height: displaySize.h,
                          left: 0,
                          position: "absolute",
                          top: 0,
                          width: displaySize.w,
                        }}
                      >
                        {/* Crop window */}
                        <button
                          onMouseDown={onCropMouseDown}
                          onPointerDown={onCropPointerDown}
                          style={{
                            all: "unset",
                            background: "transparent",
                            border: "2px solid #F58D16",
                            boxShadow: "0 0 0 100vmax rgba(0,0,0,0.35)",
                            cursor: isDragging ? "grabbing" : "grab",
                            height: `${(displaySize.w / imgNaturalSize.w) * TARGET_HEIGHT}px`,
                            left: `${cropPos.x}px`,
                            position: "absolute",
                            top: `${cropPos.y}px`,
                            userSelect: "none",
                            width: `${(displaySize.w / imgNaturalSize.w) * TARGET_WIDTH}px`,
                            zIndex: 1,
                          }}
                          type="button"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ marginBottom: "1rem" }}>
                    <em style={{ color: "var(--ifm-color-emphasis-700)" }}>
                      이미지 크기가 {TARGET_WIDTH}×{TARGET_HEIGHT}이므로 바로
                      처리됩니다.
                    </em>
                  </div>
                )}

                {!needsCrop && previewSrc && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <button
                      onClick={processSelection}
                      style={{
                        backgroundColor: "var(--ifm-color-primary)",
                        borderRadius: "0.25rem",
                        color: "white",
                        cursor: "pointer",
                        padding: "0.5rem 0.75rem",
                      }}
                      type="button"
                    >
                      이미지 처리
                    </button>
                  </div>
                )}

                <div style={{ marginTop: "1rem" }}>
                  <canvas ref={canvasRef} />
                </div>
              </>
            ) : (
              <div
                style={{
                  border: "2px dashed var(--ifm-color-emphasis-300)",
                  borderRadius: "0.5rem",
                  color: "var(--ifm-color-emphasis-600)",
                  marginTop: "1rem",
                  padding: "3rem 2rem",
                }}
              >
                <p>이미지를 업로드하면 여기에 미리보기가 표시됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
