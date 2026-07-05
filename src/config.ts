// config.ts

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
export type ArtifactRetentionPolicy =
  | "none"          // Do not keep any extracted artifacts
  | "keep_if_sink" // Keep artifacts only if sinks are found
  | "all";         // Always keep all artifacts

export interface AppConfig {
  /** Application version */
  appVersion: string;

  /** Global analysis timeout in milliseconds */
  analysisTimeoutMs: number;

  /** File analysis timeout based on size (milliseconds) */
  fileSizeTimeoutMs: {
    small: number;  // < 100KB
    medium: number; // 100KB~1MB
    large: number;  // > 1MB
  }

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

  /**
   * When true, additionally emit a self-contained `report.html` (folder tree +
   * per-finding propagation timeline) alongside the text report. The CLI
   * `--html` flag overrides this per run.
   */
  emitHtmlReport: boolean;

  /**
   * Optional path to a user-supplied taint rule file (.json or .ts/.js).
   * When set, the rule engine layers these rules on top of the defaults at
   * startup. Use it to add new (source, sink) → FlowType mappings or to
   * suppress noisy categories without editing the engine.
   */
  taintRulesPath?: string;

  // Allow additional properties
  coverageAnalysis: boolean;
}

/**
 * Default report option values
 */
export const DEFAULT_REPORT_OPTIONS: Required<ReportOptions> = {
  level: "detailed",
  headCount: 20,
  tailCount: 20,
  maxFlowPerIssue: 200,
  includeCode: true,
  codeContextChars: 20,
};

/**
 * Default application configuration
 */
const config: AppConfig = {
  appVersion: "1.0.0",
  analysisTimeoutMs: 1 * 60 * 1000,
  fileSizeTimeoutMs: {
    small: 30_000,    // 10 seconds for < 100KB
    medium: 60_000,   // 60 seconds for 100KB-1MB
    large: 120_000,    // 120 seconds for >1MB
  },

  artifactRetentionPolicy: "none",
  alwaysRetainedArtifacts: [
    "analysis.log",
    "report.txt",
    "summary.json",
    // "manifest.json"
  ],
  analysisMemoryMb: 8192,
  errorToleranceFactor: 5,
  targetChromeVersion: "141.0.7390.123",

  functionCallCacheSize: 4096,

  graphOutputDir: "",
  reportOutputDir: "",
  logFile: "../../logs/app.log",

  logLevel: "info",

  retryTimeoutMs: 120_000,
  maxRetry: 3,
  retryDelayMs: 3_000,
  proxies: {
    http: "http://127.0.0.1:7890",
    https: "http://127.0.0.1:7890",
  },

  optimizationEnabled: true,
  enableOptimizationRewrite: false,
  enableInterProcedural: true,
  enablePrettier: true,
  analysisIgnorePatterns: [
    "node_modules/**",
  ],
  filterUnusedRuntimeScripts: true,  // true

  taintReportOptions: {
    level: "partial",
    headCount: 50,
    tailCount: 50,
    maxFlowPerIssue: 100,
  },

  emitHtmlReport: false,

  // TODO: 存在一点问题，对事件处理不完全，导致有些漏洞可能被遗漏(不过这些事件需要用户去触发才行肯定是)
  coverageAnalysis: false,  // false
};

export default config;
