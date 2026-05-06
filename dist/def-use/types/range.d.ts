/**
 * Range Class
 */
export type PairNumber = [number, number];
declare class CustomRange {
    private _start;
    private _end;
    static readonly GLOBAL_RANGE_START = 0;
    static readonly GLOBAL_RANGE_END = 0;
    constructor(start: CustomRange | PairNumber | number | undefined, end?: number);
    static equals(range1: CustomRange, range2: CustomRange): boolean;
    static isValidValue(start: any, end?: any): boolean;
    static isRange(obj: any): obj is CustomRange;
    static validate(start: any, end?: any, msg?: string): void;
    static validateType(obj: any, msg?: string): void;
    get start(): number;
    get end(): number;
    toArray(): [number, number];
    toString(): string;
    isEqualTo(range: CustomRange): boolean;
}
export { CustomRange as Range };
