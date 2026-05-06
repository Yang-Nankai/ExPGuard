// report.ts
function padRight(str: string, len: number) {
  return str.length >= len ? str : str + " ".repeat(len - str.length);
}

export function printTaintReportCLI(report: any): string {
  let output = "";
  const writeLine = (line: string = "") => {
    output += line + "\n";
  };

  if (!report) {
    writeLine("✓ No taint issues found.");
    return output;
  }

  const line = "═".repeat(46);

  writeLine(line);
  writeLine(`TAINT REPORT  ${report.filename || "[global]"}`);
  if (report.fileFrame) {
    writeLine(`FRAME        ${report.fileFrame}`);
  }
  if (report.fileFrameConstraint) {
    writeLine(`CONSTRAINT   ${JSON.stringify(report.fileFrameConstraint)}`);
  }
  writeLine(line);
  writeLine();

  const issues = report.issues || [];

  if (issues.length === 0) {
    writeLine("✓ No issues in this file.");
  }

  issues.forEach((issue: any, idx: number) => {
    writeLine(`[!] Issue #${idx + 1}`);
    writeLine(` ├─ Source     : ${issue.source.kind}`);
    writeLine(` ├─ Remark     : ${issue.source.remark ?? ""}`);
    writeLine(` │  Location   : ${issue.source.loc}`);
    writeLine(` │  File       : ${issue.source.file ?? report.filename}`);
    if (issue.source.frame) {
      writeLine(` │  Frame      : ${issue.source.frame}`);
    }
    if (issue.source.frameConstraint) {
      writeLine(
        ` │  Constraint : ${JSON.stringify(issue.source.frameConstraint)}`,
      );
    }
    writeLine(" │");

    /* ---------------- Propagation ---------------- */

    const flow = issue.flow || [];
    const meta = issue.flowMeta;

    const hasFlow = flow.length > 0;
    const hasEllipsisNode = flow.some((f: any) => f.kind === "...");
    const hasMetaOmitted = meta?.omitted && meta.omitted > 0;

    if (hasFlow || hasMetaOmitted) {
      writeLine(" ├─ Propagation:");

      // 1. Print explicit flow nodes
      flow.forEach((f: any) => {
        if (f.kind === "...") {
          writeLine(` │   ${padRight("...", 10)}`);
          return;
        }

        const remark = f.remark ? ` (${f.remark})` : "";
        writeLine(` │   ${padRight(f.kind, 10)} @ ${f.loc}${remark}`);
      });

      // 2. Print omitted steps ONLY if no ellipsis node exists
      if (!hasEllipsisNode && hasMetaOmitted) {
        writeLine(` │   ... (${meta.omitted} steps omitted)`);
      }

      // 3. Always print total steps if available
      if (meta?.totalSteps != null) {
        writeLine(` │   (total steps: ${meta.totalSteps})`);
      }

      writeLine(" │");
    }

    /* ---------------- Sinks ---------------- */

    writeLine(" ├─ Sink(s):");
    issue.sinks.forEach((s: any) => {
      const remark = s.remark ? ` (${s.remark})` : "";
      writeLine(
        ` │   - ${padRight(s.kind, 10)} @ ${s.loc}${remark}  [file: ${
          s.file ?? report.filename
        }]`,
      );
      if (s.urlTaintControl) {
        writeLine(` │     url-control: ${s.urlTaintControl}`);
      }
      if (s.frame) {
        writeLine(` │     frame: ${s.frame}`);
      }
      if (s.frameConstraint) {
        writeLine(` │     constraint: ${JSON.stringify(s.frameConstraint)}`);
      }
    });
    writeLine(" │");

    writeLine(` └─ Sanitized : ${issue.sanitized ? "YES" : "NO"}`);
    writeLine();
  });

  /* ---------------- TEMP SINKS ---------------- */

  if (report.tempSinks && report.tempSinks.length > 0) {
    writeLine("[!] TEMP SINKS (AST-ONLY, NON-TAINT)");
    report.tempSinks.forEach((s: any) => {
      writeLine(` ├─ ${padRight(s.callee, 14)} @ ${s.loc}`);
    });
    writeLine();
  }

  /* ---------------- Summary ---------------- */

  writeLine("Summary:");
  writeLine(`  File            : ${report.filename || "[global]"}`);
  writeLine(
    `  Issues          : ${report.totalIssues ?? issues.length}`,
  );
  writeLine(line);

  return output;
}

export function printTaintReportsCLI(reports: Iterable<any>): string {
  let output = "";

  for (const report of reports) {
    output += printTaintReportCLI(report);
    output += "\n";
  }

  return output;
}
