/**
 * Worker for running individual extension analysis in isolated Node processes
 */
import { BatchJob, JobResult } from "./types";
/**
 * Generate a safe slug for the job output directory
 */
export declare function generateJobSlug(job: BatchJob, index: number): string;
/**
 * Run a single extension analysis in an isolated Node subprocess
 */
export declare function runJob(job: BatchJob, index: number, outputRoot: string, options?: {
    html?: boolean;
    taintRules?: string;
    timeout?: number;
    nodeBin?: string;
}): Promise<JobResult>;
