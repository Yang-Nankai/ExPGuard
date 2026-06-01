import { Node } from "acorn";
import Scope from "./scope";
import { PairNumber, Range } from "../def-use/types/range";
import { ExtensionScript } from "../extension/extensionScript";
import PageScope from "./pageScope";
/**
 * ScopeTree inside a page
 */
declare class ScopeTree {
    private _key;
    private _script;
    private _scopes;
    private _mapFromNameToScope;
    private _mapFromRangeToScope;
    private _root;
    private _scopeStack;
    private _scopesSortedByStart;
    constructor(script: ExtensionScript);
    /**
     * Sort scopes by their start position for optimized range lookup
     */
    private _sortScopesForRangeLookup;
    /**
     * The currently active scope (top of the scope stack) or null if none.
     */
    get currentScope(): Scope | null;
    /**
     * Enter a child scope: wire it into the parent (if any), add to registry, and push
     */
    enterScope(scope: Scope): void;
    /**
     * Exit the current scope. If the stack is empty, this is a no-op (defensive).
     */
    exitScope(): PageScope | null | undefined;
    /**
     * Add a Scope to internal registries.
     * Emits warnings for name/range collisions but still keeps the first-come mapping.
     */
    addScope(scope: Scope): void;
    /**
     * Register scope by name with conflict detection
     */
    private _registerScopeByName;
    /**
     * Register scope by range with conflict detection
     */
    private _registerScopeByRange;
    /**
     * Setup variables for different scope types
     */
    private _setupScopeVariables;
    /**
     * Setup parameters for function and catch clause scopes
     */
    private _setupParameters;
    /**
     * Setup local variables for the scope
     */
    private _setupLocalVariables;
    /**
     * Initialize the tree for a new AST: create a page/global scope and reset registries.
     * Ensures the scope stack is empty and root is set.
     */
    private initialization;
    static isScopeTree(obj: any): obj is ScopeTree;
    /**
     * Build the ScopeTree from the provided AST. Walks the AST and creates scopes
     * for constructs that introduce lexical scope in JavaScript.
     */
    buildScopeTree(ast: Node): void;
    /**
     * method for getting a function scope (Scope type) by comparing its range
     * @param range Value for a Range
     */
    getScopeByRange(range: Range | PairNumber): Scope | null;
    /**
     * Get the most closely enclosing scope that fully contains the provided range
     * but is not exactly equal to it. Returns the smallest such scope (i.e. the innermost
     * scope strictly containing the target range).
     */
    getNodeScopeByRange(range: Range | PairNumber): Scope | null;
    /**
     * Lookup scope by range with many optimizations metho
     */
    getNodeScopeByRangeOptimized(range: Range | PairNumber): Scope | null;
    /**
     * Obtain the sorted order of scopes by start position
     */
    private _insertScopeSorted;
    /**
     * Method for getting a function scope (Scope type) by comparing its scope name
     * @param scopeName Name of the searched scope
     */
    getScopeByName(scopeName: string): Scope | null;
    /**
     * Method for getting a function scope (Scope type) by comparing its scope name
     * @param scopeName Name of the searched scope
     */
    isRelatedToTheScope(searchKey: Scope | string | Range | PairNumber): boolean;
    /**
     * Represent the ScopeTree as a string
     * @returns String representation of the ScopeTree
     */
    toString(): string;
    /**
     * Recursively get the representation text of a function scope
     */
    private recursivelyGetScopeText;
    /**
     * Get the representation of a function scope with indent
     */
    private getScopeRepresentation;
    /**
     * Get all scopes of a specific type
     */
    private getScopesByType;
    /**
     * Get all function scopes
     */
    getFunctionScopes(): Scope[];
    /**
     * Get model scope
     */
    getCFGEligibleScopes(): Scope[];
    /**
     * Build intra-procedural CFG for every CFG-eligible scope in this tree.
     * Each CFG is attached to its owning Scope (`scope.graph`); flow nodes are
     * back-linked to their scope/scopeTree for downstream analyses.
     */
    buildIntraProceduralCFGs(): void;
    /**
     * Build a CFG for a single scope and bind every FlowNode back to its
     * containing scope and this scope tree. Invalid CFGs are dropped with a
     * warning to keep downstream analyses safe.
     */
    private _buildCFGForScope;
    /**
     * Resolve every FlowNode's owning scope using the AST range index, falling
     * back to `defaultScope` when a node has no range or no narrower match.
     */
    private _bindGraphNodesToScopes;
    /**
     * Lookup the CFG-eligible scope whose `mainlyRelatedScope` equals `scope`.
     * In the new model, every CFG is owned by its scope directly, so this just
     * checks the scope itself.
     */
    getCFGScope(scope: Scope): Scope | null;
    /**
     * Iterate the CFG-bearing scopes (the equivalent of the former
     * `pageModels.intraProceduralModels`).
     */
    get cfgBearingScopes(): Scope[];
    get root(): PageScope | null;
    get scopes(): Scope[];
    get mapFromNameToScope(): Map<string, Scope>;
    get mapFromRangeToScope(): Map<string, Scope>;
    get key(): string;
    get script(): ExtensionScript;
}
export default ScopeTree;
