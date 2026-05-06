"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtInAnalyzer = exports.BuiltInAnalyzer = void 0;
const scope_1 = __importDefault(require("../../scope/scope"));
const builtinRegistry_1 = require("../builtins/builtinRegistry");
const defFactory_1 = require("../factories/defFactory");
const utils_1 = require("../utils/utils");
class BuiltInAnalyzer {
    analyze(model) {
        if (!(model === null || model === void 0 ? void 0 : model.graph))
            return;
        builtinRegistry_1.BuiltInRegistry.initialize();
        // FIX: attribute should taint in every model
        builtinRegistry_1.BuiltInRegistry.registerAttributeSources();
        const scope = model.mainlyRelatedScope;
        const entryNode = model.graph.entryNode;
        if (!scope)
            return;
        const builtIns = scope.builtInObjects; // [{ name: "Array" }, ...]
        const builtInVars = scope.builtInObjectVars; // Map(name → Var)
        builtIns === null || builtIns === void 0 ? void 0 : builtIns.forEach((name) => {
            const varSlot = builtInVars.get(name);
            if (!varSlot)
                return;
            if (["window", "globalThis", "global", "self"].includes(name) && scope_1.default.isPageScope(scope)) {
                const def = defFactory_1.defFactory.createGlobalDef(entryNode, scope);
                // [LastReachIns]
                (0, utils_1.setReachingDef)(varSlot, def);
            }
            else {
                const def = builtinRegistry_1.BuiltInRegistry.registry.get(name);
                if (!def)
                    return;
                // [LastReachIns]
                (0, utils_1.setReachingDef)(varSlot, def);
            }
        });
    }
}
exports.BuiltInAnalyzer = BuiltInAnalyzer;
exports.builtInAnalyzer = new BuiltInAnalyzer();
