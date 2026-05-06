"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaintManager = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const location_1 = require("../utils/location");
const uuid_1 = require("../utils/uuid");
const context_1 = require("./context");
const config_1 = __importStar(require("../config"));
const errorCode_1 = require("../utils/errorCode");
const policy_1 = require("./policy");
const constraintSeverity_1 = require("./constraintSeverity");
const fileTimer_1 = require("../utils/fileTimer");
const scriptUsageTracker_1 = require("../extension/scriptUsageTracker");
/* ============================================================
 * Helpers
 * ============================================================ */
/**
 * Build stable source key for deduplicating taint ids.
 */
function buildSourceKey(sourceType, node, remark) {
    const r = node === null || node === void 0 ? void 0 : node.range;
    const base = r ? `${sourceType}@${r[0]}:${r[1]}` : `${sourceType}@unknown`;
    // Keep distinct sources created at the same AST node but with different
    // semantic meaning (e.g. chrome.storage.get for different keys).
    return remark ? `${base}#${remark}` : base;
}
/** ----------------------------------------
 * TaintManager
 * ---------------------------------------- */
class TaintManager {
    constructor() {
        var _a;
        this._contexts = new Map();
        this._currentContext = null;
        this._bridges = new Map();
        this._resolvedBridgePairs = new Set();
        this._storageSets = [];
        this._storageGets = [];
        // report options (can be changed at runtime)
        this._reportOptions = Object.assign(Object.assign({}, config_1.DEFAULT_REPORT_OPTIONS), ((_a = config_1.default.taintReportOptions) !== null && _a !== void 0 ? _a : {}));
    }
    /* ============================================================
     * Context Management
     * ============================================================ */
    enterFile(script) {
        let ctx = this._contexts.get(script.key);
        if (!ctx) {
            ctx = new context_1.TaintContext(script);
            this._contexts.set(script.key, ctx);
        }
        this._currentContext = ctx;
    }
    exitFile() {
        this._currentContext = null;
    }
    get current() {
        if (!this._currentContext) {
            throw new Error("TaintManager: no active file context");
        }
        return this._currentContext;
    }
    /* ============================================================
     * Storage Modeling
     * ============================================================ */
    /**
     * Record storage.set(key, value)
     */
    recordStorageSet(area, key, valueDef, astNode) {
        this._storageSets.push({
            area,
            key,
            valueDef,
            contextFilename: this.current.filename,
            astNode,
        });
    }
    /**
     * Record storage.get(key) and immediately create
     * a PSEUDO_STORAGE taint.
     */
    recordStorageGet(area, key, targetDef, astNode) {
        const ctx = this.current;
        const taintId = this.createTaintSource(targetDef, "PSEUDO_STORAGE", astNode, true, `storage.${area}.get('${key}')`);
        this._storageGets.push({
            area,
            key,
            targetDef,
            taintId,
            contextFilename: ctx.filename,
            astNode,
        });
        return taintId;
    }
    /* ============================================================
     * Taint Source
     * ============================================================ */
    createTaintSource(def, sourceType, astNode, isPseudo = false, remark) {
        const ctx = this.current;
        const taintId = this._getOrCreateSourceTaintId(ctx, sourceType, astNode, remark);
        // Only record source when first appears
        if (!ctx.sources.some((s) => s.taintId === taintId)) {
            ctx.sources.push({
                taintId,
                sourceType,
                originDefId: def.uniqueId,
                isPseudo,
                remark,
            });
        }
        this._addTaintIdToDef(ctx, def, taintId);
        return taintId;
    }
    _getOrCreateSourceTaintId(ctx, sourceType, astNode, remark) {
        const key = buildSourceKey(sourceType, astNode, remark);
        const existed = ctx.sourceKeyToTaintId.get(key);
        if (existed)
            return existed;
        const id = uuid_1.taintGenerator.nextId();
        ctx.sourceKeyToTaintId.set(key, id);
        ctx.knownTaintIds.add(id);
        return id;
    }
    /* =======================
     * Propagation (creates edges in DAG)
     * ======================= */
    propagateTaint(from, to, astNode, kind = "OTHER", remark = "") {
        if (!from || !to || !from.isTainted)
            return;
        if (from.uniqueId === to.uniqueId)
            return;
        const ctx = this.current;
        const fromSet = ctx.defToTaintIds.get(from.uniqueId);
        if (!fromSet)
            return;
        for (const taintId of fromSet) {
            this._addTaintIdToDef(ctx, to, taintId);
            this._addPathEdge(ctx, taintId, from, to, astNode, kind, remark);
        }
    }
    /* ============================================================
     * Sink Checking
     * ============================================================ */
    /**
     * Check whether a tainted def reaches a sink.
     */
    checkSink(sourceDef, sinkType, astNode, remark, urlTaintControl) {
        if (!sourceDef || !sourceDef.isTainted)
            return;
        const ctx = this.current;
        const taintIds = this.getDefTaintIds(sourceDef);
        if (taintIds.length === 0)
            return;
        for (const taintId of taintIds) {
            const rec = {
                taintId,
                sinkType,
                sourceDef: sourceDef,
                astNode,
                remark,
                urlTaintControl,
            };
            ctx.sinks.push(rec);
            logger_1.default.debug(`[TAINT-SINK][${ctx.filename}] found [${sinkType}] in [${(0, location_1.formatLocation)(astNode)}] with remark [${remark !== null && remark !== void 0 ? remark : ""}] and url-control [${urlTaintControl !== null && urlTaintControl !== void 0 ? urlTaintControl : "N/A"}]`);
        }
    }
    /* ============================================================
     * Sanitizer
     * ============================================================ */
    /**
     * Remove taint from a def for specific taint ids.
     */
    applySanitizer(def, sanitizerName, astNode) {
        if (!def)
            return;
        const ids = this.getDefTaintIds(def);
        if (ids.length === 0)
            return;
        const ctx = this.current;
        for (const taintId of ids) {
            this.sanitizeDefForTaint(ctx, def, taintId);
            ctx.sanitizers.push({
                taintId,
                sanitizerName,
                def,
                astNode,
            });
            logger_1.default.warn(`[TAINT-SANITIZER][${ctx.filename}] clear taint [${taintId}] state by sanitizer ${sanitizerName} in [${(0, location_1.formatLocation)(astNode)}]`);
        }
    }
    sanitizeDefForTaint(ctx, def, taintId) {
        const set = ctx.defToTaintIds.get(def.uniqueId);
        if (!set)
            return;
        set.delete(taintId);
        if (set.size === 0) {
            ctx.defToTaintIds.delete(def.uniqueId);
            def.clearTaintFlag();
        }
    }
    /* ============================================================
     * DAG Helpers
     * ============================================================ */
    _edgeKey(fromId, toId, astNode) {
        const r1 = astNode === null || astNode === void 0 ? void 0 : astNode.range;
        const rPart = r1 ? `${r1[0]}:${r1[1]}` : "unknown";
        return `${fromId}->${toId}@${rPart}`;
    }
    /**
     * Insert propagation edge into taint DAG.
     */
    _addPathEdge(ctx, taintId, from, to, astNode, PropagateType = "OTHER", remark = "") {
        if (!ctx.pathDag.has(taintId))
            ctx.pathDag.set(taintId, new Map());
        const dag = ctx.pathDag.get(taintId);
        const key = this._edgeKey(from.uniqueId, to.uniqueId, astNode);
        if (dag.has(key))
            return; // already exists
        const rec = {
            taintId,
            fromDef: from,
            toDef: to,
            astNode,
            PropagateType,
            remark,
        };
        dag.set(key, rec);
        ctx.knownTaintIds.add(taintId);
        // keep compatibility array small — rebuild on demand
        // TODO: Should rebuild on demand in report phase
        // ctx.syncPathsFromDag();
    }
    /* ============================================================
     * Query
     * ============================================================ */
    getDefTaintIds(def) {
        const s = this.current.defToTaintIds.get(def.uniqueId);
        return s ? [...s] : [];
    }
    /* ============================================================
     * Pseudo-Taint Resolution
     * ============================================================ */
    addPseudoTaintReceiver(receiver) {
        const key = this._bridgeKey(receiver.channel, receiver.outer);
        let bridge = this._bridges.get(key);
        if (!bridge) {
            bridge = new context_1.InterContextBridge(receiver.channel, receiver.outer);
            this._bridges.set(key, bridge);
        }
        bridge.addReceiver(receiver);
        this.tryResolveBridgeByKey(key);
    }
    addPseudoTaintSender(sender) {
        if (!sender.taintDef.isTainted)
            return;
        const key = this._bridgeKey(sender.channel, sender.outer);
        let bridge = this._bridges.get(key);
        if (!bridge) {
            bridge = new context_1.InterContextBridge(sender.channel, sender.outer);
            this._bridges.set(key, bridge);
        }
        bridge.addSender(sender);
        this.tryResolveBridgeByKey(key);
    }
    _bridgeKey(channel, outer) {
        return `${channel}::${outer !== null && outer !== void 0 ? outer : "<no-outer>"}`;
    }
    tryResolveBridgeByKey(key) {
        const bridge = this._bridges.get(key);
        if (!bridge)
            return;
        const contextsWithUpdates = new Set();
        this.processBridge(bridge, this._resolvedBridgePairs, contextsWithUpdates);
        this.syncAllContexts(contextsWithUpdates);
    }
    /**
     * Analyze the relationship between Storage Set and Get
     */
    resolveStorageTaints() {
        if (this._storageGets.length === 0 || this._storageSets.length === 0)
            return;
        const contextsWithUpdates = new Set();
        for (const getReq of this._storageGets) {
            const receiverCtx = this.getContext(getReq.contextFilename);
            if (!receiverCtx)
                continue;
            // Find all Set operations that match this key.
            const matchingSets = this._storageSets.filter((s) => s.key === getReq.key && s.area === getReq.area);
            for (const setReq of matchingSets) {
                const senderCtx = this.getContext(setReq.contextFilename);
                if (!senderCtx)
                    continue;
                // Retrieves all true taints contained in the Set (excluding false taints to avoid infinite recursion).
                const s = senderCtx.defToTaintIds.get(setReq.valueDef.uniqueId);
                const senderTaintIds = (s ? [...s] : []).filter((id) => {
                    const src = senderCtx.sources.find((s) => s.taintId === id);
                    return src && !src.isPseudo;
                });
                for (const sTaintId of senderTaintIds) {
                    // Create a composition source to introduce the Sender's taint into the Receiver environment.
                    const syntheticId = this.createSyntheticSourceFromStorage(setReq, senderCtx, sTaintId, getReq, receiverCtx);
                    // Cloning path: Sender's path -> Receiver
                    this.cloneSenderPaths(senderCtx, sTaintId, receiverCtx, syntheticId);
                    // Add logical edges across storage
                    this._addPathEdge(receiverCtx, syntheticId, setReq.valueDef, getReq.targetDef, getReq.astNode, "STORAGE", `STORAGE_FLOW[area: ${getReq.area}, key: ${getReq.key}, sender: ${senderCtx.filename}, receiver: ${receiverCtx.filename}]`);
                    // Key: Replace/merge the original PSEUDO_STORAGE taint path into this actual synthetic taint.
                    this.mergePseudoToSynthetic(receiverCtx, getReq.taintId, syntheticId);
                    contextsWithUpdates.add(receiverCtx);
                }
            }
        }
        this.syncAllContexts(contextsWithUpdates);
    }
    /**
     * Synthesis source created specifically for storage
     */
    createSyntheticSourceFromStorage(setReq, senderCtx, senderTaintId, getReq, receiverCtx) {
        var _a;
        const senderSource = senderCtx.sources.find((s) => s.taintId === senderTaintId);
        const syntheticId = uuid_1.taintGenerator.nextId();
        receiverCtx.knownTaintIds.add(syntheticId);
        receiverCtx.sources.push({
            taintId: syntheticId,
            sourceType: (_a = senderSource === null || senderSource === void 0 ? void 0 : senderSource.sourceType) !== null && _a !== void 0 ? _a : "STORAGE_DATA",
            remark: `From storage.${setReq.area}.set('${setReq.key}') in ${senderCtx.filename}`,
            originDefId: setReq.valueDef.uniqueId,
            isPseudo: false,
        });
        this._addTaintIdToDef(receiverCtx, getReq.targetDef, syntheticId);
        return syntheticId;
    }
    /**
     * Merge the temporary pseudo-taint path generated by Get into the actual synthetic taint path.
     */
    mergePseudoToSynthetic(ctx, pseudoId, syntheticId) {
        const pseudoDag = ctx.pathDag.get(pseudoId);
        if (!pseudoDag)
            return;
        if (!ctx.pathDag.has(syntheticId))
            ctx.pathDag.set(syntheticId, new Map());
        const targetDag = ctx.pathDag.get(syntheticId);
        for (const rec of pseudoDag.values()) {
            const key = this._edgeKey(rec.fromDef.uniqueId, rec.toDef.uniqueId, rec.astNode);
            if (!targetDag.has(key)) {
                targetDag.set(key, Object.assign(Object.assign({}, rec), { taintId: syntheticId }));
            }
        }
        // Simultaneously merge Sink
        const sinksToClone = ctx.sinks.filter((s) => s.taintId === pseudoId);
        for (const sink of sinksToClone) {
            if (!ctx.sinks.some((s) => s.taintId === syntheticId && s.astNode === sink.astNode)) {
                ctx.sinks.push(Object.assign(Object.assign({}, sink), { taintId: syntheticId }));
            }
        }
        // Update taintId for outer senders that match the pseudoId
        // for (const sender of ctx.outerSenders) {
        //   if (sender.taintId === pseudoId) {
        //     sender.taintId = syntheticId;
        //   }
        // }
    }
    /**
     * Handling a single bridge
     */
    processBridge(bridge, resolved, contextsWithUpdates) {
        const { senders, receivers } = bridge;
        // Handling bridges that exist on both the sender and receiver
        if (senders.length > 0 && receivers.length > 0) {
            this.processBridgeWithBothSides(bridge, resolved, contextsWithUpdates);
        }
    }
    /**
     * Handling bidirectional bridging
     */
    processBridgeWithBothSides(bridge, resolved, contextsWithUpdates) {
        for (const sender of bridge.senders) {
            const senderCtx = this.getContext(sender.contextFilename);
            if (!senderCtx)
                continue;
            const senderTaintIds = this.getValidSenderTaintIds(senderCtx, sender);
            if (!senderTaintIds.length)
                continue;
            for (const receiver of bridge.receivers) {
                // If the sender and receiver are in the same file and not in an outer scope, skip.
                if (receiver.contextFilename === sender.contextFilename &&
                    !receiver.outer) {
                    // TODO: Later there should be consider manifest.json file!
                    continue;
                }
                const receiverCtx = this.getContext(receiver.contextFilename);
                if (!receiverCtx)
                    continue;
                this.processSenderReceiverPair(sender, senderCtx, senderTaintIds, receiver, receiverCtx, bridge, resolved, contextsWithUpdates);
            }
        }
    }
    /**
     * Obtain a valid sender taint ID
     */
    getValidSenderTaintIds(ctx, sender) {
        const taintSet = ctx.defToTaintIds.get(sender.taintDef.uniqueId);
        if (!taintSet || taintSet.size === 0)
            return [];
        const validTaintIds = [];
        for (const taintId of taintSet) {
            const source = ctx.sources.find((s) => s.taintId === taintId);
            // Ensure it's a genuine source, not a fake blemish.
            if (source && !source.isPseudo) {
                validTaintIds.push(taintId);
            }
        }
        return validTaintIds;
    }
    withReceiverContext(receiverCtx, fn) {
        const prevCtx = this._currentContext;
        this._currentContext = receiverCtx;
        // resolvePseudoTaints 阶段通常没有活动 timer，这里给 receiver 建一个
        let ownTimer = false;
        if (!fileTimer_1.fileTimerManager.getCurrentTimer()) {
            fileTimer_1.fileTimerManager.setCurrentTimer(receiverCtx.script.absPath, receiverCtx.script.getFileSize());
            ownTimer = true;
        }
        try {
            fn();
        }
        finally {
            this._currentContext = prevCtx;
            if (ownTimer)
                fileTimer_1.fileTimerManager.clearCurrentTimer();
        }
    }
    materializeSenderMessageTaintInReceiver(sender, senderCtx, senderTaintId, receiver, receiverCtx, channel) {
        const senderSource = senderCtx.sources.find((s) => s.taintId === senderTaintId);
        if (!senderSource || senderSource.isPseudo)
            return;
        // 把真实 source 元信息带入 receiver 上下文（避免 report 时 source 丢失）
        if (!receiverCtx.sources.some((s) => s.taintId === senderTaintId)) {
            receiverCtx.sources.push({
                taintId: senderTaintId,
                sourceType: senderSource.sourceType,
                remark: senderSource.remark,
                originDefId: sender.taintDef.uniqueId,
                isPseudo: false,
            });
        }
        // 关键：将该 source 下关联的所有 Def 一并绑定到 receiverCtx，
        // 避免仅 taint sender.message 时漏掉 message.urlCtrl 等派生 Def。
        const relatedDefs = new Map();
        relatedDefs.set(sender.taintDef.uniqueId, sender.taintDef);
        const senderDag = senderCtx.pathDag.get(senderTaintId);
        if (senderDag) {
            for (const rec of senderDag.values()) {
                relatedDefs.set(rec.fromDef.uniqueId, rec.fromDef);
                relatedDefs.set(rec.toDef.uniqueId, rec.toDef);
            }
        }
        for (const def of relatedDefs.values()) {
            this._addTaintIdToDef(receiverCtx, def, senderTaintId);
        }
        // 记录跨上下文 MESSAGE 边
        this._addPathEdge(receiverCtx, senderTaintId, sender.taintDef, sender.taintDef, receiver.astNode, "MESSAGE", `${channel}[${senderCtx.filename}->${receiverCtx.filename}]`);
    }
    /**
     * Processing sender-receiver pairs
     */
    processSenderReceiverPair(sender, senderCtx, senderTaintIds, receiver, receiverCtx, bridge, resolved, contextsWithUpdates) {
        for (const senderTaintId of senderTaintIds) {
            const key = this.generateResolvedKey(receiver, sender, senderTaintId);
            // if (resolved.has(key)) continue;
            resolved.add(key);
            // 新逻辑：deferred receiver，直接用 sender.message 驱动回调
            if (receiver.deferredMessage) {
                this.materializeSenderMessageTaintInReceiver(sender, senderCtx, senderTaintId, receiver, receiverCtx, bridge.channel);
                this.withReceiverContext(receiverCtx, () => {
                    receiver.deferredMessage.invoke(sender.taintDef);
                });
                contextsWithUpdates.add(receiverCtx);
                continue;
            }
            // 旧逻辑：非 deferred 继续 synthetic source 路线
            // TODO: add message constraint validation here to filter out infeasible paths.
            // Create a synthesis source
            const syntheticId = this.createSyntheticSource(sender, senderCtx, senderTaintId, receiver, receiverCtx);
            // Cloning sender path
            this.cloneSenderPaths(senderCtx, senderTaintId, receiverCtx, syntheticId);
            // Add cross-page margin
            this.addCrossPageEdge(sender, senderCtx, receiver, receiverCtx, syntheticId, bridge.channel);
            // Cloned receiver pseudo-taint path
            this.cloneReceiverPseudoPaths(receiver, receiverCtx, syntheticId);
            // clone receiver's sink
            this.cloneReceiverSinks(receiver, receiverCtx, syntheticId);
            // Mark the context that needs to be synchronized.
            contextsWithUpdates.add(receiverCtx);
        }
    }
    /**
     * Build a unique key for a resolved cross-context taint pair.
     */
    generateResolvedKey(receiver, sender, senderTaintId) {
        var _a;
        const r = (_a = receiver.astNode) === null || _a === void 0 ? void 0 : _a.range;
        const receiverIdentity = receiver.taintId
            ? `tid:${receiver.taintId}`
            : r
                ? `loc:${r[0]}:${r[1]}`
                : "loc:unknown";
        const senderDefId = sender.taintDef.uniqueId;
        return `${receiver.contextFilename}:${receiverIdentity}:${sender.contextFilename}:${senderDefId}:${senderTaintId}`;
    }
    /**
     * Create a synthetic taint source in the receiver context
     * based on the sender's original source.
     */
    createSyntheticSource(sender, senderCtx, senderTaintId, receiver, receiverCtx) {
        const senderSource = senderCtx.sources.find((s) => s.taintId === senderTaintId);
        if (!senderSource)
            throw errorCode_1.Errors.TaintError("SyntheticSource sender source not found");
        const syntheticId = uuid_1.taintGenerator.nextId();
        receiverCtx.knownTaintIds.add(syntheticId);
        receiverCtx.sources.push({
            taintId: syntheticId,
            sourceType: senderSource.sourceType,
            remark: senderSource.remark,
            originDefId: sender.taintDef.uniqueId,
            isPseudo: false,
        });
        // Map synthetic taint to receiver target definition
        if (receiver.targetDef) {
            this._addTaintIdToDef(receiverCtx, receiver.targetDef, syntheticId);
        }
        return syntheticId;
    }
    /**
     * Clone all propagation paths of a sender taint
     * into the receiver context under a synthetic taint ID.
     */
    cloneSenderPaths(senderCtx, senderTaintId, receiverCtx, syntheticId) {
        const senderDag = senderCtx.pathDag.get(senderTaintId);
        if (!senderDag)
            return;
        if (!receiverCtx.pathDag.has(syntheticId)) {
            receiverCtx.pathDag.set(syntheticId, new Map());
        }
        const rDag = receiverCtx.pathDag.get(syntheticId);
        for (const [edgeKey, pathRec] of senderDag.entries()) {
            const newRec = {
                taintId: syntheticId,
                fromDef: pathRec.fromDef,
                toDef: pathRec.toDef,
                astNode: pathRec.astNode,
                PropagateType: pathRec.PropagateType,
                remark: pathRec.remark,
            };
            const freshKey = this._edgeKey(newRec.fromDef.uniqueId, newRec.toDef.uniqueId, newRec.astNode);
            if (!rDag.has(freshKey)) {
                rDag.set(freshKey, newRec);
            }
        }
    }
    /**
     * Add a MESSAGE edge representing cross-context propagation.
     */
    addCrossPageEdge(sender, senderCtx, receiver, receiverCtx, syntheticId, channel) {
        var _a;
        const toDef = (_a = receiver.targetDef) !== null && _a !== void 0 ? _a : sender.taintDef;
        this._addPathEdge(receiverCtx, syntheticId, sender.taintDef, toDef, receiver.astNode, "MESSAGE", `${channel}[${senderCtx.filename}->${receiverCtx.filename}]`);
    }
    /**
     * Clone receiver's pseudo-taint paths to the synthetic taint.
     */
    cloneReceiverPseudoPaths(receiver, receiverCtx, syntheticId) {
        if (!receiver.taintId)
            return;
        const rSrcDag = receiverCtx.pathDag.get(receiver.taintId);
        if (!rSrcDag)
            return;
        if (!receiverCtx.pathDag.has(syntheticId)) {
            receiverCtx.pathDag.set(syntheticId, new Map());
        }
        const synDag = receiverCtx.pathDag.get(syntheticId);
        for (const rec of rSrcDag.values()) {
            const mappedKey = this._edgeKey(rec.fromDef.uniqueId, rec.toDef.uniqueId, rec.astNode);
            if (!synDag.has(mappedKey)) {
                synDag.set(mappedKey, {
                    taintId: syntheticId,
                    fromDef: rec.fromDef,
                    toDef: rec.toDef,
                    astNode: rec.astNode,
                    PropagateType: rec.PropagateType,
                    remark: rec.remark,
                });
            }
        }
    }
    /**
     * Clone receiver sinks from pseudo taint to synthetic taint.
     */
    cloneReceiverSinks(receiver, receiverCtx, syntheticId) {
        if (!receiver.taintId)
            return;
        const sinksToClone = receiverCtx.sinks.filter((s) => s.taintId === receiver.taintId);
        for (const sink of sinksToClone) {
            receiverCtx.sinks.push(Object.assign(Object.assign({}, sink), { taintId: syntheticId }));
        }
    }
    /**
     * Sync path DAGs and update outer receivers for all contexts.
     */
    syncAllContexts(contextsWithUpdates) {
        for (const ctx of this._contexts.values()) {
            if (contextsWithUpdates.has(ctx)) {
                ctx.syncPathsFromDag();
            }
            // this.updateOuterReceivers(ctx);
            // this._cleanupOrphanOuterSenders(ctx);
        }
    }
    getContext(filename) {
        var _a;
        return (_a = this._contexts.get(filename)) !== null && _a !== void 0 ? _a : null;
    }
    /* ============================================================
     * Reprot
     * ============================================================ */
    generateReportForFile(filename, opts) {
        const ctx = this._contexts.get(filename);
        if (!ctx)
            return null;
        const fileFrame = scriptUsageTracker_1.scriptUsageTracker.getPrimaryFrameByKey(ctx.filename);
        if (!(0, policy_1.shouldIncludeScriptInPolicy)(ctx.filename)) {
            return {
                filename: ctx.filename,
                fileFrame,
                issues: [],
                totalIssues: 0,
            };
        }
        // Storage pseudo taints are still resolved in report phase.
        this.resolveStorageTaints();
        const mergedOpts = Object.assign(Object.assign({}, this._reportOptions), (opts || {}));
        return this._generateReportFromContext(ctx, mergedOpts);
    }
    generateGlobalReport(opts) {
        // Storage pseudo taints are still resolved in report phase.
        this.resolveStorageTaints();
        const mergedOpts = Object.assign(Object.assign({}, this._reportOptions), (opts || {}));
        // returns array of per-file reports
        return [...this._contexts.values()]
            .filter((ctx) => (0, policy_1.shouldIncludeScriptInPolicy)(ctx.filename))
            .map((ctx) => this._generateReportFromContext(ctx, mergedOpts));
    }
    /**
     * Extract a code snippet around a node with optional context.
     * Returns the snippet and the node's relative offsets.
     */
    _getCodeSnippet(ctx, node, contextChars = 50) {
        var _a, _b;
        if (!node)
            return null;
        if (!ctx || !ctx.script)
            return null;
        try {
            const code = (_b = (_a = ctx.script).getCode) === null || _b === void 0 ? void 0 : _b.call(_a);
            if (!code)
                return null;
            const range = node === null || node === void 0 ? void 0 : node.range;
            if (!range || !Array.isArray(range) || range.length !== 2) {
                return null;
            }
            const [nodeStart, nodeEnd] = range;
            // Validate range boundaries
            if (nodeStart < 0 || nodeEnd > code.length || nodeStart >= nodeEnd) {
                return null;
            }
            // Expand snippet range with surrounding context
            const snippetStart = Math.max(0, nodeStart - contextChars);
            const snippetEnd = Math.min(code.length, nodeEnd + contextChars);
            const snippet = code.substring(snippetStart, snippetEnd);
            const nodeOffsetInSnippet = nodeStart - snippetStart;
            const nodeLength = nodeEnd - nodeStart;
            return {
                snippet,
                startOffset: nodeOffsetInSnippet,
                endOffset: nodeOffsetInSnippet + nodeLength,
            };
        }
        catch (err) {
            logger_1.default.debug(`Failed to get code snippet: ${err}`);
            return null;
        }
    }
    /**
     * Cached location formatter to avoid repeated formatLocation calls.
     */
    _makeLocFormatter() {
        const cache = new Map();
        return (node) => {
            if (!node)
                return "[unknown]";
            const r = node === null || node === void 0 ? void 0 : node.range;
            const key = r ? `${r[0]}:${r[1]}` : JSON.stringify(node);
            if (cache.has(key))
                return cache.get(key);
            try {
                const formatted = (0, location_1.formatLocation)(node);
                cache.set(key, formatted);
                return formatted;
            }
            catch (_a) {
                cache.set(key, "[unknown]");
                return "[unknown]";
            }
        };
    }
    /**
     * Build a truncated flow list according to report options.
     * Each `paths` item is { kind, loc, remark }
     */
    _truncateFlows(paths, opts) {
        const n = paths.length;
        if (opts.level === "detailed" || n <= opts.headCount + opts.tailCount + 2) {
            // show all (or small enough)
            return {
                list: paths.slice(0, Math.min(n, opts.maxFlowPerIssue)),
                omitted: 0,
            };
        }
        if (opts.level === "partial") {
            const head = paths.slice(0, opts.headCount);
            const tail = paths.slice(n - opts.tailCount, n);
            const omitted = Math.max(0, n - (head.length + tail.length));
            return {
                list: [
                    ...head,
                    {
                        kind: "...",
                        loc: `... (${omitted} steps omitted)`,
                        remark: undefined,
                    },
                    ...tail,
                ],
                omitted,
            };
        }
        // brief
        const head = paths.slice(0, Math.min(1, n));
        const tail = paths.slice(Math.max(n - 1, 0), n);
        const omitted = Math.max(0, n - (head.length + tail.length));
        return {
            list: [
                ...head,
                {
                    kind: "...",
                    loc: `... (${omitted} steps omitted)`,
                    remark: undefined,
                },
                ...tail,
            ],
            omitted,
        };
    }
    /**
     * Generate a structured report from a single taint context.
     */
    _generateReportFromContext(ctx, opts) {
        var _a;
        const issues = [];
        const fileFrame = scriptUsageTracker_1.scriptUsageTracker.getPrimaryFrameByKey(ctx.filename);
        const fileFrameConstraint = scriptUsageTracker_1.scriptUsageTracker.getFrameConstraint(fileFrame);
        const fileFrames = scriptUsageTracker_1.scriptUsageTracker.getScriptFrameDescriptorsByKey(ctx.filename);
        // Ensure paths array is synced (do once)
        ctx.syncPathsFromDag();
        // create cached formatter for this context
        const fmt = this._makeLocFormatter();
        for (const src of ctx.sources) {
            // Skip PSEUDO types entirely in final report
            if (src.isPseudo)
                continue;
            // if (shouldFilterSourceByFrame(src.sourceType, fileFrame)) continue;
            const paths = ctx.paths.filter((p) => p.taintId === src.taintId);
            const sinks = ctx.sinks.filter((s) => s.taintId === src.taintId);
            const sanitizers = ctx.sanitizers.filter((s) => s.taintId === src.taintId);
            if (paths.length === 0 && sinks.length === 0)
                continue;
            const sourceNode = (_a = paths[0]) === null || _a === void 0 ? void 0 : _a.astNode;
            let sourceCodeSnippet = null;
            if (opts.includeCode && sourceNode) {
                const snippet = this._getCodeSnippet(ctx, sourceNode, opts.codeContextChars);
                if (snippet) {
                    sourceCodeSnippet = this._formatCodeSnippet(snippet.snippet, snippet.startOffset, snippet.endOffset);
                }
            }
            // build flow records (kind + loc + remark + code)
            const fullFlow = paths.map((p) => {
                const flowItem = {
                    kind: p.PropagateType,
                    loc: fmt(p.astNode),
                    remark: p.remark || undefined,
                };
                if (opts.includeCode) {
                    const snippet = this._getCodeSnippet(ctx, p.astNode, opts.codeContextChars);
                    if (snippet) {
                        flowItem.code = this._formatCodeSnippet(snippet.snippet, snippet.startOffset, snippet.endOffset);
                    }
                }
                return flowItem;
            });
            // truncate according to opts
            const truncated = this._truncateFlows(fullFlow, opts);
            const sourceInfo = {
                kind: src.sourceType,
                remark: src.remark,
                loc: sourceNode ? fmt(sourceNode) : "[unknown]",
                file: ctx.filename,
                frame: fileFrame,
                frameConstraint: fileFrameConstraint,
                frames: fileFrames,
            };
            if (opts.includeCode && sourceCodeSnippet) {
                sourceInfo.code = sourceCodeSnippet;
            }
            const sinksWithCode = sinks.map((s) => {
                const sinkInfo = {
                    kind: s.sinkType,
                    remark: s.remark,
                    urlTaintControl: s.urlTaintControl,
                    loc: fmt(s.astNode),
                    file: ctx.filename,
                    frame: fileFrame,
                    frameConstraint: fileFrameConstraint,
                    frames: fileFrames,
                };
                if (opts.includeCode) {
                    const snippet = this._getCodeSnippet(ctx, s.astNode, opts.codeContextChars);
                    if (snippet) {
                        sinkInfo.code = this._formatCodeSnippet(snippet.snippet, snippet.startOffset, snippet.endOffset);
                    }
                }
                return sinkInfo;
            });
            issues.push({
                source: sourceInfo,
                // flow: truncated.list (list elements) + optionally omitted count
                flow: truncated.list,
                flowMeta: {
                    totalSteps: fullFlow.length,
                    omitted: truncated.omitted,
                },
                sinks: sinksWithCode,
                sanitized: sanitizers.length > 0,
            });
        }
        return {
            filename: ctx.filename,
            fileFrame,
            fileFrameConstraint,
            fileFrames,
            issues,
            totalIssues: issues.length,
        };
    }
    /**
     * Format a snippet and highlight the node region using markers.
     */
    _formatCodeSnippet(code, startOffset, endOffset, options = {}) {
        const { maxLength = 200, ellipsis = true } = options;
        if (startOffset >= 0 &&
            endOffset > startOffset &&
            endOffset <= code.length) {
            const before = code.substring(0, startOffset);
            const nodeCode = code.substring(startOffset, endOffset);
            const after = code.substring(endOffset);
            // If the code is too long, only a portion will be displayed.
            if (code.length > maxLength) {
                const halfMax = Math.floor(maxLength / 2);
                const beforeTruncated = before.length > halfMax
                    ? (ellipsis ? "..." : "") +
                        before.substring(before.length - halfMax)
                    : before;
                const afterTruncated = after.length > halfMax
                    ? after.substring(0, halfMax) + (ellipsis ? "..." : "")
                    : after;
                return beforeTruncated + ">>>" + nodeCode + "<<<" + afterTruncated;
            }
            return before + ">>>" + nodeCode + "<<<" + after;
        }
        // If there is no highlighted area, return to the code directly.
        if (code.length > maxLength && ellipsis) {
            return code.substring(0, maxLength) + "...";
        }
        return code;
    }
    /**
     * Collect unique source-to-sink flows across all contexts (lightweight mode).
     */
    _collectFlowsLite() {
        var _a, _b, _c, _d, _e;
        const flowSet = new Set();
        const flowObjs = [];
        for (const ctx of this._contexts.values()) {
            if (!(0, policy_1.shouldIncludeScriptInPolicy)(ctx.filename))
                continue;
            // ensure synced
            ctx.syncPathsFromDag();
            // per context formatter to speed up
            const fmt = this._makeLocFormatter();
            for (const sink of ctx.sinks) {
                const taintId = sink.taintId;
                const source = ctx.sources.find((s) => s.taintId === taintId);
                if (!source || source.isPseudo)
                    continue;
                const flowType = (0, policy_1.getFlowType)(source.sourceType, sink.sinkType);
                if (!flowType)
                    continue;
                const sourceNode = (_b = (_a = ctx.paths.find((p) => p.taintId === taintId)) === null || _a === void 0 ? void 0 : _a.astNode) !== null && _b !== void 0 ? _b : sink.astNode;
                const sourceLoc = sourceNode ? fmt(sourceNode) : "[unknown]";
                const sinkLoc = fmt(sink.astNode);
                const key = `${source.sourceType}|${ctx.filename}|${sourceLoc}|${sink.sinkType}|${sinkLoc}|${(_c = sink.remark) !== null && _c !== void 0 ? _c : ""}|${(_d = sink.urlTaintControl) !== null && _d !== void 0 ? _d : ""}`;
                if (!flowSet.has(key)) {
                    flowSet.add(key);
                    const message = ctx.paths.find((p) => p.taintId === taintId && p.PropagateType === "MESSAGE");
                    const storage = ctx.paths.find((p) => p.taintId === taintId && p.PropagateType === "STORAGE");
                    // Only backtrack source context for cross-context flows.
                    // For local in-context flows, forcing originDefId lookup may hit
                    // cloned defs in other contexts and misclassify source frame.
                    const hasCrossContextHop = !!message || !!storage;
                    const sourceCtx = hasCrossContextHop && source.originDefId
                        ? this._findContextByDefId(source.originDefId, ctx)
                        : ctx;
                    const sourceFile = (_e = sourceCtx === null || sourceCtx === void 0 ? void 0 : sourceCtx.filename) !== null && _e !== void 0 ? _e : ctx.filename;
                    const sourceFrame = scriptUsageTracker_1.scriptUsageTracker.getPrimaryFrameByKey(sourceFile);
                    const sourceFrameConstraint = scriptUsageTracker_1.scriptUsageTracker.getFrameConstraint(sourceFrame);
                    const sourceFrames = scriptUsageTracker_1.scriptUsageTracker.getScriptFrameDescriptorsByKey(sourceFile);
                    const sinkFrame = scriptUsageTracker_1.scriptUsageTracker.getPrimaryFrameByKey(ctx.filename);
                    const sinkFrameConstraint = scriptUsageTracker_1.scriptUsageTracker.getFrameConstraint(sinkFrame);
                    const sinkFrames = scriptUsageTracker_1.scriptUsageTracker.getScriptFrameDescriptorsByKey(ctx.filename);
                    const constraintSeverity = (0, constraintSeverity_1.analyzeFlowConstraintSeverity)({
                        sourceType: source.sourceType,
                        sinkType: sink.sinkType,
                        sourceFrame,
                        sourceFrameConstraint,
                    });
                    if ((0, policy_1.shouldFilterSourceByFrame)(source.sourceType, sourceFrame, sink.sinkType, sinkFrame)) {
                        continue;
                    }
                    const flowObj = {
                        flowType,
                        sourceType: source.sourceType,
                        sourceRemark: source.remark,
                        sourceFile,
                        sourceFrame,
                        sourceFrameConstraint,
                        sourceFrames,
                        sourceLoc,
                        sinkType: sink.sinkType,
                        sinkRemark: sink.remark,
                        sinkUrlTaintControl: sink.urlTaintControl,
                        sinkFile: ctx.filename,
                        sinkFrame,
                        sinkFrameConstraint,
                        sinkFrames,
                        sinkLoc,
                        ctx: ctx.filename,
                        messagePassing: !!message,
                        channel: message === null || message === void 0 ? void 0 : message.remark,
                        storagePassing: !!storage,
                        area: storage === null || storage === void 0 ? void 0 : storage.remark,
                        constraintKind: constraintSeverity.constraintKind,
                        severity: constraintSeverity.severity,
                        severityReason: constraintSeverity.severityReason,
                        severityEvidence: constraintSeverity.severityEvidence,
                    };
                    // Optionally attach source code snippet
                    if (this._reportOptions.includeCode && sourceNode) {
                        const snippet = this._getCodeSnippet(ctx, sourceNode, this._reportOptions.codeContextChars);
                        if (snippet) {
                            flowObj.sourceCode = this._formatCodeSnippet(snippet.snippet, snippet.startOffset, snippet.endOffset);
                        }
                    }
                    // Optionally attach sink code snippet
                    if (this._reportOptions.includeCode) {
                        const snippet = this._getCodeSnippet(ctx, sink.astNode, this._reportOptions.codeContextChars);
                        if (snippet) {
                            flowObj.sinkCode = this._formatCodeSnippet(snippet.snippet, snippet.startOffset, snippet.endOffset);
                        }
                    }
                    flowObjs.push(flowObj);
                }
            }
        }
        return flowObjs;
    }
    /**
     * Global summary (JSON format)
     */
    getGlobalSummary(opts) {
        const mergedOpts = Object.assign(Object.assign({}, this._reportOptions), (opts || {}));
        this.resolveStorageTaints();
        const flows = this._collectFlowsLite();
        /* =========================================================
         * TODO: Should not print here, need to fix in future
         * Log taint flow summary
         * ========================================================= */
        if (flows.length > 0) {
            logger_1.default.info(`Detected ${flows.length} taint flows:`);
            for (const f of flows) {
                logger_1.default.info(`[${f.flowType}] ${f.sourceType} -> ${f.sinkType} ` +
                    `(${f.sourceFile}:${f.sourceLoc} -> ${f.sinkFile}:${f.sinkLoc})`);
            }
        }
        return {
            hasFlows: flows.length > 0,
            flows,
        };
    }
    /* =======================
     * Utils
     * ======================= */
    _addTaintIdToDef(ctx, def, taintId) {
        const defId = def.uniqueId;
        if (!ctx.defToTaintIds.has(defId)) {
            ctx.defToTaintIds.set(defId, new Set());
        }
        ctx.defToTaintIds.get(defId).add(taintId);
        ctx.knownTaintIds.add(taintId);
        def.markTaintedFlag();
    }
    _findContextByDefId(defId, toCtx) {
        for (const ctx of this._contexts.values()) {
            if (ctx.defToTaintIds.has(defId) && ctx !== toCtx)
                return ctx;
        }
        return toCtx;
    }
    /* =======================
     * Debug
     * ======================= */
    resetAll() {
        this._contexts.clear();
        this._currentContext = null;
        this._bridges.clear();
        this._resolvedBridgePairs.clear();
        uuid_1.taintGenerator.reset();
    }
}
exports.TaintManager = TaintManager;
