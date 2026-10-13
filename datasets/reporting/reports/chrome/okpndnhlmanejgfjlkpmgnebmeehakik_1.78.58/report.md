# Security Vulnerability Report: Critical Extension Storage Poisoning in Lingopie: Learn Languages With TV Shows & Movies

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Lingopie: Learn Languages With TV Shows & Movies** (chrome, extension ID `okpndnhlmanejgfjlkpmgnebmeehakik`, version `1.78.58`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `1.78.76`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Lingopie: Learn Languages With TV Shows & Movies
- Platform: chrome
- Extension ID: `okpndnhlmanejgfjlkpmgnebmeehakik`
- Dataset version: `1.78.58`
- Store version at review: `1.78.76`
- Users: 50000
- Analysis tools: CoCo

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (CoCo source evidence) in setup.js at L74:C1 -> L74:C1 to the privileged sink `CHROME_SYNC_STORAGE` (CoCo sink evidence) in setup.js at L76:C1 -> L76:C1. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e115b38199af6ed3`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_CUSTOM_EVENT` (CoCo source evidence) in setup.js at L74:C1 -> L74:C1
- Sink: `CHROME_SYNC_STORAGE` (CoCo sink evidence) in setup.js at L76:C1 -> L76:C1
- Tools reporting this Flow: CoCo

- Privilege boundary recorded: `True` (None); CoCo reported cross-boundary flow; verify with source

#### Updated-version tool result

- CoCo: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/okpndnhlmanejgfjlkpmgnebmeehakik_1.78.58/static/static_report.json`.
- Dynamic (CoCo): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/okpndnhlmanejgfjlkpmgnebmeehakik_1.78.58/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.78.58` in a disposable chrome profile.
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

- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/okpndnhlmanejgfjlkpmgnebmeehakik_1.78.58/static/static_report.json`; dynamic report `extensions/okpndnhlmanejgfjlkpmgnebmeehakik_1.78.58/dynamic/dynamic_report.json`.


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
