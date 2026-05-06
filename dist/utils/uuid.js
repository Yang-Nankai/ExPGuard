"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taintGenerator = exports.nodeGenerator = exports.defGenerator = void 0;
/** Centralized ID manager for all ID generators */
class IdManager {
    constructor() {
        this.generators = new Map();
        this.defaultCounter = 1;
    }
    /** Get singleton instance */
    static getInstance() {
        if (!IdManager.instance) {
            IdManager.instance = new IdManager();
        }
        return IdManager.instance;
    }
    /** Register an ID generator */
    register(name, generator) {
        this.generators.set(name, generator);
    }
    /** Get or create a numeric ID generator */
    getNumberGenerator(name, startFrom = 1) {
        if (!this.generators.has(name)) {
            this.generators.set(name, new NumberIdGenerator(startFrom));
        }
        return this.generators.get(name);
    }
    /** Get next ID from specified generator */
    nextId(generatorName) {
        const generator = this.generators.get(generatorName);
        if (!generator) {
            throw new Error(`ID generator "${generatorName}" is not registered`);
        }
        return generator.nextId();
    }
    /** Reset all ID generators */
    resetAll() {
        this.generators.forEach(generator => generator.reset());
    }
    /** Reset specific ID generator */
    reset(generatorName) {
        const generator = this.generators.get(generatorName);
        if (generator) {
            generator.reset();
        }
    }
}
/** Numeric ID generator implementation */
class NumberIdGenerator {
    constructor(startFrom = 1) {
        this.counter = startFrom;
    }
    nextId() {
        return this.counter++;
    }
    reset() {
        this.counter = 1;
    }
    getCurrent() {
        return this.counter;
    }
}
// Get the singleton instance
const idManager = IdManager.getInstance();
// Use factory methods
exports.defGenerator = idManager.getNumberGenerator('def', 1);
exports.nodeGenerator = idManager.getNumberGenerator('flownode', 1);
exports.taintGenerator = idManager.getNumberGenerator('taint', 1);
// Reset specific generator
// idManager.reset('definition');
