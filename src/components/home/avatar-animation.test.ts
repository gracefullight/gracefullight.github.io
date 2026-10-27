import * as THREE from "three";
import { afterEach, expect, it, vi } from "vitest";
import { createAvatarAnimation } from "./avatar-animation";

function fixture() {
  const parts = {
    blinkingEyes: [-1, 1].map(() => ({
      aperture: new THREE.Group(),
      closed: new THREE.Object3D(),
    })),
    figure: new THREE.Group(),
    head: new THREE.Group(),
    leftArm: { hand: new THREE.Bone() },
    rightArm: { hand: new THREE.Bone() },
    torso: new THREE.Group(),
    typingKeys: [-1, 1].map((side) => ({ key: new THREE.Object3D(), side })),
  };
  return { animation: createAvatarAnimation(parts), parts };
}

afterEach(() => vi.restoreAllMocks());

it("alternates typing hands, settles, and respects reduced motion", () => {
  const { animation, parts } = fixture();
  animation.startTyping(0);
  animation.update(0.55, 1, 0, 0);
  expect(parts.rightArm.hand.rotation.x).toBeLessThan(-0.03);
  expect(parts.leftArm.hand.rotation.x).toBeCloseTo(0);
  animation.update(0.78, 1, 0, 0);
  expect(parts.leftArm.hand.rotation.x).toBeLessThan(-0.03);
  expect(parts.rightArm.hand.rotation.x).toBeCloseTo(0);
  animation.update(0.8, 0, 1, 1);
  for (const arm of [parts.leftArm, parts.rightArm]) {
    expect(arm.hand.rotation.x).toBeCloseTo(0);
    expect(arm.hand.position.toArray()).toEqual([0, 0, 0]);
  }
  expect(parts.typingKeys[0].key.position.y).toBe(0.013);
  animation.update(3.5, 1, 0, 0);
  expect(parts.leftArm.hand.rotation.x).toBeCloseTo(0);
  expect(parts.rightArm.hand.rotation.x).toBeCloseTo(0);
});

it("blinks briefly at varying intervals and opens both eyes with reduced motion", () => {
  let sample = 0;
  vi.spyOn(Math, "random").mockImplementation(() => (sample++ % 7) / 7);
  const { animation, parts } = fixture();
  const blinks: number[] = [];
  let wasClosed = false;
  for (let frame = 0; frame < 4000; frame += 1) {
    const time = frame / 100;
    animation.update(time, 1, 0, 0);
    const closed = parts.blinkingEyes[0].closed.visible;
    expect(parts.blinkingEyes[1].closed.visible).toBe(closed);
    if (closed && !wasClosed) blinks.push(time);
    wasClosed = closed;
  }
  expect(blinks.length).toBeGreaterThan(4);
  const intervals = blinks.slice(1).map((time, i) => time - blinks[i]);
  expect(Math.max(...intervals) - Math.min(...intervals)).toBeGreaterThan(1);
  animation.update(40, 0, 0, 0);
  for (const eye of parts.blinkingEyes) {
    expect(eye.aperture.visible).toBe(true);
    expect(eye.aperture.scale.y).toBe(1);
    expect(eye.closed.visible).toBe(false);
  }
});
