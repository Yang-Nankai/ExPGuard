"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topoSort = topoSort;
const set_1 = __importDefault(require("./set"));
const logger_1 = __importDefault(require("./logger"));
function topoSort(graph) {
    const visited = new set_1.default();
    const visiting = new set_1.default();
    const result = [];
    function dfs(node) {
        var _a;
        if (visited.has(node))
            return;
        if (visiting.has(node)) {
            logger_1.default.error(`Circular dependency detected at script: ${node}, skipping...`);
            return;
            // throw Errors.LoaderError(
            //   `Circular dependency detected at script: ${node}`
            // );
        }
        visiting.add(node);
        const dependencies = (_a = graph.get(node)) !== null && _a !== void 0 ? _a : [];
        for (const dep of dependencies) {
            dfs(dep);
        }
        visiting.delete(node);
        visited.add(node);
        result.push(node);
    }
    for (const node of graph.keys()) {
        dfs(node);
    }
    return result;
}
