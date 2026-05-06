import { DependencyGraph } from "../extension/scriptDependenctGraph";
import { ScriptKey } from "../extension/extensionScript";
export declare function topoSort(graph: DependencyGraph): ScriptKey[];
