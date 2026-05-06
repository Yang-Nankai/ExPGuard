/**
 * Report verbosity level
 */
export type ReportLevel = "detailed" | "partial" | "brief";
/**
 * Options controlling how taint reports are generated and truncated
 */
export interface ReportOptions {
    /** Report verbosity level (default: "detailed") */
    level?: ReportLevel;
    /** Number of items kept at the head when report is truncated */
    headCount?: number;
    /** Number of items kept at the tail when report is truncated */
    tailCount?: number;
    /** Safety cap for maximum flows per issue */
    maxFlowPerIssue?: number;
    /** Whether to include source code */
    includeCode?: boolean;
    /** Number of characters in the code context */
    codeContextChars?: number;
}
/**
 * Artifact retention strategy after analysis
 */
export type ArtifactRetentionPolicy = "none" | "keep_if_sink" | "all";
export interface AppConfig {
    /** Application version */
    appVersion: string;
    /** Global analysis timeout in milliseconds */
    analysisTimeoutMs: number;
    /** File analysis timeout based on size (milliseconds) */
    fileSizeTimeoutMs: {
        small: number;
        medium: number;
        large: number;
    };
    /** Artifact retention policy */
    artifactRetentionPolicy: ArtifactRetentionPolicy;
    /** Artifacts that should always be kept regardless of policy */
    alwaysRetainedArtifacts: string[];
    /** Memory limit for analysis (MB) */
    analysisMemoryMb: number;
    /** Error tolerance multiplier before aborting */
    errorToleranceFactor: number;
    /** Target Chrome version for extension analysis */
    targetChromeVersion: string;
    /** Max size of function call cache */
    functionCallCacheSize: number;
    /** Output directory for graph files */
    graphOutputDir: string;
    /** Output directory for reports */
    reportOutputDir: string;
    /** Log file path */
    logFile: string;
    /** Log verbosity level */
    logLevel: "debug" | "info" | "warn" | "error";
    /** Retry count for recoverable failures */
    maxRetry: number;
    /** Delay between retries in milliseconds */
    retryDelayMs: number;
    /** Max timeout before request retry */
    retryTimeoutMs: number;
    /** Optional HTTP/HTTPS proxy configuration */
    proxies?: {
        http?: string;
        https?: string;
    };
    /** Enable global optimization passes */
    optimizationEnabled: boolean;
    /** Enable AST / IR rewrite optimizations */
    enableOptimizationRewrite: boolean;
    /** Enable inter-procedural analysis */
    enableInterProcedural: boolean;
    /** Enable code formatting (prettier) */
    enablePrettier: boolean;
    /** Gitignore-like patterns for scripts/directories excluded from analysis */
    analysisIgnorePatterns: string[];
    /** Filter taint reports by actually used runtime scripts */
    filterUnusedRuntimeScripts: boolean;
    /** Taint analysis report configuration */
    taintReportOptions: ReportOptions;
    coverageAnalysis: boolean;
}
/**
 * Default report option values
 */
export declare const DEFAULT_REPORT_OPTIONS: Required<ReportOptions>;
/**
 * Default application configuration
 */
declare const config: AppConfig;
export default config;
