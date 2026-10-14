chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // Code to be executed on first install
    // eg. open a tab with a url
    chrome.tabs.create({
      url: "https://ext.aitools.band/image-and-photo-downloader/congrats",
    });
    // Track install event for paywall
    trackEvent('install');
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // When extension is updated
  } else if (details.reason === chrome.runtime.OnInstalledReason.CHROME_UPDATE) {
    // When browser is updated
  } else if (details.reason === chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE) {
    // When a shared module is updated
  }
});

const UNINSTALL_URL = "https://ext.aitools.band/image-and-photo-downloader/uninstall";
chrome.runtime.setUninstallURL(UNINSTALL_URL);

// ==================== PAYWALL INTEGRATION ====================

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
    console.warn('Connection attempt from unauthorized domain:', port.sender?.url);
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
        wallId: 657,
        extensionId: chrome.runtime.id,
        userId: userId,
        ...additionalData,
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
      chrome.storage.sync.set({ user_id: userId, ['pw-657-visitor-id']: userId }, () => {
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
            chrome.storage.sync.get(key, result => {
              if (chrome.runtime.lastError) {
                const errorMessage = chrome.runtime.lastError.message;
                console.error('Storage error:', errorMessage);
                sendResponse({ status: 'error', message: errorMessage });
              } else {
                sendResponse({ status: 'success', value: result[key] || null });
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
            chrome.storage.sync.set({ [key]: value }, () => {
              if (chrome.runtime.lastError) {
                const errorMessage = chrome.runtime.lastError.message;
                console.error('Storage error:', errorMessage);
                sendResponse({ status: 'error', message: errorMessage });
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
            return true;
          } catch (error) {
            console.error('Error in setItem:', error);
            sendResponse({ status: 'error', message: error.message });
          }
          break;

        case 'removeItem':
          try {
            const { key } = message.data;
            chrome.storage.sync.remove(key, () => {
              if (chrome.runtime.lastError) {
                const errorMessage = chrome.runtime.lastError.message;
                console.error('Storage error:', errorMessage);
                sendResponse({ status: 'error', message: errorMessage });
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
