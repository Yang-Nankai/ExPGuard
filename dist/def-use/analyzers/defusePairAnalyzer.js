"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defUsePairAnalyzer = exports.DefUsePairAnalyzer = void 0;
const set_1 = __importDefault(require("../../utils/set"));
const duPairFactory_1 = require("../factories/duPairFactory");
const varUseDefFactory_1 = require("../factories/varUseDefFactory");
class DefUsePairAnalyzer {
    findDUPairs(model) {
        if (!(model === null || model === void 0 ? void 0 : model.graph))
            return;
        const dupairs = new Map();
        for (const node of model.graph.allNodes) {
            const nodeCUse = this.getUsedDefs(node.reachIns, node.cuse);
            const nodePUse = this.getUsedDefs(node.reachIns, node.puse);
            // @Note: elem is an instance of VarDef object
            /// Initialization
            if (node.reachIns) {
                for (let elem of node.reachIns.values()) {
                    var pairs = dupairs.get(elem.var) || new set_1.default();
                    dupairs.set(elem.var, pairs);
                }
            }
            /// add Def-Use pairs of c-use
            for (const elem of nodeCUse.values()) {
                var pairs = dupairs.get(elem.var);
                if (pairs) {
                    /// Assume each id of CFG nodes will be different
                    pairs.add(duPairFactory_1.dupairFactory.create(elem.def.fromNode, elem.use));
                    dupairs.set(elem.var, pairs);
                }
            }
            /// add Def-Use pairs of p-use
            for (const elem of nodePUse.values()) {
                var pairs = dupairs.get(elem.var);
                // PDG control dependence edges
                const ifStatement = node.parent;
                if (ifStatement) {
                    pairs.add(duPairFactory_1.dupairFactory.create(elem.def.fromNode, [
                        ifStatement,
                        ifStatement.consequent,
                        ifStatement.alternate,
                    ])); // node, true, false
                }
                dupairs.set(elem.var, pairs);
            }
        }
        model.dupairs = dupairs;
    }
    /**
     * Get used definitions by getting the intersection of RD and USE
     */
    getUsedDefs(defs, used) {
        if (!(defs instanceof set_1.default) || !(used instanceof set_1.default)) {
            return new set_1.default();
        }
        const usedDefinitions = new set_1.default();
        for (const varuse of used) {
            const useVar = varuse.var;
            if (!useVar || !useVar.scope)
                continue;
            const name = useVar.name;
            const chain = useVar.scope.scopeChain;
            for (const scope of chain) {
                const vardef = defs.find((vardef) => vardef.var.name === name && vardef.var.scope === scope);
                if (vardef) {
                    usedDefinitions.add(varUseDefFactory_1.varUseDefFactory.createFromVarUse(varuse, vardef.def));
                    break;
                }
            }
        }
        return usedDefinitions;
    }
}
exports.DefUsePairAnalyzer = DefUsePairAnalyzer;
exports.defUsePairAnalyzer = new DefUsePairAnalyzer();
