import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

function staticMesh(
  object: THREE.Object3D,
  animated: Set<THREE.Object3D>,
): object is THREE.Mesh<THREE.BufferGeometry, THREE.Material> {
  if (
    !(object instanceof THREE.Mesh) ||
    object instanceof THREE.SkinnedMesh ||
    object instanceof THREE.InstancedMesh ||
    Array.isArray(object.material) ||
    object.material.transparent ||
    object.children.length > 0 ||
    !object.visible ||
    animated.has(object) ||
    object.morphTargetInfluences ||
    Object.keys(object.geometry.morphAttributes).length > 0
  )
    return false;
  if (object.matrixAutoUpdate) object.updateMatrix();
  return object.matrix.determinant() > 0;
}

function renderSignature(
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>,
) {
  return `${mesh.material.uuid}:${mesh.castShadow}:${mesh.receiveShadow}:${mesh.renderOrder}:${mesh.layers.mask}:${mesh.frustumCulled}`;
}

function attributeSignature(geometry: THREE.BufferGeometry) {
  return Object.keys(geometry.attributes)
    .sort()
    .map((name) => {
      const attribute = geometry.attributes[name];
      const gpuType = "gpuType" in attribute ? attribute.gpuType : "";
      return `${name}:${attribute.itemSize}:${attribute.array.constructor.name}:${attribute.normalized}:${gpuType}`;
    })
    .join("|");
}

function copyRenderSettings(source: THREE.Object3D, target: THREE.Object3D) {
  target.castShadow = source.castShadow;
  target.receiveShadow = source.receiveShadow;
  target.renderOrder = source.renderOrder;
  target.layers.mask = source.layers.mask;
  target.frustumCulled = source.frustumCulled;
}

function mergeableGeometry(shape: THREE.BufferGeometry) {
  return (
    shape.groups.length === 0 &&
    shape.drawRange.start === 0 &&
    shape.drawRange.count === Number.POSITIVE_INFINITY &&
    !Object.values(shape.attributes).some(
      (attribute) =>
        attribute instanceof THREE.InterleavedBufferAttribute ||
        attribute instanceof THREE.InstancedBufferAttribute,
    )
  );
}

function transformedGeometry(meshes: THREE.Mesh[]) {
  const transformed = meshes.map((part) =>
    part.geometry.clone().applyMatrix4(part.matrix),
  );
  try {
    return mergeGeometries(transformed);
  } finally {
    for (const shape of transformed) shape.dispose();
  }
}

function mergeStaticMeshes(
  root: THREE.Object3D,
  animated: Set<THREE.Object3D>,
  registerGeometry?: (geometry: THREE.BufferGeometry) => void,
) {
  const buckets = new Map<
    string,
    THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]
  >();
  for (const child of root.children) {
    if (!staticMesh(child, animated)) continue;
    const shape = child.geometry;
    if (!mergeableGeometry(shape)) continue;
    const key = `${renderSignature(child)}:${shape.index !== null}:${attributeSignature(shape)}`;
    const meshes = buckets.get(key) ?? [];
    meshes.push(child);
    buckets.set(key, meshes);
  }
  for (const meshes of buckets.values()) {
    if (meshes.length < 2) continue;
    const merged = transformedGeometry(meshes);
    if (!merged) continue;
    merged.computeBoundingBox();
    merged.computeBoundingSphere();
    registerGeometry?.(merged);
    const batch = new THREE.Mesh(merged, meshes[0].material);
    copyRenderSettings(meshes[0], batch);
    for (const part of meshes) root.remove(part);
    root.add(batch);
  }
}

// Batch siblings only: their parent still owns the original animation transform.
export function batchSceneDetails(
  root: THREE.Object3D,
  animated: Set<THREE.Object3D>,
  registerGeometry?: (geometry: THREE.BufferGeometry) => void,
) {
  for (const child of [...root.children]) {
    batchSceneDetails(child, animated, registerGeometry);
  }
  const batches = new Map<
    string,
    THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]
  >();
  for (const child of root.children) {
    if (!staticMesh(child, animated)) continue;
    const key = `${child.geometry.uuid}:${renderSignature(child)}`;
    const meshes = batches.get(key) ?? [];
    meshes.push(child);
    batches.set(key, meshes);
  }
  for (const meshes of batches.values()) {
    if (meshes.length < 3) continue;
    const first = meshes[0];
    const batch = new THREE.InstancedMesh(
      first.geometry,
      first.material,
      meshes.length,
    );
    copyRenderSettings(first, batch);
    for (const [index, mesh] of meshes.entries()) {
      batch.setMatrixAt(index, mesh.matrix);
      root.remove(mesh);
    }
    batch.instanceMatrix.needsUpdate = true;
    batch.computeBoundingSphere();
    root.add(batch);
  }
  mergeStaticMeshes(root, animated, registerGeometry);
}
