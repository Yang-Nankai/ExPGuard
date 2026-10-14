// Custom logging function
let isLoggingEnabled = false;
function log(...args) {
    if (isLoggingEnabled) {
        console.log('[WMX]', ...args);
    }
}

let extensionFonts;
let syncComplete = false;

// Prepare font list when extension loads
chrome.fontSettings.getFontList(function (array) {
  extensionFonts = array;
  log("Fonts prepared:", extensionFonts.length, "fonts");
});

// listening calls from wordmark.it
async function messageListener(request, sender, sendResponse) {
  try {
    // If fonts aren't loaded yet, load them
    if (!extensionFonts) {
      extensionFonts = await chrome.fontSettings.getFontList();
    }
    
    // Verify fonts have the required structure
    if (!extensionFonts || !Array.isArray(extensionFonts) || extensionFonts.length === 0) {
      log("No fonts available to send");
      sendResponse({ error: "No fonts available" });
      return true;
    }
    
    // Ensure each font has a displayName property as expected by wordmark.it
    const fontsToSend = extensionFonts.map(font => ({
      fontId: font.fontId || "",
      displayName: font.displayName || font.fontId || ""
    }));
    
    sendResponse({ result: fontsToSend });
    syncComplete = true;
    return true;
  } catch (error) {
    log("Error in messageListener:", error);
    sendResponse({ error: error.message });
    return true;
  }
}

// send back sync status to popup when a message is received
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'popup') {
    port.onMessage.addListener(function (message) {
      if (message.action === "getFontInfo") {
        // If fonts aren't loaded yet, load them
        if (!extensionFonts) {
          chrome.fontSettings.getFontList(function (array) {
            extensionFonts = array;
            port.postMessage({ 
              syncComplete: syncComplete,
              systemFonts: extensionFonts
            });
          });
        } else {
          port.postMessage({ 
            syncComplete: syncComplete,
            systemFonts: extensionFonts
          });
        }
      } else {
        // For backward compatibility
        port.postMessage({ syncComplete: syncComplete });
      }
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateWebFontCount') {
    // Update the extension badge with the web font count
    const count = message.count || 0;
    
    // Only show the badge if there are web fonts
    if (count > 0) {
      // Convert count to string and set badge text
      chrome.action.setBadgeText({ 
        text: count.toString(),
        tabId: sender.tab.id
      });
      
      // Set badge background color
      chrome.action.setBadgeBackgroundColor({ 
        color: 'hsl(260, 80%, 45%)',
        tabId: sender.tab.id
      });
    } else {
      // Clear the badge if no web fonts
      chrome.action.setBadgeText({ 
        text: '',
        tabId: sender.tab.id
      });
    }
  } else if (message.action === 'toggleOverlay') {
    // Forward the toggle message to content script
    chrome.tabs.sendMessage(sender.tab.id, { action: 'toggleOverlay' }, (response) => {
      if (response && response.success) {
        sendResponse({ success: true });
      }
    });
    return true; // Keep the message channel open for async response
  }
});

// Handle extension icon click to toggle the font preview overlay
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'toggleOverlay' });
});

// Listen for external messages from wordmark.it
chrome.runtime.onMessageExternal.addListener(messageListener);