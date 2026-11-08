import * as THREE from "three";
import { afterEach, expect, it, vi } from "vitest";
import { batchSceneDetails } from "./scene-batching";

const disposables: { dispose: () => void }[] = [];

afterEach(() => {
  for (const resource of disposables.splice(0)) resource.dispose();
  vi.restoreAllMocks();
});

function fixture() {
  const root = new THREE.Group();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial();
  disposables.push(geometry, material);
  function mesh(parent = root) {
    const result = new THREE.Mesh(geometry, material);
    parent.add(result);
    return result;
  }
  return { geometry, material, mesh, root };
}

function expectMatrix(actual: THREE.Matrix4, expected: THREE.Matrix4) {
  for (let index = 0; index < 16; index += 1) {
    expect(actual.elements[index]).toBeCloseTo(expected.elements[index], 6);
  }
}

function instanceWorld(batch: THREE.InstancedMesh, index: number) {
  const local = new THREE.Matrix4();
  batch.getMatrixAt(index, local);
  return batch.matrixWorld.clone().multiply(local);
}

function batches(root: THREE.Object3D) {
  return root.children.filter(
    (child): child is THREE.InstancedMesh =>
      child instanceof THREE.InstancedMesh,
  );
}

it("reduces sibling draws while preserving positions under parent rotation and scale", () => {
  const { root, mesh } = fixture();
  root.position.set(3, -2, 5);
  root.rotation.set(0.4, -0.7, 0.2);
  root.scale.set(1.2, 0.8, 2);
  const originals = Array.from({ length: 4 }, (_, index) => {
    const part = mesh();
    part.position.set(index * 0.4, index * 0.2, -index);
    part.rotation.set(index * 0.1, index * -0.2, index * 0.3);
    part.scale.set(0.1 + index * 0.1, 0.4, 0.8);
    part.castShadow = true;
    return part;
  });
  root.updateMatrixWorld(true);
  const expected = originals.map((part) => part.matrixWorld.clone());

  batchSceneDetails(root, new Set());
  root.updateMatrixWorld(true);

  expect(root.children).toHaveLength(1);
  const [batch] = batches(root);
  disposables.push(batch);
  expect(batch.count).toBe(4);
  expect(batch.castShadow).toBe(true);
  for (const [index, world] of expected.entries()) {
    expectMatrix(instanceWorld(batch, index), world);
  }
});

it("keeps animated typing keys independently movable", () => {
  const { root, mesh } = fixture();
  const animated = mesh();
  animated.position.set(0.12, 0.013, -0.04);
  for (let index = 0; index < 4; index += 1) {
    mesh().position.x = index;
  }

  batchSceneDetails(root, new Set([animated]));

  expect(animated.parent).toBe(root);
  expect(root.children).toHaveLength(2);
  const [batch] = batches(root);
  disposables.push(batch);
  expect(batch.count).toBe(4);
  animated.position.y -= 0.004;
  root.updateMatrixWorld(true);
  expect(animated.getWorldPosition(new THREE.Vector3()).y).toBeCloseTo(0.009);
});

it("retains skinned meshes, their bones, and transparent surfaces", () => {
  const { root, geometry, material } = fixture();
  const transparent = material.clone();
  transparent.transparent = true;
  transparent.opacity = 0.4;
  disposables.push(transparent);
  const originals: THREE.Object3D[] = [];
  for (let index = 0; index < 3; index += 1) {
    const skin = new THREE.SkinnedMesh(geometry, material);
    const bone = new THREE.Bone();
    const wrist = new THREE.Bone();
    bone.add(wrist);
    skin.add(bone);
    const glass = new THREE.Mesh(geometry, transparent);
    root.add(skin, glass);
    originals.push(skin, glass);
  }

  batchSceneDetails(root, new Set());

  expect(root.children).toEqual(originals);
  expect(batches(root)).toHaveLength(0);
  for (const child of root.children) {
    if (child instanceof THREE.SkinnedMesh) {
      expect(child.children[0]).toBeInstanceOf(THREE.Bone);
      expect(child.children[0].children[0]).toBeInstanceOf(THREE.Bone);
    }
  }
});

