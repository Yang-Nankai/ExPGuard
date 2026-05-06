import Model from "../../model/model";
export declare class DefUsePairAnalyzer {
    findDUPairs(model: Model): void;
    /**
     * Get used definitions by getting the intersection of RD and USE
     */
    private getUsedDefs;
}
export declare const defUsePairAnalyzer: DefUsePairAnalyzer;
