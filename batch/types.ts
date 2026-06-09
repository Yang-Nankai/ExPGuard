/**
 * Batch analysis type definitions
 */

export type Platform = "chrome" | "firefox";

export type SourceType = "CRX" | "DIR" | "WEB" | "XPI";

export interface BatchJob {
  sourceType: SourceType;
  input: string;
  extensionId?: string;
  extensionVersion?: string;
  platform: Platform;
}

export interface JobResult {
  job: BatchJob;
  outputDir: string;
  status: "success" | "error";
  durationMs: number;
  totalFiles: number;
  findings: number;
  flowTypeCounts: Record<string, number>;
  nodeCoverage?: number;
  scopeCoverage?: number;
  errorType?: string;
  errorMessage?: string;
}

export interface BatchSummary {
  total: number;
  findings: number;
  errors: number;
  startedAtMs: number;
  endedAtMs: number;
  results: JobResult[];
}

export interface BatchOptions {
  input: string;
  sourceMode: "directory" | "jsonl";
  platform: Platform;
  outputDir: string;
  jobs?: number;
  html?: boolean;
  taintRules?: string;
  timeout?: number;
}

export interface JsonlEntry {
  id: string;
  version?: string;
  path: string;
}

export interface TaintTypeStats {
  type: string;
  count: number;
  extensions: Array<{
    id: string;
    version?: string;
    findings: number;
    outputDir: string;
  }>;
}

export interface StatisticsReport {
  summary: {
    totalExtensions: number;
    extensionsWithFindings: number;
    extensionsWithErrors: number;
    totalFindings: number;
    totalDurationMs: number;
    avgDurationMs: number;
  };
  taintTypes: TaintTypeStats[];
  extensionsWithReports: Array<{
    extensionId: string;
    extensionVersion?: string;
    findings: number;
    flowTypes: Record<string, number>;
    outputDir: string;
    durationMs: number;
  }>;
  errors: Array<{
    extensionId: string;
    extensionVersion?: string;
    errorType: string;
    errorMessage: string;
    outputDir: string;
  }>;
}
