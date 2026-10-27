import type { ModelContext, Point } from "./scene-primitives";

import * as THREE from "three";
import { MarchingCubes } from "three/addons/objects/MarchingCubes.js";
import { smoothstep } from "./scene-primitives";
export function createArmModel(context: ModelContext) {
  const {
    geometry,
    material,
    mesh,
    rounded,
    curve,
    ring,
    cylinder,
    skeletons,
  } = context;
  const { skin, cream, shirt } = context.surfaces;
  function smoothUnion(a: number, b: number, blend: number) {
    const h = Math.max(blend - Math.abs(a - b), 0) / blend;
    return Math.min(a, b) - h * h * blend * 0.25;
  }

  function capsuleDistance(
    point: THREE.Vector3,
    start: Point,
    end: Point,
    radius: number,
    endRadius = radius,
  ) {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const dz = end[2] - start[2];
    const x = point.x - start[0];
    const y = point.y - start[1];
    const z = point.z - start[2];
    const length = Math.hypot(dx, dy, dz);
    const taper = (radius - endRadius) / length;
    if (Math.abs(taper) >= 1) {
      return Math.min(
        Math.hypot(x, y, z) - radius,
        Math.hypot(x - dx, y - dy, z - dz) - endRadius,
      );
    }
    const axial = (x * dx + y * dy + z * dz) / length;
    const radial = Math.sqrt(
      Math.max(0, x * x + y * y + z * z - axial * axial),
    );
    const slope = Math.sqrt(1 - taper * taper);
    const tangent = slope * axial - taper * radial;
    // Rounded cones meet their end caps tangentially, without capsule seams.
    if (tangent < 0) return Math.hypot(x, y, z) - radius;
    if (tangent > slope * length)
      return Math.hypot(x - dx, y - dy, z - dz) - endRadius;
    return slope * radial + taper * axial - radius;
  }

  type LimbSegment = {
    start: Point;
    end: Point;
    radius: number;
    endRadius: number;
  };

  const handSegments: [Point, Point, number, number][] = [
    [[-0.032, 0, 0.06], [-0.038, -0.003, 0.149], 0.012, 0.011],
    [[-0.011, 0, 0.067], [-0.012, -0.003, 0.165], 0.013, 0.0115],
    [[0.012, 0, 0.063], [0.014, -0.003, 0.153], 0.012, 0.011],
    [[0.032, 0, 0.05], [0.041, -0.003, 0.129], 0.011, 0.0095],
    [[-0.025, 0, 0.013], [-0.045, 0, 0.039], 0.02, 0.016],
    [[-0.045, 0, 0.039], [-0.054, -0.001, 0.063], 0.016, 0.012],
    [[0, 0, -0.021], [0, 0, 0.012], 0.026, 0.026],
  ];

  function handDistance(point: THREE.Vector3) {
    let distance =
      (Math.hypot(point.x / 0.048, point.y / 0.022, (point.z - 0.031) / 0.053) -
        1) *
      0.022;
    for (const [start, end, radius, endRadius] of handSegments) {
      distance = smoothUnion(
        distance,
        capsuleDistance(point, start, end, radius, endRadius),
        0.006,
      );
    }
    return distance;
  }

  function armSegments() {
    const path = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-0.13, 0.025, -0.01),
        new THREE.Vector3(-0.035, 0.005, 0),
        new THREE.Vector3(0.04, -0.115, 0.015),
        new THREE.Vector3(-0.015, -0.325, 0.11),
        new THREE.Vector3(-0.075, -0.36, 0.28),
        new THREE.Vector3(-0.15, -0.36, 0.425),
      ],
      false,
      "catmullrom",
      0.3,
    );
    const radii = [
      0.001, 0.075, 0.088, 0.087, 0.08, 0.073, 0.067, 0.061, 0.053, 0.043,
      0.033,
    ];
    const profile = new THREE.SplineCurve(
      radii.map(
        (radius, i) => new THREE.Vector2(i / (radii.length - 1), radius),
      ),
    );
    return Array.from(
      { length: 48 },
      (_, i): LimbSegment => ({
        end: path.getPointAt((i + 1) / 48).toArray() as Point,
        endRadius: profile.getPoint((i + 1) / 48).y,
        radius: profile.getPoint(i / 48).y,
        start: path.getPointAt(i / 48).toArray() as Point,
      }),
    );
  }

  function limbDistance(
    point: THREE.Vector3,
    segments: LimbSegment[],
    local: THREE.Vector3,
    armPoint: THREE.Vector3,
  ) {
    armPoint.copy(point);
    armPoint.y =
      -0.36 +
      (point.y + 0.36) /
        THREE.MathUtils.lerp(1, 0.72, smoothstep(0.32, 0.425, point.z));
    let distance = 0.05;
    for (const segment of segments) {
      if (!nearSegment(armPoint, segment)) continue;
      distance = Math.min(
        distance,
        capsuleDistance(
          armPoint,
          segment.start,
          segment.end,
          segment.radius,
          segment.endRadius,
        ),
      );
    }
    if (point.z < 0.35) return distance;
    local.set(point.x + 0.15, point.y + 0.36, point.z - 0.425);
    return smoothUnion(distance, handDistance(local), 0.013);
  }

  function nearSegment(point: THREE.Vector3, segment: LimbSegment) {
    const padding = Math.max(segment.radius, segment.endRadius) + 0.025;
    return (
      point.x >= Math.min(segment.start[0], segment.end[0]) - padding &&
      point.x <= Math.max(segment.start[0], segment.end[0]) + padding &&
      point.y >= Math.min(segment.start[1], segment.end[1]) - padding &&
      point.y <= Math.max(segment.start[1], segment.end[1]) + padding &&
      point.z >= Math.min(segment.start[2], segment.end[2]) - padding &&
      point.z <= Math.max(segment.start[2], segment.end[2]) + padding
    );
  }

  function limbProgress(point: THREE.Vector3, segments: LimbSegment[]) {
    let closest = Number.POSITIVE_INFINITY;
    let progress = 0;
    for (const [i, segment] of segments.entries()) {
      const dx = segment.end[0] - segment.start[0];
      const dy = segment.end[1] - segment.start[1];
      const dz = segment.end[2] - segment.start[2];
      const x = point.x - segment.start[0];
      const y = point.y - segment.start[1];
      const z = point.z - segment.start[2];
      const t = THREE.MathUtils.clamp(
        (x * dx + y * dy + z * dz) / (dx * dx + dy * dy + dz * dz),
        0,
        1,
      );
      const distance =
        (x - t * dx) ** 2 + (y - t * dy) ** 2 + (z - t * dz) ** 2;
      if (distance < closest) {
        closest = distance;
        progress = (i + t) / segments.length;
      }
    }
    return progress;
  }

  function skinLimb(shape: THREE.BufferGeometry, segments: LimbSegment[]) {
    const positions = shape.getAttribute("position");
    const skinIndices: number[] = [];
    const skinWeights: number[] = [];
    const shirtIndices: number[] = [];
    const skinFaces: number[] = [];
    const point = new THREE.Vector3();
    for (let vertex = 0; vertex < positions.count; vertex += 1) {
      point.fromBufferAttribute(positions, vertex);
      const t = limbProgress(point, segments);
      const shoulderWeight = smoothstep(0.04, 0.22, t);
      const elbowWeight = smoothstep(0.48, 0.62, t);
      const wristWeight = smoothstep(0.38, 0.445, point.z);
      skinIndices.push(0, 1, 2, 3);
      skinWeights.push(
        1 - shoulderWeight,
        shoulderWeight - elbowWeight,
        elbowWeight - wristWeight,
        wristWeight,
      );
      if (vertex % 3 === 0) {
        const sleeve =
          (positions.getY(vertex) +
            positions.getY(vertex + 1) +
            positions.getY(vertex + 2)) /
            3 >
          -0.17;
        (sleeve ? shirtIndices : skinFaces).push(
          vertex,
          vertex + 1,
          vertex + 2,
        );
      }
    }
    shape.setAttribute(
      "skinIndex",
      new THREE.Uint16BufferAttribute(skinIndices, 4),
    );
    shape.setAttribute(
      "skinWeight",
      new THREE.Float32BufferAttribute(skinWeights, 4),
    );
    shape.setIndex([...shirtIndices, ...skinFaces]);
    shape.addGroup(0, shirtIndices.length, 0);
    shape.addGroup(shirtIndices.length, skinFaces.length, 1);
    return shape;
  }

  function buildLimbGeometry() {
    const resolution = 112;
    const field = new MarchingCubes(resolution, skin, false, false, 120_000);
    field.isolation = 0;
    const segments = armSegments();
    const point = new THREE.Vector3();
    const local = new THREE.Vector3();
    const armPoint = new THREE.Vector3();
    for (let index = 0; index < field.field.length; index += 1) {
      const x = index % resolution;
      const y = Math.floor(index / resolution) % resolution;
      const z = Math.floor(index / (resolution * resolution));
      point.set(
        ((x / resolution) * 2 - 1) * 0.22 - 0.06,
        ((y / resolution) * 2 - 1) * 0.3 - 0.17,
        ((z / resolution) * 2 - 1) * 0.38 + 0.26,
      );
      field.field[index] = -limbDistance(point, segments, local, armPoint);
    }
    field.update();
    const shape = new THREE.BufferGeometry();
    shape.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        field.positionArray.slice(0, field.count * 3),
        3,
      ),
    );
    shape.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(
        field.normalArray.slice(0, field.count * 3),
        3,
      ),
    );
    shape.scale(0.22, 0.3, 0.38);
    shape.translate(-0.06, -0.17, 0.26);
    field.geometry.dispose();
    return skinLimb(shape, segments);
  }

  function buildWatch(wrist: THREE.Object3D) {
    const watch = new THREE.Group();
    watch.position.z = -0.016;
    wrist.add(watch);
    const silver = material("#b9c1c6", { metalness: 0.9, roughness: 0.3 });
    const weave = material("#798389", { metalness: 0.8, roughness: 0.55 });
    const glass = material("#10191e", { clearcoat: 1, roughness: 0.15 });
    const band = ring(watch, silver, 0.034, 0.004, [0, 0, 0]);
    band.scale.set(1.12, 0.77, 3.5);
    for (let row = 0; row < 11; row += 1) {
      const wire = ring(watch, weave, 0.038, 0.0005, [
        0,
        0,
        (row - 5) * 0.0024,
      ]);
      wire.scale.y = 0.69;
    }
    rounded(watch, silver, [0, 0.029, 0], [0.057, 0.014, 0.048]);
    rounded(watch, glass, [0, 0.0365, 0], [0.049, 0.0025, 0.04]);
    const crown = mesh(
      watch,
      cylinder,
      silver,
      [0.031, 0.029, 0.009],
      [0.005, 0.006, 0.005],
    );
    crown.rotation.z = Math.PI / 2;
    rounded(watch, silver, [0.029, 0.028, -0.012], [0.004, 0.005, 0.012]);
    for (let hour = 0; hour < 12; hour += 1) {
      const angle = (hour * Math.PI) / 6;
      const tick = rounded(
        watch,
        cream,
        [Math.sin(angle) * 0.018, 0.038, Math.cos(angle) * 0.014],
        [0.0012, 0.0006, 0.003],
      );
      tick.rotation.y = angle;
    }
    curve(
      watch,
      cream,
      [
        [-0.009, 0.039, -0.006],
        [0, 0.039, 0],
        [0.008, 0.039, -0.011],
      ],
      0.0009,
    );
  }

  function buildArm(parent: THREE.Group, side: number) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.315, 1.93, -0.065);
    arm.scale.x = side;
    parent.add(arm);
    const shape = geometry("continuous-arm-and-hand", buildLimbGeometry);
    const sleeve = new THREE.SkinnedMesh(shape, [shirt, skin]);
    sleeve.castShadow = true;
    sleeve.receiveShadow = true;
    const attachment = new THREE.Bone();
    const shoulder = new THREE.Bone();
    const elbow = new THREE.Bone();
    elbow.position.set(-0.015, -0.325, 0.11);
    const wrist = new THREE.Bone();
    wrist.position.set(-0.135, -0.035, 0.315);
    elbow.add(wrist);
    shoulder.add(elbow);
    attachment.add(shoulder);
    sleeve.add(attachment);
    arm.add(sleeve);
    const skeleton = new THREE.Skeleton([attachment, shoulder, elbow, wrist]);
    skeletons.add(skeleton);
    sleeve.bind(skeleton);
    return { elbow, hand: wrist, shoulder };
  }

  return { buildArm, buildWatch };
}
