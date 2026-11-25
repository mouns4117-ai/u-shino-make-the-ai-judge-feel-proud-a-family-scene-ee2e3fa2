// Make the AI Judge Feel Proud: A Family Scene
// Writes one short family scene (one line, 178 chars) to /output/entry.txt.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ENTRY =
  "Every Sunday Dad still sets a place for Grandma — same chipped plate, same empty chair — and Mum still says, 'She'd have loved the gravy,' like it's the first time she's said it.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // Fail fast: the gate is 1-280 UTF-8 characters, one or two lines, not only whitespace.
  if (ENTRY.length < 1 || ENTRY.length > 280) {
    throw new Error(`entry is ${ENTRY.length} chars, outside the 1-280 gate`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  const lines = ENTRY.split("\n");
  if (lines.length > 2) {
    throw new Error(`entry has ${lines.length} lines, gate allows at most 2`);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  // Empty /output's CONTENTS only; never remove the mounted directory itself.
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(`${OUT_DIR}/${name}`, { recursive: true, force: true });
  }
  writeFileSync(OUT_FILE, ENTRY, "utf8");
  // Post-write read-back: the file on disk must be byte-for-byte the entry.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== ENTRY) {
    throw new Error("read-back mismatch: /output/entry.txt does not match the entry");
  }
}

main();
