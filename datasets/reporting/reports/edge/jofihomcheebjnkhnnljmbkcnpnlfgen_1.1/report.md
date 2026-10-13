# Security Vulnerability Report: Critical Extension Storage Poisoning in AutoPlay and Media Control

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **AutoPlay and Media Control** (edge, extension ID `jofihomcheebjnkhnnljmbkcnpnlfgen`, version `1.1`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: AutoPlay and Media Control
- Platform: edge
- Extension ID: `jofihomcheebjnkhnnljmbkcnpnlfgen`
- Dataset version: `1.1`
- Store version at review: `1.1`
- Users: 104
- Analysis tools: CoCo

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (CoCo source evidence) in crx_headers/expguard_compat_header.js at L41:C1 -> L41:C1 to the privileged sink `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in crx_headers/expguard_compat_header.js at L41:C1 -> L41:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-13c18f90c28f45e7`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_TITLE` (CoCo source evidence) in crx_headers/expguard_compat_header.js at L41:C1 -> L41:C1
- Sink: `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in crx_headers/expguard_compat_header.js at L41:C1 -> L41:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jofihomcheebjnkhnnljmbkcnpnlfgen_1.1/static/static_report.json`.
- Dynamic (CoCo): `CONFIRMED` (basis `runtime_or_static_dynamic_evidence`); runtime reproduction recorded; report `extensions/jofihomcheebjnkhnnljmbkcnpnlfgen_1.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.1` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- CoCo: source report `CoCo/edge/flow-verification-results-no-duplicate.json`; static report `extensions/jofihomcheebjnkhnnljmbkcnpnlfgen_1.1/static/static_report.json`; dynamic report `extensions/jofihomcheebjnkhnnljmbkcnpnlfgen_1.1/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
