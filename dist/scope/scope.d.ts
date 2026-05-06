import { Node } from "acorn";
import { Range } from "../def-use/types/range";
import Var from "../def-use/types/var";
import Def from "../def-use/types/def";
import PageScope from "./pageScope";
import FunctionScope from "./functionScope";
/**
 * Scope
 */
declare class Scope {
    private readonly _ast;
    private readonly _name;
    private readonly _type;
    private _parent;
    private _range;
    private _vars;
    private _params;
    private _paramNames;
    private _namedFunctionVars;
    private _builtInObjectVars;
    private _children;
    private _reachIns;
    private _lastReachIns;
    private _builtInObjects;
    protected _isFunctionExpressionNameScope: boolean;
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
    static readonly VALID_TYPES: string[];
    constructor(ast: Node | null, name: string, type: string, parent: Scope | null);
    /**
     * Check the parent scope is valid or not (could be null/undefined)
     * @param parentScope
     * @returns True if the parent scope  is valid or empty
     */
    static isValidParent(parent: any): boolean;
    /**
     * Check the object is a Scope or not
     * @param obj An object to be checked
     * @returns True if the obj is a Scope object, false otherwise
     */
    static isScope(obj: any): obj is Scope;
    /**
     * Check the scope name is valid or not
     * @param name Name of the scope
     * @returns True if it's valid, false otherwise
     */
    static isValidName(name: string): boolean;
    /**
     * Check if the type is a valid scope type
     * @param type Type to be checked
     * @returns True if the type is valid, false otherwise
     */
    static isValidType(type: string): boolean;
    /**
     * Validate the initial value of the Scope is valid or not
     * @param ast AST root of the scope
     * @param name Name of the scope
     * @param type Type of the scope
     * @param parent Parent scope
     * @param [msg] Custom error message
     * @throws When a value is invalid
     */
    static validate(ast: Node | null, name: string, type: string, parent: Scope | null, msg?: string): void;
    /**
     * alidate the object is a Scope or not
     * @param obj An object to be validated
     * @param [msg] Custom error message
     * @throws When the object is not a Scope
     */
    static validateType(obj: any, msg?: string): void;
    /**
     * Check if the variable is declared in this scope with the same name
     * @param name Name of the finding variable
     * @returns True if it's found, false otherwise
     */
    hasLocalVariable(name: string): boolean;
    /**
     * Check the variable is available in current scope
     * @param name Name of the finding variable
     * @returns True if it's found, false otherwise
     */
    hasVariable(name: string): boolean;
    /**
     * Check if there is a named function with the specified name
     * @param name
     * @returns True, if there is one; false, otherwise
     */
    hasNamedFunction(name: string): boolean;
    /**
     * Check if there is a built-in object with the specified name
     * @param name
     * @returns True, if there is one; false, otherwise
     */
    hasBuiltInObject(name: string): boolean;
    /**
     * Get the local variable with its name
     * @param name Name of the finding variable
     * @returns Returns found variable or null value
     */
    getLocalVariable(name: string): Var | null;
    /**
     * Get the params
     */
    getParamVariable(name: string): Var | null;
    /**
     * Get available variable with its name (recursive to parent scopes)
     * @param name Name of the finding variable
     * @returns Found variable, or null value
     */
    getVariable(name: string): Var | null;
    /**
     * Get param name with parameter index
     * @param index Index of finding parameter
     * @returns If found, returns the parameter's name, otherwise null
     */
    getParamNameWithIndex(index: number): string | null;
    /**
     * Add a child to this Scope
     * @param child Child scope
     */
    addChildScope(child: Scope | null): void;
    /**
     * Check if the scope is a child of current scope
     * @param {Scope} scope A scope to be checked
     * @returns {boolean} True if it is, false otherwise
     */
    hasChildScope(scope: Scope): boolean;
    /**
     * Check the scope has the same parent as this scope or not
     * @param comparedScope Scope to be compared
     * @returns True if it's the same, false otherwise
     */
    isSiblingOf(comparedScope: Scope): boolean;
    /**
     * Check if current scope is a descendant of the given scope
     * (self, child / child of child / ...)
     * @param ancestor The potential ancestor scope
     */
    isDescendantOf(ancestor: Scope | null): boolean;
    /**
     * Check is the scope is a child of ascendant
     * @param comparedScope Scope to be compared
     * @returns True if there is the child from an ascendant, false otherwise
     */
    hasAscendantContainingTheChild(comparedScope: Scope | null): boolean;
    /**
     * Represent the Scope as string
     * @returns Represented by its name
     */
    toString(): string;
    /**
     * Add inner function name as local variable
     */
    addInnerFunctionVariable(functionName: string): void;
    /**
     * Add parameter as local variable
     */
    addParameter(paramName: string): void;
    /**
     * Add local variables with its name
     * @param name Variable name
     */
    addLocalVariable(name: string): void;
    /**
     * Add global variable
     * @param name Variable name
     */
    addGlobalVariable(name: string): Var | null;
    /**
     * Set built-in objects as variables
     */
    setBuiltInObjectVariables(): void;
    /**
     * Check if the scope is a function scope
     */
    static isFunctionScope(scope: Scope): scope is FunctionScope;
    /**
     * Check if the scope is a page scope
     */
    static isPageScope(scope: Scope): scope is PageScope;
    /**
     * Check if the scope is a CFG scope
     */
    static isCFGEligibleScope(scope: Scope): boolean;
    /**
     * Check if the scope is a catch clause scope
     */
    static isCatchClauseScope(scope: Scope): boolean;
    /**
     * Check if the scope is a function-expresion-name scope
     */
    static isFunctionExpressionNameScope(scope: Scope): boolean;
    /**
     * Data Methods
     */
    get ast(): Node | null;
    get range(): Range | null;
    set range(range: Range | null);
    get children(): Scope[];
    get name(): string;
    get type(): string;
    get parent(): Scope | null;
    set parent(parent: Scope | null);
    get vars(): Map<string, Var>;
    get params(): Map<string, Var>;
    get namedFunctionVars(): Map<string, Var>;
    get builtInObjects(): string[];
    get builtInObjectVars(): Map<string, Var>;
    get reachIns(): Map<string, Def>;
    get lastReachIns(): Map<string, Def>;
    get isFunctionExpressionNameScope(): boolean;
    get scopeChain(): Scope[];
    /**
     * Apply a single reaching definition to this scope
     */
    setReachingDefinition(variableName: string, definition: Def, overwrite?: boolean): void;
    /**
     * Reset all reaching definitions in this scope
     */
    resetReachingDefinitions(): void;
    /**
     * Check if the variable is defined in current scope
     * (has a reaching definition)
     */
    isVariableDefined(name: string): boolean;
    /**
     * Get the defined variable (with reaching definition) in current scope
     */
    getDefinedVariable(name: string): Var | null;
    /**
     * Get all descendant scopes (children, children of children, ...)
     */
    getAllDescendants(): Scope[];
}
export default Scope;
