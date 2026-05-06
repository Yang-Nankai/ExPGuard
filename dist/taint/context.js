"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterContextBridge = exports.TaintContext = void 0;
/** ----------------------------------------
 * File-level Context (uses DAG for paths)
 * ---------------------------------------- */
class TaintContext {
    constructor(script) {
        this.sources = [];
        this.paths = [];
        this.sinks = [];
        this.sanitizers = [];
        // outerSenders: OuterSourceRecord[] = [];
        // outerReceivers: OuterSinkRecord[] = [];
        // tempSinks: NetworkCallInfo[] = [];
        this.defToTaintIds = new Map();
        this.knownTaintIds = new Set();
        this.sourceKeyToTaintId = new Map();
        this.pathDag = new Map();
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
        const arr = [];
        for (const map of this.pathDag.values()) {
            for (const p of map.values())
                arr.push(p);
        }
        this.paths = arr;
    }
}
exports.TaintContext = TaintContext;
/** ----------------------------------------
 * InterContextBridge
 * ---------------------------------------- */
class InterContextBridge {
    constructor(channel, outer) {
        this.senders = [];
        this.receivers = [];
        this.channel = channel;
        this.outer = outer;
    }
    matches(otherOuter) {
        if (this.outer && otherOuter && this.outer !== otherOuter)
            return false;
        return true;
    }
    addSender(s) {
        this.senders.push(s);
    }
    addReceiver(r) {
        this.receivers.push(r);
    }
}
exports.InterContextBridge = InterContextBridge;
