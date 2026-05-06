import { Node } from "acorn";
import { FlowNode } from "../../../flownode/flownode";
import Def from "../../types/def";
import logger from "../../../utils/logger";

export type BuiltInSemanticExec = (
  args: Def[],
  callNode: FlowNode,
  astNode: Node,
  thisDef: Def | null,
) => Def | null | undefined;

export class BuiltInSemantics {
  private static registry = new Map<string, BuiltInSemanticExec>();

  static register(name: string, fn: BuiltInSemanticExec) {
    if (this.registry.has(name)) {
      throw new Error(`Built-in semantic already registered: ${name}`);
    }
    this.registry.set(name, fn);
  }

  static get(name: string) {
    const builtin = this.registry.get(name);
    if (!builtin) {
      logger.warn(`[BUILTIN] Can't find the builtInSemantic ${name}.`);
    }
    return builtin ?? null;
  }
}
