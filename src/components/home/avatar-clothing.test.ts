import * as THREE from "three";
import { expect, it } from "vitest";
import { createClothingModel } from "./avatar-clothing";
import { createScenePrimitives } from "./scene-primitives";

it("keeps the sculpted denim closed around the knees and ankles", () => {
  const context = createScenePrimitives();
  try {
    createClothingModel(context).buildLegs(new THREE.Group());
    const jeans = context.geometries.get("continuous-jeans");
    expect(jeans).toBeDefined();
    if (!jeans?.index) throw new Error("Expected indexed denim geometry");
    const position = jeans.getAttribute("position");
    const normal = jeans.getAttribute("normal");
    const indices = jeans.index;
    const edges = new Map<
      string,
      { from: number; to: number; count: number }
    >();
    const surfaceNormal = new THREE.Vector3();
    let inspectedVertices = 0;

    for (let vertex = 0; vertex < position.count; vertex += 1) {
      const y = position.getY(vertex);
      if (y <= 0.24 || y >= 0.95) continue;
      inspectedVertices += 1;
      expect(Number.isFinite(position.getX(vertex))).toBe(true);
      expect(Number.isFinite(position.getZ(vertex))).toBe(true);
      surfaceNormal.fromBufferAttribute(normal, vertex);
      expect(surfaceNormal.length()).toBeCloseTo(1, 5);
    }

    for (let triangle = 0; triangle < indices.count; triangle += 3) {
      const corners = [
        indices.getX(triangle),
        indices.getX(triangle + 1),
        indices.getX(triangle + 2),
      ];
      for (let edge = 0; edge < 3; edge += 1) {
        const from = corners[edge];
        const to = corners[(edge + 1) % 3];
        const key = `${Math.min(from, to)}:${Math.max(from, to)}`;
        const previous = edges.get(key);
        edges.set(key, { count: (previous?.count ?? 0) + 1, from, to });
      }
    }

    // Cuffs and the waist may be open; the cloth between them must have
    // exactly two triangles on every edge, including its longitudinal seam.
    const brokenEdges = [...edges.values()].filter(({ from, to, count }) => {
      const low = Math.min(position.getY(from), position.getY(to));
      const high = Math.max(position.getY(from), position.getY(to));
      return low > 0.24 && high < 0.95 && count !== 2;
    });
    expect(inspectedVertices).toBeGreaterThan(100);
    expect(brokenEdges).toEqual([]);
  } finally {
    for (const geometry of context.geometries.values()) geometry.dispose();
    for (const material of context.materials) material.dispose();
    for (const texture of context.textures) texture.dispose();
  }
});
