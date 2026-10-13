# Security Vulnerability Report: Critical Extension Storage Poisoning in 购物党自动比价工具-AI看差评和商品对比

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **购物党自动比价工具-AI看差评和商品对比** (chrome, extension ID `jgphnjokjhjlcnnajmfjlacjnjkhleah`, version `5.17.3`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: 购物党自动比价工具-AI看差评和商品对比
- Platform: chrome
- Extension ID: `jgphnjokjhjlcnnajmfjlacjnjkhleah`
- Dataset version: `5.17.3`
- Store version at review: `5.17.3`
- Users: 100000
- Analysis tools: CoCo

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (CoCo source evidence) in crx_headers/jquery_header.js at L27:C1 -> L27:C1 to the privileged sink `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in js/main.js at L247:C1 -> L247:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8d558c0903c5b362`
- Severity recorded by the analysis: **CRITICAL**
- Source: `ELEMENT_TEXT_CONTENT` (CoCo source evidence) in crx_headers/jquery_header.js at L27:C1 -> L27:C1
- Sink: `CHROME_LOCAL_STORAGE` (CoCo sink evidence) in js/main.js at L247:C1 -> L247:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jgphnjokjhjlcnnajmfjlacjnjkhleah_5.17.3/static/static_report.json`.
- Dynamic (CoCo): `TOOL_LIMITATION` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/jgphnjokjhjlcnnajmfjlacjnjkhleah_5.17.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.17.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/jgphnjokjhjlcnnajmfjlacjnjkhleah_5.17.3/static/static_report.json`; dynamic report `extensions/jgphnjokjhjlcnnajmfjlacjnjkhleah_5.17.3/dynamic/dynamic_report.json`.


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
