console.log("LOADED", chrome.runtime.id);

const LEGACY_COOKIE_NAMES = [
  "neuromarket-auth-v3",
  "neuromarket-token",
  "neuromarket-deviceid",
  "neuromarket-captcha-token",
  "neuromarket-xpow-data",
];

(async () => {
  for (const name of LEGACY_COOKIE_NAMES) {
    const cookies = await chrome.cookies.getAll({ name });
    if (cookies.length === 0) continue;

    const existing = await chrome.storage.local.get(name);
    if (!existing[name]) {
      await chrome.storage.local.set({ [name]: cookies[0].value });
    }

    for (const cookie of cookies) {
      const protocol = cookie.secure ? "https" : "http";
      const url = `${protocol}://${cookie.domain.replace(/^\./, "")}${cookie.path}`;
      await chrome.cookies.remove({ name, url });
    }
  }
})();

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: chrome.runtime.getURL("onboarding.html") });
  }
});

chrome.runtime.onMessageExternal.addListener(function (
  req,
  sender,
  sendResponse
) {
  let type = "none";
  let url = "";
  let options = {};

  if (typeof req === "string") {
    const data = JSON?.parse(req) || {};
    type = data?.type || "none";
    url = data?.url || "";
    options = data?.options || {};
  } else {
    type = req?.type || "none";
    url = req?.url || "";
    options = req?.options || {};
  }

  if (type === "fetchJson") {
    fetch(url, options)
      .then(r => r.json())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));

    return true;
  }

  if (type === "fetchText") {
    fetch(url, options)
      .then(r => r.text())
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));

    return true;
  }

  if (type === "fetchRaw") {
    fetch(url, options)
      .then(r => sendResponse(r))
      .catch(err => sendResponse({ error: err.message }));

    return true;
  }

  if (type === "fetchStatus") {
    fetch(url, options)
      .then(r => sendResponse({ ok: r.ok, status: r.status }))
      .catch(err => sendResponse({ error: err.message }));

    return true;
  }

  if (type === "getAuthData") {
    chrome.storage.local.get([
      "neuromarket-auth-v3",
      "neuromarket-token",
      "neuromarket-deviceid",
      "neuromarket-captcha-token",
      "neuromarket-xpow-data",
    ], (result) => sendResponse(result));
    return true;
  }

  if (type === "openTab") {
    if (typeof url === "string" && url.startsWith("chrome://extensions")) {
      chrome.tabs.create({ url })
        .then(tab => sendResponse({ ok: true, tabId: tab.id }))
        .catch(err => sendResponse({ error: err.message }));
    } else {
      sendResponse({ error: "url_not_allowed" });
    }

    return true;
  }

  sendResponse(null);
  return true;
});