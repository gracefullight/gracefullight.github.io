import * as THREE from "three";

type TexturePattern = (x: number, y: number) => number;

// Integer coordinates keep the pattern stable across mounts and machines.
function noise(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43_758.5453;
  return value - Math.floor(value);
}

export function createSurfaceTextures(textures: Set<THREE.Texture>) {
  function texture(pattern: TexturePattern, repeatX: number, repeatY: number) {
    const size = 256;
    const pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const value = Math.round(
          THREE.MathUtils.clamp(pattern(x, y), 0, 1) * 255,
        );
        pixels.set([value, value, value, 255], (y * size + x) * 4);
      }
    }
    const result = new THREE.DataTexture(pixels, size, size);
    result.wrapS = THREE.RepeatWrapping;
    result.wrapT = THREE.RepeatWrapping;
    result.magFilter = THREE.LinearFilter;
    result.minFilter = THREE.LinearMipmapLinearFilter;
    result.generateMipmaps = true;
    result.repeat.set(repeatX, repeatY);
    result.needsUpdate = true;
    textures.add(result);
    return result;
  }

  const jersey = texture(
    (x, y) => {
      const stitch = Math.sin(
        ((x + Math.sin((y * Math.PI) / 4)) * Math.PI) / 2,
      );
      return 0.73 + stitch * 0.1 + noise(x, y) * 0.12;
    },
    7,
    5,
  );
  const twill = texture(
    (x, y) => {
      const diagonal = ((x + y) % 8) / 8;
      return 0.62 + diagonal * 0.24 + noise(x, y) * 0.12;
    },
    5,
    9,
  );
  const knit = texture(
    (x, y) => {
      const loop = Math.cos(
        ((x + Math.sin((y * Math.PI) / 6) * 2) * Math.PI) / 3,
      );
      return 0.65 + loop * 0.14 + noise(x, y) * 0.16;
    },
    4,
    3,
  );
  const pores = texture((x, y) => 0.65 + noise(x, y) * 0.3, 3, 3);
  const brushed = texture(
    (x, y) => 0.78 + noise(x, 0) * 0.16 + noise(x, y) * 0.04,
    3,
    1,
  );
  const oak = texture(
    (x, y) => {
      const along = (x / 256) * Math.PI * 2;
      const across = (y / 256) * Math.PI * 2;
      const warp = Math.sin(along) * 2.2 + Math.sin(along * 3 + across) * 0.35;
      const grain = Math.sin(across * 26 + warp);
      const pores = Math.sin(across * 74 + warp * 2);
      return 0.83 + grain * 0.065 + pores * 0.025 + noise(x, y) * 0.035;
    },
    1,
    1,
  );
  return { brushed, jersey, knit, oak, pores, twill };
}
