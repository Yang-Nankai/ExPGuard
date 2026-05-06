"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = handleException;
exports.clearTotalErrors = clearTotalErrors;
exports.outputTotalErrors = outputTotalErrors;
// exceptionhandler.ts
const logger_1 = __importDefault(require("./logger"));
let totalErrors = [];
function handleException(error, infoMsg, errorMsg) {
    if (infoMsg)
        logger_1.default.info(infoMsg);
    if (errorMsg)
        logger_1.default.error(errorMsg);
    if (error)
        logger_1.default.error(error);
    totalErrors.push({ errorMsg, error });
}
function clearTotalErrors() {
    totalErrors = [];
}
function outputTotalErrors() {
    totalErrors.forEach(item => {
        if (item.errorMsg)
            logger_1.default.info(item.errorMsg);
        logger_1.default.info(item.error);
    });
}
