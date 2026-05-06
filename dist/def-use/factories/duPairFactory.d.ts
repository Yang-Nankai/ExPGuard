import { FlowNode } from "../../flownode/flownode";
import DUPair from "../types/duPair";
declare class DUPairFactory {
    create(def: FlowNode, use: FlowNode | FlowNode[]): DUPair;
}
export declare const dupairFactory: DUPairFactory;
export {};
