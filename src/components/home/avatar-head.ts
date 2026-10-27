import type { ModelContext, Point } from "./scene-primitives";

import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { PALETTE } from "./scene-materials";
import { smoothstep } from "./scene-primitives";
export function createHeadModel(context: ModelContext) {
  const { geometry, mesh, ellipsoid, rod, curve, taperedTube, loft } = context;
  const {
    skin,
    skinShade,
    hair,
    croppedHair,
    scalpMaterial,
    hairHighlight,
    hairPart,
    earbudWhite,
    earbudVent,
    cream,
    eye,
    pupil,
    eyeWhite,
    glasses,
  } = context.surfaces;
  const blinkingEyes: { aperture: THREE.Group; closed: THREE.Object3D }[] = [];
  const facePoints = [
    new THREE.Vector2(0.001, -0.34),
    new THREE.Vector2(0.135, -0.315),
    new THREE.Vector2(0.235, -0.21),
    new THREE.Vector2(0.315, -0.04),
    new THREE.Vector2(0.325, 0.16),
    new THREE.Vector2(0.29, 0.31),
    new THREE.Vector2(0.16, 0.405),
    new THREE.Vector2(0.001, 0.43),
  ];
  const faceProfile = new THREE.SplineCurve(facePoints).getPoints(80);
  function faceRadius(y: number) {
    const index = Math.max(
      1,
      faceProfile.findIndex((point) => point.y >= y),
    );
    const lower = faceProfile[index - 1];
    const upper = faceProfile[index];
    const amount = THREE.MathUtils.clamp(
      (y - lower.y) / Math.max(upper.y - lower.y, 0.0001),
      0,
      1,
    );
    return THREE.MathUtils.lerp(lower.x, upper.x, amount);
  }
  function faceDepth(x: number, y: number) {
    const radius = faceRadius(y);
    return radius * 0.86 * Math.max(0, 1 - (x / radius) ** 2) ** 0.35;
  }

  function buildEyes(head: THREE.Group) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.052, 0);
    shape.bezierCurveTo(-0.032, 0.028, 0.022, 0.028, 0.052, 0.002);
    shape.bezierCurveTo(0.027, -0.022, -0.026, -0.022, -0.052, 0);
    const almond = geometry(
      "almond-eye",
      () =>
        new THREE.ExtrudeGeometry(shape, {
          bevelEnabled: true,
          bevelSegments: 3,
          bevelSize: 0.003,
          bevelThickness: 0.002,
          depth: 0.002,
          steps: 1,
        }),
    );
    for (const side of [-1, 1]) {
      const eyeRoot = new THREE.Group();
      eyeRoot.position.set(
        side * 0.12,
        0.025,
        faceDepth(side * 0.12, 0.025) + 0.004,
      );
      eyeRoot.rotation.y = side * 0.35;
      head.add(eyeRoot);
      const aperture = new THREE.Group();
      eyeRoot.add(aperture);
      mesh(aperture, almond, eyeWhite);
      ellipsoid(aperture, eye, [0, 0, 0.009], [0.02, 0.02, 0.004]);
      ellipsoid(aperture, pupil, [0, 0, 0.013], [0.01, 0.012, 0.002]);
      ellipsoid(aperture, cream, [-0.005, 0.008, 0.016], [0.004, 0.004, 0.002]);
      curve(
        aperture,
        skinShade,
        [
          [-0.054, 0, 0.003],
          [-0.028, 0.022, 0.003],
          [0.022, 0.023, 0.003],
          [0.054, 0.002, 0.003],
        ],
        0.005,
      );
      curve(
        aperture,
        skin,
        [
          [-0.049, -0.003, 0.002],
          [0, -0.019, 0.001],
          [0.05, 0, 0.002],
        ],
        0.004,
      );
      const closed = curve(
        eyeRoot,
        skinShade,
        [
          [-0.049, 0, 0.005],
          [0, -0.004, 0.006],
          [0.049, 0, 0.005],
        ],
        0.003,
      );
      closed.visible = false;
      blinkingEyes.push({ aperture, closed });
      const browShape = taperedTube(
        `brow-${side}`,
        [
          [-0.059, 0.105, 0.012],
          [-0.017, 0.118, 0.017],
          [0.044, 0.108, 0.013],
        ],
        [0.002, 0.011, 0.003],
        0.55,
      );
      mesh(eyeRoot, browShape, hair);
    }
  }

  function buildGlasses(head: THREE.Group) {
    const frameShape = geometry("flat-top-rounded-bottom-frame", () => {
      const point = (x: number, y: number) => new THREE.Vector3(x, y, 0);
      const path = new THREE.CurvePath<THREE.Vector3>();
      path.add(new THREE.LineCurve3(point(-0.062, 0.072), point(0.062, 0.072)));
      path.add(new THREE.LineCurve3(point(0.062, 0.072), point(0.098, 0.038)));
      path.add(
        new THREE.CubicBezierCurve3(
          point(0.098, 0.038),
          point(0.114, 0.015),
          point(0.097, -0.09),
          point(0, -0.09),
        ),
      );
      path.add(
        new THREE.CubicBezierCurve3(
          point(0, -0.09),
          point(-0.097, -0.09),
          point(-0.114, 0.015),
          point(-0.098, 0.038),
        ),
      );
      path.add(
        new THREE.LineCurve3(point(-0.098, 0.038), point(-0.062, 0.072)),
      );
      return new THREE.TubeGeometry(path, 96, 0.0055, 8, true);
    });
    for (const side of [-1, 1]) {
      const frame = mesh(head, frameShape, glasses, [
        side * 0.122,
        0.026,
        0.296,
      ]);
      frame.rotation.y = side * 0.11;
      curve(
        head,
        glasses,
        [
          [side * 0.218, 0.045, 0.285],
          [side * 0.29, 0.05, 0.23],
          [side * 0.35, 0.035, 0.1],
          [side * 0.354, 0.015, -0.015],
          [side * 0.348, -0.025, -0.06],
          [side * 0.332, -0.065, -0.065],
        ],
        0.0055,
      );
    }
    curve(
      head,
      glasses,
      [
        [-0.025, 0.04, 0.3],
        [0, 0.055, 0.313],
        [0.025, 0.04, 0.3],
      ],
      0.006,
    );
  }

  function croppedAmount(phi: number, y: number) {
    const front = Math.max(Math.sin(phi), 0);
    return (1 - smoothstep(0.13, 0.28, y)) * (1 - smoothstep(0.3, 0.85, front));
  }

  function hairColor(phi: number, theta: number) {
    const y = Math.cos(theta) * 0.435 + 0.025;
    const crop = new THREE.Color("#706052").lerp(
      new THREE.Color("#454c43"),
      smoothstep(-0.12, 0.18, y),
    );
    return new THREE.Color(PALETTE.hair).lerp(crop, croppedAmount(phi, y));
  }

  function hairPoint(phi: number, theta: number): Point {
    const front = Math.max(Math.sin(phi), 0);
    const baseY = Math.cos(theta) * 0.435 + 0.025;
    const longRadius =
      faceRadius(Math.min(0.428, baseY - 0.025)) * 1.015 + 0.005;
    const shortRadius = faceRadius(Math.min(0.428, baseY)) + 0.006;
    const crop = croppedAmount(phi, baseY);
    const radius =
      THREE.MathUtils.lerp(longRadius, shortRadius, crop) *
      Math.min(theta / 0.06, 1);
    const lift =
      0.07 *
      front *
      Math.exp(-((theta - 0.7) ** 2) / 0.18) *
      smoothstep(0.2, 0.34, baseY);
    const sine = Math.sin(phi);
    return [
      Math.cos(phi) * radius -
        0.012 * Math.sin(theta) * front * smoothstep(0.28, 0.4, baseY),
      baseY + lift * (1 - crop),
      Math.sign(sine) * Math.abs(sine) ** 0.7 * radius * 0.86,
    ];
  }

  function hairBoundary(phi: number) {
    const front = Math.max(Math.sin(phi), 0);
    const back = Math.max(-Math.sin(phi), 0);
    const frontLine = 0.23 + 0.012 * Math.cos(phi) ** 2;
    const y = THREE.MathUtils.lerp(
      -0.015 - 0.13 * back,
      frontLine,
      smoothstep(0.2, 0.65, front),
    );
    return Math.acos((y - 0.025) / 0.435);
  }

  function buildHairStrands(head: THREE.Group) {
    // Sweep along the scalp from the hairline over the crown; vary the widths
    // so the combed locks read as hair rather than a ribbed shell.
    const lanes = [
      -0.76, -0.62, -0.48, -0.34, -0.2, -0.06, 0.08, 0.22, 0.36, 0.5, 0.64,
      0.76,
    ];
    for (const [index, lane] of lanes.entries()) {
      const points: Point[] = [];
      for (let step = 0; step <= 24; step += 1) {
        const t = step / 24;
        const sweep = Math.sin(t * Math.PI) * 0.12;
        const x = lane - sweep;
        const span = Math.sqrt(1 - x * x);
        const limit = Math.acos(Math.min(1, 0.54 / span));
        const angle = THREE.MathUtils.lerp(limit, -limit, t);
        const y = Math.cos(angle) * span;
        const z = Math.sin(angle) * span;
        const point = hairPoint(Math.atan2(z, x), Math.acos(y));
        point[1] += 0.002;
        points.push(point);
      }
      const part = index === 9;
      const strand = taperedTube(
        `hair-lock-${index}`,
        points,
        [0.001, part ? 0.006 : 0.0045, part ? 0.005 : 0.0035, 0.001],
        0.6,
      );
      mesh(head, strand, part ? hairPart : hairHighlight);
    }
  }

  function buildHair(head: THREE.Group) {
    const scalp = geometry("combed-pompadour", () => {
      const vertices: number[] = [];
      const colors: number[] = [];
      const indices: number[] = [];
      const sides = 112;
      const rows = 56;
      for (let row = 0; row <= rows; row += 1) {
        for (let side = 0; side <= sides; side += 1) {
          const phi = (side / sides) * Math.PI * 2;
          const theta = (row / rows) * hairBoundary(phi);
          vertices.push(...hairPoint(phi, theta));
          colors.push(...hairColor(phi, theta).toArray());
          if (row < rows && side < sides) {
            const a = row * (sides + 1) + side;
            const b = a + sides + 1;
            indices.push(a, a + 1, b, b, a + 1, b + 1);
          }
        }
      }
      const result = new THREE.BufferGeometry();
      result.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      result.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      result.setIndex(indices);
      const joined = mergeVertices(result, 0.000_01);
      result.dispose();
      joined.computeVertexNormals();
      return joined;
    });
    mesh(head, scalp, scalpMaterial);
    buildHairStrands(head);
    for (const side of [-1, 1]) {
      ellipsoid(
        head,
        croppedHair,
        [side * 0.313, 0.005, -0.034],
        [0.006, 0.035, 0.03],
      );
    }
  }

  function buildEarbuds(head: THREE.Group) {
    for (const side of [-1, 1]) {
      ellipsoid(
        head,
        earbudWhite,
        [side * 0.35, -0.038, 0.015],
        [0.026, 0.032, 0.03],
      );
      rod(
        head,
        earbudWhite,
        [side * 0.352, -0.056, 0.025],
        [side * 0.36, -0.123, 0.037],
        0.011,
      );
      ellipsoid(
        head,
        earbudWhite,
        [side * 0.36, -0.123, 0.037],
        [0.011, 0.01, 0.011],
      );
      ellipsoid(
        head,
        earbudVent,
        [side * 0.375, -0.036, 0.017],
        [0.0025, 0.008, 0.011],
      );
    }
  }

  function buildHead(parent: THREE.Group) {
    const head = new THREE.Group();
    head.position.set(0, 2.415, -0.045);
    head.scale.set(0.66, 0.76, 0.7);
    parent.add(head);
    mesh(
      head,
      geometry("face", () => {
        const shape = new THREE.LatheGeometry(faceProfile, 64);
        const vertices = shape.getAttribute("position");
        for (let i = 0; i < vertices.count; i += 1) {
          const x = vertices.getX(i);
          const y = vertices.getY(i);
          const z = vertices.getZ(i);
          vertices.setZ(i, Math.sign(z) * faceDepth(x, y));
        }
        shape.computeVertexNormals();
        return shape;
      }),
      skin,
      [0, 0, 0],
      [1, 1, 1],
    );
    for (const side of [-1, 1]) {
      ellipsoid(
        head,
        skin,
        [side * 0.315, -0.045, -0.022],
        [0.035, 0.069, 0.031],
      );
      ellipsoid(
        head,
        skinShade,
        [side * 0.341, -0.043, -0.005],
        [0.009, 0.033, 0.017],
      );
    }
    const nose = loft("nose-bridge", [
      [-0.09, 0.001, 0.001, 0.263],
      [-0.075, 0.034, 0.023, 0.28],
      [-0.04, 0.027, 0.036, 0.283],
      [0.035, 0.016, 0.015, 0.27],
      [0.065, 0.001, 0.001, 0.263],
    ]);
    mesh(head, nose, skin);
    curve(
      head,
      skinShade,
      [
        [-0.06, -0.166, faceDepth(-0.06, -0.166) + 0.003],
        [0, -0.176, faceDepth(0, -0.176) + 0.004],
        [0.06, -0.166, faceDepth(0.06, -0.166) + 0.003],
      ],
      0.0055,
    );
    buildEyes(head);
    buildGlasses(head);
    buildHair(head);
    buildEarbuds(head);
    return head;
  }

  return { blinkingEyes, buildHead };
}
