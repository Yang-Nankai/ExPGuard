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

  /**
   * Collapse sources that share (sourceType, remark, source-location) so the
   * expensive full propagation path is materialized only for the first
   * ("representative") occurrence; later duplicates are emitted as lightweight
   * stubs (identity + sinks + sanitized, empty flow). Output-equivalent for
   * consumers that already de-duplicate sources (the source-level report), and
   * avoids building millions of flow-step objects on pathological files.
   * Default: false (every source keeps its full path — legacy behavior).
   */
  dedupSources?: boolean;
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

  /**
   * Resolve ES-module/importScripts bindings across extension files.
   *
   * This is intentionally independent of ordinary inter-procedural function
   * analysis so ablation experiments can remove only cross-module resolution.
   */
  enableModuleResolution: boolean;

  /**
   * Resolve taint written through chrome.storage when a matching later read is
   * observed. Storage writes remain modeled as sinks when this is disabled.
   */
  enableStorageImplicitPropagation: boolean;

  /** Enable code formatting (prettier) */
  enablePrettier: boolean;

  /** Gitignore-like patterns for scripts/directories excluded from analysis */
  analysisIgnorePatterns: string[];

  /** Filter taint reports by actually used runtime scripts */
  filterUnusedRuntimeScripts: boolean;

  /**
   * Drop matched flows that cross no privilege boundary (see
   * `src/taint/privilege.ts`) — page-controlled data reaching a sink a content
   * script shares with the page, and `chrome.storage` writes nothing reads
   * back. Suppressed flows remain available via
   * `taintManager.getPrivilegeSuppressedFlows()` and in `summary.json`.
   *
   * Set to false to report every rule match regardless of exploitability; each
   * flow still carries `privilegeCrossing` / `privilegeReason`.
   */
  privilegeDeltaFiltering: boolean;

  /**
   * Fraction of a file's analysis budget the entry-point sweep may consume.
   *
   * The sweep runs last and is pure upside, but on function-dense scripts it
   * can cost two orders of magnitude more than the main pass. Bounding it
   * keeps per-file wall clock predictable at corpus scale. Set to 0 to
   * effectively disable the sweep while leaving `coverageAnalysis` on.
   */
  entrySweepBudgetRatio: number;

  /** Taint analysis report configuration */
  taintReportOptions: ReportOptions;

  /**
   * When true, additionally emit a self-contained `report.html` (folder tree +
   * per-finding propagation timeline) alongside the text report. The CLI
   * `--html` flag overrides this per run.
   */
  emitHtmlReport: boolean;

  /**
   * Taint report artifact format(s). The analyzer emits a source-level report
   * that resolves every propagation step back to the extension's own source:
   *   - "json" -> `report.flows.json` (machine form, one object per flow)
   *   - "md"   -> `report.source.md`  (human/LLM form, one line per step)
   *   - "both" -> both files
   */
  reportFormat: "json" | "md" | "both";

  /**
   * When true (default), only sources that actually reach a sink are emitted;
   * sources whose taint never lands in a sink are dropped as non-actionable.
   * Set false to keep every tainted source in the report.
   */
  reportOnlyWithSinks: boolean;

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
  dedupSources: false,
};

/**
 * Default application configuration
 */
const config: AppConfig = {
  appVersion: "1.0.0",
  analysisTimeoutMs: 1 * 60 * 1000,
  fileSizeTimeoutMs: {
    // Wider per-file budgets for the vulnerability-target rerun. The outer
    // batch runner still enforces a finite extension-level timeout.
    small: 120_000,
    medium: 300_000,
    large: 600_000,
  },

  artifactRetentionPolicy: "none",
  alwaysRetainedArtifacts: [
    "analysis.log",
    "report.source.md",
    "report.flows.json",
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
  // Runtime-only ablation switches: defaults preserve the full ExPGuard
  // analysis, while a batch can opt out without editing the source again.
  enableModuleResolution: process.env.EXPGUARD_DISABLE_MODULE_RESOLUTION !== "1",
  enableStorageImplicitPropagation:
    process.env.EXPGUARD_DISABLE_STORAGE_IMPLICIT_PROPAGATION !== "1",
  enablePrettier: true,
  analysisIgnorePatterns: [
    "node_modules/**",
  ],
  filterUnusedRuntimeScripts: true,  // true
  privilegeDeltaFiltering: true,
  entrySweepBudgetRatio: 0.35,

  taintReportOptions: {
    // Emit the full taint propagation path (no head/tail truncation, no
    // per-issue cap) so report.txt carries every propagation step.
    level: "detailed",
    headCount: 50,
    tailCount: 50,
    maxFlowPerIssue: Number.MAX_SAFE_INTEGER,
  },

  emitHtmlReport: false,

  reportFormat: "both",
  reportOnlyWithSinks: true,

  /**
   * Entry-point sweep: after the root pass, re-enter every function scope the
   * analyzer never reached (callbacks handed to unmodeled APIs, dispatch
   * tables, ...) as a standalone entry point. Parameters are bound to
   * untainted opaque values, so the sweep only adds reachability — taint still
   * originates exclusively at modeled sources. See `EntryPointAnalyzer`.
   */
  coverageAnalysis: true,
};

export default config;
