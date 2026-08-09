// PWA icon generator (backlog P2-1a).
//
// The only brand asset in the repo is a 2041x656 banner, and PWA icons must
// be square — letterboxing a banner into 512x512 gives an install prompt
// with a stamp of logo floating in dead space. So the icons are drawn here
// instead, from the palette in styles.css, and committed as real PNGs.
//
// Written against node:zlib rather than a raster library on purpose: adding
// sharp or canvas to a project that ships a 24h supply-chain guard, for
// five files that change roughly never, is a bad trade. Shapes only — no
// text — so there is no font to rasterise.
//
//   bun scripts/gen-icons.ts

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const NAVY: RGB = [0x0a, 0x19, 0x2f]; // --navy  #0A192F
const GOLD: RGB = [0xd4, 0xaf, 0x37]; // --gold  #D4AF37

type RGB = [number, number, number];

// ---------------------------------------------------------------------------
// Minimal PNG writer: 8-bit truecolour, one IDAT, filter 0 on every scanline.
// ---------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePng(size: number, pixels: Uint8Array): Buffer {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  // 10..12 stay 0: deflate, adaptive filtering, no interlace.

  const stride = size * 3;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    Buffer.from(pixels.buffer, pixels.byteOffset + y * stride, stride).copy(
      raw,
      y * (stride + 1) + 1,
    );
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---------------------------------------------------------------------------
// The mark: a four-pointed star inside a thin ring, both gold on navy.
//
// The star is the astroid-family curve |x|^p + |y|^p <= 1 with p < 1, which
// gives concave sides and sharp points — the ✦ the departments already use
// as their motif, rather than a glyph that would need a font.
// ---------------------------------------------------------------------------

const STAR_EXPONENT = 0.5;
const SUPERSAMPLE = 4; // coverage-based AA; the marks are all curves

/** Fraction of the half-width the mark occupies.
 *
 *  A maskable icon may be cropped to a circle of 80% width, and platforms
 *  crop corners aggressively, so its content is kept inside the inner 40%
 *  radius the spec calls the safe zone. The plain icon has no such
 *  constraint and can breathe closer to the edge. */
type Layout = { starScale: number; ringScale: number; ringWidth: number };
const PLAIN: Layout = { starScale: 0.62, ringScale: 0.84, ringWidth: 0.035 };
const MASKABLE: Layout = { starScale: 0.4, ringScale: 0.56, ringWidth: 0.028 };

/** Ink coverage at one sample point, 0..1 — the union of star and ring. */
function coverage(nx: number, ny: number, layout: Layout): number {
  const ax = Math.abs(nx);
  const ay = Math.abs(ny);
  const star =
    Math.pow(ax / layout.starScale, STAR_EXPONENT) +
      Math.pow(ay / layout.starScale, STAR_EXPONENT) <=
    1;
  if (star) return 1;
  const r = Math.hypot(nx, ny);
  const half = layout.ringWidth / 2;
  return Math.abs(r - layout.ringScale) <= half ? 1 : 0;
}

function render(size: number, layout: Layout): Uint8Array {
  const px = new Uint8Array(size * size * 3);
  const half = size / 2;
  const step = 1 / SUPERSAMPLE;
  const samples = SUPERSAMPLE * SUPERSAMPLE;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let hits = 0;
      for (let sy = 0; sy < SUPERSAMPLE; sy++) {
        for (let sx = 0; sx < SUPERSAMPLE; sx++) {
          const nx = (x + (sx + 0.5) * step - half) / half;
          const ny = (y + (sy + 0.5) * step - half) / half;
          hits += coverage(nx, ny, layout);
        }
      }
      const a = hits / samples;
      const i = (y * size + x) * 3;
      for (let c = 0; c < 3; c++) px[i + c] = Math.round(NAVY[c] + (GOLD[c] - NAVY[c]) * a);
    }
  }
  return px;
}

// ---------------------------------------------------------------------------

const OUT = resolve(import.meta.dirname, "..", "public");
mkdirSync(OUT, { recursive: true });

const TARGETS: { file: string; size: number; layout: Layout }[] = [
  { file: "favicon-32.png", size: 32, layout: PLAIN },
  // iOS never reads the manifest for the home-screen icon; it wants this
  // one, at this name, and it must not be transparent.
  { file: "apple-touch-icon.png", size: 180, layout: PLAIN },
  { file: "icon-192.png", size: 192, layout: PLAIN },
  { file: "icon-512.png", size: 512, layout: PLAIN },
  { file: "icon-maskable-512.png", size: 512, layout: MASKABLE },
];

for (const t of TARGETS) {
  const png = encodePng(t.size, render(t.size, t.layout));
  writeFileSync(resolve(OUT, t.file), png);
  console.log(`${t.file.padEnd(24)} ${t.size}x${t.size}  ${(png.length / 1024).toFixed(1)} kB`);
}
