import type { Root } from "mdast";

import { randomUUID } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { Command } from "clipanion";
import { mkdir, readFile, readdir, rm, writeFile } from "fs-extra";
import pLimit from "p-limit";
import { chromium } from "playwright";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { parse as parseYaml } from "yaml";

// 병렬 작업 제한 설정
const limit = pLimit(15);

// dist 폴더 및 하위 폴더 경로
const DIST_DIR = resolve(__dirname, "..", "dist");
const TEMP_DIR = join(DIST_DIR, "temp");
const PDF_DIR = join(DIST_DIR, "pdf");

// 머메이드 차트를 SVG로 변환하는 함수
async function renderMermaidToSvg(mermaidCode: string): Promise<string> {
  const uniqueId = randomUUID();
  const inputPath = join(TEMP_DIR, `temp-${uniqueId}.mmd`);
  const outputPath = join(TEMP_DIR, `output-${uniqueId}.svg`);

  await writeFile(inputPath, mermaidCode);

  const { run } = await import("@mermaid-js/mermaid-cli");
  await run(inputPath, outputPath as `${string}.svg`);

  const svg = await readFile(outputPath, "utf8");
  return svg;
}

// 이미지를 Base64로 인코딩하는 함수
function imageToBase64(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(filePath)
      .then((buffer) => {
        const mimeType = getMimeType(filePath);
        const base64 = buffer.toString("base64");
        resolve(`data:${mimeType};base64,${base64}`);
      })
      .catch(reject);
  });
}

// 파일 확장자로부터 MIME 타입 추출
function getMimeType(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "webp":
      return "image/webp";
    default:
      throw new Error(`Unsupported image format: ${ext}`);
  }
}

export class PdfCommand extends Command {
  static readonly paths = [["pdf"]];

  async execute() {
    const baseDir = resolve(__dirname, "..", "blog", "pe");
    this.context.stdout.write(`Processing Markdown files in ${baseDir}\n`);

    try {
      // dist 폴더 및 하위 폴더 생성
      await mkdir(DIST_DIR, { recursive: true });
      await mkdir(TEMP_DIR, { recursive: true });
      await mkdir(PDF_DIR, { recursive: true });

      // blog/pe/* 폴더 목록 가져오기
      const folders = await readdir(baseDir, { withFileTypes: true });
      const folderNames = folders
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      for (const folderName of folderNames) {
        const folderPath = resolve(baseDir, folderName);

        // Markdown 파일 목록 가져오기
        const files = await readdir(folderPath);
        const mdFiles = files.filter((file) => file.endsWith(".md"));

        if (mdFiles.length === 0) {
          this.context.stdout.write(
            `No Markdown files found in ${folderPath}\n`,
          );
          continue;
        }

        // Markdown 파일들을 병렬로 처리하여 HTML로 변환
        const htmlPages = await Promise.all(
          mdFiles.map((mdFile) =>
            limit(() => this.convertMarkdownToHtml(folderPath, mdFile)),
          ),
        );

        // 모든 HTML 페이지를 하나로 합치기
        const combinedHtml = `
          <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Markdown to PDF</title>
              <style>
                /* 글꼴 크기 및 스타일 조정 */
                body {
                  font-family: Arial, sans-serif;
                  font-size: 16px; /* 기본 글꼴 크기 줄임 */
                  line-height: 1.5;
                  padding: 20px;
                }
                h1, h2, h3, h4, h5, h6 {
                  margin-top: 0.5em;
                  margin-bottom: 0.5em;
                  font-weight: bold;
                }
                h1 { font-size: 1.6em; border-bottom: 1px solid #c8c8c8; padding-bottom: 3px; } /* 제목 크기 조정 */
                h2 { font-size: 1.4em; border-bottom: 1px solid #d8d8d8; padding-bottom: 2px; }
                h3 { font-size: 1.2em; border-bottom: 1px solid #dfdfdf; padding-bottom: 2px; }
                h4 { font-size: 1.1em; }
                h5 { font-size: 1em; }
                h6 { font-size: 1em; }
                img {
                  max-width: 100%;
                  height: auto;
                }
                pre {
                  background-color: #f4f4f4;
                  padding: 10px;
                  border-radius: 5px;
                  font-size: 12px; /* 코드 블록 글꼴 크기 줄임 */
                  overflow-x: auto;
                }
                code {
                  font-size: 12px; /* 인라인 코드 글꼴 크기 줄임 */
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                  font-size: 1em;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 6px; /* 셀 패딩 줄임 */
                  text-align: left;
                }
                th {
                  background-color: #f4f4f4;
                }
                .markdown-page {
                  page-break-after: always;
                }
                .markdown-page:last-child {
                  page-break-after: auto;
                }
                .centered-content {
                  display: block; /* 블록 레벨 요소로 설정 */
                  margin: 0 auto; /* 가운데 정렬 */
                  width: 90%; /* 너비를 90%로 축소 */
                  height: auto; /* 비율 유지 */
                }
              </style>
            </head>
            <body>${htmlPages.join("")}</body>
            </html>
        `;

        // PDF 파일 경로 설정
        const pdfOutputPath = join(PDF_DIR, `pe-${folderName}.pdf`);
        await this.convertHtmlToPdf(combinedHtml, pdfOutputPath);

        this.context.stdout.write(`Generated PDF: ${pdfOutputPath}\n`);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.context.stderr.write(`Error: ${error.message}\n`);
      }
    } finally {
      // dist/temp 폴더 삭제
      await rm(TEMP_DIR, { recursive: true, force: true }).catch(() => {});
    }
  }

