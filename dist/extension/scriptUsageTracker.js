"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scriptUsageTracker = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
const extensionScript_1 = require("./extensionScript");
const scriptPathFilter_1 = require("../utils/scriptPathFilter");
class ScriptUsageTracker {
    constructor() {
        this._enabled = false;
        this._baseDir = "";
        this._registry = null;
        this._usedScriptKeys = new Set();
        this._scriptFrames = new Map();
        this._frameFamilies = new Map();
        this._frameConstraints = new Map();
        this._frameScriptOrder = new Map();
        this._initialAnalysisOrder = [];
        this._externallyConnectableDeclared = false;
    }
    reset() {
        this._enabled = false;
        this._baseDir = "";
        this._registry = null;
        this._usedScriptKeys.clear();
        this._scriptFrames.clear();
        this._frameFamilies.clear();
        this._frameConstraints.clear();
        this._frameScriptOrder.clear();
        this._initialAnalysisOrder = [];
        this._externallyConnectableDeclared = false;
        this._externallyConnectableMatches = undefined;
        this._externallyConnectableIds = undefined;
    }
    initialize(opts) {
        this.reset();
        this._enabled = config_1.default.filterUnusedRuntimeScripts;
        this._baseDir = opts.baseDir;
        this._registry = opts.scripts;
        this.seedFromManifest(opts.manifest);
        logger_1.default.info(`[SCRIPT-USAGE] initialized, frames=${this._frameFamilies.size}, scriptsWithFrame=${this._scriptFrames.size}, initialOrder=${this._initialAnalysisOrder.length}`);
    }
    isEnabled() {
        return this._enabled;
    }
    isScriptUsed(scriptKey) {
        if (!this._enabled)
            return true;
        return this._usedScriptKeys.has(scriptKey);
    }
    getInitialAnalysisOrder() {
        return [...this._initialAnalysisOrder];
    }
    getFramedScriptKeys() {
        return [...this._scriptFrames.keys()];
    }
    getScriptFrameTagsByKey(scriptKey) {
        const tags = this._scriptFrames.get(scriptKey);
        if (!tags || tags.size === 0)
            return ["UNKNOWN"];
        return Array.from(tags.values());
    }
    getScriptFrameDescriptorsByKey(scriptKey) {
        const tags = this._scriptFrames.get(scriptKey);
        if (!tags || tags.size === 0) {
            return [{ id: "UNKNOWN", family: "UNKNOWN" }];
        }
        const list = [];
        for (const id of tags) {
            list.push({
                id,
                family: this.getFrameFamily(id),
                constraint: this.getFrameConstraint(id),
            });
        }
        return list;
    }
    getPrimaryFrameByKey(scriptKey) {
        const tags = this._scriptFrames.get(scriptKey);
        if (!tags || tags.size === 0)
            return "UNKNOWN";
        const arr = Array.from(tags.values());
        arr.sort((a, b) => {
            const af = this.getFrameFamily(a);
            const bf = this.getFrameFamily(b);
            if (af !== bf) {
                if (af === "BG")
                    return -1;
                if (bf === "BG")
                    return 1;
                if (af === "CS")
                    return -1;
                if (bf === "CS")
                    return 1;
            }
            return a.localeCompare(b);
        });
        return arr[0];
    }
    getFrameFamily(frameId) {
        var _a;
        if (!frameId || frameId === "UNKNOWN")
            return "UNKNOWN";
        return (_a = this._frameFamilies.get(frameId)) !== null && _a !== void 0 ? _a : "UNKNOWN";
    }
    getFrameConstraint(frameId) {
        return this._frameConstraints.get(frameId);
    }
    getExternallyConnectableConfig() {
        return {
            declared: this._externallyConnectableDeclared,
            matches: this._externallyConnectableMatches,
            ids: this._externallyConnectableIds,
        };
    }
    getPrimaryFrameFamilyByKey(scriptKey) {
        return this.getFrameFamily(this.getPrimaryFrameByKey(scriptKey));
    }
    getFramePredecessorScriptKeys(scriptKey) {
        const tags = this._scriptFrames.get(scriptKey);
        if (!tags || tags.size === 0)
            return [];
        const result = new Set();
        for (const frameId of tags) {
            const order = this._frameScriptOrder.get(frameId);
            if (!order || order.length === 0)
                continue;
            const idx = order.indexOf(scriptKey);
            if (idx <= 0)
                continue;
            for (let i = 0; i < idx; i += 1) {
                result.add(order[i]);
            }
        }
        return [...result.values()];
    }
    markReferencedScript(fromScript, source) {
        if (!fromScript)
            return;
        if (this._enabled && !this._usedScriptKeys.has(fromScript.key))
            return;
        const resolved = fromScript.resolveRelativeScriptKey(source);
        if (!resolved)
            return;
        this.propagateFrameByReference(fromScript.key, resolved, `ref-from:${fromScript.key}`);
        if (this._enabled) {
            this.markUsedByKey(resolved, `ref-from:${fromScript.key}`);
        }
    }
    markReferencedScriptByKey(fromScriptKey, source) {
        if (!fromScriptKey || !this._registry)
            return;
        const script = this._registry.get(fromScriptKey);
        if (!script)
            return;
        this.markReferencedScript(script, source);
    }
    markReferencedScriptByPathOrUrlByKey(fromScriptKey, value) {
        if (!value)
            return;
        const runtimePath = this.runtimeUrlToPath(value);
        if (runtimePath) {
            this.markReferencedScriptByKey(fromScriptKey, runtimePath);
            return;
        }
        this.markReferencedScriptByKey(fromScriptKey, value);
    }
    seedFromManifest(manifest) {
        const initialOrderSet = new Set();
        const addToInitialOrder = (key) => {
            var _a;
            if (!((_a = this._registry) === null || _a === void 0 ? void 0 : _a.has(key)))
                return;
            if (initialOrderSet.has(key))
                return;
            initialOrderSet.add(key);
            this._initialAnalysisOrder.push(key);
        };
        const registerInFrameOrder = (frameId, key) => {
            var _a;
            if (!((_a = this._registry) === null || _a === void 0 ? void 0 : _a.has(key)))
                return;
            if (!this._frameScriptOrder.has(frameId)) {
                this._frameScriptOrder.set(frameId, []);
            }
            const order = this._frameScriptOrder.get(frameId);
            if (!order.includes(key)) {
                order.push(key);
            }
        };
        const externallyConnectable = manifest === null || manifest === void 0 ? void 0 : manifest.externally_connectable;
        if (externallyConnectable && typeof externallyConnectable === "object") {
            this._externallyConnectableDeclared = true;
            this._externallyConnectableMatches = this.normalizeStrArray(externallyConnectable.matches);
            this._externallyConnectableIds = this.normalizeStrArray(externallyConnectable.ids);
        }
        const contentScripts = Array.isArray(manifest === null || manifest === void 0 ? void 0 : manifest.content_scripts)
            ? manifest.content_scripts
            : [];
        let csIndex = 0;
        for (const item of contentScripts) {
            csIndex += 1;
            const frameId = `CS_${csIndex}`;
            this._frameFamilies.set(frameId, "CS");
            this._frameConstraints.set(frameId, {
                matches: this.normalizeStrArray(item === null || item === void 0 ? void 0 : item.matches),
                includeGlobs: this.normalizeStrArray(item === null || item === void 0 ? void 0 : item.include_globs),
                excludeMatches: this.normalizeStrArray(item === null || item === void 0 ? void 0 : item.exclude_matches),
                excludeGlobs: this.normalizeStrArray(item === null || item === void 0 ? void 0 : item.exclude_globs),
            });
            const jsArr = Array.isArray(item === null || item === void 0 ? void 0 : item.js) ? item.js : [];
            for (const js of jsArr) {
                const key = this.sourceToScriptKey(String(js));
                if (!key)
                    continue;
                this.markFrameByKey(key, frameId, "manifest-content-script");
                registerInFrameOrder(frameId, key);
                addToInitialOrder(key);
                if (this._enabled) {
                    this.markUsedByKey(key, "manifest-content-script");
                }
            }
        }
        const background = manifest === null || manifest === void 0 ? void 0 : manifest.background;
        if (background && typeof background === "object") {
            const bgFrameId = "BG_1";
            this._frameFamilies.set(bgFrameId, "BG");
            const bgScripts = Array.isArray(background.scripts)
                ? background.scripts
                : [];
            for (const s of bgScripts) {
                const key = this.sourceToScriptKey(String(s));
                if (!key)
                    continue;
                this.markFrameByKey(key, bgFrameId, "manifest-background-scripts");
                registerInFrameOrder(bgFrameId, key);
                addToInitialOrder(key);
                if (this._enabled) {
                    this.markUsedByKey(key, "manifest-background-scripts");
                }
            }
            if (typeof background.service_worker === "string") {
                const key = this.sourceToScriptKey(background.service_worker);
                if (key) {
                    this.markFrameByKey(key, bgFrameId, "manifest-service-worker");
                    registerInFrameOrder(bgFrameId, key);
                    addToInitialOrder(key);
                    if (this._enabled) {
                        this.markUsedByKey(key, "manifest-service-worker");
                    }
                }
            }
            const backgroundPage = typeof background.page === "string"
                ? background.page
                : typeof background.background_page === "string"
                    ? background.background_page
                    : null;
            if (backgroundPage) {
                const pageAbs = this.resolveFromBase(backgroundPage);
                const scriptKeys = this.extractScriptKeysFromHtml(pageAbs);
                for (const key of scriptKeys) {
                    this.markFrameByKey(key, bgFrameId, "manifest-background-page");
                    registerInFrameOrder(bgFrameId, key);
                    addToInitialOrder(key);
                    if (this._enabled) {
                        this.markUsedByKey(key, "manifest-background-page");
                    }
                }
            }
        }
    }
    normalizeStrArray(value) {
        if (!Array.isArray(value))
            return undefined;
        const list = value
            .filter((v) => typeof v === "string")
            .map((v) => String(v));
        return list.length > 0 ? list : undefined;
    }
    extractScriptKeysFromHtml(htmlAbsPath) {
        var _a;
        const result = [];
        if (!fs_1.default.existsSync(htmlAbsPath))
            return result;
        let html = "";
        try {
            html = fs_1.default.readFileSync(htmlAbsPath, "utf-8");
        }
        catch (_b) {
            return result;
        }
        const dir = path_1.default.dirname(htmlAbsPath);
        const scriptSrcRegex = /<script[^>]*\ssrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
        for (let match = scriptSrcRegex.exec(html); match; match = scriptSrcRegex.exec(html)) {
            const src = String((_a = match[1]) !== null && _a !== void 0 ? _a : "").trim();
            if (!src || this.isExternalUrl(src))
                continue;
            const absPath = src.startsWith(".")
                ? path_1.default.resolve(dir, src)
                : path_1.default.resolve(this._baseDir, src.replace(/^\//, ""));
            if ((0, scriptPathFilter_1.isIgnoredAbsolutePath)(absPath, this._baseDir))
                continue;
            if (!fs_1.default.existsSync(absPath))
                continue;
            result.push(extensionScript_1.ExtensionScript.createScriptKey(absPath, this._baseDir));
        }
        return result;
    }
    isExternalUrl(value) {
        return /^(https?:|data:|blob:|chrome-extension:|moz-extension:)/i.test(value);
    }
    runtimeUrlToPath(value) {
        if (!/^(chrome-extension:|moz-extension:)/i.test(value))
            return null;
        try {
            const parsed = new URL(value);
            const p = decodeURIComponent(parsed.pathname || "").replace(/^\//, "");
            return p || null;
        }
        catch (_a) {
            return null;
        }
    }
    sourceToScriptKey(source) {
        if (!source || this.isExternalUrl(source))
            return null;
        const abs = this.resolveFromBase(source);
        if ((0, scriptPathFilter_1.isIgnoredAbsolutePath)(abs, this._baseDir))
            return null;
        if (!fs_1.default.existsSync(abs))
            return null;
        return extensionScript_1.ExtensionScript.createScriptKey(abs, this._baseDir);
    }
    resolveFromBase(source) {
        return path_1.default.resolve(this._baseDir, source.replace(/^\//, ""));
    }
    markUsedByKey(scriptKey, reason) {
        var _a;
        if (!((_a = this._registry) === null || _a === void 0 ? void 0 : _a.has(scriptKey)))
            return;
        if (this._usedScriptKeys.has(scriptKey))
            return;
        this._usedScriptKeys.add(scriptKey);
        logger_1.default.debug(`[SCRIPT-USAGE] mark used: ${scriptKey} (${reason})`);
    }
    markFrameByKey(scriptKey, tag, reason) {
        var _a;
        if (!((_a = this._registry) === null || _a === void 0 ? void 0 : _a.has(scriptKey)))
            return;
        if (!this._scriptFrames.has(scriptKey)) {
            this._scriptFrames.set(scriptKey, new Set());
        }
        const set = this._scriptFrames.get(scriptKey);
        if (set.has(tag))
            return;
        set.add(tag);
        logger_1.default.debug(`[SCRIPT-USAGE] mark frame: ${scriptKey} -> ${tag} (${reason})`);
    }
    appendFrameOrderIfMissing(frameId, scriptKey) {
        var _a;
        if (!((_a = this._registry) === null || _a === void 0 ? void 0 : _a.has(scriptKey)))
            return;
        if (!this._frameScriptOrder.has(frameId)) {
            this._frameScriptOrder.set(frameId, []);
        }
        const order = this._frameScriptOrder.get(frameId);
        if (!order.includes(scriptKey)) {
            order.push(scriptKey);
        }
    }
    propagateFrameByReference(fromScriptKey, toScriptKey, reason) {
        const sourceTags = this._scriptFrames.get(fromScriptKey);
        if (!sourceTags || sourceTags.size === 0)
            return;
        for (const tag of sourceTags) {
            this.markFrameByKey(toScriptKey, tag, reason);
            this.appendFrameOrderIfMissing(tag, toScriptKey);
        }
    }
}
exports.scriptUsageTracker = new ScriptUsageTracker();
