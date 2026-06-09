// `parseInt` strips a string into a number. The previous build had no
// semantic for `parseInt`, so the resulting Def was an untainted unknown
// and downstream sinks lost the source. With taint-preserving casts wired
// up, the privileged bookmark URL below should now be flagged.
const raw = document.URL.split("#")[1] || "0";
const id = parseInt(raw, 10);
chrome.runtime.sendMessage({ type: "ADD_BOOKMARK", url: "https://example.com/" + id });
