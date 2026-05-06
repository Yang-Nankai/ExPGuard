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
/** ----------------------------------------
 * Helper
 * ---------------------------------------- */
function buildSourceKey(sourceType, node, remark) {
    const r = node === null || node === void 0 ? void 0 : node.range;
    if (!r) {
        return `${sourceType}@${remark !== null && remark !== void 0 ? remark : "unknown"}`;
    }
    return `${sourceType}@${r[0]}:${r[1]}`;
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
        this._storageSets = [];
        this._storageGets = [];
        // report options (can be changed at runtime)
        this._reportOptions = Object.assign(Object.assign({}, config_1.DEFAULT_REPORT_OPTIONS), ((_a = config_1.default.taintReportOptions) !== null && _a !== void 0 ? _a : {}));
    }
    /* =======================
     * Context
     * ======================= */
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
    /* =======================
     * Storage Modeling
     * ======================= */
    /**
     * 记录 storage.set(key, value)
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
     * 记录 storage.get(key)，并立即生成 PSEUDO_STORAGE 污点
     */
    recordStorageGet(area, key, targetDef, astNode) {
        const ctx = this.current;
        // 1. 创建 PSEUDO_STORAGE 类型的源
        const taintId = this.createTaintSource(targetDef, "PSEUDO_STORAGE", astNode, true, `storage.${area}.get('${key}')`);
        // 2. 记录以便后续 resolve
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
    /* =======================
     * Pseudo Taint (now routed through InterContextBridge)
     * ======================= */
    addPseudoTaintReceiver(receiver) {
        const key = this._bridgeKey(receiver.channel, receiver.outer);
        let bridge = this._bridges.get(key);
        if (!bridge) {
            bridge = new context_1.InterContextBridge(receiver.channel, receiver.outer);
            this._bridges.set(key, bridge);
        }
        bridge.addReceiver(receiver);
    }
    addPseudoTaintSender(sender) {
        const key = this._bridgeKey(sender.channel, sender.outer);
        let bridge = this._bridges.get(key);
        if (!bridge) {
            bridge = new context_1.InterContextBridge(sender.channel, sender.outer);
            this._bridges.set(key, bridge);
        }
        bridge.addSender(sender);
    }
    _bridgeKey(channel, outer) {
        return `${channel}::${outer !== null && outer !== void 0 ? outer : "<no-outer>"}`;
    }
    /* =======================
     * Source
     * ======================= */
    createTaintSource(def, sourceType, astNode, isPseudo = false, remark) {
        const ctx = this.current;
        // if (!astNode) {
        //   throw new Error("createTaintSource requires astNode for stable taint id");
        // }
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
        this._addTaintIdToDef(ctx, def.uniqueId, taintId);
        def.markTaintedFlag();
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
        const ctx = this.current;
        const fromSet = ctx.defToTaintIds.get(from.uniqueId);
        if (!fromSet)
            return;
        for (const taintId of fromSet) {
            this._addTaintIdToDef(ctx, to.uniqueId, taintId);
            to.markTaintedFlag();
            this._addPathEdge(ctx, taintId, from, to, astNode, kind, remark);
        }
    }
    /* =======================
     * Sink
     * ======================= */
    checkSink(def, sinkKind, astNode, remark) {
        if (!def || !def.isTainted)
            return;
        const ctx = this.current;
        const taintIds = this.getDefTaintIds(def);
        if (taintIds.length === 0)
            return;
        for (const taintId of taintIds) {
            const rec = {
                taintId,
                sinkKind,
                sinkDef: def,
                astNode,
                remark,
            };
            ctx.sinks.push(rec);
            logger_1.default.warn(`[TAINT-SINK][${ctx.filename}] ${sinkKind} @ ${(0, location_1.formatLocation)(astNode)}`);
        }
    }
    /* =======================
     * Sanitizer
     * ======================= */
    applySanitizer(def, sanitizerName, astNode, taintIds) {
        if (!def)
            return;
        const ctx = this.current;
        const ids = taintIds !== null && taintIds !== void 0 ? taintIds : this.getDefTaintIds(def);
        if (ids.length === 0)
            return;
        for (const taintId of ids) {
            this.sanitizeDefForTaint(ctx, def, taintId);
            ctx.sanitizers.push({
                taintId,
                sanitizerName,
                def,
                astNode,
            });
        }
    }
    sanitizeDefForTaint(ctx, def, taintId) {
        const set = ctx.defToTaintIds.get(def.uniqueId);
        if (!set)
            return;
        set.delete(taintId);
        if (set.size === 0) {
            ctx.defToTaintIds.delete(def.uniqueId);
            try {
                def.clearTaintFlag();
            }
            catch (_a) { }
        }
    }
    /* =======================
     * Query
     * ======================= */
    getDefTaintIds(def) {
        const s = this.current.defToTaintIds.get(def.uniqueId);
        return s ? [...s] : [];
    }
    /* =======================
     * DAG helpers
     * ======================= */
    _edgeKey(fromId, toId, astNode) {
        const r1 = astNode === null || astNode === void 0 ? void 0 : astNode.range;
        const rPart = r1 ? `${r1[0]}:${r1[1]}` : "unknown";
        return `${fromId}->${toId}@${rPart}`;
    }
    _addPathEdge(ctx, taintId, from, to, astNode, propagateKind = "OTHER", remark = "") {
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
            propagateKind,
            remark,
        };
        dag.set(key, rec);
        ctx.knownTaintIds.add(taintId);
        // keep compatibility array small — rebuild on demand
        ctx.syncPathsFromDag();
    }
    /* =======================
     * Resolve Pseudo-Taints (using InterContextBridge & ScopeTree validation)
     * - For each bridge, match senders <-> receivers
     * - Validate with ScopeTree (if provided)
     * - If sender has a real source on its def, create a synthetic real source in receiverCtx
     * - Copy sender paths into receiverCtx under the new synthetic taintId
     * - Insert a CROSSPAGE edge (GLOBAL, remark = 'PSEUDO-CROSSPAGE')
     * ======================= */
    resolvePseudoTaints() {
        // 1. 处理原有的消息通信桥接
        if (this._bridges.size > 0) {
            const resolved = new Set();
            const contextsWithUpdates = new Set();
            for (const bridge of this._bridges.values()) {
                this.processBridge(bridge, resolved, contextsWithUpdates);
            }
            this.syncAllContexts(contextsWithUpdates);
        }
        // 2. 处理 Storage 污点连接
        this.resolveStorageTaints();
    }
    /**
     * 核心修复：分析 Storage Set 和 Get 之间的关联
     */
    resolveStorageTaints() {
        if (this._storageGets.length === 0 || this._storageSets.length === 0)
            return;
        const contextsWithUpdates = new Set();
        for (const getReq of this._storageGets) {
            const receiverCtx = this.getContext(getReq.contextFilename);
            if (!receiverCtx)
                continue;
            // 寻找所有匹配该 Key 的 Set 操作
            const matchingSets = this._storageSets.filter(s => s.key === getReq.key && s.area === getReq.area);
            for (const setReq of matchingSets) {
                const senderCtx = this.getContext(setReq.contextFilename);
                if (!senderCtx)
                    continue;
                // 获取 Set 的值中包含的所有真实污点 (排除伪污点，避免无限递归)
                const s = senderCtx.defToTaintIds.get(setReq.valueDef.uniqueId);
                const senderTaintIds = (s ? [...s] : []).filter(id => {
                    const src = senderCtx.sources.find(s => s.taintId === id);
                    return src && !src.isPseudo;
                });
                for (const sTaintId of senderTaintIds) {
                    // 创建合成源，将 Sender 的污点引入 Receiver 环境
                    const syntheticId = this.createSyntheticSourceFromStorage(setReq, senderCtx, sTaintId, getReq, receiverCtx);
                    // 克隆路径：Sender 的路径 -> Receiver
                    this.cloneSenderPaths(senderCtx, sTaintId, receiverCtx, syntheticId);
                    // 添加跨存储的逻辑边
                    this._addPathEdge(receiverCtx, syntheticId, setReq.valueDef, getReq.targetDef, getReq.astNode, "GLOBAL", `STORAGE_FLOW[area: ${getReq.area}, key: ${getReq.key}]`);
                    // 关键：将原来的 PSEUDO_STORAGE 污点路径替换/合并到这个真实的合成污点上
                    this.mergePseudoToSynthetic(receiverCtx, getReq.taintId, syntheticId);
                    contextsWithUpdates.add(receiverCtx);
                }
            }
        }
        this.syncAllContexts(contextsWithUpdates);
    }
    /**
     * 专为 Storage 设计的合成源创建
     */
    createSyntheticSourceFromStorage(setReq, senderCtx, senderTaintId, getReq, receiverCtx) {
        var _a;
        const senderSource = senderCtx.sources.find(s => s.taintId === senderTaintId);
        const syntheticId = uuid_1.taintGenerator.nextId();
        receiverCtx.knownTaintIds.add(syntheticId);
        receiverCtx.sources.push({
            taintId: syntheticId,
            sourceType: (_a = senderSource === null || senderSource === void 0 ? void 0 : senderSource.sourceType) !== null && _a !== void 0 ? _a : "STORAGE_DATA",
            remark: `From storage.set('${setReq.key}') in ${senderCtx.filename}`,
            originDefId: setReq.valueDef.uniqueId,
            isPseudo: false,
        });
        this._addTaintIdToDef(receiverCtx, getReq.targetDef.uniqueId, syntheticId);
        getReq.targetDef.markTaintedFlag();
        return syntheticId;
    }
    /**
     * 将 Get 产生的临时伪污点路径合并到真实的合成污点路径中
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
        // 同时合并 Sink
        const sinksToClone = ctx.sinks.filter(s => s.taintId === pseudoId);
        for (const sink of sinksToClone) {
            if (!ctx.sinks.some(s => s.taintId === syntheticId && s.astNode === sink.astNode)) {
                ctx.sinks.push(Object.assign(Object.assign({}, sink), { taintId: syntheticId }));
            }
        }
    }
    /**
     * 处理单个桥接
     */
    processBridge(bridge, resolved, contextsWithUpdates) {
        const { senders, receivers } = bridge;
        // 处理发送者和接收者都存在的桥接
        if (senders.length > 0 && receivers.length > 0) {
            this.processBridgeWithBothSides(bridge, resolved, contextsWithUpdates);
        }
        // 只有发送者（发送到外部）
        else if (senders.length > 0) {
            this.processOutboundBridge(bridge, contextsWithUpdates);
        }
        // 只有接收者（从外部接收）
        else if (receivers.length > 0) {
            this.processInboundBridge(bridge, contextsWithUpdates);
        }
    }
    /**
     * 处理双向桥接
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
                // 如果发送者和接收者在同一文件，且不是外部作用域，跳过
                if (receiver.contextFilename === sender.contextFilename &&
                    !receiver.outer) {
                    continue;
                }
                const receiverCtx = this.getContext(receiver.contextFilename);
                if (!receiverCtx)
                    continue;
                this.processSenderReceiverPair(sender, senderCtx, senderTaintIds, receiver, receiverCtx, bridge, resolved, contextsWithUpdates);
            }
        }
    }
    _replaceOuterTaintId(ctx, oldTaintId, newTaintId) {
        // 更新 outerSenders
        for (const o of ctx.outerSenders) {
            if (o.taintId === oldTaintId) {
                o.taintId = newTaintId;
            }
        }
        // 更新 outerReceivers
        for (const r of ctx.outerReceivers) {
            if (r.taintId === oldTaintId) {
                r.taintId = newTaintId;
            }
        }
    }
    /**
     * 获取有效的发送者污点ID
     */
    getValidSenderTaintIds(ctx, sender) {
        const taintSet = ctx.defToTaintIds.get(sender.taintDef.uniqueId);
        if (!taintSet || taintSet.size === 0)
            return [];
        const validTaintIds = [];
        for (const taintId of taintSet) {
            const source = ctx.sources.find((s) => s.taintId === taintId);
            // 确保是真实源，不是伪污点
            if (source && !source.isPseudo) {
                validTaintIds.push(taintId);
            }
        }
        return validTaintIds;
    }
    /**
     * 处理发送者-接收者对
     */
    processSenderReceiverPair(sender, senderCtx, senderTaintIds, receiver, receiverCtx, bridge, resolved, contextsWithUpdates) {
        for (const senderTaintId of senderTaintIds) {
            const key = this.generateResolvedKey(receiver, sender, senderTaintId);
            if (resolved.has(key))
                continue;
            resolved.add(key);
            // 创建合成源
            const syntheticId = this.createSyntheticSource(sender, senderCtx, senderTaintId, receiver, receiverCtx);
            // 克隆发送者路径
            this.cloneSenderPaths(senderCtx, senderTaintId, receiverCtx, syntheticId);
            // 添加跨页边
            this.addCrossPageEdge(sender, senderCtx, receiver, receiverCtx, syntheticId, bridge.channel);
            // 克隆接收者伪污点路径
            this.cloneReceiverPseudoPaths(receiver, receiverCtx, syntheticId);
            // 🔥 把 pseudo taintId 替换成 syntheticId
            if (receiver.taintId) {
                this._replaceOuterTaintId(receiverCtx, receiver.taintId, syntheticId);
            }
            // 克隆接收者的sink
            this.cloneReceiverSinks(receiver, receiverCtx, syntheticId);
            // 标记需要同步的上下文
            contextsWithUpdates.add(receiverCtx);
        }
    }
    /**
     * 生成解决键
     */
    generateResolvedKey(receiver, sender, senderTaintId) {
        return `${receiver.contextFilename}:${receiver.taintId}:${sender.contextFilename}:${senderTaintId}`;
    }
    /**
     * 创建合成源
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
        // 映射到接收者目标定义
        if (receiver.targetDef) {
            this._addTaintIdToDef(receiverCtx, receiver.targetDef.uniqueId, syntheticId);
            receiver.targetDef.markTaintedFlag();
        }
        return syntheticId;
    }
    /**
     * 克隆发送者路径
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
                propagateKind: pathRec.propagateKind,
                remark: pathRec.remark,
            };
            const freshKey = this._edgeKey(newRec.fromDef.uniqueId, newRec.toDef.uniqueId, newRec.astNode);
            if (!rDag.has(freshKey)) {
                rDag.set(freshKey, newRec);
            }
        }
    }
    /**
     * 添加跨页边
     */
    addCrossPageEdge(sender, senderCtx, receiver, receiverCtx, syntheticId, channel) {
        var _a;
        const toDef = (_a = receiver.targetDef) !== null && _a !== void 0 ? _a : sender.taintDef;
        this._addPathEdge(receiverCtx, syntheticId, sender.taintDef, toDef, receiver.astNode, "GLOBAL", `${channel}[${senderCtx.filename}->${receiverCtx.filename}]`);
    }
    /**
     * 克隆接收者伪污点路径
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
                    propagateKind: rec.propagateKind,
                    remark: rec.remark,
                });
            }
        }
    }
    /**
     * 克隆接收者的sink
     */
    cloneReceiverSinks(receiver, receiverCtx, syntheticId) {
        if (!receiver.taintId)
            return;
        // 收集需要克隆的sink
        const sinksToClone = receiverCtx.sinks.filter((s) => s.taintId === receiver.taintId);
        // 批量添加
        for (const sink of sinksToClone) {
            receiverCtx.sinks.push(Object.assign(Object.assign({}, sink), { taintId: syntheticId }));
        }
    }
    /**
     * 处理出站桥接（只有发送者）
     */
    processOutboundBridge(bridge, contextsWithUpdates) {
        for (const sender of bridge.senders) {
            if (!sender.outer)
                continue;
            const senderCtx = this.getContext(sender.contextFilename);
            if (!senderCtx)
                continue;
            const taintSet = senderCtx.defToTaintIds.get(sender.taintDef.uniqueId);
            if (!taintSet || taintSet.size === 0)
                continue;
            for (const tId of taintSet) {
                senderCtx.outerSenders.push({
                    taintId: tId,
                    outer: sender.outer,
                    channel: bridge.channel,
                    astNode: sender.astNode,
                    originDefId: sender.taintDef.uniqueId,
                });
                contextsWithUpdates.add(senderCtx);
            }
        }
    }
    /**
     * 处理入站桥接（只有接收者）
     */
    processInboundBridge(bridge, contextsWithUpdates) {
        var _a;
        for (const receiver of bridge.receivers) {
            if (!receiver.outer)
                continue;
            const receiverCtx = this.getContext(receiver.contextFilename);
            if (!receiverCtx)
                continue;
            if (receiver.taintId) {
                // avoid duplicates: same taintId + channel + outer
                const exists = receiverCtx.outerSenders.some((o) => o.taintId === receiver.taintId &&
                    o.channel === bridge.channel &&
                    o.outer === bridge.outer);
                if (!exists) {
                    // mark as autoPushed so we can clean up later if unused
                    receiverCtx.outerSenders.push({
                        taintId: receiver.taintId,
                        outer: bridge.outer,
                        channel: bridge.channel,
                        astNode: receiver.astNode,
                        originDefId: (_a = receiver.targetDef) === null || _a === void 0 ? void 0 : _a.uniqueId,
                        autoPushed: true,
                    });
                    contextsWithUpdates.add(receiverCtx);
                }
            }
        }
    }
    /**
     * 同步所有上下文
     */
    syncAllContexts(contextsWithUpdates) {
        for (const ctx of this._contexts.values()) {
            // 如果需要同步路径，或者当前上下文在更新列表中
            if (contextsWithUpdates.has(ctx)) {
                ctx.syncPathsFromDag();
            }
            // 更新外部 sink（依赖于已经同步好的 paths）
            this.updateOuterReceivers(ctx);
            // 清理那些由 inbound 自动添加但最终没有任何 sink 关联的 outerSenders
            this._cleanupOrphanOuterSenders(ctx);
        }
    }
    /**
     * 清理 orphan outerSenders：移除 autoPushed 的 sender
     */
    _cleanupOrphanOuterSenders(ctx) {
        var _a;
        if (!((_a = ctx.outerSenders) === null || _a === void 0 ? void 0 : _a.length))
            return;
        ctx.outerSenders = ctx.outerSenders.filter((o) => !o.autoPushed);
    }
    /**
     * 更新外部sink
     */
    updateOuterReceivers(ctx) {
        var _a;
        for (const sink of ctx.sinks) {
            // match by taintId
            const outerSenderIndex = ctx.outerSenders.findIndex((o) => o.taintId === sink.taintId);
            if (outerSenderIndex !== -1) {
                const outerSender = ctx.outerSenders[outerSenderIndex];
                // avoid duplicate outerReceiver entries
                const already = ctx.outerReceivers.some((r) => r.taintId === sink.taintId &&
                    r.astNode === sink.astNode &&
                    r.channel === outerSender.channel &&
                    r.outer === outerSender.outer);
                if (!already && outerSender.autoPushed) {
                    ctx.outerReceivers.push(Object.assign(Object.assign({}, sink), { outer: (_a = outerSender.outer) !== null && _a !== void 0 ? _a : "[pseudo-or-external]", channel: outerSender.channel }));
                    // 删除匹配的 outerSender（只删除这一次的匹配）
                    ctx.outerSenders.splice(outerSenderIndex, 1);
                }
            }
        }
    }
    getContext(filename) {
        var _a;
        return (_a = this._contexts.get(filename)) !== null && _a !== void 0 ? _a : null;
    }
    /* =======================
     * Report
     * ======================= */
    generateReportForFile(filename, opts) {
        const ctx = this._contexts.get(filename);
        if (!ctx)
            return null;
        this.resolvePseudoTaints();
        const mergedOpts = Object.assign(Object.assign({}, this._reportOptions), (opts || {}));
        return this._generateReportFromContext(ctx, mergedOpts);
    }
    generateGlobalReport(opts) {
        this.resolvePseudoTaints();
        const mergedOpts = Object.assign(Object.assign({}, this._reportOptions), (opts || {}));
        // returns array of per-file reports
        return [...this._contexts.values()].map((ctx) => this._generateReportFromContext(ctx, mergedOpts));
    }
    // 修改 _getCodeContext 方法，改为直接获取代码片段
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
            // 确保位置有效
            if (nodeStart < 0 || nodeEnd > code.length || nodeStart >= nodeEnd) {
                return null;
            }
            // 计算扩展后的范围
            const snippetStart = Math.max(0, nodeStart - contextChars);
            const snippetEnd = Math.min(code.length, nodeEnd + contextChars);
            // 获取代码片段
            const snippet = code.substring(snippetStart, snippetEnd);
            // 计算节点在片段中的相对偏移
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
     * internal helper: cached formatLocation to avoid repeated work
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
    // 在 _generateReportFromContext 方法中修改
    _generateReportFromContext(ctx, opts) {
        var _a;
        const issues = [];
        // Ensure paths array is synced (do once)
        ctx.syncPathsFromDag();
        // create cached formatter for this context
        const fmt = this._makeLocFormatter();
        for (const src of ctx.sources) {
            // Skip PSEUDO_MESSAGE types entirely in final report
            // if (src.sourceType === "PSEUDO_MESSAGE") continue;
            if (src.isPseudo)
                continue;
            // const isPseudo = src.sourceType === "PSEUDO_MESSAGE";
            const paths = ctx.paths.filter((p) => p.taintId === src.taintId);
            const sinks = ctx.sinks.filter((s) => s.taintId === src.taintId);
            const sanitizers = ctx.sanitizers.filter((s) => s.taintId === src.taintId);
            if (paths.length === 0 && sinks.length === 0)
                continue;
            const sourceNode = (_a = paths[0]) === null || _a === void 0 ? void 0 : _a.astNode;
            // 为 source 获取代码片段
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
                    kind: p.propagateKind,
                    loc: fmt(p.astNode),
                    remark: p.remark || undefined,
                };
                // 为每个 flow 步骤添加代码片段
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
            // 构建 source 信息
            const sourceInfo = {
                kind: src.sourceType,
                remark: src.remark,
                loc: sourceNode ? fmt(sourceNode) : "[unknown]",
                file: ctx.filename,
            };
            // 为 source 添加代码片段
            if (opts.includeCode && sourceCodeSnippet) {
                sourceInfo.code = sourceCodeSnippet;
            }
            // 构建 sinks 信息
            const sinksWithCode = sinks.map((s) => {
                const sinkInfo = {
                    kind: s.sinkKind,
                    remark: s.remark,
                    loc: fmt(s.astNode),
                    file: ctx.filename,
                };
                // 为 sink 添加代码片段
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
            issues,
            outerSenders: ctx.outerSenders.map((o) => ({
                taintId: o.taintId,
                outer: o.outer,
                channel: o.channel,
                loc: fmt(o.astNode),
                originDefId: o.originDefId,
                file: ctx.filename,
            })),
            outerReceivers: ctx.outerReceivers.map((s) => {
                var _a;
                return ({
                    taintId: s.taintId,
                    sinkKind: s.sinkKind,
                    loc: fmt(s.astNode),
                    outer: (_a = s.outer) !== null && _a !== void 0 ? _a : "[pseudo-or-external]",
                    channel: s.channel,
                    file: ctx.filename,
                });
            }),
            summary: {
                totalIssues: issues.length,
                outerSender: ctx.outerSenders.length,
                outerReceivers: ctx.outerReceivers.length,
            },
        };
    }
    // 添加格式化代码片段的方法
    _formatCodeSnippet(code, startOffset, endOffset, options = {}) {
        const { maxLength = 200, ellipsis = true } = options;
        // 如果需要高亮显示节点部分
        if (startOffset >= 0 &&
            endOffset > startOffset &&
            endOffset <= code.length) {
            const before = code.substring(0, startOffset);
            const nodeCode = code.substring(startOffset, endOffset);
            const after = code.substring(endOffset);
            // 如果代码太长，只显示部分
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
        // 如果没有高亮位置，直接返回代码
        if (code.length > maxLength && ellipsis) {
            return code.substring(0, maxLength) + "...";
        }
        return code;
    }
    // 修改 _collectFlowsLite 方法
    _collectFlowsLite() {
        var _a, _b, _c;
        const flowSet = new Set();
        const flowObjs = [];
        for (const ctx of this._contexts.values()) {
            // ensure synced
            ctx.syncPathsFromDag();
            // per context formatter to speed up
            const fmt = this._makeLocFormatter();
            for (const sink of ctx.sinks) {
                const taintId = sink.taintId;
                const source = ctx.sources.find((s) => s.taintId === taintId);
                if (!source || source.isPseudo)
                    continue;
                const sourceNode = (_b = (_a = ctx.paths.find((p) => p.taintId === taintId)) === null || _a === void 0 ? void 0 : _a.astNode) !== null && _b !== void 0 ? _b : sink.astNode;
                const sourceLoc = sourceNode ? fmt(sourceNode) : "[unknown]";
                const sinkLoc = fmt(sink.astNode);
                const key = `${source.sourceType}|${ctx.filename}|${sourceLoc}|${sink.sinkKind}|${sinkLoc}|${(_c = sink.remark) !== null && _c !== void 0 ? _c : ""}`;
                if (!flowSet.has(key)) {
                    flowSet.add(key);
                    const global = ctx.paths.find((p) => p.taintId === taintId && p.propagateKind === "GLOBAL");
                    const sourceCtx = !!global && source.originDefId
                        ? this._findContextByDefId(source.originDefId, ctx)
                        : ctx;
                    const flowObj = {
                        sourceType: source.sourceType,
                        sourceRemark: source.remark,
                        // sourceFile: ctx.filename,
                        sourceFile: sourceCtx === null || sourceCtx === void 0 ? void 0 : sourceCtx.filename,
                        sourceLoc,
                        sinkKind: sink.sinkKind,
                        sinkRemark: sink.remark,
                        sinkFile: ctx.filename,
                        sinkLoc,
                        ctx: ctx.filename,
                        hasGlobal: !!global,
                        channel: global === null || global === void 0 ? void 0 : global.remark,
                    };
                    // 为 source 添加代码片段
                    if (this._reportOptions.includeCode && sourceNode) {
                        const snippet = this._getCodeSnippet(ctx, sourceNode, this._reportOptions.codeContextChars);
                        if (snippet) {
                            flowObj.sourceCode = this._formatCodeSnippet(snippet.snippet, snippet.startOffset, snippet.endOffset);
                        }
                    }
                    // 为 sink 添加代码片段
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
        var _a, _b, _c;
        const mergedOpts = Object.assign(Object.assign({}, this._reportOptions), (opts || {}));
        this.resolvePseudoTaints();
        // Use Maps for deduplication (key = semantically unique key)
        const sourcesMap = new Map();
        const sinksMap = new Map();
        const outerSendersMap = new Map();
        const outerReceiversMap = new Map();
        for (const ctx of this._contexts.values()) {
            ctx.syncPathsFromDag();
            const fmt = this._makeLocFormatter();
            /* Sources */
            for (const s of ctx.sources) {
                if (s.isPseudo)
                    continue;
                const hasFlow = ctx.paths.some((p) => p.taintId === s.taintId) ||
                    ctx.sinks.some((sk) => sk.taintId === s.taintId) ||
                    ctx.outerSenders.some((o) => o.taintId === s.taintId);
                if (!hasFlow)
                    continue;
                const pathNode = (_a = ctx.paths.find((p) => p.taintId === s.taintId)) === null || _a === void 0 ? void 0 : _a.astNode;
                const loc = pathNode ? fmt(pathNode) : "[unknown]";
                const key = `${s.sourceType}|${ctx.filename}|${loc}|${s.remark}`;
                if (sourcesMap.has(key))
                    continue;
                sourcesMap.set(key, {
                    sourceType: s.sourceType,
                    remark: s.remark,
                    file: ctx.filename,
                    loc,
                });
            }
            /* Normal sinks */
            for (const sk of ctx.sinks) {
                // const sourceType = ctx.sources.find(
                //   (s) => s.taintId === sk.taintId,
                // )?.sourceType;
                const source = ctx.sources.find((s) => s.taintId === sk.taintId);
                if (!source || source.isPseudo)
                    continue;
                const loc = (0, location_1.formatLocation)(sk.astNode);
                const key = `${sk.sinkKind}|${ctx.filename}|${loc}|${sk.remark}`;
                if (sinksMap.has(key))
                    continue;
                sinksMap.set(key, {
                    sinkKind: sk.sinkKind,
                    file: ctx.filename,
                    remark: sk.remark,
                    loc,
                });
            }
            /* Outer sources */
            for (const os of ctx.outerSenders) {
                const loc = fmt(os.astNode);
                const outer = (_b = os.outer) !== null && _b !== void 0 ? _b : "[unknown-outer]";
                const key = `${os.channel}|${outer}|${ctx.filename}|${loc}`;
                if (outerSendersMap.has(key))
                    continue;
                const src = ctx.sources.find((s) => s.taintId === os.taintId);
                if (src === null || src === void 0 ? void 0 : src.isPseudo)
                    continue;
                outerSendersMap.set(key, {
                    sourceType: src === null || src === void 0 ? void 0 : src.sourceType,
                    channel: os.channel,
                    outer,
                    file: ctx.filename,
                    loc,
                });
            }
            /* Outer sinks */
            for (const osk of ctx.outerReceivers) {
                const loc = fmt(osk.astNode);
                const outer = (_c = osk.outer) !== null && _c !== void 0 ? _c : "[pseudo-or-external]";
                const key = `${osk.sinkKind}|${outer}|${ctx.filename}|${loc}`;
                if (outerReceiversMap.has(key))
                    continue;
                outerReceiversMap.set(key, {
                    sinkKind: osk.sinkKind,
                    outer,
                    file: ctx.filename,
                    loc,
                    channel: osk.channel,
                });
            }
        }
        const sources = [...sourcesMap.values()];
        const sinks = [...sinksMap.values()];
        const outerSenders = [...outerSendersMap.values()];
        const outerReceivers = [...outerReceiversMap.values()];
        const flows = this._collectFlowsLite();
        return {
            hasTaint: sources.length > 0,
            hasSink: sinks.length > 0,
            totalSources: sources.length,
            totalSinks: sinks.length,
            sources,
            sinks,
            flows,
            outerSenders,
            outerReceivers,
        };
    }
    /* =======================
     * Utils
     * ======================= */
    _addTaintIdToDef(ctx, defId, taintId) {
        if (!ctx.defToTaintIds.has(defId)) {
            ctx.defToTaintIds.set(defId, new Set());
        }
        ctx.defToTaintIds.get(defId).add(taintId);
        ctx.knownTaintIds.add(taintId);
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
        uuid_1.taintGenerator.reset();
    }
}
exports.TaintManager = TaintManager;
