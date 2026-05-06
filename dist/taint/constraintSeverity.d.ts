import { SourceType, SinkType } from "./types";
import { FrameConstraint } from "../extension/scriptUsageTracker";
type ConstraintKind = "EXTERNALLY_CONNECTABLE" | "CONTENT_SCRIPT_MATCHES" | "UNKNOWN";
export type SeverityLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export interface FlowConstraintSeverity {
    constraintKind: ConstraintKind;
    severity: SeverityLevel;
    severityReason: string;
    severityEvidence: string[];
}
export declare function analyzeFlowConstraintSeverity(input: {
    sourceType: SourceType;
    sinkType: SinkType;
    sourceFrame: string;
    sourceFrameConstraint?: FrameConstraint;
}): FlowConstraintSeverity;
export {};
