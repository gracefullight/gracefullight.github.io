import type { ModelContext, Point } from "./scene-primitives";

import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { sample, smoothstep } from "./scene-primitives";
export function createClothingModel(context: ModelContext) {
  const { geometry, material, mesh, rounded, curve, ring, loft } = context;
  const { skin, shirt, shirtRib, denim, wool, shoeSole, shoeLace, shoeTrim } =
    context.surfaces;
  function buildLaces(shoe: THREE.Group, upper: THREE.BufferGeometry) {
    const surface = new THREE.Mesh(upper, wool);
    surface.updateMatrixWorld(true);
    const ray = new THREE.Raycaster();
    const down = new THREE.Vector3(0, -1, 0);
    const point = (x: number, z: number, lift = 0.004): Point => {
      ray.set(new THREE.Vector3(x, 0.5, z), down);
      const hit = ray.intersectObject(surface, false)[0];
      return [x, (hit?.point.y ?? 0.18) + lift, z];
    };
    for (let row = 0; row < 3; row += 1) {
      const z = -0.045 + row * 0.045;
      for (const direction of [-1, 1]) {
        curve(
          shoe,
          shoeLace,
          [
            point(-0.048 * direction, z),
            point(0, z + 0.0225, 0.006),
            point(0.048 * direction, z + 0.045),
          ],
          0.004,
        );
      }
    }
    for (const side of [-1, 1]) {
      curve(
        shoe,
        shoeLace,
        [
          point(0, -0.035, 0.009),
          point(side * 0.028, -0.06, 0.014),
          point(side * 0.042, -0.035, 0.014),
          point(0, -0.035, 0.009),
        ],
        0.0035,
      );
    }
  }

  function buildShoes(parent: THREE.Group, side: number) {
    const shoe = new THREE.Group();
    shoe.position.set(side * 0.19, 0.032, 0.09);
    shoe.rotation.y = side * 0.06;
    shoe.scale.set(0.88, 0.92, 0.92);
    parent.add(shoe);
    const sole = loft(
      "shoe-sole",
      [
        [0, 0.001, 0.001],
        [0.005, 0.116, 0.21],
        [0.022, 0.128, 0.22],
        [0.045, 0.128, 0.22],
        [0.052, 0.12, 0.212],
        [0.053, 0.001, 0.001],
      ],
      0.7,
    );
    mesh(shoe, sole, shoeSole);
    const upper = loft(
      "shoe-upper",
      [
        [0.05, 0.001, 0.001],
        [0.055, 0.125, 0.215],
        [0.105, 0.126, 0.216],
        [0.16, 0.103, 0.169, -0.021],
        [0.208, 0.073, 0.095, -0.073],
        [0.215, 0.001, 0.001, -0.073],
      ],
      0.82,
    );
    if (!upper.hasAttribute("uv")) {
      const positions = upper.getAttribute("position");
      const uv: number[] = [];
      for (let i = 0; i < positions.count; i += 1) {
        uv.push(
          Math.atan2(positions.getZ(i), positions.getX(i)) / (Math.PI * 2) +
            0.5,
          positions.getY(i) / 0.22,
        );
      }
      upper.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    }
    mesh(shoe, upper, wool);
    buildLaces(shoe, upper);
    rounded(shoe, shoeTrim, [0, 0.153, -0.185], [0.045, 0.04, 0.01]);
  }

  function trouserPoint(side: number, t: number, angle: number): Point {
    const cosine = Math.cos(angle);
    const center = 0.19 - 0.02 * smoothstep(0.15, 0.7, t);
    const width = sample([0.095, 0.104, 0.122, 0.14, 0.128], t);
    const depth = sample([0.088, 0.097, 0.114, 0.13, 0.125], t);
    // At the top, each leg opens into half of the waist. The inside edge
    // drops into a curved crotch and is welded to the opposite leg below.
    const join = Math.max(0, (t - 0.62) / 0.38) ** 1.2;
    const waistX = 0.25 * Math.max(cosine, 0);
    const hip = smoothstep(0.62, 0.82, t) * (1 - smoothstep(0.9, 1, t));
    return [
      side *
        (THREE.MathUtils.lerp(center + width * cosine, waistX, join) +
          0.028 * hip * Math.max(cosine, 0)),
      0.22 + 1.18 * t - 0.35 * join * Math.max(-cosine, 0) ** 1.6,
      Math.sin(angle) * depth -
        0.065 * smoothstep(0, 1, t) -
        0.05 * hip * (0.5 - 0.5 * Math.sin(angle)),
    ];
  }

  function appendTrouserLeg(
    vertices: number[],
    indices: number[],
    side: number,
  ) {
    const levels = 64;
    const sides = 64;
    const start = vertices.length / 3;
    for (let level = 0; level <= levels; level += 1) {
      for (let ring = 0; ring <= sides; ring += 1) {
        vertices.push(
          ...trouserPoint(side, level / levels, (ring / sides) * Math.PI * 2),
        );
      }
    }
    for (let level = 0; level < levels; level += 1) {
      for (let ring = 0; ring < sides; ring += 1) {
        const a = start + level * (sides + 1) + ring;
        const b = a + sides + 1;
        const faces = [a, b, a + 1, b, b + 1, a + 1];
        // Mirroring the left leg reverses its surface orientation.
        indices.push(...(side < 0 ? faces.reverse() : faces));
      }
    }
  }

  function buildTrouserGeometry() {
    const vertices: number[] = [];
    const indices: number[] = [];
    for (const side of [-1, 1]) appendTrouserLeg(vertices, indices, side);
    const raw = new THREE.BufferGeometry();
    raw.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    raw.setIndex(indices);
    const joined = mergeVertices(raw, 0.000_01);
    raw.dispose();
    joined.computeVertexNormals();
    return joined;
  }

  function buildDenimWear(parent: THREE.Group, shape: THREE.BufferGeometry) {
    const threads = material("#c8ccc6", { clearcoat: 0, roughness: 1 });
    const surface = new THREE.Mesh(shape, denim);
    surface.updateMatrixWorld(true);
    const ray = new THREE.Raycaster();
    const patches = [
      [-0.18, 0.79, 0.055],
      [0.17, 1.04, 0.042],
    ];
    for (const [x, y, width] of patches) {
      for (let row = 0; row < 3; row += 1) {
        const points: Point[] = [];
        for (let step = 0; step <= 4; step += 1) {
          const px = x + (step / 4 - 0.5) * width * (1 - row * 0.13);
          const py = y + row * 0.005 + Math.sin(step * 2 + row) * 0.001;
          ray.set(new THREE.Vector3(px, py, 0.5), new THREE.Vector3(0, 0, -1));
          const hit = ray.intersectObject(surface, false)[0];
          points.push([px, py, (hit?.point.z ?? 0.05) + 0.0015]);
        }
        curve(parent, threads, points, 0.0009);
      }
    }
  }

  function buildLegs(parent: THREE.Group) {
    const jeans = geometry("continuous-jeans", buildTrouserGeometry);
    mesh(parent, jeans, denim);
    buildDenimWear(parent, jeans);
    for (const side of [-1, 1]) {
      buildShoes(parent, side);
    }
  }

  function buildTorso(parent: THREE.Group) {
    const torso = new THREE.Group();
    torso.position.set(0, 1.67, -0.075);
    torso.rotation.x = 0.035;
    parent.add(torso);
    const body = loft(
      "crew-neck-tshirt",
      [
        [-0.42, 0.001, 0.001],
        [-0.4, 0.27, 0.155],
        [-0.25, 0.275, 0.16],
        [0.07, 0.3, 0.17],
        [0.25, 0.33, 0.155],
        [0.34, 0.29, 0.135],
        [0.41, 0.1, 0.085],
        [0.42, 0.001, 0.001],
      ],
      0.8,
    );
    mesh(torso, body, shirt);
    const collar = ring(torso, shirtRib, 0.089, 0.009, [0, 0.387, 0]);
    collar.rotation.x = Math.PI / 2;
    collar.scale.y = 0.9;
    const neck = loft("neck", [
      [2.02, 0.095, 0.079, -0.05],
      [2.08, 0.088, 0.076, -0.05],
      [2.15, 0.078, 0.073, -0.045],
      [2.23, 0.087, 0.08, -0.04],
    ]);
    mesh(parent, neck, skin);
    return torso;
  }

  return { buildLegs, buildTorso };
}
