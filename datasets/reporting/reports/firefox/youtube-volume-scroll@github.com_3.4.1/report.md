# Security Vulnerability Report: Medium Extension Storage Poisoning in Youtube Volume Scroll

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **4 Flow(s)** in **Youtube Volume Scroll** (firefox, extension ID `youtube-volume-scroll@github.com`, version `3.4.1`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `3.4.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Youtube Volume Scroll
- Platform: firefox
- Extension ID: `youtube-volume-scroll@github.com`
- Dataset version: `3.4.1`
- Store version at review: `3.4.2`
- Users: 1588
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.sync.set('config') in index) in index at L80:C12 -> L80:C23 to the privileged sink `CHROME_LOCAL_STORAGE` (config) in popup/popup at L58:C8 -> L58:C48. The source scope is on pages matching `https://www.youtube.com/*, https://music.youtube.com/*, https://www.youtube-nocookie.com/embed/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-12a4c800febf9f3b`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.sync.set('config') in index) in index at L80:C12 -> L80:C23
- Sink: `CHROME_LOCAL_STORAGE` (config) in popup/popup at L58:C8 -> L58:C48
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
   if (granted) {
                        $('body')
```

**Sink code anchor (excerpt):**

```javascript
out(() => {
        browserApi.storage.local.set({ config });
        saveTimeou
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/youtube-volume-scroll@github.com_3.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/youtube-volume-scroll@github.com_3.4.1/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.4.1` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/youtube-volume-scroll@github.com_3.4.1/static/static_report.json`; dynamic report `extensions/youtube-volume-scroll@github.com_3.4.1/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in index at L80:C12 -> L80:C23 to the privileged sink `CHROME_SYNC_STORAGE` (config) in index at L89:C12 -> L89:C66. The source scope is on pages matching `https://www.youtube.com/*, https://music.youtube.com/*, https://www.youtube-nocookie.com/embed/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4912bd5be4fc7470`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in index at L80:C12 -> L80:C23
- Sink: `CHROME_SYNC_STORAGE` (config) in index at L89:C12 -> L89:C66
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
   if (
            e.data.type === 'YoutubeVolumeS
```

**Sink code anchor (excerpt):**

```javascript
config;
            browserApi.storage.sync.set({ config: e.data.config });
        }
    });

```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 3

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.4.1` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 3: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in index at L80:C12 -> L80:C23 to the privileged sink `CHROME_SYNC_STORAGE` (savedVolume) in index at L170:C8 -> L170:C63. The source scope is on pages matching `https://www.youtube.com/*, https://music.youtube.com/*, https://www.youtube-nocookie.com/embed/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-604e22f4b464e14a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in index at L80:C12 -> L80:C23
- Sink: `CHROME_SYNC_STORAGE` (savedVolume) in index at L170:C8 -> L170:C63
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
   if (
            e.data.type === 'YoutubeVolumeS
```

**Sink code anchor (excerpt):**

```javascript
out(() => {
        browserApi.storage.sync.set({ savedVolume: newVolume });
        saveTimeou
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 3

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.4.1` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 4: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (From storage.sync.set('config') in index) in index at L80:C12 -> L80:C23 to the privileged sink `CHROME_SYNC_STORAGE` (config) in popup/popup at L73:C8 -> L73:C47. The source scope is on pages matching `https://www.youtube.com/*, https://music.youtube.com/*, https://www.youtube-nocookie.com/embed/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-9998ace733a5f40a`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (From storage.sync.set('config') in index) in index at L80:C12 -> L80:C23
- Sink: `CHROME_SYNC_STORAGE` (config) in popup/popup at L73:C8 -> L73:C47
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
   if (granted) {
                        $('body')
```

**Sink code anchor (excerpt):**

```javascript
r = () => {
        browserApi.storage.sync.set({ config });
    };

    setupS
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_SYNC_STORAGE`; candidate matches: 3

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/youtube-volume-scroll@github.com_3.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/youtube-volume-scroll@github.com_3.4.1/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.4.1` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/youtube-volume-scroll@github.com_3.4.1/static/static_report.json`; dynamic report `extensions/youtube-volume-scroll@github.com_3.4.1/dynamic/dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
