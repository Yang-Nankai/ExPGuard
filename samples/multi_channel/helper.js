// helper.js
//
// Discovered indirectly: background calls chrome.runtime.getURL("helper.js"),
// which causes scriptUsageTracker to mark this file as part of the BG_1 frame.
//
// If a hostile message arrives carrying a `code` field, the helper would happily
// evaluate it. ExPGuard reports the resulting flow as CODE_INJECTION.

self.runHelperCommand = function(message) {
  if (!message) return;

  if (typeof message.code === "string") {
    // attacker-controlled code (taint flows through self.* lookup if hooked up)
    eval(message.code);                                          // SINK EVAL
  }

  if (typeof message.url === "string") {
    chrome.tabs.create({ url: message.url });                    // SINK CHROME_TABS_CREATE_OPTIONS
  }
};

chrome.runtime.onMessage.addListener((m) => {
  if (m && m.kind === "RUN_HELPER") {
    self.runHelperCommand(m);
  }
});
