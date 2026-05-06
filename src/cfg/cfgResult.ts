import { FlowNode } from "../flownode/flownode";
import { Errors } from "../utils/errorCode";
import logger from "../utils/logger";

/**
 * CFG Result
 */
export class CFGResult {
  private _entryNode: FlowNode;
  private _exitNode: FlowNode;
  private _allNodes: FlowNode[];

  constructor(entryNode: FlowNode, exitNode: FlowNode, allNodes: FlowNode[]) {
    this._entryNode = entryNode;
    this._exitNode = exitNode;
    this._allNodes = [...allNodes];
  }

  /**
   * Check for the type of the object is a CFGResult or not
   */
  static isCFGResult(obj: any): obj is CFGResult {
    return obj instanceof CFGResult;
  }

  /**
   * Validate an object is right CFGResult or not
   */
  static validate(obj: any, msg?: string): asserts obj is CFGResult {
    if (!CFGResult.isCFGResult(obj)) {
      Errors.CFGError(msg || "Not a CFGResult");
    }
  }

  /**
   * Add a flownode into allNodes
   */
  addNode(node: FlowNode) {
    if (FlowNode.isFlowNode(node)) {
      this._allNodes.push(node);
    }
    logger.warn("Trying to add a non-FlowNode into CFGResult");
  }

  /**
   * Check if a node exists in the CFG
   */
  containsNode(node: FlowNode): boolean {
    return this._allNodes.includes(node);
  }

  /**
   * Get the index of a node in the CFG
   */
  getNodeIndex(node: FlowNode): number {
    return this._allNodes.indexOf(node);
  }

  get entryNode() {
    return this._entryNode;
  }

  set entryNode(node) {
    if (FlowNode.isFlowNode(node)) {
      this._entryNode = node;
    }
  }

  get exitNode() {
    return this._exitNode;
  }

  set exitNode(node) {
    if (FlowNode.isFlowNode(node)) {
      this._exitNode = node;
    }
  }

  get allNodes() {
    return [...this._allNodes];
  }

  get size() {
    return this._allNodes.length;
  }
}
