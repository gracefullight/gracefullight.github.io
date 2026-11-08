import { existsSync } from "node:fs";
import { join } from "node:path";
import * as THREE from "three";
import { describe, expect, it } from "vitest";
import {
  POLYFORK_PROPS,
  polyforkAssetUrl,
  polyforkModelPath,
} from "./polyfork-manifest";
import { adaptPolyforkModel } from "./polyfork-props";

describe("POLYFORK_PROPS", () => {
  it("ships every model it loads", () => {
    for (const prop of POLYFORK_PROPS) {
      const file = polyforkModelPath("", prop.id);
      expect(existsSync(join(process.cwd(), "static", file))).toBe(true);
    }
  });

  it("links each prop to its Polyfork credit page", () => {
    const ids = POLYFORK_PROPS.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(polyforkAssetUrl(ids[0])).toBe(
      `https://polyfork.dev/asset/${ids[0]}`,
    );
  });

  it("resolves models against the site base URL", () => {
    expect(polyforkModelPath("/blog/", "office-mug-8afee0")).toBe(
      "/blog/models/polyfork/office-mug-8afee0.glb",
    );
  });
});

describe("adaptPolyforkModel", () => {
  it("swaps in a shared vertex-colour material and places the prop", () => {
    const root = new THREE.Group();
    const original = new THREE.MeshBasicMaterial();
    const geometry = new THREE.BoxGeometry();
    const first = new THREE.Mesh(geometry, original);
    const second = new THREE.Mesh(geometry, original);
    root.add(first);
    first.add(second);
    const resources = {
      geometries: new Map<string, THREE.BufferGeometry>(),
      materials: new Set<THREE.Material>(),
    };

    adaptPolyforkModel(
      root,
      {
        castShadow: false,
        id: "area-rug-5c56e2",
        position: [1, 2, 3],
        rotationY: 0.5,
        scale: [2, 0.5, 2],
        title: "Area Rug",
      },
      resources,
    );

    expect(resources.materials.size).toBe(1);
    const [surface] = resources.materials;
    expect(surface).toBeInstanceOf(THREE.MeshStandardMaterial);
    expect((surface as THREE.MeshStandardMaterial).vertexColors).toBe(true);
    for (const mesh of [first, second]) {
      expect(mesh.material).toBe(surface);
      expect(mesh.castShadow).toBe(false);
      expect(mesh.receiveShadow).toBe(true);
    }
    expect(resources.geometries.get(geometry.uuid)).toBe(geometry);
    expect(root.position.toArray()).toEqual([1, 2, 3]);
    expect(root.scale.toArray()).toEqual([2, 0.5, 2]);
    expect(root.rotation.y).toBe(0.5);
    expect(root.name).toBe("area-rug-5c56e2");

    surface.dispose();
    geometry.dispose();
  });
});
