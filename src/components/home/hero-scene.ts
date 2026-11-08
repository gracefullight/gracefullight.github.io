import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createAvatarAnimation } from "./avatar-animation";
import { createArmModel } from "./avatar-arms";
import { createClothingModel } from "./avatar-clothing";
import { createHeadModel } from "./avatar-head";
import { createPolyforkDressing } from "./polyfork-props";
import { batchSceneDetails } from "./scene-batching";
import { createScenePrimitives } from "./scene-primitives";
import { createMouseModel } from "./vertical-mouse";
import { createWorkstationModel } from "./workstation-model";

export type HeroSceneState = {
  pointerX: number;
  pointerY: number;
  typing: number;
  reducedMotion: boolean;
};

export type HeroSceneOptions = {
  /** Site base URL, used to resolve the self-hosted models. */
  baseUrl: string;
  /** Fires as streamed set dressing arrives, so a paused owner can redraw. */
  onAssetLoaded?: () => void;
};

/** Its owner supplies the animation frame and size events. */
export function createHeroScene(
  canvas: HTMLCanvasElement,
  { baseUrl, onAssetLoaded }: HeroSceneOptions,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x00_00_00, 0);
  const pixelRatio = () =>
    Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
  renderer.setPixelRatio(pixelRatio());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const context = createScenePrimitives();
  const { geometry, mesh, geometries, materials, textures, skeletons } =
    context;
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
  scene.environmentIntensity = 0.65;
  room.dispose();
  environmentGenerator.dispose();

  let disposed = false;
  let aspect = 1;
  let frameTime = 0;
  let elapsed = 0;
  let pendingTyping = false;
  let lastTyping = 0;
  let state: HeroSceneState = {
    pointerX: 0,
    pointerY: 0,
    reducedMotion: false,
    typing: 0,
  };
  const smoothed = { pointerX: 0, pointerY: 0 };

  scene.add(new THREE.HemisphereLight("#fff7e9", "#a7b5ad", 0.85));
  const key = new THREE.DirectionalLight("#fff2de", 2.6);
  key.position.set(-3.5, 6, 5);
  key.castShadow = true;
  const shadowResolution = window.innerWidth < 768 ? 1024 : 2048;
  key.shadow.mapSize.set(shadowResolution, shadowResolution);
  key.target.position.set(0, 1.25, 0);
  key.shadow.camera.left = -2.5;
  key.shadow.camera.right = 2.5;
  key.shadow.camera.top = 2.7;
  key.shadow.camera.bottom = -2.3;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 15;
  key.shadow.normalBias = 0.008;
  key.shadow.bias = -0.0002;
  key.shadow.radius = 4;
  scene.add(key, key.target);
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

  batchSceneDetails(world, new Set(typingKeys.map(({ key }) => key)), (shape) =>
    geometries.set(shape.uuid, shape),
  );
  const dressing = createPolyforkDressing(
    world,
    baseUrl,
    { geometries, materials },
    () => {
      if (!disposed) onAssetLoaded?.();
    },
  );
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  for (const texture of textures) texture.anisotropy = anisotropy;

  // A fixed three-quarter view; the pointer adds a little parallax.
  const CAMERA = { angle: 0.5, distance: 6.25, height: 2.65 };
  const lookAt = new THREE.Vector3(0, 1.43, 0);

  function positionCamera(motion: number) {
    const portraitFit = 1 / Math.min(aspect, 1);
    const distance = CAMERA.distance * portraitFit;
    const angle = CAMERA.angle + smoothed.pointerX * 0.06 * motion;
    camera.position.set(
      Math.sin(angle) * distance,
      CAMERA.height +
        (portraitFit - 1) * 0.1 -
        smoothed.pointerY * 0.06 * motion,
      Math.cos(angle) * distance,
    );
    camera.lookAt(lookAt);
  }

  function resize() {
    if (disposed) return;
    const { width, height } = canvas.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    aspect = width / height;
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }

  function update(next: HeroSceneState) {
    if (disposed) return;
    if (next.typing !== lastTyping) {
      pendingTyping = true;
      lastTyping = next.typing;
    }
    state = {
      ...next,
      pointerX: THREE.MathUtils.clamp(next.pointerX, -1, 1),
      pointerY: THREE.MathUtils.clamp(next.pointerY, -1, 1),
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
    avatarAnimation.update(
      elapsed,
      motion,
      smoothed.pointerX,
      smoothed.pointerY,
    );
    dressing.update(delta, motion);
    positionCamera(motion);
    renderer.render(scene, camera);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    dressing.dispose();
    scene.traverse((object) => {
      if (object instanceof THREE.InstancedMesh) object.dispose();
    });
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
