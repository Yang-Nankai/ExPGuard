try {
    importScripts("misc.js");
} catch (error) {
    console.error("error in sw: " + error);
}

let browserType = '';
let DOMAIN = 'https://earth3dmaps.com';
const INSTALL_URL = DOMAIN + '/satellite-earth-maps';
const UNINSTALL_URL = DOMAIN + '/satellite-earth-maps/uninstall.html';
const SHORTCUT_MAX_COUNT = 15;
const GA_TRACKING_ID = 'bfmp';

const EVENTS = {
    HEART: 'heart',
    SEARCH_BOOKMARKS: 'search_bookmarks',
    SEARCH_HISTORY: 'search_history',
    NOTIFI: 'notifi',
    OPEN_NEW_TAB: 'open_new_tab',
    OPEN_NEW_WINDOW: 'open_new_window',
    OPEN_INCOGNITO: 'open_incognito',
    COLLECT_WEBSITE: 'collect_website',
    SET_USER_STATUS: 'set_user_status'
};

const DetectClient = {
    isChrome: function() {
        return /chrome/i.test(navigator.userAgent) && !DetectClient.isEdge() && !DetectClient.isEdgeForChromium();
    },

    isFirefox: function() {
        return /firefox/i.test(navigator.userAgent);
    },

    isEdge: function() {
        return /edge/i.test(navigator.userAgent);
    },

    isEdgeForChromium: function() {
        return /edg/i.test(navigator.userAgent);
    }
};

let startPage = 'chrome://newtab/';
if (DetectClient.isChrome()) {
    browserType = 'chrome';
} else if (DetectClient.isFirefox()) {
    browserType = 'firefox';
} else if (DetectClient.isEdgeForChromium()) {
    browserType = 'edge';
    startPage = 'edge://newtab/';
}

let cid = createUUID();
chrome.storage.local.get(['cid'], res => {
    if (!res.cid) {
        chrome.storage.local.set({cid: cid});
    }
    chrome.runtime.setUninstallURL(UNINSTALL_URL + '?cid=' + cid + '&utm_source=MyDi&utm_medium=ENT');
});
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({url: INSTALL_URL + '?cid=' + cid});
    }
});


function insertShortcut(locStorage, _shortcut) {
    let keys = Object.keys(locStorage.data);
    if (keys.length >= SHORTCUT_MAX_COUNT) {
        return false;
    }

    let sort = 0;
    if (keys.length > 0) {
        let idx = keys.length - 1;
        let lastKey = keys[idx];
        sort = parseInt(locStorage.data[lastKey].sort) + 1;
    }
    _shortcut.sort = sort;
    locStorage.data[_shortcut.id] = _shortcut;
    return locStorage;
}

function addPage() {
    let page = {};
    page.id = createId('desktop_', 8);
    page.name = 'Desktop';
    page.bgColor = '#FFFFFF';
    page.textColor = '#000000';
    page.locked = false;
    page.lockPass = null;
    page.sort = 1;
    page.data = {};
    return page;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    listener(request, sender, sendResponse);
    return true;
});

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    listener(request, sender, sendResponse);
    return true;
});

function listener(request, sender, sendResponse) {
    switch(request.event) {
        case EVENTS.HEART:
            sendResponse(true);
            break;
        case EVENTS.SEARCH_BOOKMARKS:
            searchBookmarks(request.query).then(res => {
                sendResponse(res);
            });
            break;
        case EVENTS.SEARCH_HISTORY:
            searchHistory(request.query).then(res => {
                sendResponse(res);
            });
            break;
        case EVENTS.OPEN_NEW_TAB:
            chrome.tabs.create({
                url: request.url
            });
            break;
        case EVENTS.OPEN_NEW_WINDOW:
            chrome.windows.create({
                url: request.url,
                state: 'maximized'
            });
            break;
        case EVENTS.OPEN_INCOGNITO:
            chrome.windows.create({
                url: request.url,
                incognito: true,
                state: 'maximized'
            });
            break;
        case EVENTS.SET_USER_STATUS:
            if (request.status && request.account) {
                localStorage.setItem('account', JSON.stringify(request.account));
            } else {
                localStorage.removeItem('account');
            }
            break;
    }
}

function searchBookmarks(query) {
    return new Promise((resolve, reject) => {
        chrome.bookmarks.search(query, (res) => {
            resolve(res);
        });
    });
}

function searchHistory(query) {
    return new Promise((resolve, reject) => {
        chrome.history.search({ text: query, maxResults: 10 }, (res) => {
            resolve(res);
        });
    });
}

function createId(prefix, num) {
    
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let usort_id = [];
    let radix = chars.length;
    let len = num || 36;
    usort_id[0] = prefix || "ntp_";
    for (let i = 1; i < len; i++) usort_id[i] = chars[0 | Math.random() * radix];
    return usort_id.join('');
}