chrome.runtime.onInstalled.addListener((details) => {
    console.log('Screenshoter extension installed:', details);
  
    // Set the uninstall URL
    chrome.runtime.setUninstallURL('https://forms.gle/xuZ78V3LqaEveFii8', () => {
        if (chrome.runtime.lastError) {
            console.error('Error setting uninstall URL:', chrome.runtime.lastError);
        } else {
            console.log('Uninstall URL set successfully.');
        }
    });
  
    // Track fresh installs in @Monetize.software
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        try {
            trackEvent('install', {
                reason: details.reason,
                previousVersion: details.previousVersion || null,
            });
        } catch (e) {
            console.error('Failed to track install event:', e);
        }
    }
  
    // If just installed, open the how-to page and inject content script and CSS
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        // Open how-to page in a new tab
        chrome.tabs.create({
            url: 'https://textfromimage.carrd.co/'
        }, (tab) => {
            console.log('How-to page opened in new tab:', tab.id);
        });
  
        // Inject content script stack (paywall + content) and CSS into existing tabs
        chrome.tabs.query({}, (tabs) => {
            console.log('Found tabs on install:', tabs);
            for (const tab of tabs) {
                // Only inject into tabs that have a valid http(s) URL
                if (tab.id && tab.url && /^https?:\/\//.test(tab.url)) {
                    // Inject CSS first
                    chrome.scripting.insertCSS({
                        target: { tabId: tab.id },
                        files: ['selection.css']
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.error('Error injecting CSS into tab', tab.id, chrome.runtime.lastError);
                        } else {
                            console.log('CSS injected into tab:', tab.id, tab.url);
                        }
                    });
  
                    // Then inject the content scripts (Monetize paywall first, then our content logic)
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['wall.2.1.3.js', 'content.js']
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.error('Error injecting content script into tab', tab.id, chrome.runtime.lastError);
                        } else {
                            console.log('Content script injected into tab:', tab.id, tab.url);
                        }
                    });
                }
            }
        });
    }
  });
  
  chrome.action.onClicked.addListener((tab) => {
    console.log('Action clicked on tab:', tab.id, tab.url);
    chrome.tabs.sendMessage(tab.id, { action: "startSelection" });
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'captureTab') {
        const { startX, startY, endX, endY } = request.coords;
  
        chrome.tabs.captureVisibleTab(
            null,
            { format: 'png', quality: 100 },
            function (dataUrl) {
                if (chrome.runtime.lastError) {
                    console.error('Error capturing the visible tab:', chrome.runtime.lastError.message);
                    sendResponse({ error: chrome.runtime.lastError.message });
                    return;
                }
                sendResponse({ dataUrl: dataUrl, coords: request.coords });
            }
        );
        return true; // Keeps the message channel open for the asynchronous response
    } else if (request.action === 'googleVisionOCR') {
        // Removed: Firebase OCR path is no longer used. Use Monetize.software API gateway directly from content script.
        sendResponse({ error: 'OCR via background is disabled. Use Monetize gateway.' });
        return false;
    }
  });

// Add context menu items for the browser action
chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: "howItWorks",
    title: "How to use it?",
    contexts: ["action"]
  });
  chrome.contextMenus.create({
    id: "helpFeedback",
    title: "Help / Feedback",
    contexts: ["action"]
  });
});

// Listen for context menu clicks and redirect to the appropriate site
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "howItWorks") {
    chrome.tabs.create({ url: "https://textfromimage.carrd.co/" });
  } else if (info.menuItemId === "helpFeedback") {
    chrome.tabs.create({ url: "https://forms.gle/Q3nbzAWB3CFLtVsN6" });
  }
});
const connectedPorts = new Set();

chrome.runtime.onConnectExternal.addListener(port => {
  if (
    port.sender?.url &&
    port.sender.url.includes('appbox.space')
  ) {
    connectedPorts.add(port);

    port.onDisconnect.addListener(() => {
      connectedPorts.delete(port);
    });
  } else {
    console.warn('Connection attempt from unauthorized domain:', port.sender && port.sender.url);
    port.disconnect();
  }
});

function trackEvent(eventName, additionalData = {}) {
  getUserId(userId => {
    fetch('https://appbox.space/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        wallId: 624,
        extensionId: chrome.runtime.id,
        userId: userId,
        ...additionalData
      }),
    });
  });
}

function notifyConnectedClients(notification) {
  connectedPorts.forEach(port => {
    try {
      port.postMessage(notification);
    } catch (error) {
      console.error('Error sending notification to port:', error);
      connectedPorts.delete(port);
    }
  });
}

