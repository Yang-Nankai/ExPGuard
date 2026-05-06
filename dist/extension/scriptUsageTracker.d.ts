import { ExtensionScript, ScriptFrameFamily, ScriptFrameTag } from "./extensionScript";
import { ScriptRegistry } from "./extensionRegistry";
export interface FrameConstraint {
    matches?: string[];
    includeGlobs?: string[];
    excludeMatches?: string[];
    excludeGlobs?: string[];
}
export interface FrameDescriptor {
    id: ScriptFrameTag;
    family: ScriptFrameFamily;
    constraint?: FrameConstraint;
}
declare class ScriptUsageTracker {
    private _enabled;
    private _baseDir;
    private _registry;
    private _usedScriptKeys;
    private _scriptFrames;
    private _frameFamilies;
    private _frameConstraints;
    private _frameScriptOrder;
    private _initialAnalysisOrder;
    private _externallyConnectableDeclared;
    private _externallyConnectableMatches?;
    private _externallyConnectableIds?;
    reset(): void;
    initialize(opts: {
        baseDir: string;
        manifest: Record<string, any>;
        scripts: ScriptRegistry;
    }): void;
    isEnabled(): boolean;
    isScriptUsed(scriptKey: string): boolean;
    getInitialAnalysisOrder(): string[];
    getFramedScriptKeys(): string[];
    getScriptFrameTagsByKey(scriptKey: string): ScriptFrameTag[];
    getScriptFrameDescriptorsByKey(scriptKey: string): FrameDescriptor[];
    getPrimaryFrameByKey(scriptKey: string): ScriptFrameTag;
    getFrameFamily(frameId: ScriptFrameTag): ScriptFrameFamily;
    getFrameConstraint(frameId: ScriptFrameTag): FrameConstraint | undefined;
    getExternallyConnectableConfig(): {
        declared: boolean;
        matches?: string[];
        ids?: string[];
    };
    getPrimaryFrameFamilyByKey(scriptKey: string): ScriptFrameFamily;
    getFramePredecessorScriptKeys(scriptKey: string): string[];
    markReferencedScript(fromScript: ExtensionScript | undefined, source: string): void;
    markReferencedScriptByKey(fromScriptKey: string | undefined, source: string): void;
    markReferencedScriptByPathOrUrlByKey(fromScriptKey: string | undefined, value: string): void;
    private seedFromManifest;
    private normalizeStrArray;
    private extractScriptKeysFromHtml;
    private isExternalUrl;
    private runtimeUrlToPath;
    private sourceToScriptKey;
    private resolveFromBase;
    private markUsedByKey;
    private markFrameByKey;
    private appendFrameOrderIfMissing;
    private propagateFrameByReference;
}
export declare const scriptUsageTracker: ScriptUsageTracker;
export {};
