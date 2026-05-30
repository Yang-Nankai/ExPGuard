import path from "path";
import { parser } from "../../src/ast/jsParser";
import { ExtensionScript } from "../../src/extension/extensionScript";
import { scopeController } from "../../src/scope/scopeCtrl";
import ScopeTree from "../../src/scope/scopeTree";

/**
 * Build an in-memory ExtensionScript that is not backed by a real file, so
 * unit tests can exercise scope/CFG logic without touching the filesystem.
 */
export function createPseudoScript(
  sourceCode: string,
  key: string = "virtual/test-script",
): ExtensionScript {
  const pseudo = Object.create(ExtensionScript.prototype) as ExtensionScript;
  const baseDir = path.resolve(__dirname, "..", "..");
  const absPath = path.join(baseDir, `${key}.js`);
  const relativePath = `${key}.js`;

  Object.defineProperties(pseudo, {
    key: { value: key, enumerable: true },
    absPath: { value: absPath, enumerable: true },
    relativePath: { value: relativePath, enumerable: true },
    baseDir: { value: baseDir, enumerable: true },
  });

  (pseudo as any).getCode = () => sourceCode;
  (pseudo as any).getAST = () => parser.parseAST(sourceCode);

  return pseudo;
}

/**
 * Reset global controllers, parse `sourceCode`, register a fresh page scope
 * tree, and build the intra-procedural CFGs onto its scopes.
 */
export function buildScopeTreeFor(
  sourceCode: string,
  key?: string,
): ScopeTree {
  scopeController.clear();
  const ast = parser.parseAST(sourceCode);
  const script = createPseudoScript(sourceCode, key);
  const scopeTree = scopeController.addPageScopeTree(ast, script);
  scopeTree.buildIntraProceduralCFGs();
  return scopeTree;
}
