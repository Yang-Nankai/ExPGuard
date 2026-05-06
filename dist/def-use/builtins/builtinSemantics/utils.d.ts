import Def, { ObjectDef } from "../../types/def";
import { SourceType, UrlTaintControl } from "../../../taint";
import { Node } from "acorn";
import { FlowNode } from "../../../flownode/flownode";
/**
 * Get the outer value of a literal def.
 */
export declare function literalOuter(def?: Def | null): string | undefined;
/**
 * Get the right extension id from a literal def
 */
export declare function literalExtensionId(extensionId?: Def): string | undefined;
export declare function createArrayInstanceTaint(callNode: FlowNode, astNode: Node, sourceType: SourceType): ObjectDef;
/**
 * Infer whether taint can fully control URL or only partially control it.
 */
export declare function inferUrlTaintControl(urlArgNode: any): UrlTaintControl;
