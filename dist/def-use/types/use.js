"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = void 0;
const flownode_1 = require("../../flownode/flownode");
const errorCode_1 = require("../../utils/errorCode");
const rangeFactory_1 = require("../factories/rangeFactory");
const range_1 = require("./range");
/**
 * Use class
 */
class Use {
    constructor(fromNode, range) {
        this._fromNode = fromNode;
        this._range = rangeFactory_1.rangeFactory.create(range);
    }
    static fromValidNode(node) {
        return flownode_1.FlowNode.isFlowNode(node);
    }
    static isValidUseRange(range) {
        return range_1.Range.isValidValue(range);
    }
    static validate(from, range, msg) {
        if (!Use.fromValidNode(from) || !Use.isValidUseRange(range)) {
            errorCode_1.Errors.ValidatorError(msg || "Invalid value for a Use");
        }
    }
    static isUse(obj) {
        return obj instanceof Use;
    }
    static validateType(obj, msg) {
        if (!Use.isUse(obj)) {
            errorCode_1.Errors.ValidatorError(msg || "Not a Use");
        }
    }
    get fromNode() {
        return this._fromNode;
    }
    get range() {
        return this._range;
    }
    toString() {
        return `use@${this._fromNode.cfgId}`;
    }
    toJSON() {
        return {
            fromNode: this._fromNode.cfgId,
            range: this._range.toArray(),
        };
    }
}
exports.Use = Use;
exports.default = Use;
