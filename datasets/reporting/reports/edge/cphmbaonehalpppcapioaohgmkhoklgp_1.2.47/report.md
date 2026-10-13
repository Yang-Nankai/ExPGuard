# Security Vulnerability Report: Medium CSRF via Privileged Network Request and Extension Storage Poisoning in WASheet: Bulk Message Sender & WhatsApp CRM

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **8 Flow(s)** in **WASheet: Bulk Message Sender & WhatsApp CRM** (edge, extension ID `cphmbaonehalpppcapioaohgmkhoklgp`, version `1.2.47`).
The recorded issue type(s): **CSRF via Privileged Network Request; Extension Storage Poisoning**.

The store currently reports version `1.2.56`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: WASheet: Bulk Message Sender & WhatsApp CRM
- Platform: edge
- Extension ID: `cphmbaonehalpppcapioaohgmkhoklgp`
- Dataset version: `1.2.47`
- Store version at review: `1.2.56`
- Users: 160
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348 to the privileged sink `FETCH_HEADERS` (https://api.anthropic.com/v1/messages) in background at L1:C717 -> L1:C1005. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3487d479e70600df`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348
- Sink: `FETCH_HEADERS` (https://api.anthropic.com/v1/messages) in background at L1:C717 -> L1:C1005
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_HEADERS`; candidate matches: 3

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/cphmbaonehalpppcapioaohgmkhoklgp_1.2.47/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/cphmbaonehalpppcapioaohgmkhoklgp_1.2.47/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348 to the privileged sink `FETCH_HEADERS` (https://api.openai.com/v1/chat/completions) in background at L1:C328 -> L1:C534. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3c1b6b46fe4ee461`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348
- Sink: `FETCH_HEADERS` (https://api.openai.com/v1/chat/completions) in background at L1:C328 -> L1:C534
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_HEADERS`; candidate matches: 3

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in background at L1:C1986 -> L1:C2074. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-58dce25b33879883`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in background at L1:C1986 -> L1:C2074
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C76296 -> L1:C76321 to the privileged sink `CHROME_LOCAL_STORAGE` (cachedText) in content at L1:C76515 -> L1:C76572. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-816631ce8e585b37`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C76296 -> L1:C76321
- Sink: `CHROME_LOCAL_STORAGE` (cachedText) in content at L1:C76515 -> L1:C76572
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 5: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in background at L1:C1240 -> L1:C1328. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a8c7ec02d8ab34a5`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C75323 -> L1:C75348
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in background at L1:C1240 -> L1:C1328
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/cphmbaonehalpppcapioaohgmkhoklgp_1.2.47/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/cphmbaonehalpppcapioaohgmkhoklgp_1.2.47/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 6: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C76296 -> L1:C76321 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in content at L1:C77719 -> L1:C77759. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ae9bf2ba1208aca9`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C76296 -> L1:C76321
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in content at L1:C77719 -> L1:C77759
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 7: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C76296 -> L1:C76321 to the privileged sink `CHROME_LOCAL_STORAGE` (storedText) in content at L1:C77404 -> L1:C77454. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d52e64aa391890af`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L1:C76296 -> L1:C76321
- Sink: `CHROME_LOCAL_STORAGE` (storedText) in content at L1:C77404 -> L1:C77454
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 5

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `decisive`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.

### Finding 8: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.local.set('storedText') in content) in content at L1:C76296 -> L1:C76321 to the privileged sink `FETCH_HEADERS` (https://api.openai.com/v1/chat/completions) in background at L1:C8404 -> L1:C8554. The source scope is on pages matching `https://web.whatsapp.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-e1b3db807ac9cdee`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.local.set('storedText') in content) in content at L1:C76296 -> L1:C76321
- Sink: `FETCH_HEADERS` (https://api.openai.com/v1/chat/completions) in background at L1:C8404 -> L1:C8554
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_HEADERS`; candidate matches: 3

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `inconclusive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.2.47` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard\dynamic-batch\after-fixes-edge-r5\summary.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
4. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
5. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
