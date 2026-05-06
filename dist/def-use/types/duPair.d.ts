import Pair from "./pair";
import { FlowNode } from "../../flownode/flownode";
declare class DUPair extends Pair {
    constructor(def: FlowNode, use: FlowNode | Pair | FlowNode[]);
    /**
     * Check for the def and use are valid or not
     */
    static isValidDUPair(def: FlowNode, use: FlowNode | Pair): boolean;
    /**
     * Validate for the value of DUPair
     */
    static validate(def: FlowNode, use: FlowNode | Pair, msg?: string): void;
    /**
     * Check for the object is a DUPair or not
     */
    static isDUPair(obj: unknown): obj is DUPair;
    /**
     * Def part of the pair
     */
    get def(): any;
    /**
     * Use part of the pair
     */
    get use(): any;
}
export default DUPair;
