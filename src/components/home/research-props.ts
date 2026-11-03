import type { ModelContext, Point } from "./scene-primitives";

import * as THREE from "three";
import { PALETTE } from "./scene-materials";

function repeatedDetails(
  parent: THREE.Object3D,
  shape: THREE.BufferGeometry,
  surface: THREE.Material,
  transforms: { position: Point; scale: Point; rotation?: Point }[],
) {
  const details = new THREE.InstancedMesh(shape, surface, transforms.length);
  const transform = new THREE.Object3D();
  for (const [index, item] of transforms.entries()) {
    transform.position.set(...item.position);
    transform.scale.set(...item.scale);
    transform.rotation.set(...(item.rotation ?? [0, 0, 0]));
    transform.updateMatrix();
    details.setMatrixAt(index, transform.matrix);
  }
  details.receiveShadow = true;
  parent.add(details);
}

function buildAgentNetwork(
  context: ModelContext,
  group: THREE.Group,
  accent: THREE.MeshPhysicalMaterial,
) {
  const { rounded, rod, ring, ellipsoid } = context;
  const { cream, paper, wood, ink, teal } = context.surfaces;
  const positions: Point[] = [
    [0, 0.17, 0],
    [-0.27, -0.09, 0.02],
    [0.27, -0.09, -0.02],
    [0.035, -0.35, 0.07],
  ];
  for (const [index, point] of positions.entries()) {
    const node = new THREE.Group();
    node.position.set(...point);
    group.add(node);
    rounded(node, index === 0 ? accent : cream, [0, 0, 0], [0.16, 0.16, 0.13]);
    rounded(node, ink, [0, 0.003, 0.066], [0.111, 0.092, 0.004]);
    for (const row of [-1, 0, 1]) {
      rounded(
        node,
        row === 1 ? teal : paper,
        [-0.011, row * 0.02 + 0.004, 0.069],
        [row === 0 ? 0.049 : 0.067, 0.006, 0.002],
      ).castShadow = false;
    }
    ellipsoid(node, teal, [0.057, -0.056, 0.068], [0.007, 0.007, 0.003]);
    if (index > 0) {
      rod(group, wood, positions[0], point, 0.012);
      const midpoint = positions[0].map(
        (value, axis) => (value + point[axis]) / 2,
      ) as Point;
      ellipsoid(group, accent, midpoint, [0.021, 0.021, 0.021]);
    }
  }
  ring(group, paper, 0.43, 0.006, [0, -0.08, -0.06]);
  const satellite = new THREE.Group();
  satellite.position.set(-0.43, -0.08, -0.06);
  group.add(satellite);
  ellipsoid(satellite, accent, [0, 0, 0], [0.028, 0.028, 0.028]);
}

