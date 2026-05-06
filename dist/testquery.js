"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { exec } = require("child_process");
const jsParser_1 = require("./ast/jsParser");
// function analyzePage(code: string) {
//   const ast = parser.parseAST(code)
//   const optimizedAst = optimizeAST(ast);
//   const timer2 = performance.now();
//     const functions = NodeQuery
//     .from(optimizedAst as any)
//     .select(
//         S.type("FunctionExpression")
//     )
//     .has(
//         S.type("IfStatement")
//     )
//     .has(
//         S.type("AssignmentExpression")
//         .attrEq("left.type", "MemberExpression")
//         // .attrEq("left.object.name", "module")
//         .attrEq("left.property.name", "exports")
//         .has(
//             S.type("CallExpression")
//             .has(
//                 S.type("Identifier").attrEq("name", "chrome")
//             )
//         )
//     )
//     .result();
//     console.log(functions);
//   console.log(performance.now() - timer2);
//   const timer1 = performance.now();
//   const pattern = `FunctionExpression:has(IfStatement:has(VariableDeclarator[init.type="ArrowFunctionExpression"]):has(AssignmentExpression[left.object.name="module"][left.property.name="exports"]:has(CallExpression:has(Identifier[name="chrome"]))))`;
//   const result = esquery(optimizedAst as any, pattern);
//   console.log(result);
//   console.log(performance.now() - timer1);
//   console.log(result[0] === functions[0]);
//   const matches = FeatureModelRegistry.matchFunctions(optimizedAst);
//   console.log(matches);
// //   for (const node of result) {
// //     const pattern = ``
// //     const result = esquery(node as any, pattern);
// //     if (result.length > 0) {
// //       console.log("Matched feature:", result);
// //     }
// //   }
// // //   console.log(result);
// //     // const result = FeatureModelRegistry.match(optimizedAst);
// }
// const code = fs.readFileSync("D:\\Ph0jav7\\ExtensionSecurity\\StaticAnalysis\\ESAT-V5\\data\\test\\browser-polyfill.js", "utf-8");
// analyzePage(code);
const code1 = `return a + b`;
const ast = jsParser_1.parser.parseAST(code1);
console.log(ast);
