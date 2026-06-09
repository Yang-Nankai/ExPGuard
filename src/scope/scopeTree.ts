import { Node } from "acorn";
import Scope from "./scope";
import { scopeFactory } from "./scopeFactory";
import walkes, { RecurseFunction } from "../ast/walkes";
import { PairNumber, Range } from "../def-use/types/range";
import { rangeFactory } from "../def-use/factories/rangeFactory";
import logger from "../utils/logger";
import { extractPatternNames } from "../ast/patternVisitor";
import { ExtensionScript } from "../extension/extensionScript";
import PageScope from "./pageScope";
import { cfgBuilder } from "../cfg/cfgBuilder";
import { cfgValidator } from "../cfg/cfgValidator";
import { CFGResult } from "../cfg/cfgResult";

/**
 * ScopeTree inside a page
 */
class ScopeTree {
  private _key: string;
  private _script: ExtensionScript;
  private _scopes: Scope[];
  private _mapFromNameToScope: Map<string, Scope>;
  private _mapFromRangeToScope: Map<string, Scope>;
  private _root: PageScope | null;
  private _scopeStack: Scope[];
  private _scopesSortedByStart: Scope[] = [];

  constructor(script: ExtensionScript) {
    this._scopes = [];
    this._mapFromNameToScope = new Map();
    this._mapFromRangeToScope = new Map();
    this._root = null;
    this._scopeStack = [];
    this._script = script;
    this._key = script.key;
  }

  /**
   * Sort scopes by their start position for optimized range lookup
   */
  private _sortScopesForRangeLookup() {
    // Sort scopes by their start position
    this._scopesSortedByStart = [...this._scopes].sort((a, b) => {
      if (!a.range || !b.range) return 0;
      return a.range.start - b.range.start;
    });
  }

  /**
   * The currently active scope (top of the scope stack) or null if none.
   */
  get currentScope(): Scope | null {
    return this._scopeStack.length > 0
      ? this._scopeStack[this._scopeStack.length - 1]
      : this._root;
  }

  /**
   * Enter a child scope: wire it into the parent (if any), add to registry, and push
   */
  enterScope(scope: Scope) {
    const parent = this.currentScope;
    if (parent) parent.addChildScope(scope);
    this.addScope(scope);
    this._scopeStack.push(scope);
  }

  /**
   * Exit the current scope. If the stack is empty, this is a no-op (defensive).
   */
  exitScope() {
    if (this._scopeStack.length === 0) return this._root;
    this._scopeStack.pop();
  }

  /**
   * Add a Scope to internal registries.
   * Emits warnings for name/range collisions but still keeps the first-come mapping.
   */
  addScope(scope: Scope) {
    if (!Scope.isScope(scope)) return;

    this._registerScopeByName(scope);
    this._registerScopeByRange(scope);
    this._setupScopeVariables(scope);
    
    this._scopes.push(scope);
    // Add to sorted array (maintain order)
    this._insertScopeSorted(scope);
  }


  /**
   * Register scope by name with conflict detection
   */
  private _registerScopeByName(scope: Scope): void {
    if (this._mapFromNameToScope.has(scope.name)) {
      logger.warn(`Scope name conflict detected: ${scope.name}`);
    } else {
      this._mapFromNameToScope.set(scope.name, scope);
    }
  }

  /**
   * Register scope by range with conflict detection
   */
  private _registerScopeByRange(scope: Scope): void {
    if (!scope.range) return;

    const key = scope.range.toString();
    if (this._mapFromRangeToScope.has(key)) {
      logger.warn(`Scope range conflict detected: ${key}`);
    } else {
      this._mapFromRangeToScope.set(key, scope);
    }
  }

  /**
   * Setup variables for different scope types
   */
  private _setupScopeVariables(scope: Scope): void {
    scope.setBuiltInObjectVariables();
    
    if (Scope.isFunctionScope(scope) || Scope.isCatchClauseScope(scope)) {
      this._setupParameters(scope);
    }
    
    this._setupLocalVariables(scope);
  }

