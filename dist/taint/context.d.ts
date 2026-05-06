import { ExtensionScript } from "../extension/extensionScript";
import { TaintSource, TaintPathRecord, TaintSinkRecord, TaintSanitizerRecord, PseudoTaintSender, PseudoTaintReceiver } from "./types";
/** ----------------------------------------
 * File-level Context (uses DAG for paths)
 * ---------------------------------------- */
export declare class TaintContext {
    readonly filename: string;
    readonly script: ExtensionScript;
    sources: TaintSource[];
    paths: TaintPathRecord[];
    sinks: TaintSinkRecord[];
    sanitizers: TaintSanitizerRecord[];
    defToTaintIds: Map<number, Set<number>>;
    knownTaintIds: Set<number>;
    sourceKeyToTaintId: Map<string, number>;
    pathDag: Map<number, Map<string, TaintPathRecord>>;
    constructor(script: ExtensionScript);
    reset(): void;
    syncPathsFromDag(): void;
}
/** ----------------------------------------
 * InterContextBridge
 * ---------------------------------------- */
export declare class InterContextBridge {
    channel: string;
    outer?: string;
    senders: PseudoTaintSender[];
    receivers: PseudoTaintReceiver[];
    constructor(channel: string, outer?: string);
    matches(otherOuter?: string): boolean;
    addSender(s: PseudoTaintSender): void;
    addReceiver(r: PseudoTaintReceiver): void;
}
