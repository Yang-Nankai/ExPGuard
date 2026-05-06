"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptDependencyGraph = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
class ScriptDependencyGraph {
    constructor(registry) {
        this.registry = registry;
    }
    build() {
        const graph = new Map();
        for (const script of this.registry.values()) {
            const deps = new Set();
            const info = script.getDependencies();
            const sources = [];
            for (const source of info) {
                sources.push(source);
            }
            for (const source of sources) {
                const key = script.resolveRelativeScriptKey(source);
                if (key && this.registry.has(key)) {
                    deps.add(key);
                }
                else {
                    logger_1.default.warn(`Unresolved dependency in script ${script.key}: ${key}`);
                }
            }
            graph.set(script.key, deps);
        }
        return graph;
    }
}
exports.ScriptDependencyGraph = ScriptDependencyGraph;
