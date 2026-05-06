"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptRegistry = void 0;
class ScriptRegistry {
    constructor() {
        this.scripts = new Map();
    }
    register(script) {
        this.scripts.set(script.key, script);
    }
    get(key) {
        return this.scripts.get(key);
    }
    values() {
        return this.scripts.values();
    }
    keys() {
        return this.scripts.keys();
    }
    has(key) {
        return this.scripts.has(key);
    }
    entries() {
        return this.scripts.entries();
    }
}
exports.ScriptRegistry = ScriptRegistry;
