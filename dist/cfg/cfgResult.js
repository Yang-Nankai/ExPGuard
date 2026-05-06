"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFGResult = void 0;
const flownode_1 = require("../flownode/flownode");
const errorCode_1 = require("../utils/errorCode");
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * CFG Result
 */
class CFGResult {
    constructor(entryNode, exitNode, allNodes) {
        this._entryNode = entryNode;
        this._exitNode = exitNode;
        this._allNodes = [...allNodes];
    }
    /**
     * Check for the type of the object is a CFGResult or not
     */
    static isCFGResult(obj) {
        return obj instanceof CFGResult;
    }
    /**
     * Validate an object is right CFGResult or not
     */
    static validate(obj, msg) {
        if (!CFGResult.isCFGResult(obj)) {
            errorCode_1.Errors.CFGError(msg || "Not a CFGResult");
        }
    }
    /**
     * Add a flownode into allNodes
     */
    addNode(node) {
        if (flownode_1.FlowNode.isFlowNode(node)) {
            this._allNodes.push(node);
        }
        logger_1.default.warn("Trying to add a non-FlowNode into CFGResult");
    }
    /**
     * Check if a node exists in the CFG
     */
    containsNode(node) {
        return this._allNodes.includes(node);
    }
    /**
     * Get the index of a node in the CFG
     */
    getNodeIndex(node) {
        return this._allNodes.indexOf(node);
    }
    get entryNode() {
        return this._entryNode;
    }
    set entryNode(node) {
        if (flownode_1.FlowNode.isFlowNode(node)) {
            this._entryNode = node;
        }
    }
    get exitNode() {
        return this._exitNode;
    }
    set exitNode(node) {
        if (flownode_1.FlowNode.isFlowNode(node)) {
            this._exitNode = node;
        }
    }
    get allNodes() {
        return [...this._allNodes];
    }
    get size() {
        return this._allNodes.length;
    }
}
exports.CFGResult = CFGResult;
