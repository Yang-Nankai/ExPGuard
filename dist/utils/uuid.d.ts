/** Interface for ID generators */
interface IIdGenerator {
    nextId(): number;
    reset(): void;
    getCurrent(): number;
}
export declare const defGenerator: IIdGenerator;
export declare const nodeGenerator: IIdGenerator;
export declare const taintGenerator: IIdGenerator;
export {};
