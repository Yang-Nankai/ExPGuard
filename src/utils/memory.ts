import config from "../config";

/**
 * Check memory usage.
 * Limits memory usage based on the configured maximum memory (in MB).
 */
export function checkMemoryUsage(): boolean {
  // Get current heap usage in MB
  const bytesUsed = process.memoryUsage().heapUsed;
  const megabytesUsed = bytesUsed / 1_000_000;

  // Compare with memory limit from config
  return megabytesUsed <= config.analysisMemoryMb;
}
