// sourceReport.ts
//
// Source-level taint report generator.
//
// Replaces the old fine-grained `report.txt` (a raw walk of AST spans that was
// hugely repetitive and unreadable) with a compact, source-anchored report that
// resolves every propagation step back to the extension's own source code.
//
// It consumes the per-file reports produced by
// `taintManager.generateGlobalReport({ level: "detailed" })` and, using the
// in-memory extension sources, emits:
//   - report.flows.json : machine form, one object per flow
//   - report.source.md  : human/LLM form, one line per propagation step
//
// Design (ported from the standalone Python converter, but here we have the
// authoritative in-memory sources so no crx re-extraction is needed):
//   * Issue-level dedup: the same (file, source, loc) can be reported many times
//     across contexts; collapse them, union their sinks, count duplicates.
//   * Propagation condensing: the cyclic AST walk is reduced to the set of
//     distinct source *lines* it touches, in first-visit (flow) order, printed
//     once each — this keeps the complete source->sink path while removing the
//     massive redundancy.
//   * Location resolution: a step's line/column is resolved against the issue's
//     own file first; if out of range (inter-procedural / cross-frame hops) it
//     is resolved against sibling files sharing the frame, then globally, using
//     column length and non-blank lines as disambiguators.
//   * Sinkless filtering: sources that reach no sink are dropped by default.

import { scriptUsageTracker } from "../extension/scriptUsageTracker";

/* ------------------------------------------------------------------ */
/* location parsing                                                    */
/* ------------------------------------------------------------------ */
interface Loc {
  l1: number;
  c1: number;
  l2: number;
  c2: number;
  multiline: boolean;
  raw: string;
}

const LOC_RE = /L(\d+):C(\d+)\s*->\s*L(\d+):C(\d+)/;

function parseLoc(s: string | undefined | null): Loc | null {
  if (!s) return null;
  const m = LOC_RE.exec(s);
  if (!m) return null;
  const l1 = +m[1], c1 = +m[2], l2 = +m[3], c2 = +m[4];
  return { l1, c1, l2, c2, multiline: l1 !== l2, raw: `L${l1}:C${c1} -> L${l2}:C${c2}` };
}

/* ------------------------------------------------------------------ */
/* source resolution                                                  */
/* ------------------------------------------------------------------ */
const MAX_LINE = 500; // window very long (minified) lines around the taint span
const WINDOW = 120;

export interface ScriptSource {
  key: string; // ext-stripped script key (== report.filename / issue file)
  code: string;
}

class SourceResolver {
  private lines = new Map<string, string[]>();
  private fileFrame = new Map<string, string>();
  private frameFiles = new Map<string, string[]>();
  private allKeys: string[] = [];

  constructor(sources: ScriptSource[]) {
    for (const s of sources) {
      const arr = s.code.split("\n").map((ln) => ln.replace(/\r$/, ""));
      this.lines.set(s.key, arr);
      this.allKeys.push(s.key);
      const frame = scriptUsageTracker.getPrimaryFrameByKey(s.key);
      if (frame) this.fileFrame.set(s.key, frame);
      for (const tag of scriptUsageTracker.getScriptFrameTagsByKey(s.key)) {
        const list = this.frameFiles.get(tag) ?? [];
        if (!list.includes(s.key)) list.push(s.key);
        this.frameFiles.set(tag, list);
      }
    }
  }

  getLines(key: string): string[] | null {
    return this.lines.get(key) ?? null;
  }

  lineText(key: string, lineNo: number): string | null {
    const arr = this.lines.get(key);
    if (!arr || lineNo < 1 || lineNo > arr.length) return null;
    return arr[lineNo - 1];
  }

  private fits(key: string, lineNo: number, colNeed: number | null): boolean {
    const arr = this.lines.get(key);
    if (!arr || lineNo < 1 || lineNo > arr.length) return false;
    if (colNeed == null) return true;
    return arr[lineNo - 1].length >= colNeed;
  }

