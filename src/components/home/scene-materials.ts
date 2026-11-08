import type * as THREE from "three";

import { createSurfaceTextures } from "./surface-textures";
export const PALETTE = {
  accent: "#ac5d46",
  cream: "#f1eadb",
  denim: "#315c88",
  hair: "#1e2021",
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
  const fabric = createSurfaceTextures(textures);
  const skin = material(PALETTE.skin, {
    bumpMap: fabric.pores,
    bumpScale: 0.000_45,
    clearcoat: 0,
    roughness: 0.78,
  });
  const skinShade = material(PALETTE.skinShade, { roughness: 0.8 });
  const hair = material(PALETTE.hair, {
    clearcoat: 0.03,
    clearcoatRoughness: 0.8,
    roughness: 0.82,
  });
  const croppedHair = material("#3b3a38", { clearcoat: 0, roughness: 0.95 });
  const scalpMaterial = material("#ffffff", {
    clearcoat: 0.02,
    roughness: 0.88,
    vertexColors: true,
  });
  const hairHighlight = material("#2f3233", {
    clearcoat: 0.04,
    roughness: 0.74,
  });
  const hairPart = material("#111314", { clearcoat: 0, roughness: 0.9 });
  const deskTop = material("#dfcbaa", {
    bumpMap: fabric.oak,
    bumpScale: 0.0012,
    clearcoat: 0.12,
    clearcoatRoughness: 0.75,
    map: fabric.oak,
    roughness: 0.65,
  });
  const deskFrame = material("#3b4045", { metalness: 0.6, roughness: 0.6 });
  const earbudWhite = material("#f7f8f7", { clearcoat: 0.3, roughness: 0.3 });
  const earbudVent = material("#252b2d", { clearcoat: 0, roughness: 0.7 });
  const cream = material(PALETTE.cream, { roughness: 0.65 });
  const shirt = material(PALETTE.shirt, {
    bumpMap: fabric.jersey,
    bumpScale: 0.0008,
    clearcoat: 0,
    map: fabric.jersey,
    roughness: 0.94,
    sheen: 0.22,
    sheenColor: "#858d94",
    sheenRoughness: 0.95,
  });
  const shirtRib = material("#272a2d", { clearcoat: 0, roughness: 0.97 });
  const denim = material(PALETTE.denim, {
    bumpMap: fabric.twill,
    bumpScale: 0.0012,
    clearcoat: 0,
    map: fabric.twill,
    roughness: 0.94,
    sheen: 0.18,
    sheenColor: "#88a6c2",
    sheenRoughness: 1,
  });
  const ink = material(PALETTE.ink, { roughness: 0.77 });
  const teal = material(PALETTE.teal);
  const paper = material(PALETTE.paper, { roughness: 0.8 });
  const wool = material("#42464a", {
    bumpMap: fabric.knit,
    bumpScale: 0.001,
    clearcoat: 0,
    map: fabric.knit,
    roughness: 1,
    sheen: 0.35,
    sheenRoughness: 1,
  });
  const shoeSole = material("#45494c", { clearcoat: 0, roughness: 0.95 });
  const shoeLace = material("#42464a", { clearcoat: 0, roughness: 1 });
  const shoeTrim = material("#34393c", { clearcoat: 0, roughness: 1 });
  const wood = material(PALETTE.wood, { roughness: 0.78 });
  const eye = material("#3c3129", { clearcoat: 0.35, roughness: 0.28 });
  const pupil = material("#242522", { roughness: 0.28 });
  const eyeWhite = material("#e9dfce", { roughness: 0.75 });
  const glasses = material("#ced4da", { metalness: 0.92, roughness: 0.23 });
  const laptopMetal = material("#c7c9cc", {
    bumpMap: fabric.brushed,
    bumpScale: 0.000_15,
    metalness: 0.85,
    roughness: 0.32,
  });
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
