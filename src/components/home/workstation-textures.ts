import type { ModelContext } from "./scene-primitives";

import * as THREE from "three";

export type KeyLegend = { label: string; x: number; z: number };

export function createWorkstationTextures(context: ModelContext) {
  function canvasTexture(
    width: number,
    height: number,
    draw: (canvas: CanvasRenderingContext2D) => void,
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const drawing = canvas.getContext("2d");
    if (drawing) draw(drawing);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    context.textures.add(texture);
    return texture;
  }

  function editor() {
    return canvasTexture(1280, 720, (drawing) => {
      drawing.fillStyle = "#171e24";
      drawing.fillRect(0, 0, 1280, 720);
      drawing.fillStyle = "#26313a";
      drawing.fillRect(0, 0, 1280, 38);
      for (const [index, color] of [
        "#e68479",
        "#dfbf78",
        "#87b99a",
      ].entries()) {
        drawing.beginPath();
        drawing.fillStyle = color;
        drawing.arc(22 + index * 22, 19, 6, 0, Math.PI * 2);
        drawing.fill();
      }
      drawing.font = "16px monospace";
      drawing.fillStyle = "#b9c8cb";
      drawing.fillText("first-fluke / legal-research", 482, 25);
      drawing.fillStyle = "#202930";
      drawing.fillRect(0, 38, 213, 652);
      drawing.font = "15px monospace";
      drawing.fillStyle = "#758c99";
      drawing.fillText("EXPLORER", 23, 72);
      const files = [
        "⌄ legal-research",
        "  ⌄ app",
        "    retrieval.py",
        "    main.py",
        "    rerank.py",
        "  ⌄ tests",
        "    test_answer.py",
        "  README.md",
        "  pyproject.toml",
      ];
      for (const [index, file] of files.entries()) {
        drawing.fillStyle = index === 3 ? "#91c9b1" : "#9aabb5";
        drawing.fillText(file, 19, 111 + index * 31);
      }
      drawing.fillStyle = "#303d46";
      drawing.fillRect(213, 38, 202, 42);
      drawing.fillStyle = "#a8d1ba";
      drawing.fillRect(213, 77, 202, 2);
      drawing.font = "17px monospace";
      drawing.fillText("main.py      ×", 236, 65);
      const lines = [
        ["# Retrieve, ground, answer.", "#728d88"],
        ["from fastapi import FastAPI", "#b7a3ce"],
        ["from app.retrieval import HybridRetriever", "#b7a3ce"],
        ["", "#ffffff"],
        ["app = FastAPI()", "#c9d4d8"],
        ['retriever = HybridRetriever(index="statutes")', "#c9d4d8"],
        ["", "#ffffff"],
        ['@app.post("/answer")', "#d4bb81"],
        ["async def answer(question: Question):", "#a3c7b1"],
        ["    passages = await retriever.search(question)", "#c9d4d8"],
        ["    context = rerank(question, passages)", "#c9d4d8"],
        ["    draft = await llm.generate(question, context)", "#c9d4d8"],
        ["    return cite(draft, passages)", "#d4bb81"],
      ];
      drawing.font = "19px monospace";
      for (const [index, [line, color]] of lines.entries()) {
        const y = 116 + index * 29;
        drawing.fillStyle = "#50616d";
        drawing.fillText(String(index + 1).padStart(2, " "), 235, y);
        drawing.fillStyle = color;
        drawing.fillText(line, 286, y);
      }
      drawing.fillStyle = "#34444c";
      drawing.fillRect(213, 542, 1067, 1);
      drawing.font = "15px monospace";
      drawing.fillStyle = "#879ca7";
      drawing.fillText("TERMINAL     OUTPUT     PROBLEMS", 237, 569);
      drawing.fillStyle = "#a3c7b1";
      drawing.fillText("❯ uv run pytest", 237, 607);
      drawing.fillStyle = "#91a5af";
      drawing.fillText(
        "  collected 24 items · retrieval, rerank, answer",
        237,
        636,
      );
      drawing.fillStyle = "#a8d1ba";
      drawing.fillText("  [████████████████████]  24 passed", 237, 665);
      drawing.fillStyle = "#3d6659";
      drawing.fillRect(0, 690, 1280, 30);
      drawing.fillStyle = "#d6e4df";
      drawing.font = "14px monospace";
      drawing.fillText("⑂ main    ✓ 0   ◇ 0", 19, 710);
      drawing.fillText("UTF-8     Python 3.13     Ln 13, Col 32", 902, 710);
    });
  }

  function legends(keys: KeyLegend[]) {
    return canvasTexture(1536, 640, (drawing) => {
      drawing.fillStyle = "#626b70";
      drawing.textAlign = "center";
      drawing.textBaseline = "middle";
      for (const { label, x, z } of keys) {
        drawing.font = `${label.length > 2 ? 17 : 23}px sans-serif`;
        drawing.fillText(
          label,
          ((x + 0.325) / 0.65) * 1536,
          ((z + 0.1225) / 0.245) * 640,
        );
      }
    });
  }

  function heightDisplay() {
    return canvasTexture(256, 80, (drawing) => {
      drawing.fillStyle = "#18282b";
      drawing.fillRect(0, 0, 256, 80);
      drawing.fillStyle = "#abd7d1";
      drawing.font = "56px monospace";
      drawing.textAlign = "center";
      drawing.fillText("112.5", 128, 61);
    });
  }

  return { editor, heightDisplay, legends };
}
