import { Def, FlowNode, SinkType, SourceType } from "../index";
type ReturnDefFactory = (callNode: FlowNode, astNode: any) => any;
/**
 * Helper: common chrome api builtin semantics handler
 */
export declare function createChromeBuiltinSemantics({ apiName, callbackIndex, sourceType, createReturnDef, sinkArgs, }: {
    apiName: string;
    callbackIndex?: number;
    sourceType?: SourceType;
    createReturnDef?: ReturnDefFactory;
    sinkArgs?: {
        index: number;
        sinkType: SinkType;
        remark?: string;
    }[];
}): void;
export declare function createChromeEventListenerSemantics({ apiName, sourceIndexes, sourceType, paramDefs, }: {
    apiName: string;
    sourceIndexes: number[];
    sourceType: SourceType;
    paramDefs: Array<(callNode: FlowNode) => Def>;
}): void;
export {};
