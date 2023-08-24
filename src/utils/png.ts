import { buf } from "crc-32/crc32";

// ! CHECK THE PNG SPEC BELOW
// ? https://en.wikipedia.org/wiki/PNG#File_header
interface Chunk {
  type: string;
  data: Uint8Array;
  crc: number;
}

function readChunks(arrayBuffer: ArrayBuffer): Chunk[] {
  const dataView = new DataView(arrayBuffer);
  let offset = 8;
  const chunks = [];

  while (offset < dataView.byteLength) {
    const length = dataView.getUint32(offset);
    offset += 4;

    const type = String.fromCharCode(
      dataView.getUint8(offset),
      dataView.getUint8(offset + 1),
      dataView.getUint8(offset + 2),
      dataView.getUint8(offset + 3),
    );
    offset += 4;

    const data = new Uint8Array(arrayBuffer, offset, length);
    offset += length;

    const crc = dataView.getUint32(offset);
    offset += 4;

    chunks.push({ type, data, crc });
  }

  return chunks;
}

function calculateTotalLength(chunks: Chunk[]): number {
  let totalLength = 8; // PNG signature length
  chunks.forEach((chunk) => {
    totalLength += 12 + chunk.data.length; // 12 = 4 bytes for length + 4 for type + 4 for CRC
  });

  return totalLength;
}

function createZTXtChunk(field: string, metadata: string): Chunk {
  const type = "zTXt";
  // Prepare metadata string and convert it to bytes
  const formattedMetadata = `[${field}]=${metadata}`;
  const metadataBytes = new TextEncoder().encode(formattedMetadata);

  // Prepare CRC calculation
  const crcBuffer = new Uint8Array(4 + metadataBytes.length);
  crcBuffer.set(new TextEncoder().encode(type), 0);
  crcBuffer.set(metadataBytes, 4);
  const crcValue = buf(crcBuffer);

  return {
    type,
    data: metadataBytes,
    crc: crcValue,
  };
}

export function createPngArrayBuffer(
  totalLength: number,
  originalArrayBuffer: ArrayBuffer,
  chunks: Chunk[],
): ArrayBuffer {
  const newArrayBuffer = new ArrayBuffer(totalLength);
  const newArray = new Uint8Array(newArrayBuffer);

  // Set PNG signature
  newArray.set(new Uint8Array(originalArrayBuffer, 0, 8), 0);

  let offset = 8;

  chunks.forEach(({ type, data, crc }) => {
    const chunkView = new DataView(newArrayBuffer, offset, 12 + data.length);
    chunkView.setUint32(0, data.length);
    newArray.set(new TextEncoder().encode(type), offset + 4);
    newArray.set(data, offset + 8);
    chunkView.setUint32(8 + data.length, crc);

    offset += 12 + data.length;
  });

  return newArrayBuffer;
}

export function removeTEXtChunks(arrayBuffer: ArrayBuffer): ArrayBuffer {
  let chunks = readChunks(arrayBuffer);
  chunks = chunks.filter(({ type }) => type !== "tEXt");
  const totalLength = calculateTotalLength(chunks);
  return createPngArrayBuffer(totalLength, arrayBuffer, chunks);
}

export function addMetadataChunks(
  arrayBuffer: ArrayBuffer,
  authId: string,
  author: string,
): ArrayBuffer {
  const chunks = readChunks(arrayBuffer);

  const authIdChunk = createZTXtChunk("authid", authId);
  const authorChunk = createZTXtChunk("author", author);
  const insertIdx =
    chunks.findIndex(({ type }) => type === "IHDR" || type === "PLTE") + 1;

  chunks.splice(insertIdx, 0, authIdChunk, authorChunk);
  const totalLength = calculateTotalLength(chunks);

  return createPngArrayBuffer(totalLength, arrayBuffer, chunks);
}
