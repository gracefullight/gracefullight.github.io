import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import type { PolyforkProp } from "./polyfork-manifest";

import * as THREE from "three";
import { POLYFORK_PROPS, polyforkModelPath } from "./polyfork-manifest";

const GROW_SECONDS = 0.7;

type Resources = {
  geometries: Map<string, THREE.BufferGeometry>;
  materials: Set<THREE.Material>;
};

/**
 * Polyfork exports flat vertex colours. One shared matte material per prop
 * keeps them in the scene's soft, physically lit look.
 */
export function adaptPolyforkModel(
  root: THREE.Object3D,
  prop: PolyforkProp,
  resources: Resources,
) {
  const surface = new THREE.MeshStandardMaterial({
    envMapIntensity: 0.7,
    roughness: 0.82,
    vertexColors: true,
  });
  surface.name = `polyfork:${prop.id}`;
  resources.materials.add(surface);
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const previous = object.material as THREE.Material | THREE.Material[];
    for (const item of Array.isArray(previous) ? previous : [previous]) {
      item.dispose();
    }
    object.material = surface;
    object.castShadow = prop.castShadow;
    object.receiveShadow = true;
    resources.geometries.set(object.geometry.uuid, object.geometry);
  });
  const scale = prop.scale;
  if (typeof scale === "number") root.scale.setScalar(scale);
  else root.scale.set(...scale);
  root.position.set(...prop.position);
  root.rotation.y = prop.rotationY ?? 0;
  root.name = prop.id;
  return root;
}

const easeOutBack = (value: number) => {
  const overshoot = 1.4;
  const shifted = value - 1;
  return 1 + (overshoot + 1) * shifted ** 3 + overshoot * shifted ** 2;
};

/** Streams the props in after the hand-built scene is already on screen. */
export function createPolyforkDressing(
  parent: THREE.Object3D,
  baseUrl: string,
  resources: Resources,
  onLoaded: () => void,
) {
  const group = new THREE.Group();
  group.name = "polyfork-dressing";
  parent.add(group);
  const mixers: THREE.AnimationMixer[] = [];
  const growing: {
    root: THREE.Object3D;
    target: THREE.Vector3;
    age: number;
  }[] = [];
  let disposed = false;

  void import("three/addons/loaders/GLTFLoader.js").then(({ GLTFLoader }) => {
    if (disposed) return;
    const loader = new GLTFLoader();
    const place = (prop: PolyforkProp, gltf: GLTF) => {
      if (disposed) return;
      const root = adaptPolyforkModel(gltf.scene, prop, resources);
      if (gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(root);
        for (const clip of gltf.animations) mixer.clipAction(clip).play();
        mixers.push(mixer);
      }
      growing.push({ age: 0, root, target: root.scale.clone() });
      root.scale.setScalar(0.0001);
      group.add(root);
      onLoaded();
    };
    for (const prop of POLYFORK_PROPS) {
      loader
        .loadAsync(polyforkModelPath(baseUrl, prop.id))
        .then((gltf) => place(prop, gltf))
        .catch((error: unknown) => {
          // Set dressing is optional; the hand-built scene stands alone.
          console.warn(`Skipped homepage prop ${prop.id}`, error);
        });
    }
  });

  function update(delta: number, motion: number) {
    for (const mixer of mixers) mixer.update(delta * motion);
    for (let index = growing.length - 1; index >= 0; index -= 1) {
      const item = growing[index];
      item.age += motion ? delta : GROW_SECONDS;
      const amount = Math.min(1, item.age / GROW_SECONDS);
      item.root.scale
        .copy(item.target)
        .multiplyScalar(Math.max(0.0001, easeOutBack(amount)));
      if (amount >= 1) growing.splice(index, 1);
    }
  }

  function dispose() {
    disposed = true;
    for (const mixer of mixers) {
      mixer.stopAllAction();
      mixer.uncacheRoot(mixer.getRoot());
    }
    parent.remove(group);
  }

  return { dispose, update };
}
