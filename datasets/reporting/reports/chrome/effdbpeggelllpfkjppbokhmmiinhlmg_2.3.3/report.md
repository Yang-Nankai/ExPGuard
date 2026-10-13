# Security Vulnerability Report: Medium Unauthorized Tab/Window Control in Better Lyrics (Lyrics for YouTube Music)

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Better Lyrics (Lyrics for YouTube Music)** (chrome, extension ID `effdbpeggelllpfkjppbokhmmiinhlmg`, version `2.3.3`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

The store currently reports version `2.4.1`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Better Lyrics (Lyrics for YouTube Music)
- Platform: chrome
- Extension ID: `effdbpeggelllpfkjppbokhmmiinhlmg`
- Dataset version: `2.3.3`
- Store version at review: `2.4.1`
- Users: 80000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in background/service_worker at L4:C2200 -> L4:C2201 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in background/service_worker at L1:C5164 -> L1:C5250. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e7f72e4609a7bbf7`
- Severity recorded by the analysis: **MEDIUM**
- Source: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (chrome.runtime.onConnectExternal.addListener[onMessage]) in background/service_worker at L4:C2200 -> L4:C2201
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in background/service_worker at L1:C5164 -> L1:C5250
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/effdbpeggelllpfkjppbokhmmiinhlmg_2.3.3/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/effdbpeggelllpfkjppbokhmmiinhlmg_2.3.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.3.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/effdbpeggelllpfkjppbokhmmiinhlmg_2.3.3/static/static_report.json`; dynamic report `extensions/effdbpeggelllpfkjppbokhmmiinhlmg_2.3.3/dynamic/dynamic_report.json`.


## Recommendations

1. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