  /**
   * Setup parameters for function and catch clause scopes
   */
  private _setupParameters(scope: Scope): void {
    const node = scope.ast as any;
    const params = Scope.isCatchClauseScope(scope) 
      ? [node.param] 
      : node.params || [];

    for (const param of params) {
      const names = extractPatternNames(param);
      names.forEach(name => scope.addParameter(name));
    }
  }

  /**
   * Setup local variables for the scope
   */
  private _setupLocalVariables(scope: Scope): void {
    const ast = scope.ast;
    if (!ast) return;

    walkes(ast, {
      VariableDeclaration: (node: any, recurse: RecurseFunction) => {
        node.declarations.forEach((declarator: any) => recurse(declarator));
      },
      VariableDeclarator: (node: any, recurse: RecurseFunction) => {
        const names = extractPatternNames(node.id);
        names.forEach(name => scope.addLocalVariable(name));
        recurse(node.init);
      },
      ClassDeclaration: (node: any, recurse: RecurseFunction) => {
        const className = node.id.name;
        scope.addLocalVariable(className);
      }
    });
  }

  /**
   * Initialize the tree for a new AST: create a page/global scope and reset registries.
   * Ensures the scope stack is empty and root is set.
   */
  private initialization(ast: Node) {
    // reset state
    this._scopes = [];
    this._mapFromRangeToScope.clear();
    this._mapFromNameToScope.clear();
    this._scopeStack = [];

    const pageScope = scopeFactory.createPageScope(ast);
    this._root = pageScope;
    this.addScope(pageScope);
    // root is also the initial active scope for many analyses
    this._scopeStack.push(pageScope);
  }

  static isScopeTree(obj: any): obj is ScopeTree {
    return obj instanceof ScopeTree;
  }

