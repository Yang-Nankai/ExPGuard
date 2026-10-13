# Security Vulnerability Report: Critical Sensitive Data Exposure and Unauthorized Tab/Window Control in Нейромаркет - Реклама на Wildberries

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Нейромаркет - Реклама на Wildberries** (chrome, extension ID `blkidjnfpdkelkkelhlongdbiiabfojn`, version `1.29.1`).
The recorded issue type(s): **Sensitive Data Exposure; Unauthorized Tab/Window Control**.

The store currently reports version `1.31.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Нейромаркет - Реклама на Wildberries
- Platform: chrome
- Extension ID: `blkidjnfpdkelkkelhlongdbiiabfojn`
- Dataset version: `1.29.1`
- Store version at review: `1.31.0`
- Users: 30000
- Analysis tools: DoubleX

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L48 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L125. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d6dd1170bdeb62cc`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in background.js at L48
- Sink: `CHROME_TABS_CREATE_OPTIONS` (chrome.tabs.create) in background.js at L125
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.29.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/static/static_report.json`; dynamic report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/dynamic/dynamic_report.json`.

### Finding 2: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L113 to the privileged sink `WINDOW_POSTMESSAGE` (result) in background.js at L119. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f4d04730f43f7779`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L113
- Sink: `WINDOW_POSTMESSAGE` (result) in background.js at L119
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); Sensitive extension data is returned to a web-accessible channel.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/static/static_report.json`.
- Dynamic (DoubleX): `NOT_ATTEMPTED` (basis `runtime_or_static_dynamic_evidence`); this result does not independently confirm execution at the sink; report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.29.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/static/static_report.json`; dynamic report `extensions/blkidjnfpdkelkkelhlongdbiiabfojn_1.29.1/dynamic/dynamic_report.json`.


## Recommendations

1. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
2. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
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
