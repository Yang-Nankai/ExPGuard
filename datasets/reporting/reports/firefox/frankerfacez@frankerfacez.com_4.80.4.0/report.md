# Security Vulnerability Report: High Privilege Escalation in FrankerFaceZ

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **FrankerFaceZ** (firefox, extension ID `frankerfacez@frankerfacez.com`, version `4.80.4.0`).
The recorded issue type(s): **Privilege Escalation**.

## Affected Extension Details

- Name: FrankerFaceZ
- Platform: firefox
- Extension ID: `frankerfacez@frankerfacez.com`
- Dataset version: `4.80.4.0`
- Store version at review: `4.80.4.0`
- Users: 103767
- Analysis tools: ExPGuard

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in web/script.min at L1:C657 -> L1:C755 to the privileged sink `WINDOW_POSTMESSAGE` (location.origin) in web/script.min at L1:C685 -> L1:C753. The source scope is on pages matching `*://*.twitch.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-944f3fd7d4b7804e`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in web/script.min at L1:C657 -> L1:C755
- Sink: `WINDOW_POSTMESSAGE` (location.origin) in web/script.min at L1:C685 -> L1:C753
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
e:"ffz-cs-bridge"}),t.onMessage.addListener(n=>{window.postMessage({ffz_from_worker:!0,...n},window.location.origin)}),t.onDisconnect.addL
```

**Sink code anchor (excerpt):**

```javascript
age.addListener(n=>{window.postMessage({ffz_from_worker:!0,...n},window.location.origin)}),t.onDisconnect.ad
```

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/frankerfacez@frankerfacez.com_4.80.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED`; a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/frankerfacez@frankerfacez.com_4.80.4.0/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.80.4.0` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/frankerfacez@frankerfacez.com_4.80.4.0/static/static_report.json`; dynamic report `extensions/frankerfacez@frankerfacez.com_4.80.4.0/dynamic/dynamic_report.json`.


## Recommendations

1. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
