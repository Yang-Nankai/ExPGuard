/**
 * Job discovery and resolution from different input sources
 */
import { BatchJob, Platform } from "./types";
/**
 * Resolve jobs from a directory containing extension packages.
 * Scans for files matching pattern: <id>.crx, <id>_<version>.crx, <id>.xpi, <id>_<version>.xpi
 */
export declare function resolveJobsFromDirectory(directory: string, platform: Platform): BatchJob[];
/**
 * Resolve jobs from a JSONL file.
 * Each line should be a JSON object with: {id: string, version?: string, path: string}
 */
export declare function resolveJobsFromJsonl(jsonlPath: string, platform: Platform): BatchJob[];
/**
 * Resolve jobs based on batch options
 */
export declare function resolveJobs(input: string, sourceMode: "directory" | "jsonl", platform: Platform): BatchJob[];
