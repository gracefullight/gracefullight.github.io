import type { Point } from "./scene-primitives";

/** The workstation is modelled about 1.45x real-world metres. */
const SCENE_SCALE = 1.45;
const DESK_TOP = 1.528;

export type PolyforkProp = {
  id: string;
  title: string;
  position: Point;
  rotationY?: number;
  /** Multiplies the real-world size; y can flatten a prop. */
  scale: number | Point;
  castShadow: boolean;
};

/**
 * Low-poly set dressing from polyfork.dev, self-hosted in
 * `static/models/polyfork` under CC BY 4.0. Kept free of three.js so the
 * homepage credit can list it without loading the scene bundle.
 */
export const POLYFORK_PROPS = [
  {
    castShadow: false,
    id: "area-rug-5c56e2",
    position: [0.05, 0, 0.24],
    scale: [1.05, 0.35, 1],
    title: "Area Rug",
  },
  {
    castShadow: true,
    id: "floor-houseplant-8fad17",
    position: [-1.5, 0, -0.36],
    rotationY: 0.5,
    scale: 1,
    title: "Floor Houseplant",
  },
  {
    castShadow: true,
    id: "table-herb-pot-3c0cf4",
    position: [0.52, DESK_TOP, 0.76],
    rotationY: -0.4,
    scale: 1.15,
    title: "Table Herb Pot",
  },
  {
    castShadow: true,
    id: "office-mug-8afee0",
    position: [-0.52, DESK_TOP, 0.8],
    rotationY: 2.3,
    scale: SCENE_SCALE,
    title: "Office Mug",
  },
  {
    castShadow: true,
    id: "lab-notebook-e60f7a",
    position: [0.47, DESK_TOP, 0.36],
    rotationY: 0.22,
    scale: 1.2,
    title: "Lab Notebook",
  },
] as const satisfies readonly PolyforkProp[];

export const polyforkAssetUrl = (id: string) =>
  `https://polyfork.dev/asset/${id}`;

export const polyforkModelPath = (baseUrl: string, id: string) =>
  `${baseUrl}models/polyfork/${id}.glb`;
