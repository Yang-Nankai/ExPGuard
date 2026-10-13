# Security Vulnerability Report: High Sensitive Data Exposure in NflxMultiSubs 2021 (Netflix Multi. Subtitles)

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **NflxMultiSubs 2021 (Netflix Multi. Subtitles)** (chrome, extension ID `jepfhfjlkgobooomdgpcjikalfpcldmm`, version `3.0.3`).
The recorded issue type(s): **Sensitive Data Exposure**.

The store currently reports version `3.0.4`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: NflxMultiSubs 2021 (Netflix Multi. Subtitles)
- Platform: chrome
- Extension ID: `jepfhfjlkgobooomdgpcjikalfpcldmm`
- Dataset version: `3.0.3`
- Store version at review: `3.0.4`
- Users: 60000
- Analysis tools: DoubleX

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L39 to the privileged sink `WINDOW_POSTMESSAGE` ({
				namespace: "nflxmultisubs",
				action: "apply-settings",
				settings: t.settings
			}) in content_scripts.js at L30. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-703c1c804bf2003c`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (chrome.storage.local.get) in background.js at L39
- Sink: `WINDOW_POSTMESSAGE` ({
				namespace: "nflxmultisubs",
				action: "apply-settings",
				settings: t.settings
			}) in content_scripts.js at L30
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); Sensitive extension data is returned to a web-accessible channel.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `STORAGE_ALL_ITEMS` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/jepfhfjlkgobooomdgpcjikalfpcldmm_3.0.3/static/static_report.json`.
- Dynamic (DoubleX): `SINK_NOT_FIRED` (basis `runtime_or_static_dynamic_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/jepfhfjlkgobooomdgpcjikalfpcldmm_3.0.3/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.0.3` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/jepfhfjlkgobooomdgpcjikalfpcldmm_3.0.3/static/static_report.json`; dynamic report `extensions/jepfhfjlkgobooomdgpcjikalfpcldmm_3.0.3/dynamic/dynamic_report.json`.


## Recommendations

1. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
