// Passing tainted data through $sce.trustAsHtml explicitly bypasses Angular's
// HTML sanitizer — the bypass call is itself the sink.
const dirty = document.URL.split("#")[1] || "";
const trusted = $sce.trustAsHtml(dirty);
