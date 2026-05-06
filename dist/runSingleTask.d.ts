import { ExtensionSourceType } from "./extension/extensionLoader";
export interface RunOptions {
    sourceType: ExtensionSourceType;
    input: string;
    outputDir: string;
    extensionId?: string;
    extensionVersion?: string;
}
export declare function runSingleTask(opts: RunOptions): Promise<void>;
