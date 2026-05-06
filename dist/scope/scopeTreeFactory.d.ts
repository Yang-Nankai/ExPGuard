import { ExtensionScript } from "../extension/extensionScript";
import ScopeTree from "./scopeTree";
declare class ScopeTreeFactory {
    /**
     * Create a ScopeTree
     * @returns A ScopeTree
     */
    create(script: ExtensionScript): ScopeTree;
}
export declare const scopeTreeFactory: ScopeTreeFactory;
export {};
