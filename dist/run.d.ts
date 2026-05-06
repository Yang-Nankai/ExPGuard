import { ExtensionSourceType } from "./extension/extensionLoader";
interface RunOptions {
    sourceType: ExtensionSourceType;
    input: string;
    outputDir: string;
    extensionId?: string;
    extensionVersion?: string;
}
export declare function runSingleTask(opts: RunOptions): Promise<void>;
export {};