  /**
   * 단일 Markdown 파일을 HTML로 변환
   */
  private async convertMarkdownToHtml(
    folderPath: string,
    mdFile: string,
  ): Promise<string> {
    const filePath = resolve(folderPath, mdFile);
    const markdownContent = await readFile(filePath, "utf8");

    // Frontmatter 데이터 저장용 변수
    let frontmatter: Record<string, unknown> = {};

    // 머메이드 코드 추출
    const mermaidMatches = Array.from(
      markdownContent.matchAll(/```mermaid\s*([\s\S]*?)\s*```/g),
    );

    // 플레이스홀더와 SVG 매핑을 위한 Map
    const placeholderMap = new Map<string, string>();

    // 머메이드 코드를 임시 플레이스홀더로 대체
    let processedMarkdown = markdownContent;
    for (const [_, code] of mermaidMatches) {
      const trimmedCode = code.trim();
      const placeholder = `[[MERMAID_PLACEHOLDER_${randomUUID()}]]`;
      placeholderMap.set(placeholder, trimmedCode); // 플레이스홀더와 코드 매핑
      processedMarkdown = processedMarkdown.replace(
        `\`\`\`mermaid\n${trimmedCode}\n\`\`\``,
        placeholder,
      );
    }

    // Remark를 사용하여 Markdown을 HTML로 변환
    const result = await unified()
      .use(remarkParse) // Markdown 파싱
      .use(remarkFrontmatter, ["yaml"]) // Frontmatter 파싱
      .use(() => (tree: Root) => {
        const frontmatterNode = tree.children.find(
          (node) => node.type === "yaml",
        );
        if (frontmatterNode) {
          frontmatter = parseYaml(frontmatterNode.value);
          tree.children = tree.children.filter((node) => node.type !== "yaml");
        }
      })
      .use(remarkGfm) // GFM 표 지원
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeKatex)
      .use(rehypeStringify)
      .process(processedMarkdown);

    // Title 설정
    const title = frontmatter?.title || "Untitled"; // title 필드가 없으면 기본값 사용
    const html = String(result);

    // HTML 내부의 이미지 경로를 Base64로 변환
    const processedHtml = await this.processImagesInHtml(
      html,
      dirname(filePath),
    );

    // 플레이스홀더를 SVG로 치환
    let finalHtml = processedHtml;
    for (const [placeholder, code] of placeholderMap.entries()) {
      const svg = await renderMermaidToSvg(code);
      finalHtml = finalHtml.replace(
        placeholder,
        `<div class="centered-content">${svg}</div>`,
      );
    }

    // 각 Markdown 파일의 내용을 새 페이지로 분리
    return `<div class="markdown-page"><h1>${title}</h1>\n${finalHtml}</div>`;
  }

  /**
   * HTML 내부의 이미지 경로를 Base64로 변환
   */
  private async processImagesInHtml(
    html: string,
    basePath: string,
  ): Promise<string> {
    // HTML 내부의 <img> 태그를 찾아 src 속성을 추출
    const matches = Array.from(html.matchAll(/<img[^>]+src="([^">]+)"/g));
    const replacements = await Promise.all(
      matches.map(async ([_, src]) => {
        const imagePath = resolve(basePath, src);
        try {
          const base64 = await imageToBase64(imagePath);
          return [`src="${src}"`, `src="${base64}"`];
        } catch (error) {
          if (error instanceof Error)
            console.warn(`Failed to load image: ${imagePath}`, error.message);
          return [`src="${src}"`, `src="[Image not found]"`];
        }
      }),
    );

    // HTML 내부의 이미지 태그를 Base64로 치환
    let processedHtml = html;
    for (const [original, replacement] of replacements) {
      // 이미지 태그에 클래스 추가
      processedHtml = processedHtml.replace(
        original,
        `class="centered-content" ${replacement}`,
      );
    }
    return processedHtml;
  }

  /**
   * HTML을 PDF로 변환 (Playwright 사용)
   */
  private async convertHtmlToPdf(
    htmlContent: string,
    outputPath: string,
  ): Promise<void> {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // HTML 내용 로드
    await page.setContent(htmlContent, { waitUntil: "networkidle" });

    // PDF로 저장 (여백 추가)
    await page.pdf({
      path: outputPath,
      format: "A4",
      footerTemplate: "pageNumber",
      printBackground: true,
      margin: {
        top: "5mm", // 상단 여백
        bottom: "5mm", // 하단 여백
        left: "5mm", // 좌측 여백
        right: "5mm", // 우측 여백
      },
    });

    await browser.close();
  }
}
