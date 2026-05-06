import { FunctionCallItem } from "./functionCallItem";
export declare class FunctionCallStack {
    private static readonly MAX_DEPTH;
    private readonly stack;
    push(item: FunctionCallItem): void;
    pop(): FunctionCallItem | undefined;
    peek(): FunctionCallItem | undefined;
    depth(): number;
    clear(): void;
    list(): FunctionCallItem[];
    /**
     * Check for excessive recursion
     */
    isReentrant(frame: FunctionCallItem): boolean;
    isMaxDepth(): boolean;
}
