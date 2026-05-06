import { FlowType, SinkCapability, SinkType, SourceCapability, SourceType } from "./types";
import { ScriptFrameTag } from "../extension/extensionScript";
export declare function shouldIncludeScriptInPolicy(scriptKey: string): boolean;
export declare function shouldFilterSourceByFrame(source: SourceType, sourceFrame: ScriptFrameTag, sink: SinkType, sinkFrame: ScriptFrameTag): boolean;
export declare function classifySource(source: SourceType): SourceCapability;
export declare function classifySink(sink: SinkType): SinkCapability;
export declare function getFlowType(source: SourceType, sink: SinkType): FlowType | null;
