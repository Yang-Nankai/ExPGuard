import { Options } from "acorn";
import { ExtensionSourceType } from "./extension/extensionLoader";
import { ExtensionContext } from "./extension/extensionContext";
/** =====================================================
 *  EPG Model Builder
 *  ===================================================== */
export interface EPGOptions {
    extensionPath: string;
    extensionType: ExtensionSourceType;
    outputPath: string;
    extensionId: string;
    extensionVersion?: string;
    parseOptions?: Options;
}
export declare class EPGModelBuilder {
    private _extensionContext;
    private _extensionId;
    /**
     * Unified public entry
     * CLI / runner should ONLY call this
     */
    analyze(options: EPGOptions): Promise<ExtensionContext>;
    /** =======================
     * Source-specific wrappers
     * ======================= */
    analyzeCRX(options: EPGOptions): Promise<ExtensionContext>;
    analyzeDIR(options: EPGOptions): Promise<ExtensionContext>;
    analyzeWEB(options: EPGOptions): Promise<ExtensionContext>;
    /** =======================
     * Core implementation
     * ======================= */
    private _analyze;
    /**
     * Remove and recreate output directory
     */
    private cleanOutputDir;
    get extensionContext(): ExtensionContext | null;
    getExtensionId(): string | null;
}
export declare const epgModelBuilder: EPGModelBuilder;
