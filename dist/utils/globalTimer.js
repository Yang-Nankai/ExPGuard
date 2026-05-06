"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGlobalTimer = startGlobalTimer;
exports.checkGlobalTimeout = checkGlobalTimeout;
exports.getGlobalElapsedMs = getGlobalElapsedMs;
exports.getGlobalElapsedSeconds = getGlobalElapsedSeconds;
exports.stopGlobalTimer = stopGlobalTimer;
// utils/globalTimer.ts
const perf_hooks_1 = require("perf_hooks");
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../config"));
const errorCode_1 = require("./errorCode");
let started = false;
let startTs = 0;
let timeoutMs = 0;
/**
 * Start global analysis timer (idempotent)
 */
function startGlobalTimer() {
    var _a;
    if (started)
        return;
    started = true;
    startTs = perf_hooks_1.performance.now();
    timeoutMs = (_a = config_1.default.analysisTimeoutMs) !== null && _a !== void 0 ? _a : 0;
    logger_1.default.info(`[GLOBAL] Program started (timeout=${timeoutMs > 0 ? timeoutMs : "disabled"}ms)`);
}
/**
 * Ultra-lightweight cooperative timeout check
 * Safe to call in hot loops
 */
function checkGlobalTimeout() {
    if (!started || timeoutMs <= 0)
        return;
    if (perf_hooks_1.performance.now() - startTs <= timeoutMs)
        return;
    logger_1.default.error(`[GLOBAL TIMEOUT] elapsed=${Math.round(perf_hooks_1.performance.now() - startTs)}ms limit=${timeoutMs}ms`);
    throw errorCode_1.Errors.TimeoutError(`Global analysis timeout exceeded`);
}
/**
 * Get elapsed running time in milliseconds
 * Safe to call anywhere, no side effects
 */
function getGlobalElapsedMs() {
    if (!started)
        return 0;
    return perf_hooks_1.performance.now() - startTs;
}
/**
 * Get elapsed running time in seconds (float)
 */
function getGlobalElapsedSeconds() {
    return getGlobalElapsedMs() / 1000;
}
/**
 * Stop global analysis timer (idempotent)
 */
function stopGlobalTimer(reason = "exit") {
    if (!started)
        return;
    const durationMs = perf_hooks_1.performance.now() - startTs;
    logger_1.default.info(`[GLOBAL] Program finished (${reason}), total=${(durationMs / 1000).toFixed(2)}s`);
}
