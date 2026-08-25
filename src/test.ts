import { parser } from "./ast/jsParser";
import fs from "fs";
import path from "path";
import { ExtensionScript } from "./extension/extensionScript";
import { generateAstDot } from "./graph/dot-ast";
import { generateCfgDot } from "./graph/dot-cfg";
import { scopeController } from "./scope/scopeCtrl";


const code = `
// utils.js
export function sendData(url, data) {
  fetch(url, { method: "POST", body: JSON.stringify(data) });
}

// background.js
import { sendData } from "./utils.js";

function leakData(url) {
  chrome.storage.local.get(["payload"], ({ payload }) => {
    sendData(url, payload);
  });
}

function downloadFile(url) {
  chrome.downloads.download({ url });
}

chrome.runtime.onMessage.addListener((req) => {
  if (req.type === "EXEC") {
    const funcs = ["leakData", "downloadFile"];
    // Implicit iteration & Dynamic dispatch
    for (const func of funcs) {
      self[func](req.targetUrl);
    }
  }
});

// content.js
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  chrome.storage.local.set({ payload: event.data.payload });
  chrome.runtime.sendMessage({ type: "EXEC", targetUrl: event.data.url,});
});
`;

function createPseudoExtensionScript(sourceCode: string): ExtensionScript {
  const pseudo = Object.create(ExtensionScript.prototype) as ExtensionScript;
  const baseDir = path.resolve(__dirname, "..");
  const absPath = path.join(baseDir, "process", "virtual-message-handler.js");
  const relativePath = "process/virtual-message-handler.js";

  Object.defineProperties(pseudo, {
    key: { value: "process/virtual-message-handler", enumerable: true },
    absPath: { value: absPath, enumerable: true },
    relativePath: { value: relativePath, enumerable: true },
    baseDir: { value: baseDir, enumerable: true },
  });

  (pseudo as ExtensionScript & { getCode: () => string }).getCode = () => sourceCode;
  (pseudo as ExtensionScript & { getAST: () => ReturnType<typeof parser.parseAST> }).getAST =
    () => parser.parseAST(sourceCode);

  return pseudo;
}

function runAnalysisAndDumpGraphs(sourceCode: string) {
  scopeController.clear();

  const ast = parser.parseAST(sourceCode);
  const pseudoScript = createPseudoExtensionScript(sourceCode);
  const scopeTree = scopeController.addPageScopeTree(ast, pseudoScript);

  scopeTree.buildIntraProceduralCFGs();

  const hasAnyGraph = scopeTree
    .getCFGEligibleScopes()
    .some((scope) => Boolean(scope.graph));

  if (!hasAnyGraph) {
    throw new Error("No CFG graph available after analysis");
  }

  const outputDir = path.resolve(__dirname, "../tools");
  fs.mkdirSync(outputDir, { recursive: true });

  const astDot = generateAstDot(ast, { graphName: "MessageHandlerAST" });
  const cfgDot = generateCfgDot(scopeTree, {
    graphName: "MessageHandlerCFG",
    source: sourceCode,
    includeLineCol: true,
  });

  const astDotPath = path.join(outputDir, "ast.dot");
  const cfgDotPath = path.join(outputDir, "cfg.dot");

  fs.writeFileSync(astDotPath, astDot, "utf8");
  fs.writeFileSync(cfgDotPath, cfgDot, "utf8");

  console.log(`AST DOT generated: ${astDotPath}`);
  console.log(`CFG DOT generated: ${cfgDotPath}`);
}

runAnalysisAndDumpGraphs(code);
