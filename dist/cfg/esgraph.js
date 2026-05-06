"use strict";
/// <reference path="../acorn.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Control Flow Graph
 */
const walkes_1 = __importDefault(require("../ast/walkes"));
const flownodeFactory_1 = require("../flownode/flownodeFactory");
const flownode_1 = require("../flownode/flownode");
const cfgResult_1 = require("./cfgResult");
// Constants
const CONTINUE_TARGETS = [
    "ForStatement",
    "ForInStatement",
    "ForOfStatement",
    "DoWhileStatement",
    "WhileStatement",
];
const BREAK_TARGETS = [...CONTINUE_TARGETS, "SwitchStatement"];
const CONNECTION_TYPES = [
    flownode_1.FlowNode.EXCEPTION_CONNECTION_TYPE,
    flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE,
    flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE,
    flownode_1.FlowNode.NORMAL_CONNECTION_TYPE,
];
/**
 * Control Flow Graph
 * @param astNode
 * @returns CFGResult
 */
function ControlFlowGraph(astNode) {
    const parentStack = [];
    const exitNode = flownodeFactory_1.flownodeFactory.createExitNode();
    const catchStack = [exitNode];
    const finallyStack = [];
    const allNodes = [];
    /**
     *  create nodes walker configuration
     */
    const createNodesHandlers = {
        default: (node, recurse) => {
            const parent = parentStack[parentStack.length - 1];
            createNode(node, parent);
            // Skip recursion for isolationn scoped constructs
            if (hasScopeIsolation(node))
                return;
            parentStack.push(node);
            walkes_1.default.checkProps(node, recurse);
            parentStack.pop();
        },
    };
    /**
     * Create the flownode with the ast cfg
     */
    function createNode(node, parent) {
        if (!node.cfg) {
            const newNode = flownodeFactory_1.flownodeFactory.createNormalNode(node, parent);
            Object.defineProperty(node, "cfg", {
                value: newNode,
                configurable: true,
            });
        }
    }
    // nodes create
    (0, walkes_1.default)(astNode, createNodesHandlers);
    linkSiblings(astNode);
    // specifc logic handler configuration
    const handleForStatement = (node, recurse) => {
        var _a, _b, _c;
        const forNode = node;
        const testCfg = (_a = forNode.test) === null || _a === void 0 ? void 0 : _a.cfg;
        const bodyEntry = getEntry(forNode.body);
        if (forNode.test) {
            testCfg === null || testCfg === void 0 ? void 0 : testCfg.connect(bodyEntry, flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE).connect(getSuccessor(forNode), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
        }
        if (forNode.update) {
            (_b = forNode.update.cfg) === null || _b === void 0 ? void 0 : _b.connect(getSuccessor(forNode));
        }
        if (forNode.init) {
            (_c = forNode.init.cfg) === null || _c === void 0 ? void 0 : _c.connect(testCfg || bodyEntry || getSuccessor(forNode));
        }
        if (forNode.body)
            recurse(forNode.body);
    };
    const handleForInStatement = (node, recurse) => {
        const forInNode = node;
        const cfgNode = node.cfg;
        if (cfgNode) {
            cfgNode
                .connect(getEntry(forInNode.body), flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE)
                .connect(getSuccessor(forInNode), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
        }
        recurse(forInNode.body);
    };
    const handleForOfStatement = (node, recurse) => {
        const forOfNode = node;
        const cfgNode = node.cfg;
        if (cfgNode) {
            cfgNode
                .connect(getEntry(forOfNode.body), flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE)
                .connect(getSuccessor(forOfNode), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
        }
        recurse(forOfNode.body);
    };
    const handleIfStatement = (node, recurse) => {
        var _a;
        const ifNode = node;
        const testCfg = (_a = ifNode.test) === null || _a === void 0 ? void 0 : _a.cfg;
        if (!testCfg)
            return;
        testCfg.connect(getEntry(ifNode.consequent), flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE);
        if (ifNode.alternate) {
            testCfg.connect(getEntry(ifNode.alternate), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
            recurse(ifNode.alternate);
        }
        else {
            testCfg.connect(getSuccessor(ifNode), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
        }
        recurse(ifNode.consequent);
    };
    const handleSwitchCase = (node, recurse) => {
        var _a, _b, _c, _d;
        const switchCaseNode = node;
        const parent = (_a = switchCaseNode.cfg) === null || _a === void 0 ? void 0 : _a.parent;
        if (!parent)
            return;
        let targetCase = switchCaseNode;
        while (targetCase.consequent.length === 0 && ((_b = targetCase.cfg) === null || _b === void 0 ? void 0 : _b.nextSibling)) {
            targetCase = targetCase.cfg.nextSibling.astNode;
        }
        const entry = targetCase.consequent.length > 0
            ? getEntry(targetCase.consequent[0])
            : getSuccessor(parent);
        if (switchCaseNode.test) {
            (_c = switchCaseNode.cfg) === null || _c === void 0 ? void 0 : _c.connect(entry, flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE).connect(getSuccessor(node), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
        }
        else {
            (_d = switchCaseNode.cfg) === null || _d === void 0 ? void 0 : _d.connect(entry);
        }
        switchCaseNode.consequent.forEach(recurse);
    };
    const handleSwitchStatement = (node, recurse) => {
        var _a;
        const switchNode = node;
        if (switchNode.cases.length > 0) {
            (_a = switchNode.cfg) === null || _a === void 0 ? void 0 : _a.connect(switchNode.cases[0].cfg);
        }
        switchNode.cases.forEach(recurse);
    };
    const handleTryStatement = (node, recurse) => {
        var _a, _b;
        const tryNode = node;
        if ((_a = tryNode.handler) === null || _a === void 0 ? void 0 : _a.body) {
            catchStack.push(getEntry(tryNode.handler.body));
        }
        if (tryNode.finalizer) {
            finallyStack.push(getEntry(tryNode.finalizer));
        }
        recurse(tryNode.block);
        if ((_b = tryNode.handler) === null || _b === void 0 ? void 0 : _b.body)
            catchStack.pop();
        if (tryNode.handler)
            recurse(tryNode.handler.body);
        if (tryNode.finalizer)
            recurse(tryNode.finalizer);
    };
    const handleWhileStatement = (node, recurse) => {
        var _a;
        const whileNode = node;
        (_a = whileNode.test.cfg) === null || _a === void 0 ? void 0 : _a.connect(getEntry(whileNode.body), flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE).connect(getSuccessor(whileNode), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
        recurse(whileNode.body);
    };
    // cfg logic walker configuration
    const mainHandlers = {
        DoWhileStatement: (node, recurse) => {
            var _a;
            const doWhileNode = node;
            (_a = doWhileNode.test.cfg) === null || _a === void 0 ? void 0 : _a.connect(getEntry(doWhileNode.body), flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE).connect(getSuccessor(doWhileNode), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
            recurse(doWhileNode.body);
        },
        ExpressionStatement: (node, recurse) => {
            var _a;
            const exprStatment = node;
            (_a = exprStatment.cfg) === null || _a === void 0 ? void 0 : _a.connect(getEntry(exprStatment.expression));
            recurse(exprStatment.expression);
            connectNext(exprStatment.expression);
        },
        SequenceExpression: (node, recurse) => {
            var _a;
            const sequeneceNode = node;
            for (const expr of sequeneceNode.expressions) {
                (_a = expr.cfg) === null || _a === void 0 ? void 0 : _a.connect(getSuccessor(expr));
                recurse(expr);
            }
        },
        ConditionalExpression: (node, recurse) => {
            var _a, _b, _c;
            const condNode = node;
            (_a = condNode.test.cfg) === null || _a === void 0 ? void 0 : _a.connect(getEntry(condNode.consequent), flownode_1.FlowNode.TRUE_BRANCH_CONNECTION_TYPE).connect(getEntry(condNode.alternate), flownode_1.FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
            recurse(condNode.consequent);
            recurse(condNode.alternate);
            (_b = condNode.consequent.cfg) === null || _b === void 0 ? void 0 : _b.connect(getSuccessor(condNode));
            (_c = condNode.alternate.cfg) === null || _c === void 0 ? void 0 : _c.connect(getSuccessor(condNode));
        },
        LogicalExpression: (node, recurse) => {
            var _a, _b;
            const logicNode = node;
            // TODO: short circuit should be considered later
            (_a = logicNode.left.cfg) === null || _a === void 0 ? void 0 : _a.connect(getEntry(logicNode.right));
            recurse(logicNode.left);
            recurse(logicNode.right);
            (_b = logicNode.right.cfg) === null || _b === void 0 ? void 0 : _b.connect(getSuccessor(node));
        },
        UpdateExpression: connectNext,
        AwaitExpression: (node, recurse) => {
            const awaitNode = node;
            // awaitNode.cfg?.connect(getEntry(awaitNode.argument));
            recurse(awaitNode.argument);
            connectNext(node);
        },
        FunctionDeclaration: noopHandler,
        FunctionExpression: noopHandler,
        ForStatement: handleForStatement,
        ForInStatement: handleForInStatement,
        ForOfStatement: handleForOfStatement,
        IfStatement: handleIfStatement,
        SwitchCase: handleSwitchCase,
        SwitchStatement: handleSwitchStatement,
        ThrowStatement: (node) => {
            var _a;
            (_a = node.cfg) === null || _a === void 0 ? void 0 : _a.connect(getExceptionTarget(), flownode_1.FlowNode.EXCEPTION_CONNECTION_TYPE);
        },
        TryStatement: handleTryStatement,
        VariableDeclaration: (node, recurse) => {
            var _a;
            const varDeclNode = node;
            if (varDeclNode.declarations.length > 0) {
                (_a = varDeclNode.cfg) === null || _a === void 0 ? void 0 : _a.connect(varDeclNode.declarations[0].cfg);
            }
            varDeclNode.declarations.forEach(recurse);
        },
        ClassDeclaration: connectNext,
        VariableDeclarator: connectNext,
        WhileStatement: handleWhileStatement,
        // ImportDeclaration
        ImportDeclaration: connectNext,
        // ExportDeclaration
        ExportNamedDeclaration: connectNext,
        ExportDefaultDeclaration: connectNext,
        ExportAllDeclaration: connectNext,
        ReturnStatement: connectNext, // No need explictly terminate
        LabeledStatement: (node, recurse) => {
            recurse(node.body);
        },
    };
    // Main Logic
    (0, walkes_1.default)(astNode, mainHandlers);
    const entryNode = flownodeFactory_1.flownodeFactory.createEntryNode(astNode);
    entryNode.connect(getEntry(astNode), flownode_1.FlowNode.NORMAL_CONNECTION_TYPE);
    // cleanup handle walker configuration
    const cleanupHandlers = {
        default: (node, recurse) => {
            if (!node.cfg)
                return;
            // NOTE: delete the cfg property to avoid circular references during serialization
            delete node.cfg;
            walkes_1.default.checkProps(node, recurse);
        },
    };
    (0, walkes_1.default)(astNode, cleanupHandlers);
    // Get all nodes
    const visited = new Set();
    function collectNodes(node) {
        if (!node || visited.has(node))
            return;
        visited.add(node);
        allNodes.push(node);
        CONNECTION_TYPES.forEach((type) => {
            const next = node.typeTable[type];
            if (Array.isArray(next)) {
                next.forEach((n) => collectNodes(n));
            }
            else if (next) {
                collectNodes(next);
            }
        });
    }
    collectNodes(entryNode);
    function noopHandler() { }
    function connectNext(node) {
        var _a;
        (_a = node.cfg) === null || _a === void 0 ? void 0 : _a.connect(getSuccessor(node));
    }
    function getExceptionTarget() {
        return catchStack[catchStack.length - 1];
    }
    function getJumpTarget(astNode, types) {
        var _a, _b;
        var parent = (_a = astNode.cfg) === null || _a === void 0 ? void 0 : _a.parent;
        while (parent && types.indexOf(parent.type) === -1 && ((_b = parent.cfg) === null || _b === void 0 ? void 0 : _b.parent)) {
            parent = parent.cfg.parent;
        }
        return parent && types.indexOf(parent.type) !== -1 ? parent : null;
    }
    function getSuccessor(node) {
        var _a, _b, _c, _d, _e;
        if (!node) {
            return node;
        }
        if (node.cfg && node.cfg.nextSibling) {
            return node.cfg.nextSibling;
        }
        const parent = (_a = node.cfg) === null || _a === void 0 ? void 0 : _a.parent;
        if (!parent) {
            return exitNode;
        }
        switch (parent.type) {
            case "TryStatement":
                return parent.finalizer && node !== parent.finalizer
                    ? getEntry(parent.finalizer)
                    : getSuccessor(parent);
            case "SwitchCase":
                const nextSibling = (_b = parent.cfg) === null || _b === void 0 ? void 0 : _b.nextSibling;
                if (!nextSibling) {
                    return getSuccessor(parent);
                }
                let check = nextSibling.astNode;
                while (check && !check.consequent.length && ((_c = check.cfg) === null || _c === void 0 ? void 0 : _c.nextSibling)) {
                    check = (_d = check.cfg) === null || _d === void 0 ? void 0 : _d.nextSibling.astNode;
                }
                return check && check.consequent.length
                    ? getEntry(check.consequent[0])
                    : getSuccessor((_e = parent.cfg) === null || _e === void 0 ? void 0 : _e.parent);
            default:
                return getSuccessor(parent);
        }
    }
    function getEntry(node) {
        var _a, _b, _c, _d;
        if (!node)
            return node;
        let target;
        switch (node.type) {
            case "BreakStatement":
                return getSuccessor((_a = getJumpTarget(node, BREAK_TARGETS)) !== null && _a !== void 0 ? _a : node);
            case "ContinueStatement":
                // directly jump out loop
                return getSuccessor((_b = getJumpTarget(node, CONTINUE_TARGETS)) !== null && _b !== void 0 ? _b : node);
            case "BlockStatement":
            case "Program":
                return node.body.length
                    ? getEntry(node.body[0])
                    : getSuccessor(node);
            case "DoWhileStatement":
                return getEntry(node.body);
            case "EmptyStatement":
                return getSuccessor(node);
            case "ForStatement":
                return (((_c = node.init) === null || _c === void 0 ? void 0 : _c.cfg) ||
                    ((_d = node.test) === null || _d === void 0 ? void 0 : _d.cfg) ||
                    getEntry(node.body));
            case "FunctionDeclaration":
                return getSuccessor(node);
            case "IfStatement":
                return node.test.cfg;
            case "ExpressionStatement":
                return getEntry(node.expression);
            case "SwitchStatement":
                return getEntry(node.cases[0]);
            case "VariableDeclaration":
                return getEntry(node.declarations[0]);
            case "SequenceExpression":
                return getEntry(node.expressions[0]);
            case "ConditionalExpression":
                return node.test.cfg;
            case "LogicalExpression":
                return node.left.cfg;
            case "TryStatement":
                return getEntry(node.block);
            case "WhileStatement":
                return node.test.cfg;
            case "LabeledStatement":
                return getEntry(node.body);
            default:
                return node.cfg;
        }
    }
    function linkSiblings(astNode) {
        function backToFront(list, recurse) {
            for (let i = list.length - 1; i >= 0; i--) {
                const child = list[i];
                if (i < list.length - 1 && (child === null || child === void 0 ? void 0 : child.cfg)) {
                    child.cfg.nextSibling = getEntry(list[i + 1]);
                }
                recurse(child);
            }
        }
        function BlockOrProgram(node, recurse) {
            backToFront(node.body, recurse);
        }
        const linkSiblingHandlers = {
            BlockStatement: BlockOrProgram,
            Program: BlockOrProgram,
            // Scope Isolation
            FunctionDeclaration: noopHandler,
            FunctionExpression: noopHandler,
            ArrowFunctionExpression: noopHandler,
            ClassDeclaration: noopHandler,
            ClassExpression: noopHandler,
            CatchClause: noopHandler,
            SwitchCase: (node, recurse) => {
                backToFront(node.consequent, recurse);
            },
            SwitchStatement: (node, recurse) => {
                backToFront(node.cases, recurse);
            },
            VariableDeclaration: (node, recurse) => {
                backToFront(node.declarations, recurse);
            },
            SequenceExpression: (node, recurse) => {
                backToFront(node.expressions, recurse);
            },
        };
        (0, walkes_1.default)(astNode, linkSiblingHandlers);
    }
    function hasScopeIsolation(node) {
        return [
            "FunctionDeclaration",
            "FunctionExpression",
            "ArrowFunctionExpression",
        ].includes(node.type);
    }
    return new cfgResult_1.CFGResult(entryNode, exitNode, allNodes);
}
exports.default = ControlFlowGraph;
