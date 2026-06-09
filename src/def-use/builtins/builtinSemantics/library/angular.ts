import {
  BuiltInSemantics,
  Def,
  interAnalyzer,
  taintManager,
} from "../index";

/**
 * ======================================================
 * ================== Angular Semantics =================
 * ======================================================
 *
 * Angular escapes interpolated HTML by default; the only way to inject raw
 * markup is to explicitly bypass the sanitizer:
 *   - `DomSanitizer.bypassSecurityTrust{Html,Url,ResourceUrl,Style,Script}(x)`
 *   - AngularJS `$sce.trustAs{Html,Url,...}(x)`
 *
 * Calling either on tainted data is itself the sink — the returned value is a
 * "trusted" wrapper that downstream `[innerHTML]` bindings render verbatim. We
 * therefore flag the call and pass the taint through (so a later sink still
 * sees it).
 *
 * NOTE: `DomSanitizer` is dependency-injected, so resolving the concrete
 * instance is out of scope; this models the method names on instances created
 * via the `DomSanitizer` constructor schema (best-effort).
 */

function checkBypass(args: Def[], astNode: any, remark: string): Def | null {
  const valueDef = args[0] ?? null;
  if (valueDef) {
    taintManager.checkSink(valueDef, "ANGULAR_BYPASS_SECURITY", astNode, remark);
  }
  // Pass the (possibly tainted) value through as the "trusted" result.
  return valueDef;
}

// --------------------- $sce.trustAs* (AngularJS) -------------------
BuiltInSemantics.register("$sce.trustAs", (args, _callNode, astNode) => {
  interAnalyzer.setCurrentSideEffects();
  return checkBypass(args, astNode, "$sce.trustAs");
});

// --------------------- DomSanitizer.bypassSecurityTrust* (Angular) -------------------
BuiltInSemantics.register(
  "angular.bypassSecurity",
  (args, _callNode, astNode) => {
    interAnalyzer.setCurrentSideEffects();
    return checkBypass(args, astNode, "DomSanitizer.bypassSecurityTrust");
  },
);
