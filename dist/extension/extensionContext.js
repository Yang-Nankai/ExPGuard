"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionContext = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validation_1 = require("../utils/validation");
const errorCode_1 = require("../utils/errorCode");
const fileHandler_1 = require("../utils/fileHandler");
const extensionRegistry_1 = require("./extensionRegistry");
const scriptDependenctGraph_1 = require("./scriptDependenctGraph");
const extensionScript_1 = require("./extensionScript");
const topoSort_1 = require("../utils/topoSort");
const scopeCtrl_1 = require("../scope/scopeCtrl");
const config_1 = __importDefault(require("../config"));
const defuseanalyzer_1 = require("../def-use/defuseanalyzer");
const taint_1 = require("../taint");
const logger_1 = __importDefault(require("../utils/logger"));
const fileTimer_1 = require("../utils/fileTimer");
const scriptUsageTracker_1 = require("./scriptUsageTracker");
/**
 * Represents the context of a loaded extension
 */
class ExtensionContext {
    constructor(extensionId, baseDir) {
        this.orderedScripts = [];
        (0, validation_1.assertValidExtensionId)(extensionId);
        (0, validation_1.assertDirectoryExists)(baseDir);
        this.id = extensionId;
        this.baseDir = baseDir;
        this.manifest = this.loadManifest(baseDir);
        this.scripts = new extensionRegistry_1.ScriptRegistry();
        this.loadScripts();
        scriptUsageTracker_1.scriptUsageTracker.initialize({
            baseDir: this.baseDir,
            manifest: this.manifest,
            scripts: this.scripts,
        });
    }
    loadManifest(dirPath) {
        const manifestPath = path_1.default.join(dirPath, "manifest.json");
        if (!fs_1.default.existsSync(manifestPath)) {
            errorCode_1.Errors.ValidatorError(`manifest.json not found in ${dirPath}`);
        }
        try {
            return JSON.parse(fs_1.default.readFileSync(manifestPath, "utf-8"));
        }
        catch (_a) {
            errorCode_1.Errors.ValidatorError(`Failed to parse manifest.json at ${manifestPath}`);
            return {};
        }
    }
    loadScripts() {
        const jsFiles = (0, fileHandler_1.collectJsFiles)(this.baseDir);
        for (const rel of jsFiles) {
            const abs = path_1.default.resolve(this.baseDir, rel);
            this.scripts.register(new extensionScript_1.ExtensionScript(abs, this.baseDir));
        }
    }
    /**
     * Analyze all scripts in dependency order
     */
    analyzeScriptsInOrder() {
        const graph = new scriptDependenctGraph_1.ScriptDependencyGraph(this.scripts).build();
        const topoOrder = (0, topoSort_1.topoSort)(graph);
        const pending = [];
        const queued = new Set();
        const analyzed = new Set();
        const queueVisiting = new Set();
        const enqueue = (key) => {
            if (!this.scripts.has(key))
                return;
            if (queued.has(key) || analyzed.has(key))
                return;
            queued.add(key);
            pending.push(key);
        };
        const enqueueWithDependencies = (key) => {
            var _a;
            if (!this.scripts.has(key))
                return;
            if (queued.has(key) || analyzed.has(key))
                return;
            if (queueVisiting.has(key))
                return;
            queueVisiting.add(key);
            const deps = (_a = graph.get(key)) !== null && _a !== void 0 ? _a : [];
            for (const dep of deps) {
                enqueueWithDependencies(dep);
            }
            queueVisiting.delete(key);
            enqueue(key);
        };
        const initialOrder = scriptUsageTracker_1.scriptUsageTracker.getInitialAnalysisOrder();
        const reachableFromRoots = new Set();
        const collectReachable = (key) => {
            var _a;
            if (reachableFromRoots.has(key))
                return;
            reachableFromRoots.add(key);
            const deps = (_a = graph.get(key)) !== null && _a !== void 0 ? _a : [];
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
            logger_1.default.warn("[CONTEXT] No manifest runtime roots found, fallback to dependency topological order.");
            for (const key of topoOrder)
                enqueue(key);
        }
        logger_1.default.info(`[CONTEXT] Initial analysis order: ${pending.join(", ")}`);
        while (pending.length > 0) {
            const key = pending.shift();
            queued.delete(key);
            if (analyzed.has(key))
                continue;
            const script = this.scripts.get(key);
            if (!script)
                continue;
            analyzed.add(key);
            this.orderedScripts.push(script);
            const frame = scriptUsageTracker_1.scriptUsageTracker.getPrimaryFrameByKey(script.key);
            logger_1.default.info(`[CONTEXT] Analyzing script: ${script.key} [frame=${frame}]`);
            fileTimer_1.fileTimerManager.setCurrentTimer(script.absPath, script.getFileSize());
            try {
                const ast = script.getAST();
                const scopeTree = scopeCtrl_1.scopeController.addPageScopeTree(ast, script);
                // Build intra-procedural CFGs and bind them onto their scopes.
                scopeTree.buildIntraProceduralCFGs();
                if (config_1.default.enableInterProcedural) {
                    taint_1.taintManager.enterFile(script);
                    defuseanalyzer_1.defuseAnalyzer.buildInterProceduralModelsPDG(scopeTree);
                    taint_1.taintManager.exitFile();
                }
            }
            catch (err) {
                logger_1.default.error(`Failed to analyze script ${script.key}: ${String(err)}`);
            }
            const elapsedMs = fileTimer_1.fileTimerManager.getCurrentElapsedMs();
            script.setAnalysisDuration(elapsedMs);
            logger_1.default.info(`[CONTEXT] ${script.key} analyzed, total=${elapsedMs / 1000}s`);
            fileTimer_1.fileTimerManager.clearCurrentTimer();
            // Pull in newly discovered scripts via import/importScripts/runtime URLs.
            for (const framedKey of scriptUsageTracker_1.scriptUsageTracker.getFramedScriptKeys()) {
                enqueue(framedKey);
            }
        }
    }
    /**
     * Iterate over all scripts with a callback
     */
    forEachScript(callback) {
        for (const [key, script] of this.scripts.entries()) {
            callback(key, script);
        }
    }
    get manifestVersion() {
        var _a, _b;
        return (_b = (_a = this.manifest.manifest_version) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "2";
    }
    toJSON() {
        return {
            id: this.id,
            rootDir: this.baseDir,
            manifest: JSON.stringify(this.manifest),
            scripts: Array.from(this.scripts.values()).map((s) => s.toJSON()),
        };
    }
    toString() {
        return JSON.stringify(this.toJSON(), null, 2);
    }
    // 新增：获取所有脚本的统计摘要
    // TODO: 后续要优化这部分的代码，不是很好看
    getScriptsSummary() {
        return Array.from(this.scripts.values()).map(s => ({
            file: s.relativePath,
            frame: scriptUsageTracker_1.scriptUsageTracker.getPrimaryFrameByKey(s.key),
            frameTags: scriptUsageTracker_1.scriptUsageTracker.getScriptFrameTagsByKey(s.key),
            frameDetails: scriptUsageTracker_1.scriptUsageTracker.getScriptFrameDescriptorsByKey(s.key),
            size: s.getFileSize(),
            durationMs: s.toJSON().analysisDurationMs,
            // isTimedOut: s.toJSON
            // TODO: 后续添加上判断文件是否超时的逻辑
        }));
    }
}
exports.ExtensionContext = ExtensionContext;
