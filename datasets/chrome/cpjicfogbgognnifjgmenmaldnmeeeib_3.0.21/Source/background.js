// Initialize ping timeout and interval ID
let timeoutPing = 30000; // Default ping interval
let tokenInfo; // User token
// let browser_id; // Browser ID
let pingIntervalId = null; // ID for the ping interval
let ipInfoIntervalId = null
const API_TEST = "https://api.aigaea.net";
const JUMP_URL = "https://app.aigaea.net"

// Function to call API endpoints
const callAPI = async (url, data, method = 'POST') => {
  if (!tokenInfo) return { success: false };

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenInfo}`,
    },
    ...(method !== 'GET' && data ? { body: JSON.stringify(data) } : {})
  };

  return fetch(url, options); // Make the API call
};

// Logout function
const logoutFn = async () => {
  try {
    await Promise.all([
      chrome.storage.local.remove("gaea_plugin_token"),
      chrome.storage.local.remove("gaea_plugin_status"),
    ]);
  } catch (error) {
    console.log('Error during logout:', error);
  }
};
// Listen for messages from React components
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (!chrome.runtime.id) {
    console.error('Extension context is invalid');
    return false;
  }
  if (request["gaea_plugin_token"]) {
    tokenInfo = request["gaea_plugin_token"];
    await chrome.storage.local.set({ gaea_plugin_token: tokenInfo });
    // await initializePing();
  }
  if (request["gaea_plugin_status"]) {
    await chrome.storage.local.set({ gaea_plugin_status: request["gaea_plugin_status"] });
  }


  if (request.action === "logout") {
    try {
      await logoutFn();
      sendResponse({ success: true });
    } catch (error) {
      // console.error('Error during logout:', error);
      sendResponse({ success: false });
    }
  }

  if (request.action === "reloadData") {
    // await Promise.all([initializePing(), getEarnInfo()])
    sendResponse({ success: true });
  }
  if (request.type === "REQUEST_PLUGIN_VERSION") {
      try {
      const manifest = chrome.runtime.getManifest();
      sendResponse({ version: manifest.version });
    } catch (error) {
      console.error('Error getting manifest:', error);
      sendResponse({ version: null });
    }
    return true;
  }
  if (request.type === "OPEN_PLUGIN") {
 try {
      const manifest = chrome.runtime.getManifest();
      if (manifest.action && manifest.action.default_popup) {
        chrome.action.openPopup();
      } else {
        chrome.tabs.create({ 
          url: chrome.runtime.getURL("index.html"),
          active: true 
        });
      }
      sendResponse({ success: true });
    } catch (error) {
      console.error('Failed to open plugin:', error);
      sendResponse({ success: false });
    }
    return true;
  }

});

// Check permission and initialize
const checkPermission = async () => {
  const { gaea_plugin_token } = await chrome.storage.local.get(["gaea_plugin_token"]);
  const { gaea_plugin_status } = await chrome.storage.local.get(["gaea_plugin_status"]);
  if (gaea_plugin_status) {
    await chrome.storage.local.set({ gaea_plugin_status });
  }
  if (gaea_plugin_token) {
    tokenInfo = gaea_plugin_token;
    await chrome.storage.local.set({ gaea_plugin_token });

    // await initializePing();
  } else {
    chrome.tabs.create({ url: `${JUMP_URL}`, active: false });
  }


};

checkPermission();