function buildCamera(
  context: ModelContext,
  camera: THREE.Group,
  accent: THREE.MeshPhysicalMaterial,
) {
  const { rounded, mesh, ring, ellipsoid, cylinder, material, box } = context;
  const { cream, paper, ink, laptopMetal, laptopDark } = context.surfaces;
  const grip = material("#52605a", { clearcoat: 0, roughness: 0.95 });
  const opticalGlass = material("#142e32", {
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    metalness: 0.35,
    roughness: 0.12,
  });
  rounded(camera, cream, [0, 0, 0], [0.65, 0.44, 0.225]);
  rounded(camera, grip, [-0.244, -0.015, 0.117], [0.123, 0.335, 0.047]);
  rounded(camera, paper, [0, 0.201, 0], [0.59, 0.028, 0.2]);
  rounded(camera, paper, [0.16, 0.23, -0.02], [0.17, 0.065, 0.13]);
  rounded(camera, ink, [0.16, 0.235, -0.09], [0.111, 0.041, 0.012]);
  rounded(camera, opticalGlass, [0.16, 0.236, -0.097], [0.08, 0.024, 0.003]);
  rounded(camera, laptopMetal, [0.15, 0.27, -0.005], [0.062, 0.007, 0.044]);
  const barrel = mesh(
    camera,
    cylinder,
    ink,
    [0.045, 0, 0.17],
    [0.18, 0.17, 0.18],
  );
  barrel.rotation.x = Math.PI / 2;
  for (const z of [0.127, 0.15, 0.23, 0.26]) {
    ring(camera, z === 0.26 ? accent : laptopMetal, 0.176, 0.006, [
      0.045,
      0,
      z,
    ]);
  }
  ring(camera, accent, 0.149, 0.023, [0.045, 0, 0.267]);
  ring(camera, laptopDark, 0.125, 0.008, [0.045, 0, 0.277]);
  ellipsoid(camera, opticalGlass, [0.045, 0, 0.27], [0.122, 0.122, 0.016]);
  ring(camera, ink, 0.057, 0.008, [0.045, 0, 0.286]);
  const aperture = context.geometry(
    "camera-aperture",
    () => new THREE.CircleGeometry(0.047, 7),
  );
  mesh(camera, aperture, laptopDark, [0.045, 0, 0.289]);
  const glint = material("#80a9a0", {
    clearcoat: 1,
    metalness: 0.25,
    opacity: 0.37,
    roughness: 0.12,
    transparent: true,
  });
  ellipsoid(camera, glint, [0.012, 0.045, 0.287], [0.024, 0.038, 0.002]);
  ellipsoid(camera, accent, [-0.23, 0.12, 0.145], [0.023, 0.023, 0.01]);
  mesh(camera, cylinder, ink, [-0.217, 0.233, 0], [0.052, 0.03, 0.052]);
  mesh(
    camera,
    cylinder,
    laptopMetal,
    [-0.217, 0.252, 0],
    [0.035, 0.012, 0.035],
  );
  rounded(camera, paper, [-0.217, 0.26, 0], [0.005, 0.003, 0.026]);
  mesh(camera, cylinder, ink, [0.265, 0.229, -0.02], [0.029, 0.02, 0.029]);
  const knurl = Array.from({ length: 48 }, (_, index) => {
    const angle = (index / 48) * Math.PI * 2;
    return {
      position: [
        0.045 + Math.sin(angle) * 0.18,
        Math.cos(angle) * 0.18,
        0.193,
      ] as Point,
      rotation: [0, 0, -angle] as Point,
      scale: [0.006, 0.006, 0.056] as Point,
    };
  });
  repeatedDetails(camera, box, grip, knurl);
  repeatedDetails(
    camera,
    box,
    ink,
    Array.from({ length: 9 }, (_, index) => ({
      position: [-0.244, -0.136 + index * 0.03, 0.142] as Point,
      scale: [0.084, 0.007, 0.004] as Point,
    })),
  );
  for (const side of [-1, 1]) {
    const lug = ring(camera, laptopMetal, 0.02, 0.006, [
      side * 0.326,
      0.138,
      0,
    ]);
    lug.rotation.y = Math.PI / 2;
  }
  rounded(camera, ink, [0, -0.015, -0.117], [0.37, 0.28, 0.008]);
  rounded(camera, opticalGlass, [0, -0.015, -0.123], [0.335, 0.24, 0.003]);
}

function jointHub(context: ModelContext, parent: THREE.Group, position: Point) {
  const { mesh, cylinder, ring, rounded } = context;
  const { laptopMetal, ink, paper } = context.surfaces;
  for (const side of [-1, 1]) {
    const z = position[2] + side * 0.077;
    const cap = mesh(
      parent,
      cylinder,
      laptopMetal,
      [position[0], position[1], z],
      [0.048, 0.013, 0.048],
    );
    cap.rotation.x = Math.PI / 2;
    ring(parent, ink, 0.037, 0.004, [
      position[0],
      position[1],
      z + side * 0.008,
    ]);
    const pin = mesh(
      parent,
      cylinder,
      ink,
      [position[0], position[1], z + side * 0.008],
      [0.018, 0.014, 0.018],
    );
    pin.rotation.x = Math.PI / 2;
    rounded(
      parent,
      paper,
      [position[0], position[1], z + side * 0.017],
      [0.02, 0.003, 0.002],
    );
  }
}

