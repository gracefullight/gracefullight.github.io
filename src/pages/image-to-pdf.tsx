import Layout from "@theme/Layout";
import { PDFDocument } from "pdf-lib";
import { useRef, useState } from "react";

const A4_WIDTH_PT = 595;
const A4_HEIGHT_PT = 842;
const DPI = 300;
const A4_WIDTH_PX = Math.round((210 / 25.4) * DPI); // 2480
const A4_HEIGHT_PX = Math.round((297 / 25.4) * DPI); // 3508
const JPEG_QUALITY = 0.8;

type ImageFile = {
  file: File;
  url: string;
  name: string;
};

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [coverMode, setCoverMode] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  }

  async function handleCreatePDF() {
    const pdfDoc = await PDFDocument.create();

    for (const { file } of images) {
      const imgUrl = URL.createObjectURL(file);
      const img = await loadImage(imgUrl);
      const { width: imgW, height: imgH } = img;

      // 캔버스 해상도: 원본, A4 300dpi 중 작은 쪽
      const targetW = Math.min(A4_WIDTH_PX, imgW);
      const targetH = Math.min(A4_HEIGHT_PX, imgH);

      // cover/contain 계산 (targetW/targetH 기준)
      let drawW: number;
      let drawH: number;
      let offsetX: number;
      let offsetY: number;

      if (coverMode) {
        const ratio = Math.max(targetW / imgW, targetH / imgH);
        drawW = imgW * ratio;
        drawH = imgH * ratio;
        offsetX = (targetW - drawW) / 2;
        offsetY = (targetH - drawH) / 2;
      } else {
        const ratio = Math.min(targetW / imgW, targetH / imgH);
        drawW = imgW * ratio;
        drawH = imgH * ratio;
        offsetX = (targetW - drawW) / 2;
        offsetY = (targetH - drawH) / 2;
      }

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, targetW, targetH);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      const imgDataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
      const imgBytes = await fetch(imgDataUrl).then((res) => res.arrayBuffer());
      const pdfImage = await pdfDoc.embedJpg(imgBytes);

      // PDF는 pt 단위 (A4)
      const page = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
      page.drawImage(pdfImage, {
        height: A4_HEIGHT_PT,
        width: A4_WIDTH_PT,
        x: 0,
        y: 0,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  }

  function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  function handleReset() {
    setImages([]);
    setPdfUrl(undefined);
  }

  return (
    <Layout>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: no fix */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border: "1px solid #ccc",
          borderRadius: "1rem",
          margin: "0 auto",
          marginTop: "2rem",
          maxWidth: "40rem",
          minWidth: "32rem",
          padding: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem" }}>이미지 → PDF 변환기</h2>
        <input
          accept="image/*"
          multiple
          onChange={handleFileInput}
          ref={fileInputRef}
          style={{ display: "none" }}
          type="file"
        />
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button onClick={() => fileInputRef.current?.click()} type="button">
            이미지 선택
          </button>
          <button onClick={handleReset} type="button">
            전체 삭제
          </button>
        </div>
        <div
          style={{
            background: "#fafafa",
            border: "1px dashed #aaa",
            borderRadius: "0.5rem",
            margin: "1rem 0",
            minHeight: "4rem",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          {images.length === 0
            ? "여기로 이미지를 드래그 하세요!"
            : images.map((img) => (
                <img
                  alt={img.name}
                  key={img.url}
                  src={img.url}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "0.5rem",
                    margin: "0.5rem",
                  }}
                  width={80}
                />
              ))}
        </div>
        <div style={{ margin: "1rem 0" }}>
          <label>
            <input
              checked={coverMode}
              onChange={(e) => setCoverMode(e.target.checked)}
              style={{ marginRight: "0.5rem" }}
              type="checkbox"
            />
            이미지를 A4에 빈 공간 없이 채우기
          </label>
        </div>
        <button
          disabled={images.length === 0}
          onClick={handleCreatePDF}
          style={{
            background: "#3b82f6",
            border: "none",
            borderRadius: "0.5rem",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "1rem",
            padding: "0.625rem 1.25rem",
          }}
          type="button"
        >
          PDF 만들기
        </button>
        {pdfUrl && (
          <div style={{ marginTop: "1.5rem" }}>
            <a
              download="output.pdf"
              href={pdfUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              PDF 다운로드
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
