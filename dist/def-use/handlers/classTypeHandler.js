"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classTypeHandler = classTypeHandler;
const errorCode_1 = require("../../utils/errorCode");
const builtinRegistry_1 = require("../builtins/builtinRegistry");
const defFactory_1 = require("../factories/defFactory");
const def_1 = __importDefault(require("../types/def"));
const utils_1 = require("../utils/utils");
function isClassNode(node) {
    if (!node || !node.type)
        return false;
    return node.type === "ClassExpression" || node.type === "ClassDeclaration";
}
function classTypeHandler(cfgNode, node, recurse) {
    var _a;
    const scope = cfgNode.scope;
    if (!isClassNode(node)) {
        throw errorCode_1.Errors.DFGError("ClassExpression or ClassDeclaration expected");
    }
    // Supper class resolution, only handle identifier
    let superClassDef = null;
    if (((_a = node.superClass) === null || _a === void 0 ? void 0 : _a.type) === "Identifier") {
        superClassDef = (0, utils_1.lookupMatchingDef)(node.superClass.name, scope) || null;
    }
    // Collect static / instace properties
    const instanceProps = new Map();
    const staticProps = new Map();
    const handleMethodOrProp = (key, isStatic, def) => {
        if (!(0, utils_1.isSimpleValueNode)(key))
            return;
        const name = (0, utils_1.extractSimpleValue)(key);
        (isStatic ? staticProps : instanceProps).set(name, def);
    };
    for (const element of node.body.body) {
        if (!element)
            continue;
        // Handle static block
        if (element.type === "StaticBlock") {
            recurse === null || recurse === void 0 ? void 0 : recurse(element);
            continue;
        }
        // MethodDefinition
        if (element.type === "MethodDefinition") {
            const methodDef = defFactory_1.defFactory.createFunctionDef(cfgNode, element.value, true);
            handleMethodOrProp(element.key, element.static, methodDef);
            continue;
        }
        // PropertyDefinition (class fields)
        if (element.type === "PropertyDefinition") {
            const propDef = defFactory_1.defFactory.createUnknownDef(cfgNode);
            handleMethodOrProp(element.key, element.static, propDef);
            continue;
        }
    }
    const classFunction = defFactory_1.defFactory.createFunctionDef(cfgNode, null);
    // set prototypeObject，extend from superClass.prototype
    if (superClassDef && def_1.default.isFunctionDef(superClassDef)) {
        classFunction.prototypeObject.proto = superClassDef.prototypeObject;
    }
    else {
        classFunction.prototypeObject.proto = builtinRegistry_1.BuiltInRegistry.getObjectPrototype();
    }
    // Attach instance properties to prototype
    for (const [name, def] of instanceProps.entries()) {
        classFunction.prototypeObject.setProperty(name, def);
    }
    // Attach static properties to constructor function
    for (const [name, def] of staticProps.entries()) {
        classFunction.setProperty(name, def);
    }
    return classFunction;
}
