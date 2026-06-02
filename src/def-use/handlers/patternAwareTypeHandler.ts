import { FlowNode } from "../../flownode/flownode";
import { defFactory } from "../factories/defFactory";
import Def, { ObjectDef } from "../types/def";
import * as walk from "acorn-walk";
import { expressionTypeHandler } from "./expressionTypeHandler";
import {
  isSimpleValueNode,
  resolvePropName,
  setReachingDef,
} from "../utils/utils";
import { Identifier } from "acorn";
import { taintManager as tm } from "../../taint";
import { SinkType } from "../../taint";
import logger from "../../utils/logger";

/**
 * Element properties whose assignment parses the value as HTML. Writing a
 * tainted value here is a DOM-based XSS sink. The receiver is not required to
 * be a modeled DOM element — `x.innerHTML = tainted` is dangerous for any `x`,
 * and `checkSink` already no-ops on untainted values, so the false-positive
 * surface is limited to genuinely tainted writes.
 */
const DOM_WRITE_SINK_PROPS: Record<string, SinkType> = {
  innerHTML: "DOM_INNER_HTML",
  outerHTML: "DOM_INNER_HTML",
};

export function patternAwareTypeHandler(
  cfgNode: FlowNode,
  node: any,
  initType: Def,
) {
  const currentScope = cfgNode.scope;
  if (!currentScope) return;

  const literalFallback = () => defFactory.createUnknownDef(cfgNode);

  // helper: create VarDef for an Identifier name using given def
  const createForIdentifier = (pattern: Identifier, def: Def | null) => {
    // If not exists, set as global
    const name = pattern.name;
    let definedVar =
      currentScope.getVariable(name) || currentScope.addGlobalVariable(name);
    if (!definedVar) return;
    const usedDef = def || literalFallback();

    // [TAINT]
    tm.propagateTaint(def, usedDef, pattern, "ASSIGN", "pattern-assign");
    // [REACHINS]
    setReachingDef(definedVar, usedDef);
  };

  // recursive visitors for patterns. state = current inferred Def for this pattern
  const visitors: walk.RecursiveVisitors<any> = {
    Identifier: (pattern: any, def: Def | null, c: any) => {
      createForIdentifier(pattern, def);
    },
    Property: (property: any, def: Def | null, c: any) => {
      // Property inside ObjectPattern
      // property.key can be Identifier or Literal or Expression
      // property.value is the pattern (Identifier / AssignmentPattern / RestElement / another pattern)
      const keyName = resolvePropName(cfgNode, property.key, property.computed);
      if (Def.isObjectDef(def) && keyName && def.props.has(keyName)) {
        const propDef = def.getProperty(keyName);
        c(property.value, propDef);
      } else {
        c(property.value, literalFallback());
      }
    },
    ArrayPattern: (pattern: any, def: Def | null, c: any) => {
      // Array pattern: elements can be patterns or null (holes)
      // If init is objectDef and has numeric keys in staticProps, use them
      for (let idx = 0; idx < pattern.elements.length; idx++) {
        const elem = pattern.elements[idx];
        if (!elem) continue; // hole
        if (Def.isObjectDef(def)) {
          const maybeDef = def.getProperty(idx.toString());
          c(elem, maybeDef || literalFallback());
        } else {
          // not object/array-like => fallback
          c(elem, literalFallback());
        }
      }
    },
    ObjectPattern: (pattern: any, def: Def | null, c: any) => {
      for (const prop of pattern.properties) {
        c(prop, def || literalFallback());
      }
    },
    AssignmentPattern: (pattern: any, def: Def | null, c: any) => {
      // default value in pattern: e.g. `a = 1` where left is Identifier pattern
      // pattern.left is target pattern, pattern.right is default expression
      const defaultDef = pattern.right
        ? expressionTypeHandler(cfgNode, pattern.right)
        : literalFallback();
      // If we have a base def (from initType), prefer that; otherwise use defaultDef
      const targetDef = def || defaultDef || literalFallback();
      c(pattern.left, targetDef);
    },
    RestElement: (pattern: any, def: Def | null, c: any) => {
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
    MemberExpression: (node: any, def: Def | null, c: any) => {
      // collect property nodes
      const props: any[] = [];
      const computedFlags: boolean[] = [];

      let cur: any = node;

      while (cur && cur.type === "MemberExpression") {
        props.push(cur.property);
        computedFlags.push(cur.computed);
        cur = cur.object;
      }

      const objectDef = expressionTypeHandler(cfgNode, cur);

      if (!objectDef || !Def.isObjectDef(objectDef)) return;

      props.reverse();
      computedFlags.reverse();

      let curObjDef = objectDef;

      for (let i = 0; i < props.length; i++) {
        const propNode = props[i];
        const computed = computedFlags[i];
        const isLast = i === props.length - 1;

        let key: string | null = null;
        let dynamic = false;

        if (!computed) {
          // a.b
          key = resolvePropName(cfgNode, propNode, false);
        } else {
          // a[b] 需要 expressionTypeHandler
          const propDef = expressionTypeHandler(cfgNode, propNode);

          if (Def.isLiteralDef(propDef)) {
            key = String(propDef.value);
          } else {
            dynamic = true;
          }
        }

        // dynamic property -> use unknown
        if (dynamic) {
          if (isLast) {
            curObjDef.setUnknown(def || defFactory.createUnknownDef(cfgNode));
          } else {
            let next = curObjDef.getUnknown();

            if (!next || !Def.isObjectDef(next)) {
              next = defFactory.createObjectDef(cfgNode);
              curObjDef.setUnknown(next);
            }

            curObjDef = next as ObjectDef;
          }
          continue;
        }

        if (!key) return;

        if (isLast) {
          // [SINK] Assigning a tainted value to `.innerHTML` / `.outerHTML`
          // parses it as HTML — a DOM-based XSS sink. checkSink no-ops unless
          // the value is actually tainted.
          const sinkType = DOM_WRITE_SINK_PROPS[key];
          if (sinkType && def) {
            tm.checkSink(def, sinkType, propNode, key);
          }

          curObjDef.setProperty(
            key,
            def || defFactory.createUnknownDef(cfgNode),
          );
        } else {
          let next = curObjDef.getProperty(key);

          if (!next || !Def.isObjectDef(next)) {
            next = defFactory.createObjectDef(cfgNode);
            curObjDef.setProperty(key, next);
          }

          curObjDef = next as ObjectDef;
        }
      }
    },
    SpreadElement: () => {},
    ArrayExpression: () => {},
    AssignmentExpression: () => {},
  };

  try {
    walk.recursive(node, initType || literalFallback(), visitors);
  } catch (error) {
    logger.error("Error in recursive walk on PatternawareTypeHandler:", error);
  }
}
