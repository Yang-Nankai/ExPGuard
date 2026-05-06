import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import Def from "../types/def";
export type BuiltInSemanticExec = (args: Def[], callNode: FlowNode, astNode: Node, thisDef: Def | null) => Def | null | undefined;
export declare class BuiltInSemantics {
    static registry: Map<string, BuiltInSemanticExec>;
    static register(name: string, fn: BuiltInSemanticExec): void;
    static get(name: string): BuiltInSemanticExec | null;
}
