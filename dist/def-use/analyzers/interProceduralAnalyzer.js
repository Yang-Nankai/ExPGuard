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
exports.interAnalyzer = exports.InterProceduralAnalyzer = void 0;
const def_1 = __importStar(require("../types/def"));
const functionCallCache_1 = require("../utils/functionCallCache");
const functionCallItem_1 = require("../utils/functionCallItem");
const functionCallStack_1 = require("../utils/functionCallStack");
const defFactory_1 = require("../factories/defFactory");
const range_1 = require("../types/range");
const modelCtrl_1 = require("../../model/modelCtrl");
const reachingDefinitionAnalyzer_1 = require("./reachingDefinitionAnalyzer");
const patternAwareTypeHandler_1 = require("../handlers/patternAwareTypeHandler");
const errorCode_1 = require("../../utils/errorCode");
const logger_1 = __importDefault(require("../../utils/logger"));
const taint_1 = require("../../taint");
const config_1 = __importDefault(require("../../config"));
const fileTimer_1 = require("../../utils/fileTimer");
/**
 * Function call (inter-procedural) analyzer
 */
class InterProceduralAnalyzer {
    constructor() {
        var _a;
        this.callStack = new functionCallStack_1.FunctionCallStack();
        this.callCache = new functionCallCache_1.FunctionCallCache((_a = config_1.default.functionCallCacheSize) !== null && _a !== void 0 ? _a : 4196);
    }
    /**
     * Analyze a function call with inter-procedural analysis
     * Optimized with smart caching and side-effect detection
     *
     * analyze()
     *  ├─ builtin → return
     *  ├─ function
     *  │   ├─ stack / cache / recursion
     *  │   ├─ invokeCalleeModel()
     *  │   │    ├─ feature semantic
     *  │   │    └─ cfg model
     *  │   ├─ side effect mark
     *  │   └─ return
     *  └─ fallback unknown
     */
    analyze(caller, callee, argDefs, thisDef, astNode) {
        if (fileTimer_1.fileTimerManager.checkCurrentTimeout()) {
            return defFactory_1.defFactory.createUnknownDef(caller);
        }
        // If implicit set, need analyze every element
        if (def_1.default.isImplicitDef(callee)) {
            const combinedResults = new def_1.ImplicitDef(caller);
            callee.forEach((singleCallee) => {
                const result = this.analyze(caller, singleCallee, argDefs, thisDef, astNode);
                combinedResults.add(result);
            });
            return combinedResults.cloneShallow(caller);
        }
        // If builtin function, directly call it
        if (def_1.default.isBuiltInFunctionDef(callee)) {
            return callee.returnDef(argDefs, caller, astNode, thisDef);
        }
        // User-defined function
        if (def_1.default.isFunctionDef(callee)) {
            // Call depth limiting
            if (this.callStack.isMaxDepth()) {
                return defFactory_1.defFactory.createUnknownDef(caller);
            }
            const frame = new functionCallItem_1.FunctionCallItem(caller, callee, argDefs, thisDef);
            // If cached, return cached result
            // const cached = this.callCache.get(frame);
            // if (cached) return cached;
            // Recursion and reentrancy Detection
            if (this.callStack.isReentrant(frame)) {
                return defFactory_1.defFactory.createUnknownDef(caller);
            }
            this.callStack.push(frame);
            try {
                this.analyzeUserDefinedFunction(frame);
                // if (!frame.hasSideEffects) this.setFunctionCallCache(frame);
                return this.getCurrentReturnDef();
            }
            finally {
                this.callStack.pop();
            }
        }
        // Fallback to unknown def
        const returnDef = defFactory_1.defFactory.createUnknownDef(caller);
        if (callee.isTainted)
            taint_1.taintManager.propagateTaint(callee, returnDef, astNode, "RETURN", "fallback-return");
        return returnDef;
    }
    /**
     * Analyze a user-defined function via inter-procedural analysis.
     */
    analyzeUserDefinedFunction(frame) {
        var _a, _b, _c;
        const { caller, callee, argDefs, thisDef } = frame;
        // side effect, args/this must not exist taint
        const argTainted = argDefs.every((def) => def.isTainted);
        if (argTainted && (thisDef === null || thisDef === void 0 ? void 0 : thisDef.isTainted)) {
            frame.markHasSideEffects();
        }
        if (!callee.functionNode || !caller.scopeTree) {
            logger_1.default.debug("callee.functionNode or caller.scopeTree is null");
            return;
        }
        const calleeScope = (_a = callee.fromNode.scopeTree) === null || _a === void 0 ? void 0 : _a.getScopeByRange(new range_1.Range(callee.functionNode.range));
        if (!callee.fromNode.scopeTree || !calleeScope) {
            logger_1.default.debug("callee.scope or callee.scopeTree is null");
            return;
        }
        const calleeModel = modelCtrl_1.modelController.getIntraProceduralModelByMainlyRelatedScopeFromAPageModels(callee.fromNode.scopeTree, calleeScope);
        if (calleeModel === null || calleeModel === void 0 ? void 0 : calleeModel.featureSemantic) {
            const returnDef = (_b = calleeModel.featureSemantic.exec(argDefs, caller, thisDef)) !== null && _b !== void 0 ? _b : defFactory_1.defFactory.createUndefinedDef(caller);
            this.setCurrentReturnDef(returnDef);
            if (calleeModel.featureSemantic.hasSideEffect)
                this.setCurrentSideEffects();
            return;
        }
        if (!((_c = calleeModel === null || calleeModel === void 0 ? void 0 : calleeModel.graph) === null || _c === void 0 ? void 0 : _c.entryNode))
            return;
        const entryNode = calleeModel.graph.entryNode;
        this.bindFunctionParameters(entryNode, calleeScope, argDefs);
        /** ---- side effect snapshot (before) ---- */
        const beforeSnapshot = this.calcSideEffectSnapshot(calleeScope);
        reachingDefinitionAnalyzer_1.reachingDefAnalyzer.doAnalysis(calleeModel);
        /** ---- side effect snapshot (after) ---- */
        const afterSnapshot = this.calcSideEffectSnapshot(calleeScope);
        if (beforeSnapshot !== afterSnapshot) {
            this.setCurrentSideEffects();
        }
    }
    /**
     * Bind actual arguments to formal parameters using pattern-aware logic.
     */
    bindFunctionParameters(entryNode, scope, argDefs) {
        var _a;
        const fnAst = scope.ast;
        (_a = fnAst === null || fnAst === void 0 ? void 0 : fnAst.params) === null || _a === void 0 ? void 0 : _a.forEach((param, index) => {
            (0, patternAwareTypeHandler_1.patternAwareTypeHandler)(entryNode, param, argDefs[index]);
        });
    }
    /**
     * Cache function call result if appropriate
     */
    setFunctionCallCache(frame) {
        if (!frame || !frame.returnDef)
            return;
        this.callCache.set(frame, frame.returnDef);
    }
    /**
     * Mark current call frame as having side effects
     */
    setCurrentSideEffects() {
        // Mark all frames in call stack that could be affected
        for (const item of this.callStack.list()) {
            item.markHasSideEffects();
        }
    }
    /**
     * Set return definition for current call frame
     */
    setCurrentReturnDef(returnDef) {
        const frame = this.callStack.peek();
        if (frame)
            frame.returnDef = returnDef;
    }
    /**
     * Get return definition for current call frame
     */
    getCurrentReturnDef() {
        const frame = this.callStack.peek();
        if (frame)
            return frame.returnDef;
        else
            throw errorCode_1.Errors.DFGError("Call Stack should has the frame.");
    }
    /**
     * Get this definition for current call frame
     */
    getCurrentThisDef() {
        var _a;
        const frame = this.callStack.peek();
        return (_a = frame === null || frame === void 0 ? void 0 : frame.thisDef) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Get current call frame
     */
    getCurrentFrame() {
        var _a;
        return (_a = this.callStack.peek()) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Get cache statistics
     */
    getCacheReport() {
        return this.callCache.getStats();
    }
    /**
     * Reset call cache and call stack
     */
    reset() {
        this.callCache.clear();
        this.callStack.clear();
    }
    /**
     * Calculate a stable snapshot hash for side-effect detection.
     */
    calcSideEffectSnapshot(calleeScope) {
        const PRIME1 = 1315423911;
        const PRIME2 = 2654435761;
        const MOD = 2 ** 53 - 1;
        let hash = 0;
        const mix = (def) => {
            hash = ((hash) ^ (def.version * PRIME2)) % MOD;
        };
        /** outer scopes */
        let scope = calleeScope.parent;
        while (scope) {
            scope.reachIns.forEach((def) => {
                mix(def);
            });
            scope = scope.parent;
        }
        return hash;
    }
}
exports.InterProceduralAnalyzer = InterProceduralAnalyzer;
exports.interAnalyzer = new InterProceduralAnalyzer();
