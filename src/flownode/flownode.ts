import Scope from "../scope/scope";
import ScopeTree from "../scope/scopeTree";
import { Errors } from "../utils/errorCode";
import Set from "../utils/set";
import { Node } from "acorn";

export type ConnectionType = "normal" | "exception" | "true" | "false";

export type NodeType = "entry" | "exit" | "normal" | "branch" | "builtin";

type TypeTable = Record<ConnectionType, FlowNode | null>;

/**
 * FlowNode Class
 */
export class FlowNode {
  static readonly ENTRY_NODE_TYPE = "entry";
  static readonly EXIT_NODE_TYPE = "exit";
  static readonly NORMAL_NODE_TYPE = "normal";
  // [deprecated]
  static readonly BRANCH_NODE_TYPE = "branch";
  static readonly BUILTIN_NODE_TYPE = "builtin";

  static readonly NORMAL_CONNECTION_TYPE = "normal";
  static readonly EXCEPTION_CONNECTION_TYPE = "exception";
  static readonly TRUE_BRANCH_CONNECTION_TYPE = "true";
  static readonly FALSE_BRANCH_CONNECTION_TYPE = "false";

  static readonly NODE_TYPES = new Set<NodeType>([
    FlowNode.ENTRY_NODE_TYPE,
    FlowNode.EXIT_NODE_TYPE,
    FlowNode.NORMAL_NODE_TYPE,
    FlowNode.BRANCH_NODE_TYPE,
    FlowNode.BUILTIN_NODE_TYPE,
  ]);

  static readonly CONNECTION_TYPES = new Set<ConnectionType>([
    FlowNode.NORMAL_CONNECTION_TYPE,
    FlowNode.TRUE_BRANCH_CONNECTION_TYPE,
    FlowNode.FALSE_BRANCH_CONNECTION_TYPE,
    FlowNode.EXCEPTION_CONNECTION_TYPE,
  ]);

  private _cfgId?: number;
  private _prev: FlowNode[] = [];
  private _next: FlowNode[] = [];
  private _nextSibling?: FlowNode;
  private _label?: string;
  private _line?: number;
  private _col?: number;
  private _scope: Scope | null = null;
  private _scopeTree: ScopeTree | null = null;
  private readonly _typeTable: TypeTable;

  constructor(
    private _type: NodeType = FlowNode.NORMAL_NODE_TYPE,
    private _astNode?: Node,
    private _parent?: Node,
  ) {
    FlowNode.validateTypeValue(this._type);
    this._typeTable = FlowNode.initializeTypeTable();

    // Automatically assign label for non-normal nodes
    if (this._type !== FlowNode.NORMAL_NODE_TYPE) {
      this._label = this._type;
    }
  }

  /**
   * Create and initialize the connections
   */
  private static initializeTypeTable(): TypeTable {
    return Object.fromEntries(
      [...FlowNode.CONNECTION_TYPES].map((type) => [type, null]),
    ) as TypeTable;
  }

  /**
   * Check for the type of the node is valid or not
   * @param type  Type
   */
  static isValidNodeType(type: string): type is NodeType {
    return FlowNode.NODE_TYPES.has(type as NodeType);
  }

  /**
   * Check for the type of the connection is valid or not
   * @param type  Type
   */
  static isValidConnectionType(type: string): type is ConnectionType {
    return FlowNode.CONNECTION_TYPES.has(type as ConnectionType);
  }

  /**
   * Check for the object is a FlowNode or not
   * @param obj   Object
   */
  static isFlowNode(obj: any): obj is FlowNode {
    return obj instanceof FlowNode;
  }

  /**
   * Validate the type of a FlowNode
   * @param type  Type
   * @param msg   Custom error message
   */
  static validateTypeValue(
    type: string,
    msg?: string,
  ): asserts type is NodeType {
    if (!FlowNode.isValidNodeType(type)) {
      Errors.ValidatorError(msg || `Invalid FlowNode type: ${type}`);
    }
  }

  /**
   * Validate an object is a FlowNode or not
   * @param obj   Object
   * @param msg   Custom error message
   */
  static validateType(obj: any, msg?: string): asserts obj is FlowNode {
    if (!FlowNode.isFlowNode(obj)) {
      Errors.ValidatorError(msg || "Not a FlowNode");
    }
  }

  /**
   * Get specified type connections
   */
  getConnections(type: ConnectionType): FlowNode[] {
    if (!FlowNode.isValidConnectionType(type)) {
      Errors.ValidatorError(`Invalid connection type: ${type}`);
    }
    const connection = this._typeTable[type];
    return connection ? [connection] : [];
  }

  get cfgId() {
    return this._cfgId;
  }
  set cfgId(id) {
    this._cfgId = id;
  }

