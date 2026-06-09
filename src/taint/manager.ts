import { Node } from "acorn";
import Def, { ObjectDef } from "../def-use/types/def";
import logger from "../utils/logger";
import { formatLocation } from "../utils/location";
import { taintGenerator } from "../utils/uuid";
import {
  SourceType,
  PropagateType,
  SinkType,
  UrlTaintControl,
  TaintSinkRecord,
  TaintPathRecord,
  PseudoTaintReceiver,
  PseudoTaintSender,
  StorageSet,
  StorageGet,
} from "./types";
import { TaintContext, InterContextBridge } from "./context";
import config, { DEFAULT_REPORT_OPTIONS, ReportOptions } from "../config";
import { Errors } from "../utils/errorCode";
import { ExtensionScript } from "../extension/extensionScript";
import {
  getFlowMatches,
  shouldFilterSourceByFrame,
  shouldIncludeScriptInPolicy,
} from "./policy";
import { analyzeFlowConstraintSeverity } from "./constraintSeverity";
import { fileTimerManager } from "../utils/fileTimer";
import { scriptUsageTracker } from "../extension/scriptUsageTracker";

/* ============================================================
 * Helpers
 * ============================================================ */

/**
 * Build stable source key for deduplicating taint ids.
 */
function buildSourceKey(
  sourceType: SourceType,
  node: Node | null,
  remark?: string,
): string {
  const r = (node as any)?.range;
  const base = r ? `${sourceType}@${r[0]}:${r[1]}` : `${sourceType}@unknown`;

  // Keep distinct sources created at the same AST node but with different
  // semantic meaning (e.g. chrome.storage.get for different keys).
  return remark ? `${base}#${remark}` : base;
}

/** ----------------------------------------
 * TaintManager
 * ---------------------------------------- */
export class TaintManager {
  private _contexts: Map<string, TaintContext> = new Map();
  private _currentContext: TaintContext | null = null;
  private _bridges: Map<string, InterContextBridge> = new Map();
  private _resolvedBridgePairs: Set<string> = new Set();

  private _storageSets: StorageSet[] = [];
  private _storageGets: StorageGet[] = [];

  // report options (can be changed at runtime)
  private _reportOptions: Required<ReportOptions> = {
    ...DEFAULT_REPORT_OPTIONS,
    ...(config.taintReportOptions ?? {}),
  };

  /* ============================================================
   * Context Management
   * ============================================================ */

  enterFile(script: ExtensionScript) {
    let ctx = this._contexts.get(script.key);
    if (!ctx) {
      ctx = new TaintContext(script);
      this._contexts.set(script.key, ctx);
    }
    this._currentContext = ctx;
  }

  exitFile() {
    this._currentContext = null;
  }

