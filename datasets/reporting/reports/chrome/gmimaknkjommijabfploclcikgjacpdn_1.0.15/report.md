# Security Vulnerability Report: Medium Privilege Escalation in Translate and Speak Subtitles for YouTube

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Translate and Speak Subtitles for YouTube** (chrome, extension ID `gmimaknkjommijabfploclcikgjacpdn`, version `1.0.15`).
The recorded issue type(s): **Privilege Escalation**.

## Affected Extension Details

- Name: Translate and Speak Subtitles for YouTube
- Platform: chrome
- Extension ID: `gmimaknkjommijabfploclcikgjacpdn`
- Dataset version: `1.0.15`
- Store version at review: `1.0.15`
- Users: 40000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in sw.bundle at L3:C305 -> L3:C306 to the privileged sink `CHROME_ACTION_BADGE_OPTIONS` in sw.bundle at L3:C323 -> L3:C465. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e3e204864a4ebb0c`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in sw.bundle at L3:C305 -> L3:C306
- Sink: `CHROME_ACTION_BADGE_OPTIONS` in sw.bundle at L3:C323 -> L3:C465
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/gmimaknkjommijabfploclcikgjacpdn_1.0.15/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/gmimaknkjommijabfploclcikgjacpdn_1.0.15/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.15` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/gmimaknkjommijabfploclcikgjacpdn_1.0.15/static/static_report.json`; dynamic report `extensions/gmimaknkjommijabfploclcikgjacpdn_1.0.15/dynamic/dynamic_report.json`.


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
