import { CFGResult } from "../cfg/cfgResult";
import { cfgValidator } from "../cfg/cfgValidator";
import { FlowNode } from "../flownode/flownode";
import logger from "./logger";
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
export type TransferFunction = (
  this: FlowNode,
  worklist: Queue<FlowNode>
) => boolean | void;

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
export function worklist(
  cfg: CFGResult,
  transferFunction: TransferFunction,
  options: WorklistOptions = {}
): void {
  if (!(cfg && cfgValidator.isValidCFG(cfg))) {
    logger.error("Worklist algorithm did not find a valid CFG!");
    return;
  }

  const { direction = "forward" } = options;

  const queue = new Queue<FlowNode>();

  let successors: (node: FlowNode) => FlowNode[];

  if (direction === "forward") {
    queue.push(cfg.entryNode);
    successors = worklist.successors;
  } else {
    queue.push(cfg.exitNode);
    successors = worklist.predecessors;
  }

  while (queue.length) {
    const node = queue.shift()!;

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

worklist.predecessors = (node: FlowNode): FlowNode[] => {
  return node.prev;
};

worklist.successors = (node: FlowNode): FlowNode[] => {
  return node.next;
};
