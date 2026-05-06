"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.runSingleTask = runSingleTask;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const epgmodelbuilder_1 = require("./epgmodelbuilder");
const taint_1 = require("./taint");
const logger_1 = __importStar(require("./utils/logger"));
const interProceduralAnalyzer_1 = require("./def-use/analyzers/interProceduralAnalyzer");
const cleanup_1 = require("./utils/cleanup");
const timer_1 = require("./utils/timer");
function serializeError(err) {
    var _a;
    if (err instanceof Error) {
        return {
            type: err.name,
            message: (_a = err.stack) !== null && _a !== void 0 ? _a : err.message,
        };
    }
    return {
        type: "UnknownError",
        message: String(err),
    };
}
function safeWriteFile(filePath, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.writeFile(filePath, content, "utf-8");
        }
        catch (err) {
            logger_1.default.error(`[] Failed to write file: ${filePath}`);
            logger_1.default.error(String(err));
        }
    });
}
function runSingleTask(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const outputDir = opts.outputDir;
        yield promises_1.default.mkdir(outputDir, { recursive: true });
        (0, logger_1.setLogFile)(path_1.default.join(outputDir, "analysis.log"));
        const timer = new timer_1.Timer("EPG Run Analysis Task");
        timer.start();
        let status = "success";
        let taskError;
        try {
            yield epgmodelbuilder_1.epgModelBuilder.analyze({
                extensionPath: opts.input,
                extensionType: opts.sourceType,
                outputPath: outputDir,
                extensionId: (_a = opts.extensionId) !== null && _a !== void 0 ? _a : "unknown",
                extensionVersion: opts.extensionVersion,
            });
        }
        catch (err) {
            status = "error";
            taskError = serializeError(err);
            logger_1.default.error(taskError.message);
        }
        finally {
            timer.stop();
            const fileStats = (_c = (_b = epgmodelbuilder_1.epgModelBuilder.extensionContext) === null || _b === void 0 ? void 0 : _b.getScriptsSummary()) !== null && _c !== void 0 ? _c : [];
            //  try {
            //    const report = printTaintReportsCLI(
            //      taintManager.generateGlobalReport(),
            //    );
            //    await fs.appendFile(
            //      path.join(outputDir, "report.txt"),
            //      report,
            //      "utf-8",
            //    );
            //  } catch (err) {
            //    logger.error("[REPORT] Failed to generate/write report");
            //  }
            const baseSummary = (_e = (_d = taint_1.taintManager.getGlobalSummary) === null || _d === void 0 ? void 0 : _d.call(taint_1.taintManager)) !== null && _e !== void 0 ? _e : {};
            const summary = Object.assign({ extensionId: opts.extensionId, extensionVersion: opts.extensionVersion, sourceType: opts.sourceType, status, duration: timer.getDuration(), files: fileStats, totalFiles: fileStats.length, totalSize: fileStats.reduce((acc, f) => acc + f.size, 0), cacheStats: (_f = interProceduralAnalyzer_1.interAnalyzer.getCacheReport) === null || _f === void 0 ? void 0 : _f.call(interProceduralAnalyzer_1.interAnalyzer), errorType: taskError === null || taskError === void 0 ? void 0 : taskError.type, errorMessage: taskError === null || taskError === void 0 ? void 0 : taskError.message }, baseSummary);
            yield safeWriteFile(path_1.default.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
            // cleanup
            yield (0, cleanup_1.cleanupArtifacts)(outputDir, summary);
            logger_1.default.info(`Analysis finished with status=${status}`);
        }
    });
}
