import { ExtensionScript } from "../extension/extensionScript";
import { 
  TaintSource, TaintPathRecord, TaintSinkRecord, 
  TaintSanitizerRecord, OuterSourceRecord, OuterSinkRecord,
  PseudoTaintSender, PseudoTaintReceiver 
} from "./types";

/** ----------------------------------------
 * File-level Context (uses DAG for paths)
 * ---------------------------------------- */
export class TaintContext {
  readonly filename: string;
  readonly script: ExtensionScript;

  sources: TaintSource[] = [];
  paths: TaintPathRecord[] = [];
  sinks: TaintSinkRecord[] = [];
  sanitizers: TaintSanitizerRecord[] = [];

  // outerSenders: OuterSourceRecord[] = [];
  // outerReceivers: OuterSinkRecord[] = [];

  // tempSinks: NetworkCallInfo[] = [];
  defToTaintIds: Map<number, Set<number>> = new Map();
  knownTaintIds: Set<number> = new Set();
  
  sourceKeyToTaintId: Map<string, number> = new Map();
  pathDag: Map<number, Map<string, TaintPathRecord>> = new Map();

  constructor(script: ExtensionScript) {
    this.filename = script.key;
    this.script = script;
  }

  reset() {
    this.sources = [];
    this.paths = [];
    this.sinks = [];
    this.sanitizers = [];
    // this.outerSenders = [];
    // this.outerReceivers = [];
    // this.tempSinks = [];
    this.defToTaintIds.clear();
    this.knownTaintIds.clear();
    this.sourceKeyToTaintId.clear();
    this.pathDag.clear();
  }

  syncPathsFromDag() {
    const arr: TaintPathRecord[] = [];
    for (const map of this.pathDag.values()) {
      for (const p of map.values()) arr.push(p);
    }
    this.paths = arr;
  }
}

/** ----------------------------------------
 * InterContextBridge
 * ---------------------------------------- */
export class InterContextBridge {
  channel: string;
  outer?: string;
  senders: PseudoTaintSender[] = [];
  receivers: PseudoTaintReceiver[] = [];

  constructor(channel: string, outer?: string) {
    this.channel = channel;
    this.outer = outer;
  }

  matches(otherOuter?: string) {
    if (this.outer && otherOuter && this.outer !== otherOuter) return false;
    return true;
  }

  addSender(s: PseudoTaintSender) {
    this.senders.push(s);
  }

  addReceiver(r: PseudoTaintReceiver) {
    this.receivers.push(r);
  }
}