import { ExtensionScript } from "./extensionScript";
export declare class ScriptRegistry {
    private readonly scripts;
    register(script: ExtensionScript): void;
    get(key: string): ExtensionScript | undefined;
    values(): Iterable<ExtensionScript>;
    keys(): Iterable<string>;
    has(key: string): boolean;
    entries(): Iterable<[string, ExtensionScript]>;
}
