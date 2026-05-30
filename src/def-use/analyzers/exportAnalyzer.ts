import { traverseSimple } from "../../ast/walkes";
import PageScope from "../../scope/pageScope";
import Scope from "../../scope/scope";
import { scopeController } from "../../scope/scopeCtrl";
import ScopeTree from "../../scope/scopeTree";
import { expressionTypeHandler } from "../handlers/expressionTypeHandler";
import Def from "../types/def";
import { lookupMatchingDef } from "../utils/utils";

/**
 * ExportAnalyzer
 */
export class ExportAnalyzer {
  analyze(scope: Scope, scopeTree: ScopeTree) {
    if (!scope?.graph) return;

    const script = scopeTree.script;

    // Export only applies to the top-level (module) scope
    if (!Scope.isPageScope(scope)) return;

    const ast = scope.ast;
    if (!ast) return;

    const exitNode = scope.graph.exitNode;

    const handleExportDeclaration = (decl: any) => {
      if (!decl) return;

      // export const a = ...
      if (decl.type === "VariableDeclaration") {
        for (const d of decl.declarations ?? []) {
          if (d?.id?.type !== "Identifier") continue;
          const def = lookupMatchingDef(d.id.name, scope);
          if (def) scope.addExport(d.id.name, def);
        }
      }

      // export function / class
      if (
        (decl.type === "FunctionDeclaration" ||
          decl.type === "ClassDeclaration") &&
        decl.id
      ) {
        const def = lookupMatchingDef(decl.id.name, scope);
        // Make sure it's a function def
        if (def && Def.isFunctionDef(def)) scope.addExport(decl.id.name, def);
      }
    };

    const handleExportNamed = (node: any) => {
      if (!node) return;

      // export { x } from 'mod'
      if (node.source) {
        const sourceKey = script.resolveRelativeScriptKey(node.source.value);
        if (!sourceKey) return;

        const sourcePageTree = scopeController.getPageScopeTreeByKey(sourceKey);
        if (!sourcePageTree) return;

        const sourceScope = sourcePageTree.root!;
        if (!sourceScope || !Scope.isPageScope(sourceScope)) return;

        for (const spec of node.specifiers ?? []) {
          const localName =
            this.getSpecifierName(spec.local) ??
            this.getSpecifierName(spec.exported);
          const exportedName =
            this.getSpecifierName(spec.exported) ?? localName;

          if (!localName || !exportedName) continue;

          const def = (sourceScope as PageScope).exports.get(localName);
          if (def) scope.addExport(exportedName, def);
        }

        return;
      }

      // export const / function / class / var / ...
      if (node.declaration) {
        handleExportDeclaration(node.declaration);
        return;
      }

      // export { a as b }
      for (const spec of node.specifiers ?? []) {
        const localName = this.getSpecifierName(spec.local);
        const exportedName = this.getSpecifierName(spec.exported) ?? localName;

        if (!localName || !exportedName) continue;

        const def = lookupMatchingDef(localName, scope);
        if (def) scope.addExport(exportedName, def);
      }
    };

    const handleExportDefault = (node: any) => {
      if (!node?.declaration) return;

      const decl = node.declaration;
      const defaultName = "default";

      // export default Identifier
      if (decl.type === "Identifier") {
        const def = lookupMatchingDef(decl.name, scope);
        if (def) scope.addExport(defaultName, def);
        return;
      }

      // export default function / class with name
      if (
        (decl.type === "FunctionDeclaration" ||
          decl.type === "ClassDeclaration") &&
        decl.id
      ) {
        const def = lookupMatchingDef(decl.id.name, scope);
        if (def) scope.addExport(defaultName, def);
        return;
      }

      // export default expression
      const def = expressionTypeHandler(exitNode, decl);
      if (def) scope.addExport(defaultName, def);
    };

    const handleExportAll = (node: any) => {
      if (!node?.source) return;

      // const sourceKey = resolveRelativeScriptKey(key, node.source.value);
      const sourceKey = script.resolveRelativeScriptKey(node.source.value);
      if (!sourceKey) return;

      const sourcePageTree = scopeController.getPageScopeTreeByKey(sourceKey);
      if (!sourcePageTree) return;

      const sourceScope = sourcePageTree.root!;
      if (!sourceScope || !Scope.isPageScope(sourceScope)) return;

      for (const [name, def] of (sourceScope as PageScope).exports) {
        scope.addExport(name, def);
      }
    };

    traverseSimple(ast, {
      ExportNamedDeclaration: handleExportNamed,
      ExportDefaultDeclaration: handleExportDefault,
      ExportAllDeclaration: handleExportAll,
    });
  }

  // Helper Functions
  private getSpecifierName(node: any): string | undefined {
    if (!node) return;
    if (node.type === "Identifier") return node.name;
    return node.name ?? node.value;
  }
}

export const exportAnalyzer = new ExportAnalyzer();
