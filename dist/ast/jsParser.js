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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = exports.JSParser = void 0;
const acorn_1 = __importDefault(require("acorn"));
const acornLoose = __importStar(require("acorn-loose"));
const errorCode_1 = require("../utils/errorCode");
/**
 * Default Acorn parsing options.
 * Centralized for consistency and maintainability.
 */
const DEFAULT_PARSE_OPTIONS = {
    ecmaVersion: "latest",
    sourceType: "module",
    ranges: true,
    locations: true,
};
/**
 * Normalize and merge user-provided options with defaults.
 */
function normalizeOptions(options) {
    var _a, _b, _c, _d;
    return Object.assign(Object.assign(Object.assign({}, DEFAULT_PARSE_OPTIONS), options), { sourceType: (_a = options === null || options === void 0 ? void 0 : options.sourceType) !== null && _a !== void 0 ? _a : DEFAULT_PARSE_OPTIONS.sourceType, ecmaVersion: (_b = options === null || options === void 0 ? void 0 : options.ecmaVersion) !== null && _b !== void 0 ? _b : DEFAULT_PARSE_OPTIONS.ecmaVersion, ranges: (_c = options === null || options === void 0 ? void 0 : options.ranges) !== null && _c !== void 0 ? _c : DEFAULT_PARSE_OPTIONS.ranges, locations: (_d = options === null || options === void 0 ? void 0 : options.locations) !== null && _d !== void 0 ? _d : DEFAULT_PARSE_OPTIONS.locations });
}
/**
 * JSParser is responsible for parsing JavaScript code into an ESTree-compatible AST.
 */
class JSParser {
    /**
     * Parse JavaScript code into an AST.
     *
     * Strategy:
     * 1. acorn (module)
     * 2. acorn (script) if module fails
     * 3. acorn-loose as a final fallback
     */
    parseAST(code, options) {
        const baseOptions = normalizeOptions(options);
        const errors = [];
        // 1. Try strict acorn parse (original sourceType)
        try {
            return acorn_1.default.parse(code, baseOptions);
        }
        catch (err) {
            errors.push(`[acorn:${baseOptions.sourceType}] ${err.message}`);
        }
        // 2. Retry with script if sourceType === module
        if (baseOptions.sourceType === "module") {
            try {
                return acorn_1.default.parse(code, Object.assign(Object.assign({}, baseOptions), { sourceType: "script" }));
            }
            catch (err) {
                errors.push(`[acorn:script] ${err.message}`);
            }
        }
        // 3. Fallback to acorn-loose
        try {
            return acornLoose.parse(code, Object.assign({}, baseOptions));
        }
        catch (err) {
            errors.push(`[acorn-loose] ${err.message}`);
        }
        // All strategies failed
        throw errorCode_1.Errors.ParserError(`Failed to parse JavaScript code using all strategies:\n` +
            errors.map((e) => `- ${e}`).join("\n"));
    }
}
exports.JSParser = JSParser;
exports.parser = new JSParser();
