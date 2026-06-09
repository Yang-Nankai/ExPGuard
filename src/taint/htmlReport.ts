// htmlReport.ts
//
// Renders a single self-contained HTML report for ONE analyzed extension.
// Zero external dependencies (no CDN, no bundler) — the output is one file you
// can open offline. It combines three already-available data sources:
//
//   1. taintManager.generateGlobalReport({ includeCode: true })
//        -> per-file reports; each issue carries the full propagation chain
//           (flow[]) plus highlighted code snippets for source / steps / sink.
//   2. taintManager.getGlobalSummary().flows
//        -> flat findings with classification (flowType, ruleId, severity,
//           message/storage passing).
//   3. extensionContext (manifest, baseDir, getScriptsSummary())
//        -> the extension's folder structure and per-script metadata.
//
// The propagation path is drawn as a vertical step timeline with code snippets,
// not a node graph, so it stays dependency-free and prints/exports cleanly.

import fs from "fs";
import path from "path";

/* =========================================================================
 * Types
 * ========================================================================= */

export type FileKind =
  | "js"
  | "html"
  | "json"
  | "manifest"
  | "css"
  | "image"
  | "other";

export interface FileNode {
  name: string;
  relPath: string;
  isDir: boolean;
  size?: number;
  kind?: FileKind;
  children?: FileNode[];
}

export interface HtmlReportMeta {
  extensionId?: string;
  extensionVersion?: string;
  sourceType?: string;
  generatedAt?: string;
  durationMs?: number;
}

export interface HtmlReportInput {
  meta: HtmlReportMeta;
  manifest: Record<string, any>;
  files: FileNode[];
  scripts: any[];
  reports: any[];
  flows: any[];
  /** Optional analysis-coverage summary (from computeCoverage). */
  coverage?: any;
}

/* =========================================================================
 * File-tree collection
 * ========================================================================= */

const IGNORED_DIRS = new Set(["node_modules", ".git"]);

function classifyFile(name: string): FileKind {
  if (name === "manifest.json") return "manifest";
  const ext = path.extname(name).toLowerCase();
  switch (ext) {
    case ".js":
    case ".mjs":
    case ".cjs":
    case ".ts":
      return "js";
    case ".html":
    case ".htm":
      return "html";
    case ".json":
      return "json";
    case ".css":
      return "css";
    case ".png":
    case ".jpg":
    case ".jpeg":
    case ".gif":
    case ".svg":
    case ".webp":
    case ".ico":
      return "image";
    default:
      return "other";
  }
}

/**
 * Recursively walk an unpacked extension directory and return a nested file
 * tree. Directories sort before files; both alphabetically. node_modules / .git
 * are skipped. Best-effort: unreadable entries are silently omitted.
 */
export function collectFileTree(baseDir: string): FileNode[] {
  const walk = (dir: string): FileNode[] => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return [];
    }

    const nodes: FileNode[] = [];
    for (const entry of entries) {
      if (entry.isDirectory() && IGNORED_DIRS.has(entry.name)) continue;

      const full = path.join(dir, entry.name);
      const relPath = path.relative(baseDir, full).split(path.sep).join("/");

      if (entry.isDirectory()) {
        nodes.push({
          name: entry.name,
          relPath,
          isDir: true,
          children: walk(full),
        });
      } else if (entry.isFile()) {
        let size: number | undefined;
        try {
          size = fs.statSync(full).size;
        } catch {
          size = undefined;
        }
        nodes.push({
          name: entry.name,
          relPath,
          isDir: false,
          size,
          kind: classifyFile(entry.name),
        });
      }
    }

    nodes.sort((a, b) => {
      if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    return nodes;
  };

  return walk(baseDir);
}

/* =========================================================================
 * Small utilities
 * ========================================================================= */