  /**
   * Build the ScopeTree from the provided AST. Walks the AST and creates scopes
   * for constructs that introduce lexical scope in JavaScript.
   */
  buildScopeTree(ast: Node) {
    const self = this;
    this.initialization(ast);

    // Helper: iterate over program body
    function programHandler(node: any, recurse: RecurseFunction) {
      for (const elem of node.body) recurse(elem);
    }

    // Helper: visit function body block safely
    function handleFunctionBody(node: any, recurse: RecurseFunction) {
      for (const astNode of node.body) recurse(astNode);
    }

    function catchHandler(node: any, recurse: RecurseFunction) {
      const catchScope = scopeFactory.createCatchScope(node);
      self.enterScope(catchScope);
      try {
        recurse(node.body);
      } finally {
        self.exitScope();
      }
    }

    function forLikeHandler(node: any, recurse: RecurseFunction) {
      const shouldCreateForScope =
        (node.init?.type === "VariableDeclaration" &&
          node.init.kind !== "var") ||
        (node.left?.type === "VariableDeclaration" && node.left.kind !== "var");

      if (shouldCreateForScope) {
        const forScope = scopeFactory.createForScope(node);
        self.enterScope(forScope);
      }

      try {
        // Recurse into init, left, right, test, and update nodes if they exist
        if (node.init) recurse(node.init);
        if (node.left) recurse(node.left);
        if (node.right) recurse(node.right);
        if (node.test) recurse(node.test);
        if (node.update) recurse(node.update);
        recurse(node.body);
      } finally {
        if (shouldCreateForScope) {
          self.exitScope();
        }
      }
    }

    function switchHandler(node: any, recurse: RecurseFunction) {
      recurse(node.discriminant);
      const switchScope = scopeFactory.createSwitchScope(node);
      self.enterScope(switchScope);
      try {
        for (const caseClause of node.cases) recurse(caseClause);
      } finally {
        self.exitScope();
      }
    }

    function withHandler(node: any, recurse: RecurseFunction) {
      // with introduces dynamic scope-like semantics; still create a dedicated scope
      recurse(node.object);
      const withScope = scopeFactory.createWithScope(node);
      self.enterScope(withScope);
      try {
        recurse(node.body);
      } finally {
        self.exitScope();
      }
    }

    function blockHandler(node: any, recurse: RecurseFunction) {
      // create a block scope for let/const
      const blockScope = scopeFactory.createBlockScope(node);
      self.enterScope(blockScope);
      try {
        for (const stmt of node.body) recurse(stmt);
      } finally {
        self.exitScope();
      }
    }

    function functionHandler(node: any, recurse: RecurseFunction) {

      let funcName = node.id?.name ?? null;
      const isFunctionExpressionName =
        node.type === "FunctionExpression" && !!funcName;

      if (node.type === "FunctionDeclaration" && funcName) {
        // funcName must not be null, avoid `export default function(){}`
        // Add FunctionDeclaration to local variables of the current scope
        self.currentScope?.addInnerFunctionVariable(funcName);
      }


      // Create the function scope and enter it first.
      const funcScope = scopeFactory.createFunctionScope(
        node,
        funcName,
        isFunctionExpressionName
      );
      self.enterScope(funcScope);

      // Add inner function variable if it's a function expression name scope
      if (isFunctionExpressionName) {
        // Scope are limited to the function body itself
        funcScope.addInnerFunctionVariable(funcName);
      }

      try {
        // params live in the function scope (or in param scope depending on implementation).
        if (Array.isArray(node.params)) {
          node.params.forEach((p: Node) => recurse(p));
        }

        // Body may be BlockStatement (normal) or expression (arrow concise)
        if (node.body?.type === "BlockStatement") {
          handleFunctionBody(node.body, recurse);
        } else if (node.body) {
          recurse(node.body);
        }
      } finally {
        self.exitScope();
      }
    }

    function classHandler(node: any, recurse: RecurseFunction) {
      if (node.superClass) recurse(node.superClass);
      const classScope = scopeFactory.createClassScope(node, node.id?.name);
      self.enterScope(classScope);

      try {
        recurse(node.body);
      } finally {
        self.exitScope();
      }
    }

    function propertyHandler(node: any, recurse: RecurseFunction) {
      // computed keys should be visited
      if (node.computed) recurse(node.key);

      const isMethodDefinition =
        node.type === "MethodDefinition" || node.method === true;
      // let previous = false;

      if (isMethodDefinition) {
        let methodName: string | null = null;
        if (node.key.type === "Identifier") {
          methodName = node.key.name;
        } else if (node.key.type === "Literal") {
          methodName = String(node.key.value);
        } else if (node.key.type === "PrivateIdentifier") {
          methodName = "#" + node.key.name;
        }

      }

      // value may be a function (method) or other expression
      recurse(node.value);
    }

    // generic MemberExpression handler
    const memberExprHandler = (node: any, recurse: RecurseFunction) => {
      recurse(node.object);
      if (node.computed) recurse(node.property);
    };

    walkes(ast, {
      Program: programHandler,
      FunctionDeclaration: functionHandler,
      FunctionExpression: functionHandler,
      ArrowFunctionExpression: functionHandler,
      CatchClause: catchHandler,
      ClassExpression: classHandler,
      ClassDeclaration: classHandler,
      ForStatement: forLikeHandler,
      ForInStatement: forLikeHandler,
      ForOfStatement: forLikeHandler,
      MemberExpression: memberExprHandler,
      Property: propertyHandler,
      MethodDefinition: propertyHandler,
      WithStatement: withHandler,
      SwitchStatement: switchHandler,
      BlockStatement: blockHandler,
      LabeledStatement: function (node: any, recurse: RecurseFunction) {
        recurse(node.body);
      },
    });

    // after the walk, ensure the stack is balanced: pop remaining scopes until only root remains
    // (this is defensive - normally stack should only contain the root at this point)
    while (self._scopeStack.length > 1) this._scopeStack.pop();

    // Sort scopes by their start position for optimized range lookup
    this._sortScopesForRangeLookup();
  }

  /**
   * method for getting a function scope (Scope type) by comparing its range
   * @param range Value for a Range
   */
  getScopeByRange(range: Range | PairNumber): Scope | null {
    if (Range.isRange(range)) {
      return this._mapFromRangeToScope.get(range.toString()) ?? null;
    } else if (Array.isArray(range)) {
      return this._mapFromRangeToScope.get(range.toString()) ?? null;
    } else {
      return null;
    }

    // if (!Range.isValidValue(range)) return null;
    // const rangeObj = rangeFactory.create(range);
    // return this._mapFromRangeToScope.get(rangeObj.toString()) ?? null;
  }

