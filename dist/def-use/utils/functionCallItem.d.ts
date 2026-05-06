import { FlowNode } from "../../flownode/flownode";
import Def, { FunctionDef } from "../types/def";
export declare class FunctionCallItem {
    readonly caller: FlowNode;
    readonly callee: FunctionDef;
    readonly argDefs: Def[];
    readonly thisDef: Def | null;
    private _returnDef;
    private _hasSideEffects;
    private _key?;
    constructor(caller: FlowNode, callee: FunctionDef, argDefs: Def[], thisDef?: Def | null);
    set returnDef(def: Def | null);
    get returnDef(): Def;
    markHasSideEffects(): void;
    get hasSideEffects(): boolean;
    get key(): string;
}