  get current(): TaintContext {
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
  recordStorageSet(area: string, key: string, valueDef: Def, astNode: Node) {
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
  recordStorageGet(
    area: string,
    key: string,
    targetDef: Def,
    astNode: Node,
  ): number {
    const ctx = this.current;

    const taintId = this.createTaintSource(
      targetDef,
      "PSEUDO_STORAGE",
      astNode,
      true,
      `storage.${area}.get('${key}')`,
    );

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

  createTaintSource(
    def: Def,
    sourceType: SourceType,
    astNode: Node | null,
    isPseudo: boolean = false,
    remark?: string,
  ): number {
    const ctx = this.current;

    const taintId = this._getOrCreateSourceTaintId(
      ctx,
      sourceType,
      astNode,
      remark,
    );

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

  private _getOrCreateSourceTaintId(
    ctx: TaintContext,
    sourceType: SourceType,
    astNode: Node | null,
    remark?: string,
  ): number {
    const key = buildSourceKey(sourceType, astNode, remark);

    const existed = ctx.sourceKeyToTaintId.get(key);
    if (existed) return existed;

    const id = taintGenerator.nextId();
    ctx.sourceKeyToTaintId.set(key, id);
    ctx.knownTaintIds.add(id);

    return id;
  }

  /* =======================
   * Propagation (creates edges in DAG)
   * ======================= */
  propagateTaint(
    from: Def | null,
    to: Def | null,
    astNode: Node,
    kind: PropagateType = "OTHER",
    remark: string = "",
  ) {
    if (!from || !to || !from.isTainted) return;
    if (from.uniqueId === to.uniqueId) return;

    const ctx = this.current;
    const fromSet = ctx.defToTaintIds.get(from.uniqueId);
    if (!fromSet) return;

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
  checkSink(
    sourceDef: Def | null,
    sinkType: SinkType,
    astNode: Node,
    remark?: string,
    urlTaintControl?: UrlTaintControl,
  ) {
    if (!sourceDef || !sourceDef.isTainted) return;

    const ctx = this.current;
    const taintIds = this.getDefTaintIds(sourceDef);
    if (taintIds.length === 0) return;

    for (const taintId of taintIds) {
      const rec: TaintSinkRecord = {
        taintId,
        sinkType,
        sourceDef: sourceDef,
        astNode,
        remark,
        urlTaintControl,
      };

      ctx.sinks.push(rec);

      logger.debug(
        `[TAINT-SINK][${ctx.filename}] found [${sinkType}] in [${formatLocation(astNode)}] with remark [${remark ?? ""}] and url-control [${urlTaintControl ?? "N/A"}]`,
      );
    }
  }

  /* ============================================================
   * Sanitizer
   * ============================================================ */

  /**
   * Remove taint from a def for specific taint ids.
   */
  applySanitizer(def: Def | null, sanitizerName: string, astNode: Node) {
    if (!def) return;

    const ids = this.getDefTaintIds(def);
    if (ids.length === 0) return;

    const ctx = this.current;

    for (const taintId of ids) {
      this.sanitizeDefForTaint(ctx, def, taintId);
      ctx.sanitizers.push({
        taintId,
        sanitizerName,
        def,
        astNode,
      });
      logger.warn(
        `[TAINT-SANITIZER][${ctx.filename}] clear taint [${taintId}] state by sanitizer ${sanitizerName} in [${formatLocation(astNode)}]`,
      );
    }
  }

  sanitizeDefForTaint(ctx: TaintContext, def: Def, taintId: number) {
    const set = ctx.defToTaintIds.get(def.uniqueId);
    if (!set) return;

    set.delete(taintId);

    if (set.size === 0) {
      ctx.defToTaintIds.delete(def.uniqueId);
      def.clearTaintFlag();
    }
  }

  /* ============================================================
   * DAG Helpers
   * ============================================================ */

  private _edgeKey(fromId: number, toId: number, astNode: Node) {
    const r1 = (astNode as any)?.range;
    const rPart = r1 ? `${r1[0]}:${r1[1]}` : "unknown";
    return `${fromId}->${toId}@${rPart}`;
  }

  /**
   * Insert propagation edge into taint DAG.
   */
  private _addPathEdge(
    ctx: TaintContext,
    taintId: number,
    from: Def,
    to: Def,
    astNode: Node,
    PropagateType: PropagateType = "OTHER",
    remark: string = "",
  ) {
    if (!ctx.pathDag.has(taintId)) ctx.pathDag.set(taintId, new Map());
    const dag = ctx.pathDag.get(taintId)!;
    const key = this._edgeKey(from.uniqueId, to.uniqueId, astNode);
    if (dag.has(key)) return; // already exists

    const rec: TaintPathRecord = {
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

  getDefTaintIds(def: Def): number[] {
    const s = this.current.defToTaintIds.get(def.uniqueId);
    return s ? [...s] : [];
  }

  /* ============================================================
   * Pseudo-Taint Resolution
   * ============================================================ */

  addPseudoTaintReceiver(receiver: PseudoTaintReceiver) {
    const key = this._bridgeKey(receiver.channel, receiver.outer);
    let bridge = this._bridges.get(key);
    if (!bridge) {
      bridge = new InterContextBridge(receiver.channel, receiver.outer);
      this._bridges.set(key, bridge);
    }
    bridge.addReceiver(receiver);
    this.tryResolveBridgeByKey(key);
  }

  addPseudoTaintSender(sender: PseudoTaintSender) {
    if (!sender.taintDef.isTainted) return;

    const key = this._bridgeKey(sender.channel, sender.outer);
    let bridge = this._bridges.get(key);
    if (!bridge) {
      bridge = new InterContextBridge(sender.channel, sender.outer);
      this._bridges.set(key, bridge);
    }
    bridge.addSender(sender);
    this.tryResolveBridgeByKey(key);
  }

  private _bridgeKey(channel: string, outer?: string) {
    return `${channel}::${outer ?? "<no-outer>"}`;
  }

  private tryResolveBridgeByKey(key: string) {
    const bridge = this._bridges.get(key);
    if (!bridge) return;

    const contextsWithUpdates = new Set<TaintContext>();
    this.processBridge(bridge, this._resolvedBridgePairs, contextsWithUpdates);
    this.syncAllContexts(contextsWithUpdates);
  }

  /**
   * Analyze the relationship between Storage Set and Get
   */
  private resolveStorageTaints() {
    if (this._storageGets.length === 0 || this._storageSets.length === 0)
      return;

    const contextsWithUpdates = new Set<TaintContext>();

    for (const getReq of this._storageGets) {
      const receiverCtx = this.getContext(getReq.contextFilename);
      if (!receiverCtx) continue;

      // Find all Set operations that match this key.
      const matchingSets = this._storageSets.filter(
        (s) => s.key === getReq.key && s.area === getReq.area,
      );

      for (const setReq of matchingSets) {
        const senderCtx = this.getContext(setReq.contextFilename);
        if (!senderCtx) continue;

        // Retrieves all true taints contained in the Set (excluding false taints to avoid infinite recursion).
        const s = senderCtx.defToTaintIds.get(setReq.valueDef.uniqueId);
        const senderTaintIds = (s ? [...s] : []).filter((id) => {
          const src = senderCtx.sources.find((s) => s.taintId === id);
          return src && !src.isPseudo;
        });

        for (const sTaintId of senderTaintIds) {
          // Create a composition source to introduce the Sender's taint into the Receiver environment.
          const syntheticId = this.createSyntheticSourceFromStorage(
            setReq,
            senderCtx,
            sTaintId,
            getReq,
            receiverCtx,
          );

          // Cloning path: Sender's path -> Receiver
          this.cloneSenderPaths(senderCtx, sTaintId, receiverCtx, syntheticId);

          // Add logical edges across storage
          this._addPathEdge(
            receiverCtx,
            syntheticId,
            setReq.valueDef,
            getReq.targetDef,
            getReq.astNode,
            "STORAGE",
            `STORAGE_FLOW[area: ${getReq.area}, key: ${getReq.key}, sender: ${senderCtx.filename}, receiver: ${receiverCtx.filename}]`,
          );

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
  private createSyntheticSourceFromStorage(
    setReq: StorageSet,
    senderCtx: TaintContext,
    senderTaintId: number,
    getReq: StorageGet,
    receiverCtx: TaintContext,
  ): number {
    const senderSource = senderCtx.sources.find(
      (s) => s.taintId === senderTaintId,
    );
    const syntheticId = taintGenerator.nextId();

    receiverCtx.knownTaintIds.add(syntheticId);
    receiverCtx.sources.push({
      taintId: syntheticId,
      sourceType: senderSource?.sourceType ?? ("STORAGE_DATA" as any),
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
  private mergePseudoToSynthetic(
    ctx: TaintContext,
    pseudoId: number,
    syntheticId: number,
  ) {
    const pseudoDag = ctx.pathDag.get(pseudoId);
    if (!pseudoDag) return;

    if (!ctx.pathDag.has(syntheticId)) ctx.pathDag.set(syntheticId, new Map());
    const targetDag = ctx.pathDag.get(syntheticId)!;

    for (const rec of pseudoDag.values()) {
      const key = this._edgeKey(
        rec.fromDef.uniqueId,
        rec.toDef.uniqueId,
        rec.astNode,
      );
      if (!targetDag.has(key)) {
        targetDag.set(key, { ...rec, taintId: syntheticId });
      }
    }

    // Simultaneously merge Sink
    const sinksToClone = ctx.sinks.filter((s) => s.taintId === pseudoId);
    for (const sink of sinksToClone) {
      if (
        !ctx.sinks.some(
          (s) => s.taintId === syntheticId && s.astNode === sink.astNode,
        )
      ) {
        ctx.sinks.push({ ...sink, taintId: syntheticId });
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
  private processBridge(
    bridge: InterContextBridge,
    resolved: Set<string>,
    contextsWithUpdates: Set<TaintContext>,
  ) {
    const { senders, receivers } = bridge;

    // Handling bridges that exist on both the sender and receiver
    if (senders.length > 0 && receivers.length > 0) {
      this.processBridgeWithBothSides(bridge, resolved, contextsWithUpdates);
    }
  }

  /**
   * Handling bidirectional bridging
   */
  private processBridgeWithBothSides(
    bridge: InterContextBridge,
    resolved: Set<string>,
    contextsWithUpdates: Set<TaintContext>,
  ) {
    for (const sender of bridge.senders) {
      const senderCtx = this.getContext(sender.contextFilename);
      if (!senderCtx) continue;

      const senderTaintIds = this.getValidSenderTaintIds(senderCtx, sender);
      if (!senderTaintIds.length) continue;

      for (const receiver of bridge.receivers) {
        // If the sender and receiver are in the same file and not in an outer scope, skip.
        if (
          receiver.contextFilename === sender.contextFilename &&
          !receiver.outer
        ) {
          // TODO: Later there should be consider manifest.json file!
          continue;
        }

        const receiverCtx = this.getContext(receiver.contextFilename);
        if (!receiverCtx) continue;

        this.processSenderReceiverPair(
          sender,
          senderCtx,
          senderTaintIds,
          receiver,
          receiverCtx,
          bridge,
          resolved,
          contextsWithUpdates,
        );
      }
    }
  }

  /**
   * Obtain a valid sender taint ID
   */
  private getValidSenderTaintIds(
    ctx: TaintContext,
    sender: PseudoTaintSender,
  ): number[] {
    const taintSet = ctx.defToTaintIds.get(sender.taintDef.uniqueId);
    if (!taintSet || taintSet.size === 0) return [];

    const validTaintIds: number[] = [];
    for (const taintId of taintSet) {
      const source = ctx.sources.find((s) => s.taintId === taintId);
      // Ensure it's a genuine source, not a fake blemish.
      if (source && !source.isPseudo) {
        validTaintIds.push(taintId);
      }
    }
    return validTaintIds;
  }

  private withReceiverContext(receiverCtx: TaintContext, fn: () => void) {
    const prevCtx = this._currentContext;
    this._currentContext = receiverCtx;

    // resolvePseudoTaints 阶段通常没有活动 timer，这里给 receiver 建一个
    let ownTimer = false;
    if (!fileTimerManager.getCurrentTimer()) {
      fileTimerManager.setCurrentTimer(
        receiverCtx.script.absPath,
        receiverCtx.script.getFileSize(),
      );
      ownTimer = true;
    }

    try {
      fn();
    } finally {
      this._currentContext = prevCtx;
      if (ownTimer) fileTimerManager.clearCurrentTimer();
    }
  }

  private materializeSenderMessageTaintInReceiver(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    senderTaintId: number,
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    channel: string,
  ) {
    const senderSource = senderCtx.sources.find(
      (s) => s.taintId === senderTaintId,
    );
    if (!senderSource || senderSource.isPseudo) return;

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
    const relatedDefs = new Map<number, Def>();
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
    this._addPathEdge(
      receiverCtx,
      senderTaintId,
      sender.taintDef,
      sender.taintDef,
      receiver.astNode,
      "MESSAGE",
      `${channel}[${senderCtx.filename}->${receiverCtx.filename}]`,
    );
  }

  /**
   * Processing sender-receiver pairs
   */
  private processSenderReceiverPair(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    senderTaintIds: number[],
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    bridge: InterContextBridge,
    resolved: Set<string>,
    contextsWithUpdates: Set<TaintContext>,
  ) {
    for (const senderTaintId of senderTaintIds) {
      const key = this.generateResolvedKey(receiver, sender, senderTaintId);

      // if (resolved.has(key)) continue;
      resolved.add(key);

      // 新逻辑：deferred receiver，直接用 sender.message 驱动回调
      if (receiver.deferredMessage) {
        this.materializeSenderMessageTaintInReceiver(
          sender,
          senderCtx,
          senderTaintId,
          receiver,
          receiverCtx,
          bridge.channel,
        );

        this.withReceiverContext(receiverCtx, () => {
          receiver.deferredMessage!.invoke(sender.taintDef);
        });

        contextsWithUpdates.add(receiverCtx);
        continue;
      }

      // 旧逻辑：非 deferred 继续 synthetic source 路线
      // TODO: add message constraint validation here to filter out infeasible paths.
      // Create a synthesis source
      const syntheticId = this.createSyntheticSource(
        sender,
        senderCtx,
        senderTaintId,
        receiver,
        receiverCtx,
      );

      // Cloning sender path
      this.cloneSenderPaths(senderCtx, senderTaintId, receiverCtx, syntheticId);

      // Add cross-page margin
      this.addCrossPageEdge(
        sender,
        senderCtx,
        receiver,
        receiverCtx,
        syntheticId,
        bridge.channel,
      );

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
  private generateResolvedKey(
    receiver: PseudoTaintReceiver,
    sender: PseudoTaintSender,
    senderTaintId: number,
  ): string {
    const r = (receiver.astNode as any)?.range;
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
  private createSyntheticSource(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    senderTaintId: number,
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
  ): number {
    const senderSource = senderCtx.sources.find(
      (s) => s.taintId === senderTaintId,
    );
    if (!senderSource)
      throw Errors.TaintError("SyntheticSource sender source not found");

    const syntheticId = taintGenerator.nextId();
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
  private cloneSenderPaths(
    senderCtx: TaintContext,
    senderTaintId: number,
    receiverCtx: TaintContext,
    syntheticId: number,
  ) {
    const senderDag = senderCtx.pathDag.get(senderTaintId);
    if (!senderDag) return;

    if (!receiverCtx.pathDag.has(syntheticId)) {
      receiverCtx.pathDag.set(syntheticId, new Map());
    }
    const rDag = receiverCtx.pathDag.get(syntheticId)!;

    for (const [edgeKey, pathRec] of senderDag.entries()) {
      const newRec: TaintPathRecord = {
        taintId: syntheticId,
        fromDef: pathRec.fromDef,
        toDef: pathRec.toDef,
        astNode: pathRec.astNode,
        PropagateType: pathRec.PropagateType,
        remark: pathRec.remark,
      };

      const freshKey = this._edgeKey(
        newRec.fromDef.uniqueId,
        newRec.toDef.uniqueId,
        newRec.astNode,
      );
      if (!rDag.has(freshKey)) {
        rDag.set(freshKey, newRec);
      }
    }
  }

  /**
   * Add a MESSAGE edge representing cross-context propagation.
   */
  private addCrossPageEdge(
    sender: PseudoTaintSender,
    senderCtx: TaintContext,
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    syntheticId: number,
    channel: string,
  ) {
    const toDef = receiver.targetDef ?? sender.taintDef;

    this._addPathEdge(
      receiverCtx,
      syntheticId,
      sender.taintDef,
      toDef,
      receiver.astNode,
      "MESSAGE",
      `${channel}[${senderCtx.filename}->${receiverCtx.filename}]`,
    );
  }

  /**
   * Clone receiver's pseudo-taint paths to the synthetic taint.
   */
  private cloneReceiverPseudoPaths(
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    syntheticId: number,
  ) {
    if (!receiver.taintId) return;

    const rSrcDag = receiverCtx.pathDag.get(receiver.taintId);
    if (!rSrcDag) return;

    if (!receiverCtx.pathDag.has(syntheticId)) {
      receiverCtx.pathDag.set(syntheticId, new Map());
    }
    const synDag = receiverCtx.pathDag.get(syntheticId)!;

    for (const rec of rSrcDag.values()) {
      const mappedKey = this._edgeKey(
        rec.fromDef.uniqueId,
        rec.toDef.uniqueId,
        rec.astNode,
      );
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
  private cloneReceiverSinks(
    receiver: PseudoTaintReceiver,
    receiverCtx: TaintContext,
    syntheticId: number,
  ) {
    if (!receiver.taintId) return;

    const sinksToClone = receiverCtx.sinks.filter(
      (s) => s.taintId === receiver.taintId,
    );

    for (const sink of sinksToClone) {
      receiverCtx.sinks.push({
        ...sink,
        taintId: syntheticId,
      });
    }
  }

  /**
   * Sync path DAGs and update outer receivers for all contexts.
   */
  private syncAllContexts(contextsWithUpdates: Set<TaintContext>) {
    for (const ctx of this._contexts.values()) {
      if (contextsWithUpdates.has(ctx)) {
        ctx.syncPathsFromDag();
      }

      // this.updateOuterReceivers(ctx);
      // this._cleanupOrphanOuterSenders(ctx);
    }
  }

  private getContext(filename: string): TaintContext | null {
    return this._contexts.get(filename) ?? null;
  }

  /* ============================================================
   * Reprot
   * ============================================================ */

  generateReportForFile(filename: string, opts?: ReportOptions) {
    const ctx = this._contexts.get(filename);
    if (!ctx) return null;

    const fileFrame = scriptUsageTracker.getPrimaryFrameByKey(ctx.filename);

    if (!shouldIncludeScriptInPolicy(ctx.filename)) {
      return {
        filename: ctx.filename,
        fileFrame,
        issues: [],
        totalIssues: 0,
      };
    }

    // Storage pseudo taints are still resolved in report phase.
    this.resolveStorageTaints();

    const mergedOpts = { ...this._reportOptions, ...(opts || {}) };
    return this._generateReportFromContext(ctx, mergedOpts);
  }

  generateGlobalReport(opts?: ReportOptions) {
    // Storage pseudo taints are still resolved in report phase.
    this.resolveStorageTaints();

    const mergedOpts = { ...this._reportOptions, ...(opts || {}) };

    // returns array of per-file reports
    return [...this._contexts.values()]
      .filter((ctx) => shouldIncludeScriptInPolicy(ctx.filename))
      .map((ctx) => this._generateReportFromContext(ctx, mergedOpts));
  }

  /**
   * Extract a code snippet around a node with optional context.
   * Returns the snippet and the node's relative offsets.
   */
  private _getCodeSnippet(
    ctx: TaintContext,
    node: Node,
    contextChars: number = 50,
  ): {
    snippet: string;
    startOffset: number;
    endOffset: number;
  } | null {
    if (!node) return null;

    if (!ctx || !ctx.script) return null;

    try {
      const code = ctx.script.getCode?.();
      if (!code) return null;

      const range = (node as any)?.range;
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
    } catch (err) {
      logger.debug(`Failed to get code snippet: ${err}`);
      return null;
    }
  }

  /**
   * Cached location formatter to avoid repeated formatLocation calls.
   */
  private _makeLocFormatter() {
    const cache = new Map<string, string>();
    return (node: Node | null) => {
      if (!node) return "[unknown]";
      const r = (node as any)?.range;
      const key = r ? `${r[0]}:${r[1]}` : JSON.stringify(node);
      if (cache.has(key)) return cache.get(key)!;
      try {
        const formatted = formatLocation(node);
        cache.set(key, formatted);
        return formatted;
      } catch {
        cache.set(key, "[unknown]");
        return "[unknown]";
      }
    };
  }

  /**
   * Build a truncated flow list according to report options.
   * Each `paths` item is { kind, loc, remark }
   */
  private _truncateFlows(
    paths: Array<{ kind: string; loc: string; remark?: string }>,
    opts: Required<ReportOptions>,
  ) {
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
  private _generateReportFromContext(
    ctx: TaintContext,
    opts: Required<ReportOptions>,
  ) {
    const issues: any[] = [];
    const fileFrame = scriptUsageTracker.getPrimaryFrameByKey(ctx.filename);
    const fileFrameConstraint =
      scriptUsageTracker.getFrameConstraint(fileFrame);
    const fileFrames = scriptUsageTracker.getScriptFrameDescriptorsByKey(
      ctx.filename,
    );

    // Ensure paths array is synced (do once)
    ctx.syncPathsFromDag();

    // create cached formatter for this context
    const fmt = this._makeLocFormatter();

    for (const src of ctx.sources) {
      // Skip PSEUDO types entirely in final report
      if (src.isPseudo) continue;
      // if (shouldFilterSourceByFrame(src.sourceType, fileFrame)) continue;

      const paths = ctx.paths.filter((p) => p.taintId === src.taintId);
      const sinks = ctx.sinks.filter((s) => s.taintId === src.taintId);
      const sanitizers = ctx.sanitizers.filter(
        (s) => s.taintId === src.taintId,
      );

      if (paths.length === 0 && sinks.length === 0) continue;

      const sourceNode = paths[0]?.astNode;
      let sourceCodeSnippet = null;

      if (opts.includeCode && sourceNode) {
        const snippet = this._getCodeSnippet(
          ctx,
          sourceNode,
          opts.codeContextChars,
        );
        if (snippet) {
          sourceCodeSnippet = this._formatCodeSnippet(
            snippet.snippet,
            snippet.startOffset,
            snippet.endOffset,
          );
        }
      }

      // build flow records (kind + loc + remark + code)
      const fullFlow = paths.map((p) => {
        const flowItem: any = {
          kind: p.PropagateType,
          loc: fmt(p.astNode),
          remark: p.remark || undefined,
        };

        if (opts.includeCode) {
          const snippet = this._getCodeSnippet(
            ctx,
            p.astNode,
            opts.codeContextChars,
          );
          if (snippet) {
            flowItem.code = this._formatCodeSnippet(
              snippet.snippet,
              snippet.startOffset,
              snippet.endOffset,
            );
          }
        }

        return flowItem;
      });

      // truncate according to opts
      const truncated = this._truncateFlows(fullFlow, opts);

      const sourceInfo: any = {
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
        const sinkInfo: any = {
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
          const snippet = this._getCodeSnippet(
            ctx,
            s.astNode,
            opts.codeContextChars,
          );
          if (snippet) {
            sinkInfo.code = this._formatCodeSnippet(
              snippet.snippet,
              snippet.startOffset,
              snippet.endOffset,
            );
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
  private _formatCodeSnippet(
    code: string,
    startOffset: number,
    endOffset: number,
    options: { maxLength?: number; ellipsis?: boolean } = {},
  ): string {
    const { maxLength = 200, ellipsis = true } = options;

    if (
      startOffset >= 0 &&
      endOffset > startOffset &&
      endOffset <= code.length
    ) {
      const before = code.substring(0, startOffset);
      const nodeCode = code.substring(startOffset, endOffset);
      const after = code.substring(endOffset);

      // If the code is too long, only a portion will be displayed.
      if (code.length > maxLength) {
        const halfMax = Math.floor(maxLength / 2);
        const beforeTruncated =
          before.length > halfMax
            ? (ellipsis ? "..." : "") +
              before.substring(before.length - halfMax)
            : before;
        const afterTruncated =
          after.length > halfMax
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
  private _collectFlowsLite(): Array<any> {
    const flowSet = new Set<string>();
    const flowObjs: any[] = [];

    // Build a global defId → context index ONCE per report run. The old
    // `_findContextByDefId` walked every context for every sink, which is
    // O(N·M) and was the hottest cross-context lookup. The index reduces
    // it to O(1) per query at the cost of a single linear pass here.
    const defOwnerIndex = this._buildDefOwnerIndex();

    for (const ctx of this._contexts.values()) {
      if (!shouldIncludeScriptInPolicy(ctx.filename)) continue;

      // ensure synced
      ctx.syncPathsFromDag();

      // per context formatter to speed up
      const fmt = this._makeLocFormatter();

      // Pre-index sources by taintId so we can look them up in O(1) instead
      // of scanning the source array for every sink in this context.
      const sourceByTaint = new Map<number, (typeof ctx.sources)[number]>();
      for (const s of ctx.sources) sourceByTaint.set(s.taintId, s);

      // Pre-index the source-AST-node for each taintId. We previously paid an
      // O(paths) `find` per (sink, match) pair. Pick the *first* path entry
      // for each taintId by simple iteration.
      const sourceAstByTaint = new Map<number, Node>();
      for (const p of ctx.paths) {
        if (!sourceAstByTaint.has(p.taintId)) {
          sourceAstByTaint.set(p.taintId, p.astNode);
        }
      }

      // Pre-index message/storage edges per taintId so the per-sink loop
      // doesn't have to scan ctx.paths twice for every emission.
      const messageByTaint = new Map<number, (typeof ctx.paths)[number]>();
      const storageByTaint = new Map<number, (typeof ctx.paths)[number]>();
      for (const p of ctx.paths) {
        if (p.PropagateType === "MESSAGE" && !messageByTaint.has(p.taintId)) {
          messageByTaint.set(p.taintId, p);
        }
        if (p.PropagateType === "STORAGE" && !storageByTaint.has(p.taintId)) {
          storageByTaint.set(p.taintId, p);
        }
      }

      for (const sink of ctx.sinks) {
        const taintId = sink.taintId;

        const source = sourceByTaint.get(taintId);
        if (!source || source.isPseudo) continue;

        // The rule engine may return multiple FlowTypes for the same
        // (source, sink) pair — e.g. cookies → fetch.body matching both a
        // SENSITIVE_DATA → MESSAGE_RESPONSE rule and a NETWORK_SEND rule.
        // We emit one summary record per matched FlowType so analysts can
        // triage them as distinct findings.
        const matches = getFlowMatches(source.sourceType, sink.sinkType);
        if (matches.length === 0) continue;

        const sourceNode = sourceAstByTaint.get(taintId) ?? sink.astNode;

        const sourceLoc = sourceNode ? fmt(sourceNode) : "[unknown]";
        const sinkLoc = fmt(sink.astNode);

        for (const match of matches) {
          const flowType = match.flowType;
          // Dedup key now includes flowType so the same source/sink pair can
          // surface under multiple categories without being collapsed.
          const key = `${flowType}|${source.sourceType}|${ctx.filename}|${sourceLoc}|${sink.sinkType}|${sinkLoc}|${sink.remark ?? ""}|${sink.urlTaintControl ?? ""}`;

          if (flowSet.has(key)) continue;
          flowSet.add(key);

          const message = messageByTaint.get(taintId);
          const storage = storageByTaint.get(taintId);

          // Only backtrack source context for cross-context flows.
          // For local in-context flows, forcing originDefId lookup may hit
          // cloned defs in other contexts and misclassify source frame.
          const hasCrossContextHop = !!message || !!storage;
          const sourceCtx =
            hasCrossContextHop && source.originDefId
              ? defOwnerIndex.get(source.originDefId) ?? ctx
              : ctx;

          const sourceFile = sourceCtx?.filename ?? ctx.filename;
          const sourceFrame =
            scriptUsageTracker.getPrimaryFrameByKey(sourceFile);
          const sourceFrameConstraint =
            scriptUsageTracker.getFrameConstraint(sourceFrame);
          const sourceFrames =
            scriptUsageTracker.getScriptFrameDescriptorsByKey(sourceFile);
          const sinkFrame = scriptUsageTracker.getPrimaryFrameByKey(
            ctx.filename,
          );
          const sinkFrameConstraint =
            scriptUsageTracker.getFrameConstraint(sinkFrame);
          const sinkFrames = scriptUsageTracker.getScriptFrameDescriptorsByKey(
            ctx.filename,
          );

          const constraintSeverity = analyzeFlowConstraintSeverity({
            sourceType: source.sourceType,
            sinkType: sink.sinkType,
            sourceFrame,
            sourceFrameConstraint,
          });

          if (
            shouldFilterSourceByFrame(
              source.sourceType,
              sourceFrame,
              sink.sinkType,
              sinkFrame,
            )
          ) {
            continue;
          }

          const flowObj: any = {
            flowType,
            ruleId: match.ruleId,
            ruleDescription: match.ruleDescription,
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
            channel: message?.remark,
            storagePassing: !!storage,
            area: storage?.remark,
            constraintKind: constraintSeverity.constraintKind,
            severity: constraintSeverity.severity,
            severityReason: constraintSeverity.severityReason,
            severityEvidence: constraintSeverity.severityEvidence,
          };

          // Optionally attach source code snippet
          if (this._reportOptions.includeCode && sourceNode) {
            const snippet = this._getCodeSnippet(
              ctx,
              sourceNode,
              this._reportOptions.codeContextChars,
            );
            if (snippet) {
              flowObj.sourceCode = this._formatCodeSnippet(
                snippet.snippet,
                snippet.startOffset,
                snippet.endOffset,
              );
            }
          }

          // Optionally attach sink code snippet
          if (this._reportOptions.includeCode) {
            const snippet = this._getCodeSnippet(
              ctx,
              sink.astNode,
              this._reportOptions.codeContextChars,
            );
            if (snippet) {
              flowObj.sinkCode = this._formatCodeSnippet(
                snippet.snippet,
                snippet.startOffset,
                snippet.endOffset,
              );
            }
          }

          flowObjs.push(flowObj);
        }
      }
    }

    return flowObjs;
  }

  /**
   * Reverse-index every (defId → TaintContext that holds it) used by the
   * report phase to backtrack a flow to its originating frame. Built once
   * per report run.
   */
  private _buildDefOwnerIndex(): Map<number, TaintContext> {
    const idx = new Map<number, TaintContext>();
    for (const ctx of this._contexts.values()) {
      for (const defId of ctx.defToTaintIds.keys()) {
        // First-writer-wins: the source context (where the original tainted
        // def was minted) is what _findContextByDefId previously preferred.
        if (!idx.has(defId)) idx.set(defId, ctx);
      }
    }
    return idx;
  }

  /**
   * Global summary (JSON format)
   */
  getGlobalSummary(opts?: ReportOptions) {
    const mergedOpts = { ...this._reportOptions, ...(opts || {}) };
    this.resolveStorageTaints();

    const flows = this._collectFlowsLite();

    /* =========================================================
     * TODO: Should not print here, need to fix in future
     * Log taint flow summary
     * ========================================================= */
    if (flows.length > 0) {
      logger.info(`Detected ${flows.length} taint flows:`);

      for (const f of flows) {
        logger.info(
          `[${f.flowType}] ${f.sourceType} -> ${f.sinkType} ` +
            `(${f.sourceFile}:${f.sourceLoc} -> ${f.sinkFile}:${f.sinkLoc})`,
        );
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
  private _addTaintIdToDef(ctx: TaintContext, def: Def, taintId: number) {
    const defId = def.uniqueId;
    if (!ctx.defToTaintIds.has(defId)) {
      ctx.defToTaintIds.set(defId, new Set());
    }
    ctx.defToTaintIds.get(defId)!.add(taintId);
    ctx.knownTaintIds.add(taintId);
    def.markTaintedFlag();
  }

  /* =======================
   * Debug
   * ======================= */
  resetAll() {
    this._contexts.clear();
    this._currentContext = null;
    this._bridges.clear();
    this._resolvedBridgePairs.clear();
    taintGenerator.reset();
  }
}
