"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMemoryUsage = checkMemoryUsage;
const config_1 = __importDefault(require("../config"));
/**
 * Check memory usage.
 * Limits memory usage based on the configured maximum memory (in MB).
 */
function checkMemoryUsage() {
    // Get current heap usage in MB
    const bytesUsed = process.memoryUsage().heapUsed;
    const megabytesUsed = bytesUsed / 1000000;
    // Compare with memory limit from config
    return megabytesUsed <= config_1.default.analysisMemoryMb;
}
