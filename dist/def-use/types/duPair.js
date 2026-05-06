"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pair_1 = __importDefault(require("./pair"));
const flownode_1 = require("../../flownode/flownode");
const errorCode_1 = require("../../utils/errorCode");
/*
 * Simple structure of Def-Use Pair
 */
class DUPair extends pair_1.default {
    constructor(def, use) {
        super(def, use);
    }
    /**
     * Check for the def and use are valid or not
     */
    static isValidDUPair(def, use) {
        return (flownode_1.FlowNode.isFlowNode(def) &&
            (flownode_1.FlowNode.isFlowNode(use) || use instanceof pair_1.default));
    }
    /**
     * Validate for the value of DUPair
     */
    static validate(def, use, msg) {
        if (!DUPair.isValidDUPair(def, use)) {
            errorCode_1.Errors.ValidatorError(msg || "Invalid value for a DUPair");
        }
    }
    /**
     * Check for the object is a DUPair or not
     */
    static isDUPair(obj) {
        return obj instanceof DUPair;
    }
    /**
     * Def part of the pair
     */
    get def() {
        return this.first;
    }
    /**
     * Use part of the pair
     */
    get use() {
        return this.second;
    }
}
exports.default = DUPair;
