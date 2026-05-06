import ControlFlowGraph from "./esgraph";
import { FlowNode } from "../flownode/flownode";
import { CFGResult } from "./cfgResult";
import { Node } from "acorn";
import { astValidator } from "../ast/astValidator";
import { Errors } from "../utils/errorCode";

const DEFAULT_LINE = 1;
const DEFAULT_COL = 1;

/**
 * CFG Builder
 */
class CFGBuilder {
  /**
   * Build CFG from AST with location information
   */
  getCFG(ast: Node | null): CFGResult {
    if (!ast) {
      throw Errors.CFGError("CFGBuilder.getCFG: AST is null");
    }

    // Validate AST structure
    astValidator.validate(ast, { range: false, loc: false });

    const cfg = ControlFlowGraph(ast);

    let maxLine = DEFAULT_LINE;
    let maxCol = DEFAULT_COL;

    for (const node of cfg.allNodes) {
      // Skip exit node for now
      if (FlowNode.isExitType(node)) continue;

      const loc = node.astNode?.loc?.start;

      const line = loc?.line ?? DEFAULT_LINE;
      const col = loc?.column ?? DEFAULT_COL;

      node.line = line;
      node.col = col;

      maxLine = Math.max(maxLine, line);
      maxCol = Math.max(maxCol, col);
    }

    // Place exit node after the last statement
    cfg.exitNode.line = maxLine;
    cfg.exitNode.col = maxCol + 1;

    return cfg;
  }
}

export const cfgBuilder = new CFGBuilder();
