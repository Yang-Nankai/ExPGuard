import Scope from "./scope";
import { astValidator } from "../ast/astValidator";
import { Node } from "acorn";
import { Errors } from "../utils/errorCode";
import Def from "../def-use/types/def";
import { PAGE_BUILTINS } from "../constants/builtIn";

/**
 * PageScope
 */
class PageScope extends Scope {
  private static numOfPageScopes: number = 0;
  private _index: number;

  // name -> Def
  private _imports: Map<string, Def>;
  private _exports: Map<string, Def>;

  constructor(ast: Node | null, parent: Scope | null) {
    const index = PageScope.numOfPageScopes++;
    const name = Scope.NAME_PAGE_PREFIX + "_" + index;

    super(ast, name, Scope.TYPE_PAGE, parent);
    this._index = index;

    this._imports = new Map();
    this._exports = new Map();
  }

  static resetCounter(): void {
    this.numOfPageScopes = 0;
  }

  static getCounter(): number {
    return this.numOfPageScopes;
  }

  static validate(ast: Node, msg?: string): void {
    if (!astValidator.isProgramNode(ast)) {
      Errors.ValidatorError(msg || "Invalid value for a PageScope");
    }
  }

  /**
   * Add an imported binding:
   *   import { a as b } -> name = b, def = Def(a)
   */
  addImport(name: string, def: Def) {
    // TODO: 后续在 ScopeTree 中去实现加入或许，这里也可以
    this.addLocalVariable(name);
    this._imports.set(name, def);
    // [REACHINS]
    this.setReachingDefinition(name, def, true);
    return true;
  }

  /**
   * Add multiple imported bindings
   */
  addImports(entries: Iterable<[string, Def]>): void {
    for (const [name, def] of entries) {
      this.addImport(name, def);
    }
  }

  /**
   * Export a binding from this page scope
   *   export { a as b } -> name = b, def = Def(a)
   */
  addExport(name: string, def: Def): boolean {
    this._exports.set(name, def);
    return true;
  }

  addExports(entries: Iterable<[string, Def]>): void {
    for (const [name, def] of entries) {
      this.addExport(name, def);
    }
  }

  get index(): number {
    return this._index;
  }

  get imports(): Map<string, Def> {
    return this._imports;
  }

  get exports(): Map<string, Def> {
    return this._exports;
  }

  get builtInObjects(): string[] {
    return PAGE_BUILTINS;
  }
}

export default PageScope;
