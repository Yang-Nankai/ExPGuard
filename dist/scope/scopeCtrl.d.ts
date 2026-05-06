import { Node } from "acorn";
import Scope from "./scope";
import ScopeTree from "./scopeTree";
import { ExtensionScript } from "../extension/extensionScript";
/**
 * ScopeCtrl
 */
declare class ScopeCtrl {
    private _extensionScope;
    private _pageScopeTrees;
    private _astList;
    constructor();
    /**
     * Add scope tree of a page
     */
    addPageScopeTree(ast: Node, script: ExtensionScript): ScopeTree;
    /**
     * Get scope tree of a page by script key
     */
    getPageScopeTreeByKey(key: string): ScopeTree | null;
    /**
     * Clear the controller
     */
    clear(): void;
    /**
     * Data Methods
     */
    get pageScopeTrees(): ScopeTree[];
    get extensionScope(): Scope;
}
export declare const scopeController: ScopeCtrl;
export {};
