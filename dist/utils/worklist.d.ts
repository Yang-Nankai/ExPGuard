import { CFGResult } from "../cfg/cfgResult";
import { FlowNode } from "../flownode/flownode";
import { Queue } from "./queue";
/**
 * Worklist options
 * - direction: CFG traversal direction
 */
export interface WorklistOptions {
    direction?: "forward" | "backward";
}
/**
 * Transfer function for CFG-only worklist.
 *
 * - this: current FlowNode
 * - worklist: queue for manual enqueue
 *
 * Return value:
 * - true / undefined: automatically enqueue successor nodes
 * - false: do NOT auto-enqueue successors (caller controls propagation)
 */
export type TransferFunction = (this: FlowNode, worklist: Queue<FlowNode>) => boolean | void;
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
export declare function worklist(cfg: CFGResult, transferFunction: TransferFunction, options?: WorklistOptions): void;
export declare namespace worklist {
    var predecessors: (node: FlowNode) => FlowNode[];
    var successors: (node: FlowNode) => FlowNode[];
}
