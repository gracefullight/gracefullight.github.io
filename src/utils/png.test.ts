import { inflate } from "pako";
import { describe, expect, it } from "vitest";
import { addMetadataChunks, removeTEXtChunks } from "./png";

// Minimal 1x1 PNG (transparent) as base64
// Source: common 1x1 transparent PNG
// Known-good 1x1 transparent PNG
const PNG_1x1_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const b = Buffer.from(b64, "base64");
  const out = new Uint8Array(b.byteLength);
  for (let i = 0; i < b.byteLength; i++) out[i] = b[i];
  return out.buffer;
}

// Simple chunk reader for tests (mirrors implementation details)
type TestChunk = { crc: number; data: Uint8Array; type: string };
function readChunks(buf: ArrayBuffer): TestChunk[] {
  const dv = new DataView(buf);
  const chunks: TestChunk[] = [];
  let off = 8; // skip PNG signature
  while (off < dv.byteLength) {
    const len = dv.getUint32(off); // big-endian by default
    off += 4;
    const type = String.fromCodePoint(
      dv.getUint8(off),
      dv.getUint8(off + 1),
      dv.getUint8(off + 2),
      dv.getUint8(off + 3),
    );
    off += 4;
    const data = new Uint8Array(buf, off, len);
    off += len;
    const crc = dv.getUint32(off);
    off += 4;
    chunks.push({ crc, data, type });
    if (type === "IEND") break;
  }
  return chunks;
}

function decodeZTXt(chunk: TestChunk): { keyword: string; text: string } {
  // zTXt layout: keyword (1-79, Latin-1) 0x00, compression method (0), zlib stream
  const data = chunk.data;
  let i = 0;
  while (i < data.length && data[i] !== 0) i++;
  const keyword = new TextDecoder().decode(data.slice(0, i));
  const method = data[i + 1];
  if (method !== 0) throw new Error("Unsupported compression method in zTXt");
  const compressed = data.slice(i + 2);
  const inflated = inflate(compressed);
  const text = new TextDecoder().decode(inflated);
  return { keyword, text };
}

describe("png metadata utils", () => {
  it("adds zTXt chunks with correct keyword and text", () => {
    const input = base64ToArrayBuffer(PNG_1x1_BASE64);

    // Check original PNG signature and chunk readability
    const inSig = new Uint8Array(input.slice(0, 8));
    expect(Array.from(inSig)).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    const inChunks = readChunks(input);
    expect(inChunks[0]?.type).toBe("IHDR");

    const cleaned = removeTEXtChunks(input);
    const out = addMetadataChunks(cleaned, "12345", "Tester");

    // PNG signature on output
    const sig = new Uint8Array(out.slice(0, 8));
    expect(Array.from(sig)).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);

    const chunks = readChunks(out);

    // Find IHDR and ensure first ancillary after IHDR is zTXt (by our insertion logic)
    const ihdrIdx = chunks.findIndex((c) => c.type === "IHDR");
    expect(ihdrIdx).toBeGreaterThanOrEqual(0);

    // Collect our zTXt chunks
    const ztxt = chunks.filter((c) => c.type === "zTXt");
    expect(ztxt.length).toBeGreaterThanOrEqual(2);

    const parsed = ztxt.map(decodeZTXt);
    const byKey = Object.fromEntries(parsed.map((p) => [p.keyword, p.text]));

    expect(byKey.authid).toBe("12345");
    expect(byKey.author).toBe("Tester");

    // Ensure our first inserted zTXt appears immediately after IHDR (no PLTE in 1x1 sample)
    const firstZtxtIdx = chunks.findIndex((c) => c.type === "zTXt");
    expect(firstZtxtIdx).toBe(ihdrIdx + 1);
  });
});
