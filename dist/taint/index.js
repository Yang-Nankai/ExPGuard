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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taintManager = exports.TaintManager = void 0;
const manager_1 = require("./manager");
__exportStar(require("./types"), exports);
__exportStar(require("./report"), exports);
var manager_2 = require("./manager");
Object.defineProperty(exports, "TaintManager", { enumerable: true, get: function () { return manager_2.TaintManager; } });
// Singleton
exports.taintManager = new manager_1.TaintManager();
