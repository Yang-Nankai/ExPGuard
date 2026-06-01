// content.js  —  Frame: CS_1 (matches: *://*.devhub.example/*)
//
// Bridges the in-page widget over to the background via a long-lived port.

const port = chrome.runtime.connect({ name: "devhub-bridge" });

window.addEventListener("message", (event) => {                  // SOURCE WINDOW_MESSAGE_EVENT
  if (!event.data || event.data.from !== "devhub-widget") return;

  port.postMessage({
    kind: "GRAB_MHTML",
    tabId: event.data.tabId,
    uploadUrl: event.data.uploadUrl,
  });
});

port.onMessage.addListener((msg) => {                            // SOURCE PSEUDO_MESSAGE
  // background may send back rendering instructions
  if (msg && msg.kind === "RENDER" && msg.html) {
    const target = document.getElementById("devhub-render");
    if (target) target.innerHTML = msg.html;                     // sink-like DOM write
  }
});
