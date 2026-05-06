"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileTimerManager = exports.FileTimerManager = exports.FileTimer = void 0;
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
/**
 * File-level timer for individual file analysis
 */
class FileTimer {
    constructor(filePath, fileSize) {
        this.startTs = 0;
        this.stopped = false;
        this.timedOut = false; // quick check mark
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.timeoutMs = this.calculateTimeout(fileSize);
    }
    /**
     * Calculate timeout based on file size
     */
    calculateTimeout(fileSize) {
        const KB = 1024;
        const { small, medium, large } = config_1.default.fileSizeTimeoutMs;
        if (fileSize < 128 * KB)
            return small;
        if (fileSize < 1024 * KB)
            return medium;
        return large;
    }
    /**
     * Get file path
     */
    getFilePath() {
        return this.filePath;
    }
    /**
     * Get file size
     */
    getFileSize() {
        return this.fileSize;
    }
    /**
     * Get configured timeout
     */
    getTimeout() {
        return this.timeoutMs;
    }
    /**
     * Start the file timer
     */
    start() {
        if (this.startTs > 0)
            return;
        this.startTs = performance.now();
        this.stopped = false;
        this.timedOut = false;
        logger_1.default.info(`[FILE TIMER] Started for ${this.filePath} ` +
            `(size=${this.fileSize} bytes, timeout=${this.timeoutMs}ms)`);
    }
    /**
     * Check if file analysis has timed out
     */
    checkTimeout() {
        // fast path
        if (this.stopped || this.timedOut)
            return this.timedOut;
        if (this.timeoutMs <= 0)
            return false;
        if (this.startTs === 0)
            return false;
        const elapsed = performance.now() - this.startTs;
        if (elapsed <= this.timeoutMs)
            return false;
        this.timedOut = true;
        logger_1.default.warn(`[FILE TIMEOUT] Analysis timeout exceeded for ${this.filePath} ` +
            `(size=${this.fileSize} bytes, elapsed=${elapsed.toFixed(0)}ms, ` +
            `limit=${this.timeoutMs}ms)`);
        return true;
    }
    /**
     * Quick check for timeout status (optimized for performance)
     * This is faster than checkTimeout() as it doesn't recalculate elapsed time
     */
    isTimedOut() {
        return this.timedOut;
    }
    /**
     * Get elapsed time in milliseconds
     */
    getElapsedMs() {
        if (this.startTs === 0)
            return 0;
        return performance.now() - this.startTs;
    }
    /**
     * Get remaining time in milliseconds
     */
    getRemainingMs() {
        if (this.stopped || this.timedOut || this.timeoutMs <= 0)
            return 0;
        const elapsed = this.getElapsedMs();
        return Math.max(0, this.timeoutMs - elapsed);
    }
    /**
     * Stop the file timer
     */
    stop() {
        if (this.stopped)
            return;
        this.stopped = true;
    }
}
exports.FileTimer = FileTimer;
/**
 * Global manager to track current file timer
 * This allows any module to access the current file timer
 */
class FileTimerManager {
    /**
     * Set the current file timer
     */
    static setCurrentTimer(filePath, fileSize) {
        this.currentTimer = new FileTimer(filePath, fileSize);
        this.currentTimer.start();
    }
    /**
     * Get the current file timer
     */
    static getCurrentTimer() {
        return this.currentTimer;
    }
    /**
     * Clear the current file timer
     */
    static clearCurrentTimer() {
        if (this.currentTimer) {
            this.currentTimer.stop();
        }
        this.currentTimer = null;
    }
    /**
     * Quick check if current file analysis has timed out
     * Optimized for performance - minimal calculations
     */
    static checkCurrentTimeout() {
        if (!this.currentTimer)
            return false;
        return this.currentTimer.checkTimeout();
    }
    /**
     * Get elapsed time for current timer
     */
    static getCurrentElapsedMs() {
        if (!this.currentTimer)
            return 0;
        return this.currentTimer.getElapsedMs();
    }
    /**
     * Get remaining time for current timer
     */
    static getCurrentRemainingMs() {
        if (!this.currentTimer)
            return 0;
        return this.currentTimer.getRemainingMs();
    }
    /**
     * Check if there's an active timer
     */
    static hasActiveTimer() {
        return (this.currentTimer !== null &&
            !this.currentTimer.isTimedOut() &&
            !this.currentTimer["stopped"]);
    }
}
exports.FileTimerManager = FileTimerManager;
FileTimerManager.currentTimer = null;
exports.fileTimerManager = FileTimerManager;
