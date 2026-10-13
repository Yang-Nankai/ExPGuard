# Security Vulnerability Report: High Sensitive Data Exposure in TwiBlocker - Video AdBlocker

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **TwiBlocker - Video AdBlocker** (chrome, extension ID `mdohdkncgoaamplcaokhmlppgafhlima`, version `1.1.25`).
The recorded issue type(s): **Sensitive Data Exposure**.

## Affected Extension Details

- Name: TwiBlocker - Video AdBlocker
- Platform: chrome
- Extension ID: `mdohdkncgoaamplcaokhmlppgafhlima`
- Dataset version: `1.1.25`
- Store version at review: `1.1.25`
- Users: 80000
- Analysis tools: CoCo, DoubleX

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/cs_header.js at L165:C1 -> L165:C1 to the privileged sink `WINDOW_POSTMESSAGE` (CoCo sink evidence) in content.js at L1:C1 -> L1:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-114dfcad386601f1`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (CoCo source evidence) in crx_headers/cs_header.js at L165:C1 -> L165:C1
- Sink: `WINDOW_POSTMESSAGE` (CoCo sink evidence) in content.js at L1:C1 -> L1:C1
- Tools reporting this Flow: CoCo, DoubleX

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/dynamic/dynamic_report.json`.
- Static (DoubleX): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.1.25` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/static/static_report.json`; dynamic report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/dynamic/dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/static/static_report.json`; dynamic report `extensions/mdohdkncgoaamplcaokhmlppgafhlima_1.1.25/dynamic/dynamic_report.json`.


## Recommendations

1. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
