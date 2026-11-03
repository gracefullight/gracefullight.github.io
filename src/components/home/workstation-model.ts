import type { ModelContext } from "./scene-primitives";

import * as THREE from "three";
import { UP } from "./scene-primitives";
import { createWorkstationTextures } from "./workstation-textures";
export function createWorkstationModel(context: ModelContext) {
  const { geometry, material, mesh, rounded, ring, rod, curve } = context;
  const { deskTop, deskFrame, laptopMetal, laptopDark, trackpad, screen } =
    context.surfaces;
  const typingKeys: { key: THREE.Object3D; side: number }[] = [];
  const artwork = createWorkstationTextures(context);
  const rubber = material("#30383a", { clearcoat: 0, roughness: 0.96 });
  const hardware = material("#889396", { metalness: 0.8, roughness: 0.32 });

  function decal(
    parent: THREE.Group,
    texture: THREE.Texture,
    position: [number, number, number],
    size: [number, number],
  ) {
    const surface = new THREE.MeshBasicMaterial({
      depthWrite: false,
      map: texture,
      transparent: true,
    });
    context.materials.add(surface);
    const result = mesh(
      parent,
      geometry(
        `decal-${size.join("-")}`,
        () => new THREE.PlaneGeometry(...size),
      ),
      surface,
      position,
    );
    result.castShadow = false;
    result.receiveShadow = false;
    return result;
  }

  function buildStandingDesk(parent: THREE.Group) {
    rounded(parent, deskTop, [0, 1.5, 0.51], [1.46, 0.055, 0.82]);
    rounded(parent, deskFrame, [0, 1.425, 0.5], [1.22, 0.075, 0.09]);
    for (const side of [-1, 1]) {
      const x = side * 0.61;
      rounded(parent, deskFrame, [x, 0.06, 0.5], [0.105, 0.065, 0.76]);
      rounded(parent, deskFrame, [x, 0.55, 0.5], [0.075, 0.99, 0.085]);
      rounded(parent, laptopMetal, [x, 1.18, 0.5], [0.055, 0.56, 0.065]);
      rounded(parent, deskFrame, [x, 1.455, 0.51], [0.08, 0.035, 0.65]);
      // Telescoping collars, adjustable feet and recessed attachment hardware.
      rounded(parent, rubber, [x, 1.04, 0.5], [0.08, 0.014, 0.09]);
      for (const z of [0.2, 0.8]) {
        rounded(parent, rubber, [x, 0.021, z], [0.076, 0.02, 0.082]);
        rod(parent, hardware, [x, 0.04, z], [x, 0.05, z], 0.012);
        const bolt = ring(parent, hardware, 0.009, 0.002, [x, 1.436, z]);
        bolt.rotation.x = Math.PI / 2;
      }
      for (const z of [0.477, 0.523]) {
        const bolt = ring(parent, hardware, 0.007, 0.002, [
          x + side * 0.039,
          0.99,
          z,
        ]);
        bolt.rotation.y = Math.PI / 2;
      }
    }
    // Height control faces the person at the near edge.
    rounded(parent, laptopDark, [0.48, 1.455, 0.12], [0.19, 0.038, 0.055]);
    rounded(parent, screen, [0.45, 1.455, 0.091], [0.065, 0.018, 0.003]);
    const display = decal(
      parent,
      artwork.heightDisplay(),
      [0.45, 1.455, 0.0892],
      [0.06, 0.016],
    );
    display.rotation.y = Math.PI;
    for (const x of [0.51, 0.55]) {
      rounded(parent, laptopMetal, [x, 1.455, 0.09], [0.015, 0.01, 0.003]);
    }
    rounded(parent, deskFrame, [0, 1.39, 0.81], [0.74, 0.06, 0.12]);
    rounded(parent, rubber, [0.1, 1.41, 0.81], [0.32, 0.027, 0.075]);
    curve(
      parent,
      rubber,
      [
        [-0.34, 1.825, 0.78],
        [-0.4, 1.79, 0.81],
        [-0.44, 1.6, 0.88],
        [-0.41, 1.43, 0.91],
        [-0.24, 1.4, 0.84],
        [0.1, 1.41, 0.81],
      ],
      0.004,
    );
    curve(
      parent,
      rubber,
      [
        [0.23, 1.4, 0.82],
        [0.48, 1.35, 0.82],
        [0.61, 1.17, 0.57],
        [0.65, 0.86, 0.54],
        [0.65, 0.25, 0.54],
        [0.63, 0.08, 0.61],
      ],
      0.005,
    );
    for (const y of [0.43, 0.74, 1.02]) {
      rounded(parent, deskFrame, [0.65, y, 0.54], [0.017, 0.018, 0.024]);
    }
  }

  function buildLaptopStand(parent: THREE.Group) {
    rounded(parent, laptopMetal, [0, 1.54, 0.72], [0.49, 0.018, 0.36]);
    for (const side of [-1, 1]) {
      const start = new THREE.Vector3(side * 0.21, 1.55, 0.62);
      const end = new THREE.Vector3(side * 0.21, 1.79, 0.79);
      const direction = end.clone().sub(start);
      const brace = rounded(
        parent,
        laptopMetal,
        [0, 0, 0],
        [0.034, direction.length(), 0.065],
      );
      brace.position.copy(start.add(end).multiplyScalar(0.5));
      brace.quaternion.setFromUnitVectors(UP, direction.normalize());
    }
    const support = new THREE.Group();
    support.position.set(0, 1.8, 0.72);
    support.rotation.x = -0.12;
    parent.add(support);
    rounded(support, laptopMetal, [0, 0, 0], [0.59, 0.018, 0.36]);
    for (const side of [-1, 1]) {
      rounded(
        support,
        laptopDark,
        [side * 0.22, 0.012, 0.01],
        [0.06, 0.005, 0.26],
      );
      rounded(
        support,
        laptopMetal,
        [side * 0.22, 0.015, -0.19],
        [0.06, 0.04, 0.025],
      );
      const pivot = rod(
        parent,
        hardware,
        [side * 0.187, 1.77, 0.78],
        [side * 0.233, 1.77, 0.78],
        0.014,
      );
      pivot.castShadow = false;
    }
  }

  function buildMagicKeyboard(parent: THREE.Group) {
    const keyboard = new THREE.Group();
    keyboard.position.set(0, 1.542, 0.4);
    parent.add(keyboard);
    const keys = material("#f2f4f4", { clearcoat: 0.06, roughness: 0.7 });
    rounded(keyboard, laptopMetal, [0, 0, 0], [0.65, 0.018, 0.245]);
    rounded(keyboard, trackpad, [0, 0.009, 0], [0.615, 0.002, 0.22]);
    const rows = [14, 14, 14, 13, 12];
    const keyRows: THREE.Object3D[][] = rows.map(() => []);
    const labels = [
      ["esc", "☀", "☀", "▦", "⌕", "◉", "☾", "◀", "▶", "▶", "◖", "◗", "◗", "⏻"],
      ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "−", "=", "⌫"],
      ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
      ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "↵"],
      ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"],
    ];
    const legends: { label: string; x: number; z: number }[] = [];
    for (const [row, count] of rows.entries()) {
      const offset = Math.max(0, row - 1) * 0.009;
      for (let column = 0; column < count; column += 1) {
        const key = rounded(
          keyboard,
          keys,
          [-0.278 + offset + column * 0.041, 0.013, 0.091 - row * 0.035],
          [0.035, 0.006, row === 0 ? 0.023 : 0.029],
        );
        keyRows[row].push(key);
        legends.push({
          label: labels[row][column],
          x: key.position.x,
          z: key.position.z,
        });
      }
    }
    typingKeys.push(
      { key: keyRows[0][3], side: -1 },
      { key: keyRows[0][11], side: 1 },
    );
    const modifiers = ["fn", "⌃", "⌥", "⌘", "⌥", "◀", "▶"];
    for (const [index, x] of [
      -0.278, -0.237, -0.196, 0.147, 0.188, 0.229, 0.27,
    ].entries()) {
      rounded(keyboard, keys, [x, 0.013, -0.087], [0.035, 0.006, 0.029]);
      legends.push({ label: modifiers[index], x, z: -0.087 });
    }
    rounded(keyboard, keys, [-0.025, 0.013, -0.087], [0.25, 0.006, 0.029]);
    decal(
      keyboard,
      artwork.legends(legends),
      [0, 0.0165, 0],
      [0.65, 0.245],
    ).rotation.x = -Math.PI / 2;
    const touchId = ring(
      keyboard,
      trackpad,
      0.009,
      0.0015,
      [0.255, 0.017, 0.091],
    );
    touchId.rotation.x = -Math.PI / 2;
  }

  function buildSpeakerGrille(laptop: THREE.Group, side: number) {
    const perforationShape = geometry(
      "speaker-perforation",
      () => new THREE.CircleGeometry(0.0012, 6),
    );
    for (let row = 0; row < 20; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        const perforation = mesh(laptop, perforationShape, laptopDark, [
          side * (0.29 + column * 0.006),
          0.0135,
          -0.047 + row * 0.0095,
        ]);
        perforation.rotation.x = -Math.PI / 2;
        perforation.castShadow = false;
      }
    }
  }

  function buildLaptopBaseDetails(laptop: THREE.Group) {
    for (let row = 0; row < 5; row += 1) {
      for (let column = 0; column < 14; column += 1) {
        rounded(
          laptop,
          laptopDark,
          [-0.245 + column * 0.0375, 0.017, 0.127 - row * 0.039],
          [0.032, 0.005, 0.032],
        );
      }
    }
    rounded(laptop, laptopDark, [0, 0.017, -0.073], [0.22, 0.005, 0.022]);
    rounded(laptop, trackpad, [0, 0.012, -0.135], [0.25, 0.002, 0.1]);
    rounded(laptop, laptopDark, [0, 0.014, 0.192], [0.57, 0.014, 0.018]);
    for (const side of [-1, 1]) {
      rounded(
        laptop,
        trackpad,
        [side * 0.297, 0.012, 0.045],
        [0.026, 0.002, 0.215],
      );
      for (const z of [-0.13, -0.06]) {
        rounded(
          laptop,
          laptopDark,
          [side * 0.3405, 0.001, z],
          [0.002, 0.009, 0.025],
        );
        rounded(
          laptop,
          hardware,
          [side * 0.3417, 0.001, z],
          [0.001, 0.003, 0.015],
        );
      }
      rod(
        laptop,
        hardware,
        [side * 0.22 - 0.045, 0.006, 0.195],
        [side * 0.22 + 0.045, 0.006, 0.195],
        0.014,
      );
      buildSpeakerGrille(laptop, side);
    }
  }

  function buildLaptop(parent: THREE.Group) {
    const laptop = new THREE.Group();
    laptop.position.set(0, 1.825, 0.72);
    laptop.rotation.x = -0.12;
    parent.add(laptop);
    rounded(laptop, laptopMetal, [0, 0, 0], [0.68, 0.022, 0.43]);
    rounded(laptop, laptopDark, [0, 0.013, 0.045], [0.53, 0.005, 0.215]);
    buildLaptopBaseDetails(laptop);
    const lid = new THREE.Group();
    lid.position.set(0, 0.014, 0.2);
    lid.rotation.x = 0.2;
    laptop.add(lid);
    rounded(lid, laptopMetal, [0, 0.205, 0], [0.68, 0.41, 0.021]);
    rounded(lid, laptopDark, [0, 0.205, -0.012], [0.652, 0.382, 0.003]);
    rounded(lid, screen, [0, 0.208, -0.014], [0.625, 0.35, 0.002]);
    const editorTexture = artwork.editor();
    const display = material("#ffffff", {
      clearcoat: 0.18,
      emissive: "#ffffff",
      emissiveIntensity: 0.35,
      emissiveMap: editorTexture,
      map: editorTexture,
      roughness: 0.42,
    });
    const displayPanel = mesh(
      lid,
      geometry("laptop-display", () => new THREE.PlaneGeometry(0.625, 0.35)),
      display,
      [0, 0.208, -0.0152],
    );
    displayPanel.rotation.y = Math.PI;
    displayPanel.castShadow = false;
    rounded(lid, laptopDark, [0, 0.379, -0.016], [0.07, 0.015, 0.002]);
    const webcam = mesh(
      lid,
      context.sphere,
      hardware,
      [0, 0.382, -0.0175],
      [0.0025, 0.0025, 0.001],
    );
    webcam.castShadow = false;
    for (const side of [-1, 1]) {
      for (const y of [0.024, 0.386]) {
        const screw = ring(lid, hardware, 0.0025, 0.0006, [
          side * 0.316,
          y,
          0.0108,
        ]);
        screw.castShadow = false;
      }
    }
    const logo = geometry("macbook-apple-mark", () => {
      const apple = new THREE.Shape();
      apple.moveTo(0, 0.32);
      apple.bezierCurveTo(-0.15, 0.42, -0.35, 0.44, -0.44, 0.24);
      apple.bezierCurveTo(-0.62, -0.02, -0.4, -0.48, -0.21, -0.51);
      apple.bezierCurveTo(-0.12, -0.53, -0.04, -0.45, 0.04, -0.45);
      apple.bezierCurveTo(0.12, -0.45, 0.21, -0.53, 0.3, -0.49);
      apple.bezierCurveTo(0.41, -0.42, 0.48, -0.26, 0.52, -0.14);
      apple.bezierCurveTo(0.22, -0.05, 0.2, 0.22, 0.47, 0.32);
      apple.bezierCurveTo(0.32, 0.5, 0.15, 0.43, 0, 0.32);
      const leaf = new THREE.Shape();
      leaf.moveTo(0.03, 0.39);
      leaf.bezierCurveTo(0.04, 0.62, 0.21, 0.72, 0.32, 0.72);
      leaf.bezierCurveTo(0.32, 0.53, 0.19, 0.4, 0.03, 0.39);
      return new THREE.ShapeGeometry([apple, leaf], 24);
    });
    mesh(lid, logo, laptopDark, [0, 0.196, 0.012], [0.075, 0.075, 0.075]);
  }

  return {
    buildLaptop,
    buildLaptopStand,
    buildMagicKeyboard,
    buildStandingDesk,
    typingKeys,
  };
}