  private pick(matches: string[], lineNo: number): string | null {
    if (matches.length === 0) return null;
    if (matches.length === 1) return matches[0];
    // prefer a non-blank start line, then the largest file
    let best = matches[0];
    let bestScore: [number, number] = [-1, -1];
    for (const f of matches) {
      const t = this.lineText(f, lineNo) ?? "";
      const score: [number, number] = [t.trim() ? 1 : 0, (this.lines.get(f)?.length ?? 0)];
      if (score[0] > bestScore[0] || (score[0] === bestScore[0] && score[1] > bestScore[1])) {
        best = f;
        bestScore = score;
      }
    }
    return best;
  }

  /** Resolve the file a location actually points at (see file header). */
  resolveFile(issueFile: string, lineNo: number, colNeed: number | null): string {
    if (this.fits(issueFile, lineNo, colNeed)) return issueFile;

    const frame = this.fileFrame.get(issueFile);
    const siblings = frame ? this.frameFiles.get(frame) ?? [] : [];
    const sibMatches = siblings.filter((f) => f !== issueFile && this.fits(f, lineNo, colNeed));
    const sibPick = this.pick(sibMatches, lineNo);
    if (sibPick) return sibPick;

    const tried = new Set([issueFile, ...siblings]);
    const globMatches = this.allKeys.filter((f) => !tried.has(f) && this.fits(f, lineNo, colNeed));
    return this.pick(globMatches, lineNo) ?? issueFile;
  }

  /** Marked (»…«) single line, windowed for minified lines / huge spans. */
  markAndWindow(text: string, c1: number | null, c2: number | null): string {
    const n = text.length;
    if (c1 == null || c1 < 0 || c1 > n) {
      return n <= MAX_LINE ? text.trimEnd() : (text.slice(0, MAX_LINE) + "…").trimEnd();
    }
    if (c2 == null || c2 > n || c2 < c1) c2 = n;
    const span = c2 - c1;

    if (n <= MAX_LINE) {
      return (text.slice(0, c1) + "»" + text.slice(c1, c2) + "«" + text.slice(c2)).trimEnd();
    }
    if (span <= 2 * WINDOW) {
      const lo = Math.max(0, c1 - WINDOW);
      const hi = Math.min(n, c2 + WINDOW);
      const seg = text.slice(lo, c1) + "»" + text.slice(c1, c2) + "«" + text.slice(c2, hi);
      return ((lo > 0 ? "…" : "") + seg + (hi < n ? "…" : "")).trimEnd();
    }
    // huge span on one line: show both ends only
    const head = text.slice(Math.max(0, c1 - 20), c1) + "»" + text.slice(c1, Math.min(n, c1 + WINDOW));
    const tail = text.slice(Math.max(0, c2 - WINDOW), c2) + "«" + text.slice(c2, Math.min(n, c2 + 20));
    return ((c1 - 20 > 0 ? "…" : "") + head + ` …⟨tainted span: ${span} chars⟩… ` + tail + (c2 + 20 < n ? "…" : "")).trimEnd();
  }

  /** Compact single marked code line for a resolved location. */
  compactCode(rf: string, line: number, c1: number, c2: number, spanTo: number | null): string | null {
    const text = this.lineText(rf, line);
    if (text == null) return null;
    const effC2 = spanTo ? null : c2;
    const code = this.markAndWindow(text, c1, effC2).trim();
    if (!code && spanTo) {
      // synthetic multi-line handler nodes often start on a blank line
      const arr = this.getLines(rf) ?? [];
      for (let ln = line; ln <= Math.min(spanTo, arr.length); ln++) {
        if (arr[ln - 1].trim()) return this.markAndWindow(arr[ln - 1], null, null).trim() || null;
      }
    }
    return code || null;
  }
}

/* ------------------------------------------------------------------ */
/* model                                                              */
/* ------------------------------------------------------------------ */
interface SiteModel {
  file: string;
  loc: string;
  line: number;
  col: [number, number];
  spansTo: number | null;
  code: string | null;
}

interface StepModel {
  n: number;
  file: string;
  line: number;
  ops: string[];
  code: string | null;
  spansTo?: number;
  crossContextHop?: string | string[];
}

