import { FlowNode } from "../../flownode/flownode";
import { Range } from "./range";
/**
 * Use class
 */
export declare class Use {
    private _fromNode;
    private _range;
    constructor(fromNode: FlowNode, range: Range);
    static fromValidNode(node: any): node is FlowNode;
    static isValidUseRange(range: any): boolean;
    static validate(from: any, range: any, msg?: string): void;
    static isUse(obj: any): boolean;
    static validateType(obj: any, msg?: string): void;
    get fromNode(): FlowNode;
    get range(): Range;
    toString(): string;
    toJSON(): object;
}
export default Use;
