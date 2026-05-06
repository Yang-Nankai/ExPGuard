import config from "../config";
import logger from "./logger";

/**
 * File-level timer for individual file analysis
 */
export class FileTimer {
  private readonly filePath: string;
  private readonly fileSize: number;
  private readonly timeoutMs: number;
  private startTs: number = 0;
  private stopped: boolean = false;
  private timedOut: boolean = false; // quick check mark

  constructor(filePath: string, fileSize: number) {
    this.filePath = filePath;
    this.fileSize = fileSize;
    this.timeoutMs = this.calculateTimeout(fileSize);
  }

  /**
   * Calculate timeout based on file size
   */
  private calculateTimeout(fileSize: number): number {
    const KB = 1024;
    const { small, medium, large } = config.fileSizeTimeoutMs;

    if (fileSize < 128 * KB) return small;
    if (fileSize < 1024 * KB) return medium;
    return large;
  }

  /**
   * Get file path
   */
  getFilePath(): string {
    return this.filePath;
  }

  /**
   * Get file size
   */
  getFileSize(): number {
    return this.fileSize;
  }

  /**
   * Get configured timeout
   */
  getTimeout(): number {
    return this.timeoutMs;
  }

  /**
   * Start the file timer
   */
  start(): void {
    if (this.startTs > 0) return;

    this.startTs = performance.now();
    this.stopped = false;
    this.timedOut = false;

    logger.info(
      `[FILE TIMER] Started for ${this.filePath} ` +
        `(size=${this.fileSize} bytes, timeout=${this.timeoutMs}ms)`,
    );
  }

  /**
   * Check if file analysis has timed out
   */
  checkTimeout(): boolean {
    // fast path
    if (this.stopped || this.timedOut) return this.timedOut;
    if (this.timeoutMs <= 0) return false;
    if (this.startTs === 0) return false;

    const elapsed = performance.now() - this.startTs;

    if (elapsed <= this.timeoutMs) return false;

    this.timedOut = true;

    logger.warn(
      `[FILE TIMEOUT] Analysis timeout exceeded for ${this.filePath} ` +
        `(size=${this.fileSize} bytes, elapsed=${elapsed.toFixed(0)}ms, ` +
        `limit=${this.timeoutMs}ms)`,
    );

    return true;
  }

  /**
   * Quick check for timeout status (optimized for performance)
   * This is faster than checkTimeout() as it doesn't recalculate elapsed time
   */
  isTimedOut(): boolean {
    return this.timedOut;
  }

  /**
   * Get elapsed time in milliseconds
   */
  getElapsedMs(): number {
    if (this.startTs === 0) return 0;
    return performance.now() - this.startTs;
  }

  /**
   * Get remaining time in milliseconds
   */
  getRemainingMs(): number {
    if (this.stopped || this.timedOut || this.timeoutMs <= 0) return 0;
    const elapsed = this.getElapsedMs();
    return Math.max(0, this.timeoutMs - elapsed);
  }

  /**
   * Stop the file timer
   */
  stop(): void {
    if (this.stopped) return;
    this.stopped = true;
  }
}

/**
 * Global manager to track current file timer
 * This allows any module to access the current file timer
 */
export class FileTimerManager {
  private static currentTimer: FileTimer | null = null;

  /**
   * Set the current file timer
   */
  static setCurrentTimer(filePath: string, fileSize: number): void {
    this.currentTimer = new FileTimer(filePath, fileSize);
    this.currentTimer.start();
  }

  /**
   * Get the current file timer
   */
  static getCurrentTimer(): FileTimer | null {
    return this.currentTimer;
  }

  /**
   * Clear the current file timer
   */
  static clearCurrentTimer(): void {
    if (this.currentTimer) {
      this.currentTimer.stop();
    }
    this.currentTimer = null;
  }

  /**
   * Quick check if current file analysis has timed out
   * Optimized for performance - minimal calculations
   */
  static checkCurrentTimeout(): boolean {
    if (!this.currentTimer) return false;
    return this.currentTimer.checkTimeout();
  }

  /**
   * Get elapsed time for current timer
   */
  static getCurrentElapsedMs(): number {
    if (!this.currentTimer) return 0;
    return this.currentTimer.getElapsedMs();
  }

  /**
   * Get remaining time for current timer
   */
  static getCurrentRemainingMs(): number {
    if (!this.currentTimer) return 0;
    return this.currentTimer.getRemainingMs();
  }

  /**
   * Check if there's an active timer
   */
  static hasActiveTimer(): boolean {
    return (
      this.currentTimer !== null &&
      !this.currentTimer.isTimedOut() &&
      !this.currentTimer["stopped"]
    );
  }
}

export const fileTimerManager = FileTimerManager;
