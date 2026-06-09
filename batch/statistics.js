"use strict";
/**
 * Statistics generation and report building from batch results
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStatistics = generateStatistics;
/**
 * Generate comprehensive statistics from batch results
 */
function generateStatistics(summary) {
    const results = summary.results;
    const extensionsWithFindings = results.filter((r) => r.findings > 0);
    const extensionsWithErrors = results.filter((r) => r.status === "error");
    // Calculate taint type statistics
    const taintTypeMap = new Map();
    for (const result of results) {
        if (result.findings === 0)
            continue;
        for (const [flowType, count] of Object.entries(result.flowTypeCounts)) {
            if (!taintTypeMap.has(flowType)) {
                taintTypeMap.set(flowType, {
                    type: flowType,
                    count: 0,
                    extensions: [],
                });
            }
            const stats = taintTypeMap.get(flowType);
            stats.count += count;
            stats.extensions.push({
                id: result.job.extensionId || "unknown",
                version: result.job.extensionVersion,
                findings: count,
                outputDir: result.outputDir,
            });
        }
    }
    const taintTypes = Array.from(taintTypeMap.values()).sort((a, b) => b.count - a.count);
    // Build detailed extension reports
    const extensionsWithReports = extensionsWithFindings.map((result) => ({
        extensionId: result.job.extensionId || "unknown",
        extensionVersion: result.job.extensionVersion,
        findings: result.findings,
        flowTypes: result.flowTypeCounts,
        outputDir: result.outputDir,
        durationMs: result.durationMs,
    }));
    // Build error reports
    const errors = extensionsWithErrors.map((result) => ({
        extensionId: result.job.extensionId || "unknown",
        extensionVersion: result.job.extensionVersion,
        errorType: result.errorType || "Unknown",
        errorMessage: result.errorMessage || "No error message",
        outputDir: result.outputDir,
    }));
    // Calculate summary statistics
    const totalDurationMs = results.reduce((sum, r) => sum + r.durationMs, 0);
    const avgDurationMs = results.length > 0 ? totalDurationMs / results.length : 0;
    return {
        summary: {
            totalExtensions: results.length,
            extensionsWithFindings: extensionsWithFindings.length,
            extensionsWithErrors: extensionsWithErrors.length,
            totalFindings: summary.findings,
            totalDurationMs,
            avgDurationMs,
        },
        taintTypes,
        extensionsWithReports,
        errors,
    };
}
