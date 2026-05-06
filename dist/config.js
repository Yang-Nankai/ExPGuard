"use strict";
// config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REPORT_OPTIONS = void 0;
/**
 * Default report option values
 */
exports.DEFAULT_REPORT_OPTIONS = {
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
const config = {
    appVersion: "1.0.0",
    analysisTimeoutMs: 1 * 60 * 1000,
    fileSizeTimeoutMs: {
        small: 30000, // 10 seconds for < 100KB
        medium: 60000, // 60 seconds for 100KB-1MB
        large: 120000, // 120 seconds for >1MB
    },
    artifactRetentionPolicy: "none",
    alwaysRetainedArtifacts: [
        // "analysis.log",
        // "report.txt",
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
    retryTimeoutMs: 120000,
    maxRetry: 3,
    retryDelayMs: 3000,
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
    filterUnusedRuntimeScripts: true, // true
    taintReportOptions: {
        level: "partial",
        headCount: 50,
        tailCount: 50,
        maxFlowPerIssue: 100,
    },
    // TODO: 存在一点问题，对事件处理不完全，导致有些漏洞可能被遗漏(不过这些事件需要用户去触发才行肯定是)
    coverageAnalysis: false, // false
};
exports.default = config;
