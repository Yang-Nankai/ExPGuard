/// <reference path="../acorn.d.ts" />

/**
 * Control Flow Graph
 */
import walkes, { RecurseFunction, WalkerFunction } from "../ast/walkes";
import { flownodeFactory } from "../flownode/flownodeFactory";
import { ConnectionType, FlowNode } from "../flownode/flownode";
import {
  Node,
  DoWhileStatement,
  ExpressionStatement,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  IfStatement,
  Program,
  SwitchCase,
  SwitchStatement,
  TryStatement,
  WhileStatement,
  SequenceExpression,
  VariableDeclaration,
  ConditionalExpression,
  LogicalExpression,
  AwaitExpression,
} from "acorn";
import { CFGResult } from "./cfgResult";

// Constants
const CONTINUE_TARGETS = [
  "ForStatement",
  "ForInStatement",
  "ForOfStatement",
  "DoWhileStatement",
  "WhileStatement",
];
const BREAK_TARGETS = [...CONTINUE_TARGETS, "SwitchStatement"];

const CONNECTION_TYPES: ConnectionType[] = [
  FlowNode.EXCEPTION_CONNECTION_TYPE,
  FlowNode.TRUE_BRANCH_CONNECTION_TYPE,
  FlowNode.FALSE_BRANCH_CONNECTION_TYPE,
  FlowNode.NORMAL_CONNECTION_TYPE,
];

type TargetTypes = typeof BREAK_TARGETS | typeof CONTINUE_TARGETS;

/**
 * Control Flow Graph
 * @param astNode
 * @returns CFGResult
 */
