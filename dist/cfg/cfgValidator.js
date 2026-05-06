"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cfgValidator = void 0;
const flownode_1 = require("../flownode/flownode");
/**
 * Validate CFG
 */
class CFGValidator {
    /**
     * Check for a cfg is valid
     */
    isValidCFG(cfg) {
        if (!cfg)
            return false;
        const { entryNode, exitNode, allNodes } = cfg;
        return (entryNode &&
            exitNode &&
            allNodes.includes(entryNode) &&
            allNodes.includes(exitNode) &&
            flownode_1.FlowNode.isFlowNode(entryNode) &&
            flownode_1.FlowNode.isFlowNode(exitNode) &&
            allNodes.every(flownode_1.FlowNode.isFlowNode));
    }
}
exports.cfgValidator = new CFGValidator();
