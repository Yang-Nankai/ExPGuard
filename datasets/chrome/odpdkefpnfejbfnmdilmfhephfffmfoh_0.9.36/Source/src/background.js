/* global chrome, importScripts, globalThis */

// Load build-time configuration (env, port, hostname, origin) into the
// service worker global. Must run before any code that reads
// READLANG_EXTENSION_CONFIG. Guarded for Firefox MV3 event-page backgrounds,
// where importScripts is not available — there the manifest's `scripts` array
// loads extensionConfig.js before this file instead.
if (typeof importScripts === "function") {
  importScripts("./extensionConfig.js");
}

const readlangHostname = globalThis.READLANG_EXTENSION_CONFIG.hostname;

const activeTabIds = {};
const tabsWithSetGlobals = {};
let dictionaryWindow;

const verbose = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.setUninstallURL("https://forms.gle/7kj5akEy8SohwwnE6");
});

const runScript = async function (name, tabId) {
  switch (name) {
    case "webReader":
      const webReaderFiles = [];
      if (!tabsWithSetGlobals[tabId]) {
        // extensionConfig.js must run before setGlobals.js (setGlobals reads
        // globalThis.READLANG_EXTENSION_CONFIG).
        webReaderFiles.push("src/extensionConfig.js");
        webReaderFiles.push("src/setGlobals.js");
        tabsWithSetGlobals[tabId] = true;
      }
      webReaderFiles.push("src/build/embeddedWebReader.js");

      await chrome.scripting.executeScript({
        target: { tabId },
        files: webReaderFiles,
      });
      break;

    case "importer":
      const importerFiles = [
        // External modules (jQuery is bundled in importerBookmarklet.js)
        "src/external/Readability.js",
      ];

      // Only inject setGlobals.js if it hasn't been injected yet in this tab
      if (!tabsWithSetGlobals[tabId]) {
        // extensionConfig.js must run before setGlobals.js (setGlobals reads
        // globalThis.READLANG_EXTENSION_CONFIG).
        importerFiles.push("src/extensionConfig.js");
        importerFiles.push("src/setGlobals.js");
        tabsWithSetGlobals[tabId] = true;
      }

      // Our source: Bookmarklet (includes bundled jQuery)
      importerFiles.push("src/build/importerBookmarklet.js");

      await chrome.scripting.executeScript({
        target: { tabId },
        files: importerFiles,
      });
      break;

    default:
      throw new Error("Unknown script name: " + name);
  }
};

// Firefox MV3 treats all host_permissions as optional, so the user must
// explicitly grant <all_urls> before the web reader can do anything useful on
// a third-party site. Request synchronously from the click handler so Firefox
// can tie the prompt to the toolbar-click user gesture (the gesture is lost
// across awaits and rejected outright from message handlers).
//
// permissions.request resolves true immediately when already granted, so it
// is safe to call unconditionally on every click.
//
// Chrome handles host permissions differently: matches declared in
// content_scripts are granted at install, and Chrome rejects permissions.request
// for any permission not also listed in optional_host_permissions. So this
// path is Firefox-only; Chrome falls through to the original behavior.
const ALL_URLS_ORIGINS = ["<all_urls>"];
const isFirefox = chrome.runtime.getURL("").startsWith("moz-extension://");

