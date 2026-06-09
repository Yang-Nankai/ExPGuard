// background.js - Advanced obfuscation patterns in background
// Frame: BG_1
//
// Flow patterns exercised:
//   1. CHROME_RUNTIME_ONMESSAGE → [obfuscation] → EVAL
//   2. STORAGE_DATA → [decode chain] → NEW_FUNCTION

import { fromCharCodes, decodeAndConcat, xorCipher } from "./obfuscator.js";

// ─── Message-driven Code Execution ─────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // Technique: XOR decoding + eval
  if (msg.type === "EXEC_XOR") {
    const encrypted = msg.encrypted;                            // SOURCE
    const key = "secret";
    const decrypted = xorCipher(encrypted, key);

    eval(decrypted);                                            // SINK EVAL
    sendResponse({ success: true });
  }

  // Technique: Multi-stage Base64 decode
  if (msg.type === "EXEC_MULTISTAGE") {
    const stage1 = atob(msg.stage1);                           // SOURCE
    const stage2 = atob(stage1);
    const stage3 = atob(stage2);

    const func = new Function(stage3);                         // SINK NEW_FUNCTION
    func();
    sendResponse({ success: true });
  }

  // Technique: Computed member expression
  if (msg.type === "EXEC_COMPUTED") {
    const code = msg.code;                                     // SOURCE
    const execMethod = ["e", "v", "a", "l"].join("");

    globalThis[execMethod](code);                              // SINK EVAL
    sendResponse({ success: true });
  }

  return true;
});

// ─── Storage-driven Execution ──────────────────────────────────────
// Read obfuscated code from storage and execute
async function loadAndExecuteFromStorage() {
  const result = await chrome.storage.local.get(["obfuscatedScript"]);

  if (result.obfuscatedScript) {
    const encoded = result.obfuscatedScript;                   // SOURCE STORAGE_DATA

    // Decode chain: Base64 → XOR → Execute
    const decoded = atob(encoded);
    const decrypted = xorCipher(decoded, "key");

    const executor = new Function(decrypted);                  // SINK NEW_FUNCTION
    executor();
  }
}

// Periodic execution check
setInterval(loadAndExecuteFromStorage, 60000);
