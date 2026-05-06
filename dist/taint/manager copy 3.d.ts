import { Node } from "acorn";
import Def from "../def-use/types/def";
import { SourceKind, PropagateKind, SinkKind, PseudoTaintReceiver, PseudoTaintSender } from "./types";
import { TaintContext } from "./context";
import { ReportOptions } from "../config";
import { ExtensionScript } from "../extension/extensionScript";
export interface StorageAction {
    area: string;
    key: string;
    contextFilename: string;
    astNode: Node;
}
export interface StorageSet extends StorageAction {
    valueDef: Def;
}
export interface StorageGet extends StorageAction {
    targetDef: Def;
    taintId: number;
}
/** ----------------------------------------
 * TaintManager
 * ---------------------------------------- */
export declare class TaintManager {
    private _contexts;
    private _currentContext;
    private _bridges;
    private _storageSets;
    private _storageGets;
    private _reportOptions;
    enterFile(script: ExtensionScript): void;
    exitFile(): void;
    get current(): TaintContext;
    /**
     * 记录 storage.set(key, value)
     */
    recordStorageSet(area: string, key: string, valueDef: Def, astNode: Node): void;
    /**
     * 记录 storage.get(key)，并立即生成 PSEUDO_STORAGE 污点
     */
    recordStorageGet(area: string, key: string, targetDef: Def, astNode: Node): number;
    addPseudoTaintReceiver(receiver: PseudoTaintReceiver): void;
    addPseudoTaintSender(sender: PseudoTaintSender): void;
    private _bridgeKey;
    createTaintSource(def: Def, sourceType: SourceKind, astNode: Node | null, isPseudo?: boolean, remark?: string): number;
    private _getOrCreateSourceTaintId;
    propagateTaint(from: Def | null, to: Def | null, astNode: Node, kind?: PropagateKind, remark?: string): void;
    checkSink(def: Def | null, sinkKind: SinkKind, astNode: Node, remark?: string): void;
    applySanitizer(def: Def | null, sanitizerName: string, astNode: Node, taintIds?: number[]): void;
    sanitizeDefForTaint(ctx: TaintContext, def: Def, taintId: number): void;
    getDefTaintIds(def: Def): number[];
    private _edgeKey;
    private _addPathEdge;
    private resolvePseudoTaints;
    /**
     * 核心修复：分析 Storage Set 和 Get 之间的关联
     */
    private resolveStorageTaints;
    /**
     * 专为 Storage 设计的合成源创建
     */
    private createSyntheticSourceFromStorage;
    /**
     * 将 Get 产生的临时伪污点路径合并到真实的合成污点路径中
     */
    private mergePseudoToSynthetic;
    /**
     * 处理单个桥接
     */
    private processBridge;
    /**
     * 处理双向桥接
     */
    private processBridgeWithBothSides;
    private _replaceOuterTaintId;
    /**
     * 获取有效的发送者污点ID
     */
    private getValidSenderTaintIds;
    /**
     * 处理发送者-接收者对
     */
    private processSenderReceiverPair;
    /**
     * 生成解决键
     */
    private generateResolvedKey;
    /**
     * 创建合成源
     */
    private createSyntheticSource;
    /**
     * 克隆发送者路径
     */
    private cloneSenderPaths;
    /**
     * 添加跨页边
     */
    private addCrossPageEdge;
    /**
     * 克隆接收者伪污点路径
     */
    private cloneReceiverPseudoPaths;
    /**
     * 克隆接收者的sink
     */
    private cloneReceiverSinks;
    /**
     * 处理出站桥接（只有发送者）
     */
    private processOutboundBridge;
    /**
     * 处理入站桥接（只有接收者）
     */
    private processInboundBridge;
    /**
     * 同步所有上下文
     */
    private syncAllContexts;
    /**
     * 清理 orphan outerSenders：移除 autoPushed 的 sender
     */
    private _cleanupOrphanOuterSenders;
    /**
     * 更新外部sink
     */
    private updateOuterReceivers;
    private getContext;
    generateReportForFile(filename: string, opts?: ReportOptions): {
        filename: string;
        issues: any[];
        outerSenders: {
            taintId: number;
            outer: string | undefined;
            channel: string;
            loc: string;
            originDefId: number | undefined;
            file: string;
        }[];
        outerReceivers: {
            taintId: number;
            sinkKind: SinkKind;
            loc: string;
            outer: string;
            channel: string | undefined;
            file: string;
        }[];
        summary: {
            totalIssues: number;
            outerSender: number;
            outerReceivers: number;
        };
    } | null;
    generateGlobalReport(opts?: ReportOptions): {
        filename: string;
        issues: any[];
        outerSenders: {
            taintId: number;
            outer: string | undefined;
            channel: string;
            loc: string;
            originDefId: number | undefined;
            file: string;
        }[];
        outerReceivers: {
            taintId: number;
            sinkKind: SinkKind;
            loc: string;
            outer: string;
            channel: string | undefined;
            file: string;
        }[];
        summary: {
            totalIssues: number;
            outerSender: number;
            outerReceivers: number;
        };
    }[];
    private _getCodeSnippet;
    /**
     * internal helper: cached formatLocation to avoid repeated work
     */
    private _makeLocFormatter;
    /**
     * Build a truncated flow list according to report options.
     * Each `paths` item is { kind, loc, remark }
     */
    private _truncateFlows;
    private _generateReportFromContext;
    private _formatCodeSnippet;
    private _collectFlowsLite;
    /**
     * Global summary (JSON format)
     */
    getGlobalSummary(opts?: ReportOptions): {
        hasTaint: boolean;
        hasSink: boolean;
        totalSources: number;
        totalSinks: number;
        sources: any[];
        sinks: any[];
        flows: any[];
        outerSenders: any[];
        outerReceivers: any[];
    };
    private _addTaintIdToDef;
    private _findContextByDefId;
    resetAll(): void;
}
