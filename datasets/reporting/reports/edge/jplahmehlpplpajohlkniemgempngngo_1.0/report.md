# Security Vulnerability Report: Critical Arbitrary File Download in Image Downloader Manager [IDM] Double Click Downloader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Image Downloader Manager [IDM] Double Click Downloader** (edge, extension ID `jplahmehlpplpajohlkniemgempngngo`, version `1.0`).
The recorded issue type(s): **Arbitrary File Download**.

## Affected Extension Details

- Name: Image Downloader Manager [IDM] Double Click Downloader
- Platform: edge
- Extension ID: `jplahmehlpplpajohlkniemgempngngo`
- Dataset version: `1.0`
- Store version at review: `1.0`
- Users: 2936
- Analysis tools: CoCo

## Findings

### Finding 1: Arbitrary File Download

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (CoCo source evidence) in content.js at L15:C1 -> L15:C1 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` (CoCo sink evidence) in background.js at L13:C1 -> L13:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0ae79479ca14a3e0`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (CoCo source evidence) in content.js at L15:C1 -> L15:C1
- Sink: `CHROME_DOWNLOADS_OPTIONS` (CoCo sink evidence) in background.js at L13:C1 -> L13:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/static/static_report.json`; dynamic report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/dynamic/dynamic_report.json`.

### Finding 2: Arbitrary File Download

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (CoCo source evidence) in content.js at L15:C1 -> L15:C1 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` (CoCo sink evidence) in content.js at L17:C1 -> L17:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-31224a1da258c447`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (CoCo source evidence) in content.js at L15:C1 -> L15:C1
- Sink: `CHROME_DOWNLOADS_OPTIONS` (CoCo sink evidence) in content.js at L17:C1 -> L17:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/static/static_report.json`; dynamic report `extensions/jplahmehlpplpajohlkniemgempngngo_1.0/dynamic/dynamic_report.json`.


## Recommendations

1. Restrict download URLs and filenames, and require a visible user gesture before starting downloads.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
