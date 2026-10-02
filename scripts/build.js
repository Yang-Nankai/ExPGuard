// scripts/build.js
//
// Build entry point used by `npm run build`.
//
// Why this wrapper exists:
//   The previous build script was `tsc && node scripts/copy-assets.js`. Because
//   `tsc` returns a non-zero exit code whenever it reports *any* type error, the
//   `&&` short-circuited and the asset-copy step never ran — leaving the vendored
//   `src/transformation/{escope,esmangle}` JS libraries out of `dist/`, even
//   though `tsc` had already emitted the compiled `.js` output (noEmitOnError is
//   not set).
//
// This wrapper runs `tsc` and then *always* runs the asset copy, so `dist/` is
// complete regardless of type-check outcome. It still propagates `tsc`'s exit
// code so CI / typecheck failures remain visible.

const { spawnSync } = require("child_process");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    cwd: repoRoot,
    stdio: "inherit",
    shell: process.platform === "win32", // resolve .cmd shims on Windows
  });
  if (result.error) throw result.error;
  return result.status == null ? 1 : result.status;
}

// 1) Compile TypeScript. tsc emits JS even when it reports type errors, so we
//    remember its exit code but do NOT abort the copy step.
const tscExit = run("tsc", []);
if (tscExit !== 0) {
  console.warn(
    `[build] tsc exited with code ${tscExit}; continuing so runtime assets are still copied into dist/`,
  );
}

// 2) Copy non-TypeScript runtime assets (taint rules + escope/esmangle libs).
const copyExit = run("node", [path.join("scripts", "copy-assets.js")]);

// Surface a real failure: fail the build if either step failed, but only after
// the copy has run so dist/ is left in a usable state.
process.exit(copyExit !== 0 ? copyExit : tscExit);
