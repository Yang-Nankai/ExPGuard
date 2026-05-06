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
exports.patternAwareTypeHandler = patternAwareTypeHandler;
const defFactory_1 = require("../factories/defFactory");
const def_1 = __importDefault(require("../types/def"));
const walk = __importStar(require("acorn-walk"));
const expressionTypeHandler_1 = require("./expressionTypeHandler");
const utils_1 = require("../utils/utils");
const taint_1 = require("../../taint");
const logger_1 = __importDefault(require("../../utils/logger"));
function patternAwareTypeHandler(cfgNode, node, initType) {
    const currentScope = cfgNode.scope;
    if (!currentScope)
        return;
    const literalFallback = () => defFactory_1.defFactory.createUnknownDef(cfgNode);
    // helper: create VarDef for an Identifier name using given def
    const createForIdentifier = (pattern, def) => {
        // If not exists, set as global
        const name = pattern.name;
        let definedVar = currentScope.getVariable(name) || currentScope.addGlobalVariable(name);
        if (!definedVar)
            return;
        const usedDef = def || literalFallback();
        // [TAINT]
        taint_1.taintManager.propagateTaint(def, usedDef, pattern, "ASSIGN", "pattern-assign");
        // [REACHINS]
        (0, utils_1.setReachingDef)(definedVar, usedDef);
    };
    // recursive visitors for patterns. state = current inferred Def for this pattern
    const visitors = {
        Identifier: (pattern, def, c) => {
            createForIdentifier(pattern, def);
        },
        Property: (property, def, c) => {
            // Property inside ObjectPattern
            // property.key can be Identifier or Literal or Expression
            // property.value is the pattern (Identifier / AssignmentPattern / RestElement / another pattern)
            const keyName = (0, utils_1.resolvePropName)(cfgNode, property.key, property.computed);
            if (def_1.default.isObjectDef(def) && keyName && def.props.has(keyName)) {
                const propDef = def.getProperty(keyName);
                c(property.value, propDef);
            }
            else {
                c(property.value, literalFallback());
            }
        },
        ArrayPattern: (pattern, def, c) => {
            // Array pattern: elements can be patterns or null (holes)
            // If init is objectDef and has numeric keys in staticProps, use them
            for (let idx = 0; idx < pattern.elements.length; idx++) {
                const elem = pattern.elements[idx];
                if (!elem)
                    continue; // hole
                if (def_1.default.isObjectDef(def)) {
                    const maybeDef = def.getProperty(idx.toString());
                    c(elem, maybeDef || literalFallback());
                }
                else {
                    // not object/array-like => fallback
                    c(elem, literalFallback());
                }
            }
        },
        ObjectPattern: (pattern, def, c) => {
            for (const prop of pattern.properties) {
                c(prop, def || literalFallback());
            }
        },
        AssignmentPattern: (pattern, def, c) => {
            // default value in pattern: e.g. `a = 1` where left is Identifier pattern
            // pattern.left is target pattern, pattern.right is default expression
            const defaultDef = pattern.right
                ? (0, expressionTypeHandler_1.expressionTypeHandler)(cfgNode, pattern.right)
                : literalFallback();
            // If we have a base def (from initType), prefer that; otherwise use defaultDef
            const targetDef = def || defaultDef || literalFallback();
            c(pattern.left, targetDef);
        },
        RestElement: (pattern, def, c) => {
            c(pattern.argument, def || literalFallback());
        },
        // MemberExpression: (node: any, def: Def | null, c: any) => {
        //   // MemberExpression used as a pattern key? unlikely; treat conservatively
        //   // coleect properties，node: a.b.c => props = ['c','b']
        //   const props: any[] = [];
        //   let cur: any = node;
        //   while (cur && cur.type === "MemberExpression") {
        //     props.push(cur.property);
        //     cur = cur.object;
        //   }
        //   const objectDef = expressionTypeHandler(cfgNode, cur);
        //   // base not ObjectDef, give up
        //   if (!objectDef || !Def.isObjectDef(objectDef)) return;
        //   // get property in order
        //   props.reverse();
        //   let curObjDef = objectDef;
        //   for (let i = 0; i < props.length; i++) {
        //     const propNode = props[i];
        //     const isLast = i === props.length - 1;
        //     // must be identifier or literal
        //     if (!isSimpleValueNode(propNode)) return;
        //     const key = resolvePropName(cfgNode, propNode, propNode.computed);
        //     if (!key) return;
        //     if (isLast) {
        //       // last set property directly
        //       curObjDef.setProperty(key, def || defFactory.createUnknownDef(cfgNode));
        //     } else {
        //       // middle nodes must be ObjectDef, if not, create it
        //       let next = curObjDef.getProperty(key);
        //       if (!next || !Def.isObjectDef(next)) {
        //         next = defFactory.createObjectDef(cfgNode);
        //         curObjDef.setProperty(key, next);
        //       }
        //       curObjDef = next as ObjectDef;
        //     }
        //   }
        // },
        MemberExpression: (node, def, c) => {
            // collect property nodes
            const props = [];
            const computedFlags = [];
            let cur = node;
            while (cur && cur.type === "MemberExpression") {
                props.push(cur.property);
                computedFlags.push(cur.computed);
                cur = cur.object;
            }
            const objectDef = (0, expressionTypeHandler_1.expressionTypeHandler)(cfgNode, cur);
            if (!objectDef || !def_1.default.isObjectDef(objectDef))
                return;
            props.reverse();
            computedFlags.reverse();
            let curObjDef = objectDef;
            for (let i = 0; i < props.length; i++) {
                const propNode = props[i];
                const computed = computedFlags[i];
                const isLast = i === props.length - 1;
                let key = null;
                let dynamic = false;
                if (!computed) {
                    // a.b
                    key = (0, utils_1.resolvePropName)(cfgNode, propNode, false);
                }
                else {
                    // a[b] 需要 expressionTypeHandler
                    const propDef = (0, expressionTypeHandler_1.expressionTypeHandler)(cfgNode, propNode);
                    if (def_1.default.isLiteralDef(propDef)) {
                        key = String(propDef.value);
                    }
                    else {
                        dynamic = true;
                    }
                }
                // dynamic property -> use unknown
                if (dynamic) {
                    if (isLast) {
                        curObjDef.setUnknown(def || defFactory_1.defFactory.createUnknownDef(cfgNode));
                    }
                    else {
                        let next = curObjDef.getUnknown();
                        if (!next || !def_1.default.isObjectDef(next)) {
                            next = defFactory_1.defFactory.createObjectDef(cfgNode);
                            curObjDef.setUnknown(next);
                        }
                        curObjDef = next;
                    }
                    continue;
                }
                if (!key)
                    return;
                if (isLast) {
                    curObjDef.setProperty(key, def || defFactory_1.defFactory.createUnknownDef(cfgNode));
                }
                else {
                    let next = curObjDef.getProperty(key);
                    if (!next || !def_1.default.isObjectDef(next)) {
                        next = defFactory_1.defFactory.createObjectDef(cfgNode);
                        curObjDef.setProperty(key, next);
                    }
                    curObjDef = next;
                }
            }
        },
        SpreadElement: () => { },
        ArrayExpression: () => { },
        AssignmentExpression: () => { },
    };
    try {
        walk.recursive(node, initType || literalFallback(), visitors);
    }
    catch (error) {
        logger_1.default.error("Error in recursive walk on PatternawareTypeHandler:", error);
    }
}
