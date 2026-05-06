import { FlowNode } from "../../flownode/flownode";
import Model from "../../model/model";
import Scope from "../../scope/scope";
import { Queue } from "../../utils/queue";
import { worklist } from "../../utils/worklist";
import { computeGenFromAST } from "../handlers/generateHandler";
import { evaluatePureExpressions } from "../handlers/pureExpressionHandler";
import { getFeasibleSuccessors } from "../utils/utils";

/**
 * Reaching Definition Analyzer
 * Performs forward intra/inter-procedural analysis on the CFG.
 */
export class ReachingDefinitionAnalyzer {
  public doAnalysis(model: Model) {
    if (!model?.graph) return;

    // mark analysis executed
    model.hasTaintAnalyzed = true;

    worklist(
      model.graph,
      function (this: FlowNode, queue: Queue<FlowNode>) {
        if (!this.scope || FlowNode.isEntryType(this)) return;

        computeGenFromAST(this);
        evaluatePureExpressions(this);
        const feasible = getFeasibleSuccessors(this);
        if (feasible != null) {
          feasible.forEach((succ) => queue.push(succ));
          // do not push in worklist
          return false;
        }

      },
      { direction: "forward" },
    );

    // clear reaching definitions when exiting non-page scope
    const scope = model.mainlyRelatedScope;
    if (scope && !Scope.isPageScope(scope)) {
      scope.resetReachingDefinitions();
    }
  }
}




export const reachingDefAnalyzer = new ReachingDefinitionAnalyzer();
