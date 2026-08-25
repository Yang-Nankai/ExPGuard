const steps = [{ title: document.title }];

// The same property precision must survive a mutating Array call.  `push`
// stores a title-bearing element, but the later array cardinality is numeric
// metadata rather than title text.
const pushedSteps = [];
pushedSteps.push({ title: document.title });

// `steps.length` is numeric metadata. It must not inherit the title string.
chrome.runtime.sendMessage({
  action: "step-count",
  count: steps.length,
  payload: { title: document.title, url: "https://extension.example/safe" },
});

chrome.runtime.sendMessage({
  action: "step-count",
  count: pushedSteps.length,
  payload: { title: document.title, url: "https://extension.example/safe" },
});

// The element itself is still a genuine flow when the array is persisted.
chrome.runtime.sendMessage({ action: "save-array", values: pushedSteps });

// Direct title presentation remains a reportable Action flow.
chrome.runtime.sendMessage({ action: "set-title", title: document.title });

// The concrete title field is still a genuine page-to-extension storage path.
chrome.runtime.sendMessage({ action: "save-title", title: document.title });

// `payload.title` is a structured sibling of `payload.url`, not an opaque
// array/object element. A numeric *object* key must not accidentally trigger
// array-index fallback just because it looks like an index.
chrome.runtime.sendMessage({
  action: "numeric-object-key",
  payload: { 0: document.title, url: "https://extension.example/safe" },
});
