/**
 * Start global analysis timer (idempotent)
 */
export declare function startGlobalTimer(): void;
/**
 * Ultra-lightweight cooperative timeout check
 * Safe to call in hot loops
 */
export declare function checkGlobalTimeout(): void;
/**
 * Get elapsed running time in milliseconds
 * Safe to call anywhere, no side effects
 */
export declare function getGlobalElapsedMs(): number;
/**
 * Get elapsed running time in seconds (float)
 */
export declare function getGlobalElapsedSeconds(): number;
/**
 * Stop global analysis timer (idempotent)
 */
export declare function stopGlobalTimer(reason?: string): void;
