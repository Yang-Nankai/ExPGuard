"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowNode = void 0;
const errorCode_1 = require("../utils/errorCode");
const set_1 = __importDefault(require("../utils/set"));
/**
 * FlowNode Class
 */
class FlowNode {
    constructor(_type = FlowNode.NORMAL_NODE_TYPE, _astNode, _parent) {
        this._type = _type;
        this._astNode = _astNode;
        this._parent = _parent;
        this._prev = [];
        this._next = [];
        this._scope = null;
        this._scopeTree = null;
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
    static initializeTypeTable() {
        return Object.fromEntries([...FlowNode.CONNECTION_TYPES].map((type) => [type, null]));
    }
    /**
     * Check for the type of the node is valid or not
     * @param type  Type
     */
    static isValidNodeType(type) {
        return FlowNode.NODE_TYPES.has(type);
    }
    /**
     * Check for the type of the connection is valid or not
     * @param type  Type
     */
    static isValidConnectionType(type) {
        return FlowNode.CONNECTION_TYPES.has(type);
    }
    /**
     * Check for the object is a FlowNode or not
     * @param obj   Object
     */
    static isFlowNode(obj) {
        return obj instanceof FlowNode;
    }
    /**
     * Validate the type of a FlowNode
     * @param type  Type
     * @param msg   Custom error message
     */
    static validateTypeValue(type, msg) {
        if (!FlowNode.isValidNodeType(type)) {
            errorCode_1.Errors.ValidatorError(msg || `Invalid FlowNode type: ${type}`);
        }
    }
    /**
     * Validate an object is a FlowNode or not
     * @param obj   Object
     * @param msg   Custom error message
     */
    static validateType(obj, msg) {
        if (!FlowNode.isFlowNode(obj)) {
            errorCode_1.Errors.ValidatorError(msg || "Not a FlowNode");
        }
    }
    /**
     * Get specified type connections
     */
    getConnections(type) {
        if (!FlowNode.isValidConnectionType(type)) {
            errorCode_1.Errors.ValidatorError(`Invalid connection type: ${type}`);
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
        var _a;
        return (_a = this._cfgId) === null || _a === void 0 ? void 0 : _a.toString();
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
    get normal() {
        return this._typeTable[FlowNode.NORMAL_CONNECTION_TYPE];
    }
    get exception() {
        return this._typeTable[FlowNode.EXCEPTION_CONNECTION_TYPE];
    }
    get true() {
        return this._typeTable[FlowNode.TRUE_BRANCH_CONNECTION_TYPE];
    }
    get false() {
        return this._typeTable[FlowNode.FALSE_BRANCH_CONNECTION_TYPE];
    }
    /**
     * Check the node is in the collection of previous nodes of the current node
     */
    hasPrev(prevNode) {
        return this._prev.includes(prevNode);
    }
    /**
     * Check the node is in the collection of next nodes of the current node
     */
    hasNext(nextNode) {
        return this._next.includes(nextNode);
    }
    /**
     * Check the current node is connected to the node or not
     * @param node  FlowNode to check
     */
    isConnectedTo(node) {
        for (const type of FlowNode.CONNECTION_TYPES) {
            const connection = this._typeTable[type];
            if (Array.isArray(connection)) {
                if (connection.includes(node))
                    return true;
            }
            else if (connection === node) {
                return true;
            }
        }
        return false;
    }
    /**
     * Connect a node ot this node with the specified connection type
     */
    connect(nextNode, connectionType = FlowNode.NORMAL_CONNECTION_TYPE) {
        if (!FlowNode.isFlowNode(nextNode))
            return this;
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
    disconnect(nextNode) {
        if (!FlowNode.isFlowNode(nextNode))
            return this;
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
    toString() {
        var _a, _b, _c;
        return (_c = (_a = this._label) !== null && _a !== void 0 ? _a : (_b = this._cfgId) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
    }
    /**
     * Convert this node to JSON format
     */
    toJSON() {
        return JSON.stringify({
            id: this._cfgId,
            label: this._label,
            type: this._type,
        });
    }
    static isNodeOfType(node, type) {
        return node._type === type;
    }
    static isEntryType(node) {
        return FlowNode.isNodeOfType(node, FlowNode.ENTRY_NODE_TYPE);
    }
    static isExitType(node) {
        return FlowNode.isNodeOfType(node, FlowNode.EXIT_NODE_TYPE);
    }
}
exports.FlowNode = FlowNode;
FlowNode.ENTRY_NODE_TYPE = "entry";
FlowNode.EXIT_NODE_TYPE = "exit";
FlowNode.NORMAL_NODE_TYPE = "normal";
// [deprecated]
FlowNode.BRANCH_NODE_TYPE = "branch";
FlowNode.BUILTIN_NODE_TYPE = "builtin";
FlowNode.NORMAL_CONNECTION_TYPE = "normal";
FlowNode.EXCEPTION_CONNECTION_TYPE = "exception";
FlowNode.TRUE_BRANCH_CONNECTION_TYPE = "true";
FlowNode.FALSE_BRANCH_CONNECTION_TYPE = "false";
FlowNode.NODE_TYPES = new set_1.default([
    FlowNode.ENTRY_NODE_TYPE,
    FlowNode.EXIT_NODE_TYPE,
    FlowNode.NORMAL_NODE_TYPE,
    FlowNode.BRANCH_NODE_TYPE,
    FlowNode.BUILTIN_NODE_TYPE,
]);
FlowNode.CONNECTION_TYPES = new set_1.default([
    FlowNode.NORMAL_CONNECTION_TYPE,
    FlowNode.TRUE_BRANCH_CONNECTION_TYPE,
    FlowNode.FALSE_BRANCH_CONNECTION_TYPE,
    FlowNode.EXCEPTION_CONNECTION_TYPE,
]);
