/**
 * File-level timer for individual file analysis
 */
export declare class FileTimer {
    private readonly filePath;
    private readonly fileSize;
    private readonly timeoutMs;
    private startTs;
    private stopped;
    private timedOut;
    constructor(filePath: string, fileSize: number);
    /**
     * Calculate timeout based on file size
     */
    private calculateTimeout;
    /**
     * Get file path
     */
    getFilePath(): string;
    /**
     * Get file size
     */
    getFileSize(): number;
    /**
     * Get configured timeout
     */
    getTimeout(): number;
    /**
     * Start the file timer
     */
    start(): void;
    /**
     * Check if file analysis has timed out
     */
    checkTimeout(): boolean;
    /**
     * Quick check for timeout status (optimized for performance)
     * This is faster than checkTimeout() as it doesn't recalculate elapsed time
     */
    isTimedOut(): boolean;
    /**
     * Get elapsed time in milliseconds
     */
    getElapsedMs(): number;
    /**
     * Get remaining time in milliseconds
     */
    getRemainingMs(): number;
    /**
     * Stop the file timer
     */
    stop(): void;
}
/**
 * Global manager to track current file timer
 * This allows any module to access the current file timer
 */
export declare class FileTimerManager {
    private static currentTimer;
    /**
     * Set the current file timer
     */
    static setCurrentTimer(filePath: string, fileSize: number): void;
    /**
     * Get the current file timer
     */
    static getCurrentTimer(): FileTimer | null;
    /**
     * Clear the current file timer
     */
    static clearCurrentTimer(): void;
    /**
     * Quick check if current file analysis has timed out
     * Optimized for performance - minimal calculations
     */
    static checkCurrentTimeout(): boolean;
    /**
     * Get elapsed time for current timer
     */
    static getCurrentElapsedMs(): number;
    /**
     * Get remaining time for current timer
     */
    static getCurrentRemainingMs(): number;
    /**
     * Check if there's an active timer
     */
    static hasActiveTimer(): boolean;
}
export declare const fileTimerManager: typeof FileTimerManager;
