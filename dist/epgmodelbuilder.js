"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.epgModelBuilder = exports.EPGModelBuilder = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./utils/logger"));
const extensionLoader_1 = require("./extension/extensionLoader");
const timer_1 = require("./utils/timer");
const path_1 = __importDefault(require("path"));
const scriptUsageTracker_1 = require("./extension/scriptUsageTracker");
class EPGModelBuilder {
    constructor() {
        this._extensionContext = null;
        this._extensionId = null;
    }
    /**
     * Unified public entry
     * CLI / runner should ONLY call this
     */
    analyze(options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (options.extensionType) {
                case extensionLoader_1.ExtensionSourceType.CRX:
                    return this.analyzeCRX(options);
                case extensionLoader_1.ExtensionSourceType.DIR:
                    return this.analyzeDIR(options);
                case extensionLoader_1.ExtensionSourceType.WEB:
                    return this.analyzeWEB(options);
                default:
                    throw new Error(`Unsupported extension type: ${options.extensionType}`);
            }
        });
    }
    /** =======================
     * Source-specific wrappers
     * ======================= */
    analyzeCRX(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._analyze(options, extensionLoader_1.ExtensionSourceType.CRX);
        });
    }
    analyzeDIR(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._analyze(options, extensionLoader_1.ExtensionSourceType.DIR);
        });
    }
    analyzeWEB(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._analyze(options, extensionLoader_1.ExtensionSourceType.WEB);
        });
    }
    /** =======================
     * Core implementation
     * ======================= */
    _analyze(options, sourceType) {
        return __awaiter(this, void 0, void 0, function* () {
            const { extensionPath, outputPath, extensionId, extensionVersion } = options;
            scriptUsageTracker_1.scriptUsageTracker.reset();
            // set global extension id
            this._extensionId = extensionId;
            this.cleanOutputDir(outputPath);
            const timer = new timer_1.Timer(`Analyze ${extensionId}`);
            timer.start();
            logger_1.default.info(`[EPG] Start analyzing ${extensionId !== null && extensionId !== void 0 ? extensionId : "unknown"}-${extensionVersion !== null && extensionVersion !== void 0 ? extensionVersion : "unknown"} (${extensionLoader_1.ExtensionSourceType[sourceType]})`);
            const unpackedPath = path_1.default.join(outputPath, "unpacked");
            // Load extension
            const extMeta = yield (0, extensionLoader_1.loadExtensionAsync)(sourceType, extensionPath, unpackedPath, extensionId);
            this._extensionContext = extMeta;
            // Deterministic analysis order
            extMeta.analyzeScriptsInOrder();
            timer.stop();
            logger_1.default.info(`[EPG DONE] ${extensionId} v${extensionVersion !== null && extensionVersion !== void 0 ? extensionVersion : "unknown"} total=${timer.getDuration()}s`);
            return extMeta;
        });
    }
    /**
     * Remove and recreate output directory
     */
    cleanOutputDir(outputPath) {
        if (fs_1.default.existsSync(outputPath)) {
            fs_1.default.rmSync(outputPath, { recursive: true, force: true });
        }
        fs_1.default.mkdirSync(outputPath, { recursive: true });
    }
    get extensionContext() {
        return this._extensionContext;
    }
    getExtensionId() {
        return this._extensionId;
    }
}
exports.EPGModelBuilder = EPGModelBuilder;
exports.epgModelBuilder = new EPGModelBuilder();
