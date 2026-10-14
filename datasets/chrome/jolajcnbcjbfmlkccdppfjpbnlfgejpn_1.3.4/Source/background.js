try {
    importScripts('js/config.js');
} catch (e) {
    console.error("Import failed:", e);
}

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: "https://darkmodesheets.com/congrats" });
    getUserId(() => {
        console.log("User initialized");
    });
    trackEvent('install');
	chrome.storage.local.remove(['cached_access_result', 'last_access_check']);
  }
});

const connectedPorts = new Set();

chrome.runtime.onConnectExternal.addListener(port => {
  if (port.sender?.url && port.sender.url.includes('appbox.space')) {
    connectedPorts.add(port);
    port.onDisconnect.addListener(() => {
      connectedPorts.delete(port);
    });
  } else {
    console.warn('Connection attempt from unauthorized domain:', port.sender?.url);
    port.disconnect();
  }
});

const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";

function trackEvent(eventName, additionalData = {}) {
  getUserId(userId => {
    fetch('https://appbox.space/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        wallId: wallId,
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
      chrome.storage.sync.set({ user_id: userId, [`pw-${wallId}-visitor-id`]: userId }, () => {
        callback(userId);
      });
    }
  });
}

let syncQueue = {};
let syncTimeout = null;

function flushSyncQueue() {
    if (Object.keys(syncQueue).length > 0) {
        chrome.storage.sync.set(syncQueue, () => {
            if (chrome.runtime.lastError) {
                console.error("Sync error:", chrome.runtime.lastError.message);
            } else {
                console.log("Sync batch saved:", syncQueue);
            }
            syncQueue = {};
        });
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.source === 'supabase-auth-adapter' && message.action === 'ping') {
        sendResponse({ status: 'ok' });
    }
    return true;
});

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (sender.url && sender.url.includes('appbox.space')) {
    if (message.source === 'supabase-auth-adapter') {
      switch (message.action) {
        case 'ping':
          sendResponse({ status: 'ok' });
          break;

        case 'getItem':
          try {
            const { key } = message.data;
            if (syncQueue[key] !== undefined) {
                sendResponse({ status: 'success', value: syncQueue[key] });
            } else {
                chrome.storage.sync.get(key, result => {
                    if (chrome.runtime.lastError) {
                        sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
                    } else {
                        sendResponse({ status: 'success', value: result[key] || null });
                    }
                });
            }
            return true;
          } catch (error) {
            sendResponse({ status: 'error', message: error.message });
          }
          break;

        case 'setItem':
          try {
            const { key, value } = message.data;
            syncQueue[key] = value;
            chrome.storage.local.set({ [key]: value });
            clearTimeout(syncTimeout);
            syncTimeout = setTimeout(flushSyncQueue, 500);
            sendResponse({ status: 'success' });
            notifyConnectedClients({
              type: 'storage_update',
              action: 'set',
              key,
              value,
              timestamp: Date.now(),
            });
          } catch (error) {
            sendResponse({ status: 'error', message: error.message });
          }
          break;

        case 'removeItem':
          try {
            const { key } = message.data;
            chrome.storage.sync.remove(key, () => {
              if (chrome.runtime.lastError) {
                sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
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
      sendResponse({ status: 'error', message: 'Invalid message format' });
    }
  } else {
    console.warn('Message from unauthorized domain:', sender.url);
    sendResponse({ status: 'error', message: 'Unauthorized domain' });
  }

  return true;
});

chrome.alarms.create('checkSubscriptionAlarm', { periodInMinutes: 180 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkSubscriptionAlarm') {
        chrome.storage.local.remove(['last_access_check', 'cached_access_result']);
    }
});