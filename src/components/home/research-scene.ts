import type { Point } from "./scene-primitives";

import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createAvatarAnimation } from "./avatar-animation";
import { createArmModel } from "./avatar-arms";
import { createClothingModel } from "./avatar-clothing";
import { createHeadModel } from "./avatar-head";
import { PALETTE } from "./scene-materials";
import { createScenePrimitives, smoothstep } from "./scene-primitives";
import { createMouseModel } from "./vertical-mouse";
import { createWorkstationModel } from "./workstation-model";

export type ResearchSceneState = {
  progress: number;
  pointerX: number;
  pointerY: number;
  activeInterest: number;
  typing: number;
  reducedMotion: boolean;
};

/** Its owner supplies the animation frame and size events. */
export function createResearchScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x00_00_00, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const context = createScenePrimitives();
  const {
    geometry,
    material,
    mesh,
    rounded,
    ellipsoid,
    rod,
    curve,
    ring,
    cylinder,
    geometries,
    materials,
    textures,
    skeletons,
  } = context;
  const { cream, ink, teal, paper, wood, screen } = context.surfaces;
  const { buildHead, blinkingEyes } = createHeadModel(context);
  const { buildLegs, buildTorso } = createClothingModel(context);
  const { buildArm, buildWatch } = createArmModel(context);
  const {
    buildStandingDesk,
    buildLaptopStand,
    buildLaptop,
    buildMagicKeyboard,
    typingKeys,
  } = createWorkstationModel(context);
  const { buildVerticalMouse } = createMouseModel(context);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  const room = new RoomEnvironment();
  const environmentGenerator = new THREE.PMREMGenerator(renderer);
  const environment = environmentGenerator.fromScene(room, 0.065);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.55;
  room.dispose();
  environmentGenerator.dispose();

  let disposed = false;
  let aspect = 1;
  let frameTime = 0;
  let elapsed = 0;
  let pendingTyping = false;
  let lastTyping = 0;
  let state: ResearchSceneState = {
    activeInterest: 0,
    pointerX: 0,
    pointerY: 0,
    progress: 0,
    reducedMotion: false,
    typing: 0,
  };
  const smoothed = { pointerX: 0, pointerY: 0, progress: 0 };

  scene.add(new THREE.HemisphereLight("#fff7e9", "#a7b5ad", 0.85));
  const key = new THREE.DirectionalLight("#fff2de", 2.6);
  key.position.set(-3.5, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -3;
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.0002;
  key.shadow.radius = 4;
  scene.add(key);
  const rim = new THREE.DirectionalLight("#e6f2ed", 1.6);
  rim.position.set(4, 3, -3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight("#ffffff", 0.5);
  fill.position.set(1, 3, 5);
  scene.add(fill);

  const world = new THREE.Group();
  world.position.y = -0.03;
  scene.add(world);

  function buildGround() {
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const context = shadowCanvas.getContext("2d");
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 64);
      gradient.addColorStop(0, "rgba(45, 48, 39, 0.2)");
      gradient.addColorStop(0.5, "rgba(45, 48, 39, 0.08)");
      gradient.addColorStop(1, "rgba(45, 48, 39, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
      const texture = new THREE.CanvasTexture(shadowCanvas);
      textures.add(texture);
      const surface = new THREE.MeshBasicMaterial({
        depthWrite: false,
        map: texture,
        transparent: true,
      });
      materials.add(surface);
      const contact = mesh(
        world,
        geometry("contact", () => new THREE.PlaneGeometry(4, 3.2)),
        surface,
        [0, 0.005, 0],
      );
      contact.rotation.x = -Math.PI / 2;
      contact.castShadow = false;
      contact.receiveShadow = false;
    }
    const surface = new THREE.ShadowMaterial({
      color: "#4d5c52",
      opacity: 0.105,
    });
    materials.add(surface);
    const ground = mesh(
      world,
      geometry("ground", () => new THREE.PlaneGeometry(15, 15)),
      surface,
      [0, 0.009, 0],
    );
    ground.rotation.x = -Math.PI / 2;
    ground.castShadow = false;
  }
  buildGround();

  const figure = new THREE.Group();
  world.add(figure);
  buildStandingDesk(figure);
  buildLegs(figure);
  const torso = buildTorso(figure);
  const head = buildHead(figure);
  const rightArm = buildArm(figure, -1);
  buildWatch(rightArm.hand);
  const leftArm = buildArm(figure, 1);
  buildLaptopStand(figure);
  buildLaptop(figure);
  buildMagicKeyboard(figure);
  buildVerticalMouse(figure);
  const avatarAnimation = createAvatarAnimation({
    blinkingEyes,
    figure,
    head,
    leftArm,
    rightArm,
    torso,
    typingKeys,
  });

  const interests = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
  const accents = [material(PALETTE.accent), teal.clone(), wood.clone()];
  for (const accent of accents) materials.add(accent);
  for (const group of interests) world.add(group);

  function buildAgents() {
    const positions: Point[] = [
      [0, 0.17, 0],
      [-0.27, -0.09, 0.02],
      [0.27, -0.09, -0.02],
      [0.035, -0.35, 0.07],
    ];
    for (const [index, point] of positions.entries()) {
      rounded(
        interests[0],
        index === 0 ? accents[0] : cream,
        point,
        [0.16, 0.16, 0.13],
      );
      if (index > 0) rod(interests[0], wood, positions[0], point, 0.012);
    }
    ring(interests[0], paper, 0.43, 0.006, [0, -0.08, -0.06]);
  }
  buildAgents();
  rounded(interests[1], cream, [0, 0, 0], [0.65, 0.44, 0.225]);
  rounded(interests[1], paper, [0.16, 0.23, -0.02], [0.17, 0.065, 0.13]);
  const barrel = mesh(
    interests[1],
    cylinder,
    ink,
    [0.045, 0, 0.17],
    [0.18, 0.17, 0.18],
  );
  barrel.rotation.x = Math.PI / 2;
  ring(interests[1], accents[1], 0.149, 0.023, [0.045, 0, 0.267]);
  ellipsoid(interests[1], screen, [0.045, 0, 0.27], [0.126, 0.126, 0.016]);
  ellipsoid(interests[1], teal, [0.012, 0.041, 0.288], [0.031, 0.039, 0.003]);
  ellipsoid(
    interests[1],
    accents[1],
    [-0.23, 0.12, 0.121],
    [0.023, 0.023, 0.01],
  );

  mesh(interests[2], cylinder, cream, [0, -0.31, 0], [0.245, 0.075, 0.22]);
  const robotShoulder = new THREE.Group();
  robotShoulder.position.set(0, -0.24, 0);
  interests[2].add(robotShoulder);
  ellipsoid(robotShoulder, accents[2], [0, 0, 0], [0.085, 0.085, 0.085]);
  rod(robotShoulder, cream, [0, 0, 0], [-0.13, 0.33, 0], 0.064);
  const robotElbow = new THREE.Group();
  robotElbow.position.set(-0.13, 0.33, 0);
  robotShoulder.add(robotElbow);
  ellipsoid(robotElbow, accents[2], [0, 0, 0], [0.085, 0.085, 0.085]);
  rod(robotElbow, cream, [0, 0, 0], [0.29, 0.1, 0.02], 0.055);
  ellipsoid(robotElbow, accents[2], [0.29, 0.1, 0.02], [0.067, 0.067, 0.067]);
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
  }

  const introPositions = [
    new THREE.Vector3(-1.08, 2.1, 0.04),
    new THREE.Vector3(1.05, 2.16, -0.18),
    new THREE.Vector3(1.12, 0.79, 0.14),
  ];
  const focusPositions = [
    new THREE.Vector3(-1.45, 1.75, 0.66),
    new THREE.Vector3(0.85, 1.88, 0.95),
    new THREE.Vector3(1.5, 1.18, 0.69),
  ];
  const lookAt = new THREE.Vector3();
  const cameraPoses = [
    {
      angle: 0.5,
      at: 0,
      distance: 6.25,
      height: 2.65,
      targetX: 0,
      targetY: 1.43,
    },
    {
      angle: 0.5,
      at: 0.15,
      distance: 6.25,
      height: 2.65,
      targetX: 0,
      targetY: 1.43,
    },
    {
      angle: 0.02,
      at: 0.28,
      distance: 5.05,
      height: 2.24,
      targetX: 0.22,
      targetY: 1.42,
    },
    {
      angle: 0.02,
      at: 0.42,
      distance: 5.05,
      height: 2.24,
      targetX: 0.22,
      targetY: 1.42,
    },
    {
      angle: -0.55,
      at: 0.55,
      distance: 5.3,
      height: 2.4,
      targetX: -0.24,
      targetY: 1.4,
    },
    {
      angle: -0.55,
      at: 0.69,
      distance: 5.3,
      height: 2.4,
      targetX: -0.24,
      targetY: 1.4,
    },
    {
      angle: 0.66,
      at: 0.82,
      distance: 5.25,
      height: 2.16,
      targetX: 0.3,
      targetY: 1.3,
    },
    {
      angle: 0.77,
      at: 1,
      distance: 5.05,
      height: 2.1,
      targetX: 0.3,
      targetY: 1.3,
    },
  ];

  function focusWeights(progress: number) {
    const vision =
      smoothstep(0.16, 0.28, progress) * (1 - smoothstep(0.43, 0.55, progress));
    const agents =
      smoothstep(0.43, 0.55, progress) * (1 - smoothstep(0.7, 0.82, progress));
    const robotics = smoothstep(0.7, 0.82, progress);
    return [agents, vision, robotics];
  }

  function animateInterests(progress: number, motion: number, ease: number) {
    const weights = focusWeights(progress);
    for (const [index, group] of interests.entries()) {
      const focus = weights[index];
      const selected = index === state.activeInterest;
      const targetScale =
        THREE.MathUtils.lerp(0.65, 1.27, focus) * (selected ? 1.04 : 1);
      group.scale.setScalar(
        THREE.MathUtils.lerp(group.scale.x, targetScale, ease),
      );
      group.position
        .copy(introPositions[index])
        .lerp(focusPositions[index], focus);
      group.position.y += Math.sin(elapsed * 0.7 + index * 2) * 0.018 * motion;
      group.rotation.y =
        -0.12 + Math.sin(elapsed * 0.35 + index) * 0.06 * motion;
      group.rotation.z = Math.sin(elapsed * 0.45 + index) * 0.016 * motion;
      accents[index].emissive.set(selected ? "#4d4232" : "#000000");
      accents[index].emissiveIntensity = selected ? 0.09 : 0;
    }
    robotShoulder.rotation.y = Math.sin(elapsed * 0.55) * 0.13 * motion;
    robotElbow.rotation.z = Math.sin(elapsed * 0.65) * 0.08 * motion;
  }

  function positionCamera(progress: number, motion: number) {
    const index = Math.max(
      0,
      cameraPoses.findIndex((pose) => pose.at >= progress) - 1,
    );
    const first = cameraPoses[index];
    const next = cameraPoses[index + 1];
    const amount = smoothstep(first.at, next.at, progress);
    const blend = (
      property: "angle" | "distance" | "height" | "targetX" | "targetY",
    ) => THREE.MathUtils.lerp(first[property], next[property], amount);
    const angle = blend("angle");
    const portraitFit = 1 / Math.min(aspect, 1);
    const distance = blend("distance") * portraitFit;
    camera.position.set(
      Math.sin(angle) * distance + smoothed.pointerX * 0.045 * motion,
      blend("height") + (portraitFit - 1) * 0.1,
      Math.cos(angle) * distance,
    );
    lookAt.set(blend("targetX"), blend("targetY"), 0);
    camera.lookAt(lookAt);
  }

  function resize() {
    if (disposed) return;
    const { width, height } = canvas.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    aspect = width / height;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }

  function update(next: ResearchSceneState) {
    if (disposed) return;
    if (next.typing !== lastTyping) {
      pendingTyping = true;
      lastTyping = next.typing;
    }
    state = {
      ...next,
      pointerX: THREE.MathUtils.clamp(next.pointerX, -1, 1),
      pointerY: THREE.MathUtils.clamp(next.pointerY, -1, 1),
      progress: THREE.MathUtils.clamp(next.progress, 0, 1),
    };
  }

  function render(time: number) {
    if (disposed) return;
    const delta = frameTime
      ? THREE.MathUtils.clamp((time - frameTime) / 1000, 0, 0.05)
      : 1 / 60;
    frameTime = time;
    elapsed += delta;
    const ease = state.reducedMotion ? 1 : 1 - Math.exp(-delta * 8);
    smoothed.progress = THREE.MathUtils.lerp(
      smoothed.progress,
      state.progress,
      ease,
    );
    smoothed.pointerX = THREE.MathUtils.lerp(
      smoothed.pointerX,
      state.pointerX,
      ease,
    );
    smoothed.pointerY = THREE.MathUtils.lerp(
      smoothed.pointerY,
      state.pointerY,
      ease,
    );
    if (pendingTyping) {
      avatarAnimation.startTyping(elapsed);
      pendingTyping = false;
    }
    const motion = state.reducedMotion ? 0 : 1;
    const progress = state.reducedMotion ? 0 : smoothed.progress;
    avatarAnimation.update(
      elapsed,
      motion,
      smoothed.pointerX,
      smoothed.pointerY,
    );
    animateInterests(progress, motion, ease);
    positionCamera(progress, motion);
    renderer.render(scene, camera);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    for (const shape of geometries.values()) shape.dispose();
    for (const surface of materials) surface.dispose();
    for (const texture of textures) texture.dispose();
    for (const skeleton of skeletons) skeleton.dispose();
    environment.dispose();
    key.shadow.map?.dispose();
    scene.clear();
    renderer.renderLists.dispose();
    renderer.dispose();
  }

  resize();
  return { dispose, render, resize, update };
}
