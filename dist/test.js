"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsParser_1 = require("./ast/jsParser");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extensionScript_1 = require("./extension/extensionScript");
const dot_ast_1 = require("./graph/dot-ast");
const dot_cfg_1 = require("./graph/dot-cfg");
const modelBuilder_1 = require("./model/modelBuilder");
const modelCtrl_1 = require("./model/modelCtrl");
const scopeCtrl_1 = require("./scope/scopeCtrl");
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
function createPseudoExtensionScript(sourceCode) {
    const pseudo = Object.create(extensionScript_1.ExtensionScript.prototype);
    const baseDir = path_1.default.resolve(__dirname, "..");
    const absPath = path_1.default.join(baseDir, "process", "virtual-message-handler.js");
    const relativePath = "process/virtual-message-handler.js";
    Object.defineProperties(pseudo, {
        key: { value: "process/virtual-message-handler", enumerable: true },
        absPath: { value: absPath, enumerable: true },
        relativePath: { value: relativePath, enumerable: true },
        baseDir: { value: baseDir, enumerable: true },
    });
    pseudo.getCode = () => sourceCode;
    pseudo.getAST =
        () => jsParser_1.parser.parseAST(sourceCode);
    return pseudo;
}
function runAnalysisAndDumpGraphs(sourceCode) {
    scopeCtrl_1.scopeController.clear();
    modelCtrl_1.modelController.clear();
    const ast = jsParser_1.parser.parseAST(sourceCode);
    const pseudoScript = createPseudoExtensionScript(sourceCode);
    const scopeTree = scopeCtrl_1.scopeController.addPageScopeTree(ast, pseudoScript);
    modelCtrl_1.modelController.addPageModels(scopeTree);
    modelBuilder_1.modelBuilder.buildIntraProceduralModelsForAPage(scopeTree);
    //   defuseAnalyzer.buildInterProceduralModelsPDG(scopeTree);
    const pageModels = modelCtrl_1.modelController.getPageModels(scopeTree);
    if (!pageModels) {
        throw new Error("No PageModels found for current scope tree");
    }
    const hasAnyGraph = [
        ...pageModels.intraProceduralModels,
        ...pageModels.interProceduralModels,
    ].some((model) => Boolean(model.graph));
    if (!hasAnyGraph) {
        throw new Error("No CFG graph available after analysis");
    }
    const outputDir = path_1.default.resolve(__dirname, "../tools");
    fs_1.default.mkdirSync(outputDir, { recursive: true });
    const astDot = (0, dot_ast_1.generateAstDot)(ast, { graphName: "MessageHandlerAST" });
    const cfgDot = (0, dot_cfg_1.generateCfgDot)(pageModels, {
        graphName: "MessageHandlerCFG",
        source: sourceCode,
        includeLineCol: true,
    });
    const astDotPath = path_1.default.join(outputDir, "ast.dot");
    const cfgDotPath = path_1.default.join(outputDir, "cfg.dot");
    fs_1.default.writeFileSync(astDotPath, astDot, "utf8");
    fs_1.default.writeFileSync(cfgDotPath, cfgDot, "utf8");
    console.log(`AST DOT generated: ${astDotPath}`);
    console.log(`CFG DOT generated: ${cfgDotPath}`);
}
runAnalysisAndDumpGraphs(code);
