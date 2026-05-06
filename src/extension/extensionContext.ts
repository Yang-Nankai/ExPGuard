import fs from "fs";
import pathMod from "path";
import {
  assertDirectoryExists,
  assertValidExtensionId
} from "../utils/validation";
import { Errors } from "../utils/errorCode";
import { collectJsFiles } from "../utils/fileHandler";
import { ScriptRegistry } from "./extensionRegistry";
import { ScriptDependencyGraph } from "./scriptDependenctGraph";
import { ExtensionScript } from "./extensionScript";
import { topoSort } from "../utils/topoSort";
import { scopeController } from "../scope/scopeCtrl";
import { modelController } from "../model/modelCtrl";
import { modelBuilder } from "../model/modelBuilder";
import config from "../config";
import { defuseAnalyzer } from "../def-use/defuseanalyzer";
import { taintManager } from "../taint";
import logger from "../utils/logger";
import { fileTimerManager } from "../utils/fileTimer";
import { scriptUsageTracker } from "./scriptUsageTracker";

/**
 * Represents the context of a loaded extension
 */
export class ExtensionContext {
  readonly id: string;
  readonly baseDir: string;

  readonly manifest: Record<string, any>;
  readonly scripts: ScriptRegistry;
  private orderedScripts: ExtensionScript[] = [];

  constructor(extensionId: string, baseDir: string) {
    assertValidExtensionId(extensionId);
    assertDirectoryExists(baseDir);

    this.id = extensionId;
    this.baseDir = baseDir;
    this.manifest = this.loadManifest(baseDir);
    this.scripts = new ScriptRegistry();
    this.loadScripts();
    scriptUsageTracker.initialize({
      baseDir: this.baseDir,
      manifest: this.manifest,
      scripts: this.scripts,
    });
  }

  private loadManifest(dirPath: string): Record<string, any> {
    const manifestPath = pathMod.join(dirPath, "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      Errors.ValidatorError(`manifest.json not found in ${dirPath}`);
    }

    try {
      return JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    } catch {
      Errors.ValidatorError(`Failed to parse manifest.json at ${manifestPath}`);
      return {};
    }
  }

  private loadScripts() {
    const jsFiles = collectJsFiles(this.baseDir);

    for (const rel of jsFiles) {
      const abs = pathMod.resolve(this.baseDir, rel);
      this.scripts.register(new ExtensionScript(abs, this.baseDir));
    }
  }

  /**
   * Analyze all scripts in dependency order
   */
  analyzeScriptsInOrder() {
    const graph = new ScriptDependencyGraph(this.scripts).build();
    const topoOrder = topoSort(graph);
    const pending: string[] = [];
    const queued = new Set<string>();
    const analyzed = new Set<string>();
    const queueVisiting = new Set<string>();

    const enqueue = (key: string) => {
      if (!this.scripts.has(key)) return;
      if (queued.has(key) || analyzed.has(key)) return;
      queued.add(key);
      pending.push(key);
    };

    const enqueueWithDependencies = (key: string) => {
      if (!this.scripts.has(key)) return;
      if (queued.has(key) || analyzed.has(key)) return;
      if (queueVisiting.has(key)) return;

      queueVisiting.add(key);

      const deps = graph.get(key) ?? [];
      for (const dep of deps) {
        enqueueWithDependencies(dep);
      }

      queueVisiting.delete(key);
      enqueue(key);
    };

    const initialOrder = scriptUsageTracker.getInitialAnalysisOrder();
    const reachableFromRoots = new Set<string>();

    const collectReachable = (key: string) => {
      if (reachableFromRoots.has(key)) return;
      reachableFromRoots.add(key);

      const deps = graph.get(key) ?? [];
      for (const dep of deps) {
        collectReachable(dep);
      }
    };

    for (const key of initialOrder) {
      collectReachable(key);
    }

    for (const key of initialOrder) {
      enqueueWithDependencies(key);
    }

    // Safety: add any still-unqueued reachable node (rare cyclic/edge cases).
    for (const key of topoOrder) {
      if (reachableFromRoots.has(key)) {
        enqueue(key);
      }
    }

    if (pending.length === 0) {
      logger.warn(
        "[CONTEXT] No manifest runtime roots found, fallback to dependency topological order.",
      );
      for (const key of topoOrder) enqueue(key);
    }

    logger.info(`[CONTEXT] Initial analysis order: ${pending.join(", ")}`);

    while (pending.length > 0) {
      const key = pending.shift()!;
      queued.delete(key);
      if (analyzed.has(key)) continue;

      const script = this.scripts.get(key);
      if (!script) continue;

      analyzed.add(key);
      this.orderedScripts.push(script);

      const frame = scriptUsageTracker.getPrimaryFrameByKey(script.key);
      logger.info(`[CONTEXT] Analyzing script: ${script.key} [frame=${frame}]`);
      fileTimerManager.setCurrentTimer(script.absPath, script.getFileSize());

      try {
        const ast = script.getAST();

        const scopeTree = scopeController.addPageScopeTree(ast, script);
        modelController.addPageModels(scopeTree);

        // Create Intra Model
        modelBuilder.buildIntraProceduralModelsForAPage(scopeTree);

        if (config.enableInterProcedural) {
          taintManager.enterFile(script);
          defuseAnalyzer.buildInterProceduralModelsPDG(scopeTree);
          taintManager.exitFile();
        }
      } catch (err) {
        logger.error(
          `Failed to analyze script ${script.key}: ${String(err)}`,
        );
      }

      const elapsedMs = fileTimerManager.getCurrentElapsedMs();
      script.setAnalysisDuration(elapsedMs);

      logger.info(`[CONTEXT] ${script.key} analyzed, total=${elapsedMs / 1000}s`);
      fileTimerManager.clearCurrentTimer();

      // Pull in newly discovered scripts via import/importScripts/runtime URLs.
      for (const framedKey of scriptUsageTracker.getFramedScriptKeys()) {
        enqueue(framedKey);
      }
    }
    
  }

  /**
   * Iterate over all scripts with a callback
   */
  public forEachScript(
    callback: (key: string, script: ExtensionScript) => void
  ): void {
    for (const [key, script] of this.scripts.entries()) {
      callback(key, script);
    }
  }

  get manifestVersion(): string {
    return this.manifest.manifest_version?.toString() ?? "2";
  }

  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      rootDir: this.baseDir,
      manifest: JSON.stringify(this.manifest),
      scripts: Array.from(this.scripts.values()).map((s) => s.toJSON()),
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }

  // 新增：获取所有脚本的统计摘要
  // TODO: 后续要优化这部分的代码，不是很好看
  getScriptsSummary() {
    return Array.from(this.scripts.values()).map(s => ({
      file: s.relativePath,
      frame: scriptUsageTracker.getPrimaryFrameByKey(s.key),
      frameTags: scriptUsageTracker.getScriptFrameTagsByKey(s.key),
      frameDetails: scriptUsageTracker.getScriptFrameDescriptorsByKey(s.key),
      size: s.getFileSize(),
      durationMs: s.toJSON().analysisDurationMs,
      // isTimedOut: s.toJSON
      // TODO: 后续添加上判断文件是否超时的逻辑
    }));
  }

}
