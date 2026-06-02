import { FlowNode } from "../../flownode/flownode";
import Scope from "../../scope/scope";
import { Queue } from "../../utils/queue";
import { worklist } from "../../utils/worklist";
import { computeGenFromAST } from "../handlers/generateHandler";
import { evaluatePureExpressions } from "../handlers/pureExpressionHandler";
import { getFeasibleSuccessors } from "../utils/utils";

/**
 * Reaching Definition Analyzer
 * Performs forward intra/inter-procedural analysis on the CFG.
 *
 * Path sensitivity:
 *   Each FlowNode carries a `reachable` flag. The CFG entry seeds it; the
 *   transfer function only propagates reachability to *feasible* successors
 *   (per `getFeasibleSuccessors`). Nodes that no feasible path reaches still
 *   get visited (the worklist visits everything connected to entry), but
 *   `computeGenFromAST` / `evaluatePureExpressions` are skipped — those are
 *   the operations that mutate reaching defs and emit taint edges. The net
 *   effect: dead branches produce zero spurious taint propagation.
 */
export class ReachingDefinitionAnalyzer {
  public doAnalysis(scope: Scope) {
    if (!scope?.graph) return;

    // mark analysis executed
    scope.hasTaintAnalyzed = true;

    // Seed reachability on the entry node so the first real flow node
    // inherits it via the transfer function below.
    scope.graph.entryNode.markReachable();

    worklist(
      scope.graph,
      function (this: FlowNode, queue: Queue<FlowNode>) {
        if (!this.scope || FlowNode.isEntryType(this)) {
          // Entry hands reachability off to its first successor(s). We
          // still let the worklist push successors automatically below.
          for (const succ of this.next) succ.markReachable();
          return;
        }

        // Path-sensitive gate: if no feasible path proved this node
        // reachable, do not run the GEN/expression-eval passes here.
        // Default behavior still propagates reachability forward in case a
        // join makes it reachable later; but until then we don't emit
        // taint from a dead node.
        if (!this.reachable) {
          // Still let downstream successors find out about us; they may
          // become reachable via a different predecessor.
          return;
        }

        computeGenFromAST(this);
        evaluatePureExpressions(this);

        const feasible = getFeasibleSuccessors(this);
        if (feasible != null) {
          for (const succ of feasible) {
            succ.markReachable();
            queue.push(succ);
          }
          // do not push in worklist
          return false;
        }

        // No static pruning available — every CFG successor is potentially
        // live, so propagate reachability to all of them and let the
        // worklist's default propagation continue.
        for (const succ of this.next) succ.markReachable();
      },
      { direction: "forward" },
    );

    // clear reaching definitions when exiting non-page scope
    if (!Scope.isPageScope(scope)) {
      scope.resetReachingDefinitions();
    }
  }
}




export const reachingDefAnalyzer = new ReachingDefinitionAnalyzer();
