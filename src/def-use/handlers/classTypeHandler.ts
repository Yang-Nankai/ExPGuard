import { RecurseFunction } from "../../ast/walkes";
import { FlowNode } from "../../flownode/flownode";
import { Errors } from "../../utils/errorCode";
import { BuiltInRegistry } from "../builtins/builtinRegistry";
import { defFactory } from "../factories/defFactory";
import Def, { FunctionDef } from "../types/def";
import {
  extractSimpleValue,
  isSimpleValueNode,
  lookupMatchingDef,
} from "../utils/utils";

function isClassNode(node: any): boolean {
  if (!node || !node.type) return false;
  return node.type === "ClassExpression" || node.type === "ClassDeclaration";
}

export function classTypeHandler(
  cfgNode: FlowNode,
  node: any,
  recurse?: RecurseFunction
): FunctionDef {
  const scope = cfgNode.scope;
  if (!isClassNode(node)) {
    throw Errors.DFGError("ClassExpression or ClassDeclaration expected");
  }

  // Supper class resolution, only handle identifier
  let superClassDef: Def | null = null;
  if (node.superClass?.type === "Identifier") {
    superClassDef = lookupMatchingDef(node.superClass.name, scope) || null;
  }

  // Collect static / instace properties
  const instanceProps: Map<string, Def> = new Map();
  const staticProps: Map<string, Def> = new Map();

  const handleMethodOrProp = (key: any, isStatic: boolean, def: Def) => {
    if (!isSimpleValueNode(key)) return;
    const name = extractSimpleValue(key);
    (isStatic ? staticProps : instanceProps).set(name, def);
  };

  for (const element of node.body.body) {
    if (!element) continue;

    // Handle static block
    if (element.type === "StaticBlock") {
      recurse?.(element);
      continue;
    }

    // MethodDefinition
    if (element.type === "MethodDefinition") {
      const methodDef = defFactory.createFunctionDef(
        cfgNode,
        element.value,
        true
      );
      handleMethodOrProp(element.key, element.static, methodDef);
      continue;
    }

    // PropertyDefinition (class fields)
    if (element.type === "PropertyDefinition") {
      const propDef = defFactory.createUnknownDef(cfgNode);
      handleMethodOrProp(element.key, element.static, propDef);
      continue;
    }
  }

  const classFunction = defFactory.createFunctionDef(cfgNode, null);

  // set prototypeObject，extend from superClass.prototype
  if (superClassDef && Def.isFunctionDef(superClassDef)) {
    classFunction.prototypeObject.proto = superClassDef.prototypeObject;
  } else {
    classFunction.prototypeObject.proto = BuiltInRegistry.getObjectPrototype();
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
