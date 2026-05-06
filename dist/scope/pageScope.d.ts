import Scope from "./scope";
import { Node } from "acorn";
import Def from "../def-use/types/def";
/**
 * PageScope
 */
declare class PageScope extends Scope {
    private static numOfPageScopes;
    private _index;
    private _imports;
    private _exports;
    constructor(ast: Node | null, parent: Scope | null);
    static resetCounter(): void;
    static getCounter(): number;
    static validate(ast: Node, msg?: string): void;
    /**
     * Add an imported binding:
     *   import { a as b } -> name = b, def = Def(a)
     */
    addImport(name: string, def: Def): boolean;
    /**
     * Add multiple imported bindings
     */
    addImports(entries: Iterable<[string, Def]>): void;
    /**
     * Export a binding from this page scope
     *   export { a as b } -> name = b, def = Def(a)
     */
    addExport(name: string, def: Def): boolean;
    addExports(entries: Iterable<[string, Def]>): void;
    get index(): number;
    get imports(): Map<string, Def>;
    get exports(): Map<string, Def>;
    get builtInObjects(): string[];
}
export default PageScope;
