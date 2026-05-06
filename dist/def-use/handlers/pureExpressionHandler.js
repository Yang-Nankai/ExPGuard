"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluatePureExpressions = evaluatePureExpressions;
const walkes_1 = __importDefault(require("../../ast/walkes"));
const flownode_1 = require("../../flownode/flownode");
const interProceduralAnalyzer_1 = require("../analyzers/interProceduralAnalyzer");
const expressionTypeHandler_1 = require("./expressionTypeHandler");
/**
 * Evaluate pure expressions to materialize implicit defs.
 */
function evaluatePureExpressions(node) {
    if (!node.astNode || flownode_1.FlowNode.isEntryType(node))
        return;
    (0, walkes_1.default)(node.astNode, {
        ReturnStatement: (n) => {
            if (!n.argument)
                return;
            const def = (0, expressionTypeHandler_1.expressionTypeHandler)(node, n.argument);
            interProceduralAnalyzer_1.interAnalyzer.setCurrentReturnDef(def);
        },
        default: (n) => {
            if (n.type.endsWith("Expression")) {
                (0, expressionTypeHandler_1.expressionTypeHandler)(node, n);
            }
        },
    });
}
