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
      drawing.fillText("research / embodied-agent", 492, 25);
      drawing.fillStyle = "#202930";
      drawing.fillRect(0, 38, 213, 652);
      drawing.font = "15px monospace";
      drawing.fillStyle = "#758c99";
      drawing.fillText("EXPLORER", 23, 72);
      const files = [
        "⌄ embodied-agent",
        "  ⌄ src",
        "    perception.py",
        "    agent.py",
        "    memory.py",
        "  ⌄ experiments",
        "    evaluate.py",
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
      drawing.fillText("agent.py     ×", 236, 65);
      const lines = [
        ["# Perceive, reason, act.", "#728d88"],
        ["from dataclasses import dataclass", "#b7a3ce"],
        ["from perception import observe", "#b7a3ce"],
        ["", "#ffffff"],
        ["@dataclass", "#d4bb81"],
        ["class EmbodiedAgent:", "#a7c6da"],
        ["    memory: EpisodicMemory", "#c9d4d8"],
        ["    policy: WorldModel", "#c9d4d8"],
        ["", "#ffffff"],
        ["    def step(self, observation):", "#a3c7b1"],
        ["        state = observe(observation)", "#c9d4d8"],
        ["        context = self.memory.retrieve(state)", "#c9d4d8"],
        ["        plan = self.policy.reason(state, context)", "#c9d4d8"],
        ["        return plan.next_action()", "#d4bb81"],
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
      drawing.fillText("❯ python -m experiments.evaluate", 237, 607);
      drawing.fillStyle = "#91a5af";
      drawing.fillText("  loading world model · 128 episodes", 237, 636);
      drawing.fillStyle = "#a8d1ba";
      drawing.fillText(
        "  [████████████████████]  evaluation complete",
        237,
        665,
      );
      drawing.fillStyle = "#3d6659";
      drawing.fillRect(0, 690, 1280, 30);
      drawing.fillStyle = "#d6e4df";
      drawing.font = "14px monospace";
      drawing.fillText("⑂ main    ✓ 0   ◇ 0", 19, 710);
      drawing.fillText("UTF-8     Python 3.13     Ln 14, Col 34", 902, 710);
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
