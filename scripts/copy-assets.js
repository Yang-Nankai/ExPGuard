// scripts/copy-assets.js
//
// Copy non-TypeScript runtime assets that `tsc` does not emit into `dist/`.
// Run automatically after `tsc` via the `build` npm script. This replaces the
// old manual "copy src/transformation into dist" step from the README.
//
// What gets copied:
//   - src/taint/rules/*.json        → dist/taint/rules/   (default taint rules,
//       loaded at runtime via path.join(__dirname, "rules", "default-rules.json"))
//   - src/transformation/**/*.js    → dist/transformation/ (escope / esmangle
//       JS libraries used by the optional optimization passes)

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const srcDir = path.join(repoRoot, "src");
const distDir = path.join(repoRoot, "dist");

/** Recursively copy every file matching `filter` from `from` to `to`. */
function copyTree(from, to, filter) {
  if (!fs.existsSync(from)) return 0;
  let copied = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copied += copyTree(src, dst, filter);
    } else if (entry.isFile() && filter(entry.name)) {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
      copied++;
    }
  }
  return copied;
}

const isJson = (name) => name.endsWith(".json");
const isJs = (name) => name.endsWith(".js");

let total = 0;
total += copyTree(
  path.join(srcDir, "taint", "rules"),
  path.join(distDir, "taint", "rules"),
  isJson,
);
total += copyTree(
  path.join(srcDir, "transformation"),
  path.join(distDir, "transformation"),
  isJs,
);

console.log(`[build] copied ${total} runtime asset(s) into dist/`);
