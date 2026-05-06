"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worklist = worklist;
const cfgValidator_1 = require("../cfg/cfgValidator");
const logger_1 = __importDefault(require("./logger"));
const queue_1 = require("./queue");
const set_1 = __importDefault(require("./set"));
/**
 * Implementation of a general worklist algorithm
 * `cfg` is a control flow graph created by `esgraph`,
 * `transferFunction` gets called with (this = node, input, worklist)
 * it operates on the input `Set` and can return an output set, in which case
 * the worklist algorithm automatically enqueues all the successor nodes, or it
 * might return an {output: output, enqueue: false} object in which case it is
 * itself responsible to enqueue the successor nodes.
 * `options` defines the `direction`, a `merge` function and an `equals`
 * function which merge the inputs to a node and determine if a node has changed
 * its output respectively.
 * Returns a `Map` from node -> output
 */
function worklist(cfg, transferFunction, options = {}) {
    if (!(cfg && cfgValidator_1.cfgValidator.isValidCFG(cfg))) {
        logger_1.default.error("Worklist algorithm did not found a valid cfg!");
        return;
    }
    const { direction = "forward", merge = worklist.merge(set_1.default.union), equals = set_1.default.equals, start = new set_1.default(), } = options;
    const list = new queue_1.Queue();
    let predecessors;
    let successors;
    if (direction === "forward") {
        list.push(cfg.entryNode);
        predecessors = worklist.predecessors;
        successors = worklist.successors;
    }
    else {
        list.push(cfg.exitNode);
        predecessors = worklist.successors;
        successors = worklist.predecessors;
    }
    const output = new Map();
    const inputs = new Map();
    const predecessorsMappingHandler = (node) => output.get(node);
    const updateSuccessorHandler = (node) => {
        list.push(node);
    };
    while (list.length) {
        const node = list.shift();
        const pre = predecessors(node).map(predecessorsMappingHandler);
        const input = pre.length ? merge(pre) : new set_1.default(start);
        inputs.set(node, input);
        const oldOutput = output.get(node);
        const out = transferFunction.call(node, input, list, oldOutput);
        const result = out instanceof set_1.default ? { output: out, enqueue: true } : out;
        output.set(node, result.output);
        if (result.enqueue && (!oldOutput || !equals(result.output, oldOutput))) {
            successors(node).forEach(updateSuccessorHandler);
        }
    }
    return { inputs: inputs, outputs: output };
}
worklist.predecessors = (node) => node.prev;
worklist.successors = (node) => node.next;
worklist.merge = (fn) => {
    return (inputs) => {
        if (inputs.length === 1) {
            return new set_1.default(inputs[0]);
        }
        return inputs.reduce(fn);
    };
};
