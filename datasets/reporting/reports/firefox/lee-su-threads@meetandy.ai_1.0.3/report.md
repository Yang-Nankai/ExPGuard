# Security Vulnerability Report: Medium Extension Storage Poisoning in Lee-Su-Threads

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Lee-Su-Threads** (firefox, extension ID `lee-su-threads@meetandy.ai`, version `1.0.3`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `1.0.5`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Lee-Su-Threads
- Platform: firefox
- Extension ID: `lee-su-threads@meetandy.ai`
- Dataset version: `1.0.3`
- Store version at review: `1.0.5`
- Users: 397
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (From storage.local.set('profileCache') in background) in content at L1:C1640 -> L1:C1674 to the privileged sink `CHROME_LOCAL_STORAGE` (profileCache) in background at L1:C575 -> L1:C612. The source scope is on pages matching `https://www.threads.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-df8b5b752f67db60`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_CUSTOM_EVENT` (From storage.local.set('profileCache') in background) in content at L1:C1640 -> L1:C1674
- Sink: `CHROME_LOCAL_STORAGE` (profileCache) in background at L1:C575 -> L1:C612
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
url})}),!1}return!1}e.runtime.onMessage.addListener(m);var I="0.3.5";e.run
```

**Sink code anchor (excerpt):**

```javascript
mestamp:Date.now()},e.storage.local.set({profileCache:o}))}),!1;if(t.type==="
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/lee-su-threads@meetandy.ai_1.0.3/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED`; runtime reproduction recorded; report `extensions/lee-su-threads@meetandy.ai_1.0.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.3` in a disposable firefox profile.
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

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/lee-su-threads@meetandy.ai_1.0.3/static/static_report.json`; dynamic report `extensions/lee-su-threads@meetandy.ai_1.0.3/dynamic/dynamic_report.json`.


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
