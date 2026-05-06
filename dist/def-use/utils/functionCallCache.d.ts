import Def from "../types/def";
import { FunctionCallItem } from "./functionCallItem";
/**
 * Cache for function call results with LRU eviction
 * Optimized for large-scale JavaScript analysis
 */
export declare class FunctionCallCache {
    private readonly maxEntries;
    private readonly map;
    private totalCalls;
    private hits;
    private misses;
    private evictions;
    constructor(maxEntries?: number);
    /**
     * Get cached result for function call
     * Returns null if not found or cache should be bypassed
     */
    get(item: FunctionCallItem): Def | null;
    /**
     * Cache function call result
     */
    set(item: FunctionCallItem, entry: Def): void;
    clear(): void;
    size(): number;
    getStats(): {
        totalCalls: number;
        hits: number;
        misses: number;
        evictions: number;
        hitRate: number;
        cacheSize: number;
        maxEntries: number;
    };
    resetStats(): void;
}
