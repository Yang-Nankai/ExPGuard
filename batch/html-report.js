"use strict";
/**
 * HTML report generator for batch analysis results
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtmlReport = generateHtmlReport;
/**
 * Generate an HTML visualization report from statistics
 */
function generateHtmlReport(stats) {
    const { summary, taintTypes, extensionsWithReports, errors } = stats;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ExPGuard Batch Analysis Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 40px;
    }
    header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }
    header p {
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 40px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .summary-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      border-left: 4px solid #667eea;
    }
    .summary-card.success {
      border-left-color: #28a745;
    }
    .summary-card.warning {
      border-left-color: #ffc107;
    }
    .summary-card.error {
      border-left-color: #dc3545;
    }
    .summary-card h3 {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .summary-card .value {
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
    .section {
      margin-bottom: 40px;
    }
    .section h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    thead {
      background: #667eea;
      color: white;
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
    }
    th {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.5px;
    }
    tbody tr {
      border-bottom: 1px solid #e9ecef;
    }
    tbody tr:hover {
      background: #f8f9fa;
    }
    tbody tr:last-child {
      border-bottom: none;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .badge-success {
      background: #d4edda;
      color: #155724;
    }
    .badge-warning {
      background: #fff3cd;
      color: #856404;
    }
    .badge-danger {
      background: #f8d7da;
      color: #721c24;
    }
    .badge-info {
      background: #d1ecf1;
      color: #0c5460;
    }
    .chart-bar {
      background: #e9ecef;
      height: 24px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    .chart-bar-fill {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 8px;
      color: white;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }
    .extension-list {
      margin-top: 10px;
      padding-left: 20px;
      font-size: 13px;
      color: #666;
    }
    .extension-list li {
      margin: 4px 0;
    }
    .error-message {
      font-family: "Courier New", monospace;
      font-size: 12px;
      background: #f8f9fa;
      padding: 8px;
      border-radius: 4px;
      margin-top: 4px;
      color: #721c24;
      word-break: break-word;
    }
    .timestamp {
      text-align: center;
      color: #999;
      font-size: 14px;
      padding: 20px;
      border-top: 1px solid #e9ecef;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🛡️ ExPGuard Batch Analysis Report</h1>
      <p>Comprehensive security analysis of browser extensions</p>
    </header>

    <div class="content">
      <!-- Summary Cards -->
      <div class="summary-grid">
        <div class="summary-card">
          <h3>Total Extensions</h3>
          <div class="value">${summary.totalExtensions}</div>
        </div>
        <div class="summary-card warning">
          <h3>With Findings</h3>
          <div class="value">${summary.extensionsWithFindings}</div>
        </div>
        <div class="summary-card error">
          <h3>With Errors</h3>
          <div class="value">${summary.extensionsWithErrors}</div>
        </div>
        <div class="summary-card success">
          <h3>Total Findings</h3>
          <div class="value">${summary.totalFindings}</div>
        </div>
        <div class="summary-card">
          <h3>Total Duration</h3>
          <div class="value">${(summary.totalDurationMs / 1000).toFixed(1)}s</div>
        </div>
        <div class="summary-card">
          <h3>Avg Duration</h3>
          <div class="value">${(summary.avgDurationMs / 1000).toFixed(1)}s</div>
        </div>
      </div>

      <!-- Taint Types Section -->
      ${taintTypes.length > 0
        ? `
      <div class="section">
        <h2>📊 Taint Type Distribution</h2>
        <table>
          <thead>
            <tr>
              <th>Taint Type</th>
              <th>Count</th>
              <th>Distribution</th>
              <th>Affected Extensions</th>
            </tr>
          </thead>
          <tbody>
            ${taintTypes
            .map((tt) => {
            var _a;
            const maxCount = ((_a = taintTypes[0]) === null || _a === void 0 ? void 0 : _a.count) || 1;
            const percentage = (tt.count / maxCount) * 100;
            return `
            <tr>
              <td><span class="badge badge-info">${tt.type}</span></td>
              <td><strong>${tt.count}</strong></td>
              <td>
                <div class="chart-bar">
                  <div class="chart-bar-fill" style="width: ${percentage}%">
                    ${tt.count}
                  </div>
                </div>
              </td>
              <td>${tt.extensions.length} extension(s)</td>
            </tr>
            `;
        })
            .join("")}
          </tbody>
        </table>
      </div>
      `
        : ""}

      <!-- Extensions with Reports Section -->
      ${extensionsWithReports.length > 0
        ? `
      <div class="section">
        <h2>🔍 Extensions with Security Findings</h2>
        <table>
          <thead>
            <tr>
              <th>Extension ID</th>
              <th>Version</th>
              <th>Findings</th>
              <th>Flow Types</th>
              <th>Duration</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            ${extensionsWithReports
            .map((ext) => {
            const flowTypesList = Object.entries(ext.flowTypes)
                .map(([type, count]) => `${type}: ${count}`)
                .join(", ");
            return `
            <tr>
              <td><code>${ext.extensionId}</code></td>
              <td>${ext.extensionVersion || "N/A"}</td>
              <td><span class="badge badge-warning">${ext.findings}</span></td>
              <td><small>${flowTypesList}</small></td>
              <td>${(ext.durationMs / 1000).toFixed(1)}s</td>
              <td><code>${ext.outputDir}</code></td>
            </tr>
            `;
        })
            .join("")}
          </tbody>
        </table>
      </div>
      `
        : `
      <div class="section">
        <h2>🔍 Extensions with Security Findings</h2>
        <p style="color: #666; text-align: center; padding: 40px;">
          No security findings detected across all analyzed extensions.
        </p>
      </div>
      `}

      <!-- Errors Section -->
      ${errors.length > 0
        ? `
      <div class="section">
        <h2>⚠️ Analysis Errors</h2>
        <table>
          <thead>
            <tr>
              <th>Extension ID</th>
              <th>Version</th>
              <th>Error Type</th>
              <th>Error Message</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            ${errors
            .map((err) => `
            <tr>
              <td><code>${err.extensionId}</code></td>
              <td>${err.extensionVersion || "N/A"}</td>
              <td><span class="badge badge-danger">${err.errorType}</span></td>
              <td>
                <div class="error-message">${escapeHtml(err.errorMessage)}</div>
              </td>
              <td><code>${err.outputDir}</code></td>
            </tr>
            `)
            .join("")}
          </tbody>
        </table>
      </div>
      `
        : ""}
    </div>

    <div class="timestamp">
      Generated on ${new Date().toLocaleString()} by ExPGuard Batch Analyzer
    </div>
  </div>
</body>
</html>`;
    return html;
}
function escapeHtml(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
