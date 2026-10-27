import type * as THREE from "three";

import { smoothstep } from "./scene-primitives";

type AvatarParts = {
  torso: THREE.Group;
  head: THREE.Group;
  figure: THREE.Group;
  rightArm: { hand: THREE.Bone };
  leftArm: { hand: THREE.Bone };
  blinkingEyes: { aperture: THREE.Group; closed: THREE.Object3D }[];
  typingKeys: { key: THREE.Object3D; side: number }[];
};
export function createAvatarAnimation(parts: AvatarParts) {
  const { torso, head, figure, rightArm, leftArm, blinkingEyes, typingKeys } =
    parts;
  let elapsed = 0;
  let typingStart = -10;
  let nextTyping = 1.2;
  let blinkStart = -10;
  let nextBlink = 2.5 + Math.random() * 4;
  function startTyping(time: number) {
    typingStart = time;
    nextTyping = time + 5.5 + Math.random() * 4;
  }
  function update(
    time: number,
    motion: number,
    pointerX: number,
    pointerY: number,
  ) {
    elapsed = time;
    torso.scale.y = 1 + Math.sin(elapsed * 1.45) * 0.003 * motion;
    head.rotation.y = pointerX * 0.16 * motion;
    head.rotation.x = pointerY * 0.09 * motion;
    head.rotation.z = -0.025;
    figure.rotation.y = -0.12;
    animateTyping(motion);
    animateBlink(motion);
  }

  function animateTyping(motion: number) {
    if (elapsed >= nextTyping) {
      typingStart = elapsed;
      nextTyping = elapsed + 5.5 + Math.random() * 4;
    }
    const age = elapsed - typingStart;
    const activity =
      smoothstep(0, 0.3, age) * (1 - smoothstep(2.7, 3.2, age)) * motion;
    const right = Math.max(0, Math.sin(age * 14)) ** 2 * activity;
    const left = Math.max(0, Math.sin(age * 14 + Math.PI)) ** 2 * activity;
    rightArm.hand.rotation.x = -right * 0.055;
    leftArm.hand.rotation.x = -left * 0.055;
    for (const { key, side } of typingKeys) {
      const lift = side < 0 ? right : left;
      key.position.y = 0.013 - (activity - lift) * 0.0015;
    }
  }

  function animateBlink(motion: number) {
    if (elapsed >= nextBlink) {
      blinkStart = elapsed;
      nextBlink = elapsed + 2.4 + Math.random() * 5.4;
    }
    const age = elapsed - blinkStart;
    const closed =
      smoothstep(0, 0.065, age) * (1 - smoothstep(0.085, 0.19, age)) * motion;
    for (const eye of blinkingEyes) {
      eye.aperture.scale.y = Math.max(0.02, 1 - closed);
      eye.aperture.visible = closed < 0.95;
      eye.closed.visible = closed >= 0.95;
    }
  }

  return { startTyping, update };
}
