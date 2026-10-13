# Security Vulnerability Report: Critical CSRF via Privileged Network Request in Discord Rich Presence

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Discord Rich Presence** (firefox, extension ID `{57081fef-67b4-482f-bcb0-69296e63ec4f}`, version `0.3.0`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: Discord Rich Presence
- Platform: firefox
- Extension ID: `{57081fef-67b4-482f-bcb0-69296e63ec4f}`
- Dataset version: `0.3.0`
- Store version at review: `0.3.0`
- Users: 721
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L433:C28 -> L433:C35 to the privileged sink `WEBSOCKET_DATA` in background at L402:C4 -> L402:C73. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e9cb155e0c63b836`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L433:C28 -> L433:C35
- Sink: `WEBSOCKET_DATA` in background at L402:C4 -> L402:C73
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
ole.log('Register', request, sender);
    if(!
```

**Sink code anchor (excerpt):**

```javascript
ener.length) {
    websocket.send(JSON.stringify({action: 'party', listener: listener}));
  }else{
    con
```

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/{57081fef-67b4-482f-bcb0-69296e63ec4f}_0.3.0/static/static_report.json`.
- Dynamic (ExPGuard): `DEFERRED_COMPANION_EXTENSION`; this result does not independently confirm execution at the sink; report `extensions/{57081fef-67b4-482f-bcb0-69296e63ec4f}_0.3.0/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.3.0` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```javascript
await send("{57081fef-67b4-482f-bcb0-69296e63ec4f}", {
  action: "party",
  clientId: "EXPAGENT_MARKER"
});
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{57081fef-67b4-482f-bcb0-69296e63ec4f}_0.3.0/static/static_report.json`; dynamic report `extensions/{57081fef-67b4-482f-bcb0-69296e63ec4f}_0.3.0/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
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
