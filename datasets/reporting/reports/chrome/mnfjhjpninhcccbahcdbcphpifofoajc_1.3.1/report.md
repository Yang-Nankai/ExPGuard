# Security Vulnerability Report: Medium Extension Storage Poisoning in Patreon Downloader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Patreon Downloader** (chrome, extension ID `mnfjhjpninhcccbahcdbcphpifofoajc`, version `1.3.1`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `1.4.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Patreon Downloader
- Platform: chrome
- Extension ID: `mnfjhjpninhcccbahcdbcphpifofoajc`
- Dataset version: `1.3.1`
- Store version at review: `1.4.0`
- Users: 70000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(pd-bootstrap-data)) in src/contentScript at L169:C65 -> L169:C73 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in src/contentScript at L192:C4 -> L203:C6. The source scope is on pages matching `https://www.patreon.com/*, https://patreon.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-fd8c9228b24ee8e8`
- Severity recorded by the analysis: **MEDIUM**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(pd-bootstrap-data)) in src/contentScript at L169:C65 -> L169:C73
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in src/contentScript at L192:C4 -> L203:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/mnfjhjpninhcccbahcdbcphpifofoajc_1.3.1/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`); runtime reproduction recorded; report `extensions/mnfjhjpninhcccbahcdbcphpifofoajc_1.3.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.3.1` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mnfjhjpninhcccbahcdbcphpifofoajc_1.3.1/static/static_report.json`; dynamic report `extensions/mnfjhjpninhcccbahcdbcphpifofoajc_1.3.1/dynamic/dynamic_report.json`.


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
