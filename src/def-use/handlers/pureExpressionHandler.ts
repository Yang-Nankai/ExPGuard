import walkes from "../../ast/walkes";
import { FlowNode } from "../../flownode/flownode";
import { interAnalyzer } from "../analyzers/interProceduralAnalyzer";
import { expressionTypeHandler } from "./expressionTypeHandler";

/**
 * Evaluate pure expressions to materialize implicit defs.
 */
export function evaluatePureExpressions(node: FlowNode) {
  if (!node.astNode || FlowNode.isEntryType(node)) return;

  walkes(node.astNode, {
    ReturnStatement: (n: any) => {
      if (!n.argument) return;
      const def = expressionTypeHandler(node, n.argument);
      // Pass the ReturnStatement as the site key so repeated evaluations of
      // the same `return` overwrite instead of widening the union.
      interAnalyzer.setCurrentReturnDef(def, n);
    },
    default: (n: any) => {
      if (n.type.endsWith("Expression")) {
        expressionTypeHandler(node, n);
      }
    },
  });
}
