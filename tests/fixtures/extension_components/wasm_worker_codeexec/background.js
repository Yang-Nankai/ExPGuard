// An external message string is used to build a Worker URL and a wasm module
// buffer — both run code from attacker-controlled data.
//   CHROME_ONMESSAGEEXTERNAL_MESSAGE → WORKER_URL        (CODE_INJECTION)
//   CHROME_ONMESSAGEEXTERNAL_MESSAGE → WASM_INSTANTIATE  (CODE_INJECTION)
chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  const w = new Worker(msg.workerUrl);

  WebAssembly.instantiate(msg.wasmBytes, {});

  sendResponse({ ok: true });
});
