import { Range } from "../types/range";
/**
 * Factory for Var
 */
declare class RangeFactory {
    /**
     * Factory method for creating a range
     */
    create(start: Range | [number, number] | number, end?: number): Range;
    /**
     * Factory method for range of globals
     */
    createGlobalRange(): Range;
}
export declare const rangeFactory: RangeFactory;
export {};
