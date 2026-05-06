"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worklist = worklist;
const cfgValidator_1 = require("../cfg/cfgValidator");
const logger_1 = __importDefault(require("./logger"));
const queue_1 = require("./queue");
/**
 * CFG-only worklist algorithm.
 *
 * Responsibilities:
 * - Drive CFG traversal
 * - Schedule FlowNode execution
 *
 * Non-responsibilities:
 * - No input/output sets
 * - No merge / equals
 * - No data-flow state tracking
 *
 * All analysis state should live in FlowNode / Scope.
 */
function worklist(cfg, transferFunction, options = {}) {
    if (!(cfg && cfgValidator_1.cfgValidator.isValidCFG(cfg))) {
        logger_1.default.error("Worklist algorithm did not find a valid CFG!");
        return;
    }
    const { direction = "forward" } = options;
    const queue = new queue_1.Queue();
    let successors;
    if (direction === "forward") {
        queue.push(cfg.entryNode);
        successors = worklist.successors;
    }
    else {
        queue.push(cfg.exitNode);
        successors = worklist.predecessors;
    }
    while (queue.length) {
        const node = queue.shift();
        /**
         * Execute transfer function.
         * It decides whether propagation should continue.
         */
        const shouldPropagate = transferFunction.call(node, queue);
        /**
         * Auto-propagate to successors unless explicitly disabled.
         */
        if (shouldPropagate !== false) {
            successors(node).forEach((succ) => {
                queue.push(succ);
            });
        }
    }
}
/* --------------------------------------------------
 * CFG helpers
 * -------------------------------------------------- */
worklist.predecessors = (node) => {
    return node.prev;
};
worklist.successors = (node) => {
    return node.next;
};
