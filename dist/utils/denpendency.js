"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencyAnalyzer = exports.DependencyAnalyzer = void 0;
const fs_1 = __importDefault(require("fs"));
const jsParser_1 = require("../ast/jsParser");
const fileHandler_1 = require("../utils/fileHandler");
const logger_1 = __importDefault(require("../utils/logger"));
const astValidator_1 = require("../ast/astValidator");
const set_1 = __importDefault(require("./set"));
const walkes_1 = require("../ast/walkes");
class DependencyCollector {
    constructor() {
        this.result = new set_1.default();
    }
    collect(node) {
        switch (node.type) {
            case "ImportDeclaration":
                this.handleImport(node);
                break;
            case "CallExpression":
                this.handleImportScripts(node);
                break;
        }
    }
    handleImport(node) {
        const source = node.source.value;
        this.result.add(source);
    }
    handleImportScripts(node) {
        if (node.callee.type === "Identifier" &&
            node.callee.name === "importScripts") {
            for (const arg of node.arguments) {
                if (arg.type === "Literal") {
                    this.result.add(String(arg.value));
                }
                else if (arg.type === "StringLiteral") {
                    this.result.add(arg.value);
                }
                else if (arg.type === "Identifier") {
                    this.result.add(arg.name);
                }
            }
        }
    }
}
class DependencyAnalyzer {
    analyzeAST(ast) {
        astValidator_1.astValidator.validateProgramNode(ast);
        const collector = new DependencyCollector();
        (0, walkes_1.traverseSimple)(ast, {
            ImportDeclaration: (node) => collector.collect(node),
            CallExpression: (node) => collector.collect(node),
        });
        return collector.result;
    }
    analyzeFile(filePath) {
        const code = fs_1.default.readFileSync(filePath, "utf-8");
        const ast = jsParser_1.parser.parseAST(code);
        return this.analyzeAST(ast);
    }
    analyzeDirectory(dirPath) {
        const results = new Map();
        const files = (0, fileHandler_1.collectJsFiles)(dirPath);
        for (const file of files) {
            try {
                results.set(file, this.analyzeFile(file));
            }
            catch (err) {
                logger_1.default.error(`Failed to analyze ${file}`, err);
            }
        }
        return results;
    }
    generateDependencyGraph(results) {
        return results;
    }
}
exports.DependencyAnalyzer = DependencyAnalyzer;
exports.dependencyAnalyzer = new DependencyAnalyzer();
