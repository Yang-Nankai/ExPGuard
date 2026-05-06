import { Node } from "acorn";
import { CFGResult } from "./cfgResult";
/**
 * Control Flow Graph
 * @param astNode
 * @returns CFGResult
 */
declare function ControlFlowGraph(astNode: Node): CFGResult;
export default ControlFlowGraph;
