# Security Vulnerability Report: Critical Arbitrary File Download, CSRF via Privileged Network Request, and other reported issues in MagicalDownloader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **4 Flow(s)** in **MagicalDownloader** (edge, extension ID `nokccdnfdobcfbdiapoljmomndcohjpj`, version `2.6.3`).
The recorded issue type(s): **Arbitrary File Download; CSRF via Privileged Network Request; Privilege Escalation**.

## Affected Extension Details

- Name: MagicalDownloader
- Platform: edge
- Extension ID: `nokccdnfdobcfbdiapoljmomndcohjpj`
- Dataset version: `2.6.3`
- Store version at review: `2.6.3`
- Users: 2194
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content-script at L197:C12 -> L197:C23 to the privileged sink `FETCH_BODY` (http://localhost:6800/jsonrpc) in js/popup at L82:C4 -> L88:C6. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-16f5da5adf47261c`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content-script at L197:C12 -> L197:C23
- Sink: `FETCH_BODY` (http://localhost:6800/jsonrpc) in js/popup at L82:C4 -> L88:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.6.3` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.

### Finding 2: Privilege Escalation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content-script at L197:C12 -> L197:C23 to the privileged sink `CHROME_ACTION_BADGE_OPTIONS` in js/background at L813:C8 -> L813:C133. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-205cb594a9f37e1b`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content-script at L197:C12 -> L197:C23
- Sink: `CHROME_ACTION_BADGE_OPTIONS` in js/background at L813:C8 -> L813:C133
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.6.3` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.

### Finding 3: Arbitrary File Download

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content-script at L197:C12 -> L197:C23 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` in js/popup at L272:C8 -> L276:C50. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2f9bff0b89e08c39`
- Severity recorded by the analysis: **CRITICAL**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in js/content-script at L197:C12 -> L197:C23
- Sink: `CHROME_DOWNLOADS_OPTIONS` in js/popup at L272:C8 -> L276:C50
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.6.3` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.

### Finding 4: Arbitrary File Download

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (document.title) in js/content-script at L234:C31 -> L234:C65 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` in js/popup at L272:C8 -> L276:C50. The source scope is on pages matching `https://*/*, http://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-59a7cf0bcdec9e96`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_TITLE` (document.title) in js/content-script at L234:C31 -> L234:C65
- Sink: `CHROME_DOWNLOADS_OPTIONS` in js/popup at L272:C8 -> L276:C50
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic (ExPGuard): `TOOL_LIMITATION` (basis `non_decisive`; evidence stage `BLOCKED`); this result does not independently confirm execution at the sink; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.6.3` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\nokccdnfdobcfbdiapoljmomndcohjpj_2.6.3\dynamic\dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Restrict download URLs and filenames, and require a visible user gesture before starting downloads.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
