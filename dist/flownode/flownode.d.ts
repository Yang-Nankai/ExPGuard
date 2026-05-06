import Scope from "../scope/scope";
import ScopeTree from "../scope/scopeTree";
import Set from "../utils/set";
import { Node } from "acorn";
export type ConnectionType = "normal" | "exception" | "true" | "false";
export type NodeType = "entry" | "exit" | "normal" | "branch" | "builtin";
type TypeTable = Record<ConnectionType, FlowNode | null>;
/**
 * FlowNode Class
 */
export declare class FlowNode {
    private _type;
    private _astNode?;
    private _parent?;
    static readonly ENTRY_NODE_TYPE = "entry";
    static readonly EXIT_NODE_TYPE = "exit";
    static readonly NORMAL_NODE_TYPE = "normal";
    static readonly BRANCH_NODE_TYPE = "branch";
    static readonly BUILTIN_NODE_TYPE = "builtin";
    static readonly NORMAL_CONNECTION_TYPE = "normal";
    static readonly EXCEPTION_CONNECTION_TYPE = "exception";
    static readonly TRUE_BRANCH_CONNECTION_TYPE = "true";
    static readonly FALSE_BRANCH_CONNECTION_TYPE = "false";
    static readonly NODE_TYPES: Set<NodeType>;
    static readonly CONNECTION_TYPES: Set<ConnectionType>;
    private _cfgId?;
    private _prev;
    private _next;
    private _nextSibling?;
    private _label?;
    private _line?;
    private _col?;
    private _scope;
    private _scopeTree;
    private readonly _typeTable;
    constructor(_type?: NodeType, _astNode?: Node | undefined, _parent?: Node | undefined);
    /**
     * Create and initialize the connections
     */
    private static initializeTypeTable;
    /**
     * Check for the type of the node is valid or not
     * @param type  Type
     */
    static isValidNodeType(type: string): type is NodeType;
    /**
     * Check for the type of the connection is valid or not
     * @param type  Type
     */
    static isValidConnectionType(type: string): type is ConnectionType;
    /**
     * Check for the object is a FlowNode or not
     * @param obj   Object
     */
    static isFlowNode(obj: any): obj is FlowNode;
    /**
     * Validate the type of a FlowNode
     * @param type  Type
     * @param msg   Custom error message
     */
    static validateTypeValue(type: string, msg?: string): asserts type is NodeType;
    /**
     * Validate an object is a FlowNode or not
     * @param obj   Object
     * @param msg   Custom error message
     */
    static validateType(obj: any, msg?: string): asserts obj is FlowNode;
    /**
     * Get specified type connections
     */
    getConnections(type: ConnectionType): FlowNode[];
    get cfgId(): number | undefined;
    set cfgId(id: number | undefined);
    get uniqueId(): string | undefined;
    get astNode(): Node | undefined;
    set astNode(ast: Node | undefined);
    get parent(): Node | undefined;
    set parent(parent: Node | undefined);
    get type(): NodeType;
    set type(type: NodeType);
    get prev(): FlowNode[];
    get next(): FlowNode[];
    get nextSibling(): FlowNode | undefined;
    set nextSibling(node: FlowNode | undefined);
    get label(): string | undefined;
    set label(text: string | undefined);
    get line(): number | undefined;
    set line(lineNum: number | undefined);
    get col(): number | undefined;
    set col(colNum: number | undefined);
    get scope(): Scope | null;
    set scope(scopeWrapper: Scope | null);
    get scopeTree(): ScopeTree | null;
    set scopeTree(scopeTreeWrapper: ScopeTree | null);
    get typeTable(): TypeTable;
    get normal(): FlowNode | null;
    get exception(): FlowNode | null;
    get true(): FlowNode | null;
    get false(): FlowNode | null;
    /**
     * Check the node is in the collection of previous nodes of the current node
     */
    hasPrev(prevNode: FlowNode): boolean;
    /**
     * Check the node is in the collection of next nodes of the current node
     */
    hasNext(nextNode: FlowNode): boolean;
    /**
     * Check the current node is connected to the node or not
     * @param node  FlowNode to check
     */
    isConnectedTo(node: FlowNode): boolean;
    /**
     * Connect a node ot this node with the specified connection type
     */
    connect(nextNode: FlowNode, connectionType?: ConnectionType): this;
    /**
     * Disconnect this node and the nextNode
     */
    disconnect(nextNode: FlowNode): this;
    /**
     * String representation of this node
     */
    toString(): string;
    /**
     * Convert this node to JSON format
     */
    toJSON(): string;
    static isNodeOfType(node: FlowNode, type: NodeType): boolean;
    static isEntryType(node: FlowNode): boolean;
    static isExitType(node: FlowNode): boolean;
}
export {};
