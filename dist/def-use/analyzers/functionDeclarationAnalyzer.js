"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionDeclarationAnalyzer = exports.FunctionDeclarationAnalyzer = void 0;
const walkes_1 = require("../../ast/walkes");
const logger_1 = __importDefault(require("../../utils/logger"));
const defFactory_1 = require("../factories/defFactory");
const utils_1 = require("../utils/utils");
class FunctionDeclarationAnalyzer {
    analyze(scope) {
        if (!(scope === null || scope === void 0 ? void 0 : scope.graph))
            return;
        const entryNode = scope.graph.entryNode;
        if (!entryNode.astNode) {
            logger_1.default.warn(`Scope ${scope === null || scope === void 0 ? void 0 : scope.name} entry node does not have an AST node`);
            return;
        }
        const ast = scope.ast;
        if (!ast) {
            logger_1.default.warn(`Scope ${scope === null || scope === void 0 ? void 0 : scope.name} does not have an AST`);
            return;
        }
        const handleFunction = (node) => {
            var _a;
            const functionName = (_a = node.id) === null || _a === void 0 ? void 0 : _a.name;
            if (!functionName)
                return;
            const funVar = scope.namedFunctionVars.get(functionName);
            if (!funVar)
                return;
            const functionDef = defFactory_1.defFactory.createFunctionDef(entryNode, node);
            // [LastReachIns]
            (0, utils_1.setReachingDef)(funVar, functionDef);
        };
        (0, walkes_1.traverseSimple)(ast, {
            FunctionDeclaration: handleFunction,
            FunctionExpression: handleFunction,
        });
    }
}
exports.FunctionDeclarationAnalyzer = FunctionDeclarationAnalyzer;
exports.functionDeclarationAnalyzer = new FunctionDeclarationAnalyzer();
