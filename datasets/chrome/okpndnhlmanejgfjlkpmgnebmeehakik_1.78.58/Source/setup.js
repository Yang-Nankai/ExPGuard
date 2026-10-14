if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadScripts);
} else {
  loadScripts();
}

function loadScripts() {
  appendScriptFile();
  loadFacebookSdk();
}

function appendScriptFile() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("dist/assets/index-5af010a3.js");

  (document.head || document.documentElement).appendChild(script);
}

function loadFacebookSdk() {
  new Promise((resolve, reject) => {
    if (window.FB) {
      resolve(window.FB);
    }

    const src = chrome.runtime.getURL("facebookSDK.js");
    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => resolve(window.FB), false);
    script.addEventListener(
      "error",
      () => reject(`Error loading Facebook JS SDK from ${src}`),
      false
    );

    const sibling = document.getElementsByTagName("script")[0];
    sibling.parentNode.insertBefore(script, sibling);
  });
}

// Event variables
// ----------------------------------
const events = [
  "isExtensionEnabled",
  "speedRate",
  "setCaptions",
  "toggleCaption",
  "isUserLoggedIn",
  "isShowSupported",
];

// Events from popup to script
//-----------------------------------

// From storage
chrome.storage.sync.get([...events], (payload) => {
  const keys = Object.keys(payload);
  for (const key of keys) {
    serveEvent(payload, key);
  }
});

// Realtime
chrome.runtime.onMessage.addListener(function (request) {
  const key = Object.keys(request)[0];
  serveEvent(request, key);
});

// Events from script to popup
//-----------------------------------

for (let event of events) {
  window.addEventListener(event, (payload) => {
    chrome.storage.sync.set({
      [event]: payload.detail[event],
    });
  });
}

// Helpers
// ----------------------------------

const serveEvent = (array, key) => {
  const stateEvent = new CustomEvent(key, {
    detail: { [key]: array[key] },
  });
  window.dispatchEvent(stateEvent);
};
