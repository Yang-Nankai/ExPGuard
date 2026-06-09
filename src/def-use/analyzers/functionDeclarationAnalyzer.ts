import { traverseSimple } from "../../ast/walkes";
import Scope from "../../scope/scope";
import logger from "../../utils/logger";
import { defFactory } from "../factories/defFactory";
import { setReachingDef } from "../utils/utils";

export class FunctionDeclarationAnalyzer {
  analyze(scope: Scope) {
    if (!scope?.graph) return;

    const entryNode = scope.graph.entryNode;

    if (!entryNode.astNode) {
      logger.warn(`Scope ${scope?.name} entry node does not have an AST node`);
      return;
    }

    const ast = scope.ast;
    if (!ast) {
      logger.warn(`Scope ${scope?.name} does not have an AST`);
      return;
    }

    const handleFunction = (node: any) => {
      const functionName = node.id?.name;
      if (!functionName) return;

      const funVar = scope.namedFunctionVars.get(functionName);
      if (!funVar) return;

      const functionDef = defFactory.createFunctionDef(entryNode, node);
      // [LastReachIns]
      setReachingDef(funVar, functionDef);
    };

    traverseSimple(ast, {
      FunctionDeclaration: handleFunction,
      FunctionExpression: handleFunction,
    });
  }
}
export const functionDeclarationAnalyzer = new FunctionDeclarationAnalyzer();
