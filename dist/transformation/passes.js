"use strict";
/**
 * Preprocess JavaScript Code and Transform
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPipeline = createPipeline;
// @ts-ignore
const pass_1 = __importDefault(require("./esmangle/lib/pass"));
/**
 * create and return a group of ESMangle pipelines
 */
function createPipeline() {
    const modules = [
        /** nums.map(n => n * 2) --> nums.map(n => { return n * 2; }) */
        'pass/arrow-function-block',
        /** (a, (b, c), d) --> (a, b, c, d) */
        'pass/reduce-sequence-expression',
        /**  a = (b++, c++, d++) --> b++, c++, a = d++ */
        'pass/flatten-assignment-sequence',
        /** removes EmptyStatement nodes */
        'pass/remove-empty-statement',
        /** removes useless BlockStatement and flatten + minimize the subtree */
        // 'pass/remove-wasted-blocks',
    ];
    const pipeline = [
        modules.map((m) => pass_1.default.require(m))
    ];
    return pipeline;
}
