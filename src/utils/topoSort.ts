import { DependencyGraph } from "../extension/scriptDependenctGraph";
import Set from "./set";
import { ScriptKey } from "../extension/extensionScript";
import logger from "./logger";

export function topoSort(graph: DependencyGraph): ScriptKey[] {
  const visited = new Set<ScriptKey>();
  const visiting = new Set<ScriptKey>();
  const result: ScriptKey[] = [];

  function dfs(node: ScriptKey) {

    if (visited.has(node)) return;

    if (visiting.has(node)) {
      logger.error(`Circular dependency detected at script: ${node}, skipping...`);
      return;
      // throw Errors.LoaderError(
      //   `Circular dependency detected at script: ${node}`
      // );
    }

    visiting.add(node);

    const dependencies = graph.get(node) ?? [];

    for (const dep of dependencies) {
      dfs(dep);
    }

    visiting.delete(node);
    visited.add(node);
    result.push(node);
  }

  for (const node of graph.keys()) {
    dfs(node);
  }

  return result;
}

