// feishuCards.ts
//
// Builders for the Feishu interactive cards used by batch mode. Kept separate
// from the transport (feishu.ts) so the card JSON is pure and unit-testable.
//
// Card design:
//   - A progress card shows a unicode progress bar, X/N completed, the current
//     extension, and running tallies (findings, errors). Re-sent on each step
//     so the chat shows live movement.
//   - A summary card shows the final per-extension table and totals, colored by
//     outcome (green all-clear / orange findings / red errors).

import type { RunResult } from "../run";

export interface BatchProgress {
  total: number;
  completed: number;
  current?: string; // extension id / input currently running
  findings: number; // cumulative findings so far
  errors: number; // cumulative errored extensions
  startedAtMs: number;
  nowMs: number;
}

const BAR_WIDTH = 20;

function progressBar(done: number, total: number): string {
  if (total <= 0) return "".padEnd(BAR_WIDTH, "░");
  const filled = Math.round((done / total) * BAR_WIDTH);
  return "█".repeat(filled) + "░".repeat(BAR_WIDTH - filled);
}

function pct(done: number, total: number): string {
  if (total <= 0) return "0%";
  return `${Math.round((done / total) * 100)}%`;
}

function fmtDuration(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m${String(s % 60).padStart(2, "0")}s`;
}

/** Header color theme by batch health. */
function themeFor(errors: number, findings: number): string {
  if (errors > 0) return "red";
  if (findings > 0) return "orange";
  return "green";
}

function markdownEl(content: string) {
  return { tag: "div", text: { tag: "lark_md", content } };
}

/** A live-progress card, re-sent as each extension completes. */
export function buildProgressCard(p: BatchProgress): Record<string, unknown> {
  const bar = progressBar(p.completed, p.total);
  const elapsed = fmtDuration(p.nowMs - p.startedAtMs);

  const lines = [
    `**\`${bar}\`** ${pct(p.completed, p.total)}  (${p.completed}/${p.total})`,
    "",
    `🔎 Findings so far: **${p.findings}**` +
      (p.errors > 0 ? `   ⚠️ Errors: **${p.errors}**` : ""),
    `⏱️ Elapsed: ${elapsed}`,
  ];
  if (p.current) {
    lines.push("", `▶️ Analyzing: \`${escapeMd(p.current)}\``);
  }

  return {
    config: { wide_screen_mode: true },
    header: {
      template: themeFor(p.errors, p.findings),
      title: { tag: "plain_text", content: "ExPGuard — Batch Analysis (running)" },
    },
    elements: [markdownEl(lines.join("\n"))],
  };
}

/** The final summary card with a per-extension breakdown. */
export function buildSummaryCard(
  results: RunResult[],
  startedAtMs: number,
  endedAtMs: number,
): Record<string, unknown> {
  const total = results.length;
  const errored = results.filter((r) => r.status === "error").length;
  const totalFindings = results.reduce((a, r) => a + (r.findings || 0), 0);
  const withFindings = results.filter((r) => (r.findings || 0) > 0).length;

  // Aggregate flow-type totals across the batch.
  const flowTotals: Record<string, number> = {};
  for (const r of results) {
    for (const [k, v] of Object.entries(r.flowTypeCounts || {})) {
      flowTotals[k] = (flowTotals[k] ?? 0) + v;
    }
  }
  const flowSummary =
    Object.entries(flowTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}: **${v}**`)
      .join("　") || "none";

  const headLines = [
    `📦 Extensions: **${total}**　✅ clean: **${total - withFindings - errored}**` +
      `　🔎 with findings: **${withFindings}**　⚠️ errors: **${errored}**`,
    `🧮 Total findings: **${totalFindings}**`,
    `🏷️ ${flowSummary}`,
    `⏱️ Total time: ${fmtDuration(endedAtMs - startedAtMs)}`,
  ];

  // Per-extension rows (cap to keep the card within Feishu limits).
  const MAX_ROWS = 30;
  const rows = results.slice(0, MAX_ROWS).map((r) => {
    const name = escapeMd(r.extensionId || r.input);
    const icon = r.status === "error" ? "⚠️" : r.findings > 0 ? "🔴" : "🟢";
    const cov =
      r.nodeCoverage != null
        ? ` · cov ${Math.round(r.nodeCoverage * 100)}%`
        : "";
    const detail =
      r.status === "error"
        ? ` · ${escapeMd(r.errorType || "error")}`
        : ` · ${r.findings} finding${r.findings === 1 ? "" : "s"}${cov}`;
    return `${icon} \`${name}\`${detail}`;
  });
  if (results.length > MAX_ROWS) {
    rows.push(`… and ${results.length - MAX_ROWS} more`);
  }

  return {
    config: { wide_screen_mode: true },
    header: {
      template: themeFor(errored, totalFindings),
      title: { tag: "plain_text", content: "ExPGuard — Batch Analysis (done)" },
    },
    elements: [
      markdownEl(headLines.join("\n")),
      { tag: "hr" },
      markdownEl(rows.join("\n") || "_no extensions_"),
    ],
  };
}

/** Escape Feishu lark_md control characters in interpolated values. */
function escapeMd(s: string): string {
  return String(s).replace(/[\\`*_~]/g, (m) => "\\" + m);
}
