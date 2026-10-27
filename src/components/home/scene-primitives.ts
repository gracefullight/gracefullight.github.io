import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { createSceneMaterials } from "./scene-materials";
export type Point = [number, number, number];
type ProfileRing = [number, number, number, number?];
const TUBE_SEGMENTS = 56;
const TUBE_SIDES = 24;
export const UP = new THREE.Vector3(0, 1, 0);
export const smoothstep = (start: number, end: number, value: number) =>
  THREE.MathUtils.smoothstep(value, start, end);
export function sample(values: number[], t: number) {
  const point = t * (values.length - 1);
  const index = Math.min(values.length - 2, Math.floor(point));
  return THREE.MathUtils.lerp(
    values[index],
    values[index + 1],
    smoothstep(0, 1, point - index),
  );
}

export function createScenePrimitives() {
  const geometries = new Map<string, THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const skeletons = new Set<THREE.Skeleton>();
  function geometry(key: string, make: () => THREE.BufferGeometry) {
    const cached = geometries.get(key);
    if (cached) return cached;
    const result = make();
    geometries.set(key, result);
    return result;
  }

  function material(
    color: string,
    options: THREE.MeshPhysicalMaterialParameters = {},
  ) {
    const result = new THREE.MeshPhysicalMaterial({
      clearcoat: 0.12,
      clearcoatRoughness: 0.65,
      color,
      metalness: 0,
      roughness: 0.57,
      ...options,
    });
    materials.add(result);
    return result;
  }

  const sphere = geometry("sphere", () => new THREE.SphereGeometry(1, 32, 24));
  const box = geometry("box", () => new RoundedBoxGeometry(1, 1, 1, 5, 0.15));
  const cylinder = geometry(
    "cylinder",
    () => new THREE.CylinderGeometry(1, 1, 1, 40),
  );

  function mesh(
    parent: THREE.Object3D,
    shape: THREE.BufferGeometry,
    surface: THREE.Material,
    position: Point = [0, 0, 0],
    scale: Point = [1, 1, 1],
  ) {
    const result = new THREE.Mesh(shape, surface);
    result.position.set(...position);
    result.scale.set(...scale);
    result.castShadow = true;
    result.receiveShadow = true;
    parent.add(result);
    return result;
  }

  function rounded(
    parent: THREE.Object3D,
    surface: THREE.Material,
    position: Point,
    scale: Point,
  ) {
    return mesh(parent, box, surface, position, scale);
  }

  function ellipsoid(
    parent: THREE.Object3D,
    surface: THREE.Material,
    position: Point,
    scale: Point,
  ) {
    return mesh(parent, sphere, surface, position, scale);
  }

  function rod(
    parent: THREE.Object3D,
    surface: THREE.Material,
    from: Point,
    to: Point,
    radius: number,
  ) {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = end.clone().sub(start);
    const result = mesh(
      parent,
      cylinder,
      surface,
      [0, 0, 0],
      [radius, direction.length(), radius],
    );
    result.position.copy(start.add(end).multiplyScalar(0.5));
    result.quaternion.setFromUnitVectors(UP, direction.normalize());
    return result;
  }

  function curve(
    parent: THREE.Object3D,
    surface: THREE.Material,
    points: Point[],
    radius: number,
  ) {
    const path = new THREE.CatmullRomCurve3(
      points.map((point) => new THREE.Vector3(...point)),
    );
    const shape = geometry(
      `curve-${geometries.size}`,
      () => new THREE.TubeGeometry(path, 28, radius, 8, false),
    );
    return mesh(parent, shape, surface);
  }

  function ring(
    parent: THREE.Object3D,
    surface: THREE.Material,
    radius: number,
    thickness: number,
    position: Point,
  ) {
    const shape = geometry(
      `ring-${radius}-${thickness}`,
      () => new THREE.TorusGeometry(radius, thickness, 10, 64),
    );
    return mesh(parent, shape, surface, position);
  }

  // Continuous, tapered surfaces keep knees and elbows part of one silhouette.
  function taperedTube(
    key: string,
    points: Point[],
    radii: number[],
    depth = 1,
  ) {
    return geometry(key, () => {
      const path = new THREE.CatmullRomCurve3(
        points.map((point) => new THREE.Vector3(...point)),
        false,
        "catmullrom",
        0.3,
      );
      const frames = path.computeFrenetFrames(TUBE_SEGMENTS, false);
      const vertices: number[] = [];
      const indices: number[] = [];
      const offset = new THREE.Vector3();
      for (let section = 0; section <= TUBE_SEGMENTS; section += 1) {
        const t = section / TUBE_SEGMENTS;
        const center = path.getPointAt(t);
        const radius = sample(radii, t);
        for (let side = 0; side <= TUBE_SIDES; side += 1) {
          const angle = (side / TUBE_SIDES) * Math.PI * 2;
          offset
            .copy(frames.normals[section])
            .multiplyScalar(Math.cos(angle) * radius);
          offset.addScaledVector(
            frames.binormals[section],
            Math.sin(angle) * radius * depth,
          );
          vertices.push(
            center.x + offset.x,
            center.y + offset.y,
            center.z + offset.z,
          );
          if (section < TUBE_SEGMENTS && side < TUBE_SIDES) {
            const a = section * (TUBE_SIDES + 1) + side;
            const b = a + TUBE_SIDES + 1;
            indices.push(a, a + 1, b, b, a + 1, b + 1);
          }
        }
      }
      const result = new THREE.BufferGeometry();
      result.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      result.setIndex(indices);
      result.computeVertexNormals();
      return result;
    });
  }

  function loft(key: string, rings: ProfileRing[], roundness = 1) {
    return geometry(key, () => {
      const vertices: number[] = [];
      const indices: number[] = [];
      const count = 48;
      const steps = 48;
      const profile = new THREE.CatmullRomCurve3(
        rings.map(([y, width, depth]) => new THREE.Vector3(width, y, depth)),
        false,
        "centripetal",
      );
      const offsets = rings.map((item) => item[3] ?? 0);
      for (let level = 0; level <= steps; level += 1) {
        const t = level / steps;
        const section = profile.getPoint(t);
        for (let side = 0; side <= count; side += 1) {
          const angle = (side / count) * Math.PI * 2;
          const cosine = Math.cos(angle);
          const sine = Math.sin(angle);
          vertices.push(
            Math.sign(cosine) *
              Math.abs(cosine) ** roundness *
              Math.max(0.001, section.x),
            section.y,
            Math.sign(sine) *
              Math.abs(sine) ** roundness *
              Math.max(0.001, section.z) +
              sample(offsets, t),
          );
          if (level < steps && side < count) {
            const a = level * (count + 1) + side;
            const b = a + count + 1;
            indices.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
      }
      const result = new THREE.BufferGeometry();
      result.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      result.setIndex(indices);
      result.computeVertexNormals();
      return result;
    });
  }

  const surfaces = createSceneMaterials(material, textures);
  return {
    box,
    curve,
    cylinder,
    ellipsoid,
    geometries,
    geometry,
    loft,
    material,
    materials,
    mesh,
    ring,
    rod,
    rounded,
    skeletons,
    sphere,
    surfaces,
    taperedTube,
    textures,
  };
}
export type ModelContext = ReturnType<typeof createScenePrimitives>;
