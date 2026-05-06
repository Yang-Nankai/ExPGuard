import { Node } from "acorn";
import { Range } from "../def-use/types/range";
import { rangeFactory } from "../def-use/factories/rangeFactory";
import { astValidator } from "../ast/astValidator";
import Var from "../def-use/types/var";
import { varFactory } from "../def-use/factories/varFactory";
import Def from "../def-use/types/def";
import PageScope from "./pageScope";
import FunctionScope from "./functionScope";
import { Errors } from "../utils/errorCode";

/**
 * Scope
 */
class Scope {
  private readonly _ast: Node | null;
  private readonly _name: string;
  private readonly _type: string;
  private _parent: Scope | null;
  private _range: Range | null;
  private _vars: Map<string, Var>;
  private _params: Map<string, Var>;
  private _paramNames: string[];
  private _namedFunctionVars: Map<string, Var>;
  private _builtInObjectVars: Map<string, Var>;
  private _children: Scope[];
  // TODO: change the reachIns and lastReachIns
  private _reachIns: Map<string, Def>;
  private _lastReachIns: Map<string, Def>;
  private _builtInObjects: string[] = [];
  protected _isFunctionExpressionNameScope: boolean = false;

  static readonly NAME_EXTENSION = "$EXTENSION";
  static readonly NAME_PAGE_PREFIX = "$PAGE";
  static readonly NAME_ANONYMOUS_FUNCTION_PREFIX = "$ANONF";
  static readonly NAME_ANONYMOUS_CLASS_PREFIX = "$ANONC";
  static readonly NAME_CATCH_PREFIX = "$CATCH";
  static readonly NAME_WITH_PREFIX = "$WITH";
  static readonly NAME_SWITCH_PREFIX = "$SWITCH";
  static readonly NAME_FOR_PREFIX = "$FOR";
  static readonly NAME_BLOCK_PREFIX = "$BLOCK";

  static readonly TYPE_FUNCTION = "function";
  static readonly TYPE_WITH = "with";
  static readonly TYPE_CATCH = "catch";
  static readonly TYPE_PAGE = "page";
  static readonly TYPE_EXTENSION = "extension";
  static readonly TYPE_SWITCH = "switch";
  static readonly TYPE_FOR = "for";
  static readonly TYPE_BLOCK = "block";
  static readonly TYPE_CLASS = "class";

  static readonly VALID_TYPES = [
    Scope.TYPE_FUNCTION,
    Scope.TYPE_PAGE,
    Scope.TYPE_EXTENSION,
    Scope.TYPE_CATCH,
    Scope.TYPE_SWITCH,
    Scope.TYPE_WITH,
    Scope.TYPE_FOR,
    Scope.TYPE_BLOCK,
    Scope.TYPE_CLASS,
  ];

  constructor(
    ast: Node | null,
    name: string,
    type: string,
    parent: Scope | null
  ) {
    this._ast = ast;
    this._name = name;
    this._type = type;
    this._parent = parent;
    this._range = ast && ast.range ? rangeFactory.create(ast.range) : null;
    this._vars = new Map();
    this._params = new Map();
    this._paramNames = [];
    this._namedFunctionVars = new Map();
    this._builtInObjectVars = new Map();
    this._children = [];
    this._reachIns = new Map();
    this._lastReachIns = new Map();

    if (parent) {
      parent.addChildScope(this);
    }
  }

  /**
   * Check the parent scope is valid or not (could be null/undefined)
   * @param parentScope
   * @returns True if the parent scope  is valid or empty
   */
  static isValidParent(parent: any): boolean {
    return parent instanceof Scope || parent === null || parent === undefined;
  }

  /**
   * Check the object is a Scope or not
   * @param obj An object to be checked
   * @returns True if the obj is a Scope object, false otherwise
   */
  static isScope(obj: any): obj is Scope {
    return obj instanceof Scope;
  }

