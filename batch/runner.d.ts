/**
 * Main batch runner orchestrating parallel extension analysis
 */
import { BatchOptions, BatchSummary } from "./types";
/**
 * Run batch analysis with concurrent workers
 */
export declare function runBatch(options: BatchOptions): Promise<BatchSummary>;
