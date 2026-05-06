import { Node } from "acorn";
import Set from "./set";
export declare class DependencyAnalyzer {
    analyzeAST(ast: Node): Set<string>;
    analyzeFile(filePath: string): Set<string>;
    analyzeDirectory(dirPath: string): Map<string, Set<string>>;
    generateDependencyGraph(results: Map<string, Set<string>>): Map<string, Set<string>>;
}
export declare const dependencyAnalyzer: DependencyAnalyzer;
