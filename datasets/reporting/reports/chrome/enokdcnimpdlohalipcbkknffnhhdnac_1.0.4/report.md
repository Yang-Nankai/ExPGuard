# Security Vulnerability Report: Critical Extension Storage Poisoning in Music Identifier - Find any song from browser

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Music Identifier - Find any song from browser** (chrome, extension ID `enokdcnimpdlohalipcbkknffnhhdnac`, version `1.0.4`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `1.0.7`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Music Identifier - Find any song from browser
- Platform: chrome
- Extension ID: `enokdcnimpdlohalipcbkknffnhhdnac`
- Dataset version: `1.0.4`
- Store version at review: `1.0.7`
- Users: 100000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(contentscript_host:storageChange)) in scripts/content at L1:C497 -> L1:C505 to the privileged sink `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) in scripts/content at L1:C568 -> L1:C603. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-46880d55e8314515`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(contentscript_host:storageChange)) in scripts/content at L1:C497 -> L1:C505
- Sink: `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) in scripts/content at L1:C568 -> L1:C603
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/enokdcnimpdlohalipcbkknffnhhdnac_1.0.4/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/enokdcnimpdlohalipcbkknffnhhdnac_1.0.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.4` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/enokdcnimpdlohalipcbkknffnhhdnac_1.0.4/static/static_report.json`; dynamic report `extensions/enokdcnimpdlohalipcbkknffnhhdnac_1.0.4/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
