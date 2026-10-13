# Security Vulnerability Report: Critical Privilege Escalation in FC26 Enhancer | SBC Solver, Trader & Keyboard Shortcuts

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **FC26 Enhancer | SBC Solver, Trader & Keyboard Shortcuts** (chrome, extension ID `boffdonfioidojlcpmfnkngipappmcoh`, version `26.1.5.9`).
The recorded issue type(s): **Privilege Escalation**.

The store currently reports version `27.0.1.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: FC26 Enhancer | SBC Solver, Trader & Keyboard Shortcuts
- Platform: chrome
- Extension ID: `boffdonfioidojlcpmfnkngipappmcoh`
- Dataset version: `26.1.5.9`
- Store version at review: `27.0.1.0`
- Users: 200000
- Analysis tools: DoubleX

## Findings

### Finding 1: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L15 to the privileged sink `CHROME_ALARMS_CLEAR_NAME` (chrome.alarms.clear) in background.js at L63. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-810ea83d31dcceab`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L15
- Sink: `CHROME_ALARMS_CLEAR_NAME` (chrome.alarms.clear) in background.js at L63
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_ALARMS_CLEAR_NAME`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic run did not establish a decisive runtime result; report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.1.5.9` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/static/static_report.json`; dynamic report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/dynamic/dynamic_report.json`.

### Finding 2: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L15 to the privileged sink `CHROME_NOTIFICATIONS_CREATE_OPTIONS` (chrome.notifications.create) in background.js at L42. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-cfe53091b890f355`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (DoubleX web-accessible message input) in content_scripts.js at L15
- Sink: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` (chrome.notifications.create) in background.js at L42
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); DoubleX matched external input to a sensitive API parameter.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_NOTIFICATIONS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `26.1.5.9` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/static/static_report.json`; dynamic report `extensions/boffdonfioidojlcpmfnkngipappmcoh_26.1.5.9/dynamic/dynamic_report.json`.


## Recommendations

1. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