chrome.action.onClicked.addListener((tab) => {
  if (!isFirefox) {
    runScript("webReader", tab.id);
    return;
  }
  chrome.permissions
    .request({ origins: ALL_URLS_ORIGINS })
    .then((granted) => {
      if (granted) {
        runScript("webReader", tab.id);
      }
    })
    .catch((error) => {
      console.error("permissions.request failed:", error);
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    if (verbose) {
      console.log(
        "background.js received background message: ",
        request,
        sender,
        sendResponse
      );
    }
    const data = request.data?.data;
    switch (request.message) {
      case "newPageLoaded":
        if (activeTabIds[sender.tab.id]) {
          runScript("webReader", sender.tab.id);
          sendResponse(true);
        } else {
          sendResponse(false);
        }
        break;
      case "webReaderLoaded":
        if (data.readlangHostname === readlangHostname) {
          activeTabIds[sender.tab.id] = true;
          sendResponse(true);
        }
        break;
      case "closeWebReader":
        delete activeTabIds[sender.tab.id];
        break;
      case "openDictionary":
        updateDictionaryWindow(data.url, function (updated) {
          if (!updated) {
            openDictionaryWindow(data.url);
          }
        });
        break;
      case "updateDictionary":
        updateDictionaryWindow(data.url);
        break;
      case "closeDictionary":
        closeDictionaryWindow();
        break;
      case "openWebImporter":
        runScript("importer", sender.tab.id);
        break;
      case "serverRequest": {
        const queryStringSuffix =
          data.method === "GET" && data.data
            ? `?${new URLSearchParams(data.data)}`
            : "";

        const url = `${data.url}${queryStringSuffix}`;
        let response;
        try {
          response = await fetch(url, {
            method: data.method,
            headers: {
              Client: "readlang-chrome-extension",
              "X-Extension-Version": chrome.runtime.getManifest().version,
              ...(data.data ? { "Content-Type": "application/json" } : {}),
            },
            body:
              data.method !== "GET" && data.data
                ? JSON.stringify(data.data)
                : undefined,
          });
        } catch (error) {
          console.error("Error making request from background.js: ", error);
        }

        if (response.status === 200) {
          if (data.url.endsWith("/api/tts")) {
            const dataURI = await response.blob().then(
              (blob) =>
                new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result);
                  reader.readAsDataURL(blob);
                })
            );

            sendResponse({
              status: response.status,
              data: dataURI,
            });
          } else if (data.dataType === "text") {
            // Handle text responses (e.g., transliteration API)
            const responseText = await response.text();

            sendResponse({
              status: response.status,
              data: responseText,
            });
          } else {
            const responseJson = await response.json();

            if (verbose) {
              console.log("got result: ", response);
              console.log("got result json: ", responseJson);
            }

            sendResponse({
              status: response.status,
              data: responseJson,
            });
          }
        } else {
          let responseJson;
          try {
            responseJson = await response.json();
          } catch (error) {
            // Ignore error
          }

          sendResponse({
            status: response.status,
            data: responseJson,
          });
        }
        break;
      }
      default:
        console.error("background page message not recognised");
    }

    return true;
  })();
  return true;
});

const openDictionaryWindow = function (url) {
  chrome.windows.getCurrent(function (currentWindow) {
    const windowWidth = 425;
    const spaceOnLeft = currentWindow.left;
    let left, spaceNeeded;

    if (spaceOnLeft === 0) {
      // No space on the left, so open the dictionary window on the right
      left = currentWindow.width - windowWidth;
      chrome.windows.update(currentWindow.id, {
        width: currentWindow.width - windowWidth,
      });
    } else {
      // Open the dictionary window on the left
      left = Math.max(currentWindow.left - windowWidth, 0);
      spaceNeeded = windowWidth - spaceOnLeft;
      if (spaceNeeded > 0) {
        chrome.windows.update(currentWindow.id, {
          width: currentWindow.width - spaceNeeded,
          left: currentWindow.left + spaceNeeded,
        });
      }
    }

    chrome.windows.create(
      {
        url: url,
        top: currentWindow.top,
        left: left,
        width: windowWidth,
        height: currentWindow.height,
        type: "popup",
      },
      function (newWindow) {
        dictionaryWindow = newWindow;
      }
    );
  });
};

const updateDictionaryWindow = function (url, callback) {
  callback = callback || function () {};

  if (dictionaryWindow && dictionaryWindow.tabs && dictionaryWindow.tabs[0]) {
    chrome.tabs.get(dictionaryWindow.tabs[0].id, function (tab) {
      if (tab) {
        chrome.tabs.update(dictionaryWindow.tabs[0].id, { url: url });
        callback(true);
      } else {
        callback(false);
      }
    });
  } else {
    callback(false);
  }
};

const closeDictionaryWindow = function () {
  if (dictionaryWindow) {
    chrome.windows.remove(dictionaryWindow.id);
  }
};

if (chrome.contextMenus) {
  chrome.contextMenus.create({
    id: "import-to-readlang",
    title: "Import to Readlang",
    contexts: ["all"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case "import-to-readlang":
        runScript("importer", tab.id);
        break;
    }
  });
}

if (chrome.commands) {
  chrome.commands.onCommand.addListener((command, tab) => {
    switch (command) {
      case "import":
        runScript("importer", tab.id);
        break;
    }
  });
}

// Clean up tracking when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabsWithSetGlobals[tabId];
  delete activeTabIds[tabId];
});

// Clear injection tracking when page refreshes or navigates
// Note: only clear tabsWithSetGlobals (which tracks per-page injection state).
// Keep activeTabIds so the web reader auto-re-injects on the new page.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    delete tabsWithSetGlobals[tabId];
  }
});
