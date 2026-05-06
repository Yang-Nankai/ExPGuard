"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionCallCache = void 0;
/**
 * Cache for function call results with LRU eviction
 * Optimized for large-scale JavaScript analysis
 */
class FunctionCallCache {
    constructor(maxEntries = 2048) {
        this.maxEntries = maxEntries;
        this.map = new Map();
        this.totalCalls = 0;
        this.hits = 0;
        this.misses = 0;
        this.evictions = 0;
    }
    /**
     * Get cached result for function call
     * Returns null if not found or cache should be bypassed
     */
    get(item) {
        this.totalCalls++;
        const key = item.key;
        const entry = this.map.get(key);
        if (!entry) {
            this.misses++;
            return null;
        }
        this.hits++;
        // LRU touch
        this.map.delete(key);
        this.map.set(key, entry);
        return entry;
    }
    /**
     * Cache function call result
     */
    set(item, entry) {
        const key = item.key;
        if (this.map.has(key)) {
            this.map.delete(key);
        }
        this.map.set(key, entry);
        if (this.map.size > this.maxEntries) {
            const oldestKey = this.map.keys().next().value;
            if (oldestKey !== undefined) {
                this.map.delete(oldestKey);
                this.evictions++;
            }
        }
    }
    clear() {
        this.map.clear();
    }
    size() {
        return this.map.size;
    }
    getStats() {
        const totalLookups = this.hits + this.misses;
        return {
            totalCalls: this.totalCalls,
            hits: this.hits,
            misses: this.misses,
            evictions: this.evictions,
            hitRate: totalLookups === 0 ? 0 : this.hits / totalLookups,
            cacheSize: this.map.size,
            maxEntries: this.maxEntries
        };
    }
    resetStats() {
        this.totalCalls = 0;
        this.hits = 0;
        this.misses = 0;
        this.evictions = 0;
    }
}
exports.FunctionCallCache = FunctionCallCache;
