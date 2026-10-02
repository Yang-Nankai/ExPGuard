import { Def } from "../index";
import { isDefinitelyNonStringValue } from "../../../types/def";

/**
 * Resolve a named function's lexical self-binding at a call site. AST scope is
 * used as a precision backstop when def-use merging has conflated a compact
 * minified name with an outer tainted binding.
 */
export function isLexicalFunctionSelfReference(
  callNode: any,
  astNode: any,
  argumentIndex = 0,
): boolean {
  const candidate = astNode?.arguments?.[argumentIndex];
  if (candidate?.type !== "Identifier") return false;

  let scope: any = callNode?.scope;
  if (!scope && callNode?.scopeTree && astNode?.range) {
    scope = callNode.scopeTree.getNodeScopeByRange(astNode.range);
  }

  while (scope) {
    const fn = scope.ast as any;
    if (
      (fn?.type === "FunctionExpression" ||
        fn?.type === "FunctionDeclaration") &&
      fn.id?.name === candidate.name
    ) {
      return true;
    }
    scope = scope.parent;
  }

  return false;
}

/**
 * `eval` executes only primitive strings.  Passing a function (or another
 * known non-string literal) simply returns that value; it is not a dynamic
 * code-evaluation event.  Keep UnknownDef/ObjectDef conservative because they
 * can still represent a string-like attacker value at runtime.
 */
export function isDefinitelyNonStringForEval(value: Def | undefined): boolean {
  return isDefinitelyNonStringValue(value);
}

/**
 * Timer APIs accept callable handlers as well as code strings.  A set of
 * alternatives is definitely callable only when every member is a function;
 * mixed/unknown alternatives deliberately remain conservative and may still
 * be treated as a string-code sink by the caller.
 */
export function isDefinitelyCallableTimerHandler(
  value: Def | undefined,
): boolean {
  if (!value) return false;
  if (Def.isFunctionDef(value)) return true;

  if (Def.isImplicitDef(value) && value.size > 0) {
    for (const candidate of value.defs) {
      if (!isDefinitelyCallableTimerHandler(candidate)) return false;
    }
    return true;
  }

  return false;
}
