// PWA icon generator (backlog P2-1a).
//
// The icon is the brand's own mark: the two speech bubbles of the Embassy
// Hospitality logo, lifted out of the banner in src/assets and set on white.
// The banner as a whole is 2041x656 and does not fit a square — letterboxed
// into 512x512 it is a stamp of logo floating in dead space — but the mark
// alone does. (The first version drew a gold star instead. A learner looking
// for the app on their phone looks for the logo they see inside it.)
//
// Written against node:zlib rather than a raster library on purpose: adding
// sharp or canvas to a project that ships a 24h supply-chain guard, for
// five files that change roughly never, is a bad trade.
//
//   bun scripts/gen-icons.ts

import { deflateSync, inflateSync } from "node:zlib";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const LOGO = resolve(ROOT, "src", "assets", "Logo_EmbassyHospitality_filetrong.png");
const OUT = resolve(ROOT, "public");

// ---------------------------------------------------------------------------
// Minimal PNG reader: 8-bit RGBA, not interlaced — what the logo file is.
// ---------------------------------------------------------------------------

type Image = { width: number; height: number; rgba: Uint8Array };

function decodePng(file: Buffer): Image {
  const width = file.readUInt32BE(16);
  const height = file.readUInt32BE(20);
  if (file[24] !== 8 || file[25] !== 6 || file[28] !== 0)
    throw new Error("gen-icons reads 8-bit RGBA, non-interlaced PNG only");

  const idat: Buffer[] = [];
  for (let o = 8; o < file.length; ) {
    const len = file.readUInt32BE(o);
    if (file.toString("ascii", o + 4, o + 8) === "IDAT")
      idat.push(file.subarray(o + 8, o + 8 + len));
    o += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));

  const bpp = 4;
  const stride = width * bpp;
  const rgba = new Uint8Array(stride * height);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = y * (stride + 1) + 1;
    const out = y * stride;
    for (let x = 0; x < stride; x++) {
      const left = x >= bpp ? rgba[out + x - bpp] : 0;
      const up = y > 0 ? rgba[out - stride + x] : 0;
      const upLeft = y > 0 && x >= bpp ? rgba[out - stride + x - bpp] : 0;
      let predicted = 0;
      if (filter === 1) predicted = left;
      else if (filter === 2) predicted = up;
      else if (filter === 3) predicted = (left + up) >> 1;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        predicted = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
      }
      rgba[out + x] = (raw[line + x] + predicted) & 0xff;
    }
  }
  return { width, height, rgba };
}

// ---------------------------------------------------------------------------
// The mark: every connected shape that starts in the upper half of the
// banner. The two bubbles do; the wordmark below them does not. Found by
// shape rather than by fixed coordinates, so a re-exported logo with a
// different margin still gives the bubbles and nothing else.
// ---------------------------------------------------------------------------

function cutMark(logo: Image): Image {
  const { width, height, rgba } = logo;
  const inked = (i: number) => rgba[i * 4 + 3] > 8;
  const label = new Int32Array(width * height); // 0 = unvisited
  const keep = new Set<number>();
  let next = 0;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let start = 0; start < width * height; start++) {
    if (label[start] !== 0 || !inked(start)) continue;
    next++;
    const stack = [start];
    label[start] = next;
    const box = { minX: width, minY: height, maxX: 0, maxY: 0 };
    while (stack.length > 0) {
      const i = stack.pop()!;
      const x = i % width;
      const y = (i - x) / width;
      box.minX = Math.min(box.minX, x);
      box.maxX = Math.max(box.maxX, x);
      box.minY = Math.min(box.minY, y);
      box.maxY = Math.max(box.maxY, y);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const n = ny * width + nx;
          if (label[n] === 0 && inked(n)) {
            label[n] = next;
            stack.push(n);
          }
        }
      }
    }
    if (box.minY < height / 2) {
      keep.add(next);
      minX = Math.min(minX, box.minX);
      minY = Math.min(minY, box.minY);
      maxX = Math.max(maxX, box.maxX);
      maxY = Math.max(maxY, box.maxY);
    }
  }
  if (keep.size === 0) throw new Error("no mark found in the upper half of the logo");

  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  const out = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const src = (y + minY) * width + (x + minX);
      // Only the kept shapes: a letter that reaches into the box stays out.
      if (!keep.has(label[src])) continue;
      out.set(rgba.subarray(src * 4, src * 4 + 4), (y * w + x) * 4);
    }
  }
  return { width: w, height: h, rgba: out };
}

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
// The icon: the mark, centred on white.
//
// White, not the app's navy: the logo's blue disappears on navy, and white is
// the ground the logo was drawn for. Opaque, because iOS turns a transparent
// home-screen icon black.
// ---------------------------------------------------------------------------

/** Share of the icon's width the mark takes.
 *
 *  A maskable icon may be cropped to a circle of 80% width, so the whole
 *  mark — corners included — has to sit inside it. The plain icon has no
 *  such constraint and can breathe closer to the edge. */
const PLAIN = 0.76;
const MASKABLE = 0.6;

function render(size: number, mark: Image, share: number): Uint8Array {
  const scale = (size * share) / mark.width; // mark pixels → icon pixels
  const drawnW = mark.width * scale;
  const drawnH = mark.height * scale;
  const left = (size - drawnW) / 2;
  const top = (size - drawnH) / 2;

  // Enough samples per icon pixel to cover every mark pixel under it: the
  // 32px favicon squeezes about twenty of them into one.
  const ss = Math.min(48, Math.max(4, Math.ceil(2 / scale)));
  const px = new Uint8Array(size * size * 3);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const mx = Math.floor((x + (sx + 0.5) / ss - left) / scale);
          const my = Math.floor((y + (sy + 0.5) / ss - top) / scale);
          if (mx < 0 || my < 0 || mx >= mark.width || my >= mark.height) continue;
          const i = (my * mark.width + mx) * 4;
          const alpha = mark.rgba[i + 3] / 255;
          r += mark.rgba[i] * alpha;
          g += mark.rgba[i + 1] * alpha;
          b += mark.rgba[i + 2] * alpha;
          a += alpha;
        }
      }
      const n = ss * ss;
      const o = (y * size + x) * 3;
      // Over white: what the samples did not cover stays 255.
      px[o] = Math.round(r / n + 255 * (1 - a / n));
      px[o + 1] = Math.round(g / n + 255 * (1 - a / n));
      px[o + 2] = Math.round(b / n + 255 * (1 - a / n));
    }
  }
  return px;
}

// ---------------------------------------------------------------------------

const mark = cutMark(decodePng(readFileSync(LOGO)));
console.log(`mark cut from the logo: ${mark.width}x${mark.height}`);
mkdirSync(OUT, { recursive: true });

const TARGETS: { file: string; size: number; share: number }[] = [
  { file: "favicon-32.png", size: 32, share: PLAIN },
  // iOS never reads the manifest for the home-screen icon; it wants this
  // one, at this name, and it must not be transparent.
  { file: "apple-touch-icon.png", size: 180, share: PLAIN },
  { file: "icon-192.png", size: 192, share: PLAIN },
  { file: "icon-512.png", size: 512, share: PLAIN },
  { file: "icon-maskable-512.png", size: 512, share: MASKABLE },
];

for (const t of TARGETS) {
  const png = encodePng(t.size, render(t.size, mark, t.share));
  writeFileSync(resolve(OUT, t.file), png);
  console.log(`${t.file.padEnd(24)} ${t.size}x${t.size}  ${(png.length / 1024).toFixed(1)} kB`);
}
