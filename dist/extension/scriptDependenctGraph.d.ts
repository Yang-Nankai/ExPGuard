import { ScriptRegistry } from "./extensionRegistry";
import { ScriptKey } from "./extensionScript";
export type DependencyGraph = Map<ScriptKey, Set<ScriptKey>>;
export declare class ScriptDependencyGraph {
    private readonly registry;
    constructor(registry: ScriptRegistry);
    build(): DependencyGraph;
}
