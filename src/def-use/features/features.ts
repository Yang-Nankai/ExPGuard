import Def from "../types/def";
import { FlowNode } from "../../flownode/flownode";
import { defFactory } from "../factories/defFactory";
import { Selector as S } from "./selector";
import { NodeQuery } from "./nodeQuery";
import Scope from "../../scope/scope";
import { BuiltInRegistry } from "../builtins/builtinRegistry";

export type FeatureSemanticExec = (
  args: Def[],
  callNode: FlowNode,
  thisDef: Def | null
) => Def | null | undefined;

export interface FeatureModelSemantic {
  id: string;
  matchFunctions(ast: any): any[];
  hasSideEffect: boolean;
  exec: FeatureSemanticExec;
}

export interface FeatureMatchResult {
  feature: FeatureModelSemantic;
  functionNode: any;
}

export class FeatureModelRegistry {
  private static registry: FeatureModelSemantic[] = [];

  static register(model: FeatureModelSemantic) {
    this.registry.push(model);
  }

  static matchFunctions(ast: any): FeatureMatchResult[] {
    const results: FeatureMatchResult[] = [];

    for (const feature of this.registry) {
      const functions = feature.matchFunctions(ast) || [];
      for (const fn of functions) {
        results.push({
          feature,
          functionNode: fn,
        });
      }
    }

    return results;
  }
}

FeatureModelRegistry.register({
  id: "browser-polyfill",

  matchFunctions(ast: any) {
    return NodeQuery.from(ast)
      .select(S.type("FunctionExpression"))
      .has(S.type("IfStatement"))
      .has(
        S.type("AssignmentExpression")
          .attrEq("left.type", "MemberExpression")
          .attrEq("left.property.name", "exports")
          .has(
            S.type("CallExpression").has(
              S.type("Identifier").attrEq("name", "chrome")
            )
          )
      )
      .result();
  },

  hasSideEffect: true,

  exec(args, callNode, _thisDef) {
    if (args.length < 1) return null;

    const moduleDef = args[0];
    if (!Def.isObjectDef(moduleDef)) return null;

    const rootScope = callNode.scopeTree?.root;
    if (!rootScope || !Scope.isPageScope(rootScope)) return null;
    // const exportsDef = defFactory.createGlobalDef(callNode, rootScope);
    const exportsDef = BuiltInRegistry.getChromeObject() ?? defFactory.createUnknownDef(callNode);

    moduleDef.setProperty("exports", exportsDef);

    return exportsDef;
  },
});
