import { traverseSimple } from "../../ast/walkes";
import { ExtensionScript } from "../../extension/extensionScript";
import PageScope from "../../scope/pageScope";
import Scope from "../../scope/scope";
import { scopeController } from "../../scope/scopeCtrl";
import ScopeTree from "../../scope/scopeTree";
import { defFactory } from "../factories/defFactory";
import Def from "../types/def";
import { scriptUsageTracker } from "../../extension/scriptUsageTracker";

/**
 * ImportAnalyzer
 *
 * Resolve imports and bind them into PageScope.imports:
 *   localName -> exported Def
 */
export class ImportAnalyzer {
  analyze(scope: Scope, scopeTree: ScopeTree) {
    if (!scope?.graph) return;
    if (!Scope.isPageScope(scope)) return;

    const entryNode = scope.graph.entryNode;
    const ast = scope.ast;
    if (!ast) return;

    const script = scopeTree.script;

    /**
     * Resolve exports from source module
     */
    const resolveSourceExports = (
      source: string,
    ): ReadonlyMap<string, Def> | null => {
      const ctx = this.resolveSourcePageContext(script, source);
      if (!ctx || !Scope.isPageScope(ctx.rootScope)) return null;

      return (ctx.rootScope as PageScope).exports;
    };

    const handleImportDeclaration = (node: any) => {
      const source = node?.source?.value;
      if (typeof source !== "string") return;

      scriptUsageTracker.markReferencedScript(script, source);

      const exports = resolveSourceExports(source);
      if (!exports) return;

      // import "mod"; (side-effect only)
      if (!node.specifiers?.length) return;

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
            const nsObjDef = defFactory.createObjectDef(entryNode);
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

    const handleImportScriptsCall = (node: any) => {
      if (!this.isImportScriptsCall(node)) return;

      for (const arg of node.arguments ?? []) {
        if (arg.type !== "Literal" || typeof arg.value !== "string") continue;

        scriptUsageTracker.markReferencedScript(script, arg.value);

        const ctx = this.resolveSourcePageContext(script, arg.value);
        if (!ctx || !Scope.isPageScope(ctx.rootScope)) continue;

        const lastReachIns = ctx.rootScope.reachIns;
        for (const [name, def] of lastReachIns ?? []) {
          scope.addImport(name, def);
        }
      }
    };

    const mergeFramePredecessorGlobals = () => {
      const predecessorKeys = scriptUsageTracker.getFramePredecessorScriptKeys(
        script.key,
      );

      for (const predecessorKey of predecessorKeys) {
        const ctx = scopeController.getPageScopeTreeByKey(predecessorKey);
        if (!ctx?.root || !Scope.isPageScope(ctx.root)) continue;

        const predecessorReachIns = ctx.root.lastReachIns;
        for (const [name, def] of predecessorReachIns) {
          scope.addImport(name, def);
        }
      }
    };

    traverseSimple(ast, {
      ImportDeclaration: handleImportDeclaration,
      CallExpression: handleImportScriptsCall,
    });

    // Content-script/background script lists are execution-ordered by frame
    // scenario, so merge globals from earlier scripts that share a frame.
    mergeFramePredecessorGlobals();
  }

  private resolveSourcePageContext(
    script: ExtensionScript,
    source: string,
  ): { pageTree: ScopeTree; rootScope: Scope } | null {
    const sourceScript = script.resolveRelativeScriptKey(source);
    if (!sourceScript) return null;

    const pageTree = scopeController.getPageScopeTreeByKey(sourceScript);
    if (!pageTree?.root) return null;

    return {
      pageTree,
      rootScope: pageTree.root,
    };
  }

  private isImportScriptsCall(node: any): boolean {
    return (
      node?.type === "CallExpression" &&
      node.callee?.type === "Identifier" &&
      node.callee.name === "importScripts"
    );
  }
}

export const importAnalyzer = new ImportAnalyzer();