  /**
   * Check the scope name is valid or not
   * @param name Name of the scope
   * @returns True if it's valid, false otherwise
   */
  static isValidName(name: string): boolean {
    const normalFunctionNameFormat = /^[_a-zA-Z][_a-zA-Z0-9]*$/i;
    return (
      name === Scope.NAME_EXTENSION ||
      name.startsWith(Scope.NAME_PAGE_PREFIX) ||
      name.startsWith(Scope.NAME_ANONYMOUS_FUNCTION_PREFIX) ||
      name.startsWith(Scope.NAME_CATCH_PREFIX) ||
      name.startsWith(Scope.NAME_WITH_PREFIX) ||
      name.startsWith(Scope.NAME_SWITCH_PREFIX) ||
      name.startsWith(Scope.NAME_FOR_PREFIX) ||
      name.startsWith(Scope.NAME_BLOCK_PREFIX) ||
      name.startsWith(Scope.NAME_ANONYMOUS_CLASS_PREFIX) ||
      normalFunctionNameFormat.test(name)
    );
  }

  /**
   * Check if the type is a valid scope type
   * @param type Type to be checked
   * @returns True if the type is valid, false otherwise
   */
  static isValidType(type: string): boolean {
    return Scope.VALID_TYPES.includes(type);
  }

  /**
   * Validate the initial value of the Scope is valid or not
   * @param ast AST root of the scope
   * @param name Name of the scope
   * @param type Type of the scope
   * @param parent Parent scope
   * @param [msg] Custom error message
   * @throws When a value is invalid
   */
  static validate(
    ast: Node | null,
    name: string,
    type: string,
    parent: Scope | null,
    msg?: string
  ): void {
    if (type === Scope.TYPE_EXTENSION) {
      if (ast !== null) {
        Errors.ScopeError(msg || "Extension scope must have ast as null");
      }
      return;
    }

    if (
      !ast ||
      !astValidator.check(ast) ||
      !ast.range ||
      !Scope.isValidName(name) ||
      !Scope.isValidType(type) ||
      !Scope.isValidParent(parent)
    ) {
      Errors.ScopeError(msg || "Invalid value for a Scope");
    }
  }

  /**
   * alidate the object is a Scope or not
   * @param obj An object to be validated
   * @param [msg] Custom error message
   * @throws When the object is not a Scope
   */
  static validateType(obj: any, msg?: string): void {
    if (!Scope.isScope(obj)) {
      throw new Error(msg || "Not a Scope");
    }
  }

  /**
   * Check if the variable is declared in this scope with the same name
   * @param name Name of the finding variable
   * @returns True if it's found, false otherwise
   */
  hasLocalVariable(name: string): boolean {
    return this._vars.has(name);
  }

  /**
   * Check the variable is available in current scope
   * @param name Name of the finding variable
   * @returns True if it's found, false otherwise
   */
  hasVariable(name: string): boolean {
    return this.getVariable(name) !== null;
  }

  /**
   * Check if there is a named function with the specified name
   * @param name
   * @returns True, if there is one; false, otherwise
   */
  hasNamedFunction(name: string): boolean {
    return this._namedFunctionVars.has(name);
  }

  /**
   * Check if there is a built-in object with the specified name
   * @param name
   * @returns True, if there is one; false, otherwise
   */
  hasBuiltInObject(name: string): boolean {
    return this._builtInObjectVars.has(name);
  }

  /**
   * Get the local variable with its name
   * @param name Name of the finding variable
   * @returns Returns found variable or null value
   */
  getLocalVariable(name: string): Var | null {
    return this._vars.get(name) || null;
  }

  /**
   * Get the params
   */
  getParamVariable(name: string): Var | null {
    return this._params.get(name) || null;
  }

  /**
   * Get available variable with its name (recursive to parent scopes)
   * @param name Name of the finding variable
   * @returns Found variable, or null value
   */
  getVariable(name: string): Var | null {
    let current: Scope | null = this;
    while (current) {
      const variable = current.getLocalVariable(name);
      if (variable) {
        return variable;
      }
      current = current.parent;
    }
    return null;
  }