  /**
   * Get the most closely enclosing scope that fully contains the provided range
   * but is not exactly equal to it. Returns the smallest such scope (i.e. the innermost
   * scope strictly containing the target range).
   */
  getNodeScopeByRange(range: Range | PairNumber): Scope | null {
    if (!Range.isValidValue(range)) return null;
    const rangeObj = rangeFactory.create(range);

    let closestScope: Scope | null = null;
    let minSize = Infinity;

    for (const scope of this._scopes) {
      const scopeRange = scope.range;
      if (!scopeRange) continue;

      const isContaining =
        scopeRange.start <= rangeObj.start && scopeRange.end >= rangeObj.end;
      const isEqual =
        scopeRange.start === rangeObj.start && scopeRange.end === rangeObj.end;
      if (isContaining && !isEqual) {
        const currentSize = scopeRange.end - scopeRange.start;
        if (
          currentSize < minSize ||
          (currentSize === minSize &&
            closestScope &&
            scopeRange.start > closestScope.range!.start)
        ) {
          closestScope = scope;
          minSize = currentSize;
        }
      }
    }
    return closestScope;
  }

  /**
   * Lookup scope by range with many optimizations metho
   */
  getNodeScopeByRangeOptimized(range: Range | PairNumber): Scope | null {
    if (!Range.isValidValue(range)) return null;
    const rangeObj = rangeFactory.create(range);

    // First try exact match (fastest path)
    const exactMatch = this._mapFromRangeToScope.get(rangeObj.toString());
    if (exactMatch) {
      return exactMatch;
    }

    if (this._scopesSortedByStart.length === 0) {
      this._sortScopesForRangeLookup();
    }

    let closestScope: Scope | null = null;
    let minSize = Infinity;

    // Optimization: only search scopes that could contain the target range
    for (let i = this._scopesSortedByStart.length - 1; i >= 0; i--) {
      const scope = this._scopesSortedByStart[i];
      const scopeRange = scope.range;
      if (!scopeRange) continue;

      // Quick fail conditions
      if (scopeRange.start > rangeObj.start) continue;
      if (scopeRange.end < rangeObj.end) continue;

      // Exclude exact match cases
      if (
        scopeRange.start === rangeObj.start &&
        scopeRange.end === rangeObj.end
      ) {
        continue;
      }

      const currentSize = scopeRange.end - scopeRange.start;
      if (currentSize < minSize) {
        closestScope = scope;
        minSize = currentSize;
      }

      // Because the array is sorted by start position, once we find the first matching scope,
      // subsequent scopes will only be larger, so we can break early
      if (closestScope && currentSize >= minSize) {
        break;
      }
    }

    return closestScope;
  }

  /**
   * Obtain the sorted order of scopes by start position
   */
  private _insertScopeSorted(scope: Scope) {
    if (!scope.range) return;

    // Insert to _scopesSortedByStart
    let insertIndex = this._scopesSortedByStart.findIndex(
      (s) => !s.range || s.range.start > scope.range!.start
    );

    if (insertIndex === -1) {
      this._scopesSortedByStart.push(scope);
    } else {
      this._scopesSortedByStart.splice(insertIndex, 0, scope);
    }
  }

  /**
   * Method for getting a function scope (Scope type) by comparing its scope name
   * @param scopeName Name of the searched scope
   */
  getScopeByName(scopeName: string): Scope | null {
    return typeof scopeName === "string"
      ? this._mapFromNameToScope.get(scopeName) ?? null
      : null;
  }

  /**
   * Method for getting a function scope (Scope type) by comparing its scope name
   * @param scopeName Name of the searched scope
   */
  isRelatedToTheScope(searchKey: Scope | string | Range | PairNumber): boolean {
    if (Scope.isScope(searchKey)) {
      return this._scopes.includes(searchKey);
    }
    if (typeof searchKey === "string") {
      return this._mapFromNameToScope.has(searchKey);
    }
    if (Range.isValidValue(searchKey)) {
      const range = rangeFactory.create(searchKey);
      return this._mapFromRangeToScope.has(range.toString());
    }
    return false;
  }

  /**
   * Represent the ScopeTree as a string
   * @returns String representation of the ScopeTree
   */
  toString(): string {
    return this._root ? this.recursivelyGetScopeText(this._root, 0) : "";
  }

