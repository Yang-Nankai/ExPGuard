chrome.runtime.onMessage.addListener((req) => {
  if (req && req.type === "EXEC") {
    // CODE_INJECTION sink reached via cross-component message
    new Function(req.code)();
  }
});
