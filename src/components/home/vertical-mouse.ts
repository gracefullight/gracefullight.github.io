import type { ModelContext, Point } from "./scene-primitives";

import * as THREE from "three";
import { UP } from "./scene-primitives";
export function createMouseModel(context: ModelContext) {
  const {
    geometry,
    material,
    mesh,
    rounded,
    ellipsoid,
    curve,
    loft,
    cylinder,
  } = context;
  const { laptopDark } = context.surfaces;
  function buildMouseGrip(
    mouse: THREE.Group,
    body: THREE.BufferGeometry,
    shell: THREE.MeshPhysicalMaterial,
    gripGroove: THREE.MeshPhysicalMaterial,
    buttons: THREE.MeshPhysicalMaterial,
  ) {
    // Follow the curved rubber shell so grip lines and thumb buttons sit flush.
    const surface = new THREE.Mesh(body, shell);
    surface.updateMatrixWorld(true);
    const ray = new THREE.Raycaster();
    for (let stripe = 0; stripe < 14; stripe += 1) {
      const points: Point[] = [];
      for (let step = 0; step <= 10; step += 1) {
        const t = step / 10;
        const y = 0.035 + t * 0.105;
        const z = -0.076 + stripe * 0.0105 + Math.sin(t * Math.PI) * 0.008;
        ray.set(new THREE.Vector3(-0.2, y, z), new THREE.Vector3(1, 0, 0));
        const hit = ray.intersectObject(surface, false)[0];
        if (hit) points.push([hit.point.x - 0.0005, y, z]);
      }
      if (points.length > 2) curve(mouse, gripGroove, points, 0.000_65);
    }
    buildMouseThumbButtons(mouse, surface, buttons);
  }

  function buildMouseThumbButtons(
    mouse: THREE.Group,
    surface: THREE.Mesh,
    buttons: THREE.MeshPhysicalMaterial,
  ) {
    const ray = new THREE.Raycaster();
    for (const z of [-0.033, 0.001]) {
      ray.set(new THREE.Vector3(-0.2, 0.145, z), new THREE.Vector3(1, 0, 0));
      const hit = ray.intersectObject(surface, false)[0];
      if (hit?.face) {
        const button = rounded(
          mouse,
          buttons,
          [0, 0, 0],
          [0.014, 0.004, 0.027],
        );
        button.position.copy(hit.point).addScaledVector(hit.face.normal, 0.002);
        button.quaternion.setFromUnitVectors(UP, hit.face.normal);
      }
    }
  }

  function mouseButtonPatch(
    surface: THREE.Mesh,
    centerY: number,
    halfHeight: number,
    halfDepth: number,
  ) {
    const points: number[] = [];
    const indices: number[] = [];
    const ray = new THREE.Raycaster();
    for (let ring = 0; ring <= 8; ring += 1) {
      for (let step = 0; step <= 40; step += 1) {
        const angle = (step / 40) * Math.PI * 2;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const y =
          centerY +
          (Math.sign(cosine) * Math.abs(cosine) ** 0.35 * halfHeight * ring) /
            8;
        const z =
          0.012 +
          (Math.sign(sine) * Math.abs(sine) ** 0.35 * halfDepth * ring) / 8;
        ray.set(new THREE.Vector3(0.3, y, z), new THREE.Vector3(-1, 0, 0));
        const hit = ray.intersectObject(surface, false)[0];
        const point = hit.point
          .clone()
          .addScaledVector(hit.face?.normal ?? UP, 0.0007);
        points.push(point.x, point.y, point.z);
        if (ring < 8 && step < 40) {
          const a = ring * 41 + step;
          const b = a + 41;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3),
    );
    result.setIndex(indices);
    result.computeVertexNormals();
    return result;
  }

  function buildVerticalMouse(parent: THREE.Group) {
    const mouse = new THREE.Group();
    mouse.position.set(-0.46, 1.528, 0.39);
    mouse.scale.set(-0.88, 0.88, 0.88);
    parent.add(mouse);
    const shell = material("#454b4e", { clearcoat: 0, roughness: 0.9 });
    const buttons = material("#303639", { clearcoat: 0, roughness: 0.85 });
    const gripGroove = material("#343a3c", { clearcoat: 0, roughness: 1 });
    const topMetal = material("#858c8e", { metalness: 0.7, roughness: 0.45 });
    const body = loft(
      "vertical-mouse-body",
      [
        [0, 0.001, 0.001],
        [0.006, 0.065, 0.105],
        [0.035, 0.072, 0.105],
        [0.085, 0.063, 0.09, -0.006],
        [0.135, 0.042, 0.074, -0.015],
        [0.17, 0.033, 0.06, -0.02],
        [0.177, 0.031, 0.056, -0.02],
        [0.18, 0.001, 0.001, -0.02],
      ],
      0.9,
    );
    const vertices = body.getAttribute("position");
    for (let i = 0; i < vertices.count; i += 1) {
      vertices.setX(i, vertices.getX(i) + vertices.getY(i) * 0.3);
    }
    body.computeVertexNormals();
    mesh(mouse, body, shell);
    ellipsoid(mouse, laptopDark, [0, 0.006, 0], [0.068, 0.006, 0.104]);
    ellipsoid(mouse, shell, [-0.046, 0.026, 0.002], [0.038, 0.018, 0.088]);
    ellipsoid(mouse, topMetal, [0.052, 0.178, -0.02], [0.033, 0.004, 0.057]);
    rounded(mouse, buttons, [0.052, 0.182, -0.047], [0.02, 0.004, 0.025]);

    buildMouseGrip(mouse, body, shell, gripGroove, buttons);
    const surface = new THREE.Mesh(body, shell);
    surface.updateMatrixWorld(true);
    for (const [index, y] of [0.088, 0.131].entries()) {
      const button = geometry(`mouse-button-${index}`, () =>
        mouseButtonPatch(surface, y, 0.015, index === 0 ? 0.046 : 0.035),
      );
      mesh(mouse, button, buttons);
    }
    rounded(mouse, laptopDark, [0.005, 0.024, 0.104], [0.025, 0.012, 0.004]);
    rounded(mouse, topMetal, [0.005, 0.024, 0.107], [0.016, 0.003, 0.002]);
    const controls = new THREE.Group();
    const ray = new THREE.Raycaster(
      new THREE.Vector3(0.3, 0.11, 0.006),
      new THREE.Vector3(-1, 0, 0),
    );
    const hit = ray.intersectObject(surface, false)[0];
    controls.position.copy(hit.point);
    controls.quaternion.setFromUnitVectors(UP, hit.face?.normal ?? UP);
    mouse.add(controls);
    rounded(controls, laptopDark, [0, 0.003, 0.022], [0.013, 0.003, 0.023]);
    const wheel = mesh(
      controls,
      cylinder,
      laptopDark,
      [0, 0.008, 0.022],
      [0.006, 0.01, 0.006],
    );
    wheel.rotation.z = Math.PI / 2;
    for (let tooth = 0; tooth < 12; tooth += 1) {
      const angle = (tooth / 12) * Math.PI * 2;
      const tread = rounded(
        controls,
        gripGroove,
        [0, 0.008 + Math.cos(angle) * 0.006, 0.022 + Math.sin(angle) * 0.006],
        [0.009, 0.0008, 0.001],
      );
      tread.rotation.x = angle;
    }
  }

  return { buildVerticalMouse };
}
