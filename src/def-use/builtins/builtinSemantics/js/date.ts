import {
  BuiltInSemantics,
  defFactory,
  taintManager,
} from "../index";

/**
 * Date formatters return fixed date/time grammar, not the original input
 * string.  Preserve taint for non-HTML sinks, but label the rendered output as
 * syntax-safe so `innerHTML`/eval-style sinks cannot manufacture a DOM-XSS
 * report from a timestamp alone.
 */
for (const method of [
  "toLocaleString",
  "toLocaleDateString",
  "toLocaleTimeString",
  "toISOString",
  "toUTCString",
  "toDateString",
  "toTimeString",
]) {
  BuiltInSemantics.register(`Date.prototype.${method}`, (_args, callNode, astNode, thisDef) => {
    const result = defFactory.createStringSafeDef(callNode);
    taintManager.propagateTaint(thisDef, result, astNode, "RETURN", `Date.${method}`);
    return result;
  });
}
