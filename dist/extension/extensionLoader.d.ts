import { ExtensionContext } from "./extensionContext";
export declare enum ExtensionSourceType {
    CRX = "CRX",
    DIR = "DIR",
    WEB = "WEB"
}
/**
 * Handle extension loading from various sources (CRX file, directory, Web Store)
 */
export declare function loadExtensionAsync(source: ExtensionSourceType, inputPath: string, outputDir: string, extensionId: string): Promise<ExtensionContext>;
