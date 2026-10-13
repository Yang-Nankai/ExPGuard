# Security Vulnerability Report: Medium Extension Storage Poisoning in X-notifier Neo

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **X-notifier Neo** (firefox, extension ID `{c98e042b-917d-4bdb-b125-dd3ace21ab71}`, version `4.0.1`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `4.0.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: X-notifier Neo
- Platform: firefox
- Extension ID: `{c98e042b-917d-4bdb-b125-dd3ace21ab71}`
- Dataset version: `4.0.1`
- Store version at review: `4.0.2`
- Users: 852
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/hotmail_bridge at L16:C7 -> L16:C11 to the privileged sink `CHROME_LOCAL_STORAGE` (hotmailToken) in background at L69:C10 -> L69:C39. The source scope is on pages matching `https://outlook.live.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-8986a88f403e947b`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/hotmail_bridge at L16:C7 -> L16:C11
- Sink: `CHROME_LOCAL_STORAGE` (hotmailToken) in background at L69:C10 -> L69:C39
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
 = [];

let soundData;

// Hotmail (Outl
```

**Sink code anchor (excerpt):**

```javascript
scripts) {
      if (scripts[id].config.cookies) si[0][id] = scripts
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/{c98e042b-917d-4bdb-b125-dd3ace21ab71}_4.0.1/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/{c98e042b-917d-4bdb-b125-dd3ace21ab71}_4.0.1/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.0.1` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{c98e042b-917d-4bdb-b125-dd3ace21ab71}_4.0.1/static/static_report.json`; dynamic report `extensions/{c98e042b-917d-4bdb-b125-dd3ace21ab71}_4.0.1/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
