"use strict";
// import { extractPatternNames } from "../../ast/patternVisitor";
// import walkes, { RecurseFunction, traverseSimple } from "../../ast/walkes";
// import { FlowNode } from "../../flownode/flownode";
// import Set from "../../utils/set";
// import VarDef from "../types/varDef";
// export function computeKillSetFromAST(
//   node: FlowNode,
//   reachIns: Set<VarDef>
// ): Set<VarDef> {
//   const killSet = new Set<VarDef>();
//   const scope = node.scope!;
//   if (!scope || !node.astNode) return killSet;
//   const killPattern = (pattern: any) => {
//     const names = extractPatternNames(pattern);
//     for (const name of names) {
//       const variable = scope.getVariable(name);
//       if (!variable) continue;
//       const killedDefs = findVarDefsGivenVar(reachIns, variable);
//       killedDefs.forEach((def) => killSet.add(def));
//     }
//   };
//   const visitors = {
//     AssignmentExpression(n: any, recurse: RecurseFunction) {
//       killPattern(n.left);
//       if (isNestedAssignment(n.right)) recurse(n.right);
//     },
//     VariableDeclarator: (n: any, recurse: RecurseFunction) => {
//       killPattern(n.id);
//       if (n.init) recurse(n.init);
//     },
//     VariableDeclaration(n: any, recurse: RecurseFunction) {
//       for (const d of n.declarations) {
//         recurse(d);
//       }
//     },
//     SequenceExpression(n: any, recurse: RecurseFunction) {
//       for (const expr of n.expressions) recurse(expr);
//     },
//     ConditionalExpression(n: any, recurse: RecurseFunction) {
//       recurse(n.test);
//       recurse(n.consequent);
//       recurse(n.alternate);
//     },
//     ClassDeclaration: handleStaticBlock,
//     ClassExpression: handleStaticBlock,
//     default: () => {},
//   };
//   walkes(node.astNode, visitors);
//   return killSet;
// }
// function handleStaticBlock(n: any, recurse: RecurseFunction) {
//   for (const e of n.body.body) {
//     if (e?.type === "StaticBlock") recurse(e);
//   }
// }
// function isNestedAssignment(node: any): boolean {
//   if (!node) return false;
//   const nestedTypes = [
//     "AssignmentExpression",
//     "UpdateExpression",
//     "SequenceExpression",
//     "ConditionalExpression",
//   ];
//   return nestedTypes.includes(node.type);
// }
