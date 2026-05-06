import { Node } from "acorn";
import Def from "../def-use/types/def";
import { SourceKind, PropagateKind, SinkKind, PseudoTaintReceiver, PseudoTaintSender } from "./types";
import { TaintContext } from "./context";
import { ReportOptions } from "../config";
import { ExtensionScript } from "../extension/extensionScript";
/** ----------------------------------------
 * TaintManager
 * ---------------------------------------- */
export declare class TaintManager {
    private _contexts;
    private _currentContext;
    private _bridges;
    private _reportOptions;
    enterFile(script: ExtensionScript): void;
    exitFile(): void;
    get current(): TaintContext;
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
     * 处理单个桥接
     */
    private processBridge;
    /**
     * 处理双向桥接
     */
    private processBridgeWithBothSides;
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
    /**
     * Collect Source-Sink Flows (structured + includes ctx/file info now)
     */
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
    resetAll(): void;
}
