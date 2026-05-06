import logger from "../utils/logger";
// import { resolveRelativeScriptKey, ScriptKey } from "../utils/scriptKey";
import { ScriptRegistry } from "./extensionRegistry";
import { ScriptKey } from "./extensionScript";

export type DependencyGraph = Map<ScriptKey, Set<ScriptKey>>;

export class ScriptDependencyGraph {
  constructor(
    private readonly registry: ScriptRegistry
  ) {}

  build(): DependencyGraph {
    const graph: DependencyGraph = new Map();

    for (const script of this.registry.values()) {
      const deps = new Set<string>();
      const info = script.getDependencies();
      const sources = [];

      for (const source of info) {
        sources.push(source);
      }
      
      for (const source of sources) {
        const key = script.resolveRelativeScriptKey(source);

        if (key && this.registry.has(key)) {
          deps.add(key);
        }
        else {
          logger.warn(
            `Unresolved dependency in script ${script.key}: ${key}`
          );
        }
      }

      graph.set(script.key, deps);
    }

    return graph;
  }
}
