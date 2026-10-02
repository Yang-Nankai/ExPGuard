import { CFGResult } from "../cfg/cfgResult";
import { cfgValidator } from "../cfg/cfgValidator";
import { FlowNode } from "../flownode/flownode";
import logger from "./logger";
import { Queue } from "./queue";

/**
 * Default number of times a single FlowNode may be processed during one
 * worklist run.
 *
 * The CFG is cyclic (loop bodies carry a back edge to their test / update
 * node), so the worklist needs an explicit budget to terminate: the analysis
 * state is a growing set of `Def`s and there is no lattice height bound that
 * guarantees a natural fixpoint in reasonable time. Processing a node `N`
 * times is equivalent to unrolling the enclosing loop `N` times, which is what
 * makes loop-carried taint (`prev = cur; cur = tainted[i]`) observable.
 *
 * 3 is the smallest value that exposes a one-slot loop-carried dependency
 * (iteration 1 seeds, iteration 2 propagates, iteration 3 confirms no further
 * change) and matches the bounds used by comparable analyzers (DoubleX
 * `LIMIT_LOOP = 5`, CoCo `counter > 3`).
 */
export const DEFAULT_MAX_NODE_VISITS = 3;

/**
 * Worklist options
 * - direction: CFG traversal direction
 * - maxNodeVisits: per-node processing budget (loop unroll bound)
 */
export interface WorklistOptions {
  direction?: "forward" | "backward";
  maxNodeVisits?: number;
}

/** Per-visit context handed to the transfer function. */
export interface TransferContext {
  /** 1-based index of this visit of the node (1 on the first visit). */
  visit: number;
  /** The configured per-node budget. */
  maxVisits: number;
}

/**
 * Transfer function for CFG-only worklist.
 *
 * - this: current FlowNode
 * - worklist: queue for manual enqueue
 * - ctx: visit bookkeeping, so the transfer function can behave differently on
 *   re-visits (e.g. stop propagating once its state stopped changing)
 *
 * Return value:
 * - true / undefined: automatically enqueue successor nodes
 * - false: do NOT auto-enqueue successors (caller controls propagation)
 */
export type TransferFunction = (
  this: FlowNode,
  worklist: Queue<FlowNode>,
  ctx: TransferContext
) => boolean | void;

/**
 * CFG-only worklist algorithm.
 *
 * Responsibilities:
 * - Drive CFG traversal
 * - Schedule FlowNode execution
 * - Guarantee termination on cyclic CFGs via a per-node visit budget
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

  const { direction = "forward", maxNodeVisits = DEFAULT_MAX_NODE_VISITS } =
    options;

  const queue = new Queue<FlowNode>();

  let successors: (node: FlowNode) => FlowNode[];

  if (direction === "forward") {
    queue.push(cfg.entryNode);
    successors = worklist.successors;
  } else {
    queue.push(cfg.exitNode);
    successors = worklist.predecessors;
  }

  /**
   * Visit budget bookkeeping. Without it a back edge would make this loop run
   * forever — `Queue.push` de-duplicates but re-appends, so a two-node cycle
   * keeps the queue permanently non-empty.
   */
  const visits = new Map<FlowNode, number>();

  while (queue.length) {
    const node = queue.shift()!;

    const visit = (visits.get(node) ?? 0) + 1;
    if (visit > maxNodeVisits) {
      // Budget exhausted: drop this node instead of re-running its transfer
      // function. Anything it would still contribute is beyond the configured
      // unroll depth.
      continue;
    }
    visits.set(node, visit);

    /**
     * Execute transfer function.
     * It decides whether propagation should continue.
     */
    const shouldPropagate = transferFunction.call(node, queue, {
      visit,
      maxVisits: maxNodeVisits,
    });

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
