import { Node } from "acorn";
import Scope from "./scope";
import { scopeFactory } from "./scopeFactory";
import ScopeTree from "./scopeTree";
import { scopeTreeFactory } from "./scopeTreeFactory";
import { ExtensionScript } from "../extension/extensionScript";

/**
 * ScopeCtrl
 */
class ScopeCtrl {
  private _extensionScope: Scope;
  private _pageScopeTrees: ScopeTree[];
  private _astList: Node[];

  constructor() {
    this._extensionScope = scopeFactory.createExtensionScope();
    this._pageScopeTrees = [];
    this._astList = [];
  }

  /**
   * Add scope tree of a page
   */
  addPageScopeTree(ast: Node, script: ExtensionScript): ScopeTree {
    const tree = scopeTreeFactory.create(script);
    tree.buildScopeTree(ast);
    this._extensionScope.addChildScope(tree.root);
    this._pageScopeTrees.push(tree);
    this._astList.push(ast);
    return tree;
  }

  /**
   * Get scope tree of a page by script key
   */
  getPageScopeTreeByKey(key: string): ScopeTree | null {
    return (
      this._pageScopeTrees.find((tree) => tree.key === key) ||
      null
    );
  }
  
  /**
   * Clear the controller
   */
  clear() {
    this._extensionScope = scopeFactory.createExtensionScope();
    this._pageScopeTrees = [];
    scopeFactory.resetAnonymousFunctionScopeCounter();
    scopeFactory.resetPageScopeCounter();
  }

  /**
   * Data Methods
   */
  get pageScopeTrees(): ScopeTree[] {
    return [...this._pageScopeTrees];
  }

  get extensionScope(): Scope {
    return this._extensionScope;
  }
}

export const scopeController = new ScopeCtrl();
