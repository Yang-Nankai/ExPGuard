// General configs
const TOKEN_KEY = 'degreed_bearer_access';
const CONTENT_JS = 'content.js';
// NOTE: Using the "on" state of the icon for the off state.
// If another "off" state is desired, we will need to get assets for the icons.
const ICON_PATH_OFF = '/assets/128_on.png';
// matchMedia('(prefers-color-scheme: dark)').matches
//   ? '/assets/128_off_dark.png'
//   : '/assets/128_off.png';
const ICON_PATH_ON = '/assets/128_on.png';
// Icon badge
const BADGE_HEX = '#e76024';
const NOTIFICATION_TIMER = 600000; // 10 mins - be judicious here
const ajaxConfig = {
    headers: {},
    cache: false,
};
// Event names
const BEARER_ACCESS_TOKEN = 'degreed_bearer_access';
const EVENT_OPEN_SLIDER = 'OPEN_SLIDER';
const EVENT_CLOSE_SLIDER = 'CLOSE_SLIDER';
const EVENT_CHECK_OPEN = 'CHECK_OPEN';
const EVENT_CHANGE_ICON = 'CHANGE_ICON';
const EVENT_SEND_USER_SELECTION = 'SEND_USER_SELECTION';
const EVENT_GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const EVENT_SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const EVENT_CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';
const EVENT_CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
const EVENT_HANDLE_PDF = 'HANDLE_PDF';
const EVENT_SET_SERVICE_HOST = 'SET_SERVICE_HOST';
const EVENT_GET_SERVICE_HOST = 'GET_SERVICE_HOST';
const EVENT_CLEAR_SERVICE_HOST = 'CLEAR_SERVICE_HOST';
// Storage
let accessToken;
let dgServiceHost;
// State
let isOpen = false;
let isEnglish = true;
(function init() {
    initBadge();
    longPollNotifications(NOTIFICATION_TIMER);
})();
// UI
function toggleIcon() {
    chrome.action.setIcon({
        path: isOpen ? ICON_PATH_ON : ICON_PATH_OFF,
    });
}
function toggleSlider() {
    // We have to message the content script on this tab to manipulate the slider
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        toggleSliderMessage(tabs[0].id);
    });
}
function toggleSliderMessage(tabId) {
    chrome.tabs.sendMessage(tabId, {
        action: isOpen ? EVENT_OPEN_SLIDER : EVENT_CLOSE_SLIDER,
    });
}
function toggleUI() {
    isOpen = !isOpen;
    toggleIcon();
    toggleSlider();
}
function setOpenState(tabId) {
    chrome.tabs.sendMessage(tabId, {
        action: EVENT_CHECK_OPEN,
    }, function (response) {
        let activate = false;
        if (response && response.isOpen) {
            activate = true;
        }
        chrome.action.setIcon({
            path: activate ? ICON_PATH_ON : ICON_PATH_OFF,
        });
        isOpen = activate;
    });
}
// Badge count
function initBadge() {
    getStoredCount(function callback(count) {
        if (isNaN(count) || count < 1) {
            return clearBadgeCount();
        }
        return setBadgeCount(count);
    });
}
function getStoredCount(callback) {
    chrome.storage.sync.get('BadgeCount', function (data) {
        if (typeof callback === 'function' && data.BadgeCount) {
            callback(data.BadgeCount);
        }
    });
}
function clearBadgeCount() {
    setBadgeCount('');
}
function setBadgeCount(badgeText) {
    if (badgeText.toString() === '0') {
        badgeText = ''; // Clear on 0
    }
    chrome.storage.sync.set({
        BadgeCount: badgeText,
    });
    chrome.action.setBadgeBackgroundColor({
        color: BADGE_HEX,
    });
    chrome.action.setBadgeText({
        text: badgeText.toString(),
    });
}
function longPollNotifications(timer) {
    chrome.storage.sync.get(['dgServiceHost'], function (result) {
        dgServiceHost = result.dgServiceHost;
    });
    getAccessTokenAndSetHeader(function callback(storage) {
        if (!storage || !storage[TOKEN_KEY]) {
            // No access token in storage (not authenticated)
            if (timer) {
                return setTimeout(function () {
                    longPollNotifications(timer);
                }, timer * 2);
            }
        }
        fetch(`${dgServiceHost}/api/extension/notifications/userunreadnotificationscount?dg-casing=camel`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                // Handle the failure and extend the timeout for the next retry
                if (timer) {
                    setTimeout(function () {
                        longPollNotifications(timer * 10);
                    }, timer);
                }
                throw new Error(`Request failed with status: ${response.status}`);
            }
        })
            .then((data) => {
            if (data && !isNaN(data.Total)) {
                setBadgeCount(data.Total);
            }
            if (timer) {
                setTimeout(function () {
                    longPollNotifications(timer);
                }, timer);
            }
        })
            .catch((error) => {
            console.error(error);
        });
    });
}
function getAccessTokenAndSetHeader(callback) {
    chrome.storage.sync.get(TOKEN_KEY, function (storage) {
        if (storage && storage[TOKEN_KEY]) {
            accessToken = storage[TOKEN_KEY];
        }
        if (typeof callback === 'function') {
            callback(storage);
        }
    });
}
// PDF Handling
function confirmPDFRedirect(interval, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabIsReady = tabs[0].url.indexOf('chrome-extension://') > -1;
        if (tabIsReady) {
            callback();
        }
        else {
            setTimeout(() => {
                confirmPDFRedirect(interval, callback);
            }, interval);
        }
    });
}
function getLanguageCode() {
    return `${chrome.i18n.getUILanguage().substring(0, 2).toLowerCase()}`;
}
chrome.windows.onCreated.addListener(() => {
    updateContextMenuLanguage();
});
// Function to update context menu with current language
function updateContextMenuLanguage() {
    // Update context menu title
    chrome.contextMenus.update('dg-context', {
        title: getSearchString(),
    });
}
// Context search
function getSearchString() {
    let contextMenuTitle = chrome.i18n.getMessage('searchDegreed');
    if (getLanguageCode() === 'en') {
        contextMenuTitle = 'Search Degreed for "%s"';
    }
    return contextMenuTitle;
}
chrome.i18n.getAcceptLanguages(function (langs) {
    let isEnBased = false;
    for (let i = 0; i < langs.length; i++) {
        if (langs[i].substr(0, 2).toLowerCase() === 'en') {
            isEnBased = true;
            break;
        }
    }
    isEnglish = isEnBased;
});
// Register Chrome listeners
chrome.action.onClicked.addListener(function (tab) {
    const onInaccessiblePage = tab.url.indexOf('chrome://extensions/') === 0;
    const onExtensionPage = tab.url.indexOf('chrome-extension://') === 0;
    const onProbablePdfPage = tab.url.indexOf('.pdf') > -1;
    if (onInaccessiblePage) {
        alert(chrome.i18n.getMessage('inaccessiblePage'));
        return;
    }
    // Mime-checking a PDF doesn't have a working solution as of 7/31/2019
    // We want to do this on a probable PDF, but don't want it triggering on
    // our own page that hosts the iframed PDF.
    if (onProbablePdfPage && !onExtensionPage) {
        // Chrome's default PDF viewer prohibits DOM access.
        // Iframing the PDF, however, loads the embedded PDF tools
        // while also allowing DOM access for our content script.
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: EVENT_HANDLE_PDF,
            });
            // The selection of 150 is somewhat arbitrary, however, the thinking
            // is 150 is often enough for the first try to succeed, and it is
            // speedy but not excessive for the following tries.
            const tryInterval = 150;
            confirmPDFRedirect(tryInterval, () => {
                toggleUI();
            });
        });
    }
    toggleUI();
    chrome.tabs.sendMessage(tab.id, {
        action: EVENT_CHECK_OPEN,
    }, function (response) {
        var _a;
        if (response) {
            setOpenState(tab.id);
        }
        else {
            // No content script available (i.e. tab open during install/update)
            const scripting = ((_a = chrome.tabs) === null || _a === void 0 ? void 0 : _a.scripting) || chrome.scripting;
            scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] }, function () {
                // Retry now we have a content script
                toggleSliderMessage(tab.id);
                toggleIcon();
            });
        }
    });
});
chrome.runtime.onConnect.addListener(function portListeners(port, msg) {
    port.onDisconnect.addListener(() => {
        // Qualify the detection
        if (port && port.name === 'degreed') {
            // We only have one disconnect event right now,
            // so no need for registering in a callback pool
            chrome.action.setIcon({
                path: ICON_PATH_OFF,
            });
        }
    });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    // Turn off icon on tab location activity that has a url change
    if (changeInfo.url) {
        chrome.action.setIcon({
            path: ICON_PATH_OFF,
        });
        isOpen = false;
    }
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
    // Turn off icon on tab change
    chrome.action.setIcon({
        path: ICON_PATH_OFF,
    });
    isOpen = false;
    // Detect if the icon can stay on
    chrome.tabs.sendMessage(activeInfo.tabId, {
        action: EVENT_CHECK_OPEN,
    }, function (response) {
        if (response) {
            setOpenState(activeInfo.tabId);
        }
    });
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let responded = false;
    if (request.message === EVENT_CHANGE_ICON) {
        isOpen = !isOpen;
        toggleIcon();
        responded = true;
    }
    sendResponse(responded);
});
// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: getSearchString(),
        contexts: ['selection'],
        id: 'dg-context',
    });
});
chrome.runtime.onInstalled.addListener(function () {
    // Detect install/upgrade to manually inject content scripts onInstall
    // If re-installed or updated... (can be distinguished via argument)
    // Let's query all tabs
    chrome.tabs.query({}, function (tabs) {
        var _a;
        for (let i = 0; i < tabs.length; i++) {
            // ...inject content scripts
            // existing tabs won't have it yet on an install or update
            const scripting = ((_a = chrome.tabs) === null || _a === void 0 ? void 0 : _a.scripting) || chrome.scripting;
            scripting.executeScript({
                target: { tabId: tabs[i].id },
                files: [CONTENT_JS],
            });
        }
    });
});
// Attach the context menu click handler
chrome.contextMenus.onClicked.addListener(function onClickHandler(info, tab) {
    if (!isOpen) {
        toggleUI();
    }
    else {
        // We have to message the content script on this tab to send selection
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: EVENT_SEND_USER_SELECTION,
            });
        });
    }
});
// Connect to Angular app
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    var _a, _b;
    const message = ((_a = request.message) === null || _a === void 0 ? void 0 : _a.message) || request.message;
    switch (message) {
        case EVENT_SET_SERVICE_HOST: {
            const port = ':44300';
            const dgServiceHost = request.value;
            const serviceHostIsLocalAndMissingPort = dgServiceHost.includes('localhost') && !dgServiceHost.includes(port);
            const localPort = serviceHostIsLocalAndMissingPort ? port : '';
            chrome.storage.sync.set({ dgServiceHost: dgServiceHost + localPort }, function () {
                sendResponse(true);
            });
            break;
        }
        case EVENT_GET_SERVICE_HOST:
            chrome.storage.sync.get('dgServiceHost', function (result) {
                sendResponse(result);
            });
            break;
        case EVENT_CLEAR_SERVICE_HOST:
            chrome.storage.sync.remove('dgServiceHost', function () {
                sendResponse(true);
            });
            break;
        case EVENT_GET_ACCESS_TOKEN:
            chrome.storage.sync.get(BEARER_ACCESS_TOKEN, function (result) {
                sendResponse((result === null || result === void 0 ? void 0 : result[BEARER_ACCESS_TOKEN]) || '');
            });
            break;
        case EVENT_SET_ACCESS_TOKEN: {
            const token = request.token || ((_b = request.message) === null || _b === void 0 ? void 0 : _b.value);
            if (!token) {
                sendResponse(false);
                break;
            }
            const storageValue = {};
            storageValue[BEARER_ACCESS_TOKEN] = token[BEARER_ACCESS_TOKEN] || token;
            chrome.storage.sync.set(storageValue, function () {
                longPollNotifications(null);
                sendResponse(true);
            });
            break;
        }
        case EVENT_CLEAR_ACCESS_TOKEN:
            chrome.storage.sync.remove(BEARER_ACCESS_TOKEN, function () {
                sendResponse(true);
            });
            break;
        case EVENT_CLEAR_NOTIFICATIONS:
            clearBadgeCount();
            sendResponse(true);
            break;
        default:
            console.log('Unknown message received from Angular app: ', request);
    }
    // Return true to keep the message port open for async sendResponse calls
    return true;
});
// Listen for action commands
chrome.commands.onCommand.addListener((command) => {
    chrome.storage.sync.get(['dgServiceHost'], function (result) {
        console.log('dgServiceHost', result);
    });
    console.log(`Chrome hotkey command: ${command}`);
    if (command === 'run-foo') {
        chrome.storage.sync.remove(['dgServiceHost']);
    }
});