function buildRobot(
  context: ModelContext,
  robot: THREE.Group,
  accent: THREE.MeshPhysicalMaterial,
) {
  const { mesh, cylinder, ellipsoid, rod, curve, rounded, ring, box } = context;
  const { cream, ink, laptopMetal } = context.surfaces;
  mesh(robot, cylinder, cream, [0, -0.31, 0], [0.245, 0.075, 0.22]);
  mesh(robot, cylinder, ink, [0, -0.354, 0], [0.22, 0.013, 0.196]);
  mesh(robot, cylinder, accent, [0, -0.265, 0], [0.116, 0.025, 0.116]);
  const baseRing = ring(robot, laptopMetal, 0.19, 0.004, [0, -0.27, 0]);
  baseRing.rotation.x = Math.PI / 2;
  for (const x of [-0.16, 0.16]) {
    for (const z of [-0.1, 0.1]) {
      mesh(robot, cylinder, ink, [x, -0.269, z], [0.012, 0.007, 0.012]);
    }
  }
  const robotShoulder = new THREE.Group();
  robotShoulder.position.set(0, -0.24, 0);
  robot.add(robotShoulder);
  ellipsoid(robotShoulder, accent, [0, 0, 0], [0.085, 0.085, 0.085]);
  jointHub(context, robotShoulder, [0, 0, 0]);
  rod(robotShoulder, cream, [0, 0, 0], [-0.13, 0.33, 0], 0.064);
  rod(
    robotShoulder,
    accent,
    [-0.024, 0.07, 0.047],
    [-0.107, 0.268, 0.047],
    0.017,
  );
  curve(
    robotShoulder,
    ink,
    [
      [0.036, 0.035, -0.07],
      [0.012, 0.155, -0.095],
      [-0.06, 0.287, -0.085],
      [-0.13, 0.33, -0.073],
    ],
    0.009,
  );
  const robotElbow = new THREE.Group();
  robotElbow.position.set(-0.13, 0.33, 0);
  robotShoulder.add(robotElbow);
  ellipsoid(robotElbow, accent, [0, 0, 0], [0.085, 0.085, 0.085]);
  jointHub(context, robotElbow, [0, 0, 0]);
  rod(robotElbow, cream, [0, 0, 0], [0.29, 0.1, 0.02], 0.055);
  rod(robotElbow, accent, [0.07, 0.025, 0.063], [0.24, 0.084, 0.077], 0.012);
  curve(
    robotElbow,
    ink,
    [
      [0.01, 0.045, -0.07],
      [0.1, 0.1, -0.086],
      [0.22, 0.13, -0.07],
      [0.29, 0.1, -0.02],
    ],
    0.007,
  );
  ellipsoid(robotElbow, accent, [0.29, 0.1, 0.02], [0.067, 0.067, 0.067]);
  const wristRing = ring(
    robotElbow,
    laptopMetal,
    0.049,
    0.005,
    [0.325, 0.1, 0.02],
  );
  wristRing.rotation.y = Math.PI / 2;
  for (const side of [-1, 1]) {
    curve(
      robotElbow,
      ink,
      [
        [0.32, 0.1, side * 0.035],
        [0.41, 0.04, side * 0.08],
        [0.44, -0.025, side * 0.045],
      ],
      0.018,
    );
    rounded(
      robotElbow,
      laptopMetal,
      [0.44, -0.022, side * 0.044],
      [0.032, 0.041, 0.019],
    );
    rounded(
      robotElbow,
      ink,
      [0.438, -0.025, side * 0.032],
      [0.027, 0.035, 0.008],
    );
  }
  repeatedDetails(
    robot,
    box,
    ink,
    Array.from({ length: 7 }, (_, i) => ({
      position: [-0.075 + i * 0.025, -0.305, 0.215] as Point,
      scale: [0.01, 0.023, 0.004] as Point,
    })),
  );
  return { robotElbow, robotShoulder };
}

export function createResearchProps(context: ModelContext) {
  const interests = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
  const accents = [
    context.material(PALETTE.accent),
    context.surfaces.teal.clone(),
    context.surfaces.wood.clone(),
  ];
  for (const accent of accents) context.materials.add(accent);
  buildAgentNetwork(context, interests[0], accents[0]);
  buildCamera(context, interests[1], accents[1]);
  const joints = buildRobot(context, interests[2], accents[2]);
  return { accents, interests, ...joints };
}
