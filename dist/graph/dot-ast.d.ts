import { Node } from "acorn";
export interface AstDotOptions {
    graphName?: string;
    maxLabelLength?: number;
}
export declare function generateAstDot(ast: Node, options?: AstDotOptions): string;
