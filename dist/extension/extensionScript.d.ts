import { Node } from "acorn";
import Set from "../utils/set";
/**
 * ScriptKey format:
 * <normalized-relative-path-without-extension>
 *
 * Examples:
 * background/index
 * content/inject
 */
export type ScriptKey = string;
export type ScriptFrameTag = string;
export type ScriptFrameFamily = "CS" | "BG" | "UNKNOWN";
/**
 * Represents a single script file inside an extension
 */
export declare class ExtensionScript {
    readonly key: ScriptKey;
    readonly absPath: string;
    readonly relativePath: string;
    readonly baseDir: string;
    private code?;
    private ast?;
    private dependencies?;
    private analysisDurationMs;
    constructor(absPath: string, baseDir: string);
    /**
     * Create ScriptKey from absolute path
     */
    static createScriptKey(absPath: string, baseDir: string): ScriptKey;
    /**
     * Resolve import / importScripts target to ScriptKey
     *
     * Rules:
     * 1. source starts with "."  -> relative to current script directory
     * 2. source does NOT start with "." -> relative to extension baseDir
     */
    resolveRelativeScriptKey(source: string): ScriptKey | null;
    /**
     * Lazily parse and validate AST
     */
    getAST(): Node;
    /**
     * Add: Get file size in bytes
     */
    getFileSize(): number;
    /**
     * Add: set analysis duration in milliseconds
     */
    setAnalysisDuration(s: number): void;
    getCode(): string | null;
    /**
     * Analyze import / importScripts dependencies
     */
    getDependencies(): Set<string>;
    toJSON(): {
        key: string;
        path: string;
        dependencies: Set<string> | undefined;
        sizeBytes: number;
        analysisDurationMs: number;
    };
    toString(): string;
    private ensureValidFile;
    private writeOptimizedOutput;
}