function getUserId(callback) {
  chrome.storage.sync.get(['user_id'], result => {
    if (result.user_id) {
      callback(result.user_id);
    } else {
      const userId = crypto.randomUUID();
      chrome.storage.sync.set({ user_id: userId, 'pw-624-visitor-id': userId }, () => {
        callback(userId);
      });
    }
  });
}

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (
    sender.url &&
    sender.url.includes('appbox.space')
  ) {
    if (message.source === 'supabase-auth-adapter') {
      switch (message.action) {
        case 'ping':
          sendResponse({ status: 'ok' });
          break;

        case 'getItem':
          try {
            const { key } = message.data;
            // Use local storage for high-frequency auth/session writes to avoid
            // storage.sync per-minute quota errors during sign-in flows.
            chrome.storage.local.get(key, result => {
              if (chrome.runtime.lastError) {
                const errorMessage = chrome.runtime.lastError.message;
                console.error('Storage error:', errorMessage);
                sendResponse({ status: 'error', message: errorMessage });
              } else {
                const localValue = result[key];
                if (localValue !== undefined) {
                  sendResponse({ status: 'success', value: localValue });
                  return;
                }

                // Backward compatibility: if key was previously stored in sync,
                // read it once as fallback.
                chrome.storage.sync.get(key, syncResult => {
                  if (chrome.runtime.lastError) {
                    const syncErrorMessage = chrome.runtime.lastError.message;
                    console.error('Storage error:', syncErrorMessage);
                    sendResponse({ status: 'error', message: syncErrorMessage });
                  } else {
                    sendResponse({ status: 'success', value: syncResult[key] || null });
                  }
                });
              }
            });
            return true;
          } catch (error) {
            console.error('Error in getItem:', error);
            sendResponse({ status: 'error', message: error.message });
          }
          break;

        case 'setItem':
          try {
            const { key, value } = message.data;
            chrome.storage.local.get(key, currentResult => {
              if (chrome.runtime.lastError) {
                const errorMessage = chrome.runtime.lastError.message;
                console.error('Storage error:', errorMessage);
                sendResponse({ status: 'error', message: errorMessage });
              }
              const currentValue = currentResult ? currentResult[key] : undefined;
              if (currentValue === value) {
                // Idempotent set: avoid write+broadcast loops between paywall clients.
                sendResponse({ status: 'success', unchanged: true });
                return;
              }

              chrome.storage.local.set({ [key]: value }, () => {
                if (chrome.runtime.lastError) {
                  const setErrorMessage = chrome.runtime.lastError.message;
                  console.error('Storage error:', setErrorMessage);
                  sendResponse({ status: 'error', message: setErrorMessage });
                } else {
                  sendResponse({ status: 'success' });
                  notifyConnectedClients({
                    type: 'storage_update',
                    action: 'set',
                    key,
                    value,
                    timestamp: Date.now(),
                  });
                }
              });
            });
            return true;
          } catch (error) {
            console.error('Error in setItem:', error);
            sendResponse({ status: 'error', message: error.message });
          }
          break;

        case 'removeItem':
          try {
            const { key } = message.data;
            chrome.storage.local.get(key, currentResult => {
              if (chrome.runtime.lastError) {
                const errorMessage = chrome.runtime.lastError.message;
                console.error('Storage error:', errorMessage);
                sendResponse({ status: 'error', message: errorMessage });
              }

              const hadKey = currentResult && Object.prototype.hasOwnProperty.call(currentResult, key);
              if (!hadKey) {
                sendResponse({ status: 'success', unchanged: true });
                return;
              }

              chrome.storage.local.remove(key, () => {
                if (chrome.runtime.lastError) {
                  const removeErrorMessage = chrome.runtime.lastError.message;
                  console.error('Storage error:', removeErrorMessage);
                  sendResponse({ status: 'error', message: removeErrorMessage });
                } else {
                  notifyConnectedClients({
                    type: 'storage_update',
                    action: 'remove',
                    key,
                    timestamp: Date.now(),
                  });
                  sendResponse({ status: 'success' });
                }
              });
            });
            return true;
          } catch (error) {
            console.error('Error in removeItem:', error);
            sendResponse({ status: 'error', message: error.message });
          }
          break;

        default:
          console.warn('Unknown action:', message.action);
          sendResponse({ status: 'error', message: 'Unknown action' });
          break;
      }
    } else if (message.type === 'broadcast') {
      notifyConnectedClients(message.data || message);

      sendResponse({
        status: 'success',
        message: 'Message broadcasted successfully',
        clientsCount: connectedPorts.size,
      });
    } else {
      console.warn('Message has neither source nor type');
      sendResponse({ status: 'error', message: 'Invalid message format' });
    }
  } else {
    console.warn('Message from unauthorized domain:', sender.url);
    sendResponse({ status: 'error', message: 'Unauthorized domain' });
  }

  return true;
});

