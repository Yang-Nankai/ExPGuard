# Security Vulnerability Report: Medium CSRF via Privileged Network Request and Unauthorized Tab/Window Control in Readlang Web Reader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Readlang Web Reader** (firefox, extension ID `steve@readlang.com`, version `0.9.38`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Tab/Window Control**.

The store currently reports version `0.9.43`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Readlang Web Reader
- Platform: firefox
- Extension ID: `steve@readlang.com`
- Dataset version: `0.9.38`
- Store version at review: `0.9.43`
- Users: 492
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in src/background at L159:C27 -> L170:C12. The source scope is on pages matching `https://readlang.com/*, https://test.readlang.com/*, http://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a84c2b46268622dd`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in src/background at L159:C27 -> L170:C12
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
his.READLANG_EXTENSION_CONFIG.hostname;

const activeTabIds = 
```

**Sink code anchor (excerpt):**

```javascript
   response = await fetch(url, {
            method: data.method,
            headers: {
              Client: "readlang-chrome-extension",
              "X-Extension-Version": chrome.runtime.getManifest().version,
              ...(data.data ? { "Content-Type": "application/json" } : {}),
            },
            body:
              data.method !== "GET" && data.data
                ? JSON.stringify(data.data)
                : undefined,
          });
        } catch (e
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/steve@readlang.com_0.9.38/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/steve@readlang.com_0.9.38/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.9.38` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/steve@readlang.com_0.9.38/static/static_report.json`; dynamic report `extensions/steve@readlang.com_0.9.38/dynamic/dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in src/background at L259:C4 -> L271:C5. The source scope is on pages matching `https://readlang.com/*, https://test.readlang.com/*, http://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ff53fe15cc53293c`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in src/background at L259:C4 -> L271:C5
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
his.READLANG_EXTENSION_CONFIG.hostname;

const activeTabIds = 
```

**Sink code anchor (excerpt):**

```javascript

      }
    }

    chrome.windows.create(
      {
        url: url,
        top: currentWindow.top,
        left: left,
        width: windowWidth,
        height: currentWindow.height,
        type: "popup",
      },
      function (newWindow) {
        dictionaryWindow = newWindow;
      }
    );
  });
};

const up
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.9.38` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
