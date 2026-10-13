# Security Vulnerability Report: Medium Extension Storage Poisoning in AliSave | Download AliExpress Images & Videos

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **AliSave | Download AliExpress Images & Videos** (chrome, extension ID `nbhfcmbdimdbbclfngkjfmgmjhnkjocl`, version `4.1.2`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: AliSave | Download AliExpress Images & Videos
- Platform: chrome
- Extension ID: `nbhfcmbdimdbbclfngkjfmgmjhnkjocl`
- Dataset version: `4.1.2`
- Store version at review: `4.1.2`
- Users: 100000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_INNER_HTML` (user) in account at L1:C413 -> L1:C436 to the privileged sink `CHROME_LOCAL_STORAGE` (user) in account at L1:C53 -> L1:C87. The source scope is on pages matching `https://account.alisave.app/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a253ddcb3be699fa`
- Severity recorded by the analysis: **MEDIUM**
- Source: `ELEMENT_INNER_HTML` (user) in account at L1:C413 -> L1:C436
- Sink: `CHROME_LOCAL_STORAGE` (user) in account at L1:C53 -> L1:C87
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/nbhfcmbdimdbbclfngkjfmgmjhnkjocl_4.1.2/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`); this result does not independently confirm execution at the sink; report `extensions/nbhfcmbdimdbbclfngkjfmgmjhnkjocl_4.1.2/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.1.2` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/nbhfcmbdimdbbclfngkjfmgmjhnkjocl_4.1.2/static/static_report.json`; dynamic report `extensions/nbhfcmbdimdbbclfngkjfmgmjhnkjocl_4.1.2/dynamic/dynamic_report.json`.


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
