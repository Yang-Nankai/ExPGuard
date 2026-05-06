"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.BaseError = exports.ErrorCode = void 0;
const config_1 = __importDefault(require("../config"));
const exceptionHandler_1 = require("./exceptionHandler");
/**
 * Error Code Definitions
 */
exports.ErrorCode = {
    UNKNOWN_ERROR: 0xf0,
    LOADER_ERROR: 0x10, // Extension Loader Error
    OPTIMIZER_ERROR: 0x11, // Code Optimizer Error
    CFG_ERROR: 0x12, // Control Flow Graph Error
    DFG_ERROR: 0x13, // Data Flow Graph Error
    PARSER_ERROR: 0x14, // AST Parser Error
    VALIDATOR_ERROR: 0x15, // Validator Error
    SCOPE_ERROR: 0x16, // Scope Tree Error
    TIMEOUT_ERROR: 0x17, // Timeout Error
    TAINT_ERROR: 0x18, // Taint Error
    // ....
    toString(code) {
        switch (code) {
            case 0x10: return "failed to load the extension";
            case 0x11: return "failed to optimize the code";
            case 0x12: return "failed to generate control flow graph";
            case 0x13: return "failed to generate data flow graph";
            case 0x14: return "failed to parse the AST";
            case 0x15: return "failed to validate the AST";
            case 0x16: return "failed to build scope tree";
            case 0x17: return "timeout to analyze the extension";
            case 0x18: return "failed to build taint info";
            // ...
            case 0xf0: return "unknown error occurred";
            default: return "unknown error code";
        }
    }
};
/**
 * Base Error Class
 */
class BaseError extends Error {
    constructor(message, code = 0, description = "", errorToleranceFactor = 0) {
        super(message);
        this.name = "BaseError";
        this.code = code;
        this.description = description;
        this.errorToleranceFactor = errorToleranceFactor;
    }
    toString() {
        return this.message === this.description
            ? this.message
            : `${this.description} : ${this.message}`;
    }
}
exports.BaseError = BaseError;
function genClass(errMeta) {
    class GeneratedError extends BaseError {
        constructor(message) {
            super(message || errMeta.description, errMeta.code, errMeta.description, errMeta.errorToleranceFactor);
            this.name = errMeta.name;
        }
    }
    return (message, headMsg, opts) => {
        const errInstance = new GeneratedError(message);
        if (opts === null || opts === void 0 ? void 0 : opts.noThrow) {
            try {
                return handleError(errInstance, headMsg);
            }
            catch (e) {
                (0, exceptionHandler_1.handleException)(e, errMeta.name, e.toString());
                return e;
            }
        }
        else {
            handleError(errInstance, headMsg);
        }
    };
}
// ==================== Errors Collection ====================
exports.Errors = {
    LoaderError: genClass({
        name: "LoaderError",
        code: 0x10,
        description: "failed to load the extension",
        errorToleranceFactor: 0,
    }),
    OptimizerError: genClass({
        name: "OptimizerError",
        code: 0x11,
        description: "failed to optimize the code",
        errorToleranceFactor: 0,
    }),
    CFGError: genClass({
        name: "CFGError",
        code: 0x12,
        description: "failed to generate control flow graph",
        errorToleranceFactor: 0,
    }),
    DFGError: genClass({
        name: "DFGError",
        code: 0x13,
        description: "failed to generate data flow graph",
        errorToleranceFactor: 0,
    }),
    ParserError: genClass({
        name: "ParserError",
        code: 0x14,
        description: "failed to parse the AST",
        errorToleranceFactor: 0,
    }),
    ValidatorError: genClass({
        name: "ValidatorError",
        code: 0x15,
        description: "failed to validate the fragment",
        errorToleranceFactor: 0,
    }),
    ScopeError: genClass({
        name: "ScopeError",
        code: 0x16,
        description: "failed to build scope tree",
        errorToleranceFactor: 0,
    }),
    TimeoutError: genClass({
        name: "TimeoutError",
        code: 0x17,
        description: "timeout to analyze the extension",
        errorToleranceFactor: 0,
    }),
    TaintError: genClass({
        name: "TaintError",
        code: 0x18,
        description: "failed to build taint info",
        errorToleranceFactor: 0,
    }),
    UnknownError: genClass({
        name: "UnknownError",
        code: 0xf0,
        description: "an unknown error occurs",
        errorToleranceFactor: 0,
    }),
};
/**
 * Error Handler
 */
function handleError(err, headMsg) {
    if (headMsg && headMsg.trim() !== "") {
        const originalToString = err.toString.bind(err);
        err.toString = () => `${headMsg}: ${originalToString()}`;
    }
    if (!errorTolerance(err)) {
        throw err;
    }
    else {
        (0, exceptionHandler_1.handleException)(err, err.toString(), err.toString());
    }
    return err;
}
/**
 * Error Tolerance Checker
 */
function errorTolerance(err) {
    const builtinError = !(err instanceof BaseError) && config_1.default.errorToleranceFactor <= 6;
    const baseError = err instanceof BaseError && err.errorToleranceFactor < config_1.default.errorToleranceFactor;
    return !(builtinError || baseError);
}