  get uniqueId() {
    return this._cfgId?.toString();
  }

  get astNode() {
    return this._astNode;
  }
  set astNode(ast) {
    this._astNode = ast;
  }

  get parent() {
    return this._parent;
  }
  set parent(parent) {
    this._parent = parent;
  }

  get type() {
    return this._type;
  }
  set type(type) {
    FlowNode.validateTypeValue(type);
    this._type = type;
  }

  get prev() {
    return [...this._prev];
  }

  get next() {
    return [...this._next];
  }

  get nextSibling() {
    return this._nextSibling;
  }
  set nextSibling(node) {
    this._nextSibling = node;
  }

  get label() {
    return this._label;
  }
  set label(text) {
    this._label = text;
  }

  get line() {
    return this._line;
  }
  set line(lineNum) {
    this._line = lineNum;
  }

  get col() {
    return this._col;
  }
  set col(colNum) {
    this._col = colNum;
  }

  get scope() {
    return this._scope;
  }
  set scope(scopeWrapper) {
    this._scope = scopeWrapper;
  }

  get scopeTree() {
    return this._scopeTree;
  }

  set scopeTree(scopeTreeWrapper) {
    this._scopeTree = scopeTreeWrapper;
  }

  get typeTable() {
    return this._typeTable;
  }

  get normal(): FlowNode | null {
    return this._typeTable[FlowNode.NORMAL_CONNECTION_TYPE] as FlowNode | null;
  }

  get exception(): FlowNode | null {
    return this._typeTable[
      FlowNode.EXCEPTION_CONNECTION_TYPE
    ] as FlowNode | null;
  }

  get true(): FlowNode | null {
    return this._typeTable[
      FlowNode.TRUE_BRANCH_CONNECTION_TYPE
    ] as FlowNode | null;
  }

  get false(): FlowNode | null {
    return this._typeTable[
      FlowNode.FALSE_BRANCH_CONNECTION_TYPE
    ] as FlowNode | null;
  }

  /**
   * Check the node is in the collection of previous nodes of the current node
   */
  hasPrev(prevNode: FlowNode): boolean {
    return this._prev.includes(prevNode);
  }

  /**
   * Check the node is in the collection of next nodes of the current node
   */
  hasNext(nextNode: FlowNode): boolean {
    return this._next.includes(nextNode);
  }

  /**
   * Check the current node is connected to the node or not
   * @param node  FlowNode to check
   */
  isConnectedTo(node: FlowNode): boolean {
    for (const type of FlowNode.CONNECTION_TYPES) {
      const connection = this._typeTable[type];
      if (Array.isArray(connection)) {
        if (connection.includes(node)) return true;
      } else if (connection === node) {
        return true;
      }
    }
    return false;
  }

  /**
   * Connect a node ot this node with the specified connection type
   */
  connect(
    nextNode: FlowNode,
    connectionType: ConnectionType = FlowNode.NORMAL_CONNECTION_TYPE,
  ): this {
    if (!FlowNode.isFlowNode(nextNode)) return this;

    if (!FlowNode.isValidConnectionType(connectionType)) {
      throw new Error(`Invalid connection type: ${connectionType}`);
    }

    this._typeTable[connectionType] = nextNode;

    if (!this._next.includes(nextNode)) {
      this._next.push(nextNode);
    }
    if (!nextNode._prev.includes(this)) {
      nextNode._prev.push(this);
    }

    return this;
  }

  /**
   * Disconnect this node and the nextNode
   */
  disconnect(nextNode: FlowNode): this {
    if (!FlowNode.isFlowNode(nextNode)) return this;

    for (const type of FlowNode.CONNECTION_TYPES) {
      if (this._typeTable[type] === nextNode) {
        this._typeTable[type] = null;
      }
    }

    this._next = this._next.filter((node) => node !== nextNode);
    nextNode._prev = nextNode._prev.filter((node) => node !== this);

    return this;
  }

  /**
   * String representation of this node
   */
  toString(): string {
    return this._label ?? this._cfgId?.toString() ?? "";
  }

  /**
   * Convert this node to JSON format
   */
  toJSON(): string {
    return JSON.stringify({
      id: this._cfgId,
      label: this._label,
      type: this._type,
    });
  }

  static isNodeOfType(node: FlowNode, type: NodeType): boolean {
    return node._type === type;
  }

  static isEntryType(node: FlowNode): boolean {
    return FlowNode.isNodeOfType(node, FlowNode.ENTRY_NODE_TYPE);
  }

  static isExitType(node: FlowNode): boolean {
    return FlowNode.isNodeOfType(node, FlowNode.EXIT_NODE_TYPE);
  }
}
