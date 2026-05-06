"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scope_1 = __importDefault(require("./scope"));
const scopeFactory_1 = require("./scopeFactory");
const walkes_1 = __importDefault(require("../ast/walkes"));
const range_1 = require("../def-use/types/range");
const rangeFactory_1 = require("../def-use/factories/rangeFactory");
const logger_1 = __importDefault(require("../utils/logger"));
const patternVisitor_1 = require("../ast/patternVisitor");
/**
 * ScopeTree inside a page
 */
class ScopeTree {
    constructor(script) {
        this._scopesSortedByStart = [];
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
    _sortScopesForRangeLookup() {
        // Sort scopes by their start position
        this._scopesSortedByStart = [...this._scopes].sort((a, b) => {
            if (!a.range || !b.range)
                return 0;
            return a.range.start - b.range.start;
        });
    }
    /**
     * The currently active scope (top of the scope stack) or null if none.
     */
    get currentScope() {
        return this._scopeStack.length > 0
            ? this._scopeStack[this._scopeStack.length - 1]
            : this._root;
    }
    /**
     * Enter a child scope: wire it into the parent (if any), add to registry, and push
     */
    enterScope(scope) {
        const parent = this.currentScope;
        if (parent)
            parent.addChildScope(scope);
        this.addScope(scope);
        this._scopeStack.push(scope);
    }
    /**
     * Exit the current scope. If the stack is empty, this is a no-op (defensive).
     */
    exitScope() {
        if (this._scopeStack.length === 0)
            return this._root;
        this._scopeStack.pop();
    }
    /**
     * Add a Scope to internal registries.
     * Emits warnings for name/range collisions but still keeps the first-come mapping.
     */
    addScope(scope) {
        if (!scope_1.default.isScope(scope))
            return;
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
    _registerScopeByName(scope) {
        if (this._mapFromNameToScope.has(scope.name)) {
            logger_1.default.warn(`Scope name conflict detected: ${scope.name}`);
        }
        else {
            this._mapFromNameToScope.set(scope.name, scope);
        }
    }
    /**
     * Register scope by range with conflict detection
     */
    _registerScopeByRange(scope) {
        if (!scope.range)
            return;
        const key = scope.range.toString();
        if (this._mapFromRangeToScope.has(key)) {
            logger_1.default.warn(`Scope range conflict detected: ${key}`);
        }
        else {
            this._mapFromRangeToScope.set(key, scope);
        }
    }
    /**
     * Setup variables for different scope types
     */
    _setupScopeVariables(scope) {
        scope.setBuiltInObjectVariables();
        if (scope_1.default.isFunctionScope(scope) || scope_1.default.isCatchClauseScope(scope)) {
            this._setupParameters(scope);
        }
        this._setupLocalVariables(scope);
    }
    /**
     * Setup parameters for function and catch clause scopes
     */
    _setupParameters(scope) {
        const node = scope.ast;
        const params = scope_1.default.isCatchClauseScope(scope)
            ? [node.param]
            : node.params || [];
        for (const param of params) {
            const names = (0, patternVisitor_1.extractPatternNames)(param);
            names.forEach(name => scope.addParameter(name));
        }
    }
    /**
     * Setup local variables for the scope
     */
    _setupLocalVariables(scope) {
        const ast = scope.ast;
        if (!ast)
            return;
        (0, walkes_1.default)(ast, {
            VariableDeclaration: (node, recurse) => {
                node.declarations.forEach((declarator) => recurse(declarator));
            },
            VariableDeclarator: (node, recurse) => {
                const names = (0, patternVisitor_1.extractPatternNames)(node.id);
                names.forEach(name => scope.addLocalVariable(name));
                recurse(node.init);
            },
            ClassDeclaration: (node, recurse) => {
                const className = node.id.name;
                scope.addLocalVariable(className);
            }
        });
    }
    /**
     * Initialize the tree for a new AST: create a page/global scope and reset registries.
     * Ensures the scope stack is empty and root is set.
     */
    initialization(ast) {
        // reset state
        this._scopes = [];
        this._mapFromRangeToScope.clear();
        this._mapFromNameToScope.clear();
        this._scopeStack = [];
        const pageScope = scopeFactory_1.scopeFactory.createPageScope(ast);
        this._root = pageScope;
        this.addScope(pageScope);
        // root is also the initial active scope for many analyses
        this._scopeStack.push(pageScope);
    }
    static isScopeTree(obj) {
        return obj instanceof ScopeTree;
    }
    /**
     * Build the ScopeTree from the provided AST. Walks the AST and creates scopes
     * for constructs that introduce lexical scope in JavaScript.
     */
    buildScopeTree(ast) {
        const self = this;
        this.initialization(ast);
        // Helper: iterate over program body
        function programHandler(node, recurse) {
            for (const elem of node.body)
                recurse(elem);
        }
        // Helper: visit function body block safely
        function handleFunctionBody(node, recurse) {
            for (const astNode of node.body)
                recurse(astNode);
        }
        function catchHandler(node, recurse) {
            const catchScope = scopeFactory_1.scopeFactory.createCatchScope(node);
            self.enterScope(catchScope);
            try {
                recurse(node.body);
            }
            finally {
                self.exitScope();
            }
        }
        function forLikeHandler(node, recurse) {
            var _a, _b;
            const shouldCreateForScope = (((_a = node.init) === null || _a === void 0 ? void 0 : _a.type) === "VariableDeclaration" &&
                node.init.kind !== "var") ||
                (((_b = node.left) === null || _b === void 0 ? void 0 : _b.type) === "VariableDeclaration" && node.left.kind !== "var");
            if (shouldCreateForScope) {
                const forScope = scopeFactory_1.scopeFactory.createForScope(node);
                self.enterScope(forScope);
            }
            try {
                // Recurse into init, left, right, test, and update nodes if they exist
                if (node.init)
                    recurse(node.init);
                if (node.left)
                    recurse(node.left);
                if (node.right)
                    recurse(node.right);
                if (node.test)
                    recurse(node.test);
                if (node.update)
                    recurse(node.update);
                recurse(node.body);
            }
            finally {
                if (shouldCreateForScope) {
                    self.exitScope();
                }
            }
        }
        function switchHandler(node, recurse) {
            recurse(node.discriminant);
            const switchScope = scopeFactory_1.scopeFactory.createSwitchScope(node);
            self.enterScope(switchScope);
            try {
                for (const caseClause of node.cases)
                    recurse(caseClause);
            }
            finally {
                self.exitScope();
            }
        }
        function withHandler(node, recurse) {
            // with introduces dynamic scope-like semantics; still create a dedicated scope
            recurse(node.object);
            const withScope = scopeFactory_1.scopeFactory.createWithScope(node);
            self.enterScope(withScope);
            try {
                recurse(node.body);
            }
            finally {
                self.exitScope();
            }
        }
        function blockHandler(node, recurse) {
            // create a block scope for let/const
            const blockScope = scopeFactory_1.scopeFactory.createBlockScope(node);
            self.enterScope(blockScope);
            try {
                for (const stmt of node.body)
                    recurse(stmt);
            }
            finally {
                self.exitScope();
            }
        }
        function functionHandler(node, recurse) {
            var _a, _b, _c, _d;
            let funcName = (_b = (_a = node.id) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null;
            const isFunctionExpressionName = node.type === "FunctionExpression" && !!funcName;
            if (node.type === "FunctionDeclaration" && funcName) {
                // funcName must not be null, avoid `export default function(){}`
                // Add FunctionDeclaration to local variables of the current scope
                (_c = self.currentScope) === null || _c === void 0 ? void 0 : _c.addInnerFunctionVariable(funcName);
            }
            // Create the function scope and enter it first.
            const funcScope = scopeFactory_1.scopeFactory.createFunctionScope(node, funcName, isFunctionExpressionName);
            self.enterScope(funcScope);
            // Add inner function variable if it's a function expression name scope
            if (isFunctionExpressionName) {
                // Scope are limited to the function body itself
                funcScope.addInnerFunctionVariable(funcName);
            }
            try {
                // params live in the function scope (or in param scope depending on implementation).
                if (Array.isArray(node.params)) {
                    node.params.forEach((p) => recurse(p));
                }
                // Body may be BlockStatement (normal) or expression (arrow concise)
                if (((_d = node.body) === null || _d === void 0 ? void 0 : _d.type) === "BlockStatement") {
                    handleFunctionBody(node.body, recurse);
                }
                else if (node.body) {
                    recurse(node.body);
                }
            }
            finally {
                self.exitScope();
            }
        }
        function classHandler(node, recurse) {
            var _a;
            if (node.superClass)
                recurse(node.superClass);
            const classScope = scopeFactory_1.scopeFactory.createClassScope(node, (_a = node.id) === null || _a === void 0 ? void 0 : _a.name);
            self.enterScope(classScope);
            try {
                recurse(node.body);
            }
            finally {
                self.exitScope();
            }
        }
        function propertyHandler(node, recurse) {
            // computed keys should be visited
            if (node.computed)
                recurse(node.key);
            const isMethodDefinition = node.type === "MethodDefinition" || node.method === true;
            // let previous = false;
            if (isMethodDefinition) {
                let methodName = null;
                if (node.key.type === "Identifier") {
                    methodName = node.key.name;
                }
                else if (node.key.type === "Literal") {
                    methodName = String(node.key.value);
                }
                else if (node.key.type === "PrivateIdentifier") {
                    methodName = "#" + node.key.name;
                }
            }
            // value may be a function (method) or other expression
            recurse(node.value);
        }
        // generic MemberExpression handler
        const memberExprHandler = (node, recurse) => {
            recurse(node.object);
            if (node.computed)
                recurse(node.property);
        };
        (0, walkes_1.default)(ast, {
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
            LabeledStatement: function (node, recurse) {
                recurse(node.body);
            },
        });
        // after the walk, ensure the stack is balanced: pop remaining scopes until only root remains
        // (this is defensive - normally stack should only contain the root at this point)
        while (self._scopeStack.length > 1)
            this._scopeStack.pop();
        // Sort scopes by their start position for optimized range lookup
        this._sortScopesForRangeLookup();
    }
    /**
     * method for getting a function scope (Scope type) by comparing its range
     * @param range Value for a Range
     */
    getScopeByRange(range) {
        var _a, _b;
        if (range_1.Range.isRange(range)) {
            return (_a = this._mapFromRangeToScope.get(range.toString())) !== null && _a !== void 0 ? _a : null;
        }
        else if (Array.isArray(range)) {
            return (_b = this._mapFromRangeToScope.get(range.toString())) !== null && _b !== void 0 ? _b : null;
        }
        else {
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
    getNodeScopeByRange(range) {
        if (!range_1.Range.isValidValue(range))
            return null;
        const rangeObj = rangeFactory_1.rangeFactory.create(range);
        let closestScope = null;
        let minSize = Infinity;
        for (const scope of this._scopes) {
            const scopeRange = scope.range;
            if (!scopeRange)
                continue;
            const isContaining = scopeRange.start <= rangeObj.start && scopeRange.end >= rangeObj.end;
            const isEqual = scopeRange.start === rangeObj.start && scopeRange.end === rangeObj.end;
            if (isContaining && !isEqual) {
                const currentSize = scopeRange.end - scopeRange.start;
                if (currentSize < minSize ||
                    (currentSize === minSize &&
                        closestScope &&
                        scopeRange.start > closestScope.range.start)) {
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
    getNodeScopeByRangeOptimized(range) {
        if (!range_1.Range.isValidValue(range))
            return null;
        const rangeObj = rangeFactory_1.rangeFactory.create(range);
        // First try exact match (fastest path)
        const exactMatch = this._mapFromRangeToScope.get(rangeObj.toString());
        if (exactMatch) {
            return exactMatch;
        }
        if (this._scopesSortedByStart.length === 0) {
            this._sortScopesForRangeLookup();
        }
        let closestScope = null;
        let minSize = Infinity;
        // Optimization: only search scopes that could contain the target range
        for (let i = this._scopesSortedByStart.length - 1; i >= 0; i--) {
            const scope = this._scopesSortedByStart[i];
            const scopeRange = scope.range;
            if (!scopeRange)
                continue;
            // Quick fail conditions
            if (scopeRange.start > rangeObj.start)
                continue;
            if (scopeRange.end < rangeObj.end)
                continue;
            // Exclude exact match cases
            if (scopeRange.start === rangeObj.start &&
                scopeRange.end === rangeObj.end) {
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
    _insertScopeSorted(scope) {
        if (!scope.range)
            return;
        // Insert to _scopesSortedByStart
        let insertIndex = this._scopesSortedByStart.findIndex((s) => !s.range || s.range.start > scope.range.start);
        if (insertIndex === -1) {
            this._scopesSortedByStart.push(scope);
        }
        else {
            this._scopesSortedByStart.splice(insertIndex, 0, scope);
        }
    }
    /**
     * Method for getting a function scope (Scope type) by comparing its scope name
     * @param scopeName Name of the searched scope
     */
    getScopeByName(scopeName) {
        var _a;
        return typeof scopeName === "string"
            ? (_a = this._mapFromNameToScope.get(scopeName)) !== null && _a !== void 0 ? _a : null
            : null;
    }
    /**
     * Method for getting a function scope (Scope type) by comparing its scope name
     * @param scopeName Name of the searched scope
     */
    isRelatedToTheScope(searchKey) {
        if (scope_1.default.isScope(searchKey)) {
            return this._scopes.includes(searchKey);
        }
        if (typeof searchKey === "string") {
            return this._mapFromNameToScope.has(searchKey);
        }
        if (range_1.Range.isValidValue(searchKey)) {
            const range = rangeFactory_1.rangeFactory.create(searchKey);
            return this._mapFromRangeToScope.has(range.toString());
        }
        return false;
    }
    /**
     * Represent the ScopeTree as a string
     * @returns String representation of the ScopeTree
     */
    toString() {
        return this._root ? this.recursivelyGetScopeText(this._root, 0) : "";
    }
    /**
     * Recursively get the representation text of a function scope
     */
    recursivelyGetScopeText(currentScope, level) {
        const currentLevel = level !== null && level !== void 0 ? level : 0;
        let representation = "";
        if (scope_1.default.isScope(currentScope)) {
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
    getScopeRepresentation(scope, level) {
        const indentBasis = " ";
        const indent = indentBasis.repeat(level);
        return `${indent}+-${scope}`;
    }
    /**
     * Get all scopes of a specific type
     */
    getScopesByType(type) {
        return this._scopes.filter((scope) => scope.type === type);
    }
    /**
     * Get all function scopes
     */
    getFunctionScopes() {
        return this.getScopesByType(scope_1.default.TYPE_FUNCTION);
    }
    /**
     * Get model scope
     */
    getCFGEligibleScopes() {
        return this.scopes.filter((scope) => scope_1.default.isCFGEligibleScope(scope));
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
exports.default = ScopeTree;
