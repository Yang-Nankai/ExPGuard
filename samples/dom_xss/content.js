// content.js  —  Frame: CS_1 (matches: <all_urls>  → CRITICAL severity)
//
// Flow patterns the analyzer should report:
//   1. DOCUMENT_LOCATION → EVAL                  (CODE_INJECTION)
//   2. WINDOW_MESSAGE_EVENT → TIME_EVAL          (CODE_INJECTION via setTimeout("string", n))
//   3. ELEMENT_VALUE → DOCUMENT_WRITE            (CODE_INJECTION)
//   4. WINDOW_CUSTOM_EVENT → NEW_FUNCTION        (CODE_INJECTION)

// ── 1. URL-driven eval (inline, no IIFE) ───────────────────────
var hashStr = location.hash;                        // SOURCE  DOCUMENT_LOCATION
var decoded = decodeURIComponent(hashStr);
eval(decoded);                                       // SINK    EVAL

// ── 3. Element-value driven document.write ─────────────────────
var input = document.getElementById("translate-source");
var combined = "<div class='tr'>" + input.value + "</div>";   // SOURCE ELEMENT_VALUE
document.write(combined);                            // SINK DOCUMENT_WRITE

// ── 2. Postmessage-driven scheduling ───────────────────────────
window.addEventListener("message", function (ev) {  // SOURCE WINDOW_MESSAGE_EVENT
  if (!ev.data) return;
  if (ev.data.type !== "DEFER_SCRIPT") return;
  setTimeout(ev.data.code, ev.data.delay || 100);   // SINK   TIME_EVAL
});

// ── 4. Custom event → new Function ─────────────────────────────
window.addEventListener("translateRule", function (ev) {   // SOURCE WINDOW_CUSTOM_EVENT
  var body = "";
  if (ev && ev.detail && ev.detail.body) {
    body = ev.detail.body;
  }
  var rule = new Function("text", body);            // SINK NEW_FUNCTION
  document.body.appendChild(document.createTextNode(rule("demo")));
});