it("keeps nested parent transforms and never combines meshes from separate parents", () => {
  const { root, mesh } = fixture();
  const shoulder = new THREE.Group();
  const elbow = new THREE.Group();
  shoulder.position.set(0.3, 0.5, -0.2);
  shoulder.rotation.y = 0.7;
  elbow.position.set(0, 0.4, 0.1);
  elbow.rotation.z = -0.3;
  root.add(shoulder);
  shoulder.add(elbow);
  const other = new THREE.Group();
  root.add(other);
  for (const parent of [shoulder, other]) {
    mesh(parent);
    mesh(parent).position.x = 0.2;
  }
  const details = Array.from({ length: 3 }, (_, index) => {
    const part = mesh(elbow);
    part.position.set(index * 0.1, 0.02, 0);
    return part;
  });
  root.updateMatrixWorld(true);
  const expected = details.map((part) => part.matrixWorld.clone());

  batchSceneDetails(root, new Set());
  root.updateMatrixWorld(true);

  expect(shoulder.parent).toBe(root);
  expect(elbow.parent).toBe(shoulder);
  expect(batches(root)).toHaveLength(0);
  expect(batches(shoulder)).toHaveLength(0);
  expect(batches(other)).toHaveLength(0);
  const [batch] = batches(elbow);
  disposables.push(batch);
  for (const [index, world] of expected.entries()) {
    expectMatrix(instanceWorld(batch, index), world);
  }
  elbow.rotation.z += 0.2;
  root.updateMatrixWorld(true);
  expect(instanceWorld(batch, 1).equals(expected[1])).toBe(false);
  expectMatrix(
    instanceWorld(batch, 1),
    elbow.matrixWorld.clone().multiply(details[1].matrix),
  );
});

it("merges different static geometries without changing bounds, normals, or vertex attributes", () => {
  const { root, material } = fixture();
  root.position.set(-0.5, 0.7, 1.4);
  root.rotation.set(0.3, 0.2, -0.8);
  root.scale.set(1.4, 0.8, 1.1);
  const shapes = [
    new THREE.PlaneGeometry(0.3, 0.8),
    new THREE.CircleGeometry(0.4, 12),
  ];
  disposables.push(...shapes);
  const originalDisposals = shapes.map((shape) => vi.spyOn(shape, "dispose"));
  const originals = shapes.map((shape, index) => {
    const count = shape.getAttribute("position").count;
    shape.setAttribute(
      "weight",
      new THREE.Uint8BufferAttribute(
        new Uint8Array(count).fill(50 + index),
        1,
        true,
      ),
    );
    const mesh = new THREE.Mesh(shape, material);
    mesh.position.set(index * 0.7, -0.1, index * -0.3);
    mesh.rotation.set(0.3 + index, -0.2, 0.5);
    mesh.scale.set(0.7, 1.3, 0.4);
    root.add(mesh);
    return mesh;
  });
  root.updateMatrixWorld(true);
  const before = new THREE.Box3().setFromObject(root, true);
  const expected = originals.flatMap((mesh) => {
    const position = mesh.geometry.getAttribute("position");
    const normal = mesh.geometry.getAttribute("normal");
    const uv = mesh.geometry.getAttribute("uv");
    const weight = mesh.geometry.getAttribute("weight");
    const normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrix);
    return Array.from({ length: position.count }, (_, index) => ({
      normal: new THREE.Vector3()
        .fromBufferAttribute(normal, index)
        .applyNormalMatrix(normalMatrix),
      position: new THREE.Vector3()
        .fromBufferAttribute(position, index)
        .applyMatrix4(mesh.matrixWorld),
      uv: [uv.getX(index), uv.getY(index)],
      weight: weight.getX(index),
    }));
  });
  const registered: THREE.BufferGeometry[] = [];

  batchSceneDetails(root, new Set(), (shape) => {
    registered.push(shape);
    disposables.push(shape);
  });
  root.updateMatrixWorld(true);

  expect(registered).toHaveLength(1);
  expect(root.children).toHaveLength(1);
  const merged = root.children[0] as THREE.Mesh;
  expect(merged.geometry).toBe(registered[0]);
  const after = new THREE.Box3().setFromObject(root, true);
  expect(after.min.distanceTo(before.min)).toBeLessThan(0.000_001);
  expect(after.max.distanceTo(before.max)).toBeLessThan(0.000_001);
  const position = merged.geometry.getAttribute("position");
  const normal = merged.geometry.getAttribute("normal");
  const uv = merged.geometry.getAttribute("uv");
  const weight = merged.geometry.getAttribute("weight");
  expect(position.count).toBe(expected.length);
  expect(weight.normalized).toBe(true);
  expect(weight.array).toBeInstanceOf(Uint8Array);
  for (const [index, vertex] of expected.entries()) {
    const world = new THREE.Vector3()
      .fromBufferAttribute(position, index)
      .applyMatrix4(merged.matrixWorld);
    const direction = new THREE.Vector3().fromBufferAttribute(normal, index);
    expect(world.distanceTo(vertex.position)).toBeLessThan(0.000_001);
    expect(direction.distanceTo(vertex.normal)).toBeLessThan(0.000_001);
    expect([uv.getX(index), uv.getY(index)]).toEqual(vertex.uv);
    expect(weight.getX(index)).toBe(vertex.weight);
  }
  for (const dispose of originalDisposals)
    expect(dispose).not.toHaveBeenCalled();
});

