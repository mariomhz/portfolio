/*
 * Encodes a clip into AV1 + h.264 + a poster, dropped in public/videos/.
 *
 *   node scripts/encode-video.mjs raw/languages.mov languages --width 720
 *
 * Needs ffmpeg on PATH.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";

const [input, name, ...rest] = process.argv.slice(2);

if (!input || !name) {
  console.error("usage: node scripts/encode-video.mjs <input> <output-basename> [--width 720]");
  process.exit(1);
}

const widthFlag = rest.indexOf("--width");
const width = widthFlag === -1 ? 720 : Number(rest[widthFlag + 1]);
const outDir = "public/videos";
mkdirSync(outDir, { recursive: true });

const out = (suffix) => path.join(outDir, `${name}${suffix}`);
const mb = (f) => (statSync(f).size / 1048576).toFixed(2) + " MB";
const run = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });

const scale = `scale=${width}:-2`;

console.log(`encoding ${input} at ${width}px wide`);

// AV1. Raise the CRF if the file is too big, lower it if it looks soft.
run([
  "-i", input,
  "-vf", scale,
  "-c:v", "libsvtav1", "-crf", "40", "-preset", "4",
  "-c:a", "libopus", "-b:a", "96k",
  "-movflags", "+faststart",
  out("-av1.mp4"),
]);

// h.264 fallback.
run([
  "-i", input,
  "-vf", scale,
  "-c:v", "libx264", "-crf", "26", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "128k",
  "-movflags", "+faststart",
  out(".mp4"),
]);

// Poster.
run([
  "-ss", "0.5", "-i", input,
  "-frames:v", "1",
  "-vf", scale,
  "-c:v", "libwebp", "-quality", "80",
  out("-poster.webp"),
]);

console.log(`
  ${out("-av1.mp4")}      ${mb(out("-av1.mp4"))}
  ${out(".mp4")}          ${mb(out(".mp4"))}
  ${out("-poster.webp")}  ${mb(out("-poster.webp"))}

Next: uncomment the languageReel object in HorizontalScroll.jsx and write
public/videos/${name}.en.vtt with the captions.`);
