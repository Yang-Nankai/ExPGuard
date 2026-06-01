"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importAnalyzer = exports.ImportAnalyzer = void 0;
const walkes_1 = require("../../ast/walkes");
const scope_1 = __importDefault(require("../../scope/scope"));
const scopeCtrl_1 = require("../../scope/scopeCtrl");
const defFactory_1 = require("../factories/defFactory");
const scriptUsageTracker_1 = require("../../extension/scriptUsageTracker");
/**
 * ImportAnalyzer
 *
 * Resolve imports and bind them into PageScope.imports:
 *   localName -> exported Def
 */
class ImportAnalyzer {
    analyze(scope, scopeTree) {
        if (!(scope === null || scope === void 0 ? void 0 : scope.graph))
            return;
        if (!scope_1.default.isPageScope(scope))
            return;
        const entryNode = scope.graph.entryNode;
        const ast = scope.ast;
        if (!ast)
            return;
        const script = scopeTree.script;
        /**
         * Resolve exports from source module
         */
        const resolveSourceExports = (source) => {
            const ctx = this.resolveSourcePageContext(script, source);
            if (!ctx || !scope_1.default.isPageScope(ctx.rootScope))
                return null;
            return ctx.rootScope.exports;
        };
        const handleImportDeclaration = (node) => {
            var _a, _b;
            const source = (_a = node === null || node === void 0 ? void 0 : node.source) === null || _a === void 0 ? void 0 : _a.value;
            if (typeof source !== "string")
                return;
            scriptUsageTracker_1.scriptUsageTracker.markReferencedScript(script, source);
            const exports = resolveSourceExports(source);
            if (!exports)
                return;
            // import "mod"; (side-effect only)
            if (!((_b = node.specifiers) === null || _b === void 0 ? void 0 : _b.length))
                return;
            for (const spec of node.specifiers) {
                switch (spec.type) {
                    /**
                     * import foo from "mod"
                     */
                    case "ImportDefaultSpecifier": {
                        const def = exports.get("default");
                        if (def) {
                            scope.addImport(spec.local.name, def);
                        }
                        break;
                    }
                    /**
                     * import * as ns from "mod"
                     * create objectDef
                     */
                    case "ImportNamespaceSpecifier": {
                        const nsObjDef = defFactory_1.defFactory.createObjectDef(entryNode);
                        for (const [name, def] of exports) {
                            nsObjDef.setProperty(name, def);
                        }
                        // namespace bound to localName
                        scope.addImport(spec.local.name, nsObjDef);
                        break;
                    }
                    /**
                     * import { a as b } from "mod"
                     */
                    case "ImportSpecifier": {
                        const importedName = spec.imported.name;
                        const def = exports.get(importedName);
                        if (def) {
                            scope.addImport(spec.local.name, def);
                        }
                        break;
                    }
                }
            }
        };
        const handleImportScriptsCall = (node) => {
            var _a;
            if (!this.isImportScriptsCall(node))
                return;
            for (const arg of (_a = node.arguments) !== null && _a !== void 0 ? _a : []) {
                if (arg.type !== "Literal" || typeof arg.value !== "string")
                    continue;
                scriptUsageTracker_1.scriptUsageTracker.markReferencedScript(script, arg.value);
                const ctx = this.resolveSourcePageContext(script, arg.value);
                if (!ctx || !scope_1.default.isPageScope(ctx.rootScope))
                    continue;
                const lastReachIns = ctx.rootScope.reachIns;
                for (const [name, def] of lastReachIns !== null && lastReachIns !== void 0 ? lastReachIns : []) {
                    scope.addImport(name, def);
                }
            }
        };
        const mergeFramePredecessorGlobals = () => {
            const predecessorKeys = scriptUsageTracker_1.scriptUsageTracker.getFramePredecessorScriptKeys(script.key);
            for (const predecessorKey of predecessorKeys) {
                const ctx = scopeCtrl_1.scopeController.getPageScopeTreeByKey(predecessorKey);
                if (!(ctx === null || ctx === void 0 ? void 0 : ctx.root) || !scope_1.default.isPageScope(ctx.root))
                    continue;
                const predecessorReachIns = ctx.root.lastReachIns;
                for (const [name, def] of predecessorReachIns) {
                    scope.addImport(name, def);
                }
            }
        };
        (0, walkes_1.traverseSimple)(ast, {
            ImportDeclaration: handleImportDeclaration,
            CallExpression: handleImportScriptsCall,
        });
        // Content-script/background script lists are execution-ordered by frame
        // scenario, so merge globals from earlier scripts that share a frame.
        mergeFramePredecessorGlobals();
    }
    resolveSourcePageContext(script, source) {
        const sourceScript = script.resolveRelativeScriptKey(source);
        if (!sourceScript)
            return null;
        const pageTree = scopeCtrl_1.scopeController.getPageScopeTreeByKey(sourceScript);
        if (!(pageTree === null || pageTree === void 0 ? void 0 : pageTree.root))
            return null;
        return {
            pageTree,
            rootScope: pageTree.root,
        };
    }
    isImportScriptsCall(node) {
        var _a;
        return ((node === null || node === void 0 ? void 0 : node.type) === "CallExpression" &&
            ((_a = node.callee) === null || _a === void 0 ? void 0 : _a.type) === "Identifier" &&
            node.callee.name === "importScripts");
    }
}
exports.ImportAnalyzer = ImportAnalyzer;
exports.importAnalyzer = new ImportAnalyzer();
