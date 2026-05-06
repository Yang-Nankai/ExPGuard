"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModelRegistry = void 0;
const def_1 = __importDefault(require("../types/def"));
const defFactory_1 = require("../factories/defFactory");
const selector_1 = require("./selector");
const nodeQuery_1 = require("./nodeQuery");
const scope_1 = __importDefault(require("../../scope/scope"));
const builtinRegistry_1 = require("../builtins/builtinRegistry");
class FeatureModelRegistry {
    static register(model) {
        this.registry.push(model);
    }
    static matchFunctions(ast) {
        const results = [];
        for (const feature of this.registry) {
            const functions = feature.matchFunctions(ast) || [];
            for (const fn of functions) {
                results.push({
                    feature,
                    functionNode: fn,
                });
            }
        }
        return results;
    }
}
exports.FeatureModelRegistry = FeatureModelRegistry;
FeatureModelRegistry.registry = [];
FeatureModelRegistry.register({
    id: "browser-polyfill",
    matchFunctions(ast) {
        return nodeQuery_1.NodeQuery.from(ast)
            .select(selector_1.Selector.type("FunctionExpression"))
            .has(selector_1.Selector.type("IfStatement"))
            .has(selector_1.Selector.type("AssignmentExpression")
            .attrEq("left.type", "MemberExpression")
            .attrEq("left.property.name", "exports")
            .has(selector_1.Selector.type("CallExpression").has(selector_1.Selector.type("Identifier").attrEq("name", "chrome"))))
            .result();
    },
    hasSideEffect: true,
    exec(args, callNode, _thisDef) {
        var _a, _b;
        if (args.length < 1)
            return null;
        const moduleDef = args[0];
        if (!def_1.default.isObjectDef(moduleDef))
            return null;
        const rootScope = (_a = callNode.scopeTree) === null || _a === void 0 ? void 0 : _a.root;
        if (!rootScope || !scope_1.default.isPageScope(rootScope))
            return null;
        // const exportsDef = defFactory.createGlobalDef(callNode, rootScope);
        const exportsDef = (_b = builtinRegistry_1.BuiltInRegistry.getChromeObject()) !== null && _b !== void 0 ? _b : defFactory_1.defFactory.createUnknownDef(callNode);
        moduleDef.setProperty("exports", exportsDef);
        return exportsDef;
    },
});
