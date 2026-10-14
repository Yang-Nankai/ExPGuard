// If extension does not have a popup, this will be executed
// when the extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
    try {
        await chrome.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            files: ['js/content-app.js'],
        });
    } catch (e) {
        console.log(e);
        // Open in a new tab if the content script cannot be injected
        chrome.tabs.create({
            active: true,
            url: '/content.html?tab=1',
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('received message from content script: ', request.message);

    // This is an example of how the content application can be shown
    // from the extension popup
    if (request.message === 'show_on_page_content') {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            async (tabs) => {
                try {
                    const tabId = tabs[0].id;
                    await chrome.scripting.executeScript({
                        target: {
                            tabId: tabId,
                        },
                        files: ['js/content-app.js'],
                    });
                    // need to send any response, otherwise the callback
                    // in the popup will not work
                    sendResponse({});
                } catch (e) {
                    sendResponse({
                        error: 'Unable to launch the converter on this page.',
                    });
                    console.log(e);
                }
            }
        );
    }

    if (request.message === 'show_converter_in_new_tab') {
        chrome.tabs.create({
            active: true,
            url: '/content.html?tab=1',
        });
    }

    if (request.message == 'close_content_app') {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            async (tabs) => {
                try {
                    const tabId = tabs[0].id;
                    await chrome.scripting.executeScript({
                        target: {
                            tabId: tabId,
                        },
                        function: () => {
                            const contentApp = document.getElementById(
                                `app-container-${chrome.runtime.id}`
                            );
                            if (contentApp) {
                                contentApp.remove();
                            }
                        },
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        );
    }

    // Indicates that an asynchronous response is being processed
    // (sendResponse is not working for me without this)
    // https://stackoverflow.com/q/48107746
    return true;
});

// Hotkeys
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case 'open-heic-to-jpg-converter':
            chrome.tabs.query(
                { active: true, currentWindow: true },
                async (tabs) => {
                    try {
                        const tabId = tabs[0].id;
                        await chrome.scripting.executeScript({
                            target: {
                                tabId: tabId,
                            },
                            files: ['js/content-app.js'],
                        });
                        // need to send any response, otherwise the callback
                        // in the popup will not work
                        sendResponse({});
                    } catch (e) {
                        sendResponse({
                            error: 'Unable to launch the converter on this page.',
                        });
                        console.log(e);
                    }
                }
            );
            break;
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    // add welcome page
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        // Code to be executed on first install
        // eg. open a tab with a url
        chrome.tabs.create({
            url: '/welcome.html',
        });
        // save install date
        const installDate = new Date().toISOString();
        chrome.storage.sync.set({ installDate });

        trackEvent('install');
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        // When extension is updated
    } else if (
        details.reason === chrome.runtime.OnInstalledReason.CHROME_UPDATE
    ) {
        // When browser is updated
    } else if (
        details.reason === chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE
    ) {
        // When a shared module is updated
    }
});

// Set uninstall page
chrome.runtime.setUninstallURL('https://forms.gle/XeTVo69qNX2H5a7N7');

const connectedPorts = new Set();

chrome.runtime.onConnectExternal.addListener((port) => {
    if (
        port.sender?.url &&
        (port.sender.url.includes('onlineapp.pro') ||
            port.sender.url.includes('onlineapp.live') ||
            port.sender.url.includes('onlineapp.stream'))
    ) {
        connectedPorts.add(port);

        port.onDisconnect.addListener(() => {
            connectedPorts.delete(port);
        });
    } else {
        console.warn(
            'Connection attempt from unauthorized domain:',
            port.sender?.url
        );
        port.disconnect();
    }
});

function trackEvent(eventName, additionalData = {}) {
    getUserId((userId) => {
        fetch('https://onlineapp.pro/api/track-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: eventName,
                // this will be replaced during build
                wallId: parseInt('367'),
                extensionId: chrome.runtime.id,
                userId: userId,
                ...additionalData,
            }),
        });
    });
}

function notifyConnectedClients(notification) {
    connectedPorts.forEach((port) => {
        try {
            port.postMessage(notification);
        } catch (error) {
            console.log('Error sending notification to port:', error);
            connectedPorts.delete(port);
        }
    });
}

function getUserId(callback) {
    chrome.storage.sync.get(['user_id'], (result) => {
        if (result.user_id) {
            callback(result.user_id);
        } else {
            const userId = crypto.randomUUID();
            chrome.storage.sync.set({ user_id: userId }, () => {
                callback(userId);
            });
        }
    });
}

chrome.runtime.onMessageExternal.addListener(
    (message, sender, sendResponse) => {
        if (
            sender.url &&
            (sender.url.includes('onlineapp.pro') ||
                sender.url.includes('onlineapp.live') ||
                sender.url.includes('onlineapp.stream'))
        ) {
            if (message.source === 'supabase-auth-adapter') {
                switch (message.action) {
                    case 'ping':
                        sendResponse({ status: 'ok' });
                        break;

                    case 'getItem':
                        try {
                            const { key } = message.data;
                            chrome.storage.sync.get(key, (result) => {
                                if (chrome.runtime.lastError) {
                                    const errorMessage =
                                        chrome.runtime.lastError.message;
                                    console.log('Storage error:', errorMessage);
                                    sendResponse({
                                        status: 'error',
                                        message: errorMessage,
                                    });
                                } else {
                                    sendResponse({
                                        status: 'success',
                                        value: result[key] || null,
                                    });
                                }
                            });
                            return true;
                        } catch (error) {
                            console.log('Error in getItem:', error);
                            sendResponse({
                                status: 'error',
                                message: error.message,
                            });
                        }
                        break;

                    case 'setItem':
                        try {
                            const { key, value } = message.data;
                            chrome.storage.sync.set({ [key]: value }, () => {
                                if (chrome.runtime.lastError) {
                                    const errorMessage =
                                        chrome.runtime.lastError.message;
                                    console.log('Storage error:', errorMessage);
                                    sendResponse({
                                        status: 'error',
                                        message: errorMessage,
                                    });
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
                            console.log('Error in setItem:', error);
                            sendResponse({
                                status: 'error',
                                message: error.message,
                            });
                        }
                        break;

                    case 'removeItem':
                        try {
                            const { key } = message.data;
                            chrome.storage.sync.remove(key, () => {
                                if (chrome.runtime.lastError) {
                                    const errorMessage =
                                        chrome.runtime.lastError.message;
                                    console.log('Storage error:', errorMessage);
                                    sendResponse({
                                        status: 'error',
                                        message: errorMessage,
                                    });
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
                            console.log('Error in removeItem:', error);
                            sendResponse({
                                status: 'error',
                                message: error.message,
                            });
                        }
                        break;

                    default:
                        console.warn('Unknown action:', message.action);
                        sendResponse({
                            status: 'error',
                            message: 'Unknown action',
                        });
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
                sendResponse({
                    status: 'error',
                    message: 'Invalid message format',
                });
            }
        } else {
            console.warn('Message from unauthorized domain:', sender.url);
            sendResponse({ status: 'error', message: 'Unauthorized domain' });
        }

        return true;
    }
);
