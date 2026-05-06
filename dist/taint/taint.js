"use strict";
// import { Node } from "acorn";
// import Def from "../def-use/types/def";
// import logger from "../utils/logger";
// import { formatLocation } from "../utils/location";
// import { NetworkCallInfo } from "../utils/detectSinks";
// import { Writable } from "stream";
// import { taintGenerator } from "../utils/uuid";
// /** ----------------------------------------
//  * Types
//  * ---------------------------------------- */
// export type SourceKind =
//   | "CHROME_API_COOKIE"
//   | "CHROME_API_BOOKMARK"
//   | "CHROME_API_DOWNLOAD"
//   | "CHROME_API_GCM"
//   | "CHROME_API_HISTORY"
//   | "CHROME_API_MANAGEMENT"
//   | "CHROME_API_READINGLIST"
//   | "CHROME_API_STORAGE"
//   | "CHROME_API_TAB"
//   | "CHROME_API_PAGECAPTURE"
//   | "CHROME_API_SYSTEM"
//   | "CHROME_API_WINDOW"
//   | "DOCUMENT_LOCATION"
//   | "NAVIGAROR_GEOLOCATION"
//   | "NAVIGATOR_CLIPBOARD"
//   | "NAVIGATOR_CONNECTION"
//   | "NAVIGATOR_DEVICE_MEMORY"
//   | "NAVIGATOR_HARDWARE_CONCURRENCY"
//   | "NAVIGATOR_LANGUAGE"
//   | "NAVIGATOR_MAX_TOUCH_POINTS"
//   | "NAVIGATOR_PLATFORM"
//   | "NAVIGATOR_PLUGINS"
//   | "NAVIGATOR_USER_AGENT"
//   | "NAVIGATOR_GPU_ADAPTER"
//   | "DOCUMENT_COOKIE"
//   | "DOCUMENT_URL"
//   | "DOCUMENT_TITLE"
//   | "SCREEN_INFO"
//   | "ELEMENT_TEXT_CONTENT"
//   | "ELEMENT_INNER_HTML"
//   | "ELEMENT_OUTER_HTML"
//   | "JQUERY_ELEMENT_VAL"
//   | "JQUERY_ELEMENT_TEXT"
//   | "JQUERY_ELEMENT_HTML"
//   | "PSEUDO_TAINT";
// export type PropagateKind =
//   | "ASSIGN"
//   | "ARGUMENT"
//   | "RETURN"
//   | "ELEMENT"
//   | "OTHER"
//   | "GLOBAL"
//   | "INITIAL";
// export type SinkKind =
//   | "NEW_FUNCTION"
//   | "EVAL"
//   | "CHROME_GCM_SEND"
//   | "WEB_LOCAL_STORAGE"
//   | "WEB_SESSION_STORAGE"
//   | "CHROME_LOCAL_STORAGE"
//   | "CHROME_SYNC_STORAGE"
//   | "CHROME_SESSION_STORAGE"
//   | "FETCH_URL"
//   | "FETCH_BODY"
//   | "FETCH_HEADERS"
//   | "TIME_EVAL"
//   | "XML_HTTP_REQUEST_OPEN"
//   | "XML_HTTP_REQUEST_SEND"
//   | "WEBSOCKET_SEND"
//   | "JQUERY_ELEMENT_VAL_SET"
//   | "JQUERY_ELEMENT_TEXT_SET"
//   | "JQUERY_ELEMENT_HTML_SET"
//   | "JQUERY_AJAX_URL"
//   | "JQUERY_AJAX_DATA"
//   | "JQUERY_GET_URL"
//   | "JQUERY_GET_DATA"
//   | "JQUERY_POST_URL"
//   | "JQUERY_POST_DATA"
//   | "JQUERY_GLOBAL_EVAL"
//   | "AXIOS_GET_URL"
//   | "AXIOS_GET_CONFIG"
//   | "AXIOS_POST_URL"
//   | "AXIOS_POST_DATA"
//   | "AXIOS_POST_CONFIG"
//   | "AXIOS_REQUEST_CONFIG"
//   | "AXIOS_EFFECT_CONFIG";
// export interface TaintSinkRecord {
//   taintId: number;
//   sinkKind: SinkKind;
//   sinkDef: Def;
//   astNode: Node;
//   remark?: string;
// }
// export interface TaintSanitizerRecord {
//   taintId: number;
//   sanitizerName: string;
//   def: Def;
//   astNode: Node;
// }
// export interface TaintSource {
//   taintId: number;
//   sourceType: SourceKind;
//   originDefId: number;
//   isPseudo: boolean; // pseudo taint source
//   remark?: string;
// }
// export interface TaintPathRecord {
//   taintId: number;
//   fromDef: Def;
//   toDef: Def;
//   astNode: Node;
//   propagateKind: PropagateKind;
//   remark: string;
// }
// export interface TaintAnalysisSummary {
//   hasTaint: boolean;
//   hasSink: boolean;
//   totalSources: number;
//   totalSinks: number;
// }
// export interface OuterSourceRecord {
//   taintId: number;
//   outer?: string;
//   channel: string;
//   astNode: Node;
//   originDefId?: number;
// }
// export interface OuterSinkRecord extends TaintSinkRecord {
//   outer?: string;
//   channel?: string;
// }
// /** ----------------------------------------
//  * File-level Context (uses DAG for paths)
//  * ---------------------------------------- */
// class TaintContext {
//   readonly filename: string;
//   sources: TaintSource[] = [];
//   // Keep compatibility array view, but primary storage is pathDag
//   paths: TaintPathRecord[] = [];
//   sinks: TaintSinkRecord[] = [];
//   sanitizers: TaintSanitizerRecord[] = [];
//   // NEW: outer-specific holders (these won't be counted as regular sinks/sources)
//   outerSources: OuterSourceRecord[] = [];
//   outerSinks: OuterSinkRecord[] = [];
//   // FIXME: temp AST-level sink
//   tempSinks: NetworkCallInfo[] = [];
//   defToTaintIds: Map<number, Set<number>> = new Map();
//   knownTaintIds: Set<number> = new Set();
//   // map from stable source key to taintId
//   sourceKeyToTaintId: Map<string, number> = new Map();
//   // DAG: taintId -> edgeKey -> TaintPathRecord
//   pathDag: Map<number, Map<string, TaintPathRecord>> = new Map();
//   constructor(filename: string) {
//     this.filename = filename;
//   }
//   reset() {
//     this.sources = [];
//     this.paths = [];
//     this.sinks = [];
//     this.sanitizers = [];
//     this.outerSources = [];
//     this.outerSinks = [];
//     this.tempSinks = [];
//     this.defToTaintIds.clear();
//     this.knownTaintIds.clear();
//     this.sourceKeyToTaintId.clear();
//     this.pathDag.clear();
//   }
//   // expose a consistent array view (built lazily)
//   syncPathsFromDag() {
//     const arr: TaintPathRecord[] = [];
//     for (const map of this.pathDag.values()) {
//       for (const p of map.values()) arr.push(p);
//     }
//     this.paths = arr;
//   }
// }
// export interface PseudoTaintReceiver {
//   taintId: number; // local pseudo-taint id in receiver context (optional but kept for compatibility)
//   contextFilename: string;
//   astNode: Node;
//   channel: string;
//   targetDef: Def; // target def where the data arrives
//   outer?: string;
// }
// export interface PseudoTaintSender {
//   contextFilename: string;
//   taintDef: Def;
//   astNode: Node;
//   channel: string;
//   outer?: string;
// }
// /** ----------------------------------------
//  * InterContextBridge Abstract — Manage same channel's/outer's senders/receivers
//  * ---------------------------------------- */
// class InterContextBridge {
//   channel: string;
//   outer?: string;
//   senders: PseudoTaintSender[] = [];
//   receivers: PseudoTaintReceiver[] = [];
//   constructor(channel: string, outer?: string) {
//     this.channel = channel;
//     this.outer = outer;
//   }
//   matches(otherOuter?: string) {
//     if (this.outer && otherOuter && this.outer !== otherOuter) return false;
//     return true;
//   }
//   addSender(s: PseudoTaintSender) {
//     this.senders.push(s);
//   }
//   addReceiver(r: PseudoTaintReceiver) {
//     this.receivers.push(r);
//   }
// }
// /** ----------------------------------------
//  * TaintManager
//  * ---------------------------------------- */
// export class TaintManager {
//   private _contexts: Map<string, TaintContext> = new Map();
//   private _currentContext: TaintContext | null = null;
//   private _bridges: Map<string, InterContextBridge> = new Map();
//   /* =======================
//    * Context
//    * ======================= */
//   enterFile(filename: string) {
//     let ctx = this._contexts.get(filename);
//     if (!ctx) {
//       ctx = new TaintContext(filename);
//       this._contexts.set(filename, ctx);
//     }
//     this._currentContext = ctx;
//   }
//   exitFile() {
//     this._currentContext = null;
//   }
//   get current(): TaintContext {
//     if (!this._currentContext) {
//       throw new Error("TaintManager: no active file context");
//     }
//     return this._currentContext;
//   }
//   /* =======================
//    * Pseudo Taint (now routed through InterContextBridge)
//    * ======================= */
//   addPseudoTaintReceiver(receiver: PseudoTaintReceiver) {
//     const key = this._bridgeKey(receiver.channel, receiver.outer);
//     let bridge = this._bridges.get(key);
//     if (!bridge) {
//       bridge = new InterContextBridge(receiver.channel, receiver.outer);
//       this._bridges.set(key, bridge);
//     }
//     bridge.addReceiver(receiver);
//   }
//   addPseudoTaintSender(sender: PseudoTaintSender) {
//     const key = this._bridgeKey(sender.channel, sender.outer);
//     let bridge = this._bridges.get(key);
//     if (!bridge) {
//       bridge = new InterContextBridge(sender.channel, sender.outer);
//       this._bridges.set(key, bridge);
//     }
//     bridge.addSender(sender);
//   }
//   private _bridgeKey(channel: string, outer?: string) {
//     return `${channel}::${outer ?? "<no-outer>"}`;
//   }
//   /* =======================
//    * Source
//    * ======================= */
//   createTaintSource(
//     def: Def,
//     sourceType: SourceKind,
//     astNode: Node | null,
//     isPseudo: boolean = false,
//     remark?: string,
//   ): number {
//     const ctx = this.current;
//     // if (!astNode) {
//     //   throw new Error("createTaintSource requires astNode for stable taint id");
//     // }
//     const taintId = this._getOrCreateSourceTaintId(
//       ctx,
//       sourceType,
//       astNode,
//       remark,
//     );
//     // Only record source when first appears
//     if (!ctx.sources.some((s) => s.taintId === taintId)) {
//       ctx.sources.push({
//         taintId,
//         sourceType,
//         originDefId: def.uniqueId,
//         isPseudo,
//         remark,
//       });
//     }
//     this._addTaintIdToDef(ctx, def.uniqueId, taintId);
//     def.markTaintedFlag();
//     return taintId;
//   }
//   private _getOrCreateSourceTaintId(
//     ctx: TaintContext,
//     sourceType: SourceKind,
//     astNode: Node | null,
//     remark?: string,
//   ): number {
//     const key = buildSourceKey(sourceType, astNode, remark);
//     const existed = ctx.sourceKeyToTaintId.get(key);
//     if (existed) return existed;
//     const id = taintGenerator.nextId();
//     ctx.sourceKeyToTaintId.set(key, id);
//     ctx.knownTaintIds.add(id);
//     return id;
//   }
//   /* =======================
//    * Propagation (creates edges in DAG)
//    * ======================= */
//   propagateTaint(
//     from: Def | null,
//     to: Def | null,
//     astNode: Node,
//     kind: PropagateKind = "OTHER",
//     remark: string = "",
//   ) {
//     if (!from || !to || !from.isTainted) return;
//     const ctx = this.current;
//     const fromSet = ctx.defToTaintIds.get(from.uniqueId);
//     if (!fromSet) return;
//     for (const taintId of fromSet) {
//       this._addTaintIdToDef(ctx, to.uniqueId, taintId);
//       to.markTaintedFlag();
//       this._addPathEdge(ctx, taintId, from, to, astNode, kind, remark);
//     }
//   }
//   /* =======================
//    * Sink
//    * ======================= */
//   checkSink(
//     def: Def | null,
//     sinkKind: SinkKind,
//     astNode: Node,
//     remark?: string,
//   ) {
//     if (!def || !def.isTainted) return;
//     const ctx = this.current;
//     const taintIds = this.getDefTaintIds(def);
//     if (taintIds.length === 0) return;
//     for (const taintId of taintIds) {
//       const rec: TaintSinkRecord = {
//         taintId,
//         sinkKind,
//         sinkDef: def,
//         astNode,
//         remark,
//       };
//       ctx.sinks.push(rec);
//       logger.warn(
//         `[TAINT-SINK][${ctx.filename}] ${sinkKind} @ ${formatLocation(astNode)}`,
//       );
//     }
//   }
//   /* =======================
//    * Sanitizer
//    * ======================= */
//   applySanitizer(
//     def: Def | null,
//     sanitizerName: string,
//     astNode: Node,
//     taintIds?: number[],
//   ) {
//     if (!def) return;
//     const ctx = this.current;
//     const ids = taintIds ?? this.getDefTaintIds(def);
//     if (ids.length === 0) return;
//     for (const taintId of ids) {
//       this.sanitizeDefForTaint(ctx, def, taintId);
//       ctx.sanitizers.push({
//         taintId,
//         sanitizerName,
//         def,
//         astNode,
//       });
//     }
//   }
//   sanitizeDefForTaint(ctx: TaintContext, def: Def, taintId: number) {
//     const set = ctx.defToTaintIds.get(def.uniqueId);
//     if (!set) return;
//     set.delete(taintId);
//     if (set.size === 0) {
//       ctx.defToTaintIds.delete(def.uniqueId);
//       try {
//         def.clearTaintFlag();
//       } catch {}
//     }
//   }
//   /* =======================
//    * TEMP Sink (AST-level)
//    * ======================= */
//   registerTempSink(s: NetworkCallInfo) {
//     const ctx = this.current;
//     ctx.tempSinks.push(s);
//   }
//   registerTempSinks(sinks: NetworkCallInfo[]) {
//     for (const s of sinks) {
//       this.registerTempSink(s);
//     }
//   }
//   /* =======================
//    * Query
//    * ======================= */
//   getDefTaintIds(def: Def): number[] {
//     const s = this.current.defToTaintIds.get(def.uniqueId);
//     return s ? [...s] : [];
//   }
//   /* =======================
//    * DAG helpers
//    * ======================= */
//   private _edgeKey(fromId: number, toId: number, astNode: Node) {
//     const r1 = (astNode as any)?.range;
//     const rPart = r1 ? `${r1[0]}:${r1[1]}` : "unknown";
//     return `${fromId}->${toId}@${rPart}`;
//   }
//   private _addPathEdge(
//     ctx: TaintContext,
//     taintId: number,
//     from: Def,
//     to: Def,
//     astNode: Node,
//     propagateKind: PropagateKind = "OTHER",
//     remark: string = "",
//   ) {
//     if (!ctx.pathDag.has(taintId)) ctx.pathDag.set(taintId, new Map());
//     const dag = ctx.pathDag.get(taintId)!;
//     const key = this._edgeKey(from.uniqueId, to.uniqueId, astNode);
//     if (dag.has(key)) return; // already exists
//     const rec: TaintPathRecord = {
//       taintId,
//       fromDef: from,
//       toDef: to,
//       astNode,
//       propagateKind,
//       remark,
//     };
//     dag.set(key, rec);
//     ctx.knownTaintIds.add(taintId);
//     // keep compatibility array small — rebuild on demand
//     ctx.syncPathsFromDag();
//   }
//   private _pathExists(
//     ctx: TaintContext,
//     taintId: number,
//     fromId: number,
//     toId: number,
//     astNode: Node,
//   ) {
//     const dag = ctx.pathDag.get(taintId);
//     if (!dag) return false;
//     const key = this._edgeKey(fromId, toId, astNode);
//     return dag.has(key);
//   }
//   /* =======================
//    * Resolve Pseudo-Taints (using InterContextBridge & ScopeTree validation)
//    * - For each bridge, match senders <-> receivers
//    * - Validate with ScopeTree (if provided)
//    * - If sender has a real source on its def, create a synthetic real source in receiverCtx
//    * - Copy sender paths into receiverCtx under the new synthetic taintId
//    * - Insert a CROSSPAGE edge (GLOBAL, remark = 'PSEUDO-CROSSPAGE')
//    * ======================= */
//   private resolvePseudoTaints() {
//     if (this._bridges.size === 0) return;
//     // prevent duplicate work: receiverFile:receiverIndex:senderFile:senderTaintId
//     const resolved = new Set<string>();
//     for (const bridge of this._bridges.values()) {
//       if (bridge.senders.length > 0 && bridge.receivers.length > 0) {
//         for (const sender of bridge.senders) {
//           const senderCtx = this.getContext(sender.contextFilename);
//           if (!senderCtx) continue;
//           const senderTaintSet = senderCtx.defToTaintIds.get(
//             sender.taintDef.uniqueId,
//           );
//           if (!senderTaintSet || senderTaintSet.size === 0) continue;
//           for (const receiver of bridge.receivers) {
//             const receiverCtx = this.getContext(receiver.contextFilename);
//             if (!receiverCtx) continue;
//             // optional scope tree validation
//             if (receiver.contextFilename === sender.contextFilename) continue;
//             for (const senderTaintId of senderTaintSet) {
//               const key = `${receiver.contextFilename}:${receiver.taintId}:${sender.contextFilename}:${senderTaintId}`;
//               if (resolved.has(key)) continue;
//               // check that sender has a real source record for this taintId (not pseudo)
//               const senderSource = senderCtx.sources.find(
//                 (s) => s.taintId === senderTaintId,
//               );
//               if (!senderSource) continue;
//               if (senderSource.sourceType === "PSEUDO_TAINT") continue; // require real
//               // 1) create synthetic source in receiverCtx — new taint id
//               const syntheticId = taintGenerator.nextId();
//               receiverCtx.knownTaintIds.add(syntheticId);
//               receiverCtx.sources.push({
//                 taintId: syntheticId,
//                 sourceType: senderSource.sourceType,
//                 remark: senderSource.remark,
//                 originDefId: sender.taintDef.uniqueId,
//                 isPseudo: false,
//               });
//               // map this synthetic taint to the receiver target def (if available), otherwise to a placeholder def
//               if (receiver.targetDef) {
//                 this._addTaintIdToDef(
//                   receiverCtx,
//                   receiver.targetDef.uniqueId,
//                   syntheticId,
//                 );
//                 receiver.targetDef.markTaintedFlag();
//               }
//               // 2) clone sender paths into receiverCtx but re-key to syntheticId
//               const senderDag = senderCtx.pathDag.get(senderTaintId);
//               if (senderDag) {
//                 if (!receiverCtx.pathDag.has(syntheticId))
//                   receiverCtx.pathDag.set(syntheticId, new Map());
//                 const rDag = receiverCtx.pathDag.get(syntheticId)!;
//                 for (const [edgeKey, pathRec] of senderDag.entries()) {
//                   // create a mapped path record but with taintId = syntheticId
//                   const newRec: TaintPathRecord = {
//                     taintId: syntheticId,
//                     fromDef: pathRec.fromDef,
//                     toDef: pathRec.toDef,
//                     astNode: pathRec.astNode,
//                     propagateKind: pathRec.propagateKind,
//                     remark: pathRec.remark,
//                   };
//                   // check existence using DAG helpers (edgeKey from sender may collide, so compute fresh key)
//                   const freshKey = this._edgeKey(
//                     newRec.fromDef.uniqueId,
//                     newRec.toDef.uniqueId,
//                     newRec.astNode,
//                   );
//                   if (!rDag.has(freshKey)) {
//                     rDag.set(freshKey, newRec);
//                   }
//                 }
//               }
//               // 3) insert CROSSPAGE edge into receiverCtx connecting sender -> receiver
//               // use astNode from receiver for location, and mark remark
//               const toDef = receiver.targetDef ?? sender.taintDef;
//               this._addPathEdge(
//                 receiverCtx,
//                 /*taintId*/ syntheticId,
//                 /*from*/ sender.taintDef,
//                 /*to*/ toDef,
//                 /*astNode*/ receiver.astNode,
//                 /*kind*/ "GLOBAL",
//                 /*remark*/ bridge.channel,
//               );
//               // 4) optionally clone receiver's own pseudo-paths (if receiver had paths under its pseudo taint id)
//               if (receiver.taintId) {
//                 const rSrcDag = receiverCtx.pathDag.get(receiver.taintId);
//                 if (rSrcDag) {
//                   if (!receiverCtx.pathDag.has(syntheticId))
//                     receiverCtx.pathDag.set(syntheticId, new Map());
//                   const synDag = receiverCtx.pathDag.get(syntheticId)!;
//                   for (const rec of rSrcDag.values()) {
//                     const mappedKey = this._edgeKey(
//                       rec.fromDef.uniqueId,
//                       rec.toDef.uniqueId,
//                       rec.astNode,
//                     );
//                     if (!synDag.has(mappedKey)) {
//                       synDag.set(mappedKey, {
//                         taintId: syntheticId,
//                         fromDef: rec.fromDef,
//                         toDef: rec.toDef,
//                         astNode: rec.astNode,
//                         propagateKind: rec.propagateKind,
//                         remark: rec.remark,
//                       });
//                     }
//                   }
//                 }
//               }
//               // 5) clone receiver's sinks
//               for (const sink of receiverCtx.sinks) {
//                 if (sink.taintId === receiver.taintId) {
//                   receiverCtx.sinks.push({
//                     ...sink,
//                     taintId: syntheticId,
//                   });
//                 }
//               }
//               // sync arrays
//               receiverCtx.syncPathsFromDag();
//               resolved.add(key);
//             }
//           }
//         }
//       }
//       // NEW: senders exist but no receivers => messages sent to external extension
//       if (bridge.senders.length > 0 && bridge.receivers.length === 0) {
//         for (const sender of bridge.senders) {
//           if (!sender.outer) continue;
//           const senderCtx = this.getContext(sender.contextFilename);
//           if (!senderCtx) continue;
//           // get taint ids on sender.taintDef
//           const taintSet = senderCtx.defToTaintIds.get(
//             sender.taintDef.uniqueId,
//           );
//           if (!taintSet || taintSet.size === 0) continue;
//           for (const tId of taintSet) {
//             senderCtx.outerSources.push({
//               taintId: tId,
//               outer: sender.outer,
//               channel: bridge.channel,
//               astNode: sender.astNode,
//               originDefId: sender.taintDef.uniqueId,
//             });
//           }
//         }
//       }
//       // NEW: receivers exist but no senders => messages originate from external into this extension
//       if (bridge.receivers.length > 0 && bridge.senders.length === 0) {
//         for (const receiver of bridge.receivers) {
//           if (!receiver.outer) continue;
//           const receiverCtx = this.getContext(receiver.contextFilename);
//           if (!receiverCtx) continue;
//           // mark this receiver's pseudo taint id as outer-source (外部输入)
//           if (receiver.taintId) {
//             receiverCtx.outerSources.push({
//               taintId: receiver.taintId,
//               outer: bridge.outer,
//               channel: bridge.channel,
//               astNode: receiver.astNode,
//               originDefId: receiver.targetDef?.uniqueId,
//             });
//           }
//         }
//       }
//     }
//     // Finally: Synchronize the paths array (preserve the original behavior).
//     for (const ctx of this._contexts.values()) {
//       // update outer sinks
//       for (const sink of ctx.sinks) {
//         const outerSource = ctx.outerSources.find(
//           (o) => o.taintId === sink.taintId,
//         );
//         if (outerSource) {
//           ctx.outerSinks.push({
//             ...sink,
//             outer: "[pseudo-or-external]",
//             channel: outerSource.channel,
//           } as OuterSinkRecord);
//         }
//       }
//       ctx.syncPathsFromDag();
//     }
//   }
//   private getContext(filename: string): TaintContext | null {
//     return this._contexts.get(filename) ?? null;
//   }
//   /* =======================
//    * Report
//    * ======================= */
//   generateReportForFile(filename: string) {
//     const ctx = this._contexts.get(filename);
//     if (!ctx) return null;
//     this.resolvePseudoTaints();
//     return this._generateReportFromContext(ctx);
//   }
//   generateGlobalReport() {
//     this.resolvePseudoTaints();
//     return [...this._contexts.values()].map((ctx) =>
//       this._generateReportFromContext(ctx),
//     );
//   }
//   private _generateReportFromContext(ctx: TaintContext) {
//     const issues: any[] = [];
//     // Ensure paths array is synced
//     ctx.syncPathsFromDag();
//     for (const src of ctx.sources) {
//       // Skip PSEUDO_TAINT types entirely in final report
//       if (src.sourceType === "PSEUDO_TAINT") continue;
//       const paths = ctx.paths.filter((p) => p.taintId === src.taintId);
//       const sinks = ctx.sinks.filter((s) => s.taintId === src.taintId);
//       const sanitizers = ctx.sanitizers.filter(
//         (s) => s.taintId === src.taintId,
//       );
//       if (sinks.length === 0 || paths.length === 0) continue; // only report sources with sinks
//       const sourceNode = paths[0]?.astNode;
//       issues.push({
//         source: {
//           kind: src.sourceType,
//           remark: src.remark,
//           loc: sourceNode ? formatLocation(sourceNode) : "[unknown]",
//         },
//         flow: paths.map((p) => ({
//           kind: p.propagateKind,
//           loc: formatLocation(p.astNode),
//           remark: p.remark || undefined,
//         })),
//         sinks: sinks.map((s) => ({
//           kind: s.sinkKind,
//           remark: s.remark,
//           loc: formatLocation(s.astNode),
//         })),
//         sanitized: sanitizers.length > 0,
//       });
//     }
//     return {
//       filename: ctx.filename,
//       issues,
//       outerSources: ctx.outerSources.map((o) => ({
//         taintId: o.taintId,
//         outer: o.outer,
//         channel: o.channel,
//         loc: formatLocation(o.astNode),
//         originDefId: o.originDefId,
//       })),
//       outerSinks: ctx.outerSinks.map((s) => ({
//         taintId: s.taintId,
//         sinkKind: s.sinkKind,
//         loc: formatLocation(s.astNode),
//         outer: s.outer ?? "[pseudo-or-external]",
//       })),
//       tempSinks: ctx.tempSinks,
//       summary: {
//         totalIssues: issues.length,
//         outerSources: ctx.outerSources.length,
//         outerSinks: ctx.outerSinks.length,
//       },
//     };
//   }
//   /**
//    * Collect Source-Sink Flows
//    */
//   private _collectFlowsLite(): string[] {
//     const flowSet = new Set<string>();
//     for (const ctx of this._contexts.values()) {
//       ctx.syncPathsFromDag();
//       for (const sink of ctx.sinks) {
//         const taintId = sink.taintId;
//         const source = ctx.sources.find((s) => s.taintId === taintId);
//         if (!source || source.sourceType === "PSEUDO_TAINT") continue;
//         // source location: prefer path start, fallback to sink
//         const sourceNode =
//           ctx.paths.find((p) => p.taintId === taintId)?.astNode ?? sink.astNode;
//         const sourceLoc = sourceNode ? formatLocation(sourceNode) : "[unknown]";
//         const sinkLoc = formatLocation(sink.astNode);
//         const sourceRemark = source.remark ? `[${source.remark}]` : "";
//         const sinkRemark = sink.remark ? `[${sink.remark}]` : "";
//         const flowStr =
//           `${source.sourceType}(${sourceLoc})${sourceRemark}` +
//           ` ==> ` +
//           `${sink.sinkKind}(${sinkLoc})${sinkRemark}`;
//         flowSet.add(flowStr);
//       }
//     }
//     return [...flowSet];
//   }
//   /**
//    * Global summary (JSON format)
//    * - sources: [{ taintId, sourceType, file, loc }]
//    * - sinks:   [{ taintId, sinkKind, file, loc }]
//    */
//   getGlobalSummary() {
//     this.resolvePseudoTaints();
//     // Use a Map for deduplication (key = semantically unique key)
//     const sourcesMap = new Map<string, any>();
//     const sinksMap = new Map<string, any>();
//     const outerSourcesMap = new Map<string, any>();
//     const outerSinksMap = new Map<string, any>();
//     for (const ctx of this._contexts.values()) {
//       ctx.syncPathsFromDag();
//       /* =======================
//        * Sources
//        * ======================= */
//       for (const s of ctx.sources) {
//         if (s.sourceType === "PSEUDO_TAINT") continue;
//         const hasFlow =
//           ctx.paths.some((p) => p.taintId === s.taintId) ||
//           ctx.sinks.some((sk) => sk.taintId === s.taintId) ||
//           ctx.outerSources.some((o) => o.taintId === s.taintId);
//         if (!hasFlow) continue;
//         const pathNode = ctx.paths.find(
//           (p) => p.taintId === s.taintId,
//         )?.astNode;
//         const loc = pathNode ? formatLocation(pathNode) : "[unknown]";
//         const key = `${s.sourceType}|${ctx.filename}|${loc}|${s.remark}`;
//         if (sourcesMap.has(key)) continue;
//         sourcesMap.set(key, {
//           sourceType: s.sourceType,
//           remark: s.remark,
//           file: ctx.filename,
//           loc,
//         });
//       }
//       /* =======================
//        * Normal sinks
//        * ======================= */
//       for (const sk of ctx.sinks) {
//         const sourceType = ctx.sources.find(
//           (s) => s.taintId === sk.taintId,
//         )?.sourceType;
//         if (!sourceType || sourceType === "PSEUDO_TAINT") continue;
//         const loc = formatLocation(sk.astNode);
//         const key = `${sk.sinkKind}|${ctx.filename}|${loc}|${sk.remark}`;
//         if (sinksMap.has(key)) continue;
//         sinksMap.set(key, {
//           sinkKind: sk.sinkKind,
//           file: ctx.filename,
//           remark: sk.remark,
//           loc,
//         });
//       }
//       /* =======================
//        * Outer sources
//        * ======================= */
//       for (const os of ctx.outerSources) {
//         const loc = formatLocation(os.astNode);
//         const outer = os.outer ?? "[unknown-outer]";
//         const key = `${os.channel}|${outer}|${ctx.filename}|${loc}`;
//         if (outerSourcesMap.has(key)) continue;
//         outerSourcesMap.set(key, {
//           channel: os.channel,
//           outer,
//           file: ctx.filename,
//           loc,
//         });
//       }
//       /* =======================
//        * Outer sinks
//        * ======================= */
//       for (const osk of ctx.outerSinks) {
//         const loc = formatLocation(osk.astNode);
//         const outer = osk.outer ?? "[pseudo-or-external]";
//         const key = `${osk.sinkKind}|${outer}|${ctx.filename}|${loc}`;
//         if (outerSinksMap.has(key)) continue;
//         outerSinksMap.set(key, {
//           sinkKind: osk.sinkKind,
//           outer,
//           file: ctx.filename,
//           loc,
//           channel: osk.channel,
//         });
//       }
//     }
//     const sources = [...sourcesMap.values()];
//     const sinks = [...sinksMap.values()];
//     const outerSources = [...outerSourcesMap.values()];
//     const outerSinks = [...outerSinksMap.values()];
//     const flows = this._collectFlowsLite();
//     return {
//       hasTaint: sources.length > 0,
//       hasSink: sinks.length > 0,
//       totalSources: sources.length,
//       totalSinks: sinks.length,
//       sources,
//       sinks,
//       flows,
//       outerSources,
//       outerSinks,
//     };
//   }
//   /* =======================
//    * Utils
//    * ======================= */
//   private _addTaintIdToDef(ctx: TaintContext, defId: number, taintId: number) {
//     if (!ctx.defToTaintIds.has(defId)) {
//       ctx.defToTaintIds.set(defId, new Set());
//     }
//     ctx.defToTaintIds.get(defId)!.add(taintId);
//     ctx.knownTaintIds.add(taintId);
//   }
//   /* =======================
//    * Debug
//    * ======================= */
//   resetAll() {
//     this._contexts.clear();
//     this._currentContext = null;
//     this._bridges.clear();
//     taintGenerator.reset();
//   }
// }
// /** ----------------------------------------
//  * Helper
//  * ---------------------------------------- */
// function buildSourceKey(
//   sourceType: SourceKind,
//   node: Node | null,
//   remark?: string,
// ): string {
//   const r = (node as any)?.range;
//   if (!r) {
//     return `${sourceType}@${remark ?? "unknown"}`;
//   }
//   return `${sourceType}@${r[0]}:${r[1]}`;
// }
// function padRight(str: string, len: number) {
//   return str.length >= len ? str : str + " ".repeat(len - str.length);
// }
// function writeLine(stream: Writable, line: string = "") {
//   stream.write(line + "\n");
// }
// export function printTaintReportCLI(report: any): string {
//   let output = "";
//   const writeLine = (line: string = "") => {
//     output += line + "\n";
//   };
//   // TEMP logic
//   if (!report) {
//     writeLine("✓ No taint issues found.");
//     return output;
//   }
//   const line = "═".repeat(46);
//   writeLine(line);
//   writeLine(`TAINT REPORT  ${report.filename}`);
//   writeLine(line);
//   writeLine();
//   report.issues.forEach((issue: any, idx: number) => {
//     writeLine(`[!] Issue #${idx + 1}`);
//     writeLine(` ├─ Source     : ${issue.source.kind}`);
//     writeLine(` ├─ Remark     : ${issue.source.remark}`);
//     writeLine(` │  Location   : ${issue.source.loc}`);
//     writeLine(" │");
//     if (issue.flow.length > 0) {
//       writeLine(" ├─ Propagation:");
//       issue.flow.forEach((f: any, i: number) => {
//         const remark = f.remark ? ` (${f.remark})` : "";
//         writeLine(` │   ${padRight(f.kind, 10)} @ ${f.loc}${remark}`);
//       });
//       writeLine(" │");
//     }
//     writeLine(" ├─ Sink(s):");
//     issue.sinks.forEach((s: any) => {
//       const remark = s.remark ? ` (${s.remark})` : "";
//       writeLine(` │   - ${padRight(s.kind, 10)} @ ${s.loc}${remark}`);
//     });
//     writeLine(" │");
//     writeLine(` └─ Sanitized : ${issue.sanitized ? "YES" : "NO"}`);
//     writeLine();
//   });
//   /* =======================
//    * TEMP SINKS (AST ONLY)
//    * ======================= */
//   if (report.tempSinks && report.tempSinks.length > 0) {
//     writeLine("[!] TEMP SINKS (AST-ONLY, NON-TAINT)");
//     report.tempSinks.forEach((s: any) => {
//       writeLine(` ├─ ${padRight(s.callee, 14)} @ ${s.loc}`);
//     });
//     writeLine();
//   }
//   writeLine("Summary:");
//   writeLine(`  Files           : 1`);
//   writeLine(`  Issues          : ${report.summary.totalIssues}`);
//   writeLine(line);
//   return output;
// }
// export const taintManager = new TaintManager();