it("separates merging by attributes, index presence, materials, and shadow settings", () => {
  const { root, material } = fixture();
  const otherMaterial = material.clone();
  disposables.push(otherMaterial);
  const makePair = (kind: string) => {
    for (let index = 0; index < 2; index += 1) {
      let shape: THREE.BufferGeometry = new THREE.PlaneGeometry(
        0.2 + index * 0.1,
        0.4,
      );
      if (kind === "no-uv") shape.deleteAttribute("uv");
      if (kind === "integer-uv") {
        const uv = shape.getAttribute("uv");
        shape.setAttribute(
          "uv",
          new THREE.Uint16BufferAttribute(
            Array.from(uv.array, (value) => value * 65_535),
            2,
            true,
          ),
        );
      }
      if (kind === "unindexed") {
        const indexed = shape;
        shape = indexed.toNonIndexed();
        indexed.dispose();
      }
      disposables.push(shape);
      const mesh = new THREE.Mesh(
        shape,
        kind === "other-material" ? otherMaterial : material,
      );
      mesh.castShadow = kind === "cast-shadow";
      mesh.receiveShadow = kind === "receive-shadow";
      root.add(mesh);
    }
  };
  for (const kind of [
    "plain",
    "no-uv",
    "integer-uv",
    "unindexed",
    "cast-shadow",
    "receive-shadow",
    "other-material",
  ])
    makePair(kind);
  const registered: THREE.BufferGeometry[] = [];

  batchSceneDetails(root, new Set(), (shape) => {
    registered.push(shape);
    disposables.push(shape);
  });

  expect(root.children).toHaveLength(7);
  expect(registered).toHaveLength(7);
  const merged = root.children as THREE.Mesh[];
  expect(
    merged.filter((mesh) => !mesh.geometry.hasAttribute("uv")),
  ).toHaveLength(1);
  expect(merged.filter((mesh) => mesh.geometry.index === null)).toHaveLength(1);
  expect(merged.filter((mesh) => mesh.castShadow)).toHaveLength(1);
  expect(merged.filter((mesh) => mesh.receiveShadow)).toHaveLength(1);
  expect(merged.filter((mesh) => mesh.material === otherMaterial)).toHaveLength(
    1,
  );
});

it("leaves animated, mirrored, grouped, and partial-range meshes out of static merging", () => {
  const { root, material } = fixture();
  const animated = new Set<THREE.Object3D>();
  for (const kind of ["animated", "mirrored", "grouped", "partial"]) {
    for (let index = 0; index < 2; index += 1) {
      const shape = new THREE.PlaneGeometry(0.2 + index * 0.1, 0.4);
      disposables.push(shape);
      const mesh = new THREE.Mesh(shape, material);
      if (kind === "animated") animated.add(mesh);
      if (kind === "mirrored") mesh.scale.x = -1;
      if (kind === "grouped") shape.addGroup(0, 3, 0);
      if (kind === "partial") shape.setDrawRange(0, 3);
      root.add(mesh);
    }
  }
  const originals = [...root.children];
  const register = vi.fn();

  batchSceneDetails(root, animated, register);

  expect(root.children).toEqual(originals);
  expect(register).not.toHaveBeenCalled();
});
