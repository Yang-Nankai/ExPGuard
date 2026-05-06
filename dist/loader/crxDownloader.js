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
exports.downloadCrxFromCWS = downloadCrxFromCWS;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_proxy_agent_1 = require("https-proxy-agent");
const errorCode_1 = require("../utils/errorCode");
const follow_redirects_1 = require("follow-redirects");
const logger_1 = __importDefault(require("../utils/logger"));
const validation_1 = require("../utils/validation");
const config_1 = __importDefault(require("../config"));
/**
 * Sleep for given milliseconds
 */
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
function buildDownloadUrl(extensionId) {
    return `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${config_1.default.targetChromeVersion}&acceptformat=crx3,puff&x=id%3D${extensionId}%26uc`;
}
function downloadOnce(url, target) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve, reject) => {
            var _a;
            const stream = fs_1.default.createWriteStream(target);
            const req = follow_redirects_1.https.get(url, {
                timeout: config_1.default.retryTimeoutMs,
                agent: ((_a = config_1.default.proxies) === null || _a === void 0 ? void 0 : _a.https)
                    ? new https_proxy_agent_1.HttpsProxyAgent(config_1.default.proxies.https)
                    : undefined,
            }, (res) => {
                if (res.statusCode !== 200) {
                    stream.close();
                    fs_1.default.unlink(target, () => { });
                    return reject(new Error(`HTTP ${res.statusCode}`));
                }
                res.pipe(stream);
                stream.on("finish", () => resolve());
            });
            req.on("error", reject);
            req.on("timeout", () => req.destroy(new Error("CRX download timeout")));
        });
    });
}
/**
 * Download CRX from Chrome Web Store
 */
function downloadCrxFromCWS(extensionId, downloadDir) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, validation_1.validateChromeOrEdgeExtensionId)(extensionId)) {
            throw errorCode_1.Errors.ValidatorError(`Invalid extensionId: ${extensionId}`);
        }
        fs_1.default.mkdirSync(downloadDir, { recursive: true });
        const url = buildDownloadUrl(extensionId);
        const crxPath = path_1.default.join(downloadDir, `${extensionId}.crx`);
        for (let i = 1; i <= config_1.default.maxRetry; i++) {
            try {
                yield downloadOnce(url, crxPath);
                logger_1.default.info(`CRX downloaded: ${crxPath}`);
                return crxPath;
            }
            catch (err) {
                logger_1.default.warn(`CRX download attempt ${i} failed: ${err}`);
                if (i === config_1.default.maxRetry) {
                    throw errorCode_1.Errors.LoaderError(`Failed to download CRX after ${i} attempts`);
                }
                yield sleep(config_1.default.retryDelayMs);
            }
        }
        throw errorCode_1.Errors.LoaderError("Unreachable");
    });
}
