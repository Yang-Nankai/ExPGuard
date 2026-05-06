"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeUseFromAST = computeUseFromAST;
const walkes_1 = __importDefault(require("../../ast/walkes"));
const varUseFactory_1 = require("../factories/varUseFactory");
const set_1 = __importDefault(require("../../utils/set"));
const SELF_ASSIGNMENT_OPERATOR = [
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "<<=",
    ">>=",
    ">>>=",
    "|=",
    "^=",
    "&=",
    "**=",
    "||=",
    "&&=",
    "??=",
];
function computeUseFromAST(cfgNode) {
    const cuse = new set_1.default();
    const puse = new set_1.default();
    const scope = cfgNode.scope;
    if (!cfgNode.astNode)
        return { cuse, puse };
    // 使用栈保证状态恢复（避免单 boolean 导致污染）
    const stack = [];
    const enterP = (v) => stack.push(v);
    const exitP = () => stack.pop();
    const inP = () => stack.length > 0 && stack[stack.length - 1];
    ;
    const useVisitors = {
        AssignmentExpression: (n, recurse) => {
            if (n.right && n.right.type === "AssignmentExpression") {
                recurse(n.right.left);
            }
            else if (SELF_ASSIGNMENT_OPERATOR.includes(n.operator)) {
                // self-assignment: left is both use and def
                recurse(n.left);
            }
            recurse(n.right);
        },
        BinaryExpression: (n, recurse) => {
            const isPredicate = Boolean(cfgNode.true && cfgNode.false);
            // Enter predicate-use context
            if (isPredicate)
                enterP(true);
            recurse(n.left);
            recurse(n.right);
            // Exit predicate-use context
            if (isPredicate)
                exitP();
        },
        CallExpression: (n, recurse) => {
            const isPredicate = Boolean(cfgNode.true && cfgNode.false);
            // Enter predicate-use context
            if (isPredicate)
                enterP(true);
            recurse(n.callee);
            // Exit predicate-use context
            if (isPredicate)
                exitP();
            for (let arg of n.arguments) {
                recurse(arg);
            }
        },
        VariableDeclaration: (n, recurse) => {
            for (let decl of n.declarations) {
                recurse(decl);
            }
        },
        SequenceExpression: (n, recurse) => {
            for (const expr of n.expressions) {
                recurse(expr);
            }
        },
        VariableDeclarator: (n, recurse) => {
            // NOTE: id is a pattern (no read here)
            if (n.init)
                recurse(n.init);
        },
        UpdateExpression: (n, recurse) => {
            recurse(n.argument);
        },
        NewExpression: (n, recurse) => {
            recurse(n.callee);
            for (let arg of n.arguments) {
                recurse(arg);
            }
        },
        UnaryExpression: (n, recurse) => {
            const isPredicate = Boolean(cfgNode.true && cfgNode.false);
            // Enter predicate-use context
            if (isPredicate)
                enterP(true);
            recurse(n.argument);
            // Exit predicate-use context
            if (isPredicate)
                exitP();
        },
        SwitchCase: (n, recurse) => {
            // case test is in predicate context
            enterP(true);
            if (n.test &&
                cfgNode.parent &&
                cfgNode.parent.type === "SwitchStatement") {
                recurse(cfgNode.parent.discriminant);
            }
            exitP();
        },
        ConditionalExpression: (n, recurse) => {
            enterP(true);
            recurse(n.test);
            exitP();
            recurse(n.consequent);
            recurse(n.alternate);
        },
        MemberExpression: (n, recurse) => {
            recurse(n.object);
            // property: only read if computed = true (e.g. obj[expr])
            if (n.computed)
                recurse(n.property);
        },
        ReturnStatement: (n, recurse) => {
            recurse(n.argument);
        },
        ForOfStatement: (n, recurse) => {
            // right (iterable) is read (C-use)
            enterP(false);
            // isPUseContext = false; // 迭代对象属于 C-USE
            recurse(n.right);
            exitP();
            recurse(n.left);
            recurse(n.body);
        },
        ForInStatement: (n, recurse) => {
            // right (object) is read
            enterP(false);
            // isPUseContext = false; // 迭代对象属于 C-USE
            recurse(n.right);
            exitP();
            recurse(n.left);
            recurse(n.body);
        },
        Identifier: (n, recurse) => {
            // Heuristic: identifier encountered here is a use unless it's part of a pattern/decl
            // Without parent tracking, this is best-effort: we rely on walker visit order to avoid visiting LHS patterns.
            var usedVar = scope.getVariable(n.name);
            if (!usedVar)
                return;
            if (inP()) {
                puse.add(varUseFactory_1.varUseFactory.create(usedVar, cfgNode));
            }
            else {
                cuse.add(varUseFactory_1.varUseFactory.create(usedVar, cfgNode));
            }
        },
        ClassDeclaration: (n, recurse) => {
            // Handle the static block in class body
            for (const bodyElement of n.body.body) {
                if (bodyElement && bodyElement.type === "StaticBlock") {
                    recurse(bodyElement);
                }
            }
        },
        ClassExpression: (n, recurse) => {
            // Handle the static block in class body
            for (const e of n.body.body) {
                if (e && e.type === "StaticBlock") {
                    recurse(e);
                }
            }
        },
        SpreadElement: (node, recurse) => {
            recurse(node.argument);
        },
    };
    // traverseSimple(cfgNode.astNode, useVisitors);
    (0, walkes_1.default)(cfgNode.astNode, useVisitors);
    // cache the use set
    cfgNode.cuse = cuse;
    cfgNode.puse = puse;
    return { cuse, puse };
}
