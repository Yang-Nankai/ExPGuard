"use strict";
/**
 * Winston logger setup
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogFile = setLogFile;
const winston_1 = __importStar(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
/**
 * Ensure log directory exists
 */
function ensureLogDir(logFilePath) {
    const logDir = path_1.default.dirname(logFilePath);
    if (!fs_1.default.existsSync(logDir)) {
        fs_1.default.mkdirSync(logDir, { recursive: true });
    }
}
/**
 * Custom log format
 */
const logFormat = winston_1.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
});
/**
 * Current file transport reference
 * Used for dynamic replacement
 */
let fileTransport = null;
/**
 * Create Winston logger
 */
const logger = winston_1.default.createLogger({
    level: config_1.default.logLevel || "info",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), logFormat),
    transports: [
        new winston_1.transports.Console(),
    ],
});
/**
 * Initialize file logging (optional at startup)
 */
function initFileTransport(logFilePath) {
    if (!logFilePath)
        return;
    ensureLogDir(logFilePath);
    fileTransport = new winston_1.transports.File({
        filename: logFilePath,
    });
    logger.add(fileTransport);
}
// initialize with config value (if provided)
initFileTransport(config_1.default.logFile);
/**
 * Dynamically update log file path at runtime
 */
function setLogFile(logFilePath) {
    var _a;
    ensureLogDir(logFilePath);
    // Remove old file transport if exists
    if (fileTransport) {
        logger.remove(fileTransport);
        (_a = fileTransport.close) === null || _a === void 0 ? void 0 : _a.call(fileTransport);
    }
    // Create and add new file transport
    fileTransport = new winston_1.transports.File({
        filename: logFilePath,
    });
    logger.add(fileTransport);
}
exports.default = logger;
