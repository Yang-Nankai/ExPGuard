// @ts-ignore
import esmangle from "./esmangle/lib/esmangle";
import * as astring from "astring";
import { createPipeline } from "./passes";
import logger from "../utils/logger";
import { Node } from "acorn";


/**
 * Run optimization/mangling passes on the AST and write the output script
 */
export const optimizeAST = (ast: Node): Node => {
  try {
    return esmangle.optimize(ast, createPipeline(), {
      destructive: true,
    });
  } catch (error) {
    logger.error("[optimizeAST] Error during AST mangling:", error);
    return ast;
  }
};

/**
 * Convert AST to code string
 */
export const astToString = (ast: Node): string => {
  try {
    return astring.generate(ast);
  } catch (error) {
    logger.error("[astToString] Error generating code from AST:", error);
    return "";
  }
};
