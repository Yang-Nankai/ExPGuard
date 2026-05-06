import Model from "../../model/model";
import Scope from "../../scope/scope";
import { BuiltInRegistry } from "../builtins/builtinRegistry";
import { defFactory } from "../factories/defFactory";
import { setReachingDef } from "../utils/utils";

export class BuiltInAnalyzer {
  analyze(model: Model) {
    if (!model?.graph) return;

    BuiltInRegistry.initialize();
    // FIX: attribute should taint in every model
    BuiltInRegistry.registerAttributeSources();

    const scope = model.mainlyRelatedScope;
    const entryNode = model.graph.entryNode;
    if (!scope) return;

    const builtIns = scope.builtInObjects; // [{ name: "Array" }, ...]
    const builtInVars = scope.builtInObjectVars; // Map(name → Var)

    builtIns?.forEach((name) => {
      const varSlot = builtInVars.get(name);
      if (!varSlot) return;

      if (["window", "globalThis", "global", "self"].includes(name) && Scope.isPageScope(scope)) {
        const def = defFactory.createGlobalDef(entryNode, scope);

        // [LastReachIns]
        setReachingDef(varSlot, def);
      } else {
        const def = BuiltInRegistry.registry.get(name);
        if (!def) return;
        // [LastReachIns]
        setReachingDef(varSlot, def);
      }
    });
  }
}

export const builtInAnalyzer = new BuiltInAnalyzer();
