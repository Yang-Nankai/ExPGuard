# Security Vulnerability Report: Critical Unauthorized Browser Policy Change in Level up for Dynamics 365/Power Apps

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Level up for Dynamics 365/Power Apps** (chrome, extension ID `bjnkkhimoaclnddigpphpgkfgeggokam`, version `3.6.4`).
The recorded issue type(s): **Unauthorized Browser Policy Change**.

## Affected Extension Details

- Name: Level up for Dynamics 365/Power Apps
- Platform: chrome
- Extension ID: `bjnkkhimoaclnddigpphpgkfgeggokam`
- Dataset version: `3.6.4`
- Store version at review: `3.6.4`
- Users: 100000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(levelup)) in scripts/app at L121:C16 -> L121:C27 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in scripts/background at L208:C32 -> L248:C38. The source scope is on pages matching `http://*/*, https://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-093d42f54d5e6bad`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(levelup)) in scripts/app at L121:C16 -> L121:C27
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in scripts/background at L208:C32 -> L248:C38
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/bjnkkhimoaclnddigpphpgkfgeggokam_3.6.4/static/static_report.json`.
- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `inconclusive`; evidence stage `ENVIRONMENT_READY`); this result does not independently confirm execution at the sink; report `extensions/bjnkkhimoaclnddigpphpgkfgeggokam_3.6.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.6.4` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/bjnkkhimoaclnddigpphpgkfgeggokam_3.6.4/static/static_report.json`; dynamic report `extensions/bjnkkhimoaclnddigpphpgkfgeggokam_3.6.4/dynamic/dynamic_report.json`.


## Recommendations

1. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
