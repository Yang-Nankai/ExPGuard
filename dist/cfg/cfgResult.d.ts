import { FlowNode } from "../flownode/flownode";
/**
 * CFG Result
 */
export declare class CFGResult {
    private _entryNode;
    private _exitNode;
    private _allNodes;
    constructor(entryNode: FlowNode, exitNode: FlowNode, allNodes: FlowNode[]);
    /**
     * Check for the type of the object is a CFGResult or not
     */
    static isCFGResult(obj: any): obj is CFGResult;
    /**
     * Validate an object is right CFGResult or not
     */
    static validate(obj: any, msg?: string): asserts obj is CFGResult;
    /**
     * Add a flownode into allNodes
     */
    addNode(node: FlowNode): void;
    /**
     * Check if a node exists in the CFG
     */
    containsNode(node: FlowNode): boolean;
    /**
     * Get the index of a node in the CFG
     */
    getNodeIndex(node: FlowNode): number;
    get entryNode(): FlowNode;
    set entryNode(node: FlowNode);
    get exitNode(): FlowNode;
    set exitNode(node: FlowNode);
    get allNodes(): FlowNode[];
    get size(): number;
}
