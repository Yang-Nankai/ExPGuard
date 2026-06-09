// Take a tainted source (document.URL hash), parse it as JSON, read a field
// off the parsed container, and forward to background which uses it as a
// bookmark URL. The container-taint propagation in the member-access
// handler is what makes the parsed.url chain reach the sink.
const raw = document.URL.split("#")[1] || "{}";
const parsed = JSON.parse(raw);
chrome.runtime.sendMessage({ type: "ADD_BOOKMARK", url: parsed.url });
