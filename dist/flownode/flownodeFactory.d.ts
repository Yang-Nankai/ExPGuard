import { Node } from "acorn";
import { FlowNode, NodeType } from "./flownode";
/**
 * FlowNode Factory
 */
declare class FlowNodeFactory {
    create(type: NodeType, astNode?: Node, parent?: Node): FlowNode;
    createNormalNode(astNode?: Node, parent?: Node): FlowNode;
    createEntryNode(astNode?: Node): FlowNode;
    createExitNode(): FlowNode;
    createBuiltInNode(): FlowNode;
}
export declare const flownodeFactory: FlowNodeFactory;
export {};
