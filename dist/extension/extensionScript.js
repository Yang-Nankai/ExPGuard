"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionScript = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsParser_1 = require("../ast/jsParser");
const astValidator_1 = require("../ast/astValidator");
const transformer_1 = require("../transformation/transformer");
const denpendency_1 = require("../utils/denpendency");
const errorCode_1 = require("../utils/errorCode");
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
const scriptPathFilter_1 = require("../utils/scriptPathFilter");
/**
 * Represents a single script file inside an extension
 */
class ExtensionScript {
    constructor(absPath, baseDir) {
        // this.ensureValidFile(absPath);
        this.analysisDurationMs = 0; // Add: track analysis duration
        this.absPath = absPath;
        this.baseDir = baseDir;
        this.relativePath = path_1.default.relative(baseDir, absPath).replace(/\\/g, "/");
        this.key = ExtensionScript.createScriptKey(absPath, baseDir);
    }
    /**
     * Create ScriptKey from absolute path
     */
    static createScriptKey(absPath, baseDir) {
        return path_1.default
            .relative(baseDir, absPath)
            .replace(/\\/g, "/")
            .replace(/\.(js|ts)$/, "");
    }
    /**
     * Resolve import / importScripts target to ScriptKey
     *
     * Rules:
     * 1. source starts with "."  -> relative to current script directory
     * 2. source does NOT start with "." -> relative to extension baseDir
     */
    resolveRelativeScriptKey(source) {
        let resolvedAbsPath;
        if (source.startsWith(".")) {
            // relative to current script
            const importerDir = path_1.default.dirname(this.absPath);
            resolvedAbsPath = path_1.default.resolve(importerDir, source);
        }
        else {
            // relative to extension baseDir
            resolvedAbsPath = path_1.default.resolve(this.baseDir, source);
        }
        const normalized = resolvedAbsPath.replace(/\\/g, "/");
        if ((0, scriptPathFilter_1.isIgnoredAbsolutePath)(normalized, this.baseDir)) {
            return null;
        }
        if (!fs_1.default.existsSync(normalized)) {
            logger_1.default.warn(`Resolved script does not exist: ${this.key} -> ${source}`);
            return null;
        }
        return ExtensionScript.createScriptKey(normalized, this.baseDir);
    }
    /**
     * Lazily parse and validate AST
     */
    getAST() {
        if (this.ast) {
            return this.ast;
        }
        try {
            const code = fs_1.default.readFileSync(this.absPath, "utf-8");
            this.code = code;
            let ast = jsParser_1.parser.parseAST(code);
            if (config_1.default.optimizationEnabled) {
                ast = (0, transformer_1.optimizeAST)(ast);
            }
            astValidator_1.astValidator.validate(ast);
            if (config_1.default.enableOptimizationRewrite) {
                this.writeOptimizedOutput(ast);
            }
            this.ast = ast;
            return ast;
        }
        catch (err) {
            // FIXME: do not crash here
            throw errorCode_1.Errors.ValidatorError(`Failed to parse script: ${this.relativePath}`);
        }
    }
    /**
     * Add: Get file size in bytes
     */
    getFileSize() {
        try {
            return fs_1.default.statSync(this.absPath).size;
        }
        catch (_a) {
            return 0;
        }
    }
    /**
     * Add: set analysis duration in milliseconds
     */
    setAnalysisDuration(s) {
        this.analysisDurationMs = s;
    }
    getCode() {
        if (this.code) {
            return this.code;
        }
        try {
            this.code = fs_1.default.readFileSync(this.absPath, "utf-8");
            return this.code;
        }
        catch (err) {
            logger_1.default.warn(`Failed to read code from file: ${this.absPath}`, err);
            return null;
        }
    }
    /**
     * Analyze import / importScripts dependencies
     */
    getDependencies() {
        if (!this.dependencies) {
            this.dependencies = denpendency_1.dependencyAnalyzer.analyzeAST(this.getAST());
        }
        return this.dependencies;
    }
    toJSON() {
        return {
            key: this.key,
            path: this.relativePath,
            dependencies: this.dependencies,
            sizeBytes: this.getFileSize(),
            analysisDurationMs: this.analysisDurationMs,
        };
    }
    toString() {
        return JSON.stringify(this.toJSON(), null, 2);
    }
    // Internal helpers
    ensureValidFile(absPath) {
        if (!fs_1.default.existsSync(absPath) || !fs_1.default.statSync(absPath).isFile()) {
            throw errorCode_1.Errors.ValidatorError(`Script not found or inaccessible: ${absPath}`);
        }
    }
    // Internal helpers
    writeOptimizedOutput(ast) {
        try {
            const optimizedCode = (0, transformer_1.astToString)(ast);
            fs_1.default.writeFileSync(`${this.absPath}.prep.js`, optimizedCode);
        }
        catch (err) {
            logger_1.default.warn(`Failed to write optimized output for ${this.absPath}`, err);
        }
    }
}
exports.ExtensionScript = ExtensionScript;
