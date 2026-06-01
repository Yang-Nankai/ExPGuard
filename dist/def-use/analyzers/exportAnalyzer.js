"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportAnalyzer = exports.ExportAnalyzer = void 0;
const walkes_1 = require("../../ast/walkes");
const scope_1 = __importDefault(require("../../scope/scope"));
const scopeCtrl_1 = require("../../scope/scopeCtrl");
const expressionTypeHandler_1 = require("../handlers/expressionTypeHandler");
const def_1 = __importDefault(require("../types/def"));
const utils_1 = require("../utils/utils");
/**
 * ExportAnalyzer
 */
class ExportAnalyzer {
    analyze(scope, scopeTree) {
        if (!(scope === null || scope === void 0 ? void 0 : scope.graph))
            return;
        const script = scopeTree.script;
        // Export only applies to the top-level (module) scope
        if (!scope_1.default.isPageScope(scope))
            return;
        const ast = scope.ast;
        if (!ast)
            return;
        const exitNode = scope.graph.exitNode;
        const handleExportDeclaration = (decl) => {
            var _a, _b;
            if (!decl)
                return;
            // export const a = ...
            if (decl.type === "VariableDeclaration") {
                for (const d of (_a = decl.declarations) !== null && _a !== void 0 ? _a : []) {
                    if (((_b = d === null || d === void 0 ? void 0 : d.id) === null || _b === void 0 ? void 0 : _b.type) !== "Identifier")
                        continue;
                    const def = (0, utils_1.lookupMatchingDef)(d.id.name, scope);
                    if (def)
                        scope.addExport(d.id.name, def);
                }
            }
            // export function / class
            if ((decl.type === "FunctionDeclaration" ||
                decl.type === "ClassDeclaration") &&
                decl.id) {
                const def = (0, utils_1.lookupMatchingDef)(decl.id.name, scope);
                // Make sure it's a function def
                if (def && def_1.default.isFunctionDef(def))
                    scope.addExport(decl.id.name, def);
            }
        };
        const handleExportNamed = (node) => {
            var _a, _b, _c, _d, _e;
            if (!node)
                return;
            // export { x } from 'mod'
            if (node.source) {
                const sourceKey = script.resolveRelativeScriptKey(node.source.value);
                if (!sourceKey)
                    return;
                const sourcePageTree = scopeCtrl_1.scopeController.getPageScopeTreeByKey(sourceKey);
                if (!sourcePageTree)
                    return;
                const sourceScope = sourcePageTree.root;
                if (!sourceScope || !scope_1.default.isPageScope(sourceScope))
                    return;
                for (const spec of (_a = node.specifiers) !== null && _a !== void 0 ? _a : []) {
                    const localName = (_b = this.getSpecifierName(spec.local)) !== null && _b !== void 0 ? _b : this.getSpecifierName(spec.exported);
                    const exportedName = (_c = this.getSpecifierName(spec.exported)) !== null && _c !== void 0 ? _c : localName;
                    if (!localName || !exportedName)
                        continue;
                    const def = sourceScope.exports.get(localName);
                    if (def)
                        scope.addExport(exportedName, def);
                }
                return;
            }
            // export const / function / class / var / ...
            if (node.declaration) {
                handleExportDeclaration(node.declaration);
                return;
            }
            // export { a as b }
            for (const spec of (_d = node.specifiers) !== null && _d !== void 0 ? _d : []) {
                const localName = this.getSpecifierName(spec.local);
                const exportedName = (_e = this.getSpecifierName(spec.exported)) !== null && _e !== void 0 ? _e : localName;
                if (!localName || !exportedName)
                    continue;
                const def = (0, utils_1.lookupMatchingDef)(localName, scope);
                if (def)
                    scope.addExport(exportedName, def);
            }
        };
        const handleExportDefault = (node) => {
            if (!(node === null || node === void 0 ? void 0 : node.declaration))
                return;
            const decl = node.declaration;
            const defaultName = "default";
            // export default Identifier
            if (decl.type === "Identifier") {
                const def = (0, utils_1.lookupMatchingDef)(decl.name, scope);
                if (def)
                    scope.addExport(defaultName, def);
                return;
            }
            // export default function / class with name
            if ((decl.type === "FunctionDeclaration" ||
                decl.type === "ClassDeclaration") &&
                decl.id) {
                const def = (0, utils_1.lookupMatchingDef)(decl.id.name, scope);
                if (def)
                    scope.addExport(defaultName, def);
                return;
            }
            // export default expression
            const def = (0, expressionTypeHandler_1.expressionTypeHandler)(exitNode, decl);
            if (def)
                scope.addExport(defaultName, def);
        };
        const handleExportAll = (node) => {
            if (!(node === null || node === void 0 ? void 0 : node.source))
                return;
            // const sourceKey = resolveRelativeScriptKey(key, node.source.value);
            const sourceKey = script.resolveRelativeScriptKey(node.source.value);
            if (!sourceKey)
                return;
            const sourcePageTree = scopeCtrl_1.scopeController.getPageScopeTreeByKey(sourceKey);
            if (!sourcePageTree)
                return;
            const sourceScope = sourcePageTree.root;
            if (!sourceScope || !scope_1.default.isPageScope(sourceScope))
                return;
            for (const [name, def] of sourceScope.exports) {
                scope.addExport(name, def);
            }
        };
        (0, walkes_1.traverseSimple)(ast, {
            ExportNamedDeclaration: handleExportNamed,
            ExportDefaultDeclaration: handleExportDefault,
            ExportAllDeclaration: handleExportAll,
        });
    }
    // Helper Functions
    getSpecifierName(node) {
        var _a;
        if (!node)
            return;
        if (node.type === "Identifier")
            return node.name;
        return (_a = node.name) !== null && _a !== void 0 ? _a : node.value;
    }
}
exports.ExportAnalyzer = ExportAnalyzer;
exports.exportAnalyzer = new ExportAnalyzer();