function escapeHtml(value: unknown): string {
  const s = value == null ? "" : String(value);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatBytes(n?: number): string {
  if (n == null || !Number.isFinite(n)) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * The taint manager highlights the interesting AST region inside a snippet with
 * literal `>>>` / `<<<` markers (see manager._formatCodeSnippet). Escape the
 * whole string first, then turn the (now-escaped) markers into <mark> tags so
 * user code can never inject HTML.
 */
function renderSnippet(code: unknown): string {
  if (code == null || code === "") return "";
  let html = escapeHtml(code);
  html = html.split(">>>").join('<mark class="hl">').split("<<<").join("</mark>");
  return `<pre class="snippet"><code>${html}</code></pre>`;
}

/* =========================================================================
 * Classification labels / colors
 * ========================================================================= */

const FLOW_LABELS: Record<string, string> = {
  PRIVILEGE_ESCALATION: "Privilege Escalation",
  STORAGE_POSOING: "Storage Poisoning",
  DOM_XSS: "DOM XSS",
  REQUEST_FORGERY: "Request Forgery",
  CODE_INJECTION: "Code Injection",
  DATA_LEAK: "Data Leak",
  DOM_DATA_LEAK: "DOM Data Leak",
};

const SEVERITY_ORDER: Record<string, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

/* =========================================================================
 * Flow index — join per-file issues with classified summary flows
 * ========================================================================= */

/**
 * Build a lookup from the flat summary flows so a per-file issue's
 * (sourceType, sourceLoc, sinkType, sinkLoc) can be enriched with its
 * flowType / ruleId / severity. `loc` in reports is "line:col" while summary
 * stores file + loc separately; we key on the tuple that both share.
 */
function indexFlows(flows: any[]): Map<string, any[]> {
  const idx = new Map<string, any[]>();
  for (const f of flows || []) {
    const key = `${f.sourceType}|${f.sourceLoc}|${f.sinkType}|${f.sinkLoc}`;
    if (!idx.has(key)) idx.set(key, []);
    idx.get(key)!.push(f);
  }
  return idx;
}

function lookupFlows(
  idx: Map<string, any[]>,
  sourceKind: string,
  sourceLoc: string,
  sinkKind: string,
  sinkLoc: string,
): any[] {
  return idx.get(`${sourceKind}|${sourceLoc}|${sinkKind}|${sinkLoc}`) ?? [];
}

/* =========================================================================
 * Renderers
 * ========================================================================= */

function frameFamily(frame?: string): string {
  if (!frame) return "UNKNOWN";
  const m = /^([A-Z]+)_/.exec(frame);
  return m ? m[1] : frame;
}

function renderFileTree(nodes: FileNode[], taintedFiles: Set<string>): string {
  const renderNodes = (list: FileNode[]): string => {
    let out = '<ul class="tree">';
    for (const node of list) {
      if (node.isDir) {
        out += `<li><details open><summary class="dir">📁 ${escapeHtml(
          node.name,
        )}</summary>${renderNodes(node.children ?? [])}</details></li>`;
      } else {
        const tainted = taintedFiles.has(node.relPath);
        const dot = tainted ? '<span class="dot" title="has findings"></span>' : "";
        const sz = node.size != null ? `<span class="sz">${formatBytes(node.size)}</span>` : "";
        out += `<li class="file kind-${node.kind ?? "other"}" data-path="${escapeHtml(
          node.relPath,
        )}"><span class="fname">${escapeHtml(node.name)}</span>${dot}${sz}</li>`;
      }
    }
    out += "</ul>";
    return out;
  };
  if (!nodes.length) return '<p class="muted">No files.</p>';
  return renderNodes(nodes);
}

function renderScriptsTable(scripts: any[], coverage?: any): string {
  if (!scripts || !scripts.length) return "";

  // Index per-script coverage so each row can show its node coverage. The
  // scripts summary keys on relativePath (e.g. "bg/index.js") while coverage
  // keys on the script key (often extension-less, e.g. "bg/index"); match by
  // normalizing both to a no-extension form.
  const covByKey = new Map<string, any>();
  const norm = (k: string) => String(k).replace(/\.[cm]?js$/i, "");
  for (const c of coverage?.scripts ?? []) {
    covByKey.set(norm(c.file), c);
  }

  const hasCov = covByKey.size > 0;
  let rows = "";
  for (const s of scripts) {
    const fam = frameFamily(s.frame);
    const c = covByKey.get(norm(s.file));
    const covCell = hasCov
      ? `<td>${
          c ? `${(c.nodeCoverage * 100).toFixed(0)}%` : "—"
        }</td>`
      : "";
    rows += `<tr>
      <td class="mono">${escapeHtml(s.file)}</td>
      <td><span class="badge fam-${fam}">${escapeHtml(s.frame ?? "—")}</span></td>
      <td>${formatBytes(s.size)}</td>
      ${covCell}
    </tr>`;
  }
  const covHead = hasCov ? "<th>Coverage</th>" : "";
  return `<table class="scripts">
    <thead><tr><th>Script</th><th>Frame</th><th>Size</th>${covHead}</tr></thead>
    <tbody>${rows}</tbody></table>`;
}

function renderStep(
  marker: string,
  kind: string,
  loc: string,
  file: string | undefined,
  remark: string | undefined,
  code: unknown,
  extraBadges = "",
): string {
  const remarkHtml = remark ? ` · <span class="remark">${escapeHtml(remark)}</span>` : "";
  const fileHtml = file ? `<span class="stepfile">${escapeHtml(file)}</span>` : "";
  return `<li class="step">
    <span class="dotmark ${marker}"></span>
    <div class="stepbody">
      <div class="stephead"><span class="kind">${escapeHtml(kind)}</span>
        <span class="loc">${escapeHtml(loc)}</span>${remarkHtml}${extraBadges}</div>
      ${fileHtml}
      ${renderSnippet(code)}
    </div>
  </li>`;
}

function renderIssue(issue: any, report: any, flowIdx: Map<string, any[]>): string {
  const src = issue.source ?? {};
  const sinks: any[] = issue.sinks ?? [];
  const flow: any[] = issue.flow ?? [];
  const meta = issue.flowMeta ?? {};

  // Enrich with classification from the summary flows (use the first sink as
  // the representative pairing; collect all matched flowTypes for the badges).
  const matchedFlows: any[] = [];
  for (const sink of sinks) {
    matchedFlows.push(
      ...lookupFlows(flowIdx, src.kind, src.loc, sink.kind, sink.loc),
    );
  }
  const flowTypes = Array.from(new Set(matchedFlows.map((f) => f.flowType)));
  const severity =
    matchedFlows
      .map((f) => f.severity)
      .filter(Boolean)
      .sort((a, b) => (SEVERITY_ORDER[b] ?? 0) - (SEVERITY_ORDER[a] ?? 0))[0] ?? "";
  const ruleDescs = Array.from(
    new Set(matchedFlows.map((f) => f.ruleDescription).filter(Boolean)),
  );

  const dataFlowTypes = (flowTypes.length ? flowTypes : ["UNKNOWN"]).join(" ");
  const dataFile = report.filename ?? "";

  // Title badges
  const flowBadges = (flowTypes.length ? flowTypes : ["UNCLASSIFIED"])
    .map(
      (ft) =>
        `<span class="badge flow flow-${escapeHtml(ft)}">${escapeHtml(
          FLOW_LABELS[ft] ?? ft,
        )}</span>`,
    )
    .join(" ");
  const sevBadge = severity
    ? `<span class="badge sev sev-${escapeHtml(severity)}">${escapeHtml(severity)}</span>`
    : "";

  const sinkKinds = sinks.map((s) => s.kind).join(", ");

  // Cross-context badges from matched flows
  const crossBadges: string[] = [];
  if (matchedFlows.some((f) => f.messagePassing)) {
    const ch = matchedFlows.find((f) => f.messagePassing)?.channel;
    crossBadges.push(
      `<span class="badge cross">message${ch ? ` · ${escapeHtml(ch)}` : ""}</span>`,
    );
  }
  if (matchedFlows.some((f) => f.storagePassing)) {
    const area = matchedFlows.find((f) => f.storagePassing)?.area;
    crossBadges.push(
      `<span class="badge cross">storage${area ? ` · ${escapeHtml(area)}` : ""}</span>`,
    );
  }

  // Propagation timeline: source -> steps -> sinks
  let timeline = '<ul class="timeline">';
  timeline += renderStep(
    "src",
    src.kind ?? "SOURCE",
    src.loc ?? "[unknown]",
    src.file ?? report.filename,
    src.remark,
    src.code,
  );
  for (const step of flow) {
    if (step.kind === "...") {
      timeline += `<li class="step ellipsis"><span class="dotmark mid"></span><div class="stepbody muted">…</div></li>`;
      continue;
    }
    timeline += renderStep(
      "mid",
      step.kind,
      step.loc,
      undefined,
      step.remark,
      step.code,
    );
  }
  if (meta.omitted > 0) {
    timeline += `<li class="step ellipsis"><span class="dotmark mid"></span><div class="stepbody muted">… ${escapeHtml(
      meta.omitted,
    )} steps omitted (total ${escapeHtml(meta.totalSteps)})</div></li>`;
  }
  for (const sink of sinks) {
    const urlBadge = sink.urlTaintControl
      ? `<span class="badge cross">url:${escapeHtml(sink.urlTaintControl)}</span>`
      : "";
    timeline += renderStep(
      "sink",
      sink.kind,
      sink.loc,
      sink.file ?? report.filename,
      sink.remark,
      sink.code,
      urlBadge,
    );
  }
  timeline += "</ul>";

  const descHtml = ruleDescs.length
    ? `<p class="ruledesc">${ruleDescs.map((d) => escapeHtml(d)).join("<br>")}</p>`
    : "";

  return `<article class="issue" data-flowtypes="${escapeHtml(
    dataFlowTypes,
  )}" data-file="${escapeHtml(dataFile)}">
    <header class="issuehead">
      ${flowBadges} ${sevBadge}
      <span class="pair"><code>${escapeHtml(src.kind)}</code> → <code>${escapeHtml(
        sinkKinds,
      )}</code></span>
      ${crossBadges.join(" ")}
      <span class="loc right">${escapeHtml(report.filename)} : ${escapeHtml(src.loc)}</span>
    </header>
    ${descHtml}
    ${timeline}
    <footer class="issuefoot">Sanitized: <b>${issue.sanitized ? "YES" : "NO"}</b></footer>
  </article>`;
}

/* =========================================================================
 * Overview / counts
 * ========================================================================= */

function renderOverview(input: HtmlReportInput, totalIssues: number): string {
  const m = input.manifest ?? {};
  const meta = input.meta ?? {};
  const cov = input.coverage;

  const flowCounts: Record<string, number> = {};
  const sevCounts: Record<string, number> = {};
  for (const f of input.flows ?? []) {
    flowCounts[f.flowType] = (flowCounts[f.flowType] ?? 0) + 1;
    if (f.severity) sevCounts[f.severity] = (sevCounts[f.severity] ?? 0) + 1;
  }

  const flowChips = Object.entries(flowCounts)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([ft, n]) =>
        `<span class="badge flow flow-${escapeHtml(ft)}">${escapeHtml(
          FLOW_LABELS[ft] ?? ft,
        )} · ${n}</span>`,
    )
    .join(" ");
  const sevChips = Object.entries(sevCounts)
    .sort((a, b) => (SEVERITY_ORDER[b[0]] ?? 0) - (SEVERITY_ORDER[a[0]] ?? 0))
    .map(
      ([sv, n]) =>
        `<span class="badge sev sev-${escapeHtml(sv)}">${escapeHtml(sv)} · ${n}</span>`,
    )
    .join(" ");

  const fileCount = (input.scripts ?? []).length;

  const covPct =
    cov && typeof cov.nodeCoverage === "number"
      ? `${(cov.nodeCoverage * 100).toFixed(1)}%`
      : "—";
  const covCard = cov
    ? `<div class="card cov"><div class="num">${escapeHtml(
        covPct,
      )}</div><div class="lbl">Code coverage</div></div>`
    : "";

  return `<section class="overview">
    <h1>${escapeHtml(m.name ?? "Chrome Extension")} <small>v${escapeHtml(
      m.version ?? meta.extensionVersion ?? "?",
    )}</small></h1>
    <p class="muted">${escapeHtml(m.description ?? "")}</p>
    <div class="cards">
      <div class="card"><div class="num">${escapeHtml(fileCount)}</div><div class="lbl">Scripts</div></div>
      <div class="card"><div class="num">${escapeHtml(totalIssues)}</div><div class="lbl">Findings</div></div>
      ${covCard}
      <div class="card"><div class="num">MV${escapeHtml(
        m.manifest_version ?? "?",
      )}</div><div class="lbl">Manifest</div></div>
      <div class="card"><div class="num">${
        meta.durationMs != null ? escapeHtml(Number(meta.durationMs).toFixed(0)) : "—"
      }</div><div class="lbl">Duration (ms)</div></div>
    </div>
    <div class="chips">${flowChips} ${sevChips}</div>
    <div class="meta muted">
      <span>ID: ${escapeHtml(meta.extensionId ?? "—")}</span>
      <span>Source: ${escapeHtml(meta.sourceType ?? "—")}</span>
      <span>Generated: ${escapeHtml(meta.generatedAt ?? "")}</span>
    </div>
  </section>`;
}

/* =========================================================================
 * Main entry
 * ========================================================================= */

export function renderHtmlReport(input: HtmlReportInput): string {
  const reports = input.reports ?? [];
  const flowIdx = indexFlows(input.flows ?? []);

  // Files that contain at least one finding (for the tree red-dot marker).
  const taintedFiles = new Set<string>();
  for (const r of reports) {
    if ((r.issues ?? []).length > 0 && r.filename) taintedFiles.add(r.filename);
  }

  let totalIssues = 0;
  let issuesHtml = "";
  for (const report of reports) {
    const issues = report.issues ?? [];
    for (const issue of issues) {
      totalIssues++;
      issuesHtml += renderIssue(issue, report, flowIdx);
    }
  }
  if (totalIssues === 0) {
    issuesHtml = `<p class="ok">✓ No taint findings.</p>`;
  }

  const overview = renderOverview(input, totalIssues);
  const tree = renderFileTree(input.files ?? [], taintedFiles);
  const scriptsTable = renderScriptsTable(input.scripts ?? [], input.coverage);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ExPGuard Report — ${escapeHtml(input.manifest?.name ?? "extension")}</title>
<style>
${STYLE}
</style>
</head>
<body>
${overview}
<div class="layout">
  <aside class="sidebar">
    <h2>Files</h2>
    ${tree}
    <h2>Scripts</h2>
    ${scriptsTable}
  </aside>
  <main class="main">
    <div class="toolbar">
      <input id="filter" type="search" placeholder="Filter findings by file or flow type…" />
    </div>
    <div id="issues">
      ${issuesHtml}
    </div>
  </main>
</div>
<script>
${SCRIPT}
</script>
</body>
</html>`;
}

/* =========================================================================
 * Inline assets
 * ========================================================================= */

const STYLE = `
:root{--bg:#0f1419;--panel:#161b22;--panel2:#1c2330;--line:#2a3240;--fg:#d6dde6;--muted:#8b97a7;--acc:#4ea1ff}
*{box-sizing:border-box}
body{margin:0;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--bg);color:var(--fg)}
h1{font-size:22px;margin:0 0 4px}h2{font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin:18px 0 8px}
small{color:var(--muted);font-weight:400}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.muted{color:var(--muted)}
.overview{padding:20px 24px;border-bottom:1px solid var(--line);background:var(--panel)}
.cards{display:flex;gap:12px;margin:14px 0}
.card{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:12px 18px;min-width:90px;text-align:center}
.card .num{font-size:22px;font-weight:700}.card .lbl{font-size:11px;color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
.meta{display:flex;gap:18px;font-size:12px;margin-top:8px}
.layout{display:flex;align-items:flex-start}
.sidebar{width:300px;flex:0 0 300px;padding:16px;border-right:1px solid var(--line);height:calc(100vh - 0px);overflow:auto;position:sticky;top:0}
.main{flex:1;padding:16px 24px;min-width:0}
.toolbar{margin-bottom:14px}
#filter{width:100%;padding:9px 12px;border-radius:8px;border:1px solid var(--line);background:var(--panel);color:var(--fg)}
ul.tree{list-style:none;margin:0;padding-left:14px}
ul.tree>li{margin:2px 0}
summary.dir{cursor:pointer;user-select:none}
li.file{display:flex;align-items:center;gap:6px;padding:1px 0}
li.file .fname{color:var(--fg)}
li.kind-manifest .fname{color:#ffd479}
li.kind-html .fname{color:#7ee787}
li.kind-image .fname,li.kind-other .fname{color:var(--muted)}
.dot{width:7px;height:7px;border-radius:50%;background:#f85149;display:inline-block}
.sz{margin-left:auto;font-size:11px;color:var(--muted)}
table.scripts{width:100%;border-collapse:collapse;font-size:12px}
table.scripts th,table.scripts td{text-align:left;padding:4px 6px;border-bottom:1px solid var(--line)}
.mono{font-family:ui-monospace,monospace;word-break:break-all}
.badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;border:1px solid var(--line);background:var(--panel2);color:var(--fg)}
.badge.fam-BG{background:#1f6feb33;border-color:#1f6feb}
.badge.fam-CS{background:#23863633;border-color:#238636}
.badge.fam-EX{background:#8957e533;border-color:#8957e5}
.badge.fam-DT{background:#9e6a0333;border-color:#9e6a03}
.badge.fam-OF{background:#6e768133;border-color:#6e7681}
.badge.flow{background:#1f6feb22;border-color:#1f6feb}
.badge.flow-DATA_LEAK,.badge.flow-DOM_DATA_LEAK{background:#9e6a0333;border-color:#d29922}
.badge.flow-PRIVILEGE_ESCALATION,.badge.flow-CODE_INJECTION{background:#da363322;border-color:#f85149}
.badge.flow-DOM_XSS,.badge.flow-REQUEST_FORGERY{background:#8957e522;border-color:#a371f7}
.badge.sev-CRITICAL{background:#da3633;border-color:#f85149;color:#fff}
.badge.sev-HIGH{background:#bb800933;border-color:#f0883e}
.badge.sev-MEDIUM{background:#9e6a0322;border-color:#d29922}
.badge.sev-LOW{background:#6e768122;border-color:#6e7681}
.badge.cross{background:#1c2b22;border-color:#2ea043}
.issue{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin-bottom:16px}
.issuehead{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.issuehead .pair code{background:var(--panel2);padding:1px 6px;border-radius:5px}
.issuehead .right{margin-left:auto;color:var(--muted);font-size:12px}
.ruledesc{color:var(--muted);margin:8px 0 4px;font-size:13px}
ul.timeline{list-style:none;margin:10px 0 0;padding:0;border-left:2px solid var(--line);margin-left:6px}
li.step{position:relative;padding:4px 0 10px 18px}
.dotmark{position:absolute;left:-7px;top:6px;width:11px;height:11px;border-radius:50%;border:2px solid var(--bg)}
.dotmark.src{background:#2ea043}.dotmark.mid{background:#6e7681}.dotmark.sink{background:#f85149}
.stephead{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
.stephead .kind{font-weight:700;font-size:12px}
.stephead .loc{color:var(--muted);font-size:12px;font-family:ui-monospace,monospace}
.remark{color:var(--acc);font-size:12px}
.stepfile{display:block;color:var(--muted);font-size:11px;margin:1px 0}
pre.snippet{margin:6px 0 0;padding:8px 10px;background:#0b0f14;border:1px solid var(--line);border-radius:6px;overflow:auto;font-size:12px}
pre.snippet mark.hl{background:#f8514955;color:#ffd7d5;border-radius:3px;padding:0 2px}
.issuefoot{margin-top:10px;font-size:12px;color:var(--muted)}
.ok{color:#2ea043;font-size:16px}
.ellipsis .stepbody{font-style:italic}
`;

const SCRIPT = `
(function(){
  var input=document.getElementById('filter');
  if(!input)return;
  var issues=Array.prototype.slice.call(document.querySelectorAll('#issues .issue'));
  function apply(){
    var q=input.value.trim().toLowerCase();
    issues.forEach(function(el){
      var hay=((el.getAttribute('data-file')||'')+' '+(el.getAttribute('data-flowtypes')||'')).toLowerCase();
      el.style.display=(!q||hay.indexOf(q)>=0)?'':'none';
    });
  }
  input.addEventListener('input',apply);
  // Clicking a file in the tree filters findings to that file.
  document.querySelectorAll('.sidebar li.file').forEach(function(li){
    li.addEventListener('click',function(){
      input.value=li.getAttribute('data-path')||'';apply();
      document.getElementById('issues').scrollIntoView({behavior:'smooth'});
    });
    li.style.cursor='pointer';
  });
})();
`;