interface FlowModel {
  id: number;
  file: string;
  frame: string | null;
  constraint: unknown;
  source: (SiteModel & { kind: string; remark: string | null }) | null;
  sinks: Array<SiteModel & { kind: string; remark: string | null; [k: string]: unknown }>;
  sanitized: boolean;
  duplicatePaths: number;
  propagation: { rawSteps: number; distinctLines: number; steps: StepModel[] };
}

export interface ReportModel {
  extensionId: string;
  extensionVersion?: string;
  sourceType: string;
  stats: {
    filesWithIssues: number;
    totalFiles: number;
    distinctFlows: number;
    rawIssueEntries: number;
    sinklessSourcesSkipped: number;
  };
  flows: FlowModel[];
}

/* per-line accumulator during propagation condensing */
class LineNode {
  order: number;
  kinds: string[] = [];
  minCol: number | null = null;
  maxCol: number | null = null;
  spanTo: number | null = null;
  messages: string[] = [];
  constructor(public lineNo: number, order: number) {
    this.order = order;
  }
  add(kind: string, remark: string | undefined, loc: Loc) {
    let tag = kind;
    if (remark && kind !== "MESSAGE") tag = `${kind}:${remark}`;
    if (!this.kinds.includes(tag)) this.kinds.push(tag);
    if (!loc.multiline) {
      this.minCol = this.minCol == null ? loc.c1 : Math.min(this.minCol, loc.c1);
      this.maxCol = this.maxCol == null ? loc.c2 : Math.max(this.maxCol, loc.c2);
    } else {
      this.spanTo = this.spanTo == null ? loc.l2 : Math.max(this.spanTo, loc.l2);
    }
    if (kind === "MESSAGE" && remark && !this.messages.includes(remark)) {
      this.messages.push(remark);
    }
  }
}

function uniqueChain(flow: any[]): LineNode[] {
  const nodes = new Map<number, LineNode>();
  let order = 0;
  for (const f of flow) {
    if (!f || f.kind === "...") continue;
    const loc = parseLoc(f.loc);
    if (!loc) continue;
    let node = nodes.get(loc.l1);
    if (!node) {
      node = new LineNode(loc.l1, order++);
      nodes.set(loc.l1, node);
    }
    node.add(f.kind, f.remark, loc);
  }
  return [...nodes.values()].sort((a, b) => a.order - b.order);
}

/* a deduplicated issue accumulated across contexts */
interface AccIssue {
  file: string;
  frame: string;
  constraint: string;
  sourceKind: string;
  sourceRemark: string;
  sourceLoc: string;
  flow: any[];
  totalSteps: number | null;
  sinks: any[];
  sinkKeys: Set<string>;
  sanitized: boolean;
  dupCount: number;
}

