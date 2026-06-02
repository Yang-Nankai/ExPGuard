import {
  BuiltInSemantics,
  defFactory,
  Def,
  interAnalyzer,
  taintManager,
} from "../index";

/**
 * ======================================================
 * =================== React Semantics ==================
 * ======================================================
 *
 * Only the HTML-injection surface is modeled. The flagship sink is
 * `dangerouslySetInnerHTML={{ __html: x }}`, which Babel compiles to a
 * `React.createElement(type, { dangerouslySetInnerHTML: { __html: x } }, ...)`
 * call — so hooking `createElement` catches both the JSX and the raw forms.
 */

// --------------------- React.createElement -------------------
BuiltInSemantics.register(
  "React.createElement",
  (args, callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();

    // args = [type, props, ...children]
    const propsDef = args[1];

    if (Def.isObjectDef(propsDef)) {
      const dangerous = propsDef.lookupProperty("dangerouslySetInnerHTML");

      if (Def.isObjectDef(dangerous)) {
        const htmlDef = dangerous.lookupProperty("__html");
        if (htmlDef) {
          taintManager.checkSink(
            htmlDef,
            "REACT_DANGEROUS_HTML",
            astNode,
            "React.createElement",
          );
        }
      } else if (dangerous) {
        // `dangerouslySetInnerHTML={tainted}` (not an object literal) — still
        // check the whole value defensively.
        taintManager.checkSink(
          dangerous,
          "REACT_DANGEROUS_HTML",
          astNode,
          "React.createElement",
        );
      }
    }

    // Return a modeled element object.
    return defFactory.createObjectDef(callNode);
  },
);

// --------------------- ReactDOM.render -------------------
BuiltInSemantics.register("ReactDOM.render", (_args, _callNode, _astNode) => {
  interAnalyzer.setCurrentSideEffects();
  // The element argument was already inspected at its createElement site.
  return undefined;
});
