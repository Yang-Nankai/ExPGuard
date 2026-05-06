import Def from "../types/def";
import { FlowNode } from "../../flownode/flownode";
export type FeatureSemanticExec = (args: Def[], callNode: FlowNode, thisDef: Def | null) => Def | null | undefined;
export interface FeatureModelSemantic {
    id: string;
    matchFunctions(ast: any): any[];
    hasSideEffect: boolean;
    exec: FeatureSemanticExec;
}
export interface FeatureMatchResult {
    feature: FeatureModelSemantic;
    functionNode: any;
}
export declare class FeatureModelRegistry {
    private static registry;
    static register(model: FeatureModelSemantic): void;
    static matchFunctions(ast: any): FeatureMatchResult[];
}