  /**
   * Get param name with parameter index
   * @param index Index of finding parameter
   * @returns If found, returns the parameter's name, otherwise null
   */
  getParamNameWithIndex(index: number): string | null {
    return index >= 0 && index < this._paramNames.length
      ? this._paramNames[index]
      : null;
  }

  /**
   * Add a child to this Scope
   * @param child Child scope
   */
  addChildScope(child: Scope | null) {
    if (Scope.isScope(child) && !this._children.includes(child)) {
      this._children.push(child);
      child.parent = this;
    }
  }

  /**
   * Check if the scope is a child of current scope
   * @param {Scope} scope A scope to be checked
   * @returns {boolean} True if it is, false otherwise
   */
  hasChildScope(scope: Scope): boolean {
    return this._children.includes(scope);
  }

  /**
   * Check the scope has the same parent as this scope or not
   * @param comparedScope Scope to be compared
   * @returns True if it's the same, false otherwise
   */
  isSiblingOf(comparedScope: Scope): boolean {
    return this._parent === comparedScope.parent;
  }

  /**
   * Check if current scope is a descendant of the given scope
   * (self, child / child of child / ...)
   * @param ancestor The potential ancestor scope
   */
  isDescendantOf(ancestor: Scope | null): boolean {
    if (!Scope.isScope(ancestor)) return false;
    if (this === ancestor) return true;

    // Fast reject via Range
    if (ancestor.range && this.range) {
      if (
        this.range.start < ancestor.range.start ||
        this.range.end > ancestor.range.end
      ) {
        return false;
      }
    }

    // Fallback to scope chain check
    let current: Scope | null = this;
    while (current) {
      if (current === ancestor) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }

  /**
   * Check is the scope is a child of ascendant
   * @param comparedScope Scope to be compared
   * @returns True if there is the child from an ascendant, false otherwise
   */
  hasAscendantContainingTheChild(comparedScope: Scope | null): boolean {
    let ascendant = this._parent;
    if (Scope.isScope(comparedScope)) {
      while (ascendant) {
        if (ascendant.hasChildScope(comparedScope)) {
          return true;
        }
        ascendant = ascendant.parent;
      }
    }
    return false;
  }

  /**
   * Represent the Scope as string
   * @returns Represented by its name
   */
  toString(): string {
    return this.name;
  }

  /**
   * Add inner function name as local variable
   */
  addInnerFunctionVariable(functionName: string) {
    Var.validate(functionName);
    if (!this.hasLocalVariable(functionName)) {
      const functionVariable = varFactory.create(functionName, this);
      this._namedFunctionVars.set(functionName, functionVariable);
      this._vars.set(functionName, functionVariable);
    }
  }

  /**
   * Add parameter as local variable
   */
  addParameter(paramName: string) {
    if (!this.hasLocalVariable(paramName)) {
      const parameterVar = varFactory.create(paramName, this);
      this._params.set(paramName, parameterVar);
      this._paramNames.push(paramName);
      this._vars.set(paramName, parameterVar);
    }
  }

  /**
   * Add local variables with its name
   * @param name Variable name
   */
  addLocalVariable(name: string) {
    if (!this.hasLocalVariable(name)) {
      const variable = varFactory.create(name, this);
      this._vars.set(name, variable);
    }
  }

  /**
   * Add global variable
   * @param name Variable name
   */
  addGlobalVariable(name: string) {
    let currentScope: Scope | null = this;
    while (currentScope.type !== Scope.TYPE_PAGE && currentScope?.parent) {
      currentScope = currentScope.parent;
    }
    if (currentScope.type === Scope.TYPE_PAGE) {
      currentScope.addLocalVariable(name);
    }

    return currentScope.getLocalVariable(name);
  }

  /**
   * Set built-in objects as variables
   */
  setBuiltInObjectVariables() {
    this.builtInObjects.forEach((builtInName) => {
      if (!this.hasLocalVariable(builtInName)) {
        const builtInVar = varFactory.create(builtInName, this);
        this._builtInObjectVars.set(builtInName, builtInVar);
        this._vars.set(builtInName, builtInVar);
      }
    });
  }

  /**
   * Check if the scope is a function scope
   */
  static isFunctionScope(scope: Scope): scope is FunctionScope {
    return scope.type === Scope.TYPE_FUNCTION;
  }

  /**
   * Check if the scope is a page scope
   */
  static isPageScope(scope: Scope): scope is PageScope {
    return scope.type === Scope.TYPE_PAGE;
  }

  /**
   * Check if the scope is a CFG scope
   */
  static isCFGEligibleScope(scope: Scope): boolean {
    return scope.type === Scope.TYPE_FUNCTION || scope.type === Scope.TYPE_PAGE;
  }

  /**
   * Check if the scope is a catch clause scope
   */
  static isCatchClauseScope(scope: Scope): boolean {
    return scope.type === Scope.TYPE_CATCH;
  }

  /**
   * Check if the scope is a function-expresion-name scope
   */
  static isFunctionExpressionNameScope(scope: Scope): boolean {
    return (
      scope.type === Scope.TYPE_FUNCTION && scope.isFunctionExpressionNameScope
    );
  }

  /**
   * Data Methods
   */
  get ast() {
    return this._ast;
  }

  get range() {
    return this._range;
  }

  set range(range) {
    if (Range.isValidValue(range)) {
      this._range = new Range(range!);
    }
  }

  get children() {
    return [...this._children];
  }

  get name(): string {
    return this._parent ? `${this._parent.name}.${this._name}` : this._name;
  }

  get type() {
    return this._type;
  }

  get parent() {
    return this._parent;
  }

  set parent(parent) {
    if (Scope.isValidParent(parent)) {
      this._parent = parent;
    }
  }

  get vars() {
    return new Map(this._vars);
  }

  get params() {
    return new Map(this._params);
  }

  get namedFunctionVars() {
    return new Map(this._namedFunctionVars);
  }

  get builtInObjects() {
    return [...this._builtInObjects];
  }

  get builtInObjectVars() {
    return new Map(this._builtInObjectVars);
  }

  get reachIns() {
    return new Map(this._reachIns);
  }

  get lastReachIns() {
    return new Map(this._lastReachIns);
  }

  get isFunctionExpressionNameScope() {
    return this._isFunctionExpressionNameScope;
  }

  get scopeChain() {
    const chain: Scope[] = [];
    let currentScope: Scope | null = this;
    while (currentScope) {
      chain.push(currentScope);
      currentScope = currentScope.parent;
    }
    return chain;
  }

  // TODO: Need Review
  /**
   * Apply a single reaching definition to this scope
   */
  public setReachingDefinition(
    variableName: string,
    definition: Def,
    overwrite: boolean = true
  ): void {
    if (!overwrite && this._reachIns.has(variableName)) return;
    // TODO: 后续是否要判断变量是否在当前作用域的判断
    if (!this.hasLocalVariable(variableName)) return;
    this._reachIns.set(variableName, definition);
    this._lastReachIns.set(variableName, definition);
  }

  /**
   * Reset all reaching definitions in this scope
   */
  public resetReachingDefinitions(): void {
    this._reachIns.clear();
  }

  /**
   * Check if the variable is defined in current scope
   * (has a reaching definition)
   */
  isVariableDefined(name: string): boolean {
    return this._reachIns.has(name);
  }

  /**
   * Get the defined variable (with reaching definition) in current scope
   */
  getDefinedVariable(name: string): Var | null {
    if (this._reachIns.has(name)) {
      return this.getLocalVariable(name);
    }
    return null;
  }

  /**
   * Get all descendant scopes (children, children of children, ...)
   */
  getAllDescendants(): Scope[] {
    const result: Scope[] = [];

    const visit = (scope: Scope) => {
      for (const child of scope._children) {
        result.push(child);
        visit(child);
      }
    };

    visit(this);
    return result;
  }
}

export default Scope;
