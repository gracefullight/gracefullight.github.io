import * as THREE from "three";
export const PALETTE = {
  accent: "#ac5d46",
  cream: "#f1eadb",
  denim: "#315c88",
  hair: "#202723",
  ink: "#303b3c",
  paper: "#dcd5c7",
  shirt: "#15171a",
  skin: "#dcb294",
  skinShade: "#ba8c74",
  teal: "#557b73",
  wood: "#87735d",
};

export function createSceneMaterials(
  material: (
    color: string,
    options?: THREE.MeshPhysicalMaterialParameters,
  ) => THREE.MeshPhysicalMaterial,
  textures: Set<THREE.Texture>,
) {
  const skin = material(PALETTE.skin, { clearcoat: 0, roughness: 0.88 });
  const skinShade = material(PALETTE.skinShade, { roughness: 0.8 });
  const hair = material(PALETTE.hair, {
    clearcoat: 0.03,
    clearcoatRoughness: 0.8,
    roughness: 0.82,
  });
  const croppedHair = material("#40423b", { clearcoat: 0, roughness: 0.95 });
  const scalpMaterial = material("#ffffff", {
    clearcoat: 0.02,
    roughness: 0.88,
    vertexColors: true,
  });
  const hairHighlight = material("#3e443e", {
    clearcoat: 0.04,
    roughness: 0.74,
  });
  const hairPart = material("#0c100e", { clearcoat: 0, roughness: 0.9 });
  const deskTop = material("#d9c5a5", { clearcoat: 0, roughness: 0.85 });
  const deskFrame = material("#3b4045", { metalness: 0.6, roughness: 0.6 });
  const earbudWhite = material("#f7f8f7", { clearcoat: 0.3, roughness: 0.3 });
  const earbudVent = material("#252b2d", { clearcoat: 0, roughness: 0.7 });
  const cream = material(PALETTE.cream, { roughness: 0.65 });
  const shirt = material(PALETTE.shirt, { clearcoat: 0, roughness: 0.94 });
  const shirtRib = material("#272a2d", { clearcoat: 0, roughness: 0.97 });
  const denim = material(PALETTE.denim, { clearcoat: 0, roughness: 0.96 });
  const ink = material(PALETTE.ink, { roughness: 0.77 });
  const teal = material(PALETTE.teal);
  const paper = material(PALETTE.paper, { roughness: 0.8 });
  const wool = material("#42464a", {
    clearcoat: 0,
    roughness: 1,
    sheen: 0.35,
    sheenRoughness: 1,
  });
  const shoeSole = material("#45494c", { clearcoat: 0, roughness: 0.95 });
  const shoeLace = material("#42464a", { clearcoat: 0, roughness: 1 });
  const shoeTrim = material("#34393c", { clearcoat: 0, roughness: 1 });
  const woolPixels = new Uint8Array(64 * 64 * 4);
  for (let i = 0; i < 64 * 64; i += 1) {
    const noise =
      Math.sin(i * 127.1 + Math.floor(i / 64) * 311.7) * 43_758.5453;
    const shade = 230 + Math.floor((noise - Math.floor(noise)) * 24);
    woolPixels.set([shade, shade, shade, 255], i * 4);
  }
  const woolTexture = new THREE.DataTexture(woolPixels, 64, 64);
  woolTexture.colorSpace = THREE.SRGBColorSpace;
  woolTexture.wrapS = THREE.RepeatWrapping;
  woolTexture.wrapT = THREE.RepeatWrapping;
  woolTexture.repeat.set(5, 2);
  woolTexture.needsUpdate = true;
  textures.add(woolTexture);
  wool.map = woolTexture;
  wool.bumpMap = woolTexture;
  wool.bumpScale = 0.001;
  const wood = material(PALETTE.wood, { roughness: 0.78 });
  const eye = material("#3c3129", { clearcoat: 0.35, roughness: 0.28 });
  const pupil = material("#242522", { roughness: 0.28 });
  const eyeWhite = material("#e9dfce", { roughness: 0.75 });
  const glasses = material("#ced4da", { metalness: 0.92, roughness: 0.23 });
  const laptopMetal = material("#c7c9cc", { metalness: 0.8, roughness: 0.3 });
  const laptopDark = material("#191c20", { roughness: 0.5 });
  const trackpad = material("#aeb2b7", { metalness: 0.75, roughness: 0.36 });
  const screen = material("#203730", {
    emissive: "#274239",
    emissiveIntensity: 0.13,
    roughness: 0.38,
  });

  return {
    cream,
    croppedHair,
    denim,
    deskFrame,
    deskTop,
    earbudVent,
    earbudWhite,
    eye,
    eyeWhite,
    glasses,
    hair,
    hairHighlight,
    hairPart,
    ink,
    laptopDark,
    laptopMetal,
    paper,
    pupil,
    scalpMaterial,
    screen,
    shirt,
    shirtRib,
    shoeLace,
    shoeSole,
    shoeTrim,
    skin,
    skinShade,
    teal,
    trackpad,
    wood,
    wool,
  };
}
