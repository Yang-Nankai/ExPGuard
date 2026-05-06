import fs from "fs";
import { parser } from "../ast/jsParser";
import { collectJsFiles } from "../utils/fileHandler";
import logger from "../utils/logger";
import { Node } from "acorn";
import { astValidator } from "../ast/astValidator";
import Set from "./set";
import { traverseSimple } from "../ast/walkes";

class DependencyCollector {
  public result: Set<string> = new Set();

  collect(node: any): void {
    switch (node.type) {
      case "ImportDeclaration":
        this.handleImport(node);
        break;
      case "CallExpression":
        this.handleImportScripts(node);
        break;
    }
  }

  private handleImport(node: any): void {
    const source = node.source.value;
    this.result.add(source);
  }

  private handleImportScripts(node: any): void {
    if (
      node.callee.type === "Identifier" &&
      node.callee.name === "importScripts"
    ) {
      for (const arg of node.arguments) {
        if (arg.type === "Literal") {
          this.result.add(String(arg.value));
        } else if (arg.type === "StringLiteral") {
          this.result.add(arg.value);
        } else if (arg.type === "Identifier") {
          this.result.add(arg.name);
        }
      }
    }
  }
}

export class DependencyAnalyzer {
  analyzeAST(ast: Node): Set<string> {
    astValidator.validateProgramNode(ast);
    const collector = new DependencyCollector();
    traverseSimple(ast, {
      ImportDeclaration: (node) => collector.collect(node),
      CallExpression: (node) => collector.collect(node),
    });
    return collector.result;
  }

  analyzeFile(filePath: string): Set<string> {
    const code = fs.readFileSync(filePath, "utf-8");
    const ast = parser.parseAST(code);
    return this.analyzeAST(ast);
  }

  analyzeDirectory(dirPath: string): Map<string, Set<string>> {
    const results: Map<string, Set<string>> = new Map();
    const files = collectJsFiles(dirPath);

    for (const file of files) {
      try {
        results.set(file, this.analyzeFile(file));
      } catch (err) {
        logger.error(`Failed to analyze ${file}`, err);
      }
    }

    return results;
  }

  generateDependencyGraph(
    results: Map<string, Set<string>>
  ): Map<string, Set<string>> {
    return results;
  }
}

export const dependencyAnalyzer = new DependencyAnalyzer();
