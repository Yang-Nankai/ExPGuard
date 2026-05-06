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
exports.ExtensionSourceType = void 0;
exports.loadExtensionAsync = loadExtensionAsync;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const errorCode_1 = require("../utils/errorCode");
const crxExtractor_1 = require("../loader/crxExtractor");
const validation_1 = require("../utils/validation");
const logger_1 = __importDefault(require("../utils/logger"));
const crxDownloader_1 = require("../loader/crxDownloader");
const fileHandler_1 = require("../utils/fileHandler");
const extensionContext_1 = require("./extensionContext");
var ExtensionSourceType;
(function (ExtensionSourceType) {
    ExtensionSourceType["CRX"] = "CRX";
    ExtensionSourceType["DIR"] = "DIR";
    ExtensionSourceType["WEB"] = "WEB";
})(ExtensionSourceType || (exports.ExtensionSourceType = ExtensionSourceType = {}));
/**
 * Handle extension loading from various sources (CRX file, directory, Web Store)
 */
function loadExtensionAsync(source, inputPath, outputDir, extensionId) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (source) {
            case ExtensionSourceType.CRX: {
                (0, validation_1.assertValidExtensionId)(extensionId);
                (0, validation_1.assertFileExists)(inputPath);
                yield loadFromCrx(inputPath, outputDir, extensionId);
                break;
            }
            case ExtensionSourceType.WEB: {
                (0, validation_1.assertValidExtensionId)(extensionId);
                yield loadFromWeb(extensionId, outputDir);
                break;
            }
            case ExtensionSourceType.DIR: {
                (0, validation_1.assertDirectoryExists)(inputPath);
                yield loadFromDir(inputPath, outputDir);
                break;
            }
        }
        if (fs_1.default.existsSync(outputDir) && fs_1.default.statSync(outputDir).isDirectory()) {
            return new extensionContext_1.ExtensionContext(extensionId, outputDir);
        }
        throw errorCode_1.Errors.LoaderError("Extension load error!");
    });
}
/**
 * Handle CRX file extraction
 */
function loadFromCrx(inputPath, outputDir, extensionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const extractor = new crxExtractor_1.CrxExtractor(inputPath, outputDir);
        yield extractor.extract();
        const crxId = extractor.getExtensionId();
        const outputPath = extractor.getOutputPath();
        if (extensionId !== crxId) {
            errorCode_1.Errors.LoaderError(`(handleCrx) Provided extensionId (${extensionId}) does not match CRX ID (${crxId})`);
        }
        logger_1.default.info(`Extracted CRX → ID: ${extensionId}, Output: ${outputPath}`);
    });
}
/**
 * Handle loading from extension directory
 */
function loadFromDir(inputPath, outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const manifestPath = path_1.default.join(inputPath, "manifest.json");
        if (!fs_1.default.existsSync(manifestPath)) {
            errorCode_1.Errors.LoaderError("manifest.json not found in directory, maybe not a valid extension directory.");
        }
        const outputPath = yield (0, fileHandler_1.copyDirectoryAsync)(inputPath, outputDir);
        logger_1.default.info(`Copied extension directory ${inputPath} to: ${outputPath}`);
    });
}
/**
 * Download and load extension from Web Store
 */
function loadFromWeb(extensionId, outputDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const downloadPath = yield (0, crxDownloader_1.downloadCrxFromCWS)(extensionId, outputDir);
        if (!downloadPath) {
            errorCode_1.Errors.LoaderError(`Failed to download CRX file for extensionId: ${extensionId}`);
        }
        yield loadFromCrx(downloadPath, outputDir, extensionId);
    });
}