  /**
   * Recursively get the representation text of a function scope
   */
  private recursivelyGetScopeText(currentScope: Scope, level: number): string {
    const currentLevel = level ?? 0;
    let representation = "";

    if (Scope.isScope(currentScope)) {
      representation += currentLevel === 0 ? "" : "\n";
      representation += this.getScopeRepresentation(currentScope, currentLevel);
      for (const child of currentScope.children) {
        representation += this.recursivelyGetScopeText(child, currentLevel + 1);
      }
    }
    return representation;
  }

  /**
   * Get the representation of a function scope with indent
   */
  private getScopeRepresentation(scope: Scope, level: number): string {
    const indentBasis = " ";
    const indent = indentBasis.repeat(level);
    return `${indent}+-${scope}`;
  }

  /**
   * Get all scopes of a specific type
   */
  private getScopesByType(type: string): Scope[] {
    return this._scopes.filter((scope) => scope.type === type);
  }

  /**
   * Get all function scopes
   */
  getFunctionScopes(): Scope[] {
    return this.getScopesByType(Scope.TYPE_FUNCTION);
  }

  /**
   * Get model scope
   */
  getCFGEligibleScopes(): Scope[] {
    return this.scopes.filter((scope) => Scope.isCFGEligibleScope(scope));
  }

  /**
   * Build intra-procedural CFG for every CFG-eligible scope in this tree.
   * Each CFG is attached to its owning Scope (`scope.graph`); flow nodes are
   * back-linked to their scope/scopeTree for downstream analyses.
   */
  buildIntraProceduralCFGs(): void {
    for (const scope of this.getCFGEligibleScopes()) {
      this._buildCFGForScope(scope);
    }
  }

  /**
   * Build a CFG for a single scope and bind every FlowNode back to its
   * containing scope and this scope tree. Invalid CFGs are dropped with a
   * warning to keep downstream analyses safe.
   */
  private _buildCFGForScope(scope: Scope): void {
    try {
      const astNode = scope.ast as any;
      if (!astNode) {
        scope.graph = null;
        return;
      }

      const graph = Scope.isFunctionScope(scope)
        ? cfgBuilder.getCFG(astNode.body)
        : cfgBuilder.getCFG(astNode);

      if (!graph || !cfgValidator.isValidCFG(graph)) {
        logger.warn(`Invalid CFG for scope: ${scope.name}`);
        scope.graph = null;
        return;
      }

      scope.graph = graph;
      this._bindGraphNodesToScopes(graph, scope);
    } catch (err) {
      logger.error(
        `Failed to build CFG for scope "${scope.name}": ${String(err)}`,
      );
      scope.graph = null;
    }
  }

  /**
   * Resolve every FlowNode's owning scope using the AST range index, falling
   * back to `defaultScope` when a node has no range or no narrower match.
   */
  private _bindGraphNodesToScopes(
    graph: CFGResult,
    defaultScope: Scope,
  ): void {
    for (const node of graph.allNodes) {
      const range = node.astNode?.range;
      node.scope = range
        ? this.getNodeScopeByRangeOptimized(range) ?? defaultScope
        : defaultScope;
      node.scopeTree = this;
    }
  }

  /**
   * Lookup the CFG-eligible scope whose `mainlyRelatedScope` equals `scope`.
   * In the new model, every CFG is owned by its scope directly, so this just
   * checks the scope itself.
   */
  getCFGScope(scope: Scope): Scope | null {
    if (!Scope.isScope(scope)) return null;
    if (!Scope.isCFGEligibleScope(scope)) return null;
    return this._scopes.includes(scope) ? scope : null;
  }

  /**
   * Iterate the CFG-bearing scopes (the equivalent of the former
   * `pageModels.intraProceduralModels`).
   */
  get cfgBearingScopes(): Scope[] {
    return this.getCFGEligibleScopes();
  }

  get root() {
    return this._root;
  }

  get scopes() {
    return this._scopes;
  }

  get mapFromNameToScope() {
    return this._mapFromNameToScope;
  }

  get mapFromRangeToScope() {
    return this._mapFromRangeToScope;
  }

  get key() {
    return this._key;
  }

  get script() {
    return this._script;
  }
}

export default ScopeTree;