function ControlFlowGraph(astNode: Node): CFGResult {
  const parentStack: Node[] = [];
  const exitNode = flownodeFactory.createExitNode();
  const catchStack: FlowNode[] = [exitNode];
  const finallyStack: FlowNode[] = [];
  const allNodes: FlowNode[] = [];

  /**
   *  create nodes walker configuration
   */
  const createNodesHandlers: Record<string, WalkerFunction> = {
    default: (node, recurse) => {
      const parent = parentStack[parentStack.length - 1];
      createNode(node, parent);

      // Skip recursion for isolationn scoped constructs
      if (hasScopeIsolation(node)) return;

      parentStack.push(node);
      walkes.checkProps(node, recurse);
      parentStack.pop();
    },
  };

  /**
   * Create the flownode with the ast cfg
   */
  function createNode(node: Node, parent?: Node) {
    if (!node.cfg) {
      const newNode = flownodeFactory.createNormalNode(node, parent);
      Object.defineProperty(node, "cfg", {
        value: newNode,
        configurable: true,
      });
    }
  }

  // nodes create
  walkes(astNode, createNodesHandlers);
  linkSiblings(astNode);

  // specifc logic handler configuration
  const handleForStatement: WalkerFunction = (node, recurse) => {
    const forNode = node as ForStatement;
    const testCfg = forNode.test?.cfg;
    const bodyEntry = getEntry(forNode.body);

    if (forNode.test) {
      testCfg
        ?.connect(bodyEntry, FlowNode.TRUE_BRANCH_CONNECTION_TYPE)
        .connect(getSuccessor(forNode), FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
    }

    if (forNode.update) {
      forNode.update.cfg?.connect(getSuccessor(forNode));
    }

    if (forNode.init) {
      forNode.init.cfg?.connect(testCfg || bodyEntry || getSuccessor(forNode));
    }

    if (forNode.body) recurse(forNode.body);
  };

  const handleForInStatement: WalkerFunction = (node, recurse) => {
    const forInNode = node as ForInStatement;
    const cfgNode = node.cfg;
    if (cfgNode) {
      cfgNode
        .connect(getEntry(forInNode.body), FlowNode.TRUE_BRANCH_CONNECTION_TYPE)
        .connect(
          getSuccessor(forInNode),
          FlowNode.FALSE_BRANCH_CONNECTION_TYPE
        );
    }
    recurse(forInNode.body);
  };

  const handleForOfStatement: WalkerFunction = (node, recurse) => {
    const forOfNode = node as ForOfStatement;
    const cfgNode = node.cfg;
    if (cfgNode) {
      cfgNode
        .connect(getEntry(forOfNode.body), FlowNode.TRUE_BRANCH_CONNECTION_TYPE)
        .connect(
          getSuccessor(forOfNode),
          FlowNode.FALSE_BRANCH_CONNECTION_TYPE
        );
    }
    recurse(forOfNode.body);
  };

  const handleIfStatement: WalkerFunction = (node, recurse) => {
    const ifNode = node as IfStatement;
    const testCfg = ifNode.test?.cfg;

    if (!testCfg) return;

    testCfg.connect(
      getEntry(ifNode.consequent),
      FlowNode.TRUE_BRANCH_CONNECTION_TYPE
    );

    if (ifNode.alternate) {
      testCfg.connect(
        getEntry(ifNode.alternate),
        FlowNode.FALSE_BRANCH_CONNECTION_TYPE
      );
      recurse(ifNode.alternate);
    } else {
      testCfg.connect(
        getSuccessor(ifNode),
        FlowNode.FALSE_BRANCH_CONNECTION_TYPE
      );
    }

    recurse(ifNode.consequent);
  };

  const handleSwitchCase: WalkerFunction = (node, recurse) => {
    const switchCaseNode = node as SwitchCase;
    const parent = switchCaseNode.cfg?.parent;
    if (!parent) return;

    let targetCase = switchCaseNode;
    while (targetCase.consequent.length === 0 && targetCase.cfg?.nextSibling) {
      targetCase = targetCase.cfg.nextSibling.astNode as SwitchCase;
    }

    const entry =
      targetCase.consequent.length > 0
        ? getEntry(targetCase.consequent[0])
        : getSuccessor(parent);

    if (switchCaseNode.test) {
      switchCaseNode.cfg
        ?.connect(entry, FlowNode.TRUE_BRANCH_CONNECTION_TYPE)
        .connect(getSuccessor(node), FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
    } else {
      switchCaseNode.cfg?.connect(entry);
    }
    switchCaseNode.consequent.forEach(recurse);
  };

  const handleSwitchStatement: WalkerFunction = (node, recurse) => {
    const switchNode = node as SwitchStatement;
    if (switchNode.cases.length > 0) {
      switchNode.cfg?.connect(switchNode.cases[0].cfg!);
    }
    switchNode.cases.forEach(recurse);
  };

  const handleTryStatement: WalkerFunction = (node, recurse) => {
    const tryNode = node as TryStatement;

    if (tryNode.handler?.body) {
      catchStack.push(getEntry(tryNode.handler.body));
    }

    if (tryNode.finalizer) {
      finallyStack.push(getEntry(tryNode.finalizer));
    }

    recurse(tryNode.block);

    if (tryNode.handler?.body) catchStack.pop();

    if (tryNode.handler) recurse(tryNode.handler.body);
    if (tryNode.finalizer) recurse(tryNode.finalizer);
  };

  const handleWhileStatement: WalkerFunction = (node, recurse) => {
    const whileNode = node as WhileStatement;
    whileNode.test.cfg
      ?.connect(getEntry(whileNode.body), FlowNode.TRUE_BRANCH_CONNECTION_TYPE)
      .connect(getSuccessor(whileNode), FlowNode.FALSE_BRANCH_CONNECTION_TYPE);
    recurse(whileNode.body);
  };

  // cfg logic walker configuration
  const mainHandlers: Record<string, WalkerFunction> = {
    DoWhileStatement: (node, recurse) => {
      const doWhileNode = node as DoWhileStatement;
      doWhileNode.test.cfg
        ?.connect(
          getEntry(doWhileNode.body),
          FlowNode.TRUE_BRANCH_CONNECTION_TYPE
        )
        .connect(
          getSuccessor(doWhileNode),
          FlowNode.FALSE_BRANCH_CONNECTION_TYPE
        );
      recurse(doWhileNode.body);
    },
    ExpressionStatement: (node, recurse) => {
      const exprStatment = node as ExpressionStatement;
      exprStatment.cfg?.connect(getEntry(exprStatment.expression));
      recurse(exprStatment.expression);
      connectNext(exprStatment.expression);
    },
    SequenceExpression: (node, recurse) => {
      const sequeneceNode = node as SequenceExpression;

      for (const expr of sequeneceNode.expressions) {
        expr.cfg?.connect(getSuccessor(expr));
        recurse(expr);
      }
    },
    ConditionalExpression: (node, recurse) => {
      const condNode = node as ConditionalExpression;

      condNode.test.cfg
        ?.connect(
          getEntry(condNode.consequent),
          FlowNode.TRUE_BRANCH_CONNECTION_TYPE
        )
        .connect(
          getEntry(condNode.alternate),
          FlowNode.FALSE_BRANCH_CONNECTION_TYPE
        );

      recurse(condNode.consequent);
      recurse(condNode.alternate);

      condNode.consequent.cfg?.connect(getSuccessor(condNode));
      condNode.alternate.cfg?.connect(getSuccessor(condNode));
    },
    LogicalExpression: (node, recurse) => {
      const logicNode = node as LogicalExpression;

      // TODO: short circuit should be considered later
      logicNode.left.cfg?.connect(getEntry(logicNode.right));

      recurse(logicNode.left);
      recurse(logicNode.right);

      logicNode.right.cfg?.connect(getSuccessor(node));
    },
    UpdateExpression: connectNext,
    AwaitExpression: (node, recurse) => {
      const awaitNode = node as AwaitExpression;
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
      node.cfg?.connect(
        getExceptionTarget(),
        FlowNode.EXCEPTION_CONNECTION_TYPE
      );
    },
    TryStatement: handleTryStatement,
    VariableDeclaration: (node, recurse) => {
      const varDeclNode = node as VariableDeclaration;
      if (varDeclNode.declarations.length > 0) {
        varDeclNode.cfg?.connect(varDeclNode.declarations[0].cfg!);
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
      recurse((node as any).body);
    },
  };

  // Main Logic
  walkes(astNode, mainHandlers);

  const entryNode = flownodeFactory.createEntryNode(astNode);
  entryNode.connect(getEntry(astNode), FlowNode.NORMAL_CONNECTION_TYPE);

  // cleanup handle walker configuration
  const cleanupHandlers: Record<string, WalkerFunction> = {
    default: (node, recurse) => {
      if (!node.cfg) return;
      // NOTE: delete the cfg property to avoid circular references during serialization
      delete node.cfg;
      walkes.checkProps(node, recurse);
    },
  };

  walkes(astNode, cleanupHandlers);

  // Get all nodes
  const visited = new Set<FlowNode>();
  function collectNodes(node: FlowNode) {
    if (!node || visited.has(node)) return;
    visited.add(node);
    allNodes.push(node);

    CONNECTION_TYPES.forEach((type) => {
      const next = node.typeTable[type];
      if (Array.isArray(next)) {
        next.forEach((n) => collectNodes(n));
      } else if (next) {
        collectNodes(next);
      }
    });
  }
  collectNodes(entryNode);

  function noopHandler() {}

  function connectNext(node: Node) {
    node.cfg?.connect(getSuccessor(node));
  }

  function getExceptionTarget(): FlowNode {
    return catchStack[catchStack.length - 1];
  }

  function getJumpTarget(astNode: Node, types: TargetTypes) {
    var parent = astNode.cfg?.parent;
    while (parent && types.indexOf(parent.type) === -1 && parent.cfg?.parent) {
      parent = parent.cfg.parent;
    }
    return parent && types.indexOf(parent.type) !== -1 ? parent : null;
  }

  function getSuccessor(node: Node): FlowNode {
    if (!node) {
      return node;
    }

    if (node.cfg && node.cfg.nextSibling) {
      return node.cfg.nextSibling;
    }

    const parent: any = node.cfg?.parent;
    if (!parent) {
      return exitNode;
    }

    switch (parent.type) {
      case "TryStatement":
        return parent.finalizer && node !== parent.finalizer
          ? getEntry(parent.finalizer as Node)
          : getSuccessor(parent);
      case "SwitchCase":
        const nextSibling = parent.cfg?.nextSibling;
        if (!nextSibling) {
          return getSuccessor(parent);
        }
        let check = nextSibling.astNode;
        while (check && !check.consequent.length && check.cfg?.nextSibling) {
          check = check.cfg?.nextSibling.astNode as Node;
        }
        return check && check.consequent.length
          ? getEntry(check.consequent[0])
          : getSuccessor(parent.cfg?.parent as Node);
      default:
        return getSuccessor(parent);
    }
  }

  function getEntry(node: Node): FlowNode {
    if (!node) return node;

    let target: any;
    switch (node.type) {
      case "BreakStatement":
        return getSuccessor(getJumpTarget(node, BREAK_TARGETS) ?? node);
      case "ContinueStatement":
        // directly jump out loop
        return getSuccessor(getJumpTarget(node, CONTINUE_TARGETS) ?? node);
      case "BlockStatement":
      case "Program":
        return (node as Program).body.length
          ? getEntry((node as Program).body[0])
          : getSuccessor(node);
      case "DoWhileStatement":
        return getEntry((node as DoWhileStatement).body);
      case "EmptyStatement":
        return getSuccessor(node);
      case "ForStatement":
        return (
          (node as ForStatement).init?.cfg ||
          (node as ForStatement).test?.cfg ||
          getEntry((node as ForStatement).body)
        );
      case "FunctionDeclaration":
        return getSuccessor(node);
      case "IfStatement":
        return (node as IfStatement).test.cfg!;
      case "ExpressionStatement":
        return getEntry((node as ExpressionStatement).expression);
      case "SwitchStatement":
        return getEntry((node as SwitchStatement).cases[0]);
      case "VariableDeclaration":
        return getEntry((node as VariableDeclaration).declarations[0]);
      case "SequenceExpression":
        return getEntry((node as SequenceExpression).expressions[0]);
      case "ConditionalExpression":
        return (node as ConditionalExpression).test.cfg!;
      case "LogicalExpression":
        return (node as LogicalExpression).left.cfg!;
      case "TryStatement":
        return getEntry((node as TryStatement).block);
      case "WhileStatement":
        return (node as WhileStatement).test.cfg!;
      case "LabeledStatement":
      return getEntry((node as any).body);
      default:
        return node.cfg!;
    }
  }

  function linkSiblings(astNode: Node) {
    function backToFront(list: Node[], recurse: RecurseFunction): void {
      for (let i = list.length - 1; i >= 0; i--) {
        const child = list[i];
        if (i < list.length - 1 && child?.cfg) {
          child.cfg.nextSibling = getEntry(list[i + 1]);
        }
        recurse(child);
      }
    }

    function BlockOrProgram(node: any, recurse: RecurseFunction) {
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
      SwitchCase: (node: any, recurse: RecurseFunction) => {
        backToFront(node.consequent, recurse);
      },
      SwitchStatement: (node: any, recurse: RecurseFunction) => {
        backToFront(node.cases, recurse);
      },
      VariableDeclaration: (node: any, recurse: RecurseFunction) => {
        backToFront(node.declarations, recurse);
      },
      SequenceExpression: (node: any, recurse: RecurseFunction) => {
        backToFront(node.expressions, recurse);
      },
    };

    walkes(astNode, linkSiblingHandlers);
  }

  function hasScopeIsolation(node: Node): boolean {
    return [
      "FunctionDeclaration",
      "FunctionExpression",
      "ArrowFunctionExpression",
    ].includes(node.type);
  }

  return new CFGResult(entryNode, exitNode, allNodes);
}

export default ControlFlowGraph;
