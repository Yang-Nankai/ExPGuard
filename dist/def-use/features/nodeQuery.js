"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeQuery = void 0;
// nodeQuery.ts
const esquery_1 = __importDefault(require("esquery"));
class NodeQuery {
    constructor(nodes) {
        this.nodes = nodes;
    }
    static from(ast) {
        return new NodeQuery([ast]);
    }
    query(s) {
        const out = [];
        for (const n of this.nodes) {
            out.push(...(0, esquery_1.default)(n, s));
        }
        return new NodeQuery(out);
    }
    select(sel) {
        const out = [];
        for (const n of this.nodes) {
            out.push(...(0, esquery_1.default)(n, sel.toString()));
        }
        return new NodeQuery(out);
    }
    has(sel) {
        return new NodeQuery(this.nodes.filter((n) => (0, esquery_1.default)(n, sel.toString()).length > 0));
    }
    where(fn) {
        return new NodeQuery(this.nodes.filter(fn));
    }
    result() {
        return this.nodes;
    }
    exists() {
        return this.nodes.length > 0;
    }
}
exports.NodeQuery = NodeQuery;
