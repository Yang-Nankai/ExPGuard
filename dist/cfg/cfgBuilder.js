"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cfgBuilder = void 0;
const esgraph_1 = __importDefault(require("./esgraph"));
const flownode_1 = require("../flownode/flownode");
const astValidator_1 = require("../ast/astValidator");
const errorCode_1 = require("../utils/errorCode");
const DEFAULT_LINE = 1;
const DEFAULT_COL = 1;
/**
 * CFG Builder
 */
class CFGBuilder {
    /**
     * Build CFG from AST with location information
     */
    getCFG(ast) {
        var _a, _b, _c, _d;
        if (!ast) {
            throw errorCode_1.Errors.CFGError("CFGBuilder.getCFG: AST is null");
        }
        // Validate AST structure
        astValidator_1.astValidator.validate(ast, { range: false, loc: false });
        const cfg = (0, esgraph_1.default)(ast);
        let maxLine = DEFAULT_LINE;
        let maxCol = DEFAULT_COL;
        for (const node of cfg.allNodes) {
            // Skip exit node for now
            if (flownode_1.FlowNode.isExitType(node))
                continue;
            const loc = (_b = (_a = node.astNode) === null || _a === void 0 ? void 0 : _a.loc) === null || _b === void 0 ? void 0 : _b.start;
            const line = (_c = loc === null || loc === void 0 ? void 0 : loc.line) !== null && _c !== void 0 ? _c : DEFAULT_LINE;
            const col = (_d = loc === null || loc === void 0 ? void 0 : loc.column) !== null && _d !== void 0 ? _d : DEFAULT_COL;
            node.line = line;
            node.col = col;
            maxLine = Math.max(maxLine, line);
            maxCol = Math.max(maxCol, col);
        }
        // Place exit node after the last statement
        cfg.exitNode.line = maxLine;
        cfg.exitNode.col = maxCol + 1;
        return cfg;
    }
}
exports.cfgBuilder = new CFGBuilder();
