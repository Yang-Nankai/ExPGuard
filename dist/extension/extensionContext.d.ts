import { ScriptRegistry } from "./extensionRegistry";
import { ExtensionScript } from "./extensionScript";
/**
 * Represents the context of a loaded extension
 */
export declare class ExtensionContext {
    readonly id: string;
    readonly baseDir: string;
    readonly manifest: Record<string, any>;
    readonly scripts: ScriptRegistry;
    private orderedScripts;
    constructor(extensionId: string, baseDir: string);
    private loadManifest;
    private loadScripts;
    /**
     * Analyze all scripts in dependency order
     */
    analyzeScriptsInOrder(): void;
    /**
     * Iterate over all scripts with a callback
     */
    forEachScript(callback: (key: string, script: ExtensionScript) => void): void;
    get manifestVersion(): string;
    toJSON(): Record<string, any>;
    toString(): string;
    getScriptsSummary(): {
        file: string;
        frame: string;
        frameTags: string[];
        frameDetails: import("./scriptUsageTracker").FrameDescriptor[];
        size: number;
        durationMs: number;
    }[];
}
