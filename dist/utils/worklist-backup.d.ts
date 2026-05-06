import { CFGResult } from "../cfg/cfgResult";
import { FlowNode } from "../flownode/flownode";
import { Queue } from "./queue";
import Set from "./set";
export interface WorklistOptions<T> {
    direction?: "forward" | "backward";
    merge?: (inputs: Set<T>[]) => Set<T>;
    equals?: (a: Set<T>, b: Set<T>) => boolean;
    start?: Set<T>;
}
export interface TransferFunctionResult<T> {
    output: Set<T>;
    enqueue: boolean;
}
export type TransferFunction<T> = (this: FlowNode, input: Set<T>, worklist: Queue<FlowNode>, oldOutput?: Set<T>) => Set<T> | TransferFunctionResult<T>;
export interface WorklistResult<T> {
    inputs: Map<FlowNode, Set<T>>;
    outputs: Map<FlowNode, Set<T>>;
}
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
export declare function worklist<T>(cfg: CFGResult, transferFunction: TransferFunction<T>, options?: WorklistOptions<T>): WorklistResult<T> | undefined;
export declare namespace worklist {
    var predecessors: (node: FlowNode) => FlowNode[];
    var successors: (node: FlowNode) => FlowNode[];
    var merge: <T>(fn: (a: Set<T>, b: Set<T>) => Set<T>) => (inputs: Set<T>[]) => Set<T>;
}
