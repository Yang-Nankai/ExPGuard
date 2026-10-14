window.onload = () => {
  let gaea_plugin_token = localStorage.getItem("gaea_plugin_token");
  let gaea_plugin_status = localStorage.getItem("gaea_plugin_status");
  console.log("gaea_plugin_token", gaea_plugin_token);
  console.log("gaea_plugin_status", gaea_plugin_status);
  if (gaea_plugin_token) {
    chrome.runtime.sendMessage({
      gaea_plugin_token: gaea_plugin_token,
    });
  }

  if (gaea_plugin_status) {
    chrome.runtime.sendMessage({
      gaea_plugin_status: gaea_plugin_status,
    });
  }
};

window.onstorage = (event) => {
  if (event.key === "gaea_plugin_token") {
    chrome.runtime.sendMessage({
      gaea_plugin_token: event.newValue,
    });
  }
  if (event.key === "gaea_plugin_status") {
    chrome.runtime.sendMessage({
      gaea_plugin_status: event.newValue,
    });
  }


};
// background--->content_scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FROM_EXTENSION_GAEA") {
    window.postMessage({ type: "FROM_CHROME_EXTENSION_GAEA", disconnect: message.disconnect, dataInfo: message.dataInfo }, "*");
  }
});

window.addEventListener("requestPluginVersion", (event) => {
  if (event.detail.type === "REQUEST_PLUGIN_VERSION") {
    try {
      chrome.runtime.sendMessage({ type: "REQUEST_PLUGIN_VERSION" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          return;
        }

        window.postMessage({ type: "FROM_CONTENT_SCRIPT_VERSION", version: response.version }, event.origin);
        if (event.detail.token) {
          try {
            chrome.runtime.sendMessage({ gaea_plugin_token: event.detail.gaea_plugin_token });
            chrome.runtime.sendMessage({ gaea_plugin_status: event.detail.gaea_plugin_status });
          } catch (error) {
            console.error('Extension context invalidated when sending details:', error);
          }

        }
      });
    } catch (error) {
      console.error('Extension context invalidated in version request:', error);
    }
  }
});
window.addEventListener("openPlugin", (event) => {
  if (event.detail.type === "OPEN_PLUGIN") {
    try {
      chrome.runtime.sendMessage({ type: "OPEN_PLUGIN" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error in open plugin:', chrome.runtime.lastError);
          return;
        }
        window.postMessage({ type: "PLUGIN_OPENED", success: response.success }, event.origin);
      });
    } catch (error) {
      console.error('Extension context invalidated in open plugin:', error);
    }
  }
});



