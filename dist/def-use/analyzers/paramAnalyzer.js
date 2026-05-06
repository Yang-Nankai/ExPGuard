"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramAnalyzer = exports.ParamAnalyzer = void 0;
const patternVisitor_1 = require("../../ast/patternVisitor");
const logger_1 = __importDefault(require("../../utils/logger"));
const set_1 = __importDefault(require("../../utils/set"));
const defFactory_1 = require("../factories/defFactory");
const varDefFactory_1 = require("../factories/varDefFactory");
class ParamAnalyzer {
    analyze(model) {
        if (!(model === null || model === void 0 ? void 0 : model.graph))
            return;
        const scope = model.mainlyRelatedScope;
        const entryNode = model.graph.entryNode;
        if (!scope || !entryNode.astNode) {
            logger_1.default.warn(`Scope ${scope === null || scope === void 0 ? void 0 : scope.name} entry node does not have an AST node`);
            return;
        }
        const ast = scope.ast;
        if (!ast) {
            logger_1.default.warn(`Scope ${scope === null || scope === void 0 ? void 0 : scope.name} does not have an AST`);
            return;
        }
        const varDefs = this.buildParamVarDefs(scope, ast, entryNode);
        entryNode.generate = set_1.default.union(entryNode.generate, varDefs);
    }
    /**
     * Extract parameter variable definitions for a function scope.
     */
    buildParamVarDefs(scope, node, entryNode) {
        var _a;
        const varDefs = new set_1.default();
        if (!((_a = node.params) === null || _a === void 0 ? void 0 : _a.length))
            return varDefs;
        for (const param of node.params) {
            const paramNames = (0, patternVisitor_1.extractPatternNames)(param);
            for (const paramName of paramNames) {
                const definedVar = scope.getVariable(paramName);
                if (!definedVar)
                    continue;
                const def = varDefFactory_1.varDefFactory.create(definedVar, defFactory_1.defFactory.createUndefinedDef(entryNode));
                varDefs.add(def);
            }
        }
        return varDefs;
    }
}
exports.ParamAnalyzer = ParamAnalyzer;
exports.paramAnalyzer = new ParamAnalyzer();
