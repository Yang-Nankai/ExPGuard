// utils/cleanup.ts
import fs from "fs/promises";
import path from "path";
import config from "../config";
import logger from "./logger";

function hasSink(summary?: any): boolean {
  return typeof summary?.sinkCount === "number" && summary.sinkCount > 0;
}

function shouldKeepArtifacts(policy: string, summary?: any): boolean {
  switch (policy) {
    case "all":
      return true;

    case "keep_if_sink":
      return hasSink(summary);

    case "none":
    default:
      return false;
  }
}

async function removeDir(dir: string) {
  try {
    await fs.rm(dir, { recursive: true, force: true });
    logger.debug(`[CLEANUP] Removed directory: ${dir}`);
  } catch (err) {
    logger.warn(`[CLEANUP] Failed to remove directory: ${dir}`);
    logger.warn(String(err));
  }
}

async function moveManifestToOutputDir(outputDir: string) {
  try {
    const manifestSrc = path.join(outputDir, "unpacked", "manifest.json");
    const manifestDest = path.join(outputDir, "manifest.json");

    // check file
    await fs.access(manifestSrc);

    // move file
    await fs.rename(manifestSrc, manifestDest);
  } catch (err: any) {
    logger.warn(`[CLEANUP] Failed to move manifest.json: ${err.message}`);
  }
}

export async function cleanupArtifacts(outputDir: string, summary?: any) {
  const policy = config.artifactRetentionPolicy;

  if (shouldKeepArtifacts(policy, summary)) {
    logger.debug(`[CLEANUP] Skip cleanup due to policy=${policy}`);
    return;
  }

  const unpackedDir = path.join(outputDir, "unpacked");

  // move manifest.json
  await moveManifestToOutputDir(outputDir);

  await removeDir(unpackedDir);
}
