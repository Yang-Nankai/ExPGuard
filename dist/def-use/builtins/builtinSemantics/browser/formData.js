"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// --------------------- FormData.prototype.constructor -------------------
index_1.BuiltInSemantics.register("FormData.prototype.constructor", (args, callNode, _astNode, thisDef) => {
    const fdObj = index_1.Def.isObjectDef(thisDef)
        ? thisDef
        : index_1.defFactory.createObjectDef(callNode);
    const [formArg] = args;
    // new FormData(formElement)
    // Conservative: treat form as taint source container
    if (formArg) {
        fdObj.setProperty(fdObj.propsLength, formArg);
    }
    return fdObj;
});
// --------------------- FormData.prototype.append -------------------
index_1.BuiltInSemantics.register("FormData.prototype.append", (args, _callNode, _astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef) || args.length < 2)
        return undefined;
    const [nameDef, valueDef] = args;
    const name = (0, index_1.literalOuter)(nameDef);
    thisDef.setProperty(name !== null && name !== void 0 ? name : thisDef.propsLength, valueDef);
    return thisDef;
});
// --------------------- FormData.prototype.set -------------------
index_1.BuiltInSemantics.register("FormData.prototype.set", (args, _callNode, _astNode, thisDef) => {
    if (!index_1.Def.isObjectDef(thisDef) || args.length < 2)
        return undefined;
    const [nameDef, valueDef] = args;
    const name = (0, index_1.literalOuter)(nameDef);
    thisDef.setProperty(name !== null && name !== void 0 ? name : thisDef.propsLength, valueDef);
    return thisDef;
});
// --------------------- FormData.prototype.get -------------------
index_1.BuiltInSemantics.register("FormData.prototype.get", (args, callNode, astNode, thisDef) => {
    var _a;
    let value = index_1.defFactory.createUnknownDef(callNode);
    if (!index_1.Def.isObjectDef(thisDef) || args.length < 1)
        return value;
    const [nameDef] = args;
    const name = (0, index_1.literalOuter)(nameDef);
    if (name) {
        value = (_a = thisDef.lookupProperty(name)) !== null && _a !== void 0 ? _a : value;
    }
    // taint Propagation: get result should be taint
    index_1.taintManager.propagateTaint(thisDef, value, astNode, "RETURN", "formdata.get");
    return value;
});
// --------------------- FormData.prototype.getAll -------------------
index_1.BuiltInSemantics.register("FormData.prototype.getAll", (args, callNode, astNode, thisDef) => {
    var _a;
    let value = index_1.defFactory.createUnknownDef(callNode);
    if (index_1.Def.isObjectDef(thisDef) && args.length > 0) {
        const [nameDef] = args;
        const name = (0, index_1.literalOuter)(nameDef);
        if (name) {
            value = (_a = thisDef.lookupProperty(name)) !== null && _a !== void 0 ? _a : value;
        }
    }
    const values = index_1.DefFactory.createArrayInstanceDef(callNode, astNode, [
        value,
    ]);
    // taint Propagation: getAll result should be taint
    index_1.taintManager.propagateTaint(thisDef, values, astNode, "RETURN", "formdata.getAll");
    return values;
});
