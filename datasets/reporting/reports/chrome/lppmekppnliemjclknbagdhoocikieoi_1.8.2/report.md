# Security Vulnerability Report: High Extension Storage Poisoning in 7TV

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **4 Flow(s)** in **7TV** (chrome, extension ID `lppmekppnliemjclknbagdhoocikieoi`, version `1.8.2`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `1.10.4`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: 7TV
- Platform: chrome
- Extension ID: `lppmekppnliemjclknbagdhoocikieoi`
- Dataset version: `1.8.2`
- Store version at review: `1.10.4`
- Users: 400000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(seventv:service-status)) in content-scripts/content at L1:C4025 -> L1:C4033 to the privileged sink `CHROME_LOCAL_STORAGE` (seventv.service-status.dismissed-outage-key) in background at L5:C16443 -> L5:C16471. The source scope is on pages matching `*://*.kick.com/*, *://*.twitch.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-3d514e6b96baa682`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(seventv:service-status)) in content-scripts/content at L1:C4025 -> L1:C4033
- Sink: `CHROME_LOCAL_STORAGE` (seventv.service-status.dismissed-outage-key) in background at L5:C16443 -> L5:C16471
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.2` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/static/static_report.json`; dynamic report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-scripts/content at L1:C6524 -> L1:C6525 to the privileged sink `CHROME_LOCAL_STORAGE` (7tv.account.token) in content-scripts/content at L1:C6886 -> L1:C6914. The source scope is on pages matching `*://*.kick.com/*, *://*.twitch.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6db4bb7d7df71026`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-scripts/content at L1:C6524 -> L1:C6525
- Sink: `CHROME_LOCAL_STORAGE` (7tv.account.token) in content-scripts/content at L1:C6886 -> L1:C6914
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lppmekppnliemjclknbagdhoocikieoi_1.8.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.2` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lppmekppnliemjclknbagdhoocikieoi_1.8.2\dynamic\dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-scripts/content at L1:C4463 -> L1:C4470 to the privileged sink `CHROME_LOCAL_STORAGE` (seventv.service-status.dismissed-outage-key) in background at L5:C16443 -> L5:C16471. The source scope is on pages matching `*://*.kick.com/*, *://*.twitch.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-706caee863fca0f4`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-scripts/content at L1:C4463 -> L1:C4470
- Sink: `CHROME_LOCAL_STORAGE` (seventv.service-status.dismissed-outage-key) in background at L5:C16443 -> L5:C16471
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0.3; report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lppmekppnliemjclknbagdhoocikieoi_1.8.2\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.2` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\lppmekppnliemjclknbagdhoocikieoi_1.8.2\dynamic\dynamic_report.json`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_CUSTOM_EVENT` (window.addEventListener(seventv:account-token:set)) in content-scripts/content at L1:C7072 -> L1:C7080 to the privileged sink `CHROME_LOCAL_STORAGE` (7tv.account.token) in content-scripts/content at L1:C6886 -> L1:C6914. The source scope is on pages matching `*://*.kick.com/*, *://*.twitch.tv/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ea4d0ece599fca0b`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_CUSTOM_EVENT` (window.addEventListener(seventv:account-token:set)) in content-scripts/content at L1:C7072 -> L1:C7080
- Sink: `CHROME_LOCAL_STORAGE` (7tv.account.token) in content-scripts/content at L1:C6886 -> L1:C6914
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.2` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/static/static_report.json`; dynamic report `extensions/lppmekppnliemjclknbagdhoocikieoi_1.8.2/dynamic/dynamic_report.json`.


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
