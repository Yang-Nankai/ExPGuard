# Security Vulnerability Report: Critical Arbitrary File Download, Extension Storage Poisoning, and other reported issues in Screenshot - Webpage Screen Capture

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **8 Flow(s)** in **Screenshot - Webpage Screen Capture** (chrome, extension ID `okkffdhbfplmbjblhgapnchjinanmnij`, version `1.4.1`).
The recorded issue type(s): **Arbitrary File Download; Extension Storage Poisoning; Unauthorized Tab/Window Control; Unauthorized Browser Policy Change**.

## Affected Extension Details

- Name: Screenshot - Webpage Screen Capture
- Platform: chrome
- Extension ID: `okkffdhbfplmbjblhgapnchjinanmnij`
- Dataset version: `1.4.1`
- Store version at review: `1.4.1`
- Users: 50000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) in background/background at L1:C2871 -> L1:C2905. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-248c1136ce2b5048`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) in background/background at L1:C2871 -> L1:C2905
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 2: Arbitrary File Download

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` in background/background at L3:C34682 -> L3:C34773. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2658da2a857988af`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_DOWNLOADS_OPTIONS` in background/background at L3:C34682 -> L3:C34773
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`; dynamic report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/dynamic/dynamic_report.json`.

### Finding 3: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in background/background at L1:C3696 -> L1:C3751. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-39b34a846e5e1a33`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in background/background at L1:C3696 -> L1:C3751
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`; dynamic report `not recorded`.

### Finding 4: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_WINDOWS_UPDATE_OPTIONS` in background/background at L1:C3370 -> L1:C3407. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-66473dd93d352680`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_WINDOWS_UPDATE_OPTIONS` in background/background at L1:C3370 -> L1:C3407
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `runtime_sink_evidence`); the recorded replay did not establish the complete source-to-sink effect; report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`; dynamic report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/dynamic/dynamic_report.json`.

### Finding 5: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in background/background at L1:C3543 -> L1:C3579. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a181a86c6eb4bb92`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_TABS_CREATE_OPTIONS` in background/background at L1:C3543 -> L1:C3579
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/static/static_report.json`; dynamic report `extensions/okkffdhbfplmbjblhgapnchjinanmnij_1.4.1/dynamic/dynamic_report.json`.

### Finding 6: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in background/background at L1:C3768 -> L1:C3823. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a2846a6864017248`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in background/background at L1:C3768 -> L1:C3823
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 7: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in background/background at L1:C3276 -> L1:C3350. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e29ef816ec3a900d`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in background/background at L1:C3276 -> L1:C3350
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 8: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in background/background at L1:C3103 -> L1:C3177. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f2b02f181afa77c5`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content/content at L1:C107989 -> L1:C110208
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in background/background at L1:C3103 -> L1:C3177
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Restrict download URLs and filenames, and require a visible user gesture before starting downloads.
4. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
5. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
