import PageModels from "../model/pageModels";
export interface CfgDotOptions {
    graphName?: string;
    source?: string;
    includeLineCol?: boolean;
}
export declare function generateCfgDot(pageModels: PageModels, options?: CfgDotOptions): string;
