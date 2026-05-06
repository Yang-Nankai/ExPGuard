import Pair from "./pair";
import { FlowNode } from "../../flownode/flownode";
import { Errors } from "../../utils/errorCode";

/*
 * Simple structure of Def-Use Pair
 */
class DUPair extends Pair {
  constructor(def: FlowNode, use: FlowNode | Pair | FlowNode[]) {
    super(def, use);
  }

  /**
   * Check for the def and use are valid or not
   */
  static isValidDUPair(def: FlowNode, use: FlowNode | Pair): boolean {
    return (
      FlowNode.isFlowNode(def) &&
      (FlowNode.isFlowNode(use) || use instanceof Pair)
    );
  }

  /**
   * Validate for the value of DUPair
   */
  static validate(def: FlowNode, use: FlowNode | Pair, msg?: string): void {
    if (!DUPair.isValidDUPair(def, use)) {
      Errors.ValidatorError(msg || "Invalid value for a DUPair");
    }
  }

  /**
   * Check for the object is a DUPair or not
   */
  static isDUPair(obj: unknown): obj is DUPair {
    return obj instanceof DUPair;
  }

  /**
   * Def part of the pair
   */
  get def() {
    return this.first;
  }

  /**
   * Use part of the pair
   */
  get use() {
    return this.second;
  }
}

export default DUPair;
