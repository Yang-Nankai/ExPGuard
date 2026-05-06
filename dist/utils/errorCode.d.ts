/**
 * Error Code Definitions
 */
export declare const ErrorCode: {
    UNKNOWN_ERROR: number;
    LOADER_ERROR: number;
    OPTIMIZER_ERROR: number;
    CFG_ERROR: number;
    DFG_ERROR: number;
    PARSER_ERROR: number;
    VALIDATOR_ERROR: number;
    SCOPE_ERROR: number;
    TIMEOUT_ERROR: number;
    TAINT_ERROR: number;
    toString(code: number): string;
};
/**
 * Base Error Class
 */
export declare class BaseError extends Error {
    code: number;
    description: string;
    errorToleranceFactor: number;
    constructor(message: string, code?: number, description?: string, errorToleranceFactor?: number);
    toString(): string;
}
interface ErrorOptions {
    noThrow?: boolean;
}
export declare const Errors: {
    LoaderError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    OptimizerError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    CFGError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    DFGError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    ParserError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    ValidatorError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    ScopeError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    TimeoutError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    TaintError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
    UnknownError: (message?: string, headMsg?: string, opts?: ErrorOptions) => void | BaseError;
};
export {};
