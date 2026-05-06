/*
 * Simple factory for Def-Use Pair
 */
import { FlowNode } from "../../flownode/flownode";
import DUPair from "../types/duPair";

class DUPairFactory {
  create(def: FlowNode, use: FlowNode | FlowNode[]): DUPair {
    return new DUPair(def, use);
  }
}

export const dupairFactory = new DUPairFactory();
