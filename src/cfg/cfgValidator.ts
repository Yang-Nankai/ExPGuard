import { FlowNode } from "../flownode/flownode";
import { CFGResult } from "./cfgResult";

/**
 * Validate CFG
 */
class CFGValidator {
  /**
   * Check for a cfg is valid
   */
  isValidCFG(cfg: CFGResult | null): boolean {
    if (!cfg) return false;

    const { entryNode, exitNode, allNodes } = cfg;

    return (
      entryNode &&
      exitNode &&
      allNodes.includes(entryNode) &&
      allNodes.includes(exitNode) &&
      FlowNode.isFlowNode(entryNode) &&
      FlowNode.isFlowNode(exitNode) &&
      allNodes.every(FlowNode.isFlowNode)
    );
  }
}

export const cfgValidator = new CFGValidator();
