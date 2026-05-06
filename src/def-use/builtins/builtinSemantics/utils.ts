import Def, { ObjectDef } from "../../types/def";
import {
  SourceType,
  UrlTaintControl,
  taintManager,
  taintManager as tm,
} from "../../../taint";
import { Node } from "acorn";
import { FlowNode } from "../../../flownode/flownode";
import { DefFactory, defFactory } from "../../factories/defFactory";
import { epgModelBuilder } from "../../../epgmodelbuilder";

const EXTENSION_ID_REGEX = /^[a-p]{32}$/;

/**
 * Get the outer value of a literal def.
 */
export function literalOuter(def?: Def | null): string | undefined {
  return Def.isLiteralDef(def) ? def.value?.toString() : undefined;
}

/**
 * Get the right extension id from a literal def
 */
export function literalExtensionId(extensionId?: Def): string | undefined {
  
  if (!Def.isLiteralDef(extensionId)) {
    return "UNKNOWN_EXTENSION_ID";
  }

  const value = extensionId.value?.toString().trim();
  if (!value) return undefined;
  // FIX: fix the chrome.runtime.id point to self
  if (value === "chrome.runtime.id") return undefined;
  // FIX: fix the id === extension id point to self
  if (value === epgModelBuilder.getExtensionId()) return undefined;

  return EXTENSION_ID_REGEX.test(value) ? value : "INVALID_EXTENSION_ID";
}

export function createArrayInstanceTaint(
  callNode: FlowNode,
  astNode: Node,
  sourceType: SourceType,
) {
    const element = defFactory.createUnknownDef(callNode);
    taintManager.createTaintSource(element, sourceType, astNode);
    return DefFactory.createArrayInstanceDef(callNode, astNode, [element]);

}

function hasStaticUrlFragment(urlArgNode: any): boolean {
  if (!urlArgNode) return false;

  if (urlArgNode.type === "TemplateLiteral") {
    return (urlArgNode.quasis || []).some(
      (q: any) => typeof q?.value?.cooked === "string" && q.value.cooked.length > 0,
    );
  }

  if (urlArgNode.type === "BinaryExpression" && urlArgNode.operator === "+") {
    const left = urlArgNode.left;
    const right = urlArgNode.right;

    const leftIsStaticLiteral =
      left?.type === "Literal" && typeof left.value === "string" && left.value.length > 0;
    const rightIsStaticLiteral =
      right?.type === "Literal" && typeof right.value === "string" && right.value.length > 0;

    return leftIsStaticLiteral || rightIsStaticLiteral || hasStaticUrlFragment(left) || hasStaticUrlFragment(right);
  }

  return false;
}

/**
 * Infer whether taint can fully control URL or only partially control it.
 */
export function inferUrlTaintControl(urlArgNode: any): UrlTaintControl {
  return hasStaticUrlFragment(urlArgNode) ? "PARTIAL" : "FULL";
}
