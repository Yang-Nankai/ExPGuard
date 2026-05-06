"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localVariableAnalyzer = exports.LocalVariableAnalyzer = void 0;
const patternVisitor_1 = require("../../ast/patternVisitor");
const walkes_1 = require("../../ast/walkes");
const logger_1 = __importDefault(require("../../utils/logger"));
const set_1 = __importDefault(require("../../utils/set"));
const defFactory_1 = require("../factories/defFactory");
const varDefFactory_1 = require("../factories/varDefFactory");
class LocalVariableAnalyzer {
    analyze(model) {
        if (!(model === null || model === void 0 ? void 0 : model.graph))
            return;
        const scope = model.mainlyRelatedScope;
        const entryNode = model.graph.entryNode;
        const varDefs = new set_1.default();
        if (!scope || !entryNode.astNode) {
            logger_1.default.warn(`Scope ${scope === null || scope === void 0 ? void 0 : scope.name} entry node does not have an AST node`);
            return;
        }
        const ast = scope.ast;
        if (!ast) {
            logger_1.default.warn(`Scope ${scope === null || scope === void 0 ? void 0 : scope.name} does not have an AST`);
            return;
        }
        const hanleDeclaration = (node) => {
            for (const declarationNode of node.declarations) {
                const varNames = (0, patternVisitor_1.extractPatternNames)(declarationNode.id);
                for (const varName of varNames) {
                    const variableName = scope.getLocalVariable(varName);
                    if (!!variableName &&
                        !scope.hasNamedFunction(variableName.name) &&
                        !scope.hasBuiltInObject(variableName.name)) {
                        const variableDef = defFactory_1.defFactory.createUndefinedDef(entryNode);
                        const varDef = varDefFactory_1.varDefFactory.create(variableName, variableDef);
                        varDefs.add(varDef);
                    }
                }
            }
        };
        (0, walkes_1.traverseSimple)(ast, {
            VariableDeclaration: hanleDeclaration,
        });
        entryNode.generate = set_1.default.union(entryNode.generate, varDefs);
    }
}
exports.LocalVariableAnalyzer = LocalVariableAnalyzer;
exports.localVariableAnalyzer = new LocalVariableAnalyzer();
