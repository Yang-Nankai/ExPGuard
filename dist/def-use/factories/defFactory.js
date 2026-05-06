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
exports.defFactory = exports.DefFactory = void 0;
const def_1 = __importStar(require("../types/def"));
const builtinRegistry_1 = require("../builtins/builtinRegistry");
const logger_1 = __importDefault(require("../../utils/logger"));
const errorCode_1 = require("../../utils/errorCode");
const interProceduralAnalyzer_1 = require("../analyzers/interProceduralAnalyzer");
/**
 * Factory for creating specific Def subclasses.
 */
class DefFactory {
    create(def) {
        return def;
    }
    /**
     * Rebase a Def onto a new FlowNode.
     * Keeps semantic identity but changes control-flow origin.
     */
    static rebase(def, newFlowNode) {
        if (!def_1.default.isDef(def)) {
            errorCode_1.Errors.DFGError(`rebase(): not a Def (${typeof def})`);
        }
        return def.cloneShallow(newFlowNode);
    }
    /**
     * Create unknown definition
     */
    createUnknownDef(from) {
        return new def_1.UnknownDef(from);
    }
    /**
     * Create undefined definition
     */
    createUndefinedDef(from) {
        return new def_1.UndefinedDef(from);
    }
    /**
     * Create literal definition
     */
    createLiteralDef(from, value) {
        return new def_1.LiteralDef(from, value);
    }
    /**
     * Create implicit definition
     */
    createImplicitDef(from, defs) {
        return new def_1.ImplicitDef(from, defs);
    }
    /**
     * Create object definition
     */
    createObjectDef(from, proto = null) {
        return new def_1.ObjectDef(from, proto);
    }
    /**
     * Create function definition
     */
    createFunctionDef(from, functionNode, isConstructable = true) {
        return new def_1.FunctionDef(from, functionNode, isConstructable);
    }
    /**
     * Built-in function definition
     */
    createBuiltInFunctionDef(from, name, semanticExec = null) {
        return new def_1.BuiltInFunctionDef(from, name, semanticExec);
    }
    /**
     * Promise definition
     */
    createPromiseDef(fromNode, resolvedDef) {
        return new def_1.PromiseDef(fromNode, resolvedDef);
    }
    /**
     * Global Definition
     */
    createGlobalDef(from, scope) {
        return new def_1.GlobalDef(from, scope);
    }
    /**
     * Create a concrete Array object instance.
     * Note: elements are assigned as numeric string keys.
     */
    static createArrayInstanceDef(from, astNode, elements = []) {
        var _a;
        // create Array instance from createClassInstanceDef
        const arrayCtor = (_a = builtinRegistry_1.BuiltInRegistry.getArrayConstructor()) !== null && _a !== void 0 ? _a : null;
        const arrInstance = this.createClassInstanceDef(arrayCtor, from, astNode, elements);
        return arrInstance;
    }
    /**
     * Create a concrete Uint8Array object instance.
     */
    static createUint8ArrayInstanceDef(from, astNode, args = []) {
        const uint8ArrayCtor = builtinRegistry_1.BuiltInRegistry.getUnit8ArrayConstructor();
        const uint8ArrayInstance = this.createClassInstanceDef(uint8ArrayCtor, from, astNode, args);
        return uint8ArrayInstance;
    }
    /**
     * Create a concrete URLSearchParams object instance.
     */
    static createURLSearchParamsInstanceDef(from, astNode, args = []) {
        const spCtor = builtinRegistry_1.BuiltInRegistry.getConstructor("URLSearchParams");
        const searchParamsInstance = this.createClassInstanceDef(spCtor, from, astNode, args);
        return searchParamsInstance;
    }
    /**
     * Create an instance ObjectDef when `new classA(...)` is encountered.
     * This simulates JavaScript runtime behavior where `new` returns an object.
     */
    static createClassInstanceDef(constructor, cfgNode, astNode, argsDef = []) {
        var _a;
        // Distinguishing PromiseDef
        // TODO: Here need to validate, more complex examples
        const isPromise = constructor === builtinRegistry_1.BuiltInRegistry.getPromiseConstructor();
        const instance = isPromise
            ? new def_1.PromiseDef(cfgNode)
            : new def_1.ObjectDef(cfgNode);
        if (!def_1.default.isFunctionDef(constructor)) {
            logger_1.default.error(`createClassInstanceDef(): constructor is not a FunctionDef (${typeof constructor})`);
            return instance;
        }
        const ctor = constructor;
        const ctorFn = ctor.getConstructor();
        // Set proto
        instance.proto =
            (_a = ctor.prototypeObject) !== null && _a !== void 0 ? _a : builtinRegistry_1.BuiltInRegistry.getObjectPrototype();
        if (!def_1.default.isFunctionDef(ctorFn))
            return instance;
        interProceduralAnalyzer_1.interAnalyzer.analyze(cfgNode, ctorFn, argsDef, instance, astNode);
        return instance;
    }
}
exports.DefFactory = DefFactory;
/** Singleton instance */
exports.defFactory = new DefFactory();
