import acorn, { Options, Program } from "acorn";
import * as acornLoose from "acorn-loose";
import { Errors } from "../utils/errorCode";

/**
 * Default Acorn parsing options.
 * Centralized for consistency and maintainability.
 */
const DEFAULT_PARSE_OPTIONS: Options = {
  ecmaVersion: "latest",
  sourceType: "module",
  ranges: true,
  locations: true,
};

/**
 * Normalize and merge user-provided options with defaults.
 */
function normalizeOptions(options?: Options): Options {
  return {
    ...DEFAULT_PARSE_OPTIONS,
    ...options,
    sourceType: options?.sourceType ?? DEFAULT_PARSE_OPTIONS.sourceType,
    ecmaVersion: options?.ecmaVersion ?? DEFAULT_PARSE_OPTIONS.ecmaVersion,
    ranges: options?.ranges ?? DEFAULT_PARSE_OPTIONS.ranges,
    locations: options?.locations ?? DEFAULT_PARSE_OPTIONS.locations,
  };
}

/**
 * JSParser is responsible for parsing JavaScript code into an ESTree-compatible AST.
 */
export class JSParser {
  /**
   * Parse JavaScript code into an AST.
   *
   * Strategy:
   * 1. acorn (module)
   * 2. acorn (script) if module fails
   * 3. acorn-loose as a final fallback
   */
  parseAST(code: string, options?: Options): Program {
    const baseOptions = normalizeOptions(options);
    const errors: string[] = [];

    // 1. Try strict acorn parse (original sourceType)
    try {
      return acorn.parse(code, baseOptions) as Program;
    } catch (err) {
      errors.push(
        `[acorn:${baseOptions.sourceType}] ${(err as Error).message}`
      );
    }

    // 2. Retry with script if sourceType === module
    if (baseOptions.sourceType === "module") {
      try {
        return acorn.parse(code, {
          ...baseOptions,
          sourceType: "script",
        }) as Program;
      } catch (err) {
        errors.push(`[acorn:script] ${(err as Error).message}`);
      }
    }

    // 3. Fallback to acorn-loose
    try {
      return acornLoose.parse(code, {
        ...baseOptions,
        // acorn-loose ignores sourceType internally, but we keep options consistent
      }) as Program;
    } catch (err) {
      errors.push(`[acorn-loose] ${(err as Error).message}`);
    }

    // All strategies failed
    throw Errors.ParserError(
      `Failed to parse JavaScript code using all strategies:\n` +
        errors.map((e) => `- ${e}`).join("\n")
    );
  }
}

export const parser = new JSParser();
