import { BuiltInSemantics, Def, defFactory, interAnalyzer } from "../index";
import { scriptUsageTracker } from "../../../../extension/scriptUsageTracker";

// --------------------- chrome.scripting.executeScript -------------------
BuiltInSemantics.register(
  "chrome.scripting.executeScript",
  (args, callNode, astNode, _thisDef) => {
    interAnalyzer.setCurrentSideEffects(); // side effect
    const options = args[0];

    if (Def.isObjectDef(options)) {
      const funcDef = options.lookupProperty("func");
      const argsDef = options.lookupProperty("args");
      const filesDef = options.lookupProperty("files");
      const fileDef = options.lookupProperty("file");

      if (Def.isObjectDef(filesDef)) {
        for (const item of filesDef.values) {
          if (Def.isLiteralDef(item) && typeof item.value === "string") {
            scriptUsageTracker.markReferencedScriptByPathOrUrlByKey(
              callNode.scopeTree?.key,
              item.value,
              false, // executeScript injects into a page tab, not the caller frame
            );
          }
        }
      }

      if (Def.isLiteralDef(fileDef) && typeof fileDef.value === "string") {
        scriptUsageTracker.markReferencedScriptByPathOrUrlByKey(
          callNode.scopeTree?.key,
          fileDef.value,
          false, // executeScript injects into a page tab, not the caller frame
        );
      }

      if (Def.isFunctionDef(funcDef)) {
        const argDefs = Def.isObjectDef(argsDef) ? [...argsDef.values] : [];
        interAnalyzer.analyze(callNode, funcDef, argDefs, null, astNode);
      }

      return defFactory.createPromiseDef(callNode);
    }
  },
);