function constraintValue(raw: any): unknown {
  if (raw == null || raw === "") return null;
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function locSite(resolver: SourceResolver, issueFile: string, loc: Loc | null): SiteModel | null {
  if (!loc) return null;
  const colNeed = loc.multiline ? loc.c1 : loc.c2;
  const rf = resolver.resolveFile(issueFile, loc.l1, colNeed);
  return {
    file: rf,
    loc: loc.raw,
    line: loc.l1,
    col: [loc.c1, loc.c2],
    spansTo: loc.multiline ? loc.l2 : null,
    code: resolver.compactCode(rf, loc.l1, loc.c1, loc.c2, loc.multiline ? loc.l2 : null),
  };
}

function buildFlow(acc: AccIssue, resolver: SourceResolver, seq: number): FlowModel {
  const sourceLoc = parseLoc(acc.sourceLoc);
  const srcSite = locSite(resolver, acc.file, sourceLoc);
  const source = srcSite
    ? { kind: acc.sourceKind, remark: acc.sourceRemark || null, ...srcSite }
    : null;

  const sinks = acc.sinks.map((sk) => {
    const loc = parseLoc(sk.loc);
    const site = loc ? locSite(resolver, sk.file ?? acc.file, loc) : null;
    const out: any = {
      kind: sk.kind,
      remark: sk.remark || null,
      ...(site ?? {}),
    };
    if (sk.urlTaintControl) out.urlControl = sk.urlTaintControl;
    if (sk.frame) out.frame = sk.frame;
    if (sk.frameConstraint) out.constraint = sk.frameConstraint;
    return out;
  });

  const chain = uniqueChain(acc.flow);
  const steps: StepModel[] = chain.map((node, i) => {
    const colNeed = node.spanTo ? node.minCol : node.maxCol;
    const rf = resolver.resolveFile(acc.file, node.lineNo, colNeed);
    const step: StepModel = {
      n: i + 1,
      file: rf,
      line: node.lineNo,
      ops: [...node.kinds],
      code: resolver.compactCode(rf, node.lineNo, node.minCol ?? 0, node.maxCol ?? 0, node.spanTo),
    };
    if (node.spanTo) step.spansTo = node.spanTo;
    if (node.messages.length) {
      step.crossContextHop = node.messages.length === 1 ? node.messages[0] : node.messages;
    }
    return step;
  });

  const total = acc.totalSteps != null ? acc.totalSteps : acc.flow.length;
  return {
    id: seq,
    file: acc.file,
    frame: acc.frame || null,
    constraint: constraintValue(acc.constraint),
    source,
    sinks,
    sanitized: acc.sanitized,
    duplicatePaths: acc.dupCount,
    propagation: { rawSteps: total, distinctLines: chain.length, steps },
  };
}

/* ------------------------------------------------------------------ */
/* public API                                                        */
/* ------------------------------------------------------------------ */
export interface BuildModelInput {
  reports: any[]; // taintManager.generateGlobalReport({ level: "detailed" })
  sources: ScriptSource[];
  extensionId: string;
  extensionVersion?: string;
  sourceType: string;
  onlyWithSinks: boolean;
}

export function buildReportModel(input: BuildModelInput): ReportModel {
  const resolver = new SourceResolver(input.sources);

  // Dedup issues by (file, sourceKind, sourceRemark, sourceLoc) across every
  // context, unioning their sinks and counting collapsed duplicates.
  const reps = new Map<string, AccIssue>();
  const order: AccIssue[] = [];
  let filesWithIssues = 0;

  for (const rep of input.reports) {
    const issues = rep.issues ?? [];
    if (issues.length) filesWithIssues++;
    for (const issue of issues) {
      const src = issue.source ?? {};
      const file = src.file ?? rep.filename ?? "";
      const key = `${file}|${src.kind}|${src.remark ?? ""}|${src.loc ?? ""}`;
      let acc = reps.get(key);
      if (!acc) {
        acc = {
          file,
          frame: src.frame ?? rep.fileFrame ?? "",
          constraint: src.frameConstraint ?? rep.fileFrameConstraint ?? "",
          sourceKind: src.kind ?? "",
          sourceRemark: src.remark ?? "",
          sourceLoc: src.loc ?? "",
          flow: issue.flow ?? [],
          totalSteps: issue.flowMeta?.totalSteps ?? null,
          sinks: [],
          sinkKeys: new Set<string>(),
          sanitized: !!issue.sanitized,
          dupCount: 1,
        };
        reps.set(key, acc);
        order.push(acc);
      } else {
        acc.dupCount++;
        acc.sanitized = acc.sanitized || !!issue.sanitized;
      }
      for (const sk of issue.sinks ?? []) {
        const sinkKey = `${sk.kind}|${sk.loc}|${sk.file ?? file}|${sk.remark ?? ""}`;
        if (!acc.sinkKeys.has(sinkKey)) {
          acc.sinkKeys.add(sinkKey);
          acc.sinks.push(sk);
        }
      }
    }
  }

  const flows: FlowModel[] = [];
  let sinklessSkipped = 0;
  let seq = 0;
  for (const acc of order) {
    if (acc.sinks.length === 0 && input.onlyWithSinks) {
      sinklessSkipped++;
      continue;
    }
    flows.push(buildFlow(acc, resolver, ++seq));
  }

  return {
    extensionId: input.extensionId,
    extensionVersion: input.extensionVersion,
    sourceType: input.sourceType,
    stats: {
      filesWithIssues,
      totalFiles: input.reports.length,
      distinctFlows: flows.length,
      rawIssueEntries: flows.reduce((a, f) => a + f.duplicatePaths, 0),
      sinklessSourcesSkipped: sinklessSkipped,
    },
    flows,
  };
}

/* ------------------------------------------------------------------ */
/* markdown rendering                                                 */
/* ------------------------------------------------------------------ */
function siteMd(site: SiteModel | null): string {
  if (!site) return "_(unresolved)_";
  const span = site.spansTo ? ` (spans to L${site.spansTo})` : "";
  const code = site.code ? `  \`${site.code}\`` : "  _(source not found)_";
  return `\`${site.file}\` ${site.loc}${span}${code}`;
}

function flowMd(flow: FlowModel): string {
  const out: string[] = [];
  const src = flow.source;
  const remark = src?.remark ? ` (${src.remark})` : "";
  const dup = flow.duplicatePaths > 1 ? `  ·  ${flow.duplicatePaths}× duplicate paths collapsed` : "";
  out.push(`## Flow #${flow.id} — ${src?.kind ?? "?"}${remark}${dup}`);
  out.push("");
  out.push(`- **Source**: \`${src?.kind ?? "?"}\` — ${siteMd(flow.source)}`);
  if (flow.sinks.length) {
    out.push("- **Sink(s)**:");
    for (const sk of flow.sinks) {
      const tags: string[] = [];
      if (sk.urlControl) tags.push(`url-control=${sk.urlControl}`);
      const tag = tags.length ? `  (${tags.join(", ")})` : "";
      const rk = sk.remark ? ` (${sk.remark})` : "";
      out.push(`  - \`${sk.kind}\`${rk} — ${siteMd(sk as SiteModel)}${tag}`);
    }
  } else {
    out.push("- **Sink(s)**: _(none recorded)_");
  }
  out.push(`- **Sanitized**: ${flow.sanitized ? "YES" : "NO"}`);
  if (flow.frame) out.push(`- **Frame**: \`${flow.frame}\``);

  const prop = flow.propagation;
  out.push("");
  out.push(`- **Propagation** (${prop.rawSteps} raw steps → ${prop.distinctLines} distinct lines):`);
  for (const st of prop.steps) {
    const fnote = st.file === flow.file ? "" : ` _(in \`${st.file}\`)_`;
    const span = st.spansTo ? ` (→L${st.spansTo})` : "";
    const code = st.code ?? "(source not found)";
    out.push(`  ${String(st.n).padStart(2)}. L${st.line}${span}${fnote} \`${code}\`  · ${st.ops.join(", ")}`);
    if (st.crossContextHop) {
      const hop = typeof st.crossContextHop === "string" ? st.crossContextHop : st.crossContextHop.join("; ");
      out.push(`      ⇄ cross-context hop: \`${hop}\``);
    }
  }
  out.push("");
  out.push("---");
  out.push("");
  return out.join("\n");
}

export function renderModelMarkdown(model: ReportModel): string {
  const out: string[] = [];
  const s = model.stats;
  out.push(`# Source-level Taint Flow — ${model.extensionId} ${model.extensionVersion ?? ""}`.trimEnd());
  out.push("");
  out.push(`- Source type: ${model.sourceType}`);
  out.push(`- Files with issues: ${s.filesWithIssues} / ${s.totalFiles}`);
  out.push(`- Distinct taint flows: ${s.distinctFlows}  (collapsed from ${s.rawIssueEntries} raw issue entries)`);
  if (s.sinklessSourcesSkipped) {
    out.push(`- Sinkless sources skipped: ${s.sinklessSourcesSkipped} (sources that reach no sink)`);
  }
  out.push("");
  out.push(
    "> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; " +
      "propagation lists every distinct source line once, in flow order, one line " +
      "per step. Long minified lines are windowed around the tainted span. See " +
      "`report.flows.json` for the machine form.",
  );
  out.push("");
  out.push("---");
  out.push("");
  if (model.flows.length === 0) {
    out.push("_No actionable taint flows._");
    out.push("");
  }
  for (const flow of model.flows) out.push(flowMd(flow));
  return out.join("\n");
}

export function renderModelJson(model: ReportModel): string {
  return JSON.stringify(model, null, 2);
}
