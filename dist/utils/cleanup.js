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
exports.cleanupArtifacts = cleanupArtifacts;
// utils/cleanup.ts
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
function hasSink(summary) {
    return typeof (summary === null || summary === void 0 ? void 0 : summary.sinkCount) === "number" && summary.sinkCount > 0;
}
function shouldKeepArtifacts(policy, summary) {
    switch (policy) {
        case "all":
            return true;
        case "keep_if_sink":
            return hasSink(summary);
        case "none":
        default:
            return false;
    }
}
function removeDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.rm(dir, { recursive: true, force: true });
            logger_1.default.debug(`[CLEANUP] Removed directory: ${dir}`);
        }
        catch (err) {
            logger_1.default.warn(`[CLEANUP] Failed to remove directory: ${dir}`);
            logger_1.default.warn(String(err));
        }
    });
}
function moveManifestToOutputDir(outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const manifestSrc = path_1.default.join(outputDir, "unpacked", "manifest.json");
            const manifestDest = path_1.default.join(outputDir, "manifest.json");
            // check file
            yield promises_1.default.access(manifestSrc);
            // move file
            yield promises_1.default.rename(manifestSrc, manifestDest);
        }
        catch (err) {
            logger_1.default.warn(`[CLEANUP] Failed to move manifest.json: ${err.message}`);
        }
    });
}
function cleanupArtifacts(outputDir, summary) {
    return __awaiter(this, void 0, void 0, function* () {
        const policy = config_1.default.artifactRetentionPolicy;
        if (shouldKeepArtifacts(policy, summary)) {
            logger_1.default.debug(`[CLEANUP] Skip cleanup due to policy=${policy}`);
            return;
        }
        const unpackedDir = path_1.default.join(outputDir, "unpacked");
        // move manifest.json
        yield moveManifestToOutputDir(outputDir);
        yield removeDir(unpackedDir);
    });
}
